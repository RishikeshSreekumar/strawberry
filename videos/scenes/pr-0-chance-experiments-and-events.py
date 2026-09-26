import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

# Chapter colour roles (light background).
EA = PRIMARY  # event A / heads = strawberry red
EB = SECONDARY  # event B / tails = teal
HL = ManimColor("#D19A00")  # totals / highlight (gold)
WARN = PRIMARY
OK = GREEN

FIRST10 = [1, 1, 0, 1, 1, 0, 1, 1, 0, 1]  # 7 heads in the first ten flips
SECOND10 = [0, 0, 1, 0, 0, 1, 0, 0, 1, 0]  # 3 heads


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


def check():
    return MathTex(r"\checkmark", color=OK, font_size=48)


def header(s):
    return T(s, 28, weight="BOLD", color=MUTED).to_corner(UL, buff=0.4)


def coin(h, r=0.3, q=False):
    if q:
        c = Circle(radius=r, color=MUTED, stroke_width=3).set_fill(WHITE, opacity=1)
        return VGroup(c, T("?", int(r * 90), color=MUTED, weight="BOLD").move_to(c))
    col = EA if h else EB
    c = Circle(radius=r, color=col, stroke_width=3).set_fill(col, opacity=1)
    return VGroup(c, T("H" if h else "T", int(r * 80), color=WHITE, weight="BOLD").move_to(c))


def dice_grid(ll=P(-5.6, -2.9), cell=0.78, labels=True):
    """6x6 grid: first die along x, second die along y. Returns (group, cells dict)."""
    cells = {}
    sq = VGroup()
    for a in range(1, 7):
        for b in range(1, 7):
            s = Square(side_length=cell, color=MUTED, stroke_width=1.5).set_fill(WHITE, opacity=1)
            s.move_to(ll + P((a - 0.5) * cell, (b - 0.5) * cell))
            cells[(a, b)] = s
            sq.add(s)
    g = VGroup(sq)
    if labels:
        xs = VGroup(*[M(str(a), 26, color=EA).move_to(ll + P((a - 0.5) * cell, -0.28)) for a in range(1, 7)])
        ys = VGroup(*[M(str(b), 26, color=EB).move_to(ll + P(-0.28, (b - 0.5) * cell)) for b in range(1, 7)])
        xl = T("first die", 20, color=EA).move_to(ll + P(3 * cell, -0.68))
        yl = T("second die", 20, color=EB).rotate(PI / 2).move_to(ll + P(-0.68, 3 * cell))
        g.add(xs, ys, xl, yl)
    return g, cells


def venn(center, w=3.4, h=2.4, r=0.78, d=0.45, la="A", lb="B", size=30):
    rect = Rectangle(width=w, height=h, color=INK, stroke_width=2.5).move_to(center)
    ca = Circle(radius=r, color=EA, stroke_width=3).move_to(center + P(-d, 0))
    cb = Circle(radius=r, color=EB, stroke_width=3).move_to(center + P(d, 0))
    s = M("S", size - 4, color=MUTED).move_to(rect.get_corner(UL) + P(0.22, -0.22))
    a = M(la, size, color=EA).move_to(ca.get_center() + P(-r * 0.75, r * 0.95))
    b = M(lb, size, color=EB).move_to(cb.get_center() + P(r * 0.75, r * 0.95))
    return VGroup(rect, ca, cb, s, a, b)


def shade(region, color=HL, opacity=0.55):
    region.set_fill(color, opacity=opacity).set_stroke(width=0)
    return region


