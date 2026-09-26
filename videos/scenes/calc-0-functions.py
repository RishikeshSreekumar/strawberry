import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "lib"))
from contextlib import contextmanager

import numpy as np
from manim import *
from strawberry import *

# Script colours mapped onto the light Strawberry palette.
BLUE_C = ManimColor("#2F6DB5")  # primary curve
ORANGE_C = ACCENT  # secondary curve
HL = PURPLE  # highlight (script's YELLOW; yellow is unreadable on cream)
WRONG = PRIMARY
RIGHT_C = GREEN
FAINT = ManimColor("#B9A9A3")


def T(s, fs=30, color=INK, **kw):
    return Text(s, font_size=fs, color=color, **kw)


def M(*s, fs=40, color=INK, **kw):
    return MathTex(*s, font_size=fs, color=color, **kw)


def cell(s, fs=30, color=INK):
    if isinstance(s, Mobject):
        return s
    if s is None or s == "":
        return VectorizedPoint()
    if s.startswith("$"):
        return M(s[1:], fs=fs + 6, color=color)
    return T(s, fs=fs, color=color)


def grid(rows, col_w, row_h=0.62, fs=30):
    """Simple table: rows of strings ("$..." = MathTex). First row is the header."""
    rowgroups = []
    for r, row in enumerate(rows):
        rg = VGroup()
        x = 0.0
        for c, s in enumerate(row):
            m = cell(s, fs)
            m.move_to([x + col_w[c] / 2, -r * row_h, 0])
            x += col_w[c]
            rg.add(m)
        rowgroups.append(rg)
    W = sum(col_w)
    lines = VGroup(Line([0, -row_h / 2, 0], [W, -row_h / 2, 0], color=INK, stroke_width=2))
    x = 0.0
    for c in range(len(col_w) - 1):
        x += col_w[c]
        lines.add(Line([x, row_h / 2, 0], [x, -(len(rows) - 0.5) * row_h, 0],
                       color=MUTED, stroke_width=1.5, stroke_opacity=0.6))
    g = VGroup(*rowgroups, lines)
    g.rows = rowgroups
    return g


def mk_axes(xr, yr, w, h, numbers=True, fs=22, **kw):
    ax = Axes(
        x_range=xr, y_range=yr, x_length=w, y_length=h, tips=False,
        axis_config={"include_numbers": numbers, "font_size": fs, "stroke_width": 2},
        **kw,
    )
    ax.set_color(INK)
    return ax


def P(ax, f, a, b, color=BLUE_C, sw=4, **kw):
    return ax.plot(f, x_range=[a, b, (b - a) / 200], color=color, stroke_width=sw, **kw)


def check(fs=44):
    return M(r"\checkmark", fs=fs, color=RIGHT_C)


def xmark(fs=44):
    return M(r"\times", fs=fs, color=WRONG)


def box_tag(mob, text, fs=24, color=INK):
    return T(text, fs=fs, color=color)


