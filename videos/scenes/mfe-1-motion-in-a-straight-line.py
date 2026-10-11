import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

import re  # noqa: E402

# `say` reads a lone "a" as the article "uh"; spell the variable as a letter.
LA = "[[char LTRL]]a[[char NORM]]"
SAY_A = ['that a was', 'v and a have', 'but a is', 'When a is', 'plus a t.', 'half a t squared', 'two a s', 'and a is minus', 'If a were', 'If a depends', 'rule: a equals', 'drag a equals', 'fall, a is']


def say_fix(text):
    for ph in SAY_A:
        text = text.replace(ph, re.sub(r"(?<![A-Za-z])a(?![A-Za-z])", LA, ph))
    return text

# Chapter colour roles (light background).
X_C = PRIMARY  # position / x-t = strawberry red
V_C = SECONDARY  # velocity / v-t = teal
A_C = ACCENT  # acceleration, highlights = amber
D_C = PURPLE  # displacement
HL = ManimColor("#D19A00")  # highlight gold
WARN = PRIMARY
NEG_C = ManimColor("#C2477F")  # negative area
POS_C = GREEN  # positive area


# ---------------------------------------------------------------- helpers
def T(s, size=30, **kw):
    return Text(s, font_size=size, **kw)


def M(s, size=40, **kw):
    return MathTex(s, font_size=size, **kw)


def Ms(*parts, size=40, **kw):
    return MathTex(*parts, font_size=size, **kw)


def fit(mob, w):
    if mob.width > w:
        mob.scale_to_fit_width(w)
    return mob


def P(x, y):
    return np.array([x, y, 0.0])


def vec(start, end, color, sw=6):
    return Arrow(start, end, buff=0, color=color, stroke_width=sw,
                 max_tip_length_to_length_ratio=0.2, max_stroke_width_to_length_ratio=12)


def check():
    return MathTex(r"\checkmark", color=GREEN, font_size=52)


def cross_mark():
    return MathTex(r"\times", color=WARN, font_size=60)


def strike(mob, color=WARN, sw=4):
    return Line(mob.get_corner(DL) + 0.05 * DL, mob.get_corner(UR) + 0.05 * UR, color=color, stroke_width=sw)


def header(s):
    return T(s, 24, color=MUTED, weight="BOLD").to_corner(UL, buff=0.35)


def axes(xr, yr, xl, yl, center, xlab, ylab, nums=True):
    ax = Axes(x_range=xr, y_range=yr, x_length=xl, y_length=yl, tips=False,
              axis_config={"color": INK, "stroke_width": 2, "include_ticks": True},
              x_axis_config={"include_numbers": nums, "font_size": 22,
                             "decimal_number_config": {"color": INK, "num_decimal_places": 0}},
              y_axis_config={"include_numbers": nums, "font_size": 22,
                             "decimal_number_config": {"color": INK, "num_decimal_places": 0}})
    ax.move_to(center)
    xl_ = M(xlab, 28, color=MUTED).next_to(ax.x_axis.get_right(), RIGHT, buff=0.15)
    g = VGroup(xl_)
    if ylab:
        g.add(M(ylab, 28, color=MUTED).next_to(ax.y_axis.get_top(), UP, buff=0.12))
    return ax, g


def dnum(v, places=1, size=40, color=INK, unit=None):
    kw = dict(num_decimal_places=places, font_size=size, color=color)
    if unit:
        kw.update(unit=unit, unit_buff_per_font_unit=0.003)
    return DecimalNumber(v, **kw)


