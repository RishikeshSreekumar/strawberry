import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

# Chapter colour roles (light background).
A_C = PRIMARY  # body 1 / its momentum = strawberry red
B_C = SECONDARY  # body 2 / its momentum = teal
COM_C = ACCENT  # centre of mass, totals, impulse area = amber
REL_C = PURPLE  # relative motion / lost energy
HL = ManimColor("#D19A00")  # highlight gold
WARN = PRIMARY
ICE = ManimColor("#EEF6F8")
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
    q1 = Sector(radius=r, angle=PI / 2, start_angle=0, color=COM_C, fill_opacity=1, stroke_width=0)
    q3 = Sector(radius=r, angle=PI / 2, start_angle=PI, color=COM_C, fill_opacity=1, stroke_width=0)
    return VGroup(ring, q1, q3).move_to(pt)


def arrow(start, end, color, sw=5):
    return Arrow(start, end, buff=0, color=color, stroke_width=sw,
                 max_tip_length_to_length_ratio=0.25, max_stroke_width_to_length_ratio=10)


def cart(x, y, w, color, label=None):
    """A cart standing on the line y (its wheels touch y)."""
    h = 0.55
    body = RoundedRectangle(width=w, height=h, corner_radius=0.08, color=color, stroke_width=3)
    body.set_fill(color, 0.85).move_to(P(x, y + 0.14 + h / 2))
    wheels = VGroup(*[Circle(radius=0.11, color=INK, stroke_width=2).set_fill(INK, 1)
                      .move_to(P(x + s * (w / 2 - 0.2), y + 0.11)) for s in (-1, 1)])
    g = VGroup(body, wheels)
    if label:
        g.add(T(label, 20, color=WHITE, weight="BOLD").move_to(body))
    return g


def stick_man(x, base, color, s=1.0):
    return VGroup(
        Line(P(x - 0.18 * s, base), P(x, base + 0.6 * s), color=color, stroke_width=5),
        Line(P(x + 0.18 * s, base), P(x, base + 0.6 * s), color=color, stroke_width=5),
        Line(P(x, base + 0.6 * s), P(x, base + 1.3 * s), color=color, stroke_width=5),
        Line(P(x - 0.3 * s, base + 1.05 * s), P(x + 0.35 * s, base + 1.1 * s), color=color, stroke_width=5),
        Circle(radius=0.17 * s, color=color, stroke_width=4).set_fill(color, 1).move_to(P(x, base + 1.5 * s)),
    )


def path_1d(x0, u, v, tc):
    """Position after a collision at time tc: velocity u before, v after."""
    return lambda t: x0 + u * min(t, tc) + v * max(0.0, t - tc)