class CalcCh0Video(NarratedScene):
    # ---------- helpers ----------
    @contextmanager
    def say(self, *parts):
        text = " ".join(parts)
        with self.voiceover(text) as vo:
            total = sum(len(p) for p in parts)
            yield [vo.duration * len(p) / total for p in parts]

    @contextmanager
    def slot(self, dur):
        t0 = self.renderer.time
        yield dur
        rem = dur - (self.renderer.time - t0)
        if rem > 0.02:
            self.wait(rem)

    def wipe(self, rt=0.6, keep=()):
        keep = set(id(k) for k in keep) | {id(self.header)}
        ms = [m for m in self.mobjects if id(m) not in keep]
        for m in ms:
            m.clear_updaters()
        if ms:
            self.play(*[FadeOut(m) for m in ms], run_time=rt)

    def machine(self, label, w=2.2, h=1.3, color=INK):
        box = RoundedRectangle(width=w, height=h, corner_radius=0.2, color=color, stroke_width=3,
                               fill_color=BG, fill_opacity=1)
        lab = label if isinstance(label, Mobject) else M(label, fs=40)
        lab.move_to(box)
        return VGroup(box, lab)

    def token(self, s, color=HL):
        d = Dot(radius=0.12, color=color)
        lab = T(s, fs=26, color=color).next_to(d, UP, buff=0.12)
        return VGroup(d, lab)

    def mapping(self, center, ins, outs, pairs, title, ok, fs=26, gap=0.8, spread=2.8):
        x0, y0 = center[0], center[1]
        n = max(len(ins), len(outs))

        def col(k, x):
            return [np.array([x, y0 + (k - 1) / 2 * gap - i * gap, 0]) for i in range(k)]

        ip, op = col(len(ins), x0 - spread / 2), col(len(outs), x0 + spread / 2)
        idots = VGroup(*[Dot(p, radius=0.07, color=INK) for p in ip])
        odots = VGroup(*[Dot(p, radius=0.07, color=INK) for p in op])
        ilab = VGroup(*[T(s, fs).next_to(d, LEFT, buff=0.15) for s, d in zip(ins, idots)])
        olab = VGroup(*[T(s, fs).next_to(d, RIGHT, buff=0.15) for s, d in zip(outs, odots)])
        eh = n * gap + 0.4
        iov = Ellipse(width=1.6, height=eh, color=MUTED, stroke_width=2).move_to(
            VGroup(idots, ilab).get_center()).set_y(y0)
        oov = Ellipse(width=1.6, height=eh, color=MUTED, stroke_width=2).move_to(
            VGroup(odots, olab).get_center()).set_y(y0)
        arrows = VGroup(*[
            Arrow(ip[i], op[j], buff=0.12, color=INK, stroke_width=3,
                  max_tip_length_to_length_ratio=0.1, max_stroke_width_to_length_ratio=10)
            for i, j in pairs
        ])
        head = VGroup(T(title, 28, weight=BOLD), check(40) if ok else xmark(40)).arrange(RIGHT, buff=0.2)
        head.next_to(VGroup(iov, oov), UP, buff=0.25).set_x(x0)
        g = VGroup(head, iov, oov, idots, odots, ilab, olab, arrows)
        g.arrows = arrows
        return g

    # ---------- scenes ----------
    def construct(self):
        self.header = T("Chapter 0 · Functions", fs=22, color=MUTED).to_corner(UL, buff=0.3)
        self.s1()
        self.s2()
        self.s3()
        self.s4()
        self.s5()
        self.s6()
        self.s7()
        self.s8()
        self.s9()
        self.s10()
        self.s11()
        self.s12()

    # Scene 1 ---------------------------------------------------------------
    def s1(self):
        self.title_card("Calculus", "Chapter 0 · Functions: The Language of Calculus",
                        "Welcome to Chapter Zero: functions, the language of calculus.")
        self.play(FadeIn(self.header, shift=0.2 * LEFT), run_time=0.6)

        eq = M(r"\text{Fare} = 50 + 15 \cdot (\text{distance})", fs=44).move_to(UP * 2.3)
        tab = grid([["Distance", "Fare"], ["1 km", "Rs 65"], ["2 km", "Rs 80"], ["5 km", "Rs 125"]],
                   [2.8, 2.8], row_h=0.75, fs=32)
        tab.move_to(DOWN * 0.7)
        with self.say("The meter starts at fifty rupees, and every kilometre adds fifteen.",
                      "One kilometre, sixty five.", "Two, eighty.", "Five, one hundred twenty five.") as d:
            with self.slot(d[0]):
                self.play(Write(eq), run_time=d[0] * 0.6)
                self.play(FadeIn(tab.rows[0]), Create(tab[-1]), run_time=d[0] * 0.3)
            for i in (1, 2, 3):
                with self.slot(d[i]):
                    r = tab.rows[i]
                    self.play(FadeIn(r, shift=0.15 * UP), run_time=d[i] * 0.4)
                    self.play(r[1].animate.set_color(HL).scale(1.15), run_time=d[i] * 0.3)
                    self.play(r[1].animate.set_color(INK).scale(1 / 1.15), run_time=d[i] * 0.25)

        box = self.machine("f", w=2.4, h=1.6)
        a_in = Arrow(LEFT * 5, box.get_left(), buff=0.1, color=INK, stroke_width=4)
        a_out = Arrow(box.get_right(), RIGHT * 5, buff=0.1, color=INK, stroke_width=4)
        lx = M("x", fs=44).next_to(a_in, UP, buff=0.15)
        lfx = M("f(x)", fs=44).next_to(a_out, UP, buff=0.15)
        tin = T("input: distance", fs=26, color=BLUE_C).next_to(a_in, DOWN, buff=0.25)
        tout = T("output: fare", fs=26, color=ORANGE_C).next_to(a_out, DOWN, buff=0.25)
        chain = M(r"x \;\to\; f \;\to\; f(x)", fs=48).move_to(DOWN * 2.5)
        with self.say("Distance is the input.", "Fare is the output.",
                      "Something goes in, a rule is applied, something comes out.") as d:
            with self.slot(d[0]):
                self.play(FadeOut(tab), eq.animate.scale(0.8).move_to(UP * 2.6), run_time=0.5)
                self.play(FadeIn(box), GrowArrow(a_in), FadeIn(lx), FadeIn(tin), run_time=d[0] - 0.6)
            with self.slot(d[1]):
                self.play(GrowArrow(a_out), FadeIn(lfx), FadeIn(tout), run_time=d[1] * 0.8)
            with self.slot(d[2]):
                t5 = self.token("5").move_to(LEFT * 5.3 + UP * 0.2)
                self.play(FadeIn(t5), run_time=0.3)
                self.play(t5.animate.move_to(box.get_center() + UP * 0.2), run_time=d[2] * 0.25)
                self.remove(t5)
                self.play(Indicate(box, color=HL, scale_factor=1.12), run_time=d[2] * 0.15)
                t125 = self.token("125").move_to(box.get_center() + UP * 0.2)
                self.add(t125)
                self.play(t125.animate.move_to(RIGHT * 5.3 + UP * 0.2), run_time=d[2] * 0.25)
                self.play(Write(chain), run_time=d[2] * 0.2)
        self.wipe()

    # Scene 2 ---------------------------------------------------------------
    def s2(self):
        title = T("Function", fs=36, weight=BOLD, color=PRIMARY)
        sent = T("A function assigns exactly one output to every valid input.", fs=32,
                 t2c={"exactly one": HL})
        g = VGroup(title, sent).arrange(DOWN, buff=0.4).move_to(UP * 0.3)
        frame = SurroundingRectangle(g, color=INK, buff=0.45, corner_radius=0.15, stroke_width=2)
        hl_chars = VGroup(*[c for c in sent if c.get_color() == HL])
        ul = Underline(hl_chars, color=HL, stroke_width=4, buff=0.08)
        with self.say("A function assigns exactly one output to every valid input.") as d:
            self.play(Create(frame), FadeIn(title), run_time=0.6)
            self.play(Write(sent), run_time=d[0] * 0.55)
            self.play(Create(ul), run_time=0.5)
        self.wipe()

        left = self.mapping([-3.5, -0.6], ["1", "2", "3"], ["A", "B"], [(0, 0), (1, 1), (2, 0)],
                            "Function", True)
        right = self.mapping([3.5, -0.6], ["1"], ["A", "B"], [(0, 0), (0, 1)], "Not a function", False)
        right.shift(UP * 0.0)
        with self.say("Two inputs may share an output.", "But one input can never have two outputs.",
                      "Reversing can fail: one date, one noon temperature, but one temperature, many dates.") as d:
            with self.slot(d[0]):
                self.play(FadeIn(left), run_time=d[0] * 0.8)
            with self.slot(d[1]):
                self.play(FadeIn(right), run_time=d[1] * 0.4)
                self.play(right.arrows.animate.set_color(WRONG), run_time=0.3)
                self.play(*[Flash(a.get_end(), color=WRONG, flash_radius=0.3) for a in right.arrows],
                          run_time=d[1] * 0.3)
            with self.slot(d[2]):
                self.play(FadeOut(left), FadeOut(right), run_time=0.5)
                dl = self.mapping([-3.5, -0.6], ["Mon", "Tue", "Wed"], ["24°", "27°"],
                                  [(0, 0), (1, 0), (2, 1)], "date → temperature", True, fs=24, spread=3.0)
                dr = self.mapping([3.5, -0.6], ["24°"], ["Mon", "Tue"], [(0, 0), (0, 1)],
                                  "temperature → date", False, fs=24, spread=3.0)
                self.play(FadeIn(dl), run_time=d[2] * 0.3)
                self.play(FadeIn(dr), run_time=d[2] * 0.3)
                self.play(dr.arrows.animate.set_color(WRONG), run_time=0.4)
        self.wipe()

        pairs = M("(", "1", ",", "5", r"),\ (", "2", ",", "5", r"),\ (", "3", ",", "7", r"),\ (",
                  "2", ",", "9", ")", fs=56).move_to(UP * 0.8)
        hd = T("Worked example", fs=30, color=MUTED).move_to(UP * 2.6)
        with self.say("Worked example.", "One paired with five, two with five, three with seven, two with nine.",
                      "Input two gets five and nine.", "Not a function.", "The repeated five is fine.") as d:
            with self.slot(d[0]):
                self.play(FadeIn(hd), run_time=0.5)
            with self.slot(d[1]):
                self.play(Write(pairs), run_time=d[1] * 0.6)
                self.play(*[pairs[i].animate.set_color(BLUE_C) for i in (1, 5, 9, 13)], run_time=d[1] * 0.3)
            with self.slot(d[2]):
                b1 = SurroundingRectangle(pairs[5], color=HL, buff=0.08)
                b2 = SurroundingRectangle(pairs[13], color=HL, buff=0.08)
                self.play(Create(b1), Create(b2), run_time=d[2] * 0.3)
                c1 = CurvedArrow(pairs[5].get_top() + UP * 0.2, pairs[7].get_top() + UP * 0.2,
                                 angle=-PI / 2, color=WRONG, stroke_width=4, tip_length=0.18)
                c2 = CurvedArrow(pairs[13].get_top() + UP * 0.2, pairs[15].get_top() + UP * 0.2,
                                 angle=-PI / 2, color=WRONG, stroke_width=4, tip_length=0.18)
                self.play(Create(c1), Create(c2), run_time=d[2] * 0.4)
            with self.slot(d[3]):
                verdict = T("Not a function", fs=36, color=WRONG, weight=BOLD).move_to(DOWN * 0.6)
                self.play(FadeIn(verdict, scale=1.2), Flash(pairs[7], color=WRONG),
                          Flash(pairs[15], color=WRONG), run_time=d[3] * 0.8)
            with self.slot(d[4]):
                o1 = Underline(pairs[3], color=RIGHT_C, stroke_width=6, buff=0.1)
                o2 = Underline(pairs[7], color=RIGHT_C, stroke_width=6, buff=0.1)
                lab = T("repeated output: fine", fs=28, color=RIGHT_C).move_to(DOWN * 1.9)
                self.play(Create(o1), Create(o2), FadeIn(lab), run_time=d[4] * 0.7)
        self.wipe()

    # Scene 3 ---------------------------------------------------------------
    def s3(self):
        fx = M("f(x)", fs=90).move_to(LEFT * 2.8 + UP * 0.6)
        ftx = M(r"f \times x", fs=80).move_to(RIGHT * 2.8 + UP * 0.6)
        cr = Cross(ftx, stroke_color=WRONG, stroke_width=8)
        cap = T("the output of f at the input x", fs=32, color=BLUE_C).move_to(DOWN * 1.4)
        with self.say("f of x isn't f times x.", "It names an output.") as d:
            with self.slot(d[0]):
                self.play(Write(fx), run_time=0.6)
                self.play(FadeIn(ftx), run_time=0.4)
                self.play(Create(cr), run_time=0.5)
            with self.slot(d[1]):
                self.play(FadeIn(cap, shift=0.2 * UP), fx.animate.set_color(BLUE_C), run_time=d[1] * 0.6)
        self.wipe()

        e1 = M("f(x) = x^2 + 1", fs=64, substrings_to_isolate=["x"]).move_to(UP * 0.5)
        e1.set_color_by_tex("x", HL)
        e2 = M("f(3) = 3^2 + 1", fs=64, substrings_to_isolate=["3"]).move_to(UP * 0.5)
        e2.set_color_by_tex("3", HL)
        ten = M("= 10", fs=64, color=RIGHT_C)
        with self.say("For f of x equals x squared plus one, f of three is three squared plus one, ten.") as d:
            self.play(Write(e1), run_time=d[0] * 0.3)
            self.play(TransformMatchingTex(e1, e2), run_time=d[0] * 0.35)
            VGroup(e2.copy(), ten).arrange(RIGHT, buff=0.25)
            grp = VGroup(e2, ten)
            ten.next_to(e2, RIGHT, buff=0.25)
            self.play(FadeIn(ten, shift=0.2 * LEFT), grp.animate.move_to(UP * 0.5), run_time=d[0] * 0.2)
        self.wipe()

        base = M("f(x) = x^2 + 2x", fs=52).move_to(UP * 2.3)
        fa = M("f(a) = a^2 + 2a", fs=44, color=MUTED).move_to(UP * 1.2)
        slot = M("f(", r"\square", ") = ", r"\square", "^2 + 2", r"\square", fs=56).move_to(UP * 0.1 + LEFT * 1.8)
        fill = M("f(", "a+1", ") = ", "(a+1)", "^2 + 2", "(a+1)", fs=56).move_to(UP * 0.1 + LEFT * 1.8)
        for i in (1, 3, 5):
            fill[i].set_color(HL)
        bad = M("f(a) + 1", fs=52, color=WRONG)
        badl = T("not this", fs=28, color=WRONG)
        badg = VGroup(bad, badl).arrange(DOWN, buff=0.2).next_to(fill, RIGHT, buff=1.2)
        xh = M("f(", "x+h", ") = ", "(x+h)", "^2 + 2", "(x+h)", fs=56).move_to(DOWN * 1.9)
        for i in (1, 3, 5):
            xh[i].set_color(HL)
        tag = T("coming in the derivative chapter", fs=26, color=MUTED).next_to(xh, DOWN, buff=0.3)
        with self.say("Inputs can be expressions.", "f of the quantity a plus one puts a plus one in every slot.",
                      "Not f of a, plus one.", "Later: f of the quantity x plus h.") as d:
            with self.slot(d[0]):
                self.play(Write(base), run_time=d[0] * 0.5)
                self.play(FadeIn(fa, shift=0.2 * DOWN), run_time=d[0] * 0.4)
            with self.slot(d[1]):
                self.play(FadeOut(fa), FadeIn(slot), run_time=d[1] * 0.25)
                self.play(*[Indicate(slot[i], color=HL) for i in (1, 3, 5)], run_time=d[1] * 0.25)
                self.play(ReplacementTransform(slot, fill), run_time=d[1] * 0.4)
            with self.slot(d[2]):
                self.play(FadeIn(badg), run_time=d[2] * 0.6)
            with self.slot(d[3]):
                self.play(FadeIn(xh, shift=0.2 * UP), run_time=d[3] * 0.5)
                self.play(FadeIn(tag), run_time=d[3] * 0.3)
        self.wipe()

        e = M("f(x) = x^2 - 3x", fs=52).move_to(UP * 2.3 + LEFT * 3.2)
        sub = M("f(-2) = ", "(", "-2", ")", "^2 - 3", "(", "-2", ")", fs=52)
        for i in (1, 3, 5, 7):
            sub[i].set_color(HL)
        sub.next_to(e, DOWN, buff=0.7).align_to(e, LEFT)
        res = M("= 4 + 6 = 10", fs=52, color=RIGHT_C).next_to(sub, DOWN, buff=0.5).align_to(sub[1], LEFT)
        side1 = M(r"(-2)^2 \ne -2^2", fs=48)
        side2 = M("-2^2 = -4", fs=48, color=WRONG)
        side3 = T("dropped parentheses:\nwrong substitution", fs=26, color=WRONG)
        side = VGroup(side1, side2, side3).arrange(DOWN, buff=0.4).move_to(RIGHT * 3.9 + DOWN * 0.2)
        sep = DashedLine(UP * 2.5 + RIGHT * 1.5, DOWN * 2.8 + RIGHT * 1.5, color=MUTED)
        with self.say("Worked example.", "f of x equals x squared minus three x, at negative two.",
                      "The quantity negative two, squared, is four.", "Minus three times negative two is six.",
                      "Total, ten.", "Drop the parentheses and you get negative four.",
                      "The classic mistake.") as d:
            with self.slot(d[0] + d[1]):
                self.play(Write(e), run_time=d[1] * 0.6)
            with self.slot(d[2]):
                self.play(FadeIn(sub), run_time=d[2] * 0.5)
                self.play(Indicate(VGroup(*sub[1:5]), color=HL), run_time=d[2] * 0.4)
            with self.slot(d[3]):
                self.play(Indicate(VGroup(*sub[4:8]), color=HL), run_time=d[3] * 0.7)
            with self.slot(d[4]):
                self.play(Write(res), run_time=d[4] * 0.8)
            with self.slot(d[5]):
                self.play(Create(sep), FadeIn(side1), run_time=d[5] * 0.4)
                self.play(FadeIn(side2), run_time=d[5] * 0.4)
            with self.slot(d[6]):
                self.play(FadeIn(side3), run_time=d[6] * 0.6)
        self.wipe()

    # Scene 4 ---------------------------------------------------------------
    def s4(self):
        tab = grid([["$x", "$f(x)"], ["2", "0.5"], ["1", "1"], ["0.5", "2"], ["0", "???"]],
                   [1.5, 1.8], row_h=0.7, fs=30)
        tab.rows[4][1].set_color(WRONG)
        tab.move_to(LEFT * 4.3 + DOWN * 0.1)
        fl = M(r"f(x) = \frac{1}{x}", fs=44).next_to(tab, UP, buff=0.4)
        ax = mk_axes([-4, 4, 1], [-5, 5, 1], 6.2, 5.8).move_to(RIGHT * 2.6 + DOWN * 0.35)
        c1 = P(ax, lambda x: 1 / x, -4, -0.2)
        c2 = P(ax, lambda x: 1 / x, 0.2, 4)
        vl = DashedLine(ax.c2p(0, -5), ax.c2p(0, 5), color=WRONG, stroke_width=3)
        t = ValueTracker(2)
        dot = always_redraw(lambda: Dot(ax.c2p(t.get_value(), 1 / t.get_value()), color=HL, radius=0.1))
        with self.say("Not every input works.", "One over zero has no answer, so zero is not allowed.") as d:
            with self.slot(d[0]):
                self.play(FadeIn(fl), FadeIn(tab.rows[0]), Create(tab[-1]), Create(ax), run_time=d[0] * 0.5)
                self.play(LaggedStart(*[FadeIn(tab.rows[i]) for i in (1, 2, 3)], lag_ratio=0.4),
                          Create(c1), Create(c2), run_time=d[0] * 0.5)
            with self.slot(d[1]):
                self.play(FadeIn(tab.rows[4]), FadeIn(dot), run_time=0.4)
                self.play(t.animate.set_value(0.2), run_time=d[1] * 0.45, rate_func=smooth)
                dot.clear_updaters()
                self.play(FadeOut(dot, shift=0.4 * UP), Create(vl), run_time=d[1] * 0.25)
        self.wipe()

        dom = VGroup(
            VGroup(T("Domain:", 30, weight=BOLD, color=BLUE_C), T("allowed inputs", 30)).arrange(RIGHT, buff=0.2),
            VGroup(T("Range:", 30, weight=BOLD, color=ORANGE_C), T("outputs actually produced", 30)).arrange(RIGHT, buff=0.2),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.45)
        dbox = SurroundingRectangle(dom, color=INK, buff=0.35, corner_radius=0.15, stroke_width=2)
        VGroup(dom, dbox).move_to(LEFT * 2.6 + UP * 0.6)
        ax = mk_axes([-3, 3, 1], [-1, 9, 1], 4.4, 5.6).move_to(RIGHT * 3.9 + DOWN * 0.3)
        par = P(ax, lambda x: x * x, -3, 3)
        ry = Line(ax.c2p(0, 0), ax.c2p(0, 9), color=HL, stroke_width=10, stroke_opacity=0.7)
        rlab = M(r"\text{range: } y \ge 0", fs=48, color=HL).next_to(ax, LEFT, buff=0.3).shift(UP * 1.8 + RIGHT * 0.5)
        rlab.next_to(VGroup(dom, dbox), DOWN, buff=0.6)
        d0 = Dot(ax.c2p(0, 0), color=HL, radius=0.1)
        with self.say("The domain is the allowed inputs.", "The range is the outputs actually produced.",
                      "x squared is never negative, so its range is zero and up.") as d:
            with self.slot(d[0]):
                self.play(Create(dbox), FadeIn(dom[0]), run_time=d[0] * 0.7)
            with self.slot(d[1]):
                self.play(FadeIn(dom[1]), run_time=d[1] * 0.6)
            with self.slot(d[2]):
                self.play(Create(ax), Create(par), run_time=d[2] * 0.35)
                self.play(Create(ry), FadeIn(d0), run_time=d[2] * 0.3)
                self.play(Write(rlab), Flash(d0, color=HL), run_time=d[2] * 0.3)
        self.wipe()

        tab = grid([["function", "domain"], [r"$x^2", "all real numbers"], [r"$\frac{1}{x}", r"$x \ne 0"],
                    [r"$\sqrt{x}", r"$x \ge 0"]], [2.2, 3.6], row_h=1.0, fs=30)
        tab.move_to(LEFT * 2.6 + DOWN * 0.1)
        t1 = T("suspect 1: division by zero", fs=28, color=WRONG).next_to(tab.rows[2], RIGHT, buff=0.5)
        t2 = T("suspect 2: even root of a negative", fs=28, color=WRONG).next_to(tab.rows[3], RIGHT, buff=0.5)
        t1.set_x(tab.get_right()[0] + 0.4 + t1.width / 2)
        t2.set_x(tab.get_right()[0] + 0.4 + t2.width / 2)
        with self.say("To find a domain, hunt two suspects.", "Division by zero, and even roots of negatives.") as d:
            with self.slot(d[0]):
                self.play(FadeIn(tab), run_time=d[0] * 0.7)
            with self.slot(d[1]):
                r1 = SurroundingRectangle(tab.rows[2], color=WRONG, buff=0.12)
                r2 = SurroundingRectangle(tab.rows[3], color=WRONG, buff=0.12)
                self.play(Create(r1), FadeIn(t1), run_time=d[1] * 0.4)
                self.play(Create(r2), FadeIn(t2), run_time=d[1] * 0.4)
        self.wipe()

        num = M(r"\sqrt{x-1}", fs=52)
        den = M("x-4", fs=52)
        bar = Line(LEFT, RIGHT, color=INK, stroke_width=3).set_width(num.width + 0.1)
        frac = VGroup(num, bar, den).arrange(DOWN, buff=0.12)
        lhs = M("f(x) =", fs=52).next_to(frac, LEFT, buff=0.25)
        fxg = VGroup(lhs, frac).move_to(UP * 1.9 + LEFT * 1.5)
        cn = SurroundingRectangle(num, color=ORANGE_C, buff=0.1, corner_radius=0.1)
        cd = SurroundingRectangle(den, color=ORANGE_C, buff=0.1, corner_radius=0.1)
        ln = M(r"x \ge 1", fs=44, color=ORANGE_C).next_to(fxg, RIGHT, buff=1.2).align_to(num, UP)
        ld = M(r"x \ne 4", fs=44, color=ORANGE_C).next_to(ln, DOWN, buff=0.5).align_to(ln, LEFT)
        nl = NumberLine(x_range=[-1, 7, 1], length=10, include_numbers=True, color=INK,
                        font_size=28).move_to(DOWN * 1.2)
        nl.numbers.set_color(INK)
        seg = Line(nl.n2p(1), nl.n2p(7), color=RIGHT_C, stroke_width=10)
        cdot = Dot(nl.n2p(1), color=RIGHT_C, radius=0.13)
        odot = Circle(radius=0.13, color=RIGHT_C, stroke_width=4, fill_color=BG, fill_opacity=1).move_to(nl.n2p(4))
        fin = M(r"\text{domain: } x \ge 1,\ x \ne 4", fs=44, color=RIGHT_C).move_to(DOWN * 2.7)
        with self.say("Worked example.", "The square root of the quantity x minus one, all divided by x minus four.",
                      "The root needs x at least one.", "The division needs x not four.",
                      "So the domain: x at least one, except four.") as d:
            with self.slot(d[0] + d[1]):
                self.play(Write(fxg), run_time=d[1] * 0.6)
            with self.slot(d[2]):
                self.play(Create(cn), FadeIn(ln), run_time=d[2] * 0.5)
                self.play(Create(nl), FadeIn(cdot), Create(seg), run_time=d[2] * 0.4)
            with self.slot(d[3]):
                self.play(Create(cd), FadeIn(ld), run_time=d[3] * 0.4)
                self.play(FadeIn(odot, scale=1.5), run_time=d[3] * 0.4)
            with self.slot(d[4]):
                self.play(Write(fin), run_time=d[4] * 0.6)
        self.wipe()

    # Scene 5 ---------------------------------------------------------------
    def s5(self):
        t = ValueTracker(-2)
        form = M("f(x)=x^2", fs=44)
        dn1 = DecimalNumber(-2, num_decimal_places=1, font_size=40, color=HL)
        dn2 = DecimalNumber(4, num_decimal_places=1, font_size=40, color=HL)
        dn1.add_updater(lambda m: m.set_value(t.get_value()))
        dn2.add_updater(lambda m: m.set_value(t.get_value() ** 2))
        live = VGroup(M("f(", fs=40), dn1, M(") =", fs=40), dn2)
        live.add_updater(lambda g: g.arrange(RIGHT, buff=0.08).move_to(LEFT * 4.9 + DOWN * 0.3))
        fpanel = VGroup(form.move_to(LEFT * 4.9 + UP * 0.7), live)
        tab = grid([["$x", "$f(x)"], ["-2", "4"], ["0", "0"], ["2", "4"]], [1.2, 1.4], row_h=0.7, fs=30)
        tab.move_to(LEFT * 1.2 + DOWN * 0.1)
        ax = mk_axes([-3, 3, 1], [-1, 9, 1], 4.2, 4.6).move_to(RIGHT * 4.0 + DOWN * 0.2)
        par = P(ax, lambda x: x * x, -3, 3)
        dot = always_redraw(lambda: Dot(ax.c2p(t.get_value(), t.get_value() ** 2), color=HL, radius=0.1))

        def rowbox():
            v = t.get_value()
            for x, r in zip((-2, 0, 2), tab.rows[1:]):
                if abs(v - x) < 0.3:
                    return SurroundingRectangle(r, color=HL, buff=0.08)
            return VMobject()

        rb = always_redraw(rowbox)
        heads = VGroup(T("formula", 26, color=MUTED).move_to(LEFT * 4.9 + UP * 2.8),
                       T("table", 26, color=MUTED).move_to(LEFT * 1.2 + UP * 2.8),
                       T("graph", 26, color=MUTED).move_to(RIGHT * 4.0 + UP * 2.8))
        with self.say("Formula, table and graph are three views of one function.") as d:
            self.play(FadeIn(heads), FadeIn(form), FadeIn(live), FadeIn(tab), Create(ax), Create(par),
                      run_time=d[0] * 0.3)
            self.add(dot, rb)
            self.play(t.animate.set_value(0), run_time=d[0] * 0.3)
            self.play(t.animate.set_value(2), run_time=d[0] * 0.3)
        self.wipe()

        ax = mk_axes([-4, 4, 1], [-1, 10, 1], 7.4, 6.0).move_to(LEFT * 2.2 + DOWN * 0.4)
        par = P(ax, lambda x: x * x, -3.16, 3.16)
        self.play(Create(ax), Create(par), run_time=1.0)
        cap_pos = RIGHT * 4.6
        with self.say("What is f of three?", "Go up from three to the curve.", "The height is nine.",
                      "One input, one answer.") as d:
            q = M("f(3) = \\,?", fs=48).move_to(cap_pos + UP * 1.5)
            with self.slot(d[0]):
                self.play(Write(q), run_time=d[0] * 0.6)
            y = ValueTracker(0)
            dot = always_redraw(lambda: Dot(ax.c2p(3, y.get_value()), color=HL, radius=0.1))
            vline = always_redraw(lambda: DashedLine(ax.c2p(3, 0), ax.c2p(3, y.get_value() + 1e-3), color=HL))
            with self.slot(d[1]):
                self.add(vline, dot)
                self.play(y.animate.set_value(9), run_time=d[1] * 0.8)
            dot.clear_updaters()
            vline.clear_updaters()
            hline = DashedLine(ax.c2p(3, 9), ax.c2p(0, 9), color=HL)
            nine = T("9", 36, color=HL, weight=BOLD).next_to(ax.c2p(0, 9), LEFT, buff=0.7)
            with self.slot(d[2]):
                self.play(Create(hline), run_time=d[2] * 0.5)
                self.play(FadeIn(nine), Transform(q, M("f(3) = 9", fs=48).move_to(q)), run_time=d[2] * 0.4)
            with self.slot(d[3]):
                one = T("one input, one answer", fs=28, color=MUTED).next_to(q, DOWN, buff=0.4)
                self.play(FadeIn(one), run_time=d[3] * 0.5)
        fwd = VGroup(q, dot, vline, hline, nine, one)

        sweep = Line(ax.c2p(-4, 9), ax.c2p(4, 9), color=ORANGE_C, stroke_width=4)
        with self.say("Now reverse it.", "Where does f of x equal nine?", "Slide across at nine.",
                      "You hit three and negative three.", "Reverse questions may have many answers.") as d:
            with self.slot(d[0]):
                self.play(FadeOut(fwd), run_time=0.5)
            with self.slot(d[1]):
                q2 = M("f(x) = 9", fs=48).move_to(cap_pos + UP * 1.5)
                self.play(Write(q2), run_time=d[1] * 0.6)
            with self.slot(d[2]):
                self.play(Create(sweep), run_time=d[2] * 0.8, rate_func=linear)
            with self.slot(d[3]):
                pts = VGroup(*[Dot(ax.c2p(x, 9), color=HL, radius=0.1) for x in (-3, 3)])
                drops = VGroup(*[DashedLine(ax.c2p(x, 9), ax.c2p(x, 0), color=HL) for x in (-3, 3)])
                ans = M("x = -3 \\text{ or } x = 3", fs=40, color=HL).next_to(q2, DOWN, buff=0.4)
                self.play(FadeIn(pts), Create(drops), run_time=d[3] * 0.5)
                self.play(FadeIn(ans), run_time=d[3] * 0.4)
            with self.slot(d[4]):
                cap = T("reverse question:\nmany answers allowed", fs=28).next_to(ans, DOWN, buff=0.5)
                self.play(FadeIn(cap), run_time=d[4] * 0.5)

        with self.say("f of x is zero only at zero, and above zero everywhere else.") as d:
            self.play(FadeOut(VGroup(sweep, pts, drops, ans, cap, q2)), run_time=0.5)
            g0 = Dot(ax.c2p(0, 0), color=RIGHT_C, radius=0.12)
            l0 = M(r"f(x)=0 \text{ only at } x=0", fs=36, color=RIGHT_C).move_to(cap_pos + UP * 1.3)
            self.play(FadeIn(g0), Flash(g0, color=RIGHT_C), FadeIn(l0), run_time=d[0] * 0.35)
            areas = VGroup(ax.get_area(par, x_range=[-3.16, 0], color=BLUE_C, opacity=0.2),
                           ax.get_area(par, x_range=[0, 3.16], color=BLUE_C, opacity=0.2))
            hol = Circle(radius=0.12, color=RIGHT_C, stroke_width=4, fill_color=BG, fill_opacity=1).move_to(g0)
            l1 = M(r"f(x) > 0 \text{ for } x \ne 0", fs=36, color=BLUE_C).next_to(l0, DOWN, buff=0.5)
            self.play(FadeIn(areas), FadeIn(l1), run_time=d[0] * 0.35)
            self.play(FadeIn(hol), run_time=0.3)
        self.wipe()

    # Scene 6 ---------------------------------------------------------------
    def s6(self):
        tab = grid([["$x", "$f(x)", "change"], ["1", "1", ""], ["2", "4", "+3"], ["3", "9", "+5"],
                    ["4", "16", "+7"]], [1.1, 1.3, 1.6], row_h=0.75, fs=30)
        for r in tab.rows[1:]:
            r[2].set_color(HL)
        tab.move_to(LEFT * 4.4 + DOWN * 0.2)
        ax = mk_axes([0, 4.5, 1], [0, 17, 4], 6.2, 6.0).move_to(RIGHT * 2.4 + DOWN * 0.35)
        par = P(ax, lambda x: x * x, 0, 4.1)
        dots = VGroup(*[Dot(ax.c2p(k, k * k), color=BLUE_C, radius=0.08) for k in (1, 2, 3, 4)])
        bars, runs, labs = VGroup(), VGroup(), VGroup()
        for k in (1, 2, 3):
            runs.add(DashedLine(ax.c2p(k, k * k), ax.c2p(k + 1, k * k), color=MUTED))
            bars.add(Line(ax.c2p(k + 1, k * k), ax.c2p(k + 1, (k + 1) ** 2), color=HL, stroke_width=8))
            labs.add(T(f"+{2 * k + 1}", 26, color=HL).next_to(bars[-1], RIGHT, buff=0.12))
        with self.say("Now calculus begins.", "x squared goes one, four, nine, sixteen.",
                      "The jumps are three, five, seven.", "It's getting steeper.") as d:
            with self.slot(d[0]):
                self.play(FadeIn(tab.rows[0]), Create(tab[-1]), Create(ax), run_time=d[0] * 0.8)
            with self.slot(d[1]):
                self.play(Create(par), run_time=d[1] * 0.3)
                self.play(LaggedStart(*[AnimationGroup(FadeIn(VGroup(*tab.rows[i][:2])), FadeIn(dots[i - 1]))
                                        for i in (1, 2, 3, 4)], lag_ratio=0.6), run_time=d[1] * 0.65)
            with self.slot(d[2]):
                self.play(LaggedStart(*[AnimationGroup(FadeIn(tab.rows[i + 1][2]), Create(runs[i]),
                                                       Create(bars[i]), FadeIn(labs[i]))
                                        for i in range(3)], lag_ratio=0.7), run_time=d[2] * 0.9)
            with self.slot(d[3]):
                self.play(Indicate(bars, color=HL, scale_factor=1.05), run_time=d[3] * 0.8)
        self.wipe()

        ax = mk_axes([-3, 3, 1], [-1, 9, 1], 5.6, 5.8).move_to(LEFT * 2.8 + DOWN * 0.35)
        lh = P(ax, lambda x: x * x, -3, 0, color=ORANGE_C)
        rh = P(ax, lambda x: x * x, 0, 3, color=BLUE_C)
        dl = VGroup(Line(ORIGIN, RIGHT * 0.6, color=ORANGE_C, stroke_width=5), T("decreasing", 30, color=ORANGE_C)).arrange(RIGHT, buff=0.2)
        il = VGroup(Line(ORIGIN, RIGHT * 0.6, color=BLUE_C, stroke_width=5), T("increasing", 30, color=BLUE_C)).arrange(RIGHT, buff=0.2)
        VGroup(il, dl).arrange(DOWN, aligned_edge=LEFT, buff=0.3).move_to(RIGHT * 3.6 + UP * 2.2)
        flat = Line(ax.c2p(-3, 5), ax.c2p(3, 5), color=MUTED, stroke_width=4)
        fl = T("constant", 28, color=MUTED).next_to(flat, RIGHT, buff=0.2)
        mn = Dot(ax.c2p(0, 0), color=HL, radius=0.11)
        mnl = T("local minimum", 28, color=HL).next_to(ax.c2p(0, -1), DOWN, buff=0.15)
        ax2 = mk_axes([-1, 3, 1], [-1, 4, 1], 3.6, 3.2).move_to(RIGHT * 4.3 + DOWN * 0.8)
        hill = P(ax2, lambda x: -(x - 1) ** 2 + 3, -1, 3, color=ORANGE_C)
        pk = Dot(ax2.c2p(1, 3), color=HL, radius=0.1)
        pkl = T("local maximum", 26, color=HL).next_to(pk, UP, buff=0.2)
        with self.say("Increasing means outputs rise.", "Decreasing means they fall.",
                      "Constant means they don't move.", "A local maximum is a hilltop,",
                      "a local minimum a valley floor.") as d:
            with self.slot(d[0]):
                self.play(Create(ax), run_time=0.5)
                self.play(Create(rh), FadeIn(il), run_time=d[0] - 0.7)
            with self.slot(d[1]):
                self.play(Create(lh, rate_func=lambda t: t), FadeIn(dl), run_time=d[1] * 0.8)
            with self.slot(d[2]):
                self.play(Create(flat), FadeIn(fl), run_time=d[2] * 0.5)
                self.play(FadeOut(flat), FadeOut(fl), run_time=d[2] * 0.35)
            with self.slot(d[3]):
                self.play(Create(ax2), Create(hill), run_time=d[3] * 0.5)
                self.play(FadeIn(pk), FadeIn(pkl), run_time=d[3] * 0.4)
            with self.slot(d[4]):
                self.play(FadeOut(VGroup(ax2, hill, pk, pkl)), FadeIn(mn), FadeIn(mnl), run_time=d[4] * 0.6)
        self.wipe()

        t2 = grid([["$x", "$2^x", "change"], ["1", "2", ""], ["2", "4", "+2"], ["3", "8", "+4"], ["4", "16", "+8"]],
                  [0.8, 1.0, 1.35], row_h=0.62, fs=26)
        t2.move_to(LEFT * 5.1 + UP * 0.5)
        for r in t2.rows[2:]:
            r[2].set_color(HL)
        arr2 = VGroup()
        for i in (2, 3):
            a = CurvedArrow(t2.rows[i][2].get_right() + RIGHT * 0.05, t2.rows[i + 1][2].get_right() + RIGHT * 0.05,
                            angle=-PI * 0.8, color=HL, stroke_width=3, tip_length=0.14)
            lab = M(r"\times 2", fs=30, color=HL).next_to(a, RIGHT, buff=0.12)
            arr2.add(VGroup(a, lab))
        tx = grid([["$x^2", "change"], ["1", ""], ["4", "+3"], ["9", "+5"], ["16", "+7"]],
                  [1.0, 1.35], row_h=0.62, fs=26)
        tx.move_to(LEFT * 1.35 + UP * 0.5)
        for r in tx.rows[2:]:
            r[1].set_color(HL)
        arrx = VGroup()
        for i in (2, 3):
            a = CurvedArrow(tx.rows[i][1].get_right() + RIGHT * 0.05, tx.rows[i + 1][1].get_right() + RIGHT * 0.05,
                            angle=-PI * 0.8, color=HL, stroke_width=3, tip_length=0.14)
            lab = M("+2", fs=30, color=HL).next_to(a, RIGHT, buff=0.12)
            arrx.add(VGroup(a, lab))
        tb = grid([["min", "litres", "change"], ["0", "0", ""], ["1", "5", "+5"], ["2", "10", "+5"],
                   ["3", "15", "+5"]], [0.8, 1.0, 1.35], row_h=0.62, fs=24)
        tb.move_to(RIGHT * 2.2 + UP * 0.5)
        for r in tb.rows[2:]:
            r[2].set_color(HL)
        tbh = T("bathtub: minutes → litres", 24, color=MUTED).next_to(tb, UP, buff=0.25)
        t2h = T("2 to the x", 24, color=MUTED).next_to(t2, UP, buff=0.25)
        txh = T("x squared", 24, color=MUTED).next_to(tx, UP, buff=0.25)
        ax = mk_axes([0, 4, 1], [0, 20, 5], 2.6, 2.8, fs=20).move_to(RIGHT * 5.4 + UP * 0.4)
        ln = P(ax, lambda x: 5 * x, 0, 4, color=BLUE_C)
        axl = M("y = 5t", fs=30, color=BLUE_C).next_to(ax, UP, buff=0.15)
        cap = T("the change column is a fingerprint", 32, weight=BOLD).move_to(DOWN * 2.3)
        deriv = T("pushed to the extreme → the derivative", 28, color=PRIMARY).next_to(cap, DOWN, buff=0.3)
        with self.say("Two to the x changes by two, four, eight, doubling each time.",
                      "A steadily filling bathtub adds five litres every minute.",
                      "Constant change means a straight line.", "The change column is a fingerprint.",
                      "Pushed to the extreme, it becomes the derivative.") as d:
            with self.slot(d[0]):
                self.play(FadeIn(t2), FadeIn(t2h), run_time=d[0] * 0.3)
                self.play(Create(arr2), run_time=d[0] * 0.25)
                self.play(FadeIn(tx), FadeIn(txh), Create(arrx), run_time=d[0] * 0.35)
            with self.slot(d[1]):
                self.play(FadeIn(tb), FadeIn(tbh), run_time=d[1] * 0.7)
            with self.slot(d[2]):
                self.play(Create(ax), Create(ln), FadeIn(axl), run_time=d[2] * 0.8)
            with self.slot(d[3]):
                self.play(Write(cap), run_time=d[3] * 0.7)
            with self.slot(d[4]):
                self.play(FadeIn(deriv, shift=0.2 * UP), run_time=d[4] * 0.6)
        self.wipe()

    # Scene 7 ---------------------------------------------------------------
    def s7(self):
        ax = mk_axes([-6, 6, 1], [-4, 10, 1], 8.2, 6.2, fs=20).move_to(LEFT * 2.5 + DOWN * 0.4)
        base = P(ax, lambda x: x * x, -3.16, 3.16, color=FAINT, sw=3)
        rows = [("f(x)+k", "moves vertically"), ("a\\,f(x)", "stretches vertically"),
                ("f(x-k)", "moves horizontally"), ("f(ax)", "squeezes horizontally")]
        summ = VGroup(*[VGroup(M(a, fs=28), T(b, 22)) for a, b in rows])
        for r in summ:
            r[1].next_to(r[0], RIGHT, buff=0.3)
        for r in summ:
            r[1].set_x(0)
            r[0].set_x(-1.2 - 0)
        summ.arrange(DOWN, aligned_edge=LEFT, buff=0.22)
        for r in summ:
            r[1].shift(RIGHT * (1.55 - (r[1].get_left()[0] - summ.get_left()[0])))
        summ.move_to(RIGHT * 4.55 + UP * 2.15)
        sbox = SurroundingRectangle(summ, color=MUTED, buff=0.15, corner_radius=0.1, stroke_width=1.5)
        info_pos = RIGHT * 4.55 + DOWN * 0.3

        def hl(i):
            return SurroundingRectangle(summ[i], color=HL, buff=0.07, corner_radius=0.05)

        b = ValueTracker(0)
        cb = always_redraw(lambda: P(ax, lambda x: x * x + b.get_value(),
                                     -np.sqrt(10 - b.get_value()), np.sqrt(10 - b.get_value())))
        a = ValueTracker(1)

        def a_curve():
            av = a.get_value()
            if av > 0.05:
                r = min(6, np.sqrt(10 / av))
            elif av < -0.05:
                r = min(6, np.sqrt(4 / abs(av)))
            else:
                return Line(ax.c2p(-6, 0), ax.c2p(6, 0), color=BLUE_C, stroke_width=4)
            return P(ax, lambda x: av * x * x, -r, r)

        ca = always_redraw(a_curve)
        blab = VGroup(M("y = x^2 +", fs=36, color=BLUE_C), DecimalNumber(0, 1, font_size=36, color=BLUE_C))
        blab[1].add_updater(lambda m: m.set_value(b.get_value()))
        blab.add_updater(lambda g: g.arrange(RIGHT, buff=0.12).move_to(info_pos))
        alab = VGroup(M("y =", fs=36, color=BLUE_C), DecimalNumber(1, 1, font_size=36, color=BLUE_C),
                      M("x^2", fs=36, color=BLUE_C))
        alab[1].add_updater(lambda m: m.set_value(a.get_value()))
        alab.add_updater(lambda g: g.arrange(RIGHT, buff=0.12).move_to(info_pos))

        with self.say("Transformations.", "Adding outside moves the graph up or down.",
                      "Multiplying outside stretches it, and a negative flips it.") as d:
            with self.slot(d[0]):
                self.play(Create(ax), Create(base), FadeIn(summ), Create(sbox), run_time=d[0] * 0.9)
            with self.slot(d[1]):
                h = hl(0)
                self.add(cb)
                self.play(Create(h), FadeIn(blab), run_time=0.4)
                self.play(b.animate.set_value(3), run_time=d[1] * 0.4)
                self.play(b.animate.set_value(0), run_time=d[1] * 0.35)
            with self.slot(d[2]):
                cb.clear_updaters()
                blab.clear_updaters()
                self.remove(cb, blab)
                self.add(ca, alab)
                self.play(Transform(h, hl(1)), run_time=0.3)
                self.play(a.animate.set_value(2), run_time=d[2] * 0.3)
                self.play(a.animate.set_value(-1), run_time=d[2] * 0.45)
        ca.clear_updaters()
        alab.clear_updaters()
        self.play(FadeOut(ca), FadeOut(alab), run_time=0.4)

        s = ValueTracker(0)
        cs = always_redraw(lambda: P(ax, lambda x: (x - s.get_value()) ** 2,
                                     s.get_value() - 3.16, s.get_value() + 3.16))
        eqs = M("y = f(x-2)", fs=36, color=BLUE_C).move_to(info_pos + UP * 0.2)
        big = T("minus inside → RIGHT", 30, color=HL, weight=BOLD).next_to(eqs, DOWN, buff=0.35)
        bad = M("f(x) - 2", fs=36, color=WRONG)
        badl = T("down, not right", 24, color=WRONG)
        badg = VGroup(bad, badl).arrange(RIGHT, buff=0.25).next_to(big, DOWN, buff=0.45)
        with self.say("The backwards one.", "f of the quantity x minus two moves the graph right, not left.",
                      "Not f of x, minus two.", "That moves it down.",
                      "The new graph at five repeats the old one at three.") as d:
            with self.slot(d[0]):
                self.play(Transform(h, hl(2)), FadeIn(eqs), run_time=d[0] * 0.8)
                self.add(cs)
            with self.slot(d[1]):
                self.play(s.animate.set_value(2), run_time=d[1] * 0.55)
                self.play(FadeIn(big, scale=1.1), run_time=d[1] * 0.3)
            with self.slot(d[2]):
                self.play(FadeIn(bad), run_time=d[2] * 0.6)
            with self.slot(d[3]):
                self.play(FadeIn(badl), Indicate(bad, color=WRONG), run_time=d[3] * 0.7)
            with self.slot(d[4]):
                p1 = Dot(ax.c2p(3, 9), color=MUTED, radius=0.1)
                p2 = Dot(ax.c2p(5, 9), color=BLUE_C, radius=0.1)
                arr = Arrow(p1.get_center(), p2.get_center(), buff=0.12, color=HL, stroke_width=5,
                            max_tip_length_to_length_ratio=0.25)
                l1 = M("(3,9)", fs=28, color=MUTED).next_to(p1, UP, buff=0.12).shift(LEFT * 0.3)
                l2 = M("(5,9)", fs=28, color=BLUE_C).next_to(p2, UP, buff=0.12).shift(RIGHT * 0.3)
                self.play(FadeIn(p1), FadeIn(l1), run_time=d[4] * 0.25)
                self.play(FadeIn(p2), FadeIn(l2), GrowArrow(arr), run_time=d[4] * 0.4)
        cs.clear_updaters()
        self.play(FadeOut(VGroup(cs, eqs, big, badg, p1, p2, arr, l1, l2)), run_time=0.5)

        k = ValueTracker(1)
        ck = always_redraw(lambda: P(ax, lambda x: (k.get_value() * x) ** 2,
                                     -3.16 / k.get_value(), 3.16 / k.get_value()))
        klab = M("y = f(2x) = (2x)^2", fs=36, color=BLUE_C).move_to(info_pos)
        with self.say("Multiplying inside, like f of two x, squeezes it sideways.") as d:
            self.play(Transform(h, hl(3)), FadeIn(klab), run_time=0.5)
            self.add(ck)
            self.play(k.animate.set_value(2), run_time=d[0] * 0.5)
            ck.clear_updaters()
            self.play(FadeOut(ck), run_time=d[0] * 0.2)
        self.play(FadeOut(klab), FadeOut(h), run_time=0.4)

        eq = M("y = ", "-", "2", "(x-3)", "^2", "+4", fs=48).move_to(info_pos + UP * 0.2)
        stepl = T("", 26)
        steps = [
            (3, "shift right 3", lambda x: (x - 3) ** 2, -0.16, 6),
            (2, "stretch vertically by 2", lambda x: 2 * (x - 3) ** 2, 0.76, 5.24),
            (1, "flip", lambda x: -2 * (x - 3) ** 2, 1.59, 4.41),
            (5, "shift up 4", lambda x: -2 * (x - 3) ** 2 + 4, 1, 5),
        ]
        with self.say("Worked example.", "Negative two times the quantity x minus three, squared, plus four.",
                      "Inside out:", "shift right three.", "Stretch vertically by two.", "Flip.", "Shift up four.",
                      "The peak lands at the point three, four.") as d:
            with self.slot(d[0] + d[1]):
                self.play(Write(eq), run_time=d[1] * 0.6)
            cur = base.copy().set_color(BLUE_C)
            with self.slot(d[2]):
                self.play(FadeIn(cur), run_time=d[2] * 0.6)
            box = None
            for n, (idx, txt, f, lo, hi) in enumerate(steps):
                with self.slot(d[3 + n]):
                    nb = SurroundingRectangle(eq[idx], color=HL, buff=0.08)
                    nl = T(txt, 26, color=HL).next_to(eq, DOWN, buff=0.45)
                    new = P(ax, f, lo, hi)
                    anims = [ReplacementTransform(cur, new)]
                    anims += [Create(nb) if box is None else Transform(box, nb)]
                    anims += [FadeIn(nl) if n == 0 else Transform(stepl, nl)]
                    self.play(*anims, run_time=min(1.0, d[3 + n] * 0.8))
                    if n == 0:
                        stepl = nl
                    if box is None:
                        box = nb
                    cur = new
            with self.slot(d[7]):
                pk = Dot(ax.c2p(3, 4), color=HL, radius=0.12)
                pkl = T("peak (3, 4)", 28, color=HL, weight=BOLD).next_to(pk, UR, buff=0.12)
                self.play(FadeIn(pk, scale=1.5), FadeIn(pkl), FadeOut(box), run_time=d[7] * 0.6)
        self.wipe()

    # Scene 8 ---------------------------------------------------------------
    def s8(self):
        specs = [
            ("3", [(lambda x: 3 + 0 * x, -5, 5)], BLUE_C),
            ("x", [(lambda x: x, -5, 5)], BLUE_C),
            ("x^2", [(lambda x: x * x, -2.4, 2.4)], BLUE_C),
            (r"\tfrac{x^3}{4}", [(lambda x: x ** 3 / 4, -2.7, 2.7)], BLUE_C),
            ("|x|", [(lambda x: abs(x), -5, 5)], BLUE_C),
            (r"\tfrac{1}{x}", [(lambda x: 1 / x, -5, -0.2), (lambda x: 1 / x, 0.2, 5)], BLUE_C),
            (r"\sqrt{x}", [(lambda x: np.sqrt(max(x, 0)), 0, 5)], BLUE_C),
            ("2^x", [(lambda x: 2 ** x, -5, 2.58)], BLUE_C),
            (r"\ln x", [(lambda x: np.log(x), 0.01, 5)], BLUE_C),
            (r"\sin x", [(lambda x: np.sin(x), -5, 5)], BLUE_C),
            (r"\cos x", [(lambda x: np.cos(x), -5, 5)], ORANGE_C),
        ]
        tiles = []
        for i, (lab, fns, col) in enumerate(specs):
            bg = RoundedRectangle(width=2.95, height=1.95, corner_radius=0.15, color=MUTED, stroke_width=1.5,
                                  fill_color=BG, fill_opacity=1)
            ax = Axes(x_range=[-5, 5, 1], y_range=[-5, 6, 1], x_length=2.6, y_length=1.5, tips=False,
                      axis_config={"include_ticks": False, "stroke_width": 1.5}).set_color(MUTED)
            ax.move_to(bg).shift(DOWN * 0.1)
            cs = VGroup(*[P(ax, f, a, b, color=col, sw=3) for f, a, b in fns])
            tl = M(lab, fs=30).move_to(bg.get_corner(UL) + np.array([0.45, -0.3, 0]))
            tiles.append(VGroup(bg, ax, cs, tl))
        pos = []
        for r in range(3):
            n = 4 if r < 2 else 3
            for c in range(n):
                x = (c - (n - 1) / 2) * 3.15
                pos.append(np.array([x, 1.75 - r * 2.1, 0]))
        for t, p in zip(tiles, pos):
            t.move_to(p)
        big = {7: np.array([0, 0, 0]), 8: np.array([0, 0, 0]), 5: np.array([0, 0, 0]),
               6: np.array([0, 0, 0])}
        with self.say("Calculus reuses eleven families.", "Two to the x explodes.",
                      "The logarithm grows ever more slowly.", "One over x avoids zero.",
                      "The square root starts at zero.", "Sine and cosine repeat forever.") as d:
            with self.slot(d[0]):
                self.play(LaggedStart(*[FadeIn(t, scale=0.8) for t in tiles], lag_ratio=0.12),
                          run_time=d[0] * 0.95)
            for n, idx in enumerate((7, 8, 5, 6)):
                with self.slot(d[1 + n]):
                    t = tiles[idx]
                    t.save_state()
                    t.set_z_index(10)
                    rt = min(0.6, d[1 + n] * 0.3)
                    self.play(t.animate.scale(1.9).move_to(big[idx]), run_time=rt)
                    self.wait(max(0.1, d[1 + n] - 2 * rt - 0.05))
                    self.play(Restore(t), run_time=rt)
                    t.set_z_index(0)
            with self.slot(d[5]):
                s, c = tiles[9], tiles[10]
                for t in (s, c):
                    t.save_state()
                    t.set_z_index(10)
                rt = min(0.6, d[5] * 0.3)
                self.play(s.animate.scale(1.7).move_to(LEFT * 2.6 + DOWN * 0.3),
                          c.animate.scale(1.7).move_to(RIGHT * 2.6 + DOWN * 0.3), run_time=rt)
                self.wait(max(0.1, d[5] - 2 * rt - 0.05))
                self.play(Restore(s), Restore(c), run_time=rt)
        self.wipe()

        ax = mk_axes([-7, 7, 1], [-1.5, 1.5, 0.5], 12, 4.4, fs=18).move_to(DOWN * 0.3)
        ax.y_axis.numbers.set_opacity(0)
        yl = VGroup(*[M(s, fs=24).next_to(ax.c2p(0, v), LEFT, buff=0.12) for s, v in (("1", 1), ("-1", -1))])
        sn = P(ax, np.sin, -7, 7, color=BLUE_C)
        cs = P(ax, np.cos, -7, 7, color=ORANGE_C)
        sl = M(r"\sin x", fs=34, color=BLUE_C).move_to(ax.c2p(-5.5, 1.35))
        cl = M(r"\cos x", fs=34, color=ORANGE_C).next_to(sl, RIGHT, buff=0.5)
        q = T("Mystery: repeats forever, stays in [-1, 1], equals 1 at x = 0", 26, color=MUTED).move_to(UP * 2.75)
        band = VGroup(DashedLine(ax.c2p(-7, 1), ax.c2p(7, 1), color=HL),
                      DashedLine(ax.c2p(-7, -1), ax.c2p(7, -1), color=HL))
        bl = M("[-1,\\,1]", fs=30, color=HL).next_to(ax.c2p(6.3, -1.5), DOWN, buff=0.1)
        with self.say("Worked example.", "A wave repeats forever,",
                      "and its outputs stay between minus one and one.", "Its value at zero is one.",
                      "Sine of zero is zero, cosine of zero is one.", "So it's cosine.") as d:
            with self.slot(d[0]):
                self.play(FadeIn(q), Create(ax), FadeIn(yl), run_time=d[0] * 0.9)
            with self.slot(d[1]):
                self.play(Create(sn), Create(cs), FadeIn(sl), FadeIn(cl), run_time=d[1] * 0.9)
            with self.slot(d[2]):
                self.play(Create(band), FadeIn(bl), run_time=d[2] * 0.7)
            with self.slot(d[3]):
                vx = DashedLine(ax.c2p(0, -1.5), ax.c2p(0, 1.5), color=MUTED)
                self.play(Create(vx), run_time=d[3] * 0.6)
            with self.slot(d[4]):
                ds = Dot(ax.c2p(0, 0), color=BLUE_C, radius=0.11)
                dc = Dot(ax.c2p(0, 1), color=ORANGE_C, radius=0.11)
                l0 = M(r"\sin 0 = 0", fs=30, color=BLUE_C).move_to(ax.c2p(1.6, -0.6))
                l1 = M(r"\cos 0 = 1", fs=30, color=ORANGE_C).move_to(ax.c2p(1.6, 1.4))
                self.play(FadeIn(ds), FadeIn(l0), run_time=d[4] * 0.4)
                self.play(FadeIn(dc), FadeIn(l1), run_time=d[4] * 0.4)
            with self.slot(d[5]):
                ans = M(r"\text{answer: } \cos x", fs=40, color=RIGHT_C).move_to(DOWN * 3.1)
                self.play(cs.animate.set_stroke(color=HL, width=8), sn.animate.set_stroke(opacity=0.2),
                          FadeOut(l0), FadeOut(ds), FadeIn(ans), run_time=d[5] * 0.8)
        self.wipe()

    # Scene 9 ---------------------------------------------------------------
    def s9(self):
        gdef = M("g(x) = x + 1", fs=44, color=ORANGE_C)
        fdef = M("f(x) = x^2", fs=44, color=BLUE_C)
        defs = VGroup(gdef, fdef).arrange(RIGHT, buff=1.5).move_to(UP * 2.55)
        r0 = M(r"(f+g)(x) = f(x)+g(x)", fs=40).move_to(LEFT * 3 + UP * 1.0)
        others = VGroup(M(r"(f-g)(x) = f(x)-g(x)", fs=30), M(r"(fg)(x) = f(x)\,g(x)", fs=30),
                        M(r"(f/g)(x) = f(x)/g(x)", fs=30)).arrange(DOWN, aligned_edge=LEFT, buff=0.2)
        others.move_to(RIGHT * 3.3 + UP * 1.0)
        ex = M("(f+g)(2) = 4 + 3 = 7", fs=44).move_to(DOWN * 0.8)
        with self.say("Let g add one, and f square.", "Point by point, f plus g at two is four plus three, seven.",
                      "Calculus cares more about feeding one into the other.") as d:
            with self.slot(d[0]):
                self.play(FadeIn(gdef), run_time=d[0] * 0.4)
                self.play(FadeIn(fdef), run_time=d[0] * 0.4)
            with self.slot(d[1]):
                self.play(FadeIn(r0), FadeIn(others), run_time=d[1] * 0.35)
                self.play(Write(ex), run_time=d[1] * 0.5)
            with self.slot(d[2]):
                self.play(r0.animate.set_opacity(0.3), others.animate.set_opacity(0.3), run_time=d[2] * 0.4)
        self.play(FadeOut(r0), FadeOut(others), ex.animate.scale(0.75).set_opacity(0.4).move_to(RIGHT * 3.6 + UP * 1.3),
                  run_time=0.5)

        gb = self.machine(M("g:\\ x+1", fs=34, color=ORANGE_C), w=2.4, h=1.2, color=ORANGE_C).move_to(LEFT * 1.8 + DOWN * 0.7)
        fb = self.machine(M("f:\\ x^2", fs=34, color=BLUE_C), w=2.4, h=1.2, color=BLUE_C).move_to(RIGHT * 1.8 + DOWN * 0.7)
        with self.say("Two goes through g to three, then f to nine.", "So f of g of two is nine, not seven.",
                      "The other order gives five.", "Order matters.") as d:
            with self.slot(d[0]):
                self.play(FadeIn(gb), FadeIn(fb), run_time=0.4)
                tok = self.token("2").move_to(LEFT * 5.3 + DOWN * 0.5)
                self.play(FadeIn(tok), run_time=0.2)
                rt = (d[0] - 0.8) / 4
                self.play(tok.animate.move_to(gb.get_center() + UP * 0.2), run_time=rt)
                self.remove(tok)
                tok = self.token("3").move_to(gb.get_center() + UP * 0.2)
                self.play(Indicate(gb, color=HL), run_time=rt * 0.6)
                self.play(tok.animate.move_to(fb.get_center() + UP * 0.2), run_time=rt)
                self.remove(tok)
                self.play(Indicate(fb, color=HL), run_time=rt * 0.6)
                tok = self.token("9").move_to(fb.get_center() + UP * 0.2)
                self.play(tok.animate.move_to(RIGHT * 5.3 + DOWN * 0.5), run_time=rt * 0.8)
            with self.slot(d[1]):
                r1 = M("f(g(2)) = 9", fs=44).move_to(LEFT * 3.2 + UP * 1.3)
                self.play(Write(r1), Indicate(ex, color=WRONG), run_time=d[1] * 0.7)
            with self.slot(d[2]):
                self.play(FadeOut(tok), gb.animate.move_to(fb.get_center()), fb.animate.move_to(gb.get_center()),
                          run_time=0.6)
                tok = self.token("2").move_to(LEFT * 5.3 + DOWN * 0.5)
                self.add(tok)
                rt = (d[2] - 0.7) / 3.2
                self.play(tok.animate.move_to(LEFT * 1.8 + DOWN * 0.5), run_time=rt)
                self.remove(tok)
                tok = self.token("4").move_to(LEFT * 1.8 + DOWN * 0.5)
                self.play(tok.animate.move_to(RIGHT * 1.8 + DOWN * 0.5), run_time=rt)
                self.remove(tok)
                tok = self.token("5").move_to(RIGHT * 1.8 + DOWN * 0.5)
                self.play(tok.animate.move_to(RIGHT * 5.3 + DOWN * 0.5), run_time=rt)
            with self.slot(d[3]):
                r2 = M("g(f(2)) = 5", fs=44).move_to(DOWN * 2.2)
                ban = T("order matters", 34, color=HL, weight=BOLD).move_to(DOWN * 3.1)
                self.play(Write(r2), FadeIn(ban, scale=1.2), run_time=d[3] * 0.8)
        self.wipe(keep=(defs,))

        slot = M("f(", r"\square", ") = ", r"\square", "^2", fs=56).move_to(UP * 1.0 + LEFT * 3.2)
        fill = M("f(", "g(x)", ") = ", "(x+1)", "^2", fs=56).move_to(UP * 1.0 + LEFT * 3.2)
        fill[1].set_color(HL)
        fill[3].set_color(HL)
        ne = M(r"\ne", fs=56)
        other = M("g(f(x)) = x^2 + 1", fs=56, color=ORANGE_C)
        comp = M(r"(f\circ g)(x) = f(g(x))", fs=48).move_to(DOWN * 0.7)
        pipe = VGroup(M("x", fs=44), Arrow(ORIGIN, RIGHT, color=INK), self.machine("g", 1.0, 0.8, ORANGE_C),
                      Arrow(ORIGIN, RIGHT, color=INK), self.machine("f", 1.0, 0.8, BLUE_C),
                      Arrow(ORIGIN, RIGHT, color=INK), M("f(g(x))", fs=40)).arrange(RIGHT, buff=0.15)
        pipe.move_to(DOWN * 2.2)
        ptag = T("chain rule, later", 26, color=MUTED).next_to(pipe, DOWN, buff=0.25)
        with self.say("Fill f's slot with all of g of x: the quantity x plus one, squared.",
                      "The other order gives x squared plus one.",
                      "The chain rule studies change flowing through this pipeline.") as d:
            with self.slot(d[0]):
                self.play(FadeIn(slot), run_time=d[0] * 0.25)
                self.play(ReplacementTransform(slot, fill), run_time=d[0] * 0.5)
            with self.slot(d[1]):
                ne.next_to(fill, RIGHT, buff=0.5)
                other.next_to(ne, RIGHT, buff=0.5)
                VGroup(fill, ne, other).generate_target()
                self.play(FadeIn(ne), FadeIn(other), run_time=d[1] * 0.6)
            with self.slot(d[2]):
                self.play(Write(comp), run_time=d[2] * 0.35)
                self.play(FadeIn(pipe, lag_ratio=0.2), FadeIn(ptag), run_time=d[2] * 0.5)
        self.wipe()

    # Scene 10 --------------------------------------------------------------
    def cases(self, lhs, rows, fs=40):
        rg = VGroup(*[M(r, fs=fs) for r in rows]).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        br = Brace(rg, LEFT, color=INK)
        lh = M(lhs, fs=fs).next_to(br, LEFT, buff=0.15)
        g = VGroup(lh, br, rg)
        g.rows = rg
        return g

    def s10(self):
        cs = self.cases("f(x) =", [r"x + 2 \quad x < 0", r"x^2 \quad x \ge 0"])
        cs.rows[0].set_color(ORANGE_C)
        cs.rows[1].set_color(BLUE_C)
        cs.move_to(LEFT * 4.2 + UP * 1.6)
        ax = mk_axes([-5, 3, 1], [-4, 9, 1], 7.0, 6.2, fs=20).move_to(RIGHT * 2.9 + DOWN * 0.4)
        left = P(ax, lambda x: x + 2, -5, -0.001, color=ORANGE_C)
        right = P(ax, lambda x: x * x, 0, 3, color=BLUE_C)
        t = ValueTracker(-3)
        f = lambda x: x + 2 if x < 0 else x * x
        dot = always_redraw(lambda: Dot(ax.c2p(t.get_value(), f(t.get_value())), color=HL, radius=0.11))
        box = always_redraw(lambda: SurroundingRectangle(cs.rows[0 if t.get_value() < 0 else 1], color=HL, buff=0.1))
        with self.say("Piecewise functions use different rules in different regions.",
                      "Here, x plus two for negative x, and x squared from zero on.",
                      "Check the condition, then use that rule.") as d:
            with self.slot(d[0]):
                self.play(FadeIn(cs), Create(ax), run_time=d[0] * 0.8)
            with self.slot(d[1]):
                self.play(Indicate(cs.rows[0], color=ORANGE_C), Create(left), run_time=d[1] * 0.45)
                self.play(Indicate(cs.rows[1], color=BLUE_C), Create(right), run_time=d[1] * 0.45)
            with self.slot(d[2]):
                self.add(dot, box)
                self.play(t.animate.set_value(2.5), run_time=d[2] * 0.9, rate_func=linear)
        dot.clear_updaters()
        box.clear_updaters()

        cdot = Dot(ax.c2p(0, 0), color=BLUE_C, radius=0.12)
        odot = Circle(radius=0.1, color=ORANGE_C, stroke_width=4, fill_color=BG, fill_opacity=1).move_to(ax.c2p(0, 2))
        leg = VGroup(
            VGroup(Dot(radius=0.12, color=BLUE_C), T("closed: included", 28)).arrange(RIGHT, buff=0.25),
            VGroup(Circle(radius=0.1, color=ORANGE_C, stroke_width=4), T("open: not included", 28)).arrange(RIGHT, buff=0.25),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.35).next_to(cs, DOWN, buff=0.8).align_to(cs, LEFT)
        jump = DoubleArrow(ax.c2p(0.3, 2), ax.c2p(0.3, 0), buff=0, color=HL, stroke_width=4,
                           tip_length=0.18, max_tip_length_to_length_ratio=0.3)
        jl = T("jump", 28, color=HL, weight=BOLD).next_to(jump, LEFT, buff=0.6).shift(UP * 0.9)
        with self.say("At zero, x squared owns the point.", "A closed circle: f of zero is zero.",
                      "The left piece approaches two but never claims it.", "An open circle.",
                      "That jump returns next chapter.") as d:
            with self.slot(d[0]):
                self.play(FadeOut(dot), FadeOut(box), Indicate(cs.rows[1], color=BLUE_C), run_time=d[0] * 0.7)
            with self.slot(d[1]):
                self.play(FadeIn(cdot, scale=1.5), FadeIn(leg[0]), run_time=d[1] * 0.6)
            with self.slot(d[2]):
                self.play(ShowPassingFlash(left.copy().set_stroke(HL, 8), time_width=0.5), run_time=d[2] * 0.7)
            with self.slot(d[3]):
                self.play(FadeIn(odot, scale=1.5), FadeIn(leg[1]), run_time=d[3] * 0.7)
            with self.slot(d[4]):
                self.play(GrowFromCenter(jump), FadeIn(jl), run_time=d[4] * 0.6)
        self.wipe()

        tc = self.cases("C(u) =", [r"3u \quad u \le 100", r"5u \quad 100 < u \le 200", r"8u \quad u > 200"])
        tc.move_to(UP * 1.3 + RIGHT * 0.3)
        hd = T("Electricity tariff", 28, color=MUTED).move_to(UP * 3.0)
        res_pos = [DOWN * 1.2, DOWN * 2.0, DOWN * 2.8]
        with self.say("Worked example.", "An electricity tariff.", "Up to one hundred units, every unit costs three.",
                      "Up to two hundred, every unit costs five.", "Beyond that, every unit costs eight.",
                      "One hundred units: three hundred, since rule one includes one hundred.",
                      "One hundred fifty: five times one fifty, seven hundred fifty.",
                      "Two hundred fifty: two thousand.") as d:
            with self.slot(d[0] + d[1]):
                self.play(FadeIn(hd), FadeIn(VGroup(tc[0], tc[1])), run_time=(d[0] + d[1]) * 0.6)
            for i in range(3):
                with self.slot(d[2 + i]):
                    self.play(FadeIn(tc.rows[i], shift=0.2 * LEFT), run_time=d[2 + i] * 0.5)
            cases = [(100, 0, "C(100) = 300"), (150, 1, r"C(150) = 5 \cdot 150 = 750"), (250, 2, "C(250) = 2000")]
            for n, (u, win, res) in enumerate(cases):
                with self.slot(d[5 + n]):
                    ul = M(f"u = {u}", fs=44, color=HL).next_to(tc, LEFT, buff=0.9)
                    marks = VGroup(*[(check(36) if r == win else xmark(36)).next_to(tc.rows[r], RIGHT, buff=0.4)
                                     for r in range(3)])
                    for m in marks:
                        m.set_x(tc.get_right()[0] + 0.6)
                    wb = SurroundingRectangle(tc.rows[win], color=HL, buff=0.1)
                    rm = M(res, fs=40, color=RIGHT_C).move_to(res_pos[n])
                    stp = d[5 + n] * 0.85
                    self.play(FadeIn(ul), run_time=stp * 0.15)
                    self.play(LaggedStart(*[FadeIn(m, scale=1.3) for m in marks], lag_ratio=0.5), run_time=stp * 0.35)
                    self.play(Create(wb), run_time=stp * 0.15)
                    self.play(Write(rm), run_time=stp * 0.25)
                    self.play(FadeOut(ul), FadeOut(marks), FadeOut(wb), run_time=stp * 0.1)
        self.wipe()

    # Scene 11 --------------------------------------------------------------
    def s11(self):
        ax = mk_axes([0, 4.5, 1], [-2, 18, 2], 6.4, 6.2, fs=20).move_to(LEFT * 3.0 + DOWN * 0.4)
        par = P(ax, lambda x: x * x, 0, 4.24)
        d1 = Dot(ax.c2p(1, 1), color=BLUE_C, radius=0.1)
        d3 = Dot(ax.c2p(3, 9), color=BLUE_C, radius=0.1)
        sec = P(ax, lambda x: 4 * x - 3, 0.3, 4.5, color=ORANGE_C, sw=3)
        run_l = Line(ax.c2p(1, 1), ax.c2p(3, 1), color=HL, stroke_width=4)
        rise_l = Line(ax.c2p(3, 1), ax.c2p(3, 9), color=HL, stroke_width=4)
        rl = T("run 2", 24, color=HL).next_to(run_l, UP, buff=0.08).shift(RIGHT * 0.35)
        sl = T("rise 8", 24, color=HL).next_to(rise_l, RIGHT, buff=0.12)
        fm = M(r"\frac{f(3)-f(1)}{3-1} = \frac{9-1}{2} = 4", fs=44).move_to(RIGHT * 3.6 + UP * 1.2)
        tag = T("secant line:\naverage rate of change", 28, color=ORANGE_C).next_to(fm, DOWN, buff=0.6)
        with self.say("How fast is x squared changing?",
                      "From one to three, the output rises eight while the input moves two.", "Slope four.",
                      "That's the secant line: an average rate of change.") as d:
            with self.slot(d[0]):
                self.play(Create(ax), Create(par), run_time=d[0] * 0.9)
            with self.slot(d[1]):
                self.play(FadeIn(d1), FadeIn(d3), run_time=0.4)
                self.play(Create(run_l), FadeIn(rl), run_time=d[1] * 0.3)
                self.play(Create(rise_l), FadeIn(sl), run_time=d[1] * 0.3)
            with self.slot(d[2]):
                self.play(Write(fm), run_time=d[2] * 0.85)
            with self.slot(d[3]):
                self.play(Create(sec), FadeIn(tag), run_time=d[3] * 0.6)
        main = VGroup(ax, par)
        extra = VGroup(d1, d3, sec, run_l, rise_l, rl, sl, fm, tag)

        axl = mk_axes([0, 3, 1], [0, 2, 1], 4.6, 3.2).move_to(LEFT * 3.4 + UP * 0.4)
        rec = P(axl, lambda x: 1 / x, 0.5, 3)
        pa, pb = Dot(axl.c2p(1, 1), color=BLUE_C, radius=0.09), Dot(axl.c2p(2, 0.5), color=BLUE_C, radius=0.09)
        sl1 = Line(axl.c2p(0.6, 1.2), axl.c2p(2.8, 0.1), color=ORANGE_C, stroke_width=3)
        f1 = M(r"\frac{0.5-1}{2-1} = -0.5", fs=36).next_to(axl, DOWN, buff=0.35)
        h1 = M(r"y = \tfrac{1}{x}", fs=34, color=BLUE_C).next_to(axl, UP, buff=0.2)
        axr = mk_axes([0, 7, 1], [0, 20, 5], 4.6, 3.2).move_to(RIGHT * 3.4 + UP * 0.4)
        lin = P(axr, lambda x: 3 * x + 1, 0, 6.3)
        h2 = M("y = 3x + 1", fs=34, color=BLUE_C).next_to(axr, UP, buff=0.2)
        brk = VGroup()
        for x0, x1, side in ((1, 2.5, DOWN), (4, 5.5, DOWN)):
            a, b_, c = axr.c2p(x0, 3 * x0 + 1), axr.c2p(x1, 3 * x0 + 1), axr.c2p(x1, 3 * x1 + 1)
            tri = VGroup(Line(a, b_, color=HL, stroke_width=3), Line(b_, c, color=HL, stroke_width=3))
            lab = T("slope 3", 22, color=HL).next_to(b_, DR, buff=0.08)
            brk.add(VGroup(tri, lab))
        foot = M(r"x^3:\ \frac{8-1}{2-1} = 7", fs=28, color=MUTED).move_to(DOWN * 3.2)
        with self.say("Rates can be negative.", "One over x, from one to two, averages negative one half:",
                      "the graph falls.", "A straight line gives the same slope on every interval.") as d:
            with self.slot(d[0]):
                self.play(FadeOut(main), FadeOut(extra), run_time=0.5)
                self.play(Create(axl), Create(rec), FadeIn(h1), run_time=d[0] - 0.6)
            with self.slot(d[1]):
                self.play(FadeIn(pa), FadeIn(pb), run_time=d[1] * 0.3)
                self.play(Write(f1), run_time=d[1] * 0.5)
            with self.slot(d[2]):
                self.play(Create(sl1), run_time=d[2] * 0.7)
            with self.slot(d[3]):
                self.play(Create(axr), Create(lin), FadeIn(h2), run_time=d[3] * 0.35)
                self.play(FadeIn(brk[0]), run_time=d[3] * 0.2)
                self.play(FadeIn(brk[1]), FadeIn(foot), run_time=d[3] * 0.2)
        self.play(FadeOut(VGroup(axl, rec, pa, pb, sl1, f1, h1, axr, lin, h2, brk, foot)), FadeIn(main), run_time=0.7)

        x2 = ValueTracker(4)
        fixed = Dot(ax.c2p(2, 4), color=BLUE_C, radius=0.1)

        def secant():
            v = x2.get_value()
            if abs(v - 2) < 0.004:
                return VMobject()
            m = v + 2
            xr = min(4.5, 2 + 13 / m)
            return Line(ax.c2p(1, 4 - m), ax.c2p(xr, 4 + m * (xr - 2)), color=ORANGE_C, stroke_width=3)

        secm = always_redraw(secant)
        mov = always_redraw(lambda: Dot(ax.c2p(x2.get_value(), x2.get_value() ** 2), color=HL, radius=0.1))
        sval = DecimalNumber(6, num_decimal_places=2, font_size=44, color=ORANGE_C)
        sval.add_updater(lambda m: m.set_value(x2.get_value() + 2))
        slab = VGroup(T("slope = ", 34), sval)
        slab.add_updater(lambda g: g.arrange(RIGHT, buff=0.15).move_to(RIGHT * 3.6 + UP * 1.5))
        q = T("exactly at x = 2?", 32, color=PRIMARY).move_to(RIGHT * 3.6 + UP * 2.5)
        with self.say("But what about exactly at two?", "Slide a second point toward two.",
                      "The slopes go five,", "four and a half,", "four point one,", "closing in on four.") as d:
            with self.slot(d[0]):
                self.play(FadeIn(fixed, scale=1.5), FadeIn(q), run_time=d[0] * 0.6)
            with self.slot(d[1]):
                self.add(secm, mov, slab)
                self.play(FadeIn(VGroup(secm, mov)), run_time=0.3)
            for n, v in enumerate((3, 2.5, 2.1)):
                with self.slot(d[2 + n]):
                    self.play(x2.animate.set_value(v), run_time=min(1.0, d[2 + n] * 0.7))
            with self.slot(d[5]):
                self.play(x2.animate.set_value(2.05), run_time=d[5] * 0.6)

        big = M(r"\frac{f(2)-f(2)}{2-2} = ", r"\frac{0}{0}", fs=56).move_to(RIGHT * 3.6 + DOWN * 0.6)
        big[1].set_color(WRONG)
        with self.say("Set the points equal.", "f of two minus f of two, over two minus two.", "Zero over zero.",
                      "The formula collapses exactly when we need it.") as d:
            with self.slot(d[0]):
                self.play(x2.animate.set_value(2), run_time=d[0] * 0.6)
            with self.slot(d[1]):
                self.play(Write(big[0]), run_time=d[1] * 0.7)
            with self.slot(d[2]):
                self.play(FadeIn(big[1], scale=1.3), run_time=d[2] * 0.6)
            with self.slot(d[3]):
                self.play(Wiggle(big[1], scale_value=1.3), run_time=min(1.5, d[3] * 0.6))

        close = T("arbitrarily close, never equal", 32, color=HL, weight=BOLD).move_to(RIGHT * 3.6 + DOWN * 2.4)
        with self.say("We need to get arbitrarily close without touching.", "That tool is the limit.") as d:
            with self.slot(d[0]):
                self.play(x2.animate.set_value(2.01), run_time=d[0] * 0.5)
                self.play(FadeIn(close), run_time=d[0] * 0.4)
            with self.slot(d[1]):
                lim = M(r"\lim", fs=56, color=PRIMARY).next_to(close, UP, buff=0.3)
                self.play(big.animate.set_opacity(0.25), FadeIn(lim, scale=1.4), run_time=d[1] * 0.6)
        self.wipe()

    # Scene 12 --------------------------------------------------------------
    def s12(self):
        items = ["one output per input", "substitute the whole input", "domain: two suspects",
                 "change column = fingerprint", "minus inside → right", "compose inside-out",
                 "secant = average change"]
        rows = VGroup(*[VGroup(check(36), T(s, 30)).arrange(RIGHT, buff=0.3) for s in items])
        rows.arrange(DOWN, aligned_edge=LEFT, buff=0.28).move_to(DOWN * 0.3)
        hd = T("Recap", 36, weight=BOLD, color=PRIMARY).next_to(rows, UP, buff=0.35)
        parts = ["Recap.", "One output per input.", "Substitute the whole input.", "Domains dodge two suspects.",
                 "Change columns are fingerprints.", "Minus inside shifts right.", "Compose inside out.",
                 "Secants give average change."]
        with self.say(*parts) as d:
            with self.slot(d[0]):
                self.play(FadeIn(hd), run_time=d[0] * 0.8)
            for i in range(7):
                with self.slot(d[1 + i]):
                    self.play(FadeIn(rows[i], shift=0.2 * RIGHT), run_time=min(0.6, d[1 + i] * 0.6))

        mc = T("Chapter 0 Mastery Check", 30, color=MUTED)
        nx = T("Next: Chapter 1 · Limits", 56, color=HL, weight=BOLD)
        VGroup(mc, nx).arrange(DOWN, buff=0.6)
        with self.say("Try the Chapter Zero mastery check.", "Then on to Chapter One.", "Limits.") as d:
            with self.slot(d[0]):
                self.play(FadeOut(rows), FadeOut(hd), FadeOut(self.header), run_time=0.6)
                self.play(FadeIn(mc), run_time=0.5)
            with self.slot(d[1] + d[2]):
                self.play(FadeIn(nx, scale=1.1), run_time=0.8)
        self.wait(2)
        self.play(FadeOut(mc), FadeOut(nx), run_time=0.8)
        self.wait(0.3)
