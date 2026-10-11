import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Complex Numbers & Quadratics Chapter 1 — Quadratic Expressions, Location
 * of Roots and Inequalities. The parabola y = ax² + bx + c read as a
 * picture: its vertex and six shapes, its sign for all real x and its
 * extreme values, where its roots sit relative to given numbers (D, a·f(k),
 * −b/2a), common roots of two quadratics, quadratic and rational
 * inequalities by the wavy-curve method, modulus and logarithmic equations
 * that reduce to quadratics, and Vieta's relations for cubics and quartics.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "the-graph-of-a-quadratic",
  title: "1.1 · The Graph of a Quadratic",
  position: 1,
  blocks: blocks([
    {
      type: "text",
      content:
        "In Chapter 0 a quadratic was an equation to be solved. In this chapter it becomes a **picture**. Every question we will meet (Is $x^2 - 4x + 7$ ever negative? Where does $x^2 - 2mx + m^2 - 1$ have its roots? For which $x$ is $\\frac{x-2}{x+5} \\le 0$?) has a one-glance answer once you can see the parabola behind it.",
    },
    {
      type: "text",
      content:
        "The plan is simple. Put every quadratic $f(x) = ax^2 + bx + c$ into a form that shows its **vertex**, read off the six possible shapes from the signs of $a$ and $D = b^2 - 4ac$, and learn to go backwards from a sketch to the signs of $a$, $b$, $c$ and $D$.",
    },
    { type: "heading", text: "Vertex form by completing the square" },
    {
      type: "text",
      content:
        "Take $a$ out of the first two terms and complete the square, exactly as in the derivation of the quadratic formula:",
    },
    {
      type: "math",
      latex:
        "ax^2 + bx + c = a\\left(x^2 + \\frac{b}{a}x\\right) + c = a\\left(x + \\frac{b}{2a}\\right)^2 - \\frac{b^2}{4a} + c = a\\left(x + \\frac{b}{2a}\\right)^2 - \\frac{D}{4a}",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Vertex, axis and intercepts",
      content:
        "For $f(x) = ax^2 + bx + c$ with $a \\ne 0$ and $D = b^2 - 4ac$:\n\n- the **vertex** is $\\left(-\\frac{b}{2a},\\ -\\frac{D}{4a}\\right)$\n- the **axis of symmetry** is the vertical line $x = -\\frac{b}{2a}$\n- the **y-intercept** is $(0, c)$, since $f(0) = c$\n- the **x-intercepts** are the real roots, which exist only when $D \\ge 0$",
    },
    {
      type: "text",
      content:
        "Read the vertex form as a recipe: start with $y = x^2$, stretch it by $a$ (flipping it upside down if $a < 0$), slide it left or right so the bottom sits at $x = -\\frac{b}{2a}$, then lift or lower it to height $-\\frac{D}{4a}$. Since $(x + \\frac{b}{2a})^2 \\ge 0$, the vertex is the **lowest** point when $a > 0$ and the **highest** point when $a < 0$.",
    },
    {
      type: "interactive",
      config: {
        component: "cq-quadratic-explorer",
        a: { min: -3, max: 3, step: 0.5, initial: 1 },
        b: { min: -6, max: 6, step: 0.5, initial: -2 },
        c: { min: -6, max: 6, step: 0.5, initial: -3 },
        showVertex: true,
        showAxis: true,
        readouts: ["discriminant", "roots", "vertex", "range"],
        caption:
          "Move $c$ alone: the parabola slides straight up and down, and the roots appear, merge and vanish as $D$ changes sign. Move $b$ alone: the vertex travels along a parabola of its own while the y-intercept stays fixed at $c$.",
      },
    },
    {
      type: "worked-example",
      id: "cq1-1-we1",
      title: "Worked example 1: vertex, axis and range",
      problem: "Find the vertex, the axis of symmetry and the range of $f(x) = 2x^2 - 8x + 5$.",
      steps: [
        { text: "Axis: $x = -\\frac{b}{2a} = -\\frac{-8}{4} = 2$." },
        { text: "Vertex height: substitute, $f(2) = 8 - 16 + 5 = -3$. *Why this step:* plugging the axis back in is usually faster than computing $-\\frac{D}{4a}$, and it is a check: $D = 64 - 40 = 24$ and $-\\frac{24}{8} = -3$ agree." },
        { text: "Since $a = 2 > 0$ the parabola opens upward, so the vertex is the lowest point and every value from $-3$ upward is taken." },
      ],
      answer: "Vertex $(2, -3)$, axis $x = 2$, range $[-3, \\infty)$.",
    },
    { type: "heading", text: "The six shapes" },
    {
      type: "text",
      content:
        "Two signs decide the whole picture. The sign of $a$ decides whether the parabola opens up or down. The sign of $D$ decides whether the vertex is on the far side of the x-axis (two crossings), on it (a touch) or on the same side as the opening (no crossing). The vertex height $-\\frac{D}{4a}$ makes this exact: for $a > 0$, the vertex is below the axis precisely when $D > 0$.",
    },
    {
      type: "table",
      headers: ["", "$D > 0$", "$D = 0$", "$D < 0$"],
      rows: [
        ["$a > 0$ (cup)", "crosses the x-axis at two points, negative between the roots", "touches the x-axis at the vertex, $f(x) \\ge 0$ everywhere", "entirely above the x-axis, $f(x) > 0$ for all $x$"],
        ["$a < 0$ (cap)", "crosses at two points, positive between the roots", "touches at the vertex, $f(x) \\le 0$ everywhere", "entirely below the x-axis, $f(x) < 0$ for all $x$"],
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "What b does to the picture",
      content:
        "The coefficient $b$ is the **slope of the graph where it crosses the y-axis** ($f'(0) = b$ if you know derivatives, or just notice $f(x) \\approx c + bx$ for small $x$). It also fixes the side of the axis: $-\\frac{b}{2a} > 0$ means the vertex is to the right of the y-axis, which happens exactly when $a$ and $b$ have **opposite** signs.",
    },
    { type: "heading", text: "Reading the signs from a sketch" },
    {
      type: "text",
      content:
        "JEE Main often draws a parabola and asks for the signs of $a$, $b$, $c$ and $D$. Read them in this order:\n\n1. Opening direction gives the sign of $a$.\n2. Where the graph cuts the y-axis gives the sign of $c$.\n3. Which side of the y-axis the vertex lies on gives the sign of $-\\frac{b}{2a}$, hence of $b$ relative to $a$.\n4. How many times the graph meets the x-axis gives the sign of $D$.",
    },
    {
      type: "worked-example",
      id: "cq1-1-we2",
      title: "Worked example 2: signs from a sketch",
      problem:
        "A parabola $y = ax^2 + bx + c$ opens **downward**, its vertex lies in the first quadrant, and it cuts the y-axis **below** the origin. Find the signs of $a$, $b$, $c$ and $D$.",
      steps: [
        { text: "Opens downward, so $a < 0$." },
        { text: "Cuts the y-axis below the origin, so $c = f(0) < 0$." },
        { text: "Vertex to the right of the y-axis: $-\\frac{b}{2a} > 0$. With $a < 0$ this needs $b > 0$. *Why this step:* $-\\frac{b}{2a} > 0$ means $\\frac{b}{a} < 0$, so $b$ and $a$ have opposite signs." },
        { text: "A downward parabola whose highest point is above the x-axis must cross it twice, so $D > 0$." },
      ],
      answer: "$a < 0$, $b > 0$, $c < 0$, $D > 0$.",
    },
    {
      type: "worked-example",
      id: "cq1-1-we3",
      title: "Worked example 3: building a quadratic from its vertex",
      problem: "Find the quadratic whose graph has vertex $(1, -4)$ and passes through $(3, 0)$.",
      steps: [
        { text: "Start from vertex form: $y = a(x - 1)^2 - 4$. *Why this step:* the vertex fixes two of the three unknowns at once, leaving only $a$." },
        { text: "Substitute $(3, 0)$: $0 = 4a - 4$, so $a = 1$." },
        { text: "Expand: $y = (x - 1)^2 - 4 = x^2 - 2x - 3$." },
      ],
      answer: "$y = x^2 - 2x - 3$ (roots $-1$ and $3$, symmetric about $x = 1$).",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the y-intercept is the vertex\"",
      content:
        "The point $(0, c)$ is where the graph crosses the y-axis. It is the vertex only when $b = 0$. For $y = x^2 - 2x - 3$ the y-intercept is $(0, -3)$ but the vertex is $(1, -4)$, lower still. The vertex sits on the axis $x = -\\frac{b}{2a}$, wherever that is.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the axis is at x = b/2a\"",
      content:
        "The minus sign matters. For $x^2 - 6x + 11$ the axis is $x = -\\frac{-6}{2} = 3$, not $-3$. A quick check: the axis lies midway between the roots, and the roots add up to $-\\frac{b}{a}$, so the midpoint is $-\\frac{b}{2a}$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "cq1-1-q1",
      variant: "practice",
      question: "Find the y-coordinate of the vertex of $y = x^2 - 6x + 11$.",
      answer: 2,
      hint: "The axis is $x = -\\frac{b}{2a}$. Substitute that value of $x$ back into the expression.",
      solution: "Axis $x = 3$, and $f(3) = 9 - 18 + 11 = 2$. Check: $-\\frac{D}{4a} = -\\frac{36 - 44}{4} = 2$.",
      commonMistakes: [
        { answer: 11, feedback: "11 is the y-intercept $f(0)$, not the vertex height." },
        { answer: 38, feedback: "That is $f(-3)$: the axis is at $x = +3$, because $-\\frac{b}{2a} = -\\frac{-6}{2}$." },
        { answer: -2, feedback: "Sign slip in $-\\frac{D}{4a}$: $D = 36 - 44 = -8$, so $-\\frac{D}{4a} = +2$." },
      ],
    },
    {
      type: "quiz",
      id: "cq1-1-q2",
      variant: "practice",
      question: "What is the axis of symmetry of $y = -2x^2 + 8x - 3$?",
      options: [
        { text: "$x = 2$", correct: true, feedback: "$-\\frac{b}{2a} = -\\frac{8}{-4} = 2$." },
        { text: "$x = -2$", feedback: "Both $a$ and $b$ carry signs: $-\\frac{8}{2(-2)} = +2$." },
        { text: "$x = 4$", feedback: "That is $-\\frac{b}{a}$, the sum of the roots. The axis is half of it." },
        { text: "$x = -3$", feedback: "$-3$ is the y-intercept value $c$, which says nothing about the axis." },
      ],
      hint: "Use $x = -\\frac{b}{2a}$ with $a = -2$ and $b = 8$, keeping both signs.",
    },
    {
      type: "quiz",
      id: "cq1-1-q3",
      variant: "practice",
      question: "Write $x^2 + 4x + 1$ in vertex form.",
      options: [
        { text: "$(x + 2)^2 - 3$", correct: true, feedback: "$(x + 2)^2 = x^2 + 4x + 4$, so subtract 3 to get back to $+1$." },
        { text: "$(x - 2)^2 - 3$", feedback: "$(x - 2)^2$ expands to $x^2 - 4x + 4$: the middle term has the wrong sign." },
        { text: "$(x + 2)^2 + 1$", feedback: "Completing the square added 4, which must be taken away again." },
        { text: "$(x + 4)^2 - 15$", feedback: "Halve the coefficient of $x$: the square is $(x + 2)^2$, not $(x + 4)^2$." },
      ],
      hint: "Half of 4 is 2. Expand $(x + 2)^2$ and compare constants.",
    },
    {
      type: "numeric",
      id: "cq1-1-q4",
      variant: "practice",
      question: "Find the least value of $3x^2 - 12x + 7$.",
      answer: -5,
      hint: "For $a > 0$ the least value is the vertex height, $f\\left(-\\frac{b}{2a}\\right)$ or equivalently $-\\frac{D}{4a}$.",
      solution: "Axis $x = 2$, and $f(2) = 12 - 24 + 7 = -5$. Check: $D = 144 - 84 = 60$, $-\\frac{60}{12} = -5$.",
      commonMistakes: [
        { answer: 7, feedback: "7 is $f(0)$. The minimum is at the vertex $x = 2$, not at $x = 0$." },
        { answer: 5, feedback: "Sign slip: the minimum is $-\\frac{D}{4a} = -5$." },
        { answer: 43, feedback: "That is $f(-2)$: the axis is at $x = +2$." },
      ],
    },
    {
      type: "quiz",
      id: "cq1-1-q5",
      variant: "concept",
      question: "For a quadratic with $a < 0$ and $D < 0$, the graph",
      options: [
        { text: "lies entirely below the x-axis", correct: true, feedback: "It opens downward and its highest point, at height $-\\frac{D}{4a}$, is negative (both $D$ and $a$ are negative, so $\\frac{D}{4a} > 0$)." },
        { text: "lies entirely above the x-axis", feedback: "That needs $a > 0$. A downward parabola cannot stay above the axis forever." },
        { text: "touches the x-axis once", feedback: "Touching needs $D = 0$." },
        { text: "crosses the x-axis twice", feedback: "Two crossings need $D > 0$." },
      ],
      hint: "Find the sign of the vertex height $-\\frac{D}{4a}$, then ask which way the parabola opens.",
    },
    {
      type: "numeric",
      id: "cq1-1-q6",
      variant: "practice",
      question: "The parabola $y = x^2 + bx + 9$ touches the x-axis, and $b > 0$. Find $b$.",
      answer: 6,
      hint: "Touching the x-axis means a double root, so $D = 0$.",
      solution: "$D = b^2 - 36 = 0$ gives $b = \\pm 6$, and $b > 0$ picks $b = 6$: $y = (x + 3)^2$.",
      commonMistakes: [
        { answer: -6, feedback: "$b = -6$ also makes $D = 0$, but the question says $b > 0$." },
        { answer: 36, feedback: "$D = 0$ gives $b^2 = 36$, so $b = 6$, not 36." },
        { answer: 3, feedback: "3 is $\\sqrt{9}$, the constant inside $(x + 3)^2$. The coefficient of $x$ is twice that." },
      ],
    },
    {
      type: "quiz",
      id: "cq1-1-q7",
      variant: "practice",
      multiple: true,
      question:
        "A parabola $y = ax^2 + bx + c$ opens upward, its vertex lies in the **third** quadrant, and it cuts the y-axis **above** the origin. Which statements are true? Select all that apply.",
      options: [
        { text: "$a > 0$", correct: true, feedback: "It opens upward." },
        { text: "$b < 0$", feedback: "Vertex left of the y-axis: $-\\frac{b}{2a} < 0$, so $\\frac{b}{a} > 0$ and, with $a > 0$, $b > 0$." },
        { text: "$c > 0$", correct: true, feedback: "It cuts the y-axis above the origin, and $f(0) = c$." },
        { text: "$b^2 > 4ac$", correct: true, feedback: "An upward parabola with its lowest point below the axis must cross the axis twice, so $D > 0$." },
        { text: "$abc < 0$", feedback: "$a$, $b$ and $c$ are all positive, so $abc > 0$." },
      ],
      hint: "Work through the four readings in order: opening gives $a$, the y-intercept gives $c$, the side of the vertex gives $b$ relative to $a$, and the vertex height gives $D$.",
    },
    {
      type: "quiz",
      id: "cq1-1-q8",
      variant: "practice",
      multiple: true,
      question:
        "JEE Main. The graph of $y = ax^2 + bx + c$ opens downward and both of its x-intercepts are **positive**. Which of the following must hold? Select all that apply.",
      options: [
        { text: "$a < 0$", correct: true, feedback: "It opens downward." },
        { text: "$b < 0$", feedback: "Both roots positive means their sum $-\\frac{b}{a} > 0$, so $b$ has the opposite sign to $a$: $b > 0$." },
        { text: "$c < 0$", correct: true, feedback: "The product of the roots $\\frac{c}{a} > 0$, so $c$ has the same sign as $a$: negative. Geometrically, the graph is below the axis at $x = 0$, outside the roots." },
        { text: "$ac > 0$", correct: true, feedback: "Both are negative, which is the same as saying the product of the roots is positive." },
        { text: "$b^2 < 4ac$", feedback: "There are two real x-intercepts, so $b^2 - 4ac > 0$." },
      ],
      hint: "Translate \"both roots positive\" into Vieta: the sum $-\\frac{b}{a}$ and the product $\\frac{c}{a}$ are both positive.",
    },
    {
      type: "numeric",
      id: "cq1-1-q9",
      variant: "practice",
      question: "JEE Main. The vertex of $y = x^2 + px + q$ is $(2, -1)$. Find $p + q$.",
      answer: -1,
      hint: "The vertex form is $(x - 2)^2 - 1$. Expand and read off $p$ and $q$.",
      solution: "$(x - 2)^2 - 1 = x^2 - 4x + 3$, so $p = -4$, $q = 3$ and $p + q = -1$. (Equivalently, $p + q = f(1) - 1 = 0 - 1$.)",
      commonMistakes: [
        { answer: 7, feedback: "That takes $p = +4$. The axis $x = -\\frac{p}{2} = 2$ forces $p = -4$." },
        { answer: -5, feedback: "Check $q$: $(x - 2)^2 - 1$ has constant term $4 - 1 = 3$, not $-1$." },
      ],
    },
    {
      type: "quiz",
      id: "cq1-1-q10",
      variant: "practice",
      question:
        "JEE Advanced. As $k$ varies over the reals, the vertex of $y = x^2 - 2kx + k^2 + k - 6$ moves along which curve?",
      options: [
        { text: "the line $y = x - 6$", correct: true, feedback: "Vertex form is $(x - k)^2 + k - 6$, so the vertex is $(k, k - 6)$: $y = x - 6$." },
        { text: "the parabola $y = x^2 - 6$", feedback: "Find the vertex first: its y-coordinate is $f(k) = k - 6$, which is linear in $k$." },
        { text: "the line $y = -x - 6$", feedback: "The x-coordinate is $-\\frac{-2k}{2} = +k$, so the y-coordinate $k - 6$ is $x - 6$." },
        { text: "the line $y = x + 6$", feedback: "The vertex height is $k^2 + k - 6 - k^2 = k - 6$." },
      ],
      hint: "Find the vertex $(h, f(h))$ in terms of $k$, then eliminate $k$ between the two coordinates.",
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "sign-and-extreme-values-of-a-quadratic",
  title: "1.2 · Sign and Extreme Values of a Quadratic",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "\"Prove that $x^2 - 4x + 7 > 0$ for every real $x$.\" \"Find $k$ so that $kx^2 + 4x + k$ is always positive.\" \"Find the largest value of $\\frac{3x^2 + 9x + 17}{3x^2 + 9x + 7}$.\" These look like three different problems. They are one picture: a parabola that stays on one side of the x-axis, and the height of its vertex.",
    },
    { type: "heading", text: "When is a quadratic always positive?" },
    {
      type: "text",
      content: "Multiply the vertex form by $a$. Then $4a \\cdot f(x)$ becomes a perfect square plus a constant:",
    },
    {
      type: "math",
      latex: "4a\\,f(x) = (2ax + b)^2 - D",
    },
    {
      type: "text",
      content:
        "If $D < 0$, the right side is a square plus something positive, so $a f(x) > 0$ for **every** real $x$: $f(x)$ always has the same sign as $a$. If $D = 0$, $a f(x) \\ge 0$ with equality only at $x = -\\frac{b}{2a}$. If $D > 0$, $a f(x)$ is negative between the roots and positive outside them.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Sign of a quadratic for all real x",
      content:
        "For $f(x) = ax^2 + bx + c$ with real coefficients:\n\n- $f(x) > 0$ for all real $x$ $\\iff$ $a > 0$ and $D < 0$\n- $f(x) \\ge 0$ for all real $x$ $\\iff$ $a > 0$ and $D \\le 0$\n- $f(x) < 0$ for all real $x$ $\\iff$ $a < 0$ and $D < 0$\n- $f(x) \\le 0$ for all real $x$ $\\iff$ $a < 0$ and $D \\le 0$\n\nWhen $a$ contains a parameter, check $a = 0$ separately: then $f$ is linear, and $bx + c$ keeps one sign for all $x$ only if $b = 0$.",
    },
    {
      type: "interactive",
      config: {
        component: "cq-quadratic-explorer",
        a: { min: -3, max: 3, step: 0.5, initial: 1 },
        b: { min: -6, max: 6, step: 0.5, initial: -2 },
        c: { min: -6, max: 6, step: 0.5, initial: 2 },
        showSign: true,
        readouts: ["discriminant", "roots", "vertex", "range"],
        caption:
          "The x-axis is coloured green where $f(x) > 0$ and red where $f(x) < 0$. Start with $D < 0$ (all green), then lower $c$: a red stretch opens up between the roots the moment $D$ turns positive. Flip $a$ negative and every colour flips.",
      },
    },
    {
      type: "worked-example",
      id: "cq1-2-we1",
      title: "Worked example 1: positive for every x",
      problem: "Find all real $k$ for which $x^2 + 2(k - 1)x + (k + 5) > 0$ for every real $x$.",
      steps: [
        { text: "The leading coefficient is $1 > 0$, so we only need $D < 0$." },
        { text: "$D = 4(k - 1)^2 - 4(k + 5) < 0 \\iff k^2 - 2k + 1 - k - 5 < 0 \\iff k^2 - 3k - 4 < 0$. *Why this step:* dividing by 4 keeps the inequality, and it leaves a quadratic inequality in $k$." },
        { text: "$(k - 4)(k + 1) < 0$ holds between the roots: $-1 < k < 4$." },
      ],
      answer: "$k \\in (-1, 4)$.",
    },
    {
      type: "worked-example",
      id: "cq1-2-we2",
      title: "Worked example 2: negative for every x, with a parameter in a",
      problem: "Find all real $k$ for which $(k - 2)x^2 + 8x + k + 4 < 0$ for every real $x$.",
      steps: [
        { text: "Case $k = 2$: the expression is $8x + 6$, which is positive for large $x$. Reject. *Why this step:* the sign rule above assumes a genuine quadratic, so the degenerate value of the parameter must be checked by hand." },
        { text: "Otherwise we need $k - 2 < 0$, i.e. $k < 2$, and $D < 0$." },
        { text: "$D = 64 - 4(k - 2)(k + 4) < 0 \\iff 16 < k^2 + 2k - 8 \\iff k^2 + 2k - 24 > 0 \\iff (k + 6)(k - 4) > 0$, so $k < -6$ or $k > 4$." },
        { text: "Intersect with $k < 2$: only $k < -6$ survives." },
      ],
      answer: "$k < -6$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"always positive just means D < 0\"",
      content:
        "$D < 0$ only says the graph never meets the x-axis. It may lie entirely **below** it: $-x^2 + x - 1$ has $D = -3 < 0$ and is negative everywhere. Always check the sign of $a$ too, and check the value of the parameter that makes $a = 0$.",
    },
    { type: "heading", text: "Maximum and minimum values" },
    {
      type: "text",
      content:
        "On the whole real line the vertex is the only turning point, and the vertex form $a\\left(x + \\frac{b}{2a}\\right)^2 - \\frac{D}{4a}$ shows its height directly:",
    },
    {
      type: "math",
      latex:
        "a > 0:\\ \\min_{x \\in \\mathbb{R}} f(x) = -\\frac{D}{4a} \\text{ at } x = -\\frac{b}{2a}, \\qquad a < 0:\\ \\max_{x \\in \\mathbb{R}} f(x) = -\\frac{D}{4a}",
    },
    {
      type: "text",
      content:
        "On a closed interval $[p, q]$ the picture decides. If the vertex lies inside $[p, q]$, one extreme is at the vertex and the other at whichever endpoint is farther from the axis. If the vertex lies outside, $f$ is monotonic on $[p, q]$ and both extremes are at the endpoints.",
    },
    {
      type: "worked-example",
      id: "cq1-2-we3",
      title: "Worked example 3: extremes on an interval",
      problem: "Find the greatest and least values of $f(x) = x^2 - 4x + 1$ on (a) $[-1, 3]$ and (b) $[3, 5]$.",
      steps: [
        { text: "The vertex is at $x = 2$ with $f(2) = -3$." },
        { text: "(a) $2 \\in [-1, 3]$, so the least value is $f(2) = -3$. Compare endpoints for the greatest: $f(-1) = 6$, $f(3) = -2$. *Why this step:* the endpoint farther from the axis $x = 2$ is $-1$ (distance 3, against 1), and a parabola rises with distance from its axis." },
        { text: "(b) $2 \\notin [3, 5]$, and on $[3, 5]$ the cup is rising, so least $f(3) = -2$ and greatest $f(5) = 6$." },
      ],
      answer: "(a) greatest $6$, least $-3$. (b) greatest $6$, least $-2$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the minimum on [p, q] is always at the vertex\"",
      content:
        "Only if the vertex is inside the interval. In part (b) above, $f(2) = -3$ is never reached on $[3, 5]$: the answer $-3$ would be wrong. Sketch the parabola, shade the interval, and look.",
    },
    { type: "heading", text: "Range of a quadratic over quadratic" },
    {
      type: "text",
      content:
        "To find every value $y$ taken by $\\frac{x^2 + px + q}{x^2 + rx + s}$, ask the reverse question: for which $y$ does $y = \\frac{x^2 + px + q}{x^2 + rx + s}$ have a **real** solution $x$? Cross-multiplying gives a quadratic in $x$ whose coefficients involve $y$, and a real solution exists exactly when its discriminant is $\\ge 0$ (plus a separate look at the value of $y$ that kills the $x^2$ term, and at any $x$ that makes the denominator zero).",
    },
    {
      type: "worked-example",
      id: "cq1-2-we4",
      title: "Worked example 4: the D ≥ 0 method for a range",
      problem: "Find the range of $y = \\dfrac{x^2 - x + 1}{x^2 + x + 1}$ for real $x$.",
      steps: [
        { text: "The denominator has discriminant $1 - 4 < 0$, so it is never zero and $y$ is defined for every real $x$." },
        { text: "Cross-multiply: $y(x^2 + x + 1) = x^2 - x + 1$, i.e. $(y - 1)x^2 + (y + 1)x + (y - 1) = 0$." },
        { text: "For $y \\ne 1$ this quadratic in $x$ has a real root iff $D \\ge 0$: $(y + 1)^2 - 4(y - 1)^2 \\ge 0$. *Why this step:* $y$ is in the range exactly when some real $x$ produces it." },
        { text: "Factor as a difference of squares: $(y + 1 - 2y + 2)(y + 1 + 2y - 2) \\ge 0$, i.e. $(3 - y)(3y - 1) \\ge 0$, so $\\frac13 \\le y \\le 3$." },
        { text: "Check $y = 1$ separately: the equation becomes $2x = 0$, so $x = 0$ gives $y = 1$, which is inside $[\\frac13, 3]$ anyway." },
      ],
      answer: "Range $\\left[\\frac13, 3\\right]$ (the ends are reached at $x = 1$ and $x = -1$).",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "cq1-2-q1",
      variant: "practice",
      question: "For real $x$, the expression $x^2 - 4x + 7$ is",
      options: [
        { text: "always positive", correct: true, feedback: "$a = 1 > 0$ and $D = 16 - 28 < 0$. Indeed $x^2 - 4x + 7 = (x - 2)^2 + 3 \\ge 3$." },
        { text: "positive only for $x > 2$", feedback: "The vertex $(2, 3)$ is above the axis and the cup opens upward, so it is positive on both sides." },
        { text: "negative between its roots", feedback: "It has no real roots: $D = -12$." },
        { text: "sometimes zero", feedback: "Zero would need a real root, and $D < 0$." },
      ],
      hint: "Find $a$ and $D$, or complete the square.",
    },
    {
      type: "numeric",
      id: "cq1-2-q2",
      variant: "practice",
      question: "Find the minimum value of $2x^2 + 12x + 23$ over all real $x$.",
      answer: 5,
      hint: "The minimum is at $x = -\\frac{b}{2a} = -3$.",
      solution: "$f(-3) = 18 - 36 + 23 = 5$. Check: $D = 144 - 184 = -40$, $-\\frac{D}{4a} = \\frac{40}{8} = 5$.",
      commonMistakes: [
        { answer: 23, feedback: "23 is $f(0)$. The minimum is at the vertex $x = -3$." },
        { answer: -5, feedback: "Sign slip: $-\\frac{D}{4a}$ with $D = -40$ is $+5$." },
        { answer: 77, feedback: "That is $f(3)$. The axis is at $x = -3$." },
      ],
    },
    {
      type: "numeric",
      id: "cq1-2-q3",
      variant: "practice",
      question: "Find the maximum value of $-x^2 + 6x - 5$ over all real $x$.",
      answer: 4,
      hint: "With $a < 0$ the vertex is the highest point.",
      solution: "Axis $x = 3$, $f(3) = -9 + 18 - 5 = 4$. In factored form $-(x - 1)(x - 5)$: roots 1 and 5, peak midway at 3.",
      commonMistakes: [
        { answer: -5, feedback: "$-5$ is $f(0)$, not the peak." },
        { answer: 3, feedback: "3 is where the maximum occurs, not the maximum value." },
      ],
    },
    {
      type: "quiz",
      id: "cq1-2-q4",
      variant: "practice",
      question: "For which $k$ is $x^2 + kx + 4 > 0$ for every real $x$?",
      options: [
        { text: "$-4 < k < 4$", correct: true, feedback: "$D = k^2 - 16 < 0$ with $a = 1 > 0$." },
        { text: "$-4 \\le k \\le 4$", feedback: "At $k = \\pm 4$, $D = 0$ and the expression is a perfect square that equals 0 somewhere. That gives $\\ge 0$, not $> 0$." },
        { text: "$k < -4$ or $k > 4$", feedback: "That is $D > 0$: two real roots and a negative stretch between them." },
        { text: "$-2 < k < 2$", feedback: "Those values work, but so does $k = 3$: $D = 9 - 16 < 0$." },
      ],
      hint: "Leading coefficient is positive, so you need only $D < 0$.",
    },
    {
      type: "quiz",
      id: "cq1-2-q5",
      variant: "concept",
      multiple: true,
      question: "Which of these expressions are **negative for every real** $x$? Select all that apply.",
      options: [
        { text: "$-x^2 + x - 1$", correct: true, feedback: "$a = -1 < 0$ and $D = 1 - 4 < 0$." },
        { text: "$-2x^2 + 4x - 2$", feedback: "This is $-2(x - 1)^2$, which equals 0 at $x = 1$. It is $\\le 0$, not $< 0$." },
        { text: "$-x^2 - 3$", correct: true, feedback: "$-x^2 \\le 0$, so $-x^2 - 3 \\le -3 < 0$." },
        { text: "$x^2 - x - 1$", feedback: "$a > 0$: it is positive for large $x$." },
        { text: "$-3x^2 + 2x - 1$", correct: true, feedback: "$a < 0$ and $D = 4 - 12 < 0$." },
      ],
      hint: "Each one needs $a < 0$ and $D < 0$ (strictly).",
    },
    {
      type: "numeric",
      id: "cq1-2-q6",
      variant: "practice",
      question: "Find the least value of $f(x) = x^2 - 6x + 10$ on the interval $[4, 7]$.",
      answer: 2,
      hint: "Where is the vertex? Is it inside $[4, 7]$?",
      solution: "The vertex is at $x = 3$, outside $[4, 7]$. On $[4, 7]$ the cup is rising, so the least value is $f(4) = 16 - 24 + 10 = 2$.",
      commonMistakes: [
        { answer: 1, feedback: "1 is $f(3)$, the vertex value, but $x = 3$ is not in $[4, 7]$." },
        { answer: 17, feedback: "17 is $f(7)$, the greatest value on the interval." },
      ],
    },
    {
      type: "numeric",
      id: "cq1-2-q7",
      variant: "practice",
      question: "Find the greatest value of $f(x) = x^2 - 2x - 3$ on $[0, 5]$.",
      answer: 12,
      hint: "The vertex is a minimum here. The maximum is at an endpoint: which one is farther from the axis?",
      solution: "Axis $x = 1$. The endpoint farther from it is $x = 5$, and $f(5) = 25 - 10 - 3 = 12$ (while $f(0) = -3$).",
      commonMistakes: [
        { answer: -4, feedback: "$-4 = f(1)$ is the least value, at the vertex." },
        { answer: -3, feedback: "$f(0) = -3$, but $x = 5$ is farther from the axis $x = 1$." },
      ],
    },
    {
      type: "quiz",
      id: "cq1-2-q8",
      variant: "practice",
      question: "JEE Main. The range of $y = \\dfrac{x^2 + 2x + 3}{x^2 + 2x + 2}$, $x$ real, is",
      options: [
        { text: "$(1, 2]$", correct: true, feedback: "$y = 1 + \\frac{1}{t}$ with $t = (x + 1)^2 + 1 \\ge 1$, so $\\frac1t \\in (0, 1]$." },
        { text: "$[1, 2]$", feedback: "$y = 1$ would need $\\frac{1}{t} = 0$, which never happens." },
        { text: "$(1, \\infty)$", feedback: "The denominator is at least 1, so $\\frac1t \\le 1$ and $y \\le 2$." },
        { text: "$[2, \\infty)$", feedback: "2 is the largest value, reached at $x = -1$, not the smallest." },
      ],
      hint: "Write the numerator as (denominator) $+ 1$, then find the range of the denominator.",
    },
    {
      type: "numeric",
      id: "cq1-2-q9",
      variant: "practice",
      question:
        "JEE Main. How many integer values of $k$ make $x^2 + 2(k + 1)x + 9k - 5 \\ge 0$ for every real $x$?",
      answer: 6,
      hint: "Leading coefficient 1, so you need $D \\le 0$ (equality allowed because the inequality is $\\ge$).",
      solution: "$\\frac{D}{4} = (k + 1)^2 - (9k - 5) = k^2 - 7k + 6 = (k - 1)(k - 6) \\le 0$, so $1 \\le k \\le 6$: the six integers $1, 2, 3, 4, 5, 6$.",
      commonMistakes: [
        { answer: 4, feedback: "You used $D < 0$. With $\\ge 0$, a double root is allowed, so $k = 1$ and $k = 6$ also count." },
        { answer: 5, feedback: "Count $1, 2, 3, 4, 5, 6$ again: six integers." },
      ],
    },
    {
      type: "quiz",
      id: "cq1-2-q10",
      variant: "practice",
      multiple: true,
      question:
        "Let $f(x) = ax^2 + bx + c$ with real coefficients, $a > 0$ and $b^2 < 4ac$. Which statements must be true? Select all that apply.",
      options: [
        { text: "$f(x) > 0$ for every real $x$", correct: true, feedback: "$a > 0$ and $D < 0$." },
        { text: "$c > 0$", correct: true, feedback: "$c = f(0) > 0$. (Also $4ac > b^2 \\ge 0$ with $a > 0$ forces $c > 0$.)" },
        { text: "$a + b + c > 0$", correct: true, feedback: "$a + b + c = f(1) > 0$." },
        { text: "$a - b + c > 0$", correct: true, feedback: "$a - b + c = f(-1) > 0$." },
        { text: "$b > 0$", feedback: "$b$ can have either sign: $x^2 - x + 1$ has $b = -1$." },
      ],
      hint: "Every expression of the form $f(\\text{number})$ is positive. Spot which options are values of $f$.",
    },
    {
      type: "numeric",
      id: "cq1-2-q11",
      variant: "practice",
      question: "JEE Advanced. For real $x$, find the maximum value of $\\dfrac{3x^2 + 9x + 17}{3x^2 + 9x + 7}$.",
      answer: 41,
      hint: "Write it as $1 + \\frac{10}{3x^2 + 9x + 7}$. The fraction is largest when its positive denominator is smallest.",
      solution: "Let $t = 3x^2 + 9x + 7$. Its least value is at $x = -\\frac32$: $t = \\frac{27}{4} - \\frac{27}{2} + 7 = \\frac14 > 0$. So the expression is at most $1 + \\frac{10}{1/4} = 41$.",
      commonMistakes: [
        { answer: 40, feedback: "Don't forget the 1: the expression is $1 + \\frac{10}{t}$." },
        { answer: 11, feedback: "That takes the least value of $t$ as 1. Compute $t$ at $x = -\\frac32$: it is $\\frac14$." },
      ],
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "location-of-roots",
  title: "1.3 · Location of Roots",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "\"For which $a$ are both roots of $x^2 - 2ax + a^2 + a - 3 = 0$ less than 3?\" You could solve for the roots with the formula and fight the square roots in an inequality. Or you could draw the parabola, put a mark at $x = 3$, and read off three simple conditions. This lesson is about the second way, which JEE rewards every single year.",
    },
    { type: "heading", text: "Three questions you can ask the picture" },
    {
      type: "text",
      content:
        "Let $f(x) = ax^2 + bx + c$ have real roots $\\alpha \\le \\beta$, and let $k$ be a number marked on the x-axis. Assume $a > 0$ for the picture (a cup). Three facts are visible at a glance:\n\n1. **Real roots exist** iff $D \\ge 0$.\n2. **The sign of $f(k)$** tells you whether $k$ is outside the roots ($f(k) > 0$, the cup is above the axis there) or strictly between them ($f(k) < 0$).\n3. **The vertex** $x = -\\frac{b}{2a}$ sits exactly midway between the roots, so comparing it with $k$ tells you **which side** of $k$ the roots are on.",
    },
    {
      type: "text",
      content:
        "If $a < 0$ the cup becomes a cap and every sign of $f$ flips. Multiplying by $a$ undoes the flip, which is why the conditions are written with $a\\,f(k)$: it is positive outside the roots and negative between them, whatever the sign of $a$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Location of roots: the six standard cases",
      content:
        "For $f(x) = ax^2 + bx + c$ with roots $\\alpha \\le \\beta$, and numbers $k$, $k_1 < k_2$:\n\n- **Both roots greater than $k$:** $D \\ge 0$, $a\\,f(k) > 0$, $-\\frac{b}{2a} > k$\n- **Both roots less than $k$:** $D \\ge 0$, $a\\,f(k) > 0$, $-\\frac{b}{2a} < k$\n- **$k$ strictly between the roots:** $a\\,f(k) < 0$ (this alone forces $D > 0$)\n- **Both roots in $(k_1, k_2)$:** $D \\ge 0$, $a\\,f(k_1) > 0$, $a\\,f(k_2) > 0$, $k_1 < -\\frac{b}{2a} < k_2$\n- **Exactly one root in $(k_1, k_2)$:** $f(k_1)\\,f(k_2) < 0$\n- **$k_1$ and $k_2$ both between the roots:** $a\\,f(k_1) < 0$ and $a\\,f(k_2) < 0$",
    },
    {
      type: "interactive",
      config: {
        component: "cq-quadratic-explorer",
        a: { min: -3, max: 3, step: 0.5, initial: 1 },
        b: { min: -6, max: 6, step: 0.5, initial: -4 },
        c: { min: -6, max: 6, step: 0.5, initial: 2 },
        markers: { k1: { min: -5, max: 5, step: 0.5, initial: 0 } },
        readouts: ["discriminant", "roots", "vertex"],
        caption:
          "Slide $k$ and watch the checklist. Try to make $D \\ge 0$ and $a\\,f(k) > 0$ true while the roots are actually on the **wrong** side of $k$: the vertex condition is the one that catches it.",
      },
    },
    {
      type: "text",
      content:
        "Each condition is doing a job the others cannot. $a\\,f(k) > 0$ alone says $k$ is not between the roots, but the roots might both be to its left or both to its right; the vertex decides. $D \\ge 0$ is needed because a cup floating above the axis also has $f(k) > 0$ and a vertex somewhere, yet has no real roots at all.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Special case k = 0: signs of the roots",
      content:
        "With $k = 0$, $a\\,f(0) = ac$ and the conditions become Vieta statements:\n\n- roots of **opposite signs** iff $\\frac{c}{a} < 0$\n- **both positive** iff $D \\ge 0$, $\\frac{c}{a} > 0$, $-\\frac{b}{a} > 0$\n- **both negative** iff $D \\ge 0$, $\\frac{c}{a} > 0$, $-\\frac{b}{a} < 0$",
    },
    { type: "heading", text: "Worked examples" },
    {
      type: "worked-example",
      id: "cq1-3-we1",
      title: "Worked example 1: both roots in an interval",
      problem: "Find all real $m$ for which both roots of $x^2 - 2mx + m^2 - 1 = 0$ lie in $(-2, 4)$.",
      steps: [
        { text: "$D = 4m^2 - 4(m^2 - 1) = 4 > 0$ for every $m$, so the roots are always real." },
        { text: "$f(-2) = 4 + 4m + m^2 - 1 = (m + 1)(m + 3) > 0$ gives $m < -3$ or $m > -1$." },
        { text: "$f(4) = 16 - 8m + m^2 - 1 = (m - 3)(m - 5) > 0$ gives $m < 3$ or $m > 5$." },
        { text: "Vertex: $-2 < m < 4$. *Why this step:* without it, $m = 6$ would pass the two $f$-tests with both roots to the right of 4." },
        { text: "Intersect all four: $-1 < m < 3$. Check directly: the roots are $m \\pm 1$, and $m - 1 > -2$, $m + 1 < 4$ give the same interval." },
      ],
      answer: "$m \\in (-1, 3)$.",
    },
    {
      type: "worked-example",
      id: "cq1-3-we2",
      title: "Worked example 2: both roots less than a number",
      problem: "Find all real $a$ for which both roots of $x^2 - 2ax + a^2 + a - 3 = 0$ are less than 3.",
      steps: [
        { text: "$\\frac{D}{4} = a^2 - (a^2 + a - 3) = 3 - a \\ge 0$, so $a \\le 3$." },
        { text: "$f(3) = 9 - 6a + a^2 + a - 3 = a^2 - 5a + 6 = (a - 2)(a - 3) > 0$, so $a < 2$ or $a > 3$." },
        { text: "Vertex left of 3: $a < 3$." },
        { text: "Intersect: $a < 2$. *Why this step:* the value $a = 2.5$ passes $D$ and the vertex test, but then $f(3) < 0$ puts 3 between the roots, so one root exceeds 3." },
      ],
      answer: "$a < 2$.",
    },
    {
      type: "worked-example",
      id: "cq1-3-we3",
      title: "Worked example 3: a number between the roots",
      problem: "Find all $a$ for which 2 lies strictly between the roots of $x^2 + 2(a - 3)x + 9 = 0$.",
      steps: [
        { text: "Only one condition is needed: $a\\,f(2) < 0$ with leading coefficient 1. *Why this step:* if the cup dips below the axis at $x = 2$, it must cross the axis on both sides of 2, so real roots and their position come for free." },
        { text: "$f(2) = 4 + 4(a - 3) + 9 = 4a + 1 < 0$." },
      ],
      answer: "$a < -\\frac14$.",
    },
    {
      type: "worked-example",
      id: "cq1-3-we4",
      title: "Worked example 4: exactly one root in an interval",
      problem: "Find all $m$ for which $x^2 - mx + 1 = 0$ has exactly one root in $(1, 2)$.",
      steps: [
        { text: "Exactly one root in $(k_1, k_2)$ (and neither endpoint a root) iff $f(k_1)$ and $f(k_2)$ have opposite signs: the graph crosses the axis an odd number of times, so once, in between." },
        { text: "$f(1) = 2 - m$ and $f(2) = 5 - 2m$. Need $(2 - m)(5 - 2m) < 0$, i.e. $2 < m < \\frac52$." },
        { text: "Check $m = 2.2$: the roots are about $0.64$ and $1.56$, and exactly one lies in $(1, 2)$." },
      ],
      answer: "$2 < m < \\frac52$.",
    },
    {
      type: "interactive",
      config: {
        component: "cq-quadratic-explorer",
        a: { min: -3, max: 3, step: 0.5, initial: 1 },
        b: { min: -6, max: 6, step: 0.5, initial: -3 },
        c: { min: -6, max: 6, step: 0.5, initial: 1 },
        markers: {
          k1: { min: -5, max: 5, step: 0.5, initial: 0 },
          k2: { min: -5, max: 5, step: 0.5, initial: 4 },
        },
        readouts: ["discriminant", "roots", "vertex"],
        caption:
          "Now there are two marks. Find settings where both roots are inside $(k_1, k_2)$, then drag $k_2$ left past a root: the first case fails and the \"exactly one root\" case switches on, signalled by $f(k_1)$ and $f(k_2)$ having opposite signs.",
      },
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"D ≥ 0 and a·f(k) > 0 are enough for both roots greater than k\"",
      content:
        "Those two conditions are equally true when both roots are **less** than $k$. For $f(x) = x^2 - 2x$ and $k = 3$: $D = 4 > 0$, $f(3) = 3 > 0$, yet the roots are 0 and 2, both below 3. The vertex condition $-\\frac{b}{2a} > k$ fails here ($1 < 3$) and saves you.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"f(k₁)·f(k₂) < 0 means both roots lie in the interval\"",
      content:
        "Opposite signs at the ends mean the graph crosses the axis an **odd** number of times between them, which for a quadratic means exactly once. If both roots are inside, $f(k_1)$ and $f(k_2)$ have the **same** sign. Also watch the endpoints: if $f(k_1) = 0$, then $k_1$ is a root and the product test says nothing, so check such values by hand.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "cq1-3-q1",
      variant: "concept",
      question: "The number $k$ lies strictly between the roots of $ax^2 + bx + c = 0$ (real coefficients, $a \\ne 0$) if and only if",
      options: [
        { text: "$a\\,f(k) < 0$", correct: true, feedback: "The graph is on the opposite side of the axis from its opening at $x = k$, which happens only between the roots." },
        { text: "$f(k) < 0$", feedback: "True for $a > 0$, but for a downward parabola $f$ is **positive** between the roots." },
        { text: "$D > 0$ and $f(k) < 0$", feedback: "Same problem: the sign of $f(k)$ must be compared with the sign of $a$. And $D > 0$ is automatic once $a\\,f(k) < 0$." },
        { text: "$-\\frac{b}{2a} = k$", feedback: "That says $k$ is the midpoint, a special case, not the condition." },
      ],
      hint: "Picture both a cup and a cap. What sign does $f$ have between the roots in each case?",
    },
    {
      type: "quiz",
      id: "cq1-3-q2",
      variant: "practice",
      question: "The roots of $x^2 - (m - 3)x + m = 0$ are real and of opposite signs exactly when",
      options: [
        { text: "$m < 0$", correct: true, feedback: "Opposite signs iff the product $\\frac{c}{a} = m < 0$. Then $D = (m - 3)^2 - 4m > 0$ automatically." },
        { text: "$m > 0$", feedback: "A positive product means the roots (if real) have the **same** sign." },
        { text: "$m < 3$", feedback: "$m = 1$ gives product 1 > 0, so the roots cannot have opposite signs." },
        { text: "$m > 9$", feedback: "That comes from $D > 0$ alone, which does not decide the signs." },
      ],
      hint: "Use $k = 0$: $0$ lies between the roots iff $a\\,f(0) = ac < 0$.",
    },
    {
      type: "quiz",
      id: "cq1-3-q3",
      variant: "concept",
      multiple: true,
      question:
        "For $a > 0$, which conditions together are needed for **both** roots of $ax^2 + bx + c = 0$ to be greater than 1? Select every condition that belongs to the set.",
      options: [
        { text: "$b^2 - 4ac \\ge 0$", correct: true, feedback: "Without real roots there is nothing to locate." },
        { text: "$a + b + c > 0$", correct: true, feedback: "$a + b + c = f(1)$, and with $a > 0$ we need $a\\,f(1) > 0$: the point 1 is outside the roots." },
        { text: "$-\\frac{b}{2a} > 1$", correct: true, feedback: "The vertex, midway between the roots, must be to the right of 1." },
        { text: "$c < 0$", feedback: "$c < 0$ would put 0 between the roots, so one root would be negative." },
        { text: "$a + b + c < 0$", feedback: "That would put 1 between the roots." },
      ],
      hint: "Translate \"both roots greater than $k$\" into the three standard conditions with $k = 1$.",
    },
    {
      type: "numeric",
      id: "cq1-3-q4",
      variant: "practice",
      question: "How many integers $k$ make both roots of $x^2 - 2kx + k^2 - 4 = 0$ lie in $(-3, 5)$?",
      answer: 3,
      hint: "Factor: $(x - k)^2 = 4$. The roots are $k - 2$ and $k + 2$.",
      solution: "Need $k - 2 > -3$ and $k + 2 < 5$, so $-1 < k < 3$: the integers 0, 1, 2. (The standard conditions give the same: $f(-3) = (k + 1)(k + 5) > 0$, $f(5) = (k - 3)(k - 7) > 0$, $-3 < k < 5$.)",
      commonMistakes: [
        { answer: 5, feedback: "The interval is open, and $k = -1$ or $k = 3$ puts a root exactly on an endpoint." },
        { answer: 4, feedback: "List them: $k \\in (-1, 3)$ contains 0, 1, 2 only." },
      ],
    },
    {
      type: "quiz",
      id: "cq1-3-q5",
      variant: "practice",
      question: "For which $a$ are both roots of $x^2 - 2(a - 1)x + (2a + 1) = 0$ positive?",
      options: [
        { text: "$a \\ge 4$", correct: true, feedback: "$\\frac D4 = a^2 - 4a \\ge 0$ gives $a \\le 0$ or $a \\ge 4$. Product $2a + 1 > 0$ and sum $2(a - 1) > 0$ need $a > 1$. Together: $a \\ge 4$." },
        { text: "$a > 1$", feedback: "$a = 2$ gives $D = 4 - 8 < 0$: no real roots at all." },
        { text: "$-\\frac12 < a \\le 0$ or $a \\ge 4$", feedback: "For $a \\in (-\\frac12, 0]$ the sum $2(a - 1)$ is negative, so the roots are both negative." },
        { text: "$a > 4$", feedback: "At $a = 4$, $D = 0$ and the double root is $x = 3 > 0$, so $a = 4$ works." },
      ],
      hint: "Three conditions: $D \\ge 0$, product $> 0$, sum $> 0$.",
    },
    {
      type: "numeric",
      id: "cq1-3-q6",
      variant: "practice",
      question: "Find the greatest integer $k$ for which both roots of $x^2 - 2kx + k^2 + k - 5 = 0$ are less than 5.",
      answer: 3,
      hint: "Use $D \\ge 0$, $f(5) > 0$ and vertex $k < 5$, then take the largest integer in the intersection.",
      solution: "$\\frac D4 = 5 - k \\ge 0$ gives $k \\le 5$. $f(5) = k^2 - 9k + 20 = (k - 4)(k - 5) > 0$ gives $k < 4$ or $k > 5$. Vertex: $k < 5$. Together $k < 4$, so the greatest integer is 3.",
      commonMistakes: [
        { answer: 5, feedback: "You used only $D \\ge 0$. At $k = 5$, $f(5) = 0$, so 5 is itself a root." },
        { answer: 4, feedback: "At $k = 4$, $f(5) = 0$: one root equals 5, which is not less than 5." },
      ],
    },
    {
      type: "quiz",
      id: "cq1-3-q7",
      variant: "practice",
      question: "The number 3 lies between the roots of $x^2 + 2(k - 1)x + k + 5 = 0$ exactly when",
      options: [
        { text: "$k < -\\frac87$", correct: true, feedback: "$f(3) = 9 + 6k - 6 + k + 5 = 7k + 8 < 0$." },
        { text: "$k > -\\frac87$", feedback: "That makes $f(3) > 0$: 3 is outside the roots (or there are no roots)." },
        { text: "$k < -1$", feedback: "$k = -1.1$ gives $f(3) = 0.3 > 0$. Solve $7k + 8 < 0$ exactly." },
        { text: "$-\\frac87 < k < 0$", feedback: "$f(3) = 7k + 8$ is positive there." },
      ],
      hint: "Leading coefficient 1, so you need $f(3) < 0$, and nothing else.",
    },
    {
      type: "quiz",
      id: "cq1-3-q8",
      variant: "concept",
      multiple: true,
      question:
        "A quadratic $f$ with real coefficients satisfies $f(1)\\,f(2) < 0$. Which statements must be true? Select all that apply.",
      options: [
        { text: "Exactly one root of $f$ lies in $(1, 2)$", correct: true, feedback: "The graph changes sign between 1 and 2, so it crosses an odd number of times, which for a quadratic is once." },
        { text: "The roots are real and distinct", correct: true, feedback: "A sign change forces a crossing, so $D > 0$." },
        { text: "Both roots lie in $(1, 2)$", feedback: "Then $f(1)$ and $f(2)$ would have the same sign." },
        { text: "The other root lies outside $[1, 2]$", correct: true, feedback: "It is not in $(1, 2)$, and neither 1 nor 2 is a root because $f(1), f(2) \\ne 0$." },
        { text: "$f$ opens upward", feedback: "Nothing here fixes the sign of $a$." },
      ],
      hint: "Sketch a parabola that is below the axis at 1 and above it at 2. How many times can it cross in between?",
    },
    {
      type: "quiz",
      id: "cq1-3-q9",
      variant: "practice",
      question: "JEE Main. Both roots of $x^2 - 6mx + 9m^2 - 2m + 2 = 0$ exceed 3 exactly when",
      options: [
        { text: "$m > \\frac{11}{9}$", correct: true, feedback: "$\\frac D4 = 2m - 2 \\ge 0$, $f(3) = (9m - 11)(m - 1) > 0$, vertex $3m > 3$. Intersection: $m > \\frac{11}{9}$." },
        { text: "$m \\ge 1$", feedback: "That is only $D \\ge 0$. For $m = 1.1$, $f(3) < 0$, so 3 is between the roots." },
        { text: "$1 < m < \\frac{11}{9}$", feedback: "There $f(3) < 0$: 3 lies between the roots." },
        { text: "$m < 1$", feedback: "Then $D < 0$ and there are no real roots." },
      ],
      hint: "Write $D \\ge 0$, $f(3) > 0$ and $-\\frac{b}{2a} > 3$, and intersect.",
    },
    {
      type: "quiz",
      id: "cq1-3-q10",
      variant: "practice",
      multiple: true,
      question:
        "JEE Advanced. Let $f(x) = x^2 + 2(a - 1)x + a + 5$. Which statements are true? Select all that apply.",
      options: [
        { text: "Both roots lie in $(1, 3)$ iff $-\\frac87 < a \\le -1$", correct: true, feedback: "$D \\ge 0$: $(a - 4)(a + 1) \\ge 0$. $f(1) = 3a + 4 > 0$, $f(3) = 7a + 8 > 0$, and $1 < 1 - a < 3$ means $-2 < a < 0$. The intersection is $(-\\frac87, -1]$." },
        { text: "Exactly one root lies in $(1, 3)$ iff $-\\frac43 < a < -\\frac87$", correct: true, feedback: "$(3a + 4)(7a + 8) < 0$." },
        { text: "Both 1 and 3 lie between the roots iff $a < -\\frac43$", correct: true, feedback: "$f(1) < 0$ and $f(3) < 0$: $a < -\\frac43$ and $a < -\\frac87$, so $a < -\\frac43$." },
        { text: "For $a = 0$ both roots lie in $(1, 3)$", feedback: "At $a = 0$, $f(x) = x^2 - 2x + 5$ has $D = 4 - 20 < 0$: no real roots." },
      ],
      hint: "Compute once: $\\frac D4 = (a - 4)(a + 1)$, $f(1) = 3a + 4$, $f(3) = 7a + 8$, vertex $1 - a$. Then test each statement against the standard cases.",
    },
    {
      type: "numeric",
      id: "cq1-3-q11",
      variant: "practice",
      question:
        "JEE Main. One root of $x^2 - (k + 1)x + k^2 + k - 8 = 0$ is greater than 2 and the other is less than 2. How many integer values can $k$ take?",
      answer: 4,
      hint: "\"2 lies between the roots\" needs only $f(2) < 0$.",
      solution: "$f(2) = 4 - 2k - 2 + k^2 + k - 8 = k^2 - k - 6 = (k - 3)(k + 2) < 0$, so $-2 < k < 3$: integers $-1, 0, 1, 2$.",
      commonMistakes: [
        { answer: 6, feedback: "The inequality is strict: at $k = -2$ or $k = 3$, 2 is itself a root." },
        { answer: 5, feedback: "Count $-1, 0, 1, 2$: four integers lie strictly between $-2$ and 3." },
      ],
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "common-roots-of-two-quadratics",
  title: "1.4 · Common Roots of Two Quadratics",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "Two parabolas $y = f(x)$ and $y = g(x)$ share a root when they cross the x-axis at the **same** point. Algebraically that is a pair of equations in one unknown, $f(\\alpha) = 0$ and $g(\\alpha) = 0$, and the trick is to treat $\\alpha^2$ and $\\alpha$ as two separate unknowns and eliminate.",
    },
    { type: "heading", text: "One common root: eliminate α² and α" },
    {
      type: "text",
      content: "Suppose $\\alpha$ satisfies both",
    },
    {
      type: "math",
      latex: "a_1\\alpha^2 + b_1\\alpha + c_1 = 0, \\qquad a_2\\alpha^2 + b_2\\alpha + c_2 = 0",
    },
    {
      type: "text",
      content:
        "Read these as two linear equations in the unknowns $\\alpha^2$ and $\\alpha$. Cross-multiplication (Cramer's rule) solves them:",
    },
    {
      type: "math",
      latex:
        "\\frac{\\alpha^2}{b_1c_2 - b_2c_1} = \\frac{\\alpha}{c_1a_2 - c_2a_1} = \\frac{1}{a_1b_2 - a_2b_1}",
    },
    {
      type: "text",
      content:
        "So $\\alpha = \\frac{c_1a_2 - c_2a_1}{a_1b_2 - a_2b_1}$ and $\\alpha^2 = \\frac{b_1c_2 - b_2c_1}{a_1b_2 - a_2b_1}$. The square of the first must equal the second, which gives the condition for a common root:",
    },
    {
      type: "math",
      latex: "(c_1a_2 - c_2a_1)^2 = (a_1b_2 - a_2b_1)(b_1c_2 - b_2c_1)",
    },
    {
      type: "callout",
      variant: "tip",
      title: "In practice: subtract",
      content:
        "You rarely need the formula. Scale the equations so the $x^2$ terms match and subtract: the difference is **linear**, so it gives $\\alpha$ directly. Substitute that $\\alpha$ back into either equation to get the condition on the parameter. Always finish by checking the root in both equations.",
    },
    {
      type: "worked-example",
      id: "cq1-4-we1",
      title: "Worked example 1: subtract, then substitute",
      problem: "For $k > 0$, the equations $x^2 - kx - 21 = 0$ and $x^2 - 3kx + 35 = 0$ have a common root. Find $k$ and the common root.",
      steps: [
        { text: "Subtract the second from the first: $2kx - 56 = 0$, so $\\alpha = \\frac{28}{k}$. *Why this step:* the $x^2$ terms are equal, so subtraction kills them and leaves a linear equation for the shared root." },
        { text: "Substitute into the first: $\\frac{784}{k^2} - 28 - 21 = 0$, so $k^2 = 16$." },
        { text: "With $k > 0$, $k = 4$ and $\\alpha = 7$. Check: $49 - 28 - 21 = 0$ and $49 - 84 + 35 = 0$." },
      ],
      answer: "$k = 4$, common root $7$.",
    },
    {
      type: "worked-example",
      id: "cq1-4-we2",
      title: "Worked example 2: the factor that splits into cases",
      problem: "Find all $a$ for which $x^2 + ax + 1 = 0$ and $x^2 + x + a = 0$ have a common root.",
      steps: [
        { text: "Subtract: $(a - 1)x + (1 - a) = 0$, i.e. $(a - 1)(x - 1) = 0$." },
        { text: "Case $a = 1$: both equations are $x^2 + x + 1 = 0$, so they share **both** roots (the non-real cube roots of unity, Chapter 4). *Why this step:* dividing by $a - 1$ would silently lose this case." },
        { text: "Case $a \\ne 1$: the common root is $x = 1$, and $1 + a + 1 = 0$ gives $a = -2$. Check: $x^2 - 2x + 1 = (x - 1)^2$ and $x^2 + x - 2 = (x - 1)(x + 2)$ both vanish at 1." },
      ],
      answer: "$a = -2$ (one common root, $x = 1$) or $a = 1$ (both roots common).",
    },
    { type: "heading", text: "Both roots common" },
    {
      type: "text",
      content:
        "If the two quadratics have **both** roots $\\alpha, \\beta$ in common, each is a multiple of $(x - \\alpha)(x - \\beta)$, so one is a constant multiple of the other:",
    },
    {
      type: "math",
      latex: "\\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2}",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The non-real-roots shortcut",
      content:
        "If both quadratics have **real** coefficients and one of them has non-real roots, then sharing one root means sharing both. Non-real roots of a real quadratic come as a conjugate pair $p \\pm qi$ (Chapter 2), and if $p + qi$ is a root of the other real quadratic, so is $p - qi$. So the coefficients must be proportional.",
    },
    {
      type: "worked-example",
      id: "cq1-4-we3",
      title: "Worked example 3: proportional coefficients",
      problem: "The equations $x^2 + 2x + 3 = 0$ and $ax^2 + bx + c = 0$ ($a, b, c$ real) have a common root. Find $a : b : c$.",
      steps: [
        { text: "$x^2 + 2x + 3 = 0$ has $D = 4 - 12 < 0$, so its roots are non-real." },
        { text: "The other equation has real coefficients, so it contains the conjugate root too, and therefore both roots. *Why this step:* this is what turns \"a common root\" into \"identical roots\"." },
        { text: "Hence $\\frac a1 = \\frac b2 = \\frac c3$." },
      ],
      answer: "$a : b : c = 1 : 2 : 3$.",
    },
    {
      type: "interactive",
      config: {
        component: "transform-playground",
        baseExpr: "x^2 - 5*x + 6",
        baseLatex: "y = x^2 - 5x + 6",
        expr: "x^2 + k*x + 3",
        exprLatex: "x^2 + kx + 3",
        params: [{ name: "k", min: -6, max: 0, step: 0.5, initial: -2 }],
        window: { xmin: -1, xmax: 6, ymin: -3, ymax: 6 },
      },
    },
    {
      type: "text",
      content:
        "The dashed parabola $x^2 - 5x + 6$ has roots 2 and 3. Slide $k$ until the solid parabola $x^2 + kx + 3$ passes through one of them: at $k = -3.5$ it goes through $x = 2$, and at $k = -4$ through $x = 3$. Notice that the two graphs can cross each other at many other $k$ without sharing a root: a crossing **above** the axis is not a common root.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"every solution of f(x) = g(x) is a common root\"",
      content:
        "Solving $f(x) - g(x) = 0$ finds where the two **graphs** meet, which may be far above or below the x-axis. A common root needs $f(\\alpha) = 0$ **and** $g(\\alpha) = 0$. The difference equation only produces a candidate; substituting it back into one of the original equations is the step that gives the condition.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "cq1-4-q1",
      variant: "concept",
      question: "$a_1x^2 + b_1x + c_1 = 0$ and $a_2x^2 + b_2x + c_2 = 0$ have **both** roots in common exactly when",
      options: [
        { text: "$\\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2}$", correct: true, feedback: "Two quadratics with the same two roots are constant multiples of each other." },
        { text: "$a_1 = a_2$", feedback: "Equal leading coefficients is neither needed ($2x^2 - 2$ and $x^2 - 1$ share both roots) nor enough." },
        { text: "$b_1^2 - 4a_1c_1 = b_2^2 - 4a_2c_2$", feedback: "Equal discriminants only says the roots are equally far apart (after scaling), not that they are the same." },
        { text: "$(c_1a_2 - c_2a_1)^2 = (a_1b_2 - a_2b_1)(b_1c_2 - b_2c_1)$", feedback: "That is the condition for **at least one** common root." },
      ],
      hint: "If both roots are shared, each quadratic is a multiple of $(x - \\alpha)(x - \\beta)$.",
    },
    {
      type: "numeric",
      id: "cq1-4-q2",
      variant: "practice",
      question: "Find the common root of $x^2 - 5x + 6 = 0$ and $x^2 - 7x + 12 = 0$.",
      answer: 3,
      hint: "Subtract the equations to get a linear equation, or factor both.",
      solution: "Subtracting: $2x - 6 = 0$, so $x = 3$. Check: the factors are $(x - 2)(x - 3)$ and $(x - 3)(x - 4)$.",
      commonMistakes: [
        { answer: 2, feedback: "2 is a root of the first only: $4 - 14 + 12 = 2 \\ne 0$." },
        { answer: 4, feedback: "4 is a root of the second only: $16 - 20 + 6 = 2 \\ne 0$." },
      ],
    },
    {
      type: "numeric",
      id: "cq1-4-q3",
      variant: "practice",
      question: "Find the integer value of $k$ for which $x^2 - 3x + 2 = 0$ and $x^2 + kx + 3 = 0$ have a common root.",
      answer: -4,
      hint: "The first equation has roots 1 and 2. Try each in the second.",
      solution: "$x = 1$: $1 + k + 3 = 0$ gives $k = -4$. $x = 2$: $4 + 2k + 3 = 0$ gives $k = -\\frac72$, not an integer. So $k = -4$.",
      commonMistakes: [
        { answer: -3.5, feedback: "That value also works (common root 2), but it is not an integer." },
        { answer: 4, feedback: "Sign slip: $1 + k + 3 = 0$ gives $k = -4$." },
      ],
    },
    {
      type: "numeric",
      id: "cq1-4-q4",
      variant: "practice",
      question: "$x^2 + ax + b = 0$ and $x^2 + bx + a = 0$, with $a \\ne b$, have a common root. Find $a + b$.",
      answer: -1,
      hint: "Subtract: the result factors with $(a - b)$, which is not zero.",
      solution: "Subtracting gives $(a - b)x + (b - a) = 0$, so $(a - b)(x - 1) = 0$ and $x = 1$. Then $1 + a + b = 0$, so $a + b = -1$.",
      commonMistakes: [
        { answer: 1, feedback: "From $1 + a + b = 0$, $a + b = -1$." },
        { answer: 0, feedback: "Substitute the common root $x = 1$ into either equation: $1 + a + b = 0$." },
      ],
    },
    {
      type: "quiz",
      id: "cq1-4-q5",
      variant: "practice",
      multiple: true,
      question:
        "The equations $ax^2 + bx + c = 0$ ($a, b, c$ real) and $x^2 + x + 1 = 0$ have a common root. Which statements are true? Select all that apply.",
      options: [
        { text: "$a = b$", correct: true, feedback: "Both roots are shared, so $a : b : c = 1 : 1 : 1$." },
        { text: "$b = c$", correct: true, feedback: "Same reason: the coefficients are proportional to $1, 1, 1$." },
        { text: "$a + b + c = 3a$", correct: true, feedback: "With $a = b = c$." },
        { text: "$a = -b$", feedback: "That would need $a = b = 0$, which is not a quadratic." },
        { text: "the common root is real", feedback: "$x^2 + x + 1$ has $D = -3 < 0$, so its roots are non-real." },
      ],
      hint: "$x^2 + x + 1 = 0$ has non-real roots. What does that force for a real quadratic sharing one of them?",
    },
    {
      type: "quiz",
      id: "cq1-4-q6",
      variant: "concept",
      question:
        "Which is the correct condition for $a_1x^2 + b_1x + c_1 = 0$ and $a_2x^2 + b_2x + c_2 = 0$ to have a common root?",
      shuffle: false,
      options: [
        { text: "$(c_1a_2 - c_2a_1)^2 = (a_1b_2 - a_2b_1)(b_1c_2 - b_2c_1)$", correct: true, feedback: "Square of $\\alpha$'s numerator equals the product of the other two determinants." },
        { text: "$(a_1b_2 - a_2b_1)^2 = (c_1a_2 - c_2a_1)(b_1c_2 - b_2c_1)$", feedback: "The squared term is the one that gives $\\alpha$ itself: $c_1a_2 - c_2a_1$." },
        { text: "$(b_1c_2 - b_2c_1)^2 = (a_1b_2 - a_2b_1)(c_1a_2 - c_2a_1)$", feedback: "$b_1c_2 - b_2c_1$ belongs to $\\alpha^2$, so it appears to the first power." },
        { text: "$a_1b_2 - a_2b_1 = 0$", feedback: "That makes the cross-multiplication degenerate. It is not the condition." },
      ],
      hint: "From cross-multiplication, $\\alpha = \\frac{c_1a_2 - c_2a_1}{a_1b_2 - a_2b_1}$ and $\\alpha^2 = \\frac{b_1c_2 - b_2c_1}{a_1b_2 - a_2b_1}$. Square the first and equate.",
    },
    {
      type: "numeric",
      id: "cq1-4-q7",
      variant: "practice",
      question: "$2x^2 + kx - 5 = 0$ and $x^2 - 3x - 4 = 0$ have a common root. Find the sum of all possible values of $k$.",
      answer: -9.75,
      tolerance: 0.001,
      hint: "The second equation factors as $(x - 4)(x + 1)$. Put each root into the first.",
      solution: "$x = 4$: $32 + 4k - 5 = 0$, $k = -\\frac{27}{4}$. $x = -1$: $2 - k - 5 = 0$, $k = -3$. Sum: $-\\frac{27}{4} - 3 = -\\frac{39}{4} = -9.75$.",
      commonMistakes: [
        { answer: -3, feedback: "That is the value for the common root $-1$ only. The root 4 gives another $k$." },
        { answer: -6.75, feedback: "That is the value for the root 4 only. Add the other value, $k = -3$." },
      ],
    },
    {
      type: "numeric",
      id: "cq1-4-q8",
      variant: "practice",
      question:
        "JEE Main. The equations $x^2 + 2x + 3\\lambda = 0$ and $2x^2 + 3x + 5\\lambda = 0$ have a **non-zero** common root. Find $\\lambda$.",
      answer: -1,
      hint: "Double the first equation and subtract the second.",
      solution: "$2x^2 + 4x + 6\\lambda - (2x^2 + 3x + 5\\lambda) = x + \\lambda = 0$, so $\\alpha = -\\lambda$. Then $\\lambda^2 - 2\\lambda + 3\\lambda = \\lambda(\\lambda + 1) = 0$. $\\lambda = 0$ gives the root 0, which is excluded, so $\\lambda = -1$ (common root 1).",
      commonMistakes: [
        { answer: 0, feedback: "$\\lambda = 0$ makes the common root $x = 0$, but the question asks for a non-zero root." },
        { answer: 1, feedback: "$\\lambda = 1$ gives $x^2 + 2x + 3$, which has no real roots and does not share one with $2x^2 + 3x + 5$. Recheck the substitution." },
      ],
    },
    {
      type: "quiz",
      id: "cq1-4-q9",
      variant: "practice",
      question:
        "JEE Advanced. The equations $x^2 + bx - 1 = 0$ and $x^2 + x + b = 0$ have a common root different from $-1$. Then $\\lvert b\\rvert$ equals",
      options: [
        { text: "$\\sqrt3$", correct: true, feedback: "Subtracting gives the root $\\frac{b + 1}{b - 1}$. Substituting leads to $b(b^2 + 3) = 0$. $b = 0$ gives the root $-1$, so $b^2 = -3$, $b = \\pm i\\sqrt3$, $\\lvert b\\rvert = \\sqrt3$." },
        { text: "$2$", feedback: "Carry out the substitution: the condition is $b^3 + 3b = 0$." },
        { text: "$3$", feedback: "$b^2 = -3$ gives $\\lvert b\\rvert^2 = 3$, so $\\lvert b\\rvert = \\sqrt3$." },
        { text: "$0$", feedback: "$b = 0$ gives $x^2 - 1$ and $x^2 + x$, whose common root is $-1$, which is excluded." },
      ],
      hint: "Subtract to get $(b - 1)x = 1 + b$. Substitute $x = \\frac{b + 1}{b - 1}$ into $x^2 + x + b = 0$ and clear denominators. $b$ is allowed to be complex.",
    },
    {
      type: "quiz",
      id: "cq1-4-q10",
      variant: "concept",
      multiple: true,
      question: "Let $f$ and $g$ be quadratics with real coefficients. Which statements are true? Select all that apply.",
      options: [
        { text: "If $f$ has non-real roots and $f$, $g$ share a root, they share both roots", correct: true, feedback: "The conjugate of a shared root is also a root of both." },
        { text: "If $f$ and $g$ share both roots, their coefficients are proportional", correct: true, feedback: "Both are multiples of $(x - \\alpha)(x - \\beta)$." },
        { text: "A common root $\\alpha$ satisfies $f(\\alpha) - g(\\alpha) = 0$", correct: true, feedback: "$0 - 0 = 0$, which is why subtraction finds the candidate." },
        { text: "Every root of $f(x) - g(x) = 0$ is a common root", feedback: "It is only where the graphs meet. $f = x^2$ and $g = x^2 + x - 1$ meet at $x = 1$, where $f(1) = 1 \\ne 0$." },
      ],
      hint: "Separate \"necessary\" from \"sufficient\": a common root must make $f - g$ zero, but not conversely.",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "quadratic-and-rational-inequalities-the-wavy-curve-method",
  title: "1.5 · Quadratic and Rational Inequalities: the Wavy-Curve Method",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "An inequality asks \"for which $x$ is this expression positive (or negative)?\" For a quadratic you already know the answer from its picture. For a product or quotient of many factors, like $\\frac{(x - 1)^2(x + 2)}{(x - 3)(x + 4)^3}$, drawing the graph is hard, but you do not need the graph: you need only its **sign**, and the sign changes in a completely predictable way.",
    },
    { type: "heading", text: "Quadratic inequalities from the graph" },
    {
      type: "text",
      content:
        "Make the leading coefficient positive (multiply by $-1$ and flip the inequality if needed), find the roots $\\alpha < \\beta$, and picture the cup:\n\n- $ax^2 + bx + c > 0$ (with $a > 0$, $D > 0$): $x < \\alpha$ or $x > \\beta$, outside the roots\n- $ax^2 + bx + c < 0$: $\\alpha < x < \\beta$, between the roots\n- $D < 0$: the cup never touches the axis, so $> 0$ holds for all $x$ and $< 0$ for none\n- $D = 0$: $a(x - \\alpha)^2 > 0$ for all $x \\ne \\alpha$, and $\\le 0$ only at $x = \\alpha$",
    },
    {
      type: "interactive",
      config: {
        component: "cq-quadratic-explorer",
        a: { min: -3, max: 3, step: 0.5, initial: -1 },
        b: { min: -6, max: 6, step: 0.5, initial: 1 },
        c: { min: -6, max: 6, step: 0.5, initial: 6 },
        showSign: true,
        readouts: ["discriminant", "roots", "factored"],
        caption:
          "This is $-x^2 + x + 6 = -(x - 3)(x + 2)$. Green marks where it is positive: between the roots, because $a < 0$. Flip $a$ to $+1$ and the colours swap. The solution of an inequality is just a colour on this axis.",
      },
    },
    {
      type: "worked-example",
      id: "cq1-5-we1",
      title: "Worked example 1: a cap turned into a cup",
      problem: "Solve $-x^2 + x + 6 \\ge 0$.",
      steps: [
        { text: "Multiply by $-1$ and flip: $x^2 - x - 6 \\le 0$. *Why this step:* with a positive leading coefficient, \"$\\le 0$\" always means \"between the roots\", so there is one picture to remember." },
        { text: "Factor: $(x - 3)(x + 2) \\le 0$." },
        { text: "Between the roots, endpoints included because of $\\le$." },
      ],
      answer: "$-2 \\le x \\le 3$, i.e. $x \\in [-2, 3]$.",
    },
    { type: "heading", text: "The wavy-curve (sign-scheme) method" },
    {
      type: "text",
      content:
        "Consider $P(x) = (x - a_1)^{k_1}(x - a_2)^{k_2}\\cdots(x - a_n)^{k_n}$ with $a_1 < a_2 < \\dots < a_n$. For $x$ larger than every $a_i$, each factor is positive, so $P(x) > 0$. As $x$ moves left past $a_i$, only the factor $(x - a_i)$ changes sign. Raised to the power $k_i$, that flips the sign of $P$ if $k_i$ is **odd** and leaves it alone if $k_i$ is **even**.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Wavy-curve method",
      content:
        "To solve $\\frac{P(x)}{Q(x)} > 0$ (or $\\ge$, $<$, $\\le$):\n\n1. Bring everything to one side and combine into a single fraction. Never cross-multiply.\n2. Factor numerator and denominator into linear factors; make each $x$-coefficient positive. Drop factors that are always positive (like $x^2 + x + 1$).\n3. Mark the zeros of the numerator and denominator on the number line.\n4. Start at the far right with $+$ and move left, switching sign at each point of **odd** multiplicity and keeping it at **even** multiplicity.\n5. Read off the intervals with the required sign. For $\\ge$ or $\\le$ include the zeros of the numerator. **Always exclude** zeros of the denominator.",
    },
    {
      type: "text",
      content:
        "Why can you multiply by $\\frac{Q}{Q}$ in your head but not cross-multiply? Because $\\frac{P}{Q}$ and $P \\cdot Q$ have the same sign wherever $Q \\ne 0$. Multiplying both sides of an inequality by $Q$ is only legal when you know the sign of $Q$, which is exactly what you do not know.",
    },
    {
      type: "worked-example",
      id: "cq1-5-we2",
      title: "Worked example 2: a full sign scheme",
      problem: "Solve $\\dfrac{(x - 1)^2(x + 2)}{(x - 3)(x + 4)^3} \\ge 0$.",
      steps: [
        { text: "Critical points in order: $-4$ (power 3, odd, denominator), $-2$ (power 1, odd, numerator), $1$ (power 2, even, numerator), $3$ (power 1, odd, denominator)." },
        {
          text: "Start with $+$ on the far right and move left.",
          table: {
            headers: ["Interval", "$(-\\infty, -4)$", "$(-4, -2)$", "$(-2, 1)$", "$(1, 3)$", "$(3, \\infty)$"],
            rows: [["Sign", "$-$", "$+$", "$-$", "$-$", "$+$"]],
          },
        },
        { text: "No switch at 1: the factor $(x - 1)^2$ is never negative. *Why this step:* even multiplicity touches the axis without crossing. A spot check at $x = 0$: numerator $1 \\cdot 2 > 0$, denominator $(-3)(64) < 0$, so negative, as the table says." },
        { text: "We want $\\ge 0$: the positive intervals, plus the numerator zeros $-2$ and $1$. Exclude $-4$ and $3$, where the expression is undefined." },
      ],
      answer: "$x \\in (-4, -2] \\cup \\{1\\} \\cup (3, \\infty)$.",
    },
    {
      type: "worked-example",
      id: "cq1-5-we3",
      title: "Worked example 3: never cross-multiply",
      problem: "Solve $\\dfrac{2x - 3}{x + 1} \\ge 1$.",
      steps: [
        { text: "Subtract 1 and combine: $\\frac{2x - 3 - (x + 1)}{x + 1} \\ge 0$, i.e. $\\frac{x - 4}{x + 1} \\ge 0$. *Why this step:* multiplying by $x + 1$ would need its sign, which changes at $x = -1$." },
        { text: "Critical points $-1$ (denominator) and $4$ (numerator). Signs from the right: $+$ on $(4, \\infty)$, $-$ on $(-1, 4)$, $+$ on $(-\\infty, -1)$." },
        { text: "Include 4, exclude $-1$." },
      ],
      answer: "$x \\in (-\\infty, -1) \\cup [4, \\infty)$.",
    },
    {
      type: "worked-example",
      id: "cq1-5-we4",
      title: "Worked example 4: dropping a factor that is always positive",
      problem: "Solve $\\dfrac{(x^2 + x + 1)(x - 2)}{x + 3} < 0$.",
      steps: [
        { text: "$x^2 + x + 1$ has $D = -3 < 0$ and leading coefficient 1, so it is positive for every $x$ and does not affect the sign. Drop it." },
        { text: "Solve $\\frac{x - 2}{x + 3} < 0$: negative between the critical points." },
      ],
      answer: "$-3 < x < 2$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"I can multiply both sides by the denominator\"",
      content:
        "From $\\frac{2x - 3}{x + 1} \\ge 1$, cross-multiplying gives $2x - 3 \\ge x + 1$, i.e. $x \\ge 4$. That throws away every $x < -1$: for $x = -2$, the left side is $\\frac{-7}{-1} = 7 \\ge 1$. When the denominator is negative the inequality should have flipped. Move everything to one side instead.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"cancel the common factor and carry on\"",
      content:
        "In $\\frac{(x - 1)(x + 1)}{(x - 1)(x - 3)} \\ge 0$ you may cancel $x - 1$ to read signs, but $x = 1$ stays **excluded**: the original expression is undefined there. Cancelling changes the domain if you let it.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "cq1-5-q1",
      variant: "practice",
      question: "Solve $x^2 - 7x + 10 \\le 0$.",
      options: [
        { text: "$[2, 5]$", correct: true, feedback: "$(x - 2)(x - 5) \\le 0$: between the roots, endpoints included." },
        { text: "$(2, 5)$", feedback: "The inequality is $\\le$, so the roots themselves satisfy it." },
        { text: "$(-\\infty, 2] \\cup [5, \\infty)$", feedback: "That is where the cup is $\\ge 0$, outside the roots." },
        { text: "$[-5, -2]$", feedback: "The roots of $x^2 - 7x + 10$ are $+2$ and $+5$." },
      ],
      hint: "Factor, then remember: for a cup, \"$\\le 0$\" is between the roots.",
    },
    {
      type: "quiz",
      id: "cq1-5-q2",
      variant: "practice",
      question: "Solve $x^2 + 4x + 5 > 0$.",
      options: [
        { text: "all real $x$", correct: true, feedback: "$D = 16 - 20 < 0$ and $a > 0$: $(x + 2)^2 + 1 > 0$ always." },
        { text: "no real $x$", feedback: "That would be the answer to $x^2 + 4x + 5 < 0$." },
        { text: "$x > -2$", feedback: "The vertex value is $+1$, so both sides of $-2$ are positive too." },
        { text: "$x \\ne -2$", feedback: "That would be right for $(x + 2)^2 > 0$. Here there is an extra $+1$." },
      ],
      hint: "Check $D$ before trying to factor.",
    },
    {
      type: "quiz",
      id: "cq1-5-q3",
      variant: "concept",
      question: "Solve $x^2 - 6x + 9 > 0$.",
      options: [
        { text: "all real $x$ except $x = 3$", correct: true, feedback: "$(x - 3)^2 > 0$ unless $x = 3$." },
        { text: "all real $x$", feedback: "At $x = 3$ the expression is 0, and $0 > 0$ is false." },
        { text: "$x > 3$", feedback: "For $x = 0$ the value is 9 > 0. A square is positive on both sides of its zero." },
        { text: "no real $x$", feedback: "That is the answer to $(x - 3)^2 < 0$." },
      ],
      hint: "Write it as a perfect square. When is a square strictly positive?",
    },
    {
      type: "numeric",
      id: "cq1-5-q4",
      variant: "practice",
      question: "How many integers satisfy $(x + 3)(x - 4) < 0$?",
      answer: 6,
      hint: "The solution is the open interval between the roots.",
      solution: "$-3 < x < 4$: the integers $-2, -1, 0, 1, 2, 3$, six of them.",
      commonMistakes: [
        { answer: 8, feedback: "The inequality is strict, so $-3$ and $4$ are excluded." },
        { answer: 7, feedback: "List them from $-2$ to $3$: that is six numbers." },
      ],
    },
    {
      type: "quiz",
      id: "cq1-5-q5",
      variant: "practice",
      question: "Solve $\\dfrac{x - 2}{x + 5} \\le 0$.",
      options: [
        { text: "$(-5, 2]$", correct: true, feedback: "Negative between $-5$ and $2$. Include 2 (numerator zero), exclude $-5$ (denominator zero)." },
        { text: "$[-5, 2]$", feedback: "At $x = -5$ the fraction is undefined." },
        { text: "$(-5, 2)$", feedback: "At $x = 2$ the fraction equals 0, which satisfies $\\le 0$." },
        { text: "$(-\\infty, -5) \\cup [2, \\infty)$", feedback: "That is where the fraction is $\\ge 0$." },
      ],
      hint: "Critical points $-5$ and $2$. The fraction is positive to the right of both.",
    },
    {
      type: "quiz",
      id: "cq1-5-q6",
      variant: "practice",
      multiple: true,
      question:
        "Which of these values of $x$ satisfy $\\dfrac{(x + 1)(x - 2)^2}{x - 5} \\le 0$? Select all that apply.",
      options: [
        { text: "$x = -1$", correct: true, feedback: "The numerator is 0, and $0 \\le 0$." },
        { text: "$x = 0$", correct: true, feedback: "$\\frac{(1)(4)}{-5} < 0$." },
        { text: "$x = 2$", correct: true, feedback: "The numerator is 0 at the even-multiplicity point." },
        { text: "$x = 5$", feedback: "The denominator is 0: undefined." },
        { text: "$x = -3$", feedback: "$\\frac{(-2)(25)}{-8} > 0$." },
        { text: "$x = 6$", feedback: "$\\frac{(7)(16)}{1} > 0$." },
      ],
      hint: "Sign scheme: $+$ right of 5, $-$ on $(2, 5)$, still $-$ on $(-1, 2)$ (even power at 2), $+$ left of $-1$. Then add the numerator zeros.",
    },
    {
      type: "numeric",
      id: "cq1-5-q7",
      variant: "practice",
      question: "How many integers satisfy $(x - 1)(x + 2)^2(x - 4)^3 \\le 0$?",
      answer: 5,
      hint: "Odd powers at 1 and 4 switch the sign, the even power at $-2$ does not. Don't forget the zeros.",
      solution: "From the right: $+$ on $(4, \\infty)$, $-$ on $(1, 4)$, $+$ on $(-2, 1)$, $+$ on $(-\\infty, -2)$. So the solution is $\\{-2\\} \\cup [1, 4]$: integers $-2, 1, 2, 3, 4$.",
      commonMistakes: [
        { answer: 4, feedback: "You lost $x = -2$: the expression is 0 there, and $0 \\le 0$." },
        { answer: 2, feedback: "Include the endpoints 1 and 4, where the expression is 0." },
      ],
    },
    {
      type: "quiz",
      id: "cq1-5-q8",
      variant: "practice",
      question: "Solve $\\dfrac{2x + 1}{x - 3} > 1$.",
      options: [
        { text: "$x < -4$ or $x > 3$", correct: true, feedback: "$\\frac{2x + 1 - (x - 3)}{x - 3} = \\frac{x + 4}{x - 3} > 0$: outside $[-4, 3]$." },
        { text: "$x > -4$", feedback: "That is what cross-multiplying gives. Test $x = 0$: $\\frac{1}{-3} > 1$ is false." },
        { text: "$-4 < x < 3$", feedback: "That is where $\\frac{x + 4}{x - 3} < 0$." },
        { text: "$x > 3$", feedback: "You lost the interval $x < -4$: try $x = -5$, $\\frac{-9}{-8} > 1$." },
      ],
      hint: "Subtract 1, combine into one fraction, then use the sign scheme.",
    },
    {
      type: "numeric",
      id: "cq1-5-q9",
      variant: "practice",
      question: "JEE Main. How many integers $x$ satisfy $\\dfrac{x^2 - 3x + 2}{x^2 - 9} \\le 0$?",
      answer: 5,
      hint: "Factor as $\\frac{(x - 1)(x - 2)}{(x - 3)(x + 3)}$. Four critical points, all of odd multiplicity.",
      solution: "Signs from the right: $+$ on $(3, \\infty)$, $-$ on $(2, 3)$, $+$ on $(1, 2)$, $-$ on $(-3, 1)$, $+$ on $(-\\infty, -3)$. Solution: $(-3, 1] \\cup [2, 3)$. Integers: $-2, -1, 0, 1, 2$.",
      commonMistakes: [
        { answer: 7, feedback: "$x = \\pm 3$ make the denominator zero and must be excluded." },
        { answer: 4, feedback: "Include $x = 2$: the numerator is 0 there." },
      ],
    },
    {
      type: "quiz",
      id: "cq1-5-q10",
      variant: "practice",
      multiple: true,
      question:
        "JEE Advanced. Which values of $x$ belong to the solution set of $\\dfrac{x^2 - 1}{x^2 - 4x + 3} \\ge 0$? Select all that apply.",
      options: [
        { text: "$x = -1$", correct: true, feedback: "Numerator 0, denominator $1 + 4 + 3 = 8 \\ne 0$: the value is 0." },
        { text: "$x = 1$", feedback: "Both numerator and denominator vanish: the expression is undefined at $x = 1$, even though cancelling hides this." },
        { text: "$x = 4$", correct: true, feedback: "$\\frac{15}{3} = 5 > 0$." },
        { text: "$x = 0$", feedback: "$\\frac{-1}{3} < 0$." },
        { text: "$x = -5$", correct: true, feedback: "$\\frac{24}{48} > 0$." },
      ],
      hint: "Factor: $\\frac{(x - 1)(x + 1)}{(x - 1)(x - 3)}$. Cancel to read signs, but remember where the original is undefined.",
    },
    {
      type: "quiz",
      id: "cq1-5-q11",
      variant: "practice",
      question: "Solve $x^4 - 5x^2 + 4 < 0$.",
      options: [
        { text: "$(-2, -1) \\cup (1, 2)$", correct: true, feedback: "$(x^2 - 1)(x^2 - 4) < 0$ means $1 < x^2 < 4$." },
        { text: "$(1, 4)$", feedback: "That is the solution for $t = x^2$. Convert back: $1 < x^2 < 4$." },
        { text: "$(1, 2)$", feedback: "Negative $x$ work too: $x = -1.5$ gives $5.0625 - 11.25 + 4 < 0$." },
        { text: "$(-2, 2)$", feedback: "$x = 0$ gives $4 > 0$." },
      ],
      hint: "Factor fully: $(x - 1)(x + 1)(x - 2)(x + 2)$, four simple critical points.",
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "modulus-and-logarithmic-equations-and-inequalities",
  title: "1.6 · Modulus and Logarithmic Equations and Inequalities",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "Two disguises make up a large share of JEE quadratic problems. A **modulus** like $\\lvert x - 1\\rvert$ hides two cases. A **logarithm** like $\\log_2 x$ hides a substitution and a domain. Strip the disguise and a quadratic is waiting underneath; the only new skill is to carry the extra conditions all the way to the end.",
    },
    { type: "heading", text: "Modulus: distance on the number line" },
    {
      type: "callout",
      variant: "definition",
      title: "Modulus",
      content:
        "$\\lvert x\\rvert = x$ if $x \\ge 0$ and $\\lvert x\\rvert = -x$ if $x < 0$. Geometrically, $\\lvert x - a\\rvert$ is the **distance** between $x$ and $a$. For $a > 0$:\n\n- $\\lvert x\\rvert < a \\iff -a < x < a$\n- $\\lvert x\\rvert > a \\iff x < -a$ or $x > a$\n- $\\lvert x\\rvert^2 = x^2$, so $\\lvert x\\rvert = \\sqrt{x^2}$",
    },
    {
      type: "text",
      content:
        "Three standard moves:\n\n1. **Substitute** $t = \\lvert x\\rvert \\ge 0$ when only $\\lvert x\\rvert$ and $x^2$ appear, solve the quadratic in $t$, and discard negative $t$.\n2. **Split into cases** at the points where each expression inside a modulus changes sign.\n3. **Sandwich**: $\\lvert E\\rvert < a$ is the pair $-a < E < a$, solved as two inequalities and intersected.",
    },
    {
      type: "worked-example",
      id: "cq1-6-we1",
      title: "Worked example 1: substitute t = |x|",
      problem: "Solve $x^2 - 5\\lvert x\\rvert + 6 = 0$.",
      steps: [
        { text: "Since $x^2 = \\lvert x\\rvert^2$, put $t = \\lvert x\\rvert$: $t^2 - 5t + 6 = 0$, so $t = 2$ or $t = 3$. *Why this step:* one substitution handles both signs of $x$ at once." },
        { text: "Both values are $\\ge 0$, so both are allowed. $\\lvert x\\rvert = 2$ gives $x = \\pm 2$ and $\\lvert x\\rvert = 3$ gives $x = \\pm 3$." },
      ],
      answer: "$x \\in \\{-3, -2, 2, 3\\}$: four solutions.",
    },
    {
      type: "worked-example",
      id: "cq1-6-we2",
      title: "Worked example 2: split at the critical points",
      problem: "Solve $\\lvert x - 1\\rvert + \\lvert x - 3\\rvert = 4$.",
      steps: [
        { text: "The critical points are 1 and 3. Work region by region." },
        { text: "$x \\ge 3$: $(x - 1) + (x - 3) = 4$, so $x = 4$, which lies in the region." },
        { text: "$1 \\le x < 3$: $(x - 1) + (3 - x) = 2 \\ne 4$. No solution. *Why this step:* between the two points the distances to 1 and 3 always add up to 2, the gap between them." },
        { text: "$x < 1$: $(1 - x) + (3 - x) = 4$, so $x = 0$, which lies in the region." },
      ],
      answer: "$x = 0$ or $x = 4$ (the points whose distances to 1 and 3 add to 4).",
    },
    {
      type: "worked-example",
      id: "cq1-6-we3",
      title: "Worked example 3: a sandwich of two quadratics",
      problem: "Solve $\\lvert x^2 - 3x\\rvert < 2$.",
      steps: [
        { text: "Rewrite as $-2 < x^2 - 3x < 2$, two quadratic inequalities that must both hold." },
        { text: "$x^2 - 3x + 2 > 0$: $(x - 1)(x - 2) > 0$, so $x < 1$ or $x > 2$." },
        { text: "$x^2 - 3x - 2 < 0$: between the roots $\\frac{3 \\pm \\sqrt{17}}{2}$, about $-0.56$ and $3.56$." },
        { text: "Intersect the two sets on a number line." },
      ],
      answer: "$x \\in \\left(\\frac{3 - \\sqrt{17}}{2}, 1\\right) \\cup \\left(2, \\frac{3 + \\sqrt{17}}{2}\\right)$.",
    },
    {
      type: "interactive",
      config: {
        component: "graph-explorer",
        expr: "abs(x^2 - 3*x)",
        exprLatex: "\\lvert x^2 - 3x \\rvert",
        window: { xmin: -2, xmax: 5, ymin: -1, ymax: 6 },
        initial: 1,
      },
    },
    {
      type: "text",
      content:
        "The modulus folds the part of $y = x^2 - 3x$ below the axis up above it, making the hump between 0 and 3 with peak $\\frac94$ at $x = 1.5$. The graph is below the level $y = 2$ on two separate stretches, exactly the two intervals of Worked example 3. Move the point to $x = 1$ and $x = 2$: the value there is exactly 2, so those points are excluded.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"|x| < a is solved by x < a\"",
      content:
        "$\\lvert x\\rvert < 3$ says the **distance** from 0 is less than 3, so $-3 < x < 3$. Writing $x < 3$ lets in $x = -10$, whose distance from 0 is 10. Likewise $\\lvert x\\rvert > 3$ has **two** pieces, $x < -3$ or $x > 3$.",
    },
    { type: "heading", text: "Logarithmic equations and inequalities" },
    {
      type: "callout",
      variant: "definition",
      title: "The rules you need",
      content:
        "$\\log_b u$ is defined only for $u > 0$, $b > 0$, $b \\ne 1$. Then:\n\n- $\\log_b u = \\log_b v \\iff u = v$\n- if $b > 1$: $\\log_b u > \\log_b v \\iff u > v$ (log is increasing)\n- if $0 < b < 1$: $\\log_b u > \\log_b v \\iff u < v$ (log is decreasing, the inequality **flips**)\n- $\\log_b x = \\frac{1}{\\log_x b}$, so $\\log_2 x$ and $\\log_x 2$ are reciprocals",
    },
    {
      type: "text",
      content:
        "The recipe: write down the domain first, transform the equation into a quadratic (by combining logs or by substituting $t = \\log_b x$), solve, and finally keep only the solutions inside the domain. Skipping the first or last step is the single most common way to lose marks here.",
    },
    {
      type: "worked-example",
      id: "cq1-6-we4",
      title: "Worked example 4: a reciprocal pair of logs",
      problem: "Solve $\\log_2 x + \\log_x 2 = \\frac52$.",
      steps: [
        { text: "Domain: $x > 0$ and $x \\ne 1$ (the second log has base $x$)." },
        { text: "Put $t = \\log_2 x$. Then $\\log_x 2 = \\frac1t$ and $t + \\frac1t = \\frac52$, i.e. $2t^2 - 5t + 2 = 0$. *Why this step:* the two logs are reciprocals, so one substitution turns the equation into a quadratic." },
        { text: "$(2t - 1)(t - 2) = 0$, so $t = \\frac12$ or $t = 2$." },
        { text: "$x = 2^{1/2} = \\sqrt2$ or $x = 2^2 = 4$. Both are in the domain." },
      ],
      answer: "$x = \\sqrt2$ or $x = 4$.",
    },
    {
      type: "worked-example",
      id: "cq1-6-we5",
      title: "Worked example 5: an extraneous root",
      problem: "Solve $\\log_{10} x + \\log_{10}(x - 3) = 1$.",
      steps: [
        { text: "Domain: $x > 0$ and $x > 3$, so $x > 3$." },
        { text: "Combine: $\\log_{10}[x(x - 3)] = 1$, so $x^2 - 3x - 10 = 0$, giving $x = 5$ or $x = -2$." },
        { text: "Only $x = 5$ satisfies $x > 3$. *Why this step:* combining the logs widened the domain (the product $x(x - 3)$ is positive for $x = -2$), so the quadratic produced a root the original equation never had." },
      ],
      answer: "$x = 5$.",
    },
    {
      type: "worked-example",
      id: "cq1-6-we6",
      title: "Worked example 6: a base less than 1",
      problem: "Solve $\\log_{1/2}(x^2 - 5x + 7) > 0$.",
      steps: [
        { text: "Domain: $x^2 - 5x + 7 > 0$, which holds for all $x$ since $D = 25 - 28 < 0$." },
        { text: "$0 = \\log_{1/2} 1$, and the base is less than 1, so the inequality flips: $x^2 - 5x + 7 < 1$." },
        { text: "$x^2 - 5x + 6 < 0$, i.e. $(x - 2)(x - 3) < 0$." },
      ],
      answer: "$2 < x < 3$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"logs keep the inequality direction\"",
      content:
        "Only for a base greater than 1. $\\log_{1/2} 4 = -2$ and $\\log_{1/2} 8 = -3$: the larger input has the **smaller** log. With a base in $(0, 1)$, removing the log flips $>$ into $<$. And whatever the base, every argument must stay positive.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "cq1-6-q1",
      variant: "practice",
      question: "How many real solutions does $x^2 - 5\\lvert x\\rvert + 4 = 0$ have?",
      answer: 4,
      hint: "Put $t = \\lvert x\\rvert$ and solve $t^2 - 5t + 4 = 0$. Each positive $t$ gives two values of $x$.",
      solution: "$t = 1$ or $t = 4$, both positive, so $x = \\pm 1, \\pm 4$: four solutions.",
      commonMistakes: [
        { answer: 2, feedback: "Each value of $\\lvert x\\rvert$ gives two values of $x$." },
      ],
    },
    {
      type: "numeric",
      id: "cq1-6-q2",
      variant: "practice",
      question: "Find the sum of all real roots of $x^2 - 7\\lvert x\\rvert + 12 = 0$.",
      answer: 0,
      hint: "The equation is unchanged when $x$ is replaced by $-x$. What does that say about the roots?",
      solution: "$\\lvert x\\rvert = 3$ or $4$, so the roots are $\\pm 3, \\pm 4$, summing to 0. (Any equation in $\\lvert x\\rvert$ alone has roots in $\\pm$ pairs.)",
      commonMistakes: [
        { answer: 7, feedback: "7 is the sum of the values of $\\lvert x\\rvert$. Each comes with its negative." },
        { answer: 14, feedback: "Negative roots count with their sign." },
      ],
    },
    {
      type: "quiz",
      id: "cq1-6-q3",
      variant: "practice",
      question: "Solve $\\lvert x - 2\\rvert < 3$.",
      options: [
        { text: "$-1 < x < 5$", correct: true, feedback: "Distance from 2 less than 3: $2 - 3 < x < 2 + 3$." },
        { text: "$x < 5$", feedback: "That lets in $x = -10$, which is 12 away from 2." },
        { text: "$-5 < x < 1$", feedback: "That is the interval around $-2$, not around $+2$." },
        { text: "$x < -1$ or $x > 5$", feedback: "That is $\\lvert x - 2\\rvert > 3$." },
      ],
      hint: "$\\lvert x - 2\\rvert$ is the distance from $x$ to 2.",
    },
    {
      type: "quiz",
      id: "cq1-6-q4",
      variant: "practice",
      question: "Solve $\\lvert 2x - 1\\rvert \\ge 5$.",
      options: [
        { text: "$x \\le -2$ or $x \\ge 3$", correct: true, feedback: "$2x - 1 \\ge 5$ gives $x \\ge 3$, and $2x - 1 \\le -5$ gives $x \\le -2$." },
        { text: "$-2 \\le x \\le 3$", feedback: "That is $\\lvert 2x - 1\\rvert \\le 5$." },
        { text: "$x \\ge 3$", feedback: "There is a second piece: $x = -4$ gives $\\lvert -9\\rvert = 9 \\ge 5$." },
        { text: "$x \\le -3$ or $x \\ge 2$", feedback: "Solve $2x - 1 = \\pm 5$ again: $x = 3$ or $x = -2$." },
      ],
      hint: "$\\lvert E\\rvert \\ge 5$ splits into $E \\ge 5$ or $E \\le -5$.",
    },
    {
      type: "numeric",
      id: "cq1-6-q5",
      variant: "practice",
      question: "How many integers satisfy $\\lvert x^2 - 3x\\rvert < 2$?",
      answer: 2,
      hint: "Use the solution set from Worked example 3, or test integers directly in the graph.",
      solution: "The solution set is about $(-0.56, 1) \\cup (2, 3.56)$. The integers in it are 0 and 3. (At $x = 1$ and $x = 2$, $\\lvert x^2 - 3x\\rvert = 2$, which is not $< 2$.)",
      commonMistakes: [
        { answer: 4, feedback: "$x = 1$ and $x = 2$ give exactly 2, which fails the strict inequality." },
        { answer: 3, feedback: "Check each of 0, 1, 2, 3: only 0 and 3 give a value below 2." },
      ],
    },
    {
      type: "numeric",
      id: "cq1-6-q6",
      variant: "practice",
      question: "Find the product of the roots of $(\\log_2 x)^2 - 5\\log_2 x + 6 = 0$.",
      answer: 32,
      hint: "Put $t = \\log_2 x$. The roots in $t$ give the roots in $x$ as $x = 2^t$.",
      solution: "$t^2 - 5t + 6 = 0$ gives $t = 2, 3$, so $x = 4, 8$ and the product is 32. (Shortcut: $\\log_2(x_1x_2) = t_1 + t_2 = 5$.)",
      commonMistakes: [
        { answer: 6, feedback: "6 is the product of the values of $t = \\log_2 x$. Convert back: $x = 2^t$." },
        { answer: 12, feedback: "12 is $4 + 8$, the sum. The product is $4 \\times 8$." },
      ],
    },
    {
      type: "quiz",
      id: "cq1-6-q7",
      variant: "practice",
      question: "Solve $\\log_{10} x + \\log_{10}(x + 3) = 1$.",
      options: [
        { text: "$x = 2$", correct: true, feedback: "$x(x + 3) = 10$ gives $x = 2$ or $x = -5$, and only $x = 2$ is in the domain $x > 0$." },
        { text: "$x = 2$ or $x = -5$", feedback: "$\\log_{10}(-5)$ is undefined, so $-5$ is extraneous." },
        { text: "$x = -5$", feedback: "Both logs need positive arguments." },
        { text: "$x = 5$", feedback: "$5 \\times 8 = 40 \\ne 10$." },
      ],
      hint: "Domain first: $x > 0$. Then combine the logs into $\\log_{10}[x(x + 3)]$.",
    },
    {
      type: "quiz",
      id: "cq1-6-q8",
      variant: "practice",
      question: "Solve $\\log_{1/3}(x - 1) > \\log_{1/3}(5 - x)$.",
      options: [
        { text: "$1 < x < 3$", correct: true, feedback: "Domain $1 < x < 5$, and the base is below 1, so $x - 1 < 5 - x$, i.e. $x < 3$." },
        { text: "$3 < x < 5$", feedback: "That keeps the inequality direction. With base $\\frac13$ it flips." },
        { text: "$x < 3$", feedback: "Both logs need positive arguments: $x > 1$ as well." },
        { text: "$1 < x < 5$", feedback: "That is only the domain. The inequality cuts it down further." },
      ],
      hint: "Write the domain, then remove the logs remembering that base $\\frac13$ flips the inequality.",
    },
    {
      type: "quiz",
      id: "cq1-6-q9",
      variant: "concept",
      multiple: true,
      question: "Which values of $x$ satisfy $\\lvert x - 1\\rvert + \\lvert x - 3\\rvert = 2$? Select all that apply.",
      options: [
        { text: "$x = 1$", correct: true, feedback: "$0 + 2 = 2$." },
        { text: "$x = 2$", correct: true, feedback: "$1 + 1 = 2$." },
        { text: "$x = 2.5$", correct: true, feedback: "$1.5 + 0.5 = 2$." },
        { text: "$x = 3$", correct: true, feedback: "$2 + 0 = 2$." },
        { text: "$x = 4$", feedback: "$3 + 1 = 4 \\ne 2$." },
      ],
      hint: "The sum of distances to 1 and 3 is at least 2, the gap between them. When is it exactly 2?",
    },
    {
      type: "numeric",
      id: "cq1-6-q10",
      variant: "practice",
      question: "JEE Main. Find the sum of all real roots of $\\lvert x - 2\\rvert^2 + \\lvert x - 2\\rvert - 2 = 0$.",
      answer: 4,
      hint: "Put $t = \\lvert x - 2\\rvert \\ge 0$ and reject any negative $t$.",
      solution: "$t^2 + t - 2 = (t + 2)(t - 1) = 0$, and $t \\ge 0$ leaves $t = 1$. Then $x - 2 = \\pm 1$: $x = 1, 3$, sum 4.",
      commonMistakes: [
        { answer: 3, feedback: "$\\lvert x - 2\\rvert = 1$ has two solutions, 1 and 3." },
        { answer: 0, feedback: "The roots are symmetric about 2, not about 0: they are 1 and 3." },
        { answer: 8, feedback: "$t = -2$ is impossible for a modulus, so it gives no roots." },
      ],
    },
    {
      type: "numeric",
      id: "cq1-6-q11",
      variant: "practice",
      question: "JEE Advanced. Solve $\\log_4(x - 1) = \\log_2(x - 3)$. Enter the solution.",
      answer: 5,
      hint: "Change base: $\\log_4 u = \\frac12\\log_2 u$. Domain: $x > 3$.",
      solution: "$\\frac12\\log_2(x - 1) = \\log_2(x - 3)$ gives $x - 1 = (x - 3)^2$, i.e. $x^2 - 7x + 10 = 0$, so $x = 2$ or $x = 5$. Only $x = 5$ satisfies $x > 3$.",
      commonMistakes: [
        { answer: 2, feedback: "At $x = 2$, $\\log_2(x - 3) = \\log_2(-1)$ is undefined." },
        { answer: 7, feedback: "7 is the sum of the two candidates. Only one survives the domain check." },
      ],
    },
    {
      type: "quiz",
      id: "cq1-6-q12",
      variant: "practice",
      question: "Solve $\\log_2(x^2 - 3x) \\le 2$.",
      options: [
        { text: "$[-1, 0) \\cup (3, 4]$", correct: true, feedback: "Domain $x^2 - 3x > 0$ (so $x < 0$ or $x > 3$) and $x^2 - 3x \\le 4$ (so $-1 \\le x \\le 4$). Intersect." },
        { text: "$[-1, 4]$", feedback: "That ignores the domain: for $x = 1$, $x^2 - 3x = -2$ and the log is undefined." },
        { text: "$(-\\infty, 0) \\cup (3, \\infty)$", feedback: "That is only the domain." },
        { text: "$[-1, 0] \\cup [3, 4]$", feedback: "At $x = 0$ and $x = 3$ the argument is 0, and $\\log_2 0$ is undefined." },
      ],
      hint: "Two conditions: the argument is positive, and (base 2 > 1) the argument is at most $2^2 = 4$.",
    },
  ]),
};

