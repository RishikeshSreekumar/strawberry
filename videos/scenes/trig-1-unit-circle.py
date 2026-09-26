import sys; from pathlib import Path; sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib")); from manim import *; from strawberry import *

import numpy as np

# Private LaTeX cache dir so parallel renders of other chapters don't delete our temp files.
config.tex_dir = str(Path(__file__).resolve().parent.parent / "build" / "tex-trig-1")
config.no_latex_cleanup = True

# Colour key (light background versions of the script's key)
COS_C = ManimColor("#2E6DB4")   # cosine / x
SIN_C = PRIMARY                 # sine / y
RAD_C = INK                     # radius
REF_C = PURPLE                  # reference angle
TAN_C = GREEN                   # tangent / slope
WARN_C = ACCENT                 # "undefined here" / warnings
BOX_C = SECONDARY               # boxed results
PINK_C = ManimColor("#C2477F")
DIM_C = ManimColor("#BBAAA4")

RC_X = 4.2    # right-column centre
RC_W = 5.2    # right-column max width


def T(vo, f, lo=0.25):
    return max(lo, vo.duration * f)


def fit(m, w=RC_W):
    if m.width > w:
        m.scale_to_fit_width(w)
    return m


def col(*ms, top=2.9, buff=0.4, x=RC_X, w=RC_W):
    g = VGroup(*[fit(m, w) for m in ms]).arrange(DOWN, aligned_edge=LEFT, buff=buff)
    fit(g, w)
    g.move_to([x, 0, 0])
    g.shift(UP * (top - g.get_top()[1]))
    return g


def two(a, b):
    g = VGroup(a, b).arrange(DOWN, aligned_edge=LEFT, buff=0.22)
    b.shift(RIGHT * 0.45)
    return g


def box(m, color=BOX_C):
    return SurroundingRectangle(m, color=color, buff=0.15, corner_radius=0.08, stroke_width=3)


def tex(s, color=INK, scale=1.0):
    return MathTex(s, color=color).scale(scale)


def txt(s, size=30, color=INK, **kw):
    return Text(s, font_size=size, color=color, **kw)


EXACT = {
    0: ("1", "0"), 30: (r"\tfrac{\sqrt3}{2}", r"\tfrac12"), 45: (r"\tfrac{\sqrt2}{2}", r"\tfrac{\sqrt2}{2}"),
    60: (r"\tfrac12", r"\tfrac{\sqrt3}{2}"), 90: ("0", "1"),
}


def exact_pair(deg):
    d = deg % 360
    q = d // 90
    ref = {0: d, 1: 180 - d, 2: d - 180, 3: 360 - d}[q] if d % 90 else None
    if ref is None:
        return {0: ("1", "0"), 90: ("0", "1"), 180: ("-1", "0"), 270: ("0", "-1")}[d]
    c, s = EXACT[ref]
    cs = "-" if q in (1, 2) else ""
    ss = "-" if q in (2, 3) else ""
    return cs + c, ss + s


