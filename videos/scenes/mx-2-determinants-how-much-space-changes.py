import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import math  # noqa: E402

import numpy as np  # noqa: E402

# Chapter colour roles (light background).
C1 = PRIMARY  # column 1 / i-hat image
C2 = ManimColor("#2B6CB0")  # column 2 / j-hat image
AREA = ACCENT
FLIP = PURPLE
HL = ManimColor("#D19A00")
GRID_D = ManimColor("#DCCBC2")


def T(s, size=28, **kw):
    return Text(s, font_size=size, **kw)


def M(*s, size=40, **kw):
    return MathTex(*s, font_size=size, **kw)


def header(s):
    h = T(s, 24, color=MUTED).to_corner(UL, buff=0.4)
    return h


def plane(xr, yr, unit, origin):
    pl = NumberPlane(
        x_range=[xr[0], xr[1], 1], y_range=[yr[0], yr[1], 1],
        x_length=unit * (xr[1] - xr[0]), y_length=unit * (yr[1] - yr[0]),
        background_line_style={"stroke_color": GRID_D, "stroke_width": 2, "stroke_opacity": 1},
        axis_config={"stroke_color": MUTED, "stroke_width": 3, "include_ticks": False},
        faded_line_ratio=1,
    )
    pl.faded_lines.set_opacity(0)
    pl.shift(np.array([origin[0], origin[1], 0.0]) - pl.c2p(0, 0))
    return pl


def mapper(origin, unit):
    o = np.array([origin[0], origin[1], 0.0])

    def P(x, y):
        return o + unit * np.array([x, y, 0.0])

    return P


def arrow(a, b, color, sw=6):
    return Arrow(a, b, buff=0, color=color, stroke_width=sw,
                 max_tip_length_to_length_ratio=0.25, max_stroke_width_to_length_ratio=12)


def poly(pts, color, op=0.4, sw=3):
    return Polygon(*pts, color=color, fill_color=color, fill_opacity=op, stroke_width=sw)


def bg(mob, op=0.9):
    mob.add_background_rectangle(color=BG, opacity=op, buff=0.06)
    return mob


def cross_out(mob, color=PRIMARY):
    return Line(mob.get_corner(DL), mob.get_corner(UR), color=color, stroke_width=5)


# Oblique projection for the 3D beat.
EX = np.array([1.0, 0.0, 0.0])
EY = np.array([0.5, 0.45, 0.0])
EZ = np.array([0.0, 1.0, 0.0])


def box_edges(O, s, e1, e2, e3, colors):
    def p(v):
        return O + s * (v[0] * EX + v[1] * EY + v[2] * EZ)

    e1, e2, e3 = map(np.array, (e1, e2, e3))
    z = np.zeros(3)
    segs = [
        (z, e1, colors[0]), (z, e2, colors[1]), (z, e3, colors[2]),
        (e1, e1 + e2, AREA), (e1, e1 + e3, AREA), (e2, e2 + e1, AREA), (e2, e2 + e3, AREA),
        (e3, e3 + e1, AREA), (e3, e3 + e2, AREA),
        (e1 + e2, e1 + e2 + e3, AREA), (e1 + e3, e1 + e2 + e3, AREA), (e2 + e3, e1 + e2 + e3, AREA),
    ]
    return VGroup(*[Line(p(a), p(b), color=c, stroke_width=6 if i < 3 else 3)
                    for i, (a, b, c) in enumerate(segs)])


