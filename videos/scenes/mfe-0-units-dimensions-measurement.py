import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

import re  # noqa: E402

# `say` reads a lone "a" as the article "uh"; spell the variable as a letter.
LA = "[[char LTRL]]a[[char NORM]]"
SAY_A = ['half a t', 'plus a t squared', 'to the a,', 'so a is zero']


def say_fix(text):
    for ph in SAY_A:
        text = text.replace(ph, re.sub(r"(?<![A-Za-z])a(?![A-Za-z])", LA, ph))
    return text

# Chapter colour roles (light background).
F_C = PRIMARY  # forces / the quantity in focus = strawberry red
V_C = SECONDARY  # second vector / velocity = teal
CMP_C = ACCENT  # components, errors, highlights = amber
ALT_C = PURPLE  # third quantity / resultant
HL = ManimColor("#D19A00")  # highlight gold
WARN = PRIMARY
MARS = ManimColor("#C9643B")
WOOD = ManimColor("#F3D9C9")


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


def vec(start, end, color, sw=6):
    return Arrow(start, end, buff=0, color=color, stroke_width=sw,
                 max_tip_length_to_length_ratio=0.2, max_stroke_width_to_length_ratio=12)


def check():
    return MathTex(r"\checkmark", color=GREEN, font_size=52)


def cross_mark():
    return MathTex(r"\times", color=WARN, font_size=60)


def strike(mob, color=WARN, sw=4):
    return Line(mob.get_corner(DL) + 0.05 * DL, mob.get_corner(UR) + 0.05 * UR, color=color, stroke_width=sw)


def header(s):
    return T(s, 24, color=MUTED, weight="BOLD").to_corner(UL, buff=0.35)


def qty(num, unit, size=40, color=INK):
    """A number and its unit as separate pieces (so the unit can be struck out)."""
    g = VGroup()
    if num:
        g.add(M(num, size, color=color))
    g.add(M(r"\text{" + unit + "}", size, color=color))
    g.arrange(RIGHT, buff=0.12)
    return g


def frac(top, bot, size=40):
    w = max(top.width, bot.width) + 0.2
    bar = Line(LEFT * w / 2, RIGHT * w / 2, color=INK, stroke_width=3)
    top.next_to(bar, UP, buff=0.12)
    bot.next_to(bar, DOWN, buff=0.12)
    return VGroup(top, bar, bot)


def chip(sym, name, color):
    s = M(r"\text{" + sym + "}", 40, color=color)
    box = RoundedRectangle(width=1.5, height=1.0, corner_radius=0.15, color=color, stroke_width=3)
    box.set_fill(WHITE, 0.9)
    s.move_to(box)
    n = T(name, 18, color=MUTED).next_to(box, DOWN, buff=0.12)
    return VGroup(box, s, n)


