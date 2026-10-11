import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

# Chapter colour roles (light background).
W_C = PRIMARY  # weight / gravity = strawberry red
N_C = SECONDARY  # normal force = teal
F_C = ACCENT  # applied force / components = amber
FR_C = GREEN  # friction = green
T_C = PURPLE  # tension / net inward force
PS_C = ManimColor("#C2477F")  # pseudo force, flagged pair partners
HL = ManimColor("#D19A00")
WARN = PRIMARY
WOOD = ManimColor("#F3D9C9")
STEEL = ManimColor("#EADFD8")
BLUEB = ManimColor("#DCEBEE")


# ---------------------------------------------------------------- helpers
def T(s, size=30, **kw):
    return Text(s, font_size=size, **kw)


def M(s, size=40, **kw):
    return MathTex(s, font_size=size, **kw)


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


def safe_vec(start, end, color, sw=6):
    if np.linalg.norm(np.array(end) - np.array(start)) < 0.06:
        return VectorizedPoint(start)
    return vec(start, end, color, sw)


def check():
    return MathTex(r"\checkmark", color=GREEN, font_size=52)


def cross_mark():
    return MathTex(r"\times", color=WARN, font_size=60)


def strike(mob, color=WARN, sw=4):
    return Line(mob.get_corner(DL) + 0.05 * DL, mob.get_corner(UR) + 0.05 * UR, color=color, stroke_width=sw)


def header(s):
    return T(s, 24, color=MUTED, weight="BOLD").to_corner(UL, buff=0.35)


def block(w=1.0, h=0.8, fill=WOOD, label=None, size=28):
    r = Rectangle(width=w, height=h, color=INK, stroke_width=3).set_fill(fill, 1)
    if label is None:
        return VGroup(r)
    return VGroup(r, M(label, size).move_to(r))


def flab(s, at, direction, color, size=32, buff=0.1):
    return M(s, size, color=color).next_to(at, direction, buff=buff)