class TrigCh1Video(NarratedScene):
    # ------------------------------------------------------------------ helpers
    def P(self, deg, r=1.0):
        a = deg * DEGREES
        return self.ax.c2p(r * np.cos(a), r * np.sin(a))

    def pt(self):
        return self.P(self.th.get_value())

    def ft(self):
        return self.ax.c2p(np.cos(self.th.get_value() * DEGREES), 0)

    def wipe(self, keep=(), run_time=0.6):
        keep = list(keep)
        ms = [m for m in self.mobjects if m not in keep and not isinstance(m, ValueTracker)]
        for m in ms:
            m.clear_updaters()
        if ms:
            self.play(*[FadeOut(m) for m in ms], run_time=run_time)

    def fade(self, *ms, run_time=0.5):
        ms = [m for m in ms if m is not None]
        for m in ms:
            m.clear_updaters()
        return AnimationGroup(*[FadeOut(m) for m in ms], run_time=run_time)

    def show_point(self, legs=True):
        O = self.O
        tri = always_redraw(lambda: Polygon(O, self.ft(), self.pt(), stroke_width=0,
                                            fill_color=PRIMARY, fill_opacity=self.fillv.get_value()))

        def xleg():
            if np.linalg.norm(self.ft() - O) < 0.03:
                return VectorizedPoint(O)
            return Line(O, self.ft(), color=COS_C, stroke_width=6)

        def yleg():
            if np.linalg.norm(self.pt() - self.ft()) < 0.08:
                return VectorizedPoint(self.ft())
            return DashedLine(self.ft(), self.pt(), color=SIN_C, stroke_width=5, dash_length=0.12)

        xl = always_redraw(xleg)
        yl = always_redraw(yleg)
        rad = always_redraw(lambda: Line(O, self.pt(), color=RAD_C, stroke_width=4))
        dot = always_redraw(lambda: Dot(self.pt(), radius=0.09, color=INK))
        self.xleg = xl
        parts = [tri, xl, yl, rad, dot] if legs else [rad, dot]
        self.point_parts = parts
        self.add(*parts)

    def hide_point(self, run_time=0.4):
        for m in self.point_parts:
            m.clear_updaters()
        self.play(*[FadeOut(m) for m in self.point_parts], run_time=run_time)
        self.point_parts = []

    def angle_arc(self, r0=0.45, color=INK):
        def mk():
            t = self.th.get_value() * DEGREES
            if abs(t) < 0.03:
                return VectorizedPoint(self.O)
            f = lambda s: self.O + (r0 + 0.14 * abs(s * t) / TAU) * np.array([np.cos(s * t), np.sin(s * t), 0])
            return ParametricFunction(f, t_range=[0, 1, 0.01], color=color, stroke_width=3)
        return always_redraw(mk)

    def readout(self, label, f, color=INK, places=2, unit=None, scale=0.9):
        lab = MathTex(label, color=color).scale(scale)
        kw = {"unit": unit} if unit else {}
        num = DecimalNumber(f(), num_decimal_places=places, color=color, group_with_commas=False, **kw).scale(scale)
        num.next_to(lab, RIGHT, buff=0.15)

        def upd(m):
            m.set_value(f())
            m.set_color(color)
            m.next_to(lab, RIGHT, buff=0.15)
        num.add_updater(upd)
        return VGroup(lab, num)

    def flash_line(self, a, b, color, run_time=1.0):
        return ShowPassingFlash(Line(a, b, color=color, stroke_width=14), time_width=0.9, run_time=run_time)

    # ------------------------------------------------------------------ build
    def construct(self):
        self.title_card("Trigonometry", "Chapter 1 · The Unit Circle",
                        "Chapter one. The unit circle.")
        self.scene1()
        self.ax = Axes(x_range=[-1.5, 1.5, 0.5], y_range=[-1.5, 1.5, 0.5], x_length=7.5, y_length=7.5,
                       axis_config={"color": MUTED, "stroke_width": 2, "include_tip": False,
                                    "tick_size": 0.05}).move_to(LEFT * 2.5)
        self.O = self.ax.c2p(0, 0)
        self.circle = Circle(radius=2.5, color=INK, stroke_width=3).move_to(self.O)
        self.th = ValueTracker(0)
        self.fillv = ValueTracker(0.2)
        self.point_parts = []
        self.scene2()
        self.scene3()
        self.scene4()
        self.scene5()
        self.scene6()
        self.scene7()
        self.scene8()

    # ------------------------------------------------------------------ Scene 1
    def scene1(self):
        A, B, C = np.array([-1.5, -1.6, 0]), np.array([1.5, -1.6, 0]), np.array([1.5, 0.4, 0])
        tri = Polygon(A, B, C, color=INK, stroke_width=4, fill_color=PRIMARY, fill_opacity=0.12)
        ra = VMobject(color=INK, stroke_width=3).set_points_as_corners(
            [B + LEFT * 0.28, B + LEFT * 0.28 + UP * 0.28, B + UP * 0.28])
        ang = np.arctan2(2, 3)
        arc = Arc(radius=0.75, start_angle=0, angle=ang, arc_center=A, color=PURPLE, stroke_width=4)
        thl = MathTex(r"\theta", color=PURPLE).move_to(A + 1.1 * np.array([np.cos(ang / 2), np.sin(ang / 2), 0]))
        ceil = DashedLine([-5, 1.6, 0], [5, 1.6, 0], color=ACCENT, stroke_width=4)
        ceil_lbl = txt("90° ceiling", 32, ACCENT).next_to(ceil, UP, buff=0.15).align_to(ceil, RIGHT)
        with self.voiceover("Chapter zero ended with a ceiling. Every angle lived inside a right triangle, "
                            "so it stayed between zero and ninety degrees.") as vo:
            self.play(Create(tri), Create(ra), run_time=T(vo, 0.3))
            self.play(Create(arc), Write(thl), run_time=T(vo, 0.2))
            self.play(Create(ceil), FadeIn(ceil_lbl, shift=DOWN * 0.2), run_time=T(vo, 0.25))

        cL, cR = np.array([-3.3, 0.5, 0]), np.array([2.6, 0.5, 0])
        t1, t2 = ValueTracker(0.01), ValueTracker(0.01)

        def u(deg):
            return np.array([np.cos(deg * DEGREES), np.sin(deg * DEGREES), 0])
        wheel = Circle(radius=1.5, color=MUTED, stroke_width=3).move_to(cL)
        baseL = DashedLine(cL, cL + RIGHT * 1.5, color=MUTED, stroke_width=2)
        spokeL = always_redraw(lambda: Line(cL, cL + 1.5 * u(t1.get_value()), color=INK, stroke_width=5))
        arcL = always_redraw(lambda: Arc(radius=0.55, start_angle=0, angle=t1.get_value() * DEGREES,
                                         arc_center=cL, color=PURPLE, stroke_width=4))
        seat = always_redraw(lambda: Dot(cL + 1.5 * u(t1.get_value()), radius=0.12, color=PRIMARY))
        capL = txt("Ferris wheel, 200°", 30).move_to(cL + DOWN * 2.3)
        ref = Line(cR, cR + RIGHT * 2.4, color=MUTED, stroke_width=3)
        spokeR = always_redraw(lambda: Line(cR, cR + 2.4 * u(-t2.get_value()), color=INK, stroke_width=5))
        bob = always_redraw(lambda: Dot(cR + 2.4 * u(-t2.get_value()), radius=0.14, color=PRIMARY))
        arcR = always_redraw(lambda: Arc(radius=1.2, start_angle=0, angle=-t2.get_value() * DEGREES,
                                         arc_center=cR, color=PURPLE, stroke_width=4))
        pivot = Dot(cR, radius=0.07, color=INK)
        capR = txt("pendulum, −15°", 30).move_to(cR + RIGHT * 1.2 + DOWN * 2.3)
        crossL = Cross(capL, stroke_color=PRIMARY, stroke_width=5)
        crossR = Cross(capR, stroke_color=PRIMARY, stroke_width=5)
        with self.voiceover("But a Ferris wheel turns two hundred degrees, and a pendulum swings to negative "
                            "fifteen. Neither fits a right triangle.") as vo:
            self.play(FadeOut(VGroup(tri, ra, arc, thl, ceil, ceil_lbl)), run_time=0.5)
            self.add(wheel, baseL, arcL, spokeL, seat, ref, arcR, spokeR, bob, pivot)
            self.play(FadeIn(capL), t1.animate.set_value(200), run_time=T(vo, 0.3))
            self.play(FadeIn(capR), t2.animate.set_value(15), run_time=T(vo, 0.2))
            self.play(Create(crossL), Create(crossR), run_time=T(vo, 0.15))
        self.wipe()

    # ------------------------------------------------------------------ Scene 2
    def scene2(self):
        ax, O = self.ax, self.O
        ucl = VGroup(txt("unit circle", 30), MathTex("r = 1")).arrange(DOWN, buff=0.15)
        ucl.move_to(ax.c2p(-1.15, 1.3))
        with self.voiceover("The fix is small. Draw the triangle inside a circle of radius one, centred at the "
                            "origin: the unit circle.") as vo:
            self.play(Create(ax), run_time=T(vo, 0.25))
            self.play(Create(self.circle), run_time=T(vo, 0.35))
            self.play(FadeIn(ucl), run_time=T(vo, 0.15))
        self.ucl = ucl

        th = self.th
        th.set_value(0.0)
        xlab = always_redraw(lambda: MathTex("x", color=COS_C).next_to((O + self.ft()) / 2, DOWN, buff=0.15))
        ylab = always_redraw(lambda: MathTex("y", color=SIN_C).next_to((self.ft() + self.pt()) / 2, RIGHT, buff=0.12))

        def one_lab():
            a = th.get_value() * DEGREES
            nrm = np.array([-np.sin(a), np.cos(a), 0])
            return MathTex("1").move_to((O + self.pt()) / 2 + 0.32 * nrm)
        onel = always_redraw(one_lab)
        with self.voiceover("Start at the point one, zero, and rotate anticlockwise by theta. Drop a vertical line "
                            "to the x-axis. The hypotenuse is the radius, length one.") as vo:
            self.show_point()
            start = MathTex("(1, 0)").scale(0.8).next_to(self.P(0), DR, buff=0.1)
            self.play(FadeIn(start), run_time=T(vo, 0.1))
            self.play(th.animate.set_value(40), FadeOut(start), run_time=T(vo, 0.35))
            self.play(FadeIn(xlab), FadeIn(ylab), run_time=T(vo, 0.15))
            self.play(FadeIn(onel), run_time=T(vo, 0.15))

        c1 = MathTex(r"\cos\theta = \frac{\text{adjacent}}{\text{hypotenuse}}", tex_to_color_map={r"\cos": COS_C})
        c2 = MathTex(r"= \frac{x}{1} = x", color=COS_C)
        s1 = MathTex(r"\sin\theta = \frac{\text{opposite}}{\text{hypotenuse}}", tex_to_color_map={r"\sin": SIN_C})
        s2 = MathTex(r"= \frac{y}{1} = y", color=SIN_C)
        eqs = col(two(c1, c2), two(s1, s2), top=3.0, buff=0.6)
        with self.voiceover("Cosine is adjacent over hypotenuse: x over one, just x. Sine is opposite over "
                            "hypotenuse: just y.") as vo:
            self.play(Write(eqs[0]), self.flash_line(O, self.ft(), COS_C, run_time=T(vo, 0.4)), run_time=T(vo, 0.4))
            self.play(Write(eqs[1]), self.flash_line(self.ft(), self.pt(), SIN_C, run_time=T(vo, 0.4)),
                      run_time=T(vo, 0.4))

        defn = MathTex(r"P(\theta) = (", r"\cos\theta", r",\ ", r"\sin\theta", r")").scale(1.1)
        defn[1].set_color(COS_C); defn[3].set_color(SIN_C)
        defn.move_to([RC_X, 0.8, 0])
        dbox = box(defn)
        dl = MathTex(r"(", r"\cos\theta", r",\ ", r"\sin\theta", r")").scale(0.75)
        dl[1].set_color(COS_C); dl[3].set_color(SIN_C)
        dl.add_updater(lambda m: m.next_to(self.pt(), UR, buff=0.08))
        hl = txt("cos: horizontal", 28, COS_C)
        vl = txt("sin: vertical", 28, SIN_C)
        hv = VGroup(hl, vl).arrange(DOWN, aligned_edge=LEFT, buff=0.2).next_to(dbox, DOWN, buff=0.5)
        with self.voiceover("Here is the definition the rest of the course runs on. The point at angle theta has "
                            "coordinates cosine theta, comma, sine theta. Cosine is horizontal. Sine is vertical.") as vo:
            self.play(FadeOut(eqs), run_time=0.4)
            self.play(Write(defn), run_time=T(vo, 0.25))
            self.play(Create(dbox), FadeIn(dl), run_time=T(vo, 0.2))
            self.wait(T(vo, 0.2))
            self.play(FadeIn(hl), self.flash_line(O, self.ft(), COS_C), run_time=T(vo, 0.12))
            self.play(FadeIn(vl), self.flash_line(self.ft(), self.pt(), SIN_C), run_time=T(vo, 0.12))

        # Beat e: radius-5 inset
        ic = np.array([RC_X - 0.6, 1.3, 0])
        R5 = 1.3
        ip = ic + R5 * np.array([0.6, 0.8, 0])
        ifoot = ic + R5 * np.array([0.6, 0, 0])
        inset = VGroup(
            Circle(radius=R5, color=MUTED, stroke_width=3).move_to(ic),
            Line(ic + LEFT * (R5 + 0.2), ic + RIGHT * (R5 + 0.2), color=MUTED, stroke_width=1.5),
            Line(ic + DOWN * (R5 + 0.2), ic + UP * (R5 + 0.2), color=MUTED, stroke_width=1.5),
            Line(ic, ifoot, color=COS_C, stroke_width=5),
            DashedLine(ifoot, ip, color=SIN_C, stroke_width=4, dash_length=0.1),
            Line(ic, ip, color=INK, stroke_width=4),
            Dot(ip, radius=0.08, color=INK),
        )
        il = VGroup(
            MathTex("3", color=COS_C).scale(0.8).next_to((ic + ifoot) / 2, DOWN, buff=0.1),
            MathTex("5").scale(0.8).move_to((ic + ip) / 2 + 0.3 * np.array([-0.8, 0.6, 0])),
            MathTex("(3, 4)").scale(0.8).next_to(ip, RIGHT, buff=0.12),
            MathTex("r = 5", color=MUTED).scale(0.8).next_to(ic + R5 * np.array([-0.7, 0.7, 0]), UL, buff=0.05),
        )
        ceq = MathTex(r"\cos\theta = \frac{x}{r} = \frac35").move_to([RC_X, -0.9, 0])
        r1 = MathTex(r"r = 1 \Rightarrow \frac{x}{1} = x").move_to([RC_X, -2.3, 0])
        with self.voiceover("Nothing was overturned. For an acute angle, dividing by a hypotenuse of one changes "
                            "nothing. On a circle of radius five, through the point three, four, you would still "
                            "divide: cosine is three fifths. Radius one just skips the division.") as vo:
            self.play(FadeOut(VGroup(defn, dbox, hv)), run_time=0.4)
            self.play(Create(inset), FadeIn(il), run_time=T(vo, 0.3))
            self.play(Write(ceq), run_time=T(vo, 0.25))
            self.play(FadeOut(inset), FadeOut(il), run_time=T(vo, 0.1))
            self.play(Write(r1), run_time=T(vo, 0.15))

        yro = self.readout("y =", lambda: np.sin(th.get_value() * DEGREES), color=SIN_C, scale=0.8)
        yro.add_updater(lambda m: m.next_to(self.pt(), RIGHT, buff=0.25))
        s30 = MathTex(r"\sin 30^\circ = \tfrac12", color=SIN_C).scale(1.2).move_to([RC_X, 1.2, 0])
        with self.voiceover("What changed is that the definition mentions a rotation, not a triangle. At thirty "
                            "degrees, the height reads one half, exactly sine of thirty degrees.") as vo:
            self.play(self.fade(ceq, r1, dl, xlab, ylab, onel), self.fillv.animate.set_value(0),
                      run_time=T(vo, 0.2))
            self.play(th.animate.set_value(30), run_time=T(vo, 0.25))
            self.play(FadeIn(yro), run_time=T(vo, 0.1))
            self.play(Write(s30), run_time=T(vo, 0.2))

        sq = DashedVMobject(Square(side_length=5, color=MUTED, stroke_width=2).move_to(O), num_dashes=60)
        e0 = MathTex(r"\cos 0^\circ = 1,\ \sin 0^\circ = 0").move_to([RC_X, 2.4, 0])
        e90 = MathTex(r"\cos 90^\circ = 0,\ \sin 90^\circ = 1").move_to([RC_X, 1.3, 0])
        flat = Line(O, self.P(0), color=ACCENT, stroke_width=10)
        flat_l = txt("degenerate triangle", 26, ACCENT).next_to(flat, DOWN, buff=0.25)
        bound = MathTex(r"-1 \le \cos\theta,\ \sin\theta \le 1").move_to([RC_X, -0.5, 0])
        fit(e0); fit(e90); fit(bound)
        with self.voiceover("Two facts come free. At zero degrees the point is one, zero: cosine one, sine zero. "
                            "At ninety it is zero, one: cosine zero, sine one. As triangles these were degenerate. "
                            "As points they are ordinary. And on a circle of radius one, neither coordinate can "
                            "exceed one.") as vo:
            self.play(self.fade(yro, s30), run_time=0.4)
            self.play(th.animate.set_value(0), run_time=T(vo, 0.07))
            self.play(Flash(self.P(0), color=ACCENT, flash_radius=0.35), Write(e0), run_time=T(vo, 0.15))
            self.play(th.animate.set_value(90), run_time=T(vo, 0.08))
            self.play(Flash(self.P(90), color=ACCENT, flash_radius=0.35), Write(e90), run_time=T(vo, 0.15))
            self.play(Create(flat), FadeIn(flat_l), run_time=T(vo, 0.08))
            self.play(FadeOut(flat), FadeOut(flat_l), run_time=T(vo, 0.12))
            self.play(Create(sq), run_time=T(vo, 0.12))
            self.play(Write(bound), run_time=T(vo, 0.1))
        self.play(FadeOut(VGroup(e0, e90, bound, sq)), run_time=0.5)

    # ------------------------------------------------------------------ Scene 3
    def scene3(self):
        th, O = self.th, self.O
        arc = self.angle_arc()
        a150 = MathTex(r"150^\circ").scale(0.75).move_to(self.P(75, 0.4))
        l150 = MathTex(r"(\cos 150^\circ, \sin 150^\circ)").scale(0.75).move_to([-5.0, 2.95, 0])
        l150 = VGroup(l150, Line(l150.get_bottom() + DOWN * 0.05, self.P(150) + UP * 0.12, color=MUTED, stroke_width=2))
        with self.voiceover("Now rotate by one hundred fifty degrees. No right triangle contains that angle, but "
                            "the point has coordinates like any other.") as vo:
            self.play(FadeOut(self.ucl), run_time=0.3)
            self.add(arc)
            self.play(th.animate.set_value(150), run_time=T(vo, 0.4))
            self.play(FadeIn(a150), FadeIn(l150), run_time=T(vo, 0.2))

        quote = txt("“Sine only makes sense for acute angles.”", 30)
        fit(quote, 4.6)
        quote.move_to([RC_X, 0.8, 0])
        card = SurroundingRectangle(quote, color=WARN_C, buff=0.3, corner_radius=0.15, stroke_width=4)
        strike = Line(quote.get_left() + LEFT * 0.1, quote.get_right() + RIGHT * 0.1, color=PRIMARY, stroke_width=6)
        with self.voiceover("That kills a misconception: that sine only works for acute angles. It was first "
                            "defined that way. On the circle, every angle has a sine.") as vo:
            self.play(Create(card), FadeIn(quote), run_time=T(vo, 0.25))
            self.wait(T(vo, 0.2))
            self.play(Create(strike), run_time=T(vo, 0.15))
            self.wait(T(vo, 0.15))
            self.play(FadeOut(VGroup(card, quote, strike)), run_time=T(vo, 0.1))

        b1 = txt("0° = positive x-axis", 30)
        b2 = txt("anticlockwise +, clockwise −", 30)
        b3 = txt("keep turning past 360°", 30)
        bl = col(b1, b2, b3, top=3.0, buff=0.35)
        cw = Arc(radius=2.95, start_angle=150 * DEGREES, angle=-240 * DEGREES, arc_center=O,
                 color=ACCENT, stroke_width=4).add_tip(tip_length=0.25)
        lm90 = MathTex("(0,-1)").scale(0.75).next_to(self.P(-90), DR, buff=0.1)
        ang = self.readout(r"\theta =", lambda: th.get_value(), places=0, unit=r"^\circ")
        ang.move_to([RC_X, -0.3, 0])
        with self.voiceover("Three conventions. Start at the positive x-axis. Anticlockwise is positive and "
                            "clockwise is negative, so negative ninety degrees lands at the point zero, negative "
                            "one, straight down. And nothing stops at three hundred sixty.") as vo:
            self.play(FadeOut(a150), FadeOut(l150), FadeIn(b1), run_time=T(vo, 0.08))
            self.play(ShowPassingFlash(Line(O, self.P(0, 1.45), color=ACCENT, stroke_width=10), time_width=1),
                      run_time=T(vo, 0.08))
            self.play(FadeIn(b2), FadeIn(ang), run_time=T(vo, 0.08))
            self.play(Create(cw), th.animate.set_value(-90), run_time=T(vo, 0.3))
            self.play(FadeIn(lm90), run_time=T(vo, 0.08))
            self.play(FadeIn(b3), FadeOut(cw), FadeOut(lm90), run_time=T(vo, 0.08))
            self.play(th.animate.set_value(400), run_time=T(vo, 0.2), rate_func=linear)

        cot = MathTex(r"\theta + 360^\circ n,\quad n \in \mathbb{Z}")
        cot_b = box(cot)
        rad = MathTex(r"360^\circ = 2\pi")
        s400 = MathTex(r"\sin 400^\circ = \sin 40^\circ", color=SIN_C)
        cg = col(VGroup(cot, cot_b), rad, s400, top=3.0, buff=0.5)
        ghost = Line(O, self.P(40), color=COS_C, stroke_width=14, stroke_opacity=0.3)
        with self.voiceover("Angles that end at the same point are coterminal. They differ by whole turns, three "
                            "hundred sixty degrees, or two pi radians, and share every value. So sine of four "
                            "hundred degrees equals sine of forty degrees.") as vo:
            self.play(FadeOut(bl), ang.animate.move_to([RC_X, -2.4, 0]), run_time=T(vo, 0.08))
            self.play(Write(cot), Create(cot_b), run_time=T(vo, 0.2))
            self.play(Write(rad), run_time=T(vo, 0.2))
            self.play(FadeIn(ghost), run_time=T(vo, 0.12))
            self.play(Indicate(ghost, color=COS_C, scale_factor=1.05), run_time=T(vo, 0.12))
            self.play(Write(s400), run_time=T(vo, 0.15))

        r1 = MathTex(r"1110^\circ - 3(360^\circ)")
        r2 = MathTex(r"= 1110^\circ - 1080^\circ = 30^\circ")
        rr = col(two(r1, r2), top=3.0)
        turns = VGroup(txt("turns:", 30), Integer(0, color=INK)).arrange(RIGHT, buff=0.2)
        turns[1].add_updater(lambda m: m.set_value(max(0, int((th.get_value() - 30 + 1e-6) // 360))).set_color(INK))
        turns.move_to([RC_X, -1.4, 0])
        n1 = MathTex(r"-30^\circ + 360^\circ = 330^\circ")
        n2 = MathTex(r"\cos(-30^\circ) = \cos 330^\circ", color=COS_C)
        nn = col(n1, n2, top=3.0, buff=0.4)
        ghost330 = Line(O, self.P(330), color=COS_C, stroke_width=14, stroke_opacity=0.3)
        with self.voiceover("To reduce a big angle, subtract full turns. Three full turns is one thousand eighty "
                            "degrees. One thousand one hundred ten minus one thousand eighty leaves thirty. For "
                            "negative angles, add turns instead: cosine of negative thirty equals cosine of three "
                            "thirty.") as vo:
            self.play(FadeOut(cg), FadeOut(ghost), run_time=0.4)
            th.set_value(30)
            self.play(Write(r1), FadeIn(turns), run_time=T(vo, 0.1))
            self.play(th.animate.set_value(1110), run_time=2, rate_func=linear)
            self.play(Write(r2), run_time=T(vo, 0.15))
            self.play(Circumscribe(ang, color=ACCENT), run_time=T(vo, 0.06))
            th.set_value(30)
            self.play(Circumscribe(ang, color=ACCENT), run_time=T(vo, 0.06))
            self.play(self.fade(rr, turns), run_time=0.4)
            self.play(Write(n1), run_time=T(vo, 0.12))
            th.set_value(-30)
            self.play(FadeIn(ghost330), Write(n2), run_time=T(vo, 0.15))

        m1 = MathTex(r"\cos(-\theta) = \cos\theta", color=COS_C)
        m2 = MathTex(r"\sin(-\theta) = -\sin\theta", color=SIN_C)
        mm = col(m1, m2, top=2.6, buff=0.4)
        mdot = Circle(radius=0.09, color=INK, stroke_width=3).move_to(self.P(-35)).set_fill(BG, 1)
        mline = DashedLine(self.P(35), self.P(-35), color=MUTED, stroke_width=3, dash_length=0.1)
        lp = MathTex(r"35^\circ").scale(0.7).next_to(self.P(35), UR, buff=0.08)
        lm = MathTex(r"-35^\circ").scale(0.7).next_to(self.P(-35), DR, buff=0.08)
        with self.voiceover("Negative theta mirrors the point across the x-axis: same x, opposite y. So cosine of "
                            "negative theta is cosine theta, and sine of negative theta is negative sine theta.") as vo:
            self.play(self.fade(nn, ghost330, ang), run_time=0.4)
            th.set_value(35)
            self.play(Create(mline), FadeIn(mdot), FadeIn(lp), FadeIn(lm), run_time=T(vo, 0.2))
            self.play(self.flash_line(O, self.ft(), COS_C), run_time=T(vo, 0.15))
            self.play(Write(m1), run_time=T(vo, 0.2))
            self.play(Write(m2), run_time=T(vo, 0.2))
        self.wipe(keep=[self.ax, self.circle])
        self.point_parts = []

    # ------------------------------------------------------------------ Scene 4
    def scene4(self):
        th, O, ax = self.th, self.O, self.ax
        chart = VGroup()
        for d in [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330]:
            c, s = exact_pair(d)
            lab = MathTex(r"\left(" + c + "," + s + r"\right)").scale(0.42)
            lab.move_to(self.P(d, 1.27))
            chart.add(VGroup(Dot(self.P(d), radius=0.05, color=MUTED), lab))
        chart_x = Cross(VGroup(self.circle, chart), stroke_color=PRIMARY, stroke_width=8)
        q1 = txt("1. How far from the x-axis? → size", 28)
        q2 = txt("2. Which quadrant? → sign", 28)
        qc = col(q1, q2, top=1.2, buff=0.4)
        with self.voiceover("Now the idea that replaces the memorized chart: every angle is a first quadrant angle "
                            "plus a sign.") as vo:
            self.play(FadeIn(chart, lag_ratio=0.05), run_time=T(vo, 0.3))
            self.play(Create(chart_x), run_time=T(vo, 0.15))
            self.play(FadeOut(chart), FadeOut(chart_x), run_time=T(vo, 0.12))
            self.play(FadeIn(q1), run_time=T(vo, 0.12))
            self.play(FadeIn(q2), run_time=T(vo, 0.12))

        nums = VGroup(*[txt(n, 34, MUTED, weight="BOLD").move_to(ax.c2p(x, y))
                        for n, x, y in [("I", 1.2, 1.2), ("II", -1.2, 1.2), ("III", -1.2, -1.2), ("IV", 1.2, -1.2)]])
        right = Rectangle(width=3.75, height=7.5, stroke_width=0, fill_color=COS_C, fill_opacity=0.13).move_to(O + RIGHT * 1.875)
        top = Rectangle(width=7.5, height=3.75, stroke_width=0, fill_color=SIN_C, fill_opacity=0.13).move_to(O + UP * 1.875)
        rlab = MathTex(r"\cos > 0", color=COS_C).scale(0.7).move_to(ax.c2p(0.75, -1.35))
        tlab = MathTex(r"\sin > 0", color=SIN_C).scale(0.7).move_to(ax.c2p(-0.75, 1.35))
        signs = {1: "+++", 2: "-+-", 3: "--+", 4: "+--"}
        pos = {1: (0.5, 0.5), 2: (-0.5, 0.5), 3: (-0.5, -0.5), 4: (0.5, -0.5)}
        trip = VGroup()
        for q in range(1, 5):
            sg = signs[q]
            g = VGroup(MathTex(r"\cos\ " + sg[0], color=COS_C), MathTex(r"\sin\ " + sg[1], color=SIN_C),
                       MathTex(r"\tan\ " + sg[2], color=TAN_C)).arrange(DOWN, aligned_edge=LEFT, buff=0.1).scale(0.62)
            g.move_to(ax.c2p(*pos[q]))
            trip.add(g)
        with self.voiceover("The signs come from which half of the plane you are in. Right of the y-axis, cosine is "
                            "positive. Above the x-axis, sine is positive. Tangent, y over x, is positive in "
                            "quadrants one and three.") as vo:
            self.play(FadeIn(nums), run_time=T(vo, 0.1))
            self.wait(T(vo, 0.12))
            self.play(FadeIn(right), FadeIn(rlab), run_time=T(vo, 0.15))
            self.wait(T(vo, 0.05))
            self.play(FadeIn(top), FadeIn(tlab), run_time=T(vo, 0.15))
            self.play(FadeOut(right), FadeOut(top), FadeOut(rlab), FadeOut(tlab), FadeIn(trip), run_time=T(vo, 0.15))
            self.play(Indicate(trip[0][2], color=TAN_C), Indicate(trip[2][2], color=TAN_C), run_time=T(vo, 0.15))

        th.set_value(90)
        self.fillv.set_value(0)
        parc = Arc(radius=0.9, start_angle=120 * DEGREES, angle=60 * DEGREES, arc_center=O, color=REF_C, stroke_width=6)
        p60 = MathTex(r"60^\circ", color=REF_C).scale(0.7).move_to(self.P(168, 0.68))
        warc = Arc(radius=1.5, start_angle=90 * DEGREES, angle=30 * DEGREES, arc_center=O, color=MUTED,
                   stroke_width=5, stroke_opacity=0.7)
        w30 = MathTex(r"30^\circ", color=MUTED).scale(0.75).move_to(self.P(105, 0.78))
        wx = Cross(VGroup(warc, w30), stroke_color=PRIMARY, stroke_width=5)
        e120 = MathTex(r"180^\circ - 120^\circ = 60^\circ", color=REF_C).move_to([RC_X, 1.5, 0])
        with self.voiceover("The reference angle is the acute angle to the x-axis, never the y-axis. For one "
                            "hundred twenty degrees, one eighty minus one twenty is sixty. Sixty, not thirty.") as vo:
            self.play(FadeOut(qc), FadeOut(trip), run_time=0.4)
            self.show_point()
            self.play(th.animate.set_value(120), run_time=T(vo, 0.15))
            self.play(Create(parc), FadeIn(p60), run_time=T(vo, 0.2))
            self.play(Write(e120), run_time=T(vo, 0.25))
            self.play(Create(warc), FadeIn(w30), run_time=T(vo, 0.1))
            self.play(Create(wx), run_time=T(vo, 0.08))
            self.play(FadeOut(VGroup(warc, w30, wx)), run_time=T(vo, 0.07))

        rules = VGroup(MathTex(r"\text{Q I: } \theta"), MathTex(r"\text{Q II: } 180^\circ - \theta"),
                       MathTex(r"\text{Q III: } \theta - 180^\circ"), MathTex(r"\text{Q IV: } 360^\circ - \theta"))
        rules.arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        rules = col(*rules, top=2.8, buff=0.3)
        with self.voiceover("The rule depends on the quadrant. In quadrant two, one eighty minus theta. In quadrant "
                            "three, theta minus one eighty. In quadrant four, three sixty minus theta.") as vo:
            self.play(FadeOut(VGroup(e120, parc, p60)), FadeIn(rules[0]), run_time=T(vo, 0.2))
            for i in (1, 2, 3):
                self.play(FadeIn(rules[i]), Indicate(nums[i], color=ACCENT, scale_factor=1.5), run_time=T(vo, 0.2))
            self.play(rules.animate.scale(0.72).to_corner(UR, buff=0.3), run_time=T(vo, 0.12))

        def build_lines(ls, top):
            return col(*ls, top=top, buff=0.35)
        top_y = rules.get_bottom()[1] - 0.4
        w1 = MathTex(r"\text{Q III} \Rightarrow x < 0 \Rightarrow -")
        w2 = MathTex(r"210^\circ - 180^\circ = 30^\circ", color=REF_C)
        w3 = MathTex(r"\cos 30^\circ = \frac{\sqrt3}{2}")
        wl = build_lines([w1, w2, w3], top_y)
        fin = MathTex(r"\cos 210^\circ = -\frac{\sqrt{3}}{2}", color=COS_C).move_to([RC_X, top_y - 0.6, 0])
        fin_b = box(fin)
        arc210 = Arc(radius=0.9, start_angle=180 * DEGREES, angle=30 * DEGREES, arc_center=O, color=REF_C, stroke_width=6)
        a30 = MathTex(r"30^\circ", color=REF_C).scale(0.7).move_to(self.P(195, 0.52))
        hl3 = SurroundingRectangle(rules[2], color=ACCENT, buff=0.08, stroke_width=3)
        with self.voiceover("Worked example: cosine of two hundred ten degrees. Quadrant three, so x is negative. "
                            "Write the minus sign first. Two ten minus one eighty is thirty, and cosine of thirty is "
                            "the square root of three, over two. So the answer is negative root three, over two.") as vo:
            self.play(th.animate.set_value(210), run_time=T(vo, 0.12))
            self.play(Indicate(nums[2], color=ACCENT, scale_factor=1.5), Create(hl3), run_time=T(vo, 0.1))
            self.play(Write(w1), run_time=T(vo, 0.12))
            self.play(Write(w2), Create(arc210), FadeIn(a30), run_time=T(vo, 0.15))
            self.play(Write(w3), run_time=T(vo, 0.15))
            self.play(FadeOut(w1), FadeOut(w2), run_time=T(vo, 0.06))
            self.play(w3.animate.move_to([RC_X, top_y - 0.5, 0]), run_time=T(vo, 0.05))
            fin.next_to(w3, DOWN, buff=0.5)
            fin_b = box(fin)
            self.play(Write(fin), Create(fin_b), run_time=T(vo, 0.15))

        v1 = MathTex(r"\text{Q IV} \Rightarrow y < 0 \Rightarrow -")
        v2 = MathTex(r"360^\circ - 315^\circ = 45^\circ", color=REF_C)
        v3 = MathTex(r"\sin 315^\circ = -\frac{\sqrt2}{2}", color=SIN_C)
        vl = build_lines([v1, v2, v3], top_y)
        v3b = box(v3)
        arc315 = Arc(radius=0.9, start_angle=315 * DEGREES, angle=45 * DEGREES, arc_center=O, color=REF_C, stroke_width=6)
        a45 = MathTex(r"45^\circ", color=REF_C).scale(0.7).move_to(self.P(337.5, 0.52))
        hl4 = SurroundingRectangle(rules[3], color=ACCENT, buff=0.08, stroke_width=3)
        with self.voiceover("Once more: sine of three fifteen degrees. Quadrant four, so negative. Three sixty minus "
                            "three fifteen is forty five. So the answer is negative root two, over two.") as vo:
            self.play(FadeOut(VGroup(w3, fin, fin_b, arc210, a30)), ReplacementTransform(hl3, hl4), run_time=0.4)
            self.play(th.animate.set_value(315), run_time=T(vo, 0.15))
            self.play(Write(v1), Indicate(nums[3], color=ACCENT, scale_factor=1.5), run_time=T(vo, 0.15))
            self.play(Write(v2), Create(arc315), FadeIn(a45), run_time=T(vo, 0.25))
            self.play(Write(v3), Create(v3b), run_time=T(vo, 0.25))

        k1 = txt("✗  measuring to the y-axis", 30, PRIMARY)
        k2 = txt("✗  right size, wrong sign", 30, PRIMARY)
        kk = VGroup(k1, k2).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        kcard = SurroundingRectangle(kk, color=WARN_C, buff=0.3, corner_radius=0.15, stroke_width=4)
        tip = txt("Sign first, then size", 32, GREEN, weight="BOLD")
        kg = VGroup(VGroup(kk, kcard), tip).arrange(DOWN, buff=0.5).move_to([RC_X, -0.6, 0])
        with self.voiceover("Classic errors: measuring to the y-axis, and the right size with the wrong sign. "
                            "Write the sign first.") as vo:
            self.play(FadeOut(VGroup(v1, v2, v3, v3b)), run_time=0.4)
            self.play(Create(kcard), FadeIn(k1), run_time=T(vo, 0.25))
            self.play(FadeIn(k2), run_time=T(vo, 0.25))
            self.play(FadeIn(tip, scale=1.1), run_time=T(vo, 0.2))
        self.wipe(keep=[self.ax, self.circle])
        self.point_parts = []

    # ------------------------------------------------------------------ Scene 5
    def scene5(self):
        th, O = self.th, self.O
        th.set_value(40)
        self.fillv.set_value(0.2)
        iso = [r"x", r"y", r"\cos", r"\sin", r"^2", r"\theta", r"+", r"= 1"]
        e1 = MathTex(r"x^2", r"+", r"y^2", r"= 1").scale(1.2)
        e2 = MathTex(r"\cos^2", r"\theta", r"+", r"\sin^2", r"\theta", r"= 1").scale(1.2)
        e2[0].set_color(COS_C); e2[3].set_color(SIN_C)
        e3 = MathTex(r"\sin^2", r"\theta", r"+", r"\cos^2", r"\theta", r"= 1").scale(1.2)
        e3[0].set_color(SIN_C); e3[3].set_color(COS_C)
        for e in (e1, e2, e3):
            e.move_to([RC_X, 2.3, 0])
        e3b = box(e3)
        note = MathTex(r"\sin^2\theta = (\sin\theta)^2", color=MUTED).scale(0.8).next_to(e3b, DOWN, buff=0.3)
        with self.voiceover("The most used identity in trigonometry is one you already know. The unit circle's "
                            "equation is x squared plus y squared equals one. Substitute cosine and sine, and you get "
                            "cosine squared theta plus sine squared theta equals one, usually written sine squared "
                            "first.") as vo:
            self.show_point()
            self.play(Indicate(self.circle, color=ACCENT, scale_factor=1.03), run_time=T(vo, 0.15))
            self.play(Write(e1), run_time=T(vo, 0.15))
            self.wait(T(vo, 0.1))
            self.play(*[ReplacementTransform(e1[i], e2[j]) for i, j in ((0, 0), (1, 2), (2, 3), (3, 5))],
                      FadeIn(e2[1]), FadeIn(e2[4]), run_time=T(vo, 0.2))
            self.wait(T(vo, 0.1))
            self.play(*[ReplacementTransform(e2[i], e3[j]) for i, j in ((0, 3), (1, 4), (2, 2), (3, 0), (4, 1), (5, 5))],
                      path_arc=-PI / 3, run_time=T(vo, 0.12))
            self.play(Create(e3b), FadeIn(note), run_time=T(vo, 0.1))

        rc = self.readout(r"\cos\theta =", lambda: np.cos(th.get_value() * DEGREES), color=COS_C, places=3)
        rs = self.readout(r"\sin\theta =", lambda: np.sin(th.get_value() * DEGREES), color=SIN_C, places=3)
        rsum = self.readout(r"\cos^2\theta + \sin^2\theta =",
                            lambda: np.cos(th.get_value() * DEGREES) ** 2 + np.sin(th.get_value() * DEGREES) ** 2,
                            color=INK, places=3)
        ros = VGroup(rc, rs, rsum).arrange(DOWN, aligned_edge=LEFT, buff=0.35)
        for r in ros:
            r[1].clear_updaters()
        ros.move_to([RC_X, -0.9, 0])
        for r, f, c in ((rc, lambda: np.cos(th.get_value() * DEGREES), COS_C),
                        (rs, lambda: np.sin(th.get_value() * DEGREES), SIN_C),
                        (rsum, lambda: np.cos(th.get_value() * DEGREES) ** 2 + np.sin(th.get_value() * DEGREES) ** 2, INK)):
            lab = r[0]
            r[1].add_updater(lambda m, f=f, c=c, lab=lab: m.set_value(f()).set_color(c).next_to(lab, RIGHT, buff=0.15))
        sbox = always_redraw(lambda: SurroundingRectangle(rsum, color=GREEN, buff=0.1, stroke_width=2))
        with self.voiceover("It is Pythagoras in disguise. Squaring erases the negative signs of the other "
                            "quadrants, so it holds for every angle.") as vo:
            self.play(FadeOut(note), FadeIn(ros), run_time=0.4)
            th.set_value(0)
            self.add(sbox)
            self.play(th.animate.set_value(360), run_time=max(4, T(vo, 0.8)), rate_func=linear)

        k1 = MathTex(r"\sin\theta = \tfrac35,\ \theta \in \text{Q II}")
        k2 = MathTex(r"\cos^2\theta = 1 - \left(\tfrac35\right)^2")
        k3 = MathTex(r"= 1 - \tfrac{9}{25} = \tfrac{16}{25}")
        kg = col(k1, two(k2, k3), top=3.0, buff=0.45)
        k4 = MathTex(r"\cos\theta = ", r"\pm", r"\tfrac45")
        with self.voiceover("It also converts. Say sine theta is three fifths, in quadrant two. Cosine squared is "
                            "one minus nine twenty fifths, or sixteen twenty fifths. So cosine is plus or minus four "
                            "fifths.") as vo:
            self.play(self.fade(e3, e3b, ros, sbox), run_time=0.4)
            th.set_value(143.13)
            self.play(Write(k1), run_time=T(vo, 0.25))
            self.play(Write(kg[1]), run_time=T(vo, 0.35))
            self.play(FadeOut(k1), kg[1].animate.shift(UP * (k1.get_top()[1] - kg[1].get_top()[1])), run_time=T(vo, 0.08))
            k4.next_to(kg[1], DOWN, buff=0.5).align_to(kg[1], LEFT)
            self.play(Write(k4), run_time=T(vo, 0.2))

        pm = k4[1]
        strike = Line(pm.get_corner(DL) + LEFT * 0.05, pm.get_corner(UR) + RIGHT * 0.05, color=PRIMARY, stroke_width=5)
        k5 = MathTex(r"\cos\theta = -\tfrac45", color=COS_C).next_to(k4, DOWN, buff=0.5).align_to(k4, LEFT)
        k5b = box(k5)
        xneg = txt("x < 0", 28, COS_C).next_to((O + self.ft()) / 2, DOWN, buff=0.45)
        with self.voiceover("The algebra gives both signs. The geometry picks one. Quadrant two means x is "
                            "negative, so cosine is negative four fifths. Skipping this is the chapter's most common "
                            "error.") as vo:
            self.play(Create(strike), run_time=T(vo, 0.15))
            self.play(self.flash_line(O, self.ft(), COS_C), FadeIn(xneg), run_time=T(vo, 0.25))
            self.play(Write(k5), Create(k5b), run_time=T(vo, 0.25))
        self.play(FadeOut(VGroup(kg[1], k4, strike, k5, k5b, xneg)), run_time=0.5)

        f1 = MathTex(r"\sin^2\theta = 1 - \cos^2\theta")
        f2 = MathTex(r"\cos^2\theta = 1 - \sin^2\theta")
        fg = col(f1, f2, top=2.8, buff=0.4)
        g1 = MathTex(r"0.6^2 + 0.9^2 = 0.36 + 0.81")
        g2 = MathTex(r"= 1.17 \ne 1", color=PRIMARY)
        gg = col(two(g1, g2), top=2.8)
        bad = Dot(self.ax.c2p(0.9, 0.6), radius=0.1, color=WARN_C)
        bad_x = Cross(Square(0.45).move_to(bad), stroke_color=PRIMARY, stroke_width=4)
        bad_l = MathTex("(0.9,\ 0.6)", color=WARN_C).scale(0.7).next_to(bad, RIGHT, buff=0.3)
        with self.voiceover("It rearranges freely: sine squared is one minus cosine squared, and the other way "
                            "round. It also catches mistakes. Sine point six and cosine point nine? The squares add "
                            "to one point one seven, so no angle has both.") as vo:
            self.play(Write(f1), run_time=T(vo, 0.15))
            self.play(Write(f2), run_time=T(vo, 0.15))
            self.play(FadeOut(fg), run_time=T(vo, 0.05))
            self.hide_point(run_time=0.3)
            self.play(Write(g1), FadeIn(bad), FadeIn(bad_l), run_time=T(vo, 0.2))
            self.play(Write(g2), run_time=T(vo, 0.15))
            self.play(Create(bad_x), run_time=T(vo, 0.1))
        self.wipe(keep=[self.ax, self.circle])

    # ------------------------------------------------------------------ Scene 6
    def scene6(self):
        th, O = self.th, self.O
        cells = [MathTex(r"\tan\theta = \frac{\sin\theta}{\cos\theta} = \frac{y}{x}"),
                 MathTex(r"\cot\theta = \frac{1}{\tan\theta} = \frac{x}{y}"),
                 MathTex(r"\sec\theta = \frac{1}{\cos\theta} = \frac{1}{x}"),
                 MathTex(r"\csc\theta = \frac{1}{\sin\theta} = \frac{1}{y}")]
        for c in cells:
            c.scale_to_fit_width(3.0)
        grid = VGroup(*cells).arrange_in_grid(rows=2, cols=2, buff=(0.35, 0.6)).move_to([3.7, 2.05, 0])
        pair1 = MathTex(r"\mathrm{se}", r"\mathrm{c}", r"\ \longleftrightarrow\ ", r"\mathrm{c}", r"\mathrm{os}")
        pair2 = MathTex(r"\mathrm{cs}", r"\mathrm{c}", r"\ \longleftrightarrow\ ", r"\mathrm{s}", r"\mathrm{in}")
        for p, c in ((pair1, COS_C), (pair2, SIN_C)):
            p[1].set_color(ACCENT); p[3].set_color(ACCENT); p[4].set_color(c); p[3].set_color(c)
            p[1].set_color(ACCENT)
        pairs = VGroup(pair1, pair2).arrange(DOWN, buff=0.4, aligned_edge=LEFT).scale(1.1).move_to([RC_X, -1.5, 0])
        u1 = Underline(pair1[1], color=ACCENT, buff=0.05); u2 = Underline(pair2[1], color=ACCENT, buff=0.05)
        with self.voiceover("Tangent is sine over cosine, which is y over x. Cotangent is one over tangent. Secant "
                            "is one over cosine, and cosecant is one over sine. Careful: secant pairs with cosine, "
                            "cosecant with sine.") as vo:
            for i, f in enumerate((0.18, 0.12, 0.14, 0.14)):
                self.play(Write(cells[i]), run_time=T(vo, f))
            self.play(FadeIn(pair1), Create(u1), Indicate(cells[2], color=COS_C, scale_factor=1.08), run_time=T(vo, 0.15))
            self.play(FadeIn(pair2), Create(u2), Indicate(cells[3], color=SIN_C, scale_factor=1.08), run_time=T(vo, 0.15))

        self.fillv.set_value(0)
        th.set_value(0)

        def tanline():
            a = th.get_value() * DEGREES
            d = np.array([np.cos(a), np.sin(a), 0])
            return Line(O - 3.4 * d, O + 3.4 * d, color=TAN_C, stroke_width=4)
        tl = always_redraw(tanline)
        rise = txt("rise", 26, SIN_C).next_to((self.P(45) + self.ax.c2p(np.cos(PI / 4), 0)) / 2 + DOWN * 0.3, LEFT, buff=0.28)
        run_ = txt("run", 26, COS_C).next_to((O + self.ax.c2p(np.cos(PI / 4), 0)) / 2, DOWN, buff=0.15)
        t1 = MathTex(r"\tan\theta = \frac{\text{rise}}{\text{run}} = \frac{y}{x}", color=TAN_C)
        t2 = MathTex(r"\tan 45^\circ = 1", color=TAN_C)
        tg = col(t1, t2, top=2.6, buff=0.5)
        with self.voiceover("Tangent is a slope. The radius runs from the origin to the point x, y, so its rise "
                            "over run is y over x. At forty five degrees, the slope is one.") as vo:
            self.play(FadeOut(VGroup(grid, pairs, u1, u2)), run_time=0.4)
            self.show_point()
            self.play(th.animate.set_value(45), run_time=T(vo, 0.15))
            self.play(Create(tl), run_time=T(vo, 0.15))
            self.bring_to_front(*self.point_parts)
            self.play(FadeIn(rise), FadeIn(run_), run_time=T(vo, 0.15))
            self.play(Write(t1), run_time=T(vo, 0.2))
            self.play(Write(t2), run_time=T(vo, 0.15))
        tl.clear_updaters()
        self.remove(tl)
        tl = always_redraw(tanline)
        self.add(tl)
        self.bring_to_front(*self.point_parts)

        with self.voiceover("That is why tangent repeats every one hundred eighty degrees: a line through the origin "
                            "looks the same after a half turn.") as vo:
            self.play(FadeOut(rise), FadeOut(run_), run_time=0.3)
            self.play(th.animate.set_value(225), run_time=T(vo, 0.5))
            a = 225 * DEGREES
            d = np.array([np.cos(a), np.sin(a), 0])
            self.play(ShowPassingFlash(Line(O + 3.4 * d, O - 3.4 * d, color=ACCENT, stroke_width=12), time_width=0.8),
                      run_time=T(vo, 0.25))

        def tanval():
            c = np.cos(th.get_value() * DEGREES)
            return np.sin(th.get_value() * DEGREES) / c if abs(c) > 1e-4 else 9999
        tro = self.readout(r"\tan\theta =", tanval, color=TAN_C, places=2)
        tro.move_to([RC_X, 2.6, 0])
        undef = txt("undefined", 34, WARN_C, weight="BOLD")
        hdr = [txt("function", 24, MUTED), txt("denominator", 24, MUTED), txt("undefined at", 24, MUTED)]
        row1 = [MathTex(r"\tan,\ \sec"), MathTex("x", color=COS_C), MathTex(r"90^\circ, 270^\circ, \ldots")]
        row2 = [MathTex(r"\cot,\ \csc"), MathTex("y", color=SIN_C), MathTex(r"0^\circ, 180^\circ, \ldots")]
        table = VGroup(*hdr, *row1, *row2).arrange_in_grid(rows=3, cols=3, buff=(0.45, 0.4))
        fit(table)
        table.move_to([RC_X, 0.2, 0])
        marks = VGroup()
        for (x, y), lab, d in [((0, 1), "x = 0", UR), ((0, -1), "x = 0", DR), ((1, 0), "y = 0", UR), ((-1, 0), "y = 0", UL)]:
            dt = Dot(self.ax.c2p(x, y), radius=0.12, color=WARN_C)
            marks.add(VGroup(dt, txt(lab, 24, WARN_C).next_to(dt, d, buff=0.08)))
        with self.voiceover("Slide toward ninety degrees. X shrinks to zero, and the slope runs away. At ninety the "
                            "line is vertical, with no slope. So tangent and secant, with x underneath, break at "
                            "ninety, two seventy, and every half turn after that. Cotangent and cosecant break where "
                            "y is zero.") as vo:
            self.play(FadeOut(tg), run_time=0.3)
            self.play(th.animate.set_value(60), run_time=1)
            self.play(FadeIn(tro), run_time=0.3)
            self.play(th.animate.set_value(89.5), rate_func=rush_into, run_time=T(vo, 0.2))
            th.set_value(90)
            tro[1].clear_updaters()
            undef.next_to(tro[0], RIGHT, buff=0.2)
            self.play(FadeOut(tro[1]), FadeIn(undef), run_time=0.4)
            self.wait(T(vo, 0.08))
            self.play(FadeIn(VGroup(*hdr)), run_time=T(vo, 0.06))
            self.play(FadeIn(VGroup(*row1)), FadeIn(marks[0]), FadeIn(marks[1]), run_time=T(vo, 0.15))
            self.wait(T(vo, 0.1))
            self.play(FadeIn(VGroup(*row2)), FadeIn(marks[2]), FadeIn(marks[3]), run_time=T(vo, 0.15))

        rc = self.readout(r"\cos\theta =", lambda: np.cos(th.get_value() * DEGREES), color=COS_C)
        rs = self.readout(r"\sin\theta =", lambda: np.sin(th.get_value() * DEGREES), color=SIN_C)
        rr = VGroup(rc, rs)
        for r in rr:
            r[1].clear_updaters()
        rr.arrange(DOWN, aligned_edge=LEFT, buff=0.4).move_to([RC_X, 1.0, 0])
        for r, f, c in ((rc, lambda: np.cos(th.get_value() * DEGREES), COS_C),
                        (rs, lambda: np.sin(th.get_value() * DEGREES), SIN_C)):
            r[1].add_updater(lambda m, f=f, c=c, lab=r[0]: m.set_value(f()).set_color(c).next_to(lab, RIGHT, buff=0.15))
        with self.voiceover("Sine and cosine never break. A point always has both coordinates.") as vo:
            self.play(self.fade(table, marks, tro[0], undef, tl), run_time=0.4)
            self.play(FadeIn(rr), run_time=0.3)
            self.play(th.animate.set_value(450), run_time=max(2.5, T(vo, 0.75)), rate_func=linear)
        self.wipe(keep=[self.ax, self.circle])
        self.point_parts = []

    # ------------------------------------------------------------------ Scene 7
    def scene7(self):
        th, O, ax = self.th, self.O, self.ax
        # card 1
        axis_pts = VGroup(*[Dot(self.P(d), radius=0.11, color=ACCENT) for d in (0, 90, 180, 270)])
        axis_lbl = VGroup(
            MathTex("(1,0)").scale(0.6).next_to(self.P(0), DR, buff=0.08),
            MathTex("(0,1)").scale(0.6).next_to(self.P(90), UR, buff=0.08),
            MathTex("(-1,0)").scale(0.6).next_to(self.P(180), DL, buff=0.08),
            MathTex("(0,-1)").scale(0.6).next_to(self.P(270), DR, buff=0.08),
        )
        c1 = VGroup(txt("1", 30, PRIMARY, weight="BOLD"), txt("the four axis points", 28)).arrange(RIGHT, buff=0.3)
        # card 2: special triangles
        s = 0.95
        eq_tri = Polygon(ORIGIN, RIGHT * np.sqrt(3) * s, np.array([np.sqrt(3) * s, s, 0]), color=INK, stroke_width=3)
        eq_lbl = VGroup(
            MathTex(r"\sqrt3").scale(0.5).next_to(eq_tri, DOWN, buff=0.08),
            MathTex("1").scale(0.5).next_to(eq_tri, RIGHT, buff=0.08),
            MathTex("2").scale(0.5).move_to(np.array([np.sqrt(3) * s / 2 - 0.12, s / 2 + 0.2, 0])),
            MathTex(r"30^\circ", color=REF_C).scale(0.45).move_to(np.array([0.6, 0.13, 0])),
        )
        half_eq = VGroup(eq_tri, eq_lbl)
        sq_tri = Polygon(ORIGIN, RIGHT * 1.3, np.array([1.3, 1.3, 0]), color=INK, stroke_width=3)
        sq_lbl = VGroup(
            MathTex("1").scale(0.5).next_to(sq_tri, DOWN, buff=0.08),
            MathTex("1").scale(0.5).next_to(sq_tri, RIGHT, buff=0.08),
            MathTex(r"\sqrt2").scale(0.55).move_to(np.array([0.45, 0.9, 0])),
            MathTex(r"45^\circ", color=REF_C).scale(0.45).move_to(np.array([0.5, 0.17, 0])),
        )
        half_sq = VGroup(sq_tri, sq_lbl)
        tris = VGroup(half_eq, half_sq).arrange(RIGHT, buff=0.7, aligned_edge=DOWN)
        sizes = MathTex(r"\tfrac12,\ \tfrac{\sqrt2}{2},\ \tfrac{\sqrt3}{2}")
        c2 = VGroup(VGroup(txt("2", 30, PRIMARY, weight="BOLD"), txt("two special triangles", 28)).arrange(RIGHT, buff=0.3),
                    tris, sizes).arrange(DOWN, buff=0.25)
        c3 = VGroup(txt("3", 30, PRIMARY, weight="BOLD"),
                    txt("quadrant → sign,\nreference angle → size", 28)).arrange(RIGHT, buff=0.3)
        cards = VGroup(c1, c2, c3)
        frames = VGroup()
        for c in cards:
            fit(c, 5.0)
        cards.arrange(DOWN, buff=0.45).move_to([RC_X, 0, 0])
        for c in cards:
            frames.add(SurroundingRectangle(c, color=MUTED, buff=0.15, corner_radius=0.1, stroke_width=2))
        with self.voiceover("You do not need the chart. Three facts rebuild it: the axis points, the two special "
                            "triangles, and quadrant plus reference angle.") as vo:
            self.wait(T(vo, 0.15))
            self.play(FadeIn(c1), Create(frames[0]), FadeIn(axis_pts), FadeIn(axis_lbl), run_time=T(vo, 0.15))
            self.play(*[Flash(d, color=ACCENT, flash_radius=0.3) for d in axis_pts], run_time=T(vo, 0.1))
            self.play(FadeIn(c2), Create(frames[1]), run_time=T(vo, 0.25))
            self.play(FadeIn(c3), Create(frames[2]), run_time=T(vo, 0.2))
        self.half_eq = half_eq

        th.set_value(90)
        self.fillv.set_value(0)
        sgn = MathTex(r"(-,+)").scale(0.9).move_to(ax.c2p(-1.05, 1.2))
        qlab = txt("II", 30, MUTED, weight="BOLD").next_to(sgn, LEFT, buff=0.2)
        arc = Arc(radius=0.9, start_angle=150 * DEGREES, angle=30 * DEGREES, arc_center=O, color=REF_C, stroke_width=6)
        a30 = MathTex(r"30^\circ", color=REF_C).scale(0.7).move_to(self.P(165, 0.52))
        e1 = MathTex(r"180^\circ - 150^\circ = 30^\circ", color=REF_C)
        r1 = MathTex(r"(\cos 150^\circ, \sin 150^\circ)")
        r2 = MathTex(r"= \left(-\tfrac{\sqrt3}{2},\ \tfrac12\right)")
        rg = col(e1, two(r1, r2), top=2.6, buff=0.6)
        rb = box(rg[1])
        with self.voiceover("Try one hundred fifty degrees. Quadrant two: x negative, y positive. One eighty minus "
                            "one fifty is thirty. So x is negative root three, over two, and y is one half.") as vo:
            self.play(FadeOut(VGroup(cards, frames, axis_pts, axis_lbl)), run_time=0.4)
            self.show_point()
            self.play(th.animate.set_value(150), run_time=T(vo, 0.15))
            self.play(FadeIn(qlab), FadeIn(sgn), run_time=T(vo, 0.15))
            self.play(Create(arc), FadeIn(a30), Write(e1), run_time=T(vo, 0.2))
            self.play(Write(r1), run_time=T(vo, 0.15))
            self.play(Write(r2), Create(rb), run_time=T(vo, 0.2))

        angs = [30, 45, 60, 120, 135, 150, 210, 225, 240, 300, 315, 330]
        dots = {d: Dot(self.P(d), radius=0.11, color=DIM_C) for d in angs}
        fams = [(30, SECONDARY, [30, 150, 210, 330], r"30^\circ", r"\tfrac{\sqrt3}{2}", r"\tfrac12"),
                (45, ACCENT, [45, 135, 225, 315], r"45^\circ", r"\tfrac{\sqrt2}{2}", r"\tfrac{\sqrt2}{2}"),
                (60, PINK_C, [60, 120, 240, 300], r"60^\circ", r"\tfrac12", r"\tfrac{\sqrt3}{2}")]
        rows = VGroup()
        for _, c, _, a, cv, sv in fams:
            rows.add(VGroup(MathTex(a, color=c), MathTex(r"|\cos| = " + cv, color=COS_C),
                            MathTex(r"|\sin| = " + sv, color=SIN_C)))
        tbl = VGroup(*[m for r in rows for m in r]).arrange_in_grid(rows=3, cols=3, buff=(0.45, 0.3), col_alignments="lll")
        fit(tbl)
        tbl.move_to([RC_X, 0, 0]).to_edge(UP, buff=0.5)
        with self.voiceover("Twelve standard angles, only three sizes. Every other value is a first quadrant value "
                            "wearing a minus sign.") as vo:
            self.play(FadeOut(VGroup(rg, rb, arc, a30, sgn, qlab)), run_time=0.4)
            self.hide_point(run_time=0.3)
            self.play(LaggedStart(*[FadeIn(dots[d], scale=0.5) for d in angs], lag_ratio=0.08), run_time=T(vo, 0.15))
            for i, (base, c, fam, *_rest) in enumerate(fams):
                fd = VGroup(*[dots[d] for d in fam])
                self.play(fd.animate.set_color(c).scale(1.3), run_time=T(vo, 0.06))
                self.play(Indicate(dots[base], color=c, scale_factor=1.8), FadeIn(rows[i]), run_time=T(vo, 0.12))
                self.play(fd.animate.set_opacity(0.45).scale(1 / 1.3), run_time=T(vo, 0.05))

        h1 = MathTex(r"\sin:\ ", r"\tfrac{\sqrt1}{2}", r",\ ", r"\tfrac{\sqrt2}{2}", r",\ ", r"\tfrac{\sqrt3}{2}", color=SIN_C)
        h2 = MathTex(r"\cos:\ ", r"\tfrac{\sqrt3}{2}", r",\ ", r"\tfrac{\sqrt2}{2}", r",\ ", r"\tfrac{\sqrt1}{2}", color=COS_C)
        hg = VGroup(h1, h2).arrange(DOWN, aligned_edge=LEFT, buff=0.35).scale(1.1)
        hg.next_to(tbl, DOWN, buff=0.55).set_x(RC_X)
        back = Arrow(h2.get_right() + RIGHT * 0.1 + DOWN * 0.55, h2[1].get_left() + DOWN * 0.55, buff=0,
                     color=MUTED, stroke_width=4, max_tip_length_to_length_ratio=0.12)
        tri = self.half_eq.copy().scale(1.0).move_to([RC_X, -3.05, 0])
        with self.voiceover("A memory hook: for thirty, forty five, sixty, the sines are root one, root two, root "
                            "three, each over two. Cosines run backwards. If in doubt, redraw the triangle.") as vo:
            self.play(Write(h1), run_time=T(vo, 0.15))
            for i in (1, 3, 5):
                self.play(Indicate(h1[i], color=ACCENT, scale_factor=1.3), run_time=T(vo, 0.1))
            self.play(Write(h2), GrowArrow(back), run_time=T(vo, 0.2))
            self.play(FadeIn(tri), run_time=T(vo, 0.12))
        self.play(FadeOut(tri), run_time=0.4)

    # ------------------------------------------------------------------ Scene 8
    def scene8(self):
        keep = [self.circle]
        self.wipe(keep=keep)
        lines = [MathTex(r"P(\theta) = (\cos\theta, \sin\theta)"),
                 MathTex(r"\sin(\theta + 360^\circ n) = \sin\theta"),
                 MathTex(r"\cos(-\theta) = \cos\theta,\ \sin(-\theta) = -\sin\theta"),
                 txt("quadrant → sign · reference angle → size", 30),
                 MathTex(r"\sin^2\theta + \cos^2\theta = 1")]
        for m in lines:
            if isinstance(m, MathTex):
                m.scale(0.9)
        lg = col(*lines, top=2.8, buff=0.5, x=1.9, w=7.2)
        with self.voiceover("To recap. The point at angle theta is cosine theta, comma, sine theta. Coterminal "
                            "angles share every value, and negating the angle flips only the sine. Quadrant gives "
                            "the sign, reference angle the size. And sine squared plus cosine squared equals one is "
                            "the circle's own equation.") as vo:
            self.play(self.circle.animate.scale(0.6).move_to([-4.6, 0, 0]), run_time=T(vo, 0.08))
            for f, m in zip((0.14, 0.12, 0.16, 0.16, 0.16), lines):
                self.play(Write(m) if isinstance(m, MathTex) else FadeIn(m), run_time=T(vo, f))

        cc = np.array([-4.6, 0, 0])
        R = 1.5
        t = ValueTracker(0)
        ax2 = Axes(x_range=[0, 360, 90], y_range=[-1.2, 1.2, 1], x_length=6.4, y_length=3.6,
                   axis_config={"color": MUTED, "stroke_width": 2, "include_tip": False}).move_to([2.8, 0, 0])
        ax2.shift(UP * (cc[1] - ax2.c2p(0, 0)[1]))
        xl = VGroup(*[MathTex(fr"{d}^\circ", color=MUTED).scale(0.55).next_to(ax2.c2p(d, 0), DOWN, buff=0.15)
                      for d in (90, 180, 270, 360)])
        ylab = MathTex(r"y = \sin\theta", color=SIN_C).scale(0.8).next_to(ax2.c2p(0, 1.2), RIGHT, buff=0.2).shift(UP * 0.2)

        def cp():
            a = t.get_value() * DEGREES
            return cc + R * np.array([np.cos(a), np.sin(a), 0])

        def tp():
            return ax2.c2p(t.get_value(), np.sin(t.get_value() * DEGREES))
        rad = always_redraw(lambda: Line(cc, cp(), color=INK, stroke_width=3))
        cdot = always_redraw(lambda: Dot(cp(), radius=0.08, color=INK))
        tip = always_redraw(lambda: Dot(tp(), radius=0.08, color=SIN_C))
        conn = always_redraw(lambda: DashedLine(cp(), tp(), color=MUTED, stroke_width=2, dash_length=0.1))
        trace = TracedPath(lambda: tp(), stroke_color=SIN_C, stroke_width=4)
        nxt = txt("Next: Chapter 2 · Trig Functions as Functions", 32, PRIMARY, weight="BOLD").move_to([0, -3.1, 0])
        fit(nxt, 12)
        with self.voiceover("Next, chapter two plots all these values against the angle. The circle unwraps into "
                            "a wave.") as vo:
            self.play(FadeOut(lg), run_time=0.3)
            self.play(Create(ax2), FadeIn(xl), FadeIn(ylab), run_time=0.5)
            self.add(trace, conn, rad, cdot, tip)
            self.play(t.animate.set_value(360), run_time=T(vo, 0.5), rate_func=linear)
            self.play(FadeIn(nxt, shift=UP * 0.2), run_time=0.5)
        # (render.py trims the video to the end of the narration, so nothing is added after this.)
