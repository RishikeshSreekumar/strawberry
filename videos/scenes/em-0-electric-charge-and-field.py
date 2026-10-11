import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

# Chapter colour roles (light background).
POS_C = PRIMARY  # positive charge = strawberry red
NEG_C = SECONDARY  # negative charge = teal
F_C = PURPLE  # forces
E_C = ACCENT  # electric field arrows
LINE_C = ManimColor("#6B4E48")  # field lines
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


def P(x, y):
    return np.array([x, y, 0.0])


def arrow(start, end, color, sw=6):
    return Arrow(start, end, buff=0, color=color, stroke_width=sw,
                 max_tip_length_to_length_ratio=0.22, max_stroke_width_to_length_ratio=12)


def check():
    return MathTex(r"\checkmark", color=GREEN, font_size=56)


def cross_mark():
    return MathTex(r"\times", color=WARN, font_size=64)


def charge(sign, pos, r=0.28):
    """A filled disc with a + or - drawn as strokes (no font dependency)."""
    col = POS_C if sign > 0 else NEG_C
    disc = Circle(radius=r, color=col, stroke_width=2).set_fill(col, 1).move_to(pos)
    bar = Line(LEFT * r * 0.55, RIGHT * r * 0.55, color=WHITE, stroke_width=5).move_to(pos)
    g = VGroup(disc, bar)
    if sign > 0:
        g.add(Line(DOWN * r * 0.55, UP * r * 0.55, color=WHITE, stroke_width=5).move_to(pos))
    return g


def efield(charges, p):
    e = np.zeros(3)
    for q, c in charges:
        d = p - c
        r = np.linalg.norm(d)
        if r > 1e-6:
            e += q * d / r ** 3
    return e


def trace(charges, start, sign=1, step=0.03, nmax=900, box=(-6.9, 6.9, -3.0, 2.7), stop_r=0.22):
    pts = [start.copy()]
    p = start.copy()
    for _ in range(nmax):
        e1 = efield(charges, p)
        n1 = np.linalg.norm(e1)
        if n1 < 1e-4:
            break
        mid = p + sign * 0.5 * step * e1 / n1
        e2 = efield(charges, mid)
        n2 = np.linalg.norm(e2)
        if n2 < 1e-4:
            break
        p = p + sign * step * e2 / n2
        pts.append(p.copy())
        if not (box[0] < p[0] < box[1] and box[2] < p[1] < box[3]):
            break
        if any(np.linalg.norm(p - c) < stop_r for q, c in charges if q * sign < 0):
            break
    return pts


def arrowhead(pts, at, color, size=0.13):
    """A small filled triangle on a polyline, at arc length `at`, pointing along it."""
    s = 0.0
    i = 1
    while i < len(pts) - 1 and s < at:
        s += np.linalg.norm(pts[i] - pts[i - 1])
        i += 1
    i = min(max(i, 1), len(pts) - 2)
    d = pts[i + 1] - pts[i - 1]
    ang = np.arctan2(d[1], d[0])
    tri = Triangle(color=color, stroke_width=0).set_fill(color, 1).scale(size)
    tri.rotate(ang - PI / 2).move_to(pts[i])
    return tri


def field_lines(charges, per_unit=4, box=(-6.9, 6.9, -3.0, 2.7), color=LINE_C, sw=2.2, start_r=0.3, nmax=900):
    lines = VGroup()
    sources = [(q, c) for q, c in charges if q > 0]
    sign = 1
    if not sources:
        sources = [(-q, c) for q, c in charges if q < 0]
        sign = -1
    for q, c in sources:
        n = int(round(per_unit * abs(q)))
        for k in range(n):
            a = 2 * PI * (k + 0.5) / n
            st = c + start_r * np.array([np.cos(a), np.sin(a), 0])
            pts = trace(charges, st, sign=sign, box=box, nmax=nmax)
            if len(pts) < 4:
                continue
            ln = VMobject(stroke_color=color, stroke_width=sw).set_points_as_corners(pts)
            length = sum(np.linalg.norm(pts[j] - pts[j - 1]) for j in range(1, len(pts)))
            head_pts = pts if sign > 0 else pts[::-1]
            at = min(1.4, 0.5 * length) if sign > 0 else max(length - min(1.4, 0.5 * length), 0)
            lines.add(VGroup(ln, arrowhead(head_pts, at, color)))
    return lines


