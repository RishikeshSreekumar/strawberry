import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import math  # noqa: E402

import numpy as np  # noqa: E402

# Chapter colour roles (light background, so "yellow" is a deep gold).
SIN_C = ManimColor("#2B6CB0")  # sine = blue
COS_C = GREEN  # cosine = green
TAN_C = ACCENT  # tangent = orange
HL = ManimColor("#D19A00")  # highlight (gold)
WARN = PRIMARY  # red
TEAL = SECONDARY


# ---------------------------------------------------------------- helpers
def pi_tex(k: int) -> str:
    """TeX for k * pi/2."""
    if k == 0:
        return "0"
    sign = "-" if k < 0 else ""
    k = abs(k)
    if k % 2 == 0:
        n = k // 2
        return sign + (r"\pi" if n == 1 else f"{n}\\pi")
    return sign + (r"\frac{\pi}{2}" if k == 1 else f"\\frac{{{k}\\pi}}{{2}}")


def make_axes(x_range=(-6.5, 6.5), y_range=(-3.5, 3.5), x_length=12, y_length=5.5, *,
              x_ticks="pi", pi_every=1, include_zero=False, x_step=1, y_step=1,
              y_labels=True, font=24):
    ax = Axes(
        x_range=[x_range[0], x_range[1], 1], y_range=[y_range[0], y_range[1], 1],
        x_length=x_length, y_length=y_length,
        axis_config={"color": MUTED, "stroke_width": 2, "include_tip": False, "include_ticks": False},
    )
    deco = VGroup()
    xl, yl = VGroup(), VGroup()
    tl = 0.07
    if x_ticks == "pi":
        kmin = math.ceil(x_range[0] / (PI / 2) - 1e-9)
        kmax = math.floor(x_range[1] / (PI / 2) + 1e-9)
        for k in range(kmin, kmax + 1):
            x = k * PI / 2
            p = ax.c2p(x, 0)
            deco.add(Line(p + tl * DOWN, p + tl * UP, color=MUTED, stroke_width=2))
            if k % pi_every == 0 and (k != 0 or include_zero):
                xl.add(MathTex(pi_tex(k), font_size=font, color=MUTED).next_to(p, DOWN, buff=0.14))
    elif x_ticks == "num":
        x = math.ceil(x_range[0])
        while x <= x_range[1] + 1e-9:
            p = ax.c2p(x, 0)
            deco.add(Line(p + tl * DOWN, p + tl * UP, color=MUTED, stroke_width=2))
            if x != 0 or include_zero:
                xl.add(MathTex(f"{x:g}", font_size=font, color=MUTED).next_to(p, DOWN, buff=0.14))
            x += x_step
    if y_labels:
        y = math.ceil(y_range[0])
        while y <= y_range[1] + 1e-9:
            if y != 0:
                p = ax.c2p(0, y)
                deco.add(Line(p + tl * LEFT, p + tl * RIGHT, color=MUTED, stroke_width=2))
                yl.add(MathTex(f"{y:g}", font_size=font, color=MUTED).next_to(p, LEFT, buff=0.12))
            y += y_step
    deco.add(xl, yl)
    grp = VGroup(ax, deco)
    grp.xlabels = xl
    return ax, grp


def plotf(ax, f, a, b, n=240, **kw):
    if b - a < 1e-3:
        b = a + 1e-3
    kw.setdefault("stroke_width", 4)
    return ax.plot(f, x_range=[a, b, (b - a) / n], **kw)


def tan_branches(ax, xmin, xmax, ymax, **kw):
    g = VGroup()
    w = math.atan(ymax)
    for k in range(-4, 5):
        a, b = max(k * PI - w, xmin), min(k * PI + w, xmax)
        if b - a > 0.02:
            g.add(plotf(ax, np.tan, a, b, n=200, **kw))
    return g


def card(mob, pad=0.25, color=MUTED, fill=WHITE, opacity=0.85):
    box = SurroundingRectangle(mob, buff=pad, corner_radius=0.15, color=color, stroke_width=2)
    box.set_fill(fill, opacity=opacity)
    return VGroup(box, mob)


def T(s, size=30, **kw):
    return Text(s, font_size=size, **kw)


def M(s, size=40, **kw):
    return MathTex(s, font_size=size, **kw)


def check():
    return MathTex(r"\checkmark", color=GREEN, font_size=48)


def cross_mark():
    return MathTex(r"\times", color=WARN, font_size=56)


