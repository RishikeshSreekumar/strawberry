import sys
from math import comb, exp, factorial
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

# Chapter colour roles (light background), matching the earlier Probability chapters.
SUC = PRIMARY  # success = strawberry red
FAIL = MUTED  # failure = grey
PAR = SECONDARY  # parameters p, q and model names = teal
HL = ManimColor("#D19A00")  # results, means, highlights (gold)
LAW = PURPLE
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


def fixed_card(mob, w, h, color=MUTED):
    box = RoundedRectangle(width=w, height=h, corner_radius=0.15, color=color, stroke_width=2)
    box.set_fill(WHITE, opacity=0.9)
    mob.move_to(box)
    return VGroup(box, mob)


def cross_out(mob):
    return VGroup(
        Line(mob.get_corner(UL), mob.get_corner(DR), color=WARN, stroke_width=5),
        Line(mob.get_corner(DL), mob.get_corner(UR), color=WARN, stroke_width=5),
    )


def header(s):
    return T(s, 28, weight="BOLD", color=MUTED).to_corner(UL, buff=0.4)


def chart(xr, ymax, xl, yl):
    return Axes(x_range=[xr[0], xr[1], 1], y_range=[0, ymax, ymax], x_length=xl, y_length=yl,
                axis_config={"color": INK, "stroke_width": 2, "include_tip": False},
                x_axis_config={"include_ticks": False}, y_axis_config={"include_ticks": False})


def bars(ax, values, probs, color=SUC, width=0.6, opacity=0.8):
    unit = ax.c2p(1, 0)[0] - ax.c2p(0, 0)[0]
    g = VGroup()
    for v, p in zip(values, probs):
        h = max(ax.c2p(0, p)[1] - ax.c2p(0, 0)[1], 0.001)
        r = Rectangle(width=width * unit, height=h, stroke_width=0).set_fill(color, opacity=opacity)
        r.move_to(ax.c2p(v, 0), aligned_edge=DOWN)
        g.add(r)
    return g


def xnums(ax, values, size=26):
    return VGroup(*[M(str(v), size).next_to(ax.c2p(v, 0), DOWN, buff=0.15) for v in values])


def binom_pmf(n, p, ks):
    return [comb(n, k) * p ** k * (1 - p) ** (n - k) for k in ks]


def wedge(ax, x, color=HL):
    tip = ax.c2p(x, 0) + P(0, -0.05)
    tri = Triangle(color=color, fill_opacity=1, stroke_width=0).scale(0.14)
    tri.move_to(tip + P(0, -0.2))
    return tri


def node(pos, color=INK, r=0.07):
    return Dot(pos, radius=r, color=color)