class MfeCh4Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Motion, Forces and Energy",
            "Chapter 4 · Friction and Circular Dynamics",
            "Chapter four. Friction and circular dynamics.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ scene 1: static and kinetic friction
    def s1(self):
        hd = header("4.1 · Static and kinetic friction")
        floor = Line(P(-6.6, -1.8), P(-0.4, -1.8), color=INK, stroke_width=4)
        Fv = ValueTracker(0.0)
        fv = ValueTracker(0.0)
        bx = ValueTracker(-3.6)
        k = 0.055  # units per newton

        def box():
            return block(1.6, 2.2, fill=WOOD).move_to(P(bx.get_value(), -0.7))

        BOX = always_redraw(box)
        Farr = always_redraw(lambda: safe_vec(P(bx.get_value() - 0.8 - k * Fv.get_value(), -0.4),
                                              P(bx.get_value() - 0.8, -0.4), F_C))
        farr = always_redraw(lambda: safe_vec(P(bx.get_value() + 0.2, -1.95),
                                              P(bx.get_value() + 0.2 - k * fv.get_value(), -1.95), FR_C))
        Fl = always_redraw(lambda: M("F", 32, color=F_C).move_to(P(bx.get_value() - 1.2, 0.0)))
        fl = always_redraw(lambda: M("f", 32, color=FR_C).move_to(P(bx.get_value() + 0.6, -2.3)))
        nm = T("nothing moves: f = F", 26, color=MUTED).move_to(P(-3.5, 1.6))
        with self.voiceover("Shove a heavy cupboard across the floor. You push, and nothing happens. Push harder, and "
                            "still nothing. Then it lurches and slides, and once it is moving it is easier to keep "
                            "going. Friction can take many values, it has a maximum, and it drops once sliding "
                            "starts.") as vo:
            self.add(BOX, Farr, farr, Fl, fl)
            self.play(FadeIn(hd), Create(floor), FadeIn(BOX), run_time=0.8)
            self.play(Fv.animate.set_value(12), fv.animate.set_value(12), run_time=1.6)
            self.play(FadeIn(nm), run_time=0.5)
            self.play(Fv.animate.set_value(22), fv.animate.set_value(22), run_time=1.6)
            self.wait(vo.duration * 0.1)
            self.play(Fv.animate.set_value(25), fv.animate.set_value(25), run_time=0.8)
            self.play(fv.animate.set_value(20), run_time=0.3)
            self.play(bx.animate.set_value(-2.6), run_time=1.4, rate_func=rate_functions.ease_in_quad)

        ax = Axes(x_range=[0, 40, 10], y_range=[0, 30, 10], x_length=5.6, y_length=3.6,
                  axis_config={"color": INK, "stroke_width": 2}, tips=False).move_to(P(3.4, -0.3))
        axl = VGroup(M(r"F\ (\text{N})", 26, color=F_C).next_to(ax.x_axis.get_end(), RIGHT, buff=0.15),
                     M(r"f\ (\text{N})", 26, color=FR_C).next_to(ax.y_axis.get_end(), LEFT, buff=0.15))
        nums = VGroup(*[M(str(v), 22, color=MUTED).next_to(ax.c2p(v, 0), DOWN, buff=0.1) for v in (10, 20, 30, 40)],
                      *[M(str(v), 22, color=MUTED).next_to(ax.c2p(0, v), LEFT, buff=0.1) for v in (10, 20)])
        diag = DashedLine(ax.c2p(0, 0), ax.c2p(30, 30), color=GRID, stroke_width=3)
        dot = always_redraw(lambda: Dot(ax.c2p(Fv.get_value(), fv.get_value()), color=FR_C, radius=0.08))
        trace = TracedPath(lambda: ax.c2p(Fv.get_value(), fv.get_value()), stroke_color=FR_C, stroke_width=5)
        peak = M(r"\mu_s N = 25", 28, color=FR_C).next_to(ax.c2p(25, 25), UL, buff=0.08)
        kin = M(r"\mu_k N = 20", 28, color=FR_C).next_to(ax.c2p(36, 20), UP, buff=0.12)
        gl = T("5 kg block, μs = 0.5, μk = 0.4", 24, color=MUTED).move_to(P(3.4, 2.4))
        with self.voiceover("At rest, friction matches your push exactly. For a five kilogram block with mu s of "
                            "point five, friction climbs the forty five degree line up to twenty five newtons. Then "
                            "the block breaks free, and friction drops to mu k N, twenty newtons, however hard you "
                            "pull.") as vo:
            self.play(FadeOut(nm), Create(ax), FadeIn(axl), FadeIn(nums), Create(diag), FadeIn(gl), run_time=1.0)
            Fv.set_value(0)
            fv.set_value(0)
            bx.set_value(-3.6)
            self.add(trace, dot)
            self.wait(0.3)
            self.play(Fv.animate.set_value(25), fv.animate.set_value(25), run_time=3.0, rate_func=linear)
            self.play(FadeIn(peak), run_time=0.5)
            self.wait(vo.duration * 0.1)
            self.play(fv.animate.set_value(20), run_time=0.5)
            self.play(Fv.animate.set_value(38), bx.animate.set_value(-2.4), run_time=2.2, rate_func=linear)
            self.play(FadeIn(kin), run_time=0.5)
        for m in (BOX, Farr, farr, Fl, fl, dot, trace):
            m.clear_updaters()

        c1 = M(r"F = 20\ \text{N} < 25:\quad f = 20\ \text{N}\ \ (\text{not } 25)", 42).move_to(P(0, 1.6))
        c2 = M(r"F = 30\ \text{N} > 25:\quad a = \frac{30 - 20}{5} = 2\ \text{m/s}^2", 42).move_to(P(0, 0.2))
        c3 = M(r"f = \mu N \ \text{ only when sliding or about to slide}", 40, color=PRIMARY).move_to(P(0, -1.3))
        with self.voiceover("So push with twenty newtons, and friction is twenty, not twenty five. Push with thirty, "
                            "and the block slides at thirty minus twenty, over five: two metres per second squared. "
                            "Friction equals mu N only when sliding, or just about to slide.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(Write(c1), run_time=1.4)
            self.wait(vo.duration * 0.15)
            self.play(Write(c2), run_time=1.6)
            self.wait(vo.duration * 0.1)
            self.play(Write(c3), run_time=1.2)

        road = Line(P(-6.6, -2.4), P(6.6, -2.4), color=INK, stroke_width=4)
        bed = Rectangle(width=5.4, height=0.35, color=INK, stroke_width=3).set_fill(STEEL, 1).move_to(P(-2.4, -1.4))
        cab = RoundedRectangle(width=1.8, height=1.9, corner_radius=0.15, color=INK, stroke_width=3)
        cab.set_fill(BLUEB, 1).next_to(bed, RIGHT, buff=0).align_to(bed, DOWN)
        wheels = VGroup(*[Circle(radius=0.38, color=INK, stroke_width=3).set_fill(MUTED, 1).move_to(P(x, -2.02))
                          for x in (-4.3, -1.0, 1.3)])
        bxx = block(1.1, 0.9, fill=WOOD, label=r"20\,\text{kg}", size=24).next_to(bed, UP, buff=0).shift(0.6 * LEFT)
        truck = VGroup(bed, cab, wheels, bxx)
        acc = vec(P(1.8, 1.2), P(3.2, 1.2), F_C)
        accl = M(r"a = 2\ \text{m/s}^2", 32, color=F_C).next_to(acc, UP, buff=0.12)
        fr = vec(bxx.get_bottom() + 0.1 * UP + 0.3 * LEFT, bxx.get_bottom() + 0.1 * UP + 1.1 * RIGHT, FR_C)
        frl = M(r"f = ma = 40\ \text{N}", 30, color=FR_C).next_to(bxx, UP, buff=0.35)
        note = T("friction opposes relative sliding, not motion", 30, color=PRIMARY, weight="BOLD").move_to(P(0, 2.6))
        walk = T("it drags the box forward; it pushes your foot forward when you walk", 24, color=MUTED)
        fit(walk, 12.4).move_to(P(0, -3.3))
        with self.voiceover("And friction opposes relative sliding, not motion. A box on an accelerating truck is "
                            "dragged forward by friction. When you walk, friction pushes you forward too.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(Create(road), FadeIn(truck), FadeIn(note), run_time=0.9)
            self.play(truck.animate.shift(1.2 * RIGHT), GrowArrow(acc), FadeIn(accl), run_time=1.4,
                      rate_func=rate_functions.ease_in_quad)
            fr.shift(1.2 * RIGHT)
            frl.shift(0 * RIGHT)
            self.play(GrowArrow(fr), FadeIn(frl.move_to(bxx.get_top() + 0.5 * UP)), run_time=0.8)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(walk), run_time=0.6)

    # ------------------------------------------------------------ scene 2: friction on an incline
    def s2(self):
        hd = header("4.2 · Friction on an incline")
        th = ValueTracker(10.0)
        A0 = P(-6.2, -2.6)
        L = 6.0
        slid = ValueTracker(0.0)

        def geo():
            a = th.get_value()
            u = U(a)
            n = U(a + 90)
            c = A0 + (3.8 - slid.get_value()) * u + 0.42 * n
            return a, u, n, c

        def wedge():
            a = th.get_value()
            return Polygon(A0, A0 + L * RIGHT, A0 + L * RIGHT + L * np.tan(a * DEGREES) * UP, color=INK,
                           stroke_width=3).set_fill(STEEL, 1)

        def blk():
            a, u, n, c = geo()
            return Square(side_length=0.84, color=INK, stroke_width=3).set_fill(WOOD, 1).rotate(a * DEGREES).move_to(c)

        def pull():
            a, u, n, c = geo()
            return vec(c, c - 2.6 * np.sin(a * DEGREES) * u, F_C, sw=5)

        def fric():
            a, u, n, c = geo()
            base = c - 0.42 * n
            if slid.get_value() > 0.01:
                mag = 2.6 * 0.4 * np.cos(a * DEGREES)
            else:
                mag = 2.6 * np.sin(a * DEGREES)
            return vec(base, base + mag * u, FR_C, sw=5)

        W = always_redraw(wedge)
        B = always_redraw(blk)
        PL = always_redraw(pull)
        FR = always_redraw(fric)
        arc = always_redraw(lambda: Arc(radius=0.9, start_angle=0, angle=th.get_value() * DEGREES, arc_center=A0,
                                        color=INK, stroke_width=3))
        # bars: needed vs available
        bx0 = 2.6
        by = -2.4
        sc = 4.0

        def need():
            return Rectangle(width=0.9, height=max(sc * np.sin(th.get_value() * DEGREES), 0.01), stroke_width=0)\
                .set_fill(F_C, 0.9).move_to(P(bx0, by), aligned_edge=DOWN)

        def avail():
            return Rectangle(width=0.9, height=sc * 0.5 * np.cos(th.get_value() * DEGREES), stroke_width=0)\
                .set_fill(FR_C, 0.9).move_to(P(bx0 + 1.6, by), aligned_edge=DOWN)

        NB = always_redraw(need)
        AB = always_redraw(avail)
        base = Line(P(bx0 - 0.8, by), P(bx0 + 2.4, by), color=INK, stroke_width=2)
        nl = M(r"\text{needed}\\ mg\sin\theta", 26, color=F_C).next_to(P(bx0, by), DOWN, buff=0.15)
        al = M(r"\text{max}\\ \mu_s mg\cos\theta", 26, color=FR_C).next_to(P(bx0 + 1.6, by), DOWN, buff=0.15)
        thl = M(r"\theta =", 36).move_to(P(4.6, 2.4))
        thv = DecimalNumber(10, num_decimal_places=1, unit=r"^\circ", font_size=36, color=INK)
        thv.add_updater(lambda m: m.set_value(th.get_value()).next_to(thl, RIGHT, buff=0.15))
        mu = M(r"\mu_s = 0.5", 32, color=MUTED).next_to(thl, DOWN, buff=0.3).align_to(thl, LEFT)
        rep = M(r"\tan\theta_r = \mu_s", 48, color=PRIMARY).move_to(P(4.4, 0.9))
        rbox = SurroundingRectangle(rep, buff=0.2, corner_radius=0.12, color=PRIMARY, stroke_width=3)
        repn = T("angle of repose: mass cancels", 22, color=MUTED).next_to(rbox, DOWN, buff=0.15)
        with self.voiceover("Tilt a book with a coin on it. The coin holds, then suddenly slides. At rest, friction "
                            "must hold m g sin theta, and it can give at most mu s m g cos theta. So the steepest "
                            "angle, the angle of repose, has tan theta equal to mu s, whatever the mass.") as vo:
            self.add(W, arc, B, PL, FR, NB, AB)
            self.play(FadeIn(hd), FadeIn(W), FadeIn(arc), FadeIn(B), FadeIn(PL), FadeIn(FR), run_time=0.8)
            self.play(Create(base), FadeIn(NB), FadeIn(AB), FadeIn(nl), FadeIn(al), FadeIn(thl), FadeIn(thv),
                      FadeIn(mu), run_time=0.8)
            self.play(th.animate.set_value(26.57), run_time=4.5, rate_func=linear)
            self.play(Flash(B.get_center(), color=HL), run_time=0.5)
            self.play(slid.animate.set_value(2.4), run_time=1.4, rate_func=rate_functions.ease_in_quad)
            self.play(Write(rep), Create(rbox), FadeIn(repn), run_time=1.0)
        for m in (W, arc, B, PL, FR, NB, AB, thv):
            m.clear_updaters()

        g1 = M(r"10\ \text{kg on } 37^\circ:\quad mg\sin\theta = 60\ \text{N}, \quad \mu_s mg\cos\theta = 40\ \text{N}", 38)
        fit(g1, 12.6).move_to(P(0, 2.4))
        nlne = NumberLine(x_range=[0, 120, 20], length=11, color=INK, include_numbers=True, font_size=26,
                          decimal_number_config={"num_decimal_places": 0, "color": INK}).move_to(P(0, 0.2))
        unitl = M(r"F\ (\text{N, up the slope})", 26, color=MUTED).next_to(nlne, DOWN, buff=0.55)
        band = Line(nlne.n2p(20), nlne.n2p(100), color=GREEN, stroke_width=14).set_opacity(0.6)
        lo = T("friction up the slope,\nat its limit", 22, color=FR_C).next_to(nlne.n2p(20), UP, buff=0.4)
        mid = M(r"f = 0", 30, color=INK).next_to(nlne.n2p(60), UP, buff=0.4)
        hi = T("friction down the slope,\nat its limit", 22, color=FR_C).next_to(nlne.n2p(100), UP, buff=0.4)
        rng = M(r"mg(\sin\theta - \mu_s\cos\theta) \le F \le mg(\sin\theta + \mu_s\cos\theta)", 38, color=PRIMARY)
        fit(rng, 12.4).move_to(P(0, -2.7))
        with self.voiceover("Push along the slope, and friction can flip. Ten kilograms on a thirty seven degree "
                            "slope with mu s of point five: gravity pulls sixty newtons down the slope, and friction "
                            "can give forty either way. Any push from twenty to a hundred newtons holds it. At sixty, "
                            "friction is zero.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(Write(g1), run_time=1.6)
            self.play(Create(nlne), FadeIn(unitl), run_time=0.8)
            self.wait(vo.duration * 0.15)
            self.play(Create(band), FadeIn(lo), FadeIn(hi), run_time=1.2)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(mid), run_time=0.6)
            self.play(Write(rng), run_time=1.4)

        ax = Axes(x_range=[0, 5, 1], y_range=[-12, 16, 4], x_length=5.4, y_length=4.6,
                  axis_config={"color": INK, "stroke_width": 2}, tips=False).move_to(P(-3.7, -0.5))
        axl = VGroup(M(r"t\ (\text{s})", 24, color=MUTED).next_to(ax.x_axis.get_end(), RIGHT, buff=0.1),
                     M(r"v\ (\text{m/s})", 24, color=MUTED).next_to(ax.y_axis.get_end(), UP, buff=0.1))
        nums = VGroup(*[M(str(v), 22, color=MUTED).next_to(ax.c2p(0, v), LEFT, buff=0.1) for v in (-8, 8, 16)],
                      *[M(str(v), 22, color=MUTED).next_to(ax.c2p(v, 0), DOWN, buff=0.1) for v in (2, 4)])
        up = Line(ax.c2p(0, 16), ax.c2p(2, 0), color=F_C, stroke_width=5)
        dn = Line(ax.c2p(2, 0), ax.c2p(2 + 2 * np.sqrt(2), -8 * np.sqrt(2)), color=N_C, stroke_width=5)
        e1 = M(r"\text{up: } a = g(\sin\theta + \mu_k\cos\theta) = 8", 38, color=F_C).move_to(P(3.3, 1.8))
        e2 = M(r"\text{stops in } 2\ \text{s, after } 16\ \text{m}", 36).next_to(e1, DOWN, buff=0.3)
        e3 = M(r"\text{down: } a = g(\sin\theta - \mu_k\cos\theta) = 4", 38, color=N_C).next_to(e2, DOWN, buff=0.45)
        e4 = M(r"16 = \tfrac12(4)t^2 \Rightarrow t = 2\sqrt2 \approx 2.8\ \text{s}", 36).next_to(e3, DOWN, buff=0.3)
        col = VGroup(e1, e2, e3, e4)
        fit(col, 6.6)
        col.move_to(P(3.4, 0.2))
        with self.voiceover("Once it slides, kinetic friction opposes the sliding. Going up, it adds to gravity. "
                            "Coming down, it fights gravity. A block launched up a thirty seven degree slope at "
                            "sixteen metres per second, with mu k a quarter, decelerates at eight and stops in two "
                            "seconds. It slides back at only four, taking two root two seconds.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(Create(ax), FadeIn(axl), FadeIn(nums), run_time=0.9)
            self.wait(vo.duration * 0.12)
            self.play(Create(up), Write(e1), run_time=1.4)
            self.play(Write(e2), run_time=1.0)
            self.wait(vo.duration * 0.05)
            self.play(Create(dn), Write(e3), run_time=1.4)
            self.play(Write(e4), run_time=1.2)

    # ------------------------------------------------------------ scene 3: block on block
    def s3(self):
        hd = header("4.3 · Block-on-block problems")
        floor = Line(P(-6.6, -1.6), P(1.4, -1.6), color=INK, stroke_width=4)
        smooth = T("smooth floor", 20, color=MUTED).next_to(floor, DOWN, buff=0.1).set_x(-5.4)
        bot = block(3.2, 0.9, fill=BLUEB, label=r"4\,\text{kg}", size=28).move_to(P(-3.6, -1.15))
        top = block(1.3, 1.0, fill=WOOD, label=r"2\,\text{kg}", size=28).move_to(P(-3.0, -0.2))
        F = vec(bot.get_right(), bot.get_right() + 1.9 * RIGHT, F_C)
        Fl = flab("F", F.get_end(), UP, F_C, 34)
        f_top = vec(P(-3.55, -0.56), P(-2.55, -0.56), FR_C, sw=5)
        f_topl = flab(r"f", top, UP, FR_C, 30)
        f_bot = vec(P(-3.0, -1.15), P(-4.1, -1.15), PS_C, sw=5).move_to(P(-4.4, -0.85))
        f_botl = flab(r"f", f_bot, LEFT, PS_C, 30)
        steps = VGroup(*[T(s, 24) for s in ("1. assume they move together", "2. find the friction the top needs",
                                             "3. compare it with μN", "4. too big? they slip: use μkN")])
        steps.arrange(DOWN, buff=0.25, aligned_edge=LEFT).move_to(P(3.8, 1.4))
        with self.voiceover("Pull the bottom one of two stacked blocks. The only horizontal force on the top block is "
                            "friction, so its acceleration has a ceiling: mu g. Assume they move together, find the "
                            "friction the top block needs, and compare it with mu N.") as vo:
            self.play(FadeIn(hd), Create(floor), FadeIn(smooth), FadeIn(bot), FadeIn(top), run_time=0.8)
            self.play(GrowArrow(F), FadeIn(Fl), run_time=0.7)
            self.play(GrowArrow(f_top), FadeIn(f_topl), run_time=0.8)
            self.wait(vo.duration * 0.15)
            self.play(LaggedStart(*[FadeIn(s, shift=0.1 * RIGHT) for s in steps], lag_ratio=0.5), run_time=3.0)

        e1 = M(r"a_{\text{top}} \le \mu g = 3\ \text{m/s}^2 \ \Rightarrow\ F_{\text{crit}} = 6 \times 3 = 18\ \text{N}", 36)
        e2 = M(r"F = 10:\ \text{together},\ a = \tfrac{10}{6} = \tfrac53\ \text{m/s}^2", 36)
        e3 = M(r"F = 30:\ \text{slip},\ a_{\text{top}} = 3,\ \ a_{\text{bottom}} = \tfrac{30 - 6}{4} = 6", 36)
        col = VGroup(e1, e2, e3).arrange(DOWN, buff=0.35, aligned_edge=LEFT)
        fit(col, 12.4).move_to(P(0, 2.2))
        e3[0][-1].set_color(GREEN)
        with self.voiceover("Two kilograms on four, with mu of point three. The top block can reach at most three "
                            "metres per second squared, so the critical pull is six times three: eighteen newtons. "
                            "At ten newtons they move together at five thirds. At thirty they slip: the top block "
                            "at three, the bottom at six.") as vo:
            self.play(FadeOut(steps), run_time=0.4)
            self.play(Write(e1), run_time=1.6)
            self.wait(vo.duration * 0.1)
            self.play(Write(e2), run_time=1.4)
            self.wait(vo.duration * 0.05)
            self.play(Write(e3), run_time=1.6)
            grp_b = VGroup(bot, F, Fl)
            grp_t = VGroup(top, f_top, f_topl)
            self.play(grp_b.animate.shift(2.6 * RIGHT), grp_t.animate.shift(1.3 * RIGHT), run_time=1.8,
                      rate_func=rate_functions.ease_in_quad)

        n1 = T("friction on the top block points forward:", 28, color=FR_C).move_to(P(2.8, -2.4))
        n2 = T("it is the only force that moves it", 28, color=FR_C).next_to(n1, DOWN, buff=0.15)
        f_bot.move_to(P(-2.0, -0.85))
        f_botl.next_to(f_bot, LEFT, buff=0.1)
        pair = T("third-law partner drags the bottom back", 24, color=PS_C).move_to(P(-3.4, -3.3))
        with self.voiceover("Notice which way friction points on the top block: forward. It is the only force that "
                            "makes it move at all. Its third-law partner drags the bottom block back.") as vo:
            self.play(Indicate(f_top, color=FR_C), FadeIn(n1), FadeIn(n2), run_time=1.2)
            self.wait(vo.duration * 0.2)
            self.play(GrowArrow(f_bot), FadeIn(f_botl), run_time=0.8)
            self.play(FadeIn(pair), run_time=0.6)

    # ------------------------------------------------------------ scene 4: dynamics of circular motion
    def s4(self):
        hd = header("4.4 · Dynamics of circular motion")
        C = P(-3.2, -0.3)
        R = 2.1
        ph = ValueTracker(-90.0)
        circ = DashedVMobject(Circle(radius=R, color=GRID, stroke_width=3).move_to(C), num_dashes=50)

        def spos():
            return C + R * U(ph.get_value())

        string = always_redraw(lambda: Line(C, spos(), color=T_C, stroke_width=3))
        stone = always_redraw(lambda: Dot(spos(), radius=0.15, color=INK))
        vel = always_redraw(lambda: vec(spos(), spos() + 1.3 * U(ph.get_value() + 90), N_C, sw=5))
        inw = always_redraw(lambda: vec(spos(), spos() + 1.0 * U(ph.get_value() + 180), T_C, sw=5))
        cen = Dot(C, radius=0.06, color=INK)
        with self.voiceover("Whirl a stone on a string, and let go. It flies off along the tangent, not outward. The "
                            "string had one job: pulling inward, bending the path at every moment.") as vo:
            self.add(string, stone, vel, inw)
            self.play(FadeIn(hd), Create(circ), FadeIn(cen), FadeIn(string), FadeIn(stone), FadeIn(vel),
                      FadeIn(inw), run_time=0.8)
            self.play(ph.animate.set_value(180), run_time=3.4, rate_func=linear)
            for m in (string, stone, vel, inw):
                m.clear_updaters()
            path = Line(spos(), spos() + 3.2 * DOWN)
            self.play(FadeOut(string), FadeOut(inw), FadeOut(vel), run_time=0.2)
            self.play(MoveAlongPath(stone, path), run_time=1.3, rate_func=linear)
            wrong = DashedLine(C + R * LEFT, C + (R + 1.3) * LEFT, color=WARN, stroke_width=4)
            wx = cross_mark().scale(0.6).next_to(wrong, UP, buff=0.05)
            self.play(Create(wrong), FadeIn(wx), run_time=0.6)

        law = M(r"\sum F_{\text{inward}} = \frac{mv^2}{r}", 54, color=PRIMARY).move_to(P(3.4, 1.8))
        lbox = SurroundingRectangle(law, buff=0.25, corner_radius=0.15, color=PRIMARY, stroke_width=3)
        job = T("centripetal force is a job title,", 26, color=MUTED).next_to(lbox, DOWN, buff=0.35)
        job2 = T("not a new force", 26, color=MUTED).next_to(job, DOWN, buff=0.12)
        with self.voiceover("So centripetal force is not a new kind of force. It is a job title. Whatever real "
                            "forces act, their inward sum must equal m v squared over r.") as vo:
            self.play(Write(law), Create(lbox), run_time=1.4)
            self.wait(vo.duration * 0.15)
            self.play(FadeIn(job), FadeIn(job2), run_time=0.7)

        # flat curve, top view
        Cc = P(-3.4, -1.4)
        r0 = 2.6
        road_o = Arc(radius=r0 + 0.45, start_angle=20 * DEGREES, angle=140 * DEGREES, arc_center=Cc, color=INK,
                     stroke_width=3)
        road_i = Arc(radius=r0 - 0.45, start_angle=20 * DEGREES, angle=140 * DEGREES, arc_center=Cc, color=INK,
                     stroke_width=3)
        mid = DashedVMobject(Arc(radius=r0, start_angle=20 * DEGREES, angle=140 * DEGREES, arc_center=Cc,
                                 color=GRID, stroke_width=3), num_dashes=24)
        car = RoundedRectangle(width=0.9, height=0.5, corner_radius=0.1, color=INK, stroke_width=3)
        car.set_fill(BLUEB, 1).move_to(Cc + r0 * UP)
        cdot = Dot(Cc, radius=0.07, color=INK)
        cl = T("centre", 20, color=MUTED).next_to(cdot, DOWN, buff=0.1)
        fa = vec(Cc + r0 * UP + 0.25 * DOWN, Cc + (r0 - 1.3) * UP, FR_C)
        fal = M(r"f", 32, color=FR_C).next_to(fa, RIGHT, buff=0.1)
        tv = T("top view", 20, color=MUTED).move_to(Cc + (r0 + 0.95) * UP + 1.6 * LEFT)
        e1 = M(r"\frac{mv^2}{r} \le \mu mg", 48).move_to(P(3.4, 1.8))
        e2 = M(r"v_{\max} = \sqrt{\mu r g}", 52, color=PRIMARY).next_to(e1, DOWN, buff=0.4)
        e3 = M(r"\sqrt{0.5 \times 80 \times 10} = 20\ \text{m/s}", 40).next_to(e2, DOWN, buff=0.4)
        e4 = T("mass cancels: truck or scooter, same limit", 24, color=MUTED).next_to(e3, DOWN, buff=0.35)
        with self.voiceover("On a flat curve, only friction can point inward, so m v squared over r can be at most "
                            "mu m g. The top speed is root mu r g, and the mass cancels. On an eighty metre curve with "
                            "mu of point five, that is twenty metres per second.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(Create(road_o), Create(road_i), Create(mid), FadeIn(car), FadeIn(cdot), FadeIn(cl), FadeIn(tv),
                      run_time=1.0)
            self.play(GrowArrow(fa), FadeIn(fal), run_time=0.7)
            self.play(Write(e1), run_time=1.0)
            self.wait(vo.duration * 0.1)
            self.play(Write(e2), run_time=1.0)
            self.play(Write(e3), FadeIn(e4), run_time=1.2)

        piv = P(-3.4, 2.5)
        Lp = 3.2
        thc = 35 * DEGREES
        bob = piv + Lp * np.array([np.sin(thc), -np.cos(thc), 0])
        cc = P(piv[0], bob[1])
        ceil = Line(piv + 0.7 * LEFT, piv + 0.7 * RIGHT, color=INK, stroke_width=4)
        orbit = DashedVMobject(Ellipse(width=2 * Lp * np.sin(thc), height=0.6, color=GRID, stroke_width=3).move_to(cc),
                               num_dashes=40)
        st = Line(piv, bob, color=INK, stroke_width=3)
        axis = DashedLine(piv, cc, color=MUTED, stroke_width=2)
        bb = Circle(radius=0.2, color=INK, stroke_width=3).set_fill(PRIMARY, 1).move_to(bob)
        Tv = vec(bob, bob + 1.7 * (piv - bob) / np.linalg.norm(piv - bob), T_C)
        Tvl = flab("T", Tv.get_end(), RIGHT, T_C, 30)
        Th = DashedLine(bob, bob + 1.7 * np.sin(thc) * LEFT, color=T_C, stroke_width=4)
        Tvv = DashedLine(bob, bob + 1.7 * np.cos(thc) * UP, color=T_C, stroke_width=4)
        Wg = vec(bob, bob + 1.4 * DOWN, W_C)
        Wgl = flab("mg", Wg.get_end(), RIGHT, W_C, 30)
        thl = M(r"\theta", 30).move_to(piv + 0.8 * np.array([np.sin(thc / 2), -np.cos(thc / 2), 0]))
        q1 = M(r"T\cos\theta = mg", 42).move_to(P(3.4, 1.8))
        q2 = M(r"T\sin\theta = \frac{mv^2}{r}", 42).next_to(q1, DOWN, buff=0.35)
        q3 = M(r"\tan\theta = \frac{v^2}{rg}", 50, color=GREEN).next_to(q2, DOWN, buff=0.45)
        cp = T("conical pendulum", 24, color=MUTED).move_to(P(3.4, 2.9))
        with self.voiceover("A conical pendulum follows the same rule. The tension's vertical part holds up the "
                            "weight, its horizontal part bends the path, and tan theta equals v squared over r g.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(Create(ceil), Create(orbit), Create(axis), Create(st), FadeIn(bb), FadeIn(thl), FadeIn(cp),
                      run_time=1.0)
            self.play(GrowArrow(Tv), FadeIn(Tvl), GrowArrow(Wg), FadeIn(Wgl), run_time=0.8)
            self.play(Create(Th), Create(Tvv), Write(q1), run_time=1.1)
            self.play(Write(q2), run_time=1.0)
            self.play(Write(q3), run_time=1.0)

    # ------------------------------------------------------------ scene 5: banking
    def s5(self):
        hd = header("4.5 · Banking of roads")
        th = 20 * DEGREES
        A0 = P(-6.4, -2.6)
        Lr = 6.6
        road = Polygon(A0, A0 + Lr * RIGHT, A0 + Lr * RIGHT + Lr * np.tan(th) * UP, color=INK, stroke_width=3)
        road.set_fill(STEEL, 1)
        u = U(20)
        n = U(110)
        c = A0 + 3.6 * u / np.cos(0) * 1.0 + 0.38 * n
        c = A0 + (3.6 / np.cos(th)) * np.array([np.cos(th), np.sin(th), 0]) * np.cos(th) + 0.38 * n
        car = RoundedRectangle(width=1.3, height=0.62, corner_radius=0.1, color=INK, stroke_width=3)
        car.set_fill(BLUEB, 1).rotate(th).move_to(c)
        Nv = vec(c, c + 2.4 * n, N_C)
        Nl = flab("N", Nv.get_end(), LEFT, N_C, 32)
        Wv = vec(c, c + 2.25 * DOWN, W_C)
        Wl = flab("mg", Wv.get_end(), RIGHT, W_C, 30)
        Ny = DashedLine(c, c + 2.4 * np.cos(th) * UP, color=N_C, stroke_width=4)
        Nx = DashedLine(Ny.get_end(), Ny.get_end() + 2.4 * np.sin(th) * LEFT, color=N_C, stroke_width=4)
        Nxl = M(r"N\sin\theta", 28, color=N_C).next_to(Nx, UP, buff=0.12)
        Nyl = M(r"N\cos\theta", 28, color=N_C).next_to(Ny, RIGHT, buff=0.12)
        cen = vec(P(-1.2, 1.6), P(-3.0, 1.6), MUTED, sw=4)
        cenl = T("to the centre", 22, color=MUTED).next_to(cen, UP, buff=0.1)
        arc = Arc(radius=1.0, start_angle=0, angle=th, arc_center=A0, color=INK, stroke_width=3)
        thl = M(r"\theta", 28).move_to(A0 + 1.3 * U(10))
        e1 = M(r"N\cos\theta = mg", 38).move_to(P(3.8, 2.6))
        e2 = M(r"N\sin\theta = \frac{mv^2}{r}", 38).next_to(e1, DOWN, buff=0.25)
        e3 = M(r"\tan\theta = \frac{v^2}{rg}", 42, color=GREEN).next_to(e2, DOWN, buff=0.3)
        e4 = M(r"v_{\text{opt}} = \sqrt{rg\tan\theta}", 42, color=PRIMARY).next_to(e3, DOWN, buff=0.3)
        with self.voiceover("Tilt the road towards the centre, and the normal force leans inward. With no friction, "
                            "N cos theta holds up the weight, and N sin theta supplies m v squared over r. So tan "
                            "theta equals v squared over r g, and the design speed is root r g tan theta.") as vo:
            self.play(FadeIn(hd), FadeIn(road), FadeIn(car), Create(arc), FadeIn(thl), GrowArrow(cen), FadeIn(cenl),
                      run_time=1.0)
            self.play(GrowArrow(Wv), FadeIn(Wl), GrowArrow(Nv), FadeIn(Nl), run_time=0.9)
            self.play(Create(Nx), Create(Ny), FadeIn(Nxl), FadeIn(Nyl), run_time=0.8)
            self.wait(vo.duration * 0.05)
            self.play(Write(e1), run_time=0.9)
            self.play(Write(e2), run_time=1.0)
            self.play(Write(e3), run_time=0.9)
            self.play(Write(e4), run_time=1.0)

        sp = ValueTracker(0.0)  # -1 slow ... +1 fast
        base = c - 0.31 * n

        def fr():
            s = sp.get_value()
            if abs(s) < 0.04:
                return VectorizedPoint(base)
            d = -u if s > 0 else u
            return vec(base + 0.1 * d, base + 0.1 * d + 1.4 * abs(s) * d, FR_C)

        FR = always_redraw(fr)
        lab = always_redraw(lambda: T("faster: friction down the slope" if sp.get_value() > 0.04 else
                                      ("slower: friction up the slope" if sp.get_value() < -0.04 else
                                       "at v_opt: no friction needed"), 26, color=FR_C).move_to(P(-2.6, 2.8)))
        ex = M(r"r = 30\ \text{m},\ 15^\circ:\ v_{\text{opt}} = \sqrt{30 \cdot 10 \cdot 0.268} \approx 9\ \text{m/s}", 34)
        fit(ex, 6.4).move_to(P(3.8, -2.2))
        mis = M(r"N = m\Big(g\cos\theta + \frac{v^2}{r}\sin\theta\Big) > mg\cos\theta", 34, color=PRIMARY)
        fit(mis, 6.4).move_to(P(3.8, -3.1))
        with self.voiceover("Faster than that, the car tends to slide up and out, so friction acts down the slope. "
                            "Slower, it acts up the slope. A thirty metre curve banked at fifteen degrees has a design "
                            "speed of about nine metres per second. And N is more than m g cos theta, because the car "
                            "is accelerating.") as vo:
            self.add(FR, lab)
            self.play(FadeIn(lab), run_time=0.4)
            self.play(sp.animate.set_value(1.0), run_time=1.4)
            self.wait(vo.duration * 0.1)
            self.play(sp.animate.set_value(-1.0), run_time=2.0)
            self.play(sp.animate.set_value(0.0), run_time=1.0)
            self.play(Write(ex), run_time=1.4)
            self.wait(vo.duration * 0.05)
            self.play(Write(mis), run_time=1.4)
        FR.clear_updaters()
        lab.clear_updaters()

    # ------------------------------------------------------------ scene 6: vertical circle
    def s6(self):
        hd = header("4.6 · Motion in a vertical circle")
        C = P(-3.4, -0.1)
        S = 2.2  # scene units per metre (R = 1 m)
        g = 10.0
        u2 = ValueTracker(64.0)
        th = ValueTracker(0.0)

        def bpos():
            a = th.get_value() * DEGREES
            return C + S * np.array([np.sin(a), -np.cos(a), 0])

        def tension():
            a = th.get_value() * DEGREES
            return u2.get_value() - 2 * g + 3 * g * np.cos(a)

        circ = Circle(radius=S, color=GRID, stroke_width=3).move_to(C)
        cen = Dot(C, radius=0.06, color=INK)
        string = always_redraw(lambda: Line(C, bpos(), color=INK, stroke_width=3))
        bob = always_redraw(lambda: Circle(radius=0.18, color=INK, stroke_width=3).set_fill(PRIMARY, 1).move_to(bpos()))
        Tarr = always_redraw(lambda: safe_vec(bpos(), bpos() + 0.022 * max(tension(), 0) * (C - bpos()) / S, T_C, sw=6))
        hline = always_redraw(lambda: DashedLine(P(C[0] - S - 0.3, bpos()[1]), P(C[0] + S + 0.3, bpos()[1]),
                                                 color=GRID, stroke_width=2))
        hl = always_redraw(lambda: M(r"h = R(1 - \cos\theta)", 26, color=MUTED)
                           .next_to(P(C[0] - S - 0.3, bpos()[1]), UP, buff=0.08).shift(0.9 * RIGHT))
        tl = M(r"T =", 36, color=T_C).move_to(P(0.4, -2.9))
        tv = DecimalNumber(74, num_decimal_places=0, font_size=36, color=T_C, unit=r"\text{N}",
                           unit_buff_per_font_unit=0.003)
        tv.add_updater(lambda m: m.set_value(max(tension(), 0)).next_to(tl, RIGHT, buff=0.15))
        cfg = M(r"m = 1\ \text{kg},\ R = 1\ \text{m},\ u = 8\ \text{m/s}", 30, color=MUTED).move_to(P(4.4, -2.9))
        e1 = M(r"v^2 = u^2 - 2gR(1 - \cos\theta)", 42).move_to(P(3.6, 2.2))
        e1n = M(r"= u^2 - 2gh", 36, color=MUTED).next_to(e1, DOWN, buff=0.2).align_to(e1, RIGHT)
        with self.voiceover("In a vertical circle, gravity changes the speed as you go round. The tangential "
                            "equation gives v squared equals u squared, minus two g R times one minus cos theta. "
                            "That is just v squared equals u squared minus two g h.") as vo:
            self.add(hline, string, bob)
            self.play(FadeIn(hd), Create(circ), FadeIn(cen), FadeIn(string), FadeIn(bob), FadeIn(cfg), run_time=0.9)
            self.play(Write(e1), run_time=1.4)
            self.add(hl)
            self.play(th.animate.set_value(130), FadeIn(hline), FadeIn(hl), run_time=3.0)
            self.play(FadeIn(e1n), run_time=0.6)
            self.play(th.animate.set_value(0), run_time=1.6)

        e2 = M(r"T = \frac{mv^2}{R} + mg\cos\theta", 42).next_to(e1n, DOWN, buff=0.4).set_x(3.6)
        e3 = M(r"T_{\text{bottom}} - T_{\text{top}} = 6mg", 42, color=GREEN).next_to(e2, DOWN, buff=0.4)
        with self.voiceover("The radial equation gives the tension: m v squared over R, plus m g cos theta. It is "
                            "largest at the bottom and smallest at the top, and the difference is always six m g.") as vo:
            self.add(Tarr)
            self.play(Write(e2), FadeIn(Tarr), FadeIn(tl), FadeIn(tv), run_time=1.2)
            self.play(th.animate.set_value(180), run_time=3.0, rate_func=linear)
            self.wait(vo.duration * 0.05)
            self.play(Write(e3), run_time=1.2)
            self.play(th.animate.set_value(360), run_time=2.4, rate_func=linear)
            th.set_value(0)

        # slack: u^2 = 3gR
        ts = np.degrees(np.arccos(-1 / 3))
        a = ts * DEGREES
        x0, y0 = np.sin(a), -np.cos(a)
        vs = np.sqrt(30 - 20 + 20 * np.cos(a))  # v^2 = u^2 - 2gR(1 - cos)
        vx, vy = vs * np.cos(a), vs * np.sin(a)
        tt = np.linspace(0, 1.0, 400)
        tend = 0.9
        for t_ in tt[1:]:
            xx, yy = x0 + vx * t_, y0 + vy * t_ - 5 * t_ ** 2
            if xx * xx + yy * yy >= 1.0:
                tend = t_
                break
        para = ParametricFunction(lambda t_: C + S * np.array([x0 + vx * t_, y0 + vy * t_ - 5 * t_ ** 2, 0]),
                                  t_range=[0, tend], color=PRIMARY, stroke_width=5)
        cond = M(r"T_{\text{top}} \ge 0 \;\Rightarrow\; u \ge \sqrt{5gR}", 46, color=PRIMARY)
        cbox = SurroundingRectangle(cond, buff=0.2, corner_radius=0.12, color=PRIMARY, stroke_width=3)
        cg = VGroup(cond, cbox).move_to(P(3.6, -0.6))
        sl = fit(T("slower: slack before the top, then a parabola", 24, color=WARN), 5.8).move_to(P(3.7, -1.7))
        newcfg = M(r"u = \sqrt{3gR}:\ \ \cos\theta = -\tfrac13", 32, color=MUTED).move_to(P(4.4, -2.9))
        with self.voiceover("A string can only pull, so the tension at the top must stay at least zero. That needs u "
                            "of at least root five g R at the bottom. Start slower, and the string goes slack before "
                            "the top, and the bob leaves the circle on a parabola.") as vo:
            self.play(FadeOut(e1), FadeOut(e1n), FadeOut(e2), FadeOut(e3), run_time=0.4)
            self.play(Write(cond), Create(cbox), run_time=1.3)
            self.wait(vo.duration * 0.1)
            self.play(FadeOut(cfg), FadeIn(newcfg), FadeIn(sl), run_time=0.6)
            u2.set_value(30.0)
            self.play(th.animate.set_value(ts), run_time=2.6, rate_func=linear)
            for m in (string, bob, Tarr, hline, hl, tv):
                m.clear_updaters()
            self.play(Flash(bob.get_center(), color=HL), FadeOut(Tarr), string.animate.set_opacity(0.25), run_time=0.6)
            self.play(Create(para), MoveAlongPath(bob, para), run_time=1.4, rate_func=linear)

    # ------------------------------------------------------------ scene 7: recap
    def s7(self):
        title = T("Chapter 4 in six lines", 38, color=PRIMARY, weight="BOLD").move_to(P(0, 3.2))
        lines = [
            (r"f_s \le \mu_s N,\quad f_k = \mu_k N", "friction supplies only what is needed"),
            (r"\tan\theta_r = \mu_s", "compare mg sinθ with μs mg cosθ"),
            (r"F_{\text{crit}} = (m_1 + m_2)\mu g", "assume together, then check μN"),
            (r"\sum F_{\text{in}} = \frac{mv^2}{r}", "centripetal is a job title"),
            (r"v_{\text{opt}} = \sqrt{rg\tan\theta}", "banking: N leans inward"),
            (r"u \ge \sqrt{5gR}", "vertical circle: string must stay taut"),
        ]
        rows = VGroup()
        for i, (tex, note) in enumerate(lines):
            m = M(tex, 34)
            nt = T(note, 22, color=MUTED)
            num = T(f"{i + 1}.", 28, color=PRIMARY, weight="BOLD")
            rows.add(VGroup(num, m, nt))
        rows.arrange(DOWN, buff=0.3, aligned_edge=LEFT).move_to(P(0, -0.2))
        for r in rows:
            r[0].set_x(-6.2)
            r[1].next_to(r[0], RIGHT, buff=0.3)
            r[2].move_to(P(0, r[1].get_y()), aligned_edge=LEFT).set_x(1.2, direction=LEFT)
        with self.voiceover("To recap. Static friction supplies only what is needed, up to mu s N. On an incline, "
                            "compare m g sin theta with the most friction can give. For stacked blocks, assume they "
                            "move together, then check.") as vo:
            self.play(FadeIn(title), run_time=0.6)
            for i in (0, 1, 2):
                self.play(FadeIn(rows[i], shift=0.15 * UP), run_time=0.7)
                if i < 2:
                    self.wait(vo.duration * 0.18)
        with self.voiceover("In circular motion, the net inward force must be m v squared over r, whoever supplies "
                            "it. Banking tilts the normal force inward. And a string in a vertical circle must stay "
                            "taut.") as vo:
            for i in (3, 4, 5):
                self.play(FadeIn(rows[i], shift=0.15 * UP), run_time=0.7)
                if i < 5:
                    self.wait(vo.duration * 0.2)
        with self.voiceover("Try the mastery quiz. Then chapter five turns all that integrating of v d v into one "
                            "tool, the work-energy theorem, and many of these problems collapse to a line.") as vo:
            nxt = T("Next: Chapter 5 · Work, Energy and Power", 32, color=PRIMARY).move_to(P(0, -3.5))
            self.wait(vo.duration * 0.3)
            self.play(FadeIn(nxt, shift=0.2 * UP), run_time=0.8)
