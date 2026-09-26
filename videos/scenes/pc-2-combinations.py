import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

# Chapter colour roles (light background).
IN_C = PRIMARY  # chosen / in
OUT_C = SECONDARY  # left out / stays
HL = ManimColor("#D19A00")  # highlight / totals (gold)
WARN = PRIMARY
BLUE_C = ManimColor("#2B6CB0")
SKIN = ManimColor("#F3D9C9")

# Colour for each unordered pair in the hook; it follows the pair everywhere.
PAIR_COLORS = {
    "AB": PRIMARY, "AC": SECONDARY, "AD": ACCENT,
    "BC": GREEN, "BD": PURPLE, "CD": BLUE_C,
}

# `say` reads a lone "A" as the article; spell it as a letter.
LA = "[[char LTRL]]A[[char NORM]]"


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


def check():
    return MathTex(r"\checkmark", color=GREEN, font_size=56)


def cross_mark():
    return MathTex(r"\times", color=WARN, font_size=64)


def card(mob, pad=0.25, color=MUTED):
    box = SurroundingRectangle(mob, buff=pad, corner_radius=0.15, color=color, stroke_width=2)
    box.set_fill(WHITE, opacity=0.85)
    return VGroup(box, mob)


def header(s):
    return T(s, 22, color=MUTED).to_corner(UL, buff=0.35)


def tile(s, color, w=None, size=28):
    lab = T(s, size, color=color, weight="BOLD")
    width = w if w is not None else max(1.15, lab.width + 0.45)
    box = RoundedRectangle(width=width, height=0.6, corner_radius=0.12, color=color, stroke_width=2.5)
    box.set_fill(color, opacity=0.14)
    return VGroup(box, lab.move_to(box))


def person(letter, name, color=INK):
    c = Circle(radius=0.38, color=color, stroke_width=3).set_fill(SKIN, 1)
    lt = T(letter, 30, color=color, weight="BOLD").move_to(c)
    nm = T(name, 22, color=MUTED).next_to(c, DOWN, buff=0.12)
    return VGroup(c, lt, nm)


