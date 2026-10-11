import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

# Chapter colour roles (light background).
POS_C = PRIMARY  # positive charge = strawberry red
NEG_C = SECONDARY  # negative charge = teal
F_C = PURPLE  # forces
E_C = ACCENT  # electric field arrows
LINE_C = ManimColor("#6B4E48")  # field lines
HL = ManimColor("#D19A00")  # highlight gold
WARN = PRIMARY

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


def P(x, y, z=0.0):
    return np.array([x, y, z])


def arrow(start, end, color, sw=6):
    return Arrow(start, end, buff=0, color=color, stroke_width=sw,
                 max_tip_length_to_length_ratio=0.22, max_stroke_width_to_length_ratio=12)


def check():
    return MathTex(r"\checkmark", color=GREEN, font_size=56)


def cross_mark():
    return MathTex(r"\times", color=WARN, font_size=64)


def charge(sign, pos, r=0.28):
    """A filled disc with a + or - drawn as strokes (no font dependency)."""
    col = POS_C if sign > 0 else NEG_C
    disc = Circle(radius=r, color=col, stroke_width=2).set_fill(col, 1).move_to(pos)
    bar = Line(LEFT * r * 0.55, RIGHT * r * 0.55, color=WHITE, stroke_width=5).move_to(pos)
    g = VGroup(disc, bar)
    if sign > 0:
        g.add(Line(DOWN * r * 0.55, UP * r * 0.55, color=WHITE, stroke_width=5).move_to(pos))
    return g


def efield(charges, p):
    e = np.zeros(3)
    for q, c in charges:
        d = p - c
        r = np.linalg.norm(d)
        if r > 1e-6:
            e += q * d / r ** 3
    return e


def trace(charges, start, sign=1, step=0.03, nmax=900, box=(-6.9, 6.9, -3.0, 2.7), stop_r=0.22):
    pts = [start.copy()]
    p = start.copy()
    for _ in range(nmax):
        e1 = efield(charges, p)
        n1 = np.linalg.norm(e1)
        if n1 < 1e-4:
            break
        mid = p + sign * 0.5 * step * e1 / n1
        e2 = efield(charges, mid)
        n2 = np.linalg.norm(e2)
        if n2 < 1e-4:
            break
        p = p + sign * step * e2 / n2
        pts.append(p.copy())
        if not (box[0] < p[0] < box[1] and box[2] < p[1] < box[3]):
            break
        if any(np.linalg.norm(p - c) < stop_r for q, c in charges if q * sign < 0):
            break
    return pts


def arrowhead(pts, at, color, size=0.13):
    """A small filled triangle on a polyline, at arc length `at`, pointing along it."""
    s = 0.0
    i = 1
    while i < len(pts) - 1 and s < at:
        s += np.linalg.norm(pts[i] - pts[i - 1])
        i += 1
    i = min(max(i, 1), len(pts) - 2)
    d = pts[i + 1] - pts[i - 1]
    ang = np.arctan2(d[1], d[0])
    tri = Triangle(color=color, stroke_width=0).set_fill(color, 1).scale(size)
    tri.rotate(ang - PI / 2).move_to(pts[i])
    return tri


def field_lines(charges, per_unit=4, box=(-6.9, 6.9, -3.0, 2.7), color=LINE_C, sw=2.2, start_r=0.3, nmax=900):
    lines = VGroup()
    sources = [(q, c) for q, c in charges if q > 0]
    sign = 1
    if not sources:
        sources = [(-q, c) for q, c in charges if q < 0]
        sign = -1
    for q, c in sources:
        n = int(round(per_unit * abs(q)))
        for k in range(n):
            a = 2 * PI * (k + 0.5) / n
            st = c + start_r * np.array([np.cos(a), np.sin(a), 0])
            pts = trace(charges, st, sign=sign, box=box, nmax=nmax)
            if len(pts) < 4:
                continue
            ln = VMobject(stroke_color=color, stroke_width=sw).set_points_as_corners(pts)
            length = sum(np.linalg.norm(pts[j] - pts[j - 1]) for j in range(1, len(pts)))
            head_pts = pts if sign > 0 else pts[::-1]
            at = min(1.4, 0.5 * length) if sign > 0 else max(length - min(1.4, 0.5 * length), 0)
            lines.add(VGroup(ln, arrowhead(head_pts, at, color)))
    return lines


WIRE = INK
CAP_C = ManimColor("#5A3A35")


def cap_sym(c, vertical_wire=False, h=0.7, gap=0.22, color=CAP_C):
    """Capacitor: two plates. For a horizontal wire the plates are vertical."""
    if vertical_wire:
        p1 = Line(c + P(-h / 2, gap / 2), c + P(h / 2, gap / 2), color=color, stroke_width=6)
        p2 = Line(c + P(-h / 2, -gap / 2), c + P(h / 2, -gap / 2), color=color, stroke_width=6)
    else:
        p1 = Line(c + P(-gap / 2, -h / 2), c + P(-gap / 2, h / 2), color=color, stroke_width=6)
        p2 = Line(c + P(gap / 2, -h / 2), c + P(gap / 2, h / 2), color=color, stroke_width=6)
    return VGroup(p1, p2)


def battery_sym(c, vertical_wire=False):
    """Cell: long thin plate (+) and short thick plate (-)."""
    if vertical_wire:
        lp = Line(c + P(-0.4, 0.1), c + P(0.4, 0.1), color=WIRE, stroke_width=4)
        sp = Line(c + P(-0.2, -0.1), c + P(0.2, -0.1), color=WIRE, stroke_width=9)
    else:
        lp = Line(c + P(-0.1, -0.4), c + P(-0.1, 0.4), color=WIRE, stroke_width=4)
        sp = Line(c + P(0.1, -0.2), c + P(0.1, 0.2), color=WIRE, stroke_width=9)
    return VGroup(lp, sp)


