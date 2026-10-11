import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

# Chapter colour roles (light background).
A_C = PRIMARY  # bodies, momentum = strawberry red
V_C = SECONDARY  # velocities = teal
L_C = ACCENT  # angular momentum, lever arms, axes = amber
F_C = PURPLE  # friction / forces
HL = ManimColor("#D19A00")  # highlight gold
WARN = PRIMARY
BODY = ManimColor("#F3D9C9")
WOOD = ManimColor("#E9C7A6")


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
    c = Circle(radius=r, color=L_C, stroke_width=3).set_fill(WHITE, 1)
    d = Dot(radius=0.045, color=L_C)
    return VGroup(c, d).move_to(pt)


def arrow(start, end, color, sw=5):
    return Arrow(start, end, buff=0, color=color, stroke_width=sw,
                 max_tip_length_to_length_ratio=0.25, max_stroke_width_to_length_ratio=10)


def wheel(c, R, ang, color=A_C, kind="disc"):
    """ang is the clockwise rotation (positive = forward rolling to the right)."""
    g = VGroup()
    if kind == "ring":
        g.add(Circle(radius=R, color=color, stroke_width=7).move_to(c))
    elif kind == "hollow":
        g.add(Circle(radius=R, color=color, stroke_width=4).set_fill(color, 0.12).move_to(c))
        g.add(Ellipse(width=2 * R, height=0.45 * R, color=color, stroke_width=2).move_to(c).rotate(-ang))
    elif kind == "solid":
        g.add(Circle(radius=R, color=color, stroke_width=3).set_fill(color, 0.7).move_to(c))
    else:
        g.add(Circle(radius=R, color=color, stroke_width=4).set_fill(color, 0.3).move_to(c))
    for k in range(3):
        a = -ang + PI / 2 + k * TAU / 3
        g.add(Line(c, c + R * np.array([np.cos(a), np.sin(a), 0]), color=INK, stroke_width=2))
    g.add(Dot(c, radius=0.05, color=INK))
    return g