class PrCh5Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Probability",
            "Chapter 5 · Bernoulli Trials and the Binomial Distribution",
            "Chapter five. Bernoulli trials and the binomial distribution.",
        )
        for part in (self.s0, self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ hook
    def s0(self):
        stories = ["10 free throws", "20 bulbs tested", "8 true/false guesses", "5 rolls: a six or not?"]
        cards = VGroup(*[fixed_card(T(s, 30), 5.2, 1.2, color=PAR) for s in stories])
        cards.arrange_in_grid(rows=2, cols=2, buff=(0.5, 0.35)).move_to(P(0, 1.5))
        seq = "SFSSFFSFSF"
        circles = VGroup()
        for ch in seq:
            c = Circle(radius=0.32, color=SUC if ch == "S" else FAIL, stroke_width=3)
            c.set_fill(SUC if ch == "S" else FAIL, opacity=0.2)
            circles.add(VGroup(c, T(ch, 26, weight="BOLD", color=SUC if ch == "S" else FAIL).move_to(c)))
        circles.arrange(RIGHT, buff=0.25).move_to(P(0, -1.4))
        cap = T("fixed n   ·   yes or no", 32, weight="BOLD", color=HL).move_to(P(0, -2.7))

        with self.voiceover("A player takes ten free throws. A factory tests twenty bulbs. You guess eight true or "
                            "false answers. A die is rolled five times, and you only care about sixes.") as vo:
            for c in cards:
                self.play(FadeIn(c, shift=0.2 * UP), run_time=min(0.8, vo.duration / 5))
                self.wait(max(0.1, vo.duration * 0.12))
        with self.voiceover("Different stories, one skeleton. Something is repeated a fixed number of times, and "
                            "each time you record only yes or no. That skeleton has its own distribution, and this "
                            "chapter builds it.") as vo:
            self.play(LaggedStart(*[FadeIn(c, scale=0.6) for c in circles], lag_ratio=0.25), run_time=3.0)
            self.play(FadeIn(cap, shift=0.2 * UP), run_time=0.8)

    # ------------------------------------------------------------ 5.1 Bernoulli trials
    def s1(self):
        hd = header("5.1 · Bernoulli trials")
        rows = VGroup(
            T("1.  A fixed number of trials, n", 34),
            T("2.  Two outcomes: success or failure", 34),
            T("3.  The same p every trial  (q = 1 − p)", 34, color=PAR),
            T("4.  Trials are independent", 34),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.45).move_to(P(0, 0))

        with self.voiceover("Four conditions make Bernoulli trials. A fixed number of trials, n. Two outcomes each "
                            "time, success and failure. The same success probability p on every trial, with q "
                            "equal to one minus p. And independence: no trial changes another.") as vo:
            self.play(FadeIn(hd), run_time=0.5)
            for r in rows:
                self.play(FadeIn(r, shift=0.2 * RIGHT), run_time=0.6)
                self.wait(max(0.1, vo.duration * 0.14))

        left = VGroup(T("Without replacement", 30, weight="BOLD"),
                      M(r"\tfrac{4}{52},\ \text{then } \tfrac{3}{51} \text{ or } \tfrac{4}{51}", 40),
                      T("not Bernoulli", 28, color=WARN, weight="BOLD")).arrange(DOWN, buff=0.4)
        right = VGroup(T("With replacement", 30, weight="BOLD"),
                       M(r"\tfrac{4}{52} \text{ every draw}", 40),
                       T("Bernoulli", 28, color=OK, weight="BOLD")).arrange(DOWN, buff=0.4)
        lc = fixed_card(left, 5.6, 3.0, color=WARN).move_to(P(-3.2, -0.2))
        rc = fixed_card(right, 5.6, 3.0, color=OK).move_to(P(3.2, -0.2))

        with self.voiceover("Here is the trap. Drawing cards without replacement feels like the same draw repeated, "
                            "but it is not. The first ace has chance four over fifty two. The next is three over "
                            "fifty one, or four over fifty one, depending on the first. Put the card back, and the "
                            "trials are Bernoulli again.") as vo:
            self.play(FadeOut(rows), run_time=0.5)
            self.play(FadeIn(lc, shift=0.2 * UP), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.45))
            self.play(Indicate(left[2], color=WARN), run_time=0.6)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(FadeIn(rc, shift=0.2 * UP), run_time=0.8)

        table = M(r"\begin{array}{c|cc} x & 0 & 1 \\ \hline P(X=x) & q & p \end{array}", 44).move_to(P(0, 1.6))
        e1 = M(r"E[X] = 0\cdot q + 1\cdot p = p", 42).move_to(P(0, 0.0))
        e2 = M(r"\operatorname{Var}(X) = p - p^2 = pq", 42).move_to(P(0, -1.2))
        note = M(r"\text{largest, } \tfrac14, \text{ at } p = \tfrac12", 38, color=HL).move_to(P(0, -2.5))

        with self.voiceover("One trial gives the Bernoulli variable: X is one on success and zero on failure. Its "
                            "mean is p. Its variance is p minus p squared, which is p times q. That is largest, "
                            "one quarter, when p is one half.") as vo:
            self.play(FadeOut(lc), FadeOut(rc), run_time=0.5)
            self.play(FadeIn(table), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.2))
            self.play(Write(e1), run_time=1.0)
            self.play(Write(e2), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(FadeIn(note), run_time=0.6)

    # ------------------------------------------------------------ 5.2 binomial formula
    def s2(self):
        hd = header("5.2 · The binomial formula")
        root = P(-6.0, -0.3)
        xs = [-4.3, -2.6, -0.9]
        gaps = [1.6, 0.8, 0.4]
        edges = VGroup()
        e1lab = VGroup()
        leaves = []
        level = [(root, "")]
        for d in range(3):
            nxt = []
            for pos, path in level:
                for ch, sgn in (("S", 1), ("F", -1)):
                    q = P(xs[d], pos[1] + sgn * gaps[d])
                    edges.add(Line(pos, q, color=SUC if ch == "S" else FAIL, stroke_width=3))
                    if d == 0:
                        lab = M("0.6" if ch == "S" else "0.4", 28, color=SUC if ch == "S" else FAIL)
                        lab.move_to((pos + q) / 2 + P(-0.35, 0.3 * sgn))
                        e1lab.add(lab)
                    nxt.append((q, path + ch))
            level = nxt
        leaf_labels = VGroup()
        for pos, path in level:
            leaf_labels.add(T(path, 22, color=INK).next_to(pos, RIGHT, buff=0.15))
            leaves.append(path)
        rdot = node(root)
        two = [i for i, pth in enumerate(leaves) if pth.count("S") == 2]
        boxes = VGroup(*[SurroundingRectangle(leaf_labels[i], color=HL, buff=0.07, stroke_width=3) for i in two])
        prods = VGroup(*[M("0.144", 26, color=HL).next_to(leaf_labels[i], RIGHT, buff=0.3) for i in two])

        with self.voiceover("A striker scores each penalty with probability zero point six. She takes three. What "
                            "is the chance of exactly two goals? Draw every way it can go: three kicks, eight "
                            "paths.") as vo:
            self.play(FadeIn(hd), FadeIn(rdot), run_time=0.5)
            self.play(Create(edges[:2]), FadeIn(e1lab), run_time=0.8)
            self.play(Create(edges[2:6]), run_time=0.8)
            self.play(Create(edges[6:]), run_time=0.8)
            self.play(FadeIn(leaf_labels, lag_ratio=0.1), run_time=0.8)

        r1 = M(r"P(SSF) = (0.6)^2(0.4) = 0.144", 32).move_to(P(4.3, 2.2))
        with self.voiceover("Three paths have exactly two goals: S S F, S F S, and F S S. Multiply along each one. "
                            "Every one gives zero point six squared, times zero point four: zero point one four "
                            "four. Where the goals fall does not matter. Only how many.") as vo:
            self.play(LaggedStart(*[Create(b) for b in boxes], lag_ratio=0.3), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.2))
            self.play(Write(r1), run_time=1.2)
            self.play(FadeIn(prods, lag_ratio=0.3), run_time=1.0)

        r2 = M(r"\binom{3}{2} = 3 \text{ paths}", 34).move_to(P(4.3, 0.8))
        r3 = M(r"P(X=2) = 3 \times 0.144 = 0.432", 34, color=HL).move_to(P(4.3, -0.6))
        with self.voiceover("How many such paths are there? Choose which two of the three kicks score. Three choose "
                            "two, which is three. Add them up: three times zero point one four four, which is zero "
                            "point four three two.") as vo:
            self.wait(max(0.1, vo.duration * 0.2))
            self.play(Write(r2), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(Write(r3), run_time=1.2)
            self.play(Circumscribe(r3, color=HL), run_time=0.8)

        gen = MathTex(r"P(X=k)", r"=", r"\binom{n}{k}", r"\,p^k q^{n-k}", font_size=60).move_to(P(0, 1.4))
        b1 = Brace(gen[2], DOWN, color=PAR)
        b1t = T("number of paths", 24, color=PAR).next_to(b1, DOWN, buff=0.1)
        b2 = Brace(gen[3], DOWN, color=SUC)
        b2t = T("one path", 24, color=SUC).next_to(b2, DOWN, buff=0.1)
        tot = M(r"\sum_{k=0}^{n} \binom{n}{k} p^k q^{n-k} = (q+p)^n = 1", 44, color=LAW).move_to(P(0, -1.6))
        with self.voiceover("Nothing depended on three or two. With n trials, the chance of exactly k successes is "
                            "n choose k, times p to the k, times q to the n minus k. The number of paths, times the "
                            "probability of one path. These terms are exactly the expansion of q plus p, to the "
                            "power n. That is why they add to one, and why the distribution is called "
                            "binomial.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.6)
            self.play(Write(gen), run_time=1.4)
            self.wait(max(0.1, vo.duration * 0.2))
            self.play(GrowFromCenter(b1), FadeIn(b1t), run_time=0.7)
            self.play(GrowFromCenter(b2), FadeIn(b2t), run_time=0.7)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(Write(tot), run_time=1.4)

        q = T("Exactly 2 heads in 4 tosses", 32, weight="BOLD").move_to(P(0, 2.2))
        bad = card(M(r"\left(\tfrac12\right)^4 = \tfrac{1}{16}", 42, color=WARN), pad=0.35, color=WARN)
        bad.move_to(P(-3.2, 0.5))
        good = card(M(r"\binom{4}{2}\left(\tfrac12\right)^4 = \tfrac{6}{16} = \tfrac38", 42, color=OK),
                    pad=0.35, color=OK).move_to(P(2.6, 0.5))
        bx = cross_out(bad).set_stroke(width=3, opacity=0.6)
        one = T("one arrangement", 24, color=WARN).next_to(bad, DOWN, buff=0.2)
        six = T("six arrangements", 24, color=OK).next_to(good, DOWN, buff=0.2)
        atl = M(r"P(X \ge 1) = 1 - q^n", 46, color=HL).move_to(P(0, -2.3))
        with self.voiceover("The classic slip. Exactly two heads in four tosses is not one sixteenth. That is one "
                            "arrangement. There are six, so the answer is six sixteenths, three eighths. And for at "
                            "least one success, use the complement: one minus q to the n.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.6)
            self.play(FadeIn(q), run_time=0.6)
            self.play(FadeIn(bad), run_time=0.7)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(Create(bx), FadeIn(one), run_time=0.6)
            self.play(FadeIn(good), FadeIn(six), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(Write(atl), run_time=1.0)

    # ------------------------------------------------------------ 5.3 shape, mean, variance
    def s3(self):
        hd = header("5.3 · Mean, variance and shape")
        ks = list(range(11))
        ax = chart((-0.7, 10.5), 0.42, 6.8, 3.8).move_to(P(-3.0, -0.4))
        nums = xnums(ax, ks, 24)
        br = bars(ax, ks, binom_pmf(10, 0.3, ks))
        wg = wedge(ax, 3)
        plab = M(r"B(10,\ 0.3)", 36, color=SUC).move_to(ax.c2p(7.5, 0.36))
        m1 = M(r"X = I_1 + I_2 + \cdots + I_n", 36).move_to(P(4.3, 1.8))
        m2 = M(r"E[X] = np = 3", 38, color=HL).move_to(P(4.3, 0.5))
        m3 = M(r"\operatorname{Var}(X) = npq = 2.1", 38).move_to(P(4.3, -0.8))
        m3n = T("independence needed", 22, color=MUTED).next_to(m3, DOWN, buff=0.2)

        with self.voiceover("A player hits thirty percent of her shots and takes ten. You would guess about three. "
                            "Here is why. Write X as a sum of indicators, one per trial, each with mean p. "
                            "Expectations always add, so the mean is n p. The trials are independent, so the "
                            "variances add too, and the variance is n p q.") as vo:
            self.play(FadeIn(hd), Create(ax), FadeIn(nums), run_time=0.8)
            self.play(LaggedStart(*[GrowFromEdge(b, DOWN) for b in br], lag_ratio=0.08), FadeIn(plab),
                      run_time=1.2)
            self.play(FadeIn(wg, shift=0.2 * UP), run_time=0.5)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(Write(m1), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(Write(m2), run_time=0.9)
            self.wait(max(0.1, vo.duration * 0.08))
            self.play(Write(m3), FadeIn(m3n), run_time=0.9)

        br5 = bars(ax, ks, binom_pmf(10, 0.5, ks))
        br1 = bars(ax, ks, binom_pmf(10, 0.1, ks))
        lab5 = M(r"p = 0.5", 36, color=SUC).move_to(plab)
        lab1 = M(r"p = 0.1", 36, color=SUC).move_to(plab)
        sym = T("symmetric", 30, color=PAR, weight="BOLD").move_to(P(4.3, 1.0))
        skew = T("piled left, tail to the right", 28, color=PAR, weight="BOLD").move_to(P(4.3, 1.0))
        spread = M(r"npq \text{ largest at } p = \tfrac12", 34).move_to(P(4.3, -0.5))
        with self.voiceover("Now the shape. At p equal to one half the bars are symmetric. For small p they pile up "
                            "on the left, with a tail to the right. The spread, n p q, is widest at one half.") as vo:
            self.play(FadeOut(VGroup(m1, m2, m3, m3n)), run_time=0.4)
            self.play(Transform(br, br5), Transform(plab, lab5), wg.animate.move_to(wedge(ax, 5)), run_time=1.2)
            self.play(FadeIn(sym), run_time=0.5)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(Transform(br, br1), Transform(plab, lab1), wg.animate.move_to(wedge(ax, 1)),
                      FadeOut(sym), run_time=1.2)
            self.play(FadeIn(skew), run_time=0.5)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(Write(spread), run_time=0.9)

        c1 = M(r"n=5,\ p=\tfrac12:\ \ np = 2.5", 38).move_to(P(0, 2.0))
        c1n = T("not a possible value", 26, color=WARN).next_to(c1, DOWN, buff=0.2)
        c2 = M(r"\text{most likely: largest } k \le (n+1)p", 38, color=PAR).move_to(P(0, 0.3))
        c3 = M(r"\frac{\operatorname{Var}(X)}{E[X]} = \frac{npq}{np} = q", 40, color=LAW).move_to(P(0, -1.3))
        c4 = M(r"E=4,\ \operatorname{Var}=3 \ \Rightarrow\ q=\tfrac34,\ p=\tfrac14,\ n=16", 38,
               color=HL).move_to(P(0, -2.8))
        with self.voiceover("The mean need not be a value you can get: five fair tosses have mean two point five "
                            "heads. The most likely value comes from n plus one, times p. And a favourite exam "
                            "trick: the variance divided by the mean is q. Mean four and variance three give q equal "
                            "to three quarters, so p is one quarter, and n is sixteen.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.6)
            self.play(Write(c1), FadeIn(c1n), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(Write(c2), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(Write(c3), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(Write(c4), run_time=1.2)

    # ------------------------------------------------------------ 5.4 geometric
    def s4(self):
        hd = header("5.4 · Waiting for the first success")
        y0 = 1.9
        xs = [-5.8, -3.4, -1.0, 1.4]
        fnodes = VGroup(*[node(P(x, y0)) for x in xs])
        fedges = VGroup(*[Line(P(xs[i], y0), P(xs[i + 1], y0), color=FAIL, stroke_width=3) for i in range(3)])
        flabs = VGroup(*[M("q", 30, color=FAIL).next_to(fedges[i], UP, buff=0.1) for i in range(3)])
        sedges, slabs, sleaves = VGroup(), VGroup(), VGroup()
        texts = [r"p", r"qp", r"q^2p"]
        for i in range(3):
            a, b = P(xs[i], y0), P(xs[i] + 1.1, y0 - 1.3)
            sedges.add(Line(a, b, color=SUC, stroke_width=3))
            slabs.add(M("p", 30, color=SUC).move_to((a + b) / 2 + P(-0.3, -0.15)))
            lf = VGroup(T(f"S on trial {i + 1}", 20, color=SUC), M(texts[i], 30, color=HL)).arrange(DOWN, buff=0.1)
            lf.next_to(b, DOWN, buff=0.12)
            sleaves.add(lf)
        dots = M(r"\cdots", 40, color=FAIL).next_to(fnodes[-1], RIGHT, buff=0.3)

        with self.voiceover("Change the question. Roll until a six appears. Now the number of trials is not fixed. "
                            "We count how long we wait. The tree is lopsided, because a success ends the story. "
                            "Only the failure branch keeps growing.") as vo:
            self.play(FadeIn(hd), FadeIn(fnodes[0]), run_time=0.5)
            self.wait(max(0.1, vo.duration * 0.25))
            for i in range(3):
                self.play(Create(sedges[i]), FadeIn(slabs[i]), FadeIn(sleaves[i]), Create(fedges[i]),
                          FadeIn(flabs[i]), FadeIn(fnodes[i + 1]), run_time=0.9)
            self.play(FadeIn(dots), run_time=0.4)

        f1 = M(r"P(X=k) = q^{k-1}p", 44, color=LAW).move_to(P(-2.5, -1.7))
        f2 = M(r"P(X>k) = q^{k}", 44, color=HL).move_to(P(3.3, -1.7))
        f1n = T("one path: no nCk", 24, color=MUTED).next_to(f1, DOWN, buff=0.25)
        f2n = T("the first k all failed", 24, color=MUTED).next_to(f2, DOWN, buff=0.25)
        with self.voiceover("First success on trial k means k minus one failures, then one success. That is a single "
                            "path, so there is no n choose k. The probability is q to the k minus one, times p. And "
                            "needing more than k trials means the first k all failed: q to the k.") as vo:
            self.play(Indicate(sleaves[2], color=HL), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.2))
            self.play(Write(f1), FadeIn(f1n), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(Write(f2), FadeIn(f2n), run_time=1.0)

        e1 = M(r"E = p\cdot 1 + q\,(1 + E)", 50).move_to(P(0, 1.3))
        e2 = M(r"E = \frac{1}{p}", 60, color=HL).move_to(P(0, 1.3))
        brk = VGroup(T("done in one", 24, color=SUC), T("used one, start again", 24, color=FAIL))
        en = M(r"\text{a six: } p = \tfrac16 \ \Rightarrow\ 6 \text{ rolls on average}", 38).move_to(P(0, -0.6))
        with self.voiceover("The mean comes from the first step. With probability p you are done in one trial. With "
                            "probability q you have used one trial and face the same problem again. Solve, and the "
                            "expected wait is one over p. Six rolls, on average, to see a six.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.6)
            self.play(Write(e1), run_time=1.2)
            brk[0].next_to(e1, DOWN, buff=0.35).shift(LEFT * 1.4)
            brk[1].next_to(e1, DOWN, buff=0.35).shift(RIGHT * 1.6)
            self.play(FadeIn(brk[0]), run_time=0.5)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(FadeIn(brk[1]), run_time=0.5)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(FadeOut(brk), TransformMatchingTex(e1, e2), run_time=1.2)
            self.play(FadeIn(en), run_time=0.7)

        mem = M(r"P(X > m+n \mid X > m) = \frac{q^{m+n}}{q^m} = q^n = P(X > n)", 42, color=LAW).move_to(P(0, 1.2))
        myth = card(T("\"After 10 misses, a success is due\"", 28, color=WARN), pad=0.3, color=WARN)
        myth.move_to(P(0, -1.0))
        still = M(r"\text{next trial: still } p \qquad \text{remaining wait: still } \tfrac1p", 36,
                  color=HL).move_to(P(0, -2.7))
        with self.voiceover("And the process has no memory. After ten misses, success is still p, and the expected "
                            "remaining wait is still one over p. A success is never due.") as vo:
            self.play(FadeOut(e2), FadeOut(en), run_time=0.5)
            self.play(Write(mem), run_time=1.5)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(FadeIn(myth), run_time=0.6)
            self.play(Create(cross_out(myth)), run_time=0.5)
            self.play(FadeIn(still), run_time=0.8)

    # ------------------------------------------------------------ 5.5 Poisson
    def s5(self):
        hd = header("5.5 · Rare events: Poisson")
        page = RoundedRectangle(width=3.4, height=4.4, corner_radius=0.1, color=MUTED, stroke_width=2)
        page.set_fill(WHITE, opacity=1).move_to(P(-3.6, -0.3))
        rng = np.random.default_rng(5)
        chars = VGroup()
        for r in range(14):
            for c in range(16):
                chars.add(Dot(page.get_corner(UL) + P(0.3 + c * 0.18, -0.35 - r * 0.28), radius=0.035,
                              color=GRID))
        typo_idx = [37, 150]
        typos = VGroup(*[chars[i].copy().set_color(SUC).scale(2.2) for i in typo_idx])
        pm = VGroup(M(r"n \text{ huge}", 42), M(r"p \text{ tiny}", 42),
                    M(r"\lambda = np = 2", 46, color=HL)).arrange(DOWN, buff=0.45).move_to(P(3.0, 0))
        with self.voiceover("A typist makes two typos a page, on average. Every character is a tiny chance of a "
                            "typo. That is a binomial with huge n and tiny p, and all we know is the average, "
                            "lambda, equal to n p.") as vo:
            self.play(FadeIn(hd), FadeIn(page), FadeIn(chars, lag_ratio=0.002), run_time=1.0)
            self.play(FadeIn(typos, scale=2), run_time=0.6)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(FadeIn(pm[0]), run_time=0.5)
            self.play(FadeIn(pm[1]), run_time=0.5)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(Write(pm[2]), run_time=0.8)

        ks = list(range(9))
        ax = chart((-0.7, 8.6), 0.4, 6.4, 3.6).move_to(P(-3.2, -0.5))
        nums = xnums(ax, ks, 24)
        b10 = bars(ax, ks, binom_pmf(10, 0.2, ks), width=0.55)
        b100 = bars(ax, ks, binom_pmf(100, 0.02, ks), width=0.55)
        pois = [exp(-2) * 2 ** k / factorial(k) for k in ks]
        pdots = VGroup(*[Dot(ax.c2p(k, pv), radius=0.08, color=HL) for k, pv in zip(ks, pois)])
        nlab = M(r"n = 10", 36, color=SUC).move_to(ax.c2p(6.5, 0.34))
        nlab2 = M(r"n = 100", 36, color=SUC).move_to(nlab)
        leg = VGroup(Dot(radius=0.08, color=HL), T("Poisson(2)", 22, color=HL)).arrange(RIGHT, buff=0.15)
        leg.next_to(nlab, DOWN, buff=0.25)
        form = M(r"P(X=k) = \frac{e^{-\lambda}\lambda^k}{k!}", 48, color=LAW).move_to(P(3.9, 1.0))
        ev = M(r"E[X] = \operatorname{Var}(X) = \lambda", 38).move_to(P(3.9, -0.8))
        with self.voiceover("Hold lambda fixed at two and let n grow. The binomial bars settle onto one shape. The "
                            "limit is e to the minus lambda, times lambda to the k, over k factorial. Its mean is "
                            "lambda, and so is its variance.") as vo:
            self.play(FadeOut(page), FadeOut(chars), FadeOut(typos), FadeOut(pm), run_time=0.5)
            self.play(Create(ax), FadeIn(nums), FadeIn(b10), FadeIn(nlab), run_time=0.9)
            self.play(FadeIn(pdots), FadeIn(leg), run_time=0.6)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(Transform(b10, b100), Transform(nlab, nlab2), run_time=1.5)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(Write(form), run_time=1.2)
            self.play(FadeIn(ev), run_time=0.6)

        s1 = M(r"\binom{n}{k}p^k \ \longrightarrow\ \frac{\lambda^k}{k!}", 40).move_to(P(3.9, 1.0))
        s2 = M(r"q^n = \left(1 - \tfrac{\lambda}{n}\right)^n \longrightarrow e^{-\lambda}", 38).move_to(P(3.9, -0.4))
        s2n = T("chance of no events", 22, color=MUTED).next_to(s2, DOWN, buff=0.15)
        s3 = M(r"P(0) = e^{-2} \approx 0.135", 42, color=HL).move_to(P(3.9, -2.2))
        with self.voiceover("Every piece has a source. Lambda to the k over k factorial comes from n choose k, times "
                            "p to the k. E to the minus lambda is the limit of q to the n, the chance of no events at "
                            "all. So the chance of a clean page is e to the minus two, about zero point one three "
                            "five.") as vo:
            self.play(FadeOut(form), FadeOut(ev), run_time=0.4)
            self.play(Write(s1), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(Write(s2), FadeIn(s2n), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(Write(s3), Indicate(b10[0], color=HL), run_time=1.0)

    # ------------------------------------------------------------ 5.6 choosing the model
    def s6(self):
        hd = header("5.6 · Choosing the right model")
        specs = [("Binomial", "fixed n, constant p, independent"),
                 ("Geometric", "trials until the first success"),
                 ("Poisson", "rare events at an average rate"),
                 ("Counting (hypergeometric)", "without replacement, small group")]
        cards = VGroup(*[fixed_card(VGroup(T(a, 30, weight="BOLD", color=PAR), T(b, 24)).arrange(DOWN, buff=0.25),
                                    5.8, 1.7, color=PAR) for a, b in specs])
        cards.arrange_in_grid(rows=2, cols=2, buff=(0.4, 0.4)).move_to(P(0, -0.2))
        with self.voiceover("The first line of a problem wins or loses the marks: which model fits? Fixed n, "
                            "constant p, independent trials: binomial. Trials until the first success: geometric. "
                            "Rare events at an average rate: Poisson. Drawing without replacement from a small "
                            "group: plain counting, the hypergeometric.") as vo:
            self.play(FadeIn(hd), run_time=0.4)
            self.wait(max(0.1, vo.duration * 0.12))
            for c in cards:
                self.play(FadeIn(c, shift=0.2 * UP), run_time=0.6)
                self.wait(max(0.1, vo.duration * 0.12))

        bag = T("Bag: 5 red, 3 blue. Draw 3. P(exactly 2 red)?", 30, weight="BOLD").move_to(P(0, 2.3))
        w1 = VGroup(T("without replacement", 26, color=PAR, weight="BOLD"),
                    M(r"\frac{\binom52\binom31}{\binom83} = \frac{15}{28} \approx 0.536", 40))
        w1.arrange(DOWN, buff=0.35)
        w2 = VGroup(T("with replacement", 26, color=PAR, weight="BOLD"),
                    M(r"\binom32\left(\tfrac58\right)^2\tfrac38 = \tfrac{225}{512} \approx 0.439", 40))
        w2.arrange(DOWN, buff=0.35)
        c1 = fixed_card(w1, 6.0, 2.6).move_to(P(-3.3, 0.1))
        c2 = fixed_card(w2, 6.0, 2.6).move_to(P(3.3, 0.1))
        agree = T("From a huge population the two agree.", 28, color=HL, weight="BOLD").move_to(P(0, -2.2))
        with self.voiceover("A bag has five red and three blue balls. Draw three and count reds. Without replacement, "
                            "exactly two reds has probability fifteen over twenty eight, about zero point five four. "
                            "With replacement, the binomial gives two hundred and twenty five over five hundred and "
                            "twelve, about zero point four four. From a huge population the two agree, and the "
                            "binomial is fine.") as vo:
            self.play(FadeOut(cards), run_time=0.5)
            self.play(FadeIn(bag), run_time=0.6)
            self.wait(max(0.1, vo.duration * 0.08))
            self.play(FadeIn(c1, shift=0.2 * UP), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.2))
            self.play(FadeIn(c2, shift=0.2 * UP), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.2))
            self.play(FadeIn(agree), run_time=0.6)

        flags = VGroup(
            VGroup(T("\"until\"", 34, weight="BOLD", color=WARN), M(r"\longrightarrow", 40),
                   T("geometric", 34, color=PAR)),
            VGroup(T("\"dealt\", \"selected\", \"chosen\"", 34, weight="BOLD", color=WARN), M(r"\longrightarrow", 40),
                   T("without replacement", 34, color=PAR)),
            VGroup(T("\"on average, per hour / page\"", 34, weight="BOLD", color=WARN), M(r"\longrightarrow", 40),
                   T("Poisson", 34, color=PAR)),
        )
        for f in flags:
            f.arrange(RIGHT, buff=0.35)
        flags.arrange(DOWN, buff=0.7).move_to(P(0, -0.2))
        with self.voiceover("Three red flags. The word until means geometric. Dealt, selected or chosen means without "
                            "replacement. On average, per hour or per page, means Poisson.") as vo:
            self.play(FadeOut(VGroup(bag, c1, c2, agree)), run_time=0.5)
            for f in flags:
                self.play(FadeIn(f, shift=0.2 * RIGHT), run_time=0.7)
                self.wait(max(0.1, vo.duration * 0.15))

    # ------------------------------------------------------------ recap
    def s7(self):
        hd = header("Recap")

        def rc(title, lines, color):
            body = VGroup(T(title, 30, weight="BOLD", color=color), *lines).arrange(DOWN, buff=0.22)
            return fixed_card(body, 6.2, 2.7, color=color)

        c1 = rc("Bernoulli trials", [T("fixed n  ·  two outcomes", 24), T("constant p  ·  independent", 24)], PAR)
        c2 = rc("Binomial", [M(r"\binom{n}{k}p^k q^{n-k}", 40), M(r"E = np,\quad \operatorname{Var} = npq", 34)], SUC)
        c3 = rc("Geometric", [M(r"q^{k-1}p", 40), M(r"E = \tfrac1p,\quad \text{no memory}", 34)], LAW)
        c4 = rc("Poisson", [M(r"\frac{e^{-\lambda}\lambda^k}{k!}", 40),
                            M(r"E = \operatorname{Var} = \lambda", 34)], HL)
        grid = VGroup(c1, c2, c3, c4).arrange_in_grid(rows=2, cols=2, buff=(0.4, 0.35)).move_to(P(0, 0.1))
        nxt = T("Next: 5.7 · Chapter 5 Mastery", 28, color=MUTED, weight="BOLD").move_to(P(0, -3.5))

        with self.voiceover("To recap. Bernoulli trials: fixed n, two outcomes, constant p, independence. The "
                            "binomial: n choose k, p to the k, q to the n minus k. Paths, times one path. Mean n p, "
                            "variance n p q.") as vo:
            self.play(FadeIn(hd), FadeIn(c1, shift=0.2 * UP), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.3))
            self.play(FadeIn(c2, shift=0.2 * UP), run_time=0.8)
        with self.voiceover("The geometric waits for a first success, with mean one over p and no memory. Poisson is "
                            "the binomial for rare events, with mean and variance both lambda. Choose the model "
                            "first, then compute. The mastery lesson mixes all of it.") as vo:
            self.play(FadeIn(c3, shift=0.2 * UP), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.2))
            self.play(FadeIn(c4, shift=0.2 * UP), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.3))
            self.play(FadeIn(nxt), run_time=0.6)
