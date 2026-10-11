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


def coil(a, b, turns=6, r=0.45, color=INK, sw=4):
    """Side view of a coil from a to b (horizontal)."""
    L = b[0] - a[0]
    f = lambda t: P(a[0] + L * t + 0.12 * np.sin(2 * PI * turns * t), a[1] + r * np.cos(2 * PI * turns * t), 0)
    return ParametricFunction(f, t_range=[0, 1], color=color, stroke_width=sw)


def bar_magnet(c, w=1.6, h=0.6, north_up=False):
    if north_up:
        n = Rectangle(width=h, height=w / 2, color=POS_C, stroke_width=2).set_fill(POS_C, 1).move_to(c + P(0, w / 4))
        s = Rectangle(width=h, height=w / 2, color=NEG_C, stroke_width=2).set_fill(NEG_C, 1).move_to(c + P(0, -w / 4))
        nl = T("N", 24, color=WHITE, weight="BOLD").move_to(n)
        sl = T("S", 24, color=WHITE, weight="BOLD").move_to(s)
    else:
        n = Rectangle(width=h, height=w / 2, color=POS_C, stroke_width=2).set_fill(POS_C, 1).move_to(c + P(0, -w / 4))
        s = Rectangle(width=h, height=w / 2, color=NEG_C, stroke_width=2).set_fill(NEG_C, 1).move_to(c + P(0, w / 4))
        nl = T("N", 24, color=WHITE, weight="BOLD").move_to(n)
        sl = T("S", 24, color=WHITE, weight="BOLD").move_to(s)
    return VGroup(n, s, nl, sl)


