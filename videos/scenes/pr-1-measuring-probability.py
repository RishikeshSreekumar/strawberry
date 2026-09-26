import sys
from math import prod
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

# Chapter colour roles (light background), matching Chapter 0.
EA = PRIMARY  # event A / heads / "for" = strawberry red
EB = SECONDARY  # event B / tails / "against" = teal
HL = ManimColor("#D19A00")  # totals, overlaps, highlights (gold)
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


def cross_out(mob):
    return VGroup(
        Line(mob.get_corner(UL), mob.get_corner(DR), color=WARN, stroke_width=5),
        Line(mob.get_corner(DL), mob.get_corner(UR), color=WARN, stroke_width=5),
    )


def header(s):
    return T(s, 28, weight="BOLD", color=MUTED).to_corner(UL, buff=0.4)


def coin(h, r=0.3):
    col = EA if h else EB
    c = Circle(radius=r, color=col, stroke_width=3).set_fill(col, opacity=1)
    return VGroup(c, T("H" if h else "T", int(r * 80), color=WHITE, weight="BOLD").move_to(c))


def ball(col, r=0.26):
    return Circle(radius=r, color=col, stroke_width=2).set_fill(col, opacity=1)


def dice_grid(ll=P(-5.6, -2.9), cell=0.78):
    """6x6 grid: first die along x, second die along y. Returns (group, cells dict)."""
    cells = {}
    sq = VGroup()
    for a in range(1, 7):
        for b in range(1, 7):
            s = Square(side_length=cell, color=MUTED, stroke_width=1.5).set_fill(WHITE, opacity=1)
            s.move_to(ll + P((a - 0.5) * cell, (b - 0.5) * cell))
            cells[(a, b)] = s
            sq.add(s)
    xs = VGroup(*[M(str(a), 26, color=EA).move_to(ll + P((a - 0.5) * cell, -0.28)) for a in range(1, 7)])
    ys = VGroup(*[M(str(b), 26, color=EB).move_to(ll + P(-0.28, (b - 0.5) * cell)) for b in range(1, 7)])
    xl = T("first die", 20, color=EA).move_to(ll + P(3 * cell, -0.68))
    yl = T("second die", 20, color=EB).rotate(PI / 2).move_to(ll + P(-0.68, 3 * cell))
    return VGroup(sq, xs, ys, xl, yl), cells


def fill_cells(cells, keys, color, opacity=0.6):
    return [cells[k].animate.set_fill(color, opacity=opacity) for k in keys]


SUM7 = [(a, 7 - a) for a in range(1, 7)]
EVEN1 = [(a, b) for a in (2, 4, 6) for b in range(1, 7)]
OVERLAP = [(2, 5), (4, 3), (6, 1)]


