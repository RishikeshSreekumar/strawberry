import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

# Chapter colour roles.
HL = ManimColor("#D19A00")  # highlight / results (deep gold)
A_C = SECONDARY  # team A / first quantity (teal)
B_C = PRIMARY  # team B / second quantity (red)
WARN = PRIMARY


# ---------------------------------------------------------------- helpers
def T(s, size=30, **kw):
    return Text(s, font_size=size, **kw)


def M(*parts, **kw):
    """MathTex; a trailing int argument is the font size."""
    size = 40
    if parts and isinstance(parts[-1], int):
        parts, size = parts[:-1], parts[-1]
    m = MathTex(*parts, font_size=kw.pop("size", size), **kw)
    if m.width > 12.6:
        m.scale_to_fit_width(12.6)
    return m


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


def with_mark(m, mark, buff=0.3):
    return VGroup(m, mark).arrange(RIGHT, buff=buff)


def stack(lines, y0, gap):
    grp = VGroup(*lines)
    for i, m in enumerate(grp):
        m.move_to([0, y0 - i * gap, 0])
    return grp


class PcCh5Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Permutations, Combinations & the Binomial Theorem",
            "Chapter 5 · Binomial Coefficients at Work",
            "Chapter five. Binomial coefficients at work.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ scene 1
    def s1(self):
        hd = header("5.1 · Sums by Substitution")
        eq = M(r"(1+x)^n", r"=",
               r"\binom{n}{0} + \binom{n}{1}x + \binom{n}{2}x^2 + \cdots + \binom{n}{n}x^n", 46)
        eq.move_to([0, 2.0, 0])
        b1 = Brace(eq[0], DOWN, color=A_C)
        l1 = T("short", 24, color=A_C).next_to(b1, DOWN, buff=0.12)
        b2 = Brace(eq[2], DOWN, color=B_C)
        l2 = T("long, but holds every coefficient", 24, color=B_C).next_to(b2, DOWN, buff=0.12)
        machine = T("Feed in a number for x", 30, color=HL, weight="BOLD").move_to([0, -0.2, 0])
        with self.voiceover("Chapter four gave us the binomial theorem. One plus x, to the n, equals n choose "
                            "zero, plus n choose one times x, plus n choose two times x squared, and so on. "
                            "The left side is short. The right side is long, but it holds every coefficient. "
                            "So treat the line as a machine. Feed in a number for x, and the short side tells "
                            "you something about the whole long side at once.") as vo:
            self.play(FadeIn(hd), Write(eq), run_time=2.2)
            self.wait(max(0.1, vo.duration * 0.45 - 2.2))
            self.play(GrowFromCenter(b1), FadeIn(l1), run_time=0.8)
            self.play(GrowFromCenter(b2), FadeIn(l2), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.25 - 1.6))
            self.play(FadeIn(machine, shift=0.1 * UP), run_time=0.8)

        eq2 = M(r"x = 1:\quad", r"2^n", r"=",
                r"\binom{n}{0} + \binom{n}{1} + \binom{n}{2} + \cdots + \binom{n}{n}", 46)
        eq2[0].set_color(HL)
        eq2[1].set_color(A_C)
        eq2.move_to([0, -0.5, 0])
        chk = with_mark(M(r"n = 5:\quad 1 + 5 + 10 + 10 + 5 + 1 = 32 = 2^5", 40), check())
        chk.move_to([0, -2.1, 0])
        with self.voiceover("The cheapest input is x equals one. Every power of x becomes one, so only the "
                            "coefficients survive. Two to the n is the sum of the whole row. Row five: one plus "
                            "five plus ten plus ten plus five plus one is thirty two, which is two to the "
                            "fifth.") as vo:
            self.play(FadeOut(machine), run_time=0.4)
            self.play(Write(eq2), run_time=1.8)
            self.wait(max(0.1, vo.duration * 0.5 - 2.2))
            self.play(FadeIn(chk, shift=0.1 * UP), run_time=1.0)

    # ------------------------------------------------------------ scene 2
    def s2(self):
        hd = header("5.1 · Sums by Substitution")
        l1 = M(r"x = -1:\quad", r"0 = \binom{n}{0} - \binom{n}{1} + \binom{n}{2} - \binom{n}{3} + \cdots", 44)
        l1[0].set_color(HL)
        l1.move_to([0, 2.3, 0])
        l2 = with_mark(M(r"n = 4:\quad 1 - 4 + 6 - 4 + 1 = 0", 38), check()).move_to([0, 1.2, 0])
        with self.voiceover("Now try x equals minus one. The signs alternate, and the left side is zero to "
                            "the n, which is zero. So the entries in even positions and the entries in odd "
                            "positions balance exactly. Row four: one minus four plus six minus four plus one "
                            "is zero.") as vo:
            self.play(FadeIn(hd), Write(l1), run_time=1.8)
            self.wait(max(0.1, vo.duration * 0.6 - 1.8))
            self.play(FadeIn(l2, shift=0.1 * UP), run_time=0.9)

        l3 = M(r"E + O = 2^n \qquad E - O = 0", 44).move_to([0, 0.0, 0])
        l4 = M(r"\Rightarrow\quad E = O = 2^{n-1}", 48, color=HL).move_to([0, -1.0, 0])
        l5 = T("E: even positions     O: odd positions", 24, color=MUTED).move_to([0, -1.9, 0])
        with self.voiceover("Call the even position sum E, and the odd position sum O. E plus O is two to "
                            "the n. E minus O is zero. So each one is half: two to the n minus one.") as vo:
            self.play(Write(l3), FadeIn(l5), run_time=1.4)
            self.wait(max(0.1, vo.duration * 0.6 - 1.4))
            self.play(Write(l4), run_time=1.0)

        p1 = M(r"P(x) = (3x - 2)^7", 48).move_to([0, 2.2, 0])
        p2 = M(r"\text{sum of coefficients} = P(1) = (3 - 2)^7 = 1", 44, color=GREEN).move_to([0, 1.1, 0])
        p3 = T("any polynomial: put x = 1 into the whole expression", 26, color=MUTED).move_to([0, 0.25, 0])
        with self.voiceover("This works for any polynomial. The sum of the coefficients of three x minus two, "
                            "to the seventh, is its value at x equals one. Three minus two, to the seventh, "
                            "is just one.") as vo:
            self.play(FadeOut(VGroup(l1, l2, l3, l4, l5)), run_time=0.6)
            self.play(Write(p1), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.45 - 1.8))
            self.play(Write(p2), run_time=1.4)
            self.play(FadeIn(p3), run_time=0.6)

        wrong = with_mark(M(r"\binom{7}{0} + \binom{7}{1} + \cdots + \binom{7}{7} = 2^7 = 128", 40), cross_mark())
        why = T("ignores the 3 and the −2 inside every coefficient", 24, color=MUTED)
        mis = card(VGroup(wrong, why).arrange(DOWN, buff=0.3), pad=0.3, color=WARN).move_to([0, -1.7, 0])
        with self.voiceover("It is not two to the seventh, one hundred and twenty eight. That adds only the "
                            "binomial coefficients, and ignores the three and the minus two that sit inside "
                            "every real coefficient.") as vo:
            self.play(FadeIn(mis[0]), Write(wrong), run_time=1.4)
            self.wait(max(0.1, vo.duration * 0.5 - 1.4))
            self.play(FadeIn(why), run_time=0.8)

    # ------------------------------------------------------------ scene 3
    def s3(self):
        hd = header("5.2 · Weighted Sums and Vandermonde")
        q = M(r"1\cdot\binom{n}{1} + 2\cdot\binom{n}{2} + 3\cdot\binom{n}{3} + \cdots + n\cdot\binom{n}{n} = \;?", 42)
        q.move_to([0, 2.4, 0])
        with self.voiceover("Now weight each entry by its position. One times n choose one, plus two times n "
                            "choose two, and so on. No substitution makes those weights. Instead, ask what r "
                            "times n choose r counts.") as vo:
            self.play(FadeIn(hd), Write(q), run_time=2.0)

        dots = VGroup(*[Dot(radius=0.2, color=MUTED) for _ in range(6)]).arrange(RIGHT, buff=0.7)
        dots.move_to([0, 1.0, 0])
        cap = T("n = 6 people", 24, color=MUTED).next_to(dots, DOWN, buff=0.3)
        committee = [0, 2, 3]
        ring = Circle(radius=0.34, color=HL, stroke_width=5).move_to(dots[2])
        star = T("chair", 22, color=HL, weight="BOLD").next_to(ring, UP, buff=0.1)
        eq = M(r"r\binom{n}{r}", r"=", r"n\binom{n-1}{r-1}", 52).move_to([0, -1.0, 0])
        eq[0].set_color(A_C)
        eq[2].set_color(HL)
        n1 = T("committee, then chair", 22, color=A_C).next_to(eq[0], DOWN, buff=0.35)
        n2 = T("chair, then the rest", 22, color=HL).next_to(eq[2], DOWN, buff=0.35)
        n1.shift(0.6 * LEFT)
        n2.shift(0.6 * RIGHT)
        with self.voiceover("From n people, pick a committee of r, then a chair from inside it. That is n "
                            "choose r, times r. Or pick the chair first, from everyone, in n ways, then the "
                            "other r minus one members from the remaining n minus one people. Both count the "
                            "same committees with chairs, so they are equal.") as vo:
            self.play(FadeIn(dots), FadeIn(cap), run_time=0.8)
            self.play(*[dots[i].animate.set_color(A_C) for i in committee], run_time=0.8)
            self.play(Create(ring), FadeIn(star), dots[2].animate.set_color(HL), run_time=0.8)
            self.play(Write(eq[0]), FadeIn(n1), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.45 - 3.4))
            self.play(*[dots[i].animate.set_color(MUTED) for i in committee], run_time=0.5)
            self.play(Indicate(ring, color=HL), run_time=0.7)
            self.play(*[dots[i].animate.set_color(A_C) for i in (0, 3)], dots[2].animate.set_color(HL), run_time=0.6)
            self.play(Write(eq[1]), Write(eq[2]), FadeIn(n2), run_time=1.2)

        s = M(r"\sum_{r=1}^{n} r\binom{n}{r}", r"=", r"n\sum_{r=1}^{n}\binom{n-1}{r-1}", r"=", r"n\cdot 2^{n-1}", 46)
        s[4].set_color(HL)
        s.move_to([0, 1.4, 0])
        sc = with_mark(M(r"n = 4:\quad 1\cdot 4 + 2\cdot 6 + 3\cdot 4 + 4\cdot 1 = 32 = 4\cdot 2^3", 38), check())
        sc.move_to([0, -0.4, 0])
        with self.voiceover("Now add over every r. Each term becomes n times an entry of row n minus one, and "
                            "that whole row adds to two to the n minus one. So the weighted sum is n times two "
                            "to the n minus one. Row four checks out: thirty two.") as vo:
            self.play(FadeOut(VGroup(q, dots, cap, ring, star, eq, n1, n2)), run_time=0.6)
            self.play(Write(s[:3]), run_time=1.6)
            self.wait(max(0.1, vo.duration * 0.55 - 2.2))
            self.play(Write(s[3:]), run_time=1.0)
            self.play(FadeIn(sc, shift=0.1 * UP), run_time=0.9)

        # two teams
        ta = VGroup(*[Dot(radius=0.2, color=A_C) for _ in range(4)]).arrange(RIGHT, buff=0.45).move_to([-4.0, 1.6, 0])
        tb = VGroup(*[Dot(radius=0.2, color=B_C) for _ in range(4)]).arrange(RIGHT, buff=0.45).move_to([4.0, 1.6, 0])
        la = T("Team A", 24, color=A_C, weight="BOLD").next_to(ta, UP, buff=0.3)
        lb = T("Team B", 24, color=B_C, weight="BOLD").next_to(tb, UP, buff=0.3)
        mid = T("choose 4 of the 8", 26, color=MUTED).move_to([0, 2.3, 0])

        def rings(picks):
            return VGroup(*[Circle(radius=0.32, color=HL, stroke_width=4).move_to(d) for d in picks])

        r1 = rings([ta[0], tb[0], tb[1], tb[2]])
        k1 = M(r"k = 1:\ \binom{4}{1}\binom{4}{3}", 36).move_to([0, 1.4, 0])
        r2 = rings([ta[1], ta[3], tb[0], tb[2]])
        k2 = M(r"k = 2:\ \binom{4}{2}\binom{4}{2}", 36).move_to([0, 1.4, 0])
        sq = M(r"\binom{2n}{n} = \sum_{k=0}^{n}\binom{n}{k}\binom{n}{n-k} = \sum_{k=0}^{n}\binom{n}{k}^2", 44)
        sq.move_to([0, -0.4, 0])
        sqc = with_mark(M(r"n = 4:\quad 1 + 16 + 36 + 16 + 1 = 70 = \binom{8}{4}", 38), check()).move_to([0, -1.9, 0])
        with self.voiceover("Squares of a row. Put two n people in two teams of n, and choose n of them. Split "
                            "by k, the number taken from team A. The rest come from team B, so each case gives "
                            "n choose k, times n choose n minus k. By symmetry that is n choose k, squared. So "
                            "the squares of row n add up to two n choose n.") as vo:
            self.play(FadeOut(VGroup(s, sc)), run_time=0.6)
            self.play(FadeIn(ta), FadeIn(tb), FadeIn(la), FadeIn(lb), FadeIn(mid), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.2 - 1.6))
            self.play(Create(r1), FadeIn(k1), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.15 - 1.0))
            self.play(ReplacementTransform(r1, r2), ReplacementTransform(k1, k2), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.2 - 1.0))
            self.play(Write(sq), run_time=1.6)
        with self.voiceover("Row four: one plus sixteen plus thirty six plus sixteen plus one is seventy, "
                            "which is eight choose four.") as vo:
            self.play(FadeIn(sqc, shift=0.1 * UP), run_time=1.0)

        vt = T("Vandermonde's identity", 28, color=HL, weight="BOLD")
        vf = M(r"\sum_{k}\binom{m}{k}\binom{n}{r-k} = \binom{m+n}{r}", 46)
        vg = VGroup(vt, vf).arrange(DOWN, buff=0.3)
        vbox = SurroundingRectangle(vg, color=HL, buff=0.25, corner_radius=0.15, stroke_width=3)
        vc = VGroup(vbox, vg).move_to([0, 2.0, 0])
        with self.voiceover("With teams of m and n, choosing r, the same split gives Vandermonde's identity.") as vo:
            self.play(FadeOut(VGroup(ta, tb, la, lb, mid, r2, k2)), VGroup(sq, sqc).animate.shift(0.55 * DOWN),
                      run_time=0.6)
            self.play(Create(vbox), FadeIn(vt), Write(vf), run_time=1.6)

    # ------------------------------------------------------------ scene 4
    def s4(self):
        hd = header("5.3 · Divisibility and Remainders")
        q = M(r"2^{100} \div 7:\quad \text{remainder?}", 48).move_to([0, 2.4, 0])
        note = T("31 digits. Only the leftover matters.", 26, color=MUTED).move_to([0, 1.5, 0])
        hint = T("write the base as (multiple of 7) + something small", 28, color=HL).move_to([0, 0.6, 0])
        with self.voiceover("What is the remainder when two to the one hundred is divided by seven? That number "
                            "has thirty one digits, but you only need the leftover. The trick is to write the "
                            "base as a multiple of seven, plus something small.") as vo:
            self.play(FadeIn(hd), Write(q), run_time=1.4)
            self.play(FadeIn(note), run_time=0.7)
            self.wait(max(0.1, vo.duration * 0.6 - 2.1))
            self.play(FadeIn(hint, shift=0.1 * UP), run_time=0.8)

        steps = stack([
            M(r"2^3 = 8 = 7 + 1", 40),
            M(r"2^{100} = 2\cdot(2^3)^{33} = 2\,(7+1)^{33}", 40),
            M(r"(7+1)^{33} = 7^{33} + \cdots + \binom{33}{1}\,7 + 1 = 7k + 1", 40),
            M(r"2^{100} = 2\,(7k+1) = 14k + 2", 40),
            M(r"\text{remainder} = 2", 46, color=HL),
        ], y0=1.4, gap=0.85)
        with self.voiceover("Two cubed is eight, which is seven plus one. So two to the one hundred is two "
                            "times, seven plus one, to the thirty third. Expand. Every term except the last "
                            "carries a factor of seven, so that power is seven k plus one. Double it: fourteen "
                            "k plus two. The remainder is two.") as vo:
            self.play(FadeOut(note), FadeOut(hint), run_time=0.5)
            per = max(0.9, (vo.duration * 0.9 - 0.5) / 5)
            for st in steps:
                self.play(FadeIn(st, shift=0.1 * UP), run_time=0.8)
                self.wait(max(0.1, per - 0.8))

        t2 = M(r"9^n - 8n - 1 \text{ is divisible by } 64", 46).move_to([0, 2.4, 0])
        e1 = M(r"9^n = (1+8)^n = ", r"1 + 8n", r" + \binom{n}{2}8^2 + \binom{n}{3}8^3 + \cdots + 8^n", 42)
        e1[1].set_color(A_C)
        e1.move_to([0, 1.1, 0])
        e2 = M(r"9^n - 8n - 1 = ", r"8^2", r"\left[\binom{n}{2} + \binom{n}{3}\,8 + \cdots + 8^{n-2}\right]", 42)
        e2[1].set_color(HL)
        e2.move_to([0, -0.4, 0])
        e3 = with_mark(M(r"n = 3:\quad 729 - 25 = 704 = 64 \times 11", 38), check()).move_to([0, -1.8, 0])
        with self.voiceover("The same move proves that nine to the n, minus eight n, minus one, is always "
                            "divisible by sixty four. Write nine as one plus eight. The first two terms are one "
                            "plus eight n. Every other term carries eight squared, which is sixty four. Subtract "
                            "the first two terms, and only multiples of sixty four remain.") as vo:
            self.play(FadeOut(steps), ReplacementTransform(q, t2), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.2 - 1.0))
            self.play(Write(e1), run_time=1.6)
            self.play(Indicate(e1[1], color=A_C), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.35 - 2.4))
            self.play(Write(e2), run_time=1.6)
            self.play(FadeIn(e3, shift=0.1 * UP), run_time=0.8)

        wt = T("A negative leftover is not a remainder", 30, color=WARN, weight="BOLD")
        w = VGroup(
            M(r"5^{99} = 5\,(26 - 1)^{49} = 130k - 5", 40),
            M(r"130k - 5 = 13\,(10k - 1) + 8", 40),
            M(r"\text{remainder} = 8, \text{ not } -5", 44, color=HL),
        ).arrange(DOWN, buff=0.35)
        wc = card(VGroup(wt, w).arrange(DOWN, buff=0.4), pad=0.35, color=WARN).move_to([0, -0.2, 0])
        with self.voiceover("One warning. If the expansion leaves a negative leftover, like minus five when you "
                            "divide by thirteen, you are not done. A remainder must be between zero and twelve. "
                            "Borrow one thirteen, and the remainder is eight.") as vo:
            self.play(FadeOut(VGroup(t2, e1, e2, e3)), run_time=0.6)
            self.play(FadeIn(wc[0]), FadeIn(wt), run_time=0.8)
            per = max(0.8, (vo.duration * 0.85 - 1.4) / 3)
            for m in w:
                self.play(Write(m), run_time=0.9)
                self.wait(max(0.1, per - 0.9))

    # ------------------------------------------------------------ scene 5
    def s5(self):
        hd = header("5.4 · Binomial Approximations")
        top = M(r"(1.02)^{10} = (1 + x)^{10}, \quad x = 0.02", 44).move_to([0, 2.5, 0])
        labels = [r"1", r"10x", r"45x^2", r"120x^3", r"210x^4"]
        values = [1, 0.2, 0.018, 0.00096, 0.0000336]
        vtex = ["1", "0.2", "0.018", "0.00096", "0.0000336"]
        rows = VGroup()
        for i, (lab, v, vt) in enumerate(zip(labels, values, vtex)):
            y = 1.4 - i * 0.68
            lm = M(lab, 36).move_to([-4.6, y, 0])
            vm = M(vt, 36).move_to([-2.2, y, 0])
            w = max(0.03, v * 5.0)
            bar = Rectangle(width=w, height=0.38, stroke_width=0, fill_color=HL if i < 2 else A_C,
                            fill_opacity=0.85)
            bar.move_to([-0.5 + w / 2, y, 0])
            rows.add(VGroup(lm, vm, bar))
        with self.voiceover("A two percent rise, ten years running, multiplies your money by one point zero "
                            "two, to the tenth. Write it as one plus x, to the tenth, with x equal to zero point "
                            "zero two. The terms are one, then ten x, then forty five x squared, and each one is "
                            "far smaller than the one before.") as vo:
            self.play(FadeIn(hd), Write(top), run_time=1.4)
            self.wait(max(0.1, vo.duration * 0.4 - 1.4))
            per = max(0.6, (vo.duration * 0.55) / 5)
            for r in rows:
                self.play(FadeIn(r[0]), FadeIn(r[1]), GrowFromEdge(r[2], LEFT), run_time=min(0.9, per))
                self.wait(max(0.05, per - 0.9))

        tot = M(r"1 + 0.2 + 0.018 + 0.00096 + \cdots \approx 1.219", 42, color=HL).move_to([0, -2.15, 0])
        rule = M(r"(1+x)^n \approx 1 + nx", 46)
        rbox = SurroundingRectangle(rule, color=HL, buff=0.2, corner_radius=0.12, stroke_width=3)
        rc = VGroup(rbox, rule).move_to([0, -3.1, 0])
        with self.voiceover("Add them up. One point two one nine, correct to three decimal places. The first two "
                            "terms alone already give one point two. That is the binomial approximation. For "
                            "small x, one plus x to the n is roughly one plus n x.") as vo:
            self.play(Write(tot), run_time=1.4)
            self.play(Indicate(VGroup(rows[0], rows[1]), color=HL), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.6 - 2.4))
            self.play(FadeIn(rc, shift=0.1 * UP), run_time=0.9)

        ax = Axes(x_range=[-0.6, 0.6, 0.2], y_range=[-1, 8, 1], x_length=6.8, y_length=5.4,
                  axis_config={"color": MUTED, "include_tip": False, "stroke_width": 2})
        ax.move_to([-2.9, -0.4, 0])
        f = ax.plot(lambda x: (1 + x) ** 5, x_range=[-0.6, 0.5], color=PRIMARY, stroke_width=5)
        lin = ax.plot(lambda x: 1 + 5 * x, x_range=[-0.4, 0.6], color=A_C, stroke_width=4)
        par = ax.plot(lambda x: 1 + 5 * x + 10 * x * x, x_range=[-0.6, 0.6], color=GREEN, stroke_width=4)
        o = Dot(ax.c2p(0, 1), color=INK, radius=0.07)

        def leg(color, tex):
            return VGroup(Line(ORIGIN, 0.6 * RIGHT, color=color, stroke_width=5), M(tex, 34)).arrange(RIGHT, buff=0.25)

        legend = VGroup(leg(PRIMARY, r"(1+x)^5"), leg(A_C, r"1 + 5x"), leg(GREEN, r"1 + 5x + 10x^2"))
        legend.arrange(DOWN, buff=0.3, aligned_edge=LEFT).move_to([3.9, 1.3, 0])
        n1 = T("tangent line at x = 0", 24, color=A_C).move_to([3.9, -0.3, 0])
        n2 = T("needs nx small, not just x", 26, color=HL, weight="BOLD").move_to([3.9, -1.3, 0])
        with self.voiceover("On a graph, one plus five x is the tangent line at x equals zero. Near zero it hugs "
                            "the curve. Keep the x squared term, and the fit lasts longer. Farther out, both "
                            "peel away. What matters is that n x is small, not just x.") as vo:
            self.play(FadeOut(VGroup(top, rows, tot, rc)), run_time=0.6)
            self.play(Create(ax), run_time=0.8)
            self.play(Create(f), FadeIn(legend[0]), run_time=1.0)
            self.play(Create(lin), FadeIn(legend[1]), FadeIn(o), FadeIn(n1), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.4 - 3.4))
            self.play(Create(par), FadeIn(legend[2]), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.3 - 1.0))
            self.play(FadeIn(n2, shift=0.1 * UP), run_time=0.7)

        wrong = with_mark(M(r"(1+x)^n \approx 1 + x^n", 50, color=WARN), cross_mark())
        test = M(r"1 + (0.02)^{10} \approx 1 \quad \text{but} \quad (1.02)^{10} \approx 1.219", 40)
        why = M(r"x^n \text{ is the smallest term; } nx \text{ is the important one}", 34, color=MUTED)
        mis = card(VGroup(wrong, test, why).arrange(DOWN, buff=0.4), pad=0.4, color=WARN).move_to([0, 0, 0])
        with self.voiceover("And one common slip. One plus x, to the n, is not one plus x to the power n. Try "
                            "it: one plus zero point zero two to the tenth is basically one. For small x, x to "
                            "the n is the smallest term, not the important one.") as vo:
            self.play(FadeOut(VGroup(ax, f, lin, par, o, legend, n1, n2)), run_time=0.6)
            self.play(FadeIn(mis[0]), Write(wrong), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.35 - 1.8))
            self.play(Write(test), run_time=1.4)
            self.wait(max(0.1, vo.duration * 0.25 - 1.4))
            self.play(FadeIn(why), run_time=0.8)

    # ------------------------------------------------------------ scene 6
    def s6(self):
        hd = header("5.5 · Beyond Whole-Number Powers")
        tag = T("JEE preview", 22, color=PURPLE, weight="BOLD").to_corner(UR, buff=0.4)
        f = M(r"\binom{n}{r} = \frac{n(n-1)(n-2)\cdots(n-r+1)}{r!}", 48).move_to([0, 2.0, 0])
        fn = T("no factorial of n needed, so n can be any number", 26, color=MUTED).next_to(f, DOWN, buff=0.35)
        with self.voiceover("One last step, a preview for J E E. The coefficient n choose r can be written as n, "
                            "times n minus one, and so on down r factors, all over r factorial. Nothing there "
                            "needs n to be a whole number.") as vo:
            self.play(FadeIn(hd), FadeIn(tag), Write(f), run_time=1.8)
            self.wait(max(0.1, vo.duration * 0.6 - 1.8))
            self.play(FadeIn(fn), run_time=0.8)

        a = M(r"n = 4:\quad 4\cdot 3\cdot 2\cdot 1\cdot 0 = 0 \;\Rightarrow\; \text{the series stops}", 38)
        b = M(r"n = -1:\quad (-1)(-2)(-3)\cdots \ne 0 \;\Rightarrow\; \text{it never stops}", 38)
        a.move_to([0, 0.3, 0])
        b.move_to([0, -0.5, 0])
        g = M(r"\frac{1}{1-x} = 1 + x + x^2 + x^3 + \cdots", 48, color=HL).move_to([0, -1.9, 0])
        with self.voiceover("For a whole number n, the factors eventually hit zero, and the series stops. For n "
                            "equal to minus one, the factors are minus one, minus two, minus three, and they "
                            "never reach zero. The series goes on forever. One over one minus x is one plus x "
                            "plus x squared plus x cubed, and so on.") as vo:
            self.play(Write(a), run_time=1.4)
            self.wait(max(0.1, vo.duration * 0.3 - 1.4))
            self.play(Write(b), run_time=1.4)
            self.wait(max(0.1, vo.duration * 0.3 - 1.4))
            self.play(Write(g), run_time=1.4)

        r1 = with_mark(M(r"x = \tfrac{1}{2}:\quad 1,\ 1.5,\ 1.75,\ 1.875,\ 1.9375,\ \ldots \to 2", 38), check())
        r2 = with_mark(M(r"x = 2:\quad 1,\ 3,\ 7,\ 15,\ 31,\ \ldots \to \infty", 38), cross_mark())
        r3 = M(r"\text{but the formula says } \frac{1}{1-2} = -1", 38, color=WARN)
        r1.move_to([0, 0.9, 0])
        r2.move_to([0, -0.1, 0])
        r3.move_to([0, -1.0, 0])
        ok = M(r"\text{valid only for } |x| < 1", 44, color=HL)
        okb = SurroundingRectangle(ok, color=HL, buff=0.2, corner_radius=0.12, stroke_width=3)
        okc = VGroup(okb, ok).move_to([0, -2.3, 0])
        with self.voiceover("But only when x is between minus one and one. At x equals one half, the partial "
                            "sums creep up to two, just as the formula says. At x equals two, they run one, "
                            "three, seven, fifteen, and blow up, while the formula claims minus one. Adding "
                            "positive numbers can never give minus one.") as vo:
            self.play(FadeOut(VGroup(f, fn, a, b)), g.animate.move_to([0, 2.3, 0]), run_time=0.9)
            self.play(Write(r1), run_time=1.4)
            self.wait(max(0.1, vo.duration * 0.35 - 2.3))
            self.play(Write(r2), run_time=1.4)
            self.wait(max(0.1, vo.duration * 0.25 - 1.4))
            self.play(Write(r3), run_time=1.0)
            self.play(Create(okb), FadeIn(ok), run_time=0.8)

        s = M(r"\sqrt{1.02} = (1 + 0.02)^{1/2} \approx 1 + \tfrac{1}{2}(0.02) = 1.01", 46).move_to([0, 0.4, 0])
        sn = T("true value: 1.00995...", 26, color=MUTED).next_to(s, DOWN, buff=0.4)
        with self.voiceover("Inside that range it is a sharp tool. The square root of one point zero two is "
                            "about one plus half of zero point zero two, which is one point zero one.") as vo:
            self.play(FadeOut(VGroup(g, r1, r2, r3, okc)), run_time=0.6)
            self.play(Write(s), run_time=1.8)
            self.wait(max(0.1, vo.duration * 0.7 - 2.4))
            self.play(FadeIn(sn), run_time=0.7)

    # ------------------------------------------------------------ scene 7
    def s7(self):
        hd = T("Chapter 5 in five lines", 34, color=INK, weight="BOLD").to_edge(UP, buff=0.5)
        items = [
            ("Coefficient sums", r"\text{put } x = 1 \text{ or } x = -1 \text{ into the whole expression}"),
            ("Weighted sums", r"\sum r\binom{n}{r} = n\,2^{n-1}"),
            ("Vandermonde", r"\sum_k \binom{m}{k}\binom{n}{r-k} = \binom{m+n}{r}"),
            ("Remainders", r"\text{base} = (\text{multiple of } d) \pm 1, \text{ then expand}"),
            ("Approximation", r"(1+x)^n \approx 1 + nx \quad (nx \text{ small})"),
        ]
        rows = VGroup()
        for i, (lab, tex) in enumerate(items):
            y = 1.9 - i * 0.95
            dot = Dot(radius=0.09, color=HL).move_to([-6.0, y, 0])
            lt = T(lab, 26, color=A_C, weight="BOLD")
            lt.move_to([-5.75 + lt.width / 2, y, 0])
            m = M(tex, 34)
            m.move_to([-2.4 + m.width / 2, y, 0])
            rows.add(VGroup(dot, lt, m))
        nxt = T("Next: the Chapter 5 mastery check", 30, color=HL, weight="BOLD").to_edge(DOWN, buff=0.45)
        text = ("To recap. Put x equal to one, or minus one, into the whole expression to get coefficient sums. "
                "A weighted sum becomes n times two to the n minus one, by choosing a chair. Splitting a choice "
                "between two teams gives Vandermonde's identity and the sum of squares of a row. For remainders, "
                "write the base as a multiple, plus or minus one, and expand. And when n x is small, one plus x "
                "to the n is about one plus n x. Try the chapter five mastery check next.")
        with self.voiceover(text) as vo:
            self.play(FadeIn(hd), run_time=0.5)
            per = max(0.8, (vo.duration * 0.88 - 1.5) / 5)
            for row in rows:
                self.play(FadeIn(row, shift=0.1 * RIGHT), run_time=0.7)
                self.wait(max(0.1, per - 0.7))
            self.play(FadeIn(nxt, shift=0.1 * UP), run_time=0.8)
        self.wait(1.0)
