import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

# Chapter colour roles (light background).
A_C = PRIMARY  # point A / vector a = strawberry red
B_C = SECONDARY  # point B / vector b = teal
P_C = ACCENT  # the new point P (or G) = amber
C_C = PURPLE  # third point / medians
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


def vec(start, end, color, sw=5):
    return Arrow(start, end, buff=0, color=color, stroke_width=sw,
                 max_tip_length_to_length_ratio=0.12, max_stroke_width_to_length_ratio=10)


def check():
    return MathTex(r"\checkmark", color=GREEN, font_size=56)


def cross_mark():
    return MathTex(r"\times", color=WARN, font_size=64)


def P(x, y):
    return np.array([x, y, 0.0])


def pt(p, color, r=0.09):
    return Dot(p, radius=r, color=color)


class VaCh2Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Vector Algebra",
            "Chapter 2 · Dividing Lines and Proving Geometry",
            "Chapter two. Dividing lines, and proving geometry.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ scene 1: internal section formula
    def s1(self):
        O = P(-6.4, -3.2)
        A = P(-5.8, -0.8)
        B = P(-1.0, 2.0)
        wire = Line(A, B, color=MUTED, stroke_width=5)
        dA = pt(A, A_C)
        dB = pt(B, B_C)
        lA = T("A", 30, color=A_C, weight="BOLD").next_to(A, LEFT, buff=0.2)
        lB = T("B", 30, color=B_C, weight="BOLD").next_to(B, UP, buff=0.2)
        t = ValueTracker(0.0)

        def ppos():
            return A + t.get_value() * (B - A)

        bead = always_redraw(lambda: Dot(ppos(), radius=0.14, color=P_C))
        lP = always_redraw(lambda: T("P", 30, color=P_C, weight="BOLD").next_to(ppos(), DR, buff=0.12))

        with self.voiceover("A bead is threaded on a straight wire from A to B. Slide it two fifths of the way "
                            "along. Where is it?") as vo:
            self.play(Create(wire), FadeIn(dA), FadeIn(dB), FadeIn(lA), FadeIn(lB), run_time=1.0)
            self.play(FadeIn(bead), FadeIn(lP), run_time=0.4)
            self.play(t.animate.set_value(0.4), run_time=2.0)

        ticks = VGroup(*[
            Line(A + k / 5 * (B - A) + 0.12 * normalize(np.array([-(B - A)[1], (B - A)[0], 0])),
                 A + k / 5 * (B - A) - 0.12 * normalize(np.array([-(B - A)[1], (B - A)[0], 0])),
                 color=INK, stroke_width=3)
            for k in range(1, 5)
        ])
        Pp = A + 0.4 * (B - A)
        br1 = BraceBetweenPoints(Pp, A, color=MUTED, buff=0.2)
        br2 = BraceBetweenPoints(B, Pp, color=MUTED, buff=0.2)
        m_l = M("m = 2", 32, color=INK)
        n_l = M("n = 3", 32, color=INK)
        br1.put_at_tip(m_l)
        br2.put_at_tip(n_l)
        with self.voiceover("Cut the wire into five equal parts. The bead has two parts behind it and three "
                            "ahead, so it divides A B in the ratio two to three. Call that m to n.") as vo:
            self.play(Create(ticks), run_time=0.8)
            self.play(GrowFromCenter(br1), FadeIn(m_l), run_time=0.8)
            self.play(GrowFromCenter(br2), FadeIn(n_l), run_time=0.8)

        va = vec(O, A, A_C)
        vb = vec(O, B, B_C)
        vp = always_redraw(lambda: vec(O, ppos(), P_C))
        lO = T("O", 28, color=INK).next_to(O, DOWN, buff=0.15)
        la = M(r"\vec a", 36, color=A_C).next_to(va.get_center(), LEFT, buff=0.15)
        lb = M(r"\vec b", 36, color=B_C).move_to(vb.get_center() + P(0.35, -0.35))
        with self.voiceover("From a fixed origin O, name every point by its position vector: vector a for A, "
                            "vector b for B, and the unknown vector p for the bead.") as vo:
            self.play(FadeIn(pt(O, INK, 0.06)), FadeIn(lO), GrowArrow(va), FadeIn(la), run_time=0.9)
            self.play(GrowArrow(vb), FadeIn(lb), run_time=0.9)
            self.play(FadeIn(vp), run_time=0.7)

        e1 = M(r"\overrightarrow{AP} = \frac{m}{m+n}\,\overrightarrow{AB}", 40).move_to(P(3.4, 2.6))
        e2 = M(r"\vec p - \vec a = \frac{m}{m+n}\,(\vec b - \vec a)", 40).move_to(P(3.4, 1.2))
        e3 = M(r"\vec p = \frac{n\,\vec a + m\,\vec b}{m+n}", 54).move_to(P(3.4, -0.5))
        box = SurroundingRectangle(e3, buff=0.25, corner_radius=0.15, color=PRIMARY, stroke_width=3)
        with self.voiceover(f"A P is the fraction m over m plus n of A B. Write each arrow as head minus tail: "
                            f"p minus {LA}, and b minus {LA}.") as vo:
            self.play(Write(e1), run_time=1.3)
            self.wait(vo.duration * 0.2)
            self.play(Write(e2), run_time=1.3)
        with self.voiceover("Solve for p. The section formula: vector p equals n times vector a, plus m times "
                            "vector b, all over m plus n.") as vo:
            self.play(TransformFromCopy(e2, e3), run_time=1.5)
            self.play(Create(box), run_time=0.6)

        with self.voiceover("Look at the weights. The bead is nearer to A, and A gets the bigger weight, three. "
                            "The nearer point gets the bigger weight, like the heavier end of a seesaw.") as vo:
            w = M(r"\vec p = \frac{3\,\vec a + 2\,\vec b}{5}", 44, color=P_C).move_to(P(3.4, -2.1))
            self.play(Write(w), run_time=1.2)
            self.play(Indicate(dA, color=HL, scale_factor=1.8), run_time=1.0)

        with self.voiceover("So never write m times vector a, plus n times vector b. Test it with m equals one, n equals zero: the bead is at "
                            "B, and only the correct formula gives b. And with m equal to n, you get the midpoint, "
                            "vector a plus vector b, over two.") as vo:
            self.clear_scene(0.5)
            bad = M(r"\frac{m\,\vec a + n\,\vec b}{m+n}", 56).move_to(P(-3.3, 1.5))
            good = M(r"\frac{n\,\vec a + m\,\vec b}{m+n}", 56).move_to(P(3.3, 1.5))
            c1 = cross_mark().next_to(bad, DOWN, buff=0.3)
            c2 = check().next_to(good, DOWN, buff=0.3)
            self.play(Write(bad), Write(good), run_time=1.0)
            self.play(FadeIn(c1), FadeIn(c2), run_time=0.5)
            self.wait(vo.duration * 0.25)
            mid = M(r"m = n:\quad \vec p = \frac{\vec a + \vec b}{2}", 50).move_to(P(0, -2.1))
            self.play(Write(mid), run_time=1.2)

    # ------------------------------------------------------------ scene 2: external division
    def s2(self):
        A = P(-2.0, -1.0)
        B = P(1.0, 0.0)
        d = B - A
        line = Line(A - 3.0 * d, A + 3.2 * d, color=GRID, stroke_width=4)
        seg = Line(A, B, color=MUTED, stroke_width=6)
        dA, dB = pt(A, A_C), pt(B, B_C)
        lA = T("A", 30, color=A_C, weight="BOLD").next_to(A, DOWN, buff=0.25)
        lB = T("B", 30, color=B_C, weight="BOLD").next_to(B, DOWN, buff=0.25)
        r = ValueTracker(2.0)

        def ppos():
            k = r.get_value() / (r.get_value() - 1)
            return A + k * d

        bead = always_redraw(lambda: Dot(ppos(), radius=0.14, color=P_C))
        lP = always_redraw(lambda: T("P", 30, color=P_C, weight="BOLD").next_to(ppos(), UP, buff=0.2))
        head = T("External division: P outside the segment", 32, color=PRIMARY, weight="BOLD").move_to(P(0, 3.3))

        with self.voiceover("Now let P leave the segment. P divides A B externally in the ratio two to one when "
                            "it sits on the line, outside, with A P twice P B.") as vo:
            self.play(FadeIn(head), Create(line), Create(seg), FadeIn(dA), FadeIn(dB), FadeIn(lA), FadeIn(lB),
                      run_time=1.2)
            self.play(FadeIn(bead), FadeIn(lP), run_time=0.6)
            ap = Line(A, ppos(), color=P_C, stroke_width=10).set_opacity(0.45)
            ap_l = M(r"AP : PB = 2 : 1", 40, color=P_C).move_to(P(3.2, -2.2))
            self.play(Create(ap), FadeIn(ap_l), run_time=1.0)
            pb = Line(B, ppos(), color=HL, stroke_width=16).set_opacity(0.6)
            pb_l = VGroup()
            self.play(Create(pb), run_time=0.8)

        f_int = M(r"\frac{n\,\vec a + m\,\vec b}{m+n}", 44).move_to(P(-3.6, 2.2))
        arrow = M(r"\xrightarrow{\;n\ \to\ -n\;}", 44).move_to(P(-0.6, 2.2))
        f_ext = M(r"\vec p = \frac{m\,\vec b - n\,\vec a}{m-n}", 48).move_to(P(3.2, 2.2))
        box = SurroundingRectangle(f_ext, buff=0.2, corner_radius=0.12, color=PRIMARY, stroke_width=3)
        with self.voiceover("You don't need a new idea. Take the internal formula and replace n by minus n. "
                            "Vector p equals m times vector b, minus n times vector a, all over m minus n.") as vo:
            self.play(FadeOut(ap), FadeOut(ap_l), FadeOut(pb), FadeOut(pb_l), FadeOut(head), run_time=0.5)
            self.play(Write(f_int), run_time=1.0)
            self.play(FadeIn(arrow), run_time=0.6)
            self.play(Write(f_ext), run_time=1.2)
            self.play(Create(box), run_time=0.5)

        ratio_l = M(r"m : n =", 40).move_to(P(-4.4, -3.0))
        ratio_v = DecimalNumber(2.0, num_decimal_places=2, font_size=40, color=P_C)
        ratio_v.add_updater(lambda m: m.set_value(r.get_value()).next_to(ratio_l, RIGHT, buff=0.15))
        one = M(r": 1", 40)
        one.add_updater(lambda m: m.next_to(ratio_v, RIGHT, buff=0.15))
        with self.voiceover("Now push the ratio towards one to one. P runs further and further away, and at "
                            "exactly one to one it is gone. The formula would divide by zero: no point outside "
                            "the segment is equally far from A and B.") as vo:
            self.play(FadeIn(ratio_l), FadeIn(ratio_v), FadeIn(one), run_time=0.5)
            self.play(r.animate.set_value(1.35), run_time=3.5, rate_func=smooth)
            gone = T("m = n: no external point", 30, color=WARN).move_to(P(3.2, -3.0))
            self.play(FadeIn(gone), run_time=0.6)
        with self.voiceover("And when m is smaller than n, say one to three, the same formula puts P behind A.") as vo:
            self.play(FadeOut(gone), run_time=0.3)
            r.set_value(0.2)
            self.play(r.animate.set_value(1 / 3), run_time=1.5)
            behind = T("m < n: P lands behind A", 30, color=P_C).move_to(P(3.2, -3.0))
            self.play(FadeIn(behind), run_time=0.6)
        ratio_v.clear_updaters()
        one.clear_updaters()

    # ------------------------------------------------------------ scene 3: centroid
    def s3(self):
        a0, b0, c0 = P(-3.6, 2.4), P(-6.3, -2.6), P(-0.6, -2.6)
        dA, dB, dC = pt(a0, A_C), pt(b0, B_C), pt(c0, C_C)
        lA = always_redraw(lambda: T("A", 28, color=A_C, weight="BOLD").next_to(dA, UP, buff=0.15))
        lB = always_redraw(lambda: T("B", 28, color=B_C, weight="BOLD").next_to(dB, LEFT, buff=0.15))
        lC = always_redraw(lambda: T("C", 28, color=C_C, weight="BOLD").next_to(dC, RIGHT, buff=0.15))
        tri = always_redraw(lambda: Polygon(dA.get_center(), dB.get_center(), dC.get_center(),
                                            color=INK, stroke_width=3))

        def mid(p, q):
            return (p.get_center() + q.get_center()) / 2

        med_a = always_redraw(lambda: Line(dA.get_center(), mid(dB, dC), color=C_C, stroke_width=3))
        med_b = always_redraw(lambda: Line(dB.get_center(), mid(dA, dC), color=C_C, stroke_width=3))
        med_c = always_redraw(lambda: Line(dC.get_center(), mid(dA, dB), color=C_C, stroke_width=3))
        gdot = always_redraw(lambda: Dot((dA.get_center() + dB.get_center() + dC.get_center()) / 3,
                                         radius=0.12, color=P_C))
        dD = always_redraw(lambda: Dot(mid(dB, dC), radius=0.07, color=INK))
        lD = always_redraw(lambda: T("D", 26).next_to(mid(dB, dC), DOWN, buff=0.15))

        with self.voiceover("A median joins a vertex to the midpoint of the opposite side. Take the median from "
                            "A to D, the midpoint of B C. So d is b plus c over two.") as vo:
            self.play(Create(tri), FadeIn(dA), FadeIn(dB), FadeIn(dC), FadeIn(lA), FadeIn(lB), FadeIn(lC),
                      run_time=1.2)
            self.play(FadeIn(dD), FadeIn(lD), Create(med_a), run_time=1.0)
            e1 = M(r"\vec d = \frac{\vec b + \vec c}{2}", 42).move_to(P(3.4, 2.6))
            self.play(Write(e1), run_time=1.0)
        e2 = M(r"\vec g = \frac{1\cdot\vec a + 2\,\vec d}{3}", 42).move_to(P(3.4, 1.1))
        e3 = M(r"\vec g = \frac{\vec a + \vec b + \vec c}{3}", 54).move_to(P(3.4, -0.6))
        box = SurroundingRectangle(e3, buff=0.25, corner_radius=0.15, color=PRIMARY, stroke_width=3)
        with self.voiceover("Take the point G that splits this median two to one from A. The section formula "
                            "gives one times vector a plus two times vector d, over three, which is vector a plus "
                            "b plus c, over three.") as vo:
            self.play(FadeIn(gdot), run_time=0.5)
            self.play(Write(e2), run_time=1.2)
            self.wait(vo.duration * 0.15)
            self.play(Write(e3), run_time=1.2)
            self.play(Create(box), run_time=0.5)
        with self.voiceover("That answer does not care which vertex we called A. So the two to one point of every "
                            "median is the same point, and all three medians pass through it. That point is the "
                            "centroid.") as vo:
            self.play(Create(med_b), Create(med_c), run_time=1.4)
            self.play(Flash(gdot.get_center(), color=HL), run_time=0.8)
        with self.voiceover("Drag the triangle about and the medians still meet at the average of the three "
                            "vertices.") as vo:
            self.play(dA.animate.move_to(P(-1.6, 2.2)), run_time=1.6)
            self.play(dB.animate.move_to(P(-5.6, -1.4)), run_time=1.4)
        warn = VGroup(T("2 : 1 measured from the vertex:", 28, color=WARN),
                      T("G is closer to the side", 28, color=WARN)).arrange(DOWN, buff=0.15)
        warn.move_to(P(3.4, -2.2))
        ratio = M(r"AG : GD = 2 : 1", 40, color=P_C).move_to(P(3.4, -3.4))
        with self.voiceover("Careful with the ratio. It is two to one measured from the vertex, so the centroid "
                            "sits closer to the side, not to the corner.") as vo:
            self.play(FadeIn(warn), run_time=0.7)
            self.play(Write(ratio), run_time=1.0)

    # ------------------------------------------------------------ scene 4: combinations & collinearity
    def s4(self):
        U = 1.2
        O = P(-5.2, -3.2)
        av, bv = U * P(2, 1), U * P(-1, 2)
        a = vec(O, O + av, A_C)
        b = vec(O, O + bv, B_C)
        la = M(r"\vec a", 36, color=A_C).next_to(a.get_end(), DOWN, buff=0.15)
        lb = M(r"\vec b", 36, color=B_C).next_to(b.get_end(), UP, buff=0.15)
        x = ValueTracker(0.0)
        y = ValueTracker(0.0)
        xa = always_redraw(lambda: DashedLine(O, O + x.get_value() * av, color=A_C, stroke_width=4))
        yb = always_redraw(lambda: DashedLine(O + x.get_value() * av, O + x.get_value() * av + y.get_value() * bv,
                                              color=B_C, stroke_width=4))
        tip = always_redraw(lambda: Dot(O + x.get_value() * av + y.get_value() * bv, radius=0.1, color=P_C))
        target = O + 2 * av + bv
        tgt = Circle(radius=0.2, color=P_C, stroke_width=3).move_to(target)
        head = T("Linear combinations", 34, color=PRIMARY, weight="BOLD").move_to(P(3.3, 3.2))

        with self.voiceover("The section formula builds a point by scaling vector a and vector b and adding. Now let the two "
                            "scalars be anything. x times vector a, plus y times vector b, is a linear combination.") as vo:
            self.play(FadeIn(head), GrowArrow(a), GrowArrow(b), FadeIn(la), FadeIn(lb), run_time=1.2)
            e = M(r"\vec r = x\,\vec a + y\,\vec b", 48).move_to(P(3.3, 2.1))
            self.play(Write(e), run_time=1.0)
        xl = M(r"x = 2,\ \ y = 1", 42, color=P_C).move_to(P(3.3, 0.9))
        with self.voiceover("To reach this target, stretch along vector a twice, then along vector b once. Any point of the "
                            "plane can be reached this way, in exactly one way, as long as vector a and vector b are not "
                            "parallel.") as vo:
            self.play(Create(tgt), FadeIn(tip), FadeIn(xa), FadeIn(yb), run_time=0.6)
            self.play(x.animate.set_value(2.0), run_time=1.5)
            self.play(y.animate.set_value(1.0), run_time=1.2)
            self.play(Write(xl), run_time=0.8)
        with self.voiceover("If vector b is just two times vector a, every combination stays on one line. Two parallel vectors "
                            "cannot build the plane.") as vo:
            bad = M(r"\vec b = 2\vec a:\ \ x\vec a + y\vec b = (x + 2y)\,\vec a", 38, color=WARN)
            bad.move_to(P(3.3, -0.3))
            fit(bad, 6.8)
            self.play(Write(bad), run_time=1.4)

        with self.voiceover("The same idea tests whether three points lie on a line. A, B and C are collinear "
                            "exactly when A B is a multiple of A C.") as vo:
            self.clear_scene(0.5)
            h2 = T("Collinearity test", 34, color=PRIMARY, weight="BOLD").move_to(P(0, 3.2))
            test = M(r"A, B, C \text{ collinear} \iff \overrightarrow{AC} = \lambda\,\overrightarrow{AB}", 46)
            test.move_to(P(0, 2.1))
            self.play(FadeIn(h2), Write(test), run_time=1.4)
        with self.voiceover("Take A at one, two, minus one, B at three, five, one, and C at seven, eleven, five. "
                            "A B is two, three, two. A C is six, nine, six, which is exactly three times A B. "
                            "So the points are collinear.") as vo:
            g = M(r"A(1,2,-1),\quad B(3,5,1),\quad C(7,11,5)", 40).move_to(P(0, 0.9))
            w1 = M(r"\overrightarrow{AB} = (2,3,2), \qquad \overrightarrow{AC} = (6,9,6)", 40).move_to(P(0, -0.3))
            w2 = M(r"\overrightarrow{AC} = 3\,\overrightarrow{AB}", 46, color=GREEN).move_to(P(-0.4, -1.5))
            c = check().next_to(w2, RIGHT, buff=0.4)
            self.play(FadeIn(g), run_time=0.7)
            self.wait(vo.duration * 0.2)
            self.play(Write(w1), run_time=1.3)
            self.wait(vo.duration * 0.2)
            self.play(Write(w2), FadeIn(c), run_time=1.0)
        with self.voiceover("In position vectors, the test reads: some combination of vectors a, b and c is zero, with "
                            "coefficients that add up to zero.") as vo:
            w3 = M(r"\alpha\vec a + \beta\vec b + \gamma\vec c = \vec 0, \qquad \alpha + \beta + \gamma = 0", 40,
                   color=P_C).move_to(P(0, -2.8))
            self.play(Write(w3), run_time=1.5)

    # ------------------------------------------------------------ scene 5: proofs
    def s5(self):
        A, B, C = P(-6.2, -2.2), P(-2.4, -2.2), P(-1.0, 1.2)
        D = A + (C - B)
        para = Polygon(A, B, C, D, color=INK, stroke_width=3)
        labs = VGroup(
            T("A", 28, color=INK).next_to(A, DL, buff=0.1),
            T("B", 28, color=INK).next_to(B, DR, buff=0.1),
            T("C", 28, color=INK).next_to(C, UR, buff=0.1),
            T("D", 28, color=INK).next_to(D, UL, buff=0.1),
        )
        diag1 = Line(A, C, color=A_C, stroke_width=3)
        diag2 = Line(B, D, color=B_C, stroke_width=3)
        mdot = Dot((A + C) / 2, radius=0.12, color=P_C)
        head = T("Proof: the diagonals of a parallelogram bisect each other", 30, color=PRIMARY, weight="BOLD")
        fit(head, 13.0).move_to(P(0, 3.3))

        with self.voiceover("Vectors turn geometry proofs into short calculations. The recipe: translate the "
                            "picture into position vectors, compute, then translate back. Claim: the diagonals "
                            "of a parallelogram bisect each other.") as vo:
            self.play(FadeIn(head), Create(para), FadeIn(labs), run_time=1.2)
            self.play(Create(diag1), Create(diag2), run_time=1.0)

        steps = VGroup(
            M(r"1.\ \ \overrightarrow{AB} = \overrightarrow{DC}\ \Rightarrow\ \vec b - \vec a = \vec c - \vec d", 38),
            M(r"2.\ \ \vec a + \vec c = \vec b + \vec d", 38),
            M(r"3.\ \ \frac{\vec a + \vec c}{2} = \frac{\vec b + \vec d}{2}", 38),
        ).arrange(DOWN, buff=0.45, aligned_edge=LEFT).move_to(P(3.3, 0.9))
        fit(steps, 7.4)
        with self.voiceover(f"A B C D is a parallelogram, so arrow A B equals arrow D C. Head minus tail: b minus {LA} "
                            f"equals c minus d. Rearrange: {LA} plus c equals b plus d. Divide by two.") as vo:
            self.play(Write(steps[0]), run_time=1.4)
            self.wait(vo.duration * 0.15)
            self.play(Write(steps[1]), run_time=1.0)
            self.wait(vo.duration * 0.1)
            self.play(Write(steps[2]), run_time=1.2)
        with self.voiceover("The left side is the midpoint of A C, the right side is the midpoint of B D. They "
                            "are the same point. Proved in four lines.") as vo:
            s4 = T("4. Same midpoint: the diagonals bisect each other.", 28, color=GREEN)
            fit(s4, 6.6).next_to(steps, DOWN, buff=0.45).align_to(steps, LEFT)
            self.play(FadeIn(mdot), Flash(mdot.get_center(), color=HL), run_time=0.8)
            self.play(FadeIn(s4), run_time=0.8)

        with self.voiceover("A tip: you may put the origin anywhere, so put it at a vertex to kill a variable. "
                            "For the midpoint theorem, put O at A. The midpoints of A B and A C are half b and "
                            "half c.") as vo:
            self.clear_scene(0.5)
            h2 = T("Midpoint theorem, with the origin at A", 32, color=PRIMARY, weight="BOLD").move_to(P(0, 3.3))
            A2, B2, C2 = P(-4.2, 2.2), P(-6.4, -2.6), P(-1.6, -2.6)
            tri = Polygon(A2, B2, C2, color=INK, stroke_width=3)
            Dm, Em = (A2 + B2) / 2, (A2 + C2) / 2
            de = Line(Dm, Em, color=P_C, stroke_width=5)
            bc = Line(B2, C2, color=B_C, stroke_width=5)
            tl = VGroup(
                T("A = O", 26).next_to(A2, UP, buff=0.12),
                T("B", 26).next_to(B2, LEFT, buff=0.12),
                T("C", 26).next_to(C2, RIGHT, buff=0.12),
                T("D", 26).next_to(Dm, LEFT, buff=0.12),
                T("E", 26).next_to(Em, RIGHT, buff=0.12),
            )
            self.play(FadeIn(h2), Create(tri), FadeIn(tl), run_time=1.2)
            m1 = M(r"\vec a = \vec 0,\quad \vec d = \tfrac12\vec b,\quad \vec e = \tfrac12\vec c", 40)
            m1.move_to(P(3.2, 1.6))
            self.play(Write(m1), run_time=1.3)
        with self.voiceover("So D E is e minus d, which is half of c minus b: half of B C. D E is parallel to B C "
                            "and half as long.") as vo:
            m2 = M(r"\overrightarrow{DE} = \vec e - \vec d = \tfrac12(\vec c - \vec b) = \tfrac12\,\overrightarrow{BC}",
                   40)
            fit(m2, 7.4).move_to(P(3.2, 0.2))
            self.play(Write(m2), run_time=1.6)
            self.play(Create(de), Create(bc), run_time=1.0)
            warn = T("Always head minus tail: arrow PQ is q minus p.", 26, color=WARN)
            fit(warn, 7.4).move_to(P(3.2, -1.4))
            self.play(FadeIn(warn), run_time=0.7)

    # ------------------------------------------------------------ scene 6: recap
    def s6(self):
        title = T("Chapter 2 in five lines", 38, color=PRIMARY, weight="BOLD").move_to(P(0, 3.2))
        lines = [
            (r"\vec p = \frac{n\vec a + m\vec b}{m+n}", "nearer point, bigger weight"),
            (r"\vec p = \frac{m\vec b - n\vec a}{m-n}", "external: n becomes minus n"),
            (r"\vec g = \frac{\vec a + \vec b + \vec c}{3}", "2 : 1 from the vertex"),
            (r"\overrightarrow{AC} = \lambda\,\overrightarrow{AB}", "collinear points"),
            (r"\text{translate} \to \text{compute} \to \text{translate back}", "vector proofs"),
        ]
        rows = VGroup()
        for i, (tex, note) in enumerate(lines):
            m = M(tex, 36)
            n = T(note, 26, color=MUTED)
            num = T(f"{i + 1}.", 28, color=PRIMARY, weight="BOLD")
            rows.add(VGroup(num, m, n))
        ys = [2.1, 0.9, -0.3, -1.4, -2.4]
        for r, yy in zip(rows, ys):
            r[0].move_to(P(-6.3, yy))
            r[1].next_to(r[0], RIGHT, buff=0.3)
            r[2].move_to(P(0, yy)).align_to(P(1.9, 0), LEFT)
        with self.voiceover("To recap. The section formula is a weighted average, and the nearer point gets the "
                            "bigger weight. External division is the same formula with n replaced by minus "
                            "n.") as vo:
            self.play(FadeIn(title), run_time=0.6)
            self.play(FadeIn(rows[0], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.25)
            self.play(FadeIn(rows[1], shift=0.15 * UP), run_time=0.7)
        with self.voiceover("The centroid is the average of the three vertices. Collinear means one arrow is a "
                            "multiple of another. And every vector proof is translate, compute, translate "
                            "back.") as vo:
            self.play(FadeIn(rows[2], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.15)
            self.play(FadeIn(rows[3], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.15)
            self.play(FadeIn(rows[4], shift=0.15 * UP), run_time=0.7)
        with self.voiceover("Try the mastery quiz. Then chapter three multiplies two vectors for the first time, "
                            "with the dot product.") as vo:
            nxt = T("Next: Chapter 3 · The Dot Product", 32, color=PRIMARY).move_to(P(0, -3.4))
            self.wait(vo.duration * 0.3)
            self.play(FadeIn(nxt, shift=0.2 * UP), run_time=0.8)