class EmCh0Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Electricity & Magnetism",
            "Chapter 0 · Electric Charge and Field",
            "Chapter zero. Electric charge and field.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ scene 1: charge
    def s1(self):
        wall = Rectangle(width=1.4, height=6.2, color=MUTED, stroke_width=2)
        wall.set_fill(ManimColor("#EADBD0"), 1).move_to(P(4.4, -0.75))
        wall_l = T("neutral wall", 24, color=MUTED).next_to(wall, LEFT, buff=0.25).shift(2.9 * DOWN)
        balloon = Ellipse(width=1.8, height=2.2, color=POS_C, stroke_width=3)
        balloon.set_fill(ManimColor("#F6C6CB"), 1)
        knot = Triangle(color=POS_C).set_fill(POS_C, 1).scale(0.12).rotate(PI)
        knot.next_to(balloon, DOWN, buff=0)
        string = Line(knot.get_bottom(), knot.get_bottom() + 1.3 * DOWN, color=MUTED, stroke_width=2)
        minus = VGroup(*[Line(LEFT * 0.12, RIGHT * 0.12, color=NEG_C, stroke_width=5).move_to(balloon.get_center() + P(dx, dy))
                         for dx, dy in [(-0.4, 0.4), (0.3, 0.5), (0.0, 0.0), (-0.35, -0.4), (0.4, -0.3)]])
        bal = VGroup(balloon, knot, string, minus).move_to(P(-4.5, 0.2))
        q = T("Why does a charged balloon stick to a neutral wall?", 32, color=PRIMARY, weight="BOLD")
        fit(q, 12.5).move_to(P(0, 3.35))

        with self.voiceover("Rub a balloon on your hair and press it against a wall. It stays there. The balloon "
                            "is charged, but nobody rubbed the wall. So why does a charged object stick to a "
                            "neutral one?") as vo:
            self.play(FadeIn(wall), FadeIn(wall_l), FadeIn(bal), run_time=1.0)
            self.play(bal.animate.move_to(P(4.4 - 0.7 - 0.95, 0.2)), run_time=1.6)
            self.wait(vo.duration * 0.25)
            self.play(FadeIn(q, shift=0.2 * DOWN), run_time=0.8)

        with self.voiceover("Rubbing does not create charge. It moves a few electrons from one surface to the "
                            "other. The balloon gains electrons and turns negative. Your hair is left positive, "
                            "by exactly the same amount.") as vo:
            self.clear_scene(0.5)
            hair = RoundedRectangle(width=3.0, height=1.6, corner_radius=0.3, color=MUTED, stroke_width=3)
            hair.set_fill(ManimColor("#EADBD0"), 1).move_to(P(-3.6, 0.3))
            bl = Ellipse(width=2.4, height=1.8, color=POS_C, stroke_width=3).set_fill(ManimColor("#F6C6CB"), 1)
            bl.move_to(P(3.6, 0.3))
            hl = T("hair", 28).next_to(hair, DOWN, buff=0.3)
            bll = T("balloon", 28).next_to(bl, DOWN, buff=0.3)
            self.play(FadeIn(hair), FadeIn(bl), FadeIn(hl), FadeIn(bll), run_time=0.8)
            dots = VGroup(*[Dot(hair.get_center() + P(-0.9 + 0.45 * i, 0.3 * (-1) ** i), radius=0.09, color=NEG_C)
                            for i in range(5)])
            self.play(FadeIn(dots), run_time=0.5)
            targets = [bl.get_center() + P(-0.7 + 0.35 * i, 0.3 * (-1) ** i) for i in range(5)]
            self.play(*[d.animate.move_to(t) for d, t in zip(dots, targets)], run_time=1.8)
            hs = M(r"+5e", 44, color=POS_C).next_to(hair, UP, buff=0.3)
            bs = M(r"-5e", 44, color=NEG_C).next_to(bl, UP, buff=0.3)
            tot = M(r"\text{total: } (+5e) + (-5e) = 0", 40, color=MUTED).move_to(P(0, -2.6))
            self.play(FadeIn(hs), FadeIn(bs), run_time=0.7)
            self.play(Write(tot), run_time=1.0)

        with self.voiceover("Every charge is a whole number of electron charges, e, which is one point six times "
                            "ten to the minus nineteen coulombs. Charge is quantised, conserved, and it adds with "
                            "its sign. So a charge of two point four times ten to the minus nineteen coulombs is "
                            "impossible. That would be one and a half electrons.") as vo:
            self.clear_scene(0.5)
            e = M(r"e = 1.6\times10^{-19}\ \text{C}", 50).move_to(P(0, 2.9))
            self.play(Write(e), run_time=1.0)
            cards = VGroup()
            for head, body in [("Quantised", r"q = ne"), ("Conserved", r"\textstyle\sum q = \text{const}"),
                               ("Additive", r"+3 + (-5) = -2")]:
                h = T(head, 30, color=PRIMARY, weight="BOLD")
                b = M(body, 36)
                g = VGroup(h, b).arrange(DOWN, buff=0.3)
                box = SurroundingRectangle(g, buff=0.3, corner_radius=0.15, color=MUTED, stroke_width=2)
                box.stretch_to_fit_width(3.6).move_to(g)
                cards.add(VGroup(box, g))
            cards.arrange(RIGHT, buff=0.5).move_to(P(0, 0.9))
            for c in cards:
                self.play(FadeIn(c, shift=0.15 * UP), run_time=0.6)
            self.wait(vo.duration * 0.15)
            bad = M(r"\frac{2.4\times10^{-19}}{1.6\times10^{-19}} = 1.5", 46).move_to(P(-0.6, -2.2))
            xm = cross_mark().next_to(bad, RIGHT, buff=0.4)
            note = T("not a whole number", 26, color=WARN).next_to(xm, RIGHT, buff=0.25)
            self.play(Write(bad), run_time=1.2)
            self.play(FadeIn(xm), FadeIn(note), run_time=0.6)

        with self.voiceover("Back to the wall. A neutral wall is not empty of charge. It holds equal amounts of "
                            "both kinds. The balloon pulls the positive side of each molecule a little nearer, and "
                            "pushes the negative side a little farther away.") as vo:
            self.clear_scene(0.5)
            wall2 = Rectangle(width=6.0, height=6.4, color=MUTED, stroke_width=2)
            wall2.set_fill(ManimColor("#F3E7DE"), 1).move_to(P(3.0, -0.3))
            bal2 = Ellipse(width=1.8, height=2.4, color=POS_C, stroke_width=3).set_fill(ManimColor("#F6C6CB"), 1)
            bal2.move_to(P(-1.2, -0.3))
            bm = VGroup(*[Line(LEFT * 0.12, RIGHT * 0.12, color=NEG_C, stroke_width=5).move_to(bal2.get_center() + P(dx, dy))
                          for dx, dy in [(-0.3, 0.6), (0.3, 0.3), (0.0, -0.1), (-0.3, -0.6), (0.35, -0.5)]])
            mols = VGroup()
            plus_parts = []
            minus_parts = []
            for i in range(4):
                for j in range(4):
                    c = P(1.0 + 1.35 * i, 1.8 - 1.4 * j)
                    shell = Ellipse(width=1.0, height=0.6, color=MUTED, stroke_width=2).move_to(c)
                    pl = VGroup(Line(LEFT * 0.09, RIGHT * 0.09, color=POS_C, stroke_width=4),
                                Line(DOWN * 0.09, UP * 0.09, color=POS_C, stroke_width=4)).move_to(c + 0.08 * LEFT)
                    mi = Line(LEFT * 0.09, RIGHT * 0.09, color=NEG_C, stroke_width=4).move_to(c + 0.08 * RIGHT)
                    plus_parts.append(pl)
                    minus_parts.append(mi)
                    mols.add(VGroup(shell, pl, mi))
            self.play(FadeIn(wall2), FadeIn(mols), run_time=0.8)
            self.play(FadeIn(bal2), FadeIn(bm), run_time=0.6)
            self.wait(vo.duration * 0.25)
            self.play(*[p.animate.shift(0.22 * LEFT) for p in plus_parts],
                      *[m.animate.shift(0.22 * RIGHT) for m in minus_parts], run_time=1.6)

        with self.voiceover("The near side is attracted more strongly than the far side is repelled, because "
                            "electric forces weaken with distance. So the net force is an attraction. That is "
                            "polarisation, and it is why a charged body attracts any neutral one.") as vo:
            mol = mols[5]
            box = SurroundingRectangle(mol, buff=0.12, color=HL, stroke_width=3)
            others = VGroup(*[m for k, m in enumerate(mols) if k != 5])
            self.play(Create(box), others.animate.set_opacity(0.2), run_time=0.6)
            pull = arrow(plus_parts[5].get_center() + 0.05 * LEFT, plus_parts[5].get_center() + 1.25 * LEFT, F_C)
            push = arrow(minus_parts[5].get_center() + 0.05 * RIGHT, minus_parts[5].get_center() + 0.7 * RIGHT, F_C, sw=5)
            pull.shift(0.55 * DOWN)
            push.shift(0.55 * DOWN)
            pl_t = T("pull: strong", 22, color=F_C).next_to(pull, DOWN, buff=0.1)
            pu_t = T("push: weaker", 22, color=F_C).next_to(push, DOWN, buff=0.1).shift(0.3 * RIGHT)
            self.play(GrowArrow(pull), FadeIn(pl_t), run_time=0.8)
            self.play(GrowArrow(push), FadeIn(pu_t), run_time=0.8)
            self.wait(vo.duration * 0.15)
            res = T("net force: attraction  (polarisation)", 30, color=PRIMARY, weight="BOLD").move_to(P(0, 3.4))
            fit(res, 12.5)
            self.play(FadeIn(res, shift=0.2 * DOWN), run_time=0.8)

    # ------------------------------------------------------------ scene 2: Coulomb's law
    def s2(self):
        y0 = -0.9
        d = ValueTracker(3.0)

        def c1():
            return P(-d.get_value() / 2, y0)

        def c2():
            return P(d.get_value() / 2, y0)

        def flen():
            return min(1.0 * (3.0 / d.get_value()) ** 2, 4.2)

        sgn = {"s": 1}
        q1 = always_redraw(lambda: charge(1, c1()))
        q2 = always_redraw(lambda: charge(sgn["s"], c2()))

        def f1():
            L = flen()
            dirn = LEFT if sgn["s"] > 0 else RIGHT
            st = c1() + 0.32 * dirn
            return arrow(st, st + L * dirn, F_C)

        def f2():
            L = flen()
            dirn = RIGHT if sgn["s"] > 0 else LEFT
            st = c2() + 0.32 * dirn
            return arrow(st, st + L * dirn, F_C)

        a1 = always_redraw(f1)
        a2 = always_redraw(f2)
        rline = always_redraw(lambda: DoubleArrow(c1() + 0.75 * DOWN, c2() + 0.75 * DOWN, buff=0.3, color=MUTED,
                                                  stroke_width=3, tip_length=0.18))
        rlab = always_redraw(lambda: M("r", 36, color=MUTED).move_to(P(0, y0 - 1.15)))
        law = M(r"F = \frac{k\,|q_1 q_2|}{r^2}", 64).move_to(P(-2.6, 2.4))
        kk = M(r"k = \frac{1}{4\pi\varepsilon_0} = 9\times10^{9}\ \text{N m}^2\,\text{C}^{-2}", 36, color=MUTED)
        kk.move_to(P(3.2, 2.4))

        with self.voiceover("Now measure the push. Two point charges act on each other along the line joining "
                            "them. The size of the force is k, times the product of the charges, over r squared. "
                            "And k is nine times ten to the nine.") as vo:
            self.play(FadeIn(q1), FadeIn(q2), run_time=0.7)
            self.play(FadeIn(a1), FadeIn(a2), FadeIn(rline), FadeIn(rlab), run_time=0.8)
            self.wait(vo.duration * 0.15)
            self.play(Write(law), run_time=1.4)
            self.play(FadeIn(kk), run_time=0.8)

        ratio_l = M(r"F / F_0 =", 40).move_to(P(-1.0, -3.3))
        ratio = DecimalNumber(1.0, num_decimal_places=2, font_size=40, color=F_C)
        ratio.add_updater(lambda m: m.set_value((3.0 / d.get_value()) ** 2).next_to(ratio_l, RIGHT, buff=0.15))
        with self.voiceover("Distance matters most. Pull them twice as far apart and the force drops to a "
                            "quarter. Halve the distance, and it grows four times.") as vo:
            self.play(FadeIn(ratio_l), FadeIn(ratio), run_time=0.5)
            self.play(d.animate.set_value(6.0), run_time=2.2)
            self.wait(vo.duration * 0.15)
            self.play(d.animate.set_value(1.5), run_time=2.2)
        ratio.clear_updaters()

        with self.voiceover("Flip one sign and the push becomes a pull. And whatever the charges, the two forces "
                            "are equal and opposite. A big charge does not push harder on a small one.") as vo:
            self.play(FadeOut(ratio_l), FadeOut(ratio), d.animate.set_value(4.4), run_time=1.0)
            sgn["s"] = -1
            self.wait(0.6)
            l1 = M(r"+2\ \mu\text{C}", 34, color=POS_C).move_to(c1() + 0.8 * UP)
            l2 = M(r"-8\ \mu\text{C}", 34, color=NEG_C).move_to(c2() + 0.8 * UP)
            self.play(FadeIn(l1), FadeIn(l2), run_time=0.6)
            eq = T("equal and opposite", 30, color=GREEN).move_to(P(0, -3.3))
            self.wait(vo.duration * 0.15)
            self.play(FadeIn(eq, shift=0.2 * UP), run_time=0.7)

        with self.voiceover("Put the pair in a medium, such as water, and the force is divided by its dielectric "
                            "constant, K.") as vo:
            med = M(r"F_{\text{medium}} = \frac{F}{K}", 44, color=SECONDARY).move_to(P(3.2, 1.2))
            self.play(Write(med), run_time=1.0)
        for m in (q1, q2, a1, a2, rline, rlab):
            m.clear_updaters()

    # ------------------------------------------------------------ scene 3: superposition
    def s3(self):
        O = P(-2.8, -2.4)
        s = 1.35
        A = O
        B = O + s * P(3, 0)
        C = O + s * P(0, 3)
        qa = charge(1, A)
        qb = charge(1, B, r=0.34)
        qc = charge(-1, C, r=0.34)
        la = M(r"+1", 32, color=POS_C).next_to(qa, DL, buff=0.08)
        lb = M(r"+2", 32, color=POS_C).next_to(qb, DOWN, buff=0.15)
        lc = M(r"-2", 32, color=NEG_C).next_to(qc, LEFT, buff=0.15)
        L = 1.7
        fb = DashedVMobject(arrow(A, A + L * LEFT, F_C, sw=5), num_dashes=8)
        fc = DashedVMobject(arrow(A, A + L * UP, F_C, sw=5), num_dashes=8)
        fbl = M(r"\vec F_{\!B}", 32, color=F_C).next_to(A + L * LEFT, DOWN, buff=0.15)
        fcl = M(r"\vec F_{\!C}", 32, color=F_C).next_to(A + L * UP, RIGHT, buff=0.15)
        net = arrow(A, A + L * (LEFT + UP), PRIMARY, sw=7)
        netl = M(r"\vec F_{\text{net}}", 34, color=PRIMARY).next_to(A + L * (LEFT + UP), UL, buff=0.05)
        guide = VGroup(DashedLine(A + L * LEFT, A + L * (LEFT + UP), color=GRID, stroke_width=3),
                       DashedLine(A + L * UP, A + L * (LEFT + UP), color=GRID, stroke_width=3))
        rhs = VGroup(
            M(r"\vec F_{\text{net}} = \vec F_{\!B} + \vec F_{\!C}", 44),
            M(r"|\vec F_{\text{net}}| = \sqrt2\,F", 44, color=GREEN),
            M(r"\text{not } F + F = 2F", 40, color=WARN),
        ).arrange(DOWN, buff=0.45, aligned_edge=LEFT).move_to(P(3.6, 1.0))

        with self.voiceover("With three or more charges, each pair acts as if the others were not there. The "
                            "net force on a charge is the vector sum of the separate forces, not the sum of "
                            "their sizes.") as vo:
            self.play(FadeIn(qa), FadeIn(qb), FadeIn(qc), FadeIn(la), FadeIn(lb), FadeIn(lc), run_time=0.8)
            self.play(Create(fb), FadeIn(fbl), run_time=0.7)
            self.play(Create(fc), FadeIn(fcl), run_time=0.7)
            self.play(Create(guide), run_time=0.4)
            self.play(GrowArrow(net), FadeIn(netl), run_time=0.8)
            for r in rhs:
                self.play(FadeIn(r, shift=0.15 * UP), run_time=0.6)

        with self.voiceover("Where can a third charge rest, between plus four q and plus q, three metres apart? "
                            "Its two pushes must balance. Since force falls as one over r squared, it must sit "
                            "twice as far from the charge that is four times bigger: two metres from plus four q, "
                            "and one metre from plus q.") as vo:
            self.clear_scene(0.5)
            xa, xb = -4.5, 4.5
            y = -0.4
            axis = Line(P(-6.2, y), P(6.2, y), color=GRID, stroke_width=3)
            c4 = charge(1, P(xa, y), r=0.4)
            c1_ = charge(1, P(xb, y), r=0.24)
            l4 = M(r"+4q", 36, color=POS_C).next_to(c4, UP, buff=0.2)
            l1 = M(r"+q", 36, color=POS_C).next_to(c1_, UP, buff=0.2)
            self.play(Create(axis), FadeIn(c4), FadeIn(c1_), FadeIn(l4), FadeIn(l1), run_time=0.8)
            br = BraceBetweenPoints(P(xa, y - 0.5), P(xb, y - 0.5), direction=DOWN, color=MUTED)
            brl = T("3 m", 26, color=MUTED).next_to(br, DOWN, buff=0.1)
            self.play(FadeIn(br), FadeIn(brl), run_time=0.6)
            eq = M(r"\frac{k(4q)q_3}{(3-x)^2} = \frac{k\,q\,q_3}{x^2} \;\Rightarrow\; 3 - x = 2x", 42)
            eq.move_to(P(0, 2.6))
            self.play(Write(eq), run_time=1.6)
            x3 = xb - 3.0
            q3 = Dot(P(x3, y), radius=0.16, color=HL)
            p1 = arrow(P(x3, y) + 0.2 * RIGHT, P(x3, y) + 1.1 * RIGHT, F_C, sw=5)
            p2 = arrow(P(x3, y) + 0.2 * LEFT, P(x3, y) + 1.1 * LEFT, F_C, sw=5)
            self.play(FadeOut(br), FadeOut(brl), FadeIn(q3, scale=0.5), run_time=0.6)
            self.play(GrowArrow(p1), GrowArrow(p2), run_time=0.7)
            b1 = BraceBetweenPoints(P(xa, y - 0.5), P(x3, y - 0.5), direction=DOWN, color=MUTED)
            b2 = BraceBetweenPoints(P(x3, y - 0.5), P(xb, y - 0.5), direction=DOWN, color=MUTED)
            t1 = T("2 m", 26, color=MUTED).next_to(b1, DOWN, buff=0.1)
            t2 = T("1 m", 26, color=MUTED).next_to(b2, DOWN, buff=0.1)
            ans = M(r"x = 1\ \text{m from } {+q}", 44, color=GREEN).move_to(P(0, -2.9))
            self.play(FadeIn(b1), FadeIn(b2), FadeIn(t1), FadeIn(t2), run_time=0.7)
            self.play(Write(ans), run_time=0.9)

    # ------------------------------------------------------------ scene 4: the field and field lines
    def s4(self):
        src = P(-3.6, -0.4)
        q = charge(1, src, r=0.32)
        arrows = VGroup()
        for gx in np.arange(-6.6, -0.4, 0.9):
            for gy in np.arange(-3.3, 2.7, 0.9):
                p = P(gx, gy)
                dvec = p - src
                r = np.linalg.norm(dvec)
                if r < 0.75:
                    continue
                u = dvec / r
                L = min(0.62, 0.9 / r ** 2 + 0.12)
                op = min(1.0, 1.4 / r)
                a = arrow(p - u * L / 2, p + u * L / 2, E_C, sw=4)
                a.set_opacity(op)
                arrows.add(a)
        f1 = M(r"\vec E = \frac{\vec F}{q_0}", 56).move_to(P(3.6, 2.2))
        f2 = M(r"E = \frac{kq}{r^2}", 56).move_to(P(3.6, 0.6))
        f2n = T("away from +, towards -", 24, color=MUTED).next_to(f2, DOWN, buff=0.25)

        with self.voiceover("Now remove the second charge, but keep the question: what force would a charge feel "
                            "at each point? Force per unit charge is the electric field. E equals F over q nought. "
                            "For a point charge it is k q over r squared, pointing away from a positive "
                            "charge.") as vo:
            self.play(FadeIn(q), run_time=0.5)
            self.play(LaggedStart(*[GrowArrow(a) for a in arrows], lag_ratio=0.01), run_time=2.0)
            self.wait(vo.duration * 0.15)
            self.play(Write(f1), run_time=1.0)
            self.play(Write(f2), FadeIn(f2n), run_time=1.2)

        with self.voiceover("The field belongs to the source, not to the test charge. Place any charge q at that "
                            "point, and the force on it is q E. A negative charge feels a force against the "
                            "field.") as vo:
            pt = src + P(2.4, 1.6)
            u = (pt - src) / np.linalg.norm(pt - src)
            tq = charge(1, pt, r=0.2)
            fF = arrow(pt + 0.22 * u, pt + 1.3 * u, F_C, sw=6)
            f3 = M(r"\vec F = q\vec E", 56, color=F_C).move_to(P(3.6, -1.4))
            self.play(arrows.animate.set_opacity(0.25), run_time=0.5)
            self.play(FadeIn(tq), run_time=0.5)
            self.play(GrowArrow(fF), Write(f3), run_time=1.0)
            self.wait(vo.duration * 0.15)
            tq2 = charge(-1, pt, r=0.2)
            fF2 = arrow(pt - 0.22 * u, pt - 1.3 * u, F_C, sw=6)
            self.play(ReplacementTransform(tq, tq2), ReplacementTransform(fF, fF2), run_time=1.0)

        with self.voiceover("Field lines draw the same picture. They start on positive charges and end on negative "
                            "ones. The field points along them, they crowd together where it is strong, and they "
                            "never cross, because the field has only one direction at each point.") as vo:
            self.clear_scene(0.5)
            ch = [(2.0, P(-2.2, -0.2)), (-2.0, P(2.2, -0.2))]
            lines = field_lines(ch, per_unit=5)
            cp = charge(1, ch[0][1], r=0.3)
            cn = charge(-1, ch[1][1], r=0.3)
            self.play(FadeIn(cp), FadeIn(cn), run_time=0.5)
            self.play(LaggedStart(*[Create(l) for l in lines], lag_ratio=0.05), run_time=2.5)
            rules = VGroup(T("start on +, end on -", 24, color=INK), T("crowded = strong", 24, color=INK),
                           T("never cross", 24, color=INK)).arrange(RIGHT, buff=0.9).move_to(P(0, -3.5))
            for r in rules:
                self.play(FadeIn(r, shift=0.15 * UP), run_time=0.5)

        with self.voiceover("With two like charges, the lines swerve apart and leave a point between them where "
                            "the field is zero. For four microcoulombs and one microcoulomb, three metres apart, "
                            "that neutral point is two metres from the bigger charge, nearer the smaller "
                            "one.") as vo:
            self.clear_scene(0.5)
            A = P(-3.0, -0.3)
            B = P(3.0, -0.3)
            ch = [(4.0, A), (1.0, B)]
            lines = field_lines(ch, per_unit=4, start_r=0.4)
            ca = charge(1, A, r=0.38)
            cb = charge(1, B, r=0.24)
            la = M(r"+4\ \mu\text{C}", 32, color=POS_C).next_to(ca, DOWN, buff=0.2)
            lb = M(r"+1\ \mu\text{C}", 32, color=POS_C).next_to(cb, DOWN, buff=0.2)
            la.add_background_rectangle(color=BG, opacity=1, buff=0.06)
            lb.add_background_rectangle(color=BG, opacity=1, buff=0.06)
            self.play(FadeIn(ca), FadeIn(cb), run_time=0.5)
            self.play(LaggedStart(*[Create(l) for l in lines], lag_ratio=0.03), run_time=2.5)
            self.play(FadeIn(la), FadeIn(lb), run_time=0.4)
            npt = A + 4.0 * RIGHT
            nd = Dot(npt, radius=0.12, color=HL)
            nl = M(r"E = 0", 34, color=INK).next_to(nd, UP, buff=0.2)
            nl.add_background_rectangle(color=BG, opacity=0.9, buff=0.06)
            self.play(FadeIn(nd, scale=0.5), FadeIn(nl), run_time=0.7)
            eqn = M(r"\frac{k(4)}{x^2} = \frac{k(1)}{(3-x)^2} \;\Rightarrow\; x = 2\ \text{m}", 38, color=INK)
            eqn.move_to(P(0, -3.4))
            eqn.add_background_rectangle(color=BG, opacity=0.9, buff=0.1)
            self.play(FadeIn(eqn), run_time=0.8)

    # ------------------------------------------------------------ scene 5: dipole
    def s5(self):
        a = 0.6
        A = P(-a, 0.0)
        B = P(a, 0.0)
        ch = [(-1.0, A), (1.0, B)]
        cn = charge(-1, A, r=0.24)
        cp = charge(1, B, r=0.24)
        lines = VGroup()
        for k in range(10):
            ang = 2 * PI * (k + 0.5) / 10
            st = B + 0.26 * np.array([np.cos(ang), np.sin(ang), 0])
            pts = trace(ch, st, sign=1, box=(-16, 16, -10, 10), nmax=4000)
            if len(pts) < 4:
                continue
            L = sum(np.linalg.norm(pts[j] - pts[j - 1]) for j in range(1, len(pts)))
            closes = np.linalg.norm(pts[-1] - A) < 0.4
            at = 0.5 * L if closes else min(1.4, 0.5 * L)
            lines.add(VGroup(VMobject(stroke_color=LINE_C, stroke_width=2.2).set_points_as_corners(pts),
                             arrowhead(pts, at, LINE_C)))
            if not closes:  # mirror the escaping line onto the minus side, pointing inward
                mp = [np.array([-q[0], q[1], 0.0]) for q in pts][::-1]
                lines.add(VGroup(VMobject(stroke_color=LINE_C, stroke_width=2.2).set_points_as_corners(mp),
                                 arrowhead(mp, L - at, LINE_C)))
        for ln in lines:
            ln[0].set_stroke(opacity=0.35)
            ln[1].set_fill(opacity=0.35)
        pv = arrow(P(-a, -0.6), P(a, -0.6), INK, sw=5)
        pl = M(r"\vec p", 36).next_to(pv, DOWN, buff=0.08)
        pdef = M(r"\vec p = q\,(2a)", 44).move_to(P(-4.4, 3.2))
        pnote = T("from - to +", 24, color=MUTED).next_to(pdef, DOWN, buff=0.15)

        with self.voiceover("Equal and opposite charges, a short distance apart, form a dipole. Its moment, p, is "
                            "the charge times the separation, and it points from minus to plus.") as vo:
            self.play(FadeIn(cn), FadeIn(cp), run_time=0.6)
            self.play(GrowArrow(pv), FadeIn(pl), run_time=0.7)
            self.wait(vo.duration * 0.2)
            self.play(Write(pdef), FadeIn(pnote), run_time=1.2)

        ax_pt = P(3.6, 0.0)
        eq_pt = P(0.0, 2.5)
        with self.voiceover("Far away, its field falls as one over r cubed. On the axis it is two k p over r "
                            "cubed. On the equator it is half that, and it points opposite to p.") as vo:
            self.play(LaggedStart(*[Create(l) for l in lines], lag_ratio=0.02), run_time=1.6)
            self.bring_to_front(pv, pl, cn, cp)
            d1 = Dot(ax_pt, color=INK, radius=0.07)
            e1 = arrow(ax_pt, ax_pt + 1.4 * RIGHT, E_C, sw=6)
            t1 = M(r"E_{\text{axis}} = \frac{2kp}{r^3}", 38).next_to(ax_pt, DOWN, buff=0.45).shift(0.8 * RIGHT)
            t1.add_background_rectangle(color=BG, opacity=0.9, buff=0.08)
            self.play(FadeIn(d1), GrowArrow(e1), FadeIn(t1), run_time=1.0)
            self.wait(vo.duration * 0.1)
            d2 = Dot(eq_pt, color=INK, radius=0.07)
            e2 = arrow(eq_pt, eq_pt + 0.7 * LEFT, E_C, sw=6)
            t2 = M(r"E_{\text{eq}} = \frac{kp}{r^3}", 38).next_to(eq_pt, RIGHT, buff=0.35)
            t2.add_background_rectangle(color=BG, opacity=0.9, buff=0.08)
            self.play(FadeIn(d2), GrowArrow(e2), FadeIn(t2), run_time=1.0)

        with self.voiceover("In a uniform field, the two forces on a dipole are equal and opposite, so it does not "
                            "accelerate. But they form a couple. The torque is p cross E, and it turns the dipole "
                            "to line up with the field.") as vo:
            self.clear_scene(0.5)
            field = VGroup(*[arrow(P(-6.4, y), P(1.0, y), E_C, sw=3).set_opacity(0.55) for y in (-2.4, -1.2, 0, 1.2, 2.4)])
            fl = M(r"\vec E", 40, color=E_C).next_to(field[-1], RIGHT, buff=0.15)
            C = P(-2.7, 0.0)
            th = ValueTracker(60 * DEGREES)
            hl = 1.1

            def ends():
                u = np.array([np.cos(th.get_value()), np.sin(th.get_value()), 0])
                return C - hl * u, C + hl * u

            rod = always_redraw(lambda: Line(*ends(), color=INK, stroke_width=4))
            neg = always_redraw(lambda: charge(-1, ends()[0], r=0.22))
            pos = always_redraw(lambda: charge(1, ends()[1], r=0.22))
            fp = always_redraw(lambda: arrow(ends()[1] + 0.25 * RIGHT, ends()[1] + 1.3 * RIGHT, F_C, sw=5))
            fn = always_redraw(lambda: arrow(ends()[0] + 0.25 * LEFT, ends()[0] + 1.3 * LEFT, F_C, sw=5))
            fpl = always_redraw(lambda: M(r"q\vec E", 30, color=F_C).next_to(ends()[1] + 1.3 * RIGHT, UP, buff=0.1))
            fnl = always_redraw(lambda: M(r"-q\vec E", 30, color=F_C).next_to(ends()[0] + 1.3 * LEFT, DOWN, buff=0.1))
            self.play(LaggedStart(*[GrowArrow(f) for f in field], lag_ratio=0.1), FadeIn(fl), run_time=1.0)
            self.play(FadeIn(rod), FadeIn(neg), FadeIn(pos), run_time=0.6)
            self.play(FadeIn(fp), FadeIn(fn), FadeIn(fpl), FadeIn(fnl), run_time=0.7)
            r1 = M(r"\vec F_{\text{net}} = 0", 44).move_to(P(4.4, 2.2))
            r2 = M(r"\vec\tau = \vec p\times\vec E", 50, color=PRIMARY).move_to(P(4.4, 0.8))
            self.play(Write(r1), run_time=0.8)
            self.wait(vo.duration * 0.1)
            self.play(Write(r2), run_time=0.9)
            self.play(th.animate.set_value(0.0), run_time=2.4, rate_func=smooth)
        with self.voiceover("Its energy is minus p dot E, lowest when the dipole lines up with the field. A dipole "
                            "in a uniform field only turns. It never runs off.") as vo:
            r3 = M(r"U = -\vec p\cdot\vec E", 50).move_to(P(4.4, -0.6))
            r4 = T("turns, never accelerates", 26, color=GREEN).move_to(P(4.4, -1.8))
            self.play(Write(r3), run_time=1.0)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(r4, shift=0.15 * UP), run_time=0.7)
        for m in (rod, neg, pos, fp, fn, fpl, fnl):
            m.clear_updaters()

    # ------------------------------------------------------------ scene 6: continuous charge
    def s6(self):
        C = P(-4.6, -0.4)
        Rv = 1.8
        ring = Ellipse(width=1.0, height=2 * Rv, color=POS_C, stroke_width=6).move_to(C)
        axis = DashedLine(P(-6.6, C[1]), P(6.4, C[1]), color=GRID, stroke_width=3)
        Pp = P(0.4, C[1])
        pdot = Dot(Pp, radius=0.08, color=INK)
        plab = M("P", 34).next_to(pdot, DOWN, buff=0.15)
        top = C + Rv * UP
        bot = C + Rv * DOWN
        dq1 = Dot(top, radius=0.13, color=HL)
        dq2 = Dot(bot, radius=0.13, color=HL)
        dql = M(r"dq", 32, color=HL).next_to(dq1, UP, buff=0.1)
        l1 = DashedLine(top, Pp, color=MUTED, stroke_width=2)
        l2 = DashedLine(bot, Pp, color=MUTED, stroke_width=2)
        L = 1.9
        u1 = (Pp - top) / np.linalg.norm(Pp - top)
        u2 = (Pp - bot) / np.linalg.norm(Pp - bot)
        e1 = arrow(Pp, Pp + L * u1, E_C, sw=5)
        e2 = arrow(Pp, Pp + L * u2, E_C, sw=5)
        rl = M("R", 34, color=POS_C).next_to(Line(C, top), LEFT, buff=0.55)
        xb = BraceBetweenPoints(P(C[0], -2.5), P(Pp[0], -2.5), direction=DOWN, color=MUTED)
        xl = M("x", 34, color=MUTED).next_to(xb, DOWN, buff=0.1)

        with self.voiceover("For charge spread over a shape, chop it into tiny pieces, d q, add up their fields, and "
                            "let symmetry cancel what it can. Take a ring of charge, and a point on its "
                            "axis.") as vo:
            self.play(Create(axis), Create(ring), FadeIn(rl), run_time=1.0)
            self.play(FadeIn(pdot), FadeIn(plab), FadeIn(xb), FadeIn(xl), run_time=0.6)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(dq1), FadeIn(dq2), FadeIn(dql), Create(l1), Create(l2), run_time=0.8)
            self.play(GrowArrow(e1), GrowArrow(e2), run_time=0.8)

        ax_len = L * u1[0]
        perp1 = DashedLine(Pp + ax_len * RIGHT, Pp + L * u1, color=PURPLE, stroke_width=4)
        perp2 = DashedLine(Pp + ax_len * RIGHT, Pp + L * u2, color=PURPLE, stroke_width=4)
        tot = arrow(Pp, Pp + 2 * ax_len * RIGHT, PRIMARY, sw=8)
        formula = M(r"E = \frac{kQx}{(R^2+x^2)^{3/2}}", 52).move_to(P(3.2, 2.6))
        with self.voiceover("Each piece has an opposite partner. Their sideways parts cancel, and only the parts "
                            "along the axis survive. E equals k Q x, over R squared plus x squared, to the three "
                            "halves.") as vo:
            self.play(Create(perp1), Create(perp2), run_time=0.8)
            cancel = T("sideways parts cancel", 24, color=PURPLE).next_to(Pp + L * u1, DOWN, buff=0.2)
            self.play(FadeIn(cancel), run_time=0.5)
            self.wait(vo.duration * 0.15)
            self.play(FadeOut(e1), FadeOut(e2), FadeOut(perp1), FadeOut(perp2), GrowArrow(tot), run_time=1.0)
            self.play(Write(formula), run_time=1.4)

        with self.voiceover("Check the centre. There every piece is cancelled by its opposite, so the field is "
                            "zero, not greatest. It climbs to a peak at x equals R over root two, then falls away "
                            "like the field of a point charge.") as vo:
            keep = formula
            self.play(*[FadeOut(m) for m in self.mobjects if m is not keep], run_time=0.6)
            self.play(keep.animate.move_to(P(-3.6, 2.7)).scale(0.85), run_time=0.6)
            ax = Axes(x_range=[0, 4, 1], y_range=[0, 0.45, 0.1], x_length=9.0, y_length=4.2,
                      axis_config={"color": MUTED, "include_ticks": False, "stroke_width": 3}).move_to(P(0.4, -0.9))
            xlab = M("x", 34, color=MUTED).next_to(ax.x_axis.get_end(), DOWN, buff=0.15)
            ylab = M("E", 34, color=MUTED).next_to(ax.y_axis.get_end(), LEFT, buff=0.15)
            curve = ax.plot(lambda x: x / (1 + x * x) ** 1.5, x_range=[0, 4], color=PRIMARY, stroke_width=5)
            self.play(Create(ax), FadeIn(xlab), FadeIn(ylab), run_time=0.8)
            z = Dot(ax.c2p(0, 0), radius=0.11, color=HL)
            zl = T("zero at the centre", 24, color=INK).next_to(ax.c2p(0, 0), DOWN, buff=0.25).shift(1.0 * RIGHT)
            self.play(FadeIn(z), FadeIn(zl), run_time=0.6)
            self.play(Create(curve), run_time=1.8)
            xp = 1 / np.sqrt(2)
            yp = xp / (1 + xp * xp) ** 1.5
            vl = DashedLine(ax.c2p(xp, 0), ax.c2p(xp, yp), color=HL, stroke_width=3)
            pk = M(r"x = \frac{R}{\sqrt2}", 36, color=HL).next_to(ax.c2p(xp, yp), UR, buff=0.15)
            self.play(Create(vl), FadeIn(pk), run_time=0.8)
            far = M(r"\to \frac{kQ}{x^2}", 36, color=MUTED).next_to(ax.c2p(3.3, 3.3 / (1 + 3.3 ** 2) ** 1.5), UP, buff=0.3)
            self.play(FadeIn(far), run_time=0.6)

    # ------------------------------------------------------------ scene 7: recap
    def s7(self):
        title = T("Chapter 0 in five lines", 38, color=PRIMARY, weight="BOLD").move_to(P(0, 3.2))
        lines = [
            (r"q = ne", "quantised, conserved, additive"),
            (r"F = \frac{k|q_1q_2|}{r^2}", "equal and opposite, along the line"),
            (r"\vec F_{\text{net}} = \textstyle\sum \vec F_i", "add as vectors, not sizes"),
            (r"\vec E = \frac{\vec F}{q_0},\ \ E = \frac{kq}{r^2}", "lines run from + to -, never cross"),
            (r"\vec\tau = \vec p\times\vec E", "dipoles turn; symmetry cancels"),
        ]
        rows = VGroup()
        for i, (tex, note) in enumerate(lines):
            m = M(tex, 38)
            n = fit(T(note, 26, color=MUTED), 5.2)
            num = T(f"{i + 1}.", 28, color=PRIMARY, weight="BOLD")
            rows.add(VGroup(num, m, n))
        for r in rows:
            r[0].move_to(P(-6.0, 0))
            r[1].next_to(r[0], RIGHT, buff=0.3)
            r[2].move_to(P(1.2 + r[2].width / 2, 0))
        rows.arrange(DOWN, buff=0.32, aligned_edge=LEFT).move_to(P(0, -0.1))
        for r in rows:
            r[2].move_to(P(1.2 + r[2].width / 2, r[1].get_y()))
        with self.voiceover("To recap. Charge comes in whole electrons, it is conserved, and it adds with its sign. "
                            "Coulomb's law gives equal and opposite forces, falling as one over r "
                            "squared.") as vo:
            self.play(FadeIn(title), run_time=0.6)
            self.play(FadeIn(rows[0], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.25)
            self.play(FadeIn(rows[1], shift=0.15 * UP), run_time=0.7)
        with self.voiceover("Forces and fields add as vectors. The field is force per unit charge, drawn as lines "
                            "from plus to minus. And a dipole in a uniform field only turns.") as vo:
            self.play(FadeIn(rows[2], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(rows[3], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(rows[4], shift=0.15 * UP), run_time=0.7)
        with self.voiceover("Try the mastery quiz. Adding field arrows piece by piece is honest but slow, so "
                            "chapter one brings two shortcuts: Gauss's law, and the electric potential.") as vo:
            nxt = T("Next: Chapter 1 · Gauss's Law and Electric Potential", 30, color=PRIMARY).move_to(P(0, -3.4))
            self.wait(vo.duration * 0.3)
            self.play(FadeIn(nxt, shift=0.2 * UP), run_time=0.8)
