import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

# Chapter colour roles (light background), matching the earlier Probability chapters.
XV = PRIMARY  # values of the random variable / bars = strawberry red
YV = SECONDARY  # second variable / outcomes = teal
HL = ManimColor("#D19A00")  # means, totals, balance points (gold)
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


def die_face(n, side=0.7, color=INK):
    sq = RoundedRectangle(width=side, height=side, corner_radius=0.1, color=color, stroke_width=2.5)
    sq.set_fill(WHITE, opacity=1)
    return VGroup(sq, M(str(n), int(side * 50), color=color).move_to(sq))


def chart(xr, ymax, xl, yl, ystep=None):
    ax = Axes(x_range=[xr[0], xr[1], 1], y_range=[0, ymax, ystep or ymax], x_length=xl, y_length=yl,
              axis_config={"color": INK, "stroke_width": 2, "include_tip": False},
              x_axis_config={"include_ticks": False}, y_axis_config={"include_ticks": False})
    left_y_axis(ax, xr[0])
    return ax


def left_y_axis(ax, x0):
    """Draw the y-axis at the left edge of the x-range, clear of any bar at x = 0."""
    ax.y_axis.set_stroke(opacity=0)
    ax.add(Line(ax.c2p(x0, 0), ax.c2p(x0, ax.y_range[1]), color=INK, stroke_width=2))


def bars(ax, values, probs, color=XV, width=0.55, opacity=0.8):
    unit = ax.c2p(1, 0)[0] - ax.c2p(0, 0)[0]
    g = VGroup()
    for v, p in zip(values, probs):
        h = max(ax.c2p(0, p)[1] - ax.c2p(0, 0)[1], 0.001)
        r = Rectangle(width=width * unit, height=h, stroke_width=0).set_fill(color, opacity=opacity)
        r.move_to(ax.c2p(v, 0), aligned_edge=DOWN)
        g.add(r)
    return g


def xnums(ax, values, size=28):
    return VGroup(*[M(str(v), size).next_to(ax.c2p(v, 0), DOWN, buff=0.15) for v in values])


HEADS = [0, 1, 2, 3]
HEADS_P = [1 / 8, 3 / 8, 3 / 8, 1 / 8]
HEADS_TEX = [r"\tfrac{1}{8}", r"\tfrac{3}{8}", r"\tfrac{3}{8}", r"\tfrac{1}{8}"]


