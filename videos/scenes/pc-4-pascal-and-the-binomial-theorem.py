import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

from math import comb  # noqa: E402

import numpy as np  # noqa: E402

# Chapter colour roles.
HL = ManimColor("#D19A00")  # highlight / results (deep gold)
L_C = SECONDARY  # L bounce / letter a (teal)
R_C = PRIMARY  # R bounce / letter b (red)
WARN = PRIMARY


# ---------------------------------------------------------------- helpers
def T(s, size=30, **kw):
    return Text(s, font_size=size, **kw)


def M(*parts, **kw):
    """MathTex; a trailing int argument is the font size."""
    size = 40
    if parts and isinstance(parts[-1], int):
        parts, size = parts[:-1], parts[-1]
    return MathTex(*parts, font_size=kw.pop("size", size), **kw)


def card(mob, pad=0.25, color=MUTED, fill=WHITE, opacity=0.9):
    box = SurroundingRectangle(mob, buff=pad, corner_radius=0.15, color=color, stroke_width=2)
    box.set_fill(fill, opacity=opacity)
    return VGroup(box, mob)


def check():
    return MathTex(r"\checkmark", color=GREEN, font_size=44)


def cross_mark():
    return MathTex(r"\times", color=WARN, font_size=52)


def header(s):
    return T(s, 24, color=MUTED).to_corner(UL, buff=0.4)


class Tri:
    """Pascal's triangle rows 0..rows-1 laid out from an apex point."""

    def __init__(self, rows, apex, dx, dy, size):
        self.apex = np.array(apex, dtype=float)
        self.dx, self.dy = dx, dy
        self.e = {}
        self.group = VGroup()
        for n in range(rows):
            for r in range(n + 1):
                m = MathTex(str(comb(n, r)), font_size=size)
                m.move_to(self.pos(n, r))
                self.e[(n, r)] = m
                self.group.add(m)

    def pos(self, n, r):
        return self.apex + np.array([(r - n / 2) * self.dx, -n * self.dy, 0])

    def row(self, n):
        return VGroup(*[self.e[(n, r)] for r in range(n + 1)])


def word_tex(word, size=40):
    m = MathTex(*list(word), font_size=size)
    for ch, sub in zip(word, m):
        sub.set_color(R_C if ch in "Rb" else L_C)
    return m


