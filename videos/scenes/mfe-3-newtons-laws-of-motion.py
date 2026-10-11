import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

import re  # noqa: E402

# `say` reads a lone "a" as the article "uh"; spell the variable as a letter.
LA = "[[char LTRL]]a[[char NORM]]"
SAY_A = ['accelerating at a,', 'equals a over g', 'g plus a.', 'm a.', 'm a along', 'm a, so', 'm a, opposite', 'm a nought']


def say_fix(text):
    for ph in SAY_A:
        text = text.replace(ph, re.sub(r"(?<![A-Za-z])a(?![A-Za-z])", LA, ph))
    return text

# Chapter colour roles (light background).
W_C = PRIMARY  # weight / gravity = strawberry red
N_C = SECONDARY  # normal force / contact push = teal
T_C = PURPLE  # tension
APP_C = ACCENT  # applied force, components, highlights = amber
PS_C = ManimColor("#C2477F")  # pseudo force = pink
HL = ManimColor("#D19A00")
WARN = PRIMARY
WOOD = ManimColor("#F3D9C9")
STEEL = ManimColor("#EADFD8")


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
                 max_tip_length_to_length_ratio=0.22, max_stroke_width_to_length_ratio=12)


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


def pulley(c, r=0.4):
    return VGroup(Circle(radius=r, color=INK, stroke_width=3).set_fill(STEEL, 1).move_to(c),
                  Dot(c, radius=0.05, color=INK))


def ceiling(x0, x1, y):
    bar = Line(P(x0, y), P(x1, y), color=INK, stroke_width=4)
    hatch = VGroup(*[Line(P(x, y), P(x + 0.18, y + 0.18), color=MUTED, stroke_width=2)
                     for x in np.arange(x0, x1, 0.3)])
    return VGroup(bar, hatch)


def flab(s, at, direction, color, size=32, buff=0.1):
    return M(s, size, color=color).next_to(at, direction, buff=buff)