class PrCh1Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Probability",
            "Chapter 1 · Measuring Probability",
            "Chapter one. Measuring probability.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ scene 1: classical probability
    def s1(self):
        hd = header("1.1 · Classical probability")
        g, cells = dice_grid()
        ns = M(r"n(S) = 36", 40).move_to(P(3.2, 2.2))
        ev = card(T("A: sum is 7", 26, color=EA), color=EA).move_to(P(3.2, 1.1))
        frac = M(r"P(A) = \frac{6}{36} = \frac{1}{6}", 48, color=EA).move_to(P(3.2, -0.3))
        rule = card(M(r"P(E) = \frac{n(E)}{n(S)}", 50, color=INK), color=HL).move_to(P(3.2, -2.1))

        with self.voiceover("Chapter zero gave us sample spaces and events. Now we put a number on an event. "
                            "Roll two fair dice: thirty six outcomes, all equally likely. The event, sum is "
                            "seven, fills six of the thirty six cells. So its probability is six over thirty "
                            "six, one sixth. Probability is the fraction of the sample space that the event "
                            "occupies.") as vo:
            self.play(FadeIn(hd), FadeIn(g), run_time=1.0)
            self.play(Write(ns), run_time=0.7)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(*fill_cells(cells, SUM7, EA), FadeIn(ev), run_time=1.2)
            self.play(Write(frac), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(FadeIn(rule, shift=0.2 * UP), run_time=0.8)

        why = M(r"P(E) = \underbrace{\tfrac{1}{N} + \tfrac{1}{N} + \cdots + \tfrac{1}{N}}_{n(E)\ \text{shares}}"
                r" = \frac{n(E)}{N}", 42).move_to(P(0, 1.2))
        warn = card(VGroup(T("Only when every outcome", 28, color=WARN),
                           T("is equally likely.", 28, color=WARN)).arrange(DOWN, buff=0.12),
                    color=WARN).move_to(P(0, -1.2))

        with self.voiceover("Why a fraction? If N outcomes share the certainty equally, each one gets one over "
                            "N, and an event made of n of E outcomes collects n of E shares. But that needs "
                            "every outcome to be equally likely. That assumption does all the work.") as vo:
            self.play(FadeOut(VGroup(g, ns, ev, frac, rule)), run_time=0.5)
            self.play(Write(why), run_time=1.6)
            self.wait(max(0.1, vo.duration * 0.3))
            self.play(FadeIn(warn, shift=0.2 * UP), run_time=0.8)

        g2, cells2 = dice_grid()
        myth = card(T("\"12 or not 12, so 50-50\"", 26, color=WARN), color=WARN).move_to(P(3.2, 2.0))
        c12 = M(r"\text{sum } 12:\ 1 \text{ cell}", 36, color=HL).move_to(P(3.2, 0.6))
        cn = M(r"\text{not } 12:\ 35 \text{ cells}", 36, color=EB).move_to(P(3.2, -0.3))
        ans = M(r"P(\text{sum} = 12) = \frac{1}{36}", 46, color=INK).move_to(P(3.2, -1.7))
        rest = [k for k in cells2 if k != (6, 6)]

        with self.voiceover("A common trap. Either the sum is twelve or it isn't, so it's fifty fifty? No. Sum "
                            "twelve is one cell, double six. Not twelve is the other thirty five. Two "
                            "categories are not two equally likely outcomes. The probability is one over "
                            "thirty six.") as vo:
            self.play(FadeOut(VGroup(why, warn)), run_time=0.5)
            self.play(FadeIn(g2), FadeIn(myth), run_time=0.9)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(cells2[(6, 6)].animate.set_fill(HL, opacity=0.9), FadeIn(c12), run_time=0.8)
            self.play(*fill_cells(cells2, rest, EB, 0.35), FadeIn(cn), run_time=0.9)
            self.play(Create(cross_out(myth)), run_time=0.5)
            self.play(Write(ans), run_time=0.9)

    # ------------------------------------------------------------ scene 2: long-run frequency
    def s2(self):
        hd = header("1.2 · Probability as long-run frequency")
        ex = VGroup(
            T("A drawing pin lands point up?", 28),
            T("A bulb lasts 1000 hours?", 28),
            T("No symmetry, so nothing to count.", 28, color=MUTED),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.25).move_to(P(0, 1.4))
        rf = card(M(r"P(E) \approx \frac{f}{n} = \frac{\text{times } E \text{ happened}}{\text{number of trials}}", 44),
                  color=HL).move_to(P(0, -1.4))

        with self.voiceover("Classical probability needs symmetry. When there is none, like a drawing pin "
                            "landing point up, we measure instead. Repeat the experiment n times, count the f "
                            "times the event happens, and use the relative frequency, f over n.") as vo:
            self.play(FadeIn(hd), run_time=0.5)
            self.play(LaggedStart(*[FadeIn(e, shift=0.2 * RIGHT) for e in ex], lag_ratio=0.4), run_time=1.8)
            self.wait(max(0.1, vo.duration * 0.2))
            self.play(Write(rf), run_time=1.2)

        ax = Axes(x_range=[1, 13, 1], y_range=[0, 0.3, 0.1], x_length=9.0, y_length=4.4,
                  axis_config={"color": INK, "stroke_width": 2, "include_tip": False},
                  y_axis_config={"numbers_to_include": [0.1, 0.2, 0.3], "font_size": 24,
                                 "decimal_number_config": {"num_decimal_places": 1, "color": INK}})
        ax.move_to(P(-1.2, -0.6))
        xnums = VGroup(*[M(str(s), 26).next_to(ax.c2p(s, 0), DOWN, buff=0.18) for s in range(2, 13)])
        xl = T("sum of two dice", 22, color=MUTED).next_to(xnums, DOWN, buff=0.2)
        yl = T("fraction of rolls", 22, color=MUTED).next_to(ax.y_axis, UP, buff=0.15).shift(0.9 * RIGHT)
        theo = {s: (6 - abs(s - 7)) / 36 for s in range(2, 13)}
        tri = VGroup(*[DashedLine(ax.c2p(s, theo[s]), ax.c2p(s + 1, theo[s + 1]), color=HL, stroke_width=3)
                       for s in range(2, 12)])
        tdots = VGroup(*[Dot(ax.c2p(s, theo[s]), color=HL, radius=0.06) for s in range(2, 13)])
        tlab = M(r"\tfrac{6}{36}", 34, color=HL).next_to(ax.c2p(7, theo[7]), UP, buff=0.35).shift(0.55 * RIGHT)

        rng = np.random.default_rng(1)
        sums = rng.integers(1, 7, 10000) + rng.integers(1, 7, 10000)

        def bars(n):
            f = np.bincount(sums[:n], minlength=13)[2:13] / n
            grp = VGroup()
            for s, v in zip(range(2, 13), f):
                h = max(ax.c2p(0, v)[1] - ax.c2p(0, 0)[1], 0.001)
                r = Rectangle(width=0.5, height=h, stroke_width=0).set_fill(EB, opacity=0.75)
                r.move_to(ax.c2p(s, 0), aligned_edge=DOWN)
                grp.add(r)
            return grp

        stages = [20, 200, 10000]
        b = bars(stages[0])
        nlab = M(r"n = 20", 40, color=EB).move_to(P(4.9, 2.2))
        conf = VGroup(T("Frequency confirms", 24, color=OK), T("the count.", 24, color=OK)).arrange(DOWN, buff=0.1)
        conf.move_to(P(5.2, 1.1))

        with self.voiceover("Watch it with two dice. After twenty rolls, the bars for each sum are ragged. After "
                            "two hundred, a shape appears. After ten thousand, they hug the triangle that the "
                            "grid predicted: one thirty sixth, rising to six thirty sixths at seven, and back "
                            "down. When symmetry exists, frequency confirms it.") as vo:
            self.play(FadeOut(VGroup(ex, rf)), run_time=0.5)
            self.play(Create(ax), FadeIn(xnums), FadeIn(xl), FadeIn(yl), run_time=1.0)
            self.play(FadeIn(b, shift=0.2 * UP), FadeIn(nlab), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(Transform(b, bars(stages[1])), Transform(nlab, M(r"n = 200", 40, color=EB).move_to(nlab)),
                      run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(Transform(b, bars(stages[2])),
                      Transform(nlab, M(r"n = 10000", 40, color=EB).move_to(nlab)), run_time=1.2)
            self.play(Create(tri), FadeIn(tdots), FadeIn(tlab), run_time=1.2)
            self.play(FadeIn(conf), run_time=0.6)

        flips = VGroup(*[coin(h, 0.42) for h in (1, 1, 0, 1)]).arrange(RIGHT, buff=0.3).move_to(P(0, 2.0))
        guess = card(M(r"P(\text{H}) = \frac{3}{4}\ ?", 48, color=WARN), color=WARN).move_to(P(-3.2, 0.2))
        truth = VGroup(M(r"P(\text{3 or more heads in 4}) = \tfrac{5}{16} \approx 31\%", 40),
                       T("for a perfectly fair coin", 24, color=MUTED)).arrange(DOWN, buff=0.2).move_to(P(2.6, 0.2))
        big = card(T("The frequency view needs a large n.", 28, color=OK), color=OK).move_to(P(0, -2.2))

        with self.voiceover("But small samples mislead. Four flips and three heads does not mean the chance of "
                            "heads is three quarters. A perfectly fair coin does that, or better, about thirty "
                            "one percent of the time. The frequency view only means something when n is "
                            "large.") as vo:
            self.play(FadeOut(VGroup(ax, xnums, xl, yl, tri, tdots, tlab, b, nlab, conf)), run_time=0.5)
            self.play(LaggedStart(*[FadeIn(c, scale=0.4) for c in flips], lag_ratio=0.25), run_time=1.2)
            self.play(FadeIn(guess), run_time=0.6)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(Create(cross_out(guess)), Write(truth), run_time=1.2)
            self.play(FadeIn(big, shift=0.2 * UP), run_time=0.7)

    # ------------------------------------------------------------ scene 3: axioms and odds
    def s3(self):
        hd = header("1.3 · The axioms of probability")
        who = T("Kolmogorov, 1933: which rules must any probability obey?", 26, color=MUTED).move_to(P(0, 2.5))
        axs = VGroup(
            card(VGroup(T("Axiom 1", 24, color=PURPLE, weight="BOLD"), M(r"P(E) \ge 0", 42)).arrange(DOWN, buff=0.2),
                 color=PURPLE),
            card(VGroup(T("Axiom 2", 24, color=PURPLE, weight="BOLD"), M(r"P(S) = 1", 42)).arrange(DOWN, buff=0.2),
                 color=PURPLE),
            card(VGroup(T("Axiom 3", 24, color=PURPLE, weight="BOLD"),
                        M(r"A \cap B = \varnothing \Rightarrow", 34),
                        M(r"P(A \cup B) = P(A) + P(B)", 34)).arrange(DOWN, buff=0.15), color=PURPLE),
        ).arrange(RIGHT, buff=0.5).move_to(P(0, 0.2))
        subs = VGroup(T("never negative", 22, color=MUTED), T("something happens", 22, color=MUTED),
                      T("exclusive events add", 22, color=MUTED))
        for s, a in zip(subs, axs):
            s.next_to(a, DOWN, buff=0.25)

        with self.voiceover("Counting needs symmetry, and experiment needs repetition. In nineteen thirty three, "
                            "Kolmogorov asked: whatever probability is, which rules must it obey? Three are "
                            "enough. One: no probability is negative. Two: the sure event has probability one. "
                            "Three: for events that cannot happen together, probabilities add.") as vo:
            self.play(FadeIn(hd), FadeIn(who), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.3))
            for a, s in zip(axs, subs):
                self.play(FadeIn(a, shift=0.2 * UP), FadeIn(s), run_time=0.7)
                self.wait(max(0.1, vo.duration * 0.06))

        rect = Rectangle(width=5.0, height=3.0, color=INK, stroke_width=2.5).move_to(P(-3.6, 0.3))
        e = Rectangle(width=2.0, height=3.0, stroke_width=0).set_fill(EA, opacity=0.45)
        e.align_to(rect, LEFT).align_to(rect, UP)
        ec = Rectangle(width=3.0, height=3.0, stroke_width=0).set_fill(EB, opacity=0.3)
        ec.align_to(rect, RIGHT).align_to(rect, UP)
        cut = Line(e.get_corner(UR), e.get_corner(DR), color=INK, stroke_width=2.5)
        le = M(r"E", 44, color=EA).move_to(e)
        lec = M(r"E'", 44, color=EB).move_to(ec)
        ls = M(r"S", 34, color=MUTED).next_to(rect, UP, buff=0.12).align_to(rect, LEFT)
        der = VGroup(
            M(r"P(E) + P(E') = P(S) = 1", 40),
            M(r"P(E') = 1 - P(E)", 46, color=HL),
            M(r"P(\varnothing) = 0", 38),
            M(r"0 \le P(E) \le 1", 38),
        ).arrange(DOWN, buff=0.35).move_to(P(3.1, 0.6))
        flag = T("An answer outside [0, 1] means a rule was misused.", 26, color=WARN).move_to(P(0, -2.6))

        with self.voiceover("Everything else follows. An event E and its complement, not E, cannot happen "
                            "together, and together they make up S. So P of E plus P of not E equals P of S, "
                            "which is one. That is the complement rule, derived. In the same way, the empty "
                            "event has probability zero, and every probability sits between zero and one. Any "
                            "answer outside that range means a rule was misused.") as vo:
            self.play(FadeOut(VGroup(who, axs, subs)), run_time=0.5)
            self.play(Create(rect), FadeIn(ls), run_time=0.6)
            self.play(FadeIn(e), FadeIn(ec), Create(cut), FadeIn(le), FadeIn(lec), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(Write(der[0]), run_time=1.0)
            self.play(Write(der[1]), run_time=0.9)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(FadeIn(der[2]), run_time=0.6)
            self.play(FadeIn(der[3]), run_time=0.6)
            self.play(FadeIn(flag), run_time=0.6)

        shares = VGroup(*[Square(side_length=0.9, color=WHITE, stroke_width=3)
                          .set_fill(EA if i < 3 else EB, opacity=0.85) for i in range(5)]).arrange(RIGHT, buff=0)
        shares.move_to(P(0, 1.6))
        odd = M(r"\text{odds } 3 : 2 \text{ in favour}", 40).next_to(shares, UP, buff=0.35)
        lab = VGroup(T("3 for", 24, color=EA).next_to(shares[1], DOWN, buff=0.2),
                     T("2 against", 24, color=EB).next_to(VGroup(shares[3], shares[4]), DOWN, buff=0.2))
        good = M(r"P(E) = \frac{3}{3 + 2} = \frac{3}{5}", 48, color=OK).move_to(P(0, -0.8))
        w1 = M(r"\frac{3}{2}", 44, color=WARN).move_to(P(-3.6, -2.3))
        w2 = M(r"\frac{2}{3}", 44, color=WARN).move_to(P(3.6, -2.3))

        with self.voiceover("And odds are not probabilities. Odds of three to two in favour mean three shares "
                            "for and two against: five shares in all. So the probability is three fifths. Not "
                            "three halves, and not two thirds.") as vo:
            self.play(FadeOut(VGroup(rect, e, ec, cut, le, lec, ls, der, flag)), run_time=0.5)
            self.play(FadeIn(odd), run_time=0.6)
            self.play(LaggedStart(*[FadeIn(s, scale=0.6) for s in shares], lag_ratio=0.2), FadeIn(lab),
                      run_time=1.2)
            self.play(Write(good), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(FadeIn(w1), FadeIn(w2), run_time=0.5)
            self.play(Create(cross_out(w1)), Create(cross_out(w2)), run_time=0.5)

    # ------------------------------------------------------------ scene 4: addition rule
    def s4(self):
        hd = header("1.4 · The addition rule")
        g, cells = dice_grid()
        la = M(r"A:\ \text{first die even},\ 18", 34, color=EA).move_to(P(3.3, 2.3))
        lb = M(r"B:\ \text{sum is } 7,\ 6", 34, color=EB).move_to(P(3.3, 1.5))
        naive = M(r"18 + 6 = 24\ ?", 40, color=WARN).move_to(P(3.3, 0.5))
        both = M(r"A \cap B:\ (2,5),\ (4,3),\ (6,1)", 34, color=HL).move_to(P(3.3, -0.5))
        only_b = [c for c in SUM7 if c not in OVERLAP]

        with self.voiceover("What if events overlap? On the dice grid, let A be, first die even: eighteen cells. "
                            "Let B be, sum is seven: six cells. Adding gives twenty four. But three cells, two "
                            "five, four three and six one, sit in both, and were counted twice.") as vo:
            self.play(FadeIn(hd), FadeIn(g), run_time=0.8)
            self.play(*fill_cells(cells, EVEN1, EA, 0.35), FadeIn(la), run_time=1.0)
            self.play(*fill_cells(cells, only_b, EB, 0.6), *fill_cells(cells, OVERLAP, HL, 0.9), FadeIn(lb),
                      run_time=1.0)
            self.play(FadeIn(naive), run_time=0.6)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(*[Indicate(cells[c], color=HL, scale_factor=1.3) for c in OVERLAP], FadeIn(both), run_time=1.2)

        cnt = M(r"18 + 6 - 3 = 21", 42).move_to(P(3.3, 0.5))
        pr = M(r"P(A \cup B) = \frac{21}{36} = \frac{7}{12}", 42, color=HL).move_to(P(3.3, -0.6))
        rule = card(M(r"P(A \cup B) = P(A) + P(B) - P(A \cap B)", 40), color=PURPLE).move_to(P(0, 0.3))
        three = VGroup(T("Three events: add the singles, subtract the pairs,", 24, color=MUTED),
                       T("add back the triple.", 24, color=MUTED)).arrange(DOWN, buff=0.1).move_to(P(0, -1.3))
        tri = M(r"P(A \cup B \cup C) = \Sigma P(\text{one}) - \Sigma P(\text{pair}) + P(A \cap B \cap C)", 34)
        tri.move_to(P(0, -2.5))

        with self.voiceover("So subtract the overlap once. Eighteen plus six minus three is twenty one cells: "
                            "twenty one over thirty six, seven twelfths. That is the addition rule. P of A or "
                            "B equals P of A, plus P of B, minus P of A and B. For three events, add the "
                            "singles, subtract the pairs, and add back the triple.") as vo:
            self.play(FadeOut(naive), FadeOut(both), run_time=0.4)
            self.play(Write(cnt), run_time=0.9)
            self.play(Write(pr), run_time=0.9)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(FadeOut(VGroup(g, la, lb, cnt, pr)), run_time=0.5)
            self.play(FadeIn(rule, shift=0.2 * UP), run_time=0.9)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(FadeIn(three), Write(tri), run_time=1.2)

        L = 9.0
        x0 = -L / 2
        base = Line(P(x0, 0), P(x0 + L, 0), color=INK, stroke_width=3).move_to(P(0, 0))
        tk = VGroup(M("0", 32).next_to(P(x0, 0), DOWN, buff=0.2), M("1", 32).next_to(P(x0 + L, 0), DOWN, buff=0.2))
        ba = Rectangle(width=0.7 * L, height=0.55, stroke_width=0).set_fill(EA, opacity=0.5)
        ba.move_to(P(x0 + 0.35 * L, 0.75))
        bb = Rectangle(width=0.6 * L, height=0.55, stroke_width=0).set_fill(EB, opacity=0.5)
        bb.move_to(P(x0 + L - 0.3 * L, 1.45))
        tA = M(r"P(A) = 0.7", 34, color=INK).move_to(P(x0 + 0.2 * L, 0.75))
        tB = M(r"P(B) = 0.6", 34, color=INK).move_to(P(x0 + 0.85 * L, 1.45))
        ov = Rectangle(width=0.3 * L, height=2.1, color=HL, stroke_width=3).move_to(P(x0 + 0.55 * L, 1.05))
        ovl = M(r"\text{overlap} \ge 0.3", 34, color=HL).next_to(ov, UP, buff=0.15)
        sumw = card(M(r"0.7 + 0.6 = 1.3 > 1", 42, color=WARN), color=WARN).move_to(P(0, -1.6))
        tip = T("A sum above 1 means you double-counted an overlap.", 26, color=OK).move_to(P(0, -2.9))

        with self.voiceover("Forget the overlap and the numbers often warn you. With P of A equal to point "
                            "seven and P of B point six, plain addition gives one point three. That is "
                            "impossible, so the two events must overlap by at least point three.") as vo:
            self.play(FadeOut(VGroup(rule, three, tri)), run_time=0.5)
            self.play(Create(base), FadeIn(tk), run_time=0.6)
            self.play(FadeIn(ba), FadeIn(tA), run_time=0.6)
            self.play(FadeIn(bb), FadeIn(tB), run_time=0.6)
            self.play(FadeIn(sumw), run_time=0.7)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(Create(ov), FadeIn(ovl), run_time=0.8)
            self.play(FadeIn(tip), run_time=0.6)

    # ------------------------------------------------------------ scene 5: complement trick
    def s5(self):
        hd = header("1.5 · The complement trick")
        bet1 = card(T("Bet 1: at least one six in 4 rolls", 26), color=EA).move_to(P(0, 2.3))
        trick = M(r"P(\text{at least one}) = 1 - P(\text{none})", 44, color=PURPLE).move_to(P(0, 1.1))
        f1 = M(r"1 - \left(\tfrac{5}{6}\right)^4 = \tfrac{671}{1296} \approx 0.518", 44, color=OK).move_to(P(0, -0.1))
        wrong = VGroup(M(r"\frac{4}{6}\ ?", 48, color=WARN),
                       T("then 7 rolls would give 7/6", 24, color=WARN)).arrange(DOWN, buff=0.15)
        wrong.move_to(P(-4.3, -1.6))

        with self.voiceover("In sixteen fifty four, the Chevalier de Méré bet on at least one six in four rolls "
                            "of a die. At least one is messy. Its complement, no six at all, is clean: five "
                            "sixths per roll, so five sixths to the power four. One minus that is about zero "
                            "point five one eight: a small edge, and he won. Note it is not four sixths. That "
                            "reasoning would give more than one after seven rolls.") as vo:
            self.play(FadeIn(hd), FadeIn(bet1), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(Write(trick), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(Write(f1), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(FadeIn(wrong), run_time=0.6)
            wx = cross_out(wrong)
            self.play(Create(wx), run_time=0.5)

        bet2 = card(T("Bet 2: at least one double six in 24 rolls of two dice", 24), color=EB).move_to(P(0, -0.4))
        f2 = M(r"1 - \left(\tfrac{35}{36}\right)^{24} \approx 0.491", 44, color=WARN).move_to(P(0, -1.6))
        lost = T("Just under one half: he lost.", 26, color=WARN).move_to(P(0, -2.6))

        with self.voiceover("Then he bet on at least one double six in twenty four rolls of two dice, since six "
                            "times rarer, times six times more rolls, seemed the same. It is not. One minus "
                            "thirty five over thirty six, to the power twenty four, is about zero point four "
                            "nine one. He lost.") as vo:
            self.play(FadeOut(VGroup(trick, wrong, wx)), run_time=0.5)
            self.play(f1.animate.move_to(P(0, 1.1)), run_time=0.5)
            self.play(FadeIn(bet2), run_time=0.7)
            self.wait(max(0.1, vo.duration * 0.25))
            self.play(Write(f2), run_time=1.2)
            self.play(FadeIn(lost), run_time=0.6)

        ax = Axes(x_range=[0, 60, 10], y_range=[0, 1, 0.25], x_length=8.0, y_length=4.4,
                  axis_config={"color": INK, "stroke_width": 2, "include_tip": False},
                  x_axis_config={"numbers_to_include": [10, 20, 30, 40, 50, 60], "font_size": 24},
                  y_axis_config={"numbers_to_include": [0, 0.5, 1], "font_size": 24,
                                 "decimal_number_config": {"num_decimal_places": 1, "color": INK}})
        ax.move_to(P(-2.4, -0.6))
        for num in ax.x_axis.numbers:
            num.set_color(INK)
        xl = T("people in the room", 22, color=MUTED).next_to(ax.x_axis, DOWN, buff=0.45)
        yl = T("P(some shared birthday)", 22, color=MUTED).next_to(ax.y_axis, UP, buff=0.2).shift(1.4 * RIGHT)
        pts = [ax.c2p(n, 1 - prod((365 - k) / 365 for k in range(n))) for n in range(1, 61)]
        curve = VMobject(color=EA, stroke_width=4).set_points_smoothly(pts)
        half = DashedLine(ax.c2p(0, 0.5), ax.c2p(60, 0.5), color=HL, stroke_width=3)
        p23 = ax.c2p(23, 0.5073)
        vline = DashedLine(ax.c2p(23, 0), p23, color=HL, stroke_width=3)
        dot = Dot(p23, color=HL, radius=0.09)
        lab23 = M(r"n = 23:\ 0.507", 34, color=HL).next_to(dot, LEFT, buff=0.25).shift(0.35 * UP)
        prodf = M(r"P(\text{all different}) = \tfrac{365}{365}\cdot\tfrac{364}{365}\cdot\tfrac{363}{365}\cdots",
                  32).move_to(P(0, 2.6))
        pairs = VGroup(M(r"{}^{23}C_2 = 253", 40, color=EA), T("pairs, any of which", 22, color=MUTED),
                       T("can match", 22, color=MUTED)).arrange(DOWN, buff=0.15).move_to(P(4.6, 0.2))
        no183 = VGroup(T("not 183", 26, color=WARN, weight="BOLD")).move_to(P(4.6, -1.6))

        with self.voiceover("The same trick solves the birthday problem. The chance that n people all have "
                            "different birthdays is a product: three sixty five over three sixty five, times "
                            "three sixty four over three sixty five, and so on. One minus that crosses one "
                            "half at just twenty three people, not one hundred and eighty three. Twenty three "
                            "people make two hundred and fifty three pairs, and any pair can match.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(Write(prodf), run_time=1.2)
            self.play(Create(ax), FadeIn(xl), FadeIn(yl), Create(half), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(Create(curve), run_time=2.0, rate_func=linear)
            self.play(Create(vline), FadeIn(dot, scale=2), FadeIn(lab23), run_time=0.9)
            self.play(FadeIn(no183), run_time=0.5)
            self.wait(max(0.1, vo.duration * 0.08))
            self.play(FadeIn(pairs), run_time=0.8)

    # ------------------------------------------------------------ scene 6: counting
    def s6(self):
        hd = header("1.6 · Probability by counting")
        jar = VMobject(color=INK, stroke_width=4).set_points_as_corners(
            [P(-1.6, 1.3), P(-1.6, -1.3), P(1.6, -1.3), P(1.6, 1.3)])
        cols = [EA] * 5 + [EB] * 3
        balls = VGroup(*[ball(c) for c in cols]).arrange_in_grid(rows=2, cols=4, buff=0.2)
        balls.move_to(P(0, -0.7))
        urn = VGroup(jar, balls).move_to(P(-4.6, 0.2))
        ul = VGroup(T("5 red, 3 blue", 24, color=MUTED), T("draw 2", 24, color=MUTED)).arrange(DOWN, buff=0.1)
        ul.next_to(urn, DOWN, buff=0.3)
        q = M(r"P(\text{both red})", 42).move_to(P(2.4, 2.4))
        un = VGroup(T("unordered", 24, color=EA),
                    M(r"\frac{{}^5C_2}{{}^8C_2} = \frac{10}{28} = \frac{5}{14}", 42)).arrange(RIGHT, buff=0.35)
        od = VGroup(T("ordered", 24, color=EB),
                    M(r"\frac{5 \times 4}{8 \times 7} = \frac{20}{56} = \frac{5}{14}", 42)).arrange(RIGHT, buff=0.35)
        rows = VGroup(un, od).arrange(DOWN, aligned_edge=LEFT, buff=0.5).move_to(P(2.4, 0.5))
        ok = VGroup(check_mark(), check_mark())
        ok[0].next_to(un, RIGHT, buff=0.25)
        ok[1].next_to(od, RIGHT, buff=0.25)

        with self.voiceover("When the sample space is too big to draw, count it. An urn holds five red and three "
                            "blue balls. Draw two. Counted as unordered pairs: five choose two over eight "
                            "choose two, ten over twenty eight. Counted as ordered draws: five times four over "
                            "eight times seven, twenty over fifty six. Both give five fourteenths.") as vo:
            self.play(FadeIn(hd), Create(jar), run_time=0.7)
            self.play(LaggedStart(*[FadeIn(b, scale=0.4) for b in balls], lag_ratio=0.1), FadeIn(ul), run_time=1.0)
            self.play(Write(q), run_time=0.6)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(Write(un), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(Write(od), run_time=1.2)
            self.play(FadeIn(ok), run_time=0.5)

        mixed = VGroup(T("mixed", 24, color=WARN),
                       M(r"\frac{{}^5C_2}{8 \times 7} = \frac{10}{56} = \frac{5}{28}", 42, color=WARN)).arrange(RIGHT, buff=0.35)
        mixed.next_to(rows, DOWN, buff=0.5).align_to(rows, LEFT)
        checks = VGroup(
            T("1. What is one outcome?", 32),
            T("2. Are the outcomes equally likely?", 32),
            T("3. Do top and bottom count the same kind of thing?", 32),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.35)
        chk = card(checks, pad=0.4, color=PURPLE).move_to(P(0, 0.0))

        with self.voiceover("The classic error mixes the two: an unordered count on top, an ordered count "
                            "below. Ten over fifty six is half the true answer. So before you divide, ask three "
                            "questions. What is one outcome? Are the outcomes equally likely? And does the top "
                            "count the same kind of thing as the bottom?") as vo:
            self.play(Write(mixed), run_time=1.2)
            mx = cross_out(mixed)
            self.play(Create(mx), run_time=0.5)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(FadeOut(VGroup(urn, ul, q, rows, ok, mixed, mx)), run_time=0.5)
            self.play(FadeIn(chk[0]), run_time=0.4)
            for c in checks:
                self.play(FadeIn(c, shift=0.2 * RIGHT), run_time=0.6)
                self.wait(max(0.1, vo.duration * 0.06))

    # ------------------------------------------------------------ scene 7: recap
    def s7(self):
        hd = T("Chapter 1 in six lines", 36, weight="BOLD", color=PRIMARY).move_to(P(0, 3.1))
        lines = [
            "Equally likely outcomes: P(E) = n(E) / n(S).",
            "The long-run frequency f / n settles near the true value.",
            "Three axioms give the complement rule and 0 ≤ P ≤ 1.",
            "Or: add, then subtract the overlap once.",
            "At least one: 1 − P(none).",
            "Count top and bottom the same way.",
        ]
        rows = VGroup()
        for i, s in enumerate(lines, start=1):
            num = Circle(radius=0.25, color=PRIMARY, stroke_width=3).set_fill(PRIMARY, opacity=1)
            nt = T(str(i), 24, color=WHITE, weight="BOLD").move_to(num)
            rows.add(VGroup(VGroup(num, nt), T(s, 26)).arrange(RIGHT, buff=0.35))
        rows.arrange(DOWN, aligned_edge=LEFT, buff=0.32).move_to(P(0, 0.05))
        nxt = T("Next: conditional probability and independence.", 28, color=MUTED).move_to(P(0, -3.2))

        with self.voiceover("Here is the chapter in six lines. With equally likely outcomes, probability is the "
                            "fraction of the sample space. The long-run frequency settles near the true value. "
                            "Three axioms give the complement rule, and keep every probability between zero "
                            "and one. For or, add, then subtract the overlap once. For at least one, use one "
                            "minus P of none. And count the top and the bottom the same way. Next, "
                            "conditional probability and independence.") as vo:
            self.play(FadeIn(hd), run_time=0.6)
            for r in rows:
                self.play(FadeIn(r, shift=0.2 * RIGHT), run_time=0.5)
                self.wait(max(0.1, vo.duration * 0.1))
            self.play(FadeIn(nxt), run_time=0.6)
        self.wait(1.0)


def check_mark():
    return MathTex(r"\checkmark", color=OK, font_size=48)
