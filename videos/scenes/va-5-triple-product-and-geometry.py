import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import math  # noqa: E402

import numpy as np  # noqa: E402

# Chapter colour roles.
A_C = PRIMARY  # vector a
B_C = SECONDARY  # vector b
C_C = PURPLE  # vector c
N_C = GREEN  # normal b x c
HL = ACCENT  # heights / highlights
WARN = PRIMARY
KEEP = GREEN

# Oblique projection for 3D boxes: x right, y receding up-right, z up.
PX = np.array([1.0, 0.0, 0.0])
PY = np.array([0.55, 0.38, 0.0])
PZ = np.array([0.0, 1.0, 0.0])

B3 = np.array([4.0, 0.0, 0.0])
C3 = np.array([1.0, 3.0, 0.0])


def T(s, size=30, **kw):
    return Text(s, font_size=size, **kw)


def M(s, size=40, **kw):
    return MathTex(s, font_size=size, **kw)


def TP(x, y, z):
    return rf"[\vec {x}\;\vec {y}\;\vec {z}]"


def bg(mob, opacity=0.85):
    mob.add_background_rectangle(color=BG, opacity=opacity, buff=0.05)
    return mob


def card(mob, pad=0.25, color=MUTED, opacity=0.9):
    box = SurroundingRectangle(mob, buff=pad, corner_radius=0.15, color=color, stroke_width=2)
    box.set_fill(WHITE, opacity=opacity)
    return VGroup(box, mob)


def cross_mark(mob, color=WARN):
    return VGroup(
        Line(mob.get_corner(UL), mob.get_corner(DR), color=color, stroke_width=5),
        Line(mob.get_corner(DL), mob.get_corner(UR), color=color, stroke_width=5),
    )


def arrow(p, q, color, sw=5, tip=0.22):
    length = np.linalg.norm(np.array(q) - np.array(p))
    ratio = min(0.35, tip / max(length, 1e-3))
    return Arrow(p, q, buff=0, color=color, stroke_width=sw, max_tip_length_to_length_ratio=ratio,
                 max_stroke_width_to_length_ratio=20)


class Box3D:
    """Oblique-projected parallelepiped with edges a, b, c from ORIGIN."""

    def __init__(self, origin, unit):
        self.o = np.array(origin, dtype=float)
        self.u = unit

    def p(self, v):
        v = np.asarray(v, dtype=float)
        return self.o + self.u * (v[0] * PX + v[1] * PY + v[2] * PZ)

    def faces(self, a, b=B3, c=C3):
        o = np.zeros(3)
        quads = [
            ([o, b, b + c, c], B_C, 0.28),  # base
            ([o, b, a + b, a], INK, 0.06),
            ([c, b + c, a + b + c, a + c], INK, 0.06),
            ([o, c, a + c, a], INK, 0.06),
            ([b, b + c, a + b + c, a + b], INK, 0.06),
            ([a, a + b, a + b + c, a + c], A_C, 0.14),  # top
        ]
        g = VGroup()
        for pts, col, op in quads:
            g.add(Polygon(*[self.p(q) for q in pts], stroke_color=MUTED, stroke_width=1.5,
                          fill_color=col, fill_opacity=op))
        return g

    def edges(self, a, b=B3, c=C3, labels=True):
        o = self.p([0, 0, 0])
        g = VGroup(arrow(o, self.p(b), B_C), arrow(o, self.p(c), C_C), arrow(o, self.p(a), A_C))
        if labels:
            g.add(bg(M(r"\vec b", 36, color=B_C)).next_to(self.p(b), DOWN, buff=0.15))
            g.add(bg(M(r"\vec c", 36, color=C_C)).next_to(self.p(c), DOWN + RIGHT * 0.3, buff=0.1))
            g.add(bg(M(r"\vec a", 36, color=A_C)).next_to(self.p(a), LEFT, buff=0.12))
        return g


def a_of(t):
    return 5.0 * np.array([0.0, math.cos(t), math.sin(t)])


