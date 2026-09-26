import sys; from pathlib import Path; sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib")); from manim import *; from strawberry import *

from contextlib import contextmanager

import numpy as np

# Private LaTeX dir: the shared media/Tex dir races with other chapter renders.
_TEX = Path(__file__).resolve().parent.parent / "build" / "tex-calc-1-limits"
_TEX.mkdir(parents=True, exist_ok=True)
config.tex_dir = str(_TEX)

# Script colour roles mapped onto the light Strawberry palette.
CURVE = SECONDARY      # main curve (script: BLUE_C)
HL = ACCENT            # highlight (script: YELLOW)
LEFTC = GREEN          # approach / from-the-left (script: GREEN)
RIGHTC = PURPLE        # from-the-right (script: ORANGE)
BAD = PRIMARY          # value at the point / failure (script: RED)


class CalcCh1Video(NarratedScene):
    # ------------------------------------------------------------------ helpers
    def setup(self):
        super().setup()
        Line.set_default(color=INK)
        Dot.set_default(color=INK)
        DecimalNumber.set_default(color=INK)

    @contextmanager
    def beat(self, text):
        with self.voiceover(text) as vo:
            vo.t0 = self.renderer.time
            vo.text = text
            yield vo

    def sync(self, vo, phrase, lead=0.0):
        """Wait until roughly when `phrase` is spoken in this beat."""
        idx = vo.text.index(phrase)
        target = vo.t0 + vo.duration * idx / len(vo.text) - lead
        rem = target - self.renderer.time
        if rem > 0.05:
            self.wait(rem)

    def left(self, vo):
        return max(0.1, vo.t0 + vo.duration - self.renderer.time)

    def tag(self, s):
        t = Text(s, font_size=24, color=MUTED)
        t.to_corner(UL, buff=0.35)
        self.play(FadeIn(t), run_time=0.5)
        return t

    def axes(self, xr, yr, xl, yl, nums=True, xdec=0, ydec=0, fs=22, xnums=True, ynums=True):
        ax = Axes(
            x_range=xr, y_range=yr, x_length=xl, y_length=yl, tips=False,
            axis_config={"color": INK, "stroke_width": 2, "include_tip": False},
            x_axis_config={"include_numbers": nums and xnums, "font_size": fs,
                           "decimal_number_config": {"num_decimal_places": xdec, "color": INK}},
            y_axis_config={"include_numbers": nums and ynums, "font_size": fs,
                           "decimal_number_config": {"num_decimal_places": ydec, "color": INK}},
        )
        return ax

    def hole(self, p, color=CURVE):
        return Circle(radius=0.08, stroke_width=3, color=color, fill_color=BG, fill_opacity=1).move_to(p)

    def dot(self, p, color=INK, r=0.08):
        return Dot(p, radius=r, color=color)

    def strike(self, mob, color=BAD):
        return Line(mob.get_corner(DL) + 0.05 * DL, mob.get_corner(UR) + 0.05 * UR, color=color, stroke_width=4)

    def grid(self, rows, col_x, dy=0.45, fs=28, colors=None):
        g = VGroup()
        for i, row in enumerate(rows):
            r = VGroup()
            for j, s in enumerate(row):
                m = MathTex(s, font_size=fs)
                if colors and colors[j]:
                    m.set_color(colors[j])
                m.move_to([col_x[j], -i * dy, 0])
                r.add(m)
            g.add(r)
        return g

    def jump_graph(self):
        ax = self.axes([-2, 4, 1], [-1, 5, 1], 6.5, 4)
        lp = ax.plot(lambda x: x + 1, x_range=[-2, 1], color=LEFTC, stroke_width=4)
        rp = ax.plot(lambda x: 4 - x, x_range=[1, 4], color=RIGHTC, stroke_width=4)
        h = self.hole(ax.c2p(1, 2), LEFTC)
        d = self.dot(ax.c2p(1, 3), RIGHTC)
        g = VGroup(ax, lp, rp, h, d)
        return g

    # ------------------------------------------------------------------ construct
    def construct(self):
        self.title_card("Calculus", "Limits: The Art of Getting Close",
                        "Chapter one. Limits: the art of getting close.")
        self.scene1()
        self.scene2()
        self.scene3()
        self.scene4()
        self.scene5()
        self.scene6()
        self.scene7()
        self.scene8()
        self.scene9()
        self.scene10()
        self.scene11()
        self.scene12()

    # ------------------------------------------------------------------ 1
    def scene1(self):
        tag = self.tag("1.1 · The instant problem")
        road = Line([-6.5, -1.2, 0], [6.5, -1.2, 0], color=MUTED, stroke_width=4)
        body = RoundedRectangle(corner_radius=0.2, width=2, height=0.7, color=PRIMARY,
                                fill_color=PRIMARY, fill_opacity=1)
        cabin = RoundedRectangle(corner_radius=0.15, width=1.1, height=0.45, color=PRIMARY,
                                 fill_color=PRIMARY, fill_opacity=0.75).next_to(body, UP, buff=-0.05).shift(0.1 * LEFT)
        w1 = Circle(radius=0.25, color=INK, fill_color=INK, fill_opacity=1).move_to(body.get_bottom() + LEFT * 0.55)
        w2 = w1.copy().move_to(body.get_bottom() + RIGHT * 0.55)
        car = VGroup(cabin, body, w1, w2)
        car.move_to([-4.5, 0, 0]).align_to(road, DOWN).shift(UP * 0.25)
        pole = Line([3.8, -1.2, 0], [3.8, 0.9, 0], color=INK, stroke_width=5)
        cam = VGroup(
            RoundedRectangle(corner_radius=0.08, width=0.8, height=0.45, color=INK, fill_color=INK, fill_opacity=1),
            Circle(radius=0.12, color=HL, fill_color=HL, fill_opacity=1).shift(LEFT * 0.4),
        ).move_to([3.8, 1.1, 0])
        camera_grp = VGroup(pole, cam)
        text = ("A speed camera snaps your car. The ticket says sixty two kilometres per hour. "
                "How can a car have a speed at a single instant?")
        with self.beat(text) as vo:
            self.play(Create(road), FadeIn(car), FadeIn(camera_grp), run_time=1.0)
            self.play(car.animate.shift(RIGHT * 4), run_time=1.5, rate_func=linear)
            flash = Rectangle(width=16, height=10, stroke_width=0, fill_color=WHITE, fill_opacity=0.9)
            self.add(flash)
            self.play(flash.animate.set_fill(opacity=0), run_time=0.5)
            self.remove(flash)
            self.sync(vo, "The ticket")
            lab = Text("62 km/h", font_size=40, color=PRIMARY, weight="BOLD").next_to(car, UP, buff=0.5)
            box = SurroundingRectangle(lab, color=HL, buff=0.15, corner_radius=0.1)
            self.play(FadeIn(lab, shift=0.2 * UP), Create(box), run_time=0.8)
            self.sync(vo, "How can")
            q = MathTex(r"\text{speed} = \frac{\text{distance}}{\text{time}}", font_size=40).move_to([-3.5, -2.6, 0])
            q2 = MathTex(r"\text{time} = 0\ ?", font_size=40, color=BAD).next_to(q, RIGHT, buff=0.8)
            self.play(Write(q), run_time=1.2)
            self.play(FadeIn(q2), run_time=0.6)
        self.play(FadeOut(VGroup(road, car, camera_grp, lab, box, q, q2)), run_time=0.5)

        text = ("Chapter zero hit this wall: push two points on x squared together, "
                "and the slope becomes zero over zero.")
        with self.beat(text) as vo:
            eq = MathTex(r"\frac{f(2) - f(2)}{2 - 2}", "=", r"\frac{0}{0}", font_size=60).shift(UP * 0.5)
            self.play(Write(eq), run_time=vo.duration * 0.45)
            self.play(Indicate(eq[2], color=BAD, scale_factor=1.4), run_time=1.0)
            eq[2].set_color(BAD)
            ask = Text("What value are we closing in on?", font_size=32, color=HL).next_to(eq, DOWN, buff=0.8)
            self.play(Write(ask), run_time=1.2)
        self.wait(0.3)
        self.clear_scene()

    # ------------------------------------------------------------------ 2
    def scene2(self):
        tag = self.tag("1.1 · The idea of a limit")
        ax = self.axes([-1, 5, 1], [0, 8, 1], 6, 4.5, fs=22).shift(LEFT * 2.5 + DOWN * 0.6)
        labels = ax.get_axis_labels(MathTex("x", font_size=30), MathTex("y", font_size=30))
        fx = MathTex(r"f(x) = \frac{x^2 - 4}{x - 2}", font_size=40).move_to([-2.5, 2.75, 0])
        line = ax.plot(lambda x: x + 2, x_range=[-1, 5], color=CURVE, stroke_width=4)
        vline = DashedLine(ax.c2p(2, 0), ax.c2p(2, 8), color=MUTED, dash_length=0.1)
        hole = self.hole(ax.c2p(2, 4))
        text = ("f of x equals x squared minus four, over x minus two. Plugging in two gives zero over zero, "
                "so sneak up on two from both sides.")
        with self.beat(text) as vo:
            self.play(Write(fx), run_time=1.5)
            self.play(Create(ax), FadeIn(labels), run_time=1.5)
            self.play(Create(line), run_time=1.2)
            self.sync(vo, "Plugging")
            zz = MathTex(r"f(2) = \frac{0}{0}", font_size=36, color=BAD).move_to([3.8, 2.75, 0])
            self.play(Create(vline), FadeIn(hole), FadeIn(zz), run_time=1.0)
            self.sync(vo, "so sneak")
            self.play(FadeOut(zz), run_time=0.5)

        tl = ValueTracker(1.0)
        tr = ValueTracker(3.0)
        dl = always_redraw(lambda: self.dot(ax.c2p(tl.get_value(), tl.get_value() + 2), LEFTC))
        dr = always_redraw(lambda: self.dot(ax.c2p(tr.get_value(), tr.get_value() + 2), LEFTC))

        def block(header, color, rows, top):
            h = Text(header, font_size=26, color=color)
            body = self.grid([["x", "f(x)"]] + rows, [0, 1.8], dy=0.45, fs=28)
            body[0].set_color(MUTED)
            h.move_to([3.9, top, 0])
            body.move_to([3.9, top - 0.5, 0], aligned_edge=UP)
            return h, body

        lh, lb = block("from the left", LEFTC, [["1.9", "3.9"], ["1.99", "3.99"], ["1.999", "3.999"]], 2.9)
        rh, rb = block("from the right", RIGHTC, [["2.1", "4.1"], ["2.01", "4.01"], ["2.001", "4.001"]], 0.3)
        text = ("From the left: three point nine, three point nine nine. From the right: four point one, "
                "four point zero one. Both sides close in on four.")
        with self.beat(text) as vo:
            self.add(dl)
            self.play(FadeIn(lh), FadeIn(lb[0]), tl.animate.set_value(1.8), run_time=1.2)
            for r in lb[1:]:
                self.play(FadeIn(r, shift=0.1 * LEFT), run_time=0.45)
            self.sync(vo, "From the right")
            self.add(dr)
            self.play(FadeIn(rh), FadeIn(rb[0]), tr.animate.set_value(2.2), run_time=1.2)
            for r in rb[1:]:
                self.play(FadeIn(r, shift=0.1 * LEFT), run_time=0.45)
            self.sync(vo, "Both sides")
            a1 = Arrow(dl.get_center(), hole.get_center(), buff=0.1, color=LEFTC, stroke_width=3,
                       max_tip_length_to_length_ratio=0.45, tip_length=0.12)
            a2 = Arrow(dr.get_center(), hole.get_center(), buff=0.1, color=LEFTC, stroke_width=3,
                       max_tip_length_to_length_ratio=0.45, tip_length=0.12)
            self.play(GrowArrow(a1), GrowArrow(a2), run_time=0.6)
            self.play(Indicate(hole, color=HL, scale_factor=2.0), run_time=1.0)

        text = ("There's a hole at two, but the limit is four: the value f of x closes in on as x approaches "
                "the point a, from both sides, without x ever equalling a.")
        with self.beat(text) as vo:
            self.play(FadeOut(VGroup(lh, lb, rh, rb)), run_time=0.6)
            defn = VGroup(
                Tex(r"\textbf{Limit (informal):} the value $f(x)$", font_size=28),
                Tex(r"closes in on as $x \to a$, from both sides,", font_size=28),
                Tex(r"never equal to $a$", font_size=28),
            ).arrange(DOWN, aligned_edge=LEFT, buff=0.15).move_to([3.9, -1.1, 0])
            dbox = SurroundingRectangle(defn, color=HL, buff=0.15)
            lim = MathTex(r"\lim_{x \to 2} \frac{x^2 - 4}{x - 2} =", "4", font_size=44).move_to([3.9, 1.3, 0])
            lim[1].set_color(HL)
            self.play(Write(lim), run_time=1.5)
            self.play(Circumscribe(hole, color=HL, shape=Circle), run_time=1.0)
            self.sync(vo, "the value f")
            self.play(FadeIn(defn), Create(dbox), run_time=1.2)
        self.play(FadeOut(VGroup(ax, labels, fx, line, vline, hole, dl, dr, a1, a2, defn, dbox, lim)), run_time=0.6)

        text = ("Tables work where plugging in can't. As x approaches zero, the sine of x, divided by x, "
                "in radians, squeezes in on one.")
        with self.beat(text) as vo:
            title = MathTex(r"\lim_{x \to 0} \frac{\sin x}{x} =", r"\,?", font_size=44).move_to([0, 2.9, 0])
            rad = Text("x in radians", font_size=22, color=MUTED).next_to(title, DOWN, buff=0.2)
            head = self.grid([["x", r"\frac{\sin x}{x}"]], [-1.4, 1.4], fs=30)
            head.set_color(MUTED)
            rows = self.grid([["-0.5", "0.9589"], ["-0.1", "0.9983"], ["-0.01", "0.99998"],
                              ["0.01", "0.99998"], ["0.1", "0.9983"], ["0.5", "0.9589"]],
                             [-1.4, 1.4], dy=0.48, fs=30)
            head.move_to([0, 1.35, 0])
            rows.move_to([0, 0.8, 0], aligned_edge=UP)
            rule = Line([-2.4, 0.95, 0], [2.4, 0.95, 0], color=GRID, stroke_width=2)
            self.play(Write(title), FadeIn(rad), run_time=1.2)
            self.play(FadeIn(head), Create(rule), run_time=0.5)
            for r in rows:
                self.play(FadeIn(r, shift=0.1 * UP), run_time=min(0.45, vo.duration * 0.05))
            self.sync(vo, "squeezes")
            mid = VGroup(rows[2], rows[3])
            glow = SurroundingRectangle(mid, color=HL, buff=0.12)
            one = MathTex("1", font_size=44, color=HL).move_to(title[1]).align_to(title[1], DOWN)
            self.play(mid.animate.set_color(HL), Create(glow), run_time=0.7)
            self.play(Transform(title[1], one), run_time=0.8)
        self.wait(0.3)
        self.clear_scene()

    # ------------------------------------------------------------------ 3
    def scene3(self):
        self.tag("1.2 · Limits don't care about the point")
        ax = self.axes([-1, 5, 1], [0, 8, 1], 6, 4.5, fs=22).shift(LEFT * 2.5 + DOWN * 0.6)
        labels = ax.get_axis_labels(MathTex("x", font_size=30), MathTex("y", font_size=30))
        line = ax.plot(lambda x: x + 2, x_range=[-1, 5], color=CURVE, stroke_width=4)
        hole = self.hole(ax.c2p(2, 4))
        g = MathTex(r"g(x) = \begin{cases} \dfrac{x^2 - 4}{x - 2} & x \ne 2 \\ 1 & x = 2 \end{cases}",
                    font_size=36).move_to([3.7, 2.3, 0])
        red = self.dot(ax.c2p(2, 1), BAD, r=0.1)
        rlab = always_redraw(lambda: MathTex(r"g(2)=1", font_size=26, color=BAD).next_to(red, RIGHT, buff=0.15))
        text = ("Here's the key misconception: the limit ignores the value at the point. "
                "Give this function the value one at two.")
        with self.beat(text) as vo:
            self.play(Create(ax), FadeIn(labels), run_time=1.2)
            self.play(Create(line), FadeIn(hole), run_time=1.0)
            self.sync(vo, "Give this")
            self.play(Write(g), run_time=1.5)
            self.play(FadeIn(red, shift=DOWN), run_time=0.7)
            self.play(FadeIn(rlab), run_time=0.4)

        tl = ValueTracker(0.6)
        tr = ValueTracker(3.4)
        dl = always_redraw(lambda: self.dot(ax.c2p(tl.get_value(), tl.get_value() + 2), LEFTC))
        dr = always_redraw(lambda: self.dot(ax.c2p(tr.get_value(), tr.get_value() + 2), LEFTC))
        l1 = MathTex(r"\lim_{x \to 2} g(x) =", "4", font_size=38).move_to([3.7, 0.2, 0])
        l1[1].set_color(GREEN)
        l2 = MathTex(r"\text{but}\quad g(2) =", "1", font_size=38).next_to(l1, DOWN, buff=0.45)
        l2[1].set_color(BAD)
        text = "The outputs still march to four. The limit is four; g of two is one. Move the dot anywhere; the limit stays four."
        with self.beat(text) as vo:
            self.add(dl, dr)
            self.play(tl.animate.set_value(1.85), tr.animate.set_value(2.15), run_time=vo.duration * 0.3)
            self.play(Indicate(hole, color=HL, scale_factor=2.0), run_time=0.8)
            self.sync(vo, "The limit is four")
            self.play(Write(l1), run_time=1.0)
            self.play(Write(l2), run_time=1.0)
            self.sync(vo, "Move the dot")
            self.remove(rlab)
            rlab2 = MathTex(r"g(2)=100", font_size=26, color=BAD)
            up = Arrow(ax.c2p(2, 7.9) + UP * 0.05, ax.c2p(2, 7.9) + UP * 0.75, buff=0, color=BAD,
                       stroke_width=4, max_tip_length_to_length_ratio=0.35)
            self.play(red.animate.move_to(ax.c2p(2, 7.9)), run_time=1.2)
            rlab2.next_to(red, RIGHT, buff=0.15)
            new1 = MathTex("100", font_size=38, color=BAD).move_to(l2[1], aligned_edge=LEFT)
            self.play(FadeIn(rlab2), GrowArrow(up), Transform(l2[1], new1), run_time=0.8)
            self.play(Indicate(l1[1], color=GREEN, scale_factor=1.5), run_time=1.0)
        self.wait(0.2)
        self.clear_scene()

        self.tag("1.2 · Limits don't care about the point")
        panels = VGroup()
        caps = ["Nice point", "Hole", "Relocated dot"]
        rows = [r"f(a)=4,\ \lim=4", r"f(a)\ \text{undefined},\ \lim=4", r"f(a)=1,\ \lim=4"]
        for i in range(3):
            a = self.axes([0, 4, 1], [0, 6, 2], 3.5, 2.6, fs=20)
            a.move_to([(i - 1) * 4.4, 0.1, 0])
            items = VGroup(a)
            if i == 0:
                items.add(a.plot(lambda x: x ** 2, x_range=[0, 2.4], color=CURVE, stroke_width=4))
                items.add(self.dot(a.c2p(2, 4), CURVE))
            else:
                items.add(a.plot(lambda x: x + 2, x_range=[0, 3.5], color=CURVE, stroke_width=4))
                items.add(self.hole(a.c2p(2, 4)))
                if i == 2:
                    items.add(self.dot(a.c2p(2, 1), BAD))
            cap = Text(caps[i], font_size=26).next_to(a, UP, buff=0.35)
            row = MathTex(rows[i], font_size=28).next_to(a, DOWN, buff=0.45)
            panels.add(VGroup(cap, items, row))
        text = "Three situations: a nice point, a hole, and a relocated dot."
        with self.beat(text) as vo:
            for key, p in zip(["a nice", "a hole", "a relocated"], panels):
                self.sync(vo, key, lead=0.3)
                self.play(FadeIn(p[0]), Create(p[1]), run_time=0.8)
                self.play(FadeIn(p[2]), run_time=0.4)
        self.wait(1.0)
        self.clear_scene()

    # ------------------------------------------------------------------ 4
    def scene4(self):
        self.tag("1.3 · One-sided limits")
        ax = self.axes([0, 2, 0.5], [0, 100, 20], 6, 3.5, xdec=1, fs=22).move_to([0, -0.4, 0])
        xl = Text("hours", font_size=22).next_to(ax.x_axis, RIGHT, buff=0.2)
        yl = Text("price (₹)", font_size=22).next_to(ax.y_axis, UP, buff=0.2)
        low = Line(ax.c2p(0, 50), ax.c2p(1, 50), color=LEFTC, stroke_width=5)
        high = Line(ax.c2p(1, 80), ax.c2p(2, 80), color=RIGHTC, stroke_width=5)
        h = self.hole(ax.c2p(1, 50), LEFTC)
        d = self.dot(ax.c2p(1, 80), RIGHTC)
        ga = Arrow(ax.c2p(0.35, 50) + UP * 0.3, ax.c2p(0.9, 50) + UP * 0.3, buff=0, color=LEFTC, stroke_width=4)
        gl = MathTex("50", font_size=30, color=LEFTC).next_to(ga, UP, buff=0.1)
        oa = Arrow(ax.c2p(1.65, 80) + UP * 0.3, ax.c2p(1.1, 80) + UP * 0.3, buff=0, color=RIGHTC, stroke_width=4)
        ol = MathTex("80", font_size=30, color=RIGHTC).next_to(oa, UP, buff=0.1)
        vl = DashedLine(ax.c2p(1, 0), ax.c2p(1, 100), color=MUTED, dash_length=0.1)
        text = "A parking garage charges fifty rupees up to an hour, then eighty. At the hour mark, direction matters."
        with self.beat(text) as vo:
            self.play(Create(ax), FadeIn(xl), FadeIn(yl), run_time=1.2)
            self.play(Create(low), FadeIn(h), run_time=0.8)
            self.sync(vo, "then eighty")
            self.play(Create(high), FadeIn(d), run_time=0.8)
            self.sync(vo, "At the hour")
            self.play(Create(vl), GrowArrow(ga), FadeIn(gl), run_time=0.8)
            self.play(GrowArrow(oa), FadeIn(ol), run_time=0.8)
        self.play(FadeOut(VGroup(ax, xl, yl, low, high, h, d, ga, gl, oa, ol, vl)), run_time=0.5)

        n1 = MathTex(r"\lim_{x \to a^-} f(x)", font_size=40, color=LEFTC)
        n2 = MathTex(r"\lim_{x \to a^+} f(x)", font_size=40, color=RIGHTC)
        notation = VGroup(n1, n2).arrange(RIGHT, buff=1.2).move_to([0, 2.85, 0])
        jg = self.jump_graph().move_to([-2.6, -0.7, 0])
        ax2 = jg[0]
        tl = ValueTracker(-1.5)
        tr = ValueTracker(3.5)
        dl = always_redraw(lambda: self.dot(ax2.c2p(tl.get_value(), tl.get_value() + 1), LEFTC, r=0.1))
        dr = always_redraw(lambda: self.dot(ax2.c2p(tr.get_value(), 4 - tr.get_value()), RIGHTC, r=0.1))
        res = MathTex(r"\lim_{x \to 1^-} f(x) = 2", r"\qquad", r"\lim_{x \to 1^+} f(x) = 3", font_size=40).move_to([0, 2.85, 0])
        res[0].set_color(LEFTC)
        res[2].set_color(RIGHTC)
        fdef = MathTex(r"f(x) = \begin{cases} x + 1 & x < 1 \\ 4 - x & x \ge 1 \end{cases}", font_size=34).move_to([4.2, 1.2, 0])
        text = ("A small minus means from the left; a small plus, from the right. Along x plus one, the left heads to two. "
                "Along four minus x, the right heads to three.")
        with self.beat(text) as vo:
            self.play(Write(n1), run_time=0.9)
            self.sync(vo, "a small plus")
            self.play(Write(n2), run_time=0.9)
            self.sync(vo, "Along x plus", lead=0.5)
            self.play(Create(jg[0]), FadeIn(fdef), run_time=1.0)
            self.play(Create(jg[1]), FadeIn(jg[3]), run_time=0.7)
            self.add(dl)
            self.play(tl.animate.set_value(0.9), run_time=1.3)
            self.sync(vo, "Along four", lead=0.3)
            self.play(Create(jg[2]), FadeIn(jg[4]), run_time=0.7)
            self.add(dr)
            self.play(tr.animate.set_value(1.1), run_time=1.3)
            self.play(ReplacementTransform(notation, res), run_time=1.0)
        self.remove(dl, dr)
        self.add(jg)

        text = ("Both sides must agree for the two-sided limit to exist. Two is not three, so it does not. "
                "Not the average. And f of one is three: the value exists, the limit does not.")
        with self.beat(text) as vo:
            self.play(FadeOut(fdef), run_time=0.4)
            ne = MathTex(r"2 \ne 3", font_size=44).move_to([4.2, 1.4, 0])
            dne = MathTex(r"\lim_{x \to 1} f(x)\ \text{does not exist}", font_size=34, color=BAD).move_to([4.2, 0.5, 0])
            self.sync(vo, "Two is not")
            self.play(Write(ne), run_time=0.7)
            self.play(Write(dne), run_time=1.0)
            self.sync(vo, "Not the average")
            ghost = Text("2.5 (average)", font_size=28, color=MUTED).move_to([4.2, -0.5, 0])
            cross = Cross(ghost, stroke_color=BAD, stroke_width=5)
            self.play(FadeIn(ghost), run_time=0.4)
            self.play(Create(cross), run_time=0.5)
            self.play(FadeOut(ghost), FadeOut(cross), run_time=0.4)
            self.sync(vo, "And f of one")
            f13 = MathTex(r"f(1) = 3 \ \checkmark", font_size=36, color=RIGHTC).move_to([4.2, -0.6, 0])
            self.play(Indicate(jg[4], color=RIGHTC, scale_factor=1.6), FadeIn(f13), run_time=1.2)
        self.play(FadeOut(VGroup(jg, res, ne, dne, f13)), run_time=0.5)

        cases = MathTex(r"f(x) = \begin{cases} x^2 & x < 2 \\ 6 - x & x \ge 2 \end{cases}", font_size=36).move_to([-4.2, 1.8, 0])
        ax3 = self.axes([0, 4, 1], [0, 6, 1], 5.5, 4, fs=22).move_to([2.4, -0.4, 0])
        p1 = ax3.plot(lambda x: x ** 2, x_range=[0, 2], color=LEFTC, stroke_width=4)
        p2 = ax3.plot(lambda x: 6 - x, x_range=[2, 4], color=RIGHTC, stroke_width=4)
        meet = self.dot(ax3.c2p(2, 4), HL, r=0.11)
        e1 = MathTex(r"2^2 = 4 \qquad 6 - 2 = 4", font_size=36).move_to([-4.2, 0.1, 0])
        e2 = MathTex(r"\lim_{x \to 2} f(x) = 4", font_size=40, color=HL).move_to([-4.2, -1.2, 0])
        text = ("But a boundary isn't automatically a jump. x squared on the left and six minus x on the right "
                "both reach four at two. The limit is four.")
        with self.beat(text) as vo:
            self.play(Write(cases), Create(ax3), run_time=1.3)
            self.sync(vo, "x squared on")
            self.play(Create(p1), run_time=1.0)
            self.sync(vo, "six minus")
            self.play(Create(p2), run_time=1.0)
            self.sync(vo, "both reach")
            self.play(FadeIn(meet, scale=1.5), Write(e1), run_time=1.0)
            self.sync(vo, "The limit is")
            self.play(Write(e2), run_time=0.8)
        self.wait(0.3)
        self.clear_scene()

    # ------------------------------------------------------------------ 5
    def scene5(self):
        tag = self.tag("1.4 · When limits fail")
        cards = VGroup(*[Text(s, font_size=30) for s in ["1. Jump", "2. Blow-up", "3. Oscillation"]])
        cards.arrange(DOWN, aligned_edge=LEFT, buff=0.6).move_to([-5.2, 0.5, 0])
        hl = SurroundingRectangle(cards[0], color=HL, buff=0.15, corner_radius=0.08)
        thumb = self.jump_graph().scale(0.6).move_to([2.0, -0.2, 0])
        text = "Limits fail in exactly three ways. First, the jump, like the parking garage: each side settles, but on different values."
        with self.beat(text) as vo:
            self.play(LaggedStart(*[FadeIn(c, shift=0.2 * RIGHT) for c in cards], lag_ratio=0.3), run_time=1.5)
            self.sync(vo, "First")
            self.play(Create(hl), cards[0].animate.set_color(HL), run_time=0.6)
            self.play(FadeIn(thumb), run_time=0.8)
            self.sync(vo, "each side")
            self.play(Indicate(thumb[3], color=LEFTC, scale_factor=2.2), run_time=0.9)
            self.play(Indicate(thumb[4], color=RIGHTC, scale_factor=2.2), run_time=0.9)

        ax = self.axes([-3, 3, 1], [0, 20, 5], 6, 3.6, fs=22).move_to([2.0, -1.6, 0])
        f1 = VGroup(
            ax.plot(lambda x: 1 / x ** 2, x_range=[-3, -0.23], color=CURVE, stroke_width=4),
            ax.plot(lambda x: 1 / x ** 2, x_range=[0.23, 3], color=CURVE, stroke_width=4),
        )
        asym = DashedLine(ax.c2p(0, 0), ax.c2p(0, 20), color=BAD, dash_length=0.1)
        nums = VGroup(*[MathTex(s, font_size=36) for s in ["1", "4", "100", "10000"]]).arrange(RIGHT, buff=0.7)
        nums.move_to([2.0, 3.1, 0])
        xs = VGroup(*[MathTex(s, font_size=24, color=MUTED) for s in [r"x=1", r"x=\tfrac12", r"x=0.1", r"x=0.01"]])
        for n, x in zip(nums, xs):
            x.next_to(n, DOWN, buff=0.12)
        lim = MathTex(r"\lim_{x \to 0} \frac{1}{x^2} = \infty", font_size=36).move_to([2.0, 1.25, 0])
        note = Text("= a way of failing", font_size=24, color=BAD).next_to(lim, RIGHT, buff=0.3)
        text = ("Second, the blow-up. One over x squared near zero gives one, four, a hundred, ten thousand. "
                "Equals infinity names a failure, not a number. One over x is worse: its sides run to opposite infinities.")
        with self.beat(text) as vo:
            hl2 = SurroundingRectangle(cards[1], color=HL, buff=0.15, corner_radius=0.08)
            self.play(FadeOut(thumb), Transform(hl, hl2), cards[0].animate.set_color(INK),
                      cards[1].animate.set_color(HL), run_time=0.7)
            self.play(Create(ax), Create(asym), run_time=0.8)
            self.play(Create(f1), run_time=1.0)
            self.sync(vo, "gives one")
            for n, x in zip(nums, xs):
                self.play(FadeIn(n, scale=1.3), FadeIn(x), run_time=0.45)
            self.sync(vo, "Equals infinity")
            self.play(Write(lim), run_time=0.8)
            self.play(FadeIn(note), run_time=0.5)
            self.sync(vo, "One over x is")
            ax2 = self.axes([-3, 3, 1], [-7, 7, 7], 6, 3.6, fs=22).move_to([2.0, -1.6, 0])
            f2l = ax2.plot(lambda x: 1 / x, x_range=[-3, -0.15], color=LEFTC, stroke_width=4)
            f2r = ax2.plot(lambda x: 1 / x, x_range=[0.15, 3], color=RIGHTC, stroke_width=4)
            asym2 = DashedLine(ax2.c2p(0, -7), ax2.c2p(0, 7), color=BAD, dash_length=0.1)
            lim2 = MathTex(r"\lim_{x \to 0^-} \frac{1}{x} = -\infty", r"\qquad", r"\lim_{x \to 0^+} \frac{1}{x} = +\infty",
                           font_size=34).move_to([2.0, 1.25, 0])
            lim2[0].set_color(LEFTC)
            lim2[2].set_color(RIGHTC)
            self.play(FadeOut(VGroup(f1, asym, nums, xs, note)), ReplacementTransform(ax, ax2),
                      ReplacementTransform(lim, lim2), run_time=0.8)
            self.play(Create(asym2), Create(f2l), Create(f2r), run_time=1.3)

        W = ValueTracker(1.2)
        oax = self.axes([-1.2, 1.2, 0.4], [-1.5, 1.5, 0.5], 10, 5, xnums=False, ydec=1, fs=22).move_to([0, -0.3, 0])

        def osc():
            w = W.get_value()
            pts_all = VGroup()
            base = np.geomspace(0.003, 1.0, 4000)
            for s in (1, -1):
                xs_ = s * base * w
                us = xs_ / w * 1.2
                ys = np.sin(1 / xs_)
                pts = [oax.c2p(u, y) for u, y in zip(us, ys)]
                m = VMobject(stroke_color=CURVE, stroke_width=2.5)
                m.set_points_as_corners(pts)
                pts_all.add(m)
            return pts_all

        curve = always_redraw(osc)
        one = DashedLine(oax.c2p(-1.2, 1), oax.c2p(1.2, 1), color=HL, dash_length=0.12)
        mone = DashedLine(oax.c2p(-1.2, -1), oax.c2p(1.2, -1), color=HL, dash_length=0.12)
        wl = MathTex(r"\text{window: } |x| <", font_size=30)
        wn = DecimalNumber(1.2, num_decimal_places=3, font_size=30)
        wg = VGroup(wl, wn).arrange(RIGHT, buff=0.15).move_to([3.8, 2.85, 0])
        wn.add_updater(lambda m: m.set_value(W.get_value()).next_to(wl, RIGHT, buff=0.15))
        fl = MathTex(r"y = \sin\left(\tfrac{1}{x}\right)", font_size=36, color=CURVE).move_to([-3.6, 2.85, 0])
        text = ("Third, oscillation: the sine of the quantity one over x. As x shrinks, it swings ever faster "
                "between minus one and one, never settling.")
        with self.beat(text) as vo:
            hl3 = SurroundingRectangle(cards[2], color=HL, buff=0.15, corner_radius=0.08)
            self.play(Transform(hl, hl3), cards[1].animate.set_color(INK), cards[2].animate.set_color(HL), run_time=0.6)
            self.play(FadeOut(VGroup(cards, hl, tag, ax2, f2l, f2r, asym2, lim2)), run_time=0.6)
            self.play(Create(oax), FadeIn(fl), run_time=0.8)
            static = osc()
            self.play(Create(static), run_time=1.0)
            self.remove(static)
            self.add(curve)
            self.play(FadeIn(one), FadeIn(mone), FadeIn(wg), run_time=0.5)
            self.sync(vo, "As x shrinks")
            self.play(W.animate.set_value(0.02), run_time=min(3.5, max(2.0, self.left(vo) - 1.5)),
                      rate_func=lambda t: smooth(t))
            still = Text("still swinging from -1 to 1", font_size=28, color=HL).move_to([0, -3.35, 0])
            self.play(FadeIn(still), run_time=0.6)
        curve.clear_updaters()
        wn.clear_updaters()
        self.wait(0.3)
        self.clear_scene()

    # ------------------------------------------------------------------ 6
    def scene6(self):
        self.tag("1.5 · Limit laws and triage")
        laws = VGroup(
            MathTex(r"\lim\,[f+g] = L + M", font_size=40),
            MathTex(r"\lim\,[f-g] = L - M", font_size=40),
            MathTex(r"\lim\,[f \cdot g] = L \cdot M", font_size=40),
            MathTex(r"\lim\, c f = cL", font_size=40),
            MathTex(r"\lim \frac{f}{g} = \frac{L}{M},\ ", r"M \ne 0", font_size=40),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.35).move_to([0, -0.2, 0])
        laws[4][1].set_color(HL)
        given = MathTex(r"\lim f = L, \quad \lim g = M", font_size=34, color=MUTED).move_to([0, 3.0, 0])
        text = ("Limits respect arithmetic: sums, differences, products, multiples and quotients pass through, "
                "as long as the bottom limit isn't zero.")
        with self.beat(text) as vo:
            self.play(FadeIn(given), run_time=0.6)
            for key, row in zip(["sums", "differences", "products", "multiples", "quotients"], laws):
                self.sync(vo, key, lead=0.2)
                self.play(FadeIn(row, shift=0.2 * RIGHT), run_time=0.5)
            self.sync(vo, "as long as")
            self.play(Circumscribe(laws[4][1], color=HL), run_time=1.0)
        self.play(FadeOut(laws), FadeOut(given), run_time=0.5)

        text = ("Plug in first: x squared plus three x minus one, at two, is simply nine. A number is the answer. "
                "Nonzero over zero is a blow-up. Zero over zero means algebra needed.")
        with self.beat(text) as vo:
            pe = MathTex(r"\lim_{x \to 2} (x^2 + 3x - 1)", "=", r"2^2 + 3(2) - 1", "=", "9", font_size=40)
            pe[4].set_color(GREEN)
            self.play(Write(pe[0]), run_time=1.0)
            self.sync(vo, "at two")
            self.play(Write(pe[1:4]), run_time=1.0)
            self.play(Write(pe[4]), run_time=0.4)
            self.sync(vo, "A number is")
            self.play(FadeOut(pe), run_time=0.4)
            lefts = VGroup(MathTex(r"\text{a number}", font_size=38), MathTex(r"\frac{\text{nonzero}}{0}", font_size=38),
                           MathTex(r"\frac{0}{0}", font_size=38))
            rights = VGroup(Text("the limit, done", font_size=30, color=GREEN), Text("blow-up", font_size=30, color=BAD),
                            Text("algebra needed", font_size=30, color=HL))
            head = Text("Plug in, and you get...", font_size=30, color=MUTED).move_to([0, 2.5, 0])
            rowsg = VGroup()
            for i in range(3):
                y = 1.1 - i * 1.5
                lefts[i].move_to([-2.5, y, 0])
                rights[i].move_to([2.6, y, 0])
                ar = Arrow([-1.0, y, 0], [0.9, y, 0], buff=0, color=MUTED, stroke_width=4)
                rowsg.add(VGroup(lefts[i], ar, rights[i]))
            self.play(FadeIn(head), run_time=0.4)
            for key, r in zip(["A number is", "Nonzero", "Zero over zero means"], rowsg):
                self.sync(vo, key)
                self.play(FadeIn(r[0]), GrowArrow(r[1]), FadeIn(r[2], shift=0.2 * RIGHT), run_time=0.7)
        self.play(FadeOut(VGroup(head, rowsg)), run_time=0.5)

        expr = MathTex(r"\lim_{x \to 2} \frac{x^3 - 2x + 1}{x + 3}", font_size=52).move_to([-3.0, 0.2, 0])
        num = expr[0][6:13]
        den = expr[0][14:17]
        under = Line(den.get_corner(DL) + DOWN * 0.1, den.get_corner(DR) + DOWN * 0.1, color=GREEN, stroke_width=4)
        dnote = MathTex(r"2 + 3 = 5 \ne 0\ \checkmark", font_size=38, color=GREEN).move_to([2.8, -0.9, 0])
        nnote = MathTex(r"2^3 - 2(2) + 1 = 5", font_size=38).move_to([2.8, 1.2, 0])
        da = Arrow(under.get_right() + RIGHT * 0.1, dnote.get_left(), buff=0.15, color=GREEN, stroke_width=3)
        na = Arrow(num.get_right() + RIGHT * 0.1, nnote.get_left(), buff=0.15, color=INK, stroke_width=3)
        final = MathTex(r"\lim_{x \to 2} \frac{x^3 - 2x + 1}{x + 3}", "=", r"\frac{5}{5}", "=", "1", font_size=52).move_to([0, 0.2, 0])
        final[4].set_color(GREEN)
        text = "Try x cubed minus two x plus one, over x plus three, at two. Bottom five, safe. Top five too. The limit is one."
        with self.beat(text) as vo:
            self.play(Write(expr), run_time=1.5)
            self.sync(vo, "Bottom five")
            self.play(Create(under), GrowArrow(da), FadeIn(dnote), run_time=0.9)
            self.sync(vo, "Top five")
            self.play(GrowArrow(na), FadeIn(nnote), run_time=0.9)
            self.sync(vo, "The limit is")
            self.play(FadeOut(VGroup(under, da, dnote, na, nnote)), TransformMatchingShapes(expr, final), run_time=1.2)
        self.wait(0.4)
        self.clear_scene()

    # ------------------------------------------------------------------ 7
    def scene7(self):
        self.tag("1.6 · The zero over zero puzzle")
        e1 = MathTex(r"\lim_{x \to 2}", r"\frac{x^2 - 4}{x - 2}", font_size=54).move_to([0, 1.2, 0])
        e2 = MathTex(r"\lim_{x \to 2}", r"\frac{(x-2)(x+2)}{x - 2}", font_size=54).move_to([0, 1.2, 0])
        e3 = MathTex(r"= \lim_{x \to 2} (x + 2) =", "4", font_size=54).move_to([0, -1.0, 0])
        e3[1].set_color(HL)
        text = ("Zero over zero is a disguise. x squared minus four factors into x minus two, times x plus two. "
                "Cancel the shared factor, and x plus two goes to four.")
        with self.beat(text) as vo:
            self.play(Write(e1), run_time=1.2)
            zz = MathTex(r"\to \frac{0}{0}", font_size=44, color=BAD).next_to(e1, RIGHT, buff=0.5)
            self.play(FadeIn(zz), run_time=0.5)
            self.sync(vo, "factors into")
            self.play(FadeOut(zz), TransformMatchingShapes(e1, e2), run_time=1.2)
            self.sync(vo, "Cancel")
            top = e2[1][0:5]
            bot = e2[1][11:14]
            self.play(top.animate.set_color(BAD), bot.animate.set_color(BAD), run_time=0.5)
            s1, s2 = self.strike(top), self.strike(bot)
            self.play(Create(s1), Create(s2), run_time=0.6)
            self.play(VGroup(top, bot, s1, s2).animate.set_opacity(0.25), run_time=0.4)
            self.play(Write(e3), run_time=1.2)
        self.play(FadeOut(VGroup(e2, s1, s2, e3)), run_time=0.5)

        ax = self.axes([0, 4, 1], [0, 6, 1], 5, 3.6, fs=22).move_to([0, -0.3, 0])
        ln = ax.plot(lambda x: x + 2, x_range=[0, 4], color=CURVE, stroke_width=4)
        h = self.hole(ax.c2p(2, 4))
        f1 = MathTex(r"\frac{x^2-4}{x-2}", font_size=36, color=CURVE).move_to([-4.6, 1.6, 0])
        f2 = MathTex("x + 2", font_size=36, color=CURVE).move_to([-4.6, 1.6, 0])
        cap = Text("same everywhere except x = 2", font_size=26).move_to([0, -2.7, 0])
        text = "Cancelling is legal, because the limit never lets x equal two."
        with self.beat(text) as vo:
            self.play(Create(ax), Create(ln), FadeIn(h), FadeIn(f1), run_time=1.2)
            filled = self.dot(ax.c2p(2, 4), CURVE)
            self.play(Transform(h, filled), TransformMatchingShapes(f1, f2), run_time=1.0)
            self.play(FadeIn(cap), run_time=0.6)
        self.play(FadeOut(VGroup(ax, ln, h, f2, cap)), run_time=0.5)

        text = ("Square roots call for the conjugate. Take the square root of the quantity x plus four, minus two, "
                "all over x, as x approaches zero. Multiply top and bottom by the square root of x plus four, plus two. "
                "The top becomes x, which cancels, leaving one over the quantity square root of x plus four, plus two. "
                "At zero, one quarter.")
        with self.beat(text) as vo:
            c1 = MathTex(r"\lim_{x \to 0} \frac{\sqrt{x+4}-2}{x}", font_size=50).move_to([-1.0, 2.0, 0])
            c1z = MathTex(r"\to \frac{0}{0}", font_size=44, color=BAD).next_to(c1, RIGHT, buff=0.5)
            self.sync(vo, "Take the square", lead=0.3)
            self.play(Write(c1), run_time=1.5)
            self.sync(vo, "as x approaches")
            self.play(FadeIn(c1z), run_time=0.5)
            self.sync(vo, "Multiply")
            c2 = MathTex(r"= \frac{\sqrt{x+4}-2}{x} \cdot \frac{\sqrt{x+4}+2}{\sqrt{x+4}+2}", font_size=46).move_to([0, 0.3, 0])
            self.play(Write(c2), run_time=1.5)
            self.sync(vo, "The top becomes")
            c3 = MathTex(r"= \frac{x+4-4}{x(\sqrt{x+4}+2)}", font_size=46).move_to([0, 0.3, 0])
            self.play(TransformMatchingShapes(c2, c3), run_time=1.0)
            c4 = MathTex(r"=", r"\frac{x}{x(\sqrt{x+4}+2)}", font_size=46).move_to([0, 0.3, 0])
            self.play(TransformMatchingShapes(c3, c4), run_time=0.9)
            self.sync(vo, "which cancels")
            xt = c4[1][0]
            xb = c4[1][2]
            self.play(xt.animate.set_color(BAD), xb.animate.set_color(BAD), run_time=0.4)
            k1, k2 = self.strike(xt), self.strike(xb)
            self.play(Create(k1), Create(k2), run_time=0.5)
            self.sync(vo, "leaving")
            c5 = MathTex(r"\lim_{x \to 0} \frac{1}{\sqrt{x+4}+2}", "=", r"\frac{1}{2+2}", "=", r"\frac{1}{4}", font_size=46).move_to([0, -1.6, 0])
            c5[4].set_color(HL)
            self.play(Write(c5[0]), run_time=1.0)
            self.sync(vo, "At zero")
            self.play(Write(c5[1:3]), run_time=0.7)
            self.play(Write(c5[3:]), run_time=0.6)
            self.play(Circumscribe(c5[4], color=HL), run_time=0.8)
        self.play(FadeOut(VGroup(c1, c1z, c4, k1, k2, c5)), run_time=0.5)

        d1 = MathTex(r"\lim_{x \to 1}", r"\frac{x^2 + x - 2}{x^2 - 1}", font_size=54).move_to([0, 1.3, 0])
        d2 = MathTex(r"\lim_{x \to 1}", r"\frac{(x+2)(x-1)}{(x-1)(x+1)}", font_size=54).move_to([0, 1.3, 0])
        d3 = MathTex(r"= \lim_{x \to 1} \frac{x+2}{x+1} =", r"\frac{3}{2}", font_size=54).move_to([0, -1.1, 0])
        d3[1].set_color(HL)
        text = "x squared plus x minus two, over x squared minus one, shares the culprit x minus one. Cancel it, and the limit at one is three halves."
        with self.beat(text) as vo:
            self.play(Write(d1), run_time=1.5)
            self.sync(vo, "shares")
            self.play(TransformMatchingShapes(d1, d2), run_time=1.0)
            t = d2[1][5:10]
            b = d2[1][11:16]
            self.play(t.animate.set_color(BAD), b.animate.set_color(BAD), run_time=0.5)
            self.sync(vo, "Cancel it")
            s1, s2 = self.strike(t), self.strike(b)
            self.play(Create(s1), Create(s2), run_time=0.5)
            self.play(Write(d3), run_time=1.2)
        self.wait(0.3)
        self.clear_scene()

    # ------------------------------------------------------------------ 8
    def scene8(self):
        self.tag("1.7 · Limits at infinity")
        ax = self.axes([0, 10, 2], [0, 90, 20], 7, 4, fs=22).move_to([-2.2, -0.6, 0])
        labs = ax.get_axis_labels(MathTex("t", font_size=30), MathTex("T", font_size=30))
        cur = ax.plot(lambda t: 20 + 60 * np.exp(-t), x_range=[0, 10], color=CURVE, stroke_width=4)
        asy = DashedLine(ax.c2p(0, 20), ax.c2p(10, 20), color=HL, dash_length=0.12)
        lim = MathTex(r"\lim_{t \to \infty} T(t) = 20", font_size=40).move_to([4.4, 2.4, 0])
        room = Text("room: 20°", font_size=24, color=HL).next_to(asy, RIGHT, buff=0.15).shift(UP * 0.2)
        text = ("Now let x run forever. Coffee in a twenty degree room closes in on twenty but never reaches it: "
                "a horizontal asymptote.")
        with self.beat(text) as vo:
            self.play(Create(ax), FadeIn(labs), run_time=1.0)
            self.sync(vo, "Coffee")
            self.play(Create(cur), run_time=2.5)
            self.sync(vo, "closes in")
            self.play(Create(asy), FadeIn(room), run_time=0.8)
            self.play(Write(lim), run_time=1.0)
            self.sync(vo, "a horizontal")
            ha = Text("horizontal asymptote", font_size=26, color=HL).next_to(lim, DOWN, buff=0.35)
            self.play(FadeIn(ha), run_time=0.5)
        self.play(FadeOut(VGroup(ax, labs, cur, asy, lim, room, ha)), run_time=0.5)

        base = MathTex(r"\lim_{x \to \infty} \frac{1}{x} = 0", font_size=46).move_to([0, 2.2, 0])
        big = MathTex(r"\lim_{x \to \infty} \frac{3x^2 + x}{x^2 + 1}", "=", r"\lim_{x \to \infty} \frac{3 + \frac{1}{x}}{1 + \frac{1}{x^2}}",
                      "=", r"\frac{3 + 0}{1 + 0}", "=", "3", font_size=44)
        if big.width > 13:
            big.scale_to_fit_width(13)
        big.move_to([0, -0.3, 0])
        big[6].set_color(HL)
        hint = Text("divide top and bottom by x²", font_size=24, color=MUTED).next_to(big, DOWN, buff=0.6)
        text = ("Dividing by something huge gives something tiny, so only the heaviest terms matter. "
                "Three x squared plus x, over x squared plus one, goes to three.")
        with self.beat(text) as vo:
            self.play(Write(base), run_time=1.2)
            self.sync(vo, "so only")
            self.play(Write(big[0]), run_time=1.0)
            self.play(Write(big[1:3]), FadeIn(hint), run_time=1.2)
            p1 = big[2][8:11]
            p2 = big[2][14:18]
            self.play(Indicate(p1, color=HL, scale_factor=1.5), Indicate(p2, color=HL, scale_factor=1.5), run_time=0.9)
            self.play(Write(big[3:5]), run_time=0.9)
            self.play(Write(big[5:]), run_time=0.6)
            self.play(Circumscribe(big[6], color=HL), run_time=0.8)
        self.play(FadeOut(VGroup(base, big, hint)), run_time=0.5)

        cfg = [
            ([0, 20, 5], lambda x: (5 * x + 1) / (x ** 2 + 3), [0, 20], "bottom heavier → 0", None),
            ([0, 20, 5], lambda x: (3 * x ** 2 + x) / (x ** 2 + 1), [0, 20], "equal → 3 (ratio)", 3),
            ([0, 8, 2], lambda x: (x ** 3 + 1) / (x ** 2 + 1), [0, 6.1], "top heavier → ∞", "up"),
        ]
        forms = [r"\frac{5x+1}{x^2+3}", r"\frac{3x^2+x}{x^2+1}", r"\frac{x^3+1}{x^2+1}"]
        panels = []
        for i, (xr, f, dom, cap, extra) in enumerate(cfg):
            a = self.axes(xr, [0, 6, 2], 3.5, 2.4, fs=20).move_to([(i - 1) * 4.5, -0.3, 0])
            c = a.plot(f, x_range=dom, color=CURVE, stroke_width=4)
            g = VGroup(a, c)
            if extra == 3:
                g.add(DashedLine(a.c2p(0, 3), a.c2p(20, 3), color=HL, dash_length=0.1))
            if extra == "up":
                tip = a.c2p(6.1, f(6.1))
                g.add(Arrow(tip + DOWN * 0.1, tip + UP * 0.55, buff=0, color=HL, stroke_width=4,
                            max_tip_length_to_length_ratio=0.4))
            fm = MathTex(forms[i], font_size=32).next_to(a, UP, buff=0.35)
            cp = Text(cap, font_size=22).next_to(a, DOWN, buff=0.45)
            panels.append(VGroup(fm, g, cp))
        text = "Bottom heavier, the limit is zero. Equal degrees, it's the ratio of leading coefficients. Top heavier, the outputs run away."
        with self.beat(text) as vo:
            for key, p in zip(["Bottom heavier", "Equal degrees", "Top heavier"], panels):
                self.sync(vo, key, lead=0.2)
                self.play(FadeIn(p[0]), Create(p[1]), FadeIn(p[2]), run_time=1.3)
        self.wait(0.4)
        self.clear_scene()

    # ------------------------------------------------------------------ 9
    def scene9(self):
        self.tag("1.8 · Continuity")
        items = VGroup(
            Tex(r"1. $f(a)$ exists", font_size=34),
            Tex(r"2. $\lim_{x \to a} f(x)$ exists", font_size=34),
            Tex(r"3. $\lim_{x \to a} f(x) = f(a)$", font_size=34),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.25)
        checks = VGroup(*[MathTex(r"\checkmark", color=GREEN, font_size=38).next_to(it, LEFT, buff=0.3) for it in items])
        cl = VGroup(checks, items)
        box = SurroundingRectangle(cl, color=MUTED, buff=0.25, corner_radius=0.1)
        clist = VGroup(box, cl).move_to([0.8, 2.4, 0])
        head = Text("Continuous at a", font_size=28, color=GREEN).next_to(box, LEFT, buff=0.4)
        text = "f is continuous at a when there's no surprise: f of a exists, the limit exists, and they are equal."
        with self.beat(text) as vo:
            self.play(Create(box), FadeIn(head), run_time=0.8)
            for key, it, ck in zip(["f of a exists", "the limit exists", "and they"], items, checks):
                self.sync(vo, key, lead=0.2)
                self.play(FadeIn(it), FadeIn(ck, scale=1.5), run_time=0.6)

        def mini(xr, yr):
            return self.axes(xr, yr, 3.4, 2.1, fs=17)

        a1 = mini([0, 4, 1], [0, 6, 2]).move_to([-4.5, -1.6, 0])
        l1 = a1.plot(lambda x: x + 1, x_range=[0, 4], color=CURVE, stroke_width=4)
        h1 = self.hole(a1.c2p(2, 3))
        a2 = mini([-2, 2, 1], [0, 5, 1]).move_to([0, -1.6, 0])
        j1 = a2.plot(lambda x: x + 3, x_range=[-2, 0], color=CURVE, stroke_width=4)
        j2 = a2.plot(lambda x: x ** 2, x_range=[0, 2], color=CURVE, stroke_width=4)
        jh = self.hole(a2.c2p(0, 3))
        jd = self.dot(a2.c2p(0, 0), CURVE)
        a3 = mini([-2, 2, 1], [0, 5, 1]).move_to([4.5, -1.6, 0])
        i1 = VGroup(a3.plot(lambda x: 1 / x ** 2, x_range=[-2, -0.45], color=CURVE, stroke_width=4),
                    a3.plot(lambda x: 1 / x ** 2, x_range=[0.45, 2], color=CURVE, stroke_width=4))
        caps = VGroup(Text("Hole (removable)", font_size=24).next_to(a1, UP, buff=0.3),
                      Text("Jump", font_size=24).next_to(a2, UP, buff=0.3),
                      Text("Infinite", font_size=24).next_to(a3, UP, buff=0.3))
        text = "A hole is removable: move one dot. A jump can't be fixed that way; a blow-up has no finite limit."
        with self.beat(text) as vo:
            self.play(Create(a1), Create(l1), FadeIn(h1), FadeIn(caps[0]), run_time=0.9)
            fly = self.dot(a1.c2p(3.5, 5.5), HL, r=0.1)
            self.play(FadeIn(fly), run_time=0.2)
            self.play(fly.animate.move_to(a1.c2p(2, 3)), run_time=0.8)
            fix = MathTex(r"\checkmark", color=GREEN, font_size=34).next_to(caps[0], RIGHT, buff=0.15)
            self.play(FadeIn(fix), run_time=0.3)
            self.sync(vo, "A jump")
            self.play(Create(a2), Create(j1), Create(j2), FadeIn(jh), FadeIn(jd), FadeIn(caps[1]), run_time=0.9)
            tr = self.dot(a2.c2p(0, 3), HL, r=0.1)
            self.play(FadeIn(tr), run_time=0.2)
            c1 = Cross(scale_factor=0.18, stroke_color=BAD, stroke_width=5).move_to(a2.c2p(0.45, 3))
            self.play(Create(c1), run_time=0.3)
            self.play(tr.animate.move_to(a2.c2p(0, 0)), run_time=0.5)
            c2 = Cross(scale_factor=0.18, stroke_color=BAD, stroke_width=5).move_to(a2.c2p(0.45, 0.45))
            self.play(Create(c2), run_time=0.3)
            self.sync(vo, "a blow-up")
            self.play(Create(a3), Create(i1), FadeIn(caps[2]), run_time=0.9)
            no = Text("no finite limit", font_size=20, color=BAD).next_to(a3, DOWN, buff=0.35)
            self.play(FadeIn(no), run_time=0.4)
        self.wait(0.3)
        self.clear_scene()

        self.tag("1.8 · Continuity")
        ax = self.axes([0, 4, 1], [0, 4, 1], 6, 4, xnums=False, ynums=False).move_to([-2.6, -0.3, 0])

        def f(x):
            s = (x - 0.3) / 3.4
            return 0.8 + 2.6 * s ** 2 * (3 - 2 * s)

        lo, hi = 0.3, 3.7
        for _ in range(60):
            mid = (lo + hi) / 2
            if f(mid) < 2:
                lo = mid
            else:
                hi = mid
        c = (lo + hi) / 2
        cur = ax.plot(f, x_range=[0.3, 3.7], color=CURVE, stroke_width=4)
        guides = VGroup(
            DashedLine(ax.c2p(0.3, 0), ax.c2p(0.3, 0.8), color=MUTED, dash_length=0.08),
            DashedLine(ax.c2p(0, 0.8), ax.c2p(0.3, 0.8), color=MUTED, dash_length=0.08),
            DashedLine(ax.c2p(3.7, 0), ax.c2p(3.7, 3.4), color=MUTED, dash_length=0.08),
            DashedLine(ax.c2p(0, 3.4), ax.c2p(3.7, 3.4), color=MUTED, dash_length=0.08),
        )
        labs = VGroup(
            MathTex("a", font_size=30).next_to(ax.c2p(0.3, 0), DOWN, buff=0.15),
            MathTex("b", font_size=30).next_to(ax.c2p(3.7, 0), DOWN, buff=0.15),
            MathTex("f(a)", font_size=28).next_to(ax.c2p(0, 0.8), LEFT, buff=0.15),
            MathTex("f(b)", font_size=28).next_to(ax.c2p(0, 3.4), LEFT, buff=0.15),
        )
        hline = DashedLine(ax.c2p(0, 2), ax.c2p(4, 2), color=HL, dash_length=0.12)
        cd = self.dot(ax.c2p(c, 2), HL, r=0.1)
        cv = DashedLine(ax.c2p(c, 2), ax.c2p(c, 0), color=HL, dash_length=0.08)
        cl_ = MathTex("c", font_size=30, color=HL).next_to(ax.c2p(c, 0), DOWN, buff=0.15)
        ivt = Text("IVT", font_size=40, color=HL, weight="BOLD").move_to([4.2, 2.9, 0])
        thm = VGroup(
            Tex(r"$f$ continuous on $[a, b]$", font_size=30),
            Tex(r"$\Rightarrow$ hits every height", font_size=30),
            Tex(r"between $f(a)$ and $f(b)$", font_size=30),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.15).move_to([4.2, 1.6, 0])
        text = ("The payoff is the Intermediate Value Theorem. If f is continuous from a to b, it hits every height "
                "between f of a and f of b. So if f of one is negative and f of two is positive, a root lies between one and two.")
        with self.beat(text) as vo:
            self.play(Create(ax), FadeIn(ivt), run_time=0.8)
            self.play(Create(cur), run_time=1.5)
            self.play(Create(guides), FadeIn(labs), run_time=0.8)
            self.sync(vo, "If f is")
            self.play(FadeIn(thm), run_time=0.8)
            self.sync(vo, "hits every", lead=0.2)
            self.play(Create(hline), run_time=0.7)
            self.play(FadeIn(cd, scale=1.5), Create(cv), FadeIn(cl_), run_time=0.8)
            self.sync(vo, "So if")
            self.play(FadeOut(VGroup(ax, cur, guides, labs, hline, cd, cv, cl_)), run_time=0.6)
            ia = self.axes([0, 3, 1], [-2, 2, 1], 4.5, 3.3, fs=22).move_to([-2.6, -0.5, 0])
            ic = ia.plot(lambda x: x ** 2 - 2, x_range=[0.5, 2.0], color=CURVE, stroke_width=4)
            flab = MathTex(r"y = x^2 - 2", font_size=30, color=CURVE).next_to(ia, UP, buff=0.2)
            r1 = self.dot(ia.c2p(1, -1), BAD, r=0.1)
            r1l = MathTex(r"f(1)<0", font_size=26, color=BAD).next_to(r1, DR, buff=0.1)
            r2 = self.dot(ia.c2p(2, 2), GREEN, r=0.1)
            r2l = MathTex(r"f(2)>0", font_size=26, color=GREEN).next_to(r2, RIGHT, buff=0.15)
            rt = self.dot(ia.c2p(np.sqrt(2), 0), HL, r=0.1)
            rtxt = MathTex(r"\text{root in } (1, 2)", font_size=34, color=HL).move_to([4.2, -0.6, 0])
            self.play(Create(ia), Create(ic), FadeIn(flab), run_time=1.0)
            self.play(FadeIn(r1), FadeIn(r1l), run_time=0.5)
            self.sync(vo, "and f of two")
            self.play(FadeIn(r2), FadeIn(r2l), run_time=0.5)
            self.sync(vo, "a root")
            self.play(FadeIn(rt, scale=1.6), Write(rtxt), run_time=0.8)
        self.wait(0.3)
        self.clear_scene()

        self.tag("1.8 · Continuity")
        sa = self.axes([0, 2, 0.5], [0, 100, 20], 5, 3, xdec=1, fs=20).move_to([0, -0.3, 0])
        st = VGroup(Line(sa.c2p(0, 50), sa.c2p(1, 50), color=CURVE, stroke_width=4),
                    Line(sa.c2p(1, 80), sa.c2p(2, 80), color=CURVE, stroke_width=4),
                    self.hole(sa.c2p(1, 50)), self.dot(sa.c2p(1, 80), CURVE))
        l65 = DashedLine(sa.c2p(0, 65), sa.c2p(2, 65), color=HL, dash_length=0.1)
        l65l = MathTex("65", font_size=28, color=HL).next_to(l65, RIGHT, buff=0.15)
        cr = Cross(scale_factor=0.2, stroke_color=BAD, stroke_width=5).move_to(sa.c2p(1, 65))
        never = Text("never ₹65", font_size=28, color=BAD).next_to(sa, UP, buff=0.3)
        cases = MathTex(r"f(x) = \begin{cases} x^2 & x < 1 \\ 2 - x & x \ge 1 \end{cases}", font_size=36).move_to([-4.3, 2.0, 0])
        ax2 = self.axes([-1, 3, 1], [-1, 2, 1], 5.5, 4, fs=22).move_to([-2.6, -1.0, 0])
        p1 = ax2.plot(lambda x: x ** 2, x_range=[-1, 1], color=CURVE, stroke_width=4)
        p2 = ax2.plot(lambda x: 2 - x, x_range=[1, 3], color=CURVE, stroke_width=4)
        md = self.dot(ax2.c2p(1, 1), CURVE, r=0.1)
        items2 = VGroup(
            MathTex(r"f(1) = 1", font_size=34),
            MathTex(r"\lim_{x \to 1} f(x) = 1", font_size=34),
            MathTex(r"\lim_{x \to 1} f(x) = f(1)", font_size=34),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.35).move_to([4.2, 0.2, 0])
        ticks = VGroup(*[MathTex(r"\checkmark", color=GREEN, font_size=38).next_to(it, LEFT, buff=0.3) for it in items2])
        text = ("But the jumping parking fee is never sixty five rupees. Now x squared left of one, two minus x from one on: "
                "value one, limit one. Continuous, corner and all.")
        with self.beat(text) as vo:
            self.play(Create(sa), Create(st), run_time=0.8)
            self.play(Create(l65), FadeIn(l65l), run_time=0.6)
            self.play(Create(cr), FadeIn(never), run_time=0.5)
            self.sync(vo, "Now x squared", lead=0.2)
            self.play(FadeOut(VGroup(sa, st, l65, l65l, cr, never)), run_time=0.4)
            self.play(Write(cases), Create(ax2), run_time=1.0)
            self.play(Create(p1), Create(p2), FadeIn(md), run_time=1.0)
            self.sync(vo, "value one")
            self.play(FadeIn(items2[0]), FadeIn(ticks[0], scale=1.5), run_time=0.5)
            self.sync(vo, "limit one")
            self.play(FadeIn(items2[1]), FadeIn(ticks[1], scale=1.5), run_time=0.5)
            self.sync(vo, "Continuous")
            self.play(FadeIn(items2[2]), FadeIn(ticks[2], scale=1.5), run_time=0.5)
            self.play(Indicate(md, color=GREEN, scale_factor=1.8), run_time=0.8)
        self.wait(0.3)
        self.clear_scene()

    # ------------------------------------------------------------------ 10
    def scene10(self):
        tag = self.tag("1.9 · How close is close enough?")
        ring = VGroup(Circle(radius=1.1, color=INK, stroke_width=5, fill_color=GRID, fill_opacity=1),
                      Circle(radius=0.65, color=INK, stroke_width=5, fill_color=BG, fill_opacity=1)).move_to([0, 1.3, 0])
        rl = Text("80 mm ± 0.1 mm", font_size=32).next_to(ring, RIGHT, buff=0.6)
        nl = NumberLine(x_range=[79.8, 80.2, 0.1], length=9, color=INK, include_numbers=True, font_size=24,
                        decimal_number_config={"num_decimal_places": 1, "color": INK}).move_to([0, -1.8, 0])
        band = Rectangle(width=nl.n2p(80.1)[0] - nl.n2p(79.9)[0], height=0.5, stroke_width=0,
                         fill_color=HL, fill_opacity=0.35).move_to(nl.n2p(80))
        ok = Text("accepted", font_size=24, color=HL).next_to(band, UP, buff=0.15)
        text = ("So far we leaned on the words, closes in on. That's a feeling, not a definition. "
                "Machinists use tolerances: eighty millimetres, give or take one tenth of a millimetre.")
        with self.beat(text) as vo:
            q = Text("“closes in on” = ?", font_size=40).move_to([0, 0.5, 0])
            self.play(FadeIn(q), run_time=0.7)
            self.sync(vo, "Machinists", lead=0.2)
            self.play(FadeOut(q), run_time=0.4)
            self.play(FadeIn(ring), run_time=0.7)
            self.play(Write(rl), run_time=0.8)
            self.play(Create(nl), run_time=0.8)
            self.play(FadeIn(band), FadeIn(ok), run_time=0.6)
        self.play(FadeOut(VGroup(ring, rl, nl, band, ok)), run_time=0.5)

        ax = self.axes([-0.5, 2.5, 0.5], [-0.5, 4, 1], 6, 4, xdec=1, fs=22).move_to([-2.6, -0.3, 0])
        cur = ax.plot(lambda x: x ** 2, x_range=[-0.5, 2], color=CURVE, stroke_width=3)
        pt = self.dot(ax.c2p(1, 1), INK)
        eps = ValueTracker(1.0)

        def dlt():
            e = eps.get_value()
            return float(np.sqrt(1 + e) - 1)

        def yband():
            e = eps.get_value()
            p0, p1 = ax.c2p(-0.5, 1 - e), ax.c2p(2.5, 1 + e)
            return Rectangle(width=p1[0] - p0[0], height=p1[1] - p0[1], stroke_width=0, fill_color=HL,
                             fill_opacity=0.25).move_to((p0 + p1) / 2)

        def xband():
            d = dlt()
            p0, p1 = ax.c2p(1 - d, -0.5), ax.c2p(1 + d, 4)
            return Rectangle(width=p1[0] - p0[0], height=p1[1] - p0[1], stroke_width=0, fill_color=GREEN,
                             fill_opacity=0.22).move_to((p0 + p1) / 2)

        yb = always_redraw(yband)
        xb = always_redraw(xband)
        thick = always_redraw(lambda: ax.plot(lambda x: x ** 2, x_range=[1 - dlt(), 1 + dlt()], color=CURVE, stroke_width=8))
        el = always_redraw(lambda: Text("ε", font_size=30, color=ACCENT).next_to(ax.c2p(2.5, 1 + eps.get_value()), LEFT, buff=0.1).shift(DOWN * 0.2))
        dl_ = always_redraw(lambda: Text("δ", font_size=30, color=GREEN).next_to(ax.c2p(1 + dlt(), 4), RIGHT, buff=0.08).shift(DOWN * 0.2))
        er = VGroup(MathTex(r"\varepsilon =", font_size=36, color=ACCENT), DecimalNumber(1.0, num_decimal_places=2, font_size=36, color=ACCENT)).arrange(RIGHT, buff=0.15)
        dr = VGroup(MathTex(r"\delta =", font_size=36, color=GREEN), DecimalNumber(0.4142, num_decimal_places=4, font_size=36, color=GREEN)).arrange(RIGHT, buff=0.15)
        ro = VGroup(er, dr).arrange(DOWN, aligned_edge=LEFT, buff=0.35).move_to([4.2, 1.4, 0])
        er[1].add_updater(lambda m: m.set_value(eps.get_value()))
        dr[1].add_updater(lambda m: m.set_value(dlt()))
        who = VGroup(Text("skeptic: ε", font_size=26, color=ACCENT), Text("you: δ", font_size=26, color=GREEN)).arrange(DOWN, aligned_edge=LEFT, buff=0.2).move_to([4.2, -0.6, 0])
        text = ("Limits work the same way. A skeptic demands outputs within epsilon of L. "
                "You answer with a delta around a, for every demand.")
        with self.beat(text) as vo:
            self.play(Create(ax), Create(cur), FadeIn(pt), run_time=1.0)
            self.sync(vo, "A skeptic")
            self.play(FadeIn(yb), FadeIn(el), FadeIn(ro[0]), FadeIn(who[0]), run_time=0.7)
            self.sync(vo, "You answer")
            self.play(FadeIn(xb), FadeIn(thick), FadeIn(dl_), FadeIn(ro[1]), FadeIn(who[1]), run_time=0.7)
            rem = self.left(vo) - 0.3
            for e in [0.5, 0.25, 0.1]:
                self.play(eps.animate.set_value(e), run_time=max(0.6, rem / 3 - 0.2))
                self.wait(0.2)

        form = MathTex(r"\forall \varepsilon > 0\ \exists \delta > 0:\ ", r"0 <", r"\ |x - a| < \delta \implies |f(x) - L| < \varepsilon",
                       font_size=34).move_to([0, -3.1, 0])
        exnote = Text("the point itself is exempt", font_size=24, color=BAD).move_to([4.2, -1.7, 0])
        text = "Formally: for every epsilon, there is a delta. And the point itself is exempt."
        with self.beat(text) as vo:
            self.play(FadeOut(who), run_time=0.3)
            self.play(Write(form), run_time=1.8)
            self.sync(vo, "And the point")
            self.play(form[1].animate.set_color(BAD), Indicate(form[1], color=BAD, scale_factor=1.4), FadeIn(exnote), run_time=1.0)
        for m in (er[1], dr[1]):
            m.clear_updaters()
        self.play(FadeOut(VGroup(ax, cur, pt, yb, xb, thick, el, dl_, ro, form, exnote)), run_time=0.5)
        for m in (yb, xb, thick, el, dl_):
            m.clear_updaters()

        jg = self.jump_graph().move_to([-2.3, -0.7, 0])
        ja = jg[0]
        claim = MathTex(r"\text{Claim: } \lim_{x \to 1} f(x) = 2, \quad \varepsilon = 0.5", font_size=38).move_to([0.8, 2.85, 0])
        p0, p1 = ja.c2p(-2, 1.5), ja.c2p(4, 2.5)
        ybd = Rectangle(width=p1[0] - p0[0], height=p1[1] - p0[1], stroke_width=0, fill_color=HL, fill_opacity=0.28).move_to((p0 + p1) / 2)
        w = ValueTracker(0.5)

        def win():
            q0, q1 = ja.c2p(1 - w.get_value(), -1), ja.c2p(1 + w.get_value(), 5)
            return Rectangle(width=q1[0] - q0[0], height=q1[1] - q0[1], stroke_width=0, fill_color=GREEN,
                             fill_opacity=0.22).move_to((q0 + q1) / 2)

        wb = always_redraw(win)
        text = ("Now catch a liar. Claim: our one-sided example has limit two at the jump. Demand epsilon one half. "
                "Every window holds right-side outputs near three, outside the band. No delta works.")
        with self.beat(text) as vo:
            self.play(FadeIn(jg), run_time=0.8)
            self.sync(vo, "Claim")
            self.play(Write(claim), run_time=1.2)
            self.sync(vo, "Demand")
            self.play(FadeIn(ybd), run_time=0.6)
            self.sync(vo, "Every window")
            self.add(wb)
            for hw in [0.5, 0.2, 0.05]:
                self.play(w.animate.set_value(hw), run_time=0.5)
                seg = ja.plot(lambda x: 4 - x, x_range=[1, 1 + hw], color=BAD, stroke_width=9)
                sd = self.dot(ja.c2p(1 + hw / 2, 3 - hw / 2), BAD, r=0.09)
                self.play(FadeIn(seg), FadeIn(sd), run_time=0.3)
                self.play(Indicate(seg, color=BAD, scale_factor=1.3), run_time=0.5)
                self.play(FadeOut(seg), FadeOut(sd), run_time=0.25)
            self.sync(vo, "No delta")
            st = Line(claim.get_left() + LEFT * 0.1, claim.get_right() + RIGHT * 0.1, color=BAD, stroke_width=5)
            nd = Text("no δ works", color=BAD, font_size=28).next_to(claim, DOWN, buff=0.3).shift(RIGHT * 2.5)
            self.play(Create(st), FadeIn(nd), run_time=0.7)
        wb.clear_updaters()
        self.play(FadeOut(VGroup(jg, claim, ybd, wb, st, nd)), run_time=0.5)

        q1 = MathTex(r"\lim_{x \to 1} 4x = 4, \quad \varepsilon = 0.2", font_size=38).move_to([-3.6, 1.6, 0])
        q2 = MathTex(r"|4x - 4| = 4|x - 1| < 4\delta \le 0.2", font_size=32).next_to(q1, DOWN, buff=0.5)
        q3 = MathTex(r"\delta = 0.05", font_size=44, color=GREEN).next_to(q2, DOWN, buff=0.5)
        ga = self.axes([0.8, 1.2, 0.1], [3, 5, 0.5], 5, 3.8, xdec=1, ydec=1, fs=22).move_to([3.3, -0.4, 0])
        gl = ga.plot(lambda x: 4 * x, x_range=[0.8, 1.2], color=CURVE, stroke_width=4)
        a0, a1 = ga.c2p(0.8, 3.8), ga.c2p(1.2, 4.2)
        yb2 = Rectangle(width=a1[0] - a0[0], height=a1[1] - a0[1], stroke_width=0, fill_color=HL, fill_opacity=0.28).move_to((a0 + a1) / 2)
        b0, b1 = ga.c2p(0.95, 3), ga.c2p(1.05, 5)
        xb2 = Rectangle(width=b1[0] - b0[0], height=b1[1] - b0[1], stroke_width=0, fill_color=GREEN, fill_opacity=0.25).move_to((b0 + b1) / 2)
        str_ = Text("4x stretches distances by 4", font_size=24, color=MUTED).next_to(q3, DOWN, buff=0.5)
        text = "For four x near one, a demand of point two gets delta point zero five: four x stretches distances by four."
        with self.beat(text) as vo:
            self.play(Write(q1), Create(ga), Create(gl), run_time=1.2)
            self.play(FadeIn(yb2), run_time=0.5)
            self.sync(vo, "gets delta")
            self.play(Write(q2), run_time=1.0)
            self.play(Write(q3), FadeIn(xb2), run_time=0.8)
            self.sync(vo, "four x stretches")
            self.play(FadeIn(str_), run_time=0.5)
        self.wait(0.3)
        self.clear_scene()

    # ------------------------------------------------------------------ 11
    def scene11(self):
        self.tag("1.10 · From limits to derivatives")
        ax = self.axes([0, 4, 1], [0, 10, 2], 6, 4, fs=22).move_to([-2.6, -0.8, 0])
        cur = ax.plot(lambda x: x ** 2, x_range=[0, np.sqrt(10)], color=CURVE, stroke_width=4)
        h = ValueTracker(1.0)
        P = self.dot(ax.c2p(2, 4), INK, r=0.09)
        Pl = MathTex("P", font_size=30).next_to(P, LEFT, buff=0.15)
        Q = always_redraw(lambda: self.dot(ax.c2p(2 + h.get_value(), (2 + h.get_value()) ** 2), BAD, r=0.09))
        Ql = always_redraw(lambda: MathTex("Q", font_size=30, color=BAD).next_to(Q, RIGHT, buff=0.12))

        def secant():
            m = 4 + h.get_value()
            x0 = max(0, 2 - 4 / m)
            x1 = min(4, 2 + 6 / m)
            return ax.plot(lambda x: 4 + m * (x - 2), x_range=[x0, x1], color=HL, stroke_width=4)

        sec = always_redraw(secant)
        br = always_redraw(lambda: BraceBetweenPoints(ax.c2p(2, 0), ax.c2p(2 + h.get_value(), 0), direction=DOWN,
                                                      color=MUTED).shift(DOWN * 0.35))
        bl = always_redraw(lambda: MathTex("h", font_size=28, color=MUTED).next_to(br, DOWN, buff=0.08))
        top = MathTex(r"\text{slope at } 2 = \lim_{h \to 0} \frac{f(2+h) - f(2)}{h}", font_size=38).move_to([1.2, 2.9, 0])
        sl = MathTex(r"\text{secant slope} =", font_size=34)
        sn = DecimalNumber(5.0, num_decimal_places=2, font_size=34, color=HL)
        sg = VGroup(sl, sn).arrange(RIGHT, buff=0.15).move_to([3.9, 0.6, 0])
        sn.add_updater(lambda m: m.set_value(4 + h.get_value()).next_to(sl, RIGHT, buff=0.15))
        hr = VGroup(MathTex("h =", font_size=34), DecimalNumber(1.0, num_decimal_places=2, font_size=34)).arrange(RIGHT, buff=0.15)
        hr.next_to(sg, DOWN, buff=0.4, aligned_edge=LEFT)
        hr[1].add_updater(lambda m: m.set_value(h.get_value()))
        text = ("Now the payoff. Call the gap between two points on x squared h. "
                "The slope at two is the limit of secant slopes as h goes to zero.")
        with self.beat(text) as vo:
            self.play(Create(ax), Create(cur), run_time=1.0)
            self.sync(vo, "Call the gap")
            self.play(FadeIn(P), FadeIn(Pl), FadeIn(Q), FadeIn(Ql), run_time=0.5)
            self.play(Create(sec), FadeIn(br), FadeIn(bl), FadeIn(sg), FadeIn(hr), run_time=0.8)
            self.sync(vo, "The slope at")
            self.play(Write(top), run_time=1.2)
            self.play(h.animate.set_value(0.05), run_time=max(2.0, self.left(vo) - 0.2), rate_func=smooth)
        for m in (sn, hr[1], sec, Q, Ql, br, bl):
            m.clear_updaters()
        self.play(FadeOut(VGroup(ax, cur, P, Pl, Q, Ql, sec, br, bl, sg, hr, top)), run_time=0.5)

        s1 = MathTex(r"\lim_{h \to 0}", r"\frac{(2+h)^2 - 4}{h}", font_size=54)
        s2 = MathTex(r"\lim_{h \to 0}", r"\frac{4 + 4h + h^2 - 4}{h}", font_size=54)
        s3 = MathTex(r"\lim_{h \to 0}", r"\frac{h(4 + h)}{h}", font_size=54)
        s4 = MathTex(r"\lim_{h \to 0} (4 + h) =", "4", font_size=54)
        s4[1].set_color(HL)
        for s in (s1, s2, s3):
            s.move_to([0, 0.8, 0])
        s4.move_to([0, -1.4, 0])
        zz = MathTex(r"\to \frac{0}{0}", font_size=44, color=BAD).next_to(s1, RIGHT, buff=0.5)
        text = "It's zero over zero, so run the playbook. Expand, factor out h, cancel, plug in. The slope is exactly four."
        with self.beat(text) as vo:
            self.play(Write(s1), run_time=1.0)
            self.play(FadeIn(zz), run_time=0.4)
            self.sync(vo, "Expand")
            self.play(FadeOut(zz), TransformMatchingShapes(s1, s2), run_time=0.8)
            self.sync(vo, "factor out")
            self.play(TransformMatchingShapes(s2, s3), run_time=0.8)
            self.sync(vo, "cancel")
            ht, hb = s3[1][0], s3[1][7]
            self.play(ht.animate.set_color(BAD), hb.animate.set_color(BAD), run_time=0.3)
            k1, k2 = self.strike(ht), self.strike(hb)
            self.play(Create(k1), Create(k2), run_time=0.4)
            self.sync(vo, "plug in")
            self.play(Write(s4), run_time=0.9)
            self.play(Circumscribe(s4[1], color=HL), run_time=0.8)
        self.play(FadeOut(VGroup(s3, k1, k2, s4)), run_time=0.5)

        g1 = MathTex(r"\frac{(x+h)^2 - x^2}{h}", "=", r"\frac{h(2x + h)}{h}", "=", r"2x + h", r"\to", r"2x", font_size=48).move_to([0, 1.3, 0])
        g1[6].set_color(HL)
        deriv = MathTex(r"f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}", font_size=52).move_to([0, -1.2, 0])
        dbox = SurroundingRectangle(deriv, color=HL, buff=0.25)
        dname = Text("the derivative", font_size=28, color=HL).next_to(dbox, DOWN, buff=0.25)
        text = "At any x, the same moves give two x. This limit is the derivative, f prime of x."
        with self.beat(text) as vo:
            self.play(Write(g1[0]), run_time=0.8)
            self.play(Write(g1[1:3]), run_time=0.7)
            self.play(Write(g1[3:]), run_time=0.8)
            self.sync(vo, "This limit")
            self.play(Write(deriv), run_time=1.0)
            self.play(Create(dbox), FadeIn(dname), run_time=0.6)
        self.wait(0.4)
        self.clear_scene()

    # ------------------------------------------------------------------ 12
    def scene12(self):
        self.tag("Recap")
        specs = [
            ("approach, not the point", "(1.1, 1.2)"),
            ("both sides must agree", "(1.3)"),
            ("jump, blow-up, oscillation", "(1.4)"),
            ("plug in, then algebra", "(1.5, 1.6)"),
            ("long run: compare degrees", "(1.7)"),
            ("continuity: value = limit", "(1.8)"),
            (None, "(1.9)"),
            ("derivative = limit of secant slopes", "(1.10)"),
        ]
        rows = VGroup()
        for main, num in specs:
            if main is None:
                a = Tex(r"$\varepsilon$--$\delta$ contract", font_size=36)
            else:
                a = Text(main, font_size=30)
            b = Text(num, font_size=24, color=MUTED)
            rows.add(VGroup(a, b).arrange(RIGHT, buff=0.3))
        rows.arrange(DOWN, aligned_edge=LEFT, buff=0.28).move_to([0, -0.3, 0])
        bullets = VGroup(*[Dot(radius=0.06, color=PRIMARY).next_to(r, LEFT, buff=0.3) for r in rows])
        text = ("Recap. A limit is the value approached, not the value at the point. Both sides must agree. "
                "Limits fail by jumping, blowing up, or oscillating. Plug in, then use algebra. Long run, compare degrees. "
                "Continuity means value equals limit. Epsilon and delta make it precise. And secant slopes lead to the derivative.")
        keys = ["A limit is", "Both sides", "Limits fail", "Plug in", "Long run", "Continuity", "Epsilon", "And secant"]
        with self.beat(text) as vo:
            for k, r, b in zip(keys, rows, bullets):
                self.sync(vo, k, lead=0.1)
                self.play(FadeIn(r, shift=0.2 * RIGHT), FadeIn(b), run_time=0.5)
        self.play(FadeOut(VGroup(rows, bullets)), run_time=0.5)

        cen = np.array([-4.3, -0.4, 0])
        arc = Arc(radius=1.6, start_angle=0, angle=PI, color=INK, stroke_width=5).move_arc_center_to(cen)
        ticks = VGroup()
        tlabs = VGroup()
        for v in range(0, 141, 20):
            ang = PI - v / 140 * PI
            d = np.array([np.cos(ang), np.sin(ang), 0])
            ticks.add(Line(cen + d * 1.45, cen + d * 1.6, color=INK, stroke_width=3))
            tlabs.add(Text(str(v), font_size=16, color=MUTED).move_to(cen + d * 1.2))
        needle_ang = ValueTracker(PI)
        needle = always_redraw(lambda: Line(cen, cen + 1.3 * np.array([np.cos(needle_ang.get_value()), np.sin(needle_ang.get_value()), 0]),
                                            color=PRIMARY, stroke_width=5))
        hub = Dot(cen, radius=0.08, color=INK)
        kmh = Text("km/h", font_size=20, color=MUTED).move_to(cen + DOWN * 0.35)
        speedo = VGroup(arc, ticks, tlabs, hub, kmh)
        deriv = MathTex(r"f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}", font_size=48).move_to([1.8, -0.2, 0])
        nxt = Text("Next: Chapter 2 · Derivatives", font_size=40, color=PRIMARY, weight="BOLD")
        text = "Your speedometer is a limit-computing machine. Next up, Chapter two: Derivatives."
        with self.beat(text) as vo:
            self.play(FadeIn(speedo), FadeIn(needle), run_time=0.6)
            self.play(needle_ang.animate.set_value(PI - 62 / 140 * PI), run_time=1.2)
            self.play(Write(deriv), run_time=1.0)
            self.sync(vo, "Next up")
            needle.clear_updaters()
            self.play(FadeOut(VGroup(speedo, needle)), deriv.animate.scale(0.75).move_to([0, 1.2, 0]), run_time=0.9)
            nxt.move_to([0, -0.6, 0])
            self.play(FadeIn(nxt, shift=0.2 * UP), run_time=0.8)
        self.wait(2.0)
        self.play(*[FadeOut(m) for m in self.mobjects], run_time=1.0)
        self.wait(0.5)
