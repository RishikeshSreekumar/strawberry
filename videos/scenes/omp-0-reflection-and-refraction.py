import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

# Chapter colour roles (light background).
RAY = PRIMARY  # light rays = strawberry red
REFL = PRIMARY  # reflected ray (same light, same colour)
REFR = SECONDARY  # refracted ray = teal
VIRT = PURPLE  # dashed back-extensions, virtual images
OBJ = INK  # objects
IMG = ACCENT  # images = amber
MIRROR = ManimColor("#5B6C7A")  # mirror slate
GLASS = ManimColor("#9CCFD8")  # glass / water fill
HL = ManimColor("#D19A00")  # highlight gold
WARN = PRIMARY


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
                 max_tip_length_to_length_ratio=0.18, max_stroke_width_to_length_ratio=12)


def check():
    return MathTex(r"\checkmark", color=GREEN, font_size=56)


def cross_mark():
    return MathTex(r"\times", color=WARN, font_size=64)


def ray(p, q, color=RAY, sw=4, frac=0.55, tip=True):
    """A light ray: a line with a small arrowhead partway along it."""
    p, q = np.array(p, dtype=float), np.array(q, dtype=float)
    g = VGroup(Line(p, q, color=color, stroke_width=sw))
    d = q - p
    L = np.linalg.norm(d)
    if tip and L > 0.35:
        ang = np.arctan2(d[1], d[0])
        t = Triangle(color=color, fill_color=color, fill_opacity=1, stroke_width=0)
        t.scale(0.1).rotate(ang - PI / 2).move_to(p + frac * d)
        g.add(t)
    return g


def dashed(p, q, color=VIRT, sw=3):
    return DashedLine(p, q, color=color, stroke_width=sw, dash_length=0.12)


def extend(p, d, xmin=-6.7, xmax=6.7, ymin=-3.5, ymax=3.5):
    """Point where the ray from p along d leaves the frame box."""
    d = np.array(d, dtype=float)
    ts = []
    if d[0] > 1e-9:
        ts.append((xmax - p[0]) / d[0])
    if d[0] < -1e-9:
        ts.append((xmin - p[0]) / d[0])
    if d[1] > 1e-9:
        ts.append((ymax - p[1]) / d[1])
    if d[1] < -1e-9:
        ts.append((ymin - p[1]) / d[1])
    return p + min(ts) * d


def hatch(p, q, side, n=12, color=MIRROR):
    """Short diagonal hatch marks on the back of a mirror from p to q."""
    p, q = np.array(p, dtype=float), np.array(q, dtype=float)
    g = VGroup()
    for k in range(n + 1):
        a = p + (q - p) * k / n
        g.add(Line(a, a + 0.22 * side + 0.12 * (q - p) / np.linalg.norm(q - p), color=color, stroke_width=2))
    return g


def flat_mirror(p, q, side):
    return VGroup(Line(p, q, color=MIRROR, stroke_width=7), hatch(p, q, side))


def arc_between(center, a0, a1, r=0.6, color=INK):
    return Arc(radius=r, start_angle=a0 * DEGREES, angle=(a1 - a0) * DEGREES, arc_center=center,
               color=color, stroke_width=3)


def obj_arrow(x, y0, h, color=OBJ, sw=6):
    return Arrow(P(x, y0), P(x, y0 + h), buff=0, color=color, stroke_width=sw,
                 max_tip_length_to_length_ratio=0.25, max_stroke_width_to_length_ratio=12)


def eye(at, angle=0.0, color=INK):
    """A small eye glyph: almond outline + pupil, looking along +x rotated by angle (radians)."""
    g = VGroup(Ellipse(width=0.62, height=0.3, color=color, stroke_width=3),
               Dot(radius=0.08, color=color).shift(0.04 * RIGHT))
    return g.rotate(angle).move_to(at)


def snell(n1, n2, i_deg):
    s = n1 / n2 * np.sin(i_deg * DEGREES)
    if s >= 1:
        return None
    return np.degrees(np.arcsin(s))


