import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

# Chapter colour roles (light background).
A_C = PRIMARY  # vector a = strawberry red
B_C = SECONDARY  # vector b = teal
S_C = PURPLE  # sums / results
HL = ManimColor("#D19A00")  # highlight (gold)
WARN = PRIMARY


# ---------------------------------------------------------------- helpers
def arr(start, end, color=INK, sw=6, **kw):
    start = np.array(start, dtype=float)
    end = np.array(end, dtype=float)
    if len(start) == 2:
        start = np.append(start, 0)
    if len(end) == 2:
        end = np.append(end, 0)
    return Arrow(start, end, buff=0, color=color, stroke_width=sw,
                 max_tip_length_to_length_ratio=0.3, max_stroke_width_to_length_ratio=12,
                 tip_length=0.25, **kw)


def card(mob, pad=0.25, color=MUTED, fill=WHITE, opacity=0.9):
    box = SurroundingRectangle(mob, buff=pad, corner_radius=0.15, color=color, stroke_width=2)
    box.set_fill(fill, opacity=opacity)
    return VGroup(box, mob)


def T(s, size=30, **kw):
    return Text(s, font_size=size, **kw)


def M(s, size=40, **kw):
    return MathTex(s, font_size=size, **kw)


def check():
    return MathTex(r"\checkmark", color=GREEN, font_size=48)


def cross_out(mob):
    return VGroup(
        Line(mob.get_corner(UL), mob.get_corner(DR), color=WARN, stroke_width=5),
        Line(mob.get_corner(DL), mob.get_corner(UR), color=WARN, stroke_width=5),
    )


def P(x, y):
    return np.array([x, y, 0.0])


