import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

# Chapter colour roles (light background).
C1 = PRIMARY  # equation / column 1
C2 = ManimColor("#2B6CB0")  # equation / column 2
HL = ManimColor("#D19A00")  # target B, highlights
AREA = ACCENT
UNIQ = GREEN
NONE_C = PRIMARY
INF_C = PURPLE
GRID_D = ManimColor("#DCCBC2")


def T(s, size=28, **kw):
    return Text(s, font_size=size, **kw)


def M(*s, size=40, **kw):
    return MathTex(*s, font_size=size, **kw)


def header(s):
    return T(s, 24, color=MUTED).to_corner(UL, buff=0.4)


def plane(xr, yr, unit, origin):
    pl = NumberPlane(
        x_range=[xr[0], xr[1], 1], y_range=[yr[0], yr[1], 1],
        x_length=unit * (xr[1] - xr[0]), y_length=unit * (yr[1] - yr[0]),
        background_line_style={"stroke_color": GRID_D, "stroke_width": 2, "stroke_opacity": 1},
        axis_config={"stroke_color": MUTED, "stroke_width": 3, "include_ticks": False},
        faded_line_ratio=1,
    )
    pl.faded_lines.set_opacity(0)
    pl.shift(np.array([origin[0], origin[1], 0.0]) - pl.c2p(0, 0))
    return pl


def mapper(origin, unit):
    o = np.array([origin[0], origin[1], 0.0])

    def P(x, y):
        return o + unit * np.array([x, y, 0.0])

    return P


def arrow(a, b, color, sw=6):
    return Arrow(a, b, buff=0, color=color, stroke_width=sw,
                 max_tip_length_to_length_ratio=0.25, max_stroke_width_to_length_ratio=12)


def poly(pts, color, op=0.4, sw=3):
    return Polygon(*pts, color=color, fill_color=color, fill_opacity=op, stroke_width=sw)


def bg(mob, op=0.9):
    mob.add_background_rectangle(color=BG, opacity=op, buff=0.06)
    return mob


def cross_out(mob, color=PRIMARY):
    return Line(mob.get_corner(DL), mob.get_corner(UR), color=color, stroke_width=5)


def clip_line(a, b, c, xr, yr):
    """Segment of ax + by = c inside the box xr x yr (Liang-Barsky), or None."""
    n2 = a * a + b * b
    if n2 < 1e-12:
        return None
    x0, y0 = c * a / n2, c * b / n2
    n = np.sqrt(n2)
    dx, dy = -b / n, a / n
    t0, t1 = -1e3, 1e3
    for p, q in ((-dx, x0 - xr[0]), (dx, xr[1] - x0), (-dy, y0 - yr[0]), (dy, yr[1] - y0)):
        if abs(p) < 1e-12:
            if q < 0:
                return None
            continue
        r = q / p
        if p < 0:
            t0 = max(t0, r)
        else:
            t1 = min(t1, r)
    if t0 >= t1:
        return None
    return (x0 + t0 * dx, y0 + t0 * dy), (x0 + t1 * dx, y0 + t1 * dy)


def line_mob(P, a, b, c, xr, yr, color, sw=5):
    seg = clip_line(a, b, c, xr, yr)
    if seg is None:
        return VMobject()
    (xa, ya), (xb, yb) = seg
    return Line(P(xa, ya), P(xb, yb), color=color, stroke_width=sw)


def badge(text, color, size=26):
    t = T(text, size, color=color, weight="BOLD")
    box = SurroundingRectangle(t, buff=0.16, corner_radius=0.12, color=color, stroke_width=3)
    box.set_fill(BG, opacity=1)
    return VGroup(box, t)


def aug(rows, size=38):
    """Augmented matrix [A | B] with a bar before the last column."""
    m = Matrix([[str(v) for v in r] for r in rows], left_bracket="[", right_bracket="]",
               element_to_mobject=lambda s: MathTex(s, font_size=size, color=INK),
               h_buff=1.0, v_buff=0.75)
    m.get_brackets().set_color(INK)
    cols = m.get_columns()
    x = (cols[-2].get_right()[0] + cols[-1].get_left()[0]) / 2
    ents = m.get_entries()
    top, bot = ents.get_top()[1] + 0.1, ents.get_bottom()[1] - 0.1
    bar = Line([x, top, 0], [x, bot, 0], color=INK, stroke_width=3)
    m.add(bar)
    return m


