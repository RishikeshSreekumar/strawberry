import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

import re  # noqa: E402

# `say` reads a lone "a" as the article "uh"; spell the variable as a letter.
LA = "[[char LTRL]]a[[char NORM]]"
SAY_A = ['with a equals']


def say_fix(text):
    for ph in SAY_A:
        text = text.replace(ph, re.sub(r"(?<![A-Za-z])a(?![A-Za-z])", LA, ph))
    return text

# Chapter colour roles (light background).
F_C = PRIMARY  # force = strawberry red
S_C = SECONDARY  # displacement / kinetic energy = teal
CMP_C = ACCENT  # component along the path, work area = amber
U_C = PURPLE  # potential energy
FR_C = GREEN  # friction
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


def check():
    return MathTex(r"\checkmark", color=GREEN, font_size=52)


def cross_mark():
    return MathTex(r"\times", color=WARN, font_size=60)


def header(s):
    return T(s, 24, color=MUTED, weight="BOLD").to_corner(UL, buff=0.35)


def block(w=1.0, h=0.8, fill=WOOD, label=None, size=28):
    r = Rectangle(width=w, height=h, color=INK, stroke_width=3).set_fill(fill, 1)
    if label is None:
        return VGroup(r)
    return VGroup(r, M(label, size).move_to(r))


def flab(s, at, direction, color, size=32, buff=0.1):
    return M(s, size, color=color).next_to(at, direction, buff=buff)


def plain_axes(xr, yr, xl, yl, pos):
    return Axes(x_range=xr, y_range=yr, x_length=xl, y_length=yl,
                axis_config={"color": INK, "stroke_width": 2}, tips=False).move_to(pos)


