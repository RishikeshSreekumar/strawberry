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


class EmCh2Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Electricity & Magnetism",
            "Chapter 2 · Capacitors",
            "Chapter two. Capacitors.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ plates helper
    def plates(self, xl=-5.0, xr=-1.6, y0=-0.4, h=4.4):
        pl = Rectangle(width=0.22, height=h, color=POS_C, stroke_width=2).set_fill(POS_C, 0.85).move_to(P(xl, y0))
        pr = Rectangle(width=0.22, height=h, color=NEG_C, stroke_width=2).set_fill(NEG_C, 0.85).move_to(P(xr, y0))
        ps = VGroup(*[plus_sign(P(xl - 0.35, y0 + y), s=0.11) for y in np.linspace(-h / 2 + 0.4, h / 2 - 0.4, 6)])
        ms = VGroup(*[minus_sign(P(xr + 0.35, y0 + y), s=0.11) for y in np.linspace(-h / 2 + 0.4, h / 2 - 0.4, 6)])
        return pl, pr, ps, ms

    # ------------------------------------------------------------ scene 1: capacitance
    def s1(self):
        xl, xr, y0 = -5.0, -1.6, -0.4
        pl, pr, ps, ms = self.plates(xl, xr, y0)
        lq = M(r"+Q", 38, color=POS_C).next_to(pl, UP, buff=0.15)
        rq = M(r"-Q", 38, color=NEG_C).next_to(pr, UP, buff=0.15)
        field = VGroup(*[arrow(P(xl + 0.2, y0 + y), P(xr - 0.2, y0 + y), E_C, sw=4)
                         for y in np.linspace(-1.6, 1.6, 6)])
        out_l = VGroup(*[DashedLine(P(xl - 1.6, y0 + y), P(xl - 0.6, y0 + y), color=GRID, stroke_width=3)
                         for y in (-1.0, 1.0)])
        out_r = VGroup(*[DashedLine(P(xr + 0.6, y0 + y), P(xr + 1.6, y0 + y), color=GRID, stroke_width=3)
                         for y in (-1.0, 1.0)])
        zl = M(r"E = 0", 28, color=MUTED).next_to(out_l, DOWN, buff=0.2)
        zr = M(r"E = 0", 28, color=MUTED).next_to(out_r, DOWN, buff=0.2)
        e1 = M(r"E = \frac{\sigma}{\varepsilon_0} = \frac{Q}{\varepsilon_0 A}", 46).move_to(P(3.6, 2.6))

        with self.voiceover("A capacitor is two conductors carrying plus Q and minus Q. Take two parallel plates. "
                            "Between them, the fields of the two charged sheets add. Outside, they cancel. So "
                            "there is a uniform field, sigma over epsilon nought, and all of it is in the "
                            "gap.") as vo:
            self.play(FadeIn(pl), FadeIn(pr), run_time=0.6)
            self.play(FadeIn(ps), FadeIn(ms), FadeIn(lq), FadeIn(rq), run_time=0.8)
            self.wait(vo.duration * 0.15)
            self.play(LaggedStart(*[GrowArrow(a) for a in field], lag_ratio=0.1), run_time=1.2)
            self.play(Create(out_l), Create(out_r), FadeIn(zl), FadeIn(zr), run_time=0.8)
            self.play(Write(e1), run_time=1.2)

        br = BraceBetweenPoints(P(xl, y0 - 2.4), P(xr, y0 - 2.4), direction=DOWN, color=MUTED)
        bl = M("d", 34, color=MUTED).next_to(br, DOWN, buff=0.1)
        e2 = M(r"V = Ed = \frac{Qd}{\varepsilon_0 A}", 46).move_to(P(3.6, 1.1))
        e3 = M(r"C = \frac{Q}{V} = \frac{\varepsilon_0 A}{d}", 56, color=PRIMARY).move_to(P(3.6, -0.6))
        bx = SurroundingRectangle(e3, buff=0.25, corner_radius=0.15, color=PRIMARY, stroke_width=3)
        note = T("geometry and material only", 26, color=GREEN).next_to(bx, DOWN, buff=0.3)
        with self.voiceover("The potential difference is that field times the gap, d. Divide the charge by it, and "
                            "Q cancels. C equals Q over V, which is epsilon nought A over d. Capacitance depends "
                            "only on the shape, and on what fills the gap, never on how much charge you put "
                            "on.") as vo:
            self.play(FadeIn(br), FadeIn(bl), run_time=0.5)
            self.play(Write(e2), run_time=1.2)
            self.wait(vo.duration * 0.15)
            self.play(Write(e3), run_time=1.2)
            self.play(Create(bx), run_time=0.5)
            self.play(FadeIn(note), run_time=0.6)

        with self.voiceover("And a farad is enormous. For one farad with a one millimetre gap, each plate would "
                            "need about a hundred million square metres: a square more than ten kilometres on a "
                            "side.") as vo:
            self.clear_scene(0.5)
            f1 = M(r"A = \frac{Cd}{\varepsilon_0} = \frac{(1)(10^{-3})}{8.85\times10^{-12}}", 50).move_to(P(0, 1.6))
            f2 = M(r"\approx 1.1\times10^{8}\ \text{m}^2", 56, color=PRIMARY).move_to(P(0, 0.0))
            sq = Square(side_length=1.8, color=HL, stroke_width=4).set_fill(HL, 0.15).move_to(P(-1.6, -2.4))
            sql = T("about 10.6 km on a side", 28, color=INK).next_to(sq, RIGHT, buff=0.4)
            self.play(Write(f1), run_time=1.4)
            self.play(Write(f2), run_time=1.0)
            self.play(DrawBorderThenFill(sq), FadeIn(sql), run_time=1.0)

    # ------------------------------------------------------------ scene 2: series and parallel
    def s2(self):
        # parallel circuit on the left
        top, bot = 1.6, -1.6
        xb = -6.2
        xs = [-4.4, -3.0, -1.6]
        par = VGroup(
            wire(P(xb, top), P(xs[-1], top)), wire(P(xb, bot), P(xs[-1], bot)),
            wire(P(xb, top), P(xb, 0.1)), wire(P(xb, -0.1), P(xb, bot)),
            battery_sym(P(xb, 0.0), vertical_wire=True),
        )
        for x in xs:
            par.add(wire(P(x, top), P(x, 0.11)), wire(P(x, -0.11), P(x, bot)), cap_sym(P(x, 0.0), vertical_wire=True))
        par_l = VGroup(*[M(f"C_{i + 1}", 30, color=CAP_C).next_to(P(x, 0), RIGHT, buff=0.42) for i, x in enumerate(xs)])
        hp = T("Parallel", 32, color=PRIMARY, weight="BOLD").move_to(P(-3.9, 2.6))
        pf = VGroup(T("same V", 26, color=MUTED), M(r"C = C_1 + C_2 + C_3", 40)).arrange(DOWN, buff=0.2).move_to(P(-3.9, -2.6))

        with self.voiceover("Connect capacitors side by side, in parallel, and every one sits across the same "
                            "voltage. Their charges add, so their capacitances add.") as vo:
            self.play(FadeIn(hp), Create(par), run_time=1.6)
            self.play(FadeIn(par_l), run_time=0.5)
            self.wait(vo.duration * 0.15)
            self.play(FadeIn(pf, shift=0.15 * UP), run_time=0.8)

        # series circuit on the right
        x0, x1 = 1.2, 6.4
        cx = [2.4, 3.8, 5.2]
        ser = VGroup(wire(P(x0, top), P(cx[0] - 0.11, top)), wire(P(cx[0] + 0.11, top), P(cx[1] - 0.11, top)),
                     wire(P(cx[1] + 0.11, top), P(cx[2] - 0.11, top)), wire(P(cx[2] + 0.11, top), P(x1, top)),
                     wire(P(x1, top), P(x1, bot), P(3.9, bot)), wire(P(3.7, bot), P(x0, bot), P(x0, top)),
                     battery_sym(P(3.8, bot)))
        for x in cx:
            ser.add(cap_sym(P(x, top)))
        ser_l = VGroup(*[M(f"C_{i + 1}", 30, color=CAP_C).next_to(P(x, top), DOWN, buff=0.45) for i, x in enumerate(cx)])
        hs = T("Series", 32, color=PRIMARY, weight="BOLD").move_to(P(3.8, 2.6))
        sf = VGroup(T("same Q", 26, color=MUTED), M(r"\frac1C = \frac1{C_1} + \frac1{C_2} + \frac1{C_3}", 40)).arrange(DOWN, buff=0.2)
        sf.move_to(P(3.8, -2.75))
        with self.voiceover("Connect them in a chain, in series, and they all carry the same charge, while their "
                            "voltages add. So the reciprocals add. The smallest capacitor takes the largest share "
                            "of the voltage.") as vo:
            self.play(FadeIn(hs), Create(ser), run_time=1.6)
            self.play(FadeIn(ser_l), run_time=0.5)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(sf, shift=0.15 * UP), run_time=0.8)
            vi = M(r"V_i \propto \frac{1}{C_i}", 36, color=PURPLE).move_to(P(3.8, 0.0))
            self.play(Write(vi), run_time=0.9)

        with self.voiceover("Two, three and six microfarads give one microfarad in series, less than the smallest "
                            "one, and eleven microfarads in parallel.") as vo:
            self.clear_scene(0.5)
            r1 = M(r"\text{series: } \frac1C = \frac12 + \frac13 + \frac16 = 1 \;\Rightarrow\; C = 1\ \mu\text{F}", 46)
            r2 = M(r"\text{parallel: } C = 2 + 3 + 6 = 11\ \mu\text{F}", 46)
            VGroup(r1, r2).arrange(DOWN, buff=0.7).move_to(P(0, 0.3))
            r1n = T("less than the smallest", 26, color=GREEN).next_to(r1, DOWN, buff=0.2)
            r2.shift(0.4 * DOWN)
            self.play(Write(r1), run_time=1.6)
            self.play(FadeIn(r1n), run_time=0.5)
            self.play(Write(r2), run_time=1.2)

    # ------------------------------------------------------------ scene 3: dielectrics
    def s3(self):
        xl, xr, y0 = -5.4, -1.2, -0.6
        pl, pr, ps, ms = self.plates(xl, xr, y0, h=4.2)
        field = VGroup(*[arrow(P(xl + 0.2, y0 + y), P(xr - 0.2, y0 + y), E_C, sw=4) for y in np.linspace(-1.5, 1.5, 6)])
        slab = Rectangle(width=3.7, height=3.8, color=PURPLE, stroke_width=3).set_fill(PURPLE, 0.15)
        slab.move_to(P(-3.3, y0 + 5.0))
        sl_minus = VGroup(*[minus_sign(P(-4.98, y0 + y), s=0.09, color=NEG_C) for y in np.linspace(-1.5, 1.5, 6)])
        sl_plus = VGroup(*[plus_sign(P(-1.62, y0 + y), s=0.09, color=POS_C) for y in np.linspace(-1.5, 1.5, 6)])
        weak = VGroup(*[arrow(P(-3.9, y0 + y), P(-2.7, y0 + y), E_C, sw=4) for y in np.linspace(-1.5, 1.5, 6)])
        e1 = M(r"E = \frac{E_0}{K}", 50).move_to(P(3.4, 2.6))
        e2 = M(r"C = K\,\frac{\varepsilon_0 A}{d} = K C_0", 50, color=PRIMARY).move_to(P(3.4, 1.1))

        with self.voiceover("Slide an insulator between the plates. Its molecules polarise, and their bound charges "
                            "line the faces of the slab, opposite to the plates. That weakens the field inside by a "
                            "factor K, the dielectric constant. Less field means less voltage for the same charge, "
                            "so the capacitance rises K times.") as vo:
            self.play(FadeIn(pl), FadeIn(pr), FadeIn(ps), FadeIn(ms), run_time=0.6)
            self.play(LaggedStart(*[GrowArrow(a) for a in field], lag_ratio=0.1), run_time=1.0)
            self.add(slab)
            self.play(slab.animate.move_to(P(-3.3, y0)), field.animate.set_opacity(0.25), run_time=1.6)
            self.play(FadeIn(sl_minus), FadeIn(sl_plus), run_time=0.7)
            self.play(LaggedStart(*[GrowArrow(a) for a in weak], lag_ratio=0.1), run_time=0.9)
            self.wait(vo.duration * 0.1)
            self.play(Write(e1), run_time=1.0)
            self.play(Write(e2), run_time=1.2)

        with self.voiceover("A slab that fills only part of the gap, with thickness t, gives C equals epsilon nought "
                            "A, over d minus t plus t over K. A slab of half the gap with K equal to four raises C "
                            "by a factor of one point six.") as vo:
            e3 = M(r"C = \frac{\varepsilon_0 A}{d - t + t/K}", 48).move_to(P(3.4, -0.6))
            e4 = M(r"t = \tfrac d2,\ K = 4:\ \ C = \frac{\varepsilon_0 A}{5d/8} = 1.6\,C_0", 36, color=GREEN)
            fit(e4, 6.8).move_to(P(3.4, -2.1))
            half = Rectangle(width=1.99, height=3.8, color=PURPLE, stroke_width=3).set_fill(PURPLE, 0.15).move_to(P(-3.3, y0))
            self.play(Transform(slab, half), sl_minus.animate.shift(0.85 * RIGHT), sl_plus.animate.shift(0.85 * LEFT),
                      field.animate.set_opacity(0.6), run_time=1.2)
            tb = BraceBetweenPoints(P(-4.295, y0 - 2.0), P(-2.305, y0 - 2.0), direction=DOWN, color=PURPLE)
            tbl = M(r"t = \tfrac d2", 30, color=PURPLE).next_to(tb, DOWN, buff=0.08)
            self.play(FadeIn(tb), FadeIn(tbl), Write(e3), run_time=1.4)
            self.wait(vo.duration * 0.1)
            self.play(Write(e4), run_time=1.4)

        with self.voiceover("Before you calculate anything, ask what is held fixed. With the battery still "
                            "connected, V stays the same, so the charge and the energy grow K times. With the "
                            "battery removed first, Q stays the same, so the voltage and the energy fall K "
                            "times.") as vo:
            self.clear_scene(0.5)
            hdr = T("Ask what is fixed", 34, color=PRIMARY, weight="BOLD").move_to(P(0, 3.2))
            rows = [("", "battery on", "battery off"), ("fixed", "V", "Q"), ("C", r"\times K", r"\times K"),
                    ("Q", r"\times K", r"\text{same}"), ("V", r"\text{same}", r"\div K"), ("U", r"\times K", r"\div K")]
            tbl = VGroup()
            for i, (a, b, c) in enumerate(rows):
                y = 2.1 - 0.85 * i
                if i == 0:
                    cells = [T(b, 30, color=SECONDARY, weight="BOLD"), T(c, 30, color=PURPLE, weight="BOLD")]
                    cells[0].move_to(P(-0.4, y))
                    cells[1].move_to(P(3.6, y))
                    tbl.add(*cells)
                    continue
                lab = T(a, 30, color=INK) if i == 1 else M(a, 40)
                lab.move_to(P(-4.0, y))
                cb = M(b, 40, color=SECONDARY).move_to(P(-0.4, y))
                cc = M(c, 40, color=PURPLE).move_to(P(3.6, y))
                tbl.add(lab, cb, cc)
            hl = Line(P(-5.2, 1.65), P(5.2, 1.65), color=GRID, stroke_width=3)
            self.play(FadeIn(hdr), run_time=0.5)
            self.play(FadeIn(tbl[:2]), Create(hl), run_time=0.6)
            for k in range(2, len(tbl), 3):
                self.play(FadeIn(tbl[k:k + 3], shift=0.1 * UP), run_time=0.55)
            self.wait(vo.duration * 0.05)
            warn = T("a dielectric does not always raise the stored energy", 26, color=WARN).move_to(P(0, -3.3))
            self.play(FadeIn(warn), run_time=0.6)

    # ------------------------------------------------------------ scene 4: energy
    def s4(self):
        ax = Axes(x_range=[0, 5.0, 1], y_range=[0, 3.9, 1], x_length=6.6, y_length=5.0,
                  axis_config={"color": MUTED, "include_ticks": False, "stroke_width": 3}).move_to(P(-3.3, -0.5))
        xl = M("q", 36, color=MUTED).next_to(ax.x_axis.get_end(), DOWN, buff=0.15)
        yl = M("V", 36, color=MUTED).next_to(ax.y_axis.get_end(), LEFT, buff=0.15)
        Q, Vf = 4.0, 3.0
        line = ax.plot(lambda q: Vf * q / Q, x_range=[0, Q], color=PRIMARY, stroke_width=5)
        tri = Polygon(ax.c2p(0, 0), ax.c2p(Q, 0), ax.c2p(Q, Vf), color=PRIMARY, stroke_width=0).set_fill(PRIMARY, 0.25)
        strip = Rectangle(width=ax.x_axis.unit_size * 0.25, height=ax.y_axis.unit_size * Vf * 2.5 / Q, color=HL,
                          stroke_width=2).set_fill(HL, 0.6)
        strip.move_to(ax.c2p(2.5 + 0.125, Vf * 2.5 / Q / 2))
        dq = M("dq", 30, color=HL).next_to(strip, DOWN, buff=0.12)
        Ql = M("Q", 34).next_to(ax.c2p(Q, 0), DOWN, buff=0.15)
        Vl = M("V", 34).next_to(ax.c2p(0, Vf), LEFT, buff=0.15)
        vdash = DashedLine(ax.c2p(0, Vf), ax.c2p(Q, Vf), color=MUTED, stroke_width=3)
        e1 = M(r"U = \int_0^Q \frac{q}{C}\,dq", 46).move_to(P(3.4, 2.6))
        e2 = M(r"U = \tfrac12 QV = \tfrac12 CV^2 = \frac{Q^2}{2C}", 46, color=PRIMARY).move_to(P(3.4, 1.2))
        with self.voiceover("Charging a capacitor means lifting each new bit of charge up to the voltage already "
                            "there. On a graph of V against q, the work is the area of a triangle: one half Q V, "
                            "which is one half C V squared, or Q squared over two C.") as vo:
            self.play(Create(ax), FadeIn(xl), FadeIn(yl), run_time=0.8)
            self.play(Create(line), FadeIn(Ql), FadeIn(Vl), Create(vdash), run_time=1.0)
            self.play(FadeIn(strip), FadeIn(dq), run_time=0.6)
            self.wait(vo.duration * 0.1)
            self.play(Write(e1), run_time=1.1)
            self.play(FadeOut(strip), FadeOut(dq), FadeIn(tri), run_time=0.8)
            self.play(Write(e2), run_time=1.4)

        rect = Polygon(ax.c2p(0, 0), ax.c2p(Q, Vf), ax.c2p(0, Vf), color=SECONDARY, stroke_width=0).set_fill(SECONDARY, 0.3)
        with self.voiceover("The battery, though, delivers all of its charge at the full voltage, so it does work Q "
                            "V. Half is stored. The other half becomes heat in the wires, whatever the "
                            "resistance.") as vo:
            self.play(FadeIn(rect), run_time=0.8)
            s_l = T("stored: ½QV", 26, color=PRIMARY).move_to(ax.c2p(3.0, 0.75))
            h_l = T("heat: ½QV", 26, color=SECONDARY).move_to(ax.c2p(1.0, 2.25))
            self.play(FadeIn(s_l), FadeIn(h_l), run_time=0.7)
            e3 = M(r"W_{\text{battery}} = QV", 44).move_to(P(3.4, -0.2))
            e4 = M(r"10\ \mu\text{F at } 100\ \text{V}:\ \ 0.1\ \text{J in},\ 0.05\ \text{J stored}", 34, color=GREEN)
            fit(e4, 6.8).move_to(P(3.4, -1.3))
            self.wait(vo.duration * 0.1)
            self.play(Write(e3), run_time=1.0)
            self.play(FadeIn(e4), run_time=0.8)

        with self.voiceover("Where is the energy kept? In the field itself: one half epsilon nought E squared, in "
                            "every cubic metre of the gap.") as vo:
            e5 = M(r"u = \tfrac12\varepsilon_0 E^2", 50, color=PURPLE).move_to(P(3.4, -2.7))
            self.wait(vo.duration * 0.3)
            self.play(Write(e5), run_time=1.2)

    # ------------------------------------------------------------ scene 5: charge sharing
    def s5(self):
        c1 = P(-3.4, 0.2)
        c2 = P(1.0, 0.2)
        top, bot = 1.6, -1.2
        g = VGroup(cap_sym(c1, vertical_wire=True, h=1.0), cap_sym(c2, vertical_wire=True, h=1.0),
                   wire(P(c1[0], 0.31), P(c1[0], top), P(-1.8, top)), wire(P(-0.6, top), P(c2[0], top), P(c2[0], 0.31)),
                   wire(P(c1[0], 0.09), P(c1[0], bot), P(c2[0], bot), P(c2[0], 0.09)))
        sw = Line(P(-1.8, top), P(-0.7, top + 0.6), color=WIRE, stroke_width=4)
        sw_closed = Line(P(-1.8, top), P(-0.6, top), color=WIRE, stroke_width=4)
        sd = VGroup(Dot(P(-1.8, top), radius=0.06, color=WIRE), Dot(P(-0.6, top), radius=0.06, color=WIRE))
        l1 = M(r"C_1 = 2\ \mu\text{F}", 32).next_to(c1, LEFT, buff=0.7)
        l2 = M(r"C_2 = 2\ \mu\text{F}", 32).next_to(c2, RIGHT, buff=0.7)
        v1 = M(r"100\ \text{V}", 34, color=POS_C).next_to(l1, DOWN, buff=0.25)
        v2 = M(r"0\ \text{V}", 34, color=MUTED).next_to(l2, DOWN, buff=0.25)
        f = M(r"V = \frac{C_1V_1 + C_2V_2}{C_1 + C_2}", 48).move_to(P(0, -2.5))
        with self.voiceover("Join a charged capacitor to an empty one. Charge is conserved, and both end at one "
                            "common voltage: the total charge over the total capacitance.") as vo:
            self.play(Create(g), Create(sw), FadeIn(sd), run_time=1.4)
            self.play(FadeIn(l1), FadeIn(l2), FadeIn(v1), FadeIn(v2), run_time=0.7)
            self.wait(vo.duration * 0.1)
            self.play(Transform(sw, sw_closed), run_time=0.6)
            self.play(Write(f), run_time=1.3)

        with self.voiceover("Two microfarads at a hundred volts, joined to an empty two microfarads, settle at fifty "
                            "volts. The energy drops from ten millijoules to five. Half of it is lost, as heat and "
                            "radiation, even though no battery is involved.") as vo:
            n1 = M(r"50\ \text{V}", 34, color=GREEN).move_to(v1)
            n2 = M(r"50\ \text{V}", 34, color=GREEN).move_to(v2)
            self.play(Transform(v1, n1), Transform(v2, n2), run_time=0.9)
            self.play(f.animate.move_to(P(-3.6, 3.0)).scale(0.75), run_time=0.6)
            e1 = M(r"U_{\text{before}} = \tfrac12(2\times10^{-6})(100)^2 = 10\ \text{mJ}", 36).move_to(P(2.6, 3.0))
            fit(e1, 7.0)
            e2 = M(r"U_{\text{after}} = \tfrac12(4\times10^{-6})(50)^2 = 5\ \text{mJ}", 36).next_to(e1, DOWN, buff=0.25)
            fit(e2, 7.0)
            self.play(Write(e1), run_time=1.2)
            self.play(Write(e2), run_time=1.2)
            loss = M(r"\Delta U = \frac{C_1C_2(V_1 - V_2)^2}{2(C_1 + C_2)} = 5\ \text{mJ lost}", 40, color=WARN)
            loss.move_to(P(0, -2.6))
            self.play(Write(loss), run_time=1.3)

    # ------------------------------------------------------------ scene 6: RC circuits
    def s6(self):
        # circuit on the left: cell (left side), resistor (top), capacitor (right side)
        xL, xR, top, bot = -5.8, -2.4, 1.8, -1.4
        circ = VGroup(
            wire(P(xL, -0.1), P(xL, bot), P(xR, bot), P(xR, 0.09)),
            wire(P(xL, 0.1), P(xL, top), P(-4.9, top)),
            resistor(P(-4.9, top), P(-3.3, top)),
            wire(P(-3.3, top), P(xR, top), P(xR, 0.31)),
            battery_sym(P(xL, 0.0), vertical_wire=True),
            cap_sym(P(xR, 0.2), vertical_wire=True),
        )
        lab = VGroup(M(r"\mathcal E", 34).next_to(P(xL, 0), LEFT, buff=0.5),
                     M("R", 34).next_to(P(-4.1, top), UP, buff=0.3),
                     M("C", 34).next_to(P(xR, 0.2), RIGHT, buff=0.5))
        k = M(r"\mathcal E - iR - \frac{q}{C} = 0", 44).move_to(P(3.2, 2.7))
        i0 = M(r"t = 0:\ \ i_0 = \frac{\mathcal E}{R}", 40).move_to(P(3.2, 1.4))
        i0n = T("empty capacitor = a plain wire", 24, color=MUTED).next_to(i0, DOWN, buff=0.2)
        with self.voiceover("Finally, charge it through a resistor. Kirchhoff's loop rule gives E minus i R, minus q "
                            "over C, equals zero. At the first instant the empty capacitor acts like a plain wire, "
                            "so the current is E over R. As charge builds up, the current dies away.") as vo:
            self.play(Create(circ), FadeIn(lab), run_time=1.6)
            self.wait(vo.duration * 0.1)
            self.play(Write(k), run_time=1.4)
            self.wait(vo.duration * 0.1)
            self.play(Write(i0), FadeIn(i0n), run_time=1.2)

        with self.voiceover("The charge climbs as C E, times one minus e to the minus t over R C. The time constant, "
                            "tau, is R C. After one tau the capacitor holds sixty three percent of its final charge, "
                            "not all of it. After about five tau it is essentially full, and then it acts like a "
                            "break in the circuit.") as vo:
            self.play(FadeOut(k), FadeOut(i0), FadeOut(i0n), run_time=0.4)
            ax = Axes(x_range=[0, 5.6, 1], y_range=[0, 1.1, 0.5], x_length=7.4, y_length=4.2,
                      axis_config={"color": MUTED, "include_ticks": False, "stroke_width": 3}).move_to(P(2.9, -0.7))
            tl = M(r"t", 34, color=MUTED).next_to(ax.x_axis.get_end(), DOWN, buff=0.15)
            ticks = VGroup(*[M(rf"{n}\tau" if n > 1 else r"\tau", 28, color=MUTED).next_to(ax.c2p(n, 0), DOWN, buff=0.15)
                             for n in range(1, 6)])
            qc = ax.plot(lambda t: 1 - np.exp(-t), x_range=[0, 5.2], color=PRIMARY, stroke_width=5)
            ic = DashedVMobject(ax.plot(lambda t: np.exp(-t), x_range=[0, 5.2], color=SECONDARY, stroke_width=4), num_dashes=40)
            qlab = M(r"q / Q_0", 32, color=PRIMARY).move_to(ax.c2p(3.3, 0.76))
            ilab = M(r"i / i_0", 32, color=SECONDARY).move_to(ax.c2p(2.1, 0.32))
            fq = M(r"q = C\mathcal E\left(1 - e^{-t/RC}\right),\quad \tau = RC", 42).move_to(P(1.6, 3.1))
            fit(fq, 9.0)
            self.play(Write(fq), run_time=1.4)
            self.play(Create(ax), FadeIn(tl), FadeIn(ticks), run_time=0.8)
            self.play(Create(qc), FadeIn(qlab), run_time=1.4)
            self.play(Create(ic), FadeIn(ilab), run_time=1.0)
            p63 = Dot(ax.c2p(1, 1 - np.exp(-1)), color=HL, radius=0.1)
            g63 = DashedLine(ax.c2p(0, 1 - np.exp(-1)), ax.c2p(1, 1 - np.exp(-1)), color=HL, stroke_width=3)
            g63v = DashedLine(ax.c2p(1, 0), ax.c2p(1, 1 - np.exp(-1)), color=HL, stroke_width=3)
            l63 = T("63%", 26, color=HL).next_to(g63, LEFT, buff=0.1)
            self.play(Create(g63v), Create(g63), FadeIn(p63), FadeIn(l63), run_time=0.9)
            full = T("about 5τ: full, acts as a break", 24, color=MUTED).move_to(ax.c2p(3.7, 1.14))
            self.play(FadeIn(full), run_time=0.6)

        with self.voiceover("For a hundred ohms and ten microfarads, tau is one millisecond. Reaching ninety "
                            "percent takes tau times the natural log of ten, about two point three "
                            "milliseconds.") as vo:
            self.clear_scene(0.5)
            r1 = M(r"\tau = RC = 100 \times 10\times10^{-6} = 1\ \text{ms}", 48).move_to(P(0, 1.2))
            r2 = M(r"1 - e^{-t/\tau} = 0.9 \;\Rightarrow\; t = \tau\ln 10 \approx 2.3\ \text{ms}", 48, color=GREEN)
            r2.move_to(P(0, -0.4))
            self.play(Write(r1), run_time=1.4)
            self.wait(vo.duration * 0.1)
            self.play(Write(r2), run_time=1.6)

    # ------------------------------------------------------------ scene 7: recap
    def s7(self):
        title = T("Chapter 2 in five lines", 38, color=PRIMARY, weight="BOLD").move_to(P(0, 3.2))
        lines = [
            (r"C = \frac{Q}{V} = \frac{\varepsilon_0 A}{d}", "geometry and material only"),
            (r"C_\parallel = \textstyle\sum C_i,\ \ \frac1{C_s} = \textstyle\sum \frac1{C_i}", "same V / same Q"),
            (r"C \to KC", "first ask: is V or Q fixed?"),
            (r"U = \tfrac12 CV^2 = \frac{Q^2}{2C}", "half the battery's work is heat"),
            (r"q = Q_0\left(1 - e^{-t/RC}\right)", "63% after one time constant"),
        ]
        rows = VGroup()
        for i, (tex, note) in enumerate(lines):
            m = M(tex, 38)
            n = T(note, 26, color=MUTED)
            num = T(f"{i + 1}.", 28, color=PRIMARY, weight="BOLD")
            rows.add(VGroup(num, m, n))
        for r in rows:
            r[0].move_to(P(-6.0, 0))
            r[1].next_to(r[0], RIGHT, buff=0.3)
            r[2].move_to(P(1.4 + r[2].width / 2, 0))
        rows.arrange(DOWN, buff=0.3, aligned_edge=LEFT).move_to(P(0, -0.1))
        for r in rows:
            r[2].move_to(P(1.4 + r[2].width / 2, r[1].get_y()))
        with self.voiceover("To recap. Capacitance is charge per volt, and it depends only on geometry and on what "
                            "fills the gap. In parallel, capacitances add. In series, their reciprocals "
                            "add.") as vo:
            self.play(FadeIn(title), run_time=0.6)
            self.play(FadeIn(rows[0], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.3)
            self.play(FadeIn(rows[1], shift=0.15 * UP), run_time=0.7)
        with self.voiceover("A dielectric multiplies C by K, but first ask whether V or Q is fixed. Charging wastes "
                            "half the battery's work. And through a resistor, the charge rises with time constant "
                            "R C.") as vo:
            self.play(FadeIn(rows[2], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.25)
            self.play(FadeIn(rows[3], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.25)
            self.play(FadeIn(rows[4], shift=0.15 * UP), run_time=0.7)
        with self.voiceover("Try the mastery quiz. The R C circuit let charge flow for a moment. Chapter three keeps "
                            "it flowing: steady currents, Ohm's law, and Kirchhoff's two laws.") as vo:
            nxt = T("Next: Chapter 3 · Current Electricity", 32, color=PRIMARY).move_to(P(0, -3.4))
            self.wait(vo.duration * 0.3)
            self.play(FadeIn(nxt, shift=0.2 * UP), run_time=0.8)
