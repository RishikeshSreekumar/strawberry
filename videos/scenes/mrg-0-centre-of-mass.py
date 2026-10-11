import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

# Chapter colour roles (light background).
M1_C = PRIMARY  # first / heavier mass = strawberry red
M2_C = SECONDARY  # second mass = teal
COM_C = ACCENT  # centre of mass marker and its path = amber
HOLE_C = PURPLE  # removed mass / negative mass
HL = ManimColor("#D19A00")  # highlight gold
WARN = PRIMARY
WATER = ManimColor("#CFE6EA")
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
    """The usual centre-of-mass symbol: a circle with two filled quadrants."""
    ring = Circle(radius=r, color=INK, stroke_width=2.5).set_fill(WHITE, 1)
    q1 = Sector(radius=r, angle=PI / 2, start_angle=0, color=COM_C, fill_opacity=1, stroke_width=0)
    q3 = Sector(radius=r, angle=PI / 2, start_angle=PI, color=COM_C, fill_opacity=1, stroke_width=0)
    return VGroup(ring, q1, q3).move_to(pt)


def mass_ball(pt, m, color, label=None, scale=0.22):
    r = scale * np.sqrt(m) + 0.08
    c = Circle(radius=r, color=color, stroke_width=3).set_fill(color, 0.85).move_to(pt)
    if label is None:
        return c
    t = T(label, 22, color=WHITE if r > 0.3 else INK, weight="BOLD")
    if r <= 0.3:
        t.next_to(c, UP, buff=0.1)
    else:
        t.move_to(c)
    return VGroup(c, t)


