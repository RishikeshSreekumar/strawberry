import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

# Chapter colour roles (light background).
G_C = PRIMARY  # gravity / forces = strawberry red
V_C = SECONDARY  # velocities, the Earth = teal
E_C = ACCENT  # energies, swept areas, the Sun = amber
P_C = PURPLE  # potentials
HL = ManimColor("#D19A00")  # highlight gold
WARN = PRIMARY
EARTH = ManimColor("#BFDDE3")


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


def check():
    return MathTex(r"\checkmark", color=GREEN, font_size=56)


def cross_mark():
    return MathTex(r"\times", color=WARN, font_size=64)


def arrow(start, end, color, sw=5):
    return Arrow(start, end, buff=0, color=color, stroke_width=sw,
                 max_tip_length_to_length_ratio=0.25, max_stroke_width_to_length_ratio=10)


def axes(xr, yr, xl, yl, nums_x=None, nums_y=None, dx=0, dy=1):
    return Axes(x_range=xr, y_range=yr, x_length=xl, y_length=yl,
                axis_config={"color": INK, "stroke_width": 2, "include_tip": False},
                x_axis_config={"numbers_to_include": nums_x or [], "font_size": 22,
                               "decimal_number_config": {"color": INK, "num_decimal_places": dx}},
                y_axis_config={"numbers_to_include": nums_y or [], "font_size": 22,
                               "decimal_number_config": {"color": INK, "num_decimal_places": dy}})


def orbit_path(r0, v0, steps=6000, dt=0.002, stop_r=1.0, box=None, centre=ORIGIN, scale=1.0, max_angle=None):
    """Integrate motion under GM = 1 (radius unit = planet radius). Returns frame points."""
    r = np.array(r0, dtype=float)
    v = np.array(v0, dtype=float)
    pts = [centre + scale * np.array([r[0], r[1], 0])]
    a = -r / np.linalg.norm(r) ** 3
    swept = 0.0
    prev = np.arctan2(r[1], r[0])
    for _ in range(steps):
        r = r + v * dt + 0.5 * a * dt * dt
        a2 = -r / np.linalg.norm(r) ** 3
        v = v + 0.5 * (a + a2) * dt
        a = a2
        p = centre + scale * np.array([r[0], r[1], 0])
        pts.append(p)
        if np.linalg.norm(r) < stop_r:
            break
        if box is not None and not (box[0] <= p[0] <= box[1] and box[2] <= p[1] <= box[3]):
            break
        if max_angle is not None:
            ang = np.arctan2(r[1], r[0])
            d = (ang - prev + PI) % TAU - PI
            swept += abs(d)
            prev = ang
            if swept >= max_angle:
                break
    return pts


