import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Straight Lines and Circles Chapter 1 — Slope and Equations of a Line.
 * A line is fixed by a point and a direction. Slope and inclination, the
 * parallel and perpendicular conditions, and every standard form of the
 * equation of a line (point-slope, slope-intercept, two-point, intercept,
 * normal, parametric/distance and general) derived from that one idea,
 * with the conversions between them.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "slope-and-inclination",
  title: "1.1 · Slope and Inclination",
  position: 1,
  blocks: blocks([
    {
      type: "text",
      content:
        "Walk along a straight road drawn on graph paper. However far you go, every step to the right lifts you (or drops you) by the same amount. That fixed **rise per unit run** is the one number that tells you which way a line points. It is called the **slope**, and almost everything in this chapter is built from it.",
    },
    {
      type: "text",
      content:
        "In Chapter 0 a pair of points gave a distance and a midpoint. Now the same pair gives a direction. Two points fix a line; the slope says how steeply it climbs, and the angle it makes with the x-axis, its **inclination**, says the same thing in degrees.",
    },
    { type: "heading", text: "Rise over run" },
    {
      type: "text",
      content:
        "Take two points $A(x_1, y_1)$ and $B(x_2, y_2)$ with $x_1 \\ne x_2$. Going from $A$ to $B$ the run is $x_2 - x_1$ and the rise is $y_2 - y_1$. Their ratio is the slope, and if the line makes angle $\\theta$ with the positive x-axis, the right triangle with legs run and rise shows that the same ratio is $\\tan\\theta$:",
    },
    {
      type: "math",
      latex: "m = \\frac{y_2 - y_1}{x_2 - x_1} = \\tan\\theta",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Slope and inclination",
      content:
        "The **inclination** of a line is the angle $\\theta \\in [0^\\circ, 180^\\circ)$ measured anticlockwise from the positive x-axis to the line. For a non-vertical line the **slope** is $m = \\tan\\theta$.\n\n- $\\theta = 0^\\circ$: horizontal line, $m = 0$\n- $0^\\circ < \\theta < 90^\\circ$: the line rises to the right, $m > 0$\n- $\\theta = 90^\\circ$: vertical line, slope **undefined**\n- $90^\\circ < \\theta < 180^\\circ$: the line falls to the right, $m < 0$",
    },
    {
      type: "interactive",
      config: {
        component: "slc-line-explorer",
        mode: "line",
        a: [-3, -1],
        b: [3, 2],
        caption:
          "Drag $A$ and $B$. The slope readout is rise over run and the inclination is the angle at which the line leaves the x-axis. Make the line steeper and steeper: the slope grows without bound, and when $A$ and $B$ line up vertically it is undefined.",
      },
    },
    { type: "heading", text: "Why any two points give the same slope" },
    {
      type: "text",
      content:
        "Pick two different pairs of points on the same line and draw their run-rise triangles. The triangles have the same angle $\\theta$ at their base and a right angle, so they are **similar**, and similar triangles have equal ratios of sides. That is why the slope is a property of the line, not of the two points you happened to choose, and why it does not matter whether you go from $A$ to $B$ or from $B$ to $A$: both rise and run change sign, and the ratio stays the same.",
    },
    {
      type: "worked-example",
      id: "slc1-1-we1",
      title: "Worked example 1: slope and inclination from two points",
      problem: "Find the slope and the inclination of the line through $(2, -1)$ and $(-1, 2)$.",
      steps: [
        { text: "Rise over run, subtracting in the same order on top and bottom:", latex: "m = \\frac{2 - (-1)}{-1 - 2} = \\frac{3}{-3} = -1" },
        { text: "Inclination: $\\tan\\theta = -1$ with $\\theta \\in [0^\\circ, 180^\\circ)$ gives $\\theta = 135^\\circ$. *Why this step:* $\\tan\\theta = -1$ also holds at $-45^\\circ$, but inclination is always measured into $[0^\\circ, 180^\\circ)$." },
      ],
      answer: "Slope $-1$, inclination $135^\\circ$.",
    },
    {
      type: "worked-example",
      id: "slc1-1-we2",
      title: "Worked example 2: an unknown coordinate from the inclination",
      problem: "The line through $(2, k)$ and $(5, 7)$ has inclination $45^\\circ$. Find $k$.",
      steps: [
        { text: "Inclination $45^\\circ$ means slope $\\tan 45^\\circ = 1$." },
        { text: "Set rise over run equal to 1:", latex: "\\frac{7 - k}{5 - 2} = 1 \\implies 7 - k = 3" },
      ],
      answer: "$k = 4$.",
    },
    { type: "heading", text: "Collinearity by slopes" },
    {
      type: "text",
      content:
        "Three points $A$, $B$, $C$ lie on one line exactly when the slope of $AB$ equals the slope of $BC$. The shared point $B$ matters: two segments with equal slopes are parallel, and parallel segments that share a point lie on the same line. (If $AB$ is vertical, check instead that all three x-coordinates agree.) This is the slope version of the zero-area test from Chapter 0.",
    },
    {
      type: "worked-example",
      id: "slc1-1-we3",
      title: "Worked example 3: collinear points",
      problem: "Find $k$ if $(1, 2)$, $(3, k)$ and $(-2, -7)$ are collinear.",
      steps: [
        { text: "Use the two known points for the slope of the line: $\\frac{-7 - 2}{-2 - 1} = \\frac{-9}{-3} = 3$. *Why this step:* the pair with no unknown fixes the slope at once, and the unknown point must then agree with it." },
        { text: "Slope from $(1, 2)$ to $(3, k)$ must also be 3:", latex: "\\frac{k - 2}{3 - 1} = 3 \\implies k = 8" },
      ],
      answer: "$k = 8$. Check: slope from $(3, 8)$ to $(-2, -7)$ is $\\frac{-15}{-5} = 3$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a vertical line has slope 0\"",
      content:
        "Slope 0 means **no rise**: a horizontal line such as $y = 3$. A vertical line such as $x = 2$ has **no run**, so rise over run divides by zero and the slope is undefined (people sometimes say \"infinite\"). Its inclination is $90^\\circ$, where $\\tan$ is undefined.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"subtract in any order\"",
      content:
        "You may start at either point, but you must start at the **same** point on top and bottom. $\\frac{y_2 - y_1}{x_1 - x_2}$ mixes the orders and gives the slope with the wrong sign: for $(1, 1)$ and $(3, 5)$ it gives $-2$ instead of $2$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "slc1-1-q1",
      variant: "practice",
      question: "Find the slope of the line through $(-2, 5)$ and $(4, -7)$.",
      answer: -2,
      hint: "Rise over run: $\\frac{-7 - 5}{4 - (-2)}$.",
      solution: "$m = \\frac{-12}{6} = -2$. The line falls 2 units for each unit to the right.",
      commonMistakes: [
        { answer: 2, feedback: "Sign slip: the subtraction orders on top and bottom must match. The rise is $-12$, the run is $+6$." },
        { answer: -0.5, feedback: "That is run over rise. Slope is rise (change in $y$) over run (change in $x$)." },
      ],
    },
    {
      type: "quiz",
      id: "slc1-1-q2",
      variant: "practice",
      question: "The line through $(0, 0)$ and $(-\\sqrt3, 1)$ has inclination",
      options: [
        { text: "$150^\\circ$", correct: true, feedback: "Slope $\\frac{1}{-\\sqrt3} = -\\frac{1}{\\sqrt3}$, and $\\tan 150^\\circ = -\\frac{1}{\\sqrt3}$." },
        { text: "$30^\\circ$", feedback: "$\\tan 30^\\circ = +\\frac{1}{\\sqrt3}$. The line falls to the right, so the slope is negative and the angle is obtuse." },
        { text: "$120^\\circ$", feedback: "$\\tan 120^\\circ = -\\sqrt3$. That would need run over rise; here the slope is $-\\frac{1}{\\sqrt3}$." },
        { text: "$-30^\\circ$", feedback: "$\\tan(-30^\\circ)$ is right, but inclination is always taken in $[0^\\circ, 180^\\circ)$: add $180^\\circ$." },
      ],
      hint: "Find the slope first, then the angle in $[0^\\circ, 180^\\circ)$ with that tangent.",
    },
    {
      type: "quiz",
      id: "slc1-1-q3",
      variant: "concept",
      question: "Which statement about the line $x = 2$ is correct?",
      options: [
        { text: "Its inclination is $90^\\circ$ and its slope is undefined", correct: true, feedback: "Any two of its points have the same $x$, so the run is zero." },
        { text: "Its slope is 0", feedback: "Slope 0 belongs to a horizontal line such as $y = 2$." },
        { text: "Its slope is 2", feedback: "2 is where it crosses the x-axis, not a slope." },
        { text: "Its inclination is $0^\\circ$", feedback: "Inclination $0^\\circ$ is horizontal. This line is vertical." },
      ],
      hint: "Take two points on the line, say $(2, 0)$ and $(2, 5)$, and compute the run.",
    },
    {
      type: "numeric",
      id: "slc1-1-q4",
      variant: "practice",
      question: "The line through $(k, 3)$ and $(2, -1)$ has slope 2. Find $k$.",
      answer: 4,
      hint: "Write $\\frac{3 - (-1)}{k - 2} = 2$, keeping the same order on top and bottom.",
      solution: "$\\frac{4}{k - 2} = 2$ gives $k - 2 = 2$, so $k = 4$.",
      commonMistakes: [
        { answer: 0, feedback: "Mixed orders: $\\frac{-1 - 3}{k - 2}$ starts at the other point on top. Use $\\frac{3 - (-1)}{k - 2}$ or $\\frac{-1 - 3}{2 - k}$." },
        { answer: 3, feedback: "Check: with $k = 3$ the slope is $\\frac{4}{1} = 4$." },
      ],
    },
    {
      type: "numeric",
      id: "slc1-1-q5",
      variant: "practice",
      question: "The points $A(2, 3)$, $B(4, k)$ and $C(6, -3)$ are collinear. Find $k$.",
      answer: 0,
      hint: "The slope of $AC$ is known. The slope of $AB$ must equal it.",
      solution: "Slope $AC = \\frac{-6}{4} = -\\frac32$. Then $\\frac{k - 3}{2} = -\\frac32$, so $k = 0$. (Also: $B$ has the middle x-coordinate, so it is the midpoint of $AC$.)",
      commonMistakes: [
        { answer: 6, feedback: "Sign slip: the slope of $AC$ is negative, so $k - 3 = -3$." },
        { answer: -3, feedback: "$-3$ is the y-coordinate of $C$. $B$ is halfway between $A$ and $C$." },
      ],
    },
    {
      type: "quiz",
      id: "slc1-1-q6",
      variant: "practice",
      multiple: true,
      question: "A line has inclination $\\theta$ with $90^\\circ < \\theta < 180^\\circ$. Which statements are true? Select all that apply.",
      options: [
        { text: "Its slope is negative", correct: true, feedback: "$\\tan\\theta < 0$ for obtuse $\\theta$." },
        { text: "As $x$ increases along the line, $y$ decreases", correct: true, feedback: "Negative rise per positive run." },
        { text: "Its slope equals $\\tan\\theta$", correct: true, feedback: "That is the definition, for every non-vertical line." },
        { text: "Its slope is positive", feedback: "Positive slope means an acute inclination." },
        { text: "It is steeper than the line $y = -x$", feedback: "Not forced: $\\theta = 170^\\circ$ gives slope about $-0.18$, much flatter than slope $-1$." },
      ],
      hint: "What is the sign of $\\tan\\theta$ in the second quadrant of angles?",
    },
    {
      type: "numeric",
      id: "slc1-1-q7",
      variant: "practice",
      question: "Find the inclination, in degrees, of the line through $(-1, 4)$ and $(2, 4 - 3\\sqrt3)$.",
      answer: 120,
      unit: "degrees",
      hint: "The slope is $\\frac{-3\\sqrt3}{3}$. Which angle in $[0^\\circ, 180^\\circ)$ has that tangent?",
      solution: "$m = -\\sqrt3$, and $\\tan 120^\\circ = -\\sqrt3$.",
      commonMistakes: [
        { answer: 60, feedback: "$\\tan 60^\\circ = +\\sqrt3$. The slope here is negative." },
        { answer: -60, feedback: "Inclination lies in $[0^\\circ, 180^\\circ)$: $-60^\\circ + 180^\\circ = 120^\\circ$." },
      ],
    },
    {
      type: "quiz",
      id: "slc1-1-q8",
      variant: "concept",
      question: "A line meets the **positive** x-axis and the **negative** y-axis. Its slope is",
      options: [
        { text: "positive", correct: true, feedback: "Going from the y-axis crossing (below the origin) to the x-axis crossing (right of the origin), $x$ and $y$ both increase." },
        { text: "negative", feedback: "Sketch it: from $(0, -2)$ up to $(3, 0)$ is a rise of 2 over a run of 3." },
        { text: "zero", feedback: "A horizontal line other than $y = 0$ never meets the x-axis." },
        { text: "undefined", feedback: "A vertical line never meets the y-axis unless it is the y-axis." },
      ],
      hint: "Take the two crossing points, say $(3, 0)$ and $(0, -2)$, and compute rise over run.",
    },
    {
      type: "numeric",
      id: "slc1-1-q9",
      variant: "practice",
      question: "JEE Main. The points $(a, 0)$, $(0, b)$ and $(1, 1)$ are collinear, where $a, b \\ne 0$. Find $\\frac1a + \\frac1b$.",
      answer: 1,
      hint: "Equate the slope from $(a, 0)$ to $(0, b)$ with the slope from $(0, b)$ to $(1, 1)$.",
      solution: "$\\frac{b - 0}{0 - a} = \\frac{1 - b}{1 - 0}$ gives $-b = a - ab$, so $ab = a + b$. Dividing by $ab$: $\\frac1a + \\frac1b = 1$.",
      commonMistakes: [
        { answer: 0, feedback: "Recheck the cross-multiplication: $-b = a(1 - b)$ gives $ab = a + b$." },
        { answer: -1, feedback: "Sign slip in the slope from $(a, 0)$ to $(0, b)$: it is $\\frac{b}{-a}$." },
      ],
    },
    {
      type: "quiz",
      id: "slc1-1-q10",
      variant: "practice",
      multiple: true,
      question: "Which of these triples of points are collinear? Select all that apply.",
      options: [
        { text: "$(1, 1)$, $(2, 3)$, $(4, 7)$", correct: true, feedback: "Slopes 2 and $\\frac{4}{2} = 2$." },
        { text: "$(0, 0)$, $(1, 2)$, $(3, 5)$", feedback: "Slopes 2 and $\\frac32$: they differ." },
        { text: "$(-1, 4)$, $(1, 0)$, $(2, -2)$", correct: true, feedback: "Slopes $\\frac{-4}{2} = -2$ and $\\frac{-2}{1} = -2$." },
        { text: "$(2, 2)$, $(2, 5)$, $(2, -1)$", correct: true, feedback: "All three have $x = 2$: they lie on a vertical line, where slopes are undefined but collinearity still holds." },
        { text: "$(1, 2)$, $(3, 3)$, $(5, 5)$", feedback: "Slopes $\\frac12$ and $1$: they differ." },
      ],
      hint: "Compare the slope of the first pair with the slope of the second pair. Treat equal x-coordinates separately.",
    },
    {
      type: "numeric",
      id: "slc1-1-q11",
      variant: "practice",
      question: "A line through $(2, 3)$ has inclination $135^\\circ$. It meets the x-axis at $(h, 0)$. Find $h$.",
      answer: 5,
      hint: "Slope $\\tan 135^\\circ = -1$. Use the slope between $(2, 3)$ and $(h, 0)$.",
      solution: "$\\frac{0 - 3}{h - 2} = -1$ gives $h - 2 = 3$, so $h = 5$.",
      commonMistakes: [
        { answer: -1, feedback: "That uses slope $+1$. $\\tan 135^\\circ = -1$." },
        { answer: 3, feedback: "3 is the drop in height. Add the run to $x = 2$." },
      ],
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "parallel-and-perpendicular-lines",
  title: "1.2 · Parallel and Perpendicular Lines",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "Rectangles, right triangles, altitudes, perpendicular bisectors: half of geometry is about lines that never meet or that meet at a right angle. With slopes, both conditions become one-line equations, and many proofs from school geometry turn into arithmetic.",
    },
    { type: "heading", text: "Parallel lines: equal slopes" },
    {
      type: "text",
      content:
        "Parallel lines make equal corresponding angles with the x-axis, so they have the same inclination, hence the same slope. Conversely, equal slopes mean equal inclinations, so the lines are parallel (or the same line). Two vertical lines are parallel too, even though neither has a slope.",
    },
    { type: "heading", text: "Perpendicular lines: slopes multiply to minus one" },
    {
      type: "text",
      content:
        "Take a run-rise step $(1, m_1)$ along the first line and rotate it by $90^\\circ$ anticlockwise. A quarter turn sends $(x, y)$ to $(-y, x)$, so the step becomes $(-m_1, 1)$: run $-m_1$, rise $1$. That is the direction of the perpendicular line, whose slope is therefore",
    },
    {
      type: "math",
      latex: "m_2 = \\frac{1}{-m_1} = -\\frac{1}{m_1} \\iff m_1 m_2 = -1",
    },
    {
      type: "text",
      content:
        "The same result from angles: if $\\theta_2 = \\theta_1 + 90^\\circ$ then $\\tan\\theta_2 = -\\cot\\theta_1 = -\\frac{1}{\\tan\\theta_1}$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Parallel and perpendicular conditions",
      content:
        "For non-vertical lines with slopes $m_1$ and $m_2$:\n\n- parallel (or coincident) $\\iff m_1 = m_2$\n- perpendicular $\\iff m_1 m_2 = -1$, i.e. $m_2 = -\\frac{1}{m_1}$ (the **negative reciprocal**)\n\nA horizontal line ($m = 0$) is perpendicular to every vertical line, a case the product rule cannot express.",
    },
    {
      type: "interactive",
      config: {
        component: "slc-line-explorer",
        mode: "two-lines",
        a: [-3, -1],
        b: [3, 2],
        c: [1, 4],
        d: [4, -2],
        caption:
          "$L_1 = AB$ has slope $\\frac12$ and $L_2 = CD$ has slope $-2$: their product is $-1$ and the readout reports a right angle. Drag $D$ to break it, then try to restore it. Next, drag $C$ and $D$ until $L_2$ has slope $\\frac12$ too and the lines never meet.",
      },
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"m₁m₂ = −1 works for every pair of perpendicular lines\"",
      content:
        "The x-axis and the y-axis are perpendicular, but the y-axis has no slope, so there is no product to compute. Whenever one line is vertical, check by hand: a vertical line is perpendicular exactly to the horizontal lines. Lesson 1.7 gives a test that has no exceptions.",
    },
    { type: "heading", text: "Lines parallel or perpendicular to a given line" },
    {
      type: "text",
      content:
        "Solving $ax + by + c = 0$ for $y$ (with $b \\ne 0$) gives $y = -\\frac ab x - \\frac cb$, so its slope is $-\\frac ab$. Every line with the same slope has the same $a$ and $b$, and only the constant changes. For the perpendicular slope $\\frac ba$, swap the coefficients and change one sign.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Write the family first, then fit the point",
      content:
        "- Lines parallel to $ax + by + c = 0$: $ax + by + k = 0$\n- Lines perpendicular to $ax + by + c = 0$: $bx - ay + k = 0$\n\nSubstitute the given point to find $k$. No slopes need to be computed.",
    },
    {
      type: "worked-example",
      id: "slc1-2-we1",
      title: "Worked example 1: through a point, parallel and perpendicular",
      problem: "Find the lines through $(2, -3)$ that are (a) parallel and (b) perpendicular to $3x - 4y + 7 = 0$.",
      steps: [
        { text: "(a) Parallel family $3x - 4y + k = 0$. Substitute $(2, -3)$: $6 + 12 + k = 0$, so $k = -18$." },
        { text: "(b) Perpendicular family $4x + 3y + k = 0$ (swap $3$ and $-4$, then change a sign). *Why this step:* the slope of $4x + 3y + k = 0$ is $-\\frac43$, the negative reciprocal of $\\frac34$." },
        { text: "Substitute $(2, -3)$: $8 - 9 + k = 0$, so $k = 1$." },
      ],
      answer: "(a) $3x - 4y - 18 = 0$. (b) $4x + 3y + 1 = 0$.",
    },
    {
      type: "worked-example",
      id: "slc1-2-we2",
      title: "Worked example 2: an unknown from perpendicularity",
      problem: "The line through $(1, 3)$ and $(4, k)$ is perpendicular to the line through $(-2, 1)$ and $(2, 3)$. Find $k$.",
      steps: [
        { text: "Slope of the second line: $\\frac{3 - 1}{2 + 2} = \\frac12$." },
        { text: "So the first line has slope $-2$:", latex: "\\frac{k - 3}{4 - 1} = -2 \\implies k = -3" },
      ],
      answer: "$k = -3$.",
    },
    { type: "heading", text: "Shapes and centres from slopes" },
    {
      type: "worked-example",
      id: "slc1-2-we3",
      title: "Worked example 3: identify the quadrilateral",
      problem: "Show that $A(1, 2)$, $B(4, 6)$, $C(8, 3)$, $D(5, -1)$ are the vertices of a square.",
      steps: [
        { text: "Slopes: $AB = \\frac43$, $BC = \\frac{-3}{4}$, $CD = \\frac{-4}{-3} = \\frac43$, $DA = \\frac{3}{-4} = -\\frac34$." },
        { text: "Opposite sides have equal slopes, so $ABCD$ is a parallelogram. Adjacent slopes multiply to $\\frac43 \\cdot \\left(-\\frac34\\right) = -1$, so every angle is right: a rectangle." },
        { text: "Adjacent sides: $AB = \\sqrt{9 + 16} = 5$ and $BC = \\sqrt{16 + 9} = 5$. *Why this step:* right angles alone give a rectangle; equal adjacent sides upgrade it to a square." },
      ],
      answer: "A rectangle with equal adjacent sides: a square of side 5.",
    },
    {
      type: "worked-example",
      id: "slc1-2-we4",
      title: "Worked example 4: orthocentre by slopes",
      problem: "Find the orthocentre of the triangle $A(0, 0)$, $B(6, 0)$, $C(2, 4)$.",
      steps: [
        { text: "$AB$ is horizontal, so the altitude from $C$ is the vertical line $x = 2$." },
        { text: "Slope $BC = \\frac{4}{2 - 6} = -1$, so the altitude from $A$ has slope $1$: it is $y = x$." },
        { text: "These meet at $(2, 2)$. Check with the third altitude: slope $AC = 2$, so the altitude from $B$ has slope $-\\frac12$, and the point $(2, 2)$ gives $\\frac{2 - 0}{2 - 6} = -\\frac12$. *Why this step:* the three altitudes are concurrent, so the third one is a free check on the arithmetic." },
      ],
      answer: "The orthocentre is $(2, 2)$.",
    },
    {
      type: "interactive",
      config: {
        component: "slc-line-explorer",
        mode: "two-lines",
        a: [-3, -1],
        b: [3, 2],
        c: [-3, 2],
        d: [3, 5],
        caption:
          "Here $L_2$ starts parallel to $L_1$: equal slopes, no intersection. Move $D$ one step up and the lines meet far away; move it back and the meeting point runs off to infinity.",
      },
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "slc1-2-q1",
      variant: "practice",
      question: "Find the slope of a line perpendicular to the line through $(1, 2)$ and $(5, 4)$.",
      answer: -2,
      hint: "Find the slope of the given line, then take its negative reciprocal.",
      solution: "The given slope is $\\frac{2}{4} = \\frac12$, so the perpendicular slope is $-2$.",
      commonMistakes: [
        { answer: 2, feedback: "Reciprocal without the minus sign. Perpendicular slopes multiply to $-1$." },
        { answer: -0.5, feedback: "Minus sign without the reciprocal. Check: $\\frac12 \\cdot \\left(-\\frac12\\right) = -\\frac14$, not $-1$." },
        { answer: 0.5, feedback: "That is the slope of the given line, which is parallel to itself, not perpendicular." },
      ],
    },
    {
      type: "numeric",
      id: "slc1-2-q2",
      variant: "practice",
      question: "The line through $(k, 1)$ and $(3, 5)$ is parallel to the line through $(0, 0)$ and $(2, 8)$. Find $k$.",
      answer: 2,
      hint: "Parallel lines have equal slopes. The second slope is 4.",
      solution: "$\\frac{5 - 1}{3 - k} = 4$ gives $3 - k = 1$, so $k = 2$.",
      commonMistakes: [
        { answer: 4, feedback: "Mixed subtraction order: the run from $(k, 1)$ to $(3, 5)$ is $3 - k$." },
        { answer: 3, feedback: "With $k = 3$ the line is vertical." },
      ],
    },
    {
      type: "quiz",
      id: "slc1-2-q3",
      variant: "practice",
      question: "The line through the origin perpendicular to $2x + 3y - 5 = 0$ is",
      options: [
        { text: "$3x - 2y = 0$", correct: true, feedback: "Swap the coefficients and change one sign; the constant is 0 because the line passes through the origin. Slopes $-\\frac23$ and $\\frac32$ multiply to $-1$." },
        { text: "$2x + 3y = 0$", feedback: "Same coefficients means same slope: this one is parallel." },
        { text: "$3x + 2y = 0$", feedback: "Slope $-\\frac32$. The product with $-\\frac23$ is $+1$, not $-1$." },
        { text: "$2x - 3y = 0$", feedback: "Slope $\\frac23$. The product with $-\\frac23$ is $-\\frac49$." },
      ],
      hint: "Perpendicular to $ax + by + c = 0$ means $bx - ay + k = 0$.",
    },
    {
      type: "quiz",
      id: "slc1-2-q4",
      variant: "practice",
      multiple: true,
      question: "Which pairs of lines are perpendicular? Select all that apply.",
      options: [
        { text: "$y = 2x + 1$ and $x + 2y = 7$", correct: true, feedback: "Slopes $2$ and $-\\frac12$." },
        { text: "$x = 3$ and $y = -2$", correct: true, feedback: "A vertical and a horizontal line: perpendicular, even though the product rule cannot be applied." },
        { text: "$y = x$ and $y = -x$", correct: true, feedback: "Slopes $1$ and $-1$." },
        { text: "$3x - 4y = 1$ and $4x - 3y = 2$", feedback: "Slopes $\\frac34$ and $\\frac43$ multiply to $+1$." },
        { text: "$y = 3x$ and $y = -3x$", feedback: "The product is $-9$. Perpendicular to slope 3 is slope $-\\frac13$." },
      ],
      hint: "Find each pair of slopes and multiply. Handle vertical lines separately.",
    },
    {
      type: "numeric",
      id: "slc1-2-q5",
      variant: "practice",
      question: "In the triangle $A(1, 1)$, $B(4, 5)$, $C(k, 2)$ the angle at $B$ is a right angle. Find $k$.",
      answer: 8,
      hint: "The sides at $B$ are $BA$ and $BC$. Their slopes must multiply to $-1$.",
      solution: "Slope $BA = \\frac{4}{3}$, slope $BC = \\frac{2 - 5}{k - 4} = \\frac{-3}{k - 4}$. Product: $\\frac{-4}{k - 4} = -1$, so $k = 8$.",
      commonMistakes: [
        { answer: 0, feedback: "Sign slip: $\\frac{-4}{k - 4} = -1$ gives $k - 4 = +4$." },
        { answer: -1 / 3, tolerance: 0.01, feedback: "That makes the angle at $A$ right (slopes of $AB$ and $AC$). The right angle is at $B$." },
      ],
    },
    {
      type: "quiz",
      id: "slc1-2-q6",
      variant: "concept",
      question: "Two lines, neither horizontal nor vertical, are perpendicular. Which must be true?",
      options: [
        { text: "Their slopes have opposite signs", correct: true, feedback: "$m_1 m_2 = -1 < 0$, so one slope is positive and the other negative." },
        { text: "Their slopes are equal", feedback: "Equal slopes mean parallel lines." },
        { text: "Their slopes are reciprocals", feedback: "Negative reciprocals. $2$ and $\\frac12$ multiply to $+1$." },
        { text: "The product of their slopes is 1", feedback: "The product is $-1$." },
      ],
      hint: "What does $m_1 m_2 = -1$ say about the signs?",
    },
    {
      type: "numeric",
      id: "slc1-2-q7",
      variant: "practice",
      question: "Find the sum of the coordinates of the orthocentre of the triangle $A(0, 0)$, $B(4, 0)$, $C(1, 3)$.",
      answer: 2,
      hint: "$AB$ is horizontal, so one altitude is vertical. Find one more altitude by slopes.",
      solution: "Altitude from $C$: $x = 1$. Slope $BC = \\frac{3}{-3} = -1$, so the altitude from $A$ is $y = x$. They meet at $(1, 1)$, and $1 + 1 = 2$.",
      commonMistakes: [
        { answer: 2.6667, tolerance: 0.01, feedback: "That is $\\frac53 + 1$, the centroid. The orthocentre is where the altitudes meet." },
        { answer: 4, feedback: "Check the altitude from $A$: perpendicular to slope $-1$ is slope $+1$, the line $y = x$." },
      ],
    },
    {
      type: "quiz",
      id: "slc1-2-q8",
      variant: "practice",
      multiple: true,
      question: "For $P(0, 0)$, $Q(3, 1)$, $R(4, 4)$, $S(1, 3)$, which statements are true? Select all that apply.",
      options: [
        { text: "$PQ \\parallel RS$", correct: true, feedback: "Both slopes are $\\frac13$." },
        { text: "$PQ \\perp QR$", feedback: "Slopes $\\frac13$ and $3$ multiply to $+1$." },
        { text: "The diagonals $PR$ and $QS$ are perpendicular", correct: true, feedback: "Slopes $1$ and $\\frac{2}{-2} = -1$." },
        { text: "$PQRS$ is a rhombus", correct: true, feedback: "A parallelogram ($PQ \\parallel RS$, $QR \\parallel SP$) with all sides $\\sqrt{10}$." },
        { text: "$PQRS$ is a square", feedback: "Its angles are not right: $PQ$ and $QR$ are not perpendicular." },
      ],
      hint: "Compute the four side slopes, the two diagonal slopes and one side length.",
    },
    {
      type: "numeric",
      id: "slc1-2-q9",
      variant: "practice",
      question: "The line through $(3, -1)$ perpendicular to $2x - 5y + 4 = 0$ is $5x + 2y + k = 0$. Find $k$.",
      answer: -13,
      hint: "Substitute $(3, -1)$ into $5x + 2y + k = 0$.",
      solution: "$15 - 2 + k = 0$, so $k = -13$: the line is $5x + 2y - 13 = 0$.",
      commonMistakes: [
        { answer: 13, feedback: "Sign slip: $13 + k = 0$ gives $k = -13$." },
        { answer: -17, feedback: "Substitute $y = -1$ carefully: $2y = -2$." },
      ],
    },
    {
      type: "numeric",
      id: "slc1-2-q10",
      variant: "practice",
      question: "JEE Main. The line through $(h, 3)$ and $(4, 1)$ meets $7x - 9y - 19 = 0$ at a right angle. Find $h$ (a fraction is fine).",
      answer: 22 / 9,
      tolerance: 0.01,
      hint: "The given line has slope $\\frac79$, so the line through the two points has slope $-\\frac97$.",
      solution: "$\\frac{1 - 3}{4 - h} = -\\frac97$ gives $\\frac{2}{4 - h} = \\frac97$, so $9(4 - h) = 14$ and $h = 4 - \\frac{14}{9} = \\frac{22}{9}$.",
      commonMistakes: [
        { answer: 50 / 9, tolerance: 0.01, feedback: "Sign slip: $\\frac{-2}{4 - h} = -\\frac97$ gives $4 - h = +\\frac{14}{9}$." },
        { answer: 46 / 7, tolerance: 0.01, feedback: "That uses the slope $\\frac79$ itself (parallel), not its negative reciprocal." },
      ],
    },
    {
      type: "numeric",
      id: "slc1-2-q11",
      variant: "practice",
      question: "Find the y-intercept of the perpendicular bisector of the segment joining $A(-1, 2)$ and $B(3, 4)$.",
      answer: 5,
      hint: "The bisector passes through the midpoint of $AB$ and is perpendicular to $AB$.",
      solution: "Midpoint $(1, 3)$; slope $AB = \\frac24 = \\frac12$, so the bisector has slope $-2$. From $(1, 3)$, moving 1 unit left to $x = 0$ raises $y$ by 2: the y-intercept is 5.",
      commonMistakes: [
        { answer: 2.5, feedback: "That uses slope $-\\frac12$. Perpendicular to $\\frac12$ is $-2$." },
        { answer: 1, feedback: "Moving left along a line of slope $-2$ raises $y$: $3 + 2 = 5$." },
      ],
    },
    {
      type: "quiz",
      id: "slc1-2-q12",
      variant: "practice",
      question: "For $a \\ne b$, a line parallel to the line joining $(a, b)$ and $(b, a)$ has slope",
      options: [
        { text: "$-1$", correct: true, feedback: "$\\frac{a - b}{b - a} = -1$ whatever $a$ and $b$ are." },
        { text: "$1$", feedback: "The numerator $a - b$ and denominator $b - a$ are negatives of each other." },
        { text: "$\\frac ab$", feedback: "Slope uses differences of coordinates, not a ratio of them." },
        { text: "undefined", feedback: "The x-coordinates $a$ and $b$ differ, so the run is not zero." },
      ],
      hint: "Compute rise over run between the two points.",
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "point-slope-slope-intercept-and-two-point-forms",
  title: "1.3 · Point-Slope, Slope-Intercept and Two-Point Forms",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "A line is fixed by **a point and a direction**. Give me one point it passes through and its slope, and I can tell you, for any other point, whether it is on the line. Writing that test as an equation in $x$ and $y$ is all that \"the equation of a line\" means.",
    },
    { type: "heading", text: "The point-slope form" },
    {
      type: "text",
      content:
        "Let the line pass through $A(x_1, y_1)$ with slope $m$. A point $P(x, y)$ other than $A$ lies on the line exactly when the slope from $A$ to $P$ is $m$:",
    },
    {
      type: "math",
      latex: "\\frac{y - y_1}{x - x_1} = m \\quad\\Longrightarrow\\quad y - y_1 = m(x - x_1)",
    },
    {
      type: "text",
      content:
        "Clearing the fraction does one more good thing: the point $A$ itself, which made the fraction $\\frac00$, now satisfies the equation too. So $y - y_1 = m(x - x_1)$ is satisfied by **exactly** the points of the line.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Three forms from a point and a slope",
      content:
        "- **Point-slope:** through $(x_1, y_1)$ with slope $m$: $y - y_1 = m(x - x_1)$\n- **Slope-intercept:** slope $m$, meeting the y-axis at $(0, c)$: $y = mx + c$\n- **Two-point:** through $(x_1, y_1)$ and $(x_2, y_2)$ with $x_1 \\ne x_2$: $y - y_1 = \\dfrac{y_2 - y_1}{x_2 - x_1}(x - x_1)$\n\nNone of them can describe a vertical line. The vertical line through $(x_1, y_1)$ is simply $x = x_1$.",
    },
    {
      type: "interactive",
      config: {
        component: "slc-line-explorer",
        mode: "line",
        a: [-2, -3],
        b: [2, 3],
        show: ["forms"],
        caption:
          "Drag $A$ and $B$ and watch the forms update together. They are the same line written three ways: the point-slope form uses $A$, the two-point form uses both points, and the slope-intercept form uses the point where the line crosses the y-axis.",
      },
    },
    { type: "heading", text: "Slope-intercept and two-point forms" },
    {
      type: "text",
      content:
        "Put $(x_1, y_1) = (0, c)$ in the point-slope form: $y - c = m(x - 0)$, i.e. $y = mx + c$. The constant $c$ is the **y-intercept**, the height at which the line crosses the y-axis. If only two points are known, compute $m = \\frac{y_2 - y_1}{x_2 - x_1}$ first and use point-slope: that is the two-point form.",
    },
    {
      type: "text",
      content:
        "The two-point form can also be written as a determinant. $P(x, y)$ is on the line through $(x_1, y_1)$ and $(x_2, y_2)$ exactly when the three points are collinear, which by Chapter 0 means the triangle they form has zero area:",
    },
    {
      type: "math",
      latex: "\\begin{vmatrix} x & y & 1 \\\\ x_1 & y_1 & 1 \\\\ x_2 & y_2 & 1 \\end{vmatrix} = 0",
    },
    { type: "heading", text: "Worked examples" },
    {
      type: "worked-example",
      id: "slc1-3-we1",
      title: "Worked example 1: point and slope",
      problem: "Find the line through $(2, -1)$ with slope $\\frac32$, in the form $ax + by + c = 0$.",
      steps: [
        { text: "Point-slope form:", latex: "y + 1 = \\frac32(x - 2)" },
        { text: "Clear the fraction: $2y + 2 = 3x - 6$, so $3x - 2y - 8 = 0$. *Why this step:* integer coefficients make later substitutions and comparisons much less error-prone." },
      ],
      answer: "$3x - 2y - 8 = 0$.",
    },
    {
      type: "worked-example",
      id: "slc1-3-we2",
      title: "Worked example 2: two points",
      problem: "Find the line through $(-1, 3)$ and $(4, -2)$.",
      steps: [
        { text: "Slope: $\\frac{-2 - 3}{4 + 1} = -1$." },
        { text: "Point-slope from $(-1, 3)$: $y - 3 = -(x + 1)$, i.e. $x + y - 2 = 0$." },
        { text: "Check the other point: $4 + (-2) - 2 = 0$. *Why this step:* the equation was built from one point, so substituting the other catches arithmetic slips." },
      ],
      answer: "$x + y - 2 = 0$.",
    },
    {
      type: "worked-example",
      id: "slc1-3-we3",
      title: "Worked example 3: a median",
      problem: "In the triangle $A(2, 5)$, $B(-4, 3)$, $C(6, -1)$, find the median through $A$.",
      steps: [
        { text: "The median joins $A$ to the midpoint of $BC$, which is $\\left(\\frac{-4 + 6}{2}, \\frac{3 - 1}{2}\\right) = (1, 1)$." },
        { text: "Slope from $(1, 1)$ to $(2, 5)$ is $4$, so the median is $y - 1 = 4(x - 1)$." },
      ],
      answer: "$4x - y - 3 = 0$.",
    },
    {
      type: "worked-example",
      id: "slc1-3-we4",
      title: "Worked example 4: an altitude",
      problem: "In the same triangle, find the altitude through $A$.",
      steps: [
        { text: "Slope $BC = \\frac{-1 - 3}{6 + 4} = -\\frac25$, so the altitude has slope $\\frac52$. *Why this step:* the altitude is perpendicular to the opposite side, so its slope is the negative reciprocal." },
        { text: "Through $A(2, 5)$: $y - 5 = \\frac52(x - 2)$, i.e. $2y - 10 = 5x - 10$." },
      ],
      answer: "$5x - 2y = 0$ (it happens to pass through the origin).",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"in y = mx + c, c is where the line meets the x-axis\"",
      content:
        "$c$ is the value of $y$ when $x = 0$: the **y**-intercept. The x-intercept comes from setting $y = 0$: $x = -\\frac cm$. For $y = 3x - 12$ the y-intercept is $-12$ and the x-intercept is $4$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"every line is y = mx + c\"",
      content:
        "Vertical lines have no slope and no y-intercept (or, for $x = 0$, infinitely many). The line through $(3, 2)$ and $(3, -5)$ is $x = 3$; any attempt to compute $m$ divides by zero. The general form $ax + by + c = 0$ of Lesson 1.7 covers every line.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "slc1-3-q1",
      variant: "practice",
      question: "The line through $(1, -2)$ with slope $-3$ is",
      options: [
        { text: "$y = -3x + 1$", correct: true, feedback: "$y + 2 = -3(x - 1)$ gives $y = -3x + 1$. Check: $-3(1) + 1 = -2$." },
        { text: "$y = -3x - 5$", feedback: "That is $y + 2 = -3(x + 1)$: the point's x-coordinate entered with the wrong sign." },
        { text: "$y = -3x - 2$", feedback: "The y-intercept is not the y-coordinate of the given point: at $x = 1$ this gives $-5$." },
        { text: "$y = 3x - 5$", feedback: "The slope is $-3$, not $3$." },
      ],
      hint: "Write $y - (-2) = -3(x - 1)$ and simplify.",
    },
    {
      type: "numeric",
      id: "slc1-3-q2",
      variant: "practice",
      question: "Find the y-intercept of the line through $(-2, 5)$ and $(3, -5)$.",
      answer: 1,
      hint: "Find the slope, write the point-slope form, then put $x = 0$.",
      solution: "Slope $\\frac{-10}{5} = -2$. $y - 5 = -2(x + 2)$ gives $y = -2x + 1$, so the y-intercept is 1.",
      commonMistakes: [
        { answer: 0.5, feedback: "That is the x-intercept (where $y = 0$)." },
        { answer: 9, feedback: "That uses slope $+2$. The line falls from $(-2, 5)$ to $(3, -5)$." },
      ],
    },
    {
      type: "numeric",
      id: "slc1-3-q3",
      variant: "practice",
      question: "Find the x-intercept of $y = 3x - 12$.",
      answer: 4,
      hint: "Set $y = 0$.",
      solution: "$0 = 3x - 12$ gives $x = 4$.",
      commonMistakes: [
        { answer: -12, feedback: "$-12$ is the y-intercept." },
        { answer: -4, feedback: "Sign slip: $3x = 12$." },
      ],
    },
    {
      type: "quiz",
      id: "slc1-3-q4",
      variant: "practice",
      question: "The line with slope $\\frac23$ and y-intercept $-4$ is",
      options: [
        { text: "$2x - 3y - 12 = 0$", correct: true, feedback: "$y = \\frac23x - 4$; multiply by 3: $3y = 2x - 12$." },
        { text: "$2x - 3y + 12 = 0$", feedback: "This one meets the y-axis at $y = 4$." },
        { text: "$3x - 2y - 8 = 0$", feedback: "This has slope $\\frac32$." },
        { text: "$2x + 3y - 12 = 0$", feedback: "This has slope $-\\frac23$." },
      ],
      hint: "Start from $y = \\frac23 x - 4$ and clear the fraction.",
    },
    {
      type: "numeric",
      id: "slc1-3-q5",
      variant: "practice",
      question: "In the triangle $A(1, 4)$, $B(3, -2)$, $C(-3, 0)$, the median through $A$ meets the x-axis at $(p, 0)$. Find $p$.",
      answer: 0.2,
      tolerance: 0.001,
      hint: "The median goes from $A$ to the midpoint of $BC$.",
      solution: "Midpoint of $BC$ is $(0, -1)$. Slope to $A$: $\\frac{4 + 1}{1 - 0} = 5$, so the median is $y = 5x - 1$. At $y = 0$, $x = \\frac15$.",
      commonMistakes: [
        { answer: -1, feedback: "$-1$ is the y-intercept of the median. Set $y = 0$ instead." },
        { answer: 5, feedback: "5 is the slope of the median." },
      ],
    },
    {
      type: "quiz",
      id: "slc1-3-q6",
      variant: "practice",
      multiple: true,
      question: "Which of these lines pass through $(2, 3)$? Select all that apply.",
      options: [
        { text: "$y = 2x - 1$", correct: true, feedback: "$2(2) - 1 = 3$." },
        { text: "$y - 3 = 7(x - 2)$", correct: true, feedback: "Point-slope form through $(2, 3)$, whatever the slope." },
        { text: "$\\frac x4 + \\frac y6 = 1$", correct: true, feedback: "$\\frac24 + \\frac36 = 1$." },
        { text: "$3x + 2y = 10$", feedback: "$6 + 6 = 12 \\ne 10$." },
        { text: "$y = 3$", correct: true, feedback: "The horizontal line at height 3 contains every point with $y = 3$." },
        { text: "$x = 3$", feedback: "Points on it have $x = 3$, but our point has $x = 2$." },
      ],
      hint: "Substitute $x = 2$, $y = 3$ into each equation.",
    },
    {
      type: "numeric",
      id: "slc1-3-q7",
      variant: "practice",
      question: "The point $(k, 7)$ lies on the line through $(1, 1)$ and $(3, 4)$. Find $k$.",
      answer: 5,
      hint: "The slope is $\\frac32$. Use point-slope from $(1, 1)$ and put $y = 7$.",
      solution: "$7 - 1 = \\frac32(k - 1)$ gives $k - 1 = 4$, so $k = 5$.",
      commonMistakes: [
        { answer: 10, feedback: "That uses slope $\\frac23$, run over rise." },
        { answer: 4, feedback: "4 is $k - 1$. Add 1." },
      ],
    },
    {
      type: "quiz",
      id: "slc1-3-q8",
      variant: "practice",
      question: "The equation $\\begin{vmatrix} x & y & 1 \\\\ 2 & 3 & 1 \\\\ 4 & -1 & 1 \\end{vmatrix} = 0$ represents",
      options: [
        { text: "the line $2x + y - 7 = 0$", correct: true, feedback: "Expanding: $4x + 2y - 14 = 0$. It is the line through $(2, 3)$ and $(4, -1)$." },
        { text: "the line $2x - y - 1 = 0$", feedback: "It contains $(2, 3)$ but at $(4, -1)$ it gives $8 \\ne 0$." },
        { text: "the line $x + 2y - 8 = 0$", feedback: "It contains $(2, 3)$ but not $(4, -1)$." },
        { text: "a circle", feedback: "The determinant is linear in $x$ and $y$: expanding along the first row gives no squares." },
      ],
      hint: "Expand along the first row, or just ask which line passes through both $(2, 3)$ and $(4, -1)$.",
    },
    {
      type: "numeric",
      id: "slc1-3-q9",
      variant: "practice",
      question: "In the triangle $A(0, 0)$, $B(4, 2)$, $C(1, 5)$, find the y-intercept of the altitude through $C$.",
      answer: 7,
      hint: "The altitude through $C$ is perpendicular to $AB$.",
      solution: "Slope $AB = \\frac12$, so the altitude has slope $-2$: $y - 5 = -2(x - 1)$, i.e. $y = -2x + 7$.",
      commonMistakes: [
        { answer: 4.5, feedback: "That line has slope $\\frac12$: it is parallel to $AB$, not perpendicular." },
        { answer: 5, feedback: "5 is the y-coordinate of $C$, but $C$ is not on the y-axis." },
      ],
    },
    {
      type: "quiz",
      id: "slc1-3-q10",
      variant: "practice",
      multiple: true,
      question: "The line $y = mx + c$ passes through $(2, 5)$ and $(-1, -1)$. Which statements are true? Select all that apply.",
      options: [
        { text: "$m = 2$", correct: true, feedback: "$\\frac{5 - (-1)}{2 - (-1)} = \\frac63 = 2$." },
        { text: "$c = 1$", correct: true, feedback: "$5 = 2(2) + c$ gives $c = 1$." },
        { text: "the x-intercept is $-\\frac12$", correct: true, feedback: "$0 = 2x + 1$ gives $x = -\\frac12$." },
        { text: "the line passes through $(3, 6)$", feedback: "$2(3) + 1 = 7$, not 6." },
        { text: "$m = \\frac12$", feedback: "That is run over rise." },
      ],
      hint: "Find $m$ from the two points, then $c$ by substituting either point.",
    },
    {
      type: "numeric",
      id: "slc1-3-q11",
      variant: "practice",
      question: "JEE Main. A line passes through $(3, 4)$ and through the midpoint of the segment joining $(-2, 6)$ and $(6, -4)$. Find the area of the triangle it forms with the coordinate axes (a fraction is fine).",
      answer: 25 / 6,
      tolerance: 0.01,
      hint: "The midpoint is $(2, 1)$. Find the line, then its two intercepts.",
      solution: "Slope from $(2, 1)$ to $(3, 4)$ is 3, so the line is $y = 3x - 5$. Intercepts: $x = \\frac53$, $y = -5$. Area $= \\frac12 \\cdot \\frac53 \\cdot 5 = \\frac{25}{6}$.",
      commonMistakes: [
        { answer: 25 / 3, tolerance: 0.01, feedback: "The area of a right triangle is **half** the product of its legs." },
        { answer: 7.5, tolerance: 0.01, feedback: "Recheck the x-intercept: $3x - 5 = 0$ gives $x = \\frac53$, not 3." },
      ],
    },
    {
      type: "quiz",
      id: "slc1-3-q12",
      variant: "concept",
      question: "The line $y = mx + c$ passes through the first, second and fourth quadrants but not the third. Then",
      options: [
        { text: "$m < 0$ and $c > 0$", correct: true, feedback: "It crosses the y-axis above the origin and falls to the right, cutting the positive x-axis: it misses the third quadrant." },
        { text: "$m > 0$ and $c > 0$", feedback: "A rising line through $(0, c)$ with $c > 0$ goes down-left into the third quadrant." },
        { text: "$m < 0$ and $c < 0$", feedback: "That line misses the first quadrant instead." },
        { text: "$m > 0$ and $c < 0$", feedback: "That line misses the second quadrant." },
      ],
      hint: "Sketch the four sign combinations. Where does each line cross the axes?",
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "the-intercept-form",
  title: "1.4 · The Intercept Form",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "A ladder leaning against a wall touches the floor at one point and the wall at another. Those two contact points fix the ladder's line completely. In coordinates, the floor and the wall are the axes, and a line that meets them at $(a, 0)$ and $(0, b)$ has an equation you can write down at a glance.",
    },
    { type: "heading", text: "Deriving the intercept form" },
    {
      type: "text",
      content:
        "Use the two-point form with $(a, 0)$ and $(0, b)$, where $a, b \\ne 0$. The slope is $\\frac{b - 0}{0 - a} = -\\frac ba$, so",
    },
    {
      type: "math",
      latex: "y = -\\frac ba(x - a) \\iff bx + ay = ab \\iff \\frac xa + \\frac yb = 1",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Intercept form",
      content:
        "The line with x-intercept $a$ and y-intercept $b$ (both nonzero) is\n\n$$\\frac xa + \\frac yb = 1$$\n\nThe intercepts are **signed** numbers: $a = -4$ means the line crosses the x-axis at $(-4, 0)$. To read the intercepts of any line, rewrite it with 1 on the right-hand side.",
    },
    {
      type: "interactive",
      config: {
        component: "slc-line-explorer",
        mode: "line",
        a: [4, 0],
        b: [0, 3],
        show: ["intercepts"],
        caption:
          "$A$ sits on the x-axis at 4 and $B$ on the y-axis at 3, so the line is $\\frac x4 + \\frac y3 = 1$. Drag the points: when the line passes through the origin, or runs parallel to an axis, one intercept disappears and the intercept form no longer exists.",
      },
    },
    { type: "heading", text: "The triangle cut off by the axes" },
    {
      type: "text",
      content:
        "The line $\\frac xa + \\frac yb = 1$ and the two axes enclose a right triangle with legs $\\lvert a\\rvert$ and $\\lvert b\\rvert$, so its area is $\\frac12\\lvert ab\\rvert$. The segment of the line between the axes has midpoint $\\left(\\frac a2, \\frac b2\\right)$; so if a point $(h, k)$ is the midpoint of the intercepted segment then $a = 2h$, $b = 2k$, and the line is $\\frac{x}{2h} + \\frac{y}{2k} = 1$, i.e. $\\frac xh + \\frac yk = 2$.",
    },
    {
      type: "worked-example",
      id: "slc1-4-we1",
      title: "Worked example 1: reading the intercepts",
      problem: "Find the intercepts of $3x - 4y + 12 = 0$ and the area of the triangle it makes with the axes.",
      steps: [
        { text: "Move the constant over and divide by it: $3x - 4y = -12$, so $\\frac{x}{-4} + \\frac{y}{3} = 1$. *Why this step:* the intercept form needs exactly 1 on the right." },
        { text: "Intercepts: $a = -4$, $b = 3$. Area $= \\frac12\\lvert(-4)(3)\\rvert = 6$." },
      ],
      answer: "x-intercept $-4$, y-intercept $3$, area $6$.",
    },
    {
      type: "worked-example",
      id: "slc1-4-we2",
      title: "Worked example 2: equal intercepts",
      problem: "Find the lines through $(2, 3)$ that make equal intercepts on the axes.",
      steps: [
        { text: "Equal nonzero intercepts $a = b$: $\\frac xa + \\frac ya = 1$, i.e. $x + y = a$. Through $(2, 3)$: $a = 5$." },
        { text: "Both intercepts zero also counts as equal: the line through the origin and $(2, 3)$, which is $3x - 2y = 0$. *Why this step:* the intercept form silently assumes $a, b \\ne 0$, so the case it cannot describe must be checked separately." },
      ],
      answer: "$x + y = 5$, and also $3x - 2y = 0$ if zero intercepts are allowed.",
    },
    {
      type: "worked-example",
      id: "slc1-4-we3",
      title: "Worked example 3: a given midpoint",
      problem: "Find the line whose segment between the axes is bisected at $(3, 4)$.",
      steps: [
        { text: "The midpoint of the segment from $(a, 0)$ to $(0, b)$ is $\\left(\\frac a2, \\frac b2\\right) = (3, 4)$, so $a = 6$, $b = 8$." },
        { text: "The line is $\\frac x6 + \\frac y8 = 1$; multiply by 24." },
      ],
      answer: "$4x + 3y = 24$.",
    },
    {
      type: "worked-example",
      id: "slc1-4-we4",
      title: "Worked example 4: sum of intercepts",
      problem: "Find the lines through $(1, 4)$ whose intercepts add up to 10.",
      steps: [
        { text: "Let the intercepts be $a$ and $10 - a$. Then $\\frac1a + \\frac{4}{10 - a} = 1$." },
        { text: "Multiply by $a(10 - a)$: $10 - a + 4a = 10a - a^2$, i.e. $a^2 - 7a + 10 = 0$, so $a = 2$ or $a = 5$." },
        { text: "Check each through $(1, 4)$: $\\frac12 + \\frac48 = 1$ and $\\frac15 + \\frac45 = 1$." },
      ],
      answer: "$\\frac x2 + \\frac y8 = 1$ (i.e. $4x + y = 8$) and $x + y = 5$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"intercepts are lengths, so they are positive\"",
      content:
        "An intercept is a coordinate, so it carries a sign. For $\\frac{x}{-4} + \\frac y3 = 1$ the x-intercept is $-4$. Only when you compute a **length** or an **area** do you take absolute values: the area is $\\frac12\\lvert ab\\rvert$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"every line has an intercept form\"",
      content:
        "Lines through the origin (both intercepts 0) and lines parallel to an axis (one intercept missing) cannot be written as $\\frac xa + \\frac yb = 1$. When a problem says \"equal intercepts\", decide whether the line through the origin should be counted.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "slc1-4-q1",
      variant: "practice",
      question: "Find the x-intercept of $5x - 2y + 20 = 0$.",
      answer: -4,
      hint: "Put $y = 0$, or rewrite with 1 on the right-hand side.",
      solution: "$5x - 2y = -20$, so $\\frac{x}{-4} + \\frac{y}{10} = 1$: the x-intercept is $-4$.",
      commonMistakes: [
        { answer: 4, feedback: "Sign slip: $5x = -20$." },
        { answer: 10, feedback: "10 is the y-intercept." },
      ],
    },
    {
      type: "numeric",
      id: "slc1-4-q2",
      variant: "practice",
      question: "Find the area of the triangle formed by $3x + 4y - 24 = 0$ and the coordinate axes.",
      answer: 24,
      hint: "Intercepts first: put $y = 0$, then $x = 0$.",
      solution: "Intercepts $8$ and $6$, so the area is $\\frac12 \\cdot 8 \\cdot 6 = 24$.",
      commonMistakes: [
        { answer: 48, feedback: "The triangle is half of the $8 \\times 6$ rectangle." },
        { answer: 10, feedback: "10 is the length of the hypotenuse, $\\sqrt{64 + 36}$." },
      ],
    },
    {
      type: "quiz",
      id: "slc1-4-q3",
      variant: "practice",
      question: "The line with x-intercept $-3$ and y-intercept $5$ is",
      options: [
        { text: "$5x - 3y + 15 = 0$", correct: true, feedback: "$\\frac{x}{-3} + \\frac y5 = 1$; multiply by $-15$: $5x - 3y = -15$." },
        { text: "$5x + 3y = 15$", feedback: "This crosses the x-axis at $+3$." },
        { text: "$3x - 5y + 15 = 0$", feedback: "This has intercepts $-5$ and $3$: the roles are swapped." },
        { text: "$5x - 3y - 15 = 0$", feedback: "This has intercepts $3$ and $-5$." },
      ],
      hint: "Write $\\frac{x}{-3} + \\frac y5 = 1$ and clear denominators. Then test $(-3, 0)$ and $(0, 5)$.",
    },
    {
      type: "numeric",
      id: "slc1-4-q4",
      variant: "practice",
      question: "The segment of a line between the axes is bisected at $(-2, 6)$. Find the y-intercept of the line.",
      answer: 12,
      hint: "The midpoint of the segment from $(a, 0)$ to $(0, b)$ is $\\left(\\frac a2, \\frac b2\\right)$.",
      solution: "$\\frac b2 = 6$, so $b = 12$ (and $a = -4$): the line is $\\frac{x}{-4} + \\frac{y}{12} = 1$.",
      commonMistakes: [
        { answer: 6, feedback: "6 is half the intercept: the given point is the midpoint." },
        { answer: -4, feedback: "$-4$ is the x-intercept." },
      ],
    },
    {
      type: "quiz",
      id: "slc1-4-q5",
      variant: "practice",
      multiple: true,
      question: "Which lines pass through $(3, 2)$ and make equal intercepts on the axes, counting the case where both intercepts are 0? Select all that apply.",
      options: [
        { text: "$x + y = 5$", correct: true, feedback: "Intercepts 5 and 5, and $3 + 2 = 5$." },
        { text: "$2x - 3y = 0$", correct: true, feedback: "It passes through the origin and $(3, 2)$: both intercepts are 0." },
        { text: "$x - y = 1$", feedback: "Intercepts $1$ and $-1$: equal in size, opposite in sign." },
        { text: "$x + y = 3$", feedback: "Equal intercepts, but $3 + 2 \\ne 3$." },
      ],
      hint: "Nonzero equal intercepts mean $x + y = a$. Then consider the line through the origin.",
    },
    {
      type: "numeric",
      id: "slc1-4-q6",
      variant: "practice",
      question: "A line through $(4, 3)$ has its x-intercept equal to twice its y-intercept. Find the x-intercept.",
      answer: 10,
      hint: "Write the line as $\\frac{x}{2b} + \\frac yb = 1$ and substitute.",
      solution: "$\\frac{4}{2b} + \\frac3b = 1$ gives $\\frac5b = 1$, so $b = 5$ and the x-intercept is $2b = 10$.",
      commonMistakes: [
        { answer: 5, feedback: "5 is the y-intercept; the x-intercept is twice it." },
        { answer: 5.5, feedback: "That makes the y-intercept twice the x-intercept: the roles are reversed." },
      ],
    },
    {
      type: "quiz",
      id: "slc1-4-q7",
      variant: "practice",
      question: "JEE Advanced. A line through $(2, 3)$ with positive intercepts $a$ and $b$ cuts off the triangle of **least** area from the first quadrant. Then $(a, b)$ is",
      options: [
        { text: "$(4, 6)$", correct: true, feedback: "From $\\frac2a + \\frac3b = 1$ and AM-GM, $1 \\ge 2\\sqrt{\\frac{6}{ab}}$, so $ab \\ge 24$, with equality when $\\frac2a = \\frac3b = \\frac12$: the point is the midpoint of the segment. Least area 12." },
        { text: "$(6, 4)$", feedback: "$\\frac26 + \\frac34 \\ne 1$: this line does not pass through $(2, 3)$." },
        { text: "$(5, 5)$", feedback: "$\\frac25 + \\frac35 = 1$, so it passes through $(2, 3)$, but its area is 12.5, more than the area 12 at $(4, 6)$." },
        { text: "$(2, 3)$", feedback: "Those are the coordinates of the point, not intercepts of a line through it." },
      ],
      hint: "Use $\\frac2a + \\frac3b = 1$ and AM-GM on the two fractions.",
    },
    {
      type: "numeric",
      id: "slc1-4-q8",
      variant: "practice",
      question: "The line $2x - 3y = 12$ meets the axes at $A$ and $B$. Find the length $AB$ to two decimal places.",
      answer: Math.sqrt(52),
      tolerance: 0.01,
      hint: "$A = (6, 0)$ and $B = (0, -4)$. Use the distance formula.",
      solution: "$AB = \\sqrt{36 + 16} = \\sqrt{52} = 2\\sqrt{13} \\approx 7.21$.",
      commonMistakes: [
        { answer: 10, feedback: "That adds the legs, $6 + 4$. The segment $AB$ is the hypotenuse of the right triangle: use Pythagoras." },
        { answer: 2, feedback: "That is $6 - 4$. The hypotenuse is $\\sqrt{6^2 + 4^2}$." },
      ],
    },
    {
      type: "quiz",
      id: "slc1-4-q9",
      variant: "practice",
      multiple: true,
      question: "JEE Main. A line meets the x-axis at $A$ and the y-axis at $B$, and $P(3, -2)$ divides $AB$ internally in the ratio $AP : PB = 2 : 1$. Which statements are true? Select all that apply.",
      options: [
        { text: "the line is $x - 3y = 9$", correct: true, feedback: "$\\frac x9 + \\frac{y}{-3} = 1$, multiplied by 9." },
        { text: "the x-intercept is 9", correct: true, feedback: "From $P = \\left(\\frac{a}{3}, \\frac{2b}{3}\\right)$: $\\frac a3 = 3$." },
        { text: "the y-intercept is $-3$", correct: true, feedback: "$\\frac{2b}{3} = -2$." },
        { text: "the line is $3x - y = 9$", feedback: "It does not even pass through $P$: $9 + 2 = 11 \\ne 9$." },
        { text: "the line passes through the origin", feedback: "Its intercepts are 9 and $-3$." },
      ],
      hint: "With $A(a, 0)$ and $B(0, b)$, the section formula gives $P = \\left(\\frac{1 \\cdot a + 2 \\cdot 0}{3}, \\frac{1 \\cdot 0 + 2b}{3}\\right)$.",
    },
    {
      type: "numeric",
      id: "slc1-4-q10",
      variant: "practice",
      question: "A line through $(2, 2)$ cuts off a triangle of area 9 from the first quadrant. Find the sum of its intercepts.",
      answer: 9,
      hint: "With positive intercepts $a$, $b$: $\\frac2a + \\frac2b = 1$ and $\\frac12 ab = 9$.",
      solution: "$ab = 18$ and $2(a + b) = ab$ (clear denominators in $\\frac2a + \\frac2b = 1$), so $a + b = 9$. (The intercepts are 3 and 6.)",
      commonMistakes: [
        { answer: 18, feedback: "18 is the product $ab$. The condition $\\frac2a + \\frac2b = 1$ gives $2(a + b) = ab$." },
        { answer: 4.5, feedback: "Clear denominators carefully: $2b + 2a = ab$." },
      ],
    },
    {
      type: "quiz",
      id: "slc1-4-q11",
      variant: "concept",
      multiple: true,
      question: "Which lines **cannot** be written in the form $\\frac xa + \\frac yb = 1$? Select all that apply.",
      options: [
        { text: "$y = 2x$", correct: true, feedback: "It passes through the origin: both intercepts are 0." },
        { text: "$y = 4$", correct: true, feedback: "It is parallel to the x-axis and has no x-intercept." },
        { text: "$x = -1$", correct: true, feedback: "It is parallel to the y-axis and has no y-intercept." },
        { text: "$x + y = 1$", feedback: "Intercepts 1 and 1: it is already in intercept form." },
        { text: "$2x - y = 4$", feedback: "$\\frac x2 + \\frac{y}{-4} = 1$." },
      ],
      hint: "The form needs two nonzero intercepts.",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "the-normal-form",
  title: "1.5 · The Normal Form",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "So far a line has been fixed by a point and a slope. Here is another way. Stand at the origin and drop a perpendicular onto the line. That perpendicular has a **length** $p$ and a **direction**, the angle $\\alpha$ it makes with the positive x-axis. Those two numbers fix the line too: it is the line through the foot of the perpendicular, at right angles to it.",
    },
    {
      type: "text",
      content:
        "The equation built from $p$ and $\\alpha$ is called the normal form (\"normal\" means perpendicular). It is the form that measures distances, which is why Chapter 2 grows out of it.",
    },
    { type: "heading", text: "Deriving x cos α + y sin α = p" },
    {
      type: "text",
      content:
        "The foot of the perpendicular is $N = (p\\cos\\alpha, p\\sin\\alpha)$, and $ON$ has slope $\\tan\\alpha$. The line is perpendicular to $ON$, so (for $\\sin\\alpha \\ne 0$) its slope is $-\\frac{\\cos\\alpha}{\\sin\\alpha}$, and it passes through $N$:",
    },
    {
      type: "math",
      latex:
        "y - p\\sin\\alpha = -\\frac{\\cos\\alpha}{\\sin\\alpha}(x - p\\cos\\alpha) \\implies x\\cos\\alpha + y\\sin\\alpha = p(\\cos^2\\alpha + \\sin^2\\alpha) = p",
    },
    {
      type: "text",
      content:
        "A cleaner way to see it: $(\\cos\\alpha, \\sin\\alpha)$ is the unit vector along $ON$, and $x\\cos\\alpha + y\\sin\\alpha$ is the length of the shadow of $OP$ on that direction. A point $P$ is on the line exactly when its shadow on $ON$ has length $p$, the same as the shadow of $N$. This version also covers $\\sin\\alpha = 0$ (vertical lines).",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Normal form",
      content:
        "$$x\\cos\\alpha + y\\sin\\alpha = p$$\n\n- $p \\ge 0$ is the perpendicular distance from the origin to the line\n- $\\alpha \\in [0^\\circ, 360^\\circ)$ is the angle from the positive x-axis to the perpendicular $ON$\n- the foot of the perpendicular is $(p\\cos\\alpha, p\\sin\\alpha)$",
    },
    {
      type: "interactive",
      config: {
        component: "slc-line-explorer",
        mode: "line",
        a: [4, 0],
        b: [0, 3],
        show: ["forms"],
        caption:
          "Read the normal-form line of the readout: for $\\frac x4 + \\frac y3 = 1$ it is $\\frac35 x + \\frac45 y = \\frac{12}{5}$, so the origin is $\\frac{12}{5}$ away. Drag the line across the origin and watch $p$ shrink to 0 and the angle $\\alpha$ jump by $180^\\circ$.",
      },
    },
    { type: "heading", text: "Converting ax + by + c = 0 to normal form" },
    {
      type: "text",
      content:
        "Compare $ax + by = -c$ with $x\\cos\\alpha + y\\sin\\alpha = p$. Since $\\cos^2\\alpha + \\sin^2\\alpha = 1$, divide by $\\sqrt{a^2 + b^2}$, choosing the **sign** that makes the right-hand side non-negative:",
    },
    {
      type: "math",
      latex: "\\frac{a}{\\pm\\sqrt{a^2 + b^2}}\\,x + \\frac{b}{\\pm\\sqrt{a^2 + b^2}}\\,y = \\frac{-c}{\\pm\\sqrt{a^2 + b^2}}, \\qquad p = \\frac{\\lvert c\\rvert}{\\sqrt{a^2 + b^2}}",
    },
    {
      type: "text",
      content:
        "So the distance from the origin to $ax + by + c = 0$ is $\\frac{\\lvert c\\rvert}{\\sqrt{a^2 + b^2}}$. When $c = 0$ the line passes through the origin, $p = 0$, and either sign works.",
    },
    {
      type: "worked-example",
      id: "slc1-5-we1",
      title: "Worked example 1: a positive constant",
      problem: "Reduce $\\sqrt3 x + y - 4 = 0$ to normal form.",
      steps: [
        { text: "Move the constant: $\\sqrt3 x + y = 4$. The right side is already positive." },
        { text: "Divide by $\\sqrt{3 + 1} = 2$:", latex: "\\frac{\\sqrt3}{2}x + \\frac12 y = 2" },
        { text: "So $\\cos\\alpha = \\frac{\\sqrt3}{2}$, $\\sin\\alpha = \\frac12$: $\\alpha = 30^\\circ$, $p = 2$." },
      ],
      answer: "$x\\cos 30^\\circ + y\\sin 30^\\circ = 2$.",
    },
    {
      type: "worked-example",
      id: "slc1-5-we2",
      title: "Worked example 2: a negative constant",
      problem: "Reduce $x - y + 4 = 0$ to normal form.",
      steps: [
        { text: "$x - y = -4$: the right side is negative, so divide by $-\\sqrt2$. *Why this step:* $p$ is a distance and must not be negative; the sign of the divisor is chosen to fix that." },
        { text: "Result:", latex: "-\\frac{1}{\\sqrt2}x + \\frac{1}{\\sqrt2}y = \\frac{4}{\\sqrt2} = 2\\sqrt2" },
        { text: "$\\cos\\alpha = -\\frac{1}{\\sqrt2}$, $\\sin\\alpha = \\frac{1}{\\sqrt2}$: $\\alpha = 135^\\circ$ (second quadrant), $p = 2\\sqrt2$." },
      ],
      answer: "$x\\cos 135^\\circ + y\\sin 135^\\circ = 2\\sqrt2$.",
    },
    {
      type: "worked-example",
      id: "slc1-5-we3",
      title: "Worked example 3: from p and α to the equation",
      problem: "Find the line whose perpendicular from the origin has length 5 and makes $120^\\circ$ with the positive x-axis.",
      steps: [
        { text: "Substitute: $x\\cos 120^\\circ + y\\sin 120^\\circ = 5$, i.e. $-\\frac12 x + \\frac{\\sqrt3}{2}y = 5$." },
        { text: "Multiply by $-2$: $x - \\sqrt3 y = -10$." },
      ],
      answer: "$x - \\sqrt3 y + 10 = 0$.",
    },
    {
      type: "worked-example",
      id: "slc1-5-we4",
      title: "Worked example 4: the foot of the perpendicular is given",
      problem: "The perpendicular from the origin to a line meets it at $(-2, 9)$. Find the line.",
      steps: [
        { text: "The foot is $N(h, k)$ with $h = p\\cos\\alpha$, $k = p\\sin\\alpha$. Multiply the normal form by $p$: $hx + ky = p^2 = h^2 + k^2$. *Why this step:* this gives the line straight from the foot, with no angles at all." },
        { text: "With $(h, k) = (-2, 9)$: $-2x + 9y = 4 + 81$." },
      ],
      answer: "$2x - 9y + 85 = 0$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"divide by +√(a² + b²) and you are done\"",
      content:
        "For $3x + 4y + 10 = 0$, dividing by $+5$ gives $\\frac35x + \\frac45y = -2$, which is not a normal form, because $p$ cannot be $-2$. Move the constant to the right **first**, then divide by $-5$: $-\\frac35x - \\frac45y = 2$, with $\\alpha$ in the third quadrant.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"α is the inclination of the line\"",
      content:
        "$\\alpha$ is the direction of the **perpendicular** from the origin. The line itself is at right angles to it, so its inclination is $\\alpha \\pm 90^\\circ$ (brought into $[0^\\circ, 180^\\circ)$). For $x\\cos 30^\\circ + y\\sin 30^\\circ = 2$ the line has inclination $120^\\circ$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "slc1-5-q1",
      variant: "practice",
      question: "Find the perpendicular distance from the origin to $3x - 4y + 15 = 0$.",
      answer: 3,
      hint: "$p = \\frac{\\lvert c\\rvert}{\\sqrt{a^2 + b^2}}$.",
      solution: "$p = \\frac{15}{\\sqrt{9 + 16}} = \\frac{15}{5} = 3$.",
      commonMistakes: [
        { answer: 15, feedback: "Divide by $\\sqrt{a^2 + b^2} = 5$." },
        { answer: -3, feedback: "A distance is never negative: take $\\lvert c\\rvert$." },
        { answer: 15 / 7, tolerance: 0.01, feedback: "The divisor is $\\sqrt{a^2 + b^2}$, not $\\lvert a\\rvert + \\lvert b\\rvert$." },
      ],
    },
    {
      type: "quiz",
      id: "slc1-5-q2",
      variant: "practice",
      question: "The normal form of $x + \\sqrt3 y - 6 = 0$ is",
      options: [
        { text: "$x\\cos 60^\\circ + y\\sin 60^\\circ = 3$", correct: true, feedback: "Divide $x + \\sqrt3 y = 6$ by 2: $\\frac12 x + \\frac{\\sqrt3}{2}y = 3$." },
        { text: "$x\\cos 30^\\circ + y\\sin 30^\\circ = 3$", feedback: "That has $\\cos\\alpha = \\frac{\\sqrt3}{2}$ multiplying $x$, but the coefficient of $x$ here is the smaller one, $\\frac12$." },
        { text: "$x\\cos 60^\\circ + y\\sin 60^\\circ = 6$", feedback: "Divide the constant by $\\sqrt{1 + 3} = 2$ as well." },
        { text: "$x\\cos 240^\\circ + y\\sin 240^\\circ = -3$", feedback: "$p$ must be non-negative. This is the same line, but not in normal form." },
      ],
      hint: "Move 6 to the right, then divide everything by $\\sqrt{1^2 + (\\sqrt3)^2}$.",
    },
    {
      type: "numeric",
      id: "slc1-5-q3",
      variant: "practice",
      question: "For the line $x - y + 4 = 0$ written as $x\\cos\\alpha + y\\sin\\alpha = p$, find $\\alpha$ in degrees.",
      answer: 135,
      unit: "degrees",
      hint: "Make the right-hand side positive before dividing by $\\sqrt2$.",
      solution: "$x - y = -4$; divide by $-\\sqrt2$: $\\cos\\alpha = -\\frac{1}{\\sqrt2}$, $\\sin\\alpha = \\frac{1}{\\sqrt2}$, so $\\alpha = 135^\\circ$.",
      commonMistakes: [
        { answer: 45, feedback: "That is the line's inclination (slope 1), not the direction of the perpendicular from the origin." },
        { answer: 315, feedback: "That comes from dividing by $+\\sqrt2$, which leaves $p = -2\\sqrt2 < 0$." },
      ],
    },
    {
      type: "numeric",
      id: "slc1-5-q4",
      variant: "practice",
      question: "For the line $x + y + 2 = 0$ written in normal form, find $\\alpha$ in degrees.",
      answer: 225,
      unit: "degrees",
      hint: "$x + y = -2$. Which sign of $\\sqrt2$ makes the right side positive?",
      solution: "Divide by $-\\sqrt2$: $-\\frac{1}{\\sqrt2}x - \\frac{1}{\\sqrt2}y = \\sqrt2$. Both cosine and sine are negative: $\\alpha = 225^\\circ$, $p = \\sqrt2$. Geometrically, the line lies below and to the left of the origin.",
      commonMistakes: [
        { answer: 45, feedback: "Dividing by $+\\sqrt2$ gives a negative $p$. Flip the sign." },
        { answer: 135, feedback: "Both coefficients of the normal form are negative, so $\\alpha$ is in the third quadrant." },
      ],
    },
    {
      type: "quiz",
      id: "slc1-5-q5",
      variant: "practice",
      question: "The line whose perpendicular from the origin has length 4 and makes $150^\\circ$ with the positive x-axis is",
      options: [
        { text: "$\\sqrt3 x - y + 8 = 0$", correct: true, feedback: "$-\\frac{\\sqrt3}{2}x + \\frac12 y = 4$; multiply by $-2$." },
        { text: "$\\sqrt3 x + y - 8 = 0$", feedback: "That is $\\alpha = 30^\\circ$." },
        { text: "$x - \\sqrt3 y + 8 = 0$", feedback: "That is $\\alpha = 120^\\circ$." },
        { text: "$\\sqrt3 x - y - 8 = 0$", feedback: "That is $\\alpha = 330^\\circ$: the perpendicular points the opposite way." },
      ],
      hint: "$\\cos 150^\\circ = -\\frac{\\sqrt3}{2}$ and $\\sin 150^\\circ = \\frac12$.",
    },
    {
      type: "numeric",
      id: "slc1-5-q6",
      variant: "practice",
      question: "The perpendicular from the origin to a line meets it at $(3, -4)$. Find the y-intercept of the line.",
      answer: -6.25,
      hint: "A foot $(h, k)$ gives the line $hx + ky = h^2 + k^2$.",
      solution: "The line is $3x - 4y = 25$. At $x = 0$: $y = -\\frac{25}{4} = -6.25$.",
      commonMistakes: [
        { answer: 25 / 3, tolerance: 0.01, feedback: "That is the x-intercept." },
        { answer: -4, feedback: "The foot of the perpendicular is not on the y-axis." },
      ],
    },
    {
      type: "quiz",
      id: "slc1-5-q7",
      variant: "practice",
      multiple: true,
      question: "Reduce $5x - 12y + 26 = 0$ to normal form. Which statements are true? Select all that apply.",
      options: [
        { text: "$p = 2$", correct: true, feedback: "$\\frac{26}{\\sqrt{25 + 144}} = \\frac{26}{13} = 2$." },
        { text: "$\\cos\\alpha = -\\frac{5}{13}$", correct: true, feedback: "$5x - 12y = -26$; divide by $-13$." },
        { text: "$\\alpha$ lies between $90^\\circ$ and $180^\\circ$", correct: true, feedback: "$\\cos\\alpha = -\\frac{5}{13} < 0$ and $\\sin\\alpha = \\frac{12}{13} > 0$." },
        { text: "$p = -2$", feedback: "$p$ is a distance, never negative." },
        { text: "the line has slope $\\frac{12}{5}$", feedback: "The slope is $-\\frac ab = \\frac{5}{12}$." },
      ],
      hint: "Move 26 to the right, then divide by $-13$ so the right side is positive.",
    },
    {
      type: "numeric",
      id: "slc1-5-q8",
      variant: "practice",
      question:
        "JEE Main. A line is at distance $p$ from the origin, the perpendicular from the origin to it makes $30^\\circ$ with the positive x-axis, and the line cuts off a triangle of area $\\frac{8}{\\sqrt3}$ from the axes. Find $p$.",
      answer: 2,
      hint: "From $x\\cos\\alpha + y\\sin\\alpha = p$ the intercepts are $\\frac{p}{\\cos\\alpha}$ and $\\frac{p}{\\sin\\alpha}$.",
      solution: "Area $= \\frac12 \\cdot \\frac{p}{\\cos 30^\\circ} \\cdot \\frac{p}{\\sin 30^\\circ} = \\frac{p^2}{2 \\cdot \\frac{\\sqrt3}{2} \\cdot \\frac12} = \\frac{2p^2}{\\sqrt3}$. Setting this to $\\frac{8}{\\sqrt3}$ gives $p^2 = 4$, so $p = 2$.",
      commonMistakes: [
        { answer: 4, feedback: "4 is $p^2$. Take the square root." },
        { answer: 1, feedback: "Recheck the area: $\\frac12 \\cdot \\frac{p}{\\cos 30^\\circ} \\cdot \\frac{p}{\\sin 30^\\circ} = \\frac{2p^2}{\\sqrt3}$." },
      ],
    },
    {
      type: "quiz",
      id: "slc1-5-q9",
      variant: "concept",
      question: "For the line $x\\cos\\alpha + y\\sin\\alpha = p$ with $0^\\circ < \\alpha < 90^\\circ$, the inclination of the line is",
      options: [
        { text: "$\\alpha + 90^\\circ$", correct: true, feedback: "The line is perpendicular to the direction $\\alpha$; the direction $\\alpha + 90^\\circ$ lies in $(90^\\circ, 180^\\circ)$, a valid inclination." },
        { text: "$\\alpha$", feedback: "$\\alpha$ is the direction of the perpendicular from the origin, not of the line." },
        { text: "$90^\\circ - \\alpha$", feedback: "Try $\\alpha = 30^\\circ$: the slope is $-\\cot 30^\\circ < 0$, so the inclination is obtuse, while $90^\\circ - \\alpha = 60^\\circ$ is acute." },
        { text: "$p$", feedback: "$p$ is a length, not an angle." },
      ],
      hint: "The slope is $-\\frac{\\cos\\alpha}{\\sin\\alpha} = -\\cot\\alpha = \\tan(\\alpha + 90^\\circ)$.",
    },
    {
      type: "numeric",
      id: "slc1-5-q10",
      variant: "practice",
      question: "Find the distance from the origin to the line through $(4, 0)$ and $(0, 3)$.",
      answer: 2.4,
      hint: "The line is $3x + 4y = 12$.",
      solution: "$p = \\frac{12}{\\sqrt{9 + 16}} = \\frac{12}{5} = 2.4$. Check by area: the triangle has area 6 and hypotenuse 5, so the height to the hypotenuse is $\\frac{2 \\cdot 6}{5}$.",
      commonMistakes: [
        { answer: 5, feedback: "5 is the length of the segment between the axes." },
        { answer: 12, feedback: "Divide by $\\sqrt{3^2 + 4^2}$." },
      ],
    },
    {
      type: "quiz",
      id: "slc1-5-q11",
      variant: "practice",
      multiple: true,
      question: "For which of these lines is the normal-form angle $\\alpha$ equal to $90^\\circ$? Select all that apply.",
      options: [
        { text: "$y = 3$", correct: true, feedback: "$x\\cos 90^\\circ + y\\sin 90^\\circ = 3$: the perpendicular from O points straight up." },
        { text: "$2y - 5 = 0$", correct: true, feedback: "$y = \\frac52$, above the origin." },
        { text: "$y = -3$", feedback: "The line is below the origin, so the perpendicular points down: $\\alpha = 270^\\circ$." },
        { text: "$x = 2$", feedback: "The perpendicular points along the positive x-axis: $\\alpha = 0^\\circ$." },
      ],
      hint: "$\\alpha = 90^\\circ$ means the perpendicular from the origin points straight up.",
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "the-parametric-distance-form",
  title: "1.6 · The Parametric (Distance) Form",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "Start at a point $A$ on a line and walk along it. After $r$ units you are somewhere specific, and you can write down exactly where: the direction of the line is an angle $\\theta$, so each unit you walk moves you $\\cos\\theta$ across and $\\sin\\theta$ up. This turns \"how far along the line\" into a single number, which is what many JEE problems quietly ask for.",
    },
    { type: "heading", text: "Deriving the distance form" },
    {
      type: "text",
      content:
        "Let the line pass through $A(x_1, y_1)$ with inclination $\\theta$, and let $P(x, y)$ be the point at signed distance $r$ from $A$ along it. The right triangle with hypotenuse $AP$ has legs $r\\cos\\theta$ (across) and $r\\sin\\theta$ (up):",
    },
    {
      type: "math",
      latex: "x = x_1 + r\\cos\\theta,\\quad y = y_1 + r\\sin\\theta \\iff \\frac{x - x_1}{\\cos\\theta} = \\frac{y - y_1}{\\sin\\theta} = r",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Parametric (distance) form",
      content:
        "Every point of the line through $(x_1, y_1)$ with direction angle $\\theta$ is $(x_1 + r\\cos\\theta,\\ y_1 + r\\sin\\theta)$ for exactly one real $r$.\n\n- $\\lvert r\\rvert$ is the distance from $(x_1, y_1)$ to the point\n- $r > 0$ in the direction $\\theta$, $r < 0$ in the opposite direction\n- $(\\cos\\theta, \\sin\\theta)$ must be a **unit** direction",
    },
    {
      type: "interactive",
      config: {
        component: "slc-line-explorer",
        mode: "line",
        a: [1, 1],
        b: [5, 4],
        show: ["forms"],
        caption:
          "$A(1, 1)$ to $B(5, 4)$ is a run of 4 and a rise of 3, so $\\cos\\theta = \\frac45$, $\\sin\\theta = \\frac35$ and $B$ sits at $r = 5$. Compare the parametric line of the readout with the slope: the slope $\\frac34$ needs to be turned into a unit direction before it can measure distance.",
      },
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"direction (1, m) is good enough\"",
      content:
        "The step $(1, m)$ points the right way but has length $\\sqrt{1 + m^2}$, not 1. For slope $\\frac34$, $(1, \\frac34)$ has length $\\frac54$, so \"$r$\" would be off by that factor. Normalise first: $(\\cos\\theta, \\sin\\theta) = \\left(\\frac{1}{\\sqrt{1 + m^2}}, \\frac{m}{\\sqrt{1 + m^2}}\\right)$, here $\\left(\\frac45, \\frac35\\right)$.",
    },
    { type: "heading", text: "Points at a given distance" },
    {
      type: "worked-example",
      id: "slc1-6-we1",
      title: "Worked example 1: two points at distance 5",
      problem: "Find the points at distance 5 from $(1, 2)$ on the line through $(1, 2)$ with slope $\\frac34$.",
      steps: [
        { text: "Unit direction: $\\tan\\theta = \\frac34$ with $\\theta$ acute gives $\\cos\\theta = \\frac45$, $\\sin\\theta = \\frac35$ (a 3-4-5 triangle)." },
        { text: "$r = \\pm 5$: $(1 \\pm 4,\\ 2 \\pm 3)$. *Why this step:* both signs of $r$ are at distance 5, one on each side of the starting point." },
      ],
      answer: "$(5, 5)$ and $(-3, -1)$.",
    },
    { type: "heading", text: "Distance measured along a line" },
    {
      type: "text",
      content:
        "\"The distance of $A$ from the line $L$ measured along a direction $\\theta$\" means: walk from $A$ in direction $\\theta$ until you hit $L$, and report how far you walked. Substitute $(x_1 + r\\cos\\theta, y_1 + r\\sin\\theta)$ into $L$, solve the linear equation for $r$, and take $\\lvert r\\rvert$. It is longer than the perpendicular distance unless the direction happens to be perpendicular to $L$.",
    },
    {
      type: "worked-example",
      id: "slc1-6-we2",
      title: "Worked example 2: along a line of inclination 45°",
      problem: "Find the distance of $A(2, 1)$ from the line $x + 2y = 10$, measured along a line of inclination $45^\\circ$.",
      steps: [
        { text: "Points of the walk: $\\left(2 + \\frac{r}{\\sqrt2},\\ 1 + \\frac{r}{\\sqrt2}\\right)$." },
        { text: "Substitute into $x + 2y = 10$:", latex: "2 + \\frac{r}{\\sqrt2} + 2 + \\frac{2r}{\\sqrt2} = 10 \\implies \\frac{3r}{\\sqrt2} = 6 \\implies r = 2\\sqrt2" },
      ],
      answer: "$2\\sqrt2$ (the perpendicular distance is only $\\frac{6}{\\sqrt5}$).",
    },
    {
      type: "worked-example",
      id: "slc1-6-we3",
      title: "Worked example 3: along a line parallel to a given line",
      problem: "Find the distance of $(1, 2)$ from $x + y + 5 = 0$, measured along a line parallel to $3x - y = 7$.",
      steps: [
        { text: "The direction has slope 3: $\\cos\\theta = \\frac{1}{\\sqrt{10}}$, $\\sin\\theta = \\frac{3}{\\sqrt{10}}$." },
        { text: "Substitute $\\left(1 + \\frac{r}{\\sqrt{10}},\\ 2 + \\frac{3r}{\\sqrt{10}}\\right)$:", latex: "1 + 2 + \\frac{4r}{\\sqrt{10}} + 5 = 0 \\implies r = -2\\sqrt{10}" },
        { text: "The negative sign only says we walked against the chosen direction. *Why this step:* a distance is $\\lvert r\\rvert$; the sign of $r$ is information about direction, not an error." },
      ],
      answer: "$2\\sqrt{10}$.",
    },
    { type: "heading", text: "A JEE Advanced pattern: several lines cut by one line" },
    {
      type: "text",
      content:
        "When a line through $A$ meets several given lines, the distance form turns each meeting into one equation in $r$, so each distance $AB$, $AC$, ... becomes an explicit function of $\\theta$. Conditions on the distances become a trigonometric equation for the direction.",
    },
    {
      type: "worked-example",
      id: "slc1-6-we4",
      title: "Worked example 4: a condition on three distances",
      problem:
        "A line through $A(-5, -4)$ meets $x + 3y + 2 = 0$, $2x + y + 4 = 0$ and $x - y - 5 = 0$ at $B$, $C$, $D$, with $\\left(\\frac{15}{AB}\\right)^2 + \\left(\\frac{10}{AC}\\right)^2 = \\left(\\frac{6}{AD}\\right)^2$. Find the line.",
      steps: [
        { text: "Write points of the line as $(-5 + r\\cos\\theta, -4 + r\\sin\\theta)$ and abbreviate $c = \\cos\\theta$, $s = \\sin\\theta$." },
        { text: "First line: $-5 + rc - 12 + 3rs + 2 = 0$, so $AB = \\frac{15}{c + 3s}$ up to sign: $\\frac{15}{AB} = \\pm(c + 3s)$." },
        { text: "Second line: $-10 + 2rc - 4 + rs + 4 = 0$ gives $\\frac{10}{AC} = \\pm(2c + s)$. Third line: $-5 + rc + 4 - rs - 5 = 0$ gives $\\frac{6}{AD} = \\pm(c - s)$. *Why this step:* the condition uses squares, so the signs do not matter." },
        { text: "Substitute:", latex: "(c + 3s)^2 + (2c + s)^2 = (c - s)^2 \\implies 4c^2 + 12cs + 9s^2 = 0 \\implies (2c + 3s)^2 = 0" },
        { text: "So $\\tan\\theta = -\\frac23$, and the line is $y + 4 = -\\frac23(x + 5)$." },
      ],
      answer: "$2x + 3y + 22 = 0$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "slc1-6-q1",
      variant: "practice",
      question: "Starting at $(1, 2)$, move 10 units along the direction $\\theta$ with $\\tan\\theta = \\frac34$ and $\\theta$ acute. Where do you arrive?",
      options: [
        { text: "$(9, 8)$", correct: true, feedback: "$(1 + 10 \\cdot \\frac45,\\ 2 + 10 \\cdot \\frac35)$." },
        { text: "$(-7, -4)$", feedback: "That is $r = -10$, the opposite direction." },
        { text: "$(7, 10)$", feedback: "Cosine and sine have been swapped: $\\cos\\theta = \\frac45$ goes with $x$." },
        { text: "$(11, 9.5)$", feedback: "That uses the step $(1, \\frac34)$, which has length $\\frac54$, not 1." },
      ],
      hint: "$\\cos\\theta = \\frac45$, $\\sin\\theta = \\frac35$.",
    },
    {
      type: "numeric",
      id: "slc1-6-q2",
      variant: "practice",
      question:
        "Find the distance of $(1, 1)$ from the line $2x + y = 9$, measured along the line of inclination $45^\\circ$ through $(1, 1)$. Give your answer to two decimal places.",
      answer: 2 * Math.SQRT2,
      tolerance: 0.01,
      hint: "Substitute $\\left(1 + \\frac{r}{\\sqrt2}, 1 + \\frac{r}{\\sqrt2}\\right)$ into $2x + y = 9$.",
      solution: "$2 + \\frac{2r}{\\sqrt2} + 1 + \\frac{r}{\\sqrt2} = 9$ gives $\\frac{3r}{\\sqrt2} = 6$, so $r = 2\\sqrt2 \\approx 2.83$.",
      commonMistakes: [
        { answer: 6 / Math.sqrt(5), tolerance: 0.01, feedback: "That is the perpendicular distance. The question measures along the $45^\\circ$ line." },
        { answer: 2, feedback: "2 is $\\frac{r}{\\sqrt2}$, the change in each coordinate. The distance is $r$." },
      ],
    },
    {
      type: "numeric",
      id: "slc1-6-q3",
      variant: "practice",
      question: "On the line through $A(2, 3)$ with inclination $60^\\circ$, find the x-coordinate of the point at $r = -4$.",
      answer: 0,
      hint: "$x = 2 + r\\cos 60^\\circ$.",
      solution: "$x = 2 + (-4) \\cdot \\frac12 = 0$ (and $y = 3 - 2\\sqrt3$).",
      commonMistakes: [
        { answer: 4, feedback: "$r = -4$ means moving backwards: subtract." },
        { answer: 2 - 2 * Math.sqrt(3), tolerance: 0.01, feedback: "That uses $\\sin 60^\\circ$ for the x-coordinate." },
      ],
    },
    {
      type: "quiz",
      id: "slc1-6-q4",
      variant: "practice",
      multiple: true,
      question: "Which points lie on the line $3x + 4y = 2$ at distance 5 from $A(2, -1)$? Select all that apply.",
      options: [
        { text: "$(6, -4)$", correct: true, feedback: "$r = 5$ along $(\\frac45, -\\frac35)$: $18 - 16 = 2$." },
        { text: "$(-2, 2)$", correct: true, feedback: "$r = -5$: $-6 + 8 = 2$." },
        { text: "$(5, 3)$", feedback: "It is 5 from $A$, but $15 + 12 = 27 \\ne 2$: not on the line." },
        { text: "$(5, -5)$", feedback: "It is 5 from $A$, but $15 - 20 = -5 \\ne 2$." },
        { text: "$(-1, 3)$", feedback: "It is 5 from $A$, but $-3 + 12 = 9 \\ne 2$." },
      ],
      hint: "$A$ is on the line. The line has slope $-\\frac34$, so a unit direction is $\\left(\\frac45, -\\frac35\\right)$.",
    },
    {
      type: "numeric",
      id: "slc1-6-q5",
      variant: "practice",
      question: "JEE Main. Find the distance of $(2, 5)$ from the line $3x + y + 4 = 0$, measured along the line $3x - 4y + 14 = 0$.",
      answer: 5,
      hint: "$(2, 5)$ lies on $3x - 4y + 14 = 0$, whose slope is $\\frac34$. Walk along it.",
      solution: "Unit direction $\\left(\\frac45, \\frac35\\right)$. Substituting $\\left(2 + \\frac{4r}{5}, 5 + \\frac{3r}{5}\\right)$: $6 + \\frac{12r}{5} + 5 + \\frac{3r}{5} + 4 = 0$, so $15 + 3r = 0$ and $r = -5$. The distance is 5.",
      commonMistakes: [
        { answer: -5, feedback: "$r = -5$ only says the walk goes against the chosen direction. A distance is $\\lvert r\\rvert$." },
        { answer: 15 / Math.sqrt(10), tolerance: 0.01, feedback: "That is the perpendicular distance, about 4.74. Here the distance is measured along the given line." },
      ],
    },
    {
      type: "quiz",
      id: "slc1-6-q6",
      variant: "concept",
      question: "In $\\frac{x - x_1}{\\cos\\theta} = \\frac{y - y_1}{\\sin\\theta} = r$, the number $r$ is",
      options: [
        { text: "the signed distance from $(x_1, y_1)$ to $(x, y)$ along the line", correct: true, feedback: "Positive in the direction $\\theta$, negative against it." },
        { text: "the slope of the line", feedback: "The slope is $\\tan\\theta$." },
        { text: "the distance of $(x, y)$ from the origin", feedback: "It is measured from $(x_1, y_1)$, which need not be the origin." },
        { text: "always a positive distance", feedback: "Points behind $(x_1, y_1)$ have $r < 0$." },
      ],
      hint: "Look at $x = x_1 + r\\cos\\theta$, $y = y_1 + r\\sin\\theta$.",
    },
    {
      type: "numeric",
      id: "slc1-6-q7",
      variant: "practice",
      question: "The line through the origin with slope $\\frac34$ crosses the lines $x + y = 7$ and $x + y = 14$. Find the length of the part of it between them.",
      answer: 5,
      hint: "Points are $\\left(\\frac{4r}{5}, \\frac{3r}{5}\\right)$. Find $r$ for each line.",
      solution: "$\\frac{7r}{5} = 7$ gives $r = 5$; $\\frac{7r}{5} = 14$ gives $r = 10$. The length is $10 - 5 = 5$.",
      commonMistakes: [
        { answer: 7, feedback: "7 is the difference of the constants, not a length along the line." },
        { answer: 7 / Math.SQRT2, tolerance: 0.01, feedback: "That is the perpendicular distance between the two parallel lines. The segment here is slanted." },
      ],
    },
    {
      type: "numeric",
      id: "slc1-6-q8",
      variant: "practice",
      question:
        "JEE Advanced. The line through $P(1, 2)$ with inclination $45^\\circ$ meets $x + y = 5$ at $B$ and $2x - y = 6$ at $C$. Find $PB \\cdot PC$.",
      answer: 12,
      hint: "Substitute $\\left(1 + \\frac{r}{\\sqrt2}, 2 + \\frac{r}{\\sqrt2}\\right)$ into each line.",
      solution: "First line: $3 + \\frac{2r}{\\sqrt2} = 5$, so $r = \\sqrt2$. Second line: $2 + \\frac{2r}{\\sqrt2} - 2 - \\frac{r}{\\sqrt2} = 6$, so $r = 6\\sqrt2$. Product: $\\sqrt2 \\cdot 6\\sqrt2 = 12$.",
      commonMistakes: [
        { answer: 6, feedback: "That multiplies the coordinate steps $\\frac{r}{\\sqrt2}$ (1 and 6), not the distances $r$." },
        { answer: 7 * Math.SQRT2, tolerance: 0.01, feedback: "That is the sum $PB + PC$." },
      ],
    },
    {
      type: "quiz",
      id: "slc1-6-q9",
      variant: "practice",
      question: "A point moves 6 units from $(3, -2)$ along a line of inclination $150^\\circ$ (in the direction $150^\\circ$). It arrives at",
      options: [
        { text: "$(3 - 3\\sqrt3,\\ 1)$", correct: true, feedback: "$\\cos 150^\\circ = -\\frac{\\sqrt3}{2}$, $\\sin 150^\\circ = \\frac12$." },
        { text: "$(3 + 3\\sqrt3,\\ 1)$", feedback: "The cosine of $150^\\circ$ is negative: the point moves left." },
        { text: "$(0,\\ -2 + 3\\sqrt3)$", feedback: "Cosine and sine have been swapped." },
        { text: "$(3 + 3\\sqrt3,\\ -5)$", feedback: "That is $r = -6$, the opposite direction." },
      ],
      hint: "$(3 + 6\\cos 150^\\circ,\\ -2 + 6\\sin 150^\\circ)$.",
    },
    {
      type: "quiz",
      id: "slc1-6-q10",
      variant: "concept",
      multiple: true,
      question: "Let $Q = (1 + r\\cos\\theta,\\ 1 + r\\sin\\theta)$ and $A = (1, 1)$. Which statements are true? Select all that apply.",
      options: [
        { text: "$AQ = \\lvert r\\rvert$", correct: true, feedback: "$AQ^2 = r^2\\cos^2\\theta + r^2\\sin^2\\theta = r^2$." },
        { text: "with $r$ fixed and $\\theta$ varying, $Q$ traces a circle centred at $A$", correct: true, feedback: "Every such $Q$ is at distance $\\lvert r\\rvert$ from $A$." },
        { text: "with $\\theta$ fixed and $r$ varying, $Q$ traces a line through $A$", correct: true, feedback: "That is the distance form of the line." },
        { text: "$r$ is always positive", feedback: "Negative $r$ gives the points on the other side of $A$." },
      ],
      hint: "Compute $AQ^2$, then think about which quantity is held fixed.",
    },
  ]),
};

