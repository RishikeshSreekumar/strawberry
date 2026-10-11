import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

# Chapter colour roles (light background).
A_C = PRIMARY  # bodies / masses = strawberry red
B_C = SECONDARY  # second body / velocity arrows = teal
AX_C = ACCENT  # axes of rotation = amber
CEN_C = PURPLE  # centripetal acceleration, removed pieces
HL = ManimColor("#D19A00")  # highlight gold
WARN = PRIMARY
BODY = ManimColor("#F3D9C9")


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


def com_dot(pt=ORIGIN, r=0.13):
    ring = Circle(radius=r, color=INK, stroke_width=2.5).set_fill(WHITE, 1)
    q1 = Sector(radius=r, angle=PI / 2, start_angle=0, color=ACCENT, fill_opacity=1, stroke_width=0)
    q3 = Sector(radius=r, angle=PI / 2, start_angle=PI, color=ACCENT, fill_opacity=1, stroke_width=0)
    return VGroup(ring, q1, q3).move_to(pt)


def axis_dot(pt=ORIGIN, r=0.14):
    """An axis perpendicular to the screen, pointing out of it."""
    c = Circle(radius=r, color=AX_C, stroke_width=3).set_fill(WHITE, 1)
    d = Dot(radius=0.045, color=AX_C)
    return VGroup(c, d).move_to(pt)


def arrow(start, end, color, sw=5):
    return Arrow(start, end, buff=0, color=color, stroke_width=sw,
                 max_tip_length_to_length_ratio=0.25, max_stroke_width_to_length_ratio=10)


def mass_ball(pt, m, color, scale=0.18):
    r = scale * np.sqrt(m) + 0.08
    return Circle(radius=r, color=color, stroke_width=3).set_fill(color, 0.85).move_to(pt)


def wheel(c, R, ang, color=A_C, spokes=6, fill=0.18):
    rim = Circle(radius=R, color=color, stroke_width=5).set_fill(color, fill).move_to(c)
    sp = VGroup(*[Line(c, c + R * np.array([np.cos(ang + k * TAU / spokes), np.sin(ang + k * TAU / spokes), 0]),
                       color=color, stroke_width=3) for k in range(spokes)])
    hub = Dot(c, radius=0.08, color=INK)
    return VGroup(rim, sp, hub)


