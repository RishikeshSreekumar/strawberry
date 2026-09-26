import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

# Side colours tuned for the light cream background.
OPP = ManimColor("#C08A00")  # opposite: dark mustard "yellow"
ADJ = ManimColor("#2F6DB5")  # adjacent: blue
HYP = GREEN  # hypotenuse: green
ANG = ACCENT  # angle arcs: orange
RED_ = PRIMARY  # emphasis
BROWN = ManimColor("#7A4E2D")
SEA = ManimColor("#1F4E79")


def P(x, y):
    return np.array([x, y, 0.0])


def seg(a, b, color, width=6):
    return Line(a, b, color=color, stroke_width=width)


def angle_arc(vertex, p1, p2, radius=0.6, color=ANG, width=5):
    """Arc at `vertex` sweeping counter-clockwise from ray vertex->p1 to vertex->p2."""
    return Angle(Line(vertex, p1), Line(vertex, p2), radius=radius, color=color, stroke_width=width)


def right_mark(vertex, p1, p2, size=0.25, color=INK):
    return RightAngle(Line(vertex, p1), Line(vertex, p2), length=size, color=color, stroke_width=3)


def strike(mob, color=RED_):
    return Line(mob.get_corner(DL) + 0.05 * DL, mob.get_corner(UR) + 0.05 * UR, color=color, stroke_width=5)


def label(text, size=30, color=INK, **kw):
    return Text(text, font_size=size, color=color, **kw)


def fit(mob, width):
    if mob.width > width:
        mob.scale_to_fit_width(width)
    return mob


