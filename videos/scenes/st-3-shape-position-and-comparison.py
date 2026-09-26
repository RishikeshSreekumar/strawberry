import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

# Chapter colour roles (light background).
DATA = PRIMARY  # data dots, bars, curves
MED = SECONDARY  # median and quartile box (teal)
MEAN = ManimColor("#D19A00")  # mean (gold)
MODE = PURPLE
WARN = PRIMARY
OK = GREEN

# Data sets, identical to src/modules/content/statistics-chapter-3-content.ts
STUDY = [12, 18, 20, 22, 25, 25, 28, 30, 32, 35, 38, 40, 45, 52, 58]
STUDY2 = [12, 18, 20, 22, 25, 25, 28, 30, 32, 35, 38, 40, 45, 60, 75]
SEC_A = [18, 22, 25, 27, 28, 30, 31, 32, 33, 34, 35, 36, 38, 44, 47]
SEC_B = [4, 7, 21, 30, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43]


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


class NumLine:
    """Horizontal number line mapping data [a, b] onto screen x in [x0, x1] at height y."""

    def __init__(self, a, b, x0, x1, y):
        self.a, self.b, self.x0, self.x1, self.y = a, b, x0, x1, y

    def x(self, v):
        return self.x0 + (v - self.a) / (self.b - self.a) * (self.x1 - self.x0)

    def p(self, v, dy=0.0):
        return P(self.x(v), self.y + dy)

    def draw(self, ticks, size=26, labels=None, color=INK):
        g = VGroup(Line(P(self.x0, self.y), P(self.x1, self.y), color=INK, stroke_width=2))
        for i, v in enumerate(ticks):
            t = Line(self.p(v), self.p(v, -0.1), color=INK, stroke_width=2)
            lab = M(labels[i] if labels else str(v), size, color=color).next_to(t, DOWN, buff=0.08)
            g.add(VGroup(t, lab))
        return g


