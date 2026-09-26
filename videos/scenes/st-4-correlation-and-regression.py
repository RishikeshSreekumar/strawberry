import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

# Chapter colour roles (light background).
DOTC = SECONDARY  # data dots = teal
HL = ManimColor("#D19A00")  # point of means and mean cross-hairs (gold)
POS = GREEN  # positive co-deviation rectangles
NEG = ACCENT  # negative co-deviation rectangles (amber)
YX = PRIMARY  # y-on-x line
XY = PURPLE  # x-on-y line
SP = PURPLE  # definitions
WARN = PRIMARY
OK = GREEN

STUDY = [(1, 35), (2, 42), (2, 50), (3, 48), (4, 58), (5, 55), (5, 66), (6, 70), (7, 68), (8, 80)]
FIVE = [(1, 2), (2, 4), (3, 3), (4, 6), (5, 5)]
BLOB = [(2, 3), (3, 4), (4, 3), (2.5, 2), (3.5, 2.5), (3, 3), (2, 4), (4, 4), (3, 2)]


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


def make_axes(xr, yr, xl, yl, nums=True, size=22):
    ax = Axes(x_range=xr, y_range=yr, x_length=xl, y_length=yl, tips=False,
              axis_config={"color": INK, "stroke_width": 2, "tick_size": 0.06})
    if nums:
        labs = VGroup()
        for v in np.arange(xr[0] + xr[2], xr[1] + 0.001, xr[2]):
            labs.add(M(f"{v:g}", size, color=MUTED).next_to(ax.c2p(v, yr[0]), DOWN, buff=0.15))
        for v in np.arange(yr[0] + yr[2], yr[1] + 0.001, yr[2]):
            labs.add(M(f"{v:g}", size, color=MUTED).next_to(ax.c2p(xr[0], v), LEFT, buff=0.15))
        ax.add(labs)
    return ax


def dots_on(ax, pts, color=DOTC, r=0.09):
    return VGroup(*[Dot(ax.c2p(x, y), radius=r, color=color) for x, y in pts])


def mini_panel(pts, w=2.6, h=2.0, color=DOTC):
    xs = np.array([p[0] for p in pts], dtype=float)
    ys = np.array([p[1] for p in pts], dtype=float)
    frame = VGroup(Line(P(0, 0), P(w, 0), color=INK, stroke_width=2),
                   Line(P(0, 0), P(0, h), color=INK, stroke_width=2))
    nx = (xs - xs.min()) / (xs.max() - xs.min())
    ny = (ys - ys.min()) / (ys.max() - ys.min())
    ds = VGroup(*[Dot(P(0.2 + a * (w - 0.4), 0.2 + b * (h - 0.4)), radius=0.06, color=color)
                  for a, b in zip(nx, ny)])
    return VGroup(frame, ds)


def rect_to(ax, x, y, cx, cy, color, opacity=0.3):
    return Polygon(ax.c2p(cx, cy), ax.c2p(x, cy), ax.c2p(x, y), ax.c2p(cx, y),
                   color=color, stroke_width=2).set_fill(color, opacity=opacity)


def pearson(pts):
    xs = np.array([p[0] for p in pts], dtype=float)
    ys = np.array([p[1] for p in pts], dtype=float)
    return float(np.corrcoef(xs, ys)[0, 1])


