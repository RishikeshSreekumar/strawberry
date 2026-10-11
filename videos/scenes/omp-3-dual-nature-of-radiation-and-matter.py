import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

# Chapter colour roles (light background).
RED_PH = PRIMARY  # red / low-energy photons
UV_PH = PURPLE  # ultraviolet / high-energy photons
PH_C = ACCENT  # a generic photon, and h nu
EL_C = SECONDARY  # electrons
PHI_C = PURPLE  # work function
K_C = GREEN  # kinetic energy
HL = ManimColor("#D19A00")  # highlight gold
WARN = PRIMARY
METAL = ManimColor("#C9C2BE")


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


def card(mob, pad=0.25, color=MUTED):
    box = SurroundingRectangle(mob, buff=pad, corner_radius=0.15, color=color, stroke_width=2)
    box.set_fill(WHITE, opacity=0.85)
    return VGroup(box, mob)


def P(x, y):
    return np.array([x, y, 0.0])


def packet(color, lam=0.35, length=1.2, amp=0.2, sw=4):
    """A photon: a short wave packet pointing along +x, centred on the origin."""
    def f(x):
        env = np.exp(-(x / (length / 3.2)) ** 2)
        return np.array([x, amp * env * np.sin(2 * np.pi * x / lam), 0.0])

    return ParametricFunction(f, t_range=[-length / 2, length / 2, lam / 24], color=color, stroke_width=sw)


def aimed(pk, start, end):
    """Rotate a +x packet to point from start to end and park it at start."""
    d = end - start
    pk.rotate(np.arctan2(d[1], d[0]))
    pk.move_to(start)
    return pk


def electron():
    return Dot(radius=0.09, color=EL_C)


def lamp(color, label, size=26, label_color=None):
    bulb = Circle(radius=0.42, color=color, stroke_width=4).set_fill(color, 0.3)
    rays = VGroup(*[
        Line(0.55 * np.array([np.cos(a), np.sin(a), 0]), 0.8 * np.array([np.cos(a), np.sin(a), 0]),
             color=color, stroke_width=3)
        for a in np.linspace(0, 2 * np.pi, 10, endpoint=False)
    ])
    lab = T(label, size, color=label_color or color).next_to(bulb, UP, buff=0.45)
    return VGroup(bulb, rays, lab)