class PcCh2Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Permutations, Combinations & the Binomial Theorem",
            "Chapter 2 · Combinations: Choosing Things",
            "Chapter two. Combinations. Choosing things.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ scene 1: hook
    def s1(self):
        hd = header("2.1 · From Arrangements to Selections")
        people = VGroup(
            person("A", "Asha"), person("B", "Ben"), person("C", "Chitra"), person("D", "Dev"),
        ).arrange(RIGHT, buff=1.0).move_to(P(0, 2.2))
        q = T("How many different pairs?", 34, color=INK).move_to(P(0, 0.4))

        with self.voiceover("Four friends: Asha, Ben, Chitra and Dev. Two of them will go out to buy snacks. "
                            "How many different pairs could go?") as vo:
            self.play(FadeIn(hd), run_time=0.4)
            self.play(LaggedStart(*[FadeIn(p, shift=0.2 * UP) for p in people], lag_ratio=0.25), run_time=1.6)
            self.play(FadeIn(q), run_time=0.6)

        order = ["AB", "AC", "AD", "BA", "BC", "BD", "CA", "CB", "CD", "DA", "DB", "DC"]
        tiles = {}
        for k, s in enumerate(order):
            i, j = divmod(k, 4)
            key = "".join(sorted(s))
            t = tile(s, PAIR_COLORS[key]).move_to(P((j - 1.5) * 1.7, -0.2 - 0.85 * i))
            tiles[s] = t
        slots = M(r"4 \times 3 = 12", 48).move_to(P(0, 0.75))

        with self.voiceover("Fill two slots, the way we did in chapter one. Four choices for the first person, "
                            "three for the second. Twelve.") as vo:
            self.play(FadeOut(q), run_time=0.4)
            self.play(Write(slots), run_time=0.9)
            self.play(LaggedStart(*[FadeIn(tiles[s], scale=0.8) for s in order], lag_ratio=0.12),
                      run_time=min(2.4, max(1.0, vo.duration - 1.6)))
        b1 = SurroundingRectangle(tiles["AB"], buff=0.08, color=HL, stroke_width=4, corner_radius=0.12)
        b2 = SurroundingRectangle(tiles["BA"], buff=0.08, color=HL, stroke_width=4, corner_radius=0.12)
        with self.voiceover("But look at the list. Asha then Ben is the same snack run as Ben then Asha. "
                            "The same two people walk out of the door.") as vo:
            self.play(Create(b1), run_time=0.6)
            self.play(Create(b2), run_time=0.6)
            self.play(Indicate(people[0], color=HL), Indicate(people[1], color=HL), run_time=1.0)

        sels = ["AB", "AC", "AD", "BC", "BD", "CD"]
        anims = []
        for k, s in enumerate(sels):
            x = (k - 2.5) * 1.8
            anims.append(tiles[s].animate.move_to(P(x, -0.3)))
            anims.append(tiles[s[::-1]].animate.move_to(P(x, -1.1)))
        res = M(r"12 \div 2 = 6", 56, color=HL).move_to(P(0, -2.35))
        cap = card(T("same two people, same snack run", 28, color=INK)).move_to(P(0, -3.3))
        with self.voiceover("Group the list by who is in it. Every pair shows up exactly twice. "
                            "Twelve divided by two: six pairs.") as vo:
            self.play(FadeOut(b1), FadeOut(b2), run_time=0.3)
            self.play(*anims, run_time=1.8)
            self.wait(max(0.1, vo.duration * 0.25))
            self.play(Write(res), run_time=0.8)
            self.play(FadeIn(cap, shift=0.2 * UP), run_time=0.6)

    # ------------------------------------------------------------ scene 2: nCr and the swap test
    def s2(self):
        hd = header("2.1 · From Arrangements to Selections")
        st = M(r"\{A,\,B,\,C\}", 64, color=IN_C).move_to(P(-4.6, 1.3))
        arr = Arrow(P(-3.1, 1.3), P(-1.9, 1.3), buff=0, color=MUTED, stroke_width=4)
        perms = ["ABC", "ACB", "BAC", "BCA", "CAB", "CBA"]
        ts = VGroup(*[tile(s, IN_C, w=1.35) for s in perms])
        for k, t in enumerate(ts):
            i, j = divmod(k, 3)
            t.move_to(P(-0.8 + 1.6 * j, 1.75 - 0.9 * i))
        lab = M(r"3! = 6", 44).move_to(P(4.9, 1.55))
        lab2 = T("orders", 26, color=MUTED).next_to(lab, DOWN, buff=0.15)
        l1 = M(r"{}^5P_3 = 5 \times 4 \times 3 = 60 \text{ arrangements}", 44).move_to(P(0, -0.9))
        l2 = M(r"60 \div 3! = 10 \text{ selections}", 48, color=HL).move_to(P(0, -2.1))

        with self.voiceover("Why exactly twice? Once two people are chosen, there are two factorial ways to put "
                            "them in order.") as vo:
            self.play(FadeIn(hd), run_time=0.4)
            self.play(Write(M(r"2! = 2", 60).move_to(P(0, 0.5))), run_time=1.0)
        self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.4)
        with self.voiceover(f"Take three people out of five instead. One group, like {LA}, B, C, can be written in "
                            f"three factorial, six, orders. So sixty arrangements collapse into ten selections.") as vo:
            self.play(FadeIn(st), run_time=0.6)
            self.play(GrowArrow(arr), run_time=0.4)
            self.play(LaggedStart(*[FadeIn(t, shift=0.2 * RIGHT) for t in ts], lag_ratio=0.2), run_time=1.6)
            self.play(FadeIn(lab), FadeIn(lab2), run_time=0.5)
            self.play(Write(l1), run_time=1.0)
            self.play(Write(l2), run_time=1.0)

        with self.voiceover("In general, count the arrangements in two stages. First choose which r things. "
                            "Call that number n choose r. Then arrange them, in r factorial ways. "
                            "Together that must equal n P r.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            eq = MathTex(r"{}^nP_r", "=", r"{}^nC_r", r"\times", "r!", font_size=80).move_to(P(0, 1.7))
            eq[2].set_color(IN_C)
            eq[4].set_color(OUT_C)
            br1 = Brace(eq[2], DOWN, color=IN_C)
            bl1 = T("choose", 26, color=IN_C).next_to(br1, DOWN, buff=0.1)
            br2 = Brace(eq[4], DOWN, color=OUT_C)
            bl2 = T("arrange", 26, color=OUT_C).next_to(br2, DOWN, buff=0.1)
            self.play(Write(eq[0]), run_time=0.6)
            self.play(Write(eq[1]), Write(eq[2]), run_time=0.8)
            self.play(GrowFromCenter(br1), FadeIn(bl1), run_time=0.6)
            self.wait(max(0.1, vo.duration * 0.2))
            self.play(Write(eq[3]), Write(eq[4]), run_time=0.8)
            self.play(GrowFromCenter(br2), FadeIn(bl2), run_time=0.6)
        f2 = M(r"{}^nC_r = \frac{{}^nP_r}{r!} = \frac{n!}{r!\,(n-r)!}", 70).move_to(P(0, -1.7))
        box = SurroundingRectangle(f2, buff=0.3, corner_radius=0.15, color=PRIMARY, stroke_width=3)
        with self.voiceover("So n choose r is n P r divided by r factorial, which is n factorial over "
                            "r factorial times n minus r factorial.") as vo:
            self.play(Write(f2), run_time=2.0)
            self.play(Create(box), run_time=0.6)

        test = VGroup(
            T("Swap two chosen things. Different outcome?", 30, color=INK),
            T("Yes → arrangement (P)      No → selection (C)", 28, color=PRIMARY),
        ).arrange(DOWN, buff=0.25)
        test_c = card(test, pad=0.3, color=PRIMARY).move_to(P(0, 2.2))
        ex = T("Captain and vice-captain from 11 players", 30, color=INK).move_to(P(0, 0.5))
        good = M(r"{}^{11}P_2 = 11 \times 10 = 110", 52).move_to(P(-0.4, -0.7))
        c1 = check().next_to(good, RIGHT, buff=0.4)
        bad = M(r"{}^{11}C_2 = 55", 52).move_to(P(-0.4, -1.9))
        c2 = cross_mark().next_to(bad, RIGHT, buff=0.4)
        cap = T("roles make order matter", 28, color=MUTED).move_to(P(0, -3.2))
        with self.voiceover("Before you use it, run one test. If I swap two of the chosen things, "
                            "do I get a different outcome?") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(FadeIn(test_c, shift=0.2 * DOWN), run_time=0.9)
        with self.voiceover("For a captain and a vice captain from eleven players, the answer is yes. "
                            "Swap them and the outcome changes. Roles make order matter, so the answer is "
                            "eleven P two, one hundred and ten, not fifty five.") as vo:
            self.play(FadeIn(ex), run_time=0.6)
            self.wait(max(0.1, vo.duration * 0.3))
            self.play(Write(good), run_time=0.9)
            self.play(FadeIn(c1), run_time=0.3)
            self.play(Write(bad), run_time=0.8)
            self.play(FadeIn(c2), FadeIn(cap), run_time=0.5)

    # ------------------------------------------------------------ scene 3: identities by counting
    def s3(self):
        hd = header("2.2 · Identities by Counting")
        dots = VGroup(*[Dot(P((i - 4.5) * 0.95, 1.9), radius=0.24, color=MUTED) for i in range(10)])
        go, stay = VGroup(*dots[:8]), VGroup(*dots[8:])
        br_go = Brace(go, DOWN, color=IN_C)
        l_go = T("8 go", 28, color=IN_C).next_to(br_go, DOWN, buff=0.1)
        br_st = Brace(stay, DOWN, color=OUT_C)
        l_st = T("2 stay", 28, color=OUT_C).next_to(br_st, DOWN, buff=0.1)
        f1 = M(r"{}^{10}C_8 = {}^{10}C_2 = \frac{10 \times 9}{2} = 45", 50).move_to(P(0, -0.8))
        f2 = M(r"{}^nC_r = {}^nC_{n-r}", 64, color=HL).move_to(P(0, -2.3))
        box = SurroundingRectangle(f2, buff=0.25, corner_radius=0.15, color=HL, stroke_width=3)

        with self.voiceover("Identities come from one trick: count the same collection in two ways. "
                            "Ten students, and eight go on a trip.") as vo:
            self.play(FadeIn(hd), run_time=0.4)
            self.play(LaggedStart(*[FadeIn(d, scale=0.5) for d in dots], lag_ratio=0.08), run_time=1.2)
            self.play(go.animate.set_color(IN_C), GrowFromCenter(br_go), FadeIn(l_go), run_time=1.0)
        with self.voiceover("Choosing the eight who go is the same as choosing the two who stay. "
                            "So ten choose eight equals ten choose two. In general, n choose r equals "
                            "n choose n minus r.") as vo:
            self.play(stay.animate.set_color(OUT_C), GrowFromCenter(br_st), FadeIn(l_st), run_time=1.0)
            self.play(Indicate(stay, color=OUT_C, scale_factor=1.4), run_time=0.8)
            self.play(Write(f1), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(Write(f2), Create(box), run_time=1.0)

        # ---- Pascal's rule via Meera
        meera = Dot(P(-4.9, 2.0), radius=0.3, color=HL)
        m_lab = T("Meera", 24, color=HL).next_to(meera, DOWN, buff=0.12)
        others = VGroup(*[Dot(radius=0.18, color=MUTED) for _ in range(8)]).arrange_in_grid(2, 4, buff=0.35)
        others.move_to(P(-1.6, 2.0))
        o_lab = T("n others", 24, color=MUTED).next_to(others, DOWN, buff=0.15)
        top = T("committees of r from n + 1 people", 28, color=INK).move_to(P(3.6, 2.0))
        fit(top, 5.2)

        def case_box(title, tex, note, color, x):
            r = RoundedRectangle(width=5.6, height=2.1, corner_radius=0.18, color=color, stroke_width=3)
            r.set_fill(color, opacity=0.06).move_to(P(x, -0.55))
            t = T(title, 28, color=color, weight="BOLD").move_to(P(x, 0.1))
            m = M(tex, 52).move_to(P(x, -0.65))
            n = T(note, 22, color=MUTED).move_to(P(x, -1.3))
            return VGroup(r, t, m, n)

        cin = case_box("Meera in", r"{}^nC_{r-1}", "the other r − 1 from n", IN_C, -3.2)
        cout = case_box("Meera out", r"{}^nC_{r}", "all r from the other n", OUT_C, 3.2)
        rule = M(r"{}^nC_{r-1} + {}^nC_r = {}^{n+1}C_r", 60, color=HL).move_to(P(0, -2.75))
        with self.voiceover("Pascal's rule. Count committees of r from n plus one people. "
                            "Single out one person, Meera.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(FadeIn(others), FadeIn(o_lab), FadeIn(top), run_time=0.8)
            self.play(GrowFromCenter(meera), FadeIn(m_lab), run_time=0.7)
            self.play(Flash(meera, color=HL), run_time=0.6)
        with self.voiceover("Either Meera is in, and the other r minus one come from the remaining n. "
                            "Or Meera is out, and all r come from the other n. "
                            "The two cases never overlap, so we add.") as vo:
            self.play(FadeIn(cin), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.3))
            self.play(FadeIn(cout), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.2))
            self.play(Write(rule), run_time=1.2)

        # ---- Pascal's triangle
        dx, dy, y0 = 0.95, 0.62, 2.55
        tri = {}
        grp = VGroup()
        from math import comb
        for n in range(7):
            for r in range(n + 1):
                m = M(str(comb(n, r)), 34).move_to(P((r - n / 2) * dx, y0 - dy * n))
                tri[(n, r)] = m
                grp.add(m)
        eqn = M(r"{}^5C_1 + {}^5C_2 = 5 + 10 = 15 = {}^6C_2", 50).move_to(P(0, -2.5))
        rings = VGroup(*[Circle(radius=0.32, color=c, stroke_width=4).move_to(tri[k])
                         for k, c in (((5, 1), IN_C), ((5, 2), OUT_C), ((6, 2), HL))])
        with self.voiceover("In Pascal's triangle this says every entry is the sum of the two above it.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(LaggedStart(*[FadeIn(m) for m in grp], lag_ratio=0.04), run_time=1.8)
        with self.voiceover("Five choose one plus five choose two: five plus ten, fifteen. "
                            "That is six choose two.") as vo:
            self.play(Create(rings[0]), Create(rings[1]), run_time=0.8)
            self.play(Create(rings[2]), tri[(6, 2)].animate.set_color(HL), run_time=0.8)
            self.play(Write(eqn), run_time=1.4)

    # ------------------------------------------------------------ scene 4: restrictions
    def s4(self):
        hd = header("2.3 · Selections with Restrictions")
        prob = T("Committee of 5 from 6 men and 4 women, at least 2 women", 28, color=INK).move_to(P(0, 2.75))
        fit(prob, 12.5)
        div = Line(P(0, 2.1), P(0, -2.0), color=GRID, stroke_width=3)
        h1 = T("Cases", 28, color=IN_C, weight="BOLD").move_to(P(-3.5, 1.85))
        h2 = T("Complement", 28, color=OUT_C, weight="BOLD").move_to(P(3.5, 1.85))
        left = [
            M(r"\text{2 women: } {}^4C_2 \times {}^6C_3 = 120", 34),
            M(r"\text{3 women: } {}^4C_3 \times {}^6C_2 = 60", 34),
            M(r"\text{4 women: } {}^4C_4 \times {}^6C_1 = 6", 34),
            M(r"120 + 60 + 6 = 186", 42, color=HL),
        ]
        right = [
            M(r"\text{all: } {}^{10}C_5 = 252", 34),
            M(r"\text{0 women: } {}^6C_5 = 6", 34),
            M(r"\text{1 woman: } {}^4C_1 \times {}^6C_4 = 60", 34),
            M(r"252 - 66 = 186", 42, color=HL),
        ]
        ys = [1.05, 0.3, -0.45, -1.4]
        for m, y in zip(left, ys):
            fit(m, 6.3).move_to(P(-3.5, y))
        for m, y in zip(right, ys):
            fit(m, 6.3).move_to(P(3.5, y))
        ok = VGroup(check(), T("two routes, one answer", 28, color=GREEN)).arrange(RIGHT, buff=0.3)
        ok.move_to(P(0, -2.8))

        with self.voiceover("Real committees have rules. Choose five people from six men and four women, "
                            "with at least two women.") as vo:
            self.play(FadeIn(hd), run_time=0.4)
            self.play(FadeIn(prob), run_time=0.8)
        with self.voiceover("Split into cases: exactly two women, three, or four. One hundred and twenty, "
                            "plus sixty, plus six. One hundred and eighty six.") as vo:
            self.play(FadeIn(h1), Create(div), run_time=0.6)
            for m in left[:3]:
                self.play(FadeIn(m, shift=0.15 * RIGHT), run_time=0.7)
            self.play(Write(left[3]), run_time=0.8)
        with self.voiceover("Or count the opposite. All committees: ten choose five, two hundred and fifty two. "
                            "Take away the ones with no women, six, and with exactly one woman, sixty. "
                            "Two hundred and fifty two minus sixty six is one hundred and eighty six again. "
                            "Two routes, one answer.") as vo:
            self.play(FadeIn(h2), run_time=0.4)
            for m in right[:3]:
                self.play(FadeIn(m, shift=0.15 * LEFT), run_time=0.7)
                self.wait(max(0.1, vo.duration * 0.08))
            self.play(Write(right[3]), run_time=0.8)
            self.play(FadeIn(ok), run_time=0.6)

        sc = M(r"{}^4C_1 \times {}^9C_4 = 4 \times 126 = 504", 52).move_to(P(0, 1.3))
        sc_l = T("“pick one woman first, then any 4”", 28, color=MUTED).move_to(P(0, 2.3))
        vs = M(r"\text{but only } {}^{10}C_5 = 252 \text{ committees exist}", 44).move_to(P(-0.4, -0.2))
        cx = cross_mark().next_to(vs, RIGHT, buff=0.4)
        with self.voiceover("Now a shortcut that fails. For at least one woman, pick one woman first, "
                            "then any four of the other nine. Four times one hundred and twenty six is five "
                            "hundred and four. That is more than the two hundred and fifty two committees "
                            "that exist at all.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(FadeIn(sc_l), run_time=0.6)
            self.play(Write(sc), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.3))
            self.play(Write(vs), run_time=1.0)
            self.play(FadeIn(cx, scale=1.3), run_time=0.4)

        heads = VGroup(
            T("first woman", 24, color=MUTED), T("then anyone", 24, color=MUTED), T("committee", 24, color=MUTED),
        )
        xs = [-4.0, -1.0, 2.9]
        for h, x in zip(heads, xs):
            h.move_to(P(x, 2.4))
        rows_data = [
            ("W_1", "W_2", r"\{W_1, W_2\}"), ("W_1", "M_1", r"\{W_1, M_1\}"), ("W_1", "M_2", r"\{W_1, M_2\}"),
            ("W_2", "W_1", r"\{W_1, W_2\}"), ("W_2", "M_1", r"\{W_2, M_1\}"), ("W_2", "M_2", r"\{W_2, M_2\}"),
        ]
        rows = VGroup()
        for i, (a, b, c) in enumerate(rows_data):
            y = 1.75 - 0.58 * i
            rows.add(VGroup(M(a, 36).move_to(P(xs[0], y)), M(b, 36).move_to(P(xs[1], y)),
                            M(c, 36).move_to(P(xs[2], y))))
        dup = VGroup(
            SurroundingRectangle(rows[0][2], buff=0.1, color=WARN, stroke_width=4, corner_radius=0.1),
            SurroundingRectangle(rows[3][2], buff=0.1, color=WARN, stroke_width=4, corner_radius=0.1),
        )
        same = T("same committee!", 26, color=WARN).move_to(P(5.6, (rows[0].get_y() + rows[3].get_y()) / 2))
        lesson = card(VGroup(
            T("A committee with k women is counted k times.", 28, color=INK),
            T("Use cases, or the complement.", 26, color=PRIMARY),
        ).arrange(DOWN, buff=0.18), color=PRIMARY).move_to(P(0, -2.75))
        with self.voiceover("Shrink it to see why. Two women, two men, choose two. The shortcut lists "
                            "woman one then woman two, and also woman two then woman one.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(FadeIn(heads), run_time=0.5)
            self.play(LaggedStart(*[FadeIn(r, shift=0.15 * DOWN) for r in rows], lag_ratio=0.25), run_time=2.0)
            self.play(Create(dup[0]), run_time=0.5)
            self.play(Create(dup[1]), run_time=0.5)
        with self.voiceover("That is the same committee, counted twice. A committee with k women gets counted "
                            "k times. Use cases, or the complement.") as vo:
            self.play(FadeIn(same), run_time=0.6)
            self.wait(max(0.1, vo.duration * 0.25))
            self.play(FadeIn(lesson, shift=0.2 * UP), run_time=0.8)

    # ------------------------------------------------------------ scene 5: choose, then arrange
    def s5(self):
        hd = header("2.4 · Choose, Then Arrange")
        parts = VGroup(M(r"{}^7C_3", 70, color=IN_C), M(r"\times", 60), M(r"{}^4C_2", 70, color=IN_C),
                       M(r"\times", 60), M(r"5!", 70, color=OUT_C)).arrange(RIGHT, buff=0.9).move_to(P(0, 1.7))
        braces = VGroup()
        for idx, (word, col) in zip((0, 2, 4), (("choose", IN_C), ("choose", IN_C), ("arrange", OUT_C))):
            b = Brace(parts[idx], DOWN, color=col)
            braces.add(VGroup(b, T(word, 24, color=col).next_to(b, DOWN, buff=0.1)))
        subs = VGroup(T("3 of 7 consonants", 22, color=MUTED), T("2 of 4 vowels", 22, color=MUTED),
                      T("all 5 letters", 22, color=MUTED))
        for s, idx in zip(subs, (0, 2, 4)):
            s.next_to(parts[idx], UP, buff=0.25)
        res = M(r"= 35 \times 6 \times 120 = 25\,200", 56, color=HL).move_to(P(0, -0.5))
        warn = card(T("Choose with C. Arrange once, at the end.", 30, color=PRIMARY), color=PRIMARY)
        warn.move_to(P(0, -2.2))
        bad = M(r"{}^7P_3 \times {}^4P_2 \times 5!", 40, color=MUTED).move_to(P(-0.5, -3.3))
        bx = cross_mark().scale(0.8).next_to(bad, RIGHT, buff=0.3)
        with self.voiceover("Many problems hide two stages: choose which things, then arrange them. "
                            "Words with three consonants from seven and two vowels from four:") as vo:
            self.play(FadeIn(hd), run_time=0.4)
            self.play(FadeIn(subs), run_time=0.8)
        with self.voiceover("seven choose three, times four choose two, times five factorial. "
                            "Twenty five thousand two hundred. Choose with C, and arrange only once, "
                            "at the end.") as vo:
            self.play(Write(parts[0]), FadeIn(braces[0]), run_time=0.7)
            self.play(Write(parts[1:3]), FadeIn(braces[1]), run_time=0.7)
            self.play(Write(parts[3:]), FadeIn(braces[2]), run_time=0.7)
            self.play(Write(res), run_time=1.0)
            self.play(FadeIn(warn), FadeIn(bad), FadeIn(bx), run_time=0.7)

        # ---- hexagon diagonals
        c, R = P(-3.6, -0.5), 2.3
        vs = [c + R * np.array([np.cos(np.pi / 2 + k * np.pi / 3), np.sin(np.pi / 2 + k * np.pi / 3), 0])
              for k in range(6)]
        hexa = Polygon(*vs, color=INK, stroke_width=4)
        vdots = VGroup(*[Dot(v, radius=0.1, color=INK) for v in vs])
        diags = VGroup(*[Line(vs[i], vs[j], color=IN_C, stroke_width=3)
                         for i in range(6) for j in range(i + 1, 6) if (j - i) % 6 not in (1, 5)])
        r1 = M(r"{}^6C_2 = 15 \text{ segments}", 44).move_to(P(3.3, 1.6))
        r2 = M(r"15 - 6 \text{ sides} = 9 \text{ diagonals}", 40).move_to(P(3.3, 0.5))
        fit(r2, 6.4)
        r3 = M(r"{}^nC_2 - n = \frac{n(n-3)}{2}", 54, color=HL).move_to(P(3.3, -1.3))
        b3 = SurroundingRectangle(r3, buff=0.25, corner_radius=0.15, color=HL, stroke_width=3)
        with self.voiceover("Shapes are selections of points. A hexagon's six corners give six choose two, "
                            "fifteen segments.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(FadeIn(vdots), run_time=0.4)
            self.play(Create(hexa), run_time=1.0)
            self.play(Write(r1), run_time=0.9)
        with self.voiceover("Six of them are sides, so nine are diagonals. In general, n times n minus three, "
                            "over two.") as vo:
            self.play(LaggedStart(*[Create(d) for d in diags], lag_ratio=0.15), run_time=1.6)
            self.play(Write(r2), run_time=0.9)
            self.play(Write(r3), Create(b3), run_time=1.1)

        # ---- collinear points
        a0, a1 = P(-6.2, -2.6), P(-1.0, 1.35)
        line = Line(a0 + 0.3 * (a0 - a1) / np.linalg.norm(a1 - a0), a1 + 0.3 * (a1 - a0) / np.linalg.norm(a1 - a0),
                    color=OUT_C, stroke_width=4)
        col_pts = [a0 + t * (a1 - a0) for t in (0.08, 0.36, 0.64, 0.92)]
        free_pts = [P(-5.8, 1.9), P(-4.2, 2.4), P(-2.3, 2.5), P(-0.9, -1.9), P(-3.0, -2.7),
                    P(-5.6, -0.3), P(-2.6, -0.8), P(-0.7, 0.2)]
        cdots = VGroup(*[Dot(p, radius=0.11, color=OUT_C) for p in col_pts])
        fdots = VGroup(*[Dot(p, radius=0.11, color=INK) for p in free_pts])
        t1 = T("12 points, 4 of them on one line", 26, color=MUTED).move_to(P(-3.5, -3.45))
        L1 = T("Lines", 28, color=INK, weight="BOLD").move_to(P(3.4, 2.2))
        L2 = M(r"{}^{12}C_2 - {}^4C_2 + 1", 44).move_to(P(3.4, 1.4))
        L3 = M(r"= 66 - 6 + 1 = 61", 44, color=HL).move_to(P(3.4, 0.6))
        K1 = T("Triangles", 28, color=INK, weight="BOLD").move_to(P(3.4, -0.5))
        K2 = M(r"{}^{12}C_3 - {}^4C_3", 44).move_to(P(3.4, -1.3))
        K3 = M(r"= 220 - 4 = 216", 44, color=HL).move_to(P(3.4, -2.1))
        with self.voiceover("Collinear points need care. Twelve points, and four of them sit on one line.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(FadeIn(fdots), FadeIn(cdots), FadeIn(t1), run_time=0.8)
            self.play(Create(line), run_time=0.8)
        with self.voiceover("Those four give four choose two, six pairs, but they all make the same line. "
                            "So subtract six and add that one line back: sixty one lines.") as vo:
            self.play(FadeIn(L1), Write(L2), run_time=1.0)
            self.play(Indicate(cdots, color=HL, scale_factor=1.6), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.2))
            self.play(Write(L3), run_time=0.9)
        with self.voiceover("For triangles, the four flat triples make nothing: two hundred and twenty minus "
                            "four, two hundred and sixteen.") as vo:
            self.play(FadeIn(K1), Write(K2), run_time=1.0)
            self.play(Write(K3), run_time=0.9)

    # ------------------------------------------------------------ scene 6: all possible selections
    def s6(self):
        hd = header("2.5 · All Possible Selections")
        root = P(-6.3, -0.45)
        lx = [-4.8, -3.2, -1.6]
        leaf_y = [2.05 - 0.68 * i for i in range(8)]

        def node_y(level, j):
            span = 8 // (2 ** (level + 1))
            ys = leaf_y[j * span:(j + 1) * span]
            return sum(ys) / len(ys)

        edges = VGroup()
        nodes = [VGroup(Dot(root, radius=0.08, color=INK))]
        for lev in range(3):
            lvl_nodes = VGroup()
            for j in range(2 ** (lev + 1)):
                parent = root if lev == 0 else P(lx[lev - 1], node_y(lev - 1, j // 2))
                pt = P(lx[lev], node_y(lev, j))
                is_in = j % 2 == 0
                edges.add(Line(parent, pt, color=IN_C if is_in else MUTED, stroke_width=4 if is_in else 3))
                lvl_nodes.add(Dot(pt, radius=0.08, color=IN_C if is_in else MUTED))
            nodes.append(lvl_nodes)
        levels = [VGroup(*[e for e in edges[a:b]]) for a, b in ((0, 2), (2, 6), (6, 14))]
        tops = VGroup(*[T(s, 24, color=INK).move_to(P(x, 2.75)) for s, x in
                        zip(("Onion", "Corn", "Paneer"), lx)])
        legend = VGroup(T("in", 22, color=IN_C), T("out", 22, color=MUTED)).arrange(RIGHT, buff=0.5)
        legend.move_to(P(-4.0, -3.35))
        counts = VGroup(*[M(str(3 - bin(i).count("1")), 32, color=HL).move_to(P(-1.05, leaf_y[i]))
                          for i in range(8)])
        e1 = M(r"2 \times 2 \times 2 = 8", 52).move_to(P(3.4, 1.8))
        e2 = M(r"n \text{ items: } 2^n", 52, color=HL).move_to(P(3.4, 0.7))
        e3 = M(r"1 + 3 + 3 + 1 = 8", 48).move_to(P(3.4, -0.7))
        e4 = M(r"{}^nC_0 + {}^nC_1 + \cdots + {}^nC_n = 2^n", 44, color=HL).move_to(P(3.4, -1.9))
        fit(e4, 6.2)
        with self.voiceover("Last question: choose any number of things. None, some, or all. "
                            "Walk past each topping and decide: in or out. Two choices each.") as vo:
            self.play(FadeIn(hd), FadeIn(nodes[0]), run_time=0.4)
            for k in range(3):
                self.play(FadeIn(tops[k]), Create(levels[k]), FadeIn(nodes[k + 1]),
                          run_time=min(1.2, vo.duration / 4))
            self.play(FadeIn(legend), run_time=0.4)
        with self.voiceover("Three toppings give two times two times two, eight pizzas, and n items give "
                            "two to the power n.") as vo:
            self.play(Write(e1), run_time=1.0)
            self.play(Write(e2), run_time=1.0)
        with self.voiceover("Now group those eight leaves by how many toppings are in. One, three, three, one. "
                            "That is the sum of three choose r. So the sum of n choose r, over every r, "
                            "is two to the power n.") as vo:
            self.play(LaggedStart(*[FadeIn(c) for c in counts], lag_ratio=0.12), run_time=1.4)
            self.play(Write(e3), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.2))
            self.play(Write(e4), run_time=1.2)

        # ---- identical items and divisors
        div = Line(P(0, 2.6), P(0, -3.0), color=GRID, stroke_width=3)
        apples = VGroup(*[Circle(radius=0.34, color=PRIMARY, stroke_width=3).set_fill(PRIMARY, 0.75)
                          for _ in range(3)]).arrange(RIGHT, buff=0.35).move_to(P(-3.6, 1.9))
        a_lab = T("3 identical apples", 26, color=INK).next_to(apples, DOWN, buff=0.25)
        opts = VGroup(*[tile(s, HL, w=0.9, size=30) for s in "0123"]).arrange(RIGHT, buff=0.3)
        opts.move_to(P(-3.6, 0.1))
        o_lab = T("how many?", 24, color=MUTED).next_to(opts, UP, buff=0.18)
        a_res = M(r"3 + 1 = 4 \text{ choices}", 44, color=HL).move_to(P(-3.6, -1.2))
        a_bad = M(r"2^3 = 8", 44, color=MUTED).move_to(P(-4.0, -2.35))
        a_x = cross_mark().scale(0.8).next_to(a_bad, RIGHT, buff=0.3)
        d1 = M(r"360 = 2^3 \times 3^2 \times 5^1", 48).move_to(P(3.6, 1.9))
        d2 = VGroup(M(r"\text{twos: } 0\text{--}3 \;(4)", 34), M(r"\text{threes: } 0\text{--}2 \;(3)", 34),
                    M(r"\text{fives: } 0\text{--}1 \;(2)", 34)).arrange(DOWN, buff=0.2, aligned_edge=LEFT)
        d2.move_to(P(3.6, 0.35))
        d3 = M(r"(3+1)(2+1)(1+1) = 24", 46, color=HL).move_to(P(3.6, -1.3))
        d4 = T("divisors of 360", 26, color=MUTED).move_to(P(3.6, -2.1))
        with self.voiceover("Identical items change the question. From three identical apples you only decide "
                            "how many: zero, one, two or three. Four options, not eight.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(FadeIn(apples), FadeIn(a_lab), Create(div), run_time=0.8)
            self.play(FadeIn(o_lab), LaggedStart(*[FadeIn(o, shift=0.15 * UP) for o in opts], lag_ratio=0.3),
                      run_time=1.6)
            self.play(Write(a_res), run_time=0.8)
            self.play(FadeIn(a_bad), FadeIn(a_x), run_time=0.5)
        with self.voiceover("Divisors work the same way. Three hundred and sixty is two cubed, times three "
                            "squared, times five. A divisor takes zero to three twos, zero to two threes, and "
                            "zero or one five. Four times three times two: twenty four divisors.") as vo:
            self.play(Write(d1), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(LaggedStart(*[FadeIn(m, shift=0.15 * RIGHT) for m in d2], lag_ratio=0.5), run_time=2.4)
            self.play(Write(d3), run_time=1.1)
            self.play(FadeIn(d4), run_time=0.5)

    # ------------------------------------------------------------ scene 7: recap
    def s7(self):
        kick = T("Chapter 2 in two questions", 34, color=PRIMARY, weight="BOLD").move_to(P(0, 3.1))

        def qcard(title, lines, color, x):
            body = VGroup(T(title, 30, color=color, weight="BOLD"),
                          *[T(s, 23, color=INK) for s in lines]).arrange(DOWN, buff=0.2)
            r = RoundedRectangle(width=6.3, height=2.5, corner_radius=0.2, color=color, stroke_width=3)
            r.set_fill(WHITE, opacity=0.9)
            body.move_to(r)
            return VGroup(r, body).move_to(P(x, 1.1))

        c1 = qcard("Arrange or choose?", ["Swap two chosen things.", "Outcome changes: P.   Same: C."],
                   IN_C, -3.35)
        c2 = qcard("Cases or complement?", ["Count the shorter side.", "Never pre-place one item."],
                   OUT_C, 3.35)
        chips = VGroup(tile("collinear points", PURPLE, size=24), tile("identical items: (p+1)(q+1)", ACCENT, size=24),
                       tile("choose, then arrange", GREEN, size=24)).arrange(RIGHT, buff=0.35)
        fit(chips, 13.0).move_to(P(0, -1.3))
        end = T("Now open lesson 2.1 and try it yourself.", 30, color=INK).move_to(P(0, -2.8))
        with self.voiceover("Chapter two comes down to two questions. First: arrange, or choose? "
                            "Swap two chosen things. If the outcome changes, use P. If not, use C.") as vo:
            self.play(FadeIn(kick), run_time=0.6)
            self.play(FadeIn(c1, shift=0.2 * UP), run_time=0.9)
        with self.voiceover("Second: cases, or complement? Count whichever side is shorter, and never "
                            "guarantee a condition by placing one item first.") as vo:
            self.play(FadeIn(c2, shift=0.2 * UP), run_time=0.9)
        with self.voiceover("Then watch for collinear points, identical items, and problems that choose, "
                            "then arrange. Now open lesson two point one, and try it yourself.") as vo:
            self.play(LaggedStart(*[FadeIn(c, shift=0.15 * UP) for c in chips], lag_ratio=0.4), run_time=1.6)
            self.wait(max(0.1, vo.duration * 0.3))
            self.play(FadeIn(end), run_time=0.7)
        self.wait(1.0)
