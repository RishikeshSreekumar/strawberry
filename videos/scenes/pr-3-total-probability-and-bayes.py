import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

# Chapter colour roles (light background).
CAUSE = SECONDARY  # hidden causes / hypotheses = teal
EVID = PRIMARY  # the observed evidence (defective, positive) = strawberry red
HL = ManimColor("#D19A00")  # totals / posteriors (gold)
LAW = PURPLE  # general laws
WARN = PRIMARY
OK = GREEN

MACH = [("M_1", 0.25, 0.05), ("M_2", 0.35, 0.04), ("M_3", 0.40, 0.02)]
LEAF = ["0.0125", "0.0140", "0.0080"]


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


def edge_label(a, b, tex, color, size=26, side=UP, buff=0.12):
    lab = M(tex, size, color=color)
    mid = (a + b) / 2
    lab.move_to(mid)
    d = b - a
    n = np.array([-d[1], d[0], 0.0])
    n = n / (np.linalg.norm(n) + 1e-9)
    if np.dot(n, side) < 0:
        n = -n
    lab.shift(n * (buff + 0.18))
    return lab


def factory_tree():
    """Two-stage tree: machine, then defective (D) or OK. Returns dict of parts."""
    root = P(-6.3, -0.3)
    ys = [2.0, -0.3, -2.6]
    mpos = [P(-3.6, y) for y in ys]
    parts = {"e1": VGroup(), "l1": VGroup(), "mnode": VGroup(), "e2": VGroup(), "l2": VGroup(),
             "dleaf": VGroup(), "okleaf": VGroup(), "prod": VGroup()}
    for (name, pm, pd), mp in zip(MACH, mpos):
        parts["e1"].add(Line(root, mp, color=CAUSE, stroke_width=3))
        parts["l1"].add(edge_label(root, mp, f"{pm:.2f}", CAUSE, 24))
        parts["mnode"].add(card(M(name, 32, color=CAUSE), pad=0.1, color=CAUSE))
        parts["mnode"][-1].move_to(mp)
        dp, op = mp + P(2.3, 0.55), mp + P(2.3, -0.55)
        start = mp + P(0.45, 0)
        parts["e2"].add(Line(start, dp, color=EVID, stroke_width=3), Line(start, op, color=MUTED, stroke_width=2))
        parts["l2"].add(M(f"{pd:.2f}", 22, color=EVID).move_to(start + P(1.0, 0.55)))
        parts["dleaf"].add(M("D", 30, color=EVID).next_to(dp, RIGHT, buff=0.1))
        parts["okleaf"].add(T("OK", 20, color=MUTED).next_to(op, RIGHT, buff=0.1))
    for i, lf in enumerate(parts["dleaf"]):
        parts["prod"].add(M(LEAF[i], 30, color=HL).next_to(lf, RIGHT, buff=0.35))
    parts["root"] = Dot(root, color=INK, radius=0.07)
    return parts


def door(label, w=1.5, h=2.4, color=MUTED):
    r = RoundedRectangle(width=w, height=h, corner_radius=0.1, color=color, stroke_width=3)
    r.set_fill(ManimColor("#F3E6DC"), opacity=1)
    knob = Dot(r.get_right() + P(-0.22, -0.1), radius=0.06, color=MUTED)
    n = T(label, 34, weight="BOLD", color=INK).move_to(r.get_top() + P(0, -0.45))
    return VGroup(r, knob, n)