class VaCh0Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Vector Algebra",
            "Chapter 0 · What a Vector Is",
            "Chapter zero. What a vector is.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7):
            part()
            self.clear_scene()

    # ------------------------------------------------------------ scene 1: hook
    def s1(self):
        header = T("0.1 · Three plus four", 30, weight="BOLD", color=MUTED).to_corner(UL, buff=0.4)
        home = P(-5, -1.5)
        mid = P(-2, -1.5)
        home_dot = Dot(home, color=INK, radius=0.1)
        home_lab = T("home", 24, color=MUTED).next_to(home_dot, DOWN, buff=0.15)
        leg1 = arr(home, mid, A_C)
        leg1_lab = M(r"3\text{ km}", 30, color=A_C).next_to(leg1, DOWN, buff=0.15)

        phi = ValueTracker(0.0)

        def tip():
            f = phi.get_value()
            return mid + 4 * np.array([np.cos(f), np.sin(f), 0])

        leg2 = always_redraw(lambda: arr(mid, tip(), B_C))

        def leg2_label():
            f = phi.get_value()
            m = (mid + tip()) / 2
            n = np.array([-np.sin(f), np.cos(f), 0])
            return M(r"4\text{ km}", 30, color=B_C).move_to(m + 0.4 * n)

        leg2_lab = always_redraw(leg2_label)

        q = card(M(r"3 + 4 = 7\,?", 44)).move_to(P(4.3, 2.6))

        with self.voiceover("You leave home and walk three kilometres east. Then you walk four more. "
                            "How far are you from home? The tempting answer is seven.") as vo:
            self.play(FadeIn(header), FadeIn(home_dot), FadeIn(home_lab), run_time=0.7)
            self.play(GrowArrow(leg1), FadeIn(leg1_lab), run_time=1.0)
            self.add(leg2, leg2_lab)
            self.wait(0.6)
            self.play(FadeIn(q, shift=0.2 * DOWN), run_time=0.8)

        def d():
            return float(np.linalg.norm(tip() - home))

        res = always_redraw(lambda: arr(home, tip(), S_C, sw=8) if d() > 0.3 else VGroup())
        read_txt = T("distance from home =", 26)
        num = DecimalNumber(7.0, num_decimal_places=1, font_size=40, color=S_C)
        unit = T("km", 26)
        readout = VGroup(read_txt, num, unit).arrange(RIGHT, buff=0.15).move_to(P(4.3, 1.3))
        num.add_updater(lambda m: m.set_value(d()))

        marks = VGroup()
        with self.voiceover("But watch what happens as the second leg turns. Pointing the same way, "
                            "you are seven away. At right angles, five. Turned all the way back, just one.") as vo:
            self.play(FadeIn(readout), run_time=0.5)
            self.add(res)
            self.bring_to_front(leg2)
            self.wait(1.2)
            self.play(Indicate(num, color=HL), run_time=0.7)
            self.play(phi.animate.set_value(PI / 2), run_time=vo.duration * 0.25)
            sq = Square(0.3, color=INK, stroke_width=2).move_to(mid + P(0.15, 0.15))
            self.play(Create(sq), Indicate(num, color=HL), run_time=0.8)
            self.wait(0.5)
            self.play(FadeOut(sq), phi.animate.set_value(PI), run_time=vo.duration * 0.25)
            self.play(Indicate(num, color=HL), run_time=0.7)

        with self.voiceover("The lengths never changed. The directions decided the answer. "
                            "That is the whole reason vectors exist.") as vo:
            self.play(phi.animate.set_value(PI / 3), run_time=1.5)
            num.clear_updaters()
            rng = card(M(r"1 \le d \le 7", 44, color=S_C)).move_to(P(4.3, 0.0))
            msg = card(T("Same lengths, different directions\n→ different answers", 26)).move_to(P(4.3, -1.6))
            self.play(FadeIn(rng, shift=0.2 * UP), run_time=0.7)
            self.play(FadeIn(msg, shift=0.2 * UP), run_time=0.7)
        leg2.clear_updaters()
        leg2_lab.clear_updaters()
        res.clear_updaters()
        del marks

    # ------------------------------------------------------------ scene 2: scalars vs vectors
    def s2(self):
        header = T("0.1 · Scalars and vectors", 30, weight="BOLD", color=MUTED).to_corner(UL, buff=0.4)
        h1 = T("Scalar", 40, weight="BOLD", color=MUTED)
        h2 = T("Vector", 40, weight="BOLD", color=S_C)
        s1 = T("number + unit", 26, color=MUTED)
        s2 = T("number + unit + direction", 26, color=S_C)
        col1 = VGroup(h1, s1).arrange(DOWN, buff=0.2).move_to(P(-3.3, 2.2))
        col2 = VGroup(h2, s2).arrange(DOWN, buff=0.2).move_to(P(3.3, 2.2))
        div = Line(P(0, 2.9), P(0, -3.2), color=GRID, stroke_width=3)

        def chips(words, color, x):
            g = VGroup(*[card(T(w, 28, color=color), pad=0.14, color=color) for w in words])
            g.arrange(DOWN, buff=0.18).move_to(P(x, -0.9))
            return g

        sc = chips(["mass", "time", "temperature", "distance", "speed"], INK, -3.3)
        vc = chips(["displacement", "velocity", "force", "weight"], S_C, 3.3)

        with self.voiceover("A scalar is completely described by one number and a unit: mass, time, "
                            "temperature, distance, speed. A vector needs a number and a direction: "
                            "displacement, velocity, force, weight.") as vo:
            self.play(FadeIn(header), FadeIn(col1), Create(div), run_time=0.8)
            self.play(LaggedStart(*[FadeIn(c, shift=0.2 * UP) for c in sc], lag_ratio=0.3),
                      run_time=vo.duration * 0.35)
            self.play(FadeIn(col2), run_time=0.6)
            self.play(LaggedStart(*[FadeIn(c, shift=0.2 * UP) for c in vc], lag_ratio=0.3),
                      run_time=vo.duration * 0.3)

        with self.voiceover("Run one full lap of a four hundred metre track. The distance is four hundred "
                            "metres, but you end where you started, so the displacement is zero.") as vo:
            self.play(FadeOut(VGroup(col1, col2, div, sc, vc)), run_time=0.6)
            track = Ellipse(width=6, height=3, color=MUTED, stroke_width=10).move_to(P(-2.5, -0.3))
            start = track.point_from_proportion(0)
            sdot = Dot(start, color=INK, radius=0.12)
            slab = T("start = finish", 24, color=MUTED).next_to(sdot, RIGHT, buff=0.2)
            self.play(Create(track), FadeIn(sdot), FadeIn(slab), run_time=0.8)
            runner = Dot(start, color=A_C, radius=0.14)
            trail = TracedPath(runner.get_center, stroke_color=A_C, stroke_width=5)
            self.add(trail, runner)
            self.play(MoveAlongPath(runner, track), run_time=max(2.0, vo.duration * 0.4), rate_func=linear)
            l1 = M(r"\text{distance} = 400\text{ m}", 38, color=A_C)
            l2 = M(r"\text{displacement} = \vec 0", 38, color=S_C)
            VGroup(l1, l2).arrange(DOWN, buff=0.4, aligned_edge=LEFT).move_to(P(3.9, 0))
            self.play(FadeIn(l1, shift=0.2 * LEFT), run_time=0.6)
            self.play(FadeIn(l2, shift=0.2 * LEFT), run_time=0.6)
            trail.clear_updaters()

        with self.voiceover("Speed and velocity split the same way. A car going round a bend at a steady "
                            "forty kilometres per hour has constant speed, but its velocity keeps changing, "
                            "because its direction does.") as vo:
            self.play(FadeOut(VGroup(track, sdot, slab, runner, trail, l1, l2)), run_time=0.6)
            ctr = P(-3.0, -0.4)
            R = 1.9
            road = Circle(radius=R, color=MUTED, stroke_width=8).move_to(ctr)
            ang = ValueTracker(-PI / 2)

            def cpos():
                t = ang.get_value()
                return ctr + R * np.array([np.cos(t), np.sin(t), 0])

            car = always_redraw(lambda: Dot(cpos(), color=INK, radius=0.14))
            vel = always_redraw(lambda: arr(cpos(), cpos() + 1.5 * np.array(
                [-np.sin(ang.get_value()), np.cos(ang.get_value()), 0]), S_C, sw=7))
            sp = M(r"\text{speed} = 40\text{ km/h (constant)}", 34, color=INK)
            vv = M(r"\text{velocity: direction keeps changing}", 34, color=S_C)
            VGroup(sp, vv).arrange(DOWN, buff=0.4, aligned_edge=LEFT).move_to(P(3.4, 0.2))
            self.play(Create(road), run_time=0.6)
            self.add(car, vel)
            self.play(FadeIn(sp), run_time=0.5)
            self.play(ang.animate.set_value(PI / 2), FadeIn(vv), run_time=max(2.0, vo.duration * 0.55),
                      rate_func=linear)
            car.clear_updaters()
            vel.clear_updaters()
            track, sdot, slab, runner, trail, l1, l2 = road, car, vel, sp, vv, VGroup(), VGroup()

        with self.voiceover("A warning. Electric current flows along a wire, yet it is a scalar, because "
                            "currents at a junction add like plain numbers whatever the angle. The real test "
                            "for a vector is: do two of them combine by the arrow rule?") as vo:
            self.play(FadeOut(VGroup(track, sdot, slab, runner, trail, l1, l2)), run_time=0.6)
            j = P(-2.5, -0.2)
            w1 = Line(P(-6, 1.6), j, color=MUTED, stroke_width=6)
            w2 = Line(P(-6, -2.0), j, color=MUTED, stroke_width=6)
            w3 = Line(j, P(0.5, -0.2), color=MUTED, stroke_width=6)
            c1 = M(r"2\text{ A}", 34, color=A_C).next_to(w1.get_center(), UP, buff=0.25)
            c2 = M(r"3\text{ A}", 34, color=B_C).next_to(w2.get_center(), DOWN, buff=0.25)
            c3 = M(r"5\text{ A}", 34, color=S_C).next_to(w3.get_center(), UP, buff=0.25)
            self.play(Create(VGroup(w1, w2, w3)), FadeIn(Dot(j, color=INK)), run_time=0.8)
            self.play(FadeIn(c1), FadeIn(c2), run_time=0.6)
            self.play(FadeIn(c3, shift=0.2 * RIGHT), run_time=0.6)
            verdict = card(VGroup(
                T("Current has a direction along the wire,", 24),
                T("but adds like plain numbers → scalar", 24, color=A_C),
            ).arrange(DOWN, buff=0.12, aligned_edge=LEFT)).move_to(P(3.6, 1.5))
            test = card(T("Vector test: do two of them\ncombine by the arrow rule?", 28, color=S_C),
                        color=S_C).move_to(P(3.6, -1.7))
            self.play(FadeIn(verdict, shift=0.2 * UP), run_time=0.7)
            self.wait(max(0.1, vo.duration * 0.25))
            self.play(FadeIn(test, shift=0.2 * UP), run_time=0.7)
        self.header = header

    # ------------------------------------------------------------ scene 3: anatomy
    def s3(self):
        header = T("0.2 · Anatomy of an arrow", 30, weight="BOLD", color=MUTED).to_corner(UL, buff=0.4)
        A = P(-4, -1.5)
        B = P(-0.5, 0.9)
        v = arr(A, B, A_C, sw=8)
        dA = Dot(A, color=INK, radius=0.09)
        dB = Dot(B, color=INK, radius=0.09)
        lA = M("A", 38).next_to(dA, DL, buff=0.12)
        lB = M("B", 38).next_to(dB, UR, buff=0.12)
        tA = T("initial point (tail)", 22, color=MUTED).next_to(dA, DOWN, buff=0.45)
        tB = T("terminal point (tip)", 22, color=MUTED).next_to(dB, UP, buff=0.5)
        name = M(r"\overrightarrow{AB} = \vec a", 48, color=A_C).move_to(P(3.8, 2.3))

        with self.voiceover("Draw a vector as an arrow. It starts at the initial point, A, the tail, "
                            "and ends at the terminal point, B, the tip. We write it as vector A B, "
                            "or give it one letter, vector a.") as vo:
            self.play(FadeIn(header), run_time=0.5)
            self.play(FadeIn(dA), FadeIn(lA), run_time=0.5)
            self.play(GrowArrow(v), run_time=1.0)
            self.play(FadeIn(dB), FadeIn(lB), run_time=0.4)
            self.play(FadeIn(tA), FadeIn(tB), run_time=0.7)
            self.wait(max(0.1, vo.duration * 0.3))
            self.play(Write(name), run_time=1.0)

        with self.voiceover("Its length is the magnitude, written with bars. A magnitude is a distance, "
                            "so it is never negative. Reverse the arrow and you get vector B A: same length, "
                            "opposite direction, a different vector.") as vo:
            self.play(FadeOut(tA), FadeOut(tB), run_time=0.4)
            br = BraceBetweenPoints(A, B, direction=np.array([0.57, -0.82, 0]), color=MUTED)
            bl = M(r"|\vec a|", 38, color=A_C).next_to(br.get_center(), np.array([0.57, -0.82, 0]), buff=0.3)
            self.play(GrowFromCenter(br), FadeIn(bl), run_time=0.8)
            nn = card(M(r"|\vec a| \ge 0", 40)).move_to(P(3.8, 1.0))
            self.play(FadeIn(nn), run_time=0.6)
            self.wait(max(0.1, vo.duration * 0.2))
            off = np.array([-0.57, 0.82, 0]) * 0.9
            rev = arr(B + off, A + off, B_C, sw=8)
            rl = M(r"\overrightarrow{BA}", 38, color=B_C).next_to(rev.get_center(), np.array([-0.57, 0.82, 0]),
                                                                  buff=0.25)
            self.play(TransformFromCopy(v, rev), FadeIn(rl), run_time=1.0)
            eq = M(r"|\overrightarrow{AB}| = |\overrightarrow{BA}|", 38)
            ne = M(r"\overrightarrow{AB} \ne \overrightarrow{BA}", 38, color=WARN)
            VGroup(eq, ne).arrange(DOWN, buff=0.3).move_to(P(3.8, -1.2))
            self.play(FadeIn(eq), run_time=0.5)
            self.play(FadeIn(ne), run_time=0.5)

        with self.voiceover("Now slide the arrow somewhere else without turning or stretching it. "
                            "Is it still the same vector? Yes. Walk three kilometres north east is the same "
                            "instruction wherever you start. A vector is only its magnitude and direction. "
                            "That is a free vector.") as vo:
            self.play(FadeOut(VGroup(br, bl, nn, rev, rl, eq, ne, dA, dB, lA, lB, name)), run_time=0.6)
            vec = arr(P(-3, 0), P(-3, 0) + P(2.5, 1.7), A_C, sw=8)
            vl = M(r"\vec a", 40, color=A_C)
            vl.add_updater(lambda m: m.move_to(vec.get_center() + P(-0.3, 0.45)))
            self.play(ReplacementTransform(v, vec), run_time=0.8)
            self.add(vl)
            info = card(VGroup(M(r"|\vec a| \approx 3.0", 34), M(r"\text{angle} \approx 34^\circ", 34))
                        .arrange(DOWN, buff=0.15)).move_to(P(4.6, 2.2))
            self.play(FadeIn(info), run_time=0.5)
            ghosts = VGroup()
            for shift in (P(3.5, 1.2), P(1.0, -3.2), P(-2.5, 0.6)):
                g = vec.copy().set_opacity(0.25)
                ghosts.add(g)
                self.add(g)
                self.play(vec.animate.shift(shift), run_time=max(0.8, vo.duration * 0.12))
            vl.clear_updaters()
            free = card(T("Free vector: magnitude + direction only", 28, color=S_C), color=S_C)
            free.to_edge(DOWN, buff=0.4)
            self.play(FadeIn(free, shift=0.2 * UP), run_time=0.7)

    # ------------------------------------------------------------ scene 4: types
    def s4(self):
        header = T("0.3 · Types of vectors", 30, weight="BOLD", color=MUTED).to_corner(UL, buff=0.4)
        # panel 1: zero vector
        z = VGroup(Dot(P(-4.6, 0.8), color=INK, radius=0.12),
                   M(r"\vec 0", 44).move_to(P(-4.6, 1.6)))
        zc = T("zero: length 0", 26, color=MUTED).move_to(P(-4.6, -0.6))
        # panel 2: unit
        u = arr(P(-1.2, 0.8), P(0.2, 0.8), A_C)
        ub = Brace(Line(P(-1.2, 0.8), P(0.2, 0.8)), DOWN, color=MUTED)
        ubl = M("1", 32, color=MUTED).next_to(ub, DOWN, buff=0.1)
        ul = M(r"\hat a", 44, color=A_C).next_to(u, UP, buff=0.2)
        uc = T("unit: length exactly 1", 26, color=MUTED).move_to(P(-0.5, -0.6))
        # panel 3: co-initial
        o = P(3.4, 0.4)
        co = VGroup(arr(o, o + P(1.6, 0.9), A_C), arr(o, o + P(0.2, 1.6), B_C), arr(o, o + P(1.8, -0.4), S_C))
        cod = Dot(o, color=INK)
        coc = T("co-initial: same start", 26, color=MUTED).move_to(P(4.2, -0.6))

        with self.voiceover("A few kinds get names. The zero vector has length zero, a single dot. "
                            "A unit vector has length exactly one. Co-initial vectors share a starting point.") as vo:
            self.play(FadeIn(header), run_time=0.4)
            self.play(FadeIn(z), FadeIn(zc), run_time=0.7)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(GrowArrow(u), FadeIn(ul), FadeIn(ub), FadeIn(ubl), FadeIn(uc), run_time=0.9)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(FadeIn(cod), *[GrowArrow(a) for a in co], FadeIn(coc), run_time=0.9)

        with self.voiceover("Equal vectors have the same length and the same direction. They do not need to "
                            "start at the same point: opposite sides of a parallelogram are equal. "
                            "The negative of a has the same length, pointing the opposite way.") as vo:
            self.play(FadeOut(VGroup(z, zc, u, ub, ubl, ul, uc, co, cod, coc)), run_time=0.5)
            A, B, C, D = P(-5.5, -1.8), P(-2.0, -1.8), P(-1.0, 0.8), P(-4.5, 0.8)
            para = Polygon(A, B, C, D, color=MUTED, stroke_width=3)
            labs = VGroup(M("A", 34).next_to(A, DL, buff=0.1), M("B", 34).next_to(B, DR, buff=0.1),
                          M("C", 34).next_to(C, UR, buff=0.1), M("D", 34).next_to(D, UL, buff=0.1))
            ab = arr(A, B, A_C, sw=7)
            dc = arr(D, C, A_C, sw=7)
            self.play(Create(para), FadeIn(labs), run_time=0.8)
            self.play(GrowArrow(ab), GrowArrow(dc), run_time=0.8)
            eqn = M(r"\overrightarrow{AB} = \overrightarrow{DC}", 42, color=A_C).move_to(P(-3.3, 2.2))
            self.play(Write(eqn), run_time=0.8)
            self.wait(max(0.1, vo.duration * 0.3))
            na = arr(P(1.5, -0.6), P(3.3, 0.4), A_C, sw=7)
            nb = arr(P(5.8, 0.4), P(4.0, -0.6), B_C, sw=7)
            nal = M(r"\vec a", 40, color=A_C).next_to(na, UP, buff=0.15)
            nbl = M(r"-\vec a", 40, color=B_C).next_to(nb, UP, buff=0.15)
            self.play(GrowArrow(na), FadeIn(nal), run_time=0.6)
            self.play(GrowArrow(nb), FadeIn(nbl), run_time=0.6)
            neg_c = T("same length, opposite direction", 24, color=MUTED).move_to(P(3.7, -1.5))
            self.play(FadeIn(neg_c), run_time=0.5)

        with self.voiceover("Collinear, or parallel, vectors lie along the same or parallel lines. "
                            "Their lengths can differ, and they can point opposite ways. So parallel does not "
                            "mean same direction. Equal vectors are collinear, but collinear vectors need "
                            "not be equal.") as vo:
            self.clear_scene(0.5)
            self.add(header)
            rails = VGroup(*[DashedLine(P(-6, y), P(0.5, y), color=GRID, stroke_width=3)
                             for y in (1.3, 0.1, -1.1)])
            ar = VGroup(arr(P(-5.5, 1.3), P(-1.0, 1.3), A_C, sw=7),
                        arr(P(-4.0, 0.1), P(-2.4, 0.1), B_C, sw=7),
                        arr(P(-0.4, -1.1), P(-3.4, -1.1), S_C, sw=7))
            tag = T("all collinear (parallel)", 28, color=INK).move_to(P(-2.7, -2.2))
            self.play(Create(rails), run_time=0.6)
            self.play(LaggedStart(*[GrowArrow(a) for a in ar], lag_ratio=0.4), run_time=1.5)
            self.play(FadeIn(tag), run_time=0.5)
            wrong = M(r"\text{parallel} \Rightarrow \text{same direction}", 36).move_to(P(3.7, 1.6))
            self.play(FadeIn(wrong), run_time=0.6)
            self.wait(max(0.1, vo.duration * 0.2))
            self.play(Create(cross_out(wrong)), run_time=0.6)
            outer = Ellipse(width=4.6, height=2.6, color=S_C, stroke_width=3).move_to(P(3.7, -1.2))
            inner = Ellipse(width=2.0, height=1.1, color=A_C, stroke_width=3).move_to(P(4.3, -1.5))
            ol = T("collinear", 26, color=S_C).move_to(P(2.8, -0.4))
            il = T("equal", 24, color=A_C).move_to(inner.get_center())
            self.play(Create(outer), FadeIn(ol), run_time=0.7)
            self.play(Create(inner), FadeIn(il), run_time=0.7)

    # ------------------------------------------------------------ scene 5: addition
    def s5(self):
        header = T("0.4 · Adding arrows", 30, weight="BOLD", color=MUTED).to_corner(UL, buff=0.4)
        O = P(-5.0, -2.0)
        av = P(3.2, 0.6)
        bv = P(1.0, 2.4)
        a = arr(O, O + av, A_C, sw=7)
        al = M(r"\vec a", 40, color=A_C).next_to(a.get_center(), DOWN, buff=0.25)
        b = arr(P(-4.8, 0.6), P(-4.8, 0.6) + bv, B_C, sw=7)
        bl = M(r"\vec b", 40, color=B_C)
        bl.add_updater(lambda m: m.next_to(b.get_center(), RIGHT, buff=0.2))
        title = T("Triangle law: tip to tail", 30, color=S_C).move_to(P(3.8, 2.6))

        with self.voiceover("To add two vectors, place them tip to tail. Slide b so its tail sits on the tip "
                            "of a. The sum runs from the first tail to the last tip. That is the triangle law.") as vo:
            self.play(FadeIn(header), FadeIn(title), run_time=0.5)
            self.play(GrowArrow(a), FadeIn(al), run_time=0.7)
            self.play(GrowArrow(b), FadeIn(bl), run_time=0.7)
            self.wait(0.3)
            self.play(b.animate.shift(O + av - b.get_start()), run_time=1.4)
            s = arr(O, O + av + bv, S_C, sw=8)
            sl = M(r"\vec a + \vec b", 40, color=S_C).next_to(s.get_center(), UL, buff=0.1)
            self.play(GrowArrow(s), run_time=1.0)
            self.play(Write(sl), run_time=0.7)
            bl.clear_updaters()

        with self.voiceover("Or put both tails together and complete the parallelogram. Its diagonal is the "
                            "same sum. And since the parallelogram has both routes, a then b and b then a, "
                            "addition is commutative.") as vo:
            b2 = arr(O, O + bv, B_C, sw=7)
            b2l = M(r"\vec b", 40, color=B_C).next_to(b2.get_center(), LEFT, buff=0.2)
            self.play(FadeOut(title), run_time=0.3)
            t2 = T("Parallelogram law: tail to tail", 30, color=S_C).move_to(P(3.6, 2.6))
            self.play(FadeIn(t2), GrowArrow(b2), FadeIn(b2l), run_time=0.9)
            a2 = DashedVMobject(arr(O + bv, O + av + bv, A_C, sw=5), num_dashes=12)
            self.play(Create(a2), run_time=0.8)
            self.play(Indicate(s, color=HL), run_time=0.8)
            comm = card(M(r"\vec a + \vec b = \vec b + \vec a", 44)).move_to(P(3.6, 0.4))
            self.wait(max(0.1, vo.duration * 0.2))
            self.play(FadeIn(comm, shift=0.2 * UP), run_time=0.7)

        with self.voiceover("Chain more arrows the same way. If the chain comes back to where it started, "
                            "the sum is the zero vector. That is the polygon law.") as vo:
            self.clear_scene(0.5)
            self.add(header)
            pts = [P(-4.5, -2.0), P(-1.0, -2.3), P(0.3, 0.2), P(-2.0, 2.0), P(-5.3, 0.6)]
            names = "ABCDE"
            cols = [A_C, B_C, GREEN, ACCENT, S_C]
            dirs = [DL, DR, RIGHT, UP, LEFT]
            chain = VGroup()
            lab = VGroup(*[M(names[i], 36).next_to(pts[i], dirs[i], buff=0.15) for i in range(5)])
            self.play(FadeIn(lab), run_time=0.4)
            for i in range(4):
                ch = arr(pts[i], pts[i + 1], cols[i], sw=7)
                chain.add(ch)
                self.play(GrowArrow(ch), run_time=0.55)
            close = arr(pts[4], pts[0], cols[4], sw=7)
            self.play(GrowArrow(close), run_time=0.7)
            eq = M(r"\overrightarrow{AB} + \overrightarrow{BC} + \overrightarrow{CD} + \overrightarrow{DE}"
                   r" + \overrightarrow{EA} = \vec 0", 34).move_to(P(3.9, 0.4))
            if eq.width > 6.2:
                eq.scale_to_fit_width(6.2)
            back = T("back to the start → sum is zero", 26, color=S_C).next_to(eq, DOWN, buff=0.4)
            self.play(Write(eq), run_time=1.2)
            self.play(FadeIn(back), run_time=0.5)

        with self.voiceover("One trap. The size of a sum is not the sum of the sizes. The length of a plus b "
                            "is at most the length of a plus the length of b, with equality only when they "
                            "point the same way, and at least the difference of the lengths.") as vo:
            self.clear_scene(0.5)
            self.add(header)
            bad = M(r"|\vec a + \vec b| = |\vec a| + |\vec b|", 50).move_to(P(0, 1.6))
            self.play(FadeIn(bad), run_time=0.6)
            self.play(Create(cross_out(bad)), run_time=0.6)
            self.wait(max(0.1, vo.duration * 0.25))
            good = M(r"\big|\,|\vec a| - |\vec b|\,\big| \;\le\; |\vec a + \vec b| \;\le\; |\vec a| + |\vec b|",
                     50, color=S_C).move_to(P(0, -0.4))
            self.play(Write(good), run_time=1.5)
            n1 = T("equality on the right only when a and b point the same way", 26, color=MUTED)
            n1.next_to(good, DOWN, buff=0.5)
            self.play(FadeIn(n1), run_time=0.6)

        with self.voiceover("Here is a worked example. Forces of three newtons and five newtons act at sixty "
                            "degrees to each other. The cosine rule on the parallelogram gives R squared equals "
                            "nine plus twenty five plus two times three times five times cosine sixty, which is "
                            "forty nine. So the resultant is seven newtons, safely between two and eight.") as vo:
            self.clear_scene(0.5)
            self.add(header)
            O = P(-5.8, -2.1)
            f1 = 0.75 * P(3, 0)
            f2 = 0.75 * 5 * P(0.5, np.sqrt(3) / 2)
            F1 = arr(O, O + f1, A_C, sw=7)
            F2 = arr(O, O + f2, B_C, sw=7)
            RR = arr(O, O + f1 + f2, S_C, sw=8)
            g1 = DashedLine(O + f1, O + f1 + f2, color=MUTED, stroke_width=2)
            g2 = DashedLine(O + f2, O + f1 + f2, color=MUTED, stroke_width=2)
            L1 = M(r"3\text{ N}", 32, color=A_C).next_to(F1, DOWN, buff=0.15)
            L2 = M(r"5\text{ N}", 32, color=B_C).next_to(F2.get_center(), LEFT, buff=0.2)
            arc = Arc(radius=0.55, start_angle=0, angle=PI / 3, arc_center=O, color=HL, stroke_width=3)
            L3 = M(r"60^\circ", 28, color=HL).move_to(O + 1.25 * P(np.cos(0.33), np.sin(0.33)))
            self.play(GrowArrow(F1), GrowArrow(F2), FadeIn(L1), FadeIn(L2), Create(arc), FadeIn(L3),
                      run_time=1.0)
            self.play(Create(g1), Create(g2), run_time=0.6)
            self.play(GrowArrow(RR), run_time=0.8)
            lines = VGroup(
                M(r"R^2 = 3^2 + 5^2 + 2(3)(5)\cos 60^\circ", 38),
                M(r"= 9 + 25 + 15 = 49", 38),
                M(r"R = 7\text{ N}", 42, color=S_C),
                M(r"2 \le 7 \le 8 \;\checkmark", 34, color=GREEN),
            ).arrange(DOWN, buff=0.35, aligned_edge=LEFT).move_to(P(2.6, 0.2))
            for i, ln in enumerate(lines):
                self.play(Write(ln), run_time=0.9)
                self.wait(max(0.1, vo.duration * 0.12))

    # ------------------------------------------------------------ scene 6: subtract and scale
    def s6(self):
        header = T("0.5 · Subtraction and scalar multiples", 30, weight="BOLD", color=MUTED).to_corner(UL, buff=0.4)
        u = np.array([1.5, 0.6, 0])
        O1 = P(-5.5, 1.4)
        O2 = P(-3.0, -1.4)
        a = arr(O1, O1 + u, A_C, sw=7)
        al = M(r"\vec a", 40, color=A_C).next_to(a, UP, buff=0.15)
        rail = DashedLine(O2 - 1.9 * u, O2 + 2.4 * u, color=GRID, stroke_width=3)
        k = ValueTracker(1.0)

        def ka():
            kv = k.get_value()
            if abs(kv) < 0.08:
                return Dot(O2, color=S_C, radius=0.1)
            return arr(O2, O2 + kv * u, S_C, sw=8)

        kv_arrow = always_redraw(ka)
        o2d = Dot(O2, color=INK, radius=0.06)
        klab = M(r"k\vec a", 44, color=S_C).move_to(P(3.2, 2.2))
        kval = VGroup(M("k =", 44), DecimalNumber(1.0, num_decimal_places=1, font_size=44, color=S_C,
                                                   include_sign=True))
        kval.arrange(RIGHT, buff=0.2).move_to(P(3.2, 1.2))
        kval[1].add_updater(lambda m: m.set_value(k.get_value()))
        note = T("", 26)

        def say(s, col=MUTED):
            t = T(s, 28, color=col).move_to(P(3.2, 0.0))
            return t

        with self.voiceover("Multiply a by a number k. For k bigger than one it stretches. Between zero and one "
                            "it shrinks. At zero it collapses to the zero vector, and for negative k it flips "
                            "round and points the other way.") as vo:
            self.play(FadeIn(header), GrowArrow(a), FadeIn(al), run_time=0.7)
            self.play(Create(rail), FadeIn(o2d), FadeIn(klab), FadeIn(kval), run_time=0.6)
            self.add(kv_arrow)
            steps = [(2.0, "stretches"), (0.5, "shrinks"), (0.0, "zero vector"), (-1.5, "flips round")]
            per = max(0.8, (vo.duration - 1.6) / 4 - 0.5)
            for val, word in steps:
                new = say(word, S_C if val < 0 else MUTED)
                self.play(k.animate.set_value(val), FadeOut(note), FadeIn(new), run_time=per)
                note = new
                self.wait(0.4)
        kval[1].clear_updaters()
        kv_arrow.clear_updaters()

        with self.voiceover("Subtraction is adding the negative: a minus b is a plus negative b. "
                            "Draw a and b from one point. Then a minus b is the arrow from the tip of b "
                            "to the tip of a. Not from a to b. Check it: b plus a minus b lands on the tip of a.") as vo:
            self.clear_scene(0.5)
            self.add(header)
            dfn = M(r"\vec a - \vec b = \vec a + (-\vec b)", 44).move_to(P(3.3, 2.4))
            self.play(Write(dfn), run_time=1.0)
            O = P(-4.8, -2.0)
            A = O + P(4.2, 0.8)
            B = O + P(1.2, 3.2)
            va = arr(O, A, A_C, sw=7)
            vb = arr(O, B, B_C, sw=7)
            la = M(r"\vec a", 40, color=A_C).next_to(va.get_center(), DOWN, buff=0.2)
            lb = M(r"\vec b", 40, color=B_C).next_to(vb.get_center(), LEFT, buff=0.2)
            self.play(GrowArrow(va), GrowArrow(vb), FadeIn(la), FadeIn(lb), run_time=0.9)
            self.wait(max(0.1, vo.duration * 0.15))
            d = arr(B, A, S_C, sw=8)
            dl = M(r"\vec a - \vec b", 40, color=S_C).next_to(d.get_center(), UR, buff=0.1)
            self.play(GrowArrow(d), Write(dl), run_time=1.1)
            tipnote = card(T("from the tip of b to the tip of a", 26, color=S_C), color=S_C).move_to(P(3.3, 1.2))
            self.play(FadeIn(tipnote), run_time=0.6)
            self.wait(max(0.1, vo.duration * 0.1))
            self.play(Indicate(vb, color=HL), run_time=0.6)
            self.play(Indicate(d, color=HL), run_time=0.6)
            chk = M(r"\vec b + (\vec a - \vec b) = \vec a", 40).move_to(P(3.3, 0.0))
            self.play(Write(chk), run_time=0.9)

        with self.voiceover("And two vectors are collinear exactly when one is a scalar multiple of the other: "
                            "b equals lambda times a.") as vo:
            crit = card(M(r"\vec a \parallel \vec b \iff \vec b = \lambda\,\vec a \quad (\vec a \ne \vec 0)", 40),
                        color=S_C).move_to(P(2.8, -1.6))
            self.play(FadeIn(crit, shift=0.2 * UP), run_time=0.8)

        with self.voiceover("Put it together on a parallelogram A B C D, with sides a and b from A. "
                            "One diagonal, A C, is a plus b. The other, B D, runs from the tip of a to the tip of b, "
                            "so it is b minus a. Every result in this chapter came from pictures like this, "
                            "with no coordinates at all.") as vo:
            self.clear_scene(0.5)
            self.add(header)
            A = P(-5.4, -2.0)
            av = P(4.0, 0.0)
            bv = P(1.4, 3.0)
            B, C, D = A + av, A + av + bv, A + bv
            para = Polygon(A, B, C, D, color=MUTED, stroke_width=2)
            va = arr(A, B, A_C, sw=7)
            vb = arr(A, D, B_C, sw=7)
            labs = VGroup(M("A", 34).next_to(A, DL, buff=0.1), M("B", 34).next_to(B, DR, buff=0.1),
                          M("C", 34).next_to(C, UR, buff=0.1), M("D", 34).next_to(D, UL, buff=0.1))
            la = M(r"\vec a", 38, color=A_C).next_to(va, DOWN, buff=0.15)
            lb = M(r"\vec b", 38, color=B_C).next_to(vb.get_center(), LEFT, buff=0.2)
            self.play(Create(para), GrowArrow(va), GrowArrow(vb), FadeIn(labs), FadeIn(la), FadeIn(lb),
                      run_time=1.0)
            ac = arr(A, C, S_C, sw=7)
            bd = arr(B, D, HL, sw=7)
            e1 = M(r"\overrightarrow{AC} = \vec a + \vec b", 42, color=S_C)
            e2 = M(r"\overrightarrow{BD} = \vec b - \vec a", 42, color=HL)
            VGroup(e1, e2).arrange(DOWN, buff=0.5, aligned_edge=LEFT).move_to(P(3.6, 0.6))
            self.wait(max(0.1, vo.duration * 0.12))
            self.play(GrowArrow(ac), Write(e1), run_time=1.0)
            self.wait(max(0.1, vo.duration * 0.15))
            self.play(GrowArrow(bd), Write(e2), run_time=1.0)

    # ------------------------------------------------------------ scene 7: recap
    def s7(self):
        header = T("Chapter 0 · Recap", 36, weight="BOLD", color=PRIMARY).to_edge(UP, buff=0.5)
        items = [
            "A vector = magnitude + direction, drawn anywhere",
            "Add: tip to tail (triangle, parallelogram, polygon)",
            "Subtract: from the tip of b to the tip of a",
            "Scale: k stretches, shrinks, or flips",
        ]
        rows = VGroup()
        for s in items:
            row = VGroup(check(), T(s, 30)).arrange(RIGHT, buff=0.3)
            rows.add(row)
        rows.arrange(DOWN, buff=0.45, aligned_edge=LEFT).move_to(P(0, 0.2))
        nxt = card(T("Next: Vectors in Coordinates", 30, color=S_C), color=S_C).to_edge(DOWN, buff=0.6)
        with self.voiceover("A vector is a magnitude and a direction, and it can be drawn anywhere. "
                            "Add tip to tail. Subtract by going from the tip of b to the tip of a. "
                            "Scale by stretching and flipping. And no coordinates needed yet. "
                            "Next chapter, we pin arrows to a grid and turn them into numbers.") as vo:
            self.play(FadeIn(header), run_time=0.5)
            per = max(0.6, vo.duration * 0.14)
            for r in rows:
                self.play(FadeIn(r[1], shift=0.2 * RIGHT), run_time=0.5)
                self.play(FadeIn(r[0], scale=0.5), run_time=0.3)
                self.wait(per)
            self.play(FadeIn(nxt, shift=0.2 * UP), run_time=0.7)
