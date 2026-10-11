import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

# Chapter colour roles (light background).
NUC = PRIMARY  # nucleus, protons, positive charge = strawberry red
NEU = SECONDARY  # neutrons = teal
ALPHA = ACCENT  # alpha particles, X-ray photons = amber
ELEC = PURPLE  # electrons, Lyman series
HL = ManimColor("#D19A00")  # highlight gold
NA = "[[char LTRL]]A[[char NORM]]"  # nucleon number, spelled as a letter for `say`
WARN = PRIMARY
LYMAN = PURPLE  # ultraviolet
BALMER = PRIMARY  # visible
PASCHEN = ACCENT  # infrared


# ---------------------------------------------------------------- helpers
def T(s, size=30, **kw):
    return Text(s, font_size=size, **kw)


def M(s, size=40, **kw):
    return MathTex(s, font_size=size, **kw)


def fit(mob, w):
    if mob.width > w:
        mob.scale_to_fit_width(w)
    return mob


def P(x, y):
    return np.array([x, y, 0.0])


def vec(start, end, color, sw=6, tip=0.18):
    return Arrow(start, end, buff=0, color=color, stroke_width=sw,
                 max_tip_length_to_length_ratio=tip, max_stroke_width_to_length_ratio=12)


def check():
    return MathTex(r"\checkmark", color=GREEN, font_size=56)


def cross_mark():
    return MathTex(r"\times", color=WARN, font_size=64)


def card(mob, pad=0.25, color=MUTED):
    box = SurroundingRectangle(mob, buff=pad, corner_radius=0.15, color=color, stroke_width=2)
    box.set_fill(WHITE, opacity=0.85)
    return VGroup(box, mob)


def particle(color, r=0.11):
    return Circle(radius=r, color=INK, stroke_width=1.5).set_fill(color, 1)


def cluster(R, center, r=0.12, seed=0, frac_p=0.45):
    """A nucleus drawn as hex-packed protons (red) and neutrons (teal)."""
    rng = np.random.default_rng(seed)
    g = VGroup()
    s = 2 * r * 0.98
    n = int(R / s) + 2
    for i in range(-n, n + 1):
        for j in range(-n, n + 1):
            x = (i + 0.5 * (j % 2)) * s
            y = j * s * np.sqrt(3) / 2
            if x * x + y * y <= (R - r * 0.7) ** 2:
                c = NUC if rng.random() < frac_p else NEU
                g.add(particle(c, r).move_to(center + P(x, y)))
    return g


def squiggle(start, end, color, waves=5, amp=0.1, sw=4):
    """A photon: a wavy line with an arrow head."""
    d = end - start
    L = np.linalg.norm(d)
    u = d / L
    nrm = np.array([-u[1], u[0], 0.0])
    wav = ParametricFunction(
        lambda t: start + u * (t * (L - 0.25)) + nrm * amp * np.sin(2 * np.pi * waves * t),
        t_range=[0, 1], color=color, stroke_width=sw)
    head = Arrow(end - 0.35 * u, end, buff=0, color=color, stroke_width=sw,
                 max_tip_length_to_length_ratio=0.6)
    return VGroup(wav, head)


def ruth_path(b, center, k=0.3, x0=-6.9):
    """Alpha trajectory past a fixed repulsive nucleus (velocity Verlet), in scene coordinates."""
    pos = np.array([x0 - center[0], b])
    v = np.array([1.0, 0.0])
    dt = 0.004

    def acc(p):
        d = np.linalg.norm(p)
        return k * p / d ** 3

    pts = []
    a = acc(pos)
    for i in range(12000):
        if i % 8 == 0:
            pts.append(center + P(pos[0], pos[1]))
        pos = pos + v * dt + 0.5 * a * dt * dt
        a2 = acc(pos)
        v = v + 0.5 * (a + a2) * dt
        a = a2
        sx, sy = pos[0] + center[0], pos[1] + center[1]
        if i > 50 and (sx > 6.9 or sx < -6.95 or sy > 3.0 or sy < -3.0):
            break
    pts.append(center + P(pos[0], pos[1]))
    return VMobject().set_points_smoothly(pts)


def level_y(E):
    """Hydrogen energy ladder, linear in E: -13.6 eV at y=-3.3, 0 at y=3.1."""
    return -3.3 + (E + 13.6) / 13.6 * 6.4


def En(n):
    return -13.6 / n ** 2


