import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403
import numpy as np  # noqa: E402

config.tex_dir = str(Path(__file__).resolve().parent.parent / "build" / "tex-trig-4")

# Script colour roles mapped onto the light Strawberry palette.
SINE = SECONDARY  # "BLUE" sine curve
COSC = GREEN  # cosine curve
LEVEL = PURPLE  # "YELLOW" level lines / chords
SOL = ACCENT  # "ORANGE" solution dots
WARN = PRIMARY  # "RED" warnings
OK = GREEN

ISO = [r"\sin^2 x", r"\cos^2 x", r"\sin x", r"\cos x", r"\tan x", "=", "0"]


def M(tex, **kw):
    """MathTex with the chapter's transform isolation convention."""
    return MathTex(tex, substrings_to_isolate=ISO, **kw)


def T(s, size=30, **kw):
    return Text(s, font_size=size, **kw)


def check(scale=0.9):
    return MathTex(r"\checkmark", color=OK).scale(scale)


def xmark(scale=0.9):
    return MathTex(r"\times", color=WARN).scale(scale * 1.2)


def strike(mob, color=WARN, width=4):
    return Line(mob.get_left() + LEFT * 0.08, mob.get_right() + RIGHT * 0.08, color=color, stroke_width=width)


PI_TICKS = [(0, "0"), (PI / 2, r"\frac{\pi}{2}"), (PI, r"\pi"), (3 * PI / 2, r"\frac{3\pi}{2}"), (TAU, r"2\pi")]


def wave_axes(y_range=(-1.6, 1.6, 0.5), x_length=11, y_length=4.5, band=True, ylabels=(1, -1)):
    ax = Axes(
        x_range=[-0.5, 6.8, 1], y_range=list(y_range), x_length=x_length, y_length=y_length,
        axis_config={"color": MUTED, "include_tip": False, "include_ticks": False, "stroke_width": 2},
    )
    ymin, ymax = y_range[0], y_range[1]
    parts = VGroup()
    if band:
        b = Rectangle(
            width=ax.c2p(TAU, 0)[0] - ax.c2p(0, 0)[0], height=ax.c2p(0, ymax)[1] - ax.c2p(0, ymin)[1],
            fill_color=SECONDARY, fill_opacity=0.08, stroke_width=0,
        )
        b.move_to(ax.c2p(PI, (ymin + ymax) / 2))
        parts.add(b)
    grid = VGroup(*[
        DashedLine(ax.c2p(v, ymin), ax.c2p(v, ymax), color=GRID, stroke_width=1.5, dash_length=0.08)
        for v, _ in PI_TICKS[1:]
    ])
    parts.add(grid, ax)
    labels = VGroup(*[
        MathTex(t, color=MUTED).scale(0.55).next_to(ax.c2p(v, ymin), DOWN, buff=0.12) for v, t in PI_TICKS
    ])
    ylab = VGroup(*[
        MathTex(str(v), color=MUTED).scale(0.5).next_to(ax.c2p(-0.5, v), LEFT, buff=0.1) for v in ylabels
    ])
    parts.add(labels, ylab)
    return parts, ax


def unit_circle(center, r=1.6, quad_labels=True):
    c = np.array(center, dtype=float)
    circ = Circle(radius=r, color=INK, stroke_width=3).move_to(c)
    axes_l = VGroup(
        Line(c + LEFT * (r + 0.3), c + RIGHT * (r + 0.3), color=MUTED, stroke_width=2),
        Line(c + DOWN * (r + 0.3), c + UP * (r + 0.3), color=MUTED, stroke_width=2),
    )
    g = VGroup(axes_l, circ)
    if quad_labels:
        d = (r + 0.25) / np.sqrt(2)
        for lab, (sx, sy) in zip(["I", "II", "III", "IV"], [(1, 1), (-1, 1), (-1, -1), (1, -1)]):
            g.add(MathTex(r"\text{" + lab + "}", color=MUTED).scale(0.55).move_to(c + np.array([sx * d, sy * d, 0])))
    return g


def pt(center, r, ang):
    return np.array(center, dtype=float) + r * np.array([np.cos(ang), np.sin(ang), 0])


def radius(center, r, ang, color=SOL, width=5):
    return Line(np.array(center, dtype=float), pt(center, r, ang), color=color, stroke_width=width)


def quad_shade(center, r, start, color, opacity=0.14):
    return AnnularSector(
        inner_radius=0, outer_radius=r, angle=PI, start_angle=start,
        fill_color=color, fill_opacity=opacity, stroke_width=0,
    ).shift(np.array(center, dtype=float))


def mini_circle(center, r=0.55):
    c = np.array(center, dtype=float)
    return VGroup(
        Line(c + LEFT * (r + 0.12), c + RIGHT * (r + 0.12), color=MUTED, stroke_width=1.5),
        Line(c + DOWN * (r + 0.12), c + UP * (r + 0.12), color=MUTED, stroke_width=1.5),
        Circle(radius=r, color=INK, stroke_width=2).move_to(c),
    )