def resistor(a, b, n=6, amp=0.16, color=WIRE):
    d = b - a
    L = np.linalg.norm(d)
    u = d / L
    nrm = np.array([-u[1], u[0], 0])
    pts = [a]
    for i in range(n):
        t = (i + 0.5) / n
        pts.append(a + t * d + (amp if i % 2 == 0 else -amp) * nrm)
    pts.append(b)
    return VMobject(stroke_color=color, stroke_width=4).set_points_as_corners(pts)


def wire(*pts):
    return VMobject(stroke_color=WIRE, stroke_width=4).set_points_as_corners([np.array(p) for p in pts])


def plus_sign(c, s=0.1, color=POS_C, sw=4):
    return VGroup(Line(c + LEFT * s, c + RIGHT * s, color=color, stroke_width=sw),
                  Line(c + DOWN * s, c + UP * s, color=color, stroke_width=sw))


def minus_sign(c, s=0.1, color=NEG_C, sw=4):
    return Line(c + LEFT * s, c + RIGHT * s, color=color, stroke_width=sw)


def bulb(c, r=0.45, glow=0.0):
    g = Circle(radius=r, color=INK, stroke_width=3).set_fill(HL, glow).move_to(c)
    fil = VMobject(stroke_color=INK, stroke_width=2.5).set_points_as_corners(
        [c + P(-0.22, -0.05), c + P(-0.11, 0.12), c + P(0.0, -0.05), c + P(0.11, 0.12), c + P(0.22, -0.05)])
    return VGroup(g, fil)


def galvo(c, r=0.32):
    return VGroup(Circle(radius=r, color=INK, stroke_width=3).set_fill(BG, 1).move_to(c), M("G", 30).move_to(c))


B_C = GREEN  # magnetic field
V_C = INK  # velocity
I_C = PRIMARY  # current


def x_mark(c, s=0.09, color=B_C, sw=3):
    return VGroup(Line(c + P(-s, -s), c + P(s, s), color=color, stroke_width=sw),
                  Line(c + P(-s, s), c + P(s, -s), color=color, stroke_width=sw))


def dot_mark(c, r=0.12, color=B_C, sw=3):
    return VGroup(Circle(radius=r, color=color, stroke_width=sw).move_to(c), Dot(c, radius=0.035, color=color))


def into_grid(x0, x1, y0, y1, step=0.8, opacity=0.55):
    g = VGroup(*[x_mark(P(x, y)) for x in np.arange(x0, x1 + 1e-6, step) for y in np.arange(y0, y1 + 1e-6, step)])
    g.set_opacity(opacity)
    return g


def wire_in(c, r=0.22):
    """A wire carrying current into the page."""
    return VGroup(Circle(radius=r, color=I_C, stroke_width=4).set_fill(BG, 1).move_to(c), x_mark(c, s=0.12, color=I_C, sw=4))


def wire_out(c, r=0.22):
    """A wire carrying current out of the page."""
    return VGroup(Circle(radius=r, color=I_C, stroke_width=4).set_fill(BG, 1).move_to(c), Dot(c, radius=0.07, color=I_C))


def circ_arrows(c, r, n=4, color=B_C, ccw=True, sw=3):
    g = VGroup()
    for k in range(n):
        a0 = TAU * k / n + 0.25
        arc = Arc(radius=r, start_angle=a0, angle=(TAU / n - 0.5) * (1 if ccw else -1), arc_center=c, color=color,
                  stroke_width=sw)
        arc.add_tip(tip_length=0.16, tip_width=0.16)
        g.add(arc)
    return g


