import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

# Script palette mapped onto the light Strawberry background.
SKY = ManimColor("#3B6FB6")  # "blue"
CORAL = PRIMARY
TEAL = SECONDARY
YEL = ACCENT


def P(x, y):
    return np.array([x, y, 0.0])


def unit(v):
    n = np.linalg.norm(v)
    return v / n if n > 1e-9 else v


def ang_of(v):
    return np.arctan2(v[1], v[0])


def arc_at(V, A, B, r=0.45, color=YEL, width=4):
    """Interior angle arc at V between rays V->A and V->B."""
    a1 = ang_of(A - V)
    d = ang_of(B - V) - a1
    while d > PI:
        d -= TAU
    while d <= -PI:
        d += TAU
    return Arc(radius=r, start_angle=a1, angle=d, arc_center=V, color=color, stroke_width=width)


def arc_label(V, A, B, tex, r=0.8, font_size=34, color=INK):
    a1 = ang_of(A - V)
    d = ang_of(B - V) - a1
    while d > PI:
        d -= TAU
    while d <= -PI:
        d += TAU
    mid = a1 + d / 2
    return MathTex(tex, font_size=font_size, color=color).move_to(V + r * np.array([np.cos(mid), np.sin(mid), 0]))


def right_mark(V, d1, d2, s=0.22, color=INK):
    d1, d2 = unit(d1), unit(d2)
    return VMobject(color=color, stroke_width=3).set_points_as_corners(
        [V + s * d1, V + s * d1 + s * d2, V + s * d2]
    )


def side_label(A, B, tex, centroid, off=0.35, font_size=36, color=INK):
    m = (A + B) / 2
    return MathTex(tex, font_size=font_size, color=color).move_to(m + off * unit(m - centroid))


def fit(m, w):
    if m.width > w:
        m.scale_to_fit_width(w)
    return m