class PrCh4Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Probability",
            "Chapter 4 · Random Variables, Expectation and Variance",
            "Chapter four. Random variables, expectation and variance.",
        )
        for part in (self.s0, self.s1, self.s2, self.s3, self.s4, self.s5, self.s6):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ scene 0: hook
    def s0(self):
        offer = card(VGroup(T("Pay Rs 10. Roll one die.", 32),
                            T("Roll a 6 and win Rs 30.", 32, color=XV)).arrange(DOWN, buff=0.2),
                     color=HL).move_to(P(0, 2.1))
        faces = VGroup(*[die_face(n, 0.9) for n in range(1, 7)]).arrange(RIGHT, buff=0.35).move_to(P(0, 0.2))
        q = T("Should you play?", 40, weight="BOLD", color=INK).move_to(P(0, -1.6))
        sub = T("One game: pure luck.  Six hundred games: very predictable.", 26, color=MUTED).move_to(P(0, -2.6))

        with self.voiceover("A stall at a fair charges ten rupees a game. Roll one die. Roll a six and you win "
                            "thirty rupees. Anything else, you get nothing. Should you play? One game is pure "
                            "luck. But over six hundred games, your wallet follows a very predictable path. "
                            "This chapter turns outcomes into numbers, so we can ask what happens on average, "
                            "and how far from average we usually land.") as vo:
            self.play(FadeIn(offer, shift=0.2 * DOWN), run_time=0.9)
            self.play(LaggedStart(*[FadeIn(f, scale=0.5) for f in faces], lag_ratio=0.15), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(faces[5][0].animate.set_fill(XV, opacity=0.35), run_time=0.6)
            self.play(Write(q), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(FadeIn(sub), run_time=0.7)

    # ------------------------------------------------------------ scene 1: random variables
    def s1(self):
        hd = header("4.1 · Numbers from outcomes")
        outs = ["HHH", "HHT", "HTH", "THH", "HTT", "THT", "TTH", "TTT"]
        vals = [3, 2, 2, 2, 1, 1, 1, 0]
        col = VGroup(*[T(o, 26, color=YV) for o in outs]).arrange(DOWN, buff=0.24).move_to(P(-4.2, -0.35))
        slab = M(r"S", 36, color=YV).next_to(col, UP, buff=0.25)
        ypos = {3: 2.2, 2: 0.7, 1: -0.8, 0: -2.3}
        dots = {}
        for v, y in ypos.items():
            c = Circle(radius=0.34, color=XV, stroke_width=3).set_fill(WHITE, opacity=1).move_to(P(-0.4, y))
            dots[v] = VGroup(c, M(str(v), 36, color=XV).move_to(c))
        dgrp = VGroup(*dots.values())
        rlab = M(r"\mathbb{R}", 36, color=XV).next_to(dots[3], UP, buff=0.25)
        arrows = VGroup(*[Arrow(col[i].get_right(), dots[v].get_left(), buff=0.12, stroke_width=2.5,
                                color=MUTED, max_tip_length_to_length_ratio=0.08)
                          for i, v in enumerate(vals)])
        defn = card(VGroup(T("Random variable", 26, color=PURPLE, weight="BOLD"),
                           M(r"X : S \to \mathbb{R}", 44),
                           T("one number per outcome", 22, color=MUTED)).arrange(DOWN, buff=0.2),
                    color=PURPLE).move_to(P(4.1, 0.2))

        with self.voiceover("Toss a coin three times. There are eight outcomes. Often you do not care which "
                            "one happened, only how many heads came up. H H T, H T H and T H H are different "
                            "outcomes, but they all give two. That rule, outcome in, number out, is a random "
                            "variable. Formally, it is a function from the sample space to the real "
                            "numbers.") as vo:
            self.play(FadeIn(hd), FadeIn(col, lag_ratio=0.1), FadeIn(slab), run_time=1.0)
            self.play(FadeIn(dgrp), FadeIn(rlab), run_time=0.6)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(LaggedStart(*[GrowArrow(a) for a in arrows], lag_ratio=0.15), run_time=2.0)
            self.play(*[Indicate(col[i], color=HL) for i in (1, 2, 3)], Indicate(dots[2], color=HL), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(FadeIn(defn, shift=0.2 * UP), run_time=0.8)

        myth = card(T("\"X is an unknown to solve for\"", 26, color=WARN), color=WARN).move_to(P(-3.4, 2.2))
        truth = card(VGroup(T("The rule is fixed.", 26, color=OK),
                            T("The outcome is random.", 26, color=OK)).arrange(DOWN, buff=0.1),
                     color=OK).move_to(P(3.4, 2.2))
        faces = VGroup(*[die_face(n) for n in range(1, 7)]).arrange(RIGHT, buff=0.3).move_to(P(0.4, 0.2))
        lose = M(r"X = -10", 40, color=YV).move_to(P(-0.8, -2.2))
        win = M(r"X = +20", 40, color=XV).move_to(P(3.6, -2.2))
        arr = VGroup(*[Arrow(faces[i].get_bottom(), lose.get_top(), buff=0.1, stroke_width=2.5, color=YV,
                             max_tip_length_to_length_ratio=0.1) for i in range(5)],
                     Arrow(faces[5].get_bottom(), win.get_top(), buff=0.1, stroke_width=2.5, color=XV,
                           max_tip_length_to_length_ratio=0.1))
        plab = T("profit at the stall (Rs)", 24, color=MUTED).move_to(P(-4.6, 0.2))

        with self.voiceover("A random variable is not an unknown waiting to be solved for, and its rule is not "
                            "random. The rule is fixed. The randomness lives in which outcome occurs. Values "
                            "can be negative, too. At the stall, your profit is twenty rupees if you roll a "
                            "six, and minus ten rupees otherwise. Six outcomes, two values.") as vo:
            self.play(FadeOut(VGroup(col, slab, dgrp, rlab, arrows, defn)), run_time=0.5)
            self.play(FadeIn(myth), run_time=0.6)
            self.play(Create(cross_out(myth)), run_time=0.5)
            self.play(FadeIn(truth, shift=0.2 * UP), run_time=0.7)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(FadeIn(faces), FadeIn(plab), run_time=0.7)
            self.play(LaggedStart(*[GrowArrow(a) for a in arr], lag_ratio=0.12), FadeIn(lose), FadeIn(win),
                      run_time=1.5)

    # ------------------------------------------------------------ scene 2: distributions and the CDF
    def s2(self):
        hd = header("4.2 · Probability distributions")
        ax = chart((-0.7, 3.7), 0.5, 6.0, 4.0).move_to(P(-3.2, -0.3))
        b = bars(ax, HEADS, HEADS_P)
        xn = xnums(ax, HEADS)
        xl = T("X = number of heads", 22, color=MUTED).next_to(xn, DOWN, buff=0.2)
        plabs = VGroup(*[M(t, 32, color=XV).next_to(r, UP, buff=0.12) for t, r in zip(HEADS_TEX, b)])
        pmf = VGroup(*[M(rf"P(X = {v}) = {t}", 36) for v, t in zip(HEADS, HEADS_TEX)]).arrange(
            DOWN, aligned_edge=LEFT, buff=0.3).move_to(P(3.7, 1.0))
        tot = M(r"\text{total} = \tfrac{8}{8} = 1", 40, color=HL).next_to(pmf, DOWN, buff=0.5)

        with self.voiceover("Now group the outcomes by value. Zero heads: one outcome. One head: three. Two "
                            "heads: three. Three heads: one. Divide by eight and you have the distribution, "
                            "the probability mass function: every value with its probability. Drawn as bars, "
                            "the heights add up to one.") as vo:
            self.play(FadeIn(hd), Create(ax), FadeIn(xn), FadeIn(xl), run_time=0.9)
            self.wait(max(0.1, vo.duration * 0.08))
            for i in range(4):
                self.play(GrowFromEdge(b[i], DOWN), FadeIn(plabs[i]), FadeIn(pmf[i]), run_time=0.7)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(Write(tot), run_time=0.8)

        rules = VGroup(card(M(r"p_i \ge 0", 42), color=PURPLE), card(M(r"\sum p_i = 1", 42), color=PURPLE)
                       ).arrange(RIGHT, buff=1.2).move_to(P(0, 2.2))
        q1 = M(r"10k^2 + 9k - 1 = 0", 42).move_to(P(0, 0.7))
        q2 = M(r"(10k - 1)(k + 1) = 0", 42).move_to(P(0, -0.3))
        good = M(r"k = \tfrac{1}{10}", 46, color=OK).move_to(P(-2.4, -1.6))
        bad = M(r"k = -1", 46, color=WARN).move_to(P(2.4, -1.6))
        why = T("would make a probability negative", 24, color=WARN).next_to(bad, DOWN, buff=0.3)

        with self.voiceover("So a distribution is not just any list of numbers. Every probability is at least "
                            "zero, and together they sum to exactly one. If a table contains an unknown k, "
                            "those two rules find it. Here the sum gives a quadratic, with roots one tenth and "
                            "minus one. Minus one is thrown out, because it would make a probability "
                            "negative.") as vo:
            self.play(FadeOut(VGroup(ax, b, xn, xl, plabs, pmf, tot)), run_time=0.5)
            self.play(FadeIn(rules[0], shift=0.2 * UP), run_time=0.6)
            self.play(FadeIn(rules[1], shift=0.2 * UP), run_time=0.6)
            self.wait(max(0.1, vo.duration * 0.2))
            self.play(Write(q1), run_time=0.9)
            self.play(Write(q2), run_time=0.9)
            self.play(FadeIn(good), FadeIn(bad), run_time=0.6)
            self.wait(max(0.1, vo.duration * 0.05))
            xbad = cross_out(bad)
            self.play(Create(xbad), FadeIn(why), run_time=0.7)

        cx = Axes(x_range=[-1, 4.5, 1], y_range=[0, 1.1, 0.25], x_length=7.5, y_length=4.4,
                  axis_config={"color": INK, "stroke_width": 2, "include_tip": False},
                  x_axis_config={"include_ticks": False}, y_axis_config={"include_ticks": False})
        cx.move_to(P(-2.3, -0.4))
        left_y_axis(cx, -1)
        cxn = xnums(cx, HEADS)
        ytk = VGroup(*[M(t, 26).next_to(cx.c2p(-1, v), LEFT, buff=0.15)
                       for t, v in ((r"\tfrac12", 0.5), (r"1", 1.0))])
        grid = VGroup(*[DashedLine(cx.c2p(-1, v), cx.c2p(4.5, v), color=GRID, stroke_width=1.5) for v in (0.5, 1.0)])
        levels = [0, 1 / 8, 4 / 8, 7 / 8, 1]
        edges = [-1, 0, 1, 2, 3, 4.5]
        steps = VGroup(*[Line(cx.c2p(edges[i], levels[i]), cx.c2p(edges[i + 1], levels[i]), color=HL,
                              stroke_width=5) for i in range(5)])
        jumps = VGroup(*[DashedLine(cx.c2p(edges[i + 1], levels[i]), cx.c2p(edges[i + 1], levels[i + 1]),
                                    color=XV, stroke_width=3) for i in range(4)])
        sdots = VGroup(*[Dot(cx.c2p(edges[i + 1], levels[i + 1]), color=HL, radius=0.07) for i in range(4)])
        slabs = VGroup(*[M(t, 28, color=HL).next_to(cx.c2p(edges[i + 1] + 0.5, levels[i + 1]), UP, buff=0.12)
                         for i, t in enumerate([r"\tfrac18", r"\tfrac48", r"\tfrac78", r"1"])])
        fdef = card(M(r"F(x) = P(X \le x)", 40), color=HL).move_to(P(4.4, 1.6))
        back = VGroup(T("jumps give the bars back:", 22, color=MUTED),
                      M(r"P(X = x_i) = F(x_i) - F(x_{i-1})", 30, color=XV)).arrange(DOWN, buff=0.2)
        back.move_to(P(4.3, -0.6))

        with self.voiceover("Many questions say, at most. The cumulative distribution function, F of x, is the "
                            "probability that X is at most x. It is a running total of the bars, so it climbs "
                            "as a staircase from zero to one, jumping at each value by exactly that bar's "
                            "height. Take differences of the staircase and you get the bars back.") as vo:
            self.play(FadeOut(VGroup(rules, q1, q2, good, bad, why, xbad)), run_time=0.5)
            self.play(Create(cx), FadeIn(cxn), FadeIn(ytk), FadeIn(grid), FadeIn(fdef), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(Create(steps[0]), run_time=0.4)
            for i in range(4):
                self.play(Create(jumps[i]), FadeIn(sdots[i]), run_time=0.35)
                self.play(Create(steps[i + 1]), FadeIn(slabs[i]), run_time=0.45)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(FadeIn(back, shift=0.2 * UP), *[Indicate(j, color=XV) for j in jumps], run_time=1.0)

    # ------------------------------------------------------------ scene 3: expectation
    def s3(self):
        hd = header("4.3 · Expectation: the balance point")
        ax = chart((0.3, 6.7), 0.3, 7.0, 3.4).move_to(P(-2.6, -0.5))
        vals = [1, 2, 3, 4, 5, 6]
        b = bars(ax, vals, [1 / 6] * 6)
        xn = xnums(ax, vals)
        ptxt = M(r"\text{each } \tfrac16", 30, color=XV).next_to(b, UP, buff=0.2)
        edef = card(M(r"E[X] = \sum x_i\, p_i", 44), color=HL).move_to(P(4.3, 2.2))
        calc = M(r"E[X] = \frac{1 + 2 + 3 + 4 + 5 + 6}{6} = \frac{21}{6} = 3.5", 38).move_to(P(0, -3.25))

        with self.voiceover("What is X worth on average? Roll a die many times and average the scores. Each "
                            "face turns up about a sixth of the time, so the long run average is one times a "
                            "sixth, plus two times a sixth, and so on up to six. That is twenty one over six, "
                            "three point five. In general the expectation, E of X, is the sum of each value "
                            "times its probability.") as vo:
            self.play(FadeIn(hd), Create(ax), FadeIn(xn), run_time=0.9)
            self.play(LaggedStart(*[GrowFromEdge(r, DOWN) for r in b], lag_ratio=0.1), FadeIn(ptxt), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(Write(calc), run_time=1.6)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(FadeIn(edef, shift=0.2 * UP), run_time=0.8)

        tip = ax.c2p(3.5, 0)
        fulcrum = Triangle(color=HL, stroke_width=2).set_fill(HL, opacity=1).scale(0.22)
        fulcrum.move_to(tip + DOWN * 0.19)
        beam = Line(ax.c2p(0.3, 0), ax.c2p(6.7, 0), color=INK, stroke_width=5)
        mline = DashedLine(ax.c2p(3.5, 0), ax.c2p(3.5, 0.3), color=HL, stroke_width=3)
        mlab = M(r"3.5", 34, color=HL).next_to(mline, UP, buff=0.1)
        myth = card(T("\"expected = most likely\"", 24, color=WARN), color=WARN).move_to(P(4.4, 0.6))
        fact = card(VGroup(T("A die never shows 3.5.", 24, color=OK),
                           T("E[X] need not be possible.", 24, color=OK)).arrange(DOWN, buff=0.1),
                    color=OK).move_to(P(4.4, -1.0))

        with self.voiceover("Picture the bars as weights on a see saw. The expectation is where it balances: "
                            "the centre of mass. And notice, a die never shows three point five. The expected "
                            "value is not the most likely value. It need not even be a possible "
                            "value.") as vo:
            self.play(FadeOut(edef), FadeOut(ptxt), run_time=0.4)
            self.play(Create(beam), FadeIn(fulcrum, shift=0.2 * UP), run_time=0.8)
            self.play(Create(mline), FadeIn(mlab), run_time=0.7)
            self.play(Wiggle(VGroup(beam, b), scale_value=1.02, rotation_angle=0.02 * TAU), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(FadeIn(myth), run_time=0.6)
            xmyth = cross_out(myth)
            self.play(Create(xmyth), FadeIn(fact, shift=0.2 * UP), run_time=0.8)

        rows = VGroup(M(r"X = +20 \quad \text{with } p = \tfrac16", 40, color=XV),
                      M(r"X = -10 \quad \text{with } p = \tfrac56", 40, color=YV)).arrange(
            DOWN, aligned_edge=LEFT, buff=0.35).move_to(P(0, 2.0))
        e1 = M(r"E[X] = 20 \cdot \tfrac16 + (-10) \cdot \tfrac56 = \frac{20 - 50}{6} = -5", 42).move_to(P(0, 0.4))
        lose = T("About Rs 5 lost per game: Rs 3000 over 600 games.", 28, color=WARN).move_to(P(0, -0.8))
        fair = card(VGroup(T("Fair game: expected profit = 0", 28, color=OK),
                           T("Fair fee here: Rs 5", 28, color=OK)).arrange(DOWN, buff=0.15),
                    color=OK).move_to(P(0, -2.4))

        with self.voiceover("Back to the stall. Profit is twenty rupees with probability one sixth, and minus "
                            "ten with probability five sixths. The expectation is twenty minus fifty, over six: "
                            "minus five. You lose about five rupees a game, three thousand over six hundred "
                            "games. A fair game has expected profit zero. Here the fair fee would be five "
                            "rupees.") as vo:
            self.play(FadeOut(VGroup(ax, b, xn, calc, beam, fulcrum, mline, mlab, myth, fact, xmyth)),
                      run_time=0.5)
            self.play(FadeIn(rows, lag_ratio=0.3), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(Write(e1), run_time=1.6)
            self.play(FadeIn(lose), run_time=0.7)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(FadeIn(fair, shift=0.2 * UP), run_time=0.8)

    # ------------------------------------------------------------ scene 4: variance
    def s4(self):
        hd = header("4.4 · Variance and standard deviation")
        axl = chart((0.3, 5.7), 0.6, 5.0, 3.0).move_to(P(-3.4, -0.2))
        axr = chart((0.3, 5.7), 0.6, 5.0, 3.0).move_to(P(3.4, -0.2))
        bl = bars(axl, [2, 3, 4], [0.25, 0.5, 0.25], color=YV)
        br = bars(axr, [1, 3, 5], [0.45, 0.1, 0.45], color=XV)
        nl = xnums(axl, [1, 2, 3, 4, 5])
        nr = xnums(axr, [1, 2, 3, 4, 5])
        ml = DashedLine(axl.c2p(3, 0), axl.c2p(3, 0.6), color=HL, stroke_width=3)
        mr = DashedLine(axr.c2p(3, 0), axr.c2p(3, 0.6), color=HL, stroke_width=3)
        mu = VGroup(M(r"\mu = 3", 30, color=HL).next_to(ml, UP, buff=0.1),
                    M(r"\mu = 3", 30, color=HL).next_to(mr, UP, buff=0.1))
        vl = M(r"\mathrm{Var} = 0.5", 34, color=YV).move_to(P(-3.4, 2.35))
        vr = M(r"\mathrm{Var} = 3.6", 34, color=XV).move_to(P(3.4, 2.35))
        vdef = card(M(r"\mathrm{Var}(X) = E\big[(X - \mu)^2\big], \qquad \sigma = \sqrt{\mathrm{Var}(X)}", 38),
                    color=HL).move_to(P(0, -2.95))

        with self.voiceover("Two distributions can share a mean and still be very different. Both of these "
                            "balance at three. One hugs the centre, the other throws its weight to the ends. To "
                            "measure spread, take each value's distance from the mean, square it, and average. "
                            "That is the variance. Its square root, the standard deviation sigma, is back in "
                            "the original units.") as vo:
            self.play(FadeIn(hd), Create(axl), Create(axr), FadeIn(nl), FadeIn(nr), run_time=0.9)
            self.play(GrowFromEdge(bl, DOWN), GrowFromEdge(br, DOWN), run_time=0.9)
            self.play(Create(ml), Create(mr), FadeIn(mu), run_time=0.7)
            self.wait(max(0.1, vo.duration * 0.2))
            self.play(Write(vdef), run_time=1.4)
            self.play(FadeIn(vl), FadeIn(vr), run_time=0.7)

        d = VGroup(
            M(r"E\big[(X-\mu)^2\big] = E[X^2] - 2\mu E[X] + \mu^2", 40),
            M(r"\mathrm{Var}(X) = E[X^2] - \mu^2", 46, color=HL),
            M(r"\text{die:}\quad E[X^2] = \tfrac{91}{6}, \quad \mu^2 = \tfrac{49}{4}", 38),
            M(r"\mathrm{Var}(X) = \tfrac{91}{6} - \tfrac{49}{4} = \tfrac{35}{12} \approx 2.92,"
              r"\quad \sigma \approx 1.71", 38, color=XV),
        ).arrange(DOWN, buff=0.45).move_to(P(0, -0.1))

        with self.voiceover("Expanding the square gives a shortcut: the mean of X squared, minus the mean "
                            "squared. For a die, the mean of X squared is ninety one over six, and the mean "
                            "squared is forty nine over four. So the variance is thirty five over twelve, about "
                            "two point nine two, and the standard deviation is about one point seven.") as vo:
            self.play(FadeOut(VGroup(axl, axr, bl, br, nl, nr, ml, mr, mu, vl, vr, vdef)), run_time=0.5)
            self.play(Write(d[0]), run_time=1.2)
            self.play(Write(d[1]), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(Write(d[2]), run_time=1.0)
            self.play(Write(d[3]), run_time=1.2)

        ax = chart((-0.7, 9.7), 0.5, 9.0, 2.6).move_to(P(-1.4, 0.3))
        unit = ax.c2p(1, 0)[0] - ax.c2p(0, 0)[0]
        b = bars(ax, HEADS, HEADS_P)
        xn = xnums(ax, list(range(0, 10)), 26)
        cap = T("X: heads in 3 tosses", 26, color=XV).move_to(P(0, 2.5))
        cap2 = T("X + 5: slides over, same spread", 26, color=YV).move_to(P(0, 2.5))
        cap3 = T("2X: every distance doubles, variance times 4", 26, color=PURPLE).move_to(P(0, 2.5))
        b2 = bars(ax, [0, 2, 4, 6], HEADS_P, color=PURPLE)
        rule = card(M(r"\mathrm{Var}(aX + b) = a^2\, \mathrm{Var}(X)", 40), color=OK).move_to(P(-3.3, -2.0))
        wrong = M(r"a\,\mathrm{Var}(X) + b", 40, color=WARN).move_to(P(3.3, -2.0))
        temp = T("Celsius to Fahrenheit, F = 1.8C + 32:  SD 5 becomes 9.", 26, color=MUTED).move_to(P(0, -3.3))

        with self.voiceover("What does a change of units do to spread? Adding b slides every bar sideways, so "
                            "no distance changes. Multiplying by a stretches every distance by a, so the "
                            "variance grows by a squared. The variance of a X plus b is a squared times the "
                            "variance of X. Not a times the variance plus b. So Celsius to Fahrenheit turns a "
                            "standard deviation of five degrees into nine.") as vo:
            self.play(FadeOut(d), run_time=0.5)
            self.play(Create(ax), FadeIn(xn), FadeIn(b), FadeIn(cap), run_time=0.9)
            self.play(b.animate.shift(5 * unit * RIGHT).set_fill(YV, opacity=0.8), Transform(cap, cap2), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.08))
            self.play(Transform(b, b2), Transform(cap, cap3), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.08))
            self.play(FadeIn(rule, shift=0.2 * UP), run_time=0.8)
            self.play(FadeIn(wrong), run_time=0.5)
            self.play(Create(cross_out(wrong)), run_time=0.5)
            self.play(FadeIn(temp), run_time=0.6)

    # ------------------------------------------------------------ scene 5: linearity and indicators
    def s5(self):
        hd = header("4.5 · Linearity and indicator variables")
        lin = M(r"E[X + Y] = E[X] + E[Y]", 54).move_to(P(0, 2.1))
        always = card(T("Always. Even when X and Y are dependent.", 28, color=OK), color=OK).move_to(P(0, 0.8))
        ind = M(r"I_A = \begin{cases} 1 & \text{if } A \text{ happens} \\ 0 & \text{if not} \end{cases}", 40)
        ind.move_to(P(-3.2, -1.5))
        ei = M(r"E[I_A] = 1 \cdot P(A) + 0 = P(A)", 40, color=XV).move_to(P(3.3, -1.5))

        with self.voiceover("Now the strongest tool in the chapter. The expectation of a sum is the sum of the "
                            "expectations. Always, even when the variables depend on each other. Pair it with "
                            "indicator variables, which are one if something happens and zero if not. An "
                            "indicator's expectation is just the probability of its event.") as vo:
            self.play(FadeIn(hd), Write(lin), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(FadeIn(always, shift=0.2 * UP), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(Write(ind), run_time=1.2)
            self.play(Write(ei), run_time=1.0)

        envs = VGroup()
        letters = [3, 2, 4, 1]  # one shuffled arrangement: only letter 2 is in its own envelope
        for k in range(4):
            e = Rectangle(width=1.3, height=0.85, color=MUTED, stroke_width=2).set_fill(WHITE, opacity=1)
            flap = VMobject(color=MUTED, stroke_width=2).set_points_as_corners(
                [e.get_corner(UL), e.get_center() + 0.05 * DOWN, e.get_corner(UR)])
            lab = T(f"env {k + 1}", 18, color=MUTED).next_to(e, DOWN, buff=0.1)
            envs.add(VGroup(e, flap, lab))
        envs.arrange(RIGHT, buff=0.6).move_to(P(0, 2.2))
        lets = VGroup()
        for k, L in enumerate(letters):
            ok = L == k + 1
            c = Circle(radius=0.26, color=OK if ok else YV, stroke_width=2).set_fill(OK if ok else YV, opacity=1)
            lets.add(VGroup(c, T(str(L), 22, color=WHITE, weight="BOLD").move_to(c)))
        for k in range(4):
            lets[k].move_to(envs[k][0].get_center() + 0.1 * UP)
        xs = M(r"X = I_1 + I_2 + \cdots + I_n", 42).move_to(P(0, 0.5))
        ex = M(r"E[X] = \underbrace{\tfrac1n + \tfrac1n + \cdots + \tfrac1n}_{n\ \text{terms}} = 1", 44, color=HL)
        ex.move_to(P(0, -0.9))
        note = card(T("Dependent indicators. Still exactly 1, for any n.", 26, color=OK), color=OK).move_to(P(0, -2.6))

        with self.voiceover("n letters go into n envelopes at random. How many land in their own envelope, on "
                            "average? Let I k be one if letter k lands in envelope k. Each has probability one "
                            "over n. Add n of them, and the expected number of matches is exactly one, for any "
                            "n. The indicators depend on each other, and linearity does not care.") as vo:
            self.play(FadeOut(VGroup(lin, always, ind, ei)), run_time=0.5)
            self.play(FadeIn(envs), run_time=0.6)
            self.play(LaggedStart(*[FadeIn(l, shift=0.4 * DOWN) for l in lets], lag_ratio=0.2), run_time=1.0)
            self.play(Indicate(lets[1], color=OK, scale_factor=1.3), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.08))
            self.play(Write(xs), run_time=1.0)
            self.play(Write(ex), run_time=1.4)
            self.wait(max(0.1, vo.duration * 0.08))
            self.play(FadeIn(note, shift=0.2 * UP), run_time=0.7)

        v = M(r"\mathrm{Var}(X + Y) = \mathrm{Var}(X) + \mathrm{Var}(Y)", 46).move_to(P(0, 2.2))
        only = T("only when X and Y are independent", 28, color=HL).next_to(v, DOWN, buff=0.3)
        eg1 = M(r"X = \text{heads},\ Y = \text{tails in 3 tosses:}\quad \mathrm{Var}(X) = \mathrm{Var}(Y) = 0.75",
                36).move_to(P(0, 0.2))
        eg2 = M(r"X + Y = 3 \text{ always} \;\Rightarrow\; \mathrm{Var}(X + Y) = 0 \ne 1.5", 38, color=WARN)
        eg2.move_to(P(0, -0.8))
        sums = VGroup(card(T("Linearity of E: needs nothing", 26, color=OK), color=OK),
                      card(T("Adding variances: needs independence", 26, color=HL), color=HL)
                      ).arrange(RIGHT, buff=0.5).move_to(P(0, -2.4))

        with self.voiceover("Variance is different. Variances add only when the variables are independent. "
                            "Heads and tails in three tosses each have variance zero point seven five. But "
                            "heads plus tails is always three, with variance zero, not one point five. "
                            "Linearity of expectation needs nothing. Adding variances needs "
                            "independence.") as vo:
            self.play(FadeOut(VGroup(envs, lets, xs, ex, note)), run_time=0.5)
            self.play(Write(v), run_time=1.2)
            self.play(FadeIn(only), run_time=0.6)
            self.wait(max(0.1, vo.duration * 0.05))
            self.play(Write(eg1), run_time=1.2)
            self.play(Write(eg2), run_time=1.2)
            self.play(FadeIn(sums, shift=0.2 * UP), run_time=0.8)

    # ------------------------------------------------------------ scene 6: recap
    def s6(self):
        title = T("Chapter 4 in five lines", 40, weight="BOLD", color=PRIMARY).move_to(P(0, 3.1))
        lines = [
            ("A random variable is a fixed rule: outcome in, number out.", XV),
            ("A distribution: probabilities never negative, summing to 1. F is the running total.", YV),
            ("E[X] is the balance point, not the most likely value.", HL),
            ("Var = E[X²] − μ². Shifting adds nothing; scaling by a multiplies it by a².", PURPLE),
            ("E of a sum = sum of E's, always. Indicators make hard counts easy.", OK),
        ]
        rows = VGroup()
        for i, (s, c) in enumerate(lines, start=1):
            num = Circle(radius=0.24, color=c, stroke_width=2).set_fill(c, opacity=1)
            num = VGroup(num, T(str(i), 22, color=WHITE, weight="BOLD").move_to(num))
            rows.add(VGroup(num, T(s, 24)).arrange(RIGHT, buff=0.3))
        rows.arrange(DOWN, aligned_edge=LEFT, buff=0.38).move_to(P(0, 0.0))
        if rows.width > config.frame_width - 0.8:
            rows.scale_to_fit_width(config.frame_width - 0.8)
        foot = T("Next: 4.6 · Chapter 4 Mastery", 26, color=MUTED).move_to(P(0, -3.2))
        with self.voiceover("Chapter four in five lines. A random variable is a fixed rule that turns outcomes "
                            "into numbers. Its distribution lists probabilities that are never negative and add "
                            "to one, and the CDF is their running total. Expectation is the balance point, not "
                            "the most likely value. Variance is the mean of the squares minus the square of the "
                            "mean. Shifting leaves it alone, and scaling squares the factor. And expectation is "
                            "linear, always, which with indicators makes hard counts easy. Now test yourself in "
                            "the mastery lesson.") as vo:
            self.play(FadeIn(title), run_time=0.6)
            per = max(0.3, (vo.duration - 2.0) / 6)
            for r in rows:
                self.play(FadeIn(r, shift=0.2 * RIGHT), run_time=0.6)
                self.wait(max(0.1, per - 0.6))
            self.play(FadeIn(foot), run_time=0.6)