class MrgCh2Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Momentum, Rotation & Gravitation",
            "Chapter 2 · Rotational Kinematics and Moment of Inertia",
            "Chapter two. Rotational kinematics and moment of inertia.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ scene 1: one angle for the whole body
    def s1(self):
        C = P(-3.4, -0.4)
        R = 2.7
        th = ValueTracker(0.3)

        def disc():
            a = th.get_value()
            d = Circle(radius=R, color=INK, stroke_width=3).set_fill(BODY, 1).move_to(C)
            u = np.array([np.cos(a), np.sin(a), 0])
            ref = Line(C, C + R * u, color=A_C, stroke_width=4)
            pts = VGroup(*[Dot(C + r * u, radius=0.09, color=INK) for r in (0.9, 1.8, 2.6)])
            return VGroup(d, ref, pts)

        dk = always_redraw(disc)
        hub = axis_dot(C)
        ref0 = DashedLine(C, C + R * np.array([np.cos(0.3), np.sin(0.3), 0]), color=MUTED, stroke_width=2)
        arc = always_redraw(lambda: Arc(radius=0.6, start_angle=0.3, angle=th.get_value() - 0.3, arc_center=C,
                                        color=A_C, stroke_width=3))
        thl = always_redraw(lambda: M(r"\theta", 34, color=A_C).move_to(
            C + 0.95 * np.array([np.cos((th.get_value() + 0.3) / 2), np.sin((th.get_value() + 0.3) / 2), 0])))
        with self.voiceover("Stand at the centre of a spinning merry go round and you barely move. Stand at the "
                            "edge and the wind whips past. Yet every point turns through the same angle in the same "
                            "time. One angle, theta, describes the whole body.") as vo:
            self.add(dk, hub)
            self.play(FadeIn(dk), FadeIn(hub), run_time=0.6)
            self.play(th.animate.set_value(0.3 + TAU), run_time=max(2.0, vo.duration - 3.4), rate_func=linear)
            th.set_value(0.3)
            self.add(ref0, arc, thl)
            self.play(th.animate.set_value(1.25), run_time=1.6)
        f1 = M(r"\omega = \frac{d\theta}{dt}, \qquad \alpha = \frac{d\omega}{dt}", 44)
        f2 = M(r"s = r\theta, \qquad v = r\omega", 48, color=B_C)
        col = VGroup(f1, f2).arrange(DOWN, buff=0.5).move_to(P(3.7, 1.8))

        def varrows():
            a = th.get_value()
            u = np.array([np.cos(a), np.sin(a), 0])
            n = np.array([-np.sin(a), np.cos(a), 0])
            return VGroup(*[arrow(C + r * u, C + r * u + 0.55 * r * n, B_C, sw=4) for r in (0.9, 1.8, 2.6)])

        va = always_redraw(varrows)
        with self.voiceover("So the whole body has one angular velocity, omega, the rate of change of theta, and one "
                            "angular acceleration, alpha. A point at distance r moves along an arc r theta, so its "
                            "speed is r omega: zero on the axis, largest at the rim.") as vo:
            self.play(Write(f1), run_time=1.4)
            self.wait(vo.duration * 0.15)
            self.play(Write(f2), FadeIn(va), run_time=1.4)
            self.remove(ref0, arc, thl)
            self.play(th.animate.set_value(1.25 + 2.2), run_time=max(1.5, vo.duration - 3.8), rate_func=linear)
        e1 = M(r"\omega = 1200 \times \frac{2\pi}{60} = 40\pi\ \text{rad/s}", 38)
        e2 = M(r"v = r\omega = 0.5 \times 40\pi \approx 62.8\ \text{m/s}", 38, color=GREEN)
        ecol = VGroup(e1, e2).arrange(DOWN, buff=0.35, aligned_edge=LEFT).move_to(P(3.7, -1.3))
        fit(ecol, 6.2)
        with self.voiceover("A fan turning at twelve hundred revolutions per minute has omega equal to forty pi "
                            "radians per second. Its blade tip, half a metre out, moves at sixty two point eight "
                            "metres per second.") as vo:
            s0 = th.get_value()
            self.play(Write(e1), th.animate.set_value(s0 + 1.6), run_time=1.6, rate_func=linear)
            self.play(Write(e2), th.animate.set_value(s0 + 3.2), run_time=1.6, rate_func=linear)
            self.play(th.animate.set_value(s0 + 3.2 + max(0.5, vo.duration - 3.2)), run_time=max(0.5, vo.duration - 3.2),
                      rate_func=linear)
        for m in (dk, va):
            m.clear_updaters()

        with self.voiceover("A point on a turning body has two accelerations: r alpha, along its path, and omega "
                            "squared r, towards the axis.") as vo:
            self.play(FadeOut(VGroup(f1, f2, e1, e2, va)), run_time=0.4)
            a = th.get_value()
            u = np.array([np.cos(a), np.sin(a), 0])
            n = np.array([-np.sin(a), np.cos(a), 0])
            Pt = C + 2.6 * u
            at = arrow(Pt, Pt + 1.4 * n, AX_C)
            ac = arrow(Pt, Pt - 1.6 * u, CEN_C)
            g1 = M(r"a_t = r\alpha", 44, color=AX_C)
            g2 = M(r"a_c = \omega^2 r", 44, color=CEN_C)
            g3 = M(r"a = r\sqrt{\alpha^2 + \omega^4}", 44)
            gc = VGroup(g1, g2, g3).arrange(DOWN, buff=0.4, aligned_edge=LEFT).move_to(P(3.7, 0.4))
            self.play(GrowArrow(at), Write(g1), run_time=1.0)
            self.play(GrowArrow(ac), Write(g2), run_time=1.0)
            self.play(Write(g3), run_time=1.0)

    # ------------------------------------------------------------ scene 2: rotational kinematics
    def s2(self):
        hdr = T("Constant α: the same equations, new letters", 32, color=PRIMARY, weight="BOLD").move_to(P(0, 3.2))
        left = [r"v = u + at", r"s = ut + \tfrac12at^2", r"v^2 = u^2 + 2as"]
        right = [r"\omega = \omega_0 + \alpha t", r"\theta = \omega_0t + \tfrac12\alpha t^2",
                 r"\omega^2 = \omega_0^2 + 2\alpha\theta"]
        lh = T("straight line", 26, color=MUTED).move_to(P(-3.0, 2.2))
        rh = T("rotation", 26, color=MUTED).move_to(P(3.0, 2.2))
        rows = VGroup()
        for i, (l, r) in enumerate(zip(left, right)):
            y = 1.2 - 1.05 * i
            lm = M(l, 42).move_to(P(-3.0, y))
            ar = M(r"\longrightarrow", 40, color=MUTED).move_to(P(0, y))
            rm = M(r, 42, color=A_C).move_to(P(3.0, y))
            rows.add(VGroup(lm, ar, rm))
        swap = M(r"s \to \theta,\quad v \to \omega,\quad a \to \alpha", 38, color=MUTED).move_to(P(0, -2.4))
        with self.voiceover("With constant angular acceleration, the equations are the ones you already know from "
                            "straight line motion, with every letter swapped: theta for distance, omega for "
                            "velocity, alpha for acceleration.") as vo:
            self.play(FadeIn(hdr), FadeIn(lh), FadeIn(rh), run_time=0.7)
            for r in rows:
                self.play(FadeIn(r[0]), run_time=0.35)
                self.play(FadeIn(r[1]), TransformFromCopy(r[0], r[2]), run_time=0.8)
            self.play(FadeIn(swap), run_time=0.6)

        C = P(-3.6, -0.6)
        R = 2.2
        ang = ValueTracker(0.0)
        wh = always_redraw(lambda: wheel(C, R, ang.get_value()))
        e1 = M(r"\omega_0 = 600 \times \frac{2\pi}{60} = 20\pi\ \text{rad/s}", 36)
        e2 = M(r"\alpha = \frac{0 - 20\pi}{10} = -2\pi\ \text{rad/s}^2", 36)
        e3 = M(r"\theta = \frac{\omega_0 + \omega}{2}\,t = 10\pi \times 10 = 100\pi\ \text{rad}", 36)
        col = VGroup(e1, e2, e3).arrange(DOWN, buff=0.4, aligned_edge=LEFT).move_to(P(3.2, 0.9))
        fit(col, 6.6)
        with self.voiceover("A wheel at six hundred revolutions per minute coasts uniformly to rest in ten seconds. "
                            "Omega nought is twenty pi radians per second, so alpha is minus two pi. The angle "
                            "turned is the average speed, ten pi, times ten seconds: a hundred pi radians.") as vo:
            self.play(FadeOut(rows), FadeOut(swap), FadeOut(lh), FadeOut(rh), FadeOut(hdr), run_time=0.5)
            self.add(wh)
            self.play(FadeIn(wh), run_time=0.4)
            self.play(Write(e1), ang.animate.set_value(-6.0), run_time=1.6, rate_func=linear)
            self.play(Write(e2), ang.animate.set_value(-11.0), run_time=1.6, rate_func=linear)
            self.play(ang.animate.set_value(-14.0), run_time=max(1.0, vo.duration - 5.8),
                      rate_func=lambda s: 1 - (1 - s) ** 2)
            self.play(Write(e3), run_time=1.5)
        wh.clear_updaters()
        with self.voiceover("And here is the trap: the equations give radians, not turns. Divide by two pi. The "
                            "wheel makes fifty revolutions.") as vo:
            e4 = M(r"n = \frac{100\pi}{2\pi} = 50\ \text{revolutions}", 42, color=GREEN).next_to(col, DOWN, buff=0.5)
            e4.align_to(col, LEFT)
            fit(e4, 6.6)
            self.wait(vo.duration * 0.3)
            self.play(Write(e4), run_time=1.4)

    # ------------------------------------------------------------ scene 3: moment of inertia
    def s3(self):
        y = 1.6
        u = 1.5  # units per metre
        xA, xB = -3.0, 3.0
        stone = ValueTracker(2.6)  # distance (units) of stones from centre

        def rule():
            d = stone.get_value()
            r = Line(P(-3.4, y), P(3.4, y), color=INK, stroke_width=6)
            s1 = mass_ball(P(-d, y), 2, A_C)
            s2 = mass_ball(P(d, y), 2, A_C)
            return VGroup(r, s1, s2)

        rl = always_redraw(rule)
        hand = axis_dot(P(0, y))
        ang = ValueTracker(0.0)
        with self.voiceover("Twist a metre rule at its centre: easy. Tape heavy stones to its ends: much harder. "
                            "Slide them in close: easy again. For rotation, where the mass sits matters as much as "
                            "how much there is.") as vo:
            r0 = Line(P(-3.4, y), P(3.4, y), color=INK, stroke_width=6)
            self.play(Create(r0), FadeIn(hand), run_time=0.7)
            self.play(Rotate(r0, 0.5, about_point=P(0, y)), run_time=0.5)
            self.play(Rotate(r0, -0.5, about_point=P(0, y)), run_time=0.5)
            self.remove(r0)
            self.add(rl, hand)
            self.wait(vo.duration * 0.15)
            hard = T("hard", 28, color=WARN).move_to(P(0, y + 1.0))
            self.play(FadeIn(hard), run_time=0.5)
            self.play(stone.animate.set_value(0.8), FadeOut(hard), run_time=1.5)
            easy = T("easy", 28, color=GREEN).move_to(P(0, y + 1.0))
            self.play(FadeIn(easy), run_time=0.5)
        rl.clear_updaters()
        k1 = M(r"K = \sum \tfrac12 m_i (r_i\omega)^2 = \tfrac12\Big(\sum m_i r_i^2\Big)\omega^2", 44)
        k2 = M(r"I = \sum m_i r_i^2, \qquad K = \tfrac12 I\omega^2", 52, color=A_C)
        VGroup(k1, k2).arrange(DOWN, buff=0.5).move_to(P(0, -1.2))
        with self.voiceover("Add up the kinetic energy of every particle. Each moves at r omega, so K is one half, "
                            "times the sum of m r squared, times omega squared. That sum is the moment of inertia, I. "
                            "It plays the role of mass for rotation.") as vo:
            self.play(Write(k1), run_time=2.0)
            self.wait(vo.duration * 0.2)
            self.play(Write(k2), run_time=1.4)
            box = SurroundingRectangle(k2, buff=0.2, corner_radius=0.12, color=PRIMARY, stroke_width=3)
            self.play(Create(box), run_time=0.5)

        # dumbbell with movable axis
        yr = 2.2
        x0 = -3.0  # 1 kg mass position; 3 kg at x0 + 4u
        xa = ValueTracker(0.0)  # axis position in metres from the 1 kg mass
        rod = Line(P(x0, yr), P(x0 + 4 * u, yr), color=INK, stroke_width=5)
        m1 = mass_ball(P(x0, yr), 1, B_C)
        m3 = mass_ball(P(x0 + 4 * u, yr), 3, A_C)
        l1 = T("1 kg", 22, color=B_C).next_to(m1, LEFT, buff=0.12)
        l3 = T("3 kg", 22, color=A_C).next_to(m3, RIGHT, buff=0.12)
        axm = always_redraw(lambda: axis_dot(P(x0 + xa.get_value() * u, yr)))

        def Ifun(x):
            return 1 * x * x + 3 * (4 - x) ** 2

        ax = Axes(x_range=[0, 4, 1], y_range=[0, 50, 10], x_length=5.4, y_length=3.4,
                  axis_config={"color": INK, "stroke_width": 2, "include_tip": False},
                  x_axis_config={"numbers_to_include": [0, 1, 2, 3, 4], "font_size": 22, "decimal_number_config": {"color": INK, "num_decimal_places": 0}},
                  y_axis_config={"numbers_to_include": [10, 20, 30, 40, 50], "font_size": 22, "decimal_number_config": {"color": INK, "num_decimal_places": 0}})
        ax.move_to(P(0, -1.15)).align_to(P(x0, 0), LEFT)
        curve = ax.plot(Ifun, x_range=[0, 4], color=A_C, stroke_width=4)
        xl = T("axis position (m from 1 kg)", 20, color=MUTED).next_to(ax.x_axis, DOWN, buff=0.45)
        il = M(r"I\ (\text{kg m}^2)", 26, color=MUTED).next_to(ax.y_axis, UP, buff=0.12)
        dot = always_redraw(lambda: Dot(ax.c2p(xa.get_value(), Ifun(xa.get_value())), radius=0.08, color=AX_C))
        rd = M(r"I =", 46).move_to(P(3.8, 0.4))
        rv = DecimalNumber(48, num_decimal_places=0, font_size=46, color=AX_C)
        rv.add_updater(lambda m: m.set_value(Ifun(xa.get_value())).next_to(rd, RIGHT, buff=0.15))
        unit = M(r"\text{kg m}^2", 36).next_to(rd, RIGHT, buff=1.2)
        with self.voiceover("Put one kilogram and three kilograms on the ends of a light four metre rod. About the "
                            "one kilogram mass, I is forty eight. About the midpoint, sixteen. About the centre of "
                            "mass, twelve: the smallest of all. An I without its axis means nothing.") as vo:
            self.clear_scene(0.5)
            self.play(Create(rod), FadeIn(m1), FadeIn(m3), FadeIn(l1), FadeIn(l3), FadeIn(axm), run_time=0.8)
            self.play(Create(ax), FadeIn(xl), FadeIn(il), FadeIn(rd), FadeIn(rv), FadeIn(unit), run_time=0.8)
            self.add(dot)
            self.play(Create(curve), run_time=1.0)
            self.wait(vo.duration * 0.05)
            self.play(xa.animate.set_value(2.0), run_time=1.6)
            self.wait(vo.duration * 0.05)
            self.play(xa.animate.set_value(3.0), run_time=1.3)
            cm = com_dot(P(x0 + 3 * u, yr - 0.5), 0.13)
            cml = T("COM", 22, color=ACCENT).next_to(cm, DOWN, buff=0.08)
            self.play(FadeIn(cm), FadeIn(cml), Flash(ax.c2p(3, 12), color=HL), run_time=0.8)
            nb = T("every I needs its axis", 26, color=PRIMARY).move_to(P(4.8, -0.8))
            fit(nb, 4.0)
            self.play(FadeIn(nb), run_time=0.6)
        for m in (axm, dot, rv):
            m.clear_updaters()

    # ------------------------------------------------------------ scene 4: standard bodies
    def s4(self):
        hdr = M(r"I = \int r^2\,dm", 52).move_to(P(0, 3.1))
        y = 1.2
        L = 5.0
        rod = Line(P(-L / 2, y), P(L / 2, y), color=A_C, stroke_width=10).shift(3.2 * LEFT)
        c_ax = DashedLine(P(-3.2, y - 0.9), P(-3.2, y + 0.9), color=AX_C, stroke_width=3)
        e_ax = DashedLine(P(-3.2 - L / 2, y - 0.9), P(-3.2 - L / 2, y + 0.9), color=AX_C, stroke_width=3)
        slice_ = Rectangle(width=0.18, height=0.3, color=INK, stroke_width=2).move_to(P(-1.6, y))
        sl = M(r"dm = \tfrac{M}{L}dx", 30).next_to(slice_, UP, buff=0.4)
        r1 = M(r"I_{\text{centre}} = \frac{ML^2}{12}", 44).move_to(P(3.2, y + 0.4))
        r2 = M(r"I_{\text{end}} = \frac{ML^2}{3}", 44, color=A_C).move_to(P(3.2, y - 0.8))
        with self.voiceover("For a continuous body, the sum becomes an integral of r squared d m. Slice it so every "
                            "piece sits at a known distance from the axis. A rod about its centre gives M L squared "
                            "over twelve. About its end, M L squared over three: four times bigger.") as vo:
            self.play(Write(hdr), run_time=1.0)
            self.play(Create(rod), Create(c_ax), run_time=0.8)
            self.play(Create(slice_), FadeIn(sl), run_time=0.7)
            self.wait(vo.duration * 0.15)
            self.play(Write(r1), run_time=1.2)
            self.play(Create(e_ax), Write(r2), run_time=1.2)

        yb = -1.6
        Rr = 1.1
        cs = [P(-5.2, yb), P(-1.8, yb), P(1.6, yb), P(5.0, yb)]
        ring = Circle(radius=Rr, color=A_C, stroke_width=8).move_to(cs[0])
        disc = Circle(radius=Rr, color=A_C, stroke_width=3).set_fill(A_C, 0.35).move_to(cs[1])
        rings = VGroup(*[Circle(radius=Rr * k / 5, color=A_C, stroke_width=1.5).move_to(cs[1]) for k in range(1, 5)])
        hs = VGroup(Circle(radius=Rr, color=A_C, stroke_width=4).move_to(cs[2]),
                    Ellipse(width=2 * Rr, height=0.5, color=A_C, stroke_width=2).move_to(cs[2]))
        ss = Circle(radius=Rr, color=A_C, stroke_width=3).set_fill(A_C, 0.55).move_to(cs[3])
        labs = [M(r"MR^2", 36), M(r"\tfrac12 MR^2", 36), M(r"\tfrac23 MR^2", 36), M(r"\tfrac25 MR^2", 36)]
        names = ["ring", "disc", "hollow sphere", "solid sphere"]
        for i in range(4):
            labs[i].next_to(cs[i] + Rr * UP, UP, buff=0.2)
        nm = VGroup(*[T(names[i], 22, color=MUTED).next_to(cs[i] + Rr * DOWN, DOWN, buff=0.15) for i in range(4)])
        with self.voiceover("A ring has all its mass at the rim: M R squared. A disc is a set of thin rings, and it "
                            "gives one half M R squared. Stack discs into a solid sphere for two fifths M R squared. "
                            "A hollow sphere gives two thirds.") as vo:
            self.play(*[FadeOut(m) for m in (rod, c_ax, e_ax, slice_, sl, r1, r2)], run_time=0.5)
            self.play(Create(ring), FadeIn(labs[0]), FadeIn(nm[0]), run_time=0.9)
            self.play(LaggedStart(*[Create(r) for r in rings], lag_ratio=0.2), FadeIn(disc), run_time=1.0)
            self.play(FadeIn(labs[1]), FadeIn(nm[1]), run_time=0.5)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(ss), FadeIn(labs[3]), FadeIn(nm[3]), run_time=0.9)
            self.play(Create(hs), FadeIn(labs[2]), FadeIn(nm[2]), run_time=0.9)
        with self.voiceover("Write each one as M k squared. The ratio k squared over R squared, one, two thirds, one "
                            "half, two fifths, measures how much mass sits near the rim. In chapter four these "
                            "numbers decide who wins every rolling race.") as vo:
            self.play(FadeOut(hdr), *[FadeOut(m) for m in (ring, disc, rings, hs, ss)], *[FadeOut(l) for l in labs],
                      FadeOut(nm), run_time=0.5)
            k = M(r"I = Mk^2", 48).move_to(P(-4.0, 2.6))
            vals = [1, 2 / 3, 1 / 2, 2 / 5]
            texs = [r"1", r"\tfrac23", r"\tfrac12", r"\tfrac25"]
            base = -2.4
            bars = VGroup()
            bl = VGroup()
            bn = VGroup()
            for i, v in enumerate(vals):
                b = Rectangle(width=1.2, height=3.8 * v, stroke_width=0).set_fill(A_C, 0.3 + 0.5 * v)
                b.move_to(P(-1.2 + 2.0 * i, base), aligned_edge=DOWN)
                bars.add(b)
                bl.add(M(texs[i], 38).next_to(b, UP, buff=0.12))
                bn.add(T(["ring", "hollow sphere", "disc", "solid sphere"][i], 22, color=MUTED).next_to(b, DOWN, buff=0.15))
            kl = M(r"\frac{k^2}{R^2}", 44).move_to(P(-4.0, 0.4))
            self.play(Write(k), run_time=0.8)
            self.play(FadeIn(kl), LaggedStart(*[GrowFromEdge(b, DOWN) for b in bars], lag_ratio=0.25),
                      FadeIn(bl), FadeIn(bn), run_time=1.6)
            nx = T("more mass near the rim → bigger", 24, color=MUTED).move_to(P(-4.0, -0.8))
            fit(nx, 3.6)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(nx), run_time=0.6)

    # ------------------------------------------------------------ scene 5: the two theorems
    def s5(self):
        C = P(-4.0, 0.2)
        R = 1.7
        lam = Circle(radius=R, color=A_C, stroke_width=3).set_fill(A_C, 0.25).move_to(C)
        cm = com_dot(C, 0.14)
        Pp = C + 2.6 * RIGHT + 0.0 * UP
        pa = axis_dot(Pp)
        d = DashedLine(C, Pp, color=INK, stroke_width=2)
        dl = M("d", 34).next_to(d, UP, buff=0.1)
        cml = T("through COM", 22, color=ACCENT).next_to(cm, DOWN, buff=0.15)
        pal = T("parallel axis", 22, color=AX_C).next_to(pa, DOWN, buff=0.15)
        p1 = M(r"I = \sum m\,|\vec r - \vec d|^2", 40)
        p2 = MathTex(r"= I_{cm}", r"- 2\vec d\cdot\underbrace{\textstyle\sum m\vec r}_{=\,\vec 0}", r"+ Md^2",
                     font_size=40)
        p3 = M(r"I = I_{cm} + Md^2", 52, color=A_C)
        col = VGroup(p1, p2, p3).arrange(DOWN, buff=0.4, aligned_edge=LEFT).move_to(P(3.4, 0.6))
        fit(col, 6.4)
        with self.voiceover("Two theorems move you to new axes. Parallel axis: the moment of inertia about any axis "
                            "is I about a parallel axis through the centre of mass, plus M d squared. The cross term "
                            "vanishes, because measured from the centre of mass, the mass weighted positions add to "
                            "zero.") as vo:
            self.play(FadeIn(lam), FadeIn(cm), FadeIn(cml), run_time=0.7)
            self.play(Create(d), FadeIn(dl), FadeIn(pa), FadeIn(pal), run_time=0.8)
            self.play(Write(p1), run_time=1.2)
            self.wait(vo.duration * 0.1)
            self.play(Write(p2), run_time=2.0)
            self.play(Write(p3), run_time=1.2)
        with self.voiceover("So a rod about its end is M L squared over twelve, plus M times L over two, squared: "
                            "M L squared over three, as before. And the axis through the centre of mass always gives "
                            "the smallest I.") as vo:
            self.play(FadeOut(VGroup(lam, cm, cml, d, dl, pa, pal, p1, p2)), p3.animate.move_to(P(0, 3.0)),
                      run_time=0.6)
            y = 0.8
            rod = Line(P(-3.0, y), P(3.0, y), color=A_C, stroke_width=10)
            a1 = DashedLine(P(0, y - 0.9), P(0, y + 0.9), color=ACCENT, stroke_width=3)
            a2 = DashedLine(P(-3.0, y - 0.9), P(-3.0, y + 0.9), color=AX_C, stroke_width=3)
            br = BraceBetweenPoints(P(-3.0, y - 0.3), P(0, y - 0.3), DOWN, color=INK)
            bl = M(r"\tfrac L2", 34).next_to(br, DOWN, buff=0.1)
            rr = M(r"I_{\text{end}} = \frac{ML^2}{12} + M\left(\frac L2\right)^2 = \frac{ML^2}{3}", 46).move_to(P(0, -1.8))
            self.play(Create(rod), Create(a1), run_time=0.7)
            self.play(Create(a2), GrowFromCenter(br), FadeIn(bl), run_time=0.7)
            self.play(Write(rr), run_time=1.8)
            mn = T("the COM axis gives the smallest I", 26, color=ACCENT).move_to(P(0, -3.1))
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(mn), run_time=0.6)

        with self.voiceover("Perpendicular axis, for flat bodies only: I z equals I x plus I y. For a disc every "
                            "diameter is alike, so each has a quarter M R squared. Shift that to a tangent in the "
                            "disc's plane, and you get five quarters M R squared.") as vo:
            self.clear_scene(0.5)
            C = P(-3.6, -0.3)
            R = 1.9
            disc = Circle(radius=R, color=A_C, stroke_width=3).set_fill(A_C, 0.25).move_to(C)
            xa = Arrow(C + 2.6 * LEFT, C + 2.6 * RIGHT, buff=0, color=INK, stroke_width=3,
                       max_tip_length_to_length_ratio=0.05)
            ya = Arrow(C + 2.6 * DOWN, C + 2.6 * UP, buff=0, color=INK, stroke_width=3,
                       max_tip_length_to_length_ratio=0.05)
            xl = M("x", 32).next_to(xa.get_end(), DOWN, buff=0.1)
            yl = M("y", 32).next_to(ya.get_end(), LEFT, buff=0.1)
            zd = axis_dot(C)
            zl = M("z", 32, color=AX_C).next_to(C, DL, buff=0.12)
            q1 = M(r"I_z = I_x + I_y", 50, color=A_C).move_to(P(3.2, 2.4))
            q1n = T("laminas only", 24, color=MUTED).next_to(q1, DOWN, buff=0.15)
            q2 = M(r"2I_d = \tfrac12MR^2 \ \Rightarrow\ I_d = \tfrac14MR^2", 40).move_to(P(3.2, 0.6))
            q3 = M(r"I_{\text{tangent}} = \tfrac14MR^2 + MR^2 = \tfrac54MR^2", 40, color=GREEN).move_to(P(3.2, -0.7))
            for q in (q2, q3):
                fit(q, 6.4)
            tan = DashedLine(C + R * RIGHT + 2.4 * DOWN, C + R * RIGHT + 2.4 * UP, color=AX_C, stroke_width=3)
            self.play(FadeIn(disc), GrowArrow(xa), GrowArrow(ya), FadeIn(xl), FadeIn(yl), run_time=0.8)
            self.play(FadeIn(zd), FadeIn(zl), Write(q1), FadeIn(q1n), run_time=1.2)
            self.wait(vo.duration * 0.1)
            self.play(Write(q2), run_time=1.6)
            self.play(Create(tan), Write(q3), run_time=1.6)
        with self.voiceover("It fails for a sphere, which has thickness. That theorem is for flat bodies only.") as vo:
            s = Circle(radius=0.8, color=B_C, stroke_width=3).set_fill(B_C, 0.4).move_to(P(1.2, -2.5))
            xm = cross_mark().next_to(s, RIGHT, buff=0.4)
            nt = T("not for a sphere", 26, color=WARN).next_to(xm, RIGHT, buff=0.3)
            self.play(FadeIn(s), FadeIn(xm), FadeIn(nt), run_time=0.8)

    # ------------------------------------------------------------ scene 6: composite and cut bodies
    def s6(self):
        hdr = T("About one axis: pieces add, holes subtract", 32, color=PRIMARY, weight="BOLD").move_to(P(0, 3.2))
        R = 2.3
        O = P(-3.8, -0.4)
        disc = Circle(radius=R, color=A_C, stroke_width=3).set_fill(A_C, 0.28).move_to(O)
        hole = Circle(radius=R / 2, color=CEN_C, stroke_width=3).set_fill(BG, 1).move_to(O + (R / 2) * RIGHT)
        ax = axis_dot(O)
        Ol = M("O", 30).next_to(O, DL, buff=0.2)
        with self.voiceover("About one fixed axis, moments of inertia simply add, and a removed piece subtracts. "
                            "Cut a hole of radius R over two, touching the rim, out of a disc of mass M.") as vo:
            self.play(FadeIn(hdr), run_time=0.6)
            self.play(FadeIn(disc), FadeIn(ax), FadeIn(Ol), run_time=0.7)
            self.wait(vo.duration * 0.3)
            self.play(FadeIn(hole), run_time=0.8)
            self.bring_to_front(ax, Ol)
        e1 = M(r"I_{\text{full}} = \tfrac12 MR^2 = \tfrac{16}{32}MR^2", 38)
        e2 = M(r"I_{\text{hole}} = \tfrac12\cdot\tfrac M4\left(\tfrac R2\right)^2 + \tfrac M4\left(\tfrac R2\right)^2 = \tfrac{3}{32}MR^2", 38)
        e3 = M(r"I_{\text{rem}} = \tfrac{13}{32}MR^2", 48, color=GREEN)
        col = VGroup(e1, e2, e3).arrange(DOWN, buff=0.45, aligned_edge=LEFT).move_to(P(2.9, 0.2))
        fit(col, 7.0)
        with self.voiceover("The full disc has one half M R squared. The missing piece has a quarter of the mass. "
                            "About its own centre it has M R squared over thirty two; the parallel axis theorem moves "
                            "it to the centre, giving three over thirty two. What remains: thirteen over thirty two, times "
                            "M R squared.") as vo:
            self.play(Write(e1), run_time=1.2)
            self.wait(vo.duration * 0.1)
            dd = DashedLine(O, O + (R / 2) * RIGHT, color=INK, stroke_width=2)
            ddl = M(r"\tfrac R2", 28).next_to(dd, UP, buff=0.08)
            self.play(Create(dd), FadeIn(ddl), Write(e2), run_time=2.2)
            self.wait(vo.duration * 0.1)
            self.play(Write(e3), run_time=1.2)
        with self.voiceover("And a quarter disc of mass M, about the old centre, still has one half M R squared. "
                            "Its mass is spread from zero to R, exactly like a whole disc's.") as vo:
            self.clear_scene(0.5)
            O = P(-3.0, -0.3)
            R = 2.6
            quads = VGroup(*[Sector(radius=R, angle=PI / 2, start_angle=k * PI / 2, color=A_C,
                                    fill_opacity=0.15 + 0.12 * k, stroke_width=3, stroke_color=A_C).shift(O)
                             for k in range(4)])
            self.play(FadeIn(quads), FadeIn(axis_dot(O)), run_time=0.8)
            self.play(*[FadeOut(quads[k]) for k in (1, 2, 3)], run_time=0.8)
            q = M(r"I = \tfrac12 MR^2", 52, color=A_C).move_to(P(3.2, 0.8))
            qn = T("mass M, same spread of distances", 26, color=MUTED).next_to(q, DOWN, buff=0.3)
            no = M(r"\text{not } \tfrac14\cdot\tfrac12MR^2", 40, color=WARN).next_to(qn, DOWN, buff=0.4)
            self.play(Write(q), run_time=1.0)
            self.play(FadeIn(qn), run_time=0.6)
            self.play(FadeIn(no), run_time=0.6)

    # ------------------------------------------------------------ scene 7: recap
    def s7(self):
        title = T("Chapter 2 in six lines", 38, color=PRIMARY, weight="BOLD").move_to(P(0, 3.3))
        lines = [
            (r"v = r\omega,\ a_t = r\alpha,\ a_c = \omega^2 r", "one ω for the whole body"),
            (r"\omega^2 = \omega_0^2 + 2\alpha\theta", "linear equations, in radians"),
            (r"I = \sum m r^2", "depends on the axis"),
            (r"MR^2,\ \tfrac12MR^2,\ \tfrac25MR^2", "ring, disc, solid sphere"),
            (r"I = I_{cm} + Md^2", "one axis must pass through the COM"),
            (r"I_z = I_x + I_y", "flat bodies only"),
        ]
        rows = VGroup()
        for i, (tex, note) in enumerate(lines):
            m = M(tex, 34)
            nn = T(note, 24, color=MUTED)
            num = T(f"{i + 1}.", 28, color=PRIMARY, weight="BOLD")
            rows.add(VGroup(num, m, nn))
        rows.arrange(DOWN, buff=0.32, aligned_edge=LEFT).move_to(P(0, -0.2))
        for r in rows:
            r[0].set_x(-6.2)
            r[1].next_to(r[0], RIGHT, buff=0.3)
            fit(r[2], 5.9).move_to(P(0, r[1].get_y())).align_to(P(0.5, 0), LEFT)
        with self.voiceover("To recap. A rigid body turns through one angle. Every point shares omega, and its speed "
                            "is r omega. The rotational equations match the linear ones, in radians.") as vo:
            self.play(FadeIn(title), run_time=0.6)
            self.play(FadeIn(rows[0], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.3)
            self.play(FadeIn(rows[1], shift=0.15 * UP), run_time=0.7)
        with self.voiceover("The moment of inertia, the sum of m r squared, depends on the axis. Integrate for the "
                            "standard bodies, then use the parallel and perpendicular axis theorems, and add or "
                            "subtract pieces about one axis.") as vo:
            for k in (2, 3, 4, 5):
                self.play(FadeIn(rows[k], shift=0.15 * UP), run_time=0.6)
                self.wait(vo.duration * 0.08)
        with self.voiceover("Try the mastery quiz. Then chapter three asks what makes a body spin in the first "
                            "place: torque.") as vo:
            nxt = T("Next: Chapter 3 · Torque and Rotational Dynamics", 30, color=PRIMARY).move_to(P(0, -3.5))
            self.wait(vo.duration * 0.3)
            self.play(FadeIn(nxt, shift=0.2 * UP), run_time=0.8)
