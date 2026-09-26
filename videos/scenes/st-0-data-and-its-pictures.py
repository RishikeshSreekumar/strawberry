import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

# Chapter colour roles (light background).
DATA = PRIMARY  # data dots and bars
CAT = SECONDARY  # categorical / second series
HL = ManimColor("#D19A00")  # totals, medians, highlights (gold)
WARN = PRIMARY
OK = GREEN

# Data sets, identical to src/modules/content/statistics-chapter-0-content.ts
HEIGHTS = [148, 151, 152, 154, 155, 155, 156, 157, 158, 158, 159, 160, 160, 160, 161, 162, 162, 163, 164, 165, 165,
           166, 167, 168, 169, 170, 172, 174, 177, 183]
MARKS = [21, 30, 33, 18, 38, 44, 39, 48, 29, 26, 17, 15, 27, 45, 28, 35, 32, 34, 41, 46, 35, 28, 38, 37, 42, 58, 36,
         23, 24, 33, 51, 55, 12, 19, 43, 36, 25, 47, 53, 31]


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


class Plot:
    """Plain first-quadrant axes: lower-left corner at `ll`, data ranges xr, yr."""

    def __init__(self, xr, yr, xl, yl, ll):
        self.xr, self.yr, self.xl, self.yl, self.ll = xr, yr, xl, yl, np.array(ll, dtype=float)

    def p(self, x, y):
        fx = (x - self.xr[0]) / (self.xr[1] - self.xr[0])
        fy = (y - self.yr[0]) / (self.yr[1] - self.yr[0])
        return self.ll + RIGHT * fx * self.xl + UP * fy * self.yl

    def axes(self):
        return VGroup(
            Line(self.p(self.xr[0], self.yr[0]), self.p(self.xr[1], self.yr[0]), color=INK, stroke_width=2),
            Line(self.p(self.xr[0], self.yr[0]), self.p(self.xr[0], self.yr[1]), color=INK, stroke_width=2),
        )

    def xticks(self, vals, size=26, labels=None, color=INK):
        g = VGroup()
        for i, v in enumerate(vals):
            tick = Line(self.p(v, self.yr[0]), self.p(v, self.yr[0]) + DOWN * 0.1, color=INK, stroke_width=2)
            lab = M(labels[i] if labels else str(v), size, color=color).next_to(tick, DOWN, buff=0.08)
            g.add(VGroup(tick, lab))
        return g

    def yticks(self, vals, size=26, labels=None, color=INK):
        g = VGroup()
        for i, v in enumerate(vals):
            tick = Line(self.p(self.xr[0], v), self.p(self.xr[0], v) + LEFT * 0.1, color=INK, stroke_width=2)
            lab = M(labels[i] if labels else str(v), size, color=color).next_to(tick, LEFT, buff=0.08)
            g.add(VGroup(tick, lab))
        return g

    def bar(self, a, b, h, color=DATA, opacity=0.75):
        w = self.p(b, 0)[0] - self.p(a, 0)[0]
        ht = max(self.p(0, h)[1] - self.p(0, self.yr[0])[1], 0.001)
        r = Rectangle(width=w, height=ht, color=WHITE, stroke_width=2).set_fill(color, opacity=opacity)
        return r.move_to(self.p(a, self.yr[0]), aligned_edge=DL)


