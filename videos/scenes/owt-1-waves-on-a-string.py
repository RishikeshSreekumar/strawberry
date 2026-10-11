import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

# Chapter colour roles (light background).
W1_C = PRIMARY  # wave 1 / incident / tension = strawberry red
W2_C = SECONDARY  # wave 2 / reflected = teal
SUM_C = INK  # the string itself / resultant
HL_C = ACCENT  # probe particle, highlights = amber
TR_C = PURPLE  # transmitted wave / nodes
WARN = PRIMARY


def T(s, size=30, **kw):
    return Text(s, font_size=size, **kw)


def M(s, size=40, **kw):
    return MathTex(s, font_size=size, **kw)


def fit(mob, w):
    if mob.width > w:
        mob.scale_to_fit_width(w)
    return mob


def vec(start, end, color, sw=6):
    return Arrow(start, end, buff=0, color=color, stroke_width=sw,
                 max_tip_length_to_length_ratio=0.18, max_stroke_width_to_length_ratio=12)


def check():
    return MathTex(r"\checkmark", color=GREEN, font_size=56)


def cross_mark():
    return MathTex(r"\times", color=WARN, font_size=64)


def P(x, y):
    return np.array([x, y, 0.0])


def curve(f, x0, x1, color=SUM_C, sw=5, n=220, y0=0.0):
    """A string drawn through f(x) + y0 for x in [x0, x1]."""
    xs = np.linspace(x0, x1, n)
    m = VMobject(color=color, stroke_width=sw)
    m.set_points_as_corners([P(x, y0 + f(x)) for x in xs])
    return m


def bump(u, w=0.7):
    return np.exp(-(u / w) ** 2)


def wall(x, y0, y1):
    line = Line(P(x, y0), P(x, y1), color=INK, stroke_width=6)
    hatch = VGroup(*[Line(P(x, y), P(x + 0.25, y + 0.25), color=MUTED, stroke_width=2)
                     for y in np.arange(y0, y1 - 0.1, 0.3)])
    return VGroup(line, hatch)


