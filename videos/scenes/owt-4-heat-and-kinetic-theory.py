import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

# Chapter colour roles (light background).
HOT = PRIMARY  # hot side, mercury, high temperature = strawberry red
COLD = SECONDARY  # cold side, ice, low temperature = teal
HEAT = ACCENT  # heat flow, plateaus, latent heat = amber
ALT = PURPLE  # second quantity (Fahrenheit scale, rotation)
HL = ManimColor("#D19A00")  # highlight gold
WARN = PRIMARY
WOOD = ManimColor("#B07A4A")
METAL = ManimColor("#9AA3AB")
LAND = ManimColor("#C9A27A")


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


def card(mob, pad=0.25, color=MUTED):
    box = SurroundingRectangle(mob, buff=pad, corner_radius=0.15, color=color, stroke_width=2)
    box.set_fill(WHITE, opacity=0.85)
    return VGroup(box, mob)


def P(x, y):
    return np.array([x, y, 0.0])


def thermometer(base, h=3.0, level=0.5, color=HOT):
    """Bulb centre at `base`; returns (glass, column)."""
    tube = RoundedRectangle(width=0.36, height=h, corner_radius=0.18, color=INK, stroke_width=3)
    tube.set_fill(WHITE, 1).move_to(base + (h / 2 + 0.1) * UP)
    bulb = Circle(radius=0.3, color=INK, stroke_width=3).set_fill(color, 1).move_to(base)
    col = Rectangle(width=0.16, height=max(0.02, level * h), stroke_width=0).set_fill(color, 1)
    col.move_to(base + 0.2 * UP, aligned_edge=DOWN)
    return VGroup(tube, bulb), col


def title_bar(s):
    return T(s, 34, color=PRIMARY, weight="BOLD").move_to(P(0, 3.3))


