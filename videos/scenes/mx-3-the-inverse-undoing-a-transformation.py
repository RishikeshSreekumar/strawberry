import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

# Chapter colour roles (light background).
COL1 = PRIMARY  # i-hat image / column 1 = strawberry red
COL2 = ManimColor("#2B6CB0")  # j-hat image / column 2 = blue
SHAPE = ACCENT  # the test shape
HL = ManimColor("#D19A00")  # highlight (gold)
WARN = PRIMARY
OK = GREEN

U = 0.8  # scene units per grid unit
O = np.array([-2.8, -0.4, 0.0])  # grid origin (left of centre; right third holds cards)


# ---------------------------------------------------------------- helpers
def T(s, size=30, **kw):
    return Text(s, font_size=size, **kw)


def M(s, size=40, **kw):
    return MathTex(s, font_size=size, **kw)


def pm(rows):
    body = r" \\ ".join(" & ".join(str(x) for x in r) for r in rows)
    return r"\begin{pmatrix} " + body + r" \end{pmatrix}"


def mat(rows, size=40, bracket="(", h_buff=1.0, v_buff=0.75):
    close = {"(": ")", "[": "]"}[bracket]
    return Matrix(
        [[str(x) for x in r] for r in rows],
        left_bracket=bracket, right_bracket=close, h_buff=h_buff, v_buff=v_buff,
        element_to_mobject_config={"font_size": size},
        element_alignment_corner=ORIGIN,
    )


def card(mob, pad=0.25, color=MUTED, fill=WHITE, opacity=0.93):
    box = SurroundingRectangle(mob, buff=pad, corner_radius=0.15, color=color, stroke_width=2)
    box.set_fill(fill, opacity=opacity)
    g = VGroup(box, mob)
    g.set_z_index(10)
    return g


def check():
    return MathTex(r"\checkmark", color=OK, font_size=52)


def cross_mark():
    return MathTex(r"\times", color=WARN, font_size=60)


def P(x, y):
    """Grid coordinates -> scene point."""
    return O + U * np.array([x, y, 0.0])


