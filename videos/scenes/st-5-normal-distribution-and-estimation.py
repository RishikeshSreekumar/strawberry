import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

# Chapter colour roles (light background).
DATA = SECONDARY  # histogram bars / data = teal
CURVE = PRIMARY  # density curves = strawberry red
HL = ManimColor("#D19A00")  # the mean, cut-offs, estimates (gold)
AREA = PURPLE  # shaded areas / probabilities
WARN = PRIMARY
OK = GREEN


# ---------------------------------------------------------------- helpers
def T(s, size=30, **kw):
    return Text(s, font_size=size, **kw)


def M(s, size=40, **kw):
    return MathTex(s, font_size=size, **kw)


def P(x, y):
    return np.array([x, y, 0.0])


def card(mob, pad=0.25, color=MUTED, fill=WHITE, opacity=0.92):
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


def pdf(x, mu, s):
    return math.exp(-((x - mu) ** 2) / (2 * s * s)) / (s * math.sqrt(2 * math.pi))


def Phi(z):
    return 0.5 * (1 + math.erf(z / math.sqrt(2)))


def axes(xr, yr, xl, yl, nums=True, size=22, num_fmt=None):
    ax = Axes(x_range=xr, y_range=yr, x_length=xl, y_length=yl, tips=False,
              axis_config={"color": INK, "stroke_width": 2, "include_ticks": True, "tick_size": 0.06},
              y_axis_config={"include_ticks": False})
    if nums:
        labels = VGroup()
        for v in np.arange(xr[0], xr[1] + 1e-9, xr[2]):
            s = num_fmt(v) if num_fmt else f"{v:g}"
            labels.add(M(s, size, color=MUTED).next_to(ax.c2p(v, 0), DOWN, buff=0.15))
        ax.add(labels)
    return ax


def bars(ax, data, lo, hi, w, color=DATA, opacity=0.55):
    counts, edges = np.histogram(data, bins=np.arange(lo, hi + 1e-9, w))
    n = len(data)
    g = VGroup()
    for c, a in zip(counts, edges[:-1]):
        h = c / (n * w)
        p0, p1 = ax.c2p(a, 0), ax.c2p(a + w, h)
        r = Rectangle(width=max(p1[0] - p0[0], 1e-3), height=max(p1[1] - p0[1], 1e-3),
                      stroke_color=WHITE, stroke_width=1 if w < 2 else 1.5)
        r.set_fill(color, opacity=opacity).move_to((p0 + p1) / 2)
        g.add(r)
    return g


def normal_curve(ax, mu, s, lo, hi, color=CURVE, width=4):
    return ax.plot(lambda x: pdf(x, mu, s), x_range=[lo, hi, (hi - lo) / 300], color=color, stroke_width=width)


def shade(ax, curve, a, b, color=AREA, opacity=0.35):
    return ax.get_area(curve, x_range=(a, b), color=color, opacity=opacity)


