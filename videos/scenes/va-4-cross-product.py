import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import math  # noqa: E402

import numpy as np  # noqa: E402

# Chapter colour roles (light background).
A_C = PRIMARY  # vector a / position r = strawberry red
B_C = ManimColor("#2B6CB0")  # vector b / force F = blue
N_C = GREEN  # the cross product (normal) = green
HL = ManimColor("#D19A00")  # highlight gold
WARN = PRIMARY
AREA_C = ACCENT

# Oblique projection of a right-handed frame: x to the right, y receding
# into the screen (drawn up-right), z straight up.
EX = np.array([1.0, 0.0, 0.0])
EY = np.array([0.5, 0.45, 0.0])
EZ = np.array([0.0, 1.0, 0.0])


def p3(v, O, s=1.0):
    return O + s * (v[0] * EX + v[1] * EY + v[2] * EZ)


def T(s, size=30, **kw):
    return Text(s, font_size=size, **kw)


def M(s, size=40, **kw):
    return MathTex(s, font_size=size, **kw)


def card(mob, pad=0.25, color=MUTED, fill=WHITE, opacity=0.9):
    box = SurroundingRectangle(mob, buff=pad, corner_radius=0.15, color=color, stroke_width=2)
    box.set_fill(fill, opacity=opacity)
    return VGroup(box, mob)


def arrow(a, b, color, sw=6):
    return Arrow(a, b, buff=0, color=color, stroke_width=sw,
                 max_tip_length_to_length_ratio=0.3, max_stroke_width_to_length_ratio=12)


def axes3(O, s, lens=(3, 2.4, 2.4), labels=True):
    g = VGroup()
    for v, name in (((lens[0], 0, 0), "x"), ((0, lens[1], 0), "y"), ((0, 0, lens[2]), "z")):
        ln = DashedLine(O, p3(v, O, s), color=MUTED, stroke_width=2, dash_length=0.08)
        g.add(ln)
        if labels:
            g.add(M(name, 28, color=MUTED).next_to(p3(v, O, s), UR if name != "z" else UP, buff=0.08))
    return g


def arc_arrow(pts, color, sw=4):
    curve = VMobject(color=color, stroke_width=sw).set_points_smoothly(pts)
    d = pts[-1] - pts[-2]
    tip = Triangle(color=color, fill_opacity=1, stroke_width=0).scale(0.11)
    tip.rotate(math.atan2(d[1], d[0]) - PI / 2).move_to(pts[-1])
    return VGroup(curve, tip)


def cross_out(mob, color=WARN):
    return Line(mob.get_corner(DL), mob.get_corner(UR), color=color, stroke_width=6)