class VaCh5Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Vector Algebra",
            "Chapter 5 · The Scalar Triple Product and Vector Geometry",
            "Chapter five. The scalar triple product, and vector geometry.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ helpers
    def live_box(self, bx, tilt, labels=True):
        box = always_redraw(lambda: bx.faces(a_of(tilt.get_value())))
        edges = always_redraw(lambda: bx.edges(a_of(tilt.get_value()), labels=labels))
        return box, edges

    def readout(self, tilt, pos):
        lab_t = M(r"\text{tilt} =", 34)
        num_t = DecimalNumber(0, num_decimal_places=0, unit=r"^\circ", font_size=34, color=INK)
        lab_v = M(r"V = 60\sin(\text{tilt}) =", 34)
        num_v = DecimalNumber(0, num_decimal_places=1, font_size=34, color=HL)
        row1 = VGroup(lab_t, num_t).arrange(RIGHT, buff=0.15)
        row2 = VGroup(lab_v, num_v).arrange(RIGHT, buff=0.15)
        g = VGroup(row1, row2).arrange(DOWN, aligned_edge=LEFT, buff=0.3).move_to(pos)
        n_t_anchor = num_t.get_left()
        n_v_anchor = num_v.get_left()

        def upd_t(m):
            m.set_value(round(math.degrees(tilt.get_value())))
            m.move_to(n_t_anchor, aligned_edge=LEFT)

        def upd_v(m):
            m.set_value(60 * math.sin(tilt.get_value()))
            m.move_to(n_v_anchor, aligned_edge=LEFT)

        num_t.add_updater(upd_t)
        num_v.add_updater(upd_v)
        upd_t(num_t)
        upd_v(num_v)
        return g

    # ------------------------------------------------------------ scene 1: hook
    def s1(self):
        n = 12
        h = 0.24
        cards = VGroup(*[
            RoundedRectangle(width=3.2, height=h * 0.85, corner_radius=0.05, stroke_color=INK, stroke_width=1.5)
            .set_fill(PRIMARY if i % 2 else ManimColor("#F3C6C9"), opacity=0.85)
            for i in range(n)
        ]).arrange(UP, buff=h * 0.15).move_to([0, -0.2, 0])
        with self.voiceover("Take a deck of cards and push it sideways. The stack leans, but not a single card "
                            "was added or removed, so the volume has not changed. Volume is base area times "
                            "perpendicular height, however much the box leans.") as vo:
            self.play(LaggedStart(*[FadeIn(c, shift=0.1 * UP) for c in cards], lag_ratio=0.08), run_time=1.5)
            self.play(*[c.animate.shift(0.14 * i * RIGHT) for i, c in enumerate(cards)], run_time=2.0)
            bot, top = cards[0], cards[-1]
            hx = top.get_left()[0] + 0.3
            hl = DashedLine([hx, top.get_top()[1], 0], [hx, bot.get_bottom()[1], 0], color=HL, stroke_width=4)
            hlab = bg(M("h", 40, color=HL)).next_to(hl, RIGHT, buff=0.12)
            br = Brace(bot, DOWN, color=MUTED)
            blab = T("base", 28, color=MUTED).next_to(br, DOWN, buff=0.1)
            self.play(Create(hl), FadeIn(hlab), FadeIn(br), FadeIn(blab), run_time=1.0)
            cap = M(r"V = \text{base area} \times h", 46).to_edge(UP, buff=0.8)
            self.wait(max(0.1, vo.duration * 0.55 - 4.5))
            self.play(Write(cap), run_time=1.0)

        self.clear_scene()
        bx = Box3D([-2.6, -2.2, 0], 0.62)
        a0 = a_of(math.radians(53.13))
        box = bx.faces(a0)
        edges = bx.edges(a0)
        word = T("parallelepiped", 44, weight="BOLD", color=PRIMARY).to_edge(UP, buff=0.6)
        with self.voiceover("That leaning box is called a parallelepiped. Its three edges from one corner are "
                            "three vectors, A, B and C. Can we find its volume using only the dot and cross "
                            "products?") as vo:
            self.play(FadeIn(box), FadeIn(word), run_time=1.2)
            self.play(LaggedStart(*[GrowArrow(e) for e in edges[:3]], lag_ratio=0.4), run_time=1.6)
            self.play(FadeIn(edges[3:]), run_time=0.6)
            q = M(r"V = \;?", 56).move_to([4.6, 0.6, 0])
            self.play(Write(q), run_time=0.8)

    # ------------------------------------------------------------ scene 2: volume
    def s2(self):
        bx = Box3D([-6.4, -2.4, 0], 0.68)
        tilt = ValueTracker(math.radians(53.13))
        box, edges = self.live_box(bx, tilt)
        self.add(box, edges)
        ctr = np.array([3.4, 0.9, 0.0])  # a point on the base, clear of the tip of c
        normal = arrow(bx.p(ctr), bx.p(ctr + np.array([0, 0, 3.2])), N_C, sw=6)
        nlab = bg(M(r"\vec b\times\vec c", 34, color=N_C)).next_to(normal.get_end(), RIGHT, buff=0.1)
        base = bx.faces(a_of(0.5))[0].copy().set_fill(B_C, 0.6)

        rx = 3.4
        with self.voiceover("Let B and C span the base. From chapter four, B cross C has length equal to the "
                            "base area, and it points straight out of the base, along the normal.") as vo:
            self.play(FadeIn(base, rate_func=there_and_back), run_time=1.4)
            self.remove(base)
            self.play(GrowArrow(normal), FadeIn(nlab), run_time=1.2)
            f1 = M(r"|\vec b\times\vec c| = \text{base area} = 12", 38).move_to([rx, 2.6, 0])
            self.play(Write(f1), run_time=1.2)

        def height():
            a = a_of(tilt.get_value())
            foot = np.array([a[0], a[1], 0.0])
            return DashedLine(bx.p(a), bx.p(foot), color=HL, stroke_width=4)

        hline = always_redraw(height)
        hlab = always_redraw(lambda: bg(M("h", 36, color=HL)).next_to(hline, LEFT, buff=0.08))
        with self.voiceover("Now dot vector A with that normal. A dot product picks out the part of A along "
                            "the normal direction, and that is exactly the height. So A dot, the quantity B "
                            "cross C, is base area times height.") as vo:
            self.play(Create(hline), FadeIn(hlab), run_time=1.0)
            f2 = M(r"\vec a\cdot(\vec b\times\vec c) = \underbrace{|\vec b\times\vec c|}_{\text{base area}}"
                   r"\;\underbrace{|\vec a|\cos\phi}_{\text{height}}", 38).move_to([rx, 1.0, 0])
            self.wait(max(0.1, vo.duration * 0.45 - 1.0))
            self.play(Write(f2), run_time=1.8)

        ro = self.readout(tilt, [rx, -1.4, 0])
        with self.voiceover("Watch it change as A tilts. Standing straight up, the volume is sixty. At thirty "
                            "degrees it is thirty. Lay A flat in the base, and the volume drops to zero. Tilt "
                            "below the base, and it turns negative. The triple product is a signed volume.") as vo:
            self.play(FadeIn(ro), run_time=0.6)
            seg = vo.duration / 6
            self.play(tilt.animate.set_value(PI / 2), run_time=seg)
            self.play(tilt.animate.set_value(math.radians(30)), run_time=seg)
            self.play(tilt.animate.set_value(0), run_time=seg)
            self.play(tilt.animate.set_value(math.radians(-30)), run_time=seg)
            sv = T("signed volume", 32, color=HL, weight="BOLD").next_to(ro, DOWN, buff=0.35)
            self.play(FadeIn(sv), run_time=0.6)
            self.play(tilt.animate.set_value(math.radians(53.13)), run_time=seg * 0.8)

        right = VGroup(ro, sv)
        with self.voiceover("We write it as A, B, C in square brackets, the scalar triple product. The brackets "
                            "on the cross can be dropped, because A dot B, then crossed with C, means nothing: "
                            "you cannot cross a number. And a tetrahedron on the same three edges is one sixth "
                            "of the box.") as vo:
            ro[0][1].clear_updaters()
            ro[1][1].clear_updaters()
            self.play(FadeOut(right), FadeOut(f1), FadeOut(f2), run_time=0.6)
            d = card(M(TP("a", "b", "c") + r" = \vec a\cdot(\vec b\times\vec c)", 44), color=PRIMARY)
            d.move_to([rx, 2.4, 0])
            self.play(FadeIn(d, shift=0.2 * UP), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.25 - 0.8))
            bad = M(r"(\vec a\cdot\vec b)\times\vec c", 42).move_to([rx - 0.9, 0.6, 0])
            x = cross_mark(bad)
            why = T("a number cannot be crossed", 26, color=WARN).next_to(bad, DOWN, buff=0.2)
            self.play(FadeIn(bad), run_time=0.5)
            self.play(Create(x), FadeIn(why), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.3 - 1.3))
            tet = M(r"V_{\text{tetra}} = \tfrac16\,\big|" + TP("a", "b", "c") + r"\big|", 44).move_to([rx, -1.6, 0])
            self.play(Write(tet), run_time=1.2)

    # ------------------------------------------------------------ scene 3: determinant
    def s3(self):
        head = T("5.2 · The determinant form", 34, color=PRIMARY, weight="BOLD").to_corner(UL, buff=0.5)
        e1 = M(r"\vec b\times\vec c = \begin{vmatrix} \hat i & \hat j & \hat k \\ b_1 & b_2 & b_3 \\ "
               r"c_1 & c_2 & c_3 \end{vmatrix}", 52)
        e2 = M(r"\vec a\cdot(\vec b\times\vec c) = \begin{vmatrix} a_1 & a_2 & a_3 \\ b_1 & b_2 & b_3 \\ "
               r"c_1 & c_2 & c_3 \end{vmatrix}", 52)
        e1.move_to([0, 1.0, 0])
        e2.move_to([0, 1.0, 0])

        def top_row_box(eq):
            h = eq.height
            # the matrix is the right part of the equation: last ~ 2.6 units
            mat_w = 2.3
            r = Rectangle(width=mat_w, height=h / 3.1, color=HL, stroke_width=4)
            r.move_to([eq.get_right()[0] - mat_w / 2 - 0.15, eq.get_top()[1] - h / 6 - 0.02, 0])
            return r

        with self.voiceover("A cross and then a dot is two steps. But the cross product is a determinant with "
                            "I, J, K in the top row, and dotting with A simply swaps I, J, K for the components "
                            "of A.") as vo:
            self.play(FadeIn(head), Write(e1), run_time=1.5)
            r1 = top_row_box(e1)
            self.play(Create(r1), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.55 - 2.3))
            r2 = top_row_box(e2)
            self.play(ReplacementTransform(e1, e2), ReplacementTransform(r1, r2), run_time=1.6)

        with self.voiceover("So the triple product is the three by three determinant with rows A, B, C, in "
                            "that order. For A equals one, two, three, B equals zero, one, four, and C equals "
                            "five, six, zero, it comes out to exactly one.") as vo:
            self.play(FadeOut(r2), VGroup(e2).animate.scale(0.75).move_to([-3.2, 2.0, 0]), run_time=0.8)
            note = T("rows in order: a, b, c", 30, color=MUTED).next_to(e2, DOWN, buff=0.25)
            self.play(FadeIn(note), run_time=0.6)
            n1 = M(r"\begin{vmatrix} 1 & 2 & 3 \\ 0 & 1 & 4 \\ 5 & 6 & 0 \end{vmatrix}", 46)
            n2 = M(r"= 1(0-24) - 2(0-20) + 3(0-5)", 42)
            n3 = M(r"= -24 + 40 - 15 = 1", 42)
            row = VGroup(n1, n2).arrange(RIGHT, buff=0.25).move_to([0, -1.0, 0])
            n3.next_to(n2, DOWN, aligned_edge=LEFT, buff=0.35)
            self.wait(max(0.1, vo.duration * 0.3 - 1.4))
            self.play(FadeIn(n1), run_time=0.7)
            self.play(Write(n2), run_time=1.3)
            self.play(Write(n3), run_time=1.0)
            self.play(Circumscribe(n3[0][-1], color=HL), run_time=0.8)

        self.clear_scene()
        head2 = T("Symmetries", 34, color=PRIMARY, weight="BOLD").to_corner(UL, buff=0.5)
        cc = np.array([-4.3, 0.2, 0])
        R = 1.3
        ring = Circle(radius=R, color=GRID, stroke_width=3).move_to(cc)
        angs = [PI / 2, PI / 2 - 2 * PI / 3, PI / 2 - 4 * PI / 3]
        names = ["a", "b", "c"]
        cols = [A_C, B_C, C_C]
        letters = VGroup(*[
            bg(M(rf"\vec {n}", 48, color=col), 1.0).move_to(cc + R * np.array([math.cos(t), math.sin(t), 0]))
            for n, col, t in zip(names, cols, angs)
        ])
        arcs = VGroup(*[
            Arc(radius=R, start_angle=angs[i] - 0.35, angle=-(2 * PI / 3 - 0.7), arc_center=cc,
                color=KEEP, stroke_width=4).add_tip(tip_length=0.2)
            for i in range(3)
        ])
        keep = M(TP("a", "b", "c") + "=" + TP("b", "c", "a") + "=" + TP("c", "a", "b"), 40, color=KEEP)
        keep_l = T("cyclic: keep", 28, color=KEEP, weight="BOLD")
        flip = M(TP("b", "a", "c") + "=" + TP("a", "c", "b") + "=" + TP("c", "b", "a") + "= -" + TP("a", "b", "c"),
                 40, color=WARN)
        flip_l = T("swap: flip the sign", 28, color=WARN, weight="BOLD")
        keep.move_to([2.4, 1.6, 0])
        keep_l.next_to(keep, DOWN, buff=0.2)
        flip.move_to([2.4, -0.6, 0])
        flip_l.next_to(flip, DOWN, buff=0.2)
        same = T("same box, opposite handedness", 26, color=MUTED).next_to(flip_l, DOWN, buff=0.3)
        with self.voiceover("Every symmetry is now a determinant fact. Shift the rows round in a cycle, A B C, "
                            "to B C A, to C A B, and the value stays. Swap any two, and the sign flips. The box "
                            "is the same. Only its handedness changes.") as vo:
            self.play(FadeIn(head2), Create(ring), FadeIn(letters), run_time=1.0)
            self.play(LaggedStart(*[Create(a) for a in arcs], lag_ratio=0.3), run_time=1.5)
            self.play(Write(keep), FadeIn(keep_l), run_time=1.4)
            self.wait(max(0.1, vo.duration * 0.5 - 3.9))
            sw = [letters[0].get_center(), letters[1].get_center()]
            self.play(letters[0].animate.move_to(sw[1]), letters[1].animate.move_to(sw[0]),
                      arcs.animate.set_color(WARN), run_time=1.0)
            self.play(Write(flip), FadeIn(flip_l), run_time=1.4)
            self.play(FadeIn(same), run_time=0.6)

        self.clear_scene()
        r1 = M(r"\vec a\cdot(\vec b\times\vec c) = (\vec a\times\vec b)\cdot\vec c", 46)
        r2 = M(r"[\hat i\;\hat j\;\hat k] = \hat i\cdot(\hat j\times\hat k) = \hat i\cdot\hat i = 1", 46)
        r2l = T("right-handed", 28, color=KEEP, weight="BOLD")
        r3 = M(TP("a", "a", "b") + r" = 0", 46)
        r3l = T("repeated vector: flat box", 28, color=HL, weight="BOLD")
        g2 = VGroup(r2, r2l).arrange(RIGHT, buff=0.5)
        g3 = VGroup(r3, r3l).arrange(RIGHT, buff=0.5)
        VGroup(r1, g2, g3).arrange(DOWN, buff=0.8).move_to([0, 0, 0])
        with self.voiceover("That is why dot and cross can trade places: A dot B cross C equals A cross B dot C. "
                            "The triple I, J, K gives plus one, a right handed triple. And a repeated vector "
                            "gives zero, a flat box.") as vo:
            self.play(Write(r1), run_time=1.4)
            self.wait(max(0.1, vo.duration * 0.4 - 1.4))
            self.play(Write(r2), run_time=1.2)
            self.play(FadeIn(r2l), run_time=0.5)
            self.wait(max(0.1, vo.duration * 0.2 - 1.7))
            self.play(Write(r3), FadeIn(r3l), run_time=1.0)

    # ------------------------------------------------------------ scene 4: coplanarity
    def s4(self):
        head = T("5.3 · Coplanarity", 34, color=PRIMARY, weight="BOLD").to_corner(UL, buff=0.5)
        bx = Box3D([-6.4, -2.3, 0], 0.68)
        tilt = ValueTracker(math.radians(45))
        box, edges = self.live_box(bx, tilt)
        ro = self.readout(tilt, [3.4, 1.2, 0])
        with self.voiceover("Tilt vector A down into the base and the box goes flat. Now turn that around. Zero "
                            "volume means a flat box, and a flat box means all three vectors lie in one "
                            "plane.") as vo:
            self.play(FadeIn(head), FadeIn(box), FadeIn(edges), FadeIn(ro), run_time=1.0)
            self.play(tilt.animate.set_value(0), run_time=min(3.0, vo.duration * 0.35))
            flat = T("flat box:  V = 0", 36, color=HL, weight="BOLD").move_to([3.4, -0.6, 0])
            self.play(FadeIn(flat, scale=1.2), run_time=0.7)
            self.play(Indicate(ro[1][1], color=HL), run_time=0.8)
            one = T("zero volume  ⇔  one plane", 32).next_to(flat, DOWN, buff=0.45)
            self.play(FadeIn(one), run_time=0.8)

        ro[0][1].clear_updaters()
        ro[1][1].clear_updaters()
        self.clear_scene()
        d1 = M(r"\vec a,\ \vec b,\ \vec c \text{ coplanar} \iff " + TP("a", "b", "c") + " = 0", 44)
        d2 = M(r"A, B, C, D \text{ coplanar} \iff [\overrightarrow{AB}\;\overrightarrow{AC}\;"
               r"\overrightarrow{AD}] = 0", 44)
        defs = card(VGroup(d1, d2).arrange(DOWN, buff=0.4, aligned_edge=LEFT), color=PRIMARY).move_to([0, 0.3, 0])
        with self.voiceover("So three vectors are coplanar exactly when their triple product is zero. For four "
                            "points A, B, C, D, test the three edges from A.") as vo:
            self.play(FadeIn(defs[0]), Write(d1), run_time=1.5)
            self.wait(max(0.1, vo.duration * 0.5 - 1.5))
            self.play(Write(d2), run_time=1.5)

        self.play(defs.animate.scale(0.7).to_edge(UP, buff=0.4), run_time=0.8)
        e1 = M(r"\begin{vmatrix} 2 & -1 & 1 \\ 1 & 2 & -3 \\ 3 & \lambda & 5 \end{vmatrix} = 0", 46)
        e2 = M(r"2(10 + 3\lambda) + 14 + (\lambda - 6) = 0", 42)
        e3 = M(r"28 + 7\lambda = 0 \;\Rightarrow\; \lambda = -4", 46)
        e1.move_to([-3.6, -1.0, 0])
        e2.move_to([2.8, -0.2, 0])
        e3.move_to([2.8, -1.6, 0])
        with self.voiceover("Example. Which lambda makes two, negative one, one, and one, two, negative three, "
                            "and three, lambda, five, coplanar? Set the determinant to zero. It simplifies to "
                            "twenty eight plus seven lambda, so lambda is negative four.") as vo:
            self.play(FadeIn(e1), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.5 - 1.0))
            self.play(Write(e2), run_time=1.4)
            self.play(Write(e3), run_time=1.2)
            self.play(Create(SurroundingRectangle(e3, color=HL, buff=0.15)), run_time=0.6)

        self.clear_scene()
        # a tilted plane with three non-parallel arrows lying in it
        o = np.array([-4.2, -0.8, 0])
        u = np.array([2.2, -0.35, 0])
        v = np.array([0.9, 1.0, 0])
        plane = Polygon(o - 1.2 * u - 1.4 * v, o + 1.2 * u - 1.4 * v, o + 1.2 * u + 1.6 * v, o - 1.2 * u + 1.6 * v,
                        stroke_color=MUTED, stroke_width=2, fill_color=B_C, fill_opacity=0.15)
        vs = [(0.9 * u + 0.2 * v, A_C), (0.1 * u + 1.3 * v, B_C), (-0.9 * u + 0.9 * v, C_C)]
        arrs = VGroup(*[arrow(o, o + w, col) for w, col in vs])
        pl = T("one plane, no two parallel", 28, color=MUTED).next_to(plane, DOWN, buff=0.3)
        m1 = M(r"\begin{vmatrix} 1 & 2 & 3 \\ 2 & 3 & 4 \\ 3 & 4 & 5 \end{vmatrix} = -1 + 4 - 3 = 0", 44)
        m2 = M(r"(3,4,5) = 2(2,3,4) - (1,2,3)", 42)
        trap = T("Trap: coplanar does not mean parallel", 34, color=WARN, weight="BOLD").to_edge(UP, buff=0.6)
        VGroup(m1, m2).arrange(DOWN, buff=0.6).move_to([3.0, -0.5, 0])
        with self.voiceover("A trap. Coplanar does not mean parallel. One, two, three, and two, three, four, and "
                            "three, four, five, have triple product zero, yet no two of them are parallel. The "
                            "third is twice the second, minus the first.") as vo:
            self.play(FadeIn(trap), run_time=0.7)
            self.play(FadeIn(plane), run_time=0.6)
            self.play(LaggedStart(*[GrowArrow(a) for a in arrs], lag_ratio=0.3), FadeIn(pl), run_time=1.4)
            self.wait(max(0.1, vo.duration * 0.25 - 2.7))
            self.play(Write(m1), run_time=1.6)
            self.wait(max(0.1, vo.duration * 0.25 - 1.6))
            self.play(Write(m2), run_time=1.2)

    # ------------------------------------------------------------ scene 5: choosing
    def s5(self):
        head = T("5.4 · Choosing the right product", 34, color=PRIMARY, weight="BOLD").to_corner(UL, buff=0.5)
        rows = [
            ("Magnitude", INK, "length, distance between points"),
            ("Dot", B_C, "angle, perpendicular test, projection, work"),
            ("Cross", N_C, "area, normal, parallel test, torque"),
            ("Triple", C_C, "volume, coplanarity"),
        ]
        grid = VGroup()
        for i, (name, col, what) in enumerate(rows):
            y = 1.7 - 1.1 * i
            tag = RoundedRectangle(width=2.6, height=0.75, corner_radius=0.15, color=col, stroke_width=3)
            tag.set_fill(WHITE, 0.9).move_to([-4.2, y, 0])
            nm = T(name, 30, color=col, weight="BOLD").move_to(tag)
            wt = T(what, 28).next_to(tag, RIGHT, buff=0.5)
            grid.add(VGroup(tag, nm, wt))
        with self.voiceover("You now own four tools. Length needs the magnitude. Angles, perpendicular tests, "
                            "projections and work need the dot product. Areas, normals, parallel tests and torque "
                            "need the cross product. Volume and coplanarity need the triple product.") as vo:
            self.play(FadeIn(head), run_time=0.5)
            for i, g in enumerate(grid):
                self.play(FadeIn(g, shift=0.2 * RIGHT), run_time=0.7)
                self.wait(max(0.05, vo.duration * [0.12, 0.25, 0.25, 0.1][i] - 0.7))

        self.clear_scene()
        s = 1.1
        A = np.array([-5.8, -1.6, 0])
        dirv = np.array([1.0, 0.0, 0])
        P = A + s * np.array([1.6, 2.6, 0])
        foot = np.array([P[0], A[1], 0])
        line = Line(A - 0.6 * dirv, A + 7.5 * dirv, color=MUTED, stroke_width=3)
        dhat = arrow(A, A + s * dirv, B_C, sw=6, tip=0.2)
        dl = M(r"\hat d", 36, color=B_C).next_to(dhat, DOWN, buff=0.15)
        ap = arrow(A, P, A_C, sw=5)
        apl = M(r"\overrightarrow{AP}", 34, color=A_C).next_to(ap.get_center(), LEFT, buff=0.2)
        dA = Dot(A, color=INK)
        dP = Dot(P, color=INK)
        lA = M("A", 34).next_to(A, DOWN + LEFT, buff=0.1)
        lP = M("P", 34).next_to(P, UP, buff=0.1)
        para = Polygon(A, A + s * dirv, P + s * dirv, P, stroke_color=N_C, stroke_width=2,
                       fill_color=N_C, fill_opacity=0.25)
        perp = DashedLine(P, foot, color=HL, stroke_width=5)
        pl = T("distance", 26, color=HL).next_to(perp, RIGHT, buff=0.15).shift(0.8 * RIGHT)
        f1 = M(r"\text{dist} = |\overrightarrow{AP}\times\hat d| = \frac{|\overrightarrow{AP}\times\vec d|}{|\vec d|}",
               42).move_to([2.9, 1.9, 0])
        with self.voiceover("Real problems chain them. The distance from a point P to a line is the height of a "
                            "parallelogram built on A P and a unit vector along the line. Its base is one, so its "
                            "area is its height: the length of A P, cross D hat.") as vo:
            self.play(Create(line), FadeIn(dA), FadeIn(lA), FadeIn(dP), FadeIn(lP), run_time=1.0)
            self.play(GrowArrow(ap), FadeIn(apl), GrowArrow(dhat), FadeIn(dl), run_time=1.2)
            self.wait(max(0.1, vo.duration * 0.3 - 2.2))
            self.play(FadeIn(para), run_time=1.0)
            self.play(Create(perp), FadeIn(pl), run_time=1.0)
            bl = T("base = 1", 24, color=B_C).next_to(dl, RIGHT, buff=0.3)
            self.play(FadeIn(bl), run_time=0.5)
            self.wait(max(0.1, vo.duration * 0.2 - 1.5))
            self.play(Write(f1), run_time=1.5)

        f2 = M(r"d = \frac{\big|[\,\vec b_2-\vec b_1\;\;\vec d_1\;\;\vec d_2\,]\big|}{|\vec d_1\times\vec d_2|}",
               46).move_to([2.9, -0.8, 0])
        vol = T("volume", 26, color=C_C, weight="BOLD").next_to(f2, UP, buff=0.12).shift(0.45 * RIGHT)
        area = T("area", 26, color=N_C, weight="BOLD").next_to(f2, DOWN, buff=0.12).shift(0.45 * RIGHT)
        hh = T("volume ÷ area = height", 30, color=HL, weight="BOLD").next_to(area, DOWN, buff=0.35)
        sk = T("skew lines", 28, color=MUTED).next_to(f2, LEFT, buff=0.3)
        with self.voiceover("The same idea gives the shortest distance between skew lines: a triple product, "
                            "which is a volume, divided by a cross product, which is an area. Volume over area "
                            "is height.") as vo:
            self.play(Write(f2), FadeIn(sk), run_time=1.5)
            self.wait(max(0.1, vo.duration * 0.35 - 1.5))
            self.play(FadeIn(vol), run_time=0.6)
            self.play(FadeIn(area), run_time=0.6)
            self.wait(max(0.1, vo.duration * 0.2 - 0.6))
            self.play(FadeIn(hh, shift=0.2 * UP), run_time=0.8)

    # ------------------------------------------------------------ scene 6: workshop
    def s6(self):
        head = T("5.5 · Vector geometry workshop", 34, color=PRIMARY, weight="BOLD").to_corner(UL, buff=0.5)
        C = np.array([-6.0, -2.2, 0])
        s = 0.9
        Av = C + s * np.array([4.5, 3.2, 0])
        Bv = C + s * np.array([5.2, 0.0, 0])
        ta = arrow(C, Av, A_C)
        tb = arrow(C, Bv, B_C)
        tab = arrow(Bv, Av, HL)
        la = M(r"\vec a", 36, color=A_C).next_to(ta.get_center(), UL, buff=0.1)
        lb = M(r"\vec b", 36, color=B_C).next_to(tb.get_center(), DOWN, buff=0.15)
        lab = M(r"\vec a-\vec b", 34, color=HL).next_to(tab.get_center(), RIGHT, buff=0.15)
        lC = M("C", 34).next_to(C, LEFT, buff=0.12)
        ang = Arc(radius=0.55, start_angle=0, angle=math.atan2(3.2, 4.5), arc_center=C, color=INK, stroke_width=3)
        c1 = M(r"|\vec a-\vec b|^2 = (\vec a-\vec b)\cdot(\vec a-\vec b)", 40)
        c2 = M(r"= |\vec a|^2 - 2\,\vec a\cdot\vec b + |\vec b|^2", 40)
        c3 = M(r"c^2 = a^2 + b^2 - 2ab\cos C", 46)
        VGroup(c1, c2, c3).arrange(DOWN, buff=0.45, aligned_edge=LEFT).move_to([2.7, 0.2, 0])
        with self.voiceover("Vectors turn classic proofs into a few lines. In a triangle with sides A and B "
                            "from one corner, the third side is A minus B. Expand its length squared, and the "
                            "middle term, minus two A dot B, becomes minus two A B cosine C. That is the cosine "
                            "rule.") as vo:
            self.play(FadeIn(head), GrowArrow(ta), GrowArrow(tb), FadeIn(la), FadeIn(lb), FadeIn(lC),
                      Create(ang), run_time=1.2)
            self.play(GrowArrow(tab), FadeIn(lab), run_time=0.8)
            self.play(Write(c1), run_time=1.3)
            self.wait(max(0.1, vo.duration * 0.35 - 3.3))
            self.play(Write(c2), run_time=1.3)
            self.play(Indicate(c2[0][6:12], color=HL), run_time=0.8)
            self.play(Write(c3), run_time=1.2)
            self.play(Create(SurroundingRectangle(c3, color=HL, buff=0.15)), run_time=0.5)

        self.clear_scene()
        O = np.array([-6.0, -2.0, 0])
        s = 0.62
        av = np.array([3.0, 4.0, 0])
        bv = np.array([5.0, 0.0, 0])
        pa, pb, pab = O + s * av, O + s * bv, O + s * (av + bv)
        rh = Polygon(O, pb, pab, pa, stroke_color=MUTED, stroke_width=2, fill_color=B_C, fill_opacity=0.1)
        sa = arrow(O, pa, A_C)
        sb = arrow(O, pb, B_C)
        la2 = M(r"\vec a", 36, color=A_C).next_to(sa.get_center(), LEFT, buff=0.15)
        lb2 = M(r"\vec b", 36, color=B_C).next_to(sb.get_center(), DOWN, buff=0.15)
        d1 = arrow(O, pab, N_C, sw=4)
        d2 = arrow(pb, pa, C_C, sw=4)
        ld1 = M(r"\vec a+\vec b", 32, color=N_C).next_to(pab, RIGHT, buff=0.12)
        ld2 = M(r"\vec a-\vec b", 32, color=C_C).next_to(pa, UP, buff=0.12)
        mid = O + s * (av + bv) / 2
        u1 = (av + bv) / np.linalg.norm(av + bv)
        u2 = (av - bv) / np.linalg.norm(av - bv)
        k = 0.25
        ra = VMobject(color=INK, stroke_width=3).set_points_as_corners([mid + k * u1, mid + k * u1 + k * u2, mid + k * u2])
        r1 = M(r"(\vec a+\vec b)\cdot(\vec a-\vec b) = |\vec a|^2 - |\vec b|^2", 42)
        r2 = M(r"= 0 \quad\text{when } |\vec a| = |\vec b|", 42)
        r3 = T("rhombus: diagonals are perpendicular", 30, color=KEEP, weight="BOLD")
        VGroup(r1, r2, r3).arrange(DOWN, buff=0.45, aligned_edge=LEFT).move_to([3.0, 0.3, 0])
        with self.voiceover("In a parallelogram, the diagonals are A plus B and A minus B. Their dot product is "
                            "the length of A squared, minus the length of B squared. In a rhombus the sides are "
                            "equal, so it is zero, and the diagonals are perpendicular.") as vo:
            self.play(FadeIn(head), FadeIn(rh), GrowArrow(sa), GrowArrow(sb), FadeIn(la2), FadeIn(lb2),
                      run_time=1.0)
            self.play(GrowArrow(d1), GrowArrow(d2), FadeIn(ld1), FadeIn(ld2), run_time=1.0)
            self.play(Write(r1), run_time=1.5)
            self.wait(max(0.1, vo.duration * 0.45 - 3.5))
            self.play(Write(r2), run_time=1.0)
            self.play(Create(ra), FadeIn(r3), run_time=0.8)

        self.clear_scene()
        O = np.array([-5.8, -2.5, 0])
        S = 2.2  # unit vectors drawn large; a, b and a + b shown only as direction rays
        ah = np.array([0.6, 0.8, 0])
        bh = np.array([1.0, 0.0, 0])
        fa = Line(O, O + 5.0 * ah, color=A_C, stroke_width=3).set_opacity(0.45)
        fb = Line(O, O + 4.6 * bh, color=B_C, stroke_width=3).set_opacity(0.45)
        la = M(r"\text{along } \vec a = (3,4)", 28, color=A_C).next_to(fa.get_end(), UP, buff=0.1)
        lb = M(r"\text{along } \vec b = (2,0)", 28, color=B_C).next_to(fb.get_end(), DOWN, buff=0.15)
        ua = arrow(O, O + S * ah, A_C, sw=7)
        ub = arrow(O, O + S * bh, B_C, sw=7)
        lua = bg(M(r"\hat a", 36, color=A_C)).next_to(O + S * ah, LEFT, buff=0.12)
        lub = bg(M(r"\hat b", 36, color=B_C)).next_to(O + S * bh, DOWN, buff=0.15)
        rh2 = Polygon(O, O + S * bh, O + S * (ah + bh), O + S * ah, stroke_color=MUTED, stroke_width=2,
                      fill_color=HL, fill_opacity=0.15)
        sm = arrow(O, O + S * (ah + bh), HL, sw=7)
        ray = DashedLine(O, O + 4.8 * np.array([2, 1, 0]) / math.sqrt(5), color=HL, stroke_width=2)
        lsm = bg(M(r"\hat a+\hat b", 34, color=HL)).next_to(O + S * (ah + bh), DR, buff=0.1)
        a1 = Arc(radius=0.9, start_angle=0, angle=math.atan2(4, 3), arc_center=O, color=A_C, stroke_width=3)
        a2 = Arc(radius=1.35, start_angle=0, angle=math.atan2(1, 2), arc_center=O, color=HL, stroke_width=3)
        l1 = bg(T("53.1°", 24, color=A_C)).move_to(O + np.array([-0.3, 0.95, 0]))
        l2 = bg(T("26.6°", 24, color=HL)).move_to(O + np.array([1.8, 0.33, 0]))
        plain = DashedLine(O, O + 4.4 * np.array([5, 4, 0]) / math.sqrt(41), color=MUTED, stroke_width=3)
        lpl = M(r"\vec a+\vec b", 30, color=MUTED).next_to(plain.get_end(), UP, buff=0.1)
        xm = cross_mark(Square(0.3)).next_to(lpl, RIGHT, buff=0.15)
        q1 = M(r"|\hat a| = |\hat b| = 1 \;\Rightarrow\; \text{rhombus}", 40)
        q2 = M(r"\hat a+\hat b = (1.6,\,0.8) \parallel (2,1)", 40)
        q3 = M(r"\vec a+\vec b = (5,4):\ 38.7^\circ \ne 26.6^\circ", 38, color=MUTED)
        VGroup(q1, q2, q3).arrange(DOWN, buff=0.45, aligned_edge=LEFT).move_to([3.5, 0.4, 0])
        with self.voiceover("Last, A hat plus B hat always bisects the angle between A and B, because the hats "
                            "make both lengths one, so their parallelogram is a rhombus. For A equals three, four, "
                            "and B equals two, zero, A hat plus B hat points along two, one, at exactly half the "
                            "angle. The plain sum, A plus B, misses.") as vo:
            self.play(FadeIn(head), FadeIn(fa), FadeIn(fb), FadeIn(la), FadeIn(lb), run_time=0.8)
            self.play(GrowArrow(ua), GrowArrow(ub), FadeIn(lua), FadeIn(lub), run_time=1.0)
            self.play(FadeIn(rh2), GrowArrow(sm), FadeIn(lsm), Create(ray), run_time=1.2)
            self.play(Write(q1), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.4 - 4.0))
            self.play(Write(q2), run_time=1.4)
            self.play(Create(a1), FadeIn(l1), Create(a2), FadeIn(l2), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.25 - 2.4))
            self.play(Create(plain), FadeIn(lpl), FadeIn(q3), run_time=0.8)
            self.play(Create(xm), run_time=0.5)

    # ------------------------------------------------------------ scene 7: recap
    def s7(self):
        boxes = VGroup(*[RoundedRectangle(width=6.3, height=2.6, corner_radius=0.2, color=MUTED, stroke_width=2)
                         .set_fill(WHITE, 0.7) for _ in range(4)])
        boxes.arrange_in_grid(2, 2, buff=0.3).move_to([0, -0.1, 0])
        contents = [
            VGroup(M(TP("a", "b", "c") + r" = \vec a\cdot(\vec b\times\vec c)", 40),
                   T("base area × height, a signed volume", 26, color=MUTED)),
            VGroup(T("cyclic shift: keep", 32, color=KEEP, weight="BOLD"),
                   T("single swap: flip the sign", 32, color=WARN, weight="BOLD")),
            VGroup(M(TP("a", "b", "c") + r" = 0 \iff \text{coplanar}", 40),
                   T("coplanar is not parallel", 26, color=MUTED)),
            VGroup(T("length · dot · cross · triple", 32, weight="BOLD"),
                   T("choose by what the question asks", 26, color=MUTED)),
        ]
        cards = []
        for b, c in zip(boxes, contents):
            c.arrange(DOWN, buff=0.35).move_to(b)
            cards.append(VGroup(b, c))
        with self.voiceover("To recap. The triple product is base area times height, a signed volume. As a "
                            "determinant, cyclic shifts keep it and swaps flip its sign.") as vo:
            self.play(FadeIn(cards[0], shift=0.2 * UP), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.4 - 0.8))
            self.play(FadeIn(cards[1], shift=0.2 * UP), run_time=0.8)
        with self.voiceover("Zero volume means coplanar, and coplanar does not mean parallel. Choose your product "
                            "by what the question asks.") as vo:
            self.play(FadeIn(cards[2], shift=0.2 * UP), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.4 - 0.8))
            self.play(FadeIn(cards[3], shift=0.2 * UP), run_time=0.8)
        with self.voiceover("Now try the chapter five mastery quiz. It mixes the whole course, from adding vectors "
                            "to triple products, so it is the best check that the toolkit is yours.") as vo:
            self.play(*[FadeOut(c) for c in cards], run_time=0.7)
            nxt = T("Next: Chapter 5 Mastery", 44, color=PRIMARY, weight="BOLD")
            sub = T("a full-course diagnostic", 30, color=MUTED).next_to(nxt, DOWN, buff=0.3)
            self.play(FadeIn(nxt, shift=0.2 * UP), FadeIn(sub), run_time=1.0)