class StCh0Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Statistics",
            "Chapter 0 · Data and Its Pictures",
            "Chapter zero. Data and its pictures.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ scene 1: why statistics exists
    def s1(self):
        hd = header("0.1 · Why Statistics Exists")
        x0, x1, L, y = 145, 185, 11.0, -1.9
        left = -L / 2

        def nx(v):
            return left + (v - x0) / (x1 - x0) * L

        line = Line(P(nx(x0), y), P(nx(x1), y), color=INK, stroke_width=2)
        ticks = VGroup()
        for v in range(x0, x1 + 1, 5):
            t = Line(P(nx(v), y), P(nx(v), y - 0.1), color=INK, stroke_width=2)
            ticks.add(VGroup(t, M(str(v), 26).next_to(t, DOWN, buff=0.08)))
        xl = T("height (cm)", 22, color=MUTED).move_to(P(0, y - 1.0))
        chips = VGroup(*[card(T(s, 26, color=c), pad=0.15, color=c)
                         for s, c in (("26 min", INK), ("31 min", INK), ("47 min", WARN))]).arrange(RIGHT, buff=0.3)
        ctitle = T("same bus ride, different days", 22, color=MUTED)
        commute = VGroup(ctitle, chips).arrange(DOWN, buff=0.2).move_to(P(3.6, 2.4))

        with self.voiceover("Measure the height of every student in a class. Thirty students, thirty numbers, "
                            "and hardly any of them agree. Time the same bus ride to school every day for a "
                            "month, and the clock still reads twenty six minutes one day, thirty one the next, "
                            "and forty seven on the day it rained.") as vo:
            self.play(FadeIn(hd), Create(line), FadeIn(ticks), FadeIn(xl), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.3))
            self.play(FadeIn(ctitle), run_time=0.5)
            self.play(LaggedStart(*[FadeIn(c, shift=0.2 * DOWN) for c in chips], lag_ratio=0.5), run_time=2.0)

        counts = {}
        dots = VGroup()
        for h in HEIGHTS:
            k = counts.get(h, 0)
            counts[h] = k + 1
            dots.add(Dot(P(nx(h), y + 0.2 + 0.26 * k), radius=0.11, color=DATA))
        brace = BraceBetweenPoints(P(nx(150), y + 1.2), P(nx(175), y + 1.2), direction=UP, color=HL)
        blab = T("most students: 150 to 175 cm", 24, color=HL).next_to(brace, UP, buff=0.12)
        myth = card(T("\"Variation is just error\"", 26, color=WARN), color=WARN).move_to(P(-3.4, 1.9))
        truth = card(VGroup(T("One value: unpredictable.", 24, color=OK),
                            T("The pattern of many: stable.", 24, color=OK)).arrange(DOWN, buff=0.12),
                     color=OK).move_to(P(3.4, 1.9))

        with self.voiceover("Drop each height onto a number line as a dot. No single dot could be predicted. "
                            "But together they make a shape: a crowded middle, thinning out at both ends. Add "
                            "more students and the shape barely changes. Statistics exists because things "
                            "vary. Its job is to describe that variation honestly, not to throw it away as "
                            "error.") as vo:
            self.play(FadeOut(commute), run_time=0.4)
            self.play(LaggedStart(*[FadeIn(d, shift=0.4 * DOWN) for d in dots], lag_ratio=0.12), run_time=3.0)
            self.play(GrowFromCenter(brace), FadeIn(blab), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.2))
            self.play(FadeIn(myth), run_time=0.6)
            self.play(Create(cross_out(myth)), run_time=0.5)
            self.play(FadeIn(truth, shift=0.2 * UP), run_time=0.7)

        self.clear_scene(0.5)
        hd2 = header("0.1 · Population and sample")
        rng = np.random.default_rng(7)
        pop = VGroup(*[Dot(P(-5.6 + 0.55 * (i % 10) + rng.uniform(-0.1, 0.1),
                             1.2 - 0.6 * (i // 10) + rng.uniform(-0.1, 0.1)), radius=0.09, color=MUTED)
                       for i in range(60)])
        box = RoundedRectangle(width=6.2, height=4.2, corner_radius=0.3, color=CAT, stroke_width=3)
        box.move_to(pop.get_center())
        plab = T("Population: everyone you care about", 22, color=CAT).next_to(box, UP, buff=0.15)
        pick = rng.choice(60, 12, replace=False)
        slab = T("Sample: the ones you measure", 22, color=DATA).next_to(box, DOWN, buff=0.15)
        rows = VGroup(
            M(r"\text{population} \;\to\; \text{parameter } (\mu)", 34, color=PURPLE),
            M(r"\text{sample} \;\to\; \text{statistic } (\bar{x})", 34, color=PURPLE),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.45).move_to(P(3.5, 0.6))
        est = T("a statistic estimates a parameter", 24, color=HL).next_to(rows, DOWN, buff=0.6)

        with self.voiceover("Two pairs of words for the whole course. The population is everyone you care "
                            "about. The sample is the part you actually measure. A number that describes the "
                            "population, like the mean height of every student in India, is a parameter. The "
                            "same kind of number worked out from your sample is a statistic, and it is our best "
                            "estimate of the parameter.") as vo:
            self.play(FadeIn(hd2), Create(box), FadeIn(pop), FadeIn(plab), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(*[pop[int(i)].animate.set_color(DATA).scale(1.4) for i in pick], FadeIn(slab), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(FadeIn(rows[0], shift=0.2 * RIGHT), run_time=0.7)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(FadeIn(rows[1], shift=0.2 * RIGHT), run_time=0.7)
            self.play(FadeIn(est), run_time=0.6)

    # ------------------------------------------------------------ scene 2: kinds of data
    def s2(self):
        hd = header("0.2 · Kinds of Data")

        def node(s, c):
            return card(T(s, 28, color=c, weight="BOLD"), pad=0.18, color=c)

        data = node("Data", INK).move_to(P(0, 2.6))
        cat = node("Categorical", CAT).move_to(P(-3.6, 1.0))
        num = node("Numerical", DATA).move_to(P(2.6, 1.0))
        dis = node("Discrete", DATA).move_to(P(0.9, -0.7))
        con = node("Continuous", DATA).move_to(P(4.4, -0.7))
        e_cat = T("blood group, favourite sport", 22, color=MUTED).next_to(cat, DOWN, buff=0.2)
        e_dis = T("siblings: 0, 1, 2, 3", 22, color=MUTED).next_to(dis, DOWN, buff=0.2)
        e_con = T("height, time", 22, color=MUTED).next_to(con, DOWN, buff=0.2)
        l1 = VGroup(Line(data.get_bottom(), cat.get_top(), color=MUTED), Line(data.get_bottom(), num.get_top(), color=MUTED))
        l2 = VGroup(Line(num.get_bottom(), dis.get_top(), color=MUTED), Line(num.get_bottom(), con.get_top(), color=MUTED))

        with self.voiceover("Before drawing anything, ask what kind of data you have. Categorical data puts "
                            "each item in a group: blood group, favourite sport. Numerical data is an amount. "
                            "Numerical data splits again. Discrete data is counted and jumps between values, "
                            "like the number of siblings. Continuous data is measured, and can be any value in "
                            "a range, like height or time.") as vo:
            self.play(FadeIn(hd), FadeIn(data), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(Create(l1[0]), FadeIn(cat), run_time=0.7)
            self.play(FadeIn(e_cat), run_time=0.5)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(Create(l1[1]), FadeIn(num), run_time=0.7)
            self.wait(max(0.1, vo.duration * 0.08))
            self.play(Create(l2[0]), FadeIn(dis), run_time=0.7)
            self.play(FadeIn(e_dis), run_time=0.5)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(Create(l2[1]), FadeIn(con), run_time=0.7)
            self.play(FadeIn(e_con), run_time=0.5)

        pin = card(T("PIN 560001", 28, color=INK), pad=0.15, color=INK).move_to(P(0, -2.0))
        myth = card(T("\"digits, so numerical\"", 24, color=WARN), color=WARN).move_to(P(-3.6, -2.3))
        q = T("Test: does an average make sense?", 26, color=HL).move_to(P(2.6, -2.3))
        pics = T("Categories: pie or bar chart.   Measurements: histogram.", 22, color=MUTED).move_to(P(0, -3.4))

        with self.voiceover("Careful. A pin code, five six zero zero zero one, is written in digits, but it is "
                            "a label. The average of two pin codes means nothing. Digits do not make data "
                            "numerical. The test is whether arithmetic makes sense. And the type decides the "
                            "picture: pie or bar charts for categories, histograms for measurements.") as vo:
            self.play(FadeIn(pin, shift=0.2 * UP), run_time=0.7)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(pin.animate.move_to(P(-3.6, -1.2)), run_time=0.8)
            self.play(FadeIn(myth), run_time=0.5)
            self.play(Create(cross_out(myth)), run_time=0.5)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(FadeIn(q), run_time=0.6)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(FadeIn(pics), run_time=0.6)

    # ------------------------------------------------------------ scene 3: frequency tables
    def s3(self):
        hd = header("0.3 · Frequency Tables and Class Intervals")
        raw = VGroup(*[M(str(m), 30, color=MUTED) for m in MARKS]).arrange_in_grid(rows=5, cols=8, buff=(0.35, 0.3))
        raw.move_to(P(0, 0))
        classes = ["10\\text{--}19", "20\\text{--}29", "30\\text{--}39", "40\\text{--}49", "50\\text{--}59"]
        freqs = [5, 9, 14, 8, 4]
        xc, xf, xb = 0.9, 2.9, 3.7
        head = VGroup(T("Class", 24, color=MUTED, weight="BOLD").move_to(P(xc, 2.5)),
                      M("f", 34, color=MUTED).move_to(P(xf, 2.5)))
        rule = Line(P(xc - 1.2, 2.2), P(6.5, 2.2), color=GRID, stroke_width=2)
        rows = VGroup()
        for i, (c, f) in enumerate(zip(classes, freqs)):
            yy = 1.7 - 0.62 * i
            bar = Rectangle(width=0.18 * f, height=0.34, stroke_width=0).set_fill(DATA, opacity=0.75)
            bar.move_to(P(xb, yy), aligned_edge=LEFT)
            rows.add(VGroup(M(c, 32).move_to(P(xc, yy)), M(str(f), 32, color=DATA).move_to(P(xf, yy)), bar))
        rule2 = Line(P(xc - 1.2, -1.2), P(6.5, -1.2), color=GRID, stroke_width=2)
        tot = VGroup(T("Total", 24, weight="BOLD").move_to(P(xc, -1.55)), M("40", 34, color=HL).move_to(P(xf, -1.55)))
        chk = M(r"5 + 9 + 14 + 8 + 4 = 40 \;\checkmark", 34, color=OK).move_to(P(2.4, -2.5))

        with self.voiceover("Here are forty test marks. As a raw list they show nothing. Group them into "
                            "classes ten marks wide, and count. Five in the tens, nine in the twenties, fourteen "
                            "in the thirties, eight in the forties, four in the fifties. Check: five plus nine "
                            "plus fourteen plus eight plus four is forty. Now the shape is visible.") as vo:
            self.play(FadeIn(hd), FadeIn(raw, lag_ratio=0.02), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(raw.animate.scale(0.78).move_to(P(-4.3, 0)), run_time=0.9)
            self.play(FadeIn(head), Create(rule), run_time=0.5)
            for r in rows:
                self.play(FadeIn(r[0]), FadeIn(r[1]), GrowFromEdge(r[2], LEFT), run_time=0.7)
                self.wait(max(0.1, vo.duration * 0.04))
            self.play(Create(rule2), FadeIn(tot), run_time=0.5)
            self.play(Write(chk), run_time=0.9)

        self.clear_scene(0.5)
        hd2 = header("0.3 · Class boundaries")
        x0, x1, L, y = 8, 31, 12.0, 0.6
        left = -L / 2

        def nx(v):
            return left + (v - x0) / (x1 - x0) * L

        line = Line(P(nx(x0), y), P(nx(x1), y), color=INK, stroke_width=2)
        ints = VGroup()
        for v in (10, 19, 20, 29):
            t = Line(P(nx(v), y), P(nx(v), y - 0.1), color=INK, stroke_width=2)
            ints.add(VGroup(t, M(str(v), 28).next_to(t, DOWN, buff=0.08)))

        def seg(a, b, c, yy):
            return VGroup(Line(P(nx(a), yy), P(nx(b), yy), color=c, stroke_width=6),
                          Line(P(nx(a), yy - 0.15), P(nx(a), yy + 0.15), color=c, stroke_width=4),
                          Line(P(nx(b), yy - 0.15), P(nx(b), yy + 0.15), color=c, stroke_width=4))

        sy = y + 0.7
        inc = VGroup(seg(10, 19, CAT, sy), seg(20, 29, CAT, sy))
        inc_l = VGroup(M(r"10\text{--}19", 32, color=CAT).move_to(P(nx(14.5), sy + 0.55)),
                       M(r"20\text{--}29", 32, color=CAT).move_to(P(nx(24.5), sy + 0.55)))
        gap = T("gap", 24, color=WARN, weight="BOLD").move_to(P(nx(19.5), sy + 1.25))
        gap_ar = Arrow(gap.get_bottom(), P(nx(19.5), sy + 0.1), buff=0.05, color=WARN, stroke_width=3,
                       max_tip_length_to_length_ratio=0.25)
        bnd = VGroup(seg(9.5, 19.5, DATA, sy), seg(19.5, 29.5, DATA, sy))
        bnd_l = VGroup(*[M(s, 28, color=DATA).move_to(P(nx(v), y - 1.0)) for s, v in
                         (("9.5", 9.5), ("19.5", 19.5), ("29.5", 29.5))])
        facts = card(VGroup(
            M(r"\text{boundaries of } 20\text{--}29:\; 19.5 \text{ and } 29.5", 32),
            M(r"\text{width} = 29.5 - 19.5 = 10", 32),
            M(r"\text{class mark} = \tfrac{20 + 29}{2} = 24.5", 32),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.18), color=PURPLE).move_to(P(0, -2.45))

        with self.voiceover("But look at the classes ten to nineteen and twenty to twenty nine. They do not "
                            "touch. There is a gap between nineteen and twenty. For a continuous picture, move "
                            "each limit half a unit outward. The class twenty to twenty nine really runs from "
                            "nineteen point five to twenty nine point five. Those are its class boundaries. The "
                            "class width is ten, and the class mark, the midpoint, is twenty four point "
                            "five.") as vo:
            self.play(FadeIn(hd2), Create(line), FadeIn(ints), run_time=0.8)
            self.play(Create(inc), FadeIn(inc_l), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.08))
            self.play(FadeIn(gap), GrowArrow(gap_ar), run_time=0.6)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(ReplacementTransform(inc, bnd), FadeOut(gap), FadeOut(gap_ar), FadeIn(bnd_l), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(FadeIn(facts, shift=0.2 * UP), run_time=0.8)

    # ------------------------------------------------------------ scene 4: histograms
    def s4(self):
        hd = header("0.4 · Histograms: Area Is Frequency")
        pl = Plot((10, 60), (0, 15), 8.0, 4.2, P(-4.0, -2.4))
        ax = pl.axes()
        xt = pl.xticks([10, 20, 30, 40, 50, 60])
        yt = pl.yticks([5, 10, 15])
        xl = T("marks", 22, color=MUTED).next_to(xt, DOWN, buff=0.15)
        yl = T("frequency", 22, color=MUTED).next_to(pl.p(10, 15), UP, buff=0.2)
        fr = [5, 9, 14, 8, 4]
        bs = VGroup(*[pl.bar(10 + 10 * i, 20 + 10 * i, f) for i, f in enumerate(fr)])
        fl = VGroup(*[M(str(f), 30, color=DATA).next_to(b, UP, buff=0.1) for f, b in zip(fr, bs)])
        note = T("classes touch, so bars touch", 24, color=MUTED).move_to(P(3.6, 2.6))

        with self.voiceover("A histogram stands a bar over each class on a real number line, with no gaps, "
                            "because the classes touch. When every class is equally wide, the height can simply "
                            "be the frequency.") as vo:
            self.play(FadeIn(hd), Create(ax), FadeIn(xt), FadeIn(yt), FadeIn(xl), FadeIn(yl), run_time=1.0)
            self.play(LaggedStart(*[GrowFromEdge(b, DOWN) for b in bs], lag_ratio=0.25), run_time=2.0)
            self.play(FadeIn(fl), FadeIn(note), run_time=0.7)

        self.clear_scene(0.5)
        edges = [(0, 10), (10, 20), (20, 40), (40, 70), (70, 80)]
        f2 = [12, 8, 16, 18, 6]
        dens = [1.2, 0.8, 0.8, 0.6, 0.6]
        hd2 = header("0.4 · Unequal class widths")
        q = Plot((0, 80), (0, 20), 10.0, 4.2, P(-5.2, -2.6))
        ax2 = q.axes()
        xt2 = q.xticks([0, 10, 20, 40, 70, 80])
        yt2 = q.yticks([5, 10, 15, 20])
        xl2 = T("age (years)", 22, color=MUTED).next_to(xt2, DOWN, buff=0.15)
        yl2 = T("frequency", 22, color=MUTED).next_to(q.p(0, 20), UP, buff=0.2)
        b2 = VGroup(*[q.bar(a, b, f) for (a, b), f in zip(edges, f2)])
        l2 = VGroup(*[M(str(f), 30, color=DATA).next_to(b, UP, buff=0.1) for f, b in zip(f2, b2)])
        warn = T("tall only because it is 30 years wide", 24, color=WARN).move_to(P(2.6, 2.75))

        with self.voiceover("Now unequal widths. A clinic groups sixty patients by age: zero to ten, ten to "
                            "twenty, twenty to forty, forty to seventy, and seventy to eighty. The forty to "
                            "seventy class has eighteen patients, the most of any class. Draw height as "
                            "frequency, and that bar towers over the rest, just because it is thirty years "
                            "wide.") as vo:
            self.play(FadeIn(hd2), Create(ax2), FadeIn(xt2), FadeIn(yt2), FadeIn(xl2), FadeIn(yl2), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(LaggedStart(*[GrowFromEdge(b, DOWN) for b in b2], lag_ratio=0.3), FadeIn(l2), run_time=2.2)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(Indicate(b2[3], color=WARN, scale_factor=1.05), FadeIn(warn), run_time=1.0)

        d = Plot((0, 80), (0, 1.5), 10.0, 4.2, P(-5.2, -2.6))
        b3 = VGroup(*[d.bar(a, b, h) for (a, b), h in zip(edges, dens)])
        in3 = VGroup(*[M(str(f), 30, color=WHITE).move_to(b) for f, b in zip(f2, b3)])
        l3 = VGroup(*[M(f"{h:g}", 28, color=PURPLE).next_to(b, UP, buff=0.1) for h, b in zip(dens, b3)])
        yt3 = d.yticks([0.5, 1.0, 1.5], labels=["0.5", "1.0", "1.5"])
        yl3 = T("frequency density (patients per year)", 22, color=MUTED).next_to(d.p(0, 1.5), UP, buff=0.2)
        yl3.align_to(yl2, LEFT)
        form = card(VGroup(M(r"\text{density} = \frac{f}{w}", 36),
                           M(r"\text{area} = \frac{f}{w} \times w = f", 36)).arrange(RIGHT, buff=0.8),
                    color=PURPLE).move_to(P(2.3, 2.75))

        with self.voiceover("Your eye judges area, so make area the frequency. Set the height to frequency "
                            "density: frequency divided by class width. Then height times width gives back the "
                            "frequency. Now the forty to seventy bar is one of the lowest, at point six patients "
                            "per year, and the children, at one point two per year, are the most crowded group. "
                            "In a histogram, area is frequency.") as vo:
            self.play(FadeOut(warn), run_time=0.4)
            self.play(FadeIn(form, shift=0.2 * DOWN), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(ReplacementTransform(b2, b3), FadeOut(l2), ReplacementTransform(yt2, yt3),
                      ReplacementTransform(yl2, yl3), run_time=1.6)
            self.play(FadeIn(in3), FadeIn(l3), run_time=0.7)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(Indicate(b3[3], color=CAT, scale_factor=1.05), run_time=0.9)
            self.wait(max(0.1, vo.duration * 0.05))
            self.play(b3[0].animate.set_fill(HL, opacity=0.9), Indicate(l3[0], color=HL), run_time=0.9)

    # ------------------------------------------------------------ scene 5: ogives
    def s5(self):
        hd = header("0.5 · Cumulative Frequency and Ogives")
        bnds = [40, 45, 50, 55, 60, 65, 70]
        lcf = [0, 4, 13, 28, 40, 47, 50]
        mcf = [50, 46, 37, 22, 10, 3, 0]
        x_head = -3.4
        tab = VGroup(
            T("less than (kg)", 22, color=MUTED).move_to(P(-5.0, 2.55)),
            T("cf", 22, color=MUTED, weight="BOLD").move_to(P(-5.0, 1.95)),
        )
        cols_b = VGroup(*[M(str(b), 30).move_to(P(x_head + 1.3 * i, 2.55)) for i, b in enumerate(bnds)])
        cols_c = VGroup(*[M(str(c), 30, color=DATA).move_to(P(x_head + 1.3 * i, 1.95)) for i, c in enumerate(lcf)])
        rule = Line(P(-6.2, 2.25), P(x_head + 1.3 * 6 + 0.5, 2.25), color=GRID, stroke_width=2)

        pl = Plot((40, 70), (0, 50), 7.5, 3.9, P(-4.6, -3.0))
        ax = pl.axes()
        xt = pl.xticks(bnds, size=24)
        yt = pl.yticks([25, 50], size=24)
        xl = T("weight (kg)", 20, color=MUTED).next_to(pl.p(70, 0), RIGHT, buff=0.2)

        with self.voiceover("Often the question is, how many are below a value? Keep a running total. Fifty "
                            "students' weights: four weigh less than forty five kilograms, thirteen less than "
                            "fifty, twenty eight less than fifty five, then forty, forty seven, and all fifty "
                            "below seventy.") as vo:
            self.play(FadeIn(hd), FadeIn(tab), Create(rule), FadeIn(cols_b), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(LaggedStart(*[FadeIn(c, shift=0.2 * DOWN) for c in cols_c], lag_ratio=0.4), run_time=3.0)
            self.play(Create(ax), FadeIn(xt), FadeIn(yt), FadeIn(xl), run_time=0.8)

        pts = [pl.p(b, c) for b, c in zip(bnds, lcf)]
        dots = VGroup(*[Dot(p, radius=0.08, color=HL) for p in pts])
        less = VMobject(color=DATA, stroke_width=4).set_points_as_corners(pts)
        myth = card(VGroup(T("plot 13 at the", 22, color=WARN),
                           T("class mark 47.5?", 22, color=WARN)).arrange(DOWN, buff=0.08), color=WARN)
        myth.move_to(P(5.1, -0.4))
        right = card(VGroup(T("13 below 50 is", 22, color=OK),
                            T("a fact about 50", 22, color=OK)).arrange(DOWN, buff=0.08), color=OK)
        right.move_to(P(5.1, -2.0))
        llab = T("less than", 22, color=DATA).next_to(pts[-1], UP, buff=0.15)

        with self.voiceover("Plot each total at the upper boundary of its class. Thirteen below fifty is a fact "
                            "about fifty, not about the class mark forty seven point five, because the class is "
                            "only fully counted at its end. Join the points and you have the less than "
                            "ogive.") as vo:
            self.play(LaggedStart(*[FadeIn(d, scale=0.5) for d in dots], lag_ratio=0.2), run_time=1.5)
            self.play(Indicate(dots[2], color=HL, scale_factor=2), Indicate(cols_c[2], color=HL), run_time=0.9)
            self.play(FadeIn(myth), run_time=0.5)
            xo = cross_out(myth)
            self.play(Create(xo), FadeIn(right), run_time=0.7)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(Create(less), FadeIn(llab), run_time=1.5)

        med_h = DashedLine(pl.p(40, 25), pl.p(54, 25), color=HL, stroke_width=3)
        med_v = DashedLine(pl.p(54, 25), pl.p(54, 0), color=HL, stroke_width=3)
        half = M(r"\tfrac{n}{2} = 25", 32, color=HL).next_to(pl.p(44.5, 25), UP, buff=0.12)
        mpts = [pl.p(b, c) for b, c in zip(bnds, mcf)]
        more = VMobject(color=CAT, stroke_width=4).set_points_as_corners(mpts)
        mdots = VGroup(*[Dot(p, radius=0.07, color=CAT) for p in mpts])
        mlab = T("more than", 22, color=CAT).next_to(mpts[0], UR, buff=0.12)
        cross = Circle(radius=0.18, color=HL, stroke_width=4).move_to(pl.p(54, 25))
        mres = card(M(r"\text{median} \approx 54 \text{ kg}", 34, color=HL), color=HL).move_to(P(5.1, -1.2))

        with self.voiceover("Now read it backwards. Go across from half of fifty, which is twenty five, to the "
                            "curve, then down: the median weight is about fifty four kilograms. The more than "
                            "ogive falls from fifty to zero, and the two curves cross exactly at the "
                            "median.") as vo:
            self.play(FadeOut(myth), FadeOut(right), FadeOut(xo), run_time=0.4)
            self.play(FadeIn(half), Create(med_h), run_time=0.9)
            self.play(Create(med_v), run_time=0.6)
            self.play(FadeIn(mres), run_time=0.6)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(Create(more), FadeIn(mdots), FadeIn(mlab), run_time=1.6)
            self.play(Create(cross), run_time=0.5)
            self.play(Indicate(cross, color=HL, scale_factor=1.6), run_time=0.8)

    # ------------------------------------------------------------ scene 6: misleading pictures
    def s6(self):
        hd = header("0.6 · Honest and Misleading Pictures")
        a = Plot((0, 3), (100, 110), 3.0, 3.6, P(-5.0, -2.0))
        b = Plot((0, 3), (0, 120), 3.0, 3.6, P(2.2, -2.0))

        def panel(pl, ticks, title, cap, cap_col):
            ax = pl.axes()
            yt = pl.yticks(ticks, size=24)
            bars = VGroup(pl.bar(0.5, 1.3, 102, color=CAT), pl.bar(1.7, 2.5, 108, color=DATA))
            vals = VGroup(M("102", 26, color=CAT).next_to(bars[0], UP, buff=0.08),
                          M("108", 26, color=DATA).next_to(bars[1], UP, buff=0.08))
            t = T(title, 24, color=MUTED, weight="BOLD").next_to(pl.p(1.5, pl.yr[1]), UP, buff=0.55)
            c = T(cap, 24, color=cap_col).next_to(pl.p(1.5, pl.yr[0]), DOWN, buff=0.35)
            return ax, yt, bars, vals, t, c

        pa = panel(a, [100, 105, 110], "axis starts at 100", "looks four times as big", WARN)
        pb = panel(b, [0, 50, 100], "axis starts at 0", "108 / 102 ≈ 1.06", OK)
        rule = T("Read the axes before the shape.", 30, color=HL, weight="BOLD").move_to(P(0, -3.4))

        with self.voiceover("Most misleading graphs are made of correct numbers. Two bars, one hundred and two, "
                            "and one hundred and eight. Start the axis at one hundred, and one bar looks four "
                            "times the other. Start it at zero, and the truth appears: a difference of about six "
                            "percent. Read the axes before you read the shape.") as vo:
            self.play(FadeIn(hd), *[FadeIn(m) for m in (pa[0], pa[1], pa[4])], run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(*[GrowFromEdge(r, DOWN) for r in pa[2]], FadeIn(pa[3]), run_time=1.0)
            self.play(FadeIn(pa[5]), run_time=0.6)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(*[FadeIn(m) for m in (pb[0], pb[1], pb[4])], run_time=0.7)
            self.play(*[GrowFromEdge(r, DOWN) for r in pb[2]], FadeIn(pb[3]), run_time=1.0)
            self.play(FadeIn(pb[5]), run_time=0.6)
            self.wait(max(0.1, vo.duration * 0.08))
            self.play(FadeIn(rule, shift=0.2 * UP), run_time=0.7)

        self.clear_scene(0.5)
        hd2 = header("0.6 · Class width can hide a pattern")
        pl = Plot((0, 60), (0, 2), 10.0, 4.2, P(-5.0, -2.4))
        ax = pl.axes()
        xt = pl.xticks([0, 10, 20, 30, 40, 50, 60])
        yt = pl.yticks([0.5, 1, 1.5, 2], labels=["0.5", "1.0", "1.5", "2.0"])
        xl = T("waiting time (minutes)", 22, color=MUTED).next_to(xt, DOWN, buff=0.15)
        yl = T("frequency density", 22, color=MUTED).next_to(pl.p(0, 2), UP, buff=0.2)
        wide = VGroup(*[pl.bar(a0, a0 + 20, h) for a0, h in ((0, 0.35), (20, 0.85), (40, 0.45))])
        wlab = T("width 20: one lump", 26, color=DATA).move_to(P(3.2, 2.5))
        narrow_h = [0.2, 1.2, 1.8, 0.2, 0.2, 1.2, 1.6, 0.2]
        narrow = VGroup(*[pl.bar(10 + 5 * i, 15 + 5 * i, h) for i, h in enumerate(narrow_h)])
        nlab = T("width 5: two peaks", 26, color=DATA).move_to(P(3.2, 2.5))
        quick = T("quick doctor", 22, color=HL, weight="BOLD").next_to(pl.p(22.5, 1.8), UP, buff=0.15)
        slow = T("slow doctor", 22, color=HL, weight="BOLD").next_to(pl.p(42.5, 1.6), UP, buff=0.15)

        with self.voiceover("Class width can mislead too. Thirty three clinic waiting times, in classes twenty "
                            "minutes wide, make a single lump. Narrow the classes to five minutes, and two peaks "
                            "appear: patients of a quick doctor wait about twenty minutes, patients of a slow "
                            "one about forty.") as vo:
            self.play(FadeIn(hd2), Create(ax), FadeIn(xt), FadeIn(yt), FadeIn(xl), FadeIn(yl), run_time=0.9)
            self.play(LaggedStart(*[GrowFromEdge(r, DOWN) for r in wide], lag_ratio=0.3), FadeIn(wlab),
                      run_time=1.4)
            self.wait(max(0.1, vo.duration * 0.2))
            self.play(ReplacementTransform(wide, narrow), ReplacementTransform(wlab, nlab), run_time=1.8)
            self.wait(max(0.1, vo.duration * 0.05))
            self.play(FadeIn(quick, shift=0.2 * DOWN), run_time=0.6)
            self.play(FadeIn(slow, shift=0.2 * DOWN), run_time=0.6)

    # ------------------------------------------------------------ scene 7: recap
    def s7(self):
        title = T("Chapter 0 in six lines", 40, weight="BOLD", color=PRIMARY).move_to(P(0, 3.1))
        lines = [
            ("Statistics exists because things vary. The pattern of many values is stable.", DATA),
            ("Decide the type of data first. Digits do not make data numerical.", CAT),
            ("Group data into classes. Inclusive 20–29 has boundaries 19.5 and 29.5.", PURPLE),
            ("In a histogram, area is frequency. Unequal widths need density f / w.", HL),
            ("Plot running totals at upper boundaries. Read the median at n / 2.", OK),
            ("Read the axes before the shape.", INK),
        ]
        rows = VGroup()
        for i, (s, c) in enumerate(lines, start=1):
            num = Circle(radius=0.24, color=c, stroke_width=2).set_fill(c, opacity=1)
            num = VGroup(num, T(str(i), 22, color=WHITE, weight="BOLD").move_to(num))
            rows.add(VGroup(num, T(s, 24)).arrange(RIGHT, buff=0.3))
        rows.arrange(DOWN, aligned_edge=LEFT, buff=0.36).move_to(P(0, -0.1))
        if rows.width > config.frame_width - 0.8:
            rows.scale_to_fit_width(config.frame_width - 0.8)
        foot = T("Next: 0.7 · Chapter 0 Mastery", 26, color=MUTED).move_to(P(0, -3.4))
        with self.voiceover("Chapter zero in six lines. Statistics exists because things vary, and the pattern "
                            "of many values is stable. Decide the type of data first, and remember that digits "
                            "do not make data numerical. Group raw data into classes, and turn inclusive classes "
                            "into boundaries. In a histogram, area is frequency, so unequal widths need "
                            "frequency density. Plot running totals at upper boundaries, and read the median at "
                            "n over two. And always read the axes before the shape. Now test yourself in the "
                            "mastery lesson.") as vo:
            self.play(FadeIn(title), run_time=0.6)
            per = max(0.3, (vo.duration - 2.0) / 7)
            for r in rows:
                self.play(FadeIn(r, shift=0.2 * RIGHT), run_time=0.6)
                self.wait(max(0.1, per - 0.6))
            self.play(FadeIn(foot), run_time=0.6)
