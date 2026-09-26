import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

# Chapter colour roles (light background).
C1 = PRIMARY  # slots / first kind / A1 / vowels
C2 = SECONDARY  # second kind / A2 / consonants
HL = ManimColor("#D19A00")  # results, totals (deep gold)
WARN = PRIMARY
SILVER = ManimColor("#8C8C8C")
BRONZE = ManimColor("#B06A2C")

# `say` reads a lone capital "A" as the article; force the letter name.
LA = "[[char LTRL]]A[[char NORM]]"


def T(s, size=30, **kw):
    return Text(s, font_size=size, **kw)


def M(*parts, size=40, **kw):
    if len(parts) > 1 and isinstance(parts[-1], (int, float)):
        size = parts[-1]
        parts = parts[:-1]
    return MathTex(*parts, font_size=size, **kw)


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
    box.set_fill(WHITE, opacity=0.9)
    return VGroup(box, mob)


def tile(s, color=INK, size=0.75, tex=False, fs=34):
    sq = RoundedRectangle(width=size, height=size, corner_radius=0.12, color=color, stroke_width=3)
    sq.set_fill(WHITE, 1)
    if tex:
        lab = MathTex(s, font_size=fs, color=color)
    else:
        lab = Text(s, font_size=fs, color=color, weight="BOLD")
    lab.move_to(sq)
    g = VGroup(sq, lab)
    g.letter = s
    return g


def word(letters, colors=None, size=0.6, fs=28, buff=0.08, tex=False):
    colors = colors or [INK] * len(letters)
    return VGroup(*[tile(l, c, size=size, fs=fs, tex=tex) for l, c in zip(letters, colors)]).arrange(RIGHT, buff=buff)


def slot(caption, color=C1, w=1.2, h=1.0, cap_size=22):
    box = RoundedRectangle(width=w, height=h, corner_radius=0.15, color=color, stroke_width=4)
    box.set_fill(WHITE, 1)
    cap = T(caption, cap_size, color=MUTED).next_to(box, DOWN, buff=0.15)
    g = VGroup(box, cap)
    g.box = box
    return g


def header(s):
    return T(s, 22, color=MUTED).to_corner(UL, buff=0.35)


