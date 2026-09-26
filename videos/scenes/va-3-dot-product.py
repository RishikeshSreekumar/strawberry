import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

# Chapter colour roles (light background).
A_C = PRIMARY  # vector a (and forces) = strawberry red
B_C = SECONDARY  # vector b = teal
SH_C = ACCENT  # shadow / projection = amber
PERP_C = PURPLE  # perpendicular part / a - b
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


def vec(start, end, color, sw=6):
    return Arrow(start, end, buff=0, color=color, stroke_width=sw,
                 max_tip_length_to_length_ratio=0.18, max_stroke_width_to_length_ratio=12)


def check():
    return MathTex(r"\checkmark", color=GREEN, font_size=56)


def cross_mark():
    return MathTex(r"\times", color=WARN, font_size=64)


def card(mob, pad=0.25, color=MUTED):
    box = SurroundingRectangle(mob, buff=pad, corner_radius=0.15, color=color, stroke_width=2)
    box.set_fill(WHITE, opacity=0.85)
    return VGroup(box, mob)


def P(x, y):
    return np.array([x, y, 0.0])


class VaCh3Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Vector Algebra",
            "Chapter 3 · The Dot Product",
            "Chapter three. The dot product.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ scene 1: the sled
    def s1(self):
        ground = Line(P(-6.8, -2.4), P(6.8, -2.4), color=MUTED, stroke_width=3)
        sled = RoundedRectangle(width=1.6, height=0.6, corner_radius=0.12, color=INK, stroke_width=3)
        sled.set_fill(ManimColor("#F3D9C9"), 1).move_to(P(-4.8, -2.1))
        p0 = sled.get_right() + 0.1 * UP
        th = 35 * DEGREES
        L = 3.2
        tip = p0 + L * np.array([np.cos(th), np.sin(th), 0])
        F = vec(p0, tip, A_C)
        Fl = M(r"\vec F", 40, color=A_C).next_to(tip, UR, buff=0.1)
        fwd_end = p0 + L * np.cos(th) * RIGHT
        fwd = vec(p0, fwd_end, SH_C)
        up = DashedLine(fwd_end, tip, color=PERP_C, stroke_width=4)
        arc = Arc(radius=0.7, start_angle=0, angle=th, arc_center=p0, color=INK, stroke_width=3)
        thl = M(r"\theta", 32).move_to(p0 + 1.0 * np.array([np.cos(th / 2), np.sin(th / 2), 0]))
        fwd_l = M(r"|\vec F|\cos\theta", 34, color=SH_C).move_to(P(fwd.get_center()[0], -2.85))
        up_l = T("lifts: wasted", 24, color=PERP_C).next_to(up, RIGHT, buff=0.15)
        fwd_t = T("drags forward", 24, color=SH_C).move_to(P(fwd.get_center()[0], -2.85))

        with self.voiceover("You drag a sled across flat snow with a rope. The rope points up and forward, "
                            "so your pull does two jobs at once.") as vo:
            self.play(Create(ground), FadeIn(sled), run_time=1.0)
            self.play(GrowArrow(F), FadeIn(Fl), run_time=1.0)
        with self.voiceover("Part of it drags the sled forward. Part of it tries to lift the sled, and that "
                            "part is wasted, because the sled never leaves the snow.") as vo:
            self.play(GrowArrow(fwd), run_time=0.9)
            self.play(FadeIn(fwd_t), run_time=0.5)
            self.wait(vo.duration * 0.2)
            self.play(Create(up), FadeIn(up_l), run_time=0.9)
        with self.voiceover("Physics calls the useful effort work: the forward part of the force, F cos theta, "
                            "times the distance moved.") as vo:
            self.play(FadeOut(fwd_t), Create(arc), FadeIn(thl), run_time=0.6)
            self.play(FadeIn(fwd_l), run_time=0.5)
            moving = VGroup(sled, F, Fl, fwd, up, arc, thl, fwd_l, up_l)
            start = sled.get_center()
            self.play(moving.animate.shift(4.2 * RIGHT), run_time=2.0)
            d = vec(P(start[0], -3.5), P(start[0] + 4.2, -3.5), INK, sw=4)
            dl = M(r"\vec d", 36).next_to(d, RIGHT, buff=0.15)
            w1 = M(r"W = \big(|\vec F|\cos\theta\big)\,|\vec d| = |\vec F|\,|\vec d|\cos\theta", 44)
            w1.move_to(P(0, 2.9))
            self.play(GrowArrow(d), FadeIn(dl), Write(w1), run_time=1.4)

        with self.voiceover(f"Two vectors in, their lengths and the angle between them, and one number out. "
                            f"That pattern is the dot product. {LA} dot b equals the length of vector a, "
                            f"times the length of vector b, times cos theta.") as vo:
            self.play(*[FadeOut(m) for m in self.mobjects if m is not w1], run_time=0.7)
            self.play(w1.animate.move_to(P(0, 2.2)).scale(0.8).set_opacity(0.5), run_time=0.6)
            kick = T("The dot product", 32, color=PRIMARY, weight="BOLD").move_to(P(0, 0.9))
            defn = M(r"\vec a\cdot\vec b = |\vec a|\,|\vec b|\cos\theta", 72)
            defn[0][0:2].set_color(A_C)
            defn[0][3:5].set_color(B_C)
            defn.move_to(P(0, -0.3))
            box = SurroundingRectangle(defn, buff=0.3, corner_radius=0.15, color=PRIMARY, stroke_width=3)
            self.play(FadeIn(kick), Write(defn), run_time=1.5)
            self.play(Create(box), run_time=0.6)

    # ------------------------------------------------------------ scene 2: the shadow
    def s2(self):
        O = P(-2.0, -1.4)
        la, lb = 4.0, 2.6
        axis = DashedLine(P(-6.6, O[1], ), P(6.0, O[1]), color=GRID, stroke_width=3)
        a = vec(O, O + la * RIGHT, A_C)
        al = M(r"\vec a", 40, color=A_C).next_to(a.get_end(), DOWN, buff=0.2)
        t = ValueTracker(35 * DEGREES)

        def btip():
            v = t.get_value()
            return O + lb * np.array([np.cos(v), np.sin(v), 0])

        b = always_redraw(lambda: vec(O, btip(), B_C))
        bl = always_redraw(lambda: M(r"\vec b", 40, color=B_C).move_to(btip() + 0.4 * UR))
        shadow = always_redraw(lambda: Line(O, P(btip()[0], O[1]), color=SH_C, stroke_width=12))
        drop = always_redraw(lambda: DashedLine(btip(), P(btip()[0], O[1]), color=MUTED, stroke_width=3))
        arc = always_redraw(lambda: Arc(radius=0.55, start_angle=0, angle=t.get_value(), arc_center=O,
                                        color=INK, stroke_width=3))

        th_lab = M(r"\theta =", 40)
        th_val = DecimalNumber(35, num_decimal_places=0, unit=r"^{\circ}", font_size=40, color=INK)
        dot_lab = M(r"\vec a\cdot\vec b =", 40)
        dot_val = DecimalNumber(0, num_decimal_places=1, font_size=40, color=SH_C)
        th_lab.move_to(P(-4.6, 2.9))
        dot_lab.move_to(P(1.2, 2.9))
        th_val.add_updater(lambda m: m.set_value(t.get_value() / DEGREES).next_to(th_lab, RIGHT, buff=0.15))
        dot_val.add_updater(lambda m: m.set_value(la * lb * np.cos(t.get_value())).next_to(dot_lab, RIGHT, buff=0.15))
        note = M(r"= |\vec a| \times (\text{signed shadow of } \vec b)", 34, color=MUTED).move_to(P(0.6, 2.1))

        with self.voiceover("Here is the picture to keep. Shine a light straight down onto the line of vector a. "
                            "Vector b casts a shadow on that line.") as vo:
            self.play(Create(axis), GrowArrow(a), FadeIn(al), run_time=1.0)
            self.play(FadeIn(b), FadeIn(bl), FadeIn(arc), run_time=0.8)
            self.play(Create(drop), run_time=0.6)
            self.play(Create(shadow), run_time=0.8)
        with self.voiceover(f"{LA} dot b is the length of vector a, times the signed length of that shadow. "
                            f"Swing b round. At ninety degrees the shadow shrinks to a point, and the product "
                            f"is zero.") as vo:
            self.play(FadeIn(th_lab), FadeIn(th_val), FadeIn(dot_lab), FadeIn(dot_val), FadeIn(note), run_time=0.8)
            self.wait(vo.duration * 0.25)
            self.play(t.animate.set_value(90 * DEGREES), run_time=3.0)
            z = T("shadow = a point", 26, color=MUTED).move_to(O + 1.0 * DOWN)
            self.play(Flash(O, color=HL), FadeIn(z), run_time=0.8)
        rows = VGroup(
            T("acute: positive", 26, color=GREEN),
            T("right angle: zero", 26, color=INK),
            T("obtuse: negative", 26, color=WARN),
        ).arrange(RIGHT, buff=0.9).move_to(P(0, -3.3))
        with self.voiceover("Past ninety degrees the shadow falls behind the tail, so the product turns "
                            "negative. Acute gives positive, a right angle gives zero, obtuse gives negative.") as vo:
            self.play(FadeOut(z), run_time=0.3)
            self.play(t.animate.set_value(150 * DEGREES), run_time=3.0)
            self.play(LaggedStart(*[FadeIn(r, shift=0.2 * UP) for r in rows], lag_ratio=0.4), run_time=1.5)
        th_val.clear_updaters()
        dot_val.clear_updaters()

        with self.voiceover("And notice what comes out: a single number with a sign, but no direction. That is "
                            "why it is also called the scalar product. Putting an arrow or an i hat on the "
                            "answer is always wrong.") as vo:
            self.clear_scene(0.6)
            good = M(r"\vec a\cdot\vec b = 6", 60).move_to(P(-3.2, 0.6))
            bad = M(r"\vec a\cdot\vec b = 6\,\hat i", 60).move_to(P(3.2, 0.6))
            c1 = check().next_to(good, DOWN, buff=0.4)
            c2 = cross_mark().next_to(bad, DOWN, buff=0.3)
            cap = T("a scalar: size and sign, no direction", 32, color=PRIMARY).move_to(P(0, -2.2))
            self.play(Write(good), run_time=0.8)
            self.play(FadeIn(c1), run_time=0.4)
            self.play(Write(bad), run_time=0.8)
            self.play(FadeIn(c2), run_time=0.4)
            self.play(FadeIn(cap), run_time=0.6)

    # ------------------------------------------------------------ scene 3: component formula
    def s3(self):
        O = P(-6.0, -2.2)
        A = O + P(4.4, 0.5)
        B = O + P(1.3, 3.0)
        va = vec(O, A, A_C)
        vb = vec(O, B, B_C)
        vd = vec(B, A, PERP_C)
        la = M(r"\vec a", 38, color=A_C).next_to(va.get_center(), DOWN, buff=0.25)
        lb = M(r"\vec b", 38, color=B_C).next_to(vb.get_center(), LEFT, buff=0.2)
        ld = M(r"\vec a-\vec b", 38, color=PERP_C).next_to(vd.get_center(), UR, buff=0.1)
        ang_a = np.arctan2(0.5, 4.4)
        ang_b = np.arctan2(3.0, 1.3)
        arc = Arc(radius=0.7, start_angle=ang_a, angle=ang_b - ang_a, arc_center=O, color=INK, stroke_width=3)
        thl = M(r"\theta", 32).move_to(O + 1.0 * np.array([np.cos((ang_a + ang_b) / 2), np.sin((ang_a + ang_b) / 2), 0]))
        tri = VGroup(va, vb, vd, la, lb, ld, arc, thl)

        with self.voiceover("The definition needs the angle, and in three dimensions nobody hands you the angle. "
                            "So let us find a formula that uses only components. We derive it from the law of "
                            "cosines.") as vo:
            hdr = T("Wanted: a formula with no angle in it", 34, color=PRIMARY, weight="BOLD").move_to(P(0, 3.2))
            self.play(FadeIn(hdr), run_time=0.8)
            self.play(GrowArrow(va), GrowArrow(vb), FadeIn(la), FadeIn(lb), Create(arc), FadeIn(thl), run_time=1.4)
        e1 = fit(M(r"|\vec a-\vec b|^2 = |\vec a|^2+|\vec b|^2-2|\vec a||\vec b|\cos\theta", 38), 7.6)
        e1.move_to(P(2.4, 1.6))
        with self.voiceover("Draw vector a and vector b tail to tail. The third side, from the tip of b to the tip "
                            "of a, is a minus b. The law of cosines says: the length of a minus b, squared, equals "
                            "a squared plus b squared, minus two a b cos theta.") as vo:
            self.wait(vo.duration * 0.3)
            self.play(GrowArrow(vd), FadeIn(ld), run_time=1.0)
            self.wait(vo.duration * 0.1)
            self.play(Write(e1), run_time=2.0)
        e2 = fit(M(r"\vec a\cdot\vec b = \tfrac12\Big(|\vec a|^2+|\vec b|^2-|\vec a-\vec b|^2\Big)", 40), 7.6)
        e2.move_to(P(2.4, 0.2))
        with self.voiceover(f"That last term is two times the dot product. Rearrange, and the angle disappears. "
                            f"{LA} dot b is one half of: a squared, plus b squared, minus the length of a minus b, "
                            f"squared.") as vo:
            u = Underline(e1[0][-13:], color=HL, stroke_width=4)
            self.play(Create(u), run_time=0.8)
            self.wait(vo.duration * 0.2)
            self.play(TransformFromCopy(e1, e2), run_time=1.5)
            self.play(FadeOut(u), run_time=0.3)

        with self.voiceover(f"Now write each length squared in components. Every square cancels, and only the "
                            f"cross terms survive. {LA} dot b equals a one b one, plus a two b two, plus a three "
                            f"b three.") as vo:
            self.play(FadeOut(tri), FadeOut(e1), FadeOut(hdr), run_time=0.6)
            self.play(e2.animate.move_to(P(0, 2.8)), run_time=0.7)
            l1 = fit(M(r"|\vec a-\vec b|^2 = (a_1-b_1)^2+(a_2-b_2)^2+(a_3-b_3)^2", 40), 12)
            l2 = fit(M(r"= |\vec a|^2 \;-\; 2\,(a_1b_1+a_2b_2+a_3b_3) \;+\; |\vec b|^2", 40), 12)
            l1.move_to(P(0, 1.4))
            l2.next_to(l1, DOWN, buff=0.35)
            self.play(Write(l1), run_time=1.3)
            self.play(Write(l2), run_time=1.3)
            res = M(r"\vec a\cdot\vec b = a_1b_1+a_2b_2+a_3b_3", 60).move_to(P(0, -1.9))
            box = SurroundingRectangle(res, buff=0.3, corner_radius=0.15, color=PRIMARY, stroke_width=3)
            self.play(Write(res), Create(box), run_time=1.5)

        with self.voiceover("For example: two, minus one, three, dotted with one, four, two. Pair them up: two, "
                            "minus four, six. Then add, to get four. The answer is the number four, not the list "
                            "two, minus four, six.") as vo:
            self.play(FadeOut(e2), FadeOut(l1), FadeOut(l2), FadeOut(box), run_time=0.5)
            self.play(res.animate.scale(0.7).move_to(P(0, 3.0)), run_time=0.6)
            ex = M(r"(2,\,-1,\,3)\cdot(1,\,4,\,2)", 56).move_to(P(0, 1.5))
            pr = M(r"= (2)(1) + (-1)(4) + (3)(2)", 50).next_to(ex, DOWN, buff=0.35)
            sm = M(r"= 2 - 4 + 6 = 4", 56, color=GREEN).next_to(pr, DOWN, buff=0.35)
            self.play(Write(ex), run_time=1.0)
            self.play(Write(pr), run_time=1.2)
            self.play(Write(sm), run_time=1.0)
            wrong = M(r"(2,\,-4,\,6)", 48, color=WARN).move_to(P(-2.0, -2.8))
            xm = cross_mark().next_to(wrong, RIGHT, buff=0.3)
            nt = T("a list is not the answer", 28, color=WARN).next_to(xm, RIGHT, buff=0.3)
            self.wait(vo.duration * 0.15)
            self.play(FadeIn(wrong), FadeIn(xm), FadeIn(nt), run_time=0.8)

    # ------------------------------------------------------------ scene 4: angles and perpendicularity
    def s4(self):
        f = M(r"\cos\theta = \frac{\vec a\cdot\vec b}{|\vec a|\,|\vec b|}", 64).move_to(P(0, 2.4))
        with self.voiceover(f"Now we have two expressions for the same number. Set them equal, and you can recover "
                            f"an angle you cannot see. Cos theta equals {LA} dot b, over the product of the "
                            f"lengths.") as vo:
            self.wait(vo.duration * 0.3)
            self.play(Write(f), run_time=1.6)
        with self.voiceover("Take i plus j, and j plus k. The dot product is one. Each length is root two. "
                            "So cos theta is one half, and the angle is sixty degrees.") as vo:
            e1 = M(r"(1,1,0)\cdot(0,1,1) = 0+1+0 = 1", 44).move_to(P(0, 0.7))
            e2 = M(r"|\vec a| = |\vec b| = \sqrt2", 44).next_to(e1, DOWN, buff=0.35)
            e3 = M(r"\cos\theta = \frac{1}{\sqrt2\cdot\sqrt2} = \frac12 \;\Rightarrow\; \theta = 60^\circ", 44,
                   color=GREEN).next_to(e2, DOWN, buff=0.35)
            self.play(Write(e1), run_time=1.2)
            self.play(Write(e2), run_time=1.0)
            self.play(Write(e3), run_time=1.4)

        with self.voiceover("The best special case is a right angle. For non zero vectors, perpendicular means "
                            "exactly that the dot product is zero. So to make two i plus lambda j plus k "
                            "perpendicular to i minus two j plus three k, set the dot product to zero: five minus "
                            "two lambda equals zero, so lambda is five halves.") as vo:
            self.play(FadeOut(e1), FadeOut(e2), FadeOut(e3), FadeOut(f), run_time=0.5)
            p = M(r"\vec a\perp\vec b \iff \vec a\cdot\vec b = 0", 60, color=PRIMARY).move_to(P(0, 2.5))
            self.play(Write(p), run_time=1.3)
            self.wait(vo.duration * 0.15)
            q1 = M(r"(2,\,\lambda,\,1)\cdot(1,\,-2,\,3) = 2 - 2\lambda + 3", 46).move_to(P(0, 0.9))
            q2 = M(r"5 - 2\lambda = 0", 46).next_to(q1, DOWN, buff=0.4)
            q3 = M(r"\lambda = \tfrac52", 54, color=GREEN).next_to(q2, DOWN, buff=0.4)
            self.play(Write(q1), run_time=1.5)
            self.play(Write(q2), run_time=1.0)
            self.play(Write(q3), run_time=0.8)

        # traps
        with self.voiceover("Two traps. A zero dot product does not mean one vector is zero. One, two, dotted with "
                            "two, minus one, is two minus two, which is zero, and neither vector is zero. They are "
                            "perpendicular.") as vo:
            self.clear_scene(0.5)
            div = Line(P(0, 2.4), P(0, -3.4), color=GRID, stroke_width=3)
            O = P(-4.2, -1.6)
            s = 1.0
            v1 = vec(O, O + s * P(1, 2), A_C)
            v2 = vec(O, O + s * P(2, -1), B_C)
            l1 = M(r"(1,2)", 34, color=A_C).next_to(v1.get_end(), UP, buff=0.12)
            l2 = M(r"(2,-1)", 34, color=B_C).next_to(v2.get_end(), RIGHT, buff=0.12)
            ra = RightAngle(Line(O, O + P(1, 2)), Line(O, O + P(2, -1)), length=0.3, color=INK, stroke_width=3)
            t1 = M(r"(1,2)\cdot(2,-1) = 2-2 = 0", 38).move_to(P(-3.4, 2.9))
            t1b = T("zero means perpendicular (or zero)", 24, color=MUTED).next_to(t1, DOWN, buff=0.2)
            self.play(Write(t1), Create(div), run_time=1.0)
            self.play(GrowArrow(v1), GrowArrow(v2), FadeIn(l1), FadeIn(l2), run_time=1.0)
            self.play(Create(ra), FadeIn(t1b), run_time=0.8)

        with self.voiceover("And the angle is always measured tail to tail. In an equilateral triangle, A B and "
                            "B C meet head to tail at sixty degrees. Slide them tail to tail and the angle is one "
                            "hundred and twenty, so their dot product is negative.") as vo:
            A = P(2.4, -2.4)
            Bp = P(5.2, -2.4)
            side = 2.8
            dirc = np.array([np.cos(120 * DEGREES), np.sin(120 * DEGREES), 0])
            C = Bp + side * dirc
            ab = vec(A, Bp, A_C)
            bc = vec(Bp, C, B_C)
            Al = M("A", 32).next_to(A, DL, buff=0.1)
            Bl = M("B", 32).next_to(Bp, DR, buff=0.1)
            Cl = M("C", 32).next_to(C, UP, buff=0.1)
            arcB = Arc(radius=0.55, start_angle=120 * DEGREES, angle=60 * DEGREES, arc_center=Bp,
                       color=WARN, stroke_width=3)
            l60 = M(r"60^\circ", 30, color=WARN).move_to(Bp + 0.95 * np.array([np.cos(150 * DEGREES),
                                                                               np.sin(150 * DEGREES), 0]))
            x60 = cross_mark().scale(0.6).next_to(l60, UP, buff=0.05)
            hdr = T("head to tail", 26, color=WARN).move_to(P(4.0, 2.9))
            self.play(GrowArrow(ab), GrowArrow(bc), FadeIn(Al), FadeIn(Bl), FadeIn(Cl), FadeIn(hdr), run_time=1.0)
            self.play(Create(arcB), FadeIn(l60), FadeIn(x60), run_time=0.8)
            self.wait(vo.duration * 0.15)
            moved = vec(A, A + side * dirc, B_C)
            self.play(TransformFromCopy(bc, moved), run_time=1.3)
            arcA = Arc(radius=0.55, start_angle=0, angle=120 * DEGREES, arc_center=A, color=GREEN, stroke_width=3)
            l120 = M(r"120^\circ", 30, color=GREEN).move_to(A + 0.95 * np.array([np.cos(60 * DEGREES),
                                                                                np.sin(60 * DEGREES), 0]))
            hdr2 = T("tail to tail", 26, color=GREEN).move_to(P(4.0, 2.4))
            self.play(Create(arcA), FadeIn(l120), FadeIn(hdr2), run_time=0.8)
            res = M(r"\overrightarrow{AB}\cdot\overrightarrow{BC} = s^2\cos120^\circ = -\tfrac{s^2}{2}", 32)
            res.move_to(P(4.0, 1.7))
            self.play(Write(res), run_time=1.2)

    # ------------------------------------------------------------ scene 5: algebra
    def s5(self):
        hdr = T("Expand it like ordinary brackets", 34, color=PRIMARY, weight="BOLD").move_to(P(0, 3.2))
        k = M(r"\vec a\cdot\vec a = |\vec a|^2", 54, color=PRIMARY).move_to(P(0, 2.1))
        with self.voiceover(f"The dot product is commutative, and it distributes over addition, so you can expand "
                            f"brackets like ordinary algebra. The key link: {LA} dot a is the length of a, "
                            f"squared.") as vo:
            self.play(FadeIn(hdr), run_time=0.7)
            self.wait(vo.duration * 0.35)
            self.play(Write(k), run_time=1.2)
        with self.voiceover(f"So the length of a plus b, squared, is a squared, plus two {LA} dot b, plus b "
                            f"squared. With a minus sign, the same line is the law of cosines, proved in one "
                            f"step.") as vo:
            r1 = M(r"|\vec a+\vec b|^2 = (\vec a+\vec b)\cdot(\vec a+\vec b) = |\vec a|^2 + 2\,\vec a\cdot\vec b + |\vec b|^2",
                   42)
            fit(r1, 12.5).move_to(P(0, 0.8))
            r2 = M(r"|\vec a-\vec b|^2 = |\vec a|^2 - 2\,\vec a\cdot\vec b + |\vec b|^2", 42).move_to(P(0, -0.4))
            r2n = T("= the law of cosines", 28, color=GREEN).next_to(r2, DOWN, buff=0.3)
            self.play(Write(r1), run_time=2.0)
            self.wait(vo.duration * 0.15)
            self.play(Write(r2), run_time=1.3)
            self.play(FadeIn(r2n), run_time=0.6)

        with self.voiceover(f"Multiply the two diagonals of a parallelogram, a plus b and a minus b. You get "
                            f"a squared minus b squared. In a rhombus the sides are equal, so that is zero: the "
                            f"diagonals of a rhombus are perpendicular.") as vo:
            self.play(*[FadeOut(m) for m in (hdr, k, r1, r2, r2n)], run_time=0.5)
            Pp = P(-5.6, -1.6)
            s = 2.6
            av = s * P(1, 0)
            bv = s * np.array([np.cos(60 * DEGREES), np.sin(60 * DEGREES), 0])
            sides = VGroup(vec(Pp, Pp + av, A_C), vec(Pp, Pp + bv, B_C),
                           DashedLine(Pp + av, Pp + av + bv, color=MUTED, stroke_width=3),
                           DashedLine(Pp + bv, Pp + av + bv, color=MUTED, stroke_width=3))
            lab = VGroup(M(r"\vec a", 36, color=A_C).next_to(Pp + av / 2, DOWN, buff=0.15),
                         M(r"\vec b", 36, color=B_C).next_to(Pp + bv / 2, LEFT, buff=0.15))
            d1 = vec(Pp, Pp + av + bv, SH_C, sw=5)
            d2 = vec(Pp + bv, Pp + av, PERP_C, sw=5)
            ctr = Pp + (av + bv) / 2
            ra = RightAngle(Line(ctr, Pp + av + bv), Line(ctr, Pp + av), length=0.25, color=INK, stroke_width=3)
            dl = VGroup(M(r"\vec a+\vec b", 32, color=SH_C).next_to(Pp + av + bv, UP, buff=0.15),
                        M(r"\vec a-\vec b", 32, color=PERP_C).next_to(Pp + av, DR, buff=0.1))
            self.play(Create(sides), FadeIn(lab), run_time=1.2)
            self.play(GrowArrow(d1), GrowArrow(d2), FadeIn(dl), run_time=1.0)
            eq = M(r"(\vec a+\vec b)\cdot(\vec a-\vec b) = |\vec a|^2-|\vec b|^2", 42).move_to(P(2.9, 1.2))
            eq2 = M(r"= 0 \quad\text{when } |\vec a| = |\vec b|", 42, color=GREEN).next_to(eq, DOWN, buff=0.35)
            eq2.align_to(eq, LEFT).shift(1.6 * RIGHT)
            self.play(Write(eq), run_time=1.4)
            self.wait(vo.duration * 0.15)
            self.play(Write(eq2), Create(ra), run_time=1.2)

        with self.voiceover(f"One thing you can never do is cancel. Here b and c are different vectors, yet they "
                            f"cast the same shadow on vector a, so {LA} dot b equals {LA} dot c. The dot product "
                            f"only sees the shadow.") as vo:
            self.clear_scene(0.5)
            O = P(-5.0, 0.6)
            u = 0.62
            line = DashedLine(P(-6.6, O[1]), P(-0.8, O[1]), color=GRID, stroke_width=3)
            va = vec(O, O + u * P(3, 0), A_C)
            vb = vec(O, O + u * P(1, 2), B_C)
            vc = vec(O, O + u * P(1, -5), PERP_C)
            foot = O + u * P(1, 0)
            sh = Line(O, foot, color=SH_C, stroke_width=12)
            dr = DashedLine(O + u * P(1, 2), O + u * P(1, -5), color=MUTED, stroke_width=3)
            labs = VGroup(M(r"\vec a", 34, color=A_C).next_to(va.get_end(), UP, buff=0.12),
                          M(r"\vec b", 34, color=B_C).next_to(vb.get_end(), RIGHT, buff=0.12),
                          M(r"\vec c", 34, color=PERP_C).next_to(vc.get_end(), RIGHT, buff=0.12))
            self.play(Create(line), GrowArrow(va), FadeIn(labs[0]), run_time=0.8)
            self.play(GrowArrow(vb), GrowArrow(vc), FadeIn(labs[1:]), run_time=1.0)
            self.play(Create(dr), Create(sh), run_time=0.8)
            txt = VGroup(
                M(r"\vec a = (3,0),\ \vec b = (1,2),\ \vec c = (1,-5)", 36),
                M(r"\vec a\cdot\vec b = 3 = \vec a\cdot\vec c", 40),
                M(r"\text{but } \vec b \ne \vec c", 40, color=WARN),
                M(r"\vec a\cdot(\vec b-\vec c) = 0", 36, color=MUTED),
            ).arrange(DOWN, buff=0.4).move_to(P(3.2, 0.3))
            for m in txt:
                self.play(FadeIn(m, shift=0.15 * UP), run_time=0.6)

    # ------------------------------------------------------------ scene 6: projections and work
    def s6(self):
        O = P(-5.8, -1.6)
        bvec = P(5.4, 0)
        avec = P(3.2, 2.6)
        vb = vec(O, O + bvec, B_C)
        va = vec(O, O + avec, A_C)
        proj = vec(O, O + P(avec[0], 0), SH_C, sw=9)
        perp = vec(O + P(avec[0], 0), O + avec, PERP_C)
        ra = RightAngle(Line(O + P(avec[0], 0), O + bvec), Line(O + P(avec[0], 0), O + avec), length=0.25,
                        color=INK, stroke_width=3)
        lb = M(r"\vec b", 36, color=B_C).next_to(vb.get_end(), DOWN, buff=0.15)
        la = M(r"\vec a", 36, color=A_C).next_to(va.get_center(), UL, buff=0.1)
        lp = M(r"\operatorname{proj}_{\vec b}\vec a", 32, color=SH_C).next_to(proj, DOWN, buff=0.2)
        lq = M(r"\vec a_\perp", 34, color=PERP_C).next_to(perp, RIGHT, buff=0.12)
        e1 = M(r"\vec a\cdot\hat b = \frac{\vec a\cdot\vec b}{|\vec b|}", 44)
        e1n = T("scalar projection", 24, color=MUTED)
        e2 = M(r"\operatorname{proj}_{\vec b}\vec a = \frac{\vec a\cdot\vec b}{|\vec b|^2}\,\vec b", 44)
        e2n = T("vector projection", 24, color=MUTED)
        e3 = M(r"\vec a_\perp = \vec a - \operatorname{proj}_{\vec b}\vec a", 44)
        col = VGroup(e1n, e1, e2n, e2, e3).arrange(DOWN, buff=0.25).move_to(P(3.6, 1.4))
        e3.shift(0.2 * DOWN)

        with self.voiceover(f"Now pull the shadow out on its own. Dot with the unit vector b hat, and the extra "
                            f"length drops out. The scalar projection of {LA} on b is {LA} dot b, over the length "
                            f"of b.") as vo:
            self.play(GrowArrow(vb), FadeIn(lb), GrowArrow(va), FadeIn(la), run_time=1.0)
            self.play(GrowArrow(proj), run_time=0.8)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(e1n), Write(e1), run_time=1.3)
        with self.voiceover(f"Multiply that by b hat to get the shadow as an arrow: the vector projection. What is "
                            f"left over, {LA} minus its projection, is at right angles to b. Every vector splits "
                            f"into a part along b and a part across it.") as vo:
            self.play(FadeIn(lp), FadeIn(e2n), Write(e2), run_time=1.5)
            self.wait(vo.duration * 0.2)
            self.play(GrowArrow(perp), FadeIn(lq), Create(ra), run_time=1.0)
            self.play(Write(e3), run_time=1.2)

        with self.voiceover("Order matters. The projection of a on b divides by the length of b. The projection "
                            "of b on a divides by the length of a. They agree only when the lengths match.") as vo:
            self.clear_scene(0.5)
            l = M(r"\text{proj of } \vec a \text{ on } \vec b:\ \ \frac{\vec a\cdot\vec b}{|\vec b|}", 46)
            r = M(r"\text{proj of } \vec b \text{ on } \vec a:\ \ \frac{\vec a\cdot\vec b}{|\vec a|}", 46)
            ne = M(r"\ne", 60, color=WARN)
            g = VGroup(l, ne, r).arrange(RIGHT, buff=0.5).move_to(P(0, 0.8))
            fit(g, 12.8)
            cap = T("A pole's shadow on the ground is not the ground's shadow on the pole.", 26,
                    color=MUTED).move_to(P(0, -1.2))
            self.play(Write(l), run_time=1.2)
            self.play(FadeIn(ne), Write(r), run_time=1.2)
            self.play(FadeIn(cap), run_time=0.6)

        with self.voiceover("And work is a shadow too. A constant force F, moving through a displacement d, "
                            "does work F dot d. Two forces act on a particle that moves from the point one, two, "
                            "three to the point five, four, one.") as vo:
            self.clear_scene(0.5)
            h = M(r"W = \vec F\cdot\vec d", 60, color=PRIMARY).move_to(P(0, 2.8))
            self.play(Write(h), run_time=1.0)
            given = M(r"\vec F_1 = (4,1,-3),\quad \vec F_2 = (3,1,-1),\quad A(1,2,3)\to B(5,4,1)", 38)
            fit(given, 12.5).move_to(P(0, 1.6))
            self.play(FadeIn(given), run_time=0.8)
        with self.voiceover("The displacement is final minus initial: four, two, minus two. The resultant force "
                            "is seven, two, minus four. Dot them: twenty eight, plus four, plus eight. The work "
                            "is forty units.") as vo:
            w1 = M(r"\vec d = B - A = (4,\,2,\,-2)", 42).move_to(P(0, 0.4))
            w2 = M(r"\vec R = \vec F_1 + \vec F_2 = (7,\,2,\,-4)", 42).next_to(w1, DOWN, buff=0.35)
            w3 = M(r"W = \vec R\cdot\vec d = 28 + 4 + 8 = 40", 48, color=GREEN).next_to(w2, DOWN, buff=0.45)
            self.play(Write(w1), run_time=1.2)
            self.wait(vo.duration * 0.1)
            self.play(Write(w2), run_time=1.2)
            self.wait(vo.duration * 0.1)
            self.play(Write(w3), run_time=1.3)

    # ------------------------------------------------------------ scene 7: recap
    def s7(self):
        title = T("Chapter 3 in five lines", 38, color=PRIMARY, weight="BOLD").move_to(P(0, 3.2))
        lines = [
            (r"\vec a\cdot\vec b = |\vec a||\vec b|\cos\theta", "length times signed shadow, a scalar"),
            (r"\vec a\cdot\vec b = a_1b_1+a_2b_2+a_3b_3", "from the law of cosines"),
            (r"\cos\theta = \frac{\vec a\cdot\vec b}{|\vec a||\vec b|}", "zero means perpendicular"),
            (r"\vec a\cdot\vec a = |\vec a|^2", "expand brackets, never cancel"),
            (r"\frac{\vec a\cdot\vec b}{|\vec b|}, \quad W = \vec F\cdot\vec d", "projection and work"),
        ]
        rows = VGroup()
        for i, (tex, note) in enumerate(lines):
            m = M(tex, 38)
            n = T(note, 26, color=MUTED)
            num = T(f"{i + 1}.", 28, color=PRIMARY, weight="BOLD")
            rows.add(VGroup(num, m, n))
        for r in rows:
            r[0].move_to(P(-6.0, 0))
            r[1].next_to(r[0], RIGHT, buff=0.3)
            r[2].move_to(P(3.3, 0))
        rows.arrange(DOWN, buff=0.35, aligned_edge=LEFT).move_to(P(0, -0.1))
        for r in rows:
            r[2].move_to(P(3.3, r[1].get_y()))
        with self.voiceover("To recap. The dot product is length times signed shadow, and it is a scalar. The law "
                            "of cosines turns it into: multiply matching components, and add.") as vo:
            self.play(FadeIn(title), run_time=0.6)
            self.play(FadeIn(rows[0], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.25)
            self.play(FadeIn(rows[1], shift=0.15 * UP), run_time=0.7)
        with self.voiceover("It gives angles, and a zero dot product means perpendicular. Expand it like brackets, "
                            "but never cancel. And projection and work are the shadow put to use.") as vo:
            self.play(FadeIn(rows[2], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(rows[3], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.2)
            self.play(FadeIn(rows[4], shift=0.15 * UP), run_time=0.7)
        with self.voiceover("Try the mastery quiz. Then chapter four builds the other product: a vector that "
                            "measures how much two vectors disagree, and points straight out of their plane.") as vo:
            nxt = T("Next: Chapter 4 · The Cross Product", 32, color=PRIMARY).move_to(P(0, -3.4))
            self.wait(vo.duration * 0.3)
            self.play(FadeIn(nxt, shift=0.2 * UP), run_time=0.8)