class PrCh0Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Probability",
            "Chapter 0 · Chance, Experiments and Events",
            "Chapter zero. Chance, experiments and events.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ scene 1: long-run frequency
    def s1(self):
        hd = header("0.1 · Uncertainty you can measure")
        row1 = VGroup(*[coin(h) for h in FIRST10]).arrange(RIGHT, buff=0.18).move_to(P(-1.2, 1.4))
        row2 = VGroup(*[coin(h) for h in SECOND10]).arrange(RIGHT, buff=0.18).move_to(P(-1.2, -0.6))
        l1 = M(r"\tfrac{7}{10} = 0.7", 40, color=EA).next_to(row1, RIGHT, buff=0.6)
        l2 = M(r"\tfrac{3}{10} = 0.3", 40, color=EB).next_to(row2, RIGHT, buff=0.6)
        cap = T("Ten flips: anything can happen.", 28, color=MUTED).move_to(P(0, -2.4))

        with self.voiceover("Flip a coin. Will it land heads? Nobody can say. Flip it ten times and you might "
                            "get seven heads. Flip ten more and you might get three. A handful of flips "
                            "is pure chance.") as vo:
            self.play(FadeIn(hd), run_time=0.5)
            self.play(LaggedStart(*[FadeIn(c, scale=0.4) for c in row1], lag_ratio=0.15), run_time=1.8)
            self.play(Write(l1), run_time=0.7)
            self.play(LaggedStart(*[FadeIn(c, scale=0.4) for c in row2], lag_ratio=0.15), run_time=1.8)
            self.play(Write(l2), run_time=0.7)
            self.play(FadeIn(cap, shift=0.2 * UP), run_time=0.6)

        rest = np.random.default_rng(2).integers(0, 2, 990)
        flips = np.array(FIRST10 + list(rest))
        n = np.arange(1, 1001)
        freq = np.cumsum(flips) / n
        ax = Axes(x_range=[0, 1000, 200], y_range=[0, 1, 0.25], x_length=10.5, y_length=4.0,
                  axis_config={"color": INK, "stroke_width": 2, "include_tip": False},
                  x_axis_config={"numbers_to_include": [200, 400, 600, 800, 1000], "font_size": 24},
                  y_axis_config={"numbers_to_include": [0, 0.5, 1], "font_size": 24,
                                 "decimal_number_config": {"num_decimal_places": 1, "color": INK}})
        ax.move_to(P(0.4, -1.0))
        for num in ax.x_axis.numbers:
            num.set_color(INK)
        xl = T("number of flips", 22, color=MUTED).next_to(ax.x_axis, DOWN, buff=0.45)
        yl = T("fraction of heads", 22, color=MUTED).next_to(ax.y_axis, UP, buff=0.2).shift(0.9 * RIGHT)
        half = DashedLine(ax.c2p(0, 0.5), ax.c2p(1000, 0.5), color=HL, stroke_width=3)
        curve = VMobject(color=EA, stroke_width=3)
        curve.set_points_as_corners([ax.c2p(x, y) for x, y in zip(n, freq)])
        endlab = M(r"0.503", 30, color=EA).next_to(ax.c2p(1000, freq[-1]), UP, buff=0.2).shift(0.2 * LEFT)
        f = M(r"f_n(\text{H}) = \frac{\text{heads}}{n} \;\longrightarrow\; \tfrac{1}{2}", 40).move_to(P(2.4, 2.3))

        with self.voiceover("But keep flipping, and after every flip plot the fraction of heads so far. Early on "
                            "it swings wildly. By a thousand flips it hugs one half. A single outcome is "
                            "unpredictable, but the long-run proportion is stable. That stable number is what "
                            "probability measures.") as vo:
            self.play(FadeOut(VGroup(row1, row2, l1, l2, cap)), run_time=0.5)
            self.play(Create(ax), FadeIn(xl), FadeIn(yl), run_time=1.0)
            self.play(Create(half), run_time=0.5)
            self.play(Create(curve), run_time=max(3.0, vo.duration * 0.45), rate_func=linear)
            self.play(FadeIn(endlab), Write(f), run_time=1.0)

        streak = VGroup(*[coin(1, 0.38) for _ in range(5)], coin(0, 0.38, q=True)).arrange(RIGHT, buff=0.25)
        streak.move_to(P(0, 1.6))
        due = card(T("\"Tails is due!\"", 30, color=WARN), color=WARN).move_to(P(-3.0, -0.3))
        xx = cross_out(due)
        pr = M(r"P(\text{next flip is H}) = \tfrac{1}{2}", 44, color=INK).move_to(P(2.6, -0.3))
        mem = card(T("The coin has no memory.", 30, color=OK), color=OK).move_to(P(0, -2.3))

        with self.voiceover("Now five heads in a row. Surely tails is due? No. The coin has no memory. The next "
                            "flip is still one half heads. That belief is the gambler's fallacy. The long run "
                            "settles not by correcting streaks, but by drowning them in thousands of new "
                            "flips.") as vo:
            self.play(FadeOut(VGroup(ax, xl, yl, half, curve, endlab, f)), run_time=0.5)
            self.play(LaggedStart(*[FadeIn(c, scale=0.4) for c in streak], lag_ratio=0.2), run_time=1.5)
            self.play(FadeIn(due, shift=0.2 * UP), run_time=0.6)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(Create(xx), run_time=0.5)
            self.play(Write(pr), run_time=0.9)
            self.play(FadeIn(mem, shift=0.2 * UP), run_time=0.7)

    # ------------------------------------------------------------ scene 2: sample spaces
    def s2(self):
        hd = header("0.2 · Experiments and sample spaces")
        root = P(-6.0, 0.0)
        l1 = [P(-4.2, 1.3), P(-4.2, -1.3)]
        l2 = [P(-2.4, 2.0), P(-2.4, 0.65), P(-2.4, -0.65), P(-2.4, -2.0)]
        names = ["HH", "HT", "TH", "TT"]
        e1 = VGroup(*[Line(root, p, color=EA if i == 0 else EB, stroke_width=3) for i, p in enumerate(l1)])
        e2 = VGroup(*[Line(l1[i // 2], p, color=EA if i % 2 == 0 else EB, stroke_width=3)
                      for i, p in enumerate(l2)])
        dots = VGroup(Dot(root, color=INK), *[Dot(p, color=INK) for p in l1 + l2])
        c1 = VGroup(coin(1, 0.22).move_to(P(-5.2, 1.05)), coin(0, 0.22).move_to(P(-5.2, -1.05)))
        leaves = VGroup(*[T(nm, 28, weight="BOLD").next_to(p, RIGHT, buff=0.2) for nm, p in zip(names, l2)])
        sset = M(r"S = \{\text{HH}, \text{HT}, \text{TH}, \text{TT}\}", 40).move_to(P(3.1, 1.2))
        ns = M(r"n(S) = 4", 40, color=HL).move_to(P(3.1, 0.2))
        defs = VGroup(
            T("experiment: an action with an unpredictable result", 22, color=MUTED),
            T("outcome: one possible result", 22, color=MUTED),
            T("sample space S: the list of all outcomes", 22, color=MUTED),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.15).move_to(P(3.1, -1.8))

        with self.voiceover("A random experiment is an action whose result we cannot predict, but whose possible "
                            "results we can list. Each result is an outcome, and the list of all outcomes is the "
                            "sample space, S. Toss two coins. A tree lists them: H H, H T, T H, T T. "
                            "Four outcomes.") as vo:
            self.play(FadeIn(hd), run_time=0.5)
            self.play(FadeIn(defs), run_time=0.8)
            self.play(FadeIn(dots[0]), Create(e1), FadeIn(c1), FadeIn(dots[1:3]), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.25))
            self.play(Create(e2), FadeIn(dots[3:]), run_time=1.0)
            self.play(LaggedStart(*[FadeIn(lf, shift=0.2 * RIGHT) for lf in leaves], lag_ratio=0.25), run_time=1.2)
            self.play(Write(sset), run_time=1.0)
            self.play(FadeIn(ns), run_time=0.5)

        dal = card(VGroup(T("d'Alembert: 0, 1 or 2 heads,", 24),
                          T("so one third each?", 24)).arrange(DOWN, buff=0.1), color=WARN).move_to(P(3.2, 2.2))
        bx = [1.4, 3.2, 5.0]
        blabs = VGroup(*[T(s, 22, color=MUTED).move_to(P(x, -3.2)) for s, x in
                         zip(["0 heads", "1 head", "2 heads"], bx)])
        base = Line(P(0.6, -2.9), P(5.8, -2.9), color=MUTED, stroke_width=2)
        targets = {"TT": P(bx[0], -2.5), "HT": P(bx[1], -2.5), "TH": P(bx[1], -1.95), "HH": P(bx[2], -2.5)}
        moved = VGroup(*[lf.copy() for lf in leaves])
        fr = VGroup(M(r"\tfrac{1}{4}", 40, color=HL).move_to(P(bx[0], -1.2)),
                    M(r"\tfrac{2}{4} = \tfrac{1}{2}", 40, color=HL).move_to(P(bx[1], -1.2)),
                    M(r"\tfrac{1}{4}", 40, color=HL).move_to(P(bx[2], -1.2)))

        with self.voiceover("The great mathematician d'Alembert once argued that two coins give just three results: "
                            "zero, one or two heads, one third each. But one head can happen two ways, H T and "
                            "T H. Sort the four outcomes: one head gets two of them. Toss two coins a thousand "
                            "times and one head turns up about half the time, not a third.") as vo:
            self.play(FadeOut(VGroup(sset, ns, defs)), run_time=0.5)
            self.play(FadeIn(dal, shift=0.2 * DOWN), run_time=0.8)
            self.play(Create(base), FadeIn(blabs), run_time=0.7)
            self.wait(max(0.1, vo.duration * 0.2))
            self.play(*[moved[i].animate.move_to(targets[nm]) for i, nm in enumerate(names)], run_time=1.6)
            self.play(Indicate(moved[1], color=HL), Indicate(moved[2], color=HL), run_time=0.9)
            self.play(LaggedStart(*[Write(x) for x in fr], lag_ratio=0.3), run_time=1.2)
            self.play(Create(cross_out(dal)), run_time=0.5)

        g, cells = dice_grid()
        lab = card(VGroup(M(r"(3, 4)", 36, color=EA), T("is not", 24, color=MUTED), M(r"(4, 3)", 36, color=EB))
                   .arrange(RIGHT, buff=0.25), color=MUTED).move_to(P(3.3, -0.4))
        cnt = M(r"n(S) = 6 \times 6 = 36", 44, color=HL).move_to(P(3.3, 1.2))
        note = T("Every cell is an ordered pair.", 26, color=MUTED).move_to(P(3.3, -2.0))

        with self.voiceover("Two dice? A tree would need thirty six leaves, so use a grid. First die along the "
                            "bottom, second die up the side. Every cell is an ordered pair: six times six, "
                            "thirty six outcomes. And three then four is a different cell from four then "
                            "three.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(LaggedStart(*[FadeIn(s) for s in g[0]], lag_ratio=0.02), FadeIn(g[1:]), run_time=1.5)
            self.play(Write(cnt), FadeIn(note), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.25))
            self.play(cells[(3, 4)].animate.set_fill(EA, opacity=0.8),
                      cells[(4, 3)].animate.set_fill(EB, opacity=0.8), FadeIn(lab), run_time=1.0)

    # ------------------------------------------------------------ scene 3: events as subsets
    def s3(self):
        hd = header("0.3 · Events as subsets")
        g, cells = dice_grid()
        sum7 = [(a, 7 - a) for a in range(1, 7)]
        dbl = [(a, a) for a in range(1, 7)]
        la = card(VGroup(M(r"A:", 34, color=EA), T("sum is 7", 26, color=EA)).arrange(RIGHT, buff=0.2),
                  color=EA).move_to(P(3.0, 2.0))
        na = M(r"n(A) = 6", 36, color=EA).next_to(la, RIGHT, buff=0.35)
        ld = card(VGroup(M(r"D:", 34, color=EB), T("doubles", 26, color=EB)).arrange(RIGHT, buff=0.2),
                  color=EB).move_to(P(3.0, 0.8))
        nd = M(r"n(D) = 6", 36, color=EB).next_to(ld, RIGHT, buff=0.35)
        defn = T("An event is a subset of S.", 30, weight="BOLD", color=INK).move_to(P(3.2, -0.6))

        with self.voiceover("An event is a set of outcomes: a subset of the sample space. The sum is seven is "
                            "these six cells on the diagonal. Doubles is six cells on the other diagonal.") as vo:
            self.play(FadeIn(hd), FadeIn(g), run_time=0.8)
            self.play(FadeIn(defn), run_time=0.6)
            self.play(*[cells[c].animate.set_fill(EA, opacity=0.6) for c in sum7], FadeIn(la), FadeIn(na),
                      run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(*[cells[c].animate.set_fill(EB, opacity=0.6) for c in dbl], FadeIn(ld), FadeIn(nd),
                      run_time=1.2)

        star = Star(n=5, outer_radius=0.28, color=HL, fill_opacity=1).move_to(cells[(3, 4)])
        roll = M(r"\text{rolled } (3, 4)", 36, color=HL).move_to(P(3.2, -0.6))
        ca = check().next_to(na, RIGHT, buff=0.3)
        cd = T("x", 40, color=WARN, weight="BOLD").next_to(nd, RIGHT, buff=0.35)

        with self.voiceover("Now roll. The outcome is three then four. It landed inside the sum is seven, so we "
                            "say that event happened. It landed outside doubles, so doubles did not "
                            "happen.") as vo:
            self.play(FadeOut(defn), FadeIn(star, scale=2), FadeIn(roll), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.25))
            self.play(Indicate(la, color=EA), FadeIn(ca, scale=1.5), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(FadeIn(cd, scale=1.5), run_time=0.6)

        kinds = VGroup(
            VGroup(T("simple event", 24, color=MUTED), M(r"\{(6, 6)\}", 34)),
            VGroup(T("sure event", 24, color=MUTED), M(r"S", 34)),
            VGroup(T("impossible event", 24, color=MUTED), M(r"\text{sum} = 13:\ \varnothing", 34)),
        )
        for k in kinds:
            k.arrange(RIGHT, buff=0.35)
        kinds.arrange(DOWN, aligned_edge=LEFT, buff=0.35).move_to(P(3.0, 0.9))
        cnt = card(VGroup(T("4 outcomes give", 24), M(r"2^4 = 16", 36, color=HL), T("events", 24))
                   .arrange(RIGHT, buff=0.2), color=HL).move_to(P(3.0, -1.5))

        with self.voiceover("A single outcome, like double six, is a simple event. The whole of S is the sure "
                            "event. And the sum is thirteen? No cells at all: the empty set, the impossible "
                            "event. It is still an event. Every subset counts, so two coins, with four "
                            "outcomes, have two to the power four, sixteen events.") as vo:
            self.play(FadeOut(VGroup(la, na, ld, nd, ca, cd, roll, star)),
                      *[cells[c].animate.set_fill(WHITE, opacity=1) for c in set(sum7 + dbl)], run_time=0.6)
            self.play(cells[(6, 6)].animate.set_fill(HL, opacity=0.8), FadeIn(kinds[0]), run_time=0.8)
            self.play(*[s.animate.set_stroke(HL, width=3) for s in cells.values()], FadeIn(kinds[1]),
                      run_time=0.8)
            self.play(*[s.animate.set_stroke(MUTED, width=1.5) for s in cells.values()], run_time=0.4)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(FadeIn(kinds[2]), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(FadeIn(cnt, shift=0.2 * UP), run_time=0.8)

    # ------------------------------------------------------------ scene 4: algebra of events
    def s4(self):
        hd = header("0.4 · The algebra of events")
        xs = [-4.4, 0.0, 4.4]
        vs = [venn(P(x, 0.6)) for x in xs]
        regs = [
            shade(Union(vs[0][1].copy(), vs[0][2].copy())),
            shade(Intersection(vs[1][1].copy(), vs[1][2].copy())),
            shade(Difference(vs[2][0].copy(), vs[2][1].copy())),
        ]
        ops = [(r"A \cup B", "A or B"), (r"A \cap B", "A and B"), (r"A'", "not A")]
        labs = VGroup(*[VGroup(M(o, 44), T(w, 26, color=MUTED)).arrange(DOWN, buff=0.2).move_to(P(x, -1.55))
                        for (o, w), x in zip(ops, xs)])

        with self.voiceover("Words become set operations. A or B is the union: every outcome in at least one of "
                            "them. A and B is the intersection: the overlap. Not A is the complement: everything "
                            "in S outside A.") as vo:
            self.play(FadeIn(hd), *[FadeIn(v) for v in vs], run_time=0.8)
            for i in range(3):
                self.play(FadeIn(regs[i]), FadeIn(labs[i]), run_time=0.8)
                self.wait(max(0.1, vo.duration * 0.12))

        c = P(-3.0, -0.3)
        big = venn(c, w=6.2, h=4.2, r=1.5, d=0.8, la=r"A", lb=r"B", size=40)
        nums = {1: P(-5.6, -2.0), 3: P(-0.4, -2.0), 2: P(-4.5, -0.3), 4: P(-3.0, 0.1), 6: P(-3.0, -0.7),
                5: P(-1.5, -0.3)}
        nm = VGroup(*[M(str(k), 40).move_to(p) for k, p in nums.items()])
        info = VGroup(
            M(r"A = \{2, 4, 6\}", 38, color=EA),
            T("even", 22, color=MUTED),
            M(r"B = \{4, 5, 6\}", 38, color=EB),
            T("at least 4", 22, color=MUTED),
        )
        info[1].next_to(info[0], RIGHT, buff=0.3)
        info[3].next_to(info[2], RIGHT, buff=0.3)
        rowa = VGroup(info[0], info[1])
        rowb = VGroup(info[2], info[3])
        VGroup(rowa, rowb).arrange(DOWN, aligned_edge=LEFT, buff=0.3).move_to(P(3.6, 1.8))
        un = shade(Union(big[1].copy(), big[2].copy()))
        ans = M(r"A \cup B = \{2, 4, 5, 6\}", 42, color=HL).move_to(P(3.6, 0.0))
        wrong = card(VGroup(T("\"exactly one\"", 24, color=WARN), M(r"\{2, 5\}", 34, color=WARN))
                     .arrange(RIGHT, buff=0.25), color=WARN).move_to(P(3.6, -1.6))

        with self.voiceover("Careful with or. Roll one die. A is even, B is at least four. A or B is two, four, "
                            "five and six. Four and six are in both, and they stay in. In probability, or never "
                            "means exactly one.") as vo:
            self.play(FadeOut(VGroup(*vs, *regs, labs)), run_time=0.5)
            self.play(FadeIn(big), FadeIn(nm), FadeIn(rowa), FadeIn(rowb), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(FadeIn(un), run_time=0.8)
            self.add_foreground_mobjects(nm)
            self.play(Write(ans), run_time=0.9)
            self.play(Indicate(nm[3], color=HL), Indicate(nm[4], color=HL), run_time=0.9)
            self.play(FadeIn(wrong), run_time=0.5)
            self.play(Create(cross_out(wrong)), run_time=0.5)

        self.remove_foreground_mobjects(nm)
        vs2 = [venn(P(x, 1.1), w=3.2, h=2.2, r=0.72, d=0.42) for x in xs]
        r2 = [
            shade(Difference(vs2[0][0].copy(), vs2[0][1].copy()), EA, 0.35),
            shade(Difference(vs2[1][0].copy(), vs2[1][2].copy()), EB, 0.35),
            shade(Difference(vs2[2][0].copy(), Union(vs2[2][1].copy(), vs2[2][2].copy())), HL, 0.6),
        ]
        l2 = VGroup(M(r"A'", 40), M(r"B'", 40), M(r"A' \cap B'", 40))
        for lab, x in zip(l2, xs):
            lab.move_to(P(x, -0.4))
        ops2 = VGroup(M(r"\cap", 50, color=MUTED).move_to(P(-2.2, 1.1)), M(r"=", 50, color=MUTED).move_to(P(2.2, 1.1)))
        laws = card(VGroup(M(r"(A \cup B)' = A' \cap B'", 42), M(r"(A \cap B)' = A' \cup B'", 42))
                    .arrange(DOWN, buff=0.25), color=PURPLE).move_to(P(0, -2.2))
        dm = T("De Morgan", 24, color=PURPLE, weight="BOLD").next_to(laws, LEFT, buff=0.3)

        with self.voiceover("Neither A nor B means outside both. Shade not A. Shade not B. Keep only what is "
                            "shaded twice, and you get exactly the outside of the union. Not, A or B, equals "
                            "not A and not B. That is De Morgan's law, and its twin swaps or with and.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(FadeIn(vs2[0]), FadeIn(r2[0]), FadeIn(l2[0]), run_time=0.8)
            self.play(FadeIn(ops2[0]), FadeIn(vs2[1]), FadeIn(r2[1]), FadeIn(l2[1]), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(FadeIn(ops2[1]), FadeIn(vs2[2]), FadeIn(r2[2]), FadeIn(l2[2]), run_time=0.9)
            self.play(FadeIn(laws), FadeIn(dm), run_time=1.0)

        rect = Rectangle(width=8.4, height=2.6, color=INK, stroke_width=2.5).move_to(P(0, 0.9))
        pieces = VGroup()
        cols = [EA, HL, EB]
        for i in range(3):
            pc = Rectangle(width=2.8, height=2.6, stroke_width=0).set_fill(cols[i], opacity=0.3)
            pc.move_to(P(-2.8 + 2.8 * i, 0.9))
            pieces.add(pc)
        cuts = VGroup(Line(P(-1.4, 2.2), P(-1.4, -0.4), color=INK, stroke_width=2.5),
                      Line(P(1.4, 2.2), P(1.4, -0.4), color=INK, stroke_width=2.5))
        plab = VGroup(*[VGroup(M(f"E_{i + 1}", 36, color=cols[i]), M(s, 34))
                        .arrange(DOWN, buff=0.2).move_to(P(-2.8 + 2.8 * i, 0.9))
                        for i, s in enumerate([r"\{1, 2\}", r"\{3, 4\}", r"\{5, 6\}"])])
        bullets = VGroup(
            T("mutually exclusive: no two overlap", 26),
            T("exhaustive: together they cover S", 26),
            T("both at once: a partition of S", 26, color=PURPLE, weight="BOLD"),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.22).move_to(P(0, -1.8))

        with self.voiceover("Events that share no outcome are mutually exclusive. Events that together cover S "
                            "are exhaustive. When both are true, the events form a partition: S sliced into "
                            "pieces, like one, two, then three, four, then five, six.") as vo:
            self.play(FadeOut(VGroup(*vs2, *r2, l2, ops2, laws, dm)), run_time=0.5)
            self.play(Create(rect), run_time=0.6)
            self.play(FadeIn(bullets[0]), run_time=0.6)
            self.play(FadeIn(bullets[1]), run_time=0.6)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(FadeIn(pieces), Create(cuts), run_time=0.8)
            self.play(LaggedStart(*[FadeIn(p) for p in plab], lag_ratio=0.3), FadeIn(bullets[2]), run_time=1.2)

    # ------------------------------------------------------------ scene 5: counting
    def s5(self):
        hd = header("0.5 · Counting outcomes without listing")

        def slot(value, color, lab):
            box = RoundedRectangle(width=1.3, height=1.1, corner_radius=0.12, color=color, stroke_width=3)
            box.set_fill(WHITE, opacity=1)
            num = M(value, 44, color=color).move_to(box)
            t = T(lab, 20, color=MUTED).next_to(box, DOWN, buff=0.15)
            return VGroup(box, num, t)

        s1 = slot("52", EA, "1st card").move_to(P(-5.0, 1.5))
        s2 = slot("51", EB, "2nd card").move_to(P(-2.9, 1.5))
        times = M(r"\times", 44).move_to(P(-3.95, 1.55))
        ordr = M(r"{}^{52}P_2 = 52 \times 51 = 2652", 44).move_to(P(2.6, 1.9))
        ot = T("ordered: (A, K) and (K, A) are different", 24, color=MUTED).next_to(ordr, DOWN, buff=0.2)
        unord = M(r"\binom{52}{2} = \frac{2652}{2!} = 1326", 44, color=HL).move_to(P(2.6, -0.4))
        ut = T("drawn together: each pair counted once", 24, color=MUTED).next_to(unord, DOWN, buff=0.2)

        with self.voiceover("Sample spaces grow fast, so we count instead of listing. Draw two cards from a pack "
                            "of fifty two. If order matters, that is fifty two times fifty one: two thousand six "
                            "hundred and fifty two. If the cards are drawn together, every pair was counted "
                            "twice, so divide by two: fifty two choose two, one thousand three hundred and "
                            "twenty six.") as vo:
            self.play(FadeIn(hd), run_time=0.5)
            self.play(FadeIn(s1, shift=0.2 * UP), FadeIn(times), FadeIn(s2, shift=0.2 * UP), run_time=1.0)
            self.play(Write(ordr), FadeIn(ot), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.3))
            self.play(Write(unord), FadeIn(ut), run_time=1.2)

        q = T("Two cards drawn together. P(both aces)?", 28, weight="BOLD").move_to(P(0, 2.5))
        bad = VGroup(M(r"\frac{\binom{4}{2}}{{}^{52}P_2} = \frac{6}{2652}", 46),
                     T("unordered over ordered", 22, color=WARN)).arrange(DOWN, buff=0.25).move_to(P(-3.3, -0.2))
        good = VGroup(M(r"\frac{\binom{4}{2}}{\binom{52}{2}} = \frac{6}{1326}", 46, color=OK),
                      T("unordered over unordered", 22, color=OK)).arrange(DOWN, buff=0.25).move_to(P(3.3, -0.2))
        tip = card(T("Pick one view, ordered or unordered, and use it top and bottom.", 26, color=PURPLE),
                   color=PURPLE).move_to(P(0, -2.6))

        with self.voiceover("The trap is mixing the two views. Two cards drawn together: what is the chance both "
                            "are aces? Six pairs of aces, unordered, over two thousand six hundred and fifty two, "
                            "ordered, is off by a factor of two. Count both unordered: six over one thousand "
                            "three hundred and twenty six. Pick one view and use it for the top and the "
                            "bottom.") as vo:
            self.play(FadeOut(VGroup(s1, s2, times, ordr, ot, unord, ut)), run_time=0.5)
            self.play(FadeIn(q), run_time=0.6)
            self.play(Write(bad), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.2))
            self.play(Create(cross_out(bad)), run_time=0.5)
            self.play(Write(good), run_time=1.2)
            self.play(FadeIn(tip, shift=0.2 * UP), run_time=0.7)

    # ------------------------------------------------------------ scene 6: recap
    def s6(self):
        hd = T("Chapter 0 in five lines", 36, weight="BOLD", color=PRIMARY).move_to(P(0, 3.1))
        lines = [
            ("1", "One flip is unpredictable; the long-run fraction is stable."),
            ("2", "An experiment's outcomes form the sample space S."),
            ("3", "An event is a subset of S. It happens if the outcome lands inside."),
            ("4", "or = union (includes both), and = intersection, not = complement."),
            ("5", "Count, don't list, and keep order consistent top and bottom."),
        ]
        rows = VGroup()
        for k, s in lines:
            num = Circle(radius=0.25, color=PRIMARY, stroke_width=3).set_fill(PRIMARY, opacity=1)
            nt = T(k, 24, color=WHITE, weight="BOLD").move_to(num)
            rows.add(VGroup(VGroup(num, nt), T(s, 26)).arrange(RIGHT, buff=0.35))
        rows.arrange(DOWN, aligned_edge=LEFT, buff=0.38).move_to(P(0, 0.1))
        nxt = T("Next: putting numbers on events.", 28, color=MUTED).move_to(P(0, -3.1))

        with self.voiceover("Here is the chapter in five lines. One flip is unpredictable, but the long-run "
                            "fraction is stable. The outcomes of an experiment form the sample space. An event "
                            "is a subset of it, and it happens when the outcome lands inside. Or is union and "
                            "includes both, and is intersection, not is complement. And count, don't list, "
                            "keeping order consistent. Next, we put numbers on events.") as vo:
            self.play(FadeIn(hd), run_time=0.6)
            for r in rows:
                self.play(FadeIn(r, shift=0.2 * RIGHT), run_time=0.6)
                self.wait(max(0.1, vo.duration * 0.12))
            self.play(FadeIn(nxt), run_time=0.6)
        self.wait(1.0)
