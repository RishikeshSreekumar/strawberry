import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

# Chapter colour roles (light background).
AV = SECONDARY  # batsman A / first data set / data dots = teal
BV = PRIMARY  # batsman B / warnings = strawberry red
HL = ManimColor("#D19A00")  # centres: mean and median lines (gold)
SP = PURPLE  # spread measures and definitions
WARN = PRIMARY
OK = GREEN

BATSMAN_A = [35, 38, 40, 42, 45, 36, 41, 39, 44, 40]
BATSMAN_B = [0, 5, 12, 80, 95, 2, 110, 60, 8, 28]


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


def nline(lo, hi, step, length, nums=True, size=24):
    nl = NumberLine(x_range=[lo, hi, step], length=length, color=INK, stroke_width=2,
                    include_tip=False, tick_size=0.07)
    if nums:
        nl.add(VGroup(*[M(str(int(v)), size, color=MUTED).next_to(nl.n2p(v), DOWN, buff=0.15)
                        for v in np.arange(lo, hi + 0.001, step)]))
    return nl


def stack_dots(nl, values, color=AV, r=0.1, gap=0.24, base=0.2, bin=None):
    """Dots above a number line, stacking repeated values (or values in the same bin)."""
    seen = {}
    g = VGroup()
    for v in values:
        key = v if bin is None else int(v // bin)
        x = v if bin is None else key * bin + bin / 2
        k = seen.get(key, 0)
        seen[key] = k + 1
        g.add(Dot(nl.n2p(x) + UP * (base + k * gap), radius=r, color=color))
    return g


def vmark(nl, v, h, color=HL, label=None, size=30):
    ln = DashedLine(nl.n2p(v) + DOWN * 0.1, nl.n2p(v) + UP * h, color=color, stroke_width=3)
    if label is None:
        return ln
    return VGroup(ln, M(label, size, color=color).next_to(ln, UP, buff=0.08))


class StCh2Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Statistics",
            "Chapter 2 · Measures of Spread",
            "Chapter two. Measures of spread.",
        )
        for part in (self.s0, self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ scene 0: hook
    def s0(self):
        nla = nline(0, 120, 20, 11).move_to(P(0, 1.0))
        nlb = nline(0, 120, 20, 11).move_to(P(0, -2.2))
        la = T("Batsman A", 26, color=AV, weight="BOLD").next_to(nla, UP, buff=1.1).align_to(nla, LEFT)
        lb = T("Batsman B", 26, color=BV, weight="BOLD").next_to(nlb, UP, buff=1.1).align_to(nlb, LEFT)
        da = stack_dots(nla, BATSMAN_A, AV, r=0.08, gap=0.19, bin=2)
        db = stack_dots(nlb, BATSMAN_B, BV, r=0.08, gap=0.19, bin=2)
        ma = vmark(nla, 40, 1.1, label=r"\bar x = 40", size=34)
        mb = vmark(nlb, 40, 1.1, label=r"\bar x = 40", size=34)
        same = card(T("Same centre. Completely different story.", 28, weight="BOLD"), color=HL).move_to(P(0, 3.3))
        with self.voiceover("A selector has one batting slot and two batsmen. Both have played ten innings, and "
                            "both average exactly forty runs. On paper, they are identical. But put their "
                            "scores on a number line. Batsman A scores between thirty five and forty five "
                            "almost every time. Batsman B is either out cheaply or scores a big hundred. Same "
                            "centre, completely different story. A centre alone is not enough. Every summary "
                            "needs a second number: how spread out the values are.") as vo:
            self.play(Create(nla), Create(nlb), FadeIn(la), FadeIn(lb), run_time=1.0)
            self.play(FadeIn(ma), FadeIn(mb), run_time=0.6)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(LaggedStart(*[FadeIn(d, scale=0.3) for d in da], lag_ratio=0.1), run_time=1.4)
            self.wait(max(0.1, vo.duration * 0.05))
            self.play(LaggedStart(*[FadeIn(d, scale=0.3) for d in db], lag_ratio=0.1), run_time=1.6)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(FadeIn(same, shift=0.2 * DOWN), run_time=0.8)

    # ------------------------------------------------------------ scene 1: range (2.1)
    def s1(self):
        hd = header("2.1 · Same centre, different story")
        nla = nline(0, 120, 20, 11).move_to(P(0, 1.0))
        nlb = nline(0, 120, 20, 11).move_to(P(0, -1.9))
        da = stack_dots(nla, BATSMAN_A, AV, r=0.08, gap=0.19, bin=2)
        db = stack_dots(nlb, BATSMAN_B, BV, r=0.08, gap=0.19, bin=2)
        la = T("A", 28, color=AV, weight="BOLD").next_to(nla, LEFT, buff=0.3)
        lb = T("B", 28, color=BV, weight="BOLD").next_to(nlb, LEFT, buff=0.3)
        defn = card(M(r"\text{Range} = x_{\max} - x_{\min}", 40), color=SP).move_to(P(3.6, 2.6))
        ba = BraceBetweenPoints(nla.n2p(35), nla.n2p(45), UP, color=AV).shift(UP * 0.75)
        ta = M(r"45 - 35 = 10", 30, color=AV).next_to(ba, UP, buff=0.1)
        bb = BraceBetweenPoints(nlb.n2p(0), nlb.n2p(110), UP, color=BV).shift(UP * 0.55)
        tb = M(r"110 - 0 = 110", 30, color=BV).next_to(bb, UP, buff=0.1)
        with self.voiceover("The crudest measure of spread is the range: the largest value minus the smallest. "
                            "For A it is forty five minus thirty five, ten runs. For B it is one hundred and ten "
                            "minus zero, one hundred and ten runs.") as vo:
            self.play(FadeIn(hd), FadeIn(VGroup(nla, nlb, da, db, la, lb)), run_time=0.8)
            self.play(FadeIn(defn, shift=0.2 * DOWN), run_time=0.7)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(GrowFromCenter(ba), Write(ta), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(GrowFromCenter(bb), Write(tb), run_time=1.0)

        hts = [150, 152, 153, 155, 156, 158]
        nl = nline(145, 195, 5, 11, size=22).move_to(P(0, -0.4))
        cm = T("height (cm)", 22, color=MUTED).next_to(nl, DOWN, buff=0.55)
        dots = stack_dots(nl, hts, AV, r=0.11)
        br = BraceBetweenPoints(nl.n2p(150), nl.n2p(158), UP, color=SP).shift(UP * 0.45)
        rt = M(r"\text{range} = 8", 32, color=SP).next_to(br, UP, buff=0.1)
        tall = Dot(nl.n2p(190) + UP * 0.2, radius=0.11, color=BV)
        br2 = BraceBetweenPoints(nl.n2p(150), nl.n2p(190), UP, color=WARN).shift(UP * 1.35)
        rt2 = M(r"\text{range} = 40", 32, color=WARN).next_to(br2, UP, buff=0.1)
        note = card(T("One extreme value decides the range.", 26, color=WARN), color=WARN).move_to(P(0, -2.7))
        with self.voiceover("But the range listens to only two values. Six students have heights from one fifty "
                            "to one fifty eight centimetres, a range of eight. Add one student who is one ninety "
                            "tall, and the range jumps to forty, though six of the seven heights never moved. "
                            "One extreme value decides it.") as vo:
            self.play(FadeOut(VGroup(nla, nlb, da, db, la, lb, defn, ba, ta, bb, tb)), run_time=0.5)
            self.play(Create(nl), FadeIn(cm), LaggedStart(*[FadeIn(d, scale=0.3) for d in dots], lag_ratio=0.1),
                      run_time=1.2)
            self.play(GrowFromCenter(br), Write(rt), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(FadeIn(tall, shift=DOWN * 0.5), run_time=0.6)
            self.play(GrowFromCenter(br2), Write(rt2), run_time=0.9)
            self.wait(max(0.1, vo.duration * 0.08))
            self.play(FadeIn(note, shift=0.2 * UP), run_time=0.6)

    # ------------------------------------------------------------ scene 2: quartiles and IQR (2.2)
    def s2(self):
        hd = header("2.2 · Quartiles, percentiles and IQR")
        vals = [4, 6, 9, 11, 12, 14, 17, 19, 22, 30]
        boxes = VGroup()
        for v in vals:
            sq = RoundedRectangle(width=0.95, height=0.8, corner_radius=0.08, color=INK, stroke_width=2)
            sq.set_fill(WHITE, opacity=1)
            boxes.add(VGroup(sq, M(str(v), 36).move_to(sq)))
        boxes.arrange(RIGHT, buff=0.18).move_to(P(0, 1.6))
        lower, upper = boxes[:5], boxes[5:]
        mid = (boxes[4].get_right() + boxes[5].get_left()) / 2
        q2l = DashedLine(mid + UP * 0.65, mid + DOWN * 0.65, color=HL, stroke_width=4)
        q2t = M(r"Q_2 = \tfrac{12 + 14}{2} = 13", 30, color=HL).next_to(q2l, UP, buff=0.1)
        q1a = Arrow(boxes[2].get_bottom() + DOWN * 0.9, boxes[2].get_bottom(), buff=0.05, color=AV, stroke_width=4)
        q1t = M(r"Q_1 = 9", 34, color=AV).next_to(q1a, DOWN, buff=0.1)
        q3a = Arrow(boxes[7].get_bottom() + DOWN * 0.9, boxes[7].get_bottom(), buff=0.05, color=AV, stroke_width=4)
        q3t = M(r"Q_3 = 19", 34, color=AV).next_to(q3a, DOWN, buff=0.1)
        iqr = card(M(r"\text{IQR} = Q_3 - Q_1 = 19 - 9 = 10", 38), color=SP).move_to(P(0, -1.9))
        sub = T("the width of the middle half of the data", 24, color=MUTED).next_to(iqr, DOWN, buff=0.25)
        with self.voiceover("A simple repair: ignore the extremes. Put ten values in order and cut them into "
                            "quarters. The median, Q two, is thirteen. The median of the lower half is Q one, "
                            "nine. The median of the upper half is Q three, nineteen. The interquartile range, "
                            "Q three minus Q one, is ten: the width of the middle half of the data.") as vo:
            self.play(FadeIn(hd), LaggedStart(*[FadeIn(b, shift=0.2 * UP) for b in boxes], lag_ratio=0.08),
                      run_time=1.3)
            self.wait(max(0.1, vo.duration * 0.08))
            self.play(Create(q2l), Write(q2t), run_time=0.9)
            self.play(*[b[0].animate.set_fill(AV, opacity=0.15) for b in lower], run_time=0.5)
            self.play(Indicate(boxes[2], color=AV), GrowArrow(q1a), Write(q1t), run_time=0.9)
            self.play(*[b[0].animate.set_fill(AV, opacity=0.15) for b in upper], run_time=0.5)
            self.play(Indicate(boxes[7], color=AV), GrowArrow(q3a), Write(q3t), run_time=0.9)
            self.wait(max(0.1, vo.duration * 0.05))
            self.play(FadeIn(iqr, shift=0.2 * UP), FadeIn(sub), run_time=0.8)

        big = VGroup(boxes[9][0].copy().set_fill(BV, opacity=0.2).set_stroke(BV),
                     M("300", 32, color=BV).move_to(boxes[9]))
        rng = VGroup(M(r"\text{range}:\ 26", 34, color=WARN), M(r"\to\ 296", 34, color=WARN)).arrange(RIGHT)
        rng.move_to(P(-3.6, -0.75))
        keep = M(r"\text{IQR}:\ 10 \to 10", 34, color=OK).move_to(P(3.6, -0.75))
        myth = card(T("\"Q1 is a quarter of the maximum\"", 24, color=WARN), color=WARN).move_to(P(-3.3, -3.2))
        fact = card(T("Q1 is about position, not value.", 24, color=OK), color=OK).move_to(P(3.3, -3.2))
        with self.voiceover("Now change the largest value from thirty to three hundred. The range explodes from "
                            "twenty six to two hundred and ninety six. The I Q R does not move. It is still ten. "
                            "And note: Q one is about position in the ordered list. It is not a quarter of the "
                            "maximum.") as vo:
            self.play(FadeOut(sub), iqr.animate.scale(0.8).move_to(P(0, -1.8)), run_time=0.5)
            self.play(Transform(boxes[9], big), run_time=0.8)
            self.play(FadeIn(rng[0]), run_time=0.4)
            self.play(FadeIn(rng[1], shift=0.2 * RIGHT), run_time=0.6)
            self.wait(max(0.1, vo.duration * 0.08))
            self.play(FadeIn(keep), Indicate(iqr, color=OK), run_time=0.9)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(FadeIn(myth), run_time=0.5)
            self.play(Create(cross_out(myth)), FadeIn(fact), run_time=0.7)

    # ------------------------------------------------------------ scene 3: mean deviation (2.3)
    def s3(self):
        hd = header("2.3 · Mean deviation")
        data = [2, 3, 4, 6, 15]
        nl = nline(0, 16, 2, 12).move_to(P(0, -3.0))
        dots = VGroup(*[Dot(nl.n2p(v), radius=0.11, color=AV) for v in data])
        levels = [0.4, 0.8, 1.2, 1.6, 2.0]

        def segs(c, signed):
            g = VGroup()
            for v, y in zip(data, levels):
                a, b = nl.n2p(c) + UP * y, nl.n2p(v) + UP * y
                d = v - c
                col = OK if d > 0 else (BV if d < 0 else MUTED)
                if d == 0:
                    ln = Dot(a, radius=0.06, color=MUTED)
                elif signed:
                    ln = Arrow(a, b, buff=0, color=col, stroke_width=4, max_tip_length_to_length_ratio=0.25,
                               max_stroke_width_to_length_ratio=10)
                else:
                    ln = Line(a, b, color=SP, stroke_width=5)
                txt = (f"{d:+d}" if d else "0") if signed else str(abs(d))
                lab = M(txt, 26, color=col if signed else SP).next_to(ln, RIGHT if d >= 0 else LEFT, buff=0.1)
                g.add(VGroup(ln, lab))
            return g

        cen = vmark(nl, 6, 2.3, label=r"\bar x = 6", size=32)
        s_signed = segs(6, True)
        zero = M(r"\sum (x_i - \bar x) = -4 - 3 - 2 + 0 + 9 = 0", 32).move_to(P(0.8, 2.6))
        zwhy = T("signed deviations always cancel", 22, color=MUTED).next_to(zero, DOWN, buff=0.15)
        s_abs = segs(6, False)
        md = M(r"\text{MD}(\bar x) = \frac{4+3+2+0+9}{5} = \frac{18}{5} = 3.6", 32, color=SP).move_to(P(0.8, 1.2))
        with self.voiceover("Better still, use every value. Measure how far each one sits from the mean, and "
                            "average. But signed deviations always sum to zero: the ones above the mean cancel "
                            "the ones below. So drop the signs and take absolute values. For two, three, four, "
                            "six and fifteen, the mean is six, and the distances add to eighteen. The mean "
                            "deviation is eighteen over five, three point six.") as vo:
            self.play(FadeIn(hd), Create(nl), FadeIn(dots), run_time=0.9)
            self.play(FadeIn(cen), run_time=0.5)
            self.play(LaggedStart(*[GrowFromPoint(s, nl.n2p(6)) for s in s_signed], lag_ratio=0.15), run_time=1.5)
            self.play(Write(zero), FadeIn(zwhy), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(ReplacementTransform(s_signed, s_abs), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.06))
            self.play(Write(md), run_time=1.0)

        cen2 = vmark(nl, 4, 2.3, label=r"\text{median} = 4", size=32)
        s_med = segs(4, False)
        md2 = M(r"\text{MD}(\text{median}) = \frac{2+1+0+2+11}{5} = \frac{16}{5} = 3.2", 32, color=HL)
        md2.move_to(P(0.8, 1.6))
        win = card(T("Sum of |x − a| is smallest at a = median.", 24, color=OK), color=OK).move_to(P(0.8, 0.5))
        with self.voiceover("Measure from the median, four, instead, and the total drops to sixteen, a mean "
                            "deviation of three point two. That is no accident. The sum of absolute distances is "
                            "smallest about the median, not the mean.") as vo:
            self.play(FadeOut(zero), FadeOut(zwhy), md.animate.move_to(P(0.8, 2.7)), run_time=0.6)
            self.play(ReplacementTransform(cen, cen2), ReplacementTransform(s_abs, s_med), run_time=1.4)
            self.play(Write(md2), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(FadeIn(win, shift=0.2 * UP), run_time=0.7)

    # ------------------------------------------------------------ scene 4: variance and SD (2.4)
    def s4(self):
        hd = header("2.4 · Variance and standard deviation")
        data = [2, 4, 4, 4, 5, 5, 7, 9]
        nl = nline(0, 10, 1, 6.4, size=22).move_to(P(-3.3, 1.2))
        dots = stack_dots(nl, data, AV, r=0.09, gap=0.22)
        cen = vmark(nl, 5, 1.2, label=r"\bar x = 5", size=30)
        devs = [x - 5 for x in data]
        s = 0.4
        sqs = VGroup()
        x = 0.0
        for d in devs:
            side = abs(d) * s
            w = max(side, 0.3)
            cx = x + w / 2
            if d:
                sq = Square(side_length=side, color=SP, stroke_width=2).set_fill(SP, opacity=0.25)
                sq.move_to(P(cx, -1.9 + side / 2))
            else:
                sq = Line(P(cx - 0.12, -1.9), P(cx + 0.12, -1.9), color=MUTED, stroke_width=3)
            lab = M(str(d * d), 24, color=SP if d else MUTED).move_to(P(cx, -2.3))
            sqs.add(VGroup(sq, lab))
            x += w + 0.25
        sqs.shift(RIGHT * (-3.3 - sqs.get_x()))
        slab = T("squares of the deviations", 22, color=MUTED).move_to(P(-3.3, -2.9))
        tot = M(r"9+1+1+1+0+0+4+16 = 32", 32).move_to(P(3.4, 1.9))
        var = M(r"\sigma^2 = \frac{32}{8} = 4", 42, color=SP).move_to(P(3.4, 0.7))
        vdef = M(r"\sigma^2 = \frac{1}{n}\sum (x_i - \bar x)^2", 36).move_to(P(3.4, -0.6))
        with self.voiceover("There is another way to kill a sign: square it. Take two, four, four, four, five, "
                            "five, seven and nine. The mean is five. Draw each deviation as a square. The far "
                            "values get big squares: the nine, four away, gives an area of sixteen. The areas "
                            "add to thirty two. Their average, thirty two over eight, is four. That is the "
                            "variance, sigma squared.") as vo:
            self.play(FadeIn(hd), Create(nl), FadeIn(dots), run_time=0.9)
            self.play(FadeIn(cen), run_time=0.5)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(LaggedStart(*[FadeIn(g, scale=0.5) for g in sqs], lag_ratio=0.12), FadeIn(slab), run_time=1.8)
            self.play(Indicate(sqs[7], color=BV), Indicate(dots[-1], color=BV), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.05))
            self.play(Write(tot), run_time=0.9)
            self.play(Write(var), run_time=0.8)
            self.play(FadeIn(vdef), run_time=0.6)

        sd = card(M(r"\sigma = \sqrt{4} = 2", 40, color=SP), color=SP).move_to(P(3.4, 1.8))
        unit = T("variance: units squared.  SD: the data's units.", 22, color=MUTED).next_to(sd, DOWN, buff=0.25)
        short = M(r"\sigma^2 = \frac{\sum x_i^2}{n} - \bar x^2", 40, color=HL).move_to(P(3.4, -0.2))
        chk = M(r"\frac{232}{8} - 5^2 = 29 - 25 = 4", 36).move_to(P(3.4, -1.6))
        with self.voiceover("Variance is in squared units, so take the square root to get back to the data's "
                            "units. The standard deviation, sigma, is two. And a shortcut, derived by expanding "
                            "the square: the variance is the mean of the squares minus the square of the mean. "
                            "Two hundred thirty two over eight is twenty nine. Minus twenty five, four "
                            "again.") as vo:
            self.play(FadeOut(VGroup(tot, var, vdef)), run_time=0.4)
            self.play(FadeIn(sd, shift=0.2 * UP), FadeIn(unit), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(Write(short), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(Write(chk), run_time=1.0)

        myth = card(T("\"SD is the average distance from the mean\"", 24, color=WARN), color=WARN).move_to(P(0, 2.4))
        cmp = VGroup(card(VGroup(T("mean deviation", 24, color=MUTED), M(r"1.5", 48, color=HL)).arrange(DOWN, buff=0.2),
                          color=HL),
                     card(VGroup(T("standard deviation", 24, color=MUTED), M(r"\sigma = 2", 48, color=SP)
                                 ).arrange(DOWN, buff=0.2), color=SP)).arrange(RIGHT, buff=1.2).move_to(P(0, 0.2))
        why = T("Squaring gives far values extra weight, so SD ≥ MD.", 26, color=OK).move_to(P(0, -1.9))
        with self.voiceover("Careful: the standard deviation is not the average distance from the mean. On this "
                            "data, the mean deviation is one point five, but sigma is two. Squaring gives far "
                            "values extra weight, so sigma is always at least as large.") as vo:
            self.play(FadeOut(VGroup(nl, dots, cen, sqs, slab, sd, unit, short, chk)), run_time=0.5)
            self.play(FadeIn(myth), run_time=0.6)
            self.play(Create(cross_out(myth)), run_time=0.5)
            self.play(FadeIn(cmp, shift=0.2 * UP), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(FadeIn(why), run_time=0.7)

    # ------------------------------------------------------------ scene 5: grouped data (2.5)
    def s5(self):
        hd = header("2.5 · SD for frequency and grouped data")
        rows = [
            ["\\text{class}", "x", "f", "u", "fu", "fu^2"],
            ["30\\text{--}40", "35", "3", "-3", "-9", "27"],
            ["40\\text{--}50", "45", "7", "-2", "-14", "28"],
            ["50\\text{--}60", "55", "12", "-1", "-12", "12"],
            ["60\\text{--}70", "65", "15", "0", "0", "0"],
            ["70\\text{--}80", "75", "8", "1", "8", "8"],
            ["80\\text{--}90", "85", "3", "2", "6", "12"],
            ["90\\text{--}100", "95", "2", "3", "6", "18"],
            ["\\text{total}", "", "50", "", "-15", "105"],
        ]
        cells = VGroup()
        for i, r in enumerate(rows):
            for j, c in enumerate(r):
                col = MUTED if i == 0 else (HL if i == len(rows) - 1 else INK)
                cells.add(M(c if c else r"\,", 31, color=col))
        cells.arrange_in_grid(rows=len(rows), cols=6, buff=(0.3, 0.14), col_alignments="rcrrrr")
        cells.move_to(P(-3.3, -0.35))
        x0, x1 = cells.get_left()[0] - 0.1, cells.get_right()[0] + 0.1
        y1 = (cells[0].get_bottom()[1] + cells[6].get_top()[1]) / 2
        y2 = (cells[-12].get_bottom()[1] + cells[-6].get_top()[1]) / 2
        hl = Line(P(x0, y1), P(x1, y1), color=MUTED, stroke_width=1.5)
        tl = Line(P(x0, y2), P(x1, y2), color=MUTED, stroke_width=1.5)
        table = VGroup(cells, hl, tl)
        code = M(r"u = \frac{x - 65}{10}", 38, color=AV).move_to(P(3.6, 2.2))
        fsig = M(r"\sigma^2 = \frac{\sum f x^2}{N} - \left(\frac{\sum f x}{N}\right)^2", 32).move_to(P(3.6, 0.95))
        vu = M(r"\sigma_u^2 = \frac{105}{50} - \left(\frac{-15}{50}\right)^2", 34).move_to(P(3.6, -0.35))
        vu2 = M(r"= 2.1 - 0.09 = 2.01", 34).next_to(vu, DOWN, buff=0.25).align_to(vu, LEFT).shift(RIGHT * 0.6)
        with self.voiceover("For a frequency table, each value counts f times, so every sum gets a factor of f. "
                            "With class midpoints like thirty five, forty five, up to ninety five, the squares "
                            "get large. So code them. Take u equal to x minus sixty five, over ten. Here the sum "
                            "of f u is minus fifteen, the sum of f u squared is one hundred and five, and N is "
                            "fifty. The coded variance is two point one minus zero point zero nine, which is two "
                            "point zero one.") as vo:
            self.play(FadeIn(hd), FadeIn(fsig), run_time=0.8)
            self.play(FadeIn(table, lag_ratio=0.01), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(Write(code), run_time=0.9)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(Indicate(VGroup(cells[-2], cells[-1], cells[-4]), color=HL), run_time=1.0)
            self.play(Write(vu), run_time=1.0)
            self.play(Write(vu2), run_time=0.8)

        trap = card(T("That is the variance of u, not of the marks!", 24, color=WARN), color=WARN).move_to(P(3.4, 2.2))
        back = M(r"\sigma_x^2 = h^2\,\sigma_u^2 = 100 \times 2.01 = 201", 32, color=SP).move_to(P(3.6, 1.0))
        sdx = card(M(r"\sigma_x = \sqrt{201} \approx 14.2", 40, color=SP), color=SP).move_to(P(3.6, -2.4))
        with self.voiceover("Now the step everyone forgets. That is the variance of u, not of the marks. "
                            "Multiply back by h squared: one hundred times two point zero one is two hundred and "
                            "one. So sigma is the square root of two hundred and one, about fourteen point two "
                            "marks.") as vo:
            self.play(FadeOut(code), FadeOut(fsig), FadeIn(trap), run_time=0.7)
            self.play(Write(back), run_time=1.1)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(FadeIn(sdx, shift=0.2 * UP), run_time=0.8)

    # ------------------------------------------------------------ scene 6: shift, scale, CV (2.6)
    def s6(self):
        hd = header("2.6 · Shift, scale and the coefficient of variation")
        data = [10, 12, 15, 18, 20]
        nl = nline(0, 45, 5, 11.5, size=22).move_to(P(0, -0.9))

        def state(xs, color):
            xs = np.array(xs, dtype=float)
            m, s = xs.mean(), float(np.sqrt(np.mean((xs - xs.mean()) ** 2)))
            dots = VGroup(*[Dot(nl.n2p(x) + UP * 0.2, radius=0.12, color=color) for x in xs])
            ln = DashedLine(nl.n2p(m) + DOWN * 0.1, nl.n2p(m) + UP * 1.6, color=HL, stroke_width=3)
            ml = M(rf"\bar x = {m:g}", 34, color=HL).next_to(ln, UP, buff=0.08)
            br = BraceBetweenPoints(nl.n2p(m - s), nl.n2p(m + s), DOWN, color=SP).shift(DOWN * 0.75)
            bl = M(rf"\pm\sigma,\ \sigma \approx {s:.2f}", 32, color=SP).next_to(br, DOWN, buff=0.08)
            return VGroup(dots, ln, ml, br, bl)

        s0 = state(data, AV)
        s_shift = state([x + 5 for x in data], AV)
        s_scale = state([2 * x for x in data], BV)
        tag = T("original: 10, 12, 15, 18, 20", 26, color=AV).move_to(P(0, 2.2))
        tag2 = T("+5 grace marks: SD unchanged", 26, color=AV).move_to(P(0, 2.2))
        tag3 = T("×2: mean doubles, SD doubles", 26, color=BV).move_to(P(0, 2.2))
        rule = card(M(r"y = a + bx:\quad \bar y = a + b\bar x,\quad \sigma_y = |b|\,\sigma_x", 36), color=SP)
        rule.move_to(P(0, -3.35))
        with self.voiceover("What if a teacher adds five grace marks to everyone? Every value slides right by "
                            "five. The mean slides with them, so every distance from the mean is unchanged. The "
                            "standard deviation stays exactly the same. Now double every value instead. The mean "
                            "doubles, and so does every distance. In general, for y equal to a plus b x, the mean "
                            "becomes a plus b times x bar, and the standard deviation becomes the absolute value "
                            "of b, times sigma.") as vo:
            self.play(FadeIn(hd), Create(nl), FadeIn(tag), run_time=0.9)
            self.play(FadeIn(s0), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.05))
            self.play(Transform(s0, s_shift), FadeTransform(tag, tag2), run_time=1.6)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(Transform(s0, s_scale), FadeTransform(tag2, tag3), run_time=1.8)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(FadeIn(rule, shift=0.2 * UP), run_time=0.8)

        cvdef = card(M(r"\text{CV} = \frac{\sigma}{\bar x} \times 100\%", 44), color=SP).move_to(P(0, 2.3))
        p = card(VGroup(T("Batsman P", 26, color=AV, weight="BOLD"),
                        M(r"\bar x = 40,\ \sigma = 5", 34),
                        M(r"\text{CV} = 12.5\%", 38, color=AV)).arrange(DOWN, buff=0.2), color=AV).move_to(P(-3.0, -0.2))
        q = card(VGroup(T("Batsman Q", 26, color=BV, weight="BOLD"),
                        M(r"\bar x = 50,\ \sigma = 8", 34),
                        M(r"\text{CV} = 16\%", 38, color=BV)).arrange(DOWN, buff=0.2), color=BV).move_to(P(3.0, -0.2))
        verdict = T("Lower CV = more consistent: P, even though Q scores more.", 26, color=OK).move_to(P(0, -2.6))
        with self.voiceover("To compare consistency across different means, divide spread by centre. The "
                            "coefficient of variation is sigma over the mean, times one hundred percent. Batsman "
                            "P averages forty with standard deviation five: twelve point five percent. Batsman Q "
                            "averages fifty with standard deviation eight: sixteen percent. Lower C V means more "
                            "consistent, so P wins, even though Q scores more.") as vo:
            self.play(FadeOut(VGroup(nl, s0, tag3, rule)), run_time=0.5)
            self.play(FadeIn(cvdef, shift=0.2 * DOWN), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(FadeIn(p, shift=0.2 * UP), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.08))
            self.play(FadeIn(q, shift=0.2 * UP), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(FadeIn(verdict), Indicate(p, color=OK), run_time=1.0)

    # ------------------------------------------------------------ scene 7: recap
    def s7(self):
        title = T("Chapter 2 in five lines", 40, weight="BOLD", color=PRIMARY).move_to(P(0, 3.1))
        lines = [
            ("A centre is not enough: spread is the second number.", HL),
            ("Range uses only the extremes. The IQR ignores them.", BV),
            ("Mean deviation averages |x − a|, smallest about the median.", AV),
            ("Variance averages squared distances. SD brings back the units.", SP),
            ("Shift: spread unchanged. Scale by b: SD times |b|. CV compares.", OK),
        ]
        rows = VGroup()
        for i, (s, c) in enumerate(lines, start=1):
            num = Circle(radius=0.24, color=c, stroke_width=2).set_fill(c, opacity=1)
            num = VGroup(num, T(str(i), 22, color=WHITE, weight="BOLD").move_to(num))
            rows.add(VGroup(num, T(s, 24)).arrange(RIGHT, buff=0.3))
        rows.arrange(DOWN, aligned_edge=LEFT, buff=0.38).move_to(P(0, 0.0))
        if rows.width > config.frame_width - 0.8:
            rows.scale_to_fit_width(config.frame_width - 0.8)
        foot = T("Next: Chapter 3 · Shape, Position and Comparison", 26, color=MUTED).move_to(P(0, -3.2))
        with self.voiceover("The whole chapter in five lines. A centre is not enough; spread is the second "
                            "number. The range uses only the extremes; the I Q R ignores them. Mean deviation "
                            "averages distances, and is smallest about the median. Variance averages squared "
                            "distances, and the standard deviation brings back the units. Shifting changes "
                            "nothing about spread; scaling by b multiplies the standard deviation by the absolute "
                            "value of b, and the C V compares spread across different means. Next, we put centre "
                            "and spread together to describe the shape of a distribution.") as vo:
            self.play(FadeIn(title), run_time=0.6)
            per = max(0.3, (vo.duration - 2.0) / 6)
            for r in rows:
                self.play(FadeIn(r, shift=0.2 * RIGHT), run_time=0.6)
                self.wait(max(0.1, per - 0.6))
            self.play(FadeIn(foot), run_time=0.6)