class VectorsCh4Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Vector Algebra",
            "Chapter 4 · The Cross Product",
            "Chapter four. The cross product.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ scene 1: hook
    def s1(self):
        header = T("4.1 · Turning, Area and a Missing Direction", 26, color=MUTED).to_corner(UL, buff=0.4)
        O = np.array([-4.9, -1.6, 0])
        s = 1.35
        ax = axes3(O, s, (3.2, 2.6, 2.6))
        nut = RegularPolygon(6, color=INK, fill_color=MUTED, fill_opacity=0.6, stroke_width=2)
        nut.scale(0.28).stretch(0.45, 1).move_to(O)
        tip = p3((2.6, 0, 0), O, s)
        spanner = Line(O, tip, color=INK, stroke_width=14, stroke_opacity=0.75)
        sp_lab = T("spanner (east)", 24).next_to(Line(O, tip), DOWN, buff=0.2)
        push = arrow(tip, p3((2.6, 1.7, 0), O, s), B_C)
        push_lab = T("push (north)", 24, color=B_C).next_to(push.get_end(), RIGHT, buff=0.15)

        with self.voiceover("A spanner on a bolt. The spanner points east, and you push its free end north.") as vo:
            self.play(FadeIn(header), Create(ax), FadeIn(nut), run_time=1.2)
            self.play(Create(spanner), FadeIn(sp_lab), run_time=1.0)
            self.play(GrowArrow(push), FadeIn(push_lab), run_time=1.0)

        pts = [p3((0.55 * math.cos(t), 0.55 * math.sin(t), 0), O, s) for t in np.linspace(-0.5, 2.3, 20)]
        turn = arc_arrow(pts, ACCENT)
        up = arrow(O, p3((0, 0, 2.2), O, s), N_C, sw=8)
        up_lab = T("bolt moves", 24, color=N_C).next_to(up.get_end(), LEFT, buff=0.15)
        with self.voiceover("The bolt turns, and it moves. But not east, and not north. "
                            "It rises straight up, along an axis perpendicular to both the spanner and your push.") as vo:
            self.play(Create(turn), run_time=1.2)
            self.play(Rotate(nut, angle=PI / 3), run_time=1.0)
            self.play(GrowArrow(up), FadeIn(up_lab), run_time=1.4)
            ra = RightAngle(Line(O, up.get_end()), Line(O, tip), length=0.25, color=MUTED, quadrant=(1, 1))
            self.play(Create(ra), run_time=0.6)

        dot_line = M(r"\vec a\cdot\vec b = \text{a number}", 40).move_to([4.2, 1.9, 0])
        no_dir = T("no direction", 26, color=WARN).next_to(dot_line, DOWN, buff=0.25)
        crs = M(r"\vec a\times\vec b", 80, color=N_C).move_to([4.4, -1.3, 0])
        crs_lab = T("a third direction", 26, color=N_C).next_to(crs, DOWN, buff=0.3)
        with self.voiceover("The dot product cannot describe this. It turns two vectors into a number, "
                            "and a number has no direction. We need a product of two vectors that gives a third direction. "
                            "That is the cross product, written vector a cross vector b.") as vo:
            self.play(Write(dot_line), run_time=1.2)
            self.play(FadeIn(no_dir), Create(cross_out(dot_line)), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.45 - 2.2))
            self.play(Write(crs), FadeIn(crs_lab), run_time=1.4)

    # ------------------------------------------------------------ scene 2: area + direction
    def s2(self):
        header = T("4.1 · Area and a missing direction", 26, color=MUTED).to_corner(UL, buff=0.4)
        O = np.array([-5.2, -2.0, 0])
        a_end = O + 3.6 * RIGHT
        th = 55 * DEGREES
        b_end = O + 2.6 * np.array([math.cos(th), math.sin(th), 0])
        par = Polygon(O, a_end, a_end + (b_end - O), b_end, color=AREA_C, fill_color=AREA_C,
                      fill_opacity=0.25, stroke_width=2)
        va = arrow(O, a_end, A_C)
        vb = arrow(O, b_end, B_C)
        la = M(r"\vec a", 36, color=A_C).next_to(va, DOWN, buff=0.15)
        lb = M(r"\vec b", 36, color=B_C).next_to(vb.get_center(), LEFT, buff=0.2)
        ang = Arc(radius=0.55, start_angle=0, angle=th, arc_center=O, color=HL, stroke_width=4)
        lth = M(r"\theta", 30, color=HL).move_to(O + 0.8 * np.array([math.cos(th / 2), math.sin(th / 2), 0]))
        foot = np.array([b_end[0], O[1], 0])
        h = DashedLine(b_end, foot, color=INK, stroke_width=3)
        hl = M(r"|\vec b|\sin\theta", 30).next_to(h, RIGHT, buff=0.1)
        f1 = M(r"\text{Area} = |\vec a|\,|\vec b|\sin\theta", 44).move_to([3.4, 1.0, 0])

        with self.voiceover("What should this product depend on? Two vectors from a common tail span a parallelogram. "
                            "Its base is the length of vector a, and its height is the length of vector b times sine theta. "
                            "So its area is length a, times length b, times sine theta.") as vo:
            self.play(FadeIn(header), GrowArrow(va), GrowArrow(vb), FadeIn(la), FadeIn(lb), run_time=1.2)
            self.play(Create(ang), FadeIn(lth), run_time=0.6)
            self.play(FadeIn(par), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.35 - 2.8))
            self.play(Create(h), FadeIn(hl), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.25 - 1.0))
            self.play(Write(f1), run_time=1.4)

        plan = VGroup(
            T("length  =  area of the parallelogram", 28, color=AREA_C),
            T("direction  =  straight out of its face", 28, color=N_C),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.3).next_to(f1, DOWN, buff=0.6)
        with self.voiceover("Here is the plan. The length of the new product is that area. "
                            "Its direction is the one direction the parallelogram does not contain: straight out of its face.") as vo:
            self.play(FadeIn(plan[0], shift=0.2 * UP), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.4 - 1.0))
            self.play(FadeIn(plan[1], shift=0.2 * UP), run_time=1.0)

        self.clear_scene()
        # 3D picture: a = 3i fixed, b swings around in the floor, normal = a x b.
        header2 = T("4.1 · The normal arrow", 26, color=MUTED).to_corner(UL, buff=0.4)
        O3 = np.array([-2.2, -1.5, 0])
        s = 1.0
        ax = axes3(O3, s, (4.2, 3.2, 3.4))
        phi = ValueTracker(60 * DEGREES)
        A = np.array([3.0, 0, 0])
        R = 2.2

        def B():
            f = phi.get_value()
            return np.array([R * math.cos(f), R * math.sin(f), 0])

        def N():
            return np.cross(A, B()) * 0.3

        par3 = always_redraw(lambda: Polygon(
            O3, p3(A, O3, s), p3(A + B(), O3, s), p3(B(), O3, s),
            color=AREA_C, fill_color=AREA_C, fill_opacity=0.25, stroke_width=2))
        va3 = arrow(O3, p3(A, O3, s), A_C)
        la3 = M(r"\vec a", 36, color=A_C).next_to(va3.get_end(), DOWN, buff=0.15)
        vb3 = always_redraw(lambda: arrow(O3, p3(B(), O3, s), B_C))
        lb3 = always_redraw(lambda: M(r"\vec b", 36, color=B_C).next_to(p3(B() * 1.12, O3, s), UP, buff=0.05))

        def nvec():
            n = N()
            if abs(n[2]) < 0.05:
                return Dot(O3, color=N_C, radius=0.07)
            return arrow(O3, p3(n, O3, s), N_C, sw=8)

        vn = always_redraw(nvec)
        ln = always_redraw(lambda: M(r"\vec a\times\vec b", 34, color=N_C).next_to(
            p3(N(), O3, s), UP if N()[2] >= 0 else DOWN, buff=0.12))
        readout = always_redraw(lambda: T(
            "b turned %d° from a     |a × b| = %.1f" % (int(round(phi.get_value() / DEGREES)) % 360,
                                             abs(np.cross(A, B())[2])), 28).to_corner(UR, buff=0.5))

        with self.voiceover("Now in space. Vector a lies along the x axis, vector b lies in the floor, "
                            "and the cross product stands straight up out of the parallelogram.") as vo:
            self.play(FadeIn(header2), Create(ax), run_time=1.0)
            self.add(par3, va3, vb3, la3, lb3)
            self.play(FadeIn(par3), GrowArrow(va3), FadeIn(la3), run_time=1.0)
            self.add(vn, ln, readout)
            self.wait(max(0.1, vo.duration - 2.3))

        with self.voiceover("Swing vector b around. The arrow grows as the parallelogram opens, and is longest at ninety degrees. "
                            "It vanishes when b lines up with a, and flips downward once b crosses to the other side.") as vo:
            self.play(phi.animate.set_value(90 * DEGREES), run_time=vo.duration * 0.2)
            self.play(phi.animate.set_value(180 * DEGREES), run_time=vo.duration * 0.25, rate_func=linear)
            self.play(phi.animate.set_value(270 * DEGREES), run_time=vo.duration * 0.25)
            self.play(phi.animate.set_value(60 * DEGREES + 2 * PI), run_time=vo.duration * 0.25)

        rh = card(VGroup(
            T("Right-hand rule", 28, weight="BOLD"),
            T("fingers along a, curl toward b:", 24),
            T("thumb gives a × b", 24, color=N_C),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.15)).to_corner(DR, buff=0.4)
        pts = [p3((1.0 * math.cos(t), 1.0 * math.sin(t), 0), O3, s) for t in np.linspace(0.1, 60 * DEGREES - 0.05, 12)]
        curl = arc_arrow(pts, HL, sw=5)
        with self.voiceover("Which way is up? Use the right-hand rule. Fingers along vector a, curl them toward vector b "
                            "through the smaller angle, and your thumb gives the direction. "
                            "Seen from the tip of the arrow, the turn from a to b is anticlockwise.") as vo:
            self.play(FadeIn(rh, shift=0.2 * UP), run_time=1.0)
            self.play(Create(curl), run_time=1.2)

        warn = VGroup(T("It never lies in the plane of a and b.", 26, color=WARN))
        warn.to_corner(UR, buff=0.5).shift(0.8 * DOWN)
        with self.voiceover("And notice what the arrow never does: it never lies in the plane of a and b. "
                            "Capturing the direction the inputs do not supply is the whole point.") as vo:
            self.play(FadeIn(warn), run_time=1.0)
            self.play(Indicate(vn, color=N_C), run_time=1.2)
        for m in (par3, vb3, lb3, vn, ln, readout):
            m.clear_updaters()

    # ------------------------------------------------------------ scene 3: definition & properties
    def s3(self):
        header = T("4.2 · Definition and Properties", 26, color=MUTED).to_corner(UL, buff=0.4)
        d = M(r"\vec a\times\vec b = |\vec a|\,|\vec b|\sin\theta\;\hat n", 56).move_to([0, 2.2, 0])
        d[0][-2:].set_color(N_C)
        with self.voiceover("So here is the definition. Vector a cross vector b equals length a, times length b, times sine theta, "
                            "times n hat, the unit normal chosen by the right-hand rule.") as vo:
            self.play(FadeIn(header), Write(d), run_time=2.0)
            self.play(Circumscribe(d[0][-2:], color=N_C), run_time=1.2)

        props = VGroup(
            M(r"\vec b\times\vec a = -\,\vec a\times\vec b", 40),
            M(r"\vec a\times\vec a = \vec 0", 40),
            M(r"\vec a\parallel\vec b \iff \vec a\times\vec b = \vec 0", 40),
        ).arrange(DOWN, buff=0.45).move_to([0, -0.6, 0])
        with self.voiceover("Swap the order and the curl reverses, so b cross a is negative a cross b. Order matters.") as vo:
            self.play(Write(props[0]), run_time=1.4)
        with self.voiceover("A vector crossed with itself spans no area, so it gives the zero vector. "
                            "And two nonzero vectors are parallel exactly when their cross product is zero.") as vo:
            self.play(Write(props[1]), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.4 - 1.2))
            self.play(Write(props[2]), run_time=1.4)

        self.clear_scene()
        # the i -> j -> k cycle
        C = np.array([-3.6, -0.3, 0])
        r = 1.6
        pos = [C + r * np.array([math.cos(a), math.sin(a), 0]) for a in (PI / 2, PI / 2 - 2 * PI / 3, PI / 2 + 2 * PI / 3)]
        names = [r"\hat i", r"\hat j", r"\hat k"]
        nodes = VGroup(*[VGroup(Circle(0.42, color=INK, fill_color=WHITE, fill_opacity=1, stroke_width=3).move_to(p),
                                M(n, 44).move_to(p)) for p, n in zip(pos, names)])
        arcs = VGroup(*[CurvedArrow(pos[i] + 0.5 * normalize(pos[(i + 1) % 3] - pos[i]) + 0.2 * normalize(pos[i] - C),
                                    pos[(i + 1) % 3] + 0.5 * normalize(pos[i] - pos[(i + 1) % 3]) + 0.2 * normalize(pos[(i + 1) % 3] - C),
                                    angle=-PI / 4, color=GREEN, stroke_width=4) for i in range(3)])
        fwd = VGroup(M(r"\hat i\times\hat j = \hat k", 44), M(r"\hat j\times\hat k = \hat i", 44),
                     M(r"\hat k\times\hat i = \hat j", 44)).arrange(DOWN, buff=0.35, aligned_edge=LEFT)
        back = M(r"\hat j\times\hat i = -\hat k", 44, color=WARN)
        col = VGroup(fwd, back).arrange(DOWN, buff=0.5, aligned_edge=LEFT).move_to([2.8, 0, 0])
        hdr = T("4.2 · The cycle", 26, color=MUTED).to_corner(UL, buff=0.4)
        with self.voiceover("For the unit vectors, follow the cycle i, j, k. Going forward, i cross j is k, "
                            "j cross k is i, and k cross i is j.") as vo:
            self.play(FadeIn(hdr), FadeIn(nodes), run_time=1.0)
            self.play(Create(arcs), run_time=1.2)
            for m in fwd:
                self.play(Write(m), run_time=0.9)
        with self.voiceover("Going backward against the cycle gives a minus sign: j cross i is negative k.") as vo:
            self.play(Write(back), run_time=1.2)

        self.clear_scene()
        hdr2 = T("4.2 · Brackets matter", 26, color=MUTED).to_corner(UL, buff=0.4)
        l1 = MathTex(r"\hat i\times(\hat i\times\hat j)", r"= \hat i\times\hat k", r"= -\hat j", font_size=46)
        l2 = MathTex(r"(\hat i\times\hat i)\times\hat j", r"= \vec 0\times\hat j", r"= \vec 0", font_size=46)
        grp = VGroup(l1, l2).arrange(DOWN, buff=0.9, aligned_edge=LEFT).move_to([0, 0.3, 0])
        neq = T("not equal: the cross product is not associative", 30, color=WARN).next_to(grp, DOWN, buff=0.7)
        with self.voiceover("One more trap. The cross product is not associative. "
                            "i cross the quantity i cross j is i cross k, which is negative j.") as vo:
            self.play(FadeIn(hdr2), Write(l1[0]), run_time=1.2)
            self.play(Write(l1[1]), run_time=1.0)
            self.play(Write(l1[2]), run_time=1.0)
        with self.voiceover("But the quantity i cross i, then cross j, is zero cross j, which is zero. Brackets matter.") as vo:
            self.play(Write(l2[0]), run_time=1.0)
            self.play(Write(l2[1]), run_time=1.0)
            self.play(Write(l2[2]), run_time=0.8)
            self.play(FadeIn(neq), run_time=0.8)

    # ------------------------------------------------------------ scene 4: components
    def s4(self):
        header = T("4.3 · Computing in Components", 26, color=MUTED).to_corner(UL, buff=0.4)
        det = M(r"\vec a\times\vec b = \begin{vmatrix} \hat i & \hat j & \hat k \\ a_1 & a_2 & a_3 \\ b_1 & b_2 & b_3 \end{vmatrix}",
                48).move_to([0, 1.5, 0])
        with self.voiceover("To compute in components, distribute over i, j and k, and use the cycle. "
                            "The nine terms collapse into a pattern that is easiest to remember as a three by three determinant.") as vo:
            self.play(FadeIn(header), run_time=0.6)
            self.wait(max(0.1, vo.duration * 0.4 - 0.6))
            self.play(Write(det), run_time=2.0)

        exp = MathTex(r"= (a_2b_3 - a_3b_2)\,\hat i", r"\;-\;", r"(a_1b_3 - a_3b_1)\,\hat j",
                r"\;+\;(a_1b_2 - a_2b_1)\,\hat k", font_size=40).next_to(det, DOWN, buff=0.6)
        if exp.width > 13:
            exp.scale_to_fit_width(13)
        note = T("the middle term has a minus sign", 28, color=WARN).next_to(exp, DOWN, buff=0.5)
        with self.voiceover("Expand along the top row. The i part is a two b three minus a three b two. "
                            "The k part is a one b two minus a two b one. And the middle j part carries a minus sign. "
                            "Forgetting it is the most common mistake.") as vo:
            self.play(Write(exp[0]), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.25 - 1.2))
            self.play(Write(exp[3]), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.2 - 1.2))
            self.play(Write(exp[1]), Write(exp[2]), run_time=1.2)
            exp[1].set_color(WARN)
            self.play(Indicate(exp[1], color=WARN, scale_factor=1.8), FadeIn(note), run_time=1.2)

        self.clear_scene()
        hdr = T("4.3 · Worked example", 26, color=MUTED).to_corner(UL, buff=0.4)
        given = VGroup(M(r"\vec a = 2\hat i + 3\hat j - \hat k", 40, color=A_C),
                       M(r"\vec b = \hat i - \hat j + 2\hat k", 40, color=B_C)).arrange(RIGHT, buff=1.0).move_to([0, 2.5, 0])
        steps = VGroup(
            M(r"\hat i:\quad (3)(2) - (-1)(-1) = 5", 38),
            M(r"\hat j:\quad -\big[(2)(2) - (-1)(1)\big] = -5", 38),
            M(r"\hat k:\quad (2)(-1) - (3)(1) = -5", 38),
        ).arrange(DOWN, buff=0.3, aligned_edge=LEFT).move_to([0, 0.7, 0])
        ans = M(r"\vec a\times\vec b = 5\hat i - 5\hat j - 5\hat k", 46, color=N_C).next_to(steps, DOWN, buff=0.45)
        with self.voiceover("Try vector a equals two i plus three j minus k, and vector b equals i minus j plus two k. "
                            "The i part is six minus one, five. The j part is minus the quantity four plus one, so negative five. "
                            "The k part is negative two minus three, negative five. "
                            "So the cross product is five i minus five j minus five k.") as vo:
            self.play(FadeIn(hdr), Write(given), run_time=1.4)
            self.wait(max(0.1, vo.duration * 0.2 - 1.4))
            for i, st in enumerate(steps):
                self.play(Write(st), run_time=1.2)
                self.wait(max(0.1, vo.duration * 0.18 - 1.2))
            self.play(Write(ans), run_time=1.2)

        chk = VGroup(
            M(r"(5,-5,-5)\cdot\vec a = 10 - 15 + 5 = 0", 36),
            M(r"(5,-5,-5)\cdot\vec b = 5 + 5 - 10 = 0", 36),
        ).arrange(DOWN, buff=0.25).next_to(ans, DOWN, buff=0.45)
        ok = T("perpendicular to both", 28, color=GREEN).next_to(chk, RIGHT, buff=0.4)
        with self.voiceover("Always check. Dot the answer with vector a: ten minus fifteen plus five is zero. "
                            "Dot it with vector b: five plus five minus ten is zero. Perpendicular to both, as it must be.") as vo:
            self.play(Write(chk[0]), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.35 - 1.2))
            self.play(Write(chk[1]), run_time=1.2)
            self.play(FadeIn(ok), run_time=0.6)
        if ok.get_right()[0] > 7.0:
            pass

    # ------------------------------------------------------------ scene 5: areas
    def s5(self):
        header = T("4.4 · Areas of Parallelograms and Triangles", 26, color=MUTED).to_corner(UL, buff=0.4)
        O = np.array([-6.0, -1.2, 0])
        a = np.array([3.6, 0, 0])
        b = np.array([1.3, 2.2, 0])
        par = Polygon(O, O + a, O + a + b, O + b, color=AREA_C, fill_color=AREA_C, fill_opacity=0.15, stroke_width=2)
        tri = Polygon(O, O + a, O + b, color=AREA_C, fill_color=AREA_C, fill_opacity=0.45, stroke_width=0)
        diag = DashedLine(O + a, O + b, color=INK, stroke_width=3)
        va, vb = arrow(O, O + a, A_C), arrow(O, O + b, B_C)
        la = M(r"\vec a", 34, color=A_C).next_to(va, DOWN, buff=0.12)
        lb = M(r"\vec b", 34, color=B_C).next_to(vb.get_center(), LEFT, buff=0.15)
        f = VGroup(M(r"\text{parallelogram} = |\vec a\times\vec b|", 40),
                   M(r"\text{triangle} = \tfrac12\,|\vec a\times\vec b|", 40)).arrange(DOWN, buff=0.4, aligned_edge=LEFT)
        f.move_to([3.2, 1.0, 0])
        with self.voiceover("The length of the cross product is an area. The parallelogram on a and b has area "
                            "equal to the length of a cross b, and the triangle is half of it.") as vo:
            self.play(FadeIn(header), GrowArrow(va), GrowArrow(vb), FadeIn(la), FadeIn(lb), run_time=1.2)
            self.play(FadeIn(par), Write(f[0]), run_time=1.4)
            self.wait(max(0.1, vo.duration * 0.55 - 2.6))
            self.play(Create(diag), FadeIn(tri), Write(f[1]), run_time=1.4)

        self.clear_scene()
        hdr = T("4.4 · Triangle from three vertices", 26, color=MUTED).to_corner(UL, buff=0.4)
        pts = VGroup(M(r"A(1,1,2)", 38), M(r"B(2,3,5)", 38), M(r"C(1,5,5)", 38)).arrange(RIGHT, buff=0.9).move_to([0, 2.4, 0])
        rows = VGroup(
            M(r"\overrightarrow{AB} = (1,2,3), \quad \overrightarrow{AC} = (0,4,3)", 40),
            M(r"\overrightarrow{AB}\times\overrightarrow{AC} = (-6,\,-3,\,4)", 40),
            M(r"|\overrightarrow{AB}\times\overrightarrow{AC}| = \sqrt{36+9+16} = \sqrt{61}", 40),
            M(r"\text{Area} = \tfrac12\sqrt{61}", 48, color=N_C),
        ).arrange(DOWN, buff=0.35).move_to([0, -0.2, 0])
        with self.voiceover("For a triangle with vertices A, B and C, take two sides from the same corner. "
                            "With A at one, one, two, B at two, three, five, and C at one, five, five, "
                            "A B is one, two, three, and A C is zero, four, three.") as vo:
            self.play(FadeIn(hdr), Write(pts), run_time=1.4)
            self.wait(max(0.1, vo.duration * 0.5 - 1.4))
            self.play(Write(rows[0]), run_time=1.4)
        with self.voiceover("Their cross product is negative six, negative three, four. "
                            "Its length is root sixty one, so the area of the triangle is root sixty one over two.") as vo:
            self.play(Write(rows[1]), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.3 - 1.2))
            self.play(Write(rows[2]), run_time=1.2)
            self.play(Write(rows[3]), run_time=1.0)

        self.clear_scene()
        hdr2 = T("4.4 · Diagonals and collinearity", 26, color=MUTED).to_corner(UL, buff=0.4)
        O = np.array([-5.8, -1.4, 0])
        a = np.array([3.4, 0, 0])
        b = np.array([1.2, 2.3, 0])
        par = Polygon(O, O + a, O + a + b, O + b, color=AREA_C, fill_color=AREA_C, fill_opacity=0.2, stroke_width=3)
        d1 = arrow(O, O + a + b, A_C)
        d2 = arrow(O + a, O + b, B_C)
        l1 = M(r"\vec d_1", 32, color=A_C).next_to(d1.get_end(), RIGHT, buff=0.1)
        l2 = M(r"\vec d_2", 32, color=B_C).next_to(d2.get_end(), LEFT, buff=0.1)
        fd = M(r"\text{Area} = \tfrac12\,|\vec d_1\times\vec d_2|", 46).move_to([3.0, 1.4, 0])
        warn = T("do not drop the half", 28, color=WARN).next_to(fd, DOWN, buff=0.3)
        col = M(r"A, B, C \text{ collinear} \iff \overrightarrow{AB}\times\overrightarrow{AC} = \vec 0", 38).move_to([3.0, -1.2, 0])
        if col.get_right()[0] > 6.8:
            col.scale_to_fit_width(7.4).move_to([3.0, -1.2, 0])
        with self.voiceover("Given the diagonals of a parallelogram instead, the area is half the length of d one cross d two. "
                            "Do not drop the half.") as vo:
            self.play(FadeIn(hdr2), FadeIn(par), run_time=0.8)
            self.play(GrowArrow(d1), GrowArrow(d2), FadeIn(l1), FadeIn(l2), run_time=1.2)
            self.play(Write(fd), run_time=1.2)
            self.play(FadeIn(warn), run_time=0.6)
        with self.voiceover("And three points are collinear exactly when the triangle they make has zero area.") as vo:
            self.play(Write(col), run_time=1.6)

    # ------------------------------------------------------------ scene 6: normals, sines, torque
    def s6(self):
        header = T("4.5 · Normals, Sines and Torque", 26, color=MUTED).to_corner(UL, buff=0.4)
        O = np.array([-3.8, -0.9, 0])
        s = 1.0
        plane = Polygon(p3((-1.8, -1.6, 0), O, s), p3((1.8, -1.6, 0), O, s), p3((1.8, 1.6, 0), O, s),
                        p3((-1.8, 1.6, 0), O, s), color=MUTED, fill_color=GRID, fill_opacity=0.8, stroke_width=2)
        up = arrow(O, p3((0, 0, 1.8), O, s), N_C, sw=7)
        dn = arrow(O, p3((0, 0, -1.8), O, s), N_C, sw=7)
        lu = M(r"+\hat n", 36, color=N_C).next_to(up.get_end(), RIGHT, buff=0.12)
        ld = M(r"-\hat n", 36, color=N_C).next_to(dn.get_end(), RIGHT, buff=0.12)
        f = M(r"\hat n = \pm\,\frac{\vec a\times\vec b}{|\vec a\times\vec b|}", 50).move_to([3.3, 1.2, 0])
        two = T("two answers", 28, color=WARN).next_to(f, DOWN, buff=0.35)
        with self.voiceover("Divide the cross product by its length and you get a unit normal. "
                            "But there are two of them, plus and minus. A line perpendicular to a plane points both ways.") as vo:
            self.play(FadeIn(header), FadeIn(plane), run_time=1.0)
            self.play(GrowArrow(up), FadeIn(lu), Write(f), run_time=1.6)
            self.wait(max(0.1, vo.duration * 0.55 - 2.6))
            self.play(GrowArrow(dn), FadeIn(ld), FadeIn(two), run_time=1.2)

        self.clear_scene()
        hdr = T("4.5 · Dot for cosines, cross for sines", 26, color=MUTED).to_corner(UL, buff=0.4)
        sn = M(r"\sin\theta = \frac{|\vec a\times\vec b|}{|\vec a|\,|\vec b|}", 50).move_to([0, 2.1, 0])
        lag = M(r"|\vec a\times\vec b|^2 + (\vec a\cdot\vec b)^2 = |\vec a|^2\,|\vec b|^2", 48).next_to(sn, DOWN, buff=0.6)
        lag_lab = T("Lagrange's identity", 26, color=MUTED).next_to(lag, DOWN, buff=0.2)
        with self.voiceover("Lengths also give angles. Sine theta is the length of the cross product, "
                            "over length a times length b. Dot gives cosine, cross gives sine, "
                            "and together they obey Lagrange's identity: the cross product's length squared, "
                            "plus a dot b squared, equals length a squared times length b squared.") as vo:
            self.play(FadeIn(hdr), Write(sn), run_time=1.6)
            self.wait(max(0.1, vo.duration * 0.45 - 1.6))
            self.play(Write(lag), FadeIn(lag_lab), run_time=1.8)

        ex = VGroup(
            M(r"|\vec a| = 2,\quad |\vec b| = 5,\quad \vec a\cdot\vec b = 6", 38),
            M(r"|\vec a\times\vec b|^2 = 4\cdot 25 - 36 = 64", 38),
            M(r"|\vec a\times\vec b| = 8", 44, color=N_C),
        ).arrange(DOWN, buff=0.28).next_to(lag_lab, DOWN, buff=0.45)
        with self.voiceover("So if length a is two, length b is five, and a dot b is six, then the cross product's "
                            "length squared is one hundred minus thirty six, which is sixty four. The length is eight.") as vo:
            self.play(Write(ex[0]), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.3 - 1.2))
            self.play(Write(ex[1]), run_time=1.2)
            self.play(Write(ex[2]), run_time=0.8)

        self.clear_scene()
        hdr2 = T("4.5 · Torque", 26, color=MUTED).to_corner(UL, buff=0.4)
        O = np.array([-4.9, -1.6, 0])
        s = 1.35
        ax = axes3(O, s, (3.2, 2.6, 2.6))
        nut = RegularPolygon(6, color=INK, fill_color=MUTED, fill_opacity=0.6, stroke_width=2)
        nut.scale(0.28).stretch(0.45, 1).move_to(O)
        tip = p3((2.6, 0, 0), O, s)
        r_v = arrow(O, tip, A_C, sw=8)
        r_l = M(r"\vec r = 0.3\,\hat i \text{ m}", 32, color=A_C).next_to(Line(O, tip), DOWN, buff=0.2)
        F_v = arrow(tip, p3((2.6, 1.7, 0), O, s), B_C)
        F_l = M(r"\vec F = 40\,\hat j \text{ N}", 32, color=B_C).next_to(F_v.get_end(), RIGHT, buff=0.15)
        tau = arrow(O, p3((0, 0, 2.2), O, s), N_C, sw=8)
        tau_l = M(r"\vec\tau", 38, color=N_C).next_to(tau.get_end(), LEFT, buff=0.15)
        eq = VGroup(M(r"\vec\tau = \vec r\times\vec F", 48),
                    M(r"= 0.3\cdot 40\,(\hat i\times\hat j)", 40),
                    M(r"= 12\,\hat k \text{ N m}", 44, color=N_C)).arrange(DOWN, buff=0.3, aligned_edge=LEFT)
        eq.move_to([4.0, 0.6, 0])
        with self.voiceover("Back to the spanner. Torque is r cross F. A spanner of zero point three metres along i, "
                            "pushed with forty newtons along j, gives twelve k newton metres. "
                            "That is a turn about the vertical axis, anticlockwise seen from above.") as vo:
            self.play(FadeIn(hdr2), Create(ax), FadeIn(nut), run_time=1.0)
            self.play(GrowArrow(r_v), FadeIn(r_l), GrowArrow(F_v), FadeIn(F_l), Write(eq[0]), run_time=1.6)
            self.wait(max(0.1, vo.duration * 0.35 - 2.6))
            self.play(Write(eq[1]), run_time=1.0)
            self.play(Write(eq[2]), GrowArrow(tau), FadeIn(tau_l), run_time=1.4)

    # ------------------------------------------------------------ scene 7: recap
    def s7(self):
        header = T("Recap", 30, weight="BOLD", color=PRIMARY).to_edge(UP, buff=0.4)

        def rc(title, body):
            inner = VGroup(M(title, 46), T(body, 24, color=MUTED)).arrange(DOWN, buff=0.25)
            box = RoundedRectangle(width=6.0, height=2.3, corner_radius=0.2, color=MUTED, stroke_width=2)
            box.set_fill(WHITE, opacity=0.9)
            inner.move_to(box)
            return VGroup(box, inner)

        cards = VGroup(
            rc(r"|\vec a\times\vec b| = |\vec a|\,|\vec b|\sin\theta", "length = parallelogram area"),
            rc(r"\vec b\times\vec a = -\,\vec a\times\vec b", "right-hand rule; parallel gives zero"),
            rc(r"\begin{vmatrix} \hat i & \hat j & \hat k \\ a_1 & a_2 & a_3 \\ b_1 & b_2 & b_3 \end{vmatrix}",
               "minus on the j term; check by dotting"),
            rc(r"\vec\tau = \vec r\times\vec F", "normals come in pairs; triangle = half"),
        ).arrange_in_grid(2, 2, buff=0.3).next_to(header, DOWN, buff=0.35)
        # the determinant card is taller; keep it inside its box
        for c in cards:
            if c[1].height > c[0].height - 0.25:
                c[1].scale_to_fit_height(c[0].height - 0.3).move_to(c[0])
            if c[1].width > c[0].width - 0.3:
                c[1].scale_to_fit_width(c[0].width - 0.4).move_to(c[0])
        with self.voiceover("To recap. The cross product is a vector. Its length is the area of the parallelogram, "
                            "and its direction is the normal given by the right-hand rule. "
                            "Swapping the order flips the sign, and parallel vectors give zero.") as vo:
            self.play(FadeIn(header), FadeIn(cards[0], shift=0.2 * UP), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.5 - 1.0))
            self.play(FadeIn(cards[1], shift=0.2 * UP), run_time=1.0)
        nxt = T("Next: Chapter 5 · The Scalar Triple Product and Vector Geometry", 24, color=PRIMARY)
        nxt.to_edge(DOWN, buff=0.3)
        with self.voiceover("Compute with the determinant, mind the minus on the j term, and check by dotting. "
                            "Then try the chapter four mastery quiz. Next, chapter five combines both products into a volume.") as vo:
            self.play(FadeIn(cards[2], shift=0.2 * UP), run_time=1.0)
            self.play(FadeIn(cards[3], shift=0.2 * UP), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.6 - 2.0))
            self.play(FadeIn(nxt), run_time=0.8)
        self.wait(0.8)
