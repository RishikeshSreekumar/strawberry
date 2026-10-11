import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

# Chapter colour roles (light background).
E_C = SECONDARY  # electrons, n-type, valence band fill = teal
H_C = PRIMARY  # holes, p-type = strawberry red
CB_C = ACCENT  # conduction band = amber
PH_C = PURPLE  # photons / light, fields
HL = ManimColor("#D19A00")  # highlight gold
COPPER = ManimColor("#B87333")
WARN = PRIMARY

# `say` reads "LED" as the word "led"; spell it out.
LED = "[[char LTRL]]LED[[char NORM]]"

# Diode model used for every I-V curve (matches lesson 5.3: 1.6 mA at 0.6 V, 12 mA at 0.7 V).
IS = 8.9e-6  # mA
ETA = 0.0496  # V


def diode_i(v):
    return IS * (np.exp(v / ETA) - 1)


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


def electron(p, r=0.09):
    return Dot(p, radius=r, color=E_C)


def hole(p, r=0.1):
    return Circle(radius=r, color=H_C, stroke_width=3).move_to(p)


def band(x0, x1, y0, y1, color, opacity):
    r = Rectangle(width=x1 - x0, height=y1 - y0, color=color, stroke_width=2)
    r.set_fill(color, opacity).move_to(P((x0 + x1) / 2, (y0 + y1) / 2))
    return r


def axes(xr, yr, xl, yl, center):
    ax = Axes(x_range=xr, y_range=yr, x_length=xl, y_length=yl, tips=True,
              axis_config={"color": INK, "stroke_width": 2, "include_ticks": False,
                           "tip_width": 0.18, "tip_height": 0.18})
    ax.move_to(center)
    return ax


def photon(start, end, color=PH_C, waves=5, amp=0.14):
    start, end = np.array(start), np.array(end)
    d = end - start
    L = np.linalg.norm(d)
    u = d / L
    n = np.array([-u[1], u[0], 0.0])
    body_end = 0.82

    def f(t):
        return start + u * L * body_end * t + n * amp * np.sin(2 * PI * waves * t)

    wave = ParametricFunction(f, t_range=[0, 1, 0.01], color=color, stroke_width=4)
    tip = Arrow(start + u * L * body_end, end, buff=0, color=color, stroke_width=4,
                max_tip_length_to_length_ratio=0.6)
    return VGroup(wave, tip)


# ---------------------------------------------------------------- circuit symbols
def diode_sym(center, direction=RIGHT, size=0.5, color=INK, zener=False):
    c = np.array(center)
    d = np.array(direction, dtype=float)
    d = d / np.linalg.norm(d)
    n = np.array([-d[1], d[0], 0.0])
    tip = c + d * size / 2
    tri = Polygon(c - d * size / 2 + n * size / 2, c - d * size / 2 - n * size / 2, tip,
                  color=color, stroke_width=3)
    tri.set_fill(color, 0.85)
    if zener:
        bar = VMobject(color=color, stroke_width=3).set_points_as_corners([
            tip + n * size / 2 + d * 0.12, tip + n * size / 2, tip - n * size / 2, tip - n * size / 2 - d * 0.12])
    else:
        bar = Line(tip + n * size / 2, tip - n * size / 2, color=color, stroke_width=3)
    return VGroup(tri, bar)


def resistor(a, b, zigs=6, amp=0.16, color=INK):
    a, b = np.array(a), np.array(b)
    d = b - a
    L = np.linalg.norm(d)
    u = d / L
    n = np.array([-u[1], u[0], 0.0])
    pts = [a]
    for k in range(zigs):
        t = (k + 0.5) / zigs
        pts.append(a + u * L * t + n * amp * (1 if k % 2 == 0 else -1))
    pts.append(b)
    return VMobject(color=color, stroke_width=3).set_points_as_corners(pts)


def battery_v(center, color=INK):
    """Vertical-wire cell: long (+) plate on top."""
    c = np.array(center)
    long = Line(c + P(-0.32, 0.09), c + P(0.32, 0.09), color=color, stroke_width=4)
    short = Line(c + P(-0.18, -0.09), c + P(0.18, -0.09), color=color, stroke_width=6)
    return VGroup(long, short)


def wire(*pts, color=INK):
    return VMobject(color=color, stroke_width=3).set_points_as_corners([np.array(p) for p in pts])


# ---------------------------------------------------------------- logic gates
def and_body(c, s, color=INK):
    w, h = 1.2 * s, 1.0 * s
    L = c[0] - w / 2
    ac = P(L + w - h / 2, c[1])
    top, bot = c[1] + h / 2, c[1] - h / 2
    body = VGroup(
        Line(P(L, top), P(ac[0], top), color=color, stroke_width=3),
        Arc(radius=h / 2, start_angle=PI / 2, angle=-PI, arc_center=ac, color=color, stroke_width=3),
        Line(P(ac[0], bot), P(L, bot), color=color, stroke_width=3),
        Line(P(L, bot), P(L, top), color=color, stroke_width=3),
    )
    return body, [P(L, c[1] + h / 4), P(L, c[1] - h / 4)], P(L + w, c[1])


def or_body(c, s, color=INK):
    w, h = 1.2 * s, 1.0 * s
    L = c[0] - w / 2
    top, bot = c[1] + h / 2, c[1] - h / 2
    tip = P(L + w, c[1])
    body = VGroup(
        ArcBetweenPoints(P(L, top), P(L, bot), angle=-0.9, color=color, stroke_width=3),
        ArcBetweenPoints(P(L, top), tip, angle=-0.7, color=color, stroke_width=3),
        ArcBetweenPoints(P(L, bot), tip, angle=0.7, color=color, stroke_width=3),
    )
    xin = L + 0.11 * s
    return body, [P(xin, c[1] + h / 4), P(xin, c[1] - h / 4)], tip


def not_body(c, s, color=INK):
    w, h = 0.9 * s, 0.8 * s
    L = c[0] - w / 2
    tri = Polygon(P(L, c[1] + h / 2), P(L, c[1] - h / 2), P(L + w, c[1]), color=color, stroke_width=3)
    return VGroup(tri), [P(L, c[1])], P(L + w, c[1])


def gate(kind, center, s=1.0, color=INK, leads=True):
    c = np.array(center, dtype=float)
    base = {"and": and_body, "nand": and_body, "or": or_body, "nor": or_body, "not": not_body}[kind]
    body, ins, out = base(c, s, color)
    g = VGroup(body)
    if kind in ("nand", "nor", "not"):
        r = 0.1 * s
        b = Circle(radius=r, color=color, stroke_width=3).move_to(out + RIGHT * r)
        g.add(b)
        out = out + RIGHT * 2 * r
    if leads:
        new_ins = []
        for p in ins:
            q = p + LEFT * 0.4 * s
            g.add(Line(q, p, color=color, stroke_width=3))
            new_ins.append(q)
        ins = new_ins
        o2 = out + RIGHT * 0.4 * s
        g.add(Line(out, o2, color=color, stroke_width=3))
        out = o2
    g.ins = ins
    g.out = out
    return g


# ---------------------------------------------------------------- lattice
def lattice(center, centre_label, centre_color, spacing=1.05, r=0.3):
    c = np.array(center, dtype=float)
    atoms = VGroup()
    bonds = VGroup()
    pos = {}
    for i in (-1, 0, 1):
        for j in (-1, 0, 1):
            pos[(i, j)] = c + P(i * spacing, j * spacing)
    for (i, j), p in pos.items():
        for di, dj in ((1, 0), (0, 1)):
            q = pos.get((i + di, j + dj))
            if q is not None:
                u = (q - p) / np.linalg.norm(q - p)
                bonds.add(Line(p + u * r, q - u * r, color=MUTED, stroke_width=3))
        for di, dj in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            if (i + di, j + dj) not in pos:
                u = P(di, dj)
                bonds.add(Line(p + u * r, p + u * (r + 0.3), color=MUTED, stroke_width=3))
    for (i, j), p in pos.items():
        centre = (i, j) == (0, 0)
        col = centre_color if centre else MUTED
        circ = Circle(radius=r, color=col, stroke_width=3).set_fill(WHITE, 1).move_to(p)
        lab = T(centre_label if centre else "Si", 20, color=col, weight="BOLD" if centre else "NORMAL").move_to(p)
        atoms.add(VGroup(circ, lab))
    return VGroup(bonds, atoms), pos