class MrgCh4Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Momentum, Rotation & Gravitation",
            "Chapter 4 · Angular Momentum and Rolling",
            "Chapter four. Angular momentum and rolling.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ scene 1: angular momentum
    def s1(self):
        e1 = M(r"\vec L = \vec r\times\vec p", 54).move_to(P(3.6, 2.6))
        e2 = M(r"L = m v\,r_\perp", 46, color=L_C).move_to(P(3.6, 1.5))
        O = P(-4.6, -2.2)
        u = 0.85  # units per metre
        yl = O[1] + 4 * u
        line = DashedLine(P(-6.8, yl), P(1.6, yl), color=GRID, stroke_width=3)
        x = ValueTracker(-6.2)
        part = always_redraw(lambda: Dot(P(x.get_value(), yl), radius=0.16, color=A_C))
        pv = always_redraw(lambda: arrow(P(x.get_value(), yl), P(x.get_value() + 1.3, yl), A_C, sw=5))
        rv = always_redraw(lambda: arrow(O, P(x.get_value(), yl), V_C, sw=4))
        Od = Dot(O, radius=0.08, color=INK)
        Ol = M("O", 32).next_to(O, DOWN, buff=0.15)
        perp = Line(O, P(O[0], yl), color=L_C, stroke_width=5)
        ra = RightAngle(Line(P(O[0], yl), O), Line(P(O[0], yl), P(O[0] + 1, yl)), length=0.22, color=INK,
                        stroke_width=2)
        pl = M(r"r_\perp = 4\ \text{m}", 32, color=L_C).next_to(perp, LEFT, buff=0.15)
        with self.voiceover("Force changes momentum, and torque changes spin. The quantity torque changes is angular "
                            "momentum: L equals r cross p. Its size is m v times the lever arm, the perpendicular "
                            "distance from the point to the line of motion.") as vo:
            self.play(FadeIn(Od), FadeIn(Ol), Create(line), run_time=0.7)
            self.add(rv, part, pv)
            self.play(Write(e1), x.animate.set_value(-5.0), run_time=1.4, rate_func=linear)
            self.play(Write(e2), x.animate.set_value(-3.6), run_time=1.6, rate_func=linear)
            self.play(Create(perp), Create(ra), FadeIn(pl), x.animate.set_value(-2.4), run_time=1.4,
                      rate_func=linear)
        Lv = M(r"L = (2)(3)(4) = 24\ \text{kg m}^2/\text{s}", 38).move_to(P(3.6, 0.2))
        fit(Lv, 6.4)
        with self.voiceover("A two kilogram particle moves at three metres per second along a straight line four "
                            "metres from O. Its angular momentum is six times four: twenty four, and it stays "
                            "twenty four as the particle moves. About a point on its line, L is zero.") as vo:
            self.play(Write(Lv), x.animate.set_value(-0.6), run_time=2.0, rate_func=linear)
            cst = T("the same at every instant", 26, color=MUTED).next_to(Lv, DOWN, buff=0.25)
            self.play(FadeIn(cst), x.animate.set_value(0.6), run_time=1.4, rate_func=linear)
            Qp = P(-2.0, yl)
            q = Dot(Qp, radius=0.08, color=INK)
            ql = M(r"L = 0", 32, color=WARN).next_to(Qp, UP, buff=0.4)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(q), FadeIn(ql), x.animate.set_value(1.2), run_time=1.0, rate_func=linear)
        for m in (part, pv, rv):
            m.clear_updaters()
        d1 = M(r"\frac{d\vec L}{dt} = \underbrace{\vec v\times m\vec v}_{=\,\vec 0} + \vec r\times\vec F = \vec\tau", 46)
        d2 = M(r"\text{rigid body:}\quad L = I\omega", 44, color=L_C)
        dc = VGroup(d1, d2).arrange(DOWN, buff=0.5).move_to(P(0, 0.3))
        with self.voiceover("Differentiate r cross p. The first term, v cross m v, vanishes, leaving r cross F: "
                            "torque is the rate of change of angular momentum. For a rigid body about a fixed axis, "
                            "L is I omega.") as vo:
            self.clear_scene(0.5)
            self.play(Write(d1), run_time=2.0)
            self.wait(vo.duration * 0.15)
            self.play(Write(d2), run_time=1.2)
            box = SurroundingRectangle(d1, buff=0.2, corner_radius=0.12, color=PRIMARY, stroke_width=3)
            self.play(Create(box), run_time=0.5)

    # ------------------------------------------------------------ scene 2: conservation
    def s2(self):
        C = P(-3.6, -0.4)
        arm = ValueTracker(2.4)
        ang = ValueTracker(0.0)

        def I_of(a):  # maps arm length 2.4 -> I = 4, 0.75 -> I = 1.6
            return 1.6 + 2.4 * (a - 0.75) / (2.4 - 0.75)

        def skater():
            a = ang.get_value()
            r = arm.get_value()
            u = np.array([np.cos(a), np.sin(a), 0])
            body = Circle(radius=0.55, color=INK, stroke_width=3).set_fill(BODY, 1).move_to(C)
            head = Circle(radius=0.25, color=INK, stroke_width=2).set_fill(A_C, 0.8).move_to(C)
            arms = Line(C - r * u, C + r * u, color=A_C, stroke_width=7)
            hands = VGroup(Dot(C + r * u, radius=0.16, color=A_C), Dot(C - r * u, radius=0.16, color=A_C))
            return VGroup(arms, body, head, hands)

        sk = always_redraw(skater)
        Lval = 12.0

        def spin(m, dt):
            ang.increment_value(-0.32 * (Lval / I_of(arm.get_value())) * dt)

        driver = Mobject()
        driver.add_updater(spin)
        cap = T("a skater, seen from above", 22, color=MUTED).move_to(P(-3.6, 2.9))
        e0 = M(r"\tau_{\text{ext}} = 0 \ \Rightarrow\ L = I\omega = \text{constant}", 42).move_to(P(3.3, 2.6))
        fit(e0, 6.6)
        e1 = M(r"4 \times 3 = 1.6\,\omega_2 \ \Rightarrow\ \omega_2 = 7.5\ \text{rad/s}", 38).move_to(P(3.3, 1.3))
        fit(e1, 6.6)
        with self.voiceover("With no external torque, angular momentum is constant. A skater spins at three radians "
                            "per second with her arms out, I equal to four. She pulls them in to one point six, and "
                            "spins at seven point five.") as vo:
            self.add(sk, driver)
            self.play(FadeIn(sk), FadeIn(cap), Write(e0), run_time=1.4)
            self.wait(vo.duration * 0.25)
            self.play(arm.animate.set_value(0.75), Write(e1), run_time=2.0)
            self.wait(max(0.1, vo.duration - 3.4 - vo.duration * 0.25))
        k1 = M(r"K_1 = \tfrac12(4)(3^2) = 18\ \text{J}", 38)
        k2 = M(r"K_2 = \tfrac12(1.6)(7.5^2) = 45\ \text{J}", 38, color=WARN)
        kc = VGroup(k1, k2).arrange(DOWN, buff=0.3, aligned_edge=LEFT).move_to(P(3.3, -0.6))
        with self.voiceover("Her kinetic energy jumps from eighteen joules to forty five. Angular momentum is "
                            "conserved, but kinetic energy is not: her muscles did work pulling her arms in.") as vo:
            self.play(Write(k1), run_time=1.0)
            self.play(Write(k2), run_time=1.0)
            mus = T("work done by her muscles", 26, color=MUTED).next_to(kc, DOWN, buff=0.3)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(mus), run_time=0.6)
        driver.clear_updaters()
        sk.clear_updaters()
        self.remove(driver)

        with self.voiceover("And when a lump of clay hits a hinged rod, the hinge can give a sudden push, so linear "
                            "momentum is not conserved. Angular momentum about the hinge is, because the hinge force "
                            "has no torque there.") as vo:
            self.clear_scene(0.5)
            H = P(-3.0, 2.4)
            Lr = 4.0
            th = ValueTracker(0.0)

            def rod():
                a = th.get_value()
                d = np.array([np.sin(a), -np.cos(a), 0])
                r = Line(H, H + Lr * d, color=WOOD, stroke_width=14)
                return r

            rd = always_redraw(rod)
            hg = axis_dot(H, 0.16)
            ceil = Line(H + 1.0 * LEFT + 0.18 * UP, H + 1.0 * RIGHT + 0.18 * UP, color=INK, stroke_width=4)
            clay = Dot(P(-6.6, H[1] - Lr), radius=0.18, color=A_C)
            self.add(rd)
            self.play(FadeIn(ceil), FadeIn(hg), FadeIn(rd), FadeIn(clay), run_time=0.7)
            self.play(clay.animate.move_to(H + Lr * DOWN + 0.2 * LEFT), run_time=0.8, rate_func=linear)
            clay.add_updater(lambda m: m.move_to(H + (Lr + 0.0) * np.array([np.sin(th.get_value()), -np.cos(th.get_value()), 0])
                                                 + 0.2 * np.array([-np.cos(th.get_value()), -np.sin(th.get_value()), 0])))
            imp = arrow(H + 0.9 * RIGHT + 0.4 * DOWN, H + 0.25 * RIGHT + 0.25 * DOWN, F_C, sw=5)
            self.play(th.animate.set_value(50 * DEGREES), FadeIn(imp), run_time=1.4, rate_func=rate_functions.ease_out_quad)
            clay.clear_updaters()
            rd.clear_updaters()
            r1 = M(r"\vec p\ \text{conserved?}", 40).move_to(P(3.0, 1.6))
            x1 = cross_mark().scale(0.8).next_to(r1, RIGHT, buff=0.3)
            r2 = M(r"L\ \text{about the hinge}", 40).move_to(P(3.0, 0.2))
            c2 = check().next_to(r2, RIGHT, buff=0.3)
            hl = T("hinge impulse", 22, color=F_C).next_to(imp.get_start(), RIGHT, buff=0.1)
            self.play(FadeIn(hl), Write(r1), FadeIn(x1), run_time=1.2)
            self.wait(vo.duration * 0.1)
            self.play(Write(r2), FadeIn(c2), run_time=1.2)

    # ------------------------------------------------------------ scene 3: rolling without slipping
    def s3(self):
        yg = -2.4
        R = 1.3
        ground = Line(P(-7.0, yg), P(7.0, yg), color=INK, stroke_width=4)
        x = ValueTracker(-5.0)
        c = lambda: P(x.get_value(), yg + R)
        wh = always_redraw(lambda: wheel(c(), R, (x.get_value() + 5.0) / R))
        v = 1.3

        def arrows(show_rot=True, show_tot=False):
            g = VGroup()
            cc = c()
            for name, off in (("top", UP), ("bottom", DOWN), ("front", RIGHT)):
                p = cc + R * off
                if show_rot:
                    rot = np.array([off[1], -off[0], 0]) * v  # clockwise spin velocity at p
                    if not show_tot:
                        g.add(arrow(p, p + v * RIGHT, V_C, sw=4))
                        g.add(arrow(p, p + rot, F_C, sw=4))
                    else:
                        tot = v * RIGHT + rot
                        if np.linalg.norm(tot) > 0.05:
                            g.add(arrow(p, p + tot, A_C, sw=6))
                        else:
                            g.add(Dot(p, radius=0.09, color=A_C))
            g.add(arrow(cc, cc + v * RIGHT, V_C, sw=5))
            return g

        e = M(r"\vec v_P = \vec v_{cm} + \vec\omega\times\vec r", 44).move_to(P(2.8, 3.0))
        with self.voiceover("A rolling wheel does two things at once. Its centre moves forward at v, and it spins "
                            "about the centre. Add the two velocities at every point.") as vo:
            self.add(ground, wh)
            self.play(FadeIn(ground), FadeIn(wh), run_time=0.6)
            self.play(x.animate.set_value(-2.0), run_time=2.0, rate_func=linear)
            parts = arrows(True, False)
            leg = VGroup(T("translation", 22, color=V_C), T("spin", 22, color=F_C)).arrange(RIGHT, buff=0.5)
            leg.move_to(P(-4.4, 3.2))
            self.play(FadeIn(parts), FadeIn(leg), Write(e), run_time=1.2)
        tot = arrows(True, True)
        labs = VGroup(M(r"2v", 36, color=A_C).next_to(c() + R * UP + 2 * v * RIGHT, RIGHT, buff=0.1),
                      M(r"0", 36, color=A_C).next_to(c() + R * DOWN, DL, buff=0.08),
                      M(r"\sqrt2\,v", 36, color=A_C).next_to(c() + R * RIGHT + v * (RIGHT + DOWN), RIGHT, buff=0.12).shift(0.35 * UP))
        cond = M(r"v_{cm} = \omega R", 50, color=L_C).move_to(P(2.8, 1.8))
        with self.voiceover("At the bottom, translation carries the point forward at v and spin carries it back at "
                            "omega R. Rolling without slipping means these cancel: v equals omega R, and the contact "
                            "point is momentarily at rest. The top moves at two v, and the front at root two "
                            "v.") as vo:
            self.play(Indicate(parts[2:4], color=HL), run_time=1.0)
            self.play(Write(cond), run_time=1.0)
            self.wait(vo.duration * 0.15)
            self.play(ReplacementTransform(parts, tot), run_time=1.2)
            self.play(FadeIn(labs), run_time=0.8)
        with self.voiceover("So at each instant the wheel is pivoting about its contact point. A point on the rim "
                            "traces a cycloid, stopping for an instant each time it touches the ground.") as vo:
            self.play(FadeOut(tot), FadeOut(labs), FadeOut(leg), run_time=0.4)
            P0 = c() + R * DOWN
            spokes = VGroup(*[DashedLine(P0, c() + R * np.array([np.cos(a), np.sin(a), 0]), color=L_C,
                                         stroke_width=2) for a in (PI / 2, PI / 4, 0, 3 * PI / 4)])
            icr = axis_dot(P0, 0.14)
            il = T("instantaneous axis", 22, color=L_C).next_to(P0, DOWN, buff=0.15)
            self.play(FadeIn(icr), Create(spokes), FadeIn(il), run_time=1.0)
            self.play(FadeOut(spokes), FadeOut(icr), FadeOut(il), run_time=0.4)

            def rim():
                a = (x.get_value() + 5.0) / R
                return c() + R * np.array([-np.sin(a), -np.cos(a), 0])

            tr = TracedPath(rim, stroke_color=A_C, stroke_width=3)
            dot = always_redraw(lambda: Dot(rim(), radius=0.09, color=A_C))
            self.add(tr, dot)
            self.play(x.animate.set_value(5.6), run_time=max(2.0, vo.duration - 2.0), rate_func=linear)
            tr.clear_updaters()
            dot.clear_updaters()
        wh.clear_updaters()
        with self.voiceover("The kinetic energy is translation plus spin: one half M v squared, times one plus k "
                            "squared over R squared.") as vo:
            k = M(r"K = \tfrac12Mv^2 + \tfrac12Mk^2\frac{v^2}{R^2} = \tfrac12Mv^2\left(1 + \frac{k^2}{R^2}\right)", 42)
            k.move_to(P(0, 0.6))
            fit(k, 12.5)
            bg = BackgroundRectangle(k, fill_color=BG, fill_opacity=0.9, buff=0.2)
            self.play(FadeOut(e), FadeOut(cond), run_time=0.3)
            self.play(FadeIn(bg), Write(k), run_time=2.0)

    # ------------------------------------------------------------ scene 4: incline race
    def s4(self):
        th = 12 * DEGREES
        d = np.array([np.cos(-th), np.sin(-th), 0])
        n = np.array([np.sin(th), np.cos(th), 0])
        Ls = 6.8
        r = 0.32
        bodies = [("solid sphere", 0.4, "solid"), ("disc", 0.5, "disc"), ("hollow sphere", 2 / 3, "hollow"),
                  ("ring", 1.0, "ring")]
        tau = ValueTracker(0.0)
        lanes = VGroup()
        movers = []
        names = VGroup()
        for i, (nm, k2, kind) in enumerate(bodies):
            S = P(-6.6, 2.4 - 1.35 * i)
            ln = Line(S, S + Ls * d, color=INK, stroke_width=3)
            lanes.add(ln)
            acc = 1.4 / (1 + k2)

            def make(S=S, acc=acc, kind=kind):
                s = min(Ls - 2.4, (Ls - 2.4) * acc * tau.get_value() ** 2)
                cpos = S + (2.0 + s) * d + r * n
                return wheel(cpos, r, s / r, color=A_C, kind=kind)

            movers.append(always_redraw(make))
            names.add(T(nm, 20, color=MUTED).next_to(S + 0.2 * d, UP, buff=0.2).align_to(S, LEFT))
        with self.voiceover("Line up a ring, a disc, a hollow ball and a solid ball on a slope, and let them go "
                            "together. Gravity pulls each one down the slope. Static friction, pointing up the "
                            "slope, supplies the torque that spins it.") as vo:
            self.play(Create(lanes), run_time=0.8)
            self.add(*movers)
            self.play(*[FadeIn(m) for m in movers], FadeIn(names), run_time=0.8)
            # force diagram on the top lane body at start
            p0 = movers[0].get_center()
            g = arrow(p0, p0 + 0.9 * d, F_C, sw=4)
            f = arrow(movers[0].get_bottom() + 0.0 * UP, movers[0].get_bottom() - 0.8 * d, L_C, sw=4)
            gl = M(r"Mg\sin\theta", 26, color=F_C).next_to(g.get_end(), UR, buff=0.05)
            fl = M(r"f", 28, color=L_C).next_to(f.get_end(), DOWN, buff=0.08)
            self.wait(vo.duration * 0.2)
            self.play(GrowArrow(g), FadeIn(gl), run_time=0.6)
            self.play(GrowArrow(f), FadeIn(fl), run_time=0.6)
        a = M(r"a = \frac{g\sin\theta}{1 + k^2/R^2}", 50, color=A_C).move_to(P(3.9, 2.6))
        with self.voiceover("Forces and torques together give the acceleration: g sine theta, over one plus k squared "
                            "over R squared. Mass and radius cancel. Only the shape number decides the race: the solid "
                            "sphere wins, then the disc, then the hollow sphere, and the ring comes last.") as vo:
            self.play(FadeOut(VGroup(g, f, gl, fl)), Write(a), run_time=1.4)
            self.wait(vo.duration * 0.2)
            self.play(tau.animate.set_value(1.0), run_time=max(2.5, vo.duration * 0.55), rate_func=linear)
            order = VGroup(*[M(f"{i + 1}.\\ \\tfrac{{k^2}}{{R^2}} = " + ["\\tfrac25", "\\tfrac12", "\\tfrac23", "1"][i], 26,
                               color=GREEN if i == 0 else INK).next_to(movers[i], RIGHT, buff=0.2) for i in range(4)])
            self.play(FadeIn(order), run_time=0.5)
        for m in movers:
            m.clear_updaters()
        with self.voiceover("Friction acts at a point that is momentarily at rest, so it does no work, and energy is "
                            "conserved. A solid sphere rolling seven metres down a thirty degree slope reaches root "
                            "fifty: about seven point zero seven metres per second.") as vo:
            w1 = M(r"a = \frac{10\times\frac12}{7/5} = \frac{25}{7}\ \text{m/s}^2", 38)
            w2 = M(r"v^2 = 2as = 2\cdot\tfrac{25}{7}\cdot 7 = 50", 38)
            w3 = M(r"v = \sqrt{50} \approx 7.07\ \text{m/s}", 42, color=GREEN)
            wc = VGroup(w1, w2, w3).arrange(DOWN, buff=0.3, aligned_edge=LEFT)
            fit(wc, 4.6).move_to(P(4.7, 0.1))
            nw = T("static friction does no work", 24, color=L_C).next_to(a, DOWN, buff=0.25)
            self.play(FadeIn(nw), run_time=0.6)
            self.wait(vo.duration * 0.15)
            self.play(Write(w1), run_time=1.3)
            self.play(Write(w2), run_time=1.2)
            self.play(Write(w3), run_time=1.0)

    # ------------------------------------------------------------ scene 5: slip to roll
    def s5(self):
        yg = 0.4
        R = 0.6
        ground = Line(P(-7.0, yg), P(7.0, yg), color=INK, stroke_width=4)
        t = ValueTracker(0.0)
        sc = 1.6  # units per metre... scaled so 6 m skid fits

        def xpos():
            tt = t.get_value()
            s = 7 * tt - tt * tt if tt <= 1 else 6 + 5 * (tt - 1)
            return -6.2 + 0.85 * s

        def spin():
            tt = t.get_value()
            th = 2.5 * tt * tt if tt <= 1 else 2.5 + 5 * (tt - 1)
            return 0.85 * th / R

        ball = always_redraw(lambda: wheel(P(xpos(), yg + R), R, spin(), color=A_C, kind="solid"))
        fr = always_redraw(lambda: arrow(P(xpos(), yg), P(xpos() - 0.9, yg), F_C, sw=5)
                           if t.get_value() < 0.98 else VectorizedPoint(P(xpos(), yg)))
        frl = always_redraw(lambda: M(r"\mu Mg", 28, color=F_C).next_to(P(xpos() - 0.5, yg), DOWN, buff=0.12)
                            if t.get_value() < 0.98 else VectorizedPoint(P(xpos(), yg)))
        skid = T("skids", 24, color=F_C).move_to(P(-3.6, 2.4))
        with self.voiceover("A bowling ball leaves the hand sliding, with no spin. Kinetic friction acts backwards at "
                            "the contact point: it slows the centre down and spins the ball up, until v equals omega "
                            "R, and it rolls.") as vo:
            self.add(ground, ball, fr, frl)
            self.play(FadeIn(ground), FadeIn(ball), run_time=0.6)
            self.play(FadeIn(skid), t.animate.set_value(1.0), run_time=max(2.0, vo.duration - 2.4), rate_func=linear)
            rl = T("rolls", 24, color=GREEN).move_to(P(xpos() + 0.4, 2.4))
            self.play(FadeIn(rl), t.animate.set_value(1.25), run_time=1.0, rate_func=linear)
        for m in (ball, fr, frl):
            m.clear_updaters()

        ax = Axes(x_range=[0, 1.5, 0.5], y_range=[0, 8, 1], x_length=5.0, y_length=3.0,
                  axis_config={"color": INK, "stroke_width": 2, "include_tip": False},
                  x_axis_config={"numbers_to_include": [0.5, 1, 1.5], "font_size": 22, "decimal_number_config": {"color": INK, "num_decimal_places": 1}},
                  y_axis_config={"numbers_to_include": [2, 4, 6], "font_size": 22, "decimal_number_config": {"color": INK, "num_decimal_places": 0}})
        ax.move_to(P(-3.6, -2.2))
        vline = ax.plot(lambda tt: 7 - 2 * tt if tt <= 1 else 5, x_range=[0, 1.5], color=V_C, stroke_width=4)
        wline = ax.plot(lambda tt: 5 * tt if tt <= 1 else 5, x_range=[0, 1.5], color=F_C, stroke_width=4)
        vl = M(r"v = 7 - 2t", 28, color=V_C).next_to(ax.c2p(0.3, 7.6), RIGHT, buff=0.1)
        wl = M(r"\omega R = 5t", 28, color=F_C).next_to(ax.c2p(0.45, 2.0), RIGHT, buff=0.15)
        tl = M(r"t\ (\text{s})", 24, color=MUTED).next_to(ax.x_axis, RIGHT, buff=0.1)
        meet = Dot(ax.c2p(1, 5), radius=0.08, color=HL)
        m1 = M(r"7 - 2t = 5t \ \Rightarrow\ t = 1\ \text{s}", 38).move_to(P(3.4, -1.3))
        m2 = M(r"v_f = 5\ \text{m/s} = \tfrac57 v_0", 42, color=GREEN).move_to(P(3.4, -2.4))
        with self.voiceover("Launched at seven metres per second, with mu equal to nought point two, its speed falls as "
                            "seven minus two t, while omega R rises as five t. They meet after one second, at five "
                            "metres per second: five sevenths of the launch speed.") as vo:
            self.play(FadeOut(skid), FadeOut(rl), run_time=0.3)
            self.play(Create(ax), FadeIn(tl), run_time=0.7)
            self.play(Create(vline), FadeIn(vl), run_time=1.0)
            self.play(Create(wline), FadeIn(wl), run_time=1.0)
            self.play(FadeIn(meet, scale=2), Write(m1), run_time=1.3)
            self.wait(vo.duration * 0.05)
            self.play(Write(m2), run_time=1.2)
        with self.voiceover("There is a slicker route. Friction acts at the contact line, so angular momentum about any "
                            "point on the floor is conserved. That gives five sevenths v nought in one line, without "
                            "mu or time. And friction does not always slow a ball: a ring set down spinning is pulled "
                            "forwards, to half of omega nought R.") as vo:
            self.play(FadeOut(m1), m2.animate.move_to(P(3.4, -1.0)), run_time=0.5)
            q = M(r"Mv_0R = Mv_fR + \tfrac25MR^2\frac{v_f}{R}", 38).move_to(P(3.4, 2.6))
            ql = T("L about the contact point is conserved", 24, color=L_C).next_to(q, DOWN, buff=0.25)
            fit(VGroup(q, ql), 6.6)
            self.play(Write(q), FadeIn(ql), run_time=1.8)
            self.wait(vo.duration * 0.25)
            rg = M(r"\text{ring set down spinning: } v_f = \tfrac12\omega_0R", 36, color=F_C).move_to(P(3.4, -2.4))
            fit(rg, 6.6)
            self.play(Write(rg), run_time=1.4)

    # ------------------------------------------------------------ scene 6: blows on rigid bodies
    def s6(self):
        e = M(r"M\,\Delta v_{cm} = J, \qquad I_{cm}\,\Delta\omega = J\,d", 42).move_to(P(3.9, 3.0))
        fit(e, 5.8)
        y = 0.6
        Lr = 6.0
        u = Lr / 1.2  # units per metre
        x0 = -3.0  # rod centre
        rod = Rectangle(width=Lr, height=0.2, color=INK, stroke_width=3).set_fill(WOOD, 1).move_to(P(x0, y))
        cm = com_dot(P(x0, y), 0.12)
        J = arrow(P(x0 + Lr / 2, y - 1.6), P(x0 + Lr / 2, y - 0.15), F_C, sw=6)
        Jl = M(r"J", 36, color=F_C).next_to(J, RIGHT, buff=0.1)
        cap = T("a rod on a smooth table, seen from above", 22, color=MUTED).move_to(P(x0, y - 2.4))
        with self.voiceover("A sudden blow gives both linear and angular impulse. Strike a rod lying on a smooth table "
                            "at one end. Its centre moves at J over M, exactly as if it were struck in the middle, "
                            "and on top of that it spins, at six J over M L.") as vo:
            self.play(FadeIn(rod), FadeIn(cm), FadeIn(cap), run_time=0.7)
            self.play(GrowArrow(J), FadeIn(Jl), run_time=0.7)
            self.play(Write(e), run_time=1.6)
            r1 = M(r"v_{cm} = \frac JM,\qquad \omega = \frac{6J}{ML}", 44, color=A_C).move_to(P(3.9, 1.7))
            fit(r1, 5.6)
            self.wait(vo.duration * 0.15)
            self.play(Write(r1), run_time=1.4)
        vs = 0.35  # units per (m/s)
        prof = VGroup()
        for k in range(9):
            xm = -0.6 + 1.2 * k / 8
            vv = 1.5 + 7.5 * xm
            px = x0 + xm * u
            if abs(vv) < 0.05:
                prof.add(Dot(P(px, y), radius=0.08, color=GREEN))
            else:
                prof.add(arrow(P(px, y), P(px, y + vv * vs), V_C, sw=4))
        zero = P(x0 + (-0.2) * u, y)
        zl = T("starts at rest", 22, color=GREEN).next_to(zero, DOWN, buff=0.75)
        br = BraceBetweenPoints(P(x0 + Lr / 2, y + 2.4), P(zero[0], y + 2.4), UP, color=INK)
        brl = M(r"\tfrac{2L}{3}", 32).next_to(br, UP, buff=0.08)
        n1 = M(r"v_{cm} = \frac{3}{2} = 1.5\ \text{m/s}", 36)
        n2 = M(r"\omega = \frac{3 \times 0.6}{0.24} = 7.5\ \text{rad/s}", 36)
        n3 = M(r"v_{\text{end}} = 1.5 + 7.5(0.6) = 6\ \text{m/s}", 36)
        nc = VGroup(n1, n2, n3).arrange(DOWN, buff=0.3, aligned_edge=LEFT).move_to(P(4.0, -0.6))
        fit(nc, 5.4)
        with self.voiceover("A two kilogram rod, one point two metres long, struck at one end with three newton "
                            "seconds: the centre moves at one point five metres per second, and the rod spins at "
                            "seven point five radians per second. The struck end moves at six. One point, two thirds "
                            "of the way from the struck end, starts at rest.") as vo:
            self.play(FadeOut(J), FadeOut(Jl), FadeOut(cap), run_time=0.4)
            self.play(Write(n1), run_time=1.0)
            self.play(Write(n2), run_time=1.2)
            self.play(LaggedStart(*[GrowArrow(a) if isinstance(a, Arrow) else FadeIn(a) for a in prof],
                                  lag_ratio=0.1), run_time=1.4)
            self.play(Write(n3), run_time=1.1)
            self.wait(vo.duration * 0.05)
            self.play(FadeIn(zl), GrowFromCenter(br), FadeIn(brl), run_time=0.9)
        with self.voiceover("Hinge the rod at its far end instead, and strike it at the matching point, two thirds of "
                            "the way from the hinge: the hinge feels no jolt at all. That is the sweet spot of a "
                            "cricket bat.") as vo:
            self.clear_scene(0.5)
            H = P(-4.8, 2.4)
            Lb = 5.0
            bat = VGroup(Rectangle(width=0.22, height=1.4, color=INK, stroke_width=3).set_fill(WOOD, 1)
                         .move_to(H + 0.7 * DOWN),
                         RoundedRectangle(width=0.7, height=Lb - 1.4, corner_radius=0.15, color=INK, stroke_width=3)
                         .set_fill(WOOD, 1).move_to(H + (1.4 + (Lb - 1.4) / 2) * DOWN))
            hg = axis_dot(H, 0.16)
            sp = H + (2 * Lb / 3) * DOWN
            ball = Dot(sp + 2.6 * RIGHT, radius=0.16, color=A_C)
            self.play(FadeIn(bat), FadeIn(hg), run_time=0.7)
            br2 = BraceBetweenPoints(H + 0.5 * LEFT, sp + 0.5 * LEFT, LEFT, color=INK)
            b2l = M(r"\tfrac{2L}{3}", 32).next_to(br2, LEFT, buff=0.1)
            self.play(GrowFromCenter(br2), FadeIn(b2l), FadeIn(ball), run_time=0.7)
            self.play(ball.animate.move_to(sp + 0.5 * RIGHT), run_time=0.6, rate_func=linear)
            self.play(Flash(sp + 0.35 * RIGHT, color=HL), run_time=0.5)
            ss = T("sweet spot: no impulse at the hinge", 28, color=GREEN).move_to(P(2.6, 0.8))
            fit(ss, 7.2)
            self.play(FadeIn(ss), ball.animate.move_to(sp + 5.0 * RIGHT), run_time=0.9)

    # ------------------------------------------------------------ scene 7: recap
    def s7(self):
        title = T("Chapter 4 in six lines", 38, color=PRIMARY, weight="BOLD").move_to(P(0, 3.3))
        lines = [
            (r"\vec L = \vec r\times\vec p,\ \ L = I\omega", "mv times the lever arm"),
            (r"\vec\tau_{\text{ext}} = \frac{d\vec L}{dt}", "no torque: L conserved, K need not be"),
            (r"v_{cm} = \omega R", "contact point at rest, top at 2v"),
            (r"a = \frac{g\sin\theta}{1 + k^2/R^2}", "the shape number decides the race"),
            (r"v_f = \tfrac57 v_0", "L about the contact point conserved"),
            (r"\Delta v = \tfrac JM,\ \Delta\omega = \tfrac{Jd}{I_{cm}}", "a blow gives speed and spin"),
        ]
        rows = VGroup()
        for i, (tex, note) in enumerate(lines):
            m = M(tex, 34)
            nn = T(note, 24, color=MUTED)
            num = T(f"{i + 1}.", 28, color=PRIMARY, weight="BOLD")
            rows.add(VGroup(num, m, nn))
        rows.arrange(DOWN, buff=0.26, aligned_edge=LEFT).move_to(P(0, -0.25))
        for r in rows:
            r[0].set_x(-6.2)
            r[1].next_to(r[0], RIGHT, buff=0.3)
            fit(r[2], 5.9).move_to(P(0, r[1].get_y())).align_to(P(0.5, 0), LEFT)
        with self.voiceover("To recap. Angular momentum is r cross p, or I omega for a rigid body, and torque is its "
                            "rate of change. With no external torque about a point, it is conserved, though kinetic "
                            "energy may not be.") as vo:
            self.play(FadeIn(title), run_time=0.6)
            self.play(FadeIn(rows[0], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.3)
            self.play(FadeIn(rows[1], shift=0.15 * UP), run_time=0.7)
        with self.voiceover("Rolling is translation plus rotation, locked by v equals omega R. Down a slope, the shape "
                            "number decides the race. A skidding ball rolls once friction has done its work, and a "
                            "blow gives both speed and spin.") as vo:
            for k in (2, 3, 4, 5):
                self.play(FadeIn(rows[k], shift=0.15 * UP), run_time=0.6)
                self.wait(vo.duration * 0.1)
        with self.voiceover("Try the mastery quiz. Then chapter five turns to a force that acts across empty space: "
                            "gravitation.") as vo:
            nxt = T("Next: Chapter 5 · Gravitation", 30, color=PRIMARY).move_to(P(0, -3.55))
            self.wait(vo.duration * 0.3)
            self.play(FadeIn(nxt, shift=0.2 * UP), run_time=0.8)
