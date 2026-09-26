import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

# Chapter colour roles (light background).
I_C = PRIMARY  # i-hat and everything that happens to it = strawberry red
J_C = SECONDARY  # j-hat = teal
SQ_C = ACCENT  # the unit square = amber
B_ROLE = SECONDARY  # "B acts first"
A_ROLE = PURPLE  # "A acts second"
HL = ManimColor("#D19A00")  # highlight gold
WARN = PRIMARY

R90 = [[0, -1], [1, 0]]
SHEAR = [[1, 1], [0, 1]]


def sp(s):
    """Make `say` spell a capital letter (or letters) instead of reading a word or an article."""
    return f"[[char LTRL]]{s}[[char NORM]]"


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


def mat(rows, size=1.0, h_buff=0.9, v_buff=0.7):
    m = Matrix([[str(e) for e in r] for r in rows], left_bracket="(", right_bracket=")",
               h_buff=h_buff, v_buff=v_buff, element_alignment_corner=ORIGIN)
    return m.scale(size)


def check():
    return MathTex(r"\checkmark", color=GREEN, font_size=56)


def cross_mark():
    return MathTex(r"\times", color=WARN, font_size=64)


def arrow(start, end, color, sw=6):
    return Arrow(start, end, buff=0, color=color, stroke_width=sw,
                 max_tip_length_to_length_ratio=0.25, max_stroke_width_to_length_ratio=12)


class Grid:
    """A small plane: faint fixed reference grid, a moving grid, the unit square, i-hat and j-hat."""

    def __init__(self, center, unit=0.8, n=2, lines=True):
        self.c = np.array(center)
        self.u = unit
        self.n = n
        self.m = np.eye(2)
        L = n * unit
        ref = VGroup()
        for k in range(-n, n + 1):
            ref.add(Line(self.c + P(-L, k * unit), self.c + P(L, k * unit), color=GRID, stroke_width=2))
            ref.add(Line(self.c + P(k * unit, -L), self.c + P(k * unit, L), color=GRID, stroke_width=2))
        self.ref = ref
        mov = VGroup()
        if lines:
            for k in range(-n, n + 1):
                sw = 3 if k == 0 else 1.6
                col = INK if k == 0 else SECONDARY
                op = 0.9 if k == 0 else 0.45
                mov.add(Line(self.c + P(-L, k * unit), self.c + P(L, k * unit), color=col,
                             stroke_width=sw, stroke_opacity=op))
                mov.add(Line(self.c + P(k * unit, -L), self.c + P(k * unit, L), color=col,
                             stroke_width=sw, stroke_opacity=op))
        self.lines = mov
        self.square = Polygon(self.c, self.c + P(unit, 0), self.c + P(unit, unit), self.c + P(0, unit),
                              color=SQ_C, stroke_width=3).set_fill(SQ_C, 0.35)
        self.i = arrow(self.c, self.c + P(unit, 0), I_C)
        self.j = arrow(self.c, self.c + P(0, unit), J_C)

    def all(self):
        return VGroup(self.ref, self.lines, self.square, self.i, self.j)

    def pt(self, v):
        return self.c + P(v[0] * self.u, v[1] * self.u)

    def apply(self, matrix, run_time=1.5):
        """Animations that apply `matrix` to the current state (moving parts only)."""
        A = np.array(matrix, dtype=float)
        self.m = A @ self.m
        ni = arrow(self.c, self.pt(self.m[:, 0]), I_C) if np.linalg.norm(self.m[:, 0]) > 1e-6 else Dot(self.c, 0.06, color=I_C)
        nj = arrow(self.c, self.pt(self.m[:, 1]), J_C) if np.linalg.norm(self.m[:, 1]) > 1e-6 else Dot(self.c, 0.06, color=J_C)
        anims = [ApplyMatrix(A, self.square, about_point=self.c), Transform(self.i, ni), Transform(self.j, nj)]
        if len(self.lines):
            anims.append(ApplyMatrix(A, self.lines, about_point=self.c))
        return AnimationGroup(*anims, run_time=run_time)


