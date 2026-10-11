import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

# Chapter colour roles (light background).
RAY = PRIMARY  # light rays
GLASS = SECONDARY  # lens / prism outline
GLASS_FILL = ManimColor("#CFE6EA")
FOC = ACCENT  # foci
OBJ = GREEN  # objects
IMG = PURPLE  # images
HL = ManimColor("#D19A00")  # highlight gold
WARN = PRIMARY
WATER = ManimColor("#DCEBF5")
SILVER = ManimColor("#8C8C8C")

# `say` can read a lone capital "A" as the article; spell it as a letter.
LA = "[[char LTRL]]A[[char NORM]]"


def T(s, size=30, **kw):
    return Text(s, font_size=size, **kw)


def M(s, size=40, **kw):
    return MathTex(s, font_size=size, **kw)


def fit(mob, w):
    if mob.width > w:
        mob.scale_to_fit_width(w)
    return mob


def P(x, y):
    return np.array([x, y, 0.0])


def U(deg):
    a = deg * DEGREES
    return np.array([np.cos(a), np.sin(a), 0.0])


def vec(start, end, color, sw=6):
    return Arrow(start, end, buff=0, color=color, stroke_width=sw,
                 max_tip_length_to_length_ratio=0.25, max_stroke_width_to_length_ratio=12)


def check():
    return MathTex(r"\checkmark", color=GREEN, font_size=56)


def cross_mark():
    return MathTex(r"\times", color=WARN, font_size=64)


def card(mob, pad=0.25, color=MUTED):
    box = SurroundingRectangle(mob, buff=pad, corner_radius=0.15, color=color, stroke_width=2)
    box.set_fill(WHITE, opacity=0.85)
    return VGroup(box, mob)


def tip_at(a, b, color, size=0.09):
    d = b - a
    ang = np.arctan2(d[1], d[0])
    t = Triangle(color=color, fill_color=color, fill_opacity=1, stroke_width=0).scale(size)
    t.rotate(ang - PI / 2).move_to((a + b) / 2)
    return t


def ray(pts, color=RAY, sw=3, arrows=True):
    """Polyline light ray with small arrowheads showing the direction of travel."""
    g = VGroup()
    for a, b in zip(pts[:-1], pts[1:]):
        g.add(Line(a, b, color=color, stroke_width=sw))
    if arrows:
        for a, b in zip(pts[:-1], pts[1:]):
            if np.linalg.norm(b - a) > 0.6:
                g.add(tip_at(a, b, color))
    return g


def dline(a, b, color=MUTED, sw=2.5):
    return DashedLine(a, b, color=color, stroke_width=sw, dash_length=0.1)


def lens(x, y0=0.0, h=1.4, w=0.28, kind="convex", fill=GLASS_FILL, fill_op=0.7, color=GLASS):
    ys = np.linspace(h, -h, 25)
    if kind == "convex":
        right = [P(x + 0.02 + w * (1 - (y / h) ** 2), y0 + y) for y in ys]
        left = [P(x - 0.02 - w * (1 - (y / h) ** 2), y0 + y) for y in ys[::-1]]
    elif kind == "concave":
        right = [P(x + 0.05 + w * (y / h) ** 2, y0 + y) for y in ys]
        left = [P(x - 0.05 - w * (y / h) ** 2, y0 + y) for y in ys[::-1]]
    else:  # plano-convex: curved face on the left, flat face on the right
        right = [P(x, y0 + y) for y in ys]
        left = [P(x - 0.02 - w * (1 - (y / h) ** 2), y0 + y) for y in ys[::-1]]
    poly = Polygon(*right, *left, color=color, stroke_width=3)
    poly.set_fill(fill, opacity=fill_op)
    return poly


def obj_arrow(x, y0, h, color=OBJ, sw=6):
    return Arrow(P(x, y0), P(x, y0 + h), buff=0, color=color, stroke_width=sw,
                 max_tip_length_to_length_ratio=0.22, max_stroke_width_to_length_ratio=12)


def virt_arrow(x, y0, h, color=IMG):
    tip = P(x, y0 + h)
    sgn = 1 if h > 0 else -1
    line = DashedLine(P(x, y0), tip - sgn * 0.18 * UP, color=color, stroke_width=5, dash_length=0.12)
    head = Triangle(color=color, fill_color=color, fill_opacity=1, stroke_width=0).scale(0.13)
    if sgn < 0:
        head.rotate(PI)
    head.move_to(tip - sgn * 0.1 * UP)
    return VGroup(line, head)


def fdot(pt, lab=None, size=28, direction=DOWN):
    d = Dot(pt, radius=0.07, color=FOC)
    if lab is None:
        return d
    return VGroup(d, M(lab, size, color=FOC).next_to(d, direction, buff=0.12))


def axis(x0, x1, y0):
    return Line(P(x0, y0), P(x1, y0), color=MUTED, stroke_width=2)


def angle_arc(center, a0, a1, r=0.5, color=INK, sw=2.5):
    return Arc(radius=r, start_angle=a0 * DEGREES, angle=(a1 - a0) * DEGREES, arc_center=center,
               color=color, stroke_width=sw)


def intersect(p, d, q, e):
    """Point where p + k d meets q + t e."""
    A = np.array([[d[0], -e[0]], [d[1], -e[1]]])
    k, _ = np.linalg.solve(A, np.array([q[0] - p[0], q[1] - p[1]]))
    return p + k * d


# ------------------------------------------------------------------ prism geometry
APEX = P(-3.6, 2.0)
SIDE = 3.4
B1 = APEX + SIDE * U(240)
B2 = APEX + SIDE * U(300)


def prism(fill_op=0.6):
    tri = Polygon(APEX, B1, B2, color=GLASS, stroke_width=3)
    tri.set_fill(GLASS_FILL, opacity=fill_op)
    return tri


def prism_path(i_deg, n=1.5, frac=0.5, l_in=2.2, l_out=2.4):
    """Ray through the 60 degree prism. Returns dict of points/angles or None if trapped (TIR)."""
    p1 = APEX + frac * SIDE * U(240)
    r1 = np.degrees(np.arcsin(np.sin(np.radians(i_deg)) / n))
    d_in = U(-30 + i_deg)
    d_mid = U(-30 + r1)
    p2 = intersect(p1, d_mid, APEX, U(300))
    r2 = 60 - r1
    s = n * np.sin(np.radians(r2))
    if s >= 1:
        return None
    e = np.degrees(np.arcsin(s))
    d_out = U(30 - e)
    return dict(start=p1 - l_in * d_in, p1=p1, p2=p2, end=p2 + l_out * d_out, i=i_deg, r1=r1, r2=r2, e=e,
                d_in=d_in, d_out=d_out, delta=i_deg + e - 60)


def deviation(i_deg, n=1.5):
    r1 = np.degrees(np.arcsin(np.sin(np.radians(i_deg)) / n))
    s = min(1.0, n * np.sin(np.radians(60 - r1)))
    return i_deg + np.degrees(np.arcsin(s)) - 60


