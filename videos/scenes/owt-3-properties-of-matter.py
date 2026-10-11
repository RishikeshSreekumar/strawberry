import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

# Chapter colour roles (light background).
F_C = PRIMARY  # forces, loads = strawberry red
FL_C = SECONDARY  # fluids, buoyancy = teal
EN_C = ACCENT  # energy, cross-sections, pressure highlights = amber
GEO_C = PURPLE  # deformation (delta L), shear, geometry
WATER = ManimColor("#CFE6EA")
MERC = ManimColor("#C9C2BF")
BLOCK = ManimColor("#F3D9C9")
HL = ManimColor("#D19A00")  # highlight gold
WARN = PRIMARY


def T(s, size=30, **kw):
    return Text(s, font_size=size, **kw)


def M(s, size=40, **kw):
    return MathTex(s, font_size=size, **kw)


def fit(mob, w):
    if mob.width > w:
        mob.scale_to_fit_width(w)
    return mob


def vec(start, end, color, sw=6):
    return Arrow(start, end, buff=0, color=color, stroke_width=sw,
                 max_tip_length_to_length_ratio=0.25, max_stroke_width_to_length_ratio=12)


def check():
    return MathTex(r"\checkmark", color=GREEN, font_size=56)


def cross_mark():
    return MathTex(r"\times", color=WARN, font_size=64)


def P(x, y):
    return np.array([x, y, 0.0])


def boxed(mob, color=PRIMARY):
    return SurroundingRectangle(mob, buff=0.22, corner_radius=0.12, color=color, stroke_width=3)


def water_rect(x0, x1, y0, y1, color=WATER):
    r = Polygon(P(x0, y0), P(x1, y0), P(x1, y1), P(x0, y1), stroke_width=0)
    r.set_fill(color, 1)
    return r


def column_under(men, x, half, y0, color=WATER):
    """Liquid filling a tube from y0 up to the meniscus curve."""
    top = [men.point_from_proportion(t) for t in np.linspace(0, 1, 24)]
    poly = Polygon(P(x - half + 0.02, y0), *top, P(x + half - 0.02, y0), stroke_width=0)
    poly.set_fill(color, 1)
    return poly


def tank(x0, x1, y0, y1):
    """Open-topped container outline (left wall, floor, right wall)."""
    return VMobject(color=INK, stroke_width=4).set_points_as_corners(
        [P(x0, y1), P(x0, y0), P(x1, y0), P(x1, y1)])