class OmpCh4Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Optics and Modern Physics",
            "Chapter 4 · Atoms and Nuclei",
            "Chapter four. Atoms and nuclei.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7, self.s8):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ scene 1: Rutherford
    def s1(self):
        foil = Rectangle(width=0.16, height=5.2, color=ACCENT, stroke_width=2).set_fill(ACCENT, 0.7)
        foil.move_to(P(1.4, -0.3))
        src = RoundedRectangle(width=1.3, height=1.0, corner_radius=0.1, color=INK, stroke_width=3)
        src.set_fill(ManimColor("#F3D9C9"), 1).move_to(P(-6.0, -0.3))
        srcl = T("alpha source", 22, color=MUTED).next_to(src, DOWN, buff=0.15)
        fl = T("gold foil", 22, color=ACCENT).next_to(foil, DOWN, buff=0.12)
        beams = VGroup()
        for i, y in enumerate(np.linspace(-1.9, 1.3, 9)):
            yy = y + 0.02 * i
            if i == 3:
                pts = [P(-5.3, -0.3), P(1.3, yy), P(6.6, yy + 0.7)]
            elif i == 6:
                pts = [P(-5.3, -0.3), P(1.3, yy), P(6.6, yy - 0.6)]
            else:
                pts = [P(-5.3, -0.3), P(1.3, yy), P(6.6, yy + (yy + 0.3) * 0.12)]
            beams.add(VMobject(color=ALPHA, stroke_width=3).set_points_as_corners(pts))
        back = VMobject(color=WARN, stroke_width=4).set_points_as_corners(
            [P(-5.3, -0.3), P(1.3, -0.1), P(-2.5, 2.1)])
        t1 = T("almost all go straight through", 28, color=INK).move_to(P(0, 3.2))
        t2 = T("about 1 in 8000 bounces back", 28, color=WARN).move_to(P(-2.6, 2.6))

        with self.voiceover("Geiger and Marsden fired alpha particles at a thin gold foil. Almost all went straight through,"
                            " but one in eight thousand bounced back.") as vo:
            self.play(FadeIn(src), FadeIn(srcl), FadeIn(foil), FadeIn(fl), run_time=1.0)
            self.play(LaggedStart(*[Create(b) for b in beams], lag_ratio=0.15), run_time=2.5)
            self.play(FadeIn(t1), run_time=0.6)
            self.wait(vo.duration * 0.2)
            self.play(Create(back), FadeIn(t2), run_time=1.4)

        C = P(0.6, -0.3)
        nuc = Dot(C, radius=0.2, color=NUC)
        nl = M(r"+", 30, color=WHITE).move_to(C)
        hdr = T("a tiny, heavy, positive nucleus", 30, color=PRIMARY, weight="BOLD").move_to(P(-3.0, 3.2))
        bs = [0.03, -0.3, 0.3, -0.7, 0.7, -1.3, 1.3, -2.2, 2.2]
        paths = VGroup(*[ruth_path(b, C).set_stroke(ALPHA, 3) for b in bs])
        paths[0].set_stroke(WARN, 4)
        cap = T("far away: barely bent      head-on: turned right round", 24, color=MUTED).move_to(P(0, -3.4))
        with self.voiceover("Rutherford compared it to a shell bouncing off tissue paper. Spread out charge could only nudge"
                            " an alpha, so the charge and nearly all the mass must sit in a tiny nucleus.") as vo:
            self.play(*[FadeOut(m) for m in (foil, fl, src, srcl, beams, back, t1, t2)], run_time=0.6)
            self.play(FadeIn(hdr), GrowFromCenter(nuc), FadeIn(nl), run_time=1.0)
        with self.voiceover("Most alphas pass far from any nucleus and barely bend. The rare one aimed almost "
                            "straight at it is turned right round.") as vo:
            self.play(LaggedStart(*[Create(p) for p in paths[1:]], lag_ratio=0.12), run_time=2.4)
            self.play(Create(paths[0]), run_time=1.4)
            self.play(FadeIn(cap), run_time=0.5)

        with self.voiceover("How close does a head on alpha get? All its kinetic energy becomes Coulomb potential energy. "
                            "For five mega electron volt alphas on gold, that is about forty five femtometres, far outside "
                            "the nucleus.") as vo:
            self.clear_scene(0.5)
            track = Line(P(-6.2, -1.4), P(5.6, -1.4), color=GRID, stroke_width=3)
            N0 = P(4.6, -1.4)
            n2 = Dot(N0, radius=0.16, color=NUC)
            n2l = M(r"Ze", 32, color=NUC).next_to(n2, UP, buff=0.2)
            al = Dot(P(-5.6, -1.4), radius=0.12, color=ALPHA)
            all_ = M(r"2e,\ K", 30, color=ALPHA).next_to(al, UP, buff=0.15)
            e1 = M(r"K = \frac{1}{4\pi\varepsilon_0}\,\frac{2Ze^2}{r_0}", 48).move_to(P(-3.4, 2.5))
            e2 = M(r"r_0 = \frac{2\times79\times1.44\ \text{MeV fm}}{5\ \text{MeV}} \approx 45\ \text{fm}", 40)
            fit(e2, 6.4)
            e2.move_to(P(3.0, 2.5))
            self.play(Create(track), FadeIn(n2), FadeIn(n2l), FadeIn(al), FadeIn(all_), run_time=0.8)
            all_.add_updater(lambda m: m.next_to(al, UP, buff=0.15))
            stop = P(0.6, -1.4)
            self.play(al.animate.move_to(stop), run_time=2.6, rate_func=rate_functions.ease_out_cubic)
            all_.clear_updaters()
            br = BraceBetweenPoints(stop, N0, direction=DOWN, color=INK)
            brl = M(r"r_0", 36).next_to(br, DOWN, buff=0.1)
            self.play(GrowFromCenter(br), FadeIn(brl), Write(e1), run_time=1.3)
            self.play(Write(e2), run_time=1.4)
            note = T("gold nucleus: radius about 7 fm", 26, color=GREEN).move_to(P(0, 0.6))
            self.play(FadeIn(note), run_time=0.6)

        with self.voiceover("But an orbiting electron is accelerating, so classical physics says it should radiate and "
                            "spiral in within ten to the minus eleven seconds. Real atoms are stable, and glow in sharp "
                            "lines.") as vo:
            self.clear_scene(0.5)
            O = P(-3.4, -0.2)
            core = Dot(O, radius=0.13, color=NUC)
            spiral = ParametricFunction(
                lambda t: O + 2.6 * (1 - t) ** 0.8 * np.array([np.cos(9 * np.pi * t), np.sin(9 * np.pi * t), 0]),
                t_range=[0, 0.97], color=ELEC, stroke_width=3)
            e = Dot(spiral.get_start(), radius=0.1, color=ELEC)
            r1 = T("classical prediction:", 26, color=MUTED)
            r2 = M(r"\text{spirals in within } \sim 10^{-11}\ \text{s}", 38)
            r3 = T("real atoms: stable, sharp lines", 28, color=WARN)
            col = VGroup(r1, r2, r3).arrange(DOWN, buff=0.45, aligned_edge=LEFT).move_to(P(3.2, 0.2))
            self.play(FadeIn(core), FadeIn(e), FadeIn(r1), run_time=0.6)
            self.play(MoveAlongPath(e, spiral), Create(spiral), FadeIn(r2), run_time=3.2,
                      rate_func=rate_functions.ease_in_quad)
            self.wait(vo.duration * 0.1)
            x = cross_mark().scale(0.7).next_to(r3, LEFT, buff=0.2)
            self.play(FadeIn(r3), FadeIn(x), run_time=0.7)

    # ------------------------------------------------------------ scene 2: Bohr
    def s2(self):
        O = P(-3.7, -0.3)
        orbits = VGroup(*[Circle(radius=0.33 * n * n, color=GRID if n != 2 else MUTED, stroke_width=3).move_to(O)
                          for n in (1, 2, 3)])
        core = Dot(O, radius=0.12, color=NUC)
        nlabs = VGroup(*[M(f"n={n}", 30, color=MUTED).move_to(O + P(0.33 * n * n + 0.05, 0) + P(0.35, -0.2))
                         for n in (1, 2, 3)])
        nlabs[0].move_to(O + P(0, -0.62))
        e = Dot(O + 1.32 * RIGHT, radius=0.1, color=ELEC)
        p1 = T("1. Stationary orbits: no radiation", 26)
        p2 = VGroup(T("2.", 26), M(r"mvr = n\,\frac{h}{2\pi}", 40)).arrange(RIGHT, buff=0.2)
        p3 = VGroup(T("3.", 26), M(r"h\nu = E_i - E_f", 40)).arrange(RIGHT, buff=0.2)
        col = VGroup(p1, p2, p3).arrange(DOWN, buff=0.5, aligned_edge=LEFT).move_to(P(3.4, 0.4))
        hdr = T("Bohr, 1913", 30, color=PRIMARY, weight="BOLD").move_to(P(3.4, 2.8))

        with self.voiceover("Bohr's fix was to forbid most orbits. In the allowed ones the electron does not radiate, and "
                            "angular momentum comes in whole units of h over two pi. Light leaves only when the electron "
                            "jumps down.") as vo:
            self.play(FadeIn(core), Create(orbits), FadeIn(nlabs), FadeIn(hdr), run_time=1.0)
            self.play(FadeIn(e), FadeIn(p1), run_time=0.6)
            self.play(Rotate(e, angle=3 * PI / 4, about_point=O), run_time=1.6)
            self.play(FadeIn(p2), run_time=0.6)
            self.wait(vo.duration * 0.12)
            d = np.array([np.cos(3 * PI / 4), np.sin(3 * PI / 4), 0])
            self.play(e.animate.move_to(O + 0.33 * d), run_time=0.6)
            ph = squiggle(O + 0.5 * d + 0.3 * DOWN, O + 2.0 * d + 1.0 * DOWN + 0.2 * LEFT, ALPHA, waves=4, amp=0.08)
            phl = M(r"h\nu", 32, color=ALPHA).next_to(ph, DOWN, buff=0.05)
            self.play(Create(ph), FadeIn(phl), FadeIn(p3), run_time=1.0)

        with self.voiceover("Why those orbits? The electron is a wave of wavelength h over m v, and a whole number of "
                            "wavelengths must fit round the orbit. That is exactly m v r equals n h over two pi.") as vo:
            self.clear_scene(0.5)
            C = P(-3.4, -0.3)
            R = 2.1
            base = DashedVMobject(Circle(radius=R, color=MUTED, stroke_width=2).move_to(C), num_dashes=40)
            wave = ParametricFunction(
                lambda t: C + (R + 0.25 * np.sin(4 * t)) * np.array([np.cos(t), np.sin(t), 0]),
                t_range=[0, TAU], color=ELEC, stroke_width=4)
            c0 = Dot(C, radius=0.1, color=NUC)
            w1 = M(r"\lambda = \frac{h}{mv}", 44).move_to(P(3.2, 2.2))
            w2 = M(r"2\pi r = n\lambda", 44).move_to(P(3.2, 0.9))
            w3 = M(r"\Rightarrow\ mvr = n\,\frac{h}{2\pi}", 44, color=GREEN).move_to(P(3.2, -0.4))
            wc = T("n = 4: four wavelengths fit", 24, color=MUTED).move_to(P(3.2, -1.6))
            self.play(FadeIn(c0), Create(base), run_time=0.6)
            self.play(Write(w1), run_time=0.9)
            self.play(Create(wave), run_time=2.4)
            self.play(Write(w2), FadeIn(wc), run_time=1.0)
            self.wait(vo.duration * 0.1)
            self.play(Write(w3), run_time=1.0)

        with self.voiceover("Add Coulomb force equals centripetal force: the radius grows as n squared over Z, the speed as "
                            "Z over n, and the energy is minus thirteen point six, Z squared over n squared, electron volts.") as vo:
            self.clear_scene(0.5)
            q1 = M(r"\frac{mv^2}{r} = \frac{kZe^2}{r^2}", 44)
            q2 = M(r"mvr = \frac{nh}{2\pi}", 44)
            top = VGroup(q1, q2).arrange(RIGHT, buff=1.6).move_to(P(0, 2.6))
            amp = M(r"+", 44, color=MUTED).move_to(top.get_center())
            r1 = M(r"r_n = 0.529\,\frac{n^2}{Z}\ \text{\AA}", 46).move_to(P(0, 1.0))
            r2 = M(r"v_n = 2.19\times10^6\,\frac{Z}{n}\ \text{m/s}", 46).move_to(P(0, -0.4))
            r3 = M(r"E_n = -13.6\,\frac{Z^2}{n^2}\ \text{eV}", 56, color=PRIMARY).move_to(P(0, -2.1))
            box = SurroundingRectangle(r3, buff=0.25, corner_radius=0.15, color=PRIMARY, stroke_width=3)
            self.play(Write(q1), FadeIn(amp), Write(q2), run_time=1.4)
            self.wait(vo.duration * 0.1)
            self.play(Write(r1), run_time=1.0)
            self.play(Write(r2), run_time=1.0)
            self.wait(vo.duration * 0.1)
            self.play(Write(r3), Create(box), run_time=1.4)

        with self.voiceover("The energy is negative because the electron is bound: hydrogen needs thirteen point six "
                            "electron volts to ionise. Kinetic energy is minus E, potential energy two E, so a higher orbit "
                            "has less kinetic energy but more total energy.") as vo:
            self.clear_scene(0.5)
            b1 = M(r"E_1 = -13.6\ \text{eV} \;\Rightarrow\; 13.6\ \text{eV to ionise}", 44).move_to(P(0, 2.6))
            b0 = T("negative = bound;  zero = free, at rest, far away", 26, color=MUTED).move_to(P(0, 1.7))
            b2 = M(r"K = -E, \qquad U = 2E", 52, color=PRIMARY).move_to(P(0, 0.4))
            rowL = VGroup(T("higher orbit:", 28),
                          M(r"K\downarrow", 44, color=SECONDARY),
                          M(r"E\uparrow", 44, color=GREEN)).arrange(RIGHT, buff=0.6).move_to(P(0, -1.1))
            note = T("less kinetic energy, more total energy (like a satellite)", 26,
                     color=MUTED).move_to(P(0, -2.1))
            self.play(Write(b1), run_time=1.2)
            self.play(FadeIn(b0), run_time=0.6)
            self.wait(vo.duration * 0.1)
            self.play(Write(b2), run_time=1.0)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(rowL), run_time=0.8)
            self.play(FadeIn(note), run_time=0.6)

    # ------------------------------------------------------------ scene 3: hydrogen spectrum
    def s3(self):
        x0, x1 = -5.8, -1.5
        levels = VGroup()
        nl = VGroup()
        el = VGroup()
        for n in (1, 2, 3, 4, 5, 6, 8):
            y = level_y(En(n))
            levels.add(Line(P(x0, y), P(x1, y), color=INK if n <= 4 else GRID, stroke_width=3))
            if n <= 4:
                nl.add(M(f"n={n}", 24, color=MUTED).move_to(P(x0 - 0.5, y)))
        yinf = level_y(0)
        levels.add(DashedLine(P(x0, yinf), P(x1, yinf), color=MUTED, stroke_width=2))
        nl.add(M(r"\infty", 28, color=MUTED).move_to(P(x0 - 0.5, yinf)))
        for E, s in ((-13.6, "-13.6"), (-3.4, "-3.4"), (-1.51, "-1.51"), (-0.85, "-0.85"), (0, "0")):
            el.add(M(s, 22, color=MUTED).next_to(P(x1, level_y(E)), RIGHT, buff=0.15))
        eh = T("E (eV)", 20, color=MUTED).move_to(P(-0.85, 3.6))

        def jump(ni, nf, x, color):
            return vec(P(x, level_y(En(ni))), P(x, level_y(En(nf))), color, sw=4, tip=0.3)

        ha = jump(3, 2, -4.1, BALMER)
        lyman = VGroup(*[jump(n, 1, x, LYMAN) for n, x in ((2, -5.5), (3, -5.2), (4, -4.9))])
        balmer = VGroup(*[jump(n, 2, x, BALMER) for n, x in ((4, -3.8), (5, -3.5), (6, -3.2))])
        paschen = VGroup(*[jump(n, 3, x, PASCHEN) for n, x in ((4, -2.6), (5, -2.2))])

        with self.voiceover("Each spectral line is one jump between two levels. From level three to two, the gap is one "
                            "point eight nine electron volts. Twelve forty over that is six fifty six nanometres: the red "
                            "line.") as vo:
            self.play(Create(levels), FadeIn(nl), FadeIn(el), FadeIn(eh), run_time=1.4)
            self.play(GrowArrow(ha), run_time=0.8)
            q1 = fit(M(r"h\nu = 13.6\left(\tfrac14 - \tfrac19\right) = 1.89\ \text{eV}", 40), 6.2).move_to(P(3.5, 2.6))
            q2 = fit(M(r"\lambda = \frac{1240}{1.89}\ \text{nm} \approx 656\ \text{nm}", 40, color=BALMER),
                     6.2).move_to(P(3.5, 1.3))
            self.play(Write(q1), run_time=1.4)
            self.wait(vo.duration * 0.1)
            self.play(Write(q2), run_time=1.2)

        leg = VGroup(
            T("Lyman: down to n = 1, ultraviolet", 24, color=LYMAN),
            T("Balmer: down to n = 2, visible", 24, color=BALMER),
            T("Paschen: down to n = 3, infrared", 24, color=PASCHEN),
        ).arrange(DOWN, buff=0.3, aligned_edge=LEFT).move_to(P(3.4, 2.3))
        with self.voiceover("Group the jumps by where they land: down to level one is Lyman, ultraviolet; down to two, "
                            "Balmer, visible; down to three, Paschen, infrared.") as vo:
            self.play(FadeOut(q1), FadeOut(q2), run_time=0.4)
            self.play(LaggedStart(*[GrowArrow(a) for a in lyman], lag_ratio=0.2), FadeIn(leg[0]), run_time=1.2)
            self.wait(vo.duration * 0.12)
            self.play(LaggedStart(*[GrowArrow(a) for a in balmer], lag_ratio=0.2), FadeIn(leg[1]), run_time=1.2)
            self.wait(vo.duration * 0.08)
            self.play(LaggedStart(*[GrowArrow(a) for a in paschen], lag_ratio=0.2), FadeIn(leg[2]), run_time=1.0)

        # spectrum strip for Balmer
        sx0, sx1 = 0.5, 6.5

        def lx(lam):
            return sx0 + (lam - 350) / (700 - 350) * (sx1 - sx0)

        sy = -0.6
        strip = Rectangle(width=sx1 - sx0, height=0.8, color=INK, stroke_width=2).set_fill(INK, 1)
        strip.move_to(P((sx0 + sx1) / 2, sy))
        cols = {656: "#E8473F", 486: "#38B6C9", 434: "#5B6CF0", 410: "#9A5CE0"}
        lines = VGroup()
        for lam, c in cols.items():
            lines.add(Line(P(lx(lam), sy - 0.38), P(lx(lam), sy + 0.38), color=ManimColor(c), stroke_width=5))
        crowd = VGroup()
        for n in range(7, 16):
            lam = 1 / (1 / 364.6 * (0.25 - 1 / n ** 2) / 0.25)
            crowd.add(Line(P(lx(lam), sy - 0.38), P(lx(lam), sy + 0.38), color=ManimColor("#B07BE8"),
                           stroke_width=2))
        limit = DashedLine(P(lx(364.6), sy - 0.5), P(lx(364.6), sy + 0.5), color=MUTED, stroke_width=3)
        labs = VGroup(
            M("656", 22, color=MUTED).next_to(P(lx(656), sy - 0.4), DOWN, buff=0.12),
            M("486", 22, color=MUTED).next_to(P(lx(486), sy - 0.4), DOWN, buff=0.12),
            M("434", 22, color=MUTED).next_to(P(lx(434), sy - 0.4), DOWN, buff=0.12),
            M("410", 22, color=MUTED).next_to(P(lx(410), sy + 0.4), UP, buff=0.12),
            M("365", 22, color=MUTED).next_to(P(lx(364.6), sy - 0.5), DOWN, buff=0.1),
        )
        nm = T("nm", 20, color=MUTED).next_to(labs[0], RIGHT, buff=0.15)
        sh = T("Balmer lines", 24, color=BALMER).move_to(P(4.6, 0.25))
        q3 = fit(M(r"n = \infty \to 2:\ \ \lambda = \frac{1240}{3.4} \approx 365\ \text{nm}", 38), 6.2)
        q3.move_to(P(3.5, -2.3))
        with self.voiceover("The Balmer lines crowd towards a limit: a jump from infinity, three point four electron volts, "
                            "or three sixty five nanometres.") as vo:
            self.play(FadeIn(strip), FadeIn(sh), run_time=0.6)
            self.play(LaggedStart(*[Create(l) for l in lines], lag_ratio=0.3),
                      LaggedStart(*[FadeIn(l) for l in labs[:4]], lag_ratio=0.3), FadeIn(nm), run_time=2.0)
            self.play(LaggedStart(*[Create(l) for l in crowd], lag_ratio=0.1), run_time=1.0)
            self.wait(vo.duration * 0.1)
            self.play(Create(limit), FadeIn(labs[4]), Write(q3), run_time=1.4)

        with self.voiceover("A gas excited to level four shows every pair of levels: six lines. One atom takes one route "
                            "down, so at most three photons. And a cold gas absorbs only from level one: just the Lyman "
                            "lines.") as vo:
            right = VGroup(leg, strip, sh, lines, crowd, limit, labs, nm, q3)
            self.play(FadeOut(right), FadeOut(lyman), FadeOut(balmer), FadeOut(paschen), FadeOut(ha), run_time=0.6)
            pairs = [(2, 1), (3, 1), (4, 1), (3, 2), (4, 2), (4, 3)]
            six = VGroup(*[jump(a, b, -5.5 + 0.45 * i, MUTED) for i, (a, b) in enumerate(pairs)])
            g1 = fit(M(r"\text{gas: } \frac{n(n-1)}{2} = \frac{4\cdot 3}{2} = 6\ \text{lines}", 40), 6.2)
            g1.move_to(P(3.4, 2.4))
            self.play(LaggedStart(*[GrowArrow(a) for a in six], lag_ratio=0.15), Write(g1), run_time=1.8)
            self.wait(vo.duration * 0.1)
            one = VGroup(jump(4, 3, -2.0, GREEN), jump(3, 2, -2.0, GREEN), jump(2, 1, -2.0, GREEN))
            g2 = fit(M(r"\text{one atom: at most } n-1 = 3", 40, color=GREEN), 6.2).move_to(P(3.4, 1.1))
            self.play(LaggedStart(*[GrowArrow(a) for a in one], lag_ratio=0.5), Write(g2), run_time=1.6)
            self.wait(vo.duration * 0.1)
            g3 = T("cold gas absorbs only from n = 1:", 26, color=LYMAN).move_to(P(3.4, -0.3))
            g4 = T("the Lyman lines", 26, color=LYMAN).next_to(g3, DOWN, buff=0.2)
            self.play(FadeIn(g3), FadeIn(g4), run_time=0.8)

    # ------------------------------------------------------------ scene 4: X-rays
    def s4(self):
        tube = RoundedRectangle(width=9.6, height=2.6, corner_radius=1.1, color=MUTED, stroke_width=3)
        tube.move_to(P(0, 1.4))
        fil = VMobject(color=INK, stroke_width=4).set_points_as_corners(
            [P(-4.0, 0.8 + 0.2 * i) + (0.18 * RIGHT if i % 2 else ORIGIN) for i in range(7)])
        fill = T("filament (cathode)", 22, color=MUTED).move_to(P(-3.0, 3.1))
        targ = Polygon(P(3.0, 0.6), P(3.6, 0.6), P(3.6, 2.4), P(3.0, 1.9), color=INK, stroke_width=3)
        targ.set_fill(ManimColor("#C9B6AD"), 1)
        tl = T("metal target (anode)", 22, color=MUTED).move_to(P(3.0, 3.1))
        elec = VGroup(*[Dot(P(-3.6, 1.4 + 0.15 * ((i % 3) - 1)), radius=0.07, color=ELEC) for i in range(6)])
        wire = VMobject(color=INK, stroke_width=3).set_points_as_corners(
            [P(-4.0, 0.8), P(-4.0, -0.6), P(-0.5, -0.6)])
        wire2 = VMobject(color=INK, stroke_width=3).set_points_as_corners(
            [P(0.5, -0.6), P(3.3, -0.6), P(3.3, 0.6)])
        # long thin plate = +, short thick plate = -: the filament (cathode) sits on the negative side.
        batt = VGroup(Line(P(-0.5, -0.4), P(-0.5, -0.8), color=INK, stroke_width=8),
                      Line(P(0.5, -0.25), P(0.5, -0.95), color=INK, stroke_width=4))
        bl = M(r"V \sim 20\text{--}100\ \text{kV}", 32).move_to(P(0, -1.35))
        xr = VGroup(squiggle(P(3.0, 1.0), P(1.6, -0.3), ALPHA, waves=4, amp=0.08),
                    squiggle(P(3.1, 0.9), P(2.4, -0.6), ALPHA, waves=4, amp=0.08))
        xrl = T("X-rays", 24, color=ALPHA).move_to(P(1.0, 0.55))
        c1 = VGroup(T("filament current", 26, color=INK), M(r"\to", 36), T("how many electrons", 26),
                    M(r"\to", 36), T("intensity", 26, color=PRIMARY)).arrange(RIGHT, buff=0.2)
        c2 = VGroup(T("voltage V", 26, color=INK), M(r"\to", 36), T("energy per electron", 26),
                    M(r"\to", 36), T("penetrating power", 26, color=PRIMARY)).arrange(RIGHT, buff=0.2)
        cc = VGroup(c1, c2).arrange(DOWN, buff=0.35, aligned_edge=LEFT).move_to(P(0, -2.75))
        fit(cc, 12.6)
        with self.voiceover("X-rays run the photoelectric effect backwards. Electrons from a hot filament are slammed into a"
                            " metal target by tens of kilovolts. The filament current sets the intensity, the voltage sets "
                            "the penetrating power.") as vo:
            self.play(Create(tube), Create(fil), FadeIn(targ), FadeIn(fill), FadeIn(tl), run_time=1.0)
            self.play(Create(wire), Create(wire2), FadeIn(batt), FadeIn(bl), run_time=0.8)
            self.play(LaggedStart(*[e.animate.move_to(P(2.95, e.get_y())) for e in elec], lag_ratio=0.15),
                      run_time=1.8, rate_func=rate_functions.ease_in_quad)
            self.play(FadeOut(elec), Create(xr), FadeIn(xrl), run_time=0.8)
            self.wait(vo.duration * 0.05)
            self.play(FadeIn(c1), run_time=0.7)
            self.wait(vo.duration * 0.12)
            self.play(FadeIn(c2), run_time=0.7)

        ax = Axes(x_range=[0, 0.12, 0.02], y_range=[0, 1.05, 0.25], x_length=7.0, y_length=4.6, tips=False,
                  axis_config={"color": INK, "stroke_width": 2, "tick_size": 0.06},
                  y_axis_config={"include_ticks": False})
        ax.move_to(P(-2.6, -0.4))
        xl = VGroup(*[M(f"{v:.2f}", 20, color=MUTED).next_to(ax.c2p(v, 0), DOWN, buff=0.12)
                      for v in (0.02, 0.04, 0.06, 0.08, 0.10)])
        xlab = M(r"\lambda\ (\text{nm})", 26, color=MUTED).next_to(ax.c2p(0.12, 0), DOWN, buff=0.35)
        ylab = T("intensity", 22, color=MUTED).next_to(ax.c2p(0, 1.05), RIGHT, buff=0.15)

        def spec(lm, h, peaks):
            def f(x):
                if x <= lm:
                    return 0.0
                c = (x / lm - 1) / x ** 2 * (4 * lm ** 2) * h
                if peaks:
                    c += 0.35 * np.exp(-((x - 0.071) / 0.0009) ** 2) + 0.22 * np.exp(-((x - 0.063) / 0.0009) ** 2)
                return c
            return ax.plot(f, x_range=[0.0005, 0.12, 0.0002], use_smoothing=False, color=PRIMARY, stroke_width=4)

        lm1, lm2 = 0.0413, 0.0207
        cont = spec(lm1, 0.55, False)
        full1 = spec(lm1, 0.55, True)
        full2 = spec(lm2, 0.72, True)
        cut = DashedLine(ax.c2p(lm1, 0), ax.c2p(lm1, 0.85), color=SECONDARY, stroke_width=3)
        cutl = M(r"\lambda_{\min}", 32, color=SECONDARY).next_to(ax.c2p(lm1, 0.85), UP, buff=0.1)
        e1 = M(r"eV = \frac{hc}{\lambda_{\min}}", 44).move_to(P(4.4, 2.4))
        e2 = M(r"\lambda_{\min} = \frac{1240}{V}\ \text{nm}", 44, color=SECONDARY).move_to(P(4.4, 1.0))
        e3 = fit(M(r"30\ \text{kV}:\ \lambda_{\min} \approx 0.041\ \text{nm}", 36), 4.4).move_to(P(4.4, -0.2))
        with self.voiceover("Stopping electrons gives a continuous spread of photons. The most energetic takes an electron's"
                            " whole energy, e V: a sharp cut-off at lambda min equals twelve forty over V nanometres. At "
                            "thirty kilovolts, point zero four one nanometres.") as vo:
            self.clear_scene(0.5)
            self.play(Create(ax), FadeIn(xl), FadeIn(xlab), FadeIn(ylab), run_time=0.8)
            self.play(Create(cont), run_time=1.6)
            self.wait(vo.duration * 0.1)
            self.play(Create(cut), FadeIn(cutl), Write(e1), run_time=1.2)
            self.wait(vo.duration * 0.1)
            self.play(Write(e2), run_time=1.0)
            self.play(Write(e3), run_time=1.0)

        ka = M(r"K_\alpha", 30, color=PURPLE).next_to(ax.c2p(0.071, 0.89), RIGHT, buff=0.08)
        kb = M(r"K_\beta", 30, color=PURPLE).next_to(ax.c2p(0.063, 0.9), UL, buff=0.02)
        with self.voiceover("On top sit sharp K alpha and K beta peaks, from electrons falling into the target's innermost "
                            "shell. Double the voltage: the cut-off halves, but the peaks stay put. They are fingerprints of"
                            " the target, with root nu proportional to Z minus one.") as vo:
            self.play(FadeOut(e1), FadeOut(e3), e2.animate.move_to(P(4.4, 2.6)), run_time=0.5)
            self.play(ReplacementTransform(cont, full1), FadeIn(ka), FadeIn(kb), run_time=1.4)
            self.wait(vo.duration * 0.15)
            dv = T("voltage doubled", 26, color=PRIMARY).move_to(P(4.4, 1.5))
            self.play(FadeIn(dv), run_time=0.4)
            cut2 = DashedLine(ax.c2p(lm2, 0), ax.c2p(lm2, 0.85), color=SECONDARY, stroke_width=3)
            self.play(ReplacementTransform(full1, full2), Transform(cut, cut2),
                      cutl.animate.next_to(ax.c2p(lm2, 0.85), UP, buff=0.1), run_time=2.0)
            r1 = T("cut-off: voltage only", 26, color=SECONDARY).move_to(P(4.4, 0.4))
            r2 = T("peaks: the target only", 26, color=PURPLE).move_to(P(4.4, -0.4))
            r3 = M(r"\sqrt{\nu} \propto (Z-1)", 40, color=PURPLE).move_to(P(4.4, -1.4))
            self.play(FadeIn(r1), run_time=0.5)
            self.play(FadeIn(r2), run_time=0.5)
            self.wait(vo.duration * 0.05)
            self.play(Write(r3), run_time=0.9)

    # ------------------------------------------------------------ scene 5: nuclear size and binding
    def s5(self):
        al = cluster(0.9, P(-2.6, 1.5), seed=1)
        cu = cluster(1.2, P(2.4, 1.5), seed=2)
        all_ = M(r"^{27}\text{Al}:\ 3.6\ \text{fm}", 34).next_to(al, DOWN, buff=0.3)
        cul = M(r"^{64}\text{Cu}:\ 4.8\ \text{fm}", 34).move_to(P(2.4, all_.get_y()))
        f1 = M(r"R = R_0\,A^{1/3}, \qquad R_0 = 1.2\ \text{fm}", 42).move_to(P(0, -1.0))
        f2 = fit(M(r"\rho = \frac{A\,m_u}{\tfrac43\pi R_0^3\,A} \approx 2.3\times10^{17}\ \text{kg/m}^3", 42), 12)
        f2.move_to(P(0, -2.5))
        with self.voiceover(f"A nucleus has a radius of one point two femtometres times {NA} to the one third, so volume and "
                            f"mass both grow as {NA}: every nucleus has the same huge density, about two point three times "
                            f"ten to the seventeen kilograms per cubic metre.") as vo:
            self.play(FadeIn(al, lag_ratio=0.02), FadeIn(all_), run_time=1.0)
            self.play(FadeIn(cu, lag_ratio=0.02), FadeIn(cul), run_time=1.0)
            self.play(Write(f1), run_time=1.2)
            self.wait(vo.duration * 0.15)
            self.play(Write(f2), run_time=1.6)
            canc = T("A cancels: the same density in every nucleus", 26, color=GREEN).move_to(P(0, -3.45))
            self.play(FadeIn(canc), run_time=0.6)

        parts = VGroup(particle(NUC, 0.22), particle(NUC, 0.22), particle(NEU, 0.22), particle(NEU, 0.22))
        parts.arrange(RIGHT, buff=0.35).move_to(P(-3.6, 2.2))
        he = VGroup(particle(NUC, 0.22).move_to(P(2.6, 2.42)), particle(NEU, 0.22).move_to(P(3.03, 2.42)),
                    particle(NEU, 0.22).move_to(P(2.6, 1.99)), particle(NUC, 0.22).move_to(P(3.03, 1.99)))
        pm = M(r"2p + 2n:\ 4.032980\ \text{u}", 34).next_to(parts, DOWN, buff=0.35)
        hm = M(r"^4\text{He}:\ 4.002603\ \text{u}", 34).move_to(P(2.8, pm.get_y()))
        gt = M(r">", 60, color=WARN).move_to(P(-0.2, 2.2))
        b1 = M(r"\Delta m = 0.030377\ \text{u}", 42).move_to(P(0, -0.2))
        b2 = M(r"BE = \Delta m \times 931.5\ \text{MeV} \approx 28.3\ \text{MeV}", 42).move_to(P(0, -1.4))
        b3 = M(r"BE/A \approx 7.07\ \text{MeV per nucleon}", 42, color=GREEN).move_to(P(0, -2.6))
        with self.voiceover("Weigh helium four. Its two protons and two neutrons, weighed separately, are heavier by point "
                            "oh three oh four atomic mass units. That missing mass is the binding energy: twenty eight point"
                            " three mega electron volts.") as vo:
            self.clear_scene(0.5)
            self.play(FadeIn(parts, lag_ratio=0.2), FadeIn(he), run_time=1.0)
            self.play(FadeIn(pm), FadeIn(hm), run_time=0.8)
            self.play(FadeIn(gt), run_time=0.5)
            self.wait(vo.duration * 0.1)
            self.play(Write(b1), run_time=1.0)
            self.wait(vo.duration * 0.12)
            self.play(Write(b2), run_time=1.4)
            self.play(Write(b3), run_time=1.0)

        ax = Axes(x_range=[0, 240, 40], y_range=[0, 10, 2], x_length=7.4, y_length=5.0, tips=False,
                  axis_config={"color": INK, "stroke_width": 2, "tick_size": 0.06})
        ax.move_to(P(-2.7, -0.5))
        xl = VGroup(*[M(f"{v}", 20, color=MUTED).next_to(ax.c2p(v, 0), DOWN, buff=0.12) for v in range(40, 241, 40)])
        yl = VGroup(*[M(f"{v}", 20, color=MUTED).next_to(ax.c2p(0, v), LEFT, buff=0.12) for v in range(2, 11, 2)])
        xlab = M("A", 28, color=MUTED).next_to(ax.c2p(240, 0), UP, buff=0.2)
        ylab = T("BE/A (MeV)", 22, color=MUTED).next_to(ax.c2p(0, 10), UP, buff=0.15)
        ylab.align_to(ax, LEFT)
        data = [(2, 1.11), (3, 2.57), (6, 5.33), (9, 6.46), (12, 7.68), (16, 7.98), (20, 8.03), (30, 8.45),
                (40, 8.55), (56, 8.79), (80, 8.71), (100, 8.6), (120, 8.5), (150, 8.3), (180, 8.05), (210, 7.8),
                (238, 7.57)]
        curve = VMobject(color=PRIMARY, stroke_width=4).set_points_smoothly([ax.c2p(a, b) for a, b in data])
        he4 = Dot(ax.c2p(4, 7.07), radius=0.07, color=PRIMARY)
        hel = M(r"^4\text{He}", 26).next_to(he4, LEFT, buff=0.1)
        fe = Dot(ax.c2p(56, 8.79), radius=0.08, color=HL)
        fel = M(r"^{56}\text{Fe}:\ 8.8", 28).next_to(fe, UP, buff=0.15)
        u = Dot(ax.c2p(238, 7.57), radius=0.08, color=HL)
        ul = M(r"\text{U}:\ 7.6", 28).next_to(u, UP, buff=0.15)
        with self.voiceover("Plot binding energy per nucleon against mass number. It climbs steeply, peaks near iron fifty "
                            "six at about eight point eight mega electron volts, then sinks slowly to seven point six for "
                            "uranium.") as vo:
            self.clear_scene(0.5)
            self.play(Create(ax), FadeIn(xl), FadeIn(yl), FadeIn(xlab), FadeIn(ylab), run_time=0.8)
            self.play(Create(curve), run_time=2.4)
            self.play(FadeIn(fe), FadeIn(fel), run_time=0.6)
            self.play(FadeIn(u), FadeIn(ul), run_time=0.6)

        fus = CurvedArrow(ax.c2p(6, 3.4), ax.c2p(40, 7.4), angle=-PI / 3, color=GREEN, stroke_width=5)
        fusl = T("fusion", 26, color=GREEN).next_to(ax.c2p(30, 4.6), RIGHT, buff=0.05)
        fis = CurvedArrow(ax.c2p(225, 6.6), ax.c2p(125, 7.6), angle=-PI / 4, color=SECONDARY, stroke_width=5)
        fisl = T("fission", 26, color=SECONDARY).move_to(ax.c2p(175, 5.9))
        q0 = T("towards the peak = energy out", 26, color=PRIMARY).move_to(P(4.2, 2.6))
        q1 = M(r"240\times7.6 \;\to\; 2\times120\times8.5", 34).move_to(P(4.2, 1.5))
        q2 = M(r"Q = 2040 - 1824 = 216\ \text{MeV}", 34, color=GREEN).move_to(P(4.2, 0.6))
        fit(q1, 4.8)
        fit(q2, 4.8)
        with self.voiceover("Any move towards the peak releases energy: fusion climbs the steep left side, fission the "
                            "gentle right. Split a nucleus of two hundred and forty at seven point six into two halves at "
                            "eight point five, and you release two hundred and sixteen mega electron volts.") as vo:
            self.play(FadeIn(q0), run_time=0.5)
            self.play(Create(fus), FadeIn(fusl), run_time=1.0)
            self.wait(vo.duration * 0.1)
            self.play(Create(fis), FadeIn(fisl), run_time=1.0)
            self.wait(vo.duration * 0.1)
            self.play(Write(q1), run_time=1.2)
            self.play(Write(q2), run_time=1.2)

    # ------------------------------------------------------------ scene 6: radioactivity
    def s6(self):
        rows = VGroup(
            VGroup(T("alpha", 28, color=ALPHA),
                   M(r"{}^{A}_{Z}\text{X} \to {}^{A-4}_{Z-2}\text{Y} + {}^4_2\text{He}", 42)),
            VGroup(T("beta minus", 28, color=ELEC),
                   M(r"n \to p + e^- + \bar\nu \qquad (Z+1,\ A \text{ same})", 42)),
            VGroup(T("gamma", 28, color=SECONDARY),
                   M(r"\text{excited nucleus} \to \text{same nucleus} + \gamma", 42)),
        )
        for i, r in enumerate(rows):
            y = 1.5 - 1.4 * i
            fit(r[1], 9.8)
            r[0].move_to(P(-5.3, y))
            r[1].next_to(P(-3.9, y), RIGHT, buff=0)
        hdr = T("Nuclei that fall apart on their own", 30, color=PRIMARY, weight="BOLD").move_to(P(0, 3.0))
        with self.voiceover("Some nuclei decay on their own. Alpha decay removes a helium nucleus: mass number drops by "
                            "four, Z by two. Beta minus turns a neutron into a proton, so Z rises by one. Gamma just sheds "
                            "energy.") as vo:
            self.play(FadeIn(hdr), run_time=0.6)
            self.play(FadeIn(rows[0]), run_time=0.8)
            self.wait(vo.duration * 0.15)
            self.play(FadeIn(rows[1]), run_time=0.8)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(rows[2]), run_time=0.8)

        ax = Axes(x_range=[0, 5, 1], y_range=[0, 1, 0.25], x_length=6.4, y_length=4.4, tips=False,
                  axis_config={"color": INK, "stroke_width": 2, "tick_size": 0.06})
        ax.move_to(P(-3.0, -0.5))
        xl = VGroup(*[M(f"{v}", 22, color=MUTED).next_to(ax.c2p(v, 0), DOWN, buff=0.12) for v in range(1, 6)])
        xlab = M(r"t\ /\ T_{1/2}", 26, color=MUTED).next_to(ax.c2p(5, 0), UP, buff=0.25)
        ylab = M(r"N/N_0", 26, color=MUTED).next_to(ax.c2p(0, 1), UP, buff=0.12)
        one = M("1", 22, color=MUTED).next_to(ax.c2p(0, 1), LEFT, buff=0.12)
        curve = ax.plot(lambda t: 2 ** (-t), x_range=[0, 5], color=PRIMARY, stroke_width=4)
        marks = VGroup()
        for k, lab in ((1, r"\frac12"), (2, r"\frac14"), (3, r"\frac18")):
            y = 2 ** (-k)
            marks.add(VGroup(
                DashedLine(ax.c2p(k, 0), ax.c2p(k, y), color=MUTED, stroke_width=2),
                DashedLine(ax.c2p(0, y), ax.c2p(k, y), color=MUTED, stroke_width=2),
                Dot(ax.c2p(k, y), radius=0.07, color=HL),
                M(lab, 36, color=INK).next_to(ax.c2p(k, y), UR, buff=0.08),
            ))
        d1 = M(r"\frac{dN}{dt} = -\lambda N", 42).move_to(P(3.7, 2.6))
        d2 = M(r"N = N_0\,e^{-\lambda t}", 46, color=PRIMARY).move_to(P(3.7, 1.4))
        d3 = M(r"T_{1/2} = \frac{\ln 2}{\lambda} = \frac{0.693}{\lambda}", 42).move_to(P(3.7, 0.1))
        with self.voiceover("No one can say when one nucleus will decay, but each has the same chance per second, lambda. So"
                            " N equals N nought, e to the minus lambda t, and the half life is point six nine three over "
                            "lambda.") as vo:
            self.clear_scene(0.5)
            self.play(Create(ax), FadeIn(xl), FadeIn(xlab), FadeIn(ylab), FadeIn(one), run_time=0.8)
            self.wait(vo.duration * 0.15)
            self.play(Write(d1), run_time=1.0)
            self.play(Write(d2), Create(curve), run_time=1.8)
            self.wait(vo.duration * 0.1)
            self.play(Write(d3), run_time=1.2)

        with self.voiceover("Each half life removes half of what is left, so after two, a quarter remains, not nothing. "
                            "Eight hundred to fifty becquerel in twenty days is four halvings: a half life of five days.") as vo:
            self.play(LaggedStart(*[FadeIn(m) for m in marks], lag_ratio=0.4), run_time=1.6)
            self.wait(vo.duration * 0.1)
            self.play(FadeOut(d1), FadeOut(d3), d2.animate.move_to(P(3.7, 2.7)), run_time=0.5)
            h1 = M(r"800 \to 50\ \text{Bq in 20 days}", 38).move_to(P(3.7, 1.5))
            h2 = M(r"\frac{800}{50} = 16 = 2^4", 40).move_to(P(3.7, 0.4))
            h3 = M(r"T_{1/2} = \frac{20}{4} = 5\ \text{days}", 42, color=GREEN).move_to(P(3.7, -0.8))
            self.play(Write(h1), run_time=1.0)
            self.play(Write(h2), run_time=1.0)
            self.play(Write(h3), run_time=1.0)

        with self.voiceover("To count a decay chain, start with alpha, the only one that changes the mass number. Uranium "
                            "two thirty eight to lead two oh six loses thirty two: eight alphas. They lower Z to seventy "
                            "six, but lead is eighty two: six beta decays. And heat never changes lambda.") as vo:
            self.clear_scene(0.5)
            c0 = M(r"{}^{238}_{\ 92}\text{U} \;\longrightarrow\; {}^{206}_{\ 82}\text{Pb}", 60).move_to(P(0, 2.5))
            c1 = M(r"\Delta A = 32 \;\Rightarrow\; 32/4 = 8\ \alpha", 44, color=ALPHA).move_to(P(0, 1.0))
            c2 = M(r"Z:\ 92 - 16 = 76, \quad 82 - 76 = 6\ \beta^-", 44, color=ELEC).move_to(P(0, -0.3))
            c3 = M(r"\text{heat, pressure, chemistry: } \lambda \text{ unchanged (MeV vs eV)}", 34, color=MUTED).move_to(P(0, -1.9))
            self.play(Write(c0), run_time=1.2)
            self.wait(vo.duration * 0.12)
            self.play(Write(c1), run_time=1.2)
            self.wait(vo.duration * 0.1)
            self.play(Write(c2), run_time=1.4)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(c3), run_time=0.6)

    # ------------------------------------------------------------ scene 7: fission and fusion
    def s7(self):
        eq = M(r"{}^{235}_{\ 92}\text{U} + {}^1_0n \to {}^{141}_{\ 56}\text{Ba} + {}^{92}_{36}\text{Kr} + 3\,{}^1_0n"
               r" + \text{about } 200\ \text{MeV}", 40)
        fit(eq, 12.6).move_to(P(0, 3.0))
        U = cluster(1.05, P(-2.2, -0.3), r=0.11, seed=3, frac_p=0.4)
        n_in = particle(NEU, 0.11).move_to(P(-6.2, -0.3))
        ba = cluster(0.8, P(1.6, 0.8), r=0.11, seed=4, frac_p=0.4)
        kr = cluster(0.68, P(1.4, -1.6), r=0.11, seed=5, frac_p=0.4)
        bal = M(r"\text{Ba}", 32).next_to(ba, UP, buff=0.12)
        krl = M(r"\text{Kr}", 32).next_to(kr, DOWN, buff=0.12)
        outs = VGroup(*[particle(NEU, 0.11).move_to(P(-2.2, -0.3)) for _ in range(3)])
        targets = [P(5.4, 1.0), P(5.8, -0.3), P(5.2, -1.6)]
        with self.voiceover("In fission, a slow neutron enters uranium two thirty five. The nucleus stretches and tears into"
                            " two fragments, such as barium and krypton, plus three neutrons and about two hundred mega "
                            "electron volts.") as vo:
            self.play(FadeIn(U, lag_ratio=0.01), FadeIn(n_in), run_time=0.8)
            self.play(n_in.animate.move_to(P(-3.2, -0.3)), run_time=1.0)
            self.play(FadeOut(n_in), U.animate.stretch(1.35, 0), run_time=0.8)
            self.play(U.animate.stretch(1.15, 0).stretch(0.85, 1), run_time=0.5)
            self.add(outs)
            self.play(ReplacementTransform(U, VGroup(ba, kr)),
                      *[o.animate.move_to(t) for o, t in zip(outs, targets)], run_time=1.4)
            self.play(FadeIn(bal), FadeIn(krl), Write(eq), run_time=1.2)

        with self.voiceover("Those neutrons split more nuclei. More than one new fission per fission, and the reaction runs "
                            "away; exactly one keeps a reactor steady. A moderator slows neutrons, and control rods absorb "
                            "the spare ones.") as vo:
            self.clear_scene(0.5)
            tree = VGroup()
            g0 = [P(-6.2, 0.0)]
            g1 = [P(-4.4, y) for y in (1.6, 0.0, -1.6)]
            g2 = [P(-2.0, y) for y in np.linspace(2.8, -2.8, 9)]
            nodes0 = VGroup(*[Dot(p, radius=0.16, color=NUC) for p in g0])
            e01 = VGroup(*[Line(g0[0], p, color=NEU, stroke_width=3) for p in g1])
            nodes1 = VGroup(*[Dot(p, radius=0.16, color=NUC) for p in g1])
            e12 = VGroup(*[Line(g1[i // 3], p, color=NEU, stroke_width=3) for i, p in enumerate(g2)])
            nodes2 = VGroup(*[Dot(p, radius=0.16, color=NUC) for p in g2])
            tree.add(e01, e12, nodes0, nodes1, nodes2)
            cl = M(r"1 \to 3 \to 9 \to \cdots", 34, color=MUTED).move_to(P(-4.0, -3.3))
            k1 = T("more than 1 new fission each: runaway", 26, color=WARN)
            k2 = T("exactly 1: steady (a reactor)", 26, color=GREEN)
            k3 = T("moderator: light nuclei slow neutrons", 26)
            k3b = T("by collisions, not by absorbing them", 26, color=MUTED)
            k4 = T("control rods: absorb spare neutrons", 26)
            ks = VGroup(k1, k2, k3, k3b, k4).arrange(DOWN, buff=0.35, aligned_edge=LEFT).move_to(P(3.2, 0.2))
            k3b.shift(0.0 * UP)
            self.play(FadeIn(nodes0), run_time=0.4)
            self.play(Create(e01), FadeIn(nodes1), run_time=0.8)
            self.play(Create(e12), FadeIn(nodes2), FadeIn(cl), run_time=1.0)
            self.play(FadeIn(k1), run_time=0.5)
            self.wait(vo.duration * 0.12)
            self.play(FadeIn(k2), run_time=0.5)
            self.wait(vo.duration * 0.08)
            self.play(FadeIn(k3), FadeIn(k3b), run_time=0.6)
            self.wait(vo.duration * 0.08)
            self.play(FadeIn(k4), run_time=0.5)

        d1 = VGroup(particle(NUC, 0.16), particle(NEU, 0.16)).arrange(RIGHT, buff=0).move_to(P(-5.6, 2.0))
        d2 = VGroup(particle(NEU, 0.16), particle(NUC, 0.16)).arrange(RIGHT, buff=0).move_to(P(-1.4, 2.0))
        he = VGroup(particle(NUC, 0.16).move_to(P(-3.65, 2.16)), particle(NEU, 0.16).move_to(P(-3.35, 2.16)),
                    particle(NEU, 0.16).move_to(P(-3.65, 1.84)), particle(NUC, 0.16).move_to(P(-3.35, 1.84)))
        rep = VGroup(vec(P(-4.7, 2.0), P(-5.3, 2.0), WARN, sw=4, tip=0.4),
                     vec(P(-2.3, 2.0), P(-1.7, 2.0), WARN, sw=4, tip=0.4))
        barrier = T("Coulomb barrier: millions of kelvin", 24, color=WARN).move_to(P(-3.5, 1.0))
        f1 = M(r"{}^2\text{H} + {}^2\text{H} \to {}^4\text{He}", 40).move_to(P(3.3, 2.6))
        f2 = fit(M(r"Q = 28.3 - 2\times2.22 \approx 23.9\ \text{MeV}", 40, color=GREEN), 6.4).move_to(P(3.3, 1.5))
        with self.voiceover("Fusion joins light nuclei, but they must beat their repulsion, which takes millions of kelvin. "
                            "Two deuterons make helium four, releasing about twenty four mega electron volts.") as vo:
            self.clear_scene(0.5)
            self.play(FadeIn(d1), FadeIn(d2), run_time=0.6)
            self.play(GrowArrow(rep[0]), GrowArrow(rep[1]), FadeIn(barrier), run_time=0.8)
            self.wait(vo.duration * 0.15)
            self.play(FadeOut(rep), d1.animate.move_to(P(-3.65, 2.0)), d2.animate.move_to(P(-3.35, 2.0)),
                      run_time=1.2)
            self.play(ReplacementTransform(VGroup(d1, d2), he), Write(f1), run_time=1.0)
            self.wait(vo.duration * 0.1)
            self.play(Write(f2), run_time=1.4)

        p1 = M(r"\text{fusion: } \tfrac{23.9}{4} \approx 6\ \text{MeV per nucleon}", 40, color=GREEN)
        p2 = M(r"\text{fission: } \tfrac{200}{236} \approx 0.85\ \text{MeV per nucleon}", 40, color=SECONDARY)
        pp = VGroup(p1, p2).arrange(DOWN, buff=0.35, aligned_edge=LEFT).move_to(P(0, -0.6))
        sun = fit(M(r"\text{Sun: } 4\,{}^1\text{H} \to {}^4\text{He} + 2e^+ + 2\nu + 26.7\ \text{MeV}", 40), 12)
        sun.move_to(P(0, -2.6))
        sunc = Circle(radius=0.32, color=ACCENT, stroke_width=3).set_fill(ManimColor("#F6C15A"), 1)
        sunc.next_to(sun, LEFT, buff=0.3)
        with self.voiceover("That is less per event than fission, but about six mega electron volts per nucleon, against "
                            "less than one. The Sun runs on it.") as vo:
            self.play(Write(p1), run_time=1.2)
            self.play(Write(p2), run_time=1.2)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(sunc), Write(sun), run_time=1.4)

    # ------------------------------------------------------------ scene 8: recap
    def s8(self):
        title = T("Chapter 4 in five lines", 38, color=PRIMARY, weight="BOLD").move_to(P(0, 3.2))
        lines = [
            (r"r_0 = \frac{2Ze^2}{4\pi\varepsilon_0 K}", "back-scattering: a tiny nucleus"),
            (r"E_n = -13.6\,\frac{Z^2}{n^2}\ \text{eV}", "quantised angular momentum"),
            (r"\lambda = \frac{1240}{\Delta E}\ \text{nm},\ \ \lambda_{\min} = \frac{1240}{V}",
             "lines and cut-offs are energy gaps"),
            (r"BE = \Delta m\times931.5\ \text{MeV}", "climb towards the iron peak"),
            (r"N = N_0e^{-\lambda t},\ \ T_{1/2} = \frac{0.693}{\lambda}", "random nuclei, steady halving"),
        ]
        rows = VGroup()
        for i, (tex, note) in enumerate(lines):
            m = fit(M(tex, 36), 5.6)
            n = T(note, 26, color=MUTED)
            num = T(f"{i + 1}.", 28, color=PRIMARY, weight="BOLD")
            rows.add(VGroup(num, m, n))
        for r in rows:
            r[0].move_to(P(-6.2, 0))
            r[1].next_to(r[0], RIGHT, buff=0.3)
            r[2].move_to(P(3.6, 0))
        rows.arrange(DOWN, buff=0.3, aligned_edge=LEFT).move_to(P(0, -0.1))
        for r in rows:
            r[0].move_to(P(-6.2, r[1].get_y()))
            r[1].next_to(r[0], RIGHT, buff=0.3)
            r[2].move_to(P(3.6, r[1].get_y()))
        with self.voiceover("To recap. Back scattering revealed a tiny, heavy nucleus. Quantised angular momentum "
                            "gives hydrogen's levels: minus thirteen point six, Z squared over n squared.") as vo:
            self.play(FadeIn(title), run_time=0.6)
            self.play(FadeIn(rows[0], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.3)
            self.play(FadeIn(rows[1], shift=0.15 * UP), run_time=0.7)
        with self.voiceover("Every line and every X-ray cut-off is twelve forty over an energy gap. Missing mass is binding "
                            "energy, and fission and fusion both climb towards iron. Decay halves what is left, on a fixed "
                            "clock.") as vo:
            self.play(FadeIn(rows[2], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.25)
            self.play(FadeIn(rows[3], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.25)
            self.play(FadeIn(rows[4], shift=0.15 * UP), run_time=0.7)
        with self.voiceover("Try the mastery quiz. Then chapter five packs atoms into a crystal, where levels spread into "
                            "bands, and uses the gap to build diodes, solar cells and transistors.") as vo:
            nxt = T("Next: Chapter 5 · Semiconductor Electronics", 32, color=PRIMARY).move_to(P(0, -3.45))
            self.wait(vo.duration * 0.3)
            self.play(FadeIn(nxt, shift=0.2 * UP), run_time=0.8)