class MfeCh1Video(NarratedScene):
    def voiceover(self, text):
        return super().voiceover(say_fix(text))

    def construct(self):
        self.title_card(
            "Motion, Forces and Energy",
            "Chapter 1 · Motion in a Straight Line",
            "Chapter one. Motion in a straight line.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7):
            part()
            self.clear_scene()

    def unhook(self):
        for m in self.mobjects:
            m.clear_updaters()

    # ------------------------------------------------------------ scene 1: distance vs displacement
    def s1(self):
        hd = header("1.1 · Position, displacement and distance")
        nl = NumberLine(x_range=[-1, 6, 1], length=11.2, color=INK, include_numbers=True, font_size=28,
                        decimal_number_config={"color": INK, "num_decimal_places": 0})
        nl.move_to(P(0, -0.6))
        unit = M(r"x\ (\text{km})", 28, color=MUTED).next_to(nl, RIGHT, buff=0.15).shift(0.1 * UP)
        home = T("home", 22, color=MUTED).next_to(nl.n2p(0), DOWN, buff=0.6)
        east = T("east is positive \u2192", 22, color=MUTED).next_to(nl.n2p(5), DOWN, buff=0.6)
        s = ValueTracker(0.0)

        def pos():
            v = s.get_value()
            return v if v <= 5 else 10 - v

        car = always_redraw(lambda: RoundedRectangle(width=0.7, height=0.4, corner_radius=0.1, color=INK,
                                                     stroke_width=3).set_fill(X_C, 1)
                            .move_to(nl.n2p(pos()) + 0.35 * UP))
        out_leg = always_redraw(lambda: Line(nl.n2p(0) + 1.1 * UP, nl.n2p(min(s.get_value(), 5)) + 1.1 * UP,
                                             color=A_C, stroke_width=6))
        back_leg = always_redraw(lambda: Line(nl.n2p(5) + 1.5 * UP,
                                              nl.n2p(10 - max(s.get_value(), 5)) + 1.5 * UP,
                                              color=A_C, stroke_width=6))
        dist_l = M(r"\text{odometer (distance)} =", 38).move_to(P(-1.6, 2.7))
        dist_v = dnum(0, 1, 38, A_C, r"\text{km}")
        dist_v.add_updater(lambda m: m.set_value(s.get_value()).next_to(dist_l, RIGHT, buff=0.2))
        disp = vec(nl.n2p(0) + 1.45 * DOWN, nl.n2p(2) + 1.45 * DOWN, D_C, sw=7)
        disp_l = M(r"\text{displacement} = +2\ \text{km}", 36, color=D_C).next_to(disp, RIGHT, buff=0.3)
        with self.voiceover("You drive five kilometres east, then three kilometres back west. The odometer says "
                            "eight kilometres. Yet you are only two kilometres from home. Both are right. Eight is "
                            "the distance. Two kilometres east is the displacement.") as vo:
            self.add(car, out_leg, back_leg)
            self.play(FadeIn(hd), Create(nl), FadeIn(unit), FadeIn(home), FadeIn(east), FadeIn(car), run_time=1.0)
            self.play(FadeIn(dist_l), FadeIn(dist_v), run_time=0.5)
            self.play(s.animate.set_value(5), run_time=2.2, rate_func=smooth)
            self.play(s.animate.set_value(8), run_time=1.6, rate_func=smooth)
            self.wait(vo.duration * 0.12)
            self.play(Indicate(dist_v, color=A_C), run_time=0.8)
            self.play(FadeOut(home), FadeOut(east), GrowArrow(disp), FadeIn(disp_l), run_time=1.0)
        self.unhook()

        d1 = M(r"\text{displacement} = \Delta x = x_{\text{final}} - x_{\text{initial}}", 42, color=D_C)
        d1n = T("signed: it has a direction", 24, color=MUTED)
        d2 = M(r"\text{distance} = \text{total path length} \ \ge\ |\Delta x|", 42, color=A_C)
        d2n = T("never negative, never decreases", 24, color=MUTED)
        d3 = M(r"\text{average velocity} = \frac{\Delta x}{\Delta t}, \qquad "
               r"\text{average speed} = \frac{\text{distance}}{\Delta t}", 42)
        grp = VGroup(d1, d1n, d2, d2n, d3).arrange(DOWN, buff=0.25).move_to(P(0, 0.1))
        d2.shift(0.15 * DOWN)
        d2n.shift(0.15 * DOWN)
        d3.shift(0.4 * DOWN)
        with self.voiceover("Displacement is the change in position, and it carries a sign. Distance is the total "
                            "length of path, never negative. Divide each by the time, and you get two different "
                            "averages: average velocity, and average speed.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(Write(d1), FadeIn(d1n), run_time=1.3)
            self.wait(vo.duration * 0.12)
            self.play(Write(d2), FadeIn(d2n), run_time=1.3)
            self.wait(vo.duration * 0.12)
            self.play(Write(d3), run_time=1.6)

        A = P(-4.5, 1.2)
        B = P(4.5, 1.2)
        road = Line(A, B, color=MUTED, stroke_width=4)
        Ad = VGroup(Dot(A, color=INK), M("A", 32).next_to(A, DOWN, buff=0.15))
        Bd = VGroup(Dot(B, color=INK), M("B", 32).next_to(B, DOWN, buff=0.15))
        go = vec(A + 0.5 * UP, B + 0.5 * UP, V_C, sw=5)
        back = vec(B + 1.1 * UP, A + 1.1 * UP, X_C, sw=5)
        gol = M(r"40\ \text{km/h}", 32, color=V_C).next_to(go, UP, buff=0.05).shift(1.5 * RIGHT)
        backl = M(r"60\ \text{km/h}", 32, color=X_C).next_to(back, UP, buff=0.05).shift(1.5 * LEFT)
        hm = M(r"\bar v = \frac{2v_1v_2}{v_1 + v_2} = \frac{2(40)(60)}{100} = 48\ \text{km/h}", 46, color=GREEN)
        hm.move_to(P(0, -0.9))
        am = M(r"\frac{40 + 60}{2} = 50", 42, color=WARN).move_to(P(-2.2, -2.6))
        amx = cross_mark().next_to(am, RIGHT, buff=0.3)
        vel0 = M(r"\text{average velocity} = 0", 40, color=D_C).move_to(P(3.2, -2.6))
        with self.voiceover("And average speed is not the average of the speeds. Ride out at forty kilometres per "
                            "hour, and back at sixty. The slow leg lasts longer, so the average speed is forty "
                            "eight, the harmonic mean, not fifty. The average velocity is zero: you ended where you "
                            "began.") as vo:
            self.play(FadeOut(grp), run_time=0.5)
            self.play(Create(road), FadeIn(Ad), FadeIn(Bd), run_time=0.7)
            self.play(GrowArrow(go), FadeIn(gol), run_time=0.8)
            self.play(GrowArrow(back), FadeIn(backl), run_time=0.8)
            self.wait(vo.duration * 0.15)
            self.play(Write(hm), run_time=1.6)
            self.play(FadeIn(am), FadeIn(amx), run_time=0.7)
            self.wait(vo.duration * 0.08)
            self.play(FadeIn(vel0), run_time=0.7)

    # ------------------------------------------------------------ scene 2: x-t graphs
    def s2(self):
        hd = header("1.2 · Velocity and position-time graphs")
        ax, labs = axes([0, 3.5, 1], [0, 50, 10], 6.4, 4.8, P(-3.0, -0.6), "t\\ (\\text{s})", "x\\ (\\text{m})")
        ax.x_axis.numbers.set_opacity(1)
        curve = ax.plot(lambda t: 5 * t * t, x_range=[0, 3.15], color=X_C, stroke_width=5)
        cl = M(r"x = 5t^2", 36, color=X_C).move_to(ax.c2p(2.15, 44))
        t2 = ValueTracker(2.0)
        p1 = Dot(ax.c2p(1, 5), color=INK, radius=0.08)

        def sec():
            a = np.array(ax.c2p(1, 5))
            b = np.array(ax.c2p(t2.get_value(), 5 * t2.get_value() ** 2))
            d = (b - a) / np.linalg.norm(b - a)
            return Line(a - 1.0 * d, b + 1.0 * d, color=V_C, stroke_width=4)

        secant = always_redraw(sec)
        p2 = always_redraw(lambda: Dot(ax.c2p(t2.get_value(), 5 * t2.get_value() ** 2), color=V_C, radius=0.08))
        sl = M(r"\text{chord slope} =", 40, color=V_C).move_to(P(2.6, 2.4))
        sv = dnum(15, 2, 40, V_C, r"\text{m/s}")
        sv.add_updater(lambda m: m.set_value(5 * (t2.get_value() + 1)).next_to(sl, RIGHT, buff=0.2))
        with self.voiceover("A speedometer shows how fast you are going right now. On an x t graph, the average "
                            "velocity between two times is the slope of the chord joining them. Slide the second "
                            "point towards the first, and the chord swings round onto the tangent.") as vo:
            self.add(secant, p2)
            self.play(FadeIn(hd), Create(ax), FadeIn(labs), run_time=1.0)
            self.play(Create(curve), FadeIn(cl), run_time=1.0)
            self.play(FadeIn(p1), FadeIn(p2), Create(secant), FadeIn(sl), FadeIn(sv), run_time=0.9)
            self.wait(vo.duration * 0.2)
            self.play(t2.animate.set_value(1.5), run_time=1.6)
            self.play(t2.animate.set_value(1.1), run_time=1.4)
            self.play(t2.animate.set_value(1.01), run_time=1.2)
        rows = VGroup(
            M(r"t_2 = 2:\ \ 15", 36), M(r"t_2 = 1.5:\ \ 12.5", 36), M(r"t_2 = 1.1:\ \ 10.5", 36),
            M(r"t_2 = 1.01:\ \ 10.05", 36),
        ).arrange(DOWN, buff=0.2, aligned_edge=LEFT).move_to(P(3.0, 0.7))
        vdef = M(r"v = \lim_{\Delta t\to 0}\frac{\Delta x}{\Delta t} = \frac{dx}{dt}", 46, color=PRIMARY)
        vdef.move_to(P(3.2, -1.4))
        v10 = M(r"v = 10t \;\Rightarrow\; v(1) = 10\ \text{m/s}", 40, color=GREEN).move_to(P(3.7, -2.9))
        with self.voiceover("For x equals five t squared, the chord slopes fall from fifteen, to twelve point five, "
                            "to ten point five, and close in on ten metres per second. The limit is the "
                            "instantaneous velocity, d x by d t: the slope of the tangent. Here v equals ten t.") as vo:
            self.play(LaggedStart(*[FadeIn(r, shift=0.1 * UP) for r in rows], lag_ratio=0.4), run_time=2.4)
            self.wait(vo.duration * 0.15)
            self.play(Write(vdef), run_time=1.4)
            self.play(Write(v10), run_time=1.2)
        self.unhook()

        # turnaround and "the graph is not the path"
        ax2, labs2 = axes([0, 2, 1], [0, 6, 1], 6.0, 3.0, P(-2.6, 0.9), "t\\ (\\text{s})", "x\\ (\\text{m})")
        f = lambda t: 10 * t - 5 * t * t  # noqa: E731
        c2 = ax2.plot(f, x_range=[0, 2], color=X_C, stroke_width=5)
        c2l = M(r"x = 10t - 5t^2", 32, color=X_C).move_to(ax2.c2p(1.65, 5.6))
        tt = ValueTracker(0.0)
        dotg = always_redraw(lambda: Dot(ax2.c2p(tt.get_value(), f(tt.get_value())), color=X_C, radius=0.09))

        def tan():
            t = tt.get_value()
            sl_ = 10 - 10 * t
            p0 = np.array(ax2.c2p(t, f(t)))
            d = np.array(ax2.c2p(t + 0.1, f(t) + 0.1 * sl_)) - p0
            d = d / np.linalg.norm(d)
            return Line(p0 - 0.9 * d, p0 + 0.9 * d, color=V_C, stroke_width=4)

        tline = always_redraw(tan)
        track = NumberLine(x_range=[0, 6, 1], length=9, color=INK, include_numbers=True, font_size=24,
                           decimal_number_config={"color": INK, "num_decimal_places": 0}).move_to(P(-0.5, -2.7))
        trl = M(r"x\ (\text{m})", 26, color=MUTED).next_to(track, RIGHT, buff=0.15)
        trk_t = T("the actual track: a straight line", 22, color=MUTED).next_to(track, UP, buff=0.55)
        part = always_redraw(lambda: Dot(track.n2p(f(tt.get_value())) + 0.25 * UP, color=X_C, radius=0.14))
        notes = VGroup(T("steeper = faster", 26), T("flat tangent = at rest", 26, color=V_C),
                       T("graph = where, when", 26, color=WARN), T("not the path", 26, color=WARN))
        notes.arrange(DOWN, buff=0.25, aligned_edge=LEFT).move_to(P(4.6, 1.0))
        with self.voiceover("Read the graph like this. Steeper means faster. A horizontal tangent means the particle "
                            "is momentarily at rest, turning round. And the curve is a record of where and when, not "
                            "a picture of the path. The particle itself only ever moves along a straight line.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.add(dotg, tline, part)
            self.play(Create(ax2), FadeIn(labs2), Create(c2), FadeIn(c2l), FadeIn(track), FadeIn(trl),
                      FadeIn(trk_t), run_time=1.0)
            self.play(FadeIn(dotg), FadeIn(tline), FadeIn(part), FadeIn(notes[0]), run_time=0.6)
            self.play(tt.animate.set_value(1.0), run_time=2.2, rate_func=linear)
            self.play(FadeIn(notes[1]), Flash(ax2.c2p(1, 5), color=V_C), run_time=0.8)
            self.wait(vo.duration * 0.1)
            self.play(tt.animate.set_value(2.0), FadeIn(notes[2]), run_time=2.2, rate_func=linear)
            self.play(FadeIn(notes[3]), Indicate(part, color=X_C), run_time=0.8)
        self.unhook()

    # ------------------------------------------------------------ scene 3: v-t graphs
    def s3(self):
        hd = header("1.3 · Acceleration and velocity-time graphs")
        ax, labs = axes([0, 8, 1], [-6, 10, 2], 6.8, 4.8, P(-2.8, -0.5), "t\\ (\\text{s})", "v\\ (\\text{m/s})")
        vf = lambda t: -6 + 2 * t  # noqa: E731
        line = ax.plot(vf, x_range=[0, 8], color=V_C, stroke_width=5)
        ll = M(r"v = -6 + 2t", 32, color=V_C).move_to(ax.c2p(5.6, 9.2))
        # slope triangle
        sa, sb = ax.c2p(5, vf(5)), ax.c2p(6, vf(5))
        sc = ax.c2p(6, vf(6))
        run = Line(sa, sb, color=A_C, stroke_width=4)
        rise = Line(sb, sc, color=A_C, stroke_width=4)
        rl = M(r"a = \text{slope} = 2", 30, color=A_C).next_to(rise, RIGHT, buff=0.15)
        strips = VGroup(*[
            Rectangle(width=ax.x_axis.unit_size * 0.25, height=abs(vf(t + 0.125)) * ax.y_axis.unit_size,
                      stroke_width=1, stroke_color=WHITE, fill_color=POS_C, fill_opacity=0.55)
            .move_to(ax.c2p(t + 0.125, vf(t + 0.125) / 2)) for t in np.arange(4.0, 7.0, 0.25)])
        stl = M(r"dx = v\,dt", 34, color=POS_C).move_to(ax.c2p(1.8, 5.0))
        right = VGroup(M(r"a = \text{slope of } v\text{-}t", 40, color=A_C),
                       M(r"\Delta x = \text{area under } v\text{-}t", 40, color=D_C))
        right.arrange(DOWN, buff=0.35, aligned_edge=LEFT).move_to(P(3.9, 1.8))
        with self.voiceover("Go one level down. Acceleration is the slope of the v t graph. And the area under v t "
                            "gives back the displacement, because each thin strip is v times d t.") as vo:
            self.play(FadeIn(hd), Create(ax), FadeIn(labs), run_time=1.0)
            self.play(Create(line), FadeIn(ll), run_time=0.9)
            self.play(Create(run), Create(rise), FadeIn(rl), FadeIn(right[0]), run_time=1.0)
            self.wait(vo.duration * 0.1)
            self.play(FadeOut(run), FadeOut(rise), FadeOut(rl), run_time=0.3)
            self.play(LaggedStart(*[FadeIn(s_) for s_ in strips], lag_ratio=0.08), FadeIn(stl), FadeIn(right[1]),
                      run_time=1.6)

        tt = ValueTracker(0.0)

        def neg():
            t = min(tt.get_value(), 3)
            if t < 0.02:
                return VectorizedPoint(ax.c2p(0, 0))
            return Polygon(ax.c2p(0, 0), ax.c2p(0, -6), ax.c2p(t, vf(t)), ax.c2p(t, 0), stroke_width=0,
                           fill_color=NEG_C, fill_opacity=0.5)

        def pos():
            t = tt.get_value()
            if t <= 3.02:
                return VectorizedPoint(ax.c2p(3, 0))
            return Polygon(ax.c2p(3, 0), ax.c2p(t, vf(t)), ax.c2p(t, 0), stroke_width=0, fill_color=POS_C,
                           fill_opacity=0.5)

        na = always_redraw(neg)
        pa = always_redraw(pos)
        marker = always_redraw(lambda: Dot(ax.c2p(tt.get_value(), vf(tt.get_value())), color=V_C, radius=0.08))

        def disp_v(t):
            return -6 * t + t * t

        def dist_v(t):
            return 6 * t - t * t if t <= 3 else 9 + (t - 3) ** 2

        rd = VGroup(M(r"u = -6\ \text{m/s},\ \ a = +2\ \text{m/s}^2", 36),
                    M(r"\text{displacement} =", 38, color=D_C), M(r"\text{distance} =", 38, color=A_C))
        rd.arrange(DOWN, buff=0.35, aligned_edge=LEFT).move_to(P(3.7, 1.3))
        dv = dnum(0, 1, 38, D_C, r"\text{m}")
        dv.add_updater(lambda m: m.set_value(disp_v(tt.get_value())).next_to(rd[1], RIGHT, buff=0.2))
        ds = dnum(0, 1, 38, A_C, r"\text{m}")
        ds.add_updater(lambda m: m.set_value(dist_v(tt.get_value())).next_to(rd[2], RIGHT, buff=0.2))
        n9 = M(r"-9", 34, color=NEG_C).move_to(ax.c2p(0.9, -3.0))
        p9 = M(r"+9", 34, color=POS_C).move_to(ax.c2p(5.0, 1.2))
        with self.voiceover("Start at minus six metres per second, with acceleration plus two. For three seconds the "
                            "area is below the axis: minus nine metres. Then a positive triangle eats it back. At six "
                            "seconds the particle is back where it started: displacement zero, distance eighteen "
                            "metres.") as vo:
            self.play(FadeOut(strips), FadeOut(stl), FadeOut(right), run_time=0.5)
            self.add(na, pa, marker)
            self.play(FadeIn(rd), FadeIn(dv), FadeIn(ds), FadeIn(marker), run_time=0.7)
            self.wait(vo.duration * 0.1)
            self.play(tt.animate.set_value(3), run_time=2.4, rate_func=linear)
            self.play(FadeIn(n9), run_time=0.4)
            self.wait(vo.duration * 0.05)
            self.play(tt.animate.set_value(6), run_time=2.6, rate_func=linear)
            self.play(FadeIn(p9), run_time=0.4)
        self.unhook()

        rule = VGroup(T("speeds up: v and a same sign", 28, color=GREEN),
                      T("slows down: opposite signs", 28, color=WARN))
        rule.arrange(DOWN, buff=0.25, aligned_edge=LEFT).move_to(P(3.8, 1.6))
        tp = Line(ax.c2p(2.2, vf(2.2)), ax.c2p(3.8, vf(3.8)), color=A_C, stroke_width=5)
        tdot = Dot(ax.c2p(3, 0), color=A_C, radius=0.1)
        tl = M(r"t = 3:\ \ v = 0,\ \ a = 2", 38, color=A_C).move_to(P(3.8, -0.6))
        tn = fit(T("zero velocity never means zero acceleration", 24, color=MUTED), 5.6).move_to(P(3.9, -2.3))
        with self.voiceover("Notice that a was positive the whole time, yet the particle first slowed down. The rule: "
                            "it speeds up when v and a have the same sign, and slows down when they differ. And at "
                            "three seconds, v is zero but a is still two. Zero velocity never means zero "
                            "acceleration.") as vo:
            self.play(FadeOut(rd), FadeOut(dv), FadeOut(ds), run_time=0.5)
            self.wait(vo.duration * 0.15)
            self.play(FadeIn(rule[0], shift=0.1 * UP), run_time=0.7)
            self.play(FadeIn(rule[1], shift=0.1 * UP), run_time=0.7)
            self.wait(vo.duration * 0.15)
            self.play(FadeIn(tdot), Create(tp), Write(tl), run_time=1.2)
            self.play(FadeIn(tn), run_time=0.6)

    # ------------------------------------------------------------ scene 4: SUVAT
    def s4(self):
        hd = header("1.4 · Equations of uniformly accelerated motion")
        ax, labs = axes([0, 5, 1], [0, 8, 1], 5.6, 4.6, P(-3.6, -0.5), "t", "v", nums=False)
        u, v, t1 = 2.0, 6.0, 4.0
        O = ax.c2p(0, 0)
        U = ax.c2p(0, u)
        V = ax.c2p(t1, v)
        Tt = ax.c2p(t1, 0)
        ln = Line(U, V, color=V_C, stroke_width=5)
        ul = M("u", 34, color=V_C).next_to(U, LEFT, buff=0.15)
        vl = M("v", 34, color=V_C).next_to(V, UR, buff=0.1)
        tl = M("t", 34).next_to(Tt, DOWN, buff=0.2)
        vline = DashedLine(V, Tt, color=MUTED, stroke_width=3)
        trap = Polygon(O, U, V, Tt, stroke_width=0, fill_color=D_C, fill_opacity=0.35)
        e1 = M(r"a = \frac{v - u}{t}\ \Rightarrow\ v = u + at", 42).move_to(P(2.9, 2.4))
        e2 = M(r"s = \text{area} = \frac{u + v}{2}\,t", 42, color=D_C).move_to(P(2.9, 1.1))
        with self.voiceover("When a is constant, the v t graph is a straight line from u to v. Its slope gives v "
                            "equals u plus a t. The area under it, a trapezium, is the displacement: s equals u "
                            "plus v over two, times t.") as vo:
            self.play(FadeIn(hd), Create(ax), FadeIn(labs), run_time=0.9)
            self.play(Create(ln), FadeIn(ul), FadeIn(vl), Create(vline), FadeIn(tl), run_time=1.0)
            self.wait(vo.duration * 0.12)
            self.play(Write(e1), run_time=1.4)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(trap), Write(e2), run_time=1.4)

        rect = Polygon(O, U, ax.c2p(t1, u), Tt, stroke_width=0, fill_color=V_C, fill_opacity=0.4)
        tri = Polygon(U, V, ax.c2p(t1, u), stroke_width=0, fill_color=A_C, fill_opacity=0.5)
        rl = M("ut", 34, color=INK).move_to(rect)
        br = BraceBetweenPoints(ax.c2p(t1, v), ax.c2p(t1, u), RIGHT, color=A_C)
        brl = M("at", 30, color=A_C).next_to(br, RIGHT, buff=0.1)
        trl = M(r"\tfrac12 t(at)", 30, color=INK).move_to(ax.c2p(2.7, 4.2))
        e3 = M(r"s = ut + \tfrac12 at^2", 42).move_to(P(2.9, -0.2))
        e4 = M(r"v^2 = u^2 + 2as", 42).move_to(P(2.9, -1.4))
        box = SurroundingRectangle(VGroup(e1, e2, e3, e4), buff=0.25, corner_radius=0.15, color=PRIMARY,
                                   stroke_width=3)
        only = T("constant a only", 26, color=WARN).next_to(box, DOWN, buff=0.2)
        with self.voiceover("Split the trapezium into a rectangle, u t, and a triangle, one half a t squared: s "
                            "equals u t plus one half a t squared. Eliminate t, and v squared equals u squared plus "
                            "two a s. All of these need a constant acceleration.") as vo:
            self.play(FadeOut(trap), FadeIn(rect), FadeIn(tri), run_time=0.8)
            self.play(FadeIn(rl), GrowFromCenter(br), FadeIn(brl), FadeIn(trl), run_time=1.0)
            self.play(Write(e3), run_time=1.2)
            self.wait(vo.duration * 0.12)
            self.play(Write(e4), run_time=1.2)
            self.play(Create(box), FadeIn(only), run_time=0.8)

        k = 0.072
        x0 = -5.8
        top = M(r"0 = u^2 - 2(5)s\ \Rightarrow\ s = \frac{u^2}{10}", 46).move_to(P(0, 2.5))
        bar1 = Rectangle(width=40 * k, height=0.5, stroke_width=0, fill_color=V_C, fill_opacity=0.9)
        bar1.move_to(P(x0, 0.9), aligned_edge=LEFT)
        bar2 = Rectangle(width=160 * k, height=0.5, stroke_width=0, fill_color=X_C, fill_opacity=0.9)
        bar2.move_to(P(x0, -0.5), aligned_edge=LEFT)
        b1l = M(r"20\ \text{m/s}:\ 40\ \text{m}", 34, color=V_C).next_to(bar1, RIGHT, buff=0.25)
        b2l = M(r"40\ \text{m/s}:\ 160\ \text{m}", 34, color=WHITE).move_to(bar2).shift(2.5 * RIGHT)
        x4 = T("double the speed, four times the distance", 26, color=X_C).move_to(P(0, -1.4))
        reac = Rectangle(width=10 * k, height=0.5, stroke_width=0, fill_color=MUTED, fill_opacity=0.9)
        reac.move_to(P(x0, -2.6), aligned_edge=LEFT)
        brk = Rectangle(width=40 * k, height=0.5, stroke_width=0, fill_color=V_C, fill_opacity=0.9)
        brk.next_to(reac, RIGHT, buff=0)
        rcl = M(r"10 + 40 = 50\ \text{m}\quad(0.5\ \text{s reaction at } 20\ \text{m/s})", 32).next_to(
            brk, RIGHT, buff=0.3)
        with self.voiceover("A car at twenty metres per second brakes at five metres per second squared. Zero equals "
                            "four hundred minus ten s, so it stops in forty metres. At forty metres per second it "
                            "needs one hundred and sixty. Double the speed, four times the distance. Add half a "
                            "second of reaction time, and it rolls ten metres before the brakes even bite.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(Write(top), run_time=1.4)
            self.play(GrowFromEdge(bar1, LEFT), FadeIn(b1l), run_time=1.0)
            self.wait(vo.duration * 0.1)
            self.play(GrowFromEdge(bar2, LEFT), FadeIn(b2l), run_time=1.4)
            self.play(FadeIn(x4), run_time=0.6)
            self.wait(vo.duration * 0.12)
            self.play(GrowFromEdge(reac, LEFT), run_time=0.6)
            self.play(GrowFromEdge(brk, LEFT), FadeIn(rcl), run_time=0.9)

        blk = Rectangle(width=6.0, height=2.0, color=INK, stroke_width=3).set_fill(ManimColor("#F3D9C9"), 1)
        blk.move_to(P(0.5, 0.6))
        left = blk.get_left()[0]
        cm = 1.2
        bullet = Triangle(color=INK, stroke_width=2).set_fill(MUTED, 1).rotate(-PI / 2).scale(0.18)
        bullet.move_to(P(left - 2.5, 0.6))
        m3 = DashedLine(P(left + 3 * cm, -0.6), P(left + 3 * cm, 1.8), color=A_C, stroke_width=3)
        m4 = DashedLine(P(left + 4 * cm, -0.6), P(left + 4 * cm, 1.8), color=GREEN, stroke_width=3)
        l3 = M(r"3\ \text{cm}:\ u \to \tfrac u2", 32, color=A_C).next_to(m3, UP, buff=0.1).shift(1.3 * LEFT)
        l4 = M(r"+1\ \text{cm}", 32, color=GREEN).next_to(m4, UP, buff=0.1).shift(0.5 * RIGHT)
        bq = M(r"\left(\tfrac u2\right)^2 = u^2 - 2a(3)\ \Rightarrow\ 2a = \tfrac{u^2}{4}\ \text{per cm}", 38)
        bq.move_to(P(0, -1.8))
        bq2 = M(r"0 = \tfrac{u^2}{4} - 2a\,x\ \Rightarrow\ x = 1\ \text{cm}", 38, color=GREEN).move_to(P(0, -2.9))
        with self.voiceover("A JEE classic. A bullet loses half its speed in three centimetres of wood. Use v squared "
                            "equals u squared plus two a s twice, and the ratio does all the work: it goes only one "
                            "centimetre further.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(FadeIn(blk), FadeIn(bullet), run_time=0.6)
            self.play(bullet.animate.move_to(P(left + 3 * cm, 0.6)), Create(m3), run_time=1.2)
            self.play(FadeIn(l3), Write(bq), run_time=1.5)
            self.wait(vo.duration * 0.1)
            self.play(bullet.animate.move_to(P(left + 4 * cm, 0.6)), Create(m4), FadeIn(l4), run_time=1.0)
            self.play(Write(bq2), run_time=1.2)

    # ------------------------------------------------------------ scene 5: free fall
    def s5(self):
        hd = header("1.5 · Free fall and vertical motion")
        hax = NumberLine(x_range=[0, 20, 5], length=5.4, rotation=PI / 2, color=INK, include_numbers=True,
                         font_size=24, label_direction=LEFT,
                         decimal_number_config={"color": INK, "num_decimal_places": 0})
        hax.move_to(P(-5.6, -0.4))
        hl = M(r"y\ (\text{m})", 26, color=MUTED).next_to(hax, UP, buff=0.15)
        ground = Line(P(-6.2, hax.n2p(0)[1]), P(-3.0, hax.n2p(0)[1]), color=MUTED, stroke_width=4)
        tt = ValueTracker(0.0)
        y = lambda t: 20 * t - 5 * t * t  # noqa: E731
        vv = lambda t: 20 - 10 * t  # noqa: E731
        bx = -4.3

        def bpos():
            return P(bx, hax.n2p(y(tt.get_value()))[1] + 0.2)

        ball = always_redraw(lambda: Circle(radius=0.2, color=INK, stroke_width=2).set_fill(X_C, 1).move_to(bpos()))

        def varrow():
            v = vv(tt.get_value())
            if abs(v) < 0.6:
                return VectorizedPoint(bpos())
            return vec(bpos(), bpos() + 0.075 * v * UP, V_C, sw=5)

        va = always_redraw(varrow)
        ga = always_redraw(lambda: vec(bpos() + 0.75 * RIGHT, bpos() + 0.75 * RIGHT + 0.9 * DOWN, A_C, sw=5))
        gl = always_redraw(lambda: M("g", 30, color=A_C).next_to(bpos() + 0.75 * RIGHT + 0.45 * DOWN, RIGHT,
                                                                buff=0.1))
        ax, labs = axes([0, 4, 1], [-20, 20, 10], 5.2, 4.6, P(2.6, -0.4), "t\\ (\\text{s})", "v\\ (\\text{m/s})")
        vt = always_redraw(lambda: ax.plot(vv, x_range=[0, max(tt.get_value(), 0.01)], color=V_C, stroke_width=5))
        conv = M(r"\text{up} = +,\quad a = -10\ \text{m/s}^2\ \text{always}", 36, color=A_C).move_to(P(2.4, 2.75))
        with self.voiceover("Near the Earth every body falls with the same acceleration, g, straight down, whether "
                            "it is rising, falling, or at rest for an instant. Take up as positive, and a is minus "
                            "ten, for the whole flight.") as vo:
            self.add(ball, va, ga, gl, vt)
            self.play(FadeIn(hd), Create(hax), FadeIn(hl), Create(ground), FadeIn(ball), FadeIn(ga), FadeIn(gl),
                      run_time=1.0)
            self.play(Create(ax), FadeIn(labs), run_time=0.8)
            self.wait(vo.duration * 0.25)
            self.play(Write(conv), run_time=1.4)

        tl = M(r"t =", 34).move_to(P(-2.4, 2.0))
        tv = dnum(0, 1, 34, INK, r"\text{s}")
        tv.add_updater(lambda m: m.set_value(tt.get_value()).next_to(tl, RIGHT, buff=0.15))
        vl = M(r"v =", 34, color=V_C).move_to(P(-2.4, 1.4))
        vval = dnum(20, 0, 34, V_C, r"\text{m/s}")
        vval.add_updater(lambda m: m.set_value(vv(tt.get_value())).next_to(vl, RIGHT, buff=0.15))
        topn = M(r"\text{top: } v = 0,\ a = -10", 34, color=A_C).move_to(ax.c2p(2.9, 15))
        res = M(r"t_\uparrow = \tfrac ug = 2\ \text{s},\ \ H = \tfrac{u^2}{2g} = 20\ \text{m},\ \ T = \tfrac{2u}{g} = 4\ \text{s}",
                34).move_to(P(1.6, -3.3))
        fit(res, 9.0)
        with self.voiceover("Throw a ball up at twenty metres per second. It rises for two seconds, to twenty metres, "
                            "and is back at four seconds, moving down at twenty. At the top v is zero, but a is still "
                            "minus ten. If a were zero there, the ball would hang in the air.") as vo:
            self.play(FadeIn(tl), FadeIn(tv), FadeIn(vl), FadeIn(vval), run_time=0.5)
            self.play(tt.animate.set_value(2), run_time=3.0, rate_func=linear)
            self.play(FadeIn(topn), Flash(bpos(), color=A_C), run_time=0.8)
            self.play(tt.animate.set_value(4), run_time=3.0, rate_func=linear)
            self.play(Write(res), run_time=1.4)
        self.unhook()

        tower = Rectangle(width=1.0, height=25 * 0.11, color=INK, stroke_width=3).set_fill(ManimColor("#EADFD8"), 1)
        tower.move_to(P(-4.6, -3.3), aligned_edge=DOWN)
        gnd = Line(P(-6.5, -3.3), P(-2.6, -3.3), color=MUTED, stroke_width=4)
        topp = tower.get_top()
        upp = DashedLine(topp + 0.25 * RIGHT + 0.05 * UP, topp + 0.25 * RIGHT + 20 * 0.11 * UP, color=V_C,
                         stroke_width=3)
        down = DashedLine(topp + 0.75 * RIGHT + 20 * 0.11 * UP, P(topp[0] + 0.75, -3.3), color=V_C, stroke_width=3)
        h25 = M(r"25\ \text{m}", 30).next_to(tower, LEFT, buff=0.15)
        u20 = M(r"u = 20", 28, color=V_C).next_to(upp, LEFT, buff=0.1).shift(0.6 * UP)
        q = VGroup(M(r"-25 = 20t - 5t^2", 44), M(r"t^2 - 4t - 5 = 0", 44), M(r"(t - 5)(t + 1) = 0", 44))
        q.arrange(DOWN, buff=0.3, aligned_edge=LEFT).move_to(P(1.8, 1.5))
        ok = M(r"t = 5\ \text{s}", 46, color=GREEN).move_to(P(0.6, -0.9))
        no = M(r"t = -1\ \text{s}", 46, color=WARN).move_to(P(3.6, -0.9))
        nox = cross_mark().next_to(no, RIGHT, buff=0.2)
        non = T("before it was thrown", 22, color=WARN).next_to(no, DOWN, buff=0.2)
        with self.voiceover("From the top of a twenty five metre tower, the ground is at minus twenty five. So minus "
                            "twenty five equals twenty t minus five t squared. One equation covers the whole flight. "
                            "The roots are five and minus one. Reject minus one second: the ball had not been thrown "
                            "yet.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(FadeIn(tower), Create(gnd), FadeIn(h25), run_time=0.7)
            self.play(Create(upp), FadeIn(u20), run_time=0.7)
            self.play(Create(down), run_time=0.7)
            self.play(Write(q[0]), run_time=1.0)
            self.wait(vo.duration * 0.1)
            self.play(Write(q[1]), run_time=0.9)
            self.play(Write(q[2]), run_time=0.9)
            self.play(FadeIn(ok), FadeIn(no), run_time=0.6)
            self.play(FadeIn(nox), FadeIn(non), run_time=0.6)

        s0 = 2.9
        k = 0.075
        x = -3.0
        balls = VGroup(*[Circle(radius=0.15, color=INK, stroke_width=2).set_fill(X_C, 1).move_to(P(x, s0 - k * d))
                         for d in (0, 5, 20, 45, 80)])
        tls = VGroup(*[T(f"{n} s", 20, color=MUTED).next_to(b, LEFT, buff=0.3) for n, b in enumerate(balls)])
        gaps = VGroup()
        for i, d in enumerate((5, 15, 25, 35)):
            a, b = balls[i].get_center(), balls[i + 1].get_center()
            br = BraceBetweenPoints(a, b, RIGHT, color=A_C)
            lab = M(rf"{d}\ \text{{m}}", 30, color=A_C).next_to(br, RIGHT, buff=0.1)
            gaps.add(VGroup(br, lab))
        ratio = M(r"1 : 3 : 5 : 7", 60, color=PRIMARY).move_to(P(3.2, 0.8))
        rn = M(r"s_n = \tfrac g2(2n - 1)", 40).next_to(ratio, DOWN, buff=0.4)
        with self.voiceover("And Galileo's pattern. Dropped from rest, a body falls five, fifteen, twenty five, "
                            "thirty five metres in successive seconds: the odd numbers, one, three, five, seven.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(FadeIn(balls[0]), FadeIn(tls[0]), run_time=0.4)
            for i in range(4):
                self.play(FadeIn(balls[i + 1]), FadeIn(tls[i + 1]), FadeIn(gaps[i]), run_time=0.7)
            self.play(Write(ratio), run_time=1.0)
            self.play(FadeIn(rn), run_time=0.6)

    # ------------------------------------------------------------ scene 6: calculus
    def s6(self):
        hd = header("1.6 · Calculus of kinematics")
        def box(tex, color):
            m = M(tex, 50, color=color)
            r = RoundedRectangle(width=1.4, height=1.0, corner_radius=0.15, color=color, stroke_width=3)
            return VGroup(r, m.move_to(r))

        bx, bv, ba = box("x", X_C), box("v", V_C), box("a", A_C)
        chain = VGroup(bx, bv, ba).arrange(RIGHT, buff=2.4).move_to(P(0, 1.0))
        dn = VGroup(vec(bx.get_right() + 0.2 * UP, bv.get_left() + 0.2 * UP, INK, sw=4),
                    vec(bv.get_right() + 0.2 * UP, ba.get_left() + 0.2 * UP, INK, sw=4))
        up = VGroup(vec(bv.get_left() + 0.25 * DOWN, bx.get_right() + 0.25 * DOWN, MUTED, sw=4),
                    vec(ba.get_left() + 0.25 * DOWN, bv.get_right() + 0.25 * DOWN, MUTED, sw=4))
        dnl = VGroup(*[M(r"\tfrac{d}{dt}", 32).next_to(a, UP, buff=0.1) for a in dn])
        upl = VGroup(*[M(r"\int dt", 32, color=MUTED).next_to(a, DOWN, buff=0.1) for a in up])
        ex = M(r"x(t) = t^3 - 6t^2 + 9t", 50, color=X_C).move_to(P(0, -2.0))
        with self.voiceover("When a is not constant, those equations fail. But the definitions never change. "
                            "Differentiate to go down the chain. Integrate to come back up. Take x equals t cubed, "
                            "minus six t squared, plus nine t.") as vo:
            self.play(FadeIn(hd), FadeIn(chain), run_time=0.8)
            self.wait(vo.duration * 0.15)
            self.play(LaggedStart(*[GrowArrow(a) for a in dn], lag_ratio=0.3), FadeIn(dnl), run_time=1.2)
            self.play(LaggedStart(*[GrowArrow(a) for a in up], lag_ratio=0.3), FadeIn(upl), run_time=1.2)
            self.wait(vo.duration * 0.05)
            self.play(Write(ex), run_time=1.3)

        ax, labs = axes([0, 4.5, 1], [-4, 10, 2], 6.2, 5.0, P(-3.1, -0.6), "t\\ (\\text{s})", "", nums=True)
        xf = lambda t: t ** 3 - 6 * t * t + 9 * t  # noqa: E731
        vf = lambda t: 3 * t * t - 12 * t + 9  # noqa: E731
        cx = ax.plot(xf, x_range=[0, 4.3], color=X_C, stroke_width=5)
        cv = ax.plot(vf, x_range=[0, 4.25], color=V_C, stroke_width=4)
        lx = M("x", 34, color=X_C).next_to(ax.c2p(4.3, xf(4.3)), RIGHT, buff=0.1)
        lv = M("v", 34, color=V_C).next_to(ax.c2p(4.25, vf(4.25)), LEFT, buff=0.15)
        guides = VGroup(*[DashedLine(ax.c2p(t, -4), ax.c2p(t, 10), color=MUTED, stroke_width=2) for t in (1, 3)])
        zs = VGroup(*[Dot(ax.c2p(t, 0), color=V_C, radius=0.09) for t in (1, 3)])
        r1 = M(r"v = 3t^2 - 12t + 9 = 3(t-1)(t-3)", 38, color=V_C)
        r2 = M(r"v = 0 \text{ at } t = 1,\ 3\ \text{s: turning points}", 34)
        r3 = M(r"x:\ 0 \to 4 \to 0 \to 4\ \text{m}", 38, color=X_C)
        r4 = M(r"\text{displacement } 4\ \text{m},\ \text{distance } 12\ \text{m}", 34, color=D_C)
        col = VGroup(r1, r2, r3, r4).arrange(DOWN, buff=0.35, aligned_edge=LEFT).move_to(P(3.6, 0.6))
        fit(col, 6.2).move_to(P(3.65, 0.6))
        with self.voiceover("Differentiate: v equals three, t minus one, t minus three. It is zero at one second and "
                            "at three seconds, the turning points. The particle goes out to four metres, back to "
                            "zero, and out to four again. Displacement four metres. Distance twelve.") as vo:
            self.play(FadeOut(chain), FadeOut(dn), FadeOut(up), FadeOut(dnl), FadeOut(upl), FadeOut(ex), run_time=0.5)
            self.play(Create(ax), FadeIn(labs), Create(cx), FadeIn(lx), run_time=1.2)
            self.play(Create(cv), FadeIn(lv), Write(r1), run_time=1.4)
            self.wait(vo.duration * 0.05)
            self.play(Create(guides), FadeIn(zs), FadeIn(r2), run_time=1.0)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(r3), run_time=0.8)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(r4), run_time=0.8)

        c1 = M(r"a = \frac{dv}{dt} = \frac{dv}{dx}\frac{dx}{dt} = v\,\frac{dv}{dx}", 50, color=A_C).move_to(P(0, 2.2))
        c1n = T("the same acceleration, by the chain rule", 26, color=MUTED).next_to(c1, DOWN, buff=0.3)
        c2 = M(r"a = -kv\ \Rightarrow\ v = u\,e^{-kt},\quad x \to \frac{u}{k}", 46).move_to(P(0, -0.4))
        bax, _ = axes([0, 5, 1], [0, 1.2, 1], 5.0, 1.5, P(0, -2.6), "t", "", nums=False)
        dec = bax.plot(lambda t: np.exp(-0.9 * t), x_range=[0, 5], color=V_C, stroke_width=4)
        decl = T("speed decays exponentially", 22, color=MUTED).next_to(bax, RIGHT, buff=0.2)
        decl.shift(0.3 * UP)
        with self.voiceover("If a depends on position, use the chain rule: a equals v d v by d x. It is the same "
                            "acceleration, rewritten. For a boat with drag a equals minus k v, the speed decays as u e "
                            "to the minus k t, and the boat coasts only u over k.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hd], run_time=0.5)
            self.play(Write(c1), run_time=1.6)
            self.play(FadeIn(c1n), run_time=0.6)
            self.wait(vo.duration * 0.12)
            self.play(Write(c2), run_time=1.6)
            self.play(Create(bax), Create(dec), FadeIn(decl), run_time=1.2)

    # ------------------------------------------------------------ scene 7: recap
    def s7(self):
        title = T("Chapter 1 in five lines", 38, color=PRIMARY, weight="BOLD").move_to(P(0, 3.2))
        lines = [
            (r"\text{distance} \ge |\Delta x|", "average speed: distance / time"),
            (r"v = \tfrac{dx}{dt},\ \ a = \tfrac{dv}{dt}", "slopes go down the chain"),
            (r"\Delta x = \text{area under } v\text{-}t", "areas come back up"),
            (r"v^2 = u^2 + 2as", "constant a only"),
            (r"a = -g\ \text{(up positive)}", "free fall, rising or falling"),
        ]
        rows = VGroup()
        for i, (tex, note) in enumerate(lines):
            m = M(tex, 38)
            nt = T(note, 24, color=MUTED)
            num = T(f"{i + 1}.", 28, color=PRIMARY, weight="BOLD")
            rows.add(VGroup(num, m, nt))
        rows.arrange(DOWN, buff=0.45, aligned_edge=LEFT).move_to(P(0, -0.1))
        for r in rows:
            r[0].set_x(-6.0)
            r[1].next_to(r[0], RIGHT, buff=0.3)
            r[2].move_to(P(0, r[1].get_y()), aligned_edge=LEFT).set_x(1.4, direction=LEFT)
        with self.voiceover("To recap. Displacement is a signed change in position; distance is path length. "
                            "Velocity is the slope of x t, and acceleration is the slope of v t.") as vo:
            self.play(FadeIn(title), run_time=0.6)
            self.play(FadeIn(rows[0], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.25)
            self.play(FadeIn(rows[1], shift=0.15 * UP), run_time=0.7)
        with self.voiceover("Areas undo slopes. The four equations hold only for constant acceleration. And in free "
                            "fall, a is minus g the whole way, even at the top.") as vo:
            self.play(FadeIn(rows[2], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(rows[3], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(rows[4], shift=0.15 * UP), run_time=0.7)
        with self.voiceover("Try the mastery quiz. Then chapter two frees the particle into a plane: split the motion "
                            "into x and y, solve two straight lines, and let time tie them together.") as vo:
            nxt = T("Next: Chapter 2 · Motion in a Plane", 32, color=PRIMARY).move_to(P(0, -3.4))
            self.wait(vo.duration * 0.3)
            self.play(FadeIn(nxt, shift=0.2 * UP), run_time=0.8)
