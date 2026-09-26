import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

# Chapter colour roles (light background).
I_C = PRIMARY  # i-hat / column 1 = strawberry red
J_C = SECONDARY  # j-hat / column 2 = teal
SQ_C = ACCENT  # the unit square = amber
V_C = SECONDARY  # probe vector v = teal
AV_C = PRIMARY  # its image Av = strawberry red
EIG = ManimColor("#D19A00")  # eigen-lines, results, highlights = gold
LAM = PURPLE  # lambda and general laws
WARN = PRIMARY


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


def arrow(start, end, color, sw=6):
    return Arrow(start, end, buff=0, color=color, stroke_width=sw,
                 max_tip_length_to_length_ratio=0.25, max_stroke_width_to_length_ratio=12)


def check():
    return MathTex(r"\checkmark", color=GREEN, font_size=56)


def cross_mark():
    return MathTex(r"\times", color=WARN, font_size=64)


class Grid:
    """A small plane: faint fixed reference grid, a moving grid, the unit square, i-hat and j-hat."""

    def __init__(self, center, unit=0.8, n=1):
        self.c = np.array(center)
        self.u = unit
        self.m = np.eye(2)
        L = n * unit
        ref = VGroup()
        for k in range(-n, n + 1):
            ref.add(Line(self.c + P(-L, k * unit), self.c + P(L, k * unit), color=GRID, stroke_width=2))
            ref.add(Line(self.c + P(k * unit, -L), self.c + P(k * unit, L), color=GRID, stroke_width=2))
        self.ref = ref
        mov = VGroup()
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
        A = np.array(matrix, dtype=float)
        self.m = A @ self.m
        ni = arrow(self.c, self.pt(self.m[:, 0]), I_C) if np.linalg.norm(self.m[:, 0]) > 1e-6 \
            else Dot(self.c, 0.07, color=I_C)
        nj = arrow(self.c, self.pt(self.m[:, 1]), J_C) if np.linalg.norm(self.m[:, 1]) > 1e-6 \
            else Dot(self.c, 0.07, color=J_C)
        anims = [ApplyMatrix(A, self.square, about_point=self.c), Transform(self.i, ni), Transform(self.j, nj),
                 ApplyMatrix(A, self.lines, about_point=self.c)]
        return AnimationGroup(*anims, run_time=run_time)


