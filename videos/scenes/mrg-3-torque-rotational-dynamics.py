import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

# Chapter colour roles (light background).
F_C = PRIMARY  # forces = strawberry red
R_C = SECONDARY  # position vectors, lever arms = teal
AX_C = ACCENT  # axes / hinges / torque = amber
W_C = PURPLE  # weights
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
    c = Circle(radius=r, color=AX_C, stroke_width=3).set_fill(WHITE, 1)
    d = Dot(radius=0.045, color=AX_C)
    return VGroup(c, d).move_to(pt)


def arrow(start, end, color, sw=5):
    return Arrow(start, end, buff=0, color=color, stroke_width=sw,
                 max_tip_length_to_length_ratio=0.25, max_stroke_width_to_length_ratio=10)


def block(c, w, h, color, label=None, size=22):
    b = Rectangle(width=w, height=h, color=INK, stroke_width=3).set_fill(color, 0.85).move_to(c)
    if label:
        return VGroup(b, T(label, size, color=WHITE, weight="BOLD").move_to(c))
    return VGroup(b)


def spun_disc(c, R, ang, color=R_C):
    d = Circle(radius=R, color=INK, stroke_width=3).set_fill(color, 0.35).move_to(c)
    marks = VGroup(*[Line(c, c + R * np.array([np.cos(ang + k * TAU / 3), np.sin(ang + k * TAU / 3), 0]),
                          color=INK, stroke_width=2) for k in range(3)])
    return VGroup(d, marks, axis_dot(c, 0.1))


