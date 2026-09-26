import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

# Chapter colour roles (light background). i-hat is green and j-hat is red,
# matching the matrix-transform-grid interactive in the lessons.
I_C = GREEN  # i-hat / column 1
J_C = PRIMARY  # j-hat / column 2
R_C = PURPLE  # results (Av, sums)
G_C = SECONDARY  # moving grid lines
SQ_C = ACCENT  # unit square
HL = ManimColor("#D19A00")  # highlight (gold)
WARN = PRIMARY

ID = np.eye(2)


# ---------------------------------------------------------------- helpers
def T(s, size=30, **kw):
    return Text(s, font_size=size, **kw)


def M(s, size=40, **kw):
    return MathTex(s, font_size=size, **kw)


def P(x, y):
    return np.array([x, y, 0.0])


def fit(mob, w):
    if mob.width > w:
        mob.scale_to_fit_width(w)
    return mob


def arr(start, end, color=INK, sw=6, tip=0.24):
    start = np.array(start, dtype=float)
    end = np.array(end, dtype=float)
    length = np.linalg.norm(end - start)
    if length < 0.06:
        return Dot(end, radius=0.07, color=color)
    ratio = min(0.35, tip / max(length, 1e-3))
    return Arrow(start, end, buff=0, color=color, stroke_width=sw,
                 max_tip_length_to_length_ratio=ratio, max_stroke_width_to_length_ratio=20)


def card(mob, pad=0.25, color=MUTED, opacity=0.95):
    box = SurroundingRectangle(mob, buff=pad, corner_radius=0.15, color=color, stroke_width=2)
    box.set_fill(WHITE, opacity=opacity)
    g = VGroup(box, mob)
    g.set_z_index(10)
    return g


def bg(mob, opacity=0.9):
    mob.add_background_rectangle(color=BG, opacity=opacity, buff=0.06)
    return mob


def cross_out(mob):
    g = VGroup(
        Line(mob.get_corner(UL), mob.get_corner(DR), color=WARN, stroke_width=5),
        Line(mob.get_corner(DL), mob.get_corner(UR), color=WARN, stroke_width=5),
    )
    g.set_z_index(12)
    return g


def header(s):
    hd = T(s, 30, weight="BOLD", color=MUTED).to_corner(UL, buff=0.4)
    hd.add_background_rectangle(color=BG, opacity=1, buff=0.12)
    hd.set_z_index(20)
    return hd


def plane(xr, yr, unit, center):
    pl = NumberPlane(
        x_range=[xr[0], xr[1], 1], y_range=[yr[0], yr[1], 1],
        x_length=unit * (xr[1] - xr[0]), y_length=unit * (yr[1] - yr[0]),
        background_line_style={"stroke_color": GRID, "stroke_width": 2, "stroke_opacity": 1},
        axis_config={"stroke_color": MUTED, "stroke_width": 3, "include_ticks": False},
        faded_line_ratio=1,
    )
    pl.faded_lines.set_opacity(0)
    pl.shift(P(*center) - pl.c2p(0, 0))
    return pl


def pmat(rows, size=40, **kw):
    body = r" \\ ".join(" & ".join(str(x) for x in r) for r in rows)
    return M(r"\begin{pmatrix} " + body + r" \end{pmatrix}", size, **kw)


def mat(rows, **kw):
    m = Matrix(rows, left_bracket="(", right_bracket=")", **kw)
    m.set_color(INK)
    return m


def dot_grid(r, c, color=PRIMARY, pitch=0.22, rad=0.065):
    g = VGroup(*[Dot(radius=rad, color=color) for _ in range(r * c)])
    g.arrange_in_grid(rows=r, cols=c, buff=pitch - 2 * rad)
    return g


class Warp:
    """A linear map drawn as a moving grid about a fixed screen origin."""

    def __init__(self, center, unit, n=4):
        self.c = P(*center)
        self.u = unit
        self.n = n

    def pt(self, m, x, y):
        v = m @ np.array([x, y], dtype=float)
        return self.c + self.u * P(v[0], v[1])

    def grid(self, m, color=G_C):
        n = self.n
        g = VGroup()
        for k in range(-n, n + 1):
            for a, b in (((k, -n), (k, n)), ((-n, k), (n, k))):
                s, e = self.pt(m, *a), self.pt(m, *b)
                if np.linalg.norm(e - s) < 1e-3:
                    continue
                if k == 0:
                    g.add(Line(s, e, color=INK, stroke_width=3, stroke_opacity=0.8))
                else:
                    g.add(Line(s, e, color=color, stroke_width=2, stroke_opacity=0.55))
        g.set_z_index(1)
        return g

    def square(self, m):
        sq = Polygon(*[self.pt(m, *p) for p in ((0, 0), (1, 0), (1, 1), (0, 1))],
                     color=SQ_C, stroke_width=2)
        sq.set_fill(SQ_C, opacity=0.35)
        sq.set_z_index(2)
        return sq

    def basis(self, m):
        a = arr(self.c, self.pt(m, 1, 0), I_C, sw=7, tip=0.22)
        b = arr(self.c, self.pt(m, 0, 1), J_C, sw=7, tip=0.22)
        g = VGroup(a, b)
        g.set_z_index(4)
        return g


