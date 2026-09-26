import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

# Chapter colour roles (light background).
G1 = PRIMARY  # group / team 1 = strawberry red
G2 = SECONDARY  # group / team 2 = teal
G3 = PURPLE  # group / team 3 = purple
STAR = ACCENT  # identical objects (stars) = amber
HL = ManimColor("#D19A00")  # totals / highlight (gold)
WARN = PRIMARY
OK = GREEN


# ---------------------------------------------------------------- helpers
def T(s, size=30, **kw):
    return Text(s, font_size=size, **kw)


def M(s, size=40, **kw):
    return MathTex(s, font_size=size, **kw)


def P(x, y):
    return np.array([x, y, 0.0])


def card(mob, pad=0.25, color=MUTED, fill=WHITE, opacity=0.9):
    box = SurroundingRectangle(mob, buff=pad, corner_radius=0.15, color=color, stroke_width=2)
    box.set_fill(fill, opacity=opacity)
    return VGroup(box, mob)


def chip(s, color, size=26):
    return card(T(s, size, color=color), pad=0.12, color=color)


def check():
    return MathTex(r"\checkmark", color=OK, font_size=48)


def cross_out(mob):
    return VGroup(
        Line(mob.get_corner(UL), mob.get_corner(DR), color=WARN, stroke_width=5),
        Line(mob.get_corner(DL), mob.get_corner(UR), color=WARN, stroke_width=5),
    )


def strike(mob):
    return Line(mob.get_left() + LEFT * 0.1, mob.get_right() + RIGHT * 0.1, color=WARN, stroke_width=5)


def header(s):
    return T(s, 28, weight="BOLD", color=MUTED).to_corner(UL, buff=0.4)


def star(r=0.24):
    return Star(n=5, outer_radius=r, color=STAR, fill_opacity=1, stroke_width=1)


def bar(h=0.8):
    return Line(UP * h / 2, DOWN * h / 2, color=INK, stroke_width=7)


def sb_row(word, y=0.0, gap=0.8, x0=0.0):
    """Row of stars (*) and bars (|) centred at (x0, y)."""
    n = len(word)
    g = VGroup()
    for i, ch in enumerate(word):
        m = star() if ch == "*" else bar()
        m.move_to(P(x0 + (i - (n - 1) / 2) * gap, y))
        g.add(m)
    return g


def tile(letter, color, size=0.72):
    box = RoundedRectangle(width=size, height=size, corner_radius=0.1, color=color, stroke_width=3)
    box.set_fill(color, opacity=0.12)
    return VGroup(box, T(letter, 30, weight="BOLD", color=color).move_to(box))