class MfeCh3Video(NarratedScene):
    def voiceover(self, text):
        return super().voiceover(say_fix(text))

    def construct(self):
        self.title_card(
            "Motion, Forces and Energy",
            "Chapter 3 · Newton's Laws of Motion",
            "Chapter three. Newton's laws of motion.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7, self.s8):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ scene 1: first law
    def s1(self):
        hd = header("3.1 · Force, inertia and the first law")
        table = Line(P(-6.5, -1.0), P(6.5, -1.0), color=INK, stroke_width=4)
        book = block(1.2, 0.45, fill=ManimColor("#B9D7DC")).move_to(P(-5.2, -0.77))
        ari = T("Aristotle: motion needs a cause", 30, color=MUTED).move_to(P(0, 1.6))
        with self.voiceover("Push a book across a table and let go. It slides, and stops. For two thousand years "
                            "that looked like the law of motion: Aristotle taught that a moving thing stops unless "
                            "something keeps pushing it.") as vo:
            self.play(FadeIn(hd), Create(table), FadeIn(book), run_time=0.8)
            self.play(book.animate.shift(4.2 * RIGHT), run_time=2.4, rate_func=rate_functions.ease_out_cubic)
            self.wait(vo.duration * 0.15)
            self.play(FadeIn(ari, shift=0.2 * UP), run_time=0.8)

        # Galileo's double ramp
        A = P(-6.0, 1.6)
        B = P(-3.0, -1.6)
        h_line = DashedLine(P(-6.6, 1.6), P(6.6, 1.6), color=GRID, stroke_width=3)
        left = Line(A, B, color=INK, stroke_width=4)
        r1 = Line(B, P(0.0, 1.6), color=INK, stroke_width=4)
        r2 = Line(B, P(3.4, 1.6), color=INK, stroke_width=4)
        r3 = Line(B, P(6.8, -1.6), color=INK, stroke_width=4)
        ball = Dot(A + 0.2 * UP, radius=0.2, color=PRIMARY)

        def roll(ramp_end, t=2.6, off=False):
            down = Line(A + 0.2 * UP, B + 0.2 * UP)
            up = Line(B + 0.2 * UP, ramp_end + 0.2 * UP)
            return Succession(MoveAlongPath(ball, down, rate_func=rate_functions.ease_in_quad, run_time=t * 0.45),
                              MoveAlongPath(ball, up, rate_func=rate_functions.ease_out_quad if not off else linear,
                                            run_time=t * 0.55))

        same = T("same height", 22, color=MUTED).next_to(h_line, UP, buff=0.08).set_x(4.8)
        gal = T("Galileo: on a flat track it never stops", 28, color=PRIMARY).move_to(P(1.6, -2.6))
        fric = T("the book stops because friction acts all the time", 26, color=MUTED).move_to(P(0, -3.3))
        with self.voiceover("Galileo rolled a ball down one ramp and up another. It climbs almost to the height it "
                            "started from. Make the second ramp shallower, and it travels further to get there. Make "
                            "it flat, and it never stops. The book stops because a force, friction, acts on it the "
                            "whole time.") as vo:
            self.play(FadeOut(table), FadeOut(book), FadeOut(ari), run_time=0.4)
            self.play(Create(left), Create(r1), Create(h_line), FadeIn(ball), FadeIn(same), run_time=0.9)
            self.play(roll(P(0.0, 1.6)), run_time=2.4)
            self.play(ball.animate.move_to(A + 0.2 * UP), Transform(r1, r2), run_time=0.6)
            self.play(roll(P(3.4, 1.6)), run_time=2.6)
            self.play(ball.animate.move_to(A + 0.2 * UP), Transform(r1, r3), run_time=0.6)
            self.play(roll(P(6.8, -1.6), off=True), run_time=2.6)
            self.play(FadeIn(gal), run_time=0.6)
            self.play(FadeIn(fric), run_time=0.6)

        law = M(r"\sum\vec F = \vec 0 \iff \vec v = \text{constant}", 56, color=PRIMARY).move_to(P(0, 1.9))
        lbox = SurroundingRectangle(law, buff=0.25, corner_radius=0.15, color=PRIMARY, stroke_width=3)
        sub = T("rest is just the special case v = 0", 26, color=MUTED).next_to(lbox, DOWN, buff=0.25)
        myth = T("\u201ca moving body needs a force to keep it moving\u201d", 30).move_to(P(0, -0.6))
        mx = strike(myth)
        fix = T("force changes motion; it does not maintain it", 28, color=GREEN).move_to(P(0, -1.5))
        with self.voiceover("That is the first law. With zero net force, velocity stays constant, and rest is just "
                            "the special case. A force is needed to change motion, not to keep it going.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(Write(law), Create(lbox), run_time=1.4)
            self.play(FadeIn(sub), run_time=0.5)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(myth), run_time=0.6)
            self.play(Create(mx), FadeIn(fix), run_time=0.8)

        # raindrop at terminal velocity + inertial frames
        dc = P(-3.6, -0.75)
        drop = VGroup(Circle(radius=0.32, color=SECONDARY, stroke_width=3).set_fill(ManimColor("#BFE0E6"), 1),
                      Triangle(color=SECONDARY, stroke_width=3).set_fill(ManimColor("#BFE0E6"), 1)
                      .scale(0.26).move_to(0.36 * UP)).move_to(dc)
        mg = vec(dc + 0.35 * DOWN, dc + 1.9 * DOWN, W_C)
        D = vec(dc + 0.6 * UP, dc + 2.15 * UP, N_C)
        mgl = flab("mg", mg.get_end(), RIGHT, W_C)
        Dl = flab(r"D", D.get_end(), RIGHT, N_C)
        vl = M(r"v = 8\ \text{m/s (steady)}", 30, color=MUTED).next_to(drop, LEFT, buff=0.4)
        e1 = M(r"D - mg = 0", 44).move_to(P(2.6, 0.9))
        e2 = M(r"D = mg = 3\times10^{-4}\ \text{N}", 44, color=GREEN).next_to(e1, DOWN, buff=0.35)
        e3 = T("the speed never enters", 26, color=MUTED).next_to(e2, DOWN, buff=0.3)
        inert = T("inertial frame: one where the first law holds (the ground, not a braking bus)", 24,
                  color=PRIMARY)
        fit(inert, 12.6).move_to(P(0, -3.4))
        with self.voiceover("So a raindrop falling at a steady eight metres per second feels zero net force: air "
                            "drag exactly balances its weight, and the speed never enters. A frame where the first "
                            "law holds is an inertial frame. The ground is one. A braking bus is not.") as vo:
            self.play(FadeOut(myth), FadeOut(mx), FadeOut(fix), FadeOut(sub), law.animate.scale(0.7), lbox.animate.scale(0.7),
                      run_time=0.6)
            self.play(VGroup(law, lbox).animate.move_to(P(0, 2.7)), FadeIn(drop), FadeIn(vl), run_time=0.7)
            self.play(GrowArrow(mg), FadeIn(mgl), GrowArrow(D), FadeIn(Dl), run_time=0.9)
            self.play(Write(e1), run_time=0.8)
            self.play(Write(e2), run_time=1.0)
            self.play(FadeIn(e3), run_time=0.5)
            self.wait(vo.duration * 0.15)
            self.play(FadeIn(inert), run_time=0.7)

    # ------------------------------------------------------------ scene 2: second law and impulse
    def s2(self):
        hd = header("3.2 · Second law, momentum and impulse")
        l1 = M(r"\sum\vec F = \frac{d\vec p}{dt}, \qquad \vec p = m\vec v", 54).move_to(P(0, 1.8))
        l2 = M(r"\text{constant } m:\quad \sum\vec F = m\vec a", 50, color=PRIMARY).move_to(P(0, 0.4))
        l3 = M(r"\sum F_x = ma_x, \qquad \sum F_y = ma_y", 44).move_to(P(0, -1.0))
        l3n = T("a vector equation: one equation per axis", 26, color=MUTED).next_to(l3, DOWN, buff=0.3)
        with self.voiceover("The second law says the net force is the rate of change of momentum, m v. For a "
                            "body of constant mass, that is m a. It is a vector equation, so it gives one equation "
                            "per axis.") as vo:
            self.play(FadeIn(hd), Write(l1), run_time=1.4)
            self.wait(vo.duration * 0.2)
            self.play(Write(l2), run_time=1.2)
            self.wait(vo.duration * 0.1)
            self.play(Write(l3), FadeIn(l3n), run_time=1.2)

        ax = Axes(x_range=[0, 0.42, 0.1], y_range=[0, 450, 100], x_length=6.4, y_length=4.2,
                  axis_config={"color": INK, "stroke_width": 2, "include_ticks": True},
                  tips=False).move_to(P(-3.0, -0.6))
        xl = M("t\\ (\\text{s})", 28, color=MUTED).next_to(ax.x_axis.get_end(), DOWN, buff=0.15)
        yl = M("F\\ (\\text{N})", 28, color=MUTED).next_to(ax.y_axis.get_end(), LEFT, buff=0.15)
        ticks = VGroup(*[M(f"{v:g}", 22, color=MUTED).next_to(ax.c2p(v, 0), DOWN, buff=0.12) for v in (0.1, 0.2)],
                       *[M(f"{v}", 22, color=MUTED).next_to(ax.c2p(0, v), LEFT, buff=0.12) for v in (200, 400)])
        pulse = Polygon(ax.c2p(0, 0), ax.c2p(0.1, 400), ax.c2p(0.2, 0), color=PRIMARY, stroke_width=4)
        pulse.set_fill(PRIMARY, 0.3)
        J = M(r"J = \int F\,dt = \text{area}", 44).move_to(P(3.6, 2.4))
        J2 = M(r"= \tfrac12(0.2)(400) = 40\ \text{N s}", 44).next_to(J, DOWN, buff=0.3)
        J3 = M(r"J = \Delta p", 52, color=GREEN).next_to(J2, DOWN, buff=0.4)
        with self.voiceover("Multiply by d t and add up over the push. The impulse, the area under the force against "
                            "time graph, equals the change in momentum. A pulse that peaks at four hundred newtons "
                            "and lasts point two seconds has an area of forty newton seconds.") as vo:
            self.play(*[FadeOut(m) for m in (l1, l2, l3, l3n)], run_time=0.5)
            self.play(Create(ax), FadeIn(xl), FadeIn(yl), FadeIn(ticks), run_time=1.0)
            self.play(Create(pulse), run_time=1.0)
            self.play(pulse.animate.set_fill(PRIMARY, 0.45), Write(J), run_time=1.2)
            self.wait(vo.duration * 0.15)
            self.play(Write(J3), run_time=0.8)
            self.wait(vo.duration * 0.1)
            self.play(Write(J2), run_time=1.2)

        soft = Polygon(ax.c2p(0, 0), ax.c2p(0.2, 200), ax.c2p(0.4, 0), color=N_C, stroke_width=4).set_fill(N_C, 0.35)
        sl = T("hands drawn back", 24, color=N_C).move_to(ax.c2p(0.31, 250))
        hl = T("stiff hands", 24, color=PRIMARY).move_to(ax.c2p(0.16, 420))
        same = T("same area, longer and lower", 30, color=GREEN, weight="BOLD").move_to(P(3.6, -1.6))
        favg = M(r"F_{\text{avg}} = \frac{\Delta p}{\Delta t}", 48).move_to(P(3.6, -2.8))
        with self.voiceover("That is why a cricketer draws the hands back when catching. Stopping the ball needs a "
                            "fixed impulse. Stretch the stopping time, and the average force falls. Same area, longer "
                            "and lower. Airbags and crumple zones use the same trade.") as vo:
            self.play(FadeIn(hl), run_time=0.5)
            self.play(Create(soft), FadeIn(sl), run_time=1.4)
            self.wait(vo.duration * 0.15)
            self.play(FadeIn(same), run_time=0.6)
            self.play(Write(favg), run_time=1.0)

        wall = VGroup(Rectangle(width=0.4, height=3.4, color=INK, stroke_width=3).set_fill(STEEL, 1))
        wall.move_to(P(-1.2, 0.2))
        ball_in = Dot(P(-4.6, 1.0), radius=0.22, color=APP_C)
        vin = vec(P(-4.3, 1.0), P(-1.6, 1.0), INK)
        vinl = M(r"20\ \text{m/s}", 30).next_to(vin, UP, buff=0.12)
        vout = vec(P(-1.6, -0.6), P(-3.6, -0.6), N_C)
        voutl = M(r"15\ \text{m/s}", 30, color=N_C).next_to(vout, DOWN, buff=0.12)
        plus = M(r"+\ \leftarrow", 30, color=MUTED).move_to(P(-5.6, -1.6))
        w1 = M(r"\Delta p = 0.15\,\big(15 - (-20)\big) = 5.25\ \text{N s}", 40).move_to(P(3.3, 1.2))
        w2 = M(r"F_{\text{avg}} = \frac{5.25}{0.01} = 525\ \text{N}", 42).next_to(w1, DOWN, buff=0.4)
        w3 = T("reversing direction adds the speeds", 26, color=PRIMARY).next_to(w2, DOWN, buff=0.4)
        VGroup(w1, w2, w3).shift(0.1 * RIGHT)
        fit(VGroup(w1, w2, w3), 6.4)
        with self.voiceover("Watch the signs. A point one five kilogram ball hits a wall at twenty metres per second "
                            "and rebounds at fifteen. The change in momentum is point one five times thirty five: "
                            "five point two five newton seconds. Over point zero one seconds, that is five hundred "
                            "and twenty five newtons. Reversing direction adds the speeds.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(FadeIn(wall), FadeIn(ball_in), run_time=0.5)
            self.play(ball_in.animate.move_to(P(-1.65, 1.0)), GrowArrow(vin), FadeIn(vinl), run_time=1.0)
            self.play(ball_in.animate.move_to(P(-3.9, -0.6)), GrowArrow(vout), FadeIn(voutl), FadeIn(plus),
                      run_time=1.0)
            self.wait(vo.duration * 0.1)
            self.play(Write(w1), run_time=1.6)
            self.wait(vo.duration * 0.1)
            self.play(Write(w2), run_time=1.3)
            self.play(FadeIn(w3), run_time=0.6)

    # ------------------------------------------------------------ scene 3: third law and FBDs
    def s3(self):
        hd = header("3.3 · Third law and free-body diagrams")
        a = block(1.5, 1.2, label="A", size=40).move_to(P(-1.2, 0.4))
        b = block(1.5, 1.2, fill=ManimColor("#DCEBEE"), label="B", size=40).next_to(a, RIGHT, buff=0)
        fab = vec(b.get_left() + 0.2 * UP, b.get_left() + 0.2 * UP + 1.6 * RIGHT, APP_C)
        fba = vec(a.get_right() + 0.2 * DOWN, a.get_right() + 0.2 * DOWN + 1.6 * LEFT, PS_C)
        fabl = M(r"\vec F_{\text{on }B}", 32, color=APP_C).next_to(b, UP, buff=0.2)
        fbal = M(r"\vec F_{\text{on }A}", 32, color=PS_C).next_to(a, UP, buff=0.2)
        law = M(r"\vec F_{AB} = -\vec F_{BA}", 52).move_to(P(0, 2.5))
        note = T("equal, opposite, on different bodies: they never cancel", 28, color=PRIMARY).move_to(P(0, -1.6))
        with self.voiceover("Forces come in pairs. If A pushes B, then B pushes A just as hard, the opposite way. "
                            "But the two forces act on different bodies, so they never appear in the same diagram, "
                            "and they never cancel.") as vo:
            self.play(FadeIn(hd), FadeIn(a), FadeIn(b), run_time=0.7)
            self.play(GrowArrow(fab), FadeIn(fabl), run_time=0.8)
            self.play(GrowArrow(fba), FadeIn(fbal), run_time=0.8)
            self.play(Write(law), run_time=1.0)
            self.wait(vo.duration * 0.15)
            self.play(FadeIn(note), run_time=0.7)

        # book on a table: weight and normal are not a pair
        tbl = VGroup(Rectangle(width=4.0, height=0.25, color=INK, stroke_width=3).set_fill(STEEL, 1).move_to(P(-3.4, -0.6)),
                     Line(P(-5.0, -0.73), P(-5.0, -2.4), color=INK, stroke_width=4),
                     Line(P(-1.8, -0.73), P(-1.8, -2.4), color=INK, stroke_width=4))
        bk = block(1.3, 0.5, fill=ManimColor("#B9D7DC")).move_to(P(-3.4, -0.22))
        bc = bk.get_center()
        N = vec(bc, bc + 1.8 * UP, N_C)
        W = vec(bc, bc + 1.8 * DOWN, W_C)
        Nl = flab("N", N.get_end(), RIGHT, N_C)
        Wl = flab("mg", W.get_end(), LEFT, W_C)
        earth = Arc(radius=6.0, start_angle=70 * DEGREES, angle=40 * DEGREES, arc_center=P(-3.4, -9.3),
                    color=GREEN, stroke_width=6)
        el = T("Earth", 22, color=GREEN).move_to(P(-0.9, -3.4))
        pairs = VGroup(
            M(r"mg\ (\text{Earth on book}) \ \leftrightarrow\ \text{book on Earth}", 34, color=W_C),
            M(r"N\ (\text{table on book}) \ \leftrightarrow\ \text{book on table}", 34, color=N_C),
        ).arrange(DOWN, buff=0.35, aligned_edge=LEFT).move_to(P(3.2, 1.3))
        fit(pairs, 6.4)
        np_ = T("N and mg act on the same body: not a pair", 26, color=WARN).move_to(P(3.2, -0.2))
        why = M(r"N = mg \text{ here from the second law } (a = 0)", 34, color=MUTED).move_to(P(3.2, -1.1))
        fit(why, 6.4)
        with self.voiceover("A book on a table feels its weight and the normal force. They are equal and opposite, "
                            "but they are not a pair. The weight's partner pulls on the Earth. The normal force's "
                            "partner pushes on the table. N equals m g here because of the second law, not the "
                            "third.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(FadeIn(tbl), FadeIn(bk), Create(earth), FadeIn(el), run_time=0.8)
            self.play(GrowArrow(N), FadeIn(Nl), GrowArrow(W), FadeIn(Wl), run_time=0.9)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(np_), run_time=0.6)
            self.play(FadeIn(pairs[0]), run_time=0.7)
            self.play(FadeIn(pairs[1]), run_time=0.7)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(why), run_time=0.6)

        steps = VGroup(*[T(s, 24) for s in ("1. isolate one body", "2. draw every force on it",
                                             "3. choose axes", "4. \u03a3F = ma along each axis",
                                             "5. add the constraints")])
        steps.arrange(DOWN, buff=0.22, aligned_edge=LEFT).move_to(P(-4.4, 1.2))
        ang = 30 * DEGREES
        A0 = P(0.0, -3.0)
        L = 6.4
        A1 = A0 + L * RIGHT
        A2 = A1 + L * np.tan(ang) * UP
        wedge = Polygon(A0, A1, A2, color=INK, stroke_width=3).set_fill(STEEL, 1)
        u = U(30)
        n = U(120)
        bcen = A0 + 3.6 * u + 0.45 * n
        blk = Square(side_length=0.9, color=INK, stroke_width=3).set_fill(WOOD, 1).rotate(ang).move_to(bcen)
        mgv = vec(bcen, bcen + 2.0 * DOWN, W_C)
        Nv = vec(bcen, bcen + 1.73 * n, N_C)
        comp1 = DashedLine(bcen, bcen - 1.0 * u, color=APP_C, stroke_width=4)
        comp2 = DashedLine(bcen, bcen - 1.73 * n, color=APP_C, stroke_width=4)
        mgl = flab("mg", mgv.get_end(), DOWN, W_C)
        Nl2 = flab("N", Nv.get_end(), UP, N_C)
        c1l = M(r"mg\sin\theta", 28, color=APP_C).next_to(bcen - 1.0 * u, UL, buff=0.05)
        res = VGroup(M(r"N = mg\cos\theta", 42, color=N_C), M(r"a = g\sin\theta", 42, color=GREEN))
        res.arrange(DOWN, buff=0.3, aligned_edge=LEFT).move_to(P(-4.4, -2.0))
        smooth = T("smooth incline", 22, color=MUTED).next_to(wedge, DOWN, buff=0.1).set_x(5.0)
        with self.voiceover("So draw a free-body diagram. Isolate one body, draw every force on it, choose axes, and "
                            "write sum of F equals m a along each. On a smooth incline the normal force is m g cos "
                            "theta, not m g, and the block slides down at g sin theta, whatever its mass.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(LaggedStart(*[FadeIn(s, shift=0.1 * RIGHT) for s in steps], lag_ratio=0.4), run_time=2.6)
            self.play(FadeIn(wedge), FadeIn(blk), FadeIn(smooth), run_time=0.7)
            self.play(GrowArrow(mgv), FadeIn(mgl), GrowArrow(Nv), FadeIn(Nl2), run_time=0.9)
            self.play(Create(comp1), Create(comp2), FadeIn(c1l), run_time=0.8)
            self.wait(vo.duration * 0.05)
            self.play(Write(res[0]), run_time=0.8)
            self.play(Write(res[1]), run_time=0.8)

        floor = Line(P(-6.0, -1.0), P(1.0, -1.0), color=INK, stroke_width=4)
        b1 = block(1.3, 1.1, label=r"2\,\text{kg}", size=30).move_to(P(-3.0, -0.45))
        b2 = block(1.6, 1.4, fill=ManimColor("#DCEBEE"), label=r"3\,\text{kg}", size=30)
        b2.next_to(b1, RIGHT, buff=0).align_to(b1, DOWN)
        F = vec(b1.get_left() + 1.8 * LEFT, b1.get_left(), APP_C)
        Fl = flab(r"F = 20\ \text{N}", F, UP, APP_C, size=30)
        brace = Brace(VGroup(b1, b2), DOWN, color=MUTED)
        sysl = M(r"a = \frac{20}{5} = 4\ \text{m/s}^2", 40).move_to(P(3.8, 1.2))
        cl = M(r"C = 3 \times 4 = 12\ \text{N}", 44, color=GREEN).move_to(P(3.8, -0.2))
        cn = T("contact force accelerates the block ahead", 24, color=MUTED).next_to(cl, DOWN, buff=0.3)
        Cv = vec(P(b2.get_left()[0], b2.get_top()[1] + 0.3), P(b2.get_left()[0] + 1.1, b2.get_top()[1] + 0.3), N_C)
        Cvl = flab("C", Cv.get_end(), RIGHT, N_C, size=30)
        with self.voiceover("Two blocks, two and three kilograms, are pushed by twenty newtons. Treat them as one "
                            "system, and the acceleration is four. The contact force only has to accelerate the "
                            "block ahead: three times four, twelve newtons.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(Create(floor), FadeIn(b1), FadeIn(b2), GrowArrow(F), FadeIn(Fl), run_time=1.0)
            self.play(GrowFromCenter(brace), Write(sysl), run_time=1.2)
            self.wait(vo.duration * 0.15)
            self.play(b1.animate.set_opacity(0.25), GrowArrow(Cv), FadeIn(Cvl), run_time=0.8)
            self.play(Write(cl), FadeIn(cn), run_time=1.0)

    # ------------------------------------------------------------ scene 4: equilibrium
    def s4(self):
        hd = header("3.4 · Equilibrium of concurrent forces")
        O = P(-4.2, 0.2)
        f1 = np.array([2.4, 0.4, 0])
        f2 = np.array([-0.8, 2.0, 0])
        f3 = -(f1 + f2)
        a1 = vec(O, O + f1, PRIMARY)
        a2 = vec(O, O + f2, N_C)
        a3 = vec(O, O + f3, T_C)
        S = P(1.2, -1.6)
        t1 = vec(S, S + f1, PRIMARY)
        t2 = vec(S + f1, S + f1 + f2, N_C)
        t3 = vec(S + f1 + f2, S, T_C)
        lab = VGroup(flab(r"\vec F_1", O + f1, RIGHT, PRIMARY), flab(r"\vec F_2", O + f2, UP, N_C),
                     flab(r"\vec F_3", O + f3, DOWN, T_C))
        eq = M(r"\sum\vec F = \vec 0", 50).move_to(P(3.6, 2.4))
        closed = T("tip to tail: a closed triangle", 26, color=GREEN).move_to(P(3.0, -2.8))
        with self.voiceover("When forces meet at a point that does not move, their vector sum is zero. Drawn tip to "
                            "tail, they close up into a polygon. For three forces, a triangle.") as vo:
            self.play(FadeIn(hd), GrowArrow(a1), GrowArrow(a2), GrowArrow(a3), FadeIn(lab), Write(eq), run_time=1.4)
            self.wait(vo.duration * 0.15)
            self.play(TransformFromCopy(a1, t1), run_time=0.8)
            self.play(TransformFromCopy(a2, t2), run_time=0.8)
            self.play(TransformFromCopy(a3, t3), run_time=0.8)
            self.play(FadeIn(closed), run_time=0.6)

        ceil = ceiling(-6.0, -0.6, 2.6)
        K = P(-2.4, 0.9)
        # string at 30 deg to the ceiling on the left, 60 deg on the right
        pA = K + (1.7 / np.sin(30 * DEGREES)) * U(150)
        pB = K + (1.7 / np.sin(60 * DEGREES)) * U(60)
        s1 = Line(K, pA, color=INK, stroke_width=3)
        s2 = Line(K, pB, color=INK, stroke_width=3)
        lamp = VGroup(Line(K, K + 0.8 * DOWN, color=INK, stroke_width=3),
                      Polygon(K + P(-0.5, -1.4), K + P(0.5, -1.4), K + P(0.2, -0.8), K + P(-0.2, -0.8),
                              color=INK, stroke_width=3).set_fill(ACCENT, 1))
        T1 = vec(K, K + 0.87 * U(150), T_C)
        T2 = vec(K, K + 1.5 * U(60), T_C)
        Wt = vec(K + 1.45 * DOWN, K + 3.18 * DOWN, W_C)
        T1l = flab(r"T_1", K + 0.87 * U(150), DOWN, T_C, buff=0.15)
        T2l = flab(r"T_2", K + 1.5 * U(60), RIGHT, T_C, buff=0.15)
        Wl = flab(r"100\ \text{N}", Wt.get_end(), RIGHT, W_C, size=28)
        a30 = M(r"30^\circ", 26).move_to(pA + P(0.75, -0.22))
        a60 = M(r"60^\circ", 26).move_to(pB + P(-0.55, -0.3))
        e1 = M(r"T_1\cos30^\circ = T_2\cos60^\circ", 40).move_to(P(3.2, 1.6))
        e2 = M(r"T_1\sin30^\circ + T_2\sin60^\circ = 100", 40).next_to(e1, DOWN, buff=0.35)
        e3 = M(r"T_1 = 50\ \text{N}, \quad T_2 = 50\sqrt3 \approx 86.6\ \text{N}", 42, color=GREEN).next_to(e2, DOWN,
                                                                                                         buff=0.45)
        e4 = T("the steeper string carries more", 26, color=PRIMARY).next_to(e3, DOWN, buff=0.35)
        with self.voiceover("A ten kilogram lamp hangs from two strings, at thirty and sixty degrees to the ceiling. "
                            "Balance the knot horizontally and vertically. The thirty degree string carries fifty "
                            "newtons. The sixty degree string carries fifty root three. The steeper string carries "
                            "more.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(FadeIn(ceil), Create(s1), Create(s2), FadeIn(lamp), FadeIn(a30), FadeIn(a60), run_time=1.0)
            self.play(GrowArrow(T1), GrowArrow(T2), GrowArrow(Wt), FadeIn(T1l), FadeIn(T2l), FadeIn(Wl), run_time=1.0)
            self.wait(vo.duration * 0.05)
            self.play(Write(e1), run_time=1.1)
            self.play(Write(e2), run_time=1.1)
            self.wait(vo.duration * 0.1)
            self.play(Write(e3), run_time=1.1)
            self.play(FadeIn(e4), run_time=0.6)

        lami = M(r"\frac{F_1}{\sin\alpha} = \frac{F_2}{\sin\beta} = \frac{F_3}{\sin\gamma}", 54, color=PRIMARY)
        lami.move_to(P(0, 1.6))
        lbox = SurroundingRectangle(lami, buff=0.25, corner_radius=0.15, color=PRIMARY, stroke_width=3)
        ln = T("each force over the sine of the angle between the other two", 26, color=MUTED).next_to(lbox, DOWN,
                                                                                                         buff=0.3)
        chk = M(r"\frac{50}{\sin150^\circ} = \frac{50\sqrt3}{\sin120^\circ} = \frac{100}{\sin90^\circ} = 100", 44)
        chk.move_to(P(0, -1.4))
        cm = check().next_to(chk, RIGHT, buff=0.3)
        with self.voiceover("Apply the sine rule to that closed triangle, and you get Lami's theorem: for three forces "
                            "in equilibrium, each force over the sine of the angle between the other two is the same. "
                            "The lamp checks out.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(Write(lami), Create(lbox), run_time=1.6)
            self.play(FadeIn(ln), run_time=0.6)
            self.wait(vo.duration * 0.15)
            self.play(Write(chk), run_time=1.6)
            self.play(FadeIn(cm), run_time=0.4)

    # ------------------------------------------------------------ scene 5: connected bodies
    def s5(self):
        hd = header("3.5 · Connected bodies and pulleys")
        pc = P(-3.6, 2.2)
        r = 0.7
        ceil = ceiling(-4.6, -2.6, 3.0)
        rod = Line(P(-3.6, 3.0), pc, color=INK, stroke_width=3)
        pul = pulley(pc, r)
        d = ValueTracker(0.0)
        y1, y2 = -0.6, -0.6

        def b1():
            return block(0.9, 0.9, label=r"3\,\text{kg}", size=24).move_to(P(-4.3, y1 + d.get_value()))

        def b2():
            return block(1.1, 1.1, fill=ManimColor("#DCEBEE"), label=r"5\,\text{kg}", size=26).move_to(
                P(-2.9, y2 - d.get_value()))

        B1 = always_redraw(b1)
        B2 = always_redraw(b2)
        st1 = always_redraw(lambda: Line(P(-4.3, pc[1]), P(-4.3, y1 + d.get_value() + 0.45), color=INK, stroke_width=3))
        st2 = always_redraw(lambda: Line(P(-2.9, pc[1]), P(-2.9, y2 - d.get_value() + 0.55), color=INK, stroke_width=3))
        kg = VGroup()
        T1 = vec(P(-4.95, -0.15), P(-4.95, 0.95), T_C, sw=5)
        T2 = vec(P(-2.15, -0.05), P(-2.15, 1.05), T_C, sw=5)
        W1 = vec(P(-4.3, -1.05), P(-4.3, -2.2), W_C, sw=5)
        W2 = vec(P(-2.9, -1.15), P(-2.9, -2.6), W_C, sw=5)
        fl = VGroup(flab("T", T1.get_end(), LEFT, T_C, 28), flab("T", T2.get_end(), RIGHT, T_C, 28),
                    flab(r"30\,\text{N}", W1.get_end(), DOWN, W_C, 26), flab(r"50\,\text{N}", W2.get_end(), DOWN, W_C, 26))
        e1 = M(r"T - m_1 g = m_1 a", 42).move_to(P(2.6, 2.2))
        e2 = M(r"m_2 g - T = m_2 a", 42).next_to(e1, DOWN, buff=0.3)
        same = T("same string: same T, same size of a", 26, color=MUTED).next_to(e2, DOWN, buff=0.35)
        with self.voiceover("Hang three and five kilograms over a pulley. An ideal string has the same tension all "
                            "along it, and the blocks share one size of acceleration, one up and one down. Write "
                            "each block's equation along its own direction of motion.") as vo:
            self.add(st1, st2, B1, B2)
            self.play(FadeIn(hd), FadeIn(ceil), Create(rod), FadeIn(pul), FadeIn(st1), FadeIn(st2), FadeIn(B1),
                      FadeIn(B2), FadeIn(kg), run_time=1.0)
            self.play(GrowArrow(T1), GrowArrow(T2), GrowArrow(W1), GrowArrow(W2), FadeIn(fl), run_time=1.0)
            self.wait(vo.duration * 0.15)
            self.play(FadeIn(same), run_time=0.6)
            self.play(Write(e1), run_time=1.0)
            self.play(Write(e2), run_time=1.0)

        a = M(r"a = \frac{(m_2 - m_1)g}{m_1 + m_2} = \frac{2 \times 10}{8} = 2.5\ \text{m/s}^2", 40, color=GREEN)
        fit(a, 7.4).move_to(P(2.6, -0.6))
        t = M(r"T = 3(10 + 2.5) = 37.5\ \text{N}", 42).next_to(a, DOWN, buff=0.4)
        bt = T("between 30 N and 50 N: not the hanging weight", 24, color=PRIMARY).next_to(t, DOWN, buff=0.3)
        with self.voiceover("Add them, and T cancels. The acceleration is two times ten, over eight: two point five "
                            "metres per second squared. The tension is thirty seven point five newtons, between the "
                            "two weights. It is not the hanging weight.") as vo:
            self.play(FadeOut(same), FadeOut(T1), FadeOut(T2), FadeOut(W1), FadeOut(W2), FadeOut(fl), run_time=0.4)
            self.play(Write(a), d.animate.set_value(1.0), run_time=2.2, rate_func=rate_functions.ease_in_quad)
            self.wait(vo.duration * 0.1)
            self.play(Write(t), run_time=1.2)
            self.play(FadeIn(bt), run_time=0.6)
        for m in (B1, B2, st1, st2):
            m.clear_updaters()

        floor = Line(P(-6.6, -0.5), P(6.6, -0.5), color=INK, stroke_width=4)
        bA = block(0.9, 0.8, label=r"1", size=30).move_to(P(-4.6, -0.1))
        bB = block(1.1, 0.95, label=r"2", size=30).move_to(P(-2.2, -0.025))
        bC = block(1.3, 1.1, label=r"3", size=30).move_to(P(0.4, 0.05))
        sAB = Line(bA.get_right(), bB.get_left(), color=T_C, stroke_width=4)
        sBC = Line(bB.get_right(), bC.get_left(), color=T_C, stroke_width=4)
        Fp = vec(bC.get_right(), bC.get_right() + 1.8 * RIGHT, APP_C)
        Fpl = flab(r"30\ \text{N}", Fp, UP, APP_C, 30)
        sys = M(r"a = \frac{30}{1 + 2 + 3} = 5\ \text{m/s}^2", 42).move_to(P(0, 2.2))
        tab = M(r"T_{AB} = 1 \times 5 = 5\ \text{N}", 38, color=T_C).move_to(P(-3.4, -1.8))
        tbc = M(r"T_{BC} = (1 + 2) \times 5 = 15\ \text{N}", 38, color=T_C).move_to(P(2.0, -1.8))
        nt = T("system for a, then isolate the blocks behind each string", 24, color=MUTED).move_to(P(0, -3.0))
        with self.voiceover("Or treat connected blocks as one system: driving force over total mass. Three blocks "
                            "pulled by thirty newtons across a smooth floor accelerate at five. Each string's tension "
                            "is just what the blocks behind it need: five newtons, then fifteen.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(Create(floor), FadeIn(bA), FadeIn(bB), FadeIn(bC), Create(sAB), Create(sBC), GrowArrow(Fp),
                      FadeIn(Fpl), run_time=1.0)
            self.play(Write(sys), run_time=1.2)
            self.wait(vo.duration * 0.15)
            self.play(Indicate(bA, color=APP_C), Write(tab), run_time=1.1)
            self.play(Indicate(VGroup(bA, bB), color=APP_C), Write(tbc), run_time=1.1)
            self.play(FadeIn(nt), run_time=0.6)

    # ------------------------------------------------------------ scene 6: constraints
    def s6(self):
        hd = header("3.6 · Constraint relations")
        yc = 2.6
        ceil = ceiling(-6.4, -2.2, yc)
        anchor_x = -5.6
        fp_c = P(-4.0, 1.9)
        rf = 0.4
        rp = 0.4
        s = ValueTracker(0.0)  # pulley rise; A falls 2s

        def pcen():
            return P(-4.8, -0.2 + s.get_value())

        def ay():
            return -0.6 - 2 * s.get_value()

        fixed = pulley(fp_c, rf)
        hang = Line(P(-4.0, yc), fp_c, color=INK, stroke_width=3)
        strand1 = always_redraw(lambda: Line(P(anchor_x + 0.4, yc), pcen() + rp * LEFT, color=INK, stroke_width=3))
        strand2 = always_redraw(lambda: Line(pcen() + rp * RIGHT, fp_c + rf * LEFT, color=INK, stroke_width=3))
        strand3 = always_redraw(lambda: Line(fp_c + rf * RIGHT, P(-3.6, ay() + 0.4), color=INK, stroke_width=3))
        mov = always_redraw(lambda: pulley(pcen(), rp))
        hookB = always_redraw(lambda: Line(pcen(), pcen() + 0.9 * DOWN, color=INK, stroke_width=3))
        Bk = always_redraw(lambda: block(1.0, 0.8, fill=ManimColor("#DCEBEE"), label="B", size=30)
                           .move_to(pcen() + 1.3 * DOWN))
        Ak = always_redraw(lambda: block(0.8, 0.8, label="A", size=30).move_to(P(-3.6, ay())))
        Pl = always_redraw(lambda: M("P", 28, color=MUTED).move_to(pcen() + 0.7 * UP))
        e1 = M(r"2y_P + y_A = \text{const}", 46).move_to(P(2.8, 2.0))
        e2 = M(r"\Rightarrow\ a_A = -2\,a_P", 50, color=PRIMARY).next_to(e1, DOWN, buff=0.4)
        n1 = T("A moves twice as fast as the pulley, the other way", 24, color=MUTED).next_to(e2, DOWN, buff=0.35)
        fit(n1, 7.4)
        with self.voiceover("If a pulley can move, the accelerations are no longer equal. Write the string's length "
                            "in terms of positions, and differentiate twice. Two strands hold the movable pulley, so "
                            "two y P plus y A is constant: A moves twice as fast as the pulley, the other way.") as vo:
            self.add(strand1, strand2, strand3, mov, hookB, Bk, Ak, Pl)
            self.play(FadeIn(hd), FadeIn(ceil), Create(hang), FadeIn(fixed), FadeIn(strand1), FadeIn(strand2),
                      FadeIn(strand3), FadeIn(mov), FadeIn(hookB), FadeIn(Bk), FadeIn(Ak), FadeIn(Pl), run_time=1.0)
            self.wait(vo.duration * 0.2)
            self.play(Write(e1), run_time=1.2)
            self.play(s.animate.set_value(0.6), run_time=1.6)
            self.play(Write(e2), run_time=1.0)
            self.play(s.animate.set_value(0.0), FadeIn(n1), run_time=1.4)

        TT = VGroup(vec(pcen() + (rp + 0.25) * LEFT + 0.3 * DOWN, pcen() + (rp + 0.25) * LEFT + 1.1 * UP, T_C, sw=5),
                    vec(pcen() + (rp + 0.25) * RIGHT + 0.3 * DOWN, pcen() + (rp + 0.25) * RIGHT + 1.1 * UP, T_C, sw=5))
        TTl = VGroup(M("T", 30, color=T_C).next_to(TT[0].get_end(), LEFT, buff=0.1),
                     M("T", 30, color=T_C).next_to(TT[1].get_end(), RIGHT, buff=0.1),
                     M(r"2T \text{ on } P", 32, color=T_C).move_to(P(-6.0, -2.6)))
        TA = vec(P(-3.6, ay() + 0.4), P(-3.6, ay() + 1.5), T_C, sw=5).shift(0.6 * RIGHT)
        TAl = M("T", 30, color=T_C).next_to(TA, RIGHT, buff=0.1)
        lab = VGroup(M(r"m_A = 1\ \text{kg}", 34), M(r"m_B = 2\ \text{kg}", 34)).arrange(RIGHT, buff=0.6)
        lab.move_to(P(2.8, -0.6))
        r1 = M(r"T = 10\ \text{N}:\quad 2T = 20\ \text{N} = m_B g", 40, color=GREEN).move_to(P(2.8, -1.6))
        r2 = T("balanced: twice the distance, half the force", 26, color=PRIMARY).move_to(P(2.8, -2.6))
        with self.voiceover("The forces do the opposite. Two strands pull the pulley up with two T. Put one kilogram "
                            "on the free end and two kilograms on the pulley, and nothing moves: the pulley doubles "
                            "the light block's pull. Twice the distance, half the force.") as vo:
            self.play(GrowArrow(TT[0]), GrowArrow(TT[1]), FadeIn(TTl), GrowArrow(TA), FadeIn(TAl), run_time=1.0)
            self.wait(vo.duration * 0.15)
            self.play(FadeIn(lab), run_time=0.6)
            self.play(Write(r1), run_time=1.3)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(r2), run_time=0.6)
        for m in (strand1, strand2, strand3, mov, hookB, Bk, Ak, Pl):
            m.clear_updaters()

    # ------------------------------------------------------------ scene 7: pseudo forces
    def s7(self):
        hd = header("3.7 · Pseudo forces and non-inertial frames")
        lift = Rectangle(width=2.6, height=3.6, color=INK, stroke_width=4).set_fill(ManimColor("#F7EFEA"), 1)
        lift.move_to(P(-4.2, -0.6))
        cable = Line(lift.get_top(), P(-4.2, 3.1), color=INK, stroke_width=3)
        scale_ = Rectangle(width=1.0, height=0.2, color=INK, stroke_width=2).set_fill(STEEL, 1)
        scale_.move_to(lift.get_bottom() + 0.1 * UP)
        person = block(0.6, 1.3, fill=ManimColor("#B9D7DC")).next_to(scale_, UP, buff=0)
        pc = person.get_center()
        Nv = vec(pc + 0.2 * RIGHT, pc + 0.2 * RIGHT + 1.5 * UP, N_C, sw=5)
        Wv = vec(pc + 0.2 * LEFT, pc + 0.2 * LEFT + 1.5 * DOWN, W_C, sw=5)
        Nl = flab("N", Nv.get_end(), RIGHT, N_C, 28)
        Wl = flab("mg", Wv.get_end(), LEFT, W_C, 28)
        aa = vec(lift.get_right() + 0.4 * RIGHT + 0.6 * DOWN, lift.get_right() + 0.4 * RIGHT + 0.8 * UP, APP_C, sw=5)
        aal = flab("a", aa.get_end(), RIGHT, APP_C, 32)
        g1 = T("ground frame", 26, color=MUTED, weight="BOLD").move_to(P(-0.2, 2.4))
        e1 = M(r"N - mg = ma", 42).next_to(g1, DOWN, buff=0.3)
        g2 = T("lift frame", 26, color=PS_C, weight="BOLD").move_to(P(4.0, 2.4))
        e2 = M(r"N - mg - ma = 0", 42).next_to(g2, DOWN, buff=0.3)
        ps = vec(pc + 0.55 * RIGHT + 0.1 * UP, pc + 0.55 * RIGHT + 1.0 * DOWN, PS_C, sw=5)
        psl = M(r"ma", 28, color=PS_C).next_to(ps.get_end(), RIGHT, buff=0.08)
        both = M(r"N = m(g + a)", 54, color=GREEN).move_to(P(1.9, 0.4))
        rule = M(r"\vec F_{\text{pseudo}} = -m\vec a_0", 42, color=PS_C).move_to(P(1.9, -0.8))
        with self.voiceover("Stand on a scale in a lift accelerating upward. From the ground, N minus m g equals m a, "
                            "so N is m times g plus a. From inside the lift you are at rest, so add a pseudo force, "
                            "m a, opposite to the lift's acceleration. Same answer.") as vo:
            self.play(FadeIn(hd), Create(cable), FadeIn(lift), FadeIn(scale_), FadeIn(person), GrowArrow(aa),
                      FadeIn(aal), run_time=1.0)
            self.play(GrowArrow(Nv), GrowArrow(Wv), FadeIn(Nl), FadeIn(Wl), run_time=0.8)
            self.play(FadeIn(g1), Write(e1), run_time=1.0)
            self.wait(vo.duration * 0.15)
            self.play(GrowArrow(ps), FadeIn(psl), FadeIn(g2), Write(e2), run_time=1.2)
            self.wait(vo.duration * 0.05)
            self.play(Write(both), run_time=1.0)
            self.play(Write(rule), run_time=0.9)

        vals = [("speeding up\n2 m/s\u00b2 up", 720), ("steady\nspeed", 600), ("slowing on\nthe way up", 480),
                ("free fall", 0)]
        base = P(-3.2, -2.6)
        bars = VGroup()
        labs = VGroup()
        nums = VGroup()
        for i, (txt, v) in enumerate(vals):
            x = base[0] + i * 2.4
            h = max(v / 720 * 3.4, 0.02)
            bar = Rectangle(width=1.2, height=h, color=N_C, stroke_width=0).set_fill(N_C if v else WARN, 0.85)
            bar.move_to(P(x, base[1]), aligned_edge=DOWN)
            bars.add(bar)
            labs.add(T(txt, 20, color=MUTED).next_to(P(x, base[1]), DOWN, buff=0.15))
            nums.add(M(rf"{v}\ \text{{N}}", 32, color=INK).next_to(bar, UP, buff=0.12))
        axis = Line(base + 1.0 * LEFT, base + 8.4 * RIGHT, color=INK, stroke_width=2)
        ttl = T("scale reading for a 60 kg student", 28, color=PRIMARY, weight="BOLD").move_to(P(0.6, 2.9))
        wl = T("weightless: nothing holds you up; gravity is still on", 24, color=WARN).move_to(P(0.6, 2.25))
        with self.voiceover("A sixty kilogram student reads seven hundred and twenty newtons while the lift speeds up "
                            "at two, six hundred at steady speed, four hundred and eighty while slowing on the way up, "
                            "and zero in free fall. Weightless does not mean gravity is off. It means nothing is "
                            "holding you up.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(FadeIn(ttl), Create(axis), run_time=0.6)
            for i in range(4):
                self.play(GrowFromEdge(bars[i], DOWN), FadeIn(labs[i]), FadeIn(nums[i]), run_time=0.7)
                self.wait(vo.duration * 0.08)
            self.play(FadeIn(wl), run_time=0.7)

        road = Line(P(-6.6, -2.4), P(0.4, -2.4), color=INK, stroke_width=4)
        car = RoundedRectangle(width=4.4, height=2.6, corner_radius=0.2, color=INK, stroke_width=3)
        car.set_fill(ManimColor("#F7EFEA"), 1).move_to(P(-3.2, -0.6))
        wheels = VGroup(*[Circle(radius=0.35, color=INK, stroke_width=3).set_fill(MUTED, 1).move_to(P(x, -2.05))
                          for x in (-4.6, -1.8)])
        top = car.get_top() + 0.0 * UP
        th = np.arctan(0.5)
        bob_p = top + 1.8 * np.array([-np.sin(th), -np.cos(th), 0])
        string = Line(top, bob_p, color=INK, stroke_width=3)
        bob = Circle(radius=0.2, color=INK, stroke_width=3).set_fill(PRIMARY, 1).move_to(bob_p)
        vert = DashedLine(top, top + 1.9 * DOWN, color=MUTED, stroke_width=2)
        ac = vec(P(-0.6, 1.2), P(0.6, 1.2), APP_C, sw=5)
        acl = flab("a", ac.get_end(), RIGHT, APP_C, 32)
        psv = vec(bob_p, bob_p + 1.0 * LEFT, PS_C, sw=5)
        psvl = flab("ma", psv.get_end(), DOWN, PS_C, 26)
        f1 = M(r"\tan\theta = \frac{a}{g}", 50).move_to(P(3.6, 1.4))
        f2 = M(r"g_{\text{eff}} = \sqrt{g^2 + a^2}", 46).next_to(f1, DOWN, buff=0.4)
        f3 = T("a pseudo force has no third-law partner", 24, color=PS_C).next_to(f2, DOWN, buff=0.45)
        f4 = T("use it only inside the accelerating frame", 24, color=PS_C).next_to(f3, DOWN, buff=0.15)
        with self.voiceover("In a car accelerating at a, a hanging bob tilts back until tan theta equals a over g. It "
                            "hangs along the effective gravity. But a pseudo force has no third-law partner: use it "
                            "only inside the accelerating frame, never on top of m a.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(Create(road), FadeIn(car), FadeIn(wheels), GrowArrow(ac), FadeIn(acl), Create(vert), run_time=0.9)
            self.play(Create(string), FadeIn(bob), run_time=0.7)
            self.play(GrowArrow(psv), FadeIn(psvl), Write(f1), run_time=1.2)
            self.play(Write(f2), run_time=1.0)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(f3), FadeIn(f4), run_time=0.8)

    # ------------------------------------------------------------ scene 8: recap
    def s8(self):
        title = T("Chapter 3 in six lines", 38, color=PRIMARY, weight="BOLD").move_to(P(0, 3.2))
        lines = [
            (r"\sum\vec F = \vec 0 \iff \vec v\ \text{const}", "no net force, no change in motion"),
            (r"\sum\vec F = \frac{d\vec p}{dt},\ \ J = \Delta p", "impulse = area under F-t"),
            (r"\vec F_{AB} = -\vec F_{BA}", "pairs act on different bodies"),
            (r"\frac{F_1}{\sin\alpha} = \frac{F_2}{\sin\beta} = \frac{F_3}{\sin\gamma}", "closed polygon; Lami"),
            (r"a_A = -2\,a_P", "constraints from string length"),
            (r"\vec F_{\text{pseudo}} = -m\vec a_0", "only in accelerating frames"),
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
            r[2].move_to(P(0, r[1].get_y()), aligned_edge=LEFT).set_x(1.4, direction=LEFT)
        with self.voiceover("To recap. No net force means constant velocity. Net force is the rate of change of "
                            "momentum, and impulse is the area under force against time.") as vo:
            self.play(FadeIn(title), run_time=0.6)
            self.play(FadeIn(rows[0], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.25)
            self.play(FadeIn(rows[1], shift=0.15 * UP), run_time=0.7)
        with self.voiceover("Third-law pairs act on different bodies, so a free-body diagram shows only forces on "
                            "one body. In equilibrium the force polygon closes. Strings fix the tension and the "
                            "constraints. And in an accelerating frame, add minus m a nought to every body.") as vo:
            for i in (2, 3, 4, 5):
                self.play(FadeIn(rows[i], shift=0.15 * UP), run_time=0.7)
                if i < 5:
                    self.wait(vo.duration * 0.15)
        with self.voiceover("Try the mastery quiz. Then chapter four adds friction, a force that adjusts itself up "
                            "to a ceiling, and sends bodies round circles.") as vo:
            nxt = T("Next: Chapter 4 · Friction and Circular Dynamics", 32, color=PRIMARY).move_to(P(0, -3.5))
            self.wait(vo.duration * 0.3)
            self.play(FadeIn(nxt, shift=0.2 * UP), run_time=0.8)