class OwtCh1Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Oscillations, Waves & Thermal Physics",
            "Chapter 1 · Waves on a String",
            "Chapter one. Waves on a string.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ scene 1: what a wave carries
    def s1(self):
        c = ValueTracker(-8.0)
        xs = np.arange(-6.0, 6.01, 0.5)
        seat_y = -0.6

        def head_y(x):
            return seat_y + 0.9 + 0.9 * bump(x - c.get_value(), 1.0)

        people = VGroup()
        for i, x in enumerate(xs):
            col = HL_C if i == 16 else INK
            body = always_redraw(lambda x=x, col=col: Line(P(x, seat_y), P(x, head_y(x) - 0.14), color=col,
                                                          stroke_width=5))
            head = always_redraw(lambda x=x, col=col: Dot(P(x, head_y(x)), radius=0.14, color=col))
            people.add(body, head)
        seats = VGroup(*[RoundedRectangle(width=0.36, height=0.18, corner_radius=0.05, color=MUTED,
                                          stroke_width=2).move_to(P(x, seat_y - 0.1)) for x in xs])
        hdr = T("A Mexican wave", 34, color=PRIMARY, weight="BOLD").move_to(P(0, 3.1))
        lab = T("one spectator: only up and down", 24, color=HL_C).move_to(P(xs[16], -1.6))
        arr = Arrow(lab.get_top(), P(xs[16], seat_y - 0.25), buff=0.08, color=HL_C, stroke_width=3)
        what = T("what travels: a pattern of motion, and energy", 28, color=INK).move_to(P(0, -2.8))

        with self.voiceover("At a cricket stadium the crowd starts a Mexican wave. A bulge of standing people races round the "
                            "ground, yet nobody leaves their seat.") as vo:
            self.play(FadeIn(hdr), FadeIn(seats), FadeIn(people), run_time=1.0)
            self.play(c.animate.set_value(8.0), run_time=4.0, rate_func=linear)
            self.play(FadeIn(lab), Create(arr), run_time=0.6)
        with self.voiceover("What travels is not people. It is a pattern of motion, and with it, energy: a disturbance that "
                            "travels while each part of the medium only oscillates in place. On a rope, each bit pulls its "
                            "neighbour through the tension, and inertia makes each bit lag a little.") as vo:
            self.play(FadeIn(what), run_time=0.8)
            c.set_value(-8.0)
            self.play(c.animate.set_value(8.0), run_time=min(5.0, vo.duration - 1.2), rate_func=linear)
        for m in people:
            m.clear_updaters()
        self.play(*[FadeOut(m) for m in self.mobjects], run_time=0.6)

        # the moving shape
        base = -1.0
        tt = ValueTracker(0.0)
        v = 1.5
        c0 = -4.0
        ghost = DashedVMobject(curve(lambda x: 1.6 * bump(x - c0), -6.6, 6.6, color=MUTED, sw=3, y0=base),
                               num_dashes=80)
        live = always_redraw(lambda: curve(lambda x: 1.6 * bump(x - c0 - v * tt.get_value()), -6.6, 6.6,
                                           y0=base))
        xp = 1.0
        probe = always_redraw(lambda: Dot(P(xp, base + 1.6 * bump(xp - c0 - v * tt.get_value())), radius=0.12,
                                          color=HL_C))
        track = DashedLine(P(xp, base - 0.2), P(xp, base + 1.9), color=HL_C, stroke_width=2)
        pl = M("P", 34, color=HL_C).next_to(track, UP, buff=0.1)
        e1 = M(r"y = f(x - vt)", 60).move_to(P(-2.6, 2.7))
        e1n = M(r"f(x + vt)\ \text{moves left}", 36, color=MUTED).move_to(P(3.2, 2.7))
        with self.voiceover("A pulse of shape f of x, moving right at speed v, has slid by v t at time t. So y equals f of x "
                            "minus v t. Any function of x plus v t moves left instead.") as vo:
            self.play(Create(ghost), FadeIn(live), run_time=1.0)
            self.play(tt.animate.set_value(3.2), run_time=2.5, rate_func=linear)
            sh = Arrow(P(c0, base + 1.95), P(c0 + v * 3.2, base + 1.95), buff=0, color=W1_C, stroke_width=4)
            shl = M(r"vt", 36, color=W1_C).next_to(sh, UP, buff=0.08)
            self.play(GrowArrow(sh), FadeIn(shl), run_time=0.7)
            self.play(Write(e1), run_time=1.2)
            self.wait(vo.duration * 0.15)
            self.play(FadeIn(e1n), run_time=0.6)
        with self.voiceover("Watch one point, P. It rises and falls, but never drifts sideways. Only the shape and its energy "
                            "travel.") as vo:
            self.play(FadeOut(sh), FadeOut(shl), run_time=0.4)
            tt.set_value(0.0)
            self.play(Create(track), FadeIn(pl), FadeIn(probe), run_time=0.7)
            self.play(tt.animate.set_value(6.0), run_time=4.0, rate_func=linear)
            cap = T("the shape moves; the string stays", 28, color=HL_C).move_to(P(0, -2.6))
            self.play(FadeIn(cap), run_time=0.6)
        live.clear_updaters()
        probe.clear_updaters()

    # ------------------------------------------------------------ scene 2: the sinusoidal wave
    def s2(self):
        base = -1.3
        A = 0.9
        lam = 3.0
        k = TAU / lam
        vw = 2.0
        w = k * vw
        x0 = -6.2
        t = ValueTracker(0.0)

        def y(x, tv):
            if x - x0 > vw * tv:
                return 0.0
            return A * np.sin(k * (x - x0) - w * tv)

        axis = DashedLine(P(-6.4, base), P(6.6, base), color=GRID, stroke_width=3)
        wave = always_redraw(lambda: curve(lambda x: y(x, t.get_value()), x0, 6.6, y0=base))
        hand = always_redraw(lambda: Dot(P(x0, base + y(x0, t.get_value())), radius=0.15, color=W1_C))
        hl = T("end driven in SHM", 22, color=W1_C).move_to(P(-5.2, base - 1.5))
        eq = M(r"y = A\sin(kx - \omega t)", 60).move_to(P(0, 2.8))

        with self.voiceover("Now shake the end of a string in S H M. Every point repeats that motion a little later, and the "
                            "result is y equals A sine of k x minus omega t.") as vo:
            self.play(Create(axis), FadeIn(hand), FadeIn(hl), run_time=0.8)
            self.add(wave)
            self.play(t.animate.set_value(6.6), run_time=5.0, rate_func=linear)
            self.play(Write(eq), run_time=1.2)

        tv = t.get_value()
        # crest positions at time tv: k(x-x0) - w tv = pi/2 + 2 pi m
        crests = [x0 + (PI / 2 + w * tv + TAU * m) / k for m in range(-12, 4)]
        crests = [cx for cx in crests if -5.5 < cx < 6.0]
        cA, cB = crests[1], crests[2]
        br = BraceBetweenPoints(P(cA, base + A + 0.1), P(cB, base + A + 0.1), direction=UP, color=W2_C)
        brl = M(r"\lambda", 40, color=W2_C).next_to(br, UP, buff=0.08)
        r1 = M(r"k = \frac{2\pi}{\lambda}", 44, color=W2_C)
        r2 = M(r"\omega = 2\pi f", 44, color=HL_C)
        r3 = M(r"v = f\lambda = \frac{\omega}{k}", 48, color=PRIMARY)
        row = VGroup(r1, r2, r3).arrange(RIGHT, buff=0.9).move_to(P(0, 1.55))
        xp = 2.0
        probe = always_redraw(lambda: Dot(P(xp, base + y(xp, t.get_value())), radius=0.13, color=HL_C))
        with self.voiceover("Freeze time, and the shape repeats every wavelength, so k is two pi over lambda. Freeze a point, and"
                            " it does S H M, so omega is two pi f. In one period the wave moves one wavelength: v equals f "
                            "lambda, or omega over k.") as vo:
            self.play(GrowFromCenter(br), FadeIn(brl), run_time=0.8)
            self.play(Write(r1), run_time=0.9)
            self.wait(vo.duration * 0.12)
            self.play(FadeIn(probe), FadeOut(br), FadeOut(brl), run_time=0.5)
            self.play(t.animate.set_value(tv + 2 * PI / w), run_time=3.0, rate_func=linear)
            self.play(Write(r2), run_time=0.8)
            self.play(Write(r3), run_time=1.0)

        probe.clear_updaters()
        wave.clear_updaters()
        hand.clear_updaters()
        tv = t.get_value()
        # rising and falling zero crossings
        # rising zero crossing (phase 2 pi m, slope +) and the falling one half a wavelength on
        zr = next(xx for xx in (x0 + (w * tv + TAU * m) / k for m in range(-20, 20)) if -3.5 < xx < 0.5)
        zf = zr + lam / 2
        d1 = vec(P(zr, base), P(zr, base - 0.8), W1_C, sw=5)
        d2 = vec(P(zf, base), P(zf, base + 0.8), W1_C, sw=5)
        dots = VGroup(Dot(P(zr, base), radius=0.1, color=W1_C), Dot(P(zf, base), radius=0.1, color=W1_C))
        vp = M(r"v_p = -v\,\frac{\partial y}{\partial x}", 46, color=W1_C).move_to(P(-3.4, 1.5))
        dirn = VGroup(M(r"kx - \omega t:\ \text{moves } +x \ \rightarrow", 34),
                      M(r"kx + \omega t:\ \text{moves } -x \ \leftarrow", 34, color=MUTED)).arrange(
            DOWN, buff=0.15, aligned_edge=LEFT)
        dirn.move_to(P(3.4, 1.5))
        with self.voiceover("Opposite signs in k x minus omega t mean the wave moves towards plus x. Matching signs mean minus x."
                            " And a particle's velocity is minus v times the slope: where the string slopes up, it moves down.") as vo:
            self.play(FadeOut(r1), FadeOut(r2), FadeOut(r3), run_time=0.4)
            self.play(FadeIn(dirn), run_time=1.0)
            self.wait(vo.duration * 0.2)
            self.play(Write(vp), run_time=1.0)
            self.play(FadeIn(dots), GrowArrow(d1), GrowArrow(d2), run_time=0.9)

        with self.voiceover("For y equals zero point zero two sine of thirty x minus two forty t, the wave speed is two forty "
                            "over thirty, eight metres per second. The fastest particle moves at A omega, only four point eight.") as vo:
            self.clear_scene(0.5)
            ex = M(r"y = 0.02\sin(30x - 240t)", 56).move_to(P(0, 2.4))
            l1 = M(r"v = \frac{\omega}{k} = \frac{240}{30} = 8\ \text{m/s}", 46).move_to(P(0, 0.9))
            l2 = M(r"v_{p,\max} = A\omega = 0.02\times240 = 4.8\ \text{m/s}", 46).next_to(l1, DOWN, buff=0.45)
            cap = T("particle speed is not wave speed", 30, color=PRIMARY).move_to(P(0, -2.3))
            self.play(Write(ex), run_time=1.2)
            self.wait(vo.duration * 0.08)
            self.play(Write(l1), run_time=1.3)
            self.wait(vo.duration * 0.08)
            self.play(Write(l2), run_time=1.4)
            self.play(FadeIn(cap), run_time=0.6)

    # ------------------------------------------------------------ scene 3: v = sqrt(T/mu)
    def s3(self):
        cx, base, h, s = -3.6, -1.4, 2.2, 2.0
        R = s * s / (2 * h)  # curvature radius of h*exp(-(x/s)^2) at its top
        peak = P(cx, base + h)
        string = curve(lambda x: h * bump(x - cx, s), -6.6, -0.6, y0=base)
        ctr = peak + R * DOWN
        half = 30 * DEGREES
        arc = Arc(radius=R, start_angle=PI / 2 - half, angle=2 * half, arc_center=ctr, color=HL_C, stroke_width=10)
        eL = ctr + R * np.array([np.cos(PI / 2 + half), np.sin(PI / 2 + half), 0])
        eR = ctr + R * np.array([np.cos(PI / 2 - half), np.sin(PI / 2 - half), 0])
        tL = vec(eL, eL + 1.5 * np.array([-np.cos(half), -np.sin(half), 0]), W1_C, sw=5)
        tR = vec(eR, eR + 1.5 * np.array([np.cos(half), -np.sin(half), 0]), W1_C, sw=5)
        tLl = M("T", 34, color=W1_C).next_to(tL.get_end(), UP, buff=0.12)
        tRl = M("T", 34, color=W1_C).next_to(tR.get_end(), UP, buff=0.12)
        rad = VGroup(DashedLine(ctr, eL, color=MUTED, stroke_width=2), DashedLine(ctr, eR, color=MUTED,
                                                                                   stroke_width=2))
        cdot = Dot(ctr, radius=0.05, color=MUTED)
        inward = vec(peak + 0.1 * DOWN, peak + 1.0 * DOWN, W1_C, sw=4)
        stream = vec(P(-1.2, base - 0.5), P(-4.6, base - 0.5), W2_C, sw=4)
        stl = T("string streams through at v", 22, color=W2_C).next_to(stream, DOWN, buff=0.12)
        hdr = T("Ride along with the pulse", 32, color=PRIMARY, weight="BOLD").move_to(P(0, 3.2))

        with self.voiceover("What sets the speed? Ride along with a pulse, so the bump is frozen and the string streams through "
                            "it. A tiny arc at the top feels the tension pulling at both ends.") as vo:
            self.play(FadeIn(hdr), Create(string), run_time=1.0)
            self.play(GrowArrow(stream), FadeIn(stl), run_time=0.8)
            self.wait(vo.duration * 0.15)
            self.play(Create(arc), FadeIn(cdot), Create(rad), run_time=0.8)
            self.play(GrowArrow(tL), GrowArrow(tR), FadeIn(tLl), FadeIn(tRl), run_time=0.9)

        e1 = M(r"2T\,\delta\theta = \mu\,(2R\,\delta\theta)\,\frac{v^2}{R}", 44)
        e1n = T("inward pull = mass × v²/R", 22, color=MUTED)
        e2 = M(r"T = \mu v^2", 48)
        e3 = M(r"v = \sqrt{\frac{T}{\mu}}", 64, color=PRIMARY)
        colm = VGroup(e1n, e1, e2, e3).arrange(DOWN, buff=0.35).move_to(P(3.3, 0.2))
        b3 = SurroundingRectangle(e3, buff=0.2, corner_radius=0.12, color=PRIMARY, stroke_width=3)
        with self.voiceover("The horizontal pulls cancel. The vertical parts add to two T delta theta, pointing inward. That "
                            "supplies the centripetal force on the arc's mass, mu times two R delta theta, times v squared over "
                            "R. Everything cancels to T equals mu v squared.") as vo:
            self.play(GrowArrow(inward), run_time=0.7)
            self.play(FadeIn(e1n), Write(e1), run_time=1.6)
            self.wait(vo.duration * 0.25)
            self.play(Write(e2), run_time=1.0)

        with self.voiceover("So v is root T over mu: stiffness over inertia. Doubling the speed takes four times the tension. A "
                            "two metre wire of mass twenty grams, at fifty newtons, has v of about seventy one metres per second.") as vo:
            self.play(Write(e3), Create(b3), run_time=1.2)
            self.wait(vo.duration * 0.1)
            self.play(*[FadeOut(m) for m in self.mobjects if m not in (e3, b3)], run_time=0.5)
            self.play(VGroup(e3, b3).animate.move_to(P(0, 2.4)), run_time=0.6)
            q = M(r"T \times 4 \;\Rightarrow\; v \times 2", 44, color=MUTED).move_to(P(0, 0.9))
            x1 = M(r"\mu = \frac{0.020\ \text{kg}}{2\ \text{m}} = 0.01\ \text{kg/m}", 42).move_to(P(0, -0.4))
            x2 = M(r"v = \sqrt{\frac{50}{0.01}} \approx 70.7\ \text{m/s}", 46, color=GREEN).next_to(x1, DOWN,
                                                                                              buff=0.4)
            self.play(FadeIn(q), run_time=0.6)
            self.wait(vo.duration * 0.08)
            self.play(Write(x1), run_time=1.1)
            self.play(Write(x2), run_time=1.1)

        with self.voiceover("Every frequency travels at this speed. Shake faster and the waves crowd closer; they do not move "
                            "faster. That is why a whole chord reaches your ear together. The power carried is one half mu omega "
                            "squared A squared v.") as vo:
            self.clear_scene(0.5)
            lo = curve(lambda x: 0.5 * np.sin(TAU * x / 3.0), -6.2, 2.4, color=W2_C, y0=1.6)
            hi = curve(lambda x: 0.5 * np.sin(TAU * x / 1.2), -6.2, 2.4, color=W1_C, y0=-0.4)
            a1 = vec(P(3.0, 1.6), P(5.2, 1.6), W2_C, sw=5)
            a2 = vec(P(3.0, -0.4), P(5.2, -0.4), W1_C, sw=5)
            l1 = M(r"v", 36, color=W2_C).next_to(a1, UP, buff=0.1)
            l2 = M(r"v", 36, color=W1_C).next_to(a2, UP, buff=0.1)
            n1 = T("low f, long λ", 24, color=W2_C).next_to(a1, DOWN, buff=0.15)
            n2 = T("high f, short λ", 24, color=W1_C).next_to(a2, DOWN, buff=0.15)
            self.play(Create(lo), GrowArrow(a1), FadeIn(l1), FadeIn(n1), run_time=1.0)
            self.play(Create(hi), GrowArrow(a2), FadeIn(l2), FadeIn(n2), run_time=1.0)
            pw = M(r"P = \tfrac12\,\mu\,\omega^2 A^2\, v", 50).move_to(P(0, -2.6))
            self.wait(vo.duration * 0.2)
            self.play(Write(pw), run_time=1.2)

    # ------------------------------------------------------------ scene 4: superposition
    def s4(self):
        base = -0.2
        s = ValueTracker(0.0)
        sign = ValueTracker(1.0)

        def y1(x):
            return 1.1 * bump(x + 5.0 - s.get_value(), 0.8)

        def y2(x):
            return sign.get_value() * 1.1 * bump(x - 5.0 + s.get_value(), 0.8)

        c1 = always_redraw(lambda: curve(y1, -6.6, 6.6, color=W1_C, sw=3, y0=base))
        c2 = always_redraw(lambda: curve(y2, -6.6, 6.6, color=W2_C, sw=3, y0=base))
        tot = always_redraw(lambda: curve(lambda x: y1(x) + y2(x), -6.6, 6.6, color=SUM_C, sw=7, y0=base))
        hdr = M(r"y = y_1 + y_2", 56).move_to(P(0, 3.1))
        with self.voiceover("When two pulses meet, they do not collide. Their displacements add, point by point. For an instant "
                            "the bump is twice as tall, and then each pulse carries on unchanged.") as vo:
            self.play(FadeIn(tot), FadeIn(c1), FadeIn(c2), run_time=0.8)
            self.play(Write(hdr), run_time=0.9)
            self.play(s.animate.set_value(5.0), run_time=2.5, rate_func=linear)
            self.wait(0.4)
            self.play(s.animate.set_value(10.0), run_time=2.5, rate_func=linear)

        with self.voiceover("An upward pulse and a downward one cancel for an instant, and the rope is flat. But it is still "
                            "moving, and the pulses come out again. Interference moves energy around; it never destroys it.") as vo:
            sign.set_value(-1.0)
            s.set_value(0.0)
            self.wait(0.3)
            self.play(s.animate.set_value(5.0), run_time=3.0, rate_func=linear)
            flat = T("flat, but still moving", 28, color=HL_C).move_to(P(0, -1.8))
            self.play(FadeIn(flat), run_time=0.5)
            self.wait(0.8)
            self.play(s.animate.set_value(10.0), run_time=3.0, rate_func=linear)
        for m in (c1, c2, tot):
            m.clear_updaters()
        self.play(*[FadeOut(m) for m in self.mobjects], run_time=0.5)

        # phasor addition
        O = P(-5.6, -1.4)
        u = 0.62
        d = ValueTracker(0.0)

        def tipA():
            return O + 3 * u * RIGHT

        def tipB():
            a = d.get_value()
            return tipA() + 4 * u * np.array([np.cos(a), np.sin(a), 0])

        a1 = vec(O, tipA(), W1_C)
        a2 = always_redraw(lambda: vec(tipA(), tipB(), W2_C))
        res = always_redraw(lambda: vec(O, tipB(), SUM_C, sw=5))
        l1 = M(r"A_1 = 3", 32, color=W1_C).next_to(a1, DOWN, buff=0.15)
        f = M(r"A^2 = A_1^2 + A_2^2 + 2A_1A_2\cos\delta", 46).move_to(P(2.6, 2.6))
        dl = M(r"\delta =", 40).move_to(P(1.4, 1.2))
        dv = DecimalNumber(0, num_decimal_places=0, unit=r"^{\circ}", font_size=40, color=W2_C)
        al = M(r"A =", 40).move_to(P(4.2, 1.2))
        av = DecimalNumber(7, num_decimal_places=1, font_size=40, color=SUM_C)
        dv.add_updater(lambda m: m.set_value(d.get_value() / DEGREES).next_to(dl, RIGHT, buff=0.15))
        av.add_updater(lambda m: m.set_value(np.linalg.norm(tipB() - O) / u).next_to(al, RIGHT, buff=0.15))
        unit = T("(mm)", 24, color=MUTED).move_to(P(5.9, 1.2))
        with self.voiceover("Same frequency waves with a phase difference delta add like arrows, as in chapter zero. Three and "
                            "four millimetres in phase make seven; out of phase, one; at ninety degrees, five.") as vo:
            self.play(Write(f), run_time=1.3)
            self.play(GrowArrow(a1), FadeIn(l1), FadeIn(a2), FadeIn(res), run_time=1.0)
            self.play(FadeIn(dl), FadeIn(dv), FadeIn(al), FadeIn(av), FadeIn(unit), run_time=0.6)
            self.wait(vo.duration * 0.12)
            self.play(d.animate.set_value(PI), run_time=2.2)
            self.wait(0.5)
            self.play(d.animate.set_value(PI / 2), run_time=1.5)
            ra = RightAngle(Line(tipA(), O), Line(tipA(), tipB()), length=0.25, color=INK, stroke_width=3)
            self.play(Create(ra), run_time=0.4)
        dv.clear_updaters()
        av.clear_updaters()
        with self.voiceover("A path difference delta x gives a phase difference of two pi over lambda, times delta x. Intensity "
                            "goes as amplitude squared, so intensities of nine to one mean amplitudes of three to one, and I max "
                            "over I min is four.") as vo:
            keep = [f]
            self.play(*[FadeOut(m) for m in self.mobjects if m not in keep], run_time=0.5)
            g1 = M(r"\delta = \frac{2\pi}{\lambda}\,\Delta x", 50).move_to(P(0, 1.2))
            g2 = M(r"I \propto A^2:\quad 9:1 \;\Rightarrow\; A_1 : A_2 = 3:1", 44).move_to(P(0, -0.2))
            g3 = M(r"\frac{I_{\max}}{I_{\min}} = \left(\frac{3+1}{3-1}\right)^2 = 4", 48, color=GREEN)
            g3.move_to(P(0, -1.9))
            self.play(Write(g1), run_time=1.1)
            self.wait(vo.duration * 0.12)
            self.play(Write(g2), run_time=1.3)
            self.wait(vo.duration * 0.1)
            self.play(Write(g3), run_time=1.3)

    # ------------------------------------------------------------ scene 5: reflection
    def s5(self):
        base = 0.4
        xw = 2.4
        c = ValueTracker(-4.5)
        sgn = ValueTracker(-1.0)

        def inc(x):
            return 1.3 * bump(x - c.get_value(), 0.7)

        def img(x):
            return sgn.get_value() * 1.3 * bump(x - (2 * xw - c.get_value()), 0.7)

        rope = always_redraw(lambda: curve(lambda x: inc(x) + img(x), -6.6, xw, y0=base))
        ghost = always_redraw(lambda: DashedVMobject(curve(lambda x: inc(x) + img(x), xw, 6.6, color=MUTED, sw=3,
                                                           y0=base), num_dashes=40))
        wl = wall(xw, base - 1.6, base + 1.8)
        hdr = T("Fixed end", 32, color=PRIMARY, weight="BOLD").move_to(P(-2.0, 3.1))
        il = T("image pulse (imagined)", 22, color=MUTED).move_to(P(4.6, base - 1.9))
        rule = T("up + down = 0 at the wall, every instant", 26, color=INK).move_to(P(-2.0, -2.4))
        with self.voiceover("A pulse sent to a rope tied to a wall comes back upside down. The end cannot move, so picture an "
                            "inverted image pulse arriving from behind the wall. Up plus down is zero there, every instant.") as vo:
            self.play(FadeIn(hdr), FadeIn(wl), FadeIn(rope), FadeIn(ghost), run_time=0.8)
            self.play(FadeIn(il), run_time=0.4)
            self.play(c.animate.set_value(2 * xw + 4.5), run_time=6.5, rate_func=linear)
            self.play(FadeIn(rule), run_time=0.5)
            ph = M(r"\text{phase change } \pi", 36, color=W1_C).move_to(P(-2.0, -3.1))
            self.play(FadeIn(ph), run_time=0.5)

        with self.voiceover("On a ring that slides on a smooth pole, the end stays flat instead. The image is upright, and so is "
                            "the reflection: no phase change.") as vo:
            pole = Line(P(xw, base - 1.6), P(xw, base + 2.9), color=MUTED, stroke_width=4)
            ring = always_redraw(lambda: Circle(radius=0.12, color=HL_C, stroke_width=4).move_to(
                P(xw, base + inc(xw) + img(xw))))
            hdr2 = T("Free end", 32, color=GREEN, weight="BOLD").move_to(P(-2.0, 3.1))
            self.play(FadeOut(rule), FadeOut(ph), FadeOut(wl), FadeIn(pole), FadeIn(ring),
                      ReplacementTransform(hdr, hdr2), run_time=0.7)
            sgn.set_value(1.0)
            c.set_value(-4.5)
            self.play(c.animate.set_value(2 * xw + 4.5), run_time=5.0, rate_func=linear)
            nop = M(r"\text{no phase change}", 36, color=GREEN).move_to(P(-2.0, -2.6))
            self.play(FadeIn(nop), run_time=0.5)
        rope.clear_updaters()
        ghost.clear_updaters()
        ring.clear_updaters()
        self.play(*[FadeOut(m) for m in self.mobjects], run_time=0.5)

        # junction: mu -> 4 mu
        tau = ValueTracker(0.0)
        v1, v2 = 1.6, 0.8
        r, tr = -1.0 / 3, 2.0 / 3
        start = -4.2
        by = 0.6

        def g(u):
            return 1.4 * bump(u, 0.7)

        def left(x):
            ph = v1 * tau.get_value() + start
            return g(x - ph) + r * g(-x - ph)

        def right(x):
            ph = v1 * tau.get_value() + start
            return tr * g((v1 / v2) * x - ph)

        sl = always_redraw(lambda: curve(left, -6.6, 0.0, sw=3, y0=by))
        sr = always_redraw(lambda: curve(right, 0.0, 6.6, sw=10, color=TR_C, y0=by))
        knot = Dot(P(0, by), radius=0.08, color=INK)
        lm = M(r"\mu", 40).move_to(P(-5.2, by - 0.6))
        rm = M(r"4\mu", 40, color=TR_C).move_to(P(5.2, by - 0.6))
        with self.voiceover("At a junction, part reflects and part goes on. Going from mu into four mu, the speed halves. The "
                            "reflection is one third as tall and inverted; the transmitted pulse is two thirds as tall, with half"
                            " the wavelength.") as vo:
            self.play(FadeIn(sl), FadeIn(sr), FadeIn(knot), FadeIn(lm), FadeIn(rm), run_time=0.8)
            self.play(tau.animate.set_value(5.2), run_time=6.0, rate_func=linear)
            fr = M(r"A_r = \frac{v_2 - v_1}{v_1 + v_2}A_i = -\frac{A_i}{3}", 40, color=W2_C).move_to(P(-3.4, -2.2))
            ft = M(r"A_t = \frac{2v_2}{v_1 + v_2}A_i = \frac{2A_i}{3}", 40, color=TR_C).move_to(P(3.4, -2.2))
            self.play(Write(fr), run_time=1.2)
            self.play(Write(ft), run_time=1.2)
        sl.clear_updaters()
        sr.clear_updaters()

        with self.voiceover("But the frequency never changes. The junction is one point, and it shakes the new string as often as"
                            " the old one shakes it. Speed and wavelength change. Frequency does not.") as vo:
            self.clear_scene(0.5)
            big = T("frequency never changes at a boundary", 36, color=PRIMARY, weight="BOLD").move_to(P(0, 1.4))
            sm = M(r"v \text{ and } \lambda \text{ change:}\quad \frac{\lambda_2}{\lambda_1} = \frac{v_2}{v_1}", 46)
            sm.move_to(P(0, -0.2))
            self.wait(vo.duration * 0.15)
            self.play(FadeIn(big, shift=0.2 * UP), run_time=0.8)
            self.wait(vo.duration * 0.25)
            self.play(Write(sm), run_time=1.3)

    # ------------------------------------------------------------ scene 6: standing waves
    def s6(self):
        base = -0.4
        L = 10.0
        x0 = -5.0
        k = 3 * PI / L
        A = 0.6
        t = ValueTracker(0.0)
        w = 3.0

        def yr(x):
            return A * np.sin(k * (x - x0) - w * t.get_value())

        def yl(x):
            return A * np.sin(k * (x - x0) + w * t.get_value())

        cr = always_redraw(lambda: curve(yr, x0, x0 + L, color=W1_C, sw=3, y0=base))
        cl = always_redraw(lambda: curve(yl, x0, x0 + L, color=W2_C, sw=3, y0=base))
        cs = always_redraw(lambda: curve(lambda x: yr(x) + yl(x), x0, x0 + L, sw=7, y0=base))
        ends = VGroup(Dot(P(x0, base), radius=0.1, color=INK), Dot(P(x0 + L, base), radius=0.1, color=INK))
        eq = M(r"y = A\sin(kx - \omega t) + A\sin(kx + \omega t) = 2A\sin kx\,\cos\omega t", 40)
        fit(eq, 12.6).move_to(P(0, 2.9))
        with self.voiceover("Pluck a guitar string and it shimmers in a fixed blur: two equal waves running opposite ways. Their "
                            "sum is two A sine k x, times cos omega t. Nothing travels.") as vo:
            self.play(FadeIn(cr), FadeIn(cl), FadeIn(ends), run_time=0.8)
            self.play(t.animate.set_value(2.0), run_time=2.0, rate_func=linear)
            self.add(cs)
            self.play(t.animate.set_value(6.0), run_time=3.0, rate_func=linear)
            self.play(Write(eq), run_time=1.5)

        env = VGroup(
            DashedVMobject(curve(lambda x: 2 * A * np.sin(k * (x - x0)), x0, x0 + L, color=MUTED, sw=2, y0=base),
                           num_dashes=60),
            DashedVMobject(curve(lambda x: -2 * A * np.sin(k * (x - x0)), x0, x0 + L, color=MUTED, sw=2, y0=base),
                           num_dashes=60),
        )
        lam2 = L / 3
        nodes = VGroup(*[Dot(P(x0 + i * lam2, base), radius=0.11, color=TR_C) for i in range(4)])
        nl = VGroup(*[M("N", 30, color=TR_C).next_to(nodes[i], DOWN, buff=0.35) for i in range(4)])
        al = VGroup(*[M(r"\text{AN}", 30, color=HL_C).move_to(P(x0 + (i + 0.5) * lam2, base + 2 * A + 0.35))
                      for i in range(3)])
        br = BraceBetweenPoints(P(x0 + lam2, base - 1.55), P(x0 + 2 * lam2, base - 1.55), direction=DOWN,
                                color=TR_C)
        brl = M(r"\lambda/2", 34, color=TR_C).next_to(br, DOWN, buff=0.08)
        with self.voiceover("Where sine k x is zero, the string never moves: nodes, half a wavelength apart. Antinodes sit "
                            "halfway between. Every point in a loop moves together; crossing a node flips the direction.") as vo:
            self.play(FadeOut(cr), FadeOut(cl), run_time=0.5)
            self.play(Create(env), FadeIn(nodes), FadeIn(nl), run_time=1.0)
            self.play(FadeIn(al), run_time=0.6)
            self.play(GrowFromCenter(br), FadeIn(brl), run_time=0.7)
            self.play(t.animate.set_value(6.0 + 2 * TAU / w), run_time=max(1.0, vo.duration - 3.3),
                      rate_func=linear)
        cs.clear_updaters()
        cr.clear_updaters()
        cl.clear_updaters()

        # harmonics
        with self.voiceover("Fixed ends must be nodes, so only whole loops fit: L equals n lambda over two, and f n equals n v "
                            "over two L, whole number multiples of the fundamental. With one end fixed and one free, the free end "
                            "must be an antinode, which allows only the odd harmonics.") as vo:
            self.clear_scene(0.5)
            tt = ValueTracker(0.0)
            xa, Ls = -6.2, 5.4
            rows = []
            ys = [2.5, 1.0, -0.5]
            grp = VGroup()
            for n, yy in zip((1, 2, 3), ys):
                cv = always_redraw(lambda n=n, yy=yy: curve(
                    lambda x: 0.5 * np.sin(n * PI * (x - xa) / Ls) * np.cos(n * 2.2 * tt.get_value()),
                    xa, xa + Ls, y0=yy))
                pins = VGroup(Dot(P(xa, yy), radius=0.08, color=INK), Dot(P(xa + Ls, yy), radius=0.08, color=INK))
                lab = M(rf"n = {n}", 32).move_to(P(xa + Ls + 0.75, yy))
                rows.append(cv)
                grp.add(cv, pins, lab)
            yf = -2.4
            cvf = always_redraw(lambda: curve(
                lambda x: 0.5 * np.sin(0.5 * PI * (x - xa) / Ls) * np.cos(1.1 * tt.get_value()),
                xa, xa + Ls, color=TR_C, y0=yf))
            pinf = Dot(P(xa, yf), radius=0.08, color=INK)
            ringf = Line(P(xa + Ls, yf - 0.7), P(xa + Ls, yf + 0.7), color=MUTED, stroke_width=3)
            labf = T("one end fixed, one free", 22, color=TR_C).move_to(P(xa + Ls / 2, yf - 0.85))
            f1 = M(r"L = n\,\frac{\lambda}{2}", 44).move_to(P(3.9, 2.2))
            f2 = M(r"f_n = \frac{n v}{2L}", 48, color=PRIMARY).move_to(P(3.9, 0.8))
            f3 = M(r"f = \frac{(2n-1)\,v}{4L}", 44, color=TR_C).move_to(P(3.9, -1.4))
            f3n = T("odd harmonics only", 24, color=TR_C).next_to(f3, DOWN, buff=0.2)
            self.play(FadeIn(grp), run_time=0.8)
            self.play(tt.animate.set_value(3.0), Write(f1), run_time=3.0, rate_func=linear)
            self.play(tt.animate.set_value(5.0), Write(f2), run_time=2.0, rate_func=linear)
            self.play(FadeIn(cvf), FadeIn(pinf), Create(ringf), FadeIn(labf), run_time=0.6)
            self.play(tt.animate.increment_value(1.5), Write(f3), FadeIn(f3n), run_time=1.5, rate_func=linear)
            rem = max(0.5, vo.duration - 8.4)
            self.play(tt.animate.increment_value(rem), run_time=rem, rate_func=linear)
            for m in rows + [cvf]:
                m.clear_updaters()

        with self.voiceover("Resonances at four hundred and twenty and four hundred and ninety hertz, with none between, differ "
                            "by the fundamental: seventy hertz. And the second overtone is the third harmonic.") as vo:
            self.clear_scene(0.5)
            g1 = M(r"420\ \text{Hz},\ 490\ \text{Hz},\ \text{nothing between}", 46).move_to(P(0, 2.3))
            g2 = M(r"f_1 = 490 - 420 = 70\ \text{Hz}", 50, color=GREEN).move_to(P(0, 1.0))
            g3 = M(r"420 = 6\times70,\qquad 490 = 7\times70", 44).move_to(P(0, -0.2))
            g4 = M(r"\text{2nd overtone} = \text{3rd harmonic}", 44, color=PRIMARY).move_to(P(0, -2.0))
            self.play(Write(g1), run_time=1.3)
            self.wait(vo.duration * 0.1)
            self.play(Write(g2), run_time=1.2)
            self.play(Write(g3), run_time=1.2)
            self.wait(vo.duration * 0.12)
            self.play(Write(g4), run_time=1.2)

    # ------------------------------------------------------------ scene 7: recap
    def s7(self):
        title = T("Chapter 1 in six lines", 38, color=PRIMARY, weight="BOLD").move_to(P(0, 3.2))
        lines = [
            (r"y = f(x \mp vt)", "a shape and energy move; matter stays"),
            (r"y = A\sin(kx-\omega t),\ v = \frac{\omega}{k} = f\lambda", "opposite signs: moves to +x"),
            (r"v = \sqrt{T/\mu}", "stiffness over inertia"),
            (r"A^2 = A_1^2 + A_2^2 + 2A_1A_2\cos\delta", "superposition; I ∝ A²"),
            (r"\text{fixed end: phase } \pi", "frequency never changes"),
            (r"2A\sin kx\cos\omega t,\ f_n = \frac{nv}{2L}", "boundaries pick the harmonics"),
        ]
        rows = VGroup()
        for i, (tex, note) in enumerate(lines):
            m = fit(M(tex, 36), 6.4)
            n = T(note, 24, color=MUTED)
            num = T(f"{i + 1}.", 28, color=PRIMARY, weight="BOLD")
            rows.add(VGroup(num, m, n))
        for r in rows:
            r[0].move_to(P(-6.3, 0))
            r[1].next_to(r[0], RIGHT, buff=0.3)
        rows.arrange(DOWN, buff=0.3, aligned_edge=LEFT).move_to(P(0, -0.15))
        for r in rows:
            r[0].move_to(P(-6.3, r[1].get_y()))
            r[1].next_to(r[0], RIGHT, buff=0.3)
            fit(r[2], 5.0)
            r[2].move_to(P(0, r[1].get_y())).align_to(P(1.6, 0, ), LEFT)
        with self.voiceover("To recap. A wave moves a shape and energy, not matter. The sine wave has v equals f lambda, and on a"
                            " string, v is root T over mu.") as vo:
            self.play(FadeIn(title), run_time=0.6)
            self.play(FadeIn(rows[0], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(rows[1], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(rows[2], shift=0.15 * UP), run_time=0.7)
        with self.voiceover("Waves add point by point, like arrows at one frequency. A fixed end inverts the reflection, "
                            "frequency never changes, and boundaries pick the standing wave harmonics.") as vo:
            self.play(FadeIn(rows[3], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(rows[4], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(rows[5], shift=0.15 * UP), run_time=0.7)
        with self.voiceover("Try the mastery quiz. Then chapter two swaps the string for air: sound, organ pipes, beats, and the "
                            "Doppler effect.") as vo:
            nxt = T("Next: Chapter 2 · Sound Waves", 32, color=PRIMARY).move_to(P(0, -3.45))
            self.wait(vo.duration * 0.3)
            self.play(FadeIn(nxt, shift=0.2 * UP), run_time=0.8)