class OwtCh3Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Oscillations, Waves & Thermal Physics",
            "Chapter 3 · Properties of Matter",
            "Chapter three. Properties of matter.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ scene 1: stress and strain
    def s1(self):
        ceil = Line(P(-6.2, 3.0), P(6.2, 3.0), color=MUTED, stroke_width=6)
        wire = Line(P(-3.2, 3.0), P(-3.2, 0.2), color=INK, stroke_width=2)
        adult = RoundedRectangle(width=1.6, height=1.0, corner_radius=0.12, color=INK, stroke_width=3)
        adult.set_fill(BLOCK, 1).move_to(P(-3.2, -0.3))
        adult_t = T("75 kg", 26).move_to(adult)
        lab1 = T("steel wire, 2 mm", 26, color=INK).move_to(P(-3.2, -3.3))
        band = Line(P(3.2, 3.0), P(3.2, 0.2), color=ACCENT, stroke_width=7)
        book = RoundedRectangle(width=1.6, height=0.6, corner_radius=0.08, color=INK, stroke_width=3)
        book.set_fill(ManimColor("#D9E7EC"), 1).move_to(P(3.2, -0.1))
        book_t = T("book", 24).move_to(book)
        lab2 = T("rubber band, 2 mm", 26, color=INK).move_to(P(3.2, -3.3))
        stub_top = Line(P(3.2, 3.0), P(3.2, 1.9), color=ACCENT, stroke_width=7)
        stub_bot = Line(P(3.2, 0.9), P(3.2, 0.2), color=ACCENT, stroke_width=7)

        with self.voiceover("A steel wire two millimetres thick can hold up an adult. A rubber band as thick "
                            "tears under a book. To compare them, the size of the force is the wrong thing to "
                            "look at.") as vo:
            self.play(Create(ceil), run_time=0.6)
            self.play(Create(wire), FadeIn(adult), FadeIn(adult_t), FadeIn(lab1), run_time=1.0)
            self.play(Create(band), FadeIn(book), FadeIn(book_t), FadeIn(lab2), run_time=1.0)
            self.wait(vo.duration * 0.15)
            self.play(ReplacementTransform(band, VGroup(stub_top, stub_bot)), run_time=0.4)
            fall = VGroup(book, book_t, stub_bot)
            self.play(fall.animate.shift(1.5 * DOWN).rotate(-0.25), run_time=0.8, rate_func=rush_into)
            x = cross_mark().scale(0.7).next_to(stub_top, RIGHT, buff=0.3)
            c = check().scale(0.8).next_to(adult, RIGHT, buff=0.3)
            self.play(FadeIn(x), FadeIn(c), run_time=0.5)

        self.clear_scene(0.5)
        rect = Rectangle(width=0.6, height=4.0, color=INK, stroke_width=3).set_fill(ManimColor("#DDD6D3"), 1)
        rect.move_to(P(-4.5, 0.3))
        top = Ellipse(width=0.6, height=0.22, color=INK, stroke_width=2).set_fill(EN_C, 1).move_to(rect.get_top())
        al = M("A", 36, color=EN_C).next_to(top, RIGHT, buff=0.2)
        F = vec(P(-4.5, -1.7), P(-4.5, -3.2), F_C)
        Fl = M("F", 38, color=F_C).next_to(F, RIGHT, buff=0.15)
        br = Brace(rect, LEFT, color=MUTED)
        brl = M("L", 36).next_to(br, LEFT, buff=0.1)
        s_eq = M(r"\sigma = \frac{F}{A}", 64).move_to(P(1.8, 1.9))
        s_n = T("stress, in pascals (N/m²)", 26, color=MUTED).next_to(s_eq, DOWN, buff=0.25)
        e_eq = M(r"\text{strain} = \frac{\Delta L}{L}", 60).move_to(P(1.8, -0.6))
        e_n = T("a fraction: no unit", 26, color=MUTED).next_to(e_eq, DOWN, buff=0.25)
        with self.voiceover("What the material feels is force shared over area: stress, sigma equals F over "
                            "A, in pascals. Deformation is a fraction too. Strain is the change in length "
                            "over the length, so it has no unit.") as vo:
            self.play(FadeIn(rect), FadeIn(top), FadeIn(al), run_time=0.8)
            self.play(GrowArrow(F), FadeIn(Fl), run_time=0.7)
            self.play(Write(s_eq), FadeIn(s_n), run_time=1.2)
            self.wait(vo.duration * 0.15)
            ext = Rectangle(width=0.6, height=0.45, color=GEO_C, stroke_width=3).set_fill(GEO_C, 0.35)
            ext.next_to(rect, DOWN, buff=0)
            el = M(r"\Delta L", 34, color=GEO_C).next_to(ext, LEFT, buff=0.2)
            self.play(Create(br), FadeIn(brl), run_time=0.6)
            self.play(GrowFromEdge(ext, UP), F.animate.shift(0.45 * DOWN), Fl.animate.shift(0.45 * DOWN),
                      FadeIn(el), run_time=0.9)
            self.play(Write(e_eq), FadeIn(e_n), run_time=1.2)

        self.clear_scene(0.5)
        c1 = Circle(radius=0.45, color=INK, stroke_width=3).set_fill(EN_C, 0.6).move_to(P(-5.0, 0.6))
        c2 = Circle(radius=0.9, color=INK, stroke_width=3).set_fill(EN_C, 0.25).move_to(P(-2.6, 0.6))
        c2l = M(r"r = 2\ \text{mm}", 30).next_to(c2, DOWN, buff=0.3)
        c1l = M(r"r = 1\ \text{mm}", 30).move_to(P(-5.0, c2l.get_y()))
        c1s = M(r"100\ \text{MPa}", 32, color=F_C).next_to(c1l, DOWN, buff=0.25)
        c2s = M(r"25\ \text{MPa}", 32, color=GREEN).next_to(c2l, DOWN, buff=0.25)
        ex = VGroup(
            M(r"F = mg = 31.4 \times 10 = 314\ \text{N}", 38),
            M(r"A = \pi r^2 = 3.14\times10^{-6}\ \text{m}^2", 38),
            M(r"\sigma = \frac{F}{A} = 10^{8}\ \text{Pa} = 100\ \text{MPa}", 40, color=F_C),
        ).arrange(DOWN, buff=0.4, aligned_edge=LEFT).move_to(P(2.9, 1.0))
        fit(ex, 7.0)
        ex2 = M(r"r \times 2 \;\Rightarrow\; A \times 4 \;\Rightarrow\; \sigma = 25\ \text{MPa}", 40, color=GREEN)
        ex2.next_to(ex, DOWN, buff=0.55).align_to(ex, LEFT)
        with self.voiceover("Hang three hundred and fourteen newtons from a steel wire of radius one "
                            "millimetre. The area is three point one four square millimetres, so the stress "
                            "is one hundred megapascals. Double the radius and the stress falls to a quarter.") as vo:
            self.play(FadeIn(c1), FadeIn(c1l), run_time=0.6)
            self.play(Write(ex[0]), run_time=1.0)
            self.play(Write(ex[1]), run_time=1.0)
            self.play(Write(ex[2]), FadeIn(c1s), run_time=1.2)
            self.wait(vo.duration * 0.12)
            self.play(FadeIn(c2), FadeIn(c2l), run_time=0.6)
            self.play(Write(ex2), FadeIn(c2s), run_time=1.0)

        self.clear_scene(0.5)
        ax = Axes(x_range=[0, 1, 1], y_range=[0, 1, 1], x_length=7.0, y_length=4.8, tips=False,
                  axis_config={"color": MUTED, "stroke_width": 3, "include_ticks": False}).move_to(P(-2.4, -0.2))
        xl = T("strain", 24, color=MUTED).next_to(ax.x_axis.get_end(), DOWN, buff=0.2)
        yl = T("stress", 24, color=MUTED).next_to(ax.y_axis.get_end(), LEFT, buff=0.2)
        pts = {"A": (0.16, 0.5), "B": (0.22, 0.58), "C": (0.32, 0.6), "D": (0.7, 0.86), "E": (0.9, 0.72)}
        hooke = Line(ax.c2p(0, 0), ax.c2p(*pts["A"]), color=GREEN, stroke_width=6)
        def ss(e):
            if e <= 0.22:  # A to B: gently curving, still elastic
                u = (e - 0.16) / 0.06
                return 0.5 + 0.08 * (2 * u - u * u)
            if e <= 0.4:  # yield: flows with little extra stress
                u = (e - 0.22) / 0.18
                return 0.58 + 0.02 * np.sin(u * PI / 2)
            if e <= 0.7:  # strain hardening up to the ultimate stress
                u = (e - 0.4) / 0.3
                return 0.6 + 0.13 * (1 - np.cos(u * PI))
            u = (e - 0.7) / 0.2  # necking down to fracture
            return 0.86 - 0.14 * u * u
        pts["C"] = (0.32, ss(0.32))
        rest = ax.plot(ss, x_range=[0.16, 0.9, 0.005], color=INK, stroke_width=5)
        dots = VGroup()
        labs = VGroup()
        offs = {"A": RIGHT + 0.3 * DOWN, "B": UL, "C": UP, "D": UP, "E": RIGHT}
        for k, (a, b) in pts.items():
            d = Dot(ax.c2p(a, b), radius=0.07, color=PRIMARY)
            dots.add(d)
            labs.add(T(k, 24, color=PRIMARY, weight="BOLD").next_to(d, offs[k], buff=0.1))
        hl = M(r"\sigma \propto \varepsilon", 34, color=GREEN).move_to(ax.c2p(0.18, 0.2))
        legend = VGroup(*[
            VGroup(T(k, 24, color=PRIMARY, weight="BOLD"), T(s, 24))
            .arrange(RIGHT, buff=0.25)
            for k, s in [("A", "proportional limit"), ("B", "elastic limit"), ("C", "yield point"),
                         ("D", "ultimate stress"), ("E", "fracture")]
        ]).arrange(DOWN, buff=0.28, aligned_edge=LEFT).move_to(P(4.4, 0.9))
        with self.voiceover("Plot stress against strain. At first it is a straight line: Hooke's law, the "
                            "same restoring force idea behind simple harmonic motion. Then the wire passes "
                            "its proportional and elastic limits, yields, reaches its ultimate stress, and "
                            "breaks.") as vo:
            self.play(Create(ax), FadeIn(xl), FadeIn(yl), run_time=0.8)
            self.play(Create(hooke), run_time=1.0)
            self.play(FadeIn(hl), FadeIn(dots[0]), FadeIn(labs[0]), FadeIn(legend[0]), run_time=0.7)
            self.wait(vo.duration * 0.25)
            self.play(Create(rest), run_time=3.0)
            for i in range(1, 5):
                self.play(FadeIn(dots[i]), FadeIn(labs[i]), FadeIn(legend[i]), run_time=0.45)
        note = VGroup(T("elastic = comes back,", 26, color=PRIMARY),
                      T("not stretches a lot", 26, color=PRIMARY)).arrange(DOWN, buff=0.12)
        note.next_to(legend, DOWN, buff=0.6)
        with self.voiceover('Elastic means it comes back, not that it stretches a lot.') as vo:
            self.play(Indicate(hooke, color=GREEN), run_time=0.8)
            self.play(FadeIn(note, shift=0.15 * UP), run_time=0.7)

    # ------------------------------------------------------------ scene 2: elastic moduli
    def s2(self):
        y_eq = M(r"Y = \frac{F/A}{\Delta L/L}", 60).move_to(P(0, 2.4))
        y_n = T("Young's modulus", 26, color=MUTED).next_to(y_eq, RIGHT, buff=0.5)
        dl = M(r"\Delta L = \frac{F\,L}{A\,Y}", 66).move_to(P(0, 0.3))
        dl_box = boxed(dl)
        k = M(r"k = \frac{AY}{L}", 50, color=GEO_C).move_to(P(-1.6, -2.1))
        k_n = T("the wire is a spring", 28, color=GEO_C).next_to(k, RIGHT, buff=0.5)
        with self.voiceover("The slope of that line is Young's modulus, Y, stress over strain. Rearranged, "
                            "the extension is delta L equals F L over A Y. The wire is a spring, with k equal "
                            "to A Y over L.") as vo:
            self.wait(vo.duration * 0.1)
            self.play(Write(y_eq), FadeIn(y_n), run_time=1.2)
            self.wait(vo.duration * 0.15)
            self.play(TransformFromCopy(y_eq, dl), run_time=1.3)
            self.play(Create(dl_box), run_time=0.5)
            self.wait(vo.duration * 0.1)
            self.play(Write(k), FadeIn(k_n), run_time=1.0)

        self.clear_scene(0.5)
        ceil = Line(P(-6.3, 3.0), P(-1.6, 3.0), color=MUTED, stroke_width=6)
        xs, xc = -5.0, -2.9
        ws = Line(P(xs, 3.0), P(xs, 0.4), color=INK, stroke_width=3)
        wc = Line(P(xc, 3.0), P(xc, 0.4), color=ManimColor("#B5651D"), stroke_width=3)
        bs = RoundedRectangle(width=1.1, height=0.7, corner_radius=0.1, color=INK, stroke_width=3)
        bs.set_fill(BLOCK, 1).next_to(ws.get_end(), DOWN, buff=0)
        bc = bs.copy().next_to(wc.get_end(), DOWN, buff=0)
        bst = M(r"100\ \text{N}", 26).move_to(bs)
        bct = M(r"100\ \text{N}", 26).move_to(bc)
        ls = T("steel", 26).move_to(P(xs, -2.6))
        lc = T("copper", 26).move_to(P(xc, -2.6))
        ref = DashedLine(P(-6.0, 0.4), P(-1.9, 0.4), color=GRID, stroke_width=3)
        eqs = VGroup(
            M(r"\Delta L = \frac{100\times 2}{10^{-6}\times 2\times10^{11}}", 40),
            M(r"= 10^{-3}\ \text{m} = 1\ \text{mm}", 40),
            M(r"Y_{\text{Cu}} = \tfrac12\,Y_{\text{steel}} \;\Rightarrow\; \Delta L = 2\ \text{mm}", 40, color=EN_C),
        ).arrange(DOWN, buff=0.4, aligned_edge=LEFT).move_to(P(2.8, 0.9))
        fit(eqs, 6.6)
        exag = T("(stretches exaggerated)", 22, color=MUTED).move_to(P(-3.95, -3.2))
        with self.voiceover("One hundred newtons on a steel wire two metres long, one square millimetre "
                            "across, with Y of two times ten to the eleven pascals, stretches it one "
                            "millimetre. Copper has half the modulus, so it stretches two.") as vo:
            self.play(Create(ceil), Create(ws), Create(wc), FadeIn(bs), FadeIn(bc), FadeIn(bst), FadeIn(bct),
                      FadeIn(ls), FadeIn(lc), run_time=1.0)
            self.play(Create(ref), FadeIn(exag), run_time=0.5)
            self.play(Write(eqs[0]), run_time=1.5)
            self.wait(vo.duration * 0.1)
            self.play(ws.animate.put_start_and_end_on(P(xs, 3.0), P(xs, -0.1)),
                      VGroup(bs, bst).animate.shift(0.5 * DOWN), Write(eqs[1]), run_time=1.2)
            d1 = M(r"1\ \text{mm}", 26, color=GEO_C).next_to(bs, RIGHT, buff=0.1).shift(0.2 * UP)
            self.play(FadeIn(d1), run_time=0.4)
            self.wait(vo.duration * 0.1)
            self.play(wc.animate.put_start_and_end_on(P(xc, 3.0), P(xc, -0.6)),
                      VGroup(bc, bct).animate.shift(1.0 * DOWN), Write(eqs[2]), run_time=1.2)
            d2 = M(r"2\ \text{mm}", 26, color=GEO_C).next_to(bc, RIGHT, buff=0.1).shift(0.2 * UP)
            self.play(FadeIn(d2), run_time=0.4)

        self.clear_scene(0.5)
        # three ways to deform a block
        cx = [-4.4, 0.0, 4.4]
        cy = 1.2
        s1 = Rectangle(width=0.9, height=1.5, color=INK, stroke_width=3).set_fill(BLOCK, 1).move_to(P(cx[0], cy))
        a1 = VGroup(vec(s1.get_top(), s1.get_top() + 0.8 * UP, F_C, 5),
                    vec(s1.get_bottom(), s1.get_bottom() + 0.8 * DOWN, F_C, 5))
        s2 = Square(side_length=1.4, color=INK, stroke_width=3).set_fill(BLOCK, 1).move_to(P(cx[1], cy))
        a2 = VGroup(*[vec(s2.get_center() + 1.5 * d, s2.get_center() + 0.75 * d, FL_C, 5)
                      for d in (UP, DOWN, LEFT, RIGHT)])
        base = P(cx[2], cy - 0.7)
        s3 = Polygon(base + P(-0.7, 0), base + P(0.7, 0), base + P(1.1, 1.4), base + P(-0.3, 1.4),
                     color=INK, stroke_width=3).set_fill(BLOCK, 1)
        ghost = DashedVMobject(Square(side_length=1.4, color=MUTED, stroke_width=2).move_to(base + P(0, 0.7)))
        a3 = vec(base + P(-0.3, 1.6), base + P(1.0, 1.6), F_C, 5)
        floor3 = Line(base + P(-1.1, 0), base + P(1.4, 0), color=MUTED, stroke_width=5)
        th3 = Arc(radius=1.0, start_angle=PI / 2, angle=-np.arctan2(0.4, 1.4), arc_center=base + P(-0.7, 0),
                  color=GEO_C, stroke_width=3)
        th3l = M(r"\theta", 26, color=GEO_C).move_to(base + P(-0.56, 1.2))
        labs = VGroup(
            M(r"Y = \frac{F/A}{\Delta L/L}", 36), M(r"B = -\frac{\Delta p}{\Delta V/V}", 36),
            M(r"G = \frac{F/A}{\theta}", 36))
        names = VGroup(T("stretch", 26, color=MUTED), T("squeeze", 26, color=MUTED), T("shear", 26, color=MUTED))
        for i in range(3):
            labs[i].move_to(P(cx[i], -0.75))
            names[i].move_to(P(cx[i], -1.55))
        rub = M(r"Y_{\text{rubber}} \sim 10^{6}\ \text{Pa} \;\ll\; Y_{\text{steel}} = 2\times10^{11}\ \text{Pa}", 38)
        rub.move_to(P(0, -2.55))
        rub_n = T("stretches more  →  smaller Y", 28, color=PRIMARY).move_to(P(0, -3.3))
        with self.voiceover("Squeezing from all sides uses the bulk modulus B. Sliding the top face uses the "
                            "shear modulus G. And rubber, which stretches easily, has a tiny Young's modulus. "
                            "More stretchable means a smaller modulus.") as vo:
            self.play(FadeIn(s1), GrowArrow(a1[0]), GrowArrow(a1[1]), FadeIn(labs[0]), FadeIn(names[0]),
                      run_time=0.8)
            self.play(FadeIn(s2), *[GrowArrow(a) for a in a2], FadeIn(labs[1]), FadeIn(names[1]), run_time=1.0)
            self.wait(vo.duration * 0.15)
            self.play(Create(floor3), Create(ghost), FadeIn(s3), GrowArrow(a3), Create(th3), FadeIn(th3l),
                      FadeIn(labs[2]), FadeIn(names[2]), run_time=1.2)
            self.wait(vo.duration * 0.15)
            self.play(Write(rub), run_time=1.4)
            self.play(FadeIn(rub_n, shift=0.15 * UP), run_time=0.6)

        self.clear_scene(0.5)
        ax = Axes(x_range=[0, 1, 1], y_range=[0, 1, 1], x_length=5.2, y_length=4.2, tips=False,
                  axis_config={"color": MUTED, "stroke_width": 3, "include_ticks": False}).move_to(P(-3.4, -0.2))
        xl = M(r"\Delta L", 32, color=MUTED).next_to(ax.x_axis.get_end(), DOWN, buff=0.2)
        yl = M(r"F", 32, color=MUTED).next_to(ax.y_axis.get_end(), LEFT, buff=0.2)
        line = Line(ax.c2p(0, 0), ax.c2p(0.85, 0.85), color=F_C, stroke_width=5)
        tri = Polygon(ax.c2p(0, 0), ax.c2p(0.85, 0), ax.c2p(0.85, 0.85), stroke_width=0)
        tri.set_fill(EN_C, 0.45)
        u1 = M(r"U = \tfrac12\,F\,\Delta L", 60).move_to(P(2.8, 1.3))
        u2 = M(r"= \tfrac12\times100\times10^{-3} = 0.05\ \text{J}", 44, color=GREEN).move_to(P(2.8, -0.2))
        fit(u2, 6.4)
        with self.voiceover("The stored energy is the triangle under the force extension line: one half F "
                            "delta L. For our steel wire, zero point zero five joules.") as vo:
            self.play(Create(ax), FadeIn(xl), FadeIn(yl), run_time=0.8)
            self.play(Create(line), run_time=1.0)
            self.play(FadeIn(tri), run_time=0.8)
            self.play(Write(u1), run_time=1.2)
            self.wait(vo.duration * 0.15)
            self.play(Write(u2), run_time=1.3)

    # ------------------------------------------------------------ scene 3: pressure and buoyancy
    def s3(self):
        wt = water_rect(-6.0, -1.5, -3.0, 1.2)
        tk = tank(-6.0, -1.5, -3.0, 1.9)
        col = DashedVMobject(Rectangle(width=1.0, height=3.0, color=F_C, stroke_width=3).move_to(P(-3.75, -0.3)),
                             num_dashes=40)
        top_a = vec(P(-3.75, 2.4), P(-3.75, 1.25), F_C, 5)
        top_l = M(r"p_0A", 32, color=F_C).next_to(top_a, LEFT, buff=0.15)
        w_a = vec(P(-3.75, 0.0), P(-3.75, -1.0), F_C, 5)
        w_l = M(r"\rho A h\,g", 30, color=F_C).next_to(w_a, RIGHT, buff=0.6)
        bot_a = vec(P(-3.75, -2.9), P(-3.75, -1.85), FL_C, 5)
        bot_l = M(r"pA", 32, color=FL_C).next_to(bot_a, RIGHT, buff=0.6)
        br = Brace(Line(P(-5.0, 1.2), P(-5.0, -1.8)), LEFT, color=MUTED)
        brl = M("h", 34).next_to(br, LEFT, buff=0.1)
        e1 = M(r"pA = p_0A + \rho A h\,g", 42).move_to(P(3.3, 1.8))
        e2 = M(r"p = p_0 + \rho g h", 62).move_to(P(3.3, 0.3))
        e2b = boxed(e2)
        e3 = T("every 10 m of water adds 1 atmosphere", 24, color=MUTED).move_to(P(3.3, -1.3))
        with self.voiceover("Now fluids. Take a column of fluid, depth h. The push up on its base balances "
                            "the air pressure on top plus the column's weight. The area cancels: p equals p "
                            "nought plus rho g h. Every ten metres of water adds an atmosphere.") as vo:
            self.play(FadeIn(wt), Create(tk), run_time=0.8)
            self.wait(vo.duration * 0.12)
            self.play(Create(col), Create(br), FadeIn(brl), run_time=0.8)
            self.play(GrowArrow(bot_a), FadeIn(bot_l), run_time=0.6)
            self.play(GrowArrow(top_a), FadeIn(top_l), GrowArrow(w_a), FadeIn(w_l), run_time=0.8)
            self.play(Write(e1), run_time=1.2)
            self.wait(vo.duration * 0.08)
            self.play(Write(e2), Create(e2b), run_time=1.2)
            self.wait(vo.duration * 0.08)
            self.play(FadeIn(e3), run_time=0.6)

        self.clear_scene(0.5)
        yb, yt = -1.8, 1.4
        shapes = [
            [P(-4.7, yb), P(-3.3, yb), P(-2.5, yt), P(-5.5, yt)],
            [P(-0.7, yb), P(0.7, yb), P(0.7, yt), P(-0.7, yt)],
            [P(3.3, yb), P(4.7, yb), P(4.25, yt), P(3.75, yt)],
        ]
        vessels = VGroup()
        for pts in shapes:
            v = Polygon(*pts, color=INK, stroke_width=4)
            v.set_fill(WATER, 1)
            vessels.add(v)
        lvl = DashedLine(P(-6.2, yt), P(6.2, yt), color=FL_C, stroke_width=3)
        lvl_l = M("h", 32, color=FL_C).move_to(P(-6.0, 0))
        hbr = DoubleArrow(P(-6.0, yb), P(-6.0, yt), buff=0, color=FL_C, stroke_width=3,
                          max_tip_length_to_length_ratio=0.08)
        lvl_l.next_to(hbr, RIGHT, buff=0.1)
        ps = VGroup(*[M(r"p_0 + \rho g h", 32, color=F_C).move_to(P(x, -2.4)) for x in (-4.0, 0.0, 4.0)])
        cap = T("same depth, same pressure: the shape does not matter", 28, color=PRIMARY).move_to(P(0, -3.3))
        with self.voiceover("So the vessel's shape does not matter. At the same depth, the pressure is the "
                            "same.") as vo:
            self.play(LaggedStart(*[FadeIn(v) for v in vessels], lag_ratio=0.3), run_time=1.4)
            self.play(Create(lvl), GrowFromCenter(hbr), FadeIn(lvl_l), run_time=0.8)
            self.play(LaggedStart(*[FadeIn(p, shift=0.15 * UP) for p in ps], lag_ratio=0.3), run_time=1.2)
            self.play(FadeIn(cap), run_time=0.6)

        self.clear_scene(0.5)
        water = Polygon(P(-4.8, 0.8), P(-4.2, 0.8), P(-4.2, -1.8), P(-1.5, -1.8), P(-1.5, 0.8), P(1.5, 0.8),
                        P(1.5, -2.6), P(-4.8, -2.6), color=INK, stroke_width=4)
        water.set_fill(WATER, 1)
        pist_s = Rectangle(width=0.6, height=0.22, color=INK, stroke_width=2).set_fill(MUTED, 1)
        pist_s.move_to(P(-4.5, 0.91))
        pist_b = Rectangle(width=3.0, height=0.22, color=INK, stroke_width=2).set_fill(MUTED, 1)
        pist_b.move_to(P(0, 0.91))
        car = VGroup(
            RoundedRectangle(width=2.2, height=0.6, corner_radius=0.15, color=INK, stroke_width=3)
            .set_fill(ManimColor("#E9A5AC"), 1).move_to(P(0, 1.55)),
            Circle(radius=0.2, color=INK, stroke_width=3).set_fill(INK, 1).move_to(P(-0.65, 1.22)),
            Circle(radius=0.2, color=INK, stroke_width=3).set_fill(INK, 1).move_to(P(0.65, 1.22)),
        )
        car_l = M(r"1500\ \text{kg car:}\ 15000\ \text{N}", 30).move_to(P(0, 2.35))
        f_a = vec(P(-4.5, 2.6), P(-4.5, 1.05), F_C, 6)
        f_l = M("f", 38, color=F_C).next_to(f_a, LEFT, buff=0.15)
        a_l = M("a", 32).move_to(P(-5.25, 0.2))
        A_l = M("A = 50a", 32).move_to(P(0, -0.5))
        r1 = M(r"\frac{f}{a} = \frac{F}{A}", 50).move_to(P(4.3, 2.2))
        r2 = M(r"f = \frac{15000}{50} = 300\ \text{N}", 40, color=F_C).move_to(P(4.3, 0.9))
        r3 = M(r"300\times0.5 = 15000\times0.01", 36).move_to(P(4.3, -0.5))
        r4 = M(r"= 150\ \text{J}", 40, color=GREEN).next_to(r3, DOWN, buff=0.25)
        r5 = T("force multiplied, work not", 26, color=MUTED).move_to(P(4.3, -2.2))
        for m in (r1, r2, r3, r5):
            fit(m, 4.4)
        with self.voiceover("Pascal's law: a pressure change in an enclosed fluid is passed on undiminished. "
                            "On a piston fifty times larger, three hundred newtons lifts a fifteen hundred "
                            "kilogram car. But the small piston moves fifty centimetres to lift it one, so "
                            "the work is the same.") as vo:
            self.play(FadeIn(water), FadeIn(pist_s), FadeIn(pist_b), FadeIn(a_l), FadeIn(A_l), run_time=0.9)
            self.play(FadeIn(car), FadeIn(car_l), run_time=0.6)
            self.wait(vo.duration * 0.1)
            self.play(GrowArrow(f_a), FadeIn(f_l), Write(r1), run_time=1.2)
            self.play(Write(r2), run_time=1.2)
            self.wait(vo.duration * 0.15)
            self.play(Write(r3), run_time=1.2)
            self.play(Write(r4), FadeIn(r5), run_time=0.8)

        self.clear_scene(0.5)
        wt = water_rect(-6.2, -1.2, -3.2, 1.4)
        tk = tank(-6.2, -1.2, -3.2, 2.0)
        blk = Square(side_length=1.4, color=INK, stroke_width=3).set_fill(BLOCK, 1).move_to(P(-3.7, -0.9))
        ta = vec(blk.get_top() + 0.7 * UP, blk.get_top(), F_C, 5)
        ba = vec(blk.get_bottom() + 1.3 * DOWN, blk.get_bottom(), FL_C, 7)
        tal = M(r"p_{\text{top}}A", 28, color=F_C).next_to(ta, RIGHT, buff=0.15)
        bal = M(r"p_{\text{bottom}}A", 28, color=FL_C).next_to(ba, RIGHT, buff=0.15)
        sides = VGroup(vec(blk.get_left() + 0.6 * LEFT, blk.get_left(), MUTED, 4),
                       vec(blk.get_right() + 0.6 * RIGHT, blk.get_right(), MUTED, 4))
        fb = M(r"F_B = \rho_{\text{fluid}}\,V_{\text{sub}}\,g", 46).move_to(P(3.2, 2.5))
        fb_n = T("= weight of fluid displaced", 26, color=MUTED).next_to(fb, DOWN, buff=0.2)
        fr = M(r"\frac{V_{\text{sub}}}{V} = \frac{\rho_{\text{ice}}}{\rho_{\text{water}}} = \frac{900}{1000} = 0.9", 38)
        fit(fr, 5.6).move_to(P(3.2, 0.5))
        sea = water_rect(1.0, 5.8, -3.6, -1.7)
        ice = Polygon(P(1.6, -1.5), P(2.8, -1.5), P(2.95, -3.5), P(1.45, -3.5), color=INK, stroke_width=3)
        ice.set_fill(WHITE, 0.95)
        surf = Line(P(1.0, -1.7), P(5.8, -1.7), color=FL_C, stroke_width=3)
        ice_l = T("nine tenths hidden", 24, color=FL_C).move_to(P(4.5, -2.6))
        with self.voiceover("A submerged block's bottom is deeper than its top, so it is pushed up harder "
                            "than down. That is the buoyant force: the weight of fluid displaced. Ice, at "
                            "nine hundred kilograms per cubic metre, floats nine tenths submerged.") as vo:
            self.play(FadeIn(wt), Create(tk), FadeIn(blk), run_time=0.8)
            self.play(GrowArrow(ta), FadeIn(tal), GrowArrow(ba), FadeIn(bal), *[GrowArrow(s) for s in sides],
                      run_time=1.0)
            self.wait(vo.duration * 0.1)
            self.play(Write(fb), FadeIn(fb_n), run_time=1.2)
            self.wait(vo.duration * 0.12)
            self.play(FadeIn(sea), Create(surf), FadeIn(ice), run_time=0.8)
            self.play(Write(fr), FadeIn(ice_l), run_time=1.3)

    # ------------------------------------------------------------ scene 4: continuity and Bernoulli
    def s4(self):
        top = [P(-6.2, 0.0), P(-1.6, 0.0), P(0.2, -1.0), P(6.2, -1.0)]
        bot = [P(-6.2, -3.2), P(-1.6, -3.2), P(0.2, -2.2), P(6.2, -2.2)]
        fill = Polygon(*top, *reversed(bot), stroke_width=0).set_fill(WATER, 1)
        wall_t = VMobject(color=INK, stroke_width=4).set_points_as_corners(top)
        wall_b = VMobject(color=INK, stroke_width=4).set_points_as_corners(bot)
        streams = VGroup()
        for f in (0.25, 0.5, 0.75):
            pts = [t + f * (b - t) for t, b in zip(top, bot)]
            s = VMobject(color=MUTED, stroke_width=2).set_points_smoothly(
                [pts[0], pts[1], (pts[1] + pts[2]) / 2 + 0.0 * UP, pts[2], pts[3]])
            streams.add(s)
        v1 = vec(P(-4.6, -1.6), P(-3.9, -1.6), F_C, 6)
        v1l = M(r"v_1", 32, color=F_C).next_to(v1, UP, buff=0.12)
        v2 = vec(P(2.2, -1.6), P(4.6, -1.6), F_C, 6)
        v2l = M(r"v_2", 32, color=F_C).next_to(v2, UP, buff=0.05)
        a1l = M(r"A_1", 32, color=FL_C).move_to(P(-5.7, -2.6))
        a2l = M(r"A_2", 32, color=FL_C).move_to(P(5.7, -2.6))
        pipe = VGroup(fill, streams, wall_t, wall_b)
        c1 = M(r"A_1v_1 = A_2v_2", 56).move_to(P(0, 2.8))
        c2 = M(r"2\ \text{cm}^2\times 2\ \text{m/s} = 0.5\ \text{cm}^2\times v_2 \;\Rightarrow\; v_2 = 8\ \text{m/s}", 36,
               color=GREEN)
        fit(c2, 12.0).move_to(P(0, 1.6))
        with self.voiceover("In steady flow, mass is conserved, so area times speed stays constant. Narrow a "
                            "hose from two square centimetres to half of one, and two metres per second "
                            "becomes eight.") as vo:
            self.play(FadeIn(fill), Create(wall_t), Create(wall_b), run_time=1.0)
            self.play(Create(streams), FadeIn(a1l), FadeIn(a2l), run_time=1.0)
            self.play(GrowArrow(v1), FadeIn(v1l), run_time=0.6)
            self.play(GrowArrow(v2), FadeIn(v2l), run_time=0.8)
            self.play(Write(c1), run_time=1.0)
            self.wait(vo.duration * 0.1)
            self.play(Write(c2), run_time=1.4)

        b = MathTex(r"p", r"\;+\;", r"\tfrac12\rho v^2", r"\;+\;", r"\rho g h", r"\;=\;\text{const}", font_size=56)
        b.move_to(P(0, 2.5))
        bb = boxed(b)
        bl = VGroup(T("pressure", 22, color=MUTED).next_to(b[0], DOWN, buff=0.35),
                    T("kinetic", 22, color=MUTED).next_to(b[2], DOWN, buff=0.3),
                    T("potential", 22, color=MUTED).next_to(b[4], DOWN, buff=0.35))
        bl[0].align_to(bl[2], DOWN)
        bl[1].align_to(bl[2], DOWN)
        bl_n = T("energy per unit volume", 24, color=EN_C).move_to(P(0, 0.95))
        with self.voiceover("Energy is conserved too. Along a streamline, p plus one half rho v squared plus "
                            "rho g h is constant. Each term is energy per unit volume.") as vo:
            self.play(FadeOut(c1), FadeOut(c2), run_time=0.5)
            self.wait(vo.duration * 0.15)
            self.play(Write(b), run_time=1.8)
            self.play(Create(bb), run_time=0.5)
            self.play(LaggedStart(*[FadeIn(x) for x in bl], lag_ratio=0.3), run_time=1.0)
            self.play(FadeIn(bl_n), run_time=0.5)

        g1 = VGroup(Line(P(-4.25, 0.0), P(-4.25, 1.45), color=INK, stroke_width=3),
                    Line(P(-3.75, 0.0), P(-3.75, 1.45), color=INK, stroke_width=3))
        g1f = water_rect(-4.23, -3.77, 0.0, 1.1)
        g2 = VGroup(Line(P(2.75, -1.0), P(2.75, 1.45), color=INK, stroke_width=3),
                    Line(P(3.25, -1.0), P(3.25, 1.45), color=INK, stroke_width=3))
        g2f = water_rect(2.77, 3.23, -1.0, -0.2)
        g1l = T("high p", 24, color=FL_C).next_to(g1, LEFT, buff=0.2)
        g2l = T("low p", 24, color=F_C).next_to(g2, RIGHT, buff=0.2)
        cap = T("faster flow, lower pressure", 30, color=PRIMARY).move_to(P(-0.4, 0.75))
        with self.voiceover("So at the same height, faster flow means lower pressure. Where the pipe narrows, "
                            "the gauge column drops. That is how wings lift, and how storms lift roofs.") as vo:
            self.play(FadeOut(bl), FadeOut(bl_n), run_time=0.4)
            self.play(Create(g1), Create(g2), run_time=0.7)
            self.play(GrowFromEdge(g1f, DOWN), GrowFromEdge(g2f, DOWN), run_time=1.2)
            self.play(FadeIn(g1l), FadeIn(g2l), run_time=0.5)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(cap, shift=0.15 * UP), Indicate(v2, color=HL), run_time=1.0)

        self.clear_scene(0.5)
        g = -3.2
        s = 0.9
        H = 5.0
        x0 = -4.6
        top_y = g + s * H
        wt = water_rect(-6.0, x0, g, top_y)
        tk = tank(-6.0, x0, g, top_y + 0.4)
        ground = Line(P(-6.4, g), P(0.8, g), color=MUTED, stroke_width=4)
        jets = VGroup()
        holes = VGroup()
        hl = VGroup()
        for d, col in ((1.0, FL_C), (2.5, F_C), (4.0, GEO_C)):
            yh = top_y - s * d
            R = s * 2 * np.sqrt(d * (H - d))
            jet = ParametricFunction(lambda u, yh=yh, R=R: P(x0 + R * u, g + (yh - g) * (1 - u * u)),
                                     t_range=[0, 1], color=col, stroke_width=5)
            jets.add(jet)
            holes.add(Dot(P(x0, yh), radius=0.07, color=col))
            hl.add(T(f"{d:g} m", 22, color=col).move_to(P(-5.3, yh)))
        land = DashedLine(P(x0 + s * 4, g + 0.6), P(x0 + s * 4, g), color=MUTED, stroke_width=3)
        e1 = M(r"v = \sqrt{2gx}", 58).move_to(P(3.6, 2.4))
        e2 = M(r"x = 5\ \text{m}:\ v = \sqrt{2\cdot10\cdot5} = 10\ \text{m/s}", 36, color=GREEN)
        fit(e2, 5.6).move_to(P(3.6, 1.2))
        e3 = M(r"R = 2\sqrt{x(H - x)}", 44).move_to(P(3.6, -0.1))
        e4 = T("farthest from half depth", 26, color=F_C).move_to(P(3.6, -1.0))
        e5 = T("1 m and 4 m land together", 26, color=GEO_C).move_to(P(3.6, -1.7))
        with self.voiceover("Water leaving a hole at depth x has Torricelli's speed, root two g x. Five "
                            "metres down, that is ten metres per second. In a tank five metres tall, the jet "
                            "from half depth lands farthest, and holes at one and four metres land together.") as vo:
            self.play(FadeIn(wt), Create(tk), Create(ground), run_time=0.8)
            self.play(FadeIn(holes[1]), Create(jets[1]), FadeIn(hl[1]), run_time=1.0)
            self.play(Write(e1), run_time=1.0)
            self.wait(vo.duration * 0.12)
            self.play(Write(e2), run_time=1.2)
            self.wait(vo.duration * 0.06)
            self.play(Write(e3), FadeIn(e4), run_time=1.0)
            self.play(FadeIn(holes[0]), FadeIn(holes[2]), Create(jets[0]), Create(jets[2]), FadeIn(hl[0]),
                      FadeIn(hl[2]), run_time=1.4)
            self.play(Create(land), FadeIn(e5), run_time=0.7)

    # ------------------------------------------------------------ scene 5: viscosity and terminal velocity
    def s5(self):
        floor = Line(P(-6.4, -2.6), P(0.6, -2.6), color=MUTED, stroke_width=5)
        cards = VGroup()
        arrows = VGroup()
        for i in range(6):
            c = Rectangle(width=3.2, height=0.32, color=INK, stroke_width=2).set_fill(BLOCK, 1)
            c.move_to(P(-4.4 + 0.25 * i, -2.42 + 0.38 * i))
            cards.add(c)
            if i:
                arrows.add(vec(c.get_right() + 0.08 * RIGHT, c.get_right() + (0.08 + 0.28 * i) * RIGHT, F_C, 4))
        v0 = M(r"v = 0", 28, color=MUTED).next_to(floor, DOWN, buff=0.15).set_x(cards[0].get_x())
        ylab = M(r"y", 30).move_to(P(-6.3, -0.8))
        yarr = vec(P(-6.3, -2.4), P(-6.3, -1.1), MUTED, 3)
        e1 = M(r"F = \eta\,A\,\frac{dv}{dy}", 64).move_to(P(3.5, 1.6))
        e1n = M(r"\eta:\ \text{viscosity, in Pa}\cdot\text{s}", 34, color=MUTED).next_to(e1, DOWN, buff=0.35)
        e2 = T("honey: large η     water: small η", 26, color=FL_C).move_to(P(3.5, -1.0))
        with self.voiceover("Real fluids have friction, called viscosity. Like a deck of cards, each layer "
                            "drags the next: F equals eta A d v by d y. Honey has a large eta, water a small "
                            "one.") as vo:
            self.play(Create(floor), LaggedStart(*[FadeIn(c) for c in cards], lag_ratio=0.15), run_time=1.2)
            self.play(LaggedStart(*[GrowArrow(a) for a in arrows], lag_ratio=0.15), FadeIn(v0),
                      GrowArrow(yarr), FadeIn(ylab), run_time=1.4)
            self.wait(vo.duration * 0.12)
            self.play(Write(e1), run_time=1.3)
            self.play(FadeIn(e1n), run_time=0.6)
            self.wait(vo.duration * 0.08)
            self.play(FadeIn(e2), run_time=0.6)

        self.clear_scene(0.5)
        fl = water_rect(-6.2, -2.2, -3.4, 2.9)
        tk = tank(-6.2, -2.2, -3.4, 3.1)
        c0 = P(-4.2, 0.3)
        ball = Circle(radius=0.45, color=INK, stroke_width=3).set_fill(MUTED, 1).move_to(c0)
        w = vec(c0 + 0.45 * DOWN, c0 + 1.9 * DOWN, F_C, 6)
        wl = M(r"W", 32, color=F_C).next_to(w, RIGHT, buff=0.15)
        fb = vec(c0 + P(-0.25, 0.38), c0 + P(-0.25, 0.95), FL_C, 6)
        fbl = M(r"F_B", 30, color=FL_C).next_to(fb, LEFT, buff=0.12)
        dv = ValueTracker(0.05)
        drag = always_redraw(lambda: vec(c0 + P(0.25, 0.38), c0 + P(0.25, 0.4 + dv.get_value()), EN_C, 6))
        dl = M(r"6\pi\eta r v", 30, color=EN_C).move_to(c0 + P(0.95, 1.2))
        r1 = M(r"F_{\text{drag}} = 6\pi\eta r v", 44, color=EN_C).move_to(P(2.6, 2.5))
        r2 = M(r"6\pi\eta r v_t = \tfrac43\pi r^3(\rho - \sigma)g", 40).move_to(P(2.6, 1.1))
        r3 = M(r"v_t = \frac{2r^2(\rho - \sigma)g}{9\eta}", 54).move_to(P(2.6, -0.6))
        r3b = boxed(r3)
        r4 = M(r"\sigma = \text{density of the fluid}", 30, color=MUTED).move_to(P(2.6, -2.1))
        for m in (r1, r2, r3, r4):
            fit(m, 6.6)
        with self.voiceover("A small sphere feels Stokes's drag, six pi eta r v. As it falls the drag grows "
                            "until it balances weight minus buoyancy. Then it falls at terminal velocity: two "
                            "r squared, times rho minus sigma, times g, over nine eta, where sigma is the "
                            "fluid's density.") as vo:
            self.play(FadeIn(fl), Create(tk), FadeIn(ball), run_time=0.8)
            self.play(Write(r1), run_time=1.1)
            self.play(GrowArrow(w), FadeIn(wl), GrowArrow(fb), FadeIn(fbl), run_time=0.8)
            self.add(drag)
            self.play(FadeIn(dl), dv.animate.set_value(0.95), run_time=2.5, rate_func=smooth)
            self.play(Write(r2), run_time=1.4)
            self.wait(vo.duration * 0.05)
            self.play(Write(r3), Create(r3b), run_time=1.4)
            self.play(FadeIn(r4), run_time=0.6)
        drag.clear_updaters()

        self.clear_scene(0.5)
        ax = Axes(x_range=[0, 3, 1], y_range=[0, 5, 1], x_length=6.4, y_length=4.4, tips=False,
                  axis_config={"color": MUTED, "stroke_width": 3, "include_ticks": False}).move_to(P(-2.9, -0.2))
        xl = M(r"t", 32, color=MUTED).next_to(ax.x_axis.get_end(), DOWN, buff=0.2)
        yl = M(r"v", 32, color=MUTED).next_to(ax.y_axis.get_end(), LEFT, buff=0.2)
        vt = DashedLine(ax.c2p(0, 4), ax.c2p(3, 4), color=EN_C, stroke_width=3)
        vtl = M(r"v_t", 34, color=EN_C).next_to(vt, RIGHT, buff=0.15)
        curve = ax.plot(lambda x: 4 * (1 - np.exp(-x / 0.4)), x_range=[0, 3], color=F_C, stroke_width=5)
        q1 = M(r"r = 0.1\ \text{mm}:\ v_t \approx 1.2\ \text{m/s}", 40, color=GREEN).move_to(P(3.6, 1.3))
        q2 = M(r"\text{no drag, from 2 km: } 200\ \text{m/s}", 36, color=PRIMARY).move_to(P(3.6, 0.0))
        for m in (q1, q2):
            fit(m, 5.6)
        with self.voiceover("A raindrop of radius zero point one millimetre settles at about one point two "
                            "metres per second. Without drag, from a two kilometre cloud, it would arrive at "
                            "two hundred.") as vo:
            self.play(Create(ax), FadeIn(xl), FadeIn(yl), run_time=0.7)
            self.play(Create(vt), FadeIn(vtl), run_time=0.6)
            self.play(Create(curve), run_time=2.2)
            self.wait(vo.duration * 0.05)
            self.play(Write(q1), run_time=1.3)
            self.wait(vo.duration * 0.08)
            self.play(Write(q2), run_time=1.2)

        self.clear_scene(0.5)
        small = VGroup(*[Circle(radius=0.28, color=FL_C, stroke_width=3).set_fill(WATER, 1) for _ in range(8)])
        small.arrange_in_grid(rows=2, cols=4, buff=0.2).move_to(P(-4.6, 1.4))
        sl = M("r", 30).next_to(small, DOWN, buff=0.25)
        big = Circle(radius=0.56, color=FL_C, stroke_width=3).set_fill(WATER, 1).move_to(P(-1.2, 1.4))
        bl = M("2r", 30).next_to(big, DOWN, buff=0.25).align_to(sl, DOWN)
        arr = vec(P(-2.9, 1.4), P(-2.0, 1.4), MUTED, 4)
        m1 = M(r"8\times\tfrac43\pi r^3 = \tfrac43\pi R^3 \;\Rightarrow\; R = 2r", 36).move_to(P(3.7, 1.9))
        m2 = M(r"v_t \propto r^2:\ \ 1.5 \to 6\ \text{cm/s}", 40, color=GREEN).move_to(P(3.7, 0.8))
        for m in (m1, m2):
            fit(m, 5.4)
        bub = Circle(radius=0.42, color=FL_C, stroke_width=3).set_fill(WHITE, 0.9).move_to(P(-4.6, -2.6))
        bub_bg = water_rect(-6.0, -3.2, -3.4, -0.9)
        bub_l = M(r"\text{air bubble: } \rho < \sigma \;\Rightarrow\; \text{it rises}", 36, color=F_C)
        fit(bub_l, 7.5).move_to(P(2.0, -2.0))
        with self.voiceover("Terminal speed goes as r squared. Eight droplets merge into one of twice the "
                            "radius, which falls four times as fast. And an air bubble, lighter than water, "
                            "rises.") as vo:
            self.play(LaggedStart(*[FadeIn(c) for c in small], lag_ratio=0.08), FadeIn(sl), run_time=1.0)
            self.play(GrowArrow(arr), TransformFromCopy(small, big), FadeIn(bl), run_time=1.2)
            self.play(Write(m1), run_time=1.3)
            self.play(Write(m2), run_time=1.1)
            self.wait(vo.duration * 0.08)
            self.play(FadeIn(bub_bg), FadeIn(bub), run_time=0.5)
            self.play(bub.animate.shift(0.9 * UP), FadeIn(bub_l), run_time=1.3)

    # ------------------------------------------------------------ scene 6: surface tension and capillarity
    def s6(self):
        liq = water_rect(-6.0, -1.0, -3.2, 0.8)
        surf = Line(P(-6.0, 0.8), P(-1.0, 0.8), color=FL_C, stroke_width=4)
        mi = P(-3.5, -1.6)
        dot_i = Dot(mi, radius=0.13, color=INK)
        arr_i = VGroup(*[vec(mi, mi + 0.65 * np.array([np.cos(a), np.sin(a), 0]), FL_C, 4)
                         for a in np.linspace(0, TAU, 7)[:-1]])
        ms = P(-3.5, 0.62)
        dot_s = Dot(ms, radius=0.13, color=INK)
        arr_s = VGroup(*[vec(ms, ms + 0.65 * np.array([np.cos(a), np.sin(a), 0]), FL_C, 4)
                         for a in (PI, 4 * PI / 3, 3 * PI / 2, 5 * PI / 3, 0)])
        net = vec(ms + 0.15 * DOWN, ms + 1.35 * DOWN, F_C, 7)
        li = T("inside: balanced", 22, color=MUTED).move_to(P(-3.5, -2.75))
        ls = T("surface: pulled inward", 22, color=F_C).move_to(P(-3.5, 1.3))
        e1 = M(r"T = \frac{F}{L} = \frac{\text{energy}}{\text{area}}", 50).move_to(P(3.3, 1.6))
        e2 = M(r"\text{N/m} = \text{J/m}^2", 36, color=MUTED).move_to(P(3.3, 0.3))
        e3 = M(r"T_{\text{water}} \approx 0.072\ \text{N/m}", 42, color=FL_C).move_to(P(3.3, -0.9))
        with self.voiceover("A molecule inside a liquid is pulled equally every way. One at the surface is "
                            "pulled inward, so new surface costs energy. Surface tension T is that energy per "
                            "area, or force per length: for water, zero point zero seven two newtons per "
                            "metre.") as vo:
            self.play(FadeIn(liq), Create(surf), run_time=0.7)
            self.play(FadeIn(dot_i), *[GrowArrow(a) for a in arr_i], FadeIn(li), run_time=1.0)
            self.wait(vo.duration * 0.08)
            self.play(FadeIn(dot_s), *[GrowArrow(a) for a in arr_s], FadeIn(ls), run_time=1.0)
            self.play(GrowArrow(net), run_time=0.7)
            self.wait(vo.duration * 0.08)
            self.play(Write(e1), run_time=1.3)
            self.play(FadeIn(e2), run_time=0.5)
            self.wait(vo.duration * 0.08)
            self.play(Write(e3), run_time=1.0)

        self.clear_scene(0.5)
        O = P(-3.5, -1.6)
        R = 1.8
        dome = VGroup(
            Arc(radius=R, start_angle=0, angle=PI, arc_center=O, color=FL_C, stroke_width=5),
            Line(O + R * LEFT, O + R * RIGHT, color=INK, stroke_width=3),
        )
        dome_f = Sector(radius=R, start_angle=0, angle=PI, arc_center=O, stroke_width=0).set_fill(WATER, 1)
        push = VGroup(*[vec(O + P(x, 0.08), O + P(x, 0.8), EN_C, 5) for x in (-1.2, -0.6, 0.0, 0.6, 1.2)])
        pl = M(r"\Delta p", 32, color=EN_C).move_to(O + P(0, 1.15))
        tl_ = vec(O + R * LEFT, O + R * LEFT + 0.95 * DOWN, F_C, 6)
        tr_ = vec(O + R * RIGHT, O + R * RIGHT + 0.95 * DOWN, F_C, 6)
        tll = M("T", 32, color=F_C).next_to(tl_, LEFT, buff=0.12)
        trl = M("T", 32, color=F_C).next_to(tr_, RIGHT, buff=0.12)
        rl = M("r", 30).move_to(O + P(0.9, -0.3))
        e1 = M(r"\Delta p\cdot\pi r^2 = T\cdot 2\pi r", 46).move_to(P(3.2, 2.0))
        e2 = M(r"\Delta p = \frac{2T}{r}", 64).move_to(P(3.2, 0.5))
        e2b = boxed(e2)
        e3 = M(r"\text{soap bubble: } \Delta p = \frac{4T}{r}", 44, color=GEO_C).move_to(P(3.2, -1.3))
        e3n = T("two surfaces", 24, color=GEO_C).next_to(e3, DOWN, buff=0.25)
        with self.voiceover("Cut a drop in half. Excess pressure times pi r squared balances surface tension "
                            "around the rim, two pi r times T. So the excess pressure is two T over r, and "
                            "four T over r for a soap bubble, which has two surfaces.") as vo:
            self.play(FadeIn(dome_f), Create(dome), FadeIn(rl), run_time=0.9)
            self.play(*[GrowArrow(a) for a in push], FadeIn(pl), run_time=0.9)
            self.wait(vo.duration * 0.08)
            self.play(GrowArrow(tl_), GrowArrow(tr_), FadeIn(tll), FadeIn(trl), run_time=0.9)
            self.play(Write(e1), run_time=1.3)
            self.wait(vo.duration * 0.05)
            self.play(Write(e2), Create(e2b), run_time=1.2)
            self.wait(vo.duration * 0.05)
            self.play(Write(e3), FadeIn(e3n), run_time=1.2)

        self.clear_scene(0.5)
        sb = Circle(radius=0.75, color=GEO_C, stroke_width=4).set_fill(ManimColor("#EDE4F6"), 0.8).move_to(P(-3.2, 0.4))
        lb = Circle(radius=1.4, color=GEO_C, stroke_width=4).set_fill(ManimColor("#EDE4F6"), 0.8).move_to(P(2.8, 0.4))
        tube = always_redraw(lambda: Line(sb.get_right(), lb.get_left(), color=INK, stroke_width=8))
        sl = M(r"\text{small } r:\ \text{high}\ \Delta p", 32, color=F_C).move_to(P(-3.2, -1.7))
        bl = M(r"\text{large } r:\ \text{low}\ \Delta p", 32, color=FL_C).move_to(P(2.8, -1.7))
        flow = vec(P(-1.4, 1.0), P(0.4, 1.0), F_C, 5)
        cap = T("the small bubble empties into the big one", 28, color=PRIMARY).move_to(P(0, -3.0))
        with self.voiceover('Smaller radius, larger pressure: a small bubble empties into a big one.') as vo:
            self.play(FadeIn(sb), FadeIn(lb), FadeIn(tube), FadeIn(sl), FadeIn(bl), run_time=0.8)
            self.play(GrowArrow(flow), run_time=0.5)
            self.play(sb.animate.scale(0.3), lb.animate.scale(1.12), FadeIn(cap), run_time=2.2)
        tube.clear_updaters()

        self.clear_scene(0.5)
        surf_y = -1.5
        bath = water_rect(-6.2, -1.8, -3.0, surf_y)
        bath_o = tank(-6.2, -1.8, -3.0, -1.1)
        merc = water_rect(-1.3, 1.0, -3.0, surf_y, color=MERC)
        merc_o = tank(-1.3, 1.0, -3.0, -1.1)

        def cap_tube(x, half, h_top, concave, liquid=WATER):
            walls = VGroup(Line(P(x - half, -2.6), P(x - half, 2.0), color=INK, stroke_width=3),
                           Line(P(x + half, -2.6), P(x + half, 2.0), color=INK, stroke_width=3))
            sag = 1 if concave else -1  # concave (wetting) dips in the middle; convex bulges up
            men = ArcBetweenPoints(P(x - half, h_top), P(x + half, h_top), angle=sag * 2.0,
                                   color=FL_C if liquid == WATER else INK, stroke_width=4)
            return walls, column_under(men, x, half, -2.6, liquid), men

        n_w, n_c, n_m = cap_tube(-4.6, 0.12, 1.0, True)
        w_w, w_c, w_m = cap_tube(-3.0, 0.24, -0.25, True)
        m_w, m_c, m_m = cap_tube(-0.15, 0.2, -2.0, False, MERC)
        lvl = DashedLine(P(-6.2, surf_y), P(1.0, surf_y), color=MUTED, stroke_width=2)
        wl = T("water", 22, color=FL_C).move_to(P(-4.0, -3.35))
        ml = T("mercury", 22, color=MUTED).move_to(P(-0.15, -3.35))
        j1 = M(r"h = \frac{2T\cos\theta}{r\rho g}", 56).move_to(P(4.0, 2.3))
        j1b = boxed(j1)
        j2 = M(r"r = 0.2\ \text{mm}:\ h = 7.2\ \text{cm}", 36, color=GREEN).move_to(P(4.0, 0.8))
        j3 = M(r"h \propto \frac1r", 40).move_to(P(4.0, -0.3))
        j4 = M(r"\theta \approx 140^\circ:\ \cos\theta < 0,\ \text{pushed down}", 30, color=MUTED).move_to(P(4.0, -1.5))
        for m in (j2, j4):
            fit(m, 4.9)
        with self.voiceover("In a thin glass tube, surface tension around the rim holds up a column: h equals "
                            "two T cos theta over r rho g. In a tube of radius zero point two millimetres, "
                            "water rises seven point two centimetres, and a narrower tube lifts it higher. "
                            "Mercury, with a contact angle near one hundred and forty degrees, is pushed "
                            "down.") as vo:
            self.play(FadeIn(bath), Create(bath_o), Create(lvl), FadeIn(wl), run_time=0.8)
            self.play(Create(w_w), run_time=0.5)
            self.play(GrowFromEdge(w_c, DOWN), run_time=0.9)
            self.play(Create(w_m), run_time=0.4)
            self.play(Write(j1), Create(j1b), run_time=1.4)
            self.wait(vo.duration * 0.05)
            self.play(Write(j2), run_time=1.0)
            self.play(Create(n_w), run_time=0.5)
            self.play(GrowFromEdge(n_c, DOWN), Create(n_m), Write(j3), run_time=1.1)
            self.wait(vo.duration * 0.05)
            self.play(FadeIn(merc), Create(merc_o), FadeIn(ml), Create(m_w), run_time=0.8)
            self.play(FadeIn(m_c), Create(m_m), FadeIn(j4), run_time=0.9)

        self.clear_scene(0.5)
        bath = water_rect(-5.6, -1.4, -3.0, surf_y)
        bath_o = tank(-5.6, -1.4, -3.0, -1.1)
        x = -3.5
        half = 0.14
        walls = VGroup(Line(P(x - half, -2.6), P(x - half, 0.0), color=INK, stroke_width=3),
                       Line(P(x + half, -2.6), P(x + half, 0.0), color=INK, stroke_width=3))
        men = ArcBetweenPoints(P(x - half, 0.0), P(x + half, 0.0), angle=0.9, color=FL_C, stroke_width=4)
        colm = column_under(men, x, half, -2.6)
        want = DashedLine(P(x - 0.9, 1.5), P(x + 0.9, 1.5), color=MUTED, stroke_width=3)
        want_l = T("would rise to 7.2 cm", 22, color=MUTED).next_to(want, UP, buff=0.15)
        drops = VGroup(*[Dot(P(x + dx, 0.45 + dy), radius=0.06, color=FL_C)
                         for dx, dy in ((-0.3, 0.3), (0.0, 0.6), (0.3, 0.3), (-0.5, -0.1), (0.5, -0.1))])
        xm = cross_mark().scale(0.8).next_to(drops, RIGHT, buff=0.5)
        k1 = M(r"hR = \frac{2T}{\rho g}\ \ \text{fixed}", 46).move_to(P(3.3, 1.4))
        k2 = T("the meniscus just flattens", 28, color=FL_C).move_to(P(3.3, 0.1))
        k3 = T("a capillary is not a pump", 32, color=PRIMARY, weight="BOLD").move_to(P(3.3, -1.2))
        with self.voiceover("And a short tube never overflows. The meniscus just flattens. A capillary is not "
                            "a pump.") as vo:
            self.play(FadeIn(bath), Create(bath_o), Create(walls), FadeIn(colm), Create(men), run_time=0.8)
            self.play(Create(want), FadeIn(want_l), FadeIn(drops), FadeIn(xm), run_time=0.8)
            self.play(Write(k1), FadeIn(k2), run_time=1.2)
            self.play(FadeIn(k3, shift=0.15 * UP), run_time=0.6)

    # ------------------------------------------------------------ scene 7: recap
    def s7(self):
        title = T("Chapter 3 in six lines", 38, color=PRIMARY, weight="BOLD").move_to(P(0, 3.25))
        lines = [
            (r"\sigma = \frac{F}{A},\quad \Delta L = \frac{FL}{AY}", "stress, strain, moduli"),
            (r"p = p_0 + \rho g h,\quad F_B = \rho_f V_{\text{sub}}\,g", "Pascal and Archimedes"),
            (r"Av = \text{const},\quad p + \tfrac12\rho v^2 + \rho g h = \text{const}", "continuity, Bernoulli"),
            (r"v_t = \frac{2r^2(\rho - \sigma)g}{9\eta}", "terminal speed grows as r²"),
            (r"\Delta p = \frac{2T}{r}\quad \Big(\frac{4T}{r}\ \text{for a soap bubble}\Big)", "surface tension"),
            (r"h = \frac{2T\cos\theta}{r\rho g}", "capillary rise"),
        ]
        rows = VGroup()
        for i, (tex, note) in enumerate(lines):
            num = T(f"{i + 1}.", 26, color=PRIMARY, weight="BOLD")
            m = fit(M(tex, 34), 7.2)
            n = T(note, 24, color=MUTED)
            rows.add(VGroup(num, m, n))
        rows.arrange(DOWN, buff=0.22).move_to(P(0, -0.15))
        for r in rows:
            y = r.get_y()
            r[0].move_to(P(-6.3, y))
            r[1].move_to(P(0, y)).align_to(P(-5.85, 0, ), LEFT)
            r[2].move_to(P(0, y)).align_to(P(1.75, 0), LEFT)
        with self.voiceover("To recap. Stress over strain gives a modulus. Fluids at rest obey p equals p "
                            "nought plus rho g h, with Pascal and Archimedes.") as vo:
            self.play(FadeIn(title), run_time=0.6)
            self.play(FadeIn(rows[0], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.25)
            self.play(FadeIn(rows[1], shift=0.15 * UP), run_time=0.7)
        with self.voiceover("Flowing fluids obey continuity and Bernoulli. Viscosity gives terminal speeds "
                            "growing as r squared. And surfaces cost energy, giving excess pressure and "
                            "capillary rise.") as vo:
            self.play(FadeIn(rows[2], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.15)
            self.play(FadeIn(rows[3], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.15)
            self.play(FadeIn(rows[4], shift=0.15 * UP), run_time=0.7)
            self.play(FadeIn(rows[5], shift=0.15 * UP), run_time=0.7)
        with self.voiceover("Try the mastery quiz. Then chapter four turns to heat, and to what the molecules "
                            "of a gas are doing.") as vo:
            nxt = T("Next: Chapter 4 · Heat and Kinetic Theory", 32, color=PRIMARY).move_to(P(0, -3.45))
            self.wait(vo.duration * 0.3)
            self.play(FadeIn(nxt, shift=0.2 * UP), run_time=0.8)