class PcCh4Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Permutations, Combinations & the Binomial Theorem",
            "Chapter 4 · Pascal's Triangle and the Binomial Theorem",
            "Chapter four. Pascal's triangle and the binomial theorem.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ scene 1
    def s1(self):
        hd = header("4.1 · Pascal's Triangle as Paths")
        tri = Tri(6, (0, 2.6, 0), 1.05, 0.8, 42)

        def parents(n, r):
            arrows = VGroup()
            for pr in (r - 1, r):
                if 0 <= pr <= n - 1:
                    arrows.add(Arrow(tri.pos(n - 1, pr), tri.pos(n, r), buff=0.28,
                                     color=HL, stroke_width=4, max_tip_length_to_length_ratio=0.3))
            return arrows

        with self.voiceover("Put a one at the top. Every number below it is the sum of the two numbers "
                            "just above, and a missing neighbour counts as zero.") as vo:
            self.play(FadeIn(hd), FadeIn(tri.e[(0, 0)], scale=0.6), run_time=0.8)
            self.play(FadeIn(tri.row(1), shift=0.2 * DOWN), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.4 - 1.6))
            ar = parents(2, 1)
            self.play(GrowArrow(ar[0]), GrowArrow(ar[1]), run_time=0.8)
            self.play(FadeIn(tri.row(2), scale=0.7), run_time=0.7)
            self.play(FadeOut(ar), run_time=0.4)

        q = T("What do these numbers count?", 34, color=HL, weight="BOLD").to_edge(DOWN, buff=0.45)
        with self.voiceover("One, one. One, two, one. One, three, three, one. Then one, four, six, four, one. "
                            "The rule is easy to follow. The real question is, what are these numbers counting?") as vo:
            for n, focus in ((3, 1), (4, 2), (5, None)):
                if focus is not None:
                    ar = parents(n, focus)
                    self.play(*[GrowArrow(a) for a in ar], run_time=0.6)
                    self.play(FadeIn(tri.row(n), scale=0.7), run_time=0.7)
                    self.play(FadeOut(ar), run_time=0.3)
                else:
                    self.play(FadeIn(tri.row(n), scale=0.7), run_time=0.7)
            self.wait(max(0.1, vo.duration * 0.62 - 3.9))
            self.play(Write(q), run_time=1.2)

    # ------------------------------------------------------------ scene 2
    def s2(self):
        hd = header("4.1 · Pascal's Triangle as Paths")
        tri = Tri(5, (-3.4, 2.3, 0), 1.25, 1.0, 42)
        target = tri.e[(4, 2)]
        tbox = SurroundingRectangle(target, color=HL, buff=0.12, stroke_width=3)
        lr = VGroup(
            T("L", 30, color=L_C, weight="BOLD").move_to(tri.pos(1, 0) + 0.55 * LEFT + 0.2 * UP),
            T("R", 30, color=R_C, weight="BOLD").move_to(tri.pos(1, 1) + 0.55 * RIGHT + 0.2 * UP),
        )
        lr_ar = VGroup(
            Arrow(tri.pos(0, 0), tri.pos(1, 0), buff=0.25, color=L_C, stroke_width=4),
            Arrow(tri.pos(0, 0), tri.pos(1, 1), buff=0.25, color=R_C, stroke_width=4),
        )
        with self.voiceover("Drop a ball at the top. At every number it bounces down to the left or down "
                            "to the right. Call those L and R. Counting rows and positions from zero, "
                            "how many routes end at row four, position two, the six?") as vo:
            self.play(FadeIn(hd), FadeIn(tri.group), run_time=1.0)
            self.play(GrowArrow(lr_ar[0]), GrowArrow(lr_ar[1]), FadeIn(lr), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.6 - 2.0))
            self.play(Create(tbox), Indicate(target, color=HL), run_time=1.0)
        self.play(FadeOut(lr_ar), FadeOut(lr), run_time=0.4)

        words = ["LLRR", "LRLR", "LRRL", "RLLR", "RLRL", "RRLL"]
        cols = [PRIMARY, SECONDARY, HL, GREEN, PURPLE, ACCENT]
        grid = VGroup()
        for i, w in enumerate(words):
            wt = word_tex(w, 42)
            grid.add(wt)
        grid.arrange_in_grid(rows=3, cols=2, buff=(0.9, 0.45)).move_to([3.6, 1.2, 0])
        paths = VGroup()
        for w, c in zip(words, cols):
            pts, r = [tri.pos(0, 0)], 0
            for k, ch in enumerate(w, start=1):
                r += ch == "R"
                pts.append(tri.pos(k, r))
            p = VMobject(stroke_color=c, stroke_width=7, stroke_opacity=0.55)
            p.set_points_as_corners(pts)
            p.set_z_index(-1)
            paths.add(p)
        res = M(r"\#\,\text{routes} = {}^4C_2 = 6", 48).move_to([3.6, -1.3, 0])
        with self.voiceover("Here they are. Every route makes four bounces, and exactly two of them must be R. "
                            "So a route is a four letter word with two R's. Picking the word means picking "
                            "which two of the four bounces are R. That is four choose two, which is six.") as vo:
            step = max(0.5, (vo.duration * 0.7) / 6 - 0.2)
            for p, wt, c in zip(paths, grid, cols):
                self.play(Create(p), FadeIn(wt, shift=0.1 * LEFT), run_time=step)
                self.play(p.animate.set_stroke(opacity=0.25), run_time=0.2)
            self.play(Write(res), run_time=1.0)

        labels = VGroup()
        for (n, r), m in tri.e.items():
            lab = M(f"{{}}^{n}C_{r}", 34, color=PURPLE).move_to(m)
            labels.add(lab)
        gen = M(r"\text{row } n,\ \text{position } r \;=\; {}^nC_r", 44, color=PURPLE).move_to([3.4, -1.3, 0])
        with self.voiceover("The same argument works everywhere. The number in row n, position r counts words "
                            "of n letters with r R's. So it is n choose r.") as vo:
            self.play(FadeOut(paths), FadeOut(grid), FadeOut(tbox), run_time=0.6)
            self.play(FadeOut(tri.group, scale=0.8), FadeIn(labels, scale=1.2),
                      ReplacementTransform(res, gen), run_time=1.4)
            self.wait(max(0.1, vo.duration - 3.6))
            self.play(FadeOut(labels, scale=0.8), FadeIn(tri.group, scale=1.2), run_time=1.0)

        a1 = Arrow(tri.pos(3, 1), tri.pos(4, 2), buff=0.3, color=R_C, stroke_width=6)
        a2 = Arrow(tri.pos(3, 2), tri.pos(4, 2), buff=0.3, color=L_C, stroke_width=6)
        la1 = T("R", 28, color=R_C, weight="BOLD").next_to(a1.get_center(), LEFT, buff=0.2)
        la2 = T("L", 28, color=L_C, weight="BOLD").next_to(a2.get_center(), RIGHT, buff=0.2)
        sums = M(r"3 + 3 = 6", 48).move_to([3.6, 1.6, 0])
        rule = M(r"{}^nC_r", r"=", r"{}^{n-1}C_{r-1}", r"+", r"{}^{n-1}C_r", 48).move_to([3.6, 0.2, 0])
        rule[2].set_color(R_C)
        rule[4].set_color(L_C)
        n1 = T("last step R", 22, color=R_C).next_to(rule[2], DOWN, buff=0.25)
        n2 = T("last step L", 22, color=L_C).next_to(rule[4], DOWN, buff=0.25)
        name = T("Pascal's rule", 30, color=HL, weight="BOLD").next_to(VGroup(n1, n2), DOWN, buff=0.45)
        with self.voiceover("And the adding rule? Look at the last bounce. A route to the six arrives either "
                            "from the three up on the left, with a final R, or from the three up on the right, "
                            "with a final L. Three plus three is six. That is Pascal's rule.") as vo:
            self.play(FadeOut(gen), Create(tbox), run_time=0.6)
            self.wait(max(0.1, vo.duration * 0.2 - 0.6))
            self.play(GrowArrow(a1), FadeIn(la1), tri.e[(3, 1)].animate.set_color(R_C), run_time=1.0)
            self.play(GrowArrow(a2), FadeIn(la2), tri.e[(3, 2)].animate.set_color(L_C), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.6 - 3.2))
            self.play(Write(sums), run_time=0.8)
            self.play(Write(rule), FadeIn(n1), FadeIn(n2), run_time=1.4)
            self.play(FadeIn(name, shift=0.1 * UP), run_time=0.6)

    # ------------------------------------------------------------ scene 3
    def s3(self):
        hd = header("4.2 · Patterns in the Triangle")
        tri = Tri(8, (-3.5, 2.75, 0), 0.8, 0.7, 32)
        RX = 3.5

        def reset(*keys):
            return [tri.e[k].animate.set_color(INK) for k in keys]

        # a. row sums
        box = SurroundingRectangle(tri.row(4), color=HL, buff=0.12, stroke_width=3)
        s_a = M(r"1 + 4 + 6 + 4 + 1 = 16 = 2^4", 40).move_to([RX, 1.4, 0])
        s_b = M(r"{}^nC_0 + {}^nC_1 + \cdots + {}^nC_n = 2^n", 38, color=HL).move_to([RX, 0.2, 0])
        s_c = T("every route: 2 choices per bounce", 24, color=MUTED).next_to(s_b, DOWN, buff=0.35)
        with self.voiceover("Every pattern in the triangle has a counting reason. Add row four: sixteen, "
                            "two to the power four. The row counts every route of four bounces, and each "
                            "bounce has two choices. So row n always adds to two to the power n.") as vo:
            self.play(FadeIn(hd), FadeIn(tri.group), run_time=1.0)
            self.play(Create(box), run_time=0.6)
            self.play(Write(s_a), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.55 - 2.8))
            self.play(Write(s_b), FadeIn(s_c), run_time=1.4)

        # b. symmetry
        mirror = DashedLine(tri.pos(0, 0) + 0.35 * UP, tri.pos(7, 3.5) + 0.35 * DOWN,
                            color=PURPLE, stroke_width=3, dash_length=0.12)
        sym = M(r"{}^nC_r = {}^nC_{n-r}", 48, color=PURPLE).move_to([RX, 1.0, 0])
        sym_n = T("swap every L with R", 26, color=MUTED).next_to(sym, DOWN, buff=0.35)
        pairs = [((4, 1), (4, 3)), ((6, 2), (6, 4)), ((7, 1), (7, 6))]
        with self.voiceover("Every row reads the same backwards. Swap every L with R, and a route to "
                            "position r becomes a route to position n minus r.") as vo:
            self.play(FadeOut(box), FadeOut(s_a), FadeOut(s_b), FadeOut(s_c), run_time=0.5)
            self.play(Create(mirror), Write(sym), FadeIn(sym_n), run_time=1.2)
            for p, q in pairs:
                self.play(Indicate(tri.e[p], color=PURPLE), Indicate(tri.e[q], color=PURPLE),
                          run_time=max(0.5, (vo.duration - 2.0) / 3.5))

        # c. hockey stick
        stick_keys = [(n, 2) for n in range(2, 7)]
        blade = (7, 3)
        stick = VMobject(stroke_color=R_C, stroke_width=10, stroke_opacity=0.25)
        stick.set_points_as_corners([tri.pos(*k) for k in stick_keys] + [tri.pos(*blade)])
        stick.set_z_index(-1)
        h1 = M(r"1 + 3 + 6 + 10 + 15 = 35", 42).move_to([RX, 1.6, 0])
        h2 = M(r"{}^2C_2 + {}^3C_2 + \cdots + {}^6C_2 = {}^7C_3", 38, color=HL).move_to([RX, 0.5, 0])
        h3 = VGroup(
            T("choose 3 numbers from 1 to 7:", 24, color=MUTED),
            T("split by the largest one chosen", 24, color=MUTED),
        ).arrange(DOWN, buff=0.15).next_to(h2, DOWN, buff=0.4)
        with self.voiceover("Now run down a diagonal and add: one, three, six, ten, fifteen. Thirty five, "
                            "the entry just below and to the right, like the blade of a hockey stick. "
                            "The reason: to choose three numbers from one to seven, split by the largest "
                            "number chosen.") as vo:
            self.play(FadeOut(mirror), FadeOut(sym), FadeOut(sym_n), run_time=0.5)
            self.play(*[tri.e[k].animate.set_color(R_C) for k in stick_keys], run_time=0.8)
            self.play(Create(stick), run_time=1.0)
            self.play(tri.e[blade].animate.set_color(HL).scale(1.3), Write(h1), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.6 - 3.5))
            self.play(Write(h2), run_time=1.2)
            self.play(FadeIn(h3), run_time=0.8)

        # d. powers of 11
        p11 = VGroup()
        for n, val in enumerate(["1", "11", "121", "1331", "14641"]):
            line = VGroup(M(val + r" = 11^{" + str(n) + "}", 34), check().scale(0.7))
            line.arrange(RIGHT, buff=0.25)
            p11.add(line)
        p11.arrange(DOWN, buff=0.18, aligned_edge=LEFT).move_to([RX, 1.5, 0])
        rbox = SurroundingRectangle(tri.row(5), color=WARN, buff=0.1, stroke_width=3)
        bad = VGroup(M(r"1\;5\;10\;10\;5\;1 \;\to\; 15101051", 34), cross_mark().scale(0.7)).arrange(RIGHT, buff=0.25)
        good = M(r"11^5 = 161051", 40, color=HL)
        warn = VGroup(bad, good).arrange(DOWN, buff=0.25).next_to(p11, DOWN, buff=0.45)
        rows04 = VGroup(*[tri.row(n) for n in range(5)])
        with self.voiceover("Rows zero to four, read as numbers, are powers of eleven. But row five has two "
                            "digit entries. The tens carry, and eleven to the power five is one six one zero "
                            "five one, not the row read straight off. The pattern holds only while every "
                            "entry is a single digit.") as vo:
            self.play(FadeOut(h1), FadeOut(h2), FadeOut(h3), FadeOut(stick),
                      *reset(*stick_keys), tri.e[blade].animate.set_color(INK).scale(1 / 1.3), run_time=0.6)
            self.play(rows04.animate.set_color(SECONDARY), run_time=0.5)
            self.play(LaggedStart(*[FadeIn(l, shift=0.1 * LEFT) for l in p11], lag_ratio=0.3), run_time=1.8)
            self.wait(max(0.1, vo.duration * 0.25 - 2.9))
            self.play(Create(rbox), run_time=0.6)
            self.play(FadeIn(bad), run_time=0.8)
            self.play(Write(good), run_time=1.0)

    # ------------------------------------------------------------ scene 4
    def s4(self):
        hd = header("4.3 · Expanding by Choosing")
        top = M(r"(a+b)^3 = (a+b)(a+b)(a+b)", 48).move_to([0, 2.5, 0])
        picks = ["aaa", "aab", "aba", "baa", "abb", "bab", "bba", "bbb"]
        tiles = VGroup(*[card(word_tex(w, 44), pad=0.16, color=GRID) for w in picks])
        tiles.arrange(RIGHT, buff=0.28).move_to([0, 1.0, 0])
        count = M(r"2 \times 2 \times 2 = 8 \text{ picks}", 38, color=MUTED).next_to(tiles, DOWN, buff=0.45)
        with self.voiceover("Now expand a plus b, cubed. Write out three brackets. To make one term of the "
                            "product, pick one letter from each bracket and multiply. Two choices, three "
                            "times: eight picks.") as vo:
            self.play(FadeIn(hd), Write(top), run_time=1.4)
            self.wait(max(0.1, vo.duration * 0.4 - 1.4))
            self.play(LaggedStart(*[FadeIn(t, shift=0.15 * DOWN) for t in tiles], lag_ratio=0.15), run_time=1.8)
            self.play(Write(count), run_time=0.8)

        groups = [[0], [1, 2, 3], [4, 5, 6], [7]]
        xs = [-4.8, -1.6, 1.6, 4.8]
        anims = []
        for gi, idxs in enumerate(groups):
            for j, i in enumerate(idxs):
                anims.append(tiles[i].animate.move_to([xs[gi], 1.2 - j * 0.85, 0]))
        terms = VGroup(M(r"a^3", 48), M(r"3", r"a^2b", 48), M(r"3", r"ab^2", 48), M(r"b^3", 48))
        for t, x in zip(terms, xs):
            t.move_to([x, -1.7, 0])
        terms[1][0].set_color(HL)
        terms[2][0].set_color(HL)
        plus = VGroup(*[M("+", 48).move_to([(xs[i] + xs[i + 1]) / 2, -1.7, 0]) for i in range(3)])
        c31 = M(r"{}^3C_1 = 3", 32, color=HL).next_to(terms[1], DOWN, buff=0.3)
        row3 = T("1, 3, 3, 1: row 3 of the triangle", 28, color=HL).to_edge(DOWN, buff=0.35)
        with self.voiceover("Group the picks by how many b's they contain. One has no b. Three have one b, "
                            "because you choose which bracket gives the b: three choose one. Three have two "
                            "b's, and one has three. One, three, three, one. Row three of the triangle.") as vo:
            self.play(FadeOut(count), *anims, run_time=1.6)
            self.play(FadeIn(terms[0]), run_time=0.5)
            self.play(FadeIn(terms[1]), FadeIn(c31), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.55 - 2.9))
            self.play(FadeIn(terms[2]), FadeIn(terms[3]), FadeIn(plus), run_time=0.9)
            self.wait(max(0.1, vo.duration * 0.2 - 0.9))
            self.play(Write(row3), run_time=1.0)

        thm = M(r"(a+b)^n", r"=", r"\sum_{r=0}^{n}", r"{}^nC_r", r"\, a^{n-r} b^r", 60)
        thm[3].set_color(HL)
        thm.move_to([0, 0.4, 0])
        tbox = SurroundingRectangle(thm, color=HL, buff=0.3, corner_radius=0.15, stroke_width=3)
        tnote = T("choose which r brackets give b", 26, color=HL).next_to(tbox, DOWN, buff=0.35)
        tname = T("The binomial theorem", 32, weight="BOLD").next_to(tbox, UP, buff=0.4)
        with self.voiceover("With n brackets, the term a to the n minus r, b to the r, appears once for every "
                            "choice of which r brackets give b. That is the binomial theorem.") as vo:
            self.play(FadeOut(tiles), FadeOut(terms), FadeOut(plus), FadeOut(c31), FadeOut(row3),
                      FadeOut(top), run_time=0.7)
            self.play(Write(thm), run_time=1.6)
            self.play(Create(tbox), FadeIn(tnote), run_time=0.9)
            self.wait(max(0.1, vo.duration - 4.2))
            self.play(FadeIn(tname, shift=0.1 * DOWN), run_time=0.6)

        wrong = VGroup(M(r"(a+b)^n \ne a^n + b^n", 48, color=WARN), cross_mark()).arrange(RIGHT, buff=0.35)
        test = M(r"(1+1)^2 = 4 \qquad 1^2 + 1^2 = 2", 42)
        mis = card(VGroup(wrong, test).arrange(DOWN, buff=0.35), pad=0.35, color=WARN)
        mis.move_to([0, -1.2, 0])
        with self.voiceover("So a plus b, to the power n, is not a to the n plus b to the n. That keeps only "
                            "the all a and all b picks and throws the mixed ones away. Try a and b equal to "
                            "one, squared. Four, not two.") as vo:
            self.play(VGroup(thm, tbox, tname).animate.scale(0.7).move_to([0, 1.55, 0]), FadeOut(tnote),
                      run_time=0.9)
            self.play(FadeIn(mis[0]), Write(wrong), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.65 - 2.1))
            self.play(Write(test), run_time=1.2)

    # ------------------------------------------------------------ scene 5
    def s5(self):
        hd = header("4.4 · The General Term")
        gt = M(r"T_{r+1}", r"=", r"{}^nC_r\, a^{n-r} b^r", 60)
        gt[0].set_color(HL)
        gbox = SurroundingRectangle(gt, color=HL, buff=0.3, corner_radius=0.15, stroke_width=3)
        g = VGroup(gt, gbox).move_to([0, 0.5, 0])
        note = VGroup(M(r"r = 0 \;\to\; T_1 \text{ (the first term)}", 36, color=WARN),
                      T("r counts b's; the term number is r + 1", 24, color=MUTED)).arrange(DOWN, buff=0.25)
        note.next_to(g, DOWN, buff=0.6)
        with self.voiceover("Often you need one term, not all of them. The term with r b's is term number "
                            "r plus one, because r starts at zero. T sub r plus one equals n choose r, a to "
                            "the n minus r, b to the r. Mixing up r and r plus one is the classic slip.") as vo:
            self.play(FadeIn(hd), run_time=0.5)
            self.play(Write(gt), Create(gbox), run_time=1.6)
            self.wait(max(0.1, vo.duration * 0.5))
            self.play(FadeIn(note, shift=0.1 * UP), run_time=0.9)

        self.play(FadeOut(note), g.animate.scale(0.6).move_to([0, 2.55, 0]), run_time=0.8)

        def steps(lines, y0=1.4, gap=0.82):
            grp = VGroup(*lines)
            for i, m in enumerate(grp):
                m.move_to([0, y0 - i * gap, 0])
            return grp

        ex1 = steps([
            M(r"(2x - 3)^8:\quad a = 2x,\quad b = -3", 40),
            M(r"T_{r+1} = {}^8C_r\,(2x)^{8-r}(-3)^r", 40),
            M(r"8 - r = 5 \;\Rightarrow\; r = 3", 40),
            M(r"T_4 = {}^8C_3\,(2x)^5(-3)^3 = 56 \cdot 32 \cdot (-27)\,x^5", 40),
            M(r"\text{coefficient of } x^5 = -48384", 44, color=HL),
        ])
        ex1[0][0][-2:].set_color(WARN)  # "-3" in b = -3
        with self.voiceover("Find the coefficient of x to the fifth in two x minus three, to the eighth. "
                            "Here a is two x, and b is minus three, sign included.") as vo:
            self.play(Write(ex1[0]), run_time=1.4)
            self.wait(max(0.1, vo.duration * 0.5 - 1.4))
            self.play(Indicate(ex1[0][0][-2:], color=WARN, scale_factor=1.3), run_time=0.9)
        with self.voiceover("The power of x is eight minus r, so r is three, and we want the fourth term. "
                            "Eight choose three is fifty six. Two to the fifth is thirty two. Minus three, "
                            "cubed, is minus twenty seven. The coefficient is minus forty eight thousand, "
                            "three hundred and eighty four.") as vo:
            self.play(FadeIn(ex1[1], shift=0.1 * UP), run_time=0.8)
            self.play(FadeIn(ex1[2], shift=0.1 * UP), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.25 - 1.6))
            self.play(FadeIn(ex1[3], shift=0.1 * UP), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.72 - 1.0 - vo.duration * 0.25))
            self.play(Write(ex1[4]), run_time=1.2)

        ex2 = steps([
            M(r"\left(x^2 + \tfrac{1}{x}\right)^9", 44),
            M(r"T_{r+1} = {}^9C_r\,(x^2)^{9-r}\,x^{-r} = {}^9C_r\,x^{18-3r}", 40),
            M(r"18 - 3r = 0 \;\Rightarrow\; r = 6", 40),
            M(r"T_7 = {}^9C_6 = 84", 48, color=HL),
        ], y0=1.3, gap=0.95)
        with self.voiceover("For the term free of x in x squared plus one over x, to the ninth, collect the "
                            "powers of x: eighteen minus three r. Set that power to zero. r is six, so it is "
                            "the seventh term, nine choose six, which is eighty four.") as vo:
            self.play(FadeOut(ex1), run_time=0.5)
            self.play(Write(ex2[0]), run_time=1.0)
            self.play(FadeIn(ex2[1], shift=0.1 * UP), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.5 - 2.5))
            self.play(FadeIn(ex2[2], shift=0.1 * UP), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.2 - 0.8))
            self.play(Write(ex2[3]), run_time=1.0)

    # ------------------------------------------------------------ scene 6
    def s6(self):
        hd = header("4.5 · Middle Terms and the Largest Coefficient")
        base_y, bw, step, hmax = -2.3, 0.5, 0.66, 3.6
        x0 = -6.0
        bars, vals, rl = VGroup(), VGroup(), VGroup()
        for r in range(11):
            v = comb(10, r)
            h = max(0.04, v / 252 * hmax)
            b = Rectangle(width=bw, height=h, stroke_width=0,
                          fill_color=HL if r == 5 else SECONDARY, fill_opacity=0.85)
            b.move_to([x0 + r * step, base_y + h / 2, 0])
            bars.add(b)
            vals.add(M(str(v), 22, color=HL if r == 5 else INK).next_to(b, UP, buff=0.08))
            rl.add(M(str(r), 22, color=MUTED).next_to([x0 + r * step, base_y, 0], DOWN, buff=0.12))
        axis = Line([x0 - 0.4, base_y, 0], [x0 + 10 * step + 0.4, base_y, 0], color=MUTED, stroke_width=2)
        rowlab = M(r"\text{row } 10:\ {}^{10}C_r", 32).move_to([x0 + 5 * step, 2.2, 0])
        chart = VGroup(axis, bars, vals, rl, rowlab)
        ratio = M(r"\frac{{}^nC_{r+1}}{{}^nC_r} = \frac{n-r}{r+1}", 44).move_to([4.2, 0.9, 0])
        cond = M(r"> 1 \iff r < \frac{n-1}{2}", 38, color=HL).next_to(ratio, DOWN, buff=0.45)
        with self.voiceover("Along any row, the numbers climb, peak in the middle, and fall back. Row ten "
                            "peaks at two hundred and fifty two. Why the middle? Compare neighbours. n choose "
                            "r plus one, over n choose r, is n minus r over r plus one. That is bigger than "
                            "one until you pass the middle.") as vo:
            self.play(FadeIn(hd), Create(axis), FadeIn(rl), FadeIn(rowlab), run_time=0.9)
            self.play(LaggedStart(*[GrowFromEdge(b, DOWN) for b in bars], lag_ratio=0.1), run_time=1.8)
            self.play(FadeIn(vals), run_time=0.6)
            self.play(Indicate(bars[5], color=HL), Indicate(vals[5], color=HL), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.45 - 4.1))
            self.play(Write(ratio), run_time=1.4)
            self.wait(max(0.1, vo.duration * 0.25 - 1.4))
            self.play(Write(cond), run_time=1.0)

        mid = VGroup(
            VGroup(T("n even: one middle term", 26), M(r"T_{\frac{n}{2}+1}", 46, color=HL)).arrange(RIGHT, buff=0.3),
            VGroup(T("n odd: two middle terms", 26),
                   M(r"T_{\frac{n+1}{2}},\ T_{\frac{n+3}{2}}", 46, color=HL)).arrange(RIGHT, buff=0.3),
        ).arrange(DOWN, buff=0.35, aligned_edge=LEFT)
        midc = card(mid, pad=0.3).move_to([2.6, 1.6, 0])
        ex = VGroup(
            M(r"\left(x - \tfrac{2}{x}\right)^{10}:\quad T_6 = {}^{10}C_5\, x^5\left(-\tfrac{2}{x}\right)^5", 38),
            M(r"= 252 \cdot (-32) = -8064", 42, color=HL),
        ).arrange(DOWN, buff=0.3, aligned_edge=LEFT).move_to([2.2, -1.2, 0])
        with self.voiceover("So the middle term carries the largest coefficient. There are n plus one terms. "
                            "Even n gives one middle term. Odd n gives two, tied by symmetry.") as vo:
            self.play(FadeOut(ratio), FadeOut(cond), chart.animate.scale(0.55).to_corner(DL, buff=0.4),
                      run_time=0.9)
            self.wait(max(0.1, vo.duration * 0.35 - 0.9))
            self.play(FadeIn(midc[0]), FadeIn(mid[0]), run_time=0.8)
            self.play(FadeIn(mid[1]), run_time=0.8)
        with self.voiceover("In x minus two over x, to the tenth, the middle term is T six: two hundred and "
                            "fifty two times minus thirty two, which is minus eight thousand and sixty four.") as vo:
            self.play(Write(ex[0]), run_time=1.6)
            self.wait(max(0.1, vo.duration * 0.55 - 1.6))
            self.play(Write(ex[1]), run_time=1.0)

        gr = M(r"\frac{T_{r+1}}{T_r} = \frac{n-r+1}{r}\cdot\frac{b}{a}", 48).move_to([0, 1.5, 0])
        rule = T("greatest term: the last step with ratio at least 1", 26, color=MUTED).next_to(gr, DOWN, buff=0.4)
        tie = VGroup(
            M(r"(3+2x)^9,\ x = 1:\quad \frac{10-r}{r}\cdot\frac{2}{3} = 1 \text{ at } r = 4", 38),
            M(r"T_4 = T_5 = 489888", 44, color=HL),
        ).arrange(DOWN, buff=0.3).next_to(rule, DOWN, buff=0.55)
        with self.voiceover("When a and b are numbers, the coefficient is not the whole story. Compare each "
                            "term with the one before it. Keep stepping while the ratio is at least one. The "
                            "last step up is the greatest term, and if the ratio is exactly one, two terms "
                            "tie. In three plus two x, to the ninth, at x equals one, T four and T five tie.") as vo:
            self.play(FadeOut(midc), FadeOut(ex), FadeOut(chart), run_time=0.7)
            self.play(Write(gr), run_time=1.4)
            self.wait(max(0.1, vo.duration * 0.35 - 2.1))
            self.play(FadeIn(rule), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.3 - 0.8))
            self.play(Write(tie[0]), run_time=1.4)
            self.play(Write(tie[1]), run_time=1.0)

    # ------------------------------------------------------------ scene 7
    def s7(self):
        hd = header("Recap")
        items = [
            ("Entries count paths", r"\text{row } n,\ \text{position } r = {}^nC_r"),
            ("Patterns have counting reasons", r"\textstyle\sum {}^nC_r = 2^n,\quad {}^nC_r = {}^nC_{n-r}"),
            ("Expand by choosing", r"(a+b)^n = \textstyle\sum {}^nC_r\, a^{n-r} b^r"),
            ("Any single term", r"T_{r+1} = {}^nC_r\, a^{n-r} b^r"),
            ("Middle and greatest terms", r"\frac{T_{r+1}}{T_r} = \frac{n-r+1}{r}\cdot\frac{b}{a}"),
        ]
        rows = VGroup()
        ys = np.linspace(2.3, -1.7, len(items))
        for (label, tex), y in zip(items, ys):
            dot = Dot(color=PRIMARY, radius=0.07).move_to([-6.2, y, 0])
            lab = T(label, 28).next_to(dot, RIGHT, buff=0.25)
            m = M(tex, 36, color=SECONDARY)
            m.move_to([0.4, y, 0], aligned_edge=LEFT)
            rows.add(VGroup(dot, lab, m))
        nxt = T("Next: binomial coefficients at work", 30, color=HL, weight="BOLD").to_edge(DOWN, buff=0.45)
        text = ("To recap. Every entry of Pascal's triangle counts paths, so it is n choose r, and the adding "
                "rule is just the last step. Each pattern has a counting reason. Expanding a plus b to the n is "
                "choosing which brackets give b. The general term, T sub r plus one, finds any single term, so "
                "watch the plus one. And the middle holds the largest coefficient, while the ratio test finds "
                "the greatest term. Next chapter, we put these coefficients to work.")
        with self.voiceover(text) as vo:
            self.play(FadeIn(hd), run_time=0.5)
            per = max(0.8, (vo.duration * 0.88 - 1.5) / 5)
            for row in rows:
                self.play(FadeIn(row, shift=0.1 * RIGHT), run_time=0.7)
                self.wait(max(0.1, per - 0.7))
            self.play(FadeIn(nxt, shift=0.1 * UP), run_time=0.8)
        self.wait(1.0)