class PcCh3Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Permutations, Combinations & the Binomial Theorem",
            "Chapter 3 · Distributions and Advanced Counting",
            "Chapter three. Distributions and advanced counting.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ scene 1: hook
    def s1(self):
        cols = [G1, G2, G3, OK, ACCENT]
        books = VGroup()
        for i, c in enumerate(cols):
            r = RoundedRectangle(width=1.1, height=0.62, corner_radius=0.08, color=c, stroke_width=3)
            r.set_fill(c, opacity=0.35)
            lab = T(str(i + 1), 24, weight="BOLD", color=INK).move_to(r)
            books.add(VGroup(r, lab).move_to(P(-4.6, 2.2 - i * 0.95)))
        names = ["Riya", "Kabir", "Meera"]
        studs = VGroup(*[chip(n, INK, 28).move_to(P(0.3, 1.5 - i * 1.3)) for i, n in enumerate(names)])
        arrows = VGroup(*[
            Line(b.get_right(), s.get_left(), color=MUTED, stroke_width=1.5, stroke_opacity=0.7)
            for b in books for s in studs
        ])
        diff = M(r"\text{different: } 3^5 = 243", 42).move_to(P(4.3, 1.0))
        diff[0][-3:].set_color(HL)

        with self.voiceover("Give five books to three students. How many ways? It depends. If the books are "
                            "all different, each book picks a student: three to the power five, "
                            "two hundred and forty three.") as vo:
            self.play(LaggedStart(*[FadeIn(b, shift=0.2 * RIGHT) for b in books], lag_ratio=0.15), run_time=1.0)
            self.play(LaggedStart(*[FadeIn(s, shift=0.2 * LEFT) for s in studs], lag_ratio=0.2), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(LaggedStart(*[Create(a) for a in arrows], lag_ratio=0.05), run_time=2.0)
            self.play(Write(diff), run_time=1.0)

        counts = VGroup(*[M(str(k), 40, color=HL).next_to(s, RIGHT, buff=0.3) for k, s in zip([2, 2, 1], studs)])
        ident = M(r"\text{identical: } 21", 42).move_to(P(4.3, -0.4))
        ident[0][-2:].set_color(HL)
        moral = card(T("What is identical? What has a name?", 30, color=G3), color=G3).move_to(P(0, -3.1))

        with self.voiceover("If the books are identical, all that matters is how many each student gets: just "
                            "twenty one. Same five, same three, a completely different answer. This chapter is "
                            "about noticing what is identical, what has a name, and choosing the right count.") as vo:
            self.play(FadeOut(arrows), run_time=0.5)
            self.play(*[b[0].animate.set_color(STAR).set_fill(STAR, opacity=0.35) for b in books],
                      *[FadeOut(b[1]) for b in books], run_time=0.9)
            self.play(LaggedStart(*[FadeIn(c, scale=0.5) for c in counts], lag_ratio=0.2), run_time=0.8)
            self.play(Write(ident), run_time=0.9)
            self.wait(max(0.1, vo.duration * 0.2))
            self.play(FadeIn(moral, shift=0.2 * UP), run_time=0.8)

    # ------------------------------------------------------------ scene 2: groups
    def s2(self):
        hd = header("3.1 · Dividing into Groups")
        letters = "BBBBBPPPPQQQ"
        cmap = {"B": G1, "P": G2, "Q": G3}
        tiles = VGroup(*[tile(ch, cmap[ch]) for ch in letters]).arrange(RIGHT, buff=0.12).move_to(P(0, 1.2))
        top = T("12 students:  Bridge (5),  Poster (4),  Quiz (3)", 28,
                t2c={"Bridge (5)": G1, "Poster (4)": G2, "Quiz (3)": G3}).move_to(P(0, 2.5))
        f = M(r"\frac{12!}{5!\,4!\,3!} = 27\,720", 56).move_to(P(0, -0.8))
        f[0][-5:].set_color(HL)
        note = T("one team letter per student = one 12-letter word", 24, color=MUTED).move_to(P(0, -2.4))

        with self.voiceover("Twelve students go to three projects: five on the bridge, four on the poster, three "
                            "on the quiz. Give each student a letter for their team. Then a split is a twelve "
                            "letter word with five B's, four P's and three Q's. So the count is twelve factorial "
                            "over five factorial, four factorial, three factorial: twenty seven thousand seven "
                            "hundred and twenty.") as vo:
            self.play(FadeIn(hd), FadeIn(top), run_time=0.7)
            self.play(LaggedStart(*[FadeIn(t, shift=0.2 * DOWN) for t in tiles], lag_ratio=0.08), run_time=1.6)
            self.play(FadeIn(note), run_time=0.6)
            self.wait(max(0.1, vo.duration * 0.25))
            self.play(Write(f), run_time=1.4)

        pairs = [("AABB", "BBAA"), ("ABAB", "BABA"), ("ABBA", "BAAB")]
        rows = VGroup()
        for a, b in pairs:
            wa = T(a, 40, weight="BOLD", t2c={"A": G1, "B": G2})
            wb = T(b, 40, weight="BOLD", t2c={"A": G1, "B": G2})
            eq = M(r"\equiv", 44, color=HL)
            rows.add(VGroup(wa, eq, wb).arrange(RIGHT, buff=0.4))
        rows.arrange(DOWN, buff=0.45).move_to(P(-3.4, 0.0))
        sub = T("4 friends into 2 pairs:  6 labelled words", 26, color=MUTED).move_to(P(0, 2.5))
        same = T("same pairs, names swapped", 22, color=HL).next_to(rows, DOWN, buff=0.35)
        f2 = M(r"6 \div 2! = 3", 56).move_to(P(3.4, 0.9))
        f2[0][-1:].set_color(HL)
        warn = card(VGroup(T("Equal groups with no names:", 26),
                           T("divide by k!", 26, color=WARN)).arrange(DOWN, buff=0.12),
                    color=WARN).move_to(P(3.4, -1.0))

        with self.voiceover("Now take the names away. Four friends pair up for doubles. With teams A and B there "
                            "are six ways. But A A B B and B B A A are the same two pairs with the names swapped. "
                            "Every split was counted twice. So there are three.") as vo:
            self.play(FadeOut(VGroup(tiles, top, note, f)), run_time=0.5)
            self.play(FadeIn(sub), run_time=0.5)
            self.play(LaggedStart(*[FadeIn(VGroup(r[0], r[2])) for r in rows], lag_ratio=0.25), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(LaggedStart(*[FadeIn(r[1], scale=0.5) for r in rows], lag_ratio=0.3), FadeIn(same),
                      run_time=1.2)
            self.play(Write(f2), run_time=0.9)
            self.play(FadeIn(warn, shift=0.2 * UP), run_time=0.7)

        f3 = M(r"\frac{12!}{(4!)^3\,3!} = \frac{34\,650}{6} = 5775", 54).move_to(P(0, 1.4))
        f3[0][-4:].set_color(HL)
        lab3 = T("12 students, 3 unnamed groups of 4", 26, color=MUTED).move_to(P(0, 2.7))
        defn = card(VGroup(T("n equal groups of m, no names:", 26),
                           M(r"\frac{(mn)!}{(m!)^n\,n!}", 50, color=G3)).arrange(RIGHT, buff=0.4),
                    pad=0.3, color=G3).move_to(P(0, -0.8))
        diffn = T("Different sizes? No division: the size already names the group.", 24,
                  color=MUTED).move_to(P(0, -2.5))

        with self.voiceover("In general, for equal sized groups with no names, divide by the number of ways to "
                            "hand out the names. Twelve students in three unnamed groups of four: thirty four "
                            "thousand six hundred and fifty, divided by three factorial, five thousand seven "
                            "hundred and seventy five. Groups of different sizes never need this, their size "
                            "already names them.") as vo:
            self.play(FadeOut(VGroup(rows, sub, same, f2, warn)), run_time=0.5)
            self.play(FadeIn(lab3), run_time=0.5)
            self.play(Write(f3), run_time=1.6)
            self.wait(max(0.1, vo.duration * 0.25))
            self.play(FadeIn(defn, shift=0.2 * UP), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(FadeIn(diffn), run_time=0.7)

    # ------------------------------------------------------------ scene 3: stars and bars
    def s3(self):
        hd = header("3.2 · Stars and Bars")
        kids = VGroup(*[chip(n, c, 26).move_to(P(x, 2.4))
                        for n, c, x in zip(["Arjun", "Bela", "Chirag"], [G1, G2, G3], [-3.2, 0, 3.2])])
        row1 = sb_row("**|*|*", y=0.7)
        tup1 = M(r"(2,\,1,\,1)", 50).move_to(P(0, -0.7))
        row2 = sb_row("|****|", y=0.7)
        tup2 = M(r"(0,\,4,\,0)", 50).move_to(P(0, -0.7))

        with self.voiceover("Four identical toffees for three children. Only the amounts matter. Line the toffees "
                            "up as stars, and drop in two bars to cut the line into three parts. Star star, bar, "
                            "star, bar, star means two, one, one. Bar, four stars, bar means nought, four, "
                            "nought.") as vo:
            self.play(FadeIn(hd), LaggedStart(*[FadeIn(k, shift=0.2 * DOWN) for k in kids], lag_ratio=0.2),
                      run_time=0.9)
            stars1 = [m for m, ch in zip(row1, "**|*|*") if ch == "*"]
            bars1 = [m for m, ch in zip(row1, "**|*|*") if ch == "|"]
            self.play(LaggedStart(*[FadeIn(s, scale=0.4) for s in stars1], lag_ratio=0.15), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(*[FadeIn(b, shift=0.4 * DOWN) for b in bars1], run_time=0.8)
            self.play(Write(tup1), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(ReplacementTransform(row1, row2), ReplacementTransform(tup1, tup2), run_time=1.2)

        row3 = sb_row("**|*|*", y=0.7)
        nums = VGroup(*[M(str(i + 1), 30, color=MUTED).next_to(m, DOWN, buff=0.35) for i, m in enumerate(row3)])
        rings = VGroup(*[SurroundingRectangle(row3[i], color=HL, buff=0.12, corner_radius=0.08) for i in (2, 4)])
        f = M(r"{}^6C_2 = 15", 56).move_to(P(0, -1.0))
        f[0][-2:].set_color(HL)
        defn = card(VGroup(T("n identical things into k boxes:", 26),
                           M(r"{}^{n+k-1}C_{k-1}", 50, color=G3)).arrange(RIGHT, buff=0.4),
                    pad=0.3, color=G3).move_to(P(0, -2.6))

        with self.voiceover("Every sharing is exactly one row of four stars and two bars. Six positions, choose "
                            "which two are bars: six choose two, fifteen. In general, n identical things into "
                            "k boxes: n plus k minus one, choose k minus one.") as vo:
            self.play(FadeOut(tup2), ReplacementTransform(row2, row3), run_time=0.8)
            self.play(FadeIn(nums), run_time=0.6)
            self.play(Create(rings), run_time=0.8)
            self.play(Write(f), run_time=0.9)
            self.wait(max(0.1, vo.duration * 0.2))
            self.play(FadeIn(defn, shift=0.2 * UP), run_time=0.8)

        wrong = M(r"{}^4C_3 = 4", 54).move_to(P(-3.4, 1.2))
        wx = strike(wrong)
        wnote = VGroup(T("picks different things,", 24, color=MUTED),
                       T("no repeats", 24, color=MUTED)).arrange(DOWN, buff=0.1).next_to(wrong, DOWN, buff=0.4)
        eqn = M(r"x + y + z = 10", 52).move_to(P(3.2, 1.2))
        eqs = T("whole numbers: 10 stars, 2 bars", 24, color=MUTED).next_to(eqn, DOWN, buff=0.35)
        ans = M(r"{}^{12}C_2 = 66", 56).move_to(P(3.2, -1.0))
        ans[0][-2:].set_color(HL)

        with self.voiceover("Careful: it is not four choose three, which is only four. That formula picks "
                            "different things without repeats. Here a child can take several toffees. The same "
                            "count solves equations too: x plus y plus z equals ten, in whole numbers, is ten "
                            "stars and two bars. Twelve choose two, sixty six.") as vo:
            self.play(FadeOut(VGroup(kids, row3, nums, rings, f, defn)), run_time=0.5)
            self.play(Write(wrong), run_time=0.7)
            self.play(Create(wx), FadeIn(wnote), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.25))
            self.play(Write(eqn), FadeIn(eqs), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(Write(ans), run_time=0.9)

    # ------------------------------------------------------------ scene 4: bounds
    def s4(self):
        hd = header("3.3 · Lower and Upper Bounds")
        xs = [-3.2, 0, 3.2]
        kids = VGroup(*[chip(n, c, 26).move_to(P(x, 2.4))
                        for n, c, x in zip(["x", "y", "z"], [G1, G2, G3], xs)])
        stars = VGroup(*[star().move_to(P(-3.15 + i * 0.7, 0.5)) for i in range(10)])
        rest_target = [P(-2.1 + i * 0.7, 0.5) for i in range(7)]
        f = M(r"x, y, z \ge 1:\quad x' + y' + z' = 7 \;\Rightarrow\; {}^9C_2 = 36", 44).move_to(P(0, -1.2))
        f[0][-2:].set_color(HL)
        note = T("hand out one each first", 26, color=G3).move_to(P(0, -2.5))

        with self.voiceover("Now add rules. Ten toffees, three children, and everyone gets at least one. Hand out "
                            "one each first. Seven toffees are left with no rules at all: nine choose two, "
                            "thirty six.") as vo:
            self.play(FadeIn(hd), FadeIn(kids), run_time=0.7)
            self.play(LaggedStart(*[FadeIn(s, scale=0.4) for s in stars], lag_ratio=0.08), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(*[stars[i].animate.move_to(P(xs[i], 1.6)) for i in range(3)], FadeIn(note), run_time=1.0)
            self.play(*[stars[3 + i].animate.move_to(rest_target[i]) for i in range(7)], run_time=0.7)
            self.play(Write(f), run_time=1.4)

        top = M(r"x + y + z = 10,\qquad x \le 3", 50).move_to(P(0, 2.3))
        l1 = M(r"\text{all: } {}^{12}C_2 = 66", 42).move_to(P(0, 1.0))
        l2 = M(r"\text{broken: } x \ge 4 \;\Rightarrow\; x' + y + z = 6 \;\Rightarrow\; {}^8C_2 = 28", 42)
        l2.move_to(P(0, -0.2))
        l3 = M(r"66 - 28 = 38", 56).move_to(P(0, -1.6))
        l3[0][-2:].set_color(HL)

        with self.voiceover("An upper bound cannot be paid out. So count the rule breakers and subtract. "
                            "x plus y plus z equals ten with x at most three. All solutions: sixty six. The rule "
                            "is broken when x is at least four. Pay out four: six left, eight choose two, twenty "
                            "eight. Answer: thirty eight.") as vo:
            self.play(FadeOut(VGroup(kids, stars, f, note)), run_time=0.5)
            self.play(Write(top), run_time=0.9)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(Write(l1), run_time=0.9)
            self.wait(max(0.1, vo.duration * 0.08))
            self.play(Write(l2), run_time=1.5)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(Write(l3), run_time=0.9)

        nl = NumberLine(x_range=[0, 10, 1], length=10, color=INK, include_numbers=True,
                        font_size=30).move_to(P(0, 0.6))
        nl.numbers.set_color(INK)
        good = VGroup(*[Dot(nl.n2p(k), color=OK, radius=0.13) for k in range(0, 4)])
        bad = VGroup(*[Dot(nl.n2p(k), color=WARN, radius=0.13) for k in range(4, 11)])
        gl = T("allowed", 24, color=OK).move_to(nl.n2p(1.5) + UP * 0.6)
        bl = T("broken", 24, color=WARN).move_to(nl.n2p(7) + UP * 0.6)
        wrong = M(r"\text{breakers: } x \ge 3", 42).move_to(P(-3.3, -1.1))
        wx = strike(wrong)
        right = M(r"\text{breakers: } x \ge 4", 42).move_to(P(3.0, -1.1))
        tick = check().next_to(right, RIGHT, buff=0.3)
        warn = card(T("x ≤ 3 is broken by x ≥ 4, not x ≥ 3", 28, color=WARN), color=WARN).move_to(P(0, -2.6))

        with self.voiceover("Watch the boundary. At most three is broken by at least four, not at least three. "
                            "Subtracting the at least three cases throws away the allowed value three.") as vo:
            self.play(FadeOut(VGroup(l1, l2, l3)), top.animate.move_to(P(0, 2.5)), run_time=0.5)
            self.play(Create(nl), run_time=0.8)
            self.play(LaggedStart(*[FadeIn(d, scale=0.5) for d in good], lag_ratio=0.1), FadeIn(gl), run_time=0.7)
            self.play(LaggedStart(*[FadeIn(d, scale=0.5) for d in bad], lag_ratio=0.08), FadeIn(bl), run_time=0.8)
            self.play(Write(right), FadeIn(tick), run_time=0.8)
            self.play(Write(wrong), run_time=0.6)
            self.play(Create(wx), Indicate(good[3], color=HL, scale_factor=1.8), run_time=0.8)
            self.play(FadeIn(warn, shift=0.2 * UP), run_time=0.6)

    # ------------------------------------------------------------ scene 5: distinct into distinct
    def s5(self):
        hd = header("3.4 · Distinct into Distinct")
        letters = VGroup(*[chip(f"L{i + 1}", c, 26) for i, c in enumerate([G1, G2, G3, OK, ACCENT])])
        letters.arrange(RIGHT, buff=0.55).move_to(P(0, 2.3))
        boxes = VGroup()
        for i, name in enumerate("PQR"):
            r = RoundedRectangle(width=1.7, height=1.0, corner_radius=0.12, color=MUTED, stroke_width=3)
            r.set_fill(WHITE, opacity=1)
            boxes.add(VGroup(r, T(name, 32, weight="BOLD", color=INK).move_to(r)).move_to(P(-3.5 + 3.5 * i, -0.3)))
        lines = VGroup(*[Line(l.get_bottom(), b.get_top(), color=MUTED, stroke_width=1.5, stroke_opacity=0.6)
                         for l in letters for b in boxes])
        threes = VGroup(*[M("3", 32, color=HL).next_to(l, UP, buff=0.15) for l in letters])
        f = M(r"3 \times 3 \times 3 \times 3 \times 3 = 3^5 = 243", 48).move_to(P(0, -1.9))
        f[0][-3:].set_color(HL)
        bad = M(r"5^3", 54).move_to(P(-3.4, -3.1))
        bx = strike(bad)
        bnote = T("a box can hold many letters, or none", 24, color=MUTED).next_to(bad, RIGHT, buff=0.6)

        with self.voiceover("Five different letters, three postboxes. Think about the letters, not the boxes. "
                            "Each letter chooses a box, three choices each, whatever the others did. Three to the "
                            "power five, two hundred and forty three. Not five to the power three: a box can hold "
                            "many letters, or none.") as vo:
            self.play(FadeIn(hd), LaggedStart(*[FadeIn(l, shift=0.2 * DOWN) for l in letters], lag_ratio=0.1),
                      FadeIn(boxes), run_time=1.0)
            self.play(LaggedStart(*[Create(x) for x in lines], lag_ratio=0.04), run_time=1.6)
            self.play(LaggedStart(*[FadeIn(t, scale=0.5) for t in threes], lag_ratio=0.15), run_time=1.0)
            self.play(Write(f), run_time=1.3)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(Write(bad), run_time=0.5)
            self.play(Create(bx), FadeIn(bnote), run_time=0.7)

        centers = [P(-4.0, 0.8), P(-2.2, 0.8), P(-3.1, -0.75)]
        g = sum(centers) / 3
        circ_cols = [G1, G2, G3]
        circles = VGroup(*[Circle(radius=1.4, color=c, stroke_width=4).set_fill(c, opacity=0.12).move_to(p)
                           for c, p in zip(circ_cols, centers)])
        labs = VGroup(
            T("P empty", 24, color=G1).move_to(P(-5.2, 2.55)),
            T("Q empty", 24, color=G2).move_to(P(-2.0, 2.55)),
            T("R empty", 24, color=G3).move_to(P(-3.5, -2.55)),
        )
        singles = VGroup(*[M(r"= 2^n", 34, color=c).next_to(lab, RIGHT, buff=0.15)
                           for c, lab in zip(circ_cols, labs)])
        pair_pts = []
        for i, j in [(0, 1), (0, 2), (1, 2)]:
            mid = (centers[i] + centers[j]) / 2
            pair_pts.append(mid + (mid - g) * 0.9)
        ones = VGroup(*[M("1", 34, color=HL).move_to(p) for p in pair_pts])
        r1 = M(r"\text{one box empty: } 3 \times 2^n", 40).move_to(P(3.6, 1.3))
        r2 = M(r"\text{all in one box: } 3 \times 1", 40).move_to(P(3.6, 0.0))
        r3 = T("subtracted twice, so add back once", 24, color=WARN).move_to(P(3.6, -0.8))
        n_lab = T("n different letters, boxes P, Q, R, none empty", 26, color=MUTED).move_to(P(0, -3.4))

        with self.voiceover("Now demand that no box is empty. Count the bad ones. Pick a box to leave empty, three "
                            "ways, and the letters use the other two: two to the power n each. But a distribution "
                            "with every letter in one box was subtracted twice, so add those three back.") as vo:
            self.play(FadeOut(VGroup(letters, boxes, lines, threes, f, bad, bx, bnote)), run_time=0.5)
            self.play(FadeIn(n_lab), run_time=0.5)
            self.play(LaggedStart(*[Create(c) for c in circles], lag_ratio=0.25), FadeIn(labs), run_time=1.2)
            self.play(LaggedStart(*[FadeIn(s, scale=0.5) for s in singles], lag_ratio=0.2), Write(r1),
                      run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.2))
            self.play(LaggedStart(*[FadeIn(o, scale=0.5) for o in ones], lag_ratio=0.2), Write(r2), run_time=1.2)
            self.play(FadeIn(r3), run_time=0.6)

        big = M(r"\#\,\text{onto} = 3^n - 3\cdot 2^n + 3", 56).move_to(P(0, 1.6))
        n5 = M(r"n = 5:\quad 243 - 96 + 3 = 150", 48).move_to(P(0, 0.2))
        n5[0][-3:].set_color(HL)
        n3 = M(r"n = 3:\quad 27 - 24 + 3 = 6 = 3!", 44).move_to(P(-0.3, -1.1))
        tick = check().next_to(n3, RIGHT, buff=0.35)
        ie = card(T("Add the singles, subtract the pairs, add the triple.", 28, color=G3),
                  color=G3).move_to(P(0, -2.6))

        with self.voiceover("Three to the n, minus three times two to the n, plus three. For five letters: two "
                            "hundred and forty three minus ninety six plus three, one hundred and fifty. This is "
                            "inclusion exclusion: add the singles, subtract the pairs, add the triple.") as vo:
            self.play(FadeOut(VGroup(circles, labs, singles, ones, r1, r2, r3, n_lab)), run_time=0.5)
            self.play(Write(big), run_time=1.4)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(Write(n5), run_time=1.2)
            self.play(Write(n3), FadeIn(tick), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(FadeIn(ie, shift=0.2 * UP), run_time=0.7)

    # ------------------------------------------------------------ scene 6: choosing the model
    def s6(self):
        hd = header("3.5 · Choosing the Right Model")
        qs = VGroup(*[
            card(T(s, 32, color=c), pad=0.25, color=c)
            for s, c in [("1.  Does order matter?", G1), ("2.  Can things repeat?", G2),
                         ("3.  What is identical?", G3)]
        ]).arrange(DOWN, buff=0.4).move_to(P(0, 0.1))
        for q in qs:
            q.align_to(qs[0], LEFT)
        qs.move_to(P(0, 0.1))

        with self.voiceover("So which formula? Ask three questions. Does order matter? Can things repeat? "
                            "And what is identical?") as vo:
            self.play(FadeIn(hd), run_time=0.5)
            for q in qs:
                self.play(FadeIn(q, shift=0.2 * RIGHT), run_time=0.6)
                self.wait(max(0.1, vo.duration * 0.12))

        strip = T("Order?     Repeat?     Identical?", 26, color=MUTED).move_to(P(0, 2.7))
        stories = [
            ("5 different books → 3 students", "", r"3^5 = 243", P(-3.4, 1.1)),
            ("5 identical books → 3 students", "", r"{}^7C_2 = 21", P(3.4, 1.1)),
            ("3 different prizes → 5 students", "at most one each", r"{}^5P_3 = 60", P(-3.4, -1.3)),
            ("3 identical prizes → 5 students", "at most one each", r"{}^5C_3 = 10", P(3.4, -1.3)),
        ]
        cards = VGroup()
        for s, sub, ans, pos in stories:
            parts = [T(s, 24)]
            if sub:
                parts.append(T(sub, 20, color=MUTED))
            a = M(ans, 44)
            a[0][-3 if ans.endswith("243") else -2:].set_color(HL)
            parts.append(a)
            inner = VGroup(*parts).arrange(DOWN, buff=0.15)
            c = card(inner, pad=0.25, color=MUTED)
            c[0].stretch_to_fit_width(5.8)
            c[0].stretch_to_fit_height(1.9)
            c[0].move_to(inner)
            cards.add(c.move_to(pos))

        with self.voiceover("Watch four stories with the same numbers. Five different books to three students: "
                            "three to the five, two hundred and forty three. Five identical books: stars and bars, "
                            "twenty one. Three different prizes to five students, one each at most: five times four "
                            "times three, sixty. Three identical prizes: five choose three, ten.") as vo:
            self.play(FadeOut(qs), FadeIn(strip), run_time=0.6)
            for c in cards:
                self.play(FadeIn(c, shift=0.2 * UP), run_time=0.7)
                self.wait(max(0.1, vo.duration * 0.16))

        tip = card(T("Stuck between two models? Shrink the numbers and list every case.", 26, color=G3),
                   color=G3).move_to(P(0, -3.25))

        with self.voiceover("And when two models both seem to fit, shrink the numbers until you can list every "
                            "case by hand, and see which formula agrees.") as vo:
            self.play(FadeIn(tip, shift=0.2 * UP), run_time=0.8)

    # ------------------------------------------------------------ scene 7: recap
    def s7(self):
        hd = T("Chapter 3 · Recap", 36, weight="BOLD", color=PRIMARY).to_edge(UP, buff=0.5)
        items = [
            (r"\frac{n!}{n_1!\cdots n_k!}", "Groups; divide by k! only for equal, unnamed groups"),
            (r"{}^{n+k-1}C_{k-1}", "Identical things into boxes: stars and bars"),
            (r"x \ge a", "Lower bounds: pay out first"),
            (r"x \le b", "Upper bounds: all minus the rule-breakers"),
            (r"k^n", "Different things into boxes; none empty: inclusion–exclusion"),
        ]
        rows = VGroup()
        for tex, s in items:
            sym = M(tex, 36, color=G3)
            row = VGroup(check(), sym, T(s, 26)).arrange(RIGHT, buff=0.35)
            rows.add(row)
        rows.arrange(DOWN, buff=0.35, aligned_edge=LEFT)
        col_x = max(r[1].get_right()[0] for r in rows) + 0.4
        for r in rows:
            r[2].next_to(P(col_x, r[2].get_center()[1]), RIGHT, buff=0)
        rows.move_to(P(0, 0.1))
        if rows.width > config.frame_width - 1.6:
            rows.scale_to_fit_width(config.frame_width - 1.6)
        nxt = card(T("Next: Pascal's Triangle and the Binomial Theorem", 28, color=G3),
                   color=G3).to_edge(DOWN, buff=0.45)

        with self.voiceover("Here is the toolkit. Groups: n factorial over the group factorials, and divide by k "
                            "factorial only for equal groups with no names. Identical things into boxes: stars and "
                            "bars. Lower bounds: pay out first. Upper bounds: subtract the rule breakers. Different "
                            "things into boxes: k to the n, and inclusion exclusion when no box may be empty. Next "
                            "chapter, these same choices build Pascal's triangle and the binomial theorem.") as vo:
            self.play(FadeIn(hd), run_time=0.5)
            per = max(0.4, vo.duration * 0.1)
            for r in rows:
                self.play(FadeIn(r[1]), FadeIn(r[2], shift=0.2 * RIGHT), run_time=0.5)
                self.play(FadeIn(r[0], scale=0.5), run_time=0.3)
                self.wait(per)
            self.play(FadeIn(nxt, shift=0.2 * UP), run_time=0.7)