class MxCh5Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Matrices",
            "Chapter 5 · Rank and Eigenvalues",
            "Matrices, chapter five. Rank and eigenvalues: the shape of a transformation.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7):
            part()
            self.clear_scene()

    def header(self, s):
        h = T(s, 22, color=MUTED).to_corner(UL, buff=0.35)
        self.play(FadeIn(h), run_time=0.4)
        return h

    # ------------------------------------------------------------ scene 1: hook, two questions
    def s1(self):
        gl = Grid(P(-3.5, -0.7), unit=0.4)
        gr = Grid(P(3.5, -0.4), unit=0.6)
        ql = T("How many dimensions survive?", 28, weight="BOLD").move_to(P(-3.5, 3.2))
        qr = T("Which directions don't turn?", 28, weight="BOLD").move_to(P(3.5, 3.2))
        ml = M(r"\begin{pmatrix}1&2\\2&4\end{pmatrix}", 34).next_to(ql, DOWN, buff=0.2)
        mr = M(r"\begin{pmatrix}2&1\\1&2\end{pmatrix}", 34).next_to(qr, DOWN, buff=0.2)
        with self.voiceover("This is the last chapter of the course, and it asks two questions about any "
                            "matrix. First: when it moves the plane, how many dimensions are still standing "
                            "afterwards?") as vo:
            self.play(FadeIn(ql), FadeIn(ml), FadeIn(gl.all()), run_time=1.0)
            self.play(gl.apply([[1, 2], [2, 4]], 2.0))
        tag = T("det = 0, but still a whole line", 24, color=MUTED).move_to(P(-3.5, -3.3))
        with self.voiceover("This one has determinant zero, so the plane is squashed. But it is squashed onto a "
                            "line, not crushed to a point. The determinant cannot tell those apart. Rank can.") as vo:
            self.play(FadeIn(tag), run_time=0.8)
        e1 = DashedLine(gr.pt((-1.6, -1.6)), gr.pt((1.6, 1.6)), color=EIG, stroke_width=4)
        e2 = DashedLine(gr.pt((-1.6, 1.6)), gr.pt((1.6, -1.6)), color=EIG, stroke_width=4)
        with self.voiceover("Second: which directions does the matrix leave pointing the same way? Watch this "
                            "one. Almost every arrow gets turned, but two lines stay exactly where they were. "
                            "Those lines are the eigenvectors, and they reveal the shape of the whole "
                            "transformation.") as vo:
            self.play(FadeIn(qr), FadeIn(mr), FadeIn(gr.all()), run_time=1.0)
            self.play(Create(e1), Create(e2), run_time=1.0)
            self.play(gr.apply([[2, 1], [1, 2]], 2.4))
            self.play(Indicate(VGroup(e1, e2), color=EIG, scale_factor=1.05), run_time=1.0)

    # ------------------------------------------------------------ scene 2: rank (5.1)
    def s2(self):
        self.header("5.1 · Rank: How Many Dimensions Survive")
        mats = [[[2, 1], [1, 3]], [[1, 2], [2, 4]], [[0, 0], [0, 0]]]
        xs = [-4.4, 0.0, 4.4]
        grids = [Grid(P(x, 0.4), unit=0.38) for x in xs]
        mt = [M(r"\begin{pmatrix}2&1\\1&3\end{pmatrix}", 32), M(r"\begin{pmatrix}1&2\\2&4\end{pmatrix}", 32),
              M(r"\begin{pmatrix}0&0\\0&0\end{pmatrix}", 32)]
        for m, x in zip(mt, xs):
            m.move_to(P(x, -2.3))
        labs = [T("rank 2: plane to plane", 24, color=I_C), T("rank 1: onto a line", 24, color=I_C),
                T("rank 0: to a point", 24, color=I_C)]
        for lb, x in zip(labs, xs):
            lb.move_to(P(x, -3.2))
        with self.voiceover("Rank is the number of dimensions in the output. Here, the columns two one and one "
                            "three point in different directions, so the plane stays a plane. Rank two.") as vo:
            self.play(*[FadeIn(g.all()) for g in grids], *[FadeIn(m) for m in mt], run_time=1.0)
            self.play(grids[0].apply(mats[0], 1.6))
            self.play(FadeIn(labs[0]), run_time=0.5)
        with self.voiceover("Here, the second column, two four, is twice the first, one two. Every output lands "
                            "on one line. Rank one. And the zero matrix sends everything to the origin. Rank "
                            "zero.") as vo:
            self.play(grids[1].apply(mats[1], 1.6))
            self.play(FadeIn(labs[1]), run_time=0.5)
            self.play(grids[2].apply(mats[2], 1.4))
            self.play(FadeIn(labs[2]), run_time=0.5)

        keep = self.mobjects[0]
        self.play(*[FadeOut(m) for m in self.mobjects if m is not keep], run_time=0.6)
        defn = M(r"\operatorname{rank} A = \#\,\text{independent columns} = \#\,\text{independent rows}", 42)
        defn.move_to(P(0, 2.2))
        fit(defn, 12.5)
        with self.voiceover("So rank counts the independent columns. And, surprisingly, that always equals the "
                            "number of independent rows. When a square matrix has full rank, its determinant is "
                            "not zero, and it has an inverse.") as vo:
            self.play(Write(defn), run_time=1.8)
        chain = M(r"\begin{pmatrix}1&2&3\\2&4&6\\1&0&1\end{pmatrix}"
                  r"\xrightarrow[R_3 - R_1]{R_2 - 2R_1}"
                  r"\begin{pmatrix}1&2&3\\0&0&0\\0&-2&-2\end{pmatrix}"
                  r"\xrightarrow{R_2 \leftrightarrow R_3}"
                  r"\begin{pmatrix}1&2&3\\0&-2&-2\\0&0&0\end{pmatrix}", 38)
        fit(chain, 12.8).move_to(P(0, 0.2))
        res = M(r"\text{2 non-zero rows} \;\Rightarrow\; \operatorname{rank} A = 2", 40, color=EIG).move_to(P(0, -1.7))
        warn = T("Reduce first, then count: the original had 3 non-zero rows.", 26, color=WARN).move_to(P(0, -2.8))
        with self.voiceover(f"To find the rank, row reduce. {sp('R')} two minus two {sp('R')} one wipes out row "
                            f"two completely. It was secretly twice row one. {sp('R')} three minus {sp('R')} one "
                            f"gives zero, minus two, minus two. Swap them, and count the non zero rows.") as vo:
            self.play(Write(chain), run_time=3.5)
        with self.voiceover("Two. So the rank is two, even though the original matrix had three non zero rows. "
                            "Reduce first, then count.") as vo:
            self.play(FadeIn(res), run_time=0.8)
            self.play(FadeIn(warn), run_time=0.6)

    # ------------------------------------------------------------ scene 3: rank and solutions (5.2)
    def s3(self):
        self.header("5.2 · Rank and Solutions")
        C = P(-3.3, -0.4)
        u = 0.9
        outline = Line(C + P(-2.2, -1.1), C + P(2.2, 1.1), color=SECONDARY, stroke_width=5)
        otag = T("outputs of A", 24, color=SECONDARY).next_to(outline.get_start(), DOWN, buff=0.2)
        origin = Dot(C, 0.07, color=INK)
        tgt = ValueTracker(0.0)

        def bvec():
            off = tgt.get_value()
            end = C + P(1.6 * u, 0.8 * u) + P(-0.5, 1.0) * off * 1.2
            return arrow(C, end, EIG)

        b = always_redraw(bvec)
        blab = always_redraw(lambda: M("B", 36, color=EIG).next_to(b.get_end(), RIGHT, buff=0.12))
        q = M(r"AX = B:\ \text{is } B \text{ an output of } A?", 40).move_to(P(2.9, 2.4))
        fit(q, 6.6)
        good = M(r"\operatorname{rank}[A \mid B] = \operatorname{rank} A", 38, color=GREEN).move_to(P(2.9, 1.0))
        good_t = T("consistent", 26, color=GREEN).next_to(good, DOWN, buff=0.2)
        bad = M(r"\operatorname{rank}[A \mid B] = \operatorname{rank} A + 1", 38, color=WARN).move_to(P(2.9, -0.8))
        bad_t = T("no solution", 26, color=WARN).next_to(bad, DOWN, buff=0.2)
        with self.voiceover(f"Now systems. {sp('A X')} equals {sp('B')} asks one question: is {sp('B')} one of the "
                            f"outputs of {sp('A')}? The outputs form a space with as many dimensions as the rank. "
                            f"Glue {sp('B')} on as an extra column, making the augmented matrix.") as vo:
            self.play(Create(outline), FadeIn(origin), FadeIn(otag), FadeIn(q), run_time=1.2)
            self.play(FadeIn(b), FadeIn(blab), run_time=0.6)
        with self.voiceover(f"If {sp('B')} already lies in the output space, it adds no new direction, the rank "
                            f"stays the same, and the system has a solution.") as vo:
            self.play(FadeIn(good), FadeIn(good_t), run_time=0.8)
        with self.voiceover(f"If {sp('B')} sticks out, the rank goes up by one, and there is no solution at all.") as vo:
            self.play(tgt.animate.set_value(1.0), run_time=1.4)
            self.play(FadeIn(bad), FadeIn(bad_t), run_time=0.8)

        keep = self.mobjects[0]
        b.clear_updaters()
        blab.clear_updaters()
        self.play(*[FadeOut(m) for m in self.mobjects if m is not keep], run_time=0.6)
        thm = VGroup(
            T("Rouché–Capelli", 30, color=LAM, weight="BOLD"),
            M(r"\text{consistent} \iff \operatorname{rank} A = \operatorname{rank}[A \mid B] = r", 40),
            M(r"r = n:\ \text{unique solution} \qquad r < n:\ n - r \text{ free parameters}", 40),
        ).arrange(DOWN, buff=0.3).move_to(P(0, 1.9))
        for x in thm:
            fit(x, 12.5)
        box = SurroundingRectangle(thm, buff=0.25, corner_radius=0.15, color=LAM, stroke_width=3)
        with self.voiceover("That is the Rouché Capelli theorem. The system is consistent exactly when the two "
                            "ranks are equal. Then, with n unknowns, a common rank of n gives a unique solution, "
                            "and anything less leaves n minus r free parameters.") as vo:
            self.play(FadeIn(thm[0]), Write(thm[1]), run_time=1.6)
            self.play(Write(thm[2]), Create(box), run_time=1.6)
        planes = M(r"\left[\begin{array}{ccc|c}1&1&1&1\\1&1&1&2\\1&1&1&3\end{array}\right]"
                   r"\;\to\;\left[\begin{array}{ccc|c}1&1&1&1\\0&0&0&1\\0&0&0&0\end{array}\right]", 38)
        planes.move_to(P(-1.6, -1.4))
        verdict = VGroup(M(r"\operatorname{rank} A = 1", 36), M(r"\operatorname{rank}[A \mid B] = 2", 36),
                         T("no solution", 26, color=WARN)).arrange(DOWN, buff=0.2).next_to(planes, RIGHT, buff=0.6)
        with self.voiceover("Remember the three parallel planes from chapter four: x plus y plus z equals one, "
                            "two, and three. Every determinant was zero, and Cramer's rule was silent. Row reduce "
                            "the augmented matrix. Rank of A is one, but the augmented rank is two. No solution, "
                            "and no guesswork.") as vo:
            self.play(Write(planes), run_time=2.4)
            self.play(FadeIn(verdict, shift=0.2 * LEFT), run_time=0.8)
        trap = T("Equal ranks mean consistent, nothing more. Unique needs rank = number of unknowns.", 24,
                 color=WARN).move_to(P(0, -3.2))
        fit(trap, 12.8)
        with self.voiceover("One trap. Equal ranks mean the system is consistent, and nothing more. A unique "
                            "solution needs the rank to equal the number of unknowns.") as vo:
            self.play(FadeIn(trap), run_time=0.8)

    # ------------------------------------------------------------ scene 4: eigenvectors (5.3)
    def s4(self):
        self.header("5.3 · Directions That Don't Turn")
        C = P(-3.2, -0.4)
        u = 0.7
        A = np.array([[2.0, 1.0], [1.0, 2.0]])
        axes = VGroup(Line(C + P(-2.6, 0), C + P(2.6, 0), color=GRID, stroke_width=2),
                      Line(C + P(0, -2.6), C + P(0, 2.6), color=GRID, stroke_width=2))
        circ = Circle(radius=u, color=MUTED, stroke_width=2).move_to(C)
        th = ValueTracker(0.0)

        def vv():
            a = th.get_value()
            return np.array([np.cos(a), np.sin(a)])

        av = always_redraw(lambda: arrow(C, C + P(*(A @ vv() * u)), AV_C, 7))
        v = always_redraw(lambda: arrow(C, C + P(*(vv() * u)), V_C, 4))
        vl = always_redraw(lambda: M(r"\mathbf v", 32, color=V_C).move_to(
            C + P(*(vv() * u * 0.55 + np.array([-vv()[1], vv()[0]]) * 0.3))))
        avl = always_redraw(lambda: M(r"A\mathbf v", 32, color=AV_C).next_to(C + P(*(A @ vv() * u)),
                                                                                 UR, buff=0.05))
        mA = M(r"A = \begin{pmatrix}2&1\\1&2\end{pmatrix}", 40).move_to(P(3.3, 2.5))
        with self.voiceover(f"Now the second question. Take {sp('A')} equals two one, one two. Draw a vector "
                            f"{sp('v')} in teal, and its image, {sp('A v')}, in red. Now sweep {sp('v')} around "
                            f"the circle. Almost everywhere, the image points somewhere new.") as vo:
            self.play(FadeIn(axes), Create(circ), FadeIn(mA), run_time=1.0)
            self.play(FadeIn(av), FadeIn(v), FadeIn(vl), FadeIn(avl), run_time=0.6)
            self.play(th.animate.set_value(-PI / 3), run_time=1.6)
            self.play(th.animate.set_value(PI / 6), run_time=1.8)
        e1 = DashedLine(C + P(-2.4, -2.4), C + P(2.4, 2.4), color=EIG, stroke_width=4)
        e2 = DashedLine(C + P(-2.2, 2.2), C + P(2.2, -2.2), color=EIG, stroke_width=4)
        r1 = M(r"A\begin{pmatrix}1\\1\end{pmatrix} = \begin{pmatrix}3\\3\end{pmatrix} = 3\begin{pmatrix}1\\1\end{pmatrix}",
               36).move_to(P(3.3, 1.0))
        r2 = M(r"A\begin{pmatrix}1\\-1\end{pmatrix} = \begin{pmatrix}1\\-1\end{pmatrix} = 1\begin{pmatrix}1\\-1\end{pmatrix}",
               36).move_to(P(3.3, -0.6))
        with self.voiceover(f"But along the line y equals x, {sp('A v')} lands on the same line, three times "
                            f"longer.") as vo:
            self.play(th.animate.set_value(PI / 4), run_time=1.0)
            self.play(Create(e1), FadeIn(r1), run_time=1.0)
        with self.voiceover(f"And along y equals minus x, {sp('v')} does not move at all.") as vo:
            self.play(th.animate.set_value(3 * PI / 4), run_time=2.0)
            self.play(Create(e2), FadeIn(r2), run_time=1.0)
        defn = M(r"A\mathbf v = \lambda \mathbf v, \quad \mathbf v \ne \mathbf 0", 48, color=LAM).move_to(P(3.3, -2.2))
        dbox = SurroundingRectangle(defn, buff=0.2, corner_radius=0.12, color=LAM, stroke_width=3)
        with self.voiceover(f"These are eigenvectors. {sp('A v')} equals lambda {sp('v')}. The vector stays on its "
                            f"own line, and the eigenvalue lambda is the stretch: three and one here. The zero "
                            f"vector never counts, because it stays put for every matrix.") as vo:
            self.play(Write(defn), Create(dbox), run_time=1.4)

        av.clear_updaters()
        v.clear_updaters()
        vl.clear_updaters()
        avl.clear_updaters()
        keep = self.mobjects[0]
        self.play(*[FadeOut(m) for m in self.mobjects if m is not keep], run_time=0.6)

        def card(name, mtex, pic, verdict, col):
            box = RoundedRectangle(width=4.0, height=4.6, corner_radius=0.2, color=col, stroke_width=3)
            nm = T(name, 28, color=col, weight="BOLD")
            mt = M(mtex, 34)
            vd = T(verdict, 22, color=INK)
            inner = VGroup(nm, mt, pic, vd).arrange(DOWN, buff=0.3)
            return VGroup(box, inner.move_to(box))

        def pic_lines(angles, dim=False):
            base = VGroup(Line(P(-0.9, 0), P(0.9, 0), color=GRID), Line(P(0, -0.9), P(0, 0.9), color=GRID))
            for a in angles:
                d = P(np.cos(a), np.sin(a)) * 0.9
                base.add(DashedLine(-d, d, color=EIG, stroke_width=4))
            if dim:
                base.add(Arc(radius=0.6, start_angle=0, angle=PI / 2, color=WARN, stroke_width=4).add_tip(
                    tip_length=0.18))
            return base

        cards = VGroup(
            card("Shear", r"\begin{pmatrix}1&1\\0&1\end{pmatrix}", pic_lines([0]), "one line, λ = 1", SECONDARY),
            card("Quarter turn", r"\begin{pmatrix}0&-1\\1&0\end{pmatrix}", pic_lines([], dim=True),
                 "no real eigenvectors", WARN),
            card("Reflection in y = x", r"\begin{pmatrix}0&1\\1&0\end{pmatrix}", pic_lines([PI / 4, -PI / 4]),
                 "two lines, λ = 1 and −1", GREEN),
        ).arrange(RIGHT, buff=0.35).move_to(P(0, -0.2))
        for c in cards:
            fit(c[1][0], 3.7)
        with self.voiceover("Not every matrix has them. A shear keeps only one line, the x axis. A quarter turn "
                            "rotates every arrow, so it has no real eigenvectors at all. A reflection keeps two "
                            "lines: one it leaves alone, with lambda one, and one it flips, with lambda minus "
                            "one.") as vo:
            for c in cards:
                self.play(FadeIn(c, shift=0.2 * UP), run_time=0.8)

    # ------------------------------------------------------------ scene 5: finding eigenvalues (5.4)
    def s5(self):
        self.header("5.4 · Finding Eigenvalues")
        steps = VGroup(
            M(r"A\mathbf v = \lambda \mathbf v", 42),
            M(r"(A - \lambda I)\,\mathbf v = \mathbf 0, \quad \mathbf v \ne \mathbf 0", 42),
            M(r"A - \lambda I \text{ squashes the plane}", 42),
            M(r"\det(A - \lambda I) = 0", 48, color=LAM),
        ).arrange(DOWN, buff=0.35).move_to(P(-3.3, 0.4))
        arrows = VGroup(*[M(r"\Downarrow", 34, color=MUTED) for _ in range(3)])
        with self.voiceover(f"How do we find lambda without sweeping? Move everything to one side. {sp('A')} "
                            f"minus lambda I, times {sp('v')}, equals zero, with {sp('v')} not zero.") as vo:
            self.play(Write(steps[0]), run_time=0.8)
            self.play(Write(steps[1]), run_time=1.4)
        with self.voiceover(f"A matrix that sends a non zero vector to zero must squash the plane. So its "
                            f"determinant is zero. That is the characteristic equation.") as vo:
            self.play(Write(steps[2]), run_time=1.2)
            self.play(Write(steps[3]), run_time=1.0)
            self.play(Create(SurroundingRectangle(steps[3], buff=0.15, color=LAM, corner_radius=0.1)), run_time=0.6)
        del arrows
        two = M(r"\lambda^2 - (\operatorname{tr}A)\,\lambda + \det A = 0", 40, color=LAM).move_to(P(3.3, 2.4))
        ex = VGroup(
            M(r"A = \begin{pmatrix}4&1\\2&3\end{pmatrix}:\ \operatorname{tr} = 7,\ \det = 10", 36),
            M(r"\lambda^2 - 7\lambda + 10 = (\lambda - 5)(\lambda - 2)", 36),
            M(r"\lambda = 5:\ A - 5I = \begin{pmatrix}-1&1\\2&-2\end{pmatrix} \Rightarrow \mathbf v = (1, 1)", 36),
        ).arrange(DOWN, buff=0.35, aligned_edge=LEFT).move_to(P(3.3, 0.2))
        for x in ex:
            fit(x, 6.4)
        with self.voiceover("For a two by two, this always becomes lambda squared, minus the trace times lambda, "
                            "plus the determinant, equals zero.") as vo:
            self.play(Write(two), run_time=1.6)
        with self.voiceover(f"Take four one, two three. The trace is seven and the determinant is ten, so lambda "
                            f"squared minus seven lambda plus ten factors to give five and two. For lambda equals "
                            f"five, the rows of {sp('A')} minus five I are parallel, as they must be, and they give "
                            f"y equals x. The eigenvector is one one.") as vo:
            for x in ex:
                self.play(Write(x), run_time=1.5)
        trap = VGroup(
            M(r"\begin{pmatrix}1&2\\3&2\end{pmatrix}:\ \lambda = 4,\,-1 \quad (\text{not } 1, 2)", 36),
            M(r"\text{sum} = \operatorname{tr}A, \qquad \text{product} = \det A", 36, color=EIG),
        ).arrange(DOWN, buff=0.3).move_to(P(0, -2.7))
        with self.voiceover("One trap. The diagonal entries are the eigenvalues only for a triangular matrix. "
                            "One two, three two has diagonal one and two, but its eigenvalues are four and minus "
                            "one. What always holds: the eigenvalues add up to the trace, and multiply to the "
                            "determinant.") as vo:
            self.play(FadeIn(trap[0]), run_time=0.8)
            self.play(FadeIn(trap[1]), run_time=0.8)

    # ------------------------------------------------------------ scene 6: Cayley-Hamilton (5.5)
    def s6(self):
        self.header("5.5 · Cayley–Hamilton and Powers")
        l1 = M(r"\lambda^2 - 7\lambda + 10 = 0 \quad\leadsto\quad A^2 - 7A + 10I \;=\; ?", 42).move_to(P(0, 2.5))
        l2 = M(r"\begin{pmatrix}18&7\\14&11\end{pmatrix} - \begin{pmatrix}28&7\\14&21\end{pmatrix}"
               r" + \begin{pmatrix}10&0\\0&10\end{pmatrix} = \begin{pmatrix}0&0\\0&0\end{pmatrix}", 40).move_to(P(0, 1.0))
        fit(l2, 12.5)
        thm = T("Every square matrix satisfies its own characteristic equation.", 30, color=LAM,
                weight="BOLD").move_to(P(0, -0.3))
        fit(thm, 12.5)
        with self.voiceover(f"Here is a surprise. Take the same characteristic equation, and replace lambda by "
                            f"the matrix itself, with ten becoming ten I. {sp('A')} squared is eighteen seven, "
                            f"fourteen eleven. Subtract seven {sp('A')}, add ten I, and everything cancels. The "
                            f"zero matrix.") as vo:
            self.play(Write(l1), run_time=1.6)
            self.play(Write(l2), run_time=3.0)
        with self.voiceover("That is the Cayley Hamilton theorem. Every square matrix satisfies its own "
                            "characteristic equation.") as vo:
            self.play(FadeIn(thm, shift=0.2 * UP), run_time=1.0)
        uses = VGroup(
            M(r"A(7I - A) = 10I \;\Rightarrow\; A^{-1} = \tfrac{1}{10}(7I - A)", 38),
            M(r"A^2 = 7A - 10I \;\Rightarrow\; A^3 = 7A^2 - 10A = 39A - 70I", 38),
        ).arrange(DOWN, buff=0.35).move_to(P(0, -1.6))
        with self.voiceover(f"It is a tool. Rearranged, it hands you the inverse with no cofactors: one tenth of "
                            f"seven I minus {sp('A')}. And since {sp('A')} squared is seven {sp('A')} minus ten I, "
                            f"any higher power folds back down to a combination of {sp('A')} and I.") as vo:
            self.play(Write(uses[0]), run_time=1.6)
            self.play(Write(uses[1]), run_time=1.8)
        trap = T("Not a trick: det(A - AI) is a number; the theorem is a matrix equation.", 24,
                 color=WARN).move_to(P(0, -3.2))
        fit(trap, 12.8)
        with self.voiceover(f"And it is not the cheap trick of putting lambda equals {sp('A')} inside the "
                            f"determinant. That gives a single number. The theorem is an equation between "
                            f"matrices, and it needed a real proof.") as vo:
            self.play(FadeIn(trap), run_time=0.8)

    # ------------------------------------------------------------ scene 7: recap
    def s7(self):
        head = T("Chapter 5 in five lines", 36, color=PRIMARY, weight="BOLD").move_to(P(0, 3.1))
        lines = VGroup(
            M(r"\operatorname{rank} A = \text{dimensions that survive} = \text{non-zero rows in echelon form}", 36),
            M(r"\text{consistent} \iff \operatorname{rank} A = \operatorname{rank}[A \mid B];"
              r"\quad \text{unique} \iff \text{rank} = n", 36),
            M(r"A\mathbf v = \lambda \mathbf v:\ \mathbf v \text{ stays on its line, stretched by } \lambda", 36),
            M(r"\det(A - \lambda I) = 0; \quad \textstyle\sum \lambda = \operatorname{tr}A,"
              r"\ \prod \lambda = \det A", 36),
            M(r"A^2 - (\operatorname{tr}A)A + (\det A)I = O \ \ (\text{Cayley--Hamilton})", 36),
        ).arrange(DOWN, buff=0.42, aligned_edge=LEFT).move_to(P(0, -0.3))
        for ln in lines:
            fit(ln, 12.5)
        with self.voiceover("To recap. Rank counts the dimensions that survive, and you read it from echelon "
                            "form. Equal ranks mean consistent, and rank equal to the number of unknowns means "
                            "unique.") as vo:
            self.play(FadeIn(head), run_time=0.6)
            self.play(FadeIn(lines[0], shift=0.2 * UP), run_time=0.8)
            self.play(FadeIn(lines[1], shift=0.2 * UP), run_time=0.8)
        with self.voiceover(f"Eigenvectors stay on their own line, stretched by lambda. You find lambda from the "
                            f"determinant of {sp('A')} minus lambda I equals zero, and check it with the trace "
                            f"and the determinant.") as vo:
            self.play(FadeIn(lines[2], shift=0.2 * UP), run_time=0.8)
            self.play(FadeIn(lines[3], shift=0.2 * UP), run_time=0.8)
        with self.voiceover("And every matrix satisfies its own characteristic equation. From grids that move, "
                            "to how they multiply, how much space they change, how to undo them, and now their "
                            "shape: that is the whole course.") as vo:
            self.play(FadeIn(lines[4], shift=0.2 * UP), run_time=0.8)