class TrigCh0Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Trigonometry",
            "Angles and Ratios: Why Trigonometry Exists",
            "Chapter zero. Angles and ratios: why trigonometry exists.",
        )
        self.scene1()
        self.clear_scene()
        self.scene2()
        self.clear_scene()
        self.scene3()
        self.clear_scene()
        self.scene4()
        self.clear_scene()
        self.scene5()
        self.clear_scene()
        self.scene6()
        self.clear_scene()
        self.scene7()
        self.wait(1.5)

    # ------------------------------------------------------------------ Scene 1
    def scene1(self):
        A, B, C = P(-2, -2.5), P(2, -2.5), P(2, 0.86)
        ground = Line(P(-6, -2.5), P(6, -2.5), color=MUTED, stroke_width=3)
        trunk = Rectangle(width=0.3, height=3.36, color=BROWN, fill_color=BROWN, fill_opacity=1)
        trunk.move_to(P(2, -2.5 + 1.68))
        foliage = Circle(radius=0.7, color=GREEN, fill_color=GREEN, fill_opacity=0.8).move_to(P(2, 0.4))
        tree = VGroup(trunk, foliage)
        q = Text("?", font_size=96, color=RED_, weight="BOLD").move_to(P(3.2, -0.8))
        m1 = label("mountain", 34).move_to(P(-4.3, 2.8))
        m2 = label("radius of the Earth", 34).next_to(m1, DOWN, buff=0.5).align_to(m1, LEFT)
        x1 = Cross(m1, stroke_color=RED_, stroke_width=5)
        x2 = Cross(m2, stroke_color=RED_, stroke_width=5)

        with self.voiceover(
            "There is a tree in front of you. How tall is it? You could climb it. But you cannot climb a mountain."
        ) as vo:
            d = vo.duration
            self.play(Create(ground), FadeIn(trunk, shift=0.3 * UP), GrowFromCenter(foliage), run_time=0.2 * d)
            self.play(Write(q), run_time=0.15 * d)
            self.play(FadeIn(m1), run_time=0.12 * d)
            self.play(Create(x1), run_time=0.1 * d)
            self.play(FadeIn(m2), run_time=0.12 * d)
            self.play(Create(x2), run_time=0.1 * d)

        shadow = Line(B, A, color=MUTED, stroke_width=10)
        shadow_lbl = label("shadow", 28, MUTED).next_to(shadow, DOWN, buff=0.2)
        beam = DashedLine(A, C, color=HYP, stroke_width=5, dash_length=0.15)
        arc = angle_arc(A, B, C, radius=0.8)
        theta = MathTex(r"\theta", color=ANG).move_to(A + 1.15 * np.array([np.cos(0.35), np.sin(0.35), 0]))
        caption = label("Angles are easy. Lengths out of reach are hard.", 32).move_to(P(0, 3.3))

        with self.voiceover(
            "From the ground, you can measure the shadow, and the angle up to the treetop. "
            "Lengths out of reach are hard. Angles are easy."
        ) as vo:
            d = vo.duration
            self.play(FadeOut(VGroup(m1, m2, x1, x2, q)), run_time=0.08 * d)
            self.play(Create(shadow), FadeIn(shadow_lbl), run_time=0.12 * d)
            self.play(Create(beam), run_time=0.12 * d)
            self.play(Create(arc), Write(theta), run_time=0.1 * d)
            self.play(Circumscribe(shadow, color=RED_), run_time=0.14 * d)
            self.play(Circumscribe(VGroup(arc, theta), color=RED_), run_time=0.14 * d)
            self.play(FadeIn(caption, shift=0.2 * DOWN), run_time=0.12 * d)

        k = ValueTracker(1.0)

        def tri_pts():
            kv = k.get_value()
            return A, A + P(4 * kv, 0), A + P(4 * kv, 3.36 * kv)

        def build_tri():
            a, b, c = tri_pts()
            return VGroup(
                seg(a, b, ADJ), seg(b, c, OPP), seg(a, c, HYP),
                right_mark(b, a, c), angle_arc(a, b, c, radius=0.8),
            )

        live = always_redraw(build_tri)
        hyp_static = seg(A, C, HYP)

        def shadow_readout():
            a, b, _ = tri_pts()
            num = DecimalNumber(12 * k.get_value(), num_decimal_places=1, font_size=34, color=ADJ)
            g = VGroup(num, Text("m", font_size=30, color=ADJ)).arrange(RIGHT, buff=0.1)
            return g.move_to((a + b) / 2 + 0.45 * DOWN)

        def height_readout():
            _, b, c = tri_pts()
            num = DecimalNumber(10.07 * k.get_value(), num_decimal_places=2, font_size=34, color=OPP)
            g = VGroup(num, Text("m", font_size=30, color=OPP)).arrange(RIGHT, buff=0.1)
            return g.next_to((b + c) / 2, RIGHT, buff=0.25)

        sr = always_redraw(shadow_readout)
        hr = always_redraw(height_readout)

        def theta_pos():
            return A + 1.15 * np.array([np.cos(0.35), np.sin(0.35), 0])

        ratio_lhs = MathTex(r"\frac{\text{height}}{\text{shadow}} =")
        ratio_val = DecimalNumber(0.839, num_decimal_places=3, font_size=48, color=INK)
        ratio = VGroup(ratio_lhs, ratio_val).arrange(RIGHT, buff=0.2).move_to(P(-3.8, 2.4))

        with self.voiceover(
            "Shadow and tree form a right triangle. Keep the angle fixed and grow the picture. "
            "Both lengths change. Their ratio does not budge."
        ) as vo:
            d = vo.duration
            self.play(
                FadeOut(tree), FadeOut(caption), FadeOut(shadow_lbl), FadeOut(arc),
                ReplacementTransform(beam, hyp_static), run_time=0.12 * d,
            )
            self.remove(shadow, hyp_static)
            self.add(live)
            theta.add_updater(lambda m: m.move_to(theta_pos()))
            self.play(FadeIn(sr), FadeIn(hr), FadeIn(ratio), run_time=0.1 * d)
            self.play(k.animate.set_value(1.3), run_time=0.2 * d)
            self.play(k.animate.set_value(0.7), run_time=0.25 * d)
            self.play(k.animate.set_value(1.0), run_time=0.15 * d)
            self.play(Flash(ratio_val, color=GREEN, flash_radius=0.7), ratio_val.animate.set_color(GREEN),
                      run_time=0.12 * d)

        live.clear_updaters()
        sr.clear_updaters()
        hr.clear_updaters()
        theta.clear_updaters()
        twelve = MathTex(r"12\text{ m}", color=ADJ).move_to(sr)
        forty = MathTex(r"40^\circ", color=ANG).move_to(theta).shift(0.2 * RIGHT)
        eq1 = MathTex(r"\text{height}", "=", r"\text{shadow} \times (\text{a number fixed by the angle})")
        fit(eq1, 12).move_to(P(0, 2.9))
        eq2 = MathTex(r"\text{height}", "=", r"12 \times 0.839 \approx 10.1\text{ m}").move_to(P(0, 2.9))
        tenpt = MathTex(r"10.1\text{ m}", color=OPP).next_to((B + C) / 2, RIGHT, buff=0.25)

        with self.voiceover(
            "A twelve meter shadow at forty degrees gives a ratio of about zero point eight three nine. "
            "So the tree is about ten point one meters tall."
        ) as vo:
            d = vo.duration
            self.play(ReplacementTransform(sr, twelve), ReplacementTransform(theta, forty),
                      FadeOut(hr), FadeOut(ratio), run_time=0.15 * d)
            self.play(Write(eq1), run_time=0.3 * d)
            self.play(TransformMatchingTex(eq1, eq2), run_time=0.2 * d)
            self.play(Write(tenpt), run_time=0.15 * d)

        with self.voiceover("Angle in, ratio out. That trade is the whole subject.") as vo:
            d = vo.duration
            self.play(*[FadeOut(m) for m in self.mobjects], run_time=0.2 * d)
            big = Text("Angle in, ratio out.", font_size=64, weight="BOLD")
            ul = Line(big.get_corner(DL) + 0.2 * DOWN, big.get_corner(DR) + 0.2 * DOWN, color=ANG, stroke_width=8)
            self.play(Write(big), run_time=0.35 * d)
            self.play(Create(ul), run_time=0.25 * d)

    # ------------------------------------------------------------------ Scene 2
    def scene2(self):
        O = P(-6, -2.5)
        t30 = np.tan(np.radians(30))
        tris = VGroup()
        tops = []
        for i, leg in enumerate([1.25, 2.5, 5.0]):
            b = O + P(leg, 0)
            c = b + P(0, leg * t30)
            col = interpolate_color(GREEN, BG, 0.22 * i)
            tris.add(Polygon(O, b, c, color=col, stroke_width=5))
            tops.append((b, c))
        marks = VGroup(*[right_mark(b, O, c, size=0.18, color=MUTED) for b, c in tops])
        arc = angle_arc(O, tops[2][0], tops[2][1], radius=0.7)
        th = MathTex(r"\theta", color=ANG).move_to(O + 1.0 * np.array([np.cos(0.27), np.sin(0.27), 0]))
        head = label("Similar: same angles, same shape, different size", 30).move_to(P(0, 3.3))

        with self.voiceover(
            "Why is the ratio fixed by the angle? Triangles with matching angles are similar: "
            "the same shape at different sizes."
        ) as vo:
            d = vo.duration
            self.play(LaggedStart(*[Create(t) for t in tris], lag_ratio=0.4), run_time=0.4 * d)
            self.play(FadeIn(marks), Create(arc), Write(th), run_time=0.15 * d)
            self.play(FadeIn(head, shift=0.2 * DOWN), run_time=0.2 * d)

        sum_eq = MathTex(r"90^\circ + \theta + (", r"\text{third angle}", r") = 180^\circ", font_size=40)
        fit(sum_eq, 5.6).move_to(P(3.6, 1.5))
        top_arcs = VGroup(*[
            angle_arc(c, O, b, radius=r) for (b, c), r in zip(tops, [0.22, 0.3, 0.45])
        ])

        with self.voiceover(
            "In a right triangle, fix one acute angle theta. The angles add to one hundred eighty degrees, "
            "so the third angle has no choice. Only the size is free."
        ) as vo:
            d = vo.duration
            self.play(Indicate(th, color=RED_), run_time=0.15 * d)
            self.play(Write(sum_eq), run_time=0.3 * d)
            self.play(sum_eq[1].animate.set_color(ANG), run_time=0.1 * d)
            self.play(LaggedStart(*[Create(a) for a in top_arcs], lag_ratio=0.3), run_time=0.2 * d)

        kfrac = MathTex(
            r"\frac{", "k", r"\cdot \text{opposite}}{", "k",
            r"\cdot \text{hypotenuse}}", "=", r"\frac{\text{opposite}}{\text{hypotenuse}}",
        )
        fit(kfrac, 5.8).move_to(P(3.6, -0.6))

        with self.voiceover(
            "Scale the triangle by k. Every side is multiplied by k, and in a ratio the k on top cancels "
            "the k on the bottom. The lengths scaled. The ratio did not."
        ) as vo:
            d = vo.duration
            self.play(Write(kfrac), run_time=0.25 * d)
            self.play(kfrac[1].animate.set_color(RED_), kfrac[3].animate.set_color(RED_), run_time=0.1 * d)
            self.play(Create(strike(kfrac[1])), Create(strike(kfrac[3])), run_time=0.2 * d)
            self.play(Indicate(kfrac[6], color=GREEN), run_time=0.2 * d)

        # Beat d: three stacked 30-60-90 triangles and their ratios.
        rows = VGroup()
        smalls = VGroup()
        for name, h, y, tex in [
            ("A", 1.3, 2.0, r"A:\ \tfrac{3}{6} =\;"),
            ("B", 1.9, 0.0, r"B:\ \tfrac{6}{12} =\;"),
            ("C", 2.6, -2.0, r"C:\ \tfrac{30}{60} =\;"),
        ]:
            a = P(-5, y - h / 4)
            b = a + P(h * np.cos(np.radians(30)), 0)
            c = b + P(0, h / 2)
            t = VGroup(
                seg(a, b, ADJ, 4), seg(b, c, OPP, 4), seg(a, c, HYP, 4),
                right_mark(b, a, c, size=0.15), angle_arc(a, b, c, radius=0.3, width=3),
            )
            tag = label(name, 28, MUTED).next_to(a, LEFT, buff=0.3).shift(0.15 * UP)
            smalls.add(VGroup(t, tag))
            r = MathTex(tex, "0.5").scale(1.15).move_to(P(2.5, y))
            rows.add(r)
        rows.arrange(DOWN, buff=1.2, aligned_edge=LEFT).move_to(P(2.5, 0))
        for r, y in zip(rows, [2.0, 0.0, -2.0]):
            r.set_y(y)
            r.shift((3.4 - r[1].get_left()[0]) * RIGHT)
        cap = label("bigger triangle, bigger ratio", 28).move_to(P(0, 3.4))

        with self.voiceover(
            "So a bigger triangle does not have a bigger ratio. Opposite over hypotenuse: three over six is "
            "one half. Six over twelve, one half. Thirty over sixty, still one half."
        ) as vo:
            d = vo.duration
            self.play(*[FadeOut(m) for m in self.mobjects], run_time=0.08 * d)
            self.play(FadeIn(cap), run_time=0.08 * d)
            self.play(Create(Cross(cap, stroke_color=RED_, stroke_width=5)), run_time=0.1 * d)
            for i in range(3):
                self.play(FadeIn(smalls[i]), FadeIn(rows[i]), run_time=0.14 * d)
            box = SurroundingRectangle(VGroup(*[r[1] for r in rows]), color=GREEN, buff=0.12, stroke_width=5)
            self.play(Create(box), run_time=0.12 * d)

    # ------------------------------------------------------------------ Scene 3
    def scene3(self):
        A, B, C = P(-5, -2), P(0, -2), P(0, 1)
        ab, bc, ac = seg(A, B, ADJ), seg(B, C, OPP), seg(A, C, HYP)
        rm = right_mark(B, A, C, size=0.3)
        arcA = angle_arc(A, B, C, radius=0.8)
        thA = MathTex(r"\theta", color=ANG).move_to(A + 1.15 * np.array([np.cos(0.27), np.sin(0.27), 0]))
        l_hyp = label("hypotenuse", 30, HYP).rotate(np.arctan2(3, 5)).move_to((A + C) / 2 + 0.45 * P(-3, 5) / np.hypot(3, 5))
        pos_right = (B + C) / 2 + P(0.95, 0)
        pos_below = (A + B) / 2 + P(0, -0.45)
        l_opp = label("opposite", 30, OPP).move_to(pos_right)
        l_adj = label("adjacent", 30, ADJ).move_to(pos_below)

        with self.voiceover(
            "The hypotenuse is the long side, across from the right angle. The opposite side is across from theta. "
            "The adjacent side runs from theta to the right angle."
        ) as vo:
            d = vo.duration
            self.play(Create(VGroup(ab, bc, ac)), Create(rm), Create(arcA), Write(thA), run_time=0.15 * d)
            self.play(Write(l_hyp), Indicate(ac, color=HYP), run_time=0.2 * d)
            self.play(Write(l_opp), Indicate(bc, color=OPP), run_time=0.2 * d)
            self.play(Write(l_adj), Indicate(ab, color=ADJ), run_time=0.2 * d)

        arcC = angle_arc(C, A, B, radius=0.7)
        thC = MathTex(r"\theta", color=ANG).move_to(C + 1.0 * np.array([np.cos(-1.8), np.sin(-1.8), 0]))

        with self.voiceover(
            "Switch to the other acute angle, and the two legs swap names. Only the hypotenuse keeps its identity."
        ) as vo:
            d = vo.duration
            self.play(ReplacementTransform(arcA, arcC), ReplacementTransform(thA, thC), run_time=0.2 * d)
            self.play(
                l_opp.animate.move_to(pos_below).set_color(ADJ), l_adj.animate.move_to(pos_right).set_color(OPP),
                ab.animate.set_color(OPP), bc.animate.set_color(ADJ), run_time=0.3 * d,
            )
            self.play(Indicate(l_hyp, color=HYP, scale_factor=1.25), run_time=0.2 * d)

        arcA = angle_arc(A, B, C, radius=0.8)
        thA = MathTex(r"\theta", color=ANG).move_to(A + 1.15 * np.array([np.cos(0.27), np.sin(0.27), 0]))
        defs = VGroup(
            MathTex(r"\sin\theta = \frac{", r"\text{opp}", "}{", r"\text{hyp}", "}"),
            MathTex(r"\cos\theta = \frac{", r"\text{adj}", "}{", r"\text{hyp}", "}"),
            MathTex(r"\tan\theta = \frac{", r"\text{opp}", "}{", r"\text{adj}", "}"),
        )
        cmap = {r"\text{opp}": OPP, r"\text{adj}": ADJ, r"\text{hyp}": HYP}
        for dm in defs:
            dm[1].set_color(cmap[dm.submobjects[1].tex_string])
            dm[3].set_color(cmap[dm.submobjects[3].tex_string])
        defs.arrange(DOWN, buff=0.45, aligned_edge=LEFT).move_to(P(4.4, 0.4))

        with self.voiceover(
            "Now the names. Sine of theta is opposite over hypotenuse. Cosine is adjacent over hypotenuse. "
            "Tangent is opposite over adjacent. These are labels stuck on ratios that already existed."
        ) as vo:
            d = vo.duration
            self.play(
                ReplacementTransform(arcC, arcA), ReplacementTransform(thC, thA),
                l_opp.animate.move_to(pos_right).set_color(OPP), l_adj.animate.move_to(pos_below).set_color(ADJ),
                ab.animate.set_color(ADJ), bc.animate.set_color(OPP), run_time=0.12 * d,
            )
            self.play(Write(defs[0]), run_time=0.18 * d)
            self.play(Write(defs[1]), run_time=0.16 * d)
            self.play(Write(defs[2]), run_time=0.16 * d)
            self.play(Circumscribe(defs, color=ANG), run_time=0.2 * d)

        soh = label("SOH CAH TOA: a label, not the reason", 26, MUTED).next_to(defs, DOWN, buff=0.5)
        fit(soh, 6.2)
        soh.set_x(3.8)
        tri = VGroup(ab, bc, ac, rm, arcA, thA, l_hyp, l_opp, l_adj)
        pivot = P(-2.5, 0.2)

        with self.voiceover(
            "You may know this as soh-cah-toa. Treat it as a label, not as the reason. The reason is the "
            "cancellation you just saw. Letters alone fail on a triangle drawn sideways."
        ) as vo:
            d = vo.duration
            self.play(FadeIn(soh), run_time=0.15 * d)
            self.wait(0.3 * d)
            self.play(Rotate(tri, PI / 2, about_point=pivot), run_time=0.2 * d)
            self.play(Indicate(ac, color=HYP), run_time=0.12 * d)
            self.play(Rotate(tri, -PI / 2, about_point=pivot), run_time=0.15 * d)

        # Beat e: live triangle.
        top_defs = defs.copy()
        top_defs.arrange(RIGHT, buff=0.5).scale(0.8).move_to(P(3.6, 3.1))
        th = ValueTracker(30.0)
        A2 = P(-5, -2.5)
        R = 3.5

        def live_tri():
            t = np.radians(th.get_value())
            b = A2 + P(R * np.cos(t), 0)
            c = b + P(0, R * np.sin(t))
            return VGroup(
                seg(A2, b, ADJ), seg(b, c, OPP), seg(A2, c, HYP),
                right_mark(b, A2, c, size=min(0.25, 0.8 * R * np.sin(t)) if np.sin(t) > 0.05 else 0.1),
                angle_arc(A2, b, c, radius=0.7),
            )

        live = always_redraw(live_tri)
        ang_read = always_redraw(lambda: VGroup(
            MathTex(r"\theta ="), DecimalNumber(th.get_value(), num_decimal_places=0, unit=r"^\circ", color=INK),
        ).arrange(RIGHT, buff=0.15).move_to(P(-3.3, -3.3)))

        def readout(tex, fn, y):
            def make():
                v = fn(np.radians(th.get_value()))
                lhs = MathTex(tex)
                num = DecimalNumber(v, num_decimal_places=3, color=INK)
                if tex.startswith(r"\tan") and v > 10:
                    num.set_color(RED_)
                g = VGroup(lhs, num).arrange(RIGHT, buff=0.2)
                g.move_to(P(3.0, y), aligned_edge=LEFT).shift(1.3 * LEFT)
                return g
            return always_redraw(make)

        rs = VGroup(
            readout(r"\sin\theta =", np.sin, 0.6),
            readout(r"\cos\theta =", np.cos, -0.3),
            readout(r"\tan\theta =", np.tan, -1.2),
        )
        bound = MathTex(r"\sin\theta \le 1,\ \cos\theta \le 1", color=GREEN).move_to(P(3.2, -3.0))

        with self.voiceover(
            "Push the angle toward zero: sine falls, cosine climbs toward one. Near ninety degrees they trade places, "
            "and tangent runs away. Sine and cosine never exceed one, because the hypotenuse is the longest side."
        ) as vo:
            d = vo.duration
            self.play(FadeOut(tri), FadeOut(soh), ReplacementTransform(defs, top_defs), run_time=0.08 * d)
            self.play(FadeIn(live), FadeIn(ang_read), FadeIn(rs), run_time=0.07 * d)
            self.play(th.animate.set_value(5), run_time=0.2 * d)
            self.play(th.animate.set_value(85), run_time=0.3 * d, rate_func=linear)
            self.play(Write(bound), run_time=0.15 * d)
            self.play(Circumscribe(bound, color=GREEN), run_time=0.1 * d)

        live.clear_updaters()
        ang_read.clear_updaters()
        for r in rs:
            r.clear_updaters()
        ident = MathTex(
            r"\frac{\sin\theta}{\cos\theta} = \frac{\text{opp}/", r"\text{hyp}", r"}{\text{adj}/",
            r"\text{hyp}", r"} = \frac{\text{opp}}{\text{adj}}", "=", r"\tan\theta",
        ).scale(1.2)
        fit(ident, 12).move_to(ORIGIN)

        with self.voiceover(
            "Divide sine by cosine. The hypotenuses cancel, leaving opposite over adjacent. "
            "Tangent is sine over cosine. Your first identity."
        ) as vo:
            d = vo.duration
            self.play(*[FadeOut(m) for m in self.mobjects], run_time=0.1 * d)
            self.play(Write(ident), run_time=0.3 * d)
            self.play(ident[1].animate.set_color(RED_), ident[3].animate.set_color(RED_), run_time=0.08 * d)
            self.play(Create(strike(ident[1])), Create(strike(ident[3])), run_time=0.15 * d)
            self.play(Create(SurroundingRectangle(VGroup(ident[5], ident[6]), color=GREEN, buff=0.15)),
                      run_time=0.15 * d)

    # ------------------------------------------------------------------ Scene 4
    def scene4(self):
        steps = VGroup(
            label("1. Draw it", 34),
            label("2. Pick the angle, label opp / adj / hyp", 34),
            label("3. Choose the ratio", 34),
            label("4. Solve, then check", 34),
        ).arrange(DOWN, buff=0.45, aligned_edge=LEFT).move_to(P(-2.2, 1.0))
        subs = VGroup(
            MathTex(r"\text{other angle} = 90^\circ - \theta", font_size=36),
            MathTex(r"a^2 + b^2 = c^2", font_size=36),
        ).arrange(DOWN, buff=0.25, aligned_edge=LEFT).next_to(steps[3], DOWN, buff=0.35).shift(0.6 * RIGHT)
        steps.shift(0.4 * UP)
        subs.shift(0.4 * UP)
        # small reference triangle on the right
        a, b, c = P(3.2, -2.6), P(6.2, -2.6), P(6.2, -0.6)
        ref = VGroup(seg(a, b, ADJ, 4), seg(b, c, OPP, 4), seg(a, c, HYP, 4),
                     right_mark(b, a, c, size=0.2), angle_arc(a, b, c, radius=0.5, width=3))

        with self.voiceover(
            "You need two facts besides the right angle, one of them a side. Pick your angle, label the sides, "
            "and choose the ratio linking what you know to what you want. Then check: the other angle is ninety "
            "minus yours, and Pythagoras confirms the last side."
        ) as vo:
            d = vo.duration
            self.play(Create(ref), run_time=0.15 * d)
            self.wait(0.1 * d)
            self.play(FadeIn(steps[0], shift=0.2 * RIGHT), run_time=0.08 * d)
            self.play(FadeIn(steps[1], shift=0.2 * RIGHT), run_time=0.1 * d)
            self.play(FadeIn(steps[2], shift=0.2 * RIGHT), run_time=0.1 * d)
            self.play(FadeIn(steps[3], shift=0.2 * RIGHT), run_time=0.1 * d)
            self.play(FadeIn(subs[0]), run_time=0.12 * d)
            self.play(FadeIn(subs[1]), run_time=0.12 * d)

        # Ladder
        foot, top = P(-2.69, -2.5), P(-1, 1.13)
        wall_base = P(-1, -2.5)
        wall = Line(P(-1, -2.5), P(-1, 2), color=INK, stroke_width=6)
        ground = Line(P(-6, -2.5), P(-1, -2.5), color=INK, stroke_width=4)
        ladder = seg(foot, top, HYP, 7)
        arc = angle_arc(foot, wall_base, top, radius=0.6)
        a65 = MathTex(r"65^\circ", color=ANG, font_size=34).next_to(arc, RIGHT, buff=0.08).shift(0.05 * UP)
        a65.move_to(foot + 1.05 * np.array([np.cos(0.55), np.sin(0.55), 0]))
        l4 = MathTex(r"4\text{ m}", color=HYP).next_to((foot + top) / 2, LEFT, buff=0.35)
        hbrace = Brace(Line(wall_base, top), RIGHT, color=OPP)
        hlab = MathTex("h", color=OPP).next_to(hbrace, RIGHT, buff=0.15)
        e1 = MathTex(r"\sin 65^\circ = \frac{h}{4}")
        e2 = MathTex(r"h = 4\sin 65^\circ \approx 3.63\text{ m}")
        eqs = VGroup(e1, e2).arrange(DOWN, buff=0.4, aligned_edge=LEFT).move_to(P(3.6, 0.3))

        with self.voiceover(
            "A four meter ladder leans at sixty five degrees. How high does it reach? The ladder is the hypotenuse, "
            "the height is opposite. That means sine: four times sine of sixty five degrees, about three point six three meters."
        ) as vo:
            d = vo.duration
            self.play(FadeOut(steps), FadeOut(subs), FadeOut(ref), run_time=0.06 * d)
            self.play(Create(ground), Create(wall), run_time=0.08 * d)
            self.play(Create(ladder), Create(arc), Write(a65), Write(l4), run_time=0.15 * d)
            self.play(GrowFromCenter(hbrace), Write(hlab), run_time=0.1 * d)
            self.play(Indicate(ladder, color=HYP), run_time=0.1 * d)
            self.play(Indicate(hlab, color=OPP), run_time=0.08 * d)
            self.play(Write(e1), run_time=0.15 * d)
            self.play(Write(e2), run_time=0.15 * d)

        bbrace = Brace(Line(foot, wall_base), DOWN, color=ADJ)
        blab = MathTex(r"1.7\text{ m}", color=ADJ, font_size=36).next_to(bbrace, DOWN, buff=0.1)
        lL = MathTex("L", color=HYP).move_to(l4)
        c1 = MathTex(r"\cos 65^\circ = \frac{1.7}{", "L", "}")
        c2 = MathTex(r"L = \frac{1.7}{\cos 65^\circ} \approx 4.02\text{ m}")
        ceqs = VGroup(c1, c2).arrange(DOWN, buff=0.4, aligned_edge=LEFT).move_to(P(3.6, 1.0))
        tag = label("unknown underneath: divide", 24, RED_).next_to(ceqs, DOWN, buff=0.35)
        chk = MathTex(r"4.02 \approx 4 \checkmark", color=MUTED).next_to(tag, DOWN, buff=0.35)

        with self.voiceover(
            "Suppose you only knew the foot is one point seven meters out. How long is the ladder? Adjacent over "
            "hypotenuse, so cosine. The unknown sits underneath, so divide: about four point zero two meters, "
            "which agrees with four."
        ) as vo:
            d = vo.duration
            self.play(FadeOut(hbrace), FadeOut(hlab), FadeOut(eqs), run_time=0.08 * d)
            self.play(GrowFromCenter(bbrace), Write(blab), ReplacementTransform(l4, lL), run_time=0.15 * d)
            self.wait(0.12 * d)
            self.play(Write(c1), run_time=0.15 * d)
            self.play(c1[1].animate.set_color(RED_), Indicate(c1[1], color=RED_), FadeIn(tag), run_time=0.12 * d)
            self.play(Write(c2), run_time=0.15 * d)
            self.play(FadeIn(chk), run_time=0.1 * d)

        # Ramp
        r0, r1, r2 = P(-5, -2), P(5, -2), P(5, -0.4)
        run_ = seg(r0, r1, ADJ)
        rise = seg(r1, r2, OPP)
        slope = seg(r0, r2, HYP)
        rarc = angle_arc(r0, r1, r2, radius=2)
        rth = MathTex(r"\theta", color=ANG, font_size=36).move_to(r0 + P(2.35, 0.17))
        l5 = MathTex(r"5\text{ m}", color=ADJ).next_to(run_, DOWN, buff=0.2)
        l08 = MathTex(r"0.8\text{ m}", color=OPP).next_to(rise, RIGHT, buff=0.15)
        t1 = MathTex(r"\tan\theta = \frac{0.8}{5} = 0.16").move_to(P(-2.5, 2.4))
        t2 = MathTex(r"\theta = \tan^{", "-1", r"}(0.16) \approx 9.1^\circ").next_to(t1, DOWN, buff=0.45).align_to(t1, LEFT)

        with self.voiceover(
            "A ramp rises zero point eight meters over a five meter run. Opposite over adjacent is tangent: "
            "zero point one six. Which angle gives that ratio? Inverse tangent answers: about nine point one degrees."
        ) as vo:
            d = vo.duration
            self.play(*[FadeOut(m) for m in self.mobjects], run_time=0.06 * d)
            self.play(Create(run_), Write(l5), run_time=0.12 * d)
            self.play(Create(rise), Write(l08), run_time=0.1 * d)
            self.play(Create(slope), Create(rarc), Write(rth), run_time=0.12 * d)
            self.play(Write(t1), run_time=0.2 * d)
            self.wait(0.1 * d)
            self.play(Write(t2), run_time=0.2 * d)

        neq = MathTex(r"\tan^{-1}x", r"\ne", r"\frac{1}{\tan x}")
        neq[1].set_color(RED_)
        neq.move_to(P(3.6, 2.2))
        rio = label("ratio in, angle out", 26, MUTED).next_to(neq, DOWN, buff=0.35)

        with self.voiceover(
            "That minus one is not a power. Inverse tangent means ratio in, angle out. It is not one over tangent."
        ) as vo:
            d = vo.duration
            self.play(t2[1].animate.set_color(RED_), run_time=0.1 * d)
            self.play(Indicate(t2[1], color=RED_, scale_factor=1.6), run_time=0.25 * d)
            self.play(FadeIn(rio), run_time=0.15 * d)
            self.play(Write(neq), run_time=0.3 * d)

        # Cliff and boat
        Pt, Q = P(-5, 1.8), P(5, -1.84)
        cliff = Polygon(P(-6.5, -3), P(-6.5, 1.8), P(-5, 1.8), P(-4.6, -3), color=MUTED, fill_color=MUTED,
                        fill_opacity=0.6, stroke_width=2)
        sea = Line(P(-4.6, -2.1), P(6.5, -2.1), color=SEA, stroke_width=5)
        hull = Polygon(P(4.6, -2.1), P(5.4, -2.1), P(5.6, -1.84), P(4.4, -1.84), color=BROWN,
                       fill_color=BROWN, fill_opacity=1, stroke_width=2)
        h_top = DashedLine(Pt, P(6, 1.8), color=MUTED, stroke_width=3)
        h_bot = DashedLine(P(-6, -1.84), Q, color=MUTED, stroke_width=3)
        sight = Line(Pt, Q, color=INK, stroke_width=4)
        dep = angle_arc(Pt, Q, Pt + RIGHT, radius=1.3)
        ele = angle_arc(Q, Pt, Q + LEFT, radius=1.3)
        dep_l = label("depression 20°", 26, ANG).move_to(P(-1.6, 1.45))
        ele_l = label("elevation 20°", 26, ANG).move_to(P(1.7, -1.5))
        eqtop = MathTex(r"20^\circ = 20^\circ", color=ANG).move_to(P(0, 3.2))
        dot_obs = Dot(Pt, color=INK, radius=0.07)

        with self.voiceover(
            "Elevation and depression are measured from the horizontal. The two horizontal lines are parallel, "
            "so these are alternate angles, and they are equal. Twenty degrees down from the cliff is twenty "
            "degrees up from the boat."
        ) as vo:
            d = vo.duration
            self.play(*[FadeOut(m) for m in self.mobjects], run_time=0.05 * d)
            self.play(FadeIn(cliff), Create(sea), FadeIn(hull), FadeIn(dot_obs), run_time=0.1 * d)
            self.play(Create(h_top), Create(h_bot), Create(sight), run_time=0.12 * d)
            self.play(Create(dep), FadeIn(dep_l), Create(ele), FadeIn(ele_l), run_time=0.1 * d)
            self.play(Indicate(h_top, color=RED_), Indicate(h_bot, color=RED_), run_time=0.14 * d)
            self.play(Indicate(dep, color=RED_, scale_factor=1.3), Indicate(ele, color=RED_, scale_factor=1.3),
                      run_time=0.14 * d)
            self.play(Write(eqtop), run_time=0.15 * d)

    # ------------------------------------------------------------------ Scene 5
    def scene5(self):
        head = label("Don't memorize the table. Redraw the triangle.", 32).move_to(P(0, 3.3))
        L, R = P(-2, -2), P(2, -2)
        T = P(0, 2 * np.sqrt(3) - 2)
        M = P(0, -2)
        left_side = seg(L, T, HYP, 5)
        right_side = seg(R, T, HYP, 5)
        base_l = seg(L, M, INK, 5)
        base_r = seg(M, R, INK, 5)
        lab_l = MathTex("2").move_to((L + T) / 2 + P(-0.4, 0.15))
        lab_r = MathTex("2").move_to((R + T) / 2 + P(0.4, 0.15))
        lab_b = MathTex("2").next_to(M, DOWN, buff=0.2)
        arcL = angle_arc(L, R, T, radius=0.5)
        arcR = angle_arc(R, T, L, radius=0.5)
        arcT = angle_arc(T, L, R, radius=0.5)
        s60 = VGroup(*[MathTex(r"60^\circ", font_size=28, color=ANG) for _ in range(3)])
        s60[0].move_to(L + P(0.85, 0.3))
        s60[1].move_to(R + P(-0.85, 0.3))
        s60[2].move_to(T + P(0.55, -0.95))
        alt = DashedLine(T, M, color=MUTED, stroke_width=4)

        with self.voiceover(
            "A few values are exact. Don't memorize the table. Redraw the triangle. Take an equilateral triangle "
            "of side two, and cut it down the middle."
        ) as vo:
            d = vo.duration
            self.play(FadeIn(head), run_time=0.15 * d)
            self.wait(0.1 * d)
            self.play(Create(VGroup(base_l, base_r, right_side, left_side)), run_time=0.2 * d)
            self.play(Write(VGroup(lab_l, lab_r, lab_b)), run_time=0.12 * d)
            self.play(Create(VGroup(arcL, arcR, arcT)), FadeIn(s60), run_time=0.12 * d)
            self.play(Create(alt), run_time=0.15 * d)

        # keep right half
        shift = 2.5 * LEFT
        half_alt = seg(T, M, INK, 5)
        rm = right_mark(M, R, T, size=0.25)
        arc30 = angle_arc(T, M, R, radius=0.7)
        l30 = MathTex(r"30^\circ", font_size=28, color=ANG).move_to(T + P(0.36, -1.1))
        l1 = MathTex("1").next_to((M + R) / 2, DOWN, buff=0.2)
        l2 = MathTex("2").move_to((R + T) / 2 + P(0.4, 0.15))
        lr3 = MathTex(r"\sqrt{3}").next_to((M + T) / 2, LEFT, buff=0.2)
        heq = MathTex(r"h = \sqrt{2^2 - 1^2} = \sqrt{3}").move_to(P(3.3, 0.5))

        with self.voiceover(
            "The cut makes a thirty degree angle and a base of one. Pythagoras gives the height: root of two "
            "squared minus one squared, which is root three. So the sides are one, root three, and two."
        ) as vo:
            d = vo.duration
            self.play(
                FadeOut(VGroup(left_side, base_l, lab_l, lab_b, arcL, s60[0], arcT, s60[2])),
                ReplacementTransform(alt, half_alt), run_time=0.12 * d,
            )
            self.play(Create(rm), Create(arc30), Write(l30), Write(l1), ReplacementTransform(lab_r, l2),
                      run_time=0.15 * d)
            keep = VGroup(right_side, base_r, half_alt, rm, arc30, l30, l1, l2, arcR, s60[1])
            self.play(keep.animate.shift(shift), run_time=0.12 * d)
            lr3.shift(shift)
            self.play(Write(heq), run_time=0.25 * d)
            self.play(Write(lr3), run_time=0.12 * d)

        T2, M2, R2 = T + shift, M + shift, R + shift
        b30 = MathTex(r"\sin 30^\circ = \tfrac12,\ \cos 30^\circ = \tfrac{\sqrt3}{2},\ \tan 30^\circ = \tfrac{1}{\sqrt3}")
        fit(b30, 6.4).move_to(P(3.3, 1.6))
        b60 = MathTex(r"\sin 60^\circ = \tfrac{\sqrt3}{2},\ \cos 60^\circ = \tfrac12,\ \tan 60^\circ = \sqrt3")
        fit(b60, 6.4).move_to(P(3.3, -1.0))
        box30 = SurroundingRectangle(b30, color=ANG, buff=0.2)
        box60 = SurroundingRectangle(b60, color=ANG, buff=0.2)
        arc60 = angle_arc(R2, T2, M2, radius=0.7, width=6)

        with self.voiceover(
            "From the thirty degree corner: sine is one half, cosine is root three over two, tangent is one over "
            "root three. From the sixty degree corner the legs swap: sine is root three over two, cosine is one "
            "half, tangent is root three."
        ) as vo:
            d = vo.duration
            self.play(FadeOut(heq), Indicate(VGroup(arc30, l30), color=RED_), run_time=0.08 * d)
            self.play(base_r.animate.set_color(OPP), half_alt.animate.set_color(ADJ),
                      l1.animate.set_color(OPP), lr3.animate.set_color(ADJ), run_time=0.07 * d)
            self.play(Write(b30), run_time=0.2 * d)
            self.play(Create(box30), run_time=0.08 * d)
            self.play(FadeOut(arc30), FadeOut(arcR), Create(arc60), s60[1].animate.set_color(RED_),
                      l30.animate.set_opacity(0.4), run_time=0.07 * d)
            self.play(base_r.animate.set_color(ADJ), half_alt.animate.set_color(OPP),
                      l1.animate.set_color(ADJ), lr3.animate.set_color(OPP), run_time=0.07 * d)
            self.play(Write(b60), run_time=0.2 * d)
            self.play(Create(box60), run_time=0.08 * d)
        self.wait(1)

        # 45 degrees
        s0, s1, s2, s3 = P(-2, -2.3), P(1, -2.3), P(1, 0.7), P(-2, 0.7)
        sq_left = seg(s0, s3, MUTED, 4)
        sq_top = seg(s3, s2, MUTED, 4)
        sq_bot = seg(s0, s1, ADJ, 5)
        sq_right = seg(s1, s2, OPP, 5)
        diag = seg(s0, s2, HYP, 5)
        lb = MathTex("1", color=ADJ).next_to(sq_bot, DOWN, buff=0.2)
        lrr = MathTex("1", color=OPP).next_to(sq_right, RIGHT, buff=0.2)
        ld = MathTex(r"\sqrt2", color=HYP).move_to((s0 + s2) / 2 + P(-0.4, 0.4))
        a1 = angle_arc(s0, s1, s2, radius=0.6)
        a2 = angle_arc(s2, s0, s1, radius=0.6)
        l45a = MathTex(r"45^\circ", font_size=28, color=ANG).move_to(s0 + P(0.95, 0.38))
        l45b = MathTex(r"45^\circ", font_size=28, color=ANG).move_to(s2 + P(-0.38, -0.95))
        rm45 = right_mark(s1, s0, s2, size=0.25)
        b45 = MathTex(r"\sin 45^\circ = \cos 45^\circ = \tfrac{1}{\sqrt2} = \tfrac{\sqrt2}{2},\quad \tan 45^\circ = 1")
        fit(b45, 12).move_to(P(0, 2.4))
        box45 = SurroundingRectangle(b45, color=ANG, buff=0.2)

        with self.voiceover(
            "For forty five degrees, cut a square of side one along its diagonal. The diagonal is root two. "
            "So sine and cosine of forty five are both one over root two, and tangent is exactly one."
        ) as vo:
            d = vo.duration
            self.play(*[FadeOut(m) for m in self.mobjects], run_time=0.06 * d)
            self.play(Create(VGroup(sq_bot, sq_right, sq_top, sq_left)), run_time=0.12 * d)
            self.play(Create(diag), run_time=0.1 * d)
            self.play(FadeOut(sq_left), FadeOut(sq_top), Create(rm45), Write(lb), Write(lrr), run_time=0.1 * d)
            self.play(Write(ld), Create(a1), Create(a2), FadeIn(l45a), FadeIn(l45b), run_time=0.12 * d)
            self.play(Write(b45), run_time=0.25 * d)
            self.play(Create(box45), run_time=0.08 * d)
        self.wait(1)

        chain = MathTex(r"\sin 30^\circ", "<", r"\sin 45^\circ", "<", r"\sin 60^\circ").scale(1.2).move_to(P(0, 0.8))
        nums = MathTex("0.5", "<", "0.707", "<", "0.866").scale(1.2)
        for i in (0, 2, 4):
            nums[i].set_color(GREEN)
            nums[i].set_x(chain[i].get_x())
        for i in (1, 3):
            nums[i].set_x(chain[i].get_x())
        nums.set_y(-0.6)
        arrow = Arrow(P(-3.5, -1.8), P(3.5, -1.8), color=GREEN, buff=0)
        grow = label("sine grows with the angle", 28, GREEN).next_to(arrow, DOWN, buff=0.2)

        with self.voiceover(
            "Sanity check: sine grows with the angle. If your sine of sixty is smaller than your sine of thirty, "
            "you swapped sine and cosine."
        ) as vo:
            d = vo.duration
            self.play(*[FadeOut(m) for m in self.mobjects], run_time=0.08 * d)
            self.play(Write(chain), run_time=0.25 * d)
            self.play(FadeIn(nums, shift=0.2 * UP), run_time=0.2 * d)
            self.play(GrowArrow(arrow), FadeIn(grow), run_time=0.2 * d)
        self.wait(1)

    # ------------------------------------------------------------------ Scene 6
    def scene6(self):
        Cc = P(-3, 0)
        circ = Circle(radius=2, color=INK, stroke_width=4).move_to(Cc)
        ticks = VGroup(*[
            Line(Cc + 1.85 * np.array([np.cos(a), np.sin(a), 0]), Cc + 2.15 * np.array([np.cos(a), np.sin(a), 0]),
                 color=INK, stroke_width=3)
            for a in np.linspace(0, TAU, 12, endpoint=False)
        ])
        l360 = MathTex(r"360^\circ").move_to(Cc)
        conv = label("a convention", 30, MUTED).move_to(Cc + P(0, -2.6))

        with self.voiceover(
            "Three hundred sixty degrees is a Babylonian convention. A better unit comes from the circle itself."
        ) as vo:
            d = vo.duration
            self.play(Create(circ), run_time=0.25 * d)
            self.play(LaggedStart(*[Create(t) for t in ticks], lag_ratio=0.1), Write(l360), run_time=0.25 * d)
            self.play(FadeIn(conv), run_time=0.15 * d)

        r1 = Line(Cc, Cc + P(2, 0), color=RED_, stroke_width=6)
        rlab = MathTex("r", color=RED_).next_to(r1, DOWN, buff=0.15)
        arc1 = Arc(radius=2, start_angle=0, angle=1, arc_center=Cc, color=RED_, stroke_width=8)
        arc_lab = MathTex("r", color=RED_).move_to(Cc + 2.4 * np.array([np.cos(0.5), np.sin(0.5), 0]))
        r2 = Line(Cc, Cc + 2 * np.array([np.cos(1), np.sin(1), 0]), color=RED_, stroke_width=6)
        amark = Arc(radius=0.5, start_angle=0, angle=1, arc_center=Cc, color=ANG, stroke_width=6)
        rad_lab = label("1 radian", 26, ANG).move_to(Cc + P(-0.9, 1.05))
        rad_arrow = Arrow(rad_lab.get_bottom() + 0.05 * DOWN, Cc + 0.55 * np.array([np.cos(0.7), np.sin(0.7), 0]), buff=0.05, color=ANG, stroke_width=3, tip_length=0.15)
        ts = MathTex(r"\theta = \frac{s}{r}").move_to(P(3, 2.4))

        with self.voiceover(
            "Take a circle of radius r. Lay an arc of length r along its edge. The angle it makes at the center "
            "is one radian. In general, radians are arc length over radius."
        ) as vo:
            d = vo.duration
            self.play(FadeOut(ticks), FadeOut(l360), FadeOut(conv), run_time=0.08 * d)
            self.play(Create(r1), Write(rlab), run_time=0.12 * d)
            cp = r1.copy()
            self.play(Transform(cp, arc1), run_time=0.25 * d)
            self.play(Write(arc_lab), run_time=0.07 * d)
            self.play(Create(r2), Create(amark), FadeIn(rad_lab), GrowArrow(rad_arrow), run_time=0.15 * d)
            self.play(Write(ts), run_time=0.15 * d)

        pure = MathTex(r"\frac{\text{length}}{\text{length}} = \text{pure number}").move_to(P(3, 1.0))
        full = MathTex(r"\theta_{\text{full turn}} = \frac{2\pi r}{r} = 2\pi").move_to(P(3, -0.5))
        half = MathTex(r"180^\circ = \pi \text{ radians}").move_to(P(3, -2.1))
        halfbox = SurroundingRectangle(half, color=ANG, buff=0.2)
        trace = Circle(radius=2, color=RED_, stroke_width=6).move_to(Cc)

        with self.voiceover(
            "A length over a length has no units, so a radian is a pure number. A full turn has arc two pi r, "
            "so it is two pi radians. That makes one hundred eighty degrees equal to pi radians."
        ) as vo:
            d = vo.duration
            self.play(Write(pure), run_time=0.25 * d)
            self.play(Create(trace), Write(full), run_time=0.3 * d)
            self.play(Write(half), Create(halfbox), run_time=0.25 * d)
        self.wait(1)

        hdr = VGroup(label("degrees", 30, MUTED).move_to(P(1, 2.2)), label("radians", 30, MUTED).move_to(P(5, 2.2)))
        rows = VGroup()
        for i, (dg, rd) in enumerate([("30", r"\pi/6"), ("45", r"\pi/4"),
                                      ("60", r"\pi/3"), ("90", r"\pi/2")]):
            y = 1.45 - 0.72 * i
            rows.add(VGroup(MathTex(dg + r"^\circ", font_size=40).move_to(P(1, y)),
                            MathTex(rd, font_size=40).move_to(P(5, y))))
        top_arrow = CurvedArrow(P(1.5, 2.6), P(4.5, 2.6), angle=-PI / 3, color=ADJ)
        top_lab = MathTex(r"\times \frac{\pi}{180}", color=ADJ, font_size=36).move_to(P(3, 3.4))
        bot_arrow = CurvedArrow(P(4.5, -0.95), P(1.5, -0.95), angle=-PI / 3, color=GREEN)
        bot_lab = MathTex(r"\times \frac{180}{\pi}", color=GREEN, font_size=36).move_to(P(3, -1.95))
        canc = MathTex("30", r"^\circ", r"\times \frac{\pi}{180", r"^\circ", r"} = \frac{\pi}{6}", font_size=40)
        canc.move_to(P(3, -3.1))
        one_rad = MathTex(r"1 \text{ rad} \approx 57.3^\circ")
        one_rad.move_to(P(-3, -3.0))
        one_box = SurroundingRectangle(one_rad, color=ANG, buff=0.2)

        with self.voiceover(
            "So thirty degrees is pi over six, and ninety is pi over two. Degrees to radians: multiply by pi over "
            "one hundred eighty. To go back, multiply by one hundred eighty over pi. Pick whichever factor cancels "
            "the unit you have. One radian is about fifty seven degrees."
        ) as vo:
            d = vo.duration
            self.play(FadeOut(VGroup(ts, pure, full, half, halfbox)), VGroup(circ, r1, cp, r2, amark, trace).animate.set_stroke(opacity=0.25),
            VGroup(rlab, arc_lab, rad_lab, rad_arrow).animate.set_opacity(0.25),
                      run_time=0.05 * d)
            self.play(FadeIn(hdr), FadeIn(rows[0]), run_time=0.07 * d)
            self.play(FadeIn(rows[3]), FadeIn(rows[1]), FadeIn(rows[2]), run_time=0.08 * d)
            self.play(Create(top_arrow), Write(top_lab), run_time=0.14 * d)
            self.play(Create(bot_arrow), Write(bot_lab), run_time=0.14 * d)
            self.play(Write(canc), run_time=0.12 * d)
            strikes = VGroup(strike(canc[1]), strike(canc[3]))
            self.play(canc[1].animate.set_color(RED_), canc[3].animate.set_color(RED_),
                      Create(strikes), run_time=0.1 * d)
            self.play(Write(one_rad), Create(one_box), run_time=0.15 * d)
        self.wait(1)

        sector = Sector(radius=2, angle=1.2, arc_center=Cc, color=ANG, fill_opacity=0.35, stroke_width=0)
        sec_arc = Arc(radius=2, start_angle=0, angle=1.2, arc_center=Cc, color=ANG, stroke_width=7)
        rA = Line(Cc, Cc + P(2, 0), color=INK, stroke_width=4)
        rB = Line(Cc, Cc + 2 * np.array([np.cos(1.2), np.sin(1.2), 0]), color=INK, stroke_width=4)
        th_lab = MathTex(r"\theta", color=ANG, font_size=36).move_to(Cc + 0.75 * np.array([np.cos(0.6), np.sin(0.6), 0]))
        s_lab = MathTex("s", color=ANG).move_to(Cc + 2.4 * np.array([np.cos(0.6), np.sin(0.6), 0]))
        forms = MathTex(r"s = r\theta,\qquad A_{\text{sector}} = \tfrac12 r^2\theta").move_to(P(3.2, 1.2))
        valid = label("valid only in radians", 24, MUTED).next_to(forms, DOWN, buff=0.35)
        drift = MathTex(r"\frac{\pi}{180}", color=MUTED).set_opacity(0.45).move_to(P(0.8, -1.0))

        with self.voiceover(
            "In radians, arc length is r times theta, and sector area is one half r squared theta. In degrees, "
            "a conversion factor tags along forever. That is why calculus prefers radians."
        ) as vo:
            d = vo.duration
            self.play(FadeOut(VGroup(hdr, rows, top_arrow, top_lab, bot_arrow, bot_lab, canc, strikes, one_rad, one_box)),
                      FadeOut(VGroup(r1, rlab, cp, arc_lab, r2, amark, rad_lab, rad_arrow, trace)),
                      circ.animate.set_stroke(opacity=1), run_time=0.08 * d)
            self.play(FadeIn(sector), Create(sec_arc), Create(rA), Create(rB), Write(th_lab), Write(s_lab),
                      run_time=0.15 * d)
            self.play(Write(forms), run_time=0.2 * d)
            self.play(FadeIn(valid), run_time=0.08 * d)
            self.play(FadeIn(drift), run_time=0.07 * d)
            self.play(drift.animate.move_to(P(5.6, -1.0)), run_time=0.22 * d, rate_func=linear)
            self.play(FadeOut(drift), run_time=0.08 * d)
        self.wait(1)

    # ------------------------------------------------------------------ Scene 7
    def scene7(self):
        title = label("The chapter in four lines", 40, weight="BOLD").move_to(P(0, 3.2))
        lines = VGroup(
            label("1. One acute angle fixes the shape", 34),
            MathTex(r"2.\ \frac{k\cdot a}{k\cdot b} = \frac{a}{b}"),
            MathTex(r"3.\ \tan\theta = \frac{\sin\theta}{\cos\theta}"),
            MathTex(r"4.\ \theta = \frac{s}{r}"),
        ).arrange(DOWN, buff=0.4, aligned_edge=LEFT).move_to(P(0, -0.3))

        with self.voiceover(
            "One acute angle fixes the shape. Scaling cancels, so ratios depend on the angle alone. Those ratios "
            "are sine, cosine and tangent, with tangent equal to sine over cosine. And an angle is arc length per radius."
        ) as vo:
            d = vo.duration
            self.play(FadeIn(title), run_time=0.06 * d)
            self.play(FadeIn(lines[0], shift=0.2 * RIGHT), run_time=0.1 * d)
            self.wait(0.08 * d)
            self.play(FadeIn(lines[1], shift=0.2 * RIGHT), run_time=0.1 * d)
            self.wait(0.12 * d)
            self.play(FadeIn(lines[2], shift=0.2 * RIGHT), run_time=0.1 * d)
            self.wait(0.15 * d)
            self.play(FadeIn(lines[3], shift=0.2 * RIGHT), run_time=0.1 * d)

        a, b, c = P(-1.5, -1), P(1.5, -1), P(1.5, 1)
        cen = (a + b + c) / 3
        tri = VGroup(seg(a, b, ADJ), seg(b, c, OPP), seg(a, c, HYP), right_mark(b, a, c, size=0.3))
        hyp = tri[2]

        with self.voiceover(
            "Turn the triangle any way you like. The hypotenuse is still the side across from the right angle."
        ) as vo:
            d = vo.duration
            self.play(FadeOut(lines), FadeOut(title), run_time=0.08 * d)
            self.play(Create(tri), run_time=0.15 * d)
            self.play(Rotate(tri, PI, about_point=cen), run_time=0.25 * d)
            rpos = 2 * cen - b + 0.2 * P(1, -1) / np.sqrt(2)
            hmid = (2 * cen - a + 2 * cen - c) / 2
            arr = DashedLine(rpos, hmid, color=RED_, stroke_width=5).add_tip(tip_length=0.22)
            self.play(Create(arr), run_time=0.15 * d)
            self.play(Indicate(hyp, color=HYP, scale_factor=1.15), run_time=0.2 * d)

        R = 2.5
        axes = VGroup(
            Arrow(P(-3.6, 0), P(3.6, 0), buff=0, color=MUTED, stroke_width=3, tip_length=0.2),
            Arrow(P(0, -3.0), P(0, 3.0), buff=0, color=MUTED, stroke_width=3, tip_length=0.2),
        ).shift(0.3 * DOWN)
        O = P(0, -0.3)
        circle = Circle(radius=R, color=INK, stroke_width=3).move_to(O)
        phi = ValueTracker(40)

        def build():
            t = np.radians(phi.get_value())
            foot = O + P(R * np.cos(t), 0)
            tip = O + P(R * np.cos(t), R * np.sin(t))
            return VGroup(
                seg(O, foot, ADJ), seg(foot, tip, OPP), seg(O, tip, HYP),
                Arc(radius=0.55, start_angle=0, angle=t, arc_center=O, color=ANG, stroke_width=5),
                Dot(tip, color=HYP, radius=0.07),
            )

        live = always_redraw(build)
        readout = always_redraw(lambda: VGroup(
            MathTex(r"\theta ="), DecimalNumber(phi.get_value(), num_decimal_places=0, unit=r"^\circ", color=INK),
        ).arrange(RIGHT, buff=0.15).move_to(P(5, 1.5)))
        nxt = label("Next: Chapter 1 · The Unit Circle", 34, PRIMARY, weight="BOLD").move_to(P(0, 3.55))
        bound = label("0° < θ < 90°", 30, RED_).move_to(P(5, 0.6))

        with self.voiceover(
            "So far every angle has lived between zero and ninety degrees. In Chapter One, we lift the triangle "
            "onto a circle, and that ceiling disappears."
        ) as vo:
            d = vo.duration
            self.play(FadeOut(tri), FadeOut(arr), run_time=0.06 * d)
            self.play(Create(axes), Create(circle), run_time=0.14 * d)
            self.play(FadeIn(live), FadeIn(readout), FadeIn(bound), run_time=0.1 * d)
            self.play(phi.animate.set_value(150), Create(Cross(bound, stroke_color=RED_, stroke_width=4)),
                      run_time=0.4 * d, rate_func=smooth)
            self.play(FadeIn(nxt, shift=0.2 * DOWN), run_time=0.15 * d)
