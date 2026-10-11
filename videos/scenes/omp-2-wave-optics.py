import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

# Chapter colour roles (light background).
RAY_C = PRIMARY  # rays, wave 1
FRONT_C = SECONDARY  # wavefronts, wave 2
PATH_C = ACCENT  # path difference
SUM_C = PURPLE  # resultant / slab / film path
HL = ManimColor("#D19A00")  # highlight gold
WARN = PRIMARY
DARK = ManimColor("#2A1A18")  # dark fringe
LIGHT = ManimColor("#FF6B5A")  # bright fringe (red light)
GLASS = ManimColor("#CFE6EA")  # glass / water fill
FILM = ManimColor("#F6D9A8")  # thin film fill

# `say` reads a lone "a" as the article; spell it as a letter where it matters.
LA = "[[char LTRL]]a[[char NORM]]"


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


def ray(start, end, color=RAY_C, sw=4):
    return Arrow(start, end, buff=0, color=color, stroke_width=sw, tip_length=0.2,
                 max_tip_length_to_length_ratio=0.25, max_stroke_width_to_length_ratio=12)


def check():
    return MathTex(r"\checkmark", color=GREEN, font_size=56)


def cross_mark():
    return MathTex(r"\times", color=WARN, font_size=64)


def P(x, y):
    return np.array([x, y, 0.0])


def boxed(mob, color=PRIMARY):
    return SurroundingRectangle(mob, buff=0.2, corner_radius=0.12, color=color, stroke_width=3)


def sinc2(u):
    u = np.asarray(u, dtype=float)
    out = np.ones_like(u)
    nz = np.abs(u) > 1e-9
    out[nz] = (np.sin(np.pi * u[nz]) / (np.pi * u[nz])) ** 2
    return out


def hband(fn, x0, x1, yc, h, n=200):
    """Horizontal strip of fringes; fn(scene_x) gives brightness in [0, 1]."""
    g = VGroup()
    dx = (x1 - x0) / n
    for k in range(n):
        x = x0 + (k + 0.5) * dx
        b = float(np.clip(fn(x), 0, 1))
        r = Rectangle(width=dx * 1.05, height=h, stroke_width=0)
        r.set_fill(interpolate_color(DARK, LIGHT, b), 1).move_to(P(x, yc))
        g.add(r)
    return g


def vband(fn, y0, y1, xc, w, n=160):
    """Vertical strip of fringes on a screen; fn(scene_y) gives brightness in [0, 1]."""
    g = VGroup()
    dy = (y1 - y0) / n
    for k in range(n):
        y = y0 + (k + 0.5) * dy
        b = float(np.clip(fn(y), 0, 1))
        r = Rectangle(width=w, height=dy * 1.05, stroke_width=0)
        r.set_fill(interpolate_color(DARK, LIGHT, b), 1).move_to(P(xc, y))
        g.add(r)
    return g


def polaroid(center, angle=0.0, r=0.72):
    """A round polaroid seen face-on; chords show the pass axis (angle from vertical)."""
    disk = Circle(radius=r, color=INK, stroke_width=3).set_fill(ManimColor("#EDE4DE"), 1).move_to(center)
    chords = VGroup()
    for o in (-0.44, -0.22, 0.0, 0.22, 0.44):
        half = np.sqrt(max(r * r - o * o, 0)) * 0.92
        chords.add(Line(P(o, -half), P(o, half), color=MUTED, stroke_width=2.5))
    chords.move_to(center).rotate(-angle, about_point=center)
    return VGroup(disk, chords)


def efield(center, angle=0.0, length=1.4, color=ACCENT):
    d = np.array([np.sin(angle), np.cos(angle), 0.0]) * length / 2
    return DoubleArrow(center - d, center + d, buff=0, color=color, stroke_width=5, tip_length=0.18,
                       max_tip_length_to_length_ratio=0.3)


