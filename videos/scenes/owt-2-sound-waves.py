import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

# Chapter colour roles (light background).
DISP_C = SECONDARY  # displacement s, envelopes = teal
PRES_C = PRIMARY  # pressure, sources = strawberry red
HL = ACCENT  # highlights, squashed wavelength = amber
ALT_C = PURPLE  # second wave / stretched wavelength
WARN = PRIMARY
AIR_C = ManimColor("#EAF2F3")
WATER_C = ManimColor("#9CC9D3")


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


def card(mob, pad=0.2, color=MUTED):
    box = SurroundingRectangle(mob, buff=pad, corner_radius=0.12, color=color, stroke_width=2)
    box.set_fill(WHITE, opacity=0.9)
    return VGroup(box, mob)


def P(x, y):
    return np.array([x, y, 0.0])


def curve(f, x0, x1, color, sw=4, n=400):
    return ParametricFunction(lambda u: P(u, f(u)), t_range=[x0, x1, (x1 - x0) / n],
                              color=color, stroke_width=sw)


def pipe(x0, x1, y, h, closed_left=False, closed_right=False, sw=4):
    """Horizontal pipe walls; closed ends drawn as thick caps."""
    top = Line(P(x0, y + h / 2), P(x1, y + h / 2), color=INK, stroke_width=sw)
    bot = Line(P(x0, y - h / 2), P(x1, y - h / 2), color=INK, stroke_width=sw)
    fill = Rectangle(width=x1 - x0, height=h, stroke_width=0).set_fill(AIR_C, 1).move_to(P((x0 + x1) / 2, y))
    g = VGroup(fill, top, bot)
    if closed_left:
        g.add(Line(P(x0, y + h / 2), P(x0, y - h / 2), color=INK, stroke_width=sw * 2.5))
    if closed_right:
        g.add(Line(P(x1, y + h / 2), P(x1, y - h / 2), color=INK, stroke_width=sw * 2.5))
    return g


def envelope(x0, x1, y, a, shape, color=DISP_C, sw=4):
    """Standing-wave displacement envelope; shape(u) for u in [0, 1] from the left end."""
    L = x1 - x0
    up = curve(lambda x: y + a * shape((x - x0) / L), x0, x1, color, sw)
    dn = curve(lambda x: y - a * shape((x - x0) / L), x0, x1, color, sw)
    return VGroup(up, dn)