class MxCh3Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Matrices",
            "Chapter 3 · The Inverse: Undoing a Transformation",
            "Matrices, chapter three. The inverse: undoing a transformation.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ kit
    def header(self, s):
        t = T(s, 24, color=MUTED)
        h = card(t, pad=0.14, opacity=0.95, color=GRID)
        h.to_corner(UL, buff=0.25)
        return h

    def plane(self):
        p = NumberPlane(
            x_range=[-16, 16, 1], y_range=[-12, 12, 1],
            background_line_style={"stroke_color": GRID, "stroke_width": 1.6, "stroke_opacity": 1},
            axis_config={"stroke_color": MUTED, "stroke_width": 2},
        )
        p.scale(U).shift(O)
        return p

    def vec(self, v, color):
        return Arrow(O, P(*v), buff=0, color=color, stroke_width=7,
                     max_tip_length_to_length_ratio=0.3, max_stroke_width_to_length_ratio=12)

    def f_shape(self):
        pts = [(0, 0), (0.4, 0), (0.4, 0.8), (1, 0.8), (1, 1.2), (0.4, 1.2), (0.4, 1.6),
               (1.2, 1.6), (1.2, 2), (0, 2)]
        poly = Polygon(*[P(x + 0.6, y + 0.4) for x, y in pts], color=SHAPE, stroke_width=3)
        poly.set_fill(SHAPE, opacity=0.55)
        return poly

    # ------------------------------------------------------------ scene 1
    def s1(self):
        hdr = self.header("3.1 · Undoing a Transformation")
        plane = self.plane()
        F = self.f_shape()
        home = DashedVMobject(F.copy().set_fill(opacity=0).set_stroke(MUTED, 2.5), num_dashes=45)
        ih, jh = self.vec((1, 0), COL1), self.vec((0, 1), COL2)
        A = [[1, -1], [1, 0]]
        Ai = [[0, 1], [-1, 1]]
        cA = card(VGroup(M(r"A = " + pm(A), 40),
                         T("rotate 90°, then shear", 22, color=MUTED)).arrange(DOWN, buff=0.18))
        cA.move_to([4.6, 2.0, 0])
        q = card(T("Can it be undone?", 30, color=HL, weight="BOLD")).move_to([4.6, -0.2, 0])

        with self.voiceover("Every matrix moves the plane. This one turns the grid a quarter turn, "
                            "then shears it. The natural question is the one you ask of any action. "
                            "Can it be undone?") as vo:
            self.play(FadeIn(plane), FadeIn(hdr), run_time=0.8)
            self.play(Create(home), FadeIn(F), GrowArrow(ih), GrowArrow(jh), FadeIn(cA), run_time=1.0)
            self.play(ApplyMatrix(A, VGroup(plane, F), about_point=O),
                      Transform(ih, self.vec((1, 1), COL1)), Transform(jh, self.vec((-1, 0), COL2)),
                      run_time=min(3.0, max(1.5, vo.duration - 4.0)))
            self.play(FadeIn(q, shift=0.2 * UP), run_time=0.6)

        cAi = card(VGroup(M(r"A^{-1} = " + pm(Ai), 40),
                          T("the undo matrix", 22, color=MUTED)).arrange(DOWN, buff=0.18))
        cAi.move_to([4.6, -0.2, 0])
        with self.voiceover("Here is a second matrix that does exactly that. Apply it to the result, "
                            "and every point slides back to where it started. That undo matrix is "
                            "called A inverse.") as vo:
            self.play(FadeOut(q), FadeIn(cAi, shift=0.2 * UP), run_time=0.8)
            self.play(ApplyMatrix(Ai, VGroup(plane, F), about_point=O),
                      Transform(ih, self.vec((1, 0), COL1)), Transform(jh, self.vec((0, 1), COL2)),
                      run_time=3.0)
            self.play(home.animate.set_stroke(OK, 5), run_time=0.6)
            self.play(Indicate(F, color=OK, scale_factor=1.1), run_time=0.8)

        cI = card(VGroup(M(r"A\,A^{-1} = A^{-1}A = I", 40),
                         T("an inverse, if it exists, is unique", 22, color=MUTED)).arrange(DOWN, buff=0.18))
        cI.move_to([4.6, -2.45, 0])
        with self.voiceover("Doing A and then A inverse changes nothing, and neither does the other order. "
                            "In symbols, A times A inverse equals A inverse times A equals the identity. "
                            "And when an inverse exists, there is only one.") as vo:
            self.play(FadeIn(cI, shift=0.2 * UP), run_time=1.0)
            self.wait(vo.duration * 0.5)
            self.play(Circumscribe(cI, color=HL), run_time=1.2)

    # ------------------------------------------------------------ scene 2
    def s2(self):
        hdr = self.header("3.1 · When Undo Is Impossible")
        plane = self.plane()
        A = [[1, 2], [2, 4]]
        cA = card(VGroup(M(r"A = " + pm(A), 40),
                         T("both columns lie on one line", 22, color=MUTED)).arrange(DOWN, buff=0.18))
        cA.move_to([4.6, 2.0, 0])
        line = Line(P(-2.3, -4.6), P(2.3, 4.6), color=HL, stroke_width=4)
        with self.voiceover("Now try the matrix with rows one, two and two, four. Its columns point along "
                            "the same line, so the whole plane is flattened onto that line.") as vo:
            self.play(FadeIn(plane), FadeIn(hdr), FadeIn(cA), run_time=0.9)
            self.play(Create(line), run_time=0.8)
            self.play(ApplyMatrix(A, plane, about_point=O), run_time=max(1.5, min(3.0, vo.duration - 2.5)))

        fresh = self.plane()
        d1 = Dot(P(2, 0), color=COL1, radius=0.1)
        d2 = Dot(P(0, 1), color=COL2, radius=0.1)
        l1 = M("(2,0)", 30, color=COL1).next_to(d1, DR, buff=0.08)
        l2 = M("(0,1)", 30, color=COL2).next_to(d2, LEFT, buff=0.12)
        for m in (l1, l2):
            m.add_background_rectangle(color=BG, opacity=0.9, buff=0.05)
        tgt = P(2, 4)
        lt = M("(2,4)", 30).next_to(tgt, RIGHT, buff=0.15).add_background_rectangle(color=BG, opacity=0.9, buff=0.05)
        c2 = card(T("two inputs, one output", 26, color=INK)).move_to([4.6, 0.1, 0])
        with self.voiceover("Watch two different inputs. The point two, zero and the point zero, one both "
                            "land on the point two, four. An undo would have to send two, four back to "
                            "both at once. No function can do that.") as vo:
            self.play(Transform(plane, fresh), run_time=0.8)
            self.play(FadeIn(d1, scale=0.5), FadeIn(d2, scale=0.5), FadeIn(l1), FadeIn(l2), run_time=0.8)
            self.play(ApplyMatrix(A, plane, about_point=O), d1.animate.move_to(tgt), d2.animate.move_to(tgt),
                      FadeOut(l1), FadeOut(l2), run_time=2.2)
            self.play(FadeIn(lt), FadeIn(c2), run_time=0.7)
            g1 = Dot(P(2, 0), color=COL1, radius=0.08).set_opacity(0.6)
            g2 = Dot(P(0, 1), color=COL2, radius=0.08).set_opacity(0.6)
            b1 = CurvedArrow(tgt + 0.1 * DOWN, P(2, 0) + 0.12 * UP, angle=-PI / 3, color=COL1, stroke_width=3)
            b2 = CurvedArrow(tgt + 0.1 * LEFT, P(0, 1) + 0.12 * UP, angle=PI / 3, color=COL2, stroke_width=3)
            qm = M("?", 56, color=WARN).move_to(P(0.9, 2.5))
            self.play(FadeIn(g1), FadeIn(g2), Create(b1), Create(b2), run_time=1.2)
            self.play(FadeIn(qm, scale=0.5), run_time=0.5)

        c3 = card(VGroup(M(r"\det A = 1\cdot 4 - 2\cdot 2 = 0", 34),
                         M(r"A^{-1}\ \text{exists} \iff \det A \ne 0", 34, color=OK),
                         T("det ≠ 0: non-singular    det = 0: singular", 20, color=MUTED))
                  .arrange(DOWN, buff=0.22))
        c3.move_to([3.9, -2.3, 0])
        with self.voiceover("So a matrix has an inverse exactly when nothing is squashed, that is, when its "
                            "determinant is not zero. Such a matrix is called non singular. A zero "
                            "determinant means singular, and no inverse.") as vo:
            self.play(FadeIn(c3, shift=0.2 * UP), run_time=1.0)
            self.wait(vo.duration * 0.4)
            self.play(Circumscribe(c3[1][1], color=HL), run_time=1.2)

        # beat d: the reciprocal trap
        keep = [hdr]
        self.play(*[FadeOut(m) for m in self.mobjects if m is not hdr], run_time=0.6)
        hdr2 = self.header("3.1 · A Trap")
        wrong = M(pm([[2, 1], [1, 1]]) + r"^{-1} \ne " + pm([[r"\tfrac12", 1], [1, 1]]), 48)
        wx = cross_mark().next_to(wrong, RIGHT, buff=0.35)
        wl = T("not the reciprocal of each entry", 26, color=WARN).next_to(wrong, UP, buff=0.35)
        right = M(pm([[2, 1], [1, 1]]) + r"^{-1} = " + pm([[1, -1], [-1, 2]]), 48, color=OK)
        rc = check().next_to(right, RIGHT, buff=0.35)
        note = T("multiplication mixes rows with columns", 26, color=MUTED)
        VGroup(wl, VGroup(wrong, wx), VGroup(right, rc), note).arrange(DOWN, buff=0.5).move_to([0, -0.2, 0])
        with self.voiceover("One trap to avoid. The inverse is not the matrix of reciprocals. Multiplication "
                            "mixes rows with columns, so it cannot be undone entry by entry.") as vo:
            self.play(ReplacementTransform(hdr, hdr2), FadeIn(wl), Write(wrong), run_time=1.2)
            self.play(FadeIn(wx, scale=0.5), run_time=0.5)
            self.wait(vo.duration * 0.2)
            self.play(Write(right), FadeIn(rc), run_time=1.2)
            self.play(FadeIn(note), run_time=0.6)

    # ------------------------------------------------------------ scene 3
    def s3(self):
        hdr = self.header("3.2 · The 2×2 Inverse, Derived")
        top = M(r"\begin{pmatrix} a & b \\ c & d \end{pmatrix}\begin{pmatrix} p & q \\ r & s \end{pmatrix}"
                r" = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}", 44).move_to([0, 2.1, 0])
        eqs = VGroup(M("ap + br = 1", 38), M("aq + bs = 0", 38),
                     M("cp + dr = 0", 38), M("cq + ds = 1", 38))
        eqs.arrange_in_grid(2, 2, buff=(1.4, 0.35)).move_to([0, 0.4, 0])
        sol = M(r"p = \frac{d}{\Delta},\quad q = \frac{-b}{\Delta},\quad r = \frac{-c}{\Delta},\quad"
                r" s = \frac{a}{\Delta}", 42).move_to([0, -1.6, 0])
        dl = M(r"\Delta = ad - bc", 42, color=HL).next_to(sol, DOWN, buff=0.4)
        with self.voiceover("For a two by two matrix we can derive the inverse. Set A times an unknown "
                            "matrix equal to the identity, and solve the four equations. The same number, "
                            "a d minus b c, appears in every denominator.") as vo:
            self.play(FadeIn(hdr), Write(top), run_time=1.3)
            self.play(LaggedStart(*[FadeIn(e, shift=0.15 * DOWN) for e in eqs], lag_ratio=0.25), run_time=1.6)
            self.wait(max(0.1, vo.duration * 0.25))
            self.play(Write(sol), run_time=1.5)
            self.play(FadeIn(dl, shift=0.15 * UP), run_time=0.7)

        # beat b: swap / negate / divide
        self.play(FadeOut(top), FadeOut(eqs), FadeOut(sol), FadeOut(dl), run_time=0.6)
        A = mat([["a", "b"], ["c", "d"]], size=52, h_buff=1.2, v_buff=0.9)
        Tm = mat([["d", "-b"], ["-c", "a"]], size=52, h_buff=1.2, v_buff=0.9)
        frac = M(r"\frac{1}{ad - bc}", 52)
        lhs = M(r"A^{-1} =", 52)
        row = VGroup(lhs, frac, Tm).arrange(RIGHT, buff=0.3).move_to([0, 0.6, 0])
        lhs0 = M("A =", 52).move_to(lhs, aligned_edge=RIGHT)
        A.move_to(Tm)
        e, te = A.get_entries(), Tm.get_entries()
        steps = VGroup(T("1. swap the diagonal", 28, color=HL),
                       T("2. negate the off-diagonal", 28, color=WARN),
                       T("3. divide by ad − bc", 28, color=INK)).arrange(DOWN, buff=0.25, aligned_edge=LEFT)
        steps.move_to([0, -2.0, 0])
        zero = T("ad − bc = 0 → dividing by zero: no inverse", 24, color=MUTED).next_to(frac, UP, buff=0.5)
        with self.voiceover("Read the recipe. Swap the two diagonal entries. Negate the two off diagonal "
                            "entries. Divide by a d minus b c. And now you see why a zero determinant blocks "
                            "the inverse: you would be dividing by zero.") as vo:
            self.play(FadeIn(lhs0), FadeIn(A), run_time=0.7)
            self.play(e[0].animate(path_arc=-PI / 2).move_to(te[3]).set_color(HL),
                      e[3].animate(path_arc=-PI / 2).move_to(te[0]).set_color(HL),
                      FadeIn(steps[0]), run_time=1.4)
            self.play(Transform(e[1], te[1].copy().set_color(WARN)),
                      Transform(e[2], te[2].copy().set_color(WARN)),
                      Transform(A.get_brackets(), Tm.get_brackets()),
                      FadeIn(steps[1]), run_time=1.2)
            self.play(FadeIn(frac, shift=0.2 * RIGHT), ReplacementTransform(lhs0, lhs), FadeIn(steps[2]),
                      run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.25))
            self.play(FadeIn(zero, shift=0.1 * DOWN), run_time=0.7)

        # beat c: worked example
        self.play(*[FadeOut(m) for m in self.mobjects if m is not hdr], run_time=0.6)
        L1 = M(r"A = " + pm([[4, 7], [2, 6]]), 38)
        L2 = M(r"\det A = 4\cdot 6 - 7\cdot 2 = 24 - 14 = 10", 38)
        L3 = M(r"A^{-1} = \frac{1}{10}" + pm([[6, -7], [-2, 4]]), 38)
        L4 = M(pm([[4, 7], [2, 6]]) + pm([[6, -7], [-2, 4]]) + " = " + pm([[10, 0], [0, 10]]) + r" = 10\,I", 38)
        ck = check().next_to(L4, RIGHT, buff=0.3)
        lines = VGroup(L1, L2, L3, VGroup(L4, ck)).arrange(DOWN, buff=0.3, aligned_edge=LEFT).move_to([0, -0.35, 0])
        with self.voiceover("An example. For rows four, seven and two, six, the determinant is twenty four "
                            "minus fourteen, which is ten. Swap and negate, then divide by ten. Multiply back "
                            "to check: the product is ten times the identity, so dividing by ten gives "
                            "exactly the identity.") as vo:
            self.play(FadeIn(L1), run_time=0.7)
            self.play(Write(L2), run_time=1.3)
            self.wait(vo.duration * 0.12)
            self.play(Write(L3), run_time=1.3)
            self.wait(vo.duration * 0.1)
            self.play(Write(L4), run_time=1.5)
            self.play(FadeIn(ck, scale=0.5), run_time=0.5)

        # beat d: only the off-diagonal changes sign
        self.play(*[FadeOut(m) for m in self.mobjects if m is not hdr], run_time=0.6)
        good = VGroup(M(pm([[6, -7], [-2, 4]]), 54), check())
        good.arrange(RIGHT, buff=0.3)
        gl = T("swap diagonal, negate off-diagonal", 24, color=OK)
        bad = VGroup(M(pm([[-6, -7], [-2, -4]]), 54), cross_mark()).arrange(RIGHT, buff=0.3)
        bl = T("negate everything", 24, color=WARN)
        gg = VGroup(good, gl).arrange(DOWN, buff=0.35)
        bg = VGroup(bad, bl).arrange(DOWN, buff=0.35)
        VGroup(gg, bg).arrange(RIGHT, buff=1.6).move_to([0, 0.2, 0])
        with self.voiceover("Careful. Only the off diagonal entries change sign. The diagonal entries swap "
                            "places but keep their signs.") as vo:
            self.play(FadeIn(gg), run_time=0.8)
            self.play(FadeIn(bg), run_time=0.8)
            self.play(Circumscribe(bad[0], color=WARN), run_time=1.2)

    # ------------------------------------------------------------ scene 4
    def s4(self):
        hdr = self.header("3.3 · Cofactors and the Adjoint")
        Ar = [[1, 2, 1], [0, 3, 2], [1, 0, 1]]
        A = mat(Ar, size=40)
        Ag = VGroup(M("A =", 40), A).arrange(RIGHT, buff=0.25)
        Ag.move_to([-3.4, 1.2, 0])
        S = mat([["+", "-", "+"], ["-", "+", "-"], ["+", "-", "+"]], size=40)
        Sl = T("checkerboard of signs", 22, color=MUTED)
        Sg = VGroup(S, Sl).arrange(DOWN, buff=0.25).move_to([3.4, 1.0, 0])
        S.get_entries()[1].set_color(HL)
        rowbar = SurroundingRectangle(A.get_rows()[0], color=WARN, buff=0.08, stroke_width=3)
        colbar = SurroundingRectangle(A.get_columns()[1], color=WARN, buff=0.08, stroke_width=3)
        ex = M(r"C_{12} = -\begin{vmatrix} 0 & 2 \\ 1 & 1 \end{vmatrix} = -(0 - 2) = 2", 40).move_to([0, -1.7, 0])
        ex[0][0:3].set_color(HL)
        with self.voiceover("For bigger matrices we want the same trick: a matrix that multiplies A to give "
                            "det of A times the identity. The cofactors from chapter two do the job. Each "
                            "cofactor is a minor with a checkerboard sign.") as vo:
            self.play(FadeIn(hdr), FadeIn(Ag), run_time=0.9)
            self.wait(vo.duration * 0.3)
            self.play(FadeIn(Sg), run_time=0.8)
            self.play(Create(rowbar), Create(colbar), run_time=0.8)
            self.play(Write(ex), run_time=1.5)

        C = [[3, 2, -3], [-2, 0, 2], [1, -2, 3]]
        adj = [[3, -2, 1], [2, 0, -2], [-3, 2, 3]]
        Cm = mat(C, size=38, h_buff=1.0)
        Cl = T("cofactor matrix", 24, color=MUTED)
        Cg = VGroup(Cl, Cm).arrange(DOWN, buff=0.25).move_to([0, 0.3, 0])
        Dm = mat(adj, size=38, h_buff=1.0)
        Dl = M(r"\operatorname{adj}A", 38)
        Dg = VGroup(Dl, Dm).arrange(DOWN, buff=0.25).move_to([4.3, 0.3, 0])
        warn = T("forgetting the transpose is the classic mistake", 26, color=WARN).move_to([0, -2.6, 0])
        with self.voiceover("Collect the cofactors into a matrix, then transpose it: rows become columns. "
                            "The result is the adjoint of A. Forgetting the transpose is the classic "
                            "mistake.") as vo:
            self.play(FadeOut(Sg), FadeOut(ex), FadeOut(rowbar), FadeOut(colbar),
                      Ag.animate.scale(0.9).move_to([-4.4, 0.3, 0]), run_time=0.8)
            self.play(FadeIn(Cg), run_time=0.9)
            ce, de = Cm.get_entries(), Dm.get_entries()
            for k in (0, 4, 8):
                ce[k].set_color(HL)
                de[k].set_color(HL)
            self.play(FadeIn(Dl), FadeIn(Dm.get_brackets()), run_time=0.6)
            moves = []
            for i in range(3):
                for j in range(3):
                    moves.append(TransformFromCopy(ce[3 * i + j], de[3 * j + i], path_arc=-PI / 4))
            self.play(LaggedStart(*moves, lag_ratio=0.08), run_time=2.4)
            self.play(FadeIn(warn), run_time=0.6)

        self.play(*[FadeOut(m) for m in self.mobjects if m is not hdr], run_time=0.6)
        l1 = M(r"\text{row 1}\cdot\text{its own cofactors}:\ 1\cdot 3 + 2\cdot 2 + 1\cdot(-3) = 4 = |A|", 36,
               color=OK)
        l2 = M(r"\text{row 1}\cdot\text{row 2's cofactors}:\ 1\cdot(-2) + 2\cdot 0 + 1\cdot 2 = 0", 36, color=MUTED)
        l2n = T("= the determinant of a matrix with two equal rows", 22, color=MUTED)
        l3 = M(pm(Ar) + pm(adj) + " = " + pm([[4, 0, 0], [0, 4, 0], [0, 0, 4]]) + r" = |A|\,I", 38)
        grp = VGroup(l1, l2, l2n, l3).arrange(DOWN, buff=0.35).move_to([0, -0.2, 0])
        l2n.shift(0.15 * UP)
        l3.shift(0.3 * DOWN)
        with self.voiceover("Why does it work? Multiply A by its adjoint. A row times its own cofactors "
                            "expands the determinant, which is four. A row times another row's cofactors is "
                            "the determinant of a matrix with two equal rows, which is zero. So A times "
                            "adjoint of A is det of A times the identity.") as vo:
            self.play(Write(l1), run_time=1.6)
            self.wait(vo.duration * 0.12)
            self.play(Write(l2), run_time=1.6)
            self.play(FadeIn(l2n), run_time=0.6)
            self.wait(vo.duration * 0.12)
            self.play(Write(l3), run_time=1.8)

    # ------------------------------------------------------------ scene 5
    def s5(self):
        hdr = self.header("3.4 · Inverse via the Adjoint, and Its Rules")
        f = M(r"A^{-1} = \frac{1}{|A|}\,\operatorname{adj}A", 60)
        fb = SurroundingRectangle(f, color=HL, buff=0.25, corner_radius=0.12, stroke_width=3)
        VGroup(f, fb).move_to([0, 1.6, 0])
        ex = M(r"A^{-1} = \frac{1}{4}" + pm([[3, -2, 1], [2, 0, -2], [-3, 2, 3]]), 44).move_to([0, -1.0, 0])
        exl = M(r"|A| = 4", 36, color=MUTED).next_to(ex, DOWN, buff=0.35)
        with self.voiceover("Divide by the determinant, and there is the inverse. A inverse equals one over "
                            "det of A, times adjoint of A. For our three by three example the determinant is "
                            "four, so the inverse is one quarter of the adjoint.") as vo:
            self.play(FadeIn(hdr), Write(f), run_time=1.3)
            self.play(Create(fb), run_time=0.6)
            self.wait(vo.duration * 0.25)
            self.play(Write(ex), FadeIn(exl), run_time=1.5)

        self.play(*[FadeOut(m) for m in self.mobjects if m is not hdr], run_time=0.6)

        def chip(word, tex, color):
            g = VGroup(T(word, 28), M(tex, 34, color=color)).arrange(DOWN, buff=0.12)
            box = SurroundingRectangle(g, buff=0.2, corner_radius=0.15, color=color, stroke_width=3)
            box.set_fill(WHITE, 0.9)
            return VGroup(box, g)

        def chain(label, a, b):
            lab = T(label, 28, color=MUTED)
            arr = Arrow(LEFT, RIGHT, buff=0, color=MUTED, stroke_width=4, max_tip_length_to_length_ratio=0.25)
            g = VGroup(lab, a, arr, b).arrange(RIGHT, buff=0.35)
            return g

        r1 = chain("put on:", chip("socks", "B", COL2), chip("shoes", "A", COL1))
        r2 = chain("take off:", chip("shoes", "A^{-1}", COL1), chip("socks", "B^{-1}", COL2))
        rows = VGroup(r1, r2).arrange(DOWN, buff=0.45, aligned_edge=LEFT).move_to([0, 1.3, 0])
        note = T("AB means: do B first, then A", 22, color=MUTED).next_to(rows, DOWN, buff=0.3)
        good = M(r"(AB)^{-1} = B^{-1}A^{-1}", 52, color=OK)
        bad = VGroup(M(r"\ne A^{-1}B^{-1}", 44, color=WARN), cross_mark()).arrange(RIGHT, buff=0.25)
        VGroup(good, bad).arrange(RIGHT, buff=0.6).move_to([0, -2.1, 0])
        with self.voiceover("Inverses of products come off in reverse order. A B means do B first, then A, "
                            "like socks and then shoes. To undo, take the shoes off first. So the inverse of "
                            "A B is B inverse times A inverse, not A inverse times B inverse.") as vo:
            self.play(FadeIn(r1), FadeIn(note), run_time=0.9)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(r2), run_time=0.9)
            self.wait(vo.duration * 0.15)
            self.play(Write(good), run_time=1.2)
            self.play(FadeIn(bad), run_time=0.7)

        rules = VGroup(M(r"(AB)^{-1} = B^{-1}A^{-1}", 46),
                       M(r"(A^T)^{-1} = \left(A^{-1}\right)^T", 46),
                       M(r"|A^{-1}| = \frac{1}{|A|}", 46)).arrange(DOWN, buff=0.45)
        rc = card(rules, pad=0.4).move_to([0, -0.2, 0])
        with self.voiceover("Two more rules follow the same way. The inverse of the transpose is the "
                            "transpose of the inverse. And the determinant of A inverse is one over det "
                            "of A.") as vo:
            self.play(*[FadeOut(m) for m in (r1, r2, note, bad)], ReplacementTransform(good, rules[0]),
                      FadeIn(rc[0]), run_time=0.9)
            self.add(rc)
            self.play(FadeIn(rules[1], shift=0.15 * UP), run_time=0.8)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(rules[2], shift=0.15 * UP), run_time=0.8)

        self.play(*[FadeOut(m) for m in self.mobjects if m is not hdr], run_time=0.6)
        c1 = M(r"A^2 - 4A + I = O", 44)
        c2 = M(r"A\,(4I - A) = I", 44)
        c3 = M(r"A^{-1} = 4I - A", 48, color=OK)
        ch = VGroup(c1, c2, c3).arrange(DOWN, buff=0.8).move_to([-3.3, -0.2, 0])
        a1 = Arrow(c1.get_bottom(), c2.get_top(), buff=0.12, color=MUTED, stroke_width=4)
        a2 = Arrow(c2.get_bottom(), c3.get_top(), buff=0.12, color=MUTED, stroke_width=4)
        e1 = M(r"A = " + pm([[2, 3], [1, 2]]), 42)
        e2 = M(r"A^{-1} = 4I - A = " + pm([[2, -3], [-1, 2]]), 42)
        eg = VGroup(T("example", 24, color=MUTED), e1, e2).arrange(DOWN, buff=0.4).move_to([3.3, -0.2, 0])
        with self.voiceover("Sometimes a polynomial hands you the inverse. If A squared minus four A plus the "
                            "identity is zero, then A times the quantity four I minus A equals the identity. "
                            "So A inverse is four I minus A, with no adjoint at all.") as vo:
            self.play(Write(c1), run_time=1.0)
            self.wait(vo.duration * 0.15)
            self.play(GrowArrow(a1), Write(c2), run_time=1.2)
            self.play(GrowArrow(a2), Write(c3), run_time=1.2)
            self.play(FadeIn(eg), run_time=1.0)

    # ------------------------------------------------------------ scene 6
    def aug(self, rows, center, size=46, h_buff=1.25):
        m = mat(rows, size=size, bracket="[", h_buff=h_buff, v_buff=0.85)
        m.move_to(center)
        cols = m.get_columns()
        x = (cols[1].get_right()[0] + cols[2].get_left()[0]) / 2
        bar = Line([x, m.get_top()[1] - 0.1, 0], [x, m.get_bottom()[1] + 0.1, 0], color=INK, stroke_width=3)
        return VGroup(m, bar)

    def s6(self):
        hdr = self.header("3.5 · Inverse by Row Operations")
        banner = M(r"\big[\,A \mid I\,\big] \;\xrightarrow{\text{row operations}}\; \big[\,I \mid A^{-1}\,\big]", 50)
        banner.move_to([0, 2.3, 0])
        h = r"\tfrac12"
        states = [
            ([[2, 1, 1, 0], [5, 3, 0, 1]], None, None),
            ([[1, h, h, 0], [5, 3, 0, 1]], r"R_1 \to \tfrac12 R_1", 0),
            ([[1, h, h, 0], [0, h, r"-\tfrac52", 1]], r"R_2 \to R_2 - 5R_1", 1),
            ([[1, h, h, 0], [0, 1, -5, 2]], r"R_2 \to 2R_2", 1),
            ([[1, 0, 3, -1], [0, 1, -5, 2]], r"R_1 \to R_1 - \tfrac12 R_2", 0),
        ]
        C = np.array([-1.3, -0.3, 0])
        cur = self.aug(states[0][0], C)
        labA = M("A", 36, color=MUTED)
        labI = M("I", 36, color=MUTED)

        def place_labels(g):
            cols = g[0].get_columns()
            labA.next_to(VGroup(cols[0], cols[1]), DOWN, buff=0.45)
            labI.next_to(VGroup(cols[2], cols[3]), DOWN, buff=0.45)
            labA.set_y(g[0].get_bottom()[1] - 0.35)
            labI.set_y(g[0].get_bottom()[1] - 0.35)

        place_labels(cur)
        with self.voiceover("For large matrices, row operations win. Write A next to the identity. Use row "
                            "operations to turn the left block into the identity, and the right block "
                            "becomes A inverse.") as vo:
            self.play(FadeIn(hdr), Write(banner), run_time=1.4)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(cur), FadeIn(labA), FadeIn(labI), run_time=1.0)

        op = None
        with self.voiceover("Take rows two, one and five, three. Halve row one. Subtract five times row one "
                            "from row two. Double row two. Subtract half of row two from row one. The right "
                            "block now reads three, minus one, minus five, two.") as vo:
            self.wait(1.6)
            for rows, tex, r in states[1:]:
                new = self.aug(rows, C)
                nop = M(tex, 40, color=HL).move_to([4.3, -0.3, 0])
                anims = [Transform(cur, new)]
                anims.append(FadeIn(nop, shift=0.15 * LEFT) if op is None else ReplacementTransform(op, nop))
                self.play(*anims, run_time=1.0)
                op = nop
                hlr = SurroundingRectangle(cur[0].get_rows()[r], color=HL, buff=0.1, stroke_width=3)
                self.play(Create(hlr), run_time=0.4)
                self.play(FadeOut(hlr), run_time=0.3)
                self.wait(max(0.1, vo.duration * 0.12 - 1.7))
            cols = cur[0].get_columns()
            box = SurroundingRectangle(VGroup(cols[2], cols[3]), color=OK, buff=0.15, stroke_width=4)
            self.play(Create(box), Transform(labI, M("A^{-1}", 36, color=OK).move_to(labI)),
                      Transform(labA, M("I", 36, color=MUTED).move_to(labA)), run_time=0.9)

        l1 = M(r"E_k \cdots E_2 E_1\, A = I \;\Rightarrow\; E_k \cdots E_2 E_1 = A^{-1}", 42)
        l2 = M(r"\text{right block: } E_k \cdots E_2 E_1\, I = A^{-1}", 42, color=OK)
        ls = VGroup(l1, l2).arrange(DOWN, buff=0.4).move_to([0, -1.9, 0])
        with self.voiceover("Why does this work? Each row operation is multiplication by an elementary "
                            "matrix. Their product turns A into the identity, so that product is A inverse. "
                            "The right block started as the identity and has recorded exactly that "
                            "product.") as vo:
            self.play(FadeOut(banner), FadeOut(op),
                      VGroup(cur, box, labA, labI).animate.scale(0.8).move_to([0, 1.5, 0]), run_time=0.9)
            self.play(Write(l1), run_time=1.6)
            self.wait(vo.duration * 0.2)
            self.play(Write(l2), run_time=1.4)

        self.play(*[FadeOut(m) for m in self.mobjects if m is not hdr], run_time=0.6)
        s1 = self.aug([[1, 2, 1, 0], [2, 4, 0, 1]], [-4.1, 0.6, 0], size=40, h_buff=1.0)
        s2 = self.aug([[1, 2, 1, 0], [0, 0, -2, 1]], [4.1, 0.6, 0], size=40, h_buff=1.0)
        arr = Arrow([-1.3, 0.6, 0], [1.3, 0.6, 0], buff=0, color=MUTED, stroke_width=4)
        opl = M(r"R_2 \to R_2 - 2R_1", 30, color=HL).next_to(arr, UP, buff=0.15)
        ent = s2[0].get_entries()
        zbox = SurroundingRectangle(VGroup(ent[4], ent[5]), color=WARN, buff=0.12, stroke_width=4)
        sing = T("zero row on the left: singular, no inverse", 28, color=WARN).move_to([0, -1.4, 0])
        rule = T("rows only: never mix in column operations", 26, color=MUTED).move_to([0, -2.4, 0])
        with self.voiceover("If a row of zeros appears on the left, the matrix is singular: stop, there is no "
                            "inverse. And use row operations only. Never mix in column operations.") as vo:
            self.play(FadeIn(s1), run_time=0.7)
            self.play(GrowArrow(arr), FadeIn(opl), run_time=0.7)
            self.play(FadeIn(s2), run_time=0.7)
            self.play(Create(zbox), FadeIn(sing), run_time=0.9)
            self.wait(vo.duration * 0.15)
            self.play(FadeIn(rule), run_time=0.7)

    # ------------------------------------------------------------ scene 7
    def s7(self):
        boxes = VGroup(*[RoundedRectangle(width=6.2, height=2.5, corner_radius=0.2, color=MUTED, stroke_width=2)
                         .set_fill(WHITE, 0.7) for _ in range(4)])
        boxes.arrange_in_grid(2, 2, buff=0.3).move_to([0, 0.35, 0])
        contents = [
            VGroup(M(r"A^{-1}\ \text{exists} \iff \det A \ne 0", 38), T("nothing squashed", 24, color=MUTED)),
            VGroup(M(r"\begin{pmatrix} a & b \\ c & d \end{pmatrix}^{-1} = \frac{1}{ad-bc}"
                     r"\begin{pmatrix} d & -b \\ -c & a \end{pmatrix}", 34),
                   T("swap, negate, divide", 24, color=MUTED)),
            VGroup(M(r"A^{-1} = \frac{1}{|A|}\operatorname{adj}A", 38),
                   M(r"\big[\,A \mid I\,\big] \to \big[\,I \mid A^{-1}\,\big]", 34)),
            VGroup(M(r"(AB)^{-1} = B^{-1}A^{-1}", 40), T("socks and shoes", 24, color=MUTED)),
        ]
        cards = []
        for b, c in zip(boxes, contents):
            c.arrange(DOWN, buff=0.3).move_to(b)
            if c.width > b.width - 0.4:
                c.scale_to_fit_width(b.width - 0.4)
            cards.append(VGroup(b, c))
        with self.voiceover("To recap. The inverse undoes a transformation, and it exists exactly when the "
                            "determinant is not zero. For two by two: swap, negate, divide.") as vo:
            self.play(FadeIn(cards[0], shift=0.2 * UP), run_time=0.8)
            self.wait(vo.duration * 0.3)
            self.play(FadeIn(cards[1], shift=0.2 * UP), run_time=0.8)
        with self.voiceover("In general, it is the adjoint over the determinant, or row reduce A beside the "
                            "identity. And inverses of products come off in reverse order.") as vo:
            self.play(FadeIn(cards[2], shift=0.2 * UP), run_time=0.8)
            self.wait(vo.duration * 0.35)
            self.play(FadeIn(cards[3], shift=0.2 * UP), run_time=0.8)
        with self.voiceover("Try the mastery quiz. Then chapter four puts the inverse to work, solving "
                            "systems of linear equations.") as vo:
            nxt = T("Next: Chapter 4 · Solving Systems of Linear Equations", 30, color=PRIMARY)
            nxt.to_edge(DOWN, buff=0.35)
            self.play(FadeIn(nxt, shift=0.2 * UP), run_time=0.8)