class MrgCh5Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Momentum, Rotation & Gravitation",
            "Chapter 5 · Gravitation",
            "Chapter five. Gravitation.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ scene 1: the law
    def s1(self):
        C = P(-3.4, -0.4)
        Re = 1.0
        rm = 3.0
        earth = Circle(radius=Re, color=V_C, stroke_width=3).set_fill(EARTH, 1).move_to(C)
        el = T("Earth", 22, color=V_C).move_to(C)
        orb = DashedVMobject(Circle(radius=rm, color=GRID, stroke_width=2).move_to(C), num_dashes=60)
        th = ValueTracker(60 * DEGREES)

        def mpos():
            a = th.get_value()
            return C + rm * np.array([np.cos(a), np.sin(a), 0])

        moon = always_redraw(lambda: Circle(radius=0.22, color=MUTED, stroke_width=2).set_fill(GRID, 1).move_to(mpos()))
        vel = always_redraw(lambda: arrow(mpos(), mpos() + 1.2 * np.array([-np.sin(th.get_value()),
                                                                           np.cos(th.get_value()), 0]), V_C, sw=4))
        grav = always_redraw(lambda: arrow(mpos(), mpos() + 0.9 * (C - mpos()) / rm, G_C, sw=4))
        apple = Dot(C + Re * UP + 1.3 * UP, radius=0.1, color=G_C)
        with self.voiceover("An apple falls because the Earth pulls it. Newton's leap was to say the Moon is falling "
                            "too. It moves sideways so fast that, as it falls, the Earth curves away beneath "
                            "it.") as vo:
            self.play(FadeIn(earth), FadeIn(el), FadeIn(apple), run_time=0.7)
            self.play(apple.animate.move_to(C + Re * UP + 0.1 * UP), run_time=0.7, rate_func=rate_functions.ease_in_quad)
            self.play(Create(orb), FadeIn(moon), run_time=0.8)
            self.play(FadeIn(vel), FadeIn(grav), run_time=0.6)
            p0 = mpos()
            t0 = np.array([-np.sin(th.get_value()), np.cos(th.get_value()), 0])
            straight = DashedLine(p0, p0 + 2.2 * t0, color=MUTED, stroke_width=2)
            sl = T("without gravity", 20, color=MUTED).next_to(straight.get_end(), UP, buff=0.1)
            self.play(Create(straight), FadeIn(sl), run_time=0.7)
            self.play(th.animate.set_value(60 * DEGREES + 1.4), run_time=max(1.5, vo.duration - 3.8),
                      rate_func=linear)
        for m in (moon, vel, grav):
            m.clear_updaters()
        a1 = M(r"a_{\text{Moon}} = \frac{4\pi^2 r}{T^2} \approx 2.72\times10^{-3}\ \text{m/s}^2", 38)
        a2 = M(r"\frac{g}{60^2} = \frac{9.8}{3600} \approx 2.72\times10^{-3}\ \text{m/s}^2", 38)
        a3 = T("60 times farther, 3600 times weaker", 26, color=G_C)
        ac = VGroup(a1, a2, a3).arrange(DOWN, buff=0.35).move_to(P(3.3, 0.6))
        fit(ac, 6.6)
        with self.voiceover("The Moon is sixty Earth radii away, and its acceleration is about two point seven two "
                            "thousandths of a metre per second squared: g divided by three thousand six hundred. "
                            "Sixty times farther, three thousand six hundred times weaker. The pull falls off as the "
                            "inverse square.") as vo:
            self.play(FadeOut(straight), FadeOut(sl), run_time=0.3)
            self.play(Write(a1), run_time=1.6)
            self.wait(vo.duration * 0.1)
            self.play(Write(a2), run_time=1.6)
            self.play(FadeIn(a3), run_time=0.7)
        f = M(r"F = \frac{G\,m_1 m_2}{r^2}", 60).move_to(P(0, 2.4))
        box = SurroundingRectangle(f, buff=0.25, corner_radius=0.15, color=PRIMARY, stroke_width=3)
        gv = M(r"G = 6.67\times10^{-11}\ \text{N m}^2/\text{kg}^2", 36).move_to(P(0, 0.9))
        st = M(r"\text{two 50 kg students, 1 m apart: } F \approx 1.7\times10^{-7}\ \text{N}", 36, color=MUTED)
        st.move_to(P(0, -0.2))
        fit(st, 12.5)
        with self.voiceover("So every pair of masses attracts with G m one m two over r squared. G is tiny: two "
                            "fifty kilogram students a metre apart pull each other with less than a millionth of a "
                            "newton.") as vo:
            self.clear_scene(0.5)
            self.play(Write(f), Create(box), run_time=1.4)
            self.play(FadeIn(gv), run_time=0.7)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(st), run_time=0.8)
        with self.voiceover("Two more facts. A uniform shell pulls an outside mass as if all its mass were at the "
                            "centre, and pulls nothing at all on a mass inside it. And since the force is "
                            "proportional to m, the acceleration is not: a hammer and a feather fall "
                            "together.") as vo:
            self.play(FadeOut(gv), FadeOut(st), VGroup(f, box).animate.scale(0.7).move_to(P(4.6, 3.1)), run_time=0.6)
            S = P(-3.0, -0.8)
            Rs = 1.8
            shell = Circle(radius=Rs, color=V_C, stroke_width=8).move_to(S)
            out = Dot(S + 3.6 * RIGHT, radius=0.1, color=INK)
            oa = arrow(out.get_center(), out.get_center() + 1.0 * LEFT, G_C)
            ghost = Dot(S, radius=0.12, color=V_C)
            gl = T("as if at the centre", 22, color=V_C).next_to(out, DOWN, buff=0.35)
            ins = Dot(S + 0.8 * UR, radius=0.1, color=INK)
            il = M(r"F = 0", 32, color=G_C).next_to(ins, UP, buff=0.15)
            self.play(Create(shell), run_time=0.8)
            self.play(FadeIn(out), GrowArrow(oa), FadeIn(ghost), FadeIn(gl), run_time=0.9)
            self.play(FadeIn(ins), FadeIn(il), run_time=0.7)
            q = M(r"a = \frac{F}{m} = \frac{GM}{r^2}", 46).move_to(P(3.6, 0.6))
            qn = T("independent of the falling mass", 24, color=MUTED).next_to(q, DOWN, buff=0.25)
            self.wait(vo.duration * 0.15)
            self.play(Write(q), FadeIn(qn), run_time=1.4)

    # ------------------------------------------------------------ scene 2: g with height and depth
    def s2(self):
        e1 = M(r"g = \frac{GM}{R^2}", 44)
        e2 = M(r"g_h = g\,\frac{R^2}{(R+h)^2} \approx g\Big(1 - \frac{2h}{R}\Big)", 40)
        col = VGroup(e1, e2).arrange(DOWN, buff=0.4, aligned_edge=LEFT).move_to(P(3.7, 2.2))
        fit(col, 6.2)
        ax = axes([0, 3, 1], [0, 1.1, 0.5], 6.2, 4.2, nums_x=[1, 2, 3], nums_y=[0.5, 1], dx=0, dy=1)
        ax.move_to(P(-3.2, -0.6))
        xl = M(r"r/R", 28, color=MUTED).next_to(ax.x_axis, RIGHT, buff=0.1)
        yl = M(r"g/g_s", 28, color=MUTED).next_to(ax.y_axis, UP, buff=0.12)
        outside = ax.plot(lambda r: 1 / r ** 2, x_range=[1, 3], color=G_C, stroke_width=4)
        inside = ax.plot(lambda r: r, x_range=[0, 1], color=V_C, stroke_width=4)
        surf = DashedLine(ax.c2p(1, 0), ax.c2p(1, 1.08), color=MUTED, stroke_width=2)
        sl = T("surface", 20, color=MUTED).next_to(ax.c2p(1, 1.08), UP, buff=0.08)
        with self.voiceover("At the surface, g is G M over R squared. Go up a height h, and g falls as R squared over "
                            "R plus h, squared: about one minus two h over R, when h is small.") as vo:
            self.play(Create(ax), FadeIn(xl), FadeIn(yl), Create(surf), FadeIn(sl), run_time=0.9)
            self.play(Write(e1), run_time=0.9)
            self.wait(vo.duration * 0.1)
            self.play(Write(e2), Create(outside), run_time=2.0)
        e3 = M(r"g_d = g\Big(1 - \frac{d}{R}\Big)", 42, color=V_C).next_to(col, DOWN, buff=0.45).align_to(col, LEFT)
        with self.voiceover("Go down into the Earth, and by the shell theorem the rock above you pulls nothing. Only "
                            "the inner sphere counts, and g falls in a straight line, to zero at the centre. So g is "
                            "greatest at the surface, not at the centre.") as vo:
            self.wait(vo.duration * 0.2)
            self.play(Create(inside), Write(e3), run_time=2.0)
            pk = Dot(ax.c2p(1, 1), radius=0.09, color=HL)
            pl = T("greatest at the surface", 22, color=HL).next_to(ax.c2p(1, 1), RIGHT, buff=0.4).shift(0.35 * DOWN)
            zl = T("zero at the centre", 20, color=V_C).next_to(ax.c2p(0.42, 0), DOWN, buff=0.15)
            self.play(FadeIn(pk, scale=2), FadeIn(pl), FadeIn(zl), run_time=0.9)
        e4 = M(r"g_h = \tfrac g2:\ \ h = (\sqrt2 - 1)R \approx 2650\ \text{km}", 38)
        e5 = M(r"g_\lambda = g - \omega^2R\cos^2\lambda", 40)
        c2 = VGroup(e4, e5).arrange(DOWN, buff=0.4, aligned_edge=LEFT)
        fit(c2, 5.6)
        c2.next_to(e3, DOWN, buff=0.45).align_to(col, LEFT)
        with self.voiceover("g halves at a height of root two minus one times R: about two thousand six hundred and "
                            "fifty kilometres. And the Earth's spin takes a little more at the equator than at the "
                            "poles: g minus omega squared R cos squared lambda.") as vo:
            hp = 1 + (np.sqrt(2) - 1)
            hd = DashedLine(ax.c2p(hp, 0), ax.c2p(hp, 0.5), color=E_C, stroke_width=2)
            hd2 = DashedLine(ax.c2p(0, 0.5), ax.c2p(hp, 0.5), color=E_C, stroke_width=2)
            self.play(Create(hd), Create(hd2), Write(e4), run_time=1.8)
            self.wait(vo.duration * 0.15)
            self.play(Write(e5), run_time=1.4)

    # ------------------------------------------------------------ scene 3: field and potential
    def s3(self):
        d1 = M(r"\vec E = \frac{\vec F}{m}, \qquad V = \frac{U}{m}, \qquad E = -\frac{dV}{dr}", 44)
        d1.move_to(P(0, 3.0))
        fit(d1, 12.5)
        ax = axes([0, 3, 1], [-1.6, 0, 0.5], 6.6, 4.6, nums_x=[1, 2, 3], nums_y=[-1.5, -1, -0.5], dy=1)
        ax.move_to(P(-3.0, -0.9))
        xl = M(r"r/R", 28, color=MUTED).next_to(ax.x_axis, UP, buff=0.12).align_to(ax.x_axis, RIGHT)
        yl = M(r"V \ \big(\tfrac{GM}{R}\big)", 28, color=MUTED).next_to(ax.c2p(0, -1.6), RIGHT, buff=0.2)
        pm = ax.plot(lambda r: -1 / r, x_range=[0.65, 3], color=P_C, stroke_width=4)
        pml = M(r"V = -\frac{GM}{r}", 38, color=P_C).move_to(P(3.6, 1.6))
        with self.voiceover("Every mass fills the space around it with a field, the force per unit mass, and a "
                            "potential, the energy per unit mass. The field is minus the slope of the potential. For "
                            "a point mass, V is minus G M over r.") as vo:
            self.play(Write(d1), run_time=1.8)
            self.play(Create(ax), FadeIn(xl), FadeIn(yl), run_time=0.9)
            self.wait(vo.duration * 0.15)
            self.play(Create(pm), Write(pml), run_time=1.6)
        sh_in = ax.plot(lambda r: -1.0, x_range=[0, 1], color=V_C, stroke_width=5)
        with self.voiceover("Potentials are numbers, so they simply add. Inside a hollow shell the field is zero, but "
                            "the potential is not: it stays at minus G M over R, flat all the way across. Zero field "
                            "means a flat potential, not a zero one.") as vo:
            pm_out = ax.plot(lambda r: -1 / r, x_range=[1, 3], color=P_C, stroke_width=4)
            self.play(FadeOut(pm), FadeIn(pm_out), run_time=0.5)
            self.wait(vo.duration * 0.15)
            self.play(Create(sh_in), run_time=1.2)
            s1 = M(r"\text{shell, inside: } E = 0,\ \ V = -\frac{GM}{R}", 36, color=V_C).move_to(P(3.6, 0.3))
            fit(s1, 6.4)
            self.play(Write(s1), run_time=1.5)
            fl = T("flat, not zero", 24, color=V_C).next_to(ax.c2p(0.5, -1.0), UP, buff=0.15)
            self.play(FadeIn(fl), run_time=0.6)
        sol = ax.plot(lambda r: -(3 - r * r) / 2, x_range=[0, 1], color=G_C, stroke_width=5)
        with self.voiceover("For a solid sphere, the potential keeps falling inside, and the centre is the bottom of "
                            "the well: one and a half times the surface value.") as vo:
            self.play(Create(sol), run_time=1.4)
            s2 = M(r"\text{solid sphere: } V_{\text{centre}} = \tfrac32\,V_{\text{surface}}", 36, color=G_C)
            s2.move_to(P(3.6, -1.1))
            fit(s2, 6.4)
            bot = Dot(ax.c2p(0, -1.5), radius=0.09, color=HL)
            self.play(Write(s2), FadeIn(bot, scale=2), run_time=1.4)

    # ------------------------------------------------------------ scene 4: potential energy and escape
    def s4(self):
        u1 = M(r"U(r) = -\frac{GMm}{r}", 48).move_to(P(3.6, 2.4))
        ax = axes([0, 4, 1], [-1.2, 0.4, 0.5], 6.4, 4.2)
        ax.move_to(P(-3.2, -0.4))
        well = ax.plot(lambda r: -1 / r, x_range=[1, 4], color=P_C, stroke_width=4)
        zero = DashedLine(ax.c2p(0, 0), ax.c2p(4, 0), color=MUTED, stroke_width=2)
        zl = T("zero at infinity", 20, color=MUTED).next_to(ax.c2p(4, 0), UP, buff=0.12).shift(0.6 * LEFT)
        surf = Dot(ax.c2p(1, -1), radius=0.09, color=G_C)
        sl = T("surface", 20, color=G_C).next_to(surf, RIGHT, buff=0.15)
        xl = M(r"r/R", 26, color=MUTED).next_to(ax.x_axis, DOWN, buff=0.15).align_to(ax.x_axis, RIGHT)
        with self.voiceover("Bring a mass in from infinity, and gravity does work on it. So with zero at infinity the "
                            "potential energy is negative: minus G M m over r. Negative means bound: you must supply "
                            "energy to pull the masses apart.") as vo:
            self.play(Create(ax), Create(zero), FadeIn(zl), FadeIn(xl), run_time=0.9)
            self.play(Create(well), Write(u1), run_time=1.8)
            self.play(FadeIn(surf), FadeIn(sl), run_time=0.6)
            bnd = T("bound", 24, color=P_C).next_to(ax.c2p(2.0, -0.5), DOWN, buff=0.3)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(bnd), run_time=0.6)
        e1 = M(r"\tfrac12 mv_e^2 - \frac{GMm}{R} = 0", 42)
        e2 = M(r"v_e = \sqrt{\frac{2GM}{R}} = \sqrt{2gR} \approx 11.2\ \text{km/s}", 40, color=GREEN)
        col = VGroup(e1, e2).arrange(DOWN, buff=0.4).move_to(P(3.6, 0.6))
        fit(col, 6.4)
        with self.voiceover("To escape, a body needs enough kinetic energy to reach infinity: one half m v squared, "
                            "minus G M m over R, equals zero. So v e is root two g R: about eleven point two "
                            "kilometres per second for the Earth.") as vo:
            kin = arrow(ax.c2p(1, -1), ax.c2p(1, 0), E_C, sw=6)
            kl = M(r"\tfrac12 mv_e^2", 30, color=E_C).next_to(kin, LEFT, buff=0.1)
            self.play(GrowArrow(kin), FadeIn(kl), run_time=0.9)
            self.play(Write(e1), run_time=1.4)
            self.wait(vo.duration * 0.1)
            self.play(Write(e2), run_time=1.6)
        with self.voiceover("The mass cancels, and so does the direction. Energy is a scalar. Fired up, sideways, or "
                            "at any angle, a body at that speed escapes.") as vo:
            self.play(FadeOut(VGroup(ax, zero, zl, surf, sl, xl, well, kin, kl, u1, bnd)), run_time=0.5)
            self.play(col.animate.scale(0.85).move_to(P(3.85, 2.5)), run_time=0.5)
            C = P(-4.0, -1.8)
            sc = 1.1
            earth = Circle(radius=sc, color=V_C, stroke_width=3).set_fill(EARTH, 1).move_to(C)
            self.play(FadeIn(earth), run_time=0.5)
            box = (-7.0, 0.6, -4.0, 3.6)
            paths = VGroup()
            for ang in (90, 45, 0):
                a = ang * DEGREES
                v0 = np.sqrt(2) * np.array([np.cos(a), np.sin(a)])
                pts = orbit_path([0.0, 1.0], v0, steps=20000, dt=0.003, box=box, centre=C, scale=sc)
                pth = VMobject(color=E_C, stroke_width=3).set_points_smoothly(pts[::25] + [pts[-1]])
                paths.add(pth)
            launch = Dot(C + sc * UP, radius=0.09, color=G_C)
            self.play(FadeIn(launch), run_time=0.3)
            self.play(LaggedStart(*[Create(p) for p in paths], lag_ratio=0.3), run_time=max(2.0, vo.duration - 2.6))
            nd = T("any direction, any mass", 26, color=PRIMARY).move_to(P(3.85, 0.9))
            self.play(FadeIn(nd), run_time=0.6)

    # ------------------------------------------------------------ scene 5: orbits
    def s5(self):
        C = P(-3.6, -0.6)
        sc = 1.6
        earth = Circle(radius=sc, color=V_C, stroke_width=3).set_fill(EARTH, 1).move_to(C)
        mtn = Polygon(C + sc * UP + 0.35 * LEFT, C + sc * UP + 0.35 * RIGHT, C + (sc + 0.35) * UP, color=INK,
                      stroke_width=2).set_fill(GRID, 1)
        r0 = 1.0 + 0.35 / sc
        paths = VGroup()
        for f, col in ((0.6, MUTED), (0.82, MUTED), (1.0, E_C)):
            vc = np.sqrt(1 / r0)
            pts = orbit_path([0.0, r0], [f * vc, 0.0], steps=12000, dt=0.002, stop_r=0.995, centre=C, scale=sc,
                             max_angle=TAU * 0.999)
            paths.add(VMobject(color=col, stroke_width=3).set_points_smoothly(pts[::20] + [pts[-1]]))
        with self.voiceover("Newton imagined a cannon on a mountain. Fire faster and faster, and the ground curves "
                            "away beneath the ball as fast as it falls: it is in orbit. Gravity supplies the "
                            "centripetal force, so the orbital speed is root G M over r.") as vo:
            self.play(FadeIn(earth), FadeIn(mtn), run_time=0.7)
            for p in paths:
                self.play(Create(p), run_time=1.3 if p is not paths[-1] else 2.2)
            o1 = M(r"\frac{GMm}{r^2} = \frac{mv_o^2}{r}", 42)
            o2 = M(r"v_o = \sqrt{\frac{GM}{r}}, \qquad T = 2\pi\sqrt{\frac{r^3}{GM}}", 42, color=E_C)
            oc = VGroup(o1, o2).arrange(DOWN, buff=0.4).move_to(P(3.5, 2.2))
            fit(oc, 6.6)
            self.play(Write(o1), run_time=1.2)
            self.play(Write(o2), run_time=1.4)
        n1 = M(r"\text{near the surface: } \sqrt{gR} \approx 8\ \text{km/s},\ 84\ \text{min}", 34)
        n2 = M(r"v_e = \sqrt2\,v_o", 36)
        n3 = M(r"\text{geostationary: } T = 1\ \text{day},\ r \approx 6.6R", 34)
        n4 = M(r"(\approx 36\,000\ \text{km up})", 30, color=MUTED)
        nc = VGroup(n1, n2, n3, n4).arrange(DOWN, buff=0.28, aligned_edge=LEFT).move_to(P(3.5, -0.9))
        fit(nc, 6.6)
        with self.voiceover("Skimming the surface, that is root g R: eight kilometres per second, once round every "
                            "eighty four minutes. Escape needs root two times as much. A geostationary satellite, "
                            "with a period of one day, sits at six point six Earth radii: about thirty six thousand "
                            "kilometres up.") as vo:
            self.play(FadeOut(paths[0]), FadeOut(paths[1]), run_time=0.4)
            self.play(Write(n1), run_time=1.6)
            self.play(Write(n2), run_time=0.9)
            self.wait(vo.duration * 0.1)
            self.play(Write(n3), FadeIn(n4), run_time=1.8)
        with self.voiceover("The energies are locked together. Kinetic energy is G M m over two r, potential energy "
                            "is minus twice that, and the total is minus the kinetic energy. And astronauts float not "
                            "because gravity is gone, at four hundred kilometres it is still eighty nine percent, but "
                            "because they are falling with their station.") as vo:
            self.clear_scene(0.5)
            C = P(-4.0, -0.2)
            rr = 2.2
            earth = Circle(radius=1.1, color=V_C, stroke_width=3).set_fill(EARTH, 1).move_to(C)
            orb = DashedVMobject(Circle(radius=rr, color=GRID, stroke_width=2).move_to(C), num_dashes=50)
            th = ValueTracker(0.3)
            sp = lambda: C + rr * np.array([np.cos(th.get_value()), np.sin(th.get_value()), 0])
            sat = always_redraw(lambda: Square(side_length=0.26, color=INK, stroke_width=2).set_fill(E_C, 1)
                                .rotate(th.get_value()).move_to(sp()))
            sv = always_redraw(lambda: arrow(sp(), sp() + 1.1 * np.array([-np.sin(th.get_value()),
                                                                          np.cos(th.get_value()), 0]), V_C, sw=4))
            sg = always_redraw(lambda: arrow(sp(), sp() + 0.8 * (C - sp()) / rr, G_C, sw=4))
            self.add(earth, orb, sat, sv, sg)
            self.play(FadeIn(earth), FadeIn(orb), FadeIn(sat), FadeIn(sv), FadeIn(sg), run_time=0.6)
            base = -0.6
            hgt = 1.1
            bars = VGroup(
                Rectangle(width=0.9, height=hgt, stroke_width=0).set_fill(V_C, 0.85).move_to(P(1.4, base), aligned_edge=DOWN),
                Rectangle(width=0.9, height=2 * hgt, stroke_width=0).set_fill(P_C, 0.85).move_to(P(2.8, base), aligned_edge=UP),
                Rectangle(width=0.9, height=hgt, stroke_width=0).set_fill(E_C, 0.85).move_to(P(4.2, base), aligned_edge=UP),
            )
            axl = Line(P(0.8, base), P(4.9, base), color=INK, stroke_width=2)
            bl = VGroup(M(r"K = \frac{GMm}{2r}", 30, color=V_C).next_to(bars[0], UP, buff=0.12),
                        M(r"U = -2K", 30, color=P_C).next_to(bars[1], DOWN, buff=0.12),
                        M(r"E = -K", 30, color=E_C).next_to(bars[2], DOWN, buff=0.12))
            self.play(th.animate.set_value(1.6), Create(axl), LaggedStart(*[GrowFromEdge(b, DOWN if i == 0 else UP)
                                                                             for i, b in enumerate(bars)], lag_ratio=0.3),
                      FadeIn(bl), run_time=2.4, rate_func=linear)
            w = M(r"\text{ISS at 400 km: } g_h \approx 0.89\,g", 34).move_to(P(3.2, 2.6))
            fit(w, 6.6)
            wn = T("weightless = falling together", 26, color=PRIMARY).next_to(w, DOWN, buff=0.25)
            self.play(Write(w), th.animate.set_value(3.2), run_time=1.8, rate_func=linear)
            self.play(FadeIn(wn), th.animate.set_value(3.2 + max(1.0, vo.duration - 5.8)),
                      run_time=max(1.0, vo.duration - 5.8), rate_func=linear)
            for m in (sat, sv, sg):
                m.clear_updaters()

    # ------------------------------------------------------------ scene 6: Kepler
    def s6(self):
        a, e = 3.0, 0.6
        b = a * np.sqrt(1 - e * e)
        Cc = P(-3.0, -0.4)
        sun = Cc + a * e * LEFT
        ell = Ellipse(width=2 * a, height=2 * b, color=INK, stroke_width=3).move_to(Cc)

        def pos(t):  # t in periods; perihelion at t = 0 on the left
            Mm = TAU * t
            E = Mm
            for _ in range(30):
                E = E - (E - e * np.sin(E) - Mm) / (1 - e * np.cos(E))
            return Cc + np.array([-a * np.cos(E), -b * np.sin(E), 0])

        sunm = VGroup(Circle(radius=0.28, color=E_C, stroke_width=3).set_fill(E_C, 1).move_to(sun))
        sl = T("Sun", 22, color=E_C).next_to(sun, DOWN, buff=0.3)
        foc2 = Dot(Cc + a * e * RIGHT, radius=0.05, color=MUTED)
        tt = ValueTracker(0.0)
        planet = always_redraw(lambda: Dot(pos(tt.get_value()), radius=0.13, color=V_C))
        k1 = T("1. ellipse, Sun at a focus", 26, color=INK)
        k2 = T("2. equal areas in equal times", 26, color=INK)
        k3 = M(r"3.\ \ T^2 \propto a^3", 38)
        ks = VGroup(k1, k2, k3).arrange(DOWN, buff=0.4, aligned_edge=LEFT).move_to(P(3.9, 2.4))
        fit(ks, 6.0)
        with self.voiceover("Kepler found three rules in the planets' motion. First: each planet moves on an "
                            "ellipse, with the Sun at one focus.") as vo:
            self.play(Create(ell), FadeIn(sunm), FadeIn(sl), FadeIn(foc2), run_time=1.0)
            self.add(planet)
            self.play(FadeIn(k1), tt.animate.set_value(0.5), run_time=max(1.5, vo.duration - 1.2), rate_func=linear)

        def sector(t0, t1, col):
            pts = [sun] + [pos(t) for t in np.linspace(t0, t1, 30)]
            return Polygon(*pts, stroke_width=1.5, color=col).set_fill(col, 0.45)

        A1 = sector(-0.05, 0.05, E_C)
        A2 = sector(0.45, 0.55, E_C)
        with self.voiceover("Second: the line from the Sun sweeps out equal areas in equal times. Gravity points "
                            "straight at the Sun, so it has no torque about it, and angular momentum is conserved. "
                            "The planet moves fastest when it is closest.") as vo:
            self.play(FadeIn(k2), tt.animate.set_value(0.95), run_time=1.6, rate_func=linear)
            self.play(tt.animate.set_value(1.05), FadeIn(A1), run_time=1.2, rate_func=linear)
            self.play(tt.animate.set_value(1.45), run_time=1.6, rate_func=linear)
            self.play(tt.animate.set_value(1.55), FadeIn(A2), run_time=1.2, rate_func=linear)
            eq = T("same time, same area", 22, color=E_C).move_to(P(-3.0, 2.6))
            l1 = M(r"\frac{dA}{dt} = \frac{L}{2m}", 38).move_to(P(3.9, 0.5))
            self.play(FadeIn(eq), Write(l1), tt.animate.set_value(1.75), run_time=max(1.0, vo.duration - 5.6),
                      rate_func=linear)
        c1 = M(r"v_p r_p = v_a r_a", 40)
        c2 = M(r"r_p = 1,\ r_a = 7\ \text{AU} \ \Rightarrow\ v_p : v_a = 7 : 1", 34)
        cc = VGroup(c1, c2).arrange(DOWN, buff=0.3, aligned_edge=LEFT).move_to(P(3.9, -1.0))
        fit(cc, 6.0)
        with self.voiceover("A comet that comes in to one astronomical unit and goes out to seven moves seven times "
                            "faster at its closest point than at its farthest.") as vo:
            self.play(Write(c1), tt.animate.set_value(1.95), run_time=1.2, rate_func=linear)
            self.play(Write(c2), tt.animate.set_value(2.3), run_time=max(1.5, vo.duration - 1.4), rate_func=linear)
        with self.voiceover("Third: the square of the period goes as the cube of the semi major axis. That comet's "
                            "semi major axis is four, so its period is four to the power three halves: eight "
                            "years.") as vo:
            d1 = M(r"a = \frac{1 + 7}{2} = 4\ \text{AU} \ \Rightarrow\ T = 4^{3/2} = 8\ \text{years}", 34, color=GREEN)
            fit(d1, 5.3)
            d1.next_to(cc, DOWN, buff=0.4).align_to(cc, LEFT)
            self.play(Indicate(k3, color=HL), tt.animate.set_value(2.5), run_time=1.0, rate_func=linear)
            self.play(Write(d1), tt.animate.set_value(2.5 + max(1.0, vo.duration - 1.2) * 0.12),
                      run_time=max(1.0, vo.duration - 1.2), rate_func=linear)
        planet.clear_updaters()

    # ------------------------------------------------------------ scene 7: recap
    def s7(self):
        title = T("Chapter 5 in six lines", 38, color=PRIMARY, weight="BOLD").move_to(P(0, 3.3))
        lines = [
            (r"F = \frac{Gm_1m_2}{r^2}", "shell: a point outside, nothing inside"),
            (r"g_h \approx g\big(1 - \tfrac{2h}{R}\big),\ g_d = g\big(1 - \tfrac dR\big)", "greatest at the surface"),
            (r"V = -\frac{GM}{r},\ E = -\frac{dV}{dr}", "zero field is not zero potential"),
            (r"v_e = \sqrt{2gR} \approx 11.2\ \text{km/s}", "any direction, any mass"),
            (r"v_o = \sqrt{\tfrac{GM}{r}},\ E = -K", "weightless means free fall"),
            (r"v_pr_p = v_ar_a,\ T^2 \propto a^3", "central force: L conserved"),
        ]
        rows = VGroup()
        for i, (tex, note) in enumerate(lines):
            m = M(tex, 32)
            nn = T(note, 24, color=MUTED)
            num = T(f"{i + 1}.", 28, color=PRIMARY, weight="BOLD")
            rows.add(VGroup(num, m, nn))
        rows.arrange(DOWN, buff=0.24, aligned_edge=LEFT).move_to(P(0, -0.25))
        for r in rows:
            r[0].set_x(-6.2)
            r[1].next_to(r[0], RIGHT, buff=0.3)
            fit(r[1], 6.0)
            fit(r[2], 5.9).move_to(P(0, r[1].get_y())).align_to(P(0.6, 0), LEFT)
        with self.voiceover("To recap. One inverse square law, F equals G m one m two over r squared. With the shell "
                            "theorem, it gives g at any height or depth, and the field and potential of any "
                            "sphere.") as vo:
            self.play(FadeIn(title), run_time=0.6)
            for k in (0, 1, 2):
                self.play(FadeIn(rows[k], shift=0.15 * UP), run_time=0.6)
                self.wait(vo.duration * 0.12)
        with self.voiceover("Energy conservation gives escape speed, root two g R, the same in every direction. Gravity "
                            "as a centripetal force gives orbits, and angular momentum conservation gives Kepler's "
                            "equal areas.") as vo:
            for k in (3, 4, 5):
                self.play(FadeIn(rows[k], shift=0.15 * UP), run_time=0.6)
                self.wait(vo.duration * 0.15)
        with self.voiceover("Try the mastery quiz. That completes Mechanics Two: momentum, rotation and gravitation, "
                            "all grown from Newton's laws.") as vo:
            nxt = T("End of course · Momentum, Rotation & Gravitation", 30, color=PRIMARY).move_to(P(0, -3.55))
            fit(nxt, 13)
            self.wait(vo.duration * 0.3)
            self.play(FadeIn(nxt, shift=0.2 * UP), run_time=0.8)