class OwtCh2Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Oscillations, Waves & Thermal Physics",
            "Chapter 2 · Sound Waves",
            "Chapter two. Sound waves.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ scene 1: squeezed air
    def s1(self):
        k = 2 * PI / 4.0
        w = PI
        s0 = 0.32
        t = ValueTracker(0.0)
        xs = np.linspace(-4.6, 5.4, 26)
        yc, hh = 2.0, 0.55

        def s(x):
            return s0 * np.sin(k * x - w * t.get_value())

        layers = VGroup(*[
            always_redraw(lambda x0=x0: Line(P(x0 + s(x0), yc - hh), P(x0 + s(x0), yc + hh),
                                             color=INK, stroke_width=4))
            for x0 in xs
        ])
        box = Rectangle(width=0.55, height=1.5, color=INK, stroke_width=3).set_fill(ManimColor("#5A4440"), 1)
        box.move_to(P(-6.1, yc))
        cone = always_redraw(lambda: Polygon(
            P(-5.82, yc + 0.3), P(-5.82, yc - 0.3), P(-5.25 + s(-5.25), yc - 0.7), P(-5.25 + s(-5.25), yc + 0.7),
            color=INK, stroke_width=3).set_fill(ManimColor("#C9B6AE"), 1))
        body = Rectangle(width=0.28, height=0.75, color=INK, stroke_width=2).set_fill(ManimColor("#F3D9C9"), 1)
        body.move_to(P(6.35, yc - 0.3))
        flame = always_redraw(lambda: Ellipse(width=0.24, height=0.45, color=HL, stroke_width=0)
                              .set_fill(HL, 1).move_to(P(6.35 + 1.4 * s(6.35), yc + 0.33)))
        hdr = T("Sound is squeezed air", 34, color=PRIMARY, weight="BOLD").move_to(P(0, 3.3))

        with self.voiceover("Hold a candle in front of a loudspeaker playing a deep bass note, and the flame flickers in time with the music. The speaker cone pushes the air, then pulls back, and each layer of air pushes on the next.") as vo:
            self.play(FadeIn(hdr), FadeIn(box), FadeIn(cone), FadeIn(body), FadeIn(flame), run_time=1.0)
            self.play(LaggedStart(*[FadeIn(l) for l in layers], lag_ratio=0.04), run_time=1.2)
            rt = max(2.0, 2.0 * round((vo.duration - 2.6) / 2.0))
            self.play(t.animate.set_value(rt), run_time=rt, rate_func=linear)
        t.set_value(0.0)

        comp = VGroup(T("compression", 26, color=PRES_C), Arrow(P(0, 0.3), P(0, -0.25), buff=0, color=PRES_C,
                                                                stroke_width=4)).arrange(DOWN, buff=0.08)
        comp.move_to(P(2.0, 3.05))
        rare = VGroup(T("rarefaction", 26, color=DISP_C), Arrow(P(0, 0.3), P(0, -0.25), buff=0, color=DISP_C,
                                                                stroke_width=4)).arrange(DOWN, buff=0.08)
        rare.move_to(P(-4.0, 3.05))
        with self.voiceover("Sound is a longitudinal wave: the layers swing back and forth along the direction of travel. Where they crowd together is a compression, with pressure above normal. Where they spread apart is a rarefaction.") as vo:
            self.play(FadeOut(hdr), t.animate.set_value(4.0), run_time=4.0, rate_func=linear)
            self.play(FadeIn(comp, shift=0.15 * DOWN), run_time=0.7)
            self.wait(vo.duration * 0.15)
            self.play(FadeIn(rare, shift=0.15 * DOWN), run_time=0.7)

        base = -1.35
        amp = 0.8
        tf = 4.0
        axis = Line(P(-4.9, base), P(5.7, base), color=GRID, stroke_width=3)
        sc = curve(lambda x: base + amp * np.sin(k * x - w * tf), -4.9, 5.7, DISP_C, 5)
        pc = curve(lambda x: base - amp * np.cos(k * x - w * tf), -4.9, 5.7, PRES_C, 5)
        sl = M("s", 40, color=DISP_C).move_to(P(-5.7, base + 0.45))
        pl = M(r"\Delta p", 40, color=PRES_C).move_to(P(-5.7, base - 0.45))
        f1 = M(r"\Delta p = -B\,\frac{\partial s}{\partial x}", 44).move_to(P(-2.9, 0.65))
        f2 = T("pressure is a quarter cycle from displacement", 26, color=MUTED).move_to(P(0, -3.0))
        guide = DashedLine(P(2.0, yc - hh - 0.05), P(2.0, base - 0.95), color=HL, stroke_width=3)
        with self.voiceover("Describe the wave by the displacement of each layer, s, or by the excess pressure, delta p. Air is squeezed where neighbours move differently, so delta p equals minus B times the slope of s: a quarter cycle away from the displacement wave.") as vo:
            self.play(Create(axis), Create(sc), FadeIn(sl), run_time=1.3)
            self.wait(vo.duration * 0.15)
            self.play(Create(pc), FadeIn(pl), run_time=1.3)
            self.play(Write(f1), run_time=1.2)
            self.play(FadeIn(f2), Create(guide), run_time=0.9)

        with self.voiceover("So pressure nodes sit at displacement antinodes. And the numbers are tiny: a one kilohertz sound that moves the air a millionth of a metre changes the pressure by about two point six pascals.") as vo:
            n1 = T("pressure node = displacement antinode", 28, color=PRIMARY)
            n1.move_to(P(0, -3.0))
            self.play(FadeOut(f1), FadeOut(f2), FadeIn(n1), run_time=0.8)
            self.wait(vo.duration * 0.2)
            self.play(*[FadeOut(m) for m in (axis, sc, pc, sl, pl, guide, n1)], run_time=0.6)
            r1 = M(r"f = 1\ \text{kHz},\quad s_0 = 10^{-6}\ \text{m},\quad B = 1.4\times10^{5}\ \text{Pa}", 38)
            r1.move_to(P(0, 0.5))
            r2 = M(r"\Delta p_0 = B k s_0 = (1.4\times10^5)(18.5)(10^{-6}) \approx 2.6\ \text{Pa}", 42,
                   color=GREEN).move_to(P(0, -0.7))
            r3 = T("against about 100 000 Pa of atmosphere: a tiny ripple", 26, color=MUTED).move_to(P(0, -1.8))
            self.play(FadeIn(r1), run_time=0.7)
            self.play(Write(r2), run_time=1.4)
            self.play(FadeIn(r3), run_time=0.6)
        for l in layers:
            l.clear_updaters()
        cone.clear_updaters()
        flame.clear_updaters()

    # ------------------------------------------------------------ scene 2: speed of sound
    def s2(self):
        hdr = T("The speed depends on the medium", 34, color=PRIMARY, weight="BOLD").move_to(P(0, 3.1))
        data = [("air", 340, DISP_C), ("water", 1500, ALT_C), ("steel", 5000, INK)]
        x0, sc = -3.6, 7.6 / 5000
        bars = VGroup()
        for i, (name, v, c) in enumerate(data):
            y = 1.5 - 1.15 * i
            lab = T(name, 30).move_to(P(-4.5, y))
            lab.align_to(P(-4.0, 0), RIGHT)
            bar = Rectangle(width=v * sc, height=0.6, stroke_width=0).set_fill(c, 0.85)
            bar.move_to(P(x0 + v * sc / 2, y))
            val = T(f"{v} m/s", 28, color=MUTED).next_to(bar, RIGHT, buff=0.2)
            bars.add(VGroup(lab, bar, val))
        with self.voiceover("Sound's speed depends on what it travels through: about three hundred forty metres per second in air, fifteen hundred in water, five thousand in steel.") as vo:
            self.play(FadeIn(hdr), run_time=0.8)
            self.wait(vo.duration * 0.2)
            for b in bars:
                self.play(FadeIn(b[0]), GrowFromEdge(b[1], LEFT), FadeIn(b[2]), run_time=0.8)

        with self.voiceover("The reason is the string's rule again: stiffness over inertia, under a square root. For sound, the stiffness is the bulk modulus B, and the inertia is the density, rho.") as vo:
            self.play(*[FadeOut(m) for m in (hdr, bars)], run_time=0.5)
            c1 = T("string", 28, color=MUTED).move_to(P(-3.2, 2.4))
            c2 = T("sound", 28, color=MUTED).move_to(P(3.2, 2.4))
            e1 = M(r"v = \sqrt{\frac{T}{\mu}}", 64).move_to(P(-3.2, 1.0))
            e2 = M(r"v = \sqrt{\frac{B}{\rho}}", 64, color=PRIMARY).move_to(P(3.2, 1.0))
            ar = Arrow(P(-1.4, 1.0), P(1.2, 1.0), color=MUTED, stroke_width=4)
            n1 = T("B: bulk modulus, the stiffness", 28).move_to(P(1.8, -1.0))
            n2 = T("ρ: density, the inertia", 28).next_to(n1, DOWN, buff=0.3).align_to(n1, LEFT)
            self.play(FadeIn(c1), Write(e1), run_time=1.0)
            self.wait(vo.duration * 0.2)
            self.play(GrowArrow(ar), FadeIn(c2), Write(e2), run_time=1.2)
            self.play(FadeIn(n1), run_time=0.6)
            self.play(FadeIn(n2), run_time=0.6)

        with self.voiceover("Newton assumed constant temperature, so B equals p, and got two hundred eighty metres per second. The measured value is three thirty one. Laplace's fix: the squeezes are too quick for heat to flow, so they are adiabatic, and B equals gamma p. Root one point four, times two eighty, is three thirty one.") as vo:
            self.clear_scene(0.5)
            meas = T("measured in air at 0 °C: 331 m/s", 30, color=PRIMARY).move_to(P(0, 2.9))
            nl = T("Newton: isothermal", 28, color=MUTED).move_to(P(-4.0, 1.6))
            ne = M(r"B = p \;\Rightarrow\; v = \sqrt{p/\rho} \approx 280\ \text{m/s}", 42).move_to(P(1.4, 1.6))
            nx = cross_mark().next_to(ne, RIGHT, buff=0.3)
            ll = T("Laplace: adiabatic", 28, color=MUTED).move_to(P(-4.0, -0.2))
            le = M(r"B = \gamma p \;\Rightarrow\; v = 280\sqrt{1.4} \approx 331\ \text{m/s}", 42,
                   color=GREEN).move_to(P(1.4, -0.2))
            lc = check().next_to(le, RIGHT, buff=0.3)
            self.play(FadeIn(meas), run_time=0.6)
            self.play(FadeIn(nl), Write(ne), run_time=1.3)
            self.play(FadeIn(nx), run_time=0.4)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(ll), Write(le), run_time=1.3)
            self.play(FadeIn(lc), run_time=0.4)

        with self.voiceover("For an ideal gas that becomes root gamma R T over M. Speed grows as the root of absolute temperature, so doubling it from zero Celsius needs four times the kelvin: ten ninety two kelvin, eight hundred nineteen Celsius. Raising the pressure alone changes nothing, because the density rises in step.") as vo:
            self.clear_scene(0.5)
            g = M(r"v = \sqrt{\frac{\gamma p}{\rho}} = \sqrt{\frac{\gamma R T}{M}}", 60).move_to(P(0, 2.3))
            bx = SurroundingRectangle(g, buff=0.25, corner_radius=0.15, color=PRIMARY, stroke_width=3)
            r1 = M(r"v \propto \sqrt{T}:\quad 2v \;\Rightarrow\; 4T = 4\times 273 = 1092\ \text{K} = 819\ ^\circ\text{C}",
                   40, color=GREEN)
            fit(r1, 12.5).move_to(P(0, 0.3))
            r2 = T("raise p at fixed T: ρ rises in step, so v is unchanged", 28, color=MUTED).move_to(P(0, -1.0))
            self.play(Write(g), Create(bx), run_time=1.5)
            self.wait(vo.duration * 0.15)
            self.play(Write(r1), run_time=1.6)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(r2), run_time=0.7)

    # ------------------------------------------------------------ scene 3: intensity and decibels
    def s3(self):
        hdr = T("Intensity: power per square metre", 34, color=PRIMARY, weight="BOLD").move_to(P(0, 3.0))
        e1 = M(r"I = \tfrac12\rho v\,\omega^2 s_0^2 = \frac{\Delta p_0^{\,2}}{2\rho v}", 56).move_to(P(0, 1.4))
        e2 = M(r"I \propto s_0^2\, f^2", 52, color=HL).move_to(P(0, -0.2))
        n2 = T("amplitude squared, frequency squared", 26, color=MUTED).next_to(e2, DOWN, buff=0.3)
        with self.voiceover("Intensity is the power a wave carries through each square metre. Each layer of air is a little SHM whose energy goes as amplitude squared, and that energy rides along at the wave speed. So intensity goes as amplitude squared, and as frequency squared.") as vo:
            self.play(FadeIn(hdr), run_time=0.7)
            self.wait(vo.duration * 0.2)
            self.play(Write(e1), run_time=1.6)
            self.wait(vo.duration * 0.2)
            self.play(Write(e2), FadeIn(n2), run_time=1.0)

        with self.voiceover("A small source spreads its power over spheres of area four pi r squared. Double the "
                            "distance, and the same power covers four times the area. The amplitude halves, and "
                            "the intensity falls to a quarter.") as vo:
            self.play(*[FadeOut(m) for m in (hdr, e1, e2, n2)], run_time=0.5)
            S = P(-5.6, -0.4)
            src = Dot(S, radius=0.12, color=PRES_C)
            th = 28 * DEGREES
            rays = VGroup(*[DashedLine(S, S + 5.0 * np.array([np.cos(a), np.sin(a), 0]), color=GRID,
                                       stroke_width=3) for a in (th, -th)])
            a1 = Arc(radius=2.2, start_angle=-th, angle=2 * th, arc_center=S, color=MUTED, stroke_width=3)
            a2 = Arc(radius=4.4, start_angle=-th, angle=2 * th, arc_center=S, color=MUTED, stroke_width=3)
            p1 = Arc(radius=2.2, start_angle=-th / 2, angle=th, arc_center=S, color=HL, stroke_width=10)
            p2 = Arc(radius=4.4, start_angle=-th, angle=2 * th, arc_center=S, color=ALT_C, stroke_width=10)
            l1 = M("r", 36).next_to(S + 2.2 * np.array([np.cos(th), -np.sin(th), 0]), DOWN, buff=0.15)
            l2 = M("2r", 36).next_to(S + 4.4 * np.array([np.cos(th), -np.sin(th), 0]), DOWN, buff=0.15)
            q1 = M("A", 34, color=HL).next_to(p1, LEFT, buff=0.15).shift(0.15 * UP)
            q2 = M("4A", 34, color=ALT_C).next_to(p2, RIGHT, buff=0.15)
            f1 = M(r"I = \frac{P}{4\pi r^2}", 56).move_to(P(3.6, 1.6))
            f2 = M(r"r \to 2r:\quad s_0 \to \tfrac{s_0}{2},\quad I \to \tfrac{I}{4}", 42, color=PRIMARY)
            f2.move_to(P(3.6, -0.2))
            fit(f2, 5.6)
            self.play(FadeIn(src), Create(rays), run_time=0.8)
            self.play(Create(a1), Create(a2), FadeIn(l1), FadeIn(l2), run_time=1.0)
            self.play(Write(f1), run_time=1.0)
            self.play(Create(p1), FadeIn(q1), run_time=0.7)
            self.play(Create(p2), FadeIn(q2), run_time=0.7)
            self.wait(vo.duration * 0.1)
            self.play(Write(f2), run_time=1.2)

        with self.voiceover("The ear spans a factor of ten million in intensity, so loudness is measured in decibels: ten times the log of I over I nought. Multiply the intensity by ten, and you add ten decibels. Multiply by a hundred, and you add twenty.") as vo:
            self.clear_scene(0.5)
            b = M(r"\beta = 10\log_{10}\frac{I}{I_0}\ \text{dB}", 58).move_to(P(0, 2.5))
            bn = M(r"I_0 = 10^{-12}\ \text{W/m}^2 \ \ (\text{threshold of hearing})", 34, color=MUTED)
            bn.move_to(P(0, 1.35))
            r1 = M(r"I \times 10 \;\Rightarrow\; +10\ \text{dB}", 44).move_to(P(0, 0.3))
            r2 = M(r"I \times 100 \;\Rightarrow\; +20\ \text{dB}", 44).move_to(P(0, -0.6))
            self.play(Write(b), run_time=1.3)
            self.play(FadeIn(bn), run_time=0.6)
            self.wait(vo.duration * 0.25)
            self.play(FadeIn(r1, shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.05)
            self.play(FadeIn(r2, shift=0.15 * UP), run_time=0.7)
        with self.voiceover("So doubling the intensity adds only about three decibels. One machine gives seventy "
                            "decibels. Two identical machines together give seventy three, not one hundred "
                            "forty.") as vo:
            r3 = M(r"I \times 2 \;\Rightarrow\; +3\ \text{dB}", 44, color=HL).move_to(P(0, -1.5))
            m1 = M(r"70\ \text{dB} \;\&\; 70\ \text{dB} \;\to\; 73\ \text{dB}", 44, color=GREEN).move_to(P(-2.4, -2.8))
            c1 = check().next_to(m1, RIGHT, buff=0.3)
            m2 = M(r"140\ \text{dB}", 44, color=WARN).move_to(P(3.6, -2.8))
            c2 = cross_mark().next_to(m2, RIGHT, buff=0.25)
            self.play(FadeIn(r3, shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.15)
            self.play(Write(m1), FadeIn(c1), run_time=1.2)
            self.play(FadeIn(m2), FadeIn(c2), run_time=0.7)

    # ------------------------------------------------------------ scene 4: pipes
    def s4(self):
        hdr = T("Standing waves in an air column", 34, color=PRIMARY, weight="BOLD").move_to(P(0, 3.1))
        x0, x1, y, h = -4.2, 4.2, 0.9, 1.5
        pp = pipe(x0, x1, y, h, closed_left=True)
        ph = ValueTracker(0.0)
        a = 0.55
        live = always_redraw(lambda: curve(
            lambda x: y + a * np.sin(PI / 2 * (x - x0) / (x1 - x0)) * np.cos(ph.get_value()),
            x0, x1, PRES_C, 5))
        env = envelope(x0, x1, y, a, lambda u: np.sin(PI / 2 * u), color=DISP_C, sw=3)
        env.set_stroke(opacity=0.6)
        nl = M("N", 48, color=PRES_C).move_to(P(x0, y - h / 2 - 0.45))
        al = M("A", 48, color=GREEN).move_to(P(x1, y - h / 2 - 0.45))
        nc = T("closed end: air cannot move", 26, color=PRES_C).move_to(P(-3.3, -1.25))
        nc2 = T("displacement node", 26, color=PRES_C).next_to(nc, DOWN, buff=0.15)
        ac = T("open end: air moves freely", 26, color=GREEN).move_to(P(3.3, -1.25))
        ac2 = T("displacement antinode", 26, color=GREEN).next_to(ac, DOWN, buff=0.15)
        with self.voiceover("Trap sound in a tube, and reflections from the ends build standing waves, just as on a string. A closed end stops the air: a displacement node. An open end lets the air move freely: a displacement antinode.") as vo:
            self.play(FadeIn(hdr), FadeIn(pp), run_time=0.9)
            self.add(live)
            self.play(Create(env), ph.animate.set_value(4 * PI), run_time=3.0, rate_func=linear)
            self.play(FadeIn(nl), FadeIn(nc), FadeIn(nc2), ph.animate.set_value(6 * PI), run_time=1.5,
                      rate_func=linear)
            self.play(FadeIn(al), FadeIn(ac), FadeIn(ac2), ph.animate.set_value(8 * PI), run_time=1.5,
                      rate_func=linear)
        live.clear_updaters()

        with self.voiceover("A pipe closed at one end must fit a node and an antinode: a quarter wavelength, three quarters, five quarters. Only odd harmonics. A pipe open at both ends fits whole half wavelengths, and keeps them all.") as vo:
            self.clear_scene(0.5)
            h1 = T("closed at one end", 30, color=PRES_C, weight="BOLD").move_to(P(-3.6, 3.1))
            h2 = T("open at both ends", 30, color=GREEN, weight="BOLD").move_to(P(3.4, 3.1))
            self.play(FadeIn(h1), FadeIn(h2), run_time=0.6)
            rows_c, rows_o = VGroup(), VGroup()
            for i, (m, lab) in enumerate([(1, "f_1"), (3, "3f_1"), (5, "5f_1")]):
                yy = 2.0 - 1.35 * i
                g = VGroup(pipe(-5.8, -1.4, yy, 0.8, closed_left=True),
                           envelope(-5.8, -1.4, yy, 0.3, lambda u, m=m: np.sin(m * PI / 2 * u)),
                           M(lab, 34).move_to(P(-6.35, yy)))
                rows_c.add(g)
            for i, (n, lab) in enumerate([(1, "f_1"), (2, "2f_1"), (3, "3f_1")]):
                yy = 2.0 - 1.35 * i
                g = VGroup(pipe(1.4, 5.8, yy, 0.8),
                           envelope(1.4, 5.8, yy, 0.3, lambda u, n=n: np.abs(np.cos(n * PI * u))),
                           M(lab, 34).move_to(P(0.85, yy)))
                rows_o.add(g)
            fc = M(r"f = \frac{(2n-1)\,v}{4L}", 44, color=PRES_C).move_to(P(-3.6, -2.35))
            fo = M(r"f = \frac{n\,v}{2L}", 44, color=GREEN).move_to(P(3.6, -2.35))
            tc = T("odd harmonics only", 26, color=MUTED).move_to(P(-3.6, -3.35))
            to = T("all harmonics", 26, color=MUTED).move_to(P(3.6, -3.35))
            for r in rows_c:
                self.play(FadeIn(r), run_time=0.6)
            self.play(Write(fc), FadeIn(tc), run_time=0.9)
            self.wait(vo.duration * 0.1)
            self.play(LaggedStart(*[FadeIn(r) for r in rows_o], lag_ratio=0.4), run_time=1.5)
            self.play(Write(fo), FadeIn(to), run_time=0.9)

        with self.voiceover("An eighty five centimetre pipe, closed at one end: the fundamental is v over four L, three forty over three point four, one hundred hertz. Then three hundred and five hundred, never two hundred.") as vo:
            self.clear_scene(0.5)
            g0 = T("Closed pipe, L = 85 cm, v = 340 m/s", 32, color=PRIMARY).move_to(P(0, 2.6))
            g1 = M(r"f_1 = \frac{v}{4L} = \frac{340}{4\times 0.85} = 100\ \text{Hz}", 50).move_to(P(0, 1.1))
            g2 = M(r"3f_1 = 300\ \text{Hz},\qquad 5f_1 = 500\ \text{Hz}", 46, color=GREEN).move_to(P(0, -0.4))
            g3 = M(r"200\ \text{Hz}", 46, color=WARN).move_to(P(-0.5, -1.7))
            g3x = cross_mark().next_to(g3, RIGHT, buff=0.3)
            self.play(FadeIn(g0), run_time=0.6)
            self.play(Write(g1), run_time=1.5)
            self.wait(vo.duration * 0.15)
            self.play(Write(g2), run_time=1.2)
            self.play(FadeIn(g3), FadeIn(g3x), run_time=0.6)

        with self.voiceover("In the resonance tube, a five hundred twelve hertz fork resonates at sixteen and at fifty centimetres. Successive resonances are half a wavelength apart, so the end correction cancels: lambda is sixty eight centimetres, and v is about three hundred forty eight metres per second.") as vo:
            self.clear_scene(0.5)
            top, bot = 2.3, -3.1
            sc = 0.06
            tubes = VGroup()
            for xc, ell, m in ((-5.2, 16, 1), (-2.8, 50, 3)):
                wy = top - ell * sc
                wall = VGroup(Line(P(xc - 0.35, top), P(xc - 0.35, bot), color=INK, stroke_width=4),
                              Line(P(xc + 0.35, top), P(xc + 0.35, bot), color=INK, stroke_width=4),
                              Line(P(xc - 0.35, bot), P(xc + 0.35, bot), color=INK, stroke_width=4))
                air = Rectangle(width=0.7, height=top - wy, stroke_width=0).set_fill(AIR_C, 1)
                air.move_to(P(xc, (top + wy) / 2))
                water = Rectangle(width=0.7, height=wy - bot, stroke_width=0).set_fill(WATER_C, 1)
                water.move_to(P(xc, (wy + bot) / 2))
                L = top - wy
                env = VGroup(*[ParametricFunction(
                    lambda u, sg=sg: P(xc + sg * 0.25 * np.sin(m * PI / 2 * u), wy + u * L, ),
                    t_range=[0, 1, 0.01], color=DISP_C, stroke_width=3) for sg in (1, -1)])
                br = BraceBetweenPoints(P(xc + 0.4, top), P(xc + 0.4, wy), direction=RIGHT, color=MUTED)
                bl = T(f"{ell} cm", 24).next_to(br, RIGHT, buff=0.1)
                tubes.add(VGroup(air, water, wall, env, br, bl))
            fork = T("512 Hz fork", 28, color=PRIMARY).move_to(P(-4.0, 3.05))
            q1 = M(r"\lambda = 2(\ell_2 - \ell_1) = 2(50 - 16) = 68\ \text{cm}", 40).move_to(P(2.7, 1.5))
            q2 = M(r"v = f\lambda = 512 \times 0.68 \approx 348\ \text{m/s}", 40, color=GREEN).move_to(P(2.7, 0.2))
            q3 = M(r"e = \frac{\ell_2 - 3\ell_1}{2} = 1\ \text{cm}", 40, color=MUTED).move_to(P(2.7, -1.2))
            for q in (q1, q2, q3):
                fit(q, 6.6)
            self.play(FadeIn(fork), FadeIn(tubes[0]), run_time=0.9)
            self.play(FadeIn(tubes[1]), run_time=0.9)
            self.wait(vo.duration * 0.15)
            self.play(Write(q1), run_time=1.4)
            self.play(Write(q2), run_time=1.2)
            self.play(FadeIn(q3), run_time=0.7)

    # ------------------------------------------------------------ scene 5: beats
    def s5(self):
        f1, f2 = 10.0, 12.0
        xa, xb = -5.4, 6.0
        ta, tb = 0.25, 1.25

        def tt(x):
            return ta + (x - xa) / (xb - xa) * (tb - ta)

        y1, y2, ys = 2.35, 1.3, -0.45
        w1 = curve(lambda x: y1 + 0.38 * np.sin(2 * PI * f1 * tt(x)), xa, xb, DISP_C, 3, 800)
        w2 = curve(lambda x: y2 + 0.38 * np.sin(2 * PI * f2 * tt(x)), xa, xb, ALT_C, 3, 800)
        ws = curve(lambda x: ys + 0.38 * (np.sin(2 * PI * f1 * tt(x)) + np.sin(2 * PI * f2 * tt(x))),
                   xa, xb, INK, 3, 800)
        env = VGroup(*[DashedVMobject(curve(lambda x, sg=sg: ys + sg * 0.76 * np.abs(np.cos(PI * (f1 - f2) * tt(x))),
                                            xa, xb, PRES_C, 3), num_dashes=60) for sg in (1, -1)])
        labs = VGroup(M("f_1", 36, color=DISP_C).move_to(P(-6.2, y1)),
                      M("f_2", 36, color=ALT_C).move_to(P(-6.2, y2)),
                      T("sum", 26).move_to(P(-6.2, ys)))
        cap = T("slowed down: 10 Hz and 12 Hz", 24, color=MUTED).move_to(P(0, 3.3))
        with self.voiceover("Strike two tuning forks of two hundred fifty six and two hundred sixty hertz. You do "
                            "not hear two notes. You hear one note whose loudness throbs: loud, soft, loud, four "
                            "times a second.") as vo:
            self.play(FadeIn(cap), Create(w1), FadeIn(labs[0]), run_time=1.2)
            self.play(Create(w2), FadeIn(labs[1]), run_time=1.2)
            self.wait(vo.duration * 0.1)
            self.play(Create(ws), FadeIn(labs[2]), run_time=1.6)
            self.play(Create(env), run_time=1.0)

        fm = M(r"y = \underbrace{2A\cos\big(\pi(f_1 - f_2)t\big)}_{\text{slow envelope}}\;"
               r"\underbrace{\sin\big(\pi(f_1 + f_2)t\big)}_{\text{average pitch}}", 40)
        fit(fm, 12.4).move_to(P(0, -2.65))
        with self.voiceover("Add the two tones, and the sum to product identity splits the result into a fast "
                            "wave at the average frequency, times a slow envelope.") as vo:
            self.wait(vo.duration * 0.15)
            self.play(Write(fm), run_time=2.0)

        xs = [xa + (t0 - ta) / (tb - ta) * (xb - xa) for t0 in (0.5, 1.0)]
        loud = VGroup(*[VGroup(Dot(P(x, ys + 0.76), color=HL, radius=0.1),
                               Dot(P(x, ys - 0.76), color=HL, radius=0.1)) for x in xs])
        fb = M(r"f_{\text{beat}} = |f_1 - f_2|", 52, color=PRIMARY).move_to(P(-2.2, -2.55))
        fbn = M(r"256 \ \&\ 260\ \text{Hz} \Rightarrow 4\ \text{beats/s}", 38, color=MUTED).move_to(P(3.6, -2.55))
        with self.voiceover("The envelope has half the difference as its frequency, but loudness peaks at both its plus one and its minus one. So the beat frequency is the full difference.") as vo:
            self.wait(vo.duration * 0.2)
            self.play(LaggedStart(*[FadeIn(l, scale=1.6) for l in loud], lag_ratio=0.5), run_time=1.2)
            self.wait(vo.duration * 0.2)
            self.play(FadeOut(fm), run_time=0.4)
            self.play(Write(fb), run_time=1.0)
            self.play(FadeIn(fbn), run_time=0.6)

        with self.voiceover("Which fork is higher? Wax lowers a fork, filing raises it. Fork A, at two fifty six, gives four beats with B. Wax B, and the beats rise to six. If B were two sixty, wax would bring it closer and the beats would fall. So B is two fifty two.") as vo:
            self.clear_scene(0.5)
            h = T("Wax lowers a fork's frequency; filing raises it", 30, color=PRIMARY, weight="BOLD")
            fit(h, 12.5).move_to(P(0, 2.9))
            r0 = M(r"f_A = 256\ \text{Hz},\ 4\ \text{beats} \;\Rightarrow\; f_B = 252 \ \text{or}\ 260\ \text{Hz}",
                   42).move_to(P(0, 1.7))
            r1 = M(r"260 \xrightarrow{\text{wax}} \text{closer to } 256 \Rightarrow \text{fewer beats}", 40)
            r1.move_to(P(-0.4, 0.4))
            x1 = cross_mark().next_to(r1, RIGHT, buff=0.3)
            r2 = M(r"252 \xrightarrow{\text{wax}} 250 \Rightarrow 6\ \text{beats}", 40).move_to(P(-0.4, -0.9))
            c2 = check().next_to(r2, RIGHT, buff=0.3)
            res = M(r"f_B = 252\ \text{Hz}", 54, color=GREEN).move_to(P(0, -2.3))
            self.play(FadeIn(h), run_time=0.6)
            self.wait(vo.duration * 0.08)
            self.play(Write(r0), run_time=1.3)
            self.wait(vo.duration * 0.12)
            self.play(Write(r1), FadeIn(x1), run_time=1.3)
            self.wait(vo.duration * 0.05)
            self.play(Write(r2), FadeIn(c2), run_time=1.2)
            self.play(Write(res), run_time=0.8)

    # ------------------------------------------------------------ scene 6: Doppler
    def s6(self):
        v, vs, Tp, x_start, max_age = 1.6, 0.8, 0.5, -3.2, 2.05
        clock = ValueTracker(0.0)

        def src_x(t):
            return x_start + vs * t

        def fronts():
            t = clock.get_value()
            g = VGroup()
            n = int(np.floor(t / Tp + 1e-9))
            for i in range(n + 1):
                te = i * Tp
                age = t - te
                if age <= 0.02 or age > max_age:
                    continue
                op = 1.0 - (age / max_age) ** 3
                g.add(Circle(radius=v * age, color=PRES_C, stroke_width=3, stroke_opacity=op)
                      .move_to(P(src_x(te), 0)))
            return g

        waves = always_redraw(fronts)
        src = always_redraw(lambda: RoundedRectangle(width=0.55, height=0.32, corner_radius=0.08, color=INK,
                                                     stroke_width=2).set_fill(PRES_C, 1)
                            .move_to(P(src_x(clock.get_value()), 0)))
        line = Line(P(-6.6, 0), P(6.6, 0), color=GRID, stroke_width=2)
        oa = Dot(P(5.6, 0), radius=0.13, color=GREEN)
        ob = Dot(P(-6.3, 0), radius=0.13, color=ALT_C)
        la = T("ahead: higher pitch", 26, color=GREEN).move_to(P(4.4, 3.45))
        lb = T("behind: lower pitch", 26, color=ALT_C).move_to(P(-4.4, 3.45))
        with self.voiceover("An ambulance races past. As it approaches, the siren sounds high; the moment it passes, the pitch drops. The siren never changed. What changed is how often its crests reach your ear.") as vo:
            self.add(line, waves, src)
            self.play(FadeIn(oa), FadeIn(ob), run_time=0.5)
            self.play(clock.animate.set_value(2.6), run_time=2.6 / 0.8, rate_func=linear)
            self.play(FadeIn(la), FadeIn(lb), clock.animate.set_value(4.0), run_time=1.4 / 0.8, rate_func=linear)
        waves.clear_updaters()
        src.clear_updaters()

        sa = Line(P(0.4, 0), P(0.8, 0), color=HL, stroke_width=12)
        sb = Line(P(-3.6, 0), P(-2.4, 0), color=ALT_C, stroke_width=12)
        fa = M(r"\lambda' = \frac{v - v_s}{f}", 40, color=HL)
        fa.move_to(P(4.4, -3.1))
        fbm = M(r"\lambda' = \frac{v + v_s}{f}", 40, color=ALT_C)
        fbm.move_to(P(-4.8, -3.1))
        with self.voiceover("Each crest is a circle centred where the source was when it emitted it. The source chases its own crests, so ahead of it they are squashed to v minus v s, over f. Behind, they spread out.") as vo:
            self.wait(vo.duration * 0.3)
            self.play(Create(sa), run_time=0.6)
            self.play(Write(fa), run_time=1.0)
            self.wait(vo.duration * 0.1)
            self.play(Create(sb), run_time=0.6)
            self.play(Write(fbm), run_time=1.0)

        with self.voiceover("A moving observer is different: the wavelength is unchanged, but they meet the "
                            "crests faster, at v plus v o. Combine the two. F prime equals f, times v plus v o, "
                            "over v minus v s, with each speed positive when it moves towards the other.") as vo:
            self.clear_scene(0.5)
            o1 = M(r"\text{moving observer: same wavelength, meets crests at } v + v_o", 38, color=MUTED)
            o1.move_to(P(0, 2.7))
            fit(o1, 12.5)
            g = M(r"f' = f\,\frac{v + v_o}{v - v_s}", 72).move_to(P(0, 0.9))
            bx = SurroundingRectangle(g, buff=0.3, corner_radius=0.15, color=PRIMARY, stroke_width=3)
            n1 = T("speeds relative to the air; towards the other = positive", 28, color=PRIMARY).move_to(P(0, -0.9))
            self.play(FadeIn(o1), run_time=0.8)
            self.wait(vo.duration * 0.25)
            self.play(Write(g), run_time=1.6)
            self.play(Create(bx), run_time=0.5)
            self.play(FadeIn(n1), run_time=0.7)

        with self.voiceover("A five hundred hertz siren at twenty metres per second. Approaching: five hundred, times three forty over three twenty, about five hundred thirty one hertz. Receding: three forty over three sixty, about four hundred seventy two. A steady high note, then a sudden drop.") as vo:
            self.play(FadeOut(o1), FadeOut(n1), VGroup(g, bx).animate.scale(0.7).move_to(P(0, 2.6)), run_time=0.7)
            d1 = M(r"\text{approaching: } 500\times\frac{340}{340 - 20} \approx 531\ \text{Hz}", 44, color=GREEN)
            d1.move_to(P(0, 0.6))
            d2 = M(r"\text{receding: } 500\times\frac{340}{340 + 20} \approx 472\ \text{Hz}", 44, color=ALT_C)
            d2.move_to(P(0, -1.0))
            d3 = T("steady high, then a sudden drop as it passes", 28, color=MUTED).move_to(P(0, -2.5))
            self.play(Write(d1), run_time=1.5)
            self.wait(vo.duration * 0.15)
            self.play(Write(d2), run_time=1.5)
            self.play(FadeIn(d3), run_time=0.6)

    # ------------------------------------------------------------ scene 7: recap
    def s7(self):
        title = T("Chapter 2 in six lines", 38, color=PRIMARY, weight="BOLD").move_to(P(0, 3.2))
        lines = [
            (r"\Delta p = -B\,\frac{\partial s}{\partial x}", "pressure 90° from displacement"),
            (r"v = \sqrt{\gamma RT/M}", "adiabatic; grows as √T, not with p"),
            (r"\beta = 10\log_{10}(I/I_0)", "×10 is +10 dB, ×2 is +3 dB"),
            (r"\frac{(2n-1)v}{4L}\ \ \text{vs}\ \ \frac{nv}{2L}", "closed end node: odd harmonics only"),
            (r"f_{\text{beat}} = |f_1 - f_2|", "wax lowers, filing raises"),
            (r"f' = f\,\frac{v + v_o}{v - v_s}", "towards is positive, relative to air"),
        ]
        rows = VGroup()
        for i, (tex, note) in enumerate(lines):
            m = M(tex, 36)
            n = T(note, 25, color=MUTED)
            num = T(f"{i + 1}.", 28, color=PRIMARY, weight="BOLD")
            rows.add(VGroup(num, m, n))
        for r in rows:
            r[0].move_to(P(-6.2, 0))
            r[1].next_to(r[0], RIGHT, buff=0.3)
        rows.arrange(DOWN, buff=0.26, aligned_edge=LEFT).move_to(P(0, -0.15))
        for r in rows:
            r[0].set_x(-6.2)
            r[1].next_to(r[0], RIGHT, buff=0.3)
            r[2].move_to(P(0, r[1].get_y()))
            r[2].align_to(P(0.6, 0), LEFT)
            fit(r[2], 6.1)
        with self.voiceover("To recap. Sound is squeezed air, with pressure a quarter cycle from displacement. Its speed is stiffness over inertia, adiabatic in a gas, and grows as root T.") as vo:
            self.play(FadeIn(title), run_time=0.6)
            self.play(FadeIn(rows[0], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.3)
            self.play(FadeIn(rows[1], shift=0.15 * UP), run_time=0.7)
        with self.voiceover("Decibels are logarithms of intensity. The ends of a pipe choose its wavelengths. "
                            "Beats count the difference in frequency. And motion squashes or stretches the "
                            "crests.") as vo:
            for r in rows[2:]:
                self.play(FadeIn(r, shift=0.15 * UP), run_time=0.6)
                self.wait(vo.duration * 0.08)
        with self.voiceover("Try the mastery quiz. Then chapter three turns to matter in bulk: stretching solids, fluids that press and flow, and the skins on liquid surfaces.") as vo:
            nxt = T("Next: Chapter 3 · Properties of Matter", 32, color=PRIMARY).move_to(P(0, -3.45))
            self.wait(vo.duration * 0.3)
            self.play(FadeIn(nxt, shift=0.2 * UP), run_time=0.8)
