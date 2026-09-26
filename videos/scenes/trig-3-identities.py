import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from manim import *  # noqa: E402,F401,F403
from strawberry import *  # noqa: E402,F401,F403

import re  # noqa: E402
from contextlib import contextmanager  # noqa: E402

import numpy as np  # noqa: E402

# ---------------------------------------------------------------------------
# Local palette (light cream background): sine = blue, cosine = orange,
# results boxed in gold, cancellations / wrong answers in strawberry red.
# ---------------------------------------------------------------------------
SC = ManimColor("#2563A8")  # sine-related
CC = ManimColor("#E0791A")  # cosine-related
HL = ManimColor("#D4A017")  # result boxes (the script's YELLOW)
GOLDC = ManimColor("#A8741A")  # horizontal pieces in the angle-sum diagram
TEALC = SECONDARY  # vertical pieces
RED_ = PRIMARY
GREY_ = MUTED

_TOK = re.compile(r"(\\(?:sin|cos)(?:\^\{?\d\}?)?)")


def T(*parts, paint=True, color=None, scale=1.0):
    """MathTex split into the given parts (returned as a VGroup of glyph groups).

    Every \\sin / \\cos token is isolated so it can be painted blue / orange.
    """
    toks, owner = [], []
    for i, p in enumerate(parts):
        for t in _TOK.split(p):
            if t.strip() == "":
                continue
            toks.append(t)
            owner.append(i)
    m = MathTex(*toks)
    if color is not None:
        m.set_color(color)
    groups = [VGroup() for _ in parts]
    for sub, o, t in zip(m.submobjects, owner, toks):
        if paint and _TOK.fullmatch(t):
            sub.set_color(SC if "sin" in t else CC)
        groups[o].add(*sub.submobjects)
    g = VGroup(*groups)
    g.scale(scale)
    return g


def box(m, buff=0.12):
    return SurroundingRectangle(m, color=HL, buff=buff, stroke_width=4)


def xcross(m):
    return Cross(m, stroke_color=RED_, stroke_width=6)


def check(scale=1.0):
    c = VMobject(color=GREEN, stroke_width=8)
    c.set_points_as_corners([[-0.22, 0.02, 0], [-0.06, -0.16, 0], [0.26, 0.24, 0]])
    return c.scale(scale)


def note(tex, scale=0.7):
    return MathTex(tex, color=GREY_).scale(scale)


def radical_glyphs(group):
    """Surd glyph (leftmost) + overline (widest) inside a glyph group."""
    glyphs = list(group)
    surd = min(glyphs, key=lambda g: g.get_left()[0])
    bar = max(glyphs, key=lambda g: g.width)
    return VGroup(surd, bar)


def rest_glyphs(group, exclude):
    return VGroup(*[g for g in group if g not in exclude])


def P(x, y):
    return np.array([x, y, 0.0])


class Beat:
    """Timing helper: starts of sentences as fractions of the narration."""

    def __init__(self, scene, duration, text):
        self.sc = scene
        self.t0 = scene.renderer.time
        self.d = duration
        sents = re.split(r"(?<=[.?!])\s+", text.strip())
        w = [len(s) + 10 for s in sents]
        tot = sum(w)
        acc = 0
        self.starts = []
        for x in w:
            self.starts.append(acc / tot)
            acc += x

    def s(self, i):
        return self.starts[i]

    def at(self, f):
        dt = self.t0 + f * self.d - self.sc.renderer.time
        if dt > 0.04:
            self.sc.wait(dt)

    def rt(self, f, lo=0.3):
        return max(lo, f * self.d)


# ---------------------------------------------------------------------------
# Narration (verbatim from the script)
# ---------------------------------------------------------------------------
N = {
    "1a": "Two equations that look alike. Sine x equals one half. And sine squared x plus cosine squared x equals one.",
    "1b": "The first is a question: which x make it true? The second is a statement, true for every x. There is nothing to solve.",
    "1c": "An identity is true wherever both sides are defined. Tangent x equals sine x over cosine x is an identity, even though neither side exists at pi over two. Excluded points do not spoil it.",
    "2a": "To prove an identity, work on one side only. Start from the messier side. When stuck, convert to sine and cosine. And look for a Pythagorean pattern.",
    "2b": "Show that sine x over cosine x, plus cosine x over sine x, equals one over the product sine x cosine x. Take a common denominator.",
    "2c": "The top is sine squared plus cosine squared, which is one. Cross multiplying would assume what we are proving. And a graph is a check, never a proof.",
    "3a": "Textbooks list three Pythagorean identities. There is really one, plus a division.",
    "3b": "Divide every term of Pythagoras by cosine squared, wherever cosine is not zero. You get tangent squared plus one equals secant squared.",
    "3c": "Divide by sine squared instead, wherever sine is not zero, and you get one plus cotangent squared equals cosecant squared. The lone function on the right is the reciprocal of your divisor.",
    "3d": "Two uses. Swapping squares: sine squared becomes one minus cosine squared. Killing radicals: the square root of one minus sine squared is the absolute value of cosine.",
    "3e": "Secant squared minus one, over secant squared. The top is tangent squared. Convert to sine and cosine, and sine squared theta is left.",
    "4a": "First, kill the tempting wrong answer: sine of alpha plus beta equals sine alpha plus sine beta. Try alpha and beta both equal to pi over two. The left is sine of pi, zero. The right is two.",
    "4b": "Instead, stack two right triangles. Rotate through alpha, then beta, landing on a point P at distance one. In the inner triangle, O Q is cosine beta, and Q P is sine beta.",
    "4c": "Project onto the axes using angle alpha. The height of P is Q R plus P T: sine alpha cosine beta, plus cosine alpha sine beta.",
    "4d": "The horizontal position of P is O R minus Q T: cosine alpha cosine beta, minus sine alpha sine beta. The minus is real. Q T pulls P back.",
    "5a": "Sine mixes, cosine matches. Cosine flips the sign: a plus inside becomes a minus in the middle.",
    "5b": "Differences come free. Replace beta with negative beta and use symmetry. Both middle signs flip. For tangent, divide sine by cosine, then divide top and bottom by cosine alpha cosine beta.",
    "5c": "The payoff: exact values. Seventy five degrees is forty five plus thirty, so sine of seventy five degrees is the square root of six plus the square root of two, all over four.",
    "6a": "Set beta equal to alpha. Sine of two theta is sine theta cosine theta plus cosine theta sine theta: two sine theta cosine theta.",
    "6b": "Cosine of two theta is cosine squared minus sine squared. Pythagoras gives two more faces: one minus two sine squared, or two cosine squared minus one.",
    "6c": "Here is cosine of two x. One minus two sine squared x lands exactly on it. So does two cosine squared x minus one. Three labels, one curve.",
    "6d": "For half angle, solve for sine squared theta and put theta equal to x over two. Sine of x over two is plus or minus the square root of the fraction: one minus cosine x, all over two. The whole fraction sits under the root. Cosine is the same, with a plus.",
    "6e": "The plus or minus is not decoration. Only the quadrant of x over two picks the sign. As in Chapter one point four: algebra offers both, geometry picks one.",
    "6f": "Doubling the angle does not double the value. If sine theta is three fifths in quadrant one, sine of two theta is two times three fifths times four fifths: twenty-four over twenty-five. Not six fifths, which is bigger than one.",
    "7a": "Add the two cosine formulas, and the sine terms cancel. Subtract, and the cosine terms cancel. A product becomes a sum. Adding the two sine formulas gives the mixed case: sine alpha cosine beta is one half the sum of sine of alpha plus beta and sine of alpha minus beta.",
    "7b": "Two tuning forks, at four hundred forty and four hundred forty-four hertz. Read backwards, their sum becomes a single tone at four hundred forty-two hertz, whose loudness swells four times a second.",
    "7c": "Why four? The envelope cycles twice a second, but loudness peaks at both its highs and its lows. Four beats: the difference of the frequencies.",
    "7d": "Do not memorize these six. Each is one line from the two sum formulas.",
    "8a": "The whole chapter grows from a small core: Pythagoras, the angle sum formulas, and circle symmetry.",
    "8b": "Everything else is a path from the core. Name it before any algebra. Double angle: beta equals alpha. Half angle: rearrange cosine of two theta. Product to sum: add or subtract sum formulas.",
    "8c": "Prove that sine of two theta, divided by the quantity one plus cosine of two theta, equals tangent theta. The top is two sine theta cosine theta. For the bottom, pick two cosine squared theta minus one. The plus one and the minus one cancel. Cancel the common two cosine theta, top and bottom, and you have tangent theta.",
    "8d": "When stuck, ask: can I write it in sine and cosine? Is there a hidden sine squared plus cosine squared? Is a double or half angle in sight?",
    "9a": "Mastery means choosing the path first. Cosine to the fourth minus sine to the fourth is not a quadruple angle. Factor the difference of squares: cosine squared plus sine squared, which is one, times cosine squared minus sine squared, which is cosine of two theta.",
    "9b": "So, three lines.",
    "9c": "Identities rewrite, they do not solve. In chapter four, we run the machinery backwards: given a value, find every angle that produces it.",
}