class TrigCh5Video(NarratedScene, MovingCameraScene):
    def construct(self):
        self.title_card(
            "Trigonometry",
            "Any Triangle, and the Bridge to Calculus",
            "Chapter five. Any triangle, and the bridge to calculus.",
        )
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
        self.wait(0.5)

    # ------------------------------------------------------------ Scene 1
    def scene1(self):
        off = P(-1.5, -0.3)
        A, B, C = P(-3, -1.5) + off, P(3, -1.5) + off, P(0.8, 2) + off
        self.A, self.B, self.C = A, B, C
        G = (A + B + C) / 3
        self.side_a = Line(B, C, color=INK, stroke_width=4)
        self.side_b = Line(A, C, color=INK, stroke_width=4)
        self.side_c = Line(A, B, color=INK, stroke_width=4)
        tri = VGroup(self.side_c, self.side_a, self.side_b)

        with self.voiceover(
            "So far, every triangle we solved had a right angle. Most triangles do not."
        ) as vo:
            d = vo.duration
            rt = Polygon(P(-1.5, -1), P(1.5, -1), P(-1.5, 1.2), color=INK, stroke_width=4)
            ra = right_mark(P(-1.5, -1), RIGHT, UP, 0.3)
            self.play(Create(rt), Create(ra), run_time=0.3 * d)
            cr = Cross(rt, stroke_color=CORAL, stroke_width=8).scale(0.9)
            self.play(Create(cr), run_time=0.18 * d)
            self.play(FadeOut(VGroup(rt, ra, cr)), run_time=0.15 * d)
            self.play(Create(tri), run_time=0.3 * d)

        with self.voiceover(
            "Label the corners A, B and C. Each side takes the letter of the corner across from it, "
            "so side A sits opposite angle A."
        ) as vo:
            d = vo.duration
            fs = 40
            self.lA = MathTex("A", font_size=fs).move_to(A + 0.4 * unit(A - G))
            self.lB = MathTex("B", font_size=fs).move_to(B + 0.4 * unit(B - G))
            self.lC = MathTex("C", font_size=fs).move_to(C + 0.35 * unit(C - G))
            self.arcA = arc_at(A, B, C, 0.6)
            self.arcB = arc_at(B, C, A, 0.6)
            self.arcC = arc_at(C, A, B, 0.45)
            self.la = side_label(B, C, "a", G, 0.35)
            self.lb = side_label(A, C, "b", G, 0.35)
            self.lc = side_label(A, B, "c", G, 0.35)
            self.play(
                FadeIn(VGroup(self.lA, self.lB, self.lC)),
                Create(VGroup(self.arcA, self.arcB, self.arcC)),
                run_time=0.25 * d,
            )
            self.play(FadeIn(VGroup(self.la, self.lb, self.lc)), run_time=0.2 * d)
            for arc, side, lab in [
                (self.arcA, self.side_a, self.la),
                (self.arcB, self.side_b, self.lb),
                (self.arcC, self.side_c, self.lc),
            ]:
                self.play(
                    Indicate(arc, color=CORAL, scale_factor=1.3),
                    Indicate(side, color=CORAL, scale_factor=1.05),
                    Indicate(lab, color=CORAL),
                    run_time=0.16 * d,
                )

    # ------------------------------------------------------------ Scene 2
    def scene2(self):
        A, B, C = self.A, self.B, self.C
        F = P(C[0], A[1])
        with self.voiceover("Drop the altitude h from corner C. Two right triangles now share h.") as vo:
            d = vo.duration
            alt = DashedLine(C, F, color=TEAL, stroke_width=4)
            rm = right_mark(F, RIGHT, UP, 0.22, color=TEAL)
            hl = MathTex("h", font_size=38, color=TEAL).move_to((C + F) / 2 + 0.3 * LEFT + 0.3 * DOWN)
            shL = Polygon(A, F, C, stroke_width=0, fill_color=SKY, fill_opacity=0.15)
            shR = Polygon(F, B, C, stroke_width=0, fill_color=CORAL, fill_opacity=0.12)
            self.add(shL, shR)
            self.bring_to_back(shL, shR)
            self.play(Create(alt), run_time=0.35 * d)
            self.play(Create(rm), FadeIn(hl), run_time=0.2 * d)
            self.play(shL.animate.set_fill(opacity=0.18), shR.animate.set_fill(opacity=0.15), run_time=0.3 * d)

        with self.voiceover(
            "On the left, h equals side B times sine A. On the right, h equals side A times sine B."
        ) as vo:
            d = vo.duration
            e1 = MathTex(r"h = b\sin A").move_to(P(4.4, 2.8))
            e2 = MathTex(r"h = a\sin B").move_to(P(4.4, 1.9))
            self.play(shL.animate.set_fill(opacity=0.4), run_time=0.12 * d)
            self.play(Write(e1), run_time=0.3 * d)
            self.play(shL.animate.set_fill(opacity=0.15), shR.animate.set_fill(opacity=0.35), run_time=0.12 * d)
            self.play(Write(e2), run_time=0.3 * d)
            self.play(shR.animate.set_fill(opacity=0.12), run_time=0.1 * d)

        with self.voiceover(
            "Set them equal and divide: side A over sine A equals side B over sine B. "
            "Another altitude adds side C over sine C. That is the law of sines."
        ) as vo:
            d = vo.duration
            e3 = MathTex(r"b\sin A = a\sin B").move_to(P(4.4, 2.4))
            self.play(TransformMatchingShapes(VGroup(e1, e2), e3), run_time=0.15 * d)
            law = MathTex(r"\frac{a}{\sin A}", "=", r"\frac{b}{\sin B}", "=", r"\frac{c}{\sin C}")
            fit(law, 4.7).move_to(P(4.35, 2.4))
            self.play(TransformMatchingShapes(e3, law[:3]), run_time=0.25 * d)
            self.wait(0.2 * d)
            self.play(Write(law[3:]), run_time=0.15 * d)
            box = SurroundingRectangle(law, color=CORAL, buff=0.18)
            cap = Text("Law of Sines", font_size=28, color=CORAL).next_to(box, DOWN, buff=0.2)
            self.play(Create(box), FadeIn(cap), run_time=0.15 * d)
        self.wait(1.5)

        with self.voiceover(
            "The law needs a matched pair, a side and its opposite angle. That fits two angles and a side, "
            "A A S or A S A, and the tricky S S A case."
        ) as vo:
            d = vo.duration
            self.play(FadeOut(VGroup(alt, rm, hl, shL, shR)), run_time=0.12 * d)
            pairs = [
                (self.arcA, self.lA, self.side_a, self.la, SKY),
                (self.arcB, self.lB, self.side_b, self.lb, TEAL),
                (self.arcC, self.lC, self.side_c, self.lc, CORAL),
            ]
            for arc, L, side, l, col in pairs:
                self.play(
                    arc.animate.set_color(col).set_stroke(width=6),
                    L.animate.set_color(col),
                    side.animate.set_color(col).set_stroke(width=6),
                    l.animate.set_color(col),
                    run_time=0.12 * d,
                )
            c1 = Text("AAS / ASA: two angles + any side", font_size=26)
            c2 = Text("SSA: two sides + non-included angle (lesson 5.2)", font_size=26, color=CORAL)
            caps = VGroup(c1, c2).arrange(DOWN, aligned_edge=LEFT, buff=0.2).move_to(P(0, -3.2))
            self.play(FadeIn(c1, shift=0.2 * UP), run_time=0.15 * d)
            self.play(FadeIn(c2, shift=0.2 * UP), run_time=0.15 * d)
        self.clear_scene()

    # ------------------------------------------------------------ Scene 3
    def scene3(self):
        A, B = P(-3, -2), P(1, -2)
        R = A + 2.7 * np.array([np.cos(63 * DEGREES), np.sin(63 * DEGREES), 0])
        with self.voiceover(
            "A surveyor sights a rock across a river: sixty three degrees from A, forty one from B, "
            "one hundred twenty meters along the bank. How far is the rock from A?"
        ) as vo:
            d = vo.duration
            river = Rectangle(width=14.4, height=1.8, stroke_width=0, fill_color=SKY, fill_opacity=0.2)
            river.move_to(P(0, -0.8)).set_z_index(-1)
            rl = Text("river", font_size=24, color=SKY).move_to(P(5.2, -0.8))
            bank = Line(P(-7.1, -2), P(7.1, -2), color=MUTED, stroke_width=2)
            self.play(FadeIn(river), FadeIn(rl), Create(bank), run_time=0.15 * d)
            dA, dB, dR = Dot(A, color=INK), Dot(B, color=INK), Dot(R, color=INK)
            lA = MathTex("A", font_size=36).next_to(A, DL, buff=0.1)
            lB = MathTex("B", font_size=36).next_to(B, DR, buff=0.1)
            lR = MathTex("R", font_size=36).next_to(R, UP, buff=0.15)
            AB = Line(A, B, color=INK, stroke_width=4)
            AR = Line(A, R, color=INK, stroke_width=4)
            BR = Line(B, R, color=INK, stroke_width=4)
            base_l = MathTex(r"120\text{ m}", font_size=34).move_to(P(-1, -2.4))
            self.play(FadeIn(dA, dB, lA, lB), Create(AB), FadeIn(base_l), run_time=0.2 * d)
            self.play(FadeIn(dR, lR), Create(AR), Create(BR), run_time=0.2 * d)
            arcA = arc_at(A, B, R, 0.55)
            arcB = arc_at(B, R, A, 0.55)
            l63 = arc_label(A, B, R, r"63^\circ", 0.95, 30)
            l41 = arc_label(B, R, A, r"41^\circ", 1.0, 30)
            self.play(Create(arcA), FadeIn(l63), run_time=0.15 * d)
            self.play(Create(arcB), FadeIn(l41), run_time=0.15 * d)

        with self.voiceover(
            "Two angles and a side, the A S A case. The third angle is seventy six degrees, opposite the "
            "baseline. The distance d sits opposite forty one."
        ) as vo:
            d = vo.duration
            tag = Text("ASA", font_size=24, color=INK).move_to(P(-6.2, 3.5))
            tagbox = SurroundingRectangle(tag, color=MUTED, buff=0.12)
            self.play(FadeIn(tag, tagbox), run_time=0.12 * d)
            eq = MathTex(r"180^\circ - 63^\circ - 41^\circ = 76^\circ", font_size=40).move_to(P(3.6, 3.2))
            self.play(Write(eq), run_time=0.22 * d)
            arcR = arc_at(R, A, B, 0.45)
            l76 = arc_label(R, A, B, r"76^\circ", 0.85, 30)
            self.play(Create(arcR), FadeIn(l76), run_time=0.14 * d)
            self.play(
                AB.animate.set_color(SKY).set_stroke(width=6),
                arcR.animate.set_color(SKY).set_stroke(width=6),
                l76.animate.set_color(SKY),
                base_l.animate.set_color(SKY),
                run_time=0.15 * d,
            )
            G = (A + B + R) / 3
            dl = side_label(A, R, "d", G, 0.35, 40, CORAL)
            self.play(
                AR.animate.set_color(CORAL).set_stroke(width=6),
                arcB.animate.set_color(CORAL).set_stroke(width=6),
                l41.animate.set_color(CORAL),
                FadeIn(dl),
                run_time=0.2 * d,
            )

        with self.voiceover(
            "So d over sine forty one equals one twenty over sine seventy six. d is about eighty one point one meters."
        ) as vo:
            d = vo.duration
            e1 = MathTex(r"\frac{d}{\sin 41^\circ} = \frac{120}{\sin 76^\circ}", font_size=42).move_to(P(3.6, 1.9))
            self.play(Write(e1), run_time=0.3 * d)
            self.wait(0.1 * d)
            e2 = MathTex(r"d = \frac{120\sin 41^\circ}{\sin 76^\circ} \approx 81.1\text{ m}", font_size=42)
            fit(e2, 6.0).move_to(P(3.6, 1.9))
            self.play(TransformMatchingShapes(e1, e2), run_time=0.3 * d)
            nl = MathTex(r"81.1\text{ m}", font_size=34, color=CORAL).move_to(dl.get_center() + 0.55 * LEFT)
            self.play(ReplacementTransform(dl, nl), Indicate(e2, color=CORAL), run_time=0.2 * d)
        self.clear_scene()

    # ------------------------------------------------------------ Scene 4
    def swing_arc(self, C, r):
        floor = -3.85
        if C[1] - r >= floor:
            return VGroup(Arc(radius=r, start_angle=PI, angle=PI, arc_center=C, color=CORAL, stroke_width=4))
        alpha = np.arcsin((C[1] - floor) / r)
        return VGroup(
            Arc(radius=r, start_angle=PI, angle=alpha, arc_center=C, color=CORAL, stroke_width=4),
            Arc(radius=r, start_angle=TAU - alpha, angle=alpha, arc_center=C, color=CORAL, stroke_width=4),
        )

    def scene4(self):
        A = P(-4, -2)
        C = A + 4.8 * np.array([np.cos(40 * DEGREES), np.sin(40 * DEGREES), 0])
        h = C[1] - A[1]
        status_pos = P(4.3, 2.4)

        with self.voiceover(
            "Two sides and an angle not between them, S S A, do not pin down a triangle. "
            "Hinge side A at corner C, and swing it."
        ) as vo:
            d = vo.duration
            ray = Line(A, P(5, -2), color=INK, stroke_width=4)
            bl = Line(A, C, color=INK, stroke_width=4)
            lA = MathTex("A", font_size=36).next_to(A, DOWN, buff=0.15).shift(0.2 * RIGHT)
            lC = MathTex("C", font_size=36).next_to(C, UP, buff=0.15)
            arcA = arc_at(A, P(5, -2), C, 0.6)
            aA = arc_label(A, P(5, -2), C, r"40^\circ", 1.05, 28)
            lb = side_label(A, C, "b", A + P(1, -1), 0.35, 38)
            self.play(Create(ray), FadeIn(lA), run_time=0.15 * d)
            self.play(Create(bl), FadeIn(lb, lC), Create(arcA), FadeIn(aA), run_time=0.2 * d)
            aseg = Line(C, C + 4 * RIGHT, color=CORAL, stroke_width=5)
            alab = MathTex("a", font_size=38, color=CORAL)
            alab.add_updater(
                lambda m: m.move_to(aseg.get_center() + 0.35 * rotate_vector(unit(aseg.get_vector()), PI / 2))
            )
            hinge = Dot(C, color=CORAL, radius=0.07)
            self.play(Create(aseg), FadeIn(alab, hinge), run_time=0.15 * d)
            self.play(Rotate(aseg, angle=-PI / 2, about_point=C), run_time=0.3 * d, rate_func=smooth)
            self.play(FadeOut(aseg, alab), run_time=0.1 * d)
            alab.clear_updaters()

        with self.voiceover(
            "For an acute angle A, the altitude from C is side B sine A. If side A is shorter, it never "
            "reaches the base: no triangle. Exactly equal: one right triangle."
        ) as vo:
            d = vo.duration
            F = P(C[0], -2)
            alt = DashedLine(C, F, color=TEAL, stroke_width=4)
            hl = MathTex(r"h = b\sin A \approx 3.09", font_size=38, color=TEAL).move_to(P(4.3, 3.3))
            hs = MathTex("h", font_size=34, color=TEAL).next_to(alt, LEFT, buff=0.12).shift(0.4 * UP)
            self.play(Create(alt), FadeIn(hl, hs), run_time=0.25 * d)
            arc = self.swing_arc(C, 2.4)
            st = Text("no triangle", font_size=32, color=CORAL).move_to(status_pos)
            self.play(Create(arc), FadeIn(st), run_time=0.25 * d)
            self.wait(0.1 * d)
            arc2 = self.swing_arc(C, h)
            st2 = Text("one right triangle", font_size=32, color=CORAL).move_to(status_pos)
            touch = Dot(F, color=CORAL)
            rm = right_mark(F, LEFT, UP, 0.22, color=CORAL)
            self.play(Transform(arc, arc2), ReplacementTransform(st, st2), run_time=0.2 * d)
            self.play(FadeIn(touch), Create(rm), run_time=0.1 * d)

        with self.voiceover(
            "Side A between the altitude and side B: the swing crosses the base twice. Two triangles."
        ) as vo:
            d = vo.duration
            dx = np.sqrt(16 - h * h)
            B1, B2 = P(C[0] - dx, -2), P(C[0] + dx, -2)
            st3 = Text("two triangles", font_size=32, color=CORAL).move_to(status_pos)
            self.play(Transform(arc, self.swing_arc(C, 4)), FadeOut(touch, rm), ReplacementTransform(st2, st3),
                      run_time=0.3 * d)
            d1, d2 = Dot(B1, color=SKY), Dot(B2, color=CORAL)
            l1 = MathTex("B_1", font_size=32, color=SKY).next_to(B1, DOWN, buff=0.15)
            l2 = MathTex("B_2", font_size=32, color=CORAL).next_to(B2, DOWN, buff=0.15)
            self.play(FadeIn(d1, d2, l1, l2), run_time=0.15 * d)
            t1 = Polygon(A, C, B1, stroke_color=SKY, stroke_width=3, fill_color=SKY, fill_opacity=0.25)
            t2 = Polygon(A, C, B2, stroke_color=CORAL, stroke_width=3, fill_color=CORAL, fill_opacity=0.18)
            self.play(FadeIn(t1), run_time=0.2 * d)
            self.play(FadeIn(t2), run_time=0.2 * d)

        with self.voiceover(
            "Side A at least as long as side B: the second crossing lands behind corner A. One triangle."
        ) as vo:
            d = vo.duration
            dx = np.sqrt(5.5**2 - h * h)
            Bp, Bm = P(C[0] + dx, -2), P(C[0] - dx, -2)
            st4 = Text("one triangle", font_size=32, color=CORAL).move_to(status_pos)
            self.play(FadeOut(t1, t2, d1, d2, l1, l2), run_time=0.12 * d)
            self.play(Transform(arc, self.swing_arc(C, 5.5)), ReplacementTransform(st3, st4), run_time=0.3 * d)
            dp = Dot(Bp, color=SKY)
            lp = MathTex("B", font_size=32, color=SKY).next_to(Bp, DOWN, buff=0.15)
            tp = Polygon(A, C, Bp, stroke_color=SKY, stroke_width=3, fill_color=SKY, fill_opacity=0.25)
            self.play(FadeIn(tp, dp, lp), run_time=0.2 * d)
            ext = DashedLine(A, Bm, color=MUTED, stroke_width=2)
            dm = Dot(Bm, color=MUTED)
            xm = Cross(scale_factor=0.2, stroke_color=CORAL, stroke_width=5).move_to(Bm)
            self.play(Create(ext), FadeIn(dm), run_time=0.12 * d)
            self.play(Create(xm), run_time=0.12 * d)

        with self.voiceover("So for acute A, four outcomes: none, one right, two, or one.") as vo:
            d = vo.duration
            self.clear_scene(run_time=0.15 * d)
            title = Text("The four outcomes (acute A)", font_size=32).move_to(P(0, 2.8))
            rows = VGroup(
                MathTex(r"a < b\sin A \;\Rightarrow\; \text{none}"),
                MathTex(r"a = b\sin A \;\Rightarrow\; \text{one (right)}"),
                MathTex(r"b\sin A < a < b \;\Rightarrow\; \text{two}"),
                MathTex(r"a \ge b \;\Rightarrow\; \text{one}"),
            ).arrange(DOWN, aligned_edge=LEFT, buff=0.35).next_to(title, DOWN, buff=0.5)
            self.play(FadeIn(title), run_time=0.1 * d)
            for r in rows:
                self.play(FadeIn(r, shift=0.2 * RIGHT), run_time=0.13 * d)
            box = SurroundingRectangle(rows[2], color=CORAL, buff=0.12)
            self.play(rows[2].animate.set_color(CORAL), Create(box), run_time=0.15 * d)
        self.wait(1.5)

        with self.voiceover(
            "Algebraically, sine B above one means no triangle. Below one, both B and one eighty minus B "
            "share that sine. The calculator shows only one."
        ) as vo:
            d = vo.duration
            self.clear_scene(run_time=0.1 * d)
            eq = MathTex(r"\sin B = \frac{b\sin A}{a}").move_to(P(-4.4, 0))
            self.play(Write(eq), run_time=0.15 * d)
            ends = [P(-0.9, 2.2), P(-0.9, 0), P(-0.9, -2.2)]
            arrows = VGroup(*[Arrow(P(-2.6, 0), e, buff=0.1, color=INK, stroke_width=4) for e in ends])
            labs = VGroup(
                MathTex(r"> 1:\ \text{no triangle}", font_size=38).next_to(ends[0], RIGHT, buff=0.15),
                MathTex(r"= 1:\ B = 90^\circ", font_size=38).next_to(ends[1], RIGHT, buff=0.15),
                MathTex(r"< 1", font_size=38).next_to(ends[2], RIGHT, buff=0.15),
            )
            self.play(GrowArrow(arrows[0]), FadeIn(labs[0]), run_time=0.15 * d)
            self.play(GrowArrow(arrows[1]), FadeIn(labs[1]), run_time=0.1 * d)
            self.play(GrowArrow(arrows[2]), FadeIn(labs[2]), run_time=0.1 * d)
            O = P(2.3, -3.0)
            r = 1.5
            semi = Arc(radius=r, start_angle=0, angle=PI, arc_center=O, color=INK, stroke_width=3)
            base = Line(O + r * LEFT + 0.2 * LEFT, O + r * RIGHT + 0.2 * RIGHT, color=MUTED, stroke_width=2)
            y = 0.75 * r
            x = r * np.sqrt(1 - 0.75**2)
            hline = DashedLine(O + P(-r - 0.3, y), O + P(r + 0.3, y), color=TEAL, stroke_width=3)
            pR, pL = O + P(x, y), O + P(-x, y)
            rad1 = Line(O, pR, color=SKY, stroke_width=3)
            rad2 = Line(O, pL, color=CORAL, stroke_width=3)
            dots = VGroup(Dot(pR, color=SKY), Dot(pL, color=CORAL))
            lb1 = MathTex("B", font_size=34, color=SKY).next_to(pR, UR, buff=0.1)
            lb2 = MathTex(r"180^\circ - B", font_size=34, color=CORAL).next_to(pL, UL, buff=0.1)
            self.play(Create(semi), Create(base), run_time=0.12 * d)
            self.play(Create(hline), FadeIn(dots), Create(rad1), Create(rad2), run_time=0.12 * d)
            self.play(FadeIn(lb1, lb2), run_time=0.1 * d)
        self.clear_scene()

    # ------------------------------------------------------------ Scene 5
    def scene5(self):
        with self.voiceover(
            "Try angle A thirty degrees, side A eight, side B twelve. Sine B is point seven five, "
            "so B is forty eight point six, or one thirty one point four."
        ) as vo:
            d = vo.duration
            l1 = MathTex(r"A = 30^\circ,\ a = 8,\ b = 12", font_size=40)
            l2 = MathTex(r"\sin B = \frac{12\sin 30^\circ}{8} = 0.75", font_size=40)
            l3 = MathTex(r"B \approx 48.6^\circ \text{ or } B' \approx 131.4^\circ", font_size=40)
            top = VGroup(l1, l2, l3).arrange(DOWN, buff=0.3).move_to(P(0, 2.4))
            self.play(Write(l1), run_time=0.25 * d)
            self.play(Write(l2), run_time=0.3 * d)
            self.play(Write(l3), run_time=0.3 * d)

        with self.voiceover(
            "Add angle A to each: seventy eight point six, and one sixty one point four. "
            "Both under one eighty. Two triangles."
        ) as vo:
            d = vo.duration
            self.play(top.animate.scale(0.8).move_to(P(-3.3, 2.6)), run_time=0.1 * d)
            c1 = MathTex(r"30 + 48.6 = 78.6 < 180", r"\ \checkmark", font_size=38)
            c2 = MathTex(r"30 + 131.4 = 161.4 < 180", r"\ \checkmark", font_size=38)
            for c in (c1, c2):
                c[1].set_color(GREEN)
            checks = VGroup(c1, c2).arrange(DOWN, aligned_edge=LEFT, buff=0.3).move_to(P(3.6, 2.6))
            self.play(Write(c1), run_time=0.22 * d)
            self.play(Write(c2), run_time=0.22 * d)
            s = 1.6
            O = P(-3.1, -3.4)
            A, C, B1, B2 = O, O + s * P(2.6, 1.5), O + s * P(1.28, 0), O + s * P(3.92, 0)
            t1 = Polygon(A, C, B1, stroke_color=SKY, stroke_width=4, fill_color=SKY, fill_opacity=0.25)
            t2 = Polygon(A, C, B2, stroke_color=CORAL, stroke_width=4, fill_color=CORAL, fill_opacity=0.15)
            a1 = arc_at(C, A, B1, 0.35, SKY)
            a2 = arc_at(C, A, B2, 0.6, CORAL)
            x1 = MathTex(r"101.4^\circ", font_size=32, color=SKY).next_to(C, LEFT, buff=0.35).shift(0.2 * UP)
            x2 = MathTex(r"18.6^\circ", font_size=32, color=CORAL).next_to(C, RIGHT, buff=0.35).shift(0.2 * UP)
            la = MathTex("A", font_size=30).next_to(A, LEFT, buff=0.12)
            lc = MathTex("C", font_size=30).next_to(C, UP, buff=0.12)
            lb1 = MathTex("B_1", font_size=28, color=SKY).next_to(B1, DOWN, buff=0.1)
            lb2 = MathTex("B_2", font_size=28, color=CORAL).next_to(B2, DOWN, buff=0.1)
            self.play(FadeIn(t2, t1, la, lc, lb1, lb2), run_time=0.2 * d)
            self.play(Create(a1), Create(a2), FadeIn(x1, x2), run_time=0.15 * d)

        with self.voiceover(
            "Now make angle A seventy, with sine B point nine. B is sixty four point two, or one fifteen point "
            "eight. But seventy plus one fifteen point eight is one eighty five point eight. No room: one triangle."
        ) as vo:
            d = vo.duration
            self.clear_scene(run_time=0.08 * d)
            m1 = MathTex(
                r"A = 70^\circ,\ \sin B = 0.9 \Rightarrow B \approx 64.2^\circ \text{ or }",
                r"B' \approx 115.8^\circ",
                font_size=42,
            )
            fit(m1, 12.5).move_to(P(0, 2.2))
            self.play(Write(m1), run_time=0.3 * d)
            m2 = MathTex(r"70^\circ + 64.2^\circ = 134.2^\circ < 180^\circ", r"\ \checkmark", font_size=42)
            m2[1].set_color(GREEN)
            m3 = MathTex(r"70^\circ + 115.8^\circ = 185.8^\circ \ge 180^\circ", font_size=42, color=CORAL)
            VGroup(m2, m3).arrange(DOWN, aligned_edge=LEFT, buff=0.4).move_to(P(0, 0.2))
            self.play(Write(m2), run_time=0.15 * d)
            self.play(Write(m3), run_time=0.2 * d)
            xx = Cross(m1[1], stroke_color=CORAL, stroke_width=6)
            cap = Text("Always run the angle-sum check", font_size=32).move_to(P(0, -2.2))
            self.play(Create(xx), FadeIn(cap), run_time=0.15 * d)

        with self.voiceover("And an obtuse angle A is never ambiguous.") as vo:
            d = vo.duration
            self.clear_scene(run_time=0.15 * d)
            s = 1.3
            V = [s * P(-1, -1), s * P(2, -1), s * P(-2, 0.5)]
            V = [v + P(0.3, 0.8) for v in V]
            tri = Polygon(*V, color=INK, stroke_width=4)
            arc = arc_at(V[0], V[1], V[2], 0.4)
            la = MathTex("A", font_size=36).next_to(V[0], DOWN, buff=0.15)
            cap = Text("obtuse A: only one triangle", font_size=32).move_to(P(0, -2.3))
            self.play(Create(tri), run_time=0.3 * d)
            self.play(Create(arc), FadeIn(la), FadeIn(cap), run_time=0.3 * d)
        self.clear_scene()

    # ------------------------------------------------------------ Scene 6
    def scene6(self):
        with self.voiceover(
            "Two sides and the included angle, or three sides, give no matched pair. Enter the law of cosines."
        ) as vo:
            d = vo.duration
            groups = []
            for cx, name, kind in [(-3.2, "SAS", "sas"), (3.2, "SSS", "sss")]:
                o = P(cx, -0.3)
                A, B, C = o + P(-1.6, -1), o + P(1.6, -1), o + P(-0.4, 1.3)
                G = (A + B + C) / 3
                lines = VGroup(Line(A, B), Line(B, C), Line(A, C)).set_stroke(INK, 4)
                title = Text(name, font_size=36, weight="BOLD").move_to(o + P(0, 2.2))
                qs = VGroup()
                if kind == "sas":
                    lines[0].set_color(SKY)
                    lines[2].set_color(SKY)
                    known = arc_at(A, B, C, 0.45, SKY)
                    qs.add(MathTex("?", color=CORAL).move_to((B + C) / 2 + 0.4 * unit((B + C) / 2 - G)))
                    qs.add(MathTex("?", color=CORAL, font_size=40).move_to(B + 0.7 * unit(G - B)))
                    qs.add(MathTex("?", color=CORAL, font_size=40).move_to(C + 0.7 * unit(G - C)))
                    extra = known
                else:
                    lines.set_color(SKY)
                    extra = VGroup()
                    for V in (A, B, C):
                        qs.add(MathTex("?", color=CORAL, font_size=40).move_to(V + 0.7 * unit(G - V)))
                groups.append(VGroup(title, lines, extra, qs))
            self.play(FadeIn(groups[0][0]), Create(groups[0][1]), Create(groups[0][2]), run_time=0.15 * d)
            self.play(FadeIn(groups[1][0]), Create(groups[1][1]), run_time=0.15 * d)
            self.play(FadeIn(groups[0][3]), FadeIn(groups[1][3]), run_time=0.2 * d)
            self.wait(0.25 * d)
            self.play(FadeOut(VGroup(*groups)), run_time=0.15 * d)

        with self.voiceover(
            "Put corner A at the origin, side C along the x axis. Corner C sits at B cosine A, B sine A, "
            "straight from the unit circle."
        ) as vo:
            d = vo.duration
            ax = Axes(
                x_range=[-1, 8, 1], y_range=[-1, 5, 1], x_length=5.4, y_length=3.6,
                axis_config={"color": MUTED, "include_tip": True, "tip_length": 0.18, "stroke_width": 2},
            ).move_to(P(-3.7, -0.8))
            A = ax.c2p(0, 0)
            B = ax.c2p(7, 0)
            C = ax.c2p(2.5, 4.33)
            G = (A + B + C) / 3
            self.play(Create(ax), run_time=0.15 * d)
            sb = Line(A, C, color=INK, stroke_width=4)
            sc = Line(A, B, color=INK, stroke_width=4)
            sa = Line(B, C, color=CORAL, stroke_width=5)
            lA = MathTex("A", font_size=32).next_to(A, DL, buff=0.08)
            dB = Dot(B, color=INK, radius=0.06)
            dC = Dot(C, color=INK, radius=0.06)
            lB = MathTex("(c, 0)", font_size=32).next_to(B, DOWN, buff=0.15)
            lC = MathTex(r"(b\cos A,\ b\sin A)", font_size=32).next_to(C, UP, buff=0.12)
            arcA = arc_at(A, B, C, 0.45)
            lb = side_label(A, C, "b", G, 0.3, 34)
            lc = MathTex("c", font_size=34).move_to((A + B) / 2 + 0.3 * DOWN)
            la = side_label(B, C, "a", G, 0.3, 34, CORAL)
            self.play(Create(sc), FadeIn(lA, dB, lB, lc), run_time=0.25 * d)
            self.play(Create(sb), Create(arcA), FadeIn(lb), run_time=0.2 * d)
            self.play(FadeIn(dC, lC), run_time=0.15 * d)
            self.play(Create(sa), FadeIn(la), run_time=0.15 * d)

        with self.voiceover(
            "Side A is the distance from B to C. Expand, and cosine squared plus sine squared becomes one. "
            "Side A squared equals B squared plus C squared, minus two B C cosine A."
        ) as vo:
            d = vo.duration
            pos = P(3.7, 1.2)
            W = 6.0
            e1 = fit(MathTex(r"a^2 = (b\cos A - c)^2 + (b\sin A)^2"), W).move_to(pos)
            e2 = fit(MathTex(r"a^2 = b^2\cos^2 A - 2bc\cos A + c^2 + b^2\sin^2 A"), W).move_to(pos)
            e3 = MathTex(r"a^2 = b^2", r"(\cos^2 A + \sin^2 A)", r"+ c^2 - 2bc\cos A")
            fit(e3, W).move_to(pos)
            e4 = MathTex(r"a^2 = b^2", r"(1)", r"+ c^2 - 2bc\cos A")
            e4.scale(e3[0].height / e4[0].height * 1.0).move_to(pos)
            e5 = MathTex(r"a^2 = b^2 + c^2 - 2bc\cos A").move_to(P(3.7, 0.0))
            self.play(Write(e1), run_time=0.15 * d)
            self.play(TransformMatchingShapes(e1, e2), run_time=0.15 * d)
            self.play(TransformMatchingShapes(e2, e3), run_time=0.15 * d)
            hb = SurroundingRectangle(e3[1], color=CORAL, buff=0.08)
            self.play(Create(hb), e3[1].animate.set_color(CORAL), run_time=0.1 * d)
            e4[1].set_color(CORAL)
            self.play(ReplacementTransform(e3, e4), FadeOut(hb), run_time=0.12 * d)
            self.play(ReplacementTransform(e4, e5), run_time=0.15 * d)
            box = SurroundingRectangle(e5, color=CORAL, buff=0.18)
            cap = Text("Law of Cosines", font_size=28, color=CORAL).next_to(box, DOWN, buff=0.2)
            self.play(Create(box), FadeIn(cap), run_time=0.12 * d)
        self.wait(1.5)
        self.clear_scene()

    # ------------------------------------------------------------ Scene 7
    def scene7(self):
        A = P(-4.3, -2)
        bL, cL = 2.5, 3.5
        B = A + cL * RIGHT
        ang = ValueTracker(60)

        def Cpt():
            t = ang.get_value() * DEGREES
            return A + bL * np.array([np.cos(t), np.sin(t), 0])

        side_c = Line(A, B, color=INK, stroke_width=4)
        side_b = always_redraw(lambda: Line(A, Cpt(), color=INK, stroke_width=4))
        side_a = always_redraw(lambda: Line(B, Cpt(), color=CORAL, stroke_width=5))
        arcA = always_redraw(lambda: arc_at(A, B, Cpt(), 0.45))
        lA = MathTex("A", font_size=34).next_to(A, DL, buff=0.1)
        lc = MathTex("c", font_size=34).move_to((A + B) / 2 + 0.35 * DOWN)
        lb = always_redraw(
            lambda: MathTex("b", font_size=34).move_to(
                (A + Cpt()) / 2 + 0.3 * rotate_vector(unit(Cpt() - A), PI / 2)
            )
        )
        la = always_redraw(
            lambda: MathTex("a", font_size=34, color=CORAL).move_to(
                (B + Cpt()) / 2 + 0.3 * rotate_vector(unit(Cpt() - B), -PI / 2)
            )
        )
        eq = MathTex(r"a^2 = b^2 + c^2", r"- 2bc\cos A").move_to(P(3.3, 2.8))

        with self.voiceover(
            "Set angle A to ninety. Cosine is zero, the correction vanishes, and Pythagoras returns."
        ) as vo:
            d = vo.duration
            self.play(Create(side_c), Create(side_b), Create(side_a), Create(arcA),
                      FadeIn(lA, lc, lb, la), Write(eq), run_time=0.25 * d)
            self.play(ang.animate.set_value(90), run_time=0.25 * d)
            rm = right_mark(A, RIGHT, UP, 0.3)
            self.play(Create(rm), run_time=0.1 * d)
            strike = Line(eq[1].get_left(), eq[1].get_right(), color=CORAL, stroke_width=6)
            self.play(Create(strike), eq[1].animate.set_opacity(0.35), run_time=0.2 * d)
            self.play(Indicate(eq[0], color=CORAL), run_time=0.15 * d)

        with self.voiceover(
            "Acute angle, cosine positive: the side is shorter than Pythagoras. Obtuse: longer."
        ) as vo:
            d = vo.duration
            ref_len = np.sqrt(bL**2 + cL**2)
            x0 = -4.3
            ref = DashedLine(P(x0, -3.0), P(x0 + ref_len, -3.0), color=MUTED, stroke_width=4)
            refl = MathTex(r"\sqrt{b^2+c^2}", font_size=30, color=MUTED).next_to(P(x0, -3.0), LEFT, buff=0.2)
            bar = always_redraw(
                lambda: Line(P(x0, -3.5), P(x0 + np.linalg.norm(Cpt() - B), -3.5), color=CORAL, stroke_width=6)
            )
            barl = MathTex("a", font_size=32, color=CORAL).next_to(P(x0, -3.5), LEFT, buff=0.2)
            self.play(FadeOut(rm, strike), eq[1].animate.set_opacity(1), run_time=0.1 * d)
            self.play(Create(ref), FadeIn(refl), Create(bar), FadeIn(barl), run_time=0.15 * d)
            sign = MathTex(r"\cos A > 0", font_size=42, color=SKY).move_to(P(3.3, 1.8))
            self.play(ang.animate.set_value(50), FadeIn(sign), run_time=0.3 * d)
            sign2 = MathTex(r"\cos A < 0", font_size=42, color=CORAL).move_to(P(3.3, 1.8))
            self.play(ang.animate.set_value(130), ReplacementTransform(sign, sign2), run_time=0.35 * d)

        with self.voiceover(
            "Given three sides, the sign of B squared plus C squared minus A squared says acute, right, or obtuse."
        ) as vo:
            d = vo.duration
            self.play(FadeOut(sign2), run_time=0.08 * d)
            f = MathTex(r"\cos A = ", r"\frac{b^2 + c^2 - a^2}{2bc}").move_to(P(3.3, 1.4))
            self.play(Write(f), run_time=0.25 * d)
            nb = SurroundingRectangle(f[1][0:8], color=CORAL, buff=0.08)
            self.play(Create(nb), run_time=0.12 * d)
            rows = VGroup(
                MathTex(r"> 0 \Rightarrow \text{acute}", font_size=40),
                MathTex(r"= 0 \Rightarrow \text{right}", font_size=40),
                MathTex(r"< 0 \Rightarrow \text{obtuse}", font_size=40),
            ).arrange(DOWN, aligned_edge=LEFT, buff=0.25).move_to(P(3.3, -0.6))
            for r in rows:
                self.play(FadeIn(r, shift=0.2 * RIGHT), run_time=0.12 * d)
        self.clear_scene()

    # ------------------------------------------------------------ Scene 8
    def scene8(self):
        with self.voiceover(
            "Area is half base times height. With sides A and B meeting at angle C, the height is B sine C. "
            "So area is one half A B sine C."
        ) as vo:
            d = vo.duration
            Cv, Bv = P(-3, -1.5), P(3, -1.5)
            Av = Cv + 4 * np.array([np.cos(50 * DEGREES), np.sin(50 * DEGREES), 0])
            G = (Cv + Bv + Av) / 3
            fill = Polygon(Cv, Bv, Av, stroke_width=0, fill_color=SKY, fill_opacity=0.18)
            base = Line(Cv, Bv, color=INK, stroke_width=4)
            sb = Line(Cv, Av, color=INK, stroke_width=4)
            s3 = Line(Bv, Av, color=INK, stroke_width=4)
            la = MathTex("a", font_size=36).move_to((Cv + Bv) / 2 + 0.35 * DOWN)
            lb = side_label(Cv, Av, "b", G, 0.35, 36)
            arcC = arc_at(Cv, Bv, Av, 0.5)
            lC = MathTex("C", font_size=34).next_to(Cv, DL, buff=0.1)
            F = P(Av[0], -1.5)
            ht = DashedLine(Av, F, color=TEAL, stroke_width=4)
            hl = MathTex(r"b\sin C", font_size=34, color=TEAL).next_to(ht, RIGHT, buff=0.15)
            rm = right_mark(F, RIGHT, UP, 0.2, TEAL)
            self.play(Create(base), FadeIn(la), run_time=0.15 * d)
            self.play(Create(sb), Create(s3), FadeIn(lb), Create(arcC), FadeIn(lC), run_time=0.2 * d)
            self.play(Create(ht), Create(rm), FadeIn(hl), run_time=0.2 * d)
            area = MathTex(r"\text{Area} = \tfrac12 ab\sin C").move_to(P(4.3, 3.1))
            box = SurroundingRectangle(area, color=CORAL, buff=0.15)
            self.play(FadeIn(fill), Write(area), run_time=0.2 * d)
            self.play(Create(box), run_time=0.1 * d)
            old = VGroup(fill, base, sb, s3, la, lb, arcC, lC, ht, hl, rm)
        self.wait(1.5)

        with self.voiceover(
            "Use the included angle. The area peaks at ninety degrees, where sine is one, "
            "giving back half base times height."
        ) as vo:
            d = vo.duration
            t = ValueTracker(50)
            C0, B0 = P(-4, -2), P(-0.7, -2)

            def apex():
                a = t.get_value() * DEGREES
                return C0 + 2.2 * np.array([np.cos(a), np.sin(a), 0])

            small = always_redraw(
                lambda: VGroup(
                    Polygon(C0, B0, apex(), stroke_color=INK, stroke_width=4, fill_color=SKY, fill_opacity=0.2),
                    arc_at(C0, B0, apex(), 0.35),
                )
            )
            sC = MathTex("C", font_size=30).next_to(C0, DOWN, buff=0.15)
            self.play(FadeOut(old), FadeIn(small), FadeIn(sC), run_time=0.12 * d)
            ax = Axes(
                x_range=[0, 180, 30], y_range=[0, 13, 4], x_length=5, y_length=3,
                axis_config={"color": MUTED, "include_tip": False, "stroke_width": 2},
            )
            ax.shift(P(1.2, -2) - ax.c2p(0, 0))
            xl = MathTex("C", font_size=32).next_to(ax.x_axis.get_right(), RIGHT, buff=0.15)
            yl = MathTex(r"\text{Area}", font_size=30).next_to(ax.y_axis.get_top(), UP, buff=0.12)
            ticks = VGroup(
                MathTex(r"90^\circ", font_size=26).next_to(ax.c2p(90, 0), DOWN, buff=0.15),
                MathTex(r"180^\circ", font_size=26).next_to(ax.c2p(180, 0), DOWN, buff=0.15),
            )
            curve = ax.plot(lambda x: 12 * np.sin(np.radians(x)), x_range=[0, 180], color=SKY, stroke_width=4)
            dot = always_redraw(
                lambda: Dot(ax.c2p(t.get_value(), 12 * np.sin(t.get_value() * DEGREES)), color=SKY, radius=0.09)
            )
            self.play(Create(ax), FadeIn(xl, yl, ticks), run_time=0.12 * d)
            self.play(Create(curve), run_time=0.12 * d)
            self.add(dot)
            self.play(t.animate.set_value(20), run_time=0.08 * d)
            self.play(t.animate.set_value(160), run_time=0.2 * d)
            self.play(t.animate.set_value(90), run_time=0.14 * d)
            peak = Dot(ax.c2p(90, 12), color=CORAL, radius=0.11)
            rmk = right_mark(C0, RIGHT, UP, 0.3, CORAL)
            f90 = MathTex(r"C = 90^\circ:\ \tfrac12 ab = \tfrac12\cdot\text{base}\cdot\text{height}", font_size=38)
            f90.to_edge(LEFT, buff=0.5).set_y(2.0)
            self.play(FadeIn(peak), Create(rmk), Write(f90), run_time=0.15 * d)

        with self.voiceover("Three sides, no angle? Heron's formula, which follows from the law of cosines.") as vo:
            d = vo.duration
            self.clear_scene(run_time=0.12 * d)
            her = MathTex(r"\text{Area} = \sqrt{s(s-a)(s-b)(s-c)},\ \ s = \frac{a+b+c}{2}")
            fit(her, 12).move_to(P(0, 1.6))
            self.play(Write(her), run_time=0.3 * d)
            chain = MathTex(
                r"\text{Law of Cosines}", r"\to", r"\cos C", r"\to", r"\sin C", r"\to",
                r"\tfrac12 ab\sin C", r"\to", r"\text{Heron}", font_size=40,
            )
            fit(chain, 12.5).move_to(P(0, -0.8))
            chain[0].set_color(TEAL)
            chain[-1].set_color(CORAL)
            self.play(LaggedStart(*[FadeIn(p, shift=0.2 * RIGHT) for p in chain], lag_ratio=0.3),
                      run_time=0.5 * d)

        with self.voiceover(
            "So: right triangle, SOH CAH TOA and Pythagoras. Matched pair, law of sines. "
            "Included angle or three sides, law of cosines. Area, one half A B sine C, or Heron."
        ) as vo:
            d = vo.duration
            self.clear_scene(run_time=0.08 * d)
            data = [
                ("Right triangle", "SOH-CAH-TOA, Pythagoras"),
                ("Matched pair", "Law of Sines (check SSA)"),
                ("SAS or SSS", "Law of Cosines"),
                ("Area", "½ab sin C, or Heron"),
            ]
            rows = VGroup()
            for i, (k, v) in enumerate(data):
                kt = Text(k, font_size=32, weight="BOLD", color=[SKY, TEAL, CORAL, YEL][i])
                ar = Text("→", font_size=32)
                vt = Text(v, font_size=32)
                rows.add(VGroup(kt, ar, vt))
            for r in rows:
                r[0].move_to(P(0, 0), aligned_edge=RIGHT)
            rows.arrange(DOWN, buff=0.55)
            for r in rows:
                r[0].set_x(-1.1, direction=RIGHT)
                r[1].set_x(-0.5)
                r[2].set_x(0.1, direction=LEFT)
            rows.move_to(P(0.4, 0))
            for r, f in zip(rows, [0.18, 0.2, 0.22, 0.22]):
                self.play(FadeIn(r, shift=0.2 * RIGHT), run_time=0.1 * d)
                self.wait(max(0.01, (f - 0.1) * d))

        with self.voiceover(
            "A ship sails forty kilometers on bearing fifty, then twenty five kilometers on bearing one forty. "
            "The bearings differ by ninety, so the turn is a right angle, and the law of cosines becomes "
            "Pythagoras: about forty seven point two kilometers."
        ) as vo:
            d = vo.duration
            self.clear_scene(run_time=0.06 * d)
            s = 1.25
            port = P(-4.2, -2.2)
            T = port + s * 3.2 * np.array([np.cos(40 * DEGREES), np.sin(40 * DEGREES), 0])
            E = T + s * 2.0 * np.array([np.cos(-50 * DEGREES), np.sin(-50 * DEGREES), 0])
            north = VGroup(
                Arrow(P(-6.2, 1.2), P(-6.2, 2.6), buff=0, color=INK, stroke_width=4),
                Text("N", font_size=28).move_to(P(-6.2, 2.95)),
            )
            pd = Dot(port, color=INK)
            pl = Text("port", font_size=26).next_to(port, DOWN, buff=0.15)
            leg1 = Arrow(port, T, buff=0, color=SKY, stroke_width=5, max_tip_length_to_length_ratio=0.08)
            leg2 = Arrow(T, E, buff=0, color=TEAL, stroke_width=5, max_tip_length_to_length_ratio=0.12)
            G = (port + T + E) / 3
            l1 = side_label(port, T, r"40\text{ km}", G, 0.45, 32, SKY)
            l2 = side_label(T, E, r"25\text{ km}", G, 0.55, 32, TEAL)
            self.play(FadeIn(north, pd, pl), run_time=0.08 * d)
            self.play(GrowArrow(leg1), FadeIn(l1), run_time=0.14 * d)
            self.play(GrowArrow(leg2), FadeIn(l2), run_time=0.14 * d)
            eq1 = MathTex(r"140^\circ - 50^\circ = 90^\circ", font_size=42).move_to(P(3.6, 1.6))
            rm = right_mark(T, port - T, E - T, 0.3, CORAL)
            self.play(Write(eq1), Create(rm), run_time=0.2 * d)
            back = DashedLine(E, port, color=CORAL, stroke_width=4)
            eq2 = MathTex(r"\sqrt{40^2 + 25^2} \approx 47.2\text{ km}", font_size=42, color=CORAL).move_to(P(3.6, 0.4))
            self.play(Create(back), run_time=0.15 * d)
            self.play(Write(eq2), run_time=0.15 * d)
        self.clear_scene()

    # ------------------------------------------------------------ Scene 9
    def scene9(self):
        frame = self.camera.frame
        with self.voiceover(
            "Compare small angles in radians with their sines. The ratio is point eight four at one, point nine "
            "six at one half, point nine nine eight at one tenth, and nearly one at one thousandth."
        ) as vo:
            d = vo.duration
            data = [
                [r"\theta", r"\sin\theta", r"\frac{\sin\theta}{\theta}"],
                ["1", "0.84147", "0.84147"],
                ["0.5", "0.47943", "0.95885"],
                ["0.1", "0.09983", "0.99833"],
                ["0.01", "0.0099998", "0.99998"],
                ["0.001", "0.000999999", "0.9999998"],
            ]
            tab = MathTable(
                data,
                include_outer_lines=False,
                v_buff=0.35,
                h_buff=0.9,
                element_to_mobject_config={"color": INK},
                line_config={"stroke_color": MUTED, "stroke_width": 2},
            ).scale(0.75).move_to(ORIGIN)
            rows = tab.get_rows()
            lines = VGroup(tab.get_horizontal_lines(), tab.get_vertical_lines())
            self.play(FadeIn(rows[0]), Create(lines), run_time=0.12 * d)
            times = [0.3, 0.45, 0.62, 0.75, 0.88]
            now = 0.12
            for i, tt in enumerate(times, start=1):
                if tt - 0.08 > now:
                    self.wait((tt - 0.08 - now) * d)
                    now = tt - 0.08
                self.play(FadeIn(rows[i], shift=0.15 * DOWN), rows[i][2].animate.set_color(CORAL),
                          run_time=0.08 * d)
                now += 0.08

        with self.voiceover(
            "So for small theta, sine theta is nearly theta. Theta is the arc, sine theta the height, "
            "and a tiny arc is nearly straight."
        ) as vo:
            d = vo.duration
            top = MathTex(r"\sin\theta \approx \theta", font_size=48).move_to(P(-4.6, 3.2))
            self.play(FadeOut(VGroup(rows, lines), scale=0.3), Write(top), run_time=0.12 * d)
            R = 3.0
            th = ValueTracker(0.6)
            ws = ValueTracker(1.0)
            axes = VGroup(
                Line(P(-3.5, 0), P(3.6, 0), color=MUTED, stroke_width=2),
                Line(P(0, -3.5), P(0, 3.5), color=MUTED, stroke_width=2),
            )
            circ = Circle(radius=R, color=INK, stroke_width=3)

            def endpt():
                a = th.get_value()
                return P(R * np.cos(a), R * np.sin(a))

            radius = always_redraw(lambda: Line(ORIGIN, endpt(), color=INK, stroke_width=3 * ws.get_value()))
            arc = always_redraw(
                lambda: Arc(radius=R, start_angle=0, angle=th.get_value(), color=CORAL, stroke_width=6 * ws.get_value())
            )
            height = always_redraw(
                lambda: Line(P(endpt()[0], 0), endpt(), color=TEAL, stroke_width=5 * ws.get_value())
            )
            lth = always_redraw(
                lambda: MathTex(r"\theta", font_size=40, color=CORAL).move_to(
                    (R + 0.4) * np.array([np.cos(th.get_value() / 2), np.sin(th.get_value() / 2), 0])
                )
            )
            lsin = always_redraw(
                lambda: MathTex(r"\sin\theta", font_size=36, color=TEAL).next_to(
                    P(endpt()[0], endpt()[1] / 2), LEFT, buff=0.15
                )
            )
            self.play(Create(axes), Create(circ), run_time=0.12 * d)
            self.play(Create(radius), Create(arc), Create(height), FadeIn(lth, lsin), run_time=0.15 * d)
            self.play(th.animate.set_value(0.1), run_time=0.25 * d)
            self.play(FadeOut(lth, lsin, top), run_time=0.08 * d)
            target = circ.point_at_angle(0.1)
            self.play(frame.animate.scale(0.15).move_to(target), ws.animate.set_value(0.2),
                      circ.animate.set_stroke(width=0.5), axes.animate.set_stroke(width=0.4), run_time=0.22 * d)
            zl1 = MathTex(r"\theta", font_size=7, color=CORAL).move_to(target + P(0.07, -0.12))
            zl2 = MathTex(r"\sin\theta", font_size=7, color=TEAL).move_to(target + P(-0.12, -0.15))
            self.play(FadeIn(zl1, zl2), run_time=0.08 * d)
        self.wait(1.0)

        with self.voiceover("Near zero, the graphs of sine x and x are indistinguishable.") as vo:
            d = vo.duration
            self.play(frame.animate.scale(1 / 0.15).move_to(ORIGIN), run_time=0.15 * d)
            self.clear_scene(run_time=0.08 * d)
            ax = Axes(
                x_range=[-1, 1, 0.5], y_range=[-1, 1, 0.5], x_length=8, y_length=6,
                axis_config={"color": MUTED, "include_tip": False, "stroke_width": 2},
            ).move_to(ORIGIN)
            g1 = ax.plot(np.sin, x_range=[-1, 1], color=SKY, stroke_width=4)
            g2 = ax.plot(lambda x: x, x_range=[-1, 1], color=CORAL, stroke_width=3)
            g3 = ax.plot(lambda x: np.sin(x) - x, x_range=[-1, 1], color=TEAL, stroke_width=4)
            leg = VGroup(
                MathTex(r"\sin x", color=SKY, font_size=36),
                MathTex(r"x", color=CORAL, font_size=36),
                MathTex(r"\sin x - x", color=TEAL, font_size=36),
            ).arrange(DOWN, aligned_edge=LEFT, buff=0.2).move_to(P(-5.2, 2.4))
            self.play(Create(ax), FadeIn(leg), run_time=0.12 * d)
            self.play(Create(g1), Create(g2), Create(g3), run_time=0.25 * d)
            self.play(frame.animate.scale(0.12).move_to(ax.c2p(0, 0)),
                      g1.animate.set_stroke(width=0.9), g2.animate.set_stroke(width=0.5),
                      g3.animate.set_stroke(width=0.7), ax.animate.set_stroke(width=0.3), run_time=0.3 * d)

        with self.voiceover(
            "Radians only. In degrees, sine of one degree would be about one. It is actually zero point zero "
            "one seven five. Only radians make angle and arc length the same number."
        ) as vo:
            d = vo.duration
            self.play(frame.animate.scale(1 / 0.12).move_to(ORIGIN), run_time=0.12 * d)
            self.clear_scene(run_time=0.06 * d)
            wrong = MathTex(r"\sin 1^\circ \approx 1", font_size=44).set_opacity(0.6).move_to(P(-3.6, 3.0))
            xw = Cross(wrong, stroke_color=CORAL, stroke_width=3, scale_factor=0.9)
            right = MathTex(r"\sin 1^\circ \approx 0.01745,\ \text{not } 1", font_size=44).move_to(P(2.6, 3.0))
            self.play(FadeIn(wrong), run_time=0.1 * d)
            self.play(Create(xw), run_time=0.1 * d)
            self.play(Write(right), run_time=0.18 * d)
            O = P(-3.0, -1.3)
            R = 2.4
            circ = Circle(radius=R, color=INK, stroke_width=3).move_to(O)
            r1 = Line(O, O + R * RIGHT, color=INK, stroke_width=3)
            r2 = Line(O, O + R * np.array([np.cos(1), np.sin(1), 0]), color=INK, stroke_width=3)
            arc1 = Arc(radius=R, start_angle=0, angle=1, arc_center=O, color=CORAL, stroke_width=7)
            lr = MathTex("r", font_size=36).next_to(r1, DOWN, buff=0.12)
            larc = MathTex("r", font_size=36, color=CORAL).move_to(O + (R + 0.35) * np.array([np.cos(0.5), np.sin(0.5), 0]))
            l1 = MathTex(r"1\text{ rad}", font_size=32).move_to(O + 0.9 * np.array([np.cos(0.5), np.sin(0.5), 0]))
            cap = MathTex(r"\text{radians: arc length} = r\,\theta", font_size=44).move_to(P(3.3, -1.3))
            self.play(Create(circ), Create(r1), Create(r2), run_time=0.15 * d)
            self.play(Create(arc1), FadeIn(lr, larc, l1), run_time=0.12 * d)
            self.play(Write(cap), run_time=0.12 * d)

        with self.voiceover(
            "That lets physics swap sine theta for theta for a small pendulum swing, with an error of order theta cubed."
        ) as vo:
            d = vo.duration
            self.clear_scene(run_time=0.08 * d)
            pivot = P(-3.2, 2.6)
            L = 4.2
            sw = ValueTracker(0.0)
            amp = 0.28
            bob_pt = lambda: pivot + L * np.array([np.sin(sw.get_value()), -np.cos(sw.get_value()), 0])
            ceiling = Line(pivot + 0.8 * LEFT, pivot + 0.8 * RIGHT, color=INK, stroke_width=4)
            rest = DashedLine(pivot, pivot + L * DOWN, color=MUTED, stroke_width=2)
            rod = always_redraw(lambda: Line(pivot, bob_pt(), color=INK, stroke_width=3))
            bob = always_redraw(lambda: Dot(bob_pt(), color=CORAL, radius=0.18))
            tl = MathTex(r"\theta", font_size=34).move_to(pivot + 1.3 * DOWN + 0.28 * RIGHT)
            self.play(Create(ceiling), Create(rest), FadeIn(rod, bob), FadeIn(tl), run_time=0.12 * d)
            f1 = MathTex(r"\sin\theta \to \theta", font_size=50).move_to(P(2.6, 1.0))
            f2 = MathTex(r"\text{error} \sim \theta^3", font_size=46, color=CORAL).move_to(P(2.6, -0.3))
            self.play(sw.animate.set_value(amp), Write(f1), run_time=0.14 * d)
            self.play(sw.animate.set_value(-amp), run_time=0.24 * d)
            self.play(sw.animate.set_value(amp), FadeIn(f2), run_time=0.24 * d)
            self.play(sw.animate.set_value(0), run_time=0.12 * d)
        self.clear_scene()

    # ------------------------------------------------------------ Scene 10
    def scene10(self):
        with self.voiceover(
            "At zero, sine theta over theta is zero over zero. But it closes in on one: "
            "the limit as theta approaches zero is one."
        ) as vo:
            d = vo.duration
            ax = Axes(
                x_range=[-6.5, 6.5, 1], y_range=[-0.5, 1.5, 0.5], x_length=12.4, y_length=4,
                axis_config={"color": MUTED, "include_tip": False, "stroke_width": 2},
            ).move_to(P(0, -1.2))
            f = lambda x: np.sin(x) / x if abs(x) > 1e-6 else 1.0
            curve = ax.plot(f, x_range=[-6.5, 6.5, 0.02], discontinuities=[0], dt=0.03, color=SKY, stroke_width=4)
            hole = Circle(radius=0.08, stroke_color=SKY, stroke_width=3, fill_color=BG, fill_opacity=1).move_to(ax.c2p(0, 1))
            one = MathTex("1", font_size=30).next_to(ax.c2p(0, 1), LEFT, buff=0.25)
            self.play(Create(ax), run_time=0.1 * d)
            self.play(Create(curve), run_time=0.2 * d)
            self.add(hole)
            self.play(FadeIn(hole, one), run_time=0.05 * d)
            t = ValueTracker(3.0)
            dl = always_redraw(lambda: Dot(ax.c2p(-t.get_value(), f(t.get_value())), color=CORAL, radius=0.09))
            dr = always_redraw(lambda: Dot(ax.c2p(t.get_value(), f(t.get_value())), color=CORAL, radius=0.09))
            lbl = MathTex(r"\frac{\sin\theta}{\theta} =", font_size=40).move_to(P(-4.6, 2.7))
            num = DecimalNumber(f(3.0), num_decimal_places=4, font_size=40, color=CORAL)
            num.add_updater(lambda m: m.set_value(f(t.get_value())).next_to(lbl, RIGHT, buff=0.2))
            self.play(FadeIn(dl, dr, lbl, num), run_time=0.08 * d)
            self.play(t.animate.set_value(0.02), run_time=0.35 * d, rate_func=rate_functions.ease_out_sine)
            lim = MathTex(r"\lim_{\theta \to 0} \frac{\sin\theta}{\theta} = 1").move_to(P(3.6, 2.6))
            box = SurroundingRectangle(lim, color=CORAL, buff=0.15)
            self.play(Write(lim), Create(box), run_time=0.15 * d)
            num.clear_updaters()
        self.wait(1.5)

        with self.voiceover(
            "That limit builds the derivative. Expand sine of x plus h with the angle sum formula, and the "
            "difference quotient splits: one piece goes to one, the other to zero. The derivative of sine x is cosine x."
        ) as vo:
            d = vo.duration
            self.clear_scene(run_time=0.06 * d)
            q = MathTex(r"\frac{\sin(x+h) - \sin x}{h}").move_to(P(0, 2.7))
            self.play(Write(q), run_time=0.14 * d)
            tag = MathTex(r"\text{angle sum, Ch 3.3}", font_size=30, color=MUTED).move_to(P(3.3, 1.75))
            arrow1 = Arrow(P(0, 2.0), P(0, 1.35), buff=0, color=MUTED, stroke_width=3)
            split = MathTex(r"\sin x\,", r"\frac{\cos h - 1}{h}", r"+ \cos x\,", r"\frac{\sin h}{h}").move_to(P(0, 0.6))
            self.play(FadeIn(tag), GrowArrow(arrow1), TransformMatchingShapes(q.copy(), split), run_time=0.2 * d)
            t0 = MathTex(r"\to 0", font_size=36, color=CORAL).next_to(split[1], DOWN, buff=0.2)
            t1 = MathTex(r"\to 1", font_size=36, color=SKY).next_to(split[3], DOWN, buff=0.2)
            self.play(FadeIn(t1, shift=0.1 * DOWN), split[3].animate.set_color(SKY), run_time=0.12 * d)
            self.play(FadeIn(t0, shift=0.1 * DOWN), split[1].animate.set_color(CORAL), run_time=0.12 * d)
            arrow2 = Arrow(P(0, -0.75), P(0, -1.45), buff=0, color=INK, stroke_width=4)
            res = MathTex(r"\frac{d}{dx}\sin x = \cos x").move_to(P(0, -2.3))
            box = SurroundingRectangle(res, color=CORAL, buff=0.18)
            self.play(GrowArrow(arrow2), Write(res), run_time=0.15 * d)
            self.play(Create(box), run_time=0.1 * d)
        self.wait(1.5)

        with self.voiceover(
            "You saw this coming: sine is steepest where cosine peaks, and flat where cosine is zero."
        ) as vo:
            d = vo.duration
            self.clear_scene(run_time=0.06 * d)
            ax = Axes(
                x_range=[0, TAU, PI / 2], y_range=[-1.3, 1.3, 1], x_length=10, y_length=4.4,
                axis_config={"color": MUTED, "include_tip": False, "stroke_width": 2},
            ).move_to(P(0, -0.8))
            xt = VGroup(*[
                MathTex(s, font_size=34).next_to(ax.c2p(v, 0), dv, buff=0.15).shift(sh)
                for s, v, dv, sh in [
                    (r"\frac{\pi}{2}", PI / 2, DOWN, 0.3 * LEFT),
                    (r"\pi", PI, UP, 0.25 * RIGHT),
                    (r"\frac{3\pi}{2}", 3 * PI / 2, UP, 0.3 * LEFT),
                    (r"2\pi", TAU, DOWN, 0.2 * RIGHT),
                ]
            ])
            s = ax.plot(np.sin, x_range=[0, TAU], color=SKY, stroke_width=4)
            c = DashedVMobject(ax.plot(np.cos, x_range=[0, TAU], color=CORAL, stroke_width=4), num_dashes=50)
            leg = VGroup(
                MathTex(r"\sin x", color=SKY, font_size=36),
                MathTex(r"\cos x", color=CORAL, font_size=36),
            ).arrange(RIGHT, buff=0.5).move_to(P(4.4, 3.3))
            self.play(Create(ax), FadeIn(xt, leg), Create(s), Create(c), run_time=0.15 * d)
            x0 = ValueTracker(0.0)
            ux, uy = ax.x_axis.get_unit_size(), ax.y_axis.get_unit_size()

            def tangent():
                x = x0.get_value()
                slope = np.cos(x)
                dirv = unit(np.array([ux, slope * uy, 0]))
                p = ax.c2p(x, np.sin(x))
                return Line(p - 1.3 * dirv, p + 1.3 * dirv, color=INK, stroke_width=4)

            tan = always_redraw(tangent)
            ds = always_redraw(lambda: Dot(ax.c2p(x0.get_value(), np.sin(x0.get_value())), color=SKY, radius=0.09))
            dc = always_redraw(lambda: Dot(ax.c2p(x0.get_value(), np.cos(x0.get_value())), color=CORAL, radius=0.09))
            note = Text("steepest slope, cos = 1", font_size=30).move_to(P(-2.5, 3.3))
            self.play(FadeIn(tan, ds, dc, note), run_time=0.12 * d)
            self.wait(0.12 * d)
            note2 = Text("flat slope, cos = 0", font_size=30).move_to(P(-2.5, 3.3))
            self.play(x0.animate.set_value(PI / 2), ReplacementTransform(note, note2), run_time=0.3 * d)
            self.wait(0.1 * d)

        with self.voiceover(
            "In degrees, the limit is pi over one eighty, a constant stuck to every derivative forever. "
            "Radians make it one."
        ) as vo:
            d = vo.duration
            self.clear_scene(run_time=0.06 * d)
            g1 = MathTex(r"\text{degrees: } \lim_{\theta\to0}\frac{\sin\theta^\circ}{\theta} = ", r"\frac{\pi}{180}")
            g2 = MathTex(r"\frac{d}{dx}\sin x = ", r"\frac{\pi}{180}", r"\cos x")
            VGroup(g1, g2).arrange(DOWN, buff=0.5).move_to(P(-1.5, 1.4))
            self.play(Write(g1), run_time=0.2 * d)
            self.play(Write(g2), run_time=0.15 * d)
            b1 = SurroundingRectangle(g1[1], color=CORAL, buff=0.08)
            b2 = SurroundingRectangle(g2[1], color=CORAL, buff=0.08)
            ghosts = VGroup(*[
                g2[1].copy().set_color(CORAL).set_opacity(0.6 - 0.12 * i).move_to(g2.get_right() + P(0.8 + 0.9 * i, 0))
                for i in range(4)
            ])
            self.play(Create(b1), Create(b2), run_time=0.1 * d)
            self.play(LaggedStart(*[FadeIn(gh, shift=0.3 * RIGHT) for gh in ghosts], lag_ratio=0.3), run_time=0.2 * d)
            rad = MathTex(r"\text{radians: } \frac{d}{dx}\sin x = \cos x", color=TEAL).move_to(P(0, -1.8))
            self.play(FadeOut(VGroup(g1, g2, b1, b2, ghosts)), FadeIn(rad), run_time=0.15 * d)
            self.play(Indicate(rad, color=TEAL), run_time=0.1 * d)
        self.clear_scene()

    # ------------------------------------------------------------ Scene 11
    def chain_icon(self, i):
        if i == 0:
            t1 = Polygon(P(0, 0), P(0.6, 0), P(0, 0.45), color=SKY, stroke_width=3)
            t2 = Polygon(P(0.8, 0), P(1.7, 0), P(0.8, 0.68), color=SKY, stroke_width=3)
            return VGroup(t1, t2)
        if i == 1:
            c = Circle(radius=0.4, color=SKY, stroke_width=3)
            r = Line(ORIGIN, 0.4 * np.array([np.cos(0.8), np.sin(0.8), 0]), color=CORAL, stroke_width=3)
            return VGroup(c, r)
        if i == 2:
            return FunctionGraph(lambda x: 0.35 * np.sin(x * 3), x_range=[-1.0, 1.0], color=SKY, stroke_width=3)
        if i == 3:
            return MathTex(r"\sin^2+\cos^2=1", font_size=30, color=SKY)
        if i == 4:
            g = FunctionGraph(lambda x: 0.35 * np.sin(x * 3), x_range=[-1.0, 1.0], color=SKY, stroke_width=3)
            ds = VGroup(*[Dot(P(x, 0.35 * np.sin(3 * x)), radius=0.05, color=CORAL) for x in [-0.8, 0.8 - 2 * PI / 3 + 0.0, 0.8]])
            ln = Line(P(-1, 0.35 * np.sin(2.4)), P(1, 0.35 * np.sin(2.4)), color=MUTED, stroke_width=1.5)
            return VGroup(g, ln, ds)
        g = FunctionGraph(lambda x: 0.45 * np.sin(4 * x) / (4 * x) if abs(x) > 1e-4 else 0.45,
                          x_range=[-1.0, 1.0], color=SKY, stroke_width=3)
        hole = Circle(radius=0.05, stroke_color=CORAL, stroke_width=2.5, fill_color=BG, fill_opacity=1).move_to(P(0, 0.45))
        return VGroup(g, hole)

    def scene11(self):
        with self.voiceover(
            "The course is one chain: similar triangles, the unit circle, the wave, identities, solving, "
            "and now any triangle and a limit."
        ) as vo:
            d = vo.duration
            names = [
                r"\text{Ch 0: ratios}", r"\text{Ch 1: unit circle}", r"\text{Ch 2: wave}",
                r"\text{Ch 3: identities}", r"\text{Ch 4: solving}", r"\text{Ch 5: laws + limit}",
            ]
            items = VGroup()
            for i, n in enumerate(names):
                lab = MathTex(n, font_size=30)
                icon = self.chain_icon(i)
                icon.scale_to_fit_width(min(icon.width, 1.3))
                items.add(VGroup(lab, icon).arrange(DOWN, buff=0.35))
            arrows = VGroup()
            row = VGroup()
            for i, it in enumerate(items):
                row.add(it)
                if i < len(items) - 1:
                    a = MathTex(r"\to", font_size=34, color=MUTED)
                    arrows.add(a)
                    row.add(a)
            row.arrange(RIGHT, buff=0.18)
            for a, it in zip(arrows, items):
                a.set_y(it[0].get_y())
            fit(row, 13.2).move_to(P(0, 0.3))
            step = 0.85 / 6
            for i, it in enumerate(items):
                anims = [FadeIn(it, shift=0.2 * UP)]
                if i > 0:
                    anims.append(FadeIn(arrows[i - 1]))
                self.play(*anims, run_time=step * 0.5 * d)
                self.play(Indicate(it[0], color=CORAL, scale_factor=1.1), run_time=step * 0.5 * d)
            self.row = row

        with self.voiceover(
            "This chapter derived both triangle laws and the area formula, and sine theta over theta handed "
            "trigonometry to calculus. Next, the full course diagnostic, one question per chapter. "
            "Then calculus, starting with limits."
        ) as vo:
            d = vo.duration
            self.play(FadeOut(self.row, shift=1.5 * UP), run_time=0.1 * d)
            recap = VGroup(
                MathTex(r"\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C}", font_size=40),
                MathTex(r"a^2 = b^2 + c^2 - 2bc\cos A", font_size=40),
                MathTex(r"\text{Area} = \tfrac12 ab\sin C", font_size=40),
                MathTex(r"\lim_{\theta\to0}\frac{\sin\theta}{\theta} = 1", font_size=40),
            ).arrange(DOWN, buff=0.35).move_to(P(0, 0.9))
            for r in recap:
                self.play(FadeIn(r, shift=0.2 * UP), run_time=0.1 * d)
            self.wait(0.1 * d)
            end = Text("Next: 5.7 Full-Course Diagnostic, then Calculus, Chapter 1: Limits", font_size=30, color=CORAL)
            fit(end, 12.5).move_to(P(0, -3.0))
            self.play(FadeIn(end, shift=0.2 * UP), run_time=0.12 * d)
        self.wait(1.0)
        self.clear_scene()
