import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

# Chapter colour roles (light background).
A_C = PRIMARY  # vector a / position vector of A = strawberry red
B_C = SECONDARY  # vector b = teal
S_C = PURPLE  # results (AB, r)
I_C = ACCENT  # i-hat / x-parts
J_C = GREEN  # j-hat / y-parts
K_C = SECONDARY  # k-hat / z-parts
HL = ManimColor("#D19A00")  # highlight (gold)
WARN = PRIMARY

# Oblique projection for 3D: x right, y receding up-right, z up (right-handed).
PX = np.array([1.0, 0.0, 0.0])
PY = np.array([0.55, 0.38, 0.0])
PZ = np.array([0.0, 1.0, 0.0])


# ---------------------------------------------------------------- helpers
def T(s, size=30, **kw):
    return Text(s, font_size=size, **kw)


def M(s, size=40, **kw):
    return MathTex(s, font_size=size, **kw)


def P(x, y):
    return np.array([x, y, 0.0])


def arr(start, end, color=INK, sw=6, tip=0.24):
    start = np.array(start, dtype=float)
    end = np.array(end, dtype=float)
    length = np.linalg.norm(end - start)
    ratio = min(0.35, tip / max(length, 1e-3))
    return Arrow(start, end, buff=0, color=color, stroke_width=sw,
                 max_tip_length_to_length_ratio=ratio, max_stroke_width_to_length_ratio=20)


def card(mob, pad=0.25, color=MUTED, opacity=0.92):
    box = SurroundingRectangle(mob, buff=pad, corner_radius=0.15, color=color, stroke_width=2)
    box.set_fill(WHITE, opacity=opacity)
    return VGroup(box, mob)


def bg(mob, opacity=0.9):
    mob.add_background_rectangle(color=BG, opacity=opacity, buff=0.06)
    return mob


def cross_out(mob):
    return VGroup(
        Line(mob.get_corner(UL), mob.get_corner(DR), color=WARN, stroke_width=5),
        Line(mob.get_corner(DL), mob.get_corner(UR), color=WARN, stroke_width=5),
    )


def check():
    return MathTex(r"\checkmark", color=GREEN, font_size=48)


def header(s):
    return T(s, 30, weight="BOLD", color=MUTED).to_corner(UL, buff=0.4)


def plane(xr, yr, unit, center):
    pl = NumberPlane(
        x_range=[xr[0], xr[1], 1], y_range=[yr[0], yr[1], 1],
        x_length=unit * (xr[1] - xr[0]), y_length=unit * (yr[1] - yr[0]),
        background_line_style={"stroke_color": GRID, "stroke_width": 2, "stroke_opacity": 1},
        axis_config={"stroke_color": MUTED, "stroke_width": 3, "include_ticks": False},
        faded_line_ratio=1,
    )
    pl.faded_lines.set_opacity(0)
    pl.shift(P(*center) - pl.c2p(0, 0))
    return pl


class Oblique:
    def __init__(self, origin, unit):
        self.o = np.append(np.array(origin, dtype=float)[:2], 0.0)
        self.u = unit

    def p(self, x, y, z):
        return self.o + self.u * (x * PX + y * PY + z * PZ)

    def axes(self, xl=4.5, yl=5.0, zl=7.8):
        o = self.p(0, 0, 0)
        ax = VGroup(
            arr(o, self.p(xl, 0, 0), MUTED, sw=3, tip=0.2),
            arr(o, self.p(0, yl, 0), MUTED, sw=3, tip=0.2),
            arr(o, self.p(0, 0, zl), MUTED, sw=3, tip=0.2),
        )
        labs = VGroup(
            M("x", 32, color=MUTED).next_to(self.p(xl, 0, 0), DOWN, buff=0.12),
            M("y", 32, color=MUTED).next_to(self.p(0, yl, 0), RIGHT, buff=0.12),
            M("z", 32, color=MUTED).next_to(self.p(0, 0, zl), LEFT, buff=0.12),
        )
        return ax, labs