class OmpCh3Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Optics and Modern Physics",
            "Chapter 3 · Dual Nature of Radiation and Matter",
            "Chapter three. The dual nature of radiation and matter.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7, self.s8):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ helpers
    def fly(self, mobs, starts, ends, run_time, travel, bounce=None, delays=None):
        """Send each mob from start to end, staggered. bounce[i] = True turns it back at the end."""
        n = len(mobs)
        if delays is None:
            delays = np.linspace(0, max(0.0, run_time - travel), n)
        if bounce is None:
            bounce = [False] * n
        anims = []
        for m, s, e, d, b in zip(mobs, starts, ends, delays, bounce):
            m.move_to(s)
            m.set_stroke(opacity=0)
            if isinstance(m, Dot):
                m.set_fill(opacity=0)

            def upd(mob, a, s=s, e=e, d=d, b=b):
                loc = (a * run_time - d) / travel
                if 0 < loc < 1:
                    frac = 4 * loc * (1 - loc) if b else loc
                    mob.move_to(s + frac * (e - s))
                    o = 1.0
                else:
                    o = 0.0
                mob.set_stroke(opacity=o)
                if isinstance(mob, Dot):
                    mob.set_fill(opacity=o)

            anims.append(UpdateFromAlphaFunc(m, upd))
        self.play(*anims, run_time=run_time, rate_func=linear)
        self.remove(*mobs)

    # ------------------------------------------------------------ scene 1: photons
    def s1(self):
        skin = Rectangle(width=12.4, height=0.5, stroke_color=INK, stroke_width=2)
        skin.set_fill(ManimColor("#F3D9C9"), 1).move_to(P(0, -3.05))
        skin_l = T("skin", 24, color=MUTED).move_to(P(-5.7, -3.05))
        div = DashedLine(P(0, 3.4), P(0, -2.6), color=GRID, stroke_width=3)
        red = lamp(RED_PH, "100 W red lamp").move_to(P(-3.4, 2.35))
        sun = lamp(ACCENT, "weak sunlight: the UV part", label_color=UV_PH).move_to(P(3.4, 2.35))

        with self.voiceover("Stand under a hundred watt red lamp for an hour, and you just get warm. Stand in weak sunlight,"
                            " and its ultraviolet can burn your skin, with far less power.") as vo:
            self.play(FadeIn(skin), FadeIn(skin_l), Create(div), FadeIn(red), FadeIn(sun), run_time=1.0)
            xs_l = np.linspace(-5.4, -1.4, 9)
            reds = [aimed(packet(RED_PH, lam=0.5, length=1.0), P(x, 1.3), P(x, -2.2)) for x in xs_l]
            xs_r = [2.2, 3.4, 4.6]
            uvs = [aimed(packet(UV_PH, lam=0.18, length=1.0), P(x, 1.3), P(x, -2.2)) for x in xs_r]
            self.fly(reds + uvs, [P(x, 1.3) for x in xs_l] + [P(x, 1.3) for x in xs_r],
                     [P(x, -2.25) for x in xs_l] + [P(x, -2.25) for x in xs_r], run_time=2.6, travel=1.1,
                     delays=list(np.linspace(0, 1.5, 9)) + [0.2, 0.8, 1.4])
            warm = T("just warm", 30, color=ACCENT).move_to(P(-3.4, -1.9))
            burn = T("sunburn", 30, color=WARN, weight="BOLD").move_to(P(3.4, -1.9))
            self.play(FadeIn(warm), FadeIn(burn), run_time=0.7)

        with self.voiceover("Light arrives in packets, called photons, and the damage is done by the energy in one packet. A"
                            " red photon carries under two electron volts. An ultraviolet photon carries about five, enough "
                            "to break a bond alone.") as vo:
            self.clear_scene(0.5)
            hdr = T("One photon, one molecule", 34, color=PRIMARY, weight="BOLD").move_to(P(0, 3.2))
            c = P(2.2, -1.0)
            a1 = Circle(radius=0.32, color=INK, stroke_width=3).set_fill(GRID, 1).move_to(c + 0.5 * LEFT)
            a2 = Circle(radius=0.32, color=INK, stroke_width=3).set_fill(GRID, 1).move_to(c + 0.5 * RIGHT)
            bond = Line(c + 0.18 * LEFT, c + 0.18 * RIGHT, color=INK, stroke_width=6)
            mol = VGroup(bond, a1, a2)
            need = T("bond needs 4 eV", 24, color=MUTED).next_to(mol, DOWN, buff=0.35)
            self.play(FadeIn(hdr), FadeIn(mol), FadeIn(need), run_time=0.8)
            e_red = M(r"E_{\text{red}} = \tfrac{1240}{700} = 1.77\ \text{eV} < 4\ \text{eV}", 40, color=RED_PH)
            e_red.move_to(P(-2.6, 1.9))
            e_uv = M(r"E_{\text{UV}} = \tfrac{1240}{250} = 4.96\ \text{eV} > 4\ \text{eV}", 40, color=UV_PH)
            e_uv.move_to(P(-2.6, 0.9))
            self.wait(vo.duration * 0.15)
            pr = packet(RED_PH, lam=0.5, length=1.2)
            self.fly([pr], [P(-5.8, -1.0)], [P(1.2, -1.0)], run_time=1.4, travel=1.4)
            self.play(Write(e_red), run_time=1.0)
            xr = cross_mark().scale(0.7).next_to(e_red, RIGHT, buff=0.3)
            self.play(FadeIn(xr), Wiggle(mol, scale_value=1.05), run_time=0.8)
            self.wait(vo.duration * 0.05)
            pu = packet(UV_PH, lam=0.18, length=1.2)
            self.fly([pu], [P(-5.8, -1.0)], [P(1.2, -1.0)], run_time=1.4, travel=1.4)
            self.play(Write(e_uv), run_time=1.0)
            ck = check().scale(0.8).next_to(e_uv, RIGHT, buff=0.3)
            self.play(FadeIn(ck), FadeOut(bond), a1.animate.shift(0.7 * LEFT), a2.animate.shift(0.7 * RIGHT),
                      run_time=0.8)

        with self.voiceover("Each photon carries E equals h nu, which is h c over lambda: with lambda in nanometres, twelve "
                            "forty over lambda, in electron volts. Six twenty nanometres gives two. Halve the wavelength, "
                            "and the energy doubles.") as vo:
            self.clear_scene(0.5)
            f1 = M(r"E = h\nu = \frac{hc}{\lambda}", 60).move_to(P(0, 2.6))
            f2 = M(r"E\,(\text{eV}) \approx \frac{1240}{\lambda\,(\text{nm})}", 60, color=PH_C).move_to(P(0, 0.9))
            box = SurroundingRectangle(f2, buff=0.25, corner_radius=0.15, color=PH_C, stroke_width=3)
            self.play(Write(f1), run_time=1.3)
            self.wait(vo.duration * 0.1)
            self.play(Write(f2), Create(box), run_time=1.5)
            p1 = packet(RED_PH, lam=0.62, length=2.6, amp=0.28).move_to(P(-3.0, -1.2))
            p2 = packet(UV_PH, lam=0.31, length=2.6, amp=0.28).move_to(P(-3.0, -2.6))
            r1 = M(r"620\ \text{nm} \;\to\; 2.0\ \text{eV}", 44, color=RED_PH).move_to(P(2.0, -1.2))
            r2 = M(r"310\ \text{nm} \;\to\; 4.0\ \text{eV}", 44, color=UV_PH).move_to(P(2.0, -2.6))
            self.wait(vo.duration * 0.1)
            self.play(Create(p1), FadeIn(r1), run_time=1.0)
            self.wait(vo.duration * 0.05)
            self.play(Create(p2), FadeIn(r2), run_time=1.0)

        with self.voiceover("So a light source has two knobs. Colour sets the energy of each photon. Brightness "
                            "sets how many arrive per second. A brighter red lamp sends more red photons, never "
                            "stronger ones.") as vo:
            self.clear_scene(0.5)
            k1 = card(VGroup(T("Colour (frequency)", 30, weight="BOLD", color=PRIMARY),
                             T("energy of each photon", 26, color=MUTED)).arrange(DOWN, buff=0.15))
            k2 = card(VGroup(T("Brightness (power)", 30, weight="BOLD", color=SECONDARY),
                             T("photons per second", 26, color=MUTED)).arrange(DOWN, buff=0.15))
            k1.move_to(P(-3.3, 2.4))
            k2.move_to(P(3.3, 2.4))
            self.play(FadeIn(k1, shift=0.2 * UP), run_time=0.7)
            self.wait(vo.duration * 0.12)
            self.play(FadeIn(k2, shift=0.2 * UP), run_time=0.7)
            dim_l = T("dim red", 26, color=MUTED).move_to(P(-5.6, 0.3))
            br_l = T("bright red", 26, color=MUTED).move_to(P(-5.6, -1.3))
            self.play(FadeIn(dim_l), FadeIn(br_l), run_time=0.4)
            dim = [packet(RED_PH, lam=0.5, length=1.0) for _ in range(3)]
            bright = [packet(RED_PH, lam=0.5, length=1.0) for _ in range(10)]
            self.fly(dim + bright, [P(-4.3, 0.3)] * 3 + [P(-4.3, -1.3)] * 10,
                     [P(6.2, 0.3)] * 3 + [P(6.2, -1.3)] * 10, run_time=3.2, travel=1.6,
                     delays=[0.0, 0.8, 1.6] + list(np.linspace(0, 1.6, 10)))
            cap = T("brighter = more photons, each the same size", 30, color=PRIMARY).move_to(P(0, -3.0))
            self.play(FadeIn(cap), run_time=0.6)

    # ------------------------------------------------------------ scene 2: counting and pushing
    def s2(self):
        hdr = T("How many photons?", 34, color=PRIMARY, weight="BOLD").move_to(P(0, 3.2))
        f = M(r"N = \frac{P}{hc/\lambda} = \frac{P\lambda}{hc}", 60).move_to(P(0, 1.9))
        with self.voiceover("Counting photons is division. A source of power P sends out P joules each second, "
                            "and each photon carries h c over lambda. So the number per second is P lambda over "
                            "h c.") as vo:
            self.play(FadeIn(hdr), run_time=0.6)
            self.wait(vo.duration * 0.08)
            self.play(Write(f), run_time=2.6)
        with self.voiceover("A ten watt lamp at six hundred nanometres sends about three times ten to the nineteen photons "
                            "every second, which is why light looks smooth.") as vo:
            g = M(r"P = 10\ \text{W},\qquad \lambda = 600\ \text{nm}", 44).move_to(P(0, 0.5))
            e = M(r"E = \frac{1240}{600} = 2.07\ \text{eV} = 3.3\times10^{-19}\ \text{J}", 44).move_to(P(0, -0.7))
            n = M(r"N = \frac{10}{3.3\times10^{-19}} \approx 3\times10^{19}\ \text{per second}", 48, color=GREEN)
            n.move_to(P(0, -2.1))
            self.play(FadeIn(g), run_time=0.7)
            self.wait(vo.duration * 0.05)
            self.play(Write(e), run_time=1.4)
            self.wait(vo.duration * 0.15)
            self.play(Write(n), run_time=1.4)
            cap = T("that is why ordinary light looks smooth", 26, color=MUTED).move_to(P(0, -3.3))
            self.play(FadeIn(cap), run_time=0.6)

        with self.voiceover("Photons have no mass, but they do carry momentum: p equals h over lambda, which is E over c. "
                            "Absorb a beam of power P and it pushes with force P over c. Reflect it, and each photon hands "
                            "over two p, so the force doubles.") as vo:
            self.clear_scene(0.5)
            top = M(r"p = \frac{h}{\lambda} = \frac{E}{c}", 56, color=PH_C).move_to(P(0, 2.9))
            self.play(Write(top), run_time=1.2)
            div = DashedLine(P(0, 1.9), P(0, -3.4), color=GRID, stroke_width=3)
            absb = Rectangle(width=0.45, height=2.6, stroke_color=INK, stroke_width=2).set_fill(INK, 1)
            absb.move_to(P(-1.1, -0.3))
            mirror = Rectangle(width=0.3, height=2.6, stroke_color=SECONDARY, stroke_width=3)
            mirror.set_fill(ManimColor("#CFE6EA"), 1).move_to(P(5.9, -0.3))
            al = T("absorber", 26, color=INK).next_to(absb, UP, buff=0.2)
            ml = T("mirror", 26, color=SECONDARY).next_to(mirror, UP, buff=0.2)
            self.play(Create(div), FadeIn(absb), FadeIn(mirror), FadeIn(al), FadeIn(ml), run_time=0.8)
            pa = packet(PH_C, lam=0.35, length=1.2)
            self.fly([pa], [P(-6.0, -0.3)], [P(-1.95, -0.3)], run_time=1.3, travel=1.3)
            dpa = vec(P(-1.55, -2.1), P(-0.35, -2.1), INK, sw=5)
            dpa_l = M(r"\Delta p = p", 36).next_to(dpa, LEFT, buff=0.2)
            self.play(GrowArrow(dpa), FadeIn(dpa_l), run_time=0.7)
            fa = M(r"F = \frac{P}{c}", 48, color=GREEN).move_to(P(-3.5, 1.0))
            self.play(FadeIn(fa), run_time=0.6)
            self.wait(vo.duration * 0.08)
            pm = packet(PH_C, lam=0.35, length=1.2)
            self.fly([pm], [P(0.8, -0.3)], [P(5.1, -0.3)], run_time=2.2, travel=2.2, bounce=[True])
            dpm = vec(P(4.4, -2.1), P(6.6, -2.1), INK, sw=5)
            dpm_l = M(r"\Delta p = 2p", 36).next_to(dpm, LEFT, buff=0.2)
            fm = M(r"F = \frac{2P}{c}", 48, color=GREEN).move_to(P(2.3, 0.9))
            self.play(GrowArrow(dpm), FadeIn(dpm_l), run_time=0.7)
            self.play(FadeIn(fm), run_time=0.6)


    # ------------------------------------------------------------ scene 3: what is observed
    def s3(self):
        hdr = T("Hallwachs, 1888", 34, color=PRIMARY, weight="BOLD").move_to(P(0, 3.2))
        div = DashedLine(P(0, 2.6), P(0, -3.4), color=GRID, stroke_width=3)
        plates = []
        for x in (-3.4, 3.4):
            pl = Rectangle(width=4.2, height=0.4, stroke_color=INK, stroke_width=2).set_fill(METAL, 1)
            pl.move_to(P(x, -1.9))
            minus = VGroup(*[M("-", 34, color=INK).move_to(P(x + dx, -1.9)) for dx in np.linspace(-1.6, 1.6, 6)])
            plates.append(VGroup(pl, minus))
        zl = T("zinc plate, charged negative", 24, color=MUTED).move_to(P(-3.4, -2.6))
        zr = T("same plate", 24, color=MUTED).move_to(P(3.4, -2.6))
        uv_l = T("ultraviolet", 28, color=UV_PH).move_to(P(-3.4, 2.3))
        rd_l = T("strong lamp, no ultraviolet", 28, color=RED_PH).move_to(P(3.4, 2.3))

        with self.voiceover("Hallwachs shone ultraviolet on a negatively charged zinc plate, and it lost its charge within "
                            "moments. A stronger lamp with no ultraviolet did nothing.") as vo:
            self.play(FadeIn(hdr), Create(div), FadeIn(plates[0]), FadeIn(plates[1]), FadeIn(zl), FadeIn(zr),
                      FadeIn(uv_l), FadeIn(rd_l), run_time=1.0)
            xs = np.linspace(-4.8, -2.0, 4)
            uvs = [aimed(packet(UV_PH, lam=0.18, length=0.9), P(x - 1.0, 1.7), P(x, -1.55)) for x in xs]
            els = [electron() for _ in xs]
            d0 = [0.0, 0.5, 1.0, 1.5]
            self.fly(uvs + els, [P(x - 1.0, 1.7) for x in xs] + [P(x, -1.6) for x in xs],
                     [P(x, -1.6) for x in xs] + [P(x + 0.9, 0.9) for x in xs], run_time=3.6, travel=1.2,
                     delays=d0 + [d + 1.2 for d in d0])
            self.play(FadeOut(plates[0][1][1:5]), run_time=0.6)
            ok = T("electrons fly off", 28, color=GREEN).move_to(P(-3.4, 0.4))
            self.play(FadeIn(ok), run_time=0.5)
            xs2 = np.linspace(2.0, 4.8, 6)
            reds = [aimed(packet(RED_PH, lam=0.5, length=1.0, sw=6), P(x - 1.0, 1.7), P(x, -1.55)) for x in xs2]
            self.fly(reds, [P(x - 1.0, 1.7) for x in xs2], [P(x, -1.6) for x in xs2], run_time=2.4, travel=1.2)
            no = T("nothing, however long", 28, color=WARN).move_to(P(3.4, 0.4))
            self.play(FadeIn(no), run_time=0.5)

        # Lenard's phototube
        tube = RoundedRectangle(width=6.4, height=3.2, corner_radius=0.6, stroke_color=MUTED, stroke_width=3)
        tube.set_fill(WHITE, 0.6).move_to(P(0, 0.8))
        em = Rectangle(width=0.18, height=2.2, stroke_color=INK, stroke_width=2).set_fill(METAL, 1).move_to(P(-2.3, 0.8))
        co = Rectangle(width=0.18, height=2.2, stroke_color=INK, stroke_width=2).set_fill(METAL, 1).move_to(P(2.3, 0.8))
        em_l = T("emitter", 26).move_to(P(-2.3, 2.75))
        co_l = T("collector", 26).move_to(P(2.3, 2.75))
        w = VGroup(
            Line(P(-2.3, -0.3), P(-2.3, -2.4), color=INK, stroke_width=3),
            Line(P(-2.3, -2.4), P(-1.0, -2.4), color=INK, stroke_width=3),
            Line(P(-0.75, -2.4), P(0.85, -2.4), color=INK, stroke_width=3),
            Line(P(1.55, -2.4), P(2.3, -2.4), color=INK, stroke_width=3),
            Line(P(2.3, -2.4), P(2.3, -0.3), color=INK, stroke_width=3),
        )
        batt = VGroup(Line(P(-1.0, -2.0), P(-1.0, -2.8), color=INK, stroke_width=4),
                      Line(P(-0.75, -2.2), P(-0.75, -2.6), color=INK, stroke_width=8))
        bl = M("V", 34).move_to(P(-0.87, -3.15))
        am = VGroup(Circle(radius=0.35, color=INK, stroke_width=3).set_fill(WHITE, 1).move_to(P(1.2, -2.4)),
                    M(r"\mu\text{A}", 28).move_to(P(1.2, -2.4)))
        rig = VGroup(tube, em, co, w, batt, am)

        with self.voiceover("Lenard measured it in a vacuum tube. Light falls on the emitter, a collector at potential V "
                            "gathers the electrons, and a meter reads the current. Make the collector negative, and only "
                            "energetic electrons climb the hill.") as vo:
            self.clear_scene(0.5)
            self.play(FadeIn(rig), FadeIn(em_l), FadeIn(co_l), FadeIn(bl), run_time=1.0)
            ph = [aimed(packet(PH_C, lam=0.25, length=0.9), P(0.6, 2.2), P(-2.1, 0.9)) for _ in range(3)]
            self.fly(ph, [P(0.6, 2.2)] * 3, [P(-2.05, 0.9)] * 3, run_time=1.8, travel=1.0)
            ys = np.linspace(0.0, 1.6, 6)
            els = [electron() for _ in ys]
            self.fly(els, [P(-2.1, y) for y in ys], [P(2.1, y) for y in ys], run_time=2.2, travel=1.2)
            note = T("collector negative: only fast electrons get across", 26, color=PRIMARY).move_to(P(0, 3.45))
            fit(note, 12.5)
            self.play(FadeIn(note), run_time=0.6)
            els2 = [electron() for _ in ys]
            reach = [0.9, 0.35, 1.0, 0.5, 0.2, 1.0]
            self.fly(els2, [P(-2.1, y) for y in ys], [P(-2.1 + 4.2 * r, y) for r, y in zip(reach, ys)],
                     run_time=2.8, travel=1.6, bounce=[r < 1 for r in reach])

        with self.voiceover("Four facts came out. Below a threshold frequency, nothing comes out, however bright. Above it, emission is instant. Brighter light gives more current. But the stopping potential, which halts even the fastest electrons, ignores brightness and rises with frequency.") as vo:
            self.clear_scene(0.5)
            hd = T("Four experimental facts", 34, color=PRIMARY, weight="BOLD").move_to(P(0, 3.2))
            facts = [
                ("Threshold:", "below a threshold frequency, no electrons at any brightness"),
                ("No delay:", "emission is instant, even in dim light"),
                ("Current:", "brighter light gives more current"),
                ("Stopping potential:", "same at any brightness, rises with frequency"),
            ]
            rows = VGroup()
            for i, (a, b) in enumerate(facts):
                r = VGroup(T(f"{i + 1}.", 28, color=PRIMARY, weight="BOLD"), T(a, 28, weight="BOLD"),
                           T(b, 28, color=MUTED)).arrange(RIGHT, buff=0.25)
                rows.add(fit(r, 12.6))
            rows.arrange(DOWN, buff=0.55, aligned_edge=LEFT).move_to(P(0, 0.0))
            self.play(FadeIn(hd), run_time=0.5)
            fr = [0.0, 0.17, 0.14, 0.13]
            for r, f in zip(rows, fr):
                if f:
                    self.wait(vo.duration * f)
                self.play(FadeIn(r, shift=0.15 * UP), run_time=0.6)

        with self.voiceover("A smooth wave fails all four. Soaking up energy from dim light, an electron in potassium would "
                            "need about four days to escape. Real ones leave within a billionth of a second.") as vo:
            self.clear_scene(0.5)
            lw = T("wave theory, dim light on potassium", 28, color=MUTED).move_to(P(-3.4, 2.0))
            tw = M(r"t \approx \frac{3.7\times10^{-19}\ \text{J}}{10^{-24}\ \text{W}} \approx 4\ \text{days}", 44)
            fit(tw, 6.2).move_to(P(-3.4, 0.6))
            xw = cross_mark().next_to(tw, DOWN, buff=0.4)
            le = T("experiment", 28, color=MUTED).move_to(P(3.4, 2.0))
            te = M(r"t < 10^{-9}\ \text{s}", 54, color=GREEN).move_to(P(3.4, 0.6))
            ce = check().next_to(te, DOWN, buff=0.45)
            cap = T("the energy arrives in one photon, not as a trickle", 30, color=PRIMARY).move_to(P(0, -2.6))
            self.play(FadeIn(lw), Write(tw), run_time=1.4)
            self.play(FadeIn(xw), run_time=0.4)
            self.wait(vo.duration * 0.15)
            self.play(FadeIn(le), Write(te), run_time=1.0)
            self.play(FadeIn(ce), FadeIn(cap), run_time=0.6)

    # ------------------------------------------------------------ scene 4: Einstein's equation
    def s4(self):
        with self.voiceover("Einstein explained all four in one sentence: one photon gives all its energy to one electron.") as vo:
            k = T("Einstein, 1905", 30, color=MUTED).move_to(P(0, 1.2))
            q = T("One photon gives all its energy to one electron.", 40, color=PRIMARY, weight="BOLD")
            fit(q, 12.5).move_to(P(0, 0.1))
            self.play(FadeIn(k), run_time=0.5)
            self.wait(vo.duration * 0.25)
            self.play(Write(q), run_time=1.8)

        # energy ladder
        X = -4.3
        y_e, y_f, y_top = -1.4, 1.2, 2.6
        metal = Rectangle(width=4.6, height=2.0, stroke_width=0).set_fill(METAL, 0.6)
        metal.move_to(P(-4.0, y_e - 1.0))
        metal_l = T("inside the metal", 22, color=MUTED).move_to(P(-4.0, -3.1))
        surf = Line(P(-6.3, y_e), P(-1.7, y_e), color=INK, stroke_width=3)
        free = DashedLine(P(-6.3, y_f), P(-1.7, y_f), color=MUTED, stroke_width=3)
        free_l = T("free", 24, color=MUTED).next_to(free, RIGHT, buff=0.15)
        el = electron().move_to(P(X, y_e))
        up = vec(P(X, y_e), P(X, y_top), PH_C, sw=6)
        up_l = M(r"h\nu", 44, color=PH_C).next_to(up, LEFT, buff=0.2)
        b_phi = BraceBetweenPoints(P(X + 0.25, y_e), P(X + 0.25, y_f), direction=RIGHT, color=PHI_C)
        b_k = BraceBetweenPoints(P(X + 0.25, y_f), P(X + 0.25, y_top), direction=RIGHT, color=K_C)
        phi_l = M(r"\phi", 44, color=PHI_C).next_to(b_phi, RIGHT, buff=0.15)
        k_l = M(r"K_{\max}", 40, color=K_C).next_to(b_k, RIGHT, buff=0.15)
        eq = M(r"K_{\max} = h\nu - \phi = eV_0", 56)
        eq[0][0:4].set_color(K_C)
        eq[0][5:7].set_color(PH_C)
        eq[0][8].set_color(PHI_C)
        eq.move_to(P(2.9, 1.5))
        box = SurroundingRectangle(eq, buff=0.25, corner_radius=0.15, color=PRIMARY, stroke_width=3)

        with self.voiceover("The photon brings h nu. To escape, the electron must pay at least the work function, phi, and "
                            "whatever is left is kinetic energy. Surface electrons pay the least, so they are the fastest: K"
                            " max equals h nu minus phi, which equals e V nought.") as vo:
            self.clear_scene(0.5)
            self.play(FadeIn(metal), Create(surf), Create(free), FadeIn(free_l), FadeIn(metal_l), FadeIn(el),
                      run_time=0.8)
            pk = packet(PH_C, lam=0.25, length=1.0)
            self.fly([pk], [P(-6.6, y_e + 0.0)], [P(X - 0.5, y_e)], run_time=1.0, travel=1.0)
            self.play(GrowArrow(up), FadeIn(up_l), run_time=0.8)
            self.wait(vo.duration * 0.05)
            self.play(Create(b_phi), FadeIn(phi_l), run_time=0.8)
            self.wait(vo.duration * 0.08)
            self.play(Create(b_k), FadeIn(k_l), run_time=0.8)
            self.play(el.animate.move_to(P(-1.9, 2.35)), run_time=0.8)
            self.play(Write(eq), Create(box), run_time=1.6)

        with self.voiceover("If h nu is less than phi, nothing comes out: that is the threshold. For sodium, phi is two "
                            "point seven five electron volts, so the threshold wavelength is twelve forty over two point "
                            "seven five, about four fifty nanometres.") as vo:
            short = vec(P(-2.4, y_e), P(-2.4, 0.2), WARN, sw=6)
            el2 = electron().move_to(P(-2.4, y_e))
            xs = cross_mark().scale(0.6).next_to(short.get_end(), RIGHT, buff=0.15)
            self.play(el.animate.set_opacity(0.3), FadeIn(el2), run_time=0.4)
            self.play(GrowArrow(short), run_time=0.7)
            self.play(FadeIn(xs), run_time=0.3)
            t1 = M(r"h\nu < \phi \;\Rightarrow\; \text{no emission}", 42, color=WARN).move_to(P(2.9, 0.0))
            t2 = M(r"\lambda_0 = \frac{1240}{\phi}", 46).move_to(P(2.9, -1.3))
            t3 = M(r"\text{sodium: } \lambda_0 = \frac{1240}{2.75} \approx 451\ \text{nm}", 42, color=GREEN)
            t3.move_to(P(2.9, -2.7))
            fit(t3, 7.2)
            self.play(Write(t1), run_time=1.0)
            self.wait(vo.duration * 0.1)
            self.play(Write(t2), run_time=1.0)
            self.wait(vo.duration * 0.1)
            self.play(Write(t3), run_time=1.3)

        with self.voiceover("Three hundred nanometre light on potassium: each photon brings four point one three electron volts. Subtract phi, two point three, and K max is one point eight three. So the stopping potential is one point eight three volts.") as vo:
            self.clear_scene(0.5)
            h = M(r"\lambda = 300\ \text{nm on potassium},\quad \phi = 2.3\ \text{eV}", 44, color=MUTED)
            h.move_to(P(0, 2.6))
            l1 = M(r"h\nu = \frac{1240}{300} = 4.13\ \text{eV}", 48).move_to(P(0, 1.1))
            l2 = M(r"K_{\max} = 4.13 - 2.3 = 1.83\ \text{eV}", 48).move_to(P(0, -0.3))
            l3 = M(r"V_0 = 1.83\ \text{V}", 56, color=GREEN).move_to(P(0, -1.8))
            self.play(FadeIn(h), run_time=0.7)
            self.wait(vo.duration * 0.05)
            self.play(Write(l1), run_time=1.2)
            self.wait(vo.duration * 0.1)
            self.play(Write(l2), run_time=1.2)
            self.wait(vo.duration * 0.12)
            self.play(Write(l3), run_time=0.9)

        with self.voiceover("Careful: doubling the frequency does not double the stopping potential. With phi "
                            "equal to two, photons of three electron volts give one volt. Photons of six give "
                            "four volts. The minus phi breaks the proportion.") as vo:
            self.clear_scene(0.5)
            hd = M(r"\phi = 2\ \text{eV}", 48, color=PHI_C).move_to(P(-3.3, 3.1))
            s = 0.75
            base = -3.0
            bars = VGroup()
            for x, E in ((-4.6, 3), (-2.0, 6)):
                pb = Rectangle(width=1.4, height=2 * s, stroke_width=2, stroke_color=INK)
                pb.set_fill(PHI_C, 0.55).move_to(P(x, base + s))
                kb = Rectangle(width=1.4, height=(E - 2) * s, stroke_width=2, stroke_color=INK)
                kb.set_fill(K_C, 0.55).move_to(P(x, base + 2 * s + (E - 2) * s / 2))
                top = M(rf"h\nu = {E}\ \text{{eV}}", 36, color=PH_C).next_to(kb, UP, buff=0.15)
                kl = M(rf"V_0 = {E - 2}\ \text{{V}}", 34, color=K_C).move_to(P(x, base - 0.4))
                bars.add(VGroup(pb, kb, top, kl))
            ground = Line(P(-5.8, base), P(-0.8, base), color=MUTED, stroke_width=3)
            hd.move_to(P(-3.3, 3.2))
            self.play(FadeIn(hd), Create(ground), run_time=0.6)
            self.play(FadeIn(bars[0], shift=0.2 * UP), run_time=0.8)
            self.wait(vo.duration * 0.15)
            self.play(FadeIn(bars[1], shift=0.2 * UP), run_time=0.8)
            r1 = M(r"\nu \times 2", 48).move_to(P(3.4, 1.2))
            r2 = M(r"V_0:\ 1\ \text{V} \to 4\ \text{V}", 48, color=WARN).move_to(P(3.4, 0.0))
            r3 = T("linear, not proportional", 28, color=MUTED).move_to(P(3.4, -1.2))
            self.play(Write(r1), run_time=0.6)
            self.play(Write(r2), run_time=0.9)
            self.play(FadeIn(r3), run_time=0.5)

    # ------------------------------------------------------------ scene 5: graphs
    def s5(self):
        rule1 = T("Intensity sets the current.", 32, color=SECONDARY, weight="BOLD")
        rule2 = T("Frequency sets the stopping potential.", 32, color=PRIMARY, weight="BOLD")
        rules = VGroup(rule1, rule2).arrange(DOWN, buff=0.35).move_to(P(0, 0.3))
        with self.voiceover("Every photoelectric graph follows one rule. Intensity sets how many electrons, so the current. "
                            "Frequency sets how fast the fastest ones are, so the stopping potential.") as vo:
            self.wait(vo.duration * 0.25)
            self.play(FadeIn(rule1, shift=0.2 * UP), run_time=0.8)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(rule2, shift=0.2 * UP), run_time=0.8)
        self.play(rules.animate.scale(0.75).arrange(RIGHT, buff=0.6).move_to(P(0, 3.4)), run_time=0.7)

        ax = Axes(x_range=[-3, 4, 1], y_range=[0, 3.6, 1], x_length=7.6, y_length=4.4, tips=False,
                  axis_config={"color": MUTED, "stroke_width": 3, "include_ticks": True})
        ax.move_to(P(-1.6, -0.6))
        xl = M("V", 36).next_to(ax.x_axis.get_end(), RIGHT, buff=0.15)
        yl = M("I", 36).next_to(ax.y_axis.get_end(), UP, buff=0.15)

        def iv(Is, V0, color):
            return ax.plot(lambda v: Is * (1 - np.exp(-(v + V0) / 0.6)) if v > -V0 else 0.0,
                           x_range=[-3, 4, 0.01], color=color, stroke_width=5)

        dim = iv(1.0, 1.0, SECONDARY)
        bright = iv(3.0, 1.0, PRIMARY)
        foot = Dot(ax.c2p(-1, 0), color=INK, radius=0.07)
        foot_l = M(r"-V_0", 34).next_to(foot, DOWN, buff=0.2)
        dim_l = T("dim", 26, color=SECONDARY).next_to(ax.c2p(4, 1.0), UP, buff=0.12)
        br_l = T("3x brighter", 26, color=PRIMARY).next_to(ax.c2p(4, 3.0), UP, buff=0.12).shift(0.3 * LEFT)
        RX = 4.9
        n1 = T("3x the current", 28, color=PRIMARY).move_to(P(RX, 1.0))
        n2 = M(r"\text{same } V_0", 40).move_to(P(RX, 0.1))

        with self.voiceover("Here is current against voltage for two brightnesses. The brighter curve levels off "
                            "three times higher, but both reach zero at the same voltage, minus V nought.") as vo:
            self.play(Create(ax), FadeIn(xl), FadeIn(yl), run_time=0.8)
            self.play(Create(dim), FadeIn(dim_l), run_time=1.2)
            self.play(Create(bright), FadeIn(br_l), run_time=1.2)
            self.play(FadeIn(n1), run_time=0.5)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(foot), FadeIn(foot_l), FadeIn(n2), Flash(foot, color=HL), run_time=0.8)

        lo = iv(2.0, 1.0, ACCENT)
        hi = iv(2.0, 2.2, PURPLE)
        lo_l = T("lower frequency", 24, color=ACCENT).next_to(ax.c2p(4, 2.0), UP, buff=0.12).shift(0.6 * LEFT)
        hi_l = T("higher frequency", 24, color=PURPLE).move_to(ax.c2p(-1.6, 2.6))
        m1 = T("same saturation", 28, color=INK).move_to(P(RX, 1.0))
        m2 = M(r"\text{larger } V_0", 40, color=PURPLE).move_to(P(RX, 0.1))
        with self.voiceover("Now hold the photon rate fixed and raise the frequency. The saturation level stays "
                            "put, but the foot of the curve slides further negative. A bigger stopping "
                            "potential.") as vo:
            self.play(FadeOut(VGroup(dim, bright, dim_l, br_l, n1, n2, foot_l)), run_time=0.5)
            self.play(Create(lo), FadeIn(lo_l), run_time=1.1)
            self.play(Create(hi), FadeIn(hi_l), run_time=1.1)
            self.play(FadeIn(m1), run_time=0.5)
            self.wait(vo.duration * 0.1)
            self.play(foot.animate.move_to(ax.c2p(-2.2, 0)).set_color(PURPLE), FadeIn(m2), run_time=0.9)

        with self.voiceover("Plot stopping potential against frequency, and every metal gives a straight line of slope h "
                            "over e: caesium, sodium and copper are parallel, each leaving the axis at its own threshold. "
                            "Extended back, they meet the vertical axis at minus phi over e.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m not in (rules, rule1, rule2)], run_time=0.5)
            bx = Axes(x_range=[0, 13, 2], y_range=[-5, 4, 1], x_length=8.0, y_length=5.6, tips=False,
                      axis_config={"color": MUTED, "stroke_width": 3})
            bx.move_to(P(-2.0, -0.35))
            bxl = M(r"\nu\ (10^{14}\,\text{Hz})", 30).next_to(bx.c2p(13, 0), DOWN, buff=0.35).align_to(bx.c2p(13, 0), RIGHT)
            byl = M(r"V_0\ (\text{V})", 30).next_to(bx.y_axis.get_end(), UP, buff=0.12)
            self.play(Create(bx), FadeIn(bxl), FadeIn(byl), run_time=0.8)
            s = 0.414
            metals = [("Cs", 2.14, PRIMARY), ("Na", 2.75, SECONDARY), ("Cu", 4.65, PURPLE)]
            sol, das, labs = [], [], []
            for name, phi, c in metals:
                n0 = phi / s
                sol.append(Line(bx.c2p(n0, 0), bx.c2p(13, s * 13 - phi), color=c, stroke_width=5))
                das.append(DashedLine(bx.c2p(0, -phi), bx.c2p(n0, 0), color=c, stroke_width=3))
                labs.append(T(name, 26, color=c, weight="BOLD").next_to(bx.c2p(n0, 0), UL if name == "Cu" else DR, buff=0.12))
            self.play(LaggedStart(*[Create(l) for l in sol], lag_ratio=0.4),
                      LaggedStart(*[FadeIn(l) for l in labs], lag_ratio=0.4), run_time=2.0)
            sl = M(r"\text{slope} = \frac{h}{e}", 44).move_to(P(4.9, 1.6))
            sl2 = T("same for every metal", 26, color=MUTED).next_to(sl, DOWN, buff=0.2)
            self.play(Write(sl), FadeIn(sl2), run_time=1.0)
            self.wait(vo.duration * 0.12)
            self.play(*[Create(d) for d in das], run_time=1.2)
            mp = M(r"-\frac{\phi}{e}", 38, color=PURPLE).next_to(bx.c2p(0, -4.65), LEFT, buff=0.15)
            eqn = M(r"V_0 = \frac{h}{e}\,\nu - \frac{\phi}{e}", 42).move_to(P(4.9, -0.8))
            self.play(FadeIn(mp), Write(eqn), run_time=1.2)

    # ------------------------------------------------------------ scene 6: matter waves
    def s6(self):
        hdr = T("de Broglie, 1923", 34, color=PRIMARY, weight="BOLD").move_to(P(0, 3.2))
        ph = packet(PH_C, lam=0.4, length=2.6, amp=0.35).move_to(P(-3.4, 0.9))
        ph_l = T("light: a wave that arrives as particles", 26, color=MUTED).move_to(P(-3.4, -0.3))
        ball = Circle(radius=0.45, color=EL_C, stroke_width=4).set_fill(EL_C, 0.35).move_to(P(3.4, 0.9))
        q = T("?", 56, color=PRIMARY, weight="BOLD").next_to(ball, RIGHT, buff=0.35)
        ball_l = T("matter: particles that travel as waves?", 26, color=MUTED).move_to(P(3.4, -0.3))
        pf = M(r"p = \frac{h}{\lambda}", 56, color=PH_C).move_to(P(0, -2.0))
        with self.voiceover("Then de Broglie turned it around: if a wave can act like a particle, can a particle act like a "
                            "wave? A photon has p equals h over lambda, so he proposed the same for everything.") as vo:
            self.play(FadeIn(hdr), Create(ph), FadeIn(ph_l), run_time=1.2)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(ball), FadeIn(q), FadeIn(ball_l), run_time=0.9)
            self.wait(vo.duration * 0.15)
            self.play(Write(pf), run_time=1.2)
            self.play(Indicate(pf, color=HL), run_time=0.8)

        Vt = ValueTracker(25.0)
        Y = -1.6
        XE = 1.6

        def lam_ang():
            return 12.27 / np.sqrt(Vt.get_value())

        def wave():
            L = 0.6 * lam_ang()
            return FunctionGraph(lambda x: Y + 0.4 * np.sin(2 * np.pi * (x - XE) / L),
                                 x_range=[-6.2, XE, 0.01], color=EL_C, stroke_width=4)

        wv = always_redraw(wave)
        dot = Dot(P(XE, Y), radius=0.16, color=EL_C)
        dot_l = M("e^-", 34, color=EL_C).next_to(dot, UP, buff=0.5)
        chain = M(r"\lambda = \frac{h}{p} = \frac{h}{\sqrt{2mK}} = \frac{h}{\sqrt{2mqV}}", 52).move_to(P(0, 2.7))
        short = M(r"\lambda_e = \frac{12.27}{\sqrt V}\ \text{\AA}", 52, color=PRIMARY).move_to(P(0, 0.9))
        sbox = SurroundingRectangle(short, buff=0.25, corner_radius=0.15, color=PRIMARY, stroke_width=3)
        vl = M(r"V =", 40).move_to(P(3.6, -1.1))
        vv = DecimalNumber(25, num_decimal_places=0, font_size=40, color=INK, unit=r"\ \text{V}")
        vv.add_updater(lambda m: m.set_value(Vt.get_value()).next_to(vl, RIGHT, buff=0.15))
        ll = M(r"\lambda =", 40).move_to(P(3.6, -2.1))
        lv = DecimalNumber(2.45, num_decimal_places=2, font_size=40, color=EL_C, unit=r"\ \text{\AA}")
        lv.add_updater(lambda m: m.set_value(lam_ang()).next_to(ll, RIGHT, buff=0.15))

        with self.voiceover("Any particle with momentum p has a wavelength, lambda equals h over p. For a charge q "
                            "accelerated through a voltage V, the momentum is root two m q V. For an electron the "
                            "constants combine to twelve point two seven over root V, in angstroms.") as vo:
            self.clear_scene(0.5)
            self.play(Write(chain), run_time=2.0)
            self.play(Create(wv), FadeIn(dot), FadeIn(dot_l), FadeIn(vl), FadeIn(vv), FadeIn(ll), FadeIn(lv),
                      run_time=1.0)
            self.wait(vo.duration * 0.12)
            self.play(Write(short), Create(sbox), run_time=1.4)
            self.play(Vt.animate.set_value(400), run_time=3.0, rate_func=smooth)

        with self.voiceover("At a hundred volts, an electron's wavelength is one point two two seven angstroms, about the "
                            "spacing of atoms in a crystal. A cricket ball's is around ten to the minus thirty four metres, "
                            "so a ball never diffracts.") as vo:
            self.play(Vt.animate.set_value(100), run_time=1.5)
            r100 = M(r"\tfrac{12.27}{\sqrt{100}} = 1.227\ \text{\AA}", 40, color=GREEN).move_to(P(4.3, 0.0))
            atoms = VGroup(*[Dot(P(x, -3.25), radius=0.1, color=MUTED)
                             for x in np.arange(XE, -6.3, -0.6 * 1.227)])
            at_l = T("atoms in a crystal", 22, color=MUTED).move_to(P(4.0, -3.25))
            self.play(FadeOut(sbox), short.animate.scale(0.7).move_to(P(-4.4, 0.9)), FadeIn(r100), run_time=0.8)
            self.play(LaggedStart(*[FadeIn(a) for a in atoms], lag_ratio=0.1), FadeIn(at_l), run_time=1.2)
            self.wait(vo.duration * 0.12)
            vv.clear_updaters()
            lv.clear_updaters()
            self.play(*[FadeOut(m) for m in self.mobjects], run_time=0.6)
            self.remove(wv)
            cb = Circle(radius=0.5, color=PRIMARY, stroke_width=4).set_fill(PRIMARY, 0.4).move_to(P(-4.6, 1.3))
            seam = Arc(radius=0.35, start_angle=-60 * DEGREES, angle=120 * DEGREES, arc_center=cb.get_center()
                       + 0.1 * LEFT, color=WHITE, stroke_width=3)
            sp = vec(P(-3.9, 1.3), P(-2.3, 1.3), INK, sw=5)
            sp_l = M(r"30\ \text{m/s}", 32).next_to(sp, UP, buff=0.12)
            m_l = M(r"0.15\ \text{kg}", 32).next_to(cb, DOWN, buff=0.2)
            bl = M(r"\lambda = \frac{6.63\times10^{-34}}{0.15\times30} \approx 1.5\times10^{-34}\ \text{m}", 46)
            bl.move_to(P(1.6, -0.6))
            fit(bl, 9.5)
            bc = T("far too small to ever diffract", 30, color=PRIMARY).move_to(P(1.6, -2.1))
            self.play(FadeIn(cb), FadeIn(seam), GrowArrow(sp), FadeIn(sp_l), FadeIn(m_l), run_time=0.8)
            self.play(Write(bl), run_time=1.4)
            self.play(FadeIn(bc), run_time=0.6)

        with self.voiceover("Wavelength depends on momentum, not mass alone: a slow proton and a fast electron with equal "
                            "momentum have the same wavelength. And the matter wave is not electromagnetic; it is a wave of "
                            "probability.") as vo:
            self.clear_scene(0.5)
            rows = []
            for y, r, col, name, spd in ((1.6, 0.26, PURPLE, "slow proton", 0.7), (-0.6, 0.1, EL_C,
                                                                                    "fast electron", 1.6)):
                w = FunctionGraph(lambda x, y=y: y + 0.35 * np.sin(2 * np.pi * x / 0.9), x_range=[-5.6, 0.6, 0.01],
                                  color=col, stroke_width=4)
                d = Dot(P(0.6, y), radius=r, color=col)
                v = vec(P(1.05, y), P(1.05 + spd, y), INK, sw=4)
                lab = T(name, 26, color=col).move_to(P(-5.0, y + 0.75))
                rows.append(VGroup(w, d, v, lab))
            self.play(FadeIn(rows[0]), run_time=0.7)
            self.play(FadeIn(rows[1]), run_time=0.7)
            eq = M(r"p_p = p_e \;\Rightarrow\; \lambda_p = \lambda_e", 44).move_to(P(4.4, 0.5))
            self.play(Write(eq), run_time=1.0)
            self.wait(vo.duration * 0.15)
            c1 = T("a probability wave,", 30, color=PRIMARY).move_to(P(0, -2.3))
            c2 = T("not an electromagnetic wave", 30, color=PRIMARY).next_to(c1, DOWN, buff=0.15)
            self.play(FadeIn(c1), FadeIn(c2), run_time=0.7)

    # ------------------------------------------------------------ scene 7: Davisson-Germer
    def s7(self):
        hit = P(-3.0, -1.6)
        crystal = VGroup(*[Dot(P(-3.0 + 0.45 * i, -1.85 - 0.42 * j), radius=0.08, color=MUTED)
                           for i in range(-4, 5) for j in range(3)])
        cr_l = T("nickel crystal", 24, color=MUTED).move_to(P(-3.0, -3.25))
        gun = RoundedRectangle(width=0.7, height=1.2, corner_radius=0.12, stroke_color=INK, stroke_width=3)
        gun.set_fill(GRID, 1).move_to(P(-3.0, 2.7))
        gun_l = T("electron gun", 24).next_to(gun, LEFT, buff=0.25)
        beam = Line(P(-3.0, 2.1), hit, color=EL_C, stroke_width=3)
        th = ValueTracker(20 * DEGREES)

        def arm_end():
            return hit + 3.3 * np.array([np.sin(th.get_value()), np.cos(th.get_value()), 0])

        arm = always_redraw(lambda: Line(hit, arm_end(), color=INK, stroke_width=4))
        det = always_redraw(lambda: Square(0.45, color=INK, stroke_width=3).set_fill(ACCENT, 1)
                            .rotate(-th.get_value()).move_to(arm_end()))
        ref = DashedLine(hit, hit + 2.2 * UP, color=MUTED, stroke_width=2)
        arc = always_redraw(lambda: Arc(radius=0.9, start_angle=PI / 2, angle=-th.get_value(), arc_center=hit,
                                        color=INK, stroke_width=3))
        thl = always_redraw(lambda: M(r"\theta", 32).move_to(
            hit + 1.25 * np.array([np.sin(th.get_value() / 2), np.cos(th.get_value() / 2), 0])))
        det_l = always_redraw(lambda: T("detector", 24).next_to(arm_end(), UR, buff=0.35))

        with self.voiceover("Davisson and Germer tested it. An electron gun fired a beam at a nickel crystal, and a detector"
                            " swung round to count the electrons scattered at each angle.") as vo:
            self.play(FadeIn(crystal), FadeIn(cr_l), FadeIn(gun), FadeIn(gun_l), run_time=0.9)
            els = [electron() for _ in range(5)]
            self.fly(els, [P(-3.0, 2.0)] * 5, [hit] * 5, run_time=1.6, travel=0.8)
            self.play(Create(beam), run_time=0.5)
            self.play(Create(ref), FadeIn(arm), FadeIn(det), FadeIn(arc), FadeIn(thl), FadeIn(det_l), run_time=0.9)
            self.play(th.animate.set_value(70 * DEGREES), run_time=2.0)
            self.play(th.animate.set_value(20 * DEGREES), run_time=1.2)

        ax = Axes(x_range=[0, 90, 30], y_range=[0, 1.2, 0.5], x_length=4.4, y_length=3.2, tips=False,
                  axis_config={"color": MUTED, "stroke_width": 3})
        ax.move_to(P(4.1, 0.0))
        axl = M(r"\theta", 32).next_to(ax.x_axis.get_end(), RIGHT, buff=0.12)
        ayl = T("count", 24, color=MUTED).next_to(ax.y_axis.get_end(), UP, buff=0.12)
        ticks = VGroup(*[M(rf"{a}^\circ", 28, color=MUTED).next_to(ax.c2p(a, 0), DOWN, buff=0.12)
                         for a in (30, 60, 90)])
        smooth_c = ax.plot(lambda a: 0.35 + 0.18 * np.sin(a * DEGREES * 2), x_range=[20, 80, 0.5],
                           color=MUTED, stroke_width=4)
        peak_c = ax.plot(lambda a: 0.3 + 0.12 * np.sin(a * DEGREES * 2) + 0.62 * np.exp(-((a - 50) / 5) ** 2),
                         x_range=[20, 80, 0.25], color=PRIMARY, stroke_width=5)
        s_l = T("most voltages: smooth", 24, color=MUTED).next_to(ax, UP, buff=0.45)
        p_l = T("54 V: sharp peak at 50°", 26, color=PRIMARY).next_to(ax, UP, buff=0.45)

        with self.voiceover("At most voltages, the count changed smoothly with angle. At fifty four volts, a sharp peak "
                            "stood out at fifty degrees: the signature of waves adding in phase, from rows of atoms.") as vo:
            self.play(Create(ax), FadeIn(axl), FadeIn(ayl), FadeIn(ticks), FadeIn(s_l), run_time=0.8)
            self.play(Create(smooth_c), th.animate.set_value(80 * DEGREES), run_time=2.4, rate_func=linear)
            self.play(smooth_c.animate.set_stroke(opacity=0.35), FadeOut(s_l), FadeIn(p_l), run_time=0.5)
            self.play(th.animate.set_value(20 * DEGREES), run_time=0.8)
            self.play(Create(peak_c), th.animate.set_value(80 * DEGREES), run_time=2.4, rate_func=linear)
            self.play(th.animate.set_value(50 * DEGREES), run_time=0.8)
            self.play(Flash(det.get_center(), color=HL), Flash(ax.c2p(50, 0.92), color=HL), run_time=0.8)

        with self.voiceover("Check it two ways. From the crystal, d sine theta gives one point six five angstroms. From de "
                            "Broglie, twelve point two seven over root fifty four gives one point six seven: about one "
                            "percent apart.") as vo:
            arm.clear_updaters()
            det.clear_updaters()
            arc.clear_updaters()
            thl.clear_updaters()
            det_l.clear_updaters()
            self.clear_scene(0.5)
            hd = T("Two independent routes to the wavelength", 34, color=PRIMARY, weight="BOLD").move_to(P(0, 3.0))
            d1 = M(r"\text{diffraction:}\quad \lambda = d\sin\theta = 2.15\times\sin 50^\circ \approx 1.65\ \text{\AA}",
                   46)
            d2 = M(r"\text{de Broglie:}\quad \lambda = \frac{12.27}{\sqrt{54}} \approx 1.67\ \text{\AA}", 46)
            fit(d1, 12.5).move_to(P(0, 1.3))
            fit(d2, 12.5).move_to(P(0, -0.3))
            ag = T("they agree to about 1%", 32, color=GREEN).move_to(P(0, -1.9))
            self.play(FadeIn(hd), run_time=0.6)
            self.wait(vo.duration * 0.08)
            self.play(Write(d1), run_time=1.8)
            self.wait(vo.duration * 0.12)
            self.play(Write(d2), run_time=1.6)
            self.play(FadeIn(ag), run_time=0.6)

        with self.voiceover("Yet send the electrons one at a time, and each one lands at a single point, whole. Only "
                            "thousands build the pattern. Electrons travel as waves and arrive as particles, and so does "
                            "light.") as vo:
            self.clear_scene(0.5)
            scr = Rectangle(width=11.0, height=3.6, stroke_color=INK, stroke_width=2).set_fill(WHITE, 0.9)
            scr.move_to(P(0, 0.6))
            sl = T("detector screen", 24, color=MUTED).next_to(scr, UP, buff=0.15)
            self.play(FadeIn(scr), FadeIn(sl), run_time=0.5)
            rng = np.random.default_rng(7)
            pts = []
            while len(pts) < 900:
                x = rng.uniform(-5.3, 5.3)
                if rng.uniform() < np.cos(1.5 * x) ** 2 * np.exp(-(x / 3.6) ** 2):
                    pts.append(P(x, 0.6 + rng.uniform(-1.6, 1.6)))
            dots = [Dot(p, radius=0.035, color=EL_C) for p in pts]
            for d in dots[:5]:
                self.play(FadeIn(d, scale=3), run_time=0.35)
            one = T("one electron, one point", 28, color=EL_C).move_to(P(0, -1.8))
            self.play(FadeIn(one), run_time=0.4)
            self.play(LaggedStart(*[FadeIn(d) for d in dots[5:120]], lag_ratio=0.05), run_time=1.6)
            self.play(LaggedStart(*[FadeIn(d) for d in dots[120:]], lag_ratio=0.01), run_time=2.0)
            cap = T("travel as waves, arrive as particles", 32, color=PRIMARY, weight="BOLD").move_to(P(0, -2.7))
            self.play(FadeOut(one), FadeIn(cap), run_time=0.6)

    # ------------------------------------------------------------ scene 8: recap
    def s8(self):
        title = T("Chapter 3 in five lines", 38, color=PRIMARY, weight="BOLD").move_to(P(0, 3.2))
        lines = [
            (r"E = h\nu = \tfrac{1240}{\lambda},\ \ p = \tfrac{h}{\lambda}", "colour sets size, brightness sets count"),
            (r"K_{\max} = h\nu - \phi = eV_0", "one photon frees one electron"),
            (r"\lambda_0 = \tfrac{1240}{\phi}", "below threshold: nothing, ever"),
            (r"V_0 = \tfrac{h}{e}\nu - \tfrac{\phi}{e}", "frequency sets the stopping potential"),
            (r"\lambda = \tfrac{h}{p} = \tfrac{12.27}{\sqrt V}\ \text{\AA}", "matter waves, seen by Davisson-Germer"),
        ]
        rows = VGroup()
        for i, (tex, note) in enumerate(lines):
            m = fit(M(tex, 46), 4.9)
            n = T(note, 28, color=MUTED)
            num = T(f"{i + 1}.", 28, color=PRIMARY, weight="BOLD")
            rows.add(VGroup(num, m, n))
        for r in rows:
            r[0].move_to(P(-6.2, 0))
            r[1].next_to(r[0], RIGHT, buff=0.3)
        rows.arrange(DOWN, buff=0.5, aligned_edge=LEFT).move_to(P(0, -0.1))
        for r in rows:
            r[0].set_x(-6.2)
            r[1].next_to(r[0], RIGHT, buff=0.3)
            fit(r[2], 7.0)
            r[2].move_to(P(-0.5, r[1].get_y()), aligned_edge=LEFT)
        with self.voiceover("To recap. Light comes in photons: colour sets the energy of each, brightness sets how many. One"
                            " photon frees one electron, so K max equals h nu minus phi.") as vo:
            self.play(FadeIn(title), run_time=0.6)
            self.play(FadeIn(rows[0], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.3)
            self.play(FadeIn(rows[1], shift=0.15 * UP), run_time=0.7)
        with self.voiceover("Below threshold, nothing comes out. Intensity sets the current, and frequency sets the stopping potential. And every particle has a wavelength, h over p.") as vo:
            self.play(FadeIn(rows[2], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(rows[3], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.25)
            self.play(FadeIn(rows[4], shift=0.15 * UP), run_time=0.7)
        with self.voiceover("Try the mastery quiz. Then chapter four wraps an electron wave around a nucleus, and whole "
                            "numbers of wavelengths explain the sharp lines of the hydrogen spectrum.") as vo:
            nxt = T("Next: Chapter 4 · Atoms and Nuclei", 32, color=PRIMARY).move_to(P(0, -3.4))
            self.wait(vo.duration * 0.3)
            self.play(FadeIn(nxt, shift=0.2 * UP), run_time=0.8)