class OmpCh5Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Optics and Modern Physics",
            "Chapter 5 · Semiconductor Electronics",
            "Chapter five. Semiconductor electronics.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7, self.s8, self.s9):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ scene 1: bands
    def s1(self):
        wire_cu = Line(P(-5.8, 0.7), P(-1.4, 0.7), color=COPPER, stroke_width=16)
        cu_l = T("copper wire", 30).move_to(P(-3.6, 1.6))
        cu_r = M(r"T\uparrow\ \Rightarrow\ R\uparrow", 48, color=WARN).move_to(P(-3.6, -0.5))
        si = Square(side_length=1.5, color=MUTED, stroke_width=3).set_fill(ManimColor("#C9C3CF"), 1)
        si.move_to(P(3.6, 0.7))
        si_l = T("silicon", 30).move_to(P(3.6, 1.9))
        si_r = M(r"T\uparrow\ \Rightarrow\ R\downarrow", 48, color=GREEN).move_to(P(3.6, -0.5))
        rng = np.random.default_rng(5)
        carriers = VGroup(*[electron(P(3.6, 0.7) + P(*rng.uniform(-0.55, 0.55, 2))) for _ in range(9)])
        cap = T("In silicon, heat creates the carriers", 32, color=PRIMARY).move_to(P(0, -2.4))
        with self.voiceover("Heat a copper wire and its resistance goes up. Heat a piece of silicon and its "
                            "resistance goes down, sharply. In silicon, heat does not just shake the charge "
                            "carriers. It creates them.") as vo:
            self.play(Create(wire_cu), FadeIn(cu_l), run_time=0.8)
            self.play(FadeIn(cu_r, shift=0.2 * UP), run_time=0.6)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(si), FadeIn(si_l), run_time=0.8)
            self.play(FadeIn(si_r, shift=0.2 * UP), LaggedStart(*[FadeIn(c, scale=0.3) for c in carriers],
                                                                  lag_ratio=0.15), run_time=1.4)
            self.wait(vo.duration * 0.15)
            self.play(FadeIn(cap), run_time=0.6)

        # levels -> bands
        lv = [-1.5, 1.4]
        atom_lines = VGroup(*[Line(P(-5.4, y), P(-3.8, y), color=INK, stroke_width=4) for y in lv])
        atom_t = T("one atom", 26, color=MUTED).move_to(P(-4.6, 2.9))
        arr = Arrow(P(-3.4, 0), P(-1.6, 0), buff=0, color=MUTED, stroke_width=4)
        arr_t = M(r"\times 10^{23}", 32, color=MUTED).next_to(arr, UP, buff=0.12)
        cx0, cx1 = -0.9, 2.1
        ranges = [(-2.4, -0.6), (0.6, 2.2)]
        many = VGroup()
        for (y0, y1) in ranges:
            for y in np.linspace(y0 + 0.05, y1 - 0.05, 14):
                many.add(Line(P(cx0, y), P(cx1, y), color=INK, stroke_width=1.5))
        cr_t = T("crystal", 26, color=MUTED).move_to(P(0.6, 2.9))
        vb = band(cx0, cx1, *ranges[0], E_C, 0.45)
        cb = band(cx0, cx1, *ranges[1], CB_C, 0.12)
        with self.voiceover("Here is why. One atom has sharp energy levels. Pack ten to the twenty three atoms "
                            "into a crystal, and each level spreads into a band, with gaps between.") as vo:
            self.play(FadeOut(VGroup(wire_cu, cu_l, cu_r, si, si_l, si_r, carriers, cap)), run_time=0.5)
            self.play(Create(atom_lines), FadeIn(atom_t), run_time=0.8)
            self.wait(vo.duration * 0.15)
            self.play(GrowArrow(arr), FadeIn(arr_t), run_time=0.6)
            self.play(LaggedStart(*[TransformFromCopy(atom_lines[0 if k < 14 else 1], many[k])
                                    for k in range(len(many))], lag_ratio=0.03), FadeIn(cr_t), run_time=2.0)
            self.play(FadeIn(vb), FadeIn(cb), FadeOut(many), run_time=0.8)

        gap = DoubleArrow(P(2.45, -0.6), P(2.45, 0.6), buff=0, color=INK, stroke_width=3,
                          max_tip_length_to_length_ratio=0.25)
        gap_l = M("E_g", 36).next_to(gap, RIGHT, buff=0.12)
        cb_l = VGroup(T("conduction band", 26, color=CB_C, weight="BOLD"), T("(empty)", 22, color=MUTED)
                      ).arrange(DOWN, buff=0.1).move_to(P(4.9, 1.4))
        vb_l = VGroup(T("valence band", 26, color=E_C, weight="BOLD"), T("(full)", 22, color=MUTED)
                      ).arrange(DOWN, buff=0.1).move_to(P(4.9, -1.5))
        gap_t = T("band gap", 24, color=INK).move_to(P(4.9, 0))
        with self.voiceover("The highest filled band is the valence band. The empty one above is the conduction "
                            "band. The gap between them decides everything.") as vo:
            self.play(FadeIn(vb_l), run_time=0.6)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(cb_l), run_time=0.6)
            self.wait(vo.duration * 0.15)
            self.play(GrowFromCenter(gap), FadeIn(gap_l), FadeIn(gap_t), run_time=0.8)

        # three materials
        def panel(cx, vb_r, cb_r, head, cap_s, gap_s=None):
            g = VGroup()
            g.add(T(head, 30, weight="BOLD").move_to(P(cx, 3.0)))
            g.add(band(cx - 1.0, cx + 1.0, *vb_r, E_C, 0.45))
            g.add(band(cx - 1.0, cx + 1.0, *cb_r, CB_C, 0.18))
            if gap_s:
                da = DoubleArrow(P(cx + 1.25, vb_r[1]), P(cx + 1.25, cb_r[0]), buff=0, color=INK, stroke_width=3,
                                 max_tip_length_to_length_ratio=0.25 if cb_r[0] - vb_r[1] > 1 else 0.45)
                g.add(da)
                g.add(M(gap_s, 28).next_to(da, RIGHT, buff=0.08))
            g.add(fit(T(cap_s, 22, color=MUTED), 3.9).move_to(P(cx, -2.9)))
            return g

        metal = panel(-4.5, (-2.2, -0.2), (-0.7, 1.6), "metal", "bands overlap: always conducts")
        ins = panel(-0.2, (-2.2, -1.0), (1.0, 2.2), "insulator", "diamond: 5.4 eV", r">3\,\text{eV}")
        semi = panel(4.1, (-2.2, -0.35), (0.35, 2.2), "semiconductor", "Si 1.1 eV,  Ge 0.7 eV",
                     r"\sim\!1\,\text{eV}")
        with self.voiceover("In a metal the bands overlap, so it always conducts. An insulator has a gap above "
                            "three electron volts. A semiconductor's gap is narrow: one point one electron volts "
                            "for silicon, zero point seven for germanium.") as vo:
            self.clear_scene(0.5)
            self.play(FadeIn(metal), run_time=0.8)
            self.wait(vo.duration * 0.12)
            self.play(FadeIn(ins), run_time=0.8)
            self.wait(vo.duration * 0.15)
            self.play(FadeIn(semi), run_time=0.8)

    # ------------------------------------------------------------ scene 2: electrons and holes
    def s2(self):
        x0, x1 = -6.0, -1.4
        vb = band(x0, x1, -2.6, -1.0, E_C, 0.25)
        cb = band(x0, x1, 0.6, 2.2, CB_C, 0.12)
        cb_t = T("conduction band", 22, color=CB_C).move_to(P(-3.7, 2.55))
        vb_t = T("valence band", 22, color=E_C).move_to(P(-3.7, -2.95))
        cols = np.linspace(x0 + 0.35, x1 - 0.35, 8)
        rows = [-1.35, -1.8, -2.25]
        dots = VGroup(*[electron(P(x, y)) for y in rows for x in cols])
        jumpers = [1, 4, 6]
        holes = VGroup(*[hole(dots[k].get_center()) for k in jumpers])
        targets = [P(cols[1] + 0.2, 1.3), P(cols[4] - 0.1, 1.6), P(cols[6] + 0.1, 1.1)]
        heat = T("heat", 24, color=ACCENT).move_to(P(-0.8, 0))
        eq = M(r"n_e = n_h = n_i", 60).move_to(P(3.4, 1.2))
        leg = VGroup(VGroup(electron(ORIGIN), T("electron", 24)).arrange(RIGHT, buff=0.2),
                     VGroup(hole(ORIGIN), T("hole", 24)).arrange(RIGHT, buff=0.2)).arrange(RIGHT, buff=0.8)
        leg.move_to(P(3.4, 0.0))
        ni = M(r"\text{Si, 300 K: } n_i \approx 1.5\times10^{16}\ \text{m}^{-3}", 34, color=MUTED).move_to(P(3.4, -1.2))
        fit(ni, 6.0)
        with self.voiceover("At room temperature a few electrons are kicked across the gap. Each leaves behind "
                            "a hole, a missing electron in a bond. So in pure silicon, n e equals n h equals "
                            "n i.") as vo:
            self.play(FadeIn(vb), FadeIn(cb), FadeIn(cb_t), FadeIn(vb_t), FadeIn(dots), run_time=0.8)
            self.play(FadeIn(heat), run_time=0.4)
            self.play(*[dots[k].animate.move_to(t) for k, t in zip(jumpers, targets)], run_time=1.4)
            self.play(Create(holes), run_time=0.6)
            self.wait(vo.duration * 0.1)
            self.play(Write(eq), FadeIn(leg), run_time=1.2)
            self.play(FadeIn(ni), run_time=0.6)

        # hole hopping
        xs = [-4.2 + 1.2 * k for k in range(8)]
        y = 0.2
        chain = Line(P(-4.8, y), P(4.8, y), color=GRID, stroke_width=6)
        sites = VGroup(*[Dot(P(x, y), radius=0.05, color=MUTED) for x in xs])
        es = {k: electron(P(x, y), r=0.13) for k, x in enumerate(xs) if k != 5}
        h = hole(P(xs[5], y), r=0.15)
        hdr = T("No positive particle moves", 34, color=PRIMARY, weight="BOLD").move_to(P(0, 2.7))
        ea = Arrow(P(-1.6, -1.0), P(0.4, -1.0), buff=0, color=E_C, stroke_width=5)
        ea_t = T("electrons hop right", 24, color=E_C).next_to(ea, DOWN, buff=0.15)
        ha = Arrow(P(4.2, -1.0), P(2.2, -1.0), buff=0, color=H_C, stroke_width=5)
        ha_t = T("so the hole moves left", 24, color=H_C).next_to(ha, DOWN, buff=0.15)
        plus = T("acts like a + charge", 26, color=H_C).move_to(P(0, -2.8))
        with self.voiceover("No positive particle moves. A neighbouring electron hops into the hole, so the "
                            "vacancy moves the other way, like a plus charge.") as vo:
            self.play(*[FadeOut(m) for m in (vb, cb, cb_t, vb_t, dots, holes, heat, leg, ni)], run_time=0.5)
            self.play(eq.animate.scale(0.6).move_to(P(5.0, 3.3)), FadeIn(hdr), run_time=0.6)
            self.play(Create(chain), FadeIn(sites), FadeIn(VGroup(*es.values())), Create(h), run_time=0.8)
            for k in (4, 3, 2):
                self.play(es[k].animate.move_to(P(xs[k + 1], y)), h.animate.move_to(P(xs[k], y)), run_time=0.7)
                es[k + 1] = es.pop(k)
            self.play(GrowArrow(ea), FadeIn(ea_t), GrowArrow(ha), FadeIn(ha_t), run_time=0.8)
            self.play(FadeIn(plus), run_time=0.5)

        # heat and light
        bx0, bx1 = -6.2, -2.0
        vb2 = band(bx0, bx1, -2.8, -1.4, E_C, 0.25)
        cb2 = band(bx0, bx1, 0.3, 1.7, CB_C, 0.12)
        d2 = VGroup(*[electron(P(x, yy)) for yy in (-1.75, -2.2) for x in np.linspace(bx0 + 0.35, bx1 - 0.35, 6)])
        top = T("hotter: more pairs, so resistance falls", 30).move_to(P(0, 3.1))
        lam = M(r"\lambda_{\max} = \frac{1240}{E_g\,(\text{eV})}\ \text{nm}", 50).move_to(P(3.3, 1.2))
        ph = photon(P(0.2, 2.4), d2[3].get_center() + P(0.05, 0.12))
        ph_t = M(r"h\nu \ge E_g", 32, color=PH_C).move_to(P(0.3, 0.5))
        with self.voiceover("Heat makes more pairs, so a semiconductor's resistance falls when hot. Light makes "
                            "pairs too, if one photon carries at least the gap energy: the longest wavelength is "
                            "twelve forty over E g nanometres.") as vo:
            self.clear_scene(0.5)
            self.play(FadeIn(top), run_time=0.6)
            self.play(FadeIn(vb2), FadeIn(cb2), FadeIn(d2), run_time=0.7)
            self.wait(vo.duration * 0.15)
            self.play(Create(ph), FadeIn(ph_t), run_time=1.0)
            new_h = hole(d2[3].get_center())
            self.play(d2[3].animate.move_to(P(d2[3].get_x(), 1.0)), FadeOut(ph), FadeOut(ph_t), Create(new_h), run_time=0.8)
            self.play(Write(lam), run_time=1.2)
        e1 = M(r"1000\ \text{nm}:\ \ E = \frac{1240}{1000} = 1.24\ \text{eV}", 40).move_to(P(3.3, -0.6))
        e2 = M(r"1.24\ \text{eV} > 1.1\ \text{eV}", 44, color=GREEN).move_to(P(3.0, -1.9))
        ck = check().next_to(e2, RIGHT, buff=0.3)
        with self.voiceover("One thousand nanometre light carries one point two four electron volts, more than "
                            "silicon's one point one. So it works.") as vo:
            self.play(Write(e1), run_time=1.4)
            self.wait(vo.duration * 0.15)
            self.play(Write(e2), FadeIn(ck), run_time=1.0)

    # ------------------------------------------------------------ scene 3: doping
    def s3(self):
        a = T("1 arsenic atom per million silicon atoms", 34).move_to(P(0, 1.0))
        b = M(r"\sigma\ \ \text{rises about}\ \ 10^{6}\ \text{times}", 56, color=GREEN).move_to(P(0, -0.4))
        with self.voiceover("Pure silicon conducts poorly. Swap one atom in a million for arsenic, and the "
                            "conductivity jumps about a million times.") as vo:
            self.play(FadeIn(a), run_time=0.8)
            self.wait(vo.duration * 0.3)
            self.play(Write(b), run_time=1.2)

        nl, npos = lattice(P(-3.5, 0.9), "As", E_C)
        pl, ppos = lattice(P(3.5, 0.9), "B", H_C)
        n_h = T("n-type", 34, color=E_C, weight="BOLD").move_to(P(-3.5, 3.2))
        p_h = T("p-type", 34, color=H_C, weight="BOLD").move_to(P(3.5, 3.2))
        h_ = 1.05 / 2
        extra = electron(npos[(0, 0)] + P(h_, h_), r=0.11)
        n_ion = M("+", 44, color=E_C).move_to(npos[(0, 0)] + P(-0.42, 0.42))
        n_t = VGroup(fit(T("donors P, As, Sb: 5 valence electrons", 24), 6.2),
                     T("majority carriers: electrons", 24, color=E_C)).arrange(DOWN, buff=0.18).move_to(P(-3.5, -1.35))
        p_hole = hole((ppos[(0, 0)] + ppos[(1, 0)]) / 2, r=0.12)
        p_ion = M("-", 44, color=H_C).move_to(ppos[(0, 0)] + P(-0.42, 0.42))
        p_t = VGroup(fit(T("acceptors B, Al, Ga, In: 3 valence electrons", 24), 6.2),
                     T("majority carriers: holes", 24, color=H_C)).arrange(DOWN, buff=0.18).move_to(P(3.5, -1.35))
        neutral = fit(T("Both stay neutral: the letter names the majority carrier, not the charge", 26,
                        color=PRIMARY), 12.8).move_to(P(0, -3.0))
        with self.voiceover("Arsenic has five valence electrons. Four bond, and the fifth is almost free. Each "
                            "donor gives a conduction electron and becomes a fixed positive ion. That is n "
                            "type.") as vo:
            self.play(FadeOut(a), FadeOut(b), run_time=0.4)
            self.play(FadeIn(nl), FadeIn(n_h), run_time=1.0)
            self.play(FadeIn(extra, scale=0.3), run_time=0.5)
            self.wait(vo.duration * 0.1)
            self.play(extra.animate.move_to(npos[(0, 0)] + P(h_, -h_)), run_time=1.0)
            self.play(extra.animate.move_to(npos[(-1, 0)] + P(h_, -h_)), FadeIn(n_ion), run_time=1.0)
            self.play(FadeIn(n_t), run_time=0.7)
        with self.voiceover("Boron has three. It grabs an electron from a neighbouring bond, leaving a hole, "
                            "and becomes a fixed negative ion. That is p type. Both stay neutral: the letter "
                            "names the majority carrier, not the charge.") as vo:
            self.play(FadeIn(pl), FadeIn(p_h), run_time=1.0)
            self.wait(vo.duration * 0.1)
            self.play(Create(p_hole), FadeIn(p_ion), run_time=0.8)
            self.play(p_hole.animate.move_to((ppos[(1, 0)] + ppos[(1, 1)]) / 2), run_time=0.9)
            self.play(FadeIn(p_t), run_time=0.7)
            self.wait(vo.duration * 0.15)
            self.play(FadeIn(neutral), run_time=0.6)

        law = M(r"n_e\,n_h = n_i^{\,2}", 64, color=PRIMARY).move_to(P(0, 2.6))
        box = SurroundingRectangle(law, buff=0.25, corner_radius=0.15, color=PRIMARY, stroke_width=3)
        w1 = M(r"n_e \approx N_D = 4.5\times10^{22}\ \text{m}^{-3}", 44).move_to(P(0, 1.0))
        w2 = M(r"n_h = \frac{(1.5\times10^{16})^2}{4.5\times10^{22}} = 5\times10^{9}\ \text{m}^{-3}", 44,
               color=GREEN).move_to(P(0, -0.5))
        w3 = T("Doping raises one carrier and lowers the other", 28, color=MUTED).move_to(P(0, -2.2))
        with self.voiceover("Electrons and holes keep recombining, so their product is fixed: n e times n h "
                            "equals n i squared. Dope silicon with four point five times ten to the twenty two "
                            "arsenic atoms per cubic metre, and the holes fall to five times ten to the "
                            "nine.") as vo:
            self.clear_scene(0.5)
            self.play(Write(law), Create(box), run_time=1.2)
            self.wait(vo.duration * 0.15)
            self.play(Write(w1), run_time=1.2)
            self.wait(vo.duration * 0.1)
            self.play(Write(w2), run_time=1.6)
            self.play(FadeIn(w3), run_time=0.6)

    # ------------------------------------------------------------ scene 4: the junction
    def s4(self):
        yb0, yb1 = -0.4, 1.8
        p_reg = band(-5.0, 0.0, yb0, yb1, H_C, 0.07)
        n_reg = band(0.0, 5.0, yb0, yb1, E_C, 0.07)
        p_l = T("p", 44, color=H_C, weight="BOLD").move_to(P(-2.5, 2.4))
        n_l = T("n", 44, color=E_C, weight="BOLD").move_to(P(2.5, 2.4))
        xs = [0.5, 1.3, 2.1, 2.9, 3.7, 4.5]
        ys = [1.4, 0.7, 0.0]
        rng = np.random.default_rng(3)
        hs, es = {}, {}
        for x in xs:
            for y in ys:
                j = rng.uniform(-0.12, 0.12, 2)
                hs[(x, y)] = hole(P(-x + j[0], y + j[1]))
                es[(x, y)] = electron(P(x - j[0], y - j[1]))
        holes = VGroup(*hs.values())
        elecs = VGroup(*es.values())
        with self.voiceover("Put p type and n type together in one crystal. Electrons diffuse into the p side, "
                            "holes into the n side, and near the junction they cancel out.") as vo:
            self.play(FadeIn(p_reg), FadeIn(n_reg), FadeIn(p_l), FadeIn(n_l), run_time=0.8)
            self.play(FadeIn(holes), FadeIn(elecs), run_time=0.8)
            self.wait(vo.duration * 0.15)
            near = [(0.5, y) for y in ys]
            self.play(*[es[k].animate.move_to(hs[k].get_center() + 0.0 * RIGHT) for k in near],
                      *[hs[k].animate.shift(0.35 * RIGHT) for k in near], run_time=1.4)
            self.play(*[FadeOut(es[k], scale=0.2) for k in near], *[FadeOut(hs[k], scale=0.2) for k in near],
                      run_time=0.6)

        dep = band(-0.9, 0.9, yb0, yb1, GRID, 0.0)
        dep.set_fill(GRID, 0.9).set_stroke(MUTED, 2)
        ions = VGroup()
        for y in ys:
            ions.add(M("-", 40, color=H_C).move_to(P(-0.5, y)))
            ions.add(M("+", 40, color=E_C).move_to(P(0.5, y)))
        dep_t = T("depletion region", 26).move_to(P(0, -0.85))
        ef = Arrow(P(1.5, -1.5), P(-1.5, -1.5), buff=0, color=PH_C, stroke_width=5)
        ef_t = T("field, n to p", 24, color=PH_C).next_to(ef, RIGHT, buff=0.2)
        bar = M(r"\text{barrier} \approx 0.7\ \text{V (Si)},\ \ 0.3\ \text{V (Ge)}", 40).move_to(P(0, -2.35))
        note = T("no free carriers, but full of fixed charge", 24, color=MUTED).move_to(P(0, -3.1))
        with self.voiceover("What remains are fixed ions: negative on the p side, positive on the n side. This "
                            "depletion region has no free carriers, but it is full of charge, and its field builds "
                            "a barrier of about zero point seven volts in silicon.") as vo:
            self.play(FadeIn(dep), run_time=0.5)
            self.bring_to_front(ions)
            self.play(FadeIn(ions), FadeIn(dep_t), run_time=0.8)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(note), run_time=0.5)
            self.wait(vo.duration * 0.1)
            self.play(GrowArrow(ef), FadeIn(ef_t), run_time=0.8)
            self.play(Write(bar), run_time=1.2)

        ax = axes([-1, 1, 0.5], [-2, 14, 4], 7.0, 5.4, P(-2.3, -0.3))
        xl = M("V", 34).next_to(ax.x_axis.get_end(), DOWN, buff=0.15)
        yl = M("I", 34).next_to(ax.y_axis.get_end(), LEFT, buff=0.15)
        curve = ax.plot(diode_i, x_range=[-1, 0.704, 0.005], color=PRIMARY, stroke_width=5)
        knee = DashedLine(ax.c2p(0.7, 0), ax.c2p(0.7, 13), color=MUTED, stroke_width=2)
        knee_t = M(r"0.7\ \text{V}", 30, color=MUTED).next_to(ax.c2p(0.7, 0), DOWN, buff=0.15)
        fwd = T("forward bias", 24, color=GREEN).move_to(ax.c2p(0.32, 9))
        rev = T("reverse: tiny leakage", 24, color=WARN).move_to(ax.c2p(-0.55, 2.2))
        r1 = T("forward: barrier lowered", 26, color=GREEN)
        r2 = T("reverse: barrier raised", 26, color=WARN)
        col = VGroup(r1, r2).arrange(DOWN, buff=0.35, aligned_edge=LEFT).move_to(P(4.4, 1.6))
        valve = T("a one-way valve", 32, weight="BOLD").move_to(P(4.4, -0.3))
        dsym = diode_sym(P(4.4, -1.5), RIGHT, 0.7)
        dl = Line(P(3.2, -1.5), P(5.6, -1.5), color=INK, stroke_width=3)
        dsym_l = VGroup(T("p", 24, color=H_C).move_to(P(3.5, -1.0)), T("n", 24, color=E_C).move_to(P(5.3, -1.0)))
        with self.voiceover("Forward bias lowers the barrier: the current stays tiny until the knee, near zero "
                            "point seven volts, then shoots up. Reverse bias raises it, and only a tiny leakage "
                            "flows. That is a diode, a one way valve.") as vo:
            self.clear_scene(0.5)
            self.play(Create(ax), FadeIn(xl), FadeIn(yl), run_time=0.8)
            self.play(FadeIn(r1), run_time=0.5)
            self.play(Create(curve), run_time=2.2)
            self.play(Create(knee), FadeIn(knee_t), FadeIn(fwd), run_time=0.7)
            self.wait(vo.duration * 0.05)
            self.play(FadeIn(r2), FadeIn(rev), run_time=0.6)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(valve), Create(dl), FadeIn(dsym), FadeIn(dsym_l), run_time=0.8)

        # circuit
        BL, TL, TR, BR = P(-6.0, -2.0), P(-6.0, 1.6), P(-1.4, 1.6), P(-1.4, -2.0)
        bat = battery_v(P(-6.0, -0.2))
        dio = diode_sym(P(-3.7, 1.6), RIGHT, 0.6)
        res = resistor(P(-1.4, 0.9), P(-1.4, -1.3))
        wires = VGroup(
            wire(P(-6.0, -0.29), BL, BR, P(-1.4, -1.3)),
            wire(P(-6.0, -0.11), TL, P(-4.0, 1.6)),
            wire(P(-3.4, 1.6), TR, P(-1.4, 0.9)),
        )
        labs = VGroup(
            M(r"5\ \text{V}", 34).move_to(P(-5.2, -0.2)),
            M(r"\text{Si},\ 0.7\ \text{V}", 32).move_to(P(-3.7, 2.25)),
            M(r"1\ \text{k}\Omega", 34).move_to(P(-0.6, -0.2)),
        )
        cur = Arrow(P(-5.6, 1.6), P(-4.6, 1.6), buff=0, color=HL, stroke_width=5).shift(0.0 * UP)
        cur_l = M("I", 32, color=HL).next_to(cur, DOWN, buff=0.12)
        c1 = M(r"V_R = 5 - 0.7 = 4.3\ \text{V}", 46).move_to(P(3.2, 0.9))
        c2 = M(r"I = \frac{4.3\ \text{V}}{1\ \text{k}\Omega} = 4.3\ \text{mA}", 46, color=GREEN).move_to(P(3.2, -0.6))
        with self.voiceover("In circuits, treat a silicon diode as a switch with a zero point seven volt drop. "
                            "Five volts through a one thousand ohm resistor leaves four point three volts, so "
                            "four point three milliamps.") as vo:
            self.clear_scene(0.5)
            self.play(Create(wires), FadeIn(bat), FadeIn(dio), Create(res), run_time=1.2)
            self.play(FadeIn(labs), GrowArrow(cur), FadeIn(cur_l), run_time=0.8)
            self.wait(vo.duration * 0.2)
            self.play(Write(c1), run_time=1.2)
            self.wait(vo.duration * 0.05)
            self.play(Write(c2), run_time=1.3)

    # ------------------------------------------------------------ scene 5: rectifiers
    def s5(self):
        top = axes([0, 13, 1], [-1.3, 1.3, 1], 8.6, 2.2, P(-2.0, 1.4))
        bot = axes([0, 13, 1], [-1.3, 1.3, 1], 8.6, 2.2, P(-2.0, -1.8))
        vin = top.plot(np.sin, x_range=[0, 12.6, 0.02], color=INK, stroke_width=4)
        ghost = bot.plot(np.sin, x_range=[0, 12.6, 0.02], color=MUTED, stroke_width=2)
        ghost = DashedVMobject(ghost, num_dashes=60)
        half = bot.plot(lambda x: max(np.sin(x), 0.0), x_range=[0, 12.6, 0.01], color=PRIMARY, stroke_width=5)
        full = bot.plot(lambda x: abs(np.sin(x)), x_range=[0, 12.6, 0.01], color=PRIMARY, stroke_width=5)
        t_in = VGroup(T("input (mains)", 26), T("50 Hz", 24, color=MUTED)).arrange(DOWN, buff=0.12).move_to(P(4.9, 1.4))
        t_half = VGroup(T("half-wave", 28, color=PRIMARY, weight="BOLD"), T("one diode", 22, color=MUTED),
                        T("50 Hz out", 24)).arrange(DOWN, buff=0.12).move_to(P(4.9, -1.5))
        t_full = VGroup(T("full-wave", 28, color=PRIMARY, weight="BOLD"),
                        T("centre-tap or bridge", 22, color=MUTED),
                        T("100 Hz out", 24, color=GREEN)).arrange(DOWN, buff=0.12).move_to(P(4.9, -1.5))
        with self.voiceover("Mains reverses fifty times a second, but a battery needs one way current. One diode "
                            "passes only the positive halves: a half wave rectifier. Fifty hertz in, fifty hertz "
                            "out.") as vo:
            self.play(Create(top), Create(bot), run_time=0.8)
            self.play(Create(vin), FadeIn(t_in), run_time=1.6)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(ghost), run_time=0.4)
            self.play(Create(half), FadeIn(t_half), run_time=2.0)
        with self.voiceover("A centre tap or a bridge of four diodes flips each negative half up. Two humps per "
                            "cycle: the output ripples at one hundred hertz.") as vo:
            self.wait(vo.duration * 0.1)
            self.play(Transform(half, full), FadeTransform(t_half, t_full), run_time=1.8)

        def smooth(x, tau=5.0):
            s = abs(np.sin(x))
            if x < PI / 2:
                return s
            k = np.floor((x - PI / 2) / PI)
            tp = PI / 2 + k * PI
            return max(s, np.exp(-(x - tp) / tau))

        filt = bot.plot(smooth, x_range=[0, 12.6, 0.01], color=ACCENT, stroke_width=6)
        avg = M(r"\bar V = \frac{V_m}{\pi}\ \text{(half)},\qquad \frac{2V_m}{\pi}\ \text{(full)}", 36).move_to(P(-2.0, 3.25))
        cap = T("+ capacitor: small ripple", 24, color=ACCENT).move_to(P(4.9, -2.85))
        with self.voiceover("Averages are the peak over pi, and twice the peak over pi. But one way is not "
                            "steady. A capacitor fills on each hump and drains slowly between them, leaving a "
                            "small ripple.") as vo:
            self.play(Write(avg), run_time=1.4)
            self.wait(vo.duration * 0.25)
            self.play(Create(filt), FadeIn(cap), run_time=2.2)

    # ------------------------------------------------------------ scene 6: Zener and light
    def s6(self):
        ax = axes([-7, 2, 1], [-8, 8, 4], 7.0, 5.4, P(-2.4, -0.2))
        xl = M("V", 34).next_to(ax.x_axis.get_end(), DOWN, buff=0.15)
        yl = M("I", 34).next_to(ax.y_axis.get_end(), LEFT, buff=0.15)

        def zi(v):
            return diode_i(v) if v > -5 else -20 * (-5 - v)

        curve = ax.plot(zi, x_range=[-5.4, 0.68, 0.002], color=PURPLE, stroke_width=5)
        vz = M("-V_Z", 32, color=PURPLE).next_to(ax.c2p(-5, 0), UP, buff=0.15)
        hz = VGroup(T("Zener diode", 32, weight="BOLD"), T("heavily doped", 24, color=MUTED),
                    T("breakdown at a precise V", 24)).arrange(DOWN, buff=0.2).move_to(P(4.6, 1.5))
        hz2 = T("its job, not damage", 28, color=GREEN).move_to(P(4.6, -0.4))
        steady = M(r"V \approx -V_Z\ \text{whatever } I", 30, color=PURPLE).move_to(ax.c2p(-2.6, -5.5))
        with self.voiceover("Dope a junction heavily, and reverse breakdown comes at a precise voltage. That is "
                            "a Zener diode, and breakdown is its job, not damage.") as vo:
            self.play(Create(ax), FadeIn(xl), FadeIn(yl), run_time=0.8)
            self.play(Create(curve), run_time=2.0)
            self.play(FadeIn(vz), FadeIn(steady), FadeIn(hz), run_time=0.8)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(hz2), run_time=0.6)

        # regulator
        Lx, Mx, Rx, yt, yb = -6.2, -3.2, -1.2, 1.6, -2.0
        bat = battery_v(P(Lx, -0.2))
        rs = resistor(P(-5.4, yt), P(-4.0, yt))
        zen = diode_sym(P(Mx, -0.2), UP, 0.55, zener=True)
        rl = resistor(P(Rx, 0.9), P(Rx, -1.3))
        wires = VGroup(
            wire(P(Lx, -0.11), P(Lx, yt), P(-5.4, yt)),
            wire(P(-4.0, yt), P(Rx, yt), P(Rx, 0.9)),
            wire(P(Rx, -1.3), P(Rx, yb), P(Lx, yb), P(Lx, -0.29)),
            wire(P(Mx, yt), P(Mx, 0.075)),
            wire(P(Mx, -0.475), P(Mx, yb)),
        )
        nodes = VGroup(Dot(P(Mx, yt), radius=0.07, color=INK), Dot(P(Mx, yb), radius=0.07, color=INK))
        labs = VGroup(
            M(r"15\ \text{V}", 32).move_to(P(-5.5, -0.2)),
            M(r"250\ \Omega", 32).move_to(P(-4.7, 2.2)),
            M(r"10\ \text{V}", 30, color=PURPLE).move_to(P(-4.15, -0.2)),
            M(r"1\ \text{k}\Omega", 32).move_to(P(-0.45, -0.2)),
        )
        q1 = M(r"I_S = \frac{15-10}{250} = 20\ \text{mA}", 42).move_to(P(3.3, 1.9))
        q2 = M(r"I_L = \frac{10}{1000} = 10\ \text{mA}", 42).move_to(P(3.3, 0.4))
        q3 = M(r"I_Z = I_S - I_L = 10\ \text{mA}", 42, color=PURPLE).move_to(P(3.3, -1.0))
        q4 = T("load held at 10 V", 28, color=GREEN).move_to(P(3.3, -2.2))
        with self.voiceover("Fifteen volts feed a ten volt Zener through two hundred fifty ohms. The resistor "
                            "drops five volts: twenty milliamps. A one thousand ohm load takes ten. The Zener soaks "
                            "up the other ten, holding the load at ten volts.") as vo:
            self.clear_scene(0.5)
            self.play(Create(wires), FadeIn(bat), Create(rs), FadeIn(zen), Create(rl), FadeIn(nodes), run_time=1.3)
            self.play(FadeIn(labs), run_time=0.6)
            self.wait(vo.duration * 0.1)
            self.play(Write(q1), run_time=1.3)
            self.wait(vo.duration * 0.05)
            self.play(Write(q2), run_time=1.2)
            self.wait(vo.duration * 0.05)
            self.play(Write(q3), run_time=1.2)
            self.play(FadeIn(q4), run_time=0.5)

        # light devices
        def card_(cx, head, l1, l2, icon):
            box = RoundedRectangle(width=3.9, height=3.3, corner_radius=0.2, color=MUTED, stroke_width=2)
            box.set_fill(WHITE, 0.85).move_to(P(cx, 0.85))
            h = T(head, 30, weight="BOLD").move_to(P(cx, 2.1))
            icon.move_to(P(cx, 1.15))
            a = T(l1, 24).move_to(P(cx, 0.15))
            b = T(l2, 24, color=MUTED).move_to(P(cx, -0.35))
            return VGroup(box, h, icon, a, b)

        def icon(kind):
            d = VGroup(Line(P(-0.7, 0), P(0.7, 0), color=INK, stroke_width=3), diode_sym(ORIGIN, RIGHT, 0.45))
            if kind == "in":
                d.add(photon(P(-0.9, 0.75), P(-0.15, 0.2), waves=3, amp=0.07),
                      photon(P(-0.5, 0.85), P(0.2, 0.25), waves=3, amp=0.07))
            elif kind == "out":
                d.add(photon(P(0.15, 0.2), P(0.85, 0.8), waves=3, amp=0.07),
                      photon(P(0.45, 0.15), P(1.15, 0.7), waves=3, amp=0.07))
            return d

        pd = card_(-4.4, "Photodiode", "reverse biased", "light → current", icon("in"))
        led = card_(0.0, "LED", "forward biased", "current → light", icon("out"))
        sc = card_(4.4, "Solar cell", "no bias", "light → power", icon("in"))
        ledf = M(r"\text{red LED: } E_g \approx \frac{1240}{620} = 2.0\ \text{eV}", 44, color=PRIMARY).move_to(P(0, -2.3))
        with self.voiceover(f"Junctions trade energy with light at the gap. A photodiode is reverse biased, so "
                            f"light changes its small current a lot. An {LED} is forward biased, and emits photons "
                            f"of about the gap energy: red light at six twenty nanometres means a two electron "
                            f"volt gap.") as vo:
            self.clear_scene(0.5)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(pd, shift=0.2 * UP), run_time=0.8)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(led, shift=0.2 * UP), run_time=0.8)
            self.wait(vo.duration * 0.1)
            self.play(Write(ledf), run_time=1.5)
        with self.voiceover("A solar cell has no bias. It is the source, working in the fourth quadrant of its "
                            "curve, where it delivers power.") as vo:
            self.play(FadeIn(sc, shift=0.2 * UP), run_time=0.8)
            self.play(Indicate(sc[1], color=PRIMARY), run_time=0.8)
            self.wait(vo.duration * 0.15)

            ax2 = axes([-0.2, 0.8, 0.2], [-6, 4, 2], 7.0, 5.2, P(-2.2, -0.3))
            voc = ETA * np.log(5 / IS + 1)
            lit = ax2.plot(lambda v: diode_i(v) - 5, x_range=[-0.2, 0.686, 0.002], color=PRIMARY, stroke_width=5)
            dark = DashedVMobject(ax2.plot(diode_i, x_range=[-0.2, 0.645, 0.002], color=MUTED, stroke_width=3),
                                  num_dashes=30)
            area = ax2.get_area(lit, x_range=[0, voc], color=GREEN, opacity=0.3)
            xl2 = M("V", 32).next_to(ax2.x_axis.get_end(), DOWN, buff=0.15)
            yl2 = M("I", 32).next_to(ax2.y_axis.get_end(), LEFT, buff=0.15)
            d1 = Dot(ax2.c2p(voc, 0), color=INK, radius=0.07)
            d2 = Dot(ax2.c2p(0, -5), color=INK, radius=0.07)
            l1 = M("V_{oc}", 30).next_to(d1, UL, buff=0.1)
            l2 = M("I_{sc}", 30).next_to(d2, LEFT, buff=0.15)
            dk = T("dark", 22, color=MUTED).move_to(ax2.c2p(0.5, 2.6))
            lt = T("lit", 22, color=PRIMARY).move_to(ax2.c2p(0.75, -2.0))
            rc = VGroup(T("solar cell", 30, weight="BOLD"), T("curve shifted down by light", 24, color=MUTED),
                        M(r"V>0,\ I<0", 34), T("delivers power", 28, color=GREEN)).arrange(DOWN, buff=0.28)
            rc.move_to(P(4.5, 0.3))
            self.play(*[FadeOut(m) for m in (pd, led, sc, ledf)], run_time=0.5)
            self.play(Create(ax2), FadeIn(xl2), FadeIn(yl2), Create(dark), FadeIn(dk), run_time=1.0)
            self.play(Create(lit), FadeIn(lt), run_time=1.2)
            self.play(FadeIn(area), FadeIn(d1), FadeIn(d2), FadeIn(l1), FadeIn(l2), FadeIn(rc), run_time=0.9)

    # ------------------------------------------------------------ scene 7: the transistor
    def s7(self):
        y0, y1 = -0.4, 1.4
        E = band(-5.4, -2.0, y0, y1, E_C, 0.22)
        B = band(-2.0, -1.4, y0, y1, H_C, 0.3)
        C = band(-1.4, 4.0, y0, y1, E_C, 0.12)
        labs = VGroup(T("emitter (n)", 28, color=E_C).move_to(P(-3.7, 1.95)),
                      T("base (p)", 28, color=H_C).move_to(P(-1.7, 2.55)),
                      T("collector (n)", 28, color=E_C).move_to(P(1.3, 1.95)))
        notes = VGroup(T("heavily doped", 24, color=MUTED).move_to(P(-3.7, -0.85)),
                       T("thinnest, lightly doped", 24, color=MUTED).move_to(P(-1.7, -1.5)),
                       T("largest", 24, color=MUTED).move_to(P(1.3, -0.85)))
        with self.voiceover("Sandwich three layers, n p n, and you have a transistor: a heavily doped emitter, "
                            "a thin, lightly doped base, and a large collector.") as vo:
            self.play(FadeIn(E), FadeIn(B), FadeIn(C), run_time=0.8)
            self.play(LaggedStart(*[FadeIn(m) for m in labs], lag_ratio=0.3), run_time=1.2)
            self.wait(vo.duration * 0.1)
            self.play(LaggedStart(*[FadeIn(m) for m in notes], lag_ratio=0.4), run_time=1.6)

        hdr = T("emitter-base forward,  collector-base reverse", 28).move_to(P(0, 3.2))
        rng = np.random.default_rng(11)
        starts = [P(rng.uniform(-5.1, -2.4), rng.uniform(-0.15, 1.15)) for _ in range(12)]
        es = VGroup(*[electron(p, r=0.1) for p in starts])
        ends = [P(rng.uniform(0.0, 3.6), rng.uniform(-0.15, 1.15)) for _ in range(12)]
        lost = [3, 8]
        ib = Arrow(P(-1.7, -0.45), P(-1.7, -1.6), buff=0, color=H_C, stroke_width=5)
        ib_t = T("a few % recombine: base current", 24, color=H_C).move_to(P(-1.7, -2.05))
        ic_t = T("the rest reach the collector", 24, color=E_C).move_to(P(2.2, -0.85))
        eq = M(r"I_E = I_B + I_C", 50).move_to(P(0, -3.0))
        with self.voiceover("Forward bias the emitter base junction, reverse bias the collector base. Electrons "
                            "flood into the base. A few percent recombine and leave as base current. The rest "
                            "sweep into the collector.") as vo:
            self.play(FadeOut(notes), FadeIn(hdr), run_time=0.6)
            self.play(FadeIn(es), run_time=0.5)
            self.play(*[es[k].animate.move_to(P(-1.7, 0.5 + 0.3 * (k - 5) / 6)) for k in range(12)], run_time=1.2)
            self.play(*[es[k].animate.move_to(ends[k]) for k in range(12) if k not in lost],
                      *[es[k].animate.move_to(P(-1.7, -1.3)).set_opacity(0) for k in lost], run_time=1.4)
            self.play(GrowArrow(ib), FadeIn(ib_t), FadeIn(ic_t), run_time=0.8)
            self.wait(vo.duration * 0.05)
            self.play(Write(eq), run_time=1.0)

        e0 = M(r"I_E = I_B + I_C", 44).move_to(P(0, 3.1))
        al = M(r"\alpha = \frac{I_C}{I_E}", 50)
        be = M(r"\beta = \frac{I_C}{I_B}", 50)
        VGroup(al, be).arrange(RIGHT, buff=2.0).move_to(P(0, 1.6))
        rel = M(r"\beta = \frac{\alpha}{1-\alpha}", 64, color=PRIMARY).move_to(P(0, -0.2))
        box = SurroundingRectangle(rel, buff=0.25, corner_radius=0.15, color=PRIMARY, stroke_width=3)
        ex = M(r"\alpha = 0.98\ \Rightarrow\ \beta = \frac{0.98}{0.02} = 49", 46, color=GREEN).move_to(P(0, -2.3))
        with self.voiceover("So I E equals I B plus I C. Alpha is I C over I E. Beta is I C over I B, and beta "
                            "equals alpha over one minus alpha. Alpha of zero point nine eight gives beta of forty "
                            "nine.") as vo:
            self.clear_scene(0.5)
            self.play(Write(e0), run_time=0.8)
            self.wait(vo.duration * 0.05)
            self.play(Write(al), run_time=0.8)
            self.play(Write(be), run_time=0.8)
            self.wait(vo.duration * 0.05)
            self.play(Write(rel), Create(box), run_time=1.2)
            self.wait(vo.duration * 0.05)
            self.play(Write(ex), run_time=1.3)

        gain = M(r"A_v = -\beta\,\frac{R_C}{R_B} = -100\times 2 = -200", 50).move_to(P(0, 2.7))
        b_in = Line(P(-6.2, -0.6), P(-2.2, -0.6), color=GRID, stroke_width=2)
        b_out = Line(P(1.2, -0.6), P(6.4, -0.6), color=GRID, stroke_width=2)
        w_in = ParametricFunction(lambda t: P(-6.2 + 4.0 * t, -0.6 + 0.15 * np.sin(4 * PI * t)), t_range=[0, 1, 0.005],
                                  color=SECONDARY, stroke_width=4)
        w_out = ParametricFunction(lambda t: P(1.2 + 5.2 * t, -0.6 - 1.3 * np.sin(4 * PI * t)), t_range=[0, 1, 0.005],
                                   color=PRIMARY, stroke_width=4)
        t_in = T("input: 10 mV", 26, color=SECONDARY).move_to(P(-4.2, 1.3))
        t_out = T("output: 2 V, inverted", 26, color=PRIMARY).move_to(P(3.8, 1.3))
        arr = Arrow(P(-1.8, -0.6), P(0.8, -0.6), buff=0, color=MUTED, stroke_width=5)
        bat = T("The extra power comes from the battery", 28, color=MUTED).move_to(P(0, -3.0))
        with self.voiceover("A small base current controls a collector current beta times bigger: an amplifier. "
                            "With beta one hundred and R C over R B equal to two, the voltage gain is minus two "
                            "hundred. The extra power comes from the battery.") as vo:
            self.clear_scene(0.5)
            self.play(FadeIn(b_in), Create(w_in), FadeIn(t_in), run_time=1.0)
            self.play(GrowArrow(arr), run_time=0.5)
            self.play(FadeIn(b_out), Create(w_out), FadeIn(t_out), run_time=1.2)
            self.wait(vo.duration * 0.1)
            self.play(Write(gain), run_time=1.5)
            self.wait(vo.duration * 0.05)
            self.play(FadeIn(bat), run_time=0.6)

    # ------------------------------------------------------------ scene 8: logic gates
    def s8(self):
        def labelled(kind, cx, name, expr, note):
            g = gate(kind, P(cx, 0.9), 1.2)
            ins = VGroup(*[M(n, 30).next_to(p, LEFT, buff=0.1) for n, p in zip("AB", g.ins)])
            out = M("Y", 30).next_to(g.out, RIGHT, buff=0.1)
            nm = T(name, 30, weight="BOLD").move_to(P(cx, -0.5))
            ex = M(expr, 36).move_to(P(cx, -1.25))
            nt = T(note, 22, color=MUTED).move_to(P(cx, -2.0))
            return VGroup(g, ins, out, nm, ex, nt)

        g_not = labelled("not", -4.4, "NOT", r"Y = \bar A", "high in, low out")
        g_and = labelled("and", 0.0, "AND", r"Y = AB", "switches in series")
        g_or = labelled("or", 4.4, "OR", r"Y = A + B", "switches in parallel")
        with self.voiceover("Used as a switch, the transistor turns a high input into a low output. That is a not gate. "
                            "Switches in series make an and gate; switches in parallel make an or gate.") as vo:
            self.wait(vo.duration * 0.25)
            self.play(FadeIn(g_not), run_time=0.8)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(g_and), run_time=0.8)
            self.wait(vo.duration * 0.05)
            self.play(FadeIn(g_or), run_time=0.8)

        nand = gate("nand", P(-4.8, 1.4), 1.1)
        nor = gate("nor", P(-4.8, -1.3), 1.1)
        n_ins = VGroup(*[M(n, 28).next_to(p, LEFT, buff=0.1) for g in (nand, nor) for n, p in zip("AB", g.ins)])
        nand_l = M(r"\text{NAND: } Y = \overline{AB}", 34).move_to(P(-4.6, 0.25))
        nor_l = M(r"\text{NOR: } Y = \overline{A+B}", 34).move_to(P(-4.6, -2.45))
        cols_x = [-1.2, -0.3, 0.9, 2.2, 3.7, 5.3]
        heads = ["A", "B", "AND", "OR", "NAND", "NOR"]
        rows = [(0, 0), (0, 1), (1, 0), (1, 1)]
        tbl = VGroup()
        for x, h in zip(cols_x, heads):
            tbl.add(T(h, 26, weight="BOLD", color=PRIMARY if h in ("NAND", "NOR") else INK).move_to(P(x, 2.2)))
        tbl.add(Line(P(-1.7, 1.85), P(5.9, 1.85), color=MUTED, stroke_width=2))
        tbl.add(Line(P(0.3, 2.45), P(0.3, -0.95), color=GRID, stroke_width=2))
        body = VGroup()
        for r, (A, Bv) in enumerate(rows):
            vals = [A, Bv, A & Bv, A | Bv, 1 - (A & Bv), 1 - (A | Bv)]
            y = 1.4 - 0.7 * r
            for x, v, h in zip(cols_x, vals, heads):
                body.add(M(str(v), 34, color=PRIMARY if h in ("NAND", "NOR") else INK).move_to(P(x, y)))
        mem = fit(T("No memory: the output depends only on the inputs right now", 24, color=MUTED), 8.0)
        mem.move_to(P(2.2, -1.8))
        with self.voiceover("A bubble on the output gives nand and nor. A truth table lists every input pair, "
                            "and a gate has no memory.") as vo:
            self.clear_scene(0.5)
            self.play(FadeIn(nand), FadeIn(nor), FadeIn(n_ins), FadeIn(nand_l), FadeIn(nor_l), run_time=1.0)
            self.play(FadeIn(tbl), run_time=0.6)
            self.play(LaggedStart(*[FadeIn(m) for m in body], lag_ratio=0.04), run_time=1.6)
            self.play(FadeIn(mem), run_time=0.6)

        dm = M(r"\overline{A+B} = \bar A\,\bar B \qquad\qquad \overline{AB} = \bar A + \bar B", 46).move_to(P(0, 3.0))
        hdr = T("NAND alone builds every gate", 30, color=PRIMARY, weight="BOLD").move_to(P(0, 1.8))
        s = 0.75
        # NOT: tied inputs
        n1 = gate("nand", P(-4.6, -0.3), s)
        a_in = P(-6.0, -0.3)
        not_w = VGroup(wire(a_in, P(-5.55, -0.3)), wire(P(-5.55, n1.ins[0][1]), P(-5.55, n1.ins[1][1])),
                       Dot(P(-5.55, -0.3), radius=0.05, color=INK), wire(P(-5.55, n1.ins[0][1]), n1.ins[0]),
                       wire(P(-5.55, n1.ins[1][1]), n1.ins[1]))
        not_g = VGroup(n1, not_w, M("A", 28).next_to(a_in, LEFT, buff=0.08),
                       M(r"\bar A", 28).next_to(n1.out, RIGHT, buff=0.08),
                       T("NOT", 26, weight="BOLD").move_to(P(-4.6, -2.0)))
        # AND: NAND then NAND-as-NOT
        a1 = gate("nand", P(-1.5, -0.3), s)
        a2 = gate("nand", P(0.3, -0.3), s)
        jx = a2.ins[0][0] - 0.15
        and_w = VGroup(wire(a1.out, P(jx, -0.3)), Dot(P(jx, -0.3), radius=0.05, color=INK),
                       wire(P(jx, a2.ins[0][1]), P(jx, a2.ins[1][1])),
                       wire(P(jx, a2.ins[0][1]), a2.ins[0]), wire(P(jx, a2.ins[1][1]), a2.ins[1]))
        and_g = VGroup(a1, a2, and_w,
                       VGroup(*[M(n, 26).next_to(p, LEFT, buff=0.08) for n, p in zip("AB", a1.ins)]),
                       M("AB", 28).next_to(a2.out, RIGHT, buff=0.08),
                       T("AND", 26, weight="BOLD").move_to(P(-0.6, -2.0)))
        # OR: invert each input, then NAND
        o_a = gate("nand", P(3.0, 0.45), 0.55)
        o_b = gate("nand", P(3.0, -1.05), 0.55)
        o3 = gate("nand", P(5.0, -0.3), s)
        or_w = VGroup()
        for g_ in (o_a, o_b):
            x_t = g_.ins[0][0] - 0.12
            or_w.add(wire(P(x_t - 0.3, g_.out[1] if False else (g_.ins[0][1] + g_.ins[1][1]) / 2),
                          P(x_t, (g_.ins[0][1] + g_.ins[1][1]) / 2)))
            or_w.add(wire(P(x_t, g_.ins[0][1]), P(x_t, g_.ins[1][1])))
            or_w.add(wire(P(x_t, g_.ins[0][1]), g_.ins[0]), wire(P(x_t, g_.ins[1][1]), g_.ins[1]))
        mx = (o_a.out[0] + o3.ins[0][0]) / 2
        or_w.add(wire(o_a.out, P(mx, o_a.out[1]), P(mx, o3.ins[0][1]), o3.ins[0]))
        or_w.add(wire(o_b.out, P(mx + 0.12, o_b.out[1]), P(mx + 0.12, o3.ins[1][1]), o3.ins[1]))
        or_lab = VGroup(M("A", 26).next_to(P(o_a.ins[0][0] - 0.42, (o_a.ins[0][1] + o_a.ins[1][1]) / 2), LEFT, buff=0.05),
                        M("B", 26).next_to(P(o_b.ins[0][0] - 0.42, (o_b.ins[0][1] + o_b.ins[1][1]) / 2), LEFT, buff=0.05),
                        M("A+B", 28).next_to(o3.out, RIGHT, buff=0.08))
        or_g = VGroup(o_a, o_b, o3, or_w, or_lab, T("OR", 26, weight="BOLD").move_to(P(4.3, -2.0)))
        with self.voiceover("De Morgan's laws swap and for or by inverting everything. So nand alone builds every "
                            "gate: tie its inputs for not, add a not for and, and invert both inputs for or.") as vo:
            self.clear_scene(0.5)
            self.play(Write(dm), run_time=1.6)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(hdr), run_time=0.5)
            self.play(FadeIn(not_g), run_time=0.8)
            self.wait(vo.duration * 0.04)
            self.play(FadeIn(and_g), run_time=0.8)
            self.wait(vo.duration * 0.04)
            self.play(FadeIn(or_g), run_time=0.8)

    # ------------------------------------------------------------ scene 9: recap
    def s9(self):
        title = T("Chapter 5 in five lines", 38, color=PRIMARY, weight="BOLD").move_to(P(0, 3.2))
        lines = [
            (r"\lambda_{\max} = \frac{1240}{E_g}\ \text{nm}", "band gaps decide conduction"),
            (r"n_e\,n_h = n_i^{\,2}", "doping picks the majority carrier"),
            (r"\text{barrier} \approx 0.7\ \text{V (Si)}", "a junction is a one-way valve"),
            (r"I_Z = I_S - I_L,\ \ \lambda \approx \frac{1240}{E_g}", "rectifiers, Zener, LED, solar cell"),
            (r"\beta = \frac{\alpha}{1-\alpha},\ \ \overline{AB}", "switches, gain, NAND builds all"),
        ]
        rows = VGroup()
        for i, (tex, note) in enumerate(lines):
            m = M(tex, 36)
            n = T(note, 26, color=MUTED)
            num = T(f"{i + 1}.", 28, color=PRIMARY, weight="BOLD")
            rows.add(VGroup(num, m, n))
        for r in rows:
            r[0].move_to(P(-6.0, 0))
            r[1].next_to(r[0], RIGHT, buff=0.3)
            r[2].move_to(P(3.4, 0))
        for k, r in enumerate(rows):
            r.move_to(P(r.get_x(), 2.1 - 1.05 * k))
            r[0].set_x(-6.0)
            r[1].next_to(r[0], RIGHT, buff=0.3)
            r[2].move_to(P(3.4, r[1].get_y()))
        with self.voiceover("To recap. Band gaps decide conduction. Doping picks the majority carrier, and n e "
                            "times n h stays n i squared.") as vo:
            self.play(FadeIn(title), run_time=0.6)
            self.play(FadeIn(rows[0], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(rows[1], shift=0.15 * UP), run_time=0.7)
        with self.voiceover("A junction is a one way valve, and rectifiers, Zeners and solar cells put it to work. "
                            "A transistor lets a small current control a big one, and builds the gates.") as vo:
            self.play(FadeIn(rows[2], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(rows[3], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(rows[4], shift=0.15 * UP), run_time=0.7)
        with self.voiceover("That completes the course: rays when everything is large, waves when apertures meet "
                            "the wavelength, photons when light meets electrons, and bands when atoms crowd into "
                            "crystals. Try the mastery quiz.") as vo:
            end = T("Course complete: rays · waves · photons · bands", 30, color=PRIMARY).move_to(P(0, -3.4))
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(end, shift=0.2 * UP), run_time=0.8)
