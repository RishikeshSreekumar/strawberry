import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

# Chapter colour roles (light background).
EA = PRIMARY  # event A = strawberry red
EB = SECONDARY  # event B / given = teal
HL = ManimColor("#D19A00")  # results / highlight (gold)
WARN = PRIMARY
OK = GREEN
GOLD = ManimColor("#E0B43A")
SILVER = ManimColor("#A7A9AC")


# ---------------------------------------------------------------- helpers
def T(s, size=30, **kw):
    return Text(s, font_size=size, **kw)


def M(s, size=40, **kw):
    return MathTex(s, font_size=size, **kw)


def P(x, y):
    return np.array([x, y, 0.0])


def fit(mob, w):
    if mob.width > w:
        mob.scale_to_fit_width(w)
    return mob


def card(mob, pad=0.25, color=MUTED, fill=WHITE, opacity=0.9):
    box = SurroundingRectangle(mob, buff=pad, corner_radius=0.15, color=color, stroke_width=2)
    box.set_fill(fill, opacity=opacity)
    return VGroup(box, mob)


def cross_out(mob):
    return VGroup(
        Line(mob.get_corner(UL), mob.get_corner(DR), color=WARN, stroke_width=5),
        Line(mob.get_corner(DL), mob.get_corner(UR), color=WARN, stroke_width=5),
    )


def check():
    return MathTex(r"\checkmark", color=OK, font_size=48)


def header(s):
    return T(s, 28, weight="BOLD", color=MUTED).to_corner(UL, buff=0.4)


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


def paint(cells, A=(), B=(), given=False):
    """Animations that colour the grid: A light red, B teal, A and B solid red, outside B grey if given."""
    anims = []
    for k, s in cells.items():
        ina, inb = k in A, k in B
        stroke = (MUTED, 1.5)
        if given and not inb:
            col, op = MUTED, 0.45
        elif ina and inb:
            col, op = EA, 0.8
            stroke = (EB, 3.5) if given else stroke
        elif ina:
            col, op = EA, 0.25
        elif inb:
            col, op = EB, 0.35
            stroke = (EB, 3.5) if given else stroke
        else:
            col, op = WHITE, 1
        anims.append(s.animate.set_fill(col, opacity=op).set_stroke(stroke[0], width=stroke[1]))
    return anims


def label_card(sym, words, color):
    return card(VGroup(M(sym + ":", 34, color=color), T(words, 26, color=color)).arrange(RIGHT, buff=0.2),
                color=color)


def coin(color, r=0.32, lab=None, filled=True):
    c = Circle(radius=r, color=color, stroke_width=3)
    c.set_fill(color, opacity=1 if filled else 0.15)
    g = VGroup(c)
    if lab is not None:
        g.add(M(lab, 26, color=INK).move_to(c))
    return g