class OmpCh1Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Optics and Modern Physics",
            "Chapter 1 · Lenses, Prisms and Optical Instruments",
            "Chapter one. Lenses, prisms and optical instruments.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7, self.s8):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ scene 1: two surfaces make a lens
    def s1(self):
        y0 = -0.3
        lx = -4.0
        fx = -1.6
        ax = axis(-6.8, -0.2, y0)
        L = lens(lx, y0, h=1.5, w=0.3)
        heights = [1.1, 0.55, 0.0, -0.55, -1.1]
        rays = VGroup()
        for h in heights:
            a = P(-6.6, y0 + h)
            b = P(lx, y0 + h)
            f = P(fx, y0)
            end = f + 0.45 * (f - b) / np.linalg.norm(f - b) * 1.0
            rays.add(ray([a, b, f, end]))
        F = VGroup(Dot(P(fx, y0), radius=0.07, color=FOC), M("F", 28, color=FOC).move_to(P(fx + 0.35, y0 - 0.75)))
        br = BraceBetweenPoints(P(lx, y0 - 1.75), P(fx, y0 - 1.75), direction=DOWN, color=INK)
        brl = M("f", 36).next_to(br, DOWN, buff=0.1)

        with self.voiceover("Hold a magnifying glass above paper in sunlight. At one height, the bright patch shrinks to a "
                            "dazzling dot. That height is the focal length.") as vo:
            self.play(Create(ax), FadeIn(L), run_time=0.8)
            self.play(LaggedStart(*[Create(r) for r in rays], lag_ratio=0.15), run_time=2.2)
            self.play(FadeIn(F), Flash(P(fx, y0), color=HL, line_length=0.3, num_lines=12), run_time=0.8)
            self.wait(vo.duration * 0.15)
            self.play(GrowFromCenter(br), FadeIn(brl), run_time=0.7)

        R1 = M("R_1", 32, color=GLASS).move_to(P(lx - 0.55, y0 + 1.75))
        R2 = M("R_2", 32, color=GLASS).move_to(P(lx + 0.55, y0 + 1.75))
        s1l = T("surface 1", 24, color=MUTED)
        e1 = MathTex(r"{n_2 \over v_1}", r"- {n_1 \over u} = {n_2 - n_1 \over R_1}", font_size=38)
        s2l = T("surface 2", 24, color=MUTED)
        e2 = MathTex(r"{n_1 \over v} -", r"{n_2 \over v_1}", r"= {n_1 - n_2 \over R_2}", font_size=38)
        add = M(r"{n_1 \over v} - {n_1 \over u} = (n_2 - n_1)\left({1 \over R_1} - {1 \over R_2}\right)", 36)
        colm = VGroup(s1l, e1, s2l, e2).arrange(DOWN, buff=0.22).move_to(P(3.3, 1.2))
        fit(add, 6.2).next_to(colm, DOWN, buff=0.5)
        with self.voiceover("A thin lens is just two refracting surfaces. Apply the single surface formula at each face, the"
                            " first image being the object for the second. Add the two equations, and that in between image "
                            "cancels.") as vo:
            self.play(FadeOut(rays), FadeOut(br), FadeOut(brl), FadeOut(F), FadeIn(R1), FadeIn(R2), run_time=0.7)
            self.play(FadeIn(s1l), Write(e1), run_time=1.3)
            self.wait(vo.duration * 0.12)
            self.play(FadeIn(s2l), Write(e2), run_time=1.3)
            st1 = Line(e1[0].get_corner(DL), e1[0].get_corner(UR), color=HL, stroke_width=4)
            st2 = Line(e2[1].get_corner(DL), e2[1].get_corner(UR), color=HL, stroke_width=4)
            self.play(Create(st1), Create(st2), run_time=0.7)
            self.play(Write(add), run_time=1.4)

        with self.voiceover("What is left is the lens maker's formula. One over f equals n minus one, times one over R one, "
                            "minus one over R two. Here n is measured relative to the surroundings.") as vo:
            self.clear_scene(0.5)
            kick = T("Lens maker's formula", 32, color=PRIMARY, weight="BOLD").move_to(P(0, 1.9))
            lm = M(r"\frac1f = (n-1)\left(\frac1{R_1} - \frac1{R_2}\right)", 68).move_to(P(0, 0.4))
            box = SurroundingRectangle(lm, buff=0.3, corner_radius=0.15, color=PRIMARY, stroke_width=3)
            rel = M(r"n = \frac{n_{\text{lens}}}{n_{\text{medium}}}", 50, color=GLASS).move_to(P(0, -1.7))
            self.play(FadeIn(kick), Write(lm), run_time=1.6)
            self.play(Create(box), run_time=0.5)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(rel, shift=0.2 * UP), run_time=0.8)

        # air vs water
        top = VGroup(lm, box)
        y1 = -0.6
        lx2 = -5.3
        ft = ValueTracker(1.0)
        L2 = lens(lx2, y1, h=1.3, w=0.26)
        ax2 = axis(-6.8, -0.2, y1)

        def water_rays():
            g = VGroup()
            f = P(lx2 + ft.get_value(), y1)
            for h in (0.9, 0.45, -0.45, -0.9):
                a = P(-6.7, y1 + h)
                b = P(lx2, y1 + h)
                d = (f - b) / np.linalg.norm(f - b)
                g.add(ray([a, b, f, f + 0.4 * d]))
            return g

        wr = always_redraw(water_rays)
        wf = always_redraw(lambda: Dot(P(lx2 + ft.get_value(), y1), radius=0.07, color=FOC))
        medium = T("air", 28, color=MUTED).move_to(P(-3.3, 1.3))
        tank = Rectangle(width=6.6, height=4.2, stroke_width=0).set_fill(WATER, 1).move_to(P(-3.5, -0.6))
        tank.set_z_index(-2)
        q1 = fit(M(r"\frac1f = 0.5\left(\frac1{20}+\frac1{20}\right) \Rightarrow f = 20\text{ cm}", 36), 6.0)
        q2l = T("in water:", 26, color=MUTED)
        q2 = M(r"n = \frac{1.5}{4/3} = \frac98", 36)
        q3 = fit(M(r"\frac1f = \frac18\cdot\frac1{10} \Rightarrow f = 80\text{ cm}", 36, color=GREEN), 6.0)
        qcol = VGroup(q1, q2l, q2, q3).arrange(DOWN, buff=0.35).move_to(P(3.5, -0.5))
        with self.voiceover("An equiconvex lens with radii of twenty centimetres and index one point five has f equal to "
                            "twenty centimetres. In water, the relative index drops to nine eighths, and f grows to eighty.") as vo:
            self.play(FadeOut(kick), FadeOut(rel), top.animate.scale(0.55).move_to(P(0, 3.1)), run_time=0.8)
            self.play(Create(ax2), FadeIn(L2), FadeIn(medium), run_time=0.6)
            self.play(FadeIn(wr), FadeIn(wf), run_time=0.6)
            self.play(Write(q1), run_time=1.3)
            self.wait(vo.duration * 0.1)
            water_lab = T("water", 28, color=GLASS).move_to(medium)
            self.play(FadeIn(tank), Transform(medium, water_lab), FadeIn(q2l), Write(q2), run_time=1.2)
            self.play(ft.animate.set_value(4.0), run_time=2.0)
            self.play(Write(q3), run_time=1.1)
        wr.clear_updaters()
        wf.clear_updaters()

        with self.voiceover("If the surroundings are denser than the lens, n minus one turns negative. A lens shaped air "
                            "bubble in water spreads light out. A convex lens is not always converging.") as vo:
            self.clear_scene(0.5)
            pool = Rectangle(width=14.4, height=8.2, stroke_width=0).set_fill(WATER, 1).set_z_index(-2)
            y2 = -0.3
            bx = -3.0
            fv = bx - 1.92
            ax3 = axis(-6.8, -0.2, y2)
            bub = lens(bx, y2, h=1.5, w=0.3, fill=BG, fill_op=1.0)
            bl = T("air bubble", 24, color=GLASS).next_to(bub, UP, buff=0.15)
            wl = T("water", 26, color=GLASS).move_to(P(-6.0, 3.3))
            g = VGroup()
            backs = VGroup()
            for h in (1.0, 0.5, 0.0, -0.5, -1.0):
                a = P(-6.6, y2 + h)
                b = P(bx, y2 + h)
                if h == 0:
                    end = P(-0.4, y2)
                else:
                    d = (b - P(fv, y2)) / np.linalg.norm(b - P(fv, y2))
                    end = b + (-0.4 - bx) / d[0] * d
                    backs.add(dline(b, P(fv, y2), color=IMG))
                g.add(ray([a, b, end]))
            Fv = fdot(P(fv, y2), "F", direction=DOWN)
            w1 = M(r"n = \frac{1}{4/3} = \frac34", 40)
            w2 = M(r"\frac1f = -\frac14\left(\frac1{12}+\frac1{12}\right)", 36)
            w3 = M(r"f = -24\text{ cm}", 42, color=GLASS)
            w4 = T("diverging", 28, color=GLASS)
            wcol = VGroup(w1, w2, w3, w4).arrange(DOWN, buff=0.3).move_to(P(3.4, 1.2))
            myth = card(T("\"a convex lens always converges\"", 24, color=INK)).move_to(P(3.4, -2.3))
            xm = cross_mark().scale(0.8).next_to(myth, RIGHT, buff=0.15)
            if xm.get_right()[0] > 6.8:
                VGroup(myth, xm).shift((xm.get_right()[0] - 6.7) * LEFT)
            self.play(FadeIn(pool), Create(ax3), FadeIn(bub), FadeIn(bl), FadeIn(wl), run_time=0.8)
            self.play(FadeIn(w1), run_time=0.6)
            self.play(LaggedStart(*[Create(r) for r in g], lag_ratio=0.15), run_time=1.8)
            self.play(Create(backs), FadeIn(Fv), run_time=0.8)
            self.play(Write(w2), run_time=1.0)
            self.play(FadeIn(w3), FadeIn(w4), run_time=0.6)
            self.wait(vo.duration * 0.05)
            self.play(FadeIn(myth), run_time=0.5)
            self.play(FadeIn(xm), run_time=0.4)

    # ------------------------------------------------------------ scene 2: thin lens formula and images
    def s2(self):
        tl = M(r"\frac1v - \frac1u = \frac1f, \qquad m = \frac vu", 70)
        box = SurroundingRectangle(tl, buff=0.3, corner_radius=0.15, color=PRIMARY, stroke_width=3)
        head = VGroup(tl, box).move_to(P(0, 0.3))
        with self.voiceover("So for any thin lens, one over v minus one over u equals one over f, and the magnification is v "
                            "over u.") as vo:
            self.wait(vo.duration * 0.3)
            self.play(Write(tl), run_time=1.8)
            self.play(Create(box), run_time=0.5)

        # real image bench: f = 20 cm, u = -30 cm, scale 0.075 units/cm
        y0 = -0.4
        lx = -0.5
        f = 1.5
        ox, oh = lx - 2.25, 0.8
        ix, ih = lx + 4.5, -1.6
        A = P(ox, y0 + oh)
        I = P(ix, y0 + ih)
        ax = axis(-6.8, 6.8, y0)
        L = lens(lx, y0, h=2.0, w=0.3)
        F1 = fdot(P(lx - f, y0), "F_1")
        F2 = fdot(P(lx + f, y0), "F_2")
        ob = obj_arrow(ox, y0, oh)
        im = obj_arrow(ix, y0, ih, color=IMG)
        r1 = ray([A, P(lx, y0 + oh), I, I + 0.6 * (I - P(lx, y0 + oh)) / np.linalg.norm(I - P(lx, y0 + oh))])
        r2 = ray([A, P(lx, y0), I, I + 0.6 * (I - A) / np.linalg.norm(I - A)])
        r3 = ray([A, P(lx, y0 + ih), I, I + 0.6 * RIGHT])
        res = M(r"u = -30,\ f = 20 \;\Rightarrow\; v = +60,\ m = -2", 34).move_to(P(3.6, 2.2))
        with self.voiceover("Three rays find any image: parallel to the axis, then through the far focus; through the "
                            "centre, straight on; through the near focus, then parallel. An object thirty centimetres from a"
                            " twenty centimetre lens images at plus sixty: real, inverted, twice the size.") as vo:
            self.play(head.animate.scale(0.5).move_to(P(4.6, 3.2)), run_time=0.7)
            self.play(Create(ax), FadeIn(L), FadeIn(F1), FadeIn(F2), GrowArrow(ob), run_time=1.0)
            self.play(Create(r1), run_time=1.4)
            self.wait(vo.duration * 0.05)
            self.play(Create(r2), run_time=1.3)
            self.wait(vo.duration * 0.05)
            self.play(Create(r3), run_time=1.3)
            self.play(GrowArrow(im), run_time=0.7)
            self.play(Write(res), run_time=1.2)

        with self.voiceover("Now bring an object inside the focus: ten centimetres from a fifteen centimetre lens. The rays "
                            "leave spreading out. Traced back, they meet at minus thirty: virtual, erect, three times "
                            "larger. A magnifying glass.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not head], run_time=0.5)
            y1 = -1.2
            lx = 1.5
            A = P(0.5, y1 + 0.6)
            I = P(-1.5, y1 + 1.8)
            ax = axis(-6.8, 6.8, y1)
            L = lens(lx, y1, h=1.5, w=0.28)
            F1 = fdot(P(0.0, y1), "F_1")
            F2 = fdot(P(3.0, y1), "F_2")
            ob = obj_arrow(0.5, y1, 0.6)
            ra = ray([A, P(lx, y1 + 0.6), P(5.0, y1 - 0.8)])
            rb = ray([A, P(lx, y1), P(4.2, y1 - 1.62)])
            ba = dline(P(lx, y1 + 0.6), I, color=IMG)
            bb = dline(P(lx, y1), I, color=IMG)
            vi = virt_arrow(-1.5, y1, 1.8)
            vl = T("virtual image", 22, color=IMG).next_to(vi, LEFT, buff=0.15).shift(0.5 * UP)
            eqs = VGroup(
                M(r"\frac1v = \frac1{15} - \frac1{10} \;\Rightarrow\; v = -30", 36),
                M(r"m = \frac{-30}{-10} = +3", 36),
                T("virtual, erect", 26, color=IMG),
            ).arrange(DOWN, buff=0.25).move_to(P(4.4, 1.3))
            self.play(Create(ax), FadeIn(L), FadeIn(F1), FadeIn(F2), GrowArrow(ob), run_time=0.9)
            self.play(Create(ra), Create(rb), run_time=1.6)
            self.wait(vo.duration * 0.1)
            self.play(Create(ba), Create(bb), run_time=1.4)
            self.play(FadeIn(vi), FadeIn(vl), run_time=0.7)
            self.play(Write(eqs[0]), run_time=1.2)
            self.play(Write(eqs[1]), FadeIn(eqs[2]), run_time=1.0)

        with self.voiceover("Why a minus sign, when mirrors have a plus? A lens lets light through, so real images form on "
                            "the far side, where v is positive. The mirror form would give plus six centimetres, which is "
                            "wrong.") as vo:
            self.clear_scene(0.5)
            lh = T("lens", 30, color=GLASS, weight="BOLD").move_to(P(-3.4, 2.3))
            rh = T("mirror form (wrong here)", 30, color=WARN, weight="BOLD").move_to(P(3.4, 2.3))
            le = M(r"\frac1v - \frac1u = \frac1f", 50).move_to(P(-3.4, 1.0))
            re = M(r"\frac1v + \frac1u = \frac1f", 50).move_to(P(3.4, 1.0))
            lr = M(r"v = -30\text{ cm}", 46, color=GREEN).move_to(P(-3.4, -0.4))
            rr = M(r"v = +6\text{ cm}", 46, color=WARN).move_to(P(3.4, -0.4))
            c1 = check().next_to(lr, RIGHT, buff=0.3)
            c2 = cross_mark().next_to(rr, RIGHT, buff=0.3)
            div = Line(P(0, 2.8), P(0, -1.2), color=GRID, stroke_width=3)
            cap = T("light goes through: real images form on the far side, v > 0", 28, color=MUTED)
            fit(cap, 12.5).move_to(P(0, -2.4))
            self.play(FadeIn(lh), Write(le), Create(div), run_time=1.0)
            self.wait(vo.duration * 0.15)
            self.play(FadeIn(cap), run_time=0.7)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(rh), Write(re), run_time=1.0)
            self.play(Write(lr), FadeIn(c1), run_time=0.8)
            self.play(Write(rr), FadeIn(c2), run_time=0.8)

    # ------------------------------------------------------------ scene 3: power and combinations
    def s3(self):
        p = M(r"P = \frac1f \quad (f\ \text{in metres})", 64).move_to(P(0, 1.8))
        unit = T("unit: dioptre (D)", 30, color=MUTED).next_to(p, DOWN, buff=0.35)
        ex1 = M(r"f = +25\text{ cm} \;\Rightarrow\; P = +4\text{ D}", 44, color=GREEN).move_to(P(0, -0.8))
        ex2 = M(r"f = -40\text{ cm} \;\Rightarrow\; P = -2.5\text{ D}", 44, color=WARN).next_to(ex1, DOWN, buff=0.4)
        with self.voiceover("Opticians use power, one over f in metres, measured in dioptres: positive for converging "
                            "lenses, negative for diverging.") as vo:
            self.play(Write(p), run_time=1.3)
            self.play(FadeIn(unit), run_time=0.6)
            self.wait(vo.duration * 0.15)
            self.play(FadeIn(ex1, shift=0.15 * UP), run_time=0.7)
            self.play(FadeIn(ex2, shift=0.15 * UP), run_time=0.7)

        y0 = 0.0
        ax = axis(-6.6, -1.4, y0)
        cv = lens(-4.4, y0, h=1.4, w=0.3)
        cc = lens(-3.98, y0, h=1.4, w=0.3, kind="concave")
        l1 = M("f_1", 32, color=GLASS).next_to(cv, UP, buff=0.15).shift(0.2 * LEFT)
        l2 = M("f_2", 32, color=GLASS).next_to(cc, UP, buff=0.15).shift(0.2 * RIGHT)
        c1 = M(r"\frac1{v_1} - \frac1u = \frac1{f_1}", 38)
        c2 = M(r"\frac1v - \frac1{v_1} = \frac1{f_2}", 38)
        c3 = M(r"P = P_1 + P_2", 50, color=PRIMARY)
        c4 = M(r"(+5) + (-2) = +3\text{ D} \;\Rightarrow\; F \approx 33\text{ cm}", 38, color=GREEN)
        ccol = VGroup(c1, c2, c3, c4).arrange(DOWN, buff=0.4).move_to(P(3.2, 0.2))
        fit(c4, 6.4)
        bx3 = SurroundingRectangle(c3, buff=0.18, corner_radius=0.12, color=PRIMARY, stroke_width=3)
        with self.voiceover("In contact, the first image is the object for the second lens, so the equations add, and so do "
                            "the powers. Plus five and minus two dioptres make plus three, a focal length of about thirty "
                            "three centimetres.") as vo:
            self.clear_scene(0.5)
            self.play(Create(ax), FadeIn(cv), FadeIn(cc), FadeIn(l1), FadeIn(l2), run_time=0.8)
            self.play(Write(c1), run_time=1.0)
            self.play(Write(c2), run_time=1.0)
            self.wait(vo.duration * 0.1)
            self.play(Write(c3), Create(bx3), run_time=1.0)
            self.wait(vo.duration * 0.1)
            self.play(Write(c4), run_time=1.3)

        d1 = M(r"\frac1F = \frac1{f_1} + \frac1{f_2} - \frac{d}{f_1 f_2}", 46)
        d2 = M(r"10 + 10 - 0.05\times 100 = 15\text{ D}", 40)
        d2n = T("not 20", 28, color=WARN)
        d3 = T("image position: go in two steps", 26, color=MUTED)
        dcol = VGroup(d1, VGroup(d2, d2n).arrange(RIGHT, buff=0.3), d3).arrange(DOWN, buff=0.5).move_to(P(3.2, 0.2))
        fit(dcol, 6.6)
        with self.voiceover("But only in contact. With a gap, an extra term appears: two lenses of plus ten dioptres each, "
                            "five centimetres apart, give fifteen dioptres, not twenty.") as vo:
            self.play(FadeOut(VGroup(c1, c2, c3, c4, bx3)), run_time=0.5)
            self.play(cc.animate.shift(1.6 * RIGHT), l2.animate.shift(1.6 * RIGHT), run_time=1.0)
            br = BraceBetweenPoints(P(-4.4, -1.6), P(-2.38, -1.6), direction=DOWN, color=INK)
            bl = M("d", 34).next_to(br, DOWN, buff=0.1)
            self.play(GrowFromCenter(br), FadeIn(bl), Write(d1), run_time=1.4)
            self.wait(vo.duration * 0.15)
            self.play(Write(dcol[1][0]), run_time=1.3)
            self.play(FadeIn(dcol[1][1]), run_time=0.5)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(d3), run_time=0.6)

        with self.voiceover("Silver the back of a lens, and it becomes a mirror: light crosses the lens twice, so the power "
                            "is twice the lens power plus the mirror power. A plano convex lens of radius twenty, silvered "
                            "flat, acts as a concave mirror of focal length twenty centimetres.") as vo:
            self.clear_scene(0.5)
            y0 = -0.4
            sx = -2.0
            ax = axis(-6.8, -1.0, y0)
            pl = lens(sx, y0, h=1.6, w=0.42, kind="plano")
            silver = Line(P(sx, y0 - 1.6), P(sx, y0 + 1.6), color=SILVER, stroke_width=9)
            hatch = VGroup(*[Line(P(sx + 0.05, y0 + yy), P(sx + 0.3, y0 + yy + 0.2), color=SILVER, stroke_width=2)
                             for yy in np.linspace(-1.5, 1.3, 9)])
            fx = sx - 2.4
            rs = VGroup()
            for h in (0.9, -0.9):
                a = P(-6.6, y0 + h)
                b = P(sx, y0 + h)
                f = P(fx, y0)
                d = (f - b) / np.linalg.norm(f - b)
                rs.add(ray([a, b], color=RAY), ray([b, f, f + 1.0 * d], color=RAY))
            Ff = fdot(P(fx, y0), "F", direction=DOWN)
            br = BraceBetweenPoints(P(fx, y0 - 1.95), P(sx, y0 - 1.95), direction=DOWN, color=INK)
            brl = M(r"20\text{ cm}", 30).next_to(br, DOWN, buff=0.1)
            sl = T("silvered", 24, color=SILVER).next_to(silver, UP, buff=0.15)
            q = VGroup(
                M(r"P_{\text{eq}} = 2P_L + P_M", 50, color=PRIMARY),
                M(r"f_L = 40\text{ cm},\quad P_M = 0", 38),
                M(r"P_{\text{eq}} = \frac{2}{40} = \frac1{20} \;\Rightarrow\; F = 20\text{ cm}", 38, color=GREEN),
            ).arrange(DOWN, buff=0.45).move_to(P(3.6, 0.4))
            fit(q, 5.8)
            self.play(Create(ax), FadeIn(pl), Create(silver), Create(hatch), FadeIn(sl), run_time=1.0)
            self.play(LaggedStart(*[Create(r) for r in rs], lag_ratio=0.3), run_time=2.2)
            self.play(FadeIn(Ff), run_time=0.4)
            self.play(Write(q[0]), run_time=1.2)
            self.wait(vo.duration * 0.15)
            self.play(Write(q[1]), run_time=1.0)
            self.play(Write(q[2]), GrowFromCenter(br), FadeIn(brl), run_time=1.3)

    # ------------------------------------------------------------ scene 4: the prism
    def prism_angles(self, pp):
        p1, p2 = pp["p1"], pp["p2"]
        i, r1, r2, e = pp["i"], pp["r1"], pp["r2"], pp["e"]
        n1 = dline(p1 + 0.9 * U(150), p1 + 0.9 * U(-30))
        n2 = dline(p2 + 0.9 * U(30), p2 + 0.9 * U(210))
        arcs = VGroup(
            angle_arc(p1, 150, 150 + i, 0.55),
            angle_arc(p1, -30, -30 + r1, 0.4),
            angle_arc(p2, 150 + r1, 210, 0.4),
            angle_arc(p2, 30 - e, 30, 0.55),
        )
        labs = VGroup(
            M("i", 28).move_to(p1 + 0.85 * U(150 + i / 2)),
            M("r_1", 24).move_to(p1 + 0.62 * U(-30 + r1 / 2)),
            M("r_2", 24).move_to(p2 + 0.62 * U(180 + r1 / 2)),
            M("e", 28).move_to(p2 + 0.85 * U(30 - e / 2)),
        )
        return VGroup(n1, n2), arcs, labs

    def s4(self):
        pr = prism()
        apex_arc = angle_arc(APEX, 240, 300, 0.45)
        al = M(r"A = 60^\circ", 30).next_to(APEX, UP, buff=0.12)
        nl = M(r"n = 1.5", 28, color=GLASS).move_to(P(APEX[0], B1[1] + 0.35))
        pp = prism_path(48.59)
        path = ray([pp["start"], pp["p1"], pp["p2"], pp["end"]])
        normals, arcs, labs = self.prism_angles(pp)
        e1 = M(r"r_1 + r_2 = A", 52).move_to(P(3.6, 1.5))
        with self.voiceover(f"In a prism with apex angle {LA}, a ray bends towards the base at each face. Draw the two "
                            f"normals, and the geometry gives r one plus r two equals {LA}.") as vo:
            self.play(FadeIn(pr), Create(apex_arc), FadeIn(al), FadeIn(nl), run_time=0.9)
            self.play(Create(path), run_time=1.8)
            self.wait(vo.duration * 0.1)
            self.play(Create(normals), run_time=0.7)
            self.play(Create(arcs), FadeIn(labs), run_time=1.0)
            self.play(Write(e1), run_time=1.0)

        q = intersect(pp["p1"], pp["d_in"], pp["p2"], pp["d_out"])
        ext = dline(pp["p1"], q + 2.3 * pp["d_in"], color=MUTED)
        a_out = np.degrees(np.arctan2(pp["d_out"][1], pp["d_out"][0]))
        a_in = np.degrees(np.arctan2(pp["d_in"][1], pp["d_in"][0]))
        darc = angle_arc(q, a_out, a_in, 1.7, color=HL, sw=4)
        dl = M(r"\delta", 36, color=HL).move_to(q + 2.05 * U((a_in + a_out) / 2))
        e2 = M(r"\delta = i + e - A", 52).move_to(P(3.6, 0.2))
        with self.voiceover(f"The total turn is the deviation. Delta equals i plus e minus {LA}.") as vo:
            self.play(FadeOut(arcs), FadeOut(labs), run_time=0.4)
            self.play(Create(ext), run_time=0.8)
            self.play(Create(darc), FadeIn(dl), run_time=0.7)
            self.play(Write(e2), run_time=1.0)

        # live sweep
        it = ValueTracker(48.59)

        def live_ray():
            q = prism_path(it.get_value())
            return ray([q["start"], q["p1"], q["p2"], q["end"]])

        def live_normals():
            q = prism_path(it.get_value())
            return VGroup(dline(q["p1"] + 0.9 * U(150), q["p1"] + 0.9 * U(-30)),
                          dline(q["p2"] + 0.9 * U(30), q["p2"] + 0.9 * U(210)))

        axes = Axes(x_range=[20, 90, 10], y_range=[30, 60, 10], x_length=5.4, y_length=3.4,
                    axis_config={"color": MUTED, "stroke_width": 2, "include_tip": False},
                    x_axis_config={"numbers_to_include": [30, 50, 70, 90], "font_size": 22},
                    y_axis_config={"numbers_to_include": [30, 40, 50, 60], "font_size": 22})
        axes.move_to(P(3.7, -0.3))
        for nl_ in (axes.x_axis.numbers, axes.y_axis.numbers):
            nl_.set_color(INK)
        xl = M(r"i", 30).next_to(axes.x_axis.get_right(), RIGHT, buff=0.15)
        yl = M(r"\delta", 30).next_to(axes.y_axis.get_top(), UP, buff=0.15)
        start_i = 30.0
        trace = always_redraw(lambda: axes.plot(deviation, x_range=[start_i, max(start_i + 0.01, it.get_value())],
                                                color=IMG, stroke_width=4))
        dot = always_redraw(lambda: Dot(axes.c2p(it.get_value(), deviation(it.get_value())), radius=0.08,
                                        color=PRIMARY))
        il = M(r"i =", 34).move_to(P(1.6, 2.8))
        iv = DecimalNumber(30, num_decimal_places=1, unit=r"^{\circ}", font_size=34, color=INK)
        iv.add_updater(lambda m: m.set_value(it.get_value()).next_to(il, RIGHT, buff=0.15))
        dlab = M(r"\delta =", 34).move_to(P(4.4, 2.8))
        dv = DecimalNumber(47.2, num_decimal_places=1, unit=r"^{\circ}", font_size=34, color=IMG)
        dv.add_updater(lambda m: m.set_value(deviation(it.get_value())).next_to(dlab, RIGHT, buff=0.15))
        lr = always_redraw(live_ray)
        ln = always_redraw(live_normals)

        with self.voiceover("Now change the angle of incidence. The deviation falls, stops, then rises. Light paths are "
                            "reversible, so i and e give the same deviation. At the minimum, i equals e, and the ray inside "
                            "runs parallel to the base.") as vo:
            self.play(FadeOut(e1), FadeOut(e2), FadeOut(ext), FadeOut(darc), FadeOut(dl), run_time=0.5)
            self.remove(path, normals)
            self.add(lr, ln)
            self.play(Create(axes), FadeIn(xl), FadeIn(yl), run_time=0.8)
            self.play(it.animate.set_value(start_i), run_time=0.8)
            self.add(trace, dot)
            self.play(FadeIn(il), FadeIn(iv), FadeIn(dlab), FadeIn(dv), run_time=0.4)
            self.play(it.animate.set_value(85), run_time=4.5, rate_func=linear)
            trace.clear_updaters()  # keep the whole curve while the dot walks back to the minimum
            self.wait(vo.duration * 0.1)
            self.play(it.animate.set_value(48.59), run_time=2.0)
            mpt = axes.c2p(48.59, deviation(48.59))
            md = Dot(mpt, radius=0.1, color=HL)
            ml = M(r"\delta_m = 37.2^\circ", 30, color=HL).next_to(mpt, UP, buff=0.25)
            q = prism_path(48.59)
            inside = Line(q["p1"], q["p2"], color=HL, stroke_width=7)
            cap = T("inside: parallel to the base", 24, color=HL).move_to(P(APEX[0], B1[1] - 0.45))
            self.play(FadeIn(md), FadeIn(ml), run_time=0.6)
            self.play(Create(inside), FadeIn(cap), run_time=0.8)
        for m in (iv, dv):
            m.clear_updaters()
        trace.clear_updaters()
        dot.clear_updaters()
        lr.clear_updaters()
        ln.clear_updaters()

        with self.voiceover(f"At the minimum, n equals the sine of {LA} plus delta m over two, over the sine of {LA} over "
                            f"two. A sixty degree prism with a minimum deviation of thirty degrees has an index of root two. "
                            f"And a thin prism simply deviates by n minus one, times {LA}.") as vo:
            self.clear_scene(0.5)
            f = M(r"n = \frac{\sin\frac{A+\delta_m}{2}}{\sin\frac A2}", 66).move_to(P(0, 2.0))
            bx = SurroundingRectangle(f, buff=0.25, corner_radius=0.15, color=PRIMARY, stroke_width=3)
            ex = M(r"A = 60^\circ,\ \delta_m = 30^\circ:\quad n = \frac{\sin 45^\circ}{\sin 30^\circ} = \sqrt2", 46,
                   color=GREEN).move_to(P(0, -0.3))
            th = VGroup(T("thin prism:", 30, color=MUTED), M(r"\delta = (n-1)A", 50)).arrange(RIGHT, buff=0.35)
            th.move_to(P(0, -2.2))
            self.play(Write(f), run_time=1.8)
            self.play(Create(bx), run_time=0.5)
            self.wait(vo.duration * 0.15)
            self.play(Write(ex), run_time=1.6)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(th, shift=0.15 * UP), run_time=0.8)

    # ------------------------------------------------------------ scene 5: dispersion and scattering
    def s5(self):
        pr = prism()
        cols = ["#D7263D", "#F46036", "#E3B505", "#3D8B57", "#2E6DB4", "#7A4FB5"]
        ns = np.linspace(1.44, 1.60, 6)
        base = prism_path(50, n=1.52, l_in=2.4)
        white = Line(base["start"], base["p1"], color=ManimColor("#A39893"), stroke_width=7)
        wtip = tip_at(base["start"], base["p1"], ManimColor("#A39893"), 0.12)
        wl = T("white light", 22, color=MUTED).next_to(base["start"], DOWN, buff=0.15).shift(0.5 * RIGHT)
        fan_in = VGroup()
        fan_out = VGroup()
        for c, n in zip(cols, ns):
            q = prism_path(50, n=n, l_out=2.9)
            fan_in.add(Line(q["p1"], q["p2"], color=ManimColor(c), stroke_width=2.5))
            fan_out.add(Line(q["p2"], q["end"], color=ManimColor(c), stroke_width=4))
        red_l = T("red", 22, color=ManimColor(cols[0])).next_to(fan_out[0].get_end(), RIGHT, buff=0.1)
        vio_l = T("violet", 22, color=ManimColor(cols[-1])).next_to(fan_out[-1].get_end(), RIGHT, buff=0.1)
        exag = T("spread exaggerated", 20, color=MUTED).move_to(P(APEX[0], B1[1] - 0.4))
        c1 = M(r"n(\lambda) \approx n_0 + \frac{k}{\lambda^2}", 48).move_to(P(3.9, 1.6))
        c2 = M(r"n_{\text{violet}} \approx 1.526,\quad n_{\text{red}} \approx 1.509", 36).move_to(P(3.9, 0.2))
        fit(c2, 5.4)
        with self.voiceover("White light is a mixture, and glass has a slightly different index for each colour. Shorter "
                            "wavelength means larger n, so violet bends most and red least.") as vo:
            self.play(FadeIn(pr), Create(white), FadeIn(wtip), FadeIn(wl), run_time=1.0)
            self.play(Create(fan_in), run_time=0.6)
            self.play(LaggedStart(*[Create(r) for r in fan_out], lag_ratio=0.12), run_time=1.4)
            self.play(FadeIn(red_l), FadeIn(vio_l), FadeIn(exag), run_time=0.5)
            self.play(Write(c1), run_time=1.0)
            self.play(FadeIn(c2), run_time=0.6)

        d1 = VGroup(M(r"\theta = (n_v - n_r)A", 40), T("angular dispersion", 22, color=MUTED)).arrange(DOWN, buff=0.12)
        d2 = VGroup(M(r"\omega = \frac{n_v - n_r}{n-1}", 40), T("dispersive power", 22, color=MUTED)).arrange(DOWN, buff=0.12)
        d3 = VGroup(T("achromatic pair:", 24, color=PRIMARY), M(r"\omega\delta + \omega'\delta' = 0", 40)).arrange(DOWN, buff=0.12)
        d4 = M(r"\text{crown } 6^\circ\ +\ \text{flint } 3^\circ\ (\text{reversed})", 32, color=GREEN)
        dcol = VGroup(d1, d2, d3, d4).arrange(DOWN, buff=0.35).move_to(P(3.9, 0.1))
        fit(dcol, 5.4)
        with self.voiceover(f"The colours fan out by n violet minus n red, times {LA}. Dispersive power, omega, compares that"
                            f" spread to the mean deviation, and depends only on the glass. A flint prism turned against a "
                            f"crown prism cancels the colours but keeps some bending: an achromatic pair.") as vo:
            self.play(FadeOut(c1), FadeOut(c2), run_time=0.4)
            self.play(FadeIn(d1, shift=0.15 * UP), run_time=0.8)
            self.wait(vo.duration * 0.12)
            self.play(FadeIn(d2, shift=0.15 * UP), run_time=0.8)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(d3, shift=0.15 * UP), run_time=0.8)
            self.play(FadeIn(d4, shift=0.15 * UP), run_time=0.7)

        with self.voiceover("Tiny air molecules scatter light as one over lambda to the fourth, so four hundred nanometre "
                            "light scatters about nine times more than seven hundred. Scattered blue fills the sky. At "
                            "sunset, the long path through air leaves red. Big cloud droplets scatter all colours equally, "
                            "so clouds are white.") as vo:
            self.clear_scene(0.5)
            law = M(r"I \propto \frac{1}{\lambda^4}", 56).move_to(P(-3.6, 2.7))
            ratio = M(r"\left(\frac{700}{400}\right)^4 \approx 9.4", 44).move_to(P(0.6, 2.7))
            yb = -1.3
            sun = VGroup(Circle(radius=0.45, color=ACCENT, stroke_width=3).set_fill(ManimColor("#F6C453"), 1),
                         *[Line(0.6 * U(a), 0.8 * U(a), color=ACCENT, stroke_width=3) for a in range(0, 360, 45)])
            sun.move_to(P(-6.0, yb))
            beam = Line(P(-5.3, yb), P(5.6, yb), stroke_width=10)
            beam.set_color([ManimColor("#D9472B"), ManimColor("#F0A040"), ManimColor("#F2D16B")])
            rng = np.random.default_rng(7)
            xs = np.linspace(-4.4, 4.6, 16)
            dots = VGroup(*[Dot(P(x + rng.uniform(-0.2, 0.2), yb + rng.uniform(-0.45, 0.45)), radius=0.05,
                                color=MUTED) for x in xs])
            blue = ManimColor("#2E6DB4")
            scat = VGroup()
            for k, d in enumerate(dots[:10]):
                ang = 90 + rng.uniform(-35, 35) if k % 2 == 0 else -90 + rng.uniform(-35, 35)
                c = d.get_center()
                scat.add(Arrow(c, c + 0.75 * U(ang), buff=0.05, color=blue, stroke_width=3,
                               max_tip_length_to_length_ratio=0.3))
            sky = T("blue scattered sideways: blue sky", 24, color=blue).move_to(P(-1.6, yb + 1.35))
            sunset = T("long path: red is left", 24, color=ManimColor("#D9472B")).move_to(P(3.7, yb - 1.2))
            cloud = VGroup(*[Circle(radius=r, stroke_width=0).set_fill(WHITE, 1).move_to(P(x, y))
                             for r, x, y in ((0.42, -0.45, 0), (0.55, 0.1, 0.18), (0.4, 0.62, 0.0), (0.36, 0.15, -0.15))])
            outline = VGroup(*[Circle(radius=r + 0.03, color=MUTED, stroke_width=2).move_to(P(x, y))
                               for r, x, y in ((0.42, -0.45, 0), (0.55, 0.1, 0.18), (0.4, 0.62, 0.0), (0.36, 0.15, -0.15))])
            cl = VGroup(outline, cloud).move_to(P(5.0, 2.55))
            cll = T("big drops: all colours, white", 22, color=MUTED).next_to(cl, DOWN, buff=0.2)
            if cll.get_right()[0] > 6.8:
                cll.shift((cll.get_right()[0] - 6.7) * LEFT)
            self.play(Write(law), run_time=1.0)
            self.play(Write(ratio), run_time=1.0)
            self.wait(vo.duration * 0.15)
            self.play(FadeIn(sun), Create(beam), FadeIn(dots), run_time=1.2)
            self.play(LaggedStart(*[GrowArrow(a) for a in scat], lag_ratio=0.1), FadeIn(sky), run_time=1.6)
            self.wait(vo.duration * 0.12)
            self.play(FadeIn(sunset), Indicate(beam, scale_factor=1.0, color=ManimColor("#D9472B")), run_time=1.2)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(cl), FadeIn(cll), run_time=0.9)

    # ------------------------------------------------------------ scene 6: eye and magnifier
    def s6(self):
        ec = P(4.0, 0.0)
        eye = Circle(radius=1.3, color=INK, stroke_width=3).set_fill(WHITE, 0.9).move_to(ec)
        retina = Arc(radius=1.3, start_angle=-50 * DEGREES, angle=100 * DEGREES, arc_center=ec,
                     color=PRIMARY, stroke_width=7)
        lx = ec[0] - 1.15
        lw = ValueTracker(0.18)
        eyelens = always_redraw(lambda: Ellipse(width=2 * lw.get_value(), height=1.2, color=GLASS, stroke_width=3)
                                .set_fill(GLASS_FILL, 0.9).move_to(P(lx, 0)))
        spot = P(ec[0] + 1.3, 0)
        far = VGroup(*[ray([P(-6.0, h), P(lx, h), spot]) for h in (0.45, 0.0, -0.45)])
        fl = T("far point: infinity", 26, color=MUTED).move_to(P(-3.2, 1.3))
        rl = T("retina", 22, color=PRIMARY).next_to(spot, RIGHT, buff=0.15)
        if rl.get_right()[0] > 6.8:
            rl.next_to(eye, DOWN, buff=0.1).shift(1.0 * RIGHT)
        src = P(-0.6, 0)
        srcd = Dot(src, radius=0.09, color=OBJ)
        near = VGroup(*[ray([src, P(lx, h), spot]) for h in (0.45, 0.0, -0.45)])
        nl = M(r"\text{near point: } D = 25\text{ cm}", 34, color=OBJ).move_to(P(-2.8, -1.4))
        acc = T("accommodation: the lens fattens", 24, color=GLASS).move_to(P(4.0, -1.9))
        with self.voiceover("Your eye is a lens that changes its own focal length, focusing from the near point, twenty five"
                            " centimetres, out to the far point, infinity for a normal eye.") as vo:
            self.play(FadeIn(eye), Create(retina), FadeIn(eyelens), FadeIn(rl), run_time=0.9)
            self.play(LaggedStart(*[Create(r) for r in far], lag_ratio=0.2), FadeIn(fl), run_time=1.6)
            self.wait(vo.duration * 0.15)
            self.play(FadeOut(far), FadeOut(fl), FadeIn(srcd), run_time=0.5)
            self.play(LaggedStart(*[Create(r) for r in near], lag_ratio=0.2), lw.animate.set_value(0.3),
                      FadeIn(nl), FadeIn(acc), run_time=1.8)
        eyelens.clear_updaters()

        with self.voiceover("Spectacles form a virtual image where your eye can focus. If you cannot see beyond eighty "
                            "centimetres, a concave lens must image infinity at minus eighty: f is minus eighty centimetres,"
                            " minus one point two five dioptres.") as vo:
            self.clear_scene(0.5)
            h1 = T("Myopia: far point 80 cm", 30, color=PRIMARY, weight="BOLD").move_to(P(0, 1.6))
            m1 = M(r"u = -\infty,\ v = -80 \;\Rightarrow\; f = -80\text{ cm},\ P = -1.25\text{ D}", 42)
            fit(m1, 12.5).move_to(P(0, 0.4))
            note = T("the lens moves the image into the range your eye can focus", 24, color=MUTED).move_to(P(0, -1.0))
            self.play(FadeIn(note), run_time=0.6)
            self.wait(vo.duration * 0.15)
            self.play(FadeIn(h1), run_time=0.5)
            self.play(Write(m1), run_time=1.6)

        with self.voiceover("How big something looks depends on the angle at your eye. A magnifier does not enlarge the "
                            "object; it lets you hold it closer than twenty five centimetres and still focus.") as vo:
            self.clear_scene(0.5)
            ex = 5.6
            rows = []
            for yy, dist, lab, glass in ((1.0, 4.6, r"\alpha", False), (-2.0, 1.8, r"\beta", True)):
                e = Circle(radius=0.4, color=INK, stroke_width=3).set_fill(WHITE, 1).move_to(P(ex, yy))
                pupil = Dot(P(ex - 0.24, yy), radius=0.08, color=INK)
                eyept = P(ex - 0.4, yy)
                ox = eyept[0] - dist
                ob = obj_arrow(ox, yy, 1.0)
                l1 = Line(eyept, P(ox, yy + 1.0), color=RAY, stroke_width=3)
                l0 = Line(eyept, P(ox, yy), color=MUTED, stroke_width=2)
                ang = np.degrees(np.arctan2(1.0, dist))
                rr = 1.5 if not glass else 1.05
                arc = angle_arc(eyept, 180 - ang, 180, rr, color=HL, sw=4)
                al = M(lab, 32, color=HL).move_to(eyept + (rr + 0.35) * U(180 - ang / 2))
                g = VGroup(e, pupil, ob, l0, l1, arc, al)
                if glass:
                    g.add(lens(eyept[0] - 0.45, yy, h=0.95, w=0.13))
                rows.append(g)
            t1 = T("at 25 cm, no lens", 26, color=MUTED).move_to(P(-3.6, 1.5))
            t2 = T("closer, with a magnifier", 26, color=MUTED).move_to(P(-3.6, -1.5))
            cap = T("same object, bigger angle", 30, color=PRIMARY).move_to(P(-1.0, 3.2))
            self.play(FadeIn(rows[0]), FadeIn(t1), run_time=1.0)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(rows[1]), FadeIn(t2), run_time=1.0)
            self.wait(vo.duration * 0.15)
            self.play(FadeIn(cap), run_time=0.6)

        with self.voiceover("With the image at the near point, the magnification is one plus D over f. With the image "
                            "at infinity, it is D over f. A five centimetre lens gives six, or five.") as vo:
            self.clear_scene(0.5)
            a = VGroup(M(r"M = 1 + \frac Df", 60), T("image at the near point", 24, color=MUTED)).arrange(DOWN, buff=0.2)
            b = VGroup(M(r"M = \frac Df", 60), T("image at infinity (relaxed eye)", 24, color=MUTED)).arrange(DOWN, buff=0.2)
            row = VGroup(a, b).arrange(RIGHT, buff=1.6).move_to(P(0, 1.0))
            ex = M(r"f = 5\text{ cm}:\quad M = 1 + \frac{25}{5} = 6 \quad\text{or}\quad \frac{25}{5} = 5", 44,
                   color=GREEN).move_to(P(0, -1.6))
            self.play(Write(a), run_time=1.2)
            self.wait(vo.duration * 0.1)
            self.play(Write(b), run_time=1.0)
            self.play(Write(ex), run_time=1.4)

    # ------------------------------------------------------------ scene 7: microscope and telescope
    def s7(self):
        y0 = 0.9
        ox_, fo = -4.3, 0.9
        ex_, fe = -0.5, 1.5
        A = P(-5.65, y0 + 0.35)
        I1 = P(-1.6, y0 - 0.7)
        I2 = P(-4.625, y0 - 2.625)
        ax = axis(-6.8, 2.2, y0)
        obj_l = lens(ox_, y0, h=1.0, w=0.2)
        eye_l = lens(ex_, y0, h=1.2, w=0.24)
        ob = obj_arrow(-5.65, y0, 0.35)
        Fo = fdot(P(ox_ - fo, y0))
        Fo2 = fdot(P(ox_ + fo, y0))
        Fe2 = fdot(P(ex_ + fe, y0))
        ra = ray([A, P(ox_, y0 + 0.35), I1])
        rb = ray([A, P(ox_, y0), I1])
        im1 = obj_arrow(-1.6, y0, -0.7, color=IMG)
        rc = ray([I1, P(ex_, y0 - 0.7), P(2.0, y0 - 0.7 + 2.5 * 0.7 / 1.5)])
        rd = ray([I1, P(ex_, y0), P(2.0, y0 + 2.5 * 0.7 / 1.1)])
        bc = dline(P(ex_, y0 - 0.7), I2, color=IMG)
        bd = dline(P(ex_, y0), I2, color=IMG)
        fin = virt_arrow(-4.625, y0, -2.625)
        labs = VGroup(
            T("objective", 22, color=GLASS).next_to(obj_l, UP, buff=0.12),
            T("eyepiece", 22, color=GLASS).next_to(eye_l, UP, buff=0.12),
            T("real image", 22, color=IMG).next_to(P(-1.6, y0), UP, buff=0.15),
            T("final virtual image", 22, color=IMG).next_to(I2, DOWN, buff=0.12),
        )
        with self.voiceover("Two lenses in a row multiply magnifications. In a compound microscope, a short focus objective "
                            "makes a real, enlarged image, and the eyepiece magnifies it like a magnifying glass.") as vo:
            self.play(Create(ax), FadeIn(obj_l), FadeIn(eye_l), FadeIn(labs[0]), FadeIn(labs[1]), GrowArrow(ob),
                      FadeIn(Fo), FadeIn(Fo2), FadeIn(Fe2), run_time=1.0)
            self.play(Create(ra), Create(rb), run_time=1.4)
            self.play(GrowArrow(im1), FadeIn(labs[2]), run_time=0.6)
            self.wait(vo.duration * 0.1)
            self.play(Create(rc), Create(rd), run_time=1.4)
            self.play(Create(bc), Create(bd), run_time=1.2)
            self.play(FadeIn(fin), FadeIn(labs[3]), run_time=0.6)

        mcol = VGroup(
            M(r"M = m_o M_e = \frac{v_o}{u_o}\left(1 + \frac D{f_e}\right)", 36),
            M(r"f_o = 1,\ f_e = 5,\ u_o = -1.1\text{ cm}", 32),
            M(r"m_o = -10,\ M_e = 6", 34),
            M(r"M = -60", 44, color=GREEN),
        ).arrange(DOWN, buff=0.35)
        fit(mcol, 4.2).move_to(P(4.6, 0.4))
        with self.voiceover("With a one centimetre objective, a five centimetre eyepiece, and the object at one point one "
                            "centimetres, that is ten times six: sixty.") as vo:
            self.play(Write(mcol[0]), run_time=1.3)
            self.play(FadeIn(mcol[1]), run_time=0.6)
            self.wait(vo.duration * 0.15)
            self.play(Write(mcol[2]), run_time=1.0)
            self.play(Write(mcol[3]), run_time=0.8)

        with self.voiceover("A telescope views things at infinity. The objective forms a small image at its focus, and the "
                            "eyepiece, sharing that focus, sends the light out at a bigger angle. In normal adjustment, M is"
                            " f objective over f eyepiece, and the tube is their sum.") as vo:
            self.clear_scene(0.5)
            y0 = 0.3
            ox_, fo = -5.0, 4.2
            ex_, fe = 0.6, 1.4
            al_deg = 9.0
            fpx = ox_ + fo
            img = P(fpx, y0 - fo * np.tan(np.radians(al_deg)))
            beta = np.degrees(np.arctan2(y0 - img[1], fe))
            ax = axis(-6.8, 2.9, y0)
            L1 = lens(ox_, y0, h=1.3, w=0.24)
            L2 = lens(ex_, y0, h=1.2, w=0.22)
            rays = VGroup()
            for h in (0.7, 0.0, -0.7):
                hit = P(ox_, y0 + h)
                start = hit - 1.6 * np.array([1, -np.tan(np.radians(al_deg)), 0])
                d = (img - hit) / np.linalg.norm(img - hit)
                e_hit = hit + (ex_ - ox_) / d[0] * d
                out = e_hit + 2.2 * U(beta)
                rays.add(ray([start, hit, img, e_hit, out]))
            fp = Dot(img, radius=0.08, color=FOC)
            arc_a = angle_arc(P(ox_, y0), 180 - al_deg, 180, 1.3, color=HL, sw=4)
            la = M(r"\alpha", 32, color=HL).move_to(P(ox_, y0) + 1.6 * U(180 - al_deg / 2))
            arc_b = angle_arc(P(ex_, y0), 0, beta, 1.0, color=HL, sw=4)
            lb = M(r"\beta", 32, color=HL).move_to(P(ex_, y0) + 1.3 * U(beta / 2))
            br = BraceBetweenPoints(P(ox_, y0 - 1.6), P(ex_, y0 - 1.6), direction=DOWN, color=INK)
            brl = M(r"L = f_o + f_e", 32).next_to(br, DOWN, buff=0.1)
            tl = VGroup(T("objective", 22, color=GLASS).next_to(L1, UP, buff=0.12),
                        T("eyepiece", 22, color=GLASS).next_to(L2, UP, buff=0.12))
            t1 = M(r"M = \frac{\beta}{\alpha} = \frac{f_o}{f_e}", 50).move_to(P(4.9, 2.4))
            self.play(Create(ax), FadeIn(L1), FadeIn(L2), FadeIn(tl), run_time=0.8)
            self.play(LaggedStart(*[Create(r) for r in rays], lag_ratio=0.2), run_time=2.6)
            self.play(FadeIn(fp), Create(arc_a), FadeIn(la), run_time=0.7)
            self.play(Create(arc_b), FadeIn(lb), run_time=0.7)
            self.wait(vo.duration * 0.1)
            self.play(Write(t1), run_time=1.2)
            self.play(GrowFromCenter(br), FadeIn(brl), run_time=0.8)

        with self.voiceover("With one hundred fifty and five centimetres, that is thirty times, in a tube one hundred fifty "
                            "five centimetres long. The Moon's image is only one point four centimetres across, but it is "
                            "close to your eye, so the angle is bigger.") as vo:
            tcol = VGroup(
                M(r"f_o = 150,\ f_e = 5", 36),
                M(r"M = 30,\ L = 155\text{ cm}", 36, color=GREEN),
                M(r"\text{Moon's image: } f_o\alpha \approx 1.4\text{ cm}", 32),
                T("smaller than the object,\nbut much closer", 24, color=PRIMARY),
            ).arrange(DOWN, buff=0.35)
            fit(tcol, 3.3).next_to(t1, DOWN, buff=0.45).shift(0.1 * LEFT)
            self.play(FadeIn(tcol[0]), run_time=0.6)
            self.play(Write(tcol[1]), run_time=1.0)
            self.wait(vo.duration * 0.15)
            self.play(Write(tcol[2]), run_time=1.2)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(tcol[3]), run_time=0.6)

    # ------------------------------------------------------------ scene 8: recap
    def s8(self):
        title = T("Chapter 1 in five lines", 38, color=PRIMARY, weight="BOLD").move_to(P(0, 3.2))
        lines = [
            (r"\frac1f = (n-1)\left(\frac1{R_1}-\frac1{R_2}\right)", "n relative to the surroundings"),
            (r"\frac1v - \frac1u = \frac1f,\quad m = \frac vu", "real images on the far side"),
            (r"P = P_1 + P_2", "lenses in contact only"),
            (r"n = \dfrac{\sin\frac{A+\delta_m}{2}}{\sin\frac A2}", "minimum at i = e; violet bends most"),
            (r"M = 1 + \frac Df, \quad M = \frac{f_o}{f_e}", "angle, not size"),
        ]
        lefts = VGroup()
        notes = []
        for i, (tex, note) in enumerate(lines):
            m = fit(M(tex, 36), 6.0)
            num = T(f"{i + 1}.", 28, color=PRIMARY, weight="BOLD")
            lefts.add(VGroup(num, m).arrange(RIGHT, buff=0.3))
            notes.append(fit(T(note, 24, color=MUTED), 5.0))
        lefts.arrange(DOWN, buff=0.28, aligned_edge=LEFT).move_to(P(0, -0.25))
        lefts.align_to(P(-6.3, 0, ), LEFT)
        rows = VGroup()
        for lg, n in zip(lefts, notes):
            n.move_to(P(1.6, lg[1].get_y()), aligned_edge=LEFT)
            rows.add(VGroup(*lg, n))
        with self.voiceover("To recap. Two surfaces make a lens, with the index relative to the surroundings. One over v "
                            "minus one over u equals one over f, with real images on the far side.") as vo:
            self.play(FadeIn(title), run_time=0.6)
            self.play(FadeIn(rows[0], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.3)
            self.play(FadeIn(rows[1], shift=0.15 * UP), run_time=0.7)
        with self.voiceover("Powers add for lenses in contact. A prism's deviation has a minimum where i equals e, and "
                            "violet bends most. And every instrument is about angle, not size.") as vo:
            self.play(FadeIn(rows[2], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.15)
            self.play(FadeIn(rows[3], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(rows[4], shift=0.15 * UP), run_time=0.7)
        with self.voiceover("Try the mastery quiz. Then chapter two drops the ray model: when slits and films shrink to a "
                            "wavelength, light shows that it is a wave.") as vo:
            nxt = T("Next: Chapter 2 · Wave Optics", 32, color=PRIMARY).move_to(P(0, -3.45))
            self.wait(vo.duration * 0.3)
            self.play(FadeIn(nxt, shift=0.2 * UP), run_time=0.8)