class MrgCh3Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Momentum, Rotation & Gravitation",
            "Chapter 3 · Torque and Rotational Dynamics",
            "Chapter three. Torque and rotational dynamics.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ scene 1: torque
    def s1(self):
        H = P(-5.0, -0.6)
        wall = VGroup(Line(H + 0.3 * UP + 0.25 * LEFT, H + 2.2 * DOWN + 0.25 * LEFT, color=INK, stroke_width=6),
                      Line(H + 0.3 * UP + 0.25 * LEFT, H + 0.3 * UP + 6.5 * RIGHT, color=GRID, stroke_width=0))
        door = Rectangle(width=6.0, height=0.22, color=INK, stroke_width=3).set_fill(WOOD, 1)
        door.move_to(H + 3.0 * RIGHT)
        hinge = axis_dot(H, 0.16)
        cap = T("a door, seen from above", 24, color=MUTED).move_to(P(3.8, 2.6))
        with self.voiceover("Push a heavy door right next to its hinges and it barely moves. Push at the handle and "
                            "it swings. Push at the handle, but straight towards the hinges, and nothing happens at "
                            "all.") as vo:
            self.play(FadeIn(door), FadeIn(hinge), FadeIn(wall[0]), FadeIn(cap), run_time=0.8)
            f1 = arrow(H + 0.6 * RIGHT + 1.4 * DOWN, H + 0.6 * RIGHT + 0.15 * DOWN, F_C)
            self.play(GrowArrow(f1), run_time=0.5)
            self.play(Rotate(door, 4 * DEGREES, about_point=H), f1.animate.shift(0.05 * UP), run_time=0.8)
            t1 = T("barely moves", 24, color=MUTED).next_to(f1, RIGHT, buff=0.2)
            self.play(FadeIn(t1), run_time=0.4)
            self.play(FadeOut(f1), FadeOut(t1), Rotate(door, -4 * DEGREES, about_point=H), run_time=0.5)
            f2 = arrow(H + 5.7 * RIGHT + 1.4 * DOWN, H + 5.7 * RIGHT + 0.15 * DOWN, F_C)
            self.play(GrowArrow(f2), run_time=0.5)
            self.play(Rotate(door, 35 * DEGREES, about_point=H), FadeOut(f2), run_time=1.0)
            self.play(Rotate(door, -35 * DEGREES, about_point=H), run_time=0.6)
            f3 = arrow(H + 7.4 * RIGHT, H + 6.15 * RIGHT, F_C)
            self.play(GrowArrow(f3), run_time=0.5)
            xm = cross_mark().scale(0.7).next_to(f3, UP, buff=0.15)
            t3 = T("nothing", 24, color=WARN).next_to(xm, LEFT, buff=0.2)
            self.play(FadeIn(xm), FadeIn(t3), run_time=0.5)

        # lever arm construction
        with self.voiceover("The turning effect is torque: tau equals r cross F. Its size is r F sine theta. Read it "
                            "as r times the perpendicular part of the force, or as F times the lever arm: the "
                            "perpendicular distance from the axis to the force's line of action.") as vo:
            self.clear_scene(0.5)
            O = P(-5.0, -2.0)
            Q = P(-1.6, -0.6)
            th = 70 * DEGREES
            rdir = (Q - O) / np.linalg.norm(Q - O)
            base = np.arctan2(rdir[1], rdir[0])
            fdir = np.array([np.cos(base + th), np.sin(base + th), 0])
            ax = axis_dot(O, 0.16)
            rv = arrow(O, Q, R_C)
            rl = M(r"\vec r", 38, color=R_C).next_to(rv.get_center(), UL, buff=0.1)
            Fv = arrow(Q, Q + 2.4 * fdir, F_C)
            Fl = M(r"\vec F", 38, color=F_C).next_to(Fv.get_end(), RIGHT, buff=0.12)
            loa = DashedLine(Q - 1.8 * fdir, Q + 3.0 * fdir, color=MUTED, stroke_width=2)
            foot = Q + np.dot(O - Q, fdir) * fdir
            rp = Line(O, foot, color=AX_C, stroke_width=5)
            rpl = M(r"r_\perp", 36, color=AX_C).next_to(rp.get_center(), DOWN, buff=0.15)
            ra = RightAngle(Line(foot, O), Line(foot, Q), length=0.22, color=INK, stroke_width=2)
            arc = Arc(radius=0.55, start_angle=base, angle=th, arc_center=Q, color=INK, stroke_width=3)
            thl = M(r"\theta", 32).move_to(Q + 0.85 * np.array([np.cos(base + th / 2), np.sin(base + th / 2), 0]))
            self.play(FadeIn(ax), GrowArrow(rv), FadeIn(rl), run_time=0.8)
            self.play(GrowArrow(Fv), FadeIn(Fl), Create(arc), FadeIn(thl), run_time=0.8)
            e1 = M(r"\vec\tau = \vec r\times\vec F", 52).move_to(P(3.4, 2.6))
            e2 = M(r"\tau = rF\sin\theta = r\,F_\perp = r_\perp F", 44).move_to(P(3.4, 1.4))
            fit(e2, 6.6)
            self.play(Write(e1), run_time=1.0)
            self.wait(vo.duration * 0.1)
            self.play(Write(e2), run_time=1.5)
            self.play(Create(loa), run_time=0.6)
            self.play(Create(rp), Create(ra), FadeIn(rpl), run_time=0.9)
            lab = T("lever arm", 24, color=AX_C).next_to(rpl, RIGHT, buff=0.2)
            self.play(FadeIn(lab), run_time=0.4)
        with self.voiceover("Pull a quarter metre spanner at right angles with forty newtons: ten newton metres. Pull "
                            "at thirty degrees and you get only five. In flat problems, anticlockwise counts "
                            "positive.") as vo:
            s1 = M(r"0.25 \times 40 \times \sin 90^\circ = 10\ \text{N m}", 38)
            s2 = M(r"0.25 \times 40 \times \sin 30^\circ = 5\ \text{N m}", 38, color=WARN)
            s3 = T("anticlockwise +, clockwise −", 26, color=MUTED)
            col = VGroup(s1, s2, s3).arrange(DOWN, buff=0.35, aligned_edge=LEFT).move_to(P(3.4, -1.0))
            fit(col, 6.6)
            self.play(Write(s1), run_time=1.3)
            self.wait(vo.duration * 0.1)
            self.play(Write(s2), run_time=1.3)
            self.play(FadeIn(s3), run_time=0.6)

        with self.voiceover("Two equal and opposite forces, a distance d apart, form a couple. The net force is zero, "
                            "but the torque is F times d, about every point. A couple spins a body without pushing it "
                            "anywhere.") as vo:
            self.clear_scene(0.5)
            C = P(-3.2, -0.3)
            R = 2.0
            ang = ValueTracker(0.0)
            wheel = always_redraw(lambda: VGroup(
                Circle(radius=R, color=INK, stroke_width=8).move_to(C),
                *[Line(C, C + R * np.array([np.cos(ang.get_value() + k * TAU / 3),
                                             np.sin(ang.get_value() + k * TAU / 3), 0]), color=INK, stroke_width=4)
                  for k in range(3)],
                Dot(C, radius=0.1, color=INK)))
            up = arrow(C + R * LEFT + 1.0 * DOWN, C + R * LEFT + 1.0 * UP, F_C)
            dn = arrow(C + R * RIGHT + 1.0 * UP, C + R * RIGHT + 1.0 * DOWN, F_C)
            ul = M(r"10\ \text{N}", 30, color=F_C).next_to(up, LEFT, buff=0.15)
            dl = M(r"10\ \text{N}", 30, color=F_C).next_to(dn, RIGHT, buff=0.15)
            br = BraceBetweenPoints(C + R * LEFT + 2.4 * DOWN, C + R * RIGHT + 2.4 * DOWN, DOWN, color=INK)
            brl = M(r"d = 0.4\ \text{m}", 30).next_to(br, DOWN, buff=0.1)
            self.add(wheel)
            self.play(FadeIn(wheel), GrowArrow(up), GrowArrow(dn), FadeIn(ul), FadeIn(dl), run_time=0.9)
            self.play(GrowFromCenter(br), FadeIn(brl), run_time=0.6)
            c1 = M(r"\sum\vec F = \vec 0", 46).move_to(P(3.2, 1.6))
            c2 = M(r"\tau = Fd = 10 \times 0.4 = 4\ \text{N m}", 42, color=AX_C).move_to(P(3.2, 0.4))
            c3 = T("the same about every point", 26, color=MUTED).move_to(P(3.2, -0.6))
            self.play(Write(c1), run_time=0.9)
            self.play(Write(c2), ang.animate.set_value(-1.2), run_time=1.6)
            self.play(FadeIn(c3), ang.animate.set_value(-2.6), run_time=max(1.0, vo.duration - 4.5),
                      rate_func=rate_functions.ease_in_quad)
            wheel.clear_updaters()

    # ------------------------------------------------------------ scene 2: tau = I alpha
    def s2(self):
        d1 = M(r"F_{t,i} = m_i\,a_{t,i} = m_i r_i\,\alpha", 44)
        d2 = M(r"\tau_i = r_i F_{t,i} = m_i r_i^2\,\alpha", 44)
        d3 = M(r"\sum\tau_{\text{ext}} = \Big(\sum m_i r_i^2\Big)\alpha = I\alpha", 50, color=AX_C)
        col = VGroup(d1, d2, d3).arrange(DOWN, buff=0.45).move_to(P(0, 0.6))
        with self.voiceover("Now the rotational second law. Each particle obeys F equals m a, with a tangential "
                            "acceleration r alpha. Multiply by r, and the torque on it is m r squared alpha. Sum over "
                            "the body; internal torques cancel in pairs. Torque equals I alpha.") as vo:
            self.play(Write(d1), run_time=1.4)
            self.wait(vo.duration * 0.1)
            self.play(Write(d2), run_time=1.4)
            self.wait(vo.duration * 0.15)
            self.play(Write(d3), run_time=1.6)
            box = SurroundingRectangle(d3, buff=0.2, corner_radius=0.12, color=PRIMARY, stroke_width=3)
            self.play(Create(box), run_time=0.5)

        C = P(-3.6, 1.6)
        R = 1.2
        ang = ValueTracker(0.0)
        drop = ValueTracker(0.0)
        dk = always_redraw(lambda: spun_disc(C, R, ang.get_value()))
        rope = always_redraw(lambda: Line(C + R * RIGHT, C + R * RIGHT + (1.6 + drop.get_value()) * DOWN,
                                          color=INK, stroke_width=3))
        blk = always_redraw(lambda: block(C + R * RIGHT + (2.0 + drop.get_value()) * DOWN, 0.8, 0.8, F_C, "2 kg"))
        dl = T("disc 4 kg", 22, color=R_C).next_to(C + R * LEFT, LEFT, buff=0.15)
        e1 = M(r"20 - T = 2a, \qquad TR = \tfrac12 MR^2\,\frac aR", 38)
        e2 = M(r"a = \frac{g}{1 + M/2m} = 5\ \text{m/s}^2", 42, color=GREEN)
        col = VGroup(e1, e2).arrange(DOWN, buff=0.4).move_to(P(3.0, 1.0))
        fit(col, 7.0)
        with self.voiceover("A two kilogram block hangs from a string wound round a four kilogram disc. The disc must "
                            "be spun up too, so the block falls at only five metres per second squared: half of "
                            "g.") as vo:
            self.clear_scene(0.5)
            self.add(dk, rope, blk)
            self.play(FadeIn(dk), FadeIn(rope), FadeIn(blk), FadeIn(dl), run_time=0.6)
            self.play(Write(e1), drop.animate.set_value(0.6), ang.animate.set_value(-0.6 / R), run_time=1.6,
                      rate_func=rate_functions.ease_in_quad)
            self.play(Write(e2), drop.animate.set_value(2.6), ang.animate.set_value(-2.6 / R), run_time=1.6,
                      rate_func=linear)
        for m in (dk, rope, blk):
            m.clear_updaters()

        # Atwood with a massive pulley
        with self.voiceover("With a massive pulley, the tensions on the two sides differ: that difference is what "
                            "spins the pulley. Three and one kilograms over a four kilogram disc give tensions of "
                            "twenty newtons and about thirteen.") as vo:
            self.clear_scene(0.5)
            C = P(-3.4, 1.8)
            R = 1.1
            pul = spun_disc(C, R, 0.3)
            sup = Line(C, C + 1.2 * UP, color=INK, stroke_width=3)
            lft = Line(C + R * LEFT, C + R * LEFT + 2.6 * DOWN, color=INK, stroke_width=3)
            rgt = Line(C + R * RIGHT, C + R * RIGHT + 1.6 * DOWN, color=INK, stroke_width=3)
            b3 = block(C + R * LEFT + 3.1 * DOWN, 1.0, 1.0, F_C, "3 kg")
            b1 = block(C + R * RIGHT + 1.95 * DOWN, 0.7, 0.7, R_C, "1 kg")
            t1 = arrow(C + R * LEFT + 2.5 * DOWN, C + R * LEFT + 0.9 * DOWN, AX_C, sw=6)
            t2 = arrow(C + R * RIGHT + 1.55 * DOWN, C + R * RIGHT + 0.5 * DOWN, AX_C, sw=6)
            t1l = M(r"T_1 = 20\ \text{N}", 30, color=AX_C).next_to(t1, LEFT, buff=0.15)
            t2l = M(r"T_2 \approx 13.3\ \text{N}", 30, color=AX_C).next_to(t2, RIGHT, buff=0.15)
            self.play(FadeIn(VGroup(pul, sup, lft, rgt, b3, b1)), run_time=0.8)
            g1 = M(r"a = \frac{(m_1 - m_2)g}{m_1 + m_2 + I/R^2} = \frac{20}{6} = \tfrac{10}{3}\ \text{m/s}^2", 38)
            g2 = M(r"(T_1 - T_2)R = I\alpha", 42, color=AX_C)
            gc = VGroup(g1, g2).arrange(DOWN, buff=0.45)
            fit(gc, 6.0).move_to(P(3.6, 0.6))
            self.play(Write(g1), run_time=1.8)
            self.play(GrowArrow(t1), GrowArrow(t2), FadeIn(t1l), FadeIn(t2l), run_time=0.9)
            self.wait(vo.duration * 0.1)
            self.play(Write(g2), run_time=1.0)

        with self.voiceover("A rod hinged at one end and released from horizontal has alpha equal to three g over two "
                            "L. Its free end starts falling at one and a half g: faster than a dropped stone.") as vo:
            self.clear_scene(0.5)
            H = P(-5.0, 0.6)
            L = 6.0
            rod = Rectangle(width=L, height=0.2, color=INK, stroke_width=3).set_fill(WOOD, 1).move_to(H + L / 2 * RIGHT)
            hg = axis_dot(H, 0.16)
            a1 = M(r"\alpha = \frac{mg\,\frac L2}{\frac13 mL^2} = \frac{3g}{2L}", 44).move_to(P(0.0, 2.7))
            self.play(FadeIn(rod), FadeIn(hg), run_time=0.6)
            self.play(Write(a1), run_time=1.4)
            endp = H + L * RIGHT
            ea = arrow(endp, endp + 2.4 * DOWN, F_C, sw=6)
            eal = M(r"\alpha L = 1.5g", 34, color=F_C).next_to(ea, RIGHT, buff=0.15)
            stone = Dot(P(4.4, 0.6), radius=0.14, color=W_C)
            sa = arrow(P(4.4, 0.45), P(4.4, -1.15), W_C, sw=6)
            sal = M(r"g", 34, color=W_C).next_to(sa, LEFT, buff=0.15)
            self.play(GrowArrow(ea), FadeIn(eal), run_time=0.8)
            self.play(FadeIn(stone), GrowArrow(sa), FadeIn(sal), run_time=0.8)
            g = VGroup(rod)
            self.play(Rotate(rod, -25 * DEGREES, about_point=H), ea.animate.set_opacity(0.3),
                      stone.animate.shift(1.2 * DOWN), run_time=1.0, rate_func=rate_functions.ease_in_quad)

    # ------------------------------------------------------------ scene 3: equilibrium
    def s3(self):
        c1 = M(r"\sum\vec F = \vec 0", 46)
        c2 = M(r"\sum\vec\tau = \vec 0\ \text{ about any one point}", 46)
        cc = VGroup(c1, c2).arrange(RIGHT, buff=1.0).move_to(P(0, 2.9))
        fit(cc, 13)
        with self.voiceover("A body at rest stays at rest only if the forces balance and the torques balance. Both "
                            "are needed: a couple has zero net force, yet it spins a wheel. And once the forces "
                            "balance, you may take torques about any point you like.") as vo:
            self.play(Write(c1), run_time=1.0)
            self.wait(vo.duration * 0.2)
            self.play(Write(c2), run_time=1.4)
            hint = T("pick the point that unknown forces pass through", 26, color=MUTED).move_to(P(0, 2.1))
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(hint), run_time=0.6)

        u = 2.6  # units per metre
        y = -0.4
        A = P(-5.2, y)
        B = A + 4 * u * RIGHT
        beam = Rectangle(width=4 * u, height=0.25, color=INK, stroke_width=3).set_fill(WOOD, 1)
        beam.move_to((A + B) / 2 + 0.125 * UP)
        sA = Triangle(color=INK, stroke_width=3).set_fill(BODY, 1).scale(0.3).move_to(A + 0.25 * DOWN)
        sB = Triangle(color=INK, stroke_width=3).set_fill(BODY, 1).scale(0.3).move_to(B + 0.25 * DOWN)
        Al = M("A", 32).next_to(sA, DOWN, buff=0.1)
        Bl = M("B", 32).next_to(sB, DOWN, buff=0.1)
        load = block(A + 1 * u * RIGHT + 0.6 * UP, 0.8, 0.7, F_C)
        wl = arrow(A + 1 * u * RIGHT + 0.2 * UP, A + 1 * u * RIGHT + 1.6 * DOWN, F_C)
        wll = M(r"300", 30, color=F_C).next_to(wl.get_end(), DOWN, buff=0.1)
        wb = arrow(A + 2 * u * RIGHT, A + 2 * u * RIGHT + 1.4 * DOWN, W_C)
        wbl = M(r"200", 30, color=W_C).next_to(wb.get_end(), DOWN, buff=0.1)
        nA = arrow(A + 0.35 * LEFT + 1.8 * DOWN, A + 0.35 * LEFT + 0.1 * DOWN, R_C)
        nB = arrow(B + 0.35 * RIGHT + 1.8 * DOWN, B + 0.35 * RIGHT + 0.1 * DOWN, R_C)
        nAl = M(r"N_A", 32, color=R_C).next_to(nA, LEFT, buff=0.1)
        nBl = M(r"N_B", 32, color=R_C).next_to(nB, RIGHT, buff=0.1)
        q1 = M(r"\text{about } A:\ \ N_B(4) - 200(2) - 300(1) = 0", 36)
        q2 = M(r"N_B = 175\ \text{N}, \qquad N_A = 500 - 175 = 325\ \text{N}", 36, color=GREEN)
        qc = VGroup(q1, q2).arrange(DOWN, buff=0.3).move_to(P(0, 1.3))
        fit(qc, 12.5)
        with self.voiceover("A four metre beam weighing two hundred newtons rests on supports at its ends, with a three "
                            "hundred newton load one metre from end A. Take torques about A, and the unknown force "
                            "there drops out: N B is one seventy five newtons. Balancing forces then gives N A, three "
                            "twenty five.") as vo:
            self.play(FadeOut(hint), run_time=0.3)
            self.play(FadeIn(beam), FadeIn(sA), FadeIn(sB), FadeIn(Al), FadeIn(Bl), FadeIn(load), run_time=0.8)
            self.play(GrowArrow(wl), FadeIn(wll), GrowArrow(wb), FadeIn(wbl), run_time=0.8)
            self.play(GrowArrow(nA), GrowArrow(nB), FadeIn(nAl), FadeIn(nBl), run_time=0.8)
            self.play(Indicate(sA, color=HL), run_time=0.6)
            self.play(Write(q1), run_time=1.8)
            self.wait(vo.duration * 0.1)
            self.play(Write(q2), run_time=1.6)

        with self.voiceover("A five metre ladder weighing two hundred newtons leans on a smooth wall, its top four "
                            "metres up. Torques about the foot give a wall push of seventy five newtons, so friction "
                            "must supply seventy five too: the coefficient must be at least nought point three seven "
                            "five.") as vo:
            self.clear_scene(0.5)
            u = 1.15
            F0 = P(-2.4, -2.8)
            wallx = F0[0] - 3 * u
            floor = Line(P(wallx - 0.3, F0[1]), P(F0[0] + 1.4, F0[1]), color=INK, stroke_width=4)
            wall = Line(P(wallx, F0[1]), P(wallx, F0[1] + 5.4), color=INK, stroke_width=4)
            top = P(wallx, F0[1] + 4 * u)
            lad = Line(F0, top, color=WOOD, stroke_width=12)
            mid = (F0 + top) / 2
            W = arrow(mid, mid + 1.6 * DOWN, W_C)
            Wl = M(r"200\ \text{N}", 28, color=W_C).next_to(W, LEFT, buff=0.1)
            Nf = arrow(F0, F0 + 1.6 * UP, R_C)
            Nfl = M(r"200\ \text{N}", 28, color=R_C).next_to(Nf, RIGHT, buff=0.1)
            fr = arrow(F0, F0 + 1.2 * LEFT, F_C)
            frl = M(r"f", 32, color=F_C).next_to(fr, UP, buff=0.1)
            Nw = arrow(top, top + 1.2 * RIGHT, R_C)
            Nwl = M(r"N_w", 30, color=R_C).next_to(Nw, UP, buff=0.1)
            dims = VGroup(M(r"4\ \text{m}", 28, color=MUTED).next_to(P(wallx, F0[1] + 2 * u), LEFT, buff=0.15),
                          M(r"3\ \text{m}", 28, color=MUTED).next_to(P(wallx + 1.5 * u, F0[1]), DOWN, buff=0.15))
            self.play(Create(floor), Create(wall), Create(lad), FadeIn(dims), run_time=0.9)
            self.play(GrowArrow(W), FadeIn(Wl), GrowArrow(Nf), FadeIn(Nfl), GrowArrow(fr), FadeIn(frl),
                      GrowArrow(Nw), FadeIn(Nwl), run_time=1.0)
            l1 = M(r"\text{about the foot: } N_w(4) = 200(1.5)", 38)
            l2 = M(r"N_w = 75\ \text{N} = f", 40)
            l3 = M(r"\mu \ge \frac{75}{200} = 0.375", 44, color=GREEN)
            lc = VGroup(l1, l2, l3).arrange(DOWN, buff=0.4, aligned_edge=LEFT).move_to(P(3.4, 0.8))
            fit(lc, 6.6)
            self.play(Indicate(Dot(F0, color=HL), color=HL), Write(l1), run_time=1.6)
            self.wait(vo.duration * 0.1)
            self.play(Write(l2), run_time=1.0)
            self.play(Write(l3), run_time=1.2)

    # ------------------------------------------------------------ scene 4: work, energy, power
    def s4(self):
        e1 = M(r"dW = F_t\,r\,d\theta = \tau\,d\theta", 46)
        e2 = M(r"W = \int\tau\,d\theta,\qquad K = \tfrac12 I\omega^2,\qquad P = \tau\omega", 46, color=AX_C)
        col = VGroup(e1, e2).arrange(DOWN, buff=0.5).move_to(P(0, 2.2))
        fit(col, 13)
        with self.voiceover("A tangential force moving through an arc r d theta does work tau d theta. So work is the "
                            "integral of torque over angle, rotational kinetic energy is one half I omega squared, "
                            "and power is torque times omega.") as vo:
            self.play(Write(e1), run_time=1.4)
            self.wait(vo.duration * 0.2)
            self.play(Write(e2), run_time=2.0)

        C = P(-4.6, 0.0)
        R = 1.0
        ang = ValueTracker(0.0)
        drop = ValueTracker(0.0)
        dk = always_redraw(lambda: spun_disc(C, R, ang.get_value()))
        rope = always_redraw(lambda: Line(C + R * RIGHT, C + R * RIGHT + (1.3 + drop.get_value()) * DOWN,
                                          color=INK, stroke_width=3))
        blk = always_redraw(lambda: block(C + R * RIGHT + (1.6 + drop.get_value()) * DOWN, 0.6, 0.6, F_C, "2"))
        sc = 0.17
        base = -3.0
        bars = VGroup(Rectangle(width=1.0, height=20 * sc, stroke_width=0).set_fill(W_C, 0.8),
                      Rectangle(width=1.0, height=10 * sc, stroke_width=0).set_fill(F_C, 0.85),
                      Rectangle(width=1.0, height=10 * sc, stroke_width=0).set_fill(R_C, 0.85))
        bars[0].move_to(P(-1.4, base), aligned_edge=DOWN)
        bars[1].move_to(P(0.4, base), aligned_edge=DOWN)
        bars[2].move_to(bars[1].get_top(), aligned_edge=DOWN)
        bl = VGroup(T("PE lost 20 J", 22, color=W_C).next_to(bars[0], UP, buff=0.1),
                    T("block 10 J", 22, color=F_C).next_to(bars[1], RIGHT, buff=0.15),
                    T("disc 10 J", 22, color=R_C).next_to(bars[2], RIGHT, buff=0.15))
        r1 = M(r"20 = \tfrac12\big(m + \tfrac M2\big)v^2 = 2v^2", 38)
        r2 = M(r"v = \sqrt{10} \approx 3.16\ \text{m/s}", 42, color=GREEN)
        r3 = M(r"\text{not } \sqrt{2gh} = \sqrt{20}", 34, color=WARN)
        rc = VGroup(r1, r2, r3).arrange(DOWN, buff=0.35, aligned_edge=LEFT)
        fit(rc, 4.2).move_to(P(4.8, -0.9))
        with self.voiceover("Release the two kilogram block on the four kilogram disc and let it fall one metre. It "
                            "loses twenty joules. Half goes into the block, and half into the spinning disc. So the "
                            "block moves at root ten, about three point one six metres per second, not root "
                            "twenty.") as vo:
            self.play(e1.animate.set_opacity(0), e2.animate.scale(0.75).move_to(P(0, 3.2)), run_time=0.5)
            self.remove(e1)
            self.add(dk, rope, blk)
            self.play(FadeIn(dk), FadeIn(rope), FadeIn(blk), run_time=0.5)
            self.play(drop.animate.set_value(1.5), ang.animate.set_value(-1.5 / R), run_time=1.4,
                      rate_func=rate_functions.ease_in_quad)
            self.play(GrowFromEdge(bars[0], DOWN), FadeIn(bl[0]), run_time=0.7)
            self.play(GrowFromEdge(bars[1], DOWN), GrowFromEdge(bars[2], DOWN), FadeIn(bl[1]), FadeIn(bl[2]),
                      run_time=0.9)
            self.play(Write(r1), run_time=1.3)
            self.play(Write(r2), run_time=1.1)
            self.play(FadeIn(r3), run_time=0.6)
        for m in (dk, rope, blk):
            m.clear_updaters()

        with self.voiceover("A rod standing on its end topples over. Its centre of mass falls L over two, and all "
                            "that energy becomes rotation about the base. The top hits the ground at root three g "
                            "L.") as vo:
            self.clear_scene(0.5)
            Bp = P(-4.0, -2.4)
            L = 4.2
            fl = Line(P(-6.5, Bp[1]), P(1.5, Bp[1]), color=INK, stroke_width=3)
            a = ValueTracker(PI / 2)
            rod = always_redraw(lambda: Line(Bp, Bp + L * np.array([np.cos(a.get_value()), np.sin(a.get_value()), 0]),
                                             color=WOOD, stroke_width=12))
            tip = lambda: Bp + L * np.array([np.cos(a.get_value()), np.sin(a.get_value()), 0])
            tr = TracedPath(tip, stroke_color=MUTED, stroke_width=2)
            cmk = always_redraw(lambda: com_dot(Bp + L / 2 * np.array([np.cos(a.get_value()), np.sin(a.get_value()), 0]), 0.12))
            self.add(fl, tr, rod, cmk)
            self.play(Create(fl), run_time=0.5)
            q1 = M(r"mg\,\frac L2 = \tfrac12\Big(\tfrac13 mL^2\Big)\omega^2", 42).move_to(P(3.4, 1.6))
            q2 = M(r"v_{\text{tip}} = \omega L = \sqrt{3gL}", 48, color=GREEN).move_to(P(3.4, 0.2))
            self.play(a.animate.set_value(0.02), run_time=2.2, rate_func=rate_functions.ease_in_cubic)
            vt = arrow(tip(), tip() + 1.1 * DOWN, F_C)
            self.play(GrowArrow(vt), Write(q1), run_time=1.4)
            self.play(Write(q2), run_time=1.2)
            for m in (rod, cmk, tr):
                m.clear_updaters()

    # ------------------------------------------------------------ scene 5: hinge forces
    def s5(self):
        y = -0.6
        L = 7.0
        A = P(-4.5, y)
        plank = Rectangle(width=L, height=0.22, color=INK, stroke_width=3).set_fill(WOOD, 1).move_to(A + L / 2 * RIGHT + 0.11 * UP)
        brickA = Rectangle(width=0.7, height=0.6, color=INK, stroke_width=3).set_fill(F_C, 0.7).move_to(A + 0.3 * DOWN + 0.2 * RIGHT)
        brickB = Rectangle(width=0.7, height=0.6, color=INK, stroke_width=3).set_fill(F_C, 0.7).move_to(A + L * RIGHT + 0.3 * DOWN + 0.2 * LEFT)
        ground = Line(P(-6.5, y - 0.6), P(4.5, y - 0.6), color=INK, stroke_width=3)
        nA = arrow(A + 0.2 * RIGHT + 0.6 * DOWN + 0.0 * UP, A + 0.2 * RIGHT + 1.4 * UP, R_C)
        nB = arrow(A + (L - 0.2) * RIGHT + 0.6 * DOWN, A + (L - 0.2) * RIGHT + 1.4 * UP, R_C)
        nAl = M(r"\tfrac{mg}{2}", 34, color=R_C).next_to(nA.get_end(), LEFT, buff=0.15)
        nBl = M(r"\tfrac{mg}{2}", 34, color=R_C).next_to(nB.get_end(), RIGHT, buff=0.15)
        with self.voiceover("A plank rests on two bricks, each carrying half its weight. Kick one away. At that very "
                            "instant, how hard does the other brick push? Not half the weight, and not all of "
                            "it.") as vo:
            self.play(Create(ground), FadeIn(plank), FadeIn(brickA), FadeIn(brickB), run_time=0.8)
            self.play(FadeIn(nA), FadeIn(nB), FadeIn(nAl), FadeIn(nBl), run_time=0.7)
            self.wait(vo.duration * 0.15)
            self.play(brickB.animate.shift(3.0 * RIGHT), FadeOut(nB), FadeOut(nBl), run_time=0.8)
            q = T("?", 48, color=HL, weight="BOLD").next_to(nAl, UP, buff=0.2)
            self.play(FadeIn(q), Indicate(nA, color=HL), run_time=0.8)
        s1 = M(r"\alpha = \frac{3g}{2L}", 40)
        s2 = M(r"a_{cm} = \alpha\,\frac L2 = \tfrac34 g", 40)
        s3 = M(r"mg - N = m\cdot\tfrac34 g\ \Rightarrow\ N = \tfrac{mg}{4}", 40, color=GREEN)
        col = VGroup(s1, s2, s3).arrange(DOWN, buff=0.3, aligned_edge=LEFT).move_to(P(2.8, 2.3))
        fit(col, 7.6)
        with self.voiceover("The plank starts to pivot about the remaining brick, like a hinged rod. Alpha is three "
                            "g over two L, so the centre of mass accelerates down at three quarters g. Then m g minus "
                            "N equals three quarters m g, and N is just a quarter of the weight.") as vo:
            self.play(FadeOut(q), run_time=0.3)
            cm = com_dot(A + L / 2 * RIGHT + 0.11 * UP, 0.13)
            acm = arrow(A + L / 2 * RIGHT, A + L / 2 * RIGHT + 1.5 * DOWN, W_C)
            acml = M(r"\tfrac34 g", 32, color=W_C).next_to(acm, RIGHT, buff=0.1)
            self.play(Write(s1), run_time=1.0)
            self.play(FadeIn(cm), GrowArrow(acm), FadeIn(acml), Write(s2), run_time=1.3)
            self.wait(vo.duration * 0.15)
            nA2 = arrow(A + 0.2 * RIGHT + 0.6 * DOWN, A + 0.2 * RIGHT + 0.0 * UP + 0.2 * DOWN, R_C)
            nAl2 = M(r"\tfrac{mg}{4}", 34, color=GREEN).next_to(nA2, LEFT, buff=0.55).shift(0.5 * UP)
            self.play(Write(s3), Transform(nA, nA2), Transform(nAl, nAl2), run_time=1.6)
            grp = VGroup(plank, cm, acm, acml)
            self.play(Rotate(grp, -4 * DEGREES, about_point=A + 0.2 * RIGHT), run_time=0.8,
                      rate_func=rate_functions.ease_in_quad)

        with self.voiceover("Support forces are not fixed shares of the weight. They are whatever the motion needs. As "
                            "a hinged rod swings down, the hinge force grows, to two and a half m g at the "
                            "bottom.") as vo:
            self.clear_scene(0.5)
            ax = Axes(x_range=[0, 1.6, 0.5], y_range=[0, 2.6, 0.5], x_length=7.0, y_length=4.6,
                      axis_config={"color": INK, "stroke_width": 2, "include_tip": False},
                      y_axis_config={"numbers_to_include": [0.5, 1, 1.5, 2, 2.5], "font_size": 22, "decimal_number_config": {"color": INK, "num_decimal_places": 1}})
            ax.move_to(P(-1.5, -0.4))
            f = lambda t: np.sqrt(6.25 * np.sin(t) ** 2 + 0.0625 * np.cos(t) ** 2)
            cur = ax.plot(f, x_range=[0, PI / 2], color=AX_C, stroke_width=4)
            xl = M(r"\theta \text{ below horizontal}", 28, color=MUTED).next_to(ax.x_axis, DOWN, buff=0.3)
            yl = M(r"F_{\text{hinge}}/mg", 28, color=MUTED).next_to(ax.y_axis, UP, buff=0.15)
            t0 = M(r"0.25", 30, color=GREEN).next_to(ax.c2p(0, 0.25), RIGHT, buff=0.2).shift(0.25 * UP)
            t1 = M(r"2.5", 30, color=AX_C).next_to(ax.c2p(PI / 2, 2.5), RIGHT, buff=0.2)
            pi2 = M(r"\tfrac{\pi}{2}", 30).next_to(ax.c2p(PI / 2, 0), DOWN, buff=0.15)
            self.play(Create(ax), FadeIn(xl), FadeIn(yl), FadeIn(pi2), run_time=0.9)
            self.play(Create(cur), FadeIn(t0), run_time=1.8)
            self.play(FadeIn(t1), Flash(ax.c2p(PI / 2, 2.5), color=HL), run_time=0.8)
            nt = T("support forces follow the motion", 26, color=PRIMARY).move_to(P(4.4, 2.6))
            fit(nt, 5.0)
            self.play(FadeIn(nt), run_time=0.6)

    # ------------------------------------------------------------ scene 6: recap
    def s6(self):
        title = T("Chapter 3 in five lines", 38, color=PRIMARY, weight="BOLD").move_to(P(0, 3.3))
        lines = [
            (r"\vec\tau = \vec r\times\vec F", "force times lever arm; couples"),
            (r"\tau_{\text{ext}} = I\alpha", "massive pulleys: tensions differ"),
            (r"\sum\vec F = 0,\ \sum\vec\tau = 0", "torques about any point"),
            (r"W = \int\tau\,d\theta,\ P = \tau\omega", "rotation shares the energy"),
            (r"\vec F_{\text{ext}} = M\vec a_{cm}", "support forces follow the motion"),
        ]
        rows = VGroup()
        for i, (tex, note) in enumerate(lines):
            m = M(tex, 36)
            nn = T(note, 24, color=MUTED)
            num = T(f"{i + 1}.", 28, color=PRIMARY, weight="BOLD")
            rows.add(VGroup(num, m, nn))
        rows.arrange(DOWN, buff=0.38, aligned_edge=LEFT).move_to(P(0, -0.1))
        for r in rows:
            r[0].set_x(-6.2)
            r[1].next_to(r[0], RIGHT, buff=0.3)
            fit(r[2], 5.9).move_to(P(0, r[1].get_y())).align_to(P(0.5, 0), LEFT)
        with self.voiceover("To recap. Torque is r cross F: force times lever arm. Summed over a rigid body, Newton's "
                            "second law becomes torque equals I alpha.") as vo:
            self.play(FadeIn(title), run_time=0.6)
            self.play(FadeIn(rows[0], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.25)
            self.play(FadeIn(rows[1], shift=0.15 * UP), run_time=0.7)
        with self.voiceover("Equilibrium needs both forces and torques to balance, about any point you choose. "
                            "Rotation stores energy, one half I omega squared, and power is torque times omega. And "
                            "support forces are whatever the motion requires.") as vo:
            for k in (2, 3, 4):
                self.play(FadeIn(rows[k], shift=0.15 * UP), run_time=0.7)
                self.wait(vo.duration * 0.15)
        with self.voiceover("Try the mastery quiz. Then chapter four meets the quantity that torque changes: angular "
                            "momentum.") as vo:
            nxt = T("Next: Chapter 4 · Angular Momentum and Rolling", 30, color=PRIMARY).move_to(P(0, -3.5))
            self.wait(vo.duration * 0.3)
            self.play(FadeIn(nxt, shift=0.2 * UP), run_time=0.8)