class StCh5Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Statistics",
            "Chapter 5 · The Normal Distribution and Estimation",
            "Chapter five. The normal distribution, and estimation.",
        )
        for part in (self.s0, self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ scene 0: hook (5.1)
    def s0(self):
        rng = np.random.default_rng(7)
        ax = axes([130, 190, 10], [0, 0.07, 0.01], 11, 4.6).move_to(P(0, -0.5))
        xl = T("height (cm)", 22, color=MUTED).next_to(ax, DOWN, buff=0.55)
        d1 = rng.normal(160, 8, 120)
        d2 = rng.normal(160, 8, 3000)
        d3 = rng.normal(160, 8, 60000)
        b1 = bars(ax, d1, 130, 190, 5)
        b2 = bars(ax, d2, 130, 190, 2.5)
        b3 = bars(ax, d3, 130, 190, 1)
        cap = [T(s, 26, color=INK) for s in (
            "120 students, bins of 5 cm", "3,000 students, bins of 2.5 cm", "60,000 students, bins of 1 cm")]
        for c in cap:
            c.move_to(P(0, 2.9))
        curve = normal_curve(ax, 160, 8, 130, 190)
        with self.voiceover("Measure the heights of a hundred and twenty students and draw a histogram. You get "
                            "a jagged staircase of bars. Now imagine measuring thousands of students, then tens "
                            "of thousands, and making the bins narrower each time. The staircase gets finer and "
                            "finer, until it settles into a smooth curve. This chapter is about that curve, and "
                            "about what it lets us say from a single sample.") as vo:
            self.play(Create(ax), FadeIn(xl), run_time=0.8)
            self.play(LaggedStart(*[GrowFromEdge(b, DOWN) for b in b1], lag_ratio=0.05), FadeIn(cap[0]),
                      run_time=1.4)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(ReplacementTransform(b1, b2), ReplacementTransform(cap[0], cap[1]), run_time=1.4)
            self.wait(max(0.1, vo.duration * 0.06))
            self.play(ReplacementTransform(b2, b3), ReplacementTransform(cap[1], cap[2]), run_time=1.4)
            self.wait(max(0.1, vo.duration * 0.06))
            self.play(Create(curve), run_time=1.5)

    # ------------------------------------------------------------ scene 1: density curves (5.1)
    def s1(self):
        hd = header("5.1 · From histograms to density curves")
        ax = axes([130, 190, 10], [0, 0.07, 0.01], 8.2, 3.6).move_to(P(-2.2, -0.9))
        curve = normal_curve(ax, 160, 8, 130, 190)
        rng = np.random.default_rng(3)
        bb = bars(ax, rng.normal(160, 8, 120), 130, 190, 5, opacity=0.35)
        f1 = M(r"\text{bar height} = \frac{\text{relative frequency}}{\text{class width}}", 34)
        f1c = card(f1, color=AREA).move_to(P(0, 2.5))
        tot = card(M(r"\text{total area} = 1", 36, color=AREA), color=AREA).move_to(P(4.6, 0.6))
        area = shade(ax, curve, 150, 165)
        prop = M(r"\text{proportion between } a \text{ and } b", 28, color=AREA)
        prop2 = M(r"= \text{area between } a \text{ and } b", 28, color=AREA)
        pg = VGroup(prop, prop2).arrange(DOWN, buff=0.15).move_to(P(4.4, -1.0))
        with self.voiceover("First, one adjustment. We rescale each bar so that its area, not its height, is the "
                            "fraction of the data in that class. That is relative frequency divided by class "
                            "width. Now all the areas add up to one, whatever the sample size and whatever the "
                            "bin width. The smooth limit is a density curve. The proportion of the data between "
                            "a and b is the area under the curve between a and b.") as vo:
            self.play(FadeIn(hd), Create(ax), FadeIn(bb), run_time=0.9)
            self.play(FadeIn(f1c, shift=0.2 * DOWN), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.25))
            self.play(FadeIn(tot), run_time=0.6)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(Create(curve), bb.animate.set_fill(opacity=0.12), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.05))
            self.play(FadeIn(area), FadeIn(pg), run_time=0.9)

        self.play(FadeOut(VGroup(ax, curve, bb, f1c, tot, area, pg)), run_time=0.5)
        bx = axes([0, 20, 5], [0, 0.08, 0.02], 8, 3.4).move_to(P(-2.0, -0.4))
        bl = T("waiting time (min)", 22, color=MUTED).next_to(bx, DOWN, buff=0.5)
        flat = Line(bx.c2p(0, 0.05), bx.c2p(20, 0.05), color=CURVE, stroke_width=4)
        hl = M(r"\text{height} = \tfrac{1}{20} = 0.05", 30, color=CURVE).next_to(flat, UP, buff=0.15)
        rect = Polygon(bx.c2p(5, 0), bx.c2p(12, 0), bx.c2p(12, 0.05), bx.c2p(5, 0.05),
                       stroke_width=0).set_fill(AREA, opacity=0.4)
        calc = M(r"P(5 < X < 12) = 7 \times 0.05 = 0.35", 32, color=AREA).move_to(P(0, 2.4))
        pt = Line(bx.c2p(5, 0), bx.c2p(5, 0.05), color=WARN, stroke_width=5)
        zero = M(r"P(X = 5) = 0", 34, color=WARN).move_to(P(4.6, 0.6))
        msg = card(T("Height is not probability.\nOnly area is.", 26, color=WARN, weight="BOLD",
                     line_spacing=0.9), color=WARN).move_to(P(4.6, -0.9))
        with self.voiceover("A bus comes every twenty minutes, and you arrive at random. Your wait is spread "
                            "evenly from zero to twenty minutes, so the density is a flat line at height one "
                            "twentieth. The chance of waiting between five and twelve minutes is a rectangle: "
                            "width seven, times height zero point zero five, which is zero point three five. And "
                            "the chance of waiting exactly five minutes? The area over a single point is zero. "
                            "The height of a density curve is not a probability. Only areas are.") as vo:
            self.play(Create(bx), FadeIn(bl), run_time=0.8)
            self.play(Create(flat), Write(hl), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(FadeIn(rect), Write(calc), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(FadeOut(rect), Create(pt), Write(zero), run_time=0.9)
            self.wait(max(0.1, vo.duration * 0.05))
            self.play(FadeIn(msg, shift=0.2 * UP), run_time=0.7)

    # ------------------------------------------------------------ scene 2: the normal curve (5.2)
    def s2(self):
        hd = header("5.2 · The normal curve")
        ax = axes([120, 200, 10], [0, 0.085, 0.01], 11, 4.2).move_to(P(0, -1.2))
        mu = ValueTracker(160)
        sg = ValueTracker(8)
        curve = always_redraw(lambda: ax.plot(lambda x: pdf(x, mu.get_value(), sg.get_value()),
                                              x_range=[120, 200, 0.25], color=CURVE, stroke_width=4))
        ml = always_redraw(lambda: DashedLine(ax.c2p(mu.get_value(), 0),
                                              ax.c2p(mu.get_value(), pdf(mu.get_value(), mu.get_value(),
                                                                         sg.get_value())),
                                              color=HL, stroke_width=3))
        name = M(r"X \sim N(\mu,\ \sigma^2)", 40).move_to(P(-3.6, 2.4))
        mu_r = VGroup(M(r"\mu =", 36, color=HL), DecimalNumber(160, num_decimal_places=0, font_size=36, color=HL))
        mu_r.arrange(RIGHT, buff=0.15)
        sg_r = VGroup(M(r"\sigma =", 36, color=AREA), DecimalNumber(8, num_decimal_places=0, font_size=36,
                                                                    color=AREA))
        sg_r.arrange(RIGHT, buff=0.15)
        rd = VGroup(mu_r, sg_r).arrange(RIGHT, buff=0.8).move_to(P(3.4, 2.4))
        mu_r[1].add_updater(lambda d: d.set_value(mu.get_value()))
        sg_r[1].add_updater(lambda d: d.set_value(sg.get_value()))
        with self.voiceover("The most important density curve is the normal curve: bell shaped, symmetric, and "
                            "fixed by two numbers. The mean, mu, sets the centre. Slide mu, and the whole bell "
                            "slides. The standard deviation, sigma, sets the spread. Make sigma bigger, and the "
                            "bell gets wider and lower, because the total area must stay one.") as vo:
            self.play(FadeIn(hd), Create(ax), run_time=0.8)
            self.add(curve, ml)
            self.play(FadeIn(name), FadeIn(rd), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(mu.animate.set_value(175), run_time=1.5)
            self.play(mu.animate.set_value(150), run_time=1.5)
            self.play(mu.animate.set_value(160), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.05))
            self.play(sg.animate.set_value(14), run_time=1.6)
            self.play(sg.animate.set_value(5), run_time=1.6)
            self.play(sg.animate.set_value(8), run_time=1.0)
        mu_r[1].clear_updaters()
        sg_r[1].clear_updaters()
        self.remove(curve, ml)
        self.play(FadeOut(VGroup(ax, name, rd)), run_time=0.5)

        ax2 = axes([128, 192, 8], [0, 0.06, 0.01], 11, 3.6).move_to(P(0, -0.6))
        c2 = normal_curve(ax2, 160, 8, 128, 192)
        nm = M(r"\text{Heights} \sim N(160,\ 8^2)", 34).move_to(P(3.4, 2.9))
        l1 = M(r"\mu \pm \sigma:\ 68\%", 32, color=AREA)
        l2 = M(r"\mu \pm 2\sigma:\ 95\%", 32, color=AREA)
        l3 = M(r"\mu \pm 3\sigma:\ 99.7\%", 32, color=AREA)
        lg = VGroup(l1, l2, l3).arrange(DOWN, aligned_edge=LEFT, buff=0.15).move_to(P(-4.1, 2.3))
        a1 = shade(ax2, c2, 152, 168, opacity=0.4)
        a2 = shade(ax2, c2, 144, 176, opacity=0.22)
        a3 = shade(ax2, c2, 136, 184, opacity=0.12)
        warn = card(T("Not all data are normal: incomes have a long right tail.", 24, color=WARN),
                    color=WARN).move_to(P(0, -3.45))
        with self.voiceover("Take heights that are normal, with mean one sixty centimetres and standard deviation "
                            "eight. About sixty eight percent lie within one sigma of the mean, from one fifty "
                            "two to one sixty eight. About ninety five percent lie within two sigma, and ninety "
                            "nine point seven percent within three. But be careful. Not all data are normal. "
                            "Incomes, for example, have a long right tail.") as vo:
            self.play(Create(ax2), Create(c2), FadeIn(nm), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(FadeIn(a1), Write(l1), run_time=0.9)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(FadeIn(a2), Write(l2), run_time=0.9)
            self.play(FadeIn(a3), Write(l3), run_time=0.9)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(FadeIn(warn, shift=0.2 * UP), run_time=0.7)

    # ------------------------------------------------------------ scene 3: standardising (5.3)
    def s3(self):
        hd = header("5.3 · Standardising: the standard normal table")
        zf = card(M(r"z = \frac{x - \mu}{\sigma}", 48), color=HL).move_to(P(0, 2.3))
        sub = T("how many standard deviations from the mean", 24, color=MUTED).next_to(zf, DOWN, buff=0.25)
        xl = NumberLine(x_range=[136, 184, 8], length=10, color=INK, include_tip=False, tick_size=0.07)
        xl.add(VGroup(*[M(str(v), 26, color=DATA).next_to(xl.n2p(v), UP, buff=0.15) for v in range(136, 185, 8)]))
        zl = NumberLine(x_range=[-3, 3, 1], length=10, color=INK, include_tip=False, tick_size=0.07)
        zl.add(VGroup(*[M(f"{v}", 26, color=HL).next_to(zl.n2p(v), DOWN, buff=0.15) for v in range(-3, 4)]))
        xl.move_to(P(0.4, -0.3))
        zl.move_to(P(0.4, -2.3))
        xn = M("x", 34, color=DATA).next_to(xl, LEFT, buff=0.4)
        zn = M("z", 34, color=HL).next_to(zl, LEFT, buff=0.4)
        links = VGroup(*[DashedLine(xl.n2p(v), zl.n2p((v - 160) / 8), color=MUTED, stroke_width=2)
                         for v in range(136, 185, 8)])
        with self.voiceover("Every normal curve is the same bell, just shifted and stretched. So we can turn any "
                            "value into a z score: x minus mu, over sigma, the number of standard deviations from "
                            "the mean. That turns every normal into the standard normal, with mean zero and "
                            "standard deviation one. And one table, capital phi of z, gives the area to the left "
                            "of z.") as vo:
            self.play(FadeIn(hd), FadeIn(zf, shift=0.2 * DOWN), FadeIn(sub), run_time=0.9)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(Create(xl), FadeIn(xn), run_time=0.8)
            self.play(LaggedStart(*[Create(l) for l in links], lag_ratio=0.1), Create(zl), FadeIn(zn),
                      run_time=1.6)
        self.play(FadeOut(VGroup(zf, sub, xl, zl, xn, zn, links)), run_time=0.5)

        ax = axes([-3, 3, 1], [0, 0.45, 0.1], 8, 3.2).move_to(P(-2.4, 0.9))
        c = normal_curve(ax, 0, 1, -3, 3)
        a1 = shade(ax, c, -3, 1.25, color=AREA, opacity=0.35)
        z1 = DashedLine(ax.c2p(1.25, 0), ax.c2p(1.25, pdf(1.25, 0, 1)), color=HL, stroke_width=3)
        ph = M(r"\Phi(z) = \text{area left of } z", 30, color=AREA).move_to(P(4.1, 2.2))
        s1 = VGroup(
            M(r"P(X < 170),\quad X \sim N(160,\ 8^2)", 30),
            M(r"z = \frac{170 - 160}{8} = 1.25", 30),
            M(r"\Phi(1.25) = 0.8944 \approx 89\%", 30, color=AREA),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.2).move_to(P(0, -2.4))
        with self.voiceover("How many students are shorter than one seventy centimetres? z is one seventy minus "
                            "one sixty, over eight, which is one point two five. The table gives phi of one point "
                            "two five equals zero point eight nine four four. About eighty nine percent.") as vo:
            self.play(Create(ax), Create(c), FadeIn(ph), run_time=1.0)
            self.play(Write(s1[0]), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.05))
            self.play(Write(s1[1]), Create(z1), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(FadeIn(a1), Write(s1[2]), run_time=1.0)

        a2 = shade(ax, c, -3, -1.2, color=WARN, opacity=0.4)
        z2 = DashedLine(ax.c2p(-1.2, 0), ax.c2p(-1.2, pdf(-1.2, 0, 1)), color=WARN, stroke_width=3)
        s2 = VGroup(
            M(r"\text{Marks} \sim N(62,\ 10^2):\ P(X < 50)", 30),
            M(r"z = \frac{50 - 62}{10} = -1.2", 30),
            M(r"\Phi(-1.2) = 1 - \Phi(1.2) = 1 - 0.8849 = 0.1151", 30, color=WARN),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.2).move_to(P(0, -2.4))
        neg = card(T("negative z  ≠  negative probability", 22, color=WARN), color=WARN).move_to(P(4.1, 1.0))
        with self.voiceover("Now exam marks, with mean sixty two and standard deviation ten. What fraction score "
                            "below fifty? z is minus one point two. A negative z does not give a negative "
                            "probability. It just means below the mean. By symmetry, phi of minus one point two "
                            "is one minus phi of one point two: one minus zero point eight eight four nine, which "
                            "is zero point one one five one. About eleven and a half percent.") as vo:
            self.play(FadeOut(a1), FadeOut(z1), FadeOut(s1), run_time=0.5)
            self.play(Write(s2[0]), run_time=0.8)
            self.play(Write(s2[1]), Create(z2), run_time=0.9)
            self.wait(max(0.1, vo.duration * 0.05))
            self.play(FadeIn(neg), run_time=0.6)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(FadeIn(a2), Write(s2[2]), run_time=1.2)

    # ------------------------------------------------------------ scene 4: working backwards (5.4)
    def s4(self):
        hd = header("5.4 · Working backwards: from proportion to value")
        ax = axes([22, 102, 10], [0, 0.045, 0.01], 11, 3.4).move_to(P(0, 0.6))
        c = normal_curve(ax, 62, 10, 22, 102)
        nm = M(r"\text{Marks} \sim N(62,\ 10^2)", 30).move_to(P(4.3, 2.9))
        top = shade(ax, c, 74.82, 102, color=HL, opacity=0.55)
        cut = DashedLine(ax.c2p(74.82, 0), ax.c2p(74.82, 0.036), color=HL, stroke_width=4)
        pct = M(r"10\%", 30, color=HL).move_to(ax.c2p(80, 0.025))
        pct_ar = Arrow(ax.c2p(80, 0.022), ax.c2p(79, 0.004), buff=0.05, color=HL, stroke_width=3,
                       max_tip_length_to_length_ratio=0.2)
        ninety = M(r"90?", 34, color=WARN).next_to(ax.c2p(90, 0.009), UP, buff=0.1)
        x90 = Line(ninety.get_corner(DL), ninety.get_corner(UR), color=WARN, stroke_width=4)
        steps = VGroup(
            M(r"\text{10\% above} \Rightarrow \Phi(z) = 0.90", 32),
            M(r"\text{table backwards: } z = 1.282", 32),
            M(r"x = \mu + z\sigma = 62 + 1.282 \times 10 \approx 75", 32, color=HL),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.22).move_to(P(0, -2.6))
        with self.voiceover("Now run it backwards. The top ten percent on that exam get an A grade. Where is the "
                            "cut off? A tempting answer is ninety marks. But top ten percent is about people, "
                            "which means area, not marks. Ten percent above means ninety percent below, so phi of "
                            "z equals zero point nine. Reading the table backwards gives z equals one point two "
                            "eight two. Then un-standardise: x equals mu plus z sigma. Sixty two, plus one point "
                            "two eight two times ten, is about seventy five marks. Nowhere near ninety.") as vo:
            self.play(FadeIn(hd), Create(ax), Create(c), FadeIn(nm), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.08))
            self.play(FadeIn(ninety), run_time=0.6)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(Create(x90), FadeIn(top), FadeIn(pct), GrowArrow(pct_ar), run_time=0.9)
            self.play(Write(steps[0]), run_time=0.9)
            self.wait(max(0.1, vo.duration * 0.08))
            self.play(Write(steps[1]), run_time=0.9)
            self.wait(max(0.1, vo.duration * 0.08))
            self.play(Write(steps[2]), Create(cut), run_time=1.2)

    # ------------------------------------------------------------ scene 5: sampling distributions (5.5)
    def s5(self):
        hd = header("5.5 · Samples and sampling distributions")
        shape, scale = 9.0, 20.0  # gamma: mean 180, SD 60, right-skewed

        def gpdf(x):
            if x <= 0:
                return 0.0
            return x ** (shape - 1) * math.exp(-x / scale) / (math.gamma(shape) * scale ** shape)

        pax = axes([0, 400, 100], [0, 0.008, 0.002], 5.6, 1.8, size=20).move_to(P(-3.4, 1.5))
        pc = pax.plot(gpdf, x_range=[1, 400, 2], color=DATA, stroke_width=4)
        parea = pax.get_area(pc, x_range=(1, 400), color=DATA, opacity=0.2)
        plab = T("population: screen time (min)", 20, color=MUTED).next_to(pax, UP, buff=0.12)
        pst = VGroup(M(r"\mu = 180", 32, color=HL), M(r"\sigma = 60", 32, color=AREA)) \
            .arrange(DOWN, aligned_edge=LEFT, buff=0.15).move_to(P(1.0, 1.6))

        rng = np.random.default_rng(11)
        sample = rng.gamma(shape, scale, 4)
        sdots = VGroup(*[Dot(pax.c2p(v, 0) + UP * 0.12, radius=0.08, color=PRIMARY) for v in sample])
        xbar = float(np.mean(sample))
        xm = Triangle(color=HL).set_fill(HL, 1).scale(0.1).rotate(PI).move_to(pax.c2p(xbar, 0) + UP * 0.35)
        xbl = M(r"\bar x", 28, color=HL).next_to(xm, UP, buff=0.05)

        mx = axes([80, 280, 40], [0, 0.036, 0.01], 11, 3.0).move_to(P(0, -1.9))
        mlab = T("sample means", 20, color=MUTED).next_to(mx, UP, buff=0.05).align_to(mx, LEFT)
        m4 = rng.gamma(shape, scale, (600, 4)).mean(axis=1)
        m25 = rng.gamma(shape, scale, (600, 25)).mean(axis=1)
        h4 = bars(mx, m4, 80, 280, 10, color=HL, opacity=0.5)
        h25 = bars(mx, m25, 80, 280, 5, color=HL, opacity=0.5)
        c4 = normal_curve(mx, 180, 30, 80, 280, color=CURVE, width=3)
        c25 = normal_curve(mx, 180, 12, 80, 280, color=CURVE, width=3)
        n4 = M(r"n = 4", 32).move_to(P(4.6, 0.3))
        n25 = M(r"n = 25", 32).move_to(P(4.6, 0.3))
        sd = card(M(r"\text{SD}(\bar x) = \frac{\sigma}{\sqrt{n}}", 36, color=CURVE), color=CURVE).move_to(P(4.6, 2.0))

        with self.voiceover("Real questions are about whole populations, but we can only afford a sample. And "
                            "different samples give different means. So the sample mean, x bar, is itself a "
                            "random quantity. Here is a skewed population: teenagers' daily screen time, with "
                            "mean one eighty minutes and standard deviation sixty. Draw a sample of four and "
                            "average it. Do that hundreds of times, and stack up the means.") as vo:
            self.play(FadeIn(hd), run_time=0.5)
            self.play(Create(pax), Create(pc), FadeIn(parea), FadeIn(plab), run_time=1.2)
            self.play(FadeIn(pst), run_time=0.6)
            self.wait(max(0.1, vo.duration * 0.2))
            self.play(LaggedStart(*[FadeIn(d, shift=0.4 * DOWN) for d in sdots], lag_ratio=0.2), run_time=1.0)
            self.play(FadeIn(xm), FadeIn(xbl), run_time=0.6)
            self.play(Create(mx), FadeIn(mlab), FadeIn(n4), run_time=0.8)
            self.play(LaggedStart(*[GrowFromEdge(b, DOWN) for b in h4], lag_ratio=0.04), run_time=2.0)

        with self.voiceover("The means pile up in a bell, centred on the true mean. Take samples of twenty five "
                            "instead, and the bell gets much narrower. The standard deviation of x bar is sigma "
                            "over root n. To halve it, you need four times the sample. And this bell appears even "
                            "though the population is skewed. That is the central limit theorem.") as vo:
            self.play(Create(c4), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.08))
            self.play(ReplacementTransform(h4, h25), ReplacementTransform(c4, c25),
                      ReplacementTransform(n4, n25), run_time=1.8)
            self.wait(max(0.1, vo.duration * 0.05))
            self.play(FadeIn(sd, shift=0.2 * DOWN), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.2))
            self.play(Indicate(pc, color=DATA), run_time=1.0)

        self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
        w1 = VGroup(T("Precision depends on the sample size n,", 28, weight="BOLD"),
                    T("not on the size of the population.", 28)).arrange(DOWN, buff=0.15)
        w2 = VGroup(T("A bigger sample does not remove bias.", 28, weight="BOLD", color=WARN),
                    T("50,000 online votes are still only the people who chose to vote.", 24)) \
            .arrange(DOWN, buff=0.15)
        c1 = card(w1, color=AREA).move_to(P(0, 1.2))
        c2 = card(w2, color=WARN).move_to(P(0, -1.3))
        with self.voiceover("Two warnings. Precision depends on the sample size, not on how big the population "
                            "is. And a bigger sample does not remove bias. Fifty thousand votes in an online poll "
                            "are still only the people who chose to vote.") as vo:
            self.play(FadeIn(c1, shift=0.2 * UP), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.3))
            self.play(FadeIn(c2, shift=0.2 * UP), run_time=0.8)

    # ------------------------------------------------------------ scene 6: confidence intervals (5.6)
    def s6(self):
        hd = header("5.6 · Estimation and confidence intervals")
        given = M(r"n = 64,\quad \bar x = 1180 \text{ h},\quad \sigma = 120 \text{ h}", 34).move_to(P(0, 2.6))
        steps = VGroup(
            M(r"\text{SE} = \frac{\sigma}{\sqrt n} = \frac{120}{8} = 15", 34),
            M(r"\text{margin} = 1.96 \times 15 = 29.4", 34),
            M(r"1180 \pm 29.4 = (1150.6,\ 1209.4)", 36, color=HL),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.3).move_to(P(-2.3, 0.4))
        gen = card(M(r"\bar x \pm 1.96\,\frac{\sigma}{\sqrt n}", 44, color=HL), color=HL).move_to(P(4.3, 0.4))
        nl = NumberLine(x_range=[1140, 1220, 20], length=10, color=INK, include_tip=False, tick_size=0.07)
        nl.add(VGroup(*[M(str(v), 24, color=MUTED).next_to(nl.n2p(v), DOWN, buff=0.15)
                        for v in range(1140, 1221, 20)]))
        nl.move_to(P(0, -2.6))
        seg = Line(nl.n2p(1150.6), nl.n2p(1209.4), color=HL, stroke_width=8).shift(UP * 0.35)
        ends = VGroup(Line(UP * 0.18, DOWN * 0.18, color=HL, stroke_width=5).move_to(seg.get_start()),
                      Line(UP * 0.18, DOWN * 0.18, color=HL, stroke_width=5).move_to(seg.get_end()))
        cen = Dot(nl.n2p(1180) + UP * 0.35, radius=0.09, color=HL)
        with self.voiceover("Now we can estimate. Sixty four bulbs have a mean life of eleven eighty hours, and "
                            "sigma is known to be one hundred and twenty. The standard error, the standard "
                            "deviation of the estimate, is one twenty over root sixty four, which is fifteen. "
                            "Ninety five percent of sample means lie within one point nine six standard errors of "
                            "mu. So the margin of error is one point nine six times fifteen, twenty nine point "
                            "four, and the interval runs from eleven fifty point six to twelve oh nine point four "
                            "hours.") as vo:
            self.play(FadeIn(hd), Write(given), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(Write(steps[0]), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(FadeIn(gen), run_time=0.7)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(Write(steps[1]), run_time=1.0)
            self.play(Create(nl), FadeIn(cen), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.05))
            self.play(Write(steps[2]), GrowFromCenter(seg), FadeIn(ends), run_time=1.2)
        self.play(FadeOut(VGroup(given, steps, gen, nl, seg, ends, cen)), run_time=0.5)

        # 20 repeated studies; pick a seed where exactly one interval misses.
        mu0, se, me = 1200.0, 15.0, 29.4
        for seed in range(200):
            xs = np.random.default_rng(seed).normal(mu0, se, 20)
            miss = np.abs(xs - mu0) > me
            if miss.sum() == 1:
                break
        lo_x, hi_x = 1120, 1280
        width = 9.0
        x0 = -2.4

        def sx(v):
            return x0 + (v - (lo_x + hi_x) / 2) / (hi_x - lo_x) * width

        top, gap = 2.6, 0.27
        muline = DashedLine(P(sx(mu0), top + 0.25, ), P(sx(mu0), top - 19 * gap - 0.25), color=HL, stroke_width=4)
        mulab = M(r"\mu", 36, color=HL).next_to(muline, DOWN, buff=0.1)
        ivs = VGroup()
        for i, (xv, m) in enumerate(zip(xs, miss)):
            col = WARN if m else OK
            y = top - i * gap
            ivs.add(VGroup(Line(P(sx(xv - me), y), P(sx(xv + me), y), color=col, stroke_width=5),
                           Dot(P(sx(xv), y), radius=0.05, color=col)))
        count = card(M(r"19 \text{ of } 20 \text{ catch } \mu", 34, color=OK), color=OK).move_to(P(4.3, 1.2))
        note = VGroup(T("95% describes the method,", 24, weight="BOLD"),
                      T("not this one interval.", 24),
                      T("μ is fixed; the interval moves.", 24, color=MUTED)) \
            .arrange(DOWN, aligned_edge=LEFT, buff=0.12).move_to(P(4.3, -1.2))
        with self.voiceover("What does ninety five percent confident mean? Imagine repeating the whole study "
                            "twenty times. Each sample gives its own interval. Most of them catch the true mean. "
                            "About one in twenty misses. The ninety five percent describes the method, not this "
                            "one interval. The true mean is fixed. It is the interval that moves.") as vo:
            self.play(Create(muline), FadeIn(mulab), run_time=0.7)
            self.play(LaggedStart(*[Create(iv) for iv in ivs], lag_ratio=0.12), run_time=3.0)
            self.wait(max(0.1, vo.duration * 0.08))
            self.play(FadeIn(count), *[Indicate(iv, color=WARN) for iv, m in zip(ivs, miss) if m], run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.08))
            self.play(FadeIn(note, shift=0.2 * UP), run_time=0.8)

    # ------------------------------------------------------------ scene 7: recap
    def s7(self):
        title = T("Chapter 5 in five lines", 40, weight="BOLD", color=PRIMARY).move_to(P(0, 3.1))
        lines = [
            ("Areas under a density curve are proportions; total area is 1.", AREA),
            ("The normal curve is fixed by μ (centre) and σ (spread): 68–95–99.7.", CURVE),
            ("Standardise with z = (x − μ)/σ; one table Φ(z) answers everything.", HL),
            ("Backwards: find z from the area, then x = μ + zσ.", DATA),
            ("x̄ has SD σ/√n, so x̄ ± 1.96 σ/√n is a 95% interval for μ.", OK),
        ]
        rows = VGroup()
        for i, (s, c) in enumerate(lines, start=1):
            num = Circle(radius=0.24, color=c, stroke_width=2).set_fill(c, opacity=1)
            num = VGroup(num, T(str(i), 22, color=WHITE, weight="BOLD").move_to(num))
            rows.add(VGroup(num, T(s, 24)).arrange(RIGHT, buff=0.3))
        rows.arrange(DOWN, aligned_edge=LEFT, buff=0.38).move_to(P(0, 0.0))
        if rows.width > config.frame_width - 0.8:
            rows.scale_to_fit_width(config.frame_width - 0.8)
        foot = T("Next: Chapter 5 Mastery", 26, color=MUTED).move_to(P(0, -3.2))
        with self.voiceover("So here is the chapter in five lines. Areas under a density curve are proportions, "
                            "and the total area is one. The normal curve is fixed by mu and sigma, with the sixty "
                            "eight, ninety five, ninety nine point seven rule. Standardise with z, and one table "
                            "answers every question. Run it backwards to find a cut off: x equals mu plus z "
                            "sigma. And the sample mean has its own bell, with spread sigma over root n, which "
                            "gives an estimate with an honest margin of error: x bar, plus or minus one point "
                            "nine six sigma over root n.") as vo:
            self.play(FadeIn(title), run_time=0.6)
            per = max(0.3, (vo.duration - 2.0) / 6)
            for r in rows:
                self.play(FadeIn(r, shift=0.2 * RIGHT), run_time=0.6)
                self.wait(max(0.1, per - 0.6))
            self.play(FadeIn(foot), run_time=0.5)