class OmpCh2Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Optics and Modern Physics",
            "Chapter 2 · Wave Optics",
            "Chapter two. Wave optics.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7, self.s8):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ scene 1: wavefronts and Huygens
    def s1(self):
        hdr = T("A ray is a normal to the wavefronts", 34, color=PRIMARY, weight="BOLD").move_to(P(0, 3.3))
        S = P(-5.6, -0.1)
        src = Dot(S, color=INK, radius=0.09)
        arcs = VGroup(*[Arc(radius=r, start_angle=-50 * DEGREES, angle=100 * DEGREES, arc_center=S,
                            color=FRONT_C, stroke_width=4) for r in (0.8, 1.55, 2.3, 3.05)])
        rays = VGroup(*[ray(S, S + 3.5 * np.array([np.cos(a), np.sin(a), 0]))
                        for a in (-34 * DEGREES, 0, 34 * DEGREES)])
        pt = S + 2.3 * RIGHT
        ra = RightAngle(Line(pt, pt + RIGHT), Line(pt, pt + UP), length=0.22, color=INK, stroke_width=3)
        wf_l = T("wavefronts (crests)", 24, color=FRONT_C).move_to(P(-3.2, 2.75))
        ray_l = T("rays", 24, color=RAY_C).next_to(rays[0].get_end(), RIGHT, buff=0.15)
        src_l = T("point source", 22, color=MUTED).move_to(S + P(-0.25, -0.75))
        cap1 = T("spherical", 28, color=INK).move_to(P(-4.0, -3.25))

        with self.voiceover("In chapter zero, rays and two laws did everything. But a ray is only a shorthand: the direction"
                            " at right angles to the crests of a light wave. A surface of crests is a wavefront.") as vo:
            self.play(FadeIn(hdr), FadeIn(src), FadeIn(src_l), run_time=0.8)
            self.play(LaggedStart(*[Create(a) for a in arcs], lag_ratio=0.3), FadeIn(wf_l), run_time=1.6)
            self.wait(vo.duration * 0.15)
            self.play(LaggedStart(*[GrowArrow(r) for r in rays], lag_ratio=0.2), FadeIn(ray_l), run_time=1.2)
            self.play(Create(ra), run_time=0.5)

        div = DashedLine(P(-0.2, 2.6), P(-0.2, -3.5), color=GRID, stroke_width=3)
        fronts = VGroup(*[Line(P(x, -2.3), P(x, 2.3), color=FRONT_C, stroke_width=4)
                          for x in (1.4, 2.3, 3.2, 4.1, 5.0)])
        prays = VGroup(*[ray(P(0.8, y), P(6.2, y)) for y in (-1.5, 0, 1.5)])
        cap2 = T("plane (far from the source)", 28, color=INK).move_to(P(3.5, -3.25))
        with self.voiceover("A point source sends out spherical wavefronts. Far from the source, a small patch "
                            "looks flat: a plane wavefront, with parallel rays.") as vo:
            self.play(FadeIn(cap1), Create(div), run_time=0.7)
            self.wait(vo.duration * 0.2)
            self.play(LaggedStart(*[Create(f) for f in fronts], lag_ratio=0.15), run_time=1.2)
            self.play(LaggedStart(*[GrowArrow(r) for r in prays], lag_ratio=0.2), FadeIn(cap2), run_time=1.0)

        with self.voiceover("Huygens' rule moves a wavefront forward: every point on it is a source of small wavelets, "
                            "spreading at the wave's speed. After a time t, each has radius v t, and the new wavefront is "
                            "the envelope touching them all.") as vo:
            self.clear_scene(0.5)
            hdr2 = T("Huygens: every point is a source of wavelets", 32, color=PRIMARY, weight="BOLD")
            hdr2.move_to(P(0, 3.5))
            x0 = -4.2
            R = 1.8
            ys = np.linspace(-1.5, 1.5, 7)
            front = Line(P(x0, -2.0), P(x0, 2.0), color=RAY_C, stroke_width=5)
            dots = VGroup(*[Dot(P(x0, y), radius=0.07, color=RAY_C) for y in ys])
            rt = ValueTracker(0.02)
            wl = always_redraw(lambda: VGroup(*[
                Arc(radius=rt.get_value(), start_angle=-PI / 3, angle=2 * PI / 3, arc_center=P(x0, y),
                    color=MUTED, stroke_width=2.5) for y in ys]))
            old_l = T("old wavefront", 24, color=RAY_C).move_to(P(x0 - 0.4, -3.4))
            self.play(FadeIn(hdr2), Create(front), run_time=0.8)
            self.play(LaggedStart(*[FadeIn(d, scale=0.5) for d in dots], lag_ratio=0.1), FadeIn(old_l),
                      run_time=0.8)
            self.add(wl)
            self.play(rt.animate.set_value(R), run_time=2.6, rate_func=linear)
            wl.clear_updaters()
            ang = 30 * DEGREES
            rad = vec(P(x0, ys[3]), P(x0, ys[3]) + R * np.array([np.cos(ang), np.sin(ang), 0]), INK, sw=3)
            vt = M(r"vt", 34).next_to(rad.get_center(), UP, buff=0.12)
            self.play(GrowArrow(rad), FadeIn(vt), run_time=0.7)
            env = Line(P(x0 + R, -2.0), P(x0 + R, 2.0), color=FRONT_C, stroke_width=6)
            env_l = T("new wavefront = envelope", 24, color=FRONT_C).move_to(P(-1.2, -3.4))
            self.play(Create(env), FadeIn(env_l), run_time=1.0)
            notes = VGroup(
                T("each wavelet: radius vt", 26, color=INK),
                T("new wavefront touches them all", 26, color=INK),
                T("rays stay perpendicular to it", 26, color=MUTED),
            ).arrange(DOWN, buff=0.35, aligned_edge=LEFT).move_to(P(3.9, 0.3))
            self.play(LaggedStart(*[FadeIn(n, shift=0.15 * UP) for n in notes], lag_ratio=0.4), run_time=1.6)

    # ------------------------------------------------------------ scene 2: Snell's law from Huygens
    def s2(self):
        yb = -0.5
        A = P(-5.0, yb)
        C = P(-1.0, yb)
        i = 50 * DEGREES
        B = A + 4 * np.cos(i) * np.array([np.cos(i), np.sin(i), 0])
        BC = np.linalg.norm(C - B)
        AD = BC / 1.5
        r = np.arcsin(AD / 4)
        D = A + AD * np.array([np.sin(r), -np.cos(r), 0])
        u = (C - B) / BC

        med2 = Rectangle(width=8.0, height=2.9, stroke_width=0).set_fill(GLASS, 0.7).move_to(P(-2.8, yb - 1.45))
        bound = Line(P(-6.8, yb), P(1.2, yb), color=INK, stroke_width=3)
        m1 = M(r"\text{fast: } v_1", 30, color=MUTED).move_to(P(0.3, 0.6))
        m2 = M(r"\text{slow: } v_2", 30, color=MUTED).move_to(P(0.3, -3.0))
        ab = Line(A, B, color=FRONT_C, stroke_width=6)
        in1 = ray(A - 1.5 * u, A)
        in2 = ray(B - 1.3 * u, B)
        lA = M("A", 32).next_to(A, DL, buff=0.1)
        lB = M("B", 32).next_to(B, UP, buff=0.12)
        lC = M("C", 32).next_to(C, DR, buff=0.1)
        lD = M("D", 32).next_to(D, DOWN, buff=0.12)
        arc_i = Arc(radius=0.6, start_angle=0, angle=i, arc_center=A, color=INK, stroke_width=3)
        li = M("i", 30).move_to(A + 0.88 * np.array([np.cos(i / 2), np.sin(i / 2), 0]))

        s = ValueTracker(0.0)
        mover = always_redraw(lambda: Dot(B + s.get_value() * BC * u, radius=0.07, color=RAY_C))
        trail = always_redraw(lambda: DashedLine(B, B + max(s.get_value(), 0.01) * BC * u, color=RAY_C,
                                                 stroke_width=4))
        wavelet = always_redraw(lambda: Arc(radius=max(AD * s.get_value(), 0.01), start_angle=210 * DEGREES,
                                            angle=120 * DEGREES,
                                            arc_center=A, color=MUTED, stroke_width=3))
        with self.voiceover("Now send a plane wavefront at a boundary where the wave slows down. End A touches "
                            "the surface first. While end B travels the distance v one t to reach C, the wavelet "
                            "from A grows only v two t into the slower medium.") as vo:
            self.play(FadeIn(med2), Create(bound), FadeIn(m1), FadeIn(m2), run_time=0.8)
            self.play(GrowArrow(in1), GrowArrow(in2), Create(ab), FadeIn(lA), FadeIn(lB), run_time=1.0)
            self.play(Create(arc_i), FadeIn(li), run_time=0.5)
            self.wait(vo.duration * 0.15)
            self.add(trail, wavelet, mover)
            self.play(s.animate.set_value(1.0), run_time=3.0, rate_func=linear)
            for m in (trail, wavelet, mover):
                m.clear_updaters()
            l1 = M(r"v_1t", 32, color=RAY_C).next_to((B + C) / 2, UR, buff=0.08)
            ad = DashedLine(A, D, color=RAY_C, stroke_width=4)
            l2 = M(r"v_2t", 32, color=RAY_C).next_to((A + D) / 2, LEFT, buff=0.15)
            self.play(FadeIn(lC), FadeIn(l1), Create(ad), FadeIn(l2), run_time=0.8)

        cd = Line(C, D, color=FRONT_C, stroke_width=6)
        ra = RightAngle(Line(D, A), Line(D, C), length=0.2, color=INK, stroke_width=2.5)
        arc_r = Arc(radius=0.75, start_angle=PI, angle=r, arc_center=C, color=INK, stroke_width=3)
        lr = M("r", 30).move_to(C + 1.05 * np.array([np.cos(PI + r / 2), np.sin(PI + r / 2), 0]))
        e1 = M(r"\sin i = \frac{BC}{AC} = \frac{v_1t}{AC}", 40).move_to(P(3.8, 2.5))
        e2 = M(r"\sin r = \frac{AD}{AC} = \frac{v_2t}{AC}", 40).move_to(P(3.8, 1.0))
        e3 = M(r"\frac{\sin i}{\sin r} = \frac{v_1}{v_2} = \frac{n_2}{n_1}", 50).move_to(P(3.8, -0.75))
        b3 = boxed(e3)
        e4 = M(r"n_1\sin i = n_2\sin r", 40, color=GREEN).move_to(P(3.8, -2.45))
        e4n = T("Snell's law, from waves", 24, color=GREEN).next_to(e4, DOWN, buff=0.2)
        with self.voiceover("The new wavefront is the tangent from C to that wavelet. The two right triangles share "
                            "the hypotenuse A C. So sine i over sine r equals v one over v two. That is Snell's "
                            "law, derived from waves.") as vo:
            self.play(Create(cd), FadeIn(lD), Create(ra), run_time=1.0)
            self.play(Create(arc_r), FadeIn(lr), run_time=0.5)
            self.play(Write(e1), run_time=1.2)
            self.play(Write(e2), run_time=1.2)
            self.play(Write(e3), Create(b3), run_time=1.3)
            self.play(FadeIn(e4), FadeIn(e4n), run_time=0.7)

        with self.voiceover("No crests are created or lost at the boundary, so the frequency stays fixed. Speed and "
                            "wavelength both shrink by n. Six hundred nanometre light in glass of index one point five slows"
                            " to two times ten to the eight metres per second, and its wavelength becomes four hundred "
                            "nanometres. Same colour, because colour follows frequency.") as vo:
            self.clear_scene(0.5)
            yc, amp, l1w, l2w = 0.7, 0.75, 2.4, 1.6
            ph = ValueTracker(0.0)

            def f(x):
                p = ph.get_value()
                if x <= 0:
                    return yc + amp * np.sin(2 * PI * x / l1w + PI / 2 - p)
                return yc + amp * np.sin(PI / 2 + 2 * PI * x / l2w - p)

            glass = Rectangle(width=6.6, height=3.6, stroke_width=0).set_fill(GLASS, 0.8).move_to(P(3.3, yc + 0.2))
            wave = always_redraw(lambda: FunctionGraph(f, x_range=[-6.4, 6.4, 0.02], color=RAY_C, stroke_width=5))
            air_l = T("air", 28, color=MUTED).move_to(P(-3.2, 2.35))
            gl_l = M(r"\text{glass, } n = 1.5", 34, color=MUTED).move_to(P(3.3, 2.35))
            # crests at phase 0: air x = -2.4k, glass x = 1.6k
            arr1 = DoubleArrow(P(-4.8, -0.4), P(-2.4, -0.4), buff=0, color=INK, stroke_width=3, tip_length=0.15)
            arr2 = DoubleArrow(P(1.6, -0.4), P(3.2, -0.4), buff=0, color=INK, stroke_width=3, tip_length=0.15)
            lam1 = M(r"\lambda = 600\text{ nm}", 34).next_to(arr1, DOWN, buff=0.15)
            lam2 = M(r"\lambda/n = 400\text{ nm}", 34).next_to(arr2, DOWN, buff=0.15)
            nu = M(r"\nu = 5\times10^{14}\text{ Hz in both}", 36).move_to(P(-3.3, -2.2))
            v2 = M(r"v = \frac{c}{n} = 2\times10^{8}\text{ m/s}", 36).move_to(P(3.3, -2.2))
            col = T("same frequency, so the same colour", 28, color=GREEN).move_to(P(0, -3.3))
            self.play(FadeIn(glass), FadeIn(air_l), FadeIn(gl_l), run_time=0.6)
            self.add(wave)
            self.play(ph.animate.set_value(2 * PI), run_time=2.0, rate_func=linear)
            self.play(FadeIn(nu), run_time=0.6)
            self.play(ph.animate.set_value(4 * PI), run_time=2.0, rate_func=linear)
            self.play(GrowFromCenter(arr1), FadeIn(lam1), run_time=0.7)
            self.play(FadeIn(v2), run_time=0.6)
            self.play(GrowFromCenter(arr2), FadeIn(lam2), run_time=0.7)
            self.wait(vo.duration * 0.12)
            self.play(FadeIn(col, shift=0.15 * UP), run_time=0.7)
            wave.clear_updaters()

    # ------------------------------------------------------------ scene 3: superposition and coherence
    def s3(self):
        k = 2 * PI / 2.4
        ph = ValueTracker(0.0)
        x0, x1 = -6.2, 1.6
        base = VGroup(*[DashedLine(P(x0, y), P(x1, y), color=GRID, stroke_width=2) for y in (2.5, 0.9, -1.6)])
        w1 = FunctionGraph(lambda x: 2.5 + 0.6 * np.sin(k * x), x_range=[x0, x1, 0.02], color=RAY_C,
                           stroke_width=4)
        w2 = always_redraw(lambda: FunctionGraph(lambda x: 0.9 + 0.6 * np.sin(k * x + ph.get_value()),
                                                 x_range=[x0, x1, 0.02], color=FRONT_C, stroke_width=4))
        ws = always_redraw(lambda: FunctionGraph(
            lambda x: -1.6 + 0.6 * np.sin(k * x) + 0.6 * np.sin(k * x + ph.get_value()),
            x_range=[x0, x1, 0.02], color=SUM_C, stroke_width=5))
        l1 = M(r"y_1", 34, color=RAY_C).move_to(P(2.1, 2.5))
        l2 = M(r"y_2", 34, color=FRONT_C).move_to(P(2.1, 0.9))
        l3 = M(r"y_1 + y_2", 34, color=SUM_C).move_to(P(2.4, -1.6))
        phl = M(r"\phi =", 40).move_to(P(4.2, 2.3))
        phv = DecimalNumber(0, num_decimal_places=0, unit=r"^{\circ}", font_size=40, color=INK)
        phv.add_updater(lambda m: m.set_value(ph.get_value() / DEGREES).next_to(phl, RIGHT, buff=0.15))
        st1 = T("in step:\namplitude doubles", 26, color=GREEN).move_to(P(4.8, 0.6))
        st2 = T("crest meets trough:\nequal waves cancel", 26, color=WARN).move_to(P(4.8, -1.0))
        with self.voiceover("When two waves overlap, their displacements add. In step, crest meets crest and the "
                            "amplitude doubles. Shift one by half a wavelength, and crest meets trough. Equal waves "
                            "cancel completely.") as vo:
            self.play(FadeIn(base), Create(w1), FadeIn(l1), run_time=0.8)
            self.play(FadeIn(w2), FadeIn(l2), run_time=0.6)
            self.play(FadeIn(ws), FadeIn(l3), FadeIn(phl), FadeIn(phv), run_time=0.8)
            self.play(FadeIn(st1), run_time=0.5)
            self.wait(vo.duration * 0.15)
            self.play(ph.animate.set_value(PI), st1.animate.set_opacity(0.3), run_time=2.5)
            self.play(FadeIn(st2), run_time=0.5)
        for m in (w2, ws, phv):
            m.clear_updaters()

        with self.voiceover("For any phase difference phi, the amplitudes add like the sides of a triangle. Square "
                            "them to get intensities: I equals I one plus I two, plus two root I one I two, cos phi. "
                            "And phi comes from path difference: two pi over lambda, times delta x.") as vo:
            self.clear_scene(0.5)
            O = P(-6.0, -1.8)
            phi = 60 * DEGREES
            a1e = O + 2.6 * RIGHT
            a2e = a1e + 1.8 * np.array([np.cos(phi), np.sin(phi), 0])
            va1 = vec(O, a1e, RAY_C)
            va2 = vec(a1e, a2e, FRONT_C)
            vr = vec(O, a2e, SUM_C)
            ext = DashedLine(a1e, a1e + 1.2 * RIGHT, color=MUTED, stroke_width=2.5)
            arc = Arc(radius=0.5, start_angle=0, angle=phi, arc_center=a1e, color=INK, stroke_width=3)
            lph = M(r"\phi", 30).move_to(a1e + 0.75 * np.array([np.cos(phi / 2), np.sin(phi / 2), 0]))
            la1 = M(r"a_1", 34, color=RAY_C).next_to(va1, DOWN, buff=0.15)
            la2 = M(r"a_2", 34, color=FRONT_C).next_to(va2.get_center(), RIGHT, buff=0.15)
            lr = M(r"A", 34, color=SUM_C).next_to(vr.get_center(), UL, buff=0.1)
            self.play(GrowArrow(va1), FadeIn(la1), run_time=0.7)
            self.play(GrowArrow(va2), FadeIn(la2), Create(ext), Create(arc), FadeIn(lph), run_time=0.8)
            self.play(GrowArrow(vr), FadeIn(lr), run_time=0.7)
            e1 = M(r"A^2 = a_1^2 + a_2^2 + 2a_1a_2\cos\phi", 42).move_to(P(2.6, 2.5))
            e1n = M(r"I \propto A^2", 32, color=MUTED).move_to(P(2.6, 1.6))
            e2 = M(r"I = I_1 + I_2 + 2\sqrt{I_1I_2}\,\cos\phi", 44).move_to(P(2.6, 0.7))
            e3 = M(r"\phi = \frac{2\pi}{\lambda}\,\Delta x", 50, color=PRIMARY).move_to(P(2.6, -1.2))
            b3 = boxed(e3)
            self.play(Write(e1), run_time=1.3)
            self.play(FadeIn(e1n), run_time=0.4)
            self.play(Write(e2), run_time=1.5)
            self.wait(vo.duration * 0.15)
            self.play(Write(e3), Create(b3), run_time=1.2)

        ax = Axes(x_range=[0, 4 * PI, PI], y_range=[0, 4.5, 1], x_length=10.5, y_length=3.6, tips=False,
                  axis_config={"color": MUTED, "stroke_width": 2}).move_to(P(0.3, -0.5))
        curve = ax.plot(lambda x: 2 + 2 * np.cos(x), x_range=[0, 4 * PI, 0.02], color=SUM_C, stroke_width=5)
        avg = DashedLine(ax.c2p(0, 2), ax.c2p(4 * PI, 2), color=GREEN, stroke_width=3)
        xt = VGroup(*[M(s, 30, color=MUTED).next_to(ax.c2p(k_ * PI, 0), DOWN, buff=0.18)
                      for k_, s in enumerate(["0", r"\pi", r"2\pi", r"3\pi", r"4\pi"])])
        xl = M(r"\phi", 34).next_to(ax.c2p(4 * PI, 0), RIGHT, buff=0.2)
        yt = VGroup(M(r"4I_0", 30).next_to(ax.c2p(0, 4), LEFT, buff=0.15),
                    M(r"2I_0", 30, color=GREEN).next_to(ax.c2p(0, 2), LEFT, buff=0.15),
                    M(r"0", 30).next_to(ax.c2p(0, 0), LEFT, buff=0.15))
        top = M(r"I_1 = I_2 = I_0:\quad I = 4I_0\cos^2\tfrac{\phi}{2}", 42).move_to(P(0, 3.1))
        note = M(r"\text{average } 2I_0\text{: energy is moved, not destroyed}", 36, color=GREEN).move_to(P(0, -3.35))
        with self.voiceover("With two equal sources, bright places get four I nought and dark places get zero. The average "
                            "is still two I nought: energy is not destroyed at a dark fringe, only moved to the bright ones.") as vo:
            self.clear_scene(0.5)
            self.play(FadeIn(top), Create(ax), FadeIn(xt), FadeIn(xl), run_time=1.0)
            self.play(Create(curve), FadeIn(yt[0]), FadeIn(yt[2]), run_time=1.5)
            self.wait(vo.duration * 0.15)
            self.play(Create(avg), FadeIn(yt[1]), run_time=0.8)
            self.play(FadeIn(note, shift=0.15 * UP), run_time=0.7)

        rng = np.random.default_rng(7)
        jt = ValueTracker(0.0)
        jitter = always_redraw(lambda: ax.plot(lambda x: 2 + 2 * np.cos(x + jt.get_value()),
                                               x_range=[0, 4 * PI, 0.04], color=SUM_C, stroke_width=4))
        torch = M(r"\text{two torches: } \phi \text{ jumps } \sim 10^8 \text{ times a second}", 36)
        torch.move_to(P(0, 3.1))
        flat = Line(ax.c2p(0, 2), ax.c2p(4 * PI, 2), color=INK, stroke_width=6)
        flat_l = M(r"I_1 + I_2", 32).next_to(ax.c2p(4 * PI, 2), UP, buff=0.15).shift(0.4 * LEFT)
        coh = T("fringes need coherent sources: split one source in two", 28, color=GREEN).move_to(P(0, -3.35))
        with self.voiceover("So why do two torches make no stripes? Their phase difference jumps about a hundred million "
                            "times a second, and cos phi averages to zero. Fringes need coherent sources, so you split one "
                            "source in two.") as vo:
            self.play(FadeOut(top), FadeOut(note), FadeOut(curve), FadeIn(torch), run_time=0.6)
            self.add(jt, jitter)
            jt.add_updater(lambda m, dt: m.set_value(rng.uniform(0, 2 * PI)))
            self.wait(min(3.0, vo.duration * 0.35))
            jt.clear_updaters()
            self.remove(jt)
            jitter.clear_updaters()
            self.play(FadeOut(jitter), FadeOut(avg), Create(flat), FadeIn(flat_l), run_time=0.8)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(coh, shift=0.15 * UP), run_time=0.7)

    # ------------------------------------------------------------ scene 4: Young's double slit
    def s4(self):
        xs, xb, xsc = -6.4, -4.6, 0.8
        d = 1.4
        S1, S2 = P(xb, d / 2), P(xb, -d / 2)
        Pp, O = P(xsc, 2.0), P(xsc, 0)
        gap = 0.16
        barrier = VGroup(
            Line(P(xb, -2.9), P(xb, -d / 2 - gap), color=INK, stroke_width=6),
            Line(P(xb, -d / 2 + gap), P(xb, d / 2 - gap), color=INK, stroke_width=6),
            Line(P(xb, d / 2 + gap), P(xb, 2.9), color=INK, stroke_width=6),
        )
        sbar = VGroup(Line(P(xs, -1.6), P(xs, -gap), color=INK, stroke_width=6),
                      Line(P(xs, gap), P(xs, 1.6), color=INK, stroke_width=6))
        screen = Line(P(xsc, -2.9), P(xsc, 2.9), color=MUTED, stroke_width=8)
        src_arcs = VGroup(*[Arc(radius=r, start_angle=-55 * DEGREES, angle=110 * DEGREES, arc_center=P(xs, 0),
                                color=FRONT_C, stroke_width=3) for r in (0.45, 0.9, 1.35)])
        slit_arcs = VGroup(*[Arc(radius=r, start_angle=-50 * DEGREES, angle=100 * DEGREES, arc_center=c,
                                 color=FRONT_C, stroke_width=2, stroke_opacity=0.6)
                             for c in (S1, S2) for r in (0.6, 1.2, 1.8, 2.4, 3.0)])
        lS1 = M(r"S_1", 32).move_to(P(-5.0, 1.15))
        lS2 = M(r"S_2", 32).move_to(P(-5.0, -1.15))
        with self.voiceover("Thomas Young did exactly that. Light from one slit falls on two slits, S one and S two, a "
                            "distance d apart. A screen stands a distance D away, much larger than d.") as vo:
            self.play(Create(sbar), Create(barrier), Create(screen), run_time=1.0)
            self.play(LaggedStart(*[Create(a) for a in src_arcs], lag_ratio=0.3), run_time=1.0)
            self.play(FadeIn(lS1), FadeIn(lS2), run_time=0.5)
            self.play(LaggedStart(*[Create(a) for a in slit_arcs], lag_ratio=0.05), run_time=2.0)
            dbr = Brace(Line(S2, S1), LEFT, buff=0.12, color=INK)
            dl = M("d", 32).next_to(dbr, LEFT, buff=0.1)
            Dar = DoubleArrow(P(xb, -3.2), P(xsc, -3.2), buff=0, color=INK, stroke_width=3, tip_length=0.15)
            Dl = M("D", 32).next_to(Dar, UP, buff=0.1)
            self.play(FadeOut(src_arcs), FadeIn(dbr), FadeIn(dl), run_time=0.6)
            self.play(GrowFromCenter(Dar), FadeIn(Dl), run_time=0.6)

        uvec = (Pp - S2) / np.linalg.norm(Pp - S2)
        N = S2 + np.dot(S1 - S2, uvec) * uvec
        lineA = Line(S1, Pp, color=RAY_C, stroke_width=4)
        lineB = Line(S2, Pp, color=FRONT_C, stroke_width=4)
        pd = Line(S2, N, color=PATH_C, stroke_width=10)
        perp = DashedLine(S1, N, color=MUTED, stroke_width=2.5)
        pdl = M(r"\Delta x", 30, color=PATH_C).move_to(P(-3.85, -1.0))
        pdr = Line(pdl.get_left() + 0.05 * LEFT, (S2 + N) / 2, color=PATH_C, stroke_width=2)
        Pd = Dot(Pp, color=INK, radius=0.08)
        lP = M("P", 32).next_to(Pp, UR, buff=0.08)
        lO = M("O", 32).next_to(O, RIGHT, buff=0.15)
        ybr = Brace(Line(O, Pp), RIGHT, buff=0.12, color=INK)
        yl = M("y", 32).next_to(ybr, RIGHT, buff=0.1)
        e1 = fit(M(r"\Delta x = S_2P - S_1P \approx \frac{yd}{D}", 42), 4.6).move_to(P(4.2, 2.5))
        e1n = M(r"(D \gg d)", 30, color=MUTED).next_to(e1, DOWN, buff=0.2)
        e2 = fit(M(r"\text{bright: } \frac{yd}{D} = n\lambda", 42, color=GREEN), 4.6).move_to(P(4.2, 0.3))
        e3 = fit(M(r"\text{dark: } \frac{yd}{D} = \left(n + \tfrac12\right)\lambda", 42), 4.6).move_to(P(4.2, -1.3))
        with self.voiceover("Go a height y up the screen. The path from S two is longer by about y d over D. Bright fringes "
                            "sit where that is a whole number of wavelengths, dark ones at the half numbers.") as vo:
            self.play(FadeOut(slit_arcs), FadeIn(Pd), FadeIn(lP), FadeIn(lO), FadeIn(ybr), FadeIn(yl), run_time=0.7)
            self.play(Create(lineA), Create(lineB), run_time=0.9)
            self.play(Create(perp), Create(pd), FadeIn(pdl), Create(pdr), run_time=0.9)
            self.play(Write(e1), FadeIn(e1n), run_time=1.3)
            self.wait(vo.duration * 0.1)
            self.play(Write(e2), run_time=1.0)
            self.play(Write(e3), run_time=1.0)

        bt = ValueTracker(1.2)
        ax = Axes(x_range=[-4.2, 4.2, 1.2], y_range=[0, 4.4, 1], x_length=12.4, y_length=2.3, tips=False,
                  axis_config={"color": MUTED, "stroke_width": 2}).move_to(P(0, 0.55))
        curve = always_redraw(lambda: ax.plot(lambda y: 4 * np.cos(PI * y / bt.get_value()) ** 2,
                                              x_range=[-4.2, 4.2, 0.01], color=PRIMARY, stroke_width=4))
        x_left, x_right = ax.c2p(-4.2, 0)[0], ax.c2p(4.2, 0)[0]
        band = always_redraw(lambda: hband(
            lambda X: np.cos(PI * ax.p2c(P(X, 0))[0] / bt.get_value()) ** 2, x_left, x_right, -1.5, 0.55))
        eqb = M(r"\beta = \frac{\lambda D}{d}", 56).move_to(P(-3.4, 2.85))
        bb = boxed(eqb)
        eqI = M(r"I = 4I_0\cos^2\frac{\pi y}{\beta}", 46).move_to(P(3.2, 2.85))
        brc = BraceBetweenPoints(P(ax.c2p(0, 0)[0], -1.88), P(ax.c2p(1.2, 0)[0], -1.88), DOWN, color=INK)
        brl = M(r"\beta", 34).next_to(brc, DOWN, buff=0.1)
        with self.voiceover("So the fringes are equally spaced. The fringe width is beta equals lambda D over d, and "
                            "the intensity is four I nought, cos squared of pi y over beta.") as vo:
            self.clear_scene(0.5)
            self.play(Create(ax), FadeIn(band), run_time=1.0)
            self.play(Create(curve), run_time=1.4)
            self.play(FadeIn(brc), FadeIn(brl), run_time=0.5)
            self.play(Write(eqb), Create(bb), run_time=1.0)
            self.play(Write(eqI), run_time=1.0)

        ticks = VGroup(*[M(f"{1.2 * k_:.1f}", 26, color=MUTED).next_to(ax.c2p(1.2 * k_, 0), DOWN, buff=0.15)
                         for k_ in range(-2, 3)])
        unit = T("y (mm)", 22, color=MUTED).next_to(ax.c2p(3.9, 0), DOWN, buff=0.2)
        n1 = fit(M(r"\lambda = 600\text{ nm},\ d = 0.5\text{ mm},\ D = 1\text{ m}:\quad "
                   r"\beta = \frac{(600\times10^{-9})(1)}{0.5\times10^{-3}} = 1.2\text{ mm}", 36), 12.6)
        n1.move_to(P(0, -2.5))
        n2 = M(r"d \to 2d:\quad \beta \to \tfrac{\beta}{2} = 0.6\text{ mm}", 38, color=WARN).move_to(P(0, -3.4))
        with self.voiceover("Take six hundred nanometres, slits half a millimetre apart, and a screen one metre away. Beta "
                            "is one point two millimetres. Notice that d is underneath: move the slits twice as far apart, "
                            "and the fringes halve.") as vo:
            self.play(FadeOut(brc), FadeOut(brl), FadeIn(ticks), FadeIn(unit), run_time=0.6)
            self.play(Write(n1), run_time=1.8)
            self.wait(vo.duration * 0.25)
            self.play(FadeIn(n2), run_time=0.6)
            self.play(bt.animate.set_value(0.6), run_time=2.2)
        curve.clear_updaters()
        band.clear_updaters()

    # ------------------------------------------------------------ scene 5: shifts and thin films
    def s5(self):
        xb, xsc = -5.4, -1.1
        d = 1.2
        S1, S2 = P(xb, d / 2), P(xb, -d / 2)
        Dd = xsc - xb
        beta = ValueTracker(0.9)
        sh = ValueTracker(0.0)
        gap = 0.13
        barrier = VGroup(
            Line(P(xb, -2.9), P(xb, -d / 2 - gap), color=INK, stroke_width=6),
            Line(P(xb, -d / 2 + gap), P(xb, d / 2 - gap), color=INK, stroke_width=6),
            Line(P(xb, d / 2 + gap), P(xb, 2.9), color=INK, stroke_width=6),
        )
        inc = VGroup(*[ray(P(-6.7, y), P(xb - 0.1, y), sw=3) for y in (-1.6, 0, 1.6)])
        band = always_redraw(lambda: vband(
            lambda y: np.cos(PI * (y - sh.get_value()) / beta.get_value()) ** 2, -2.9, 2.9, xsc + 0.15, 0.35))
        lines = always_redraw(lambda: VGroup(
            Line(S1, P(xsc, sh.get_value()), color=RAY_C, stroke_width=2.5, stroke_opacity=0.7),
            Line(S2, P(xsc, sh.get_value()), color=FRONT_C, stroke_width=2.5, stroke_opacity=0.7)))
        mark = always_redraw(lambda: Triangle(color=GREEN, fill_color=GREEN, fill_opacity=1, stroke_width=0)
                             .scale(0.13).rotate(PI / 2).move_to(P(xsc + 0.55, sh.get_value())))
        mark_l = always_redraw(lambda: T("central", 22, color=GREEN).next_to(P(xsc + 0.7, sh.get_value()), RIGHT,
                                                                           buff=0.05))
        slab = Rectangle(width=0.26, height=0.55, stroke_width=2, color=SUM_C).set_fill(SUM_C, 0.6)
        slab.move_to(S1 + 0.2 * RIGHT)
        slab_l = M(r"\mu,\ t", 30, color=SUM_C).next_to(slab, UP, buff=0.12).shift(0.35 * RIGHT)
        e1 = M(r"\text{extra optical path} = (\mu - 1)\,t", 38).move_to(P(3.7, 2.7))
        e2 = M(r"y_0 = \frac{(\mu - 1)\,t\,D}{d}", 44).move_to(P(3.7, 1.55))
        e2n = T("towards the covered slit", 24, color=MUTED).next_to(e2, DOWN, buff=0.15)
        e3 = M(r"\beta\ \text{unchanged}", 38, color=GREEN).move_to(P(3.7, 0.0))
        e4 = fit(M(r"\mu = 1.6,\ 5\text{ fringes}:\ t = \frac{5\lambda}{\mu - 1} = 5\ \mu\text{m}", 36), 5.6)
        e4.move_to(P(3.7, -1.15))
        with self.voiceover("Anything that adds optical path moves the fringes. A thin sheet of index mu and thickness t "
                            "over one slit adds mu minus one, times t, to that path. The whole pattern slides towards the "
                            "covered slit, and the fringe width does not change. With six hundred nanometre light, a mica "
                            "sheet of index one point six that shifts the pattern by five fringes is five micrometres thick.") as vo:
            self.play(Create(barrier), FadeIn(inc), FadeIn(band), FadeIn(lines), FadeIn(mark), FadeIn(mark_l),
                      run_time=1.0)
            self.play(FadeIn(slab), FadeIn(slab_l), run_time=0.6)
            self.play(Write(e1), run_time=1.2)
            self.play(sh.animate.set_value(1.35), run_time=2.2)
            self.play(Write(e2), FadeIn(e2n), run_time=1.2)
            self.play(FadeIn(e3), run_time=0.6)
            self.wait(vo.duration * 0.1)
            self.play(Write(e4), run_time=1.2)

        water = Rectangle(width=Dd - 0.06, height=5.8, stroke_width=0).set_fill(GLASS, 0.75)
        water.move_to(P((xb + xsc) / 2, 0))
        wl = T("water", 24, color=FRONT_C).move_to(P((xb + xsc) / 2, 2.6))
        e5 = M(r"\text{in water: } \beta' = \frac{\beta}{n}", 42, color=FRONT_C).move_to(P(3.7, -2.6))
        with self.voiceover("Fill the whole apparatus with water instead. Every wavelength shrinks by n, so beta "
                            "becomes beta over n.") as vo:
            self.play(FadeOut(slab), FadeOut(slab_l), sh.animate.set_value(0.0), run_time=1.0)
            self.bring_to_back(water)
            self.play(FadeIn(water), FadeIn(wl), run_time=0.6)
            self.play(beta.animate.set_value(0.9 / (4 / 3)), Write(e5), run_time=1.6)
        for m in (band, lines, mark, mark_l):
            m.clear_updaters()

        # thin film
        top_y, bot_y = 0.2, -1.0
        film = Rectangle(width=5.8, height=top_y - bot_y, stroke_width=0).set_fill(FILM, 1)
        film.move_to(P(-3.5, (top_y + bot_y) / 2))
        edges = VGroup(Line(P(-6.4, top_y), P(-0.6, top_y), color=INK, stroke_width=3),
                       Line(P(-6.4, bot_y), P(-0.6, bot_y), color=INK, stroke_width=3))
        a_in = 25 * DEGREES
        a_r = np.arcsin(np.sin(a_in) / 1.33)
        H1 = P(-4.4, top_y)
        din = np.array([np.sin(a_in), -np.cos(a_in), 0])
        dout = np.array([np.sin(a_in), np.cos(a_in), 0])
        H2 = H1 + (top_y - bot_y) / np.cos(a_r) * np.array([np.sin(a_r), -np.cos(a_r), 0])
        H3 = H2 + (top_y - bot_y) / np.cos(a_r) * np.array([np.sin(a_r), np.cos(a_r), 0])
        r_in = ray(H1 - 3.0 * din, H1)
        r1 = ray(H1, H1 + 2.8 * dout)
        inside = VGroup(Line(H1, H2, color=SUM_C, stroke_width=4), Line(H2, H3, color=SUM_C, stroke_width=4))
        r2 = ray(H3, H3 + 2.6 * dout, color=FRONT_C)
        fl = M(r"\text{film: } \mu,\ t", 30).move_to(P(-1.75, -0.4))
        pl = M(r"2\mu t", 32, color=SUM_C).move_to(P(-2.85, -0.4))
        shift1 = M(r"+\tfrac{\lambda}{2}", 34, color=WARN).move_to(P(-5.9, 1.35))
        shift1n = T("off denser", 20, color=WARN).next_to(shift1, DOWN, buff=0.08)
        air_l = T("air", 24, color=MUTED).move_to(P(-1.6, -1.6))
        c1 = M(r"\text{bright: } 2\mu t\cos r = \left(m + \tfrac12\right)\lambda", 38).move_to(P(3.6, 2.3))
        c2 = M(r"\text{dark: } 2\mu t\cos r = m\lambda", 38).move_to(P(3.6, 1.2))
        c3 = M(r"t \to 0:\ \text{dark (black)}", 40, color=WARN).move_to(P(3.6, -0.2))
        c3n = T("the thinnest soap film looks black", 24, color=MUTED).next_to(c3, DOWN, buff=0.2)
        with self.voiceover("A thin film interferes with itself: light reflects from its top and bottom, and the second beam"
                            " travels an extra two mu t. Reflection off a denser medium adds half a wavelength. So where the"
                            " film is thinnest, the two beams cancel, and a soap film turns black just before it bursts.") as vo:
            self.clear_scene(0.5)
            self.play(FadeIn(film), Create(edges), FadeIn(fl), FadeIn(air_l), run_time=0.8)
            self.play(GrowArrow(r_in), run_time=0.6)
            self.play(GrowArrow(r1), run_time=0.6)
            self.play(Create(inside), run_time=0.8)
            self.play(GrowArrow(r2), FadeIn(pl), run_time=0.7)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(shift1), FadeIn(shift1n), run_time=0.6)
            self.play(Write(c1), run_time=1.2)
            self.play(Write(c2), run_time=1.0)
            self.play(FadeIn(c3), FadeIn(c3n), run_time=0.8)

        glass = Rectangle(width=5.8, height=1.5, stroke_width=0).set_fill(GLASS, 1).move_to(P(-3.5, bot_y - 0.75))
        gl_l = M(r"\text{glass } 1.5", 28, color=FRONT_C).move_to(P(-1.75, -1.6))
        fl2 = M(r"\text{coat: } 1.38", 30).move_to(fl)
        shift2 = M(r"+\tfrac{\lambda}{2}", 34, color=WARN).next_to(H2, DOWN, buff=0.18)
        d1 = M(r"\text{both reflections: } +\tfrac{\lambda}{2}\ \text{(they cancel)}", 36).move_to(P(3.6, 2.3))
        d2 = M(r"\text{no reflection: } 2\mu t = \tfrac{\lambda}{2}", 38).move_to(P(3.6, 1.2))
        d2b = M(r"\mu t = \tfrac{\lambda}{4}", 44, color=PRIMARY).move_to(P(3.6, 0.1))
        d3 = M(r"t = \frac{550}{4\times1.38} \approx 100\text{ nm}", 42, color=GREEN).move_to(P(3.6, -1.3))
        for m in (d1, d2, d3):
            fit(m, 5.8)
        with self.voiceover("Always count the half wave shifts first. A coating on glass gets one at both surfaces, "
                            "so they cancel. Then mu t equals a quarter wavelength kills the reflection: about one "
                            "hundred nanometres of magnesium fluoride for green light.") as vo:
            self.play(FadeOut(c1), FadeOut(c2), FadeOut(c3), FadeOut(c3n), FadeOut(air_l), run_time=0.5)
            self.bring_to_back(glass)
            self.play(FadeIn(glass), FadeIn(gl_l), Transform(fl, fl2), run_time=0.8)
            self.play(FadeIn(shift2), run_time=0.5)
            self.play(Write(d1), run_time=1.2)
            self.wait(vo.duration * 0.1)
            self.play(Write(d2), run_time=1.0)
            self.play(Write(d2b), run_time=0.8)
            self.play(Write(d3), run_time=1.2)

    # ------------------------------------------------------------ scene 6: single slit and resolving power
    def s6(self):
        xb = -4.6
        half = 1.2
        barrier = VGroup(Line(P(xb, -2.9), P(xb, -half), color=INK, stroke_width=7),
                         Line(P(xb, half), P(xb, 2.9), color=INK, stroke_width=7))
        fronts = VGroup(*[Line(P(x, -2.2), P(x, 2.2), color=FRONT_C, stroke_width=3) for x in (-6.6, -6.1)])
        abr = Brace(Line(P(xb, -half), P(xb, half)), LEFT, buff=0.12, color=INK)
        al = M("a", 34).next_to(abr, LEFT, buff=0.1)
        th = 30 * DEGREES
        u = np.array([np.cos(th), np.sin(th), 0])
        tops = [1.0, 0.6, 0.2]
        cols = [PRIMARY, ACCENT, GREEN]
        pts = VGroup()
        rays_ = VGroup()
        for yt, c in zip(tops, cols):
            for y in (yt, yt - half):
                pts.add(Dot(P(xb, y), radius=0.07, color=c))
                rays_.add(Line(P(xb, y), P(xb, y) + 3.4 * u, color=c, stroke_width=3))
        low = P(xb, tops[0] - half)
        foot = low + np.dot(P(xb, tops[0]) - low, u) * u
        pd = Line(low, foot, color=PATH_C, stroke_width=10)
        perp = DashedLine(P(xb, tops[0]), foot, color=MUTED, stroke_width=2.5)
        pdl = M(r"\tfrac{\lambda}{2}", 40, color=PATH_C).move_to(P(-3.0, -1.5))
        pdp = Line(pdl.get_corner(UL), (low + foot) / 2, color=PATH_C, stroke_width=2)
        arc = Arc(radius=0.55, start_angle=0, angle=th, arc_center=P(xb, -1.0), color=INK, stroke_width=3)
        thl = M(r"\theta", 28).move_to(P(xb, -1.0) + 0.8 * np.array([np.cos(th / 2), np.sin(th / 2), 0]))
        e1 = T("pair points a/2 apart", 28, color=MUTED).move_to(P(3.3, 2.6))
        e2 = M(r"\tfrac{a}{2}\sin\theta = \tfrac{\lambda}{2}", 50).move_to(P(3.3, 1.3))
        e3 = M(r"a\sin\theta = \lambda", 58, color=PRIMARY).move_to(P(3.3, -0.4))
        b3 = boxed(e3)
        e3n = T("first dark band", 26, color=PRIMARY).next_to(b3, DOWN, buff=0.2)
        with self.voiceover(f"Diffraction is interference inside one opening. Split a slit of width {LA} into "
                            f"halves, and pair each point with the one {LA} over two below it. When their path "
                            f"difference is half a wavelength, every pair cancels. The first dark band sits at "
                            f"{LA} sine theta equals lambda.") as vo:
            self.play(Create(barrier), FadeIn(fronts), FadeIn(abr), FadeIn(al), run_time=0.9)
            self.play(LaggedStart(*[FadeIn(p, scale=0.5) for p in pts], lag_ratio=0.1), FadeIn(e1), run_time=1.0)
            self.play(LaggedStart(*[Create(r) for r in rays_], lag_ratio=0.08), Create(arc), FadeIn(thl),
                      run_time=1.4)
            self.wait(vo.duration * 0.1)
            self.play(Create(perp), Create(pd), FadeIn(pdl), Create(pdp), run_time=0.9)
            self.play(Write(e2), run_time=1.1)
            self.wait(vo.duration * 0.1)
            self.play(Write(e3), Create(b3), FadeIn(e3n), run_time=1.2)

        kt = ValueTracker(1.0)
        ax = Axes(x_range=[-3.5, 3.5, 1], y_range=[0, 1.1, 0.5], x_length=12.4, y_length=3.0, tips=False,
                  axis_config={"color": MUTED, "stroke_width": 2}).move_to(P(0, 0.35))
        curve = always_redraw(lambda: ax.plot(lambda x: float(sinc2(np.array([x * kt.get_value()]))[0]),
                                              x_range=[-3.5, 3.5, 0.01], color=PRIMARY, stroke_width=4))
        xl0, xr0 = ax.c2p(-3.5, 0)[0], ax.c2p(3.5, 0)[0]
        band = always_redraw(lambda: hband(
            lambda X: float(sinc2(np.array([ax.p2c(P(X, 0))[0] * kt.get_value()]))[0]) ** 0.5,
            xl0, xr0, -2.1, 0.45))
        top = M(r"\text{dark: } a\sin\theta = m\lambda,\quad m = \pm1, \pm2, \dots", 42).move_to(P(0, 3.45))
        ticks = VGroup(*[M(s, 28, color=MUTED).next_to(ax.c2p(k_, 0), DOWN, buff=0.12) for k_, s in
                         [(-2, r"-\tfrac{2\lambda}{a}"), (-1, r"-\tfrac{\lambda}{a}"), (1, r"\tfrac{\lambda}{a}"),
                          (2, r"\tfrac{2\lambda}{a}")]])
        br1 = BraceBetweenPoints(ax.c2p(-1, 1.12), ax.c2p(1, 1.12), UP, color=INK)
        br1l = M(r"\frac{2\lambda D}{a}", 34).next_to(br1, RIGHT, buff=0.2)
        br2 = BraceBetweenPoints(ax.c2p(1, 0.3), ax.c2p(2, 0.3), UP, color=MUTED)
        br2l = M(r"\frac{\lambda D}{a}", 30, color=MUTED).next_to(br2, UP, buff=0.08)
        num = fit(M(r"a = 0.2\text{ mm},\ \lambda = 600\text{ nm},\ D = 1\text{ m}:\quad "
                    r"\frac{2\lambda D}{a} = 6\text{ mm}", 36), 12.4).move_to(P(0, -3.1))
        nar = T("narrower slit, wider pattern", 30, color=WARN).move_to(P(0, -2.9))
        with self.voiceover(f"Dark bands fall at {LA} sine theta equals m lambda. The central maximum runs from "
                            f"minus one to plus one, so it is twice as wide as the others: two lambda D over {LA}. "
                            f"For a slit of nought point two millimetres, that is six millimetres. And a narrower "
                            f"slit spreads the light more, not less.") as vo:
            self.clear_scene(0.5)
            self.play(FadeIn(top), Create(ax), FadeIn(ticks), run_time=0.9)
            self.play(Create(curve), FadeIn(band), run_time=1.4)
            self.play(FadeIn(br1), FadeIn(br1l), run_time=0.6)
            self.play(FadeIn(br2), FadeIn(br2l), run_time=0.6)
            self.wait(vo.duration * 0.05)
            self.play(Write(num), run_time=1.3)
            self.wait(vo.duration * 0.12)
            self.play(FadeOut(num), FadeOut(br1), FadeOut(br1l), FadeOut(br2), FadeOut(br2l), FadeOut(ticks),
                      FadeIn(nar), run_time=0.6)
            self.play(kt.animate.set_value(0.5), run_time=1.8)
        curve.clear_updaters()
        band.clear_updaters()

        st = ValueTracker(2.4)
        ax2 = Axes(x_range=[-4, 4, 1], y_range=[0, 1.6, 0.5], x_length=11, y_length=3.4, tips=False,
                   axis_config={"color": MUTED, "stroke_width": 2}).move_to(P(0, 0.1))

        def pk(sgn):
            return lambda: ax2.plot(lambda x: float(sinc2(np.array([x + sgn * st.get_value() / 2]))[0]),
                                    x_range=[-4, 4, 0.01], color=RAY_C if sgn < 0 else FRONT_C,
                                    stroke_width=3, stroke_opacity=0.8)

        p1 = always_redraw(pk(-1))
        p2 = always_redraw(pk(1))
        tot = always_redraw(lambda: ax2.plot(
            lambda x: float(sinc2(np.array([x - st.get_value() / 2]))[0] + sinc2(np.array([x + st.get_value() / 2]))[0]),
            x_range=[-4, 4, 0.01], color=SUM_C, stroke_width=5))
        ray_eq = fit(M(r"\theta_{\min} = \frac{1.22\,\lambda}{D}\ \ (D:\ \text{aperture})", 46), 5.8).move_to(P(-3.6, 2.85))
        rb = boxed(ray_eq)
        cap = T("one source's centre on the other's first dark ring", 24, color=MUTED).move_to(P(2.9, 2.85))
        fit(cap, 6.2)
        s_res = T("resolved", 30, color=GREEN).move_to(P(0, -2.35))
        s_just = T("just resolved (Rayleigh)", 30, color=ACCENT).move_to(P(0, -2.35))
        s_no = T("merged: unresolved", 30, color=WARN).move_to(P(0, -2.35))
        with self.voiceover("Every lens is an opening too, so a point of light becomes a small blurred disc. Two points are "
                            "just resolved when the centre of one disc sits on the first dark ring of the other. The "
                            "smallest angle is one point two two lambda over D, where D is now the aperture.") as vo:
            self.clear_scene(0.5)
            self.play(Create(ax2), FadeIn(p1), FadeIn(p2), FadeIn(tot), FadeIn(s_res), run_time=1.0)
            self.wait(vo.duration * 0.15)
            self.play(st.animate.set_value(1.0), FadeOut(s_res), FadeIn(s_just), run_time=2.2)
            self.play(Write(ray_eq), Create(rb), FadeIn(cap), run_time=1.3)
        tip = T("bigger aperture or shorter wavelength: finer detail", 28, color=GREEN).move_to(P(0, -3.25))
        with self.voiceover("Closer than that, they merge, however much you magnify. Bigger apertures and shorter "
                            "wavelengths see finer detail.") as vo:
            self.play(st.animate.set_value(0.55), FadeOut(s_just), FadeIn(s_no), run_time=1.8)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(tip, shift=0.15 * UP), run_time=0.7)
        for m in (p1, p2, tot):
            m.clear_updaters()

    # ------------------------------------------------------------ scene 7: polarisation
    def s7(self):
        yb = 0.5
        hdr = T("Light is transverse: E vibrates across the ray", 32, color=PRIMARY, weight="BOLD")
        hdr.move_to(P(0, 3.25))
        beam = DashedLine(P(-6.6, yb), P(6.6, yb), color=GRID, stroke_width=3)
        xs_ = [-5.3, -2.9, -0.4, 2.0, 4.6]
        star = VGroup(*[efield(P(xs_[0], yb), a * DEGREES) for a in (0, 30, 60, 90, 120, 150)])
        p1 = polaroid(P(xs_[1], yb), 0)
        pol = efield(P(xs_[2], yb), 0)
        th = ValueTracker(0.0)
        an = always_redraw(lambda: polaroid(P(xs_[3], yb), th.get_value()))
        out = always_redraw(lambda: efield(P(xs_[4], yb), th.get_value(),
                                           length=max(1.4 * np.cos(th.get_value()), 0.02)))
        labs = VGroup(*[T(s, 22, color=MUTED).move_to(P(x, -0.75)) for s, x in
                        zip(["unpolarised", "polaroid", "polarised", "analyser", "out"], xs_)])
        I0 = M(r"I_0", 34).move_to(P(xs_[0], -1.45))
        I1 = M(r"\tfrac{I_0}{2}", 34).move_to(P(xs_[2], -1.45))
        I2 = M(r"\tfrac{I_0}{2}\cos^2\theta", 34).move_to(P(xs_[4], -1.45))
        with self.voiceover("Polaroid sunglasses cut the glare from a lake. That works only because light is a "
                            "transverse wave. Its electric field vibrates across the direction of travel, and a "
                            "polaroid passes just one direction.") as vo:
            self.play(FadeIn(hdr), Create(beam), run_time=0.8)
            self.play(LaggedStart(*[GrowFromCenter(e) for e in star], lag_ratio=0.15), FadeIn(labs[0]), run_time=1.2)
            self.wait(vo.duration * 0.15)
            self.play(FadeIn(p1), FadeIn(labs[1]), run_time=0.7)
            self.play(GrowFromCenter(pol), FadeIn(labs[2]), run_time=0.8)

        thl = M(r"\theta =", 38).move_to(P(-1.3, -2.45))
        thv = DecimalNumber(0, num_decimal_places=0, unit=r"^{\circ}", font_size=38, color=INK)
        thv.add_updater(lambda m: m.set_value(th.get_value() / DEGREES).next_to(thl, RIGHT, buff=0.15))
        malus = M(r"I = I_0\cos^2\theta", 48, color=PRIMARY).move_to(P(2.6, -2.45))
        mb = boxed(malus)
        ml = T("Malus' law", 24, color=PRIMARY).next_to(mb, DOWN, buff=0.12)
        comp = M(r"E_0\cos\theta", 30, color=ACCENT).move_to(P(xs_[4] + 1.35, yb + 0.9))
        with self.voiceover("Unpolarised light through one polaroid always loses half. Turn a second polaroid to angle "
                            "theta, and only E nought cos theta gets through. Intensity goes as the square: I equals I "
                            "nought cos squared theta, Malus law.") as vo:
            self.play(FadeIn(I0), FadeIn(I1), run_time=0.7)
            self.wait(vo.duration * 0.1)
            self.add(an, out)
            self.play(FadeIn(labs[3]), FadeIn(labs[4]), FadeIn(thl), FadeIn(thv), run_time=0.6)
            self.play(th.animate.set_value(50 * DEGREES), FadeIn(comp), run_time=2.0)
            self.play(FadeIn(I2), run_time=0.5)
            self.play(Write(malus), Create(mb), FadeIn(ml), run_time=1.2)
            self.play(th.animate.set_value(90 * DEGREES), run_time=1.5)
        an.clear_updaters()
        out.clear_updaters()
        thv.clear_updaters()

        with self.voiceover("Two crossed polaroids pass nothing. Slip a third between them at forty five degrees, "
                            "and light gets through again: one eighth of the original.") as vo:
            self.clear_scene(0.5)
            y = 0.6
            beam2 = DashedLine(P(-6.6, y), P(6.6, y), color=GRID, stroke_width=3)
            P1 = polaroid(P(-4.0, y), 0)
            P3 = polaroid(P(2.6, y), PI / 2)
            P2 = polaroid(P(-0.7, y), PI / 4)
            a1 = M(r"0^\circ", 30, color=MUTED).next_to(P1, DOWN, buff=0.2)
            a3 = M(r"90^\circ", 30, color=MUTED).next_to(P3, DOWN, buff=0.2)
            a2 = M(r"45^\circ", 30, color=MUTED).next_to(P2, DOWN, buff=0.2)
            i0 = M(r"I_0", 36).move_to(P(-5.8, y + 1.2))
            i1 = M(r"\tfrac{I_0}{2}", 36).move_to(P(-2.35, y + 1.2))
            i3 = M(r"0", 40, color=WARN).move_to(P(4.6, y + 1.2))
            i2 = M(r"\tfrac{I_0}{4}", 36).move_to(P(0.95, y + 1.2))
            i3b = M(r"\tfrac{I_0}{8}", 40, color=GREEN).move_to(P(4.6, y + 1.2))
            self.play(Create(beam2), FadeIn(P1), FadeIn(P3), FadeIn(a1), FadeIn(a3), FadeIn(i0), run_time=0.8)
            self.play(FadeIn(i1), FadeIn(i3), run_time=0.6)
            self.wait(vo.duration * 0.15)
            self.play(FadeIn(P2, shift=0.6 * DOWN), FadeIn(a2), run_time=0.8)
            self.play(FadeIn(i2), run_time=0.5)
            self.play(Transform(i3, i3b), run_time=0.7)
            eq = M(r"\frac{I_0}{2}\cdot\cos^2 45^\circ\cdot\cos^2 45^\circ = \frac{I_0}{8}", 44).move_to(P(0, -2.2))
            self.play(Write(eq), run_time=1.3)

        with self.voiceover("Reflection polarises light too. When the reflected and refracted rays are at right angles, the "
                            "reflected light is completely polarised, and tan theta B equals n. For index root three, that "
                            "is sixty degrees.") as vo:
            self.clear_scene(0.5)
            O = P(-3.2, -0.4)
            med = Rectangle(width=6.6, height=3.0, stroke_width=0).set_fill(GLASS, 0.8).move_to(P(-3.3, -1.9))
            surf = Line(P(-6.6, O[1]), P(0.0, O[1]), color=INK, stroke_width=3)
            nrm = DashedLine(O + 2.6 * UP, O + 2.9 * DOWN, color=MUTED, stroke_width=2.5)
            L = 2.9
            inc = ray(O + L * np.array([-np.sin(PI / 3), np.cos(PI / 3), 0]), O, color=RAY_C)
            refl = ray(O, O + L * np.array([np.sin(PI / 3), np.cos(PI / 3), 0]), color=ACCENT)
            refr = ray(O, O + 2.7 * np.array([np.sin(PI / 6), -np.cos(PI / 6), 0]), color=FRONT_C)
            ra = RightAngle(Line(O, refl.get_end()), Line(O, refr.get_end()), length=0.3, color=INK, stroke_width=3)
            arcB = Arc(radius=0.75, start_angle=PI / 2, angle=PI / 3, arc_center=O, color=INK, stroke_width=3)
            lB = M(r"\theta_B", 30).move_to(O + 1.1 * np.array([np.cos(2 * PI / 3), np.sin(2 * PI / 3), 0]))
            arcR = Arc(radius=0.75, start_angle=-PI / 2, angle=PI / 6, arc_center=O, color=INK, stroke_width=3)
            lR = M(r"r", 30).move_to(O + 1.05 * np.array([np.cos(-5 * PI / 12), np.sin(-5 * PI / 12), 0]))
            pol_l = T("completely polarised", 22, color=ACCENT).next_to(refl.get_end(), UP, buff=0.15)
            gl = M(r"n = \sqrt3", 30, color=FRONT_C).move_to(P(-5.6, -2.9))
            self.play(FadeIn(med), Create(surf), Create(nrm), FadeIn(gl), run_time=0.7)
            self.play(GrowArrow(inc), Create(arcB), FadeIn(lB), run_time=0.8)
            self.play(GrowArrow(refl), GrowArrow(refr), Create(arcR), FadeIn(lR), run_time=0.9)
            self.play(Create(ra), FadeIn(pol_l), run_time=0.6)
            b1 = M(r"\theta_B + r = 90^\circ", 42).move_to(P(3.6, 2.3))
            b2 = M(r"\sin\theta_B = n\sin r = n\cos\theta_B", 40).move_to(P(3.6, 1.15))
            b3 = M(r"\tan\theta_B = n", 54, color=PRIMARY).move_to(P(3.6, -0.15))
            bb = boxed(b3)
            b4 = M(r"n = \sqrt3 \;\Rightarrow\; \theta_B = 60^\circ", 42, color=GREEN).move_to(P(3.6, -1.6))
            self.play(Write(b1), run_time=0.9)
            self.play(Write(b2), run_time=1.1)
            self.play(Write(b3), Create(bb), run_time=0.9)
            self.play(Write(b4), run_time=0.9)

    # ------------------------------------------------------------ scene 8: recap
    def s8(self):
        title = T("Chapter 2 in five lines", 38, color=PRIMARY, weight="BOLD").move_to(P(0, 3.2))
        lines = [
            (r"\frac{\sin i}{\sin r} = \frac{v_1}{v_2},\ \ \lambda \to \frac{\lambda}{n}", "Huygens; frequency fixed"),
            (r"\phi = \frac{2\pi}{\lambda}\Delta x", "coherent waves add amplitudes"),
            (r"\beta = \frac{\lambda D}{d}", "equal fringes; extra path shifts them"),
            (r"a\sin\theta = m\lambda,\ \ \frac{1.22\lambda}{D}", "diffraction limits every lens"),
            (r"I = I_0\cos^2\theta,\ \ \tan\theta_B = n", "light is transverse"),
        ]
        rows = VGroup()
        for i, (tex, note) in enumerate(lines):
            m = M(tex, 36)
            n = T(note, 26, color=MUTED)
            num = T(f"{i + 1}.", 28, color=PRIMARY, weight="BOLD")
            rows.add(VGroup(num, m, n))
        for r in rows:
            r[0].move_to(P(-6.2, 0))
            r[1].next_to(r[0], RIGHT, buff=0.3)
            r[2].move_to(P(3.6, 0))
        rows.arrange(DOWN, buff=0.3, aligned_edge=LEFT).move_to(P(0, -0.05))
        for r in rows:
            r[2].move_to(P(3.6, r[1].get_y()))
        with self.voiceover("To recap. Huygens' wavelets give Snell's law, and in glass the frequency stays fixed while the "
                            "wavelength shrinks. Coherent waves add amplitudes, not intensities, with phase set by path "
                            "difference.") as vo:
            self.play(FadeIn(title), run_time=0.6)
            self.play(FadeIn(rows[0], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.3)
            self.play(FadeIn(rows[1], shift=0.15 * UP), run_time=0.7)
        with self.voiceover(f"Young's fringes are equally spaced, with width lambda D over d, and extra optical "
                            f"path shifts them. Diffraction dark bands sit at {LA} sine theta equals m lambda, which "
                            f"limits every lens. And polaroids prove that light is transverse.") as vo:
            self.play(FadeIn(rows[2], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.25)
            self.play(FadeIn(rows[3], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(rows[4], shift=0.15 * UP), run_time=0.7)
        with self.voiceover("Try the mastery quiz. Then chapter three shows light arriving as photons, and electrons "
                            "travelling as waves.") as vo:
            nxt = T("Next: Chapter 3 · Dual Nature of Radiation and Matter", 30, color=PRIMARY).move_to(P(0, -3.4))
            self.wait(vo.duration * 0.3)
            self.play(FadeIn(nxt, shift=0.2 * UP), run_time=0.8)
