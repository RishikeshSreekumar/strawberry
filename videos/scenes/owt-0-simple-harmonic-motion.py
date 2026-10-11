import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F403
from strawberry import *  # noqa: E402,F403

import numpy as np  # noqa: E402

# Chapter colour roles (light background).
X_C = SECONDARY  # displacement x = teal
V_C = GREEN  # velocity
A_C = PRIMARY  # acceleration / restoring force = strawberry red
KE_C = ACCENT  # kinetic energy = amber
PE_C = PURPLE  # potential energy = purple
HL = ManimColor("#D19A00")  # highlight gold
WARN = PRIMARY
BLOCK_FILL = ManimColor("#F3D9C9")
WATER = ManimColor("#9CCFD8")


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
                 max_tip_length_to_length_ratio=0.25, max_stroke_width_to_length_ratio=12)


def check():
    return MathTex(r"\checkmark", color=GREEN, font_size=56)


def cross_mark():
    return MathTex(r"\times", color=WARN, font_size=64)


def P(x, y):
    return np.array([x, y, 0.0])


def spring(a, b, coils=8, amp=0.16, color=INK, sw=3):
    """Zigzag spring from point a to point b."""
    a = np.array(a, dtype=float)
    b = np.array(b, dtype=float)
    d = b - a
    L = np.linalg.norm(d)
    u = d / L
    n = np.array([-u[1], u[0], 0.0])
    lead = min(0.2, 0.15 * L)
    pts = [a, a + lead * u]
    m = coils * 2
    for i in range(m):
        s = lead + (L - 2 * lead) * (i + 0.5) / m
        pts.append(a + s * u + (amp if i % 2 == 0 else -amp) * n)
    pts += [b - lead * u, b]
    return VMobject(color=color, stroke_width=sw).set_points_as_corners(pts)


def block(center, w=0.9, h=0.9):
    return Rectangle(width=w, height=h, color=INK, stroke_width=3).set_fill(BLOCK_FILL, 1).move_to(center)


def wall(x, y0, y1, side=LEFT):
    ln = Line(P(x, y0), P(x, y1), color=INK, stroke_width=5)
    s = -1 if np.allclose(side, LEFT) else 1
    n = int((y1 - y0) / 0.22)
    hatch = VGroup(*[Line(P(x, y0 + 0.22 * (i + 1)), P(x + s * 0.22, y0 + 0.22 * i), color=MUTED, stroke_width=2)
                     for i in range(n)])
    return VGroup(ln, hatch)