class PrCh2Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Probability",
            "Chapter 2 · Conditional Probability and Independence",
            "Chapter two. Conditional probability and independence.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ scene 1: shrinking the sample space
    def s1(self):
        hd = header("2.1 · Shrinking the sample space")
        g, cells = dice_grid()
        A = {(6, b) for b in range(1, 7)}
        B = {(a, b) for a in range(1, 7) for b in range(1, 7) if a + b >= 10}
        la = label_card("A", "first die is 6", EA).move_to(P(3.3, 2.4))
        pa = M(r"P(A) = \frac{6}{36} = \frac{1}{6}", 42, color=EA).move_to(P(3.3, 1.3))

        with self.voiceover("A friend rolls two dice behind a book. What is the chance the first die shows a six? "
                            "Six cells out of thirty six. One sixth.") as vo:
            self.play(FadeIn(hd), FadeIn(g), run_time=0.8)
            self.play(FadeIn(la), *paint(cells, A), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.3))
            self.play(Write(pa), run_time=0.9)

        lb = label_card("B", "sum is at least 10", EB).move_to(P(3.3, 0.1))
        pab = M(r"P(A \mid B) = \frac{3}{6} = \frac{1}{2}", 46, color=HL).move_to(P(3.3, -1.2))
        was = T("it was 1/6: the news tripled it", 24, color=MUTED).next_to(pab, DOWN, buff=0.3)

        with self.voiceover("Then they add: the total is at least ten. Most outcomes just became impossible, so "
                            "grey them out. Six cells survive, and three of them have a six first. The chance is "
                            "now three out of six, one half. The news tripled it.") as vo:
            self.play(FadeIn(lb), run_time=0.7)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(*paint(cells, A, B, given=True), run_time=1.4)
            self.wait(max(0.1, vo.duration * 0.15))
            ab = [cells[k] for k in sorted(A & B)]
            self.play(*[Indicate(c, color=EA, scale_factor=1.15) for c in ab], run_time=1.0)
            self.play(Write(pab), run_time=1.0)
            self.play(FadeIn(was), run_time=0.6)

        f1 = M(r"P(A \mid B) = \frac{n(A \cap B)}{n(B)}", 44).move_to(P(3.3, 1.9))
        f2 = M(r"= \frac{n(A \cap B)/36}{n(B)/36} = \frac{P(A \cap B)}{P(B)}", 42).move_to(P(3.3, 0.4))
        fit(f2, 6.3)
        dfn = card(T("Given B, B becomes the new sample space.", 24, color=PURPLE), color=PURPLE)
        dfn.move_to(P(3.3, -1.3))
        fit(dfn, 6.4)

        with self.voiceover("That is conditional probability. Given event B, B becomes the new universe. Count the "
                            "part of A inside B, and divide by the size of B. Divide top and bottom by thirty six, "
                            "and the counts become probabilities: the probability of A given B is the probability "
                            "of A and B, over the probability of B.") as vo:
            self.play(FadeOut(VGroup(la, pa, lb, pab, was)), run_time=0.5)
            self.play(FadeIn(dfn), run_time=0.7)
            self.play(Write(f1), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.25))
            self.play(Write(f2), run_time=1.4)
            self.play(Indicate(f2[0][-12:], color=HL), run_time=0.9)

        # two-way table
        xs = [-5.6, -3.6, -1.7, 0.1]
        ys = [1.8, 0.9, 0.0, -0.9]
        data = [["", "Cricket", "Doesn't", "Total"], ["Boy", "36", "24", "60"],
                ["Girl", "14", "26", "40"], ["Total", "50", "50", "100"]]
        tab = VGroup()
        cellm = {}
        for r, row in enumerate(data):
            for c, s in enumerate(row):
                if not s:
                    continue
                bold = r == 0 or c == 0
                m = T(s, 28, weight="BOLD" if bold else "NORMAL", color=MUTED if bold else INK).move_to(P(xs[c], ys[r]))
                cellm[(r, c)] = m
                tab.add(m)
        rules = VGroup(Line(P(-6.5, 1.35), P(0.9, 1.35), color=MUTED, stroke_width=2),
                       Line(P(-4.6, 2.2), P(-4.6, -1.3), color=MUTED, stroke_width=2))
        girl = SurroundingRectangle(VGroup(cellm[(2, 0)], cellm[(2, 3)]), buff=0.18, color=EA, stroke_width=4)
        crk = SurroundingRectangle(VGroup(cellm[(0, 1)], cellm[(3, 1)]), buff=0.18, color=EB, stroke_width=4)
        r1 = M(r"P(\text{cricket} \mid \text{girl}) = \frac{14}{40} = 0.35", 38, color=EA).move_to(P(4.0, 1.5))
        r2 = M(r"P(\text{girl} \mid \text{cricket}) = \frac{14}{50} = 0.28", 38, color=EB).move_to(P(4.0, 0.2))
        fit(r1, 5.8)
        fit(r2, 5.8)
        warn = card(M(r"P(A \mid B) \ne P(B \mid A)", 44, color=WARN), color=WARN).move_to(P(0, -2.6))

        with self.voiceover("Survey data works the same way. Conditioning means picking a row or a column and "
                            "forgetting the rest. Of forty girls, fourteen play cricket: zero point three five. "
                            "Of fifty cricketers, fourteen are girls: zero point two eight. Same fourteen students, "
                            "different universe. The bar is not symmetric.") as vo:
            self.play(FadeOut(VGroup(g, f1, f2, dfn)), run_time=0.5)
            self.play(FadeIn(tab), Create(rules), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(Create(girl), run_time=0.7)
            self.play(Write(r1), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(ReplacementTransform(girl, crk), run_time=0.7)
            self.play(Write(r2), run_time=1.0)
            self.play(Indicate(cellm[(2, 1)], color=HL, scale_factor=1.5), run_time=0.9)
            self.play(FadeIn(warn, shift=0.2 * UP), run_time=0.7)

    # ------------------------------------------------------------ scene 2: multiplication rule
    def s2(self):
        hd = header("2.2 · The multiplication rule")
        d1 = M(r"P(B \mid A) = \frac{P(A \cap B)}{P(A)}", 52).move_to(P(0, 1.6))
        d2 = M(r"P(A \cap B) = P(A)\,P(B \mid A)", 56, color=PURPLE).move_to(P(0, 1.6))
        story = card(T("first A, then B in the world where A happened", 28), color=PURPLE).move_to(P(0, -0.2))

        with self.voiceover("The definition is a division. Multiply across, and it becomes the multiplication "
                            "rule: the probability of A and B equals the probability of A, times the probability "
                            "of B given A. Read it as a story. First A happens. Then, in the world where A "
                            "happened, B happens.") as vo:
            self.play(FadeIn(hd), Write(d1), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.2))
            self.play(ReplacementTransform(d1, d2), run_time=1.3)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(FadeIn(story, shift=0.2 * UP), run_time=0.8)

        def deck(n, aces, x):
            back = VGroup(*[RoundedRectangle(width=1.3, height=1.8, corner_radius=0.1, color=MUTED, stroke_width=2)
                            .set_fill(WHITE, opacity=1).shift(P(0.06 * i, 0.06 * i)) for i in range(3)])
            ace = T("A", 44, color=EA, weight="BOLD").move_to(back[-1])
            lab = T(f"{n} cards, {aces} aces", 22, color=MUTED).next_to(back, DOWN, buff=0.2)
            return VGroup(back, ace, lab).move_to(P(x, -0.3))

        k1 = deck(52, 4, -4.6)
        k2 = deck(51, 3, -0.6)
        p1 = M(r"\frac{4}{52}", 52, color=EA).next_to(k1, RIGHT, buff=0.35)
        tm = M(r"\times", 48).move_to(P(-2.2, -0.2))
        p2 = M(r"\frac{3}{51}", 52, color=EB).next_to(k2, RIGHT, buff=0.35)
        res = M(r"= \frac{12}{2652} = \frac{1}{221}", 52, color=HL).next_to(p2, RIGHT, buff=0.3)
        q = T("Two cards dealt. P(both aces)?", 30, weight="BOLD").move_to(P(0, 2.4))

        with self.voiceover("Two cards are dealt. What is the chance both are aces? The first is an ace with "
                            "probability four over fifty two. Now the deck has changed: fifty one cards, three "
                            "aces. So the second factor is three over fifty one. Multiply: one over two hundred "
                            "and twenty one.") as vo:
            self.play(FadeOut(story), d2.animate.scale(0.7).move_to(P(3.2, 3.3)), run_time=0.7)
            self.play(FadeIn(q), run_time=0.6)
            self.play(FadeIn(k1, shift=0.2 * UP), run_time=0.7)
            self.play(Write(p1), run_time=0.7)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(FadeIn(tm), FadeIn(k2, shift=0.2 * UP), run_time=0.8)
            self.play(Write(p2), run_time=0.7)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(Write(res), run_time=1.0)

        bad_m = M(r"\frac{4}{52} \times \frac{4}{52} = \frac{1}{169}", 48, color=WARN)
        bad = card(VGroup(bad_m, T("only with replacement", 24, color=WARN)).arrange(DOWN, buff=0.2), color=WARN)
        bad.move_to(P(-3.6, -0.6))
        chain = M(r"P(A \cap B \cap C) = P(A)\,P(B \mid A)\,P(C \mid A \cap B)", 40, color=PURPLE).move_to(P(0, -2.6))
        fit(chain, 12.5)
        kings = M(r"\text{three kings: } \frac{4}{52} \cdot \frac{3}{51} \cdot \frac{2}{50} = \frac{1}{5525}",
                  40).move_to(P(3.2, -0.6))
        fit(kings, 6.2)

        with self.voiceover("The common slip is four over fifty two, twice. That is the answer only if the first "
                            "card goes back. Without replacement, every factor after the first is a conditional "
                            "probability. Three kings in a row: four over fifty two, times three over fifty one, "
                            "times two over fifty.") as vo:
            self.play(FadeOut(VGroup(k1, k2, p1, p2, tm)), res.animate.move_to(P(0, 1.4)), run_time=0.7)
            self.play(FadeIn(bad), run_time=0.7)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(Create(Line(bad_m.get_left(), bad_m.get_right(), color=WARN, stroke_width=5)), run_time=0.5)
            self.play(Write(chain), run_time=1.3)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(Write(kings), run_time=1.2)

    # ------------------------------------------------------------ scene 3: independence
    def s3(self):
        hd = header("2.3 · Independence")
        g, cells = dice_grid()
        A = {(a, b) for a in (2, 4, 6) for b in range(1, 7)}
        B7 = {(a, 7 - a) for a in range(1, 7)}
        B8 = {(a, 8 - a) for a in range(2, 7)}
        la = label_card("A", "first die is even", EA).move_to(P(3.3, 2.4))
        pa = M(r"P(A) = \frac{1}{2}", 42, color=EA).move_to(P(3.3, 1.4))
        l7 = label_card("B", "sum is 7", EB).move_to(P(3.3, 0.3))
        p7 = M(r"P(A \mid B) = \frac{3}{6} = \frac{1}{2}", 44, color=HL).move_to(P(3.3, -0.9))
        ok = VGroup(check(), T("no change", 26, color=OK)).arrange(RIGHT, buff=0.2).next_to(p7, DOWN, buff=0.3)

        with self.voiceover("Sometimes the news changes nothing. Let event A be: the first die is even, one half. "
                            "Now learn that the sum is seven. Surely that says something about the first die? "
                            "Grey out the rest. Six cells survive, and the first die is even in three. One half. "
                            "Exactly what it was.") as vo:
            self.play(FadeIn(hd), FadeIn(g), run_time=0.8)
            self.play(FadeIn(la), *paint(cells, A), run_time=1.0)
            self.play(Write(pa), run_time=0.7)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(FadeIn(l7), *paint(cells, A, B7), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(*paint(cells, A, B7, given=True), run_time=1.2)
            self.play(Write(p7), run_time=1.0)
            self.play(FadeIn(ok), run_time=0.6)

        l8 = label_card("B", "sum is 8", EB).move_to(P(3.3, 0.3))
        p8 = M(r"P(A \mid B) = \frac{3}{5} \ne \frac{1}{2}", 44, color=WARN).move_to(P(3.3, -0.9))
        dep = T("the news mattered: dependent", 26, color=WARN).next_to(p8, DOWN, buff=0.3)

        with self.voiceover("Change the news to: the sum is eight. Five cells survive, three with an even first "
                            "die. Three fifths. This time the news mattered.") as vo:
            self.play(FadeOut(VGroup(p7, ok)), ReplacementTransform(l7, l8), *paint(cells, A), run_time=0.8)
            self.play(*paint(cells, A, B8, given=True), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(Write(p8), run_time=1.0)
            self.play(FadeIn(dep), run_time=0.6)

        dfn = card(M(r"P(A \cap B) = P(A)\,P(B)", 54, color=PURPLE), color=PURPLE).move_to(P(0, 2.0))
        tag = T("independent", 26, color=PURPLE, weight="BOLD").next_to(dfn, UP, buff=0.15)
        chk = M(r"\frac{3}{36} = \frac{1}{2} \times \frac{1}{6}", 44).next_to(dfn, DOWN, buff=0.35)
        chk_ok = check().next_to(chk, RIGHT, buff=0.3)
        vc = P(-3.2, -2.0)
        box = Rectangle(width=4.6, height=2.0, color=INK, stroke_width=2.5).move_to(vc)
        ca = Circle(radius=0.62, color=EA, stroke_width=3).set_fill(EA, opacity=0.25).move_to(vc + P(-1.1, 0))
        cb = Circle(radius=0.62, color=EB, stroke_width=3).set_fill(EB, opacity=0.25).move_to(vc + P(1.1, 0))
        ta = M("A", 32, color=EA).move_to(ca)
        tb = M("B", 32, color=EB).move_to(cb)
        excl = VGroup(box, ca, cb, ta, tb)
        ex_t = VGroup(T("exclusive:", 26, color=WARN, weight="BOLD"),
                      M(r"P(A \cap B) = 0 \ne P(A)\,P(B)", 38, color=WARN),
                      T("learning A rules out B: maximally dependent", 22, color=MUTED)
                      ).arrange(DOWN, buff=0.2).move_to(P(2.9, -2.0))
        fit(ex_t, 6.6)

        with self.voiceover("When the news changes nothing, the events are independent. Put that into the "
                            "multiplication rule and you get the definition: the probability of A and B equals the "
                            "probability of A times the probability of B. Check it: three over thirty six is one "
                            "half times one sixth. And independent is not mutually exclusive. If two events cannot "
                            "happen together, learning one tells you the other did not happen. They are as "
                            "dependent as events can be.") as vo:
            self.play(FadeOut(VGroup(g, la, pa, l8, p8, dep)), run_time=0.5)
            self.play(FadeIn(dfn), FadeIn(tag), run_time=0.9)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(Write(chk), run_time=1.0)
            self.play(FadeIn(chk_ok, scale=1.5), run_time=0.5)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(FadeIn(excl), run_time=0.8)
            self.play(FadeIn(ex_t), run_time=1.0)

    # ------------------------------------------------------------ scene 4: trees
    def s4(self):
        hd = header("2.4 · Trees for multi-stage experiments")
        root = P(-6.0, 0.0)
        s1 = [P(-3.4, 1.6), P(-3.4, -1.6)]
        lv = [P(-0.8, 2.4), P(-0.8, 0.8), P(-0.8, -0.8), P(-0.8, -2.4)]
        col = [EA, EB]
        e1 = VGroup(*[Line(root, s1[i], color=col[i], stroke_width=4) for i in range(2)])
        e2 = VGroup(*[Line(s1[i // 2], lv[i], color=col[i % 2], stroke_width=4) for i in range(4)])
        nodes = VGroup(Dot(root, color=INK), *[Dot(p, color=INK) for p in s1 + lv])
        f1 = [r"\frac{5}{8}", r"\frac{3}{8}"]
        f2 = [r"\frac{4}{7}", r"\frac{3}{7}", r"\frac{5}{7}", r"\frac{2}{7}"]
        b1 = VGroup(*[M(f1[i], 34, color=col[i]).move_to(e1[i].get_center() + P(-0.1, 0.4 if i == 0 else -0.4))
                      for i in range(2)])
        b2 = VGroup(*[M(f2[i], 32, color=col[i % 2]).move_to(e2[i].get_center() + P(-0.1, 0.33 if i % 2 == 0 else -0.33))
                      for i in range(4)])
        n1 = VGroup(T("R", 26, color=EA, weight="BOLD").next_to(s1[0], UP, buff=0.15),
                    T("B", 26, color=EB, weight="BOLD").next_to(s1[1], DOWN, buff=0.15))
        names = ["RR", "RB", "BR", "BB"]
        leaves = VGroup(*[T(nm, 26, weight="BOLD").next_to(p, RIGHT, buff=0.2) for nm, p in zip(names, lv)])
        cap = T("5 red, 3 blue: two draws, no replacement", 26, color=MUTED).move_to(P(0, -3.35))

        with self.voiceover("When stages depend on each other, draw a tree. Two balls from a bag of five red and "
                            "three blue, without replacement. First fork: red five eighths, blue three eighths. "
                            "After a red, the bag holds four red and three blue. After a blue, five red and two "
                            "blue.") as vo:
            self.play(FadeIn(hd), FadeIn(cap), run_time=0.6)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(FadeIn(nodes[0]), Create(e1), FadeIn(nodes[1:3]), FadeIn(n1), run_time=1.0)
            self.play(Write(b1), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(Create(e2[:2]), FadeIn(nodes[3:5]), Write(b2[:2]), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.08))
            self.play(Create(e2[2:]), FadeIn(nodes[5:]), Write(b2[2:]), run_time=1.0)
            self.play(LaggedStart(*[FadeIn(x) for x in leaves], lag_ratio=0.2), run_time=0.8)

        prods = [(r"\frac{5}{8}\cdot\frac{4}{7} = \frac{20}{56}", EA),
                 (r"\frac{5}{8}\cdot\frac{3}{7} = \frac{15}{56}", INK),
                 (r"\frac{3}{8}\cdot\frac{5}{7} = \frac{15}{56}", INK),
                 (r"\frac{3}{8}\cdot\frac{2}{7} = \frac{6}{56}", EB)]
        pm = VGroup(*[M(s, 34, color=c).move_to(P(2.1, p[1])) for (s, c), p in zip(prods, lv)])
        pm.align_to(P(0.6, 0), LEFT)
        br = Brace(pm, RIGHT, color=OK)
        sum1 = VGroup(T("sum", 24, color=OK), M(r"= 1", 38, color=OK)).arrange(DOWN, buff=0.1).next_to(br, RIGHT, buff=0.2)
        glow = VGroup(*[SurroundingRectangle(VGroup(leaves[i], pm[i]), buff=0.12, color=HL, stroke_width=4,
                                             corner_radius=0.1) for i in (1, 2)])
        res = M(r"P(\text{one of each}) = \frac{15}{56} + \frac{15}{56} = \frac{15}{28}", 36, color=HL)
        res.move_to(P(0, -3.25))

        with self.voiceover("Multiply along a branch. Red then blue is five eighths times three sevenths: fifteen "
                            "over fifty six. Each leaf is one complete story. For one ball of each colour, add "
                            "across the two mixed leaves: fifteen over twenty eight. And all four leaves add up to "
                            "one. That is a free check.") as vo:
            self.play(Indicate(VGroup(e1[0], e2[1]), color=HL), run_time=0.9)
            self.play(Write(pm[1]), run_time=0.9)
            self.play(LaggedStart(*[Write(pm[i]) for i in (0, 2, 3)], lag_ratio=0.3), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.08))
            self.play(Create(glow), run_time=0.8)
            self.play(FadeOut(cap), Write(res), run_time=1.1)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(GrowFromCenter(br), FadeIn(sum1), run_time=0.8)

        rule = card(VGroup(T("and: multiply along a branch", 28, color=PURPLE),
                           T("or: add across branches", 28, color=PURPLE)).arrange(DOWN, aligned_edge=LEFT, buff=0.2),
                    color=PURPLE).move_to(P(3.4, 1.1))
        bad = card(M(r"\frac{5}{8} + \frac{4}{7} > 1", 40, color=WARN), color=WARN).move_to(P(3.4, -1.2))

        with self.voiceover("So, and moves you along a path. Or moves you across paths. Adding along a branch "
                            "gives numbers bigger than one, a sure sign of an error.") as vo:
            self.play(FadeOut(VGroup(pm, br, sum1, glow)), run_time=0.5)
            self.play(FadeIn(rule, shift=0.2 * UP), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.2))
            self.play(FadeIn(bad), run_time=0.6)
            self.play(Create(cross_out(bad)), run_time=0.5)

    # ------------------------------------------------------------ scene 5: reliability
    def s5(self):
        hd = header("2.5 · Independent trials and reliability")

        def part(lab, c):
            r = RoundedRectangle(width=1.1, height=0.7, corner_radius=0.1, color=c, stroke_width=3)
            r.set_fill(WHITE, opacity=1)
            return VGroup(r, M(lab, 32, color=c).move_to(r))

        sx = [-5.3, -3.5, -1.7]
        ser = VGroup(*[part(f"p_{i + 1}", EB).move_to(P(x, 0.9)) for i, x in enumerate(sx)])
        swire = VGroup(Line(P(-6.5, 0.9), P(-0.5, 0.9), color=MUTED, stroke_width=3))
        st = T("Series", 30, weight="BOLD", color=EB).move_to(P(-3.5, 2.5))
        sf = M(r"P(\text{works}) = p_1\,p_2\,p_3", 40).move_to(P(-3.5, -1.0))
        sn = T("every part must work", 24, color=MUTED).next_to(sf, DOWN, buff=0.25)

        py = [1.9, 0.9, -0.1]
        par = VGroup(*[part(f"p_{i + 1}", EA).move_to(P(3.6, y)) for i, y in enumerate(py)])
        pw = VGroup(Line(P(1.2, 0.9), P(2.0, 0.9), color=MUTED, stroke_width=3),
                    Line(P(5.2, 0.9), P(6.0, 0.9), color=MUTED, stroke_width=3),
                    Line(P(2.0, 1.9), P(2.0, -0.1), color=MUTED, stroke_width=3),
                    Line(P(5.2, 1.9), P(5.2, -0.1), color=MUTED, stroke_width=3),
                    *[Line(P(2.0, y), P(5.2, y), color=MUTED, stroke_width=3) for y in py])
        pt = T("Parallel", 30, weight="BOLD", color=EA).move_to(P(3.6, 2.9))
        pf = M(r"P(\text{works}) = 1 - q_1\,q_2\,q_3", 40).move_to(P(3.6, -1.0))
        pn = VGroup(T("fails only if every part fails,", 24, color=MUTED),
                    M(r"q_i = 1 - p_i", 30, color=MUTED)).arrange(RIGHT, buff=0.2).next_to(pf, DOWN, buff=0.25)
        fit(pn, 6.2)
        foot = T("Series: weaker than its weakest link.  Parallel: stronger than its strongest part.", 24,
                 color=PURPLE).move_to(P(0, -3.0))
        fit(foot, 13)

        with self.voiceover("Now systems of independent parts. In series, the system works only if every part "
                            "works, so multiply the successes. In parallel, it fails only if every part fails, so "
                            "multiply the failures, and subtract from one. Series is weaker than its weakest link. "
                            "Parallel is stronger than its strongest part.") as vo:
            self.play(FadeIn(hd), run_time=0.5)
            self.play(FadeIn(st), Create(swire), FadeIn(ser), run_time=1.0)
            self.play(Write(sf), FadeIn(sn), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(FadeIn(pt), Create(pw), FadeIn(par), run_time=1.0)
            self.play(Write(pf), FadeIn(pn), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(FadeIn(foot), run_time=0.8)

        def student(i):
            c = Circle(radius=0.5, color=EB, stroke_width=3).set_fill(EB, opacity=0.15)
            return VGroup(c, T("50%", 24, color=EB, weight="BOLD").move_to(c))

        studs = VGroup(*[student(i) for i in range(3)]).arrange(RIGHT, buff=0.6).move_to(P(-3.6, 1.6))
        sl = T("three students, independent", 24, color=MUTED).next_to(studs, DOWN, buff=0.25)
        bad = card(M(r"50\% + 50\% + 50\% = 150\%", 38, color=WARN), color=WARN).move_to(P(-3.6, -1.1))
        f1 = M(r"P(\text{all fail}) = \left(\frac{1}{2}\right)^3 = \frac{1}{8}", 42).move_to(P(3.4, 1.6))
        f2 = M(r"P(\text{solved}) = 1 - \frac{1}{8} = \frac{7}{8}", 46, color=HL).move_to(P(3.4, 0.3))
        tip = card(M(r"\text{at least one} = 1 - P(\text{none})", 40, color=PURPLE), color=PURPLE).move_to(P(3.4, -1.4))
        fit(tip, 6.4)

        with self.voiceover("Three students each have a fifty percent chance of solving a problem. Is it certain "
                            "to be solved? Fifty plus fifty plus fifty percent is a hundred and fifty, which is "
                            "impossible. The problem stays unsolved only if all three fail: one half cubed, one "
                            "eighth. So it gets solved with probability seven eighths. At least one means one "
                            "minus none.") as vo:
            self.play(FadeOut(VGroup(ser, swire, st, sf, sn, par, pw, pt, pf, pn, foot)), run_time=0.5)
            self.play(LaggedStart(*[FadeIn(s, scale=0.6) for s in studs], lag_ratio=0.2), FadeIn(sl), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(FadeIn(bad), run_time=0.7)
            self.play(Create(cross_out(bad)), run_time=0.5)
            self.wait(max(0.1, vo.duration * 0.05))
            self.play(Write(f1), run_time=1.1)
            self.play(Write(f2), run_time=1.1)
            self.play(FadeIn(tip, shift=0.2 * UP), run_time=0.7)

    # ------------------------------------------------------------ scene 6: conditioning traps
    def s6(self):
        hd = header("2.6 · Conditioning traps")
        names = ["BB", "BG", "GB", "GG"]
        xs = [-5.2, -3.6, -2.0, -0.4]

        def row(y):
            g = VGroup()
            for nm, x in zip(names, xs):
                r = RoundedRectangle(width=1.3, height=0.9, corner_radius=0.12, color=INK, stroke_width=2.5)
                r.set_fill(WHITE, opacity=1).move_to(P(x, y))
                g.add(VGroup(r, T(nm, 30, weight="BOLD").move_to(r)))
            return g

        r1 = row(1.3)
        quarters = VGroup(*[M(r"\frac{1}{4}", 30, color=MUTED).next_to(t, UP, buff=0.12) for t in r1])
        elder = T("elder child listed first", 22, color=MUTED).move_to(P(-2.8, 2.65))
        sl = M(r"S", 40, color=MUTED).next_to(r1, LEFT, buff=0.3)

        with self.voiceover("The famous traps catch anyone who skips writing the sample space. A family has two "
                            "children. List the elder first: boy boy, boy girl, girl boy, girl girl. Each one "
                            "quarter.") as vo:
            self.play(FadeIn(hd), run_time=0.5)
            self.play(LaggedStart(*[FadeIn(t, shift=0.2 * UP) for t in r1], lag_ratio=0.25), FadeIn(sl), run_time=1.4)
            self.play(FadeIn(quarters), FadeIn(elder), run_time=0.7)

        c1 = VGroup(T("told: at least one boy", 26, color=EB, weight="BOLD"),
                    M(r"P(BB) = \frac{1}{3}", 42, color=HL)).arrange(DOWN, buff=0.2).move_to(P(3.8, 1.3))

        def grey(t):
            return t.animate.set_opacity(0.3)

        with self.voiceover("You are told at least one is a boy. Only girl girl is ruled out. Three stories "
                            "survive, and just one is boy boy. One third, not one half.") as vo:
            self.play(FadeOut(quarters), FadeIn(c1[0]), run_time=0.6)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(grey(r1[3]), run_time=0.7)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(r1[0][0].animate.set_fill(HL, opacity=0.5), run_time=0.6)
            self.play(Write(c1[1]), run_time=0.9)

        r2 = row(-1.3)
        c2 = VGroup(T("told: the elder is a boy", 26, color=EA, weight="BOLD"),
                    M(r"P(BB) = \frac{1}{2}", 42, color=HL)).arrange(DOWN, buff=0.2).move_to(P(3.8, -1.3))
        foot = T("Different information, different answer.", 28, color=PURPLE).move_to(P(0, -3.1))

        with self.voiceover("Now you are told the elder is a boy. Girl boy and girl girl go. Two survive, so one "
                            "half. Different information, different answer.") as vo:
            self.play(FadeIn(r2, shift=0.2 * DOWN), FadeIn(c2[0]), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(grey(r2[2]), grey(r2[3]), run_time=0.7)
            self.play(r2[0][0].animate.set_fill(HL, opacity=0.5), run_time=0.5)
            self.play(Write(c2[1]), run_time=0.9)
            self.play(FadeIn(foot), run_time=0.6)

        # Bertrand's box
        bx = [-4.6, -1.6, 1.4]
        spec = [((GOLD, "G_1"), (GOLD, "G_2")), ((GOLD, "G_3"), (SILVER, "S")), ((SILVER, "S"), (SILVER, "S"))]
        boxes = VGroup()
        top, bot = [], []
        for x, (a, b) in zip(bx, spec):
            fr = RoundedRectangle(width=1.6, height=2.3, corner_radius=0.15, color=INK, stroke_width=2.5)
            fr.set_fill(WHITE, opacity=1).move_to(P(x, 0.5))
            ca = coin(a[0], 0.36, a[1]).move_to(P(x, 1.0))
            cb = coin(b[0], 0.36, b[1]).move_to(P(x, 0.0))
            top.append(ca)
            bot.append(cb)
            boxes.add(VGroup(fr, ca, cb))
        blabs = VGroup(*[T(s, 22, color=MUTED).next_to(boxes[i], DOWN, buff=0.15)
                         for i, s in enumerate(["gold gold", "gold silver", "silver silver"])])
        q = T("Drew a gold coin. Is the other gold?", 28, weight="BOLD").move_to(P(0, 2.7))
        bad = card(M(r"\frac{1}{2}?", 44, color=WARN), color=WARN).move_to(P(4.5, 1.3))
        golds = [top[0], bot[0], top[1]]
        partners = [bot[0], top[0], bot[1]]
        marks = VGroup(*[
            VGroup(M(lab, 36, color=INK), MathTex(r"\to", font_size=36, color=MUTED), T(w, 28, color=c, weight="BOLD"))
            .arrange(RIGHT, buff=0.12)
            for lab, w, c in [("G_1", "gold", HL), ("G_2", "gold", HL), ("G_3", "silver", MUTED)]
        ]).arrange(DOWN, aligned_edge=LEFT, buff=0.18).move_to(P(4.5, -0.4))
        ans = M(r"P = \frac{2}{3}", 50, color=HL).move_to(P(4.5, -2.0))

        with self.voiceover("Bertrand's box. Three boxes: gold gold, gold silver, silver silver. Pick a box, pull "
                            "out one coin. It is gold. Is the other one gold? It feels like one half. It is one of "
                            "two boxes. But label the coins. There are three gold coins you could have drawn, and "
                            "two of them have a gold partner. Two thirds.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(LaggedStart(*[FadeIn(b, shift=0.2 * UP) for b in boxes], lag_ratio=0.2), FadeIn(blabs),
                      run_time=1.2)
            self.play(FadeIn(q), run_time=0.6)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(boxes[2].animate.set_opacity(0.25), blabs[2].animate.set_opacity(0.25), run_time=0.6)
            self.play(FadeIn(bad), run_time=0.6)
            self.wait(max(0.1, vo.duration * 0.08))
            self.play(Create(cross_out(bad)), run_time=0.5)
            for gcoin, pcoin, mk in zip(golds, partners, marks):
                self.play(Indicate(gcoin, color=HL, scale_factor=1.3), run_time=0.6)
                self.play(Indicate(pcoin, color=HL, scale_factor=1.2), FadeIn(mk), run_time=0.6)
            self.play(Write(ans), run_time=0.9)

    # ------------------------------------------------------------ scene 7: recap
    def s7(self):
        hd = T("Chapter 2 in five lines", 36, weight="BOLD", color=PRIMARY).move_to(P(0, 3.1))
        lines = [
            ("1", "Given B: shrink the sample space to B, then count."),
            ("2", "P(A and B) = P(A) × P(B given A). Every later factor is conditional."),
            ("3", "Independent: the probabilities multiply. Not the same as exclusive."),
            ("4", "On a tree, multiply along a branch and add across branches."),
            ("5", "At least one = 1 − P(none). Write the condition precisely."),
        ]
        rows = VGroup()
        for k, s in lines:
            num = Circle(radius=0.25, color=PRIMARY, stroke_width=3).set_fill(PRIMARY, opacity=1)
            nt = T(k, 24, color=WHITE, weight="BOLD").move_to(num)
            rows.add(VGroup(VGroup(num, nt), T(s, 26)).arrange(RIGHT, buff=0.35))
        rows.arrange(DOWN, aligned_edge=LEFT, buff=0.38).move_to(P(0, 0.1))
        fit(rows, 13.0)
        nxt = T("Next: Chapter 3 · Total Probability and Bayes' Theorem", 28, color=MUTED).move_to(P(0, -3.1))

        with self.voiceover("Here is the chapter in five lines. Given B, shrink the sample space to B, then count. "
                            "The probability of A and B is the probability of A times the probability of B given "
                            "A. Independent means the probabilities multiply, and it is not the same as exclusive. "
                            "On a tree, multiply along and add across. And at least one is one minus none. Write "
                            "the condition precisely. The mastery lesson mixes all of these. Next: total "
                            "probability and Bayes' theorem.") as vo:
            self.play(FadeIn(hd), run_time=0.6)
            for r in rows:
                self.play(FadeIn(r, shift=0.2 * RIGHT), run_time=0.6)
                self.wait(max(0.1, vo.duration * 0.12))
            self.play(FadeIn(nxt), run_time=0.6)
        self.wait(1.0)