def five(data):
    s = sorted(data)
    n = len(s)
    med = s[n // 2]
    return s[0], float(np.median(s[: n // 2])), med, float(np.median(s[n // 2 + 1:])), s[-1]


def boxplot(nl, y, q1, med, q3, lo, hi, h=0.8, color=MED):
    box = Polygon(nl.p(q1, y - h / 2 - nl.y), nl.p(q3, y - h / 2 - nl.y), nl.p(q3, y + h / 2 - nl.y),
                  nl.p(q1, y + h / 2 - nl.y), color=color, stroke_width=3).set_fill(color, opacity=0.18)
    mline = Line(nl.p(med, y - h / 2 - nl.y), nl.p(med, y + h / 2 - nl.y), color=color, stroke_width=5)
    wl = Line(nl.p(lo, y - nl.y), nl.p(q1, y - nl.y), color=INK, stroke_width=3)
    wr = Line(nl.p(q3, y - nl.y), nl.p(hi, y - nl.y), color=INK, stroke_width=3)
    cl = Line(nl.p(lo, y - nl.y - 0.2), nl.p(lo, y - nl.y + 0.2), color=INK, stroke_width=3)
    cr = Line(nl.p(hi, y - nl.y - 0.2), nl.p(hi, y - nl.y + 0.2), color=INK, stroke_width=3)
    return VGroup(box, mline, wl, wr, cl, cr)


def stacked_dots(nl, data, radius=0.1, gap=0.24, base=0.22, color=DATA):
    seen = {}
    g = VGroup()
    for v in data:
        k = seen.get(v, 0)
        seen[v] = k + 1
        g.add(Dot(nl.p(v, base + gap * k), radius=radius, color=color))
    return g


class StCh3Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Statistics",
            "Chapter 3 · Shape, Position and Comparison",
            "Chapter three. Shape, position and comparison.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6):
            part()
            self.clear_scene()

    def hold(self, vo, frac):
        self.wait(max(0.1, vo.duration * frac))

    # ------------------------------------------------------------ scene 1: shape
    def s1(self):
        hd = header("3.1 · The Shape of a Distribution")
        x0, x1, y0, yl = -5.5, 5.5, -2.4, 4.0
        ymax = 0.3

        def sp(x, y):
            return P(x0 + x / 10 * (x1 - x0), y0 + y / ymax * yl)

        def bell(x):
            return np.exp(-((x - 5) ** 2) / (2 * 1.6 ** 2)) / (1.6 * np.sqrt(2 * np.pi))

        def right(x):
            return x * np.exp(-x / 1.5) / 2.25

        def left(x):
            return right(10 - x)

        def curve(f, color=DATA):
            xs = np.linspace(0, 10, 161)
            c = VMobject(color=color, stroke_width=5)
            c.set_points_smoothly([sp(x, f(x)) for x in xs])
            return c

        axes = VGroup(Line(sp(0, 0), sp(10, 0), color=INK, stroke_width=2),
                      Line(sp(0, 0), sp(0, ymax), color=INK, stroke_width=2))
        bars = VGroup()
        for a in np.arange(1.0, 9.0, 0.5):
            h = bell(a + 0.25)
            r = Rectangle(width=sp(0.5, 0)[0] - sp(0, 0)[0], height=sp(0, h)[1] - sp(0, 0)[1],
                          color=WHITE, stroke_width=1.5).set_fill(DATA, opacity=0.55)
            bars.add(r.move_to(sp(a, 0), aligned_edge=DL))
        c = curve(bell)
        lab = T("symmetric", 28, color=DATA, weight="BOLD").move_to(P(3.8, 2.4))
        mirror = DashedLine(sp(5, 0), sp(5, 0.27), color=MUTED, dash_length=0.12)

        with self.voiceover("A centre and a spread are two numbers, and two numbers can hide a lot. Smooth the "
                            "top of a big histogram into a curve, and you see what they miss: the shape. Here is "
                            "a symmetric bell. The left half mirrors the right.") as vo:
            self.play(FadeIn(hd), Create(axes), run_time=0.8)
            self.play(LaggedStart(*[GrowFromEdge(b, DOWN) for b in bars], lag_ratio=0.08), run_time=1.6)
            self.hold(vo, 0.15)
            self.play(Create(c), bars.animate.set_fill(opacity=0.15), run_time=1.4)
            self.play(FadeIn(lab), Create(mirror), run_time=0.7)

        c2 = curve(right)
        lab2 = T("right-skewed", 28, color=DATA, weight="BOLD").move_to(P(3.8, 2.4))
        tail = Arrow(sp(4.6, 0.12), sp(8.6, 0.05), color=WARN, buff=0, stroke_width=4)
        tlab = T("long tail", 24, color=WARN).next_to(tail, UP, buff=0.1)
        peak = T("peak", 24, color=INK).next_to(sp(1.5, right(1.5)), UP, buff=0.15)
        myth = card(T("\"peak on the right\"", 24, color=WARN), color=WARN).move_to(P(3.8, 1.4))
        rule = T("The tail names the skew.", 28, color=OK, weight="BOLD").move_to(P(3.8, 0.4))

        with self.voiceover("Now think of incomes, or reaction times. Most values bunch up low, and a few "
                            "stretch far out to the right. This is called right skewed. Look where the peak is. "
                            "It is on the left. The skew is named after the tail, not the peak.") as vo:
            self.play(FadeOut(bars), FadeOut(mirror), Transform(c, c2), Transform(lab, lab2), run_time=1.5)
            self.hold(vo, 0.2)
            self.play(GrowArrow(tail), FadeIn(tlab), run_time=0.8)
            self.hold(vo, 0.1)
            self.play(FadeIn(peak), FadeIn(myth), run_time=0.6)
            self.play(Create(mx := cross_out(myth)), run_time=0.5)
            self.play(FadeIn(rule), run_time=0.6)

        med = 2.517
        marks = VGroup()
        for v, col in ((1.5, MODE), (med, MED), (3.0, MEAN)):
            marks.add(Line(sp(v, 0), sp(v, right(v)), color=col, stroke_width=5))
        legend = VGroup(
            T("mode = 1.5 (the peak)", 24, color=MODE),
            T("median ≈ 2.5 (half the area)", 24, color=MED),
            T("mean = 3 (the balance point)", 24, color=MEAN),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.18)
        legend = card(legend, pad=0.2).move_to(P(3.7, 1.0))
        order = M(r"\text{mode} < \text{median} < \text{mean}", 36, color=INK).move_to(P(3.7, -0.4))
        c3 = curve(left)
        lab3 = T("left-skewed: tail on the left", 26, color=DATA, weight="BOLD").move_to(P(-2.2, 2.4))
        ex3 = T("e.g. marks on an easy exam", 22, color=MUTED).next_to(lab3, DOWN, buff=0.15)

        with self.voiceover("The tail drags the averages with it. The mode sits at the peak. The median splits "
                            "the area in half, a little to the right. The mean, the balance point, is pulled "
                            "furthest into the tail. For a right tail: mode, then median, then mean. Flip the "
                            "curve and you get a left skew, like marks on an easy exam that pile up near the "
                            "top.") as vo:
            self.play(FadeOut(myth), FadeOut(mx), FadeOut(rule), FadeOut(tail), FadeOut(tlab),
                      FadeOut(peak), FadeOut(lab), run_time=0.5)
            for i in range(3):
                self.play(Create(marks[i]), run_time=0.5)
                self.hold(vo, 0.06)
            self.play(FadeIn(legend), run_time=0.6)
            self.play(FadeIn(order), run_time=0.6)
            self.hold(vo, 0.12)
            self.play(FadeOut(marks), FadeOut(legend), FadeOut(order), run_time=0.5)
            self.play(Transform(c, c3), FadeIn(lab3), run_time=1.4)
            self.play(FadeIn(ex3), run_time=0.5)

    # ------------------------------------------------------------ scene 2: boxplots
    def s2(self):
        hd = header("3.2 · Five-Number Summary and Boxplots")
        nl = NumLine(10, 60, -6.0, 6.0, -2.3)
        axis = nl.draw(list(range(10, 61, 10)))
        xl = T("study time (minutes)", 22, color=MUTED).move_to(P(0, -3.3))
        dots = stacked_dots(nl, STUDY)
        mn, q1, md, q3, mx = five(STUDY)

        def tag(v, s, col, dy):
            lab = M(s, 30, color=col).move_to(nl.p(v, dy))
            arr = Line(nl.p(v, dy - 0.25), nl.p(v, 0.75), color=col, stroke_width=2)
            return VGroup(lab, arr)

        t_med = tag(md, r"\text{median} = 30", MED, 2.0)
        t_q1 = tag(q1, r"Q_1 = 22", MED, 1.4)
        t_q3 = tag(q3, r"Q_3 = 40", MED, 1.4)
        t_mn = tag(mn, r"\min = 12", INK, 1.4)
        t_mx = tag(mx, r"\max = 58", INK, 1.4)

        with self.voiceover("Fifteen students logged their daily study time in minutes. Put them in order on "
                            "a number line. The eighth value, thirty, is the median. The median of the lower "
                            "seven is twenty two: that is Q one. The median of the upper seven is forty: Q three. "
                            "The minimum is twelve, and the maximum fifty eight.") as vo:
            self.play(FadeIn(hd), FadeIn(axis), FadeIn(xl), run_time=0.8)
            self.play(LaggedStart(*[FadeIn(d, shift=0.3 * DOWN) for d in dots], lag_ratio=0.1), run_time=1.8)
            self.hold(vo, 0.08)
            self.play(dots[7].animate.set_color(MED).scale(1.4), FadeIn(t_med), run_time=0.7)
            self.hold(vo, 0.08)
            self.play(dots[3].animate.set_color(MED).scale(1.4), FadeIn(t_q1), run_time=0.7)
            self.hold(vo, 0.08)
            self.play(dots[11].animate.set_color(MED).scale(1.4), FadeIn(t_q3), run_time=0.7)
            self.hold(vo, 0.06)
            self.play(FadeIn(t_mn), FadeIn(t_mx), run_time=0.7)

        by = -0.2
        bp = boxplot(nl, by, q1, md, q3, mn, mx)
        pieces = [(mn, q1), (q1, md), (md, q3), (q3, mx)]
        braces = VGroup()
        for a, b in pieces:
            br = BraceBetweenPoints(nl.p(a, by - nl.y + 0.5), nl.p(b, by - nl.y + 0.5), direction=UP, color=MUTED)
            braces.add(VGroup(br, T("25%", 22, color=INK).next_to(br, UP, buff=0.08)))
        myth = card(T("\"longer whisker = more data\"", 24, color=WARN), color=WARN).move_to(P(-3.0, 2.6))
        truth = card(T("longer piece = more spread out", 24, color=OK), color=OK).move_to(P(3.3, 2.6))

        with self.voiceover("Draw a box from Q one to Q three, with a line at the median, and whiskers out to "
                            "the extremes. That is a boxplot. Now the trap. The right whisker is much longer than "
                            "the left. Does it hold more data? No. Each whisker, and each half of the box, holds "
                            "about a quarter of the data. A longer piece means that quarter is more spread out. "
                            "Here the right side is stretched, so the data are skewed right.") as vo:
            self.play(FadeOut(VGroup(t_med, t_q1, t_q3, t_mn, t_mx)), run_time=0.5)
            self.play(Create(bp[0]), Create(bp[1]), run_time=1.0)
            self.play(Create(bp[2:]), run_time=0.8)
            self.hold(vo, 0.15)
            self.play(FadeIn(myth), run_time=0.6)
            self.hold(vo, 0.05)
            self.play(Create(cross_out(myth)), run_time=0.5)
            self.play(LaggedStart(*[FadeIn(b) for b in braces], lag_ratio=0.4), run_time=1.6)
            self.hold(vo, 0.05)
            self.play(FadeIn(truth), run_time=0.6)

    # ------------------------------------------------------------ scene 3: outliers
    def s3(self):
        hd = header("3.3 · Outliers and Robust Summaries")
        nl = NumLine(-10, 160, -6.2, 6.2, -2.0)
        axis = nl.draw(list(range(0, 161, 20)), size=24)
        dots = stacked_dots(nl, STUDY2, radius=0.07, gap=0.16, base=0.16)
        mn, q1, md, q3, mx = five(STUDY2)
        by = -0.6
        bp_full = boxplot(nl, by, q1, md, q3, mn, mx)
        calc = VGroup(
            M(r"\text{IQR} = 40 - 22 = 18", 34, color=MED),
            M(r"1.5 \times 18 = 27", 34, color=INK),
            M(r"22 - 27 = -5,\quad 40 + 27 = 67", 34, color=WARN),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.2)
        calc = card(calc, pad=0.2).move_to(P(-2.6, 2.3))
        fences = VGroup()
        for v, s in ((-5, "lower fence −5"), (67, "upper fence 67")):
            ln = DashedLine(nl.p(v, -0.05), nl.p(v, 2.0), color=WARN, dash_length=0.12, stroke_width=3)
            lb = T(s, 20, color=WARN).next_to(ln.get_end(), UP, buff=0.1)
            if v < 0:
                lb.align_to(ln, LEFT).shift(0.1 * LEFT)
            fences.add(VGroup(ln, lb))

        with self.voiceover("How far is too far? Measure against the data's own spread. The two heaviest "
                            "studiers now report sixty and seventy five minutes. The quartiles do not change, so "
                            "the I Q R is forty minus twenty two, which is eighteen. One and a half times eighteen "
                            "is twenty seven. The fences sit twenty seven below Q one and twenty seven above Q "
                            "three: at minus five, and sixty seven.") as vo:
            self.play(FadeIn(hd), FadeIn(axis), FadeIn(dots), run_time=0.8)
            self.play(Create(bp_full), run_time=1.0)
            self.hold(vo, 0.15)
            self.play(FadeIn(calc[0]), FadeIn(calc[1][0]), run_time=0.7)
            self.hold(vo, 0.1)
            self.play(FadeIn(calc[1][1]), run_time=0.6)
            self.hold(vo, 0.08)
            self.play(FadeIn(calc[1][2]), run_time=0.6)
            self.play(LaggedStart(*[Create(f[0]) for f in fences], lag_ratio=0.4),
                      LaggedStart(*[FadeIn(f[1]) for f in fences], lag_ratio=0.4), run_time=1.2)

        bp_mod = boxplot(nl, by, q1, md, q3, mn, 60)
        out = Dot(nl.p(75, by - nl.y), radius=0.1, color=WARN)
        ring = Circle(radius=0.22, color=WARN, stroke_width=3).move_to(out)
        olab = T("possible outlier", 22, color=WARN).next_to(ring, RIGHT, buff=0.15)
        note = T("Flag it, then investigate. Don't delete by reflex.", 24, color=OK).move_to(P(0, -3.4))

        with self.voiceover("Seventy five is beyond the upper fence, so it is flagged as a possible outlier, and "
                            "drawn as its own point. The whisker stops at sixty, the largest value inside the "
                            "fences. A flag is a reason to investigate, not to delete.") as vo:
            self.play(dots[-1].animate.set_color(WARN).scale(1.4), run_time=0.5)
            self.play(Transform(bp_full, bp_mod), FadeIn(out), run_time=1.0)
            self.play(Create(ring), FadeIn(olab), run_time=0.7)
            self.hold(vo, 0.3)
            self.play(FadeIn(note), run_time=0.6)

        rows = VGroup(
            VGroup(T("mean", 24, color=MEAN), M("33.7", 32, color=MEAN)),
            VGroup(T("median", 24, color=MED), M("30", 32, color=MED)),
            VGroup(T("IQR", 24, color=MED), M("18", 32, color=MED)),
        )
        for r in rows:
            r.arrange(RIGHT, buff=0.3)
        rows.arrange(DOWN, aligned_edge=LEFT, buff=0.22)
        panel = card(rows, pad=0.22).move_to(P(3.6, 2.2))
        new_mean = M("38.7", 32, color=MEAN).move_to(rows[0][1], aligned_edge=LEFT)
        checks = VGroup(*[T("unchanged", 22, color=OK).move_to(rows[i]).set_x(0).next_to(panel, RIGHT, buff=0.25, coor_mask=[1, 0, 0]) for i in (1, 2)])
        jump = T("+5", 22, color=WARN).move_to(rows[0]).next_to(panel, RIGHT, buff=0.25, coor_mask=[1, 0, 0])
        verdict = VGroup(
            T("Resistant: median, IQR (positions)", 24, color=OK),
            T("Not resistant: mean, SD, range (sizes)", 24, color=WARN),
        ).arrange(DOWN, buff=0.15).move_to(P(0, -3.35))

        with self.voiceover("Now drag seventy five all the way out to one hundred and fifty. The mean jumps "
                            "from about thirty three point seven to thirty eight point seven. The median stays at "
                            "thirty. The I Q R stays at eighteen. The median and I Q R are resistant, because they "
                            "use only positions. The mean, standard deviation and range use the sizes of the "
                            "values, so one wild value can wreck them.") as vo:
            self.play(FadeOut(calc), FadeOut(note), FadeOut(olab), FadeIn(panel), run_time=0.7)
            self.play(out.animate.move_to(nl.p(150, by - nl.y)), ring.animate.move_to(nl.p(150, by - nl.y)),
                      dots[-1].animate.move_to(nl.p(150, 0.16)), run_time=1.6)
            self.play(Transform(rows[0][1], new_mean), FadeIn(jump), run_time=0.7)
            self.hold(vo, 0.1)
            self.play(FadeIn(checks), run_time=0.7)
            self.hold(vo, 0.1)
            self.play(FadeIn(verdict), run_time=0.7)

    # ------------------------------------------------------------ scene 4: z-scores
    def s4(self):
        hd = header("3.4 · Relative Standing")

        def zx(z):
            return -2.2 + z * 1.75

        def row(y, name, mean, sd, x, col):
            line = Line(P(zx(-2), y), P(zx(3.4), y), color=INK, stroke_width=2)
            g = VGroup(line)
            raws, zs = VGroup(), VGroup()
            for z in range(-2, 4):
                t = Line(P(zx(z), y + 0.1), P(zx(z), y - 0.1), color=INK, stroke_width=2)
                g.add(t)
                raws.add(M(str(mean + z * sd), 26, color=INK).move_to(P(zx(z), y + 0.38)))
                zs.add(M(str(z), 26, color=PURPLE).move_to(P(zx(z), y - 0.38)))
            mm = Triangle(color=MEAN).set_fill(MEAN, 1).scale(0.12).move_to(P(zx(0), y - 0.75))
            nm = T(name, 26, color=col, weight="BOLD").move_to(P(-5.0, y + 1.0)).align_to(P(-6.4, 0), LEFT)
            info = T(f"class mean {mean}, SD {sd}", 22, color=MUTED).next_to(nm, RIGHT, buff=0.4)
            zc = (x - mean) / sd
            dot = Dot(P(zx(zc), y), radius=0.13, color=col)
            dlab = M(str(x), 28, color=col).next_to(dot, UP, buff=0.45)
            if (x - mean) % sd == 0:  # value already printed as a tick label
                dlab = VGroup()
            return VGroup(g, raws), zs, VGroup(nm, info), mm, VGroup(dot, dlab)

        r_line, r_z, r_nm, r_mm, r_dot = row(1.3, "Riya · Maths", 70, 10, 92, DATA)
        a_line, a_z, a_nm, a_mm, a_dot = row(-1.4, "Arjun · Physics", 60, 8, 84, MED)
        # Riya's raw label 92 would collide with the tick label 90; keep dot label above the raw row.

        with self.voiceover("One prize, two toppers. Riya scored ninety two in Maths. Arjun scored eighty four in "
                            "Physics. Higher mark wins? Not so fast. The Maths class averaged seventy, with a "
                            "standard deviation of ten. The Physics class averaged sixty, with a standard "
                            "deviation of eight.") as vo:
            self.play(FadeIn(hd), FadeIn(r_nm[0]), FadeIn(a_nm[0]), run_time=0.7)
            self.play(FadeIn(r_line), FadeIn(a_line), run_time=0.8)
            self.play(FadeIn(r_dot, shift=0.2 * DOWN), FadeIn(a_dot, shift=0.2 * DOWN), run_time=0.7)
            self.hold(vo, 0.25)
            self.play(FadeIn(r_nm[1]), FadeIn(r_mm), run_time=0.6)
            self.hold(vo, 0.1)
            self.play(FadeIn(a_nm[1]), FadeIn(a_mm), run_time=0.6)

        formula = card(M(r"z = \frac{x - \bar{x}}{\sigma}", 40, color=PURPLE), pad=0.15, color=PURPLE)
        formula.move_to(P(4.9, 3.2))
        rc = card(M(r"z = \frac{92 - 70}{10} = 2.2", 34, color=DATA), pad=0.15, color=DATA).move_to(P(2.0, 0.05))
        ac = card(M(r"z = \frac{84 - 60}{8} = 3", 34, color=MED), pad=0.15, color=OK).move_to(P(2.0, -2.7))
        best = T("further out", 22, color=OK, weight="BOLD").next_to(ac, RIGHT, buff=0.25)
        myth = card(T("\"higher raw score wins\"", 22, color=WARN), color=WARN).move_to(P(-3.6, -2.95))

        with self.voiceover("Measure each mark from its own class mean, in units of its own standard deviation. "
                            "That is the z score: x minus x bar, over sigma. Riya is twenty two above, over ten, "
                            "so z equals two point two. Arjun is twenty four above, over eight, so z equals "
                            "three. Arjun stands further out from his class. The higher raw score is not the "
                            "better relative performance.") as vo:
            self.play(FadeIn(formula), run_time=0.6)
            self.play(FadeIn(r_z), FadeIn(a_z), run_time=0.8)
            self.hold(vo, 0.15)
            self.play(FadeIn(rc), run_time=0.6)
            self.hold(vo, 0.08)
            self.play(FadeIn(ac), run_time=0.6)
            self.play(FadeIn(best), Indicate(a_dot[0], color=OK), run_time=0.8)
            self.hold(vo, 0.05)
            self.play(FadeIn(myth), run_time=0.5)
            self.play(Create(cross_out(myth)), run_time=0.5)

        pr = VGroup(
            T("Percentile rank: what share of the group is below you?", 28, color=INK),
            M(r"\text{PR} = \frac{\text{number below}}{n} \times 100", 40, color=PURPLE),
            M(r"\text{Meera: } \frac{30}{40} \times 100 = 75", 40, color=OK),
        ).arrange(DOWN, buff=0.4).move_to(P(0, -0.2))

        with self.voiceover("A percentile rank asks a different question: what share of the group is below you? "
                            "If thirty of forty students scored below Meera, her percentile rank is seventy "
                            "five.") as vo:
            keep = [hd]
            self.play(*[FadeOut(m) for m in self.mobjects if m not in keep], run_time=0.6)
            self.play(FadeIn(pr[0]), run_time=0.6)
            self.play(FadeIn(pr[1]), run_time=0.6)
            self.hold(vo, 0.2)
            self.play(FadeIn(pr[2]), run_time=0.6)

    # ------------------------------------------------------------ scene 5: comparing
    def s5(self):
        hd = header("3.5 · Comparing Distributions")
        nl = NumLine(0, 50, -5.0, 5.8, -2.4)
        axis = nl.draw(list(range(0, 51, 10)))
        xl = T("marks", 22, color=MUTED).move_to(P(0.4, -3.4))
        yA, yB = 1.0, -0.9
        mnA, q1A, mdA, q3A, mxA = five(SEC_A)
        _, q1B, mdB, q3B, mxB = five(SEC_B)
        bA = boxplot(nl, yA, q1A, mdA, q3A, mnA, mxA, color=MED)
        bB = boxplot(nl, yB, q1B, mdB, q3B, 21, mxB, color=DATA)
        la = T("Section A", 24, color=MED, weight="BOLD").move_to(P(-6.2, yA)).align_to(P(-6.8, 0), LEFT)
        lb = T("Section B", 24, color=DATA, weight="BOLD").move_to(P(-6.2, yB)).align_to(P(-6.8, 0), LEFT)
        outs = VGroup()
        for v in (4, 7):
            d = Dot(nl.p(v, yB - nl.y), radius=0.09, color=WARN)
            outs.add(VGroup(d, Circle(radius=0.2, color=WARN, stroke_width=3).move_to(d)))
        olab = T("4 and 7: below B's fence at 15", 20, color=WARN).next_to(outs, DOWN, buff=0.2)
        olab.align_to(outs, LEFT)
        mline = DashedLine(nl.p(32, 0), nl.p(32, 4.9), color=MEAN, dash_length=0.12, stroke_width=3)
        mlab = T("both means = 32", 22, color=MEAN).next_to(mline, UP, buff=0.08)
        mdl = VGroup(M(r"32", 26, color=MED).next_to(bA[1], UP, buff=0.12).shift(0.25 * LEFT),
                     M(r"36", 26, color=DATA).next_to(bB[1], UP, buff=0.12))

        with self.voiceover("Two sections sat the same test, and both averaged thirty two. Same class, says the "
                            "teacher. Draw them side by side. Section B's median is thirty six, four marks above "
                            "A's. Half of B scored thirty six or more. B's mean was dragged down by two very low "
                            "marks, four and seven, and both are beyond B's lower fence.") as vo:
            self.play(FadeIn(hd), FadeIn(axis), FadeIn(xl), run_time=0.7)
            self.play(Create(mline), FadeIn(mlab), run_time=0.8)
            self.hold(vo, 0.1)
            self.play(FadeIn(la), Create(bA), run_time=1.0)
            self.play(FadeIn(lb), Create(bB), run_time=1.0)
            self.play(FadeIn(mdl), run_time=0.6)
            self.hold(vo, 0.2)
            self.play(FadeIn(outs), FadeIn(olab), run_time=0.8)

        plot = VGroup(axis, xl, bA, bB, la, lb, outs, olab, mline, mlab, mdl)
        items = [
            ("Centre", "B is typically higher: median 36 vs 32", MED),
            ("Spread", "middle halves similar: IQR 10 vs 9", PURPLE),
            ("Shape", "B has a long left tail", DATA),
            ("Unusual values", "two outliers in B: investigate", WARN),
        ]
        cards = VGroup()
        for h, s, col in items:
            cards.add(card(VGroup(T(h, 24, color=col, weight="BOLD"), T(s, 20, color=INK)).arrange(DOWN, buff=0.12),
                           pad=0.18, color=col))
        for c in cards:
            c[0].stretch_to_fit_width(6.2)
        cards.arrange_in_grid(rows=2, cols=2, buff=(0.3, 0.25)).move_to(P(0, -1.8))
        myth = card(T("\"compare by means alone\"", 22, color=WARN), color=WARN).move_to(P(0, -3.45))

        with self.voiceover("So compare in four parts. Centre: B is typically higher. Spread: the middle halves "
                            "are similar. Shape: B has a long left tail. Unusual values: two outliers in B, worth "
                            "investigating. Never compare by means alone.") as vo:
            self.play(plot.animate.scale(0.65).move_to(P(0.6, 1.55)), run_time=1.0)
            per = max(0.2, (vo.duration - 3.5) / 5)
            for c in cards:
                self.play(FadeIn(c, shift=0.15 * UP), run_time=0.5)
                self.wait(per)
            self.play(FadeIn(myth), run_time=0.4)
            self.play(Create(cross_out(myth)), run_time=0.4)

        cv = VGroup(
            M(r"\text{CV} = \frac{\sigma}{\bar{x}} \times 100\%", 44, color=PURPLE),
            M(r"\text{Batter P: } \frac{15}{50} \times 100 = 30\%", 38, color=OK),
            M(r"\text{Batter Q: } \frac{12}{30} \times 100 = 40\%", 38, color=INK),
        ).arrange(DOWN, buff=0.45).move_to(P(-0.5, -0.1))
        tick = T("more consistent", 24, color=OK, weight="BOLD").next_to(cv[1], RIGHT, buff=0.4)

        with self.voiceover("And when the means differ, compare consistency with the coefficient of variation: "
                            "sigma over the mean. Batter P averages fifty, with a standard deviation of fifteen: "
                            "thirty percent. Batter Q averages thirty, with twelve: forty percent. P is the more "
                            "consistent.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.6)
            self.play(FadeIn(cv[0]), run_time=0.7)
            self.hold(vo, 0.2)
            self.play(FadeIn(cv[1]), run_time=0.6)
            self.hold(vo, 0.15)
            self.play(FadeIn(cv[2]), run_time=0.6)
            self.play(FadeIn(tick), run_time=0.6)

    # ------------------------------------------------------------ scene 6: recap
    def s6(self):
        title = T("Chapter 3 in six lines", 40, weight="BOLD", color=PRIMARY).move_to(P(0, 3.1))
        lines = [
            ("The tail names the skew, and it drags the mean.", DATA),
            ("A boxplot cuts the data into four quarters, whatever their lengths.", MED),
            ("Fences at 1.5 × IQR beyond the box flag values to investigate.", WARN),
            ("Median and IQR resist outliers; mean and SD do not.", OK),
            ("A z-score places a value inside its own group: z = (x − x̄) / σ.", PURPLE),
            ("Compare centre, spread, shape and unusual values, never means alone.", MEAN),
        ]
        rows = VGroup()
        for i, (s, c) in enumerate(lines, start=1):
            num = Circle(radius=0.24, color=c, stroke_width=2).set_fill(c, opacity=1)
            num = VGroup(num, T(str(i), 22, color=WHITE, weight="BOLD").move_to(num))
            rows.add(VGroup(num, T(s, 24)).arrange(RIGHT, buff=0.3))
        rows.arrange(DOWN, aligned_edge=LEFT, buff=0.36).move_to(P(0, -0.1))
        if rows.width > config.frame_width - 0.8:
            rows.scale_to_fit_width(config.frame_width - 0.8)
        foot = T("Next: Chapter 4 · Correlation and Regression", 26, color=MUTED).move_to(P(0, -3.4))
        with self.voiceover("Chapter three in one breath. The tail names the skew, and it drags the mean. A "
                            "boxplot splits the data into four quarters, whatever their lengths. The fences, one "
                            "and a half I Q Rs beyond the box, flag values to investigate. The median and I Q R "
                            "resist outliers; the mean and standard deviation do not. A z score places a value "
                            "inside its own group. And to compare groups, talk about centre, spread, shape and "
                            "unusual values. Next, two variables at once.") as vo:
            self.play(FadeIn(title), run_time=0.6)
            per = max(0.3, (vo.duration - 2.0) / 7)
            for r in rows:
                self.play(FadeIn(r, shift=0.2 * RIGHT), run_time=0.6)
                self.wait(max(0.1, per - 0.6))
            self.play(FadeIn(foot), run_time=0.6)
