import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

# Chapter colour roles (light background).
DATA = PRIMARY  # data dots and bars
MEAN = ManimColor("#D19A00")  # mean / balance point (gold)
MED = SECONDARY  # median (teal)
MODE = PURPLE  # mode
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


def cross_out(mob):
    return VGroup(
        Line(mob.get_corner(UL), mob.get_corner(DR), color=WARN, stroke_width=5),
        Line(mob.get_corner(DL), mob.get_corner(UR), color=WARN, stroke_width=5),
    )


def header(s):
    return T(s, 28, weight="BOLD", color=MUTED).to_corner(UL, buff=0.4)


def nline(lo, hi, step, length, y, x0=0.0, nums=None, size=26):
    nl = NumberLine(x_range=[lo, hi, step], length=length, color=INK, stroke_width=2.5,
                    include_tip=False, tick_size=0.08)
    nl.move_to(P(x0, y))
    vals = nums if nums is not None else np.arange(lo, hi + 1e-9, step)
    labels = VGroup(*[M(f"{v:g}", size).next_to(nl.n2p(v), DOWN, buff=0.18) for v in vals])
    return nl, labels


def fulcrum(color=MEAN, size=0.34):
    tri = Triangle(color=color, stroke_width=0).set_fill(color, opacity=1)
    tri.scale_to_fit_height(size)
    return tri


def marker(color, size=0.26):
    """Downward-pointing triangle, placed above a number line."""
    tri = Triangle(color=color, stroke_width=0).set_fill(color, opacity=1).rotate(PI)
    tri.scale_to_fit_height(size)
    return tri


BAL = [4, 6, 7, 9, 14]


