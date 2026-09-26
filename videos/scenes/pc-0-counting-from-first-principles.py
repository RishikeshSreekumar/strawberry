import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

# Chapter colour roles (light background).
S1 = PRIMARY  # stage 1 = strawberry red
S2 = SECONDARY  # stage 2 = teal
S3 = PURPLE  # stage 3 = purple
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


def header(s):
    return T(s, 28, weight="BOLD", color=MUTED).to_corner(UL, buff=0.4)


def slot(value, color=INK, size=0.95, stroke=MUTED):
    box = RoundedRectangle(width=size, height=size, corner_radius=0.12, color=stroke, stroke_width=3)
    box.set_fill(WHITE, opacity=1)
    num = M(str(value), 44, color=color).move_to(box) if value != "" else VGroup()
    return VGroup(box, num)


def build_tree(root, xs, ns, y_top, y_bot, colors, dot_r=0.06, sw=3):
    """Tree drawn left to right. Returns list of levels; each level is a VGroup of
    (edges, nodes). Level 0 is the root dot."""
    total = int(np.prod(ns))
    leaf_y = np.linspace(y_top, y_bot, total) if total > 1 else np.array([(y_top + y_bot) / 2])
    levels = []
    root_dot = Dot(root, color=INK, radius=dot_r * 1.4)
    levels.append(VGroup(VGroup(), VGroup(root_dot)))
    prev_pos = [root]
    count = 1
    for k, n in enumerate(ns):
        count *= n
        span = total // count
        pos = [P(xs[k], float(np.mean(leaf_y[i * span:(i + 1) * span]))) for i in range(count)]
        edges = VGroup()
        nodes = VGroup()
        for i, p in enumerate(pos):
            parent = prev_pos[i // n]
            edges.add(Line(parent, p, color=colors[k], stroke_width=sw))
            nodes.add(Dot(p, color=colors[k], radius=dot_r))
        levels.append(VGroup(edges, nodes))
        prev_pos = pos
    return levels


def grow_level(level, run_time=1.0):
    edges, nodes = level
    return AnimationGroup(
        LaggedStart(*[Create(e) for e in edges], lag_ratio=0.05),
        LaggedStart(*[FadeIn(d, scale=0.5) for d in nodes], lag_ratio=0.05),
        run_time=run_time,
    )


class PcCh0Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Permutations, Combinations & the Binomial Theorem",
            "Chapter 0 · Counting from First Principles",
            "Chapter zero. Counting from first principles.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ scene 1: hook
    def s1(self):
        hd = header("0.1 · Why count cleverly")
        shirts = ["Red", "Blue", "White"]
        trousers = ["Jeans", "Chinos", "Shorts", "Cargo"]
        row_y = [1.1, -0.1, -1.3]
        col_x = [-3.0, -1.5, 0.0, 1.5]
        rows = VGroup(*[chip(s, S1).move_to(P(-5.0, y)) for s, y in zip(shirts, row_y)])
        cols = VGroup(*[chip(t, S2, 24).move_to(P(x, 2.3)) for t, x in zip(trousers, col_x)])
        cells = VGroup(*[Dot(P(x, y), color=HL, radius=0.13) for y in row_y for x in col_x])
        total = card(M(r"12 \text{ outfits}", 48, color=HL), color=HL).move_to(P(4.9, -0.1))

        with self.voiceover("You own three shirts and four pairs of trousers. How many outfits can you make? "
                            "Small enough to list: every shirt with every trouser. Twelve.") as vo:
            self.play(FadeIn(hd), run_time=0.5)
            self.play(LaggedStart(*[FadeIn(r, shift=0.2 * RIGHT) for r in rows], lag_ratio=0.3), run_time=1.0)
            self.play(LaggedStart(*[FadeIn(c, shift=0.2 * DOWN) for c in cols], lag_ratio=0.3), run_time=1.0)
            self.play(LaggedStart(*[FadeIn(c, scale=0.3) for c in cells], lag_ratio=0.25),
                      run_time=max(1.5, vo.duration * 0.4))
            self.play(FadeIn(total, shift=0.2 * UP), run_time=0.6)

        levels = build_tree(P(-6.2, 0), [-4.2, -2.0, 0.4], [3, 4, 2], 3.0, -3.3, [S1, S2, S3], dot_r=0.05)
        lab1 = T("shirt", 22, color=S1).move_to(P(-4.2, -3.75))
        lab2 = T("trousers", 22, color=S2).move_to(P(-2.0, -3.75))
        lab3 = T("shoes", 22, color=S3).move_to(P(0.4, -3.75))
        f1 = M(r"3 \times 4 = 12", 48).move_to(P(4.3, 1.0))
        f2 = M(r"3 \times 4 \times 2 = 24", 48).move_to(P(4.3, -0.6))
        f1[0][-2:].set_color(HL)
        f2[0][-2:].set_color(HL)

        with self.voiceover("Now draw it as a tree. Three branches for the shirt. From each one, four branches "
                            "for the trousers. Three groups of four leaves: three times four, twelve. "
                            "Add two pairs of shoes and every leaf splits again: twenty four.") as vo:
            self.play(FadeOut(VGroup(rows, cols, cells, total)), run_time=0.5)
            self.play(FadeIn(levels[0]), run_time=0.3)
            self.play(grow_level(levels[1], 0.9), FadeIn(lab1), run_time=0.9)
            self.play(grow_level(levels[2], 1.4), FadeIn(lab2), run_time=1.4)
            self.play(Write(f1), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.2))
            self.play(grow_level(levels[3], 1.4), FadeIn(lab3), run_time=1.4)
            self.play(Write(f2), run_time=0.8)

        tree = VGroup(*levels, lab1, lab2, lab3)
        kinds = ["letter", "letter", "digit", "digit", "digit", "digit"]
        vals = [26, 26, 10, 10, 10, 10]
        slots = VGroup(*[slot(v, S1 if i < 2 else S2) for i, v in enumerate(vals)]).arrange(RIGHT, buff=0.2)
        slots.move_to(P(0, 1.3))
        slabs = VGroup(*[T(k, 20, color=MUTED).next_to(s, DOWN, buff=0.15) for k, s in zip(kinds, slots)])
        plate = M(r"26 \times 26 \times 10^4 = 6{,}760{,}000", 50).move_to(P(0, -0.6))
        plate[0][-9:].set_color(HL)
        moral = card(T("The tree has a shape, and the shape has a formula.", 30, color=S3), color=S3)
        moral.move_to(P(0, -2.4))

        with self.voiceover("Now try a licence plate: two letters, then four digits. That is twenty six times "
                            "twenty six times ten to the power four, six million seven hundred and sixty thousand "
                            "plates. Nobody lists that. But the tree has a shape, and the shape has a formula.") as vo:
            self.play(FadeOut(VGroup(tree, f1, f2)), run_time=0.6)
            self.play(LaggedStart(*[FadeIn(s, shift=0.2 * UP) for s in slots], lag_ratio=0.2),
                      FadeIn(slabs), run_time=1.4)
            self.play(Write(plate), run_time=1.4)
            self.wait(max(0.1, vo.duration * 0.3))
            self.play(FadeIn(moral, shift=0.2 * UP), run_time=0.8)

    # ------------------------------------------------------------ scene 2: product rule
    def s2(self):
        hd = header("0.2 · The product rule (AND)")
        levels = build_tree(P(-6.2, -0.2), [-4.2, -1.9, 0.4], [2, 3, 2], 2.6, -3.0, [S1, S2, S3], dot_r=0.06)
        labs = VGroup(T("Starter: 2", 22, color=S1).move_to(P(-4.2, -3.6)),
                      T("Main: 3", 22, color=S2).move_to(P(-1.9, -3.6)),
                      T("Dessert: 2", 22, color=S3).move_to(P(0.4, -3.6)))
        f = M(r"2 \times 3 \times 2 = 12", 50).move_to(P(4.2, 0.3))
        f[0][-2:].set_color(HL)
        fl = T("meals", 26, color=MUTED).next_to(f, DOWN, buff=0.25)

        with self.voiceover("A thali: a starter AND a main AND a dessert. Two starters, three mains, two desserts. "
                            "Each stage splits every branch the same number of ways, so the leaves multiply: "
                            "two times three times two, twelve meals.") as vo:
            self.play(FadeIn(hd), FadeIn(levels[0]), run_time=0.5)
            for k in (1, 2, 3):
                self.play(grow_level(levels[k], max(0.8, vo.duration * 0.15)), FadeIn(labs[k - 1]))
            self.play(Write(f), FadeIn(fl), run_time=1.0)

        defn = VGroup(
            T("The product rule", 32, weight="BOLD", color=S3),
            T("A task happens in stages, one after another.", 26),
            T("Whatever happened before, each stage has a fixed number of ways.", 26,
              t2c={"Whatever happened before,": HL}),
            M(r"\text{total} = n_1 \times n_2 \times \cdots \times n_k", 46),
        ).arrange(DOWN, buff=0.3)
        defc = card(defn, pad=0.4, color=S3).move_to(P(0, -0.1))

        with self.voiceover("That is the product rule. If a task happens in stages, and whatever happened before, "
                            "stage one has n one ways, stage two has n two ways, and so on, "
                            "then the total is their product.") as vo:
            self.play(FadeOut(VGroup(*levels, labs, f, fl)), run_time=0.5)
            self.play(FadeIn(defc[0]), FadeIn(defn[0]), FadeIn(defn[1]), run_time=0.8)
            self.play(FadeIn(defn[2]), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.25))
            self.play(Write(defn[3]), run_time=1.0)

        names = ["Asha", "Ravi", "Meera", "Kabir", "Zoya"]
        people = VGroup(*[chip(n, INK, 28) for n in names]).arrange(RIGHT, buff=0.35).move_to(P(0, 1.6))
        pres_lab = T("President", 22, color=S1)
        vice_lab = T("Vice: 4 choices", 24, color=S2).move_to(P(0, 0.4))
        f2 = M(r"5 \times 4 = 20", 50).move_to(P(0, -1.0))
        f2[0][-2:].set_color(HL)
        moral = card(T("The set changes. The number doesn't.", 28, color=S3), color=S3).move_to(P(0, -2.6))

        def highlight(pi):
            anims = []
            for i, p in enumerate(people):
                c = S1 if i == pi else S2
                anims.append(p[0].animate.set_stroke(c, width=4))
                anims.append(p[1].animate.set_color(c))
            return anims

        with self.voiceover("The word whatever matters. Choose a president and then a vice president from five "
                            "people. Who is available for vice president depends on who became president. "
                            "The set changes. But the number is always four. Five times four, twenty. "
                            "Only the count must be fixed, not the set.") as vo:
            self.play(FadeOut(defc), run_time=0.5)
            self.play(LaggedStart(*[FadeIn(p, shift=0.2 * UP) for p in people], lag_ratio=0.15), run_time=1.0)
            pres_lab.next_to(people[0], UP, buff=0.2)
            self.play(*highlight(0), FadeIn(pres_lab), FadeIn(vice_lab), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(*highlight(1), pres_lab.animate.next_to(people[1], UP, buff=0.2), run_time=0.8)
            self.play(Indicate(vice_lab, color=HL), run_time=0.8)
            self.play(Write(f2), run_time=0.8)
            self.play(FadeIn(moral, shift=0.2 * UP), run_time=0.7)

        bars = VGroup()
        dlabs = VGroup()
        clabs = VGroup()
        base = -2.4
        for i in range(8):
            d = i + 1
            h = (9 - d) * 0.5
            x = -5.6 + i * 0.85
            b = Rectangle(width=0.6, height=h, color=S2, stroke_width=2).set_fill(S2, opacity=0.45)
            b.move_to(P(x, base + h / 2))
            bars.add(b)
            dlabs.add(M(str(d), 30, color=S1).move_to(P(x, base - 0.35)))
            clabs.add(M(str(9 - d), 28, color=S2).next_to(b, UP, buff=0.1))
        axis_lab = T("first digit", 22, color=S1).move_to(P(-2.6, base - 0.85))
        stair = M(r"8 + 7 + 6 + \cdots + 1 = 36", 46).move_to(P(3.8, 1.0))
        stair[0][-2:].set_color(HL)
        warn = card(VGroup(T("The count depends on the earlier pick,", 24),
                           T("so split into cases and add.", 24, color=WARN)).arrange(DOWN, buff=0.12),
                    color=WARN).move_to(P(3.8, -0.8))
        q = T("second digit > first digit", 26, color=MUTED).move_to(P(3.8, 2.4))

        with self.voiceover("When even the count changes, the rule breaks. Two digit numbers whose second digit "
                            "is bigger than the first: first digit one leaves eight choices, first digit eight "
                            "leaves just one. So split into cases and add: thirty six.") as vo:
            self.play(FadeOut(VGroup(people, pres_lab, vice_lab, f2, moral)), run_time=0.5)
            self.play(FadeIn(q), FadeIn(dlabs), FadeIn(axis_lab), run_time=0.7)
            self.play(LaggedStart(*[AnimationGroup(GrowFromEdge(b, DOWN), FadeIn(c))
                                    for b, c in zip(bars, clabs)], lag_ratio=0.25),
                      run_time=max(2.0, vo.duration * 0.4))
            self.play(Write(stair), run_time=1.0)
            self.play(FadeIn(warn, shift=0.2 * UP), run_time=0.7)

    # ------------------------------------------------------------ scene 3: sum rule
    def s3(self):
        hd = header("0.3 · The sum rule (OR) and the complement")
        bus = build_tree(P(-6.0, 0.2), [-4.5, -2.8], [3, 2], 2.4, -2.0, [S1, S2], dot_r=0.07)
        train = build_tree(P(0.8, 0.2), [2.3, 4.0], [2, 2], 1.8, -1.4, [S3, S2], dot_r=0.07)
        bl = T("Bus", 28, weight="BOLD", color=S1).next_to(bus[0], UP, buff=0.3)
        tl = T("Train", 28, weight="BOLD", color=S3).next_to(train[0], UP, buff=0.3)
        b6 = M("6", 40, color=HL).move_to(P(-2.1, 0.2))
        t4 = M("4", 40, color=HL).move_to(P(4.7, 0.2))
        plus = M("+", 80, color=HL).move_to(P(-0.8, 0.2))
        f = M(r"3 \times 2 \;+\; 2 \times 2 = 6 + 4 = 10", 48).move_to(P(0, -3.0))
        f[0][-2:].set_color(HL)

        with self.voiceover("Travel to the city by bus OR by train. Bus: three routes, morning or afternoon, "
                            "six trips. Train: fast or slow, morning or afternoon, four trips. Two separate trees, "
                            "and every trip is in exactly one of them. So add: ten.") as vo:
            self.play(FadeIn(hd), FadeIn(bus[0]), FadeIn(bl), run_time=0.6)
            self.play(grow_level(bus[1], 0.7))
            self.play(grow_level(bus[2], 0.9), FadeIn(b6))
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(FadeIn(train[0]), FadeIn(tl), run_time=0.5)
            self.play(grow_level(train[1], 0.7))
            self.play(grow_level(train[2], 0.9), FadeIn(t4))
            self.play(FadeIn(plus, scale=0.5), run_time=0.5)
            self.play(Write(f), run_time=1.2)

        nums = VGroup()
        for n in range(1, 21):
            r, c = divmod(n - 1, 10)
            nums.add(M(str(n), 40).move_to(P(-5.4 + c * 1.2, 1.9 - r * 1.3)))
        m2 = VGroup(*[Line(nums[n - 1].get_corner(DL) + P(-0.05, -0.12), nums[n - 1].get_corner(DR)
                           + P(0.05, -0.12), color=S2, stroke_width=5) for n in range(2, 21, 2)])
        m3 = VGroup(*[Circle(radius=0.36, color=S1, stroke_width=3).move_to(nums[n - 1]) for n in range(3, 21, 3)])
        k2 = T("divisible by 2: 10", 26, color=S2).move_to(P(-3.3, -0.3))
        k3 = T("divisible by 3: 6", 26, color=S1).move_to(P(3.0, -0.3))
        wrong = M(r"10 + 6 = 16", 46).move_to(P(-3.0, -1.7))
        wx = cross_out(wrong)
        right = M(r"10 + 6 - 3 = 13", 46).move_to(P(2.8, -1.7))
        right[0][-2:].set_color(HL)
        note = T("6, 12 and 18 are in both lists: subtract the overlap once", 24, color=MUTED).move_to(P(0, -3.0))

        with self.voiceover("Careful. OR does not always mean add. Numbers from one to twenty divisible by two "
                            "or by three: ten plus six is not sixteen, because six, twelve and eighteen sit in "
                            "both lists. Subtract the overlap once: thirteen.") as vo:
            self.play(FadeOut(VGroup(*bus, *train, bl, tl, b6, t4, plus, f)), run_time=0.5)
            self.play(FadeIn(nums), run_time=0.6)
            self.play(LaggedStart(*[Create(u) for u in m2], lag_ratio=0.1), FadeIn(k2), run_time=1.0)
            self.play(LaggedStart(*[Create(c) for c in m3], lag_ratio=0.1), FadeIn(k3), run_time=1.0)
            self.play(Write(wrong), run_time=0.6)
            self.play(*[Indicate(nums[n - 1], color=HL, scale_factor=1.4) for n in (6, 12, 18)], run_time=1.0)
            for n in (6, 12, 18):
                nums[n - 1].set_color(HL)
            self.play(Create(wx), run_time=0.5)
            self.play(Write(right), FadeIn(note), run_time=1.0)

        rule = card(M(r"\#(\text{at least one}) = \#(\text{all}) - \#(\text{none})", 46), color=S3)
        rule.move_to(P(0, 1.8))
        q = T("4-digit lock codes with at least one repeated digit", 28, color=MUTED).move_to(P(0, 0.3))
        calc = MathTex(r"10^4 - 10 \cdot 9 \cdot 8 \cdot 7", r"= 10000 - 5040", r"= 4960", font_size=48)
        calc.arrange(RIGHT, buff=0.25).move_to(P(0, -1.2))
        calc[2].set_color(HL)
        lab_all = T("all", 22, color=MUTED).next_to(calc[0][0:3], DOWN, buff=0.25)
        lab_none = T("no repeat", 22, color=MUTED).next_to(calc[0][4:], DOWN, buff=0.25)

        with self.voiceover("For at least one, count the opposite. How many four digit lock codes have at least "
                            "one repeated digit? All codes: ten to the power four. Codes with no repeat: ten times "
                            "nine times eight times seven, five thousand and forty. Subtract: four thousand nine "
                            "hundred and sixty.") as vo:
            self.play(FadeOut(VGroup(nums, m2, m3, k2, k3, wrong, wx, right, note)), run_time=0.5)
            self.play(FadeIn(rule, shift=0.2 * DOWN), run_time=0.8)
            self.play(FadeIn(q), run_time=0.6)
            self.play(Write(calc[0]), run_time=1.0)
            self.play(FadeIn(lab_all), FadeIn(lab_none), run_time=0.6)
            self.wait(max(0.1, vo.duration * 0.2))
            self.play(Write(calc[1]), run_time=0.8)
            self.play(Write(calc[2]), run_time=0.6)

    # ------------------------------------------------------------ scene 4: factorials
    def s4(self):
        hd = header("0.4 · Factorials: arranging everything")
        slots = VGroup(*[slot(v, c) for v, c in zip([3, 2, 1], [S1, S2, S3])]).arrange(RIGHT, buff=0.25)
        slots.move_to(P(-2.6, 2.1))
        sl = VGroup(*[T(s, 20, color=MUTED).next_to(b, DOWN, buff=0.12)
                      for s, b in zip(["1st", "2nd", "3rd"], slots)])
        f = M(r"3 \times 2 \times 1 = 6", 48).next_to(slots, RIGHT, buff=0.6)
        f[0][-1].set_color(HL)
        colors = {"A": S1, "B": S2, "C": S3}
        orders = ["ABC", "ACB", "BAC", "BCA", "CAB", "CBA"]
        words = VGroup()
        for i, w in enumerate(orders):
            g, r = divmod(i, 2)
            tiles = VGroup(*[card(T(ch, 30, weight="BOLD", color=colors[ch]), pad=0.1, color=colors[ch])
                             for ch in w]).arrange(RIGHT, buff=0.08)
            tiles.move_to(P(-4.0 + g * 4.0, -0.3 - r * 1.1))
            words.add(tiles)

        with self.voiceover("Three friends stand in a line for a photo. Three choices for the first spot, "
                            "then two, then one. Three times two times one: six orders. Here they all are.") as vo:
            self.play(FadeIn(hd), run_time=0.5)
            self.play(LaggedStart(*[FadeIn(s, shift=0.2 * UP) for s in slots], lag_ratio=0.4),
                      FadeIn(sl), run_time=max(1.5, vo.duration * 0.3))
            self.play(Write(f), run_time=0.9)
            self.play(LaggedStart(*[FadeIn(w, shift=0.2 * UP) for w in words], lag_ratio=0.2), run_time=1.6)

        d1 = M(r"n! = n \times (n-1) \times \cdots \times 2 \times 1", 48).move_to(P(0, 2.0))
        d2 = card(M(r"n! = n \times (n-1)!", 50, color=S3), color=S3).move_to(P(0, 0.5))

        with self.voiceover("In general, lining up n different things gives n times n minus one, all the way "
                            "down to one. We call it n factorial. Choose who goes first, then arrange the rest: "
                            "n factorial equals n times n minus one factorial.") as vo:
            self.play(FadeOut(VGroup(slots, sl, f, words)), run_time=0.5)
            self.play(Write(d1), run_time=1.4)
            self.wait(max(0.1, vo.duration * 0.3))
            self.play(FadeIn(d2, shift=0.2 * UP), run_time=0.8)

        z1 = M(r"1! = 1 \times 0!", 46).move_to(P(-3.0, -1.4))
        arrow = M(r"\Longrightarrow", 46, color=MUTED).next_to(z1, RIGHT, buff=0.4)
        z2 = card(M(r"0! = 1", 50, color=HL), color=HL).next_to(arrow, RIGHT, buff=0.4)
        z3 = T("one way to arrange nothing", 24, color=MUTED).move_to(P(0, -2.9))

        with self.voiceover("Put n equals one in that rule: one factorial equals one times zero factorial, so "
                            "zero factorial must be one. It also makes sense: there is exactly one way to "
                            "arrange nothing.") as vo:
            self.play(Write(z1), run_time=1.0)
            self.play(FadeIn(arrow), FadeIn(z2, shift=0.2 * LEFT), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.25))
            self.play(FadeIn(z3), run_time=0.6)

        growth = VGroup(
            M(r"5! = 120", 50),
            M(r"10! = 3{,}628{,}800", 50),
            M(r"20! \approx 2.4 \times 10^{18}", 50),
        ).arrange(DOWN, buff=0.5, aligned_edge=LEFT).move_to(P(0, 0))
        tag = T("19 digits", 26, color=HL).next_to(growth[2], RIGHT, buff=0.5)

        with self.voiceover("And factorials grow fast. Five factorial is a hundred and twenty. Ten factorial is "
                            "over three and a half million. Twenty factorial has nineteen digits.") as vo:
            self.play(FadeOut(VGroup(d1, d2, z1, arrow, z2, z3)), run_time=0.5)
            for g in growth:
                self.play(FadeIn(g, shift=0.2 * RIGHT), run_time=0.6)
                self.wait(max(0.1, vo.duration * 0.12))
            self.play(FadeIn(tag), run_time=0.5)

    # ------------------------------------------------------------ scene 5: restricted slots
    def s5(self):
        hd = header("0.5 · Restricted slots first")
        names = ["Th", "H", "T", "U"]

        def row(values, colors, y, x0=-4.2):
            g = VGroup(*[slot(v, c) for v, c in zip(values, colors)]).arrange(RIGHT, buff=0.2)
            g.move_to(P(x0, y))
            labs = VGroup(*[T(n, 20, color=MUTED).next_to(b, UP, buff=0.12) for n, b in zip(names, g)])
            return g, labs

        empty, elabs = row(["", "", "", ""], [INK] * 4, 1.4)
        filled, _ = row([9, 9, 8, 7], [S1, INK, INK, INK], 1.4)
        not0 = T("not 0", 20, color=S1).next_to(empty[0], DOWN, buff=0.15)
        f = M(r"9 \times 9 \times 8 \times 7 = 4536", 46).move_to(P(3.2, 1.4))
        f[0][-4:].set_color(HL)

        with self.voiceover("Four digit numbers with distinct digits, using nought to nine. The thousands digit "
                            "cannot be zero, so fill that fussy slot first: nine choices. Then nine, eight, "
                            "seven for the rest. Four thousand five hundred and thirty six.") as vo:
            self.play(FadeIn(hd), FadeIn(empty), FadeIn(elabs), run_time=0.7)
            self.play(empty[0][0].animate.set_stroke(S1, width=5), FadeIn(not0), run_time=0.7)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(FadeIn(filled[0][1]), run_time=0.6)
            for k in (1, 2, 3):
                self.play(FadeIn(filled[k][1]), run_time=0.5)
            self.play(Write(f), run_time=1.0)

        # beat b: even numbers, left to right fails
        ev = T("even", 20, color=S1).next_to(empty[3], DOWN, buff=0.15)
        attempt, _ = row([9, 8, 7, "?"], [INK] * 4, -1.0, x0=-1.2)
        attempt_lab = T("left to right:", 24, color=MUTED).next_to(attempt, LEFT, buff=0.4)
        qx = cross_out(attempt[3])
        first = card(T("fill the units slot first,\nthen split on whether it is 0", 24, color=S3), color=S3)
        first.move_to(P(0, -2.9))

        with self.voiceover("How many of them are even? Now two slots are fussy. Fill left to right and you get "
                            "stuck: the number of even digits left for the last slot depends on what you picked. "
                            "So fill the units digit first, and split on whether it is zero.") as vo:
            self.play(FadeOut(VGroup(*[filled[k][1] for k in range(4)], f)), run_time=0.5)
            self.play(empty[3][0].animate.set_stroke(S1, width=5), FadeIn(ev), run_time=0.7)
            self.play(FadeIn(attempt_lab), LaggedStart(*[FadeIn(s) for s in attempt], lag_ratio=0.3), run_time=1.2)
            self.play(Indicate(attempt[3], color=WARN), run_time=0.8)
            self.play(Create(qx), run_time=0.5)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(FadeIn(first, shift=0.2 * UP), run_time=0.7)

        ca, _ = row([9, 8, 7, 1], [INK, INK, INK, S1], 1.3, x0=-0.4)
        cb, _ = row([8, 8, 7, 4], [S1, INK, INK, S1], -0.5, x0=-0.4)
        cal = T("units = 0", 24, color=S2).next_to(ca, LEFT, buff=0.4)
        cbl = T("units = 2, 4, 6, 8", 24, color=S2).next_to(cb, LEFT, buff=0.4)
        cabs = VGroup(*[T(n, 20, color=MUTED).next_to(b, UP, buff=0.12) for n, b in zip(names, ca)])
        ra = M(r"= 504", 46).next_to(ca, RIGHT, buff=0.4)
        rb = M(r"= 1792", 46).next_to(cb, RIGHT, buff=0.4)
        nb = T("Th: not 0, not the units digit", 20, color=S1).next_to(cb[0], DOWN, buff=0.15).shift(1.2 * RIGHT)
        tot = card(M(r"504 + 1792 = 2296", 50, color=HL), color=HL).move_to(P(0, -2.5))

        with self.voiceover("Units digit zero: nine, eight, seven for the rest, five hundred and four. Units digit "
                            "two, four, six or eight: the thousands slot loses both zero and that digit, leaving "
                            "eight. Four times eight times eight times seven, one thousand seven hundred and "
                            "ninety two. Add: two thousand two hundred and ninety six.") as vo:
            self.play(FadeOut(VGroup(empty, elabs, not0, ev, attempt, attempt_lab, qx, first)), run_time=0.5)
            self.play(FadeIn(ca), FadeIn(cabs), FadeIn(cal), run_time=0.8)
            self.play(Write(ra), run_time=0.7)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(FadeIn(cb), FadeIn(cbl), run_time=0.8)
            self.play(FadeIn(nb), Indicate(cb[0], color=S1), run_time=0.9)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(Write(rb), run_time=0.7)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(FadeIn(tot, shift=0.2 * UP), run_time=0.8)

        odd = M(r"\text{odd: } 5 \times 8 \times 8 \times 7 = 2240", 46).move_to(P(0, 0.2))
        chk = M(r"2296 + 2240 = 4536", 50).move_to(P(-0.3, -1.4))
        tick = check().next_to(chk, RIGHT, buff=0.4)

        with self.voiceover("Check with the odd numbers: five times eight times eight times seven, two thousand "
                            "two hundred and forty. Even plus odd gives four thousand five hundred and thirty six. "
                            "It matches.") as vo:
            self.play(FadeOut(VGroup(ca, cb, cal, cbl, cabs, ra, rb, nb)), tot.animate.move_to(P(0, 1.8)),
                      run_time=0.7)
            self.play(Write(odd), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.2))
            self.play(Write(chk), run_time=1.0)
            self.play(FadeIn(tick, scale=0.5), run_time=0.5)

    # ------------------------------------------------------------ scene 6: recap
    def s6(self):
        hd = T("Chapter 0 · Recap", 36, weight="BOLD", color=PRIMARY).to_edge(UP, buff=0.5)
        items = [
            (r"\times", "AND: stages multiply"),
            (r"+", "OR: separate cases add, if they don't overlap"),
            (r"\text{all} - \text{none}", "At least one: count the opposite"),
            (r"n!", "Arranging n different things"),
            (r"\boxed{\,9\,}", "Fill the fussiest slot first"),
        ]
        rows = VGroup()
        for tex, s in items:
            sym = M(tex, 46, color=S3)
            if sym.width > 2.2:
                sym.scale_to_fit_width(2.2)
            row = VGroup(check(), sym, T(s, 30))
            rows.add(row)
        for i, r in enumerate(rows):
            y = 2.0 - i * 0.95
            r[0].move_to(P(-5.2, y))
            r[1].move_to(P(-3.5, y))
            r[2].next_to(P(-2.1, y), RIGHT, buff=0)
        nxt = card(T("Next: Permutations — Arranging Things", 28, color=S3), color=S3).to_edge(DOWN, buff=0.5)

        with self.voiceover("Here is the toolkit. AND: stages multiply. OR: separate cases add, as long as they "
                            "do not overlap. At least one: count all, subtract none. Arranging n things: "
                            "n factorial. And always fill the fussiest slot first. Next chapter, we use these to "
                            "arrange things in every way imaginable.") as vo:
            self.play(FadeIn(hd), run_time=0.5)
            per = max(0.4, vo.duration * 0.1)
            for r in rows:
                self.play(FadeIn(r[1]), FadeIn(r[2], shift=0.2 * RIGHT), run_time=0.5)
                self.play(FadeIn(r[0], scale=0.5), run_time=0.3)
                self.wait(per)
            self.play(FadeIn(nxt, shift=0.2 * UP), run_time=0.7)