class PrCh3Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Probability",
            "Chapter 3 · Total Probability and Bayes' Theorem",
            "Chapter three. Total probability and Bayes' theorem.",
        )
        for part in (self.s0, self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ hook
    def s0(self):
        q = card(VGroup(T("A disease affects 1 in 100 people.", 30),
                        T("A test catches 99% of cases.", 30),
                        T("You test positive.", 30, weight="BOLD", color=EVID)).arrange(DOWN, buff=0.25),
                 pad=0.4, color=MUTED).move_to(P(0, 1.2))
        ask = M(r"P(\text{sick} \mid \text{positive}) = \;?", 48, color=HL).move_to(P(0, -1.3))
        guess = T("Most people say 99%.", 30, color=MUTED).move_to(P(0, -2.5))

        with self.voiceover("A disease affects one person in a hundred. A test catches ninety nine percent of "
                            "cases. You test positive. How likely is it that you are actually sick? Most people "
                            "say ninety nine percent. The true answer is about one in six, and this chapter "
                            "shows you why.") as vo:
            self.play(FadeIn(q, shift=0.2 * UP), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.25))
            self.play(Write(ask), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(FadeIn(guess), run_time=0.6)

        with self.voiceover("The problem has a hidden cause: sick or healthy, and we only see the effect. "
                            "Two tools handle it. Total probability splits by the cause. Bayes' theorem "
                            "runs the reasoning backwards, from effect to cause.") as vo:
            self.play(FadeOut(guess), run_time=0.4)
            tools = VGroup(
                card(VGroup(T("total probability", 28, weight="BOLD", color=CAUSE),
                            T("cause  ->  effect", 24, color=MUTED)).arrange(DOWN, buff=0.15), color=CAUSE),
                card(VGroup(T("Bayes' theorem", 28, weight="BOLD", color=EVID),
                            T("effect  ->  cause", 24, color=MUTED)).arrange(DOWN, buff=0.15), color=EVID),
            ).arrange(RIGHT, buff=1.2).move_to(P(0, -2.6))
            self.play(ask.animate.shift(0.6 * UP), run_time=0.5)
            self.play(LaggedStart(*[FadeIn(t, shift=0.2 * UP) for t in tools], lag_ratio=0.5), run_time=1.4)

    # ------------------------------------------------------------ 3.1 total probability
    def s1(self):
        hd = header("3.1 · The law of total probability")
        tr = factory_tree()
        story = VGroup(T("3 machines make bolts.", 24, color=MUTED),
                       T("Pick a bolt: is it defective?", 24, color=MUTED)).arrange(DOWN, aligned_edge=LEFT, buff=0.1)
        story.move_to(P(4.5, 2.6))

        with self.voiceover("A factory makes bolts on three machines. Machine one makes a quarter of them, "
                            "machine two thirty five percent, machine three forty percent. Their defect rates "
                            "are five, four and two percent. Pick a bolt. What is the chance it is defective? "
                            "We are not told which machine made it, so draw a tree with the hidden cause "
                            "first.") as vo:
            self.play(FadeIn(hd), FadeIn(story), run_time=0.6)
            self.play(FadeIn(tr["root"]), Create(tr["e1"]), run_time=1.0)
            self.play(FadeIn(tr["mnode"]), FadeIn(tr["l1"]), run_time=0.9)
            self.wait(max(0.1, vo.duration * 0.2))
            self.play(Create(tr["e2"]), run_time=1.0)
            self.play(FadeIn(tr["l2"]), FadeIn(tr["dleaf"]), FadeIn(tr["okleaf"]), run_time=0.9)

        tot = VGroup(M(r"P(D)", 38, color=EVID),
                     M(r"= 0.0125 + 0.0140 + 0.0080", 32),
                     M(r"= 0.0345", 40, color=HL)).arrange(DOWN, aligned_edge=LEFT, buff=0.25)
        tot.move_to(P(4.4, 0.2))

        with self.voiceover("Multiply along each path to a defective leaf. Zero point two five times zero point "
                            "zero five, and so on. A defective bolt came from exactly one machine, so these "
                            "three pieces do not overlap, and they simply add: about three point four five "
                            "percent.") as vo:
            self.play(FadeOut(story), run_time=0.3)
            for i in range(3):
                self.play(Indicate(tr["dleaf"][i], color=HL), FadeIn(tr["prod"][i], shift=0.2 * RIGHT),
                          run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(Write(tot[0]), run_time=0.5)
            self.play(Write(tot[1]), run_time=1.0)
            self.play(Write(tot[2]), run_time=0.7)

        wrong = card(VGroup(M(r"\frac{5\% + 4\% + 2\%}{3} \approx 3.67\%", 34, color=WARN),
                            T("plain average", 22, color=MUTED)).arrange(DOWN, buff=0.3),
                     color=WARN).move_to(P(4.4, 0.4))
        law = card(M(r"P(A) = \sum_i P(E_i)\,P(A \mid E_i)", 38, color=LAW), color=LAW).move_to(P(4.4, -2.2))
        note = T("a weighted average over the causes", 22, color=LAW).next_to(law, UP, buff=0.2)

        with self.voiceover("Do not just average the three rates. That treats each machine as if it made a third "
                            "of the bolts. Each rate must be weighted by how often its cause happens. That is "
                            "the law of total probability: split by a partition of causes, then add. "
                            "P of A is the sum of P of E i, times P of A given E i.") as vo:
            self.play(FadeOut(tot), run_time=0.4)
            self.play(FadeIn(wrong, shift=0.2 * UP), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(Create(cross_out(wrong)), run_time=0.5)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(FadeIn(law, shift=0.2 * UP), FadeIn(note), run_time=1.0)

    # ------------------------------------------------------------ 3.2 Bayes
    def s2(self):
        hd = header("3.2 · Reversing the tree: Bayes' theorem")
        tr = factory_tree()
        tree = VGroup(tr["root"], tr["e1"], tr["l1"], tr["mnode"], tr["e2"], tr["l2"], tr["dleaf"],
                      tr["okleaf"], tr["prod"])
        seen = card(T("The bolt is defective. Which machine?", 24, color=EVID), color=EVID).move_to(P(3.7, 2.9))

        with self.voiceover("Now the inspector finds a defective bolt, and asks the backward question: which "
                            "machine made it? Knowing the bolt is defective rules out every OK leaf. Only the "
                            "three defective leaves survive.") as vo:
            self.play(FadeIn(hd), FadeIn(tree), run_time=0.8)
            self.play(FadeIn(seen, shift=0.2 * DOWN), run_time=0.7)
            self.wait(max(0.1, vo.duration * 0.3))
            self.play(tr["okleaf"].animate.set_opacity(0.15),
                      *[tr["e2"][2 * i + 1].animate.set_stroke(opacity=0.15) for i in range(3)], run_time=1.0)
            self.play(*[Indicate(p, color=HL) for p in tr["prod"]], run_time=0.9)

        base_y = -2.7
        scale = 6.5
        prior = [0.25, 0.35, 0.40]
        post = [125 / 345, 140 / 345, 80 / 345]
        xs = [2.7, 4.3, 5.9]
        pb, qb, pl, ql, names = VGroup(), VGroup(), VGroup(), VGroup(), VGroup()
        for x, a, b, (nm, _, _) in zip(xs, prior, post, MACH):
            r1 = Rectangle(width=0.5, height=a * scale, color=MUTED, stroke_width=2).set_fill(GRID, opacity=1)
            r1.move_to(P(x - 0.28, base_y + a * scale / 2))
            r2 = Rectangle(width=0.5, height=b * scale, color=HL, stroke_width=2).set_fill(HL, opacity=0.8)
            r2.move_to(P(x + 0.28, base_y + b * scale / 2))
            pb.add(r1)
            qb.add(r2)
            pl.add(M(f"{round(a * 100)}\\%", 20, color=MUTED).next_to(r1, UP, buff=0.08))
            ql.add(M(f"{round(b * 100)}\\%", 20, color=HL).next_to(r2, UP, buff=0.08))
            names.add(M(nm, 28, color=CAUSE).move_to(P(x, base_y - 0.3)))
        axis = Line(P(2.0, base_y), P(6.6, base_y), color=MUTED, stroke_width=2)
        leg = VGroup(
            VGroup(Square(0.22, color=MUTED).set_fill(GRID, opacity=1), T("before (prior)", 20, color=MUTED))
            .arrange(RIGHT, buff=0.15),
            VGroup(Square(0.22, color=HL).set_fill(HL, opacity=0.8), T("after (posterior)", 20, color=HL))
            .arrange(RIGHT, buff=0.15),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.12).move_to(P(4.3, 1.9))
        frac = M(r"P(M_2 \mid D) = \frac{0.0140}{0.0345} \approx 0.41", 30, color=HL).move_to(P(4.3, 1.05))

        with self.voiceover("Each machine's share of the defective bolts is its leaf divided by the total. "
                            "Machine two: zero point zero one four over zero point zero three four five, about "
                            "forty one percent. Compare before and after. The careless machine one rises from "
                            "twenty five to thirty six percent. The careful machine three falls from forty to "
                            "twenty three.") as vo:
            self.play(FadeOut(seen), run_time=0.3)
            self.play(Write(frac), run_time=1.0)
            self.play(Create(axis), FadeIn(names), FadeIn(leg), run_time=0.7)
            self.play(*[GrowFromEdge(r, DOWN) for r in pb], FadeIn(pl), run_time=0.9)
            self.wait(max(0.1, vo.duration * 0.2))
            self.play(*[GrowFromEdge(r, DOWN) for r in qb], FadeIn(ql), run_time=1.1)
            self.play(Indicate(VGroup(qb[0], ql[0]), color=HL), run_time=0.7)
            self.play(Indicate(VGroup(qb[2], ql[2]), color=HL), run_time=0.7)

        bayes = MathTex(r"P(E_i \mid A)", r"=", r"\frac{P(E_i)\,P(A \mid E_i)}{\sum_j P(E_j)\,P(A \mid E_j)}",
                        font_size=46)
        bayes.move_to(P(0, 0.9))
        bayes[0].set_color(HL)
        b1 = Brace(bayes[0], DOWN, color=HL)
        t1 = T("posterior", 22, color=HL).next_to(b1, DOWN, buff=0.1)
        num = bayes[2]
        t2 = T("prior  x  likelihood", 22, color=CAUSE).next_to(num, UP, buff=0.2)
        t3 = T("total probability", 22, color=LAW).next_to(num, DOWN, buff=0.2)
        warn = card(VGroup(M(r"P(D \mid M_1) = 0.05", 34), T("is not", 24, color=WARN),
                           M(r"P(M_1 \mid D) \approx 0.36", 34, color=HL)).arrange(RIGHT, buff=0.3),
                    color=WARN).move_to(P(0, -2.4))

        with self.voiceover("Written as a formula, that is Bayes' theorem. The posterior, P of E i given A, "
                            "equals the prior times the likelihood, divided by the total probability of A. "
                            "And notice: P of D given M one is five percent, but P of M one given D is thirty "
                            "six percent. Swapping the bar changes the question.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(Write(bayes), run_time=1.5)
            self.play(GrowFromCenter(b1), FadeIn(t1), run_time=0.6)
            self.play(FadeIn(t2), FadeIn(t3), run_time=0.7)
            self.wait(max(0.1, vo.duration * 0.2))
            self.play(FadeIn(warn, shift=0.2 * UP), run_time=0.9)

    # ------------------------------------------------------------ 3.3 base rate
    def s3(self):
        hd = header("3.3 · The base-rate trap")
        root = P(-5.6, 0)
        sick, healthy = P(-2.6, 1.7), P(-2.6, -1.7)
        leaves = [P(0.4, 2.5), P(0.4, 0.9), P(0.4, -0.9), P(0.4, -2.5)]

        def node(tex, pos, color, size=32):
            return card(M(tex, size, color=color), pad=0.12, color=color).move_to(pos)

        n0 = node(r"10{,}000", root, INK)
        n1 = node(r"100 \text{ sick}", sick, EVID)
        n2 = node(r"9{,}900 \text{ healthy}", healthy, CAUSE)
        lf = [node(r"99\ +", leaves[0], EVID, 30), node(r"1\ -", leaves[1], MUTED, 30),
              node(r"495\ +", leaves[2], EVID, 30), node(r"9{,}405\ -", leaves[3], MUTED, 30)]
        e1 = VGroup(Line(n0.get_right(), n1.get_left(), color=INK, stroke_width=2.5),
                    Line(n0.get_right(), n2.get_left(), color=INK, stroke_width=2.5))
        e2 = VGroup(*[Line((n1 if i < 2 else n2).get_right(), lf[i].get_left(), color=MUTED, stroke_width=2)
                      for i in range(4)])
        el = VGroup(edge_label(n0.get_right(), n1.get_left(), r"1\%", MUTED, 22),
                    edge_label(n0.get_right(), n2.get_left(), r"99\%", MUTED, 22, side=DOWN),
                    edge_label(n1.get_right(), lf[0].get_left(), r"99\%", MUTED, 20),
                    edge_label(n2.get_right(), lf[2].get_left(), r"5\%", MUTED, 20))

        with self.voiceover("Back to the test. Forget formulas and picture ten thousand people. One percent, "
                            "that is one hundred, are sick, and the test catches ninety nine of them. Of the "
                            "nine thousand nine hundred healthy people, the test wrongly flags five percent: "
                            "four hundred and ninety five.") as vo:
            self.play(FadeIn(hd), FadeIn(n0), run_time=0.6)
            self.play(Create(e1), FadeIn(n1), FadeIn(n2), FadeIn(el[:2]), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(Create(e2[:2]), FadeIn(lf[0]), FadeIn(lf[1]), FadeIn(el[2]), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.2))
            self.play(Create(e2[2:]), FadeIn(lf[2]), FadeIn(lf[3]), FadeIn(el[3]), run_time=1.0)

        res = VGroup(M(r"\text{positives} = 99 + 495 = 594", 32),
                     M(r"P(\text{sick} \mid +) = \frac{99}{594} = \frac{1}{6}", 38, color=HL)
                     ).arrange(DOWN, buff=0.4).move_to(P(4.4, 0.8))
        myth = card(VGroup(T("\"99% accurate\"", 24, color=WARN),
                           T("means 99% sick?", 24, color=WARN)).arrange(DOWN, buff=0.08), color=WARN)
        myth.move_to(P(4.4, -1.8))

        with self.voiceover("Everyone who tests positive is in these two boxes: ninety nine sick plus four "
                            "hundred ninety five healthy, five hundred ninety four in all. Only ninety nine of "
                            "them are sick. That is one in six. The disease is so rare that false alarms from "
                            "the huge healthy group swamp the true cases. Ignoring that rarity is base rate "
                            "neglect.") as vo:
            self.play(Indicate(lf[0], color=HL), Indicate(lf[2], color=HL), run_time=1.0)
            self.play(Write(res[0]), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(Write(res[1]), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(FadeIn(myth), run_time=0.6)
            self.play(Create(cross_out(myth)), run_time=0.5)

        ax = Axes(x_range=[0, 1, 0.25], y_range=[0, 1, 0.25], x_length=6.0, y_length=4.4,
                  axis_config={"color": INK, "stroke_width": 2, "include_tip": False},
                  x_axis_config={"numbers_to_include": [0, 0.5, 1], "font_size": 22,
                                 "decimal_number_config": {"num_decimal_places": 1, "color": INK}},
                  y_axis_config={"numbers_to_include": [0.5, 1], "font_size": 22,
                                 "decimal_number_config": {"num_decimal_places": 1, "color": INK}})
        ax.move_to(P(-2.2, -0.4))
        for nb in list(ax.x_axis.numbers) + list(ax.y_axis.numbers):
            nb.set_color(INK)
        xl = T("prior: how common the disease is", 20, color=MUTED).next_to(ax.x_axis, DOWN, buff=0.4)
        yl = T("P(sick | positive)", 20, color=MUTED).next_to(ax.y_axis, UP, buff=0.15)

        def f(x):
            return 0.99 * x / (0.99 * x + 0.05 * (1 - x))

        curve = ax.plot(f, x_range=[0.0005, 1, 0.002], color=HL, stroke_width=4)
        pts = VGroup()
        labs = VGroup()
        for x, s in [(0.01, r"0.01 \to 0.17"), (0.1, r"0.1 \to 0.69"), (0.5, r"0.5 \to 0.95")]:
            pts.add(Dot(ax.c2p(x, f(x)), color=EVID, radius=0.08))
            labs.add(M(s, 30, color=EVID))
        labs.arrange(DOWN, aligned_edge=LEFT, buff=0.3).move_to(P(4.3, 0.3))
        cap = T("Same test, very different meaning.", 26, color=INK).move_to(P(4.1, -1.6))

        with self.voiceover("Now vary the prior. Plot the chance you are sick after a positive result against "
                            "how common the disease is. At one percent, one in six. At ten percent, about "
                            "seventy percent. At fifty percent, ninety five. The same test result means very "
                            "different things for different people.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(Create(ax), FadeIn(xl), FadeIn(yl), run_time=0.9)
            self.play(Create(curve), run_time=1.6)
            for i in range(3):
                self.play(FadeIn(pts[i], scale=1.8), FadeIn(labs[i]), run_time=0.7)
                self.wait(max(0.1, vo.duration * 0.06))
            self.play(FadeIn(cap), run_time=0.6)

    # ------------------------------------------------------------ 3.4 many causes
    def s4(self):
        hd = header("3.4 · Bayes with many causes")
        story = card(VGroup(T("A tells the truth 3 times out of 4.", 26),
                            T("A die is thrown. A says: \"It's a six.\"", 26)).arrange(DOWN, buff=0.12),
                     color=MUTED).move_to(P(0, 2.4))

        heads = [T("hypothesis", 22, color=MUTED), T("prior", 22, color=MUTED),
                 M(r"P(\text{says six} \mid E)", 26, color=MUTED), T("joint", 22, color=MUTED),
                 T("posterior", 22, color=MUTED)]
        rows = [
            [T("six", 26, color=CAUSE), M(r"\tfrac16", 36), M(r"\tfrac34", 36), M(r"\tfrac{3}{24}", 36),
             M(r"\tfrac38", 38, color=HL)],
            [T("not six", 26, color=CAUSE), M(r"\tfrac56", 36), M(r"\tfrac14", 36), M(r"\tfrac{5}{24}", 36),
             M(r"\tfrac58", 38, color=HL)],
            [T("total", 24, weight="BOLD"), M(r"1", 32), VMobject(), M(r"\tfrac{8}{24}", 36), M(r"1", 32)],
        ]
        xs = [-4.6, -2.3, 0.2, 2.7, 4.9]
        ys = [0.9, -0.1, -1.1, -2.1]
        for j, h in enumerate(heads):
            h.move_to(P(xs[j], ys[0]))
        for i, r in enumerate(rows):
            for j, c in enumerate(r):
                c.move_to(P(xs[j], ys[i + 1]))
        rule = Line(P(-5.8, 0.5), P(5.8, 0.5), color=MUTED, stroke_width=2)
        rule2 = Line(P(-5.8, -1.6), P(5.8, -1.6), color=MUTED, stroke_width=1.5)
        cols = [VGroup(heads[j], *[r[j] for r in rows]) for j in range(5)]

        with self.voiceover("Exam problems dress Bayes up in costumes: liars, bags of balls, guessing on "
                            "multiple choice. Underneath, it is always one table. A tells the truth three times "
                            "out of four. A die is thrown, and A says it is a six. Is it?") as vo:
            self.play(FadeIn(hd), FadeIn(story, shift=0.2 * DOWN), run_time=0.9)
            self.wait(max(0.1, vo.duration * 0.3))
            self.play(FadeIn(VGroup(*heads)), Create(rule), run_time=0.8)
            self.play(FadeIn(cols[0][1:]), Create(rule2), run_time=0.6)

        with self.voiceover("Column two, the priors: one sixth and five sixths. Column three, the likelihood of "
                            "what we heard. If it is a six, A says six by telling the truth, three quarters. If "
                            "not, A says six by lying, one quarter. Multiply across for the joints: three over "
                            "twenty four and five over twenty four. Divide each by their total, eight over "
                            "twenty four. The answer is three eighths.") as vo:
            self.play(FadeIn(cols[1][1:]), run_time=0.7)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(FadeIn(cols[2][1:3]), run_time=0.7)
            self.wait(max(0.1, vo.duration * 0.2))
            self.play(FadeIn(cols[3][1:3]), run_time=0.7)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(FadeIn(cols[3][3]), FadeIn(cols[1][3]), run_time=0.6)
            self.play(FadeIn(cols[4][1:]), run_time=0.8)
            self.play(Indicate(cols[4][1], color=HL, scale_factor=1.4), run_time=0.8)

        note = T("A is usually honest, but sixes are rare.", 26, color=INK).move_to(P(0, -3.1))
        with self.voiceover("A is usually honest, yet the answer is below one half, because sixes are rare to "
                            "begin with. Causes, priors, likelihoods, joints, divide. Five columns solve every "
                            "one of these problems.") as vo:
            self.play(FadeIn(note, shift=0.2 * UP), run_time=0.8)

    # ------------------------------------------------------------ 3.5 Monty Hall
    def s5(self):
        hd = header("3.5 · The Monty Hall problem")
        doors = VGroup(door("1"), door("2"), door("3")).arrange(RIGHT, buff=0.8).move_to(P(-2.6, 0.5))
        pick = SurroundingRectangle(doors[0], color=CAUSE, buff=0.1, stroke_width=5)
        picklab = T("your pick", 22, color=CAUSE).next_to(pick, DOWN, buff=0.15)
        p1 = M(r"\tfrac13", 40, color=CAUSE).next_to(picklab, DOWN, buff=0.15)
        br = Brace(VGroup(doors[1], doors[2]), DOWN, color=HL)
        p23 = M(r"\tfrac23", 40, color=HL).next_to(br, DOWN, buff=0.15)

        with self.voiceover("Three doors: one hides a car, two hide goats. You pick door one. Your door has a "
                            "one third chance. The other two, together, have two thirds.") as vo:
            self.play(FadeIn(hd), LaggedStart(*[FadeIn(d, shift=0.2 * UP) for d in doors], lag_ratio=0.2),
                      run_time=1.2)
            self.play(Create(pick), FadeIn(picklab), run_time=0.7)
            self.play(FadeIn(p1), run_time=0.5)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(GrowFromCenter(br), FadeIn(p23), run_time=0.8)

        goat = VGroup(Rectangle(width=1.5, height=2.4, color=MUTED, stroke_width=3).set_fill(WHITE, opacity=1),
                      T("goat", 30, color=MUTED, weight="BOLD")).move_to(doors[2])
        goat[1].move_to(doors[2])
        p2 = M(r"\tfrac23", 44, color=HL).next_to(doors[1], DOWN, buff=0.6)
        p3 = M(r"0", 40, color=MUTED).next_to(doors[2], DOWN, buff=0.6)
        myth = card(T("\"Two doors left, so 50-50\"", 24, color=WARN), color=WARN).move_to(P(4.3, 1.8))
        calc = M(r"P(\text{car at }2 \mid \text{opens }3) = \frac{\tfrac13 \cdot 1}{\tfrac13 \cdot \tfrac12 + "
                 r"\tfrac13 \cdot 1} = \frac23", 30, color=INK).move_to(P(0, -3.1))

        with self.voiceover("The host, who knows where the car is, opens door three and shows a goat. He never "
                            "opens your door and never reveals the car, so his choice carries information. The "
                            "whole two thirds now sits on door two. Two doors left does not mean fifty fifty. "
                            "Bayes agrees: switching wins two thirds of the time.") as vo:
            self.play(FadeIn(goat), run_time=0.8)
            self.play(FadeOut(br), ReplacementTransform(p23, p2), FadeIn(p3), run_time=1.2)
            self.play(Indicate(doors[1], color=HL), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(FadeIn(myth), run_time=0.6)
            self.play(Create(cross_out(myth)), run_time=0.5)
            self.play(Write(calc), run_time=1.4)

        grid = VGroup(*[RoundedRectangle(width=0.36, height=0.5, corner_radius=0.05, color=MUTED, stroke_width=1.5)
                        .set_fill(ManimColor("#F3E6DC"), opacity=1) for _ in range(100)])
        grid.arrange_in_grid(rows=5, cols=20, buff=(0.12, 0.16)).move_to(P(0, 0.2))
        mine = grid[0]
        keep = grid[57]
        others = VGroup(*[g for i, g in enumerate(grid) if i not in (0, 57)])
        l1 = M(r"\tfrac{1}{100}", 36, color=CAUSE).move_to(P(-3.2, -2.3))
        l2 = M(r"\tfrac{99}{100}", 36, color=HL).move_to(P(3.2, -2.3))
        t1 = T("stick", 24, color=CAUSE).next_to(l1, LEFT, buff=0.3)
        t2 = T("switch", 24, color=HL).next_to(l2, LEFT, buff=0.3)

        with self.voiceover("Still not convinced? Take a hundred doors. You pick one. The host opens ninety "
                            "eight goats and carefully leaves one other door shut. Would you stick with your "
                            "one in a hundred guess, or switch to the door he avoided?") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(FadeIn(grid, lag_ratio=0.01), run_time=1.2)
            self.play(mine.animate.set_fill(CAUSE, opacity=0.9), run_time=0.5)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(others.animate.set_opacity(0.12), run_time=1.5)
            self.play(keep.animate.set_fill(HL, opacity=0.9), run_time=0.5)
            self.play(FadeIn(VGroup(l1, t1)), FadeIn(VGroup(l2, t2)), run_time=0.8)

    # ------------------------------------------------------------ 3.6 updating
    def s6(self):
        hd = header("3.6 · Updating beliefs")
        chain = VGroup(M(r"1\%", 50, color=CAUSE), M(r"\approx 17\%", 50, color=HL),
                       M(r"\approx 80\%", 50, color=EVID)).arrange(RIGHT, buff=2.4).move_to(P(0, 1.3))
        arrows = VGroup(*[Arrow(chain[i].get_right(), chain[i + 1].get_left(), color=MUTED, buff=0.25,
                                stroke_width=4) for i in range(2)])
        al = VGroup(*[T(s, 22, color=MUTED).next_to(a, UP, buff=0.12)
                      for s, a in zip(["1st positive", "2nd positive"], arrows)])
        up = VGroup(M(r"+16 \text{ points}", 30, color=MUTED).next_to(arrows[0], DOWN, buff=0.3),
                    M(r"+63 \text{ points}", 30, color=MUTED).next_to(arrows[1], DOWN, buff=0.3))
        eq = M(r"P(\text{sick} \mid +,+) = \frac{\tfrac16 \cdot 0.99}{\tfrac16 \cdot 0.99 + \tfrac56 \cdot 0.05}"
               r"\approx 0.80", 34).move_to(P(0, -1.3))
        motto = T("Today's posterior is tomorrow's prior.", 30, weight="BOLD", color=LAW).move_to(P(0, -2.8))

        with self.voiceover("One positive test took you from one percent to one in six. So the doctor orders a "
                            "second, independent test, and it is positive too. Just run Bayes again, with one "
                            "sixth as the new prior. You land near eighty percent. Today's posterior is "
                            "tomorrow's prior.") as vo:
            self.play(FadeIn(hd), FadeIn(chain[0]), run_time=0.6)
            self.play(GrowArrow(arrows[0]), FadeIn(al[0]), FadeIn(chain[1]), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.2))
            self.play(GrowArrow(arrows[1]), FadeIn(al[1]), FadeIn(chain[2]), run_time=1.0)
            self.play(Write(eq), run_time=1.5)
            self.play(FadeIn(motto, shift=0.2 * UP), run_time=0.7)

        with self.voiceover("Notice the jumps. The first positive added sixteen points. The identical second "
                            "one added more than sixty. Evidence does not move you by a fixed amount. How far "
                            "it moves you depends on where you start.") as vo:
            self.play(FadeOut(eq), run_time=0.4)
            self.play(FadeIn(up[0]), run_time=0.6)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(FadeIn(up[1]), run_time=0.6)
            self.play(Indicate(up[1], color=EVID), run_time=0.8)

        ax = Axes(x_range=[0, 10, 1], y_range=[0, 1, 0.25], x_length=7.0, y_length=4.2,
                  axis_config={"color": INK, "stroke_width": 2, "include_tip": False},
                  x_axis_config={"numbers_to_include": [0, 2, 4, 6, 8, 10], "font_size": 22},
                  y_axis_config={"numbers_to_include": [0.5, 1], "font_size": 22,
                                 "decimal_number_config": {"num_decimal_places": 1, "color": INK}})
        ax.move_to(P(-2.2, -0.5))
        for nb in list(ax.x_axis.numbers) + list(ax.y_axis.numbers):
            nb.set_color(INK)
        xl = T("heads in a row", 20, color=MUTED).next_to(ax.x_axis, DOWN, buff=0.4)
        yl = T("P(two-headed coin)", 20, color=MUTED).next_to(ax.y_axis, UP, buff=0.15)
        story = VGroup(T("Bag: 9 fair coins,", 24), T("1 two-headed coin.", 24),
                       T("Draw one, toss it.", 24, color=MUTED)).arrange(DOWN, aligned_edge=LEFT, buff=0.1)
        story.move_to(P(4.5, 1.8))
        form = M(r"\frac{1}{1 + 9/2^{n}}", 44, color=HL).move_to(P(4.5, -0.2))
        dots = VGroup(*[Dot(ax.c2p(n, 1 / (1 + 9 / 2 ** n)), color=HL, radius=0.07) for n in range(11)])
        line = VMobject(color=HL, stroke_width=3).set_points_as_corners(
            [ax.c2p(n, 1 / (1 + 9 / 2 ** n)) for n in range(11)])
        dbl = T("each head doubles the odds", 22, color=MUTED).move_to(P(4.5, -1.5))

        with self.voiceover("Chain it further. A bag holds nine fair coins and one two headed coin. Draw one "
                            "and keep tossing. Each head doubles the odds for the two headed coin. Start at one "
                            "in ten, pass one half after four heads, and pass ninety nine percent by ten.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(Create(ax), FadeIn(xl), FadeIn(yl), FadeIn(story), run_time=1.0)
            self.play(Write(form), run_time=0.8)
            self.play(LaggedStart(*[FadeIn(d, scale=1.6) for d in dots], lag_ratio=0.2), Create(line),
                      run_time=max(2.0, vo.duration * 0.4))
            self.play(FadeIn(dbl), run_time=0.6)

    # ------------------------------------------------------------ recap
    def s7(self):
        hd = header("Chapter 3 · Recap")
        items = VGroup(
            VGroup(T("Total probability", 28, weight="BOLD", color=CAUSE),
                   M(r"P(A) = \sum_i P(E_i)\,P(A \mid E_i)", 34)).arrange(RIGHT, buff=0.5),
            VGroup(T("Bayes", 28, weight="BOLD", color=EVID),
                   M(r"P(E_i \mid A) = \frac{P(E_i)\,P(A \mid E_i)}{P(A)}", 34)).arrange(RIGHT, buff=0.5),
            T("Base rates matter: think in natural frequencies.", 26, color=INK),
            T("The host's choice is information: switch.", 26, color=INK),
            T("Today's posterior is tomorrow's prior.", 26, color=LAW),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.42).move_to(P(0, -0.2))

        with self.voiceover("To recap. When a hidden cause drives the outcome, split by the causes and add: "
                            "total probability. To reason backwards from what you saw to what caused it, "
                            "divide one leaf by the total: Bayes' theorem. Always respect the base rate, and "
                            "count with natural frequencies when in doubt. Information hides in how evidence "
                            "was produced, as Monty Hall shows. And every posterior becomes the next prior. "
                            "Now try it yourself in the lessons.") as vo:
            self.play(FadeIn(hd), run_time=0.5)
            for it in items:
                self.play(FadeIn(it, shift=0.2 * RIGHT), run_time=0.7)
                self.wait(max(0.1, vo.duration * 0.1))