class MatricesCh4Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Matrices",
            "Chapter 4 · Solving Systems of Linear Equations",
            "Matrices, chapter four. Solving systems of linear equations.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7, self.s8, self.s9):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ 1: row picture
    def s1(self):
        h = bg(header("4.1 · Two Pictures of a System")).set_z_index(8)
        xr, yr, u = (-1, 6), (-2, 5), 0.8
        O = (-3.4 - 2.5 * u, -0.4 - 1.5 * u)
        P = mapper(O, u)
        pl = plane(xr, yr, u, O)
        l1 = line_mob(P, 1, 1, 4, xr, yr, C1, 8)
        a2, b2, c2 = ValueTracker(1.0), ValueTracker(-1.0), ValueTracker(0.0)
        l2 = always_redraw(lambda: line_mob(P, a2.get_value(), b2.get_value(), c2.get_value(), xr, yr, C2, 5))
        dot = Dot(P(2, 2), color=UNIQ, radius=0.11).set_z_index(3)
        dl = bg(M("(2,2)", size=32, color=UNIQ)).next_to(P(2, 2), RIGHT, buff=0.15)

        RX = 3.9
        e1 = M("x + y = 4", size=44, color=C1).move_to([RX, 1.6, 0])
        e2 = M("x - y = 0", size=44, color=C2).move_to([RX, 0.7, 0])
        b_one = badge("one solution", UNIQ).move_to([RX, -0.8, 0])

        with self.voiceover("Here are two equations: x plus y equals four, and x minus y equals zero. "
                            "Each one is a straight line. A solution is a point on both lines at once, "
                            "so solving means finding where they meet. Here, that is the point two, two.") as vo:
            self.play(FadeIn(h), Create(pl), run_time=1.2)
            self.play(Write(e1), Create(l1), run_time=1.2)
            self.play(Write(e2), Create(l2), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.6 - 3.6))
            self.play(FadeIn(dot, scale=0.5), FadeIn(dl), run_time=0.8)
            self.play(FadeIn(b_one), run_time=0.6)

        e2p = M("x + y = 1", size=44, color=C2).move_to(e2)
        e2c = M("x + y = 4", size=44, color=C2).move_to(e2)
        b_none = badge("parallel: no solution", NONE_C).move_to(b_one)
        b_inf = badge("same line: infinitely many", INF_C).move_to(b_one)
        with self.voiceover("But two lines do not have to cross. Tilt one until the slopes match, "
                            "and they run parallel. They never meet: no solution. "
                            "Slide it on top of the other, and every point works: infinitely many solutions.") as vo:
            self.play(FadeOut(dot), FadeOut(dl), FadeOut(b_one), run_time=0.5)
            self.play(b2.animate.set_value(1.0), c2.animate.set_value(1.0),
                      Transform(e2, e2p), run_time=2.2)
            self.play(FadeIn(b_none), run_time=0.6)
            self.wait(max(0.1, vo.duration * 0.55 - 3.3))
            self.play(c2.animate.set_value(4.0), Transform(e2, e2c), FadeOut(b_none), run_time=2.0)
            self.play(FadeIn(b_inf), run_time=0.6)

        cases = VGroup(
            badge("1", UNIQ, 34), badge("0", NONE_C, 34), badge("∞", INF_C, 34),
        ).arrange(RIGHT, buff=0.5)
        two = T("2", 34, color=MUTED, weight="BOLD")
        cases.add(two)
        cases.arrange(RIGHT, buff=0.5).move_to([RX, -2.3, 0])
        xo = cross_out(two)
        with self.voiceover("One, none, or infinitely many. Never exactly two. "
                            "And counting equations and unknowns cannot tell you which. This chapter can.") as vo:
            for b in cases[:3]:
                self.play(FadeIn(b, scale=0.7), run_time=0.5)
            self.play(FadeIn(two), run_time=0.4)
            self.play(Create(xo), run_time=0.5)
        l2.clear_updaters()

    # ------------------------------------------------------------ 2: column picture
    def s2(self):
        h = bg(header("4.1 · The Column Picture")).set_z_index(8)
        xr, yr, u = (-1, 5), (-3, 4), 0.85
        O = (-3.6 - 2 * u, -0.4 - 0.5 * u)
        P = mapper(O, u)
        o = P(0, 0)
        pl = plane(xr, yr, u, O)
        a1 = arrow(o, P(1, 1), C1)
        a2 = arrow(o, P(1, -1), C2)
        la1 = bg(M(r"\begin{pmatrix}1\\1\end{pmatrix}", size=26, color=C1)).next_to(P(1, 1), UL, buff=0.05)
        la2 = bg(M(r"\begin{pmatrix}1\\-1\end{pmatrix}", size=26, color=C2)).next_to(P(1, -1), DL, buff=0.05)
        B = Dot(P(4, 0), color=HL, radius=0.12).set_z_index(3)
        lB = bg(M("B", size=34, color=HL)).next_to(P(4, 0), UR, buff=0.1)

        RX = 3.5
        eq = M(r"x", r"\begin{pmatrix}1\\1\end{pmatrix}", r"+\,y", r"\begin{pmatrix}1\\-1\end{pmatrix}",
               r"=", r"\begin{pmatrix}4\\0\end{pmatrix}", size=40).move_to([RX, 1.8, 0])
        eq[1].set_color(C1)
        eq[3].set_color(C2)
        eq[5].set_color(HL)
        with self.voiceover("Now read the same system by columns. x times the column one, one, "
                            "plus y times the column one, negative one, has to equal four, zero.") as vo:
            self.play(FadeIn(h), Create(pl), run_time=1.0)
            self.play(Write(eq), run_time=1.5)
            self.play(GrowArrow(a1), FadeIn(la1), GrowArrow(a2), FadeIn(la2), run_time=1.2)
            self.play(FadeIn(B, scale=0.5), FadeIn(lB), run_time=0.6)

        s1 = arrow(o, P(2, 2), C1, 7)
        s2 = arrow(P(2, 2), P(4, 0), C2, 7)
        ans = M(r"2", r"\begin{pmatrix}1\\1\end{pmatrix}", r"+\,2", r"\begin{pmatrix}1\\-1\end{pmatrix}",
                r"=", r"\begin{pmatrix}4\\0\end{pmatrix}", size=40).move_to([RX, 0.1, 0])
        ans[1].set_color(C1)
        ans[3].set_color(C2)
        ans[5].set_color(HL)
        q = T("Which input X does A send to B?", 26, color=HL, weight="BOLD").move_to([RX, -1.5, 0])
        with self.voiceover("So the question changes: how much of each column do you need to reach the target? "
                            "Two of the first, then two of the second. Same answer, but a new question: "
                            "which input does the matrix A send to B?") as vo:
            self.play(FadeOut(la1), FadeOut(la2), run_time=0.3)
            self.play(GrowArrow(s1), run_time=1.0)
            self.play(GrowArrow(s2), run_time=1.0)
            self.play(Indicate(B, color=HL, scale_factor=1.6), Write(ans), run_time=1.4)
            self.wait(max(0.1, vo.duration * 0.7 - 3.7))
            self.play(FadeIn(q, shift=0.2 * UP), run_time=0.8)

        p1 = arrow(o, P(1, 2), C1)
        p2 = arrow(o, P(-1, -2), C2)
        span = DashedLine(P(-1.5, -3), P(2, 4), color=MUTED, stroke_width=3)
        ls = bg(T("every combination", 20, color=MUTED)).next_to(P(-1.35, -2.7), RIGHT, buff=0.3)
        bad = Dot(P(3, 1), color=NONE_C, radius=0.1)
        badl = bg(T("unreachable", 20, color=NONE_C)).next_to(P(3, 1), DOWN, buff=0.15)
        good = Dot(P(1.5, 3), color=UNIQ, radius=0.1)
        goodl = bg(T("many ways", 20, color=UNIQ)).next_to(P(1.5, 3), RIGHT, buff=0.15)
        pe = M(r"x", r"\begin{pmatrix}1\\2\end{pmatrix}", r"+\,y", r"\begin{pmatrix}-1\\-2\end{pmatrix}",
               size=40).move_to([RX, -2.6, 0])
        pe[1].set_color(C1)
        pe[3].set_color(C2)
        with self.voiceover("If the two columns were parallel, every combination would stay on one line through the origin. "
                            "A target off that line can never be reached. A target on it is reached in infinitely many ways.") as vo:
            self.play(FadeOut(s1), FadeOut(s2), FadeOut(a1), FadeOut(a2), FadeOut(B), FadeOut(lB),
                      FadeOut(q), run_time=0.6)
            self.play(GrowArrow(p1), GrowArrow(p2), FadeIn(pe), run_time=1.0)
            self.play(Create(span), FadeIn(ls), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.45 - 2.6))
            self.play(FadeIn(bad, scale=0.5), FadeIn(badl), run_time=0.7)
            self.wait(max(0.1, vo.duration * 0.2 - 0.7))
            self.play(FadeIn(good, scale=0.5), FadeIn(goodl), run_time=0.7)

    # ------------------------------------------------------------ 3: inverse method
    def s3(self):
        h = header("4.2 · Matrix Form and the Inverse Method")
        X = M("X", size=56)
        box = VGroup(RoundedRectangle(width=1.6, height=1.2, corner_radius=0.15, color=INK, stroke_width=3),
                     M("A", size=56))
        Bm = M("B", size=56, color=HL)
        row = VGroup(X, box, Bm).arrange(RIGHT, buff=1.5).move_to([0, 1.6, 0])
        f1 = Arrow(X.get_right(), box.get_left(), buff=0.15, color=INK, stroke_width=5)
        f2 = Arrow(box.get_right(), Bm.get_left(), buff=0.15, color=INK, stroke_width=5)
        back = CurvedArrow(Bm.get_bottom() + 0.15 * DOWN, X.get_bottom() + 0.15 * DOWN, angle=-PI / 2.2,
                           color=INF_C, stroke_width=5)
        bl = M(r"A^{-1}", size=44, color=INF_C).next_to(back, DOWN, buff=0.1)
        with self.voiceover("Solving A X equals B means running the machine backwards: "
                            "given the output B, find the input X. Chapter three built the undo button: A inverse.") as vo:
            self.play(FadeIn(h), FadeIn(X), Create(box), run_time=1.0)
            self.play(GrowArrow(f1), GrowArrow(f2), FadeIn(Bm), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.5 - 2.0))
            self.play(Create(back), FadeIn(bl), run_time=1.2)

        mg = VGroup(row, f1, f2, back, bl)
        d1 = M(r"A^{-1}(AX) = A^{-1}B", size=42)
        d2 = M(r"(A^{-1}A)X = A^{-1}B", size=42)
        d3 = M(r"X = A^{-1}B", size=50, color=UNIQ)
        col = VGroup(d1, d2, d3).arrange(DOWN, buff=0.4, aligned_edge=LEFT).move_to([-3.2, -0.6, 0])
        fr = SurroundingRectangle(d3, color=UNIQ, buff=0.15, corner_radius=0.1)
        wrong = M(r"X = BA^{-1}", size=46).move_to([3.4, -0.1, 0])
        xo = cross_out(wrong)
        why = T("(3×1)(3×3): not defined", 22, color=NONE_C).next_to(wrong, DOWN, buff=0.35)
        with self.voiceover("Multiply both sides on the left by A inverse. A inverse times A is the identity, "
                            "so X equals A inverse B. Order matters. It is A inverse times B, "
                            "never B times A inverse; that product is not even defined.") as vo:
            self.play(mg.animate.scale(0.6).move_to([3.6, 2.3, 0]), run_time=0.8)
            self.play(Write(d1), run_time=1.0)
            self.play(Write(d2), run_time=1.0)
            self.play(Write(d3), Create(fr), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.6 - 3.8))
            self.play(FadeIn(wrong), run_time=0.5)
            self.play(Create(xo), FadeIn(why), run_time=0.8)

        keep = VGroup(d3, fr)
        ex1 = M(r"2x + y = 3,\quad x + y = 2", size=40)
        ex2 = M(r"A = \begin{pmatrix}2&1\\1&1\end{pmatrix},\quad B = \begin{pmatrix}3\\2\end{pmatrix},\quad |A| = 1",
                size=38)
        ex3 = M(r"A^{-1} = \begin{pmatrix}1&-1\\-1&2\end{pmatrix}", size=38)
        ex4 = M(r"X = \begin{pmatrix}1&-1\\-1&2\end{pmatrix}\begin{pmatrix}3\\2\end{pmatrix}"
                r" = \begin{pmatrix}3-2\\-3+4\end{pmatrix} = ", r"\begin{pmatrix}1\\1\end{pmatrix}", size=38)
        ex4[1].set_color(UNIQ)
        exs = VGroup(ex1, ex2, ex3, ex4).arrange(DOWN, buff=0.35).move_to([0, -0.5, 0])
        chk = T("check: 2 + 1 = 3 ✓   1 + 1 = 2 ✓", 24, color=UNIQ).to_edge(DOWN, buff=0.35)
        with self.voiceover("Try two x plus y equals three, and x plus y equals two. The determinant is one, "
                            "so the inverse exists: one, negative one, negative one, two. "
                            "Multiply it by three, two, and X is one, one. "
                            "Check: two plus one is three, and one plus one is two.") as vo:
            self.play(FadeOut(mg), FadeOut(d1), FadeOut(d2), FadeOut(wrong), FadeOut(xo), FadeOut(why),
                      run_time=0.6)
            self.play(keep.animate.scale(0.8).move_to([4.6, 2.6, 0]), run_time=0.6)
            self.play(Write(ex1), run_time=1.0)
            self.play(FadeIn(ex2), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.25 - 3.2))
            self.play(FadeIn(ex3), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.2 - 1.0))
            self.play(Write(ex4), run_time=1.6)
            self.wait(max(0.1, vo.duration * 0.15 - 1.6))
            self.play(FadeIn(chk), run_time=0.6)

    # ------------------------------------------------------------ 4: Cramer
    def s4(self):
        h = bg(header("4.3 · Cramer's Rule")).set_z_index(8)
        RX = 3.6
        f0 = M(r"x = \frac{D_x}{D}", size=50).move_to([RX, 2.2, 0])
        fD = M(r"D = \begin{vmatrix}a_1&b_1\\a_2&b_2\end{vmatrix}", size=38)
        fDx = M(r"D_x = \begin{vmatrix}", r"c_1", r"&b_1\\", r"c_2", r"&b_2\end{vmatrix}", size=38)
        fDx[1].set_color(HL)
        fDx[3].set_color(HL)
        fg = VGroup(fD, fDx).arrange(RIGHT, buff=0.6).move_to([RX, 0.6, 0])
        note = T("x-column replaced by the constants", 22, color=HL).next_to(fg, DOWN, buff=0.3)
        with self.voiceover("Sometimes you want just one unknown. Cramer's rule gives it as a ratio of two determinants: "
                            "x equals D x over D, where D x is D with the x column replaced by the constants.") as vo:
            self.play(FadeIn(h), Write(f0), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.45 - 1.2))
            self.play(FadeIn(fg), run_time=1.0)
            self.play(Indicate(fDx[1], color=HL), Indicate(fDx[3], color=HL), FadeIn(note), run_time=1.0)

        xr, yr, u = (-1, 6), (-1, 6.5), 0.7
        O = (-3.5 - 2.5 * u, -0.45 - 2.75 * u)
        P = mapper(O, u)
        o = P(0, 0)
        pl = plane(xr, yr, u, O)
        par = poly([P(0, 0), P(2, 1), P(3, 3), P(1, 2)], AREA, 0.5)
        v1 = arrow(o, P(2, 1), C1)
        v2 = arrow(o, P(1, 2), C2)
        l1 = bg(M(r"a_1", size=30, color=C1)).next_to(P(2, 1), DR, buff=0.05)
        l2 = bg(M(r"a_2", size=30, color=C2)).next_to(P(1, 2), UL, buff=0.05)
        lD = bg(M(r"D = 3", size=28)).move_to(P(1.5, 1.5))
        Bd = Dot(P(5, 4), color=HL, radius=0.11).set_z_index(4)
        lB = bg(M(r"B = (5,4)", size=28, color=HL)).next_to(P(5, 4), RIGHT, buff=0.1).shift(0.1 * UP)
        path = VGroup(DashedLine(o, P(4, 2), color=C1, stroke_width=3),
                      DashedLine(P(4, 2), P(5, 4), color=C2, stroke_width=3))
        right2 = M(r"a_1 = \begin{pmatrix}2\\1\end{pmatrix},\; a_2 = \begin{pmatrix}1\\2\end{pmatrix}", size=34)
        right3 = M(r"B = 2a_1 + 1a_2", size=36, color=HL)
        rg = VGroup(right2, right3).arrange(DOWN, buff=0.3).move_to([RX, 0.3, 0])
        with self.voiceover("Why a column? Take the columns two, one and one, two. Their parallelogram has area D, "
                            "which is three. The target B, five, four, is two of the first column plus one of the second.") as vo:
            self.play(FadeOut(fg), FadeOut(note), f0.animate.scale(0.8).move_to([RX, 2.6, 0]), run_time=0.6)
            self.play(Create(pl), run_time=0.8)
            self.play(GrowArrow(v1), GrowArrow(v2), FadeIn(l1), FadeIn(l2), FadeIn(right2), run_time=1.0)
            self.play(FadeIn(par), FadeIn(lD), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.55 - 3.2))
            self.play(FadeIn(Bd, scale=0.5), FadeIn(lB), Create(path), FadeIn(right3), run_time=1.2)

        s = ValueTracker(1.0)

        def Bs():
            return np.array([4.0, 2.0]) + s.get_value() * np.array([1.0, 2.0])

        shear = always_redraw(lambda: poly(
            [P(0, 0), P(*Bs()), P(*(Bs() + np.array([1.0, 2.0]))), P(1, 2)], INF_C, 0.25, 3))
        bdot = always_redraw(lambda: Dot(P(*Bs()), color=HL, radius=0.11).set_z_index(4))
        r4 = M(r"D_x = \det(B,\,a_2) = 5\cdot 2 - 1\cdot 4 = 6", size=32).move_to([RX, -1.0, 0])
        r5 = M(r"D_x = 2D", size=38, color=INF_C).move_to([RX, -1.8, 0])
        r6 = M(r"x = \frac{6}{3} = 2", size=44, color=UNIQ).move_to([RX, -2.8, 0])
        mid = Line(P(2, 1), P(3, 3), color=AREA, stroke_width=3)
        with self.voiceover("Now build the parallelogram on B and the second column. Slide B back along the second column. "
                            "That is a shear, so the area does not change. What is left is two copies of the original parallelogram. "
                            "So D x is two times D, which is six, and x is six over three, which is two.") as vo:
            self.play(FadeOut(lB), FadeOut(lD), FadeOut(path), run_time=0.4)
            self.add(bdot)
            self.remove(Bd)
            self.play(FadeIn(shear), run_time=0.8)
            self.play(Write(r4), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.25 - 2.4))
            self.play(s.animate.set_value(0.0), run_time=2.5)
            self.play(Create(mid), run_time=0.5)
            self.wait(max(0.1, vo.duration * 0.25 - 3.0))
            self.play(Write(r5), run_time=0.8)
            self.play(Write(r6), run_time=1.0)
        shear.clear_updaters()
        bdot.clear_updaters()

        w1 = M(r"y = \frac{D_y}{D} = \frac{3}{3} = 1", size=40).move_to([RX, 0.2, 0])
        w2 = T("replace the column, not the row", 24, color=NONE_C, weight="BOLD").move_to([RX, -1.1, 0])
        w3 = M(r"\text{needs } D \ne 0", size=38, color=NONE_C).move_to([RX, -2.1, 0])
        with self.voiceover("The same trick gives y: three over three, which is one. "
                            "Replace the column, never the row. And Cramer needs D to be non-zero.") as vo:
            self.play(FadeOut(VGroup(rg, r4, r5, r6)), run_time=0.5)
            self.play(Write(w1), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.35 - 1.7))
            self.play(FadeIn(w2), run_time=0.7)
            self.play(FadeIn(w3), run_time=0.7)

    # ------------------------------------------------------------ 5: D = 0
    def s5(self):
        h = bg(header("4.4 · Consistency: When D = 0")).set_z_index(8)
        xr, yr, u = (-2, 5), (-2, 4), 0.8
        O = (-3.4 - 1.5 * u, -0.4 - 1.0 * u)
        P = mapper(O, u)
        pl = plane(xr, yr, u, O)
        l1 = line_mob(P, 1, 2, 3, xr, yr, C1, 8)
        c2 = ValueTracker(1.0)
        l2 = always_redraw(lambda: line_mob(P, 2, 4, c2.get_value(), xr, yr, C2, 5))
        RX = 3.9
        e1 = M("x + 2y = 3", size=42, color=C1).move_to([RX, 2.2, 0])
        e2 = M("2x + 4y = 1", size=42, color=C2).move_to([RX, 1.4, 0])
        D = M(r"D = \begin{vmatrix}1&2\\2&4\end{vmatrix} = 4 - 4 = 0", size=38).move_to([RX, 0.1, 0])
        sq = T("the matrix squashes the plane", 22, color=MUTED).next_to(D, DOWN, buff=0.3)
        with self.voiceover("Both methods divide by D. When D is zero they fall silent, "
                            "because the matrix squashes the plane flat. That leaves two possibilities.") as vo:
            self.play(FadeIn(h), Create(pl), run_time=1.0)
            self.play(Write(e1), Write(e2), Create(l1), Create(l2), run_time=1.4)
            self.play(Write(D), run_time=1.2)
            self.play(FadeIn(sq), run_time=0.6)

        b_none = badge("parallel: no solution", NONE_C).move_to([RX, -1.5, 0])
        b_inf = badge("same line: infinitely many", INF_C).move_to([RX, -1.5, 0])
        e2c = M("2x + 4y = 6", size=42, color=C2).move_to(e2)
        both = M(r"D = 0 \text{ in both cases}", size=34, color=INK).move_to([RX, -2.7, 0])
        with self.voiceover("x plus two y equals three, with two x plus four y equals one: parallel lines, no solution. "
                            "Change that one to a six, and the lines coincide: infinitely many. "
                            "D is zero both times. So D equals zero does not mean no solution.") as vo:
            self.play(FadeOut(sq), FadeIn(b_none), run_time=0.7)
            self.wait(max(0.1, vo.duration * 0.3 - 0.7))
            self.play(c2.animate.set_value(6.0), Transform(e2, e2c), FadeOut(b_none), run_time=2.0)
            self.play(FadeIn(b_inf), run_time=0.6)
            self.wait(max(0.1, vo.duration * 0.25 - 2.6))
            self.play(Write(both), run_time=1.0)
        l2.clear_updaters()

    # ------------------------------------------------------------ 6: adj test + homogeneous
    def s6(self):
        h = header("4.4 · The Adjoint Test and Homogeneous Systems")
        t1 = M(r"(\operatorname{adj}A)B \ne O", r"\;\Rightarrow\;", r"\text{no solution}", size=40)
        t1[2].set_color(NONE_C)
        t2 = M(r"(\operatorname{adj}A)B = O", r"\;\Rightarrow\;", r"\text{check!}", size=40)
        t2[2].set_color(HL)
        tg = VGroup(t1, t2).arrange(DOWN, buff=0.4, aligned_edge=LEFT).move_to([0, 1.7, 0])
        w0 = T("Three parallel planes", 26, color=NONE_C, weight="BOLD")
        w1 = M(r"x + y + z = 1,\quad x + y + z = 2,\quad x + y + z = 3", size=36)
        w2 = M(r"D = D_1 = D_2 = D_3 = 0", size=38)
        w3 = T("... and still no solution", 26, color=NONE_C)
        wg = VGroup(w0, w1, w2, w3).arrange(DOWN, buff=0.3)
        wbox = SurroundingRectangle(wg, buff=0.3, corner_radius=0.15, color=NONE_C, stroke_width=3)
        wcard = VGroup(wbox, wg).move_to([0, -1.6, 0])
        with self.voiceover("The test: if adj A times B is not zero, there is no solution. "
                            "If it is zero, you still have to check. Three parallel planes, "
                            "x plus y plus z equals one, two and three, pass every determinant test, "
                            "and still have no solution.") as vo:
            self.play(FadeIn(h), Write(t1), run_time=1.3)
            self.wait(max(0.1, vo.duration * 0.25 - 1.3))
            self.play(Write(t2), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.15 - 1.2))
            self.play(Create(wbox), FadeIn(w0), FadeIn(w1), run_time=1.2)
            self.play(FadeIn(w2), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.2 - 2.0))
            self.play(FadeIn(w3), run_time=0.7)

        xr, yr, u = (-4, 4), (-3, 3), 0.7
        O = (-3.4, -0.4)
        P = mapper(O, u)
        o = P(0, 0)
        pl = plane(xr, yr, u, O)
        dots = VGroup(*[Dot(P(2 * t, -t), color=INF_C, radius=0.09) for t in (-1.5, -1.0, -0.5, 0.5, 1.0, 1.5)])
        dline = DashedLine(P(-3, 1.5), P(3, -1.5), color=INF_C, stroke_width=3)
        od = Dot(o, color=INK, radius=0.09).set_z_index(3)
        RX = 3.6
        m = M(r"A = \begin{pmatrix}1&2\\2&4\end{pmatrix}", size=38).move_to([RX, 2.2, 0])
        h1 = M(r"AX = O", size=46).move_to([RX, 1.0, 0])
        h2 = T("X = O always works", 24, color=UNIQ).move_to([RX, 0.1, 0])
        h3 = M(r"|A| = 0 \iff \text{non-trivial solutions}", size=36, color=INF_C).move_to([RX, -1.1, 0])
        h4 = T("a whole line lands on the origin", 22, color=INF_C).move_to([RX, -2.0, 0])
        with self.voiceover("A homogeneous system, A X equals zero, always has the trivial solution, X equals zero. "
                            "It has other solutions exactly when the determinant is zero, "
                            "because then a whole line of inputs is squashed onto the origin.") as vo:
            self.play(FadeOut(tg), FadeOut(wcard), run_time=0.5)
            h_new = header("4.4 · Homogeneous Systems")
            self.play(Transform(h, h_new), Create(pl), FadeIn(m), run_time=1.0)
            self.play(Write(h1), FadeIn(od), run_time=0.8)
            self.play(FadeIn(h2), run_time=0.6)
            self.play(Create(dline), FadeIn(dots), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.45 - 3.7))
            img = line_mob(P, 2, -1, 0, xr, yr, MUTED, 7)
            il = bg(T("the whole plane lands here", 20, color=MUTED)).next_to(P(1.5, 3), RIGHT, buff=0.15)
            self.play(ApplyMatrix([[1, 2], [2, 4]], VGroup(dots, dline), about_point=o),
                      pl.animate.set_opacity(0.35), Create(img), run_time=2.2)
            self.play(FadeIn(il), FadeIn(h3), FadeIn(h4), run_time=0.8)

    # ------------------------------------------------------------ 7: row reduction
    def s7(self):
        h = header("4.5 · Row Reduction")
        R0 = [[1, 1, 1, 6], [2, -1, 1, 3], [1, 2, -1, 2]]
        R1 = [[1, 1, 1, 6], [0, -3, -1, -9], [0, 1, -2, -4]]
        R2 = [[1, 1, 1, 6], [0, 1, -2, -4], [0, -3, -1, -9]]
        R3 = [[1, 1, 1, 6], [0, 1, -2, -4], [0, 0, -7, -21]]
        MC = np.array([-2.8, 0.6, 0])
        m = aug(R0).move_to(MC)
        sys_ = M(r"x + y + z = 6,\;\; 2x - y + z = 3,\;\; x + 2y - z = 2", size=34).move_to([0, 2.7, 0])
        lab = T("[ A | B ]", 26, color=MUTED).next_to(m, DOWN, buff=0.35)
        RX = 3.7
        mv = VGroup(
            VGroup(T("swap", 24, color=MUTED), M(r"R_i \leftrightarrow R_j", size=38)),
            VGroup(T("scale", 24, color=MUTED), M(r"R_i \to kR_i\;\;(k \ne 0)", size=38)),
            VGroup(T("add", 24, color=MUTED), M(r"R_i \to R_i + kR_j", size=38)),
        )
        for g in mv:
            g.arrange(DOWN, buff=0.12)
        mv.arrange(DOWN, buff=0.45).move_to([RX, 0.3, 0])
        with self.voiceover("Row reduction settles every case. Write the augmented matrix: coefficients, a bar, "
                            "then the constants. Three moves never change the solutions: swap two rows, "
                            "scale a row, or add a multiple of one row to another.") as vo:
            self.play(FadeIn(h), Write(sys_), run_time=1.2)
            self.play(FadeIn(m), FadeIn(lab), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.45 - 2.2))
            for g in mv:
                self.play(FadeIn(g, shift=0.2 * UP), run_time=0.6)

        ops = [
            (R1, r"R_2 \to R_2 - 2R_1,\;\; R_3 \to R_3 - R_1"),
            (R2, r"R_2 \leftrightarrow R_3"),
            (R3, r"R_3 \to R_3 + 3R_2"),
        ]
        with self.voiceover("Clear the first column below the pivot. Swap the last two rows. "
                            "Then clear the second column. Now the matrix is a staircase: echelon form.") as vo:
            self.play(FadeOut(mv), FadeOut(lab), run_time=0.5)
            op_prev = None
            for rows, tex in ops:
                op = M(tex, size=34, color=HL).next_to(m, DOWN, buff=0.4)
                nm = aug(rows).move_to(MC)
                anims = [Transform(m, nm)]
                if op_prev is not None:
                    anims.append(FadeOut(op_prev))
                self.play(FadeIn(op), run_time=0.5)
                self.play(*anims, run_time=1.1)
                op_prev = op
                self.wait(max(0.1, vo.duration * 0.22 - 1.6))
            self.play(FadeOut(op_prev), run_time=0.3)
            ents = m[0]  # entries of the transformed matrix (4 per row)
            piv = VGroup(*[SurroundingRectangle(ents[i], color=HL, buff=0.1, stroke_width=3)
                           for i in (0, 5, 10)])
            ech = T("echelon form", 26, color=HL, weight="BOLD").next_to(m, DOWN, buff=0.4)
            self.play(Create(piv), FadeIn(ech), run_time=0.9)

        b1 = M(r"-7z = -21 \Rightarrow z = 3", size=38)
        b2 = M(r"y - 2z = -4 \Rightarrow y = 2", size=38)
        b3 = M(r"x + y + z = 6 \Rightarrow x = 1", size=38)
        bs = VGroup(b1, b2, b3).arrange(DOWN, buff=0.45, aligned_edge=LEFT).move_to([RX, 0.4, 0])
        ansr = M(r"(x, y, z) = (1, 2, 3)", size=40, color=UNIQ).move_to([RX, -1.6, 0])
        with self.voiceover("Back-substitute from the bottom: z is three, then y is two, then x is one.") as vo:
            for b in bs:
                self.play(Write(b), run_time=max(0.6, vo.duration * 0.25))
            self.play(FadeIn(ansr), run_time=0.6)

        za = aug([[0, 0, 0, 2]], size=40)
        zb = aug([[0, 0, 0, 0]], size=40)
        ra = M(r"0 = 2", size=42, color=NONE_C)
        rb = M(r"0 = 0", size=42, color=INF_C)
        ta = T("no solution", 26, color=NONE_C, weight="BOLD")
        tb = T("free variable: infinitely many", 26, color=INF_C, weight="BOLD")
        ga = VGroup(za, ra, ta).arrange(DOWN, buff=0.4).move_to([-3.4, -0.3, 0])
        gb = VGroup(zb, rb, tb).arrange(DOWN, buff=0.4).move_to([3.0, -0.3, 0])
        rd = T("Read the whole zero row, including after the bar", 26, color=INK).move_to([0, 2.0, 0])
        with self.voiceover("Now read a zero row carefully. Zero, zero, zero, bar two, says zero equals two: no solution. "
                            "Zero, zero, zero, bar zero, says zero equals zero. One equation was redundant, "
                            "a variable is free, and there are infinitely many solutions.") as vo:
            self.play(*[FadeOut(x) for x in (m, piv, ech, bs, ansr, sys_)], run_time=0.6)
            self.play(FadeIn(rd), run_time=0.6)
            self.play(FadeIn(za), run_time=0.6)
            self.play(Write(ra), FadeIn(ta), run_time=0.9)
            self.wait(max(0.1, vo.duration * 0.4 - 2.7))
            self.play(FadeIn(zb), run_time=0.6)
            self.play(Write(rb), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.2 - 0.8))
            self.play(FadeIn(tb), run_time=0.8)

    # ------------------------------------------------------------ 8: parameters
    def s8(self):
        h = header("4.6 · Parameters and Applications")
        sy = VGroup(
            M(r"x + y + z = 6", size=40),
            M(r"x + 2y + 3z = 10", size=40),
            M(r"x + 2y + ", r"\lambda", r" z = ", r"\mu", size=40),
        ).arrange(DOWN, buff=0.25, aligned_edge=LEFT).move_to([-3.6, 1.4, 0])
        sy[2][1].set_color(HL)
        sy[2][3].set_color(HL)
        D = M(r"D = \begin{vmatrix}1&1&1\\1&2&3\\1&2&\lambda\end{vmatrix} = ", r"\lambda - 3", size=40)
        D[1].set_color(HL)
        D.move_to([3.0, 1.4, 0])
        with self.voiceover("An exam favourite. x plus y plus z equals six, x plus two y plus three z equals ten, "
                            "and x plus two y plus lambda z equals mu. First find D. It works out to lambda minus three.") as vo:
            self.play(FadeIn(h), run_time=0.5)
            for r in sy:
                self.play(Write(r), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.65 - 3.5))
            self.play(Write(D), run_time=1.4)

        cases = [
            (r"\lambda \ne 3", "unique solution", UNIQ),
            (r"\lambda = 3,\ \mu \ne 10", "no solution", NONE_C),
            (r"\lambda = 3,\ \mu = 10", "infinitely many", INF_C),
        ]
        rows = VGroup()
        for tex, txt, col in cases:
            a = M(tex, size=38)
            ar = M(r"\Rightarrow", size=38)
            b = T(txt, 26, color=col, weight="BOLD")
            rows.add(VGroup(a, ar, b))
        for r in rows:
            r[0].move_to([-2.4, 0, 0])
            r[1].move_to([0.4, 0, 0])
            r[2].next_to(r[1], RIGHT, buff=0.4)
        rows.arrange(DOWN, buff=0.45).move_to([0.2, -1.6, 0])
        for r in rows:
            r[0].set_x(-2.4)
            r[1].set_x(0.4)
            r[2].next_to(r[1], RIGHT, buff=0.4)
        with self.voiceover("If lambda is not three, D is not zero: a unique solution, whatever mu is. "
                            "If lambda is three, the last two equations have the same left side. "
                            "Then mu not equal to ten is a contradiction: no solution. "
                            "And mu equal to ten just repeats: infinitely many.") as vo:
            self.play(FadeIn(rows[0], shift=0.2 * UP), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.25 - 0.8))
            self.play(Indicate(sy[1], color=HL), Indicate(sy[2], color=HL), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.25 - 1.2))
            self.play(FadeIn(rows[1], shift=0.2 * UP), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.2 - 0.8))
            self.play(FadeIn(rows[2], shift=0.2 * UP), run_time=0.8)

        title = T("Which method?", 32, weight="BOLD").move_to([0, 2.0, 0])
        mrows = [
            ("need every unknown, D ≠ 0", r"\text{inverse: } X = A^{-1}B", C2),
            ("need just one unknown", r"\text{Cramer: } x_i = D_i / D", AREA),
            ("D = 0, or in doubt", r"\text{row reduction}", INF_C),
        ]
        mg = VGroup()
        for a, b, col in mrows:
            ta = T(a, 26)
            tb = M(b, size=38, color=col)
            mg.add(VGroup(ta, tb))
        for r in mg:
            r[0].move_to([-2.6, 0, 0])
            r[1].move_to([3.0, 0, 0])
        mg.arrange(DOWN, buff=0.55).move_to([0, -0.3, 0])
        for r in mg:
            r[0].set_x(-2.6)
            r[1].set_x(3.0)
        with self.voiceover("Choosing a method: the inverse when you need every unknown and D is not zero. "
                            "Cramer when you need just one. And row reduction when D is zero, "
                            "or whenever you are in doubt.") as vo:
            self.play(FadeOut(sy), FadeOut(D), FadeOut(rows), run_time=0.6)
            self.play(FadeIn(title), run_time=0.6)
            step = max(0.8, (vo.duration - 1.2) / 3)
            for r in mg:
                self.play(FadeIn(r, shift=0.2 * UP), run_time=0.8)
                self.wait(max(0.1, step - 0.8))

    # ------------------------------------------------------------ 9: recap
    def s9(self):
        h = T("Chapter 4 in five lines", 34, weight="BOLD").to_edge(UP, buff=0.5)
        items = [
            ("rows meet, columns combine", r"AX = B"),
            ("D ≠ 0: unique solution", r"X = A^{-1}B,\;\; x_i = \tfrac{D_i}{D}"),
            ("D = 0: none or infinitely many", r"\text{check!}"),
            ("homogeneous: non-trivial iff D = 0", r"AX = O"),
            ("row reduction reads every case", r"[\,0 \cdots 0 \mid c\,]"),
        ]
        rows = VGroup()
        for i, (txt, tex) in enumerate(items, 1):
            n = T(f"{i}.", 28, color=PRIMARY, weight="BOLD")
            t = T(txt, 26)
            m = M(tex, size=34, color=C2)
            rows.add(VGroup(n, t, m))
        rows.arrange(DOWN, buff=0.45, aligned_edge=LEFT).move_to([0, -0.2, 0])
        for r in rows:
            r[0].set_x(-6.2)
            r[1].next_to(r[0], RIGHT, buff=0.3)
            r[2].set_x(4.0)
        nxt = T("Next: Chapter 5 · Rank and Eigenvalues", 26, color=MUTED).to_edge(DOWN, buff=0.4)
        with self.voiceover("Five lines to keep. Rows are lines or planes that must meet; columns are directions "
                            "you combine to reach B. If D is not zero, the solution is unique: X equals A inverse B, "
                            "or Cramer's ratio of determinants. If D is zero, there are none or infinitely many, so check. "
                            "A homogeneous system has non-trivial solutions exactly when D is zero. "
                            "And row reduction reads every case off the staircase. "
                            "Next chapter: rank and eigenvalues, the shape of a transformation.") as vo:
            self.play(FadeIn(h), run_time=0.8)
            step = max(1.0, (vo.duration - 4.0) / 5)
            for r in rows:
                self.play(FadeIn(r, shift=0.2 * UP), run_time=0.8)
                self.wait(max(0.1, step - 0.8))
            self.play(FadeIn(nxt), run_time=0.8)