class MrgCh1Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Momentum, Rotation & Gravitation",
            "Chapter 1 · Momentum, Impulse and Collisions",
            "Chapter one. Momentum, impulse and collisions.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7, self.s8):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ scene 1: momentum is conserved
    def s1(self):
        yi = -1.6
        ice = Rectangle(width=14.4, height=0.5, stroke_width=0).set_fill(ICE, 1).move_to(P(0, yi - 0.25))
        line = Line(P(-7.1, yi), P(7.1, yi), color=GRID, stroke_width=3)
        t = ValueTracker(0.0)

        def xs():
            return -0.5 - 0.55 * t.get_value()

        def xb():
            return 0.05 + 5.5 * t.get_value()

        skater = always_redraw(lambda: stick_man(xs(), yi, B_C, 1.25))
        ball = always_redraw(lambda: Circle(radius=0.26, color=A_C, stroke_width=3).set_fill(A_C, 0.9)
                             .move_to(P(xb(), yi + 1.4)))
        sl = T("skater 50 kg", 24, color=B_C).move_to(P(-1.7, yi - 0.75))
        bl = T("ball 5 kg", 24, color=A_C).move_to(P(1.5, yi - 0.75))
        with self.voiceover("A skater at rest on smooth ice throws a heavy ball forwards, and slides backwards. "
                            "Nothing outside pushed her. She and the ball pushed on each other.") as vo:
            self.play(FadeIn(ice), Create(line), FadeIn(skater), FadeIn(ball), FadeIn(sl), FadeIn(bl), run_time=1.0)
            self.wait(vo.duration * 0.15)
            self.play(FadeOut(sl), FadeOut(bl), t.animate.set_value(1.0), run_time=2.4, rate_func=rush_from)
            pa = arrow(P(xb() - 0.9, yi + 2.2), P(xb() + 0.9, yi + 2.2), A_C)
            pb = arrow(P(xs() + 0.9, yi + 2.6), P(xs() - 0.9, yi + 2.6), B_C)
            self.play(GrowArrow(pa), GrowArrow(pb), run_time=0.7)
        skater.clear_updaters()
        ball.clear_updaters()

        l1 = M(r"\vec p = m\vec v, \qquad \vec F = \frac{d\vec p}{dt}", 46)
        l2 = M(r"\frac{d\vec p_1}{dt} = \vec F_{12},\quad \frac{d\vec p_2}{dt} = \vec F_{21} = -\vec F_{12}", 42)
        l3 = M(r"\Rightarrow\ \frac{d}{dt}\big(\vec p_1 + \vec p_2\big) = \vec 0", 46, color=COM_C)
        col = VGroup(l1, l2, l3).arrange(DOWN, buff=0.45).move_to(P(0, 0.6))
        with self.voiceover("Newton wrote his second law with momentum, p equals m v: force is the rate of change "
                            "of momentum. The push on the ball and the push on the skater are equal and opposite, "
                            "so their changes of momentum cancel.") as vo:
            self.clear_scene(0.5)
            self.play(Write(l1), run_time=1.2)
            self.wait(vo.duration * 0.2)
            self.play(Write(l2), run_time=1.5)
            self.play(Write(l3), run_time=1.0)
        ex = M(r"0 = 5(6) + 50V \ \Rightarrow\ V = -0.6\ \text{m/s}", 42, color=GREEN)
        with self.voiceover("So with no external force, the total momentum never changes. Fifty kilograms of "
                            "skater, five kilograms of ball thrown at six metres per second: she slides back at "
                            "nought point six.") as vo:
            self.play(FadeOut(l1), FadeOut(l2), l3.animate.move_to(P(0, 3.1)), run_time=0.6)
            box = SurroundingRectangle(l3, buff=0.2, corner_radius=0.12, color=PRIMARY, stroke_width=3)
            self.play(Create(box), run_time=0.5)
            ex.move_to(P(0, 1.7))
            self.wait(vo.duration * 0.25)
            self.play(Write(ex), run_time=1.5)

        with self.voiceover("A five kilogram rifle fires a twenty gram bullet at five hundred metres per second, "
                            "and kicks back at two. Equal and opposite momenta. But the bullet gets two and a half "
                            "thousand joules, and the rifle only ten. Momentum is conserved; kinetic energy need "
                            "not be.") as vo:
            self.clear_scene(0.5)
            r1 = M(r"0.02(500) + 5V = 0 \ \Rightarrow\ V = -2\ \text{m/s}", 46).move_to(P(0, 2.4))
            gun = VGroup(Rectangle(width=2.6, height=0.32, color=INK, stroke_width=3).set_fill(B_C, 0.8),
                         Polygon(P(-1.3, -0.16), P(-1.3, 0.16), P(-2.1, -0.45), P(-2.3, -0.2), color=INK,
                                 stroke_width=3).set_fill(B_C, 0.8)).move_to(P(-2.5, 0.4))
            bullet = Dot(P(-1.0, 0.4), radius=0.09, color=A_C)
            self.play(FadeIn(gun), FadeIn(bullet), Write(r1), run_time=1.2)
            self.play(bullet.animate.move_to(P(6.4, 0.4)), gun.animate.shift(0.5 * LEFT), run_time=0.8,
                      rate_func=linear)
            k1 = M(r"K_{\text{bullet}} = \tfrac12(0.02)(500)^2 = 2500\ \text{J}", 40, color=A_C)
            k2 = M(r"K_{\text{rifle}} = \tfrac12(5)(2)^2 = 10\ \text{J}", 40, color=B_C)
            ks = VGroup(k1, k2).arrange(DOWN, buff=0.3, aligned_edge=LEFT).move_to(P(0, -1.3))
            self.wait(vo.duration * 0.15)
            self.play(Write(k1), run_time=1.2)
            self.play(Write(k2), run_time=1.0)
            cap = T("momentum conserved, kinetic energy not", 28, color=PRIMARY).move_to(P(0, -3.0))
            self.play(FadeIn(cap), run_time=0.6)

    # ------------------------------------------------------------ scene 2: impulse
    def s2(self):
        ax = Axes(x_range=[0, 22, 5], y_range=[0, 2400, 500], x_length=7.6, y_length=4.4,
                  axis_config={"color": INK, "stroke_width": 2, "include_tip": False},
                  x_axis_config={"numbers_to_include": [0, 5, 10, 15, 20], "font_size": 22,
                                 "decimal_number_config": {"color": INK, "num_decimal_places": 0}},
                  y_axis_config={"numbers_to_include": [500, 1000, 1500, 2000], "font_size": 22,
                                 "decimal_number_config": {"color": INK, "num_decimal_places": 0}})
        ax.move_to(P(-2.6, -0.6))
        xl = T("t (ms)", 22, color=MUTED).next_to(ax.x_axis, DOWN, buff=0.45)
        yl = T("F (N)", 22, color=MUTED).next_to(ax.y_axis, UP, buff=0.15)

        def pulse(t0, peak, base):
            pts = [ax.c2p(t0, 0), ax.c2p(t0 + base / 2, peak), ax.c2p(t0 + base, 0)]
            return Polygon(*pts, color=A_C, stroke_width=4).set_fill(COM_C, 0.45)

        tall = pulse(1, 2100, 5)
        wide = pulse(1, 525, 20)
        hdr = M(r"\vec J = \int \vec F\,dt = \Delta\vec p", 50).move_to(P(0, 3.2))
        area = T("impulse = area", 26, color=COM_C).move_to(ax.c2p(9.5, 1700))
        with self.voiceover("Integrate force over time and you get the change of momentum. That integral is the "
                            "impulse: the area under the force time graph.") as vo:
            self.play(Create(ax), FadeIn(xl), FadeIn(yl), run_time=1.0)
            self.play(Write(hdr), run_time=1.2)
            self.play(Create(tall), run_time=1.0)
            self.play(FadeIn(area), run_time=0.5)

        c1 = M(r"p_1 = 0.15(-20) = -3", 34)
        c2 = M(r"p_2 = 0.15(15) = 2.25", 34)
        c3 = M(r"J = 2.25 - (-3) = 5.25\ \text{N s}", 34, color=COM_C)
        c4 = M(r"\bar F = \frac{5.25}{0.005} = 1050\ \text{N}", 36, color=A_C)
        c5 = M(r"\approx 700\times\ \text{the weight}", 32, color=MUTED)
        col = VGroup(c1, c2, c3, c4, c5).arrange(DOWN, buff=0.28, aligned_edge=LEFT).move_to(P(4.5, -0.3))
        fit(col, 4.6)
        with self.voiceover("A nought point one five kilogram ball hits a wall at twenty metres per second and "
                            "rebounds at fifteen. The momentum change is two point two five, minus minus three: "
                            "five point two five newton seconds. Over five milliseconds, that is an average force "
                            "of one thousand and fifty newtons, seven hundred times the ball's weight.") as vo:
            for m, rt in ((c1, 0.9), (c2, 0.9), (c3, 1.1)):
                self.play(Write(m), run_time=rt)
                self.wait(vo.duration * 0.06)
            self.play(Write(c4), run_time=1.2)
            self.play(FadeIn(c5), run_time=0.6)
        with self.voiceover("A tall thin pulse and a low wide one can have the same area. That is what giving "
                            "hands, airbags and crash mats do: the same impulse, spread over a longer time, so a "
                            "smaller force.") as vo:
            self.play(FadeOut(c1), FadeOut(c2), FadeOut(c5), run_time=0.4)
            c4b = M(r"\Delta t = 20\ \text{ms}:\ \ \bar F \approx 260\ \text{N}", 36, color=A_C).move_to(c4)
            self.play(Transform(tall, wide), FadeOut(area), run_time=2.0)
            self.play(Transform(c4, c4b), run_time=0.9)
            same = T("same area, same impulse", 26, color=COM_C).move_to(ax.c2p(11, 1500))
            self.play(FadeIn(same), Indicate(c3, color=HL), run_time=1.0)

    # ------------------------------------------------------------ scene 3: variable mass
    def s3(self):
        yb = -0.6
        x0, x1 = -6.4, -0.6
        belt = RoundedRectangle(width=x1 - x0 + 0.5, height=0.5, corner_radius=0.25, color=INK, stroke_width=3)
        belt.move_to(P((x0 + x1) / 2, yb - 0.25))
        rollers = VGroup(*[Circle(radius=0.2, color=INK, stroke_width=2).move_to(P(x, yb - 0.25))
                           for x in (x0 + 0.05, x1 - 0.05)])
        hop = Polygon(P(-5.6, 2.6), P(-4.4, 2.6), P(-4.85, 1.9), P(-5.15, 1.9), color=INK,
                      stroke_width=3).set_fill(BODY, 1)
        t = ValueTracker(0.0)
        vbelt = 2.2

        def sand():
            g = VGroup()
            tt = t.get_value()
            for k in range(max(0, int((tt - 2.6) / 0.07)), int(tt / 0.07) + 1):
                t0 = k * 0.07
                if t0 > tt:
                    break
                a = tt - t0
                xs = -5.0 + 0.06 * ((k * 7) % 5 - 2)
                if a < 0.35:
                    y = 1.85 - (1.85 - yb - 0.06) * (a / 0.35) ** 2
                    x = xs
                else:
                    y = yb + 0.06 + 0.04 * ((k * 3) % 3)
                    x = xs + vbelt * (a - 0.35)
                if x > x1:
                    continue
                g.add(Dot(P(x, y), radius=0.05, color=ACCENT))
            return g

        sd = always_redraw(sand)
        varrow = arrow(P(-3.2, yb - 0.9), P(-1.7, yb - 0.9), INK)
        vlab = M(r"v = 3\ \text{m/s}", 30).next_to(varrow, DOWN, buff=0.1)
        rate = M(r"\tfrac{dm}{dt} = 2\ \text{kg/s}", 30).next_to(hop, RIGHT, buff=0.2)
        f1 = M(r"F = v\,\frac{dm}{dt} = 3 \times 2 = 6\ \text{N}", 40)
        f2 = M(r"P = Fv = 18\ \text{W}", 40)
        f3 = M(r"\Delta K\ \text{per second} = \tfrac12(2)(3)^2 = 9\ \text{W}", 36, color=B_C)
        f4 = T("the other 9 W becomes heat", 26, color=WARN)
        col = VGroup(f1, f2, f3, f4).arrange(DOWN, buff=0.35, aligned_edge=LEFT).move_to(P(3.7, 0.4))
        fit(col, 6.4)
        with self.voiceover("When mass flows in or out, use the momentum form. Sand falls onto a belt moving at "
                            "three metres per second, two kilograms every second. Each second, two kilograms must be "
                            "brought up to three metres per second, so the belt needs a force of six newtons.") as vo:
            self.play(FadeIn(belt), FadeIn(rollers), FadeIn(hop), FadeIn(varrow), FadeIn(vlab), FadeIn(rate),
                      run_time=1.0)
            self.add(sd)
            self.play(t.animate.set_value(vo.duration * 0.5), run_time=vo.duration * 0.5, rate_func=linear)
            self.play(Write(f1), t.animate.set_value(vo.duration * 0.5 + 1.6), run_time=1.6, rate_func=linear)
        with self.voiceover("The motor supplies eighteen watts, but the sand only gains nine joules of kinetic "
                            "energy each second. The other half becomes heat, as the sand skids up to speed.") as vo:
            t0 = t.get_value()
            self.play(Write(f2), t.animate.set_value(t0 + 1.2), run_time=1.2, rate_func=linear)
            self.play(Write(f3), t.animate.set_value(t0 + 2.6), run_time=1.4, rate_func=linear)
            self.play(FadeIn(f4), t.animate.set_value(t0 + 3.4), run_time=0.8, rate_func=linear)
        sd.clear_updaters()

        # rocket
        def rocket_at(y):
            body = Rectangle(width=0.8, height=2.0, color=INK, stroke_width=3).set_fill(WHITE, 1)
            nose = Polygon(P(-0.4, 1.0), P(0.4, 1.0), P(0, 1.7), color=INK, stroke_width=3).set_fill(A_C, 1)
            fins = VGroup(Polygon(P(-0.4, -1.0), P(-0.75, -1.2), P(-0.4, -0.4), color=INK, stroke_width=3)
                          .set_fill(B_C, 1),
                          Polygon(P(0.4, -1.0), P(0.75, -1.2), P(0.4, -0.4), color=INK, stroke_width=3)
                          .set_fill(B_C, 1))
            return VGroup(body, nose, fins).move_to(P(-3.6, y), aligned_edge=ORIGIN).shift(0 * UP)

        ry = ValueTracker(-1.2)
        rk = always_redraw(lambda: rocket_at(ry.get_value()))
        tt = ValueTracker(0.0)

        def exhaust():
            g = VGroup()
            for k in range(14):
                ph = (tt.get_value() * 3 + k / 14) % 1
                y = ry.get_value() - 1.3 - 2.0 * ph
                x = -3.6 + 0.25 * np.sin(k * 2.3) * ph
                g.add(Dot(P(x, y), radius=0.07 * (1 - 0.6 * ph), color=ACCENT).set_opacity(1 - ph))
            return g

        ex = always_redraw(exhaust)
        thr = always_redraw(lambda: arrow(P(-2.6, ry.get_value() - 0.6), P(-2.6, ry.get_value() + 1.1), A_C))
        thl = always_redraw(lambda: T("thrust", 22, color=A_C).next_to(P(-2.6, ry.get_value() + 0.25), RIGHT,
                                                                         buff=0.15))
        g1 = M(r"F_{\text{thrust}} = u\left|\frac{dm}{dt}\right|", 44).move_to(P(3.2, 2.4))
        with self.voiceover("A rocket throws its exhaust backwards at speed u, and the exhaust pushes the rocket "
                            "forwards. The thrust is u times the rate of burning fuel. It pushes on its own "
                            "exhaust, not on the air, so it works best in space.") as vo:
            self.clear_scene(0.5)
            self.add(ex, rk)
            self.play(tt.animate.set_value(1.0), run_time=1.0, rate_func=linear)
            self.play(FadeIn(thr), FadeIn(thl), Write(g1), tt.animate.set_value(2.5), run_time=1.5, rate_func=linear)
            na = T("not the air", 26, color=WARN).move_to(P(3.2, 1.3))
            self.play(ry.animate.set_value(0.0), tt.animate.set_value(2.5 + vo.duration - 2.5), FadeIn(na),
                      run_time=max(1.0, vo.duration - 2.5), rate_func=linear)
        g2 = M(r"v = u\ln\frac{m_0}{m} - gt", 44).move_to(P(3.2, 0.2))
        g3 = M(r"u\left|\tfrac{dm}{dt}\right| = m(g + a) = 5000 \times 20", 36).move_to(P(3.2, -1.2))
        g4 = M(r"\left|\tfrac{dm}{dt}\right| = \frac{10^5}{2000} = 50\ \text{kg/s}", 40, color=GREEN).move_to(P(3.2, -2.4))
        for g in (g2, g3, g4):
            fit(g, 6.6)
        with self.voiceover("Integrate, and the speed grows as u times the log of the mass ratio. To lift a five "
                            "thousand kilogram rocket at ten metres per second squared, with an exhaust speed of two "
                            "kilometres per second, it must burn fifty kilograms of fuel every second.") as vo:
            s0 = tt.get_value()
            self.play(Write(g2), FadeOut(na), tt.animate.set_value(s0 + 1.4), ry.animate.set_value(0.6),
                      run_time=1.4, rate_func=linear)
            self.play(Write(g3), tt.animate.set_value(s0 + 3.0), ry.animate.set_value(1.0), run_time=1.6,
                      rate_func=linear)
            self.play(Write(g4), tt.animate.set_value(s0 + 4.4), ry.animate.set_value(1.3), run_time=1.4,
                      rate_func=linear)
        for m in (rk, ex, thr, thl):
            m.clear_updaters()

    # ------------------------------------------------------------ scene 4: 1D collisions
    def collide(self, y, m1, m2, u1, u2, v1, v2, x1, x2, w1, w2, s=0.45, labels=True):
        gap = (x2 - w2 / 2) - (x1 + w1 / 2)
        tc = gap / (s * (u1 - u2))
        p1 = path_1d(x1, s * u1, s * v1, tc)
        p2 = path_1d(x2, s * u2, s * v2, tc)
        t = ValueTracker(0.0)
        l1 = f"{m1:g} kg" if labels else None
        l2 = f"{m2:g} kg" if labels else None
        c1 = always_redraw(lambda: cart(p1(t.get_value()), y, w1, A_C, l1))
        c2 = always_redraw(lambda: cart(p2(t.get_value()), y, w2, B_C, l2))
        return t, c1, c2, tc

    def s4(self):
        y = -0.4
        track = Line(P(-7.0, y), P(7.0, y), color=MUTED, stroke_width=3)
        t, c1, c2, tc = self.collide(y, 2, 1, 4, 0, 4 / 3, 16 / 3, -5.6, -0.8, 1.4, 1.0)
        b1 = M(r"u_1 = 4", 34, color=A_C).move_to(P(-5.6, 1.0))
        b2 = M(r"u_2 = 0", 34, color=B_C).move_to(P(-0.8, 1.0))
        a1 = M(r"v_1 = \tfrac43", 34, color=A_C).move_to(P(1.2, 1.0))
        a2 = M(r"v_2 = \tfrac{16}{3}", 34, color=B_C).move_to(P(4.6, 1.0))
        hdr = T("Momentum always. Kinetic energy only if elastic.", 30, color=PRIMARY, weight="BOLD")
        hdr.move_to(P(0, 3.2))
        rel = M(r"v_2 - v_1 = u_1 - u_2", 50).move_to(P(0, 2.2))
        rel_n = T("the relative velocity reverses", 26, color=MUTED).next_to(rel, DOWN, buff=0.2)
        with self.voiceover("In every collision the forces are internal, so momentum is conserved. If kinetic "
                            "energy is conserved too, the collision is elastic, and the algebra collapses to one "
                            "simple fact: the relative velocity reverses. They separate as fast as they "
                            "approached.") as vo:
            self.play(FadeIn(hdr), Create(track), FadeIn(c1), FadeIn(c2), FadeIn(b1), FadeIn(b2), run_time=1.0)
            self.play(t.animate.set_value(tc + 2.5), run_time=3.0, rate_func=linear)
            self.play(FadeIn(a1), FadeIn(a2), run_time=0.6)
            self.wait(vo.duration * 0.1)
            self.play(Write(rel), FadeIn(rel_n), run_time=1.4)
            chk = M(r"\tfrac{16}{3} - \tfrac43 = 4 = 4 - 0", 36, color=GREEN).move_to(P(0, -1.6))
            self.play(Write(chk), run_time=1.0)
        c1.clear_updaters()
        c2.clear_updaters()

        with self.voiceover("With the target at rest, equal masses simply swap velocities, like Newton's cradle. "
                            "A heavy ball hitting a light one sends it off at nearly twice its speed. A light ball "
                            "hitting a heavy one bounces straight back.") as vo:
            self.clear_scene(0.5)
            rows = [
                (2.0, 1, 1, 3, 0, 0, 3, 1.0, 1.0, "equal masses: swap"),
                (-0.4, 10, 1, 3, 0, 27 / 11, 60 / 11, 2.0, 0.7, "heavy on light: about 2u"),
                (-2.8, 1, 10, 3, 0, -27 / 11, 6 / 11, 0.7, 2.0, "light on heavy: bounces back"),
            ]
            trs = []
            mobs = []
            for (yy, m1, m2, u1, u2, v1, v2, w1, w2, cap) in rows:
                ln = Line(P(-6.6, yy), P(5.0, yy), color=MUTED, stroke_width=2)
                tr, k1, k2, tcc = self.collide(yy, m1, m2, u1, u2, v1, v2, -5.4, -1.2, w1, w2, s=0.45,
                                                labels=False)
                lab = T(cap, 24, color=INK).move_to(P(3.2, yy + 1.05))
                self.add(ln, k1, k2)
                mobs += [ln, k1, k2, lab]
                trs.append((tr, tcc))
                self.play(FadeIn(lab), run_time=0.3)
            self.play(*[tr.animate.set_value(tcc + 2.6) for tr, tcc in trs], run_time=max(3.0, vo.duration - 1.8),
                      rate_func=linear)
            for m in mobs:
                m.clear_updaters()

        # perfectly inelastic: KE split
        with self.voiceover("If they stick, they share one velocity: the velocity of the centre of mass. Kinetic "
                            "energy is lost, but not all of it. Only the energy of motion relative to the centre of "
                            "mass can go: one half, times the reduced mass mu, times the relative speed squared. The "
                            "centre of mass keeps its share.") as vo:
            self.clear_scene(0.5)
            y = 1.2
            track = Line(P(-7.0, y), P(7.0, y), color=MUTED, stroke_width=3)
            t, c1, c2, tc = self.collide(y, 2, 1, 4, 0, 8 / 3, 8 / 3, -5.8, -1.6, 1.4, 1.0)
            vl = M(r"v = v_{cm} = \frac{2(4)}{3} = \tfrac83\ \text{m/s}", 36).move_to(P(0, 3.1))
            self.play(Create(track), FadeIn(c1), FadeIn(c2), run_time=0.8)
            self.play(t.animate.set_value(tc + 3.0), run_time=2.6, rate_func=linear)
            self.play(Write(vl), run_time=1.0)
            c1.clear_updaters()
            c2.clear_updaters()
            sc = 0.32
            base = -2.6
            bar_before = Rectangle(width=1.0, height=16 * sc, stroke_width=0).set_fill(A_C, 0.8)
            bar_before.move_to(P(-4.4, base), aligned_edge=DOWN)
            keep = Rectangle(width=1.0, height=10.67 * sc, stroke_width=0).set_fill(COM_C, 0.9)
            keep.move_to(P(-1.6, base), aligned_edge=DOWN)
            lost = Rectangle(width=1.0, height=5.33 * sc, stroke_width=0).set_fill(REL_C, 0.8)
            lost.move_to(keep.get_top(), aligned_edge=DOWN)
            # bars sit under the track region: shift group down so they fit
            bars = VGroup(bar_before, keep, lost)
            bars.shift(0 * DOWN)
            l_b = T("before: 16 J", 22, color=A_C).next_to(bar_before, DOWN, buff=0.1)
            l_k = T("COM share 10.7 J", 22, color=COM_C).next_to(keep, DOWN, buff=0.1)
            l_l = T("relative 5.3 J: lost", 22, color=REL_C).next_to(lost, RIGHT, buff=0.2)
            f = M(r"\Delta K = \tfrac12\,\frac{m_1m_2}{m_1+m_2}\,(u_1-u_2)^2", 40).move_to(P(3.6, -1.2))
            fit(f, 6.0)
            self.play(FadeOut(c1), FadeOut(c2), FadeOut(track), vl.animate.move_to(P(3.6, 0.3)), run_time=0.5)
            self.play(GrowFromEdge(bar_before, DOWN), FadeIn(l_b), run_time=0.6)
            self.play(GrowFromEdge(keep, DOWN), GrowFromEdge(lost, DOWN), FadeIn(l_k), FadeIn(l_l), run_time=0.8)
            self.play(Write(f), run_time=1.2)
            self.play(lost.animate.set_fill(opacity=0.15), run_time=0.6)

    # ------------------------------------------------------------ scene 5: restitution
    def s5(self):
        f = M(r"e = \frac{\text{speed of separation}}{\text{speed of approach}} = \frac{v_2 - v_1}{u_1 - u_2}", 46)
        f.move_to(P(0, 2.4))
        cases = VGroup(M(r"e = 1:\ \text{elastic}", 36, color=GREEN),
                       M(r"0 < e < 1:\ \text{inelastic}", 36),
                       M(r"e = 0:\ \text{they stick}", 36, color=WARN)).arrange(RIGHT, buff=0.8).move_to(P(0, 0.6))
        with self.voiceover("Real collisions sit between the extremes. The coefficient of restitution, e, is the "
                            "speed of separation over the speed of approach, along the line of impact. One means "
                            "elastic; zero means they stick together.") as vo:
            self.play(Write(f), run_time=1.8)
            self.wait(vo.duration * 0.3)
            self.play(LaggedStart(*[FadeIn(c, shift=0.2 * UP) for c in cases], lag_ratio=0.4), run_time=1.6)

        yf = -3.0
        sc = 0.3  # units per metre
        floor = Line(P(-6.8, yf), P(0.6, yf), color=INK, stroke_width=4)
        hs = [10, 2.5, 0.625, 0.156]
        # piecewise path: drop, then arcs of height e^2 h
        pts = []
        x = -6.0
        r = 0.18
        segs = []
        seg = ParametricFunction(lambda s: P(-6.0 + 0.6 * s, yf + r + sc * 10 * (1 - s * s)), t_range=[0, 1],
                                 color=MUTED, stroke_width=2)
        segs.append(seg)
        x = -5.4
        for h in hs[1:]:
            wdt = 2.4 * np.sqrt(h / 2.5)
            x0 = x
            segs.append(ParametricFunction(lambda s, x0=x0, wdt=wdt, h=h: P(x0 + wdt * s, yf + r + sc * h * 4 * s * (1 - s)),
                                           t_range=[0, 1], color=MUTED, stroke_width=2))
            x += wdt
        path = VMobject()
        for sg in segs:
            path.append_vectorized_mobject(sg)
        ball = Circle(radius=r, color=A_C, stroke_width=3).set_fill(A_C, 0.9).move_to(segs[0].get_start())
        trail = DashedVMobject(path.copy().set_stroke(MUTED, 2), num_dashes=60)
        hl = VGroup()
        for i, h in enumerate(hs[:3]):
            xpk = -6.0 if i == 0 else None
        bars = VGroup()
        bl = VGroup()
        for i, h in enumerate(hs):
            b = Rectangle(width=0.7, height=max(0.03, sc * h), stroke_width=0).set_fill(B_C, 0.85)
            b.move_to(P(2.2 + 1.2 * i, yf), aligned_edge=DOWN)
            bars.add(b)
            lab = M(f"{h:g}" if i < 3 else r"0.16", 28).next_to(b, UP, buff=0.1)
            bl.add(lab)
        nlab = VGroup(*[M(f"n={i}", 26, color=MUTED).next_to(bars[i], DOWN, buff=0.12) for i in range(4)])
        hn = M(r"h_n = e^{2n}h", 44, color=B_C).move_to(P(4.0, 1.3))
        with self.voiceover("A ball dropped on the floor rebounds at e times its impact speed, so it rises to e "
                            "squared times the height. Dropped from ten metres with e equal to one half, it climbs "
                            "back to two and a half metres, then sixty two and a half centimetres: each bounce a quarter of "
                            "the last.") as vo:
            self.play(FadeOut(cases), f.animate.scale(0.75).move_to(P(0, 3.2)), run_time=0.5)
            self.play(Create(floor), FadeIn(ball), run_time=0.6)
            self.add(trail)
            self.play(MoveAlongPath(ball, path), Create(trail), run_time=max(2.5, vo.duration * 0.55),
                      rate_func=linear)
            self.play(LaggedStart(*[GrowFromEdge(b, DOWN) for b in bars], lag_ratio=0.3), FadeIn(bl), FadeIn(nlab),
                      run_time=1.4)
            self.play(Write(hn), run_time=0.9)
        with self.voiceover("And e belongs to the pair of surfaces, not to one ball. A tennis ball has one value "
                            "on concrete, and another on grass.") as vo:
            pr = T("e belongs to the pair of surfaces", 28, color=PRIMARY).move_to(P(3.4, 2.2))
            fit(pr, 6.2)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(pr), run_time=0.8)

    # ------------------------------------------------------------ scene 6: oblique collisions
    def s6(self):
        r = 0.32
        B = P(-2.0, -0.6)
        n = np.array([np.cos(-60 * DEGREES), np.sin(-60 * DEGREES), 0])  # line of centres (A to B)
        Ac = B - 2 * r * n
        s = 0.34
        tc = 1.0
        t = ValueTracker(0.0)
        dA = np.array([np.cos(30 * DEGREES), np.sin(30 * DEGREES), 0])

        def posA():
            tt = t.get_value()
            if tt < tc:
                return Ac + (tt - tc) * 10 * s * RIGHT
            return Ac + (tt - tc) * 8.66 * s * dA

        def posB():
            tt = t.get_value()
            if tt < tc:
                return B
            return B + (tt - tc) * 5 * s * n

        bA = always_redraw(lambda: Circle(radius=r, color=A_C, stroke_width=3).set_fill(A_C, 0.85).move_to(posA()))
        bB = always_redraw(lambda: Circle(radius=r, color=B_C, stroke_width=3).set_fill(B_C, 0.85).move_to(posB()))
        trA = TracedPath(posA, stroke_color=A_C, stroke_width=2.5)
        trB = TracedPath(posB, stroke_color=B_C, stroke_width=2.5)
        e1 = M(r"\vec u = \vec v_1 + \vec v_2", 42)
        e2 = M(r"u^2 = v_1^2 + v_2^2", 42)
        e3 = M(r"\Rightarrow\ \vec v_1\cdot\vec v_2 = 0", 42, color=GREEN)
        col = VGroup(e1, e2, e3).arrange(DOWN, buff=0.35, aligned_edge=LEFT).move_to(P(4.3, 1.6))
        with self.voiceover("In two dimensions, conserve momentum in each direction separately. For equal masses, "
                            "one at rest, in an elastic collision, momentum says u equals v one plus v two, and "
                            "energy says u squared equals v one squared plus v two squared. So the two balls leave "
                            "at ninety degrees.") as vo:
            self.add(trA, trB, bA, bB)
            self.play(t.animate.set_value(tc + 1.3), run_time=3.0, rate_func=linear)
            self.play(Write(e1), run_time=1.0)
            self.play(Write(e2), run_time=1.0)
            self.wait(vo.duration * 0.05)
            self.play(Write(e3), run_time=0.9)
            ray = DashedLine(Ac, Ac + 1.2 * n, color=B_C, stroke_width=2)
            ra = RightAngle(Line(Ac, Ac + dA), Line(Ac, Ac + n), length=0.3, color=INK, stroke_width=3)
            ninety = M(r"90^\circ", 36, color=GREEN).move_to(Ac + 0.85 * (dA + n) / np.linalg.norm(dA + n))
            self.play(Create(ray), Create(ra), FadeIn(ninety), run_time=0.7)
        for m in (bA, bB, trA, trB):
            m.clear_updaters()

        with self.voiceover("A ball at ten metres per second, deflected thirty degrees, keeps ten cos thirty, about "
                            "eight point seven, and the other ball takes ten sin thirty: five metres per "
                            "second.") as vo:
            self.play(FadeOut(VGroup(e1, e2, e3)), run_time=0.4)
            O = P(0.8, -2.6)
            L = 4.0
            u = arrow(O, O + L * RIGHT, INK)
            v1e = O + L * np.cos(30 * DEGREES) * dA
            v1 = arrow(O, v1e, A_C)
            v2 = arrow(v1e, O + L * RIGHT, B_C)
            ul = M(r"u = 10", 32).next_to(u, DOWN, buff=0.15)
            l1 = M(r"10\cos30^\circ \approx 8.66", 30, color=A_C).next_to(v1.get_center(), UL, buff=0.1)
            l2 = M(r"10\sin30^\circ = 5", 30, color=B_C).next_to(v2.get_center(), RIGHT, buff=0.15)
            ra2 = RightAngle(Line(v1e, O), Line(v1e, O + L * RIGHT), length=0.25, color=INK, stroke_width=3)
            self.play(GrowArrow(u), FadeIn(ul), run_time=0.7)
            self.play(GrowArrow(v1), FadeIn(l1), run_time=0.9)
            self.play(GrowArrow(v2), FadeIn(l2), Create(ra2), run_time=0.9)

        with self.voiceover("For smooth spheres, the contact force acts only along the line of centres. So the "
                            "tangential parts pass through unchanged, and e acts only along the normal. A ball "
                            "hitting a smooth floor at forty five degrees, with e of one half, leaves flatter: at "
                            "sixty three degrees from the vertical.") as vo:
            self.clear_scene(0.5)
            yf = -2.0
            floor = Line(P(-6.0, yf), P(1.0, yf), color=INK, stroke_width=4)
            hatch = VGroup(*[Line(P(x, yf), P(x - 0.25, yf - 0.25), color=MUTED, stroke_width=2)
                             for x in np.arange(-5.8, 1.0, 0.35)])
            Pt = P(-2.5, yf)
            L = 3.2
            inc = arrow(Pt + L * np.array([-np.sin(45 * DEGREES), np.cos(45 * DEGREES), 0]), Pt, A_C)
            th2 = np.arctan(2.0)
            Lout = L * np.sqrt(62.5) / 10
            out = arrow(Pt, Pt + Lout * np.array([np.sin(th2), np.cos(th2), 0]), B_C)
            normal = DashedLine(Pt, Pt + 3.2 * UP, color=MUTED, stroke_width=2)
            a1 = Arc(radius=0.9, start_angle=PI / 2, angle=PI / 4, arc_center=Pt, color=A_C, stroke_width=3)
            a2 = Arc(radius=0.9, start_angle=PI / 2 - th2, angle=th2, arc_center=Pt, color=B_C, stroke_width=3)
            l45 = M(r"45^\circ", 30, color=A_C).move_to(Pt + 1.3 * np.array([np.cos(112 * DEGREES), np.sin(112 * DEGREES), 0]))
            l63 = M(r"63.4^\circ", 30, color=B_C).move_to(Pt + 1.4 * np.array([np.cos(58 * DEGREES), np.sin(58 * DEGREES), 0]))
            self.play(Create(floor), FadeIn(hatch), Create(normal), run_time=0.8)
            self.play(GrowArrow(inc), Create(a1), FadeIn(l45), run_time=1.0)
            k1 = M(r"\text{along the floor: } 5\sqrt2\ \text{(unchanged)}", 34)
            k2 = M(r"\text{normal: } 5\sqrt2 \to e \cdot 5\sqrt2 = 2.5\sqrt2", 34)
            k3 = M(r"\tan\theta' = \frac{\tan 45^\circ}{e} = 2\ \Rightarrow\ \theta' \approx 63.4^\circ", 34, color=GREEN)
            col = VGroup(k1, k2, k3).arrange(DOWN, buff=0.35, aligned_edge=LEFT).move_to(P(4.0, 1.3))
            fit(col, 6.0)
            hdr = T("e acts only along the line of impact", 30, color=PRIMARY, weight="BOLD").move_to(P(0, 3.3))
            self.play(FadeIn(hdr), run_time=0.6)
            self.play(Write(k1), run_time=1.0)
            self.play(Write(k2), run_time=1.0)
            self.wait(vo.duration * 0.05)
            self.play(GrowArrow(out), Create(a2), FadeIn(l63), Write(k3), run_time=1.4)

    # ------------------------------------------------------------ scene 7: the toolkit
    def s7(self):
        rule = T("momentum across the collision, energy before and after it", 30, color=PRIMARY, weight="BOLD")
        fit(rule, 13).move_to(P(0, 3.3))
        never = T("never energy across it", 28, color=WARN).next_to(rule, DOWN, buff=0.2)
        with self.voiceover("Hard problems are often two problems glued together. The rule: momentum across the "
                            "collision, energy before and after it, never energy across it.") as vo:
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(rule), run_time=1.0)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(never), run_time=0.7)

        piv = P(-3.0, 2.2)
        Ls = 3.4
        th = ValueTracker(0.0)

        def bob_c():
            a = th.get_value()
            return piv + Ls * np.array([np.sin(a), -np.cos(a), 0])

        def pend():
            c = bob_c()
            a = th.get_value()
            u = np.array([np.cos(a), np.sin(a), 0])
            s1 = Line(piv + 0.4 * LEFT, c + 0.4 * LEFT + 0.25 * UP, color=INK, stroke_width=2)
            s2 = Line(piv + 0.4 * RIGHT, c + 0.4 * RIGHT + 0.25 * UP, color=INK, stroke_width=2)
            blk = Square(side_length=0.8, color=INK, stroke_width=3).set_fill(B_C, 0.85).move_to(c).rotate(a)
            return VGroup(s1, s2, blk)

        ceil = Line(piv + 1.4 * LEFT, piv + 1.4 * RIGHT, color=INK, stroke_width=4)
        hat = VGroup(*[Line(P(x, piv[1]), P(x + 0.2, piv[1] + 0.2), color=MUTED, stroke_width=2)
                       for x in np.arange(piv[0] - 1.3, piv[0] + 1.4, 0.3)])
        pd = always_redraw(pend)
        bullet = Dot(P(-6.6, bob_c()[1]), radius=0.08, color=A_C)
        y0 = bob_c()[1]
        st1 = T("stage 1: collision (momentum)", 24, color=A_C).move_to(P(-3.0, -2.4))
        st2 = T("stage 2: swing (energy)", 24, color=B_C).move_to(P(-3.0, -2.95))
        e1 = M(r"V = \sqrt{2gh} = \sqrt{2(10)(0.05)} = 1\ \text{m/s}", 36, color=B_C)
        e2 = M(r"0.01\,v = 2.01\,V \ \Rightarrow\ v = 201\ \text{m/s}", 36, color=A_C)
        col = VGroup(e1, e2).arrange(DOWN, buff=0.45, aligned_edge=LEFT).move_to(P(3.6, 0.9))
        fit(col, 6.4)
        with self.voiceover("A ten gram bullet lodges in a two kilogram block, which swings up five centimetres. "
                            "The swing conserves energy, so V is root two g h: one metre per second. The collision "
                            "conserves momentum, so the bullet was moving at two hundred and one metres per "
                            "second.") as vo:
            self.play(FadeOut(never), rule.animate.scale(0.8).move_to(P(0, 3.45)), run_time=0.4)
            self.play(FadeIn(ceil), FadeIn(hat), FadeIn(pd), FadeIn(bullet), run_time=0.7)
            self.play(bullet.animate.move_to(bob_c() + 0.35 * LEFT), run_time=0.6, rate_func=linear)
            self.remove(bullet)
            self.play(FadeIn(st1), th.animate.set_value(32 * DEGREES), run_time=1.4, rate_func=rush_from)
            hline = DashedLine(P(-4.3, y0), P(-0.4, y0), color=MUTED, stroke_width=2)
            hline2 = DashedLine(P(-4.3, bob_c()[1]), P(-0.4, bob_c()[1]), color=MUTED, stroke_width=2)
            br = BraceBetweenPoints(P(-4.3, bob_c()[1]), P(-4.3, y0), LEFT, color=INK)
            hl = M(r"h = 5\ \text{cm}", 30).next_to(br, LEFT, buff=0.1)
            self.play(Create(hline), Create(hline2), GrowFromCenter(br), FadeIn(hl), FadeIn(st2), run_time=0.8)
            self.wait(vo.duration * 0.05)
            self.play(Write(e1), run_time=1.4)
            self.play(Write(e2), run_time=1.4)
        pd.clear_updaters()
        with self.voiceover("Use energy through the whole thing and you get about fourteen metres per second, badly "
                            "wrong. The impact destroyed more than ninety nine percent of the bullet's kinetic "
                            "energy.") as vo:
            w = M(r"\tfrac12 m v^2 = (m+M)gh \ \Rightarrow\ v \approx 14\ \text{m/s}", 34, color=WARN)
            w.next_to(col, DOWN, buff=0.6).align_to(col, LEFT)
            fit(w, 5.6)
            xm = cross_mark().scale(0.8).next_to(w, RIGHT, buff=0.2)
            self.play(Write(w), run_time=1.3)
            self.play(FadeIn(xm), run_time=0.4)
            k = M(r"202\ \text{J} \to 1\ \text{J}", 36, color=REL_C).next_to(w, DOWN, buff=0.45).align_to(w, LEFT)
            self.wait(vo.duration * 0.1)
            self.play(Write(k), run_time=1.0)

    # ------------------------------------------------------------ scene 8: recap
    def s8(self):
        title = T("Chapter 1 in six lines", 38, color=PRIMARY, weight="BOLD").move_to(P(0, 3.3))
        lines = [
            (r"\frac{d\vec P}{dt} = \vec F_{\text{ext}}", "no external force: P is conserved"),
            (r"\vec J = \int\vec F\,dt = \Delta\vec p", "same impulse, longer time, smaller force"),
            (r"F = u\left|\tfrac{dm}{dt}\right|", "rockets push on their own exhaust"),
            (r"v_2 - v_1 = e\,(u_1 - u_2)", "e = 1 elastic, e = 0 they stick"),
            (r"\Delta K = \tfrac12\mu(1-e^2)u_{\text{rel}}^2", "only relative KE can be lost"),
            (r"p \text{ across},\ E \text{ before/after}", "split multi-stage problems"),
        ]
        rows = VGroup()
        for i, (tex, note) in enumerate(lines):
            m = M(tex, 34)
            nn = T(note, 24, color=MUTED)
            num = T(f"{i + 1}.", 28, color=PRIMARY, weight="BOLD")
            rows.add(VGroup(num, m, nn))
        rows.arrange(DOWN, buff=0.3, aligned_edge=LEFT).move_to(P(0, -0.2))
        for r in rows:
            r[0].set_x(-6.2)
            r[1].next_to(r[0], RIGHT, buff=0.3)
            fit(r[2], 5.9).move_to(P(0, r[1].get_y())).align_to(P(0.5, 0), LEFT)
        with self.voiceover("To recap. Force is the rate of change of momentum, so with no external force the total "
                            "momentum is constant. Impulse is the area under force against time, and it equals the "
                            "change of momentum.") as vo:
            self.play(FadeIn(title), run_time=0.6)
            self.play(FadeIn(rows[0], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.3)
            self.play(FadeIn(rows[1], shift=0.15 * UP), run_time=0.7)
        with self.voiceover("Mass flowing in or out needs the momentum form. In a collision, e sets how fast the "
                            "bodies separate, and only the kinetic energy of relative motion can be lost.") as vo:
            self.play(FadeIn(rows[2], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.15)
            self.play(FadeIn(rows[3], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.15)
            self.play(FadeIn(rows[4], shift=0.15 * UP), run_time=0.7)
        with self.voiceover("And in multi stage problems: momentum across the collision, energy before and after it. "
                            "Try the mastery quiz. Then chapter two lets bodies spin.") as vo:
            self.play(FadeIn(rows[5], shift=0.15 * UP), run_time=0.7)
            nxt = T("Next: Chapter 2 · Rotational Kinematics and Moment of Inertia", 28, color=PRIMARY)
            fit(nxt, 13).move_to(P(0, -3.5))
            self.wait(vo.duration * 0.3)
            self.play(FadeIn(nxt, shift=0.2 * UP), run_time=0.8)
