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


def teardrop(t):
    return np.array([2.4 * np.cos(t), 1.5 * np.sin(t) * np.sin(t / 2), 0.0])


class EmCh1Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Electricity & Magnetism",
            "Chapter 1 · Gauss's Law and Electric Potential",
            "Chapter one. Gauss's law and electric potential.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7, self.s8):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ scene 1: flux
    def s1(self):
        C = P(-3.6, -0.4)
        half = 1.7
        th = ValueTracker(0.0)
        xs = np.arange(-6.4, -0.7, 0.32)
        rain = VGroup(*[Line(P(x, 2.7), P(x, -3.4), color=E_C, stroke_width=2.5).set_opacity(0.45) for x in xs])

        def window():
            u = np.array([np.cos(th.get_value()), np.sin(th.get_value()), 0])
            return Line(C - half * u, C + half * u, color=INK, stroke_width=9)

        def normal():
            v = th.get_value()
            n = np.array([np.sin(v), -np.cos(v), 0])
            return arrow(C, C + 1.5 * n, PRIMARY, sw=6)

        def through():
            c = np.cos(th.get_value())
            w = half * abs(c)
            col = HL if c > 1e-3 else SECONDARY
            g = VGroup()
            if w < 1e-3:
                return g
            for x in xs:
                if abs(x - C[0]) < w:
                    g.add(Line(P(x, 2.7), P(x, -3.4), color=col, stroke_width=5))
            return g

        thru = always_redraw(through)
        win = always_redraw(window)
        nrm = always_redraw(normal)
        nl = always_redraw(lambda: M(r"\vec A", 36, color=PRIMARY).move_to(
            C + 1.95 * np.array([np.sin(th.get_value()), -np.cos(th.get_value()), 0]) + 0.35 * RIGHT))
        el = M(r"\vec E", 40, color=E_C).move_to(P(-0.4, 2.3))

        with self.voiceover("Hold a window frame out in falling rain. Facing the sky, it catches the most rain. "
                            "Tilt it, and less gets through. Turn it edge on, and none does.") as vo:
            self.play(LaggedStart(*[Create(r) for r in rain], lag_ratio=0.03), run_time=1.0)
            self.play(Create(win), run_time=0.6)
            self.add(thru, win)
            self.play(th.animate.set_value(50 * DEGREES), run_time=1.6)
            self.play(th.animate.set_value(90 * DEGREES), run_time=1.4)
            self.wait(0.4)
            self.play(th.animate.set_value(0.0), run_time=1.2)

        f1 = M(r"\Phi = \vec E\cdot\vec A = EA\cos\theta", 50).move_to(P(3.5, 2.4))
        rd_l = M(r"\Phi / EA = \cos\theta =", 40).move_to(P(2.9, 0.9))
        rd = DecimalNumber(1.0, num_decimal_places=2, include_sign=True, font_size=40, color=INK)
        rd.add_updater(lambda m: m.set_value(np.cos(th.get_value())).next_to(rd_l, RIGHT, buff=0.15))
        with self.voiceover("Replace the rain by field lines and you have electric flux. Give the surface an area "
                            "vector, normal to it. Flux is E dot A, which is E A cos theta: the part of the field "
                            "that goes through, times the area.") as vo:
            self.play(FadeIn(el), GrowArrow(nrm), run_time=0.8)
            self.add(nl)
            self.wait(vo.duration * 0.25)
            self.play(Write(f1), run_time=1.5)
            self.play(FadeIn(rd_l), FadeIn(rd), run_time=0.6)
            self.play(th.animate.set_value(40 * DEGREES), run_time=1.5)

        with self.voiceover("At ninety degrees the flux is zero. Tilt further and it turns negative. For a closed "
                            "surface, the normal always points outward.") as vo:
            self.play(th.animate.set_value(90 * DEGREES), run_time=1.8)
            self.wait(vo.duration * 0.1)
            self.play(th.animate.set_value(130 * DEGREES), run_time=1.6)
            neg = T("negative: the field goes in against the normal", 24, color=SECONDARY).move_to(P(3.5, -0.3))
            fit(neg, 6.6)
            self.play(FadeIn(neg), run_time=0.6)
        rd.clear_updaters()
        for m in (thru, win, nrm, nl):
            m.clear_updaters()

        with self.voiceover("Now put a closed box in a uniform field. Every line that enters one face leaves "
                            "through the other, so the net flux is zero. But the field on the box is certainly "
                            "not zero.") as vo:
            self.clear_scene(0.5)
            lines = VGroup(*[arrow(P(-6.4, y), P(6.4, y), E_C, sw=3).set_opacity(0.6) for y in np.arange(-2.6, 2.7, 0.65)])
            box = Square(side_length=3.0, color=INK, stroke_width=5).set_fill(WHITE, 0.4).move_to(P(0, 0))
            nL = arrow(P(-1.5, 0), P(-2.6, 0), PRIMARY, sw=6)
            nR = arrow(P(1.5, 0), P(2.6, 0), PRIMARY, sw=6)
            lL = M(r"-EA", 40, color=SECONDARY).move_to(P(-3.6, 2.3)).add_background_rectangle(color=BG, opacity=0.9)
            lR = M(r"+EA", 40, color=HL).move_to(P(3.6, 2.3)).add_background_rectangle(color=BG, opacity=0.9)
            net = M(r"\Phi_{\text{net}} = 0 \quad\text{but}\quad \vec E \ne 0", 44).move_to(P(0, -3.4))
            net.add_background_rectangle(color=BG, opacity=0.95, buff=0.1)
            self.play(LaggedStart(*[GrowArrow(l) for l in lines], lag_ratio=0.05), run_time=1.0)
            self.play(Create(box), run_time=0.6)
            self.play(GrowArrow(nL), GrowArrow(nR), run_time=0.6)
            self.play(FadeIn(lL), FadeIn(lR), run_time=0.6)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(net), run_time=0.8)

    # ------------------------------------------------------------ scene 2: Gauss's law
    def s2(self):
        C = P(-3.4, -0.4)
        q = charge(1, C, r=0.28)
        rays = VGroup()
        for k in range(12):
            a = 2 * PI * (k + 0.5) / 12
            u = np.array([np.cos(a), np.sin(a), 0])
            ln = Line(C + 0.32 * u, C + 3.0 * u, color=LINE_C, stroke_width=2.2)
            tri = Triangle(color=LINE_C, stroke_width=0).set_fill(LINE_C, 1).scale(0.11).rotate(a - PI / 2)
            tri.move_to(C + 2.2 * u)
            rays.add(VGroup(ln, tri))
        rad = ValueTracker(1.4)
        sph = always_redraw(lambda: Circle(radius=rad.get_value(), color=PRIMARY, stroke_width=4).move_to(C)
                            .set_fill(PRIMARY, 0.06))
        chain = VGroup(
            M(r"\Phi = E \cdot 4\pi r^2", 44),
            M(r"= \frac{kq}{r^2}\cdot 4\pi r^2", 44),
            M(r"= 4\pi k q = \frac{q}{\varepsilon_0}", 44, color=GREEN),
        ).arrange(DOWN, buff=0.35, aligned_edge=LEFT).move_to(P(3.3, 0.8))

        with self.voiceover("Surround a point charge with a sphere. The field on it is k q over r squared, and "
                            "the sphere's area is four pi r squared. Multiply, and the radius cancels. The flux is "
                            "q over epsilon nought, whatever the size of the sphere.") as vo:
            self.play(FadeIn(q), LaggedStart(*[Create(r) for r in rays], lag_ratio=0.05), run_time=1.2)
            self.play(Create(sph), run_time=0.8)
            self.play(Write(chain[0]), run_time=1.0)
            self.play(Write(chain[1]), run_time=1.2)
            self.play(Write(chain[2]), run_time=1.2)
            self.play(rad.animate.set_value(2.6), run_time=1.4)
            self.play(rad.animate.set_value(0.9), run_time=1.2)
        sph.clear_updaters()

        with self.voiceover("That is Gauss's law. The flux out of any closed surface equals the charge inside, "
                            "over epsilon nought. Flux counts field lines, and a line from a charge outside goes "
                            "in, and comes out again.") as vo:
            self.clear_scene(0.5)
            O = P(-2.4, -0.3)
            blob = ParametricFunction(lambda t: O + (1.9 + 0.35 * np.sin(3 * t) + 0.2 * np.cos(2 * t))
                                      * np.array([np.cos(t), np.sin(t), 0]), t_range=[0, TAU], color=PRIMARY,
                                      stroke_width=4).set_fill(PRIMARY, 0.06)
            out_c = P(1.2, -0.3)
            ch = [(1.5, O), (4.0, out_c)]
            lines = field_lines(ch, per_unit=4, box=(-6.9, 6.9, -3.6, 3.6))

            def in_blob(q):
                d = q - O
                t = np.arctan2(d[1], d[0])
                return np.linalg.norm(d) < 1.9 + 0.35 * np.sin(3 * t) + 0.2 * np.cos(2 * t)

            for ln in lines:
                st = ln[0].get_start()
                if np.linalg.norm(st - out_c) > 0.5:
                    continue
                fl = [in_blob(q) for q in ln[0].get_anchors()]
                if sum(1 for i in range(1, len(fl)) if fl[i] != fl[i - 1]) >= 2:
                    ln[0].set_stroke(HL, width=4.5)
                    ln[1].set_fill(HL)
            ca = charge(1, O, r=0.26)
            cb = charge(1, out_c, r=0.34)
            lab_in = M(r"q_{\text{enc}}", 34, color=POS_C).next_to(ca, DOWN, buff=0.15)
            lab_out = T("outside", 24, color=MUTED).next_to(cb, DOWN, buff=0.15)
            lab_in.add_background_rectangle(color=BG, opacity=1, buff=0.05)
            lab_out.add_background_rectangle(color=BG, opacity=1, buff=0.05)
            self.play(Create(blob), FadeIn(ca), FadeIn(cb), run_time=0.8)
            self.play(LaggedStart(*[Create(l) for l in lines], lag_ratio=0.03), run_time=2.0)
            self.bring_to_front(ca, cb)
            self.play(FadeIn(lab_in), FadeIn(lab_out), run_time=0.5)
            law = M(r"\oint \vec E\cdot d\vec A = \frac{q_{\text{enc}}}{\varepsilon_0}", 50)
            law.move_to(P(4.0, -2.6))
            lbox = SurroundingRectangle(law, buff=0.25, corner_radius=0.15, color=PRIMARY, stroke_width=3)
            lbox.set_fill(BG, 0.95)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(lbox), Write(law), run_time=1.4)

        with self.voiceover("One warning. The E in Gauss's law is the total field, from every charge, inside and "
                            "out. Only the net flux ignores the charges outside.") as vo:
            warn = T("E = the total field; only the net flux ignores outside charges", 26, color=WARN)
            fit(warn, 12.5).move_to(P(0, 3.45))
            warn.add_background_rectangle(color=BG, opacity=0.95, buff=0.08)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(warn, shift=0.15 * DOWN), run_time=0.8)

        with self.voiceover("Put a charge at the centre of a cube, and the six identical faces share the flux: q "
                            "over six epsilon nought each. Put it at a corner, and eight such cubes would surround "
                            "it, so this cube gets one eighth, q over eight epsilon nought.") as vo:
            self.clear_scene(0.5)
            s = 2.4
            off = P(1.0, 0.75)
            c0 = P(-5.0, -1.6)
            f = Square(side_length=s, color=INK, stroke_width=3).move_to(c0 + P(s / 2, s / 2))
            b = f.copy().shift(off).set_stroke(opacity=0.5)
            edges = VGroup(*[Line(f.get_vertices()[i], b.get_vertices()[i], color=INK, stroke_width=3)
                             for i in range(4)])
            cube = VGroup(b, edges, f)
            ctr = c0 + P(s / 2, s / 2) + off / 2
            qd = charge(1, ctr, r=0.2)
            t1 = M(r"\Phi_{\text{face}} = \frac{q}{6\varepsilon_0}", 44).next_to(cube, DOWN, buff=0.35)
            self.play(Create(cube), run_time=1.0)
            self.play(FadeIn(qd), run_time=0.4)
            self.play(Write(t1), run_time=1.0)
            self.wait(vo.duration * 0.15)
            # 2D slice: four of the eight cubes around a corner charge
            g0 = P(2.6, 0.0)
            sq = 1.5
            grid = VGroup(*[Square(side_length=sq, color=INK, stroke_width=3).move_to(g0 + P((i - 0.5) * sq, (j - 0.5) * sq))
                            for i in range(2) for j in range(2)])
            grid[3].set_fill(HL, 0.3)
            qc = charge(1, g0, r=0.2)
            gl = T("slice through 4 of the 8 cubes", 22, color=MUTED).next_to(grid, UP, buff=0.25)
            t2 = M(r"\Phi_{\text{cube}} = \frac{q}{8\varepsilon_0}", 44, color=GREEN).next_to(grid, DOWN, buff=0.35)
            self.play(Create(grid), FadeIn(qc), FadeIn(gl), run_time=1.0)
            self.play(Write(t2), run_time=1.0)

    # ------------------------------------------------------------ scene 3: applying Gauss
    def s3(self):
        hdr = T("Symmetry picks the surface", 34, color=PRIMARY, weight="BOLD").move_to(P(0, 3.3))
        # panel 1: line charge + cylinder
        x1 = -4.6
        wire = Line(P(x1, -2.2), P(x1, 2.0), color=POS_C, stroke_width=7)
        cyl = VGroup(Ellipse(width=1.8, height=0.45, color=INK, stroke_width=3).move_to(P(x1, 1.0)),
                     Ellipse(width=1.8, height=0.45, color=INK, stroke_width=3).move_to(P(x1, -1.2)),
                     Line(P(x1 - 0.9, 1.0), P(x1 - 0.9, -1.2), color=INK, stroke_width=3),
                     Line(P(x1 + 0.9, 1.0), P(x1 + 0.9, -1.2), color=INK, stroke_width=3))
        rad1 = VGroup(*[arrow(P(x1 + sgn * 0.15, y), P(x1 + sgn * 1.55, y), E_C, sw=4)
                        for y in (0.5, -0.1, -0.7) for sgn in (-1, 1)])
        f1 = M(r"E = \frac{\lambda}{2\pi\varepsilon_0 r}", 40).move_to(P(x1, -2.95))
        # panel 2: sheet + pillbox
        x2 = 0.0
        sheet = Polygon(P(x2 - 0.5, -2.0), P(x2 + 0.5, -1.4), P(x2 + 0.5, 2.2), P(x2 - 0.5, 1.6),
                        color=POS_C, stroke_width=3).set_fill(POS_C, 0.25)
        pill = Rectangle(width=2.6, height=1.0, color=INK, stroke_width=3).move_to(P(x2, 0.1))
        rad2 = VGroup(*[arrow(P(x2 + sgn * 0.45, y), P(x2 + sgn * 2.0, y), E_C, sw=4)
                        for y in (1.2, 0.1, -1.0) for sgn in (-1, 1)])
        f2 = M(r"E = \frac{\sigma}{2\varepsilon_0}", 40).move_to(P(x2, -2.95))
        # panel 3: shell
        x3 = 4.6
        shell = Circle(radius=1.0, color=POS_C, stroke_width=6).move_to(P(x3, 0.1))
        gs = DashedVMobject(Circle(radius=1.6, color=INK, stroke_width=3).move_to(P(x3, 0.1)), num_dashes=30)
        rad3 = VGroup(*[arrow(P(x3, 0.1) + 1.05 * np.array([np.cos(a), np.sin(a), 0]),
                              P(x3, 0.1) + 1.95 * np.array([np.cos(a), np.sin(a), 0]), E_C, sw=4)
                        for a in np.arange(0, TAU, TAU / 8) + PI / 8])
        zero = M(r"E = 0", 30).move_to(P(x3, 0.1))
        f3 = M(r"E = \frac{kQ}{r^2}\ \text{outside}", 36).move_to(P(x3, -2.95))

        with self.voiceover("Gauss's law becomes a one line shortcut when symmetry tells you the shape of the "
                            "field. Around a long line of charge, choose a cylinder. Only its curved side catches "
                            "flux, and the field falls as one over r.") as vo:
            self.play(FadeIn(hdr), run_time=0.6)
            self.play(Create(wire), run_time=0.6)
            self.play(Create(cyl), LaggedStart(*[GrowArrow(a) for a in rad1], lag_ratio=0.1), run_time=1.2)
            self.wait(vo.duration * 0.15)
            self.play(Write(f1), run_time=1.0)
        with self.voiceover("Beside a large flat sheet, choose a pillbox. The field is sigma over two epsilon "
                            "nought, and distance does not appear at all. Flat symmetry means the lines never "
                            "spread out, so the field does not weaken as you move away.") as vo:
            self.play(FadeIn(sheet), run_time=0.5)
            self.play(Create(pill), LaggedStart(*[GrowArrow(a) for a in rad2], lag_ratio=0.1), run_time=1.2)
            self.wait(vo.duration * 0.15)
            self.play(Write(f2), run_time=1.0)
        with self.voiceover("A charged spherical shell has no field at all inside, and outside it acts like a "
                            "point charge at its centre.") as vo:
            self.play(Create(shell), FadeIn(zero), run_time=0.8)
            self.play(Create(gs), LaggedStart(*[GrowArrow(a) for a in rad3], lag_ratio=0.1), run_time=1.0)
            self.play(Write(f3), run_time=1.0)

        with self.voiceover("A uniformly charged solid sphere is different inside. The enclosed charge grows "
                            "with r cubed, so the field grows in a straight line, peaks at the surface, then falls "
                            "as one over r squared. At half the radius and at twice the radius, the fields are in "
                            "the ratio two to one.") as vo:
            self.clear_scene(0.5)
            ax = Axes(x_range=[0, 4, 1], y_range=[0, 1.15, 0.5], x_length=9.5, y_length=4.6,
                      axis_config={"color": MUTED, "include_ticks": False, "stroke_width": 3}).move_to(P(0, -0.4))
            xl = M("r", 36, color=MUTED).next_to(ax.x_axis.get_end(), DOWN, buff=0.15)
            yl = M("E", 36, color=MUTED).next_to(ax.y_axis.get_end(), LEFT, buff=0.15)
            inside = ax.plot(lambda r: r, x_range=[0, 1], color=PRIMARY, stroke_width=5)
            outside = ax.plot(lambda r: 1 / r ** 2, x_range=[1, 4], color=PRIMARY, stroke_width=5)
            Rl = DashedLine(ax.c2p(1, 0), ax.c2p(1, 1), color=MUTED, stroke_width=3)
            Rt = M("R", 34, color=MUTED).next_to(ax.c2p(1, 0), DOWN, buff=0.15)
            lin = M(r"\frac{kQr}{R^3}", 40, color=PRIMARY).next_to(ax.c2p(0.5, 0.5), LEFT, buff=0.3)
            sq = M(r"\frac{kQ}{r^2}", 40, color=PRIMARY).next_to(ax.c2p(2.2, 1 / 2.2 ** 2), UR, buff=0.2)
            self.play(Create(ax), FadeIn(xl), FadeIn(yl), run_time=0.8)
            self.play(Create(inside), FadeIn(lin), run_time=1.2)
            self.play(Create(Rl), FadeIn(Rt), run_time=0.4)
            self.play(Create(outside), FadeIn(sq), run_time=1.4)
            d1 = Dot(ax.c2p(0.5, 0.5), color=HL, radius=0.1)
            d2 = Dot(ax.c2p(2.0, 0.25), color=HL, radius=0.1)
            self.wait(vo.duration * 0.1)
            rt = M(r"\frac{E(R/2)}{E(2R)} = \frac{1/2}{1/4} = 2", 42, color=GREEN).move_to(P(3.3, 2.4))
            self.play(FadeIn(d1), FadeIn(d2), Write(rt), run_time=1.2)

    # ------------------------------------------------------------ scene 4: potential
    def s4(self):
        C = P(-4.8, -1.2)
        q = charge(1, C, r=0.3)
        tq = charge(1, P(0.8, -1.2), r=0.16)
        push = always_redraw(lambda: arrow(tq.get_center() + 0.2 * RIGHT,
                                           tq.get_center() + (0.25 + 2.2 / max(np.linalg.norm(tq.get_center() - C), 0.8) ** 1.0) * RIGHT,
                                           F_C, sw=5))
        inf = T("from infinity", 24, color=MUTED).move_to(P(0.8, -1.9))
        f1 = M(r"V = \frac{W_{\infty\to P}}{q_0}", 48).move_to(P(3.6, 2.4))
        f2 = M(r"V = \frac{kq}{r}", 52, color=PRIMARY).move_to(P(3.6, 0.9))
        f3 = T("a number, not an arrow: potentials add", 26, color=MUTED).move_to(P(3.6, -0.3))
        with self.voiceover("Now a second way to read the field. Carry a test charge in from infinity, against "
                            "the push. The work done per unit charge is the electric potential, V. For a point "
                            "charge, V is k q over r. It is a number, not an arrow, so potentials simply "
                            "add.") as vo:
            self.play(FadeIn(q), FadeIn(tq), FadeIn(inf), run_time=0.6)
            self.add(push)
            self.play(tq.animate.move_to(C + 1.6 * RIGHT), run_time=2.6, rate_func=linear)
            self.play(Write(f1), run_time=1.2)
            self.play(Write(f2), run_time=1.0)
            self.play(FadeIn(f3), run_time=0.6)
        push.clear_updaters()

        def graph(where, fn, yr, segs, color):
            ax = Axes(x_range=[-4.5, 4.5, 1], y_range=yr, x_length=6.0, y_length=4.0,
                      axis_config={"color": MUTED, "include_ticks": False, "stroke_width": 3}).move_to(where)
            curves = VGroup(*[ax.plot(fn, x_range=s, color=color, stroke_width=4) for s in segs])
            return ax, curves

        with self.voiceover("The field points downhill: E is minus the slope of V. Along the line through two "
                            "equal positive charges, the potential has a flat point in the middle. The slope is "
                            "zero, so E is zero there. But V is not zero.") as vo:
            self.clear_scene(0.5)
            hdr = M(r"E = -\frac{dV}{dr}", 50).move_to(P(0, 3.2))
            ax1, c1 = graph(P(-3.4, -0.6), lambda x: 1 / abs(x + 2) + 1 / abs(x - 2), [0, 4.5, 1],
                            [[-4.5, -2.24], [-1.76, 1.76], [2.24, 4.5]], PRIMARY)
            ch1 = VGroup(charge(1, ax1.c2p(-2, 0), r=0.18), charge(1, ax1.c2p(2, 0), r=0.18))
            v1 = M("V", 32, color=MUTED).next_to(ax1.y_axis.get_end(), LEFT, buff=0.1)
            self.play(Write(hdr), run_time=1.0)
            self.play(Create(ax1), FadeIn(ch1), FadeIn(v1), run_time=0.8)
            self.play(Create(c1), run_time=1.4)
            tan1 = Line(ax1.c2p(-1.2, 1), ax1.c2p(1.2, 1), color=HL, stroke_width=4)
            d1 = Dot(ax1.c2p(0, 1), color=HL, radius=0.09)
            n1 = M(r"E = 0,\ V \ne 0", 36).next_to(ax1, DOWN, buff=0.3)
            self.wait(vo.duration * 0.1)
            self.play(Create(tan1), FadeIn(d1), run_time=0.7)
            self.play(Write(n1), run_time=0.9)

        with self.voiceover("Across a dipole it is the other way round. At the midpoint V is zero, but the slope "
                            "is steep, so the field is strong. E equals zero and V equals zero are separate "
                            "questions.") as vo:
            ax2, c2 = graph(P(3.4, -0.6), lambda x: 1 / abs(x + 2) - 1 / abs(x - 2), [-4.5, 4.5, 1],
                            [[-4.5, -2.24], [-1.76, 1.76], [2.24, 4.5]], SECONDARY)
            ch2 = VGroup(charge(1, ax2.c2p(-2, 0), r=0.18), charge(-1, ax2.c2p(2, 0), r=0.18))
            v2 = M("V", 32, color=MUTED).next_to(ax2.y_axis.get_end(), LEFT, buff=0.1)
            self.play(Create(ax2), FadeIn(ch2), FadeIn(v2), run_time=0.8)
            self.play(Create(c2), run_time=1.4)
            tan2 = Line(ax2.c2p(-1.3, 0.65), ax2.c2p(1.3, -0.65), color=HL, stroke_width=4)
            d2 = Dot(ax2.c2p(0, 0), color=HL, radius=0.09)
            n2 = M(r"V = 0,\ E \ne 0", 36).next_to(ax2, DOWN, buff=0.3)
            self.play(Create(tan2), FadeIn(d2), run_time=0.7)
            self.play(Write(n2), run_time=0.9)

    # ------------------------------------------------------------ scene 5: equipotentials
    def s5(self):
        C = P(-3.6, -0.5)
        q = charge(1, C, r=0.26)
        radii = [(1.0, "90 V"), (1.5, "60 V"), (3.0, "30 V")]
        rings = VGroup(*[DashedVMobject(Circle(radius=r, color=PRIMARY, stroke_width=3).move_to(C), num_dashes=int(30 * r))
                         for r, _ in radii])
        lab_ang = [0.0, -PI / 4, 0.0]
        labs = VGroup(*[T(t, 22, color=PRIMARY).move_to(C + r * np.array([np.cos(a), np.sin(a), 0]))
                        for (r, t), a in zip(radii, lab_ang)])
        for l in labs:
            l.add_background_rectangle(color=BG, opacity=0.9, buff=0.04)
        rays = VGroup()
        for k in range(8):
            a = 2 * PI * k / 8 + PI / 8
            u = np.array([np.cos(a), np.sin(a), 0])
            ln = Line(C + 0.3 * u, C + 3.35 * u, color=LINE_C, stroke_width=2.2)
            tri = Triangle(color=LINE_C, stroke_width=0).set_fill(LINE_C, 1).scale(0.1).rotate(a - PI / 2).move_to(C + 2.3 * u)
            rays.add(VGroup(ln, tri))
        a0 = 2 * PI * 1 / 8 + PI / 8
        u0 = np.array([np.cos(a0), np.sin(a0), 0])
        pt = C + 1.5 * u0
        ra = RightAngle(Line(pt, pt + u0), Line(pt, pt + np.array([-u0[1], u0[0], 0])), length=0.22, color=INK,
                        stroke_width=2.5)

        with self.voiceover("Join the points that share a potential and you get equipotential surfaces. Field "
                            "lines cross them at right angles, so moving a charge along one takes no work at "
                            "all.") as vo:
            self.play(FadeIn(q), LaggedStart(*[Create(r) for r in rays], lag_ratio=0.05), run_time=1.2)
            self.play(LaggedStart(*[Create(r) for r in rings], lag_ratio=0.3), run_time=1.6)
            self.wait(vo.duration * 0.1)
            self.play(Create(ra), run_time=0.6)
            w0 = M(r"W = 0 \text{ along one}", 36, color=GREEN).move_to(P(3.4, 2.7))
            self.play(FadeIn(w0), run_time=0.6)

        with self.voiceover("Around a point charge they are not evenly spaced. For a ten nanocoulomb charge, the "
                            "ninety, sixty and thirty volt surfaces sit at one, one and a half, and three metres. "
                            "Equal steps in V crowd together where the field is strong.") as vo:
            f = M(r"r = \frac{kq}{V} = \frac{90}{V}\ \text{m}", 40).move_to(P(3.4, 1.5))
            self.play(LaggedStart(*[FadeIn(l) for l in labs], lag_ratio=0.3), run_time=1.2)
            self.play(Write(f), run_time=1.2)
            tbl = M(r"90\,\text{V}: 1\ \text{m}\quad 60\,\text{V}: 1.5\ \text{m}\quad 30\,\text{V}: 3\ \text{m}", 32)
            tbl.move_to(P(3.4, 0.5))
            fit(tbl, 6.6)
            self.play(FadeIn(tbl), run_time=0.8)

        with self.voiceover("In a uniform field they are flat, evenly spaced planes. Planes at thirty, twenty and "
                            "ten volts, five centimetres apart, mean a field of two hundred volts per metre, "
                            "pointing from high potential to low.") as vo:
            x0 = 1.4
            planes = VGroup(*[DashedLine(P(x0 + 1.6 * i, -3.2), P(x0 + 1.6 * i, -0.4), color=PRIMARY, stroke_width=3)
                              for i in range(3)])
            pls = VGroup(*[T(t, 22, color=PRIMARY).next_to(planes[i], UP, buff=0.1) for i, t in enumerate(["30 V", "20 V", "10 V"])])
            fa = VGroup(*[arrow(P(x0 - 0.6, y), P(x0 + 3.9, y), E_C, sw=3) for y in (-1.1, -2.5)])
            br = BraceBetweenPoints(P(x0, -3.25), P(x0 + 1.6, -3.25), direction=DOWN, color=MUTED)
            brl = T("5 cm", 22, color=MUTED).next_to(br, DOWN, buff=0.05)
            ef = M(r"E = \frac{10\ \text{V}}{0.05\ \text{m}} = 200\ \text{V/m}", 34, color=GREEN)
            ef.move_to(P(x0 + 3.9, -1.8)).shift(0.9 * RIGHT)
            self.play(FadeOut(tbl), FadeOut(f), run_time=0.4)
            self.play(Create(planes), FadeIn(pls), run_time=1.0)
            self.play(LaggedStart(*[GrowArrow(a) for a in fa], lag_ratio=0.2), FadeIn(br), FadeIn(brl), run_time=1.0)
            ef.move_to(P(4.0, 1.4))
            self.wait(vo.duration * 0.1)
            self.play(Write(ef), run_time=1.2)

    # ------------------------------------------------------------ scene 6: energy and work
    def s6(self):
        pts = [P(-4.6, -1.8), P(-1.8, -1.8), P(-3.2, 0.62)]
        qs = VGroup(*[charge(1, p, r=0.22) for p in pts])
        pairs = VGroup(*[DashedLine(pts[i], pts[j], color=MUTED, stroke_width=3)
                         for i, j in ((0, 1), (1, 2), (0, 2))])
        f1 = M(r"U = \frac{kq_1q_2}{r}", 46).move_to(P(3.2, 2.6))
        f1n = T("for each pair; add over every pair", 24, color=MUTED).next_to(f1, DOWN, buff=0.2)
        with self.voiceover("Potential energy belongs to pairs of charges. For two charges it is k q one q two over "
                            "r. To assemble a group, add that up over every pair, once each.") as vo:
            self.play(FadeIn(qs), run_time=0.6)
            self.play(Create(pairs), run_time=1.0)
            self.wait(vo.duration * 0.15)
            self.play(Write(f1), FadeIn(f1n), run_time=1.2)

        with self.voiceover("The work the field does moving a charge from A to B is q times V A minus V B. Only the "
                            "two end points matter. A long winding path takes exactly the same work as the "
                            "straight one.") as vo:
            self.clear_scene(0.5)
            src = charge(1, P(-5.2, -0.6), r=0.3)
            A = P(-3.2, 1.6)
            B = P(0.2, -1.8)
            da = Dot(A, color=INK)
            db = Dot(B, color=INK)
            la = M("A", 34).next_to(A, UL, buff=0.1)
            lb = M("B", 34).next_to(B, DR, buff=0.1)
            p1 = DashedLine(A, B, color=PURPLE, stroke_width=4)
            p2 = CubicBezier(A, A + P(4.4, 1.6), B + P(-4.6, -2.0), B, color=SECONDARY, stroke_width=4)
            w = M(r"W_{A\to B} = q\,(V_A - V_B)", 46).move_to(P(3.6, 1.6))
            wn = T("same for every path", 26, color=GREEN).next_to(w, DOWN, buff=0.3)
            self.play(FadeIn(src), FadeIn(da), FadeIn(db), FadeIn(la), FadeIn(lb), run_time=0.6)
            self.play(Create(p1), run_time=0.8)
            self.play(Create(p2), run_time=1.2)
            self.play(Write(w), run_time=1.2)
            self.play(FadeIn(wn), run_time=0.6)

        with self.voiceover("Energy conservation does the rest. An electron accelerated from rest through a hundred "
                            "volts gains a hundred electron volts of kinetic energy, and reaches five point nine "
                            "million metres per second.") as vo:
            self.clear_scene(0.5)
            pl1 = Rectangle(width=0.25, height=4.4, color=NEG_C, stroke_width=2).set_fill(NEG_C, 0.8).move_to(P(-5.4, -0.4))
            pl2 = Rectangle(width=0.25, height=4.4, color=POS_C, stroke_width=2).set_fill(POS_C, 0.8).move_to(P(-0.8, -0.4))
            v0 = T("0 V", 24, color=NEG_C).next_to(pl1, UP, buff=0.15)
            v1 = T("100 V", 24, color=POS_C).next_to(pl2, UP, buff=0.15)
            e = charge(-1, P(-5.0, -0.4), r=0.16)
            self.play(FadeIn(pl1), FadeIn(pl2), FadeIn(v0), FadeIn(v1), FadeIn(e), run_time=0.7)
            self.play(e.animate.move_to(P(-1.2, -0.4)), run_time=2.0, rate_func=rate_functions.ease_in_quad)
            eqs = VGroup(
                M(r"K = eV = 100\ \text{eV} = 1.6\times10^{-17}\ \text{J}", 38),
                M(r"\tfrac12 m v^2 = eV", 38),
                M(r"v = \sqrt{\frac{2eV}{m}} \approx 5.9\times10^{6}\ \text{m/s}", 38, color=GREEN),
            ).arrange(DOWN, buff=0.4, aligned_edge=LEFT).move_to(P(3.3, -0.3))
            fit(eqs, 7.0)
            for m in eqs:
                self.play(Write(m), run_time=1.0)

    # ------------------------------------------------------------ scene 7: conductors
    def s7(self):
        O = P(-3.2, -0.2)
        shape = ParametricFunction(lambda t: O + teardrop(t), t_range=[0, TAU], color=INK, stroke_width=4)
        shape.set_fill(ManimColor("#E9DFD8"), 1)
        inside = M(r"\vec E = 0", 40).move_to(O + 0.5 * LEFT)
        same = T("one potential throughout", 26, color=MUTED).move_to(O + 2.1 * DOWN)

        def normal_at(t):
            d = teardrop(t + 1e-3) - teardrop(t - 1e-3)
            n = np.array([d[1], -d[0], 0])
            return n / np.linalg.norm(n)

        ts = [0.0, 0.6, TAU - 0.6, 0.9, TAU - 0.9] + list(np.linspace(1.3, TAU - 1.3, 8))
        plus = VGroup()
        out = VGroup()
        for t in ts:
            p = O + teardrop(t)
            n = normal_at(t) if abs(t) > 1e-6 else RIGHT
            pl = VGroup(Line(LEFT * 0.08, RIGHT * 0.08, color=POS_C, stroke_width=4),
                        Line(DOWN * 0.08, UP * 0.08, color=POS_C, stroke_width=4)).move_to(p - (0.3 if abs(t) < 1e-6 else 0.17) * n)
            plus.add(pl)
            L = 0.55 + 1.1 * max(np.cos(t), 0) ** 6
            out.add(arrow(p + 0.05 * n, p + L * n, E_C, sw=4))

        with self.voiceover("Finally, conductors. Free charges inside a conductor move until they feel no force. "
                            "So once things settle, the field inside is zero, any extra charge sits on the surface, "
                            "and the whole conductor is at one potential.") as vo:
            self.play(Create(shape), run_time=1.0)
            self.play(FadeIn(inside), run_time=0.6)
            self.play(LaggedStart(*[FadeIn(p) for p in plus], lag_ratio=0.05), run_time=1.0)
            self.wait(vo.duration * 0.15)
            self.play(FadeIn(same), run_time=0.6)
        with self.voiceover("Just outside, the field is perpendicular to the surface, with strength sigma over "
                            "epsilon nought. It is strongest where the surface curves most sharply.") as vo:
            self.play(LaggedStart(*[GrowArrow(a) for a in out], lag_ratio=0.05), run_time=1.4)
            sf = M(r"E_{\text{surface}} = \frac{\sigma}{\varepsilon_0}", 46).move_to(P(3.6, 2.6))
            self.play(Write(sf), run_time=1.1)

        with self.voiceover("Join a one centimetre sphere carrying eight microcoulombs to a neutral three "
                            "centimetre sphere. They end at the same potential, so the charge splits in "
                            "proportion to the radius: two microcoulombs and six. The small sphere has the "
                            "greater surface density, which is why charge crowds at sharp points.") as vo:
            self.clear_scene(0.5)
            c1 = P(-4.4, -0.6)
            c2 = P(0.6, -0.6)
            s1 = Circle(radius=0.5, color=INK, stroke_width=4).set_fill(ManimColor("#E9DFD8"), 1).move_to(c1)
            s2 = Circle(radius=1.5, color=INK, stroke_width=4).set_fill(ManimColor("#E9DFD8"), 1).move_to(c2)
            wire = Line(c1 + 0.5 * RIGHT, c2 + 1.5 * LEFT, color=INK, stroke_width=3)
            r1 = T("1 cm", 22, color=MUTED).next_to(s1, DOWN, buff=0.2)
            r2 = T("3 cm", 22, color=MUTED).next_to(s2, DOWN, buff=0.2)
            q1 = M(r"8\ \mu\text{C}", 36, color=POS_C).next_to(s1, UP, buff=0.3)
            q2 = M(r"0", 36, color=MUTED).next_to(s2, UP, buff=0.3)
            self.play(FadeIn(s1), FadeIn(s2), FadeIn(r1), FadeIn(r2), FadeIn(q1), FadeIn(q2), run_time=0.8)
            self.play(Create(wire), run_time=0.6)
            q1b = M(r"2\ \mu\text{C}", 36, color=POS_C).move_to(q1)
            q2b = M(r"6\ \mu\text{C}", 36, color=POS_C).move_to(q2)
            self.wait(vo.duration * 0.15)
            self.play(Transform(q1, q1b), Transform(q2, q2b), run_time=1.0)
            eqs = VGroup(
                M(r"\frac{kQ_1}{R_1} = \frac{kQ_2}{R_2}", 40),
                M(r"Q \propto R", 44, color=GREEN),
                M(r"\sigma \propto \frac{1}{R}", 44, color=PRIMARY),
            ).arrange(DOWN, buff=0.4).move_to(P(4.8, 0.2))
            for m in eqs:
                self.play(Write(m), run_time=0.9)

    # ------------------------------------------------------------ scene 8: recap
    def s8(self):
        title = T("Chapter 1 in five lines", 38, color=PRIMARY, weight="BOLD").move_to(P(0, 3.2))
        lines = [
            (r"\oint\vec E\cdot d\vec A = \frac{q_{\text{enc}}}{\varepsilon_0}", "flux counts enclosed charge"),
            (r"\frac{\lambda}{2\pi\varepsilon_0 r},\ \ \frac{\sigma}{2\varepsilon_0},\ \ \frac{kQ}{r^2}", "symmetry picks the surface"),
            (r"V = \frac{kq}{r},\ \ E = -\frac{dV}{dr}", "potentials add as numbers"),
            (r"W = q\,(V_A - V_B)", "the path does not matter"),
            (r"E_{\text{inside}} = 0", "conductors: one potential"),
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
            r[2].move_to(P(1.6 + r[2].width / 2, 0))
        rows.arrange(DOWN, buff=0.3, aligned_edge=LEFT).move_to(P(0, -0.1))
        for r in rows:
            r[2].move_to(P(1.6 + r[2].width / 2, r[1].get_y()))
        with self.voiceover("To recap. Flux counts the field lines through a surface, and Gauss's law says the "
                            "flux out of a closed surface is the enclosed charge over epsilon nought. With "
                            "symmetry, that gives the field in one line.") as vo:
            self.play(FadeIn(title), run_time=0.6)
            self.play(FadeIn(rows[0], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.3)
            self.play(FadeIn(rows[1], shift=0.15 * UP), run_time=0.7)
        with self.voiceover("Potential is energy per unit charge. It adds as plain numbers, and the field points "
                            "down its slope. Work between two points ignores the path. And a conductor is one "
                            "potential, with no field inside.") as vo:
            self.play(FadeIn(rows[2], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.25)
            self.play(FadeIn(rows[3], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.25)
            self.play(FadeIn(rows[4], shift=0.15 * UP), run_time=0.7)
        with self.voiceover("Try the mastery quiz. Then chapter two puts two conductors side by side, carrying "
                            "plus and minus Q. The ratio of charge to potential difference depends only on their "
                            "shape. That ratio is capacitance.") as vo:
            nxt = T("Next: Chapter 2 · Capacitors", 32, color=PRIMARY).move_to(P(0, -3.4))
            self.wait(vo.duration * 0.3)
            self.play(FadeIn(nxt, shift=0.2 * UP), run_time=0.8)