class MatricesCh2Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Matrices",
            "Chapter 2 · Determinants",
            "Matrices, chapter two. Determinants: how much space changes.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7, self.s8, self.s9):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ 1: hook
    def s1(self):
        h = bg(header("2.1 · The Area Scale Factor")).set_z_index(8)
        O, u = (-3.3, -0.5), 0.55
        P = mapper(O, u)
        o = P(0, 0)
        pl = plane((-9, 9), (-7, 7), u, O)
        sq = poly([P(0, 0), P(1, 0), P(1, 1), P(0, 1)], AREA, 0.5)
        sq2 = poly([P(1, 1), P(2, 1), P(2, 2), P(1, 2)], C2, 0.25, 2)
        sq3 = poly([P(-1, -1), P(0, -1), P(0, 0), P(-1, 0)], C2, 0.25, 2)
        ih = arrow(o, P(1, 0), C1)
        jh = arrow(o, P(0, 1), C2)
        li = M(r"\hat{\imath}", size=34, color=C1).next_to(P(1, 0), DOWN, buff=0.12)
        lj = M(r"\hat{\jmath}", size=34, color=C2).next_to(P(0, 1), LEFT, buff=0.12)

        box = Rectangle(width=4.6, height=5.4, color=GRID_D, stroke_width=2)
        box.set_fill(BG, opacity=0.96).move_to([4.55, -0.35, 0]).set_z_index(5)
        mat = M(r"A = \begin{pmatrix}3&1\\1&2\end{pmatrix}", size=46).move_to([4.55, 1.3, 0]).set_z_index(6)

        with self.voiceover("A two by two matrix moves the whole plane. Grid lines stay straight, "
                            "parallel and evenly spaced, and the origin stays put.") as vo:
            self.play(FadeIn(h), Create(pl), FadeIn(box), run_time=1.4)
            self.play(Write(mat), FadeIn(sq), GrowArrow(ih), GrowArrow(jh), FadeIn(li), FadeIn(lj), run_time=1.2)
            self.play(FadeIn(sq2), FadeIn(sq3), run_time=0.6)
            self.play(FadeOut(li), FadeOut(lj), run_time=0.3)
            A = [[3, 1], [1, 2]]
            self.play(
                ApplyMatrix(A, VGroup(pl, sq, sq2, sq3), about_point=o),
                Transform(ih, arrow(o, P(3, 1), C1)),
                Transform(jh, arrow(o, P(1, 2), C2)),
                run_time=min(3.0, max(1.5, vo.duration - 3.6)),
            )

        la = bg(T("area 5", 20)).move_to(P(6, 4.5))
        lb = bg(T("area 5", 20)).move_to(P(-2, -1.5))
        with self.voiceover("So every little grid square becomes the same parallelogram. "
                            "Shapes change, but every area changes by one common factor.") as vo:
            self.play(Indicate(sq2, color=C2), Indicate(sq3, color=C2), run_time=1.2)
            self.play(FadeIn(la), FadeIn(lb), run_time=0.8)

        c1 = bg(M(r"\begin{pmatrix}3\\1\end{pmatrix}", size=30, color=C1)).next_to(P(3, 1), RIGHT, buff=0.1)
        c2 = bg(M(r"\begin{pmatrix}1\\2\end{pmatrix}", size=30, color=C2)).next_to(P(1, 2), UP, buff=0.1)
        lsq = bg(T("area 5", 20, weight="BOLD")).move_to(P(2, 1.5))
        t1 = T("area scale factor", 28).move_to([4.55, -0.2, 0]).set_z_index(6)
        t2 = M(r"\det A = 5", size=56, color=AREA).move_to([4.55, -1.2, 0]).set_z_index(6)
        t3 = T("one number for the whole plane", 20, color=MUTED).move_to([4.55, -2.2, 0]).set_z_index(6)
        with self.voiceover("Follow the unit square. Its sides, i hat and j hat, land on the two columns of the matrix. "
                            "Its new area is the scale factor. That number is the determinant.") as vo:
            self.play(FadeIn(c1), FadeIn(c2), run_time=1.0)
            self.play(FadeIn(lsq), Indicate(sq, color=AREA), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.55 - 2.2))
            self.play(FadeIn(t1), Write(t2), run_time=1.3)
            self.play(FadeIn(t3), run_time=0.6)

    # ------------------------------------------------------------ 2: derive ad - bc
    def s2(self):
        h = header("2.1 · Where a d − b c comes from")
        O, u = (-6.0, -2.4), 1.0
        P = mapper(O, u)
        o = P(0, 0)
        pl = plane((0, 5), (0, 4), u, O)
        par = poly([P(0, 0), P(3, 1), P(4, 3), P(1, 2)], AREA, 0.45)
        v1 = arrow(o, P(3, 1), C1)
        v2 = arrow(o, P(1, 2), C2)
        l1 = M(r"(a,c)", size=28, color=C1).next_to(P(3, 1), DR, buff=0.05)
        l2 = M(r"(b,d)", size=28, color=C2).next_to(P(1, 2), UL, buff=0.05)
        ex = M(r"\begin{pmatrix}a&b\\c&d\end{pmatrix} = \begin{pmatrix}3&1\\1&2\end{pmatrix}", size=34)
        ex.move_to([-3.8, 2.4, 0])
        boxr = DashedVMobject(Rectangle(width=4 * u, height=3 * u, color=INK, stroke_width=3), num_dashes=40)
        boxr.move_to((P(0, 0) + P(4, 3)) / 2)
        br1 = Brace(Line(P(0, 0), P(4, 0)), DOWN, color=MUTED)
        bl1 = M(r"a+b", size=30).next_to(br1, DOWN, buff=0.1)
        br2 = Brace(Line(P(4, 0), P(4, 3)), RIGHT, color=MUTED)
        bl2 = M(r"c+d", size=30).next_to(br2, RIGHT, buff=0.1)

        L1 = M(r"\text{box} = (a+b)(c+d)", size=38)
        L1b = M(r"= ac + ad + bc + bd", size=38)
        L2 = M(r"-\,ac", r"\;-\;bd", r"\;-\;2bc", size=38)
        L2[0].set_color(C1)
        L2[1].set_color(C2)
        L2[2].set_color(HL)
        L3 = M(r"\text{parallelogram} = ad - bc", size=42, color=AREA)
        L4 = M(r"3\cdot 2 - 1\cdot 1 = 5", size=40)
        col = VGroup(L1, L1b, L2, L3, L4).arrange(DOWN, aligned_edge=LEFT, buff=0.42).move_to([3.4, 0.2, 0])

        with self.voiceover("Why a d minus b c? Box the parallelogram. With columns a c and b d, "
                            "the box is a plus b wide, and c plus d tall.") as vo:
            self.play(FadeIn(h), Create(pl), FadeIn(ex), run_time=1.2)
            self.play(GrowArrow(v1), GrowArrow(v2), FadeIn(l1), FadeIn(l2), FadeIn(par), run_time=1.2)
            self.play(Create(boxr), run_time=1.0)
            self.play(GrowFromCenter(br1), FadeIn(bl1), GrowFromCenter(br2), FadeIn(bl2), run_time=1.0)
            self.play(Write(L1), run_time=1.0)
            self.play(Write(L1b), run_time=1.0)

        ta = VGroup(poly([P(0, 0), P(3, 0), P(3, 1)], C1, 0.3, 2), poly([P(1, 2), P(4, 3), P(1, 3)], C1, 0.3, 2))
        tb = VGroup(poly([P(3, 1), P(4, 1), P(4, 3)], C2, 0.3, 2), poly([P(0, 0), P(1, 2), P(0, 2)], C2, 0.3, 2))
        rc = VGroup(poly([P(3, 0), P(4, 0), P(4, 1), P(3, 1)], HL, 0.4, 2),
                    poly([P(0, 2), P(1, 2), P(1, 3), P(0, 3)], HL, 0.4, 2))
        with self.voiceover("Around the parallelogram sit two triangles making an a by c rectangle, "
                            "two triangles making a b by d rectangle, and two corner rectangles, each b times c.") as vo:
            self.play(FadeIn(ta), FadeIn(L2[0]), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.3 - 1.0))
            self.play(FadeIn(tb), FadeIn(L2[1]), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.25 - 1.0))
            self.play(FadeIn(rc), FadeIn(L2[2]), run_time=1.0)

        frame = SurroundingRectangle(L3, color=AREA, buff=0.15, corner_radius=0.1)
        with self.voiceover("Subtract them all, and almost everything cancels. What is left is a d minus b c. "
                            "For our matrix: three times two, minus one times one, is five.") as vo:
            self.play(FadeOut(ta), FadeOut(tb), FadeOut(rc), run_time=0.6)
            self.play(Write(L3), Indicate(par, color=AREA), run_time=1.4)
            self.play(Create(frame), run_time=0.6)
            self.wait(max(0.1, vo.duration * 0.5 - 2.6))
            self.play(Write(L4), run_time=1.2)

    # ------------------------------------------------------------ 3: sign = flip
    def s3(self):
        h = header("2.1 · The sign records a flip")
        O, u = (-3.8, -0.3), 1.0
        P = mapper(O, u)
        o = P(0, 0)
        pl = plane((-3, 3), (-3, 3), u, O)
        sq = poly([P(0, 0), P(1, 0), P(1, 1), P(0, 1)], AREA, 0.45)
        ih = arrow(o, P(1, 0), C1)
        jh = arrow(o, P(0, 1), C2)
        li = bg(M(r"\hat{\imath}", size=34, color=C1)).next_to(P(1, 0), DOWN, buff=0.1)
        lj = bg(M(r"\hat{\jmath}", size=34, color=C2)).next_to(P(0, 1), LEFT, buff=0.1)
        arc = Arc(radius=0.55, start_angle=0.25, angle=1.05, arc_center=o, color=HL, stroke_width=5)
        arc.add_tip(tip_length=0.18)
        diag = DashedLine(P(-3, -3), P(3, 3), color=MUTED, stroke_width=3)
        dl = bg(M(r"y = x", size=30, color=MUTED)).next_to(P(2.6, 2.6), RIGHT, buff=0.1)
        m = M(r"\begin{pmatrix}0&1\\1&0\end{pmatrix}", size=46).move_to([3.6, 2.0, 0])
        acw = T("anticlockwise", 24, color=HL).move_to([3.6, 0.8, 0])

        with self.voiceover("Area is never negative, but a determinant can be. Swap the columns: "
                            "the matrix zero one, one zero reflects the plane in the line y equals x.") as vo:
            self.play(FadeIn(h), Create(pl), run_time=1.0)
            self.play(FadeIn(sq), GrowArrow(ih), GrowArrow(jh), FadeIn(li), FadeIn(lj), run_time=1.0)
            self.play(Create(arc), FadeIn(acw), run_time=0.8)
            self.play(Write(m), Create(diag), FadeIn(dl), run_time=1.2)
            self.play(FadeOut(li), FadeOut(lj), run_time=0.3)
            self.play(
                ApplyMatrix([[0, 1], [1, 0]], VGroup(sq, arc), about_point=o),
                Transform(ih, arrow(o, P(0, 1), C1)),
                Transform(jh, arrow(o, P(1, 0), C2)),
                run_time=2.0,
            )

        cw = T("clockwise", 24, color=FLIP).move_to(acw)
        r1 = M(r"\det = 0\cdot 0 - 1\cdot 1 = -1", size=40).move_to([3.6, -0.3, 0])
        r2 = M(r"|\det A| = \text{area}", size=38).move_to([3.6, -1.4, 0])
        r3 = M(r"\text{sign} = \text{orientation}", size=38, color=FLIP).move_to([3.6, -2.3, 0])
        with self.voiceover("Before, turning from i hat to j hat went anticlockwise. Now it goes clockwise. "
                            "The area is still one, but the orientation has flipped, so the determinant is negative one. "
                            "The size is the area. The sign records the flip.") as vo:
            self.play(sq.animate.set_fill(FLIP, opacity=0.4).set_stroke(FLIP), arc.animate.set_color(FLIP),
                      ReplacementTransform(acw, cw), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.35 - 1.2))
            self.play(Write(r1), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.25 - 1.2))
            self.play(FadeIn(r2), run_time=0.8)
            self.play(FadeIn(r3), run_time=0.8)

    # ------------------------------------------------------------ 4: zero det
    def s4(self):
        h = header("2.2 · Zero determinant: squashing the plane")
        O, u = (-3.4, -0.9), 0.85
        P = mapper(O, u)
        o = P(0, 0)
        pl = plane((-3, 4), (-2, 3), u, O)
        t = ValueTracker(0.0)

        def v2():
            s = t.get_value()
            return (-1 + 2 * s, 2 - 1.5 * s)

        par = always_redraw(lambda: poly([o, P(2, 1), P(2 + v2()[0], 1 + v2()[1]), P(*v2())], AREA, 0.45))
        a1 = arrow(o, P(2, 1), C1)
        a2 = always_redraw(lambda: arrow(o, P(*v2()), C2))
        lab = M(r"\det A =", size=44).move_to([3.3, 2.0, 0])
        num = DecimalNumber(5, num_decimal_places=2, font_size=44, color=AREA)
        num.next_to(lab, RIGHT, buff=0.2)
        num.add_updater(lambda m: m.set_value(5 - 5 * t.get_value()).next_to(lab, RIGHT, buff=0.2))

        with self.voiceover("Now slide the second column toward the line of the first. "
                            "The parallelogram gets thinner, and the determinant falls.") as vo:
            self.play(FadeIn(h), Create(pl), run_time=1.0)
            self.add(par)
            self.play(GrowArrow(a1), FadeIn(a2), FadeIn(par), FadeIn(lab), FadeIn(num), run_time=1.0)
            self.play(t.animate.set_value(0.8), run_time=max(1.5, vo.duration - 2.3), rate_func=linear)

        line = DashedLine(P(-3, -1.5), P(4, 2), color=MUTED, stroke_width=3)
        lt = bg(T("the whole plane lands here", 20, color=MUTED)).move_to(P(-0.6, -1.35))
        fin = M(r"\det\begin{pmatrix}2&1\\1&0.5\end{pmatrix} = 0", size=40).move_to([3.3, 0.8, 0])
        with self.voiceover("When the columns are parallel, the area is zero. "
                            "The whole plane is squashed onto a single line.") as vo:
            self.play(t.animate.set_value(1.0), run_time=1.2)
            self.play(Create(line), FadeIn(lt), run_time=1.0)
            self.play(Write(fin), run_time=1.2)

        num.clear_updaters()
        pts = [(1, 0), (0, 2), (1.5, -1)]
        dots = VGroup(*[Dot(P(*q), color=HL, radius=0.08) for q in pts])
        img = Dot(P(2, 1), color=PRIMARY, radius=0.1)
        arrs = VGroup(*[Arrow(P(*q), P(2, 1), buff=0.12, color=HL, stroke_width=4,
                              max_tip_length_to_length_ratio=0.15) for q in pts])
        n1 = T("many inputs, one output", 24).move_to([3.3, -0.5, 0])
        n2 = T("no way back", 24, color=PRIMARY).move_to([3.3, -1.1, 0])
        n3 = M(r"\det A = 0 \iff \text{columns parallel}", size=36, color=AREA).move_to([3.3, -2.1, 0])
        n4 = T("(not the zero matrix)", 22, color=INK).move_to([3.3, -2.8, 0])
        with self.voiceover("And a collapse cannot be undone: many points land on the same spot, "
                            "so no matrix can send them back. A zero determinant does not mean the zero matrix. "
                            "It means the columns are parallel.") as vo:
            self.play(FadeIn(dots), run_time=0.6)
            self.play(*[GrowArrow(a) for a in arrs], FadeIn(img), run_time=1.2)
            self.play(FadeIn(n1), run_time=0.6)
            self.play(FadeIn(n2), run_time=0.6)
            self.wait(max(0.1, vo.duration * 0.55 - 3.0))
            self.play(Write(n3), run_time=1.2)
            self.play(FadeIn(n4), run_time=0.6)

    # ------------------------------------------------------------ 5: 3x3
    def s5(self):
        h = header("2.3 · 3×3 determinants: minors and cofactors")
        O, s = np.array([-1.8, -2.2, 0.0]), 1.6
        cube = box_edges(O, s, (1, 0, 0), (0, 1, 0), (0, 0, 1), (C1, C2, GREEN))
        para = box_edges(O, s, (1.4, 0, 0.3), (0.5, 1.2, 0), (0.4, 0.2, 1.3), (C1, C2, GREEN))
        vl = M(r"\text{volume scale factor} = \det A", size=40).move_to([0, 2.6, 0])
        with self.voiceover("In three dimensions, the determinant is the volume scale factor: "
                            "the unit cube becomes a slanted box.") as vo:
            self.play(FadeIn(h), Create(cube), run_time=1.2)
            self.play(Transform(cube, para), run_time=2.0)
            self.play(Write(vl), run_time=1.0)
        self.play(FadeOut(cube), FadeOut(vl), run_time=0.5)

        mat = Matrix([["2", "1", "3"], ["0", "4", "-1"], ["5", "2", "1"]], h_buff=0.95)
        mat.move_to([-4.5, 1.1, 0])
        ent = mat.get_entries()
        chk = M(r"\begin{pmatrix}+&-&+\\-&+&-\\+&-&+\end{pmatrix}", size=42).move_to([4.8, 1.2, 0])
        chl = T("signs", 22, color=MUTED).next_to(chk, DOWN, buff=0.2)
        minor = M(r"M_{11} = \begin{vmatrix}4&-1\\2&1\end{vmatrix} = 6", size=36).move_to([0.2, 1.2, 0])
        cof = M(r"C_{ij} = (-1)^{i+j} M_{ij}", size=34, color=PRIMARY).move_to([0.2, -0.1, 0])
        with self.voiceover("To compute it, expand along a row. Each entry multiplies its minor, "
                            "the two by two determinant left after deleting its row and column, "
                            "with a sign from a checkerboard: plus, minus, plus.") as vo:
            self.play(FadeIn(mat), run_time=0.8)
            self.play(*[ent[i].animate.set_opacity(0.2) for i in (1, 2, 3, 6)],
                      ent[0].animate.set_color(HL), run_time=1.0)
            self.play(Write(minor), run_time=1.4)
            self.wait(max(0.1, vo.duration * 0.55 - 3.2))
            self.play(FadeIn(chk), FadeIn(chl), run_time=0.8)
            self.play(Write(cof), run_time=1.0)
            self.play(*[ent[i].animate.set_opacity(1) for i in (1, 2, 3, 6)],
                      ent[0].animate.set_color(INK), run_time=0.6)

        e1 = M(r"\det A = +2(6) - 1(5) + 3(-20)", size=40).move_to([0, -1.4, 0])
        e2 = M(r"= 12 - 5 - 60 = ", r"-53", size=44).next_to(e1, DOWN, buff=0.35)
        e2[1].set_color(PRIMARY)
        with self.voiceover("For this matrix, along row one: two times six, minus one times five, "
                            "plus three times negative twenty. That is twelve, minus five, minus sixty: "
                            "negative fifty three.") as vo:
            self.play(Indicate(mat.get_rows()[0], color=HL), run_time=1.0)
            self.play(Write(e1), run_time=1.8)
            self.wait(max(0.1, vo.duration * 0.6 - 2.8))
            self.play(Write(e2), run_time=1.4)

        colbox = SurroundingRectangle(mat.get_columns()[0], color=GREEN, buff=0.12, corner_radius=0.08)
        zc = Circle(radius=0.28, color=GREEN, stroke_width=4).move_to(ent[3])
        nz = T("most zeros = least work", 22, color=GREEN).next_to(mat, DOWN, buff=0.3)
        sar = T("Sarrus' diagonals: 3×3 only", 22, color=MUTED).move_to([4.6, -3.3, 0])
        with self.voiceover("Any row or column gives the same answer, so choose the one with the most zeros. "
                            "And Sarrus' diagonal trick works only for three by three.") as vo:
            self.play(Create(colbox), Create(zc), FadeIn(nz), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.55 - 1.2))
            self.play(FadeIn(sar), run_time=0.8)

    # ------------------------------------------------------------ 6: properties
    def s6(self):
        h = header("2.4 · Properties from the picture")
        O, u = (-5.9, -2.3), 0.75
        P = mapper(O, u)
        o = P(0, 0)
        rx, ry = ValueTracker(1.0), ValueTracker(2.0)
        base = Line(P(-1.2, 0), P(6.4, 0), color=MUTED, stroke_width=2)
        par = always_redraw(lambda: poly(
            [o, P(3, 0), P(3 + rx.get_value(), ry.get_value()), P(rx.get_value(), ry.get_value())], AREA, 0.45))
        a1 = arrow(o, P(3, 0), C1)
        a2 = always_redraw(lambda: arrow(o, P(rx.get_value(), ry.get_value()), C2))
        l1 = M(r"R_1", size=30, color=C1).next_to(P(3, 0), DOWN, buff=0.12)
        l2 = always_redraw(lambda: M(r"R_2", size=30, color=C2).next_to(P(rx.get_value(), ry.get_value()), UL, buff=0.05))
        alab = M(r"\text{area} =", size=36).move_to([-4.6, 2.5, 0])
        num = DecimalNumber(6, num_decimal_places=1, font_size=36, color=AREA)
        num.add_updater(lambda m: m.set_value(3 * ry.get_value()).next_to(alab, RIGHT, buff=0.15))
        num.next_to(alab, RIGHT, buff=0.15)

        def row(txt, res, color):
            return VGroup(T(txt, 26), M(r"\Rightarrow", size=34, color=MUTED), T(res, 26, color=color)).arrange(RIGHT, buff=0.25)

        rows = [row("swap two rows", "sign flips", FLIP),
                row("scale one row by k", "det × k", C2),
                row("add a multiple of a row", "unchanged", GREEN)]
        VGroup(*rows).arrange(DOWN, aligned_edge=LEFT, buff=0.45).move_to([3.3, 1.8, 0])

        ccw = Arc(radius=0.6, start_angle=0.15, angle=0.85, arc_center=o, color=HL, stroke_width=5).add_tip(tip_length=0.16)
        cw = Arc(radius=0.6, start_angle=1.0, angle=-0.85, arc_center=o, color=FLIP, stroke_width=5).add_tip(tip_length=0.16)
        neg = M(r"\to -6", size=36, color=FLIP).next_to(num, RIGHT, buff=0.3)
        with self.voiceover("The properties all come from the picture. Swap two rows: the orientation flips, "
                            "so the determinant changes sign.") as vo:
            self.play(FadeIn(h), Create(base), FadeIn(par), GrowArrow(a1), FadeIn(a2), FadeIn(l1), FadeIn(l2),
                      FadeIn(alab), FadeIn(num), run_time=1.2)
            self.add(par, a2, l2)
            self.play(Create(ccw), run_time=0.6)
            self.play(ReplacementTransform(ccw, cw), FadeIn(neg), run_time=1.0)
            self.play(FadeIn(rows[0], shift=0.2 * LEFT), run_time=0.8)
        self.play(FadeOut(cw), FadeOut(neg), run_time=0.4)

        with self.voiceover("Multiply one row by k: one edge stretches by k, so the determinant is multiplied by k.") as vo:
            self.play(ry.animate.set_value(4.0), run_time=1.5)
            self.play(FadeIn(rows[1], shift=0.2 * LEFT), run_time=0.8)
            self.play(ry.animate.set_value(2.0), run_time=1.0)

        hl = always_redraw(lambda: DashedLine(P(rx.get_value(), ry.get_value()), P(rx.get_value(), 0),
                                              color=INK, stroke_width=3))
        with self.voiceover("Add a multiple of one row to another: that is a shear. The base and the height "
                            "stay the same, so the determinant does not change at all.") as vo:
            self.add(hl)
            self.play(FadeIn(hl), run_time=0.4)
            self.play(rx.animate.set_value(3.0), run_time=1.6)
            self.play(rx.animate.set_value(-0.5), run_time=1.8)
            self.play(rx.animate.set_value(1.0), run_time=1.0)
            self.play(FadeIn(rows[2], shift=0.2 * LEFT), run_time=0.8)

        num.clear_updaters()
        k1 = M(r"\det(kA) = k^n \det A", size=38).move_to([3.3, -0.4, 0])
        k1x = M(r"k\det A", size=32, color=MUTED).next_to(k1, RIGHT, buff=0.4)
        k1c = cross_out(k1x)
        k2 = M(r"\det(A+B) \ne \det A + \det B", size=38, color=PRIMARY).move_to([3.3, -1.4, 0])
        k3 = M(r"\det(AB) = \det A\cdot\det B", size=40, color=GREEN).move_to([3.3, -2.6, 0])
        f3 = SurroundingRectangle(k3, color=GREEN, buff=0.15, corner_radius=0.1)
        with self.voiceover("Two traps. Multiplying the whole n by n matrix by k scales every row, "
                            "so det of k A is k to the n times det A. And det of A plus B is not det A plus det B. "
                            "But products work: do B, then A, and the scale factors multiply.") as vo:
            self.play(Write(k1), run_time=1.2)
            self.play(FadeIn(k1x), Create(k1c), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.4 - 2.0))
            self.play(Write(k2), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.25 - 1.2))
            self.play(Write(k3), Create(f3), run_time=1.2)

    # ------------------------------------------------------------ 7: smart evaluation
    def s7(self):
        h = header("2.5 · Evaluating determinants smartly")
        E0 = M(r"\begin{vmatrix}1&a&a^2\\1&b&b^2\\1&c&c^2\end{vmatrix}", size=44).move_to([-5.0, 1.5, 0])
        E1 = M(r"=\begin{vmatrix}1&a&a^2\\0&b-a&b^2-a^2\\0&c-a&c^2-a^2\end{vmatrix}", size=40)
        E1.next_to(E0, RIGHT, buff=0.2)
        op = VGroup(M(r"R_2\to R_2-R_1", size=30, color=C2), M(r"R_3\to R_3-R_1", size=30, color=C2))
        op.arrange(DOWN, aligned_edge=LEFT, buff=0.2).next_to(E1, RIGHT, buff=0.35)
        E2 = M(r"=(b-a)(c-a)\begin{vmatrix}1&a&a^2\\0&1&b+a\\0&1&c+a\end{vmatrix}", size=40)
        E2.next_to(E1, DOWN, buff=0.5).align_to(E1, LEFT)
        warn = VGroup(T("a factor taken out", 22, color=PRIMARY), T("multiplies outside", 22, color=PRIMARY))
        warn.arrange(DOWN, aligned_edge=LEFT, buff=0.1).next_to(E2, RIGHT, buff=0.4)
        E3 = M(r"=(b-a)(c-a)(c-b)", size=42)
        E3.next_to(E2, DOWN, buff=0.55).align_to(E2, LEFT)
        E4 = M(r"=(a-b)(b-c)(c-a)", size=44, color=GREEN).next_to(E3, RIGHT, buff=0.25)
        f4 = SurroundingRectangle(E4, color=GREEN, buff=0.15, corner_radius=0.1)

        with self.voiceover("Don't expand blindly. Make zeros first. Take the determinant with rows "
                            "one, a, a squared; one, b, b squared; and one, c, c squared.") as vo:
            self.play(FadeIn(h), Write(E0), run_time=1.6)
        with self.voiceover("Subtract row one from rows two and three. Those are shears, so nothing changes, "
                            "and column one becomes one, zero, zero.") as vo:
            self.play(FadeIn(op), run_time=0.8)
            self.play(Write(E1), run_time=2.0)
        with self.voiceover("Now b minus a comes out of row two, and c minus a out of row three, "
                            "because b squared minus a squared is b minus a times b plus a. "
                            "Taking a factor out multiplies it outside. It does not divide.") as vo:
            self.play(Write(E2), run_time=2.2)
            self.wait(max(0.1, vo.duration * 0.6 - 2.2))
            self.play(FadeIn(warn), run_time=0.8)
        with self.voiceover("Expand down column one, and what's left is c minus b. "
                            "Tidied up, the answer is a minus b, times b minus c, times c minus a.") as vo:
            self.play(Write(E3), run_time=1.4)
            self.wait(max(0.1, vo.duration * 0.45 - 1.4))
            self.play(Write(E4), run_time=1.2)
            self.play(Create(f4), run_time=0.6)

    # ------------------------------------------------------------ 8: triangle area
    def s8(self):
        h = header("2.6 · Area of a triangle and collinearity")
        O, u = (-5.2, -0.4), 0.6
        P = mapper(O, u)
        pl = plane((-1, 9), (-4, 4), u, O)
        tri = poly([P(1, 0), P(6, 0), P(4, 3)], AREA, 0.5)
        labs = VGroup(
            bg(M(r"(1,0)", size=24)).next_to(P(1, 0), DOWN, buff=0.1),
            bg(M(r"(6,0)", size=24)).next_to(P(6, 0), DOWN, buff=0.1),
            bg(M(r"(4,3)", size=24)).next_to(P(4, 3), UP, buff=0.1),
        )
        with self.voiceover("A triangle is half a parallelogram. Take the triangle with corners one zero, "
                            "six zero, and four three. Slide it so one corner sits at the origin. "
                            "Sliding doesn't change area.") as vo:
            self.play(FadeIn(h), Create(pl), run_time=1.0)
            self.play(FadeIn(tri), FadeIn(labs), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.55 - 2.0))
            self.play(FadeOut(labs), run_time=0.4)
            self.play(tri.animate.shift(-u * RIGHT), run_time=1.2)

        par = DashedVMobject(Polygon(P(0, 0), P(5, 0), P(8, 3), P(3, 3), color=INK, stroke_width=3), num_dashes=50)
        n15 = bg(T("7.5", 22)).move_to(P(16 / 3, 2))
        n7 = bg(T("7.5", 22, weight="BOLD")).move_to(P(8 / 3, 1))
        r1 = M(r"\left|\begin{vmatrix}5&0\\3&3\end{vmatrix}\right| = 15", size=36).move_to([3.8, 2.4, 0])
        r2 = M(r"\text{triangle} = \tfrac{1}{2}(15) = 7.5", size=36, color=AREA).move_to([3.8, 1.3, 0])
        gen = M(r"\text{Area} = \tfrac{1}{2}\left|\begin{vmatrix}x_1&y_1&1\\x_2&y_2&1\\x_3&y_3&1\end{vmatrix}\right|",
                size=38).move_to([3.8, -0.1, 0])
        with self.voiceover("The two edges span a parallelogram of area fifteen, so the triangle has area seven point five. "
                            "In general, the area is one half the modulus of the determinant with rows x, y, one.") as vo:
            self.play(Create(par), run_time=1.0)
            self.play(Write(r1), run_time=1.2)
            self.play(FadeIn(n7), FadeIn(n15), Write(r2), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.5 - 3.4))
            self.play(Write(gen), run_time=1.6)

        y = ValueTracker(3.0)
        tri2 = always_redraw(lambda: poly([P(0, 0), P(5, 0), P(3, y.get_value())], AREA, 0.5))
        col = M(r"\det = 0 \iff \text{collinear}", size=36, color=PRIMARY).move_to([3.8, -1.6, 0])
        with self.voiceover("If that determinant is zero, the triangle has no area: the three points are collinear.") as vo:
            self.play(FadeOut(par), FadeOut(n7), FadeOut(n15), run_time=0.5)
            self.remove(tri)
            self.add(tri2)
            self.play(y.animate.set_value(0.0), run_time=1.8)
            self.play(Write(col), run_time=1.2)

        up = poly([P(0, 0), P(4, 0), P(0, 3)], GREEN, 0.35)
        dn = poly([P(0, 0), P(4, 0), P(0, -3)], FLIP, 0.35)
        ku = bg(M(r"k=3", size=26, color=GREEN)).next_to(P(0, 3), LEFT, buff=0.1)
        kd = bg(M(r"k=-3", size=26, color=FLIP)).next_to(P(0, -3), LEFT, buff=0.1)
        kk = M(r"\tfrac{1}{2}|4k| = 6 \;\Rightarrow\; k = \pm 3", size=36).move_to([3.8, -2.8, 0])
        with self.voiceover("One trap. If the area is given, keep the modulus. For the triangle with corners at the origin, "
                            "four zero, and zero k, area six gives k equals three, or negative three.") as vo:
            self.play(FadeOut(tri2), run_time=0.4)
            self.play(FadeIn(up), FadeIn(ku), run_time=1.0)
            self.play(FadeIn(dn), FadeIn(kd), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.5 - 2.4))
            self.play(Write(kk), run_time=1.4)

    # ------------------------------------------------------------ 9: recap
    def s9(self):
        h = T("Chapter 2 in five lines", 34, weight="BOLD").to_edge(UP, buff=0.5)
        items = [
            ("signed area scale factor", r"\det\begin{pmatrix}a&b\\c&d\end{pmatrix} = ad-bc"),
            ("zero: space is squashed, no undo", r"\det A = 0"),
            ("expand along the line with most zeros", r"C_{ij} = (-1)^{i+j}M_{ij}"),
            ("swap flips, scale scales, shear keeps", r"\det(AB) = \det A\,\det B"),
            ("triangle area", r"\tfrac{1}{2}\left|\det\right|"),
        ]
        rows = VGroup()
        for i, (txt, tex) in enumerate(items, 1):
            n = T(f"{i}.", 28, color=PRIMARY, weight="BOLD")
            t = T(txt, 26)
            m = M(tex, size=34, color=INK)
            rows.add(VGroup(n, t, m))
        for r in rows:
            r[0].move_to([-6.2, 0, 0])
            r[1].next_to(r[0], RIGHT, buff=0.3)
            r[2].move_to([3.9, 0, 0])
        rows.arrange(DOWN, buff=0.45, aligned_edge=LEFT).move_to([0, -0.2, 0])
        for r in rows:
            r[0].set_x(-6.2)
            r[1].next_to(r[0], RIGHT, buff=0.3)
            r[2].set_x(3.9)
        nxt = T("Next: Chapter 3 · The Inverse", 26, color=MUTED).to_edge(DOWN, buff=0.4)
        with self.voiceover("Five lines to keep. The determinant is the signed area or volume scale factor, "
                            "a d minus b c for two by two. Zero means the space is squashed, and it can't be undone. "
                            "Expand three by three with cofactors, along the line with the most zeros. "
                            "A swap flips the sign, scaling a row scales it, a shear changes nothing, "
                            "and determinants multiply. And a triangle's area is one half the modulus of a determinant. "
                            "Next chapter: undoing a transformation. The inverse.") as vo:
            self.play(FadeIn(h), run_time=0.8)
            step = max(1.0, (vo.duration - 4.0) / 5)
            for r in rows:
                self.play(FadeIn(r, shift=0.2 * UP), run_time=0.8)
                self.wait(max(0.1, step - 0.8))
            self.play(FadeIn(nxt), run_time=0.8)
