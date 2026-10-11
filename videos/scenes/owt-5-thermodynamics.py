import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

# Chapter colour roles (light background).
HOT = PRIMARY  # heat in, hot reservoir, T_H isotherm
COLD = SECONDARY  # heat out, cold reservoir, T_C isotherm
WORK = ACCENT  # work / shaded area under a path
ADIA = PURPLE  # adiabats
HL = ManimColor("#D19A00")  # highlight gold
GAS = ManimColor("#F3D9C9")  # gas fill
WARN = PRIMARY


def T(s, size=30, **kw):
    return Text(s, font_size=size, **kw)


def M(s, size=40, **kw):
    return MathTex(s, font_size=size, **kw)


def fit(mob, w):
    if mob.width > w:
        mob.scale_to_fit_width(w)
    return mob


def vec(start, end, color, sw=6):
    return Arrow(start, end, buff=0, color=color, stroke_width=sw,
                 max_tip_length_to_length_ratio=0.18, max_stroke_width_to_length_ratio=12)


def check():
    return MathTex(r"\checkmark", color=GREEN, font_size=56)


def cross_mark():
    return MathTex(r"\times", color=WARN, font_size=64)


def P(x, y):
    return np.array([x, y, 0.0])


def pv_axes(xmax, xstep, ymax, ystep, center=P(-3.4, -0.3), xl=5.6, yl=4.8, xticks=(), yticks=()):
    ax = Axes(x_range=[0, xmax, xstep], y_range=[0, ymax, ystep], x_length=xl, y_length=yl, tips=True,
              axis_config={"color": INK, "stroke_width": 2.5, "tip_width": 0.18, "tip_height": 0.18})
    ax.move_to(center)
    xlab = M(r"V\ (\text{L})", 30).next_to(ax.x_axis.get_end(), DOWN, buff=0.25).shift(0.2 * LEFT)
    ylab = M(r"p\ (\text{kPa})", 30).next_to(ax.y_axis.get_end(), RIGHT, buff=0.15)
    ticks = VGroup()
    for v in xticks:
        ticks.add(M(str(v), 24, color=MUTED).next_to(ax.c2p(v, 0), DOWN, buff=0.15))
    for p in yticks:
        ticks.add(M(str(p), 24, color=MUTED).next_to(ax.c2p(0, p), LEFT, buff=0.12))
    return ax, VGroup(ax, xlab, ylab, ticks)