class MfeCh0Video(NarratedScene):
    def voiceover(self, text):
        return super().voiceover(say_fix(text))

    def construct(self):
        self.title_card(
            "Motion, Forces and Energy",
            "Chapter 0 · Units, Dimensions and Measurement",
            "Chapter zero. Units, dimensions and measurement.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ scene 1: a number is not a quantity
    def s1(self):
        hd = header("0.1 · Physical quantities and SI units")
        c = P(-3.4, -0.4)
        mars = Circle(radius=1.1, color=MARS, stroke_width=3).set_fill(MARS, 0.85).move_to(c)
        atmo = DashedVMobject(Circle(radius=1.55, color=ACCENT, stroke_width=3).move_to(c), num_dashes=36)
        atmo_l = T("atmosphere", 20, color=ACCENT).next_to(atmo, DOWN, buff=0.12)
        mars_l = T("Mars", 24, color=WHITE, weight="BOLD").move_to(c)

        def path(r_end):
            return ParametricFunction(
                lambda s: c + (2.7 + (r_end - 2.7) * s) * np.array(
                    [np.cos((70 - 170 * s) * DEGREES), np.sin((70 - 170 * s) * DEGREES), 0]),
                t_range=[0, 1], stroke_width=4)

        planned = DashedVMobject(path(2.4).set_color(GREEN), num_dashes=40)
        actual = path(1.3).set_color(PRIMARY)
        pl = T("planned", 22, color=GREEN).move_to(c + P(2.6, 2.0))
        al = T("actual", 22, color=PRIMARY).move_to(c + P(1.15, -2.15))
        probe = Dot(actual.get_start(), color=INK, radius=0.09)

        sent = M(r"\text{sent: } 12\ \text{lbf}\cdot\text{s}", 40, color=CMP_C).move_to(P(3.5, 1.6))
        read = M(r"\text{read as: } 12\ \text{N}\cdot\text{s}", 40, color=V_C).move_to(P(3.5, 0.6))

        with self.voiceover("In September nineteen ninety nine, NASA's Mars Climate Orbiter flew too low into the "
                            "Martian atmosphere and was destroyed. One team reported thruster impulse in pound-force "
                            "seconds. The navigation team read those numbers as newton seconds.") as vo:
            self.play(FadeIn(hd), FadeIn(mars), FadeIn(mars_l), Create(atmo), FadeIn(atmo_l), run_time=1.0)
            self.play(Create(planned), FadeIn(pl), run_time=1.0)
            self.play(FadeIn(probe), run_time=0.3)
            self.play(MoveAlongPath(probe, actual), Create(actual), run_time=3.0, rate_func=linear)
            self.play(Flash(probe, color=ACCENT, flash_radius=0.4), FadeIn(al), run_time=0.7)
            self.wait(vo.duration * 0.12)
            self.play(FadeIn(sent, shift=0.2 * UP), run_time=0.7)
            self.play(FadeIn(read, shift=0.2 * UP), run_time=0.7)

        fac = M(r"1\ \text{lbf} \approx 4.45\ \text{N}", 44).move_to(P(3.5, -0.6))
        off = T("every correction off by \u00d7 4.45", 26, color=WARN).move_to(P(3.5, -1.5))
        rule = M(r"\text{quantity} = \text{number} \times \text{unit}", 56, color=PRIMARY).move_to(P(0, 0.2))
        rbox = SurroundingRectangle(rule, buff=0.3, corner_radius=0.15, color=PRIMARY, stroke_width=3)
        with self.voiceover("One pound-force is about four point four five newtons, so every correction was off by "
                            "that factor. A number on its own is not a physical quantity. Every quantity is a "
                            "number times a unit.") as vo:
            self.play(Write(fac), run_time=1.0)
            self.play(FadeIn(off), run_time=0.6)
            self.wait(vo.duration * 0.2)
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.6)
            self.play(Write(rule), run_time=1.2)
            self.play(Create(rbox), run_time=0.5)

        names = [("kg", "mass"), ("m", "length"), ("s", "time"), ("A", "current"), ("K", "temperature"),
                 ("mol", "amount"), ("cd", "luminous int.")]
        chips = VGroup(*[chip(s, n, PRIMARY) for s, n in names]).arrange(RIGHT, buff=0.3).move_to(P(0, 1.3))
        fit(chips, 12.8)
        base_l = T("seven SI base units", 26, color=PRIMARY, weight="BOLD").next_to(chips, UP, buff=0.3)
        derived = VGroup(
            M(r"\text{N} = \text{kg}\cdot\text{m/s}^2", 38),
            M(r"\text{J} = \text{N}\cdot\text{m}", 38),
            M(r"\text{W} = \text{J/s}", 38),
            M(r"\text{Pa} = \text{N/m}^2", 38),
        ).arrange(RIGHT, buff=0.8).move_to(P(0, -1.6))
        fit(derived, 12.8)
        der_l = T("derived units, built from them", 24, color=MUTED).next_to(derived, DOWN, buff=0.35)
        with self.voiceover("SI picks seven base quantities, from mass, length and time to current and "
                            "temperature. Every other unit, the newton, the joule, the watt, the pascal, is built "
                            "from them.") as vo:
            self.play(FadeOut(rule), FadeOut(rbox), run_time=0.5)
            self.play(FadeIn(base_l), LaggedStart(*[FadeIn(ch, shift=0.15 * UP) for ch in chips], lag_ratio=0.25),
                      run_time=2.5)
            self.wait(vo.duration * 0.15)
            self.play(LaggedStart(*[Write(d) for d in derived], lag_ratio=0.35), FadeIn(der_l), run_time=2.4)

        # conversion: multiply by 1
        n72 = qty("72", "km", 44)
        f0 = frac(n72, qty("", "h", 44))
        f1 = frac(qty("1000", "m", 44), qty("1", "km", 44))
        f2 = frac(qty("1", "h", 44), qty("3600", "s", 44))
        x1 = M(r"\times", 44)
        x2 = M(r"\times", 44)
        eq = M(r"=", 44)
        ans = M(r"20\ \text{m/s}", 56, color=GREEN)
        row = VGroup(f0, x1, f1, x2, f2, eq, ans).arrange(RIGHT, buff=0.35).move_to(P(0, 0.9))
        one1 = M(r"=1", 30, color=HL).next_to(f1, DOWN, buff=0.25)
        one2 = M(r"=1", 30, color=HL).next_to(f2, DOWN, buff=0.25)
        km_top = f0[0][1]
        h_bot = f0[2][0]
        km_bot = f1[2][1]
        h_top = f2[0][1]
        with self.voiceover("Treat the unit as a real factor, and converting becomes multiplying by one. A thousand "
                            "metres over one kilometre is one. So is one hour over three thousand six hundred "
                            "seconds. Multiply, the old units cancel, and seventy two kilometres per hour becomes "
                            "twenty metres per second.") as vo:
            self.play(*[FadeOut(m) for m in (chips, base_l, derived, der_l)], run_time=0.5)
            self.play(Write(f0), run_time=0.8)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(x1), Write(f1), FadeIn(one1), run_time=1.2)
            self.play(FadeIn(x2), Write(f2), FadeIn(one2), run_time=1.2)
            self.wait(vo.duration * 0.1)
            self.play(Create(strike(km_top)), Create(strike(km_bot)), run_time=0.7)
            self.play(Create(strike(h_bot)), Create(strike(h_top)), run_time=0.7)
            self.play(FadeIn(eq), Write(ans), run_time=0.9)

        short = M(r"\text{km/h} \;\xrightarrow{\ \div\, 3.6\ }\; \text{m/s}", 50, color=PRIMARY).move_to(P(-3.4, -1.4))
        sbox = SurroundingRectangle(short, buff=0.2, corner_radius=0.12, color=PRIMARY, stroke_width=3)
        wrong = M(r"\div\,\tfrac{1000}{60}", 46, color=WARN).move_to(P(2.6, -1.4))
        wx = cross_mark().next_to(wrong, RIGHT, buff=0.25)
        wn = T("an hour is 3600 s, not 60", 22, color=WARN).next_to(VGroup(wrong, wx), DOWN, buff=0.2)
        gconv = M(r"g = 10\ \text{m/s}^2", 44, color=V_C)
        gnote = T("throughout this course, unless told otherwise", 22, color=MUTED)
        gcard = VGroup(gconv, gnote).arrange(RIGHT, buff=0.4).move_to(P(0, -3.2))
        with self.voiceover("Together the factors are one over three point six: to get metres per second, divide "
                            "by three point six. Not by a thousand over sixty: an hour is three thousand six hundred "
                            "seconds, not sixty. And for this whole course, g is ten metres per second squared, "
                            "unless a question says otherwise.") as vo:
            self.play(Write(short), Create(sbox), run_time=1.2)
            self.wait(vo.duration * 0.12)
            self.play(FadeIn(wrong), run_time=0.6)
            self.play(FadeIn(wx), FadeIn(wn), run_time=0.6)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(gcard, shift=0.2 * UP), run_time=0.8)

    # ------------------------------------------------------------ scene 2: dimensions
    def s2(self):
        hd = header("0.2 · Dimensions and dimensional formulae")
        speeds = VGroup(M(r"20\ \text{m/s}", 46), M(r"72\ \text{km/h}", 46), M(r"\approx 45\ \text{mph}", 46))
        speeds.arrange(RIGHT, buff=1.2).move_to(P(0, 1.9))
        dim = M(r"\frac{[\text{length}]}{[\text{time}]} = [LT^{-1}]", 56, color=PRIMARY).move_to(P(0, -0.6))
        arrows = VGroup(*[Arrow(s.get_bottom(), dim.get_top() + 0.1 * UP, buff=0.15, color=MUTED, stroke_width=3,
                                max_tip_length_to_length_ratio=0.12) for s in speeds])
        with self.voiceover("Twenty metres per second. Seventy two kilometres per hour. About forty five miles per "
                            "hour. The numbers change with the unit, but every one of them is a length divided by a "
                            "time. That unit free skeleton is the dimension: L T to the minus one.") as vo:
            self.play(FadeIn(hd), LaggedStart(*[FadeIn(s, shift=0.15 * UP) for s in speeds], lag_ratio=0.5),
                      run_time=2.4)
            self.wait(vo.duration * 0.25)
            self.play(LaggedStart(*[GrowArrow(a) for a in arrows], lag_ratio=0.2), run_time=1.0)
            self.play(Write(dim), run_time=1.3)

        rows = VGroup(
            M(r"[v] = \frac{[L]}{[T]} = [LT^{-1}]", 40),
            M(r"[a] = \frac{[v]}{[T]} = [LT^{-2}]", 40),
            M(r"[F] = [m][a] = [MLT^{-2}]", 40, color=PRIMARY),
            M(r"[W] = [F][s] = [ML^2T^{-2}]", 40),
            M(r"[P] = \frac{[W]}{[T]} = [ML^2T^{-3}]", 40),
        ).arrange(DOWN, buff=0.28, aligned_edge=LEFT).move_to(P(0, -0.1))
        lbl = T("start from a defining equation", 26, color=MUTED).move_to(P(0, 3.0))
        with self.voiceover("You never memorise a dimensional formula. Start from a defining equation. Velocity is "
                            "L T to the minus one. Acceleration divides by time again. Force is mass times "
                            "acceleration: M L T to the minus two. Work is force times distance, and power is work "
                            "per second.") as vo:
            self.play(FadeOut(speeds), FadeOut(arrows), FadeOut(dim), run_time=0.5)
            self.play(FadeIn(lbl), run_time=0.5)
            self.wait(vo.duration * 0.12)
            for i, r in enumerate(rows):
                self.play(FadeIn(r, shift=0.15 * UP), run_time=0.7)
                if i < 4:
                    self.wait(vo.duration * 0.1)

        g0 = M(r"F = \frac{G\,m_1m_2}{r^2}", 50).move_to(P(0, 2.2))
        g1 = M(r"G = \frac{F\,r^2}{m_1m_2}", 50).move_to(P(0, 0.8))
        g2 = M(r"[G] = \frac{[MLT^{-2}][L^2]}{[M][M]} = [M^{-1}L^3T^{-2}]", 50).move_to(P(0, -0.9))
        g2[0][-11:].set_color(GREEN)
        with self.voiceover("Newton's law of gravitation works the same way. Make G the subject: F r squared over "
                            "m one m two. Collect the powers, and G is M to the minus one, L cubed, T to the minus "
                            "two.") as vo:
            self.play(FadeOut(rows), FadeOut(lbl), run_time=0.5)
            self.play(Write(g0), run_time=1.0)
            self.wait(vo.duration * 0.1)
            self.play(TransformFromCopy(g0, g1), run_time=1.2)
            self.wait(vo.duration * 0.15)
            self.play(Write(g2), run_time=1.8)

        div = Line(P(0, 2.6), P(0, -0.4), color=GRID, stroke_width=3)
        wk = VGroup(T("work", 28, color=PRIMARY, weight="BOLD"), M(r"W = \vec F\cdot\vec s", 40),
                    M(r"[ML^2T^{-2}]", 40), M(r"\text{scalar, joule}", 34, color=MUTED)).arrange(DOWN, buff=0.22)
        tq = VGroup(T("torque", 28, color=V_C, weight="BOLD"), M(r"\vec\tau = \vec r\times\vec F", 40),
                    M(r"[ML^2T^{-2}]", 40), M(r"\text{vector, N}\cdot\text{m}", 34, color=MUTED)).arrange(DOWN, buff=0.22)
        wk.move_to(P(-3.3, 1.1))
        tq.move_to(P(3.3, 1.1))
        same = T("same dimensions, different quantities", 24, color=WARN).move_to(P(0, -0.85))
        O = P(-2.6, -3.4)
        r_line = Line(O, O + 2.2 * RIGHT, color=INK, stroke_width=3)
        r_line2 = Line(O, O + 2.2 * np.array([np.cos(40 * DEGREES), np.sin(40 * DEGREES), 0]), color=INK,
                       stroke_width=3)
        arc = Arc(radius=2.2, start_angle=0, angle=40 * DEGREES, arc_center=O, color=CMP_C, stroke_width=6)
        sl = M("s", 34, color=CMP_C).next_to(arc.point_from_proportion(0.5), RIGHT, buff=0.12)
        rl = M("r", 34).next_to(r_line, DOWN, buff=0.1)
        ang = M(r"\theta = \frac{s}{r}\ \ [M^0L^0T^0]\ \ \text{yet unit: radian}", 40).move_to(P(2.4, -2.9))
        with self.voiceover("Two warnings. Work and torque share the dimensions M L squared T to the minus two, yet "
                            "one is a scalar in joules and the other a vector in newton metres. And an angle is "
                            "dimensionless, arc over radius, but it still has a unit: the radian.") as vo:
            self.play(FadeOut(g0), FadeOut(g1), FadeOut(g2), run_time=0.5)
            self.play(FadeIn(wk), FadeIn(tq), Create(div), run_time=1.2)
            self.play(FadeIn(same), run_time=0.6)
            self.wait(vo.duration * 0.25)
            self.play(Create(r_line), Create(r_line2), Create(arc), FadeIn(sl), FadeIn(rl), run_time=1.0)
            self.play(Write(ang), run_time=1.3)

    # ------------------------------------------------------------ scene 3: dimensional analysis
    def s3(self):
        hd = header("0.3 · Dimensional analysis and its limits")
        rule = T("Only like dimensions add, subtract or equate.", 32, color=PRIMARY, weight="BOLD").move_to(P(0, 2.7))
        good = Ms(r"s", r"=", r"ut", r"+", r"\tfrac12 at^2", size=56).move_to(P(-3.2, 1.0))
        gl = VGroup(*[M(r"[L]", 32, color=GREEN).next_to(good[i], DOWN, buff=0.3) for i in (0, 2, 4)])
        gck = check().next_to(good, RIGHT, buff=0.4)
        bad = Ms(r"s", r"=", r"ut^2", r"+", r"\tfrac12 at", size=56).move_to(P(3.2, 1.0))
        bl = VGroup(M(r"[L]", 32, color=MUTED).next_to(bad[0], DOWN, buff=0.3),
                    M(r"[LT]", 32, color=WARN).next_to(bad[2], DOWN, buff=0.3))
        bx = cross_mark().next_to(bad, RIGHT, buff=0.3)
        with self.voiceover("The principle of homogeneity: you can only add, subtract or equate terms with the same "
                            "dimensions. Check s equals u t plus one half a t squared. Every term is a length, so it "
                            "passes. Misremember it as u t squared plus one half a t, and the first term is L T. One "
                            "line of checking kills the formula.") as vo:
            self.play(FadeIn(hd), FadeIn(rule), run_time=0.8)
            self.wait(vo.duration * 0.12)
            self.play(Write(good), run_time=1.0)
            self.play(LaggedStart(*[FadeIn(g) for g in gl], lag_ratio=0.3), run_time=1.2)
            self.play(FadeIn(gck), run_time=0.4)
            self.wait(vo.duration * 0.1)
            self.play(Write(bad), run_time=1.0)
            self.play(FadeIn(bl), run_time=0.8)
            self.play(FadeIn(bx), run_time=0.4)

        # pendulum
        piv = P(-4.6, 2.4)
        L = 3.2
        tt = ValueTracker(0)

        def bob_pos():
            a = 22 * DEGREES * np.cos(2 * PI * tt.get_value() / 1.8)
            return piv + L * np.array([np.sin(a), -np.cos(a), 0])

        ceiling = Line(piv + 0.8 * LEFT, piv + 0.8 * RIGHT, color=INK, stroke_width=4)
        string = always_redraw(lambda: Line(piv, bob_pos(), color=INK, stroke_width=3))
        bob = always_redraw(lambda: Circle(radius=0.28, color=INK, stroke_width=3).set_fill(PRIMARY, 1).move_to(bob_pos()))
        lab_l = M("l", 36).move_to(piv + P(-0.45, -1.6))
        lab_m = M("m", 32, color=PRIMARY).move_to(P(-4.6, -1.5))
        lab_g = M(r"g\downarrow", 36, color=V_C).move_to(P(-2.6, -0.3))
        e1 = M(r"T = k\, m^a\, l^b\, g^c", 50).move_to(P(2.4, 2.0))
        e2 = M(r"[T] = [M]^a\,[L]^b\,[LT^{-2}]^c", 44).move_to(P(2.4, 0.9))
        e3 = M(r"M:\ a = 0", 40, color=PRIMARY)
        e4 = M(r"T:\ 1 = -2c \Rightarrow c = -\tfrac12", 40)
        e5 = M(r"L:\ 0 = b + c \Rightarrow b = \tfrac12", 40)
        sol = VGroup(e3, e4, e5).arrange(DOWN, buff=0.25, aligned_edge=LEFT).move_to(P(2.4, -0.8))
        res = M(r"T = k\sqrt{l/g}", 60, color=GREEN).move_to(P(2.4, -2.7))
        rbox = SurroundingRectangle(res, buff=0.2, corner_radius=0.12, color=GREEN, stroke_width=3)
        with self.voiceover("Dimensions can also predict. Suppose a pendulum's period depends on the bob's mass, the "
                            "string's length and g. Write T equals k, times m to the a, l to the b, g to the c, and "
                            "match the powers of M, L and T on both sides.") as vo:
            self.play(*[FadeOut(m) for m in (rule, good, gl, gck, bad, bl, bx)], run_time=0.5)
            self.add(string, bob)
            self.play(Create(ceiling), FadeIn(string), FadeIn(bob), FadeIn(lab_l), run_time=0.8)
            self.play(tt.animate.set_value(1.8), FadeIn(lab_m), FadeIn(lab_g), run_time=1.8, rate_func=linear)
            self.play(Write(e1), tt.animate.set_value(3.6), run_time=1.8, rate_func=linear)
            self.play(Write(e2), tt.animate.set_value(5.4), run_time=1.8, rate_func=linear)
            tt.set_value(0)
        with self.voiceover("Mass appears nowhere else on the right, so a is zero: the period does not depend on the "
                            "bob at all. Time gives c equals minus one half, and length gives b equals one half. So "
                            "T is k times the square root of l over g.") as vo:
            self.play(FadeIn(e3), tt.animate.set_value(1.8), run_time=1.8, rate_func=linear)
            self.play(FadeIn(e4), tt.animate.set_value(3.6), run_time=1.8, rate_func=linear)
            self.play(FadeIn(e5), tt.animate.set_value(5.4), run_time=1.8, rate_func=linear)
            self.play(Write(res), Create(rbox), tt.animate.set_value(7.2), run_time=1.8, rate_func=linear)
        string.clear_updaters()
        bob.clear_updaters()

        lims = VGroup(
            T("cannot find constants: the 2\u03c0 in T = 2\u03c0\u221a(l/g)", 28),
            T("cannot build sums of terms", 28),
            T("fails inside sin, exp and log", 28),
            T("cannot tell work from torque", 28),
        ).arrange(DOWN, buff=0.3, aligned_edge=LEFT).move_to(P(0, 0.3))
        marks = VGroup(*[cross_mark().scale(0.6).next_to(l, LEFT, buff=0.3) for l in lims])
        trap = M(r"s = ut + at^2", 50).move_to(P(-2.4, -2.6))
        tn = T("dimensionally fine, physically wrong", 26, color=WARN).next_to(trap, RIGHT, buff=0.5)
        with self.voiceover("Now notice what it cannot do. It cannot find k, which is two pi. It cannot build sums of "
                            "terms, and it fails inside sines, exponentials and logs. And it can never prove a "
                            "formula right: s equals u t plus a t squared is dimensionally perfect, and wrong.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.6)
            for l, mk in zip(lims, marks):
                self.play(FadeIn(l, shift=0.1 * UP), FadeIn(mk), run_time=0.6)
                self.wait(vo.duration * 0.06)
            self.play(Write(trap), run_time=0.9)
            self.play(FadeIn(tn), run_time=0.6)

    # ------------------------------------------------------------ scene 4: significant figures
    def s4(self):
        hd = header("0.4 · Significant figures and rounding")
        ruler = Rectangle(width=6.2, height=0.7, color=INK, stroke_width=2).set_fill(ManimColor("#F6E7B8"), 1)
        ruler.move_to(P(-3.3, 1.2))
        ticks = VGroup()
        x0 = ruler.get_left()[0] + 0.2
        for i in range(0, 141):
            x = x0 + i * 0.042
            h = 0.3 if i % 10 == 0 else (0.2 if i % 5 == 0 else 0.11)
            ticks.add(Line(P(x, ruler.get_top()[1]), P(x, ruler.get_top()[1] - h), color=INK, stroke_width=1.2))
        nums = VGroup(*[T(str(k), 14).move_to(P(x0 + 10 * k * 0.042, ruler.get_top()[1] - 0.45)) for k in range(0, 15, 2)])
        pencil = VGroup(
            Rectangle(width=12.3 * 0.42 - 0.5, height=0.32, color=INK, stroke_width=2).set_fill(ACCENT, 1),
            Polygon(P(0, 0.16), P(0, -0.16), P(0.5, 0), color=INK, stroke_width=2).set_fill(WOOD, 1),
        )
        pencil[1].next_to(pencil[0], RIGHT, buff=0)
        pencil.next_to(ruler, UP, buff=0.08).align_to(P(x0, 0), LEFT)
        meas = M(r"12.3\ \text{cm}", 44).next_to(ruler, DOWN, buff=0.35)
        calc = RoundedRectangle(width=4.2, height=2.6, corner_radius=0.2, color=INK, stroke_width=3)
        calc.set_fill(ManimColor("#EDE3DC"), 1).move_to(P(3.8, 0.9))
        screen = Rectangle(width=3.6, height=0.9, color=INK, stroke_width=2).set_fill(WHITE, 1)
        screen.move_to(calc.get_top() + 0.75 * DOWN)
        disp = T("4.1000000", 40, font="Menlo").move_to(screen)
        keys = T("12.3 \u00f7 3 =", 28, color=MUTED).next_to(screen, DOWN, buff=0.4)
        claim = T("extra digits = a false claim", 28, color=WARN).move_to(P(3.8, -1.0))
        with self.voiceover("You measure a pencil with a millimetre ruler: twelve point three centimetres. Divide by "
                            "three, and the calculator says four point one zero zero zero zero zero zero. Nobody "
                            "measures a pencil that finely. Those extra digits are not accuracy. They are a false "
                            "claim.") as vo:
            self.play(FadeIn(hd), FadeIn(ruler), Create(ticks), FadeIn(nums), run_time=1.0)
            self.play(FadeIn(pencil, shift=0.2 * RIGHT), run_time=0.8)
            self.play(Write(meas), run_time=0.6)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(calc), FadeIn(screen), FadeIn(keys), run_time=0.6)
            self.play(AddTextLetterByLetter(disp), run_time=1.2)
            self.wait(vo.duration * 0.15)
            self.play(FadeIn(claim), Indicate(disp[3:], color=WARN), run_time=1.0)

        num = Ms(r"0.00", r"7030", size=80).move_to(P(0, 1.2))
        num[0].set_color(MUTED)
        num[1].set_color(PRIMARY)
        br = Brace(num[1], DOWN, color=PRIMARY)
        brl = T("4 significant figures", 28, color=PRIMARY).next_to(br, DOWN, buff=0.15)
        lead = T("leading zeros never count", 24, color=MUTED).next_to(num[0], UP, buff=0.4)
        trail = T("the trailing zero after the point does count", 24, color=GREEN).next_to(brl, DOWN, buff=0.35)
        with self.voiceover("Significant figures are the reliable digits, plus the first uncertain one. Leading "
                            "zeros never count. So zero point zero zero seven zero three zero has four: seven, zero, "
                            "three, and the trailing zero, which says you measured that finely.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(Write(num), run_time=1.0)
            self.wait(vo.duration * 0.25)
            self.play(FadeIn(lead), run_time=0.6)
            self.wait(vo.duration * 0.15)
            self.play(GrowFromCenter(br), FadeIn(brl), run_time=0.8)
            self.play(FadeIn(trail), run_time=0.6)

        r1h = T("multiply or divide: fewest significant figures", 28, color=PRIMARY, weight="BOLD")
        r1 = M(r"\frac{5.74\ \text{g}}{1.2\ \text{cm}^3} = 4.78\ldots \;\to\; 4.8\ \text{g/cm}^3", 46)
        r2h = T("add or subtract: fewest decimal places", 28, color=V_C, weight="BOLD")
        r2 = M(r"2.5 + 0.412 + 11.03 = 13.942 \;\to\; 13.9", 46)
        grp = VGroup(r1h, r1, r2h, r2).arrange(DOWN, buff=0.35).move_to(P(0, 0.1))
        r2h.shift(0.3 * DOWN)
        r2.shift(0.3 * DOWN)
        with self.voiceover("Multiplying or dividing, keep the fewest significant figures: five point seven four over "
                            "one point two gives four point eight, not four point seven eight three. Adding or subtracting, keep the fewest decimal places: two "
                            "point five, plus zero point four one two, plus eleven point zero three, is thirteen point "
                            "nine.") as vo:
            self.play(*[FadeOut(m) for m in (num, br, brl, lead, trail)], run_time=0.5)
            self.play(FadeIn(r1h), run_time=0.6)
            self.wait(vo.duration * 0.08)
            self.play(Write(r1), run_time=1.6)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(r2h), run_time=0.6)
            self.wait(vo.duration * 0.05)
            self.play(Write(r2), run_time=1.6)

    # ------------------------------------------------------------ scene 5: errors
    def s5(self):
        hd = header("0.5 · Errors in measurement")
        nl = NumberLine(x_range=[2.3, 2.9, 0.1], length=10, color=INK, include_numbers=True,
                        decimal_number_config={"num_decimal_places": 1, "color": INK}, font_size=28)
        nl.move_to(P(0, 0.4))
        unit = M(r"T\ (\text{s})", 30, color=MUTED).next_to(nl, RIGHT, buff=0.2)
        reads = [2.63, 2.56, 2.42, 2.71, 2.80]
        mean = 2.624
        dots = VGroup(*[Dot(nl.n2p(r) + 0.35 * UP, color=V_C, radius=0.11) for r in reads])
        rlab = M(r"2.63,\ 2.56,\ 2.42,\ 2.71,\ 2.80", 38, color=V_C).move_to(P(0, 2.7))
        mline = DashedLine(nl.n2p(mean) + 1.0 * UP, nl.n2p(mean) + 0.2 * DOWN, color=PRIMARY, stroke_width=3)
        mlab = M(r"\bar T = 2.62", 34, color=PRIMARY).next_to(mline, UP, buff=0.1)
        devs = VGroup(*[Line(nl.n2p(r) + 0.35 * UP, nl.n2p(mean) + 0.35 * UP, color=CMP_C, stroke_width=6)
                        for r in reads])
        res = M(r"T = 2.62 \pm 0.11\ \text{s}\quad(\approx 4\%)", 48).move_to(P(0, -1.6))
        res_n = T("mean absolute error = average distance from the mean", 24, color=CMP_C).next_to(res, DOWN, buff=0.3)
        with self.voiceover("Time a pendulum five times and you get five different periods. The mean is two point "
                            "six two seconds, and the mean absolute error, the average distance from the mean, is "
                            "zero point one one. So T is two point six two, plus or minus zero "
                            "point one one seconds: about four percent.") as vo:
            self.play(FadeIn(hd), Create(nl), FadeIn(unit), run_time=1.0)
            self.play(FadeIn(rlab), LaggedStart(*[FadeIn(d, scale=0.5) for d in dots], lag_ratio=0.3), run_time=1.8)
            self.wait(vo.duration * 0.1)
            self.play(Create(mline), FadeIn(mlab), run_time=0.8)
            self.wait(vo.duration * 0.1)
            self.play(LaggedStart(*[Create(d) for d in devs], lag_ratio=0.2), run_time=1.2)
            self.play(Write(res), run_time=1.0)
            self.play(FadeIn(res_n), run_time=0.6)

        h1 = T("sum or difference: absolute errors add", 30, color=PRIMARY, weight="BOLD").move_to(P(0, 2.6))
        d1 = M(r"(20.0 \pm 0.5) - (10.0 \pm 0.3) = 10.0 \pm 0.8", 50).move_to(P(0, 1.4))
        d1n = T("values subtract; errors never cancel", 26, color=MUTED).next_to(d1, DOWN, buff=0.3)
        with self.voiceover("Errors spread through every calculation. In a sum or a difference, absolute errors add. "
                            "Twenty plus or minus zero point five, minus ten plus or minus zero point three, is ten "
                            "plus or minus zero point eight. Values subtract. Errors never cancel.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(FadeIn(h1), run_time=0.6)
            self.wait(vo.duration * 0.15)
            self.play(Write(d1), run_time=2.0)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(d1n), run_time=0.6)

        h2 = T("product, quotient, power: relative errors add, times the power", 28, color=V_C, weight="BOLD")
        fit(h2, 12.6).move_to(P(0, 2.6))
        g = M(r"g = \frac{4\pi^2 l}{T^2}", 46).move_to(P(-4.3, 1.0))
        gg = M(r"\frac{\Delta g}{g} = \frac{\Delta l}{l} + 2\,\frac{\Delta T}{T}", 46).next_to(g, DOWN, buff=0.3)
        # bars for the contributions
        base = P(0.6, 1.1)
        bl = Rectangle(width=0.2 * 2.5, height=0.45, color=CMP_C, stroke_width=0).set_fill(CMP_C, 1)
        bt = Rectangle(width=1.0 * 2.5, height=0.45, color=PRIMARY, stroke_width=0).set_fill(PRIMARY, 1)
        bl.move_to(base, aligned_edge=LEFT)
        bt.move_to(base + 0.75 * DOWN, aligned_edge=LEFT)
        bl_l = M(r"l:\ 0.2\%", 34, color=CMP_C).next_to(bl, LEFT, buff=0.25)
        bt_l = M(r"T:\ 2\times 0.5\% = 1.0\%", 34, color=PRIMARY).next_to(bt, RIGHT, buff=0.25)
        bl_l.align_to(bt.get_left() + 0.25 * LEFT, RIGHT)
        tot = M(r"\frac{\Delta g}{g} = 1.2\%", 50, color=GREEN).move_to(P(0, -1.9))
        tip = T("so time 20 swings, not 1", 26, color=MUTED).next_to(tot, DOWN, buff=0.35)
        with self.voiceover("In a product or a quotient, relative errors add, and a power multiplies its relative "
                            "error. For g equals four pi squared l over T squared: zero point two percent from l, "
                            "plus twice zero point five percent from T, gives one point two percent. Timing is the "
                            "weak spot, so time twenty swings instead of one.") as vo:
            self.play(FadeOut(h1), FadeOut(d1), FadeOut(d1n), run_time=0.4)
            self.play(FadeIn(h2), run_time=0.5)
            self.play(Write(g), run_time=0.8)
            self.play(Write(gg), run_time=1.2)
            self.wait(vo.duration * 0.1)
            self.play(GrowFromEdge(bl, LEFT), FadeIn(bl_l), run_time=0.8)
            self.play(GrowFromEdge(bt, LEFT), FadeIn(bt_l), run_time=0.8)
            self.play(Write(tot), run_time=0.8)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(tip), run_time=0.6)

        # screw gauge
        sh = T("instruments: read, then remove the zero error", 30, color=PRIMARY, weight="BOLD").move_to(P(0, 2.7))
        s1 = M(r"\text{least count} = \frac{\text{pitch}}{\text{divisions}} = \frac{0.5\ \text{mm}}{50} = 0.01\ \text{mm}",
               42)
        s2 = M(r"\text{reading} = 2.5 + 34 \times 0.01 = 2.84\ \text{mm}", 42)
        s3 = M(r"\text{corrected} = 2.84 - (+0.04) = 2.80\ \text{mm}", 42, color=GREEN)
        sg = VGroup(s1, s2, s3).arrange(DOWN, buff=0.4, aligned_edge=LEFT).move_to(P(0, 0.4))
        fit(sg, 12.6)
        sn = T("zero error = what it reads with nothing in it (keep its sign)", 24, color=MUTED).move_to(P(0, -2.0))
        with self.voiceover("Instruments add one more step. A vernier or a screw gauge reads the main scale, plus the "
                            "coinciding division times the least count. If it already reads something with nothing "
                            "between its jaws, that zero error, with its sign, comes off every reading.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(FadeIn(sh), run_time=0.6)
            self.play(Write(s1), run_time=1.4)
            self.play(Write(s2), run_time=1.3)
            self.wait(vo.duration * 0.1)
            self.play(Write(s3), run_time=1.3)
            self.play(FadeIn(sn), run_time=0.6)

    # ------------------------------------------------------------ scene 6: vectors for physics
    def s6(self):
        hd = header("0.6 · Vectors for physics")
        crate = Square(side_length=1.1, color=INK, stroke_width=3).set_fill(WOOD, 1).move_to(P(-3.0, 0.0))
        cc = crate.get_center()
        k = 0.55  # units per newton
        A = 3 * k
        Bm = 4 * k
        th = ValueTracker(0.0)

        def btip():
            a = th.get_value() * DEGREES
            return cc + Bm * np.array([np.cos(a), np.sin(a), 0])

        fa = always_redraw(lambda: vec(cc, cc + A * RIGHT, F_C))
        fb = always_redraw(lambda: vec(cc, btip(), V_C))
        la = M(r"3\ \text{N}", 32, color=F_C)
        lb = M(r"4\ \text{N}", 32, color=V_C)
        la.add_updater(lambda m: m.move_to(cc + A * RIGHT + P(0.15, -0.35)))
        lb.add_updater(lambda m: m.move_to(btip() + 0.35 * np.array([np.cos(th.get_value() * DEGREES),
                                                                      np.sin(th.get_value() * DEGREES), 0]) + 0.3 * UP))
        rlab = M(r"\text{resultant} =", 42).move_to(P(2.3, 1.4))
        rval = DecimalNumber(7.0, num_decimal_places=1, font_size=42, color=ALT_C, unit=r"\text{N}",
                             unit_buff_per_font_unit=0.003)
        rval.add_updater(lambda m: m.set_value(np.sqrt(9 + 16 + 24 * np.cos(th.get_value() * DEGREES)))
                         .next_to(rlab, RIGHT, buff=0.2))
        cases = VGroup(M(r"\text{same way: } 7", 36), M(r"\text{opposite: } 1", 36), M(r"\text{right angle: } 5", 36))
        cases.arrange(DOWN, buff=0.3, aligned_edge=LEFT).move_to(P(3.0, -0.4))
        moves = T("three moves: add, resolve, subtract", 30, color=PRIMARY, weight="BOLD").move_to(P(0, -3.0))
        with self.voiceover("Two people pull a crate, with three newtons and four newtons. Same direction: seven. "
                            "Opposite: one. At right angles: five. Direction matters, so force is a vector, and "
                            "mechanics needs just three vector moves: add, resolve and subtract.") as vo:
            self.add(fa, fb)
            self.play(FadeIn(hd), FadeIn(crate), FadeIn(fa), FadeIn(fb), FadeIn(la), FadeIn(lb), run_time=0.9)
            self.play(FadeIn(rlab), FadeIn(rval), run_time=0.5)
            self.play(FadeIn(cases[0]), run_time=0.5)
            self.play(th.animate.set_value(180), run_time=1.5)
            self.play(FadeIn(cases[1]), run_time=0.4)
            self.play(th.animate.set_value(90), run_time=1.2)
            self.play(FadeIn(cases[2]), run_time=0.4)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(moves), run_time=0.7)
        for m in (fa, fb, la, lb, rval):
            m.clear_updaters()

        # parallelogram law
        O = P(-3.4, -2.6)
        s = 0.7
        av = 3 * s * RIGHT
        t2 = ValueTracker(60.0)

        def bv():
            a = t2.get_value() * DEGREES
            return 4 * s * np.array([np.cos(a), np.sin(a), 0])

        pa = vec(O, O + av, F_C)
        pb = always_redraw(lambda: vec(O, O + bv(), V_C))
        side1 = always_redraw(lambda: DashedLine(O + av, O + av + bv(), color=MUTED, stroke_width=2))
        side2 = always_redraw(lambda: DashedLine(O + bv(), O + av + bv(), color=MUTED, stroke_width=2))
        pr = always_redraw(lambda: vec(O, O + av + bv(), ALT_C, sw=7))
        arc = always_redraw(lambda: Arc(radius=0.5, start_angle=0, angle=t2.get_value() * DEGREES, arc_center=O,
                                        color=INK, stroke_width=3))
        pla = M(r"\vec A", 34, color=F_C).next_to(O + av, DOWN, buff=0.15)
        plb = always_redraw(lambda: M(r"\vec B", 34, color=V_C).move_to(O + bv() * 0.5 + 0.35 * np.array(
            [-np.sin(t2.get_value() * DEGREES), np.cos(t2.get_value() * DEGREES), 0])))
        law = M(r"R^2 = A^2 + B^2 + 2AB\cos\theta", 46).move_to(P(3.6, 2.4))
        thl = M(r"\theta =", 40).move_to(P(2.0, 1.2))
        thv = DecimalNumber(60, num_decimal_places=0, unit=r"^{\circ}", font_size=40, color=INK)
        thv.add_updater(lambda m: m.set_value(t2.get_value()).next_to(thl, RIGHT, buff=0.15))
        rl2 = M(r"R =", 40, color=ALT_C).move_to(P(4.4, 1.2))
        rv2 = DecimalNumber(6.08, num_decimal_places=2, font_size=40, color=ALT_C, unit=r"\text{N}",
                            unit_buff_per_font_unit=0.003)
        rv2.add_updater(lambda m: m.set_value(np.sqrt(25 + 24 * np.cos(t2.get_value() * DEGREES)))
                        .next_to(rl2, RIGHT, buff=0.15))
        ex = fit(M(r"\theta = 60^\circ:\ R = \sqrt{9 + 16 + 12} = \sqrt{37} \approx 6.1\ \text{N}", 36), 5.8).move_to(P(3.9, 0.0))
        note = fit(T("past 90\u00b0, R can be smaller than either force", 26, color=WARN), 5.8).move_to(P(3.9, -1.2))
        with self.voiceover("Add with a parallelogram. The resultant squared is A squared plus B squared plus two A B "
                            "cos theta. At sixty degrees, three and four newtons give root thirty seven, about six "
                            "point one newtons. Swing past ninety degrees, and the resultant can be shorter than "
                            "either force.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.add(pb, side1, side2, pr, arc, plb)
            self.play(GrowArrow(pa), FadeIn(pb), FadeIn(pla), FadeIn(plb), FadeIn(arc), run_time=1.0)
            self.play(Create(side1), Create(side2), run_time=0.6)
            self.play(GrowArrow(pr), Write(law), run_time=1.2)
            self.play(FadeIn(thl), FadeIn(thv), FadeIn(rl2), FadeIn(rv2), run_time=0.5)
            self.play(Write(ex), run_time=1.4)
            self.wait(vo.duration * 0.1)
            self.play(t2.animate.set_value(150), run_time=2.5)
            self.play(FadeIn(note), run_time=0.6)
        for m in (pb, side1, side2, pr, arc, plb, thv, rv2):
            m.clear_updaters()

        # resolving + incline
        Oq = P(-5.6, -1.6)
        Fv = 3.0 * np.array([np.cos(35 * DEGREES), np.sin(35 * DEGREES), 0])
        Fa = vec(Oq, Oq + Fv, F_C)
        Fx = vec(Oq, Oq + Fv[0] * RIGHT, CMP_C)
        Fy = DashedLine(Oq + Fv[0] * RIGHT, Oq + Fv, color=CMP_C, stroke_width=4)
        Fl = M("F", 36, color=F_C).next_to(Oq + Fv, UP, buff=0.1)
        Fxl = M(r"F\cos\theta", 32, color=CMP_C).next_to(Fx, DOWN, buff=0.15)
        Fyl = M(r"F\sin\theta", 32, color=CMP_C).next_to(Fy, RIGHT, buff=0.12)
        tharc = Arc(radius=0.6, start_angle=0, angle=35 * DEGREES, arc_center=Oq, color=INK, stroke_width=3)
        thq = M(r"\theta", 30).move_to(Oq + 0.85 * np.array([np.cos(17 * DEGREES), np.sin(17 * DEGREES), 0]))
        # incline
        ang = 30 * DEGREES
        A0 = P(0.4, -2.8)
        base_len = 5.6
        A1 = A0 + base_len * RIGHT
        A2 = A0 + base_len * RIGHT + base_len * np.tan(ang) * UP
        A2 = A0 + P(base_len, 0) + P(0, base_len * np.tan(ang))
        wedge = Polygon(A0, A1, A2, color=INK, stroke_width=3).set_fill(ManimColor("#EADFD8"), 1)
        u = np.array([np.cos(ang), np.sin(ang), 0])  # up the slope
        n = np.array([-np.sin(ang), np.cos(ang), 0])  # out of the slope
        bc = A0 + 3.4 * u + 0.45 * n
        blk = Square(side_length=0.9, color=INK, stroke_width=3).set_fill(WOOD, 1).rotate(ang).move_to(bc)
        W = 2.2
        mg = vec(bc, bc + W * DOWN, F_C)
        mgl = M("mg", 34, color=F_C).next_to(bc + W * DOWN, DOWN, buff=0.1)
        along = vec(bc, bc - W * np.sin(ang) * u, CMP_C)
        perp = vec(bc, bc - W * np.cos(ang) * n, ALT_C)
        al = M(r"mg\sin\theta", 32, color=CMP_C).next_to(bc - W * np.sin(ang) * u, UL, buff=0.08)
        pl = M(r"mg\cos\theta", 32, color=ALT_C).next_to(bc - W * np.cos(ang) * n, RIGHT, buff=0.15)
        iarc = Arc(radius=0.8, start_angle=0, angle=ang, arc_center=A0, color=INK, stroke_width=3)
        il = M(r"\theta", 30).move_to(A0 + 1.1 * np.array([np.cos(ang / 2), np.sin(ang / 2), 0]))
        prev = T("axes along and across the slope (Chapter 3)", 24, color=MUTED).move_to(P(3.2, 2.9))
        with self.voiceover("Resolve by running addition backwards. A force F at angle theta has components F cos "
                            "theta and F sin theta. On an incline, choose axes along and across the slope: the weight "
                            "splits into m g sin theta down the slope, and m g cos theta into it.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(GrowArrow(Fa), FadeIn(Fl), Create(tharc), FadeIn(thq), run_time=0.9)
            self.play(GrowArrow(Fx), FadeIn(Fxl), run_time=0.7)
            self.play(Create(Fy), FadeIn(Fyl), run_time=0.7)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(wedge), FadeIn(blk), Create(iarc), FadeIn(il), FadeIn(prev), run_time=0.9)
            self.play(GrowArrow(mg), FadeIn(mgl), run_time=0.7)
            self.play(GrowArrow(along), FadeIn(al), run_time=0.8)
            self.play(GrowArrow(perp), FadeIn(pl), run_time=0.8)

        Og = P(-4.5, -2.4)
        rA = P(3.2, 2.6)
        rB = P(4.6, 0.4)
        oa = vec(Og, Og + rA, F_C)
        ob = vec(Og, Og + rB, V_C)
        ab = vec(Og + rB, Og + rA, ALT_C, sw=7)
        odot = Dot(Og, color=INK)
        ol = M("O", 32).next_to(Og, DL, buff=0.1)
        la_ = M(r"\vec r_A", 36, color=F_C).next_to(oa.get_center(), LEFT, buff=0.2)
        lb_ = M(r"\vec r_B", 36, color=V_C).next_to(ob.get_center(), DOWN, buff=0.2)
        lab_ = M(r"\vec r_{AB}", 36, color=ALT_C).next_to(ab.get_center(), RIGHT, buff=0.2)
        An = M("A", 32).next_to(Og + rA, UP, buff=0.1)
        Bn = M("B", 32).next_to(Og + rB, RIGHT, buff=0.1)
        rel = M(r"\vec r_{AB} = \vec r_A - \vec r_B", 54, color=ALT_C).move_to(P(3.4, 1.4))
        reln = T("A as seen from B", 26, color=MUTED).next_to(rel, DOWN, buff=0.25)
        nxt = M(r"\frac{d}{dt}:\ \ \vec v_{AB} = \vec v_A - \vec v_B", 44).move_to(P(3.4, -1.0))
        nxtn = T("relative velocity, Chapter 2", 24, color=MUTED).next_to(nxt, DOWN, buff=0.25)
        with self.voiceover("Subtract to change your viewpoint. The position of A as seen from B is r A minus r B: "
                            "the arrow from B to A. Differentiate it, and you get relative velocity, the key to "
                            "chapter two.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(FadeIn(odot), FadeIn(ol), GrowArrow(oa), GrowArrow(ob), FadeIn(la_), FadeIn(lb_), FadeIn(An),
                      FadeIn(Bn), run_time=1.0)
            self.wait(vo.duration * 0.15)
            self.play(GrowArrow(ab), FadeIn(lab_), run_time=0.9)
            self.play(Write(rel), FadeIn(reln), run_time=1.2)
            self.wait(vo.duration * 0.1)
            self.play(Write(nxt), FadeIn(nxtn), run_time=1.2)

    # ------------------------------------------------------------ scene 7: recap
    def s7(self):
        title = T("Chapter 0 in five lines", 38, color=PRIMARY, weight="BOLD").move_to(P(0, 3.2))
        lines = [
            (r"72\ \text{km/h} \div 3.6 = 20\ \text{m/s}", "number \u00d7 unit; multiply by 1"),
            (r"[F] = [MLT^{-2}]", "dimensions from defining equations"),
            (r"T = k\sqrt{l/g}", "checks and predicts, never finds k"),
            (r"\tfrac{\Delta g}{g} = \tfrac{\Delta l}{l} + 2\tfrac{\Delta T}{T}", "errors add, times the power"),
            (r"R^2 = A^2 + B^2 + 2AB\cos\theta", "add, resolve, subtract"),
        ]
        rows = VGroup()
        for i, (tex, note) in enumerate(lines):
            m = M(tex, 38)
            nt = T(note, 22, color=MUTED)
            num = T(f"{i + 1}.", 28, color=PRIMARY, weight="BOLD")
            rows.add(VGroup(num, m, nt))
        for r in rows:
            r[0].move_to(P(-6.2, 0))
            r[1].next_to(r[0], RIGHT, buff=0.3)
        rows.arrange(DOWN, buff=0.42, aligned_edge=LEFT).move_to(P(0, -0.1))
        for r in rows:
            r[0].set_x(-6.2)
            r[1].next_to(r[0], RIGHT, buff=0.3)
            r[2].move_to(P(0, r[1].get_y()), aligned_edge=LEFT).set_x(0.9, direction=LEFT)
        with self.voiceover("To recap. Every quantity is a number times a unit, and you convert by multiplying by "
                            "one. Dimensions come from defining equations, and only like dimensions add.") as vo:
            self.play(FadeIn(title), run_time=0.6)
            self.play(FadeIn(rows[0], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.25)
            self.play(FadeIn(rows[1], shift=0.15 * UP), run_time=0.7)
        with self.voiceover("Dimensional analysis checks and predicts, but never finds constants. In sums, absolute "
                            "errors add. In products and powers, relative errors add, times the power. And vectors "
                            "add, resolve and subtract.") as vo:
            self.play(FadeIn(rows[2], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.25)
            self.play(FadeIn(rows[3], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(rows[4], shift=0.15 * UP), run_time=0.7)
        with self.voiceover("Try the mastery quiz. Then chapter one puts a particle on a straight track, and asks how "
                            "its position, velocity and acceleration change with time.") as vo:
            nxt = T("Next: Chapter 1 · Motion in a Straight Line", 32, color=PRIMARY).move_to(P(0, -3.4))
            self.wait(vo.duration * 0.3)
            self.play(FadeIn(nxt, shift=0.2 * UP), run_time=0.8)