class PcCh1Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Permutations, Combinations & the Binomial Theorem",
            "Chapter 1 · Permutations: Arranging Things",
            "Chapter one. Permutations: arranging things.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7, self.s8):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ scene 1: podium
    def s1(self):
        hd = header("1.1 · Arranging r out of n")
        runners = VGroup()
        for i in range(8):
            c = Circle(radius=0.36, color=INK, stroke_width=3).set_fill(WHITE, 1)
            n = T(str(i + 1), 26, weight="BOLD").move_to(c)
            runners.add(VGroup(c, n))
        runners.arrange(RIGHT, buff=0.35).move_to(P(0, 2.2))
        rl = T("8 runners", 24, color=MUTED).next_to(runners, UP, buff=0.2)
        slots = VGroup(slot("gold", HL), slot("silver", SILVER), slot("bronze", BRONZE)).arrange(RIGHT, buff=0.9)
        slots.move_to(P(-1.6, -0.6))
        with self.voiceover("Eight runners, three medals: gold, silver, bronze. How many different podiums are possible?") as vo:
            self.play(FadeIn(hd), LaggedStart(*[FadeIn(r, shift=0.2 * DOWN) for r in runners], lag_ratio=0.08),
                      FadeIn(rl), run_time=min(2.0, vo.duration * 0.4))
            self.play(LaggedStart(*[FadeIn(s, shift=0.2 * UP) for s in slots], lag_ratio=0.3), run_time=1.5)
        nums = ["8", "7", "6"]
        cols = [HL, SILVER, BRONZE]
        winners = [2, 5, 0]
        text = ("Draw three slots, one per medal. Gold can go to any of eight runners. Whoever won gold can't also win "
                "silver, so silver has seven candidates, and bronze has six. Eight times seven times six: three "
                "hundred and thirty six podiums.")
        with self.voiceover(text) as vo:
            step = vo.duration * 0.8 / 4
            filled = []
            for k in range(3):
                n = M(nums[k], 64, color=cols[k]).move_to(slots[k].box)
                self.play(FadeIn(n, scale=1.4),
                          runners[winners[k]][0].animate.set_fill(cols[k], 0.6),
                          run_time=min(1.2, step))
                self.wait(max(0, step - 1.2))
                filled.append(n)
            times = VGroup(*[M(r"\times", 48).move_to((slots[k].box.get_right() + slots[k + 1].box.get_left()) / 2)
                             for k in range(2)])
            eq = M("= 336", 64, color=HL).next_to(slots[2].box, RIGHT, buff=0.5)
            self.play(FadeIn(times), Write(eq), run_time=1.2)

    # ------------------------------------------------------------ scene 2: nPr
    def s2(self):
        hd = header("1.1 · Arranging r out of n")
        letters = word(list("ABCD"), size=0.7, fs=32).move_to(P(-4.3, 2.3))
        sl = VGroup(slot("1st", w=1.1, h=0.9), slot("2nd", w=1.1, h=0.9)).arrange(RIGHT, buff=0.7).move_to(P(-4.3, 0.5))
        n4 = M("4", 56, color=C1).move_to(sl[0].box)
        n3 = M("3", 56, color=C1).move_to(sl[1].box)
        tm = M(r"\times", 44).move_to((sl[0].box.get_right() + sl[1].box.get_left()) / 2)
        pred = M(r"4 \times 3 = 12", 52, color=HL).move_to(P(-4.3, -1.4))
        rows = VGroup()
        for a in "ABCD":
            rows.add(VGroup(*[word([a, b], [C1, C2], size=0.55, fs=26, buff=0.04) for b in "ABCD" if b != a])
                     .arrange(RIGHT, buff=0.5))
        rows.arrange(DOWN, buff=0.35).move_to(P(2.6, 0.2))
        text = (f"Shrink the problem until you can list it. Four letters, {LA}, B, C, D, and two slots. The slots "
                "predict four times three, twelve. And here are all twelve.")
        with self.voiceover(text) as vo:
            self.play(FadeIn(hd), FadeIn(letters), FadeIn(sl), run_time=1.0)
            self.play(FadeIn(n4, scale=1.4), run_time=0.6)
            self.play(FadeIn(n3, scale=1.4), FadeIn(tm), run_time=0.6)
            self.play(Write(pred), run_time=0.8)
            rt = max(2.0, vo.duration - 3.5)
            self.play(LaggedStart(*[FadeIn(r, shift=0.2 * LEFT) for r in rows], lag_ratio=0.35), run_time=rt)
        self.clear_scene()

        l1 = M(r"{}^{n}P_{r}", r"=", r"n(n-1)(n-2)\cdots(n-r+1)", size=52)
        br = Brace(l1[2], DOWN, color=MUTED)
        brl = T("r factors", 22, color=MUTED).next_to(br, DOWN, buff=0.1)
        l2 = M(r"= \frac{n(n-1)\cdots(n-r+1)\,\cdot\,(n-r)!}{(n-r)!}", size=48)
        l3 = M(r"{}^{n}P_{r} = \frac{n!}{(n-r)!}", size=64, color=C1)
        l1.move_to(P(0, 2.2))
        br.next_to(l1[2], DOWN, buff=0.1)
        brl.next_to(br, DOWN, buff=0.08)
        l2.move_to(P(0.6, 0.2))
        l3.move_to(P(0, -2.0))
        box3 = SurroundingRectangle(l3, buff=0.25, corner_radius=0.15, color=C1, stroke_width=3)
        text = ("In general, r slots filled from n different things give n, times n minus one, and so on, down to n "
                "minus r plus one. That is the front of n factorial with the tail cut off. Divide out the missing tail "
                "and n P r equals n factorial over n minus r factorial.")
        with self.voiceover(text) as vo:
            self.play(FadeIn(hd), Write(l1), run_time=min(3.0, vo.duration * 0.3))
            self.play(GrowFromCenter(br), FadeIn(brl), run_time=0.8)
            self.play(Write(l2), run_time=min(2.5, vo.duration * 0.25))
            self.wait(max(0, vo.duration * 0.25 - 1))
            self.play(Write(l3), Create(box3), run_time=1.5)
        self.play(FadeOut(VGroup(l1, br, brl, l2)), VGroup(l3, box3).animate.move_to(P(0, 1.9)), run_time=0.8)
        c1 = card(VGroup(T("compute", 22, color=MUTED), M(r"{}^{10}P_{3} = 10\cdot 9\cdot 8 = 720", 40))
                  .arrange(DOWN, buff=0.2))
        c2 = card(VGroup(T("edge cases", 22, color=MUTED), M(r"{}^{n}P_{n} = \frac{n!}{0!} = n!", 40),
                         M(r"{}^{n}P_{0} = \frac{n!}{n!} = 1", 40)).arrange(DOWN, buff=0.2))
        VGroup(c1, c2).arrange(RIGHT, buff=0.8, aligned_edge=UP).move_to(P(0, -1.1))
        text = ("Use the product form to compute, and the factorial form for algebra. Arranging all n things gives n "
                "factorial. Arranging none gives one, which is exactly why zero factorial is one.")
        with self.voiceover(text) as vo:
            self.play(FadeIn(c1, shift=0.2 * UP), run_time=1.0)
            self.wait(max(0, vo.duration * 0.3 - 1))
            self.play(FadeIn(c2, shift=0.2 * UP), run_time=1.0)

    # ------------------------------------------------------------ scene 3: repetition
    def s3(self):
        hd = header("1.2 · When Repetition Is Allowed")
        sl = VGroup(*[slot(f"digit {k}", w=1.1, h=1.0) for k in range(1, 5)]).arrange(RIGHT, buff=0.7).move_to(P(0, 1.4))
        tens = VGroup(*[M("10", 52, color=C1).move_to(s.box) for s in sl])
        tms = VGroup(*[M(r"\times", 40).move_to((sl[k].box.get_right() + sl[k + 1].box.get_left()) / 2)
                       for k in range(3)])
        res = M(r"10^4 = 10\,000", 60, color=HL).move_to(P(0, -1.0))
        text = ("Now a phone PIN. Using a digit doesn't use it up, so every one of the four slots sees all ten digits. "
                "Ten to the power four: ten thousand PINs.")
        with self.voiceover(text) as vo:
            self.play(FadeIn(hd), FadeIn(sl), run_time=1.0)
            self.play(LaggedStart(*[FadeIn(t, scale=1.4) for t in tens], lag_ratio=0.4), FadeIn(tms),
                      run_time=min(3.0, vo.duration * 0.5))
            self.play(Write(res), run_time=1.0)
        self.clear_scene()

        big = MathTex("n", "^{r}", font_size=150, color=INK).move_to(P(0, 0.2))
        big[0].set_color(C1)
        big[1].set_color(C2)
        a1 = Arrow(P(-3.2, -1.6), big[0].get_bottom() + 0.1 * DOWN, color=C1, buff=0.1)
        t1 = T("choices per slot", 28, color=C1).next_to(a1.get_start(), DOWN, buff=0.15)
        a2 = Arrow(P(3.2, 2.2), big[1].get_right() + 0.1 * RIGHT, color=C2, buff=0.1)
        t2 = T("number of slots", 28, color=C2).next_to(a2.get_start(), UP, buff=0.15)
        text = ("In general, n choices in each of r slots gives n to the power r. The base is the choices per slot. "
                "The exponent is the number of slots.")
        with self.voiceover(text) as vo:
            self.play(FadeIn(hd), Write(big), run_time=1.2)
            self.wait(max(0, vo.duration * 0.35 - 1.2))
            self.play(GrowArrow(a1), FadeIn(t1), run_time=1.0)
            self.wait(0.8)
            self.play(GrowArrow(a2), FadeIn(t2), run_time=1.0)
        self.clear_scene()

        q = T("5 letters into 3 postboxes", 34, weight="BOLD").move_to(P(0, 2.6))
        sl = VGroup(*[slot(f"letter {k}", color=C2, w=1.0, h=0.9, cap_size=20) for k in range(1, 6)])
        sl.arrange(RIGHT, buff=0.55).move_to(P(0, 0.8))
        threes = VGroup(*[M("3", 50, color=C1).move_to(s.box) for s in sl])
        wrong = M("5^3", 60).move_to(P(-2.8, -1.6))
        xm = cross_mark().next_to(wrong, RIGHT, buff=0.3)
        right = M(r"3^5 = 243", 60, color=HL).move_to(P(2.2, -1.6))
        ck = check().next_to(right, RIGHT, buff=0.3)
        text = ("Careful with this one. Five letters go into three postboxes. Is it five cubed, or three to the power "
                "five? Each letter is a slot, and each letter picks one of three boxes. So it's three to the power "
                "five: two hundred and forty three.")
        with self.voiceover(text) as vo:
            self.play(FadeIn(hd), FadeIn(q), run_time=0.8)
            self.play(FadeIn(wrong), run_time=0.6)
            self.wait(max(0, vo.duration * 0.3 - 1.4))
            self.play(FadeIn(sl), run_time=0.8)
            self.play(LaggedStart(*[FadeIn(t, scale=1.4) for t in threes], lag_ratio=0.3), run_time=2.0)
            self.play(FadeIn(xm), Write(right), FadeIn(ck), run_time=1.2)

    # ------------------------------------------------------------ scene 4: identical objects
    def s4(self):
        hd = header("1.3 · Arranging with Identical Objects")
        src = word(list("AAB"), size=0.75, fs=34).move_to(P(-4.5, 2.2))
        guess = M(r"3! = 6\ ?", 48).next_to(src, DOWN, buff=0.4)
        seen = VGroup(*[word(list(w), size=0.6, fs=28, buff=0.05) for w in ("AAB", "ABA", "BAA")]).arrange(RIGHT, buff=1.4)
        seen.move_to(P(1.8, 2.2))
        text = (f"How many words can you make from {LA}, {LA}, B? Three factorial is six, but the list shows only "
                "three. Where did the others go?")
        with self.voiceover(text) as vo:
            self.play(FadeIn(hd), FadeIn(src), run_time=0.8)
            self.play(Write(guess), run_time=0.8)
            self.play(LaggedStart(*[FadeIn(s, shift=0.2 * DOWN) for s in seen], lag_ratio=0.4),
                      run_time=min(2.5, vo.duration * 0.4))

        A1, A2 = ("A_1", C1), ("A_2", C2)
        B = ("B", INK)
        pairs = [
            [[A1, A2, B], [A2, A1, B]],
            [[A1, B, A2], [A2, B, A1]],
            [[B, A1, A2], [B, A2, A1]],
        ]
        cols = VGroup()
        for pr in pairs:
            col = VGroup(*[VGroup(*[tile(s, c, size=0.6, fs=30, tex=True) for s, c in w]).arrange(RIGHT, buff=0.05)
                           for w in pr]).arrange(DOWN, buff=0.2)
            cols.add(col)
        for col, s in zip(cols, seen):
            col.next_to(s, DOWN, buff=0.7)
        braces = VGroup(*[Brace(col, RIGHT, color=MUTED) for col in cols])
        blabels = VGroup(*[M("2!", 32, color=MUTED).next_to(b, RIGHT, buff=0.08) for b in braces])
        res = M(r"\frac{3!}{2!} = \frac{6}{2} = 3", 52, color=HL).move_to(P(-4.3, -0.4))
        text = ("Paint the two A's different colours. Now there are six genuinely different arrangements. Wash off the "
                "paint, and they collapse in pairs. Every word is counted exactly two factorial times, so divide. "
                "Six over two: three.")
        with self.voiceover(text) as vo:
            self.play(LaggedStart(*[FadeIn(c, shift=0.2 * UP) for c in cols], lag_ratio=0.3),
                      run_time=min(2.5, vo.duration * 0.25))
            self.wait(max(0, vo.duration * 0.15))
            self.play(GrowFromCenter(braces), FadeIn(blabels), run_time=1.0)
            self.play(*[Indicate(s, color=HL, scale_factor=1.15) for s in seen], run_time=1.2)
            self.play(Write(res), run_time=1.2)
        self.play(FadeOut(VGroup(cols, braces, blabels, guess)), run_time=0.6)

        b1 = M(r"\text{BANANA:}\quad \frac{6!}{3!\,2!} = 60", 48).move_to(P(0.8, 0.6))
        b2 = M(r"\text{MISSISSIPPI:}\quad \frac{11!}{4!\,4!\,2!} = 34\,650", 48).move_to(P(0.8, -0.8))
        VGroup(b1, b2).arrange(DOWN, buff=0.5, aligned_edge=LEFT).move_to(P(1.8, 0.2))
        rule = card(M(r"\text{overcount is a factor: divide by } p!\,q!\cdots,\ \text{never subtract}", 38,
                      color=C1)).move_to(P(0, -2.6))
        text = ("The same move works everywhere. Banana has three A's and two N's: six factorial, over three factorial "
                "times two factorial. Sixty. Mississippi gives eleven factorial, over four factorial, four factorial, "
                "two factorial: thirty four thousand, six hundred and fifty. The overcount is a factor, so you divide. "
                "Never subtract.")
        with self.voiceover(text) as vo:
            self.play(FadeOut(res), Write(b1), run_time=1.5)
            self.wait(max(0, vo.duration * 0.3 - 1.5))
            self.play(Write(b2), run_time=1.8)
            self.wait(max(0, vo.duration * 0.35 - 1.8))
            self.play(FadeIn(rule, shift=0.2 * UP), run_time=1.0)

    # ------------------------------------------------------------ scene 5: circular
    def s5(self):
        hd = header("1.4 · Circular Arrangements")
        ctr = P(-3.6, -0.2)
        R = 1.5
        table = Circle(radius=R, color=MUTED, stroke_width=3).set_fill(ManimColor("#F3D9C9"), 0.6).move_to(ctr)
        names = "ABCD"
        cols = [C1, C2, PURPLE, ACCENT]
        off = ValueTracker(0.0)

        def seats():
            g = VGroup()
            for k, (n, c) in enumerate(zip(names, cols)):
                ang = PI / 2 - k * PI / 2 - off.get_value()  # clockwise from the top
                pos = ctr + (R + 0.55) * np.array([np.cos(ang), np.sin(ang), 0])
                g.add(tile(n, c, size=0.7, fs=32).move_to(pos))
            return g

        ring = always_redraw(seats)
        text = ("Four friends at a round table. Now rotate everyone one seat. Each person has the same neighbour on the "
                "left and the same on the right. Nothing changed. We just started reading at a different chair.")
        same = T("same seating", 28, color=GREEN).next_to(table, DOWN, buff=1.0)
        with self.voiceover(text) as vo:
            self.play(FadeIn(hd), FadeIn(table), FadeIn(ring), run_time=1.0)
            self.play(off.animate.set_value(PI / 2), run_time=min(3.0, vo.duration * 0.35))
            self.play(FadeIn(same), run_time=0.8)
        ring.clear_updaters()

        reads = VGroup(*[word(list(s), [cols[names.index(ch)] for ch in s], size=0.55, fs=26, buff=0.04)
                         for s in ("ABCD", "BCDA", "CDAB", "DABC")]).arrange(DOWN, buff=0.22).move_to(P(1.2, 0.9))
        br = Brace(reads, RIGHT, color=MUTED)
        brl = T("1 circle", 26, color=MUTED).next_to(br, RIGHT, buff=0.1)
        f1 = M(r"\frac{n!}{n} = (n-1)!", 54, color=C1).move_to(P(3.2, -1.7))
        f2 = M(r"\frac{4!}{4} = 6", 48, color=HL).next_to(f1, DOWN, buff=0.4)
        text = ("A circle can be read from any of its n seats, so the n factorial lines count every circle n times. "
                "n factorial over n is n minus one factorial. For four friends: six seatings. Or seat one person first "
                "as the reference, and fill the rest like a line.")
        with self.voiceover(text) as vo:
            self.play(FadeOut(same), LaggedStart(*[FadeIn(r, shift=0.2 * LEFT) for r in reads], lag_ratio=0.3),
                      run_time=2.0)
            self.play(GrowFromCenter(br), FadeIn(brl), run_time=0.8)
            self.wait(max(0, vo.duration * 0.3 - 2.8))
            self.play(Write(f1), run_time=1.2)
            self.play(Write(f2), run_time=1.0)
            ref = SurroundingRectangle(ring[0], buff=0.1, corner_radius=0.12, color=HL, stroke_width=5)
            refl = T("reference", 22, color=HL).next_to(ref, DOWN, buff=0.1)
            self.play(Create(ref), FadeIn(refl), run_time=1.2)
        self.clear_scene()

        def necklace(order, center):
            circ = Circle(radius=1.1, color=MUTED, stroke_width=3).move_to(center)
            beads = VGroup()
            for k, n in enumerate(order):
                ang = PI / 2 - k * PI / 2
                pos = center + 1.1 * np.array([np.cos(ang), np.sin(ang), 0])
                c = cols[names.index(n)]
                d = Circle(radius=0.32, color=c, stroke_width=3).set_fill(WHITE, 1).move_to(pos)
                beads.add(VGroup(d, T(n, 24, color=c, weight="BOLD").move_to(pos)))
            return VGroup(circ, beads)

        n1 = necklace("ABCD", P(-2.2, 1.0))
        n2 = necklace("ADCB", P(2.2, 1.0))
        flip = DoubleArrow(P(-0.6, 1.0), P(0.6, 1.0), color=HL, buff=0)
        fl = T("flip", 24, color=HL).next_to(flip, UP, buff=0.1)
        f3 = M(r"\text{necklace: } \frac{(n-1)!}{2}\quad (n \ge 3)", 44, color=C1)
        f4 = M(r"\text{people at a table: } (n-1)!", 44, color=C2)
        VGroup(f3, f4).arrange(DOWN, buff=0.4, aligned_edge=LEFT).move_to(P(0, -2.2))
        f3.shift(0 * RIGHT)
        text = ("A necklace can also be flipped over, so each arrangement matches its mirror image. Then divide by two "
                "as well, for three or more beads. But people at a table can't be flipped: their left and right would "
                "swap.")
        with self.voiceover(text) as vo:
            self.play(FadeIn(hd), FadeIn(n1), run_time=1.0)
            self.play(GrowFromCenter(flip), FadeIn(fl), TransformFromCopy(n1, n2), run_time=1.5)
            self.wait(max(0, vo.duration * 0.35 - 2.5))
            self.play(Write(f3), run_time=1.2)
            self.wait(max(0, vo.duration * 0.25 - 1.2))
            self.play(Write(f4), run_time=1.2)

    # ------------------------------------------------------------ scene 6: together / apart
    def s6(self):
        hd = header("1.5 · Together, Apart, and Fixed Positions")
        letters = list("ORANGE")
        isv = [ch in "OAE" for ch in letters]
        tiles = VGroup(*[tile(ch, C1 if v else C2, size=0.8, fs=36) for ch, v in zip(letters, isv)])
        tiles.arrange(RIGHT, buff=0.15).move_to(P(0, 2.0))
        text = ("Arrange the letters of orange, keeping the vowels O, "
                f"{LA}, E together. Glue them into one block. Now there are four units: four factorial, twenty four. "
                "Then arrange inside the block: three factorial, six. One hundred and forty four.")
        vow = VGroup(*[t for t, v in zip(tiles, isv) if v])
        con = VGroup(*[t for t, v in zip(tiles, isv) if not v])
        with self.voiceover(text) as vo:
            self.play(FadeIn(hd), FadeIn(tiles), run_time=1.0)
            # target: [OAE] R N G
            tgt_v = VGroup(*[v.copy() for v in vow]).arrange(RIGHT, buff=0.05)
            tgt_c = VGroup(*[c.copy() for c in con]).arrange(RIGHT, buff=0.4)
            row = VGroup(tgt_v, tgt_c).arrange(RIGHT, buff=0.4).move_to(P(0, 0.5))
            blk = SurroundingRectangle(tgt_v, buff=0.12, corner_radius=0.15, color=C1, stroke_width=4)
            self.wait(max(0, vo.duration * 0.2 - 1))
            self.play(*[Transform(a.copy(), b) for a, b in zip(vow, tgt_v)],
                      *[Transform(a.copy(), b) for a, b in zip(con, tgt_c)], run_time=1.5)
            self.play(Create(blk), run_time=0.6)
            units = T("4 units", 24, color=MUTED).next_to(row, DOWN, buff=0.3)
            f = M(r"4! \times 3! = 24 \times 6 = 144", 52, color=HL).move_to(P(0, -1.6))
            self.play(FadeIn(units), run_time=0.6)
            self.wait(max(0, vo.duration * 0.25 - 0.6))
            self.play(Write(f), run_time=1.4)
        # keep the header and the ORANGE tiles
        self.play(*[FadeOut(m) for m in self.mobjects if m not in (hd, tiles)], run_time=0.6)

        cg = VGroup(*[c.copy() for c in con]).arrange(RIGHT, buff=1.3).move_to(P(0, 0.4))
        gaps = VGroup()
        xs = [cg[0].get_left()[0] - 0.65] + [(cg[k].get_right()[0] + cg[k + 1].get_left()[0]) / 2 for k in range(2)] \
            + [cg[2].get_right()[0] + 0.65]
        for x in xs:
            gaps.add(Line(P(x - 0.3, 0.4 - 0.45), P(x + 0.3, 0.4 - 0.45), color=HL, stroke_width=6))
        gl = T("4 gaps", 24, color=HL).next_to(gaps, DOWN, buff=0.25)
        f = M(r"3! \times {}^{4}P_{3} = 6 \times 24 = 144", 52, color=HL).move_to(P(0, -1.8))
        text = ("Now no two vowels may touch. Place the consonants first: three factorial ways. They leave four gaps, "
                "counting both ends. Drop the three vowels into three different gaps: four P three, twenty four. Six "
                "times twenty four: again one hundred and forty four.")
        with self.voiceover(text) as vo:
            self.play(*[TransformFromCopy(a, b) for a, b in zip(con, cg)], run_time=1.2)
            self.wait(max(0, vo.duration * 0.15 - 1.2))
            self.play(LaggedStart(*[Create(g) for g in gaps], lag_ratio=0.2), FadeIn(gl), run_time=1.2)
            self.wait(max(0, vo.duration * 0.15))
            picks = [0, 2, 3]
            vg = VGroup(*[v.copy() for v in vow])
            self.play(*[vg[i].animate.move_to(P(xs[picks[i]], 0.4)) for i in range(3)], run_time=1.5)
            self.play(Write(f), run_time=1.4)
        self.play(*[FadeOut(m) for m in self.mobjects if m not in (hd, tiles)], run_time=0.6)

        f = M(r"6! - 144 = 720 - 144 = 576", 52, color=HL).move_to(P(0, 0.6))
        fl = T("not all together", 26, color=MUTED).next_to(f, UP, buff=0.2)
        ex = word(list("OARNEG"), [C1, C1, C2, C2, C1, C2], size=0.6, fs=28, buff=0.06).move_to(P(-3.6, -1.3))
        touch = SurroundingRectangle(VGroup(ex[0], ex[1]), buff=0.08, color=WARN, stroke_width=3)
        exl = T("counts here, but O and A touch", 22, color=WARN).next_to(ex, DOWN, buff=0.2)
        warn = fit(card(M(r"\text{not all together} \;\neq\; \text{no two together}", 40, color=C1)), 6.2).move_to(P(3.3, -1.4))
        text = ("Not all together is the total minus the glued count: seven hundred and twenty minus one hundred and "
                "forty four, five hundred and seventy six. That is a different question from no two together, because "
                "two vowels can still touch.")
        with self.voiceover(text) as vo:
            self.play(FadeIn(fl), Write(f), run_time=1.5)
            self.wait(max(0, vo.duration * 0.45 - 1.5))
            self.play(FadeIn(ex), Create(touch), FadeIn(exl), run_time=1.0)
            self.play(FadeIn(warn, shift=0.2 * UP), run_time=1.0)
        # warn card might overlap example: keep them side by side via positions above

    # ------------------------------------------------------------ scene 7: rank
    def s7(self):
        hd = header("1.6 · Rank of a Word in the Dictionary")
        tiles = word(list("MOTHER"), size=0.75, fs=34, buff=0.1).move_to(P(-3.2, 2.3))
        srt = M(r"\text{sorted: } E\ H\ M\ O\ R\ T", 36, color=MUTED).next_to(tiles, DOWN, buff=0.3)
        q = T("Count the words that come before it.", 28, color=C1).move_to(P(3.2, 2.3))
        fit(q, 6.0)
        text = ("Where does mother land, when all its arrangements are listed in dictionary order? Don't list them. "
                "Count the words that come before it.")
        with self.voiceover(text) as vo:
            self.play(FadeIn(hd), FadeIn(tiles), run_time=1.0)
            self.play(FadeIn(srt), run_time=0.8)
            self.play(FadeIn(q), run_time=0.8)

        rows_tex = [
            (r"M:", r"\{E, H\}", r"2 \times 5! = 240"),
            (r"O:", r"\{E, H\}", r"2 \times 4! = 48"),
            (r"T:", r"\{E, H, R\}", r"3 \times 3! = 18"),
            (r"H:", r"\{E\}", r"1 \times 2! = 2"),
            (r"E,\ R:", r"\{\,\}", r"0"),
        ]
        rows = VGroup()
        for a, b, c in rows_tex:
            rows.add(VGroup(M(a, 38), M(b, 38, color=C2), M(c, 38, color=INK)))
        # column layout
        y0 = 0.3
        for i, r in enumerate(rows):
            y = y0 - i * 0.62
            r[0].move_to(P(-5.2, y), aligned_edge=LEFT)
            r[0].align_to(P(-5.6, 0), LEFT)
            r[1].move_to(P(-2.6, y))
            r[2].move_to(P(0.4, y), aligned_edge=LEFT)
            r[2].align_to(P(-0.6, 0), LEFT)
        hdrs = VGroup(T("letter", 22, color=MUTED).move_to(P(-5.0, y0 + 0.65)),
                      T("smaller, unused", 22, color=MUTED).move_to(P(-2.6, y0 + 0.65)),
                      T("words before", 22, color=MUTED).move_to(P(0.4, y0 + 0.65)))
        text = ("The first letter is M. E or H could sit there instead, each followed by five factorial arrangements: "
                "two hundred and forty. The second letter is O. Among the unused letters, E and H are smaller: two "
                "times four factorial, forty eight. Third, T: E, H and R are smaller. Three times three factorial, "
                "eighteen. Fourth, H: only E is smaller, two. After that, nothing.")
        with self.voiceover(text) as vo:
            self.play(FadeOut(q), FadeIn(hdrs), run_time=0.6)
            share = (vo.duration - 1.0) / 5
            for i, r in enumerate(rows):
                idx = [0, 1, 2, 3, 4][i]
                hl = SurroundingRectangle(tiles[idx] if i < 4 else VGroup(tiles[4], tiles[5]), buff=0.06,
                                          color=HL, stroke_width=4)
                self.play(Create(hl), FadeIn(r, shift=0.15 * RIGHT), run_time=min(1.0, share * 0.5))
                self.wait(max(0, share - 1.4))
                anims = [FadeOut(hl)] + ([tiles[idx].animate.set_opacity(0.35)] if i < 4 else [])
                self.play(*anims, run_time=0.4)

        tot = fit(M(r"240 + 48 + 18 + 2 = 308", 38), 4.2).move_to(P(4.4, 0.2))
        rank = fit(M(r"\text{rank} = 308 + 1 = 309", 46, color=HL), 4.0).next_to(tot, DOWN, buff=0.6)
        rb = SurroundingRectangle(rank, buff=0.2, corner_radius=0.15, color=HL, stroke_width=3)
        VGroup(tot, rank, rb)
        text = ("Three hundred and eight words come first, so mother is word number three hundred and nine. Don't "
                "forget the plus one.")
        with self.voiceover(text) as vo:
            self.play(tiles.animate.set_opacity(1), Write(tot), run_time=1.4)
            self.play(Write(rank), Create(rb), run_time=1.4)

    # ------------------------------------------------------------ scene 8: recap
    def s8(self):
        title = T("Chapter 1 in one table", 36, weight="BOLD").move_to(P(0, 3.1))
        rows = [
            ("r from n, no repeats", r"\frac{n!}{(n-r)!}"),
            ("repeats allowed", r"n^{r}"),
            ("identical items", r"\frac{n!}{p!\,q!\cdots}"),
            ("round table", r"(n-1)!"),
            ("must be together", r"\text{glue into a block}"),
            ("must be apart", r"\text{place into the gaps}"),
        ]
        grid = VGroup()
        for i, (a, b) in enumerate(rows):
            y = 2.05 - i * 0.92
            la = T(a, 28, color=INK).move_to(P(-2.2, y), aligned_edge=RIGHT)
            la.align_to(P(-0.6, 0), RIGHT)
            rb = M(b, 46, color=C1 if i < 4 else C2)
            rb.align_to(P(0.4, 0), LEFT).set_y(y)
            grid.add(VGroup(la, rb))
        line = Line(P(-0.1, 2.5), P(-0.1, -2.9), color=GRID, stroke_width=3)
        text = ("Every arrangement problem is slots, plus one move. Shrinking choices give n P r. If repeats are "
                "allowed, n to the power r. Identical items: divide by their factorials. Circles: divide out the "
                "rotations. Together means glue, apart means gaps. In the next chapter we forget the order, and "
                "arrangements become selections.")
        with self.voiceover(text) as vo:
            self.play(FadeIn(title), Create(line), run_time=1.0)
            share = (vo.duration * 0.8 - 1.0) / len(grid)
            for g in grid:
                self.play(FadeIn(g, shift=0.15 * UP), run_time=min(0.8, share))
                self.wait(max(0, share - 0.8))