def mid_tip(points, color, size=0.13):
    """A filled arrowhead at the middle of a sampled path, pointing along it."""
    n = len(points)
    a, b = points[max(0, n // 2 - 1)], points[min(n - 1, n // 2 + 1)]
    d = b - a
    ang = np.arctan2(d[1], d[0])
    tri = Triangle(color=color, fill_opacity=1, stroke_width=0).scale(size)
    tri.rotate(ang - PI / 2).move_to((a + b) / 2)
    return tri


def sample(ax, f, v0, v1, n=60):
    return [ax.c2p(v, f(v)) for v in np.linspace(v0, v1, n)]


def path_mob(points, color, sw=5):
    m = VMobject(color=color, stroke_width=sw)
    m.set_points_as_corners(points)
    return m


def cylinder(center, length=4.2, height=1.7):
    """Open-right cylinder walls; returns (walls, left_x, half_height)."""
    cx, cy = center[0], center[1]
    lx, rx = cx - length / 2, cx + length / 2
    h = height / 2
    walls = VGroup(
        Line(P(lx, cy + h), P(rx, cy + h), color=INK, stroke_width=5),
        Line(P(lx, cy - h), P(rx, cy - h), color=INK, stroke_width=5),
        Line(P(lx, cy + h), P(lx, cy - h), color=INK, stroke_width=5),
    )
    return walls, lx, cy, h


def gas_and_piston(lx, cy, h, xt, fill=None):
    """Gas fill + molecules + piston whose left face sits at tracker xt."""
    rng = np.random.default_rng(5)
    fr = rng.uniform(0.08, 0.92, size=(14, 2))
    col = fill if fill is not None else ValueTracker(0)

    def gas():
        x = xt.get_value()
        c = interpolate_color(GAS, ManimColor("#F08A7E"), col.get_value())
        r = Rectangle(width=max(x - lx, 0.05), height=2 * h - 0.06, stroke_width=0, fill_color=c, fill_opacity=1)
        r.move_to(P((lx + x) / 2, cy))
        dots = VGroup(*[Dot(P(lx + (x - lx) * a, cy - h + 2 * h * b), radius=0.05, color=INK) for a, b in fr])
        return VGroup(r, dots)

    def piston():
        x = xt.get_value()
        head = Rectangle(width=0.26, height=2 * h - 0.04, color=INK, stroke_width=2,
                         fill_color=MUTED, fill_opacity=1).move_to(P(x + 0.13, cy))
        rod = Line(P(x + 0.26, cy), P(x + 1.4, cy), color=INK, stroke_width=6)
        return VGroup(head, rod)

    return always_redraw(gas), always_redraw(piston), col


def reservoir(center, label, sym, color, w=3.4, h=0.9):
    box = RoundedRectangle(width=w, height=h, corner_radius=0.12, color=color, stroke_width=3)
    box.set_fill(color, opacity=0.12).move_to(center)
    t = VGroup(T(label, 26, color=color, weight="BOLD"), M(sym, 34, color=color)).arrange(RIGHT, buff=0.25)
    fit(t, w - 0.3).move_to(center)
    return VGroup(box, t)


class OwtCh5Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Oscillations, Waves & Thermal Physics",
            "Chapter 5 · Thermodynamics",
            "Chapter five. Thermodynamics.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ scene 1: first law
    def s1(self):
        box = RoundedRectangle(width=3.4, height=2.0, corner_radius=0.2, color=INK, stroke_width=3)
        box.set_fill(GAS, 1).move_to(P(1.4, -1.0))
        bl = VGroup(T("gas", 30, weight="BOLD"), T("internal energy U", 24, color=MUTED)).arrange(DOWN, buff=0.15)
        bl.move_to(box)
        wa = vec(P(-6.2, -1.0), P(-0.4, -1.0), WORK)
        wl = T("work: a force through a distance", 24, color=WORK).next_to(wa, UP, buff=0.15)
        wl.align_to(wa, LEFT)
        ha = vec(P(1.4, 2.7), P(1.4, 0.1), HOT)
        hl = VGroup(T("heat: driven by a", 24, color=HOT), T("temperature difference", 24, color=HOT))
        hl.arrange(DOWN, aligned_edge=LEFT, buff=0.1).next_to(ha, RIGHT, buff=0.25)
        with self.voiceover('Rub your hands together and they warm up. Hold them near a heater and they warm up too. Energy '
                            'enters as work or as heat, and thermodynamics keeps the accounts.') as vo:
            self.play(FadeIn(box), FadeIn(bl), run_time=0.8)
            self.wait(vo.duration * 0.15)
            self.play(GrowArrow(wa), FadeIn(wl), run_time=1.0)
            self.wait(vo.duration * 0.1)
            self.play(GrowArrow(ha), FadeIn(hl), run_time=1.0)
        self.clear_scene(0.5)

        walls, lx, cy, h = cylinder(P(-3.9, 0.6))
        xt = ValueTracker(lx + 2.6)
        gas, piston, _ = gas_and_piston(lx, cy, h, xt)
        force = always_redraw(lambda: vec(P(xt.get_value() + 0.3, cy + h + 0.55),
                                          P(xt.get_value() + 1.5, cy + h + 0.55), HOT, sw=5))
        fl = always_redraw(lambda: M(r"F = pA", 32, color=HOT).next_to(force, UP, buff=0.08))
        e1 = M(r"dW = F\,dx = pA\,dx = p\,dV", 42).move_to(P(3.3, 1.4))
        e2 = M(r"W = \int p\,dV", 50, color=WORK).move_to(P(3.3, 0.0))
        with self.voiceover('A gas pushes on a piston. If the piston moves out a little, the gas does work: pressure times '
                            'the change in volume, p d V.') as vo:
            self.play(Create(walls), FadeIn(gas), FadeIn(piston), run_time=1.0)
            self.play(GrowArrow(force), FadeIn(fl), run_time=0.7)
            self.wait(vo.duration * 0.1)
            x0 = xt.get_value()
            self.play(xt.animate.set_value(x0 + 0.9), run_time=1.5)
            dx = BraceBetweenPoints(P(x0, cy - h - 0.1), P(x0 + 0.9, cy - h - 0.1), DOWN, color=MUTED)
            dxl = M(r"dx", 32, color=MUTED).next_to(dx, DOWN, buff=0.1)
            self.play(FadeIn(dx), FadeIn(dxl), Write(e1), run_time=1.3)
            self.play(Write(e2), run_time=0.9)

        with self.voiceover('On a pressure volume graph, that adds up to the area under the curve. At a steady one hundred '
                            'kilopascals, from ten litres to twenty five, the work is fifteen hundred joules. Kilopascals '
                            'times litres are joules.') as vo:
            force.clear_updaters()
            fl.clear_updaters()
            self.clear_scene(0.5)
            ax, axg = pv_axes(30, 5, 150, 25, xticks=(10, 25), yticks=(100,))
            line = ax.plot(lambda v: 100, x_range=[10, 25], color=INK, stroke_width=5)
            area = ax.get_area(line, x_range=[10, 25], color=WORK, opacity=0.4)
            d1 = Dot(ax.c2p(10, 100), color=INK)
            d2 = Dot(ax.c2p(25, 100), color=INK)
            self.play(Create(axg), run_time=1.0)
            self.play(FadeIn(d1), Create(line), FadeIn(d2), run_time=1.0)
            self.play(FadeIn(area), run_time=0.8)
            w1 = M(r"W = p\,\Delta V = 100 \times 15", 44).move_to(P(3.4, 1.2))
            w2 = M(r"= 1500\ \text{J}", 48, color=GREEN).next_to(w1, DOWN, buff=0.35)
            w3 = M(r"\text{kPa} \times \text{L} = \text{J}", 38, color=MUTED).next_to(w2, DOWN, buff=0.5)
            self.play(Write(w1), run_time=1.1)
            self.play(Write(w2), run_time=0.7)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(w3), run_time=0.6)

        with self.voiceover('The first law: delta U equals Q minus W. Heat supplied to the gas, minus work done by the gas.') as vo:
            self.clear_scene(0.5)
            law = M(r"\Delta U = Q - W", 84).move_to(P(0, 1.3))
            bx = SurroundingRectangle(law, buff=0.3, corner_radius=0.15, color=PRIMARY, stroke_width=3)
            n1 = M(r"Q = \text{heat supplied \textbf{to} the gas}", 40, color=HOT).move_to(P(0, -0.6))
            n2 = M(r"W = \text{work done \textbf{by} the gas}", 40, color=WORK).next_to(n1, DOWN, buff=0.35)
            self.play(Write(law), run_time=1.2)
            self.play(Create(bx), run_time=0.5)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(n1, shift=0.15 * UP), run_time=0.6)
            self.play(FadeIn(n2, shift=0.15 * UP), run_time=0.6)

        with self.voiceover('Internal energy depends only on the state. Between the same two states, delta U is forty five '
                            'hundred joules on either path, but the work is one thousand or two thousand, so the heat is '
                            'fifty five hundred or sixty five hundred. Heat is energy in transit.') as vo:
            self.clear_scene(0.5)
            ax, axg = pv_axes(25, 5, 250, 50, xticks=(10, 20), yticks=(100, 200))
            A, C1, B, C2 = ax.c2p(10, 100), ax.c2p(20, 100), ax.c2p(20, 200), ax.c2p(10, 200)
            low = VGroup(Line(A, C1, color=WORK, stroke_width=5), Line(C1, B, color=WORK, stroke_width=5))
            high = VGroup(Line(A, C2, color=PURPLE, stroke_width=5), Line(C2, B, color=PURPLE, stroke_width=5))
            la = M("A", 34).next_to(A, DL, buff=0.1)
            lb = M("B", 34).next_to(B, UR, buff=0.1)
            dots = VGroup(Dot(A, color=INK), Dot(B, color=INK))
            self.play(Create(axg), FadeIn(dots), FadeIn(la), FadeIn(lb), run_time=1.0)
            r0 = M(r"\Delta U = 4500\ \text{J on both paths}", 38).move_to(P(3.4, 2.2))
            self.play(Create(low), Create(high), run_time=1.4)
            self.play(Write(r0), run_time=1.0)
            self.wait(vo.duration * 0.1)
            a1 = Polygon(A, C1, ax.c2p(20, 0), ax.c2p(10, 0), stroke_width=0, fill_color=WORK, fill_opacity=0.35)
            r1 = M(r"W = 1000,\ \ Q = 5500\ \text{J}", 38, color=WORK).move_to(P(3.4, 1.0))
            self.play(FadeIn(a1), Write(r1), run_time=1.2)
            a2 = Polygon(C2, B, ax.c2p(20, 0), ax.c2p(10, 0), stroke_width=0, fill_color=PURPLE, fill_opacity=0.25)
            r2 = M(r"W = 2000,\ \ Q = 6500\ \text{J}", 38, color=PURPLE).move_to(P(3.4, -0.1))
            self.play(FadeOut(a1), FadeIn(a2), Write(r2), run_time=1.2)
            cap = T("heat is energy in transit", 28, color=PRIMARY).move_to(P(3.4, -1.5))
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(cap), run_time=0.6)

    # ------------------------------------------------------------ scene 2: three processes
    def s2(self):
        ax, axg = pv_axes(25, 5, 280, 50, center=P(-3.7, -0.4), xl=5.2, yl=4.9, xticks=(10, 20))
        iso_bg = VGroup(*[ax.plot(lambda v, c=c: c / v, x_range=[max(c / 270, 2), 24], color=GRID, stroke_width=3)
                          for c in (600, 1200, 2400, 4800)])
        S = ax.c2p(10, 120)
        sd = Dot(S, color=INK)
        hdr = M(r"\Delta U = nC_V\,\Delta T \quad \text{(any process)}", 40, color=PRIMARY).move_to(P(3.3, 3.1))
        fit(hdr, 6.2)

        def row(label, color, tex, y):
            lab = T(label, 28, color=color, weight="BOLD").move_to(P(3.3, y))
            eq = fit(M(tex, 36), 6.2).move_to(P(3.3, y - 0.6))
            return lab, eq

        with self.voiceover('Hold one variable fixed and the first law becomes a short calculation. For an ideal gas, delta '
                            'U is n C V delta T, for any process.') as vo:
            self.play(Create(axg), Create(iso_bg), FadeIn(sd), run_time=1.2)
            self.wait(vo.duration * 0.3)
            self.play(Write(hdr), run_time=1.4)

        ch = Line(S, ax.c2p(10, 240), color=WORK, stroke_width=6)
        chl, che = row("Isochoric: V fixed", WORK, r"W = 0,\quad Q = \Delta U = nC_V\,\Delta T", 2.1)
        with self.voiceover('Isochoric: fixed volume, a vertical line. No area, no work, so all the heat goes into internal '
                            'energy.') as vo:
            self.play(Create(ch), FadeIn(chl), run_time=1.0)
            self.wait(vo.duration * 0.15)
            self.play(Write(che), run_time=1.2)

        bar = Line(S, ax.c2p(20, 120), color=SECONDARY, stroke_width=6)
        bar_a = ax.get_area(ax.plot(lambda v: 120, x_range=[10, 20]), x_range=[10, 20], color=SECONDARY, opacity=0.25)
        bal, bae = row("Isobaric: p fixed", SECONDARY,
                       r"W = nR\,\Delta T,\quad Q = nC_p\,\Delta T,\quad C_p = C_V + R", 0.6)
        with self.voiceover('Isobaric: fixed pressure, a horizontal line. The gas also expands and does work, so it needs '
                            'extra heat. That is why C P equals C V plus R.') as vo:
            self.play(Create(bar), FadeIn(bal), run_time=1.0)
            self.play(FadeIn(bar_a), run_time=0.6)
            self.wait(vo.duration * 0.15)
            self.play(Write(bae), run_time=1.5)

        th = ax.plot(lambda v: 1200 / v, x_range=[10, 20], color=PURPLE, stroke_width=6)
        thl, the = row("Isothermal: T fixed", PURPLE,
                       r"\Delta U = 0,\quad Q = W = nRT\ln\frac{V_2}{V_1}", -0.9)
        ex = fit(M(r"1\ \text{mol},\ 300\ \text{K},\ V \to 2V:\ \ W \approx 1729\ \text{J}", 34, color=GREEN), 6.2)
        ex.move_to(P(3.3, -2.35))
        with self.voiceover('Isothermal: fixed temperature, a hyperbola. Delta U is zero, so Q equals W, n R T times the '
                            'natural log of V two over V one. One mole doubling its volume at three hundred kelvin: about '
                            'seventeen hundred and thirty joules.') as vo:
            self.play(FadeOut(bar_a), Create(th), FadeIn(thl), run_time=1.2)
            th_a = ax.get_area(th, x_range=[10, 20], color=PURPLE, opacity=0.25)
            self.play(FadeIn(th_a), run_time=0.6)
            self.wait(vo.duration * 0.1)
            self.play(Write(the), run_time=1.5)
            self.wait(vo.duration * 0.15)
            self.play(Write(ex), run_time=1.2)

        with self.voiceover('So no temperature change does not mean no heat: here every joule of work is replaced by heat '
                            'from the bath.') as vo:
            mis = fit(M(r"\Delta T = 0 \;\Rightarrow\; \Delta U = 0,\ \text{not } Q = 0", 38, color=PRIMARY), 6.2)
            mis.move_to(P(3.3, -3.25))
            self.play(Indicate(th, color=HL), run_time=1.0)
            self.play(FadeIn(mis, shift=0.15 * UP), run_time=0.8)

    # ------------------------------------------------------------ scene 3: adiabatic
    def s3(self):
        walls, lx, cy, h = cylinder(P(-3.6, 0.3))
        xt = ValueTracker(lx + 3.4)
        gas, piston, heat = gas_and_piston(lx, cy, h, xt)
        q0 = M(r"Q = 0", 50, color=PRIMARY).move_to(P(3.4, 1.6))
        q1 = M(r"\Delta U = -W > 0", 46).next_to(q0, DOWN, buff=0.4)
        q2 = T("adiabatic: no heat exchange", 28, color=MUTED).next_to(q1, DOWN, buff=0.4)
        with self.voiceover('Pump a bicycle tyre hard and the pump gets hot. You squeezed the air too fast for heat to '
                            'escape. That is adiabatic: Q is zero, so the work done on the gas becomes internal energy.') as vo:
            self.play(Create(walls), FadeIn(gas), FadeIn(piston), run_time=1.0)
            self.add(heat)
            self.play(xt.animate.set_value(lx + 1.3), heat.animate.set_value(1), run_time=1.6,
                      rate_func=rush_into)
            hot = T("hot!", 30, color=PRIMARY, weight="BOLD").next_to(walls, DOWN, buff=0.3)
            self.play(FadeIn(hot), run_time=0.5)
            self.wait(vo.duration * 0.15)
            self.play(Write(q0), run_time=0.7)
            self.play(Write(q1), FadeIn(q2), run_time=1.0)

        with self.voiceover('Set Q to zero, use p V equals n R T, and out comes: p V to the gamma is constant, and so is T V'
                            ' to the gamma minus one.') as vo:
            self.clear_scene(0.5)
            d1 = M(r"nC_V\,dT = -p\,dV", 46).move_to(P(-3.0, 1.8))
            d2 = M(r"pV = nRT", 46).move_to(P(3.0, 1.8))
            d3 = M(r"\frac{dp}{p} = -\gamma\,\frac{dV}{V}", 50).move_to(P(0, 0.3))
            res = M(r"pV^{\gamma} = \text{const}, \qquad TV^{\gamma-1} = \text{const}", 56).move_to(P(0, -1.6))
            bx = SurroundingRectangle(res, buff=0.3, corner_radius=0.15, color=PRIMARY, stroke_width=3)
            self.play(Write(d1), Write(d2), run_time=1.2)
            self.play(TransformFromCopy(VGroup(d1, d2), d3), run_time=1.2)
            self.play(Write(res), Create(bx), run_time=1.5)

        ax, axg = pv_axes(25, 5, 120, 20, xticks=(10, 20), yticks=(50, 100))
        iso = ax.plot(lambda v: 1000 / v, x_range=[8.8, 23], color=SECONDARY, stroke_width=5)
        adi = ax.plot(lambda v: 100 * (10 / v) ** 1.4, x_range=[9.2, 23], color=ADIA, stroke_width=5)
        il = T("isotherm", 24, color=SECONDARY).next_to(ax.c2p(23, 1000 / 23), RIGHT, buff=0.12)
        al = T("adiabat", 24, color=ADIA).next_to(ax.c2p(23, 100 * (10 / 23) ** 1.4), RIGHT, buff=0.12)
        s1 = M(r"\text{isotherm: } \frac{dp}{dV} = -\frac{p}{V}", 40, color=SECONDARY).move_to(P(3.4, 2.0))
        s2 = M(r"\text{adiabat: } \frac{dp}{dV} = -\gamma\,\frac{p}{V}", 40, color=ADIA).move_to(P(3.4, 0.6))
        with self.voiceover('Through the same point, the adiabat is steeper than the isotherm by exactly gamma, because the '
                            'expanding gas also cools. Double the volume of a diatomic gas from one hundred kilopascals: the'
                            ' isotherm ends at fifty, the adiabat at about thirty eight.') as vo:
            self.clear_scene(0.5)
            self.play(Create(axg), FadeIn(Dot(ax.c2p(10, 100), color=INK)), run_time=1.0)
            self.play(Create(iso), Create(adi), FadeIn(il), FadeIn(al), run_time=1.5)
            self.play(Write(s1), run_time=1.0)
            self.play(Write(s2), run_time=1.0)
            self.wait(vo.duration * 0.1)
            vl = DashedLine(ax.c2p(20, 0), ax.c2p(20, 60), color=MUTED, stroke_width=3)
            e1 = Dot(ax.c2p(20, 50), color=SECONDARY)
            e2 = Dot(ax.c2p(20, 37.9), color=ADIA)
            self.play(Create(vl), FadeIn(e1), FadeIn(e2), run_time=0.8)
            s3 = M(r"V \to 2V:\ \ 50\ \text{kPa vs } 37.9\ \text{kPa}", 38).move_to(P(3.9, -0.9))
            self.play(Write(s3), run_time=1.2)

        with self.voiceover('Compress a monatomic gas to one eighth of its volume: the temperature rises four times, the '
                            'pressure thirty two times. A diesel engine squeezes air sixteen times, to about nine hundred '
                            'kelvin, enough to ignite the fuel.') as vo:
            self.clear_scene(0.5)
            h1 = T("Squeeze fast, get hot", 34, color=PRIMARY, weight="BOLD").move_to(P(0, 2.9))
            c1 = M(r"V \to \tfrac18 V \ (\gamma = \tfrac53):\quad T_2 = T \cdot 8^{2/3} = 4T", 46).move_to(P(0, 1.5))
            c2 = M(r"p_2 = p \cdot 8^{5/3} = 32\,p", 46).next_to(c1, DOWN, buff=0.4)
            c3 = M(r"\text{diesel: } T_2 = 300 \times 16^{0.4} \approx 909\ \text{K}", 46, color=GREEN)
            c3.next_to(c2, DOWN, buff=0.8)
            self.play(FadeIn(h1), run_time=0.6)
            self.play(Write(c1), run_time=1.4)
            self.play(Write(c2), run_time=1.0)
            self.wait(vo.duration * 0.2)
            self.play(Write(c3), run_time=1.3)

        with self.voiceover('All of these belong to one family, p V to the n constant: n of zero, one, gamma and infinity. '
                            'Between one and gamma, the heat capacity is negative: the gas absorbs heat, yet cools.') as vo:
            self.clear_scene(0.5)
            ax, axg = pv_axes(25, 5, 120, 20, xticks=(10,), yticks=())
            cs = [
                (ax.plot(lambda v: 60, x_range=[2, 23], color=SECONDARY, stroke_width=5), r"n = 0", SECONDARY),
                (ax.plot(lambda v: 600 / v, x_range=[5.3, 23], color=WORK, stroke_width=5), r"n = 1", WORK),
                (ax.plot(lambda v: 60 * (10 / v) ** (5 / 3), x_range=[6.9, 23], color=ADIA, stroke_width=5),
                 r"n = \gamma", ADIA),
                (Line(ax.c2p(10, 8), ax.c2p(10, 115), color=GREEN, stroke_width=5), r"n \to \infty", GREEN),
            ]
            self.play(Create(axg), run_time=0.8)
            fam = M(r"pV^n = \text{const}", 50).move_to(P(3.4, 2.6))
            self.play(Write(fam), run_time=0.9)
            names = ["isobaric", "isothermal", "adiabatic", "isochoric"]
            rows = VGroup()
            for i, ((c, lab, col), nm) in enumerate(zip(cs, names)):
                r = VGroup(M(lab, 36, color=col), T(nm, 26, color=col)).arrange(RIGHT, buff=0.3)
                r.move_to(P(3.4, 1.55 - 0.6 * i))
                rows.add(r)
                self.play(Create(c), FadeIn(r), run_time=0.7)
            self.add(Dot(ax.c2p(10, 60), color=INK))
            cf = M(r"C = C_V + \frac{R}{1-n}", 44).move_to(P(3.4, -1.4))
            note = T("negative for 1 < n < γ", 28, color=PRIMARY).next_to(cf, DOWN, buff=0.3)
            self.wait(vo.duration * 0.05)
            self.play(Write(cf), run_time=1.0)
            self.play(FadeIn(note), run_time=0.6)

    # ------------------------------------------------------------ scene 4: cycles
    def s4(self):
        ax, axg = pv_axes(40, 10, 350, 50, xticks=(10, 30), yticks=(100, 300))
        c1, c2, c3, c4 = ax.c2p(10, 100), ax.c2p(10, 300), ax.c2p(30, 300), ax.c2p(30, 100)
        edges = VGroup(*[Line(a, b, color=INK, stroke_width=5) for a, b in ((c1, c2), (c2, c3), (c3, c4), (c4, c1))])
        tips = VGroup(*[mid_tip([a, b], INK) for a, b in ((c1, c2), (c2, c3), (c3, c4), (c4, c1))])
        loop = path_mob([c1, c2, c3, c4, c1], INK)
        dot = Dot(c1, color=PRIMARY, radius=0.11)
        r1 = M(r"\Delta U_{\text{cycle}} = 0", 44).move_to(P(3.4, 2.4))
        r2 = M(r"Q_{\text{net}} = W_{\text{net}}", 44).next_to(r1, DOWN, buff=0.4)
        with self.voiceover('An engine repeats a cycle, returning the gas to where it started. So delta U is zero, and the '
                            'net heat in equals the net work out.') as vo:
            self.play(Create(axg), run_time=1.0)
            self.play(Create(edges), FadeIn(tips), FadeIn(dot), run_time=1.2)
            self.play(MoveAlongPath(dot, loop), run_time=2.5, rate_func=linear)
            self.wait(vo.duration * 0.05)
            self.play(Write(r1), run_time=0.9)
            self.play(Write(r2), run_time=0.9)

        up_a = Polygon(c2, c3, ax.c2p(30, 0), ax.c2p(10, 0), stroke_width=0, fill_color=WORK, fill_opacity=0.35)
        dn_a = Polygon(c1, c4, ax.c2p(30, 0), ax.c2p(10, 0), stroke_width=0, fill_color=SECONDARY, fill_opacity=0.45)
        enc = Polygon(c1, c2, c3, c4, stroke_width=0, fill_color=PURPLE, fill_opacity=0.35)
        w1 = M(r"W_{\text{net}} = \text{enclosed area}", 42, color=PURPLE).move_to(P(3.4, 0.6))
        k1 = T("clockwise: engine", 28, color=GREEN).move_to(P(3.4, -0.4))
        k2 = T("anticlockwise: refrigerator", 28, color=SECONDARY).move_to(P(3.4, -1.0))
        with self.voiceover('That net work is the area enclosed by the loop: work done going out at high pressure, minus '
                            'work returned coming back at low pressure. Clockwise is an engine. Anticlockwise is a '
                            'refrigerator.') as vo:
            self.wait(vo.duration * 0.12)
            self.play(FadeIn(up_a), run_time=0.8)
            self.wait(vo.duration * 0.08)
            self.play(FadeIn(dn_a), run_time=0.8)
            self.wait(vo.duration * 0.1)
            self.play(FadeOut(up_a), FadeOut(dn_a), FadeIn(enc), Write(w1), run_time=1.2)
            self.play(FadeIn(k1), run_time=0.5)
            self.wait(vo.duration * 0.05)
            self.play(FadeIn(k2), run_time=0.5)

        qs = VGroup(
            M(r"+3000", 28, color=HOT).next_to(Line(c1, c2), LEFT, buff=0.15),
            M(r"+15\,000", 28, color=HOT).next_to(Line(c2, c3), UP, buff=0.25),
            M(r"-9000", 28, color=COLD).next_to(Line(c3, c4), RIGHT, buff=0.25),
            M(r"-5000", 28, color=COLD).next_to(Line(c4, c1), DOWN, buff=0.25),
        )
        with self.voiceover('This rectangle encloses four thousand joules. For a monatomic gas, two legs absorb eighteen'
                            ' thousand joules of heat, so the efficiency is about twenty two percent.') as vo:
            self.play(FadeOut(r1), FadeOut(r2), FadeOut(w1), FadeOut(k1), FadeOut(k2), run_time=0.5)
            n1 = M(r"W_{\text{net}} = 200 \times 20 = 4000\ \text{J}", 42).move_to(P(3.4, 2.2))
            self.play(Write(n1), run_time=1.2)
            self.wait(vo.duration * 0.1)
            self.play(LaggedStart(*[FadeIn(q) for q in qs], lag_ratio=0.3), run_time=1.6)
            n2 = M(r"Q_{\text{in}} = 3000 + 15\,000 = 18\,000\ \text{J}", 40, color=HOT).move_to(P(3.4, 0.9))
            n2n = T("monatomic ideal gas", 22, color=MUTED).next_to(n2, DOWN, buff=0.12)
            n3 = M(r"\eta = \frac{4000}{18\,000} \approx 22\%", 46, color=GREEN).move_to(P(3.4, -0.75))
            self.play(Write(n2), FadeIn(n2n), run_time=1.2)
            self.play(Write(n3), run_time=1.0)

        with self.voiceover('The gas comes home, but work is not a state function. The leftover area is the engine.') as vo:
            cap = T("Work is not a state function:", 28, color=PRIMARY).move_to(P(3.4, -1.9))
            cap2 = T("the leftover area is the engine", 28, color=PRIMARY).next_to(cap, DOWN, buff=0.15)
            self.play(Indicate(enc, color=HL, scale_factor=1.03), FadeIn(cap), FadeIn(cap2), run_time=1.2)

    # ------------------------------------------------------------ scene 5: engines and refrigerators
    def s5(self):
        X = -3.4
        hot = reservoir(P(X, 2.6), "Hot reservoir", "T_H", HOT)
        cold = reservoir(P(X, -2.6), "Cold reservoir", "T_C", COLD)
        eng = Circle(radius=0.75, color=INK, stroke_width=3).set_fill(GAS, 1).move_to(P(X, 0))
        engl = T("engine", 24, weight="BOLD").move_to(eng)
        qh = vec(P(X, 2.1), P(X, 0.8), HOT)
        qc = vec(P(X, -0.8), P(X, -2.1), COLD)
        wa = vec(P(X + 0.8, 0), P(X + 2.6, 0), WORK)
        qhl = M(r"Q_H", 40, color=HOT).next_to(qh, LEFT, buff=0.2)
        qcl = M(r"Q_C", 40, color=COLD).next_to(qc, LEFT, buff=0.2)
        wl = M(r"W", 40, color=WORK).next_to(wa, UP, buff=0.15)
        with self.voiceover("A power station's cooling towers throw much of its heat away. They must: no engine in a cycle "
                            'turns all its heat into work. It takes Q H from a hot reservoir, does work W, and rejects Q C '
                            'to a cold one.') as vo:
            self.play(FadeIn(hot), FadeIn(cold), FadeIn(eng), FadeIn(engl), run_time=1.0)
            self.wait(vo.duration * 0.3)
            self.play(GrowArrow(qh), FadeIn(qhl), run_time=0.8)
            self.play(GrowArrow(wa), FadeIn(wl), run_time=0.8)
            self.play(GrowArrow(qc), FadeIn(qcl), run_time=0.8)
            e0 = M(r"W = Q_H - Q_C", 46).move_to(P(3.4, 2.2))
            self.play(Write(e0), run_time=1.0)

        with self.voiceover('Efficiency, eta, is W over Q H, or one minus Q C over Q H. Absorb one thousand joules, reject '
                            'six hundred, and the efficiency is forty percent.') as vo:
            e1 = M(r"\eta = \frac{W}{Q_H} = 1 - \frac{Q_C}{Q_H}", 52).move_to(P(3.4, 0.6))
            self.play(Write(e1), run_time=1.4)
            self.wait(vo.duration * 0.15)
            n_h = M(r"1000\ \text{J}", 34, color=HOT).move_to(qhl, aligned_edge=RIGHT)
            n_c = M(r"600\ \text{J}", 34, color=COLD).move_to(qcl, aligned_edge=RIGHT)
            n_w = M(r"400\ \text{J}", 34, color=WORK).move_to(wl)
            self.play(Transform(qhl, n_h), Transform(qcl, n_c), Transform(wl, n_w), run_time=1.0)
            e2 = M(r"\eta = \frac{400}{1000} = 40\%", 46, color=GREEN).move_to(P(3.4, -1.1))
            self.play(Write(e2), run_time=1.0)

        with self.voiceover('A petrol engine runs the Otto cycle: two adiabats and two constant volume steps. Its '
                            'efficiency, one minus r to the power one minus gamma, depends only on the compression ratio r. '
                            'For r of eight, with air, about fifty six percent.') as vo:
            self.clear_scene(0.5)
            ax, axg = pv_axes(5, 1, 17, 2, xticks=(), yticks=())
            g = 1.4
            k12, k34 = 4 ** g, 15.0
            p1, p2, p3, p4 = ax.c2p(4, 1), ax.c2p(1, k12), ax.c2p(1, 15), ax.c2p(4, k34 / 4 ** g)
            leg12 = sample(ax, lambda v: k12 * v ** -g, 4, 1)
            leg34 = sample(ax, lambda v: k34 * v ** -g, 1, 4)
            pts = leg12 + [p3] + leg34 + [p1]
            m12 = path_mob(leg12, ADIA)
            m23 = Line(p2, p3, color=HOT, stroke_width=5)
            m34 = path_mob(leg34, ADIA)
            m41 = Line(p4, p1, color=COLD, stroke_width=5)
            tips = VGroup(mid_tip(leg12, ADIA), mid_tip([p2, p3], HOT), mid_tip(leg34, ADIA), mid_tip([p4, p1], COLD))
            labs = VGroup(M("1", 30).next_to(p1, RIGHT, buff=0.22), M("2", 30).next_to(p2, LEFT, buff=0.12),
                          M("3", 30).next_to(p3, LEFT, buff=0.12), M("4", 30).next_to(p4, UR, buff=0.08))
            spark = T("spark", 24, color=HOT).next_to(Line(p2, p3), RIGHT, buff=0.3)
            power = T("power stroke", 24, color=ADIA).move_to(ax.c2p(2.6, k34 * 2.2 ** -g) + 0.5 * UR)
            vr = M(r"r = \frac{V_1}{V_2}", 32, color=MUTED).move_to(ax.c2p(2.5, 1) + 1.05 * DOWN)
            self.play(Create(axg), run_time=0.8)
            dot = Dot(p1, color=PRIMARY, radius=0.1)
            self.play(Create(m12), FadeIn(dot), FadeIn(labs[0]), FadeIn(labs[1]), run_time=0.9)
            self.play(Create(m23), FadeIn(spark), FadeIn(labs[2]), run_time=0.7)
            self.play(Create(m34), FadeIn(power), FadeIn(labs[3]), run_time=0.9)
            self.play(Create(m41), FadeIn(tips), FadeIn(vr), run_time=0.7)
            self.play(MoveAlongPath(dot, path_mob(pts, INK)), run_time=2.0, rate_func=linear)
            o0 = T("Otto cycle (petrol engine)", 30, color=PRIMARY, weight="BOLD").move_to(P(3.4, 2.4))
            o1 = M(r"\eta = 1 - r^{\,1-\gamma}", 54).move_to(P(3.4, 1.1))
            o2 = M(r"r = 8,\ \gamma = 1.4:\ \ \eta \approx 0.56", 44, color=GREEN).move_to(P(3.4, -0.3))
            o3 = T("set by the compression ratio only", 26, color=MUTED).move_to(P(3.4, -1.3))
            self.play(FadeIn(o0), Write(o1), run_time=1.2)
            self.play(Write(o2), FadeIn(o3), run_time=1.2)

        with self.voiceover('Run it backwards and you have a refrigerator. Its coefficient of performance is Q C over W: '
                            'remove three hundred joules with one hundred joules of work, and it is three.') as vo:
            self.clear_scene(0.5)
            warm = reservoir(P(X, 2.6), "Warm room", "T_H", HOT)
            coldb = reservoir(P(X, -2.6), "Cold interior", "T_C", COLD)
            fr = Circle(radius=0.75, color=INK, stroke_width=3).set_fill(ManimColor("#DCEFF2"), 1).move_to(P(X, 0))
            frl = T("fridge", 24, weight="BOLD").move_to(fr)
            a_c = vec(P(X, -2.1), P(X, -0.8), COLD)
            a_h = vec(P(X, 0.8), P(X, 2.1), HOT)
            a_w = vec(P(X + 2.6, 0), P(X + 0.8, 0), WORK)
            l_c = M(r"Q_C = 300\ \text{J}", 34, color=COLD).next_to(a_c, LEFT, buff=0.2)
            l_h = M(r"Q_H = 400\ \text{J}", 34, color=HOT).next_to(a_h, LEFT, buff=0.2)
            l_w = M(r"W = 100\ \text{J}", 34, color=WORK).next_to(a_w, UP, buff=0.15)
            self.play(FadeIn(warm), FadeIn(coldb), FadeIn(fr), FadeIn(frl), run_time=0.9)
            self.play(GrowArrow(a_w), FadeIn(l_w), run_time=0.7)
            self.play(GrowArrow(a_c), FadeIn(l_c), run_time=0.7)
            self.play(GrowArrow(a_h), FadeIn(l_h), run_time=0.7)
            c1 = M(r"\text{COP} = \frac{Q_C}{W}", 52).move_to(P(3.4, 1.4))
            c2 = M(r"= \frac{300}{100} = 3", 50, color=GREEN).next_to(c1, DOWN, buff=0.4)
            self.wait(vo.duration * 0.05)
            self.play(Write(c1), run_time=1.0)
            self.play(Write(c2), run_time=1.0)

    # ------------------------------------------------------------ scene 6: second law and Carnot
    def s6(self):
        hdr = T("The second law", 36, color=PRIMARY, weight="BOLD").move_to(P(0, 3.2))
        # Kelvin-Planck: perfect engine (no cold reservoir)
        XL, XR = -3.4, 3.4
        kh = reservoir(P(XL, 1.9), "Hot", "T_H", HOT, w=2.6, h=0.75)
        ke = Circle(radius=0.55, color=INK, stroke_width=3).set_fill(GAS, 1).move_to(P(XL, 0.1))
        kq = vec(P(XL, 1.5), P(XL, 0.65), HOT, sw=5)
        kw = vec(P(XL + 0.6, 0.1), P(XL + 2.0, 0.1), WORK, sw=5)
        kwl = M(r"W = Q_H", 30, color=WORK).next_to(kw, UP, buff=0.1)
        kx = cross_mark().scale(1.6).move_to(P(XL, 0.3))
        kt = T("Kelvin–Planck: no engine turns", 24).move_to(P(XL, -1.4))
        kt2 = T("heat entirely into work", 24).next_to(kt, DOWN, buff=0.12)
        # Clausius: heat cold -> hot unaided
        ch = reservoir(P(XR, 1.9), "Hot", "T_H", HOT, w=2.6, h=0.75)
        cc = reservoir(P(XR, -0.4), "Cold", "T_C", COLD, w=2.6, h=0.75)
        ca = vec(P(XR, 0.0), P(XR, 1.5), COLD, sw=5)
        cql = M(r"Q", 32, color=COLD).next_to(ca, RIGHT, buff=0.15)
        cx = cross_mark().scale(1.6).move_to(P(XR, 0.75))
        ct = T("Clausius: heat never flows from", 24).move_to(P(XR, -1.4))
        ct2 = T("cold to hot on its own", 24).next_to(ct, DOWN, buff=0.12)
        both = T("break either one and you break the other", 26, color=MUTED).move_to(P(0, -3.0))
        with self.voiceover('The first law would allow a ship to run on heat from the ocean. The second law forbids it. '
                            'Kelvin and Planck: no engine turns heat entirely into work. Clausius: heat never flows from '
                            'cold to hot on its own. Break one, and you break the other.') as vo:
            self.play(FadeIn(hdr), run_time=0.6)
            self.wait(vo.duration * 0.15)
            self.play(FadeIn(kh), FadeIn(ke), GrowArrow(kq), GrowArrow(kw), FadeIn(kwl), run_time=1.0)
            self.play(FadeIn(kt), FadeIn(kt2), FadeIn(kx), run_time=0.8)
            self.wait(vo.duration * 0.08)
            self.play(FadeIn(ch), FadeIn(cc), GrowArrow(ca), FadeIn(cql), run_time=1.0)
            self.play(FadeIn(ct), FadeIn(ct2), FadeIn(cx), run_time=0.8)
            self.wait(vo.duration * 0.05)
            self.play(FadeIn(both), run_time=0.6)

        # Carnot cycle, 1 mol monatomic: T_H = 500 K, T_C = 300 K (kPa, L, kPa*L = J)
        g = 5 / 3
        nRH, nRC = 8.314 * 500, 8.314 * 300
        VA, VB = 10.0, 20.0
        s = (500 / 300) ** (1 / (g - 1))
        VC, VD = VB * s, VA * s
        pB, pA = nRH / VB, nRH / VA
        ax, axg = pv_axes(50, 10, 450, 100, xticks=(), yticks=())
        legAB = sample(ax, lambda v: nRH / v, VA, VB)
        legBC = sample(ax, lambda v: pB * (VB / v) ** g, VB, VC)
        legCD = sample(ax, lambda v: nRC / v, VC, VD)
        legDA = sample(ax, lambda v: pA * (VA / v) ** g, VD, VA)
        mAB, mBC, mCD, mDA = (path_mob(legAB, HOT), path_mob(legBC, ADIA), path_mob(legCD, COLD),
                              path_mob(legDA, ADIA))
        tips = VGroup(mid_tip(legAB, HOT), mid_tip(legBC, ADIA), mid_tip(legCD, COLD), mid_tip(legDA, ADIA))
        lth = M(r"T_H", 34, color=HOT).next_to(legAB[30], UR, buff=0.1)
        ltc = M(r"T_C", 34, color=COLD).next_to(legCD[30], DOWN, buff=0.15)
        names = VGroup(M("A", 30).next_to(legAB[0], LEFT, buff=0.12), M("B", 30).next_to(legBC[0], UR, buff=0.08),
                       M("C", 30).next_to(legCD[0], UR, buff=0.08), M("D", 30).next_to(legDA[0], DL, buff=0.08))
        rows = VGroup(
            M(r"A\to B\ \ \text{isothermal at } T_H\text{: takes in } Q_H", 32, color=HOT),
            M(r"B\to C\ \ \text{adiabatic expansion}", 32, color=ADIA),
            M(r"C\to D\ \ \text{isothermal at } T_C\text{: gives out } Q_C", 32, color=COLD),
            M(r"D\to A\ \ \text{adiabatic compression}", 32, color=ADIA),
        ).arrange(DOWN, buff=0.28, aligned_edge=LEFT).move_to(P(3.3, 1.1))
        fit(rows, 6.0)
        with self.voiceover("The best possible engine is reversible: Carnot's cycle, two isotherms at T H and T C, joined by"
                            ' two adiabats.') as vo:
            self.clear_scene(0.5)
            ct0 = T("The Carnot cycle", 32, color=PRIMARY, weight="BOLD").move_to(P(3.3, 3.0))
            self.play(Create(axg), FadeIn(ct0), run_time=0.8)
            dot = Dot(legAB[0], color=PRIMARY, radius=0.1)
            self.play(FadeIn(dot), FadeIn(names[0]), run_time=0.3)
            for m, n, r in ((mAB, names[1], rows[0]), (mBC, names[2], rows[1]), (mCD, names[3], rows[2]),
                            (mDA, None, rows[3])):
                anims = [Create(m), MoveAlongPath(dot, m.copy()), FadeIn(r)]
                if n is not None:
                    anims.append(FadeIn(n))
                self.play(*anims, run_time=1.0, rate_func=linear)
            self.play(FadeIn(tips), FadeIn(lth), FadeIn(ltc), run_time=0.6)

        with self.voiceover('Its heats obey Q C over Q H equals T C over T H, whatever the gas or the volumes. So no engine '
                            'can beat one minus T C over T H. Between five hundred and three hundred kelvin, that is forty '
                            'percent.') as vo:
            self.play(FadeOut(rows), run_time=0.4)
            f1 = M(r"\frac{Q_C}{Q_H} = \frac{T_C}{T_H}", 50).move_to(P(3.3, 1.7))
            f2 = M(r"\eta_{\max} = 1 - \frac{T_C}{T_H}", 54).move_to(P(3.3, 0.1))
            bx = SurroundingRectangle(f2, buff=0.25, corner_radius=0.15, color=PRIMARY, stroke_width=3)
            f3 = M(r"500\ \text{K},\ 300\ \text{K}:\ \ \eta_{\max} = 40\%", 42, color=GREEN).move_to(P(3.3, -1.4))
            f4 = T("any gas, any volumes", 26, color=MUTED).move_to(P(3.3, -2.3))
            self.play(Write(f1), run_time=1.2)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(f4), run_time=0.5)
            self.play(Write(f2), Create(bx), run_time=1.3)
            self.wait(vo.duration * 0.1)
            self.play(Write(f3), run_time=1.2)

        with self.voiceover('Use it as a lie detector. A claimed forty five percent between four hundred and three hundred '
                            'kelvin is impossible: Carnot allows twenty five. And lowering T C by fifty kelvin beats raising'
                            ' T H by fifty.') as vo:
            self.clear_scene(0.5)
            h = T("A lie detector", 34, color=PRIMARY, weight="BOLD").move_to(P(0, 3.1))
            l1 = M(r"\text{claim: } 1000\ \text{J in},\ 550\ \text{J out},\ 450\ \text{J of work}", 42)
            l1.move_to(P(0, 2.0))
            l2 = M(r"\eta_{\text{claim}} = 45\%", 46).move_to(P(-2.6, 0.8))
            l3 = M(r"\eta_{\max} = 1 - \tfrac{300}{400} = 25\%", 46, color=GREEN).move_to(P(2.6, 0.8))
            x = cross_mark().next_to(l2, LEFT, buff=0.3)
            imp = T("impossible", 28, color=WARN).next_to(l2, DOWN, buff=0.25)
            self.play(FadeIn(h), Write(l1), run_time=1.2)
            self.play(Write(l2), run_time=0.8)
            self.wait(vo.duration * 0.08)
            self.play(Write(l3), run_time=1.0)
            self.play(FadeIn(x), FadeIn(imp), run_time=0.6)
            div = Line(P(-6, -0.9), P(6, -0.9), color=GRID, stroke_width=3)
            b1 = M(r"T_H + 50:\ \ 1 - \tfrac{300}{450} \approx 33.3\%", 42).move_to(P(-3.2, -2.0))
            b2 = M(r"T_C - 50:\ \ 1 - \tfrac{250}{400} = 37.5\%", 42, color=GREEN).move_to(P(3.2, -2.0))
            ck = check().next_to(b2, DOWN, buff=0.25)
            self.wait(vo.duration * 0.05)
            self.play(Create(div), Write(b1), run_time=1.1)
            self.play(Write(b2), FadeIn(ck), run_time=1.1)

    # ------------------------------------------------------------ scene 7: recap and course wrap
    def s7(self):
        title = T("Chapter 5 in six lines", 38, color=PRIMARY, weight="BOLD").move_to(P(0, 3.2))
        lines = [
            (r"W = \int p\,dV", "area under the p–V path"),
            (r"\Delta U = Q - W", "U is a state function; Q and W are not"),
            (r"W = 0,\ \ Q = nC_p\Delta T,\ \ Q = W = nRT\ln\tfrac{V_2}{V_1}", "isochoric, isobaric, isothermal"),
            (r"pV^{\gamma} = \text{const}", "adiabat: Q = 0, steeper by γ"),
            (r"W_{\text{net}} = \text{enclosed area}", "clockwise loop = engine"),
            (r"\eta \le 1 - \frac{T_C}{T_H}", "the Carnot ceiling"),
        ]
        rows = VGroup()
        for i, (tex, note) in enumerate(lines):
            num = T(f"{i + 1}.", 28, color=PRIMARY, weight="BOLD")
            m = fit(M(tex, 38), 6.3)
            n = fit(T(note, 24, color=MUTED), 5.0)
            rows.add(VGroup(num, m, n))
        for r in rows:
            r[0].move_to(P(-6.2, 0))
            r[1].next_to(r[0], RIGHT, buff=0.3)
        rows.arrange(DOWN, buff=0.3, aligned_edge=LEFT).move_to(P(0, -0.15))
        for r in rows:
            r[0].set_x(-6.2)
            r[1].next_to(r[0], RIGHT, buff=0.3)
            r[2].move_to(P(0, r[1].get_y()), aligned_edge=LEFT).set_x(1.6 + r[2].width / 2)
        with self.voiceover('To recap. Work is the area under the p V path. Delta U equals Q minus W, and only U is a state '
                            'function.') as vo:
            self.play(FadeIn(title), run_time=0.6)
            self.play(FadeIn(rows[0], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.25)
            self.play(FadeIn(rows[1], shift=0.15 * UP), run_time=0.7)
        with self.voiceover("Fix V, p or T for the three simple processes. Adiabats obey p V to the gamma. A cycle's net "
                            'work is its area, and the second law caps every engine at one minus T C over T H.') as vo:
            self.play(FadeIn(rows[2], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.12)
            self.play(FadeIn(rows[3], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.12)
            self.play(FadeIn(rows[4], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.12)
            self.play(FadeIn(rows[5], shift=0.15 * UP), run_time=0.7)

        chain_words = ["oscillations", "waves and sound", "solids and fluids", "heat and molecules", "engines"]
        cols = [PRIMARY, SECONDARY, GREEN, ACCENT, PURPLE]
        cards = VGroup()
        for w, c in zip(chain_words, cols):
            t = T(w, 24, color=c, weight="BOLD")
            b = RoundedRectangle(width=t.width + 0.35, height=0.75, corner_radius=0.12, color=c, stroke_width=3)
            b.set_fill(c, opacity=0.1)
            cards.add(VGroup(b, t))
        cards.arrange(RIGHT, buff=0.55)
        fit(cards, 12.8).move_to(P(0, 0.4))
        arrows = VGroup(*[Arrow(cards[i].get_right(), cards[i + 1].get_left(), buff=0.06, color=MUTED,
                                stroke_width=4, max_tip_length_to_length_ratio=0.4)
                          for i in range(len(cards) - 1)])
        with self.voiceover('That closes the course. A restoring force made springs and pendulums swing. Passed along, it '
                            'became waves and sound. Many particles gave solids and fluids, molecules in motion gave '
                            'temperature, and their energy bookkeeping gives engines. Try the mastery quiz.') as vo:
            self.play(FadeOut(rows), FadeOut(title), run_time=0.6)
            per = vo.duration * 0.75 / 5
            for i, c in enumerate(cards):
                anims = [FadeIn(c, shift=0.15 * UP)]
                if i > 0:
                    anims.append(GrowArrow(arrows[i - 1]))
                self.play(*anims, run_time=0.6)
                self.wait(max(per - 0.6, 0.1))
            end = T("End of course · Oscillations, Waves & Thermal Physics", 30, color=PRIMARY)
            fit(end, 12.5).move_to(P(0, -2.2))
            self.play(FadeIn(end, shift=0.2 * UP), run_time=0.8)