class MfeCh5Video(NarratedScene):
    def voiceover(self, text):
        return super().voiceover(say_fix(text))

    def construct(self):
        self.title_card(
            "Motion, Forces and Energy",
            "Chapter 5 · Work, Energy and Power",
            "Chapter five. Work, energy and power.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ scene 1: work by a constant force
    def s1(self):
        hd = header("5.1 · Work done by a constant force")
        floor = Line(P(-6.6, -1.6), P(6.6, -1.6), color=INK, stroke_width=4)
        bag = block(1.2, 0.9, fill=ManimColor("#B9D7DC")).move_to(P(-4.6, 0.2))
        hold = vec(bag.get_top(), bag.get_top() + 1.3 * UP, F_C)
        holdl = flab("F", hold.get_end(), RIGHT, F_C)
        grp = VGroup(bag, hold, holdl)
        sarr = vec(P(-4.6, -0.8), P(1.4, -0.8), S_C)
        sl = flab(r"\vec s", sarr.get_end(), RIGHT, S_C)
        zero = M(r"W_{\text{you on bag}} = 0", 44).move_to(P(3.6, 1.6))
        eff = T("work is not effort", 28, color=PRIMARY).next_to(zero, DOWN, buff=0.3)
        with self.voiceover("Carry a heavy bag along a level corridor at a steady pace. You arrive tired, yet you did "
                            "no work on the bag. In physics, work is not effort.") as vo:
            self.play(FadeIn(hd), Create(floor), FadeIn(grp), run_time=0.8)
            self.play(grp.animate.shift(6.0 * RIGHT), GrowArrow(sarr), run_time=2.6, rate_func=linear)
            self.play(FadeIn(sl), Write(zero), run_time=0.9)
            self.play(FadeIn(eff), run_time=0.6)

        O = P(-3.6, -1.4)
        Ls = 5.0
        th = ValueTracker(35.0)
        LF = 3.0

        def ftip():
            return O + LF * U(th.get_value())

        s_ar = vec(O, O + Ls * RIGHT, S_C)
        s_l = flab(r"\vec s", O + Ls * RIGHT, DOWN, S_C)
        F_ar = always_redraw(lambda: vec(O, ftip(), F_C))
        F_l = always_redraw(lambda: M(r"\vec F", 36, color=F_C).move_to(ftip() + 0.35 * U(th.get_value())))
        shadow = always_redraw(lambda: Line(O, P(ftip()[0], O[1]), color=CMP_C, stroke_width=12))
        drop = always_redraw(lambda: DashedLine(ftip(), P(ftip()[0], O[1]), color=MUTED, stroke_width=3))
        arc = always_redraw(lambda: Arc(radius=0.6, start_angle=0, angle=th.get_value() * DEGREES, arc_center=O,
                                        color=INK, stroke_width=3))
        defn = M(r"W = \vec F\cdot\vec s = Fs\cos\theta", 52, color=PRIMARY).move_to(P(0, 2.4))
        dbox = SurroundingRectangle(defn, buff=0.2, corner_radius=0.12, color=PRIMARY, stroke_width=3)
        tl = M(r"\theta =", 38).move_to(P(2.4, 0.9))
        tv = DecimalNumber(35, num_decimal_places=0, unit=r"^\circ", font_size=38, color=INK)
        tv.add_updater(lambda m: m.set_value(th.get_value()).next_to(tl, RIGHT, buff=0.15))
        wl = M(r"W \propto \cos\theta =", 38).move_to(P(2.9, 0.0))
        wv = DecimalNumber(0.82, num_decimal_places=2, include_sign=True, font_size=38, color=CMP_C)
        wv.add_updater(lambda m: m.set_value(np.cos(th.get_value() * DEGREES)).next_to(wl, RIGHT, buff=0.15))
        signs = VGroup(T("below 90\u00b0: helps, W > 0", 24, color=GREEN), T("at 90\u00b0: W = 0", 24, color=INK),
                       T("beyond 90\u00b0: takes energy, W < 0", 24, color=WARN)).arrange(DOWN, buff=0.18,
                                                                                         aligned_edge=LEFT)
        signs.move_to(P(4.4, -1.6))
        with self.voiceover("Work is the part of the force along the displacement, times the distance: F dot s, or "
                            "F s cos theta. The sign carries meaning. Below ninety degrees the force helps, and the "
                            "work is positive. At ninety it is zero. Beyond ninety, the force takes energy away, and "
                            "the work is negative.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(Write(defn), Create(dbox), run_time=1.3)
            self.add(F_ar, F_l, shadow, drop, arc)
            self.play(GrowArrow(s_ar), FadeIn(s_l), FadeIn(F_ar), FadeIn(F_l), FadeIn(arc), run_time=0.9)
            self.play(Create(drop), Create(shadow), FadeIn(tl), FadeIn(tv), FadeIn(wl), FadeIn(wv), run_time=0.9)
            self.wait(vo.duration * 0.12)
            self.play(FadeIn(signs[0]), run_time=0.5)
            self.play(th.animate.set_value(90), run_time=1.8)
            self.play(FadeIn(signs[1]), run_time=0.5)
            self.play(th.animate.set_value(145), run_time=1.8)
            self.play(FadeIn(signs[2]), run_time=0.5)
        for m in (F_ar, F_l, shadow, drop, arc, tv, wv):
            m.clear_updaters()

        ang = 37 * DEGREES
        A0 = P(-6.4, -2.8)
        Lw = 6.2
        wedge = Polygon(A0, A0 + Lw * RIGHT, A0 + Lw * RIGHT + Lw * np.tan(ang) * UP, color=INK, stroke_width=3)
        wedge.set_fill(STEEL, 1)
        u = U(37)
        n = U(127)
        c = A0 + 4.0 * u + 0.45 * n
        blk = Square(side_length=0.9, color=INK, stroke_width=3).set_fill(WOOD, 1).rotate(ang).move_to(c)
        Tt = vec(c + 0.45 * u, c + 2.0 * u, PURPLE)
        Wg = vec(c, c + 1.7 * DOWN, F_C)
        Nn = vec(c + 0.45 * n, c + 1.7 * n, S_C)
        Ff = vec(c - 0.45 * u - 0.3 * n, c - 1.4 * u - 0.3 * n, FR_C)
        labs = VGroup(flab("T", Tt.get_end(), UP, PURPLE, 30), flab("mg", Wg.get_end(), DOWN, F_C, 30),
                      flab("N", Nn.get_end(), LEFT, S_C, 30), flab("f", Ff.get_end(), DOWN, FR_C, 30))
        rows = VGroup(
            M(r"W_T = 25 \times 5 = 125\ \text{J}", 36, color=PURPLE),
            M(r"W_g = -12 \times 5 = -60\ \text{J}", 36, color=F_C),
            M(r"W_N = 0", 36, color=S_C),
            M(r"W_f = -4 \times 5 = -20\ \text{J}", 36, color=FR_C),
            M(r"W_{\text{total}} = 45\ \text{J} = (9\ \text{N})(5\ \text{m})", 38, color=INK),
        ).arrange(DOWN, buff=0.25, aligned_edge=LEFT).move_to(P(3.9, 0.4))
        rows[4].shift(0.15 * DOWN)
        give = fit(T("2 kg, 5 m up a rough 37\u00b0 slope, T = 25 N, \u03bck = 0.25", 22, color=MUTED), 6.0).move_to(P(3.8, 2.9))
        with self.voiceover("Pull a two kilogram block five metres up a rough slope with a rope. The tension does a "
                            "hundred and twenty five joules, gravity minus sixty, the normal force zero, and "
                            "friction minus twenty. The total, forty five joules, is just the net force times the "
                            "distance.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(FadeIn(wedge), FadeIn(blk), FadeIn(give), run_time=0.7)
            self.play(GrowArrow(Tt), GrowArrow(Wg), GrowArrow(Nn), GrowArrow(Ff), FadeIn(labs), run_time=1.0)
            for i, r in enumerate(rows):
                self.play(FadeIn(r, shift=0.1 * UP), run_time=0.6)
                if i < 4:
                    self.wait(vo.duration * 0.06)

    # ------------------------------------------------------------ scene 2: variable force
    def s2(self):
        hd = header("5.2 · Work done by a variable force")
        ax = plain_axes([0, 3, 1], [0, 16, 4], 6.0, 4.4, P(-2.9, -0.5))
        axl = VGroup(M("x", 30, color=MUTED).next_to(ax.x_axis.get_end(), RIGHT, buff=0.1),
                     M("F", 30, color=MUTED).next_to(ax.y_axis.get_end(), UP, buff=0.1))
        f = lambda x: 3 * x ** 2 + 2  # noqa: E731
        curve = ax.plot(f, x_range=[0, 2.25], color=F_C, stroke_width=5)
        rects = [ax.get_riemann_rectangles(curve, x_range=[1, 2], dx=d, color=CMP_C, fill_opacity=0.55,
                                           stroke_width=1, stroke_color=INK) for d in (0.25, 0.1, 0.02)]
        area = ax.get_area(curve, x_range=[1, 2], color=CMP_C, opacity=0.55)
        e1 = M(r"W \approx \sum F\,\Delta x", 44).move_to(P(3.6, 2.2))
        e2 = M(r"W = \int_{x_1}^{x_2} F\,dx", 48, color=PRIMARY).next_to(e1, DOWN, buff=0.4)
        e2n = T("the signed area under F-x", 24, color=MUTED).next_to(e2, DOWN, buff=0.25)
        e3 = M(r"\int_1^2 (3x^2 + 2)\,dx = 9\ \text{J}", 40).next_to(e2n, DOWN, buff=0.45)
        with self.voiceover("When the force changes along the path, chop the path into thin strips. Each strip does "
                            "F delta x of work, a sliver of area under the force against position graph. Add them up "
                            "and take the limit: work is the integral of F d x, the signed area under the curve.") as vo:
            self.play(FadeIn(hd), Create(ax), FadeIn(axl), Create(curve), run_time=1.0)
            self.play(FadeIn(rects[0]), Write(e1), run_time=1.0)
            self.wait(vo.duration * 0.1)
            self.play(ReplacementTransform(rects[0], rects[1]), run_time=0.9)
            self.play(ReplacementTransform(rects[1], rects[2]), run_time=0.9)
            self.play(FadeOut(rects[2]), FadeIn(area), Write(e2), run_time=1.0)
            self.play(FadeIn(e2n), run_time=0.5)
            self.wait(vo.duration * 0.05)
            self.play(Write(e3), run_time=1.0)

        ax2 = plain_axes([0, 4.5, 1], [0, 22, 5], 6.0, 4.4, P(-2.9, -0.5))
        ax2l = VGroup(M(r"x\ (\text{cm})", 26, color=MUTED).next_to(ax2.x_axis.get_end(), DOWN, buff=0.15),
                      M(r"F = kx", 30, color=F_C).next_to(ax2.c2p(4.2, 21), LEFT, buff=0.2))
        line = ax2.plot(lambda x: 5 * x, x_range=[0, 4.3], color=F_C, stroke_width=5)
        tri = Polygon(ax2.c2p(0, 0), ax2.c2p(2, 0), ax2.c2p(2, 10), color=CMP_C, stroke_width=2).set_fill(CMP_C, 0.6)
        rect = Polygon(ax2.c2p(0, 0), ax2.c2p(2, 0), ax2.c2p(2, 10), ax2.c2p(0, 10), color=WARN, stroke_width=3)
        rect = DashedVMobject(rect, num_dashes=30)
        trap = Polygon(ax2.c2p(2, 0), ax2.c2p(4, 0), ax2.c2p(4, 20), ax2.c2p(2, 10), color=U_C, stroke_width=2)
        trap.set_fill(U_C, 0.45)
        ticks = VGroup(*[M(str(v), 24, color=MUTED).next_to(ax2.c2p(v, 0), DOWN, buff=0.1) for v in (2, 4)])
        s1 = M(r"W_{\text{spring}} = \tfrac12 kx^2", 50, color=PRIMARY).move_to(P(3.6, 2.2))
        s2 = M(r"\text{not } kx\cdot x", 40, color=WARN).next_to(s1, DOWN, buff=0.3)
        s2x = cross_mark().scale(0.7).next_to(s2, RIGHT, buff=0.2)
        s3 = M(r"0 \to 2\ \text{cm}:\ 0.1\ \text{J}", 40, color=CMP_C).move_to(P(3.6, 0.0))
        s4 = M(r"2 \to 4\ \text{cm}:\ 0.3\ \text{J}", 40, color=U_C).next_to(s3, DOWN, buff=0.3)
        s5 = T("k = 500 N/m: three times as much", 24, color=MUTED)
        fit(s5, 6.4).next_to(s4, DOWN, buff=0.35)
        with self.voiceover("A spring pushes with k x, a straight line through the origin, so its work is a "
                            "triangle: one half k x squared. Not k x times x, because the force grows from zero. "
                            "That is why the second stretch costs more. With k of five hundred, zero to two "
                            "centimetres takes point one joules, but two to four takes point three.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(Create(ax2), FadeIn(ax2l), FadeIn(ticks), Create(line), run_time=1.0)
            self.play(FadeIn(tri), Write(s1), run_time=1.0)
            self.wait(vo.duration * 0.08)
            self.play(Create(rect), FadeIn(s2), FadeIn(s2x), run_time=1.0)
            self.wait(vo.duration * 0.1)
            self.play(FadeOut(rect), Write(s3), run_time=0.9)
            self.play(FadeIn(trap), Write(s4), run_time=1.0)
            self.play(FadeIn(s5), run_time=0.6)

    # ------------------------------------------------------------ scene 3: the work-energy theorem
    def s3(self):
        hd = header("5.3 · The work-energy theorem")
        d1 = M(r"F = ma = mv\frac{dv}{dx}", 48).move_to(P(0, 2.2))
        d2 = M(r"\int_{x_1}^{x_2} F\,dx = \int_u^v mv\,dv = \tfrac12 mv^2 - \tfrac12 mu^2", 48).move_to(P(0, 0.8))
        d3 = M(r"W_{\text{all}} = \Delta K, \qquad K = \tfrac12 mv^2", 56, color=PRIMARY).move_to(P(0, -0.8))
        box = SurroundingRectangle(d3, buff=0.25, corner_radius=0.15, color=PRIMARY, stroke_width=3)
        note = T("start and end only: no time, any force", 28, color=GREEN).move_to(P(0, -2.3))
        with self.voiceover("Now the payoff. Write Newton's second law with a equals v d v by d x. Multiply by d x, "
                            "and integrate. The total work done by all the forces equals the change in one half m v "
                            "squared, the kinetic energy. It needs only the start and the end, never the time, and "
                            "it holds for any force.") as vo:
            self.play(FadeIn(hd), Write(d1), run_time=1.3)
            self.wait(vo.duration * 0.08)
            self.play(Write(d2), run_time=2.0)
            self.wait(vo.duration * 0.08)
            self.play(Write(d3), Create(box), run_time=1.4)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(note), run_time=0.6)

        road = Line(P(-6.6, 0.6), P(6.6, 0.6), color=INK, stroke_width=4)
        car = VGroup(RoundedRectangle(width=1.4, height=0.6, corner_radius=0.12, color=INK, stroke_width=3)
                     .set_fill(BLUEB, 1),
                     *[Circle(radius=0.17, color=INK, stroke_width=3).set_fill(MUTED, 1).move_to(P(x, -0.32))
                       for x in (-0.4, 0.4)])
        car.move_to(P(-5.6, 1.1))
        x_end = -5.6 + 8.0
        skid = Line(P(-5.6 + 0.5, 0.62), P(x_end - 0.5, 0.62), color=MUTED, stroke_width=5)
        dbr = BraceBetweenPoints(P(-5.6, 0.45), P(x_end, 0.45), DOWN, color=MUTED)
        dl = M(r"d", 32, color=MUTED).next_to(dbr, DOWN, buff=0.1)
        w1 = M(r"-\mu mg\,d = 0 - \tfrac12 mv^2 \;\Rightarrow\; d = \frac{v^2}{2\mu g} = \frac{400}{10} = 40\ \text{m}", 42)
        fit(w1, 12.6).move_to(P(0, -1.6))
        w2 = T("double the speed: four times the distance", 28, color=PRIMARY).move_to(P(0, -2.8))
        hdr2 = T("braking from 20 m/s, \u03bck = 0.5", 24, color=MUTED).move_to(P(0, 2.6))
        with self.voiceover("A car brakes from twenty metres per second on a road with mu of point five. Only friction "
                            "does work: minus mu m g d equals minus one half m v squared, so it skids forty metres. "
                            "Double the speed, and it skids four times as far.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(Create(road), FadeIn(car), FadeIn(hdr2), run_time=0.7)
            self.play(car.animate.move_to(P(x_end, 1.1)), Create(skid), run_time=2.4,
                      rate_func=rate_functions.ease_out_quad)
            self.play(GrowFromCenter(dbr), FadeIn(dl), run_time=0.6)
            self.play(Write(w1), run_time=1.8)
            self.wait(vo.duration * 0.05)
            self.play(FadeIn(w2), run_time=0.6)

        wood = Rectangle(width=6.0, height=2.0, color=INK, stroke_width=3).set_fill(WOOD, 1).move_to(P(-1.6, 0.6))
        sc = 1.2  # units per cm
        x0 = wood.get_left()[0]
        b3 = Line(P(x0, 0.6), P(x0 + 3 * sc, 0.6), color=CMP_C, stroke_width=8)
        b1 = Line(P(x0 + 3 * sc, 0.6), P(x0 + 4 * sc, 0.6), color=S_C, stroke_width=8)
        bullet = Polygon(P(-0.3, 0.1), P(0.15, 0.1), P(0.3, 0), P(0.15, -0.1), P(-0.3, -0.1), color=INK,
                         stroke_width=2).set_fill(MUTED, 1).move_to(P(x0 - 1.4, 0.6))
        l3 = M(r"3\ \text{cm}:\ v \to \tfrac v2", 32, color=CMP_C).next_to(wood, UP, buff=0.2).set_x(b3.get_center()[0])
        l1 = M(r"+1\ \text{cm}", 32, color=S_C).next_to(b1, DOWN, buff=0.25)
        bars = VGroup(*[Rectangle(width=0.9, height=0.6, stroke_width=2, color=INK)
                        .set_fill(CMP_C if i < 3 else S_C, 0.8) for i in range(4)]).arrange(RIGHT, buff=0)
        bars.move_to(P(-1.6, -2.0))
        bl = M(r"K:\ \ \tfrac34 \text{ lost in 3 cm}, \ \ \tfrac14 \text{ left}", 32).next_to(bars, DOWN, buff=0.25)
        kk = T("half the speed = a quarter of the energy", 26, color=PRIMARY).move_to(P(3.9, 1.9))
        fit(kk, 5.4)
        with self.voiceover("A bullet that loses half its speed in three centimetres of wood has lost three quarters "
                            "of its kinetic energy. A constant force removes energy evenly with distance, so the last "
                            "quarter lasts just one more centimetre.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(FadeIn(wood), FadeIn(bullet), run_time=0.6)
            self.play(bullet.animate.move_to(P(x0 + 3 * sc - 0.2, 0.6)), Create(b3), run_time=1.4,
                      rate_func=rate_functions.ease_out_quad)
            self.play(FadeIn(l3), FadeIn(kk), FadeIn(bars), run_time=0.8)
            self.wait(vo.duration * 0.1)
            self.play(bullet.animate.move_to(P(x0 + 4 * sc - 0.2, 0.6)), Create(b1), run_time=1.0,
                      rate_func=rate_functions.ease_out_quad)
            self.play(FadeIn(l1), FadeIn(bl), run_time=0.7)

    # ------------------------------------------------------------ scene 4: conservative forces, energy
    def s4(self):
        hd = header("5.4 · Conservative forces and mechanical energy")
        A = P(-5.2, -2.2)
        B = P(-2.2, 1.6)
        straight = DashedLine(A, B, color=U_C, stroke_width=4)
        wig = VMobject(color=U_C, stroke_width=4).set_points_smoothly([
            A, P(-6.2, -0.8), P(-4.4, -0.2), P(-6.0, 1.0), P(-4.0, 2.2), B])
        dA = Dot(A, color=INK)
        dB = Dot(B, color=INK)
        lA = M("A", 30).next_to(A, DOWN, buff=0.1)
        lB = M("B", 30).next_to(B, RIGHT, buff=0.1)
        g1 = M(r"W_g = -mgh \text{ on every path}", 40, color=U_C).move_to(P(3.2, 2.0))
        g2 = T("gravity: conservative", 26, color=U_C).next_to(g1, DOWN, buff=0.2)
        f1 = M(r"W_f \propto \text{path length}", 40, color=FR_C).move_to(P(3.2, 0.3))
        f2 = T("friction: not conservative", 26, color=FR_C).next_to(f1, DOWN, buff=0.2)
        with self.voiceover("Lift a book to a shelf by any route, and gravity does the same work, minus m g h. Drag it "
                            "across a rough floor by a longer route, and friction does more negative work. Gravity "
                            "cares only about the endpoints. It is conservative.") as vo:
            self.play(FadeIn(hd), FadeIn(dA), FadeIn(dB), FadeIn(lA), FadeIn(lB), run_time=0.6)
            self.play(Create(straight), Create(wig), run_time=1.6)
            self.play(Write(g1), FadeIn(g2), run_time=1.2)
            self.wait(vo.duration * 0.1)
            self.play(Write(f1), FadeIn(f2), run_time=1.2)

        u1 = M(r"\Delta U = -W_{\text{cons}}", 46).move_to(P(0, 2.2))
        u2 = M(r"U_g = mgh, \qquad U_s = \tfrac12 kx^2", 44, color=U_C).move_to(P(0, 0.9))
        u3 = M(r"W_{\text{nc}} = \Delta(K + U)", 46).move_to(P(0, -0.4))
        u4 = M(r"\text{only conservative forces:}\quad K + U = \text{constant}", 44, color=PRIMARY).move_to(P(0, -1.8))
        with self.voiceover("For a conservative force, store its work as potential energy: delta U equals minus W. "
                            "Gravity gives m g h, and a spring one half k x squared. If only conservative forces do "
                            "work, K plus U stays constant.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(Write(u1), run_time=1.0)
            self.wait(vo.duration * 0.08)
            self.play(Write(u2), run_time=1.2)
            self.wait(vo.duration * 0.08)
            self.play(Write(u3), run_time=1.0)
            self.play(Write(u4), run_time=1.3)

        # loop-the-loop with energy bars
        g0 = -2.8
        R = 1.15
        lc = P(-1.6, g0 + R)
        h = 2.5 * R
        ramp = CubicBezier(P(-6.4, g0 + h), P(-5.2, g0 + h - 0.1), P(-5.0, g0), P(-3.6, g0))
        flat = Line(P(-3.6, g0), lc + R * DOWN)
        loop = Arc(radius=R, start_angle=-PI / 2, angle=TAU, arc_center=lc)
        exitl = Line(lc + R * DOWN, P(0.6, g0))
        path = VMobject()
        path.append_points(ramp.points)
        path.append_points(flat.points)
        path.append_points(loop.points)
        path.append_points(exitl.points)
        track = path.copy().set_stroke(INK, 4)
        ground = Line(P(-6.6, g0 - 0.05), P(0.8, g0 - 0.05), color=MUTED, stroke_width=2)
        hbr = DashedLine(P(-6.6, g0), P(-6.6, g0 + h), color=MUTED, stroke_width=2)
        hl = M(r"h", 30, color=MUTED).next_to(hbr, RIGHT, buff=0.1)
        top_r = DashedLine(lc + R * UP, lc + R * UP + 1.6 * LEFT, color=GRID, stroke_width=2)
        Rl = M(r"R", 28, color=MUTED).move_to(lc + 0.45 * R * RIGHT + 0.2 * UP)
        rline = Line(lc, lc + R * RIGHT, color=MUTED, stroke_width=2)
        s = ValueTracker(0.0)
        rb = 0.14

        def bpos():
            p = path.point_from_proportion(np.clip(s.get_value(), 0, 1))
            return p

        ball = always_redraw(lambda: Dot(bpos() + rb * self._normal(path, s.get_value()), radius=rb, color=PRIMARY))
        E = 3.2
        base_y = -2.6

        def Ufrac():
            return np.clip((bpos()[1] - g0) / h, 0, 1)

        Ubar = always_redraw(lambda: Rectangle(width=0.7, height=max(E * Ufrac(), 0.01), stroke_width=0)
                             .set_fill(U_C, 0.9).move_to(P(1.5, base_y), aligned_edge=DOWN))
        Kbar = always_redraw(lambda: Rectangle(width=0.7, height=max(E * (1 - Ufrac()), 0.01), stroke_width=0)
                             .set_fill(S_C, 0.9).move_to(P(2.5, base_y), aligned_edge=DOWN))
        tot = DashedLine(P(1.0, base_y + E), P(3.0, base_y + E), color=INK, stroke_width=2)
        totl = M(r"E", 28).next_to(tot, RIGHT, buff=0.1)
        bl = VGroup(M("U", 30, color=U_C).next_to(P(1.5, base_y), DOWN, buff=0.12),
                    M("K", 30, color=S_C).next_to(P(2.5, base_y), DOWN, buff=0.12))
        bline = Line(P(1.0, base_y), P(3.0, base_y), color=INK, stroke_width=2)
        q1 = M(r"\text{top: } mg \le \frac{mv^2}{R}", 36).move_to(P(5.0, 2.4))
        q2 = fit(M(r"mgh = mg(2R) + \tfrac12 mv^2", 36), 3.6).next_to(q1, DOWN, buff=0.35)
        q3 = M(r"h \ge \tfrac52 R", 46, color=GREEN).next_to(q2, DOWN, buff=0.4)
        with self.voiceover("Now the loop-the-loop takes two lines. At the top of the loop the ball needs v squared at "
                            "least g R. Energy from the release point: m g h equals m g times two R, plus one half m "
                            "v squared. So h must be at least five halves R.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.add(ball, Ubar, Kbar)
            self.play(Create(track), FadeIn(ground), Create(hbr), FadeIn(hl), Create(rline), FadeIn(Rl), run_time=1.0)
            self.play(FadeIn(ball), FadeIn(Ubar), FadeIn(Kbar), Create(bline), FadeIn(bl), Create(tot), FadeIn(totl),
                      run_time=0.7)
            self.play(Write(q1), run_time=1.0)
            self.play(s.animate.set_value(1.0), run_time=5.0, rate_func=linear)
            self.play(Write(q2), run_time=1.2)
            self.play(Write(q3), Create(top_r), run_time=1.0)
        for m in (ball, Ubar, Kbar):
            m.clear_updaters()

    @staticmethod
    def _normal(path, a):
        a = float(np.clip(a, 0.0005, 0.9995))
        p1 = path.point_from_proportion(a - 0.0005)
        p2 = path.point_from_proportion(a + 0.0005)
        t = p2 - p1
        nrm = np.linalg.norm(t)
        if nrm < 1e-9:
            return UP
        t = t / nrm
        return np.array([-t[1], t[0], 0.0])

    # ------------------------------------------------------------ scene 5: potential energy curves
    def s5(self):
        hd = header("5.5 · Potential energy curves and equilibrium")
        ax = plain_axes([-2.4, 2.4, 1], [-5, 4, 1], 7.6, 5.2, P(-2.6, -0.3))
        Uf = lambda x: x ** 4 - 4 * x ** 2  # noqa: E731
        curve = ax.plot(Uf, x_range=[-2.2, 2.2], color=U_C, stroke_width=5)
        axl = VGroup(M("x", 28, color=MUTED).next_to(ax.x_axis.get_end(), RIGHT, buff=0.1),
                     M("U", 28, color=U_C).next_to(ax.y_axis.get_end(), UP, buff=0.1))
        lab = M(r"U = x^4 - 4x^2", 32, color=U_C).move_to(ax.c2p(-1.45, 3.2))
        E = -2.0
        Eline = DashedLine(ax.c2p(-2.4, E), ax.c2p(2.4, E), color=PRIMARY, stroke_width=3)
        El = M(r"E = -2\ \text{J}", 28, color=PRIMARY).next_to(ax.c2p(2.4, E), RIGHT, buff=0.1)
        x1, x2 = np.sqrt(2 - np.sqrt(2)), np.sqrt(2 + np.sqrt(2))
        allowed = VGroup(*[Line(ax.c2p(a, E), ax.c2p(b, E), color=GREEN, stroke_width=9)
                           for a, b in ((-x2, -x1), (x1, x2))])
        tps = VGroup(*[Dot(ax.c2p(x, E), color=PRIMARY, radius=0.07) for x in (-x2, -x1, x1, x2)])
        xt = ValueTracker(x1)
        ball = always_redraw(lambda: Dot(ax.c2p(xt.get_value(), Uf(xt.get_value())), radius=0.12, color=INK)
                             .shift(0.12 * UP))
        gap = always_redraw(lambda: Line(ax.c2p(xt.get_value(), Uf(xt.get_value())), ax.c2p(xt.get_value(), E),
                                         color=S_C, stroke_width=6))
        r1 = M(r"K = E - U \ge 0", 40).move_to(P(4.2, 2.4))
        r2 = T("allowed only where U \u2264 E", 24, color=GREEN).next_to(r1, DOWN, buff=0.25)
        r3 = T("turning points: K = 0", 24, color=PRIMARY).next_to(r2, DOWN, buff=0.2)
        gl = M(r"K", 28, color=S_C)
        gl.add_updater(lambda m: m.next_to(ax.c2p(xt.get_value(), (Uf(xt.get_value()) + E) / 2), RIGHT, buff=0.1))
        with self.voiceover("Every one dimensional motion under a conservative force is a roller coaster, with the "
                            "graph of U as the track. Draw a line at the total energy. The kinetic energy is the gap "
                            "between the line and the curve, so the particle stays where U is below E, and turns "
                            "round where they meet.") as vo:
            self.play(FadeIn(hd), Create(ax), FadeIn(axl), Create(curve), FadeIn(lab), run_time=1.2)
            self.wait(vo.duration * 0.1)
            self.play(Create(Eline), FadeIn(El), run_time=0.7)
            self.add(gap, ball)
            self.play(FadeIn(ball), FadeIn(gap), FadeIn(gl), Write(r1), run_time=0.9)
            self.play(xt.animate.set_value(x2), run_time=1.6, rate_func=rate_functions.ease_in_out_sine)
            self.play(xt.animate.set_value(x1), Create(allowed), FadeIn(r2), run_time=1.6,
                      rate_func=rate_functions.ease_in_out_sine)
            self.play(FadeIn(tps), FadeIn(r3), xt.animate.set_value(x2), run_time=1.6,
                      rate_func=rate_functions.ease_in_out_sine)
            self.play(xt.animate.set_value(1.41), run_time=0.8, rate_func=rate_functions.ease_out_sine)
        for m in (ball, gap, gl):
            m.clear_updaters()

        f1 = M(r"F = -\frac{dU}{dx}", 48, color=PRIMARY).move_to(P(4.2, 2.4))
        f2 = T("force points downhill", 24, color=PRIMARY).next_to(f1, DOWN, buff=0.25)
        st = VGroup(*[T("stable", 22, color=GREEN).next_to(ax.c2p(x, -4), DOWN, buff=0.12) for x in (-np.sqrt(2),
                                                                                                     np.sqrt(2))])
        un = T("unstable", 22, color=WARN).next_to(ax.c2p(0, 0), UP, buff=0.18)
        arrows = VGroup(
            vec(ax.c2p(0.8, Uf(0.8)) + 0.25 * UP, ax.c2p(0.8, Uf(0.8)) + 0.25 * UP + 0.8 * RIGHT, F_C, sw=5),
            vec(ax.c2p(1.9, Uf(1.9)) + 0.25 * UP, ax.c2p(1.9, Uf(1.9)) + 0.25 * UP + 0.8 * LEFT, F_C, sw=5),
            vec(ax.c2p(-0.8, Uf(-0.8)) + 0.25 * UP, ax.c2p(-0.8, Uf(-0.8)) + 0.25 * UP + 0.8 * LEFT, F_C, sw=5),
        )
        eq = VGroup(M(r"\frac{dU}{dx} = 0:", 36), M(r"\text{minimum: stable}", 34, color=GREEN),
                    M(r"\text{maximum: unstable}", 34, color=WARN)).arrange(DOWN, buff=0.2, aligned_edge=LEFT)
        eq.move_to(P(4.4, 0.0))
        z = M(r"U(2) = 0, \text{ yet } F = -16\ \text{N}", 34, color=MUTED).move_to(P(4.3, -2.0))
        zn = T("force is the slope, not the value", 22, color=MUTED).next_to(z, DOWN, buff=0.2)
        with self.voiceover("The force is minus the slope, so it always points downhill. Where the curve is flat, the "
                            "force is zero. A valley is stable, a hilltop unstable: here, the wells at plus and minus "
                            "root two are stable, and the hump at zero is not. And where U is zero, the force need not "
                            "be: at x equals two, it is minus sixteen newtons.") as vo:
            self.play(FadeOut(r1), FadeOut(r2), FadeOut(r3), FadeOut(gap), FadeOut(gl), FadeOut(ball), FadeOut(allowed),
                      FadeOut(tps), FadeOut(Eline), FadeOut(El), run_time=0.5)
            self.play(Write(f1), FadeIn(f2), run_time=1.0)
            self.play(LaggedStart(*[GrowArrow(a) for a in arrows], lag_ratio=0.3), run_time=1.2)
            self.wait(vo.duration * 0.05)
            self.play(FadeIn(eq), run_time=0.8)
            self.play(FadeIn(st), FadeIn(un), run_time=0.8)
            self.wait(vo.duration * 0.12)
            dot2 = Dot(ax.c2p(2, 0), color=PRIMARY, radius=0.08)
            self.play(FadeIn(dot2), Write(z), FadeIn(zn), run_time=1.2)

    # ------------------------------------------------------------ scene 6: power
    def s6(self):
        hd = header("5.6 · Power")
        p1 = M(r"P = \frac{dW}{dt} = \vec F\cdot\frac{d\vec s}{dt} = \vec F\cdot\vec v", 52, color=PRIMARY).move_to(P(0, 2.0))
        p2 = M(r"500\ \text{N} \times 20\ \text{m/s} = 10\ \text{kW}", 44).move_to(P(0, 0.5))
        p2n = T("cruising car: drive force = resistance", 24, color=MUTED).next_to(p2, DOWN, buff=0.25)
        kwh = M(r"1\ \text{kWh} = 3.6\times10^6\ \text{J}\ \ (\text{energy, not power})", 36, color=MUTED).move_to(P(0, -1.6))
        with self.voiceover("Power is the rate of doing work. Over a small step, d W is F dot d s, so P equals F dot "
                            "v. A car cruising at twenty metres per second against five hundred newtons of resistance "
                            "delivers ten kilowatts.") as vo:
            self.play(FadeIn(hd), Write(p1), run_time=1.6)
            self.wait(vo.duration * 0.2)
            self.play(Write(p2), FadeIn(p2n), run_time=1.3)
            self.play(FadeIn(kwh), run_time=0.6)

        ax = plain_axes([0, 40, 10], [0, 1000, 200], 6.4, 4.4, P(-2.8, -0.6))
        nums = VGroup(*[M(str(v), 22, color=MUTED).next_to(ax.c2p(v, 0), DOWN, buff=0.1) for v in (10, 20, 30, 40)],
                      *[M(str(v), 22, color=MUTED).next_to(ax.c2p(0, v), LEFT, buff=0.1) for v in (200, 400, 600, 800)])
        axl = VGroup(M(r"v\ (\text{m/s})", 26, color=MUTED).next_to(ax.x_axis.get_end(), DOWN, buff=0.45),
                     M(r"F\ (\text{N})", 26, color=MUTED).next_to(ax.y_axis.get_end(), UP, buff=0.1))
        curve = ax.plot(lambda v: 2000 / v, x_range=[2.05, 40], color=F_C, stroke_width=5)
        cl = M(r"F = \frac{P}{v}", 36, color=F_C).move_to(ax.c2p(9, 800))
        res = DashedLine(ax.c2p(0, 100), ax.c2p(40, 100), color=FR_C, stroke_width=3)
        resl = T("resistance 100 N", 20, color=FR_C).next_to(ax.c2p(31, 100), UP, buff=0.1)
        top = Dot(ax.c2p(20, 100), color=PRIMARY, radius=0.09)
        topl = T("top speed", 22, color=PRIMARY).next_to(top, UP, buff=0.35).shift(0.3 * LEFT)
        q1 = M(r"P = 2\ \text{kW}", 36, color=F_C).move_to(P(3.8, 2.4))
        q2 = T("big push at low speed,\nsmall push at high speed", 24, color=MUTED).next_to(q1, DOWN, buff=0.3)
        q3 = M(r"\text{top speed: } \frac{P}{v_{\max}} = F_{\text{resist}}", 38).move_to(P(3.8, 0.5))
        q4 = M(r"1000\ \text{kg},\ 30\ \text{kW},\ 1\text{ in }20:", 32, color=MUTED).move_to(P(3.8, -0.65))
        q4b = M(r"\tfrac{mg}{20} = 500\ \text{N}\ \text{(slope)} + 500\ \text{N}\ \text{(resistance)}", 30)
        fit(q4b, 5.6).next_to(q4, DOWN, buff=0.2)
        q5 = M(r"v_{\max} = \frac{30\,000}{500 + 500} = 30\ \text{m/s}", 38, color=GREEN).next_to(q4b, DOWN, buff=0.25)
        q6 = fit(T("more power does not mean more force", 24, color=WARN), 5.0).move_to(P(4.0, -3.2))
        with self.voiceover("At full throttle the power is fixed, so the driving force is P over v: big at low speed, "
                            "small at high speed. The top speed is where P over v has fallen to the resistance. A "
                            "thousand kilogram car with thirty kilowatts climbs a one in twenty slope. Gravity adds m "
                            "g over twenty, five hundred newtons, to five hundred of resistance, so it tops out at "
                            "thirty metres per second. More power does not mean more force.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(Create(ax), FadeIn(nums), FadeIn(axl), run_time=0.8)
            self.play(Create(curve), FadeIn(cl), FadeIn(q1), run_time=1.4)
            self.play(FadeIn(q2), run_time=0.6)
            self.wait(vo.duration * 0.05)
            self.play(Create(res), FadeIn(resl), run_time=0.8)
            self.play(FadeIn(top), FadeIn(topl), Write(q3), run_time=1.2)
            self.wait(vo.duration * 0.05)
            self.play(FadeIn(q4), run_time=0.6)
            self.play(Write(q4b), run_time=1.0)
            self.play(Write(q5), run_time=1.3)
            self.wait(vo.duration * 0.05)
            self.play(FadeIn(q6), run_time=0.6)

    # ------------------------------------------------------------ scene 7: recap
    def s7(self):
        title = T("Chapter 5 in six lines", 38, color=PRIMARY, weight="BOLD").move_to(P(0, 3.2))
        lines = [
            (r"W = \vec F\cdot\vec s = Fs\cos\theta", "only the part along the path"),
            (r"W = \int F\,dx", "area under F-x; spring \u00bdkx\u00b2"),
            (r"W_{\text{all}} = \Delta K", "the integral of F = mv dv/dx"),
            (r"\Delta U = -W_{\text{cons}},\ \ E = K + U", "conservative forces store work"),
            (r"F = -\frac{dU}{dx}", "downhill force; minima are stable"),
            (r"P = \vec F\cdot\vec v", "top speed: P = F_resist \u00d7 v"),
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
        with self.voiceover("To recap. Work is the force along the path times the distance, and for a varying force, "
                            "the area under F against x. The total work equals the change in kinetic energy.") as vo:
            self.play(FadeIn(title), run_time=0.6)
            for i in (0, 1, 2):
                self.play(FadeIn(rows[i], shift=0.15 * UP), run_time=0.7)
                if i < 2:
                    self.wait(vo.duration * 0.18)
        with self.voiceover("Conservative forces store their work as potential energy, so K plus U is conserved. "
                            "The force is minus the slope of U. And power is F dot v.") as vo:
            for i in (3, 4, 5):
                self.play(FadeIn(rows[i], shift=0.15 * UP), run_time=0.7)
                if i < 5:
                    self.wait(vo.duration * 0.18)
        with self.voiceover("That completes Mechanics One. You now hold both great tools: Newton's laws for how a "
                            "body moves, and energy for how fast it ends up. Try the mastery quiz. Then Mechanics Two "
                            "adds momentum conservation, and carries all three into rotation and gravitation.") as vo:
            nxt = T("Next: Mechanics II · Momentum, Rotation and Gravitation", 30, color=PRIMARY).move_to(P(0, -3.5))
            fit(nxt, 12.6)
            self.wait(vo.duration * 0.45)
            self.play(FadeIn(nxt, shift=0.2 * UP), run_time=0.8)