class OmpCh0Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Optics and Modern Physics",
            "Chapter 0 · Reflection and Refraction",
            "Chapter zero. Reflection and refraction.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7, self.s8):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ scene 1: rays and plane mirrors
    def s1(self):
        wave = FunctionGraph(lambda x: 0.35 * np.sin(2 * PI * x / 0.9), x_range=[-5.5, 5.5, 0.01],
                             color=RAY, stroke_width=4).move_to(P(0, 1.3))
        wl = M(r"\lambda \approx 400\text{ to }700\ \text{nm}", 40).move_to(P(0, 2.6))
        beam = VGroup(*[ray(P(-5.5, 1.3 + dy), P(5.5, 1.3 + dy), RAY, sw=4, frac=0.5) for dy in (-0.35, 0, 0.35)])
        bl = T("rays: straight lines, when everything is much bigger than the wavelength", 26,
               color=MUTED).move_to(P(0, 0.2))
        fit(bl, 12.5)
        kit = VGroup(
            M(r"r = i", 46),
            M(r"n_1\sin i = n_2\sin r", 46),
            T("+ one sign convention", 30, color=PRIMARY),
        ).arrange(RIGHT, buff=0.8).move_to(P(0, -2.0))
        fit(kit, 12.5)
        kh = T("Two laws and one sign convention", 30, color=INK, weight="BOLD").move_to(P(0, -1.0))

        with self.voiceover("Light is a wave, but mirrors and lenses are millions of times bigger than its wavelength, so "
                            "light travels in straight lines, called rays. Two laws and one sign convention build this whole"
                            " chapter.") as vo:
            self.play(Create(wave), FadeIn(wl), run_time=1.5)
            self.wait(vo.duration * 0.15)
            self.play(ReplacementTransform(wave, beam), run_time=1.3)
            self.play(FadeIn(bl), run_time=0.6)
            self.wait(vo.duration * 0.15)
            self.play(FadeIn(kh), run_time=0.5)
            self.play(LaggedStart(*[FadeIn(k, shift=0.2 * UP) for k in kit], lag_ratio=0.4), run_time=1.5)

        # law of reflection
        O = P(-1.5, -1.6)
        th = 40
        mir = flat_mirror(P(-4.8, -1.6), P(1.8, -1.6), DOWN)
        nrm = dashed(P(-1.5, -1.6), P(-1.5, 2.2), MUTED)
        nl = T("normal", 24, color=MUTED).next_to(P(-1.5, 2.2), UP, buff=0.1)
        src = O + 3.6 * U(90 + th)
        dst = O + 3.6 * U(90 - th)
        r_in = ray(src, O)
        r_out = ray(O, dst, REFL)
        ai = arc_between(O, 90, 90 + th, 0.8)
        ar = arc_between(O, 90 - th, 90, 0.8)
        il = M("i", 36).move_to(O + 1.1 * U(90 + th / 2))
        rl = M("r", 36).move_to(O + 1.1 * U(90 - th / 2))
        law = M(r"r = i", 64, color=PRIMARY).move_to(P(4.4, 1.2))
        law_n = T("angles from the normal,\nnever from the surface", 26, color=MUTED).next_to(law, DOWN, buff=0.35)

        with self.voiceover("First, reflection. Where the ray meets the mirror, draw the normal, at right angles to the "
                            "surface. The angle of reflection equals the angle of incidence, both measured from the normal.") as vo:
            self.clear_scene(0.5)
            self.play(Create(mir), run_time=0.8)
            self.play(Create(r_in), run_time=0.8)
            self.play(Create(nrm), FadeIn(nl), run_time=0.8)
            self.play(Create(ai), FadeIn(il), run_time=0.6)
            self.wait(vo.duration * 0.15)
            self.play(Create(r_out), run_time=0.8)
            self.play(Create(ar), FadeIn(rl), run_time=0.6)
            self.play(Write(law), FadeIn(law_n), run_time=1.0)

        # plane-mirror image
        Ob = P(-3.0, 0.2)
        Ib = P(3.0, 0.2)
        pm = flat_mirror(P(0, -2.4), P(0, 2.8), RIGHT)
        od = Dot(Ob, color=OBJ, radius=0.09)
        olab = M("O", 36).next_to(od, DOWN, buff=0.15)
        hits = [P(0, 1.6), P(0, -1.1)]
        incs = VGroup(*[ray(Ob, h) for h in hits])
        refs = VGroup()
        exts = VGroup()
        for h in hits:
            d = h - Ib  # reflected rays point away from the image
            refs.add(ray(h, extend(h, d, xmin=-6.0, ymin=-3.3, ymax=3.3), REFL))
            exts.add(dashed(h, Ib))
        idot = Dot(Ib, color=IMG, radius=0.09)
        ilab = M("I", 36, color=IMG).next_to(idot, DOWN, buff=0.15)
        d1 = DoubleArrow(P(-3.0, -2.9), P(0, -2.9), buff=0, color=MUTED, stroke_width=3, tip_length=0.18)
        d2 = DoubleArrow(P(0, -2.9), P(3.0, -2.9), buff=0, color=MUTED, stroke_width=3, tip_length=0.18)
        x1 = M("x", 34, color=MUTED).next_to(d1, UP, buff=0.08)
        x2 = M("x", 34, color=MUTED).next_to(d2, UP, buff=0.08)
        nat = T("virtual, upright, same size", 28, color=IMG).move_to(P(3.4, 3.2))
        vu = M(r"v = -u", 40, color=IMG).move_to(P(3.4, 2.4))

        with self.voiceover("Put a point object in front of a flat mirror. The reflected rays spread apart. Trace them back, "
                            "and they seem to come from one point behind the mirror, as far behind as the object is in "
                            "front. The image is virtual, upright, and the same size.") as vo:
            self.clear_scene(0.5)
            self.play(Create(pm), FadeIn(od), FadeIn(olab), run_time=0.8)
            self.play(Create(incs), run_time=1.0)
            self.play(Create(refs), run_time=1.0)
            self.wait(vo.duration * 0.1)
            self.play(Create(exts), run_time=1.2)
            self.play(FadeIn(idot), FadeIn(ilab), run_time=0.5)
            self.wait(vo.duration * 0.1)
            self.play(GrowFromCenter(d1), GrowFromCenter(d2), FadeIn(x1), FadeIn(x2), run_time=0.8)
            self.play(FadeIn(nat), FadeIn(vu), run_time=0.7)

        # half-height mirror
        xp = -3.6
        top, eye_y, feet = 1.6, 1.25, -2.8
        head = Circle(radius=0.35, color=INK, stroke_width=4).move_to(P(xp, top - 0.35))
        body = VGroup(
            Line(P(xp, top - 0.7), P(xp, -1.0), color=INK, stroke_width=4),
            Line(P(xp, -1.0), P(xp - 0.35, feet), color=INK, stroke_width=4),
            Line(P(xp, -1.0), P(xp + 0.35, feet), color=INK, stroke_width=4),
            Line(P(xp - 0.5, 0.2), P(xp + 0.5, 0.2), color=INK, stroke_width=4),
        )
        E = P(xp + 0.18, eye_y)
        Tt = P(xp, top)
        F = P(xp + 0.35, feet)
        ed = Dot(E, color=SECONDARY, radius=0.07)
        wall = Line(P(0, -3.2), P(0, 3.0), color=GRID, stroke_width=4)
        m_top = (top + eye_y) / 2
        m_bot = (feet + eye_y) / 2
        rT = VGroup(ray(Tt, P(0, m_top), RAY, sw=3), ray(P(0, m_top), E, RAY, sw=3))
        rF = VGroup(ray(F, P(0, m_bot), RAY, sw=3), ray(P(0, m_bot), E, RAY, sw=3))
        seg = VGroup(Line(P(0, m_bot), P(0, m_top), color=MIRROR, stroke_width=9),
                     hatch(P(0, m_bot), P(0, m_top), RIGHT, n=10))
        br = BraceBetweenPoints(P(0.45, m_top), P(0.45, m_bot), direction=RIGHT, color=SECONDARY)
        brl = M(r"\tfrac{H}{2}", 44, color=SECONDARY).next_to(br, RIGHT, buff=0.15)
        e1 = M(r"\text{top edge} = \frac{H+e}{2}", 40)
        e2 = M(r"\text{bottom edge} = \frac{e}{2}", 40)
        e3 = M(r"\text{length} = \frac{H}{2}", 48, color=GREEN)
        VGroup(e1, e2, e3).arrange(DOWN, buff=0.4, aligned_edge=LEFT).move_to(P(4.3, 1.3))
        note = T("eye height and distance cancel", 26, color=MUTED).move_to(P(4.1, -1.6))

        with self.voiceover("To see your head, light reflects halfway between your head and your eye. To see your feet, "
                            "halfway between your feet and your eye. So a mirror half your height is enough, however far "
                            "back you stand.") as vo:
            self.clear_scene(0.5)
            self.play(Create(head), Create(body), FadeIn(ed), Create(wall), run_time=1.0)
            self.play(Create(rT), run_time=1.2)
            self.play(Create(rF), run_time=1.2)
            self.wait(vo.duration * 0.1)
            self.play(Create(seg), GrowFromCenter(br), FadeIn(brl), run_time=0.9)
            self.play(FadeIn(e1), FadeIn(e2), run_time=0.8)
            self.play(Write(e3), run_time=0.8)
            self.play(FadeIn(note), run_time=0.5)

    # ------------------------------------------------------------ scene 2: spherical mirrors, sign convention
    def s2(self):
        y0 = -0.3
        C = P(-1.5, y0)
        R = 4.5
        Pp = C + R * RIGHT
        Fp = C + (R / 2) * RIGHT
        mirror = Arc(radius=R, start_angle=-48 * DEGREES, angle=96 * DEGREES, arc_center=C,
                     color=MIRROR, stroke_width=7)
        back = VGroup(*[Line(C + R * U(a), C + (R + 0.22) * U(a + 2.5), color=MIRROR, stroke_width=2)
                        for a in np.linspace(-46, 46, 14)])
        axis = Line(P(-6.7, y0), P(6.4, y0), color=GRID, stroke_width=3)
        dots = VGroup(*[Dot(q, color=INK, radius=0.07) for q in (C, Fp, Pp)])
        labs = VGroup(M("C", 34).next_to(C, DOWN, buff=0.15), M("F", 34).next_to(Fp, DOWN, buff=0.15),
                      M("P", 34).next_to(Pp, DR, buff=0.1))

        def para(h, color=RAY, sw=3):
            a = np.arcsin(h / R)
            Mh = C + R * np.array([np.cos(a), np.sin(a), 0])
            n = (Mh - C) / R
            d = np.array([1.0, 0, 0])
            out = d - 2 * np.dot(d, n) * n
            # run the reflected ray past the axis by the same horizontal distance
            t_axis = -(Mh[1] - y0) / out[1]
            end = Mh + 1.5 * t_axis * out
            if end[0] < -6.6:
                end = extend(Mh, out, xmin=-6.6)
            return VGroup(ray(P(-6.6, y0 + h), Mh, color, sw=sw), ray(Mh, end, color, sw=sw)), Mh

        near = [para(h) for h in (0.55, 1.05, -0.8)]
        near_g = VGroup(*[g for g, _ in near])
        far_g, far_M = para(3.0, PURPLE)
        normal = dashed(C, near[1][1] + 0.6 * (near[1][1] - C) / R, MUTED)

        with self.voiceover("Now curve the mirror. A concave mirror is a piece of a sphere, with its middle at the pole P "
                            "and the sphere's centre at C. Rays parallel to the axis reflect and cross at the focus F.") as vo:
            self.play(Create(axis), Create(mirror), FadeIn(back), run_time=1.0)
            self.play(FadeIn(dots[2]), FadeIn(labs[2]), run_time=0.5)
            self.wait(vo.duration * 0.12)
            self.play(FadeIn(dots[0]), FadeIn(labs[0]), run_time=0.5)
            self.wait(vo.duration * 0.1)
            self.play(LaggedStart(*[Create(g) for g in near_g], lag_ratio=0.3), run_time=2.0)
            self.play(FadeIn(dots[1]), FadeIn(labs[1]), Flash(Fp, color=HL), run_time=0.8)

        fr = M(r"f = \frac{R}{2}", 56, color=PRIMARY).move_to(P(-4.6, -2.3))
        frn = T("paraxial rays only", 24, color=MUTED).next_to(fr, DOWN, buff=0.2)
        ab = T("spherical aberration", 24, color=PURPLE).move_to(P(1.6, 3.25))
        with self.voiceover("Each ray reflects about the radius, the normal. Rays close to the axis cross halfway to C, so f"
                            " equals R over two. Rays far from the axis cross nearer the mirror: spherical aberration. So f "
                            "equals R over two is for paraxial rays only.") as vo:
            self.play(Create(normal), run_time=0.8)
            self.wait(vo.duration * 0.2)
            self.play(Write(fr), run_time=1.0)
            self.wait(vo.duration * 0.05)
            self.play(Create(far_g), run_time=1.5)
            self.play(FadeIn(ab), FadeIn(frn), run_time=0.7)

        # sign convention
        ax2 = Line(P(-6.4, -0.6), P(6.4, -0.6), color=INK, stroke_width=3)
        po = Dot(P(0, -0.6), color=INK, radius=0.08)
        pol = M(r"P", 34).next_to(po, DL, buff=0.1)
        bar = flat_mirror(P(0, -2.6), P(0, 1.4), RIGHT)
        light = vec(P(-5.6, 2.4), P(-2.6, 2.4), RAY, sw=6)
        ll = T("incident light", 26, color=RAY).next_to(light, UP, buff=0.12)
        neg = vec(P(-0.2, -1.3), P(-4.2, -1.3), WARN, sw=5)
        pos = vec(P(0.2, -1.3), P(4.2, -1.3), GREEN, sw=5)
        negl = M(r"-", 60, color=WARN).next_to(neg, DOWN, buff=0.1)
        posl = M(r"+", 54, color=GREEN).next_to(pos, DOWN, buff=0.1)
        ht = vec(P(0.6, -0.6), P(0.6, 1.2), GREEN, sw=5)
        htl = T("heights up: +", 24, color=GREEN).next_to(ht, RIGHT, buff=0.15)
        hdr = T("New Cartesian sign convention", 32, color=PRIMARY, weight="BOLD").move_to(P(2.6, 3.2))

        with self.voiceover("Now the signs. In the New Cartesian convention, light travels left to right and distances are "
                            "measured from the pole: along the light positive, against it negative, and heights up positive.") as vo:
            self.clear_scene(0.5)
            self.play(FadeIn(hdr), Create(ax2), Create(bar), run_time=0.9)
            self.play(GrowArrow(light), FadeIn(ll), run_time=0.8)
            self.wait(vo.duration * 0.15)
            self.play(FadeIn(po), FadeIn(pol), run_time=0.5)
            self.play(GrowArrow(pos), FadeIn(posl), run_time=0.7)
            self.play(GrowArrow(neg), FadeIn(negl), run_time=0.7)
            self.play(GrowArrow(ht), FadeIn(htl), run_time=0.7)

        rows = VGroup(
            M(r"\text{real object: } u < 0", 38),
            M(r"\text{concave (C, F in front): } f < 0", 38, color=SECONDARY),
            M(r"\text{convex (C, F behind): } f > 0", 38, color=PURPLE),
        ).arrange(DOWN, buff=0.3, aligned_edge=LEFT)
        fit(rows, 6.0)
        rows.move_to(P(-3.3, 0.6))
        with self.voiceover("So a real object always has u negative. A concave mirror has C and F in front, so f "
                            "is negative. A convex mirror has them behind, so f is positive.") as vo:
            self.play(FadeIn(rows[0]), Indicate(negl, color=WARN), run_time=0.9)
            self.wait(vo.duration * 0.12)
            self.play(FadeIn(rows[1]), run_time=0.7)
            self.wait(vo.duration * 0.12)
            self.play(FadeIn(rows[2]), run_time=0.7)

    # ------------------------------------------------------------ scene 3: mirror formula
    def s3(self):
        xP, y0, f, h = 3.5, 0.0, -1.5, 0.8
        Rv = 14.0
        Cc = P(xP - Rv, y0)  # visual curvature only: a gentle concave arc facing the object

        def mx(yy):
            return Cc[0] + np.sqrt(Rv ** 2 - (yy - y0) ** 2)

        mirror = Arc(radius=Rv, start_angle=-11 * DEGREES, angle=22 * DEGREES, arc_center=Cc,
                     color=MIRROR, stroke_width=7)
        back = VGroup(*[Line(Cc + Rv * U(a), Cc + (Rv + 0.22) * U(a) + 0.12 * UP, color=MIRROR, stroke_width=2)
                        for a in np.linspace(-10, 10, 13)])
        axis = Line(P(-6.7, y0), P(6.7, y0), color=GRID, stroke_width=3)
        Fp, Cp = P(xP + f, y0), P(xP + 2 * f, y0)
        marks = VGroup(Dot(Fp, radius=0.06, color=INK), Dot(Cp, radius=0.06, color=INK))
        mlabs = VGroup(M("F", 32).next_to(Fp, DOWN, buff=0.12), M("C", 32).next_to(Cp, DOWN, buff=0.12),
                       M("P", 32).next_to(P(xP, y0), DR, buff=0.08))
        u = ValueTracker(-4.0)

        def vm():
            uu = u.get_value()
            v = uu * f / (uu - f)
            return v, -v / uu

        def diagram():
            uu = u.get_value()
            v, m = vm()
            A = P(xP + uu, y0 + h)
            I = P(xP + v, y0 + m * h)
            Mh = P(mx(y0 + h), y0 + h)
            Pp = P(xP, y0)
            g = VGroup(obj_arrow(xP + uu, y0, h))
            g.add(ray(A, Mh, RAY, sw=3), ray(A, Pp, RAY, sw=3))
            if v < 0:  # real: reflected rays pass through the image tip
                for s in (Mh, Pp):
                    d = I - s
                    end = I + 0.35 * d / np.linalg.norm(d)
                    g.add(ray(s, end, REFL, sw=3))
            else:  # virtual: rays diverge, back-extensions meet behind
                for s in (Mh, Pp):
                    d = s - I
                    g.add(ray(s, extend(s, d, xmin=-6.6, ymin=-3.4, ymax=2.0), REFL, sw=3))
                    g.add(dashed(s, I))
            g.add(obj_arrow(xP + v, y0, m * h, IMG))
            return g

        dia = always_redraw(diagram)

        form = M(r"\frac1v + \frac1u = \frac1f", 50).move_to(P(-4.5, 2.6))
        mag = M(r"m = -\frac{v}{u}", 50).move_to(P(-1.2, 2.6))
        with self.voiceover("From the object's tip, one ray parallel to the axis reflects through F. Another, to the pole, "
                            "reflects symmetrically. Where they cross is the image.") as vo:
            self.play(Create(axis), Create(mirror), FadeIn(back), FadeIn(marks), FadeIn(mlabs), run_time=1.0)
            self.play(FadeIn(dia), run_time=1.5)
            self.wait(vo.duration * 0.3)
            v, m = vm()
            self.play(Flash(P(xP + v, y0 + m * h), color=HL), run_time=0.8)

        signs = VGroup(
            M(r"v<0:\ \text{real, in front}", 32, color=MUTED),
            M(r"m<0:\ \text{inverted}", 32, color=MUTED),
        ).arrange(DOWN, buff=0.15, aligned_edge=LEFT).move_to(P(-4.4, 1.25))
        with self.voiceover("Similar triangles in this picture give the mirror formula: one over v plus one over u equals "
                            "one over f, and the magnification m is minus v over u. Put every quantity in with its sign: "
                            "negative v means a real image in front, negative m means inverted.") as vo:
            self.wait(vo.duration * 0.12)
            self.play(Write(form), run_time=1.4)
            self.wait(vo.duration * 0.05)
            self.play(Write(mag), run_time=1.0)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(signs[0]), run_time=0.5)
            self.play(FadeIn(signs[1]), run_time=0.5)

        # live readouts
        lab_u = M(r"u =", 34).move_to(P(0.9, 3.3))
        lab_v = M(r"v =", 34).move_to(P(3.2, 3.3))
        lab_m = M(r"m =", 34).move_to(P(5.4, 3.3))
        unit = r"\ \text{cm}"
        ru = DecimalNumber(-40, num_decimal_places=0, unit=unit, unit_buff_per_font_unit=0.004,
                           font_size=34, color=INK)
        rv = DecimalNumber(0, num_decimal_places=0, unit=unit, unit_buff_per_font_unit=0.004,
                           font_size=34, color=IMG)
        rmv = DecimalNumber(0, num_decimal_places=1, font_size=34, color=IMG)
        ru.add_updater(lambda d: d.set_value(10 * u.get_value()).next_to(lab_u, RIGHT, buff=0.15))
        rv.add_updater(lambda d: d.set_value(10 * vm()[0]).next_to(lab_v, RIGHT, buff=0.15))
        rmv.add_updater(lambda d: d.set_value(vm()[1]).next_to(lab_m, RIGHT, buff=0.15))
        rd = VGroup(lab_u, lab_v, lab_m, ru, rv, rmv)
        for d_ in (ru, rv, rmv):
            d_.update()

        with self.voiceover("Slide the object in. Far away, the image is small and inverted, near F. At C, the "
                            "image meets the object, same size. Between C and F, it grows and races "
                            "outwards.") as vo:
            self.play(FadeOut(signs), FadeIn(rd), run_time=0.6)
            self.play(u.animate.set_value(-6.5), run_time=1.6)
            self.wait(vo.duration * 0.1)
            self.play(u.animate.set_value(-3.0), run_time=2.5)
            cl = T("at C: same size", 24, color=MUTED).move_to(P(xP - 3.0, -2.95))
            self.play(FadeIn(cl), run_time=0.4)
            self.wait(vo.duration * 0.08)
            self.play(FadeOut(cl), u.animate.set_value(-2.1), run_time=2.2)

        with self.voiceover("Cross F, and the image jumps behind the mirror: virtual, upright and magnified. That "
                            "is a shaving mirror. So a concave mirror does not always make a real image.") as vo:
            self.play(u.animate.set_value(-1.9), run_time=0.9)
            self.play(FadeOut(dia), run_time=0.3)
            u.set_value(-0.9)
            dia.update()
            self.play(FadeIn(dia), run_time=0.7)
            vl = T("virtual, upright,\nmagnified", 26, color=IMG).move_to(P(5.5, -1.1))
            self.play(FadeIn(vl), run_time=0.6)
            self.wait(vo.duration * 0.2)
            bad = T("\"a concave mirror always makes a real image\"", 24, color=WARN).move_to(P(-3.4, 1.5))
            fit(bad, 7.0)
            strike = Line(bad.get_left(), bad.get_right(), color=WARN, stroke_width=4)
            self.play(FadeIn(bad), run_time=0.5)
            self.play(Create(strike), run_time=0.5)
        for d in (ru, rv, rmv):
            d.clear_updaters()

        with self.voiceover("Try one. An object thirty centimetres from a concave mirror of radius forty: u is minus thirty,"
                            " f is minus twenty. So one over v is minus one sixtieth, v is minus sixty, and m is minus two: "
                            "real, inverted, twice as tall.") as vo:
            self.clear_scene(0.5)
            hdr = M(r"\frac1v + \frac1u = \frac1f", 50, color=PRIMARY).move_to(P(0, 2.8))
            w0 = M(r"u = -30\ \text{cm},\quad R = -40\ \text{cm} \Rightarrow f = -20\ \text{cm}", 42).move_to(P(0, 1.5))
            w1 = M(r"\frac1v = -\frac1{20} + \frac1{30} = -\frac1{60}", 46).next_to(w0, DOWN, buff=0.45)
            w2 = M(r"v = -60\ \text{cm},\qquad m = -\frac{v}{u} = -2", 46, color=GREEN).next_to(w1, DOWN, buff=0.45)
            w3 = T("real, inverted, twice as tall", 28, color=GREEN).next_to(w2, DOWN, buff=0.35)
            self.play(FadeIn(hdr), run_time=0.5)
            self.wait(vo.duration * 0.05)
            self.play(Write(w0), run_time=1.3)
            self.wait(vo.duration * 0.12)
            self.play(Write(w1), run_time=1.5)
            self.wait(vo.duration * 0.1)
            self.play(Write(w2), run_time=1.2)
            self.play(FadeIn(w3), run_time=0.6)

    # ------------------------------------------------------------ scene 4: refraction and Snell
    def s4(self):
        yI = -0.4
        O = P(-2.4, yI)
        L = 3.2
        top = Rectangle(width=13.6, height=4.1, stroke_width=0).set_fill(BG, 0).move_to(P(0, yI + 2.05))
        bot = Rectangle(width=13.6, height=3.6, stroke_width=0).set_fill(GLASS, 0.35).move_to(P(0, yI - 1.8))
        surf = Line(P(-6.8, yI), P(6.8, yI), color=SECONDARY, stroke_width=3)
        nrm = dashed(O + 2.9 * UP, O + 2.9 * DOWN, MUTED)
        n1l = M(r"n_1 = 1\ \text{(air)}", 32, color=MUTED).move_to(P(-5.3, yI + 0.4))
        n2v = ValueTracker(1.5)
        n2l = M(r"n_2 =", 32, color=MUTED).move_to(P(-5.6, yI - 0.45))
        n2d = DecimalNumber(1.5, num_decimal_places=2, font_size=32, color=MUTED)
        n2d.add_updater(lambda d: d.set_value(n2v.get_value()).next_to(n2l, RIGHT, buff=0.12))
        i_deg = 50

        def refr():
            r = snell(1.0, n2v.get_value(), i_deg)
            return VGroup(ray(O, O + L * U(-90 + r), REFR),
                          arc_between(O, -90, -90 + r, 0.75),
                          M("r", 34).move_to(O + 1.05 * U(-90 + r / 2)))

        inc = ray(O + L * U(90 + i_deg), O)
        ai = arc_between(O, 90, 90 + i_deg, 0.75)
        il = M("i", 34).move_to(O + 1.05 * U(90 + i_deg / 2))
        rgrp = always_redraw(refr)

        nidx = VGroup(
            M(r"n = \frac{c}{v}", 52, color=PRIMARY),
            M(r"\text{water} \approx \tfrac43,\ \ \text{glass} \approx 1.5,\ \ \text{diamond}\ 2.42", 32),
        ).arrange(DOWN, buff=0.3).move_to(P(3.3, 2.5))
        fit(nidx, 6.6)
        nidx.move_to(P(3.3, 2.45))

        with self.voiceover("Now let light cross into a new material. It slows down, and the refractive index n is c over v. "
                            "Water is about four thirds, glass about one point five, diamond two point four two.") as vo:
            self.play(FadeIn(bot), Create(surf), FadeIn(n1l), FadeIn(n2l), FadeIn(n2d), run_time=0.9)
            self.play(Create(nrm), Create(inc), Create(ai), FadeIn(il), run_time=1.0)
            self.play(FadeIn(rgrp), run_time=0.8)
            self.wait(vo.duration * 0.12)
            self.play(Write(nidx[0]), run_time=1.0)
            self.wait(vo.duration * 0.15)
            self.play(FadeIn(nidx[1]), run_time=0.8)

        sn = M(r"n_1\sin i = n_2\sin r", 52, color=PRIMARY).move_to(P(3.3, 2.5))
        tow = T("into denser: towards the normal", 26, color=REFR).move_to(P(3.3, 1.6))
        with self.voiceover("The slowdown bends the ray. Snell's law: n one sine i equals n two sine r, with both "
                            "angles from the normal. Raise the index of the lower medium and the ray bends harder "
                            "towards the normal.") as vo:
            self.play(FadeOut(nidx), run_time=0.4)
            self.play(Write(sn), run_time=1.3)
            self.wait(vo.duration * 0.2)
            self.play(n2v.animate.set_value(2.4), run_time=2.0)
            self.play(n2v.animate.set_value(1.5), run_time=1.2)
            self.play(FadeIn(tow), run_time=0.5)
        n2d.clear_updaters()

        # reversed: glass on top, air below
        with self.voiceover("Coming out of the denser medium, it bends away from the normal instead. Light does "
                            "not always bend towards the normal.") as vo:
            self.play(FadeOut(rgrp), FadeOut(inc), FadeOut(ai), FadeOut(il), FadeOut(n1l), FadeOut(n2l),
                      FadeOut(n2d), FadeOut(tow), run_time=0.5)
            self.play(bot.animate.set_fill(GLASS, 0), top.animate.set_fill(GLASS, 0.35), run_time=0.6)
            g1 = M(r"n_1 = 1.5\ \text{(glass)}", 32, color=MUTED).move_to(P(-5.0, yI + 0.4))
            g2 = M(r"n_2 = 1\ \text{(air)}", 32, color=MUTED).move_to(P(-5.3, yI - 0.45))
            i2 = 30
            r2 = snell(1.5, 1.0, i2)
            inc2 = ray(O + L * U(90 + i2), O)
            out2 = ray(O, O + L * U(-90 + r2), REFR)
            a1 = arc_between(O, 90, 90 + i2, 0.75)
            a2 = arc_between(O, -90, -90 + r2, 0.75)
            l1 = M("i", 34).move_to(O + 1.05 * U(90 + i2 / 2))
            l2 = M("r", 34).move_to(O + 1.05 * U(-90 + r2 / 2))
            away = T("into rarer: away from the normal", 26, color=REFR).move_to(P(3.3, 1.6))
            self.play(FadeIn(g1), FadeIn(g2), Create(inc2), Create(a1), FadeIn(l1), run_time=0.9)
            self.play(Create(out2), Create(a2), FadeIn(l2), run_time=0.9)
            self.play(FadeIn(away), run_time=0.5)

        with self.voiceover("For example, light meets glass of index root two at forty five degrees. Sine r is "
                            "one half, so r is thirty degrees.") as vo:
            ex = VGroup(
                M(r"1\cdot\sin45^\circ = \sqrt2\,\sin r", 40),
                M(r"\sin r = \tfrac12 \Rightarrow r = 30^\circ", 40, color=GREEN),
            ).arrange(DOWN, buff=0.3).move_to(P(3.4, -1.9))
            box = SurroundingRectangle(ex, buff=0.25, corner_radius=0.12, color=MUTED, stroke_width=2)
            box.set_fill(WHITE, 0.9)
            self.play(FadeIn(box), Write(ex[0]), run_time=1.2)
            self.wait(vo.duration * 0.15)
            self.play(Write(ex[1]), run_time=1.0)

        # frequency fixed, wavelength shrinks
        k1, k2 = 2 * PI / 1.6, 2 * PI / 1.2
        ph = ValueTracker(0)

        def wave():
            p = ph.get_value()
            a = FunctionGraph(lambda x: 0.55 * np.sin(k1 * x - p), x_range=[-6.4, 0, 0.01], color=RAY,
                              stroke_width=4)
            b = FunctionGraph(lambda x: 0.55 * np.sin(k2 * x - p), x_range=[0, 6.4, 0.01], color=RAY,
                              stroke_width=4)
            return VGroup(a, b).shift(0.3 * UP)

        with self.voiceover("The frequency is set by the source, so it never changes. The speed and the wavelength both "
                            "shrink by n: six hundred nanometres becomes four hundred and fifty in water, and the colour "
                            "stays the same.") as vo:
            self.clear_scene(0.5)
            water = Rectangle(width=6.8, height=3.2, stroke_width=0).set_fill(GLASS, 0.35).move_to(P(3.4, 0.3))
            bd = Line(P(0, -1.3), P(0, 1.9), color=SECONDARY, stroke_width=3)
            wv = always_redraw(wave)
            la = T("air", 28, color=MUTED).move_to(P(-3.2, 2.3))
            lw = T("water, n = 4/3", 28, color=MUTED).move_to(P(3.4, 2.3))
            self.play(FadeIn(water), Create(bd), FadeIn(la), FadeIn(lw), run_time=0.7)
            self.add(wv)
            self.play(ph.animate.set_value(6 * PI), run_time=min(4.0, vo.duration * 0.45), rate_func=linear)
            facts = VGroup(
                M(r"\nu\ \text{unchanged}", 40, color=GREEN),
                M(r"v \to \frac{v}{n},\qquad \lambda \to \frac{\lambda}{n}", 40),
                M(r"600\ \text{nm} \to 450\ \text{nm}", 40, color=IMG),
            ).arrange(RIGHT, buff=0.7).move_to(P(0, -2.4))
            fit(facts, 12.8)
            self.play(LaggedStart(*[FadeIn(f_, shift=0.15 * UP) for f_ in facts], lag_ratio=0.5),
                      ph.animate.set_value(10 * PI), run_time=3.0, rate_func=linear)
            self.play(ph.animate.set_value(13 * PI), run_time=2.0, rate_func=linear)
            wv.clear_updaters()

    # ------------------------------------------------------------ scene 5: apparent depth
    def s5(self):
        yS = 0.9
        xc = -3.2
        d = 3.2
        n = 4 / 3
        coin_p = P(xc, yS - d)
        water = Rectangle(width=8.0, height=d + 0.5, stroke_width=0).set_fill(GLASS, 0.35)
        water.move_to(P(-2.8, yS - (d + 0.5) / 2))
        surf = Line(P(-6.8, yS), P(1.2, yS), color=SECONDARY, stroke_width=3)
        coin = Ellipse(width=0.55, height=0.16, color=HL, fill_color=HL, fill_opacity=1).move_to(coin_p)
        r_ang = 15
        i_ang = np.degrees(np.arcsin(n * np.sin(r_ang * DEGREES)))
        A = P(xc + d * np.tan(r_ang * DEGREES), yS)
        up_end = A + 1.9 * U(90 - i_ang)
        d_app = (A[0] - xc) / np.tan(i_ang * DEGREES)
        Ip = P(xc, yS - d_app)
        r_v = VGroup(ray(coin_p, P(xc, yS), RAY, sw=3), ray(P(xc, yS), P(xc, yS + 2.2), RAY, sw=3))
        r_o = VGroup(ray(coin_p, A, RAY, sw=3), ray(A, up_end, REFR, sw=3))
        nrmA = dashed(A + 0.9 * DOWN, A + 1.2 * UP, MUTED, sw=2)
        ext = dashed(A, Ip)
        ghost = Ellipse(width=0.55, height=0.16, color=IMG, fill_color=IMG, fill_opacity=0.6).move_to(Ip)
        ey = eye(up_end + 0.3 * U(90 - i_ang), angle=-(90 + i_ang) * DEGREES)
        b1 = BraceBetweenPoints(P(xc - 1.3, yS), P(xc - 1.3, yS - d), direction=LEFT, color=MUTED)
        b1l = M(r"d = 20\ \text{cm}", 32, color=MUTED).next_to(b1, LEFT, buff=0.1)
        b2 = BraceBetweenPoints(P(xc - 0.35, yS), P(xc - 0.35, Ip[1]), direction=LEFT, color=IMG)
        b2l = M(r"d'", 32, color=IMG).next_to(b2, LEFT, buff=0.08)

        with self.voiceover("That is why a pool looks shallow. Light from a coin bends away from the normal as it leaves the"
                            " water, and your eye traces it straight back, to a point higher up.") as vo:
            self.play(FadeIn(water), Create(surf), FadeIn(coin), run_time=0.8)
            self.play(Create(r_v), run_time=0.8)
            self.play(Create(r_o[0]), Create(nrmA), run_time=0.8)
            self.play(Create(r_o[1]), FadeIn(ey), run_time=0.8)
            self.wait(vo.duration * 0.12)
            self.play(Create(ext), run_time=0.9)
            self.play(FadeIn(ghost), GrowFromCenter(b1), FadeIn(b1l), GrowFromCenter(b2), FadeIn(b2l), run_time=0.8)

        f1 = M(r"d' = \frac{d}{n}", 54, color=PRIMARY).move_to(P(4.1, 2.6))
        f1n = T("looking nearly straight down", 24, color=MUTED).next_to(f1, DOWN, buff=0.2)
        f2 = M(r"20 \div \tfrac43 = 15\ \text{cm}", 42, color=GREEN).next_to(f1n, DOWN, buff=0.35)
        with self.voiceover("Looking nearly straight down, the angles are small, and Snell's law gives the "
                            "apparent depth: d prime equals d over n. A coin under twenty centimetres of water "
                            "seems fifteen centimetres down.") as vo:
            self.wait(vo.duration * 0.2)
            self.play(Write(f1), FadeIn(f1n), run_time=1.3)
            self.wait(vo.duration * 0.15)
            self.play(Write(f2), run_time=1.2)

        g1 = M(r"d' = d\,\frac{n_{\text{observer}}}{n_{\text{object}}}", 44).move_to(P(4.1, -0.1))
        g2 = M(r"\tfrac{3}{1.5} + \tfrac{4}{4/3} = 2 + 3 = 5\ \text{cm}", 38).next_to(g1, DOWN, buff=0.35)
        g2n = T("glass on water: layers add", 24, color=MUTED).next_to(g2, DOWN, buff=0.15)
        fit(VGroup(g2, g2n), 5.4)
        with self.voiceover("In general, d prime is d times the observer's index over the object's, and layers add: three "
                            "centimetres of glass on four of water looks like two plus three, five.") as vo:
            self.play(Write(g1), run_time=1.3)
            self.wait(vo.duration * 0.2)
            self.play(Write(g2), FadeIn(g2n), run_time=1.4)

        with self.voiceover("Flip it round: a bird six metres above a pond looks eight metres up to a fish. Farther, not "
                            "nearer.") as vo:
            self.clear_scene(0.5)
            ys = -0.2
            pond = Rectangle(width=13.6, height=3.4, stroke_width=0).set_fill(GLASS, 0.35).move_to(P(0, ys - 1.7))
            sline = Line(P(-6.8, ys), P(6.8, ys), color=SECONDARY, stroke_width=3)
            fish = VGroup(Ellipse(width=0.8, height=0.36, color=SECONDARY, fill_color=SECONDARY, fill_opacity=1),
                          Triangle(color=SECONDARY, fill_color=SECONDARY, fill_opacity=1).scale(0.2)
                          .rotate(-PI / 2).shift(0.48 * LEFT)).move_to(P(-2.5, ys - 2.4))
            bird = VGroup(Arc(radius=0.35, start_angle=20 * DEGREES, angle=140 * DEGREES, color=INK, stroke_width=4),
                          Arc(radius=0.35, start_angle=20 * DEGREES, angle=140 * DEGREES, color=INK,
                              stroke_width=4).shift(0.6 * RIGHT)).move_to(P(-2.2, ys + 2.0))
            bghost = bird.copy().set_color(IMG).move_to(P(-2.2, ys + 2.0 * 4 / 3 + 0.15))
            bghost.move_to(P(-2.2, 3.3))
            real = T("real: 6 m above", 26, color=INK).next_to(bird, RIGHT, buff=0.4)
            seen = T("seen by the fish: 8 m above", 26, color=IMG).next_to(bghost, RIGHT, buff=0.4)
            rule = M(r"d' = d\,\frac{n_{\text{obs}}}{n_{\text{obj}}} = 6\times\tfrac43 = 8\ \text{m}", 40)
            rule.move_to(P(2.6, -1.6))
            self.play(FadeIn(pond), Create(sline), FadeIn(fish), FadeIn(bird), FadeIn(real), run_time=0.9)
            self.wait(vo.duration * 0.1)
            self.play(TransformFromCopy(bird, bghost), FadeIn(seen), run_time=1.2)
            self.play(Write(rule), run_time=1.4)

    # ------------------------------------------------------------ scene 6: total internal reflection
    def s6(self):
        yI = -0.6
        O = P(-2.2, yI)
        L = 3.0
        n1 = 1.5
        thc = np.degrees(np.arcsin(1 / n1))
        glass = Rectangle(width=13.6, height=4.3, stroke_width=0).set_fill(GLASS, 0.35).move_to(P(0, yI + 2.15))
        surf = Line(P(-6.8, yI), P(6.8, yI), color=MUTED, stroke_width=2)
        nrm = dashed(O + 3.3 * UP, O + 2.8 * DOWN, MUTED)
        gl = M(r"\text{glass},\ n_1 = 1.5", 32, color=MUTED).move_to(P(-5.1, yI + 0.4))
        al = M(r"\text{air},\ n_2 = 1", 32, color=MUTED).move_to(P(-5.4, yI - 0.45))
        it = ValueTracker(25.0)

        def scene_rays():
            i = it.get_value()
            g = VGroup(ray(O + L * U(90 + i), O, RAY), arc_between(O, 90, 90 + i, 0.7),
                       M("i", 32).move_to(O + 0.98 * U(90 + i / 2)))
            frac = min(1.0, (i / thc) ** 4)
            r = snell(n1, 1.0, i)
            refl = ray(O, O + L * U(90 - i), REFL)
            refl.set_opacity(0.25 + 0.75 * frac if r is not None else 1.0)
            g.add(refl)
            if r is not None:
                rr = ray(O, O + L * U(-90 + r), REFR)
                rr.set_opacity(max(0.4, 1 - frac))
                g.add(rr)
            return g

        sr = always_redraw(scene_rays)
        lab_i = M(r"i =", 38)
        lab_r = M(r"r =", 38)
        rd = VGroup(lab_i, lab_r).arrange(DOWN, buff=0.3, aligned_edge=LEFT).move_to(P(2.6, 2.6))
        di = DecimalNumber(25, num_decimal_places=1, unit=r"^\circ", font_size=38, color=INK)
        dr = DecimalNumber(0, num_decimal_places=1, unit=r"^\circ", font_size=38, color=REFR)
        di.add_updater(lambda d: d.set_value(it.get_value()).next_to(lab_i, RIGHT, buff=0.15))

        def upd_r(d):
            r = snell(n1, 1.0, it.get_value())
            if r is not None and it.get_value() > thc - 0.05:
                r = 90.0  # at the critical angle the refracted ray grazes: show exactly 90
            d.set_value(r if r is not None else 90.0).next_to(lab_r, RIGHT, buff=0.15)
            d.set_opacity(1 if r is not None else 0)

        dr.add_updater(upd_r)
        di.update()
        dr.update()
        none = T("no refracted ray", 26, color=WARN).next_to(lab_r, RIGHT, buff=0.2)

        with self.voiceover("Now send light from glass into air, and tilt it. The refracted ray swings towards the surface "
                            "and fades, while the reflected ray brightens.") as vo:
            self.play(FadeIn(glass), Create(surf), FadeIn(gl), FadeIn(al), Create(nrm), run_time=0.9)
            self.play(FadeIn(sr), FadeIn(rd), FadeIn(di), FadeIn(dr), run_time=0.8)
            self.wait(vo.duration * 0.1)
            self.play(it.animate.set_value(38), run_time=3.5)

        crit = M(r"n_1\sin\theta_c = n_2\sin 90^\circ", 40).move_to(P(4.0, 1.2))
        crit2 = M(r"\sin\theta_c = \frac{n_2}{n_1} \Rightarrow \theta_c = 41.8^\circ", 40,
                  color=PRIMARY).next_to(crit, DOWN, buff=0.35)
        fit(crit2, 5.4)
        with self.voiceover("At the critical angle, the refracted ray just skims the surface. Set r to ninety "
                            "degrees in Snell's law: sine theta c equals n two over n one. For glass in air, that "
                            "is forty one point eight degrees.") as vo:
            self.play(it.animate.set_value(thc - 0.02), run_time=2.0)
            self.wait(vo.duration * 0.1)
            self.play(Write(crit), run_time=1.2)
            self.play(Write(crit2), run_time=1.3)

        cond = VGroup(
            T("1. denser to rarer", 28),
            T("2. i greater than the critical angle", 28),
        ).arrange(DOWN, buff=0.2, aligned_edge=LEFT).move_to(P(3.9, -1.9))
        tir = T("total internal reflection", 30, color=PRIMARY, weight="BOLD").next_to(cond, UP, buff=0.3)
        tir.align_to(cond, LEFT)
        with self.voiceover("Tilt past it, and no light gets out. Everything reflects: total internal reflection. It needs "
                            "light going from denser to rarer, and incidence above the critical angle. Air into glass can "
                            "never do it.") as vo:
            self.play(it.animate.set_value(55), FadeIn(none), run_time=1.8)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(tir), run_time=0.6)
            self.play(FadeIn(cond[0]), run_time=0.5)
            self.play(FadeIn(cond[1]), run_time=0.5)
        di.clear_updaters()
        dr.clear_updaters()

        with self.voiceover("Diamond's critical angle is only twenty four degrees, so light bounces around inside "
                            "and sparkles. Optical fibres trap light the same way.") as vo:
            self.clear_scene(0.5)
            # fibre: a glass core with a zig-zag ray bouncing along it
            core = Rectangle(width=11.0, height=1.4, stroke_width=0).set_fill(GLASS, 0.45).move_to(P(0, -1.2))
            walls = VGroup(Line(P(-5.5, -0.5), P(5.5, -0.5), color=SECONDARY, stroke_width=3),
                           Line(P(-5.5, -1.9), P(5.5, -1.9), color=SECONDARY, stroke_width=3))
            pts = [P(-5.5, -1.2)]
            x, y, s = -5.5, -1.2, 1
            slope = 0.85
            while x < 5.5:
                ty = -0.5 if s > 0 else -1.9
                nx = x + abs(ty - y) / slope
                if nx > 5.5:
                    pts.append(P(5.5, y + s * slope * (5.5 - x)))
                    break
                pts.append(P(nx, ty))
                x, y, s = nx, ty, -s
            zig = VGroup(*[ray(pts[k], pts[k + 1], RAY, sw=3, frac=0.5) for k in range(len(pts) - 1)])
            ft = T("optical fibre: total internal reflection at every wall", 26, color=MUTED).move_to(P(0, -2.6))
            dia = M(r"\text{diamond: } \theta_c \approx 24.4^\circ", 46, color=PRIMARY).move_to(P(0, 2.4))
            dn = T("most light inside is trapped and bounces out through the top", 26,
                   color=MUTED).move_to(P(0, 1.55))
            self.play(Write(dia), run_time=1.0)
            self.play(FadeIn(dn), run_time=0.6)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(core), Create(walls), run_time=0.6)
            self.play(Create(zig), run_time=2.0, rate_func=linear)
            self.play(FadeIn(ft), run_time=0.5)

        with self.voiceover("A lamp four metres under water lights only a circle on the surface, of radius h tan theta c, "
                            "which is h over root of n squared minus one: about four point five metres.") as vo:
            self.clear_scene(0.5)
            ys = 1.0
            lamp = P(0, -2.2)
            h = ys - lamp[1]
            tc = np.degrees(np.arcsin(3 / 4))
            Rr = h * np.tan(tc * DEGREES)
            pool = Rectangle(width=13.6, height=ys + 3.7, stroke_width=0).set_fill(GLASS, 0.35)
            pool.move_to(P(0, (ys - 3.7) / 2))
            sline = Line(P(-6.8, ys), P(6.8, ys), color=SECONDARY, stroke_width=3)
            bulb = Dot(lamp, radius=0.13, color=HL)
            glow = Dot(lamp, radius=0.28, color=HL).set_opacity(0.3)
            rays_in = VGroup()
            rays_out = VGroup()
            for sgn in (-1, 1):
                for a in (22, 40):
                    hit = P(sgn * h * np.tan(a * DEGREES), ys)
                    rays_in.add(ray(lamp, hit, RAY, sw=3))
                    r = np.degrees(np.arcsin(4 / 3 * np.sin(a * DEGREES)))
                    rays_out.add(ray(hit, hit + 0.95 * U(90 - sgn * r), REFR, sw=3))
                edge = P(sgn * Rr, ys)
                rays_in.add(ray(lamp, edge, PURPLE, sw=3))
                rays_out.add(Line(edge, edge + sgn * 0.9 * RIGHT, color=REFR, stroke_width=3).set_opacity(0.5))
                hit = P(sgn * h * np.tan(60 * DEGREES), ys)
                rays_in.add(ray(lamp, hit, RAY, sw=3))
                rays_out.add(ray(hit, hit + 1.2 * U(-90 + sgn * 30), REFL, sw=3))
            disc = Line(P(-Rr, ys), P(Rr, ys), color=HL, stroke_width=12)
            hl_ = dashed(lamp, P(0, ys), MUTED)
            arcc = arc_between(lamp, 90, 90 + tc, 0.9)
            tcl = M(r"\theta_c", 30).move_to(lamp + 1.25 * U(90 + tc / 2))
            hlab = M("h", 34, color=MUTED).next_to(P(0, (ys + lamp[1]) / 2), RIGHT, buff=0.12)
            br = BraceBetweenPoints(P(0, ys + 1.05), P(Rr, ys + 1.05), direction=UP, color=HL)
            brl = M("R", 34, color=HL).next_to(br, RIGHT, buff=0.15)
            form = M(r"R = h\tan\theta_c = \frac{h}{\sqrt{n^2-1}} = \frac{4}{\sqrt7/3} \approx 4.54\ \text{m}", 34)
            fit(form, 12.5).move_to(P(0, 3.25))
            self.play(FadeIn(pool), Create(sline), FadeIn(glow), FadeIn(bulb), run_time=0.8)
            self.play(Create(rays_in), run_time=1.4)
            self.play(Create(rays_out), run_time=1.0)
            self.play(Create(disc), Create(hl_), FadeIn(hlab), Create(arcc), FadeIn(tcl), run_time=1.0)
            self.play(GrowFromCenter(br), FadeIn(brl), run_time=0.6)
            self.wait(vo.duration * 0.05)
            self.play(Write(form), run_time=1.6)

    # ------------------------------------------------------------ scene 7: curved surface
    def s7(self):
        y0 = 0.2
        xP = -2.0
        Rr = 1.0
        C = P(xP + Rr, y0)
        Op = P(xP - 4.0, y0)
        Ip = P(xP + 6.0, y0)
        arc_pts = [C + Rr * U(a) for a in np.linspace(90, 270, 40)]
        rod = Polygon(*arc_pts, P(6.8, y0 - Rr), P(6.8, y0 + Rr), stroke_width=0).set_fill(GLASS, 0.45)
        edge = VMobject(color=SECONDARY, stroke_width=3).set_points_smoothly(arc_pts)
        rails = VGroup(Line(P(xP + Rr, y0 + Rr), P(6.8, y0 + Rr), color=SECONDARY, stroke_width=3),
                       Line(P(xP + Rr, y0 - Rr), P(6.8, y0 - Rr), color=SECONDARY, stroke_width=3))
        axis = Line(P(-6.7, y0), P(6.7, y0), color=GRID, stroke_width=3)
        rays_ = VGroup()
        for hh in (0.42, 0.0, -0.42):
            Sx = C[0] - np.sqrt(Rr ** 2 - hh ** 2)
            S = P(Sx, y0 + hh)
            rays_.add(VGroup(ray(Op, S, RAY, sw=3), ray(S, Ip, REFR, sw=3)))
        Stop = P(C[0] - np.sqrt(Rr ** 2 - 0.42 ** 2), y0 + 0.42)
        nrm = dashed(C, Stop + 0.9 * (Stop - C), MUTED, sw=2)
        dots = VGroup(Dot(Op, radius=0.08, color=OBJ), Dot(Ip, radius=0.08, color=IMG), Dot(C, radius=0.06))
        labs = VGroup(M("O", 32).next_to(Op, DOWN, buff=0.15), M("I", 32, color=IMG).next_to(Ip, DOWN, buff=0.15),
                      M("C", 28).next_to(C, DOWN, buff=0.42), M("P", 28).move_to(P(xP - 0.35, y0 - 0.75)))
        nl = VGroup(M(r"n_1 = 1", 32, color=MUTED).move_to(P(-4.6, -1.3)),
                    M(r"n_2 = 1.5", 32, color=MUTED).move_to(P(3.2, -1.3)))
        form = M(r"\frac{n_2}{v} - \frac{n_1}{u} = \frac{n_2 - n_1}{R}", 54, color=PRIMARY).move_to(P(0, 2.7))
        ex = M(r"u = -40,\ R = +10 \ \Rightarrow\ v = +60\ \text{cm}", 36, color=MUTED).move_to(P(0, -2.4))
        leave = M(r"n_1 = \text{the medium the light leaves}", 32, color=MUTED).move_to(P(0, -3.2))

        with self.voiceover("Last, curve the boundary. Snell's law with small angles gives one formula for every curved "
                            "surface: n two over v, minus n one over u, equals n two minus n one, over R, where n one is the"
                            " medium the light is leaving.") as vo:
            self.play(Create(axis), FadeIn(rod), Create(edge), Create(rails), run_time=1.0)
            self.play(FadeIn(dots[0]), FadeIn(labs[0]), FadeIn(nl), run_time=0.6)
            self.play(Create(rays_), run_time=2.0)
            self.play(Create(nrm), FadeIn(dots[2]), FadeIn(labs[2]), FadeIn(labs[3]), run_time=0.8)
            self.play(FadeIn(dots[1]), FadeIn(labs[1]), run_time=0.5)
            self.wait(vo.duration * 0.05)
            self.play(Write(form), run_time=1.6)
            self.play(FadeIn(ex), run_time=0.6)
            self.play(FadeIn(leave), run_time=0.5)

        # fish bowl
        Cb = P(-3.6, -0.2)
        Rb = 2.4
        sc = Rb / 15  # units per cm
        Pw = Cb + Rb * RIGHT
        fx = Pw[0] - 10 * sc
        ix = Pw[0] - 9 * sc

        def fish(x, s, color, op=1.0):
            body = Ellipse(width=0.75 * s, height=0.36 * s, color=color, fill_color=color, fill_opacity=op)
            tail = Triangle(color=color, fill_color=color, fill_opacity=op).scale(0.2 * s).rotate(-PI / 2)
            tail.next_to(body, LEFT, buff=-0.05)
            return VGroup(body, tail).move_to(P(x, Cb[1]))

        bowl = Circle(radius=Rb, color=SECONDARY, stroke_width=3).set_fill(GLASS, 0.35).move_to(Cb)
        fsh = fish(fx, 1.0, SECONDARY)
        img = fish(ix, 1.2, IMG, 0.35)
        img.set_stroke(IMG, width=2)
        cdot = Dot(Cb, radius=0.06)
        clab = M("C", 28).next_to(cdot, DOWN, buff=0.1)
        pdot = Dot(Pw, radius=0.06)
        plab = M("P", 28).next_to(pdot, UR, buff=0.06)
        light = vec(P(-6.4, 2.75), P(-4.4, 2.75), RAY, sw=5)
        lt = T("light: water to air", 24, color=RAY).next_to(light, RIGHT, buff=0.15)
        Rbr = Line(Cb, Cb + Rb * U(-40), color=PURPLE, stroke_width=4)
        Rl = M(r"R = -15\ \text{cm}", 30, color=PURPLE).next_to(Rbr.get_center(), LEFT, buff=0.15)
        tipF = P(fx + 0.1, Cb[1] + 0.18)
        tipI = P(ix + 0.12, Cb[1] + 0.22)
        rays_b = VGroup()
        for hh in (0.7, -0.3):
            S = Cb + Rb * U(np.degrees(np.arcsin(hh / Rb)))
            rays_b.add(ray(tipF, S, RAY, sw=3))
            rays_b.add(ray(S, extend(S, S - tipI, xmax=0.9), REFR, sw=3))
            rays_b.add(dashed(S, tipI, VIRT, sw=2))
        ey = eye(P(1.3, Cb[1] + 0.3), angle=PI)
        work = VGroup(
            M(r"n_1 = \tfrac43,\ n_2 = 1,\ u = -10", 34),
            M(r"\frac1v = \frac{1}{45} - \frac{2}{15} = -\frac19", 38),
            M(r"v = -9\ \text{cm}", 40, color=IMG),
            M(r"m = \frac{n_1 v}{n_2 u} = 1.2", 40, color=GREEN),
        ).arrange(DOWN, buff=0.3, aligned_edge=LEFT)
        fit(work, 4.6)
        work.move_to(P(4.4, 0.0))

        with self.voiceover("The sign of R comes from where the centre lies, measured along the light. A fish sits ten "
                            "centimetres inside a bowl of radius fifteen. Light goes from water to air, and the centre is on "
                            "the incident side, so R is minus fifteen.") as vo:
            self.clear_scene(0.5)
            self.play(FadeIn(bowl), FadeIn(fsh), FadeIn(ey), run_time=0.9)
            self.play(GrowArrow(light), FadeIn(lt), run_time=0.7)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(pdot), FadeIn(plab), FadeIn(cdot), FadeIn(clab), run_time=0.5)
            self.wait(vo.duration * 0.1)
            self.play(Create(Rbr), FadeIn(Rl), run_time=0.9)
            self.play(FadeIn(work[0]), run_time=0.6)

        with self.voiceover("The formula gives v equal to minus nine centimetres and magnification one point two: the fish "
                            "looks slightly nearer and twenty percent fatter. Let R go to infinity, and you get apparent "
                            "depth back.") as vo:
            self.play(Write(work[1]), run_time=1.2)
            self.play(Write(work[2]), FadeOut(Rbr), FadeOut(Rl), run_time=0.8)
            self.play(Create(rays_b), FadeIn(img), run_time=1.4)
            self.play(Write(work[3]), run_time=1.0)
            self.wait(vo.duration * 0.05)
            inf = M(r"R\to\infty:\ \ \frac{n_2}{v} = \frac{n_1}{u}\ \ \text{(apparent depth)}", 34,
                    color=MUTED).move_to(P(0, -3.1))
            fit(inf, 12)
            self.play(FadeIn(inf), run_time=0.7)

    # ------------------------------------------------------------ scene 8: recap
    def s8(self):
        title = T("Chapter 0 in five lines", 38, color=PRIMARY, weight="BOLD").move_to(P(0, 3.2))
        lines = [
            (r"r = i,\quad v = -u", "plane mirror: virtual, upright, same size"),
            (r"\frac1v + \frac1u = \frac1f,\ \ m = -\frac vu", "every sign from the convention"),
            (r"n_1\sin i = n_2\sin r", "frequency fixed, wavelength shrinks"),
            (r"d' = \frac dn,\ \ \sin\theta_c = \frac{n_2}{n_1}", "apparent depth and TIR"),
            (r"\frac{n_2}{v} - \frac{n_1}{u} = \frac{n_2-n_1}{R}", "any curved surface"),
        ]
        rows = VGroup()
        for i, (tex, note) in enumerate(lines):
            m = M(tex, 36)
            n = T(note, 24, color=MUTED)
            num = T(f"{i + 1}.", 28, color=PRIMARY, weight="BOLD")
            rows.add(VGroup(num, m, n))
        for r in rows:
            r[0].move_to(P(-6.2, 0))
            r[1].next_to(r[0], RIGHT, buff=0.3)
            fit(r[1], 6.0)
            r[2].move_to(P(3.5, 0))
            fit(r[2], 5.6)
        rows.arrange(DOWN, buff=0.28, aligned_edge=LEFT).move_to(P(0, -0.1))
        for r in rows:
            r[0].set_x(-6.2)
            r[1].next_to(r[0], RIGHT, buff=0.3)
            r[2].move_to(P(3.7, r[1].get_y()))
        with self.voiceover("To recap. Rays obey r equals i, and a plane mirror image sits as far behind as the object is in "
                            "front. One over v plus one over u equals one over f, with every sign from the convention.") as vo:
            self.play(FadeIn(title), run_time=0.6)
            self.play(FadeIn(rows[0], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.3)
            self.play(FadeIn(rows[1], shift=0.15 * UP), run_time=0.7)
        with self.voiceover("Snell's law bends light at a boundary, with the frequency fixed. Apparent depth and the "
                            "critical angle both fall out of it. And one formula handles any curved "
                            "surface.") as vo:
            self.play(FadeIn(rows[2], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(rows[3], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(rows[4], shift=0.15 * UP), run_time=0.7)
        with self.voiceover("Try the mastery quiz. Then chapter one puts two curved surfaces together to make a lens, and "
                            "builds microscopes and telescopes.") as vo:
            nxt = T("Next: Chapter 1 · Lenses, Prisms and Optical Instruments", 30, color=PRIMARY).move_to(P(0, -3.4))
            fit(nxt, 12.5)
            self.wait(vo.duration * 0.3)
            self.play(FadeIn(nxt, shift=0.2 * UP), run_time=0.8)