class MrgCh0Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Momentum, Rotation & Gravitation",
            "Chapter 0 · Centre of Mass",
            "Chapter zero. The centre of mass.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7, self.s8):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ scene 1: the tumbling spanner
    def spanner(self, com, ang):
        u = np.array([np.cos(ang), np.sin(ang), 0])
        jaw_c = com + 0.55 * u
        tail = com - 1.5 * u
        rod = Line(tail, jaw_c, color=INK, stroke_width=9)
        jaw = Circle(radius=0.32, color=INK, stroke_width=3).set_fill(BODY, 1).move_to(jaw_c)
        notch = Line(jaw_c, jaw_c + 0.32 * u, color=BG, stroke_width=8)
        knob = Dot(tail, radius=0.09, color=INK)
        return VGroup(rod, jaw, notch, knob, com_dot(com, 0.11))

    def s1(self):
        ice = RoundedRectangle(width=13.8, height=4.2, corner_radius=0.3, color=GRID, stroke_width=3)
        ice.set_fill(ManimColor("#EEF6F8"), 1).move_to(P(0, 0.9))
        ice_l = T("smooth ice, seen from above", 24, color=MUTED).next_to(ice, UP, buff=0.12)
        t = ValueTracker(0.0)
        start, end = P(-4.9, 0.9), P(4.9, 0.9)

        def com1():
            return start + t.get_value() * (end - start)

        def tail1():
            a = 2.6 * TAU * t.get_value() + 0.4
            return com1() - 1.5 * np.array([np.cos(a), np.sin(a), 0])

        sp = always_redraw(lambda: self.spanner(com1(), 2.6 * TAU * t.get_value() + 0.4))
        tail_path = TracedPath(tail1, stroke_color=MUTED, stroke_width=2.5)
        com_path = TracedPath(com1, stroke_color=COM_C, stroke_width=5)

        with self.voiceover("Slide a spanner across smooth ice with a flick of the wrist. It spins and wobbles, "
                            "and the two ends chase each other round and round.") as vo:
            self.play(FadeIn(ice), FadeIn(ice_l), run_time=0.8)
            com_path.set_stroke(opacity=0)
            self.add(tail_path, com_path, sp)
            self.play(t.animate.set_value(0.55), run_time=max(1.0, vo.duration - 1.2), rate_func=linear)
        with self.voiceover("Yet one point on it, between the middle and the heavy jaw, glides in a perfectly "
                            "straight line at a steady speed.") as vo:
            com_path.set_stroke(opacity=1)
            self.play(t.animate.set_value(1.0), run_time=max(1.0, vo.duration - 0.6), rate_func=linear)
            lab = T("one point moves simply", 26, color=COM_C).move_to(P(0, -1.6))
            self.play(FadeIn(lab), run_time=0.5)
        sp.clear_updaters()
        tail_path.clear_updaters()
        com_path.clear_updaters()

        # in the air: the same point traces a parabola
        ground = Line(P(-6.8, -3.4), P(6.8, -3.4), color=MUTED, stroke_width=3)
        s = ValueTracker(0.0)

        def com2():
            v = s.get_value()
            return P(-5.4 + 10.8 * v, -1.7 + 3.4 * 4 * v * (1 - v))

        def tail2():
            a = 1.8 * TAU * s.get_value() + 1.2
            return com2() - 1.5 * np.array([np.cos(a), np.sin(a), 0])

        sp2 = always_redraw(lambda: self.spanner(com2(), 1.8 * TAU * s.get_value() + 1.2).scale(0.8, about_point=com2()))
        tail2_path = TracedPath(lambda: com2() + 0.8 * (tail2() - com2()), stroke_color=MUTED, stroke_width=2.5)
        com2_path = TracedPath(com2, stroke_color=COM_C, stroke_width=5)
        with self.voiceover("Throw it through the air, and that same point traces a clean parabola, exactly like "
                            "a small stone would.") as vo:
            self.play(*[FadeOut(m) for m in (ice, ice_l, sp, tail_path, com_path, lab)], run_time=0.5)
            self.play(Create(ground), run_time=0.5)
            self.add(tail2_path, com2_path, sp2)
            self.play(s.animate.set_value(1.0), run_time=max(1.0, vo.duration - 1.2), rate_func=linear)
        sp2.clear_updaters()
        tail2_path.clear_updaters()
        com2_path.clear_updaters()
        with self.voiceover("That point is the centre of mass. Once you know how it moves, a tumbling body "
                            "becomes one particle, plus a spin about that particle. The whole of this course "
                            "rests on it.") as vo:
            name = T("the centre of mass", 40, color=COM_C, weight="BOLD").move_to(P(0, -2.0))
            sub = T("one particle  +  a spin about it", 30, color=INK).next_to(name, DOWN, buff=0.3)
            self.play(FadeIn(name, shift=0.2 * UP), run_time=0.8)
            self.wait(vo.duration * 0.3)
            self.play(FadeIn(sub), run_time=0.8)

    # ------------------------------------------------------------ scene 2: two masses on a rod
    def s2(self):
        y0 = 0.6
        x1, x2 = -4.0, 4.0
        m1 = ValueTracker(1.0)
        m2 = ValueTracker(1.0)

        def xc():
            return (m1.get_value() * x1 + m2.get_value() * x2) / (m1.get_value() + m2.get_value())

        rod = Line(P(x1, y0), P(x2, y0), color=INK, stroke_width=5)
        b1 = always_redraw(lambda: mass_ball(P(x1, y0), m1.get_value(), M1_C))
        b2 = always_redraw(lambda: mass_ball(P(x2, y0), m2.get_value(), M2_C))
        l1 = M("m_1", 38, color=M1_C).move_to(P(x1, y0 + 1.05))
        l2 = M("m_2", 38, color=M2_C).move_to(P(x2, y0 + 1.05))
        piv = always_redraw(lambda: Triangle(color=INK, stroke_width=3).set_fill(BODY, 1)
                            .scale(0.28).move_to(P(xc(), y0 - 0.3)))
        mk = always_redraw(lambda: com_dot(P(xc(), y0)))
        br1 = always_redraw(lambda: BraceBetweenPoints(P(x1, y0 - 0.55), P(xc(), y0 - 0.55), DOWN, color=M1_C))
        br2 = always_redraw(lambda: BraceBetweenPoints(P(xc(), y0 - 0.55), P(x2, y0 - 0.55), DOWN, color=M2_C))
        r1 = always_redraw(lambda: M("r_1", 34, color=M1_C).next_to(br1, DOWN, buff=0.1))
        r2 = always_redraw(lambda: M("r_2", 34, color=M2_C).next_to(br2, DOWN, buff=0.1))

        bal = M(r"m_1 g\,(x_c - x_1) = m_2 g\,(x_2 - x_c)", 44).move_to(P(0, 3.1))
        with self.voiceover("Start with two masses on a light rod. Where must you hold it so it balances? The "
                            "turning effect of each weight about the support must cancel: m one g times its "
                            "distance equals m two g times its distance.") as vo:
            self.play(Create(rod), FadeIn(b1), FadeIn(b2), FadeIn(l1), FadeIn(l2), run_time=1.0)
            self.play(FadeIn(piv), FadeIn(mk), run_time=0.6)
            self.play(FadeIn(br1), FadeIn(br2), FadeIn(r1), FadeIn(r2), run_time=0.6)
            self.wait(vo.duration * 0.3)
            self.play(Write(bal), run_time=1.6)
        xf = M(r"x_{cm} = \frac{m_1x_1 + m_2x_2}{m_1 + m_2}", 56).move_to(P(0, -2.6))
        box = SurroundingRectangle(xf, buff=0.25, corner_radius=0.15, color=PRIMARY, stroke_width=3)
        wa = T("a weighted average of positions", 26, color=MUTED).next_to(box, RIGHT, buff=0.3)
        fit(VGroup(box, wa), 13.4)
        with self.voiceover("Cancel g and solve. The balance point is a weighted average: each position, weighted "
                            "by its mass. Equal masses give the midpoint.") as vo:
            self.play(Write(xf), run_time=1.6)
            self.play(Create(box), run_time=0.5)
            g = VGroup(xf, box)
            self.play(g.animate.shift(2.0 * LEFT), run_time=0.5)
            wa.next_to(box, RIGHT, buff=0.3)
            self.play(FadeIn(wa), run_time=0.5)
        inv = M(r"\frac{r_1}{r_2} = \frac{m_2}{m_1}", 48, color=INK).move_to(P(-1.2, 2.9))
        with self.voiceover("Make one mass heavier and the balance point slides towards it. The distances are in "
                            "the inverse ratio of the masses, so the centre of mass always sits nearer the heavier "
                            "mass, never the lighter one.") as vo:
            self.play(FadeOut(bal), run_time=0.4)
            self.play(m2.animate.set_value(3.0), run_time=2.5)
            self.play(Write(inv), run_time=1.0)
            near = T("nearer the heavier mass", 28, color=COM_C).next_to(inv, RIGHT, buff=0.5)
            self.play(FadeIn(near), run_time=0.6)
        for m in (b1, b2, piv, mk, br1, br2, r1, r2):
            m.clear_updaters()

        with self.voiceover("The Earth is eighty one times as heavy as the Moon. Their centre of mass sits about "
                            "four thousand seven hundred kilometres from the Earth's centre. The Earth's radius is "
                            "six thousand four hundred, so the balance point is inside the Earth itself.") as vo:
            self.clear_scene(0.5)
            E = P(-3.8, -0.2)
            earth = Circle(radius=2.0, color=M2_C, stroke_width=3).set_fill(M2_C, 0.25).move_to(E)
            moon = Circle(radius=0.45, color=MUTED, stroke_width=3).set_fill(GRID, 1).move_to(P(5.4, -0.2))
            el = T("Earth", 26, color=M2_C).next_to(earth, DOWN, buff=0.15)
            ml = T("Moon", 26, color=MUTED).next_to(moon, DOWN, buff=0.15)
            link = DashedLine(E, moon.get_center(), color=MUTED, stroke_width=2)
            nts = T("not to scale", 20, color=MUTED).move_to(P(1.5, -0.6))
            self.play(FadeIn(earth), FadeIn(moon), FadeIn(el), FadeIn(ml), Create(link), FadeIn(nts), run_time=1.0)
            w = M(r"x_{cm} = \frac{M_m\,d}{81M_m + M_m} = \frac{3.84\times10^5\ \text{km}}{82} \approx 4700\ \text{km}",
                  40).move_to(P(0, 3.0))
            fit(w, 13.2)
            self.play(Write(w), run_time=1.8)
            cp = E + (4700 / 6400) * 2.0 * RIGHT
            mk2 = com_dot(cp, 0.14)
            rr = DashedLine(E, E + 2.0 * LEFT, color=INK, stroke_width=2)
            rl = M(r"R_E = 6400\ \text{km}", 28, color=INK).next_to(rr, UP, buff=0.1)
            self.play(FadeIn(mk2, scale=2), run_time=0.6)
            self.play(Create(rr), FadeIn(rl), run_time=0.6)
            ins = T("inside the Earth", 28, color=COM_C, weight="BOLD").move_to(P(-3.8, 2.1))
            self.play(FadeIn(ins), Indicate(mk2, color=HL), run_time=0.9)

    # ------------------------------------------------------------ scene 3: many particles
    def s3(self):
        f = M(r"\vec r_{cm} = \frac{\sum m_i\,\vec r_i}{M}", 56).move_to(P(0, 2.9))
        comp = M(r"x_{cm} = \frac{\sum m_i x_i}{M},\quad y_{cm} = \frac{\sum m_i y_i}{M}", 42).move_to(P(0, 1.5))
        with self.voiceover("Real bodies have many particles, in the plane or in space. The rule is the same "
                            "weighted average, now of position vectors, and you compute it one coordinate at a "
                            "time.") as vo:
            self.play(Write(f), run_time=1.4)
            self.wait(vo.duration * 0.25)
            self.play(Write(comp), run_time=1.4)

        O = P(-5.6, -2.6)
        s = 3.4
        corners = [(0, 0, 1), (1, 0, 2), (1, 1, 3), (0, 1, 4)]
        sq = Polygon(O, O + s * RIGHT, O + s * UR, O + s * UP, color=GRID, stroke_width=4)
        balls = VGroup()
        for (x, y, m) in corners:
            c = O + s * P(x, y)
            ball = mass_ball(c, m, M1_C if m in (3, 4) else M2_C, scale=0.17)
            lab = T(f"{m} kg", 24, color=INK)
            lab.next_to(ball, LEFT if x == 0 else RIGHT, buff=0.15)
            balls.add(VGroup(ball, lab))
        xs = M(r"x_{cm} = \frac{1(0) + 2(1) + 3(1) + 4(0)}{10} = 0.5\ \text{m}", 38)
        ys = M(r"y_{cm} = \frac{1(0) + 2(0) + 3(1) + 4(1)}{10} = 0.7\ \text{m}", 38)
        col = VGroup(xs, ys).arrange(DOWN, buff=0.45, aligned_edge=LEFT).move_to(P(2.9, -0.9))
        fit(col, 7.8)
        with self.voiceover("Masses of one, two, three and four kilograms sit on the corners of a one metre square. "
                            "The x coordinate is five over ten, nought point five. The y coordinate is seven over "
                            "ten, nought point seven. The heavy top edge pulls the centre of mass up.") as vo:
            self.play(FadeOut(comp), f.animate.scale(0.75).move_to(P(3.0, 2.9)), run_time=0.6)
            self.play(Create(sq), LaggedStart(*[FadeIn(b) for b in balls], lag_ratio=0.25), run_time=1.4)
            self.play(Write(xs), run_time=1.5)
            self.wait(vo.duration * 0.1)
            self.play(Write(ys), run_time=1.5)
            mk = com_dot(O + s * P(0.5, 0.7), 0.15)
            gx = DashedLine(O + s * P(0.5, 0), O + s * P(0.5, 0.7), color=COM_C, stroke_width=2)
            gy = DashedLine(O + s * P(0, 0.7), O + s * P(0.5, 0.7), color=COM_C, stroke_width=2)
            self.play(Create(gx), Create(gy), FadeIn(mk, scale=2), run_time=1.0)

        with self.voiceover("Any group of particles can be replaced by its total mass at its own centre of mass. "
                            "And because it is an average, it can land where there is no material at all: the "
                            "centre of a ring, or the gap inside an L-shaped wire.") as vo:
            self.clear_scene(0.5)
            grp = T("Grouping: replace any part by its total mass at its own COM", 28, color=PRIMARY)
            grp.move_to(P(0, 3.0))
            fit(grp, 13)
            self.play(FadeIn(grp), run_time=0.8)
            self.wait(vo.duration * 0.15)
            ring = Circle(radius=1.4, color=M2_C, stroke_width=10).move_to(P(-3.2, -0.4))
            rm = com_dot(ring.get_center(), 0.15)
            C = P(1.8, -1.9)
            a = 2.8
            Lw = VMobject(color=M1_C, stroke_width=10).set_points_as_corners([C + a * UP, C, C + a * RIGHT])
            lm = com_dot(C + P(a / 4, a / 4), 0.15)
            self.play(Create(ring), Create(Lw), run_time=1.2)
            self.play(FadeIn(rm, scale=2), FadeIn(lm, scale=2), run_time=0.7)
            cap = T("the COM can sit in empty space", 28, color=COM_C).move_to(P(0, -3.3))
            self.play(FadeIn(cap), run_time=0.6)

    # ------------------------------------------------------------ scene 4: continuous bodies
    def s4(self):
        hdr = M(r"x_{cm} = \frac{\sum m_i x_i}{\sum m_i}\ \longrightarrow\ x_{cm} = \frac{1}{M}\int x\,dm", 46)
        hdr.move_to(P(0, 3.0))
        n = 24
        L = 9.0
        x0 = -4.5
        y0 = 0.6
        w = L / n
        dens = ValueTracker(0.0)  # 0 = uniform, 1 = ramp lambda = kx

        def strips():
            g = VGroup()
            k = dens.get_value()
            for i in range(n):
                xm = (i + 0.5) / n
                lam = (1 - k) * 1.0 + k * 2 * xm
                r = Rectangle(width=w, height=0.7, stroke_width=1, stroke_color=BG)
                r.set_fill(PRIMARY, min(1.0, 0.12 + 0.42 * lam))
                r.move_to(P(x0 + (i + 0.5) * w, y0))
                g.add(r)
            return g

        def xcm():
            k = dens.get_value()
            frac = (1 - k) * 0.5 + k * (2 / 3)
            return x0 + frac * L

        rod = always_redraw(strips)
        mk = always_redraw(lambda: com_dot(P(xcm(), y0 - 0.75), 0.15))
        tick = always_redraw(lambda: DashedLine(P(xcm(), y0 - 0.6), P(xcm(), y0 + 0.45), color=INK, stroke_width=2))
        dm = Rectangle(width=w, height=0.7, color=INK, stroke_width=3).move_to(P(x0 + 15.5 * w, y0))
        dml = M(r"dm = \lambda\,dx", 34).next_to(dm, UP, buff=0.2)
        ends = VGroup(M("0", 32).next_to(P(x0, y0 - 0.4), DOWN, buff=0.1),
                      M("L", 32).next_to(P(x0 + L, y0 - 0.4), DOWN, buff=0.1))
        with self.voiceover("A metre rule or a steel plate has its mass smeared out. Chop it into tiny pieces, "
                            "treat each one as a particle, and the sum becomes an integral: the centre of mass is "
                            "one over M, times the integral of x d m.") as vo:
            self.play(FadeIn(rod), FadeIn(ends), run_time=0.8)
            self.play(Create(dm), FadeIn(dml), run_time=0.8)
            self.wait(vo.duration * 0.25)
            self.play(Write(hdr), run_time=1.6)
        r1 = M(r"\lambda\ \text{constant:}\quad x_{cm} = \frac{L}{2}", 42).move_to(P(0, -1.8))
        r2 = M(r"\lambda = kx:\quad x_{cm} = \frac{\int_0^L x\,(kx)\,dx}{\int_0^L kx\,dx} = \frac{2L}{3}", 42)
        r2.move_to(P(0, -1.8))
        with self.voiceover("For a uniform rod, the answer is the middle, L over two. Let the density grow along "
                            "the rod, lambda equals k x, and the centre of mass moves towards the heavy end, to two "
                            "L over three.") as vo:
            self.play(FadeOut(dm), FadeOut(dml), FadeIn(tick), FadeIn(mk), run_time=0.6)
            self.play(Write(r1), run_time=1.2)
            self.wait(vo.duration * 0.15)
            self.play(dens.animate.set_value(1.0), FadeOut(r1), run_time=2.0)
            self.play(Write(r2), run_time=1.6)
        for m in (rod, mk, tick):
            m.clear_updaters()

        with self.voiceover("Choose the element cleverly. Small arcs give a semicircular ring its centre of mass "
                            "at two R over pi. Thin semicircular rings stacked together give a semicircular disc "
                            "four R over three pi: closer in, because its mass is spread inwards. Same outline, "
                            "different mass distribution.") as vo:
            self.clear_scene(0.5)
            R = 2.2
            c1, c2 = P(-3.4, -1.6), P(3.4, -1.6)
            ring = Arc(radius=R, start_angle=0, angle=PI, color=M2_C, stroke_width=8).move_arc_center_to(c1)
            base1 = DashedLine(c1 + R * LEFT, c1 + R * RIGHT, color=GRID, stroke_width=2)
            disc = Sector(radius=R, angle=PI, start_angle=0, color=M1_C, fill_opacity=0.35,
                          stroke_width=3, stroke_color=M1_C).shift(c2)
            m1 = com_dot(c1 + (2 * R / PI) * UP, 0.15)
            m2 = com_dot(c2 + (4 * R / (3 * PI)) * UP, 0.15)
            t1 = M(r"\frac{2R}{\pi} \approx 0.64R", 38, color=M2_C).move_to(c1 + 3.4 * UP)
            t2 = M(r"\frac{4R}{3\pi} \approx 0.42R", 38, color=M1_C).move_to(c2 + 3.4 * UP)
            n1 = T("semicircular ring", 26, color=MUTED).next_to(base1, DOWN, buff=0.2)
            n2 = T("semicircular disc", 26, color=MUTED).next_to(c2, DOWN, buff=0.2)
            self.play(Create(ring), Create(base1), FadeIn(n1), run_time=1.0)
            self.play(FadeIn(m1, scale=2), Write(t1), run_time=1.0)
            self.wait(vo.duration * 0.15)
            rings = VGroup(*[Arc(radius=R * k / 6, start_angle=0, angle=PI, color=M1_C, stroke_width=2)
                             .move_arc_center_to(c2) for k in range(1, 7)])
            self.play(LaggedStart(*[Create(a) for a in rings], lag_ratio=0.15), run_time=1.2)
            self.play(FadeIn(disc), FadeIn(n2), run_time=0.6)
            self.play(FadeIn(m2, scale=2), Write(t2), run_time=1.0)

        with self.voiceover("Stacking thin discs does the rest: three R over eight above the flat face of a solid "
                            "hemisphere, and h over four above the base of a solid cone.") as vo:
            self.clear_scene(0.5)
            R = 2.2
            c1 = P(-3.4, -2.0)
            hemi = Sector(radius=R, angle=PI, start_angle=0, color=PURPLE, fill_opacity=0.3,
                          stroke_width=3, stroke_color=PURPLE).shift(c1)
            slices = VGroup(*[Line(c1 + P(-np.sqrt(R * R - y * y), y), c1 + P(np.sqrt(R * R - y * y), y),
                                   color=PURPLE, stroke_width=1.5) for y in np.linspace(0.25, R - 0.15, 8)])
            hm = com_dot(c1 + (3 * R / 8) * UP, 0.15)
            ht = M(r"\frac{3R}{8}", 40, color=PURPLE).move_to(c1 + 3.1 * UP)
            h = 4.0
            b = P(3.4, -2.0)
            cone = Polygon(b + 1.6 * LEFT, b + 1.6 * RIGHT, b + h * UP, color=SECONDARY, stroke_width=3)
            cone.set_fill(SECONDARY, 0.3)
            cm = com_dot(b + (h / 4) * UP, 0.15)
            ct = M(r"\frac{h}{4}\ \text{above the base}", 36, color=SECONDARY).next_to(cone, DOWN, buff=0.25)
            fit(ct, 4.0)
            self.play(FadeIn(hemi), Create(slices), FadeIn(cone), run_time=1.2)
            self.play(FadeIn(hm, scale=2), Write(ht), run_time=0.9)
            self.play(FadeIn(cm, scale=2), Write(ct), run_time=0.9)

    # ------------------------------------------------------------ scene 5: holes
    def s5(self):
        R = 2.4
        O = P(-3.6, -0.5)
        disc = Circle(radius=R, color=M2_C, stroke_width=3).set_fill(M2_C, 0.3).move_to(O)
        hole = Circle(radius=R / 2, color=HOLE_C, stroke_width=3).set_fill(BG, 1).move_to(O + (R / 2) * RIGHT)
        hole_d = DashedVMobject(hole.copy().set_fill(opacity=0), num_dashes=30)
        Ol = M("O", 30).next_to(O, DL, buff=0.2)
        mk = com_dot(O, 0.15)
        with self.voiceover("A washer is a disc with a hole. Think of the full disc as what remains, plus what was "
                            "removed. Then the hole behaves like a negative mass, sitting at the centre of the "
                            "missing piece.") as vo:
            self.play(FadeIn(disc), FadeIn(mk), FadeIn(Ol), run_time=0.8)
            self.wait(vo.duration * 0.15)
            self.play(FadeIn(hole), Create(hole_d), run_time=1.0)
            neg = M(r"-m", 40, color=HOLE_C).move_to(hole.get_center())
            self.play(FadeIn(neg), run_time=0.6)
            idea = M(r"\vec r_{\text{rem}} = \frac{M\,\vec r_{\text{whole}} - m\,\vec r_{\text{hole}}}{M - m}", 40)
            idea.move_to(P(3.3, 2.6))
            fit(idea, 6.6)
            self.play(Write(idea), run_time=1.6)

        e1 = M(r"m = \frac{M}{4}\ \text{ at } x = \frac R2", 38)
        e2 = M(r"x_{\text{rem}} = \frac{0 - \frac M4\cdot\frac R2}{\frac34 M}", 40)
        e3 = M(r"x_{\text{rem}} = -\frac{R}{6}", 48, color=GREEN)
        col = VGroup(e1, e2, e3).arrange(DOWN, buff=0.4).move_to(P(3.3, -0.6))
        with self.voiceover("Cut a hole of radius R over two that touches the rim. It would have held a quarter of "
                            "the mass, at R over two from the centre. So the remaining centre of mass is zero, minus "
                            "a quarter M times R over two, all over three quarters M. That is minus R over six.") as vo:
            self.play(Write(e1), run_time=1.2)
            self.wait(vo.duration * 0.15)
            self.play(Write(e2), run_time=1.6)
            self.play(Write(e3), run_time=1.0)
            self.play(mk.animate.move_to(O + (R / 6) * LEFT), run_time=1.2)
            arr = Arrow(O + 0.1 * UP + 0.05 * LEFT, O + (R / 6) * LEFT + 0.1 * UP, buff=0, color=COM_C,
                        stroke_width=4, max_tip_length_to_length_ratio=0.5)
            self.play(GrowArrow(arr), run_time=0.4)
        with self.voiceover("The minus sign matters. Removing mass from one side leaves the other side heavier, so "
                            "the centre of mass moves away from the hole, never towards it.") as vo:
            away = T("away from the hole", 30, color=COM_C, weight="BOLD").move_to(P(-3.6, 2.6))
            self.play(FadeIn(away), Indicate(mk, color=HL), run_time=1.0)

    # ------------------------------------------------------------ scene 6: motion of the COM
    def s6(self):
        l1 = M(r"M\vec r_{cm} = \sum m_i\vec r_i", 44)
        l2 = M(r"M\vec v_{cm} = \sum m_i\vec v_i = \vec P", 44)
        l3 = MathTex(r"M\vec a_{cm} = \sum \vec F_i",
                     r"= \vec F_{\text{ext}} + \underbrace{\sum \vec F_{\text{int}}}_{=\,\vec 0}", font_size=44)
        col = VGroup(l1, l2, l3).arrange(DOWN, buff=0.45).move_to(P(0, 1.2))
        with self.voiceover("Now the payoff. Multiply the definition by M and differentiate: M times the velocity "
                            "of the centre of mass is the total momentum. Differentiate again, and M times its "
                            "acceleration is the sum of all the forces on all the particles.") as vo:
            self.play(Write(l1), run_time=1.0)
            self.wait(vo.duration * 0.15)
            self.play(Write(l2), run_time=1.3)
            self.wait(vo.duration * 0.15)
            self.play(Write(l3[0]), run_time=1.3)
        res = M(r"M\vec a_{cm} = \vec F_{\text{ext}}", 64, color=INK).move_to(P(0, -2.4))
        box = SurroundingRectangle(res, buff=0.3, corner_radius=0.15, color=PRIMARY, stroke_width=3)
        with self.voiceover("Internal forces come in equal and opposite pairs, by Newton's third law, so they "
                            "cancel. What is left: M times the acceleration of the centre of mass equals the "
                            "external force. The centre of mass moves like one particle, pushed only by external "
                            "forces.") as vo:
            pair = VGroup(Arrow(P(-1.0, -0.9), P(-2.4, -0.9), buff=0, color=M1_C, stroke_width=5),
                          Arrow(P(1.0, -0.9), P(2.4, -0.9), buff=0, color=M2_C, stroke_width=5),
                          Dot(P(-0.8, -0.9), radius=0.16, color=M1_C), Dot(P(0.8, -0.9), radius=0.16, color=M2_C))
            self.play(FadeIn(pair), run_time=0.6)
            self.play(Write(l3[1]), run_time=1.3)
            self.wait(vo.duration * 0.15)
            self.play(FadeOut(pair), Write(res), Create(box), run_time=1.4)

        # exploding shell
        ground = Line(P(-6.8, -3.0), P(6.8, -3.0), color=MUTED, stroke_width=3)
        H = 3.4
        y_g = -3.0

        def pre(s):
            return P(-6.0 + 3.0 * s, y_g + H * (1 - (1 - s) ** 2))

        arc_pre = ParametricFunction(pre, t_range=[0, 1], color=INK, stroke_width=3)
        ghost = ParametricFunction(lambda t: P(-3.0 + 3.0 * t, y_g + H * (1 - t * t)), t_range=[0, 1],
                                   color=COM_C, stroke_width=2).set_opacity(0.6)
        ghost = DashedVMobject(ghost, num_dashes=18)
        s = ValueTracker(0.0)
        shell = always_redraw(lambda: Dot(pre(s.get_value()), radius=0.14, color=INK))
        ticks = VGroup()
        for x, lab in ((-6.0, "0"), (-3.0, r"\tfrac R2"), (0.0, "R"), (3.0, r"\tfrac{3R}{2}")):
            ticks.add(Line(P(x, y_g - 0.12), P(x, y_g + 0.12), color=INK, stroke_width=3),
                      M(lab, 32).next_to(P(x, y_g), DOWN, buff=0.2))
        with self.voiceover("A shell is fired with range R. At the top of its flight it bursts into two equal "
                            "pieces, and one of them drops straight down.") as vo:
            self.play(*[FadeOut(m) for m in (l1, l2, l3)], VGroup(res, box).animate.scale(0.6).move_to(P(4.4, 3.2)),
                      run_time=0.6)
            self.play(Create(ground), FadeIn(ticks), run_time=0.7)
            self.add(shell)
            self.play(Create(arc_pre), s.animate.set_value(1.0), run_time=1.8, rate_func=linear)
            shell.clear_updaters()
            self.play(Flash(pre(1.0), color=HL, line_length=0.35, num_lines=12), FadeOut(shell), run_time=0.6)
        tau = ValueTracker(0.0)
        f1 = always_redraw(lambda: Dot(P(-3.0, y_g + H * (1 - tau.get_value() ** 2)), radius=0.12, color=M1_C))
        f2 = always_redraw(lambda: Dot(P(-3.0 + 6.0 * tau.get_value(), y_g + H * (1 - tau.get_value() ** 2)),
                                       radius=0.12, color=M2_C))
        cm = always_redraw(lambda: com_dot(P(-3.0 + 3.0 * tau.get_value(), y_g + H * (1 - tau.get_value() ** 2)), 0.13))
        tp1 = TracedPath(f1.get_center, stroke_color=M1_C, stroke_width=3)
        tp2 = TracedPath(f2.get_center, stroke_color=M2_C, stroke_width=3)
        with self.voiceover("The explosion is internal, so the centre of mass carries on along the same parabola, "
                            "as if nothing had happened, and lands at R.") as vo:
            self.add(tp1, tp2, f1, f2, cm)
            self.play(Create(ghost), run_time=0.6)
            self.play(tau.animate.set_value(1.0), run_time=max(1.5, vo.duration - 1.0), rate_func=linear)
        for m in (f1, f2, cm, tp1, tp2):
            m.clear_updaters()
        with self.voiceover("The first piece lands at R over two. For their average to be R, the other piece must "
                            "land at three R over two: one and a half times the range.") as vo:
            eq = M(r"\frac{\frac R2 + x}{2} = R \ \Rightarrow\ x = \frac{3R}{2}", 44, color=INK).move_to(P(-2.6, 2.4))
            self.wait(vo.duration * 0.2)
            self.play(Write(eq), run_time=1.6)
            self.play(Indicate(f2, color=HL, scale_factor=1.6), run_time=0.8)

    # ------------------------------------------------------------ scene 7: COM stays put (boat)
    def s7(self):
        cond = M(r"F_{\text{ext},x} = 0,\ \text{at rest} \ \Rightarrow\ \sum m_i\,\Delta x_i = 0", 46).move_to(P(0, 3.0))
        sub = T("each displacement measured from the ground", 26, color=MUTED).next_to(cond, DOWN, buff=0.25)
        with self.voiceover("If no external force acts along a direction, and the system starts at rest, the "
                            "centre of mass cannot move along it. Then the sum of each mass times its displacement, "
                            "measured from the ground, is zero.") as vo:
            self.wait(vo.duration * 0.2)
            self.play(Write(cond), run_time=1.8)
            self.play(FadeIn(sub), run_time=0.6)

        u = 0.9  # units per metre
        yw = -1.6
        water = Rectangle(width=14.4, height=1.6, stroke_width=0).set_fill(WATER, 1).move_to(P(0, yw - 0.8))
        s = ValueTracker(0.0)
        bc0 = -0.5

        def boat_x():
            return bc0 - 1.5 * u * s.get_value()

        def man_x():
            return -3.0 + 3.5 * u * s.get_value()

        def boat():
            c = boat_x()
            hull = Polygon(P(c - 2.8, yw + 0.5), P(c + 2.8, yw + 0.5), P(c + 2.3, yw - 0.3), P(c - 2.3, yw - 0.3),
                           color=INK, stroke_width=3).set_fill(BODY, 1)
            return hull

        def man():
            x = man_x()
            base = yw + 0.5
            body = VGroup(
                Line(P(x - 0.18, base), P(x, base + 0.6), color=M1_C, stroke_width=5),
                Line(P(x + 0.18, base), P(x, base + 0.6), color=M1_C, stroke_width=5),
                Line(P(x, base + 0.6), P(x, base + 1.3), color=M1_C, stroke_width=5),
                Line(P(x - 0.3, base + 1.05), P(x + 0.3, base + 1.05), color=M1_C, stroke_width=5),
                Circle(radius=0.17, color=M1_C, stroke_width=4).set_fill(M1_C, 1).move_to(P(x, base + 1.5)),
            )
            return body

        def comx():
            return (60 * man_x() + 140 * boat_x()) / 200

        bt = always_redraw(boat)
        mn = always_redraw(man)
        cmk = always_redraw(lambda: com_dot(P(comx(), yw + 0.15), 0.14))
        cline = DashedLine(P(comx(), yw - 1.4), P(comx(), yw + 2.6), color=COM_C, stroke_width=2)
        bl = T("boat 140 kg", 24, color=INK).move_to(P(bc0, yw - 0.95))
        ml = T("man 60 kg", 24, color=M1_C).move_to(P(-3.0, yw + 2.35))
        with self.voiceover("A sixty kilogram man walks five metres along a hundred and forty kilogram boat, at rest "
                            "in still water. Watch the boat.") as vo:
            self.play(FadeOut(sub), cond.animate.scale(0.75).move_to(P(0, 3.3)), run_time=0.5)
            self.play(FadeIn(water), FadeIn(bt), FadeIn(mn), FadeIn(bl), FadeIn(ml), run_time=0.8)
            self.play(FadeIn(cmk), Create(cline), run_time=0.6)
            self.play(FadeOut(bl), FadeOut(ml), s.animate.set_value(1.0), run_time=max(1.5, vo.duration - 2.0),
                      rate_func=smooth)
        for m in (bt, mn, cmk):
            m.clear_updaters()
        ya = yw + 1.95
        bboat = BraceBetweenPoints(P(bc0 - 1.5 * u + 2.8, yw - 0.45), P(bc0 + 2.8, yw - 0.45), DOWN, color=INK)
        bboat_l = M(r"d", 34).next_to(bboat, DOWN, buff=0.08)
        bman = BraceBetweenPoints(P(-3.0, ya), P(-3.0 + 3.5 * u, ya), UP, color=M1_C)
        bman_l = M(r"5 - d", 34, color=M1_C).next_to(bman, UP, buff=0.08)
        eq = M(r"60\,(5 - d) - 140\,d = 0 \ \Rightarrow\ d = 1.5\ \text{m}", 42).move_to(P(0, 2.45))
        with self.voiceover("The boat slides back a distance d, so the man moves only five minus d over the ground. "
                            "Sixty times five minus d, minus one forty times d, is zero. So d is one point five "
                            "metres.") as vo:
            self.play(GrowFromCenter(bboat), FadeIn(bboat_l), run_time=0.7)
            self.play(GrowFromCenter(bman), FadeIn(bman_l), run_time=0.7)
            self.wait(vo.duration * 0.15)
            self.play(Write(eq), run_time=1.8)
        with self.voiceover("Watch the trap: the five metres is measured on the boat, which is moving. Over the "
                            "ground the man covers three point five metres, and the centre of mass never moves at "
                            "all.") as vo:
            res = M(r"\text{man: } 3.5\ \text{m},\quad \text{boat: } 1.5\ \text{m back}", 38, color=GREEN)
            res.next_to(eq, DOWN, buff=0.3)
            self.wait(vo.duration * 0.3)
            self.play(Write(res), run_time=1.4)
            self.play(Indicate(cmk, color=HL, scale_factor=1.6), run_time=0.8)

    # ------------------------------------------------------------ scene 8: recap
    def s8(self):
        title = T("Chapter 0 in five lines", 38, color=PRIMARY, weight="BOLD").move_to(P(0, 3.2))
        lines = [
            (r"\vec r_{cm} = \frac{\sum m_i\vec r_i}{M}", "weighted average, nearer the heavier mass"),
            (r"x_{cm} = \frac{1}{M}\int x\,dm", "continuous bodies: choose the element"),
            (r"\text{hole} = -m", "negative mass, COM moves away"),
            (r"M\vec a_{cm} = \vec F_{\text{ext}}", "internal forces cancel in pairs"),
            (r"\sum m_i\,\Delta x_i = 0", "no external force, from rest: it stays put"),
        ]
        rows = VGroup()
        for i, (tex, note) in enumerate(lines):
            m = M(tex, 36)
            nn = T(note, 24, color=MUTED)
            num = T(f"{i + 1}.", 28, color=PRIMARY, weight="BOLD")
            rows.add(VGroup(num, m, nn))
        for r in rows:
            r[0].move_to(P(-6.2, 0))
            r[1].next_to(r[0], RIGHT, buff=0.3)
        rows.arrange(DOWN, buff=0.38, aligned_edge=LEFT).move_to(P(0, -0.1))
        for r in rows:
            r[0].set_x(-6.2)
            r[1].next_to(r[0], RIGHT, buff=0.3)
            fit(r[2], 5.9).move_to(P(0, r[1].get_y())).align_to(P(0.5, 0), LEFT)
        with self.voiceover("To recap. The centre of mass is the mass weighted average position, nearer the heavier "
                            "mass. For continuous bodies the sum becomes an integral, and a hole is a negative "
                            "mass.") as vo:
            self.play(FadeIn(title), run_time=0.6)
            self.play(FadeIn(rows[0], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(rows[1], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.15)
            self.play(FadeIn(rows[2], shift=0.15 * UP), run_time=0.7)
        with self.voiceover("Internal forces cancel, so M times the acceleration of the centre of mass is the "
                            "external force. An explosion cannot bend its path, and with no external force from "
                            "rest, it stays put.") as vo:
            self.play(FadeIn(rows[3], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.3)
            self.play(FadeIn(rows[4], shift=0.15 * UP), run_time=0.7)
        with self.voiceover("Try the mastery quiz. Then chapter one takes the total momentum seriously: recoil, "
                            "impulse, rockets, and every kind of collision.") as vo:
            nxt = T("Next: Chapter 1 · Momentum, Impulse and Collisions", 30, color=PRIMARY).move_to(P(0, -3.4))
            self.wait(vo.duration * 0.3)
            self.play(FadeIn(nxt, shift=0.2 * UP), run_time=0.8)
