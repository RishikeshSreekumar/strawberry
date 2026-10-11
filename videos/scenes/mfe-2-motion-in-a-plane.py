import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

import re  # noqa: E402

# `say` reads a lone "a" as the article "uh"; spell the variable as a letter.
LA = "[[char LTRL]]a[[char NORM]]"
SAY_A = ['a c is eight', 'a c squared plus a t squared']


def say_fix(text):
    for ph in SAY_A:
        text = text.replace(ph, re.sub(r"(?<![A-Za-z])a(?![A-Za-z])", LA, ph))
    return text

# Chapter colour roles (light background).
V_C = SECONDARY  # velocity = teal
A_C = PRIMARY  # acceleration / gravity = strawberry red
CMP_C = ACCENT  # components = amber
REL_C = PURPLE  # relative velocity / resultant / change
HL = ManimColor("#D19A00")  # highlight gold
WARN = PRIMARY
WATER = ManimColor("#CFE6EA")
ROCK = ManimColor("#E3D3C8")
BALL_B = ManimColor("#2E6DB4")


# ---------------------------------------------------------------- helpers
def T(s, size=30, **kw):
    return Text(s, font_size=size, **kw)


def M(s, size=40, **kw):
    return MathTex(s, font_size=size, **kw)


def Ms(*parts, size=40, **kw):
    return MathTex(*parts, font_size=size, **kw)


def fit(mob, w):
    if mob.width > w:
        mob.scale_to_fit_width(w)
    return mob


def P(x, y):
    return np.array([x, y, 0.0])


def U(deg):
    a = deg * DEGREES
    return np.array([np.cos(a), np.sin(a), 0.0])


def vec(start, end, color, sw=6):
    return Arrow(start, end, buff=0, color=color, stroke_width=sw,
                 max_tip_length_to_length_ratio=0.25, max_stroke_width_to_length_ratio=12)


def check():
    return MathTex(r"\checkmark", color=GREEN, font_size=52)


def cross_mark():
    return MathTex(r"\times", color=WARN, font_size=60)


def strike(mob, color=WARN, sw=4):
    return Line(mob.get_corner(DL) + 0.05 * DL, mob.get_corner(UR) + 0.05 * UR, color=color, stroke_width=sw)


def header(s):
    return T(s, 24, color=MUTED, weight="BOLD").to_corner(UL, buff=0.35)


def ball(pos, color=A_C, r=0.13):
    return Circle(radius=r, color=INK, stroke_width=2).set_fill(color, 1).move_to(pos)