class EmCh5Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Electricity & Magnetism",
            "Chapter 5 · Electromagnetic Induction and AC",
            "Chapter five. Electromagnetic induction, and alternating current.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7, self.s8):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ scene 1: Faraday and Lenz
    def s1(self):
        pipes = VGroup()
        for x in (-4.6, -1.6):
            pipes.add(Rectangle(width=1.1, height=6.4, color=ManimColor("#B8743A"), stroke_width=4)
                      .set_fill(ManimColor("#E8C4A0"), 0.35).move_to(P(x, -0.3)))
        slug = Rectangle(width=0.6, height=0.9, color=MUTED, stroke_width=2).set_fill(GREY_B, 1).move_to(P(-4.6, 2.4))
        mag = bar_magnet(P(-1.6, 2.4), w=0.9, h=0.6)
        l1 = T("steel slug", 24, color=MUTED).next_to(pipes[0], DOWN, buff=0.15)
        l2 = T("magnet", 24, color=PRIMARY).next_to(pipes[1], DOWN, buff=0.15)
        q = VGroup(T("Copper is not magnetic.", 34, color=PRIMARY, weight="BOLD"),
                   T("So what pushes back?", 34, color=PRIMARY, weight="BOLD")).arrange(DOWN, buff=0.2)
        fit(q, 6.2).move_to(P(3.4, 1.8))
        with self.voiceover("Drop a strong magnet down a copper pipe. Copper is not magnetic, and the magnet "
                            "touches nothing. Yet it drifts down slowly, as if through honey. Something in the "
                            "copper pushes back, but only while the magnet moves.") as vo:
            self.play(FadeIn(pipes), FadeIn(slug), FadeIn(mag), FadeIn(l1), FadeIn(l2), run_time=0.8)
            self.play(slug.animate.move_to(P(-4.6, -3.0)), mag.animate.move_to(P(-1.6, 1.2)), run_time=1.2,
                      rate_func=rate_functions.ease_in_quad)
            self.play(mag.animate.move_to(P(-1.6, -1.2)), run_time=3.5, rate_func=linear)
            self.play(FadeIn(q), run_time=0.7)

        with self.voiceover("Faraday found why. The magnetic flux through a loop is B A cos theta. When that flux "
                            "changes, an E M F appears round the loop: minus N, d phi by d t. Only the change "
                            "matters, not how much flux there is.") as vo:
            self.clear_scene(0.5)
            C = P(-3.4, -0.6)
            loop = Ellipse(width=3.2, height=1.0, color=I_C, stroke_width=6).move_to(C)
            bl = ValueTracker(0.6)
            arrows = always_redraw(lambda: VGroup(*[
                arrow(C + P(x, -1.4), C + P(x, -0.4 + 1.6 * bl.get_value()), B_C, sw=4)
                for x in (-1.0, -0.33, 0.33, 1.0)]))
            e1 = M(r"\Phi = BA\cos\theta", 50).move_to(P(3.4, 2.4))
            e2 = M(r"\mathcal E = -N\,\frac{d\Phi}{dt}", 56, color=PRIMARY).move_to(P(3.4, 0.9))
            e2n = T("only the change in flux matters", 26, color=GREEN).next_to(e2, DOWN, buff=0.3)
            self.play(Create(loop), FadeIn(arrows), run_time=0.8)
            self.play(Write(e1), run_time=1.0)
            self.play(bl.animate.set_value(1.6), run_time=1.6)
            self.play(Write(e2), run_time=1.2)
            self.play(FadeIn(e2n), run_time=0.6)
            arrows.clear_updaters()

        with self.voiceover("A hundred turns of area one hundredth of a square metre sit in half a tesla. If the "
                            "field falls to zero in a tenth of a second, the average E M F is five volts.") as vo:
            ex = M(r"\mathcal E = N\,\frac{\Delta\Phi}{\Delta t} = 100\times\frac{(0.5)(0.01)}{0.1} = 5\ \text{V}", 40,
                   color=GREEN)
            fit(ex, 7.0).move_to(P(3.4, -1.6))
            self.wait(vo.duration * 0.35)
            self.play(Write(ex), run_time=1.6)

        with self.voiceover("The minus sign is Lenz's law. The induced current always opposes the change that caused "
                            "it. Push a north pole towards a loop, and the loop makes its own north pole facing it, "
                            "pushing back. If it helped the change instead, you would get energy for "
                            "nothing.") as vo:
            self.clear_scene(0.5)
            C = P(-3.0, -1.6)
            loop = Ellipse(width=3.2, height=1.0, color=I_C, stroke_width=6).move_to(C)
            mg = bar_magnet(P(-3.0, 2.2), w=1.6, h=0.6, north_up=False)
            self.play(Create(loop), FadeIn(mg), run_time=0.8)
            self.play(mg.animate.move_to(P(-3.0, 0.9)), run_time=1.4)
            ipts = [C + np.array([1.85 * np.cos(t), 0.68 * np.sin(t), 0]) for t in np.linspace(1.1 * PI, 2.35 * PI, 80)]
            ipath = VMobject(stroke_color=I_C, stroke_width=5).set_points_smoothly(ipts)
            ind = VGroup(ipath, arrowhead(ipts, 1e9, I_C, size=0.16))
            up = arrow(C + 0.2 * UP, C + 1.1 * UP, F_C, sw=6)
            upl = T("loop's own field pushes back", 24, color=F_C).next_to(C, RIGHT, buff=1.9).shift(0.5 * UP)
            self.play(Create(ind), run_time=0.8)
            self.play(GrowArrow(up), FadeIn(upl), run_time=0.8)
            lenz = T("Lenz: the induced current opposes the change", 30, color=PRIMARY, weight="BOLD")
            fit(lenz, 7.0).move_to(P(3.2, 2.6))
            en = T("(otherwise: free energy)", 26, color=MUTED).next_to(lenz, DOWN, buff=0.2)
            self.play(FadeIn(lenz), run_time=0.7)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(en), run_time=0.6)

    # ------------------------------------------------------------ scene 2: motional emf
    def s2(self):
        grid = into_grid(-6.4, 1.6, -2.6, 1.8, step=0.8)
        top, bot = 1.6, -2.2
        rails = VGroup(Line(P(-5.6, top), P(2.2, top), color=INK, stroke_width=5),
                       Line(P(-5.6, bot), P(2.2, bot), color=INK, stroke_width=5),
                       wire(P(-5.6, top), P(-5.6, 0.2)), resistor(P(-5.6, 0.2), P(-5.6, -0.8)), wire(P(-5.6, -0.8), P(-5.6, bot)))
        rl = M("R", 32).next_to(P(-5.6, -0.3), LEFT, buff=0.3)
        x = ValueTracker(-3.0)
        rod = always_redraw(lambda: Line(P(x.get_value(), top + 0.25), P(x.get_value(), bot - 0.25), color=ManimColor("#7A5230"), stroke_width=10))
        v = always_redraw(lambda: arrow(P(x.get_value() + 0.15, -0.3), P(x.get_value() + 1.4, -0.3), V_C, sw=6))
        vl = always_redraw(lambda: M(r"\vec v", 32).next_to(P(x.get_value() + 1.4, -0.3), UP, buff=0.1))
        lb = always_redraw(lambda: BraceBetweenPoints(P(x.get_value() + 0.2, top), P(x.get_value() + 0.2, bot), direction=RIGHT,
                                                      color=MUTED).shift(0.0 * RIGHT))
        e1 = M(r"\mathcal E = Bvl", 56, color=PRIMARY).move_to(P(4.6, 2.4))
        with self.voiceover("Slide a metal rod along two rails through a magnetic field. The charges in the rod move "
                            "with it, so they feel q v cross B, and pile up at one end. The rod becomes a cell, with "
                            "an E M F of B v l.") as vo:
            self.play(FadeIn(grid), Create(rails), FadeIn(rl), run_time=1.0)
            self.play(FadeIn(rod), FadeIn(v), FadeIn(vl), run_time=0.6)
            self.play(x.animate.set_value(-1.2), run_time=2.4, rate_func=linear)
            pl = plus_sign(P(-1.2 - 0.35, top - 0.35), s=0.12)
            mi = minus_sign(P(-1.2 - 0.35, bot + 0.35), s=0.12)
            self.play(FadeIn(pl), FadeIn(mi), run_time=0.5)
            ll = M("l", 34, color=MUTED).move_to(P(-0.85, 0.75)).add_background_rectangle(color=BG, opacity=1, buff=0.05)
            self.play(Write(e1), FadeIn(ll), run_time=1.0)
            self.rod_bits = VGroup(pl, mi, ll)

        with self.voiceover("Current then flows, and the field pushes back on it, with a drag force of B squared l "
                            "squared v over R. Stand the rails upright and let the rod fall, and the drag grows "
                            "until it balances gravity. The rod reaches a terminal speed: m g R over B squared l "
                            "squared.") as vo:
            cur = Arc(radius=0.8, start_angle=PI / 2, angle=PI, arc_center=P(-3.4, -0.3), color=I_C, stroke_width=5)
            cur.stretch(2.0, 0).stretch(2.0, 1).move_to(P(-3.4, -0.3))
            cur.add_tip(tip_length=0.22)
            drag = arrow(P(-1.4, 0.6), P(-2.7, 0.6), F_C, sw=7)
            dl = M(r"F = \frac{B^2l^2v}{R}", 40, color=F_C).move_to(P(4.6, 1.0))
            self.play(Create(cur), run_time=0.8)
            self.play(GrowArrow(drag), Write(dl), run_time=1.2)
            vt = M(r"mg = \frac{B^2l^2v_t}{R} \;\Rightarrow\; v_t = \frac{mgR}{B^2l^2}", 38).move_to(P(4.4, -0.4))
            fit(vt, 5.2)
            ins = VGroup(Line(P(0.3, 2.05), P(0.3, 3.85), color=INK, stroke_width=4),
                         Line(P(1.5, 2.05), P(1.5, 3.85), color=INK, stroke_width=4),
                         Line(P(0.15, 3.1), P(1.65, 3.1), color=ManimColor("#7A5230"), stroke_width=8),
                         arrow(P(0.7, 3.05), P(0.7, 2.2), INK, sw=5), arrow(P(1.1, 3.15), P(1.1, 3.75), F_C, sw=5))
            insl = VGroup(M("mg", 26).next_to(P(0.7, 2.4), LEFT, buff=0.1),
                          T("upright rails", 22, color=MUTED).next_to(P(0.3, 3.5), LEFT, buff=0.15))
            self.wait(vo.duration * 0.05)
            self.play(FadeIn(ins), FadeIn(insl), run_time=0.8)
            self.play(Write(vt), run_time=1.4)
            ex = M(r"\frac{(0.01)(10)(1)}{(0.5)^2(0.2)^2} = 10\ \text{m/s}", 36, color=GREEN).next_to(vt, DOWN, buff=0.3)
            fit(ex, 5.2)
            self.play(FadeIn(ex), run_time=0.8)
        for m in (rod, v, vl, lb):
            m.clear_updaters()

        with self.voiceover("Energy is conserved the whole way: the mechanical power put in equals the I squared R "
                            "heating in the resistor. And the E M F is there even with no circuit at all. Only the "
                            "current needs one.") as vo:
            en = M(r"Fv = I^2R", 44, color=GREEN).move_to(P(4.4, -2.3))
            self.wait(vo.duration * 0.15)
            self.play(Write(en), run_time=1.0)
            nc = T("no circuit: still an EMF", 24, color=MUTED).next_to(en, DOWN, buff=0.2)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(nc), run_time=0.6)

    # ------------------------------------------------------------ scene 3: inductance
    def s3(self):
        cl = coil(P(-6.0, 0.4), P(-1.8, 0.4), turns=7, r=0.8, color=I_C)
        flux = VGroup(*[arrow(P(-6.6, y), P(-1.0, y), B_C, sw=3).set_opacity(0.7) for y in (0.1, 0.4, 0.7)])
        ia = arrow(P(-5.0, -0.9), P(-3.4, -0.9), I_C, sw=5)
        il = M("I", 30, color=I_C).next_to(ia, DOWN, buff=0.1)
        e1 = M(r"N\Phi = LI", 52).move_to(P(3.4, 2.4))
        e2 = M(r"\mathcal E = -L\,\frac{dI}{dt}", 54, color=PRIMARY).move_to(P(3.4, 0.9))
        with self.voiceover("A coil's current makes flux through its own turns. N phi equals L I, where L is the "
                            "self inductance. Change the current, and the coil fights back with an E M F of minus L, "
                            "d I by d t.") as vo:
            self.play(Create(cl), run_time=1.2)
            self.play(GrowArrow(ia), FadeIn(il), run_time=0.5)
            self.play(LaggedStart(*[GrowArrow(f) for f in flux], lag_ratio=0.15), run_time=0.8)
            self.wait(vo.duration * 0.1)
            self.play(Write(e1), run_time=1.0)
            self.play(Write(e2), run_time=1.2)

        with self.voiceover("So an inductor does not oppose current. It opposes a change in current. Switch off two "
                            "amperes in one millisecond, through fifty millihenries, and you get a hundred "
                            "volts.") as vo:
            n1 = T("opposes a change in current, not current", 26, color=GREEN).move_to(P(3.4, -0.3))
            fit(n1, 6.8)
            ex = M(r"(0.05)\,\frac{2}{0.001} = 100\ \text{V}", 44).move_to(P(3.4, -1.4))
            self.play(FadeIn(n1), run_time=0.7)
            self.wait(vo.duration * 0.2)
            self.play(Write(ex), run_time=1.2)

        with self.voiceover("Building up that current stores energy, one half L I squared, held in the magnetic "
                            "field.") as vo:
            u = M(r"U = \tfrac12 LI^2,\qquad u = \frac{B^2}{2\mu_0}", 44, color=PURPLE).move_to(P(1.0, -2.9))
            self.play(Write(u), run_time=1.4)

    # ------------------------------------------------------------ scene 4: LR and LC
    def s4(self):
        ax = Axes(x_range=[0, 5.8, 1], y_range=[0, 1.15, 0.5], x_length=7.0, y_length=3.8,
                  axis_config={"color": MUTED, "include_ticks": False, "stroke_width": 3}).move_to(P(-2.6, -0.9))
        tl = M("t", 32, color=MUTED).next_to(ax.x_axis.get_end(), DOWN, buff=0.12)
        ticks = VGroup(*[M(rf"{n}\tau" if n > 1 else r"\tau", 26, color=MUTED).next_to(ax.c2p(n, 0), DOWN, buff=0.12)
                         for n in range(1, 6)])
        cv = ax.plot(lambda t: 1 - np.exp(-t), x_range=[0, 5.2], color=PRIMARY, stroke_width=5)
        top = DashedLine(ax.c2p(0, 1), ax.c2p(5.2, 1), color=MUTED, stroke_width=2)
        tlab = M(r"\frac{\mathcal E}{R}", 34, color=MUTED).next_to(ax.c2p(0, 1), LEFT, buff=0.15)
        e1 = M(r"i = \frac{\mathcal E}{R}\left(1 - e^{-Rt/L}\right)", 46).move_to(P(3.8, 2.6))
        fit(e1, 6.2)
        e2 = M(r"\tau = \frac{L}{R}", 50, color=PRIMARY).move_to(P(3.8, 1.2))
        e3 = T("switch-on: open.  steady state: a wire.", 24, color=MUTED).move_to(P(3.8, 0.2))
        fit(e3, 6.2)
        with self.voiceover("Switch a battery on across an inductor and a resistor. The current cannot jump, "
                            "because that would need an infinite E M F. So it climbs: E over R, times one minus e "
                            "to the minus R t over L, with time constant L over R.") as vo:
            self.play(Create(ax), FadeIn(tl), FadeIn(ticks), Create(top), FadeIn(tlab), run_time=0.8)
            self.play(Create(cv), run_time=2.0)
            self.play(Write(e1), run_time=1.3)
            self.play(Write(e2), run_time=0.8)
            self.play(FadeIn(e3), run_time=0.6)

        with self.voiceover("Now connect a charged capacitor to an inductor. The energy sloshes back and forth: all "
                            "in the capacitor's electric field, then all in the inductor's magnetic field, then "
                            "back again. It is the electrical spring and mass, oscillating at omega equals one over "
                            "root L C.") as vo:
            self.clear_scene(0.5)
            ph = ValueTracker(0.0)
            base = -2.2
            H = 3.6
            bc = always_redraw(lambda: Rectangle(width=1.2, height=max(H * np.cos(ph.get_value()) ** 2, 0.01),
                                                 color=E_C, stroke_width=0).set_fill(E_C, 0.9)
                               .move_to(P(-4.6, base + H * np.cos(ph.get_value()) ** 2 / 2)))
            bL = always_redraw(lambda: Rectangle(width=1.2, height=max(H * np.sin(ph.get_value()) ** 2, 0.01),
                                                 color=B_C, stroke_width=0).set_fill(B_C, 0.9)
                               .move_to(P(-2.6, base + H * np.sin(ph.get_value()) ** 2 / 2)))
            frame = VGroup(Line(P(-5.6, base), P(-1.6, base), color=MUTED, stroke_width=3),
                           DashedLine(P(-5.6, base + H), P(-1.6, base + H), color=GRID, stroke_width=2))
            lc = M(r"\frac{q^2}{2C}", 36, color=E_C).next_to(P(-4.6, base), DOWN, buff=0.2)
            ll = M(r"\tfrac12 Li^2", 36, color=B_C).next_to(P(-2.6, base), DOWN, buff=0.2)
            tot = T("total energy constant", 24, color=MUTED).next_to(frame[1], UP, buff=0.15)
            self.play(Create(frame), FadeIn(bc), FadeIn(bL), FadeIn(lc), FadeIn(ll), FadeIn(tot), run_time=0.8)
            w = M(r"\omega = \frac{1}{\sqrt{LC}}", 56, color=PRIMARY).move_to(P(3.4, 1.4))
            sp = T("electrical spring and mass", 26, color=MUTED).next_to(w, DOWN, buff=0.3)
            self.play(ph.animate.set_value(PI / 2), run_time=1.8, rate_func=smooth)
            self.play(ph.animate.set_value(PI), run_time=1.8, rate_func=smooth)
            self.play(Write(w), FadeIn(sp), ph.animate.set_value(1.5 * PI), run_time=1.8, rate_func=smooth)
            self.play(ph.animate.set_value(2 * PI), run_time=1.8, rate_func=smooth)
            bc.clear_updaters()
            bL.clear_updaters()

    # ------------------------------------------------------------ scene 5: AC and phasors
    def s5(self):
        C = P(-4.6, -0.2)
        R = 1.5
        t = ValueTracker(0.0)
        circle = Circle(radius=R, color=GRID, stroke_width=3).move_to(C)
        ax = Axes(x_range=[0, 2 * TAU, PI], y_range=[-1.2, 1.2, 1], x_length=7.6, y_length=3.6,
                  axis_config={"color": MUTED, "include_ticks": False, "stroke_width": 2}).move_to(P(2.4, -0.2))
        ax.shift((C[1] - ax.c2p(0, 0)[1]) * UP)

        def tip():
            a = t.get_value()
            return C + R * np.array([np.cos(a), np.sin(a), 0])

        ph = always_redraw(lambda: arrow(C, tip(), PRIMARY, sw=6))
        hline = always_redraw(lambda: DashedLine(tip(), ax.c2p(t.get_value(), np.sin(t.get_value()) * 1.0) * np.array([1, 0, 0])
                                                 + np.array([0, tip()[1], 0]), color=MUTED, stroke_width=2))
        wave = always_redraw(lambda: ax.plot(lambda x: np.sin(x), x_range=[0, max(t.get_value(), 0.01)], color=PRIMARY,
                                             stroke_width=4))
        lab = M(r"v = V_0\sin\omega t", 44, color=PRIMARY).move_to(P(2.4, 2.6))
        v0 = M(r"V_0", 30, color=PRIMARY).next_to(C + R * UP, UP, buff=0.1)
        with self.voiceover("An alternating voltage is the shadow of a turning arrow. A phasor of length V nought "
                            "spins at omega, and its height traces V nought sin omega t.") as vo:
            self.play(Create(circle), Create(ax), FadeIn(v0), run_time=0.8)
            self.add(ph, hline, wave)
            self.play(Write(lab), run_time=0.8)
            self.play(t.animate.set_value(2 * TAU), run_time=max(vo.duration - 1.8, 3.0), rate_func=linear)
        for m in (ph, hline, wave):
            m.clear_updaters()

        with self.voiceover("Over a full cycle the average is zero. What sets the heating is the root mean square, V "
                            "nought over root two. Indian mains is two hundred and twenty volts r m s, so the peak "
                            "is about three hundred and eleven volts.") as vo:
            self.clear_scene(0.5)
            e1 = M(r"\bar v_{\text{cycle}} = 0", 48).move_to(P(0, 2.2))
            e2 = M(r"V_{\text{rms}} = \frac{V_0}{\sqrt2}", 56, color=PRIMARY).move_to(P(0, 0.6))
            e3 = M(r"V_0 = \sqrt2\times220 \approx 311\ \text{V}", 46, color=GREEN).move_to(P(0, -1.0))
            self.play(Write(e1), run_time=1.0)
            self.wait(vo.duration * 0.1)
            self.play(Write(e2), run_time=1.2)
            self.wait(vo.duration * 0.15)
            self.play(Write(e3), run_time=1.2)

        with self.voiceover("A resistor keeps the current in step with the voltage. In an inductor the current lags "
                            "by ninety degrees, and the reactance is omega L. In a capacitor the current leads by "
                            "ninety degrees, and the reactance is one over omega C.") as vo:
            self.clear_scene(0.5)
            panels = VGroup()
            specs = [("R", 30, 30, r"\text{in phase}", r"R"), ("L", 90, 0, r"I \text{ lags}", r"X_L = \omega L"),
                     ("C", 0, 90, r"I \text{ leads}", r"X_C = \frac{1}{\omega C}")]
            for i, (name, av, ai, note, react) in enumerate(specs):
                O = P(-4.4 + 4.4 * i, -0.4)
                hdr = T(name, 34, color=INK, weight="BOLD").move_to(O + P(0, 2.9))
                va = arrow(O, O + 1.9 * np.array([np.cos(av * DEGREES), np.sin(av * DEGREES), 0]), PRIMARY, sw=6)
                ia = arrow(O, O + 1.3 * np.array([np.cos(ai * DEGREES), np.sin(ai * DEGREES), 0]), SECONDARY, sw=6)
                if name == "R":
                    ia = arrow(O + 0.12 * np.array([-np.sin(av * DEGREES), np.cos(av * DEGREES), 0]),
                               O + 0.12 * np.array([-np.sin(av * DEGREES), np.cos(av * DEGREES), 0])
                               + 1.3 * np.array([np.cos(ai * DEGREES), np.sin(ai * DEGREES), 0]), SECONDARY, sw=6)
                vl = M("V", 30, color=PRIMARY).next_to(va.get_end(), UR, buff=0.05)
                il = M("I", 30, color=SECONDARY).next_to(ia.get_end(), DR if ai == 0 else UL, buff=0.05)
                nt = M(note, 34).move_to(O + P(0, -1.3))
                rt = M(react, 38, color=PURPLE).move_to(O + P(0, -2.3))
                panels.add(VGroup(hdr, va, ia, vl, il, nt, rt))
            for p in panels:
                self.play(FadeIn(p[0]), GrowArrow(p[1]), GrowArrow(p[2]), FadeIn(p[3]), FadeIn(p[4]), run_time=0.8)
                self.play(FadeIn(p[5]), FadeIn(p[6]), run_time=0.6)
                self.wait(vo.duration * 0.08)

    # ------------------------------------------------------------ scene 6: series LCR
    def s6(self):
        O = P(-4.8, 0.4)
        s = 1.0
        VR, VL, VC = 1.15, 0.36, 3.66  # to scale: R = 100, X_L = 31.4, X_C = 318.3 ohm
        iref = arrow(O, O + 0.8 * RIGHT, SECONDARY, sw=5).shift(0.4 * UP)
        ilab = M("I", 28, color=SECONDARY).next_to(iref, UP, buff=0.08)
        vr = arrow(O, O + s * VR * RIGHT, PRIMARY, sw=6)
        vl = arrow(O, O + s * VL * UP, PURPLE, sw=6)
        vc = arrow(O, O + s * VC * DOWN, E_C, sw=6)
        lr = M(r"V_R", 30, color=PRIMARY).next_to(vr.get_end(), UR, buff=0.05)
        ll = M(r"V_L", 30, color=PURPLE).next_to(vl.get_end(), LEFT, buff=0.1)
        lc = M(r"V_C", 30, color=E_C).next_to(vc.get_end(), LEFT, buff=0.1)
        with self.voiceover("In a series L C R circuit, the same current flows through all three, so draw it as the "
                            "reference. V R lies along the current. V L points ninety degrees ahead, and V C ninety "
                            "degrees behind. They add as arrows, not as numbers.") as vo:
            self.play(GrowArrow(iref), FadeIn(ilab), run_time=0.6)
            self.play(GrowArrow(vr), FadeIn(lr), run_time=0.7)
            self.play(GrowArrow(vl), FadeIn(ll), run_time=0.7)
            self.play(GrowArrow(vc), FadeIn(lc), run_time=0.7)
            net = arrow(O + s * VR * RIGHT, O + s * VR * RIGHT + s * (VL - VC) * UP, PURPLE, sw=5)
            netl = M(r"V_L - V_C", 28, color=PURPLE).next_to(net, RIGHT, buff=0.1)
            res = arrow(O, O + s * VR * RIGHT + s * (VL - VC) * UP, INK, sw=7)
            resl = M(r"V", 34).next_to(res.get_center(), RIGHT, buff=0.08)
            ang = Arc(radius=0.8, start_angle=0, angle=np.arctan2(VL - VC, VR), arc_center=O, color=HL, stroke_width=4)
            phl = M(r"\phi", 32, color=HL).move_to(O + 1.05 * np.array([np.cos(-0.62), np.sin(-0.62), 0]))
            self.wait(vo.duration * 0.05)
            self.play(GrowArrow(net), FadeIn(netl), run_time=0.8)
            self.play(GrowArrow(res), FadeIn(resl), Create(ang), FadeIn(phl), run_time=0.9)

        with self.voiceover("So the impedance is the square root of R squared plus X L minus X C, squared, and tan "
                            "phi is X L minus X C, over R. With a hundred ohms, a tenth of a henry and ten "
                            "microfarads at fifty hertz, Z is about three hundred and four ohms, and the circuit is "
                            "capacitive.") as vo:
            e1 = M(r"Z = \sqrt{R^2 + (X_L - X_C)^2}", 44, color=PRIMARY).move_to(P(3.4, 2.7))
            e2 = M(r"\tan\phi = \frac{X_L - X_C}{R}", 42).move_to(P(3.4, 1.5))
            e3 = M(r"X_L = 31.4\ \Omega,\quad X_C = 318.3\ \Omega", 34).move_to(P(3.4, 0.3))
            e4 = M(r"Z \approx 304\ \Omega,\quad \phi \approx -70.8^\circ", 38, color=GREEN).move_to(P(3.4, -0.7))
            e4n = T("capacitive: current leads", 24, color=MUTED).next_to(e4, DOWN, buff=0.2)
            self.play(Write(e1), run_time=1.2)
            self.play(Write(e2), run_time=1.0)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(e3), run_time=0.8)
            self.play(Write(e4), FadeIn(e4n), run_time=1.2)

        with self.voiceover("At one frequency, X L equals X C. That is resonance, at omega nought equals one over "
                            "root L C. Z falls to just R, and the current peaks. Here that is about a hundred and "
                            "fifty nine hertz. A smaller resistance gives a sharper peak.") as vo:
            self.clear_scene(0.5)
            Lh, Cf = 0.1, 10e-6

            def irms(f, Rr):
                return 10.0 / np.sqrt(Rr ** 2 + (2 * PI * f * Lh - 1 / (2 * PI * f * Cf)) ** 2)

            ax = Axes(x_range=[50, 300, 50], y_range=[0, 0.55, 0.1], x_length=8.4, y_length=4.4,
                      axis_config={"color": MUTED, "include_ticks": False, "stroke_width": 3}).move_to(P(-1.2, -0.7))
            fl = M("f", 32, color=MUTED).next_to(ax.x_axis.get_end(), DOWN, buff=0.12)
            il = M("I", 32, color=MUTED).next_to(ax.y_axis.get_end(), LEFT, buff=0.12)
            c1 = ax.plot(lambda f: irms(f, 20), x_range=[50, 300, 0.5], color=PRIMARY, stroke_width=5)
            c2 = ax.plot(lambda f: irms(f, 60), x_range=[50, 300, 0.5], color=SECONDARY, stroke_width=4)
            l1 = M(r"R = 20\ \Omega", 30, color=PRIMARY).next_to(ax.c2p(175, irms(175, 20)), RIGHT, buff=0.15)
            l2 = M(r"R = 60\ \Omega", 30, color=SECONDARY).next_to(ax.c2p(215, irms(215, 60)), UR, buff=0.1)
            f0 = 1 / (2 * PI * np.sqrt(Lh * Cf))
            vline = DashedLine(ax.c2p(f0, 0), ax.c2p(f0, 0.5), color=HL, stroke_width=3)
            f0l = M(r"f_0 \approx 159\ \text{Hz}", 32, color=HL).next_to(ax.c2p(f0, 0), DOWN, buff=0.15)
            e5 = M(r"\omega_0 = \frac{1}{\sqrt{LC}}", 48, color=PRIMARY).move_to(P(4.6, 2.6))
            e6 = M(r"Z = R", 44).move_to(P(4.6, 1.2))
            self.play(Write(e5), run_time=1.0)
            self.play(Create(ax), FadeIn(fl), FadeIn(il), run_time=0.8)
            self.play(Create(c2), FadeIn(l2), run_time=1.2)
            self.play(Create(c1), FadeIn(l1), run_time=1.2)
            self.play(Create(vline), FadeIn(f0l), Write(e6), run_time=0.9)

    # ------------------------------------------------------------ scene 7: power, transformers, EM waves
    def s7(self):
        e1 = M(r"P = V_{\text{rms}}\,I_{\text{rms}}\cos\phi", 56, color=PRIMARY).move_to(P(0, 2.2))
        e1n = T("pure L or C: cos φ = 0, so no power (wattless current)", 26, color=MUTED).next_to(e1, DOWN, buff=0.3)
        fit(e1n, 12.0)
        with self.voiceover("Power in an A C circuit is V r m s, times I r m s, times cos phi. In a pure inductor or "
                            "capacitor, cos phi is zero, and the current does no work at all.") as vo:
            self.play(Write(e1), run_time=1.4)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(e1n), run_time=0.8)

        with self.voiceover("A transformer uses mutual induction. The voltages are in the ratio of the turns, and the "
                            "currents in the inverse ratio, so the power stays the same. A step up transformer "
                            "raises the voltage, not the power.") as vo:
            self.clear_scene(0.5)
            core = VGroup(Rectangle(width=4.4, height=3.6, color=MUTED, stroke_width=0).set_fill(GREY_B, 0.6),
                          Rectangle(width=2.4, height=1.6, color=BG, stroke_width=0).set_fill(BG, 1)).move_to(P(-3.4, -0.3))
            pc = ParametricFunction(lambda t: P(-5.1 + 0.42 * np.cos(2 * PI * 4 * t), -1.3 + 2.0 * t + 0.06 * np.sin(2 * PI * 4 * t), 0),
                                    t_range=[0, 1], color=PRIMARY, stroke_width=4)
            sc = ParametricFunction(lambda t: P(-1.7 + 0.42 * np.cos(2 * PI * 8 * t), -1.3 + 2.0 * t + 0.03 * np.sin(2 * PI * 8 * t), 0),
                                    t_range=[0, 1], color=SECONDARY, stroke_width=3)
            pl = T("primary", 24, color=PRIMARY).next_to(core, LEFT, buff=0.1).shift(1.4 * UP)
            sl = T("secondary", 24, color=SECONDARY).next_to(core, RIGHT, buff=0.1).shift(1.4 * UP)
            self.play(FadeIn(core), run_time=0.6)
            self.play(Create(pc), Create(sc), FadeIn(pl), FadeIn(sl), run_time=1.4)
            e2 = M(r"\frac{V_s}{V_p} = \frac{N_s}{N_p} = \frac{I_p}{I_s}", 52, color=PRIMARY).move_to(P(3.4, 1.4))
            e3 = M(r"V_pI_p = V_sI_s", 44, color=GREEN).move_to(P(3.4, -0.2))
            e3n = T("step up: more volts, same power", 24, color=MUTED).next_to(e3, DOWN, buff=0.2)
            self.play(Write(e2), run_time=1.4)
            self.wait(vo.duration * 0.1)
            self.play(Write(e3), FadeIn(e3n), run_time=1.0)

        with self.voiceover("That is why power lines run at high voltage. Delivering forty four kilowatts through two "
                            "ohms of line at two hundred and twenty volts would waste eighty kilowatts. At eleven "
                            "kilovolts, the loss is just thirty two watts.") as vo:
            self.clear_scene(0.5)
            r1 = M(r"220\ \text{V}:\ I = 200\ \text{A},\ \ I^2R = 80\ \text{kW}", 46, color=WARN).move_to(P(0, 1.2))
            r2 = M(r"11\ \text{kV}:\ I = 4\ \text{A},\ \ I^2R = 32\ \text{W}", 46, color=GREEN).move_to(P(0, -0.3))
            hd = M(r"P = 44\ \text{kW},\ \ R_{\text{line}} = 2\ \Omega", 40).move_to(P(0, 2.7))
            self.play(FadeIn(hd), run_time=0.6)
            self.wait(vo.duration * 0.15)
            self.play(Write(r1), run_time=1.4)
            self.wait(vo.duration * 0.05)
            self.play(Write(r2), run_time=1.4)

        with self.voiceover("Last, a changing electric field makes a magnetic field too. Changing fields regenerate "
                            "each other, and travel as a wave at one over root mu nought epsilon nought: the speed of "
                            "light.") as vo:
            self.clear_scene(0.5)
            y0 = -0.6
            k = 1.3
            axis = Arrow(P(-6.6, y0), P(6.6, y0), buff=0, color=MUTED, stroke_width=3)
            Ew = VGroup(*[Line(P(x, y0), P(x, y0 + 1.6 * np.sin(k * x)), color=PRIMARY, stroke_width=3)
                          for x in np.arange(-6.4, 6.4, 0.2)])
            Ec = ParametricFunction(lambda x: P(x, y0 + 1.6 * np.sin(k * x), 0), t_range=[-6.4, 6.4], color=PRIMARY, stroke_width=4)
            sk = np.array([0.45, -0.55, 0])  # oblique direction for the out-of-page axis
            Bw = VGroup(*[Line(P(x, y0), P(x, y0) + 1.6 * np.sin(k * x) * sk, color=B_C, stroke_width=3)
                          for x in np.arange(-6.4, 6.4, 0.2)])
            Bc = ParametricFunction(lambda x: P(x, y0, 0) + 1.6 * np.sin(k * x) * sk, t_range=[-6.4, 6.4], color=B_C, stroke_width=4)
            El = M(r"\vec E", 36, color=PRIMARY).move_to(P(-5.6, y0 + 2.0))
            Bl = M(r"\vec B", 36, color=B_C).move_to(P(-5.0, y0 - 1.6))
            cl = M(r"c = \frac{1}{\sqrt{\mu_0\varepsilon_0}} \approx 3\times10^{8}\ \text{m/s}", 46, color=PRIMARY).move_to(P(1.6, 2.9))
            e0 = M(r"E_0 = cB_0", 36).move_to(P(4.6, -2.9))
            self.play(Create(axis), run_time=0.5)
            self.play(Create(Ec), FadeIn(Ew), FadeIn(El), run_time=1.2)
            self.play(Create(Bc), FadeIn(Bw), FadeIn(Bl), run_time=1.2)
            self.play(Write(cl), run_time=1.4)
            self.play(FadeIn(e0), run_time=0.6)

    # ------------------------------------------------------------ scene 8: recap
    def s8(self):
        title = T("Chapter 5 in five lines", 38, color=PRIMARY, weight="BOLD").move_to(P(0, 3.2))
        lines = [
            (r"\mathcal E = -N\frac{d\Phi}{dt}", "only change counts; Lenz opposes it"),
            (r"\mathcal E = Bvl,\ \ F = \frac{B^2l^2v}{R}", "rods on rails; terminal speed"),
            (r"\mathcal E = -L\frac{dI}{dt},\ \ \tau = \frac{L}{R}", "inductor current never jumps"),
            (r"V_{\text{rms}} = \frac{V_0}{\sqrt2},\ \ Z = \sqrt{R^2 + (X_L - X_C)^2}", "phasors add as arrows"),
            (r"P = V_{\text{rms}}I_{\text{rms}}\cos\phi", "transform up, transmit, transform down"),
        ]
        rows = VGroup()
        for i, (tex, note) in enumerate(lines):
            m = M(tex, 36)
            n = fit(T(note, 25, color=MUTED), 5.4)
            num = T(f"{i + 1}.", 28, color=PRIMARY, weight="BOLD")
            rows.add(VGroup(num, m, n))
        for r in rows:
            r[0].move_to(P(-6.0, 0))
            r[1].next_to(r[0], RIGHT, buff=0.3)
            r[2].move_to(P(1.5 + r[2].width / 2, 0))
        rows.arrange(DOWN, buff=0.3, aligned_edge=LEFT).move_to(P(0, -0.1))
        for r in rows:
            r[2].move_to(P(1.5 + r[2].width / 2, r[1].get_y()))
        with self.voiceover("To recap. A changing flux makes an E M F, and Lenz's law sets its direction. A moving "
                            "rod is a cell, with a drag that brings it to a terminal speed.") as vo:
            self.play(FadeIn(title), run_time=0.6)
            self.play(FadeIn(rows[0], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.3)
            self.play(FadeIn(rows[1], shift=0.15 * UP), run_time=0.7)
        with self.voiceover("An inductor's current never jumps. Alternating voltages are turning phasors that add as "
                            "arrows. And transformers let us send power at high voltage.") as vo:
            self.play(FadeIn(rows[2], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(rows[3], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(rows[4], shift=0.15 * UP), run_time=0.7)
        with self.voiceover("Try the mastery quiz. Changing fields making each other gave us the electromagnetic "
                            "wave, and that wave is light. The optics course picks up the story from "
                            "there.") as vo:
            nxt = T("Next course: Optics and Modern Physics", 32, color=PRIMARY).move_to(P(0, -3.4))
            self.wait(vo.duration * 0.3)
            self.play(FadeIn(nxt, shift=0.2 * UP), run_time=0.8)