class StCh1Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Statistics",
            "Chapter 1 · Measures of Centre",
            "Chapter one. Measures of centre.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7, self.s8):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ scene 1: fair share
    def s1(self):
        hd = header("1.1 · The Mean as a Balance Point")
        money = [20, 30, 50, 40, 60]
        base_y, k, w = -2.6, 0.075, 0.9
        xs = [-5.4 + 1.25 * i for i in range(5)]
        bars = VGroup()
        for x, v in zip(xs, money):
            r = Rectangle(width=w, height=v * k, stroke_width=0).set_fill(DATA, opacity=0.8)
            r.move_to(P(x, base_y), aligned_edge=DOWN)
            bars.add(r)
        base = Line(P(xs[0] - 0.7, base_y), P(xs[-1] + 0.7, base_y), color=INK, stroke_width=2.5)
        labs = VGroup(*[T(f"Rs {v}", 22).next_to(P(x, base_y), DOWN, buff=0.2) for x, v in zip(xs, money)])
        level = DashedLine(P(xs[0] - 0.7, base_y + 40 * k), P(xs[-1] + 0.7, base_y + 40 * k),
                           color=MEAN, stroke_width=3)
        lvl_lab = M(r"40", 30, color=MEAN).next_to(level, LEFT, buff=0.15)
        q = T("One number that stands for the lot?", 32, weight="BOLD").move_to(P(0, 2.6))
        sum1 = M(r"20 + 30 + 50 + 40 + 60 = 200", 36).move_to(P(3.7, 0.9))
        sum2 = M(r"200 \div 5 = 40", 40, color=MEAN).next_to(sum1, DOWN, buff=0.35)
        fair = card(T("the fair share = the mean", 26, color=MEAN, weight="BOLD"), color=MEAN)
        fair.next_to(sum2, DOWN, buff=0.45)
        flat = VGroup(*[
            Rectangle(width=w, height=40 * k, stroke_width=0).set_fill(MEAN, opacity=0.8)
            .move_to(P(x, base_y), aligned_edge=DOWN) for x in xs
        ])

        with self.voiceover("A whole distribution is a lot to carry around. Often you want one number that "
                            "stands for the lot. A typical score, a typical wage.") as vo:
            self.play(FadeIn(hd), Write(q), run_time=1.2)
        with self.voiceover("Five friends bring twenty, thirty, fifty, forty and sixty rupees to a picnic, and "
                            "agree to pool the money and share it equally. The pot holds two hundred rupees, so "
                            "everyone ends up with forty.") as vo:
            self.play(Create(base), run_time=0.5)
            self.play(LaggedStart(*[GrowFromEdge(b, DOWN) for b in bars], lag_ratio=0.2),
                      FadeIn(labs), run_time=2.0)
            self.wait(max(0.1, vo.duration * 0.25))
            self.play(Write(sum1), run_time=1.2)
            self.play(Write(sum2), run_time=1.0)
        with self.voiceover("That fair share is the mean. The tall bars pour into the short ones until every "
                            "bar is level.") as vo:
            self.play(FadeIn(fair, shift=0.2 * UP), Create(level), FadeIn(lvl_lab), run_time=1.0)
            self.play(Transform(bars, flat), run_time=min(2.5, max(1.0, vo.duration - 1.5)))

    # ------------------------------------------------------------ scene 2: balance point
    def s2(self):
        hd = header("1.1 · The Mean as a Balance Point")
        nl, nums = nline(0, 26, 2, 12.4, -0.3)
        dots = VGroup(*[Dot(nl.n2p(v) + 0.2 * UP, radius=0.17, color=DATA) for v in BAL])
        vals = VGroup(*[M(str(v), 28, color=DATA).next_to(d, UP, buff=0.12) for v, d in zip(BAL, dots)])
        ful = fulcrum().next_to(nl.n2p(8), DOWN, buff=0.02)
        ful_lab = M(r"\bar{x} = 8", 34, color=MEAN).next_to(nums, DOWN, buff=0.25).set_x(nl.n2p(8)[0])
        calc = M(r"\bar{x} = \frac{4 + 6 + 7 + 9 + 14}{5} = \frac{40}{5} = 8", 36).move_to(P(0, 2.8))

        with self.voiceover("Here is the picture to keep. Put each value on a number line as a one kilogram "
                            "weight. The data are four, six, seven, nine and fourteen. Their mean is forty over "
                            "five, which is eight, and that is exactly where the ruler balances.") as vo:
            self.play(FadeIn(hd), Create(nl), FadeIn(nums), run_time=1.0)
            self.play(LaggedStart(*[FadeIn(d, shift=0.4 * DOWN) for d in dots], lag_ratio=0.2), run_time=1.4)
            self.play(Write(calc), run_time=1.4)
            self.wait(max(0.1, vo.duration * 0.25))
            self.play(FadeIn(ful, shift=0.2 * UP), FadeIn(ful_lab), run_time=0.8)

        # deviation arrows stacked above the line
        devs = VGroup()
        for i, v in enumerate(BAL):
            y = 0.75 + 0.4 * i
            col = WARN if v < 8 else OK
            a = Arrow(P(nl.n2p(8)[0], y, ), P(nl.n2p(v)[0], y), buff=0, color=col, stroke_width=4,
                      max_tip_length_to_length_ratio=0.4, max_stroke_width_to_length_ratio=20)
            d = v - 8
            lab = M(f"{d:+d}", 26, color=col)
            lab.next_to(a, LEFT if d < 0 else RIGHT, buff=0.12)
            devs.add(VGroup(a, lab))
        axis8 = DashedLine(nl.n2p(8), P(nl.n2p(8)[0], 2.8), color=MEAN, stroke_width=2)
        sums = VGroup(M(r"\text{left: } -4 - 2 - 1 = -7", 32, color=WARN),
                      M(r"\text{right: } +1 + 6 = +7", 32, color=OK)).arrange(RIGHT, buff=1.0)
        sums.move_to(P(0, -2.45))
        rule = card(M(r"\sum (x_i - \bar{x}) = \sum x_i - n\bar{x} = 0", 38, color=PURPLE), color=PURPLE)
        rule.move_to(P(0, -3.25))

        with self.voiceover("Measure each value's deviation from the mean. Minus four, minus two, minus one on "
                            "the left. Plus one and plus six on the right.") as vo:
            self.play(FadeOut(calc), FadeOut(vals), Create(axis8), run_time=0.6)
            self.play(LaggedStart(*[GrowFromPoint(g, nl.n2p(8) + UP) for g in devs], lag_ratio=0.3),
                      run_time=min(3.0, vo.duration - 0.8))
        with self.voiceover("The left side pulls with minus seven, the right side with plus seven. They cancel. "
                            "The sum of x minus x bar is always zero, because the sum of x is n times x "
                            "bar.") as vo:
            self.play(FadeOut(ful_lab), FadeIn(sums), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.35))
            self.play(FadeIn(rule, shift=0.2 * UP), run_time=0.8)

        # mean need not be a data value; drag 14 to 24
        note = card(T("8 is not one of the data values", 26, color=MEAN), color=MEAN).move_to(P(0, 2.9))
        t = ValueTracker(14)
        moving = dots[4]
        moving.add_updater(lambda m: m.move_to(nl.n2p(t.get_value()) + 0.2 * UP))
        ful.add_updater(lambda m: m.next_to(nl.n2p((26 + t.get_value()) / 5), DOWN, buff=0.02))
        mlab = always_redraw(lambda: M(r"\bar{x} = " + f"{(26 + t.get_value()) / 5:.1f}", 34, color=MEAN)
                             .next_to(nl, DOWN, buff=0.75).set_x(nl.n2p((26 + t.get_value()) / 5)[0]))
        shift_note = M(r"\text{moved } 10 \;\Rightarrow\; \bar{x} \text{ moves } \tfrac{10}{5} = 2", 34)
        shift_note.move_to(P(0, -2.9))

        with self.voiceover("Notice that eight is not one of the data values. The balance point does not have to "
                            "sit on a weight.") as vo:
            self.play(FadeOut(devs), FadeOut(axis8), FadeOut(sums), FadeOut(rule), run_time=0.6)
            self.play(FadeIn(note, shift=0.2 * DOWN), FadeIn(mlab), run_time=0.8)
        with self.voiceover("And the mean listens to every value. Drag the fourteen out to twenty four, ten units "
                            "further, and the balance point slides ten over five, which is two units, to "
                            "ten.") as vo:
            self.wait(max(0.1, vo.duration * 0.25))
            self.play(t.animate.set_value(24), run_time=2.5)
            self.play(FadeIn(shift_note), run_time=0.7)
        moving.clear_updaters()
        ful.clear_updaters()
        mlab.clear_updaters()

    # ------------------------------------------------------------ scene 3: frequency / grouped
    def s3(self):
        hd = header("1.2 · Mean of Frequency and Grouped Data")
        cells = [[r"\text{Goals } x", "0", "1", "2", "3", "4"],
                 [r"\text{Matches } f", "3", "5", "6", "4", "2"],
                 [r"fx", "0", "5", "12", "12", "8"]]
        cw = [2.6, 1.1, 1.1, 1.1, 1.1, 1.1]
        rows = VGroup()
        for r, row in enumerate(cells):
            g = VGroup()
            for c, s in enumerate(row):
                col = MUTED if c == 0 else (MEAN if r == 2 else INK)
                g.add(M(s, 34, color=col).move_to(P(sum(cw[:c]) + cw[c] / 2, -0.75 * r)))
            rows.add(g)
        vline = Line(P(cw[0], 0.4), P(cw[0], -1.9), color=MUTED, stroke_width=2)
        tbl = VGroup(rows, vline).move_to(P(0, 1.5))
        f1 = M(r"\bar{x} = \frac{\sum f x}{\sum f} = \frac{37}{20} = 1.85", 44).move_to(P(0, -1.3))
        f1n = T("each value x appears f times, so it adds f × x to the total", 24, color=MUTED)
        f1n.move_to(P(0, -2.6))

        with self.voiceover("Real data come as frequency tables. A club scored zero goals in three matches, one "
                            "goal in five, two in six, three in four, and four in two.") as vo:
            self.play(FadeIn(hd), FadeIn(rows[0]), FadeIn(rows[1]), Create(vline), run_time=1.2)
        with self.voiceover("Each value x appears f times, so it adds f times x to the total. The mean is sigma "
                            "f x over sigma f: thirty seven over twenty, which is one point eight five goals a "
                            "match.") as vo:
            self.play(FadeIn(f1n), run_time=0.6)
            self.play(LaggedStart(*[FadeIn(m, shift=0.2 * DOWN) for m in rows[2]], lag_ratio=0.15),
                      run_time=1.5)
            self.wait(max(0.1, vo.duration * 0.2))
            self.play(Write(f1), run_time=1.6)
        self.clear_scene(0.5)

        # grouped wages
        hd2 = header("1.2 · Mean of Frequency and Grouped Data")
        wc = [[r"\text{Wage}", "f", "x", "u", "fu"],
              ["100\\text{--}120", "12", "110", "-2", "-24"],
              ["120\\text{--}140", "14", "130", "-1", "-14"],
              ["140\\text{--}160", "8", "150", "0", "0"],
              ["160\\text{--}180", "6", "170", "1", "6"],
              ["180\\text{--}200", "10", "190", "2", "20"],
              [r"\text{Total}", "50", "", "", "-12"]]
        wcw = [2.2, 1.0, 1.1, 1.0, 1.2]
        rh = 0.62
        grid = VGroup()
        for r, row in enumerate(wc):
            g = VGroup()
            for c, s in enumerate(row):
                if r == 0:
                    col = MUTED
                elif c >= 3:
                    col = PURPLE if c == 3 else MEAN
                else:
                    col = INK
                m = M(s if s else r"\,", 32, color=col).move_to(P(sum(wcw[:c]) + wcw[c] / 2, -rh * r))
                g.add(m)
            grid.add(g)
        hline = Line(P(0, -rh / 2), P(sum(wcw), -rh / 2), color=MUTED, stroke_width=2)
        tline = Line(P(0, -rh * 5.5), P(sum(wcw), -rh * 5.5), color=MUTED, stroke_width=2)
        wtab = VGroup(grid, hline, tline)
        wtab.move_to(P(-3.0, -0.35))
        left_cols = VGroup(*[VGroup(*row[:3]) for row in grid])
        u_cols = VGroup(*[VGroup(*row[3:]) for row in grid])
        mid = card(T("midpoint assumption: an estimate, not exact", 24, color=MEAN), color=MEAN)
        mid.move_to(P(3.0, 2.2))

        with self.voiceover("Grouped data hide the individual values. Twelve workers earn somewhere between one "
                            "hundred and one hundred and twenty rupees. So we assume each class sits at its "
                            "midpoint. That is an estimate, not an exact answer.") as vo:
            self.play(FadeIn(hd2), FadeIn(left_cols), Create(hline), Create(tline), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.3))
            self.play(Indicate(VGroup(*[row[2] for row in grid[1:6]]), color=MEAN), run_time=1.2)
            self.play(FadeIn(mid, shift=0.2 * DOWN), run_time=0.8)

        ah = M(r"A = 150,\quad h = 20", 36).move_to(P(3.6, 1.1))
        ud = M(r"u = \frac{x - A}{h}", 38, color=PURPLE).next_to(ah, DOWN, buff=0.3)
        st1 = M(r"\bar{u} = \frac{-12}{50} = -0.24", 36).move_to(P(3.6, -1.0))
        st2 = M(r"\times h:\ \ 20 \times (-0.24) = -4.8", 34).next_to(st1, DOWN, buff=0.3)
        st3 = M(r"+A:\ \ \bar{x} = 150 - 4.8 = 145.2", 36, color=MEAN).next_to(st2, DOWN, buff=0.3)

        with self.voiceover("The numbers get big, so shrink them. Subtract an assumed mean, A equals one fifty, "
                            "and divide by the class width, h equals twenty. Now u runs minus two, minus one, "
                            "zero, one, two.") as vo:
            self.play(FadeOut(mid), Write(ah), run_time=0.9)
            self.play(Write(ud), run_time=0.9)
            self.play(LaggedStart(*[FadeIn(row[3]) for row in grid], lag_ratio=0.15), run_time=1.5)
        with self.voiceover("Sigma f u is minus twelve, so u bar is minus zero point two four. Undo the scale: "
                            "times twenty is minus four point eight. Undo the shift: one fifty minus four point "
                            "eight is one forty five point two.") as vo:
            self.play(LaggedStart(*[FadeIn(row[4]) for row in grid], lag_ratio=0.12), run_time=1.4)
            self.play(Write(st1), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(Write(st2), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(Write(st3), run_time=1.0)
        same = T("same answer as the long way", 24, color=OK).next_to(st3, DOWN, buff=0.35)
        with self.voiceover("The same answer as the long way, because shifting and scaling the data shifts and "
                            "scales the balance point.") as vo:
            self.play(FadeIn(same), Circumscribe(st3, color=MEAN), run_time=1.2)

    # ------------------------------------------------------------ scene 4: combined mean
    def s4(self):
        hd = header("1.3 · Weighted and Combined Means")
        nl, nums = nline(50, 80, 5, 11.5, -0.4)
        a = Square(side_length=1.5, stroke_width=0).set_fill(DATA, opacity=0.85)
        a.move_to(nl.n2p(60), aligned_edge=DOWN).shift(0.02 * UP)
        b = Square(side_length=1.0, stroke_width=0).set_fill(SECONDARY, opacity=0.85)
        b.move_to(nl.n2p(75), aligned_edge=DOWN).shift(0.02 * UP)
        alab = VGroup(T("A", 26, color=WHITE, weight="BOLD"), M("30", 34, color=WHITE)).arrange(DOWN, buff=0.1)
        alab.move_to(a)
        blab = VGroup(T("B", 22, color=WHITE, weight="BOLD"), M("20", 28, color=WHITE)).arrange(DOWN, buff=0.05)
        blab.move_to(b)
        ameans = M(r"\bar{x}_1 = 60", 30, color=DATA).next_to(a, UP, buff=0.2)
        bmeans = M(r"\bar{x}_2 = 75", 30, color=SECONDARY).next_to(b, UP, buff=0.2)
        wrong = M(r"\frac{60 + 75}{2} = 67.5", 34).move_to(P(nl.n2p(67.5)[0], 2.5))
        wx = cross_out(wrong)
        ful = fulcrum().next_to(nl.n2p(67.5), DOWN, buff=0.02)
        ful_lab = M(r"66", 34, color=MEAN)
        formula = M(r"\bar{x} = \frac{n_1\bar{x}_1 + n_2\bar{x}_2}{n_1 + n_2} = \frac{1800 + 1500}{50} = 66",
                    40).move_to(P(0, -2.6))
        moral = T("Weight by group size. Do not average the averages.", 26, color=MEAN, weight="BOLD")
        moral.move_to(P(0, -3.5))

        with self.voiceover("Section A has thirty students with a mean of sixty. Section B has twenty with a mean "
                            "of seventy five. Averaging the two means gives sixty seven point five, and that is "
                            "wrong.") as vo:
            self.play(FadeIn(hd), Create(nl), FadeIn(nums), run_time=1.0)
            self.play(FadeIn(a), FadeIn(alab), FadeIn(ameans), run_time=0.8)
            self.play(FadeIn(b), FadeIn(blab), FadeIn(bmeans), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.2))
            self.play(Write(wrong), run_time=1.0)
            self.play(Create(wx), run_time=0.6)
        with self.voiceover("Treat each section as one weight at its own mean. Thirty units at sixty, twenty units "
                            "at seventy five. The balance point sits closer to the heavier weight.") as vo:
            self.play(FadeIn(ful, shift=0.2 * UP), run_time=0.6)
            self.wait(max(0.1, vo.duration * 0.35))
            self.play(ful.animate.next_to(nl.n2p(66), DOWN, buff=0.02), run_time=1.5)
            ful_lab.next_to(ful, DOWN, buff=0.55)
            self.play(FadeIn(ful_lab), run_time=0.5)
        with self.voiceover("Back to totals: eighteen hundred plus fifteen hundred is thirty three hundred, over "
                            "fifty students, which is sixty six. Weight by group size. Do not average the "
                            "averages.") as vo:
            self.play(Write(formula), run_time=2.0)
            self.wait(max(0.1, vo.duration * 0.3))
            self.play(FadeIn(moral), run_time=0.8)

    # ------------------------------------------------------------ scene 5: median
    def s5(self):
        hd = header("1.4 · The Median: The Middle Value")
        data = [3, 5, 6, 7, 8, 9, 10]
        nl, nums = nline(0, 46, 5, 12.4, 0.2, nums=[0, 5, 10, 15, 20, 25, 30, 35, 40, 45])
        dots = VGroup(*[Dot(nl.n2p(v) + 0.2 * UP, radius=0.14, color=DATA) for v in data])
        q = T("Which value has half the data on each side?", 30, weight="BOLD").move_to(P(0, 2.9))
        t = ValueTracker(10)

        def mean_x():
            return (38 + t.get_value()) / 7

        med_m = marker(MED).move_to(nl.n2p(7) + 0.75 * UP)
        med_l = M(r"\text{median} = 7", 30, color=MED).next_to(med_m, UP, buff=0.12)
        mean_m = marker(MEAN).move_to(nl.n2p(mean_x()) + DOWN * 1.1)
        mean_m.rotate(PI)
        mean_l = always_redraw(lambda: M(r"\text{mean} = " + f"{mean_x():.2f}", 30, color=MEAN)
                               .next_to(nl.n2p(mean_x()) + DOWN * 1.1, DOWN, buff=0.25))
        dots[-1].add_updater(lambda m: m.move_to(nl.n2p(t.get_value()) + 0.2 * UP))
        mean_m.add_updater(lambda m: m.move_to(nl.n2p(mean_x()) + DOWN * 1.1))
        rank = T("sorted: 3, 5, 6, 7, 8, 9, 10  →  the 4th of 7", 26, color=MUTED).move_to(P(0, -2.9))

        with self.voiceover("The median asks a simpler question. Which value has half the data on each side? "
                            "Only the order matters. Sort seven values and take the fourth.") as vo:
            self.play(FadeIn(hd), Write(q), Create(nl), FadeIn(nums), run_time=1.2)
            self.play(LaggedStart(*[FadeIn(d, shift=0.3 * DOWN) for d in dots], lag_ratio=0.15), run_time=1.2)
            self.play(FadeIn(rank), run_time=0.6)
            self.play(FadeIn(med_m), FadeIn(med_l), FadeIn(mean_m), FadeIn(mean_l), run_time=0.8)
        with self.voiceover("Now drag the largest value far to the right. The mean chases it. The median does not "
                            "move, because the middle value is still the middle value.") as vo:
            self.play(t.animate.set_value(45), run_time=3.0)
            self.play(Indicate(med_l, color=MED), run_time=1.0)
        dots[-1].clear_updaters()
        mean_m.clear_updaters()
        mean_l.clear_updaters()
        self.clear_scene(0.5)

        # grouped median on the ogive
        hd2 = header("1.4 · The Median: grouped data")
        ax = Axes(x_range=[0, 50, 10], y_range=[0, 50, 10], x_length=5.8, y_length=4.9,
                  axis_config={"color": INK, "stroke_width": 2, "include_tip": False, "tick_size": 0.06})
        ax.move_to(P(-3.3, -0.35))
        xl = VGroup(*[M(str(v), 24).next_to(ax.c2p(v, 0), DOWN, buff=0.15) for v in range(0, 51, 10)])
        yl = VGroup(*[M(str(v), 24).next_to(ax.c2p(0, v), LEFT, buff=0.15) for v in range(10, 51, 10)])
        cf = [(0, 0), (10, 5), (20, 13), (30, 33), (40, 45), (50, 50)]
        og = VMobject(color=DATA, stroke_width=4).set_points_as_corners([ax.c2p(x, y) for x, y in cf])
        ogd = VGroup(*[Dot(ax.c2p(x, y), radius=0.07, color=DATA) for x, y in cf])
        cflab = T("cumulative frequency", 20, color=MUTED).next_to(ax, UP, buff=0.15).align_to(ax, LEFT)
        seg = Line(ax.c2p(20, 13), ax.c2p(30, 33), color=MED, stroke_width=7)
        h25 = DashedLine(ax.c2p(0, 25), ax.c2p(26, 25), color=MEAN, stroke_width=3)
        l25 = M(r"\tfrac{n}{2} = 25", 28, color=MEAN).next_to(ax.c2p(8, 25), UP, buff=0.12)
        v26 = DashedLine(ax.c2p(26, 25), ax.c2p(26, 0), color=MED, stroke_width=3)
        d26 = Dot(ax.c2p(26, 25), radius=0.09, color=MED)
        l13 = M(r"13", 24, color=MUTED).next_to(ax.c2p(20, 13), DR, buff=0.06)
        l33 = M(r"33", 24, color=MUTED).next_to(ax.c2p(30, 33), UL, buff=0.06)
        l26 = M(r"26", 30, color=MED).next_to(ax.c2p(26, 0), UP, buff=0.12).shift(0.3 * RIGHT)

        facts = VGroup(
            M(r"n = 50:\ \text{want the 25th value}", 32),
            M(r"13 \text{ below } 20,\ \ 33 \text{ below } 30", 32),
            M(r"\text{median class: } 20\text{--}30", 32, color=MED),
        ).arrange(DOWN, buff=0.3, aligned_edge=LEFT).move_to(P(3.6, 1.8))
        need = M(r"\text{need } 25 - 13 = 12 \text{ of } 20", 32).move_to(P(3.6, 0.0))
        calc = M(r"20 + \frac{12}{20} \times 10 = 26", 38, color=MED).next_to(need, DOWN, buff=0.35)
        notmid = VGroup(M(r"\text{not } 25", 30, color=WARN), T("(the class midpoint)", 22, color=WARN))
        notmid.arrange(RIGHT, buff=0.2).next_to(calc, DOWN, buff=0.3)
        gen = card(M(r"\text{Median} = l + \frac{\frac{n}{2} - cf}{f} \times h", 38, color=PURPLE), color=PURPLE)
        gen.move_to(P(3.6, -2.75))

        with self.voiceover("For grouped data, use cumulative frequency. Fifty values, so we want the twenty "
                            "fifth. Thirteen lie below twenty, and thirty three lie below thirty, so the twenty "
                            "fifth is inside the class twenty to thirty.") as vo:
            self.play(FadeIn(hd2), Create(ax), FadeIn(xl), FadeIn(yl), FadeIn(cflab), run_time=1.0)
            self.play(Create(og), FadeIn(ogd), run_time=1.5)
            self.play(Write(facts[0]), Create(h25), FadeIn(l25), run_time=1.0)
            self.play(Write(facts[1]), FadeIn(l13), FadeIn(l33), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(Write(facts[2]), Create(seg), run_time=1.0)
        with self.voiceover("Assume the twenty values in that class are spread evenly. On the ogive that is a "
                            "straight segment. We need twelve more values out of twenty, so twelve twentieths of "
                            "the width: twenty plus six is twenty six.") as vo:
            self.play(Indicate(seg, color=MED, scale_factor=1.05), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.2))
            self.play(Write(need), run_time=1.0)
            self.play(FadeIn(d26), Create(v26), FadeIn(l26), run_time=1.0)
            self.play(Write(calc), run_time=1.2)
        with self.voiceover("Not twenty five, the midpoint of the class. The formula is just this interpolation: "
                            "l plus n over two minus c f, over f, times h.") as vo:
            self.play(FadeIn(notmid), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.2))
            self.play(FadeIn(gen, shift=0.2 * UP), run_time=1.0)

    # ------------------------------------------------------------ scene 6: mode
    def s6(self):
        hd = header("1.5 · The Mode: The Peak")
        intro = VGroup(
            card(T("Shoe shop: stock the size that sells most", 26), color=MODE),
            card(T("Blood groups O, A, B, O, AB, O  →  mode O", 26), color=MODE),
        ).arrange(DOWN, buff=0.35).move_to(P(0, 0.9))
        only = T("For categories, the mode is the only average.", 28, color=MODE, weight="BOLD").move_to(P(0, -1.2))

        with self.voiceover("The mode is the most common value, the peak. A shoe shop cannot stock size seven "
                            "point three, it stocks the size that sells most. And for categories like blood "
                            "groups, the mode is the only average there is.") as vo:
            self.play(FadeIn(hd), FadeIn(intro[0], shift=0.2 * UP), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.3))
            self.play(FadeIn(intro[1], shift=0.2 * UP), run_time=0.8)
            self.play(FadeIn(only), run_time=0.8)
        self.play(FadeOut(intro), FadeOut(only), run_time=0.5)

        freqs = [6, 10, 17, 12, 5]
        ax = Axes(x_range=[0, 50, 10], y_range=[0, 20, 5], x_length=6.2, y_length=4.6,
                  axis_config={"color": INK, "stroke_width": 2, "include_tip": False, "tick_size": 0.06})
        ax.move_to(P(-3.3, -0.5))
        xl = VGroup(*[M(str(v), 24).next_to(ax.c2p(v, 0), DOWN, buff=0.15) for v in range(0, 51, 10)])
        yl = VGroup(*[M(str(v), 24).next_to(ax.c2p(0, v), LEFT, buff=0.15) for v in range(5, 21, 5)])
        bars = VGroup()
        for i, f in enumerate(freqs):
            r = Polygon(ax.c2p(10 * i, 0), ax.c2p(10 * i + 10, 0), ax.c2p(10 * i + 10, f), ax.c2p(10 * i, f),
                        stroke_color=WHITE, stroke_width=2).set_fill(DATA, opacity=0.75)
            bars.add(r)
        flabs = VGroup(*[M(str(f), 26, color=DATA).next_to(ax.c2p(10 * i + 5, f), UP, buff=0.08)
                         for i, f in enumerate(freqs)])
        flabs[2].shift(0.35 * UP)
        l1 = Line(ax.c2p(20, 17), ax.c2p(30, 12), color=MODE, stroke_width=4)
        l2 = Line(ax.c2p(20, 10), ax.c2p(30, 17), color=MODE, stroke_width=4)
        xm = 20 + 70 / 12
        ym = 17 - 0.5 * (xm - 20)
        cross = Dot(ax.c2p(xm, ym), radius=0.09, color=MEAN)
        drop = DashedLine(ax.c2p(xm, ym), ax.c2p(xm, 0), color=MEAN, stroke_width=3)
        lab_f = VGroup(
            M(r"f_0 = 10", 30).move_to(P(3.3, 2.5)),
            M(r"f_1 = 17", 30, color=MODE).move_to(P(3.3, 2.0)),
            M(r"f_2 = 12", 30).move_to(P(3.3, 1.5)),
        )
        lab_f.move_to(P(3.6, 2.0))
        lean = T("taller right neighbour → peak leans right", 22, color=MUTED).move_to(P(3.6, 0.9))
        form = M(r"\text{Mode} = l + \frac{f_1 - f_0}{2f_1 - f_0 - f_2} \times h", 36, color=PURPLE)
        form.move_to(P(3.6, -0.3))
        num = M(r"= 20 + \frac{7}{12} \times 10 \approx 25.83", 38, color=MEAN).next_to(form, DOWN, buff=0.4)
        sim = T("from similar triangles at the crossing", 22, color=MUTED).next_to(num, DOWN, buff=0.4)

        with self.voiceover("For grouped data, the tallest bar is the modal class, here twenty to thirty. Its "
                            "neighbours tell us which way the peak leans.") as vo:
            self.play(Create(ax), FadeIn(xl), FadeIn(yl), run_time=0.8)
            self.play(LaggedStart(*[GrowFromEdge(b, DOWN) for b in bars], lag_ratio=0.15), FadeIn(flabs),
                      run_time=1.5)
            self.play(bars[2].animate.set_fill(MODE, opacity=0.55), FadeIn(lab_f), run_time=0.8)
        with self.voiceover("Draw two lines across the top of the modal bar, corner to corner. They cross above "
                            "the mode.") as vo:
            self.play(Create(l1), run_time=0.9)
            self.play(Create(l2), run_time=0.9)
            self.play(FadeIn(cross, scale=0.5), Create(drop), run_time=0.8)
        with self.voiceover("Similar triangles give l plus f one minus f zero, over two f one minus f zero minus "
                            "f two, times h. Here that is twenty plus seven twelfths of ten, about twenty five "
                            "point eight three. The right neighbour is taller, so the peak leans right.") as vo:
            self.play(Write(form), FadeIn(sim), run_time=1.5)
            self.wait(max(0.1, vo.duration * 0.3))
            self.play(Write(num), run_time=1.2)
            self.play(FadeIn(lean), run_time=0.7)

    # ------------------------------------------------------------ scene 7: choosing
    def s7(self):
        hd = header("1.6 · Choosing the Right Average")
        sal = [30, 32, 35, 35, 38, 40, 42, 45, 48]
        LY = 0.7
        # main segment 20..100 (Rs thousand), then a break, then 500 on its own stub
        nl, nums = nline(20, 100, 10, 9.2, LY, x0=-1.6, nums=[20, 40, 60, 80, 100], size=24)
        stub = Line(P(4.4, LY), P(5.9, LY), color=INK, stroke_width=2.5)
        brk = VGroup(Line(P(3.55, LY - 0.2), P(3.75, LY + 0.2), color=INK, stroke_width=2.5),
                     Line(P(3.8, LY - 0.2), P(4.0, LY + 0.2), color=INK, stroke_width=2.5))
        p500 = P(5.3, LY)
        n500 = M("500", 24).next_to(p500, DOWN, buff=0.18)
        tick500 = Line(p500 + 0.08 * UP, p500 + 0.08 * DOWN, color=INK, stroke_width=2.5)
        unit = T("salary, Rs thousand / month", 20, color=MUTED).move_to(P(0, 1.75)).align_to(nl, LEFT)
        seen = {}
        dots = VGroup()
        for v in sal:
            k = seen.get(v, 0)
            seen[v] = k + 1
            dots.add(Dot(nl.n2p(v) + (0.2 + 0.26 * k) * UP, radius=0.11, color=DATA))
        boss = Dot(p500 + 0.2 * UP, radius=0.11, color=DATA)
        boss_l = T("boss", 22, color=DATA).next_to(boss, UP, buff=0.12)
        ad = card(T("\"Average salary Rs 84,500 a month!\"", 28, weight="BOLD"), color=MEAN).move_to(P(0, 2.6))

        def mk(v, color, depth):
            x = nl.n2p(v)[0]
            tri = marker(color, 0.22).rotate(PI).move_to(P(x, LY - 0.62))
            ln = Line(P(x, LY - 0.75), P(x, depth + 0.2), color=color, stroke_width=2)
            return tri, ln

        mo_t, mo_l = mk(35, MODE, -0.75)
        me_t, me_l = mk(39, MED, -1.4)
        mn_t, mn_l = mk(84.5, MEAN, -0.75)
        mo_lab = M(r"\text{mode } 35", 28, color=MODE).next_to(P(nl.n2p(35)[0], -0.75), DOWN, buff=0.05)
        mo_lab.shift(0.5 * LEFT)
        me_lab = M(r"\text{median } 39", 28, color=MED).next_to(P(nl.n2p(39)[0], -1.4), DOWN, buff=0.05)
        me_lab.shift(0.6 * RIGHT)
        mn_lab = M(r"\text{mean } 84.5", 28, color=MEAN).next_to(P(nl.n2p(84.5)[0], -0.75), DOWN, buff=0.05)

        qs = VGroup(
            card(T("Mean: the fair share", 22, color=MEAN), color=MEAN),
            card(T("Median: the typical case", 22, color=MED), color=MED),
            card(T("Mode: the most common", 22, color=MODE), color=MODE),
        ).arrange(RIGHT, buff=0.35).move_to(P(0, -2.45))
        skew = M(r"\text{right tail:}\ \ \text{mode} < \text{median} < \text{mean}", 32).move_to(P(0, -2.45))
        emp = M(r"\text{Mode} \approx 3\,\text{Median} - 2\,\text{Mean}", 34, color=PURPLE)
        emp_n = T("(empirical rule of thumb, not a theorem)", 22, color=WARN)
        empg = VGroup(emp, emp_n).arrange(RIGHT, buff=0.3).move_to(P(0, -3.3))

        with self.voiceover("A company advertises an average salary of eighty four thousand five hundred rupees. "
                            "Nine of its ten salaries are between thirty and forty eight thousand. The tenth is "
                            "the boss, at five hundred thousand.") as vo:
            self.play(FadeIn(hd), FadeIn(ad, shift=0.2 * DOWN), run_time=1.0)
            self.play(Create(nl), FadeIn(nums), FadeIn(unit), Create(brk), Create(stub), FadeIn(tick500),
                      FadeIn(n500), run_time=1.0)
            self.play(LaggedStart(*[FadeIn(d, shift=0.3 * DOWN) for d in dots], lag_ratio=0.08), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(FadeIn(boss, shift=0.3 * DOWN), FadeIn(boss_l), run_time=0.8)
        with self.voiceover("The mean is eighty four point five thousand. The median is thirty nine thousand. The "
                            "mode is thirty five thousand.") as vo:
            self.play(FadeIn(mn_t), Create(mn_l), FadeIn(mn_lab), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(FadeIn(me_t), Create(me_l), FadeIn(me_lab), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(FadeIn(mo_t), Create(mo_l), FadeIn(mo_lab), run_time=0.8)
        with self.voiceover("None is wrong. The mean answers the fair share question. The median answers what a "
                            "typical employee earns.") as vo:
            self.play(LaggedStart(*[FadeIn(c, shift=0.2 * UP) for c in qs], lag_ratio=0.3), run_time=1.5)
        with self.voiceover("A long right tail drags the mean toward it, so mode, then median, then mean. For "
                            "moderately skewed data, the mode is roughly three times the median minus two times "
                            "the mean. That is an observed rule of thumb, not a theorem.") as vo:
            self.play(FadeOut(qs), FadeIn(skew), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.25))
            self.play(Write(emp), run_time=1.2)
            self.play(FadeIn(emp_n), run_time=0.6)

    # ------------------------------------------------------------ scene 8: recap
    def s8(self):
        title = T("Chapter 1 in six lines", 40, weight="BOLD", color=PRIMARY).move_to(P(0, 3.1))
        lines = [
            ("The mean is the fair share and the balance point: deviations cancel.", MEAN),
            ("Tables: weight each value by its frequency; classes: use midpoints.", DATA),
            ("Combine groups by weighting with their sizes.", SECONDARY),
            ("The median is the middle: only order matters.", MED),
            ("The mode is the peak, the only average for categories.", MODE),
            ("Skew pulls them apart: choose the one that answers your question.", OK),
        ]
        rows = VGroup()
        for i, (s, c) in enumerate(lines, start=1):
            num = Circle(radius=0.24, color=c, stroke_width=2).set_fill(c, opacity=1)
            num = VGroup(num, T(str(i), 22, color=WHITE, weight="BOLD").move_to(num))
            rows.add(VGroup(num, T(s, 24)).arrange(RIGHT, buff=0.3))
        rows.arrange(DOWN, aligned_edge=LEFT, buff=0.34).move_to(P(0, -0.05))
        if rows.width > config.frame_width - 0.8:
            rows.scale_to_fit_width(config.frame_width - 0.8)
        foot = T("Next: 1.7 · Chapter 1 Mastery", 26, color=MUTED).move_to(P(0, -3.35))
        with self.voiceover("Chapter one in six lines. The mean is the fair share and the balance point, where "
                            "deviations cancel. For tables, weight each value by its frequency, and for classes, "
                            "by its midpoint. Combine groups by weighting with their sizes. The median is the "
                            "middle, and only order matters. The mode is the peak, the only average for "
                            "categories. And skew pulls them apart, so choose the one that answers your "
                            "question.") as vo:
            self.play(FadeIn(title), run_time=0.6)
            per = max(0.3, (vo.duration - 2.0) / 6)
            for r in rows:
                self.play(FadeIn(r, shift=0.2 * RIGHT), run_time=0.6)
                self.wait(max(0.1, per - 0.6))
            self.play(FadeIn(foot), run_time=0.6)
