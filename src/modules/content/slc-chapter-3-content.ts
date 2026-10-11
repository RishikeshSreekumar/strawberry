import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Straight Lines and Circles Chapter 3 — Families and Concurrency. Lines
 * treated in bulk: where two meet (cross-multiplication), when three meet
 * (the coefficient determinant), every line through a point at once
 * (L₁ + λL₂ = 0 and fixed points of parameter families), lines at a given
 * angle to a line and reflections of lines, the pair ax² + 2hxy + by² = 0
 * through the origin, the general second-degree pair (Δ = 0, point of
 * intersection, angle, homogenisation), and JEE triangle problems built
 * from sides, medians, altitudes and bisectors.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "intersection-and-concurrency",
  title: "3.1 · Intersection and Concurrency",
  position: 1,
  blocks: blocks([
    {
      type: "text",
      content:
        "Two lines in the plane do one of three things: they cross at exactly one point, they never meet (parallel), or they are the same line. Three lines have one more possibility that JEE loves: all three can pass through **one common point**. Such lines are called **concurrent**, and the medians, altitudes and angle bisectors of every triangle are the famous examples.",
    },
    {
      type: "text",
      content:
        "This lesson turns both questions into arithmetic on the coefficients. Where do two lines meet? A formula you can write down without solving anything. Do three lines meet? A single $3 \\times 3$ determinant.",
    },
    { type: "heading", text: "Where two lines meet" },
    {
      type: "text",
      content:
        "A point lies on both $a_1x + b_1y + c_1 = 0$ and $a_2x + b_2y + c_2 = 0$ exactly when its coordinates satisfy both equations. So the intersection is the solution of the simultaneous equations. Eliminating $y$ (multiply the first by $b_2$, the second by $b_1$, subtract) and then $x$ the same way gives a symmetric pattern called **cross-multiplication**:",
    },
    {
      type: "math",
      latex:
        "\\frac{x}{b_1c_2 - b_2c_1} = \\frac{y}{c_1a_2 - c_2a_1} = \\frac{1}{a_1b_2 - a_2b_1}",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Two lines: the three cases",
      content:
        "For $L_1: a_1x + b_1y + c_1 = 0$ and $L_2: a_2x + b_2y + c_2 = 0$:\n\n- $a_1b_2 - a_2b_1 \\ne 0$: one point of intersection, $\\left(\\frac{b_1c_2 - b_2c_1}{a_1b_2 - a_2b_1},\\ \\frac{c_1a_2 - c_2a_1}{a_1b_2 - a_2b_1}\\right)$\n- $\\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\ne \\frac{c_1}{c_2}$: parallel, no common point\n- $\\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2}$: the same line",
    },
    {
      type: "text",
      content:
        "The denominator $a_1b_2 - a_2b_1$ is zero exactly when the slopes $-\\frac{a_1}{b_1}$ and $-\\frac{a_2}{b_2}$ are equal, which is the picture: parallel lines never meet, so the formula breaks down precisely there.",
    },
    {
      type: "interactive",
      config: {
        component: "slc-line-explorer",
        mode: "two-lines",
        a: [-3, -2],
        b: [3, 1],
        c: [-2, 3],
        d: [2, -3],
        caption:
          "Drag the four points. The intersection of $L_1$ and $L_2$ moves with them. Make the lines parallel and watch the intersection run off to infinity: that is the denominator $a_1b_2 - a_2b_1$ shrinking to zero.",
      },
    },
    {
      type: "worked-example",
      id: "slc3-1-we1",
      title: "Worked example 1: intersection by cross-multiplication",
      problem: "Find the point where $2x + 3y - 8 = 0$ meets $3x - y - 1 = 0$.",
      steps: [
        { text: "Read off $a_1 = 2$, $b_1 = 3$, $c_1 = -8$ and $a_2 = 3$, $b_2 = -1$, $c_2 = -1$." },
        {
          text: "Compute the three cross-products. *Why this step:* writing the coefficients in two rows and cross-multiplying is faster and less error-prone than eliminating by hand.",
          latex:
            "b_1c_2 - b_2c_1 = -3 - 8 = -11,\\quad c_1a_2 - c_2a_1 = -24 + 2 = -22,\\quad a_1b_2 - a_2b_1 = -2 - 9 = -11",
        },
        { text: "So $x = \\frac{-11}{-11} = 1$ and $y = \\frac{-22}{-11} = 2$. Check: $2 + 6 - 8 = 0$ and $3 - 2 - 1 = 0$." },
      ],
      answer: "$(1, 2)$.",
    },
    { type: "heading", text: "When three lines are concurrent" },
    {
      type: "text",
      content:
        "Three lines are concurrent when the point where two of them meet also lies on the third. Put the intersection of $L_1$ and $L_2$ from the cross-multiplication formula into $L_3$ and clear the denominator:",
    },
    {
      type: "math",
      latex:
        "a_3(b_1c_2 - b_2c_1) + b_3(c_1a_2 - c_2a_1) + c_3(a_1b_2 - a_2b_1) = 0 \\iff \\begin{vmatrix} a_1 & b_1 & c_1 \\\\ a_2 & b_2 & c_2 \\\\ a_3 & b_3 & c_3 \\end{vmatrix} = 0",
    },
    {
      type: "text",
      content:
        "The left side is exactly the expansion of the determinant along its third row, which is why the condition looks so tidy. An equivalent test that is often quicker: the lines are concurrent if you can find constants $\\alpha, \\beta, \\gamma$, not all zero, with $\\alpha L_1 + \\beta L_2 + \\gamma L_3 \\equiv 0$ identically. At the common point of $L_1$ and $L_2$, that identity forces $\\gamma L_3 = 0$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Concurrency condition",
      content:
        "Three lines $a_ix + b_iy + c_i = 0$ ($i = 1, 2, 3$), no two of them parallel, are concurrent if and only if\n\n$$\\begin{vmatrix} a_1 & b_1 & c_1 \\\\ a_2 & b_2 & c_2 \\\\ a_3 & b_3 & c_3 \\end{vmatrix} = 0.$$\n\nEquivalently, some combination $\\alpha L_1 + \\beta L_2 + \\gamma L_3$ with $\\alpha, \\beta, \\gamma$ not all zero vanishes identically.",
    },
    {
      type: "worked-example",
      id: "slc3-1-we2",
      title: "Worked example 2: a parameter that makes three lines concurrent",
      problem: "Find $k$ so that $3x + y - 2 = 0$, $kx + 2y - 3 = 0$ and $2x - y - 3 = 0$ are concurrent.",
      steps: [
        {
          text: "Intersect the two lines that contain no $k$: adding $3x + y = 2$ and $2x - y = 3$ gives $5x = 5$, so $x = 1$, $y = -1$. *Why this step:* solving the parameter-free pair first leaves a one-line equation for $k$, which is quicker than expanding a determinant with $k$ inside.",
        },
        { text: "Make the third line pass through $(1, -1)$: $k - 2 - 3 = 0$, so $k = 5$." },
        {
          text: "Cross-check with the determinant.",
          latex:
            "\\begin{vmatrix} 3 & 1 & -2 \\\\ 5 & 2 & -3 \\\\ 2 & -1 & -3 \\end{vmatrix} = 3(-6 - 3) - 1(-15 + 6) - 2(-5 - 4) = -27 + 9 + 18 = 0",
        },
      ],
      answer: "$k = 5$; the lines meet at $(1, -1)$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"determinant zero means the lines meet at a point\"",
      content:
        "The determinant also vanishes when two of the lines are parallel. For $x + y = 1$, $x + y = 2$, $x + y = 3$ the first two columns of the determinant are equal, so it is 0, yet the three lines are parallel and share no point at all. The test is \"concurrent **or** at least two parallel\": always check the slopes before you conclude concurrency.",
    },
    { type: "heading", text: "The triangle formed by three lines" },
    {
      type: "text",
      content:
        "If three lines are neither concurrent nor parallel in pairs, they cut out a triangle. To find its area, find the three vertices pairwise and use the determinant area formula from Chapter 0. There is also a closed form: if $\\Delta$ is the coefficient determinant and $C_1, C_2, C_3$ are the cofactors of $c_1, c_2, c_3$ (that is, $C_1 = a_2b_3 - a_3b_2$ and so on), then",
    },
    {
      type: "math",
      latex: "\\text{Area} = \\frac{\\Delta^2}{2\\,\\lvert C_1C_2C_3\\rvert}",
    },
    {
      type: "worked-example",
      id: "slc3-1-we3",
      title: "Worked example 3: area cut out by three lines",
      problem: "Find the area of the triangle formed by $x - y + 1 = 0$, $x + y - 5 = 0$ and $y = 0$.",
      steps: [
        { text: "First two lines: adding gives $2x = 4$, so the vertex is $(2, 3)$." },
        { text: "With $y = 0$: the first gives $(-1, 0)$ and the second gives $(5, 0)$." },
        {
          text: "The base on the x-axis has length $6$ and the height is the y-coordinate $3$ of the top vertex. *Why this step:* when one side lies on an axis, base times height is quicker than the full determinant.",
          latex: "\\text{Area} = \\tfrac12 \\cdot 6 \\cdot 3 = 9",
        },
        {
          text: "Check with the closed form: $\\Delta = 6$ and the cofactors are $C_1 = 1$, $C_2 = 1$, $C_3 = 2$, so $\\frac{36}{2 \\cdot 2} = 9$.",
        },
      ],
      answer: "$9$ square units.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "slc3-1-q1",
      variant: "practice",
      question: "The lines $x + 2y = 7$ and $3x - y = 7$ meet at $(h, k)$. Find $h + k$.",
      answer: 5,
      hint: "Substitute $y = 3x - 7$ from the second equation into the first.",
      solution: "$x + 2(3x - 7) = 7$ gives $7x = 21$, so $x = 3$ and $y = 2$. Then $h + k = 5$.",
      commonMistakes: [
        { answer: 3, feedback: "That is only $h$. Add $k = 2$." },
        { answer: 1, feedback: "Check the sign of $y$: $y = 3(3) - 7 = 2$, not $-2$." },
      ],
    },
    {
      type: "quiz",
      id: "slc3-1-q2",
      variant: "practice",
      question: "Where do $2x - 3y + 1 = 0$ and $x + y - 2 = 0$ meet?",
      options: [
        { text: "$(1, 1)$", correct: true, feedback: "$2 - 3 + 1 = 0$ and $1 + 1 - 2 = 0$." },
        { text: "$(-1, 1)$", feedback: "$2(-1) - 3 + 1 = -4 \\ne 0$, so it is not on the first line." },
        { text: "$(2, 0)$", feedback: "It lies on the second line, but $4 - 0 + 1 = 5 \\ne 0$." },
        { text: "$(1, -1)$", feedback: "$1 - 1 - 2 = -2 \\ne 0$: not on the second line." },
      ],
      hint: "Substitute $y = 2 - x$ into the first equation, or test each option in both equations.",
    },
    {
      type: "numeric",
      id: "slc3-1-q3",
      variant: "practice",
      question: "Find $k$ so that $2x + y - 5 = 0$, $x - y - 1 = 0$ and $3x + ky - 8 = 0$ are concurrent.",
      answer: 2,
      hint: "Find where the first two lines meet, then make the third pass through that point.",
      solution: "Adding the first two: $3x = 6$, so $x = 2$, $y = 1$. Then $6 + k - 8 = 0$ gives $k = 2$.",
      commonMistakes: [
        { answer: -2, feedback: "Sign slip: $3(2) + k(1) - 8 = 0$ gives $k = 2$." },
        { answer: 5, feedback: "Recheck the common point of the first two lines: it is $(2, 1)$." },
      ],
    },
    {
      type: "quiz",
      id: "slc3-1-q4",
      variant: "concept",
      question:
        "For which set of three lines is the coefficient determinant zero, yet there is **no** point common to all three?",
      options: [
        {
          text: "$x + 2y = 3$, $2x + 4y = 5$, $3x + 6y = 1$",
          correct: true,
          feedback: "All three are parallel (slope $-\\frac12$). Two columns of the determinant are proportional, so it is 0, but the lines never meet.",
        },
        {
          text: "$x + y = 2$, $x - y = 0$, $2x + y = 3$",
          feedback: "The determinant is 0 here too, but these lines really are concurrent, at $(1, 1)$.",
        },
        {
          text: "$x = 0$, $y = 0$, $x + y = 1$",
          feedback: "Its determinant is $-1 \\ne 0$: these lines form a triangle.",
        },
        {
          text: "$x - y = 1$, $x + y = 3$, $x = 2$",
          feedback: "These are concurrent at $(2, 1)$: the determinant vanishes and there is a common point.",
        },
      ],
      hint: "A zero determinant means \"concurrent or at least two parallel\". Look for parallel lines.",
    },
    {
      type: "numeric",
      id: "slc3-1-q5",
      variant: "practice",
      question: "Find the area of the triangle formed by $x = 0$, $y = 0$ and $3x + 4y = 12$.",
      answer: 6,
      hint: "The third line meets the axes at its intercepts.",
      solution: "Intercepts $(4, 0)$ and $(0, 3)$, so the triangle is right-angled at the origin with legs 4 and 3: area $\\frac12 \\cdot 4 \\cdot 3 = 6$.",
      commonMistakes: [
        { answer: 12, feedback: "You forgot the $\\frac12$ in the area of a triangle." },
        { answer: 7, feedback: "That is the sum of the intercepts, not an area." },
      ],
    },
    {
      type: "numeric",
      id: "slc3-1-q6",
      variant: "practice",
      question: "Find the area of the triangle formed by the lines $y = x$, $y = -x$ and $y = 4$.",
      answer: 16,
      hint: "The vertices are the origin and the two points where $y = 4$ meets $y = \\pm x$.",
      solution: "Vertices $(0, 0)$, $(4, 4)$, $(-4, 4)$. Base 8 along $y = 4$, height 4: area $\\frac12 \\cdot 8 \\cdot 4 = 16$.",
      commonMistakes: [
        { answer: 8, feedback: "The base from $(-4, 4)$ to $(4, 4)$ has length 8, not 4." },
        { answer: 32, feedback: "Don't forget the factor $\\frac12$." },
      ],
    },
    {
      type: "quiz",
      id: "slc3-1-q7",
      variant: "practice",
      multiple: true,
      question:
        "JEE Main. Let $a, b, c$ be real numbers, not all equal. The lines $ax + by + c = 0$, $bx + cy + a = 0$ and $cx + ay + b = 0$ are concurrent if and only if which of the following hold? Select all that apply.",
      options: [
        {
          text: "$a + b + c = 0$",
          correct: true,
          feedback: "The determinant equals $3abc - a^3 - b^3 - c^3 = -\\frac12(a + b + c)\\left[(a - b)^2 + (b - c)^2 + (c - a)^2\\right]$, and the bracket is positive when $a, b, c$ are not all equal.",
        },
        {
          text: "$a^3 + b^3 + c^3 = 3abc$",
          correct: true,
          feedback: "This is the determinant condition itself, and for $a, b, c$ not all equal it is equivalent to $a + b + c = 0$.",
        },
        { text: "$ab + bc + ca = 0$", feedback: "$a = b = 2$, $c = -1$ satisfies it, but the determinant is $-27 \\ne 0$." },
        { text: "$abc = 0$", feedback: "$a = 0$, $b = 1$, $c = 2$ gives determinant $-9 \\ne 0$." },
      ],
      hint: "Expand the circulant determinant $\\begin{vmatrix} a & b & c \\\\ b & c & a \\\\ c & a & b \\end{vmatrix}$ and factor $a^3 + b^3 + c^3 - 3abc$.",
    },
    {
      type: "numeric",
      id: "slc3-1-q8",
      variant: "practice",
      question:
        "JEE Advanced. The lines $x + ay + a = 0$, $bx + y + b = 0$ and $cx + cy + 1 = 0$ are concurrent, where $a, b, c$ are distinct and none equals 1. Find $\\dfrac{1}{1 - a} + \\dfrac{1}{1 - b} + \\dfrac{1}{1 - c}$.",
      answer: 2,
      hint: "In the determinant, subtract the first column from the second and the third, so that $1 - a$, $1 - b$, $1 - c$ appear on the diagonal.",
      solution:
        "After $C_2 \\to C_2 - C_1$ and $C_3 \\to C_3 - C_1$ the determinant is $\\begin{vmatrix} 1 & a - 1 & a - 1 \\\\ b & 1 - b & 0 \\\\ c & 0 & 1 - c \\end{vmatrix} = 0$. Expanding along the first row and dividing by $(1 - a)(1 - b)(1 - c)$ gives $\\frac{1}{1 - a} + \\frac{b}{1 - b} + \\frac{c}{1 - c} = 0$, i.e. $\\frac{a}{1 - a} + \\frac{b}{1 - b} + \\frac{c}{1 - c} = -1$. Since $\\frac{a}{1 - a} = \\frac{1}{1 - a} - 1$, the required sum is $-1 + 3 = 2$. (Check: $a = 2$, $b = 3$ forces $c = \\frac57$, and $-1 - \\frac12 + \\frac72 = 2$.)",
      commonMistakes: [
        { answer: -1, feedback: "That is $\\sum \\frac{a}{1 - a}$. Each $\\frac{1}{1 - a}$ is one more than $\\frac{a}{1 - a}$." },
        { answer: 1, feedback: "Recheck with $a = 2$, $b = 3$: concurrency forces $c = \\frac57$, and the sum is $-1 - \\frac12 + \\frac72 = 2$." },
      ],
    },
    {
      type: "quiz",
      id: "slc3-1-q9",
      variant: "practice",
      question: "Which line passes through the common point of $x + y = 2$ and $2x - y = 1$?",
      options: [
        { text: "$x - 2y + 1 = 0$", correct: true, feedback: "The common point is $(1, 1)$, and $1 - 2 + 1 = 0$." },
        { text: "$2x + y = 2$", feedback: "At $(1, 1)$: $2 + 1 = 3 \\ne 2$." },
        { text: "$x + 2y = 2$", feedback: "At $(1, 1)$: $1 + 2 = 3 \\ne 2$." },
        { text: "$3x - y = 1$", feedback: "At $(1, 1)$: $3 - 1 = 2 \\ne 1$." },
      ],
      hint: "Find the common point first: add the two equations.",
    },
    {
      type: "numeric",
      id: "slc3-1-q10",
      variant: "practice",
      question:
        "JEE Main. For how many real values of $k$ do the lines $x + y - 2 = 0$, $x - y = 0$ and $kx + 2y - 3 = 0$ **fail** to form a triangle?",
      answer: 3,
      hint: "Three lines fail to form a triangle when two are parallel or all three are concurrent. Check each case.",
      solution:
        "Parallel to $x + y = 2$ (slope $-1$): $-\\frac k2 = -1$, $k = 2$. Parallel to $x - y = 0$ (slope 1): $k = -2$. Concurrent: the first two meet at $(1, 1)$, and $k + 2 - 3 = 0$ gives $k = 1$. So three values.",
      commonMistakes: [
        { answer: 2, feedback: "You found the parallel cases but not the concurrent one (or vice versa). There are three." },
        { answer: 1, feedback: "Concurrency is only one way to fail. Parallel pairs also give no triangle." },
      ],
    },
    {
      type: "numeric",
      id: "slc3-1-q11",
      variant: "practice",
      question: "Find the area of the triangle formed by $x - y = 0$, $x + y = 0$ and $x + 2y - 6 = 0$.",
      answer: 12,
      hint: "The first two lines meet at the origin. Find where each meets the third line.",
      solution:
        "Vertices $(0, 0)$, $(2, 2)$ (from $x = y$) and $(-6, 6)$ (from $x = -y$). Area $= \\frac12 \\lvert 2 \\cdot 6 - 2 \\cdot (-6)\\rvert = 12$.",
      commonMistakes: [
        { answer: 24, feedback: "Halve the determinant: $\\frac12 \\cdot 24 = 12$." },
        { answer: 0, feedback: "The determinant is $2 \\cdot 6 - 2 \\cdot (-6) = 24$; a sign slip made it cancel." },
      ],
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "family-of-lines-through-a-point",
  title: "3.2 · The Family of Lines Through a Point",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "Picture two lines $L_1 = 0$ and $L_2 = 0$ crossing at a point $P$. Now imagine a third line pinned at $P$ and free to swing round it like the hand of a clock. Every position of that hand is a line through $P$. This lesson gives one equation, with one parameter, that describes every one of those positions at once, **without ever computing $P$**.",
    },
    { type: "heading", text: "Why L₁ + λL₂ = 0 passes through the intersection" },
    {
      type: "text",
      content:
        "Write $L_1 \\equiv a_1x + b_1y + c_1$ and $L_2 \\equiv a_2x + b_2y + c_2$, and for a number $\\lambda$ look at",
    },
    {
      type: "math",
      latex: "L_1 + \\lambda L_2 = 0 \\iff (a_1 + \\lambda a_2)x + (b_1 + \\lambda b_2)y + (c_1 + \\lambda c_2) = 0",
    },
    {
      type: "text",
      content:
        "Two facts make it work:\n\n1. It is **first degree** in $x$ and $y$, so it is a straight line (unless both coefficients vanish, which happens only when $L_1$ and $L_2$ are parallel).\n2. At $P$ both $L_1$ and $L_2$ are zero, so $L_1 + \\lambda L_2 = 0 + \\lambda \\cdot 0 = 0$: **every** member passes through $P$.\n\nAs $\\lambda$ runs over the reals, the slope $-\\frac{a_1 + \\lambda a_2}{b_1 + \\lambda b_2}$ takes every value except the slope of $L_2$ itself, so the family sweeps out every line through $P$ except $L_2$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The family through the intersection of two lines",
      content:
        "If $L_1 = 0$ and $L_2 = 0$ meet at $P$, then $L_1 + \\lambda L_2 = 0$ ($\\lambda \\in \\mathbb{R}$) is every line through $P$ except $L_2 = 0$ itself. The two-parameter form $\\mu L_1 + \\lambda L_2 = 0$ ($\\mu, \\lambda$ not both zero) includes $L_2$ as well ($\\mu = 0$).\n\nTo pick a member, impose one more condition (passes through a point, given slope, given intercept) and solve for $\\lambda$.",
    },
    {
      type: "interactive",
      config: {
        component: "slc-line-explorer",
        mode: "family",
        a: [-4, -1],
        b: [4, 3],
        c: [-3, 3],
        d: [3, -1],
        lambda: { min: -4, max: 4, step: 0.25, initial: 1 },
        show: ["family-fan"],
        caption:
          "Slide $\\lambda$. The highlighted member $L_1 + \\lambda L_2 = 0$ swings about the common point but never leaves it. At $\\lambda = 0$ it is $L_1$. As $\\lambda$ grows large in either direction it approaches $L_2$ without ever reaching it.",
      },
    },
    { type: "heading", text: "Picking one member of the family" },
    {
      type: "worked-example",
      id: "slc3-2-we1",
      title: "Worked example 1: a member through a given point",
      problem: "Find the line through the intersection of $2x + y - 5 = 0$ and $x - y - 1 = 0$ that passes through the origin.",
      steps: [
        { text: "Every line through the intersection is $(2x + y - 5) + \\lambda(x - y - 1) = 0$." },
        {
          text: "Substitute $(0, 0)$: $-5 - \\lambda = 0$, so $\\lambda = -5$. *Why this step:* one condition fixes the one unknown $\\lambda$; the intersection point itself is never needed.",
        },
        { text: "Substitute back: $2x + y - 5 - 5x + 5y + 5 = 0$, i.e. $-3x + 6y = 0$, or $x = 2y$." },
        { text: "Check: the two lines meet at $(2, 1)$, and $2 = 2 \\cdot 1$." },
      ],
      answer: "$x - 2y = 0$.",
    },
    {
      type: "worked-example",
      id: "slc3-2-we2",
      title: "Worked example 2: a member with a given slope",
      problem: "Find the line through the intersection of $x + 2y - 5 = 0$ and $3x - y - 1 = 0$ that is parallel to $x - y + 7 = 0$.",
      steps: [
        { text: "Family: $(1 + 3\\lambda)x + (2 - \\lambda)y - (5 + \\lambda) = 0$, with slope $-\\frac{1 + 3\\lambda}{2 - \\lambda}$." },
        {
          text: "Parallel to $x - y + 7 = 0$ means slope 1. *Why this step:* the slope of the member is a function of $\\lambda$, so the parallel condition is an equation in $\\lambda$.",
          latex: "-\\frac{1 + 3\\lambda}{2 - \\lambda} = 1 \\implies -1 - 3\\lambda = 2 - \\lambda \\implies \\lambda = -\\tfrac32",
        },
        { text: "Substitute: $-\\frac72 x + \\frac72 y - \\frac72 = 0$, i.e. $x - y + 1 = 0$." },
        { text: "Check: the given lines meet at $(1, 2)$, and $1 - 2 + 1 = 0$." },
      ],
      answer: "$x - y + 1 = 0$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"every line through P is L₁ + λL₂ = 0 for some λ\"",
      content:
        "$L_2$ itself is missing: no finite $\\lambda$ produces it. If the line you want happens to be $L_2$ (for example, the line through $P$ parallel to $L_2$ is $L_2$ itself), the equation for $\\lambda$ has no solution. When that happens, check $L_2$ directly, or use $\\mu L_1 + \\lambda L_2 = 0$ from the start.",
    },
    { type: "heading", text: "Families with a fixed point" },
    {
      type: "text",
      content:
        "Run the idea backwards. If a line's coefficients depend on a parameter **linearly**, say $(2 + k)x + (k - 1)y - (3 + 3k) = 0$, collect the terms with $k$: $(2x - y - 3) + k(x + y - 3) = 0$. That is $L_1 + kL_2 = 0$, so every member passes through the fixed point $L_1 = L_2 = 0$.",
    },
    {
      type: "worked-example",
      id: "slc3-2-we3",
      title: "Worked example 3: the fixed point of a parameter family",
      problem: "Show that the lines $(2 + k)x + (k - 1)y - (3 + 3k) = 0$ all pass through one point, and find it.",
      steps: [
        {
          text: "Separate the terms with $k$ from those without. *Why this step:* this rewrites the family as $L_1 + kL_2 = 0$, whose members all pass through $L_1 \\cap L_2$.",
          latex: "(2x - y - 3) + k(x + y - 3) = 0",
        },
        { text: "Solve $2x - y = 3$ and $x + y = 3$: adding, $3x = 6$, so $x = 2$, $y = 1$." },
      ],
      answer: "Every member passes through $(2, 1)$.",
    },
    {
      type: "text",
      content:
        "A second disguise: the family $ax + by + c = 0$ where $a, b, c$ satisfy one linear relation $pa + qb + rc = 0$ with $r \\ne 0$. Divide the relation by $r$: $a \\cdot \\frac pr + b \\cdot \\frac qr + c = 0$. That says the point $\\left(\\frac pr, \\frac qr\\right)$ satisfies **every** line of the family.",
    },
    {
      type: "worked-example",
      id: "slc3-2-we4",
      title: "Worked example 4: coefficients tied by a linear relation",
      problem: "If $3a + 2b + 6c = 0$, show that the lines $ax + by + c = 0$ are concurrent and find the common point.",
      steps: [
        {
          text: "Divide the relation by the coefficient of $c$. *Why this step:* we want it in the shape $a \\cdot x_0 + b \\cdot y_0 + c = 0$, which reads \"$(x_0, y_0)$ lies on the line\".",
          latex: "\\tfrac12 a + \\tfrac13 b + c = 0",
        },
        { text: "So $x = \\frac12$, $y = \\frac13$ satisfies $ax + by + c = 0$ for every admissible $(a, b, c)$." },
      ],
      answer: "All the lines pass through $\\left(\\frac12, \\frac13\\right)$.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "JEE classic: coefficients in AP",
      content:
        "If $a, b, c$ are in arithmetic progression, then $2b = a + c$, i.e. $a - 2b + c = 0$. Read it as $a(1) + b(-2) + c = 0$: every line $ax + by + c = 0$ passes through $(1, -2)$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "slc3-2-q1",
      variant: "practice",
      question: "Which is the line through the origin and the intersection of $x + y = 5$ and $x - y = 1$?",
      options: [
        { text: "$2x - 3y = 0$", correct: true, feedback: "The intersection is $(3, 2)$, and $6 - 6 = 0$." },
        { text: "$3x - 2y = 0$", feedback: "At $(3, 2)$: $9 - 4 = 5 \\ne 0$. The slope should be $\\frac23$, not $\\frac32$." },
        { text: "$x + y = 5$", feedback: "That is one of the given lines, and it misses the origin." },
        { text: "$x - 3y = 0$", feedback: "At $(3, 2)$: $3 - 6 \\ne 0$." },
      ],
      hint: "Use $(x + y - 5) + \\lambda(x - y - 1) = 0$ and put $(0, 0)$ in, or find the intersection and join it to $O$.",
    },
    {
      type: "numeric",
      id: "slc3-2-q2",
      variant: "practice",
      question: "For which $\\lambda$ does the line $(x + y - 4) + \\lambda(2x - y - 2) = 0$ pass through $(0, 1)$?",
      answer: -1,
      hint: "Substitute $x = 0$, $y = 1$ and solve the linear equation for $\\lambda$.",
      solution: "$(0 + 1 - 4) + \\lambda(0 - 1 - 2) = 0$ gives $-3 - 3\\lambda = 0$, so $\\lambda = -1$. The member is $x - 2y + 2 = 0$, which passes through $(0, 1)$ and through $(2, 2)$, the common point.",
      commonMistakes: [
        { answer: 1, feedback: "Sign slip: $-3 - 3\\lambda = 0$ gives $\\lambda = -1$." },
        { answer: 3, feedback: "You may have dropped the $-1$ inside $2x - y - 2$ at $(0, 1)$: it is $-3$." },
      ],
    },
    {
      type: "numeric",
      id: "slc3-2-q3",
      variant: "practice",
      question:
        "For every real $k$ the line $(1 + 3k)x + (k - 2)y + (3 - 5k) = 0$ passes through a fixed point $(p, q)$. Find $p + q$.",
      answer: 3,
      hint: "Collect the $k$ terms: write the line as $L_1 + kL_2 = 0$.",
      solution: "$(x - 2y + 3) + k(3x + y - 5) = 0$. Solve $x - 2y = -3$ and $3x + y = 5$: $x = 1$, $y = 2$. So $p + q = 3$.",
      commonMistakes: [
        { answer: -3, feedback: "Check the point in $x - 2y + 3 = 0$: $(1, 2)$ works, $(-1, -2)$ does not." },
        { answer: 1, feedback: "That is only $p$. Add $q = 2$." },
      ],
    },
    {
      type: "quiz",
      id: "slc3-2-q4",
      variant: "practice",
      question: "JEE Main. If $a, b, c$ are in AP, the lines $ax + by + c = 0$ all pass through",
      options: [
        { text: "$(1, -2)$", correct: true, feedback: "$a - 2b + c = 0$ is exactly the AP condition $2b = a + c$." },
        { text: "$(-1, 2)$", feedback: "That needs $-a + 2b + c = 0$, i.e. $2b = a - c$, which is not the AP condition." },
        { text: "$(1, 2)$", feedback: "$a + 2b + c = 0$ would need $2b = -(a + c)$." },
        { text: "$(2, -1)$", feedback: "$2a - b + c = 0$ is not implied by $2b = a + c$: try $a = 1$, $b = 2$, $c = 3$." },
      ],
      hint: "Write the AP condition $2b = a + c$ in the form $a \\cdot x_0 + b \\cdot y_0 + c = 0$.",
    },
    {
      type: "numeric",
      id: "slc3-2-q5",
      variant: "practice",
      question:
        "The line through the intersection of $x - 3y + 1 = 0$ and $2x + 5y - 9 = 0$, perpendicular to $3x + 4y = 7$, is $4x - 3y + c = 0$. Find $c$.",
      answer: -5,
      hint: "Lines perpendicular to $3x + 4y = 7$ have the form $4x - 3y + c = 0$. Find the intersection point and substitute.",
      solution: "From the first, $x = 3y - 1$; then $6y - 2 + 5y = 9$ gives $y = 1$, $x = 2$. So $8 - 3 + c = 0$, $c = -5$.",
      commonMistakes: [
        { answer: 5, feedback: "Sign slip: $8 - 3 + c = 0$ gives $c = -5$." },
        { answer: -11, feedback: "Recheck the intersection: it is $(2, 1)$, not $(2, -1)$." },
      ],
    },
    {
      type: "quiz",
      id: "slc3-2-q6",
      variant: "practice",
      multiple: true,
      question:
        "Which lines belong to the family through the intersection of $x + y - 2 = 0$ and $x - y = 0$? Select all that apply.",
      options: [
        { text: "$2x - y - 1 = 0$", correct: true, feedback: "The common point is $(1, 1)$, and $2 - 1 - 1 = 0$." },
        { text: "$x = 1$", correct: true, feedback: "It is $\\frac12(L_1 + L_2)$, and it passes through $(1, 1)$." },
        { text: "$3x + y - 4 = 0$", correct: true, feedback: "$3 + 1 - 4 = 0$." },
        { text: "$x + 2y - 4 = 0$", feedback: "At $(1, 1)$: $1 + 2 - 4 = -1 \\ne 0$." },
        { text: "$2x + y - 2 = 0$", feedback: "At $(1, 1)$: $2 + 1 - 2 = 1 \\ne 0$." },
      ],
      hint: "A line belongs to the family exactly when it passes through the common point $(1, 1)$.",
    },
    {
      type: "numeric",
      id: "slc3-2-q7",
      variant: "practice",
      question:
        "The real numbers $a, b, c$ satisfy $3a - 2b + 5c = 0$. Every line $ax + by + c = 0$ then passes through a fixed point $(p, q)$. Find $p + q$.",
      answer: 0.2,
      tolerance: 0.001,
      hint: "Divide the relation by 5 so that $c$ has coefficient 1.",
      solution: "$\\frac35 a - \\frac25 b + c = 0$, so $(p, q) = \\left(\\frac35, -\\frac25\\right)$ and $p + q = \\frac15 = 0.2$.",
      commonMistakes: [
        { answer: 1, feedback: "That is $3 - 2$: divide by the coefficient of $c$ first." },
        { answer: -0.2, tolerance: 0.001, feedback: "Recheck the sign of $q$: the relation reads $a \\cdot \\frac35 + b \\cdot \\left(-\\frac25\\right) + c = 0$, so $p + q = \\frac35 - \\frac25$." },
      ],
    },
    {
      type: "quiz",
      id: "slc3-2-q8",
      variant: "practice",
      multiple: true,
      question:
        "JEE Main. Which lines pass through the intersection of $2x + 3y + 1 = 0$ and $3x - 5y - 5 = 0$ and are equally inclined to the axes? Select all that apply.",
      options: [
        { text: "$19x - 19y - 23 = 0$", correct: true, feedback: "The common point is $\\left(\\frac{10}{19}, -\\frac{13}{19}\\right)$; this line has slope 1 and $10 + 13 - 23 = 0$." },
        { text: "$19x + 19y + 3 = 0$", correct: true, feedback: "Slope $-1$, and $10 - 13 + 3 = 0$." },
        { text: "$19x - 19y + 23 = 0$", feedback: "Slope 1, but $10 + 13 + 23 \\ne 0$: it misses the common point." },
        { text: "$19x + 19y - 3 = 0$", feedback: "Slope $-1$, but $10 - 13 - 3 \\ne 0$." },
        { text: "$x + y = 0$", feedback: "Slope $-1$, but $\\frac{10}{19} - \\frac{13}{19} \\ne 0$." },
      ],
      hint: "\"Equally inclined to the axes\" means slope $1$ or $-1$. Find the common point, then write both lines.",
    },
    {
      type: "numeric",
      id: "slc3-2-q9",
      variant: "practice",
      question:
        "A line through the intersection of $2x - y - 1 = 0$ and $x + 2y - 8 = 0$ makes **equal non-zero** intercepts $a$ on the two axes. Find $a$.",
      answer: 5,
      hint: "A line with equal non-zero intercepts is $x + y = a$.",
      solution: "The lines meet at $(2, 3)$ (from $4x - 2y = 2$ and $x + 2y = 8$, $5x = 10$). Then $x + y = a$ through $(2, 3)$ gives $a = 5$.",
      commonMistakes: [
        { answer: 0, feedback: "The line through the origin also has \"equal\" intercepts 0, but the question asks for non-zero intercepts." },
        { answer: -1, feedback: "That would be $x - y = a$: equal intercepts means $\\frac xa + \\frac ya = 1$, i.e. $x + y = a$." },
      ],
    },
    {
      type: "quiz",
      id: "slc3-2-q10",
      variant: "concept",
      multiple: true,
      question:
        "$L_1 = 0$ and $L_2 = 0$ are non-parallel lines meeting at $P$. Which statements about $L_1 + \\lambda L_2 = 0$ are true? Select all that apply.",
      options: [
        { text: "It passes through $P$ for every real $\\lambda$", correct: true, feedback: "At $P$ both $L_1$ and $L_2$ vanish." },
        { text: "$\\lambda = 0$ gives $L_1$", correct: true, feedback: "The $L_2$ term drops out." },
        { text: "No real $\\lambda$ gives $L_2$", correct: true, feedback: "$L_2$ is only the limit as $\\lambda \\to \\pm\\infty$." },
        { text: "Every line through $P$ is a member", feedback: "$L_2$ is missing. Use $\\mu L_1 + \\lambda L_2 = 0$ to include it." },
        { text: "Only $\\lambda > 0$ gives lines through $P$", feedback: "Any real $\\lambda$ works, negative values included." },
      ],
      hint: "Substitute $P$; then ask which slope the family never reaches.",
    },
    {
      type: "numeric",
      id: "slc3-2-q11",
      variant: "practice",
      question:
        "JEE Advanced. For real $a, b$ not both zero, consider the lines $(a + 2b)x + (a - b)y + (a + 5b) = 0$. Find the greatest possible distance of the origin from such a line.",
      answer: 2.236,
      tolerance: 0.01,
      hint: "Collect the $a$ and $b$ terms to find the fixed point $P$ of the family. Which line through $P$ is farthest from $O$?",
      solution:
        "$a(x + y + 1) + b(2x - y + 5) = 0$, so every line passes through $P$, where $x + y = -1$ and $2x - y = -5$: $P = (-2, 1)$. The distance from $O$ to a line through $P$ is at most $OP$, reached by the line perpendicular to $OP$. So the maximum is $OP = \\sqrt{4 + 1} = \\sqrt5 \\approx 2.236$.",
      commonMistakes: [
        { answer: 5, feedback: "That is $OP^2$. Take the square root." },
        { answer: 1, feedback: "That is the distance to one particular member, not the greatest." },
      ],
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "lines-at-a-given-angle-and-reflection",
  title: "3.3 · Lines at a Given Angle and Reflection of a Line",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "Stand at a point $P$ and look at a line $\\ell$. How many lines through $P$ make an angle of $45^\\circ$ with $\\ell$? Turn a ruler about $P$ and watch the angle it makes with $\\ell$: it passes through $45^\\circ$ **twice** in each half-turn, once tilted one way and once the other. So the answer is two, and forgetting the second one is the classic way to lose marks on this topic.",
    },
    {
      type: "text",
      content:
        "The second half of the lesson reflects a whole line in a mirror line. The trick is to notice that a line is fixed by two of its points, and one of them, the point where it hits the mirror, reflects to itself for free.",
    },
    { type: "heading", text: "Two lines at a given angle" },
    {
      type: "text",
      content:
        "Let $\\ell$ have inclination $\\theta_0$, so its slope is $m_0 = \\tan\\theta_0$. A line making an angle $\\alpha$ with $\\ell$ has inclination $\\theta_0 + \\alpha$ or $\\theta_0 - \\alpha$. Its slope is the tangent of that, and the addition formula gives both answers at once:",
    },
    {
      type: "math",
      latex: "m = \\tan(\\theta_0 \\pm \\alpha) = \\frac{m_0 \\pm \\tan\\alpha}{1 \\mp m_0\\tan\\alpha}",
    },
    {
      type: "text",
      content:
        "Equivalently, solve $\\tan\\alpha = \\left\\lvert\\frac{m - m_0}{1 + mm_0}\\right\\rvert$ for $m$: the modulus splits into two equations, one for each line. If a denominator $1 \\mp m_0\\tan\\alpha$ is zero, that line is **vertical**, and the slope formula simply cannot show it.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Lines through a point at a given angle to a line",
      content:
        "Through $(x_1, y_1)$ there are two lines making an acute angle $\\alpha$ with a line of slope $m_0$:\n\n$$y - y_1 = \\frac{m_0 + \\tan\\alpha}{1 - m_0\\tan\\alpha}(x - x_1), \\qquad y - y_1 = \\frac{m_0 - \\tan\\alpha}{1 + m_0\\tan\\alpha}(x - x_1)$$\n\nIf a denominator vanishes, the corresponding line is $x = x_1$. For $\\alpha = 45^\\circ$ the two lines are always perpendicular to each other.",
    },
    {
      type: "worked-example",
      id: "slc3-3-we1",
      title: "Worked example 1: two lines at 45°",
      problem: "Find the lines through $(2, 3)$ that make an angle of $45^\\circ$ with $3x - y + 4 = 0$.",
      steps: [
        { text: "The given line has slope $m_0 = 3$, and $\\tan 45^\\circ = 1$." },
        {
          text: "Use both signs. *Why this step:* the modulus in $\\tan\\alpha = \\left\\lvert\\frac{m - m_0}{1 + mm_0}\\right\\rvert$ hides two cases, one for each side of $\\ell$.",
          latex: "m = \\frac{3 + 1}{1 - 3} = -2, \\qquad m = \\frac{3 - 1}{1 + 3} = \\frac12",
        },
        { text: "Through $(2, 3)$: $y - 3 = -2(x - 2)$ and $y - 3 = \\frac12(x - 2)$." },
        { text: "Check one: between slopes $-2$ and $3$, $\\left\\lvert\\frac{-2 - 3}{1 - 6}\\right\\rvert = 1$." },
      ],
      answer: "$2x + y - 7 = 0$ and $x - 2y + 4 = 0$.",
    },
    {
      type: "worked-example",
      id: "slc3-3-we2",
      title: "Worked example 2: sides of an equilateral triangle",
      problem:
        "JEE Main. The vertex $A$ of an equilateral triangle is $(2, 3)$ and the opposite side lies on $x + y = 2$. Find the equations of the other two sides.",
      steps: [
        {
          text: "Each of the other sides passes through $A$ and makes $60^\\circ$ with $x + y = 2$. *Why this step:* every angle of an equilateral triangle is $60^\\circ$, including the angles at the two base vertices, between the base and the slanted sides.",
        },
        {
          text: "The base has inclination $135^\\circ$. Adding and subtracting $60^\\circ$ gives inclinations $195^\\circ$ (the same direction as $15^\\circ$) and $75^\\circ$.",
          latex: "\\tan 15^\\circ = 2 - \\sqrt3, \\qquad \\tan 75^\\circ = 2 + \\sqrt3",
        },
        { text: "So the sides are $y - 3 = (2 \\pm \\sqrt3)(x - 2)$." },
      ],
      answer: "$y - 3 = (2 + \\sqrt3)(x - 2)$ and $y - 3 = (2 - \\sqrt3)(x - 2)$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"there is one line at angle α\"",
      content:
        "Dropping the modulus gives one equation and one line. There are always two (for $0 < \\alpha < 90^\\circ$). Worse, one of them may be vertical: the lines through $(1, 1)$ at $45^\\circ$ to $y = x$ are $y = 1$ and $x = 1$, and the formula only shows the first (the other has denominator $1 - 1 \\cdot 1 = 0$).",
    },
    { type: "heading", text: "Reflecting a line in a line" },
    {
      type: "text",
      content:
        "To reflect a line $L$ in a mirror line $M$, reflect two points of $L$ and join the images. The cheapest choice of the first point is the point $P$ where $L$ meets $M$: it is on the mirror, so it is its own image. Then one more point of $L$, reflected with the image formula from Chapter 2, finishes the job:",
    },
    {
      type: "math",
      latex: "\\frac{x - x_1}{a} = \\frac{y - y_1}{b} = \\frac{-2(ax_1 + by_1 + c)}{a^2 + b^2}",
    },
    {
      type: "text",
      content:
        "Picture check: $L$ and its image make **equal angles** with $M$, on opposite sides of it. So $M$ is one of the angle bisectors of the pair ($L$, image of $L$). If $L$ is parallel to $M$, there is no $P$; the image is the parallel line on the other side of $M$ at the same distance.",
    },
    {
      type: "interactive",
      config: {
        component: "slc-line-explorer",
        mode: "two-lines",
        a: [-2, -4],
        b: [3, 2],
        c: [-4, 1],
        d: [4, 3],
        show: ["bisectors"],
        caption:
          "Read $L_1$ and $L_2$ as a line and its mirror image: the mirror must be one of the two dashed bisectors. Drag the points until a bisector is where you want the mirror; the angle readout shows that both lines make the same angle with it.",
      },
    },
    {
      type: "worked-example",
      id: "slc3-3-we3",
      title: "Worked example 3: the image of a line",
      problem: "Find the image of the line $2x - y - 4 = 0$ in the line $x + y - 5 = 0$.",
      steps: [
        {
          text: "Where $L$ meets the mirror: $2x - y = 4$ and $x + y = 5$ give $3x = 9$, so $P = (3, 2)$. *Why this step:* $P$ is on the mirror, so it is its own image. That is one point of the answer for free.",
        },
        {
          text: "Take another point of $L$, say $(2, 0)$, and reflect it: $L_M(2, 0) = 2 + 0 - 5 = -3$.",
          latex: "\\frac{x - 2}{1} = \\frac{y - 0}{1} = \\frac{-2(-3)}{2} = 3 \\implies (5, 3)",
        },
        { text: "Join $(3, 2)$ and $(5, 3)$: slope $\\frac12$, so $y - 2 = \\frac12(x - 3)$." },
        {
          text: "Check: $L$ (slope 2) and the image (slope $\\frac12$) make equal angles with the mirror (slope $-1$): $\\left\\lvert\\frac{2 + 1}{1 - 2}\\right\\rvert = 3 = \\left\\lvert\\frac{\\frac12 + 1}{1 - \\frac12}\\right\\rvert$.",
        },
      ],
      answer: "$x - 2y + 1 = 0$.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Mirrors you can do in your head",
      content:
        "- In the x-axis: replace $y$ by $-y$.\n- In the y-axis: replace $x$ by $-x$.\n- In $y = x$: swap $x$ and $y$.\n- In $y = -x$: replace $(x, y)$ by $(-y, -x)$.\n- In $x = k$: replace $x$ by $2k - x$. In $y = k$: replace $y$ by $2k - y$.",
    },
    { type: "heading", text: "Light rays and shortest paths" },
    {
      type: "text",
      content:
        "A light ray reflected by a mirror obeys \"angle of incidence = angle of reflection\". In coordinates that says: the reflected ray lies along the **image of the incident line**, or equivalently, the reflected ray looks as if it came straight from the image of the source. The same picture solves \"shortest path via a line\": to minimise $PA + PB$ with $P$ on a line, reflect $A$ in the line to $A'$; then $PA + PB = PA' + PB \\ge A'B$, with equality when $P$ is on segment $A'B$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "slc3-3-q1",
      variant: "practice",
      question: "What are the slopes of the lines that make an angle of $45^\\circ$ with a line of slope 2?",
      options: [
        { text: "$-3$ and $\\frac13$", correct: true, feedback: "$\\frac{2 + 1}{1 - 2} = -3$ and $\\frac{2 - 1}{1 + 2} = \\frac13$." },
        { text: "$3$ and $-\\frac13$", feedback: "Between slopes 3 and 2: $\\frac{1}{1 + 6} = \\frac17$, not 1." },
        { text: "$1$ and $-1$", feedback: "Those make $45^\\circ$ with the x-axis, not with the given line." },
        { text: "$3$ and $\\frac13$", feedback: "Check slope 3 against slope 2: $\\tan\\theta = \\frac17$, not 1." },
      ],
      hint: "Use $m = \\frac{m_0 \\pm 1}{1 \\mp m_0}$ with $m_0 = 2$.",
    },
    {
      type: "numeric",
      id: "slc3-3-q2",
      variant: "practice",
      question:
        "Two lines through the origin each make an angle of $45^\\circ$ with $x - 2y = 3$. Find the product of their slopes.",
      answer: -1,
      hint: "Find both slopes from $m = \\frac{m_0 \\pm 1}{1 \\mp m_0}$ with $m_0 = \\frac12$.",
      solution:
        "$m = \\frac{\\frac12 + 1}{1 - \\frac12} = 3$ and $m = \\frac{\\frac12 - 1}{1 + \\frac12} = -\\frac13$. The product is $-1$: the two lines at $45^\\circ$ to any line are perpendicular to each other, since their inclinations differ by $90^\\circ$.",
      commonMistakes: [
        { answer: 1, feedback: "Recheck the second slope: $\\frac{\\frac12 - 1}{1 + \\frac12} = -\\frac13$." },
        { answer: 0.25, feedback: "That is $\\left(\\frac12\\right)^2$, the given slope squared." },
      ],
    },
    {
      type: "quiz",
      id: "slc3-3-q3",
      variant: "practice",
      multiple: true,
      question: "Which lines pass through $(1, 2)$ and make an angle of $45^\\circ$ with the x-axis? Select all that apply.",
      options: [
        { text: "$x - y + 1 = 0$", correct: true, feedback: "Slope 1 and $1 - 2 + 1 = 0$." },
        { text: "$x + y - 3 = 0$", correct: true, feedback: "Slope $-1$ and $1 + 2 - 3 = 0$." },
        { text: "$x - y - 1 = 0$", feedback: "Slope 1, but $1 - 2 - 1 \\ne 0$." },
        { text: "$y = 2$", feedback: "It makes $0^\\circ$ with the x-axis." },
        { text: "$x + y + 3 = 0$", feedback: "Slope $-1$, but $1 + 2 + 3 \\ne 0$." },
      ],
      hint: "The slopes are $\\tan 45^\\circ = 1$ and $\\tan 135^\\circ = -1$.",
    },
    {
      type: "numeric",
      id: "slc3-3-q4",
      variant: "practice",
      question: "Find the x-intercept of the image of the line $3x + 4y = 12$ in the line $x = 1$.",
      answer: -2,
      hint: "Reflection in $x = 1$ sends $(x, y)$ to $(2 - x, y)$, so replace $x$ by $2 - x$.",
      solution: "$3(2 - x) + 4y = 12$ gives $-3x + 4y = 6$. Put $y = 0$: $x = -2$. (Check: the original x-intercept $(4, 0)$ reflects in $x = 1$ to $(-2, 0)$.)",
      commonMistakes: [
        { answer: 4, feedback: "That is the x-intercept of the original line." },
        { answer: -4, feedback: "That reflects in the y-axis. The mirror is $x = 1$, so $4 \\mapsto 2 - 4 = -2$." },
      ],
    },
    {
      type: "quiz",
      id: "slc3-3-q5",
      variant: "practice",
      question:
        "JEE Main. A ray of light travelling along $x + \\sqrt3\\,y = \\sqrt3$ is reflected when it reaches the x-axis. Along which line does the reflected ray travel?",
      options: [
        { text: "$x - \\sqrt3\\,y = \\sqrt3$", correct: true, feedback: "Reflect the incident line in the x-axis ($y \\to -y$). It passes through the point of incidence $(\\sqrt3, 0)$." },
        { text: "$\\sqrt3\\,x - y = 3$", feedback: "This passes through $(\\sqrt3, 0)$ but makes $60^\\circ$ with the axis. The incident ray makes $30^\\circ$, so the reflected one must too." },
        { text: "$x - \\sqrt3\\,y = -\\sqrt3$", feedback: "This meets the x-axis at $(-\\sqrt3, 0)$, not at the point of incidence." },
        { text: "$x + \\sqrt3\\,y = \\sqrt3$", feedback: "That is the incident ray continuing through the mirror." },
      ],
      hint: "The reflected ray lies on the mirror image of the incident line. In the x-axis, replace $y$ by $-y$.",
    },
    {
      type: "numeric",
      id: "slc3-3-q6",
      variant: "practice",
      question:
        "One vertex of an equilateral triangle is $(1, 2)$ and the opposite side lies along $x + y + 3 = 0$. Find the **square** of the side length.",
      answer: 24,
      hint: "The height $h$ is the distance from the vertex to the opposite side, and $h = \\frac{\\sqrt3}{2}s$.",
      solution: "$h = \\frac{\\lvert 1 + 2 + 3\\rvert}{\\sqrt2} = 3\\sqrt2$. Then $s = \\frac{2h}{\\sqrt3} = \\frac{6\\sqrt2}{\\sqrt3}$, so $s^2 = \\frac{72}{3} = 24$.",
      commonMistakes: [
        { answer: 18, feedback: "18 is $h^2$. The side is longer than the height: $s^2 = \\frac43 h^2$." },
        { answer: 13.5, feedback: "That uses $s = \\frac{\\sqrt3}{2}h$. It is the other way round: $h = \\frac{\\sqrt3}{2}s$." },
      ],
    },
    {
      type: "quiz",
      id: "slc3-3-q7",
      variant: "practice",
      multiple: true,
      question:
        "JEE Main. The hypotenuse of an isosceles right-angled triangle lies along $3x + 4y = 4$ and the opposite vertex is $(2, 2)$. Which lines are the other two sides? Select all that apply.",
      options: [
        { text: "$x - 7y + 12 = 0$", correct: true, feedback: "Slope $\\frac17$: $\\left\\lvert\\frac{\\frac17 + \\frac34}{1 - \\frac{3}{28}}\\right\\rvert = 1$, so it makes $45^\\circ$ with the hypotenuse, and it passes through $(2, 2)$." },
        { text: "$7x + y - 16 = 0$", correct: true, feedback: "Slope $-7$, also at $45^\\circ$ to the hypotenuse, through $(2, 2)$." },
        { text: "$7x - y - 12 = 0$", feedback: "It passes through $(2, 2)$, but slope 7 makes $\\tan\\theta = \\frac{31}{17}$ with the hypotenuse, not 1." },
        { text: "$x + 7y - 16 = 0$", feedback: "Through $(2, 2)$, but slope $-\\frac17$ is not at $45^\\circ$ to slope $-\\frac34$." },
        { text: "$4x - 3y - 2 = 0$", feedback: "That is the altitude to the hypotenuse (perpendicular to it), not a leg." },
      ],
      hint: "In an isosceles right triangle each leg makes $45^\\circ$ with the hypotenuse. Use $m = \\frac{m_0 \\pm 1}{1 \\mp m_0}$ with $m_0 = -\\frac34$.",
    },
    {
      type: "numeric",
      id: "slc3-3-q8",
      variant: "practice",
      question: "Find the slope of the image of the line $x - y + 1 = 0$ in the line $2x + y - 4 = 0$.",
      answer: 0.142857,
      tolerance: 0.001,
      hint: "Find where the line meets the mirror, reflect one more point of the line, and join.",
      solution:
        "The lines meet at $(1, 2)$. Reflect $(0, 1)$: $L_M = -3$, so the image is $(0, 1) + \\frac{6}{5}(2, 1) = \\left(\\frac{12}{5}, \\frac{11}{5}\\right)$. The slope from $(1, 2)$ is $\\frac{1/5}{7/5} = \\frac17$. The image is $x - 7y + 13 = 0$.",
      commonMistakes: [
        { answer: 1, feedback: "That is the slope of the original line." },
        { answer: 7, feedback: "Recompute the slope from $(1, 2)$ to $\\left(\\frac{12}{5}, \\frac{11}{5}\\right)$: rise $\\frac15$ over run $\\frac75$." },
        { answer: -1, feedback: "The image is not perpendicular to the original line. Join $(1, 2)$ to the reflected point $\\left(\\frac{12}{5}, \\frac{11}{5}\\right)$." },
      ],
    },
    {
      type: "quiz",
      id: "slc3-3-q9",
      variant: "concept",
      question: "The line $L$ meets the mirror line $M$ at $P$. What is the least you must compute to write the image of $L$ in $M$?",
      options: [
        { text: "$P$ and the image of one other point of $L$", correct: true, feedback: "$P$ is its own image, so it already gives one point of the answer." },
        { text: "The images of two points of $L$, neither of them $P$", feedback: "That works but is more work than needed: $P$ is its own image." },
        { text: "Only the image of one point of $L$ other than $P$", feedback: "One point does not fix a line; you need $P$ (or a direction) as well." },
        { text: "Only the angle between $L$ and $M$", feedback: "The angle gives the slope (up to a choice), but you still need a point." },
      ],
      hint: "Which point of $L$ does not move when you reflect in $M$?",
    },
    {
      type: "numeric",
      id: "slc3-3-q10",
      variant: "practice",
      question:
        "A ray of light from $A(1, 2)$ is reflected at a point $P$ of the x-axis and then passes through $B(5, 3)$. Find the x-coordinate of $P$.",
      answer: 2.6,
      tolerance: 0.001,
      hint: "The reflected ray looks as if it came from the image $A'(1, -2)$. Find where $A'B$ crosses the x-axis.",
      solution: "$A'(1, -2)$ to $B(5, 3)$: the line rises 5 over a run of 4. It reaches $y = 0$ after a rise of 2, i.e. a run of $\\frac85$. So $x = 1 + \\frac85 = \\frac{13}{5} = 2.6$.",
      commonMistakes: [
        { answer: 3, feedback: "That is the midpoint of the x-coordinates; the point divides in the ratio of the heights $2 : 3$." },
        { answer: 3.4, feedback: "You measured from $B$'s side: $P$ divides $A'B$ in the ratio $2 : 3$ from $A'$." },
      ],
    },
    {
      type: "numeric",
      id: "slc3-3-q11",
      variant: "practice",
      question:
        "JEE Main. $P$ moves on the x-axis. Find the least value of $PA + PB$ for $A(1, 2)$ and $B(5, 3)$.",
      answer: 6.403,
      tolerance: 0.01,
      hint: "Replace $A$ by its image $A'(1, -2)$: $PA = PA'$, and $PA' + PB \\ge A'B$.",
      solution: "$A'B = \\sqrt{(5 - 1)^2 + (3 + 2)^2} = \\sqrt{41} \\approx 6.403$, reached at $P = (2.6, 0)$.",
      commonMistakes: [
        { answer: 4.123, tolerance: 0.01, feedback: "That is $AB = \\sqrt{17}$, but $P$ must be on the x-axis, which lies below both points." },
        { answer: 41, feedback: "Take the square root: $\\sqrt{41}$." },
      ],
    },
    {
      type: "quiz",
      id: "slc3-3-q12",
      variant: "concept",
      question: "Which pair of lines passes through $(1, 1)$ and makes $45^\\circ$ with the line $y = x$?",
      options: [
        { text: "$x = 1$ and $y = 1$", correct: true, feedback: "Both make $45^\\circ$ with $y = x$. The vertical one is invisible to the slope formula because $1 - m_0\\tan\\alpha = 0$." },
        { text: "$y = 1$ only", feedback: "There are always two lines; the second is vertical here." },
        { text: "$y = x$ and $y = -x + 2$", feedback: "$y = x$ makes $0^\\circ$ with itself, and $y = -x + 2$ makes $90^\\circ$." },
        { text: "$y = 2x - 1$ and $y = \\frac12 x + \\frac12$", feedback: "Between slopes 2 and 1: $\\tan\\theta = \\frac13$, not 1." },
      ],
      hint: "Try $m = \\frac{1 \\pm 1}{1 \\mp 1}$. One denominator is zero: what line has no slope?",
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "pair-of-lines-through-the-origin",
  title: "3.4 · Pair of Straight Lines Through the Origin",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "What does $x^2 - 5xy + 6y^2 = 0$ look like? It is not a circle or a parabola. Factor it: $(x - 2y)(x - 3y) = 0$, so a point is on the graph exactly when it is on $x = 2y$ **or** on $x = 3y$. The graph is two straight lines through the origin, glued into one equation. This lesson reads everything about the two lines (slopes, angle, bisectors) straight from the coefficients, even when the equation does not factor nicely.",
    },
    { type: "heading", text: "Why a homogeneous quadratic is two lines" },
    {
      type: "text",
      content:
        "Start from two lines through the origin, $y = m_1x$ and $y = m_2x$, and multiply their equations:",
    },
    {
      type: "math",
      latex: "(y - m_1x)(y - m_2x) = 0 \\iff m_1m_2\\,x^2 - (m_1 + m_2)\\,xy + y^2 = 0",
    },
    {
      type: "text",
      content:
        "Every term has degree exactly 2: the equation is **homogeneous**. Conversely, take $ax^2 + 2hxy + by^2 = 0$ with $b \\ne 0$ and divide by $x^2$ (for $x \\ne 0$), writing $m = \\frac yx$:",
    },
    {
      type: "math",
      latex: "bm^2 + 2hm + a = 0 \\implies m_1 + m_2 = -\\frac{2h}{b}, \\qquad m_1m_2 = \\frac ab",
    },
    {
      type: "text",
      content:
        "The two roots $m_1, m_2$ are the slopes of the two lines. They are real and different when the discriminant $4h^2 - 4ab > 0$, equal (one line counted twice) when $h^2 = ab$, and not real when $h^2 < ab$, in which case the only real point on the graph is the origin. If $b = 0$, the equation is $x(ax + 2hy) = 0$ and one of the lines is the y-axis.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The pair ax² + 2hxy + by² = 0",
      content:
        "- It represents two straight lines through the origin, real and distinct if $h^2 > ab$, coincident if $h^2 = ab$, imaginary (only the origin is real) if $h^2 < ab$.\n- Slopes: $m_1 + m_2 = -\\frac{2h}{b}$, $m_1m_2 = \\frac ab$.\n- Angle $\\theta$ between them: $\\tan\\theta = \\dfrac{2\\sqrt{h^2 - ab}}{\\lvert a + b\\rvert}$.\n- Perpendicular $\\iff a + b = 0$ (coefficient of $x^2$ + coefficient of $y^2$ = 0). Coincident $\\iff h^2 = ab$.",
    },
    {
      type: "text",
      content:
        "The angle formula is the old $\\tan\\theta = \\left\\lvert\\frac{m_1 - m_2}{1 + m_1m_2}\\right\\rvert$ rewritten with Vieta: $(m_1 - m_2)^2 = (m_1 + m_2)^2 - 4m_1m_2 = \\frac{4h^2 - 4ab}{b^2}$ and $1 + m_1m_2 = \\frac{a + b}{b}$. Divide, and the $b$'s cancel.",
    },
    {
      type: "interactive",
      config: {
        component: "slc-line-explorer",
        mode: "pair",
        coef: {
          a: { min: -6, max: 6, step: 0.5, initial: 1 },
          h: { min: -6, max: 6, step: 0.5, initial: -2.5 },
          b: { min: -6, max: 6, step: 0.5, initial: 6 },
        },
        caption:
          "This starts at $x^2 - 5xy + 6y^2 = 0$. Slide $b$ until $a + b = 0$ and the lines snap to a right angle. Slide $h$ towards 0 until $h^2 = ab$: the two lines close up into one, and past that point they vanish (only the origin is left).",
      },
    },
    { type: "heading", text: "Reading the lines from the coefficients" },
    {
      type: "worked-example",
      id: "slc3-4-we1",
      title: "Worked example 1: slopes and angle",
      problem: "Find the lines represented by $x^2 - 5xy + 6y^2 = 0$ and the angle between them.",
      steps: [
        { text: "Factor: $(x - 2y)(x - 3y) = 0$, so the lines are $y = \\frac x2$ and $y = \\frac x3$." },
        {
          text: "Angle from the formula with $a = 1$, $h = -\\frac52$, $b = 6$. *Why this step:* the formula works even when the quadratic does not factor over the rationals; here we can check it against the slopes.",
          latex: "h^2 - ab = \\tfrac{25}{4} - 6 = \\tfrac14, \\qquad \\tan\\theta = \\frac{2 \\cdot \\frac12}{\\lvert 1 + 6\\rvert} = \\frac17",
        },
        { text: "Check: $\\left\\lvert\\frac{\\frac12 - \\frac13}{1 + \\frac16}\\right\\rvert = \\frac{1/6}{7/6} = \\frac17$." },
      ],
      answer: "$x = 2y$ and $x = 3y$, at an angle $\\tan^{-1}\\frac17$.",
    },
    {
      type: "worked-example",
      id: "slc3-4-we2",
      title: "Worked example 2: an angle without factoring",
      problem: "Find the acute angle between the lines $x^2 + 4xy + y^2 = 0$.",
      steps: [
        { text: "$a = 1$, $h = 2$, $b = 1$, so $h^2 - ab = 3 > 0$: two real lines." },
        { text: "$\\tan\\theta = \\frac{2\\sqrt3}{\\lvert 1 + 1\\rvert} = \\sqrt3$." },
      ],
      answer: "$60^\\circ$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"m₁ + m₂ = 2h/b\" and \"perpendicular means h = 0\"",
      content:
        "The slopes are the roots of $bm^2 + 2hm + a = 0$, so their sum is $-\\frac{2h}{b}$, with a minus sign. And perpendicularity is $m_1m_2 = -1$, i.e. $\\frac ab = -1$, i.e. $a + b = 0$. The coefficient $h$ has nothing to do with it: $x^2 + 3xy - y^2 = 0$ is a perpendicular pair with $h = \\frac32$.",
    },
    { type: "heading", text: "Angle bisectors of the pair" },
    {
      type: "text",
      content:
        "If the lines have inclinations $\\theta_1, \\theta_2$, the bisectors have inclination $\\varphi$ with $2\\varphi = \\theta_1 + \\theta_2$ (or that plus $180^\\circ$). Take tangents: $\\tan 2\\varphi = \\frac{m_1 + m_2}{1 - m_1m_2} = \\frac{-2h/b}{1 - a/b} = \\frac{2h}{a - b}$. A point $(x, y)$ on a bisector has $\\tan\\varphi = \\frac yx$, so $\\tan 2\\varphi = \\frac{2xy}{x^2 - y^2}$. Equate:",
    },
    {
      type: "math",
      latex: "\\text{bisectors of } ax^2 + 2hxy + by^2 = 0: \\qquad \\frac{x^2 - y^2}{a - b} = \\frac{xy}{h}",
    },
    {
      type: "worked-example",
      id: "slc3-4-we3",
      title: "Worked example 3: the bisectors of a pair",
      problem: "Find the joint equation of the bisectors of the angles between the lines $x^2 - 5xy + 6y^2 = 0$.",
      steps: [
        {
          text: "Substitute $a = 1$, $h = -\\frac52$, $b = 6$. *Why this step:* the bisector equation needs only the three coefficients, no slopes.",
          latex: "\\frac{x^2 - y^2}{1 - 6} = \\frac{xy}{-5/2} \\implies x^2 - y^2 = 2xy",
        },
        {
          text: "Check one bisector: the lines have inclinations $\\tan^{-1}\\frac12 \\approx 26.57^\\circ$ and $\\tan^{-1}\\frac13 \\approx 18.43^\\circ$, so one bisector is at $22.5^\\circ$, and $\\tan 22.5^\\circ = \\sqrt2 - 1$ is a root of $t^2 + 2t - 1 = 0$, which is what $x^2 - 2xy - y^2 = 0$ gives for $t = \\frac yx$.",
        },
      ],
      answer: "$x^2 - 2xy - y^2 = 0$.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Building a joint equation",
      content:
        "To write two given lines through the origin as one equation, multiply them: $y = 2x$ and $y = -3x$ give $(y - 2x)(y + 3x) = 0$, i.e. $y^2 + xy - 6x^2 = 0$. The pair **perpendicular** to $ax^2 + 2hxy + by^2 = 0$ (through the origin) is $bx^2 - 2hxy + ay^2 = 0$: each slope $m$ becomes $-\\frac1m$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "slc3-4-q1",
      variant: "practice",
      question: "Find $\\tan\\theta$, where $\\theta$ is the acute angle between the lines $3x^2 + 10xy + 3y^2 = 0$.",
      answer: 1.3333,
      tolerance: 0.001,
      hint: "Use $\\tan\\theta = \\frac{2\\sqrt{h^2 - ab}}{\\lvert a + b\\rvert}$ with $h = 5$.",
      solution: "$h^2 - ab = 25 - 9 = 16$, so $\\tan\\theta = \\frac{2 \\cdot 4}{6} = \\frac43$. (The lines are $3x + y = 0$ and $x + 3y = 0$.)",
      commonMistakes: [
        { answer: 0.6667, tolerance: 0.001, feedback: "You dropped the factor 2 in the numerator: it is $2\\sqrt{h^2 - ab} = 2\\sqrt{16} = 8$." },
        { answer: 0.75, tolerance: 0.001, feedback: "That is the reciprocal. $\\tan\\theta = \\frac{8}{6}$." },
      ],
    },
    {
      type: "quiz",
      id: "slc3-4-q2",
      variant: "practice",
      question: "The equation $x^2 - y^2 = 0$ represents",
      options: [
        { text: "the perpendicular lines $y = x$ and $y = -x$", correct: true, feedback: "$(x - y)(x + y) = 0$, and $a + b = 1 - 1 = 0$." },
        { text: "the single line $y = x$", feedback: "$(x + y)$ is also a factor: $y = -x$ is on the graph too." },
        { text: "a circle", feedback: "A circle needs $x^2 + y^2$ with the same sign." },
        { text: "only the origin", feedback: "That happens when $h^2 < ab$. Here $h^2 - ab = 0 + 1 > 0$." },
      ],
      hint: "Factor the difference of squares.",
    },
    {
      type: "numeric",
      id: "slc3-4-q3",
      variant: "practice",
      question: "For which $k$ does $(k - 1)x^2 + 4xy + 3y^2 = 0$ represent a pair of perpendicular lines?",
      answer: -2,
      hint: "Perpendicular means the coefficients of $x^2$ and $y^2$ add to zero.",
      solution: "$(k - 1) + 3 = 0$ gives $k = -2$. Then $-3x^2 + 4xy + 3y^2 = 0$, with $h^2 - ab = 4 + 9 > 0$, so the lines are real.",
      commonMistakes: [
        { answer: -3, feedback: "The coefficient of $x^2$ is $k - 1$, not $k$." },
        { answer: 4, feedback: "Perpendicularity does not involve $h$: use $a + b = 0$." },
      ],
    },
    {
      type: "numeric",
      id: "slc3-4-q4",
      variant: "practice",
      question: "For which positive $k$ does $x^2 + kxy + 9y^2 = 0$ represent coincident lines?",
      answer: 6,
      hint: "Coincident means $h^2 = ab$, and here $2h = k$.",
      solution: "$\\left(\\frac k2\\right)^2 = 9$, so $k = 6$: $x^2 + 6xy + 9y^2 = (x + 3y)^2$.",
      commonMistakes: [
        { answer: 3, feedback: "You took $h = k$. The middle term is $2hxy$, so $h = \\frac k2$." },
        { answer: 36, feedback: "That is $k^2$." },
      ],
    },
    {
      type: "quiz",
      id: "slc3-4-q5",
      variant: "practice",
      multiple: true,
      question: "Which statements about the pair $6x^2 - xy - 2y^2 = 0$ are true? Select all that apply.",
      options: [
        { text: "One line is $3x - 2y = 0$", correct: true, feedback: "$6x^2 - xy - 2y^2 = (3x - 2y)(2x + y)$." },
        { text: "The other line is $2x + y = 0$", correct: true, feedback: "The second factor." },
        { text: "The product of the slopes is $-3$", correct: true, feedback: "$\\frac ab = \\frac{6}{-2} = -3$; indeed $\\frac32 \\cdot (-2) = -3$." },
        { text: "The sum of the slopes is $\\frac12$", feedback: "$-\\frac{2h}{b} = -\\frac{-1}{-2} = -\\frac12$; indeed $\\frac32 - 2 = -\\frac12$." },
        { text: "The lines are perpendicular", feedback: "$a + b = 6 - 2 = 4 \\ne 0$." },
      ],
      hint: "Factor, or use $m_1 + m_2 = -\\frac{2h}{b}$ and $m_1m_2 = \\frac ab$ with $2h = -1$.",
    },
    {
      type: "quiz",
      id: "slc3-4-q6",
      variant: "practice",
      question: "What is the joint equation of the lines through the origin perpendicular to the lines $x^2 - 5xy + 6y^2 = 0$?",
      options: [
        { text: "$6x^2 + 5xy + y^2 = 0$", correct: true, feedback: "The given slopes are $\\frac12, \\frac13$; the perpendicular slopes $-2, -3$ give $(y + 2x)(y + 3x) = 6x^2 + 5xy + y^2$." },
        { text: "$6x^2 - 5xy + y^2 = 0$", feedback: "That has slopes 2 and 3. Perpendicular slopes are negative reciprocals: $-2$ and $-3$." },
        { text: "$x^2 + 5xy + 6y^2 = 0$", feedback: "That has slopes $-\\frac12$ and $-\\frac13$: the reflections in the y-axis, not the perpendiculars." },
        { text: "$6x^2 + 5xy - y^2 = 0$", feedback: "Here $m_1m_2 = -6$; the perpendicular slopes multiply to $(-2)(-3) = 6$." },
      ],
      hint: "Swap $a$ and $b$ and change the sign of $h$: $bx^2 - 2hxy + ay^2 = 0$.",
    },
    {
      type: "numeric",
      id: "slc3-4-q7",
      variant: "practice",
      question:
        "The joint equation of $y = 2x$ and $y = -3x$ is written as $6x^2 + pxy + qy^2 = 0$. Find $p + q$.",
      answer: -2,
      hint: "Multiply $(y - 2x)(y + 3x)$ and scale so that the $x^2$ coefficient is 6.",
      solution: "$(y - 2x)(y + 3x) = y^2 + xy - 6x^2$. Multiply by $-1$: $6x^2 - xy - y^2 = 0$, so $p = -1$, $q = -1$ and $p + q = -2$.",
      commonMistakes: [
        { answer: 2, feedback: "You kept $y^2 + xy - 6x^2$ but reversed only one sign. Multiply every term by $-1$." },
        { answer: 0, feedback: "Check the $xy$ term: $-2x \\cdot y + y \\cdot 3x = +xy$, which becomes $-xy$ after scaling." },
      ],
    },
    {
      type: "numeric",
      id: "slc3-4-q8",
      variant: "practice",
      question:
        "JEE Main. The slope of one of the lines $x^2 + kxy + 8y^2 = 0$ is twice the slope of the other, and $k > 0$. Find $k$.",
      answer: 6,
      hint: "Let the slopes be $m$ and $2m$. Then $3m = -\\frac{2h}{b}$ and $2m^2 = \\frac ab$; eliminate $m$ to get $8h^2 = 9ab$.",
      solution: "$8h^2 = 9ab = 72$, so $h^2 = 9$ and, with $k = 2h > 0$, $k = 6$. Check: $x^2 + 6xy + 8y^2 = (x + 2y)(x + 4y)$, slopes $-\\frac12$ and $-\\frac14$.",
      commonMistakes: [
        { answer: 3, feedback: "That is $h$. The coefficient of $xy$ is $2h = 6$." },
        { answer: 9, feedback: "That is $h^2$." },
      ],
    },
    {
      type: "quiz",
      id: "slc3-4-q9",
      variant: "practice",
      question: "What is the joint equation of the bisectors of the angles between the lines $3x^2 + 2xy - y^2 = 0$?",
      options: [
        { text: "$x^2 - 4xy - y^2 = 0$", correct: true, feedback: "$\\frac{x^2 - y^2}{3 - (-1)} = \\frac{xy}{1}$ gives $x^2 - y^2 = 4xy$." },
        { text: "$x^2 + 4xy - y^2 = 0$", feedback: "Sign slip moving $4xy$ across: $x^2 - y^2 = 4xy$ becomes $x^2 - 4xy - y^2 = 0$." },
        { text: "$x^2 - y^2 = xy$", feedback: "The denominator $a - b = 3 - (-1) = 4$ was dropped." },
        { text: "$4x^2 - xy - 4y^2 = 0$", feedback: "The fraction was inverted: it is $\\frac{x^2 - y^2}{a - b} = \\frac{xy}{h}$." },
      ],
      hint: "Use $\\frac{x^2 - y^2}{a - b} = \\frac{xy}{h}$ with $a = 3$, $h = 1$, $b = -1$.",
    },
    {
      type: "quiz",
      id: "slc3-4-q10",
      variant: "concept",
      multiple: true,
      question:
        "For the pair $ax^2 + 2hxy + by^2 = 0$ (coefficients not all zero), which statements are true? Select all that apply.",
      options: [
        { text: "The lines are real and distinct iff $h^2 > ab$", correct: true, feedback: "The slope equation $bm^2 + 2hm + a = 0$ has discriminant $4(h^2 - ab)$." },
        { text: "The lines are perpendicular iff $a + b = 0$", correct: true, feedback: "$m_1m_2 = \\frac ab = -1$, and the case $b = 0$ (x-axis and y-axis when also $a = 0$) fits too." },
        { text: "The lines are perpendicular iff $h = 0$", feedback: "$x^2 - 4y^2 = 0$ has $h = 0$ but slopes $\\pm\\frac12$, not perpendicular." },
        { text: "The lines coincide iff $h^2 = ab$", correct: true, feedback: "Then the expression is a perfect square." },
        { text: "If $b = 0$, one of the lines is the y-axis", correct: true, feedback: "$ax^2 + 2hxy = x(ax + 2hy)$, and $x = 0$ is the y-axis." },
      ],
      hint: "Everything comes from the slope quadratic $bm^2 + 2hm + a = 0$ and from factoring out $x$ when $b = 0$.",
    },
    {
      type: "numeric",
      id: "slc3-4-q11",
      variant: "practice",
      question:
        "JEE Main. Find the area of the triangle formed by the lines $6x^2 - xy - 2y^2 = 0$ and the line $x + y = 1$.",
      answer: 0.7,
      tolerance: 0.001,
      hint: "The pair is $3x - 2y = 0$ and $2x + y = 0$. Intersect each with $x + y = 1$; the third vertex is the origin.",
      solution:
        "$3x = 2y$ with $x + y = 1$ gives $\\left(\\frac25, \\frac35\\right)$; $y = -2x$ with $x + y = 1$ gives $(-1, 2)$. Area $= \\frac12\\left\\lvert\\frac25 \\cdot 2 - \\frac35 \\cdot (-1)\\right\\rvert = \\frac12 \\cdot \\frac75 = 0.7$.",
      commonMistakes: [
        { answer: 1.4, tolerance: 0.001, feedback: "Halve the determinant." },
        { answer: 0.1, tolerance: 0.001, feedback: "Sign slip in the determinant: $\\frac45 - \\left(-\\frac35\\right) = \\frac75$." },
      ],
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "general-second-degree-pair",
  title: "3.5 · The General Second-Degree Pair",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "Multiply two lines that do **not** pass through the origin: $(x + y - 1)(2x - y + 3) = 0$ expands to $2x^2 + xy - y^2 + x + 4y - 3 = 0$. Now every kind of term appears: $x^2$, $xy$, $y^2$, $x$, $y$ and a constant. The general second-degree equation",
    },
    {
      type: "math",
      latex: "S \\equiv ax^2 + 2hxy + by^2 + 2gx + 2fy + c = 0",
    },
    {
      type: "text",
      content:
        "can be a circle, a parabola, an ellipse, a hyperbola, or two straight lines. This lesson answers three questions: when is it two lines, where do they meet, and at what angle. Then it turns the idea around (homogenisation) to get the lines joining the origin to the points where a line cuts a curve.",
    },
    { type: "heading", text: "When the equation is a pair of lines" },
    {
      type: "text",
      content:
        "Treat $S = 0$ as a quadratic in $x$ (assume $a \\ne 0$): $ax^2 + 2(hy + g)x + (by^2 + 2fy + c) = 0$. The quadratic formula gives",
    },
    {
      type: "math",
      latex: "ax = -(hy + g) \\pm \\sqrt{(h^2 - ab)y^2 + 2(gh - af)y + (g^2 - ac)}",
    },
    {
      type: "text",
      content:
        "For the graph to be two straight lines, each sign must give $x$ as a **linear** function of $y$, so the expression under the root must be a perfect square in $y$. A quadratic $py^2 + 2qy + r$ is a perfect square exactly when $q^2 = pr$:\n\n$$(gh - af)^2 = (h^2 - ab)(g^2 - ac).$$\n\nExpand both sides, cancel $g^2h^2$, and divide by $a$. What remains is a famous determinant.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Condition for a pair of straight lines",
      content:
        "$ax^2 + 2hxy + by^2 + 2gx + 2fy + c = 0$ represents a pair of straight lines if and only if\n\n$$\\Delta = abc + 2fgh - af^2 - bg^2 - ch^2 = \\begin{vmatrix} a & h & g \\\\ h & b & f \\\\ g & f & c \\end{vmatrix} = 0.$$\n\nThe lines are real when also $h^2 \\ge ab$ (parallel when $h^2 = ab$).",
    },
    {
      type: "text",
      content:
        "**Where they meet.** Shift the origin to the point of intersection $(\\alpha, \\beta)$, i.e. put $x = X + \\alpha$, $y = Y + \\beta$. Two lines through the new origin have a homogeneous equation, so the new $X$ and $Y$ terms must vanish:\n\n$$a\\alpha + h\\beta + g = 0, \\qquad h\\alpha + b\\beta + f = 0.$$\n\nTwo linear equations: solve them for the meeting point. (These are what you get by differentiating $S$ with respect to $x$ and to $y$.)\n\n**The angle.** After the shift, the second-degree part $aX^2 + 2hXY + bY^2$ is unchanged, so the lines are parallel to the pair $ax^2 + 2hxy + by^2 = 0$ and the angle is the same: $\\tan\\theta = \\frac{2\\sqrt{h^2 - ab}}{\\lvert a + b\\rvert}$.",
    },
    {
      type: "worked-example",
      id: "slc3-5-we1",
      title: "Worked example 1: test, split and intersect",
      problem: "Show that $2x^2 + xy - y^2 + x + 4y - 3 = 0$ is a pair of lines, find the lines and their point of intersection.",
      steps: [
        {
          text: "Read the coefficients, halving the cross terms: $a = 2$, $h = \\frac12$, $b = -1$, $g = \\frac12$, $f = 2$, $c = -3$. *Why this step:* the formula uses $2h$, $2g$, $2f$ as the written coefficients, the most common source of slips.",
          latex: "\\Delta = 6 + 1 - 8 + \\tfrac14 + \\tfrac34 = 0",
        },
        {
          text: "Factor the second-degree part, $2x^2 + xy - y^2 = (2x - y)(x + y)$, and write $S = (2x - y + p)(x + y + q)$. Matching the $x$ terms, $2q + p = 1$; the $y$ terms, $p - q = 4$. So $q = -1$, $p = 3$, and the constant $pq = -3$ agrees.",
        },
        {
          text: "Meeting point from $a\\alpha + h\\beta + g = 0$ and $h\\alpha + b\\beta + f = 0$.",
          latex: "2\\alpha + \\tfrac12\\beta + \\tfrac12 = 0,\\quad \\tfrac12\\alpha - \\beta + 2 = 0 \\implies (\\alpha, \\beta) = \\left(-\\tfrac23, \\tfrac53\\right)",
        },
      ],
      answer: "$2x - y + 3 = 0$ and $x + y - 1 = 0$, meeting at $\\left(-\\frac23, \\frac53\\right)$.",
    },
    {
      type: "worked-example",
      id: "slc3-5-we2",
      title: "Worked example 2: the constant that makes a pair",
      problem: "Find $k$ so that $6x^2 + 11xy - 10y^2 + x + 31y + k = 0$ represents two straight lines.",
      steps: [
        { text: "Factor the second-degree part: $6x^2 + 11xy - 10y^2 = (3x - 2y)(2x + 5y)$." },
        {
          text: "Write $(3x - 2y + p)(2x + 5y + q)$ and match the first-degree terms. *Why this step:* splitting is faster than expanding $\\Delta$ with fractions like $h = \\frac{11}{2}$, $f = \\frac{31}{2}$.",
          latex: "x:\\ 3q + 2p = 1, \\qquad y:\\ -2q + 5p = 31 \\implies p = 5,\\ q = -3",
        },
        { text: "The constant term is $k = pq = -15$." },
      ],
      answer: "$k = -15$; the lines are $3x - 2y + 5 = 0$ and $2x + 5y - 3 = 0$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the angle depends on g, f and c\"",
      content:
        "Moving a line parallel to itself does not change any angle, and the first-degree terms only move the pair around. The angle between the lines of $S = 0$ depends on $a$, $h$, $b$ alone. Likewise the lines are perpendicular iff $a + b = 0$, whatever $g$, $f$, $c$ are.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Parallel pairs",
      content:
        "If $h^2 = ab$ the second-degree part is a perfect square, so $S$ splits as $(\\ell + p)(\\ell + q)$ with the same $\\ell = \\sqrt a\\,x + \\sqrt b\\,y$: two parallel lines. The distance between them is $2\\sqrt{\\dfrac{g^2 - ac}{a(a + b)}}$, but completing the square is usually quicker: $x^2 + 4xy + 4y^2 + 3x + 6y - 4 = (x + 2y)^2 + 3(x + 2y) - 4 = (x + 2y + 4)(x + 2y - 1)$.",
    },
    {
      type: "interactive",
      config: {
        component: "slc-line-explorer",
        mode: "pair",
        coef: {
          a: { min: -5, max: 5, step: 0.5, initial: 2 },
          h: { min: -5, max: 5, step: 0.5, initial: 0.5 },
          b: { min: -5, max: 5, step: 0.5, initial: -1 },
        },
        caption:
          "This is the second-degree part $2x^2 + xy - y^2$ of Worked example 1. The full pair is these two lines slid away from the origin to meet at $\\left(-\\frac23, \\frac53\\right)$; sliding changes the position but never the angle shown here.",
      },
    },
    { type: "heading", text: "Homogenisation" },
    {
      type: "text",
      content:
        "A line $lx + my = n$ ($n \\ne 0$) cuts a curve $S = 0$ at two points $A$ and $B$. What is the joint equation of $OA$ and $OB$? On the line, $\\frac{lx + my}{n} = 1$. Multiply every term of $S$ by the right power of this \"1\" to make it homogeneous of degree 2:",
    },
    {
      type: "math",
      latex: "ax^2 + 2hxy + by^2 + 2(gx + fy)\\left(\\frac{lx + my}{n}\\right) + c\\left(\\frac{lx + my}{n}\\right)^2 = 0",
    },
    {
      type: "text",
      content:
        "This is homogeneous, so it is a pair of lines through the origin. $A$ satisfies it (at $A$ the factor really is 1 and $S = 0$), and so does $B$. Hence it is exactly the pair $OA$, $OB$. In particular $\\angle AOB = 90^\\circ$ iff the coefficients of $x^2$ and $y^2$ in it add to zero.",
    },
    {
      type: "worked-example",
      id: "slc3-5-we3",
      title: "Worked example 3: a right angle at the origin",
      problem:
        "JEE Advanced. Show that the lines joining the origin to the points where $3x - 2y = 1$ meets $3x^2 + 5xy - 3y^2 + 2x + 3y = 0$ are at right angles.",
      steps: [
        {
          text: "Here $\\frac{3x - 2y}{1} = 1$ on the line. The first-degree part $2x + 3y$ needs one factor of it; the constant is 0. *Why this step:* each term must end up with degree exactly 2.",
          latex: "3x^2 + 5xy - 3y^2 + (2x + 3y)(3x - 2y) = 0",
        },
        { text: "Expand: $3x^2 + 5xy - 3y^2 + 6x^2 + 5xy - 6y^2 = 9x^2 + 10xy - 9y^2 = 0$." },
        { text: "The coefficients of $x^2$ and $y^2$ add to $9 - 9 = 0$, so the two lines are perpendicular." },
      ],
      answer: "The joint equation is $9x^2 + 10xy - 9y^2 = 0$, a perpendicular pair.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "slc3-5-q1",
      variant: "practice",
      question: "Find $k$ so that $x^2 - 5xy + 4y^2 + x + 2y + k = 0$ represents a pair of straight lines.",
      answer: -2,
      hint: "Factor $x^2 - 5xy + 4y^2 = (x - y)(x - 4y)$ and write the whole as $(x - y + p)(x - 4y + q)$.",
      solution: "Matching: $x$: $p + q = 1$; $y$: $-4p - q = 2$. So $p = -1$, $q = 2$ and $k = pq = -2$. Check with $\\Delta$: $a = 1$, $h = -\\frac52$, $b = 4$, $g = \\frac12$, $f = 1$ gives $\\Delta = 4k - \\frac52 - 1 - 1 - \\frac{25}{4}k = -\\frac94(k + 2) = 0$.",
      commonMistakes: [
        { answer: 2, feedback: "Sign slip: $p = -1$, $q = 2$, so $pq = -2$." },
        { answer: -1, feedback: "That is $p$ alone; the constant term is the product $pq$." },
      ],
    },
    {
      type: "quiz",
      id: "slc3-5-q2",
      variant: "practice",
      question: "The equation $x^2 - 5xy + 4y^2 + x + 2y - 2 = 0$ is the pair $x - y - 1 = 0$, $x - 4y + 2 = 0$. Where do the lines meet?",
      options: [
        { text: "$(2, 1)$", correct: true, feedback: "$2 - 1 - 1 = 0$ and $2 - 4 + 2 = 0$. The equations $a\\alpha + h\\beta + g = 0$, $h\\alpha + b\\beta + f = 0$ give the same point." },
        { text: "$(1, 2)$", feedback: "$1 - 2 - 1 = -2 \\ne 0$." },
        { text: "$(0, 0)$", feedback: "The constant term is $-2 \\ne 0$, so the origin is not on the graph." },
        { text: "$(-2, -1)$", feedback: "$-2 + 1 - 1 = -2 \\ne 0$." },
      ],
      hint: "Solve the two linear equations together, or use $a\\alpha + h\\beta + g = 0$ and $h\\alpha + b\\beta + f = 0$.",
    },
    {
      type: "numeric",
      id: "slc3-5-q3",
      variant: "practice",
      question: "Find $\\tan\\theta$ for the acute angle $\\theta$ between the lines $2x^2 + xy - y^2 + x + 4y - 3 = 0$.",
      answer: 3,
      hint: "Only $a$, $h$, $b$ matter: $\\tan\\theta = \\frac{2\\sqrt{h^2 - ab}}{\\lvert a + b\\rvert}$ with $h = \\frac12$.",
      solution: "$h^2 - ab = \\frac14 + 2 = \\frac94$, so $\\tan\\theta = \\frac{2 \\cdot \\frac32}{\\lvert 2 - 1\\rvert} = 3$. (Slopes 2 and $-1$: $\\left\\lvert\\frac{2 + 1}{1 - 2}\\right\\rvert = 3$.)",
      commonMistakes: [
        { answer: 1, feedback: "You took $h = 1$. The written coefficient of $xy$ is $2h = 1$, so $h = \\frac12$." },
        { answer: 1.5, feedback: "Don't forget the 2 in $2\\sqrt{h^2 - ab}$." },
      ],
    },
    {
      type: "quiz",
      id: "slc3-5-q4",
      variant: "practice",
      multiple: true,
      question: "Which equations represent a pair of **real** straight lines? Select all that apply.",
      options: [
        { text: "$x^2 - y^2 + 2y - 1 = 0$", correct: true, feedback: "$x^2 - (y - 1)^2 = (x - y + 1)(x + y - 1)$." },
        { text: "$xy - x - y + 1 = 0$", correct: true, feedback: "$(x - 1)(y - 1) = 0$: the lines $x = 1$ and $y = 1$." },
        { text: "$x^2 + 2xy + y^2 - 1 = 0$", correct: true, feedback: "$(x + y - 1)(x + y + 1) = 0$: a parallel pair." },
        { text: "$x^2 + y^2 - 2x + 1 = 0$", feedback: "$(x - 1)^2 + y^2 = 0$: $\\Delta = 0$ but $h^2 < ab$, so the \"lines\" are imaginary and only the point $(1, 0)$ is real." },
        { text: "$x^2 + xy + y^2 + x = 0$", feedback: "$\\Delta = -\\frac14 \\ne 0$: not a pair of lines (it is an ellipse)." },
      ],
      hint: "Try to factor each one, and remember that real lines also need $h^2 \\ge ab$.",
    },
    {
      type: "numeric",
      id: "slc3-5-q5",
      variant: "practice",
      question: "Find the distance between the parallel lines represented by $x^2 + 4xy + 4y^2 + 3x + 6y - 4 = 0$.",
      answer: 2.236,
      tolerance: 0.01,
      hint: "Put $t = x + 2y$: the equation is $t^2 + 3t - 4 = 0$.",
      solution: "$(t + 4)(t - 1) = 0$ gives $x + 2y + 4 = 0$ and $x + 2y - 1 = 0$. Distance $= \\frac{\\lvert 4 - (-1)\\rvert}{\\sqrt{1 + 4}} = \\frac{5}{\\sqrt5} = \\sqrt5 \\approx 2.236$.",
      commonMistakes: [
        { answer: 5, feedback: "Divide the difference of constants by $\\sqrt{a^2 + b^2} = \\sqrt5$." },
        { answer: 1.118, tolerance: 0.01, feedback: "That is half the distance." },
      ],
    },
    {
      type: "quiz",
      id: "slc3-5-q6",
      variant: "practice",
      question:
        "What is the joint equation of the lines joining the origin to the points where $x + y = 2$ meets $x^2 + y^2 = 4$?",
      options: [
        { text: "$xy = 0$", correct: true, feedback: "Homogenise: $x^2 + y^2 = 4\\left(\\frac{x + y}{2}\\right)^2 = (x + y)^2$, so $2xy = 0$. The points are $(2, 0)$ and $(0, 2)$, on the axes." },
        { text: "$x^2 - y^2 = 0$", feedback: "That is $y = \\pm x$; the meeting points $(2, 0)$ and $(0, 2)$ are not on those lines." },
        { text: "$x^2 + y^2 = 4$", feedback: "That is the circle itself. Homogenising turns the constant 4 into $(x + y)^2$." },
        { text: "$x^2 + 2xy + y^2 = 0$", feedback: "That is $(x + y)^2 = 0$, the single line $x + y = 0$." },
      ],
      hint: "Replace the constant 4 by $4\\left(\\frac{x + y}{2}\\right)^2$.",
    },
    {
      type: "numeric",
      id: "slc3-5-q7",
      variant: "practice",
      question:
        "The lines joining the origin to the points where $x + y = 1$ meets $x^2 + y^2 + 2x + 2y + c = 0$ are perpendicular. Find $c$.",
      answer: -3,
      hint: "Homogenise with $x + y = 1$, then make the coefficients of $x^2$ and $y^2$ add to zero.",
      solution:
        "$x^2 + y^2 + (2x + 2y)(x + y) + c(x + y)^2 = 0$. Coefficient of $x^2$: $1 + 2 + c$; of $y^2$: the same. Sum $2(3 + c) = 0$, so $c = -3$. (Check: the meeting points are $(0, 1)$ and $(1, 0)$.)",
      commonMistakes: [
        { answer: 3, feedback: "Sign slip: $3 + c = 0$ gives $c = -3$." },
        { answer: -1, feedback: "The first-degree part contributes $2x \\cdot x = 2x^2$ as well; the $x^2$ coefficient is $3 + c$." },
      ],
    },
    {
      type: "quiz",
      id: "slc3-5-q8",
      variant: "concept",
      question: "Why do $S = 0$ and $ax^2 + 2hxy + by^2 = 0$ give the same angle between their lines?",
      options: [
        { text: "Shifting the origin to the meeting point removes the linear terms and leaves $ax^2 + 2hxy + by^2$, so the lines are parallel to that pair", correct: true, feedback: "Parallel lines make the same angles, so the angle depends only on $a$, $h$, $b$." },
        { text: "Because $g$, $f$ and $c$ are always zero for a pair", feedback: "$(x + y - 1)(2x - y + 3)$ has $g$, $f$, $c$ all non-zero." },
        { text: "Because both equations pass through the origin", feedback: "$S = 0$ passes through the origin only when $c = 0$." },
        { text: "It is only true when the lines are perpendicular", feedback: "It is true for every pair; perpendicularity is just the case $a + b = 0$." },
      ],
      hint: "What happens to the second-degree terms when you put $x = X + \\alpha$, $y = Y + \\beta$?",
    },
    {
      type: "numeric",
      id: "slc3-5-q9",
      variant: "practice",
      question:
        "JEE Main. Find $\\lambda$ so that $\\lambda x^2 - 10xy + 12y^2 + 5x - 16y - 3 = 0$ represents a pair of straight lines.",
      answer: 2,
      hint: "Use $\\Delta = abc + 2fgh - af^2 - bg^2 - ch^2 = 0$ with $h = -5$, $g = \\frac52$, $f = -8$.",
      solution:
        "$\\Delta = -36\\lambda + 2(-8)\\left(\\frac52\\right)(-5) - 64\\lambda - 12 \\cdot \\frac{25}{4} + 3 \\cdot 25 = -100\\lambda + 200 = 0$, so $\\lambda = 2$. Indeed $2x^2 - 10xy + 12y^2 + 5x - 16y - 3 = (x - 2y + 3)(2x - 6y - 1)$.",
      commonMistakes: [
        { answer: -2, feedback: "Recheck the sign of $2fgh$: $2(-8)\\left(\\frac52\\right)(-5) = +200$." },
        { answer: 4, feedback: "Recheck: halve the written coefficients ($2h = -10$, $2g = 5$, $2f = -16$) before using $\\Delta$." },
      ],
    },
    {
      type: "quiz",
      id: "slc3-5-q10",
      variant: "practice",
      multiple: true,
      question:
        "Consider $2x^2 - 3xy - 2y^2 + 7x + y + 3 = 0$. Which statements are true? Select all that apply.",
      options: [
        { text: "It represents a pair of perpendicular lines", correct: true, feedback: "$\\Delta = 0$ and $a + b = 2 - 2 = 0$." },
        { text: "The lines meet at $(-1, 1)$", correct: true, feedback: "$2\\alpha - \\frac32\\beta + \\frac72 = 0$ and $-\\frac32\\alpha - 2\\beta + \\frac12 = 0$ give $(-1, 1)$." },
        { text: "One of the lines is $2x + y + 1 = 0$", correct: true, feedback: "The equation factors as $(2x + y + 1)(x - 2y + 3)$." },
        { text: "One of the lines passes through the origin", feedback: "The constant term is $3 \\ne 0$, so neither line passes through $O$." },
        { text: "Its $\\Delta$ is non-zero", feedback: "$\\Delta = 0$: it factors." },
      ],
      hint: "Factor $2x^2 - 3xy - 2y^2 = (2x + y)(x - 2y)$, then fit the constants.",
    },
    {
      type: "numeric",
      id: "slc3-5-q11",
      variant: "practice",
      question:
        "JEE Main. The line $x = 1$ meets the curve $y^2 = 4x$ at $A$ and $B$. Find $\\tan\\angle AOB$ in absolute value, where $O$ is the origin.",
      answer: 1.3333,
      tolerance: 0.001,
      hint: "Homogenise $y^2 = 4x$ using $x = 1$: $y^2 = 4x \\cdot x$.",
      solution: "$y^2 = 4x^2$ gives the lines $y = \\pm 2x$ (through $(1, \\pm 2)$). $\\tan\\theta = \\left\\lvert\\frac{2 - (-2)}{1 + (2)(-2)}\\right\\rvert = \\frac43$. (The angle $AOB$ itself is obtuse; its tangent is $-\\frac43$.)",
      commonMistakes: [
        { answer: 4, feedback: "That is $m_1 - m_2$; divide by $\\lvert 1 + m_1m_2\\rvert = 3$." },
        { answer: 0.75, tolerance: 0.001, feedback: "That is the reciprocal." },
      ],
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "triangle-problems-in-coordinates",
  title: "3.6 · Triangle Problems in Coordinates",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "A favourite JEE pattern hands you **part** of a triangle (one vertex, plus the equations of two medians, or two altitudes, or two angle bisectors) and asks for the rest. Each of these has a one-idea solution once you know which property of the special line to use. This lesson collects the four standard moves and drills them.",
    },
    {
      type: "table",
      headers: ["Given", "Key property", "Move"],
      rows: [
        ["Three sides", "Vertices are pairwise intersections", "Intersect the lines two at a time"],
        ["A vertex and two medians", "Medians meet at $G$, and $A + B + C = 3G$", "$B$ on one median, $C$ on the other, $B + C = 3G - A$"],
        ["A vertex and two altitudes", "Each side is perpendicular to the opposite altitude", "Sides through $A$ perpendicular to the altitudes, then intersect"],
        ["A vertex and two internal bisectors", "The image of $A$ in the bisector of $B$ lies on $BC$", "Reflect $A$ in both bisectors; the images span $BC$"],
      ],
    },
    {
      type: "interactive",
      config: {
        component: "slc-line-explorer",
        mode: "triangle",
        a: [2, 4],
        b: [0, -2],
        c: [6, 0],
        show: ["altitudes", "orthocentre", "centroid", "circumcentre", "euler-line"],
        window: { xmin: -3, xmax: 9, ymin: -4, ymax: 6 },
        caption:
          "This is the triangle of question 4 below. Drag the vertices and watch the altitudes stay concurrent at the orthocentre $H$, while $H$, the centroid $G$ and the circumcentre $O$ stay on one line (the Euler line) with $HG = 2\\,GO$.",
      },
    },
    { type: "heading", text: "Medians and altitudes" },
    {
      type: "worked-example",
      id: "slc3-6-we1",
      title: "Worked example 1: a vertex and two medians",
      problem:
        "In triangle $ABC$, $A = (1, 4)$, the median through $B$ is $2x - 3y + 1 = 0$ and the median through $C$ is $x + 3y - 4 = 0$. Find $B$ and $C$.",
      steps: [
        { text: "The medians meet at the centroid: $2x - 3y = -1$, $x + 3y = 4$ give $G = (1, 1)$." },
        {
          text: "Since $G = \\frac{A + B + C}{3}$, we get $B + C = 3G - A = (2, -1)$. *Why this step:* this single vector equation ties the two unknown vertices together, so each median only has to supply one more condition.",
        },
        { text: "Put $B = \\left(t, \\frac{2t + 1}{3}\\right)$ on its median. Then $C = \\left(2 - t, -1 - \\frac{2t + 1}{3}\\right)$." },
        { text: "$C$ is on $x + 3y - 4 = 0$: $(2 - t) - 3 - (2t + 1) - 4 = 0$, so $-3t - 6 = 0$ and $t = -2$." },
      ],
      answer: "$B = (-2, -1)$, $C = (4, 0)$.",
    },
    {
      type: "worked-example",
      id: "slc3-6-we2",
      title: "Worked example 2: a vertex and two altitudes",
      problem:
        "In triangle $ABC$, $A = (1, 3)$, the altitude from $B$ is $3x - 4y + 6 = 0$ and the altitude from $C$ is $x + y - 3 = 0$. Find $B$ and $C$.",
      steps: [
        {
          text: "$AC$ is perpendicular to the altitude from $B$, whose normal is $(3, -4)$. So $AC$ has direction $(3, -4)$, i.e. normal $(4, 3)$: $4(x - 1) + 3(y - 3) = 0$, or $4x + 3y - 13 = 0$. *Why this step:* the altitude from $B$ is, by definition, perpendicular to the opposite side $AC$, and $A$ is on $AC$.",
        },
        { text: "Likewise $AB$ is perpendicular to $x + y - 3 = 0$: $AB$ is $x - y + 2 = 0$." },
        { text: "$B$ is on $AB$ and on its own altitude: $x - y = -2$, $3x - 4y = -6$ give $B = (-2, 0)$." },
        { text: "$C$ is on $AC$ and on its altitude: $4x + 3y = 13$, $x + y = 3$ give $C = (4, -1)$." },
      ],
      answer: "$B = (-2, 0)$, $C = (4, -1)$; side $BC$ is $x + 6y + 2 = 0$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the vertex lies on the given median or altitude\"",
      content:
        "The median **through $B$** contains $B$ and the midpoint of $AC$, not $A$. Always check: substitute the given vertex into each given line. If it does not satisfy it, the line belongs to another vertex, and that is what makes the problem solvable.",
    },
    { type: "heading", text: "Angle bisectors and the reflection trick" },
    {
      type: "text",
      content:
        "The internal bisector of angle $B$ is a mirror line for the two sides through $B$: reflecting side $BA$ in it gives side $BC$. So the image of $A$ in the bisector of $B$ lies on line $BC$. The same holds for the bisector of $C$. Two images, both on $BC$: they determine the line $BC$ without knowing $B$ or $C$.",
    },
    {
      type: "worked-example",
      id: "slc3-6-we3",
      title: "Worked example 3: a vertex and two internal bisectors",
      problem:
        "JEE Advanced. In triangle $ABC$, $A = (0, 8)$, and the internal bisectors of angles $B$ and $C$ are $x - y = 0$ and $x + 2y - 6 = 0$. Find $B$ and $C$.",
      steps: [
        { text: "Image of $A$ in $y = x$: swap coordinates, $(8, 0)$." },
        {
          text: "Image of $A$ in $x + 2y - 6 = 0$: $L(A) = 16 - 6 = 10$. *Why this step:* both images lie on $BC$, so two reflections give the side without any unknowns.",
          latex: "\\frac{x - 0}{1} = \\frac{y - 8}{2} = \\frac{-2 \\cdot 10}{5} = -4 \\implies (-4, 0)",
        },
        { text: "Both images are on the x-axis, so $BC$ is $y = 0$." },
        { text: "$B$ is on $BC$ and on its bisector $y = x$: $B = (0, 0)$. $C$ is on $BC$ and on $x + 2y = 6$: $C = (6, 0)$." },
      ],
      answer: "$B = (0, 0)$, $C = (6, 0)$ (a 6-8-10 right triangle).",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Centres from side equations",
      content:
        "- **Right angle visible?** If two sides are perpendicular, the right-angle vertex is the orthocentre and the midpoint of the hypotenuse is the circumcentre.\n- **Orthocentre:** intersect two altitudes (through a vertex, perpendicular to the opposite side).\n- **Circumcentre:** intersect two perpendicular bisectors of sides.\n- **Incentre:** use $\\frac{ax_1 + bx_2 + cx_3}{a + b + c}$ with side lengths, or intersect two internal bisectors.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "slc3-6-q1",
      variant: "concept",
      question: "JEE Main. What is the orthocentre of the triangle formed by the lines $xy = 0$ and $x + y = 1$?",
      options: [
        { text: "$(0, 0)$", correct: true, feedback: "$xy = 0$ is the two axes, so the triangle is right-angled at the origin, and the right-angle vertex is the orthocentre." },
        { text: "$\\left(\\frac12, \\frac12\\right)$", feedback: "That is the circumcentre (midpoint of the hypotenuse)." },
        { text: "$\\left(\\frac13, \\frac13\\right)$", feedback: "That is the centroid." },
        { text: "$(1, 1)$", feedback: "That point is not even inside the triangle; the altitudes of a right triangle meet at the right angle." },
      ],
      hint: "$xy = 0$ is a pair of lines. Which ones, and what angle do they make?",
    },
    {
      type: "numeric",
      id: "slc3-6-q2",
      variant: "practice",
      question:
        "The sides of a triangle lie on $y = 1$, $2x + y = 11$ and $2x - y = 1$. Find the y-coordinate of its orthocentre.",
      answer: 2,
      hint: "Find the vertices. The triangle is symmetric about $x = 3$, so the orthocentre is on $x = 3$; one more altitude finishes it.",
      solution:
        "Vertices $A(1, 1)$, $B(5, 1)$, $C(3, 5)$. The altitude from $C$ is $x = 3$. The altitude from $A$ is perpendicular to $BC$ (direction $(-2, 4)$): $-2(x - 1) + 4(y - 1) = 0$. At $x = 3$: $4y = 8$, so $y = 2$.",
      commonMistakes: [
        { answer: 2.5, feedback: "That is the circumcentre $(3, 2.5)$, equidistant from the vertices." },
        { answer: 2.3333, tolerance: 0.01, feedback: "That is the centroid's y-coordinate $\\frac{1 + 1 + 5}{3}$." },
      ],
    },
    {
      type: "quiz",
      id: "slc3-6-q3",
      variant: "practice",
      multiple: true,
      question:
        "For the triangle with sides $y = 1$, $2x + y = 11$ and $2x - y = 1$, which statements are true? Select all that apply.",
      options: [
        { text: "It is isosceles", correct: true, feedback: "The vertices are $(1, 1)$, $(5, 1)$, $(3, 5)$, and both slanted sides have length $\\sqrt{20}$." },
        { text: "Its area is 8", correct: true, feedback: "Base 4 on $y = 1$, height 4: $\\frac12 \\cdot 4 \\cdot 4 = 8$." },
        { text: "Its centroid is $\\left(3, \\frac73\\right)$", correct: true, feedback: "$\\left(\\frac{1 + 5 + 3}{3}, \\frac{1 + 1 + 5}{3}\\right)$." },
        { text: "It is right-angled", feedback: "No two sides are perpendicular: slopes $0$, $-2$, $2$." },
        { text: "Its orthocentre lies outside it", feedback: "The triangle is acute, so $H = (3, 2)$ is inside." },
      ],
      hint: "Find the three vertices first.",
    },
    {
      type: "quiz",
      id: "slc3-6-q4",
      variant: "practice",
      question:
        "In triangle $ABC$, $A = (2, 4)$, and the altitudes from $B$ and $C$ are $x - y - 2 = 0$ and $x + 3y - 6 = 0$. Which line is $BC$?",
      options: [
        { text: "$x - 3y - 6 = 0$", correct: true, feedback: "$AC \\perp (x - y - 2 = 0)$ gives $AC: x + y = 6$, so $C = (6, 0)$; $AB \\perp (x + 3y - 6 = 0)$ gives $AB: 3x - y = 2$, so $B = (0, -2)$. Join them." },
        { text: "$3x + y - 18 = 0$", feedback: "That passes through $C(6, 0)$ but not $B(0, -2)$." },
        { text: "$x + y - 6 = 0$", feedback: "That is side $AC$." },
        { text: "$3x - y - 2 = 0$", feedback: "That is side $AB$." },
      ],
      hint: "Write $AB$ and $AC$ through $A$, perpendicular to the altitudes from $C$ and $B$ respectively; then find $B$ and $C$.",
    },
    {
      type: "numeric",
      id: "slc3-6-q5",
      variant: "practice",
      question: "Find the area of the triangle formed by the lines $y = x$, $y = 2x$ and $y = 3x + 1$.",
      answer: 0.25,
      tolerance: 0.001,
      hint: "The first two meet at the origin; intersect each of them with the third.",
      solution:
        "$y = x$ and $y = 3x + 1$: $x = -\\frac12$, point $\\left(-\\frac12, -\\frac12\\right)$. $y = 2x$ and $y = 3x + 1$: $(-1, -2)$. Area $= \\frac12\\left\\lvert\\left(-\\frac12\\right)(-2) - \\left(-\\frac12\\right)(-1)\\right\\rvert = \\frac12 \\cdot \\frac12 = \\frac14$.",
      commonMistakes: [
        { answer: 0.5, tolerance: 0.001, feedback: "Halve the determinant." },
        { answer: 0.75, tolerance: 0.001, feedback: "Sign slip: the determinant is $1 - \\frac12$, not $1 + \\frac12$." },
      ],
    },
    {
      type: "quiz",
      id: "slc3-6-q6",
      variant: "concept",
      multiple: true,
      question:
        "In triangle $ABC$ you know $A$ and the internal bisectors of angles $B$ and $C$. Which points are guaranteed to lie on line $BC$? Select all that apply.",
      options: [
        { text: "The image of $A$ in the bisector of $B$", correct: true, feedback: "The bisector of $B$ reflects line $BA$ onto line $BC$." },
        { text: "The image of $A$ in the bisector of $C$", correct: true, feedback: "Same argument at vertex $C$." },
        { text: "The incentre", feedback: "The incentre is inside the triangle, not on a side." },
        { text: "The foot of the perpendicular from $A$ to the bisector of $B$", feedback: "That foot is the midpoint of $A$ and its image; it is inside the angle, not on $BC$." },
        { text: "The image of $A$ in the bisector of $A$", feedback: "$A$ is on its own bisector, so its image is $A$ itself." },
      ],
      hint: "A bisector is a mirror that swaps the two sides through its vertex.",
    },
    {
      type: "numeric",
      id: "slc3-6-q7",
      variant: "practice",
      question:
        "JEE Advanced. In triangle $ABC$, $A = (0, 5)$, and the internal bisectors of angles $B$ and $C$ are $x - y = 0$ and $x + 5y - 12 = 0$. Find the length $BC$.",
      answer: 12,
      hint: "Reflect $A$ in each bisector. Both images lie on $BC$.",
      solution:
        "Image in $y = x$: $(5, 0)$. Image in $x + 5y - 12 = 0$: $L(A) = 13$, so the image is $(0, 5) - \\frac{26}{26}(1, 5) = (-1, 0)$. So $BC$ is $y = 0$, $B = (0, 0)$ (on $y = x$) and $C = (12, 0)$ (on $x + 5y = 12$). $BC = 12$.",
      commonMistakes: [
        { answer: 13, feedback: "13 is $CA$, the hypotenuse of this 5-12-13 triangle." },
        { answer: 6, feedback: "The distance between the two images is 6, but $B$ and $C$ themselves are where $BC$ meets the bisectors." },
      ],
    },
    {
      type: "numeric",
      id: "slc3-6-q8",
      variant: "practice",
      question: "Find the circumradius of the triangle formed by $x = 0$, $y = 0$ and $4x + 3y = 24$.",
      answer: 5,
      hint: "The triangle is right-angled at the origin, so the hypotenuse is a diameter.",
      solution: "Vertices $(0, 0)$, $(6, 0)$, $(0, 8)$. Hypotenuse $= \\sqrt{36 + 64} = 10$, so $R = 5$, with circumcentre $(3, 4)$.",
      commonMistakes: [
        { answer: 10, feedback: "10 is the hypotenuse, i.e. the diameter." },
        { answer: 2, feedback: "2 is the inradius $\\frac{6 + 8 - 10}{2}$." },
      ],
    },
    {
      type: "quiz",
      id: "slc3-6-q9",
      variant: "practice",
      question:
        "JEE Main. Two sides of a parallelogram lie along $x - y = 0$ and $2x - y = 0$, and its diagonals meet at $(3, 4)$. Which lines carry the other two sides?",
      options: [
        { text: "$x - y + 2 = 0$ and $2x - y - 4 = 0$", correct: true, feedback: "The given sides meet at $O$; the opposite vertex is $2(3, 4) - O = (6, 8)$, and the other sides are the parallels through it." },
        { text: "$x - y - 2 = 0$ and $2x - y + 4 = 0$", feedback: "These are parallel to the right lines but miss $(6, 8)$." },
        { text: "$x - y + 1 = 0$ and $2x - y - 2 = 0$", feedback: "These pass through $(3, 4)$, the centre, not the opposite vertex." },
        { text: "$x + y - 14 = 0$ and $x - 2y + 10 = 0$", feedback: "These pass through $(6, 8)$ but are not parallel to the given sides." },
      ],
      hint: "The diagonals bisect each other, so the vertex opposite the origin is the reflection of $O$ in $(3, 4)$.",
    },
    {
      type: "numeric",
      id: "slc3-6-q10",
      variant: "practice",
      question:
        "The incentre of the triangle formed by $x = 0$, $y = 0$ and $3x + 4y = 12$ is $(p, q)$. Find $p + q$.",
      answer: 2,
      hint: "The inradius of a right triangle is $r = \\frac{\\text{leg}_1 + \\text{leg}_2 - \\text{hypotenuse}}{2}$, and the incentre is $(r, r)$ here.",
      solution: "Legs 4 and 3, hypotenuse 5, so $r = 1$ and the incentre is $(1, 1)$. Check: $\\frac{5 \\cdot 0 + 3 \\cdot 4 + 4 \\cdot 0}{12} = 1$. So $p + q = 2$.",
      commonMistakes: [
        { answer: 2.3333, tolerance: 0.01, feedback: "That is the centroid $\\left(\\frac43, 1\\right)$." },
        { answer: 3.5, feedback: "That is the circumcentre $\\left(2, \\frac32\\right)$, the midpoint of the hypotenuse." },
      ],
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-3-mastery",
  title: "3.7 · Chapter 3 Mastery",
  position: 7,
  blocks: blocks([
    {
      type: "text",
      content:
        "No new theory and no formula sheet. Every question below comes from one of four ideas: a combination of line equations ($L_1 + \\lambda L_2$, $\\alpha L_1 + \\beta L_2 + \\gamma L_3$), the angle formula with both signs, reflection, or reading a second-degree equation as two lines. If you are stuck, draw the lines first.",
    },
    { type: "heading", text: "Reconstruct it" },
    {
      type: "callout",
      variant: "tip",
      title: "Rebuild the chapter from \"a combination of equations\"",
      content:
        "Without notes:\n\n1. Why does $L_1 + \\lambda L_2 = 0$ pass through $L_1 \\cap L_2$, and which line through that point does it miss?\n2. Substitute the meeting point of $L_1$ and $L_2$ into $L_3$ and clear denominators. Why is the result the $3 \\times 3$ determinant? Why can it vanish for three parallel lines?\n3. From $\\tan(\\theta_0 \\pm \\alpha)$, write the two slopes at angle $\\alpha$ to a line of slope $m_0$. When is one of the lines vertical?\n4. Multiply $(y - m_1x)(y - m_2x)$ and read off $m_1 + m_2$ and $m_1m_2$ in terms of $a$, $h$, $b$. Derive $\\tan\\theta = \\frac{2\\sqrt{h^2 - ab}}{\\lvert a + b\\rvert}$.\n5. Why must the expression under the square root be a perfect square for $S = 0$ to be two lines? What does homogenising with $\\frac{lx + my}{n} = 1$ produce, and why does it pass through both meeting points?",
    },
    {
      type: "interactive",
      config: {
        component: "slc-line-explorer",
        mode: "family",
        a: [-4, 1],
        b: [4, 3],
        c: [-2, -4],
        d: [2, 4],
        lambda: { min: -4, max: 4, step: 0.25, initial: -1 },
        show: ["family-fan"],
        caption:
          "Check question 1 here: predict which value of $\\lambda$ makes the member horizontal, vertical, or parallel to a line you choose, then slide to it. No value reaches $L_2$.",
      },
    },
    { type: "heading", text: "Mastery questions" },
    {
      type: "numeric",
      id: "slc3-7-q1",
      variant: "mastery",
      question: "Find $k$ so that $x - 2y + 3 = 0$, $3x + y - 5 = 0$ and $kx - y + 1 = 0$ are concurrent.",
      answer: 1,
      hint: "Lesson 3.1: intersect the two lines without $k$ first.",
      solution: "From the first, $x = 2y - 3$; then $6y - 9 + y = 5$, so $y = 2$, $x = 1$. Then $k - 2 + 1 = 0$, $k = 1$.",
      commonMistakes: [
        { answer: -1, feedback: "Sign slip: $k(1) - 2 + 1 = 0$ gives $k = 1$." },
        { answer: 3, feedback: "Recheck the common point: it is $(1, 2)$." },
      ],
    },
    {
      type: "quiz",
      id: "slc3-7-q2",
      variant: "mastery",
      question: "For every real $k$, the line $(2 + k)x + (1 - 3k)y + (5k - 4) = 0$ passes through",
      options: [
        { text: "$(1, 2)$", correct: true, feedback: "It is $(2x + y - 4) + k(x - 3y + 5) = 0$, and both brackets vanish at $(1, 2)$." },
        { text: "$(2, 1)$", feedback: "$x - 3y + 5$ at $(2, 1)$ is $4 \\ne 0$." },
        { text: "$(-1, 2)$", feedback: "$2x + y - 4$ at $(-1, 2)$ is $-4 \\ne 0$." },
        { text: "no fixed point", feedback: "The coefficients are linear in $k$, so the family is $L_1 + kL_2 = 0$, which has a fixed point." },
      ],
      hint: "Lesson 3.2: separate the terms containing $k$.",
    },
    {
      type: "numeric",
      id: "slc3-7-q3",
      variant: "mastery",
      question:
        "Lines are drawn through the intersection of $x - y + 1 = 0$ and $2x + y - 4 = 0$. Find the greatest possible distance of such a line from the point $(4, -2)$.",
      answer: 5,
      hint: "Lesson 3.2: every such line passes through the common point $P$. Which one is farthest from $(4, -2)$?",
      solution: "$P = (1, 2)$. The farthest line through $P$ is perpendicular to the segment from $P$ to $(4, -2)$, at distance $\\sqrt{9 + 16} = 5$.",
      commonMistakes: [
        { answer: 25, feedback: "Take the square root of $9 + 16$." },
        { answer: 0, feedback: "That is the least distance (the line through both points)." },
      ],
    },
    {
      type: "quiz",
      id: "slc3-7-q4",
      variant: "mastery",
      multiple: true,
      question:
        "Which lines pass through $(3, 1)$ and make an angle of $45^\\circ$ with $x + 2y = 5$? Select all that apply.",
      options: [
        { text: "$x - 3y = 0$", correct: true, feedback: "Slope $\\frac13 = \\frac{-\\frac12 + 1}{1 + \\frac12}$, and $3 - 3 = 0$." },
        { text: "$3x + y - 10 = 0$", correct: true, feedback: "Slope $-3 = \\frac{-\\frac12 - 1}{1 - \\frac12}$, and $9 + 1 - 10 = 0$." },
        { text: "$3x - y - 8 = 0$", feedback: "Through $(3, 1)$, but slope 3 against $-\\frac12$ gives $\\tan\\theta = 7$." },
        { text: "$x + 3y - 6 = 0$", feedback: "Through $(3, 1)$, but slope $-\\frac13$ against $-\\frac12$ gives $\\tan\\theta = \\frac17$." },
      ],
      hint: "Lesson 3.3: $m = \\frac{m_0 \\pm 1}{1 \\mp m_0}$ with $m_0 = -\\frac12$.",
    },
    {
      type: "numeric",
      id: "slc3-7-q5",
      variant: "mastery",
      question: "Find the slope of the image of the line $x - 2y = 0$ in the line $x + y = 3$.",
      answer: 2,
      hint: "Lesson 3.3: the lines meet at $(2, 1)$. Reflect the origin as the second point.",
      solution: "The origin reflects in $x + y - 3 = 0$ to $(3, 3)$. Joining $(2, 1)$ and $(3, 3)$: slope 2. The image is $2x - y - 3 = 0$. (A mirror of slope $-1$ always turns slope $m$ into $\\frac1m$.)",
      commonMistakes: [
        { answer: 0.5, feedback: "That is the slope of the original line." },
        { answer: -2, feedback: "Recheck the image of $O$: $L(O) = -3$, so it moves by $+3$ in each coordinate, to $(3, 3)$." },
      ],
    },
    {
      type: "numeric",
      id: "slc3-7-q6",
      variant: "mastery",
      question: "Find $\\tan\\theta$ for the acute angle $\\theta$ between the lines $x^2 - 7xy + 12y^2 = 0$.",
      answer: 0.076923,
      tolerance: 0.001,
      hint: "Lesson 3.4: $\\tan\\theta = \\frac{2\\sqrt{h^2 - ab}}{\\lvert a + b\\rvert}$ with $h = -\\frac72$.",
      solution: "$h^2 - ab = \\frac{49}{4} - 12 = \\frac14$, so $\\tan\\theta = \\frac{2 \\cdot \\frac12}{13} = \\frac{1}{13}$. (Slopes $\\frac13$, $\\frac14$.)",
      commonMistakes: [
        { answer: 13, feedback: "That is the reciprocal." },
        { answer: 0.0385, tolerance: 0.001, feedback: "Don't forget the factor 2 in the numerator." },
      ],
    },
    {
      type: "quiz",
      id: "slc3-7-q7",
      variant: "mastery",
      multiple: true,
      question: "Which statements about the pair $2x^2 - 5xy + 2y^2 = 0$ are true? Select all that apply.",
      options: [
        { text: "The lines are $y = 2x$ and $y = \\frac x2$", correct: true, feedback: "$2x^2 - 5xy + 2y^2 = (2x - y)(x - 2y)$." },
        { text: "The lines are mirror images of each other in $y = x$", correct: true, feedback: "Their slopes are reciprocals, and swapping $x$, $y$ leaves the equation unchanged." },
        { text: "The angle bisectors are $y = x$ and $y = -x$", correct: true, feedback: "$a = b$ makes the bisector equation $\\frac{x^2 - y^2}{0} = \\frac{xy}{h}$ read $x^2 - y^2 = 0$." },
        { text: "The lines are perpendicular", feedback: "$a + b = 4 \\ne 0$." },
        { text: "$\\tan\\theta = \\frac43$ for the angle between them", feedback: "$\\tan\\theta = \\frac{2\\sqrt{\\frac{25}{4} - 4}}{4} = \\frac34$." },
      ],
      hint: "Lesson 3.4: factor first; then use the angle and bisector formulas.",
    },
    {
      type: "numeric",
      id: "slc3-7-q8",
      variant: "mastery",
      question:
        "JEE Main. Find $k$ so that $12x^2 - 10xy + 2y^2 + 11x - 5y + k = 0$ represents a pair of straight lines.",
      answer: 2,
      hint: "Lesson 3.5: factor $12x^2 - 10xy + 2y^2 = (6x - 2y)(2x - y)$ and match the linear terms, or use $\\Delta = 0$.",
      solution:
        "$(6x - 2y + p)(2x - y + q)$: $x$: $6q + 2p = 11$; $y$: $-2q - p = -5$. So $p = 1$, $q = \\frac32$... check: $6 \\cdot \\frac32 + 2 = 11$ and $-3 - 1 = -4$? Fix by using $\\Delta$ instead: $a = 12$, $h = -5$, $b = 2$, $g = \\frac{11}{2}$, $f = -\\frac52$ give $\\Delta = 24k + \\frac{275}{2} - 75 - \\frac{121}{2} - 25k = 2 - k$, so $k = 2$.",
      commonMistakes: [
        { answer: -2, feedback: "Recheck the sign of $2fgh = 2\\left(-\\frac52\\right)\\left(\\frac{11}{2}\\right)(-5) = +\\frac{275}{2}$." },
        { answer: 3, feedback: "Recompute $\\Delta = 24k + 137.5 - 75 - 60.5 - 25k$." },
      ],
    },
    {
      type: "numeric",
      id: "slc3-7-q9",
      variant: "mastery",
      question:
        "The line $x = c$ ($c > 0$) meets $y^2 = 4x$ at $A$ and $B$. Find $c$ if $\\angle AOB = 90^\\circ$, where $O$ is the origin.",
      answer: 4,
      hint: "Lesson 3.5: homogenise $y^2 = 4x$ with $\\frac xc = 1$, then make the $x^2$ and $y^2$ coefficients add to zero.",
      solution: "$y^2 = 4x \\cdot \\frac xc$, i.e. $\\frac4c x^2 - y^2 = 0$. Perpendicular iff $\\frac4c - 1 = 0$, so $c = 4$. (Check: $A = (4, 4)$, $B = (4, -4)$, and $OA \\cdot OB = 16 - 16 = 0$.)",
      commonMistakes: [
        { answer: 1, feedback: "At $c = 1$ the points are $(1, \\pm 2)$, and $1 - 4 \\ne 0$: not a right angle." },
        { answer: 2, feedback: "At $c = 2$: $(2, \\pm 2\\sqrt2)$, and $4 - 8 \\ne 0$." },
      ],
    },
    {
      type: "quiz",
      id: "slc3-7-q10",
      variant: "mastery",
      question:
        "JEE Main. If the lines $x + 2ay + a = 0$, $x + 3by + b = 0$ and $x + 4cy + c = 0$ are concurrent ($a, b, c$ non-zero), then $a, b, c$ are in",
      options: [
        { text: "harmonic progression", correct: true, feedback: "The determinant reduces to $2ac = ab + bc$, i.e. $\\frac2b = \\frac1a + \\frac1c$: the reciprocals are in AP." },
        { text: "arithmetic progression", feedback: "$a = 1$, $b = 2$, $c = 3$ gives determinant $-bc + 2ac - ab = -6 + 6 - 2 \\ne 0$." },
        { text: "geometric progression", feedback: "$a = 1$, $b = 2$, $c = 4$ gives $-8 + 8 - 2 \\ne 0$." },
        { text: "a relation $a + b + c = 0$", feedback: "$a = b = 1$, $c = -2$ gives $2 - 4 - 1 \\ne 0$." },
      ],
      hint: "Lesson 3.1: expand $\\begin{vmatrix} 1 & 2a & a \\\\ 1 & 3b & b \\\\ 1 & 4c & c \\end{vmatrix} = 0$ and divide by $abc$.",
    },
    {
      type: "numeric",
      id: "slc3-7-q11",
      variant: "mastery",
      question:
        "In triangle $ABC$, $A = (0, 4)$, and the altitudes from $B$ and $C$ are $x - y + 2 = 0$ and $x + 2y - 4 = 0$. Find the area of triangle $ABC$.",
      answer: 12,
      hint: "Lesson 3.6: $AB$ is perpendicular to the altitude from $C$, and $AC$ to the altitude from $B$.",
      solution:
        "$AB \\perp (x + 2y - 4 = 0)$ through $A$: $2x - y + 4 = 0$; with $x - y + 2 = 0$ it gives $B = (-2, 0)$. $AC \\perp (x - y + 2 = 0)$ through $A$: $x + y - 4 = 0$; with $x + 2y - 4 = 0$ it gives $C = (4, 0)$. Base 6, height 4: area 12.",
      commonMistakes: [
        { answer: 24, feedback: "Halve base times height." },
        { answer: 8, feedback: "The base is from $-2$ to $4$, length 6, not 4." },
      ],
    },
    {
      type: "numeric",
      id: "slc3-7-q12",
      variant: "mastery",
      question:
        "JEE Advanced. In triangle $ABC$, $A = (0, 3)$, and the internal bisectors of angles $B$ and $C$ are $y = x$ and $x + 3y = 4$. Find the area of triangle $ABC$.",
      answer: 6,
      hint: "Lesson 3.6: reflect $A$ in both bisectors; the images span $BC$.",
      solution:
        "Images: $(3, 0)$ in $y = x$, and $(0, 3) - \\frac{2 \\cdot 5}{10}(1, 3) = (-1, 0)$ in $x + 3y - 4 = 0$. So $BC$ is $y = 0$, $B = (0, 0)$, $C = (4, 0)$, and the area is $\\frac12 \\cdot 4 \\cdot 3 = 6$.",
      commonMistakes: [
        { answer: 12, feedback: "Halve base times height." },
        { answer: 7.5, feedback: "That uses $BC = 5$; 5 is $CA$. $BC = 4$." },
      ],
    },
    {
      type: "quiz",
      id: "slc3-7-q13",
      variant: "mastery",
      question:
        "A ray of light passes through $(1, 2)$, is reflected by the y-axis, and then passes through $(5, 3)$. At which point does it meet the y-axis?",
      options: [
        { text: "$\\left(0, \\frac{13}{6}\\right)$", correct: true, feedback: "Reflect $(1, 2)$ to $(-1, 2)$; the line to $(5, 3)$ rises $\\frac16$ per unit, reaching $x = 0$ at $y = 2 + \\frac16$." },
        { text: "$\\left(0, \\frac74\\right)$", feedback: "That is where the straight line from $(1, 2)$ to $(5, 3)$ would meet the y-axis, without reflecting." },
        { text: "$\\left(0, \\frac52\\right)$", feedback: "That is the average of the heights; the point divides in the ratio $1 : 5$ of the distances to the mirror." },
        { text: "$(0, 2)$", feedback: "The ray must rise between the two points, so it cannot hit the mirror at height 2." },
      ],
      hint: "Lesson 3.3: reflect the source in the mirror and draw a straight line to the target.",
    },
    {
      type: "quiz",
      id: "slc3-7-q14",
      variant: "mastery",
      multiple: true,
      question:
        "Consider $6x^2 - 5xy - 6y^2 + 14x + 5y + 4 = 0$. Which statements are true? Select all that apply.",
      options: [
        { text: "It represents a pair of straight lines", correct: true, feedback: "$\\Delta = 0$: it equals $(3x + 2y + 1)(2x - 3y + 4)$." },
        { text: "The two lines are perpendicular", correct: true, feedback: "$a + b = 6 - 6 = 0$." },
        { text: "One of the lines is $3x + 2y + 1 = 0$", correct: true, feedback: "The first factor." },
        { text: "The lines meet on the y-axis", feedback: "They meet at $\\left(-\\frac{11}{13}, \\frac{10}{13}\\right)$." },
        { text: "One of the lines passes through the origin", feedback: "The constant term is $4 \\ne 0$." },
      ],
      hint: "Lesson 3.5: factor $6x^2 - 5xy - 6y^2 = (3x + 2y)(2x - 3y)$ and fit the linear terms.",
    },
    {
      type: "numeric",
      id: "slc3-7-q15",
      variant: "mastery",
      question: "Find the area of the triangle formed by the lines $x^2 - 4y^2 = 0$ and $x = 4$.",
      answer: 8,
      hint: "Lesson 3.4: $x^2 - 4y^2 = 0$ is $y = \\pm\\frac x2$.",
      solution: "Vertices $(0, 0)$, $(4, 2)$, $(4, -2)$: base 4 on $x = 4$, height 4, area 8.",
      commonMistakes: [
        { answer: 16, feedback: "Halve base times height." },
        { answer: 32, feedback: "The lines are $y = \\pm\\frac x2$, not $y = \\pm 2x$." },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Where next",
      content:
        "Every curve so far was made of straight lines. Chapter 4 meets the first genuinely curved one: the circle, \"all points at distance $r$ from a centre\". The tools of this chapter come straight back. A circle is a second-degree equation with $a = b$ and $h = 0$; the tangency test is a distance from Chapter 2; and the family idea returns as $S + \\lambda L = 0$, every circle through the points where a line cuts a circle.",
    },
  ]),
};

export const slcChapter3Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lessonMastery,
];