class TrigCh4Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Trigonometry", "Chapter 4 · Solving Trigonometric Equations",
            "Chapter 4. Solving trigonometric equations: running trigonometry backwards, from a value to every angle that produces it.",
        )
        self.scene1()
        self.scene2()
        self.scene3()
        self.scene4()
        self.scene5()
        self.scene6()

    # ------------------------------------------------------------------ Scene 1
    def scene1(self):
        eq = MathTex(r"\sin x = \frac{1}{2}").scale(1.4).move_to(LEFT * 3.2)
        with self.voiceover(
            "Solve sine of x equals one half. A calculator says pi over six. That is one solution. It is not the solution."
        ) as vo:
            self.play(Write(eq), run_time=vo.duration * 0.2)
            box = RoundedRectangle(corner_radius=0.3, width=5.2, height=2.2, color=INK, stroke_width=3,
                                   fill_color=WHITE, fill_opacity=0.6)
            screen = MathTex(r"\sin^{-1}(0.5) = \frac{\pi}{6}").scale(1.0)
            kicker = T("calculator", 22, color=MUTED).next_to(box.get_top(), DOWN, buff=0.2)
            calc = VGroup(box, screen, kicker).move_to(RIGHT * 3.2 + UP * 0.4)
            screen.move_to(box.get_center() + DOWN * 0.15)
            self.play(FadeIn(calc, shift=LEFT * 1.5), run_time=vo.duration * 0.2)
            one = MathTex(r"\text{one solution}").scale(0.8).next_to(calc, DOWN, buff=0.35).shift(LEFT * 0.9)
            self.play(FadeIn(one), run_time=vo.duration * 0.15)
            neq = MathTex(r"\neq \text{the solution}", color=WARN).scale(0.8).next_to(one, RIGHT, buff=0.25)
            self.play(FadeIn(neq), run_time=vo.duration * 0.15)
        self.play(FadeOut(VGroup(calc, one, neq)), eq.animate.scale(0.65).to_corner(UL, buff=0.4), run_time=0.8)

        # Beat b: wide axes
        ax = Axes(
            x_range=[-7, 16, 1], y_range=[-1.6, 1.6, 0.5], x_length=11.6, y_length=4,
            axis_config={"color": MUTED, "include_tip": False, "include_ticks": False},
        ).shift(DOWN * 0.5)
        curve = ax.plot(np.sin, x_range=[-7, 16], color=SINE, stroke_width=4)
        line = DashedLine(ax.c2p(-7, 0.5), ax.c2p(16, 0.5), color=LEVEL, stroke_width=3)
        lab = MathTex(r"\text{level line: } y = \tfrac12", color=LEVEL).scale(0.75).next_to(eq, RIGHT, buff=1.0)
        xs = sorted(b + TAU * n for n in (-1, 0, 1, 2) for b in (PI / 6, 5 * PI / 6))
        xs = [x for x in xs if -7 <= x <= 16]
        dots = VGroup(*[Dot(ax.c2p(x, 0.5), color=SOL, radius=0.09) for x in xs])
        ell_l = MathTex(r"\cdots", color=SOL).next_to(ax.c2p(-7, 0.5), LEFT, buff=0.1)
        ell_r = MathTex(r"\cdots", color=SOL).next_to(ax.c2p(16, 0.5), RIGHT, buff=0.1)
        with self.voiceover(
            "Draw the line y equals one half across the sine wave. Every crossing is a solution, and there are infinitely many."
        ) as vo:
            self.play(Create(ax), Create(curve), run_time=vo.duration * 0.3)
            self.play(Create(line), FadeIn(lab), run_time=vo.duration * 0.15)
            self.play(LaggedStart(*[GrowFromCenter(d) for d in dots], lag_ratio=0.15), run_time=vo.duration * 0.3)
            self.play(FadeIn(ell_l), FadeIn(ell_r), run_time=vo.duration * 0.1)
        self.play(FadeOut(VGroup(ax, curve, line, lab, dots, ell_l, ell_r)), run_time=0.6)

        # Beat c: level tracker
        parts, ax = wave_axes()
        parts.shift(DOWN * 0.4)
        curve = ax.plot(np.sin, x_range=[-0.5, 6.8], color=SINE, stroke_width=4)
        level = ValueTracker(0.5)
        lvl_line = always_redraw(lambda: DashedLine(
            ax.c2p(-0.5, level.get_value()), ax.c2p(6.8, level.get_value()), color=LEVEL, stroke_width=3))
        num = always_redraw(lambda: DecimalNumber(level.get_value(), num_decimal_places=2, color=LEVEL, font_size=30)
                            .next_to(ax.c2p(6.8, level.get_value()), RIGHT, buff=0.1))

        def mkdots():
            v = level.get_value()
            a = np.arcsin(min(v, 1.0))
            op = 1 if v <= 1 else 0
            return VGroup(
                Dot(ax.c2p(a, min(v, 1.0)), color=SOL, radius=0.1, fill_opacity=op),
                Dot(ax.c2p(PI - a, min(v, 1.0)), color=SOL, radius=0.1, fill_opacity=op),
            )

        mdots = always_redraw(mkdots)
        self.play(FadeIn(parts), Create(curve), run_time=1.0)
        self.add(lvl_line, num, mdots)
        with self.voiceover(
            "Raise the line toward one, and each pair of crossings slides together, merging at the peak. Push past one, and they vanish."
        ) as vo:
            self.play(level.animate.set_value(0.9), run_time=vo.duration * 0.25)
            self.play(level.animate.set_value(1.0), run_time=vo.duration * 0.15)
            self.play(Flash(ax.c2p(PI / 2, 1), color=SOL, flash_radius=0.4), run_time=vo.duration * 0.1)
            mdots.clear_updaters()
            self.play(FadeOut(mdots), run_time=vo.duration * 0.05)
            self.play(level.animate.set_value(1.2), run_time=vo.duration * 0.2)
            self.play(level.animate.set_value(0.5), run_time=vo.duration * 0.2)
        lvl_line.clear_updaters()
        num.clear_updaters()
        self.clear_scene()

    # ------------------------------------------------------------------ Scene 2
    def scene2(self):
        title = T("The two-step recipe", 36, weight="BOLD").to_edge(UP, buff=0.6)
        l1 = MathTex(r"1.\ \ x_{\text{ref}} = \sin^{-1}|v|")
        l2 = Tex(r"2.\ \ Place it in every quadrant the sign allows, then add whole periods")
        lines = VGroup(l1, l2).arrange(DOWN, aligned_edge=LEFT, buff=0.6)
        lines.scale_to_fit_width(min(12, lines.width)).move_to(DOWN * 0.3)
        frame = RoundedRectangle(corner_radius=0.25, width=lines.width + 1, height=lines.height + 1.1,
                                 color=PRIMARY, stroke_width=3).move_to(lines)
        with self.voiceover(
            "The recipe. First, find the reference angle from the size of the value. Second, place it in every quadrant the sign allows, then add whole periods."
        ) as vo:
            self.play(FadeIn(title), Create(frame), run_time=vo.duration * 0.15)
            self.play(Write(l1), run_time=vo.duration * 0.15)
            r1 = SurroundingRectangle(l1, color=ACCENT, buff=0.12)
            self.play(Create(r1), run_time=vo.duration * 0.15)
            self.play(Write(l2), ReplacementTransform(r1, SurroundingRectangle(l2, color=ACCENT, buff=0.12)),
                      run_time=vo.duration * 0.35)
        self.clear_scene()

        # Beat b
        C = np.array([-4.5, 0, 0])
        R = 1.6
        uc = unit_circle(C, R)
        shade = quad_shade(C, R, 0, GREEN)
        r_a = radius(C, R, PI / 6)
        r_b = radius(C, R, 5 * PI / 6)
        chord = Line(pt(C, R, 5 * PI / 6), pt(C, R, PI / 6), color=LEVEL, stroke_width=4)
        a1 = MathTex(r"\tfrac{\pi}{6}", color=SOL).scale(0.6).move_to(pt(C, 0.7, PI / 12))
        ln1 = MathTex(r"x = \frac{\pi}{6} \quad\text{or}\quad x = \pi - \frac{\pi}{6} = \frac{5\pi}{6}").scale(0.75)
        ln1.next_to(uc, RIGHT, buff=0.6).shift(UP * 1)
        with self.voiceover(
            "For sine x equals one half, the reference angle is pi over six. Sine is positive in quadrants one and two, so x is pi over six, or pi minus that, which is five pi over six."
        ) as vo:
            self.play(Create(uc), run_time=vo.duration * 0.12)
            self.play(Create(r_a), FadeIn(a1), run_time=vo.duration * 0.15)
            self.play(FadeIn(shade), run_time=vo.duration * 0.12)
            self.play(Create(chord), Create(r_b), run_time=vo.duration * 0.15)
            self.play(Write(ln1), run_time=vo.duration * 0.3)

        # Beat c
        g1 = MathTex(r"x = \frac{\pi}{6} + 2\pi n").scale(0.75)
        g2 = MathTex(r"x = \frac{5\pi}{6} + 2\pi n, \qquad n \in \mathbb{Z}").scale(0.75)
        VGroup(g1, g2).arrange(DOWN, aligned_edge=LEFT, buff=0.35).next_to(ln1, DOWN, buff=0.6).align_to(ln1, LEFT)
        plus = MathTex(r"+2\pi", color=SOL).scale(0.8).next_to(pt(C, R, PI / 6), UR, buff=0.1)
        with self.voiceover(
            "Sine repeats every two pi, so add two pi times n, for any whole number n, positive, negative, or zero. That is the general solution."
        ) as vo:
            self.play(Rotate(r_a, TAU, about_point=C), FadeIn(plus, scale=1.5), run_time=vo.duration * 0.3)
            self.play(Write(g1), run_time=vo.duration * 0.25)
            self.play(Write(g2), run_time=vo.duration * 0.25)
            self.play(Indicate(VGroup(g1, g2), color=PRIMARY), run_time=vo.duration * 0.15)
        self.clear_scene()

        # Beat d
        def card(title, body, pos):
            box = RoundedRectangle(corner_radius=0.25, width=5.8, height=3.4, color=INK, stroke_width=2.5)
            t = T(title, 32, weight="BOLD")
            content = VGroup(t, *body).arrange(DOWN, buff=0.45)
            return VGroup(box, content.move_to(box)).move_to(pos)

        c1 = card("Interval solution", [MathTex(r"0 \le x < 2\pi"), MathTex(r"\left\{\frac{\pi}{6}, \frac{5\pi}{6}\right\}")], LEFT * 3.3)
        c2 = card("General solution", [MathTex(r"\frac{\pi}{6} + 2\pi n,\ \frac{5\pi}{6} + 2\pi n")], RIGHT * 3.3)
        c1[0].set_color(SECONDARY)
        c2[0].set_color(PRIMARY)
        with self.voiceover(
            "If the question gives a range, like zero to two pi, it wants a finite list: the interval solution. With no range, it wants the general solution."
        ) as vo:
            self.play(FadeIn(c1, shift=UP * 0.3), run_time=vo.duration * 0.3)
            self.wait(vo.duration * 0.25)
            self.play(FadeIn(c2, shift=UP * 0.3), run_time=vo.duration * 0.3)
        self.clear_scene()

        # Beat e: partner table
        row1 = MathTex(r"\sin x = v:\ \ \pi - x")
        row2 = MathTex(r"\cos x = v:\ \ -x \text{ or } 2\pi - x")
        row3 = MathTex(r"\tan x = v:\ \ x + \pi n")
        for r_, y in zip([row1, row2, row3], [3.0, 1.4, -1.7]):
            r_.scale(0.8).move_to([0, y, 0]).to_edge(LEFT, buff=0.8)
        row3.set_opacity(0.3)
        IC1, IC2, IC3 = np.array([3.8, 3.0, 0]), np.array([3.8, 0.7, 0]), np.array([3.8, -2.3, 0])
        ir = 0.55
        icon1 = VGroup(mini_circle(IC1, ir), radius(IC1, ir, PI / 6, width=3), radius(IC1, ir, 5 * PI / 6, width=3),
                       Line(pt(IC1, ir, 5 * PI / 6), pt(IC1, ir, PI / 6), color=LEVEL, stroke_width=2.5))
        ir2 = 0.9
        cshade = quad_shade(IC2, ir2, PI / 2, WARN)
        cr_a = radius(IC2, ir2, PI / 6, width=4)
        cr_b = radius(IC2, ir2, -PI / 6, width=4)
        icon2 = VGroup(mini_circle(IC2, ir2), cr_a, cr_b)
        self.play(FadeIn(row1), FadeIn(row2), FadeIn(row3), FadeIn(icon1), FadeIn(icon2), run_time=0.8)
        cex = MathTex(r"\cos x = -\frac{\sqrt2}{2}:\ \ x = \frac{3\pi}{4},\ \frac{5\pi}{4}").scale(0.72)
        cex.next_to(row2, DOWN, buff=0.35).align_to(row2, LEFT).shift(RIGHT * 0.4)
        vline = Line(IC2 + np.array([-0.707 * ir2, -ir2 - 0.1, 0]), IC2 + np.array([-0.707 * ir2, ir2 + 0.1, 0]),
                     color=LEVEL, stroke_width=3)
        with self.voiceover(
            "For sine, the partner is pi minus x. For cosine, it is negative x, the same angle as two pi minus x. Take cosine x equals negative square root of two, over two. The reference angle is pi over four, and cosine is negative in quadrants two and three. So x is three pi over four, or five pi over four."
        ) as vo:
            self.play(Indicate(row1, color=PRIMARY), Indicate(icon1, color=PRIMARY), run_time=vo.duration * 0.1)
            hl = SurroundingRectangle(row2, color=ACCENT, buff=0.12)
            self.play(Create(hl), Indicate(icon2, color=PRIMARY), run_time=vo.duration * 0.12)
            self.wait(vo.duration * 0.1)
            self.play(Write(cex), run_time=vo.duration * 0.2)
            self.play(FadeIn(cshade), Create(vline), run_time=vo.duration * 0.12)
            self.play(Rotate(cr_a, 7 * PI / 12, about_point=IC2), Rotate(cr_b, -7 * PI / 12, about_point=IC2),
                      run_time=vo.duration * 0.2)

        # Beat f
        gen = MathTex(r"\text{general: } x = \pm\frac{3\pi}{4} + 2\pi n").scale(0.72)
        gen.next_to(cex, DOWN, buff=0.3).align_to(cex, LEFT)
        tr_a = radius(IC3, ir, PI / 4, width=3)
        tr_b = radius(IC3, ir, 5 * PI / 4, width=3)
        icon3 = VGroup(mini_circle(IC3, ir), tr_a, tr_b)
        plpi = MathTex(r"+\pi", color=SOL).scale(0.6).next_to(pt(IC3, ir, 5 * PI / 4), DL, buff=0.05)
        tex3 = MathTex(r"\tan x = 1:\ \ x = \frac{\pi}{4} + \pi n").scale(0.72)
        tex3.next_to(row3, DOWN, buff=0.35).align_to(cex, LEFT)
        with self.voiceover(
            "Written generally, that is plus or minus three pi over four, plus two pi n. Tangent has one solution per period, and its period is pi. So tangent x equals one gives pi over four, plus pi n."
        ) as vo:
            self.play(Write(gen), run_time=vo.duration * 0.25)
            self.play(row3.animate.set_opacity(1), FadeOut(hl), run_time=vo.duration * 0.1)
            self.play(Create(icon3[0]), Create(tr_a), run_time=vo.duration * 0.12)
            self.play(Create(tr_b), FadeIn(plpi), run_time=vo.duration * 0.12)
            self.play(Write(tex3), run_time=vo.duration * 0.25)
        self.clear_scene()

        # Beat g
        C = np.array([-4.5, 0, 0])
        e1 = M(r"2\sin x + \sqrt3 = 0").move_to([2.3, 2.6, 0])
        e2 = M(r"\sin x = -\frac{\sqrt3}{2}").move_to([2.3, 2.6, 0])
        uc = unit_circle(C, R)
        sh = quad_shade(C, R, PI, WARN)
        chord = Line(pt(C, R, 4 * PI / 3), pt(C, R, 5 * PI / 3), color=LEVEL, stroke_width=4)
        xref = MathTex(r"x_{\text{ref}} = \frac{\pi}{3}").scale(0.8).move_to([2.3, 1.1, 0])
        ra = radius(C, R, 4 * PI / 3)
        rb = radius(C, R, 5 * PI / 3)
        la = MathTex(r"\pi + \frac{\pi}{3}", color=SOL).scale(0.6).move_to(C + np.array([-1.3, -2.35, 0]))
        lb = MathTex(r"2\pi - \frac{\pi}{3}", color=SOL).scale(0.6).move_to(C + np.array([1.3, -2.35, 0]))
        res = MathTex(r"x = \frac{4\pi}{3},\ \frac{5\pi}{3}").move_to([2.3, -0.9, 0])
        box = SurroundingRectangle(res, color=OK, buff=0.2, stroke_width=4)
        with self.voiceover(
            "Now a negative value. Two sine x plus the square root of three equals zero, so sine x is negative root three over two. The reference angle is pi over three, placed in quadrants three and four: four pi over three and five pi over three."
        ) as vo:
            self.play(Write(e1), Create(uc), run_time=vo.duration * 0.15)
            self.play(TransformMatchingTex(e1, e2), run_time=vo.duration * 0.15)
            self.play(Create(chord), FadeIn(sh), run_time=vo.duration * 0.1)
            self.play(Write(xref), run_time=vo.duration * 0.12)
            self.play(Create(ra), FadeIn(la), run_time=vo.duration * 0.12)
            self.play(Create(rb), FadeIn(lb), run_time=vo.duration * 0.12)
            self.play(Write(res), Create(box), run_time=vo.duration * 0.15)
        self.clear_scene()

    # ------------------------------------------------------------------ Scene 3
    def scene3(self):
        title = T("Reduce to one function", 36, weight="BOLD").to_edge(UP, buff=0.5)
        m1 = M(r"2\sin x\cos x = \sin x")
        m2 = M(r"2\cos^2 x + \cos x - 1 = 0")
        m3 = M(r"2\sin^2 x + 3\cos x = 3")
        messy = VGroup(m1, m2, m3).scale(0.85).arrange(DOWN, buff=0.6, aligned_edge=LEFT).move_to(LEFT * 3.5 + DOWN * 0.3)
        target = MathTex(r"\text{one function} = \text{number}").move_to(RIGHT * 3.8 + DOWN * 0.3)
        tbox = SurroundingRectangle(target, color=OK, buff=0.25)
        arr = Arrow(messy.get_right() + RIGHT * 0.2, tbox.get_left() + LEFT * 0.1, color=MUTED, buff=0)
        with self.voiceover(
            "Real equations arrive mixed. The strategy never changes. Use identities and algebra to reach one trig function, of one angle."
        ) as vo:
            self.play(FadeIn(title), run_time=vo.duration * 0.1)
            self.play(LaggedStart(*[FadeIn(m, shift=RIGHT * 0.4) for m in messy], lag_ratio=0.3),
                      run_time=vo.duration * 0.35)
            self.play(GrowArrow(arr), run_time=vo.duration * 0.15)
            self.play(Write(target), Create(tbox), run_time=vo.duration * 0.25)

        # Beat b
        self.play(FadeOut(VGroup(title, m2, m3, target, tbox, arr)), m1.animate.scale(1 / 0.85).move_to(UP * 2.6),
                  run_time=0.8)
        div = MathTex(r"\frac{2\sin x\cos x}{\sin x} = \frac{\sin x}{\sin x}").move_to(UP * 0.6)
        crs = Cross(div, stroke_color=WARN, stroke_width=6)
        warn_t = T("Never divide by something that can be zero.", 30, color=WARN)
        warn = VGroup(RoundedRectangle(corner_radius=0.2, width=warn_t.width + 0.8, height=1.0, color=WARN,
                                       fill_color=WARN, fill_opacity=0.08), warn_t).move_to(DOWN * 1.8)
        warn_t.move_to(warn[0])
        with self.voiceover(
            "Pattern one. Solve two sine x cosine x equals sine x. It is tempting to divide by sine x. Don't. That throws away every solution where sine x is zero."
        ) as vo:
            self.play(Indicate(m1, color=PRIMARY), run_time=vo.duration * 0.2)
            self.play(TransformFromCopy(m1, div), run_time=vo.duration * 0.25)
            self.play(Create(crs), run_time=vo.duration * 0.12)
            self.play(FadeIn(warn, shift=UP * 0.3), run_time=vo.duration * 0.2)

        # Beat c
        self.play(FadeOut(VGroup(div, crs, warn)), run_time=0.5)
        m1b = M(r"2\sin x\cos x - \sin x = 0").move_to(m1)
        m1c = M(r"\sin x\,(2\cos x - 1) = 0").move_to(m1)
        cospart = m1c.get_part_by_tex(r"\cos x")
        eqpart = m1c.get_part_by_tex("=")
        ul = Line([cospart.get_left()[0] - 0.42, cospart.get_bottom()[1] - 0.15, 0],
                  [eqpart.get_left()[0] - 0.12, cospart.get_bottom()[1] - 0.15, 0], color=ACCENT, stroke_width=5)
        b1 = MathTex(r"\sin x = 0 \Rightarrow x = 0,\ \pi").move_to([-3.4, 0.4, 0])
        b2 = MathTex(r"\cos x = \frac{1}{2} \Rightarrow x = \frac{\pi}{3},\ \frac{5\pi}{3}").move_to([3.3, 0.4, 0])
        a1 = Arrow(m1.get_bottom() + LEFT * 0.4, b1.get_top(), color=MUTED, buff=0.15)
        a2 = Arrow(m1.get_bottom() + RIGHT * 0.4, b2.get_top(), color=MUTED, buff=0.15)
        four = VGroup(MathTex(r"4", color=OK).scale(1.8), T("solutions", 30, color=OK)).arrange(RIGHT, buff=0.25)
        two = VGroup(MathTex(r"2", color=MUTED).scale(1.8), T("if you divide", 28, color=MUTED)).arrange(RIGHT, buff=0.25)
        VGroup(four, two).arrange(RIGHT, buff=1.5).move_to(DOWN * 2.2)
        two_x = strike(two[0], width=6)
        with self.voiceover(
            "Instead, move everything to one side and factor. Sine x, times the quantity two cosine x minus one, equals zero. Sine x equals zero gives zero and pi. Cosine x equals one half gives pi over three and five pi over three. Four solutions. Dividing finds only two."
        ) as vo:
            self.play(TransformMatchingTex(m1, m1b), run_time=vo.duration * 0.1)
            self.wait(vo.duration * 0.04)
            self.play(TransformMatchingTex(m1b, m1c), run_time=vo.duration * 0.1)
            self.play(Create(ul), run_time=vo.duration * 0.08)
            self.play(FadeOut(ul), GrowArrow(a1), Write(b1), run_time=vo.duration * 0.16)
            self.play(GrowArrow(a2), Write(b2), run_time=vo.duration * 0.2)
            self.play(FadeIn(four, scale=1.3), run_time=vo.duration * 0.08)
            self.play(FadeIn(two), Create(two_x), run_time=vo.duration * 0.1)
        self.clear_scene()

        # Beat d
        L = [
            M(r"2\cos^2 x + \cos x - 1 = 0"),
            MathTex(r"u = \cos x", color=SECONDARY),
            MathTex(r"2u^2 + u - 1 = 0"),
            MathTex(r"(2u - 1)(u + 1) = 0"),
            MathTex(r"\cos x = \tfrac12 \ \text{or}\ \cos x = -1"),
            MathTex(r"x = \frac{\pi}{3},\ \pi,\ \frac{5\pi}{3}", color=OK),
        ]
        col = VGroup(*L).arrange(DOWN, buff=0.32).scale(0.85).move_to(ORIGIN)
        ck = VGroup(check(0.8), check(0.8)).arrange(RIGHT, buff=0.15).next_to(L[4], RIGHT, buff=0.25)
        badge_t = MathTex(r"-1 \le \cos x \le 1").scale(0.55)
        badge = VGroup(SurroundingRectangle(badge_t, color=OK, buff=0.1, corner_radius=0.1), badge_t)
        badge.next_to(ck, RIGHT, buff=0.2)
        with self.voiceover(
            "Pattern two, a quadratic in disguise. Two cosine squared x plus cosine x minus one equals zero. Let u equal cosine x, and factor. Cosine x is one half, or negative one. Both lie between negative one and one, so both count: pi over three, pi, and five pi over three."
        ) as vo:
            self.play(Write(L[0]), run_time=vo.duration * 0.12)
            self.play(FadeIn(L[1]), run_time=vo.duration * 0.08)
            self.play(Write(L[2]), run_time=vo.duration * 0.08)
            self.play(Write(L[3]), run_time=vo.duration * 0.08)
            self.play(Write(L[4]), run_time=vo.duration * 0.1)
            self.play(FadeIn(ck), FadeIn(badge), run_time=vo.duration * 0.12)
            self.play(Write(L[5]), run_time=vo.duration * 0.12)
        algebra = VGroup(col, ck, badge)
        self.play(algebra.animate.scale_to_fit_width(5.3).to_edge(LEFT, buff=0.3), run_time=0.9)
        parts, ax = wave_axes(y_range=(-1.6, 2.4, 1), x_length=7.5, y_length=4, band=False, ylabels=(2, 1, -1))
        parts.move_to(RIGHT * 2.8)
        ax_curve = ax.plot(lambda x: 2 * np.cos(x) ** 2 + np.cos(x) - 1, x_range=[-0.5, 6.8], color=COSC, stroke_width=4)
        zline = DashedLine(ax.c2p(-0.5, 0), ax.c2p(6.8, 0), color=LEVEL, stroke_width=3)
        gd = VGroup(*[Dot(ax.c2p(x, 0), color=SOL, radius=0.1) for x in (PI / 3, PI, 5 * PI / 3)])
        glab = MathTex(r"y = 2\cos^2 x + \cos x - 1", color=COSC).scale(0.6).next_to(ax.c2p(PI, 2.4), UP, buff=0.1)
        self.play(FadeIn(parts), Create(ax_curve), Create(zline), FadeIn(glab), run_time=1.5)
        self.play(LaggedStart(*[GrowFromCenter(d) for d in gd], lag_ratio=0.3), run_time=1.0)
        self.play(Indicate(gd[1], color=PRIMARY, scale_factor=1.8), run_time=1.0)
        self.play(Indicate(gd[1], color=PRIMARY, scale_factor=1.8), run_time=1.0)
        self.clear_scene()

        # Beat e
        e1 = M(r"\cos^2 x - \cos x - 2 = 0").move_to(UP * 2.8)
        e2 = MathTex(r"(\cos x - 2)(\cos x + 1) = 0").move_to(UP * 2.8)
        l_b = VGroup(MathTex(r"\cos x = 2"), xmark()).arrange(RIGHT, buff=0.3).move_to([-3.4, 1.2, 0])
        nl = NumberLine(x_range=[-2.5, 2.5, 0.5], length=5.5, color=MUTED, include_numbers=False,
                        tick_size=0.06).move_to([-3.4, -0.8, 0])
        nums = VGroup(*[MathTex(str(v), color=MUTED).scale(0.7).next_to(nl.n2p(v), DOWN, buff=0.15) for v in (-2, -1, 0, 1, 2)])
        band = Line(nl.n2p(-1), nl.n2p(1), color=OK, stroke_width=12, stroke_opacity=0.6)
        rdot = Dot(nl.n2p(2), color=WARN, radius=0.12)
        allowed = T("allowed", 22, color=OK).next_to(band, UP, buff=0.15)
        r_b = VGroup(MathTex(r"\cos x = -1 \Rightarrow x = \pi"), check()).arrange(RIGHT, buff=0.3).move_to([3.4, 1.2, 0])
        aa = Arrow(e2.get_bottom() + LEFT * 0.5, l_b.get_top(), color=MUTED, buff=0.15)
        ab = Arrow(e2.get_bottom() + RIGHT * 0.5, r_b.get_top(), color=MUTED, buff=0.15)
        with self.voiceover(
            "A root outside that range is thrown out. Cosine squared x minus cosine x minus two factors, giving cosine x equals two, which is impossible, or negative one. So x is pi."
        ) as vo:
            self.play(Write(e1), run_time=vo.duration * 0.15)
            self.play(TransformMatchingShapes(e1, e2), run_time=vo.duration * 0.15)
            self.play(GrowArrow(aa), FadeIn(l_b[0]), run_time=vo.duration * 0.1)
            self.play(Create(nl), FadeIn(nums), Create(band), FadeIn(allowed), run_time=vo.duration * 0.12)
            self.play(GrowFromCenter(rdot), FadeIn(l_b[1], scale=1.5), run_time=vo.duration * 0.12)
            self.play(GrowArrow(ab), Write(r_b), run_time=vo.duration * 0.2)
        self.clear_scene()

        # Beat f
        chain = [
            M(r"2\sin^2 x + 3\cos x = 3"),
            M(r"2(1 - \cos^2 x) + 3\cos x = 3"),
            M(r"2\cos^2 x - 3\cos x + 1 = 0"),
            M(r"(2\cos x - 1)(\cos x - 1) = 0"),
            M(r"\cos x = \tfrac12 \ \text{or}\ \cos x = 1"),
            M(r"x = 0,\ \frac{\pi}{3},\ \frac{5\pi}{3}"),
        ]
        for c in chain:
            c.scale(1.1).move_to(UP * 0.3)
        ident = MathTex(r"\sin^2 x = 1 - \cos^2 x", color=ACCENT).scale(0.8).move_to(UP * 2.6)
        idarr = Arrow(ident.get_bottom(), chain[0].get_top() + UP * 0.05, color=ACCENT, buff=0.12)
        cap = Tex(r"A square is a Pythagorean invitation.").scale(0.9).move_to(DOWN * 2.3)
        capbox = SurroundingRectangle(cap, color=PRIMARY, buff=0.25, corner_radius=0.15)
        with self.voiceover(
            "Pattern three. Two sine squared x plus three cosine x equals three. Replace sine squared with one minus cosine squared, and it becomes a quadratic in cosine. It factors: cosine x equals one half, or cosine x equals one. So x is zero, pi over three, and five pi over three. A square is a Pythagorean invitation."
        ) as vo:
            self.play(Write(chain[0]), run_time=vo.duration * 0.08)
            self.play(chain[0].get_part_by_tex(r"\sin^2 x").animate.set_color(ACCENT), run_time=vo.duration * 0.05)
            self.play(FadeIn(ident), GrowArrow(idarr), run_time=vo.duration * 0.08)
            self.play(TransformMatchingTex(chain[0], chain[1]), FadeOut(idarr), ident.animate.set_opacity(0.35),
                      run_time=vo.duration * 0.08)
            self.wait(vo.duration * 0.03)
            self.play(TransformMatchingTex(chain[1], chain[2]), run_time=vo.duration * 0.08)
            self.wait(vo.duration * 0.03)
            self.play(TransformMatchingTex(chain[2], chain[3]), run_time=vo.duration * 0.08)
            self.wait(vo.duration * 0.02)
            self.play(TransformMatchingTex(chain[3], chain[4]), run_time=vo.duration * 0.08)
            self.wait(vo.duration * 0.03)
            self.play(TransformMatchingTex(chain[4], chain[5]), run_time=vo.duration * 0.08)
            self.play(chain[5].animate.set_color(OK), run_time=vo.duration * 0.04)
            self.play(Write(cap), Create(capbox), run_time=vo.duration * 0.12)
        self.clear_scene()

    # ------------------------------------------------------------------ Scene 4
    def scene4(self):
        eq = MathTex(r"\sin 2x = \frac{\sqrt{3}}{2},\quad 0 \le x < 2\pi").move_to(UP * 3.1)
        trap = MathTex(r"2x = \frac{\pi}{3}, \frac{2\pi}{3} \Rightarrow x = \frac{\pi}{6}, \frac{\pi}{3}", color=MUTED).move_to(UP * 0.8)
        trap_lab = T("the trap", 26, color=MUTED).next_to(trap, UP, buff=0.3)
        two4 = T("2 of 4", 40, color=WARN, weight="BOLD").next_to(trap, DOWN, buff=0.6)
        with self.voiceover(
            "Now solve sine of two x equals the square root of three, over two, for x from zero to two pi. The trap is to solve for two x, halve, and stop. That finds only two of the four solutions."
        ) as vo:
            self.play(Write(eq), run_time=vo.duration * 0.25)
            self.wait(vo.duration * 0.15)
            self.play(FadeIn(trap_lab), Write(trap), run_time=vo.duration * 0.25)
            self.play(FadeIn(two4, scale=1.3), run_time=vo.duration * 0.12)
        self.play(FadeOut(VGroup(trap, trap_lab, two4)), run_time=0.5)

        # Beat b
        X0 = -5.0
        unit = 5 / TAU

        def pi_labels(line, vals, below=True):
            out = VGroup()
            for v, t in vals:
                m = MathTex(t, color=MUTED).scale(0.65)
                m.next_to(line.n2p(v), DOWN if below else UP, buff=0.15)
                out.add(m)
            return out

        xline = NumberLine(x_range=[0, TAU, PI / 2], length=5, color=INK, tick_size=0.08)
        xline.move_to([X0 + 2.5, -1.5, 0])
        xlabs = pi_labels(xline, [(0, "0"), (PI, r"\pi"), (TAU, r"2\pi")])
        xname = MathTex(r"x", color=INK).scale(0.8).next_to(xline, LEFT, buff=0.3)
        ushort = NumberLine(x_range=[0, TAU, PI / 2], length=5, color=SECONDARY, tick_size=0.08).move_to([X0 + 2.5, 0.5, 0])
        ulong = NumberLine(x_range=[0, 2 * TAU, PI / 2], length=10, color=SECONDARY, tick_size=0.08).move_to([X0 + 5, 0.5, 0])
        uname = MathTex(r"u", color=SECONDARY).scale(0.8).next_to(ushort, LEFT, buff=0.3)
        u0 = MathTex("0", color=MUTED).scale(0.65).next_to(ushort.n2p(0), DOWN, buff=0.15)
        uend = MathTex(r"2\pi", color=MUTED).scale(0.65).next_to(ushort.n2p(TAU), DOWN, buff=0.15)
        uend2 = MathTex(r"4\pi", color=MUTED).scale(0.65).next_to(ulong.n2p(2 * TAU), DOWN, buff=0.15)
        umid = VGroup(*[MathTex(t, color=MUTED).scale(0.65).next_to(ulong.n2p(v), DOWN, buff=0.15)
                        for v, t in [(PI, r"\pi"), (TAU, r"2\pi"), (3 * PI, r"3\pi")]])
        ucap = MathTex(r"u = 2x,\quad u \in [0, 4\pi)").scale(0.85).move_to(UP * 2.1)
        with self.voiceover(
            "The fix. Let u equal two x. As x runs from zero to two pi, u runs from zero to four pi. Twice as long, so twice as many solutions. Widen the interval before you solve."
        ) as vo:
            self.play(Write(ucap), run_time=vo.duration * 0.15)
            self.play(Create(xline), FadeIn(xlabs), FadeIn(xname), run_time=vo.duration * 0.15)
            self.play(Create(ushort), FadeIn(u0), FadeIn(uend), FadeIn(uname), run_time=vo.duration * 0.12)
            self.play(Transform(ushort, ulong), Transform(uend, uend2), run_time=vo.duration * 0.25)
            self.play(FadeIn(umid), run_time=vo.duration * 0.1)
        uline = ushort

        # Beat c1
        us = [PI / 3, 2 * PI / 3, 7 * PI / 3, 8 * PI / 3]
        udots = [Dot(ulong.n2p(u), color=SOL, radius=0.1) for u in us]
        ut1 = MathTex(r"u = \frac{\pi}{3},\ \frac{2\pi}{3}").scale(0.8).move_to([3.4, -1.1, 0])
        ut2 = MathTex(r"u = \frac{\pi}{3},\ \frac{2\pi}{3},\ \frac{7\pi}{3},\ \frac{8\pi}{3}").scale(0.8).move_to([3.4, -1.1, 0])
        ca1 = CurvedArrow(ulong.n2p(us[0]) + UP * 0.15, ulong.n2p(us[2]) + UP * 0.15, angle=-TAU / 6, color=SOL)
        ca2 = CurvedArrow(ulong.n2p(us[1]) + DOWN * 0.15, ulong.n2p(us[3]) + DOWN * 0.15, angle=TAU / 6, color=SOL)
        cl1 = MathTex(r"+2\pi", color=SOL).scale(0.6).next_to(ca1, UP, buff=0.05)
        cl2 = MathTex(r"+2\pi", color=SOL).scale(0.6).next_to(ca2, DOWN, buff=0.05)
        with self.voiceover(
            "The reference angle is pi over three. Sine is positive in quadrants one and two, so u is pi over three and two pi over three. The interval covers two turns, so add two pi to each: seven pi over three and eight pi over three."
        ) as vo:
            self.play(Write(ut1), run_time=vo.duration * 0.2)
            self.play(GrowFromCenter(udots[0]), GrowFromCenter(udots[1]), run_time=vo.duration * 0.12)
            self.wait(vo.duration * 0.1)
            self.play(Create(ca1), FadeIn(cl1), GrowFromCenter(udots[2]), run_time=vo.duration * 0.15)
            self.play(Create(ca2), FadeIn(cl2), GrowFromCenter(udots[3]), run_time=vo.duration * 0.15)
            self.play(TransformMatchingShapes(ut1, ut2), run_time=vo.duration * 0.15)
        self.wait(1.5)

        # Beat c2
        self.play(FadeOut(VGroup(ca1, ca2, cl1, cl2)), run_time=0.4)
        half = MathTex(r"\div 2", color=PRIMARY).scale(0.9).move_to([X0 - 1.0, -0.5, 0])
        xv = [PI / 6, PI / 3, 7 * PI / 6, 4 * PI / 3]
        xdots = [Dot(xline.n2p(x), color=SOL, radius=0.1) for x in xv]
        arrs = [Arrow(udots[i].get_center(), xdots[i].get_center(), color=SOL, buff=0.12, stroke_width=3,
                      max_tip_length_to_length_ratio=0.12) for i in range(4)]
        xres = MathTex(r"x = \frac{\pi}{6},\ \frac{\pi}{3},\ \frac{7\pi}{6},\ \frac{4\pi}{3}", color=OK).scale(0.8).move_to([3.4, -2.4, 0])
        with self.voiceover(
            "Only now divide by two. x equals pi over six, pi over three, seven pi over six, and four pi over three."
        ) as vo:
            self.play(FadeIn(half), run_time=vo.duration * 0.15)
            for i in range(4):
                self.play(GrowArrow(arrs[i]), GrowFromCenter(xdots[i]), run_time=vo.duration * 0.12)
            self.play(Write(xres), run_time=vo.duration * 0.2)
        self.clear_scene()

        # Beat d
        parts, ax = wave_axes()
        parts.shift(DOWN * 0.7)
        s2 = ax.plot(lambda x: np.sin(2 * x), x_range=[-0.5, 6.8], color=SINE, stroke_width=4)
        s1 = ax.plot(np.sin, x_range=[-0.5, 6.8], color=SINE, stroke_width=3, stroke_opacity=0.3)
        lvl = DashedLine(ax.c2p(-0.5, 0.866), ax.c2p(6.8, 0.866), color=LEVEL, stroke_width=3)
        lvl_lab = MathTex(r"\tfrac{\sqrt3}{2}", color=LEVEL).scale(0.6).next_to(ax.c2p(6.8, 0.866), RIGHT, buff=0.1)
        d4 = VGroup(*[Dot(ax.c2p(x, 0.866), color=SOL, radius=0.1) for x in xv])
        d2 = VGroup(*[Dot(ax.c2p(x, 0.866), color=MUTED, radius=0.08) for x in (PI / 3, 2 * PI / 3)])
        s2lab = MathTex(r"\sin 2x", color=SINE).scale(0.7).next_to(ax.c2p(PI / 4, 1), UP, buff=0.15).shift(LEFT * 0.6)
        s1lab = MathTex(r"\sin x", color=MUTED).scale(0.6).next_to(ax.c2p(PI / 2, 1), UP, buff=0.15)
        rule = MathTex(r"\sin bx,\ \cos bx:\ 2b \qquad \tan bx:\ b").scale(0.85).move_to(UP * 3.2)
        with self.voiceover(
            "The graph agrees. Sine of two x completes two cycles, so it meets the line twice as often. In general, sine or cosine of b times x has about two b solutions. Tangent of b times x has b."
        ) as vo:
            self.play(FadeOut(eq), FadeIn(parts), Create(s2), FadeIn(s2lab), run_time=vo.duration * 0.15)
            self.play(Create(lvl), FadeIn(lvl_lab), LaggedStart(*[GrowFromCenter(d) for d in d4], lag_ratio=0.2),
                      run_time=vo.duration * 0.15)
            self.play(Create(s1), FadeIn(s1lab), FadeIn(d2), run_time=vo.duration * 0.15)
            self.wait(vo.duration * 0.08)
            self.play(FadeOut(VGroup(s1, s1lab, d2)), run_time=vo.duration * 0.08)
            self.play(Write(rule), run_time=vo.duration * 0.25)

        # Beat e
        h1 = ax.plot(lambda x: np.sin(x / 2), x_range=[-0.5, 6.8], color=SINE, stroke_width=4)
        h2 = ax.plot(lambda x: np.cos(x / 2), x_range=[-0.5, 6.8], color=COSC, stroke_width=4)
        h1lab = MathTex(r"\sin\frac{x}{2}", color=SINE).scale(0.7).next_to(ax.c2p(PI, 1), UP, buff=0.1)
        h2lab = MathTex(r"\cos\frac{x}{2}", color=COSC).scale(0.7).next_to(ax.c2p(0.3, 1), UP, buff=0.15).shift(RIGHT * 0.3)
        lv2 = DashedLine(ax.c2p(-0.5, -0.5), ax.c2p(6.8, -0.5), color=LEVEL, stroke_width=3)
        lv2_lab = MathTex(r"-\tfrac12", color=LEVEL).scale(0.6).next_to(ax.c2p(6.8, -0.5), RIGHT, buff=0.1)
        hd = Dot(ax.c2p(4 * PI / 3, -0.5), color=SOL, radius=0.11)
        none = T("none", 26, color=WARN, weight="BOLD").move_to(ax.c2p(PI, 0.55))
        rule2 = MathTex(r"b = \tfrac12:\ \text{half a cycle, so one solution or none, typically}").scale(0.6).next_to(rule, DOWN, buff=0.2)
        with self.voiceover(
            "Fractions work in reverse. Half a cycle means fewer solutions: often just one, and sometimes none."
        ) as vo:
            self.play(FadeOut(VGroup(s2, s2lab, lvl, lvl_lab, d4)), run_time=vo.duration * 0.1)
            self.play(Create(h1), Create(h2), FadeIn(h1lab), FadeIn(h2lab), run_time=vo.duration * 0.25)
            self.play(Create(lv2), FadeIn(lv2_lab), run_time=vo.duration * 0.12)
            self.play(GrowFromCenter(hd), FadeIn(none), run_time=vo.duration * 0.15)
            self.play(Write(rule2), run_time=vo.duration * 0.25)
        self.clear_scene()

        # Beat f
        feq = MathTex(r"\cos\frac{x}{2} = \frac{1}{2}").move_to(UP * 2.8)
        fcap = MathTex(r"u = \frac{x}{2},\ u \in [0, \pi)", color=SECONDARY).scale(0.85).next_to(feq, DOWN, buff=0.35)
        full = NumberLine(x_range=[0, TAU, PI / 3], length=10, color=SECONDARY, tick_size=0.08).move_to(DOWN * 0.3)
        f0 = MathTex("0", color=MUTED).scale(0.7).next_to(full.n2p(0), DOWN, buff=0.15)
        fend = MathTex(r"2\pi", color=MUTED).scale(0.7).next_to(full.n2p(TAU), DOWN, buff=0.15)
        short = NumberLine(x_range=[0, PI, PI / 3], length=5, color=SECONDARY, tick_size=0.08)
        short.shift(full.n2p(0) - short.n2p(0))
        dashed = DashedLine(full.n2p(PI), full.n2p(TAU), color=MUTED, stroke_width=3, dash_length=0.12)
        pend = MathTex(r"\pi", color=MUTED).scale(0.7).next_to(full.n2p(PI), DOWN, buff=0.15)
        good = Dot(full.n2p(PI / 3), color=SOL, radius=0.11)
        glab = MathTex(r"\frac{\pi}{3}", color=SOL).scale(0.7).next_to(good, UP, buff=0.15)
        bad = Dot(full.n2p(5 * PI / 3), color=MUTED, radius=0.11)
        blab = MathTex(r"\frac{5\pi}{3}", color=MUTED).scale(0.7).next_to(bad, UP, buff=0.15)
        bx = Cross(bad, stroke_color=WARN, stroke_width=5, scale_factor=1.8)
        oor = T("out of range", 24, color=WARN).next_to(bad, DOWN, buff=0.45)
        fres = MathTex(r"x = \frac{2\pi}{3}", color=OK).scale(1.1).move_to(DOWN * 2.6)
        with self.voiceover(
            "Take cosine of x over two equals one half. Let u equal x over two. Now u only runs from zero to pi. So u is pi over three, and x is two pi over three. The usual second answer, five pi over three, is out of reach."
        ) as vo:
            self.play(Write(feq), run_time=vo.duration * 0.12)
            self.play(Write(fcap), Create(full), FadeIn(f0), FadeIn(fend), run_time=vo.duration * 0.15)
            self.play(Transform(full, short), Create(dashed), FadeIn(pend), fend.animate.set_opacity(0.4),
                      run_time=vo.duration * 0.15)
            self.play(GrowFromCenter(good), FadeIn(glab), run_time=vo.duration * 0.1)
            self.play(Write(fres), run_time=vo.duration * 0.12)
            self.play(FadeIn(bad), FadeIn(blab), run_time=vo.duration * 0.1)
            self.play(Create(bx), FadeIn(oor), run_time=vo.duration * 0.12)
        self.clear_scene()

        # Beat g
        steps = ["Substitute", "Widen / narrow\ninterval", "Solve fully", "Convert back"]
        boxes = VGroup()
        for s in steps:
            t = VGroup(*[Text(x, font_size=26) for x in s.split("\n")]).arrange(DOWN, buff=0.12)
            b = RoundedRectangle(corner_radius=0.2, width=2.6, height=1.4, color=MUTED, stroke_width=3)
            boxes.add(VGroup(b, t.move_to(b)))
        boxes.arrange(RIGHT, buff=0.65).move_to(UP * 0.6)
        arrows = VGroup(*[Arrow(boxes[i].get_right(), boxes[i + 1].get_left(), buff=0.08, color=MUTED)
                          for i in range(3)])
        note_t = T("Halving too early looks complete.", 24, color=WARN)
        note = VGroup(RoundedRectangle(corner_radius=0.1, width=note_t.width + 0.5, height=0.8, color=WARN,
                                       fill_color=WARN, fill_opacity=0.1), note_t)
        note_t.move_to(note[0])
        note.next_to(boxes[3], DOWN, buff=0.6).shift(LEFT * 1.0).rotate(-0.04)
        with self.voiceover(
            "So the order is: substitute, widen or narrow the interval, solve fully, then convert back. Halving too early loses marks, because the answer looks complete."
        ) as vo:
            self.play(FadeIn(boxes), FadeIn(arrows), run_time=vo.duration * 0.12)
            for b in boxes:
                self.play(b[0].animate.set_stroke(PRIMARY, width=5).set_fill(PRIMARY, opacity=0.1),
                          run_time=vo.duration * 0.1)
            self.play(FadeIn(note, shift=UP * 0.3), run_time=vo.duration * 0.15)
        self.clear_scene()

    # ------------------------------------------------------------------ Scene 5
    def scene5(self):
        rows = [
            [r"\text{Equation}", r"\text{Calculator returns}", r"\text{What it omits}"],
            [r"\sin x = 0.6", r"0.6435\ (\text{Q I})", r"\pi - 0.6435,\ +2\pi n"],
            [r"\sin x = -0.6", r"-0.6435\ (\text{Q IV})", r"\pi + 0.6435"],
            [r"\cos x = -0.5", r"2.0944\ (\text{Q II})", r"2\pi - 2.0944"],
            [r"\tan x = -2", r"-1.107\ (\text{Q IV})", r"+\pi n"],
        ]
        tab = MathTable(rows[1:], col_labels=[MathTex(c) for c in rows[0]], include_outer_lines=False,
                        line_config={"color": MUTED, "stroke_width": 1.5}, v_buff=0.45, h_buff=0.8)
        tab.scale_to_fit_width(min(12.5, tab.width))
        if tab.height > 6:
            tab.scale_to_fit_height(6)
        tab.move_to(DOWN * 0.1)
        for r in range(2, 6):
            tab.get_entries((r, 3)).set_color(ACCENT)
        for c in range(1, 4):
            tab.get_entries((1, c)).set_color(MUTED)
        tab_rows = tab.get_rows()
        lines = VGroup(tab.get_horizontal_lines(), tab.get_vertical_lines())
        with self.voiceover(
            "The calculator's inverse sine is honest but narrow. It returns one angle from a restricted range. For sine x equals zero point six, it gives zero point six four. It leaves out pi minus that, and every two pi repeat."
        ) as vo:
            self.play(FadeIn(tab_rows[0]), Create(lines), run_time=vo.duration * 0.15)
            self.play(FadeIn(tab_rows[1]), run_time=vo.duration * 0.12)
            h1 = SurroundingRectangle(tab_rows[1], color=ACCENT, buff=0.1)
            self.play(Create(h1), run_time=vo.duration * 0.1)
            self.play(Indicate(tab.get_entries((2, 2)), color=PRIMARY), run_time=vo.duration * 0.15)
            self.play(Indicate(tab.get_entries((2, 3)), color=PRIMARY), run_time=vo.duration * 0.2)
        self.play(FadeOut(h1), run_time=0.3)
        for i in (2, 3, 4):
            self.play(FadeIn(tab_rows[i]), run_time=0.6)
            self.wait(2)

        # Beat b
        C = np.array([-4.0, 0, 0])
        R = 1.6
        ra_ang, rb_ang = PI + 0.6435, TAU - 0.6435
        uc = unit_circle(C, R)
        sh = quad_shade(C, R, PI, WARN)
        chord = Line(pt(C, R, ra_ang), pt(C, R, rb_ang), color=LEVEL, stroke_width=4)
        ra = radius(C, R, ra_ang)
        rb = radius(C, R, rb_ang)
        arc1 = Arc(radius=0.55, start_angle=PI, angle=0.6435, arc_center=C, color=ACCENT, stroke_width=4)
        arc2 = Arc(radius=0.55, start_angle=TAU - 0.6435, angle=0.6435, arc_center=C, color=ACCENT, stroke_width=4)
        al1 = MathTex("0.6435", color=ACCENT).scale(0.42).move_to(pt(C, 1.05, PI + 0.3))
        al2 = MathTex("0.6435", color=ACCENT).scale(0.42).move_to(pt(C, 1.05, TAU - 0.3))
        rx = -1.4
        o1 = MathTex(r"\sin^{-1}(-0.6) \approx -0.6435").scale(0.75)
        s1 = MathTex(r"\pi - 0.6435 \approx 2.50\ (\text{Q II, wrong sign})", color=MUTED).scale(0.65)
        s2 = MathTex(r"-0.6435\ (\text{not in } [0, 2\pi))", color=MUTED).scale(0.65)
        g1 = MathTex(r"\pi + 0.6435 \approx 3.79", color=OK).scale(0.8)
        g2 = MathTex(r"2\pi - 0.6435 \approx 5.64", color=OK).scale(0.8)
        right = VGroup(o1, s1, s2, g1, g2).arrange(DOWN, aligned_edge=LEFT, buff=0.45)
        right.scale_to_fit_width(min(right.width, 6.9))
        right.move_to([0, 0, 0]).align_to([rx + 0.5, 0, 0], LEFT)
        x1 = VGroup(strike(s1, width=3), xmark(0.7).next_to(s1, LEFT, buff=0.15))
        x2 = VGroup(strike(s2, width=3), xmark(0.7).next_to(s2, LEFT, buff=0.15))
        c1_ = check(0.7).next_to(g1, LEFT, buff=0.15)
        c2_ = check(0.7).next_to(g2, LEFT, buff=0.15)
        with self.voiceover(
            "Negative values are where people slip. For sine x equals negative zero point six, the calculator gives minus zero point six four. Don't just drop the minus sign, and don't keep a negative angle. Place the reference angle, zero point six four, in quadrants three and four: pi plus zero point six four, about three point seven nine, and two pi minus zero point six four, about five point six four."
        ) as vo:
            hr = SurroundingRectangle(tab_rows[2], color=WARN, buff=0.1, stroke_width=4)
            self.play(Create(hr), run_time=vo.duration * 0.06)
            self.wait(vo.duration * 0.04)
            self.play(FadeOut(VGroup(tab, hr)), run_time=vo.duration * 0.04)
            self.play(Create(uc), FadeIn(sh), Write(o1), run_time=vo.duration * 0.1)
            self.play(FadeIn(s1), Create(x1), run_time=vo.duration * 0.1)
            self.play(FadeIn(s2), Create(x2), run_time=vo.duration * 0.1)
            self.play(Create(ra), Create(rb), Create(chord), run_time=vo.duration * 0.1)
            self.play(Create(arc1), Create(arc2), FadeIn(al1), FadeIn(al2), run_time=vo.duration * 0.1)
            self.play(Write(g1), FadeIn(c1_), run_time=vo.duration * 0.12)
            self.play(Write(g2), FadeIn(c2_), run_time=vo.duration * 0.12)
        self.clear_scene()

        # Beat c
        sq = [
            M(r"\sin x = \cos x - 1"),
            M(r"\sin^2 x = \cos^2 x - 2\cos x + 1"),
            M(r"1 - \cos^2 x = \cos^2 x - 2\cos x + 1"),
            M(r"2\cos^2 x - 2\cos x = 0"),
            M(r"2\cos x(\cos x - 1) = 0"),
        ]
        col = VGroup(*sq).arrange(DOWN, buff=0.35).scale(0.95).move_to(UP * 0.8).shift(LEFT * 0.8)
        cand = MathTex(r"x = 0,\ \frac{\pi}{2},\ \frac{3\pi}{2}").scale(0.85)
        cand.next_to(col, DOWN, buff=0.55)
        cbox = SurroundingRectangle(cand, color=ACCENT, buff=0.18, stroke_width=4)
        clab = T("candidates", 24, color=ACCENT).next_to(cbox, RIGHT, buff=0.25)
        sqlab = VGroup(Arrow(UP * 0.3, DOWN * 0.3, color=PRIMARY, buff=0), T("square both sides", 22, color=PRIMARY))
        sqlab.arrange(RIGHT, buff=0.15)
        sqlab.move_to([col.get_right()[0] + 1.6, (sq[0].get_center()[1] + sq[1].get_center()[1]) / 2, 0])
        with self.voiceover(
            "Squaring goes wrong the other way. It creates extra answers. Solve sine x equals cosine x minus one by squaring both sides. Replace sine squared with one minus cosine squared, tidy up, and factor. The candidates are zero, pi over two, and three pi over two."
        ) as vo:
            self.play(Write(sq[0]), run_time=vo.duration * 0.12)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(sqlab), TransformMatchingTex(sq[0].copy(), sq[1]), run_time=vo.duration * 0.1)
            for i in (2, 3, 4):
                self.wait(vo.duration * 0.03)
                self.play(TransformMatchingTex(sq[i - 1].copy(), sq[i]), run_time=vo.duration * 0.1)
            self.play(Write(cand), Create(cbox), FadeIn(clab), run_time=vo.duration * 0.15)
        self.clear_scene()

        # Beat d
        crow = [
            [r"x", r"\sin x", r"\cos x - 1", r"\text{Verdict}"],
            [r"0", r"0", r"0", r"\text{valid}"],
            [r"\frac{\pi}{2}", r"1", r"-1", r"\text{extraneous}"],
            [r"\frac{3\pi}{2}", r"-1", r"-1", r"\text{valid}"],
        ]
        ct = MathTable(crow[1:], col_labels=[MathTex(c) for c in crow[0]], include_outer_lines=False,
                       line_config={"color": MUTED, "stroke_width": 1.5}, v_buff=0.5, h_buff=1.0)
        ct.scale_to_fit_width(min(9.5, ct.width)).move_to(LEFT * 0.6)
        for c in range(1, 5):
            ct.get_entries((1, c)).set_color(MUTED)
        ct.get_entries((2, 4)).set_color(OK)
        ct.get_entries((3, 4)).set_color(WARN)
        ct.get_entries((4, 4)).set_color(OK)
        crows = ct.get_rows()
        marks = [check(), xmark(), check()]
        for i, mk in enumerate(marks):
            mk.next_to(crows[i + 1], RIGHT, buff=0.4)
        rowstrike = Line(crows[2].get_left() + LEFT * 0.2, crows[2].get_right() + RIGHT * 0.2, color=WARN, stroke_width=4)
        ref = MathTex(r"\sin x = \cos x - 1").scale(0.8).to_edge(UP, buff=0.5)
        with self.voiceover(
            "Now test each one in the original. At zero, both sides are zero. Valid. At pi over two, one versus negative one. Extraneous. At three pi over two, both sides are negative one. Valid."
        ) as vo:
            self.play(FadeIn(ref), FadeIn(crows[0]), Create(VGroup(ct.get_horizontal_lines(), ct.get_vertical_lines())),
                      run_time=vo.duration * 0.12)
            self.play(FadeIn(crows[1]), run_time=vo.duration * 0.12)
            self.play(FadeIn(marks[0], scale=1.5), run_time=vo.duration * 0.08)
            self.play(FadeIn(crows[2]), run_time=vo.duration * 0.14)
            self.play(FadeIn(marks[1], scale=1.5), Create(rowstrike), run_time=vo.duration * 0.1)
            self.play(FadeIn(crows[3]), run_time=vo.duration * 0.14)
            self.play(FadeIn(marks[2], scale=1.5), run_time=vo.duration * 0.08)
        self.clear_scene()

        # Beat e
        pq1 = MathTex(r"p = q").scale(1.2).move_to([-3.5, 1.2, 0])
        pq2 = MathTex(r"p = -q").scale(1.2).move_to([-3.5, -1.2, 0])
        pq = MathTex(r"p^2 = q^2").scale(1.4).move_to([3.0, 0, 0])
        ar1 = Arrow(pq1.get_right(), pq.get_left() + UP * 0.2, color=MUTED, buff=0.25)
        ar2 = Arrow(pq2.get_right(), pq.get_left() + DOWN * 0.2, color=MUTED, buff=0.25)
        capt = T("Square → always check.", 34, color=PRIMARY, weight="BOLD").move_to(DOWN * 2.8)
        with self.voiceover(
            "Why? Squaring erases signs. p equals q, and p equals negative q, both become p squared equals q squared. So whenever you square, checking is part of the method."
        ) as vo:
            self.play(Write(pq1), Write(pq2), run_time=vo.duration * 0.25)
            self.play(GrowArrow(ar1), GrowArrow(ar2), FadeIn(pq), run_time=vo.duration * 0.3)
            self.play(Indicate(pq, color=PRIMARY), run_time=vo.duration * 0.12)
            self.play(FadeIn(capt, shift=UP * 0.3), run_time=vo.duration * 0.15)
        self.clear_scene()

        # Beat f
        t1 = M(r"\tan x \sin x = \tan x").move_to(UP * 2.9)
        t2 = M(r"\tan x \sin x - \tan x = 0").move_to(UP * 2.9)
        t3 = M(r"\tan x\,(\sin x - 1) = 0").move_to(UP * 2.9)
        lb = VGroup(MathTex(r"\tan x = 0 \Rightarrow x = 0,\ \pi"), check(), check()).arrange(RIGHT, buff=0.2).move_to([-3.4, 1.3, 0])
        rb_main = MathTex(r"\sin x = 1 \Rightarrow x = \frac{\pi}{2}").move_to([3.3, 1.3, 0])
        rb_warn = MathTex(r"\cos\frac{\pi}{2} = 0 \Rightarrow \tan\frac{\pi}{2}\ \text{undefined}", color=WARN).scale(0.75)
        rb_warn.next_to(rb_main, DOWN, buff=0.35)
        pi2 = rb_main[0][-3:]
        pstrike = Line(pi2.get_corner(DL) + DL * 0.05, pi2.get_corner(UR) + UR * 0.05, color=WARN, stroke_width=5)
        fa1 = Arrow(t3.get_bottom() + LEFT * 0.4, lb.get_top(), color=MUTED, buff=0.15)
        fa2 = Arrow(t3.get_bottom() + RIGHT * 0.4, rb_main.get_top(), color=MUTED, buff=0.15)
        fin = MathTex(r"x = 0,\ \pi", color=OK).scale(1.1).move_to(DOWN * 1.3)
        finbox = SurroundingRectangle(fin, color=OK, buff=0.2, stroke_width=4)
        footer = Tex(r"$\tan$ or $\sec$ in the equation: drop any $x$ with $\cos x = 0$").scale(0.8).move_to(DOWN * 2.9)
        with self.voiceover(
            "Domain matters too. Tangent x times sine x equals tangent x factors to tangent x, times the quantity sine x minus one, equals zero. Tangent x equals zero gives zero and pi. Sine x equals one gives pi over two, but tangent does not exist there, so it goes. With tangent or secant, drop any candidate where cosine x is zero."
        ) as vo:
            self.play(Write(t1), run_time=vo.duration * 0.08)
            self.play(TransformMatchingTex(t1, t2), run_time=vo.duration * 0.08)
            self.wait(vo.duration * 0.03)
            self.play(TransformMatchingTex(t2, t3), run_time=vo.duration * 0.08)
            self.play(GrowArrow(fa1), Write(lb), run_time=vo.duration * 0.13)
            self.play(GrowArrow(fa2), Write(rb_main), run_time=vo.duration * 0.1)
            self.play(Write(rb_warn), run_time=vo.duration * 0.1)
            self.play(Create(pstrike), run_time=vo.duration * 0.05)
            self.play(Write(fin), Create(finbox), run_time=vo.duration * 0.1)
            self.play(FadeIn(footer), run_time=vo.duration * 0.1)
        self.clear_scene()

    # ------------------------------------------------------------------ Scene 6
    def scene6(self):
        title = T("The chapter in four lines", 38, weight="BOLD").to_edge(UP, buff=0.5)
        texts = [
            "1. Reference angle → every allowed quadrant → add periods",
            "2. Reduce to one function of one angle. Factor, never divide.",
            "3. Inner angle bx: widen the interval by b first",
            "4. Inverses give one angle; squaring adds extras. Check.",
        ]
        ys = [1.9, 0.5, -0.9, -2.3]
        lines = []
        for s, y in zip(texts, ys):
            t = T(s, 26)
            t.move_to([0, y, 0]).to_edge(LEFT, buff=0.5)
            lines.append(t)
        IX = 5.0
        # icon 1: tiny sine wave with crossings
        w = 2.4
        wave = FunctionGraph(lambda x: 0.35 * np.sin(x * TAU / (w / 2)), x_range=[-w / 2, w / 2], color=SINE, stroke_width=3)
        wl = DashedLine(LEFT * w / 2 + UP * 0.17, RIGHT * w / 2 + UP * 0.17, color=LEVEL, stroke_width=2)
        xs = []
        for k in range(-2, 2):
            base = k * (w / 2)
            a = np.arcsin(0.17 / 0.35) / (TAU / (w / 2))
            xs += [base + a, base + (w / 4) - a]
        wd = VGroup(*[Dot([x, 0.17, 0], color=SOL, radius=0.06) for x in xs if -w / 2 <= x <= w / 2])
        icon1 = VGroup(wave, wl, wd).move_to([IX, ys[0], 0])
        icon2 = MathTex(r"\sin x\,(2\cos x - 1) = 0").scale(0.6).move_to([IX, ys[1], 0])
        nl1 = Line(LEFT * 0.6, RIGHT * 0.6, color=INK, stroke_width=3)
        nl2 = Line(LEFT * 1.2, RIGHT * 1.2, color=SECONDARY, stroke_width=3)
        itxt = MathTex(r"[0, 2\pi) \to [0, 4\pi)").scale(0.75)
        icon3 = VGroup(itxt, nl1, nl2).arrange(DOWN, buff=0.12).move_to([IX, ys[2], 0])
        nl1.align_to(nl2, LEFT)
        icon4 = VGroup(check(1.1), xmark(1.1)).arrange(RIGHT, buff=0.4).move_to([IX, ys[3], 0])
        icons = [icon1, icon2, icon3, icon4]
        with self.voiceover(
            "Here is the chapter in four lines. One. Solutions repeat: find the reference angle, use every quadrant the sign allows, then add whole periods. Two. Reduce to one function of one angle. Factor, never divide."
        ) as vo:
            self.play(FadeIn(title), run_time=vo.duration * 0.1)
            self.play(FadeIn(lines[0], shift=RIGHT * 0.3), Create(icon1), run_time=vo.duration * 0.25)
            self.wait(vo.duration * 0.25)
            self.play(FadeIn(lines[1], shift=RIGHT * 0.3), Write(icon2), run_time=vo.duration * 0.2)
        with self.voiceover(
            "Three. For an inner angle like b times x, widen the interval by the factor b before solving. Four. Inverses return one angle, and squaring invents extra ones. Check. Before each problem, ask: how many solutions should I expect, and over what interval?"
        ) as vo:
            self.play(FadeIn(lines[2], shift=RIGHT * 0.3), FadeIn(icon3), run_time=vo.duration * 0.15)
            self.wait(vo.duration * 0.15)
            self.play(FadeIn(lines[3], shift=RIGHT * 0.3), FadeIn(icon4), run_time=vo.duration * 0.15)
            self.wait(vo.duration * 0.15)
            q = T("How many solutions? Over what interval?", 36, color=ACCENT, weight="BOLD")
            qb = BackgroundRectangle(q, color=BG, fill_opacity=0.95, buff=0.35)
            qf = SurroundingRectangle(q, color=ACCENT, buff=0.35, corner_radius=0.15)
            self.play(*[m.animate.set_opacity(0.2) for m in lines + icons], run_time=vo.duration * 0.1)
            self.play(FadeIn(qb), Create(qf), Write(q), run_time=vo.duration * 0.15)
        self.clear_scene()

        A, B, Cc = np.array([-5, -1.5, 0]), np.array([0.5, -1.5, 0]), np.array([-1.5, 1.8, 0])
        tri = Polygon(A, B, Cc, color=INK, stroke_width=4, fill_color=SECONDARY, fill_opacity=0.08)
        cen = (A + B + Cc) / 3

        def out_lab(tex, p, color=INK, d=0.35):
            v = p - cen
            v = v / np.linalg.norm(v)
            return MathTex(tex, color=color).scale(0.8).move_to(p + v * d)

        def side_lab(tex, p, q_):
            mid = (p + q_) / 2
            v = mid - cen
            v = v / np.linalg.norm(v)
            return MathTex(tex, color=SECONDARY).scale(0.8).move_to(mid + v * 0.35)

        labs = VGroup(out_lab("A", A), out_lab("B", B), out_lab("C", Cc),
                      side_lab("a", B, Cc), side_lab("b", A, Cc), side_lab("c", A, B))
        lim = MathTex(r"\lim_{x \to 0} \frac{\sin x}{x} = 1").scale(0.9).move_to(RIGHT * 4)
        nxt = T("Next: Chapter 5 · Any Triangle, and the Bridge to Calculus", 30, color=PRIMARY, weight="BOLD")
        if nxt.width > 13:
            nxt.scale_to_fit_width(13)
        nxt.to_edge(UP, buff=0.5)
        with self.voiceover(
            "Next, in Chapter 5, we return to triangles, this time without a right angle. Then we hand the course over to calculus, with a limit that only works because you measured in radians."
        ) as vo:
            self.play(FadeIn(nxt), run_time=vo.duration * 0.12)
            self.play(Create(tri), run_time=vo.duration * 0.2)
            self.play(FadeIn(labs), run_time=vo.duration * 0.15)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(lim, shift=LEFT * 0.3), run_time=vo.duration * 0.2)
        self.wait(1.0)
        self.clear_scene(1.0)