const lesson07: LessonSeed = {
  slug: "cubic-and-higher-degree-equations-vieta-again",
  title: "1.7 · Cubic and Higher-Degree Equations: Vieta Again",
  position: 7,
  blocks: blocks([
    {
      type: "text",
      content:
        "For a quadratic, \"sum of roots $= -\\frac ba$, product $= \\frac ca$\" came from expanding $a(x - \\alpha)(x - \\beta)$. Nothing in that argument cared that there were only two factors. Expand three or four factors and you get Vieta's relations for cubics and quartics, with the same alternating signs. JEE uses them constantly, usually without ever asking you to find the roots.",
    },
    { type: "heading", text: "Vieta for a cubic" },
    {
      type: "text",
      content: "If $\\alpha, \\beta, \\gamma$ are the roots of $ax^3 + bx^2 + cx + d = 0$, then the cubic equals $a(x - \\alpha)(x - \\beta)(x - \\gamma)$. Expanding:",
    },
    {
      type: "math",
      latex:
        "a(x - \\alpha)(x - \\beta)(x - \\gamma) = a\\left[x^3 - (\\alpha + \\beta + \\gamma)x^2 + (\\alpha\\beta + \\beta\\gamma + \\gamma\\alpha)x - \\alpha\\beta\\gamma\\right]",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Vieta's relations",
      content:
        "**Cubic** $ax^3 + bx^2 + cx + d = 0$ with roots $\\alpha, \\beta, \\gamma$:\n\n- $\\alpha + \\beta + \\gamma = -\\frac ba$\n- $\\alpha\\beta + \\beta\\gamma + \\gamma\\alpha = \\frac ca$\n- $\\alpha\\beta\\gamma = -\\frac da$\n\n**Quartic** $ax^4 + bx^3 + cx^2 + dx + e = 0$ with roots $\\alpha, \\beta, \\gamma, \\delta$:\n\n- $\\sum\\alpha = -\\frac ba$, $\\sum\\alpha\\beta = \\frac ca$ (six pairs), $\\sum\\alpha\\beta\\gamma = -\\frac da$ (four triples), $\\alpha\\beta\\gamma\\delta = \\frac ea$\n\nThe pattern for degree $n$: the sum of products of the roots taken $k$ at a time is $(-1)^k \\frac{a_{n-k}}{a_n}$.",
    },
    {
      type: "text",
      content:
        "Any **symmetric** expression in the roots can be rebuilt from these. The workhorses for a cubic, with $s_1 = \\sum\\alpha$, $s_2 = \\sum\\alpha\\beta$, $s_3 = \\alpha\\beta\\gamma$:",
    },
    {
      type: "math",
      latex:
        "\\begin{aligned} \\alpha^2 + \\beta^2 + \\gamma^2 &= s_1^2 - 2s_2 \\\\ \\frac1\\alpha + \\frac1\\beta + \\frac1\\gamma &= \\frac{s_2}{s_3} \\\\ \\textstyle\\sum \\alpha^2\\beta \\ (\\text{six terms}) &= s_1s_2 - 3s_3 \\\\ \\alpha^3 + \\beta^3 + \\gamma^3 &= s_1^3 - 3s_1s_2 + 3s_3 \\\\ (\\alpha + \\beta)(\\beta + \\gamma)(\\gamma + \\alpha) &= s_1s_2 - s_3 \\end{aligned}",
    },
    {
      type: "worked-example",
      id: "cq1-7-we1",
      title: "Worked example 1: symmetric sums without the roots",
      problem: "For the roots $\\alpha, \\beta, \\gamma$ of $x^3 - 6x^2 + 11x - 6 = 0$, find $\\alpha^2 + \\beta^2 + \\gamma^2$.",
      steps: [
        { text: "Read off $s_1 = 6$, $s_2 = 11$, $s_3 = 6$. *Why this step:* with $a = 1$, the signs simply alternate: $-(-6)$, $+11$, $-(-6)$." },
        { text: "$\\alpha^2 + \\beta^2 + \\gamma^2 = s_1^2 - 2s_2 = 36 - 22 = 14$." },
        { text: "Check: the roots are 1, 2, 3, and $1 + 4 + 9 = 14$." },
      ],
      answer: "$14$.",
    },
    {
      type: "worked-example",
      id: "cq1-7-we2",
      title: "Worked example 2: power sums by reduction",
      problem: "For the roots of $x^3 - 2x^2 + 3x - 4 = 0$, find $\\alpha^3 + \\beta^3 + \\gamma^3$.",
      steps: [
        { text: "Each root satisfies the equation, so $\\alpha^3 = 2\\alpha^2 - 3\\alpha + 4$, and the same for $\\beta, \\gamma$. *Why this step:* the equation itself lets you trade any cube for lower powers." },
        { text: "Add the three: $\\sum\\alpha^3 = 2\\sum\\alpha^2 - 3\\sum\\alpha + 12$." },
        { text: "$\\sum\\alpha = 2$, $\\sum\\alpha\\beta = 3$, so $\\sum\\alpha^2 = 4 - 6 = -2$. (Negative: the roots cannot all be real.)" },
        { text: "$\\sum\\alpha^3 = 2(-2) - 3(2) + 12 = 2$. The formula $s_1^3 - 3s_1s_2 + 3s_3 = 8 - 18 + 12$ agrees." },
      ],
      answer: "$\\alpha^3 + \\beta^3 + \\gamma^3 = 2$.",
    },
    { type: "heading", text: "Roots in AP or GP" },
    {
      type: "text",
      content:
        "When the roots are known to be in arithmetic progression, call them $a - d$, $a$, $a + d$: the sum $3a$ gives the middle root at once. In geometric progression, call them $\\frac ar$, $a$, $ar$: the product $a^3$ gives the middle root. Either way the middle root is a root, so it must satisfy the equation, which often settles an unknown coefficient.",
    },
    {
      type: "worked-example",
      id: "cq1-7-we3",
      title: "Worked example 3: roots in arithmetic progression",
      problem: "Solve $x^3 - 12x^2 + 39x - 28 = 0$, given that its roots are in AP.",
      steps: [
        { text: "Roots $a - d$, $a$, $a + d$ with sum $3a = 12$, so $a = 4$. Check: $64 - 192 + 156 - 28 = 0$." },
        { text: "Product: $(4 - d)(4)(4 + d) = 28$, so $16 - d^2 = 7$ and $d = \\pm 3$." },
        { text: "Check the pair sum: $1 \\cdot 4 + 4 \\cdot 7 + 7 \\cdot 1 = 39$. *Why this step:* three relations, two unknowns, so the third is a free consistency check." },
      ],
      answer: "The roots are $1, 4, 7$.",
    },
    {
      type: "worked-example",
      id: "cq1-7-we4",
      title: "Worked example 4: roots in geometric progression",
      problem: "Solve $x^3 - 14x^2 + 56x - 64 = 0$, given that its roots are in GP.",
      steps: [
        { text: "Roots $\\frac ar$, $a$, $ar$ with product $a^3 = 64$, so $a = 4$." },
        { text: "Sum: $\\frac4r + 4 + 4r = 14$, so $4r^2 - 10r + 4 = 0$, i.e. $2r^2 - 5r + 2 = 0$, $r = 2$ or $\\frac12$ (the same three roots either way)." },
        { text: "Check the pair sum: $2 \\cdot 4 + 4 \\cdot 8 + 8 \\cdot 2 = 56$." },
      ],
      answer: "The roots are $2, 4, 8$.",
    },
    { type: "heading", text: "Finding roots and counting real roots" },
    {
      type: "text",
      content:
        "**Factor theorem:** $f(r) = 0$ iff $(x - r)$ divides $f(x)$. Once one root of a cubic is found, divide it out and solve the remaining quadratic. **Rational-root test:** for integer coefficients, any rational root $\\frac pq$ in lowest terms has $p$ dividing the constant term and $q$ dividing the leading coefficient, which gives a short list to try.",
    },
    {
      type: "text",
      content:
        "A cubic with real coefficients always has at least one real root: for large positive $x$ it has the sign of $a$, for large negative $x$ the opposite sign, so it must cross the axis. Its non-real roots come in conjugate pairs, so it has either **one** or **three** real roots (counted with multiplicity). The graph shows which: three when the curve's hump and dip lie on opposite sides of the axis.",
    },
    {
      type: "interactive",
      config: {
        component: "graph-explorer",
        expr: "x^3 - 3*x + 1",
        exprLatex: "x^3 - 3x + 1",
        window: { xmin: -3, xmax: 3, ymin: -4, ymax: 5 },
        initial: -1,
      },
    },
    {
      type: "text",
      content:
        "Here $f(-2) = -1$, $f(-1) = 3$, $f(1) = -1$, $f(2) = 3$. The sign changes in $(-2, -1)$, $(0, 1)$ and $(1, 2)$ trap three real roots, and the hump at $x = -1$ (value 3) and dip at $x = 1$ (value $-1$) are on opposite sides of the axis. By Vieta the three roots add up to 0 and multiply to $-1$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the product of the roots of a cubic is d/a\"",
      content:
        "The signs alternate starting with a minus: sum $-\\frac ba$, pairs $+\\frac ca$, product $-\\frac da$. For $x^3 - 6x^2 + 11x - 6$ the roots 1, 2, 3 multiply to $+6 = -\\frac{-6}{1}$. For a quadratic the product happened to be $+\\frac ca$ because it is the second relation, not the last.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the sum of the squares is the square of the sum\"",
      content:
        "$(\\alpha + \\beta + \\gamma)^2$ contains the cross terms $2(\\alpha\\beta + \\beta\\gamma + \\gamma\\alpha)$, which must be subtracted. In Worked example 1, $s_1^2 = 36$ while the true answer is 14.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "cq1-7-q1",
      variant: "practice",
      question: "What is the product of the roots of $2x^3 - 5x^2 + 3x - 7 = 0$?",
      options: [
        { text: "$\\frac72$", correct: true, feedback: "$-\\frac da = -\\frac{-7}{2} = \\frac72$." },
        { text: "$-\\frac72$", feedback: "For a cubic the product is $-\\frac da$, and $d = -7$." },
        { text: "$\\frac52$", feedback: "That is the sum of the roots, $-\\frac ba$." },
        { text: "$\\frac32$", feedback: "That is the sum of pairwise products, $\\frac ca$." },
      ],
      hint: "Cubic: product $= -\\frac da$.",
    },
    {
      type: "numeric",
      id: "cq1-7-q2",
      variant: "practice",
      question: "Find the sum of the roots of $2x^3 - 5x^2 + 3x - 7 = 0$.",
      answer: 2.5,
      tolerance: 0.001,
      hint: "Sum $= -\\frac ba$.",
      solution: "$-\\frac{-5}{2} = \\frac52$.",
      commonMistakes: [
        { answer: -2.5, feedback: "Sign: the sum is $-\\frac ba$ with $b = -5$." },
        { answer: 5, feedback: "Divide by the leading coefficient 2." },
      ],
    },
    {
      type: "numeric",
      id: "cq1-7-q3",
      variant: "practice",
      question: "If $\\alpha, \\beta, \\gamma$ are the roots of $x^3 - 4x^2 + x + 6 = 0$, find $\\alpha^2 + \\beta^2 + \\gamma^2$.",
      answer: 14,
      hint: "$\\sum\\alpha^2 = (\\sum\\alpha)^2 - 2\\sum\\alpha\\beta$.",
      solution: "$s_1 = 4$, $s_2 = 1$, so $16 - 2 = 14$. Check: the roots are $-1, 2, 3$ and $1 + 4 + 9 = 14$.",
      commonMistakes: [
        { answer: 16, feedback: "That is $s_1^2$. Subtract $2s_2$." },
        { answer: 18, feedback: "Subtract $2s_2$, don't add it." },
      ],
    },
    {
      type: "numeric",
      id: "cq1-7-q4",
      variant: "practice",
      question: "For the same cubic $x^3 - 4x^2 + x + 6 = 0$, find $\\frac1\\alpha + \\frac1\\beta + \\frac1\\gamma$.",
      answer: -0.1667,
      tolerance: 0.001,
      hint: "Put the fractions over a common denominator: $\\frac{s_2}{s_3}$.",
      solution: "$s_2 = 1$ and $s_3 = -6$, so the sum is $-\\frac16 \\approx -0.1667$. Check with the roots $-1, 2, 3$: $-1 + \\frac12 + \\frac13 = -\\frac16$.",
      commonMistakes: [
        { answer: 0.1667, tolerance: 0.001, feedback: "The product is $-\\frac da = -6$, not $+6$." },
        { answer: -6, feedback: "That is $\\frac{s_3}{s_2}$, upside down." },
      ],
    },
    {
      type: "quiz",
      id: "cq1-7-q5",
      variant: "practice",
      question: "The roots of $x^3 - 3x^2 - 6x + 8 = 0$ are in AP. They are",
      options: [
        { text: "$-2, 1, 4$", correct: true, feedback: "Sum 3 makes the middle root 1, and $(x - 1)(x^2 - 2x - 8) = (x - 1)(x - 4)(x + 2)$." },
        { text: "$-1, 1, 3$", feedback: "Product $-3$, but $-\\frac da = -8$." },
        { text: "$2, -1, -4$", feedback: "Sum $-3$, but $-\\frac ba = 3$." },
        { text: "$0, 1, 2$", feedback: "0 is not a root: the constant term is 8." },
      ],
      hint: "AP roots $a - d, a, a + d$: the sum $3a = 3$ gives the middle root.",
    },
    {
      type: "quiz",
      id: "cq1-7-q6",
      variant: "concept",
      multiple: true,
      question:
        "Counting multiplicity, how many real roots can a cubic with real coefficients have? Select all possible numbers.",
      options: [
        { text: "0", feedback: "A real cubic changes sign between large negative and large positive $x$, so it has at least one real root." },
        { text: "1", correct: true, feedback: "For example $x^3 + x$: root 0 and the pair $\\pm i$." },
        { text: "2", feedback: "Non-real roots come in conjugate pairs, so the number of non-real roots is even, and $3 - \\text{even}$ is odd." },
        { text: "3", correct: true, feedback: "For example $x^3 - x$, or $(x - 1)^2(x + 2)$ counting the double root twice." },
      ],
      hint: "Use two facts: a real cubic must cross the axis, and non-real roots pair up.",
    },
    {
      type: "numeric",
      id: "cq1-7-q7",
      variant: "practice",
      question:
        "If $\\alpha, \\beta, \\gamma, \\delta$ are the roots of $x^4 - 3x^3 + 2x^2 - x + 5 = 0$, find $\\alpha^2 + \\beta^2 + \\gamma^2 + \\delta^2$.",
      answer: 5,
      hint: "The same identity works for four roots: $\\sum\\alpha^2 = (\\sum\\alpha)^2 - 2\\sum\\alpha\\beta$.",
      solution: "$\\sum\\alpha = 3$ and $\\sum\\alpha\\beta = 2$, so $9 - 4 = 5$.",
      commonMistakes: [
        { answer: 9, feedback: "That is $(\\sum\\alpha)^2$. Subtract twice the sum of pairwise products." },
        { answer: 13, feedback: "Subtract $2\\sum\\alpha\\beta$, don't add it." },
        { answer: 7, feedback: "The pair sum is $\\frac ca = +2$, giving $9 - 4$." },
      ],
    },
    {
      type: "numeric",
      id: "cq1-7-q8",
      variant: "practice",
      question: "If $\\alpha, \\beta, \\gamma$ are the roots of $x^3 - x - 1 = 0$, find $\\alpha^3 + \\beta^3 + \\gamma^3$.",
      answer: 3,
      hint: "Each root satisfies $\\alpha^3 = \\alpha + 1$. Add the three.",
      solution: "$\\sum\\alpha^3 = \\sum\\alpha + 3 = 0 + 3 = 3$, since the $x^2$ coefficient is 0.",
      commonMistakes: [
        { answer: 1, feedback: "There are three roots, so the constant 1 is added three times." },
        { answer: 0, feedback: "$\\sum\\alpha = 0$, but $\\sum\\alpha^3 = \\sum\\alpha + 3$." },
      ],
    },
    {
      type: "quiz",
      id: "cq1-7-q9",
      variant: "practice",
      question:
        "If $\\alpha, \\beta, \\gamma$ are the roots of $x^3 - 2x + 5 = 0$, which equation has roots $2\\alpha, 2\\beta, 2\\gamma$?",
      options: [
        { text: "$x^3 - 8x + 40 = 0$", correct: true, feedback: "Replace $x$ by $\\frac x2$: $\\frac{x^3}{8} - x + 5 = 0$, then multiply by 8." },
        { text: "$x^3 - 4x + 10 = 0$", feedback: "Each coefficient scales by a different power of 2. Substitute $\\frac x2$ and clear denominators." },
        { text: "$8x^3 - 4x + 5 = 0$", feedback: "That replaces $x$ by $2x$, which gives roots $\\frac\\alpha2$." },
        { text: "$x^3 - 2x + 10 = 0$", feedback: "Doubling the roots changes more than the constant term." },
      ],
      hint: "Transformation of roots (Lesson 0.6): for roots $k\\alpha$, replace $x$ by $\\frac xk$.",
    },
    {
      type: "numeric",
      id: "cq1-7-q10",
      variant: "practice",
      question: "JEE Main. The roots of $x^3 - 9x^2 + 23x - k = 0$ are in arithmetic progression. Find $k$.",
      answer: 15,
      hint: "The middle root is a third of the sum, and it must satisfy the equation.",
      solution: "Sum 9, so the middle root is 3. Substituting: $27 - 81 + 69 - k = 0$, $k = 15$. The roots are 1, 3, 5.",
      commonMistakes: [
        { answer: 27, feedback: "Product $= 3^3$ only if all roots equal 3. Substitute $x = 3$ into the cubic instead." },
        { answer: 3, feedback: "3 is the middle root, not $k$." },
      ],
    },
    {
      type: "numeric",
      id: "cq1-7-q11",
      variant: "practice",
      question:
        "JEE Advanced. For the roots of $x^3 - 6x^2 + 11x - 6 = 0$, find $\\alpha^2\\beta + \\alpha^2\\gamma + \\beta^2\\alpha + \\beta^2\\gamma + \\gamma^2\\alpha + \\gamma^2\\beta$.",
      answer: 48,
      hint: "Expand $(\\alpha + \\beta + \\gamma)(\\alpha\\beta + \\beta\\gamma + \\gamma\\alpha)$: you get the six terms plus $3\\alpha\\beta\\gamma$.",
      solution: "$s_1s_2 - 3s_3 = 6 \\times 11 - 18 = 48$. Check with roots 1, 2, 3: $2 + 3 + 4 + 12 + 9 + 18 = 48$.",
      commonMistakes: [
        { answer: 66, feedback: "$s_1s_2$ includes $3\\alpha\\beta\\gamma$ that must be subtracted." },
        { answer: 60, feedback: "Subtract $3s_3 = 18$, not $s_3 = 6$." },
      ],
    },
    {
      type: "quiz",
      id: "cq1-7-q12",
      variant: "practice",
      multiple: true,
      question: "Which of these are roots of $2x^3 - 3x^2 - 3x + 2 = 0$? Select all that apply.",
      options: [
        { text: "$2$", correct: true, feedback: "$16 - 12 - 6 + 2 = 0$." },
        { text: "$-1$", correct: true, feedback: "$-2 - 3 + 3 + 2 = 0$." },
        { text: "$\\frac12$", correct: true, feedback: "$\\frac14 - \\frac34 - \\frac32 + 2 = 0$. The coefficients read the same backwards, so $\\frac1r$ is a root whenever $r$ is." },
        { text: "$1$", feedback: "$2 - 3 - 3 + 2 = -2$." },
        { text: "$-2$", feedback: "$-16 - 12 + 6 + 2 = -20$." },
      ],
      hint: "Rational-root test: try $\\pm 1, \\pm 2, \\pm\\frac12$. A cubic has at most three roots, and Vieta's product $-\\frac da = -1$ is a check.",
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-1-mastery",
  title: "1.8 · Chapter 1 Mastery",
  position: 8,
  blocks: blocks([
    {
      type: "text",
      content:
        "This lesson has no new theory and no formula sheet. Every question below can be answered from one sketch of a parabola, a number line with signs on it, or Vieta's relations rebuilt from a factored polynomial. If you are stuck, draw before you calculate.",
    },
    { type: "heading", text: "Reconstruct it" },
    {
      type: "callout",
      variant: "tip",
      title: "Rebuild the location-of-roots conditions from a sketch",
      content:
        "Draw an upward parabola crossing the x-axis at $\\alpha < \\beta$, and mark a number $k$ to the left of both roots. Now answer, without notes:\n\n1. Why must $D \\ge 0$?\n2. Is the graph above or below the axis at $x = k$? So what is the sign of $f(k)$?\n3. Where is the vertex relative to $k$, and why does that rule out both roots being to the left of $k$?\n4. Redraw the parabola upside down. Which signs flip, and why does writing $a\\,f(k)$ instead of $f(k)$ undo the flip?\n5. Now put $k$ between the roots. Why does a single condition suffice?",
    },
    {
      type: "text",
      content:
        "Then do the same for the other tools of this chapter: the sign scheme (why does an even power not switch the sign?), the $D \\ge 0$ method for a range (why is \"$y$ is in the range\" the same as \"this quadratic in $x$ has a real root\"?), and Vieta for a cubic (expand $a(x - \\alpha)(x - \\beta)(x - \\gamma)$ and read off the signs).",
    },
    {
      type: "interactive",
      config: {
        component: "cq-quadratic-explorer",
        a: { min: -3, max: 3, step: 0.5, initial: 1 },
        b: { min: -6, max: 6, step: 0.5, initial: -5 },
        c: { min: -6, max: 6, step: 0.5, initial: 4 },
        markers: {
          k1: { min: -5, max: 5, step: 0.5, initial: 0 },
          k2: { min: -5, max: 5, step: 0.5, initial: 5 },
        },
        showSign: true,
        readouts: ["discriminant", "roots", "vertex", "sum-product"],
        caption:
          "Check your reconstructions here. Predict each line of the checklist before you move a slider, then move it and see whether you were right.",
      },
    },
    { type: "heading", text: "Mastery questions" },
    {
      type: "numeric",
      id: "cq1-8-q1",
      variant: "mastery",
      question: "Find the least value of $x^2 - 8x + 21$ over all real $x$.",
      answer: 5,
      hint: "Lesson 1.1: the least value is at the vertex.",
      solution: "$(x - 4)^2 + 5 \\ge 5$, with equality at $x = 4$.",
      commonMistakes: [
        { answer: 21, feedback: "21 is $f(0)$. The vertex is at $x = 4$." },
        { answer: 4, feedback: "4 is where the least value occurs, not the value." },
      ],
    },
    {
      type: "quiz",
      id: "cq1-8-q2",
      variant: "mastery",
      question: "For which real $k$ is $kx^2 + 4x + k > 0$ for every real $x$?",
      options: [
        { text: "$k > 2$", correct: true, feedback: "Need $k > 0$ and $D = 16 - 4k^2 < 0$, i.e. $\\lvert k\\rvert > 2$. Together $k > 2$. ($k = 0$ gives $4x$, which fails.)" },
        { text: "$k > 0$", feedback: "$k = 1$ gives $x^2 + 4x + 1$, with $D = 12 > 0$: negative between its roots." },
        { text: "$\\lvert k\\rvert > 2$", feedback: "$k = -3$ gives a downward parabola, negative for large $x$." },
        { text: "$-2 < k < 2$", feedback: "That is where $D > 0$, so the expression changes sign." },
      ],
      hint: "Lesson 1.2: $a > 0$ and $D < 0$, plus a separate check of $k = 0$.",
    },
    {
      type: "quiz",
      id: "cq1-8-q3",
      variant: "mastery",
      question: "Both roots of $x^2 - 4ax + 2a^2 - 3a + 5 = 0$ are greater than 2 exactly when",
      options: [
        { text: "$a > \\frac92$", correct: true, feedback: "$\\frac D4 = (2a + 5)(a - 1) \\ge 0$, $f(2) = (2a - 9)(a - 1) > 0$, vertex $2a > 2$. Intersection: $a > \\frac92$." },
        { text: "$a \\ge 1$", feedback: "That is $D \\ge 0$ plus the vertex. For $a = 2$, $f(2) = -5 < 0$, so 2 lies between the roots." },
        { text: "$1 < a < \\frac92$", feedback: "There $f(2) < 0$: one root is less than 2." },
        { text: "$a \\le -\\frac52$ or $a > \\frac92$", feedback: "For $a \\le -\\frac52$ the vertex $x = 2a$ is to the left of 2." },
      ],
      hint: "Lesson 1.3: $D \\ge 0$, $f(2) > 0$, $-\\frac{b}{2a} > 2$.",
    },
    {
      type: "numeric",
      id: "cq1-8-q4",
      variant: "mastery",
      question: "How many integers satisfy $\\dfrac{(x - 2)(x + 1)^2}{x - 5} \\le 0$?",
      answer: 4,
      hint: "Lesson 1.5: even power at $-1$, odd at 2 and 5. Include numerator zeros, exclude 5.",
      solution: "Signs: $+$ right of 5, $-$ on $(2, 5)$, $+$ on $(-1, 2)$ and on $(-\\infty, -1)$ (no switch at the even power). Solution $\\{-1\\} \\cup [2, 5)$: integers $-1, 2, 3, 4$.",
      commonMistakes: [
        { answer: 3, feedback: "$x = -1$ makes the numerator 0, and $0 \\le 0$." },
        { answer: 5, feedback: "$x = 5$ makes the denominator 0: excluded." },
      ],
    },
    {
      type: "numeric",
      id: "cq1-8-q5",
      variant: "mastery",
      question:
        "$x^2 - 3x + a = 0$ and $x^2 + ax - 3 = 0$ have **exactly one** common root. Find $a$.",
      answer: 2,
      hint: "Lesson 1.4: subtract. The result factors, and one factor gives identical equations.",
      solution: "Subtracting: $(-3 - a)x + (a + 3) = 0$, i.e. $(a + 3)(1 - x) = 0$. $a = -3$ makes the equations identical (both roots shared). Otherwise $x = 1$: $1 - 3 + a = 0$, $a = 2$. Check: $x^2 - 3x + 2$ and $x^2 + 2x - 3$ share only the root 1.",
      commonMistakes: [
        { answer: -3, feedback: "At $a = -3$ both equations are $x^2 - 3x - 3 = 0$, sharing **both** roots, not exactly one." },
      ],
    },
    {
      type: "quiz",
      id: "cq1-8-q6",
      variant: "mastery",
      question: "JEE Main. For real $x$, the expression $\\dfrac{x^2 + 34x - 71}{x^2 + 2x - 7}$ never takes values in",
      options: [
        { text: "the open interval $(5, 9)$", correct: true, feedback: "The $D \\ge 0$ method gives $(y - 5)(y - 9) \\ge 0$, so $y \\le 5$ or $y \\ge 9$." },
        { text: "$[5, 9]$", feedback: "5 and 9 are attained (where the discriminant is zero)." },
        { text: "$(-\\infty, 5)$", feedback: "Every $y \\le 5$ is attained." },
        { text: "$(9, \\infty)$", feedback: "Every $y \\ge 9$ is attained." },
      ],
      hint: "Lesson 1.2: set the expression equal to $y$, cross-multiply, and demand a real $x$.",
    },
    {
      type: "numeric",
      id: "cq1-8-q7",
      variant: "mastery",
      question: "How many integers $x$ with $-5 \\le x \\le 5$ satisfy $\\dfrac{x^2 - x - 6}{x - 1} \\le 0$?",
      answer: 6,
      hint: "Lesson 1.5: factor the numerator as $(x - 3)(x + 2)$.",
      solution: "Critical points $-2$, $1$ (excluded), $3$. Signs: $+$ on $(3, \\infty)$, $-$ on $(1, 3)$, $+$ on $(-2, 1)$, $-$ on $(-\\infty, -2)$. Solution $(-\\infty, -2] \\cup (1, 3]$. In $[-5, 5]$: $-5, -4, -3, -2, 2, 3$.",
      commonMistakes: [
        { answer: 7, feedback: "$x = 1$ makes the denominator zero." },
        { answer: 4, feedback: "Include $-2$ and $3$, where the numerator is zero." },
      ],
    },
    {
      type: "numeric",
      id: "cq1-8-q8",
      variant: "mastery",
      question: "How many real solutions does $\\lvert x^2 - 4x + 3\\rvert = 1$ have?",
      answer: 3,
      hint: "Lesson 1.6: split into $x^2 - 4x + 3 = 1$ and $x^2 - 4x + 3 = -1$.",
      solution: "$x^2 - 4x + 2 = 0$ gives $2 \\pm \\sqrt2$ (two roots). $x^2 - 4x + 4 = 0$ gives $x = 2$ (one root, the vertex of $y = x^2 - 4x + 3$ is at height $-1$). Total 3.",
      commonMistakes: [
        { answer: 4, feedback: "$x^2 - 4x + 4 = (x - 2)^2$ has a double root, one solution." },
        { answer: 2, feedback: "Don't forget the case $x^2 - 4x + 3 = -1$." },
      ],
    },
    {
      type: "numeric",
      id: "cq1-8-q9",
      variant: "mastery",
      question: "Solve $\\log_2(x + 1) + \\log_2(x - 1) = 3$.",
      answer: 3,
      hint: "Lesson 1.6: domain first ($x > 1$), then combine the logs.",
      solution: "$\\log_2(x^2 - 1) = 3$ gives $x^2 = 9$. The domain $x > 1$ keeps only $x = 3$.",
      commonMistakes: [
        { answer: -3, feedback: "$\\log_2(-2)$ is undefined: reject $-3$." },
        { answer: 9, feedback: "9 is $x^2$. Take the square root." },
      ],
    },
    {
      type: "quiz",
      id: "cq1-8-q10",
      variant: "mastery",
      question: "Solve $\\log_{1/2}(x^2 - 6x + 12) \\ge -2$.",
      options: [
        { text: "$[2, 4]$", correct: true, feedback: "Base below 1 flips: $x^2 - 6x + 12 \\le 4$, i.e. $(x - 2)(x - 4) \\le 0$. The argument is always positive ($D < 0$)." },
        { text: "$(-\\infty, 2] \\cup [4, \\infty)$", feedback: "That keeps the direction. Base $\\frac12$ reverses it." },
        { text: "$(2, 4)$", feedback: "Equality is allowed: at $x = 2$, $\\log_{1/2} 4 = -2$." },
        { text: "all real $x$", feedback: "$x = 0$ gives $\\log_{1/2} 12 \\approx -3.6 < -2$." },
      ],
      hint: "$-2 = \\log_{1/2} 4$. Remove the logs, remembering the base is less than 1.",
    },
    {
      type: "numeric",
      id: "cq1-8-q11",
      variant: "mastery",
      question:
        "If $\\alpha, \\beta, \\gamma$ are the roots of $x^3 - 5x^2 + 6x - 1 = 0$, find $(\\alpha + \\beta)(\\beta + \\gamma)(\\gamma + \\alpha)$.",
      answer: 29,
      hint: "Lesson 1.7: $\\alpha + \\beta = s_1 - \\gamma$. So the product is $(s_1 - \\alpha)(s_1 - \\beta)(s_1 - \\gamma)$, which is the cubic evaluated at $s_1$.",
      solution: "$s_1 = 5$, so the product is $p(5) = 125 - 125 + 30 - 1 = 29$, where $p(x) = (x - \\alpha)(x - \\beta)(x - \\gamma)$. Equivalently $s_1s_2 - s_3 = 30 - 1 = 29$.",
      commonMistakes: [
        { answer: 31, feedback: "The identity is $s_1s_2 - s_3$, not $s_1s_2 + s_3$." },
        { answer: 30, feedback: "That is $s_1s_2$ alone. Subtract $s_3 = 1$." },
      ],
    },
    {
      type: "quiz",
      id: "cq1-8-q12",
      variant: "mastery",
      multiple: true,
      question:
        "JEE Advanced. Let $f(x) = ax^2 + bx + c$ with real coefficients, $a > 0$, and suppose $a + b + c < 0$. Which statements must be true? Select all that apply.",
      options: [
        { text: "1 lies strictly between the roots of $f$", correct: true, feedback: "$a\\,f(1) = a(a + b + c) < 0$." },
        { text: "The roots of $f$ are real and distinct", correct: true, feedback: "A cup that dips below the axis must cross it twice." },
        { text: "Both roots are greater than 1", feedback: "Then $f(1)$ would be positive (1 outside the roots)." },
        { text: "$f(x) < 0$ for every $x$ between the roots", correct: true, feedback: "For $a > 0$ the cup is below the axis exactly between its roots." },
        { text: "$c < 0$", feedback: "Not forced: $x^2 - 3x + 1$ has $a + b + c = -1 < 0$ but $c = 1 > 0$." },
      ],
      hint: "$a + b + c$ is $f(1)$. Translate the sign of $a\\,f(1)$ into a picture.",
    },
    {
      type: "numeric",
      id: "cq1-8-q13",
      variant: "mastery",
      question:
        "Find the sum of all integers $m$ for which both roots of $x^2 - 2mx + m^2 - 4 = 0$ lie in $(-4, 6)$.",
      answer: 5,
      hint: "The roots are $m \\pm 2$. Or use the four standard conditions.",
      solution: "Need $m - 2 > -4$ and $m + 2 < 6$: $-2 < m < 4$, so $m = -1, 0, 1, 2, 3$, with sum 5.",
      commonMistakes: [
        { answer: 7, feedback: "$m = -2$ and $m = 4$ put a root exactly at an endpoint, which is excluded." },
        { answer: 6, feedback: "Recheck the list: $-1 + 0 + 1 + 2 + 3 = 5$." },
      ],
    },
    {
      type: "quiz",
      id: "cq1-8-q14",
      variant: "mastery",
      question: "Solve $\\lvert x - 1\\rvert + \\lvert x - 5\\rvert \\le 6$.",
      options: [
        { text: "$[0, 6]$", correct: true, feedback: "The distances to 1 and 5 add to at least 4. They add to 6 at $x = 0$ and $x = 6$, and less in between." },
        { text: "$[1, 5]$", feedback: "Those points give sum exactly 4, but the inequality allows up to 6, which reaches 1 unit beyond each end." },
        { text: "$[-1, 7]$", feedback: "At $x = -1$: $2 + 6 = 8 > 6$." },
        { text: "$(0, 6)$", feedback: "At $x = 0$ the sum is exactly 6, allowed by $\\le$." },
      ],
      hint: "Lesson 1.6: think of the sum of distances to 1 and 5, or split at 1 and 5.",
    },
    {
      type: "quiz",
      id: "cq1-8-q15",
      variant: "mastery",
      multiple: true,
      question: "Which inequalities hold for **every** real $x$? Select all that apply.",
      options: [
        { text: "$x^2 - x + 1 > 0$", correct: true, feedback: "$a > 0$, $D = -3 < 0$." },
        { text: "$x^2 + 1 \\ge 2x$", correct: true, feedback: "$x^2 - 2x + 1 = (x - 1)^2 \\ge 0$, with $D = 0$." },
        { text: "$-x^2 + 4x - 5 < 0$", correct: true, feedback: "$a < 0$, $D = 16 - 20 < 0$." },
        { text: "$x^2 - 4x + 3 > 0$", feedback: "It is negative between its roots 1 and 3." },
        { text: "$x^2 + 1 > 2x$", feedback: "At $x = 1$ both sides equal 2." },
      ],
      hint: "Lesson 1.2: test each with the sign of $a$ and the sign of $D$, watching strict versus non-strict.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Where next",
      content:
        "Several times in this chapter a discriminant came out negative and we said \"no real roots\" and moved on. Chapter 2 refuses to move on. It builds the number $i$ with $i^2 = -1$, and with it every quadratic has exactly two roots, the non-real ones arriving as conjugate pairs $p \\pm qi$. That pairing is the fact you already used in Lesson 1.4.",
    },
  ]),
};

export const cqChapter1Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lesson07,
  lessonMastery,
];