class VaCh1Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Vector Algebra",
            "Chapter 1 · Vectors in Coordinates",
            "Chapter one. Vectors in coordinates.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ scene 1: hook + position vectors
    def s1(self):
        h = header("1.1 · Position vectors")
        pl = plane((-1, 6), (-1, 7), 0.72, (-5.4, -2.9))
        o_dot = Dot(pl.c2p(0, 0), color=INK, radius=0.09)
        o_lab = M("O", 32).next_to(o_dot, DL, buff=0.08)

        free = VGroup(*[arr(P(x, y), P(x + 1.6, y + 1.0), S_C) for x, y in
                        [(0.8, 1.2), (3.2, 0.2), (1.2, -1.8), (4.0, -2.4)]])
        q = card(T("Free arrows: nothing\nto calculate with", 26)).move_to(P(4.0, 2.2))

        with self.voiceover("In chapter zero, a vector was a free arrow. Slide it anywhere and it stays the "
                            "same vector. Lovely for pictures, but you cannot calculate with a picture. "
                            "So fix one point, the origin O, and measure everything from there.") as vo:
            self.play(FadeIn(h), LaggedStart(*[GrowArrow(a) for a in free], lag_ratio=0.25), run_time=1.6)
            self.play(FadeIn(q, shift=0.2 * DOWN), run_time=0.7)
            self.wait(max(0.1, vo.duration * 0.3))
            self.play(FadeOut(free), FadeOut(q), run_time=0.6)
            self.play(Create(pl), run_time=1.0)
            self.play(FadeIn(o_dot, scale=1.5), FadeIn(o_lab), run_time=0.6)

        A = pl.c2p(1, 2)
        B = pl.c2p(4, 6)
        a_ar = arr(pl.c2p(0, 0), A, A_C)
        b_ar = arr(pl.c2p(0, 0), B, B_C)
        a_dot = Dot(A, color=INK, radius=0.08)
        b_dot = Dot(B, color=INK, radius=0.08)
        a_pt = bg(M("A(1,2)", 30)).next_to(A, LEFT, buff=0.12)
        b_pt = bg(M("B(4,6)", 30)).next_to(B, RIGHT, buff=0.12)
        a_lab = bg(M(r"\vec a", 36, color=A_C)).next_to(a_ar.get_center(), RIGHT, buff=0.12)
        b_lab = bg(M(r"\vec b", 36, color=B_C)).next_to(b_ar.get_center(), RIGHT, buff=0.18)
        defn = card(VGroup(
            T("position vector of P", 26, color=MUTED),
            M(r"\vec p = \overrightarrow{OP}", 44),
        ).arrange(DOWN, buff=0.18)).move_to(P(3.6, 2.2))

        with self.voiceover("Now every point gets its own arrow, the one from O to that point. That arrow is "
                            "the point's position vector. The position vector of A is vector a, and of B, "
                            "vector b.") as vo:
            self.play(FadeIn(defn, shift=0.2 * DOWN), run_time=0.7)
            self.play(FadeIn(a_dot), FadeIn(a_pt), GrowArrow(a_ar), FadeIn(a_lab), run_time=1.0)
            self.play(FadeIn(b_dot), FadeIn(b_pt), GrowArrow(b_ar), FadeIn(b_lab), run_time=1.0)

        ab = arr(A, B, S_C, sw=7)
        ab_lab = bg(M(r"\overrightarrow{AB}", 34, color=S_C)).next_to(ab.get_center(), LEFT, buff=0.15)
        eq1 = M(r"\vec a + \overrightarrow{AB} = \vec b", 42)
        eq2 = M(r"\overrightarrow{AB} = \vec b - \vec a", 48, color=S_C)
        eqs = VGroup(eq1, eq2).arrange(DOWN, buff=0.4).move_to(P(3.6, 0.3))
        box2 = SurroundingRectangle(eq2, color=S_C, buff=0.15, corner_radius=0.1)

        with self.voiceover("What about the arrow from A to B? Walk from O to A, then from A to B. By the "
                            "triangle law that is the same trip as O straight to B. So a plus A B equals b, "
                            "and vector A B equals b minus a. Tip minus tail.") as vo:
            self.play(GrowArrow(ab), FadeIn(ab_lab), run_time=1.0)
            self.play(Indicate(a_ar, color=HL), run_time=0.6)
            self.play(Indicate(ab, color=HL), run_time=0.6)
            self.play(Indicate(b_ar, color=HL), run_time=0.6)
            self.play(Write(eq1), run_time=1.0)
            self.play(TransformFromCopy(eq1, eq2), run_time=1.0)
            self.play(Create(box2), run_time=0.5)

        num = M(r"= (4-1,\ 6-2) = (3,\ 4)", 38, color=S_C).next_to(eq2, DOWN, buff=0.35)
        wrong = M(r"\vec a - \vec b", 40).move_to(P(2.6, -2.6))
        x = cross_out(wrong)
        wtxt = T("points from B to A", 24, color=WARN).next_to(wrong, RIGHT, buff=0.3)

        with self.voiceover("With A at one, two and B at four, six, vector A B is three, four. End minus "
                            "start. The common slip is a minus b, but that arrow runs from B back to A, "
                            "exactly the wrong way.") as vo:
            self.play(FadeIn(num, shift=0.2 * UP), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.3))
            self.play(FadeIn(wrong), run_time=0.5)
            self.play(Create(x), FadeIn(wtxt), run_time=0.7)

    # ------------------------------------------------------------ scene 2: components in the plane
    def s2(self):
        h = header("1.2 · Components in the plane")
        pl = plane((-4, 5), (-1, 5), 0.8, (-3.4, -2.6))
        O = pl.c2p(0, 0)
        i_ar = arr(O, pl.c2p(1, 0), I_C, sw=7, tip=0.2)
        j_ar = arr(O, pl.c2p(0, 1), J_C, sw=7, tip=0.2)
        i_lab = bg(M(r"\hat i", 36, color=I_C)).next_to(pl.c2p(1, 0), DOWN, buff=0.15)
        j_lab = bg(M(r"\hat j", 36, color=J_C)).next_to(pl.c2p(0, 1), LEFT, buff=0.15)

        with self.voiceover("Put two unit arrows at the origin: i hat, one step along x, and j hat, one step "
                            "along y.") as vo:
            self.play(FadeIn(h), Create(pl), run_time=1.0)
            self.play(GrowArrow(i_ar), FadeIn(i_lab), GrowArrow(j_ar), FadeIn(j_lab), run_time=1.0)

        # r = 3i + 2j built as 3 i-steps then 2 j-steps
        steps_i = VGroup(*[arr(pl.c2p(k, 0), pl.c2p(k + 1, 0), I_C, sw=5, tip=0.18) for k in range(3)])
        steps_j = VGroup(*[arr(pl.c2p(3, k), pl.c2p(3, k + 1), J_C, sw=5, tip=0.18) for k in range(2)])
        r_ar = arr(O, pl.c2p(3, 2), S_C, sw=7)
        r_lab = bg(M(r"\vec r", 36, color=S_C)).next_to(r_ar.get_center(), UL, buff=0.05)
        eq = M(r"\vec r = 3\,\hat i + 2\,\hat j", 46).move_to(P(3.9, 2.3))
        gen = card(VGroup(
            M(r"\vec r = x\,\hat i + y\,\hat j", 42),
            T("every plane vector, one way only", 24, color=MUTED),
        ).arrange(DOWN, buff=0.15)).move_to(P(3.9, 0.9))

        with self.voiceover("To reach the point three, two, take three steps of i hat, then two steps of "
                            "j hat. So vector r is three i plus two j. Every vector in the plane is x i plus "
                            "y j, and in exactly one way. The numbers x and y are its components.") as vo:
            self.play(LaggedStart(*[GrowArrow(s) for s in steps_i], lag_ratio=0.5), run_time=1.3)
            self.play(LaggedStart(*[GrowArrow(s) for s in steps_j], lag_ratio=0.5), run_time=1.0)
            self.play(GrowArrow(r_ar), FadeIn(r_lab), run_time=0.8)
            self.play(Write(eq), run_time=0.9)
            self.wait(max(0.1, vo.duration * 0.2))
            self.play(FadeIn(gen, shift=0.2 * UP), run_time=0.8)

        # rotating vector with x = r cos, y = r sin
        self.play(FadeOut(VGroup(steps_i, steps_j, r_ar, r_lab, eq, gen)), run_time=0.5)
        R = 3.0
        th = ValueTracker(np.arctan2(2, 3))

        def tip():
            t = th.get_value()
            return pl.c2p(R * np.cos(t), R * np.sin(t))

        def foot():
            t = th.get_value()
            return pl.c2p(R * np.cos(t), 0)

        vec = always_redraw(lambda: arr(O, tip(), S_C, sw=7))
        xpart = always_redraw(lambda: Line(O, foot(), color=I_C, stroke_width=8))
        ypart = always_redraw(lambda: DashedLine(foot(), tip(), color=J_C, stroke_width=5))
        polar = card(M(r"x = r\cos\theta,\quad y = r\sin\theta", 40)).move_to(P(3.9, 2.3))
        xr = DecimalNumber(3.0, num_decimal_places=2, font_size=40, color=I_C, include_sign=True)
        yr = DecimalNumber(2.0, num_decimal_places=2, font_size=40, color=J_C, include_sign=True)
        read = VGroup(M("x =", 40, color=I_C), xr, M("y =", 40, color=J_C), yr)
        read.arrange(RIGHT, buff=0.2).move_to(P(3.9, 1.0))
        xr.add_updater(lambda m: m.set_value(R * np.cos(th.get_value())))
        yr.add_updater(lambda m: m.set_value(R * np.sin(th.get_value())))

        with self.voiceover("If you know the length r and the angle theta instead, drop a perpendicular. "
                            "The components are r cos theta and r sin theta, straight from trigonometry.") as vo:
            self.add(xpart, ypart, vec)
            self.play(FadeIn(polar, shift=0.2 * DOWN), FadeIn(read), run_time=0.8)
            self.play(th.animate.set_value(1.2), run_time=max(1.5, vo.duration * 0.5))

        neg = card(VGroup(
            T("Components are signed,", 26),
            T("not lengths: -2 is fine", 26, color=WARN),
        ).arrange(DOWN, buff=0.1, aligned_edge=LEFT)).move_to(P(3.9, -0.6))

        with self.voiceover("Swing the arrow into the second quadrant and x becomes negative. That is not an "
                            "error. A component is a signed step along an axis, not a length, so minus two "
                            "just means two steps to the left.") as vo:
            self.play(th.animate.set_value(np.arccos(-2 / 3)), run_time=max(1.5, vo.duration * 0.4))
            self.play(Indicate(xr, color=HL), run_time=0.7)
            self.play(FadeIn(neg, shift=0.2 * UP), run_time=0.7)

        xr.clear_updaters()
        yr.clear_updaters()
        for m in (vec, xpart, ypart):
            m.clear_updaters()
        add = card(VGroup(
            T("Add and scale per component", 24, color=MUTED),
            M(r"(3\hat i + 2\hat j) + (\hat i - 5\hat j) = 4\hat i - 3\hat j", 30),
            M(r"3(2\hat i - \hat j) = 6\hat i - 3\hat j", 30),
        ).arrange(DOWN, buff=0.15)).move_to(P(4.0, -2.55))

        with self.voiceover("And because i and j never mix, adding or scaling vectors is just adding or "
                            "scaling the matching components.") as vo:
            self.play(FadeIn(add, shift=0.2 * UP), run_time=0.9)

    # ------------------------------------------------------------ scene 3: three dimensions
    def s3(self):
        h = header("1.3 · Into three dimensions")
        ob = Oblique((-5.2, -2.9), 0.6)
        ax, labs = ob.axes()
        o = ob.p(0, 0, 0)
        ks = VGroup(
            arr(o, ob.p(1, 0, 0), I_C, sw=7, tip=0.18),
            arr(o, ob.p(0, 1, 0), J_C, sw=7, tip=0.18),
            arr(o, ob.p(0, 0, 1), K_C, sw=7, tip=0.18),
        )
        klabs = VGroup(
            bg(M(r"\hat i", 32, color=I_C)).next_to(ob.p(1, 0, 0), DOWN, buff=0.1),
            bg(M(r"\hat j", 32, color=J_C)).next_to(ob.p(1.0, 1.0, 0), RIGHT, buff=0.02),
            bg(M(r"\hat k", 32, color=K_C)).next_to(ob.p(0, 0, 1), LEFT, buff=0.1),
        )
        rh = card(VGroup(
            T("Right-handed:", 26, weight="BOLD"),
            T("curl fingers from x to y,", 24),
            T("thumb points along z", 24),
        ).arrange(DOWN, buff=0.1, aligned_edge=LEFT)).move_to(P(3.6, 2.2))

        with self.voiceover("Space needs a third axis. The axes are right handed: curl the fingers of your "
                            "right hand from x towards y, and your thumb points along z. The third unit "
                            "vector is k hat.") as vo:
            self.play(FadeIn(h), Create(ax), FadeIn(labs), run_time=1.2)
            self.play(FadeIn(rh, shift=0.2 * DOWN), run_time=0.7)
            self.play(LaggedStart(*[GrowArrow(k) for k in ks], lag_ratio=0.3), FadeIn(klabs), run_time=1.2)

        p = ob.p(2, 3, 6)
        f = ob.p(2, 3, 0)
        box_pts = [(0, 0, 0), (2, 0, 0), (2, 3, 0), (0, 3, 0)]
        floor = Polygon(*[ob.p(*q) for q in box_pts], stroke_width=0, fill_color=I_C, fill_opacity=0.12)
        edges = VGroup(
            DashedLine(ob.p(2, 0, 0), f, color=MUTED, stroke_width=2),
            DashedLine(ob.p(0, 3, 0), f, color=MUTED, stroke_width=2),
            DashedLine(ob.p(0, 0, 6), p, color=MUTED, stroke_width=2),
            DashedLine(ob.p(2, 0, 0), ob.p(2, 0, 6), color=MUTED, stroke_width=2),
            DashedLine(ob.p(0, 3, 0), ob.p(0, 3, 6), color=MUTED, stroke_width=2),
            DashedLine(ob.p(0, 0, 6), ob.p(2, 0, 6), color=MUTED, stroke_width=2),
            DashedLine(ob.p(0, 0, 6), ob.p(0, 3, 6), color=MUTED, stroke_width=2),
            DashedLine(ob.p(2, 0, 6), p, color=MUTED, stroke_width=2),
            DashedLine(ob.p(0, 3, 6), p, color=MUTED, stroke_width=2),
        )
        r_ar = arr(o, p, S_C, sw=7)
        p_lab = bg(M("P(2,3,6)", 30)).next_to(p, RIGHT, buff=0.12)
        eq = M(r"\vec r = 2\hat i + 3\hat j + 6\hat k", 42).move_to(P(3.6, 0.6))

        with self.voiceover("A point two, three, six sits at the far corner of a box two by three by six. "
                            "Its position vector is two i plus three j plus six k.") as vo:
            self.play(FadeOut(rh), FadeOut(ks), FadeOut(klabs), run_time=0.5)
            self.play(FadeIn(floor), Create(edges), run_time=1.2)
            self.play(GrowArrow(r_ar), FadeIn(p_lab), run_time=0.9)
            self.play(Write(eq), run_time=0.9)

        diag = Line(o, f, color=HL, stroke_width=6)
        dlab = bg(M(r"\sqrt{13}", 30, color=HL)).next_to(diag.get_center(), DOWN, buff=0.12)
        up = Line(f, p, color=K_C, stroke_width=6)
        ulab = bg(M("6", 30, color=K_C)).next_to(up.get_center(), RIGHT, buff=0.12)
        s1 = M(r"\text{floor: } \sqrt{2^2 + 3^2} = \sqrt{13}", 36)
        s2 = M(r"|\vec r| = \sqrt{13 + 6^2} = \sqrt{49} = 7", 36, color=S_C)
        s3 = M(r"|\vec r| = \sqrt{x^2 + y^2 + z^2}", 42)
        steps = VGroup(s1, s2, s3).arrange(DOWN, buff=0.35).move_to(P(3.6, -1.3))
        b3 = SurroundingRectangle(s3, color=S_C, buff=0.14, corner_radius=0.1)

        with self.voiceover("How long is it? Use Pythagoras twice. Across the floor, root of two squared "
                            "plus three squared, which is root thirteen. Then straight up by six. The length "
                            "is root of thirteen plus thirty six, root forty nine, which is seven. In general, "
                            "the length is the root of x squared plus y squared plus z squared.") as vo:
            self.play(Create(diag), FadeIn(dlab), FadeIn(s1), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(Create(up), FadeIn(ulab), run_time=0.8)
            self.play(FadeIn(s2, shift=0.2 * UP), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.2))
            self.play(FadeIn(s3, shift=0.2 * UP), Create(b3), run_time=0.9)

        wrong = card(VGroup(
            M(r"x + y + z = 11 \ne 7", 36, color=WARN),
            T("adding components is not the length", 22, color=MUTED),
        ).arrange(DOWN, buff=0.12), color=WARN).move_to(P(3.6, 2.4))
        dist = M(r"AB = |\vec b - \vec a|", 36).next_to(wrong, DOWN, buff=0.25)

        with self.voiceover("Adding the components gives eleven, which is not seven. The walk along the "
                            "edges is longer than the diagonal shortcut. And the distance between two "
                            "points A and B is simply the length of b minus a.") as vo:
            self.play(FadeOut(eq), FadeIn(wrong, shift=0.2 * DOWN), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.45))
            self.play(FadeIn(dist, shift=0.2 * DOWN), run_time=0.7)

    # ------------------------------------------------------------ scene 4: unit vectors
    def s4(self):
        h = header("1.4 · Unit vectors and component algebra")
        pl = plane((-1, 5), (-1, 5), 0.85, (-5.6, -2.7))
        O = pl.c2p(0, 0)
        a_ar = arr(O, pl.c2p(3, 4), A_C, sw=7)
        a_lab = bg(M(r"\vec a = 3\hat i + 4\hat j", 30, color=A_C)).next_to(pl.c2p(3, 4), RIGHT, buff=0.1)
        circ = Circle(radius=0.85, color=MUTED, stroke_width=2).move_to(O)
        hat = arr(O, pl.c2p(0.6, 0.8), S_C, sw=8, tip=0.2)
        hat_lab = bg(M(r"\hat a", 34, color=S_C)).next_to(pl.c2p(0.6, 0.8), LEFT, buff=0.35)
        f1 = M(r"\hat a = \frac{\vec a}{|\vec a|} = \frac{3\hat i + 4\hat j}{5} = \frac35\hat i + \frac45\hat j", 36)
        f1.move_to(P(2.8, 2.4))

        with self.voiceover("A unit vector has length one. It keeps a direction and throws away the size. "
                            "To get one, divide a vector by its own length. Three i plus four j has length "
                            "five, so its unit vector is three fifths i plus four fifths j.") as vo:
            self.play(FadeIn(h), Create(pl), run_time=0.9)
            self.play(GrowArrow(a_ar), FadeIn(a_lab), run_time=0.9)
            self.play(Create(circ), run_time=0.6)
            self.play(TransformFromCopy(a_ar, hat), FadeIn(hat_lab), run_time=1.3)
            self.play(Write(f1), run_time=1.3)

        ij = M(r"|\hat i + \hat j| = \sqrt{1^2 + 1^2} = \sqrt2 \ne 1", 36)
        ijx = VGroup(ij, T("so i + j is not a unit vector", 24, color=WARN)).arrange(DOWN, buff=0.12)
        ijc = card(ijx, color=WARN).move_to(P(2.8, 0.85))
        lam = M(r"\text{length } 10 \text{ along } \vec a:\ 10\,\hat a = 6\hat i + 8\hat j", 36)
        lam.move_to(P(2.8, -0.55))

        with self.voiceover("A trap: i plus j is made of two unit vectors, but its length is root two, not "
                            "one. And once you have a unit vector, any length is easy. A vector of length ten "
                            "along a is ten times a hat, six i plus eight j.") as vo:
            self.play(FadeIn(ijc, shift=0.2 * UP), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.35))
            self.play(FadeIn(lam, shift=0.2 * UP), run_time=0.8)

        eqv = M(r"\vec a = \vec b \iff a_1 = b_1,\ a_2 = b_2,\ a_3 = b_3", 34)
        col = M(r"\vec a \parallel \vec b \iff \frac{a_1}{b_1} = \frac{a_2}{b_2} = \frac{a_3}{b_3}", 36)
        ex = M(r"\frac{2}{-4} = \frac{-3}{6} = \frac{4}{-8} = -\tfrac12", 34, color=S_C)
        grp = VGroup(eqv, col, ex).arrange(DOWN, buff=0.28).move_to(P(2.8, -2.35))

        with self.voiceover("Two vectors are equal exactly when every component matches. And two vectors "
                            "are parallel when their components are in proportion. Two i minus three j plus "
                            "four k, and minus four i plus six j minus eight k, give the same ratio, minus a "
                            "half, so they are parallel, pointing opposite ways.") as vo:
            self.play(FadeOut(lam), run_time=0.4)
            grp.move_to(P(2.8, -1.7))
            self.play(FadeIn(eqv, shift=0.2 * UP), run_time=0.7)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(FadeIn(col, shift=0.2 * UP), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.2))
            self.play(FadeIn(ex, shift=0.2 * UP), run_time=0.8)

    # ------------------------------------------------------------ scene 5: direction cosines
    def s5(self):
        h = header("1.5 · Direction cosines and ratios")
        ob = Oblique((-5.2, -2.9), 0.6)
        ax, labs = ob.axes()
        o = ob.p(0, 0, 0)
        p = ob.p(2, 3, 6)
        z6 = ob.p(0, 0, 6)
        r_ar = arr(o, p, S_C, sw=7)
        p_lab = bg(M("P(2,3,6)", 30)).next_to(p, RIGHT, buff=0.12)
        r_lab = bg(M("r = 7", 30, color=S_C)).next_to(r_ar.get_center(), RIGHT, buff=0.15)

        tri = Polygon(o, z6, p, stroke_color=HL, stroke_width=3, fill_color=HL, fill_opacity=0.15)
        # right-angle mark at (0,0,6) between -z and the (2,3,0) direction
        d = np.array([2, 3, 0]) / np.sqrt(13) * 0.7
        c1 = ob.p(0, 0, 5.3)
        c2 = ob.p(d[0], d[1], 5.3)
        c3 = ob.p(d[0], d[1], 6)
        ra = VMobject(stroke_color=HL, stroke_width=2).set_points_as_corners([c1, c2, c3])
        gam = bg(M(r"\gamma", 34, color=HL)).move_to(ob.p(0.35, 0.5, 1.9))
        six = bg(M("6", 30, color=K_C)).next_to(ob.p(0, 0, 3), LEFT, buff=0.12)

        with self.voiceover("Direction can be measured by angles. Vector r makes angles alpha, beta and gamma "
                            "with the x, y and z axes. Look at gamma. Dropping from P onto the z axis makes a "
                            "right triangle, with hypotenuse seven and adjacent side six.") as vo:
            self.play(FadeIn(h), Create(ax), FadeIn(labs), run_time=1.0)
            self.play(GrowArrow(r_ar), FadeIn(p_lab), FadeIn(r_lab), run_time=0.9)
            self.wait(max(0.1, vo.duration * 0.25))
            self.play(FadeIn(tri), Create(ra), FadeIn(gam), run_time=1.0)
            self.play(FadeIn(six), run_time=0.5)

        cg = M(r"\cos\gamma = \frac{6}{7} = \frac{z}{r}", 40).move_to(P(3.6, 2.5))
        lmn = M(r"l = \frac27,\quad m = \frac37,\quad n = \frac67", 40).move_to(P(3.6, 1.35))
        hatr = M(r"\hat r = l\,\hat i + m\,\hat j + n\,\hat k", 38).move_to(P(3.6, 0.3))
        one = M(r"l^2 + m^2 + n^2 = \frac{4 + 9 + 36}{49} = 1", 38, color=S_C).move_to(P(3.6, -0.75))
        b1 = SurroundingRectangle(one, color=S_C, buff=0.14, corner_radius=0.1)

        with self.voiceover("So cos gamma is six over seven, z over r. The same move on each axis gives the "
                            "direction cosines l, m and n: two sevenths, three sevenths, six sevenths. They "
                            "are just the components of the unit vector r hat, which is why their squares "
                            "always add up to one.") as vo:
            self.play(Write(cg), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(FadeIn(lmn, shift=0.2 * UP), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(FadeIn(hatr, shift=0.2 * UP), run_time=0.8)
            self.play(FadeIn(one, shift=0.2 * UP), Create(b1), run_time=0.9)

        ang = card(VGroup(
            M(r"\alpha + \beta + \gamma \approx 73.4^\circ + 64.6^\circ + 31.0^\circ = 169^\circ", 30),
            T("the angles do not add to 180 degrees", 22, color=WARN),
        ).arrange(DOWN, buff=0.12), color=WARN).move_to(P(3.3, -2.35))

        with self.voiceover("A trap: the three angles do not add to one hundred and eighty degrees. Here "
                            "they add to about one hundred and sixty nine. It is the squares of their "
                            "cosines that add to one.") as vo:
            self.play(FadeIn(ang, shift=0.2 * UP), run_time=0.8)

        self.play(FadeOut(VGroup(cg, lmn, hatr, one, b1, ang)), run_time=0.5)
        dr = M(r"2 : 3 : 6 \;=\; 4 : 6 : 12 \;=\; -2 : -3 : -6", 36).move_to(P(3.3, 2.4))
        dr_t = T("direction ratios: any multiple, all valid", 24, color=MUTED).next_to(dr, DOWN, buff=0.2)
        conv = M(r"l = \pm\frac{a}{\sqrt{a^2 + b^2 + c^2}}", 40).move_to(P(3.3, 0.5))
        conv2 = VGroup(
            M(r"4 : 6 : 12:\quad \sqrt{16 + 36 + 144} = 14", 34),
            M(r"l, m, n = \pm\frac{4}{14},\ \pm\frac{6}{14},\ \pm\frac{12}{14} = \pm\frac{2}{7},\ \pm\frac{3}{7},\ \pm\frac{6}{7}", 34),
        ).arrange(DOWN, buff=0.25).move_to(P(3.3, -1.5))
        if conv2.width > 6.2:
            conv2.scale_to_fit_width(6.2)

        with self.voiceover("Any numbers proportional to l, m and n are called direction ratios. Two, three, "
                            "six works, so does four, six, twelve, so does minus two, minus three, minus six. "
                            "They are not unique. To get back to cosines, divide by the root of the sum of "
                            "squares, with a plus or minus sign because the line has two directions.") as vo:
            self.play(FadeIn(dr, shift=0.2 * DOWN), run_time=0.8)
            self.play(FadeIn(dr_t), run_time=0.5)
            self.wait(max(0.1, vo.duration * 0.3))
            self.play(Write(conv), run_time=1.0)
            self.play(FadeIn(conv2, shift=0.2 * UP), run_time=0.8)

    # ------------------------------------------------------------ scene 6: mastery preview
    def s6(self):
        h = header("1.6 · Putting it together")
        rows = [
            (r"A(1,2,3),\ B(3,5,9)", "given"),
            (r"\overrightarrow{AB} = \vec b - \vec a = 2\hat i + 3\hat j + 6\hat k", "tip minus tail"),
            (r"|\overrightarrow{AB}| = \sqrt{4 + 9 + 36} = 7", "Pythagoras twice"),
            (r"\hat u = \tfrac17(2\hat i + 3\hat j + 6\hat k)", "divide by the length"),
            (r"l, m, n = \tfrac27, \tfrac37, \tfrac67", "components of the unit vector"),
        ]
        g = VGroup()
        for tex, note in rows:
            m = M(tex, 40)
            n = T(note, 22, color=MUTED)
            g.add(VGroup(m, n))
        for row in g:
            row[1].next_to(row[0], RIGHT, buff=0.5)
        maths = VGroup(*[r[0] for r in g]).arrange(DOWN, buff=0.4, aligned_edge=LEFT).move_to(P(-1.6, -0.2))
        for row in g:
            row[1].next_to(row[0], RIGHT, buff=0.5)
            row[1].set_x(4.6)

        with self.voiceover("Put the chapter together on one problem. A is one, two, three and B is three, "
                            "five, nine. Vector A B is b minus a: two i plus three j plus six k. Its length "
                            "is root forty nine, seven. Its unit vector is one seventh of it. And its "
                            "direction cosines are two sevenths, three sevenths and six sevenths.") as vo:
            self.play(FadeIn(h), FadeIn(g[0]), run_time=0.8)
            for row in g[1:]:
                self.wait(max(0.1, vo.duration * 0.12))
                self.play(FadeIn(row, shift=0.2 * UP), run_time=0.8)

    # ------------------------------------------------------------ scene 7: recap
    def s7(self):
        h = header("Recap")
        items = [
            ("Arrow", r"\overrightarrow{AB} = \vec b - \vec a", A_C),
            ("Components", r"x\hat i + y\hat j + z\hat k", I_C),
            ("Length", r"\sqrt{x^2 + y^2 + z^2}", S_C),
            ("Direction", r"\hat r,\ \ l^2 + m^2 + n^2 = 1", GREEN),
        ]
        cards = VGroup()
        for name, tex, col in items:
            inner = VGroup(T(name, 32, weight="BOLD", color=col), M(tex, 42)).arrange(DOWN, buff=0.2)
            c = card(inner, color=col, pad=0.3)
            cards.add(c)
        cards.arrange_in_grid(rows=2, cols=2, buff=(1.0, 0.7)).move_to(P(0, 0.1))
        nxt = T("Next: dividing lines and proving geometry", 26, color=MUTED).to_edge(DOWN, buff=0.45)

        with self.voiceover("That is the chapter. Fix an origin and every arrow becomes numbers. An arrow "
                            "between points is tip minus tail. Its length is Pythagoras in three "
                            "dimensions. And its direction lives in the unit vector, whose components are "
                            "the direction cosines. Next, we use position vectors to divide lines and prove "
                            "geometry.") as vo:
            self.play(FadeIn(h), run_time=0.5)
            for c in cards:
                self.play(FadeIn(c, shift=0.2 * UP), run_time=0.7)
                self.wait(max(0.1, vo.duration * 0.12))
            self.play(FadeIn(nxt), run_time=0.6)