class MxCh1Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Matrices",
            "Chapter 1 · Matrix Multiplication Is Composition",
            "Chapter one. Matrix multiplication is composition.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7, self.s8):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ scene 1: two machines in a row
    def s1(self):
        g = Grid(P(-3.4, -0.4), unit=0.8)
        head = T("Rotate, then shear", 34, color=INK, weight="BOLD").move_to(P(-3.4, 3.2))
        Rm = VGroup(M("R =", 38), mat(R90, 0.7)).arrange(RIGHT, buff=0.15)
        Sm = VGroup(M("S =", 38), mat(SHEAR, 0.7)).arrange(RIGHT, buff=0.15)
        Rl = T("quarter turn", 24, color=B_ROLE)
        Sl = T("horizontal shear", 24, color=A_ROLE)
        rrow = VGroup(Rm, Rl).arrange(RIGHT, buff=0.35)
        srow = VGroup(Sm, Sl).arrange(RIGHT, buff=0.35)
        side = VGroup(rrow, srow).arrange(DOWN, buff=0.45, aligned_edge=LEFT).move_to(P(3.6, 1.7))

        with self.voiceover("In chapter zero, a two by two matrix became a machine that moves the whole plane. "
                            "Its columns tell you where i hat and j hat land. So what happens if you run two "
                            "machines, one after the other?") as vo:
            self.play(FadeIn(g.ref), Create(g.lines), run_time=1.2)
            self.play(FadeIn(g.square), GrowArrow(g.i), GrowArrow(g.j), run_time=0.8)
            self.play(FadeIn(head), run_time=0.6)
        with self.voiceover(f"Take {sp('R')}, a quarter turn, and {sp('S')}, a shear. First, rotate the plane.") as vo:
            self.play(FadeIn(side), run_time=0.8)
            self.play(Indicate(rrow, color=B_ROLE), run_time=0.8)
            self.play(g.apply(R90, 1.6))
        with self.voiceover("Then shear the result.") as vo:
            self.play(Indicate(srow, color=A_ROLE), run_time=0.6)
            self.play(g.apply(SHEAR, 1.6))
        note = VGroup(
            T("Lines stay straight and parallel.", 24, color=MUTED),
            T("The origin stays put.", 24, color=MUTED),
            T("So ONE matrix does both moves.", 26, color=PRIMARY, weight="BOLD"),
        ).arrange(DOWN, buff=0.22, aligned_edge=LEFT).move_to(P(3.6, -0.75))
        with self.voiceover("Grid lines are still straight, parallel and evenly spaced, and the origin has not "
                            "moved. So the combined effect is itself a linear transformation, and a single "
                            "matrix must do the whole job in one move.") as vo:
            self.play(LaggedStart(*[FadeIn(n, shift=0.15 * UP) for n in note], lag_ratio=0.5), run_time=2.0)

        g2 = Grid(P(-3.4, -0.4), unit=0.8)
        SRm = VGroup(M("SR =", 38), mat([[1, -1], [1, 0]], 0.7)).arrange(RIGHT, buff=0.15).move_to(P(3.6, -2.7))
        with self.voiceover(f"That single matrix is the product, written {sp('S R')}. Watch it land the grid "
                            f"in exactly the same place, in one step.") as vo:
            self.play(FadeOut(VGroup(g.lines, g.square, g.i, g.j)), FadeIn(VGroup(g2.lines, g2.square, g2.i, g2.j)),
                      run_time=0.8)
            self.play(FadeIn(SRm), run_time=0.6)
            self.play(g2.apply([[1, -1], [1, 0]], 2.0))

        defn = M(r"(AB)\,\mathbf v = A\,(B\,\mathbf v)", 60).move_to(P(0, 0.6))
        sub = T("AB means: do B first, then A", 32, color=PRIMARY).move_to(P(0, -0.7))
        warn = T("Read left to right, act right to left, like f(g(x)).", 26, color=MUTED).move_to(P(0, -1.6))
        with self.voiceover(f"In general, {sp('A B')} is the matrix for do B first, then {sp('A')}. The matrix "
                            f"nearest the vector acts first, just like f of g of x applies g first. Reading "
                            f"order is not acting order.") as vo:
            self.clear_scene(0.6)
            self.play(Write(defn), run_time=1.4)
            box = SurroundingRectangle(defn, buff=0.3, corner_radius=0.15, color=PRIMARY, stroke_width=3)
            self.play(Create(box), FadeIn(sub), run_time=0.8)
            self.play(FadeIn(warn), run_time=0.6)

    # ------------------------------------------------------------ scene 2: follow the columns
    def s2(self):
        head = T("Finding SR: follow i hat and j hat", 34, weight="BOLD").move_to(P(0, 3.2))
        rule = M(r"\text{column } j \text{ of } AB \;=\; A \times (\text{column } j \text{ of } B)", 44, color=PRIMARY)
        rule.move_to(P(0, 2.2))
        l1 = M(r"\hat\imath \;\xrightarrow{\;R\;}\; \begin{pmatrix}0\\1\end{pmatrix} \;\xrightarrow{\;S\;}\; "
               r"\begin{pmatrix}1\\1\end{pmatrix}", 44)
        l2 = M(r"\hat\jmath \;\xrightarrow{\;R\;}\; \begin{pmatrix}-1\\0\end{pmatrix} \;\xrightarrow{\;S\;}\; "
               r"\begin{pmatrix}-1\\0\end{pmatrix}", 44)
        l1[0][0:2].set_color(I_C)
        l2[0][0:2].set_color(J_C)
        steps = VGroup(l1, l2).arrange(DOWN, buff=0.5).move_to(P(-3.0, -0.3))
        res = M(r"SR = \begin{pmatrix}1&-1\\1&0\end{pmatrix}", 54).move_to(P(3.6, -0.3))
        box = SurroundingRectangle(res, buff=0.25, corner_radius=0.15, color=PRIMARY, stroke_width=3)
        tail = T("Every product rule in this chapter comes from this one sentence.", 26, color=MUTED)
        tail.move_to(P(0, -3.0))

        with self.voiceover("Now find that matrix, with no new rule. The columns of a matrix are where i hat and "
                            "j hat land, so just follow them through both machines.") as vo:
            self.play(FadeIn(head), run_time=0.8)
        with self.voiceover("The rotation sends i hat to zero, one. The shear sends that to one, one. "
                            "That is column one.") as vo:
            self.play(Write(l1), run_time=2.2)
        with self.voiceover("The rotation sends j hat to minus one, zero, and the shear leaves that alone. "
                            "That is column two.") as vo:
            self.play(Write(l2), run_time=2.2)
        with self.voiceover(f"Stack the two columns and you have {sp('S R')}. The one sentence to remember: "
                            f"column j of {sp('A B')} is {sp('A')} times column j of B.") as vo:
            self.play(Write(res), Create(box), run_time=1.2)
            self.play(Write(rule), run_time=1.6)
            self.play(FadeIn(tail), run_time=0.6)

    # ------------------------------------------------------------ scene 3: row by column, dominoes
    def s3(self):
        head = T("One entry at a time: row by column", 34, weight="BOLD").move_to(P(0, 3.2))
        A = mat([[2, 1], [1, 3]], 0.9)
        B = mat([[1, -1], [2, 0]], 0.9)
        C = mat([[4, -2], [7, -1]], 0.9)
        eq = VGroup(A, B, M("=", 48), C).arrange(RIGHT, buff=0.3).move_to(P(-2.2, 1.2))
        for e in C.get_entries():
            e.set_opacity(0)
        calc = M(r"2\cdot 1 + 1\cdot 2 = 4", 44).move_to(P(3.9, 1.2))

        with self.voiceover("For a single entry there is a faster way to read the same rule. Entry i j of the "
                            "product is row i of the first matrix, dotted with column j of the second. "
                            "Multiply matching entries, and add.") as vo:
            self.play(FadeIn(head), run_time=0.6)
            self.play(FadeIn(eq), run_time=1.0)
            r = SurroundingRectangle(A.get_rows()[0], color=I_C, buff=0.12)
            c = SurroundingRectangle(B.get_columns()[0], color=J_C, buff=0.12)
            self.play(Create(r), Create(c), run_time=0.8)
            self.play(Write(calc), run_time=1.2)
            self.play(C.get_entries()[0].animate.set_opacity(1), run_time=0.5)
            for (ri, ci, k) in [(0, 1, 1), (1, 0, 2), (1, 1, 3)]:
                r2 = SurroundingRectangle(A.get_rows()[ri], color=I_C, buff=0.12)
                c2 = SurroundingRectangle(B.get_columns()[ci], color=J_C, buff=0.12)
                self.play(Transform(r, r2), Transform(c, c2), run_time=0.35)
                self.play(C.get_entries()[k].animate.set_opacity(1), run_time=0.3)
            self.play(FadeOut(r), FadeOut(c), FadeOut(calc), run_time=0.4)

        not_this = T("Not entry by entry!", 28, color=WARN).move_to(P(3.9, 1.2))
        with self.voiceover("Notice it is not entry by entry. Multiplying matching entries would ignore how "
                            "the machines chain together.") as vo:
            self.play(FadeIn(not_this), run_time=0.6)

        def domino(a, b, x, y, hl=None):
            left = Rectangle(width=1.0, height=0.8, color=INK, stroke_width=2).set_fill(WHITE, 1)
            right = left.copy()
            pair = VGroup(left, right).arrange(RIGHT, buff=0)
            ta = M(str(a), 40).move_to(left)
            tb = M(str(b), 40).move_to(right)
            g = VGroup(pair, ta, tb).move_to(P(x, y))
            return g

        d1 = domino(2, 3, -4.6, -1.3)
        d2 = domino(3, 2, -2.4, -1.3)
        r1 = VGroup(M(r"\to", 44), M(r"2\times 2", 44)).arrange(RIGHT, buff=0.3).next_to(d2, RIGHT, buff=0.3)
        inner = VGroup(d1[0][1], d2[0][0])
        d3 = domino(3, 4, -4.6, -2.7)
        d4 = domino(2, 3, -2.4, -2.7)
        x3 = VGroup(cross_mark().scale(0.7), T("not defined: 4 and 2 do not match", 24, color=WARN))
        x3.arrange(RIGHT, buff=0.25).next_to(d4, RIGHT, buff=0.35)
        lab = T("orders", 22, color=MUTED).next_to(VGroup(d1, d2), UP, buff=0.15)
        with self.voiceover("For that to work, a row of the first matrix must be as long as a column of the "
                            "second. Think of dominoes. A two by three times a three by two works: the touching "
                            "ends match, and the outer ends give the answer, two by two.") as vo:
            self.play(FadeOut(not_this), FadeIn(d1), FadeIn(d2), FadeIn(lab), run_time=0.8)
            self.play(inner.animate.set_fill(HL, 0.5), run_time=0.6)
            self.play(FadeIn(r1), run_time=0.6)
        with self.voiceover("Swap the order to three by four times two by three, and the touching ends are four "
                            "and two. That product does not exist. So one order being defined says nothing "
                            "about the other.") as vo:
            self.play(FadeIn(d3), FadeIn(d4), run_time=0.8)
            self.play(VGroup(d3[0][1], d4[0][0]).animate.set_fill(WARN, 0.3), run_time=0.5)
            self.play(FadeIn(x3), run_time=0.6)

    # ------------------------------------------------------------ scene 4: order matters
    def s4(self):
        head = T("Order matters", 36, weight="BOLD").move_to(P(0, 3.3))
        ga = Grid(P(-3.4, -0.1), unit=0.5, lines=True)
        gb = Grid(P(3.4, -0.1), unit=0.5, lines=True)
        ta = T("rotate, then shear: SR", 26, color=INK).move_to(P(-3.4, 2.55))
        tb = T("shear, then rotate: RS", 26, color=INK).move_to(P(3.4, 2.55))
        with self.voiceover("Socks then shoes is not shoes then socks. Matrix products are sequences, so order "
                            "should matter. On the left, rotate then shear. On the right, shear then rotate.") as vo:
            self.play(FadeIn(head), FadeIn(ga.all()), FadeIn(gb.all()), FadeIn(ta), FadeIn(tb), run_time=1.0)
            self.play(ga.apply(R90, 1.2), gb.apply(SHEAR, 1.2))
            self.play(ga.apply(SHEAR, 1.2), gb.apply(R90, 1.2))
        res = M(r"SR = \begin{pmatrix}1&-1\\1&0\end{pmatrix} \;\ne\; RS = \begin{pmatrix}0&-1\\1&1\end{pmatrix}", 44)
        res.move_to(P(0, -3.0))
        with self.voiceover(f"Same two moves, different final squares. So {sp('S R')} is not {sp('R S')}. In "
                            f"general, {sp('A B')} is not {sp('B A')}. When they are equal, we say the matrices "
                            f"commute, and that is special, never assumed.") as vo:
            self.play(Write(res), run_time=1.6)

        # zero product
        self.clear_scene(0.6)
        head2 = T("A zero product with no zero factor", 34, weight="BOLD").move_to(P(0, 3.3))
        g = Grid(P(-3.4, -0.3), unit=0.8, lines=True)
        Bm = VGroup(M("B =", 36), mat([[0, 0], [1, 0]], 0.65)).arrange(RIGHT, buff=0.15)
        Am = VGroup(M("A =", 36), mat([[1, 0], [0, 0]], 0.65)).arrange(RIGHT, buff=0.15)
        Bt = T("squash onto the y-axis", 22, color=B_ROLE)
        At = T("project onto the x-axis", 22, color=A_ROLE)
        rows = VGroup(VGroup(Bm, Bt).arrange(RIGHT, buff=0.3), VGroup(Am, At).arrange(RIGHT, buff=0.3))
        rows.arrange(DOWN, buff=0.35, aligned_edge=LEFT).move_to(P(3.4, 1.4))
        with self.voiceover(f"Order is not the only surprise. Let B squash the whole plane onto the y axis. "
                            f"Then let {sp('A')} project onto the x axis, which sends the whole y axis to the "
                            f"origin.") as vo:
            self.play(FadeIn(head2), FadeIn(g.all()), FadeIn(rows), run_time=1.0)
            self.play(g.apply([[0, 0], [1, 0]], 1.4))
            self.play(g.apply([[1, 0], [0, 0]], 1.4))
        z = M(r"AB = \begin{pmatrix}0&0\\0&0\\ \end{pmatrix} = O", 44).move_to(P(3.4, -0.6))
        facts = VGroup(
            T("AB = AC does not give B = C", 26, color=WARN),
            M(r"(A+B)^2 = A^2 + AB + BA + B^2", 38),
        ).arrange(DOWN, buff=0.35).move_to(P(3.4, -2.3))
        with self.voiceover(f"Nothing survives. {sp('A B')} is the zero matrix, although neither factor is zero. "
                            f"So you cannot cancel a matrix the way you cancel a number. And when you expand "
                            f"{sp('A')} plus B, all squared, keep {sp('A B')} and {sp('B A')} as separate "
                            f"terms.") as vo:
            self.play(Write(z), run_time=1.2)
            self.play(FadeIn(facts[0]), run_time=0.6)
            self.play(Write(facts[1]), run_time=1.4)

    # ------------------------------------------------------------ scene 5: the algebra that works
    def s5(self):
        head = T("The algebra that does work", 34, weight="BOLD").move_to(P(0, 3.3))

        def machine(lbl, x, col):
            b = RoundedRectangle(width=1.3, height=0.9, corner_radius=0.15, color=col, stroke_width=3)
            b.set_fill(col, 0.12).move_to(P(x, 1.7))
            return VGroup(b, M(lbl, 44, color=col).move_to(b))

        v = M(r"\mathbf v", 44).move_to(P(-4.8, 1.7))
        mc = machine("C", -2.9, SQ_C)
        mb = machine("B", -0.6, B_ROLE)
        ma = machine("A", 1.7, A_ROLE)
        out = M(r"A\big(B(C\mathbf v)\big)", 40).move_to(P(4.6, 1.7))
        arrows = VGroup(*[Arrow(a.get_right(), b.get_left(), buff=0.12, color=MUTED, stroke_width=4)
                          for a, b in [(v, mc), (mc, mb), (mb, ma), (ma, out)]])
        assoc = M(r"(AB)C = A(BC)", 50).move_to(P(0, 0.3))
        with self.voiceover(f"Only commutativity failed. Everything else still holds, and composition shows why. "
                            f"Both {sp('A B')} times C and {sp('A')} times {sp('B C')} describe the same "
                            f"sequence: C, then B, then {sp('A')}. The brackets only say which two steps you "
                            f"merged first.") as vo:
            self.play(FadeIn(head), run_time=0.5)
            self.play(FadeIn(v), FadeIn(mc), FadeIn(mb), FadeIn(ma), FadeIn(out), Create(arrows), run_time=1.4)
            self.play(Write(assoc), run_time=1.2)
            br1 = SurroundingRectangle(VGroup(mb, ma), color=HL, buff=0.15)
            br2 = SurroundingRectangle(VGroup(mc, mb), color=HL, buff=0.15)
            self.play(Create(br1), run_time=0.6)
            self.play(Transform(br1, br2), run_time=0.8)
            self.play(FadeOut(br1), run_time=0.3)

        sq = M(r"\begin{pmatrix}1&2\\3&4\end{pmatrix}^2 = \begin{pmatrix}7&10\\15&22\end{pmatrix}", 42)
        sq.move_to(P(-3.3, -1.7))
        bad = M(r"\ne \begin{pmatrix}1&4\\9&16\end{pmatrix}", 42).next_to(sq, RIGHT, buff=0.3)
        c1 = check().scale(0.7).next_to(sq, DOWN, buff=0.2)
        c2 = cross_mark().scale(0.7).next_to(bad, DOWN, buff=0.2)
        with self.voiceover(f"Associativity is what makes powers meaningful. {sp('A')} squared means apply "
                            f"{sp('A')} twice. It is a matrix product, not the entries squared.") as vo:
            self.play(FadeOut(assoc), run_time=0.3)
            self.play(Write(sq), run_time=1.2)
            self.play(FadeIn(c1), run_time=0.3)
            self.play(Write(bad), FadeIn(c2), run_time=1.0)

        self.clear_scene(0.6)
        head2 = T("Matrix polynomials", 34, weight="BOLD").move_to(P(0, 3.3))
        a = M(r"A = \begin{pmatrix}3&1\\-1&2\end{pmatrix}", 44).move_to(P(-3.6, 2.0))
        a2 = M(r"A^2 = \begin{pmatrix}8&5\\-5&3\end{pmatrix}", 44).move_to(P(2.6, 2.0))
        idn = M(r"A^2 - 5A + 7I = O", 52).move_to(P(0, 0.4))
        l1 = M(r"A^3 = A\cdot A^2 = 5A^2 - 7A", 40)
        l2 = M(r"= 5(5A - 7I) - 7A = 18A - 35I", 40)
        l3 = M(r"= \begin{pmatrix}19&18\\-18&1\end{pmatrix}", 40)
        chain = VGroup(l1, l2, l3).arrange(DOWN, buff=0.3, aligned_edge=LEFT).move_to(P(0, -2.1))
        with self.voiceover(f"Because powers, sums and scalar multiples all make sense, so do polynomials in a "
                            f"matrix. For this {sp('A')}, {sp('A')} squared, minus five {sp('A')}, plus seven "
                            f"{sp('I')}, is the zero matrix. The seven must be seven {sp('I')}: you cannot add a "
                            f"number to a matrix.") as vo:
            self.play(FadeIn(head2), Write(a), run_time=1.0)
            self.play(Write(a2), run_time=1.0)
            self.play(Write(idn), run_time=1.2)
            self.play(Indicate(idn[0][6:8], color=PRIMARY), run_time=0.8)
        with self.voiceover(f"Now {sp('A')} cubed needs no cubing. Multiply the identity by {sp('A')}, and "
                            f"replace each {sp('A')} squared with five {sp('A')} minus seven {sp('I')}. You get "
                            f"eighteen {sp('A')} minus thirty five {sp('I')}.") as vo:
            self.play(Write(l1), run_time=1.2)
            self.play(Write(l2), run_time=1.4)
            self.play(Write(l3), run_time=1.0)

    # ------------------------------------------------------------ scene 6: special matrices
    def s6(self):
        head = T("Special matrices are behaviours", 34, weight="BOLD").move_to(P(0, 3.4))
        specs = [
            ("idempotent", [[1, 0], [0, 0]], r"P^2 = P", "projection"),
            ("involutory", [[0, 1], [1, 0]], r"F^2 = I", "reflection"),
            ("nilpotent", [[0, 1], [0, 0]], r"N^2 = O", "flatten, then vanish"),
            ("orthogonal", [[0.6, -0.8], [0.8, 0.6]], r"\text{lengths kept}", "rotation"),
        ]
        xs = [-5.25, -1.75, 1.75, 5.25]
        grids, labels, results = [], VGroup(), VGroup()
        for (name, m, law, what), x in zip(specs, xs):
            g = Grid(P(x - 0.3, 0.2), unit=0.55, n=2, lines=False)
            grids.append(g)
            nm = T(name, 26, color=PRIMARY, weight="BOLD").move_to(P(x, 2.3))
            ww = T(what, 20, color=MUTED).move_to(P(x, 1.85))
            labels.add(nm, ww)
            results.add(M(law, 36).move_to(P(x, -1.6)))
        with self.voiceover("Some matrices have names, and the useful names describe a behaviour: what happens "
                            "when you apply the matrix twice.") as vo:
            self.play(FadeIn(head), *[FadeIn(g.all()) for g in grids], FadeIn(labels), run_time=1.2)
        with self.voiceover("Apply each one once.") as vo:
            self.play(*[g.apply(m, 1.5) for g, (_, m, _, _) in zip(grids, specs)])
        with self.voiceover("Now apply each one again. A projection changes nothing the second time, so P "
                            "squared is P. A reflection undoes itself, so F squared is the identity. The "
                            "nilpotent one flattens, then vanishes: N squared is zero. And an orthogonal matrix "
                            "turns rigidly, keeping every length and angle.") as vo:
            self.play(*[g.apply(m, 1.5) for g, (_, m, _, _) in zip(grids, specs)])
            self.play(LaggedStart(*[Write(r) for r in results], lag_ratio=0.5), run_time=3.0)
        trap = T("Traps: a diagonal matrix may have zeros on its diagonal.  A scalar matrix is kI, stricter "
                 "than diagonal.", 22, color=WARN)
        fit(trap, 13.0).move_to(P(0, -3.0))
        with self.voiceover(f"Two naming traps. A diagonal matrix only needs zeros off the diagonal, so zeros on "
                            f"it are fine. And a scalar matrix is k times {sp('I')}, which is stricter than "
                            f"diagonal.") as vo:
            self.play(FadeIn(trap), run_time=0.8)

    # ------------------------------------------------------------ scene 7: transpose
    def s7(self):
        head = T("Transpose: rows become columns", 34, weight="BOLD").move_to(P(0, 3.3))
        A = mat([[1, 2, 3], [4, 5, 6]], 0.85)
        At = mat([[1, 4], [2, 5], [3, 6]], 0.85)
        la = M("A =", 42)
        lt = M("A^T =", 42)
        left = VGroup(la, A).arrange(RIGHT, buff=0.2).move_to(P(-3.6, 1.2))
        right = VGroup(lt, At).arrange(RIGHT, buff=0.2).move_to(P(2.4, 1.2))
        arr = Arrow(P(-1.2, 1.2), P(0.4, 1.2), color=MUTED, buff=0)
        A.get_rows()[0].set_color(I_C)
        A.get_rows()[1].set_color(J_C)
        At.get_columns()[0].set_color(I_C)
        At.get_columns()[1].set_color(J_C)
        with self.voiceover(f"Store a table of marks with students as rows, or as columns. Same data, flipped "
                            f"layout. That flip is the transpose. Row one of {sp('A')} becomes column one of "
                            f"{sp('A')} transpose.") as vo:
            self.play(FadeIn(head), FadeIn(left), run_time=0.8)
            self.play(GrowArrow(arr), run_time=0.5)
            self.play(FadeIn(lt), TransformFromCopy(A.get_rows()[0], At.get_columns()[0]), run_time=1.2)
            self.play(TransformFromCopy(A.get_rows()[1], At.get_columns()[1]), FadeIn(At.get_brackets()),
                      run_time=1.2)
        rule = M(r"(AB)^T = B^T A^T", 60).move_to(P(0, -1.2))
        box = SurroundingRectangle(rule, buff=0.25, corner_radius=0.15, color=PRIMARY, stroke_width=3)
        socks = T("socks on, then shoes; shoes off first", 26, color=MUTED).move_to(P(0, -2.4))
        with self.voiceover(f"Transposing a product reverses the order. {sp('A B')} transpose is B transpose times "
                            f"{sp('A')} transpose. It is socks and shoes: you put socks on first, but you take "
                            f"shoes off first.") as vo:
            self.play(Write(rule), run_time=1.4)
            self.play(Create(box), FadeIn(socks), run_time=0.8)

        self.clear_scene(0.6)
        head2 = T("Symmetric plus skew-symmetric", 34, weight="BOLD").move_to(P(0, 3.3))
        sym = VGroup(M(r"A^T = A", 44), T("symmetric: mirror image across the diagonal", 24, color=MUTED))
        skw = VGroup(M(r"A^T = -A", 44), M(r"\text{skew: } a_{ii} = -a_{ii}\ \Rightarrow\ \text{zero diagonal}", 32, color=MUTED))
        for g in (sym, skw):
            g.arrange(RIGHT, buff=0.4)
        defs = VGroup(sym, skw).arrange(DOWN, buff=0.35, aligned_edge=LEFT).move_to(P(0, 1.9))
        split = M(r"A = \tfrac12\,(A + A^T) + \tfrac12\,(A - A^T)", 50).move_to(P(0, 0.0))
        ex = VGroup(M(r"\begin{pmatrix}3&5\\1&-1\end{pmatrix}", 46), M("=", 46),
                    M(r"\begin{pmatrix}3&3\\3&-1\end{pmatrix}", 46), M("+", 46),
                    M(r"\begin{pmatrix}0&2\\-2&0\end{pmatrix}", 46)).arrange(RIGHT, buff=0.25).move_to(P(0, -1.9))
        tags = VGroup(T("symmetric", 22, color=SECONDARY), T("skew", 22, color=PURPLE))
        with self.voiceover(f"A square matrix equal to its own transpose is symmetric. One equal to minus its "
                            f"transpose is skew symmetric, and its diagonal is forced to be zero.") as vo:
            self.play(FadeIn(head2), run_time=0.5)
            self.play(FadeIn(sym), run_time=0.8)
            self.play(FadeIn(skw), run_time=0.8)
        with self.voiceover(f"And every square matrix splits into one of each: half of {sp('A')} plus {sp('A')} "
                            f"transpose, which is symmetric, plus half of {sp('A')} minus {sp('A')} transpose, "
                            f"which is skew.") as vo:
            self.play(Write(split), run_time=1.6)
            self.play(Write(ex), run_time=1.8)
            tags[0].next_to(ex[2], DOWN, buff=0.2)
            tags[1].next_to(ex[4], DOWN, buff=0.2)
            self.play(FadeIn(tags), run_time=0.5)

    # ------------------------------------------------------------ scene 8: recap
    def s8(self):
        head = T("Chapter 1 in five lines", 36, color=PRIMARY, weight="BOLD").move_to(P(0, 3.1))
        lines = VGroup(
            M(r"AB = \text{do } B \text{ first, then } A", 38),
            M(r"\text{column } j \text{ of } AB = A \times (\text{column } j \text{ of } B)", 38),
            M(r"AB \ne BA, \quad AB = O \text{ with } A, B \ne O, \quad \text{no cancelling}", 38),
            M(r"(AB)C = A(BC), \quad A^2 = AA \ (\text{not entries squared})", 38),
            M(r"(AB)^T = B^TA^T, \quad A = \text{symmetric} + \text{skew}", 38),
        ).arrange(DOWN, buff=0.42, aligned_edge=LEFT).move_to(P(0, -0.3))
        for ln in lines:
            fit(ln, 12.5)
        with self.voiceover(f"To recap. {sp('A B')} means do B first, then {sp('A')}. Column j of the product is "
                            f"{sp('A')} times column j of B, and the row by column rule reads it one entry at a "
                            f"time.") as vo:
            self.play(FadeIn(head), run_time=0.6)
            self.play(FadeIn(lines[0], shift=0.2 * UP), run_time=0.8)
            self.play(FadeIn(lines[1], shift=0.2 * UP), run_time=0.8)
        with self.voiceover("Order matters, zero products can come from non zero factors, and you cannot cancel. "
                            "Associativity and distributivity still work, so powers and polynomials make sense.") as vo:
            self.play(FadeIn(lines[2], shift=0.2 * UP), run_time=0.8)
            self.play(FadeIn(lines[3], shift=0.2 * UP), run_time=0.8)
        with self.voiceover("Transposing a product reverses it, and every square matrix is symmetric plus skew. "
                            "Next, in chapter two: how much space a matrix stretches, the determinant.") as vo:
            self.play(FadeIn(lines[4], shift=0.2 * UP), run_time=0.8)