class StCh4Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Statistics",
            "Chapter 4 · Correlation and Regression",
            "Chapter four. Two variables: correlation and regression.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7, self.s8):
            part()
            self.clear_scene()

    def five_axes(self):
        ax = make_axes([0, 6, 1], [0, 8, 1], 4.2, 5.6).move_to(P(-3.4, -0.45))
        return ax

    # ------------------------------------------------------------ scene 1: scatter plots (4.1)
    def s1(self):
        hd = header("4.1 · Scatter plots and association")
        ax = make_axes([0, 10, 2], [20, 100, 20], 6.4, 4.8).move_to(P(-2.6, -0.5))
        xl = T("Hours studied", 22, color=MUTED).next_to(ax, DOWN, buff=0.55)
        yl = T("Marks", 22, color=MUTED).next_to(ax.c2p(0, 100), UP, buff=0.2)
        dots = dots_on(ax, STUDY, r=0.1)
        with self.voiceover("So far every data set was a list of single numbers. But the interesting questions "
                            "involve two. Do students who study longer score higher? Keep both numbers for each "
                            "student together, as a pair, and plot one dot per student. That is a scatter plot. "
                            "Hours studied goes across, as the explanatory variable. Marks go up, as the "
                            "response.") as vo:
            self.play(FadeIn(hd), Create(ax), FadeIn(xl), FadeIn(yl), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.25))
            self.play(LaggedStart(*[FadeIn(d, scale=0.3) for d in dots], lag_ratio=0.2), run_time=2.5)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(Indicate(xl, color=DOTC), run_time=0.8)
            self.play(Indicate(yl, color=DOTC), run_time=0.8)

        feats = [("Direction", "rising"), ("Form", "roughly linear"), ("Strength", "strong"), ("Outliers", "none")]
        cards = VGroup()
        for name, ans in feats:
            g = VGroup(T(name, 24, weight="BOLD", color=SP), T(ans, 22, color=INK)).arrange(DOWN, buff=0.12)
            cards.add(card(g, pad=0.18, color=SP))
        for c in cards:
            c[0].stretch_to_fit_width(3.2)
        cards.arrange(DOWN, buff=0.22).move_to(P(4.6, -0.3))
        with self.voiceover("Describe any scatter plot with four words. Direction: does the cloud rise or fall? "
                            "Form: a line, or a curve? Strength: how tightly the points hug that form. And "
                            "outliers. This cloud rises, it is roughly straight, and it is strong.") as vo:
            for c in cards:
                self.play(FadeIn(c, shift=0.2 * LEFT), run_time=0.6)
                self.wait(max(0.1, vo.duration * 0.12))

        pos = [(1, 1.2), (2, 1.8), (3, 3.3), (4, 3.6), (5, 5.1), (6, 5.5), (7, 7.2)]
        neg = [(x, 8 - y) for x, y in pos]
        none = [(1, 3), (2, 6), (3, 2), (4, 5), (5, 3.5), (6, 6.5), (7, 2.5), (2.5, 4.2), (5.5, 1.5)]
        curve = [(x, x * x) for x in range(-3, 4)]
        panels = VGroup()
        for pts, lab in ((pos, "positive"), (neg, "negative"), (none, "no pattern"), (curve, "curved")):
            p = mini_panel(pts, color=DOTC if lab != "curved" else WARN)
            panels.add(VGroup(p, T(lab, 22, color=MUTED).next_to(p, DOWN, buff=0.2)))
        panels.arrange(RIGHT, buff=0.6).move_to(P(0, 0.6))
        note = card(T("No straight line does not mean no relationship.", 26, color=WARN), color=WARN)
        note.move_to(P(0, -2.4))
        with self.voiceover("Clouds come in every shape. Rising, falling, no pattern at all, and curved. Careful "
                            "with the last one. It has no straight-line trend, but it is a perfect relationship. "
                            "No line does not mean no relationship.") as vo:
            self.play(FadeOut(VGroup(ax, xl, yl, dots, cards)), run_time=0.5)
            self.play(LaggedStart(*[FadeIn(p, shift=0.2 * UP) for p in panels], lag_ratio=0.3), run_time=2.2)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(Indicate(panels[3], color=WARN), run_time=1.0)
            self.play(FadeIn(note, shift=0.2 * UP), run_time=0.7)

    # ------------------------------------------------------------ scene 2: covariance (4.2)
    def s2(self):
        hd = header("4.2 · Covariance: moving together")
        ax = self.five_axes()
        dots = dots_on(ax, FIVE)
        vl = DashedLine(ax.c2p(3, 0), ax.c2p(3, 8), color=HL, stroke_width=3)
        hl = DashedLine(ax.c2p(0, 4), ax.c2p(6, 4), color=HL, stroke_width=3)
        mean = Dot(ax.c2p(3, 4), radius=0.1, color=HL)
        mlab = M(r"(\bar x, \bar y) = (3, 4)", 28, color=HL).next_to(ax.c2p(3, 8), UP, buff=0.12)
        quads = VGroup(
            M("+", 40, color=POS).move_to(ax.c2p(5.4, 7.3)),
            M("-", 40, color=NEG).move_to(ax.c2p(0.6, 7.3)),
            M("+", 40, color=POS).move_to(ax.c2p(0.6, 0.7)),
            M("-", 40, color=NEG).move_to(ax.c2p(5.4, 0.7)),
        )
        with self.voiceover("We want one number that is positive when the cloud rises and negative when it "
                            "falls. The trick: move the origin to the point of means. Five points, with x bar "
                            "three and y bar four. The mean lines cut the plane into four quadrants.") as vo:
            self.play(FadeIn(hd), Create(ax), run_time=0.9)
            self.play(LaggedStart(*[FadeIn(d, scale=0.3) for d in dots], lag_ratio=0.15), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.2))
            self.play(Create(vl), Create(hl), FadeIn(mean), Write(mlab), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(FadeIn(quads), run_time=0.7)

        rects = VGroup(*[rect_to(ax, x, y, 3, 4, POS) for x, y in FIVE if x != 3 and y != 4])
        rlabs = VGroup(
            M("4", 28, color=POS).move_to(ax.c2p(2, 3)),
            M("2", 28, color=POS).move_to(ax.c2p(3.5, 5.5)),
            M("2", 28, color=POS).move_to(ax.c2p(4.55, 4.5)),
        )
        f1 = M(r"\operatorname{Cov}(x,y) = \frac{1}{n}\sum (x_i-\bar x)(y_i-\bar y)", 34, color=SP)
        f1.move_to(P(3.4, 2.0))
        f2 = M(r"= \frac{4 + 0 + 0 + 2 + 2}{5} = \frac{8}{5} = 1.6", 36).move_to(P(3.4, 0.6))
        with self.voiceover("Join each point to the point of means with a rectangle. Its area is x minus x bar, "
                            "times y minus y bar. Top right and bottom left, both deviations share a sign, so "
                            "the area counts as positive. The other two quadrants count as negative. Here the "
                            "areas are four, zero, zero, two and two. Their average, eight over five, is the "
                            "covariance: one point six.") as vo:
            self.play(LaggedStart(*[DrawBorderThenFill(r) for r in rects], lag_ratio=0.3), run_time=1.8)
            self.play(Write(f1), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.25))
            self.play(FadeIn(rlabs), run_time=0.7)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(Write(f2), run_time=1.1)

        newr = rect_to(ax, 5, 1, 3, 4, NEG)
        newl = M("-6", 28, color=NEG).move_to(ax.c2p(4, 2.5))
        f3 = M(r"= \frac{4 + 0 + 0 + 2 - 6}{5} = 0", 36).move_to(P(3.4, -0.7))
        units = card(VGroup(T("metres  →  centimetres", 24, color=WARN),
                            M(r"\operatorname{Cov} \times 100", 34, color=WARN)).arrange(DOWN, buff=0.15),
                     color=WARN).move_to(P(3.4, -2.4))
        with self.voiceover("Drag the top point down to five comma one. Its rectangle flips into a negative "
                            "quadrant, minus six, and the covariance falls to zero. Covariance has the right "
                            "sign. But its size depends on units. Measure y in centimetres instead of metres "
                            "and the covariance grows a hundred times, though the cloud is the same.") as vo:
            self.play(dots[4].animate.move_to(ax.c2p(5, 1)), ReplacementTransform(rects[2], newr),
                      ReplacementTransform(rlabs[2], newl), run_time=1.6)
            self.play(Write(f3), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.25))
            self.play(FadeIn(units, shift=0.2 * UP), run_time=0.8)

    # ------------------------------------------------------------ scene 3: Pearson's r (4.3)
    def s3(self):
        hd = header("4.3 · Karl Pearson's correlation coefficient")
        z = M(r"r = \frac{1}{n}\sum z_x\, z_y", 44).move_to(P(0, 2.2))
        d = M(r"r = \frac{\operatorname{Cov}(x,y)}{\sigma_x\,\sigma_y}", 50, color=SP).move_to(P(0, 0.5))
        ex = M(r"= \frac{1.6}{\sqrt{2}\cdot\sqrt{2}} = \frac{1.6}{2} = 0.8", 44).move_to(P(0, -1.4))
        with self.voiceover("To remove the units, measure each deviation in standard deviations. That is, use z "
                            "scores. The correlation coefficient r is the mean product of z scores, which is the "
                            "covariance divided by sigma x times sigma y. For the five points, one point six over "
                            "root two times root two is zero point eight.") as vo:
            self.play(FadeIn(hd), run_time=0.5)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(Write(z), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(Write(d), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(Write(ex), run_time=1.2)

        nl = NumberLine(x_range=[-1, 1, 0.5], length=10, color=INK, stroke_width=2, include_tip=False)
        nl.move_to(P(0, -1.6))
        nl.add(VGroup(*[M(s, 26, color=MUTED).next_to(nl.n2p(v), DOWN, buff=0.18)
                        for v, s in ((-1, "-1"), (-0.5, "-0.5"), (0, "0"), (0.5, "0.5"), (1, "1"))]))
        down = [(x, 6 - x) for x in range(1, 6)]
        up = [(x, x) for x in range(1, 6)]
        blob = [(1, 3), (2, 5), (3, 1.5), (4, 4.5), (5, 2.5), (1.5, 1), (4.5, 5), (3, 3.5)]
        pd = mini_panel(down, 2.2, 1.7).next_to(nl.n2p(-1), UP, buff=0.9)
        pb = mini_panel(blob, 2.2, 1.7).next_to(nl.n2p(0), UP, buff=0.9)
        pu = mini_panel(up, 2.2, 1.7).next_to(nl.n2p(1), UP, buff=0.9)
        pd.add(Line(pd[1][0].get_center(), pd[1][-1].get_center(), color=YX, stroke_width=2))
        pu.add(Line(pu[1][0].get_center(), pu[1][-1].get_center(), color=YX, stroke_width=2))
        ptr = Triangle(color=HL).set_fill(HL, opacity=1).scale(0.15).rotate(PI).next_to(nl.n2p(0.8), UP, buff=0.05)
        ptl = M("0.8", 30, color=HL).next_to(ptr, UP, buff=0.08)
        with self.voiceover("r is unit free, and always between minus one and one. At plus or minus one, every "
                            "point is exactly on a line. Near zero, there is no straight-line trend.") as vo:
            self.play(FadeOut(VGroup(z, d, ex)), run_time=0.5)
            self.play(Create(nl), FadeIn(ptr), FadeIn(ptl), run_time=0.9)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(FadeIn(pd, shift=0.2 * UP), FadeIn(pu, shift=0.2 * UP), run_time=0.9)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(FadeIn(pb, shift=0.2 * UP), run_time=0.7)

        para = mini_panel([(x, x * x) for x in range(-3, 4)], 3.2, 2.4, color=WARN).move_to(P(-4.2, 0.6))
        pr = M(r"r = 0", 40, color=WARN).next_to(para, DOWN, buff=0.3)
        lin = card(T("r measures only straight-line association.", 24, color=OK), color=OK).move_to(P(2.2, 1.3))
        myth = card(T("\"r = 0.8 means 80% of points lie on the line\"", 22, color=WARN), color=WARN)
        myth.move_to(P(2.2, -1.2))
        with self.voiceover("Two warnings. The parabola is a perfect relationship, yet its r is exactly zero: r "
                            "only measures straight-line association. And r equal to zero point eight does not "
                            "mean eighty percent of the points lie on a line.") as vo:
            self.play(FadeOut(VGroup(nl, ptr, ptl, pd, pu, pb)), run_time=0.5)
            self.play(FadeIn(para), run_time=0.7)
            self.play(Write(pr), run_time=0.6)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(FadeIn(lin, shift=0.2 * LEFT), run_time=0.7)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(FadeIn(myth), run_time=0.6)
            self.play(Create(cross_out(myth)), run_time=0.5)

    # ------------------------------------------------------------ scene 4: causation (4.4)
    def s4(self):
        hd = header("4.4 · Correlation is not causation")
        top = card(T("Hot weather", 30, weight="BOLD", color=ACCENT), color=ACCENT).move_to(P(0, 1.9))
        left = card(T("Ice-cream sales", 28, color=INK), color=MUTED).move_to(P(-3.8, -1.2))
        right = card(T("Drownings", 28, color=INK), color=MUTED).move_to(P(3.8, -1.2))
        a1 = Arrow(top.get_bottom(), left.get_top(), buff=0.15, color=OK, stroke_width=5)
        a2 = Arrow(top.get_bottom(), right.get_top(), buff=0.15, color=OK, stroke_width=5)
        mid = DoubleArrow(left.get_right(), right.get_left(), buff=0.2, color=WARN, stroke_width=4, tip_length=0.25)
        mid = DashedVMobject(mid, num_dashes=18)
        rl = T("strong r", 26, color=WARN).next_to(mid, UP, buff=0.15)
        cz = T("causes?", 26, color=WARN).next_to(mid, DOWN, buff=0.15)
        lurk = T("lurking variable", 24, color=ACCENT).next_to(top, UP, buff=0.2)
        with self.voiceover("Across the months of a year, ice cream sales and drownings are strongly correlated. "
                            "Should the city ban ice cream? Of course not. Hot weather drives both. A lurking "
                            "variable can manufacture a strong r with no cause between the two.") as vo:
            self.play(FadeIn(hd), FadeIn(left), FadeIn(right), run_time=0.8)
            self.play(Create(mid), FadeIn(rl), run_time=0.9)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(FadeIn(cz), run_time=0.5)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(Create(cross_out(cz)), run_time=0.5)
            self.play(FadeIn(top, shift=0.2 * DOWN), run_time=0.7)
            self.play(GrowArrow(a1), GrowArrow(a2), run_time=0.9)
            self.play(FadeIn(lurk), run_time=0.5)

        ax = make_axes([0, 10, 2], [0, 10, 2], 5.0, 5.0).move_to(P(-3.0, -0.6))
        dots = dots_on(ax, BLOB)
        r0 = M(rf"r \approx {pearson(BLOB):.2f}", 44, color=DOTC).move_to(P(3.2, 1.2))
        far = Dot(ax.c2p(9, 9), radius=0.12, color=WARN)
        r1 = M(rf"r \approx {pearson(BLOB + [(9, 9)]):.2f}", 44, color=WARN).move_to(P(3.2, 1.2))
        note = card(T("one influential point", 26, color=WARN), color=WARN).move_to(P(3.2, -0.6))
        look = T("Look at the picture first.", 24, color=MUTED).move_to(P(3.2, -1.9))
        with self.voiceover("One point can also make or break r. This round cloud has r close to zero. Add a "
                            "single far-off point, and r jumps to about zero point eight eight. Always look at "
                            "the picture before trusting the number.") as vo:
            self.play(FadeOut(Group(*[m for m in self.mobjects if m is not hd])), run_time=0.5)
            self.play(Create(ax), FadeIn(dots), run_time=1.0)
            self.play(Write(r0), run_time=0.7)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(FadeIn(far, scale=0.3), run_time=0.6)
            self.play(Flash(far, color=WARN), ReplacementTransform(r0, r1), run_time=0.9)
            self.play(FadeIn(note), run_time=0.6)
            self.wait(max(0.1, vo.duration * 0.08))
            self.play(FadeIn(look), run_time=0.5)

    # ------------------------------------------------------------ scene 5: rank correlation (4.5)
    def s5(self):
        hd = header("4.5 · Rank correlation")
        rows = [
            [r"\text{Singer}", "A", "B", "C", "D", "E", "F"],
            [r"\text{Judge 1}", "1", "2", "3", "4", "5", "6"],
            [r"\text{Judge 2}", "2", "1", "4", "3", "6", "5"],
            [r"d", "-1", "1", "-1", "1", "-1", "1"],
            [r"d^2", "1", "1", "1", "1", "1", "1"],
        ]
        cells = VGroup()
        for i, r in enumerate(rows):
            for j, c in enumerate(r):
                col = MUTED if i == 0 else (SP if i >= 3 else INK)
                cells.add(M(c, 34, color=col))
        cells.arrange_in_grid(rows=5, cols=7, buff=(0.7, 0.28), col_alignments="lccccccc"[:7])
        cells.move_to(P(-0.8, 1.2))
        sumd = M(r"\sum d^2 = 6", 38, color=SP).next_to(cells, RIGHT, buff=0.7).align_to(cells[-1], DOWN)
        with self.voiceover("Two judges rank six singers. There are no scores, only positions. Spearman's idea: "
                            "correlate the ranks themselves. The judges swap neighbours three times, so each "
                            "difference d is plus or minus one, and the sum of d squared is six.") as vo:
            self.play(FadeIn(hd), FadeIn(cells[:21], lag_ratio=0.02), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.35))
            self.play(FadeIn(cells[21:], lag_ratio=0.03), run_time=1.0)
            self.play(Write(sumd), run_time=0.8)

        rho = card(M(r"\rho = 1 - \frac{6\sum d^2}{n(n^2-1)}", 40, color=SP), color=SP).move_to(P(-3.2, -1.9))
        val = M(r"= 1 - \frac{36}{210} \approx 0.83", 40).next_to(rho, RIGHT, buff=0.4)
        same = T("= Pearson's r on the ranks", 24, color=MUTED).next_to(rho, DOWN, buff=0.25)
        cube = card(M(r"y = x^3:\ \rho = 1,\ r \approx 0.94", 34), color=DOTC).move_to(P(3.3, -3.1))
        with self.voiceover("Spearman's rho is one minus six times the sum of d squared, over n times n squared "
                            "minus one. That is one minus thirty six over two hundred and ten, about zero point "
                            "eight three. Strong agreement. This formula is just Pearson's r applied to the "
                            "ranks. And because ranks only care about order, points on y equals x cubed give a "
                            "rho of exactly one, while r is only about zero point nine four.") as vo:
            self.play(FadeIn(rho, shift=0.2 * UP), run_time=0.9)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(Write(val), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(FadeIn(same), run_time=0.6)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(FadeIn(cube, shift=0.2 * UP), run_time=0.8)

    # ------------------------------------------------------------ scene 6: least squares (4.6)
    def s6(self):
        hd = header("4.6 · The least-squares line")
        ax = self.five_axes()
        dots = dots_on(ax, FIVE)
        mean = Dot(ax.c2p(3, 4), radius=0.1, color=HL)
        b = ValueTracker(0.0)

        def yline(x):
            return 4 + b.get_value() * (x - 3)

        line = always_redraw(lambda: Line(ax.c2p(0, yline(0)), ax.c2p(6, yline(6)), color=YX, stroke_width=4))

        def squares():
            g = VGroup()
            for x, y in FIVE:
                yl = yline(x)
                s = abs(y - yl)
                if s < 1e-3:
                    continue
                g.add(Polygon(ax.c2p(x, y), ax.c2p(x + s, y), ax.c2p(x + s, yl), ax.c2p(x, yl),
                              color=SP, stroke_width=1.5).set_fill(SP, opacity=0.22))
            return g

        sq = always_redraw(squares)
        blab = VGroup(M(r"\text{slope } b =", 36), DecimalNumber(0, num_decimal_places=2, font_size=36, color=YX))
        blab.arrange(RIGHT, buff=0.2).move_to(P(3.3, 2.2))
        blab[1].add_updater(lambda m: m.set_value(b.get_value()))
        slab = VGroup(M(r"\text{SSE} =", 36), DecimalNumber(10, num_decimal_places=2, font_size=36, color=SP))
        slab.arrange(RIGHT, buff=0.2).move_to(P(3.3, 1.3))
        slab[1].add_updater(lambda m: m.set_value(10 - 16 * b.get_value() + 10 * b.get_value() ** 2))
        cap = T("total area of the squares", 22, color=MUTED).next_to(slab, DOWN, buff=0.2)
        with self.voiceover("Now the best straight line through the cloud. For each point, the miss, or residual, "
                            "is the vertical gap to the line. Square each miss, and add the areas. Start with a "
                            "flat line through the point of means. The squares add to ten.") as vo:
            self.play(FadeIn(hd), Create(ax), FadeIn(dots), FadeIn(mean), run_time=1.0)
            self.play(Create(line), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.2))
            self.add(sq)
            self.play(FadeIn(blab), FadeIn(slab), FadeIn(cap), run_time=0.8)

        with self.voiceover("Tilt the line about the point of means. The total area falls, then rises again if "
                            "we tilt too far. The smallest total, three point six, comes at a slope of zero point "
                            "eight. That is the least squares line.") as vo:
            t = max(1.5, vo.duration * 0.3)
            self.play(b.animate.set_value(1.4), run_time=t, rate_func=smooth)
            self.play(b.animate.set_value(0.8), run_time=t * 0.7, rate_func=smooth)
            self.play(Indicate(slab, color=OK), slab[1].animate.set_color(OK), run_time=0.9)

        blab.clear_updaters()
        slab.clear_updaters()
        sq.clear_updaters()
        line.clear_updaters()
        f1 = M(r"b_{yx} = \frac{\operatorname{Cov}(x,y)}{\sigma_x^2} = \frac{1.6}{2} = 0.8", 36, color=SP)
        f2 = M(r"a = \bar y - b\,\bar x = 4 - 2.4 = 1.6", 36)
        f3 = card(M(r"\hat y = 1.6 + 0.8x", 44, color=YX), color=YX)
        VGroup(f1, f2, f3).arrange(DOWN, buff=0.35).move_to(P(3.3, 0.9))
        myth = card(T("\"The best line passes through the most points\"", 20, color=WARN), color=WARN)
        myth.move_to(P(3.3, -2.5))
        with self.voiceover("The formula: the slope b y x is the covariance over sigma x squared, one point six "
                            "over two. And the line always passes through the point of means, so the intercept "
                            "is y bar minus b times x bar, which is one point six. So y hat equals one point six "
                            "plus zero point eight x. The best line does not go through as many points as "
                            "possible. In fact it misses all five.") as vo:
            self.play(FadeOut(VGroup(blab, slab, cap)), run_time=0.4)
            self.play(Write(f1), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(Indicate(mean, color=HL, scale_factor=1.8), run_time=0.8)
            self.play(Write(f2), run_time=1.1)
            self.wait(max(0.1, vo.duration * 0.05))
            self.play(FadeIn(f3, shift=0.2 * UP), run_time=0.7)
            self.wait(max(0.1, vo.duration * 0.08))
            self.play(FadeIn(myth), run_time=0.6)
            self.play(Create(cross_out(myth)), Indicate(sq, color=SP), run_time=0.8)

    # ------------------------------------------------------------ scene 7: two lines (4.7)
    def s7(self):
        hd = header("4.7 · Two regression lines, prediction and fit")
        ax = self.five_axes()
        dots = dots_on(ax, FIVE)
        mean = Dot(ax.c2p(3, 4), radius=0.1, color=HL)
        lyx = Line(ax.c2p(0, 1.6), ax.c2p(6, 6.4), color=YX, stroke_width=4)
        lxy = Line(ax.c2p(0, 0.25), ax.c2p(6, 7.75), color=XY, stroke_width=4)
        tyx = M(r"y \text{ on } x", 28, color=YX).next_to(ax.c2p(6, 6.4), RIGHT, buff=0.12)
        txy = M(r"x \text{ on } y", 28, color=XY).next_to(ax.c2p(6, 7.75), RIGHT, buff=0.12)
        e1 = M(r"\hat y = 1.6 + 0.8x", 38, color=YX).move_to(P(3.4, 2.2))
        e2 = M(r"\hat x = 0.8y - 0.2", 38, color=XY).move_to(P(3.4, 1.3))
        with self.voiceover("To predict x from y, minimise the horizontal misses instead. That gives a different "
                            "line: x hat equals zero point eight y minus zero point two. Both lines cross at the "
                            "point of means. They coincide only when r is plus or minus one.") as vo:
            self.play(FadeIn(hd), Create(ax), FadeIn(dots), run_time=1.0)
            self.play(Create(lyx), FadeIn(tyx), FadeIn(e1), run_time=0.9)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(Create(lxy), FadeIn(txy), Write(e2), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(FadeIn(mean), Flash(mean, color=HL), run_time=0.8)

        p1 = M(r"b_{yx}\cdot b_{xy} = r^2", 40, color=SP).move_to(P(3.4, 0.1))
        p2 = M(r"0.8 \times 0.8 = 0.64", 38).move_to(P(3.4, -0.9))
        fit = card(VGroup(M(r"r^2 = 0.64", 36, color=OK),
                          T("64% of the variation in y explained", 22, color=OK)).arrange(DOWN, buff=0.15),
                   color=OK).move_to(P(3.4, -2.4))
        with self.voiceover("Multiply the two slopes, b y x times b x y. Zero point eight times zero point eight "
                            "is zero point six four, which is r squared. And r squared has a meaning of its own: "
                            "the line explains sixty four percent of the variation in y.") as vo:
            self.play(Write(p1), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(Write(p2), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(FadeIn(fit, shift=0.2 * UP), run_time=0.8)

        h1 = card(VGroup(M(r"\hat h = 80 + 6t", 44, color=YX),
                         T("fitted on ages 3 to 10", 22, color=MUTED)).arrange(DOWN, buff=0.15), color=YX)
        h1.move_to(P(0, 1.3))
        h2 = M(r"t = 40 \ \Rightarrow\ \hat h = 320\ \text{cm}", 44, color=WARN).move_to(P(0, -0.4))
        ext = card(T("Extrapolation: the data cannot vouch for it.", 26, color=WARN), color=WARN).move_to(P(0, -2.2))
        with self.voiceover("Finally, stay inside your data. A height line fitted to children aged three to ten "
                            "predicts three hundred and twenty centimetres at age forty. The line describes the "
                            "data you have, not the world beyond it.") as vo:
            self.play(FadeOut(Group(*[m for m in self.mobjects if m is not hd])), run_time=0.5)
            self.play(FadeIn(h1, shift=0.2 * UP), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(Write(h2), run_time=1.0)
            self.play(Create(cross_out(h2)), run_time=0.5)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(FadeIn(ext, shift=0.2 * UP), run_time=0.7)

    # ------------------------------------------------------------ scene 8: recap
    def s8(self):
        hd = header("Recap")
        items = [
            (DOTC, "Scatter plot: direction, form, strength, outliers"),
            (POS, "Covariance = mean co-deviation rectangle"),
            (SP, "r = Cov / (σx σy), between −1 and 1, linear only"),
            (WARN, "Correlation is not causation"),
            (ACCENT, "Spearman's ρ = Pearson's r on ranks"),
            (YX, "Least squares: through the means, slope Cov / σx²"),
            (XY, "Two regression lines: slopes multiply to r²"),
        ]
        rows = VGroup()
        for col, s in items:
            rows.add(VGroup(Dot(radius=0.09, color=col), T(s, 28)).arrange(RIGHT, buff=0.3))
        rows.arrange(DOWN, buff=0.32, aligned_edge=LEFT).move_to(P(0, -0.3))
        with self.voiceover("Let's recap. Plot pairs, and describe direction, form, strength and outliers. "
                            "Covariance is the mean co-deviation rectangle. Divide by both standard deviations "
                            "to get r, between minus one and one, measuring only straight-line association. "
                            "Correlation is not causation. Spearman's rho is r on ranks. The least squares line "
                            "goes through the point of means with slope covariance over sigma x squared. And the "
                            "two regression lines multiply to r squared. Now try the lessons.") as vo:
            self.play(FadeIn(hd), run_time=0.4)
            step = max(0.3, (vo.duration - 1.0) / len(rows) - 0.5)
            for r in rows:
                self.play(FadeIn(r, shift=0.2 * RIGHT), run_time=0.5)
                self.wait(step)