class OwtCh4Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Oscillations, Waves & Thermal Physics",
            "Chapter 4 · Heat and Kinetic Theory",
            "Chapter four. Heat and kinetic theory.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7, self.s8):
            part()
            for m in self.mobjects:
                m.clear_updaters()
            self.clear_scene()

    # ------------------------------------------------------------ scene 1: temperature
    def s1(self):
        hdr = title_bar("What a thermometer measures")
        metal = RoundedRectangle(width=3.6, height=0.45, corner_radius=0.1, color=INK, stroke_width=2)
        metal.set_fill(METAL, 1).move_to(P(-3.4, -1.2))
        wood = RoundedRectangle(width=3.6, height=0.45, corner_radius=0.1, color=INK, stroke_width=2)
        wood.set_fill(WOOD, 1).move_to(P(3.4, -1.2))
        legs = VGroup(*[Line(b.get_bottom() + dx * RIGHT, b.get_bottom() + dx * RIGHT + 0.9 * DOWN,
                             color=INK, stroke_width=4) for b in (metal, wood) for dx in (-1.4, 1.4)])
        ml = T("metal bench", 28).next_to(metal, DOWN, buff=1.1)
        wl = T("wooden bench", 28).next_to(wood, DOWN, buff=1.1)
        g1, c1 = thermometer(P(-3.4, -0.4), h=2.2, level=0.35)
        g2, c2 = thermometer(P(3.4, -0.4), h=2.2, level=0.35)
        r1 = M(r"5^\circ\mathrm{C}", 36).next_to(g1, RIGHT, buff=0.3)
        r2 = M(r"5^\circ\mathrm{C}", 36).next_to(g2, RIGHT, buff=0.3)
        feel = T("feels colder", 26, color=COLD).next_to(g1, LEFT, buff=0.35)
        feel2 = T("feels warmer", 26, color=HOT).next_to(g2, LEFT, buff=0.35)
        with self.voiceover("A metal bench on a winter morning feels colder than a wooden one, yet a thermometer "
                            "reads the same on both. Your hand senses how fast heat leaves your skin, not "
                            "temperature.") as vo:
            self.play(FadeIn(hdr), FadeIn(metal), FadeIn(wood), Create(legs), FadeIn(ml), FadeIn(wl), run_time=1.0)
            self.play(FadeIn(feel), FadeIn(feel2), run_time=0.6)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(g1), FadeIn(g2), GrowFromEdge(c1, DOWN), GrowFromEdge(c2, DOWN), run_time=1.0)
            self.play(FadeIn(r1), FadeIn(r2), run_time=0.6)

        with self.voiceover("A thermometer works because of the zeroth law. If A and B are each in thermal "
                            "equilibrium with C, they are in equilibrium with each other. The thermometer is "
                            "body C.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hdr], run_time=0.5)
            pos = {"A": P(-3.2, -1.6), "B": P(3.2, -1.6), "C": P(0, 1.3)}
            cols = {"A": HOT, "B": COLD, "C": HEAT}
            bods = {}
            for k, p in pos.items():
                c = Circle(radius=0.75, color=cols[k], stroke_width=4).set_fill(cols[k], 0.15).move_to(p)
                bods[k] = VGroup(c, M(k, 54, color=cols[k]).move_to(p))
            ac = Line(pos["A"], pos["C"], buff=0.85, color=GREEN, stroke_width=5)
            bc = Line(pos["B"], pos["C"], buff=0.85, color=GREEN, stroke_width=5)
            ab = DashedLine(pos["A"], pos["B"], buff=0.85, color=GREEN, stroke_width=5)
            eq1 = T("equilibrium", 24, color=GREEN).next_to(ac.get_center(), LEFT, buff=0.35)
            eq2 = T("equilibrium", 24, color=GREEN).next_to(bc.get_center(), RIGHT, buff=0.35)
            ck = check().next_to(ab, DOWN, buff=0.2)
            therm = T("thermometer", 26, color=HEAT).next_to(bods["C"], RIGHT, buff=0.3)
            self.play(*[FadeIn(b) for b in bods.values()], run_time=0.8)
            self.play(Create(ac), FadeIn(eq1), run_time=0.8)
            self.play(Create(bc), FadeIn(eq2), run_time=0.8)
            self.wait(vo.duration * 0.15)
            self.play(Create(ab), FadeIn(ck), run_time=0.9)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(therm), run_time=0.5)

        with self.voiceover("To build a scale, take any property that changes steadily, like a mercury column. "
                            "Mark it at melting ice and boiling water. Temperature is the fraction of the way "
                            "between them, times one hundred.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hdr], run_time=0.5)
            base = P(-4.2, -2.9)
            h = 5.0
            glass, _ = thermometer(base, h=h, level=0.0)
            y0, y100 = base[1] + 1.0, base[1] + 4.6
            col = Rectangle(width=0.16, height=0.02, stroke_width=0).set_fill(HOT, 1)
            col.move_to(base + 0.2 * UP, aligned_edge=DOWN)

            def mark(y, s, color):
                tick = Line(P(base[0] - 0.35, y), P(base[0] + 0.35, y), color=color, stroke_width=4)
                lab = M(s, 32, color=color).next_to(tick, LEFT, buff=0.2)
                return VGroup(tick, lab)

            m0 = mark(y0, r"X_0", COLD)
            m100 = mark(y100, r"X_{100}", HOT)
            n0 = T("melting ice", 22, color=COLD).next_to(m0, RIGHT, buff=0.6)
            n100 = T("boiling water", 22, color=HOT).next_to(m100, RIGHT, buff=0.6)
            yX = y0 + 0.37 * (y100 - y0)
            mX = mark(yX, r"X", INK)
            self.play(FadeIn(glass), run_time=0.6)
            self.play(col.animate.stretch_to_fit_height(y0 - base[1] - 0.2, about_edge=DOWN), run_time=0.8)
            self.play(FadeIn(m0), FadeIn(n0), run_time=0.5)
            self.play(col.animate.stretch_to_fit_height(y100 - base[1] - 0.2, about_edge=DOWN), run_time=1.0)
            self.play(FadeIn(m100), FadeIn(n100), run_time=0.5)
            self.play(col.animate.stretch_to_fit_height(yX - base[1] - 0.2, about_edge=DOWN), FadeIn(mX), run_time=1.0)
            f = M(r"t = 100\times\frac{X - X_0}{X_{100} - X_0}", 52).move_to(P(2.6, 0.6))
            box = SurroundingRectangle(f, buff=0.3, corner_radius=0.15, color=PRIMARY, stroke_width=3)
            self.wait(vo.duration * 0.1)
            self.play(Write(f), run_time=1.5)
            self.play(Create(box), run_time=0.5)

        with self.voiceover("Fahrenheit puts ice at thirty two and steam at two hundred and twelve, so F equals "
                            "nine fifths C plus thirty two. The scales agree at minus forty.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hdr], run_time=0.5)

            def yC(c):
                return -2.9 + (c + 40) / 140 * 5.4

            xc, xf = -4.6, -1.6
            lc = Line(P(xc, yC(-40)), P(xc, yC(100)), color=COLD, stroke_width=5)
            lf = Line(P(xf, yC(-40)), P(xf, yC(100)), color=ALT, stroke_width=5)
            hc = T("Celsius", 26, color=COLD).next_to(lc, UP, buff=0.2)
            hf = T("Fahrenheit", 26, color=ALT).next_to(lf, UP, buff=0.2)
            ticks = VGroup()
            rungs = VGroup()
            for c, fv in ((100, "212"), (37, "98.6"), (0, "32"), (-40, "-40")):
                y = yC(c)
                tc = Line(P(xc - 0.15, y), P(xc + 0.15, y), color=COLD, stroke_width=4)
                tf = Line(P(xf - 0.15, y), P(xf + 0.15, y), color=ALT, stroke_width=4)
                lcl = M(str(c), 30, color=COLD).next_to(tc, LEFT, buff=0.15)
                lfl = M(fv, 30, color=ALT).next_to(tf, RIGHT, buff=0.15)
                ticks.add(VGroup(tc, tf, lcl, lfl))
                rungs.add(DashedLine(P(xc + 0.2, y), P(xf - 0.2, y), color=GRID, stroke_width=3))
            self.play(Create(lc), Create(lf), FadeIn(hc), FadeIn(hf), run_time=0.8)
            self.play(LaggedStart(*[FadeIn(VGroup(t, r)) for t, r in zip(ticks[:3], rungs[:3])], lag_ratio=0.3),
                      run_time=1.4)
            fe = M(r"F = \tfrac95\,C + 32", 56).move_to(P(3.3, 1.2))
            self.play(Write(fe), run_time=1.2)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(ticks[3]), FadeIn(rungs[3]), run_time=0.6)
            hb = SurroundingRectangle(VGroup(ticks[3]), buff=0.12, color=GREEN, stroke_width=3)
            agree = M(r"-40^\circ\mathrm{C} = -40^\circ\mathrm{F}", 44, color=GREEN).move_to(P(3.3, -0.4))
            self.play(Create(hb), Write(agree), run_time=1.0)

    # ------------------------------------------------------------ scene 2: expansion
    def s2(self):
        hdr = title_bar("Thermal expansion")
        ax = Axes(x_range=[0, 6, 1], y_range=[0, 1.3, 0.5], x_length=6.0, y_length=4.2, tips=False,
                  axis_config={"color": MUTED, "stroke_width": 2, "include_ticks": False})
        ax.move_to(P(-3.0, -0.6))
        a, x0, D = 1.1, 1.6, 1.0

        def U(x):
            return D * (1 - np.exp(-a * (x - x0))) ** 2

        well = ax.plot(U, x_range=[0.95, 5.8], color=INK, stroke_width=4)
        xl = T("atom spacing", 22, color=MUTED).next_to(ax.x_axis, DOWN, buff=0.45)
        yl = T("energy", 22, color=MUTED).next_to(ax.y_axis, UP, buff=0.1)

        def level(E, color):
            s = np.sqrt(E / D)
            xa = x0 - np.log(1 + s) / a
            xb = x0 - np.log(1 - s) / a
            seg = Line(ax.c2p(xa, E), ax.c2p(xb, E), color=color, stroke_width=4)
            mid = Dot(ax.c2p((xa + xb) / 2, E), radius=0.09, color=color)
            return VGroup(seg, mid), (xa + xb) / 2

        cool, mc = level(0.18, COLD)
        hot, mh = level(0.62, HOT)
        drop_c = DashedLine(ax.c2p(mc, 0.18), ax.c2p(mc, 0), color=COLD, stroke_width=3)
        drop_h = DashedLine(ax.c2p(mh, 0.62), ax.c2p(mh, 0), color=HOT, stroke_width=3)
        lab_c = T("cool", 22, color=COLD).next_to(cool[0], RIGHT, buff=0.15)
        lab_h = T("hot", 22, color=HOT).next_to(hot[0], RIGHT, buff=0.15)
        shift = vec(ax.c2p(mc - 0.05, -0.07), ax.c2p(mh + 0.15, -0.07), HL, sw=5)
        note = T("average spacing moves out", 26, color=HL).move_to(P(3.4, -0.6))
        steep = T("steep: repulsion", 22, color=MUTED).next_to(ax.c2p(1.2, 0.88), RIGHT, buff=0)
        gentle = T("gentle: attraction", 22, color=MUTED).move_to(ax.c2p(4.6, 1.05))
        with self.voiceover("Heat almost anything and it grows. Atoms sit in a lopsided energy well. Shake them "
                            "harder and their average spacing creeps outward.") as vo:
            self.play(FadeIn(hdr), Create(ax), FadeIn(xl), FadeIn(yl), run_time=0.8)
            self.play(Create(well), run_time=1.2)
            self.play(FadeIn(steep), FadeIn(gentle), run_time=0.5)
            self.play(Create(cool), Create(drop_c), FadeIn(lab_c), run_time=0.8)
            self.wait(vo.duration * 0.1)
            self.play(Create(hot), Create(drop_h), FadeIn(lab_h), run_time=0.8)
            self.play(GrowArrow(shift), FadeIn(note), run_time=0.8)

        with self.voiceover("So every length grows by the same fraction: delta L equals L alpha delta T. A one "
                            "metre steel rod heated by one hundred degrees grows by just over a millimetre, which "
                            "is why rails need gaps.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hdr], run_time=0.5)
            rod = Rectangle(width=6.0, height=0.5, color=INK, stroke_width=3).set_fill(METAL, 1)
            rod.move_to(P(-0.6, 1.4))
            ghost = rod.copy().set_fill(opacity=0).set_stroke(MUTED, 2)
            ghost = DashedVMobject(ghost, num_dashes=40)
            f = M(r"\Delta L = L\,\alpha\,\Delta T", 60).move_to(P(0, -0.4))
            ex = M(r"1\ \mathrm{m}\times 1.2\times10^{-5}\,\mathrm{K^{-1}}\times 100\ \mathrm{K} = 1.2\ \mathrm{mm}",
                   40, color=GREEN).move_to(P(0, -1.8))
            gap = T("so rails need gaps", 26, color=MUTED).move_to(P(0, -2.9))
            self.play(FadeIn(rod), run_time=0.6)
            self.add(ghost)
            self.play(rod.animate.stretch_to_fit_width(7.4, about_edge=LEFT).set_fill(HOT, 0.85), run_time=1.6)
            br = Brace(Line(ghost.get_right(), rod.get_right()), UP, color=HOT)
            bl = M(r"\Delta L", 36, color=HOT).next_to(br, UP, buff=0.1)
            ex_note = T("(exaggerated)", 22, color=MUTED).next_to(rod, DOWN, buff=0.2)
            self.play(FadeIn(br), FadeIn(bl), FadeIn(ex_note), run_time=0.6)
            self.play(Write(f), run_time=1.0)
            self.wait(vo.duration * 0.1)
            self.play(Write(ex), run_time=1.3)
            self.play(FadeIn(gap), run_time=0.5)

        with self.voiceover("A hole's diameter is a length too, so heating a plate makes its hole bigger. Area "
                            "grows with beta equal to two alpha, and volume with gamma equal to three "
                            "alpha.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hdr], run_time=0.5)
            c0 = P(-3.6, -0.3)
            plate = Square(side_length=3.0, color=INK, stroke_width=3).set_fill(METAL, 1).move_to(c0)
            hole = Circle(radius=0.7, color=INK, stroke_width=3).set_fill(BG, 1).move_to(c0)
            ghost_p = DashedVMobject(plate.copy().set_fill(opacity=0).set_stroke(MUTED, 2), num_dashes=40)
            ghost_h = DashedVMobject(hole.copy().set_fill(opacity=0).set_stroke(MUTED, 2), num_dashes=24)
            pl = VGroup(plate, hole)
            self.play(FadeIn(pl), run_time=0.6)
            self.add(ghost_p, ghost_h)
            self.bring_to_front(ghost_h)
            self.play(pl.animate.scale(1.25).set_color(HOT), run_time=1.6)
            hole.set_fill(BG, 1).set_stroke(INK, 3)
            plate.set_stroke(INK, 3)
            self.bring_to_front(ghost_h)
            lab = T("the hole grows too", 26, color=HOT).next_to(plate, DOWN, buff=0.3)
            self.play(FadeIn(lab), run_time=0.5)
            rows = VGroup(
                M(r"\Delta L = L\,\alpha\,\Delta T", 48),
                M(r"\Delta A = A\,\beta\,\Delta T,\quad \beta = 2\alpha", 48),
                M(r"\Delta V = V\,\gamma\,\Delta T,\quad \gamma = 3\alpha", 48),
            ).arrange(DOWN, buff=0.5, aligned_edge=LEFT).move_to(P(2.9, 0.0))
            self.wait(vo.duration * 0.05)
            for r in rows:
                self.play(FadeIn(r, shift=0.15 * UP), run_time=0.7)

    # ------------------------------------------------------------ scene 3: calorimetry
    def s3(self):
        hdr = title_bar("Heating curve of 1 kg of ice")
        ax = Axes(x_range=[0, 3200, 500], y_range=[-30, 120, 10], x_length=11.0, y_length=4.6, tips=False,
                  axis_config={"color": MUTED, "stroke_width": 2, "include_ticks": False})
        ax.move_to(P(0.3, -0.5))
        xl = T("heat added (kJ)", 22, color=MUTED).next_to(ax.x_axis, DOWN, buff=0.15).align_to(ax, RIGHT)
        yl = M(r"T\ (^\circ\mathrm{C})", 30, color=MUTED).next_to(ax.y_axis, UP, buff=0.1)
        yt = VGroup(*[M(str(v), 26, color=MUTED).next_to(ax.c2p(0, v), LEFT, buff=0.15) for v in (-20, 0, 100)])
        zero = DashedLine(ax.c2p(0, 0), ax.c2p(3200, 0), color=GRID, stroke_width=2)
        hund = DashedLine(ax.c2p(0, 100), ax.c2p(3200, 100), color=GRID, stroke_width=2)
        pts = [(0, -20), (42, 0), (378, 0), (798, 100), (3058, 100), (3180, 116)]
        cols = [COLD, HEAT, HOT, HEAT, MUTED]
        segs = [Line(ax.c2p(*pts[i]), ax.c2p(*pts[i + 1]), color=cols[i], stroke_width=7) for i in range(5)]
        melt = T("melting", 24, color=HEAT).next_to(segs[1], DOWN, buff=0.2)
        warm = T("water warms", 24, color=HOT).next_to(segs[2].get_center(), RIGHT, buff=0.25)
        boil = T("boiling", 24, color=HEAT).next_to(segs[3], UP, buff=0.2)
        with self.voiceover('Pour heat steadily into a kilogram of ice at minus twenty degrees. The temperature climbs, then '
                            'stalls at zero while the ice melts, climbs again, then stalls for a long time at one hundred while '
                            'the water boils.') as vo:
            self.play(FadeIn(hdr), Create(ax), FadeIn(xl), FadeIn(yl), FadeIn(yt), FadeIn(zero), FadeIn(hund),
                      run_time=1.0)
            self.wait(vo.duration * 0.1)
            self.play(Create(segs[0]), run_time=0.4)
            self.play(Create(segs[1]), FadeIn(melt), run_time=1.0)
            self.play(Create(segs[2]), FadeIn(warm), run_time=1.0)
            self.wait(vo.duration * 0.1)
            self.play(Create(segs[3]), FadeIn(boil), run_time=2.4)
            self.play(Create(segs[4]), run_time=0.4)

        with self.voiceover('On a plateau, heat breaks bonds instead of speeding molecules up, so Q equals m L. Boiling takes two'
                            ' thousand two hundred and sixty kilojoules, almost three times everything before it.') as vo:
            q1 = M(r"Q = mc\,\Delta T", 36, color=HOT).move_to(ax.c2p(1350, 22))
            q2 = M(r"Q = mL", 40, color=HEAT).move_to(ax.c2p(1930, 75))
            self.play(Write(q1), run_time=0.8)
            self.play(Write(q2), run_time=0.8)
            self.wait(vo.duration * 0.15)
            br1 = BraceBetweenPoints(ax.c2p(0, -30), ax.c2p(798, -30), DOWN, color=MUTED)
            br2 = BraceBetweenPoints(ax.c2p(798, -30), ax.c2p(3058, -30), DOWN, color=HEAT)
            b1 = M(r"798\ \mathrm{kJ}", 30, color=MUTED).next_to(br1, DOWN, buff=0.1)
            b2 = M(r"2260\ \mathrm{kJ}", 30, color=HEAT).next_to(br2, DOWN, buff=0.1)
            self.play(FadeOut(xl), FadeIn(br1), FadeIn(b1), run_time=0.7)
            self.play(FadeIn(br2), FadeIn(b2), run_time=0.7)

        with self.voiceover('In mixing problems, heat lost equals heat gained, but first check whether all the ice melts. A '
                            'hundred grams of ice at minus ten goes into two hundred grams of water at fifty. The water can give '
                            'forty two thousand joules; the ice needs thirty five thousand seven hundred.') as vo:
            self.play(*[FadeOut(m) for m in self.mobjects], run_time=0.5)
            h2 = title_bar("First: does all the ice melt?")
            given = M(r"100\ \mathrm{g\ ice\ at\ }{-10}^\circ\mathrm{C}\ \ +\ \ 200\ \mathrm{g\ water\ at\ }50^\circ\mathrm{C}",
                      40).move_to(P(0, 2.3))
            self.play(FadeIn(h2), Write(given), run_time=1.2)
            s = 8.0 / 42000
            x0 = -3.6
            bar_a = Rectangle(width=42000 * s, height=0.6, stroke_width=0).set_fill(HOT, 0.85)
            bar_a.move_to(P(x0, 0.7), aligned_edge=LEFT)
            bar_w = Rectangle(width=2100 * s, height=0.6, stroke_width=0).set_fill(COLD, 0.85)
            bar_w.move_to(P(x0, -0.7), aligned_edge=LEFT)
            bar_m = Rectangle(width=33600 * s, height=0.6, stroke_width=0).set_fill(HEAT, 0.85)
            bar_m.next_to(bar_w, RIGHT, buff=0)
            la = VGroup(T("water can give", 24), M(r"0.2(4200)(50)", 28, color=MUTED)).arrange(DOWN, buff=0.1)
            la.next_to(bar_a, LEFT, buff=0.3)
            lb = VGroup(T("ice needs", 24), M(r"2100 + 33\,600", 28, color=MUTED)).arrange(DOWN, buff=0.1)
            lb.next_to(VGroup(bar_w, bar_m), LEFT, buff=0.3).align_to(la, RIGHT)
            va = M(r"42\,000\ \mathrm{J}", 34, color=WHITE).move_to(bar_a)
            vb = M(r"35\,700\ \mathrm{J}", 34, color=INK).move_to(bar_m)
            wl = T("warm to 0", 20, color=COLD).next_to(bar_w, DOWN, buff=0.12)
            ml = T("melt", 20, color=HEAT).next_to(bar_m, DOWN, buff=0.12)
            self.wait(vo.duration * 0.25)
            self.play(FadeIn(la), GrowFromEdge(bar_a, LEFT), run_time=1.0)
            self.play(FadeIn(va), run_time=0.4)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(lb), GrowFromEdge(bar_w, LEFT), FadeIn(wl), run_time=0.7)
            self.play(GrowFromEdge(bar_m, LEFT), FadeIn(ml), FadeIn(vb), run_time=0.9)

        with self.voiceover('That is enough, so all the ice melts, and the balance gives five degrees. With too little heat, the '
                            'mixture would sit at zero with ice left over.') as vo:
            ok = M(r"42\,000 > 35\,700", 40, color=GREEN).move_to(P(-2.6, -2.0))
            ck = check().scale(0.8).next_to(ok, RIGHT, buff=0.25)
            bal = M(r"42\,000 - 840\,\theta = 35\,700 + 420\,\theta", 38).move_to(P(3.0, -2.0))
            res = M(r"\theta = 5^\circ\mathrm{C}", 52, color=GREEN).move_to(P(3.0, -3.0))
            self.play(Write(ok), FadeIn(ck), run_time=0.9)
            self.play(Write(bal), run_time=1.4)
            self.play(Write(res), run_time=0.8)
            self.wait(vo.duration * 0.1)
            alt = T("not enough heat?  final state 0 °C, some ice left", 24, color=MUTED).move_to(P(-2.6, -3.0))
            fit(alt, 6.4)
            self.play(FadeIn(alt), run_time=0.6)

    # ------------------------------------------------------------ scene 4: conduction
    def s4(self):
        hdr = title_bar("Conduction")
        slab = Rectangle(width=2.4, height=3.4, color=INK, stroke_width=3).set_fill(WOOD, 0.5).move_to(P(-3.6, -0.4))
        hotp = Rectangle(width=0.25, height=3.4, stroke_width=0).set_fill(HOT, 1).next_to(slab, LEFT, buff=0)
        coldp = Rectangle(width=0.25, height=3.4, stroke_width=0).set_fill(COLD, 1).next_to(slab, RIGHT, buff=0)
        t1 = M(r"T_1", 36, color=HOT).next_to(hotp, LEFT, buff=0.2)
        t2 = M(r"T_2", 36, color=COLD).next_to(coldp, RIGHT, buff=0.2)
        Hh = vec(slab.get_left() + 0.3 * RIGHT, slab.get_right() + 0.3 * LEFT, HEAT, sw=8)
        Hl = M("H", 40, color=HEAT).next_to(Hh, UP, buff=0.15)
        br = Brace(slab, DOWN, color=MUTED)
        Ll = M("L", 36).next_to(br, DOWN, buff=0.1)
        Al = M(r"\text{area } A", 30, color=MUTED).next_to(slab, UP, buff=0.2)
        f = M(r"H = \frac{kA\,\Delta T}{L}", 60).move_to(P(2.8, 1.2))
        kv = VGroup(M(r"k_{\text{copper}} \approx 400", 36), M(r"k_{\text{wood}} \approx 0.1", 36),
                    M(r"\mathrm{W\,m^{-1}K^{-1}}", 30, color=MUTED)).arrange(DOWN, buff=0.25).move_to(P(2.8, -1.2))
        with self.voiceover('In conduction, faster jiggling atoms nudge their neighbours. In the steady state, the heat current '
                            "through a slab is k A delta T over L. Copper's k is about four hundred, wood's about point one.") as vo:
            self.play(FadeIn(hdr), FadeIn(slab), FadeIn(hotp), FadeIn(coldp), FadeIn(t1), FadeIn(t2), run_time=0.9)
            self.play(GrowArrow(Hh), FadeIn(Hl), run_time=0.8)
            self.play(FadeIn(br), FadeIn(Ll), FadeIn(Al), run_time=0.6)
            self.wait(vo.duration * 0.15)
            self.play(Write(f), run_time=1.3)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(kv, shift=0.15 * UP), run_time=0.8)

        with self.voiceover("Call L over k A the thermal resistance. Then H equals delta T over R, which is Ohm's law, and "
                            'resistances in series simply add.') as vo:
            self.play(FadeOut(kv), f.animate.scale(0.7).move_to(P(2.8, 2.3)), run_time=0.6)
            r1 = M(r"R = \frac{L}{kA}", 50).move_to(P(2.8, 1.0))
            r2 = M(r"H = \frac{\Delta T}{R}", 56, color=HEAT).move_to(P(1.2, -0.6))
            r3 = M(r"I = \frac{V}{R}", 56, color=MUTED).move_to(P(4.7, -0.6))
            arr = M(r"\leftrightarrow", 50, color=MUTED).move_to(P(3.0, -0.6))
            r4 = M(r"R_{\text{series}} = R_1 + R_2", 44).move_to(P(2.8, -2.2))
            self.play(Write(r1), run_time=1.0)
            self.play(Write(r2), run_time=1.0)
            self.wait(vo.duration * 0.05)
            self.play(FadeIn(arr), Write(r3), run_time=1.0)
            self.wait(vo.duration * 0.1)
            self.play(Write(r4), run_time=1.0)

        # two-slab wall
        xL, xI, xR = -5.7, -3.3, -2.1
        yb, yt = -3.2, -1.3
        sa = Rectangle(width=xI - xL, height=yt - yb, color=INK, stroke_width=3).set_fill(WOOD, 0.45)
        sa.move_to(P((xL + xI) / 2, (yb + yt) / 2))
        sb = Rectangle(width=xR - xI, height=yt - yb, color=INK, stroke_width=3).set_fill(ALT, 0.3)
        sb.move_to(P((xI + xR) / 2, (yb + yt) / 2))
        la = VGroup(M("A", 34), M(r"10\ \mathrm{cm}", 24, color=MUTED), M(r"k = 0.8", 24, color=MUTED)).arrange(DOWN, buff=0.1)
        la.move_to(sa)
        lb = VGroup(M("B", 34), M(r"5\ \mathrm{cm}", 24, color=MUTED), M(r"k = 0.2", 24, color=MUTED)).arrange(DOWN, buff=0.1)
        lb.move_to(sb)

        def ty(Tv):
            return -0.8 + Tv / 100 * 3.4

        prof_ax = VGroup(Line(P(xL, ty(0)), P(xR, ty(0)), color=GRID, stroke_width=2),
                         Line(P(xL, ty(0)), P(xL, ty(100)), color=GRID, stroke_width=2))
        prof = VMobject(color=HOT, stroke_width=6).set_points_as_corners(
            [P(xL, ty(100)), P(xI, ty(66.7)), P(xR, ty(0))])
        p100 = M(r"100^\circ", 28, color=HOT).next_to(P(xL, ty(100)), LEFT, buff=0.1)
        p0 = M(r"0^\circ", 28, color=COLD).next_to(P(xR, ty(0)), RIGHT, buff=0.1)
        idot = Dot(P(xI, ty(66.7)), radius=0.1, color=HL)
        il = M(r"66.7^\circ", 30, color=HL).next_to(idot, UR, buff=0.1)
        idash = DashedLine(P(xI, ty(66.7)), P(xI, yt), color=MUTED, stroke_width=2)
        with self.voiceover('Take ten centimetres of A, with k of point eight, and five centimetres of B, with k of point two, '
                            'with one hundred degrees on one face and zero on the other. The resistances are point one two five and point two five kelvin per watt, so about two hundred and '
                            'sixty seven watts flow per square metre.') as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hdr], run_time=0.5)
            self.play(FadeIn(sa), FadeIn(sb), FadeIn(la), FadeIn(lb), run_time=0.8)
            self.wait(vo.duration * 0.12)
            self.play(FadeIn(prof_ax), FadeIn(p100), FadeIn(p0), run_time=0.6)
            w1 = M(r"R_A = \frac{0.1}{0.8} = 0.125\ \mathrm{K/W}", 40).move_to(P(2.6, 1.8))
            w2 = M(r"R_B = \frac{0.05}{0.2} = 0.25\ \mathrm{K/W}", 40).next_to(w1, DOWN, buff=0.35)
            w3 = M(r"H = \frac{100}{0.375} \approx 267\ \mathrm{W}", 44, color=HEAT).next_to(w2, DOWN, buff=0.4)
            self.wait(vo.duration * 0.15)
            self.play(Write(w1), run_time=1.1)
            self.play(Write(w2), run_time=1.1)
            self.wait(vo.duration * 0.1)
            self.play(Write(w3), run_time=1.1)

        with self.voiceover('The temperature drops split one to two, so the interface sits near sixty seven degrees. The poor '
                            'conductor takes most of the drop: that is insulation.') as vo:
            self.play(Create(prof), run_time=1.3)
            self.play(FadeIn(idot), FadeIn(il), Create(idash), run_time=0.6)
            w4 = M(r"\text{drops } 33.3^\circ : 66.7^\circ = 1 : 2", 40).move_to(P(2.6, -1.6))
            w5 = T("the poor conductor takes most of the drop", 26, color=GREEN).move_to(P(2.6, -2.6))
            fit(w5, 7.4)
            self.play(Write(w4), run_time=1.1)
            self.play(FadeIn(w5), run_time=0.6)

    # ------------------------------------------------------------ scene 5: convection, radiation, cooling
    def s5(self):
        hdr = title_bar("Convection and radiation")
        land = Rectangle(width=6.0, height=0.6, stroke_width=0).set_fill(LAND, 1).move_to(P(-3.6, -2.9))
        sea = Rectangle(width=6.6, height=0.6, stroke_width=0).set_fill(COLD, 0.7).move_to(P(2.7, -2.9))
        ll = T("warm land", 24).move_to(land)
        sl = T("cool sea", 24, color=WHITE).move_to(sea)
        up = vec(P(-3.6, -2.3), P(-3.6, 0.6), HOT, sw=5)
        top = vec(P(-3.2, 1.0), P(2.3, 1.0), MUTED, sw=5)
        down = vec(P(2.7, 0.6), P(2.7, -2.1), COLD, sw=5)
        low = vec(P(2.3, -2.3), P(-3.2, -2.3), COLD, sw=5)
        bz = T("sea breeze", 26, color=COLD).next_to(low, UP, buff=0.15)
        rises = T("warm air rises", 22, color=HOT).next_to(up, LEFT, buff=0.15)
        sun = Circle(radius=0.45, color=HL, stroke_width=3).set_fill(HL, 1).move_to(P(5.8, 2.5))
        rays = VGroup(*[Line(sun.get_center() + 0.6 * np.array([np.cos(a), np.sin(a), 0]),
                             sun.get_center() + 0.85 * np.array([np.cos(a), np.sin(a), 0]),
                             color=HL, stroke_width=3) for a in np.linspace(0, TAU, 12, endpoint=False)])
        wave = FunctionGraph(lambda x: 0.12 * np.sin(6 * x), x_range=[0, 3.0], color=HL, stroke_width=4)
        wave.rotate(np.arctan2(-1.5, -1.8)).move_to(P(4.4, 1.0))
        rad = T("radiation: no medium needed", 24, color=HL).move_to(P(3.9, 2.4)).shift(1.6 * LEFT)
        with self.voiceover('In convection, warm fluid rises and carries heat with it, as in a sea breeze. Radiation needs no '
                            'medium: every body above absolute zero radiates.') as vo:
            self.play(FadeIn(hdr), FadeIn(land), FadeIn(sea), FadeIn(ll), FadeIn(sl), run_time=0.7)
            self.play(GrowArrow(up), FadeIn(rises), run_time=0.7)
            self.play(GrowArrow(top), run_time=0.5)
            self.play(GrowArrow(down), run_time=0.5)
            self.play(GrowArrow(low), FadeIn(bz), run_time=0.6)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(sun), FadeIn(rays), Create(wave), FadeIn(rad), run_time=1.0)

        with self.voiceover('Radiated power is e sigma A T to the fourth, with T in kelvin. Double the absolute temperature and '
                            'the power rises sixteen times. And a good absorber is a good emitter.') as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hdr], run_time=0.5)
            f = M(r"P = e\,\sigma A\,T^4", 64).move_to(P(0, 2.0))
            box = SurroundingRectangle(f, buff=0.25, corner_radius=0.15, color=PRIMARY, stroke_width=3)
            self.play(Write(f), Create(box), run_time=1.2)
            s1 = Circle(radius=0.6, color=HOT, stroke_width=3).set_fill(HOT, 0.25).move_to(P(-3.2, -0.6))
            s2 = Circle(radius=0.6, color=HOT, stroke_width=3).set_fill(HOT, 0.85).move_to(P(1.4, -0.6))
            l1 = M("T", 40).next_to(s1, DOWN, buff=0.25)
            l2 = M("2T", 40).next_to(s2, DOWN, buff=0.25)
            g1 = VGroup(*[vec(s1.get_center() + 0.7 * d, s1.get_center() + 1.05 * d, HEAT, sw=3)
                          for d in (UP, LEFT, RIGHT)])
            g2 = VGroup(*[vec(s2.get_center() + 0.7 * np.array([np.cos(a), np.sin(a), 0]),
                              s2.get_center() + 1.5 * np.array([np.cos(a), np.sin(a), 0]), HEAT, sw=5)
                          for a in np.linspace(0, TAU, 8, endpoint=False) if np.sin(a) > -0.5])
            arr = M(r"\Rightarrow", 50).move_to(P(-1.0, -0.6))
            x16 = M(r"P \times 2^4 = 16P", 44, color=GREEN).move_to(P(4.9, -0.6))
            self.play(FadeIn(s1), FadeIn(l1), FadeIn(g1), run_time=0.6)
            self.play(FadeIn(arr), FadeIn(s2), FadeIn(l2), FadeIn(g2), run_time=0.8)
            self.play(Write(x16), run_time=0.9)
            kir = T("good absorber = good emitter", 28, color=MUTED).move_to(P(0, -2.9))
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(kir), run_time=0.6)

        ax = Axes(x_range=[0, 2.0, 0.5], y_range=[0, 1.15, 0.5], x_length=6.4, y_length=4.4, tips=False,
                  axis_config={"color": MUTED, "stroke_width": 2, "include_ticks": False})
        ax.move_to(P(-3.0, -0.5))

        def raw(lam, T_):
            lam = max(lam, 0.05)
            return 1.0 / (lam ** 5 * (np.exp(14388.0 / (lam * T_)) - 1.0))

        PEAK = raw(2898.0 / 5800, 5800)

        def planck(T_):
            def f(lam):
                lam = max(lam, 0.05)
                return 1.0 / (lam ** 5 * (np.exp(14388.0 / (lam * T_)) - 1.0))
            return lambda lam: f(lam) / PEAK

        hot_c = ax.plot(planck(5800), x_range=[0.12, 2.0, 0.01], color=COLD, stroke_width=4)
        cool_c = ax.plot(planck(4500), x_range=[0.15, 2.0, 0.01], color=HOT, stroke_width=4)
        pk_h = DashedLine(ax.c2p(0.5, 0), ax.c2p(0.5, 1.0), color=COLD, stroke_width=2)
        pk_c = DashedLine(ax.c2p(0.644, 0), ax.c2p(0.644, planck(4500)(0.644)),
                          color=HOT, stroke_width=2)
        lh = M(r"5800\ \mathrm{K}", 30, color=COLD).move_to(ax.c2p(1.55, 1.0))
        lc = M(r"4500\ \mathrm{K}", 30, color=HOT).move_to(ax.c2p(1.55, 0.82))
        xl = M(r"\text{wavelength } \lambda", 28, color=MUTED).next_to(ax.x_axis, DOWN, buff=0.15)
        with self.voiceover('Hotter bodies peak at shorter wavelengths: lambda max times T is constant. The Sun peaks near five '
                            'hundred nanometres, so its surface is about five thousand eight hundred kelvin.') as vo:
            self.play(*[FadeOut(m) for m in self.mobjects], run_time=0.5)
            h2 = title_bar("Wien's law")
            self.play(FadeIn(h2), Create(ax), FadeIn(xl), run_time=0.7)
            self.play(Create(cool_c), FadeIn(lc), Create(pk_c), run_time=1.1)
            self.play(Create(hot_c), FadeIn(lh), Create(pk_h), run_time=1.1)
            w = M(r"\lambda_m T = b = 2.9\times10^{-3}\ \mathrm{m\,K}", 42).move_to(P(3.5, 1.4))
            fit(w, 6.4)
            self.play(Write(w), run_time=1.3)
            self.wait(vo.duration * 0.1)
            s1 = M(r"T = \frac{2.9\times10^{-3}}{5\times10^{-7}}", 42).move_to(P(3.5, -0.2))
            s2 = M(r"= 5800\ \mathrm{K}", 46, color=GREEN).next_to(s1, DOWN, buff=0.3)
            sun_l = T("the Sun", 24, color=MUTED).next_to(s1, UP, buff=0.25)
            self.play(FadeIn(sun_l), Write(s1), run_time=1.1)
            self.play(Write(s2), run_time=0.8)

        with self.voiceover("For a small excess over the surroundings, the loss is proportional to the excess: Newton's law of "
                            'cooling. Tea at eighty degrees in a twenty degree room loses half its excess about every seven '
                            'minutes.') as vo:
            self.play(*[FadeOut(m) for m in self.mobjects], run_time=0.5)
            h3 = title_bar("Newton's law of cooling")
            ax2 = Axes(x_range=[0, 30, 5], y_range=[0, 90, 10], x_length=7.0, y_length=4.6, tips=False,
                       axis_config={"color": MUTED, "stroke_width": 2, "include_ticks": False})
            ax2.move_to(P(-2.6, -0.6))
            xl2 = T("time (min)", 22, color=MUTED).next_to(ax2.x_axis, DOWN, buff=0.15).align_to(ax2, RIGHT)
            yt = VGroup(*[M(str(v), 26, color=MUTED).next_to(ax2.c2p(0, v), LEFT, buff=0.12) for v in (20, 50, 80)])
            room = DashedLine(ax2.c2p(0, 20), ax2.c2p(30, 20), color=COLD, stroke_width=3)
            rl = T("room 20 °C", 22, color=COLD).next_to(ax2.c2p(30, 20), DOWN, buff=0.15).shift(0.7 * LEFT)
            curve = ax2.plot(lambda t: 20 + 60 * np.exp(-0.1 * t), x_range=[0, 30], color=HOT, stroke_width=5)
            self.play(FadeIn(h3), Create(ax2), FadeIn(xl2), FadeIn(yt), Create(room), FadeIn(rl), run_time=0.9)
            law = M(r"\frac{dT}{dt} = -K\,(T - T_0)", 46).move_to(P(3.9, 1.5))
            self.play(Write(law), run_time=1.2)
            self.wait(vo.duration * 0.1)
            self.play(Create(curve), run_time=2.2)
            t_half = np.log(2) / 0.1
            marks = VGroup()
            for k, Tv in ((1, 50), (2, 35)):
                p = ax2.c2p(k * t_half, Tv)
                marks.add(Dot(p, radius=0.08, color=HL),
                          DashedLine(p, ax2.c2p(k * t_half, 20), color=HL, stroke_width=2))
            ex = VGroup(M(r"\text{excess: } 60 \to 30 \to 15", 38),
                        M(r"\text{halves every } \tfrac{\ln 2}{K} \approx 6.9\ \text{min}", 38, color=GREEN)
                        ).arrange(DOWN, buff=0.35, aligned_edge=LEFT).move_to(P(3.9, -0.6))
            fit(ex, 5.6)
            self.play(FadeIn(marks), FadeIn(ex[0]), run_time=0.8)
            self.play(FadeIn(ex[1]), run_time=0.6)

    # ------------------------------------------------------------ scene 6: kinetic theory
    def s6(self):
        hdr = title_bar("Kinetic theory of gases")
        box = Square(side_length=4.2, color=INK, stroke_width=4).move_to(P(-3.9, -0.5))
        lo = box.get_corner(DL) + 0.12
        hi = box.get_corner(UR) - 0.12
        rng = np.random.default_rng(4)
        n = 26
        pos = lo[:2] + rng.random((n, 2)) * (hi[:2] - lo[:2])
        ang = rng.random(n) * TAU
        spd = 1.2 + 0.9 * rng.random(n)
        vel = np.stack([np.cos(ang) * spd, np.sin(ang) * spd], axis=1)
        sp = ValueTracker(1.0)
        mols = VGroup(*[Dot(P(*p), radius=0.07, color=COLD) for p in pos])
        state = {"pos": pos, "vel": vel}

        def upd(g, dt):
            s = state
            s["pos"] = s["pos"] + s["vel"] * dt * sp.get_value()
            for k in range(2):
                low = s["pos"][:, k] < lo[k]
                high = s["pos"][:, k] > hi[k]
                s["vel"][low | high, k] *= -1
                s["pos"][low, k] = 2 * lo[k] - s["pos"][low, k]
                s["pos"][high, k] = 2 * hi[k] - s["pos"][high, k]
            for d, p in zip(g, s["pos"]):
                d.move_to(P(*p))

        mols.add_updater(upd)
        # tracked molecule moving only along x
        yr = box.get_center()[1] + 0.9
        red = {"x": box.get_center()[0], "v": 2.2}

        def upd_red(d, dt):
            red["x"] += red["v"] * dt * sp.get_value()
            if red["x"] > hi[0]:
                red["x"] = 2 * hi[0] - red["x"]
                red["v"] *= -1
            if red["x"] < lo[0]:
                red["x"] = 2 * lo[0] - red["x"]
                red["v"] *= -1
            d.move_to(P(red["x"], yr))

        rd = Dot(P(red["x"], yr), radius=0.12, color=HOT)
        rd.add_updater(upd_red)
        wall = Line(box.get_corner(UR), box.get_corner(DR), color=HL, stroke_width=8)
        dp = M(r"\Delta p = 2mv_x", 36, color=HOT).next_to(wall, RIGHT, buff=0.2).shift(0.9 * UP)
        bl = Brace(box, DOWN, color=MUTED)
        bL = M("L", 34).next_to(bl, DOWN, buff=0.1)
        with self.voiceover("Kinetic theory builds a gas from Newton's laws: tiny molecules in random motion, colliding "
                            'elastically. When one hits the right wall, its x velocity reverses, giving the wall momentum two m v'
                            ' x.') as vo:
            self.play(FadeIn(hdr), Create(box), FadeIn(mols), run_time=1.0)
            self.wait(vo.duration * 0.3)
            self.play(FadeIn(rd), FadeIn(bl), FadeIn(bL), run_time=0.6)
            self.wait(vo.duration * 0.15)
            self.play(Create(wall), Write(dp), run_time=1.0)

        col_x = 3.4
        e1 = M(r"F_1 = \frac{2mv_x}{2L/v_x} = \frac{mv_x^2}{L}", 42).move_to(P(col_x, 2.2))
        e2 = M(r"\overline{v_x^2} = \tfrac13\,\overline{v^2}", 40, color=MUTED).move_to(P(col_x, 0.9))
        e3 = M(r"p = \tfrac13\,\rho\,v_{\text{rms}}^2", 56).move_to(P(col_x, -0.5))
        b3 = SurroundingRectangle(e3, buff=0.2, corner_radius=0.12, color=PRIMARY, stroke_width=3)
        with self.voiceover('It returns after a round trip of two L, so its average force is m v x squared over L. Add every '
                            'molecule, share the motion among three directions, and divide by the area: the pressure is one third'
                            ' rho v r m s squared.') as vo:
            self.play(Write(e1), run_time=1.5)
            self.wait(vo.duration * 0.15)
            self.play(Write(e2), run_time=1.0)
            self.wait(vo.duration * 0.15)
            self.play(Write(e3), Create(b3), run_time=1.3)

        with self.voiceover("Compare with p V equals N k T. Each molecule's average kinetic energy is three halves k T. "
                            'Temperature measures random kinetic energy, the same for every gas.') as vo:
            self.play(FadeOut(e1), FadeOut(e2), VGroup(e3, b3).animate.scale(0.75).move_to(P(col_x, 2.5)),
                      run_time=0.6)
            g = M(r"pV = Nk_BT", 44).move_to(P(col_x, 1.3))
            k = M(r"\tfrac12 m\overline{v^2} = \tfrac32 k_BT", 52, color=HOT).move_to(P(col_x, 0.0))
            kb = SurroundingRectangle(k, buff=0.2, corner_radius=0.12, color=HOT, stroke_width=3)
            cap = T("temperature = average random KE", 24, color=MUTED).next_to(kb, DOWN, buff=0.3)
            fit(cap, 6.0)
            self.play(Write(g), run_time=1.0)
            self.wait(vo.duration * 0.1)
            self.play(Write(k), Create(kb), run_time=1.3)
            self.play(FadeIn(cap), run_time=0.6)

        with self.voiceover('So v r m s is root three R T over M: about four hundred and eighty four metres per second for oxygen'
                            ' at three hundred kelvin. Doubling the speed takes four times the temperature.') as vo:
            v = M(r"v_{\text{rms}} = \sqrt{\frac{3RT}{M}}", 48).move_to(P(col_x, -2.0))
            o2 = M(r"\mathrm{O_2},\ 300\ \mathrm{K}: \ \approx 484\ \mathrm{m/s}", 36, color=GREEN)
            o2.next_to(v, DOWN, buff=0.3)
            self.play(Write(v), run_time=1.2)
            self.play(Write(o2), run_time=1.0)
            self.wait(vo.duration * 0.1)
            q = M(r"T \times 4 \;\Rightarrow\; v_{\text{rms}} \times 2", 40, color=HOT)
            q.next_to(box, UP, buff=0.15)
            self.play(FadeIn(q), mols.animate.set_color(HOT), sp.animate.set_value(2.0), run_time=1.2)

    # ------------------------------------------------------------ scene 7: equipartition
    def s7(self):
        hdr = title_bar("Degrees of freedom and equipartition")
        he_c = P(-3.6, 0.4)
        n2_c = P(2.6, 0.4)
        he = Circle(radius=0.45, color=INK, stroke_width=3).set_fill(COLD, 1).move_to(he_c)
        a1 = Circle(radius=0.4, color=INK, stroke_width=3).set_fill(ALT, 1).move_to(n2_c + 0.75 * LEFT)
        a2 = Circle(radius=0.4, color=INK, stroke_width=3).set_fill(ALT, 1).move_to(n2_c + 0.75 * RIGHT)
        bond = Line(a1.get_center(), a2.get_center(), color=INK, stroke_width=8)
        n2 = VGroup(bond, a1, a2)
        hel = T("helium", 28).next_to(he, DOWN, buff=1.3)
        n2l = T("nitrogen", 28).next_to(n2, DOWN, buff=1.3).align_to(hel, DOWN)
        rot = Arc(radius=1.5, start_angle=20 * DEGREES, angle=140 * DEGREES, arc_center=n2_c, color=HEAT,
                  stroke_width=4).add_tip(tip_length=0.22)
        spin = T("can also spin", 24, color=HEAT).next_to(rot, UP, buff=0.1)
        more = M(r"Q_{\mathrm{N_2}} \approx 1.67\,Q_{\mathrm{He}}", 40, color=HOT).move_to(P(0, -2.7))
        with self.voiceover('Heating a mole of nitrogen by one kelvin takes about two thirds more heat than helium. The dumbbell '
                            'shaped nitrogen molecule can also spin.') as vo:
            self.play(FadeIn(hdr), FadeIn(he), FadeIn(hel), FadeIn(n2), FadeIn(n2l), run_time=0.9)
            self.wait(vo.duration * 0.2)
            self.play(Write(more), run_time=1.0)
            self.wait(vo.duration * 0.15)
            self.play(Create(rot), FadeIn(spin), run_time=1.0)

        with self.voiceover('Count degrees of freedom, f: three for a single atom, five for a rigid diatomic, which adds two '
                            'rotations. Equipartition gives each one half k T on average.') as vo:
            self.play(FadeOut(more), FadeOut(spin), run_time=0.4)

            def trans(c, s=1.1):
                return VGroup(vec(c + 0.5 * RIGHT, c + (0.5 + s) * RIGHT, SECONDARY, sw=4),
                              vec(c + 0.5 * UP, c + (0.5 + s * 0.8) * UP, SECONDARY, sw=4),
                              vec(c + 0.4 * DL, c + (0.4 + s * 0.6) * DL, SECONDARY, sw=4))

            th = trans(he_c)
            tn = VGroup(vec(n2_c + 1.5 * RIGHT, n2_c + 2.3 * RIGHT, SECONDARY, sw=4),
                        vec(n2_c + 0.45 * UP, n2_c + 1.15 * UP, SECONDARY, sw=4),
                        vec(n2_c + 0.5 * DL, n2_c + 1.05 * DL, SECONDARY, sw=4))
            rot2 = DashedVMobject(Ellipse(width=2.9, height=0.75, color=HEAT, stroke_width=4), num_dashes=30)
            rot2.move_to(n2_c)
            fh = M(r"f = 3", 48, color=COLD).next_to(hel, DOWN, buff=0.25)
            fn = M(r"f = 3 + 2 = 5", 48, color=ALT).next_to(n2l, DOWN, buff=0.25)
            self.play(LaggedStart(*[GrowArrow(a) for a in th], lag_ratio=0.3), run_time=1.0)
            self.play(Write(fh), run_time=0.7)
            self.wait(vo.duration * 0.1)
            self.play(LaggedStart(*[GrowArrow(a) for a in tn], lag_ratio=0.3), run_time=0.8)
            self.play(rot.animate.set_color(HEAT), Create(rot2), run_time=0.6)
            self.play(Write(fn), run_time=0.8)
            ep = M(r"\tfrac12 k_BT \text{ per degree of freedom}", 40, color=HOT).move_to(P(0, -3.2))
            self.play(Write(ep), run_time=1.0)

        with self.voiceover('So U is f over two n R T, C V is f over two R, C p is C V plus R, and gamma is one plus two over f: '
                            'five thirds for helium, seven fifths for nitrogen.') as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hdr], run_time=0.5)
            rows = VGroup(
                M(r"U = \frac f2\,nRT", 50),
                M(r"C_V = \frac f2\,R", 50),
                M(r"C_p = C_V + R", 50),
                M(r"\gamma = \frac{C_p}{C_V} = 1 + \frac2f", 50),
            ).arrange(DOWN, buff=0.35, aligned_edge=LEFT).move_to(P(-3.0, -0.2))
            tab = VGroup(
                M(r"\mathrm{He}:\ f = 3,\ \gamma = \tfrac53", 42, color=COLD),
                M(r"\mathrm{N_2}:\ f = 5,\ \gamma = \tfrac75", 42, color=ALT),
            ).arrange(DOWN, buff=0.5, aligned_edge=LEFT).move_to(P(3.4, -0.2))
            self.play(Write(rows[0]), run_time=0.9)
            self.play(Write(rows[1]), run_time=0.9)
            self.wait(vo.duration * 0.1)
            self.play(Write(rows[2]), run_time=0.9)
            self.play(Write(rows[3]), run_time=1.1)
            self.play(FadeIn(tab[0], shift=0.15 * UP), run_time=0.6)
            self.play(FadeIn(tab[1], shift=0.15 * UP), run_time=0.6)

        with self.voiceover('For a mixture, add heat capacities, never gammas. A mole each of helium and oxygen gives C V of two '
                            'R, C p of three R, and gamma of one point five.') as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not hdr], run_time=0.5)
            m1 = M(r"C_V = \frac{1\cdot\tfrac32 R + 1\cdot\tfrac52 R}{2} = 2R", 50).move_to(P(0, 1.4))
            m2 = M(r"C_p = 2R + R = 3R", 50).next_to(m1, DOWN, buff=0.45)
            m3 = M(r"\gamma = \frac{3R}{2R} = 1.5", 56, color=GREEN).next_to(m2, DOWN, buff=0.45)
            bad = M(r"\tfrac12\left(\tfrac53 + \tfrac75\right) \approx 1.53", 40, color=WARN).move_to(P(-1.2, -2.9))
            xm = cross_mark().scale(0.8).next_to(bad, RIGHT, buff=0.3)
            self.play(Write(m1), run_time=1.5)
            self.play(Write(m2), run_time=1.0)
            self.play(Write(m3), run_time=1.0)
            self.wait(vo.duration * 0.05)
            self.play(FadeIn(bad), FadeIn(xm), run_time=0.6)

    # ------------------------------------------------------------ scene 8: recap
    def s8(self):
        title = T("Chapter 4 in six lines", 38, color=PRIMARY, weight="BOLD").move_to(P(0, 3.2))
        lines = [
            (r"t = 100\,\frac{X - X_0}{X_{100} - X_0}", "zeroth law, two fixed points"),
            (r"\Delta L = L\alpha\Delta T,\ \ \beta = 2\alpha,\ \gamma = 3\alpha", "holes expand too"),
            (r"Q = mc\,\Delta T \ \text{ or } \ mL", "check the ice first"),
            (r"H = \frac{\Delta T}{R},\ \ R = \frac{L}{kA}", "resistances add in series"),
            (r"P = e\sigma AT^4,\ \ \lambda_m T = b", "small excess cools exponentially"),
            (r"\tfrac12 m\overline{v^2} = \tfrac32 k_BT,\ \ U = \tfrac f2 nRT", "half kT per degree of freedom"),
        ]
        rows = VGroup()
        for i, (tex, note) in enumerate(lines):
            m = fit(M(tex, 34), 6.6)
            nt = T(note, 24, color=MUTED)
            num = T(f"{i + 1}.", 26, color=PRIMARY, weight="BOLD")
            rows.add(VGroup(num, m, nt))
        for r in rows:
            r[0].move_to(P(-6.2, 0))
            r[1].next_to(r[0], RIGHT, buff=0.3)
        rows.arrange(DOWN, buff=0.28, aligned_edge=LEFT).move_to(P(0, -0.15))
        rows.shift((-6.4 - rows.get_left()[0]) * RIGHT)
        for r in rows:
            r[2].move_to(P(0, r[1].get_y()))
            r[2].align_to(P(1.2, 0), LEFT)
        with self.voiceover('To recap. The zeroth law makes temperature measurable, and every length grows by alpha delta T, '
                            'holes included.') as vo:
            self.play(FadeIn(title), run_time=0.6)
            self.play(FadeIn(rows[0], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.25)
            self.play(FadeIn(rows[1], shift=0.15 * UP), run_time=0.7)
        with self.voiceover("Heat lost equals heat gained, after checking the ice. Conduction follows Ohm's law, radiation goes "
                            'as T to the fourth, and small differences cool exponentially.') as vo:
            self.play(FadeIn(rows[2], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(rows[3], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(rows[4], shift=0.15 * UP), run_time=0.7)
        with self.voiceover('And temperature is molecular kinetic energy: one half k T for every degree of freedom.') as vo:
            self.play(FadeIn(rows[5], shift=0.15 * UP), run_time=0.7)
        with self.voiceover('Try the mastery quiz. Then chapter five does the energy book keeping: heat, work and the first law, '
                            'as areas on a pressure volume diagram.') as vo:
            nxt = T("Next: Chapter 5 · Thermodynamics", 32, color=PRIMARY).move_to(P(0, -3.45))
            self.wait(vo.duration * 0.3)
            self.play(FadeIn(nxt, shift=0.2 * UP), run_time=0.8)
