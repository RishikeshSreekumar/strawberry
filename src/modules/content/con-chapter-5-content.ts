import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Conic Sections Chapter 5 — Tangents, Normals and Chords for Ellipse and
 * Hyperbola. The tangent machine from the circle and the parabola, run on
 * the ellipse and the hyperbola: the position of a point (sign of S₁), the
 * tangency conditions c² = a²m² ± b² from a discriminant, tangents in point,
 * parametric and slope form (and for xy = c²), normals in every form, the
 * director circle, chord of contact (T = 0), chord with a given midpoint
 * (T = S₁) and the pair of tangents (SS₁ = T²), one comparison table for
 * every conic, and the JEE mixed problems built from them.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "line-meeting-ellipse-or-hyperbola",
  title: "5.1 · A Line Meeting an Ellipse or Hyperbola",
  position: 1,
  blocks: blocks([
    {
      type: "text",
      content:
        "Slide a ruler of fixed slope across an ellipse drawn on paper. Far away it misses the curve, then for one position it just grazes it, and after that it cuts the curve in two points. For a circle you decided which case you were in by comparing the distance from the centre with the radius. An ellipse has no single radius, so we need a test that works for every conic: **substitute the line into the curve and look at the discriminant** of the quadratic that comes out.",
    },
    {
      type: "text",
      content:
        "This lesson builds that test for $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$ and $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$. Before lines, we settle the simpler question of where a single point lies.",
    },
    { type: "heading", text: "Where a point lies: the sign of S1" },
    {
      type: "text",
      content:
        "Write each curve as $S = 0$ with everything on one side, exactly as for the circle and the parabola. Substituting a point $(x_1, y_1)$ gives the number $S_1$:",
    },
    {
      type: "math",
      latex:
        "\\text{ellipse: } S_1 = \\frac{x_1^2}{a^2} + \\frac{y_1^2}{b^2} - 1, \\qquad \\text{hyperbola: } S_1 = \\frac{x_1^2}{a^2} - \\frac{y_1^2}{b^2} - 1",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Position of a point",
      content:
        "- **Ellipse:** $S_1 < 0$ inside, $S_1 = 0$ on the curve, $S_1 > 0$ outside.\n- **Hyperbola:** $S_1 = 0$ on the curve. $S_1 > 0$ means the point is on the **focus side** of a branch (the region that contains a focus); $S_1 < 0$ means it lies **between the branches** (the region that contains the centre).\n\nThe sign changes only when you cross the curve, because $S$ is a continuous function of position.",
    },
    {
      type: "worked-example",
      id: "con5-1-we1",
      title: "Worked example 1: inside or outside?",
      problem: "Decide where $(2, 1)$ lies relative to $\\frac{x^2}{9} + \\frac{y^2}{4} = 1$, and where $(1, 0)$ lies relative to $\\frac{x^2}{4} - \\frac{y^2}{9} = 1$.",
      steps: [
        { text: "Ellipse: substitute. *Why this step:* the sign of $S_1$ is the whole test, so compute it exactly with a common denominator.", latex: "S_1 = \\frac{4}{9} + \\frac{1}{4} - 1 = \\frac{16 + 9 - 36}{36} = -\\frac{11}{36} < 0" },
        { text: "Hyperbola: substitute.", latex: "S_1 = \\frac{1}{4} - 0 - 1 = -\\frac34 < 0" },
        { text: "For the hyperbola a negative $S_1$ means the region between the branches: $(1, 0)$ sits between the vertices $(\\pm 2, 0)$, which matches the picture." },
      ],
      answer: "$(2, 1)$ is inside the ellipse. $(1, 0)$ lies between the branches of the hyperbola.",
    },
    { type: "heading", text: "A line meeting an ellipse" },
    {
      type: "text",
      content:
        "Put $y = mx + c$ into $b^2x^2 + a^2y^2 = a^2b^2$ (the ellipse with denominators cleared). Every meeting point gives a root of",
    },
    {
      type: "math",
      latex: "(b^2 + a^2m^2)\\,x^2 + 2a^2mc\\,x + a^2(c^2 - b^2) = 0",
    },
    {
      type: "text",
      content:
        "The leading coefficient $b^2 + a^2m^2$ is never zero, so this is always a genuine quadratic. A quarter of its discriminant simplifies beautifully: the $a^4m^2c^2$ terms cancel and $a^2b^2$ factors out.",
    },
    {
      type: "math",
      latex:
        "\\frac{D}{4} = a^4m^2c^2 - a^2(b^2 + a^2m^2)(c^2 - b^2) = a^2b^2\\,\\big(a^2m^2 + b^2 - c^2\\big)",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Tangency condition for the ellipse",
      content:
        "$y = mx + c$ cuts $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$ in two points if $c^2 < a^2m^2 + b^2$, touches it if\n$$c^2 = a^2m^2 + b^2,$$\nand misses it if $c^2 > a^2m^2 + b^2$. So for every slope $m$ there are exactly two tangents,\n$$y = mx \\pm \\sqrt{a^2m^2 + b^2},$$\nand $y = mx + c$ with $c = \\sqrt{a^2m^2 + b^2}$ touches at $\\left(-\\frac{a^2m}{c}, \\frac{b^2}{c}\\right)$ (change both signs for the other tangent).",
    },
    {
      type: "text",
      content:
        "Check with the circle: put $b = a$ and the condition becomes $c^2 = a^2(1 + m^2)$, the circle's tangency condition from the straight-lines-and-circles course. The ellipse result is the circle result with the two axes stretched differently.",
    },
    { type: "heading", text: "A line meeting a hyperbola" },
    {
      type: "text",
      content:
        "Do the same with $b^2x^2 - a^2y^2 = a^2b^2$. Now the quadratic is",
    },
    {
      type: "math",
      latex: "(b^2 - a^2m^2)\\,x^2 - 2a^2mc\\,x - a^2(c^2 + b^2) = 0, \\qquad \\frac{D}{4} = a^2b^2\\,\\big(c^2 + b^2 - a^2m^2\\big)",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Tangency condition for the hyperbola",
      content:
        "When $a^2m^2 \\ne b^2$, the line $y = mx + c$ touches $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$ exactly when\n$$c^2 = a^2m^2 - b^2.$$\nTangents of slope $m$ exist only if $a^2m^2 > b^2$, that is $\\lvert m\\rvert > \\frac ba$: they are $y = mx \\pm \\sqrt{a^2m^2 - b^2}$, and $y = mx + c$ with $c = \\sqrt{a^2m^2 - b^2}$ touches at $\\left(-\\frac{a^2m}{c}, -\\frac{b^2}{c}\\right)$.",
    },
    {
      type: "text",
      content:
        "The exceptional slopes $m = \\pm\\frac ba$ are the slopes of the asymptotes. Then the $x^2$ term vanishes and the \"quadratic\" is linear: a line parallel to an asymptote meets the hyperbola in **exactly one point** (or not at all if it is the asymptote itself), yet it crosses the curve there instead of touching it.",
    },
    {
      type: "interactive",
      config: {
        component: "con-tangent-lab",
        conic: "hyperbola",
        show: ["tangent", "asymptotes", "focus"],
        caption:
          "Drag $\\theta$ to slide $P$ along the hyperbola and watch the tangent's slope. It is always steeper than the asymptotes: $\\lvert m\\rvert > \\frac ba$. As $P$ runs off to infinity the tangent turns into an asymptote, which is why no tangent has slope exactly $\\pm\\frac ba$.",
      },
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a line meeting a hyperbola once is a tangent\"",
      content:
        "For a circle or an ellipse, one meeting point does mean tangency. For a hyperbola it does not: every line parallel to an asymptote (other than the asymptote) meets the curve exactly once and passes straight through it. Tangency is the **double root** of the quadratic, $c^2 = a^2m^2 - b^2$, not \"one point\". The same trap exists for the parabola with lines parallel to its axis.",
    },
    { type: "heading", text: "Worked examples" },
    {
      type: "worked-example",
      id: "con5-1-we2",
      title: "Worked example 2: tangents of a given slope to an ellipse",
      problem: "Find the tangents of slope $1$ to $\\frac{x^2}{16} + \\frac{y^2}{9} = 1$ and their points of contact.",
      steps: [
        { text: "Use $c^2 = a^2m^2 + b^2$ with $a^2 = 16$, $b^2 = 9$, $m = 1$.", latex: "c^2 = 16 + 9 = 25 \\Rightarrow c = \\pm 5" },
        { text: "Point of contact of $y = x + 5$: $\\left(-\\frac{a^2m}{c}, \\frac{b^2}{c}\\right)$. *Why this step:* it is the double root of the quadratic, so it is worth having ready.", latex: "\\left(-\\frac{16}{5}, \\frac{9}{5}\\right)" },
        { text: "Check: $\\frac{256/25}{16} + \\frac{81/25}{9} = \\frac{16}{25} + \\frac{9}{25} = 1$. The other tangent $y = x - 5$ touches at $\\left(\\frac{16}{5}, -\\frac95\\right)$." },
      ],
      answer: "$y = x \\pm 5$, touching at $\\left(\\mp\\frac{16}{5}, \\pm\\frac95\\right)$.",
    },
    {
      type: "worked-example",
      id: "con5-1-we3",
      title: "Worked example 3: tangents of a given slope to a hyperbola",
      problem: "Find the tangents of slope $1$ to $\\frac{x^2}{9} - \\frac{y^2}{4} = 1$. Are there any tangents of slope $\\frac12$?",
      steps: [
        { text: "Slope 1: $c^2 = a^2m^2 - b^2 = 9 - 4 = 5$.", latex: "y = x \\pm \\sqrt5" },
        { text: "Slope $\\frac12$: $a^2m^2 - b^2 = \\frac94 - 4 < 0$, so $c^2$ would be negative. *Why this step:* the test $\\lvert m\\rvert > \\frac ba = \\frac23$ fails, so no real tangent exists." },
      ],
      answer: "$y = x \\pm \\sqrt5$. There is no tangent of slope $\\frac12$, because $\\frac12 < \\frac23 = \\frac ba$.",
    },
    {
      type: "worked-example",
      id: "con5-1-we4",
      title: "Worked example 4: a line parallel to an asymptote",
      problem: "Where does $y = \\frac23x + 1$ meet $\\frac{x^2}{9} - \\frac{y^2}{4} = 1$?",
      steps: [
        { text: "The slope $\\frac23 = \\frac ba$ is an asymptote slope, so expect one meeting point. Substitute.", latex: "\\frac{x^2}{9} - \\frac{1}{4}\\left(\\frac{4x^2}{9} + \\frac{4x}{3} + 1\\right) = 1 \\iff -\\frac{x}{3} - \\frac14 = 1" },
        { text: "The $x^2$ terms cancel, leaving a linear equation.", latex: "x = -\\frac{15}{4}, \\qquad y = \\frac23\\left(-\\frac{15}{4}\\right) + 1 = -\\frac32" },
        { text: "Check: $\\frac{225/16}{9} - \\frac{9/4}{4} = \\frac{25}{16} - \\frac{9}{16} = 1$. *Why this step:* one point, but the line is not a tangent: it crosses from one side of the branch to the other." },
      ],
      answer: "One meeting point, $\\left(-\\frac{15}{4}, -\\frac32\\right)$, and the line is **not** a tangent.",
    },
    { type: "heading", text: "Lines in general form" },
    {
      type: "text",
      content:
        "JEE often gives the line as $lx + my + n = 0$ (here $m$ is just a coefficient, not the slope). Rewrite it as $y = -\\frac{l}{m}x - \\frac{n}{m}$ and apply the condition: $\\frac{n^2}{m^2} = a^2\\frac{l^2}{m^2} \\pm b^2$. Clearing $m^2$:",
    },
    {
      type: "math",
      latex: "lx + my + n = 0 \\text{ touches } \\frac{x^2}{a^2} \\pm \\frac{y^2}{b^2} = 1 \\iff a^2l^2 \\pm b^2m^2 = n^2",
    },
    {
      type: "worked-example",
      id: "con5-1-we5",
      title: "Worked example 5: the general-form condition",
      problem: "For which $k$ does $3x + 4y = k$ touch $\\frac{x^2}{16} + \\frac{y^2}{9} = 1$?",
      steps: [
        { text: "Here $l = 3$, $m = 4$, $n = -k$ and the sign is $+$ (ellipse).", latex: "a^2l^2 + b^2m^2 = 16 \\cdot 9 + 9 \\cdot 16 = 288 = k^2" },
        { text: "So $k = \\pm\\sqrt{288} = \\pm 12\\sqrt2$." },
      ],
      answer: "$k = \\pm 12\\sqrt2$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "con5-1-q1",
      variant: "concept",
      question: "Where does the point $(3, 2)$ lie relative to the ellipse $\\frac{x^2}{16} + \\frac{y^2}{9} = 1$?",
      options: [
        { text: "Outside the ellipse", correct: true, feedback: "$S_1 = \\frac{9}{16} + \\frac49 - 1 = \\frac{81 + 64 - 144}{144} = \\frac{1}{144} > 0$. Only just outside, which is why you must compute instead of eyeballing." },
        { text: "Inside the ellipse", feedback: "Both coordinates are smaller than the semi-axes, but that does not make the point inside: compute $S_1$, which is $\\frac{1}{144} > 0$." },
        { text: "On the ellipse", feedback: "$S_1 = \\frac{1}{144} \\ne 0$, so it is not on the curve." },
        { text: "It cannot be decided without a diagram", feedback: "The sign of $S_1$ decides it exactly." },
      ],
      hint: "Compute $S_1 = \\frac{x_1^2}{16} + \\frac{y_1^2}{9} - 1$ over the common denominator 144.",
    },
    {
      type: "numeric",
      id: "con5-1-q2",
      variant: "practice",
      question: "The line $y = 2x + c$ with $c > 0$ touches $\\frac{x^2}{4} + \\frac{y^2}{9} = 1$. Find $c$.",
      answer: 5,
      hint: "Use $c^2 = a^2m^2 + b^2$ with $a^2$ the denominator under $x^2$.",
      solution: "$c^2 = 4 \\cdot 2^2 + 9 = 25$, so $c = 5$.",
      commonMistakes: [
        { answer: 25, feedback: "That is $c^2$. Take the positive square root." },
        { answer: 6.32, tolerance: 0.01, feedback: "You used $c^2 = b^2m^2 + a^2 = 36 + 4 = 40$. The $a^2$ that multiplies $m^2$ is the one under $x^2$." },
      ],
    },
    {
      type: "quiz",
      id: "con5-1-q3",
      variant: "practice",
      question: "How many tangents of slope $\\frac12$ can be drawn to $\\frac{x^2}{9} - \\frac{y^2}{4} = 1$?",
      options: [
        { text: "None", correct: true, feedback: "$a^2m^2 - b^2 = \\frac94 - 4 < 0$. Slopes with $\\lvert m\\rvert \\le \\frac ba = \\frac23$ give no tangents." },
        { text: "One", feedback: "One meeting point happens only for lines parallel to an asymptote (slope $\\pm\\frac23$), and those are not tangents." },
        { text: "Two", feedback: "Two tangents exist for each slope only when $\\lvert m\\rvert > \\frac ba$." },
        { text: "Infinitely many", feedback: "A tangent of a given slope is fixed by $c^2 = a^2m^2 - b^2$: at most two values of $c$." },
      ],
      hint: "Compare $\\lvert m\\rvert$ with $\\frac ba$, or compute $a^2m^2 - b^2$.",
    },
    {
      type: "numeric",
      id: "con5-1-q4",
      variant: "practice",
      question: "The line $y = 3x + c$ touches $\\frac{x^2}{4} - \\frac{y^2}{9} = 1$. Find $c^2$.",
      answer: 27,
      hint: "Hyperbola: $c^2 = a^2m^2 - b^2$.",
      solution: "$c^2 = 4 \\cdot 9 - 9 = 27$, so the tangents are $y = 3x \\pm 3\\sqrt3$.",
      commonMistakes: [{ answer: 45, feedback: "That is $a^2m^2 + b^2$, the ellipse condition. For the hyperbola subtract $b^2$." }],
    },
    {
      type: "quiz",
      id: "con5-1-q5",
      variant: "practice",
      multiple: true,
      question: "Consider the line $y = \\frac32x + 1$ and the hyperbola $\\frac{x^2}{4} - \\frac{y^2}{9} = 1$. Select all true statements.",
      options: [
        { text: "The line is parallel to an asymptote", correct: true, feedback: "The asymptotes are $y = \\pm\\frac32x$." },
        { text: "The line meets the hyperbola in exactly one point", correct: true, feedback: "Substituting, the $x^2$ terms cancel: $-\\frac x3 - \\frac19 = 1$ gives $x = -\\frac{10}{3}$, $y = -4$." },
        { text: "The line is a tangent to the hyperbola", feedback: "One meeting point is not tangency here: the line crosses the curve at $\\left(-\\frac{10}{3}, -4\\right)$." },
        { text: "The line meets the hyperbola in two points", feedback: "The equation for $x$ is linear, so there is only one solution." },
      ],
      hint: "Compare the slope with $\\frac ba$, then substitute and see what happens to the $x^2$ terms.",
    },
    {
      type: "numeric",
      id: "con5-1-q6",
      variant: "practice",
      question: "The line $y = x + 5$ touches $\\frac{x^2}{16} + \\frac{y^2}{9} = 1$. Find the $x$-coordinate of the point of contact.",
      answer: -3.2,
      hint: "For $y = mx + c$ the point of contact is $\\left(-\\frac{a^2m}{c}, \\frac{b^2}{c}\\right)$. Or solve the quadratic: the double root is $-\\frac{B}{2A}$.",
      solution: "$x = -\\frac{a^2m}{c} = -\\frac{16}{5} = -3.2$ (and $y = \\frac95$). Check: the quadratic is $25x^2 + 160x + 256 = 0 = (5x + 16)^2$.",
      commonMistakes: [{ answer: 3.2, feedback: "Sign slip: with $c > 0$ the contact point has $x = -\\frac{a^2m}{c} < 0$ for $m > 0$." }],
    },
    {
      type: "quiz",
      id: "con5-1-q7",
      variant: "practice",
      question: "The line $lx + my + n = 0$ touches $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$ if and only if",
      options: [
        { text: "$a^2l^2 - b^2m^2 = n^2$", correct: true, feedback: "From $c^2 = a^2(\\text{slope})^2 - b^2$ with slope $-\\frac lm$ and $c = -\\frac nm$, then multiply by $m^2$." },
        { text: "$a^2l^2 + b^2m^2 = n^2$", feedback: "That is the ellipse condition." },
        { text: "$\\frac{l^2}{a^2} - \\frac{m^2}{b^2} = n^2$", feedback: "The squares of $a$ and $b$ multiply, they do not divide. Check with $x = a$ (so $l = 1$, $m = 0$, $n = -a$): $a^2 = a^2$ works only for the correct form." },
        { text: "$a^2m^2 - b^2l^2 = n^2$", feedback: "$l$ goes with $x$, so it pairs with $a^2$." },
      ],
      hint: "Rewrite the line as $y = -\\frac lm x - \\frac nm$ and use $c^2 = a^2m_{\\text{slope}}^2 - b^2$.",
    },
    {
      type: "numeric",
      id: "con5-1-q8",
      variant: "practice",
      question: "The line $3x + 4y = k$ (with $k > 0$) touches $\\frac{x^2}{16} + \\frac{y^2}{9} = 1$. Find $k^2$.",
      answer: 288,
      hint: "$a^2l^2 + b^2m^2 = n^2$ with $l = 3$, $m = 4$, $n = -k$.",
      solution: "$k^2 = 16 \\cdot 9 + 9 \\cdot 16 = 288$, so $k = 12\\sqrt2$.",
      commonMistakes: [{ answer: 25, feedback: "That is $l^2 + m^2$. Each coefficient must be weighted by the matching $a^2$ or $b^2$." }],
    },
    {
      type: "quiz",
      id: "con5-1-q9",
      variant: "practice",
      multiple: true,
      question: "Select every point from which **no** tangent can be drawn to $\\frac{x^2}{4} - \\frac{y^2}{9} = 1$.",
      options: [
        { text: "$(4, 1)$", correct: true, feedback: "$S_1 = 4 - \\frac19 - 1 > 0$: the point is on the focus side of the right branch. The slope quadratic $12m^2 - 8m + 10 = 0$ has negative discriminant." },
        { text: "$(0, 0)$", correct: true, feedback: "From the centre the slope equation gives $m = \\pm\\frac32$, the asymptotes, which are not tangents." },
        { text: "$(1, 0)$", feedback: "$S_1 < 0$ (between the branches): $-3m^2 + 9 = 0$ gives $m = \\pm\\sqrt3$, and $\\lvert m\\rvert > \\frac32$, so two tangents exist." },
        { text: "$(0, 3)$", feedback: "The slope equation $-4m^2 + 18 = 0$ gives $m = \\pm\\frac{3}{\\sqrt2}$, steeper than $\\frac32$: two tangents." },
      ],
      hint: "A tangent of slope $m$ through $(h, k)$ needs $(k - mh)^2 = a^2m^2 - b^2$ with $\\lvert m\\rvert > \\frac ba$. Solve for $m$ at each point.",
    },
    { type: "heading", text: "JEE-style questions" },
    {
      type: "quiz",
      id: "con5-1-q10",
      variant: "practice",
      question: "The line $x\\cos\\alpha + y\\sin\\alpha = p$ touches $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$. Then",
      options: [
        { text: "$a^2\\cos^2\\alpha + b^2\\sin^2\\alpha = p^2$", correct: true, feedback: "General-form condition with $l = \\cos\\alpha$, $m = \\sin\\alpha$, $n = -p$." },
        { text: "$a^2\\sin^2\\alpha + b^2\\cos^2\\alpha = p^2$", feedback: "$\\cos\\alpha$ multiplies $x$, so it pairs with $a^2$." },
        { text: "$\\frac{\\cos^2\\alpha}{a^2} + \\frac{\\sin^2\\alpha}{b^2} = \\frac{1}{p^2}$", feedback: "It agrees at $\\alpha = 0$ and $\\alpha = 90^\\circ$ but fails in between: for $a = 2$, $b = 1$, $\\alpha = 45^\\circ$ the true tangent has $p^2 = \\frac{4 + 1}{2} = 2.5$, while this formula gives $p^2 = 1.6$." },
        { text: "$p^2 = a^2 + b^2$", feedback: "The answer must depend on $\\alpha$: at $\\alpha = 0$ the tangent is $x = a$, so $p = a$, not $\\sqrt{a^2 + b^2}$." },
      ],
      hint: "Apply $a^2l^2 + b^2m^2 = n^2$.",
    },
    {
      type: "numeric",
      id: "con5-1-q11",
      variant: "practice",
      question: "The line $y = mx + 3$ touches the ellipse $\\frac{x^2}{4} + y^2 = 1$. Find $m^2$.",
      answer: 2,
      hint: "$c^2 = a^2m^2 + b^2$ with $a^2 = 4$, $b^2 = 1$, $c = 3$.",
      solution: "$9 = 4m^2 + 1$, so $m^2 = 2$ and $m = \\pm\\sqrt2$.",
      commonMistakes: [{ answer: 8, feedback: "Solve $9 = 4m^2 + 1$ for $m^2$: it is $\\frac84 = 2$." }],
    },
    {
      type: "quiz",
      id: "con5-1-q12",
      variant: "practice",
      multiple: true,
      question: "For the hyperbola $\\frac{x^2}{9} - \\frac{y^2}{16} = 1$, select all true statements.",
      options: [
        { text: "No tangent has slope $m$ with $\\lvert m\\rvert \\le \\frac43$", correct: true, feedback: "Tangents need $a^2m^2 > b^2$, i.e. $\\lvert m\\rvert > \\frac ba = \\frac43$." },
        { text: "The tangents of slope 2 are $y = 2x \\pm 2\\sqrt5$", correct: true, feedback: "$c^2 = 9 \\cdot 4 - 16 = 20$, $c = \\pm 2\\sqrt5$." },
        { text: "Each line $y = \\frac43x + c$ with $c \\ne 0$ meets the hyperbola exactly once", correct: true, feedback: "Parallel to an asymptote: the equation in $x$ is linear with a non-zero coefficient." },
        { text: "The line $y = \\frac43x$ is a tangent", feedback: "It is an asymptote: it never meets the hyperbola at all." },
      ],
      hint: "Use $c^2 = a^2m^2 - b^2$ and think about what happens when $m = \\pm\\frac ba$.",
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "tangents-to-ellipse-and-hyperbola",
  title: "5.2 · Tangents in Point and Parametric Form",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "Zoom in on any point of an ellipse and the curve straightens into a line: the tangent. For the circle and the parabola you wrote that line with one rule, $T = 0$: replace $x^2$ by $xx_1$, $y^2$ by $yy_1$, $x$ by $\\frac{x + x_1}{2}$, $y$ by $\\frac{y + y_1}{2}$ and $xy$ by $\\frac{xy_1 + x_1y}{2}$. The same rule works for the ellipse and the hyperbola, and in this lesson we prove it and put it to work.",
    },
    { type: "heading", text: "Tangent at a point" },
    {
      type: "text",
      content:
        "Take two points $(x_1, y_1)$ and $(x_2, y_2)$ on the ellipse and subtract their equations. The difference of squares factors:",
    },
    {
      type: "math",
      latex:
        "\\frac{(x_1 - x_2)(x_1 + x_2)}{a^2} + \\frac{(y_1 - y_2)(y_1 + y_2)}{b^2} = 0 \\Rightarrow \\text{slope of chord} = \\frac{y_1 - y_2}{x_1 - x_2} = -\\frac{b^2(x_1 + x_2)}{a^2(y_1 + y_2)}",
    },
    {
      type: "text",
      content:
        "Let the second point slide into the first. The chord becomes the tangent, with slope $-\\frac{b^2x_1}{a^2y_1}$. The line through $(x_1, y_1)$ with this slope is $a^2y_1(y - y_1) = -b^2x_1(x - x_1)$; divide by $a^2b^2$ and use $\\frac{x_1^2}{a^2} + \\frac{y_1^2}{b^2} = 1$:",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Tangent at a point (T = 0)",
      content:
        "- Ellipse: $\\dfrac{xx_1}{a^2} + \\dfrac{yy_1}{b^2} = 1$\n- Hyperbola: $\\dfrac{xx_1}{a^2} - \\dfrac{yy_1}{b^2} = 1$ (same derivation, one sign changes)\n- Rectangular hyperbola $xy = c^2$: $\\dfrac{xy_1 + x_1y}{2} = c^2$, i.e. $xy_1 + x_1y = 2c^2$",
    },
    { type: "heading", text: "Tangent at a parameter" },
    {
      type: "text",
      content:
        "Substitute the parametric points from Chapters 3 and 4 into $T = 0$. On the ellipse $P = (a\\cos\\theta, b\\sin\\theta)$, on the hyperbola $P = (a\\sec\\theta, b\\tan\\theta)$, and on $xy = c^2$, $P = \\left(ct, \\frac ct\\right)$:",
    },
    {
      type: "math",
      latex:
        "\\frac{x}{a}\\cos\\theta + \\frac{y}{b}\\sin\\theta = 1, \\qquad \\frac{x}{a}\\sec\\theta - \\frac{y}{b}\\tan\\theta = 1, \\qquad x + t^2y = 2ct",
    },
    {
      type: "text",
      content:
        "The last one: $T = 0$ gives $\\frac{x \\cdot \\frac ct + y \\cdot ct}{2} = c^2$; multiply by $\\frac{2t}{c}$. Its intercepts are $2ct$ and $\\frac{2c}{t}$, so $P$ is the midpoint of the part of the tangent cut off by the axes, and the triangle formed with the axes always has area $\\frac12 \\cdot 2ct \\cdot \\frac{2c}{t} = 2c^2$.",
    },
    {
      type: "interactive",
      config: {
        component: "con-tangent-lab",
        conic: "ellipse",
        show: ["tangent", "focus", "focal-radii", "pair-of-tangents"],
        q: [5, 3],
        caption:
          "Drag $\\theta$: the tangent at $P$ is $\\frac{x}{a}\\cos\\theta + \\frac{y}{b}\\sin\\theta = 1$. Watch the focal radii $SP$ and $S'P$: they make equal angles with the tangent (the reflective property). Drag $Q$ to see the two tangents it sends to the ellipse.",
      },
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the tangent at $\\theta$ makes angle $\\theta$ with the axis\"",
      content:
        "The eccentric angle $\\theta$ is measured on the auxiliary circle, not on the tangent. The slope of the tangent at $\\theta$ is $-\\frac{b\\cos\\theta}{a\\sin\\theta} = -\\frac ba\\cot\\theta$. Only for a circle ($a = b$) is the tangent at angle $\\theta$ perpendicular to the radius at angle $\\theta$, and even then its own inclination is $\\theta + 90^\\circ$, not $\\theta$.",
    },
    { type: "heading", text: "Worked examples" },
    {
      type: "worked-example",
      id: "con5-2-we1",
      title: "Worked example 1: tangent at a point",
      problem: "Find the tangent to $\\frac{x^2}{16} + \\frac{y^2}{9} = 1$ at $\\left(2, \\frac{3\\sqrt3}{2}\\right)$.",
      steps: [
        { text: "Check the point is on the curve: $\\frac{4}{16} + \\frac{27/4}{9} = \\frac14 + \\frac34 = 1$. *Why this step:* $T = 0$ is the tangent only when the point is on the conic; otherwise it is the chord of contact." },
        { text: "Apply $T = 0$.", latex: "\\frac{2x}{16} + \\frac{3\\sqrt3}{2} \\cdot \\frac{y}{9} = 1 \\iff \\frac{x}{8} + \\frac{\\sqrt3\\,y}{6} = 1" },
        { text: "Multiply by 24.", latex: "3x + 4\\sqrt3\\,y = 24" },
      ],
      answer: "$3x + 4\\sqrt3\\,y = 24$.",
    },
    {
      type: "worked-example",
      id: "con5-2-we2",
      title: "Worked example 2: tangent at a parameter on a hyperbola",
      problem: "Find the tangent to $\\frac{x^2}{9} - \\frac{y^2}{16} = 1$ at the point with $\\theta = \\frac{\\pi}{3}$.",
      steps: [
        { text: "The point is $(3\\sec\\frac\\pi3, 4\\tan\\frac\\pi3) = (6, 4\\sqrt3)$. Check: $\\frac{36}{9} - \\frac{48}{16} = 4 - 3 = 1$." },
        { text: "Parametric tangent with $\\sec\\theta = 2$, $\\tan\\theta = \\sqrt3$.", latex: "\\frac{2x}{3} - \\frac{\\sqrt3\\,y}{4} = 1 \\iff 8x - 3\\sqrt3\\,y = 12" },
      ],
      answer: "$8x - 3\\sqrt3\\,y = 12$.",
    },
    {
      type: "worked-example",
      id: "con5-2-we3",
      title: "Worked example 3: tangents from an external point",
      problem: "Find the tangents from $(3, 2)$ to $\\frac{x^2}{9} + \\frac{y^2}{4} = 1$.",
      steps: [
        { text: "A line of slope $m$ through $(h, k)$ is $y = mx + (k - mh)$. It is a tangent when $(k - mh)^2 = a^2m^2 + b^2$, which rearranges to a quadratic in $m$.", latex: "(h^2 - a^2)m^2 - 2hk\\,m + (k^2 - b^2) = 0" },
        { text: "With $h = 3$, $k = 2$, $a^2 = 9$, $b^2 = 4$ the $m^2$ coefficient vanishes. *Why this step:* a lost $m^2$ term means one root has gone to infinity, so one tangent is vertical.", latex: "0 \\cdot m^2 - 12m + 0 = 0 \\Rightarrow m = 0" },
        { text: "So the tangents are $y = 2$ (slope 0) and the vertical line $x = 3$. Both are tangents at vertices: $(0, 2)$ and $(3, 0)$." },
      ],
      answer: "$y = 2$ and $x = 3$.",
    },
    {
      type: "worked-example",
      id: "con5-2-we4",
      title: "Worked example 4: tangents at the ends of the latera recta",
      problem: "Find the area of the quadrilateral formed by the tangents at the ends of the latera recta of $\\frac{x^2}{9} + \\frac{y^2}{5} = 1$.",
      steps: [
        { text: "$e^2 = 1 - \\frac59 = \\frac49$, so $e = \\frac23$, $ae = 2$, and one end of a latus rectum is $\\left(2, \\frac{b^2}{a}\\right) = \\left(2, \\frac53\\right)$." },
        { text: "Tangent there, by $T = 0$.", latex: "\\frac{2x}{9} + \\frac{5}{3} \\cdot \\frac{y}{5} = 1 \\iff \\frac{x}{9/2} + \\frac{y}{3} = 1" },
        { text: "By symmetry the four tangents form a rhombus with vertices $\\left(\\pm\\frac92, 0\\right)$ and $(0, \\pm 3)$. *Why this step:* the four ends of the latera recta are mirror images in both axes, so the four tangents are too.", latex: "\\text{Area} = \\frac12 \\cdot 9 \\cdot 6 = 27" },
      ],
      answer: "27 square units. (In general the intercepts are $\\frac ae$ and $a$, giving area $\\frac{2a^2}{e}$.)",
    },
    {
      type: "worked-example",
      id: "con5-2-we5",
      title: "Worked example 5: a tangent to xy = c²",
      problem: "Find the tangent to $xy = 4$ at the point with $t = 2$ and the area of the triangle it makes with the axes.",
      steps: [
        { text: "Here $c = 2$, so $P = (ct, \\frac ct) = (4, 1)$.", latex: "x + t^2y = 2ct \\iff x + 4y = 8" },
        { text: "Intercepts 8 and 2; the area is $\\frac12 \\cdot 8 \\cdot 2 = 8 = 2c^2$, as promised." },
      ],
      answer: "$x + 4y = 8$, and the triangle has area $8$.",
    },
    { type: "heading", text: "Three properties worth knowing" },
    {
      type: "callout",
      variant: "info",
      title: "Meeting points, intercepts and focal perpendiculars",
      content:
        "1. **Tangents at $\\theta$ and $\\phi$** on the ellipse meet at $\\left(\\dfrac{a\\cos\\frac{\\theta + \\phi}{2}}{\\cos\\frac{\\theta - \\phi}{2}}, \\dfrac{b\\sin\\frac{\\theta + \\phi}{2}}{\\cos\\frac{\\theta - \\phi}{2}}\\right)$. On $xy = c^2$ the tangents at $t_1, t_2$ meet at $\\left(\\dfrac{2ct_1t_2}{t_1 + t_2}, \\dfrac{2c}{t_1 + t_2}\\right)$.\n2. **Intercepts.** The tangent at $\\theta$ cuts the axes at $\\frac{a}{\\cos\\theta}$ and $\\frac{b}{\\sin\\theta}$. The intercepted length satisfies $L^2 = a^2\\sec^2\\theta + b^2\\csc^2\\theta = a^2 + b^2 + a^2\\tan^2\\theta + b^2\\cot^2\\theta \\ge (a + b)^2$ by AM–GM, so the shortest intercept is $a + b$.\n3. **Focal perpendiculars.** For $y = mx + c$ with $c^2 = a^2m^2 + b^2$, the perpendiculars from $(\\pm ae, 0)$ have product $\\frac{\\lvert c^2 - a^2e^2m^2\\rvert}{1 + m^2} = \\frac{b^2(1 + m^2)}{1 + m^2} = b^2$. The same product $b^2$ holds for the hyperbola.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "The reflective property",
      content:
        "The tangent at $P$ on an ellipse makes equal angles with $SP$ and $S'P$, so the **normal bisects the angle $SPS'$**: a ray from one focus reflects off the ellipse into the other focus (whispering galleries, kidney-stone lithotripters). For the hyperbola the **tangent** bisects the angle $SPS'$: a ray aimed at one focus reflects towards the other.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "con5-2-q1",
      variant: "concept",
      question: "The tangent to $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$ at the point $(x_1, y_1)$ on it is",
      options: [
        { text: "$\\frac{xx_1}{a^2} + \\frac{yy_1}{b^2} = 1$", correct: true, feedback: "The $T = 0$ rule: $x^2 \\to xx_1$, $y^2 \\to yy_1$." },
        { text: "$\\frac{x}{x_1} + \\frac{y}{y_1} = 1$", feedback: "That line has intercepts $x_1$ and $y_1$; it is not even through $(x_1, y_1)$ unless $\\frac{x_1}{x_1} + \\frac{y_1}{y_1} = 2 = 1$." },
        { text: "$\\frac{xx_1}{a^2} + \\frac{yy_1}{b^2} = 0$", feedback: "This passes through the origin, not through $(x_1, y_1)$." },
        { text: "$\\frac{x_1x}{b^2} + \\frac{y_1y}{a^2} = 1$", feedback: "The denominators stay with their own variables." },
      ],
      hint: "Use $T = 0$: replace $x^2$ by $xx_1$ and $y^2$ by $yy_1$.",
    },
    {
      type: "numeric",
      id: "con5-2-q2",
      variant: "practice",
      question: "The tangent to $\\frac{x^2}{8} + \\frac{y^2}{2} = 1$ at $(2, 1)$ meets the $x$-axis at $(p, 0)$. Find $p$.",
      answer: 4,
      hint: "Write $T = 0$ at $(2, 1)$ and put $y = 0$.",
      solution: "$\\frac{2x}{8} + \\frac{y}{2} = 1$; at $y = 0$, $x = 4$. In general the tangent at $(x_1, y_1)$ meets the major axis at $\\frac{a^2}{x_1}$.",
      commonMistakes: [{ answer: 2, feedback: "That is the $x$-coordinate of the point of contact. Put $y = 0$ in the tangent." }],
    },
    {
      type: "quiz",
      id: "con5-2-q3",
      variant: "practice",
      question: "The tangent to $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$ at the point with eccentric angle $\\frac{\\pi}{4}$ is",
      options: [
        { text: "$\\frac{x}{a} + \\frac{y}{b} = \\sqrt2$", correct: true, feedback: "$\\frac xa\\cos\\frac\\pi4 + \\frac yb\\sin\\frac\\pi4 = 1$; multiply by $\\sqrt2$." },
        { text: "$\\frac{x}{a} + \\frac{y}{b} = 1$", feedback: "That is the chord joining the vertices $(a, 0)$ and $(0, b)$, not a tangent." },
        { text: "$x + y = \\sqrt{a^2 + b^2}$", feedback: "That is a tangent of slope $-1$, which touches at a different point unless $a = b$." },
        { text: "$\\frac{x}{a} - \\frac{y}{b} = \\sqrt2$", feedback: "Both terms have $+$ signs for the ellipse at $\\theta = \\frac\\pi4$." },
      ],
      hint: "Parametric tangent: $\\frac xa\\cos\\theta + \\frac yb\\sin\\theta = 1$.",
    },
    {
      type: "numeric",
      id: "con5-2-q4",
      variant: "practice",
      question: "The tangent to $xy = 9$ at the point $(9, 1)$ forms a triangle with the coordinate axes. Find its area.",
      answer: 18,
      hint: "Here $c = 3$ and $t = 3$. The area is the same for every tangent of $xy = c^2$.",
      solution: "The tangent is $x + 9y = 18$, with intercepts $18$ and $2$. Area $= \\frac12 \\cdot 18 \\cdot 2 = 18 = 2c^2$.",
      commonMistakes: [{ answer: 9, feedback: "The area is $2c^2 = 18$, not $c^2$. Compute the intercepts: 18 and 2." }],
    },
    {
      type: "numeric",
      id: "con5-2-q5",
      variant: "practice",
      question: "Tangents to $\\frac{x^2}{16} + \\frac{y^2}{9} = 1$ are drawn at the points with eccentric angles $\\frac\\pi3$ and $-\\frac\\pi3$. Find the $x$-coordinate of the point where they meet.",
      answer: 8,
      hint: "Use the meeting-point formula, or note by symmetry that the tangents meet on the $x$-axis and put $y = 0$ in one tangent.",
      solution: "The tangent at $\\frac\\pi3$ is $\\frac{x}{4} \\cdot \\frac12 + \\frac{y}{3} \\cdot \\frac{\\sqrt3}{2} = 1$. At $y = 0$, $x = 8$. The formula gives $\\frac{a\\cos 0}{\\cos\\frac\\pi3} = \\frac{4}{1/2} = 8$.",
      commonMistakes: [{ answer: 4, feedback: "That is the vertex. The meeting point is outside the ellipse, at $\\frac{a}{\\cos\\frac{\\pi}{3}}$." }],
    },
    {
      type: "numeric",
      id: "con5-2-q6",
      variant: "practice",
      question: "A tangent to $\\frac{x^2}{16} + \\frac{y^2}{9} = 1$ meets the axes at $A$ and $B$. Find the least possible length of $AB$.",
      answer: 7,
      hint: "$AB^2 = a^2\\sec^2\\theta + b^2\\csc^2\\theta$. Expand and use AM–GM on the tan and cot terms.",
      solution: "$AB^2 = 16 + 9 + 16\\tan^2\\theta + 9\\cot^2\\theta \\ge 25 + 2\\sqrt{144} = 49$, with equality when $\\tan^2\\theta = \\frac34$. So $AB_{\\min} = a + b = 7$.",
      commonMistakes: [{ answer: 5, feedback: "That is $\\sqrt{a^2 + b^2}$, ignoring the $16\\tan^2\\theta + 9\\cot^2\\theta \\ge 24$ part." }],
    },
    {
      type: "quiz",
      id: "con5-2-q7",
      variant: "practice",
      multiple: true,
      question: "Tangents are drawn from $(3, 2)$ to $\\frac{x^2}{9} + \\frac{y^2}{4} = 1$. Select all true statements.",
      options: [
        { text: "One tangent is $y = 2$", correct: true, feedback: "It touches at the vertex $(0, 2)$." },
        { text: "One tangent is $x = 3$", correct: true, feedback: "It touches at the vertex $(3, 0)$; the slope method misses it because its slope is infinite." },
        { text: "The two tangents are perpendicular", correct: true, feedback: "Horizontal and vertical. Consistent with $3^2 + 2^2 = 13 = a^2 + b^2$: the point lies on the director circle." },
        { text: "One tangent is $y = x - 1$", feedback: "For slope 1, $c^2$ must be $9 + 4 = 13$, but here $c^2 = 1$." },
      ],
      hint: "Set up $(h^2 - a^2)m^2 - 2hkm + (k^2 - b^2) = 0$. What does a vanishing $m^2$ coefficient mean?",
    },
    {
      type: "numeric",
      id: "con5-2-q8",
      variant: "practice",
      question: "Find the product of the perpendicular distances from the two foci of $\\frac{x^2}{25} + \\frac{y^2}{16} = 1$ to any of its tangents.",
      answer: 16,
      hint: "The product is the same for every tangent: test it on the tangent $y = 4$.",
      solution: "The product is $b^2 = 16$. Check with the tangent $y = 4$: both foci $(\\pm 3, 0)$ are at distance 4 from it, and $4 \\cdot 4 = 16$.",
      commonMistakes: [{ answer: 25, feedback: "It is $b^2$, not $a^2$. Test with the tangent $y = b$." }],
    },
    {
      type: "quiz",
      id: "con5-2-q9",
      variant: "practice",
      question: "The tangent to $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$ at $(a\\sec\\theta, b\\tan\\theta)$ is",
      options: [
        { text: "$\\frac{x}{a}\\sec\\theta - \\frac{y}{b}\\tan\\theta = 1$", correct: true, feedback: "$T = 0$ with $x_1 = a\\sec\\theta$, $y_1 = b\\tan\\theta$." },
        { text: "$\\frac{x}{a}\\cos\\theta - \\frac{y}{b}\\sin\\theta = 1$", feedback: "That mixes in the ellipse's parameters. Substitute $(a\\sec\\theta, b\\tan\\theta)$ into $T = 0$." },
        { text: "$\\frac{x}{a}\\sec\\theta + \\frac{y}{b}\\tan\\theta = 1$", feedback: "The hyperbola's $T$ keeps the minus sign." },
        { text: "$\\frac{x}{a}\\tan\\theta - \\frac{y}{b}\\sec\\theta = 1$", feedback: "$\\sec\\theta$ belongs with $x$, since $x_1 = a\\sec\\theta$." },
      ],
      hint: "Substitute the point into $\\frac{xx_1}{a^2} - \\frac{yy_1}{b^2} = 1$.",
    },
    { type: "heading", text: "JEE-style questions" },
    {
      type: "numeric",
      id: "con5-2-q10",
      variant: "practice",
      question: "Find the area of the quadrilateral formed by the tangents at the ends of the latera recta of $\\frac{x^2}{4} + \\frac{y^2}{3} = 1$.",
      answer: 16,
      hint: "Find $e$, then the tangent at $\\left(ae, \\frac{b^2}{a}\\right)$ and its intercepts.",
      solution: "$e = \\frac12$, $ae = 1$, LR end $\\left(1, \\frac32\\right)$. Tangent: $\\frac{x}{4} + \\frac{y}{2} = 1$, intercepts 4 and 2. The rhombus has diagonals 8 and 4, area $\\frac12 \\cdot 8 \\cdot 4 = 16$ (check: $\\frac{2a^2}{e} = 16$).",
      commonMistakes: [{ answer: 8, feedback: "The rhombus area is half the product of its diagonals, $\\frac12 \\cdot 8 \\cdot 4$. You may have used the semi-diagonals." }],
    },
    {
      type: "quiz",
      id: "con5-2-q11",
      variant: "practice",
      multiple: true,
      question: "$P$ is a point on an ellipse with foci $S$, $S'$, and on a hyperbola with foci $S$, $S'$ (the curves differ). Select all correct statements about reflection.",
      options: [
        { text: "On the ellipse, the normal at $P$ bisects angle $SPS'$", correct: true, feedback: "The tangent makes equal angles with $SP$ and $S'P$, so the normal bisects the angle between them." },
        { text: "On the ellipse, a ray from $S$ reflects through $S'$", correct: true, feedback: "That is the whispering-gallery effect." },
        { text: "On the hyperbola, the tangent at $P$ bisects angle $SPS'$", correct: true, feedback: "For the hyperbola the roles swap: the tangent is the internal bisector." },
        { text: "On the ellipse, the tangent at $P$ bisects angle $SPS'$", feedback: "For the ellipse the tangent bisects the **external** angle; the normal is the internal bisector." },
      ],
      hint: "Ellipse: normal is the internal bisector. Hyperbola: tangent is the internal bisector.",
    },
    {
      type: "numeric",
      id: "con5-2-q12",
      variant: "practice",
      question: "Two tangents are drawn from $(2, 3)$ to $\\frac{x^2}{9} + \\frac{y^2}{4} = 1$. Find the product of their slopes.",
      answer: -1,
      hint: "The slopes are the roots of $(h^2 - a^2)m^2 - 2hkm + (k^2 - b^2) = 0$.",
      solution: "$(4 - 9)m^2 - 12m + (9 - 4) = 0$, i.e. $-5m^2 - 12m + 5 = 0$. Product of roots $= \\frac{5}{-5} = -1$: the tangents are perpendicular, because $2^2 + 3^2 = 13 = a^2 + b^2$.",
      commonMistakes: [{ answer: 1, feedback: "Product of roots is $\\frac{c}{a} = \\frac{5}{-5}$. Watch the sign of the leading coefficient $h^2 - a^2 = -5$." }],
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "normals-to-ellipse-and-hyperbola",
  title: "5.3 · Normals",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "On a circle every normal is a radius, so every normal passes through the centre. Squash the circle into an ellipse and that breaks: the normals now miss the centre (except at the four vertices) and instead cross the major axis somewhere between the foci. The normal is the line through $P$ perpendicular to the tangent, and once the tangent is known its equation is one step away.",
    },
    { type: "heading", text: "The normal at a point" },
    {
      type: "text",
      content:
        "The tangent $\\frac{xx_1}{a^2} + \\frac{yy_1}{b^2} = 1$ has normal vector $\\left(\\frac{x_1}{a^2}, \\frac{y_1}{b^2}\\right)$, so the normal at $P$ runs in that direction. In symmetric form, then clear fractions using $x_1, y_1 \\ne 0$:",
    },
    {
      type: "math",
      latex:
        "\\frac{x - x_1}{x_1/a^2} = \\frac{y - y_1}{y_1/b^2} \\iff \\frac{a^2x}{x_1} - a^2 = \\frac{b^2y}{y_1} - b^2 \\iff \\frac{a^2x}{x_1} - \\frac{b^2y}{y_1} = a^2 - b^2",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Normals in point and parametric form",
      content:
        "- Ellipse at $(x_1, y_1)$: $\\dfrac{a^2x}{x_1} - \\dfrac{b^2y}{y_1} = a^2 - b^2$. At $(a\\cos\\theta, b\\sin\\theta)$: $ax\\sec\\theta - by\\csc\\theta = a^2 - b^2$.\n- Hyperbola at $(x_1, y_1)$: $\\dfrac{a^2x}{x_1} + \\dfrac{b^2y}{y_1} = a^2 + b^2$. At $(a\\sec\\theta, b\\tan\\theta)$: $ax\\cos\\theta + by\\cot\\theta = a^2 + b^2$.\n- $xy = c^2$ at $\\left(ct, \\frac ct\\right)$: $xt^3 - yt = ct^4 - c$.\n\nAt a vertex one of $x_1, y_1$ is zero; there the normal is simply the axis through that vertex.",
    },
    {
      type: "text",
      content:
        "For $xy = c^2$ the tangent slope at $t$ is $-\\frac{1}{t^2}$, so the normal slope is $t^2$: $y - \\frac ct = t^2(x - ct)$, which multiplies out to $xt^3 - yt = ct^4 - c$. Substituting $\\left(ct', \\frac{c}{t'}\\right)$ shows that the normal meets the curve again where $t' = -\\frac{1}{t^3}$, on the other branch.",
    },
    {
      type: "interactive",
      config: {
        component: "con-tangent-lab",
        conic: "ellipse",
        show: ["tangent", "normal", "focus", "focal-radii"],
        caption:
          "Drag $\\theta$. The normal (perpendicular to the tangent) passes through the centre only at the four vertices. It always bisects the angle $SPS'$ between the focal radii, and it crosses the major axis between the foci.",
      },
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the normal passes through the centre\"",
      content:
        "That is a circle fact. For an ellipse the normal at $(x_1, y_1)$ meets the major axis at $G = \\left(\\frac{a^2 - b^2}{a^2}x_1, 0\\right) = (e^2x_1, 0)$, which is the centre only when $x_1 = 0$. For a hyperbola it meets the transverse axis at $(e^2x_1, 0)$, beyond the foot of $P$ on that axis.",
    },
    { type: "heading", text: "Worked examples" },
    {
      type: "worked-example",
      id: "con5-3-we1",
      title: "Worked example 1: normal to an ellipse",
      problem: "Find the normal to $\\frac{x^2}{16} + \\frac{y^2}{9} = 1$ at $\\left(2, \\frac{3\\sqrt3}{2}\\right)$.",
      steps: [
        { text: "Use $\\frac{a^2x}{x_1} - \\frac{b^2y}{y_1} = a^2 - b^2$ with $a^2 = 16$, $b^2 = 9$.", latex: "\\frac{16x}{2} - \\frac{9y}{3\\sqrt3/2} = 7" },
        { text: "Simplify $\\frac{9}{3\\sqrt3/2} = \\frac{6}{\\sqrt3} = 2\\sqrt3$.", latex: "8x - 2\\sqrt3\\,y = 7" },
        { text: "Check: at $P$, $16 - 2\\sqrt3 \\cdot \\frac{3\\sqrt3}{2} = 16 - 9 = 7$. *Why this step:* a normal must pass through its own point, so this catches arithmetic slips. Its slope $\\frac{4}{\\sqrt3}$ times the tangent slope $-\\frac{\\sqrt3}{4}$ (from 5.2) is $-1$." },
      ],
      answer: "$8x - 2\\sqrt3\\,y = 7$.",
    },
    {
      type: "worked-example",
      id: "con5-3-we2",
      title: "Worked example 2: normal to a hyperbola",
      problem: "Find the normal to $\\frac{x^2}{9} - \\frac{y^2}{16} = 1$ at $(6, 4\\sqrt3)$.",
      steps: [
        { text: "Use $\\frac{a^2x}{x_1} + \\frac{b^2y}{y_1} = a^2 + b^2$.", latex: "\\frac{9x}{6} + \\frac{16y}{4\\sqrt3} = 25 \\iff \\frac{3x}{2} + \\frac{4y}{\\sqrt3} = 25" },
        { text: "Multiply by $2\\sqrt3$.", latex: "3\\sqrt3\\,x + 8y = 50\\sqrt3" },
        { text: "Check at $P$: $18\\sqrt3 + 32\\sqrt3 = 50\\sqrt3$." },
      ],
      answer: "$3\\sqrt3\\,x + 8y = 50\\sqrt3$.",
    },
    {
      type: "worked-example",
      id: "con5-3-we3",
      title: "Worked example 3: where a normal to xy = c² meets the curve again",
      problem: "The normal to $xy = 4$ at $(4, 1)$ meets the curve again at $Q$. Find $Q$.",
      steps: [
        { text: "$c = 2$ and $(4, 1) = (2 \\cdot 2, \\frac22)$, so $t = 2$. The normal is $xt^3 - yt = ct^4 - c$.", latex: "8x - 2y = 30 \\iff 4x - y = 15" },
        { text: "The second meeting point has $t' = -\\frac{1}{t^3} = -\\frac18$. *Why this step:* substituting $(ct', \\frac{c}{t'})$ into the normal gives a quadratic in $t'$ with known root $t$, and the other root is $-\\frac{1}{t^3}$.", latex: "Q = \\left(ct', \\frac{c}{t'}\\right) = \\left(-\\frac14, -16\\right)" },
        { text: "Check: $4\\left(-\\frac14\\right) - (-16) = 15$, and $\\left(-\\frac14\\right)(-16) = 4$." },
      ],
      answer: "$Q = \\left(-\\frac14, -16\\right)$, on the other branch.",
    },
    { type: "heading", text: "Normals of a given slope" },
    {
      type: "text",
      content:
        "The normal at $\\theta$ on the ellipse has slope $\\frac{a\\sin\\theta}{b\\cos\\theta}$. Set this equal to $m$: then $\\tan\\theta = \\frac{bm}{a}$, so $\\cos\\theta = \\pm\\frac{a}{\\sqrt{a^2 + b^2m^2}}$ and $\\sin\\theta = \\pm\\frac{bm}{\\sqrt{a^2 + b^2m^2}}$ (same sign). The normal $y = mx - ma\\cos\\theta + b\\sin\\theta$ becomes:",
    },
    {
      type: "math",
      latex:
        "\\text{ellipse: } y = mx \\mp \\frac{(a^2 - b^2)\\,m}{\\sqrt{a^2 + b^2m^2}}, \\qquad \\text{hyperbola: } y = mx \\mp \\frac{(a^2 + b^2)\\,m}{\\sqrt{a^2 - b^2m^2}}",
    },
    {
      type: "text",
      content:
        "Compare with the parabola's $y = mx - 2am - am^3$: there each slope gives one normal, here two (one from each side). For the hyperbola a normal of slope $m$ needs $\\lvert m\\rvert < \\frac ab$.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Four normals from a point",
      content:
        "The normal at $\\theta$ passes through $(h, k)$ when $ah\\sec\\theta - bk\\csc\\theta = a^2 - b^2$. Writing $\\sin\\theta$ and $\\cos\\theta$ in terms of $\\tan\\frac\\theta2$ turns this into a **quartic**, so at most **four** normals can be drawn to an ellipse from a point. Their feet are called **co-normal points** (just as the parabola's cubic gave at most three). A known JEE fact: the four eccentric angles add up to an odd multiple of $\\pi$.",
    },
    {
      type: "worked-example",
      id: "con5-3-we4",
      title: "Worked example 4: a normal through an end of the minor axis",
      problem: "The normal at an end of a latus rectum of $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$ passes through an end of the minor axis. Show that $e^4 + e^2 = 1$.",
      steps: [
        { text: "Take the end $L = \\left(ae, \\frac{b^2}{a}\\right)$. Its normal: $\\frac{a^2x}{ae} - \\frac{b^2y}{b^2/a} = a^2 - b^2 = a^2e^2$.", latex: "\\frac{ax}{e} - ay = a^2e^2" },
        { text: "Put in $(0, -b)$ (the end below the axis: $(0, b)$ would need $-ab = a^2e^2$, impossible).", latex: "ab = a^2e^2 \\Rightarrow b = ae^2 \\Rightarrow b^2 = a^2e^4" },
        { text: "But $b^2 = a^2(1 - e^2)$. *Why this step:* every ellipse question ends by trading $b$ for $a$ and $e$.", latex: "a^2e^4 = a^2(1 - e^2) \\iff e^4 + e^2 = 1 \\iff e^2 = \\frac{\\sqrt5 - 1}{2}" },
      ],
      answer: "$e^4 + e^2 = 1$, so $e^2 = \\frac{\\sqrt5 - 1}{2} \\approx 0.618$.",
    },
    {
      type: "worked-example",
      id: "con5-3-we5",
      title: "Worked example 5: how far can a normal be from the centre?",
      problem: "Find the greatest distance of the centre from a normal to $\\frac{x^2}{25} + \\frac{y^2}{9} = 1$.",
      steps: [
        { text: "The normal at $\\theta$ is $ax\\sec\\theta - by\\csc\\theta = a^2 - b^2$. Its distance from the origin:", latex: "d = \\frac{a^2 - b^2}{\\sqrt{a^2\\sec^2\\theta + b^2\\csc^2\\theta}}" },
        { text: "The denominator is the intercept length from 5.2, at least $a + b$. *Why this step:* $a^2\\sec^2\\theta + b^2\\csc^2\\theta = a^2 + b^2 + a^2\\tan^2\\theta + b^2\\cot^2\\theta \\ge (a + b)^2$.", latex: "d \\le \\frac{a^2 - b^2}{a + b} = a - b = 5 - 3 = 2" },
      ],
      answer: "The greatest distance is $a - b = 2$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "con5-3-q1",
      variant: "concept",
      question: "The normal to $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$ at $(x_1, y_1)$, with $x_1y_1 \\ne 0$, is",
      options: [
        { text: "$\\frac{a^2x}{x_1} - \\frac{b^2y}{y_1} = a^2 - b^2$", correct: true, feedback: "From the direction $\\left(\\frac{x_1}{a^2}, \\frac{y_1}{b^2}\\right)$ of the tangent's normal vector." },
        { text: "$\\frac{a^2x}{x_1} + \\frac{b^2y}{y_1} = a^2 + b^2$", feedback: "That is the hyperbola's normal." },
        { text: "$\\frac{xx_1}{a^2} - \\frac{yy_1}{b^2} = 0$", feedback: "This passes through the centre. Ellipse normals generally do not." },
        { text: "$\\frac{x_1x}{a^2} + \\frac{y_1y}{b^2} = 1$", feedback: "That is the tangent." },
      ],
      hint: "The normal is perpendicular to $\\frac{xx_1}{a^2} + \\frac{yy_1}{b^2} = 1$ and passes through $(x_1, y_1)$.",
    },
    {
      type: "numeric",
      id: "con5-3-q2",
      variant: "practice",
      question: "The normal to $\\frac{x^2}{25} + \\frac{y^2}{9} = 1$ at $\\left(3, \\frac{12}{5}\\right)$ meets the $x$-axis at $(g, 0)$. Find $g$.",
      answer: 1.92,
      tolerance: 0.001,
      hint: "Put $y = 0$ in $\\frac{a^2x}{x_1} - \\frac{b^2y}{y_1} = a^2 - b^2$, or use $g = e^2x_1$.",
      solution: "$\\frac{25x}{3} = 16$, so $g = \\frac{48}{25} = 1.92$. Check: $e^2 = \\frac{16}{25}$ and $e^2x_1 = \\frac{48}{25}$.",
      commonMistakes: [{ answer: 3, feedback: "The normal does not drop vertically; it meets the axis at $e^2x_1$, closer to the centre." }],
    },
    {
      type: "quiz",
      id: "con5-3-q3",
      variant: "practice",
      question: "The normal to $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$ at $(x_1, y_1)$ is",
      options: [
        { text: "$\\frac{a^2x}{x_1} + \\frac{b^2y}{y_1} = a^2 + b^2$", correct: true, feedback: "Normal direction $\\left(\\frac{x_1}{a^2}, -\\frac{y_1}{b^2}\\right)$, then clear fractions." },
        { text: "$\\frac{a^2x}{x_1} - \\frac{b^2y}{y_1} = a^2 - b^2$", feedback: "That is the ellipse's normal. The hyperbola's minus sign flips both signs." },
        { text: "$\\frac{a^2x}{x_1} + \\frac{b^2y}{y_1} = a^2 - b^2$", feedback: "The right side must be $a^2 + b^2 = a^2e^2$: the hyperbola's sign flip turns the ellipse's $a^2 - b^2$ into $a^2 + b^2$." },
        { text: "$\\frac{xx_1}{a^2} - \\frac{yy_1}{b^2} = 1$", feedback: "That is the tangent." },
      ],
      hint: "Redo the ellipse derivation with $b^2$ replaced by $-b^2$.",
    },
    {
      type: "numeric",
      id: "con5-3-q4",
      variant: "practice",
      question: "The normal to $xy = 1$ at $\\left(2, \\frac12\\right)$ meets the curve again at $Q$. Find the $y$-coordinate of $Q$.",
      answer: -8,
      hint: "Here $c = 1$, $t = 2$. The second point has $t' = -\\frac{1}{t^3}$.",
      solution: "$t' = -\\frac18$, so $Q = \\left(-\\frac18, -8\\right)$. Check on the normal $8x - 2y = 15$: $-1 + 16 = 15$.",
      commonMistakes: [{ answer: 8, feedback: "The normal crosses to the other branch, where both coordinates are negative." }],
    },
    {
      type: "quiz",
      id: "con5-3-q5",
      variant: "practice",
      multiple: true,
      question: "For an ellipse that is not a circle, select all true statements about normals.",
      options: [
        { text: "The normal at an end of the major axis is the major axis", correct: true, feedback: "The tangent there is vertical, so the normal is the horizontal axis." },
        { text: "The normal at an end of the minor axis is the minor axis", correct: true, feedback: "The tangent is horizontal there." },
        { text: "The normal at $P$ bisects the angle $SPS'$", correct: true, feedback: "The reflective property: the normal is the internal bisector of the focal radii." },
        { text: "Every normal passes through the centre", feedback: "Only the normals at the four vertices do; in general the normal meets the major axis at $(e^2x_1, 0)$." },
      ],
      hint: "Check each statement at the vertices first, then at a general point.",
    },
    {
      type: "numeric",
      id: "con5-3-q6",
      variant: "practice",
      question: "The normal at an end of a latus rectum of an ellipse passes through an end of its minor axis. Find $e^2$, correct to 3 decimal places.",
      answer: 0.618,
      tolerance: 0.001,
      hint: "The condition reduces to $e^4 + e^2 = 1$, a quadratic in $e^2$.",
      solution: "$e^2 = \\frac{-1 + \\sqrt5}{2} \\approx 0.618$ (the negative root is rejected).",
      commonMistakes: [{ answer: 0.786, tolerance: 0.001, feedback: "That is $e$. The question asks for $e^2$." }],
    },
    {
      type: "numeric",
      id: "con5-3-q7",
      variant: "practice",
      question: "Find the greatest possible distance of the centre of $\\frac{x^2}{36} + \\frac{y^2}{16} = 1$ from one of its normals.",
      answer: 2,
      hint: "The maximum is $a - b$.",
      solution: "$d = \\frac{a^2 - b^2}{\\sqrt{a^2\\sec^2\\theta + b^2\\csc^2\\theta}} \\le \\frac{a^2 - b^2}{a + b} = a - b = 6 - 4 = 2$.",
      commonMistakes: [{ answer: 20, feedback: "$a^2 - b^2 = 20$ is the numerator. Divide by the least value of the denominator, $a + b = 10$." }],
    },
    {
      type: "quiz",
      id: "con5-3-q8",
      variant: "practice",
      question: "What is the greatest number of normals that can be drawn to an ellipse from a single point of its plane?",
      options: [
        { text: "4", correct: true, feedback: "The condition is a quartic in $\\tan\\frac\\theta2$." },
        { text: "3", feedback: "Three is the maximum for a parabola, whose condition is a cubic in $m$." },
        { text: "2", feedback: "From many points only two normals exist, but some points send four." },
        { text: "Infinitely many", feedback: "That happens for a circle from its centre, not for an ellipse with $a \\ne b$." },
      ],
      hint: "What is the degree of the equation that the eccentric angle of the foot must satisfy?",
    },
    { type: "heading", text: "JEE-style questions" },
    {
      type: "numeric",
      id: "con5-3-q9",
      variant: "practice",
      question: "The normal to $\\frac{x^2}{4} - \\frac{y^2}{12} = 1$ at $(4, 6)$ meets the $x$-axis at $(g, 0)$. Find $g$.",
      answer: 16,
      hint: "Hyperbola normal: $\\frac{a^2x}{x_1} + \\frac{b^2y}{y_1} = a^2 + b^2$. Put $y = 0$.",
      solution: "The normal is $x + 2y = 16$, so $g = 16$. Check: $e^2 = 1 + \\frac{12}{4} = 4$ and $e^2x_1 = 16$.",
      commonMistakes: [{ answer: 4, feedback: "That is $x_1$. The normal meets the axis at $e^2x_1$." }],
    },
    {
      type: "quiz",
      id: "con5-3-q10",
      variant: "practice",
      question: "The normal at $P$ on an ellipse meets the major axis at $G$, and $S$ is a focus. Then $SG$ equals",
      options: [
        { text: "$e \\cdot SP$", correct: true, feedback: "$G = (e^2x_1, 0)$, so $SG = \\lvert ae - e^2x_1\\rvert = e\\lvert a - ex_1\\rvert = e \\cdot SP$." },
        { text: "$SP$", feedback: "That would make triangle $SPG$ isosceles, which is the parabola's property ($SG = SP$ when $e = 1$)." },
        { text: "$\\frac{SP}{e}$", feedback: "$G$ is closer to $S$ than $P$ is, since $e < 1$." },
        { text: "$e^2 \\cdot SP$", feedback: "Factor $e$ once: $ae - e^2x_1 = e(a - ex_1)$." },
      ],
      hint: "Use $G = (e^2x_1, 0)$, $S = (ae, 0)$ and the focal distance $SP = a - ex_1$.",
    },
    {
      type: "quiz",
      id: "con5-3-q11",
      variant: "practice",
      multiple: true,
      question: "Select all correct statements about $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$.",
      options: [
        { text: "The normal at $\\theta$ is $ax\\sec\\theta - by\\csc\\theta = a^2 - b^2$", correct: true, feedback: "Substitute $(a\\cos\\theta, b\\sin\\theta)$ into the point form." },
        { text: "The normals of slope $m$ are $y = mx \\mp \\frac{(a^2 - b^2)m}{\\sqrt{a^2 + b^2m^2}}$", correct: true, feedback: "From $\\tan\\theta = \\frac{bm}{a}$." },
        { text: "If $a = b$, every normal passes through the centre", correct: true, feedback: "Then $a^2 - b^2 = 0$ and the normal is $x\\sec\\theta - y\\csc\\theta = 0$, a line through the origin." },
        { text: "The normal at $(x_1, y_1)$ has slope $-\\frac{b^2x_1}{a^2y_1}$", feedback: "That is the tangent's slope. The normal's slope is $\\frac{a^2y_1}{b^2x_1}$." },
      ],
      hint: "Derive each from the point form of the normal.",
    },
    {
      type: "numeric",
      id: "con5-3-q12",
      variant: "practice",
      question: "$P$ moves on $\\frac{x^2}{16} + \\frac{y^2}{9} = 1$, never at a vertex, and the normal at $P$ meets the major axis at $G$. Then $G$ always lies strictly between $(-k, 0)$ and $(k, 0)$. Find the least such $k$.",
      answer: 1.75,
      tolerance: 0.001,
      hint: "$G = (e^2x_1, 0)$ and $\\lvert x_1\\rvert \\le a$.",
      solution: "$OG = e^2\\lvert x_1\\rvert \\le ae^2 = \\frac{a^2 - b^2}{a} = \\frac74 = 1.75$, approached as $P$ nears a vertex (at the vertex itself the normal is the whole axis). So normals from $(h, 0)$ other than the axis itself exist only for $\\lvert h\\rvert < \\frac74$.",
      commonMistakes: [{ answer: 2.65, tolerance: 0.01, feedback: "That is $ae = \\sqrt7$, the focus. $G$ never gets as far as the focus: $OG \\le ae^2$." }],
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "director-circle-and-chords",
  title: "5.4 · Director Circle, Chord of Contact and Midpoint Chords",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "Hold a carpenter's set square so that its two edges always touch an ellipse. As you slide it around, the corner traces a perfect **circle**. For the circle $x^2 + y^2 = a^2$ that circle was $x^2 + y^2 = 2a^2$, the director circle. This lesson finds it for the ellipse and the hyperbola, and then reuses the circle's chord equations unchanged: $T = 0$, $T = S_1$ and $SS_1 = T^2$.",
    },
    { type: "heading", text: "The director circle" },
    {
      type: "text",
      content:
        "A tangent of slope $m$ is $y = mx + c$ with $c^2 = a^2m^2 + b^2$. It passes through $(h, k)$ when $(k - mh)^2 = a^2m^2 + b^2$:",
    },
    {
      type: "math",
      latex: "(h^2 - a^2)\\,m^2 - 2hk\\,m + (k^2 - b^2) = 0",
    },
    {
      type: "text",
      content:
        "Its two roots are the slopes of the two tangents from $(h, k)$. The tangents are perpendicular when the product of the roots is $-1$: $\\frac{k^2 - b^2}{h^2 - a^2} = -1$, i.e. $h^2 + k^2 = a^2 + b^2$. (When $h^2 = a^2$ one tangent is vertical, and the same circle still works, as the example from $(3, 2)$ in 5.2 showed.)",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Director circles",
      content:
        "The locus of points from which two perpendicular tangents can be drawn:\n- ellipse: $x^2 + y^2 = a^2 + b^2$\n- hyperbola $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$: $x^2 + y^2 = a^2 - b^2$ (a real circle only when $a > b$; for $a \\le b$ no two tangents are perpendicular)\n- parabola $y^2 = 4ax$: the directrix $x = -a$ (Chapter 2)\n- circle $x^2 + y^2 = a^2$: $x^2 + y^2 = 2a^2$",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the director circle is the auxiliary circle\"",
      content:
        "The **auxiliary circle** $x^2 + y^2 = a^2$ is drawn on the major axis as diameter: it is where the feet of perpendiculars from the foci to tangents lie, and it defines the eccentric angle. The **director circle** $x^2 + y^2 = a^2 + b^2$ is bigger and lies entirely outside the ellipse: it is where perpendicular tangents meet. They coincide for no ellipse at all.",
    },
    {
      type: "worked-example",
      id: "con5-4-we1",
      title: "Worked example 1: a point on the director circle",
      problem: "Find the director circle of $\\frac{x^2}{16} + \\frac{y^2}{9} = 1$ and check that the tangents from $(3, 4)$ are perpendicular.",
      steps: [
        { text: "Director circle: $x^2 + y^2 = 16 + 9 = 25$. The point $(3, 4)$ is on it." },
        { text: "Slope equation with $h = 3$, $k = 4$. *Why this step:* the product of its roots is the product of the tangent slopes.", latex: "(9 - 16)m^2 - 24m + (16 - 9) = 0 \\iff -7m^2 - 24m + 7 = 0" },
        { text: "Product of roots $= \\frac{7}{-7} = -1$." },
      ],
      answer: "$x^2 + y^2 = 25$; the tangents from $(3, 4)$ have slopes with product $-1$, so they are perpendicular.",
    },
    {
      type: "interactive",
      config: {
        component: "con-tangent-lab",
        conic: "ellipse",
        b: { min: 1, max: 5, step: 0.5, initial: 3 },
        show: ["director-circle", "chord-of-contact", "pair-of-tangents"],
        q: [3, 4],
        window: { xmin: -8, xmax: 8, ymin: -6, ymax: 6 },
        caption:
          "With $a = 4$, $b = 3$ the director circle is $x^2 + y^2 = 25$ and $Q = (3, 4)$ sits on it, so the two tangents from $Q$ are perpendicular. Drag $Q$ off the circle and the right angle is lost. The chord of contact joins the two points of tangency: it is $T = 0$ for $Q$.",
      },
    },
    { type: "heading", text: "Chord of contact, midpoint chords and pairs of tangents" },
    {
      type: "text",
      content:
        "The three circle results transfer word for word, because their proofs only used the $T = 0$ tangent equation:\n\n- **Chord of contact** from $(h, k)$: the tangents at $(x_1, y_1)$ and $(x_2, y_2)$ both pass through $(h, k)$, so both contact points satisfy $\\frac{xh}{a^2} + \\frac{yk}{b^2} = 1$. That line is the chord of contact, $T = 0$.\n- **Chord with midpoint $(h, k)$**: the chord-slope formula from 5.2 with $x_1 + x_2 = 2h$, $y_1 + y_2 = 2k$ gives slope $-\\frac{b^2h}{a^2k}$, and the line through $(h, k)$ with that slope is $T = S_1$.\n- **Pair of tangents** from $(h, k)$: $SS_1 = T^2$.",
    },
    {
      type: "math",
      latex:
        "T = S_1: \\quad \\frac{xh}{a^2} + \\frac{yk}{b^2} = \\frac{h^2}{a^2} + \\frac{k^2}{b^2} \\qquad (\\text{flip the } y\\text{-signs for the hyperbola})",
    },
    {
      type: "worked-example",
      id: "con5-4-we2",
      title: "Worked example 2: chord of contact and pair of tangents",
      problem: "From $(4, 3)$ tangents are drawn to $\\frac{x^2}{16} + \\frac{y^2}{9} = 1$. Find the chord of contact and the joint equation of the tangents.",
      steps: [
        { text: "Chord of contact, $T = 0$.", latex: "\\frac{4x}{16} + \\frac{3y}{9} = 1 \\iff 3x + 4y = 12" },
        { text: "For $SS_1 = T^2$: $S_1 = 1 + 1 - 1 = 1$ and $T = \\frac{x}{4} + \\frac{y}{3} - 1$.", latex: "\\frac{x^2}{16} + \\frac{y^2}{9} - 1 = \\left(\\frac{x}{4} + \\frac{y}{3} - 1\\right)^2" },
        { text: "The square terms cancel. *Why this step:* when $S$ and $T^2$ share the $x^2$, $y^2$ terms, what is left is a product of two lines.", latex: "-1 = \\frac{xy}{6} - \\frac{x}{2} - \\frac{2y}{3} + 1 \\iff xy - 3x - 4y + 12 = 0 \\iff (x - 4)(y - 3) = 0" },
      ],
      answer: "Chord of contact $3x + 4y = 12$ (joining $(4, 0)$ and $(0, 3)$); tangents $x = 4$ and $y = 3$.",
    },
    {
      type: "worked-example",
      id: "con5-4-we3",
      title: "Worked example 3: chord with a given midpoint",
      problem: "Find the chord of $\\frac{x^2}{16} + \\frac{y^2}{9} = 1$ whose midpoint is $(2, 1)$.",
      steps: [
        { text: "$T = S_1$ at $(2, 1)$.", latex: "\\frac{2x}{16} + \\frac{y}{9} = \\frac{4}{16} + \\frac{1}{9} = \\frac{13}{36}" },
        { text: "Multiply by 72.", latex: "9x + 8y = 26" },
        { text: "Check: the slope $-\\frac98$ equals $-\\frac{b^2h}{a^2k} = -\\frac{18}{16}$, and $(2, 1)$ lies on the line. Since $(2, 1)$ is inside the ellipse, the chord certainly exists." },
      ],
      answer: "$9x + 8y = 26$.",
    },
    {
      type: "worked-example",
      id: "con5-4-we4",
      title: "Worked example 4: a midpoint chord of a hyperbola",
      problem: "Find the chord of $\\frac{x^2}{9} - \\frac{y^2}{4} = 1$ bisected at $(5, 2)$, and check that it really meets the curve.",
      steps: [
        { text: "$T = S_1$ for the hyperbola.", latex: "\\frac{5x}{9} - \\frac{2y}{4} = \\frac{25}{9} - 1 = \\frac{16}{9} \\iff 10x - 9y = 32" },
        { text: "Substitute $y = \\frac{10x - 32}{9}$ into the hyperbola and clear denominators. *Why this step:* for a hyperbola $T = S_1$ is only a candidate; it must cut the curve in two real points.", latex: "16x^2 - 160x + 337 = 0, \\qquad D = 25600 - 21568 = 4032 > 0" },
        { text: "Two real roots with sum $10$, so their midpoint has $x = 5$, as required." },
      ],
      answer: "$10x - 9y = 32$, a genuine chord.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Not every point is the midpoint of a chord of a hyperbola",
      content:
        "For $\\frac{x^2}{9} - \\frac{y^2}{4} = 1$ and the point $(1, 0)$, $T = S_1$ gives $\\frac{x}{9} = \\frac19$, the line $x = 1$, which never meets the hyperbola (on the curve $\\lvert x\\rvert \\ge 3$). So no chord has midpoint $(1, 0)$. For an ellipse, every interior point is the midpoint of a chord; for a hyperbola, always check that $T = S_1$ really cuts the curve.",
    },
    { type: "heading", text: "Diameters and conjugate diameters" },
    {
      type: "text",
      content:
        "Fix a slope $m$ and take all chords of the ellipse with that slope. Their midpoints $(h, k)$ satisfy $-\\frac{b^2h}{a^2k} = m$, so they lie on the line $y = -\\frac{b^2}{a^2m}x$ through the centre, called a **diameter**. Two diameters $y = m_1x$, $y = m_2x$ are **conjugate** when each bisects the chords parallel to the other: $m_1m_2 = -\\frac{b^2}{a^2}$. For the hyperbola the same argument gives $y = \\frac{b^2}{a^2m}x$ and $m_1m_2 = \\frac{b^2}{a^2}$. On a circle conjugate diameters are perpendicular ($m_1m_2 = -1$).",
    },
    {
      type: "worked-example",
      id: "con5-4-we5",
      title: "Worked example 5: a chord of contact that subtends a right angle",
      problem: "Find the locus of points $(h, k)$ whose chord of contact with respect to $\\frac{x^2}{16} + \\frac{y^2}{9} = 1$ subtends a right angle at the centre.",
      steps: [
        { text: "Homogenise the ellipse with the chord of contact $\\frac{hx}{16} + \\frac{ky}{9} = 1$: the result is the pair of lines joining the centre to the contact points. *Why this step:* this is the slc trick for the angle a chord subtends at the origin.", latex: "\\frac{x^2}{16} + \\frac{y^2}{9} = \\left(\\frac{hx}{16} + \\frac{ky}{9}\\right)^2" },
        { text: "A homogeneous pair is perpendicular when the coefficients of $x^2$ and $y^2$ add to zero.", latex: "\\frac{1}{16} - \\frac{h^2}{256} + \\frac19 - \\frac{k^2}{81} = 0 \\iff \\frac{h^2}{256} + \\frac{k^2}{81} = \\frac{25}{144}" },
        { text: "Check with $(4, 3)$: $\\frac{16}{256} + \\frac{9}{81} = \\frac{1}{16} + \\frac19 = \\frac{25}{144}$. Its chord of contact joins $(4, 0)$ and $(0, 3)$, which do subtend a right angle at $O$." },
      ],
      answer: "$\\frac{x^2}{256} + \\frac{y^2}{81} = \\frac{25}{144}$, an ellipse.",
    },
    {
      type: "interactive",
      config: {
        component: "con-tangent-lab",
        conic: "hyperbola",
        show: ["midpoint-chord", "asymptotes"],
        q: [4, 1],
        caption:
          "$Q$ is the midpoint of the chord $T = S_1$. Drag $Q$ onto the $x$-axis between the vertices, say to $(1, 0)$: the line $T = S_1$ becomes a vertical line that misses the hyperbola, so no chord has its midpoint there. Points between the branches off the axis, such as $(0, 1)$, can still be midpoints.",
      },
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "con5-4-q1",
      variant: "practice",
      question: "Find the radius of the director circle of $\\frac{x^2}{9} + \\frac{y^2}{7} = 1$.",
      answer: 4,
      hint: "Director circle: $x^2 + y^2 = a^2 + b^2$.",
      solution: "$a^2 + b^2 = 16$, so the radius is $4$.",
      commonMistakes: [
        { answer: 16, feedback: "That is the radius squared." },
        { answer: 1.41, tolerance: 0.01, feedback: "That is $\\sqrt{a^2 - b^2}$, the hyperbola's formula. For the ellipse add." },
      ],
    },
    {
      type: "quiz",
      id: "con5-4-q2",
      variant: "practice",
      question: "The director circle of $\\frac{x^2}{16} - \\frac{y^2}{9} = 1$ is",
      options: [
        { text: "$x^2 + y^2 = 7$", correct: true, feedback: "$a^2 - b^2 = 16 - 9 = 7$." },
        { text: "$x^2 + y^2 = 25$", feedback: "That uses the ellipse rule $a^2 + b^2$." },
        { text: "$x^2 + y^2 = 16$", feedback: "That is the auxiliary circle." },
        { text: "It does not exist", feedback: "It exists because $a > b$." },
      ],
      hint: "For the hyperbola it is $x^2 + y^2 = a^2 - b^2$.",
    },
    {
      type: "quiz",
      id: "con5-4-q3",
      variant: "concept",
      question: "From how many points can two perpendicular tangents be drawn to $\\frac{x^2}{9} - \\frac{y^2}{16} = 1$?",
      options: [
        { text: "From no point", correct: true, feedback: "The locus would be $x^2 + y^2 = 9 - 16 < 0$. Every tangent has $\\lvert m\\rvert > \\frac43$, and two such slopes cannot multiply to $-1$." },
        { text: "From every point of $x^2 + y^2 = 25$", feedback: "That uses $a^2 + b^2$, the ellipse rule." },
        { text: "From every point of $x^2 + y^2 = 7$", feedback: "$a^2 - b^2 = 9 - 16 = -7$, not $7$." },
        { text: "Only from the centre", feedback: "From the centre the only candidate lines are the asymptotes, which are not tangents." },
      ],
      hint: "Compute $a^2 - b^2$. Also: can two slopes with $\\lvert m\\rvert > \\frac43$ have product $-1$?",
    },
    {
      type: "numeric",
      id: "con5-4-q4",
      variant: "practice",
      question: "The chord of contact of tangents drawn from $(h, k)$ to $\\frac{x^2}{8} + \\frac{y^2}{2} = 1$ is $x + y = 2$. Find $h + k$.",
      answer: 5,
      hint: "Compare $\\frac{hx}{8} + \\frac{ky}{2} = 1$ with $\\frac x2 + \\frac y2 = 1$.",
      solution: "$\\frac h8 = \\frac12$ gives $h = 4$ and $\\frac k2 = \\frac12$ gives $k = 1$. So $h + k = 5$ (and $(4, 1)$ is indeed outside: $2 + \\frac12 - 1 > 0$).",
      commonMistakes: [{ answer: 2, feedback: "Match coefficients after writing both lines with right side 1: $\\frac{h}{8} = \\frac12$, not $h = 1$." }],
    },
    {
      type: "quiz",
      id: "con5-4-q5",
      variant: "practice",
      question: "The chord of $\\frac{x^2}{16} + \\frac{y^2}{9} = 1$ whose midpoint is $(1, 1)$ is",
      options: [
        { text: "$9x + 16y = 25$", correct: true, feedback: "$T = S_1$: $\\frac{x}{16} + \\frac{y}{9} = \\frac{1}{16} + \\frac19 = \\frac{25}{144}$." },
        { text: "$16x + 9y = 25$", feedback: "The coefficients come from $\\frac{1}{16}$ and $\\frac19$; clearing 144 gives $9x + 16y$." },
        { text: "$9x + 16y = 144$", feedback: "That is $T = 0$ (the chord of contact of $(1, 1)$, which does not even exist since the point is inside)." },
        { text: "$9x - 16y = -7$", feedback: "Check the slope: it should be $-\\frac{b^2h}{a^2k} = -\\frac{9}{16}$." },
      ],
      hint: "Use $T = S_1$.",
    },
    {
      type: "numeric",
      id: "con5-4-q6",
      variant: "practice",
      question: "Find the slope of the chord of $\\frac{x^2}{25} + \\frac{y^2}{16} = 1$ whose midpoint is $(2, -1)$.",
      answer: 1.28,
      tolerance: 0.001,
      hint: "Slope $= -\\frac{b^2h}{a^2k}$.",
      solution: "$-\\frac{16 \\cdot 2}{25 \\cdot (-1)} = \\frac{32}{25} = 1.28$.",
      commonMistakes: [{ answer: -1.28, tolerance: 0.001, feedback: "$k = -1$ is negative, which flips the sign of $-\\frac{b^2h}{a^2k}$." }],
    },
    {
      type: "quiz",
      id: "con5-4-q7",
      variant: "practice",
      multiple: true,
      question: "Tangents are drawn from $(0, 5)$ to $\\frac{x^2}{16} + \\frac{y^2}{9} = 1$. Select all true statements.",
      options: [
        { text: "The tangents are $y = x + 5$ and $y = -x + 5$", correct: true, feedback: "The slope equation is $-16m^2 + 16 = 0$, so $m = \\pm 1$." },
        { text: "The tangents are perpendicular", correct: true, feedback: "$(0, 5)$ lies on the director circle $x^2 + y^2 = 25$." },
        { text: "The chord of contact is $y = \\frac95$", correct: true, feedback: "$T = 0$: $\\frac{5y}{9} = 1$." },
        { text: "The points of contact are $\\left(\\pm\\frac{16}{5}, \\frac95\\right)$", correct: true, feedback: "For $y = x + 5$: $\\left(-\\frac{a^2m}{c}, \\frac{b^2}{c}\\right) = \\left(-\\frac{16}{5}, \\frac95\\right)$, and its mirror image for the other." },
        { text: "The chord of contact is $y = \\frac59$", feedback: "$T = 0$ is $\\frac{x \\cdot 0}{16} + \\frac{5y}{9} = 1$, so $y = \\frac95$." },
      ],
      hint: "Use the slope equation, then $T = 0$.",
    },
    {
      type: "numeric",
      id: "con5-4-q8",
      variant: "practice",
      question: "The midpoints of all chords of $\\frac{x^2}{9} + \\frac{y^2}{4} = 1$ parallel to $y = 2x$ lie on a line $y = kx$. Find $k$ (a fraction is fine).",
      answer: -0.2222,
      tolerance: 0.001,
      hint: "Diameter: $k = -\\frac{b^2}{a^2m}$.",
      solution: "$k = -\\frac{4}{9 \\cdot 2} = -\\frac29$.",
      commonMistakes: [{ answer: -0.5, tolerance: 0.001, feedback: "That is the perpendicular slope $-\\frac1m$, the circle answer. The ellipse weights it by $\\frac{b^2}{a^2}$." }],
    },
    { type: "heading", text: "JEE-style questions" },
    {
      type: "numeric",
      id: "con5-4-q9",
      variant: "practice",
      question: "$y = m_1x$ and $y = m_2x$ are conjugate diameters of $\\frac{x^2}{16} + \\frac{y^2}{9} = 1$. Find $m_1m_2$.",
      answer: -0.5625,
      tolerance: 0.0001,
      hint: "Conjugate diameters of an ellipse satisfy $m_1m_2 = -\\frac{b^2}{a^2}$.",
      solution: "$m_1m_2 = -\\frac{9}{16} = -0.5625$.",
      commonMistakes: [{ answer: -1, feedback: "That is the circle case. For the ellipse the product is $-\\frac{b^2}{a^2}$." }],
    },
    {
      type: "quiz",
      id: "con5-4-q10",
      variant: "practice",
      multiple: true,
      question: "From which of these points can two perpendicular tangents be drawn to $\\frac{x^2}{16} - \\frac{y^2}{9} = 1$?",
      options: [
        { text: "$(\\sqrt7, 0)$", correct: true, feedback: "It lies on the director circle $x^2 + y^2 = 7$; the slope equation $-9m^2 + 9 = 0$ gives $m = \\pm 1$." },
        { text: "$(0, \\sqrt7)$", correct: true, feedback: "On the director circle: $-16m^2 + 16 = 0$, $m = \\pm 1$, and $\\lvert m\\rvert > \\frac34$ as tangents require." },
        { text: "$(2, \\sqrt3)$", correct: true, feedback: "$4 + 3 = 7$: on the director circle, so the slopes multiply to $-1$." },
        { text: "$(5, 0)$", feedback: "$25 \\ne 7$. In fact $(5, 0)$ is a focus, inside the right branch, and sends no tangents at all." },
      ],
      hint: "The locus is $x^2 + y^2 = a^2 - b^2 = 7$.",
    },
    {
      type: "quiz",
      id: "con5-4-q11",
      variant: "concept",
      question: "For a conic $S = 0$ and a point $(x_1, y_1)$ outside it, the equation $SS_1 = T^2$ represents",
      options: [
        { text: "the pair of tangents from $(x_1, y_1)$", correct: true, feedback: "It is a second-degree equation satisfied exactly by the points on the two tangents." },
        { text: "the chord of contact of $(x_1, y_1)$", feedback: "That is $T = 0$, a single line." },
        { text: "the chord with midpoint $(x_1, y_1)$", feedback: "That is $T = S_1$." },
        { text: "the director circle", feedback: "The director circle does not depend on a chosen point." },
      ],
      hint: "Which of these is a pair of lines?",
    },
    {
      type: "numeric",
      id: "con5-4-q12",
      variant: "practice",
      question: "Perpendicular tangents to the ellipse $\\frac{x^2}{16} + \\frac{y^2}{b^2} = 1$ (with $b < 4$) can meet at $(3, 4)$. Find $b^2$.",
      answer: 9,
      hint: "$(3, 4)$ lies on the director circle $x^2 + y^2 = 16 + b^2$.",
      solution: "$9 + 16 = 16 + b^2$, so $b^2 = 9$.",
      commonMistakes: [{ answer: 41, feedback: "Solve $25 = 16 + b^2$; you added instead of subtracting." }],
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "comparing-all-conics",
  title: "5.5 · All Conics Side by Side and JEE Mixed Problems",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "You have now run the same machine five times: on the circle, the parabola, the ellipse, the hyperbola and the rectangular hyperbola $xy = c^2$. Lay the results side by side and the pattern is obvious: one substitution rule ($T$), one sign test ($S_1$), one discriminant condition for tangency. This lesson collects everything in one place and then uses it on the mixed problems JEE likes best: common tangents, loci of feet of perpendiculars, confocal conics and maximum areas.",
    },
    { type: "heading", text: "One table for every conic" },
    {
      type: "table",
      headers: ["Conic $S = 0$", "Point", "Tangent at the point", "Normal at the point"],
      rows: [
        ["$x^2 + y^2 = a^2$", "$(a\\cos\\theta, a\\sin\\theta)$", "$x\\cos\\theta + y\\sin\\theta = a$", "$x\\sin\\theta - y\\cos\\theta = 0$"],
        ["$y^2 = 4ax$", "$(at^2, 2at)$", "$ty = x + at^2$", "$y + tx = 2at + at^3$"],
        ["$\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$", "$(a\\cos\\theta, b\\sin\\theta)$", "$\\frac xa\\cos\\theta + \\frac yb\\sin\\theta = 1$", "$ax\\sec\\theta - by\\csc\\theta = a^2 - b^2$"],
        ["$\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$", "$(a\\sec\\theta, b\\tan\\theta)$", "$\\frac xa\\sec\\theta - \\frac yb\\tan\\theta = 1$", "$ax\\cos\\theta + by\\cot\\theta = a^2 + b^2$"],
        ["$xy = c^2$", "$\\left(ct, \\frac ct\\right)$", "$x + t^2y = 2ct$", "$xt^3 - yt = ct^4 - c$"],
      ],
    },
    {
      type: "table",
      headers: ["Conic", "$S_1$ at $(x_1, y_1)$", "Tangent of slope $m$", "Perpendicular tangents meet on"],
      rows: [
        ["Circle", "$x_1^2 + y_1^2 - a^2$", "$y = mx \\pm a\\sqrt{1 + m^2}$", "$x^2 + y^2 = 2a^2$"],
        ["Parabola", "$y_1^2 - 4ax_1$", "$y = mx + \\frac am$", "the directrix $x = -a$"],
        ["Ellipse", "$\\frac{x_1^2}{a^2} + \\frac{y_1^2}{b^2} - 1$", "$y = mx \\pm \\sqrt{a^2m^2 + b^2}$", "$x^2 + y^2 = a^2 + b^2$"],
        ["Hyperbola", "$\\frac{x_1^2}{a^2} - \\frac{y_1^2}{b^2} - 1$", "$y = mx \\pm \\sqrt{a^2m^2 - b^2}$, $\\lvert m\\rvert > \\frac ba$", "$x^2 + y^2 = a^2 - b^2$ (if $a > b$)"],
        ["$xy = c^2$", "$x_1y_1 - c^2$", "$y = mx \\pm 2c\\sqrt{-m}$, $m < 0$", "nowhere (only the asymptotes meet at right angles)"],
      ],
    },
    {
      type: "callout",
      variant: "definition",
      title: "The three rows that never change",
      content:
        "Form $T$ from $S$ by $x^2 \\to xx_1$, $y^2 \\to yy_1$, $xy \\to \\frac{xy_1 + x_1y}{2}$, $x \\to \\frac{x + x_1}{2}$, $y \\to \\frac{y + y_1}{2}$. Then, for **every** conic:\n- $T = 0$ is the tangent at $(x_1, y_1)$ if the point is on the curve, and its chord of contact if it is outside\n- $T = S_1$ is the chord with midpoint $(x_1, y_1)$\n- $SS_1 = T^2$ is the pair of tangents from $(x_1, y_1)$",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"each conic needs its own memorised formula sheet\"",
      content:
        "Almost every entry above is two lines of algebra from $T = 0$ or from a discriminant. The slope-form tangent of $xy = c^2$, for example: put $y = mx + k$ into $xy = c^2$ to get $mx^2 + kx - c^2 = 0$, and set the discriminant $k^2 + 4mc^2$ to zero. If you can derive an entry in under a minute you never need to have memorised it, and you cannot misremember it.",
    },
    { type: "heading", text: "Common tangents" },
    {
      type: "text",
      content:
        "A common tangent of two conics is one line that satisfies two tangency conditions. Write it as $y = mx + c$, impose both conditions, and eliminate $c$. This is the single most common mixed question in JEE.",
    },
    {
      type: "worked-example",
      id: "con5-5-we1",
      title: "Worked example 1: a circle and an ellipse",
      problem: "A common tangent to $x^2 + y^2 = 16$ and $\\frac{x^2}{25} + \\frac{y^2}{4} = 1$ touches them at $P$ and $Q$. Find $PQ$.",
      steps: [
        { text: "Circle: $c^2 = 16(1 + m^2)$. Ellipse: $c^2 = 25m^2 + 4$. Equate. *Why this step:* the same line must satisfy both conditions.", latex: "16 + 16m^2 = 25m^2 + 4 \\Rightarrow m^2 = \\frac43, \\quad c^2 = \\frac{112}{3}" },
        { text: "Contact points of $y = mx + c$: on the circle $\\left(-\\frac{16m}{c}, \\frac{16}{c}\\right)$, on the ellipse $\\left(-\\frac{25m}{c}, \\frac{4}{c}\\right)$.", latex: "PQ^2 = \\frac{(9m)^2 + 12^2}{c^2} = \\frac{108 + 144}{112/3} = \\frac{756}{112} = \\frac{27}{4}" },
      ],
      answer: "$PQ = \\frac{3\\sqrt3}{2} \\approx 2.60$.",
    },
    {
      type: "worked-example",
      id: "con5-5-we2",
      title: "Worked example 2: a parabola and an ellipse",
      problem: "Find a common tangent of $y^2 = 16\\sqrt3\\,x$ and $\\frac{x^2}{2} + \\frac{y^2}{4} = 1$.",
      steps: [
        { text: "Parabola with $a = 4\\sqrt3$: tangents $y = mx + \\frac{4\\sqrt3}{m}$. Ellipse: $c^2 = 2m^2 + 4$.", latex: "\\frac{48}{m^2} = 2m^2 + 4 \\iff m^4 + 2m^2 - 24 = 0 \\iff (m^2 + 6)(m^2 - 4) = 0" },
        { text: "So $m^2 = 4$, $m = \\pm 2$, $c = \\frac{4\\sqrt3}{m} = \\pm 2\\sqrt3$." },
      ],
      answer: "$y = 2x + 2\\sqrt3$ (and its mirror image $y = -2x - 2\\sqrt3$).",
    },
    { type: "heading", text: "Feet of perpendiculars and confocal conics" },
    {
      type: "worked-example",
      id: "con5-5-we3",
      title: "Worked example 3: the foot of the perpendicular from a focus",
      problem: "Show that the foot of the perpendicular from a focus of $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$ to any tangent lies on the auxiliary circle.",
      steps: [
        { text: "Let the tangent be $y - mx = c$ with $c^2 = a^2m^2 + b^2$. The perpendicular from $(ae, 0)$ is $my + x = ae$. The foot lies on both lines." },
        { text: "Square both and add. *Why this step:* this eliminates $m$ without solving for the foot.", latex: "(y - mx)^2 + (my + x)^2 = a^2m^2 + b^2 + a^2e^2 = a^2m^2 + a^2" },
        { text: "The left side is $(1 + m^2)(x^2 + y^2)$. Divide by $1 + m^2$.", latex: "x^2 + y^2 = a^2" },
      ],
      answer: "The foot always lies on $x^2 + y^2 = a^2$. (For the hyperbola the same algebra with $c^2 = a^2m^2 - b^2$, $a^2e^2 = a^2 + b^2$ gives the same circle; for the parabola the foot lies on the tangent at the vertex.)",
    },
    {
      type: "text",
      content:
        "Two conics with the same foci are **confocal**. An ellipse and a hyperbola with the same foci always cut at right angles: at a common point $P$, the ellipse's tangent bisects the **external** angle between $PS$ and $PS'$ and the hyperbola's tangent bisects the **internal** angle, and the two bisectors of an angle are perpendicular.",
    },
    {
      type: "worked-example",
      id: "con5-5-we4",
      title: "Worked example 4: confocal conics",
      problem: "The foci of $\\frac{x^2}{16} + \\frac{y^2}{b^2} = 1$ coincide with those of $\\frac{x^2}{144} - \\frac{y^2}{81} = \\frac{1}{25}$. Find $b^2$.",
      steps: [
        { text: "Rewrite the hyperbola in standard form. *Why this step:* the focus formula needs right side 1.", latex: "\\frac{x^2}{144/25} - \\frac{y^2}{81/25} = 1, \\qquad a^2e^2 = a^2 + b^2 = \\frac{225}{25} = 9" },
        { text: "Its foci are $(\\pm 3, 0)$. For the ellipse $a^2e^2 = a^2 - b^2 = 16 - b^2 = 9$.", latex: "b^2 = 7" },
      ],
      answer: "$b^2 = 7$.",
    },
    { type: "heading", text: "Areas with the eccentric angle" },
    {
      type: "text",
      content:
        "The map $(x, y) \\mapsto \\left(x, \\frac bay\\right)$ squashes the auxiliary circle onto the ellipse and multiplies every area by $\\frac ba$. A triangle with vertices at eccentric angles $\\theta_1, \\theta_2, \\theta_3$ is the image of the triangle with the same angles on the circle. The largest triangle in a circle of radius $a$ is equilateral, with area $\\frac{3\\sqrt3}{4}a^2$, so the largest triangle inscribed in the ellipse has area $\\frac ba \\cdot \\frac{3\\sqrt3}{4}a^2 = \\frac{3\\sqrt3}{4}ab$, with eccentric angles $120^\\circ$ apart.",
    },
    {
      type: "worked-example",
      id: "con5-5-we5",
      title: "Worked example 5: the largest inscribed triangle",
      problem: "Find the greatest area of a triangle inscribed in $\\frac{x^2}{16} + \\frac{y^2}{9} = 1$.",
      steps: [
        { text: "Use $\\frac{3\\sqrt3}{4}ab$ with $a = 4$, $b = 3$.", latex: "\\frac{3\\sqrt3}{4} \\cdot 12 = 9\\sqrt3 \\approx 15.59" },
        { text: "It is attained, for example, at eccentric angles $90^\\circ, 210^\\circ, 330^\\circ$: the points $(0, 3)$ and $\\left(\\mp 2\\sqrt3, -\\frac32\\right)$, giving base $4\\sqrt3$ and height $\\frac92$." },
      ],
      answer: "$9\\sqrt3$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "con5-5-q1",
      variant: "concept",
      multiple: true,
      question: "Select every statement that holds for **every** conic $S = 0$ in the table.",
      options: [
        { text: "$T = 0$ is the tangent at a point $(x_1, y_1)$ of the curve", correct: true, feedback: "The substitution rule gives the tangent for all of them." },
        { text: "$T = S_1$ is the chord with midpoint $(x_1, y_1)$, whenever such a chord exists", correct: true, feedback: "Same derivation each time, via the chord-slope formula." },
        { text: "$SS_1 = T^2$ is the pair of tangents from an external point", correct: true, feedback: "The circle proof transfers unchanged." },
        { text: "Perpendicular tangents meet on a circle", feedback: "For the parabola they meet on the directrix, a line; for $xy = c^2$ no two tangents are perpendicular." },
      ],
      hint: "Which results come from the $T$ substitution rule alone, and which depend on the shape?",
    },
    {
      type: "quiz",
      id: "con5-5-q2",
      variant: "practice",
      question: "The line $y = mx + k$ touches $xy = 4$ exactly when",
      options: [
        { text: "$k^2 = -16m$", correct: true, feedback: "$mx^2 + kx - 4 = 0$ has a double root when $k^2 + 16m = 0$." },
        { text: "$k^2 = 16m$", feedback: "Sign slip: the constant term is $-4$, so the discriminant is $k^2 + 16m$." },
        { text: "$k^2 = 4(1 + m^2)$", feedback: "That is the circle $x^2 + y^2 = 4$." },
        { text: "$k = \\frac{4}{m}$", feedback: "That resembles the parabola's $c = \\frac am$." },
      ],
      hint: "Substitute $y = mx + k$ into $xy = 4$ and set the discriminant to zero.",
    },
    {
      type: "numeric",
      id: "con5-5-q3",
      variant: "practice",
      question: "A common tangent of $y^2 = 16\\sqrt3\\,x$ and $\\frac{x^2}{2} + \\frac{y^2}{4} = 1$ has positive slope $m$. Find $m$.",
      answer: 2,
      hint: "Use $c = \\frac{4\\sqrt3}{m}$ in $c^2 = 2m^2 + 4$.",
      solution: "$\\frac{48}{m^2} = 2m^2 + 4$, so $m^4 + 2m^2 - 24 = 0$, $m^2 = 4$, $m = 2$.",
      commonMistakes: [{ answer: 4, feedback: "That is $m^2$." }],
    },
    {
      type: "numeric",
      id: "con5-5-q4",
      variant: "practice",
      question: "The ellipse $\\frac{x^2}{25} + \\frac{y^2}{b^2} = 1$ and the hyperbola $\\frac{x^2}{9} - \\frac{y^2}{7} = 1$ have the same foci. Find $b^2$.",
      answer: 9,
      hint: "Hyperbola: $a^2e^2 = a^2 + b^2$. Ellipse: $a^2e^2 = a^2 - b^2$.",
      solution: "The hyperbola's foci are at $\\pm\\sqrt{9 + 7} = \\pm 4$. Then $25 - b^2 = 16$ gives $b^2 = 9$.",
      commonMistakes: [{ answer: 23, feedback: "For the hyperbola add: $9 + 7 = 16$, not $9 - 7 = 2$." }],
    },
    {
      type: "quiz",
      id: "con5-5-q5",
      variant: "practice",
      question: "The feet of the perpendiculars from a focus of $\\frac{x^2}{9} + \\frac{y^2}{5} = 1$ to its tangents all lie on",
      options: [
        { text: "$x^2 + y^2 = 9$", correct: true, feedback: "The auxiliary circle $x^2 + y^2 = a^2$." },
        { text: "$x^2 + y^2 = 14$", feedback: "That is the director circle, where perpendicular tangents meet." },
        { text: "$x^2 + y^2 = 5$", feedback: "The radius is $a$, not $b$." },
        { text: "the directrix $x = \\frac92$", feedback: "For a parabola the feet lie on a line (the tangent at the vertex), but for an ellipse they lie on a circle." },
      ],
      hint: "Square and add the tangent and the perpendicular, as in worked example 3.",
    },
    {
      type: "numeric",
      id: "con5-5-q6",
      variant: "practice",
      question: "A common tangent $y = mx + c$ of $x^2 + y^2 = 4$ and $\\frac{x^2}{9} + y^2 = 1$ has slope $m$. Find $m^2$.",
      answer: 0.6,
      tolerance: 0.001,
      hint: "Equate $4(1 + m^2)$ and $9m^2 + 1$.",
      solution: "$4 + 4m^2 = 9m^2 + 1$, so $5m^2 = 3$ and $m^2 = 0.6$.",
      commonMistakes: [{ answer: 0.2308, tolerance: 0.001, feedback: "That is $\\frac{3}{13}$, from adding instead of subtracting $4m^2$." }],
    },
    {
      type: "numeric",
      id: "con5-5-q7",
      variant: "practice",
      question: "Find the greatest area of a triangle inscribed in $\\frac{x^2}{25} + \\frac{y^2}{4} = 1$, correct to 2 decimal places.",
      answer: 12.99,
      tolerance: 0.01,
      hint: "The maximum is $\\frac{3\\sqrt3}{4}ab$.",
      solution: "$\\frac{3\\sqrt3}{4} \\cdot 5 \\cdot 2 = \\frac{15\\sqrt3}{2} \\approx 12.99$.",
      commonMistakes: [{ answer: 32.48, tolerance: 0.01, feedback: "That is the equilateral triangle in the auxiliary circle, $\\frac{3\\sqrt3}{4}a^2$. Multiply by $\\frac ba$." }],
    },
    {
      type: "quiz",
      id: "con5-5-q8",
      variant: "practice",
      multiple: true,
      question: "For the rectangular hyperbola $xy = c^2$, select all true statements.",
      options: [
        { text: "The tangent at $\\left(ct, \\frac ct\\right)$ is $x + t^2y = 2ct$", correct: true, feedback: "From $T = 0$: $xy_1 + x_1y = 2c^2$." },
        { text: "Every tangent forms a triangle of area $2c^2$ with the axes", correct: true, feedback: "Intercepts $2ct$ and $\\frac{2c}{t}$." },
        { text: "The normal at $t$ meets the curve again at $t' = -\\frac{1}{t^3}$", correct: true, feedback: "Substitute $(ct', \\frac{c}{t'})$ into $xt^3 - yt = ct^4 - c$." },
        { text: "Its director circle is $x^2 + y^2 = 2c^2$", feedback: "A rectangular hyperbola has $a = b$, so $a^2 - b^2 = 0$: there is no director circle." },
      ],
      hint: "Use the table, and remember $xy = c^2$ is a hyperbola with $a = b$.",
    },
    { type: "heading", text: "JEE-style questions" },
    {
      type: "numeric",
      id: "con5-5-q9",
      variant: "practice",
      question: "The feet of the perpendiculars from a focus of $\\frac{x^2}{16} - \\frac{y^2}{9} = 1$ to its tangents lie on a circle. Find its radius.",
      answer: 4,
      hint: "Repeat worked example 3 with $c^2 = a^2m^2 - b^2$ and $a^2e^2 = a^2 + b^2$.",
      solution: "$(y - mx)^2 + (my + x)^2 = a^2m^2 - b^2 + a^2 + b^2$, so $x^2 + y^2 = a^2 = 16$: the auxiliary circle, radius 4.",
      commonMistakes: [{ answer: 5, feedback: "That is $ae$, the distance to the focus. The circle is $x^2 + y^2 = a^2$." }],
    },
    {
      type: "quiz",
      id: "con5-5-q10",
      variant: "practice",
      question: "Which of these lines touches $\\frac{x^2}{16} - \\frac{y^2}{9} = 1$?",
      options: [
        { text: "$y = x + \\sqrt7$", correct: true, feedback: "$c^2 = 16 \\cdot 1 - 9 = 7$." },
        { text: "$y = x + 5$", feedback: "$25 \\ne 7$; that would be the ellipse condition $16 + 9$." },
        { text: "$y = 2x + 7$", feedback: "$c^2$ should be $64 - 9 = 55$, not $49$." },
        { text: "$y = \\frac34x + 1$", feedback: "Parallel to an asymptote: it meets the curve once but is not a tangent." },
      ],
      hint: "Check $c^2 = a^2m^2 - b^2$ for each line.",
    },
    {
      type: "quiz",
      id: "con5-5-q11",
      variant: "practice",
      multiple: true,
      question: "Select all true statements.",
      options: [
        { text: "The part of a tangent to an ellipse between its point of contact and a directrix subtends a right angle at the corresponding focus", correct: true, feedback: "A classic property shared by all conics (you met it for the parabola in Chapter 2)." },
        { text: "An ellipse and a hyperbola with the same foci cut each other at right angles", correct: true, feedback: "At a common point their tangents are the internal and external bisectors of angle $SPS'$." },
        { text: "The product of the perpendiculars from the foci of $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$ to any tangent is $b^2$", correct: true, feedback: "$\\frac{\\lvert c^2 - a^2e^2m^2\\rvert}{1 + m^2} = \\frac{b^2(1 + m^2)}{1 + m^2}$." },
        { text: "The auxiliary circle of a hyperbola passes through its foci", feedback: "Its radius is $a$, but the foci are at distance $ae > a$." },
      ],
      hint: "Check each with a concrete curve if you are unsure.",
    },
    {
      type: "numeric",
      id: "con5-5-q12",
      variant: "practice",
      question: "The parabolas $y^2 = 4x$ and $x^2 = 4y$ have exactly one common tangent $y = mx + c$. Find $c$.",
      answer: -1,
      hint: "Tangent to $y^2 = 4x$: $c = \\frac1m$. Tangent to $x^2 = 4y$: $c = -m^2$.",
      solution: "$\\frac1m = -m^2$ gives $m^3 = -1$, $m = -1$, $c = -1$. The common tangent is $x + y + 1 = 0$.",
      commonMistakes: [{ answer: 1, feedback: "With $m = -1$, $c = \\frac{1}{m} = -1$." }],
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "chapter-5-mastery",
  title: "5.6 · Chapter 5 Mastery",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "This is the last checkpoint of the course. The questions range over all six chapters: classifying a conic, the parabola, the ellipse, the hyperbola and the tangent machine. Before you start, rebuild the whole course from the few ideas below. If you can derive a formula from them, you do not need to remember it.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Reconstruct it",
      content:
        "1. **Definition:** $PS = e \\cdot PM$ (or $SP \\pm S'P = 2a$). Square it to get the equation, and $b^2 = a^2\\lvert 1 - e^2\\rvert$ ties the shape to $e$.\n2. **Classification:** $\\Delta = 0$ means a pair of lines; otherwise $h^2 - ab$ decides ellipse, parabola or hyperbola.\n3. **Parameters:** $(at^2, 2at)$, $(a\\cos\\theta, b\\sin\\theta)$, $(a\\sec\\theta, b\\tan\\theta)$, $\\left(ct, \\frac ct\\right)$ turn loci into trigonometry or algebra in one variable.\n4. **Tangency:** substitute the line, set the discriminant to zero: $c = \\frac am$, $c^2 = a^2m^2 \\pm b^2$.\n5. **The $T$ machine:** $T = 0$, $T = S_1$, $SS_1 = T^2$, and perpendicular slopes multiply to $-1$ (director circle).",
    },
    { type: "heading", text: "Mastery questions" },
    {
      type: "quiz",
      id: "con5-6-q1",
      variant: "mastery",
      question: "The equation $x^2 + 4xy + 4y^2 - 3x - 6 = 0$ represents",
      options: [
        { text: "a parabola", correct: true, feedback: "$h^2 = 4 = ab$, and $\\Delta = 1 \\cdot 4 \\cdot (-6) - 4\\left(\\frac94\\right) - (-6)(4) = -9 \\ne 0$, so it is a non-degenerate parabola." },
        { text: "a pair of parallel lines", feedback: "$h^2 = ab$ allows parallel lines only if $\\Delta = 0$, and here $\\Delta = -9$." },
        { text: "an ellipse", feedback: "An ellipse needs $h^2 < ab$; here $h^2 = ab$." },
        { text: "a hyperbola", feedback: "A hyperbola needs $h^2 > ab$." },
      ],
      hint: "Compute $h^2 - ab$ with $a = 1$, $h = 2$, $b = 4$, then $\\Delta = abc + 2fgh - af^2 - bg^2 - ch^2$ with $g = -\\frac32$, $f = 0$, $c = -6$.",
    },
    {
      type: "quiz",
      id: "con5-6-q2",
      variant: "mastery",
      question: "A double cone has semi-vertical angle $30^\\circ$. A plane not through the vertex makes an angle of $45^\\circ$ with the axis. The section is",
      options: [
        { text: "an ellipse", correct: true, feedback: "The plane is tilted more steeply than the generators ($45^\\circ > 30^\\circ$), so it cuts one nappe in a closed curve, with $e = \\frac{\\cos 45^\\circ}{\\cos 30^\\circ} \\approx 0.82$." },
        { text: "a parabola", feedback: "A parabola needs the plane parallel to a generator: angle with the axis equal to $30^\\circ$." },
        { text: "a hyperbola", feedback: "A hyperbola needs the plane closer to the axis than the generators: angle less than $30^\\circ$." },
        { text: "a circle", feedback: "A circle needs the plane perpendicular to the axis: angle $90^\\circ$." },
      ],
      hint: "Compare the plane's angle with the axis to the semi-vertical angle, or compute $e = \\frac{\\cos\\beta}{\\cos\\alpha}$.",
    },
    {
      type: "numeric",
      id: "con5-6-q3",
      variant: "mastery",
      question: "One end of a focal chord of $y^2 = 8x$ is $(8, 8)$. Find the length of the focal chord.",
      answer: 12.5,
      tolerance: 0.001,
      hint: "Here $a = 2$ and $(8, 8) = (2t^2, 4t)$ with $t = 2$. The other end has parameter $-\\frac1t$.",
      solution: "The other end is $t' = -\\frac12$: $\\left(\\frac12, -2\\right)$. Length $= a\\left(t + \\frac1t\\right)^2 = 2\\left(\\frac52\\right)^2 = 12.5$. Check: $\\sqrt{7.5^2 + 10^2} = 12.5$.",
      commonMistakes: [{ answer: 8, feedback: "That is the latus rectum, the shortest focal chord. This chord is longer." }],
    },
    {
      type: "numeric",
      id: "con5-6-q4",
      variant: "mastery",
      question: "Tangents to $y^2 = 12x$ are drawn at the two ends of a focal chord. Find the $x$-coordinate of the point where they meet.",
      answer: -3,
      hint: "Tangents at $t_1$, $t_2$ meet at $(at_1t_2, a(t_1 + t_2))$, and a focal chord has $t_1t_2 = -1$.",
      solution: "$a = 3$ and $at_1t_2 = -3$: the tangents meet on the directrix $x = -3$, at right angles.",
      commonMistakes: [{ answer: 3, feedback: "That is the focus. The meeting point is on the directrix." }],
    },
    {
      type: "numeric",
      id: "con5-6-q5",
      variant: "mastery",
      question: "The normal to $y^2 = 4x$ at $(1, 2)$ meets the parabola again at $Q$. Find the $x$-coordinate of $Q$.",
      answer: 9,
      hint: "The normal at $t_1$ meets the parabola again at $t_2 = -t_1 - \\frac{2}{t_1}$.",
      solution: "$t_1 = 1$, so $t_2 = -3$ and $Q = (at_2^2, 2at_2) = (9, -6)$. Check on the normal $y = -x + 3$: $-6 = -9 + 3$.",
      commonMistakes: [{ answer: 1, feedback: "That is $P$ itself. Find the second intersection." }],
    },
    {
      type: "numeric",
      id: "con5-6-q6",
      variant: "mastery",
      question: "The latus rectum of an ellipse equals half its minor axis. Find its eccentricity, correct to 3 decimal places.",
      answer: 0.866,
      tolerance: 0.001,
      hint: "$\\frac{2b^2}{a} = b$, then $e^2 = 1 - \\frac{b^2}{a^2}$.",
      solution: "$\\frac{2b^2}{a} = b$ gives $b = \\frac a2$, so $e^2 = 1 - \\frac14 = \\frac34$ and $e = \\frac{\\sqrt3}{2} \\approx 0.866$.",
      commonMistakes: [{ answer: 0.75, tolerance: 0.001, feedback: "That is $e^2$." }],
    },
    {
      type: "numeric",
      id: "con5-6-q7",
      variant: "mastery",
      question: "An ellipse has foci $(\\pm 3, 0)$ and passes through $\\left(4, \\frac{12}{5}\\right)$. Find its semi-major axis $a$.",
      answer: 5,
      hint: "Add the distances from the point to the two foci: that sum is $2a$.",
      solution: "Distances: $\\sqrt{1 + 5.76} = 2.6$ and $\\sqrt{49 + 5.76} = 7.4$. Sum $= 10 = 2a$, so $a = 5$ (and $b^2 = 16$: check $\\frac{16}{25} + \\frac{5.76}{16} = 1$).",
      commonMistakes: [{ answer: 10, feedback: "The sum of focal distances is $2a$, so halve it." }],
    },
    {
      type: "quiz",
      id: "con5-6-q8",
      variant: "mastery",
      multiple: true,
      question: "For the hyperbola $\\frac{x^2}{9} - \\frac{y^2}{16} = 1$, select all true statements.",
      options: [
        { text: "$e = \\frac53$", correct: true, feedback: "$e^2 = 1 + \\frac{16}{9} = \\frac{25}{9}$." },
        { text: "The foci are $(\\pm 5, 0)$", correct: true, feedback: "$ae = 3 \\cdot \\frac53 = 5$." },
        { text: "The latus rectum is $\\frac{32}{3}$", correct: true, feedback: "$\\frac{2b^2}{a} = \\frac{32}{3}$." },
        { text: "The conjugate hyperbola has eccentricity $\\frac54$", correct: true, feedback: "$\\frac{1}{e^2} + \\frac{1}{e'^2} = 1$ gives $e'^2 = \\frac{25}{16}$." },
        { text: "The asymptotes are $y = \\pm\\frac34x$", feedback: "They are $y = \\pm\\frac ba x = \\pm\\frac43x$." },
        { text: "The directrices are $x = \\pm\\frac{15}{4}$", feedback: "$x = \\pm\\frac ae = \\pm\\frac95$." },
      ],
      hint: "$b^2 = a^2(e^2 - 1)$, foci $(\\pm ae, 0)$, directrices $x = \\pm\\frac ae$, LR $\\frac{2b^2}{a}$.",
    },
    {
      type: "numeric",
      id: "con5-6-q9",
      variant: "mastery",
      question: "Find the angle, in degrees, between the asymptotes of $\\frac{x^2}{3} - y^2 = 1$ measured in the region that contains the hyperbola.",
      answer: 60,
      unit: "°",
      hint: "The asymptotes are $y = \\pm\\frac ba x$ with $\\frac ba = \\frac{1}{\\sqrt3}$.",
      solution: "Each asymptote makes $\\tan^{-1}\\frac{1}{\\sqrt3} = 30^\\circ$ with the $x$-axis, and the curve lies around the $x$-axis, so the angle is $2 \\cdot 30^\\circ = 60^\\circ$. Check: $e = \\sec 30^\\circ = \\frac{2}{\\sqrt3}$, and indeed $e^2 = 1 + \\frac13$.",
      commonMistakes: [{ answer: 120, feedback: "That is the supplementary angle, which contains the conjugate axis, not the curve." }],
    },
    {
      type: "numeric",
      id: "con5-6-q10",
      variant: "mastery",
      question: "A hyperbola $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$ has latus rectum 8, and its conjugate axis is half the distance between its foci. Find $e$, correct to 3 decimal places.",
      answer: 1.155,
      tolerance: 0.001,
      hint: "$\\frac{2b^2}{a} = 8$ and $2b = \\frac12(2ae)$. Square the second and use $a^2e^2 = a^2 + b^2$.",
      solution: "$2b = ae$ gives $4b^2 = a^2 + b^2$, so $a^2 = 3b^2$ and $e^2 = 1 + \\frac{b^2}{a^2} = \\frac43$. (The latus rectum then fixes the size: $a = 12$, $b^2 = 48$.) So $e = \\frac{2}{\\sqrt3} \\approx 1.155$.",
      commonMistakes: [{ answer: 1.333, tolerance: 0.001, feedback: "That is $e^2$." }],
    },
    {
      type: "numeric",
      id: "con5-6-q11",
      variant: "mastery",
      question: "The line $y = 2x + c$ touches $\\frac{x^2}{16} - \\frac{y^2}{9} = 1$. Find $c^2$.",
      answer: 55,
      hint: "$c^2 = a^2m^2 - b^2$.",
      solution: "$c^2 = 16 \\cdot 4 - 9 = 55$.",
      commonMistakes: [{ answer: 73, feedback: "That is the ellipse condition $a^2m^2 + b^2$." }],
    },
    {
      type: "numeric",
      id: "con5-6-q12",
      variant: "mastery",
      question: "A circle meets the rectangular hyperbola $xy = c^2$ at four points with parameters $t_1, t_2, t_3, t_4$ (points $\\left(ct_i, \\frac{c}{t_i}\\right)$). Find $t_1t_2t_3t_4$.",
      answer: 1,
      hint: "Substitute $\\left(ct, \\frac ct\\right)$ into $x^2 + y^2 + 2gx + 2fy + k = 0$ and multiply by $t^2$ to get a quartic in $t$.",
      solution: "$c^2t^4 + 2gct^3 + kt^2 + 2fct + c^2 = 0$. The product of the four roots is $\\frac{c^2}{c^2} = 1$.",
      commonMistakes: [{ answer: -1, feedback: "For a quartic the product of roots is $+\\frac{\\text{constant}}{\\text{leading}}$." }],
    },
    {
      type: "numeric",
      id: "con5-6-q13",
      variant: "mastery",
      question: "Find the area of the quadrilateral formed by the tangents at the four ends of the latera recta of $\\frac{x^2}{16} + \\frac{y^2}{12} = 1$.",
      answer: 64,
      hint: "Find $e$, the end $\\left(ae, \\frac{b^2}{a}\\right)$ of a latus rectum, its tangent and the tangent's intercepts.",
      solution: "$e = \\frac12$, end $(2, 3)$, tangent $\\frac{2x}{16} + \\frac{3y}{12} = 1$, i.e. $\\frac x8 + \\frac y4 = 1$. The rhombus has diagonals 16 and 8, so area $= \\frac12 \\cdot 16 \\cdot 8 = 64 = \\frac{2a^2}{e}$.",
      commonMistakes: [{ answer: 32, feedback: "A rhombus has area half the product of its diagonals: $\\frac12 \\cdot 16 \\cdot 8$." }],
    },
    {
      type: "quiz",
      id: "con5-6-q14",
      variant: "mastery",
      multiple: true,
      question: "For the ellipse $\\frac{x^2}{16} + \\frac{y^2}{9} = 1$ and the point $Q(4, 3)$, select all true statements.",
      options: [
        { text: "$Q$ lies on the director circle", correct: true, feedback: "$16 + 9 = 25 = a^2 + b^2$." },
        { text: "The tangents from $Q$ are $x = 4$ and $y = 3$", correct: true, feedback: "$SS_1 = T^2$ factors as $(x - 4)(y - 3) = 0$." },
        { text: "The chord of contact of $Q$ is $3x + 4y = 12$", correct: true, feedback: "$T = 0$: $\\frac{4x}{16} + \\frac{3y}{9} = 1$." },
        { text: "The chord of contact of $Q$ subtends a right angle at the centre", correct: true, feedback: "It joins $(4, 0)$ and $(0, 3)$, which are perpendicular as seen from $O$." },
        { text: "$Q$ lies inside the ellipse", feedback: "$S_1 = 1 + 1 - 1 = 1 > 0$: outside." },
      ],
      hint: "Compute $S_1$, $T = 0$ and the pair of tangents at $(4, 3)$.",
    },
    {
      type: "numeric",
      id: "con5-6-q15",
      variant: "mastery",
      question: "Find the slope of the chord of $\\frac{x^2}{36} + \\frac{y^2}{9} = 1$ that is bisected at $(4, 2)$.",
      answer: -0.5,
      tolerance: 0.001,
      hint: "Use $T = S_1$, or the slope $-\\frac{b^2h}{a^2k}$.",
      solution: "$T = S_1$: $\\frac{4x}{36} + \\frac{2y}{9} = \\frac{16}{36} + \\frac49$, i.e. $x + 2y = 8$, slope $-\\frac12$.",
      commonMistakes: [{ answer: -2, tolerance: 0.001, feedback: "You inverted the slope: $-\\frac{b^2h}{a^2k} = -\\frac{9 \\cdot 4}{36 \\cdot 2} = -\\frac12$." }],
    },
  ]),
};

export const conChapter5Lessons: LessonSeed[] = [lesson01, lesson02, lesson03, lesson04, lesson05, lesson06];