class MfeCh2Video(NarratedScene):
    def voiceover(self, text):
        return super().voiceover(say_fix(text))

    def construct(self):
        self.title_card(
            "Motion, Forces and Energy",
            "Chapter 2 · Motion in a Plane",
            "Chapter two. Motion in a plane.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7):
            part()
            self.clear_scene()

    def drop_updaters(self):
        for m in self.mobjects:
            m.clear_updaters()

    # ------------------------------------------------------------ scene 1: two motions, one clock
    def s1(self):
        hd = header("2.1 · Position, velocity and acceleration as vectors")
        ground = Line(P(-6.8, -3.2), P(2.4, -3.2), color=MUTED, stroke_width=3)
        ledge = Rectangle(width=2.0, height=0.25, color=INK, stroke_width=2).set_fill(ROCK, 1)
        ledge.move_to(P(-5.75, 1.88))
        wall = Line(P(-4.75, 1.75), P(-4.75, -3.2), color=INK, stroke_width=2)
        x0, y0 = -4.6, 2.15
        drop = 5.2  # fall height in units
        run = 5.5   # horizontal travel in units
        tt = ValueTracker(0.0)

        def pa(t):
            return P(x0, y0 - drop * t * t)

        def pb(t):
            return P(x0 + run * t, y0 - drop * t * t)

        ba = always_redraw(lambda: ball(pa(tt.get_value()), A_C))
        bb = always_redraw(lambda: ball(pb(tt.get_value()), BALL_B))
        trace = always_redraw(lambda: ParametricFunction(lambda s: pb(s), t_range=[0, max(tt.get_value(), 1e-3)],
                                                         color=BALL_B, stroke_width=2))
        la = T("dropped", 22, color=A_C).next_to(P(x0, y0), LEFT, buff=0.35).shift(0.35 * UP)
        lb = T("flicked sideways", 22, color=BALL_B).next_to(P(x0, y0), UP, buff=0.3).shift(1.2 * RIGHT)
        ghosts = VGroup()
        for t in (0.25, 0.5, 0.75):
            ghosts.add(Circle(radius=0.13, color=A_C, stroke_width=2).move_to(pa(t)),
                       Circle(radius=0.13, color=BALL_B, stroke_width=2).move_to(pb(t)),
                       DashedLine(pa(t), pb(t), color=MUTED, stroke_width=2))
        together = T("They land together.", 32, color=PRIMARY, weight="BOLD").move_to(P(4.6, 0.6))
        sub = T("the sideways motion does\nnothing to the fall", 24, color=MUTED).next_to(together, DOWN, buff=0.3)
        with self.voiceover("Stand on a balcony. Drop one ball, and at the same instant flick another sideways off "
                            "the edge. Which lands first? They land together. The sideways motion does nothing at "
                            "all to the fall.") as vo:
            self.add(trace, ba, bb)
            self.play(FadeIn(hd), Create(ground), FadeIn(ledge), Create(wall), FadeIn(ba), FadeIn(bb),
                      FadeIn(la), FadeIn(lb), run_time=1.0)
            self.wait(vo.duration * 0.25)
            self.play(tt.animate.set_value(1.0), run_time=2.2, rate_func=linear)
            self.play(Create(ghosts), run_time=1.0)
            self.play(FadeIn(together), FadeIn(sub), run_time=0.8)
        self.drop_updaters()

        r = M(r"\vec r = x\,\hat i + y\,\hat j", 48).move_to(P(0, 1.6))
        v = M(r"\vec v = \frac{d\vec r}{dt} = v_x\,\hat i + v_y\,\hat j", 48).move_to(P(0, 0.2))
        a = M(r"\vec a = \frac{d\vec v}{dt} = a_x\,\hat i + a_y\,\hat j", 48).move_to(P(0, -1.3))
        big = T("two straight-line motions, linked only by the clock", 30, color=PRIMARY, weight="BOLD")
        big.move_to(P(0, 2.9))
        cc = T("differentiate component by component", 26, color=MUTED).move_to(P(0, -2.7))
        with self.voiceover("That is this whole chapter in one picture. Motion in a plane is two straight-line "
                            "motions at once, linked only by the clock. Write the position as x i hat plus y j hat, "
                            "and differentiate each component on its own.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(FadeIn(big), run_time=0.8)
            self.wait(vo.duration * 0.2)
            self.play(Write(r), run_time=1.0)
            self.play(Write(v), run_time=1.2)
            self.play(Write(a), FadeIn(cc), run_time=1.2)

        O = P(-6.3, -1.8)

        def path(t):
            return O + P(5 * t, 6 * t - 5 * t * t)

        curve = ParametricFunction(path, t_range=[0, 1.25], color=INK, stroke_width=3)
        k = 0.3
        p1, p2 = path(0), path(0.8)
        v1 = vec(p1, p1 + k * P(5, 6), V_C)
        v2 = vec(p2, p2 + k * P(5, -2), V_C)
        l1 = M(r"\vec v_1", 34, color=V_C).next_to(v1.get_center(), UL, buff=0.1)
        l2 = M(r"\vec v_2", 34, color=V_C).next_to(v2.get_end(), RIGHT, buff=0.12)
        Q = P(1.2, -0.2)
        t1 = vec(Q, Q + 0.45 * P(5, 6), V_C)
        t2 = vec(Q, Q + 0.45 * P(5, -2), V_C)
        dv = vec(Q + 0.45 * P(5, 6), Q + 0.45 * P(5, -2), REL_C, sw=7)
        tl1 = M(r"\vec v_1", 34, color=V_C).next_to(t1.get_center(), UL, buff=0.1)
        tl2 = M(r"\vec v_2", 34, color=V_C).next_to(t2.get_center(), DOWN, buff=0.2)
        dvl = M(r"\Delta\vec v = (0,\,-8)", 34, color=REL_C).next_to(dv, RIGHT, buff=0.2)
        tan_note = T("v is along the tangent", 24, color=V_C).move_to(P(-3.0, 2.5))
        into = T("Δv points into the bend", 26, color=REL_C, weight="BOLD").move_to(P(3.8, -2.6))
        with self.voiceover("Velocity always points along the tangent to the path. But acceleration need not point "
                            "along the velocity. Take a thrown ball's velocity at launch, and again zero point eight "
                            "seconds later. Put them tail to tail: the change, delta v, points straight down, into "
                            "the bend.") as vo:
            self.play(*[FadeOut(m) for m in (r, v, a, big, cc)], run_time=0.5)
            self.play(Create(curve), run_time=1.0)
            self.play(GrowArrow(v1), FadeIn(l1), GrowArrow(v2), FadeIn(l2), FadeIn(tan_note), run_time=1.0)
            self.wait(vo.duration * 0.25)
            self.play(TransformFromCopy(v1, t1), TransformFromCopy(v2, t2), FadeIn(tl1), FadeIn(tl2), run_time=1.2)
            self.play(GrowArrow(dv), FadeIn(dvl), run_time=0.9)
            self.play(FadeIn(into), run_time=0.6)

        e1 = M(r"\vec r = 3t\,\hat i + (4t - 5t^2)\,\hat j", 46)
        e2 = M(r"\vec v = 3\,\hat i + (4 - 10t)\,\hat j", 46)
        e3 = M(r"\vec a = -10\,\hat j", 46, color=A_C)
        eg = VGroup(e1, e2, e3).arrange(DOWN, buff=0.45).move_to(P(0, 0.6))
        note = T("x uniform, y uniformly accelerated: a projectile in disguise", 26, color=MUTED).move_to(P(0, -2.0))
        with self.voiceover("Try one. The position is three t i hat, plus four t minus five t squared, j hat. "
                            "Differentiate: three i hat plus four minus ten t, j hat. Again: minus ten j hat, "
                            "constant and straight down. A projectile in disguise.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(Write(e1), run_time=1.2)
            self.wait(vo.duration * 0.12)
            self.play(Write(e2), run_time=1.2)
            self.wait(vo.duration * 0.05)
            self.play(Write(e3), run_time=0.9)
            self.play(FadeIn(note), run_time=0.6)

    # ------------------------------------------------------------ scene 2: projectile motion
    def s2(self):
        hd = header("2.2 · Projectile motion")
        s = 0.25  # units per metre
        O = P(-5.2, -2.5)
        u, th, g = 20.0, 45 * DEGREES, 10.0
        Tf = 2 * u * np.sin(th) / g

        def pos(t):
            return O + s * P(u * np.cos(th) * t, u * np.sin(th) * t - 0.5 * g * t * t)

        ground = Line(P(-6.6, O[1]), P(6.4, O[1]), color=MUTED, stroke_width=3)
        tt = ValueTracker(0.0)
        kv = 0.07  # units per m/s
        trace = always_redraw(lambda: ParametricFunction(pos, t_range=[0, max(tt.get_value(), 1e-3)],
                                                         color=INK, stroke_width=3))
        bl = always_redraw(lambda: ball(pos(tt.get_value())))

        def vx_arrow():
            p = pos(tt.get_value())
            return vec(p, p + kv * u * np.cos(th) * RIGHT, V_C, sw=5)

        def vy_arrow():
            p = pos(tt.get_value())
            vy = u * np.sin(th) - g * tt.get_value()
            if abs(vy) < 0.6:
                return VectorizedPoint(p)
            return vec(p, p + kv * vy * UP, CMP_C, sw=5)

        vx = always_redraw(vx_arrow)
        vy = always_redraw(vy_arrow)
        eqs = VGroup(
            M(r"\text{horizontal: } a_x = 0,\quad x = (u\cos\theta)\,t", 38),
            M(r"\text{vertical: } a_y = -g,\quad y = (u\sin\theta)\,t - \tfrac12 g t^2", 38),
        ).arrange(DOWN, buff=0.3, aligned_edge=LEFT).move_to(P(0.6, 2.6))
        eqs[0].set_color(V_C)
        eqs[1].set_color(CMP_C)
        with self.voiceover("Once a ball is released, the only force on it is gravity, straight down. So the "
                            "horizontal motion has no acceleration, and the vertical motion is free fall. Two chapter "
                            "one problems, sharing one clock.") as vo:
            self.add(trace, bl)
            self.play(FadeIn(hd), Create(ground), FadeIn(bl), run_time=0.8)
            self.wait(vo.duration * 0.2)
            self.play(Write(eqs[0]), run_time=1.4)
            self.wait(vo.duration * 0.1)
            self.play(Write(eqs[1]), run_time=1.6)

        vxl = M(r"v_x", 30, color=V_C).move_to(P(4.6, 0.7))
        vyl = M(r"v_y", 30, color=CMP_C).move_to(P(4.6, 0.1))
        key = VGroup(vec(P(5.0, 0.7), P(5.8, 0.7), V_C, sw=5), vec(P(5.0, 0.1), P(5.8, 0.1), CMP_C, sw=5))
        with self.voiceover("Watch the velocity. The horizontal part never changes. The vertical part shrinks, "
                            "vanishes at the top, then grows downward. The path is a parabola.") as vo:
            self.add(vx, vy)
            self.play(FadeIn(vx), FadeIn(vy), FadeIn(vxl), FadeIn(vyl), FadeIn(key), run_time=0.7)
            self.play(tt.animate.set_value(Tf / 2), run_time=3.0, rate_func=linear)
            self.wait(0.6)
            self.play(tt.animate.set_value(Tf), run_time=3.0, rate_func=linear)
        self.drop_updaters()

        top = pos(Tf / 2)
        land = pos(Tf)
        hline = DashedLine(top, P(top[0], O[1]), color=MUTED, stroke_width=3)
        hlab = M("H", 36).next_to(hline, RIGHT, buff=0.12)
        rbr = Brace(Line(O, land), DOWN, color=INK, buff=0.1)
        rlab = M("R", 36).next_to(rbr, DOWN, buff=0.08)
        f = VGroup(
            M(r"T = \frac{2u\sin\theta}{g}", 42),
            M(r"H = \frac{u^2\sin^2\theta}{2g}", 42),
            M(r"R = \frac{u^2\sin 2\theta}{g}", 42),
        ).arrange(RIGHT, buff=0.8).move_to(P(0.4, 2.5))
        with self.voiceover("Everything else follows. Set y to zero for the time of flight: two u sine theta over g. "
                            "Set v y to zero for the greatest height: u squared sine squared theta, over two g. And "
                            "the range is u squared sine two theta, over g.") as vo:
            self.play(FadeOut(eqs), FadeOut(vxl), FadeOut(vyl), FadeOut(key), FadeOut(vx), FadeOut(vy), run_time=0.5)
            self.wait(vo.duration * 0.1)
            self.play(Write(f[0]), run_time=1.0)
            self.wait(vo.duration * 0.12)
            self.play(Write(f[1]), Create(hline), FadeIn(hlab), run_time=1.2)
            self.wait(vo.duration * 0.12)
            self.play(Write(f[2]), GrowFromCenter(rbr), FadeIn(rlab), run_time=1.2)

        num = M(r"u = 20\ \text{m/s},\ \theta = 45^\circ:\quad R = 40\ \text{m},\ \ H = 10\ \text{m},\ \ T = 2\sqrt2"
                r"\approx 2.83\ \text{s}", 36, color=GREEN)
        fit(num, 12.4).move_to(P(0.4, 1.3))
        with self.voiceover("At twenty metres per second and forty five degrees, the ball flies forty metres, rises "
                            "ten, and lands after about two point eight three seconds.") as vo:
            self.play(Write(num), run_time=1.8)

        vt = vec(top, top + kv * u * np.cos(th) * RIGHT, V_C, sw=6)
        gt = vec(top, top + 1.4 * DOWN, A_C, sw=6)
        vtl = M(r"v_{\text{top}} = u\cos\theta \neq 0", 36, color=V_C).next_to(vt, RIGHT, buff=0.2)
        gtl = M(r"\vec a = \vec g\ \text{ at every point}", 36, color=A_C).next_to(gt.get_end(), DOWN, buff=0.15)
        bt = ball(top)
        w1 = VGroup(T("“velocity at the top is zero”", 26, color=MUTED), cross_mark().scale(0.6))
        w2 = VGroup(T("“acceleration at the top is zero”", 26, color=MUTED), cross_mark().scale(0.6))
        for w in (w1, w2):
            w.arrange(RIGHT, buff=0.25)
        ws = VGroup(w1, w2).arrange(DOWN, buff=0.25, aligned_edge=LEFT).move_to(P(0.4, 2.4))
        with self.voiceover("Two traps. The velocity at the top is not zero. Only its vertical part is, so the speed "
                            "there is u cos theta. And the acceleration at the top is not zero either. It is g, "
                            "straight down, at every point of the flight.") as vo:
            self.play(FadeOut(f), FadeOut(num), FadeOut(rbr), FadeOut(rlab), FadeOut(hline), FadeOut(hlab),
                      run_time=0.5)
            self.play(FadeIn(bt), FadeIn(w1), run_time=0.6)
            self.play(GrowArrow(vt), FadeIn(vtl), run_time=0.9)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(w2), run_time=0.6)
            self.play(GrowArrow(gt), FadeIn(gtl), run_time=0.9)

    # ------------------------------------------------------------ scene 3: special cases
    def s3(self):
        hd = header("2.3 · Projectiles: special cases")
        s = 0.25
        O = P(-5.0, -2.9)
        u, g = 20.0, 10.0
        ground = Line(P(-6.6, O[1]), P(6.4, O[1]), color=MUTED, stroke_width=3)

        def traj(deg, color):
            th = deg * DEGREES
            Tf = 2 * u * np.sin(th) / g
            return ParametricFunction(
                lambda t: O + s * P(u * np.cos(th) * t, u * np.sin(th) * t - 0.5 * g * t * t),
                t_range=[0, Tf], color=color, stroke_width=4)

        c30 = traj(30, V_C)
        c60 = traj(60, CMP_C)
        c45 = DashedVMobject(traj(45, REL_C), num_dashes=40)
        l30 = M(r"30^\circ", 32, color=V_C).move_to(O + P(2.4, 0.35))
        l60 = M(r"60^\circ", 32, color=CMP_C).move_to(O + P(0.6, 1.8))
        l45 = M(r"45^\circ:\ R_{\max} = \frac{u^2}{g} = 40\ \text{m}", 34, color=REL_C).move_to(P(3.4, 0.6))
        land = O + s * (20 * np.sqrt(3)) * RIGHT
        same = M(r"\text{same range: } 20\sqrt3 \approx 34.6\ \text{m}", 34).next_to(land, DOWN, buff=0.15)
        same.shift(0.6 * LEFT)
        rule = M(r"\sin 2\theta = \sin 2(90^\circ - \theta)", 44).move_to(P(0.4, 2.7))
        hts = M(r"H_{30} = 5\ \text{m},\quad H_{60} = 15\ \text{m}", 34).move_to(P(3.4, 1.6))
        with self.voiceover("Sine two theta is the same for theta and ninety degrees minus theta. So at twenty metres "
                            "per second, thirty and sixty degrees land at the same spot, thirty four point six metres "
                            "away. The steeper throw goes higher and stays up longer. At forty five degrees the "
                            "pair merges, and the range is largest: u squared over g, forty metres.") as vo:
            self.play(FadeIn(hd), Create(ground), Write(rule), run_time=1.0)
            self.play(Create(c30), FadeIn(l30), run_time=1.3)
            self.play(Create(c60), FadeIn(l60), run_time=1.5)
            self.play(FadeIn(same), run_time=0.6)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(hts), run_time=0.6)
            self.wait(vo.duration * 0.15)
            self.play(Create(c45), FadeIn(l45), run_time=1.5)

        # horizontal launch from a cliff
        k = 0.1  # units per metre
        top = P(-4.6, 1.6)
        sea = top[1] - 45 * k
        cliff = Polygon(P(-6.8, sea), P(-4.6, sea), top, P(-6.8, top[1]), color=INK, stroke_width=2)
        cliff.set_fill(ROCK, 1)
        water = Line(P(-4.6, sea), P(1.2, sea), color=V_C, stroke_width=4)
        cols = [MUTED, A_C, REL_C]
        paths = VGroup()
        for spd, col in zip((5, 10, 15), cols):
            paths.add(ParametricFunction(lambda t, spd=spd: top + k * P(spd * t, -5 * t * t), t_range=[0, 3],
                                         color=col, stroke_width=4))
        ghosts = VGroup()
        for t in (1, 2, 3):
            y = top[1] - k * 5 * t * t
            ghosts.add(DashedLine(P(top[0], y), P(top[0] + k * 15 * t, y), color=GRID, stroke_width=2))
            for spd, col in zip((5, 10, 15), cols):
                ghosts.add(Dot(top + k * P(spd * t, -5 * t * t), color=col, radius=0.06))
        hl = M("45\\ \\text{m}", 32).next_to(cliff, RIGHT, buff=0.1).shift(0.3 * DOWN + 0.05 * LEFT)
        hl.move_to(P(-5.2, (top[1] + sea) / 2))
        sp = VGroup(M(r"5", 28, color=MUTED), M(r"10", 28, color=A_C), M(r"15\ \text{m/s}", 28, color=REL_C))
        for m, spd in zip(sp, (5, 10, 15)):
            m.next_to(top + k * P(spd * 3, -45), DOWN, buff=0.12)
        r1 = M(r"T = \sqrt{\frac{2h}{g}} = \sqrt{\frac{90}{10}} = 3\ \text{s}", 42).move_to(P(4.0, 1.6))
        r2 = M(r"10\ \text{m/s}:\ R = 10\times 3 = 30\ \text{m}", 38, color=A_C).move_to(P(4.0, 0.2))
        r3 = T("same fall time, whatever the speed", 26, color=MUTED).move_to(P(4.0, -0.8))
        with self.voiceover("Launch horizontally from a height, and the fall takes exactly as long as a simple drop. "
                            "From a forty five metre cliff, three seconds, whatever the speed. At ten metres per "
                            "second, the stone lands thirty metres out.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(FadeIn(cliff), Create(water), FadeIn(hl), run_time=0.8)
            self.play(LaggedStart(*[Create(p) for p in paths], lag_ratio=0.2), run_time=2.0)
            self.play(FadeIn(ghosts), FadeIn(sp), run_time=0.8)
            self.play(Write(r1), run_time=1.2)
            self.wait(vo.duration * 0.1)
            self.play(Write(r2), FadeIn(r3), run_time=1.2)

        # incline
        al = 25 * DEGREES
        A0 = P(-6.4, -3.1)
        L = 8.0
        A1 = A0 + L * RIGHT
        A2 = A0 + L * RIGHT + L * np.tan(al) * UP
        wedge = Polygon(A0, A1, A2, color=INK, stroke_width=3).set_fill(ROCK, 1)
        ua = U(25)
        na = U(115)
        L0 = A0 + 0.9 * ua
        xa = vec(L0, L0 + 2.6 * ua, INK, sw=4)
        ya = vec(L0, L0 + 1.8 * na, INK, sw=4)
        xl = M(r"x'", 32).next_to(xa.get_end(), DR, buff=0.05)
        yl = M(r"y'", 32).next_to(ya.get_end(), LEFT, buff=0.1)
        G0 = A0 + 4.2 * ua + 2.0 * na
        gv = vec(G0, G0 + 1.6 * DOWN, A_C)
        gl = M("g", 32, color=A_C).next_to(gv.get_end(), LEFT, buff=0.1)
        gpar = vec(G0, G0 - 1.6 * np.sin(al) * ua, CMP_C, sw=5)
        gperp = vec(G0, G0 - 1.6 * np.cos(al) * na, CMP_C, sw=5)
        gpl = M(r"g\sin\alpha", 30, color=CMP_C).next_to(gpar.get_end(), UL, buff=0.05)
        gnl = M(r"g\cos\alpha", 30, color=CMP_C).next_to(gperp.get_end(), RIGHT, buff=0.1)
        arc = Arc(radius=1.0, start_angle=0, angle=al, arc_center=A0, color=INK, stroke_width=3)
        alab = M(r"\alpha", 30).move_to(A0 + 1.3 * U(12.5))
        wrong = VGroup(T("“45° always gives the maximum range”", 26, color=MUTED), cross_mark().scale(0.6))
        wrong.arrange(RIGHT, buff=0.25).move_to(P(1.6, 2.7))
        best = M(r"\text{up a slope: } \theta_{\text{best}} = 45^\circ + \tfrac{\alpha}{2}", 40, color=GREEN)
        best.move_to(P(-1.6, 1.6))
        hgt = T("from a height: flatter than 45°", 26, color=MUTED).next_to(best, DOWN, buff=0.25)
        with self.voiceover("So forty five degrees is not always best. From a height, a flatter throw wins. On a "
                            "slope, tilt the axes along and across it, and split gravity into g sine alpha and g cos "
                            "alpha. Up an incline, the best launch is forty five degrees plus half the slope angle.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(FadeIn(wrong), run_time=0.7)
            self.play(FadeIn(wedge), Create(arc), FadeIn(alab), run_time=0.8)
            self.play(GrowArrow(xa), GrowArrow(ya), FadeIn(xl), FadeIn(yl), run_time=0.8)
            self.play(GrowArrow(gv), FadeIn(gl), run_time=0.6)
            self.play(GrowArrow(gpar), GrowArrow(gperp), FadeIn(gpl), FadeIn(gnl), run_time=0.9)
            self.wait(vo.duration * 0.1)
            self.play(Write(best), FadeIn(hgt), run_time=1.2)

    # ------------------------------------------------------------ scene 4: relative velocity
    def s4(self):
        hd = header("2.4 · Relative velocity")
        k = 0.03
        trackA = Line(P(-6.8, 1.6), P(6.8, 1.6), color=GRID, stroke_width=3)
        trackB = Line(P(-6.8, 0.5), P(6.8, 0.5), color=GRID, stroke_width=3)
        tA = Rectangle(width=100 * k, height=0.5, color=INK, stroke_width=2).set_fill(V_C, 0.85)
        tB = Rectangle(width=150 * k, height=0.5, color=INK, stroke_width=2).set_fill(CMP_C, 0.85)
        tA.move_to(P(-4.0, 1.85))
        tB.move_to(P(4.0, 0.75))
        la = M(r"100\ \text{m},\ 20\ \text{m/s}", 28, color=WHITE).move_to(tA)
        lb = M(r"150\ \text{m},\ 30\ \text{m/s}", 28, color=WHITE).move_to(tB)
        fit(la, tA.width - 0.15)
        fit(lb, tB.width - 0.15)
        gA = VGroup(tA, la)
        gB = VGroup(tB, lb)
        rule = M(r"\vec v_{AB} = \vec v_A - \vec v_B", 50, color=REL_C).move_to(P(0, 2.9))
        c1 = M(r"\text{opposite: } t = \frac{100 + 150}{20 + 30} = 5\ \text{s}", 40).move_to(P(0, -1.1))
        c2 = M(r"\text{same way: } t = \frac{250}{30 - 20} = 25\ \text{s}", 40).move_to(P(0, -2.6))
        with self.voiceover("Motion is always measured from something. The velocity of A as seen by B is v A minus v "
                            "B. Two trains, a hundred and a hundred and fifty metres long, run at twenty and thirty "
                            "metres per second. Moving in opposite directions, the relative speed is fifty, so they "
                            "cross in two hundred fifty over fifty: five seconds. Moving the same way, it is ten: "
                            "twenty five seconds.") as vo:
            self.play(FadeIn(hd), Write(rule), run_time=1.0)
            self.wait(vo.duration * 0.12)
            self.play(Create(trackA), Create(trackB), FadeIn(gA), FadeIn(gB), run_time=0.8)
            self.wait(vo.duration * 0.12)
            self.play(gA.animate.shift(5.2 * RIGHT), gB.animate.shift(7.8 * LEFT), run_time=2.4, rate_func=linear)
            self.play(Write(c1), run_time=1.4)
            self.wait(vo.duration * 0.05)
            self.play(Write(c2), run_time=1.3)

        O = P(-4.4, -2.6)
        s = 0.07
        vA = vec(O, O + s * P(0, 30), V_C)
        vB = vec(O, O + s * P(40, 0), CMP_C)
        vAB = vec(O + s * P(40, 0), O + s * P(0, 30), REL_C, sw=7)
        lA = M(r"\vec v_A = 30\ \text{m/s N}", 32, color=V_C).next_to(vA.get_end(), UP, buff=0.12)
        lB = M(r"\vec v_B = 40\ \text{m/s E}", 32, color=CMP_C).next_to(vB, DOWN, buff=0.15)
        lAB = M(r"\vec v_{AB}", 36, color=REL_C).next_to(vAB.get_center(), UR, buff=0.1)
        m1 = M(r"\vec v_{AB} = \vec v_A - \vec v_B = -40\,\hat i + 30\,\hat j", 40).move_to(P(2.8, 0.8))
        m2 = M(r"|\vec v_{AB}| = \sqrt{40^2 + 30^2} = 50\ \text{m/s}", 40, color=GREEN).move_to(P(2.8, -0.4))
        m3 = VGroup(M(r"40 - 30 = 10", 38, color=MUTED), cross_mark().scale(0.6)).arrange(RIGHT, buff=0.25)
        m3.move_to(P(2.8, -1.6))
        m4 = T("subtract vectors, then take the length", 26, color=REL_C).move_to(P(2.8, -2.6))
        with self.voiceover("In two dimensions, subtract as vectors. Car A drives north at thirty, car B drives east "
                            "at forty. To B, car A moves at fifty metres per second, toward the north west. Not ten. "
                            "Subtract the vectors, then take the length.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m not in (hd, rule)], run_time=0.5)
            self.play(GrowArrow(vA), FadeIn(lA), GrowArrow(vB), FadeIn(lB), run_time=1.0)
            self.wait(vo.duration * 0.1)
            self.play(GrowArrow(vAB), FadeIn(lAB), Write(m1), run_time=1.4)
            self.play(Write(m2), run_time=1.2)
            self.play(FadeIn(m3), run_time=0.6)
            self.play(FadeIn(m4), run_time=0.6)

        # monkey and hunter
        H = P(-6.0, -2.8)
        Mk = P(2.6, 1.4)
        gU = 2.0
        Tm = 1.6
        vb = (Mk - H) / Tm
        tt = ValueTracker(0.0)

        def bpos(t):
            return H + vb * t + 0.5 * gU * t * t * DOWN

        def mpos(t):
            return Mk + 0.5 * gU * t * t * DOWN

        groundm = Line(P(-6.8, -3.5), P(6.8, -3.5), color=MUTED, stroke_width=3)
        branch = Line(Mk + P(-0.2, 0.45), Mk + P(2.0, 0.45), color=ManimColor("#7A5A3A"), stroke_width=7)
        sight = DashedLine(H, Mk, color=MUTED, stroke_width=3)
        gun = Line(H, H + 0.6 * (Mk - H) / np.linalg.norm(Mk - H), color=INK, stroke_width=8)
        monkey = always_redraw(lambda: Circle(radius=0.25, color=INK, stroke_width=2)
                               .set_fill(ManimColor("#9B6B43"), 1).move_to(mpos(tt.get_value())))
        bullet = always_redraw(lambda: Dot(bpos(tt.get_value()), color=A_C, radius=0.08))
        btrace = always_redraw(lambda: ParametricFunction(bpos, t_range=[0, max(tt.get_value(), 1e-3)],
                                                          color=A_C, stroke_width=3))
        ml = T("monkey lets go", 22, color=MUTED).next_to(branch, UP, buff=0.12)
        hl = T("hunter aims straight at it", 22, color=MUTED).move_to(H + P(1.7, -0.25))
        rel = M(r"\vec a_{\text{rel}} = \vec g - \vec g = \vec 0", 42, color=REL_C).move_to(P(-2.4, 2.3))
        reln = T("each sees the other move in a straight line", 24, color=MUTED).next_to(rel, DOWN, buff=0.25)
        hit = T("hit!", 30, color=A_C, weight="BOLD")
        with self.voiceover("Two projectiles share the same acceleration, g. So their relative acceleration is zero, "
                            "and each sees the other move in a straight line. That is why a hunter who aims straight "
                            "at a monkey always hits it, even when the monkey lets go at the instant of the shot.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.add(btrace, bullet, monkey)
            self.play(Create(groundm), Create(branch), FadeIn(monkey), Create(gun), FadeIn(ml), FadeIn(hl),
                      run_time=0.9)
            self.play(Create(sight), run_time=0.7)
            self.play(Write(rel), FadeIn(reln), run_time=1.3)
            self.wait(vo.duration * 0.15)
            self.play(tt.animate.set_value(Tm), run_time=2.6, rate_func=linear)
            hit.next_to(mpos(Tm), RIGHT, buff=0.35)
            self.play(Flash(mpos(Tm), color=A_C, flash_radius=0.45), FadeIn(hit), run_time=0.7)
        self.drop_updaters()

    # ------------------------------------------------------------ scene 5: river-boat and rain
    def s5(self):
        hd = header("2.5 · River–boat and rain–umbrella problems")
        k = 0.032  # units per metre
        y0, y1 = -1.9, -1.9 + 100 * k
        river = Rectangle(width=8.0, height=y1 - y0, stroke_width=0).set_fill(WATER, 1)
        river.move_to(P(-2.8, (y0 + y1) / 2))
        banks = VGroup(Line(P(-6.8, y0), P(1.2, y0), color=INK, stroke_width=3),
                       Line(P(-6.8, y1), P(1.2, y1), color=INK, stroke_width=3))
        flows = VGroup(*[vec(P(x, y), P(x + 0.7, y), ManimColor("#7FB3BE"), sw=3)
                         for x in (-6.2, -3.8, -1.4) for y in (y0 + 0.6, y1 - 0.6)])
        rule = M(r"\vec v_{\text{ground}} = \vec v_{\text{rel. medium}} + \vec v_{\text{medium}}", 40, color=REL_C)
        rule.move_to(P(0.6, 2.75))
        dlab = M(r"d = 100\ \text{m}", 30).move_to(P(-6.0, (y0 + y1) / 2))
        wlab = M(r"v_w = 3\ \text{m/s}", 30, color=V_C).move_to(P(-1.0, y0 - 0.35))
        with self.voiceover("Rivers, wind and rain all use one equation. Velocity over the ground equals velocity "
                            "relative to the medium, plus the velocity of the medium. A river a hundred metres wide "
                            "flows at three metres per second. A boat does five, relative to the water.") as vo:
            self.play(FadeIn(hd), Write(rule), run_time=1.2)
            self.play(FadeIn(river), Create(banks), FadeIn(dlab), run_time=0.8)
            self.play(LaggedStart(*[GrowArrow(f) for f in flows], lag_ratio=0.1), FadeIn(wlab), run_time=1.2)

        S0 = P(-5.0, y0)
        drift = 60 * k
        boat1 = Triangle(color=INK, stroke_width=2).set_fill(A_C, 1).scale(0.16).move_to(S0)
        p1 = DashedLine(S0, S0 + P(drift, y1 - y0), color=A_C, stroke_width=3)
        Q = P(3.6, -3.3)
        q = 0.4
        tb = vec(Q, Q + q * P(0, 5), A_C)
        tw = vec(Q + q * P(0, 5), Q + q * P(3, 5), V_C)
        tr = vec(Q, Q + q * P(3, 5), REL_C, sw=7)
        tbl = M(r"5", 30, color=A_C).next_to(tb, LEFT, buff=0.1)
        twl = M(r"3", 30, color=V_C).next_to(tw, UP, buff=0.1)
        res1 = M(r"t = \frac{100}{5} = 20\ \text{s},\quad \text{drift} = 3\times 20 = 60\ \text{m}", 36)
        fit(res1, 5.6)
        res1.move_to(P(3.8, 1.95))
        with self.voiceover("Head straight across for the least time: a hundred over five, twenty seconds. The current "
                            "does not slow the crossing. It only carries the boat sixty metres downstream.") as vo:
            self.play(FadeIn(boat1), run_time=0.4)
            self.play(Create(p1), boat1.animate.move_to(S0 + P(drift, y1 - y0)), run_time=2.0, rate_func=linear)
            self.play(GrowArrow(tb), FadeIn(tbl), run_time=0.5)
            self.play(GrowArrow(tw), FadeIn(twl), run_time=0.5)
            self.play(GrowArrow(tr), run_time=0.5)
            self.play(Write(res1), run_time=1.3)

        S1 = P(-2.4, y0)
        boat2 = Triangle(color=INK, stroke_width=2).set_fill(GREEN, 1).scale(0.16).move_to(S1)
        p2 = DashedLine(S1, P(S1[0], y1), color=GREEN, stroke_width=3)
        Q2 = P(3.0, -3.3)
        hb = vec(Q2, Q2 + q * P(-3, 4), A_C)
        hw = vec(Q2 + q * P(-3, 4), Q2 + q * P(0, 4), V_C)
        hr = vec(Q2, Q2 + q * P(0, 4), GREEN, sw=7)
        hbl = M(r"5", 30, color=A_C).next_to(hb.get_center(), LEFT, buff=0.15)
        hwl = M(r"3", 30, color=V_C).next_to(hw, UP, buff=0.1)
        hrl = M(r"4", 30, color=GREEN).next_to(hr, RIGHT, buff=0.12)
        res2 = M(r"\sin\alpha = \tfrac35\ (\approx 37^\circ),\quad t = \frac{100}{4} = 25\ \text{s}", 36, color=GREEN)
        fit(res2, 5.6)
        res2.move_to(P(3.8, 1.0))
        warn = VGroup(T("aim upstream to land opposite,\nnot to cross fastest", 22, color=MUTED))
        fit(warn, 3.6)
        warn.move_to(P(4.8, -0.5))
        with self.voiceover("To land directly opposite, head upstream so the boat cancels the current. Sine alpha is "
                            "three fifths, about thirty seven degrees. Now only four metres per second carries you "
                            "across, so the trip takes twenty five seconds. Aiming upstream is never the fastest way "
                            "across.") as vo:
            self.play(FadeOut(tb), FadeOut(tw), FadeOut(tr), FadeOut(tbl), FadeOut(twl), run_time=0.4)
            self.play(FadeIn(boat2), GrowArrow(hb), FadeIn(hbl), run_time=0.7)
            self.play(GrowArrow(hw), FadeIn(hwl), GrowArrow(hr), FadeIn(hrl), run_time=0.9)
            self.play(Create(p2), boat2.animate.move_to(P(S1[0], y1)), run_time=2.0, rate_func=linear)
            self.play(Write(res2), run_time=1.2)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(warn), run_time=0.6)

        # rain and umbrella
        feet = P(-3.4, -3.0)
        hip = feet + 1.3 * UP
        neck = hip + 1.2 * UP
        head = Circle(radius=0.28, color=INK, stroke_width=3).move_to(neck + 0.4 * UP)
        body = VGroup(Line(hip, neck, color=INK, stroke_width=4),
                      Line(hip, feet + 0.4 * LEFT, color=INK, stroke_width=4),
                      Line(hip, feet + 0.4 * RIGHT, color=INK, stroke_width=4),
                      Line(neck + 0.3 * DOWN, neck + P(0.5, -0.5), color=INK, stroke_width=4), head)
        tilt = np.arctan(0.5)
        hand = neck + P(0.5, -0.5)
        top = hand + 2.0 * np.array([np.sin(tilt), np.cos(tilt), 0])
        handle = Line(hand, top, color=INK, stroke_width=3)
        canopy = ArcBetweenPoints(top + 1.1 * np.array([-np.cos(tilt), np.sin(tilt), 0]),
                                  top + 1.1 * np.array([np.cos(tilt), -np.sin(tilt), 0]), angle=-PI / 1.6,
                                  color=A_C, stroke_width=5)
        canopy.set_fill(A_C, 0.35)
        umb = VGroup(handle, canopy)
        walk = vec(feet + P(0.8, -0.35) + 0.0 * UP, feet + P(2.0, -0.35), V_C, sw=5)
        wl = M(r"5\ \text{m/s}", 28, color=V_C).next_to(walk, RIGHT, buff=0.1)
        rel_dir = np.array([-0.5, -1.0, 0]) / np.sqrt(1.25)
        streaks = VGroup()
        rng = np.random.default_rng(3)
        for _ in range(26):
            c = P(rng.uniform(-6.6, 0.0), rng.uniform(-1.0, 2.6))
            streaks.add(Line(c, c + 0.45 * rel_dir, color=ManimColor("#6FA6D6"), stroke_width=3))
        Rq = P(3.4, 1.4)
        rs = 0.22
        rr = vec(Rq, Rq + rs * P(0, -10), V_C)
        rm = vec(Rq + rs * P(0, -10), Rq + rs * P(-5, -10), CMP_C)
        rrel = vec(Rq, Rq + rs * P(-5, -10), REL_C, sw=7)
        rrl = M(r"\vec v_{\text{rain}}", 30, color=V_C).next_to(rr, RIGHT, buff=0.12)
        rml = M(r"-\vec v_{\text{man}}", 30, color=CMP_C).next_to(rm, DOWN, buff=0.12)
        rel_l = M(r"\vec v_{\text{rain,man}}", 30, color=REL_C).next_to(rrel.get_center(), LEFT, buff=0.15)
        ang = M(r"\tan^{-1}\tfrac{5}{10} \approx 27^\circ\ \text{from vertical}", 34).move_to(P(3.6, -1.9))
        tip = T("tilt the umbrella forward", 26, color=A_C).move_to(P(3.6, -2.8))
        with self.voiceover("Rain is the same triangle. Rain falls straight down at ten metres per second, and you "
                            "walk at five. Relative to you, the rain's velocity is v rain minus v man. It comes at you "
                            "from the front, at about twenty seven degrees from the vertical. So tilt your umbrella "
                            "forward.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(FadeIn(body), GrowArrow(walk), FadeIn(wl), run_time=0.8)
            self.play(GrowArrow(rr), FadeIn(rrl), run_time=0.6)
            self.wait(vo.duration * 0.1)
            self.play(GrowArrow(rm), FadeIn(rml), run_time=0.6)
            self.play(GrowArrow(rrel), FadeIn(rel_l), run_time=0.7)
            self.play(LaggedStart(*[Create(sk) for sk in streaks], lag_ratio=0.03), run_time=1.2)
            self.play(Write(ang), run_time=1.0)
            self.play(FadeIn(umb), FadeIn(tip), run_time=0.8)

    # ------------------------------------------------------------ scene 6: circular motion
    def s6(self):
        hd = header("2.6 · Kinematics of circular motion")
        C = P(-3.6, -0.5)
        R = 2.2
        circ = Circle(radius=R, color=MUTED, stroke_width=3).move_to(C)
        cdot = Dot(C, color=INK, radius=0.06)
        th = ValueTracker(-30.0)

        def pt():
            return C + R * U(th.get_value())

        dot = always_redraw(lambda: ball(pt(), INK, 0.12))
        vel = always_redraw(lambda: vec(pt(), pt() + 1.5 * U(th.get_value() + 90), V_C))
        acc = always_redraw(lambda: vec(pt(), pt() + 1.1 * U(th.get_value() + 180), A_C))
        q1 = T("speed steady...", 28, color=V_C).move_to(P(3.0, 1.4))
        q2 = T("...direction always turning", 28, color=A_C).move_to(P(3.0, 0.6))
        q3 = T("so it is accelerating", 30, color=PRIMARY, weight="BOLD").move_to(P(3.0, -0.6))
        with self.voiceover("A car circles a roundabout with the speedometer steady. Is it accelerating? Yes. "
                            "Velocity is a vector. Its size stays the same, but its direction turns all the time, and "
                            "a turning velocity is an accelerating one.") as vo:
            self.add(dot, vel)
            self.play(FadeIn(hd), Create(circ), FadeIn(cdot), FadeIn(dot), FadeIn(vel), run_time=1.0)
            self.play(th.animate.set_value(60), FadeIn(q1), run_time=2.0, rate_func=linear)
            self.play(th.animate.set_value(150), FadeIn(q2), run_time=2.0, rate_func=linear)
            self.add(acc)
            self.play(th.animate.set_value(240), FadeIn(acc), FadeIn(q3), run_time=2.0, rate_func=linear)
        self.drop_updaters()

        # velocity triangle
        self.play(FadeOut(q1), FadeOut(q2), FadeOut(q3), FadeOut(dot), FadeOut(vel), FadeOut(acc), run_time=0.5)
        a1, a2 = 60, 95
        P1, P2 = C + R * U(a1), C + R * U(a2)
        v1 = vec(P1, P1 + 1.5 * U(a1 + 90), V_C)
        v2 = vec(P2, P2 + 1.5 * U(a2 + 90), V_C)
        r1 = DashedLine(C, P1, color=MUTED, stroke_width=2)
        r2 = DashedLine(C, P2, color=MUTED, stroke_width=2)
        dth = Arc(radius=0.6, start_angle=a1 * DEGREES, angle=(a2 - a1) * DEGREES, arc_center=C, color=INK,
                  stroke_width=3)
        dthl = M(r"\Delta\theta", 28).move_to(C + 0.95 * U((a1 + a2) / 2))
        Q = P(5.8, -1.8)
        L = 2.6
        t1 = vec(Q, Q + L * U(a1 + 90), V_C)
        t2 = vec(Q, Q + L * U(a2 + 90), V_C)
        dv = vec(Q + L * U(a1 + 90), Q + L * U(a2 + 90), REL_C, sw=7)
        tarc = Arc(radius=0.8, start_angle=(a1 + 90) * DEGREES, angle=(a2 - a1) * DEGREES, arc_center=Q, color=INK,
                   stroke_width=3)
        tl = M(r"\Delta\theta", 28).move_to(Q + 1.15 * U((a1 + a2) / 2 + 90))
        l1 = M(r"\vec v_1", 32, color=V_C).next_to(t1.get_end(), UP, buff=0.1)
        l2 = M(r"\vec v_2", 32, color=V_C).next_to(t2.get_end(), LEFT, buff=0.1)
        dvl = M(r"|\Delta\vec v| \approx v\,\Delta\theta", 34, color=REL_C).next_to(dv, LEFT, buff=0.15)
        e = M(r"a = \frac{v\,\Delta\theta}{\Delta t} = v\omega = \frac{v^2}{r}", 46).move_to(P(3.2, 2.6))
        ein = T("pointing at the centre", 26, color=A_C).next_to(e, DOWN, buff=0.2)
        with self.voiceover("Put two velocities tail to tail. They have the same length v, and the angle between them "
                            "is the angle turned, delta theta. The third side, delta v, is nearly an arc: v delta "
                            "theta. Divide by delta t, and the acceleration is v omega, which is v squared over r, "
                            "pointing at the centre.") as vo:
            self.play(Create(r1), Create(r2), GrowArrow(v1), GrowArrow(v2), Create(dth), FadeIn(dthl), run_time=1.2)
            self.play(TransformFromCopy(v1, t1), TransformFromCopy(v2, t2), FadeIn(l1), FadeIn(l2), run_time=1.2)
            self.play(Create(tarc), FadeIn(tl), run_time=0.6)
            self.wait(vo.duration * 0.1)
            self.play(GrowArrow(dv), FadeIn(dvl), run_time=0.9)
            self.wait(vo.duration * 0.1)
            self.play(Write(e), run_time=1.5)
            self.play(FadeIn(ein), run_time=0.5)

        Pn = C + R * U(30)
        dotn = ball(Pn, INK, 0.12)
        vt = vec(Pn, Pn + 1.4 * U(120), V_C)
        ac = vec(Pn, Pn + 1.4 * U(210), A_C)
        at = vec(Pn, Pn + 0.9 * U(120), CMP_C, sw=7)
        net = vec(Pn, Pn + 1.4 * U(210) + 0.9 * U(120), REL_C, sw=7)
        acl = M(r"a_c", 32, color=A_C).next_to(ac.get_end(), DOWN, buff=0.1)
        atl = M(r"a_t", 32, color=CMP_C).next_to(at.get_end(), UP, buff=0.1)
        netl = M(r"a", 32, color=REL_C).next_to(net.get_end(), LEFT, buff=0.1)
        f1 = M(r"r = 2\ \text{m},\ v = 4\ \text{m/s}:\ \ a_c = \frac{16}{2} = 8\ \text{m/s}^2", 38).move_to(P(3.2, 2.4))
        f2 = M(r"a_t = \frac{dv}{dt},\qquad a = \sqrt{a_c^2 + a_t^2}", 42).move_to(P(3.2, 0.9))
        f3 = VGroup(T("“uniform circular motion has zero acceleration”", 22, color=MUTED),
                    cross_mark().scale(0.55)).arrange(RIGHT, buff=0.2).move_to(P(3.0, -0.8))
        fit(f3, 7.2)
        f4 = T("uniform means constant speed", 24, color=PRIMARY).next_to(f3, DOWN, buff=0.25)
        with self.voiceover("With r two metres and v four metres per second, a c is eight metres per second squared. "
                            "If the speed changes too, add a tangential part, d v by d t. The two are perpendicular, "
                            "so the net acceleration is the root of a c squared plus a t squared. And uniform "
                            "circular motion means constant speed, never zero acceleration.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m not in (hd, circ, cdot)], run_time=0.5)
            self.play(FadeIn(dotn), GrowArrow(vt), GrowArrow(ac), FadeIn(acl), run_time=0.9)
            self.play(Write(f1), run_time=1.4)
            self.wait(vo.duration * 0.08)
            self.play(FadeOut(vt), GrowArrow(at), FadeIn(atl), run_time=0.7)
            self.play(Write(f2), GrowArrow(net), FadeIn(netl), run_time=1.4)
            self.wait(vo.duration * 0.15)
            self.play(FadeIn(f3), run_time=0.6)
            self.play(FadeIn(f4), run_time=0.6)

    # ------------------------------------------------------------ scene 7: recap
    def s7(self):
        title = T("Chapter 2 in five lines", 38, color=PRIMARY, weight="BOLD").move_to(P(0, 3.2))
        lines = [
            (r"x = (u\cos\theta)t,\ \ y = (u\sin\theta)t - \tfrac12 gt^2", "split: two lines, one clock"),
            (r"R = \frac{u^2\sin 2\theta}{g}", "complementary angles share R"),
            (r"\vec v_{AB} = \vec v_A - \vec v_B", "subtract to change frame"),
            (r"\vec v_{\text{ground}} = \vec v_{\text{rel}} + \vec v_{\text{medium}}", "river, wind and rain"),
            (r"a_c = \frac{v^2}{r}\ \text{inward}", "a turning velocity accelerates"),
        ]
        rows = VGroup()
        for i, (tex, note) in enumerate(lines):
            m = fit(M(tex, 36), 6.4)
            nt = T(note, 24, color=MUTED)
            num = T(f"{i + 1}.", 28, color=PRIMARY, weight="BOLD")
            rows.add(VGroup(num, m, nt))
        rows.arrange(DOWN, buff=0.36, aligned_edge=LEFT).move_to(P(0, -0.1))
        for r in rows:
            r[0].set_x(-6.3)
            r[1].next_to(r[0], RIGHT, buff=0.3)
            r[2].move_to(P(0, r[1].get_y()), aligned_edge=LEFT).set_x(1.6, direction=LEFT)
        with self.voiceover("To recap. Split motion in a plane into two straight lines that share one clock. "
                            "Projectiles follow, and complementary angles share a range.") as vo:
            self.play(FadeIn(title), run_time=0.6)
            self.play(FadeIn(rows[0], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.3)
            self.play(FadeIn(rows[1], shift=0.15 * UP), run_time=0.7)
        with self.voiceover("Subtract velocities to change frame, and add the medium's velocity for rivers, wind and "
                            "rain. A turning velocity means an acceleration v squared over r, toward the "
                            "centre.") as vo:
            self.play(FadeIn(rows[2], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(rows[3], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(rows[4], shift=0.15 * UP), run_time=0.7)
        with self.voiceover("Try the mastery quiz. Then chapter three asks what causes all these accelerations. "
                            "The answer is Newton's laws.") as vo:
            nxt = T("Next: Chapter 3 · Newton's Laws of Motion", 32, color=PRIMARY).move_to(P(0, -3.4))
            self.wait(vo.duration * 0.3)
            self.play(FadeIn(nxt, shift=0.2 * UP), run_time=0.8)