class TrigCh2Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Trigonometry",
            "Chapter 2 · Trig Functions as Functions",
            "Chapter two. Trig functions as functions.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7,
                     self.s8, self.s9, self.s10, self.s11):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ circle kit
    def circle_kit(self, center, R):
        circ = Circle(radius=R, color=INK, stroke_width=3).move_to(center)
        cross = VGroup(
            Line(center + (R + 0.3) * LEFT, center + (R + 0.3) * RIGHT, color=MUTED, stroke_width=2),
            Line(center + (R + 0.3) * DOWN, center + (R + 0.3) * UP, color=MUTED, stroke_width=2),
        )
        return circ, cross

    # ------------------------------------------------------------ scene 1
    def s1(self):
        header = T("Chapter 2 · Trig Functions as Functions", 40, weight="BOLD")
        a = MathTex(r"\theta", r"\;\longmapsto\;", r"\sin", r"\theta", font_size=110)
        b = MathTex("x", r"\;\longmapsto\;", r"\sin", "x", font_size=110)
        with self.voiceover("So far, sine has been a lookup. Angle in, number out. "
                            "That is exactly what a function is. So let's plot it.") as vo:
            self.play(FadeIn(header), run_time=0.8)
            self.play(header.animate.scale(0.6).to_corner(UL, buff=0.4), run_time=0.8)
            self.play(Write(a), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.35 - 2.8))
            self.play(TransformMatchingTex(a, b), run_time=1.3)
            b[0].set_color(HL)
            b[3].set_color(HL)
            self.play(Indicate(b[0], color=HL, scale_factor=1.4), Indicate(b[3], color=HL, scale_factor=1.4))

    # ------------------------------------------------------------ scene 2
    def s2(self):
        C = np.array([-4.5, 0, 0])
        R = 1.3
        ax, graph = make_axes((0, 2 * PI + 0.2), (-1.5, 1.5), 7, 3.9, include_zero=True)
        graph.shift(np.array([-2.2, 0, 0]) - ax.c2p(0, 0))
        circ, cross = self.circle_kit(C, R)
        th = ValueTracker(0.0)

        def P():
            t = th.get_value()
            return C + R * np.array([np.cos(t), np.sin(t), 0])

        dot = always_redraw(lambda: Dot(P(), color=WARN, radius=0.09))
        seg = always_redraw(lambda: Line([P()[0], C[1], 0], P(), color=SIN_C, stroke_width=6))
        conn = always_redraw(lambda: DashedLine(
            P(), ax.c2p(th.get_value(), np.sin(th.get_value())), color=MUTED, stroke_width=2))
        trace = always_redraw(lambda: plotf(ax, np.sin, 0, th.get_value(), color=SIN_C))
        gdot = always_redraw(lambda: Dot(ax.c2p(th.get_value(), np.sin(th.get_value())),
                                         color=SIN_C, radius=0.07))

        with self.voiceover("Picture a point walking anticlockwise round the unit circle, "
                            "its height recorded on a strip of paper pulled steadily right.") as vo:
            self.play(Create(cross), Create(circ), run_time=1.0)
            self.add(seg, dot)
            self.play(FadeIn(graph), run_time=1.0)
            self.add(trace, conn, gdot)
            self.play(th.animate.set_value(0.6), run_time=vo.duration * 0.3, rate_func=there_and_back)

        marks = VGroup()
        with self.voiceover("The motion unrolls into y equals sine of x. It rises to one at pi over two, "
                            "returns to zero at pi, falls to negative one at three pi over two, "
                            "and is back at zero at two pi. Then it repeats.") as vo:
            stops = [(PI / 2, "1", UP), (PI, "0", UR), (3 * PI / 2, "-1", DOWN), (2 * PI, "0", UR)]
            for i, (x, lab, d) in enumerate(stops):
                self.play(th.animate.set_value(x), run_time=vo.duration * (0.2 if i == 0 else 0.15),
                          rate_func=linear)
                m = VGroup(Dot(ax.c2p(x, np.sin(x)), color=HL, radius=0.09),
                           MathTex(lab, font_size=32, color=INK))
                m[1].next_to(m[0], d, buff=0.12)
                marks.add(m)
                self.play(FadeIn(m, scale=0.6), run_time=0.4)
            lab = M(r"y = \sin x", 44, color=SIN_C).next_to(ax.c2p(PI, 1.5), UP, buff=0.1)
            ext = plotf(ax, np.sin, 2 * PI, 2 * PI + 0.8, color=SIN_C, stroke_opacity=0.35)
            self.play(Write(lab), Create(ext), run_time=1.2)

        trace.clear_updaters()
        with self.voiceover("Two habits change. Radians are the default, so pi is just a spot on the axis. "
                            "And the variable is x: sine is now a function to graph, transform, "
                            "and later differentiate.") as vo:
            self.play(FadeOut(VGroup(circ, cross, dot, seg, conn, gdot)), run_time=0.6)
            gg = VGroup(graph, trace, marks, lab, ext)
            self.play(gg.animate.scale(0.9).move_to([0, 1.35, 0]), run_time=0.8)
            c1 = card(T("1. Radians are the default: π is just a number on the axis", 28))
            c2 = card(T("2. The variable is x", 28))
            VGroup(c1, c2).arrange(DOWN, buff=0.25).move_to([0, -2.6, 0])
            self.play(FadeIn(c1, shift=UP * 0.2), run_time=0.6)
            # ghost degree axis cross-fading into radians
            rad_labels = graph.xlabels
            deg = VGroup()
            for k, dtxt in enumerate([r"0^\circ", r"90^\circ", r"180^\circ", r"270^\circ", r"360^\circ"]):
                deg.add(MathTex(dtxt, font_size=22, color=MUTED).next_to(ax.c2p(k * PI / 2, 0), DOWN, buff=0.14))
            self.play(FadeOut(rad_labels), FadeIn(deg), run_time=0.8)
            self.wait(0.6)
            self.play(FadeOut(deg), FadeIn(rad_labels), run_time=0.8)
            self.play(FadeIn(c2, shift=UP * 0.2), run_time=0.6)
            self.play(Indicate(c2[1], color=HL), run_time=0.8)

    # ------------------------------------------------------------ scene 3
    def s3(self):
        C = np.array([-4.5, 0, 0])
        R = 1.3
        ax, graph = make_axes((0, 2 * PI + 0.2), (-1.5, 1.5), 7, 3.9, include_zero=True)
        graph.shift(np.array([-2.2, 0, 0]) - ax.c2p(0, 0))
        circ, cross = self.circle_kit(C, R)
        th = ValueTracker(0.0)

        def P():
            t = th.get_value()
            return C + R * np.array([np.cos(t), np.sin(t), 0])

        dot = always_redraw(lambda: Dot(P(), color=WARN, radius=0.09))
        gseg = always_redraw(lambda: Line(C, [P()[0], C[1], 0], color=COS_C, stroke_width=6))

        def upright(t):
            if abs(np.cos(t)) < 1e-3:
                return Dot(ax.c2p(t, 0), color=COS_C, radius=0.07)
            return Line(ax.c2p(t, 0), ax.c2p(t, np.cos(t)), color=COS_C, stroke_width=6)

        def src(t):
            if abs(np.cos(t)) < 1e-3:
                return Dot(C, color=COS_C, radius=0.07)
            return Line(C, C + R * np.cos(t) * RIGHT, color=COS_C, stroke_width=6)

        snaps = VGroup()
        with self.voiceover("Now record the horizontal coordinate, standing it upright on the graph. "
                            "That is cosine. Same shape, but at angle zero the point is at coordinates "
                            "one and zero, so cosine starts at one.") as vo:
            d = vo.duration
            self.play(FadeIn(circ, cross, graph), run_time=0.8)
            self.add(gseg, dot)
            # snapshot at 0
            s0 = upright(0)
            self.play(TransformFromCopy(src(0), s0), run_time=1.0)
            snaps.add(s0)
            # snapshots at pi/2 and pi
            for t in (PI / 2, PI):
                self.play(th.animate.set_value(t), run_time=0.7)
                s = upright(t)
                self.play(TransformFromCopy(src(t), s), run_time=0.8)
                snaps.add(s)
            self.play(th.animate.set_value(0), snaps.animate.set_opacity(0.3), run_time=0.7)
            # angle 0 detail
            lab0 = M(r"\text{angle } 0:\ (1,0)", 32).next_to(circ, UP, buff=0.3)
            self.play(FadeIn(lab0), run_time=0.6)
            arrow = CurvedArrow(C + R * RIGHT + 0.05 * UP, ax.c2p(0, 1) + 0.1 * LEFT, angle=-PI / 3,
                                color=HL, stroke_width=3, tip_length=0.18)
            self.play(Create(arrow), run_time=0.8)
            ydot = Dot(ax.c2p(0, 1), color=HL, radius=0.09)
            lab1 = M(r"\cos 0 = 1", 34, color=COS_C).next_to(ydot, UR, buff=0.1)
            self.play(FadeIn(ydot), Write(lab1), run_time=0.8)
            used = 0.8 + 1.0 + 2 * 1.5 + 0.7 + 0.6 + 0.8 + 0.8
            self.wait(max(0.1, d - used - 4.6))
            self.play(FadeOut(arrow), FadeOut(lab0), run_time=0.4)
            up = always_redraw(lambda: upright(th.get_value()))
            tr = always_redraw(lambda: plotf(ax, np.cos, 0, th.get_value(), color=COS_C))
            self.add(tr, up)
            self.play(th.animate.set_value(2 * PI), run_time=3.2, rate_func=linear)
            tr.clear_updaters()
            ylab = M(r"y = \cos x", 44, color=COS_C).next_to(ax.c2p(PI, 1.5), UP, buff=0.1)
            self.play(Write(ylab), run_time=0.8)
        up.clear_updaters()
        self.clear_scene()

        ax, graph = make_axes()
        f = plotf(ax, np.sin, -6.5, 6.5, n=400, color=SIN_C)
        x1, x2 = 1 - 2 * PI, 1.0
        s = np.sin(1)
        d1, d2 = Dot(ax.c2p(x1, s), color=WARN), Dot(ax.c2p(x2, s), color=WARN)
        arr = DoubleArrow(ax.c2p(x1, s), ax.c2p(x2, s), buff=0.1, color=HL, stroke_width=4,
                          tip_length=0.2)
        alab = M(r"2\pi", 38, color=INK).next_to(arr, UP, buff=0.1)
        form = M(r"\sin(x + 2\pi) = \sin x", 48).to_edge(UP, buff=0.45)
        sc = np.array([5.3, 2.2, 0])
        mc, mcross = self.circle_kit(sc, 0.6)
        ang = ValueTracker(1.0)
        md = always_redraw(lambda: Dot(sc + 0.6 * np.array([np.cos(ang.get_value()), np.sin(ang.get_value()), 0]),
                                       color=WARN, radius=0.08))
        with self.voiceover("It repeats every two pi because the circle closes: x and x plus two pi are "
                            "coterminal. Periodicity is coterminal angles, drawn.") as vo:
            self.play(FadeIn(graph), Create(f), run_time=1.2)
            self.play(FadeIn(d1), FadeIn(d2), GrowFromCenter(arr), FadeIn(alab), run_time=1.0)
            self.play(Write(form), FadeIn(mc, mcross), run_time=1.0)
            self.add(md)
            trail = TracedPath(md.get_center, stroke_color=WARN, stroke_width=2, stroke_opacity=0.5)
            self.add(trail)
            self.play(ang.animate.set_value(1 + 2 * PI), run_time=min(3.0, vo.duration * 0.35))
            self.play(Indicate(md, color=HL, scale_factor=2), Indicate(form, color=HL), run_time=1.0)
            md.clear_updaters()
            trail.clear_updaters()

    # ------------------------------------------------------------ scene 4
    def s4(self):
        ax, graph = make_axes()
        graph.shift(0.3 * DOWN)
        f = plotf(ax, np.sin, -6.5, 6.5, n=400, color=SIN_C)
        band = Rectangle(width=ax.c2p(6.5, 0)[0] - ax.c2p(-6.5, 0)[0],
                         height=ax.c2p(0, 1)[1] - ax.c2p(0, -1)[1], stroke_width=0)
        band.set_fill(HL, 0.14).move_to(ax.c2p(0, 0))
        rlab = M(r"\text{Range } [-1,1]", 34).next_to(ax.c2p(-4.2, 1), UP, buff=0.2)
        darr = DoubleArrow(ax.c2p(-6.3, -2.3), ax.c2p(6.3, -2.3), buff=0, color=INK, stroke_width=3,
                           tip_length=0.2)
        dlab = M(r"\text{Domain: all reals}", 34).next_to(darr, DOWN, buff=0.12)
        with self.voiceover("Every property comes from the circle. Domain: all real numbers, since you can "
                            "rotate any amount. Range: negative one to one, since circle coordinates "
                            "never leave it.") as vo:
            self.play(FadeIn(graph), Create(f), run_time=1.3)
            self.wait(vo.duration * 0.15)
            self.play(GrowFromCenter(darr), FadeIn(dlab), run_time=1.0)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(band), FadeIn(rlab), run_time=1.0)
        top = UP * 3.35
        zeros = VGroup(*[Dot(ax.c2p(k * PI, 0), color=HL, radius=0.09) for k in range(-2, 3)])
        zf = M(r"\sin x = 0 \text{ at } x = n\pi", 38, color=SIN_C).move_to(top)
        g = plotf(ax, np.cos, -6.5, 6.5, n=400, color=COS_C)
        czeros = VGroup(*[Dot(ax.c2p(k * PI / 2, 0), color=WARN, radius=0.09) for k in (-3, -1, 1, 3)])
        cf = M(r"\cos x = 0 \text{ at } x = \tfrac{\pi}{2} + n\pi", 38, color=COS_C).move_to(top)
        with self.voiceover("Sine is zero at multiples of pi. Cosine is zero at pi over two plus "
                            "multiples of pi.") as vo:
            self.play(FadeOut(band), FadeOut(rlab), FadeOut(darr), FadeOut(dlab), run_time=0.5)
            self.play(LaggedStart(*[FadeIn(z, scale=0.5) for z in zeros], lag_ratio=0.2), Write(zf),
                      run_time=1.4)
            self.wait(vo.duration * 0.25)
            self.play(Create(g), FadeOut(zf), FadeOut(zeros), run_time=1.2)
            self.play(LaggedStart(*[FadeIn(z, scale=0.5) for z in czeros], lag_ratio=0.2), Write(cf),
                      run_time=1.4)
        self.play(FadeOut(g), FadeOut(czeros), FadeOut(cf), run_time=0.6)
        mid = DashedLine(ax.c2p(-6.5, 0), ax.c2p(6.5, 0), color=TEAL, stroke_width=3)
        mlab = T("midline", 26, color=TEAL).next_to(ax.c2p(5.5, 0), UP, buff=0.12)
        vb = BraceBetweenPoints(ax.c2p(PI / 2, 0), ax.c2p(PI / 2, 1), direction=RIGHT, color=WARN)
        vl = T("amplitude = 1", 26, color=WARN).next_to(vb, RIGHT, buff=0.1)
        vl.shift((ax.c2p(0, 1.25)[1] - vl.get_bottom()[1]) * UP)
        hb = BraceBetweenPoints(ax.c2p(-2 * PI, 1.25), ax.c2p(0, 1.25), direction=UP, color=PURPLE)
        hl_ = M(r"\text{period} = 2\pi", 34, color=PURPLE).next_to(hb, UP, buff=0.1)
        with self.voiceover("The midline is the line the wave oscillates about. The amplitude is midline "
                            "to peak, never negative. The period is the length of one cycle.") as vo:
            self.play(Create(mid), FadeIn(mlab), run_time=1.0)
            self.wait(vo.duration * 0.15)
            self.play(GrowFromCenter(vb), FadeIn(vl), run_time=1.0)
            self.wait(vo.duration * 0.2)
            self.play(GrowFromCenter(hb), FadeIn(hl_), run_time=1.0)

    # ------------------------------------------------------------ scene 5
    def s5(self):
        C = np.array([-4.2, 0, 0])
        R = 1.6
        circ, cross = self.circle_kit(C, R)
        a = 0.9
        p1 = C + R * np.array([np.cos(a), np.sin(a), 0])
        p2 = C + R * np.array([np.cos(a), -np.sin(a), 0])
        d1, d2 = Dot(p1, color=WARN), Dot(p2, color=PURPLE)
        r1 = Line(C, p1, color=INK, stroke_width=3)
        r2 = Line(C, p2, color=INK, stroke_width=3)
        mirror = DashedLine(C + 2.1 * LEFT, C + 2.1 * RIGHT, color=HL, stroke_width=4)
        join = DashedLine(p1, p2, color=MUTED, stroke_width=2)
        l1 = M(r"(\cos x,\ \sin x)", 28).next_to(p1, UR, buff=0.08)
        l2 = M(r"(\cos x,\ -\sin x)", 28).next_to(p2, DR, buff=0.08)
        a1 = M(r"x", 28).move_to(C + 0.55 * np.array([np.cos(a / 2), np.sin(a / 2), 0]))
        a2 = M(r"-x", 28).move_to(C + 0.6 * np.array([np.cos(a / 2), -np.sin(a / 2), 0]))
        ev = M(r"\cos(-x) = \cos x \quad (\text{even})", 40, color=COS_C)
        od = M(r"\sin(-x) = -\sin x \quad (\text{odd})", 40, color=SIN_C)
        VGroup(ev, od).arrange(DOWN, buff=0.6, aligned_edge=LEFT).move_to([2.6, 0, 0])
        with self.voiceover("Negating an angle mirrors the point across the x axis. So cosine is even: "
                            "cosine of negative x is cosine of x. Sine is odd: sine of negative x is "
                            "negative sine of x.") as vo:
            self.play(Create(cross), Create(circ), run_time=0.8)
            self.play(Create(r1), FadeIn(d1), FadeIn(l1), FadeIn(a1), run_time=0.8)
            self.play(Create(mirror), run_time=0.5)
            self.play(TransformFromCopy(r1, r2), TransformFromCopy(d1, d2), Create(join),
                      FadeIn(l2), FadeIn(a2), run_time=1.2)
            self.wait(vo.duration * 0.1)
            self.play(Write(ev), run_time=1.2)
            self.wait(vo.duration * 0.15)
            self.play(Write(od), run_time=1.2)
        self.clear_scene()

        ax, graph = make_axes()
        cosg = plotf(ax, np.cos, -6.5, 6.5, n=400, color=COS_C)
        left = plotf(ax, np.cos, -6.5, 0, n=200, color=HL, stroke_width=6)
        sing = plotf(ax, np.sin, -6.5, 6.5, n=400, color=SIN_C)
        with self.voiceover("Cosine folds onto itself across the y axis. Sine has half turn symmetry "
                            "about the origin.") as vo:
            self.play(FadeIn(graph), Create(cosg), run_time=1.0)
            self.play(FadeIn(left), run_time=0.4)
            self.play(left.animate.flip(UP, about_point=ax.c2p(0, 0)), run_time=vo.duration * 0.3)
            self.play(FadeOut(left), ReplacementTransform(cosg, sing), run_time=0.8)
            cp = sing.copy().set_color(HL).set_stroke(width=6)
            self.add(cp)
            self.play(Rotate(cp, PI, about_point=ax.c2p(0, 0)), run_time=vo.duration * 0.3)
            self.play(FadeOut(cp), run_time=0.4)
        s = ValueTracker(0.0)
        cosd = DashedVMobject(plotf(ax, np.cos, -6.5, 6.5, n=400, color=COS_C), num_dashes=80)
        moving = always_redraw(lambda: plotf(ax, lambda x: np.sin(x + s.get_value()), -6.5, 6.5, n=400,
                                             color=SIN_C))
        form = M(r"\cos x = \sin\!\left(x + \frac{\pi}{2}\right)", 46).to_edge(UP, buff=0.35)
        with self.voiceover("Slide sine left by pi over two, and it lands exactly on cosine, because a "
                            "quarter turn swaps the two coordinates.") as vo:
            self.remove(sing)
            self.add(moving)
            self.play(Create(cosd), run_time=0.8)
            self.play(s.animate.set_value(PI / 2), run_time=vo.duration * 0.45)
            self.play(Write(form), run_time=1.2)
        moving.clear_updaters()
        self.play(FadeOut(moving), FadeOut(cosd), FadeOut(form), FadeIn(sing), run_time=0.6)

        def tline(x0, col, L=0.9):
            m = np.cos(x0)
            return Line(ax.c2p(x0 - L, np.sin(x0) - L * m), ax.c2p(x0 + L, np.sin(x0) + L * m),
                        color=col, stroke_width=5)

        flat = tline(PI / 2, HL)
        st1, st2 = tline(0, WARN, 0.7), tline(PI, WARN, 0.7)
        fl = T("flat at the peak", 28, color=INK).next_to(ax.c2p(PI / 2, 1), UP, buff=0.35)
        sl = T("steepest at the zeros", 28, color=WARN).move_to(ax.c2p(PI, -1.9))
        calc = M(r"\frac{d}{dx}\sin x = \cos x", 44).to_edge(UP, buff=0.3).shift(3.5 * LEFT)
        with self.voiceover("The wave is steepest at its zeros, and flat at its peaks. Calculus will say: "
                            "the derivative of sine is cosine.") as vo:
            self.play(Create(st1), Create(st2), FadeIn(sl), run_time=1.0)
            self.play(Create(flat), FadeIn(fl), run_time=1.0)
            self.wait(vo.duration * 0.2)
            self.play(Write(calc), run_time=1.2)

    # ------------------------------------------------------------ scene 6
    def s6(self):
        cols = {"a": WARN, "b": HL, "c": PURPLE, "d": TEAL}
        form = MathTex("y =", "a", r"\,\sin\bigl(", "b", "(x -", "c", r")\bigr) +", "d", font_size=80)
        for i, k in ((1, "a"), (3, "b"), (5, "c"), (7, "d")):
            form[i].set_color(cols[k])
        L = {"a": form[1], "b": form[3], "c": form[5], "d": form[7]}
        with self.voiceover("A tide swings two metres about a mean depth of five, every twelve hours: a "
                            "sine wave, stretched, lifted, and shifted. y equals the letter a, times the "
                            "sine of, b times the quantity x minus c. Then plus d.") as vo:
            d = vo.duration
            self.play(Write(form), run_time=1.5)
            self.wait(d * 0.5 - 1.5)
            for k, frac in (("a", 0.08), ("b", 0.14), ("c", 0.1), ("d", 0.1)):
                self.play(Indicate(L[k], color=cols[k], scale_factor=1.5), run_time=0.8)
                self.wait(max(0.05, d * frac - 0.8))

        ax, graph = make_axes(y_length=5.2)
        graph.shift(0.65 * DOWN)
        A, B, Cc, D = (ValueTracker(v) for v in (1.0, 1.0, 0.0, 0.0))
        ref = DashedVMobject(plotf(ax, np.sin, -6.5, 6.5, n=400, color=MUTED, stroke_width=3), num_dashes=90)
        curve = always_redraw(lambda: plotf(
            ax, lambda x: A.get_value() * np.sin(B.get_value() * (x - Cc.get_value())) + D.get_value(),
            -6.5, 6.5, n=500, color=SIN_C))
        self.play(form.animate.scale(0.55).to_edge(UP, buff=0.3), FadeIn(graph), Create(ref), run_time=1.2)
        self.add(curve)
        cap_pos = np.array([4.6, 3.35, 0])

        def caption(s, col):
            return T(s, 30, color=col).move_to(cap_pos)

        with self.voiceover("Each letter has one job. The size of the letter a is the amplitude. Make it "
                            "bigger, and the wave grows. Make it negative, and it flips.") as vo:
            d = vo.duration
            cap = caption("|a| = amplitude", WARN)
            self.play(Indicate(L["a"], color=WARN, scale_factor=1.5), FadeIn(cap), run_time=1.0)
            self.wait(max(0.1, d * 0.4 - 1.0))
            self.play(A.animate.set_value(2), run_time=1.5)
            br = BraceBetweenPoints(ax.c2p(PI / 2, 0), ax.c2p(PI / 2, 2), direction=RIGHT, color=WARN)
            bl = M("2", 34, color=WARN).next_to(br, RIGHT, buff=0.1)
            self.play(GrowFromCenter(br), FadeIn(bl), run_time=0.6)
            self.wait(max(0.1, d * 0.2 - 0.6))
            self.play(FadeOut(br), FadeOut(bl), run_time=0.3)
            self.play(A.animate.set_value(-2), Indicate(L["a"], color=WARN), run_time=1.5)
        with self.voiceover("Make b greater than one, and the wave squeezes horizontally.") as vo:
            cap2 = caption("b: frequency", HL)
            self.play(ReplacementTransform(cap, cap2), Indicate(L["b"], color=HL, scale_factor=1.5),
                      run_time=0.8)
            self.play(B.animate.set_value(2), run_time=2.0)
        with self.voiceover("Increase c, and the wave slides right by c. A negative c slides it left.") as vo:
            cap3 = caption("c: phase shift", PURPLE)
            arr = Arrow(ax.c2p(0, -0.35), ax.c2p(1, -0.35), buff=0, color=HL, stroke_width=5,
                        tip_length=0.2, max_tip_length_to_length_ratio=0.35)
            self.play(ReplacementTransform(cap2, cap3), Indicate(L["c"], color=PURPLE, scale_factor=1.5),
                      run_time=0.8)
            self.play(Cc.animate.set_value(1), GrowArrow(arr), run_time=2.0)
        with self.voiceover("Increase d, and the whole wave lifts. These are the same four moves as in "
                            "calculus, on a new base curve.") as vo:
            cap4 = caption("d: vertical shift", TEAL)
            mid = always_redraw(lambda: DashedLine(ax.c2p(-6.5, D.get_value()), ax.c2p(6.5, D.get_value()),
                                                   color=TEAL, stroke_width=3))
            self.add(mid)
            self.play(ReplacementTransform(cap3, cap4), Indicate(L["d"], color=TEAL, scale_factor=1.5),
                      FadeOut(arr), run_time=0.8)
            self.play(D.animate.set_value(1.5), run_time=2.0)
            same = T("same four moves, new base curve", 28, color=MUTED).next_to(form, DOWN, buff=0.15)
            self.play(FadeIn(same), run_time=0.6)
        curve.clear_updaters()
        mid.clear_updaters()
        self.play(FadeOut(curve), FadeOut(mid), FadeOut(cap4), FadeOut(same), FadeOut(ref), FadeOut(form),
                  run_time=0.6)

        f2 = plotf(ax, lambda x: np.sin(2 * x), -6.5, 6.5, n=500, color=SIN_C)
        f2lab = M(r"y = \sin 2x", 36, color=SIN_C).next_to(ax.c2p(-5.2, 1.2), UP, buff=0.1)
        hb = BraceBetweenPoints(ax.c2p(0, 1.2), ax.c2p(PI, 1.2), direction=UP, color=PURPLE)
        hbl = M(r"\text{period} = \frac{2\pi}{b} = \pi", 36, color=PURPLE).next_to(hb, UP, buff=0.1)
        hbl.shift(RIGHT * (ax.c2p(0, 0)[0] + 0.25 - hbl.get_left()[0]))
        box = M(r"\text{period} = \frac{2\pi}{b}", 44)
        box = VGroup(SurroundingRectangle(box, color=HL, buff=0.2, stroke_width=4), box).to_corner(UR, buff=0.3)
        with self.voiceover("Trap one: b is not the period. More b means more cycles, so the period is "
                            "two pi over b. With b equal to two, one cycle takes pi.") as vo:
            self.play(Create(f2), FadeIn(f2lab), run_time=1.2)
            self.wait(vo.duration * 0.25)
            self.play(FadeIn(box), run_time=0.8)
            self.wait(vo.duration * 0.15)
            self.play(GrowFromCenter(hb), FadeIn(hbl), run_time=1.0)
        self.play(FadeOut(f2), FadeOut(f2lab), FadeOut(hb), FadeOut(hbl), FadeOut(box), run_time=0.5)

        wrong = M(r"\sin(2x - \pi)", 46)
        right = M(r"\sin\!\bigl(2(x - \tfrac{\pi}{2})\bigr)", 46)
        wrong.move_to([-3.6, 3.2, 0])
        right.move_to([-3.6, 3.2, 0])
        wl = VGroup(cross_mark(), M(r"\text{shift} = \pi", 36)).arrange(RIGHT, buff=0.2)
        wl.next_to(wrong, RIGHT, buff=0.6)
        rl = VGroup(check(), M(r"\text{shift} = \tfrac{\pi}{2}", 36)).arrange(RIGHT, buff=0.2)
        rl.next_to(right, RIGHT, buff=0.6)
        f3 = plotf(ax, lambda x: np.sin(2 * x - PI), -6.5, 6.5, n=500, color=SIN_C)
        sarr = Arrow(ax.c2p(0, -1.35), ax.c2p(PI / 2, -1.35), buff=0, color=HL, stroke_width=5,
                     tip_length=0.2, max_tip_length_to_length_ratio=0.35)
        sdot = Dot(ax.c2p(PI / 2, 0), color=HL, radius=0.09)
        with self.voiceover("Trap two: factor first. In sine of the quantity two x minus pi, factor out "
                            "the two. The shift is pi over two, not pi.") as vo:
            self.play(Write(wrong), FadeIn(wl), run_time=1.2)
            self.play(Create(f3), run_time=1.2)
            self.wait(vo.duration * 0.15)
            self.play(TransformMatchingShapes(wrong, right), FadeOut(wl), run_time=1.2)
            self.play(FadeIn(rl), GrowArrow(sarr), FadeIn(sdot), run_time=1.0)

    # ------------------------------------------------------------ scene 7
    def s7(self):
        ax, graph = make_axes(y_range=(-3.5, 1.5), y_length=4.4)
        graph.shift(0.95 * DOWN)
        f = lambda x: 2 * np.sin(2 * (x - 0.5)) - 1  # noqa: E731
        tgt = plotf(ax, f, -6.5, 6.5, n=500, color=PURPLE, stroke_width=5)
        mid = DashedLine(ax.c2p(-6.5, -1), ax.c2p(6.5, -1), color=TEAL, stroke_width=3)
        mlab = M(r"d = -1", 34, color=TEAL).next_to(ax.c2p(-6.5, -1), UP, buff=0.1).shift(0.1 * RIGHT)
        mlab.add_background_rectangle(color=BG, opacity=0.9)
        xb = 6.55
        big = BraceBetweenPoints(ax.c2p(xb, -3), ax.c2p(xb, 1), direction=RIGHT, color=WARN)
        h1 = BraceBetweenPoints(ax.c2p(xb, -1), ax.c2p(xb, 1), direction=RIGHT, color=WARN)
        h2 = BraceBetweenPoints(ax.c2p(xb, -3), ax.c2p(xb, -1), direction=RIGHT, color=WARN)
        pk = DashedLine(ax.c2p(0.5 + PI / 4, 1), ax.c2p(xb, 1), color=MUTED, stroke_width=2)
        tr = DashedLine(ax.c2p(0.5 + 3 * PI / 4, -3), ax.c2p(xb, -3), color=MUTED, stroke_width=2)
        alab = M(r"a = \frac{1-(-3)}{2} = 2", 36, color=WARN).move_to([3.9, 2.95, 0])
        with self.voiceover("Exams test the reverse. The midline gives d, here negative one. Half the peak "
                            "to trough distance gives the amplitude, here two.") as vo:
            self.play(FadeIn(graph), Create(tgt), run_time=1.3)
            self.wait(vo.duration * 0.05)
            self.play(Create(mid), FadeIn(mlab), run_time=1.0)
            self.wait(vo.duration * 0.12)
            self.play(Create(pk), Create(tr), GrowFromCenter(big), run_time=1.0)
            self.play(ReplacementTransform(big, VGroup(h1, h2)), run_time=0.8)
            self.play(Write(alab), run_time=1.0)
        hb = BraceBetweenPoints(ax.c2p(0.5, 1.15), ax.c2p(0.5 + PI, 1.15), direction=UP, color=HL)
        blab = M(r"\text{period} = \pi \Rightarrow b = \frac{2\pi}{\pi} = 2", 36, color=INK)
        blab.move_to([-3.2, 2.95, 0])
        conn = Line(hb.get_top(), blab.get_bottom() + 0.05 * DOWN, color=HL, stroke_width=2)
        cdot = Dot(ax.c2p(0.5, -1), color=HL, radius=0.1)
        carr = Arrow(ax.c2p(0, 0.3), ax.c2p(0.5, 0.3), buff=0, color=PURPLE, stroke_width=5,
                     tip_length=0.15, max_tip_length_to_length_ratio=0.5)
        cguide = DashedLine(ax.c2p(0.5, -1), ax.c2p(0.5, 0.3), color=PURPLE, stroke_width=2)
        clab = M(r"c = 0.5", 32, color=PURPLE).move_to(ax.c2p(-0.8, 0.6))
        clab.add_background_rectangle(color=BG, opacity=0.9)
        with self.voiceover("One cycle is pi, so b is two. And where the wave crosses its midline heading "
                            "upward gives c, here one half.") as vo:
            self.play(GrowFromCenter(hb), Create(conn), Write(blab), run_time=1.2)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(cdot, scale=0.5), run_time=0.6)
            self.play(Indicate(cdot, color=HL, scale_factor=2), run_time=0.8)
            self.play(Create(cguide), GrowArrow(carr), FadeIn(clab), run_time=0.8)
        fin = MathTex(r"y = ", "2", r"\sin\bigl(", "2", "(x-", "0.5", r")\bigr)", "- 1", font_size=48)
        fin[1].set_color(WARN)
        fin[3].set_color(HL)
        fin[5].set_color(PURPLE)
        fin[7].set_color(TEAL)
        fin = VGroup(SurroundingRectangle(fin, color=INK, buff=0.15, stroke_width=2).set_fill(BG, 1), fin)
        fin.move_to([0, 2.95, 0])
        rebuilt = plotf(ax, f, -6.5, 6.5, n=500, color=SIN_C, stroke_width=3)
        with self.voiceover("Put it together: y equals two times the sine of, two times the quantity x "
                            "minus one half. Then minus one.") as vo:
            self.play(FadeOut(alab), FadeOut(blab), FadeOut(conn), FadeIn(fin), run_time=1.0)
            self.wait(vo.duration * 0.3)
            self.play(Create(rebuilt), run_time=vo.duration * 0.4)

    # ------------------------------------------------------------ scene 8
    def s8(self):
        mini = VGroup()
        for fn, col, name in ((np.sin, SIN_C, r"y=\sin x"), (np.cos, COS_C, r"y=\cos x")):
            ax, g = make_axes((-2 * PI - 0.2, 2 * PI + 0.2), (-1.6, 1.6), 5.2, 2.4, pi_every=2,
                              y_labels=True, font=20)
            band = Rectangle(width=5.2, height=ax.c2p(0, 1)[1] - ax.c2p(0, -1)[1], stroke_width=0)
            band.set_fill(col, 0.12).move_to(ax.c2p(0, 0))
            c = plotf(ax, fn, -2 * PI - 0.2, 2 * PI + 0.2, n=300, color=col)
            lab = M(name, 34, color=col).next_to(g, UP, buff=0.15)
            mini.add(VGroup(band, g, c, lab))
        mini.arrange(RIGHT, buff=0.9).move_to([0, 0.5, 0])
        capt = T("bounded, smooth, period 2π", 32, color=MUTED).next_to(mini, DOWN, buff=0.5)
        tanf = MathTex(r"\tan x = ", r"{\sin x", r"\over", r"\cos x}", font_size=80)
        tanf[1].set_color(SIN_C)
        tanf[3].set_color(COS_C)
        with self.voiceover("Sine and cosine are tame: bounded, smooth, repeating every two pi. Tangent is "
                            "none of those. It all follows from its definition: sine of x over cosine "
                            "of x.") as vo:
            self.play(FadeIn(mini), run_time=1.2)
            self.play(FadeIn(capt), run_time=0.6)
            self.wait(vo.duration * 0.35)
            self.play(FadeOut(mini), FadeOut(capt), run_time=0.8)
            self.play(Write(tanf), run_time=1.5)

        # layout: circle left, tan graph right
        C = np.array([-4.7, 0.4, 0])
        R = 1.3
        circ, cross = self.circle_kit(C, R)
        th = ValueTracker(0.8)

        def P():
            t = th.get_value()
            return C + R * np.array([np.cos(t), np.sin(t), 0])

        dot = always_redraw(lambda: Dot(P(), color=WARN, radius=0.08))
        rad = always_redraw(lambda: Line(C, P(), color=INK, stroke_width=3))
        hseg = always_redraw(lambda: Line([P()[0], C[1], 0], P(), color=SIN_C, stroke_width=6))
        cseg = always_redraw(lambda: Line(C, [P()[0], C[1], 0], color=COS_C, stroke_width=6))
        tlab = M(r"\tan\theta =", 38).move_to(C + np.array([-0.6, -2.3, 0]))
        tval = always_redraw(lambda: DecimalNumber(np.tan(th.get_value()), num_decimal_places=2,
                                                   font_size=38, color=TAN_C).next_to(tlab, RIGHT, buff=0.15))

        ax, graph = make_axes((-5, 5), (-6, 6), 7.4, 5.6, pi_every=1, y_step=2, font=22)
        graph.move_to([3.05, 0.25, 0])
        for lb in graph.xlabels:
            xd = ax.p2c(lb.get_center())[0]
            if abs(abs(xd) - PI / 2) < 0.3 or abs(abs(xd) - 3 * PI / 2) < 0.3:
                lb.shift(0.2 * RIGHT)
        asym = VGroup(*[DashedLine(ax.c2p(k * PI / 2, -6), ax.c2p(k * PI / 2, 6), color=WARN, stroke_width=2)
                        for k in (-3, -1, 1, 3)])
        br = tan_branches(ax, -5, 5, 6, color=TAN_C)
        with self.voiceover("Where cosine is zero, at pi over two plus multiples of pi, the bottom shrinks "
                            "to nothing and the ratio runs off to infinity: a vertical asymptote.") as vo:
            self.play(tanf.animate.scale(0.5).move_to(C + np.array([0, 2.55, 0])), run_time=0.8)
            self.play(Create(cross), Create(circ), FadeIn(graph), run_time=1.0)
            self.add(rad, cseg, hseg, dot)
            self.play(FadeIn(tlab), run_time=0.3)
            self.add(tval)
            self.play(th.animate.set_value(1.52), run_time=vo.duration * 0.4, rate_func=smooth)
            self.play(Create(asym), run_time=0.8)
            self.play(Create(br), run_time=1.5)
        zeros = VGroup(*[Dot(ax.c2p(k * PI, 0), color=HL, radius=0.09) for k in (-1, 0, 1)])
        tiny = M(r"\frac{\sin x}{\text{tiny}}", 36, color=TAN_C).next_to(ax.c2p(PI / 2, 4), RIGHT, buff=0.15)
        tiny.add_background_rectangle(color=BG, opacity=0.9)
        rarr = DoubleArrow(ax.c2p(-0.35, -5.8), ax.c2p(-0.35, 5.8), buff=0, color=PURPLE, stroke_width=4,
                           tip_length=0.2)
        rlab = M(r"\text{range: all reals}", 30, color=PURPLE).next_to(ax.c2p(-PI / 2, 5.2), LEFT, buff=0.1)
        rlab.add_background_rectangle(color=BG, opacity=0.9)

        def tline():
            t = th.get_value()
            u = np.array([np.cos(t), np.sin(t), 0])
            return Line(C - 1.9 * u, C + 1.9 * u, color=TAN_C, stroke_width=4)

        tl = always_redraw(tline)
        slab = M(r"\text{slope} = \tan\theta", 30, color=TAN_C).move_to(C + np.array([1.0, -1.7, 0]))
        with self.voiceover("It is zero where sine is zero. Divide by a cosine near zero, and you can get "
                            "anything, so its range is every real number. Geometrically, tangent is the "
                            "slope of the terminal side.") as vo:
            self.play(LaggedStart(*[FadeIn(z, scale=0.5) for z in zeros], lag_ratio=0.2), run_time=1.0)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(tiny), run_time=0.6)
            self.play(Indicate(tiny, color=TAN_C), run_time=0.8)
            self.play(FadeOut(tiny), GrowFromCenter(rarr), FadeIn(rlab), run_time=1.0)
            self.wait(vo.duration * 0.1)
            self.play(th.animate.set_value(0.8), run_time=1.0)
            self.play(Create(tl), FadeIn(slab), run_time=1.0)
        pb = BraceBetweenPoints(ax.c2p(-PI / 2, -6), ax.c2p(PI / 2, -6), direction=DOWN, color=HL)
        pbl = M(r"\text{period} = \pi", 30).next_to(pb, DOWN, buff=0.05)
        pform = M(r"\text{period of } \tan(bx) = \frac{\pi}{b}", 34)
        pform = card(pform, 0.15).move_to(C + np.array([0, -2.95, 0]))
        with self.voiceover("Its period is pi, not two pi, because that line is unchanged by a half turn. "
                            "Transformed, the period is pi over b.") as vo:
            self.play(FadeOut(rarr), FadeOut(rlab), run_time=0.4)
            self.play(th.animate.set_value(0.8 + PI), run_time=vo.duration * 0.3)
            self.play(Indicate(tl, color=HL), GrowFromCenter(pb), FadeIn(pbl), run_time=1.2)
            self.play(FadeOut(tlab), FadeOut(tval), FadeIn(pform), run_time=1.0)
        for m in (dot, rad, hseg, cseg, tval, tl):
            m.clear_updaters()

    # ------------------------------------------------------------ scene 9
    def s9(self):
        items = [
            Tex(r"1. Extremes $\to$ $d$, $a$", font_size=38),
            Tex(r"2. Cycle length $\to$ $b = 2\pi / \text{period}$", font_size=38),
            Tex(r"3. Start:", font_size=38),
            Tex(r"4. Sanity-check one value", font_size=38),
        ]
        subs = [
            Tex(r"midline up $\to$ $\sin$", font_size=34),
            Tex(r"maximum $\to$ $\cos$", font_size=34),
            Tex(r"minimum $\to$ $-\cos$", font_size=34),
            Tex(r"else $\to$ shift $c$", font_size=34),
        ]
        sub = VGroup(*subs).arrange(DOWN, buff=0.18, aligned_edge=LEFT)
        col = VGroup(items[0], items[1], items[2], sub, items[3]).arrange(DOWN, buff=0.35, aligned_edge=LEFT)
        sub.shift(0.8 * RIGHT)
        col.move_to(ORIGIN)
        head = T("Four questions for any cycle", 36, weight="BOLD").to_edge(UP, buff=0.4)
        with self.voiceover("To model anything that cycles, ask four questions. What are the extremes? How "
                            "long is a cycle? Where does it start? Midline going up means sine. A maximum "
                            "means cosine. A minimum means negative cosine. And does a known value check "
                            "out?") as vo:
            d = vo.duration
            self.play(FadeIn(head), run_time=0.6)
            self.play(FadeIn(items[0], shift=RIGHT * 0.2), run_time=0.6)
            self.wait(d * 0.1)
            self.play(FadeIn(items[1], shift=RIGHT * 0.2), run_time=0.6)
            self.wait(d * 0.08)
            self.play(FadeIn(items[2], shift=RIGHT * 0.2), run_time=0.6)
            self.wait(d * 0.05)
            for i in range(3):
                self.play(FadeIn(subs[i], shift=RIGHT * 0.2), run_time=0.5)
                if i == 2:
                    hl = SurroundingRectangle(subs[2], color=HL, buff=0.08, stroke_width=3)
                    hl.set_fill(HL, 0.15)
                    self.play(FadeIn(hl), run_time=0.4)
                self.wait(d * 0.06)
            self.play(FadeIn(subs[3], shift=RIGHT * 0.2), run_time=0.5)
            self.play(FadeIn(items[3], shift=RIGHT * 0.2), run_time=0.6)
        self.clear_scene()

        # wheel + graph share 0.1 scene unit per metre; ground line = axes' h = 0 at scene y = -2.5
        ax, graph = make_axes((0, 4.5), (0, 50), 6, 5, x_ticks="num", y_step=10, font=22)
        graph.shift(np.array([0.6, -2.5, 0]) - ax.c2p(0, 0))
        xl = T("t (min)", 24, color=MUTED).next_to(ax.c2p(4.5, 0), DOWN, buff=0.45).shift(0.3 * LEFT)
        yl = T("h (m)", 24, color=MUTED).next_to(ax.c2p(0, 50), RIGHT, buff=0.15)
        W = np.array([-4.5, ax.c2p(0, 25)[1], 0])
        wheel = Circle(radius=2, color=INK, stroke_width=4).move_to(W)
        spokes = VGroup(*[Line(W, W + 2 * np.array([np.cos(k * PI / 4), np.sin(k * PI / 4), 0]),
                               color=MUTED, stroke_width=1.5) for k in range(8)])
        ground = Line([-6.9, -2.5, 0], [-1.6, -2.5, 0], color=INK, stroke_width=3)
        stand = VGroup(Line(W, [-5.5, -2.5, 0], color=MUTED, stroke_width=3),
                       Line(W, [-3.5, -2.5, 0], color=MUTED, stroke_width=3))
        clab = T("25 m", 22, color=INK).next_to(W, LEFT, buff=0.12).shift(0.2 * UP)
        rline = Line(W, W + 2 * RIGHT, color=WARN, stroke_width=3)
        rlab = T("20 m", 22, color=WARN).next_to(rline, UP, buff=0.05).shift(0.25 * RIGHT)
        guides = VGroup(*[DashedLine([-6.6, ax.c2p(0, h)[1], 0], ax.c2p(4.5, h), color=GRID, stroke_width=2)
                          for h in (5, 25, 45)])
        tt = ValueTracker(0.0)

        def rider():
            a = -PI / 2 + (PI / 2) * tt.get_value()
            return W + 2 * np.array([np.cos(a), np.sin(a), 0])

        rdot = always_redraw(lambda: Dot(rider(), color=WARN, radius=0.12))
        info = VGroup(T("4 min per turn", 24), T("t = 0", 24)).arrange(DOWN, buff=0.1, aligned_edge=LEFT)
        info.move_to([-4.5, 3.3, 0])
        with self.voiceover("A Ferris wheel: radius twenty metres, centre twenty five metres up, one turn "
                            "every four minutes. You board at the bottom at time zero.") as vo:
            self.play(Create(ground), Create(stand), Create(wheel), Create(spokes), run_time=1.2)
            self.play(FadeIn(graph), FadeIn(xl), FadeIn(yl), run_time=0.8)
            self.play(FadeIn(clab), Create(rline), FadeIn(rlab), run_time=0.8)
            self.play(Create(guides), run_time=0.8)
            self.play(FadeIn(info[0]), run_time=0.5)
            self.wait(vo.duration * 0.15)
            self.add(rdot)
            self.play(FadeIn(info[1]), Flash(rider(), color=WARN), run_time=0.8)

        h = lambda t: -20 * np.cos(PI / 2 * t) + 25  # noqa: E731
        der = VGroup(M(r"d = \frac{45+5}{2} = 25", 34), M(r"a = \frac{45-5}{2} = 20", 34),
                     M(r"b = \frac{2\pi}{4} = \frac{\pi}{2}", 34)).arrange(RIGHT, buff=0.7)
        der.move_to([1.2, 3.35, 0])
        hform = M(r"h(t) = -20\cos\!\left(\frac{\pi}{2}t\right) + 25", 38)
        hbox = VGroup(SurroundingRectangle(hform, color=INK, buff=0.15, stroke_width=3), hform)
        hbox.move_to([2.4, 3.35, 0])
        with self.voiceover("Extremes of five and forty five give d equals twenty five, and amplitude "
                            "twenty. b is two pi over four, or pi over two. Starting at the minimum means "
                            "negative cosine. h of t equals negative twenty times the cosine of, pi over "
                            "two, times t. Then plus twenty five.") as vo:
            d = vo.duration
            self.play(FadeOut(info), Write(der[0]), run_time=1.0)
            self.wait(d * 0.06)
            self.play(Write(der[1]), run_time=1.0)
            self.wait(d * 0.06)
            self.play(Write(der[2]), run_time=1.0)
            self.wait(d * 0.15)
            self.play(Indicate(rdot, color=HL, scale_factor=1.8), run_time=0.8)
            self.play(der.animate.scale(0.6).set_opacity(0.0), FadeIn(hbox), run_time=1.0)
        self.remove(der)
        trace = always_redraw(lambda: plotf(ax, h, 0, tt.get_value(), n=200, color=WARN))
        con = always_redraw(lambda: DashedLine(rider(), ax.c2p(tt.get_value(), h(tt.get_value())),
                                               color=WARN, stroke_width=2, stroke_opacity=0.7))
        with self.voiceover("Watch the rider go round. The height traces exactly this curve.") as vo:
            self.add(trace, con)
            self.play(tt.animate.set_value(4), run_time=max(4.0, vo.duration * 0.85), rate_func=linear)
        trace.clear_updaters()
        rdot.clear_updaters()
        self.play(FadeOut(con), run_time=0.3)

        p0 = Dot(ax.c2p(0, 5), color=HL, radius=0.11)
        p2 = Dot(ax.c2p(2, 45), color=HL, radius=0.11)
        c0 = VGroup(M(r"h(0) = -20(1)+25 = 5", 32), check().scale(0.7)).arrange(RIGHT, buff=0.15)
        c2 = VGroup(M(r"h(2) = -20(-1)+25 = 45", 32), check().scale(0.7)).arrange(RIGHT, buff=0.15)
        alt = MathTex(r"= 20\sin\bigl(\tfrac{\pi}{2}", r"(t-1)", r"\bigr) + 25", font_size=34, color=SIN_C)
        altcap = T("same curve, c = 1", 26, color=SIN_C)
        hb_t = hbox.copy().move_to([-3.6, 3.3, 0])
        alt.next_to(hb_t, DOWN, buff=0.25).align_to(hb_t, LEFT)
        altcap.next_to(alt, DOWN, buff=0.12).align_to(alt, LEFT)
        leftcol = VGroup(c0, c2).arrange(DOWN, buff=0.35, aligned_edge=LEFT)
        leftcol.next_to(altcap, DOWN, buff=0.5).align_to(hb_t, LEFT)
        sine_form = plotf(ax, lambda t: 20 * np.sin(PI / 2 * (t - 1)) + 25, 0, 4.5, n=200, color=SIN_C,
                          stroke_width=3)
        with self.voiceover("Check: at t equals zero, h is five, the platform. At t equals two, h is forty "
                            "five, the top. A sine shifted by one minute works too. Both are correct; only "
                            "c differs.") as vo:
            wheelgrp = VGroup(wheel, spokes, stand, ground, clab, rline, rlab, rdot, guides)
            self.play(FadeOut(wheelgrp), hbox.animate.move_to([-3.6, 3.3, 0]), run_time=0.8)
            self.play(FadeIn(p0, scale=0.5), FadeIn(c0), run_time=0.8)
            self.wait(vo.duration * 0.12)
            self.play(FadeIn(p2, scale=0.5), FadeIn(c2), run_time=0.8)
            self.wait(vo.duration * 0.08)
            self.play(Write(alt), run_time=1.2)
            tpart = SurroundingRectangle(alt[1], color=HL, buff=0.05, stroke_width=3)
            self.play(Create(tpart), FadeIn(altcap), Create(sine_form), run_time=1.5)
        self.clear_scene()

        # daylight + tides cards
        def mini_card(title):
            box = RoundedRectangle(width=6.2, height=5.4, corner_radius=0.2, color=MUTED, stroke_width=2)
            box.set_fill(WHITE, 0.6)
            t = T(title, 32, weight="BOLD").next_to(box.get_top(), DOWN, buff=0.25)
            return box, t

        b1, t1 = mini_card("Daylight")
        b2, t2 = mini_card("Tides")
        VGroup(b1, b2).arrange(RIGHT, buff=0.5).move_to([0, -0.1, 0])
        t1.next_to(b1.get_top(), DOWN, buff=0.25)
        t2.next_to(b2.get_top(), DOWN, buff=0.25)
        dax, dg = make_axes((0, 365), (8, 16), 4.8, 2.4, x_ticks=None, y_step=3, font=20)
        dg.move_to(b1.get_center() + 0.35 * UP)
        dcurve = plotf(dax, lambda t: 12 + 3 * np.sin(2 * PI / 365 * (t - 80)), 0, 365, n=200, color=HL)
        dmid = DashedLine(dax.c2p(0, 12), dax.c2p(365, 12), color=TEAL, stroke_width=2)
        ddot = Dot(dax.c2p(80, 12), color=WARN, radius=0.08)
        dlab = T("spring equinox → c", 20, color=WARN).next_to(ddot, DOWN, buff=0.15).shift(0.95 * RIGHT)
        dlab.add_background_rectangle(color=WHITE, opacity=0.8)
        dxl = T("one year", 20, color=MUTED).next_to(dax.c2p(182, 8), DOWN, buff=0.1)
        dyl = T("hours", 20, color=MUTED).next_to(dax.c2p(0, 16), UP, buff=0.08)
        dform = M(r"d = 12,\ a = 3,\ b = \frac{2\pi}{365}", 32).next_to(b1.get_bottom(), UP, buff=0.3)
        tax, tg = make_axes((0, 26), (-1.5, 1.5), 4.8, 2.2, x_ticks=None, y_labels=False)
        tg.move_to(b2.get_center() + 0.45 * DOWN)
        tcurve = plotf(tax, lambda t: np.sin(2 * PI / 12.4 * t), 0, 26, n=200, color=TEAL)
        tbr = BraceBetweenPoints(tax.c2p(3.1, 1.15), tax.c2p(15.5, 1.15), direction=UP, color=PURPLE)
        tbl = M(r"\text{period} \approx 12.4\text{ h}", 32, color=PURPLE).next_to(tbr, UP, buff=0.1)
        with self.voiceover("Daylight works the same way: midline twelve hours, amplitude three, b equal to "
                            "two pi over three hundred sixty five, c at the spring equinox. Tides: a period "
                            "of about twelve point four hours.") as vo:
            self.play(FadeIn(b1), FadeIn(t1), FadeIn(dg), FadeIn(dxl), FadeIn(dyl), run_time=0.8)
            self.play(Create(dcurve), Create(dmid), run_time=1.2)
            self.play(Write(dform), run_time=1.2)
            self.wait(vo.duration * 0.25)
            self.play(FadeIn(ddot), FadeIn(dlab), run_time=0.6)
            self.play(FadeIn(b2), FadeIn(t2), FadeIn(tg), Create(tcurve), run_time=1.2)
            self.play(GrowFromCenter(tbr), FadeIn(tbl), run_time=0.8)
        self.clear_scene()

        wbox = RoundedRectangle(width=12.6, height=5.6, corner_radius=0.25, color=WARN, stroke_width=4)
        wbox.set_fill(WARN, 0.04).move_to([0, -0.3, 0])
        wt = T("Units live inside b", 38, weight="BOLD", color=WARN).next_to(wbox.get_top(), DOWN, buff=0.3)
        lft = VGroup(M(r"b = \frac{2\pi}{4\text{ min}} = \frac{\pi}{2}\ \text{per minute}", 38), check())
        lft.arrange(RIGHT, buff=0.25).move_to([-3.2, 0.1, 0])
        rt1 = M(r"t \text{ in hours: period} = \tfrac{1}{15}\text{ h}", 34)
        rt2 = M(r"b = 30\pi", 38)
        bad = M(r"b = \frac{\pi}{2} \text{ with } t \text{ in hours}", 34, color=WARN)
        rt = VGroup(rt1, rt2, bad).arrange(DOWN, buff=0.35).move_to([3.4, -0.3, 0])
        sep = Line([0.1, 1.3, 0], [0.1, -2.6, 0], color=GRID, stroke_width=3)
        badx = Cross(bad, stroke_color=WARN, stroke_width=5)
        with self.voiceover("Units live inside b. Here b is per minute. Measure t in hours, and b must "
                            "change. Write the period with its unit before you divide.") as vo:
            self.play(Create(wbox), FadeIn(wt), run_time=0.8)
            self.play(Write(lft[0]), run_time=1.0)
            self.play(FadeIn(lft[1], scale=0.5), Create(sep), run_time=0.5)
            self.play(Write(rt1), run_time=1.0)
            self.play(Write(rt2), run_time=0.6)
            self.play(FadeIn(bad), run_time=0.5)
            self.play(Create(badx), run_time=0.6)

    # ------------------------------------------------------------ scene 10
    def s10(self):
        ax, graph = make_axes()
        graph.shift(0.3 * DOWN)
        sing = plotf(ax, np.sin, -6.5, 6.5, n=400, color=SIN_C)
        hline = DoubleArrow(ax.c2p(-6.6, 0.5), ax.c2p(6.6, 0.5), buff=0, color=HL, stroke_width=4, tip_length=0.2)
        xs = [-11 * PI / 6, -7 * PI / 6, PI / 6, 5 * PI / 6]
        dots = VGroup(*[Dot(ax.c2p(x, 0.5), color=WARN, radius=0.1) for x in xs])
        lab = VGroup(M(r"\sin x = \tfrac{1}{2}:", 40), T("infinitely many x", 32)).arrange(RIGHT, buff=0.25)
        lab.to_edge(UP, buff=0.4)
        with self.voiceover("In chapter zero, inverse sine meant ratio in, angle out. But y equals one "
                            "half meets the sine curve infinitely often, and a function returns only one "
                            "answer.") as vo:
            self.play(FadeIn(graph), Create(sing), run_time=1.2)
            self.wait(vo.duration * 0.25)
            self.play(GrowFromCenter(hline), run_time=1.0)
            self.play(LaggedStart(*[FadeIn(d, scale=0.4) for d in dots], lag_ratio=0.25), FadeIn(lab),
                      run_time=1.4)

        piece = plotf(ax, np.sin, -PI / 2, PI / 2, n=200, color=SIN_C, stroke_width=7)
        bounds = VGroup(*[DashedLine(ax.c2p(x, -2.2), ax.c2p(x, 2.2), color=MUTED, stroke_width=2)
                          for x in (-PI / 2, PI / 2)])
        ic = np.array([5.2, 2.2, 0])
        icirc, icross = self.circle_kit(ic, 0.65)
        rhalf = Arc(radius=0.65, start_angle=-PI / 2, angle=PI, color=SIN_C, stroke_width=7).move_arc_center_to(ic)
        # equal-scale axes for the reflection
        ax2, g2 = make_axes((-2, 2), (-2, 2), 6, 6, x_ticks="num", font=22)
        g2.move_to([-3.2, 0, 0])
        piece2 = plotf(ax2, np.sin, -PI / 2, PI / 2, n=200, color=SIN_C, stroke_width=5)
        diag = DashedLine(ax2.c2p(-2, -2), ax2.c2p(2, 2), color=MUTED, stroke_width=2)
        asin = plotf(ax2, np.arcsin, -1, 1, n=300, color=PURPLE, stroke_width=6)
        rng = M(r"\text{range } \left[-\frac{\pi}{2}, \frac{\pi}{2}\right]", 34, color=PURPLE)
        dom = M(r"\text{domain } [-1,1]", 34, color=HL)
        a2 = M(r"\arcsin 2", 40, color=WARN)
        a2x = VGroup(a2, Cross(a2, stroke_color=WARN, stroke_width=5))
        nm = M(r"y = \arcsin x", 44, color=PURPLE)
        rightcol = VGroup(nm, rng, dom, a2x).arrange(DOWN, buff=0.45, aligned_edge=LEFT).move_to([3.6, 0, 0])
        dl = VGroup(*[DashedLine(ax2.c2p(x, -2), ax2.c2p(x, 2), color=HL, stroke_width=3) for x in (-1, 1)])
        with self.voiceover("So restrict the domain. Keep negative pi over two to pi over two, the right "
                            "half of the circle, where sine rises once, and invert that piece. That is arc "
                            "sine. Its inputs run from negative one to one: no angle has a sine of two.") as vo:
            d = vo.duration
            self.play(FadeOut(hline), FadeOut(dots), FadeOut(lab), sing.animate.set_stroke(opacity=0.25),
                      FadeIn(piece), Create(bounds), run_time=1.0)
            self.play(FadeIn(icirc), FadeIn(icross), Create(rhalf), run_time=0.8)
            self.wait(d * 0.12)
            self.play(FadeOut(VGroup(graph, sing, bounds, icirc, icross, rhalf)),
                      ReplacementTransform(piece, piece2), FadeIn(g2), run_time=1.2)
            self.play(Create(diag), run_time=0.6)
            self.play(Transform(piece2.copy(), asin), run_time=1.5)
            self.add(asin)
            self.play(FadeIn(nm), FadeIn(rng), run_time=0.8)
            self.wait(d * 0.12)
            self.play(Create(dl), FadeIn(dom), run_time=0.8)
            self.play(FadeIn(a2), run_time=0.4)
            self.play(Create(a2x[1]), run_time=0.5)
        self.clear_scene()

        ax3, g3 = make_axes((-4, 4), (-3, 3.4), 7, 5, x_ticks="num", font=22)
        g3.move_to([-3.2, -0.3, 0])
        cs = plotf(ax3, np.arcsin, -1, 1, n=300, color=PURPLE)
        cc = plotf(ax3, np.arccos, -1, 1, n=300, color=COS_C)
        ct = plotf(ax3, np.arctan, -4, 4, n=300, color=TAN_C)
        asy = VGroup(*[DashedLine(ax3.c2p(-4, s * PI / 2), ax3.c2p(4, s * PI / 2), color=WARN, stroke_width=2)
                       for s in (-1, 1)])
        lcs = M(r"\arcsin", 30, color=PURPLE).next_to(ax3.c2p(-1, -PI / 2), LEFT, buff=0.12)
        lcc = M(r"\arccos", 30, color=COS_C).next_to(ax3.c2p(-1, PI), LEFT, buff=0.1)
        lct = M(r"\arctan", 30, color=TAN_C).next_to(ax3.c2p(4, np.arctan(4)), DOWN, buff=0.15).shift(0.4 * LEFT)
        ic = np.array([4.2, 2.6, 0])
        icirc, icross = self.circle_kit(ic, 0.6)
        thalf = Arc(radius=0.6, start_angle=0, angle=PI, color=COS_C, stroke_width=7).move_arc_center_to(ic)
        ilab = T("top half", 22, color=COS_C).next_to(icirc, RIGHT, buff=0.35)
        rows = VGroup(
            VGroup(M(r"\arcsin: [-1,1] \to [-\tfrac{\pi}{2},\tfrac{\pi}{2}]", 32, color=PURPLE),
                   T("right half", 22, color=MUTED)),
            VGroup(M(r"\arccos: [-1,1] \to [0,\pi]", 32, color=COS_C), T("top half", 22, color=MUTED)),
            VGroup(M(r"\arctan: \mathbb{R} \to (-\tfrac{\pi}{2},\tfrac{\pi}{2})", 32, color=TAN_C),
                   T("right half, ends excluded", 22, color=MUTED)),
        )
        for r in rows:
            r.arrange(DOWN, buff=0.1, aligned_edge=LEFT)
        rows.arrange(DOWN, buff=0.4, aligned_edge=LEFT)
        if rows.width > 4.6:
            rows.scale_to_fit_width(4.6)
        rows.move_to([4.3, -0.9, 0])
        with self.voiceover("Arc cosine uses zero to pi, the top half, where cosine takes each value once. "
                            "Each is the shortest interval next to zero that works. Arc tangent accepts "
                            "every real number and flattens toward plus or minus pi over two, mirroring "
                            "tangent's asymptotes.") as vo:
            d = vo.duration
            self.play(FadeIn(g3), Create(cs), FadeIn(lcs), run_time=1.0)
            self.play(Create(cc), FadeIn(lcc), FadeIn(icirc), FadeIn(icross), Create(thalf), FadeIn(ilab),
                      run_time=1.2)
            self.wait(d * 0.2)
            self.play(Create(asy), run_time=0.6)
            self.play(Create(ct), FadeIn(lct), run_time=1.2)
            self.wait(d * 0.15)
            self.play(VGroup(cs, cc, ct).animate.set_stroke(opacity=0.3),
                      VGroup(lcs, lcc, lct).animate.set_opacity(0.4), run_time=0.6)
            self.play(LaggedStart(*[FadeIn(r, shift=LEFT * 0.2) for r in rows], lag_ratio=0.4), run_time=1.8)
        self.clear_scene()

        l1 = VGroup(M(r"\sin(\arcsin x) = x,\ x \in [-1,1]", 40), check()).arrange(RIGHT, buff=0.3)
        l2m = M(r"\arcsin(\sin x) = x \text{ only if } x \in \left[-\tfrac{\pi}{2},\tfrac{\pi}{2}\right]", 40)
        l2 = VGroup(SurroundingRectangle(l2m, color=WARN, buff=0.15, stroke_width=3), l2m)
        VGroup(l1, l2).arrange(DOWN, buff=0.4).to_edge(UP, buff=0.4)
        C = np.array([-3.6, -1.6, 0])
        R = 1.6
        circ, cross = self.circle_kit(C, R)
        q3 = C + R * np.array([np.cos(3 * PI / 4), np.sin(3 * PI / 4), 0])
        q1 = C + R * np.array([np.cos(PI / 4), np.sin(PI / 4), 0])
        rh = Arc(radius=R, start_angle=-PI / 2, angle=PI, color=PURPLE, stroke_width=6).move_arc_center_to(C)
        d3, d1 = Dot(q3, color=WARN, radius=0.1), Dot(q1, color=HL, radius=0.11)
        j = DashedLine(q3, q1, color=SIN_C, stroke_width=3)
        l3 = M(r"\tfrac{3\pi}{4}", 32).next_to(q3, UL, buff=0.08)
        l1_ = M(r"\tfrac{\pi}{4}", 32).next_to(q1, UR, buff=0.08)
        ex = M(r"\arcsin\!\left(\sin\frac{3\pi}{4}\right) = \frac{\pi}{4}", 48).move_to([2.8, -1.6, 0])
        with self.voiceover("Now the trap. Sine of arc sine of x gives back x, for x between negative one "
                            "and one. But arc sine of sine of x gives back x only when x is between "
                            "negative pi over two and pi over two. So arc sine of sine of three pi over "
                            "four is pi over four.") as vo:
            d = vo.duration
            self.play(Write(l1[0]), run_time=1.2)
            self.play(FadeIn(l1[1], scale=0.5), run_time=0.4)
            self.wait(d * 0.12)
            self.play(Write(l2m), run_time=1.4)
            self.play(Create(l2[0]), run_time=0.5)
            self.wait(d * 0.1)
            self.play(Create(cross), Create(circ), run_time=0.8)
            self.play(FadeIn(d3), FadeIn(l3), run_time=0.5)
            self.play(Create(j), FadeIn(d1), FadeIn(l1_), Create(rh), run_time=1.0)
            self.play(Write(ex), run_time=1.2)
            self.play(Indicate(d1, color=HL, scale_factor=2), Indicate(ex[0][-4:], color=HL), run_time=1.0)
        self.clear_scene()

        ax, graph = make_axes(y_range=(-2, 2), y_length=3.6)
        graph.shift(1.2 * DOWN)
        sing = plotf(ax, np.sin, -6.5, 6.5, n=400, color=SIN_C)
        hline = Line(ax.c2p(-6.5, 0.5), ax.c2p(6.5, 0.5), color=HL, stroke_width=3)
        dots = VGroup(*[Dot(ax.c2p(x, 0.5), color=WARN, radius=0.1) for x in xs])
        calc = M(r"\sin^{-1}(0.5) = \frac{\pi}{6}", 38)
        calc = VGroup(RoundedRectangle(width=calc.width + 0.6, height=calc.height + 0.5, corner_radius=0.2,
                                       color=INK, stroke_width=3).set_fill(WHITE, 0.9), calc)
        calc.move_to([3.4, 2.8, 0])
        carr = Arrow(calc.get_bottom(), ax.c2p(PI / 6, 0.5) + 0.12 * UP, buff=0.1, color=INK, stroke_width=3,
                     tip_length=0.2)
        cap = T("Chapter 4: recover the rest", 30, color=PURPLE).move_to([-3.6, 2.8, 0])
        with self.voiceover("A calculator hands you one angle. The equation has many. "
                            "Chapter four starts there.") as vo:
            self.play(FadeIn(graph), Create(sing), Create(hline), FadeIn(dots), run_time=1.0)
            self.play(FadeIn(calc), GrowArrow(carr), dots[2].animate.set_color(HL).scale(1.3), run_time=1.0)
            others = [dots[i] for i in (0, 1, 3)]
            self.play(*[Indicate(o, color=WARN, scale_factor=1.8) for o in others], run_time=1.0)
            self.play(FadeIn(cap), run_time=0.6)

    # ------------------------------------------------------------ scene 11
    def s11(self):
        boxes = VGroup(*[RoundedRectangle(width=5.5, height=2.8, corner_radius=0.2, color=MUTED, stroke_width=2)
                         .set_fill(WHITE, 0.6) for _ in range(4)])
        boxes.arrange_in_grid(2, 2, buff=0.3).move_to([0, -0.05, 0])
        heads = [r"\sin(x+2\pi)=\sin x", r"\text{range } [-1,1],\ \text{amplitude} \ge 0",
                 r"\text{period}=\frac{2\pi}{b}", r"\tan:\ \text{period } \pi"]
        cards = []
        for b, h in zip(boxes, heads):
            m = M(h, 34).next_to(b.get_top(), DOWN, buff=0.2)
            cards.append(VGroup(b, m))

        def mini_ax(center, w=2.6, hgt=1.2, xr=(0, 2 * PI), yr=(-1.2, 1.2)):
            a = Axes(x_range=[xr[0], xr[1], 1], y_range=[yr[0], yr[1], 1], x_length=w, y_length=hgt,
                     axis_config={"color": MUTED, "stroke_width": 1.5, "include_tip": False,
                                  "include_ticks": False})
            a.move_to(center)
            return a

        # card 1
        b0 = boxes[0].get_center() + 0.35 * DOWN
        c1c = b0 + 1.4 * LEFT
        mcirc, mcross = self.circle_kit(c1c, 0.6)
        mdot = Dot(c1c + 0.6 * np.array([np.cos(1), np.sin(1), 0]), color=WARN, radius=0.07)
        a1 = mini_ax(b0 + 1.1 * RIGHT)
        w1 = plotf(a1, np.sin, 0, 2 * PI, n=100, color=SIN_C, stroke_width=3)
        cards[0].add(mcirc, mcross, mdot, a1, w1)
        # card 2
        b1c = boxes[1].get_center() + 0.35 * DOWN
        a2 = mini_ax(b1c, w=3.6)
        w2 = plotf(a2, np.sin, 0, 2 * PI, n=100, color=SIN_C, stroke_width=3)
        m2 = DashedLine(a2.c2p(0, 0), a2.c2p(2 * PI, 0), color=TEAL, stroke_width=2)
        br2 = BraceBetweenPoints(a2.c2p(PI / 2, 0), a2.c2p(PI / 2, 1), direction=LEFT, color=WARN, buff=0.05)
        cards[1].add(w2, m2, br2)
        # card 3
        b2c = boxes[2].get_center() + 0.4 * DOWN
        f3 = M(r"a\sin\bigl(b(x-c)\bigr)+d", 36).move_to(b2c + 0.2 * UP)
        ff = T("factor first", 26, color=WARN).next_to(f3, DOWN, buff=0.2)
        cards[2].add(f3, ff)
        # card 4
        b3c = boxes[3].get_center() + 0.35 * DOWN
        a4 = mini_ax(b3c + 1.2 * LEFT, w=2.0, hgt=1.5, xr=(-PI / 2 - 0.1, PI / 2 + 0.1), yr=(-3, 3))
        t4 = plotf(a4, np.tan, -1.25, 1.25, n=100, color=TAN_C, stroke_width=3)
        as4 = VGroup(*[DashedLine(a4.c2p(s * PI / 2, -3), a4.c2p(s * PI / 2, 3), color=WARN, stroke_width=2)
                       for s in (-1, 1)])
        a5 = mini_ax(b3c + 1.3 * RIGHT, w=1.8, hgt=1.5, xr=(-1.1, 1.1), yr=(-1.7, 1.7))
        as5 = plotf(a5, np.arcsin, -1, 1, n=100, color=PURPLE, stroke_width=3)
        cards[3].add(t4, as4, a5, as5)

        with self.voiceover("To recap. The circle unwraps into a wave of period two pi, with properties "
                            "read off the circle.") as vo:
            self.play(FadeIn(cards[0], shift=UP * 0.2), run_time=0.8)
            self.wait(vo.duration * 0.25)
            self.play(FadeIn(cards[1], shift=UP * 0.2), run_time=0.8)
        with self.voiceover("The period is two pi over b, and you factor before reading c. Tangent's period "
                            "is pi. Inverses need restricted domains.") as vo:
            self.play(FadeIn(cards[2], shift=UP * 0.2), run_time=0.8)
            self.wait(vo.duration * 0.3)
            self.play(FadeIn(cards[3], shift=UP * 0.2), run_time=0.8)
        with self.voiceover("Try the mastery quiz, moving between graph, formula, and situation. Then "
                            "Chapter three derives the identities linking these functions, so you never "
                            "need an identity sheet.") as vo:
            self.play(*[FadeOut(c) for c in cards], run_time=0.7)
            nodes = VGroup()
            for name, pos in (("Graph", [0, 2.2, 0]), ("Formula", [-3, -0.9, 0]), ("Situation", [3, -0.9, 0])):
                t = T(name, 34, weight="BOLD")
                nodes.add(VGroup(RoundedRectangle(width=t.width + 0.7, height=0.9, corner_radius=0.2,
                                                  color=PRIMARY, stroke_width=3).set_fill(WHITE, 0.9), t).move_to(pos))
            ends = ((nodes[0].get_corner(DL), nodes[1].get_top()),
                    (nodes[1].get_right(), nodes[2].get_left()),
                    (nodes[2].get_top(), nodes[0].get_corner(DR)))
            arrows = VGroup(*[DoubleArrow(a, b, buff=0.12, color=MUTED, stroke_width=3, tip_length=0.2)
                              for a, b in ends])
            self.play(FadeIn(nodes), Create(arrows), run_time=1.2)
            self.wait(vo.duration * 0.3)
            nxt = T("Next: Chapter 3 · Identities: The Derivation Toolkit", 32, color=PRIMARY).to_edge(DOWN, buff=0.6)
            self.play(FadeIn(nxt, shift=UP * 0.2), run_time=0.8)