class EmCh4Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Electricity & Magnetism",
            "Chapter 4 · Magnetic Effects of Current",
            "Chapter four. Magnetic effects of current.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7, self.s8):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ scene 1: force on a moving charge
    def s1(self):
        grid = into_grid(-6.4, -0.8, -3.2, 2.4)
        bl = M(r"\vec B \text{ into the page}", 30, color=B_C).move_to(P(-3.6, 3.2))
        q0 = P(-5.4, -1.6)
        q = charge(1, q0, r=0.2)
        v = arrow(q0 + 0.22 * RIGHT, q0 + 1.6 * RIGHT, V_C, sw=6)
        vl = M(r"\vec v", 34).next_to(v, DOWN, buff=0.1).add_background_rectangle(color=BG, opacity=1, buff=0.05)
        f = arrow(q0 + 0.22 * UP, q0 + 1.5 * UP, F_C, sw=6)
        fl = M(r"\vec F", 34, color=F_C).next_to(f, LEFT, buff=0.1).add_background_rectangle(color=BG, opacity=1, buff=0.05)
        e1 = M(r"\vec F = q\,\vec v\times\vec B", 54, color=PRIMARY).move_to(P(3.4, 2.4))
        e2 = M(r"F = qvB\sin\theta", 46).move_to(P(3.4, 1.1))
        with self.voiceover("A charge moving through a magnetic field feels a force: q v cross B. It is "
                            "perpendicular to both the velocity and the field, and its size is q v B sin "
                            "theta.") as vo:
            self.play(FadeIn(grid), FadeIn(bl), run_time=0.8)
            self.play(FadeIn(q), GrowArrow(v), FadeIn(vl), run_time=0.8)
            self.play(GrowArrow(f), FadeIn(fl), run_time=0.7)
            self.wait(vo.duration * 0.1)
            self.play(Write(e1), run_time=1.2)
            self.play(Write(e2), run_time=1.0)

        R = 1.7
        C = q0 + R * UP + 1.6 * RIGHT
        ang = ValueTracker(-PI / 2)

        def pos():
            a = ang.get_value()
            return C + R * np.array([np.cos(a), np.sin(a), 0])

        def tang():
            a = ang.get_value()
            return np.array([-np.sin(a), np.cos(a), 0])

        mq = always_redraw(lambda: charge(1, pos(), r=0.2))
        mv = always_redraw(lambda: arrow(pos() + 0.22 * tang(), pos() + 1.3 * tang(), V_C, sw=5))
        mf = always_redraw(lambda: arrow(pos() + 0.22 * (C - pos()) / R, pos() + 1.0 * (C - pos()) / R, F_C, sw=5))
        path = DashedVMobject(Circle(radius=R, color=MUTED, stroke_width=2).move_to(C), num_dashes=40)
        with self.voiceover("Because the force is always sideways to the motion, it does no work. A magnetic field "
                            "can bend a charge's path, but it can never change its speed.") as vo:
            self.play(FadeOut(q), FadeOut(v), FadeOut(vl), FadeOut(f), FadeOut(fl), FadeIn(mq), FadeIn(mv), FadeIn(mf),
                      Create(path), run_time=0.8)
            nw = T("no work: the speed never changes", 26, color=GREEN).move_to(P(3.4, -0.2))
            self.play(ang.animate.set_value(-PI / 2 + TAU), FadeIn(nw), run_time=4.0, rate_func=linear)
        for m in (mq, mv, mf):
            m.clear_updaters()

        with self.voiceover("Flip the sign of the charge and the force flips too. A proton at two million metres "
                            "per second, at thirty degrees to a half tesla field, feels eight times ten to the minus "
                            "fourteen newtons.") as vo:
            ex = M(r"F = (1.6\times10^{-19})(2\times10^{6})(0.5)\sin30^\circ", 36).move_to(P(3.4, -1.4))
            fit(ex, 6.9)
            ex2 = M(r"= 8\times10^{-14}\ \text{N}", 40, color=GREEN).next_to(ex, DOWN, buff=0.3)
            self.wait(vo.duration * 0.3)
            self.play(Write(ex), run_time=1.6)
            self.play(Write(ex2), run_time=0.9)

    # ------------------------------------------------------------ scene 2: circles, helices, crossed fields
    def s2(self):
        grid = into_grid(-6.4, 0.0, -3.2, 2.4)
        P0 = P(-3.2, -2.6)
        r1, r2 = 1.2, 2.4
        ang = ValueTracker(0.0)

        def pt(r):
            a = ang.get_value() - PI / 2
            c = P0 + r * UP
            return c + r * np.array([np.cos(a), np.sin(a), 0])

        c1 = DashedVMobject(Circle(radius=r1, color=SECONDARY, stroke_width=3).move_to(P0 + r1 * UP), num_dashes=30)
        c2 = DashedVMobject(Circle(radius=r2, color=PRIMARY, stroke_width=3).move_to(P0 + r2 * UP), num_dashes=50)
        d1 = always_redraw(lambda: Dot(pt(r1), radius=0.14, color=SECONDARY))
        d2 = always_redraw(lambda: Dot(pt(r2), radius=0.14, color=PRIMARY))
        e1 = M(r"qvB = \frac{mv^2}{r}", 46).move_to(P(3.6, 2.6))
        e2 = M(r"r = \frac{mv}{qB}", 52, color=PRIMARY).move_to(P(3.6, 1.2))
        with self.voiceover("Moving straight across a uniform field, a charge goes round in a circle. The magnetic "
                            "force supplies the centripetal force: q v B equals m v squared over r. So r equals m v "
                            "over q B.") as vo:
            self.play(FadeIn(grid), run_time=0.6)
            self.play(Create(c1), FadeIn(d1), run_time=0.8)
            self.play(ang.animate.set_value(TAU), run_time=3.0, rate_func=linear)
            self.play(Write(e1), run_time=1.0)
            self.play(Write(e2), run_time=1.0)

        e3 = M(r"T = \frac{2\pi m}{qB}", 52, color=GREEN).move_to(P(3.6, -0.3))
        e3n = T("same period at any speed", 26, color=GREEN).next_to(e3, DOWN, buff=0.2)
        lv = VGroup(M(r"v", 32, color=SECONDARY).next_to(P0 + 2 * r1 * UP, UP, buff=0.12),
                    M(r"2v", 32, color=PRIMARY).next_to(P0 + 2 * r2 * UP, UP, buff=0.12))
        with self.voiceover("The period, two pi m over q B, does not depend on the speed. A particle twice as fast "
                            "runs a circle twice as big, in exactly the same time. That is the trick behind the "
                            "cyclotron.") as vo:
            ang.set_value(0.0)
            self.play(Create(c2), FadeIn(d2), FadeIn(lv), run_time=0.8)
            self.play(ang.animate.set_value(2 * TAU), run_time=5.0, rate_func=linear)
            self.play(Write(e3), FadeIn(e3n), run_time=1.0)
        for m in (d1, d2):
            m.clear_updaters()

        with self.voiceover("Enter at an angle, and the motion along the field carries on unchanged, so the circle "
                            "stretches into a helix. And crossed electric and magnetic fields let through only the "
                            "particles with speed E over B.") as vo:
            self.clear_scene(0.5)
            bf = VGroup(*[arrow(P(-6.6, y), P(-0.4, y), B_C, sw=3).set_opacity(0.5) for y in (-2.7, 1.8)])
            bfl = M(r"\vec B", 34, color=B_C).next_to(bf[1], RIGHT, buff=0.1)
            hel = ParametricFunction(lambda t: P(-6.0 + 0.24 * t + 0.35 * np.sin(t), -0.2 + 1.2 * np.cos(t), 0),
                                     t_range=[0, 6 * PI], color=PRIMARY, stroke_width=4)
            pitch = BraceBetweenPoints(P(-6.0 + 0.35 * np.sin(0), -1.6), P(-6.0 + 0.24 * TAU, -1.6), direction=DOWN,
                                       color=MUTED)
            pl = T("pitch", 22, color=MUTED).next_to(pitch, DOWN, buff=0.08)
            self.play(LaggedStart(*[GrowArrow(b) for b in bf], lag_ratio=0.2), FadeIn(bfl), run_time=0.8)
            self.play(Create(hel), run_time=2.4)
            self.play(FadeIn(pitch), FadeIn(pl), run_time=0.5)
            hp = M(r"\text{pitch} = v\cos\theta\cdot T", 40).move_to(P(3.6, 2.2))
            self.play(Write(hp), run_time=1.0)
            vs = M(r"qE = qvB \;\Rightarrow\; v = \frac{E}{B}", 46, color=PRIMARY).move_to(P(3.6, 0.2))
            vsn = T("velocity selector", 26, color=MUTED).next_to(vs, DOWN, buff=0.2)
            self.wait(vo.duration * 0.05)
            self.play(Write(vs), FadeIn(vsn), run_time=1.2)

    # ------------------------------------------------------------ scene 3: Biot-Savart
    def s3(self):
        a = P(-5.6, -0.6)
        dl = arrow(a, a + 1.0 * RIGHT, I_C, sw=7)
        dll = M(r"I\,d\vec l", 34, color=I_C).next_to(dl, DOWN, buff=0.15)
        Pp = P(-3.2, 1.6)
        rv = DashedLine(a + 0.5 * RIGHT, Pp, color=MUTED, stroke_width=3)
        rl = M(r"\vec r", 32, color=MUTED).next_to(rv.get_center(), LEFT, buff=0.15)
        pd = Dot(Pp, color=INK)
        pl = M("P", 32).next_to(pd, UP, buff=0.12)
        db = dot_mark(Pp + 0.5 * RIGHT, r=0.16, sw=4)
        dbl = M(r"d\vec B", 32, color=B_C).next_to(db, RIGHT, buff=0.1)
        e1 = M(r"d\vec B = \frac{\mu_0}{4\pi}\,\frac{I\,d\vec l\times\hat r}{r^2}", 50).move_to(P(3.3, 2.4))
        with self.voiceover("Moving charges also make magnetic fields. Each small piece of current, I d l, adds a "
                            "bit of field: mu nought over four pi, times I d l cross r hat, over r squared.") as vo:
            self.play(GrowArrow(dl), FadeIn(dll), run_time=0.8)
            self.play(FadeIn(pd), FadeIn(pl), Create(rv), FadeIn(rl), run_time=0.8)
            self.play(FadeIn(db), FadeIn(dbl), run_time=0.6)
            self.wait(vo.duration * 0.1)
            self.play(Write(e1), run_time=1.6)

        with self.voiceover("Add up a long straight wire, and the field circles round it, with strength mu nought I "
                            "over two pi d. Grip the wire with your right hand, thumb along the current, and your "
                            "fingers curl the way the field goes.") as vo:
            self.play(FadeOut(VGroup(dl, dll, rv, rl, pd, pl, db, dbl)), run_time=0.5)
            W = P(-3.6, -0.6)
            w = wire_out(W)
            wl = T("current out of the page", 22, color=I_C).move_to(W + 2.85 * DOWN)
            rings = VGroup(*[circ_arrows(W, r, n=4) for r in (0.8, 1.6, 2.4)])
            self.play(FadeIn(w), FadeIn(wl), run_time=0.6)
            self.play(LaggedStart(*[Create(r) for r in rings], lag_ratio=0.3), run_time=1.8)
            e2 = M(r"B = \frac{\mu_0 I}{2\pi d}", 52, color=PRIMARY).move_to(P(3.3, 0.9))
            e2n = M(r"10\ \text{A at } 5\ \text{cm}:\ B = 4\times10^{-5}\ \text{T}", 34, color=GREEN).next_to(e2, DOWN, buff=0.3)
            self.wait(vo.duration * 0.1)
            self.play(Write(e2), run_time=1.0)
            self.play(FadeIn(e2n), run_time=0.7)
            self.circle_stuff = VGroup(w, wl, rings)

        with self.voiceover("At the centre of a circular loop, every piece pushes the field the same way, and B "
                            "equals mu nought I over two R.") as vo:
            self.play(FadeOut(self.circle_stuff), run_time=0.5)
            C = P(-3.6, -0.6)
            loop = Circle(radius=1.8, color=I_C, stroke_width=6).move_to(C)
            ca = circ_arrows(C, 1.8, n=4, color=I_C, sw=6)
            cm = dot_mark(C, r=0.2, sw=4)
            cml = M(r"\vec B", 32, color=B_C).next_to(cm, UP, buff=0.12)
            Rl = DashedLine(C, C + 1.8 * RIGHT, color=MUTED, stroke_width=2)
            Rt = M("R", 30, color=MUTED).next_to(Rl, DOWN, buff=0.08).shift(0.3 * RIGHT)
            e3 = M(r"B_{\text{centre}} = \frac{\mu_0 I}{2R}", 46).move_to(P(3.3, -1.7))
            self.play(Create(loop), FadeIn(ca), run_time=1.0)
            self.play(FadeIn(cm), FadeIn(cml), Create(Rl), FadeIn(Rt), run_time=0.7)
            self.play(Write(e3), run_time=1.0)

    # ------------------------------------------------------------ scene 4: Ampere
    def s4(self):
        W = P(-3.6, -0.3)
        w = wire_out(W)
        amp = DashedVMobject(Circle(radius=1.9, color=HL, stroke_width=4).move_to(W), num_dashes=40)
        ba = circ_arrows(W, 1.9, n=4, color=B_C, sw=4)
        rl = DashedLine(W, W + 1.9 * np.array([np.cos(-0.6), np.sin(-0.6), 0]), color=MUTED, stroke_width=2)
        rt = M("r", 30, color=MUTED).next_to(rl.get_center(), DOWN, buff=0.1)
        e1 = M(r"\oint \vec B\cdot d\vec l = \mu_0 I_{\text{enc}}", 50, color=PRIMARY).move_to(P(3.3, 2.4))
        e2 = M(r"B\,(2\pi r) = \mu_0 I \;\Rightarrow\; B = \frac{\mu_0 I}{2\pi r}", 40).move_to(P(3.3, 0.9))
        fit(e2, 7.0)
        with self.voiceover("For symmetric currents there is a shortcut, just like Gauss's law. Ampère's law: the "
                            "line integral of B round any closed loop equals mu nought times the current enclosed. "
                            "Round a long wire, that gives mu nought I over two pi r, in one line.") as vo:
            self.play(FadeIn(w), run_time=0.5)
            self.play(Create(amp), FadeIn(ba), Create(rl), FadeIn(rt), run_time=1.2)
            self.wait(vo.duration * 0.15)
            self.play(Write(e1), run_time=1.4)
            self.play(Write(e2), run_time=1.4)

        with self.voiceover("Inside a long solenoid, the field is uniform and runs along the axis. Outside, it is "
                            "almost zero. A rectangular loop then gives B equals mu nought n I. A thousand turns "
                            "per metre carrying two amperes makes about two and a half millitesla.") as vo:
            self.clear_scene(0.5)
            xs = np.arange(-5.6, 0.5, 0.55)
            ytop, ybot = 1.1, -1.5
            tops = VGroup(*[wire_out(P(x, ytop), r=0.2) for x in xs])
            bots = VGroup(*[wire_in(P(x, ybot), r=0.2) for x in xs])
            inside = VGroup(*[arrow(P(-6.0, y), P(0.6, y), B_C, sw=4) for y in (0.45, -0.2, -0.85)])
            bl = M(r"\vec B", 34, color=B_C).next_to(inside[0], RIGHT, buff=0.15)
            rect = DashedVMobject(Rectangle(width=2.2, height=2.4, color=HL, stroke_width=4).move_to(P(-2.6, -0.2 + 1.0)),
                                  num_dashes=40)
            self.play(LaggedStart(*[FadeIn(t) for t in tops], lag_ratio=0.03),
                      LaggedStart(*[FadeIn(b) for b in bots], lag_ratio=0.03), run_time=1.2)
            self.play(LaggedStart(*[GrowArrow(a) for a in inside], lag_ratio=0.15), FadeIn(bl), run_time=1.0)
            out0 = T("B ≈ 0 outside", 24, color=MUTED).move_to(P(-2.6, 2.3))
            self.play(FadeIn(out0), run_time=0.5)
            self.play(Create(rect), run_time=0.8)
            e3 = M(r"B = \mu_0 n I", 56, color=PRIMARY).move_to(P(4.4, 1.0))
            e4 = M(r"(4\pi\times10^{-7})(1000)(2) \approx 2.5\times10^{-3}\ \text{T}", 34, color=GREEN)
            fit(e4, 4.8).next_to(e3, DOWN, buff=0.4)
            self.play(Write(e3), run_time=1.0)
            self.play(Write(e4), run_time=1.4)

    # ------------------------------------------------------------ scene 5: forces on conductors
    def s5(self):
        grid = into_grid(-6.4, 0.0, -3.0, 2.6)
        y = -0.6
        w = Line(P(-6.6, y), P(0.2, y), color=I_C, stroke_width=7)
        ia = arrow(P(-5.2, y - 0.45), P(-3.8, y - 0.45), I_C, sw=5)
        il = M("I", 32, color=I_C).next_to(ia, DOWN, buff=0.1)
        fa = arrow(P(-3.2, y + 0.1), P(-3.2, y + 1.9), F_C, sw=7)
        fl = M(r"\vec F", 34, color=F_C).next_to(fa, RIGHT, buff=0.1)
        e1 = M(r"\vec F = I\,\vec l\times\vec B", 54, color=PRIMARY).move_to(P(3.6, 2.2))
        with self.voiceover("A current is a stream of moving charges, so a wire carrying current through a field "
                            "feels a force: F equals I l cross B.") as vo:
            self.play(FadeIn(grid), Create(w), run_time=0.8)
            self.play(GrowArrow(ia), FadeIn(il), run_time=0.6)
            self.play(GrowArrow(fa), FadeIn(fl), run_time=0.7)
            self.play(Write(e1), run_time=1.1)

        with self.voiceover("Two parallel wires feel each other's fields. Currents in the same direction attract, "
                            "the opposite of like charges, with a force per metre of mu nought I one I two over two "
                            "pi d. Ten amperes in each, one centimetre apart, gives two millinewtons per "
                            "metre.") as vo:
            self.clear_scene(0.5)
            x1, x2 = -4.6, -2.0
            w1 = Line(P(x1, -3.0), P(x1, 2.4), color=I_C, stroke_width=7)
            w2 = Line(P(x2, -3.0), P(x2, 2.4), color=I_C, stroke_width=7)
            i1 = arrow(P(x1 - 0.4, -2.2), P(x1 - 0.4, -0.9), I_C, sw=5)
            i2 = arrow(P(x2 + 0.4, -2.2), P(x2 + 0.4, -0.9), I_C, sw=5)
            il1 = M(r"I_1", 30, color=I_C).next_to(i1, LEFT, buff=0.08)
            il2 = M(r"I_2", 30, color=I_C).next_to(i2, RIGHT, buff=0.08)
            fld = VGroup(*[x_mark(P(x2 + dx, yy), s=0.1, sw=3) for yy in (0.0, 1.0, 2.0) for dx in (-0.4, 0.4)])
            fldl = T("field of wire 1", 22, color=B_C).move_to(P(x2, 2.75))
            f1 = arrow(P(x1 + 0.08, 0.5), P(x1 + 1.0, 0.5), F_C, sw=6)
            f2 = arrow(P(x2 - 0.08, 0.5), P(x2 - 1.0, 0.5), F_C, sw=6)
            self.play(Create(w1), Create(w2), run_time=0.7)
            self.play(GrowArrow(i1), GrowArrow(i2), FadeIn(il1), FadeIn(il2), run_time=0.6)
            self.play(FadeIn(fld), FadeIn(fldl), run_time=0.6)
            self.play(GrowArrow(f1), GrowArrow(f2), run_time=0.8)
            att = T("same direction: attract", 28, color=GREEN).move_to(P(3.6, 2.6))
            e2 = M(r"\frac{F}{l} = \frac{\mu_0 I_1 I_2}{2\pi d}", 52).move_to(P(3.6, 1.0))
            e3 = M(r"\frac{(2\times10^{-7})(10)(10)}{0.01} = 2\times10^{-3}\ \text{N/m}", 34, color=GREEN)
            fit(e3, 6.6).move_to(P(3.6, -0.6))
            self.play(FadeIn(att), run_time=0.6)
            self.play(Write(e2), run_time=1.2)
            self.wait(vo.duration * 0.05)
            self.play(Write(e3), run_time=1.4)

    # ------------------------------------------------------------ scene 6: loops, torque and meters
    def s6(self):
        field = VGroup(*[arrow(P(-6.4, y), P(0.6, y), B_C, sw=3).set_opacity(0.55) for y in (-2.4, -1.2, 0, 1.2, 2.4)])
        fl = M(r"\vec B", 36, color=B_C).next_to(field[-1], RIGHT, buff=0.12)
        C = P(-2.9, 0.0)
        th = ValueTracker(70 * DEGREES)
        hl = 1.3

        def geom():
            v = th.get_value()
            u = np.array([np.cos(v + PI / 2), np.sin(v + PI / 2), 0])  # loop edge direction
            n = np.array([np.cos(v), np.sin(v), 0])  # normal = moment direction
            return u, n

        edge = always_redraw(lambda: Line(C - hl * geom()[0], C + hl * geom()[0], color=I_C, stroke_width=6))
        e_out = always_redraw(lambda: wire_out(C + hl * geom()[0], r=0.18))
        e_in = always_redraw(lambda: wire_in(C - hl * geom()[0], r=0.18))
        mom = always_redraw(lambda: arrow(C, C + 1.5 * geom()[1], PRIMARY, sw=6))
        moml = always_redraw(lambda: M(r"\vec m", 34, color=PRIMARY).move_to(C + 1.9 * geom()[1] + 0.3 * UP)
                             .add_background_rectangle(color=BG, opacity=1, buff=0.04))
        fo = always_redraw(lambda: arrow(C + hl * geom()[0] + 0.2 * UP, C + hl * geom()[0] + 1.2 * UP, F_C, sw=5))
        fi = always_redraw(lambda: arrow(C - hl * geom()[0] + 0.2 * DOWN, C - hl * geom()[0] + 1.2 * DOWN, F_C, sw=5))
        e1 = M(r"\vec m = N I \vec A", 50).move_to(P(4.0, 2.6))
        e2 = M(r"\vec\tau = \vec m\times\vec B", 50, color=PRIMARY).move_to(P(4.0, 1.2))
        e3 = M(r"U = -\vec m\cdot\vec B", 50).move_to(P(4.0, -0.2))
        e3n = T("same algebra as the electric dipole", 24, color=MUTED).next_to(e3, DOWN, buff=0.2)
        with self.voiceover("A current loop in a field behaves like a dipole. Its magnetic moment is N I A, pointing "
                            "along the loop's normal. The forces on opposite sides form a couple, so the torque is m "
                            "cross B, and the energy is minus m dot B: the same algebra as the electric "
                            "dipole.") as vo:
            self.play(LaggedStart(*[GrowArrow(f) for f in field], lag_ratio=0.1), FadeIn(fl), run_time=0.8)
            self.play(FadeIn(edge), FadeIn(e_out), FadeIn(e_in), run_time=0.6)
            self.play(FadeIn(mom), FadeIn(moml), Write(e1), run_time=1.0)
            self.play(FadeIn(fo), FadeIn(fi), run_time=0.6)
            self.play(Write(e2), run_time=1.0)
            self.play(th.animate.set_value(0.0), run_time=2.4, rate_func=smooth)
            self.play(Write(e3), FadeIn(e3n), run_time=1.0)
        for m in (edge, e_out, e_in, mom, moml, fo, fi):
            m.clear_updaters()

        with self.voiceover("A moving coil galvanometer turns that torque into a reading. To make an ammeter, put a "
                            "tiny shunt in parallel, so most of the current bypasses the coil. To make a voltmeter, "
                            "put a large resistance in series. An ammeter needs a small resistance, a voltmeter a "
                            "large one.") as vo:
            self.clear_scene(0.5)
            # ammeter
            ga = galvo(P(-3.6, 1.6))
            am = VGroup(wire(P(-6.0, 1.6), P(-3.92, 1.6)), wire(P(-3.28, 1.6), P(-1.2, 1.6)),
                        wire(P(-5.4, 1.6), P(-5.4, 0.6), P(-4.2, 0.6)), resistor(P(-4.2, 0.6), P(-3.0, 0.6)),
                        wire(P(-3.0, 0.6), P(-1.8, 0.6), P(-1.8, 1.6)))
            sl = M("S", 30).next_to(P(-3.6, 0.6), DOWN, buff=0.25)
            at = T("Ammeter", 30, color=PRIMARY, weight="BOLD").move_to(P(-3.6, 2.7))
            af = M(r"S = \frac{I_g G}{I - I_g}", 44).move_to(P(3.2, 2.0))
            an = M(r"0\text{--}5\ \text{A}:\ S \approx 0.01\ \Omega", 34, color=GREEN).next_to(af, DOWN, buff=0.35)
            # voltmeter
            gv = galvo(P(-4.6, -1.8))
            vm = VGroup(wire(P(-6.2, -1.8), P(-4.92, -1.8)), wire(P(-4.28, -1.8), P(-3.4, -1.8)),
                        resistor(P(-3.4, -1.8), P(-2.0, -1.8)), wire(P(-2.0, -1.8), P(-1.2, -1.8)))
            rl = M("R", 30).next_to(P(-2.7, -1.8), DOWN, buff=0.3)
            vt = T("Voltmeter", 30, color=SECONDARY, weight="BOLD").move_to(P(-3.6, -0.7))
            vf = M(r"R = \frac{V}{I_g} - G", 44).move_to(P(3.2, -1.8))
            self.play(FadeIn(at), FadeIn(ga), Create(am), FadeIn(sl), run_time=1.2)
            self.play(Write(af), run_time=1.0)
            self.play(FadeIn(an), run_time=0.6)
            self.wait(vo.duration * 0.05)
            self.play(FadeIn(vt), FadeIn(gv), Create(vm), FadeIn(rl), run_time=1.2)
            self.play(Write(vf), run_time=1.0)

    # ------------------------------------------------------------ scene 7: magnetism and matter
    def s7(self):
        ch = [(1.0, P(1.15, 0.0)), (-1.0, P(-1.15, 0.0))]
        sh = P(-2.6, -0.3)
        ch = [(q, c + sh) for q, c in ch]
        lines = VGroup()
        ctr = sh
        S_pos = ch[1][1]

        def mirror(pts, mx, my):
            out = []
            for p in pts:
                d = p - ctr
                out.append(ctr + np.array([d[0] * mx, d[1] * my, 0]))
            return out

        def add_line(pts, at):
            ln = VMobject(stroke_color=LINE_C, stroke_width=2.2).set_points_as_corners(pts)
            lines.add(VGroup(ln, arrowhead(pts, at, LINE_C)))

        for a in (0.1 * PI, 0.22 * PI, 0.36 * PI, 0.5 * PI, 0.64 * PI, 0.76 * PI):
            st = ch[0][1] + 0.3 * np.array([np.cos(a), np.sin(a), 0])
            pts = trace(ch, st, sign=1, box=(-16, 16, -12, 12), nmax=4000, stop_r=0.3)
            if len(pts) < 4:
                continue
            L = sum(np.linalg.norm(pts[j] - pts[j - 1]) for j in range(1, len(pts)))
            closes = np.linalg.norm(pts[-1] - S_pos) < 0.5
            at = 0.5 * L if closes else min(1.6, 0.5 * L)
            for my in (1, -1):
                add_line(mirror(pts, 1, my), at)
                if not closes:
                    rev = mirror(pts, -1, my)[::-1]
                    add_line(rev, L - at)
        mag = VGroup(Rectangle(width=1.6, height=0.9, color=POS_C, stroke_width=2).set_fill(POS_C, 1).move_to(sh + P(0.8, 0)),
                     Rectangle(width=1.6, height=0.9, color=NEG_C, stroke_width=2).set_fill(NEG_C, 1).move_to(sh + P(-0.8, 0)))
        nl = T("N", 30, color=WHITE, weight="BOLD").move_to(sh + P(1.25, 0))
        sl = T("S", 30, color=WHITE, weight="BOLD").move_to(sh + P(-1.25, 0))
        inner = VGroup(*[arrow(sh + P(-0.9, y), sh + P(0.9, y), WHITE, sw=3) for y in (-0.22, 0.22)])
        e1 = M(r"\oint \vec B\cdot d\vec A = 0", 48, color=PRIMARY).move_to(P(4.4, 2.8))
        e1n = T("no monopoles: lines close", 24, color=MUTED).next_to(e1, DOWN, buff=0.2)
        e1.add_background_rectangle(color=BG, opacity=0.95, buff=0.08)
        e1n.add_background_rectangle(color=BG, opacity=0.95, buff=0.06)
        with self.voiceover("A bar magnet is a magnetic dipole. Outside, its field lines have exactly the shape of an "
                            "electric dipole's. But they do not stop at the poles. They run on through the magnet and "
                            "close on themselves. There are no magnetic monopoles, so the magnetic flux out of any "
                            "closed surface is zero.") as vo:
            self.play(FadeIn(mag), FadeIn(nl), FadeIn(sl), run_time=0.6)
            self.play(LaggedStart(*[Create(l) for l in lines], lag_ratio=0.05), run_time=2.4)
            self.bring_to_front(mag, nl, sl)
            self.wait(vo.duration * 0.1)
            self.play(LaggedStart(*[GrowArrow(a) for a in inner], lag_ratio=0.2), run_time=0.8)
            self.play(Write(e1), FadeIn(e1n), run_time=1.2)

        with self.voiceover("Materials respond in three ways. Diamagnets are weakly pushed out of a field. "
                            "Paramagnets are weakly pulled in, less so when hot. Ferromagnets are pulled in "
                            "strongly, and keep their magnetism, tracing a hysteresis loop.") as vo:
            self.clear_scene(0.5)
            rows = VGroup(
                VGroup(T("diamagnetic", 30, color=SECONDARY, weight="BOLD"), M(r"\chi < 0", 40), T("weakly pushed out", 26, color=MUTED)),
                VGroup(T("paramagnetic", 30, color=PURPLE, weight="BOLD"), M(r"\chi = \frac{C}{T}", 40), T("weakly pulled in", 26, color=MUTED)),
                VGroup(T("ferromagnetic", 30, color=PRIMARY, weight="BOLD"), M(r"\chi \gg 1", 40), T("strongly pulled in, keeps it", 26, color=MUTED)),
            )
            for i, r in enumerate(rows):
                y = 2.2 - 1.3 * i
                r[0].move_to(P(-6.6 + r[0].width / 2, y))
                r[1].move_to(P(-2.4, y))
                r[2].move_to(P(-1.2 + r[2].width / 2, y)).shift(0 * RIGHT)
            for r in rows:
                r[2].shift(0.0 * RIGHT)
            ax = Axes(x_range=[-2, 2, 1], y_range=[-1.3, 1.3, 1], x_length=3.6, y_length=2.6,
                      axis_config={"color": MUTED, "include_ticks": False, "stroke_width": 2}).move_to(P(3.8, -2.0))
            up = ax.plot(lambda h: np.tanh(2.2 * (h + 0.6)), x_range=[-2, 2], color=PRIMARY, stroke_width=4)
            dn = ax.plot(lambda h: np.tanh(2.2 * (h - 0.6)), x_range=[-2, 2], color=PRIMARY, stroke_width=4)
            hx = M("H", 26, color=MUTED).next_to(ax.x_axis.get_end(), DOWN, buff=0.08)
            hy = M("B", 26, color=MUTED).next_to(ax.y_axis.get_end(), LEFT, buff=0.08)
            hyl = T("hysteresis", 22, color=PRIMARY).next_to(ax, LEFT, buff=0.2)
            for r in rows:
                self.play(FadeIn(r, shift=0.12 * UP), run_time=0.7)
                self.wait(vo.duration * 0.08)
            self.play(Create(ax), FadeIn(hx), FadeIn(hy), run_time=0.6)
            self.play(Create(up), Create(dn), FadeIn(hyl), run_time=1.2)

    # ------------------------------------------------------------ scene 8: recap
    def s8(self):
        title = T("Chapter 4 in five lines", 38, color=PRIMARY, weight="BOLD").move_to(P(0, 3.2))
        lines = [
            (r"\vec F = q\,\vec v\times\vec B", "sideways: bends, never speeds up"),
            (r"r = \frac{mv}{qB},\ \ T = \frac{2\pi m}{qB}", "the period ignores the speed"),
            (r"B = \frac{\mu_0 I}{2\pi d},\ \ \frac{\mu_0 I}{2R}", "fields circle their currents"),
            (r"\oint\vec B\cdot d\vec l = \mu_0 I_{\text{enc}}", "solenoid: B = μ₀nI"),
            (r"\vec F = I\vec l\times\vec B,\ \ \vec\tau = \vec m\times\vec B", "parallel currents attract"),
        ]
        rows = VGroup()
        for i, (tex, note) in enumerate(lines):
            m = M(tex, 38)
            n = fit(T(note, 26, color=MUTED), 5.4)
            num = T(f"{i + 1}.", 28, color=PRIMARY, weight="BOLD")
            rows.add(VGroup(num, m, n))
        for r in rows:
            r[0].move_to(P(-6.0, 0))
            r[1].next_to(r[0], RIGHT, buff=0.3)
            r[2].move_to(P(1.4 + r[2].width / 2, 0))
        rows.arrange(DOWN, buff=0.3, aligned_edge=LEFT).move_to(P(0, -0.1))
        for r in rows:
            r[2].move_to(P(1.4 + r[2].width / 2, r[1].get_y()))
        with self.voiceover("To recap. A magnetic field pushes moving charges sideways, so it bends their paths but "
                            "never speeds them up. They circle with a period that ignores their speed.") as vo:
            self.play(FadeIn(title), run_time=0.6)
            self.play(FadeIn(rows[0], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.3)
            self.play(FadeIn(rows[1], shift=0.15 * UP), run_time=0.7)
        with self.voiceover("Currents make fields that circle them. Ampère's law handles wires and solenoids in one "
                            "line. And currents feel forces too: parallel currents attract, and loops turn like "
                            "dipoles.") as vo:
            self.play(FadeIn(rows[2], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(rows[3], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(rows[4], shift=0.15 * UP), run_time=0.7)
        with self.voiceover("Try the mastery quiz. Steady currents make steady magnetic fields. Chapter five asks "
                            "the reverse: can a magnetic field make a current? Only if it changes.") as vo:
            nxt = T("Next: Chapter 5 · Electromagnetic Induction and AC", 30, color=PRIMARY).move_to(P(0, -3.4))
            self.wait(vo.duration * 0.3)
            self.play(FadeIn(nxt, shift=0.2 * UP), run_time=0.8)