class TrigCh3Video(NarratedScene):
    @contextmanager
    def beat(self, key):
        text = N[key]
        with self.voiceover(text) as vo:
            yield Beat(self, vo.duration, text)

    def construct(self):
        self.title_card(
            "Trigonometry",
            "Identities: The Derivation Toolkit",
            "Chapter three. Identities: the derivation toolkit.",
        )
        self.scene1()
        self.scene2()
        self.scene3()
        self.scene4()
        self.scene5()
        self.scene6()
        self.scene7()
        self.scene8()
        self.scene9()

    # ------------------------------------------------------------------
    def sine_axes(self, center=P(0, -1.4), y_length=2.6):
        ax = Axes(
            x_range=[-6.5, 6.5, 1], y_range=[-1.5, 1.5, 0.5], x_length=11, y_length=y_length,
            tips=False, axis_config={"color": GREY_, "stroke_width": 2},
        ).move_to(center)
        return ax

    # ------------------------------------------------------------------
    def scene1(self):
        hdr = Text("Identities: The Derivation Toolkit", font_size=24, color=GREY_).to_corner(UL, buff=0.35)
        left = T(r"\sin x = \tfrac{1}{2}").move_to(P(-3.3, 2.2))
        right = T(r"\sin^2 x + \cos^2 x = 1").move_to(P(3.3, 2.2))
        div = Line(P(0, 2.9), P(0, 1.3), color=GREY_, stroke_width=3)
        with self.beat("1a") as b:
            self.play(FadeIn(hdr, shift=0.2 * DOWN), run_time=0.8)
            b.at(b.s(1))
            self.play(Write(left), Create(div), run_time=b.rt(0.2))
            b.at(b.s(2))
            self.play(Write(right), run_time=b.rt(0.3))

        q = Text("question", font_size=28, color=GREY_).next_to(left, DOWN, buff=0.3)
        s = Text("statement", font_size=28, color=GREEN).next_to(right, DOWN, buff=0.3)
        ax = self.sine_axes()
        sine = ax.plot(np.sin, x_range=[-6.5, 6.5], color=SC, stroke_width=4)
        half = DashedLine(ax.c2p(-6.5, 0.5), ax.c2p(6.5, 0.5), color=INK, stroke_width=2, dash_length=0.12)
        xs = [np.pi / 6 - 2 * np.pi, 5 * np.pi / 6 - 2 * np.pi, np.pi / 6, 5 * np.pi / 6]
        dots = VGroup(*[Dot(ax.c2p(x, 0.5), color=PRIMARY, radius=0.08) for x in xs])
        flat = ax.plot(lambda x: np.sin(x) ** 2 + np.cos(x) ** 2, x_range=[-6.5, 6.5], color=GREEN, stroke_width=5)
        with self.beat("1b") as b:
            self.play(FadeIn(q), Create(ax), run_time=b.rt(0.08))
            self.play(Create(sine), Create(half), run_time=b.rt(0.14))
            self.play(LaggedStart(*[GrowFromCenter(d) for d in dots], lag_ratio=0.25), run_time=b.rt(0.1))
            b.at(b.s(1))
            self.play(FadeIn(s), FadeOut(sine), FadeOut(dots), run_time=b.rt(0.08))
            self.play(Create(flat), run_time=b.rt(0.25), rate_func=linear)

        self.play(FadeOut(VGroup(ax, flat, half, q, s, left, right, div)), run_time=0.6)
        defn = Tex("Identity: true for every value where ", "both sides are defined", ".").scale(0.85)
        frame = RoundedRectangle(corner_radius=0.2, width=defn.width + 0.8, height=defn.height + 0.7,
                                 stroke_color=INK, stroke_width=2, fill_color=WHITE, fill_opacity=0.5)
        dgrp = VGroup(frame, defn).move_to(P(0, 1.9))
        tan = T(r"\tan x", "=", r"\dfrac{\sin x}{\cos x}").move_to(P(-0.4, 0.1))
        hollow = Circle(radius=0.09, color=GREY_, stroke_width=3)
        nt = note(r"\text{both sides undefined at } x = \tfrac{\pi}{2}", 0.75)
        ngrp = VGroup(hollow, nt).arrange(RIGHT, buff=0.2).move_to(P(0, -1.5))
        ok = check(1.2).next_to(tan, RIGHT, buff=0.6)
        with self.beat("1c") as b:
            self.play(FadeIn(dgrp), run_time=b.rt(0.1))
            self.play(Indicate(defn[1], color=HL, scale_factor=1.08), run_time=b.rt(0.1))
            b.at(b.s(1))
            self.play(Write(tan), run_time=b.rt(0.15))
            b.at(b.s(1) + 0.5 * (b.s(2) - b.s(1)))
            self.play(FadeIn(ngrp, shift=0.2 * UP), run_time=b.rt(0.1))
            b.at(b.s(2))
            self.play(Create(ok), run_time=0.6)
        self.clear_scene()

    # ------------------------------------------------------------------
    def scene2(self):
        rules = VGroup(
            Tex("1. Work on one side only"),
            Tex("2. Start from the messier side"),
            Tex("3. Convert to sine and cosine"),
            Tex("4. Look for a Pythagorean pattern"),
        ).scale(0.85).arrange(DOWN, aligned_edge=LEFT, buff=0.4).move_to(ORIGIN)
        with self.beat("2a") as b:
            for i, r in enumerate(rules):
                b.at(b.s(i))
                self.play(FadeIn(r, shift=0.3 * RIGHT), run_time=0.7)
            self.play(rules.animate.scale(0.62).to_corner(UL, buff=0.5), run_time=0.9)
        sep = Line(P(-2.5, 3.4), P(-2.5, -3.4), color=GRID, stroke_width=2)

        eq = T(r"\frac{\sin x}{\cos x} + \frac{\cos x}{\sin x}", "=", r"\frac{1}{\sin x\cos x}").move_to(P(2.3, 1.4))
        with self.beat("2b") as b:
            self.play(Create(sep), Write(eq), run_time=b.rt(0.35))
            bx = box(eq[0])
            self.play(Create(bx), eq[2].animate.set_opacity(0.4), run_time=b.rt(0.12))
            b.at(b.s(1))
            eqB = T(r"\frac{", r"\sin^2 x + \cos^2 x", r"}{\sin x\cos x}")
            eqB.next_to(eq[1], LEFT, buff=0.25)
            bxB = box(eqB)
            self.play(TransformMatchingShapes(eq[0], eqB), Transform(bx, bxB), run_time=b.rt(0.3))

        eqC = T(r"\frac{1}{\sin x\cos x}").next_to(eq[1], LEFT, buff=0.25)
        ok = check(1.1).next_to(eq, RIGHT, buff=0.35)
        sk = MathTex(r"\frac{a}{b}", "=", r"\frac{c}{d}").scale(0.9).move_to(P(0.8, -1.3))
        ar1 = Arrow(sk[0].get_top() + 0.05 * UP, sk[2].get_bottom(), buff=0.05, color=GREY_, stroke_width=3,
                    max_tip_length_to_length_ratio=0.12)
        ar2 = Arrow(sk[2].get_top() + 0.05 * UP, sk[0].get_bottom(), buff=0.05, color=GREY_, stroke_width=3,
                    max_tip_length_to_length_ratio=0.12)
        skg = VGroup(sk, ar1, ar2)
        cx = xcross(skg).scale(1.1)
        circ = Text("circular", font_size=30, color=RED_).next_to(skg, RIGHT, buff=0.6)
        cap = Text("graph = evidence, not proof", font_size=28, color=GREY_).move_to(P(2.3, -3.2))
        with self.beat("2c") as b:
            self.play(Indicate(eqB[1], color=HL), run_time=b.rt(0.12))
            self.play(TransformMatchingShapes(eqB, eqC), Transform(bx, box(eqC)), run_time=b.rt(0.1))
            self.play(eq[2].animate.set_opacity(1), Create(ok), run_time=b.rt(0.08))
            b.at(b.s(1))
            self.play(FadeIn(skg), run_time=b.rt(0.1))
            self.play(Create(cx), FadeIn(circ), run_time=b.rt(0.1))
            b.at(b.s(2))
            self.play(FadeIn(cap, shift=0.2 * UP), run_time=b.rt(0.1))
        self.clear_scene()

    # ------------------------------------------------------------------
    def scene3(self):
        lab = Text("the textbook list", font_size=26, color=GREY_)
        L1 = T(r"\sin^2\theta+\cos^2\theta=1")
        L2 = T(r"1+\tan^2\theta=\sec^2\theta", paint=False)
        L3 = T(r"1+\cot^2\theta=\csc^2\theta", paint=False)
        col = VGroup(lab, L1, L2, L3).arrange(DOWN, buff=0.45).move_to(P(-4.4, 0.2))
        with self.beat("3a") as b:
            self.play(FadeIn(lab), run_time=0.4)
            for m in (L1, L2, L3):
                m.set_opacity(0.45)
            self.play(LaggedStart(*[FadeIn(m) for m in (L1, L2, L3)], lag_ratio=0.3), run_time=b.rt(0.3))
            b.at(b.s(1))
            self.play(L2.animate.set_opacity(0.2), L3.animate.set_opacity(0.2),
                      L1.animate.set_opacity(1).move_to(P(1.3, 3.0)), run_time=b.rt(0.3))

        D1 = T(r"\frac{\sin^2\theta}{", r"\cos^2\theta", r"}+\frac{\cos^2\theta}{", r"\cos^2\theta",
               r"}=\frac{1}{", r"\cos^2\theta", "}").move_to(P(1.3, 1.7))
        n1 = note(r"\cos\theta \neq 0").move_to(P(1.3, 0.75))
        R1 = T(r"\tan^2\theta + 1", "=", r"\sec^2\theta", paint=False).move_to(P(1.3, 1.7))
        with self.beat("3b") as b:
            self.play(Write(D1), run_time=b.rt(0.25))
            self.play(FadeIn(n1), run_time=0.5)
            b.at(b.s(1))
            self.play(TransformMatchingShapes(D1, R1), run_time=b.rt(0.2))
            self.play(L2.animate.set_opacity(1).move_to(R1), run_time=b.rt(0.15))
            self.play(FadeOut(L2), Indicate(R1, color=HL), run_time=0.8)

        D2 = T(r"\frac{\sin^2\theta}{", r"\sin^2\theta", r"}+\frac{\cos^2\theta}{", r"\sin^2\theta",
               r"}=\frac{1}{", r"\sin^2\theta", "}").move_to(P(1.3, -0.5))
        n2 = note(r"\sin\theta \neq 0").move_to(P(1.3, -1.45))
        R2 = T(r"1+\cot^2\theta", "=", r"\csc^2\theta", paint=False).move_to(P(1.3, -0.5))
        tag1 = T(r"\div\cos^2", scale=0.75).next_to(R1, LEFT, buff=1.2)
        tag2 = T(r"\div\sin^2", scale=0.75).next_to(R2, LEFT, buff=1.2)
        a1 = CurvedArrow(tag1.get_top() + 0.05 * UP, R1[2].get_top() + 0.05 * UP, angle=-TAU / 6, color=CC,
                         stroke_width=3)
        a2 = CurvedArrow(tag2.get_bottom() + 0.05 * DOWN, R2[2].get_bottom() + 0.05 * DOWN, angle=TAU / 6,
                         color=SC, stroke_width=3)
        with self.beat("3c") as b:
            self.play(Write(D2), FadeIn(n2), run_time=b.rt(0.2))
            b.at(b.s(0) + 0.3)
            self.play(TransformMatchingShapes(D2, R2), run_time=b.rt(0.12))
            self.play(L3.animate.set_opacity(1).move_to(R2), run_time=b.rt(0.1))
            self.play(FadeOut(L3), Indicate(R2, color=HL), run_time=0.6)
            b.at(b.s(1))
            self.play(n1.animate.next_to(R1, RIGHT, buff=0.5), n2.animate.next_to(R2, RIGHT, buff=0.5), run_time=0.5)
            self.play(FadeIn(tag1), Create(a1), run_time=b.rt(0.12))
            self.play(FadeIn(tag2), Create(a2), run_time=b.rt(0.12))

        ids = VGroup(L1, R1, R2)
        c1 = RoundedRectangle(corner_radius=0.2, width=6.0, height=3.4, stroke_color=GREY_, stroke_width=2)
        c2 = c1.copy()
        c1.move_to(P(-3.3, -1.2))
        c2.move_to(P(3.3, -1.2))
        t1 = Tex("Swapping squares").scale(0.8).move_to(c1.get_top() + 0.45 * DOWN)
        t2 = Tex("Killing radicals").scale(0.8).move_to(c2.get_top() + 0.45 * DOWN)
        sw = T(r"\sin^2\theta", r"\;\longleftrightarrow\;", r"1 - \cos^2\theta").move_to(c1.get_center() + 0.25 * DOWN)
        m1 = T(r"\sqrt{1-\sin^2\theta}").move_to(c2.get_center() + 0.25 * DOWN)
        m2 = T(r"\sqrt{\cos^2\theta}").move_to(m1)
        m3 = T("|", r"\cos\theta", "|").move_to(m1)
        m3[0].set_color(HL)
        m3[2].set_color(HL)
        with self.beat("3d") as b:
            self.play(FadeOut(VGroup(D1, n1, n2, tag1, tag2, a1, a2, lab)),
                      ids.animate.arrange(DOWN, aligned_edge=LEFT, buff=0.22).scale(0.6).to_corner(UL, buff=0.4),
                      run_time=b.rt(0.1))
            b.at(b.s(1))
            self.play(Create(c1), FadeIn(t1), run_time=0.6)
            self.play(Write(sw), run_time=b.rt(0.12))
            self.play(Indicate(sw[1], color=HL, scale_factor=1.3), run_time=0.7)
            self.play(Indicate(sw[1], color=HL, scale_factor=1.3), run_time=0.7)
            b.at(b.s(2))
            self.play(Create(c2), FadeIn(t2), FadeIn(m1), run_time=b.rt(0.12))
            self.play(TransformMatchingShapes(m1, m2), run_time=b.rt(0.12))
            rad = radical_glyphs(m2[0])
            self.play(rad.animate.set_color(RED_), run_time=0.4)
            self.play(FadeOut(rad), ReplacementTransform(rest_glyphs(m2[0], rad), m3[1]),
                      FadeIn(m3[0]), FadeIn(m3[2]), run_time=b.rt(0.12))
        self.clear_scene()

        A = T(r"\frac{\sec^2\theta - 1}{\sec^2\theta}")
        B = T(r"= \frac{\tan^2\theta}{\sec^2\theta}")
        C = T(r"= \frac{\sin^2\theta/", r"\cos^2\theta", r"}{1/", r"\cos^2\theta", "}")
        D = T(r"= \sin^2\theta")
        chain = VGroup(A, B, C, D).arrange(RIGHT, buff=0.3).move_to(P(0, 0.3))
        with self.beat("3e") as b:
            self.play(Write(A), run_time=b.rt(0.2))
            b.at(b.s(1))
            self.play(Write(B), run_time=b.rt(0.15))
            b.at(b.s(2))
            self.play(Write(C), run_time=b.rt(0.15))
            self.play(C[1].animate.set_color(RED_), C[3].animate.set_color(RED_), run_time=0.4)
            self.play(C[1].animate.set_opacity(0.15), C[3].animate.set_opacity(0.15), run_time=0.5)
            self.play(Write(D), run_time=0.7)
            self.play(Create(box(D[0][1:])), run_time=0.5)
        self.wait(0.5)
        self.clear_scene()

    # ------------------------------------------------------------------
    def scene4(self):
        eq = T(r"\sin(\alpha+\beta)", r"\overset{?}{=}", r"\sin\alpha + \sin\beta").move_to(P(0, 1.6))
        sub = MathTex(r"\alpha=\beta=\tfrac{\pi}{2}").move_to(P(0, 0.4))
        lhs = T(r"\sin\pi = 0").next_to(eq[0], DOWN, buff=1.9)
        rhs = MathTex(r"1+1=2").next_to(eq[2], DOWN, buff=1.9)
        with self.beat("4a") as b:
            self.play(Write(eq), run_time=b.rt(0.15))
            b.at(b.s(1))
            self.play(FadeIn(sub, shift=0.2 * DOWN), run_time=b.rt(0.1))
            b.at(b.s(2))
            self.play(Write(lhs), run_time=b.rt(0.1))
            b.at(b.s(3))
            self.play(Write(rhs), run_time=b.rt(0.08))
            self.play(Create(xcross(eq)), run_time=0.6)
        self.clear_scene()

        # ---- diagram --------------------------------------------------
        U = 6.3
        ax = Axes(x_range=[0, 1.05, 0.5], y_range=[0, 1.05, 0.5], x_length=U * 1.05, y_length=U * 1.05, tips=False,
                  axis_config={"include_numbers": False, "include_ticks": False, "color": GREY_, "stroke_width": 2})
        ax.shift(P(-6.3, -2.9) - ax.c2p(0, 0))
        c = ax.c2p
        a, bb = np.radians(30), np.radians(25)
        Qx, Qy = np.cos(bb) * np.cos(a), np.cos(bb) * np.sin(a)
        Px, Py = np.cos(a + bb), np.sin(a + bb)
        O, Q, Pp, R, Tt = c(0, 0), c(Qx, Qy), c(Px, Py), c(Qx, 0), c(Px, Qy)

        ray = DashedLine(O, c(1.05 * np.cos(a), 1.05 * np.sin(a)), color=GREY_, stroke_width=2, stroke_opacity=0.6)
        OP = Line(O, Pp, color=INK, stroke_width=4)
        OQ = Line(O, Q, color=CC, stroke_width=5)
        QP = Line(Q, Pp, color=SC, stroke_width=5)
        l1 = MathTex("1").scale(0.6).move_to((O + Pp) / 2 + 0.3 * P(-np.sin(a + bb), np.cos(a + bb)))
        lcb = T(r"\cos\beta", scale=0.6).move_to((O + Q) / 2 + 0.38 * P(np.sin(a), -np.cos(a)))
        lsb = T(r"\sin\beta", scale=0.6).move_to((Q + Pp) / 2 + 0.5 * P(np.cos(a), np.sin(a)))
        ra_Q = RightAngle(Line(Q, O), Line(Q, Pp), length=0.2, color=INK, stroke_width=2)
        ang_a = Angle(Line(O, c(1, 0)), Line(O, Q), radius=0.8, color=INK, stroke_width=2)
        ang_b = Angle(Line(O, Q), Line(O, Pp), radius=1.2, color=INK, stroke_width=2)
        la = MathTex(r"\alpha").scale(0.6).move_to(O + 1.1 * P(np.cos(a / 2), np.sin(a / 2)))
        lb = MathTex(r"\beta").scale(0.6).move_to(O + 1.5 * P(np.cos(a + bb / 2), np.sin(a + bb / 2)))
        dO, dQ, dP = [Dot(p, radius=0.06, color=INK) for p in (O, Q, Pp)]
        tO = MathTex("O").scale(0.5).next_to(dO, DL, buff=0.08)
        tQ = MathTex("Q").scale(0.5).next_to(dQ, UR, buff=0.08)
        tP = MathTex("P").scale(0.5).next_to(dP, UP, buff=0.1)

        with self.beat("4b") as b:
            self.play(Create(ax), FadeIn(dO), FadeIn(tO), run_time=b.rt(0.08))
            b.at(b.s(1))
            self.play(Create(ray), Create(ang_a), FadeIn(la), run_time=b.rt(0.12))
            self.play(Create(ang_b), FadeIn(lb), Create(OP), FadeIn(dP), FadeIn(tP), run_time=b.rt(0.12))
            self.play(FadeIn(l1), run_time=0.4)
            b.at(b.s(2))
            self.play(Create(OQ), FadeIn(dQ), FadeIn(tQ), Create(ra_Q), run_time=b.rt(0.1))
            self.play(FadeIn(lcb), run_time=0.4)
            self.play(Create(QP), FadeIn(lsb), run_time=b.rt(0.1))

        triORQ = Polygon(O, R, Q, stroke_color=GREY_, stroke_width=2)
        triQTP = Polygon(Q, Tt, Pp, stroke_color=GREY_, stroke_width=2)
        ra_R = RightAngle(Line(R, O), Line(R, Q), length=0.18, color=GREY_, stroke_width=2)
        ra_T = RightAngle(Line(Tt, Q), Line(Tt, Pp), length=0.18, color=GREY_, stroke_width=2)
        dash_TQ = DashedLine(Tt, Q, color=GREY_, stroke_width=2)
        QR = Line(R, Q, color=TEALC, stroke_width=8)
        PT = Line(Tt, Pp, color=TEALC, stroke_width=8)
        ang_P = Angle(Line(Pp, Tt), Line(Pp, Q), radius=0.45, color=INK, stroke_width=2)
        laP = MathTex(r"\alpha").scale(0.55).move_to(Pp + 0.72 * P(np.cos(np.radians(285)), np.sin(np.radians(285))))
        dR = Dot(R, radius=0.05, color=INK)
        dT = Dot(Tt, radius=0.05, color=INK)
        tR = MathTex("R").scale(0.5).next_to(dR, DOWN, buff=0.1)
        tT = MathTex("T").scale(0.5).next_to(dT, DL, buff=0.06)
        labQR = T(r"\sin\alpha\cos\beta", scale=0.6).move_to(P(R[0] + 1.25, (R[1] + Q[1]) / 2 - 0.4))
        ldQR = Line(QR.get_center() + 0.4 * DOWN + 0.06 * RIGHT, labQR.get_left() + 0.05 * LEFT, color=GREY_, stroke_width=1.5)
        labPT = T(r"\cos\alpha\sin\beta", scale=0.6).move_to(P(-4.35, 1.5))
        ldPT = Line(labPT.get_right() + 0.05 * RIGHT, P(Tt[0] - 0.06, 1.5), color=GREY_, stroke_width=1.5)

        Fsin = T(r"\sin(\alpha+\beta)", "=", r"\sin\alpha", r"\cos\beta", "+", r"\cos\alpha", r"\sin\beta",
                 scale=0.8).move_to(P(3.9, 2.4))
        Fcos = T(r"\cos(\alpha+\beta)", "=", r"\cos\alpha", r"\cos\beta", "-", r"\sin\alpha", r"\sin\beta",
                 scale=0.8)
        Fcos.shift(Fsin[1].get_center() - Fcos[1].get_center() + 1.1 * DOWN)

        with self.beat("4c") as b:
            self.play(Create(triORQ), Create(ra_R), FadeIn(dR), FadeIn(tR), FadeOut(l1), run_time=b.rt(0.1))
            self.play(Create(triQTP), Create(ra_T), Create(dash_TQ), FadeIn(dT), FadeIn(tT), run_time=b.rt(0.1))
            self.play(Create(ang_P), FadeIn(laP), run_time=b.rt(0.08))
            b.at(b.s(1))
            self.play(Create(QR), Create(ldQR), FadeIn(labQR), run_time=b.rt(0.1))
            self.play(Create(PT), Create(ldPT), FadeIn(labPT), run_time=b.rt(0.1))
            slid = QR.copy()
            self.play(slid.animate.move_to(P(Tt[0], (O[1] + Tt[1]) / 2, )), run_time=b.rt(0.1))
            br = Brace(Line(c(Px, 0), c(Px, Py)), direction=LEFT, color=INK, buff=0.12)
            brl = T(r"\sin(\alpha+\beta)", scale=0.6).next_to(br, LEFT, buff=0.1)
            brl.move_to(P(-5.35, br.get_center()[1]))
            brld = Line(brl.get_right() + 0.05 * RIGHT, br.get_left() + 0.05 * LEFT, color=GREY_, stroke_width=1.5)
            brl.add_background_rectangle(color=BG, opacity=0.85, buff=0.04)
            self.play(GrowFromCenter(br), FadeIn(brl), Create(brld), run_time=0.6)
            self.play(TransformFromCopy(brl[1:], Fsin[0]), FadeIn(Fsin[1]), run_time=0.6)
            self.play(TransformFromCopy(labQR, VGroup(Fsin[2], Fsin[3])), FadeIn(Fsin[4]),
                      TransformFromCopy(labPT, VGroup(Fsin[5], Fsin[6])), run_time=0.9)
            self.play(FadeOut(VGroup(labQR, ldQR, labPT, ldPT)), run_time=0.4)

        OR = Line(O, R, color=GOLDC, stroke_width=8)
        QT = DashedLine(Tt, Q, color=GOLDC, stroke_width=8, dash_length=0.12)
        labOR = T(r"\cos\alpha\cos\beta", scale=0.6).move_to(P((O[0] + R[0]) / 2 + 0.9, O[1] - 0.45))
        labQT = T(r"\sin\alpha\sin\beta", scale=0.6).move_to(P(Q[0] + 1.05, Q[1] + 0.35))
        ldQT = Line(Q + P(0.1, 0.05, ), labQT.get_left() + P(-0.05, -0.05), color=GREY_, stroke_width=1.5)
        brc = Brace(Line(O, c(Px, 0)), direction=DOWN, color=INK, buff=0.1)
        brcl = T(r"\cos(\alpha+\beta)", scale=0.6).next_to(brc, DOWN, buff=0.08)
        shadow = DashedLine(c(Px, 0) + 0.14 * DOWN, c(Qx, 0) + 0.14 * DOWN, color=GOLDC, stroke_width=4, dash_length=0.08)
        pull = Arrow(c(Qx, 0) + 0.38 * DOWN, c(Px, 0) + 0.38 * DOWN, buff=0, color=GOLDC, stroke_width=4,
                     max_tip_length_to_length_ratio=0.3)
        with self.beat("4d") as b:
            self.play(FadeOut(slid), FadeOut(br), FadeOut(brl), FadeOut(brld), run_time=0.5)
            self.play(Create(OR), FadeIn(labOR), run_time=b.rt(0.1))
            self.play(Create(QT), Create(ldQT), FadeIn(labQT), run_time=b.rt(0.1))
            b.at(b.s(0) + 0.3)
            self.play(FadeIn(Fcos[0]), FadeIn(Fcos[1]), TransformFromCopy(labOR, VGroup(Fcos[2], Fcos[3])),
                      FadeIn(Fcos[4]), TransformFromCopy(labQT, VGroup(Fcos[5], Fcos[6])), run_time=b.rt(0.12))
            self.play(FadeOut(VGroup(labOR, labQT, ldQT)), run_time=0.4)
            b.at(b.s(1))
            self.play(GrowFromCenter(brc), FadeIn(brcl), run_time=0.6)
            self.play(Circumscribe(Fcos[4], color=HL, buff=0.08), run_time=1.0)
            b.at(b.s(2))
            self.play(Create(shadow), run_time=0.4)
            self.play(GrowArrow(pull), run_time=0.8)
        self.wait(0.3)
        self._fsin, self._fcos = Fsin, Fcos

    # ------------------------------------------------------------------
    def scene5(self):
        Fsin, Fcos = self._fsin, self._fcos
        keep = VGroup(Fsin, Fcos)
        others = [m for m in self.mobjects if m not in (Fsin, Fcos)]
        mix = Text("mixes", font_size=30, color=GREY_)
        mat = Text("matches", font_size=30, color=GREY_)
        with self.beat("5a") as b:
            self.play(*[FadeOut(m) for m in others], run_time=0.6)
            self.play(keep.animate.move_to(P(-1.8, 0.9)), run_time=0.7)
            mix.next_to(Fsin, RIGHT, buff=0.8)
            mat.next_to(Fcos, RIGHT, buff=0.8)
            u1 = VGroup(Underline(VGroup(Fsin[2], Fsin[3]), color=GREY_), Underline(VGroup(Fsin[5], Fsin[6]), color=GREY_))
            u2 = VGroup(Underline(VGroup(Fcos[2], Fcos[3]), color=GREY_), Underline(VGroup(Fcos[5], Fcos[6]), color=GREY_))
            self.play(Create(u1), FadeIn(mix), run_time=b.rt(0.12))
            self.play(Create(u2), FadeIn(mat), run_time=b.rt(0.12))
            b.at(b.s(1))
            self.play(Indicate(Fcos[4], color=RED_, scale_factor=1.8), run_time=1.0)
            self.play(Indicate(Fcos[4], color=HL, scale_factor=1.8), run_time=1.0)

        tag = MathTex(r"\beta \to -\beta", color=PURPLE).to_corner(UR, buff=0.5)
        f1 = T(r"\cos(-\beta)=\cos\beta", scale=0.7)
        f2 = T(r"\sin(-\beta)=-\sin\beta", scale=0.7)
        facts = VGroup(f1, f2).arrange(DOWN, buff=0.25).next_to(tag, DOWN, buff=0.35).align_to(tag, RIGHT)
        Gsin = T(r"\sin(\alpha-\beta)", "=", r"\sin\alpha", r"\cos\beta", "-", r"\cos\alpha", r"\sin\beta", scale=0.8)
        Gcos = T(r"\cos(\alpha-\beta)", "=", r"\cos\alpha", r"\cos\beta", "+", r"\sin\alpha", r"\sin\beta", scale=0.8)
        Gsin.shift(Fsin[1].get_center() - Gsin[1].get_center())
        Gcos.shift(Fcos[1].get_center() - Gcos[1].get_center())
        H = T(r"\tan(\alpha+\beta) = \frac{", r"\sin\alpha\cos\beta + \cos\alpha\sin\beta", "}{",
              r"\cos\alpha\cos\beta - \sin\alpha\sin\beta", "}", scale=0.85).move_to(P(-0.6, -1.9))
        tg1 = MathTex(r"\div\,\cos\alpha\cos\beta", color=GREY_).scale(0.6).next_to(H[1], RIGHT, buff=0.35)
        tg2 = MathTex(r"\div\,\cos\alpha\cos\beta", color=GREY_).scale(0.6).next_to(H[3], RIGHT, buff=0.35)
        H2 = T(r"\tan(\alpha+\beta)=\frac{\tan\alpha+\tan\beta}{1-\tan\alpha\tan\beta}", scale=0.85).move_to(H)
        with self.beat("5b") as b:
            self.play(FadeOut(VGroup(mix, mat, u1, u2)), FadeIn(tag), run_time=b.rt(0.1))
            b.at(b.s(1))
            self.play(FadeIn(facts), run_time=b.rt(0.1))
            b.at(b.s(2))
            anims = []
            for F, G in ((Fsin, Gsin), (Fcos, Gcos)):
                for i in range(7):
                    anims.append(ReplacementTransform(F[i], G[i]))
            self.play(*anims, run_time=1.0)
            self.play(Flash(Gsin[4], color=PURPLE), Flash(Gcos[4], color=PURPLE), run_time=0.7)
            b.at(b.s(3))
            self.play(Write(H), run_time=b.rt(0.15))
            self.play(FadeIn(tg1), FadeIn(tg2), run_time=0.6)
            self.play(TransformMatchingShapes(VGroup(H, tg1, tg2), H2), run_time=b.rt(0.1))
            self.play(Create(box(H2)), run_time=0.5)
        self.clear_scene()

        L1 = T(r"\sin 75^\circ", "=", r"\sin(45^\circ + 30^\circ)")
        L2 = T("=", r"\sin45^\circ\cos30^\circ + \cos45^\circ\sin30^\circ")
        L3 = T("=", r"\frac{\sqrt2}{2}\cdot\frac{\sqrt3}{2} + \frac{\sqrt2}{2}\cdot\frac12")
        L4 = T("=", r"\frac{\sqrt6+\sqrt2}{4}")
        L1.move_to(P(-1.5, 2.4))
        for i, L in enumerate((L2, L3, L4)):
            L.move_to(P(0, [1.3, 0.0, -1.5][i]))
            L.shift((L1[1].get_center()[0] - L[0].get_center()[0]) * RIGHT)
        with self.beat("5c") as b:
            self.play(Write(L1), run_time=b.rt(0.15))
            b.at(b.s(1))
            self.play(Write(L2), run_time=b.rt(0.15))
            self.play(Write(L3), run_time=b.rt(0.15))
            b.at(0.72)
            self.play(Write(L4), run_time=b.rt(0.12))
            self.play(Create(box(L4[1])), run_time=0.5)
        self.wait(0.4)
        self.clear_scene()

    # ------------------------------------------------------------------
    def scene6(self):
        A = T(r"\sin 2\theta", "=", r"\sin(\theta+\theta)").move_to(P(-1.5, 2.0))
        B = T("=", r"\sin\theta\cos\theta", "+", r"\cos\theta\sin\theta")
        C = T("=", r"2\sin\theta\cos\theta")
        for L, y in ((B, 0.6), (C, -0.8)):
            L.move_to(P(0, y))
            L.shift((A[1].get_center()[0] - L[0].get_center()[0]) * RIGHT)
        with self.beat("6a") as b:
            self.play(Write(A), run_time=b.rt(0.15))
            b.at(b.s(1))
            self.play(Write(B), run_time=b.rt(0.25))
            t1, t3 = B[1].copy(), B[3].copy()
            self.play(t1.animate.move_to(C[1]), t3.animate.move_to(C[1]), FadeIn(C[0]), run_time=1.0)
            self.play(FadeOut(t1), FadeOut(t3), FadeIn(C[1]), run_time=0.5)
            self.play(Create(box(C[1])), run_time=0.5)
        self.clear_scene()

        top = T(r"\cos 2\theta", "=", r"\cos^2\theta - \sin^2\theta").move_to(P(0, 2.5))
        arL = Arrow(P(-0.6, 1.95), P(-3.2, -0.3), color=GREY_, stroke_width=4, buff=0)
        arR = Arrow(P(0.6, 1.95), P(3.2, -0.3), color=GREY_, stroke_width=4, buff=0)
        labL = T(r"\cos^2 = 1 - \sin^2", scale=0.65).move_to(P(-3.6, 1.1))
        labR = T(r"\sin^2 = 1-\cos^2", scale=0.65).move_to(P(3.6, 1.1))
        resL = T(r"1 - 2\sin^2\theta", paint=False, color=SC).move_to(P(-3.6, -0.9))
        resR = T(r"2\cos^2\theta - 1", paint=False, color=CC).move_to(P(3.6, -0.9))
        with self.beat("6b") as b:
            self.play(Write(top), run_time=b.rt(0.2))
            b.at(b.s(1))
            self.play(GrowArrow(arL), FadeIn(labL), run_time=b.rt(0.12))
            self.play(Write(resL), run_time=b.rt(0.12))
            self.play(GrowArrow(arR), FadeIn(labR), run_time=b.rt(0.12))
            self.play(Write(resR), run_time=b.rt(0.12))
        self.clear_scene()

        ax = self.sine_axes(center=P(0, -0.6), y_length=4)
        g1 = ax.plot(lambda x: np.cos(2 * x), x_range=[-6.5, 6.5], color=INK, stroke_width=7)
        g2 = DashedVMobject(ax.plot(lambda x: 1 - 2 * np.sin(x) ** 2, x_range=[-6.5, 6.5], color=SC, stroke_width=4),
                            num_dashes=90)
        g3 = DashedVMobject(ax.plot(lambda x: 2 * np.cos(x) ** 2 - 1, x_range=[-6.5, 6.5], color=CC, stroke_width=4),
                            num_dashes=180, dashed_ratio=0.35)

        def entry(sample, tex):
            return VGroup(sample, tex).arrange(RIGHT, buff=0.2)

        e1 = entry(Line(ORIGIN, 0.6 * RIGHT, color=INK, stroke_width=7), MathTex(r"\cos 2x").scale(0.7))
        e2 = entry(DashedLine(ORIGIN, 0.6 * RIGHT, color=SC, stroke_width=4, dash_length=0.1),
                   MathTex(r"1-2\sin^2 x", color=SC).scale(0.7))
        e3 = entry(DashedLine(ORIGIN, 0.6 * RIGHT, color=CC, stroke_width=4, dash_length=0.04),
                   MathTex(r"2\cos^2 x - 1", color=CC).scale(0.7))
        legend = VGroup(e1, e2, e3).arrange(RIGHT, buff=0.8).move_to(P(0, 2.6))
        with self.beat("6c") as b:
            self.play(Create(ax), FadeIn(e1), run_time=0.5)
            self.play(Create(g1), run_time=1.5)
            b.at(b.s(1))
            self.play(Create(g2), FadeIn(e2), run_time=1.5)
            b.at(b.s(2))
            self.play(Create(g3), FadeIn(e3), run_time=1.5)
            b.at(b.s(3))
            self.play(Indicate(legend, color=HL, scale_factor=1.1), run_time=1.0)
        self.clear_scene()

        E1 = T(r"\cos 2\theta = 1 - 2\sin^2\theta").move_to(P(0, 2.7))
        E2 = T(r"\sin^2\theta = \frac{1-\cos 2\theta}{2}").move_to(P(-3.2, 2.6))
        E2b = T(r"\cos^2\theta = \frac{1+\cos2\theta}{2}", paint=False, color=CC).move_to(P(3.2, 2.6))
        tag = MathTex(r"\theta \to \tfrac{x}{2}", color=PURPLE).move_to(P(0, 1.35))
        hs = T(r"\sin\frac{x}{2} =", r"\pm", r"\sqrt{\frac{1-\cos x}{2}}").move_to(P(-2.6, 0.0))
        rad = radical_glyphs(hs[2])
        frac_part = rest_glyphs(hs[2], rad)
        hc = T(r"\cos\frac{x}{2} =", r"\pm", r"\sqrt{\frac{1", "+", r"\cos x}{2}}", paint=False, color=CC)
        hc.shift(hs[1].get_center() - hc[1].get_center() + 1.8 * DOWN)
        with self.beat("6d") as b:
            self.play(Write(E1), run_time=b.rt(0.07))
            self.play(TransformMatchingShapes(E1, E2), run_time=b.rt(0.07))
            self.play(FadeIn(E2b, shift=0.3 * LEFT), run_time=b.rt(0.05))
            self.play(FadeIn(tag), run_time=0.6)
            b.at(b.s(1))
            self.play(Write(hs[0]), Write(hs[1]), run_time=b.rt(0.08))
            self.play(FadeIn(frac_part), run_time=b.rt(0.08))
            b.at(b.s(2))
            self.play(Create(rad), run_time=1.2)
            b.at(b.s(3))
            self.play(Write(hc), run_time=b.rt(0.08))
            self.play(Indicate(hc[3], color=HL, scale_factor=1.8), run_time=0.8)

        cc = P(4.3, -0.5)
        r = 1.2
        circ = Circle(radius=r, color=INK, stroke_width=3).move_to(cc)
        hx = Line(cc + 1.5 * LEFT, cc + 1.5 * RIGHT, color=GREY_, stroke_width=2)
        vy = Line(cc + 1.5 * DOWN, cc + 1.5 * UP, color=GREY_, stroke_width=2)
        ttl = MathTex(r"\text{sign of } \sin", color=SC).scale(0.6).next_to(circ, UP, buff=0.45)
        signs = VGroup(*[MathTex(s_, color=GREY_).scale(0.8).move_to(cc + 0.55 * P(dx, dy))
                         for s_, dx, dy in (("+", 1, 1), ("+", -1, 1), ("-", -1, -1), ("-", 1, -1))])
        th = ValueTracker(20)
        spoke = always_redraw(lambda: Line(cc, cc + r * P(np.cos(np.radians(th.get_value())),
                                                             np.sin(np.radians(th.get_value()))),
                                           color=PURPLE, stroke_width=5))
        tip = always_redraw(lambda: Dot(cc + r * P(np.cos(np.radians(th.get_value())),
                                                   np.sin(np.radians(th.get_value()))), color=PURPLE, radius=0.07))
        cap = Tex(r"Ch.\ 1.4: algebra offers both, geometry picks one").scale(0.6).move_to(P(0, -3.35))
        with self.beat("6e") as b:
            self.play(Circumscribe(hs[1], color=HL, buff=0.08), Circumscribe(hc[1], color=HL, buff=0.08), run_time=1.0)
            b.at(b.s(1))
            self.play(Create(hx), Create(vy), Create(circ), FadeIn(ttl), FadeIn(signs), run_time=0.8)
            self.add(spoke, tip)
            self.play(th.animate.set_value(130), run_time=b.rt(0.15))
            xl = MathTex(r"\tfrac{x}{2}", color=PURPLE).scale(0.85).next_to(tip, LEFT, buff=0.15)
            self.play(FadeIn(xl), signs[1].animate.set_color(GREEN).scale(1.6), run_time=0.6)
            b.at(b.s(2))
            self.play(FadeIn(cap, shift=0.2 * UP), run_time=0.7)
        self.clear_scene()

        # 3-4-5 triangle
        A_, B_, C_ = P(-6.2, -2.6), P(-3.8, -2.6), P(-3.8, -0.8)
        tri = Polygon(A_, B_, C_, stroke_color=INK, stroke_width=3)
        t4 = MathTex("4", color=CC).scale(0.6).next_to(Line(A_, B_), DOWN, buff=0.1)
        t3 = MathTex("3", color=SC).scale(0.6).next_to(Line(B_, C_), RIGHT, buff=0.1)
        t5 = MathTex("5").scale(0.6).move_to((A_ + C_) / 2 + P(-0.2, 0.25))
        tth = MathTex(r"\theta").scale(0.55).move_to(A_ + P(0.55, 0.17))
        ra = RightAngle(Line(B_, A_), Line(B_, C_), length=0.2, color=INK, stroke_width=2)
        given = T(r"\sin\theta = \tfrac35,\ \ \cos\theta = \tfrac45").move_to(P(-1.8, 2.4))
        q1 = MathTex(r"\text{(quadrant I)}", color=GREY_).scale(0.6).next_to(given, RIGHT, buff=0.3)
        main = T(r"\sin 2\theta = 2\cdot\tfrac35\cdot\tfrac45 =", r"\tfrac{24}{25}").move_to(P(-0.3, 0.6))
        wrong = MathTex(r"\tfrac65").move_to(P(4.6, 0.6))
        wn = MathTex(r"\tfrac65 > 1", color=GREY_).scale(0.7).next_to(wrong, DOWN, buff=0.45)
        with self.beat("6f") as b:
            self.play(Create(tri), Create(ra), FadeIn(t3), FadeIn(t4), FadeIn(t5), FadeIn(tth), run_time=b.rt(0.1))
            b.at(b.s(1))
            self.play(Write(given), FadeIn(q1), run_time=b.rt(0.1))
            self.play(Write(main), run_time=b.rt(0.2))
            self.play(Create(box(main[1])), run_time=0.5)
            b.at(b.s(2))
            self.play(FadeIn(wrong), run_time=0.5)
            self.play(Create(xcross(wrong).scale(1.3)), FadeIn(wn), run_time=0.7)
        self.clear_scene()

    # ------------------------------------------------------------------
    def scene7(self):
        def row(lhs, t1, sign, t2):
            return T(lhs, "=", t1, sign, t2, scale=0.85)

        top = row(r"\cos(\alpha-\beta)", r"\cos\alpha\cos\beta", "+", r"\sin\alpha\sin\beta").move_to(P(0.4, 2.8))
        bot = row(r"\cos(\alpha+\beta)", r"\cos\alpha\cos\beta", "-", r"\sin\alpha\sin\beta")
        bot.shift(top[1].get_center() - bot[1].get_center() + 0.85 * DOWN)
        rule = Line(P(-3.6, 1.55), P(4.4, 1.55), color=GREY_, stroke_width=2)
        opPlus = MathTex("+", color=PURPLE).scale(1.2).move_to(P(-4.1, 2.35))
        opMinus = MathTex("-", color=PURPLE).scale(1.2).move_to(opPlus)
        res1 = T(r"\cos\alpha\cos\beta = \tfrac12[\cos(\alpha-\beta)+\cos(\alpha+\beta)]", scale=0.85).move_to(P(0.4, 0.8))
        res2 = T(r"\sin\alpha\sin\beta = \tfrac12[\cos(\alpha-\beta)-\cos(\alpha+\beta)]", scale=0.85).move_to(P(0.4, 0.8))
        res3 = T(r"\sin\alpha\cos\beta = \tfrac12[\sin(\alpha+\beta)+\sin(\alpha-\beta)]", scale=0.85).move_to(P(0.4, 0.8))
        slots = [P(0.4, -1.0), P(0.4, -1.95), P(0.4, -2.9)]
        colhead = Text("product to sum", font_size=24, color=GREY_).move_to(P(-4.6, -1.95))

        def cancel(*ms):
            self.play(*[m.animate.set_color(RED_) for m in ms], run_time=0.35)
            self.play(*[m.animate.set_opacity(0) for m in ms], run_time=0.4)

        with self.beat("7a") as b:
            self.play(FadeIn(top), FadeIn(bot), Create(rule), run_time=0.8)
            self.play(FadeIn(opPlus), run_time=0.3)
            cancel(top[4], bot[4])
            self.play(Write(res1), run_time=0.8)
            self.play(res1.animate.scale(0.8).move_to(slots[0]), FadeIn(colhead), run_time=0.5)
            b.at(b.s(1))
            self.play(top[4].animate.set_opacity(1).set_color(INK), bot[4].animate.set_opacity(1).set_color(INK),
                      ReplacementTransform(opPlus, opMinus), run_time=0.5)
            # repaint the restored sine terms
            for m in (top[4], bot[4]):
                m[0:3].set_color(SC)
                m[4:7].set_color(SC)
            cancel(top[2], bot[2])
            self.play(Write(res2), run_time=0.8)
            self.play(res2.animate.scale(0.8).move_to(slots[1]), run_time=0.5)
            b.at(b.s(2))
            self.play(Indicate(VGroup(res1, res2), color=HL, scale_factor=1.05), run_time=0.8)
            b.at(b.s(3))
            top2 = row(r"\sin(\alpha+\beta)", r"\sin\alpha\cos\beta", "+", r"\cos\alpha\sin\beta").move_to(top)
            bot2 = row(r"\sin(\alpha-\beta)", r"\sin\alpha\cos\beta", "-", r"\cos\alpha\sin\beta")
            bot2.shift(top2[1].get_center() - bot2[1].get_center() + 0.85 * DOWN)
            self.play(FadeOut(top), FadeOut(bot), FadeOut(opMinus), run_time=0.5)
            opP2 = MathTex("+", color=PURPLE).scale(1.2).move_to(P(-4.1, 2.35))
            self.play(FadeIn(top2), FadeIn(bot2), FadeIn(opP2), run_time=0.8)
            cancel(top2[4], bot2[4])
            self.play(Write(res3), run_time=0.8)
            self.play(res3.animate.scale(0.8).move_to(slots[2]), run_time=0.5)
        self.clear_scene()

        form = T(r"\sin A + \sin B = 2\sin\!\left(\tfrac{A+B}{2}\right)\cos\!\left(\tfrac{A-B}{2}\right)",
                 scale=0.8).move_to(P(0, 3.25))
        ax = Axes(x_range=[0, 1, 0.25], y_range=[-2.2, 2.2, 1], x_length=11, y_length=3, tips=False,
                  axis_config={"color": GREY_, "stroke_width": 2}).move_to(P(0, -0.1))
        ticks = VGroup(*[MathTex(f"{v:g}").scale(0.5).next_to(ax.c2p(v, 0), DOWN, buff=0.12).shift(0.0 * UP)
                         for v in (0.25, 0.5, 0.75, 1)])
        ticks.shift((ax.c2p(0, -2.2)[1] - ticks[0].get_top()[1]) * UP + 0.12 * DOWN)
        for tk, v in zip(ticks, (0.25, 0.5, 0.75, 1)):
            tk.set_x(ax.c2p(v, 0)[0])
        tlab = MathTex(r"t\ (\text{s})", color=GREY_).scale(0.5).next_to(ticks[-1], RIGHT, buff=0.25)
        f1, f2 = 22, 26
        wave = ax.plot(lambda t: np.sin(2 * PI * f1 * t) + np.sin(2 * PI * f2 * t), x_range=[0, 1, 0.001],
                       use_smoothing=False, color=SC, stroke_width=2)
        envU = DashedVMobject(ax.plot(lambda t: 2 * np.cos(2 * PI * 2 * t), x_range=[0, 1, 0.001], use_smoothing=False,
                                      color=HL, stroke_width=4), num_dashes=60)
        envD = DashedVMobject(ax.plot(lambda t: -2 * np.cos(2 * PI * 2 * t), x_range=[0, 1, 0.001], use_smoothing=False,
                                      color=HL, stroke_width=4), num_dashes=60)
        cap = Text("scaled down: same beat idea", font_size=22, color=GREY_).move_to(P(4.3, 2.2))
        info = MathTex(r"440\text{ Hz} + 444\text{ Hz} \Rightarrow 442\text{ Hz tone},\ 4 \text{ beats/s}").scale(0.8).move_to(P(0, -2.75))
        with self.beat("7b") as b:
            self.play(Write(form), run_time=b.rt(0.15))
            self.play(Create(ax), FadeIn(ticks), FadeIn(tlab), FadeIn(cap), run_time=0.7)
            self.play(Create(wave), run_time=b.rt(0.2), rate_func=linear)
            b.at(b.s(1))
            self.play(Create(envU), Create(envD), run_time=b.rt(0.15))
            self.play(Write(info), run_time=b.rt(0.15))

        rect = Rectangle(width=ax.c2p(0.5, 0)[0] - ax.c2p(0, 0)[0], height=ax.c2p(0, 2.2)[1] - ax.c2p(0, -2.2)[1],
                         stroke_width=0, fill_color=HL, fill_opacity=0.18)
        rect.move_to(ax.c2p(0.25, 0))
        rl = MathTex(r"2\text{ Hz envelope}").scale(0.6).next_to(rect, UP, buff=0.08)
        ext = [(0, 2), (0.25, -2), (0.5, 2), (0.75, -2), (1, 2)]
        dots = [Dot(ax.c2p(t, y), color=PRIMARY, radius=0.09) for t, y in ext]
        counter_lbl = MathTex(r"\text{beats}:").scale(0.8)
        with self.beat("7c") as b:
            self.play(FadeOut(info), FadeIn(rect), FadeIn(rl), run_time=b.rt(0.1))
            b.at(b.s(1))
            num = MathTex("0").scale(0.8)
            cgrp = VGroup(counter_lbl, num).arrange(RIGHT, buff=0.2).move_to(P(-3, -2.8))
            self.play(FadeIn(cgrp), run_time=0.3)
            for k, d in enumerate(dots):
                self.play(FadeIn(d, scale=0.5), Flash(d, color=PRIMARY, flash_radius=0.2), run_time=0.55)
                if k >= 1:
                    new = MathTex(str(k)).scale(0.8).move_to(num)
                    self.play(Transform(num, new), run_time=0.25)
            b.at(b.s(2))
            fin = MathTex(r"444 - 440 = 4").move_to(P(3, -2.8))
            self.play(Write(fin), run_time=0.6)
            self.play(Create(box(fin)), run_time=0.5)
        self.clear_scene()

        left = [
            r"\cos\alpha\cos\beta = \tfrac12[\cos(\alpha-\beta)+\cos(\alpha+\beta)]",
            r"\sin\alpha\sin\beta = \tfrac12[\cos(\alpha-\beta)-\cos(\alpha+\beta)]",
            r"\sin\alpha\cos\beta = \tfrac12[\sin(\alpha+\beta)+\sin(\alpha-\beta)]",
        ]
        right = [
            r"\sin A + \sin B = 2\sin\tfrac{A+B}{2}\cos\tfrac{A-B}{2}",
            r"\sin A - \sin B = 2\cos\tfrac{A+B}{2}\sin\tfrac{A-B}{2}",
            r"\cos A + \cos B = 2\cos\tfrac{A+B}{2}\cos\tfrac{A-B}{2}",
        ]
        L = [T(s_, scale=0.62).move_to(P(-3.5, 1.2 - 1.1 * i)) for i, s_ in enumerate(left)]
        Rr = [T(s_, scale=0.62).move_to(P(3.6, 1.2 - 1.1 * i)) for i, s_ in enumerate(right)]
        hL = Text("products to sums", font_size=24, color=GREY_).move_to(P(-3.5, 2.3))
        hR = Text("sums to products", font_size=24, color=GREY_).move_to(P(3.6, 2.3))
        six = L + Rr
        fS = T(r"\sin(\alpha+\beta) = \sin\alpha\cos\beta + \cos\alpha\sin\beta").move_to(P(0, 0.7))
        fC = T(r"\cos(\alpha+\beta) = \cos\alpha\cos\beta - \sin\alpha\sin\beta").move_to(P(0, -0.7))
        gS = SurroundingRectangle(fS, color=SC, buff=0.2, stroke_width=3, fill_color=SC, fill_opacity=0.08)
        gC = SurroundingRectangle(fC, color=CC, buff=0.2, stroke_width=3, fill_color=CC, fill_opacity=0.08)
        target = [fC, fC, fS, fS, fS, fC]
        with self.beat("7d") as b:
            for m in six:
                m.set_opacity(0.5)
            self.play(FadeIn(hL), FadeIn(hR), *[FadeIn(m) for m in six], run_time=b.rt(0.25))
            b.at(b.s(1))
            copies = [t.copy() for t in target]
            self.play(FadeOut(hL), FadeOut(hR),
                      LaggedStart(*[Transform(m, c_) for m, c_ in zip(six, copies)], lag_ratio=0.12),
                      run_time=b.rt(0.5))
            self.remove(*six)
            self.add(fS, fC)
            self.play(FadeIn(gS), FadeIn(gC), run_time=0.5)
        self.wait(0.4)
        self.clear_scene()

    # ------------------------------------------------------------------
    def scene8(self):
        ttl = Tex(r"\textbf{The core set}").scale(0.9)
        lines = VGroup(
            T(r"1.\ \sin^2\theta+\cos^2\theta=1"),
            T(r"2.\ \sin(\alpha+\beta),\ \cos(\alpha+\beta)"),
            T(r"3.\ \sin(-\theta)=-\sin\theta,\ \cos(-\theta)=\cos\theta,\ \cos\theta=\sin(\theta+\tfrac{\pi}{2})"),
            T(r"\tan=\tfrac{\sin}{\cos},\ \sec,\ \csc,\ \cot", scale=0.7),
        )
        for m in lines[:3]:
            m.scale(0.8)
        lines.arrange(DOWN, aligned_edge=LEFT, buff=0.35)
        inner = VGroup(ttl, lines).arrange(DOWN, buff=0.45)
        frame = RoundedRectangle(corner_radius=0.2, width=inner.width + 0.8, height=inner.height + 0.7,
                                 stroke_color=INK, stroke_width=2)
        card = VGroup(frame, inner).move_to(ORIGIN)
        banner = T(r"\text{Core: }\ \sin^2\theta+\cos^2\theta=1\ \mid\ \sin(\alpha+\beta),\ \cos(\alpha+\beta)\ \mid\ \text{circle symmetry}")
        banner.scale_to_fit_width(11.5)
        bframe = SurroundingRectangle(banner, color=GREY_, buff=0.12, stroke_width=1.5, corner_radius=0.1)
        bgrp = VGroup(bframe, banner).move_to(P(0, 3.5))
        with self.beat("8a") as b:
            self.play(Create(frame), FadeIn(ttl), run_time=0.7)
            self.play(LaggedStart(*[FadeIn(m, shift=0.2 * RIGHT) for m in lines], lag_ratio=0.4), run_time=b.rt(0.45))
            b.at(0.8)
            self.play(ReplacementTransform(card, bgrp), run_time=1.0)

        rows_src = [
            (r"1+\tan^2=\sec^2", r"\text{Pythagoras} \div \cos^2"),
            (r"1+\cot^2=\csc^2", r"\text{Pythagoras} \div \sin^2"),
            (r"\sin(\alpha-\beta)", r"\text{angle sum},\ \beta\to-\beta,\ \text{then symmetry}"),
            (r"\sin 2\theta", r"\text{angle sum},\ \beta=\alpha"),
            (r"\cos 2\theta\ (\text{three forms})", r"\text{angle sum},\ \beta=\alpha,\ \text{then Pythagoras twice}"),
            (r"\text{Half angle}", r"\text{rearrange } \cos 2\theta,\ \theta\to\tfrac{x}{2}"),
            (r"\text{Product to sum}", r"\text{add or subtract two angle-sum formulas}"),
            (r"\tan(\alpha+\beta)", r"\text{divide the sum formulas},\ \div\cos\alpha\cos\beta"),
        ]
        x1, x2 = -6.2, -2.0
        hdr = VGroup(MathTex(r"\textbf{Target}").scale(0.62), MathTex(r"\textbf{Path from the core}").scale(0.62))
        hdr[0].move_to(P(0, 2.7))
        hdr[0].shift((x1 - hdr[0].get_left()[0]) * RIGHT)
        hdr[1].move_to(P(0, 2.7))
        hdr[1].shift((x2 - hdr[1].get_left()[0]) * RIGHT)
        hrule = Line(P(x1, 2.4), P(6.2, 2.4), color=GREY_, stroke_width=2)
        rows = []
        for i, (a_, b_) in enumerate(rows_src):
            y = 2.0 - 0.6 * i
            c1 = T(a_, scale=0.6).move_to(P(0, y))
            c1.shift((x1 - c1.get_left()[0]) * RIGHT)
            c2 = T(b_, scale=0.6).move_to(P(0, y))
            c2.shift((x2 - c2.get_left()[0]) * RIGHT)
            rows.append(VGroup(c1, c2))
        with self.beat("8b") as b:
            self.play(FadeIn(hdr), Create(hrule), run_time=0.5)
            self.play(LaggedStart(*[FadeIn(r_) for r_ in rows], lag_ratio=0.15), run_time=b.rt(0.2))
            hl = None
            for si, ri in ((2, 3), (3, 5), (4, 6)):
                b.at(b.s(si))
                nb = SurroundingRectangle(rows[ri], color=HL, buff=0.08, stroke_width=3)
                if hl is None:
                    self.play(Create(nb), Indicate(rows[ri], color=HL, scale_factor=1.05), run_time=1.0)
                else:
                    self.play(ReplacementTransform(hl, nb), Indicate(rows[ri], color=HL, scale_factor=1.05), run_time=1.0)
                hl = nb
        self.play(FadeOut(VGroup(hdr, hrule, *rows, hl)), run_time=0.6)
        self._banner = bgrp

        E0 = T(r"\frac{", r"\sin 2\theta", "}{", r"1+", r"\cos 2\theta", "}", r"=\tan\theta").move_to(P(0, -0.3))
        bx0 = box(VGroup(*E0[:6]))
        cands = VGroup(T(r"\cos^2\theta-\sin^2\theta", scale=0.7), T(r"1-2\sin^2\theta", scale=0.7),
                       T(r"2\cos^2\theta-1", scale=0.7)).arrange(RIGHT, buff=1.0).move_to(P(0, 2.0))
        E1 = T(r"\frac{", r"2\sin\theta\cos\theta", "}{", "1", "+", r"2\cos^2\theta", "-1", "}", r"=\tan\theta").move_to(P(0, -0.3))
        E2 = T(r"\frac{", "2", r"\sin\theta", r"\cos\theta", "}{", r"2\cos\theta", r"\,\cos\theta", "}", r"=\tan\theta").move_to(P(0, -0.3))
        E3 = T(r"\frac{\sin\theta}{\cos\theta}", r"=\tan\theta").move_to(P(0, -0.3))
        with self.beat("8c") as b:
            self.play(Write(E0), run_time=b.rt(0.1))
            self.play(Create(bx0), run_time=0.5)
            b.at(b.s(1))
            self.play(FadeOut(bx0), ReplacementTransform(E0[1], E1[1]), run_time=b.rt(0.08))
            b.at(b.s(2))
            self.play(FadeIn(cands), run_time=0.6)
            cb = box(cands[2])
            self.play(Create(cb), run_time=0.4)
            self.play(ReplacementTransform(cands[2].copy(), VGroup(E1[5], E1[6])), FadeOut(E0[4]),
                      ReplacementTransform(VGroup(E0[0], E0[2], E0[3], E0[5], E0[6]),
                                           VGroup(E1[0], E1[2], E1[3], E1[4], E1[7], E1[8])),
                      FadeOut(cands), FadeOut(cb), run_time=1.0)
            b.at(b.s(3))
            self.play(VGroup(E1[3], E1[4], E1[6]).animate.set_color(RED_), run_time=0.4)
            self.play(FadeOut(VGroup(E1[3], E1[4], E1[6])), run_time=0.4)
            self.play(TransformMatchingShapes(VGroup(E1[0], E1[1], E1[2], E1[5], E1[7], E1[8]), E2), run_time=0.8)
            b.at(b.s(4))
            self.play(VGroup(E2[1], E2[3], E2[5]).animate.set_color(RED_), run_time=0.4)
            self.play(FadeOut(VGroup(E2[1], E2[3], E2[5])), run_time=0.4)
            self.play(TransformMatchingShapes(VGroup(E2[0], E2[2], E2[4], E2[6], E2[7], E2[8]), E3), run_time=0.8)
            self.play(Create(box(E3)), run_time=0.5)
        self.wait(0.3)
        self.clear_scene()

        def icon(kind):
            if kind == 0:
                return Circle(radius=0.22, color=SC, stroke_width=4)
            if kind == 1:
                return Square(side_length=0.42, color=CC, stroke_width=4)
            return VGroup(RoundedRectangle(corner_radius=0.08, width=0.6, height=0.44, color=PURPLE, stroke_width=3),
                          MathTex("2x", color=PURPLE).scale(0.55))

        q = [
            Tex("1. Can I write it in sine and cosine?"),
            Tex(r"2. Is there a hidden $\sin^2 + \cos^2$?"),
            Tex("3. Is a double or half angle in sight?"),
        ]
        head = Text("When stuck, ask:", font_size=36, weight="BOLD").move_to(P(0, 2.4))
        items = VGroup(*[VGroup(icon(i), q[i].scale(0.85)).arrange(RIGHT, buff=0.35) for i in range(3)])
        items.arrange(DOWN, aligned_edge=LEFT, buff=0.55).move_to(P(0, -0.2))
        with self.beat("8d") as b:
            self.play(FadeIn(head), run_time=0.5)
            for i in range(3):
                b.at([0.14, b.s(1), b.s(2)][i])
                self.play(FadeIn(items[i], shift=0.3 * RIGHT), run_time=0.6)
        self.clear_scene()

    # ------------------------------------------------------------------
    def scene9(self):
        tagp = note(r"\text{path: difference of squares, then Pythagoras, then double angle}", 0.7).move_to(P(0, 2.7))
        l1 = T(r"\cos^4\theta - \sin^4\theta").move_to(P(-1.6, 1.5))
        tempt = T(r"\overset{?}{=}\ \cos 4\theta").next_to(l1, RIGHT, buff=0.3)
        l2 = T("=(", r"\cos^2\theta+\sin^2\theta", ")(", r"\cos^2\theta-\sin^2\theta", ")").move_to(P(0, 0.1))
        l3 = T("=", "1", r"\cdot", r"\cos 2\theta", "=", r"\cos 2\theta").move_to(P(0, -1.4))
        l2.shift((l1.get_left()[0] - l2.get_left()[0]) * RIGHT)
        l3.shift((l1.get_left()[0] - l3.get_left()[0]) * RIGHT)
        with self.beat("9a") as b:
            self.play(Write(l1), run_time=b.rt(0.06))
            b.at(b.s(1))
            self.play(FadeIn(tempt), run_time=0.6)
            self.play(Create(xcross(tempt)), run_time=0.5)
            b.at(b.s(2))
            self.play(FadeIn(tagp, shift=0.2 * DOWN), run_time=0.6)
            self.play(Write(l2), run_time=b.rt(0.1))
            self.play(Indicate(l2[1], color=HL), run_time=0.8)
            self.play(l2[1].animate.set_color(INK), run_time=0.4)
            self.play(FadeIn(l3[0]), TransformFromCopy(l2[1], l3[1]), FadeIn(l3[2]), run_time=0.8)
            b.at(0.8)
            self.play(Indicate(l2[3], color=HL), run_time=0.7)
            self.play(TransformFromCopy(l2[3], l3[3]), run_time=0.8)
            self.play(FadeIn(l3[4]), FadeIn(l3[5]), run_time=0.5)
            self.play(Create(box(l3[5])), run_time=0.5)
        self.wait(0.3)
        self.clear_scene()

        banner = self._banner.copy().set_opacity(0.2)
        banner[0].set_fill(opacity=0)
        ttl = Text("The chapter in three lines", font_size=36, weight="BOLD").move_to(P(0, 2.4))
        items = VGroup(
            VGroup(Tex(r"1. An identity is true for all valid inputs;"),
                   Tex(r"\quad\ prove it by transforming one side.")),
            VGroup(Tex(r"2. The core set is Pythagoras, angle sum, and circle symmetry."),
                   Tex(r"\quad\ Everything else is a derivation.")),
            VGroup(Tex(r"3. When stuck: convert to sine and cosine, hunt for a hidden"),
                   Tex(r"\quad\ Pythagoras, or bridge angles with the sum formula.")),
        )
        for it in items:
            it.scale(0.72).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        items.arrange(DOWN, aligned_edge=LEFT, buff=0.45).move_to(P(0, -0.3))
        with self.beat("9b") as b:
            self.play(FadeIn(banner), FadeIn(ttl), run_time=0.6)
            self.play(FadeIn(items[0], shift=0.2 * UP), run_time=0.6)
        self.play(FadeIn(items[1], shift=0.2 * UP), run_time=0.6)
        self.wait(1.5)
        self.play(FadeIn(items[2], shift=0.2 * UP), run_time=0.6)
        self.wait(5.0)
        self.clear_scene()

        ax = self.sine_axes(center=P(0, 0.2), y_length=3.4)
        sine = ax.plot(np.sin, x_range=[-6.5, 6.5], color=SC, stroke_width=4)
        half = DashedLine(ax.c2p(-6.5, 0.5), ax.c2p(6.5, 0.5), color=INK, stroke_width=2, dash_length=0.12)
        xs = [np.pi / 6 - 2 * np.pi, 5 * np.pi / 6 - 2 * np.pi, np.pi / 6, 5 * np.pi / 6]
        dots = VGroup(*[Dot(ax.c2p(x, 0.5), color=PRIMARY, radius=0.09) for x in xs])
        cap = Text("Chapter 4: Solving Trigonometric Equations", font_size=34, color=PRIMARY, weight="BOLD").move_to(P(0, -2.6))
        with self.beat("9c") as b:
            self.play(Create(ax), Create(sine), run_time=b.rt(0.2))
            self.play(Create(half), run_time=0.6)
            b.at(b.s(1))
            self.play(LaggedStart(*[GrowFromCenter(d) for d in dots], lag_ratio=0.3), run_time=b.rt(0.2))
            self.play(FadeIn(cap, shift=0.2 * UP), run_time=0.8)
        self.wait(0.8)
        self.clear_scene(1.2)
        self.wait(0.5)
