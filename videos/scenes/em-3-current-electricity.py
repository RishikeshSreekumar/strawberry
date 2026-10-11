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


def P(x, y):
    return np.array([x, y, 0.0])


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


class EmCh3Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Electricity & Magnetism",
            "Chapter 3 · Current Electricity",
            "Chapter three. Current electricity.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7, self.s8):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ scene 1: drift
    def s1(self):
        tube = RoundedRectangle(width=12.6, height=2.4, corner_radius=0.4, color=MUTED, stroke_width=3)
        tube.set_fill(ManimColor("#F1E6DE"), 1).move_to(P(0, -0.2))
        rng = np.random.default_rng(7)
        ions = VGroup(*[plus_sign(P(x, y), s=0.08, color=MUTED, sw=3)
                        for x in np.arange(-5.8, 6.0, 0.9) for y in (-0.9, -0.2, 0.5)])
        starts = [P(rng.uniform(-5.8, 5.8), rng.uniform(-1.0, 0.6)) for _ in range(18)]
        drift = ValueTracker(0.0)
        phase = ValueTracker(0.0)
        offs = [rng.uniform(0, TAU, 2) for _ in starts]

        def electrons():
            g = VGroup()
            for s, (a, b) in zip(starts, offs):
                t = phase.get_value()
                jig = P(0.35 * np.sin(3.1 * t + a), 0.3 * np.sin(2.3 * t + b))
                x = s[0] - drift.get_value() + jig[0]
                x = (x + 6.0) % 12.0 - 6.0
                y = np.clip(s[1] + jig[1], -1.15, 0.75)
                g.add(Dot(P(x, y), radius=0.09, color=NEG_C))
            return g

        els = always_redraw(electrons)
        q = T("The bulb lights at once. The electrons barely move.", 32, color=PRIMARY, weight="BOLD")
        fit(q, 12.5).move_to(P(0, 3.2))
        with self.voiceover("Flip a switch and the bulb lights at once. Yet the electrons in the wire crawl along at "
                            "about a tenth of a millimetre per second. How can both be true?") as vo:
            self.play(FadeIn(tube), FadeIn(ions), run_time=0.7)
            self.add(els)
            self.play(phase.animate.set_value(6.0), run_time=3.0, rate_func=linear)
            self.play(FadeIn(q, shift=0.15 * DOWN), phase.animate.set_value(9.0), run_time=1.5, rate_func=linear)

        Ea = arrow(P(-2.0, 1.75), P(2.0, 1.75), E_C, sw=6)
        El = M(r"\vec E", 38, color=E_C).next_to(Ea, RIGHT, buff=0.15)
        vd = arrow(P(1.2, -1.95), P(-1.2, -1.95), NEG_C, sw=6)
        vdl = M(r"v_d", 36, color=NEG_C).next_to(vd, LEFT, buff=0.15)
        f1 = M(r"v_d = \frac{eE\tau}{m}", 48).move_to(P(4.4, -2.9))
        with self.voiceover("Inside a metal, free electrons dash about at random, bumping into the ions. Switch on "
                            "a field, and they pick up a small, steady drift against it: v d equals e E tau over m, "
                            "where tau is the time between collisions.") as vo:
            self.play(phase.animate.set_value(13.0), run_time=2.0, rate_func=linear)
            self.play(GrowArrow(Ea), FadeIn(El), run_time=0.6)
            self.play(phase.animate.set_value(19.0), drift.animate.set_value(2.5), run_time=3.0, rate_func=linear)
            self.play(GrowArrow(vd), FadeIn(vdl), Write(f1), run_time=1.2)
        els.clear_updaters()

        with self.voiceover("The current is the charge passing each second: I equals n e A v d. For one point five "
                            "amperes in a one square millimetre copper wire, the drift is about a tenth of a "
                            "millimetre per second. The bulb lights at once because the field spreads through the "
                            "wire at nearly the speed of light, and pushes every electron together.") as vo:
            self.clear_scene(0.5)
            e1 = M(r"I = neAv_d", 60, color=PRIMARY).move_to(P(0, 2.2))
            e2 = M(r"v_d = \frac{1.5}{(8.5\times10^{28})(1.6\times10^{-19})(10^{-6})} \approx 1.1\times10^{-4}\ \text{m/s}", 40)
            fit(e2, 12.5).move_to(P(0, 0.5))
            e3 = T("drift: slow.   field (the signal): nearly the speed of light.", 28, color=GREEN)
            fit(e3, 12.0).move_to(P(0, -1.4))
            self.play(Write(e1), run_time=1.0)
            self.play(Write(e2), run_time=2.0)
            self.wait(vo.duration * 0.15)
            self.play(FadeIn(e3, shift=0.15 * UP), run_time=0.8)

    # ------------------------------------------------------------ scene 2: Ohm's law and resistivity
    def s2(self):
        wire_r = Rectangle(width=4.0, height=0.8, color=INK, stroke_width=3).set_fill(ManimColor("#E9C9A8"), 1)
        wire_r.move_to(P(-3.6, 1.2))
        lb = BraceBetweenPoints(wire_r.get_corner(DL), wire_r.get_corner(DR), direction=DOWN, color=MUTED)
        ll = M("l", 34, color=MUTED).next_to(lb, DOWN, buff=0.1)
        al = M("A", 34, color=MUTED).next_to(wire_r, LEFT, buff=0.2)
        e1 = M(r"V = IR", 60, color=PRIMARY).move_to(P(3.2, 2.4))
        e2 = M(r"R = \frac{\rho\, l}{A}", 56).move_to(P(3.2, 0.9))
        e2n = T("ρ: material and temperature", 24, color=MUTED).next_to(e2, DOWN, buff=0.2)
        with self.voiceover("The drift is proportional to the field, so the current is proportional to the voltage. "
                            "That is Ohm's law, V equals I R, with R equal to rho l over A. The resistivity, rho, "
                            "depends on the material and on its temperature.") as vo:
            self.play(FadeIn(wire_r), FadeIn(lb), FadeIn(ll), FadeIn(al), run_time=0.8)
            self.wait(vo.duration * 0.15)
            self.play(Write(e1), run_time=1.0)
            self.wait(vo.duration * 0.1)
            self.play(Write(e2), run_time=1.0)
            self.play(FadeIn(e2n), run_time=0.6)

        with self.voiceover("Stretch a wire to twice its length. Its volume is fixed, so its cross section halves. "
                            "Twice the length, over half the area: the resistance goes up four times, not "
                            "two.") as vo:
            st = Rectangle(width=8.0, height=0.4, color=INK, stroke_width=3).set_fill(ManimColor("#E9C9A8"), 1)
            st.move_to(P(-2.5, -1.6))
            lb2 = BraceBetweenPoints(st.get_corner(DL), st.get_corner(DR), direction=DOWN, color=MUTED)
            ll2 = M("2l", 34, color=MUTED).next_to(lb2, DOWN, buff=0.1)
            al2 = M(r"\tfrac{A}{2}", 34, color=MUTED).next_to(st, LEFT, buff=0.2)
            self.play(TransformFromCopy(wire_r, st), run_time=1.4)
            self.play(FadeIn(lb2), FadeIn(ll2), FadeIn(al2), run_time=0.6)
            e3 = M(r"R' = \frac{\rho\,(2l)}{A/2} = 4R", 46, color=GREEN).move_to(P(4.2, -1.3))
            self.wait(vo.duration * 0.1)
            self.play(Write(e3), run_time=1.2)

        with self.voiceover("Metals also resist more when hot: R equals R nought, times one plus alpha delta "
                            "T.") as vo:
            e4 = M(r"R = R_0\,(1 + \alpha\,\Delta T)", 44, color=SECONDARY).move_to(P(4.2, -2.7))
            self.play(Write(e4), run_time=1.2)

    # ------------------------------------------------------------ scene 3: combinations
    def s3(self):
        y = 1.6
        ser = VGroup(wire(P(-6.4, y), P(-5.8, y)), resistor(P(-5.8, y), P(-4.8, y)), wire(P(-4.8, y), P(-4.4, y)),
                     resistor(P(-4.4, y), P(-3.4, y)), wire(P(-3.4, y), P(-3.0, y)), resistor(P(-3.0, y), P(-2.0, y)),
                     wire(P(-2.0, y), P(-1.4, y)))
        sl = VGroup(*[M(f"{v}\\,\\Omega", 30).next_to(P(x, y), UP, buff=0.3) for v, x in ((2, -5.3), (3, -3.9), (6, -2.5))])
        sf = M(r"R_s = 2 + 3 + 6 = 11\ \Omega", 40).move_to(P(-3.9, 0.3))
        sh = T("Series: same current", 28, color=PRIMARY, weight="BOLD").move_to(P(-3.9, 3.0))
        xs0, xs1 = 1.6, 5.6
        par = VGroup(wire(P(xs0 - 0.6, 1.6), P(xs0, 1.6)), wire(P(xs1, 1.6), P(xs1 + 0.6, 1.6)),
                     wire(P(xs0, 2.4), P(xs0, 0.8)), wire(P(xs1, 2.4), P(xs1, 0.8)))
        for yy in (2.4, 1.6, 0.8):
            par.add(wire(P(xs0, yy), P(3.0, yy)), resistor(P(3.0, yy), P(4.2, yy)), wire(P(4.2, yy), P(xs1, yy)))
        pl = VGroup(*[M(f"{v}\\,\\Omega", 26).next_to(P(3.6, yy), UP, buff=0.2) for v, yy in ((2, 2.4), (3, 1.6), (6, 0.8))])
        pf = M(r"\frac{1}{R_p} = \frac12 + \frac13 + \frac16 = 1", 38).move_to(P(3.6, -0.1))
        pf2 = M(r"R_p = 1\ \Omega", 40, color=GREEN).next_to(pf, DOWN, buff=0.25)
        ph = T("Parallel: same voltage", 28, color=PRIMARY, weight="BOLD").move_to(P(3.6, 3.3))
        with self.voiceover("Resistors in series carry the same current, so their resistances add. In parallel they "
                            "share the same voltage, so their reciprocals add. Two, three and six ohms give eleven "
                            "ohms in series, and one ohm in parallel.") as vo:
            self.play(FadeIn(sh), Create(ser), FadeIn(sl), run_time=1.2)
            self.play(Write(sf), run_time=1.0)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(ph), Create(par), FadeIn(pl), run_time=1.2)
            self.play(Write(pf), run_time=1.1)
            self.play(FadeIn(pf2), run_time=0.5)

        with self.voiceover("Symmetry tames harder networks. Take an infinite ladder of equal resistors. Chop off "
                            "the first rung, and what remains is the same infinite ladder. So x equals R plus R x "
                            "over R plus x, and x is the golden ratio times R.") as vo:
            self.clear_scene(0.5)
            top, bot = 1.0, -1.0
            lad = VGroup(wire(P(-6.4, top), P(-6.0, top)), wire(P(-6.4, bot), P(-6.0, bot)))
            xs = [-6.0, -4.0, -2.0, 0.0]
            for i in range(3):
                x0 = xs[i]
                lad.add(resistor(P(x0, top), P(x0 + 1.4, top)), wire(P(x0 + 1.4, top), P(xs[i + 1], top)),
                        wire(P(xs[i + 1], bot), P(x0, bot)),
                        wire(P(x0 + 1.7, top), P(x0 + 1.7, 0.6)), resistor(P(x0 + 1.7, 0.6), P(x0 + 1.7, -0.6)),
                        wire(P(x0 + 1.7, -0.6), P(x0 + 1.7, bot)))
            dots = M(r"\cdots", 50).move_to(P(0.5, 0))
            ends = VGroup(Dot(P(-6.4, top), color=INK, radius=0.07), Dot(P(-6.4, bot), color=INK, radius=0.07))
            xl = M("x", 40, color=PRIMARY).next_to(P(-6.4, 0), LEFT, buff=0.2)
            self.play(Create(lad), FadeIn(dots), FadeIn(ends), FadeIn(xl), run_time=1.6)
            box = DashedVMobject(Rectangle(width=5.95, height=2.6, color=SECONDARY, stroke_width=3).move_to(P(-1.025, 0)),
                                 num_dashes=50)
            bl = M("x", 40, color=SECONDARY).next_to(box, UP, buff=0.1)
            self.wait(vo.duration * 0.15)
            self.play(Create(box), FadeIn(bl), run_time=1.0)
            eq = M(r"x = R + \frac{R\,x}{R + x}", 48).move_to(P(4.6, 1.6))
            ans = fit(M(r"x = \frac{1+\sqrt5}{2}\,R \approx 1.62\,R", 46, color=GREEN), 4.4).move_to(P(4.6, 0.0))
            self.play(Write(eq), run_time=1.2)
            self.play(Write(ans), run_time=1.2)

    # ------------------------------------------------------------ scene 4: cells
    def s4(self):
        cell = DashedVMobject(RoundedRectangle(width=3.4, height=1.8, corner_radius=0.2, color=MUTED, stroke_width=3),
                              num_dashes=40).move_to(P(-3.6, 1.4))
        bat = battery_sym(P(-4.4, 1.4))
        rr = resistor(P(-3.7, 1.4), P(-2.7, 1.4))
        inner = VGroup(wire(P(-5.5, 1.4), P(-4.5, 1.4)), wire(P(-4.3, 1.4), P(-3.7, 1.4)), wire(P(-2.7, 1.4), P(-1.7, 1.4)))
        lab = VGroup(M(r"\mathcal E", 32).next_to(bat, UP, buff=0.25), M("r", 32).next_to(rr, UP, buff=0.25))
        terms = VGroup(Dot(P(-5.5, 1.4), color=INK), Dot(P(-1.7, 1.4), color=INK))
        load = VGroup(wire(P(-5.5, 1.4), P(-5.5, -0.4), P(-4.2, -0.4)), resistor(P(-4.2, -0.4), P(-3.0, -0.4)),
                      wire(P(-3.0, -0.4), P(-1.7, -0.4), P(-1.7, 1.4)))
        ll = M("R", 32).next_to(P(-3.6, -0.4), DOWN, buff=0.3)
        e1 = M(r"V = \mathcal E - Ir", 56, color=PRIMARY).move_to(P(3.4, 2.2))
        e1n = T("a working cell reads less than its EMF", 24, color=MUTED).next_to(e1, DOWN, buff=0.25)
        with self.voiceover("A real cell has an internal resistance, r. When it drives a current, part of its E M F "
                            "is lost inside, so the voltage at its terminals is E minus I r. A voltmeter across a "
                            "working cell reads less than its E M F.") as vo:
            self.play(Create(cell), FadeIn(bat), Create(rr), Create(inner), FadeIn(lab), FadeIn(terms), run_time=1.4)
            self.play(Create(load), FadeIn(ll), run_time=1.0)
            self.wait(vo.duration * 0.15)
            self.play(Write(e1), run_time=1.0)
            self.play(FadeIn(e1n), run_time=0.6)

        with self.voiceover("The power delivered to the load peaks when R equals r. For a ten volt cell with two "
                            "ohms inside, the load gets at most twelve point five watts, at two ohms.") as vo:
            ax = Axes(x_range=[0, 12, 2], y_range=[0, 14, 5], x_length=6.0, y_length=3.0,
                      axis_config={"color": MUTED, "include_ticks": False, "stroke_width": 3}).move_to(P(3.3, -1.6))
            xl = M("R", 30, color=MUTED).next_to(ax.x_axis.get_end(), DOWN, buff=0.12)
            yl = M("P", 30, color=MUTED).next_to(ax.y_axis.get_end(), LEFT, buff=0.12)
            cv = ax.plot(lambda R: 100 * R / (R + 2) ** 2, x_range=[0, 12], color=PRIMARY, stroke_width=4)
            pk = Dot(ax.c2p(2, 12.5), color=HL, radius=0.09)
            pl = M(r"R = r:\ 12.5\ \text{W}", 30, color=HL).next_to(pk, UR, buff=0.1)
            fp = M(r"P = \frac{\mathcal E^2 R}{(R + r)^2}", 40).move_to(P(-3.4, -2.4))
            self.play(FadeOut(e1n), run_time=0.3)
            self.play(Create(ax), FadeIn(xl), FadeIn(yl), Write(fp), run_time=1.0)
            self.play(Create(cv), run_time=1.4)
            self.play(FadeIn(pk), FadeIn(pl), run_time=0.7)

    # ------------------------------------------------------------ scene 5: Kirchhoff
    def s5(self):
        J = P(-4.2, 0.4)
        jd = Dot(J, radius=0.1, color=INK)
        a_in = arrow(J + P(-2.0, 0), J + P(-0.15, 0), PRIMARY, sw=6)
        a1 = arrow(J + P(0.1, 0.1), J + P(1.5, 1.3), SECONDARY, sw=6)
        a2 = arrow(J + P(0.1, -0.1), J + P(1.5, -1.3), SECONDARY, sw=6)
        l_in = M(r"3\ \text{A}", 32, color=PRIMARY).next_to(a_in, UP, buff=0.1)
        l1 = M(r"1\ \text{A}", 32, color=SECONDARY).next_to(a1.get_end(), RIGHT, buff=0.1)
        l2 = M(r"2\ \text{A}", 32, color=SECONDARY).next_to(a2.get_end(), RIGHT, buff=0.1)
        k1 = M(r"\textstyle\sum I_{\text{in}} = \sum I_{\text{out}}", 40).move_to(P(-4.0, -2.0))
        k1n = T("charge is conserved", 24, color=MUTED).next_to(k1, DOWN, buff=0.15)
        # loop: a closed path with rises and drops
        box = RoundedRectangle(width=4.2, height=3.0, corner_radius=0.3, color=INK, stroke_width=3).move_to(P(3.3, 0.6))
        loop_arrow = Arc(radius=0.7, start_angle=PI / 2, angle=-1.6 * PI, arc_center=P(3.3, 0.6), color=HL,
                         stroke_width=4).add_tip(tip_length=0.2)
        rises = VGroup(M(r"+\mathcal E", 30, color=GREEN).next_to(box, LEFT, buff=0.15),
                       M(r"-IR_1", 30, color=WARN).next_to(box, UP, buff=0.15),
                       M(r"-IR_2", 30, color=WARN).next_to(box, RIGHT, buff=0.15))
        k2 = M(r"\textstyle\sum \Delta V = 0", 40).move_to(P(3.3, -2.0))
        k2n = T("potential is a height: back to the start", 24, color=MUTED).next_to(k2, DOWN, buff=0.15)
        with self.voiceover("Any DC network yields to two laws. At a junction, the current in equals the current "
                            "out, because charge is conserved. Round any closed loop, the changes in potential add "
                            "to zero, because potential is like height. Walk round a loop and you are back where "
                            "you started.") as vo:
            self.play(FadeIn(jd), GrowArrow(a_in), FadeIn(l_in), run_time=0.7)
            self.play(GrowArrow(a1), GrowArrow(a2), FadeIn(l1), FadeIn(l2), run_time=0.7)
            self.play(Write(k1), FadeIn(k1n), run_time=1.0)
            self.wait(vo.duration * 0.1)
            self.play(Create(box), Create(loop_arrow), run_time=1.0)
            self.play(FadeIn(rises), run_time=0.7)
            self.play(Write(k2), FadeIn(k2n), run_time=1.0)

        # three-branch network between A (top) and B (bottom)
        top, bot = 1.6, -1.9
        xs = [-5.0, -3.0, -1.0]
        net = VGroup(wire(P(xs[0], top), P(xs[2], top)), wire(P(xs[0], bot), P(xs[2], bot)))
        # left: 10 V cell (+ towards A) and 2 ohm
        net.add(wire(P(xs[0], top), P(xs[0], 1.0)), resistor(P(xs[0], 1.0), P(xs[0], -0.1)),
                wire(P(xs[0], -0.1), P(xs[0], -0.7)), battery_sym(P(xs[0], -0.8), vertical_wire=True),
                wire(P(xs[0], -0.9), P(xs[0], bot)))
        net.add(wire(P(xs[1], top), P(xs[1], 0.4)), resistor(P(xs[1], 0.4), P(xs[1], -0.8)), wire(P(xs[1], -0.8), P(xs[1], bot)))
        net.add(wire(P(xs[2], top), P(xs[2], 1.0)), resistor(P(xs[2], 1.0), P(xs[2], -0.1)),
                wire(P(xs[2], -0.1), P(xs[2], -0.7)), battery_sym(P(xs[2], -0.8), vertical_wire=True),
                wire(P(xs[2], -0.9), P(xs[2], bot)))
        labs = VGroup(M(r"2\,\Omega", 28).next_to(P(xs[0], 0.45), LEFT, buff=0.3),
                      M(r"10\,\text{V}", 28).next_to(P(xs[0], -0.8), LEFT, buff=0.5),
                      M(r"4\,\Omega", 28).next_to(P(xs[1], -0.2), LEFT, buff=0.3),
                      M(r"2\,\Omega", 28).next_to(P(xs[2], 0.45), RIGHT, buff=0.3),
                      M(r"4\,\text{V}", 28).next_to(P(xs[2], -0.8), RIGHT, buff=0.5))
        A = Dot(P(xs[1], top), color=INK, radius=0.08)
        B = Dot(P(xs[1], bot), color=INK, radius=0.08)
        Al = M(r"A:\ V", 32, color=PRIMARY).next_to(A, UP, buff=0.15)
        Bl = M(r"B:\ 0", 32, color=PRIMARY).next_to(B, DOWN, buff=0.15)
        eq = M(r"\frac{V - 10}{2} + \frac{V}{4} + \frac{V - 4}{2} = 0", 42).move_to(P(3.4, 2.4))
        sol = M(r"V = 5.6\ \text{V}", 46, color=GREEN).move_to(P(3.4, 1.0))
        with self.voiceover("The fastest method is node potentials. Here, three branches join A to B: a ten volt "
                            "cell with two ohms, a four ohm resistor, and a four volt cell with two ohms. Call the "
                            "potential of B zero, and the potential of A, V. The currents leaving A must add up to zero, and that gives V equal to "
                            "five point six volts.") as vo:
            self.clear_scene(0.5)
            self.play(Create(net), FadeIn(labs), run_time=1.6)
            self.play(FadeIn(A), FadeIn(B), FadeIn(Al), FadeIn(Bl), run_time=0.6)
            self.wait(vo.duration * 0.15)
            self.play(Write(eq), run_time=1.6)
            self.play(Write(sol), run_time=0.8)

        with self.voiceover("So two point two amperes flow up through the ten volt cell, one point four down through "
                            "the four ohm resistor, and point eight down through the four volt cell, charging it. "
                            "Nothing is used up: two point two in equals one point four plus point eight "
                            "out.") as vo:
            i1 = arrow(P(xs[0] + 0.65, -1.2), P(xs[0] + 0.65, 0.9), PRIMARY, sw=5)
            i2 = arrow(P(xs[1] + 0.45, 0.9), P(xs[1] + 0.45, -1.2), SECONDARY, sw=5)
            i3 = arrow(P(xs[2] - 0.75, 0.9), P(xs[2] - 0.75, -1.2), SECONDARY, sw=5)
            t1 = M(r"2.2\,\text{A}", 28, color=PRIMARY).next_to(i1, RIGHT, buff=0.08).shift(0.6 * DOWN)
            t2 = M(r"1.4\,\text{A}", 28, color=SECONDARY).next_to(i2, UP, buff=0.08)
            t3 = M(r"0.8\,\text{A}", 28, color=SECONDARY).next_to(i3, UP, buff=0.08)
            self.play(GrowArrow(i1), FadeIn(t1), run_time=0.8)
            self.play(GrowArrow(i2), FadeIn(t2), run_time=0.8)
            self.play(GrowArrow(i3), FadeIn(t3), run_time=0.8)
            chk = M(r"2.2 = 1.4 + 0.8", 44, color=GREEN).move_to(P(3.4, -0.6))
            self.wait(vo.duration * 0.1)
            self.play(Write(chk), run_time=1.0)

    # ------------------------------------------------------------ scene 6: bridges and potentiometer
    def s6(self):
        L, T_, R_, B_ = P(-5.6, 0.0), P(-3.6, 2.0), P(-1.6, 0.0), P(-3.6, -2.0)

        def arm(p, q):
            m1 = p + 0.3 * (q - p)
            m2 = p + 0.7 * (q - p)
            return VGroup(wire(p, m1), resistor(m1, m2, n=5, amp=0.14), wire(m2, q))

        br = VGroup(arm(L, T_), arm(T_, R_), arm(L, B_), arm(B_, R_),
                    wire(T_, T_ + 1.65 * DOWN), wire(B_, B_ + 1.65 * UP))
        g = galvo(P(-3.6, 0.0))
        bat = VGroup(wire(L, L + 0.9 * LEFT, P(-6.5, -2.9), P(-3.7, -2.9)), battery_sym(P(-3.6, -2.9)),
                     wire(P(-3.5, -2.9), P(-0.7, -2.9), P(-0.7, 0), R_))
        labs = VGroup(M("P", 34).move_to((L + T_) / 2 + P(-0.35, 0.35)), M("Q", 34).move_to((T_ + R_) / 2 + P(0.35, 0.35)),
                      M("R", 34).move_to((L + B_) / 2 + P(-0.35, -0.35)), M("S", 34).move_to((B_ + R_) / 2 + P(0.35, -0.35)))
        e1 = M(r"\frac{P}{Q} = \frac{R}{S}", 60, color=PRIMARY).move_to(P(3.4, 2.4))
        e1n = T("galvanometer reads zero", 26, color=MUTED).next_to(e1, DOWN, buff=0.25)
        with self.voiceover("A Wheatstone bridge balances when P over Q equals R over S. Then both ends of the "
                            "galvanometer sit at the same potential, and no current flows through it.") as vo:
            self.play(Create(br), FadeIn(g), Create(bat), FadeIn(labs), run_time=1.6)
            self.wait(vo.duration * 0.15)
            self.play(Write(e1), run_time=1.0)
            self.play(FadeIn(e1n), run_time=0.6)

        with self.voiceover("The meter bridge is the same idea along a one metre wire. With the unknown in the left "
                            "gap, ten ohms in the right gap, and the balance point forty centimetres from the left "
                            "end, the unknown is ten times forty over sixty, about six point seven ohms.") as vo:
            e2 = M(r"X = R\,\frac{l}{100 - l} = 10\times\frac{40}{60} \approx 6.7\ \Omega", 40)
            fit(e2, 6.9).move_to(P(3.4, 0.4))
            yw, yg = -1.8, -0.8
            mw = Line(P(0.6, yw), P(6.2, yw), color=INK, stroke_width=5)
            gaps = VGroup(wire(P(0.6, yw), P(0.6, yg), P(1.1, yg)), resistor(P(1.1, yg), P(2.3, yg)),
                          wire(P(2.3, yg), P(4.5, yg)), resistor(P(4.5, yg), P(5.7, yg)),
                          wire(P(5.7, yg), P(6.2, yg), P(6.2, yw)))
            gl = VGroup(M("X", 30).next_to(P(1.7, yg), UP, buff=0.25),
                        M(r"R = 10\,\Omega", 28).next_to(P(5.1, yg), UP, buff=0.25))
            jx = 0.6 + 0.4 * 5.6
            jk = Triangle(color=HL).set_fill(HL, 1).scale(0.14).move_to(P(jx, yw + 0.2)).rotate(PI)
            jl = DashedLine(P(3.4, yg), P(jx, yw + 0.32), color=MUTED, stroke_width=2)
            t40 = T("40 cm", 22, color=MUTED).next_to(P(0.6 + 0.2 * 5.6, yw), DOWN, buff=0.12)
            t60 = T("60 cm", 22, color=MUTED).next_to(P(0.6 + 0.7 * 5.6, yw), DOWN, buff=0.12)
            self.play(Create(mw), Create(gaps), FadeIn(gl), run_time=0.9)
            self.play(FadeIn(jk), Create(jl), FadeIn(t40), FadeIn(t60), run_time=0.7)
            self.wait(vo.duration * 0.1)
            self.play(Write(e2), run_time=1.6)

        with self.voiceover("A potentiometer measures an E M F while drawing no current at all, so the cell's "
                            "internal resistance cannot spoil the reading. Two cells compare as their balance "
                            "lengths: E one over E two equals l one over l two.") as vo:
            e3 = M(r"\frac{\mathcal E_1}{\mathcal E_2} = \frac{l_1}{l_2}", 46, color=SECONDARY).move_to(P(3.4, -2.95))
            self.wait(vo.duration * 0.35)
            self.play(Write(e3), run_time=1.2)

    # ------------------------------------------------------------ scene 7: power
    def s7(self):
        e1 = M(r"P = VI = I^2R = \frac{V^2}{R}", 54, color=PRIMARY).move_to(P(0, 3.0))
        y = 1.0
        b1 = bulb(P(-2.0, y))
        b2 = bulb(P(1.2, y))
        circ = VGroup(wire(P(-5.0, y), P(-2.45, y)), wire(P(-1.55, y), P(0.75, y)), wire(P(1.65, y), P(4.0, y)),
                      wire(P(-5.0, y), P(-5.0, -0.7), P(-0.7, -0.7)), wire(P(-0.1, -0.7), P(4.0, -0.7), P(4.0, y)),
                      Circle(radius=0.3, color=WIRE, stroke_width=4).move_to(P(-0.4, -0.7)),
                      FunctionGraph(lambda t: 0.12 * np.sin(2 * PI * t / 0.36), x_range=[-0.18, 0.18], color=WIRE,
                                    stroke_width=3).move_to(P(-0.4, -0.7)))
        l1 = T("100 W", 26).next_to(b1, UP, buff=0.25)
        l2 = T("60 W", 26).next_to(b2, UP, buff=0.25)
        mains = T("220 V AC", 24, color=MUTED).next_to(P(-0.4, -0.7), DOWN, buff=0.4)
        with self.voiceover("Electrical power is V I, which is I squared R, or V squared over R. Now connect a "
                            "hundred watt bulb and a sixty watt bulb, both made for two hundred and twenty volts, "
                            "in series across the mains. Which one glows brighter?") as vo:
            self.play(Write(e1), run_time=1.4)
            self.wait(vo.duration * 0.15)
            self.play(Create(circ), FadeIn(b1), FadeIn(b2), FadeIn(l1), FadeIn(l2), FadeIn(mains), run_time=1.4)
            qm = T("?", 60, color=PRIMARY, weight="BOLD").move_to(P(5.4, 1.0))
            self.play(FadeIn(qm), run_time=0.5)

        with self.voiceover("The sixty watt bulb. Its filament has the larger resistance, V squared over P, and in "
                            "series the same current flows through both, so the bigger resistance takes more "
                            "power. In parallel, it is the other way round.") as vo:
            self.play(FadeOut(qm), run_time=0.3)
            r = VGroup(M(r"R_{100} = \frac{220^2}{100} = 484\ \Omega", 36),
                       M(r"R_{60} = \frac{220^2}{60} \approx 807\ \Omega", 36)).arrange(DOWN, buff=0.3).move_to(P(0, -2.7))
            self.play(Write(r), run_time=1.6)
            glow1 = Circle(radius=0.8, color=HL, stroke_width=0).set_fill(HL, 0.2).move_to(b1)
            glow2 = Circle(radius=0.9, color=HL, stroke_width=0).set_fill(HL, 0.55).move_to(b2)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(glow1), FadeIn(glow2), b2[0].animate.set_fill(HL, 0.9), b1[0].animate.set_fill(HL, 0.3), run_time=1.0)
            self.bring_to_front(b1, b2, l1, l2)
            ans = T("series: same I, bigger R glows brighter", 26, color=GREEN)
            fit(ans, 4.2).move_to(P(4.4, 2.0))
            self.play(FadeIn(ans), run_time=0.7)

    # ------------------------------------------------------------ scene 8: recap
    def s8(self):
        title = T("Chapter 3 in five lines", 38, color=PRIMARY, weight="BOLD").move_to(P(0, 3.2))
        lines = [
            (r"I = neAv_d", "slow drift, fast signal"),
            (r"V = IR,\ \ R = \frac{\rho l}{A}", "stretch to 2l: R becomes 4R"),
            (r"V = \mathcal E - Ir", "most power to the load when R = r"),
            (r"\textstyle\sum I = 0,\ \ \sum \Delta V = 0", "charge conserved; V is a height"),
            (r"\frac PQ = \frac RS,\ \ P = I^2R", "balance; series: bigger R, more P"),
        ]
        rows = VGroup()
        for i, (tex, note) in enumerate(lines):
            m = M(tex, 38)
            n = fit(T(note, 26, color=MUTED), 6.0)
            num = T(f"{i + 1}.", 28, color=PRIMARY, weight="BOLD")
            rows.add(VGroup(num, m, n))
        for r in rows:
            r[0].move_to(P(-6.0, 0))
            r[1].next_to(r[0], RIGHT, buff=0.3)
            r[2].move_to(P(0.9 + r[2].width / 2, 0))
        rows.arrange(DOWN, buff=0.32, aligned_edge=LEFT).move_to(P(0, -0.1))
        for r in rows:
            r[2].move_to(P(0.9 + r[2].width / 2, r[1].get_y()))
        with self.voiceover("To recap. Current is a slow drift driven by a field that arrives almost at once. "
                            "Ohm's law and resistivity follow from the drift, and stretching a wire hits it "
                            "twice.") as vo:
            self.play(FadeIn(title), run_time=0.6)
            self.play(FadeIn(rows[0], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.3)
            self.play(FadeIn(rows[1], shift=0.15 * UP), run_time=0.7)
        with self.voiceover("A cell loses I r inside itself. Kirchhoff's two laws solve any network. And bridges "
                            "balance, while in series the bigger resistance takes more power.") as vo:
            self.play(FadeIn(rows[2], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(rows[3], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(rows[4], shift=0.15 * UP), run_time=0.7)
        with self.voiceover("Try the mastery quiz. So far, currents have changed potentials and energy. Chapter "
                            "four finds that moving charges also make, and feel, a completely new field: the "
                            "magnetic field.") as vo:
            nxt = T("Next: Chapter 4 · Magnetic Effects of Current", 32, color=PRIMARY).move_to(P(0, -3.4))
            self.wait(vo.duration * 0.3)
            self.play(FadeIn(nxt, shift=0.2 * UP), run_time=0.8)