const lesson07: LessonSeed = {
  slug: "the-general-form-and-conversions",
  title: "1.7 · The General Form and Conversions",
  position: 7,
  blocks: blocks([
    {
      type: "text",
      content:
        "Six forms of one line can feel like six things to memorise. They are not. Every one of them, once you clear fractions and move everything to one side, becomes $ax + by + c = 0$. This **general form** is the common language: it covers vertical lines, it shows the slope, both intercepts and the normal direction, and from it you can reach any other form in one or two steps.",
    },
    { type: "heading", text: "Every line is linear, and every linear equation is a line" },
    {
      type: "text",
      content:
        "A non-vertical line is $y = mx + c$, i.e. $mx - y + c = 0$; a vertical line is $x - k = 0$. Both are first-degree equations. Conversely, take $ax + by + c = 0$ with $a$ and $b$ not both zero. If $b \\ne 0$, it is $y = -\\frac ab x - \\frac cb$, a line of slope $-\\frac ab$. If $b = 0$, it is $x = -\\frac ca$, a vertical line. So straight lines and first-degree equations are the same thing.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Reading the general form",
      content:
        "For $ax + by + c = 0$:\n\n- slope $-\\frac ab$ (vertical if $b = 0$)\n- x-intercept $-\\frac ca$, y-intercept $-\\frac cb$\n- distance from the origin $\\frac{\\lvert c\\rvert}{\\sqrt{a^2 + b^2}}$\n- $(a, b)$ is **perpendicular** to the line (a normal), and $(b, -a)$ points **along** it",
    },
    {
      type: "text",
      content:
        "Why is $(a, b)$ a normal? If $(x_1, y_1)$ and $(x_2, y_2)$ are on the line, subtracting their equations gives $a(x_2 - x_1) + b(y_2 - y_1) = 0$: the step along the line has zero dot product with $(a, b)$.",
    },
    {
      type: "table",
      headers: ["Form", "Equation", "From $ax + by + c = 0$ ($a, b, c \\ne 0$)"],
      rows: [
        ["Slope-intercept", "$y = mx + c'$", "$y = -\\frac ab x - \\frac cb$"],
        ["Intercept", "$\\frac xA + \\frac yB = 1$", "$\\frac{x}{-c/a} + \\frac{y}{-c/b} = 1$"],
        ["Normal", "$x\\cos\\alpha + y\\sin\\alpha = p$", "divide $ax + by = -c$ by $\\pm\\sqrt{a^2 + b^2}$ so that $p \\ge 0$"],
        ["Parametric", "$(x_1 + r\\cos\\theta, y_1 + r\\sin\\theta)$", "any point on the line, with $(\\cos\\theta, \\sin\\theta) = \\pm\\frac{(b, -a)}{\\sqrt{a^2 + b^2}}$"],
      ],
    },
    {
      type: "interactive",
      config: {
        component: "slc-line-explorer",
        mode: "line",
        a: [-4, 0],
        b: [0, 3],
        show: ["forms", "intercepts"],
        caption:
          "This is $3x - 4y + 12 = 0$. Check every line of the readout against the table above, then drag $B$ to make the line vertical: only the general form $ax + by + c = 0$ survives.",
      },
    },
    {
      type: "worked-example",
      id: "slc1-7-we1",
      title: "Worked example 1: one line in every form",
      problem: "Write $3x - 4y + 12 = 0$ in slope-intercept, intercept, normal and parametric form.",
      steps: [
        { text: "Slope-intercept: $4y = 3x + 12$, so $y = \\frac34 x + 3$." },
        { text: "Intercept: $3x - 4y = -12$; divide by $-12$: $\\frac{x}{-4} + \\frac{y}{3} = 1$." },
        { text: "Normal: the right side of $3x - 4y = -12$ is negative, so divide by $-5$: $-\\frac35 x + \\frac45 y = \\frac{12}{5}$. Here $\\cos\\alpha = -\\frac35$, $\\sin\\alpha = \\frac45$, $p = \\frac{12}{5}$." },
        { text: "Parametric: $(0, 3)$ is on the line and the unit direction is $\\left(\\frac45, \\frac35\\right)$ (slope $\\frac34$): $\\frac{x}{4/5} = \\frac{y - 3}{3/5} = r$. *Why this step:* any point of the line and either unit direction along it will do." },
      ],
      answer: "$y = \\frac34x + 3$; $\\frac{x}{-4} + \\frac y3 = 1$; $-\\frac35x + \\frac45y = \\frac{12}{5}$; $\\left(\\frac{4r}{5}, 3 + \\frac{3r}{5}\\right)$.",
    },
    { type: "heading", text: "Parallel, perpendicular and identical lines in general form" },
    {
      type: "callout",
      variant: "definition",
      title: "Two lines $a_1x + b_1y + c_1 = 0$ and $a_2x + b_2y + c_2 = 0$",
      content:
        "- **identical** $\\iff \\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2}$ (all coefficients proportional)\n- **parallel and distinct** $\\iff a_1b_2 = a_2b_1$ but the $c$'s are not in the same proportion\n- **perpendicular** $\\iff a_1a_2 + b_1b_2 = 0$ (the normals are perpendicular)\n\nThe perpendicular test has no exceptions: it works for vertical and horizontal lines too.",
    },
    {
      type: "worked-example",
      id: "slc1-7-we2",
      title: "Worked example 2: a parameter for parallel and perpendicular",
      problem: "For which $k$ are $kx + 3y - 1 = 0$ and $2x + (k + 1)y + 4 = 0$ (a) parallel, (b) perpendicular?",
      steps: [
        { text: "(a) $a_1b_2 = a_2b_1$: $k(k + 1) = 6$, so $k^2 + k - 6 = 0$ and $k = 2$ or $k = -3$." },
        { text: "Rule out identical lines. $k = 2$: $2x + 3y - 1 = 0$ and $2x + 3y + 4 = 0$, distinct. $k = -3$: $-3x + 3y - 1 = 0$ and $2x - 2y + 4 = 0$, i.e. $x - y + \\frac13 = 0$ and $x - y + 2 = 0$, distinct. *Why this step:* $a_1b_2 = a_2b_1$ also holds for identical lines, which are not \"parallel\" in the usual sense." },
        { text: "(b) $a_1a_2 + b_1b_2 = 0$: $2k + 3(k + 1) = 0$, so $k = -\\frac35$." },
      ],
      answer: "(a) $k = 2$ or $k = -3$. (b) $k = -\\frac35$.",
    },
    { type: "heading", text: "Lines through a fixed point" },
    {
      type: "text",
      content:
        "Suppose the coefficients of $ax + by + c = 0$ are not fixed but always satisfy a linear relation, say $pa + qb + rc = 0$ with $r \\ne 0$. Dividing by $r$: $a \\cdot \\frac pr + b \\cdot \\frac qr + c = 0$, which says exactly that the point $\\left(\\frac pr, \\frac qr\\right)$ satisfies **every** such equation. So all these lines pass through one fixed point. Chapter 3 builds a whole technique on this idea.",
    },
    {
      type: "worked-example",
      id: "slc1-7-we3",
      title: "Worked example 3: the common point of a family",
      problem: "The coefficients of the lines $ax + by + c = 0$ satisfy $3a + 2b + 4c = 0$. Show that all of them pass through a fixed point and find it.",
      steps: [
        { text: "Divide the relation by 4: $\\frac34 a + \\frac12 b + c = 0$." },
        { text: "Compare with $a x + b y + c = 0$: the point $x = \\frac34$, $y = \\frac12$ satisfies every line of the family." },
      ],
      answer: "Every line passes through $\\left(\\frac34, \\frac12\\right)$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the slope of ax + by + c = 0 is a/b\"",
      content:
        "Solve for $y$: $y = -\\frac ab x - \\frac cb$. The slope is $-\\frac ab$, minus the coefficient of $x$ over the coefficient of $y$. Quick check: $x - y = 0$ is $y = x$, slope $+1 = -\\frac{1}{-1}$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"proportional coefficients mean parallel lines\"",
      content:
        "$2x + 3y + 4 = 0$ and $4x + 6y + 8 = 0$ have $a$, $b$ **and** $c$ in the ratio $1 : 2$: they are the same line written twice. Parallel distinct lines have $a$ and $b$ proportional but not $c$, e.g. $4x + 6y + 5 = 0$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "slc1-7-q1",
      variant: "practice",
      question: "Find the slope of $4x - 6y + 5 = 0$ (a fraction is fine).",
      answer: 2 / 3,
      tolerance: 0.001,
      hint: "Slope $= -\\frac ab$.",
      solution: "$-\\frac{4}{-6} = \\frac23$.",
      commonMistakes: [
        { answer: -2 / 3, tolerance: 0.001, feedback: "Sign slip: $b = -6$, so $-\\frac ab = +\\frac23$." },
        { answer: 1.5, tolerance: 0.001, feedback: "That is $-\\frac ba$, the slope of a line perpendicular to this one. The slope is $-\\frac ab$." },
      ],
    },
    {
      type: "numeric",
      id: "slc1-7-q2",
      variant: "practice",
      question: "Find the y-intercept of $2x + 5y - 15 = 0$.",
      answer: 3,
      hint: "Put $x = 0$.",
      solution: "$5y = 15$, so $y = 3$.",
      commonMistakes: [
        { answer: 7.5, feedback: "That is the x-intercept." },
        { answer: -3, feedback: "$-\\frac cb = -\\frac{-15}{5} = +3$." },
      ],
    },
    {
      type: "quiz",
      id: "slc1-7-q3",
      variant: "practice",
      question: "The inclination of $x - \\sqrt3 y + 4 = 0$ is",
      options: [
        { text: "$30^\\circ$", correct: true, feedback: "Slope $-\\frac{1}{-\\sqrt3} = \\frac{1}{\\sqrt3} = \\tan 30^\\circ$." },
        { text: "$60^\\circ$", feedback: "$\\tan 60^\\circ = \\sqrt3$, which would be $-\\frac ba$." },
        { text: "$150^\\circ$", feedback: "The slope is positive, so the inclination is acute." },
        { text: "$120^\\circ$", feedback: "$\\tan 120^\\circ = -\\sqrt3$: wrong size and wrong sign." },
      ],
      hint: "Slope $= -\\frac ab$, then find the angle with that tangent.",
    },
    {
      type: "quiz",
      id: "slc1-7-q4",
      variant: "practice",
      multiple: true,
      question: "Which lines are parallel to, and different from, $2x - 3y + 7 = 0$? Select all that apply.",
      options: [
        { text: "$4x - 6y - 1 = 0$", correct: true, feedback: "$a$ and $b$ in ratio $1 : 2$, but $c$ is not." },
        { text: "$-2x + 3y = 5$", correct: true, feedback: "$a$ and $b$ in ratio $1 : (-1)$; the constant would need to be $-7$ for the same line." },
        { text: "$3x - 2y + 7 = 0$", feedback: "Slope $\\frac32$, not $\\frac23$." },
        { text: "$2x + 3y = 0$", feedback: "Slope $-\\frac23$." },
        { text: "$6x - 9y + 21 = 0$", feedback: "All three coefficients are 3 times the original: the same line." },
      ],
      hint: "Check $a_1b_2 = a_2b_1$, then make sure $c$ is not in the same ratio.",
    },
    {
      type: "numeric",
      id: "slc1-7-q5",
      variant: "practice",
      question: "Find $k$ so that $kx - 2y + 3 = 0$ is perpendicular to $3x + 4y - 1 = 0$ (a fraction is fine).",
      answer: 8 / 3,
      tolerance: 0.001,
      hint: "$a_1a_2 + b_1b_2 = 0$.",
      solution: "$3k + (-2)(4) = 0$, so $k = \\frac83$.",
      commonMistakes: [
        { answer: -8 / 3, tolerance: 0.001, feedback: "Sign slip: $3k - 8 = 0$." },
        { answer: -1.5, tolerance: 0.001, feedback: "That makes the lines parallel ($a_1b_2 = a_2b_1$)." },
      ],
    },
    {
      type: "numeric",
      id: "slc1-7-q6",
      variant: "practice",
      question: "JEE Main. For which $k$ is the line $(k - 3)x - (4 - k^2)y + k^2 - 7k + 6 = 0$ parallel to the x-axis?",
      answer: 3,
      hint: "Parallel to the x-axis means horizontal: the coefficient of $x$ is 0 (and that of $y$ is not).",
      solution: "$k - 3 = 0$ gives $k = 3$; then the coefficient of $y$ is $-(4 - 9) = 5 \\ne 0$, so the line is $5y - 6 = 0$, horizontal.",
      commonMistakes: [
        { answer: 2, feedback: "$k = \\pm 2$ kills the $y$ term, making the line parallel to the **y**-axis." },
        { answer: 1, feedback: "$k = 1$ (or 6) kills the constant, making the line pass through the origin." },
      ],
    },
    {
      type: "numeric",
      id: "slc1-7-q7",
      variant: "practice",
      question: "For the same line $(k - 3)x - (4 - k^2)y + k^2 - 7k + 6 = 0$, find the sum of all values of $k$ for which it passes through the origin.",
      answer: 7,
      hint: "Through the origin means the constant term is 0.",
      solution: "$k^2 - 7k + 6 = (k - 1)(k - 6) = 0$, so $k = 1$ or $6$ (both give a genuine line). The sum is 7.",
      commonMistakes: [
        { answer: 6, feedback: "That is the product of the roots, or just one of them. Add $1 + 6$." },
        { answer: -7, feedback: "The roots are 1 and 6, both positive." },
      ],
    },
    {
      type: "quiz",
      id: "slc1-7-q8",
      variant: "practice",
      question: "The lines $ax + by + c = 0$ whose coefficients satisfy $2a - b + 3c = 0$ all pass through the point",
      options: [
        { text: "$\\left(\\frac23, -\\frac13\\right)$", correct: true, feedback: "Divide by 3: $\\frac23 a - \\frac13 b + c = 0$." },
        { text: "$(2, -1)$", feedback: "Then $2a - b + c = 0$ would be needed. Divide by the coefficient of $c$ first." },
        { text: "$\\left(-\\frac23, \\frac13\\right)$", feedback: "Sign slip: the point satisfies $ax + by + c = 0$ with $x = \\frac23$." },
        { text: "$\\left(\\frac32, -3\\right)$", feedback: "That inverts the ratios. The point is $\\left(\\frac pr, \\frac qr\\right)$ for $pa + qb + rc = 0$." },
      ],
      hint: "Make the coefficient of $c$ equal to 1 and compare with $ax + by + c = 0$.",
    },
    {
      type: "quiz",
      id: "slc1-7-q9",
      variant: "practice",
      multiple: true,
      question: "For the line $3x + 4y - 12 = 0$, which statements are true? Select all that apply.",
      options: [
        { text: "its slope is $-\\frac34$", correct: true, feedback: "$-\\frac ab = -\\frac34$." },
        { text: "its x-intercept is 4", correct: true, feedback: "$3x = 12$." },
        { text: "its distance from the origin is $\\frac{12}{5}$", correct: true, feedback: "$\\frac{\\lvert -12\\rvert}{5}$." },
        { text: "it passes through $(4, 3)$", feedback: "$12 + 12 - 12 = 12 \\ne 0$." },
        { text: "its slope is $\\frac34$", feedback: "Remember the minus sign in $-\\frac ab$." },
      ],
      hint: "Read slope, intercepts and distance straight from $a$, $b$, $c$.",
    },
    {
      type: "numeric",
      id: "slc1-7-q10",
      variant: "practice",
      question: "The equations $2x + 3y + 4 = 0$ and $px + 9y + q = 0$ represent the same line. Find $p + q$.",
      answer: 18,
      hint: "Identical lines have all three coefficients in the same ratio.",
      solution: "The ratio is $\\frac93 = 3$, so $p = 6$ and $q = 12$: $p + q = 18$.",
      commonMistakes: [
        { answer: 12, feedback: "That is $q$ alone (or $p$ times 2). Add $p = 6$." },
        { answer: 10, feedback: "$q$ must also be 3 times 4, not $4 + 6$." },
      ],
    },
    {
      type: "quiz",
      id: "slc1-7-q11",
      variant: "practice",
      question: "JEE Main. The lines $2x + 3y = 5$ and $kx - 6y = 1$ are perpendicular. Then $k$ is",
      options: [
        { text: "$9$", correct: true, feedback: "$2k + 3(-6) = 0$." },
        { text: "$-4$", feedback: "$k = -4$ makes the lines parallel: $2(-6) = 3(-4)$." },
        { text: "$4$", feedback: "$2(4) - 18 = -10 \\ne 0$." },
        { text: "$-9$", feedback: "Sign slip: $2k - 18 = 0$ gives $k = 9$." },
      ],
      hint: "$a_1a_2 + b_1b_2 = 0$.",
    },
    {
      type: "quiz",
      id: "slc1-7-q12",
      variant: "concept",
      multiple: true,
      question: "For any two lines $a_1x + b_1y + c_1 = 0$ and $a_2x + b_2y + c_2 = 0$, which statements are **always** true? Select all that apply.",
      options: [
        { text: "they are perpendicular if and only if $a_1a_2 + b_1b_2 = 0$", correct: true, feedback: "The normals $(a_1, b_1)$ and $(a_2, b_2)$ are perpendicular, and so are the lines. No exceptions." },
        { text: "they are parallel or identical if and only if $a_1b_2 = a_2b_1$", correct: true, feedback: "The normals are proportional exactly when this cross-product vanishes." },
        { text: "they are perpendicular if and only if $\\frac{a_1}{b_1} \\cdot \\frac{a_2}{b_2} = -1$", feedback: "This fails when a line is vertical ($b = 0$): $x = 1$ and $y = 1$ are perpendicular but the fractions are undefined." },
        { text: "they are identical if and only if $a_1 = a_2$, $b_1 = b_2$ and $c_1 = c_2$", feedback: "Proportional coefficients are enough: $x + y + 1 = 0$ and $2x + 2y + 2 = 0$ are the same line." },
      ],
      hint: "Think in terms of the normal vectors $(a_1, b_1)$ and $(a_2, b_2)$, and test vertical lines.",
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
        "No new theory here, and no formula sheet. Every form of a line in this chapter came from one sentence: a line is fixed by a point and a direction. If a formula slips your mind, rebuild it from that sentence and a sketch before you reach for algebra.",
    },
    { type: "heading", text: "Reconstruct it" },
    {
      type: "callout",
      variant: "tip",
      title: "Rebuild every form from a point and a direction",
      content:
        "Without notes, answer each of these with a sketch:\n\n1. Why is the slope the same for every pair of points on a line? (Similar triangles.)\n2. Rotate the step $(1, m)$ by a quarter turn. What slope does the perpendicular line get?\n3. A line through $(x_1, y_1)$ with slope $m$: what condition must $(x, y)$ satisfy? Clear the fraction.\n4. Feed $(a, 0)$ and $(0, b)$ into that condition. What form comes out?\n5. Drop the perpendicular from the origin, of length $p$ in direction $\\alpha$. Which points have a shadow of length $p$ on that direction?\n6. Walk $r$ units from $(x_1, y_1)$ in direction $\\theta$. Where are you?\n7. Why is $(a, b)$ perpendicular to $ax + by + c = 0$?",
    },
    {
      type: "text",
      content:
        "Then check one conversion end to end on paper: take $x + \\sqrt3 y = 6$ and write it in slope-intercept, intercept, normal and parametric form, confirming each by substituting the point $(3, \\sqrt3)$, which lies on the line.",
    },
    {
      type: "interactive",
      config: {
        component: "slc-line-explorer",
        mode: "line",
        a: [0, 3],
        b: [3, 2],
        show: ["forms", "intercepts"],
        caption:
          "Use this to check your reconstructions. Drag $A$ and $B$ to any two grid points, predict the slope, the intercepts and the normal form before reading them, then compare.",
      },
    },
    { type: "heading", text: "Mastery questions" },
    {
      type: "numeric",
      id: "slc1-8-q1",
      variant: "mastery",
      question: "Find the inclination, in degrees, of the line through $(0, 0)$ and $(-1, \\sqrt3)$.",
      answer: 120,
      unit: "degrees",
      hint: "Lesson 1.1: the slope is $-\\sqrt3$; inclination lies in $[0^\\circ, 180^\\circ)$.",
      solution: "$m = \\frac{\\sqrt3}{-1} = -\\sqrt3 = \\tan 120^\\circ$.",
      commonMistakes: [
        { answer: 60, feedback: "$\\tan 60^\\circ = +\\sqrt3$. The line falls to the right." },
        { answer: -60, feedback: "Bring the angle into $[0^\\circ, 180^\\circ)$." },
      ],
    },
    {
      type: "quiz",
      id: "slc1-8-q2",
      variant: "mastery",
      question: "The line through $(2, -3)$ perpendicular to the line joining $(1, 2)$ and $(3, 6)$ is",
      options: [
        { text: "$x + 2y + 4 = 0$", correct: true, feedback: "The joining line has slope 2, so the required slope is $-\\frac12$: $y + 3 = -\\frac12(x - 2)$." },
        { text: "$2x - y - 7 = 0$", feedback: "Slope 2: this one is parallel to the joining line." },
        { text: "$x + 2y - 4 = 0$", feedback: "The right slope, but $(2, -3)$ gives $2 - 6 - 4 \\ne 0$." },
        { text: "$x - 2y - 8 = 0$", feedback: "Slope $+\\frac12$: the reciprocal without the minus sign." },
      ],
      hint: "Lessons 1.2 and 1.3: negative reciprocal slope, then point-slope form.",
    },
    {
      type: "numeric",
      id: "slc1-8-q3",
      variant: "mastery",
      question: "Find the area of the triangle formed by $2x + 5y = 20$ and the coordinate axes.",
      answer: 20,
      hint: "Lesson 1.4: write it as $\\frac{x}{10} + \\frac y4 = 1$.",
      solution: "Intercepts 10 and 4, area $\\frac12 \\cdot 10 \\cdot 4 = 20$.",
      commonMistakes: [
        { answer: 40, feedback: "Take half of the product of the intercepts." },
        { answer: 14, feedback: "That adds the intercepts." },
      ],
    },
    {
      type: "numeric",
      id: "slc1-8-q4",
      variant: "mastery",
      question: "The segment of a line between the axes is bisected at $(-3, 4)$. Find the distance of the line from the origin.",
      answer: 4.8,
      hint: "Lessons 1.4 and 1.5: intercepts $-6$ and $8$, then $p = \\frac{\\lvert c\\rvert}{\\sqrt{a^2 + b^2}}$.",
      solution: "The line is $\\frac{x}{-6} + \\frac y8 = 1$, i.e. $4x - 3y + 24 = 0$. Then $p = \\frac{24}{5} = 4.8$. (Also: legs 6 and 8, hypotenuse 10, height $\\frac{6 \\cdot 8}{10}$.)",
      commonMistakes: [
        { answer: 10, feedback: "10 is the length of the intercepted segment." },
        { answer: 5, feedback: "5 is the distance from the origin to the midpoint $(-3, 4)$, which is not the foot of the perpendicular." },
      ],
    },
    {
      type: "quiz",
      id: "slc1-8-q5",
      variant: "mastery",
      question: "The normal form of $x + y - 2 = 0$ is",
      options: [
        { text: "$x\\cos 45^\\circ + y\\sin 45^\\circ = \\sqrt2$", correct: true, feedback: "Divide $x + y = 2$ by $\\sqrt2$." },
        { text: "$x\\cos 45^\\circ + y\\sin 45^\\circ = 2$", feedback: "Divide the constant by $\\sqrt2$ too." },
        { text: "$x\\cos 135^\\circ + y\\sin 135^\\circ = \\sqrt2$", feedback: "That is $-x + y = 2$, a different line." },
        { text: "$x\\cos 225^\\circ + y\\sin 225^\\circ = \\sqrt2$", feedback: "That is $x + y = -2$, the parallel line on the other side of the origin." },
      ],
      hint: "Lesson 1.5: constant to the right, then divide by $\\sqrt{a^2 + b^2}$.",
    },
    {
      type: "numeric",
      id: "slc1-8-q6",
      variant: "mastery",
      question: "Find the distance of $(2, 1)$ from the line $x + y = 10$, measured along a line parallel to $4x - 3y = 0$.",
      answer: 5,
      hint: "Lesson 1.6: the direction has slope $\\frac43$, so $(\\cos\\theta, \\sin\\theta) = \\left(\\frac35, \\frac45\\right)$.",
      solution: "$\\left(2 + \\frac{3r}{5}\\right) + \\left(1 + \\frac{4r}{5}\\right) = 10$ gives $\\frac{7r}{5} = 7$, so $r = 5$.",
      commonMistakes: [
        { answer: 7 / Math.SQRT2, tolerance: 0.01, feedback: "That is the perpendicular distance, about 4.95." },
        { answer: 7, feedback: "7 is $\\frac{7r}{5}$ at the meeting point. Solve for $r$." },
      ],
    },
    {
      type: "quiz",
      id: "slc1-8-q7",
      variant: "mastery",
      multiple: true,
      question: "For the lines $3x - 4y + 5 = 0$ and $8x + 6y - 1 = 0$, which statements are true? Select all that apply.",
      options: [
        { text: "they are perpendicular", correct: true, feedback: "$a_1a_2 + b_1b_2 = 24 - 24 = 0$." },
        { text: "their slopes are $\\frac34$ and $-\\frac43$", correct: true, feedback: "$-\\frac{3}{-4}$ and $-\\frac86$." },
        { text: "they meet in exactly one point", correct: true, feedback: "Non-parallel lines in a plane meet once." },
        { text: "they are parallel", feedback: "$3 \\cdot 6 \\ne 8 \\cdot (-4)$." },
        { text: "both pass through the origin", feedback: "Their constants are not zero." },
      ],
      hint: "Lesson 1.7: test $a_1a_2 + b_1b_2$ and $a_1b_2 - a_2b_1$.",
    },
    {
      type: "numeric",
      id: "slc1-8-q8",
      variant: "mastery",
      question: "JEE Main. The lines $(k + 1)x + 8y = 4k$ and $kx + (k + 3)y = 3k - 1$ are parallel (and distinct). Find $k$.",
      answer: 3,
      hint: "Lesson 1.7: $a_1b_2 = a_2b_1$, then rule out the value that makes the lines identical.",
      solution: "$(k + 1)(k + 3) = 8k$ gives $k^2 - 4k + 3 = 0$, so $k = 1$ or $3$. At $k = 1$ both equations become $x + 4y = 2$: the same line. At $k = 3$: $x + 2y = 3$ and $x + 2y = \\frac83$, parallel and distinct. So $k = 3$.",
      commonMistakes: [
        { answer: 1, feedback: "At $k = 1$ the two equations are the same line, $x + 4y = 2$." },
        { answer: 4, feedback: "4 is the sum of the roots of $k^2 - 4k + 3 = 0$." },
      ],
    },
    {
      type: "numeric",
      id: "slc1-8-q9",
      variant: "mastery",
      question: "All lines $ax + by + c = 0$ with $2a + 3b + c = 0$ pass through a fixed point $(h, k)$. Find $h + k$.",
      answer: 5,
      hint: "Lesson 1.7: compare $2a + 3b + c = 0$ with $ah + bk + c = 0$.",
      solution: "The relation says $(2, 3)$ satisfies every equation of the family, so $h + k = 5$.",
      commonMistakes: [
        { answer: -5, feedback: "The point is $(2, 3)$, not $(-2, -3)$: compare $2a + 3b + c$ with $ah + bk + c$." },
        { answer: 6, feedback: "That is $h \\cdot k$." },
      ],
    },
    {
      type: "quiz",
      id: "slc1-8-q10",
      variant: "mastery",
      question: "If $m < 0$ and $c < 0$, the line $y = mx + c$ does **not** pass through the",
      options: [
        { text: "first quadrant", correct: true, feedback: "It crosses the y-axis below the origin and falls to the right, crossing the x-axis at $-\\frac cm < 0$: it visits quadrants II, III and IV only." },
        { text: "second quadrant", feedback: "To the left of the y-axis it rises above the x-axis, entering quadrant II." },
        { text: "third quadrant", feedback: "Between its x-intercept (negative) and the y-axis it is below the axis: quadrant III." },
        { text: "fourth quadrant", feedback: "For $x > 0$ it is below $c < 0$: quadrant IV." },
      ],
      hint: "Lesson 1.3: sketch a falling line with a negative y-intercept.",
    },
    {
      type: "numeric",
      id: "slc1-8-q11",
      variant: "mastery",
      question: "A line through $(3, 4)$ has intercepts equal in size but opposite in sign. Find its x-intercept.",
      answer: -1,
      hint: "Lesson 1.4: $\\frac xa + \\frac{y}{-a} = 1$, i.e. $x - y = a$.",
      solution: "$3 - 4 = a$, so $a = -1$: the line $x - y = -1$ has intercepts $-1$ and $1$.",
      commonMistakes: [
        { answer: 1, feedback: "1 is the y-intercept." },
        { answer: 7, feedback: "That is the line with **equal** intercepts, $x + y = 7$." },
      ],
    },
    {
      type: "numeric",
      id: "slc1-8-q12",
      variant: "mastery",
      question:
        "JEE Main. A line meets the x-axis at $A$ and the y-axis at $B$, and $P(4, 3)$ divides $AB$ so that $AP : PB = 1 : 2$. Find the area of triangle $OAB$.",
      answer: 27,
      hint: "Lessons 1.4 and Chapter 0: $P = \\left(\\frac{2a + 1 \\cdot 0}{3}, \\frac{2 \\cdot 0 + 1 \\cdot b}{3}\\right)$ for $A(a, 0)$, $B(0, b)$.",
      solution: "$\\frac{2a}{3} = 4$ gives $a = 6$; $\\frac b3 = 3$ gives $b = 9$. The line is $3x + 2y = 18$ and the area is $\\frac12 \\cdot 6 \\cdot 9 = 27$.",
      commonMistakes: [
        { answer: 54, feedback: "Take half the product of the intercepts." },
        { answer: 24, feedback: "That treats $P$ as the midpoint of $AB$. With $AP : PB = 1 : 2$ the section formula gives $P = \\left(\\frac{2a}{3}, \\frac b3\\right)$." },
      ],
    },
    {
      type: "quiz",
      id: "slc1-8-q13",
      variant: "mastery",
      multiple: true,
      question:
        "JEE Advanced. A line through $(1, 2)$ meets the positive x-axis at $(a, 0)$ and the positive y-axis at $(0, b)$. Which statements are true? Select all that apply.",
      options: [
        { text: "the triangle it cuts off has area at least 4", correct: true, feedback: "$1 = \\frac1a + \\frac2b \\ge 2\\sqrt{\\frac{2}{ab}}$ gives $ab \\ge 8$, area $\\ge 4$, with equality at $a = 2$, $b = 4$." },
        { text: "$a + b$ can equal 5", feedback: "The least value of $a + b$ is $(1 + \\sqrt2)^2 = 3 + 2\\sqrt2 \\approx 5.83$." },
        { text: "if $a = 3$ then $b = 3$", correct: true, feedback: "$\\frac13 + \\frac2b = 1$ gives $b = 3$." },
        { text: "$a > 1$ always", correct: true, feedback: "$\\frac1a = 1 - \\frac2b < 1$." },
        { text: "$a = 1$ is possible", feedback: "Then $\\frac2b = 0$, impossible: the line would be vertical." },
      ],
      hint: "Lesson 1.4: every such line satisfies $\\frac1a + \\frac2b = 1$ with $a, b > 0$.",
    },
    {
      type: "numeric",
      id: "slc1-8-q14",
      variant: "mastery",
      question: "The perpendicular from the origin to a line meets it at $(2, -1)$. Find the x-intercept of the line.",
      answer: 2.5,
      hint: "Lesson 1.5: a foot $(h, k)$ gives $hx + ky = h^2 + k^2$.",
      solution: "$2x - y = 5$, so the x-intercept is $\\frac52$.",
      commonMistakes: [
        { answer: -5, feedback: "That is the y-intercept." },
        { answer: 2, feedback: "The foot of the perpendicular is not on the x-axis." },
      ],
    },
    {
      type: "quiz",
      id: "slc1-8-q15",
      variant: "mastery",
      question: "The perpendicular bisector of the segment joining $(1, 2)$ and $(5, -4)$ is",
      options: [
        { text: "$2x - 3y - 9 = 0$", correct: true, feedback: "Through the midpoint $(3, -1)$ with slope $\\frac23$, the negative reciprocal of $-\\frac32$." },
        { text: "$3x + 2y - 7 = 0$", feedback: "It passes through the midpoint, but with slope $-\\frac32$ it is the line $AB$ itself." },
        { text: "$2x - 3y + 9 = 0$", feedback: "At the midpoint: $6 + 3 + 9 \\ne 0$." },
        { text: "$2x - 3y - 4 = 0$", feedback: "The right slope, but at the midpoint $6 + 3 - 4 \\ne 0$." },
      ],
      hint: "Lessons 1.2 and 1.3: midpoint, then the perpendicular slope.",
    },
    {
      type: "numeric",
      id: "slc1-8-q16",
      variant: "mastery",
      question: "Write $\\sqrt3 x + y + 8 = 0$ in normal form $x\\cos\\alpha + y\\sin\\alpha = p$. Find $\\alpha$ in degrees.",
      answer: 210,
      unit: "degrees",
      hint: "Lesson 1.5: $\\sqrt3 x + y = -8$, so divide by $-2$.",
      solution: "$-\\frac{\\sqrt3}{2}x - \\frac12 y = 4$: $\\cos\\alpha = -\\frac{\\sqrt3}{2}$, $\\sin\\alpha = -\\frac12$, so $\\alpha = 210^\\circ$ and $p = 4$.",
      commonMistakes: [
        { answer: 30, feedback: "Dividing by $+2$ leaves $p = -4$. Flip the sign." },
        { answer: 150, feedback: "Both the cosine and the sine are negative: third quadrant." },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Where next",
      content:
        "Every form in this chapter answers \"which points are on the line?\". Chapter 2 asks the next question: for a point **off** the line, how far away is it, and on which side? The number $ax_1 + by_1 + c$, which is zero exactly on the line, turns out to answer both, and the normal form you met in Lesson 1.5 is the reason.",
    },
  ]),
};

export const slcChapter1Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lesson07,
  lessonMastery,
];