class MxCh0Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Matrices",
            "Chapter 0 · Matrices: Grids That Move the Plane",
            "Chapter zero. Matrices: grids that move the plane.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ scene 1: what a matrix is
    def s1(self):
        h = header("0.1 · What a matrix is")
        days = ["Mon", "Tue", "Wed", "Thu"]
        items = ["Pens", "Notebooks", "Erasers"]
        data = [[12, 9, 15, 10], [5, 8, 6, 7], [20, 14, 18, 11]]

        cells = VGroup()
        nums = VGroup()
        labels = VGroup()
        cells.add(T(" ", 28))
        for d in days:
            t = T(d, 28, color=MUTED, weight="BOLD")
            cells.add(t)
            labels.add(t)
        for name, row in zip(items, data):
            t = T(name, 28, color=MUTED, weight="BOLD")
            cells.add(t)
            labels.add(t)
            for x in row:
                n = M(str(x), 40)
                cells.add(n)
                nums.add(n)
        cells.arrange_in_grid(rows=4, cols=5, buff=(0.7, 0.4), col_alignments="rcccc")
        cells.move_to(P(0, -0.2))
        hline = Line(cells.get_left() + P(0, 0) , cells.get_right(), color=MUTED, stroke_width=2)
        hline.set_y((cells[1].get_bottom()[1] + cells[6].get_top()[1]) / 2)
        vline = Line(cells.get_top(), cells.get_bottom(), color=MUTED, stroke_width=2)
        vline.set_x((cells[5].get_right()[0] + cells[6].get_left()[0]) / 2)
        labels.add(hline, vline)

        with self.voiceover("A stationery shop records its sales in a grid. One row for each item: pens, "
                            "notebooks and erasers. One column for each day, Monday to Thursday.") as vo:
            self.play(FadeIn(h), run_time=0.5)
            self.play(FadeIn(labels), run_time=1.0)
            self.play(LaggedStart(*[FadeIn(n, shift=0.1 * DOWN) for n in nums], lag_ratio=0.08),
                      run_time=min(2.5, max(1.0, vo.duration - 2.0)))

        m = mat(data, v_buff=0.8, h_buff=1.1)
        s_lab = M("S =", 44)
        grp = VGroup(s_lab, m).arrange(RIGHT, buff=0.25).move_to(P(-2.6, -0.2))
        with self.voiceover("Once everyone agrees what the rows and columns mean, the labels can go. Strip "
                            "them off, put brackets around the numbers, and you have a matrix.") as vo:
            self.play(FadeOut(labels), run_time=0.8)
            self.play(*[ReplacementTransform(nums[k], m.get_entries()[k]) for k in range(12)],
                      run_time=1.2)
            self.play(FadeIn(m.get_brackets()), FadeIn(s_lab), run_time=0.8)

        rows_b = Brace(m, LEFT, color=MUTED)
        rows_t = T("3 rows", 26, color=MUTED).next_to(rows_b, LEFT, buff=0.1)
        cols_b = Brace(m, UP, color=MUTED)
        cols_t = T("4 columns", 26, color=MUTED).next_to(cols_b, UP, buff=0.1)
        order = card(VGroup(
            T("order", 26, color=MUTED),
            M(r"3 \times 4", 52),
            T("rows first, then columns", 24, color=MUTED),
        ).arrange(DOWN, buff=0.15)).move_to(P(4.6, 1.6))
        with self.voiceover("This one has three rows and four columns, so its order is three by four. "
                            "Rows always come first.") as vo:
            self.play(FadeOut(s_lab), run_time=0.3)
            self.play(GrowFromCenter(rows_b), FadeIn(rows_t), run_time=0.8)
            self.play(GrowFromCenter(cols_b), FadeIn(cols_t), run_time=0.8)
            self.play(FadeIn(order, shift=0.2 * DOWN), run_time=0.7)

        ent = m.get_entries()
        row2 = SurroundingRectangle(m.get_rows()[1], color=HL, buff=0.12, stroke_width=3)
        col3 = SurroundingRectangle(m.get_columns()[2], color=I_C, buff=0.12, stroke_width=3)
        a23 = card(VGroup(
            M(r"a_{23}", 52),
            T("row 2, column 3", 26, color=MUTED),
            M(r"a_{23} = 6", 44, color=HL),
        ).arrange(DOWN, buff=0.15)).move_to(P(4.6, -1.2))
        wrong_ring = Circle(radius=0.38, color=WARN, stroke_width=4).move_to(ent[2 * 4 + 1])
        wrong = T("column 2, row 3 gives 14: wrong", 24, color=WARN).next_to(m, DOWN, buff=0.35)
        with self.voiceover("Each entry has an address. a sub two three is the entry in row two, column "
                            "three. Here that is six, the notebooks sold on Wednesday. Read it as column "
                            "two, row three and you land on fourteen, the wrong number. Row first, then "
                            "column, every time.") as vo:
            self.play(FadeIn(a23[0]), FadeIn(a23[1][0]), FadeIn(a23[1][1]), run_time=0.6)
            self.play(Create(row2), run_time=0.7)
            self.play(Create(col3), run_time=0.7)
            self.play(Indicate(ent[1 * 4 + 2], color=HL, scale_factor=1.5), FadeIn(a23[1][2]), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.2))
            self.play(Create(wrong_ring), FadeIn(wrong), run_time=0.8)

    # ------------------------------------------------------------ scene 2: building from rules
    def s2(self):
        h = header("0.2 · Building matrices from rules")
        addr = mat([[f"a_{{{i}{j}}}" for j in (1, 2, 3)] for i in (1, 2, 3)], v_buff=0.9, h_buff=1.3)
        addr.move_to(P(-3.0, -0.3))
        vals = mat([[abs(i - j) for j in (1, 2, 3)] for i in (1, 2, 3)], v_buff=0.9, h_buff=1.3)
        vals.move_to(addr)
        rule = card(VGroup(
            M(r"a_{ij} = |\,i - j\,|", 48),
            T("order 3 × 3", 26, color=MUTED),
        ).arrange(DOWN, buff=0.2)).move_to(P(3.6, 1.8))

        with self.voiceover("Sometimes you get a rule instead of numbers. Say a sub i j equals the absolute "
                            "value of i minus j, for a three by three matrix. Every entry has an address, "
                            "and the rule turns the address into a number.") as vo:
            self.play(FadeIn(h), FadeIn(rule, shift=0.2 * DOWN), run_time=0.8)
            self.play(Write(addr), run_time=1.5)

        ae, ve = addr.get_entries(), vals.get_entries()
        diag = [0, 4, 8]
        near = [1, 3, 5, 7]
        far = [2, 6]
        mirror = DashedLine(ae[0].get_center() + P(-0.45, 0.35), ae[8].get_center() + P(0.45, -0.35),
                            color=HL, stroke_width=4)
        sym = card(VGroup(
            M(r"|\,i-j\,| = |\,j-i\,|", 40),
            T("a mirror image across the diagonal", 24, color=MUTED),
        ).arrange(DOWN, buff=0.15)).move_to(P(3.6, -0.6))
        with self.voiceover("Fill it one address at a time. On the main diagonal, i equals j, so every "
                            "diagonal entry is zero. One step off the diagonal gives one, and the far "
                            "corners give two. The matrix is a mirror image of itself across the diagonal, "
                            "because i minus j and j minus i have the same size.") as vo:
            for group, col in ((diag, R_C), (near, I_C), (far, J_C)):
                self.play(*[ReplacementTransform(ae[k], ve[k].set_color(col)) for k in group], run_time=1.0)
                self.wait(0.4)
            self.play(ReplacementTransform(addr.get_brackets(), vals.get_brackets()), run_time=0.3)
            self.play(Create(mirror), run_time=0.8)
            self.play(FadeIn(sym, shift=0.2 * UP), run_time=0.7)

        self.play(*[FadeOut(mob) for mob in (ve, vals.get_brackets(), mirror, sym, rule)], run_time=0.6)

        shapes = [(1, 12), (2, 6), (3, 4), (4, 3), (6, 2), (12, 1)]
        grids = VGroup(*[dot_grid(r, c) for r, c in shapes]).arrange(RIGHT, buff=0.6, aligned_edge=DOWN)
        grids.move_to(P(0, -0.4))
        labs = VGroup(*[M(rf"{r}\times{c}", 32).next_to(g, DOWN, buff=0.25) for g, (r, c) in zip(grids, shapes)])
        labs.align_to(labs[0], DOWN)
        q12 = T("A matrix with 12 entries: which orders?", 30).move_to(P(0, 2.7))
        ans = M(r"\text{6 orders} = \text{number of divisors of } 12", 40, color=R_C).move_to(P(0, -3.1))
        with self.voiceover("Now count shapes. A matrix with twelve entries could be one by twelve, two by "
                            "six, three by four, four by three, six by two, or twelve by one. Six orders, "
                            "one for each divisor of twelve.") as vo:
            self.play(FadeIn(q12), run_time=0.6)
            for g, lab in zip(grids, labs):
                self.play(FadeIn(g, lag_ratio=0.05), FadeIn(lab), run_time=0.55)
            self.play(Write(ans), run_time=0.9)

        g1 = dot_grid(1, 13, SECONDARY)
        g2 = dot_grid(13, 1, SECONDARY)
        pr = VGroup(g1, g2).arrange(RIGHT, buff=2.2).move_to(P(0, -0.3))
        l1 = M(r"1 \times 13", 36).next_to(g1, DOWN, buff=0.3)
        l2 = M(r"13 \times 1", 36).next_to(g2, RIGHT, buff=0.3)
        n1 = T("one row", 24, color=MUTED).next_to(g1, UP, buff=0.3)
        n2 = T("one column", 24, color=MUTED).next_to(l2, DOWN, buff=0.15, aligned_edge=LEFT)
        q13 = T("13 entries (a prime): still 2 orders, not 0", 30).move_to(P(0, 2.7))
        with self.voiceover("And a prime number of entries, like thirteen? Still two orders: one by "
                            "thirteen, a single row, or thirteen by one, a single column. Not zero.") as vo:
            self.play(FadeOut(grids), FadeOut(labs), FadeOut(ans), FadeOut(q12), run_time=0.5)
            self.play(FadeIn(q13), run_time=0.5)
            self.play(FadeIn(g1, lag_ratio=0.05), FadeIn(l1), FadeIn(n1), run_time=0.9)
            self.play(FadeIn(g2, lag_ratio=0.05), FadeIn(l2), FadeIn(n2), run_time=0.9)

    # ------------------------------------------------------------ scene 3: equality, addition, scalars
    def s3(self):
        h = header("0.3 · Equality, addition, scalar multiples")
        eq = M(r"\begin{pmatrix} 2a+b & a-2b \\ 5c-d & 4c+3d \end{pmatrix}"
               r" = \begin{pmatrix} 4 & -3 \\ 11 & 24 \end{pmatrix}", 44).move_to(P(0, 1.8))
        four = VGroup(
            M("2a+b=4", 38), M("a-2b=-3", 38), M("5c-d=11", 38), M("4c+3d=24", 38),
        ).arrange_in_grid(rows=2, cols=2, buff=(1.2, 0.35)).move_to(P(0, -0.3))
        sol = M(r"a=1,\quad b=2,\quad c=3,\quad d=4", 42, color=R_C).move_to(P(0, -2.2))
        note = T("same order, and every matching entry equal", 26, color=MUTED).next_to(eq, UP, buff=0.35)
        with self.voiceover("Two matrices are equal only when they have the same order and every matching "
                            "entry is equal. So one equation between two by two matrices is really four "
                            "ordinary equations at once.") as vo:
            self.play(FadeIn(h), run_time=0.4)
            self.play(Write(eq), FadeIn(note), run_time=1.3)
            self.play(LaggedStart(*[FadeIn(f, shift=0.15 * DOWN) for f in four], lag_ratio=0.3), run_time=1.6)
            self.play(Write(sol), run_time=1.0)

        self.play(FadeOut(VGroup(eq, four, sol, note)), run_time=0.5)

        A = mat([[1, 2, -3], [0, 4, 5]], h_buff=0.9)
        B = mat([[3, -1, 2], [1, -2, 0]], h_buff=0.9)
        S = mat([[4, 1, -1], [1, 2, 5]], h_buff=0.9)
        plus, eqs = M("+", 48), M("=", 48)
        row = VGroup(A, plus, B, eqs, S).arrange(RIGHT, buff=0.3).move_to(P(0, 1.2))
        la = M("A", 36, color=MUTED).next_to(A, UP, buff=0.2)
        lb = M("B", 36, color=MUTED).next_to(B, UP, buff=0.2)
        with self.voiceover("Addition works the same way, position by position. Add the entry at each "
                            "address in A to the entry at the same address in B, all the way across the "
                            "grid.") as vo:
            self.play(FadeIn(A), FadeIn(B), FadeIn(plus), FadeIn(la), FadeIn(lb), run_time=0.8)
            self.play(FadeIn(eqs), FadeIn(S.get_brackets()), run_time=0.4)
            ra, rb = A.get_entries()[2], B.get_entries()[2]
            box_a = SurroundingRectangle(ra, color=HL, buff=0.1)
            box_b = SurroundingRectangle(rb, color=HL, buff=0.1)
            self.play(Create(box_a), Create(box_b), run_time=0.5)
            self.play(LaggedStart(*[TransformFromCopy(VGroup(A.get_entries()[k], B.get_entries()[k]),
                                                      S.get_entries()[k]) for k in range(6)],
                                  lag_ratio=0.25), run_time=2.4)
            self.play(Indicate(S.get_entries()[2], color=HL, scale_factor=1.5), run_time=0.7)
            self.play(FadeOut(box_a), FadeOut(box_b), run_time=0.3)

        two_a = M(r"2A = \begin{pmatrix} 2 & 4 & -6 \\ 0 & 8 & 10 \end{pmatrix}", 44).move_to(P(0, -1.4))
        k_note = T("a scalar multiplies every entry", 26, color=MUTED).next_to(two_a, DOWN, buff=0.3)
        with self.voiceover("Multiplying by a number, a scalar, scales every entry. Two A doubles all six "
                            "numbers.") as vo:
            self.play(Write(two_a), run_time=1.2)
            self.play(FadeIn(k_note), run_time=0.5)

        self.play(FadeOut(VGroup(A, B, S, plus, eqs, la, lb, two_a, k_note)), run_time=0.5)

        ga = dot_grid(2, 3, PRIMARY, pitch=0.6, rad=0.13)
        gb = dot_grid(3, 2, SECONDARY, pitch=0.6, rad=0.13)
        pl2 = M("+", 60)
        pair = VGroup(ga, pl2, gb).arrange(RIGHT, buff=0.8).move_to(P(-2.2, 0))
        lga = M(r"2\times 3", 36).next_to(ga, UP, buff=0.3)
        lgb = M(r"3\times 2", 36).next_to(gb, UP, buff=0.3)
        verdict = card(VGroup(
            M(r"2\times 3 \;+\; 3\times 2", 42),
            T("not defined", 34, color=WARN, weight="BOLD"),
            T("some entries have no partner", 24, color=MUTED),
        ).arrange(DOWN, buff=0.2), color=WARN).move_to(P(3.8, 0))
        with self.voiceover("Which is why a two by three and a three by two cannot be added. Line them up "
                            "and the first has a column three the second does not. Some entries have no "
                            "partner, so the sum is simply not defined.") as vo:
            self.play(FadeIn(ga), FadeIn(gb), FadeIn(pl2), FadeIn(lga), FadeIn(lgb), run_time=0.8)
            self.play(FadeOut(pl2), FadeOut(lgb), gb.animate.align_to(ga, UL), run_time=1.2)
            lonely = VGroup(ga[2], ga[5], gb[4], gb[5])
            rings = VGroup(*[Circle(radius=0.22, color=WARN, stroke_width=4).move_to(d) for d in lonely])
            self.play(Create(rings), run_time=0.8)
            self.play(FadeIn(verdict, shift=0.2 * LEFT), run_time=0.7)

    # ------------------------------------------------------------ scene 4: a matrix is a machine
    def s4(self):
        h = header("0.4 · A matrix is a machine")
        C = (-3.4, -0.5)
        U = 0.6
        base = plane((-5, 5), (-5, 5), U, C)
        W = Warp(C, U, n=4)
        A = np.array([[2.0, -1.0], [1.0, 1.0]])
        t = ValueTracker(0)

        def cur():
            s = t.get_value()
            return (1 - s) * ID + s * A

        grid = always_redraw(lambda: W.grid(cur()))
        basis = always_redraw(lambda: W.basis(cur()))
        i_lab = bg(M(r"\hat\imath", 38, color=I_C)).next_to(W.pt(ID, 1, 0), DOWN, buff=0.15)
        j_lab = bg(M(r"\hat\jmath", 38, color=J_C)).next_to(W.pt(ID, 0, 1), LEFT, buff=0.15)
        i_lab.set_z_index(6)
        j_lab.set_z_index(6)
        intro = card(T("a 2 × 2 matrix is an instruction\nfor moving the whole plane", 28)).move_to(P(3.6, 2.2))

        with self.voiceover("So far a matrix has been a storage box. Here is the idea the whole course runs "
                            "on. A two by two matrix is an instruction for moving the entire plane. Start "
                            "with two arrows: i hat, one step right, and j hat, one step up.") as vo:
            self.play(FadeIn(h), Create(base), run_time=1.0)
            self.play(FadeIn(intro, shift=0.2 * DOWN), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.3))
            self.add(grid)
            self.play(FadeIn(basis), FadeIn(i_lab), FadeIn(j_lab), run_time=0.8)

        Amat = mat([[2, -1], [1, 1]], v_buff=0.7, h_buff=0.9)
        Am = VGroup(M("A =", 48), Amat).arrange(RIGHT, buff=0.2)
        cols = card(VGroup(Am,
                           VGroup(M(r"\hat\imath \to \begin{pmatrix} 2 \\ 1 \end{pmatrix}", 38, color=I_C),
                                  M(r"\hat\jmath \to \begin{pmatrix} -1 \\ 1 \end{pmatrix}", 38, color=J_C))
                           .arrange(RIGHT, buff=0.5)).arrange(DOWN, buff=0.3)).move_to(P(3.6, 1.6))
        c1 = SurroundingRectangle(Amat.get_columns()[0], color=I_C, buff=0.1)
        c2 = SurroundingRectangle(Amat.get_columns()[1], color=J_C, buff=0.1)
        c1.set_z_index(12)
        c2.set_z_index(12)
        with self.voiceover("Take the matrix two, minus one, one, one. Its first column is two, one. Its "
                            "second column is minus one, one. Watch the plane move. i hat lands exactly on "
                            "the first column, and j hat lands on the second.") as vo:
            self.play(FadeOut(intro), FadeIn(cols[0]), FadeIn(Am), run_time=0.7)
            self.play(Create(c1), run_time=0.5)
            self.play(Create(c2), run_time=0.5)
            self.play(FadeOut(i_lab), FadeOut(j_lab), run_time=0.3)
            self.play(t.animate.set_value(1), run_time=max(2.0, vo.duration * 0.4), rate_func=smooth)
            self.play(FadeIn(cols[1][1]), run_time=0.8)

        facts = card(VGroup(
            T("• the origin stays put", 26),
            T("• grid lines stay straight", 26),
            T("• parallel, evenly spaced", 26),
            T("= a linear transformation", 26, color=R_C, weight="BOLD"),
        ).arrange(DOWN, buff=0.18, aligned_edge=LEFT)).move_to(P(3.6, -1.7))
        o_dot = Dot(W.pt(ID, 0, 0), color=HL, radius=0.11).set_z_index(8)
        with self.voiceover("Notice what stays true. The origin does not move. Grid lines stay straight, "
                            "and parallel lines stay parallel and evenly spaced. Moves like this are "
                            "called linear, and they are exactly the ones a matrix can describe.") as vo:
            self.play(FadeIn(o_dot, scale=2), run_time=0.5)
            self.play(t.animate.set_value(0), run_time=1.2)
            self.play(t.animate.set_value(1), run_time=1.2)
            self.play(FadeIn(facts, shift=0.2 * UP), run_time=0.8)

        self.play(FadeOut(VGroup(cols, c1, c2, facts, o_dot)), run_time=0.5)

        der = card(VGroup(
            M(r"\begin{pmatrix} x \\ y \end{pmatrix} = x\,\hat\imath + y\,\hat\jmath", 38),
            M(r"A\begin{pmatrix} x \\ y \end{pmatrix} = x\begin{pmatrix} a \\ c \end{pmatrix}"
              r" + y\begin{pmatrix} b \\ d \end{pmatrix}", 38),
            M(r"\begin{pmatrix} a & b \\ c & d \end{pmatrix}\begin{pmatrix} x \\ y \end{pmatrix}"
              r" = \begin{pmatrix} ax + by \\ cx + dy \end{pmatrix}", 38, color=R_C),
        ).arrange(DOWN, buff=0.3)).move_to(P(3.7, 0.3))
        fit(der, 6.2)
        der.move_to(P(3.7, 0.3))
        with self.voiceover("Now any vector x, y is x steps of i hat plus y steps of j hat. After the move, "
                            "it is x steps of the first column plus y steps of the second. Add those up and "
                            "you get a x plus b y on top, and c x plus d y below.") as vo:
            self.play(FadeIn(der[0]), FadeIn(der[1][0]), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(FadeIn(der[1][1]), run_time=0.9)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(Write(der[1][2]), run_time=1.2)

        self.play(FadeOut(der), FadeOut(grid), FadeOut(basis), run_time=0.6)
        self.remove(grid, basis)

        O = W.pt(ID, 0, 0)
        p1 = W.pt(ID, 2, 1)
        p2 = W.pt(ID, 4, 2)
        p3 = W.pt(ID, 5, -1)
        a1 = arr(O, p1, I_C, sw=7)
        a2 = arr(p1, p2, I_C, sw=7)
        a3 = arr(p2, p3, J_C, sw=7)
        res = arr(O, p3, R_C, sw=8)
        rl = bg(M(r"A\mathbf v", 36, color=R_C)).next_to(p3, DOWN, buff=0.15)
        work = card(VGroup(
            M(r"A = \begin{pmatrix} 2 & -1 \\ 1 & 3 \end{pmatrix},\quad \mathbf v = \begin{pmatrix} 2 \\ -1 \end{pmatrix}", 36),
            M(r"2\begin{pmatrix} 2 \\ 1 \end{pmatrix} = \begin{pmatrix} 4 \\ 2 \end{pmatrix}", 36, color=I_C),
            M(r"(-1)\begin{pmatrix} -1 \\ 3 \end{pmatrix} = \begin{pmatrix} 1 \\ -3 \end{pmatrix}", 36, color=J_C),
            M(r"A\mathbf v = \begin{pmatrix} 5 \\ -1 \end{pmatrix}", 42, color=R_C),
        ).arrange(DOWN, buff=0.25)).move_to(P(3.9, 0.2))
        with self.voiceover("Try it. With A equal to two, minus one, one, three, send the vector two, minus "
                            "one. Two copies of column one reach four, two. Minus one copy of column two "
                            "adds one, minus three. The answer is five, minus one.") as vo:
            self.play(FadeIn(work[0]), FadeIn(work[1][0]), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(GrowArrow(a1), run_time=0.6)
            self.play(GrowArrow(a2), FadeIn(work[1][1]), run_time=0.8)
            self.play(GrowArrow(a3), FadeIn(work[1][2]), run_time=0.9)
            self.play(GrowArrow(res), FadeIn(rl), FadeIn(work[1][3]), run_time=0.9)

        self.play(FadeOut(VGroup(work, a1, a2, a3, res, rl)), run_time=0.5)

        right = M(r"\begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}\begin{pmatrix} 5 \\ 6 \end{pmatrix}"
                  r" = 5\begin{pmatrix} 1 \\ 3 \end{pmatrix} + 6\begin{pmatrix} 2 \\ 4 \end{pmatrix}"
                  r" = \begin{pmatrix} 17 \\ 39 \end{pmatrix}", 40)
        wrong = M(r"\begin{pmatrix} 5 \\ 24 \end{pmatrix}", 40)
        wtxt = T("entry by entry: wrong", 26, color=WARN)
        wgrp = VGroup(wrong, wtxt).arrange(RIGHT, buff=0.4)
        box = VGroup(right, wgrp).arrange(DOWN, buff=0.5)
        fit(box, 12.5)
        box.move_to(P(0, -0.3))
        panel = BackgroundRectangle(box, color=BG, fill_opacity=0.96, buff=0.4).set_z_index(9)
        box.set_z_index(10)
        x = cross_out(wrong)
        with self.voiceover("So matrix times vector is not entry by entry. One two, three four, times five "
                            "six, is five copies of the first column plus six copies of the second: "
                            "seventeen, thirty nine. Not five, twenty four.") as vo:
            self.play(FadeIn(panel), run_time=0.4)
            self.play(Write(right), run_time=2.2)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(FadeIn(wrong), run_time=0.5)
            self.play(Create(x), FadeIn(wtxt), run_time=0.7)

    # ------------------------------------------------------------ scene 5: a gallery
    def s5(self):
        h = header("0.5 · A gallery of transformations")
        C = (-3.4, -0.5)
        U = 0.6
        base = plane((-5, 5), (-5, 5), U, C)
        W = Warp(C, U, n=4)
        state = {"f": lambda s: ID}
        t = ValueTracker(0)

        def cur():
            return state["f"](t.get_value())

        grid = always_redraw(lambda: W.grid(cur()))
        sq = always_redraw(lambda: W.square(cur()))
        basis = always_redraw(lambda: W.basis(cur()))

        qs = card(VGroup(
            T("Where does î go?", 30, color=I_C),
            T("Where does ĵ go?", 30, color=J_C),
            T("Those are the columns.", 26, color=MUTED),
        ).arrange(DOWN, buff=0.2)).move_to(P(3.6, 1.8))
        with self.voiceover("Because the columns decide everything, writing the matrix for a motion takes "
                            "two questions. Where does i hat go? Where does j hat go?") as vo:
            self.play(FadeIn(h), Create(base), run_time=1.0)
            self.add(grid, sq, basis)
            self.play(FadeIn(qs, shift=0.2 * DOWN), run_time=0.8)

        def rot(a):
            return np.array([[np.cos(a), -np.sin(a)], [np.sin(a), np.cos(a)]])

        def lerp(Mx):
            Mx = np.array(Mx, dtype=float)
            return lambda s: (1 - s) * ID + s * Mx

        presets = [
            ("Stretch sideways by 2", lerp([[2, 0], [0, 1]]), [[2, 0], [0, 1]],
             "Stretch sideways by two. i hat goes to two, zero, and j hat stays put. The matrix is two, "
             "zero, zero, one."),
            ("Rotate 90° anticlockwise", lambda s: rot(s * PI / 2), [[0, -1], [1, 0]],
             "Turn a quarter turn anticlockwise. i hat goes up to zero, one, and j hat swings left to minus "
             "one, zero. Those are the columns."),
            ("Reflect in the x-axis", lerp([[1, 0], [0, -1]]), [[1, 0], [0, -1]],
             "Reflect in the x axis. i hat stays, and j hat flips down to zero, minus one."),
            ("Shear", lerp([[1, 1], [0, 1]]), [[1, 1], [0, 1]],
             "A shear keeps the x axis fixed and slides higher rows further right. i hat stays, and j hat "
             "leans over to one, one."),
            ("Project onto the x-axis", lerp([[1, 0], [0, 0]]), [[1, 0], [0, 0]],
             "Projection onto the x axis drops every point straight down. j hat is crushed to zero, and "
             "the whole plane collapses onto a line."),
        ]
        shown = None
        for k, (name, f, Mx, say) in enumerate(presets):
            lab = card(VGroup(T(name, 30, weight="BOLD"), pmat(Mx, 48)).arrange(DOWN, buff=0.3)).move_to(P(3.6, -0.6))
            with self.voiceover(say) as vo:
                anims = [FadeIn(lab, shift=0.2 * UP)]
                if k == 0:
                    anims.append(FadeOut(qs))
                if shown is not None:
                    anims.append(FadeOut(shown))
                self.play(*anims, run_time=0.6)
                state["f"] = f
                t.set_value(0)
                self.play(t.animate.set_value(1), run_time=max(1.5, min(3.0, vo.duration * 0.5)),
                          rate_func=smooth)
            shown = lab
            self.play(t.animate.set_value(0), run_time=0.6)

        self.play(FadeOut(shown), FadeOut(grid), FadeOut(sq), FadeOut(basis), FadeOut(base), run_time=0.6)
        self.remove(grid, sq, basis)

        # rotation by theta, from the unit circle
        Cc = (-3.4, -0.5)
        Ur = 2.2
        cp = plane((-1.4, 1.4), (-1.4, 1.4), Ur, Cc)
        O = P(*Cc)
        circ = Circle(radius=Ur, color=MUTED, stroke_width=3).move_to(O)
        th = ValueTracker(0.0)

        def ip():
            a = th.get_value()
            return O + Ur * P(np.cos(a), np.sin(a))

        def jp():
            a = th.get_value()
            return O + Ur * P(-np.sin(a), np.cos(a))

        ia = always_redraw(lambda: arr(O, ip(), I_C, sw=7))
        ja = always_redraw(lambda: arr(O, jp(), J_C, sw=7))
        arc = always_redraw(lambda: Arc(radius=0.55, start_angle=0, angle=max(th.get_value(), 1e-3),
                                        arc_center=O, color=HL, stroke_width=4))
        th_lab = M(r"\theta", 36, color=HL).move_to(O + P(0.8, 0.28))
        rot_card = card(VGroup(
            M(r"\hat\imath \to \begin{pmatrix} \cos\theta \\ \sin\theta \end{pmatrix}", 38, color=I_C),
            M(r"\hat\jmath \to \begin{pmatrix} -\sin\theta \\ \cos\theta \end{pmatrix}", 38, color=J_C),
            M(r"R_\theta = \begin{pmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{pmatrix}", 44),
            T("the minus sign sits top right", 24, color=MUTED),
        ).arrange(DOWN, buff=0.28)).move_to(P(3.6, 0.0))
        with self.voiceover("For a general rotation by theta, the unit circle does the work. i hat lands at "
                            "cos theta, sin theta. j hat, starting a quarter turn ahead, lands at minus sine "
                            "theta, cos theta. Put them in as columns, and the minus sign sits top "
                            "right.") as vo:
            self.play(Create(cp), Create(circ), run_time=0.8)
            self.add(ia, ja, arc)
            self.play(th.animate.set_value(0.65), run_time=1.5)
            self.play(FadeIn(th_lab), FadeIn(rot_card[0]), FadeIn(rot_card[1][0]), run_time=0.7)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(FadeIn(rot_card[1][1]), run_time=0.7)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(Write(rot_card[1][2]), run_time=1.2)
            self.play(FadeIn(rot_card[1][3]), run_time=0.5)

        self.play(FadeOut(VGroup(cp, circ, ia, ja, arc, th_lab, rot_card)), run_time=0.6)
        self.remove(ia, ja, arc)

        # a shift is not a matrix
        base2 = plane((-5, 5), (-5, 5), U, C)
        shifted = W.grid(ID, color=R_C)
        od = Dot(W.pt(ID, 0, 0), color=HL, radius=0.12).set_z_index(8)
        od_lab = bg(M(r"(2,\,0)", 32, color=HL)).next_to(W.pt(ID, 2, 0), UP, buff=0.2).set_z_index(8)
        tcard = card(VGroup(
            T("Shift right by 2", 30, weight="BOLD"),
            M(r"\mathbf 0 \to (2,\,0)", 40, color=HL),
            M(r"A\mathbf 0 = 0\cdot\text{col}_1 + 0\cdot\text{col}_2 = \mathbf 0", 36),
            T("not a matrix transformation", 28, color=WARN, weight="BOLD"),
        ).arrange(DOWN, buff=0.25)).move_to(P(3.6, 0.0))
        fit(tcard, 6.0)
        tcard.move_to(P(3.7, 0.0))
        with self.voiceover("One motion is missing from the gallery. Sliding the plane two units right moves "
                            "the origin. But every matrix sends zero to zero. So a shift is not a matrix "
                            "transformation.") as vo:
            self.play(Create(base2), FadeIn(shifted), FadeIn(od), run_time=0.8)
            self.play(FadeIn(tcard[0]), FadeIn(tcard[1][0]), run_time=0.5)
            self.play(shifted.animate.shift(2 * U * RIGHT), od.animate.shift(2 * U * RIGHT), run_time=1.5)
            self.play(FadeIn(od_lab), FadeIn(tcard[1][1]), run_time=0.6)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(FadeIn(tcard[1][2]), run_time=0.7)
            self.play(FadeIn(tcard[1][3]), run_time=0.6)

    # ------------------------------------------------------------ scene 6: recap
    def s6(self):
        h = T("Chapter 0 in five lines", 40, weight="BOLD", color=PRIMARY).to_edge(UP, buff=0.6)
        lines = VGroup(
            Tex(r"\mbox{\textbf{Order} $m \times n$: rows $\times$ columns; $a_{ij}$ is row $i$, column $j$.}"),
            Tex(r"\mbox{\textbf{Rules} $a_{ij} = f(i,j)$ build matrices; $N$ entries: one order per divisor.}"),
            Tex(r"\mbox{\textbf{Equality, $+$, $-$} go entry by entry, same order only; $kA$ scales every entry.}"),
            Tex(r"\mbox{$A\mathbf v = x\,\mathrm{col}_1 + y\,\mathrm{col}_2$: the columns are where $\hat\imath, \hat\jmath$ land.}"),
            Tex(r"\mbox{\textbf{Gallery:} stretch, rotate, reflect, shear, project. A shift is not a matrix.}"),
        )
        for ln in lines:
            ln.scale(0.95)
        lines.arrange(DOWN, buff=0.38, aligned_edge=LEFT)
        fit(lines, 12.4)
        lines.next_to(h, DOWN, buff=0.55)
        nxt = T("Next · Chapter 1: one move, then another = matrix multiplication", 26, color=SECONDARY)
        nxt.to_edge(DOWN, buff=0.5)
        say = [
            "Chapter zero in five lines. Order is rows by columns, and a sub i j sits in row i, column j.",
            "Rules build whole matrices, and a matrix with N entries has one order for each divisor of N.",
            "Equality, addition and subtraction work entry by entry, and need identical orders. A scalar "
            "multiple scales every entry.",
            "A times v is x copies of column one plus y copies of column two, because the columns are where "
            "i hat and j hat land.",
            "And scalings, rotations, reflections, shears and projections are all matrices, while shifts are "
            "not.",
        ]
        self.play(FadeIn(h), run_time=0.5)
        for ln, s in zip(lines, say):
            with self.voiceover(s) as vo:
                self.play(FadeIn(ln, shift=0.2 * RIGHT), run_time=0.8)
        with self.voiceover("Next, in chapter one: what happens when you make one move, and then "
                            "another.") as vo:
            self.play(FadeIn(nxt, shift=0.2 * UP), run_time=0.8)