class OwtCh0Video(NarratedScene):
    def construct(self):
        self.title_card(
            "Oscillations, Waves & Thermal Physics",
            "Chapter 0 · Simple Harmonic Motion",
            "Chapter zero. Simple harmonic motion.",
        )
        for part in (self.s1, self.s2, self.s3, self.s4, self.s5, self.s6, self.s7, self.s8):
            part()
            self.clear_all()

    # ------------------------------------------------------------ helpers
    def clear_all(self, run_time=0.6):
        for m in self.mobjects:
            m.clear_updaters()
        self.clear_scene(run_time)

    def run(self, tracker, seconds):
        """Advance a time tracker linearly for `seconds` of screen time."""
        if seconds > 0.1:
            self.play(tracker.animate.increment_value(seconds), run_time=seconds, rate_func=linear)

    def left(self, vo, t0, reserve=0.0):
        return vo.duration - (self.renderer.time - t0) - reserve

    # ------------------------------------------------------------ scene 1: what makes something oscillate
    def s1(self):
        fy = -1.9
        X0, A, w = -1.6, 1.9, 2.4
        tt = ValueTracker(0)

        def bx():
            return X0 + A * np.cos(w * tt.get_value())

        wl = wall(-6.2, fy, fy + 1.5)
        floor = Line(P(-6.2, fy), P(5.0, fy), color=MUTED, stroke_width=3)
        blk = always_redraw(lambda: block(P(bx(), fy + 0.45)))
        spr = always_redraw(lambda: spring(P(-6.2, fy + 0.45), P(bx() - 0.45, fy + 0.45), coils=9))
        eq = DashedLine(P(X0, fy - 0.05), P(X0, fy + 1.9), color=MUTED, stroke_width=3)
        eql = M("x = 0", 30, color=MUTED).next_to(eq, UP, buff=0.1)

        def farrow():
            x = bx() - X0
            if abs(x) < 0.12:
                return VectorizedPoint(P(bx(), fy + 1.25))
            return vec(P(bx(), fy + 1.25), P(bx() - 0.75 * x, fy + 1.25), A_C, sw=5)

        F = always_redraw(farrow)
        Fl = M(r"F = -kx", 34, color=A_C).move_to(P(3.6, fy + 1.25))

        with self.voiceover("Pull a block on a spring and let go. It rushes back, overshoots, and"
                            " swings to and fro. A twanged ruler, a swing and a bobbing boat all "
                            "do the same.") as vo:
            t0 = self.renderer.time
            self.play(Create(floor), FadeIn(wl), run_time=0.8)
            self.play(FadeIn(spr), FadeIn(blk), Create(eq), FadeIn(eql), run_time=0.8)
            self.run(tt, self.left(vo, t0))

        r1 = T("1. a stable equilibrium: nudge it, and the force pushes back", 28).move_to(P(0, 3.2))
        r2 = T("2. inertia: it arrives moving, so it overshoots", 28).next_to(r1, DOWN, buff=0.3)
        VGroup(r1, r2).arrange(DOWN, aligned_edge=LEFT, buff=0.3).move_to(P(0, 2.9))
        with self.voiceover("Two ingredients make this happen: a stable equilibrium, where a "
                            "nudge brings a force pushing back, and inertia, which carries the "
                            "block straight past the middle. The spring's force is minus k x.") as vo:
            t0 = self.renderer.time
            self.add(F)
            self.play(FadeIn(r1, shift=0.15 * UP), run_time=0.7)
            self.run(tt, vo.duration * 0.3)
            self.play(FadeIn(r2, shift=0.15 * UP), run_time=0.7)
            self.run(tt, vo.duration * 0.15)
            self.play(FadeIn(Fl), run_time=0.6)
            self.run(tt, self.left(vo, t0))

        # potential-energy valley
        ax = Axes(x_range=[-1.7, 1.7, 1], y_range=[-1.3, 1.3, 1], x_length=5.8, y_length=4.2, tips=False,
                  axis_config={"color": MUTED, "stroke_width": 2}).move_to(P(-3.5, -0.4))
        U = ax.plot(lambda x: x ** 4 - 2 * x ** 2, x_range=[-1.55, 1.55], color=INK, stroke_width=4)
        par = ax.plot(lambda x: -1 + 4 * (x - 1) ** 2, x_range=[0.47, 1.53], color=ACCENT, stroke_width=5)
        par = DashedVMobject(par, num_dashes=18)
        Ul = M("U(x)", 32).next_to(ax.y_axis, UP, buff=0.1)
        xl = M("x", 32).next_to(ax.x_axis, RIGHT, buff=0.1)
        mn = Dot(ax.c2p(1, -1), color=A_C, radius=0.08)
        mnl = T("stable minimum", 22, color=A_C).next_to(mn, DOWN, buff=0.15)
        u1 = M(r"U \approx U_{\min} + \tfrac12 k\,(x - x_0)^2", 40).move_to(P(3.4, 1.4))
        u1n = T("every smooth valley is a parabola at the bottom", 22, color=MUTED).next_to(u1, DOWN, buff=0.2)
        u2 = M(r"F = -\frac{dU}{dx} = -k\,(x - x_0)", 40).move_to(P(3.4, -0.4))
        with self.voiceover("Why minus k x? Equilibrium sits at the bottom of a potential energy "
                            "valley, and the bottom of any smooth valley looks like a parabola, "
                            "one half k x squared. Its slope gives a force of minus k x.") as vo:
            for m in (F, blk, spr):
                m.clear_updaters()
            self.play(*[FadeOut(m) for m in self.mobjects], run_time=0.6)
            self.play(Create(ax), FadeIn(Ul), FadeIn(xl), run_time=0.8)
            self.play(Create(U), run_time=1.2)
            self.play(FadeIn(mn), FadeIn(mnl), run_time=0.5)
            self.wait(vo.duration * 0.15)
            self.play(Create(par), run_time=0.9)
            self.play(Write(u1), FadeIn(u1n), run_time=1.2)
            self.play(Write(u2), run_time=1.0)

        with self.voiceover("Put that into Newton's second law: acceleration equals minus omega "
                            "squared x, with omega equal to root k over m. That is the one test "
                            "for S H M.") as vo:
            self.play(FadeOut(u1), FadeOut(u1n), FadeOut(u2), run_time=0.5)
            n1 = M(r"m\,\frac{d^2x}{dt^2} = -kx", 44).move_to(P(3.4, 2.3))
            n2 = M(r"a = -\omega^2 x", 64, color=A_C).move_to(P(3.4, 0.0))
            n3 = M(r"\omega = \sqrt{k/m}", 44).move_to(P(3.4, -1.3))
            bx2 = SurroundingRectangle(n2, buff=0.25, corner_radius=0.15, color=PRIMARY, stroke_width=3)
            tag = T("the SHM test", 26, color=PRIMARY, weight="BOLD").next_to(bx2, UP, buff=0.15)
            self.play(Write(n1), run_time=1.0)
            self.wait(vo.duration * 0.15)
            self.play(Write(n2), run_time=1.0)
            self.play(Write(n3), run_time=0.8)
            self.play(Create(bx2), FadeIn(tag), run_time=0.7)

        with self.voiceover("Test four forces. Minus four x passes. Minus four x cubed pulls "
                            "back, but its period depends on amplitude, so it is not S H M. Minus"
                            " four times x minus two is S H M about x equals two. Plus four x "
                            "pushes away: no oscillation.") as vo:
            self.clear_all(0.5)
            hdr = T("Which forces give SHM?   (m = 1 kg)", 32, color=PRIMARY, weight="BOLD").move_to(P(0, 3.1))
            rows = [
                (r"F = -4x", True, r"\omega = 2\ \text{rad/s}"),
                (r"F = -4x^3", False, r"\text{oscillates, but } T \text{ depends on } A"),
                (r"F = -4(x - 2)", True, r"\text{SHM about } x = 2"),
                (r"F = +4x", False, r"\text{pushes away: no oscillation}"),
            ]
            grp = VGroup()
            for i, (f, ok, note) in enumerate(rows):
                y = 1.7 - 1.25 * i
                fm = M(f, 44).move_to(P(-3.8, y))
                mk = (check() if ok else cross_mark()).move_to(P(-1.3, y))
                nm = M(note, 36, color=GREEN if ok else WARN)
                nm.move_to(P(-0.6, y), aligned_edge=LEFT)
                grp.add(VGroup(fm, mk, nm))
            self.play(FadeIn(hdr), run_time=0.5)
            for i, g in enumerate(grp):
                self.play(FadeIn(g[0]), run_time=0.4)
                self.play(FadeIn(g[1]), FadeIn(g[2]), run_time=0.6)
                self.wait(vo.duration * 0.12)

    # ------------------------------------------------------------ scene 2: shadow of a turning arrow
    def s2(self):
        C = P(-4.3, 1.3)
        R = 1.5
        th = ValueTracker(0)
        sy = -0.85  # shadow line
        by = -2.55  # block line

        def peg():
            v = th.get_value()
            return C + R * np.array([np.cos(v), np.sin(v), 0])

        circ = Circle(radius=R, color=MUTED, stroke_width=3).move_to(C)
        cdot = Dot(C, radius=0.05, color=MUTED)
        arm = always_redraw(lambda: Line(C, peg(), color=INK, stroke_width=4))
        pegd = always_redraw(lambda: Dot(peg(), radius=0.1, color=A_C))
        sline = Line(P(C[0] - R - 0.3, sy), P(C[0] + R + 0.3, sy), color=GRID, stroke_width=4)
        ray = always_redraw(lambda: DashedLine(peg(), P(peg()[0], sy), color=MUTED, stroke_width=2))
        shadow = always_redraw(lambda: Dot(P(peg()[0], sy), radius=0.1, color=X_C))
        lamp = T("light from above", 20, color=MUTED).next_to(circ, UP, buff=0.15)
        wl = wall(-6.6, by - 0.35, by + 0.45)
        flo = Line(P(-6.6, by - 0.35), P(-2.3, by - 0.35), color=MUTED, stroke_width=2)
        blk = always_redraw(lambda: block(P(peg()[0], by + 0.0), 0.6, 0.6))
        spr = always_redraw(lambda: spring(P(-6.6, by), P(peg()[0] - 0.3, by), coils=7, amp=0.12))

        with self.voiceover("Shine a light on a peg going round a turntable at a steady rate. Its"
                            " shadow slides to and fro: slow at the ends, fast in the middle.") as vo:
            t0 = self.renderer.time
            self.play(Create(circ), FadeIn(cdot), FadeIn(arm), FadeIn(pegd), run_time=0.9)
            self.play(Create(sline), FadeIn(ray), FadeIn(shadow), FadeIn(lamp), run_time=0.7)
            self.run(th, self.left(vo, t0))

        ax_eq = M(r"a_x = -\omega^2 A\cos\theta = -\omega^2 x", 40).move_to(P(2.9, 2.9))
        with self.voiceover("A block on a spring, tuned to match, moves in perfect step. The "
                            "peg's acceleration, projected onto the line, is minus omega squared "
                            "x: the same test.") as vo:
            t0 = self.renderer.time
            self.play(FadeIn(wl), Create(flo), FadeIn(spr), FadeIn(blk), run_time=0.8)
            self.run(th, vo.duration * 0.3)
            self.play(Write(ax_eq), run_time=1.2)
            self.run(th, self.left(vo, t0))
        # bring the angle back to a whole number of turns so the graph can start at zero
        k = np.ceil(th.get_value() / TAU)
        self.play(th.animate.set_value(k * TAU), run_time=0.6)
        th.set_value(0)

        ax = Axes(x_range=[0, 4 * PI, PI], y_range=[-1.6, 1.6, 1], x_length=6.6, y_length=2.8, tips=False,
                  axis_config={"color": MUTED, "stroke_width": 2}).move_to(P(3.3, 0.7))
        xlab = M("x", 32, color=X_C).next_to(ax.y_axis, UP, buff=0.1)
        tlab = M("t", 32).next_to(ax.x_axis, RIGHT, buff=0.1)
        curve = always_redraw(lambda: ax.plot(lambda s: 1.5 * np.cos(s), x_range=[0, max(th.get_value(), 0.02)],
                                              color=X_C, stroke_width=4))
        tip = always_redraw(lambda: Dot(ax.c2p(th.get_value(), 1.5 * np.cos(th.get_value())), radius=0.07,
                                        color=X_C))
        eq1 = M(r"x = A\cos(\omega t + \phi)", 52).move_to(P(3.3, -1.4))
        eq2 = M(r"T = \frac{2\pi}{\omega}, \qquad f = \frac{1}{T}", 40).move_to(P(3.3, -2.7))
        Al = M("A", 32, color=INK).move_to(C + P(0.75, -0.25))
        with self.voiceover("So x equals A cos of omega t plus phi. A is the radius, the "
                            "amplitude. The arrow's angle is the phase. One turn takes T equals "
                            "two pi over omega.") as vo:
            t0 = self.renderer.time
            self.play(FadeOut(ax_eq), Create(ax), FadeIn(xlab), FadeIn(tlab), run_time=0.8)
            self.add(curve, tip)
            self.play(FadeIn(Al), Write(eq1), run_time=1.2)
            self.play(th.animate.set_value(2 * PI), run_time=max(1.0, vo.duration * 0.4), rate_func=linear)
            self.play(Write(eq2), run_time=1.0)
            self.play(th.animate.set_value(4 * PI), run_time=max(1.5, self.left(vo, t0)), rate_func=linear)
        for m in (curve, tip):
            m.clear_updaters()

        with self.voiceover("Equal angles take equal times; equal distances do not. From the end "
                            "to half way the arrow turns sixty degrees, a sixth of a period. From"
                            " half way to the middle, only thirty: a twelfth.") as vo:
            for m in (blk, spr):
                m.clear_updaters()
            self.play(*[FadeOut(m) for m in (ax, xlab, tlab, curve, tip, eq1, eq2, wl, flo, blk, spr, Al, lamp)],
                      run_time=0.6)
            th.set_value(0)
            arc1 = Arc(radius=R, start_angle=0, angle=PI / 3, arc_center=C, color=ACCENT, stroke_width=10)
            arc2 = Arc(radius=R, start_angle=PI / 3, angle=PI / 6, arc_center=C, color=PURPLE, stroke_width=10)
            seg1 = Line(P(C[0] + R, sy), P(C[0] + R / 2, sy), color=ACCENT, stroke_width=10)
            seg2 = Line(P(C[0] + R / 2, sy), P(C[0], sy), color=PURPLE, stroke_width=10)
            ticks = VGroup(*[M(s, 28).next_to(P(C[0] + d, sy), DOWN, buff=0.18)
                             for s, d in ((r"A", R), (r"\tfrac{A}{2}", R / 2), (r"0", 0))])
            l1 = M(r"60^\circ", 30, color=ACCENT).move_to(C + 1.95 * np.array([np.cos(PI / 6), np.sin(PI / 6), 0]))
            l2 = M(r"30^\circ", 30, color=PURPLE).move_to(C + 1.95 * np.array([np.cos(5 * PI / 12),
                                                                              np.sin(5 * PI / 12), 0]))
            self.play(FadeIn(ticks), run_time=0.5)
            t1 = M(r"A \to \tfrac{A}{2}:\quad 60^\circ \;\Rightarrow\; \tfrac{T}{6}", 44, color=ACCENT)
            t2 = M(r"\tfrac{A}{2} \to 0:\quad 30^\circ \;\Rightarrow\; \tfrac{T}{12}", 44, color=PURPLE)
            t3 = T("equal distances, unequal times", 28, color=MUTED)
            col = VGroup(t1, t2, t3).arrange(DOWN, buff=0.45, aligned_edge=LEFT).move_to(P(2.8, 0.6))
            self.wait(vo.duration * 0.1)
            self.play(th.animate.set_value(PI / 3), Create(arc1), Create(seg1), run_time=1.4)
            self.play(FadeIn(l1), Write(t1), run_time=0.9)
            self.wait(vo.duration * 0.1)
            self.play(th.animate.set_value(PI / 2), Create(arc2), Create(seg2), run_time=1.0)
            self.play(FadeIn(l2), Write(t2), run_time=0.9)
            self.play(FadeIn(t3), run_time=0.6)

        with self.voiceover("So phase is not an angle in space. It says where in the cycle the "
                            "motion is.") as vo:
            self.play(FadeOut(t3), run_time=0.3)
            ph = card(M(r"\text{phase } = \omega t + \phi:\ \text{where in the cycle}", 38), color=HL)
            ph.move_to(P(2.8, -2.0))
            fit(ph, 7.4)
            self.wait(vo.duration * 0.25)
            self.play(FadeIn(ph, shift=0.15 * UP), run_time=0.8)

    # ------------------------------------------------------------ scene 3: speed, acceleration, energy
    def s3(self):
        A, w = 1.5, 1.2
        Tp = TAU / w
        tt = ValueTracker(0)
        X0 = -3.6
        by = 1.1

        def c():
            return np.cos(w * tt.get_value())

        def s():
            return np.sin(w * tt.get_value())

        def bx():
            return X0 + A * c()

        wl = wall(-6.6, by - 0.45, by + 0.45)
        flo = Line(P(-6.6, by - 0.45), P(-1.1, by - 0.45), color=MUTED, stroke_width=2)
        blk = always_redraw(lambda: block(P(bx(), by), 0.7, 0.7))
        spr = always_redraw(lambda: spring(P(-6.6, by), P(bx() - 0.35, by), coils=7, amp=0.13))
        eq = DashedLine(P(X0, by - 0.5), P(X0, by + 1.4), color=MUTED, stroke_width=2)

        def varrow():
            v = -A * w * s()
            if abs(v) < 0.08:
                return VectorizedPoint(P(bx(), by + 0.65))
            return vec(P(bx(), by + 0.65), P(bx() + 0.6 * v, by + 0.65), V_C, sw=5)

        def aarrow():
            a = -A * w * w * c()
            if abs(a) < 0.08:
                return VectorizedPoint(P(bx(), by - 0.75))
            return vec(P(bx(), by - 0.75), P(bx() + 0.5 * a, by - 0.75), A_C, sw=5)

        va = always_redraw(varrow)
        aa = always_redraw(aarrow)
        vlab = M("v", 30, color=V_C).move_to(P(-6.2, by + 0.95))
        alab = M("a", 30, color=A_C).move_to(P(-6.2, by - 1.05))
        f1 = M(r"|v| = \omega\sqrt{A^2 - x^2}", 42, color=V_C).move_to(P(-3.6, 3.3))
        f2 = M(r"a = -\omega^2 x", 42, color=A_C).move_to(P(-3.6, -0.6))

        with self.voiceover("The speed at any position is omega root A squared minus x squared: "
                            "fastest in the middle, zero at the ends. The acceleration, minus "
                            "omega squared x, is the opposite.") as vo:
            t0 = self.renderer.time
            self.play(FadeIn(wl), Create(flo), FadeIn(spr), FadeIn(blk), Create(eq), run_time=0.8)
            self.add(va, aa)
            self.play(FadeIn(vlab), FadeIn(alab), Write(f1), run_time=1.0)
            self.run(tt, vo.duration * 0.3)
            self.play(Write(f2), run_time=0.8)
            self.run(tt, self.left(vo, t0))

        # three stacked graphs
        gs = VGroup()
        funcs = [(lambda t: A * np.cos(w * t), X_C, "x"), (lambda t: -A * np.sin(w * t), V_C, "v"),
                 (lambda t: -A * np.cos(w * t), A_C, "a")]
        for i, (fn, col, lab) in enumerate(funcs):
            ax = Axes(x_range=[0, 2 * Tp, Tp / 2], y_range=[-1.7, 1.7, 10], x_length=5.6, y_length=1.35, tips=False,
                      axis_config={"color": MUTED, "stroke_width": 2}).move_to(P(3.6, 2.4 - 1.75 * i))
            cv = ax.plot(fn, x_range=[0, 2 * Tp], color=col, stroke_width=4)
            lb = M(lab, 34, color=col).next_to(ax, LEFT, buff=0.2)
            gs.add(VGroup(ax, cv, lb))
        base = gs[0][0]
        sweep = always_redraw(lambda: Line(base.c2p(tt.get_value() % (2 * Tp), 0) + 1.0 * UP,
                                           base.c2p(tt.get_value() % (2 * Tp), 0) + (1.0 + 2 * 1.75) * DOWN,
                                           color=HL, stroke_width=3))
        n1 = T("v leads x by a quarter cycle", 24, color=V_C).move_to(P(3.6, -3.05))
        n2 = T("a is x upside down", 24, color=A_C).move_to(P(3.6, -3.5))
        with self.voiceover("So velocity and acceleration are never largest together. Velocity "
                            "leads displacement by a quarter cycle, and acceleration is "
                            "displacement upside down.") as vo:
            t0 = self.renderer.time
            self.play(LaggedStart(*[FadeIn(g) for g in gs], lag_ratio=0.3), run_time=1.2)
            self.add(sweep)
            self.run(tt, vo.duration * 0.25)
            self.play(FadeIn(n1), run_time=0.5)
            self.run(tt, vo.duration * 0.2)
            self.play(FadeIn(n2), run_time=0.5)
            self.run(tt, self.left(vo, t0))

        # energy bars
        b0 = -3.5
        H = 1.9

        def bar(x, frac, col):
            h = max(H * frac, 0.001)
            return Rectangle(width=0.6, height=h, stroke_width=0).set_fill(col, 0.9).move_to(
                P(x, b0 + h / 2))

        ke = always_redraw(lambda: bar(-5.2, s() ** 2, KE_C))
        pe = always_redraw(lambda: bar(-4.3, c() ** 2, PE_C))
        tot = Rectangle(width=0.6, height=H, stroke_width=0).set_fill(INK, 0.25).move_to(P(-3.4, b0 + H / 2))
        base_l = Line(P(-5.7, b0), P(-2.9, b0), color=MUTED, stroke_width=2)
        bl = VGroup(T("KE", 22, color=KE_C).move_to(P(-5.2, b0 - 0.25)),
                    T("PE", 22, color=PE_C).move_to(P(-4.3, b0 - 0.25)),
                    T("total", 22, color=MUTED).move_to(P(-3.4, b0 - 0.25)))
        ef = M(r"\tfrac12 mv^2 + \tfrac12 kx^2 = \tfrac12 kA^2", 34).move_to(P(-3.6, -0.75))
        e2 = T("KE and PE oscillate at 2ω", 24, color=MUTED).move_to(P(-3.6, -1.25))
        with self.voiceover("Kinetic plus potential energy stays fixed at one half k A squared. "
                            "Kinetic peaks at each pass through the middle, twice per cycle, so "
                            "both energies oscillate at two omega.") as vo:
            t0 = self.renderer.time
            self.play(FadeOut(f2), FadeOut(n1), FadeOut(n2), run_time=0.4)
            self.play(FadeIn(base_l), FadeIn(ke), FadeIn(pe), FadeIn(tot), FadeIn(bl), run_time=0.8)
            self.play(Write(ef), run_time=1.0)
            self.run(tt, vo.duration * 0.35)
            self.play(FadeIn(e2), run_time=0.5)
            self.run(tt, self.left(vo, t0))

        with self.voiceover("Where is kinetic equal to potential? Not at half the amplitude: there the potential "
                            "energy is only a quarter of the total. They are equal at A over root two.") as vo:
            self.clear_all(0.5)
            hdr = T("Where does the energy sit?", 34, color=PRIMARY, weight="BOLD").move_to(P(0, 3.0))
            heads = VGroup(M(r"x", 40), M(r"\text{KE}", 40, color=KE_C), M(r"\text{PE}", 40, color=PE_C))
            data = [("0", "E", "0"), (r"\tfrac{A}{2}", r"\tfrac34 E", r"\tfrac14 E"),
                    (r"\tfrac{A}{\sqrt2}", r"\tfrac12 E", r"\tfrac12 E"), ("A", "0", "E")]
            xs = (-3.0, 0.0, 3.0)
            rowsg = VGroup()
            for j, hm in enumerate(heads):
                hm.move_to(P(xs[j], 1.9))
            line = Line(P(-4.2, 1.45), P(4.2, 1.45), color=MUTED, stroke_width=2)
            for i, r in enumerate(data):
                g = VGroup(*[M(v, 42).move_to(P(xs[j], 0.85 - 0.95 * i)) for j, v in enumerate(r)])
                rowsg.add(g)
            self.play(FadeIn(hdr), FadeIn(heads), Create(line), run_time=0.6)
            self.play(LaggedStart(*[FadeIn(r) for r in rowsg], lag_ratio=0.25), run_time=1.4)
            hb = SurroundingRectangle(rowsg[1], buff=0.12, color=WARN, stroke_width=3)
            hg = SurroundingRectangle(rowsg[2], buff=0.12, color=GREEN, stroke_width=3)
            nb = T("not here", 24, color=WARN).next_to(hb, RIGHT, buff=0.25)
            ng = T("KE = PE", 24, color=GREEN).next_to(hg, RIGHT, buff=0.25)
            self.wait(vo.duration * 0.1)
            self.play(Create(hb), FadeIn(nb), run_time=0.7)
            self.wait(vo.duration * 0.15)
            self.play(Create(hg), FadeIn(ng), run_time=0.7)

    # ------------------------------------------------------------ scene 4: springs
    def s4(self):
        top = M(r"T = 2\pi\sqrt{\frac{m}{k_{\text{eff}}}}", 54).move_to(P(0, 2.7))
        with self.voiceover("Every spring system has T equals two pi root m over k. The skill is "
                            "finding the effective k.") as vo:
            self.play(Write(top), run_time=1.2)
            self.play(Indicate(top, color=PRIMARY, scale_factor=1.08), run_time=0.9)

        # parallel (left) and series (right)
        y = 0.6
        wl1 = wall(-6.4, y - 0.7, y + 0.7)
        b1 = block(P(-3.0, y), 0.8, 1.2)
        s1a = spring(P(-6.4, y + 0.35), P(-3.4, y + 0.35), coils=7, amp=0.12, color=SECONDARY)
        s1b = spring(P(-6.4, y - 0.35), P(-3.4, y - 0.35), coils=7, amp=0.12, color=PURPLE)
        p_t = T("parallel", 28, color=PRIMARY, weight="BOLD").move_to(P(-4.6, y + 1.2))
        p_n = T("same stretch, forces add", 24, color=MUTED).move_to(P(-4.6, y - 1.05))
        p_f = M(r"k_{\text{eff}} = k_1 + k_2", 42).move_to(P(-4.6, y - 1.75))

        wl2 = wall(0.9, y - 0.6, y + 0.6)
        s2a = spring(P(0.9, y), P(3.1, y), coils=5, amp=0.12, color=SECONDARY)
        jd = Dot(P(3.1, y), radius=0.06, color=INK)
        s2b = spring(P(3.1, y), P(5.3, y), coils=5, amp=0.12, color=PURPLE)
        b2 = block(P(5.7, y), 0.8, 0.8)
        s_t = T("series", 28, color=PRIMARY, weight="BOLD").move_to(P(3.4, y + 1.2))
        s_n = T("same force, stretches add", 24, color=MUTED).move_to(P(3.4, y - 1.05))
        s_f = M(r"\frac{1}{k_{\text{eff}}} = \frac{1}{k_1} + \frac{1}{k_2}", 42).move_to(P(3.4, y - 1.85))

        with self.voiceover("Side by side, springs share the same stretch, so their stiffnesses "
                            "add. End to end, they carry the same force, so the reciprocals add. "
                            "And half a spring is twice as stiff.") as vo:
            self.play(top.animate.scale(0.7).move_to(P(0, 3.3)), run_time=0.5)
            self.play(FadeIn(wl1), Create(s1a), Create(s1b), FadeIn(b1), FadeIn(p_t), run_time=1.0)
            self.play(FadeIn(p_n), Write(p_f), run_time=1.0)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(wl2), Create(s2a), FadeIn(jd), Create(s2b), FadeIn(b2), FadeIn(s_t), run_time=1.0)
            self.play(FadeIn(s_n), Write(s_f), run_time=1.0)
            self.wait(vo.duration * 0.1)
            cut = M(r"k\,\ell = \text{const}\ \Rightarrow\ \text{half a spring: } 2k", 38, color=SECONDARY)
            cut.move_to(P(0, -3.2))
            self.play(Write(cut), run_time=1.2)

        # vertical spring
        self.clear_all(0.5)
        cx = -3.5
        ceil_y = 3.2
        nat_y = 0.9  # bottom of relaxed spring
        x0 = 0.9  # static stretch (drawn)
        eq_y = nat_y - x0
        tt = ValueTracker(0)

        def by():
            return eq_y - 0.55 * np.cos(2.6 * tt.get_value())

        ceil = Line(P(cx - 1.2, ceil_y), P(cx + 1.2, ceil_y), color=INK, stroke_width=5)
        hatch = VGroup(*[Line(P(cx - 1.1 + 0.22 * i, ceil_y), P(cx - 0.9 + 0.22 * i, ceil_y + 0.2), color=MUTED,
                              stroke_width=2) for i in range(10)])
        vs = always_redraw(lambda: spring(P(cx, ceil_y), P(cx, by()), coils=9, amp=0.16))
        vb = always_redraw(lambda: block(P(cx, by() - 0.4), 0.8, 0.8))
        natl = DashedLine(P(cx - 1.6, nat_y), P(cx + 1.6, nat_y), color=MUTED, stroke_width=2)
        natt = T("relaxed end", 22, color=MUTED).next_to(natl, RIGHT, buff=0.15)
        eql = DashedLine(P(cx - 1.6, eq_y), P(cx + 1.6, eq_y), color=SECONDARY, stroke_width=3)
        eqt = T("new centre", 22, color=SECONDARY).next_to(eql, RIGHT, buff=0.15)
        br = BraceBetweenPoints(P(cx - 1.7, nat_y), P(cx - 1.7, eq_y), direction=LEFT, color=INK)
        brl = M("x_0", 32).next_to(br, LEFT, buff=0.1)
        v1 = M(r"kx_0 = mg", 42).move_to(P(3.2, 2.3))
        v2 = M(r"F = mg - k(x_0 + y) = -ky", 42).move_to(P(3.2, 1.2))
        v3 = M(r"T = 2\pi\sqrt{\frac{m}{k}} = 2\pi\sqrt{\frac{x_0}{g}}", 42).move_to(P(3.2, -0.2))
        v4 = M(r"x_0 = 5\ \text{cm}:\ T = 2\pi\sqrt{0.005} \approx 0.44\ \text{s}", 36, color=GREEN)
        v4.move_to(P(3.2, -1.6))
        with self.voiceover("Hang it vertically and gravity only moves the centre, where k x "
                            "nought equals m g. About that centre the force is still minus k y, "
                            "so the period is unchanged.") as vo:
            t0 = self.renderer.time
            self.play(Create(ceil), FadeIn(hatch), run_time=0.5)
            self.play(FadeIn(vs), FadeIn(vb), Create(natl), FadeIn(natt), run_time=0.8)
            self.play(Create(eql), FadeIn(eqt), GrowFromCenter(br), FadeIn(brl), run_time=0.8)
            self.play(Write(v1), run_time=0.8)
            self.run(tt, vo.duration * 0.15)
            self.play(Write(v2), run_time=1.2)
            self.run(tt, self.left(vo, t0))
        with self.voiceover("So a five centimetre static stretch means a period of about zero "
                            "point four four seconds, whatever the mass.") as vo:
            t0 = self.renderer.time
            self.play(Write(v3), run_time=1.2)
            self.run(tt, vo.duration * 0.2)
            self.play(Write(v4), run_time=1.2)
            self.run(tt, self.left(vo, t0))

    # ------------------------------------------------------------ scene 5: the pendulum
    def s5(self):
        piv = P(-3.6, 3.1)
        L = 4.2
        th0 = 22 * DEGREES
        tt = ValueTracker(0)

        def th():
            return th0 * np.cos(1.6 * tt.get_value())

        def bob():
            t = th()
            return piv + L * np.array([np.sin(t), -np.cos(t), 0])

        bar_ = Line(piv + 0.9 * LEFT, piv + 0.9 * RIGHT, color=INK, stroke_width=5)
        vert = DashedLine(piv, piv + (L + 0.4) * DOWN, color=GRID, stroke_width=3)
        string = always_redraw(lambda: Line(piv, bob(), color=INK, stroke_width=3))
        bobm = always_redraw(lambda: Circle(radius=0.28, color=INK, stroke_width=3).set_fill(BLOCK_FILL, 1)
                             .move_to(bob()))
        arc = always_redraw(lambda: Arc(radius=1.1, start_angle=-PI / 2, angle=th(), arc_center=piv, color=INK,
                                        stroke_width=3) if abs(th()) > 0.02 else VectorizedPoint(piv))
        thl = always_redraw(lambda: M(r"\theta", 30).move_to(
            piv + 1.45 * np.array([np.sin(th() / 2), -np.cos(th() / 2), 0])))
        g_ar = always_redraw(lambda: vec(bob(), bob() + 1.4 * DOWN, INK, sw=4))
        g_l = always_redraw(lambda: M("mg", 28).next_to(bob() + 1.4 * DOWN, DOWN, buff=0.08))

        def tang():
            t = th()
            if abs(t) < 0.03:
                return VectorizedPoint(bob())
            d = -np.sign(t) * np.array([np.cos(t), np.sin(t), 0])  # back towards the bottom
            return vec(bob(), bob() + 1.4 * abs(np.sin(t)) * 3.0 * d, ACCENT, sw=5)

        tg = always_redraw(tang)
        def tlab():
            t = th()
            d = -np.sign(t) * np.array([np.cos(t), np.sin(t), 0]) if abs(t) > 1e-3 else RIGHT
            tip = bob() + 1.4 * abs(np.sin(t)) * 3.0 * d
            op = float(np.clip((abs(t) - 0.06) / 0.1, 0, 1))
            return M(r"-mg\sin\theta", 30, color=ACCENT).move_to(tip + 0.95 * d + 0.3 * DOWN).set_opacity(op)

        tgl = always_redraw(tlab)
        with self.voiceover("A pendulum has no spring. Its restoring force is gravity's pull "
                            "along the arc, minus m g sine theta.") as vo:
            t0 = self.renderer.time
            self.play(FadeIn(bar_), Create(vert), FadeIn(string), FadeIn(bobm), run_time=0.8)
            self.add(arc, thl)
            self.run(tt, vo.duration * 0.25)
            self.play(FadeIn(g_ar), FadeIn(g_l), FadeIn(tg), FadeIn(tgl), run_time=0.6)
            self.run(tt, self.left(vo, t0))

        p1 = M(r"mL\ddot\theta = -mg\sin\theta \approx -mg\,\theta", 40).move_to(P(3.5, 2.7))
        p2 = M(r"\omega^2 = \frac{g}{L}", 44).move_to(P(3.5, 1.5))
        p3 = M(r"T = 2\pi\sqrt{\frac{L}{g}}", 56, color=PRIMARY).move_to(P(3.5, -0.3))
        p3b = SurroundingRectangle(p3, buff=0.2, corner_radius=0.15, color=PRIMARY, stroke_width=3)
        p4 = T("mass cancels: a heavy bob is no faster", 24, color=MUTED).move_to(P(3.5, -1.75))
        p5 = M(r"10^\circ:\ \sin\theta \text{ vs } \theta \text{ differ by } 0.5\%", 32, color=MUTED)
        p5.move_to(P(3.5, -2.45))
        with self.voiceover("For small angles sine theta is almost theta, so this is S H M with "
                            "omega squared equal to g over L. The mass cancels: T equals two pi "
                            "root L over g.") as vo:
            t0 = self.renderer.time
            self.play(Write(p1), run_time=1.3)
            self.run(tt, vo.duration * 0.05)
            self.play(FadeIn(p5), run_time=0.6)
            self.run(tt, vo.duration * 0.15)
            self.play(Write(p2), run_time=0.8)
            self.play(Write(p3), Create(p3b), run_time=1.0)
            self.play(FadeIn(p4), run_time=0.6)
            self.run(tt, self.left(vo, t0))

        with self.voiceover("In an accelerating frame, use an effective g. In a lift rising at "
                            "two metres per second squared, a one metre pendulum feels twelve, "
                            "and its period drops from one point nine nine seconds to one point "
                            "eight one.") as vo:
            t0 = self.renderer.time
            self.play(*[FadeOut(m) for m in (p1, p2, p4, p5)], run_time=0.4)
            self.play(VGroup(p3, p3b).animate.scale(0.75).move_to(P(3.5, 2.6)), run_time=0.6)
            lift = Rectangle(width=5.2, height=1.9, color=MUTED, stroke_width=3).move_to(P(3.3, 0.55))
            up = vec(P(6.3, -0.2), P(6.3, 1.3), A_C, sw=5)
            upl = M(r"a", 30, color=A_C).next_to(up, RIGHT, buff=0.1)
            ge = M(r"g_{\text{eff}} = g + a = 12\ \text{m/s}^2", 38).move_to(P(3.3, 0.85))
            ge2 = M(r"T: 1.99\ \text{s} \to 1.81\ \text{s}", 38, color=GREEN).move_to(P(3.3, 0.15))
            self.play(Create(lift), GrowArrow(up), FadeIn(upl), run_time=0.8)
            self.run(tt, vo.duration * 0.1)
            self.play(Write(ge), run_time=1.0)
            self.run(tt, vo.duration * 0.15)
            self.play(Write(ge2), run_time=1.0)
            others = VGroup(
                M(r"\text{lift falling at } a:\ g - a", 30),
                M(r"\text{car accelerating: } \sqrt{g^2 + a^2}", 30),
                M(r"\text{bob in a liquid: } g\,(1 - \sigma/\rho)", 30),
            ).arrange(DOWN, buff=0.22, aligned_edge=LEFT).move_to(P(3.5, -1.85))
            self.play(LaggedStart(*[FadeIn(o) for o in others], lag_ratio=0.35), run_time=1.2)
            self.run(tt, self.left(vo, t0))

    # ------------------------------------------------------------ scene 6: adding SHMs, hidden SHMs
    def s6(self):
        O = P(-4.8, -1.2)
        s = 0.62
        A1, A2 = 3.0, 4.0
        dl = ValueTracker(0.0)

        def tip1():
            return O + s * A1 * RIGHT

        def tip2():
            d = dl.get_value()
            return tip1() + s * A2 * np.array([np.cos(d), np.sin(d), 0])

        a1 = vec(O, tip1(), SECONDARY)
        a1l = M("3", 34, color=SECONDARY).next_to(a1, DOWN, buff=0.15)
        a2 = always_redraw(lambda: vec(tip1(), tip2(), PURPLE))
        a2l = always_redraw(lambda: M("4", 34, color=PURPLE).move_to((tip1() + tip2()) / 2 + 0.35 * np.array(
            [-np.sin(dl.get_value()), np.cos(dl.get_value()), 0]) * (1 if dl.get_value() < 2.5 else -1)))
        res = always_redraw(lambda: vec(O, tip2(), A_C, sw=7) if np.linalg.norm(tip2() - O) > 0.3
                            else VectorizedPoint(O))
        frm = M(r"A = \sqrt{A_1^2 + A_2^2 + 2A_1A_2\cos\delta}", 44).move_to(P(0, 3.1))
        rd_l = M(r"A =", 44, color=A_C).move_to(P(3.0, 1.2))
        rd = always_redraw(lambda: DecimalNumber(np.sqrt(A1 ** 2 + A2 ** 2 + 2 * A1 * A2 * np.cos(dl.get_value())),
                                                 num_decimal_places=1, font_size=44, color=A_C)
                           .next_to(rd_l, RIGHT, buff=0.2))
        dd_l = M(r"\delta =", 44).move_to(P(3.0, 0.2))
        dd = always_redraw(lambda: DecimalNumber(dl.get_value() / DEGREES, num_decimal_places=0, unit=r"^{\circ}",
                                                 font_size=44, color=INK).next_to(dd_l, RIGHT, buff=0.2))
        with self.voiceover("Two S H Ms of the same frequency add like their arrows. Amplitudes "
                            "three and four give seven only in step, five at right angles, and "
                            "one when opposed.") as vo:
            self.play(Write(frm), run_time=1.2)
            self.play(GrowArrow(a1), FadeIn(a1l), FadeIn(a2), FadeIn(a2l), run_time=0.8)
            self.add(res)
            self.play(FadeIn(rd_l), FadeIn(rd), FadeIn(dd_l), FadeIn(dd), run_time=0.5)
            self.wait(vo.duration * 0.12)
            self.play(dl.animate.set_value(PI / 2), run_time=1.6)
            self.wait(vo.duration * 0.08)
            self.play(dl.animate.set_value(PI), run_time=1.6)

        with self.voiceover("Many systems hide an S H M. Displace by x, find the net force, minus"
                            " k effective x, and divide by the mass that moves.") as vo:
            self.clear_all(0.5)
            steps = VGroup(
                T("1. displace by a small x", 30),
                M(r"2.\ \ F_{\text{net}} = -k_{\text{eff}}\,x", 42),
                M(r"3.\ \ \omega^2 = \frac{k_{\text{eff}}}{\text{moving mass}}", 42),
            ).arrange(DOWN, buff=0.45, aligned_edge=LEFT).move_to(P(0, 0.4))
            hdr = T("Finding a hidden SHM", 34, color=PRIMARY, weight="BOLD").move_to(P(0, 2.8))
            self.play(FadeIn(hdr), run_time=0.5)
            for st in steps:
                self.play(FadeIn(st, shift=0.15 * UP), run_time=0.6)
                self.wait(vo.duration * 0.12)

        # U-tube
        self.clear_all(0.5)
        tt = ValueTracker(0)
        lx0, lx1, rx0, rx1 = -5.4, -4.7, -3.1, -2.4
        bot0, bot1 = -3.0, -2.3
        top_y = 1.9
        base = 0.0

        def yv():
            return 0.75 * np.cos(2.2 * tt.get_value())

        walls = VGroup(
            Line(P(lx0, top_y), P(lx0, bot0), color=INK, stroke_width=4),
            Line(P(lx0, bot0), P(rx1, bot0), color=INK, stroke_width=4),
            Line(P(rx1, bot0), P(rx1, top_y), color=INK, stroke_width=4),
            Line(P(lx1, top_y), P(lx1, bot1), color=INK, stroke_width=4),
            Line(P(lx1, bot1), P(rx0, bot1), color=INK, stroke_width=4),
            Line(P(rx0, bot1), P(rx0, top_y), color=INK, stroke_width=4),
        )

        def liquid():
            y = yv()
            g = VGroup(
                Rectangle(width=lx1 - lx0, height=base + y - bot1, stroke_width=0).set_fill(WATER, 1)
                .move_to(P((lx0 + lx1) / 2, (base + y + bot1) / 2)),
                Rectangle(width=rx1 - rx0, height=base - y - bot1, stroke_width=0).set_fill(WATER, 1)
                .move_to(P((rx0 + rx1) / 2, (base - y + bot1) / 2)),
                Rectangle(width=rx1 - lx0, height=bot1 - bot0, stroke_width=0).set_fill(WATER, 1)
                .move_to(P((lx0 + rx1) / 2, (bot0 + bot1) / 2)),
            )
            return g

        liq = always_redraw(liquid)
        lvl = DashedLine(P(lx0 - 0.3, base), P(rx1 + 0.3, base), color=MUTED, stroke_width=2)

        def brace():
            y = yv()
            if abs(y) < 0.12:
                return VectorizedPoint(P(rx1 + 0.4, base))
            hi, lo = base + abs(y), base - abs(y)
            b = BraceBetweenPoints(P(rx1 + 0.25, hi), P(rx1 + 0.25, lo), direction=RIGHT, color=A_C)
            return VGroup(b, M("2x", 30, color=A_C).next_to(b, RIGHT, buff=0.08))

        brc = always_redraw(brace)
        u1 = M(r"\rho A L\,\ddot x = -2\rho A g\,x", 40).move_to(P(2.8, 2.3))
        u2 = M(r"T = 2\pi\sqrt{\frac{L}{2g}}", 48, color=PRIMARY).move_to(P(2.8, 1.0))
        u3 = M(r"L = 40\ \text{cm}:\ T \approx 0.89\ \text{s}", 38, color=GREEN).move_to(P(2.8, -0.15))
        with self.voiceover("In a U tube, push one side down by x and the unbalanced column is "
                            "two x high. So T equals two pi root L over two g: about zero point "
                            "eight nine seconds for a forty centimetre column.") as vo:
            t0 = self.renderer.time
            self.play(Create(walls), FadeIn(liq), Create(lvl), run_time=1.0)
            self.add(brc)
            self.run(tt, vo.duration * 0.3)
            self.play(Write(u1), run_time=1.1)
            self.run(tt, vo.duration * 0.1)
            self.play(Write(u2), run_time=1.0)
            self.run(tt, vo.duration * 0.05)
            self.play(Write(u3), run_time=0.9)
            self.run(tt, self.left(vo, t0))
        with self.voiceover("A floating cylinder gives two pi root h over g, and a tunnel through"
                            " the Earth, about eighty four minutes.") as vo:
            t0 = self.renderer.time
            o1 = M(r"\text{floating body: } T = 2\pi\sqrt{h/g}", 36).move_to(P(2.8, -1.4))
            o2 = M(r"\text{tunnel through Earth: } 2\pi\sqrt{R/g} \approx 84\ \text{min}", 36).move_to(P(2.8, -2.4))
            fit(o2, 7.4)
            self.run(tt, vo.duration * 0.15)
            self.play(FadeIn(o1, shift=0.1 * UP), run_time=0.8)
            self.run(tt, vo.duration * 0.25)
            self.play(FadeIn(o2, shift=0.1 * UP), run_time=0.8)
            self.run(tt, self.left(vo, t0))

    # ------------------------------------------------------------ scene 7: damping and resonance
    def s7(self):
        ax = Axes(x_range=[0, 10, 2], y_range=[-1.2, 1.2, 1], x_length=7.2, y_length=3.6, tips=False,
                  axis_config={"color": MUTED, "stroke_width": 2}).move_to(P(-2.6, 0.2))
        g = 0.22
        cv = ax.plot(lambda t: np.exp(-g * t) * np.cos(4 * t), x_range=[0, 10, 0.02], color=X_C, stroke_width=4)
        env1 = DashedVMobject(ax.plot(lambda t: np.exp(-g * t), x_range=[0, 10], color=A_C, stroke_width=3),
                              num_dashes=30)
        env2 = DashedVMobject(ax.plot(lambda t: -np.exp(-g * t), x_range=[0, 10], color=A_C, stroke_width=3),
                              num_dashes=30)
        xl = M("x", 32, color=X_C).next_to(ax.y_axis, UP, buff=0.1)
        tl = M("t", 32).next_to(ax.x_axis, RIGHT, buff=0.1)
        d1 = M(r"x = A e^{-\gamma t}\cos(\omega' t + \phi)", 46).move_to(P(0, 3.1))
        d2 = M(r"\gamma = \frac{b}{2m}", 40).move_to(P(4.7, 1.6))
        el = M(r"Ae^{-\gamma t}", 34, color=A_C).next_to(ax.c2p(4.5, np.exp(-g * 4.5)), UP, buff=0.35)
        with self.voiceover("Real oscillators lose energy. Drag proportional to velocity shrinks "
                            "the amplitude by the same factor every cycle: A e to the minus gamma"
                            " t.") as vo:
            self.play(Create(ax), FadeIn(xl), FadeIn(tl), run_time=0.8)
            self.play(Create(cv), run_time=2.4, rate_func=linear)
            self.play(Create(env1), Create(env2), FadeIn(el), run_time=0.9)
            self.play(Write(d1), run_time=1.0)
            self.play(Write(d2), run_time=0.8)

        with self.voiceover("If it halves in ten seconds, it is one eighth after thirty. Energy, "
                            "as amplitude squared, decays twice as fast.") as vo:
            h1 = M(r"\tfrac12 \text{ in } 10\ \text{s}", 36).move_to(P(4.7, 0.5))
            h2 = M(r"\tfrac18 = \left(\tfrac12\right)^3 \Rightarrow 30\ \text{s}", 36, color=GREEN).move_to(P(4.7, -0.5))
            h3 = M(r"E \propto A^2 \propto e^{-2\gamma t}", 36).move_to(P(4.7, -1.6))
            self.wait(vo.duration * 0.1)
            self.play(Write(h1), run_time=0.8)
            self.play(Write(h2), run_time=1.0)
            self.wait(vo.duration * 0.15)
            self.play(Write(h3), run_time=1.0)

        with self.voiceover("Drive it with a periodic push, and it settles at the driver's "
                            "frequency, responding most near its natural frequency, omega nought."
                            " Lighter damping gives a taller, sharper peak.") as vo:
            self.clear_all(0.5)
            rx = Axes(x_range=[0, 4, 1], y_range=[0, 2.4, 1], x_length=7.6, y_length=4.6, tips=False,
                      axis_config={"color": MUTED, "stroke_width": 2}).move_to(P(-1.6, -0.3))
            xlab = M(r"\text{driving } \omega", 32).next_to(rx.x_axis, DOWN, buff=0.25).shift(2.2 * RIGHT)
            ylab = M(r"\text{amplitude}", 32).next_to(rx.y_axis, UP, buff=0.12)
            w0 = 2.0
            curves = VGroup()
            labs = VGroup()
            for gm, col, txt in ((0.5, MUTED, "heavy damping"), (0.25, SECONDARY, "medium"),
                                 (0.12, PRIMARY, "light damping")):
                c = rx.plot(lambda x, gm=gm: 1 / np.sqrt((w0 ** 2 - x ** 2) ** 2 + (2 * gm * x) ** 2),
                            x_range=[0.02, 4, 0.01], color=col, stroke_width=4)
                curves.add(c)
                labs.add(T(txt, 22, color=col))
            labs.arrange(DOWN, aligned_edge=LEFT, buff=0.25).move_to(P(4.6, 1.2))
            mark = DashedLine(rx.c2p(w0, 0), rx.c2p(w0, 2.4), color=INK, stroke_width=2)
            ml = M(r"\omega_0", 34).next_to(rx.c2p(w0, 0), DOWN, buff=0.2)
            hd = M(r"m\ddot x = -kx - b\dot x + F_0\cos\omega t", 40).move_to(P(0, 3.3))
            self.play(FadeIn(hd), Create(rx), FadeIn(xlab), FadeIn(ylab), run_time=0.9)
            self.wait(vo.duration * 0.15)
            self.play(Create(mark), FadeIn(ml), run_time=0.6)
            for c, l in zip(curves, labs):
                self.play(Create(c), FadeIn(l), run_time=1.1)

        with self.voiceover("Resonance is about timing, not strength. That is why soldiers break "
                            "step on bridges, and how a radio picks one station.") as vo:
            cap = card(T("resonance = matched frequency,\nnot a big force", 26, color=PRIMARY), color=PRIMARY)
            fit(cap, 4.4)
            cap.move_to(P(4.85, -0.3))
            ex = VGroup(T("soldiers break step", 22, color=MUTED), T("radio tuning", 22, color=MUTED),
                        T("shock absorbers add damping", 22, color=MUTED)).arrange(DOWN, aligned_edge=LEFT, buff=0.2)
            ex.next_to(cap, DOWN, buff=0.35).align_to(cap, LEFT).shift(0.15 * RIGHT)
            self.wait(vo.duration * 0.1)
            self.play(FadeIn(cap, shift=0.15 * UP), run_time=0.8)
            self.wait(vo.duration * 0.2)
            self.play(LaggedStart(*[FadeIn(e) for e in ex], lag_ratio=0.4), run_time=1.2)

    # ------------------------------------------------------------ scene 8: recap
    def s8(self):
        title = T("Chapter 0 in six lines", 38, color=PRIMARY, weight="BOLD").move_to(P(0, 3.3))
        lines = [
            (r"a = -\omega^2 x", "the SHM test; every small oscillation passes"),
            (r"x = A\cos(\omega t + \phi)", "shadow of a turning arrow, T = 2π/ω"),
            (r"|v| = \omega\sqrt{A^2 - x^2}", "E = ½kA² is fixed; KE and PE swap at 2ω"),
            (r"k_1 + k_2,\ \ \tfrac{1}{k_1} + \tfrac{1}{k_2}", "parallel, series; gravity moves the centre"),
            (r"T = 2\pi\sqrt{L/g_{\text{eff}}}", "pendulum: the mass cancels"),
            (r"A \propto e^{-\gamma t}", "damping shrinks it; resonance is timing"),
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
        rows.arrange(DOWN, buff=0.32, aligned_edge=LEFT).move_to(P(0, -0.15))
        for r in rows:
            r[0].move_to(P(-6.2, r[0].get_y()))
            r[1].next_to(r[0], RIGHT, buff=0.3)
            fit(r[2], 6.4)
            r[2].move_to(P(0.2, r[1].get_y()), aligned_edge=LEFT)
        with self.voiceover("To recap. The S H M test is acceleration equals minus omega squared "
                            "x, and the motion is the shadow of a turning arrow.") as vo:
            self.play(FadeIn(title), run_time=0.6)
            self.play(FadeIn(rows[0], shift=0.15 * UP), run_time=0.7)
            self.wait(vo.duration * 0.25)
            self.play(FadeIn(rows[1], shift=0.15 * UP), run_time=0.7)
        with self.voiceover("Energy stays fixed while kinetic and potential swap. Find the "
                            "effective k for springs and the effective g for pendulums. Damping "
                            "shrinks the swing; resonance builds it.") as vo:
            for i in (2, 3, 4, 5):
                self.play(FadeIn(rows[i], shift=0.15 * UP), run_time=0.6)
                self.wait(vo.duration * 0.12)
        with self.voiceover("Try the mastery quiz. Then chapter one hands this motion from particle to particle "
                            "along a string, and the result is a wave.") as vo:
            nxt = T("Next: Chapter 1 · Waves on a String", 30, color=PRIMARY).move_to(P(0, -3.55))
            self.wait(vo.duration * 0.3)
            self.play(FadeIn(nxt, shift=0.2 * UP), run_time=0.8)


def card(mob, pad=0.25, color=MUTED):
    box = SurroundingRectangle(mob, buff=pad, corner_radius=0.15, color=color, stroke_width=2)
    box.set_fill(WHITE, opacity=0.85)
    return VGroup(box, mob)
