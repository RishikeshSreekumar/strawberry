import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Straight Lines and Circles Chapter 2 — Angles and Distances. Measuring
 * the plane with lines: the angle between two lines (slope and general
 * forms), the distance of a point from a line and between parallel lines,
 * the foot of the perpendicular and the image of a point, which side of a
 * line a point lies on (the sign of L(P)), and the two angle bisectors
 * (the one containing the origin, the acute one, the one containing a
 * given point).
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "the-angle-between-two-lines",
  title: "2.1 · The Angle Between Two Lines",
  position: 1,
  blocks: blocks([
    {
      type: "text",
      content:
        "Two lines that are not parallel cross at a point and make **two** angles there: some $\\theta$ and its supplement $180^\\circ - \\theta$. Chapter 1 gave every line a slope $m = \\tan\\alpha$, where $\\alpha$ is its inclination. This lesson turns two slopes into the angle between the lines, and then does the same straight from the general form $ax + by + c = 0$.",
    },
    {
      type: "text",
      content:
        "The whole lesson rests on one picture: if the lines have inclinations $\\alpha_1$ and $\\alpha_2$, the angle between them is the **difference** of the inclinations. Everything else is the tangent subtraction formula.",
    },
    { type: "heading", text: "The difference of two inclinations" },
    {
      type: "text",
      content:
        "Let $L_1$ and $L_2$ have inclinations $\\alpha_1 > \\alpha_2$ and slopes $m_1 = \\tan\\alpha_1$, $m_2 = \\tan\\alpha_2$. Look at the triangle formed by the two lines and the x-axis: the exterior angle at the crossing of $L_1$ with the axis equals the interior opposite angles added, so the angle between the lines is $\\theta = \\alpha_1 - \\alpha_2$. Take the tangent of both sides:",
    },
    {
      type: "math",
      latex:
        "\\tan\\theta = \\tan(\\alpha_1 - \\alpha_2) = \\frac{\\tan\\alpha_1 - \\tan\\alpha_2}{1 + \\tan\\alpha_1\\tan\\alpha_2} = \\frac{m_1 - m_2}{1 + m_1m_2}",
    },
    {
      type: "text",
      content:
        "This value may be negative: then $\\theta$ is the **obtuse** angle between the lines, and the acute one is its supplement, whose tangent is the same number with the sign flipped. Taking the modulus always gives the acute angle.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Angle between two lines",
      content:
        "If two lines have slopes $m_1$ and $m_2$, the **acute** angle $\\theta$ between them satisfies\n\n$$\\tan\\theta = \\left\\lvert \\frac{m_1 - m_2}{1 + m_1m_2} \\right\\rvert$$\n\nand the obtuse angle is $180^\\circ - \\theta$.\n\n- **Parallel** (or coincident): $m_1 = m_2$, so $\\tan\\theta = 0$.\n- **Perpendicular**: $1 + m_1m_2 = 0$, i.e. $m_1m_2 = -1$; the fraction has no value because $\\theta = 90^\\circ$.\n- **One line vertical** (no slope): if the other has inclination $\\alpha$, the angle is $\\lvert 90^\\circ - \\alpha\\rvert$, so $\\tan\\theta = \\left\\lvert\\frac{1}{m}\\right\\rvert$.",
    },
    {
      type: "interactive",
      config: {
        component: "slc-line-explorer",
        mode: "two-lines",
        a: [-4, -2],
        b: [4, 2],
        c: [-3, -3],
        d: [3, 3],
        caption:
          "$L_1$ runs through $A$ and $B$, $L_2$ through $C$ and $D$. Drag the points and watch the acute angle readout. Make the slopes equal (parallel), then make their product $-1$ (perpendicular), and notice that the formula's denominator $1 + m_1m_2$ passes through zero exactly there.",
      },
    },
    {
      type: "worked-example",
      id: "slc2-1-we1",
      title: "Worked example 1: the angle from two slopes",
      problem: "Find the acute angle between $y = 3x + 1$ and $y = -2x + 5$.",
      steps: [
        { text: "Read the slopes: $m_1 = 3$, $m_2 = -2$." },
        {
          text: "Substitute. *Why this step:* the order of $m_1$ and $m_2$ does not matter once the modulus is taken.",
          latex: "\\tan\\theta = \\left\\lvert\\frac{3 - (-2)}{1 + 3(-2)}\\right\\rvert = \\left\\lvert\\frac{5}{-5}\\right\\rvert = 1",
        },
        { text: "So $\\theta = 45^\\circ$. Without the modulus we would have got $\\tan\\theta = -1$, which is the obtuse angle $135^\\circ$." },
      ],
      answer: "$45^\\circ$ (the other angle at the crossing is $135^\\circ$).",
    },
    { type: "heading", text: "The angle from the general form" },
    {
      type: "text",
      content:
        "For $a_1x + b_1y + c_1 = 0$ the vector $(a_1, b_1)$ is perpendicular to the line (Chapter 1: it is a **normal**). The angle between two lines equals the angle between their normals, or its supplement, because rotating both lines by $90^\\circ$ changes nothing. The dot product of the normals gives the cosine directly:",
    },
    {
      type: "math",
      latex: "\\cos\\theta = \\frac{\\lvert a_1a_2 + b_1b_2\\rvert}{\\sqrt{a_1^2 + b_1^2}\\,\\sqrt{a_2^2 + b_2^2}}",
    },
    {
      type: "text",
      content:
        "This version never divides by $b$, so it handles vertical lines without a special case. It also gives the perpendicularity test in its cleanest form: $a_1a_2 + b_1b_2 = 0$.",
    },
    {
      type: "worked-example",
      id: "slc2-1-we2",
      title: "Worked example 2: both formulas on one pair",
      problem: "Find the acute angle between $2x - y + 3 = 0$ and $x + 3y - 4 = 0$.",
      steps: [
        { text: "Slopes: $m_1 = -\\frac{a}{b} = 2$ and $m_2 = -\\frac13$." },
        {
          text: "Slope formula:",
          latex: "\\tan\\theta = \\left\\lvert\\frac{2 + \\frac13}{1 - \\frac23}\\right\\rvert = \\frac{7/3}{1/3} = 7",
        },
        {
          text: "Check with the normals $(2, -1)$ and $(1, 3)$. *Why this step:* two independent routes to the same angle catch sign slips.",
          latex: "\\cos\\theta = \\frac{\\lvert 2 - 3\\rvert}{\\sqrt5\\,\\sqrt{10}} = \\frac{1}{5\\sqrt2}",
        },
        { text: "Consistent: $\\cos\\theta = \\frac{1}{\\sqrt{50}}$ gives $\\sin\\theta = \\frac{7}{\\sqrt{50}}$ and $\\tan\\theta = 7$." },
      ],
      answer: "$\\theta = \\tan^{-1} 7 \\approx 81.9^\\circ$.",
    },
    {
      type: "worked-example",
      id: "slc2-1-we3",
      title: "Worked example 3: when one line is vertical",
      problem: "Find the acute angle between $x = 2$ and $y = \\sqrt3\\,x + 1$.",
      steps: [
        { text: "The slope formula fails because $x = 2$ has no slope. Go back to the picture: $x = 2$ has inclination $90^\\circ$." },
        { text: "$y = \\sqrt3\\,x + 1$ has slope $\\sqrt3$, so inclination $60^\\circ$." },
        { text: "The angle is the difference of inclinations: $90^\\circ - 60^\\circ = 30^\\circ$. (General form check: normals $(1, 0)$ and $(\\sqrt3, -1)$ give $\\cos\\theta = \\frac{\\sqrt3}{2}$.)" },
      ],
      answer: "$30^\\circ$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the formula gives the angle\"",
      content:
        "Without the modulus, $\\frac{m_1 - m_2}{1 + m_1m_2}$ gives the tangent of **one** of the two angles, and which one depends on the order you chose. If it comes out negative, you are looking at the obtuse angle. Questions that say \"the angle between the lines\" mean the acute one unless they say otherwise.",
    },
    { type: "heading", text: "Angles of a triangle from its sides" },
    {
      type: "text",
      content:
        "The angle formula always returns the acute angle between two **lines**. The interior angle of a triangle at a vertex may be obtuse, so decide which one you need from the picture, or use the vectors along the two sides from that vertex: the sign of their dot product says acute or obtuse.",
    },
    {
      type: "worked-example",
      id: "slc2-1-we4",
      title: "Worked example 4: the angles of a triangle",
      problem: "Find the angles of the triangle with vertices $A(0, 0)$, $B(4, 0)$ and $C(1, 3)$.",
      steps: [
        { text: "Slopes of the sides: $AB$: $0$; $AC$: $3$; $BC$: $\\frac{3 - 0}{1 - 4} = -1$." },
        { text: "At $A$, between $AB$ and $AC$: $\\tan A = \\left\\lvert\\frac{3 - 0}{1 + 0}\\right\\rvert = 3$. The interior angle is acute (vectors $(4, 0)$ and $(1, 3)$ have dot product $4 > 0$), so $A = \\tan^{-1} 3$." },
        { text: "At $B$, between $BA$ and $BC$: $\\tan B = \\left\\lvert\\frac{-1 - 0}{1 + 0}\\right\\rvert = 1$, and the vectors $(-4, 0)$, $(-3, 3)$ have dot product $12 > 0$, so $B = 45^\\circ$." },
        { text: "At $C$: $\\tan C = \\left\\lvert\\frac{3 - (-1)}{1 + 3(-1)}\\right\\rvert = 2$, and the vectors $(-1, -3)$, $(3, -3)$ have dot product $6 > 0$, so $C = \\tan^{-1} 2$. *Why this step:* the check $\\tan^{-1} 3 + 45^\\circ + \\tan^{-1} 2 = 180^\\circ$ holds, since $\\tan^{-1} 3 + \\tan^{-1} 2 = 135^\\circ$." },
      ],
      answer: "$A = \\tan^{-1} 3 \\approx 71.6^\\circ$, $B = 45^\\circ$, $C = \\tan^{-1} 2 \\approx 63.4^\\circ$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "slc2-1-q1",
      variant: "practice",
      question: "Find the acute angle, in degrees, between $y = 2x + 1$ and $y = -3x + 4$.",
      answer: 45,
      unit: "degrees",
      hint: "Use $\\tan\\theta = \\left\\lvert\\frac{m_1 - m_2}{1 + m_1m_2}\\right\\rvert$ with $m_1 = 2$, $m_2 = -3$.",
      solution: "$\\tan\\theta = \\left\\lvert\\frac{2 + 3}{1 - 6}\\right\\rvert = 1$, so $\\theta = 45^\\circ$.",
      commonMistakes: [
        { answer: 135, feedback: "That is the obtuse angle, from dropping the modulus. The question asks for the acute one." },
        { answer: 90, feedback: "Perpendicular needs $m_1m_2 = -1$; here $m_1m_2 = -6$." },
      ],
    },
    {
      type: "quiz",
      id: "slc2-1-q2",
      variant: "practice",
      question: "The acute angle between $\\sqrt3\\,x - y + 1 = 0$ and $x - \\sqrt3\\,y + 2 = 0$ is",
      options: [
        { text: "$30^\\circ$", correct: true, feedback: "Slopes $\\sqrt3$ and $\\frac{1}{\\sqrt3}$ are inclinations $60^\\circ$ and $30^\\circ$; the difference is $30^\\circ$." },
        { text: "$60^\\circ$", feedback: "$60^\\circ$ is the inclination of the first line, not the angle between the lines." },
        { text: "$45^\\circ$", feedback: "$\\tan\\theta = \\frac{\\sqrt3 - 1/\\sqrt3}{1 + 1} = \\frac{1}{\\sqrt3}$, not 1." },
        { text: "$90^\\circ$", feedback: "$m_1m_2 = \\sqrt3 \\cdot \\frac{1}{\\sqrt3} = 1$, not $-1$." },
      ],
      hint: "Find each slope $-\\frac ab$, then each inclination.",
    },
    {
      type: "numeric",
      id: "slc2-1-q3",
      variant: "practice",
      question: "Find $\\tan\\theta$, where $\\theta$ is the acute angle between $3x + y - 1 = 0$ and $x - 2y + 5 = 0$.",
      answer: 7,
      hint: "Slopes are $-3$ and $\\frac12$.",
      solution: "$\\tan\\theta = \\left\\lvert\\frac{-3 - \\frac12}{1 + (-3)\\frac12}\\right\\rvert = \\frac{7/2}{1/2} = 7$.",
      commonMistakes: [
        { answer: -7, feedback: "The acute angle has a positive tangent: take the modulus." },
        { answer: 1, feedback: "Check the slopes: $3x + y - 1 = 0$ has slope $-3$, and $x - 2y + 5 = 0$ has slope $+\\frac12$." },
      ],
    },
    {
      type: "quiz",
      id: "slc2-1-q4",
      variant: "concept",
      question: "For two lines with slopes $m_1$ and $m_2$, the expression $1 + m_1m_2$ equals zero. What does this say?",
      options: [
        { text: "The lines are perpendicular", correct: true, feedback: "$\\tan\\theta$ has a zero denominator, so $\\theta = 90^\\circ$." },
        { text: "The lines are parallel", feedback: "Parallel lines make the **numerator** $m_1 - m_2$ zero." },
        { text: "The lines meet at the origin", feedback: "Slopes say nothing about where the lines are, only their directions." },
        { text: "One of the lines is vertical", feedback: "A vertical line has no slope at all, so the expression would not even be defined." },
      ],
      hint: "When is $\\tan\\theta$ undefined?",
    },
    {
      type: "quiz",
      id: "slc2-1-q5",
      variant: "practice",
      multiple: true,
      question: "Which pairs of lines are perpendicular? Select all that apply.",
      options: [
        { text: "$2x + 3y = 5$ and $3x - 2y = 1$", correct: true, feedback: "$a_1a_2 + b_1b_2 = 6 - 6 = 0$." },
        { text: "$y = 2x$ and $y = -\\frac12 x$", correct: true, feedback: "$2 \\cdot \\left(-\\frac12\\right) = -1$." },
        { text: "$x = 3$ and $y = -1$", correct: true, feedback: "A vertical and a horizontal line: the product rule does not apply, but the normals $(1, 0)$ and $(0, 1)$ are perpendicular." },
        { text: "$x + y = 1$ and $x + y = 5$", feedback: "Same slope $-1$: these are parallel." },
        { text: "$3x + 4y = 0$ and $4x + 3y = 0$", feedback: "$a_1a_2 + b_1b_2 = 12 + 12 = 24 \\ne 0$. Swapping the coefficients is not enough; one sign must change too." },
      ],
      hint: "Use $a_1a_2 + b_1b_2 = 0$, which also works for vertical and horizontal lines.",
    },
    {
      type: "numeric",
      id: "slc2-1-q6",
      variant: "practice",
      question: "Find the acute angle, in degrees, between the lines $x = 5$ and $\\sqrt3\\,x + y = 1$.",
      answer: 30,
      unit: "degrees",
      hint: "The first line is vertical (inclination $90^\\circ$). Find the inclination of the second from its slope.",
      solution: "The second line has slope $-\\sqrt3$, inclination $120^\\circ$. The angle between inclinations $90^\\circ$ and $120^\\circ$ is $30^\\circ$.",
      commonMistakes: [
        { answer: 60, feedback: "$60^\\circ$ is the angle the second line makes with the x-axis. The first line is the vertical $x = 5$." },
        { answer: 120, feedback: "That is the inclination of $\\sqrt3\\,x + y = 1$, not an angle between the two lines." },
      ],
    },
    {
      type: "numeric",
      id: "slc2-1-q7",
      variant: "practice",
      question: "The acute angle between $y = kx$ and $y = 3x$ is $45^\\circ$. Find the positive value of $k$.",
      answer: 0.5,
      hint: "Set $\\left\\lvert\\frac{k - 3}{1 + 3k}\\right\\rvert = 1$ and solve both sign cases.",
      solution: "$k - 3 = 1 + 3k$ gives $k = -2$. $k - 3 = -(1 + 3k)$ gives $4k = 2$, $k = \\frac12$. The positive value is $\\frac12$. Check: $\\left\\lvert\\frac{0.5 - 3}{1 + 1.5}\\right\\rvert = 1$.",
      commonMistakes: [
        { answer: -2, feedback: "$k = -2$ also works, but the question asks for the positive value." },
        { answer: 2, feedback: "Solve $k - 3 = -(1 + 3k)$ carefully: $4k = 2$." },
      ],
    },
    {
      type: "numeric",
      id: "slc2-1-q8",
      variant: "practice",
      question: "Find $\\cos\\theta$, where $\\theta$ is the acute angle between $3x + 4y = 7$ and $5x - 12y = 1$. (A fraction such as 3/4 is fine.)",
      answer: 0.5076923,
      tolerance: 0.001,
      hint: "Use the normals $(3, 4)$ and $(5, -12)$ and $\\cos\\theta = \\frac{\\lvert a_1a_2 + b_1b_2\\rvert}{\\sqrt{a_1^2 + b_1^2}\\sqrt{a_2^2 + b_2^2}}$.",
      solution: "$a_1a_2 + b_1b_2 = 15 - 48 = -33$, and the lengths are 5 and 13. So $\\cos\\theta = \\frac{33}{65}$. The negative sign of $-33$ only says the normals make the obtuse angle.",
      commonMistakes: [
        { answer: -0.5076923, tolerance: 0.001, feedback: "Take the modulus: the acute angle has a positive cosine." },
        { answer: 0.9692308, tolerance: 0.001, feedback: "That uses $15 + 48$; the product of the $y$-coefficients is $4 \\times (-12) = -48$." },
      ],
    },
    {
      type: "quiz",
      id: "slc2-1-q9",
      variant: "practice",
      question:
        "JEE Main. The triangle formed by the lines $y = (2 - \\sqrt3)x$, $y = (2 + \\sqrt3)x$ and $x + y = 2$ is",
      options: [
        { text: "equilateral", correct: true, feedback: "$2 - \\sqrt3 = \\tan 15^\\circ$ and $2 + \\sqrt3 = \\tan 75^\\circ$, and $x + y = 2$ has inclination $135^\\circ$. Each pair of inclinations differs by $60^\\circ$ (or $120^\\circ$), so every angle is $60^\\circ$." },
        { text: "right-angled", feedback: "$(2 - \\sqrt3)(2 + \\sqrt3) = 1$, not $-1$, and no pair has product $-1$." },
        { text: "isosceles but not equilateral", feedback: "It is isosceles, but all three angles come out equal." },
        { text: "obtuse-angled", feedback: "Find the three inclinations: $15^\\circ$, $75^\\circ$ and $135^\\circ$. No angle exceeds $60^\\circ$." },
      ],
      hint: "Recognise $\\tan 15^\\circ = 2 - \\sqrt3$ and $\\tan 75^\\circ = 2 + \\sqrt3$, then compare inclinations.",
    },
    {
      type: "quiz",
      id: "slc2-1-q10",
      variant: "concept",
      multiple: true,
      question:
        "Which statements about $\\tan\\theta = \\left\\lvert\\frac{m_1 - m_2}{1 + m_1m_2}\\right\\rvert$ are true? Select all that apply.",
      options: [
        { text: "It gives the acute angle between the lines", correct: true, feedback: "The modulus makes the tangent non-negative, which is the acute angle." },
        { text: "$m_1 = m_2$ gives $\\theta = 0$: the lines are parallel or coincident", correct: true, feedback: "The numerator vanishes." },
        { text: "Without the modulus, a negative value means the angle computed is obtuse", correct: true, feedback: "$\\tan$ is negative on $(90^\\circ, 180^\\circ)$." },
        { text: "It works unchanged when one line is vertical", feedback: "A vertical line has no slope. Use inclinations or the general-form cosine instead." },
        { text: "It simplifies to $\\tan\\theta = \\lvert m_1 - m_2\\rvert$", feedback: "The denominator $1 + m_1m_2$ matters: it is what makes perpendicular lines give $90^\\circ$." },
      ],
      hint: "Think about where the formula came from: $\\tan(\\alpha_1 - \\alpha_2)$.",
    },
    {
      type: "numeric",
      id: "slc2-1-q11",
      variant: "practice",
      question:
        "JEE Main. A line of slope $m > 0$ makes an acute angle $\\theta$ with $y = 2x$, where $\\tan\\theta = \\frac13$. Find the larger possible value of $m$.",
      answer: 7,
      hint: "Solve $\\left\\lvert\\frac{m - 2}{1 + 2m}\\right\\rvert = \\frac13$, one sign at a time.",
      solution: "$3(m - 2) = 1 + 2m$ gives $m = 7$. $3(m - 2) = -(1 + 2m)$ gives $5m = 5$, $m = 1$. Both are positive; the larger is 7. Check: $\\frac{7 - 2}{1 + 14} = \\frac13$.",
      commonMistakes: [
        { answer: 1, feedback: "$m = 1$ is the smaller solution. Both lines make the angle; the question wants the larger slope." },
        { answer: 5, feedback: "From $3(m - 2) = 1 + 2m$: $3m - 6 = 1 + 2m$, so $m = 7$." },
      ],
    },
    {
      type: "numeric",
      id: "slc2-1-q12",
      variant: "practice",
      question: "Find the angle, in degrees, at vertex $A$ of the triangle with vertices $A(1, 1)$, $B(4, 2)$ and $C(0, 4)$.",
      answer: 90,
      unit: "degrees",
      hint: "Find the slopes of $AB$ and $AC$ and multiply them.",
      solution: "Slope of $AB$ is $\\frac13$, slope of $AC$ is $\\frac{3}{-1} = -3$. Their product is $-1$, so $A = 90^\\circ$.",
      commonMistakes: [
        { answer: 45, feedback: "Recompute the slope of $AC$: from $(1, 1)$ to $(0, 4)$ is rise 3 over run $-1$." },
        { answer: 0, feedback: "The slopes $\\frac13$ and $-3$ are different, so the sides are not parallel." },
      ],
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "distance-of-a-point-from-a-line",
  title: "2.2 · Distance of a Point from a Line",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "Stand at a point $P$ off a straight road. The shortest walk to the road is the one that meets it at a right angle; any slanted path is the hypotenuse of a right triangle and so is longer. That perpendicular length is what \"the distance of a point from a line\" means.",
    },
    {
      type: "text",
      content:
        "This lesson turns that perpendicular into one formula in the coefficients of $ax + by + c = 0$, then uses it for parallel lines, lines at a given distance, altitudes and parallelograms.",
    },
    { type: "heading", text: "The formula and where it comes from" },
    {
      type: "interactive",
      config: {
        component: "slc-line-explorer",
        mode: "point-line",
        a: [-4, -1],
        b: [4, 3],
        p: [1, 4],
        show: ["foot"],
        caption:
          "Drag $P$. The perpendicular from $P$ meets the line at a right angle, at the foot, and its length is the distance. Slide $P$ parallel to the line: the distance does not change. Move it straight towards the line: the distance shrinks to 0 as $L(P)$ does.",
      },
    },
    {
      type: "text",
      content:
        "Write $L(x, y) = ax + by + c$. The vector $\\vec n = (a, b)$ is perpendicular to the line. Pick any point $Q(x_0, y_0)$ on the line, so $ax_0 + by_0 + c = 0$. The distance from $P(x_1, y_1)$ to the line is the length of the shadow of $\\overrightarrow{QP}$ on the normal direction:",
    },
    {
      type: "math",
      latex:
        "d = \\frac{\\lvert \\overrightarrow{QP} \\cdot \\vec n \\rvert}{\\lvert \\vec n \\rvert} = \\frac{\\lvert a(x_1 - x_0) + b(y_1 - y_0) \\rvert}{\\sqrt{a^2 + b^2}} = \\frac{\\lvert ax_1 + by_1 + c \\rvert}{\\sqrt{a^2 + b^2}}",
    },
    {
      type: "text",
      content:
        "The last step uses $-ax_0 - by_0 = c$. The choice of $Q$ drops out, as it must. If you prefer no vectors: the line meets the axes at $\\left(-\\frac ca, 0\\right)$ and $\\left(0, -\\frac cb\\right)$; computing the area of the triangle these make with $P$ in two ways (determinant, and $\\frac12 \\times \\text{base} \\times \\text{height}$) gives the same formula.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Distance of a point from a line",
      content:
        "The perpendicular distance of $P(x_1, y_1)$ from $ax + by + c = 0$ is\n\n$$d = \\frac{\\lvert ax_1 + by_1 + c\\rvert}{\\sqrt{a^2 + b^2}} = \\frac{\\lvert L(P)\\rvert}{\\sqrt{a^2 + b^2}}$$\n\nIn particular the distance of the origin is $\\frac{\\lvert c\\rvert}{\\sqrt{a^2 + b^2}}$, and the distance from the normal form $x\\cos\\alpha + y\\sin\\alpha = p$ is $\\lvert x_1\\cos\\alpha + y_1\\sin\\alpha - p\\rvert$.",
    },
    {
      type: "worked-example",
      id: "slc2-2-we1",
      title: "Worked example 1: plug in",
      problem: "Find the distance of $(3, -2)$ from $4x - 3y + 2 = 0$.",
      steps: [
        { text: "$L(3, -2) = 12 + 6 + 2 = 20$." },
        { text: "$\\sqrt{a^2 + b^2} = \\sqrt{16 + 9} = 5$. *Why this step:* dividing by the length of the normal turns $L(P)$, which depends on how the equation was scaled, into a true length." },
        { text: "$d = \\frac{20}{5} = 4$." },
      ],
      answer: "$4$ units.",
    },
    { type: "heading", text: "Distance between parallel lines" },
    {
      type: "text",
      content:
        "Two parallel lines can be written with the **same** $a$ and $b$: $ax + by + c_1 = 0$ and $ax + by + c_2 = 0$. Take any point on the first, say $P$ with $aP_x + bP_y = -c_1$, and measure its distance from the second: $\\frac{\\lvert -c_1 + c_2\\rvert}{\\sqrt{a^2 + b^2}}$.",
    },
    {
      type: "math",
      latex: "d = \\frac{\\lvert c_1 - c_2 \\rvert}{\\sqrt{a^2 + b^2}} \\qquad \\text{(only after making } a, b \\text{ identical)}",
    },
    {
      type: "worked-example",
      id: "slc2-2-we2",
      title: "Worked example 2: match the coefficients first",
      problem: "Find the distance between $3x + 4y = 9$ and $6x + 8y + 2 = 0$.",
      steps: [
        { text: "Divide the second equation by 2: $3x + 4y + 1 = 0$. *Why this step:* the formula subtracts the constants, which only makes sense when the $x$ and $y$ parts are identical." },
        { text: "The first line is $3x + 4y - 9 = 0$, so $c_1 = -9$, $c_2 = 1$." },
        { text: "$d = \\frac{\\lvert -9 - 1\\rvert}{\\sqrt{9 + 16}} = \\frac{10}{5} = 2$." },
      ],
      answer: "$2$ units.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"subtract the constants as written\"",
      content:
        "For $3x + 4y - 9 = 0$ and $6x + 8y + 2 = 0$, the careless answer $\\frac{\\lvert -9 - 2\\rvert}{5} = 2.2$ is wrong. The second equation must first be scaled to $3x + 4y + 1 = 0$. Lines with proportional but unequal coefficients are the same family written at different scales.",
    },
    {
      type: "worked-example",
      id: "slc2-2-we3",
      title: "Worked example 3: lines at a given distance",
      problem: "Find the lines parallel to $3x - 4y + 1 = 0$ at a distance of 2 units from it.",
      steps: [
        { text: "Every parallel line is $3x - 4y + c = 0$." },
        { text: "Distance condition: $\\frac{\\lvert c - 1\\rvert}{5} = 2$, so $c - 1 = \\pm 10$. *Why this step:* the modulus produces two lines, one on each side, as the picture demands." },
        { text: "$c = 11$ or $c = -9$." },
      ],
      answer: "$3x - 4y + 11 = 0$ and $3x - 4y - 9 = 0$.",
    },
    { type: "heading", text: "Area of a parallelogram from four lines" },
    {
      type: "text",
      content:
        "A parallelogram whose sides lie on two pairs of parallel lines has two heights: $d_1$ (between the first pair) and $d_2$ (between the second). If $\\theta$ is the angle between the pairs, one side has length $\\frac{d_2}{\\sin\\theta}$ and the height on it is $d_1$, so the area is $\\frac{d_1d_2}{\\sin\\theta}$. Writing everything in coefficients, for sides $a_1x + b_1y + c_1 = 0$, $a_1x + b_1y + d_1' = 0$, $a_2x + b_2y + c_2 = 0$, $a_2x + b_2y + d_2' = 0$:",
    },
    {
      type: "math",
      latex: "\\text{Area} = \\frac{\\lvert (c_1 - d_1')(c_2 - d_2') \\rvert}{\\lvert a_1b_2 - a_2b_1 \\rvert}",
    },
    {
      type: "worked-example",
      id: "slc2-2-we4",
      title: "Worked example 4: a parallelogram",
      problem: "Find the area of the parallelogram whose sides lie on $y = 0$, $y = 2$, $y = x$ and $y = x + 4$.",
      steps: [
        { text: "Heights: $d_1 = 2$ (between $y = 0$ and $y = 2$); $d_2 = \\frac{\\lvert 0 - 4\\rvert}{\\sqrt2} = 2\\sqrt2$ (between $x - y = 0$ and $x - y + 4 = 0$)." },
        { text: "The pairs meet at $45^\\circ$, so $\\sin\\theta = \\frac{1}{\\sqrt2}$." },
        { text: "Area $= \\frac{2 \\times 2\\sqrt2}{1/\\sqrt2} = 8$. *Why this step:* check by the picture: the strip $0 \\le y \\le 2$ cut by two parallel lines 4 apart horizontally has base 4 and height 2." },
      ],
      answer: "$8$ square units.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "slc2-2-q1",
      variant: "practice",
      question: "Find the distance of the point $(2, 3)$ from the line $3x + 4y - 8 = 0$.",
      answer: 2,
      hint: "$d = \\frac{\\lvert ax_1 + by_1 + c\\rvert}{\\sqrt{a^2 + b^2}}$.",
      solution: "$\\frac{\\lvert 6 + 12 - 8\\rvert}{5} = \\frac{10}{5} = 2$.",
      commonMistakes: [
        { answer: 10, feedback: "Divide $\\lvert L(P)\\rvert$ by $\\sqrt{a^2 + b^2} = 5$." },
        { answer: 1.6, feedback: "That ignores the constant $-8$: $L(P) = 6 + 12 - 8$." },
      ],
    },
    {
      type: "numeric",
      id: "slc2-2-q2",
      variant: "practice",
      question: "Find the distance of the origin from $5x - 12y + 39 = 0$.",
      answer: 3,
      hint: "For the origin, $L(O) = c$.",
      solution: "$\\frac{\\lvert 39\\rvert}{\\sqrt{25 + 144}} = \\frac{39}{13} = 3$.",
      commonMistakes: [
        { answer: 39, feedback: "Divide by $\\sqrt{a^2 + b^2} = 13$." },
        { answer: 2.294, tolerance: 0.01, feedback: "That divides by $5 + 12 = 17$. The divisor is $\\sqrt{5^2 + 12^2} = 13$." },
      ],
    },
    {
      type: "numeric",
      id: "slc2-2-q3",
      variant: "practice",
      question: "Find the distance between the parallel lines $3x + 4y = 7$ and $6x + 8y + 1 = 0$.",
      answer: 1.5,
      hint: "Rewrite the second line with $x$-coefficient 3 before subtracting constants.",
      solution: "The second line is $3x + 4y + \\frac12 = 0$; the first is $3x + 4y - 7 = 0$. $d = \\frac{\\lvert -7 - \\frac12\\rvert}{5} = \\frac{7.5}{5} = 1.5$.",
      commonMistakes: [
        { answer: 1.6, feedback: "You subtracted the constants $-7$ and $1$ without scaling. Halve the second equation first." },
        { answer: 0.8, feedback: "Using $\\sqrt{36 + 64} = 10$ with constants $7$ and $1$ mixes two scalings." },
      ],
    },
    {
      type: "quiz",
      id: "slc2-2-q4",
      variant: "concept",
      question: "The distance of $(x_1, y_1)$ from the line $x\\cos\\alpha + y\\sin\\alpha = p$ is",
      options: [
        { text: "$\\lvert x_1\\cos\\alpha + y_1\\sin\\alpha - p\\rvert$", correct: true, feedback: "Here $a^2 + b^2 = \\cos^2\\alpha + \\sin^2\\alpha = 1$, so there is nothing to divide by." },
        { text: "$\\frac{\\lvert x_1\\cos\\alpha + y_1\\sin\\alpha - p\\rvert}{p}$", feedback: "The divisor is $\\sqrt{a^2 + b^2}$, which is 1 for the normal form, not $p$." },
        { text: "$\\lvert x_1\\cos\\alpha + y_1\\sin\\alpha + p\\rvert$", feedback: "Move $p$ to the left first: the line is $x\\cos\\alpha + y\\sin\\alpha - p = 0$." },
        { text: "$p - x_1\\cos\\alpha - y_1\\sin\\alpha$", feedback: "Without a modulus this can be negative. Distances are not." },
      ],
      hint: "What is $\\sqrt{a^2 + b^2}$ when $a = \\cos\\alpha$ and $b = \\sin\\alpha$?",
    },
    {
      type: "numeric",
      id: "slc2-2-q5",
      variant: "practice",
      question: "The point $(1, k)$ is at distance 3 from $4x - 3y + 2 = 0$. Find the positive value of $k$.",
      answer: 7,
      hint: "Set $\\frac{\\lvert 4 - 3k + 2\\rvert}{5} = 3$ and solve both cases.",
      solution: "$\\lvert 6 - 3k\\rvert = 15$, so $6 - 3k = 15$ ($k = -3$) or $6 - 3k = -15$ ($k = 7$). The positive value is 7.",
      commonMistakes: [
        { answer: -3, feedback: "That is the other point at distance 3. The question wants the positive $k$." },
        { answer: 3, feedback: "Solve $6 - 3k = -15$: $3k = 21$." },
      ],
    },
    {
      type: "quiz",
      id: "slc2-2-q6",
      variant: "practice",
      multiple: true,
      question: "Which lines are at distance exactly 1 from the origin? Select all that apply.",
      options: [
        { text: "$3x + 4y = 5$", correct: true, feedback: "$\\frac{5}{5} = 1$." },
        { text: "$x + y = 1$", feedback: "$\\frac{1}{\\sqrt2} \\approx 0.71$." },
        { text: "$5x - 12y + 13 = 0$", correct: true, feedback: "$\\frac{13}{13} = 1$." },
        { text: "$2x + y = \\sqrt5$", correct: true, feedback: "$\\frac{\\sqrt5}{\\sqrt5} = 1$." },
        { text: "$4x - 3y = 4$", feedback: "$\\frac45 = 0.8$." },
      ],
      hint: "For the origin the distance is $\\frac{\\lvert c\\rvert}{\\sqrt{a^2 + b^2}}$.",
    },
    {
      type: "numeric",
      id: "slc2-2-q7",
      variant: "practice",
      question: "In triangle $ABC$ with $A(4, -2)$, $B(0, 0)$ and $C(4, 3)$, find the length of the altitude from $A$.",
      answer: 4,
      hint: "The altitude from $A$ is the distance of $A$ from the line $BC$.",
      solution: "Line $BC$ through $(0, 0)$ and $(4, 3)$: $3x - 4y = 0$. Distance of $A$: $\\frac{\\lvert 12 + 8\\rvert}{5} = 4$.",
      commonMistakes: [
        { answer: 5, feedback: "5 is the length of $BC$. The altitude is the perpendicular from $A$." },
        { answer: 0.8, feedback: "Check $L(A)$: $3(4) - 4(-2) = 12 + 8 = 20$." },
      ],
    },
    {
      type: "quiz",
      id: "slc2-2-q8",
      variant: "concept",
      question:
        "A student computes the distance between $2x + 3y - 4 = 0$ and $4x + 6y + 6 = 0$ as $\\frac{\\lvert -4 - 6\\rvert}{\\sqrt{13}}$. What went wrong?",
      options: [
        { text: "The second line must first be written as $2x + 3y + 3 = 0$", correct: true, feedback: "Then $d = \\frac{\\lvert -4 - 3\\rvert}{\\sqrt{13}} = \\frac{7}{\\sqrt{13}}$." },
        { text: "Nothing: the answer is right", feedback: "The constants $-4$ and $6$ belong to equations scaled differently, so they cannot be compared." },
        { text: "The divisor should be $\\sqrt{13} + \\sqrt{52}$", feedback: "There is a single divisor $\\sqrt{a^2 + b^2}$ once the equations share $a$ and $b$." },
        { text: "The constants should be added, not subtracted", feedback: "The formula is $\\lvert c_1 - c_2\\rvert$; the error is in the scaling." },
      ],
      hint: "When is $\\frac{\\lvert c_1 - c_2\\rvert}{\\sqrt{a^2 + b^2}}$ allowed?",
    },
    {
      type: "quiz",
      id: "slc2-2-q9",
      variant: "practice",
      question: "The lines $5x + 12y = c$ that are at distance 2 from the point $(1, 1)$ have",
      options: [
        { text: "$c = 43$ or $c = -9$", correct: true, feedback: "$\\frac{\\lvert 17 - c\\rvert}{13} = 2$ gives $c = 17 \\pm 26$." },
        { text: "$c = 9$ or $c = -43$", feedback: "Sign slip: the line is $5x + 12y - c = 0$, so $L(1, 1) = 17 - c$." },
        { text: "$c = 15$ or $c = 19$", feedback: "That is $17 \\pm 2$: the 2 must be multiplied by $\\sqrt{25 + 144} = 13$." },
        { text: "$c = 26$ only", feedback: "There are two such lines, one on each side of the point." },
      ],
      hint: "Write the line as $5x + 12y - c = 0$ and set its distance from $(1, 1)$ equal to 2.",
    },
    {
      type: "numeric",
      id: "slc2-2-q10",
      variant: "practice",
      question:
        "JEE Main. The equation $9x^2 - 6xy + y^2 + 18x - 6y + 8 = 0$ represents two parallel lines. Find the distance between them (to two decimal places).",
      answer: 0.6325,
      tolerance: 0.01,
      hint: "Put $t = 3x - y$: the equation becomes $t^2 + 6t + 8 = 0$.",
      solution: "$(3x - y)^2 + 6(3x - y) + 8 = 0$ factors as $(t + 2)(t + 4) = 0$: the lines $3x - y + 2 = 0$ and $3x - y + 4 = 0$. $d = \\frac{\\lvert 2 - 4\\rvert}{\\sqrt{10}} = \\frac{2}{\\sqrt{10}} \\approx 0.63$.",
      commonMistakes: [
        { answer: 2, feedback: "Divide $\\lvert c_1 - c_2\\rvert$ by $\\sqrt{3^2 + 1^2}$." },
        { answer: 0.5, feedback: "The normal $(3, -1)$ has length $\\sqrt{10}$, not 4." },
      ],
    },
    {
      type: "numeric",
      id: "slc2-2-q11",
      variant: "practice",
      question:
        "JEE Advanced. Find the area of the parallelogram whose sides lie on $x + 2y = 0$, $x + 2y = 5$, $2x + y = 0$ and $2x + y = 4$. (A fraction is fine.)",
      answer: 6.6667,
      tolerance: 0.01,
      hint: "Use $\\frac{\\lvert(c_1 - d_1)(c_2 - d_2)\\rvert}{\\lvert a_1b_2 - a_2b_1\\rvert}$, or $\\frac{d_1d_2}{\\sin\\theta}$.",
      solution: "$\\frac{\\lvert 5 \\cdot 4\\rvert}{\\lvert 1 \\cdot 1 - 2 \\cdot 2\\rvert} = \\frac{20}{3}$. Check: $d_1 = \\sqrt5$, $d_2 = \\frac{4}{\\sqrt5}$, and $\\cos\\theta = \\frac{4}{5}$ so $\\sin\\theta = \\frac35$; $\\frac{d_1d_2}{\\sin\\theta} = \\frac{4}{3/5} = \\frac{20}{3}$.",
      commonMistakes: [
        { answer: 4, feedback: "That is $d_1d_2$; divide by $\\sin\\theta = \\frac35$." },
        { answer: 20, feedback: "Divide by $\\lvert a_1b_2 - a_2b_1\\rvert = 3$." },
      ],
    },
    {
      type: "quiz",
      id: "slc2-2-q12",
      variant: "practice",
      multiple: true,
      question: "Which points on the x-axis are at distance 4 from the line $4x + 3y = 12$? Select all that apply.",
      options: [
        { text: "$(8, 0)$", correct: true, feedback: "$\\frac{\\lvert 32 - 12\\rvert}{5} = 4$." },
        { text: "$(-2, 0)$", correct: true, feedback: "$\\frac{\\lvert -8 - 12\\rvert}{5} = 4$." },
        { text: "$(2, 0)$", feedback: "$\\frac{\\lvert 8 - 12\\rvert}{5} = 0.8$." },
        { text: "$(-8, 0)$", feedback: "$\\frac{\\lvert -32 - 12\\rvert}{5} = 8.8$." },
        { text: "$(3, 0)$", feedback: "$(3, 0)$ lies on the line: distance 0." },
      ],
      hint: "Solve $\\frac{\\lvert 4h - 12\\rvert}{5} = 4$ for $h$.",
    },
    {
      type: "numeric",
      id: "slc2-2-q13",
      variant: "practice",
      question: "Find the distance between the lines $y = 2x + 3$ and $y = 2x - 2$ (to two decimal places).",
      answer: 2.2361,
      tolerance: 0.01,
      hint: "Write both as $2x - y + c = 0$.",
      solution: "$2x - y + 3 = 0$ and $2x - y - 2 = 0$: $d = \\frac{\\lvert 3 + 2\\rvert}{\\sqrt5} = \\sqrt5 \\approx 2.24$. The vertical gap between the lines is 5, but the perpendicular gap is shorter.",
      commonMistakes: [
        { answer: 5, feedback: "5 is the **vertical** distance between the lines. The perpendicular distance divides by $\\sqrt{1 + m^2} = \\sqrt5$." },
        { answer: 0.4472, tolerance: 0.01, feedback: "That is $\\frac{1}{\\sqrt5}$: the constants differ by 5, not 1." },
      ],
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "foot-of-the-perpendicular-and-image",
  title: "2.3 · Foot of the Perpendicular and Image of a Point",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "Lesson 2.2 measured **how far** the perpendicular from $P$ to a line is. Now we want **where** it lands (the foot $M$) and where $P$ would appear if the line were a mirror (the image $P'$). Both points sit on the same perpendicular through $P$: the foot one distance away, the image twice as far, on the other side.",
    },
    { type: "heading", text: "Walking along the normal" },
    {
      type: "text",
      content:
        "The perpendicular through $P(x_1, y_1)$ to $ax + by + c = 0$ runs in the direction of the normal $(a, b)$. Its points are $(x_1 + at,\\ y_1 + bt)$ for real $t$, with $t = 0$ at $P$. Find the value of $t$ that lands on the line:",
    },
    {
      type: "math",
      latex: "a(x_1 + at) + b(y_1 + bt) + c = 0 \\iff L(P) + t(a^2 + b^2) = 0 \\iff t = -\\frac{L(P)}{a^2 + b^2}",
    },
    {
      type: "text",
      content:
        "That $t$ gives the foot. The image is the point with $M$ as the midpoint of $PP'$, so it is reached by going twice as far along the same perpendicular: $t = -\\frac{2L(P)}{a^2 + b^2}$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Foot and image",
      content:
        "For $P(x_1, y_1)$ and the line $ax + by + c = 0$, with $L(P) = ax_1 + by_1 + c$:\n\n- **Foot of the perpendicular** $(h, k)$: $$\\frac{h - x_1}{a} = \\frac{k - y_1}{b} = -\\frac{L(P)}{a^2 + b^2}$$\n- **Image (reflection)** $(h, k)$: $$\\frac{h - x_1}{a} = \\frac{k - y_1}{b} = -\\frac{2L(P)}{a^2 + b^2}$$\n\nIf $a = 0$ or $b = 0$, read each fraction as \"the common value $t$\" with $h = x_1 + at$, $k = y_1 + bt$.",
    },
    {
      type: "interactive",
      config: {
        component: "slc-line-explorer",
        mode: "point-line",
        a: [-4, -2],
        b: [4, 2],
        p: [-1, 3],
        show: ["foot", "image"],
        caption:
          "Drag $P$ and watch the foot and the image. The foot is always the midpoint of $PP'$, and $PP'$ always meets the line at a right angle. Put $P$ on the line: the foot, the image and $P$ become one point because $L(P) = 0$.",
      },
    },
    {
      type: "worked-example",
      id: "slc2-3-we1",
      title: "Worked example 1: foot and image together",
      problem: "Find the foot of the perpendicular and the image of $P(3, 4)$ in the line $x + y - 3 = 0$.",
      steps: [
        { text: "$L(P) = 3 + 4 - 3 = 4$ and $a^2 + b^2 = 2$." },
        { text: "Foot: $t = -\\frac42 = -2$, so $M = (3 - 2,\\ 4 - 2) = (1, 2)$." },
        { text: "Image: $t = -4$, so $P' = (3 - 4,\\ 4 - 4) = (-1, 0)$. *Why this step:* a quick check that the midpoint of $(3, 4)$ and $(-1, 0)$ is $(1, 2)$ confirms both answers at once." },
      ],
      answer: "Foot $(1, 2)$, image $(-1, 0)$.",
    },
    {
      type: "worked-example",
      id: "slc2-3-we2",
      title: "Worked example 2: an image with fractions",
      problem: "Find the image of $(1, 2)$ in the line $3x - 4y + 15 = 0$.",
      steps: [
        { text: "$L(1, 2) = 3 - 8 + 15 = 10$, $a^2 + b^2 = 25$." },
        { text: "$t = -\\frac{2 \\cdot 10}{25} = -\\frac45$." },
        { text: "$h = 1 + 3\\left(-\\frac45\\right) = -\\frac75$ and $k = 2 + (-4)\\left(-\\frac45\\right) = \\frac{26}{5}$. *Why this step:* keep the sign of $b = -4$; it is what makes $k$ larger than 2." },
      ],
      answer: "$\\left(-\\frac75, \\frac{26}{5}\\right)$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the image uses the same t as the foot\"",
      content:
        "The foot is halfway to the image. If you forget the factor 2 you get the foot and call it the image; if you put the 2 in the foot formula you get the image and call it the foot. Check every answer with the midpoint: $M$ must be the midpoint of $P$ and $P'$.",
    },
    { type: "heading", text: "Reflections in special lines" },
    {
      type: "table",
      headers: ["Mirror line", "Image of $(a, b)$", "Why"],
      rows: [
        ["x-axis ($y = 0$)", "$(a, -b)$", "the perpendicular is vertical"],
        ["y-axis ($x = 0$)", "$(-a, b)$", "the perpendicular is horizontal"],
        ["$y = x$", "$(b, a)$", "the coordinates swap"],
        ["$y = -x$", "$(-b, -a)$", "swap and negate"],
        ["$x = k$", "$(2k - a, b)$", "$k$ is the midpoint of $a$ and the image"],
        ["$y = k$", "$(a, 2k - b)$", "$k$ is the midpoint of $b$ and the image"],
      ],
    },
    {
      type: "worked-example",
      id: "slc2-3-we3",
      title: "Worked example 3: the formula agrees with the table",
      problem: "Use the image formula to reflect $(a, b)$ in $y = x$.",
      steps: [
        { text: "Write the mirror as $x - y = 0$, so $L(a, b) = a - b$ and the normal is $(1, -1)$ with $a^2 + b^2 = 2$ (here the letters in the formula are the coefficients 1 and $-1$)." },
        { text: "$t = -\\frac{2(a - b)}{2} = b - a$." },
        { text: "Image: $(a + 1 \\cdot (b - a),\\ b + (-1)(b - a)) = (b, a)$. *Why this step:* deriving a remembered shortcut from the general formula once is the best guard against misremembering it later." },
      ],
      answer: "$(b, a)$: the coordinates swap.",
    },
    { type: "heading", text: "Shortest paths by reflection" },
    {
      type: "text",
      content:
        "A light ray from $A$ bounces off a mirror line and reaches $B$, with $A$ and $B$ on the same side. Of all bounce points $P$ on the mirror, which makes $AP + PB$ shortest? Reflect $A$ to $A'$. Every $P$ on the mirror has $AP = A'P$, so $AP + PB = A'P + PB \\ge A'B$, with equality exactly when $P$ lies on the segment $A'B$. That is also where the angle of incidence equals the angle of reflection.",
    },
    {
      type: "worked-example",
      id: "slc2-3-we4",
      title: "Worked example 4: the bounce point",
      problem: "$A(1, 2)$ and $B(5, 4)$ lie above the x-axis. Find the point $P$ on the x-axis that makes $AP + PB$ least, and the least value.",
      steps: [
        { text: "Reflect $A$ in the x-axis: $A'(1, -2)$." },
        { text: "Line $A'B$ has slope $\\frac{4 + 2}{5 - 1} = \\frac32$: $y + 2 = \\frac32(x - 1)$." },
        { text: "It meets $y = 0$ where $2 = \\frac32(x - 1)$, i.e. $x = \\frac73$. *Why this step:* the straight segment $A'B$ crosses the mirror exactly at the optimal bounce point." },
        { text: "Least value $= A'B = \\sqrt{4^2 + 6^2} = \\sqrt{52} = 2\\sqrt{13}$." },
      ],
      answer: "$P = \\left(\\frac73, 0\\right)$, least value $2\\sqrt{13}$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "slc2-3-q1",
      variant: "practice",
      question: "The foot of the perpendicular from the origin to $3x + 4y = 25$ is",
      options: [
        { text: "$(3, 4)$", correct: true, feedback: "$t = -\\frac{L(O)}{25} = -\\frac{-25}{25} = 1$, so the foot is $(0 + 3, 0 + 4)$." },
        { text: "$(6, 8)$", feedback: "That is the image of the origin, twice as far." },
        { text: "$(4, 3)$", feedback: "The foot lies along the normal $(3, 4)$ from the origin, so the coordinates are in the ratio $3 : 4$." },
        { text: "$(-3, -4)$", feedback: "$L(O) = -25 < 0$, so $t = +1$: the foot is on the positive side." },
      ],
      hint: "Use $t = -\\frac{L(O)}{a^2 + b^2}$ with $L(O) = -25$.",
    },
    {
      type: "numeric",
      id: "slc2-3-q2",
      variant: "practice",
      question: "The image of $(2, 1)$ in the line $x - y + 1 = 0$ is $(h, k)$. Find $k$.",
      answer: 3,
      hint: "$L(2, 1) = 2$ and $a^2 + b^2 = 2$; use $t = -\\frac{2L(P)}{a^2 + b^2}$.",
      solution: "$t = -2$, so $(h, k) = (2 - 2,\\ 1 + 2) = (0, 3)$. Check: the midpoint $(1, 2)$ lies on $x - y + 1 = 0$.",
      commonMistakes: [
        { answer: 2, feedback: "That is the y-coordinate of the foot $(1, 2)$. The image is twice as far." },
        { answer: -1, feedback: "Sign of $b$: the normal is $(1, -1)$, so $k = 1 + (-1)(-2) = 3$." },
      ],
    },
    {
      type: "numeric",
      id: "slc2-3-q3",
      variant: "practice",
      question: "The foot of the perpendicular from $(1, -2)$ to $2x - y + 1 = 0$ is $(h, k)$. Find $h + k$.",
      answer: -2,
      hint: "$L(1, -2) = 2 + 2 + 1 = 5$.",
      solution: "$t = -\\frac55 = -1$: $(h, k) = (1 - 2,\\ -2 + 1) = (-1, -1)$, so $h + k = -2$.",
      commonMistakes: [
        { answer: -3, feedback: "That comes from the image $(-3, 0)$. The foot uses $t = -\\frac{L(P)}{a^2 + b^2}$ without the 2." },
        { answer: 0, feedback: "Check $L(P)$: $2(1) - (-2) + 1 = 5$, not 1." },
      ],
    },
    {
      type: "quiz",
      id: "slc2-3-q4",
      variant: "practice",
      multiple: true,
      question: "Which of these reflections of $P(3, -5)$ are correct? Select all that apply.",
      options: [
        { text: "in $y = x$: $(-5, 3)$", correct: true, feedback: "Reflection in $y = x$ swaps the coordinates." },
        { text: "in the x-axis: $(3, 5)$", correct: true, feedback: "The x-coordinate stays, the y-coordinate changes sign." },
        { text: "in $y = -x$: $(-5, 3)$", feedback: "In $y = -x$, $(a, b) \\mapsto (-b, -a) = (5, -3)$." },
        { text: "in $x = 1$: $(-1, -5)$", correct: true, feedback: "$2(1) - 3 = -1$, and $y$ is unchanged." },
        { text: "in the y-axis: $(3, 5)$", feedback: "In the y-axis $x$ changes sign: $(-3, -5)$." },
      ],
      hint: "Use the table of special mirrors, or check that each midpoint lies on the mirror.",
    },
    {
      type: "numeric",
      id: "slc2-3-q5",
      variant: "practice",
      question: "Find the distance between $P(4, 4)$ and its image in the line $3x + 4y = 10$.",
      answer: 7.2,
      hint: "$PP'$ is twice the distance of $P$ from the line.",
      solution: "Distance of $P$ from the line: $\\frac{\\lvert 12 + 16 - 10\\rvert}{5} = 3.6$. So $PP' = 7.2$.",
      commonMistakes: [
        { answer: 3.6, feedback: "That is the distance from $P$ to the mirror. The image is as far again on the other side." },
        { answer: 18, feedback: "Divide $L(P)$ by $\\sqrt{a^2 + b^2} = 5$, then double." },
      ],
    },
    {
      type: "quiz",
      id: "slc2-3-q6",
      variant: "concept",
      question: "Which pair of facts pins down the image $P'$ of $P$ in a line $\\ell$?",
      options: [
        { text: "$PP'$ is perpendicular to $\\ell$, and the midpoint of $PP'$ lies on $\\ell$", correct: true, feedback: "These two conditions are two equations in the two unknown coordinates of $P'$, and the image formula solves them." },
        { text: "$P'$ lies on $\\ell$, and $PP'$ is perpendicular to $\\ell$", feedback: "That describes the foot of the perpendicular, not the image." },
        { text: "$P'$ is at the same distance from $\\ell$ as $P$", feedback: "Every point of a line parallel to $\\ell$ satisfies this; it does not single out one point." },
        { text: "$P$ and $P'$ are on the same side of $\\ell$", feedback: "A mirror image is on the opposite side (unless $P$ is on $\\ell$)." },
      ],
      hint: "How many conditions do you need to fix two unknown coordinates?",
    },
    {
      type: "numeric",
      id: "slc2-3-q7",
      variant: "practice",
      question: "JEE Main. The image of $(3, 8)$ in the line $x + 3y = 7$ is $(h, k)$. Find $h + k$.",
      answer: -5,
      hint: "$L(3, 8) = 3 + 24 - 7 = 20$ and $a^2 + b^2 = 10$.",
      solution: "$t = -\\frac{2 \\cdot 20}{10} = -4$: $(h, k) = (3 - 4,\\ 8 - 12) = (-1, -4)$, so $h + k = -5$. The midpoint $(1, 2)$ lies on the line.",
      commonMistakes: [
        { answer: 3, feedback: "That comes from the foot $(1, 2)$. The image needs twice the step." },
        { answer: 19, feedback: "With $t = -4$ both coordinates **decrease**: $3 + 1(-4)$ and $8 + 3(-4)$." },
      ],
    },
    {
      type: "numeric",
      id: "slc2-3-q8",
      variant: "practice",
      question:
        "A ray from $A(0, 3)$ reflects off the x-axis and passes through $B(6, 5)$. Find the total length of its path from $A$ to $B$.",
      answer: 10,
      hint: "Reflect $A$ in the x-axis; the path length equals $A'B$.",
      solution: "$A' = (0, -3)$. The reflected path is as long as the straight segment $A'B = \\sqrt{36 + 64} = 10$.",
      commonMistakes: [
        { answer: 6.3246, tolerance: 0.01, feedback: "That is $AB$ directly. The ray must touch the x-axis on the way." },
        { answer: 8, feedback: "The vertical difference between $A'$ and $B$ is $5 - (-3) = 8$; combine it with the horizontal 6." },
      ],
    },
    {
      type: "quiz",
      id: "slc2-3-q9",
      variant: "practice",
      question:
        "JEE Main. The point $(4, 1)$ is reflected in the line $y = x$, and the image is then moved 2 units in the positive x-direction. The final point is",
      options: [
        { text: "$(3, 4)$", correct: true, feedback: "Reflect: $(1, 4)$. Translate: $(3, 4)$." },
        { text: "$(1, 6)$", feedback: "That translates first, then reflects. The order matters." },
        { text: "$(4, 3)$", feedback: "Reflection in $y = x$ swaps the coordinates: $(1, 4)$, then add 2 to the x-coordinate." },
        { text: "$(6, 1)$", feedback: "That only translates; the reflection was skipped." },
      ],
      hint: "Do the steps in the given order.",
    },
    {
      type: "numeric",
      id: "slc2-3-q10",
      variant: "practice",
      question:
        "The foot of the perpendicular from the origin to a line is $(2, 3)$. Find the x-intercept of the line.",
      answer: 6.5,
      hint: "The line passes through $(2, 3)$ and has normal $(2, 3)$.",
      solution: "The line is $2(x - 2) + 3(y - 3) = 0$, i.e. $2x + 3y = 13$. Its x-intercept is $\\frac{13}{2} = 6.5$.",
      commonMistakes: [
        { answer: 2, feedback: "$(2, 3)$ is on the line, but it is not where the line meets the x-axis." },
        { answer: 4.3333, tolerance: 0.01, feedback: "That is the y-intercept $\\frac{13}{3}$." },
      ],
    },
    {
      type: "quiz",
      id: "slc2-3-q11",
      variant: "practice",
      multiple: true,
      question: "For the line $2x - y + 3 = 0$ and the point $P(1, 0)$, which statements are true? Select all that apply.",
      options: [
        { text: "The foot of the perpendicular from $P$ is $(-1, 1)$", correct: true, feedback: "$L(P) = 5$, $t = -1$: $(1 - 2,\\ 0 + 1)$." },
        { text: "The image of $P$ is $(-3, 2)$", correct: true, feedback: "$t = -2$: $(1 - 4,\\ 0 + 2)$." },
        { text: "The distance of $P$ from the line is $\\sqrt5$", correct: true, feedback: "$\\frac{5}{\\sqrt5} = \\sqrt5$." },
        { text: "$PP'$ has slope 2", feedback: "$PP'$ is perpendicular to the line of slope 2, so its slope is $-\\frac12$." },
        { text: "The image of $P$ is $(-1, 1)$", feedback: "$(-1, 1)$ is the foot, which lies on the line." },
      ],
      hint: "Compute $L(P)$, then $t$ for the foot and twice that for the image.",
    },
    {
      type: "numeric",
      id: "slc2-3-q12",
      variant: "practice",
      question: "The image of $(-2, 5)$ in the line $x = 3$ is $(h, k)$. Find $h$.",
      answer: 8,
      hint: "The mirror $x = 3$ is the midpoint of $-2$ and $h$.",
      solution: "$\\frac{-2 + h}{2} = 3$ gives $h = 8$; $k = 5$ is unchanged.",
      commonMistakes: [
        { answer: 3, feedback: "3 is the x-coordinate of the foot. The image is 5 units beyond it." },
        { answer: 2, feedback: "Reflecting in $x = 3$ is not the same as changing the sign of $x$." },
      ],
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "position-of-points-relative-to-a-line",
  title: "2.4 · Position of Points Relative to a Line",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "A line cuts the plane into two half-planes. Given two points, are they on the same side or on opposite sides? Does a segment cross the line? Is a point inside a triangle? All three questions have the same one-line answer: compute $L(P) = ax_1 + by_1 + c$ and look at its **sign**.",
    },
    { type: "heading", text: "Why the sign of L(P) tells the side" },
    {
      type: "text",
      content:
        "Lesson 2.3 walked from a point along the normal: the point $(x_1 + at,\\ y_1 + bt)$ has $L$-value $L(P) + t(a^2 + b^2)$. Start on the line, where $L = 0$. Walking in the direction of $(a, b)$ ($t > 0$) makes $L$ positive; walking the other way makes it negative. Every point of the plane is reached by first moving along the line ($L$ stays 0) and then along the normal, so:",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Sides of a line",
      content:
        "For the line $L(x, y) = ax + by + c = 0$:\n\n- $L(P) > 0$ on the side the normal $(a, b)$ points to, $L(P) < 0$ on the other, $L(P) = 0$ on the line.\n- $P$ and $Q$ are on the **same side** iff $L(P)$ and $L(Q)$ have the same sign, on **opposite sides** iff $L(P)L(Q) < 0$.\n- A point is on the **origin's side** iff $L(P)$ has the same sign as $L(O) = c$ (for $c \\ne 0$).",
    },
    {
      type: "interactive",
      config: {
        component: "slc-line-explorer",
        mode: "point-line",
        a: [-4, 3],
        b: [4, -1],
        p: [2, 3],
        caption:
          "Drag $P$ across the line and watch the sign of $L(P)$ flip at the moment $P$ crosses, while the sign of $L(O)$ stays put. Whatever sign convention the equation uses, \"same side as the origin\" is decided by comparing the two signs, never by one sign alone.",
      },
    },
    {
      type: "worked-example",
      id: "slc2-4-we1",
      title: "Worked example 1: same side or opposite?",
      problem: "Are $(2, 1)$ and $(-3, 4)$ on the same side of $3x - 2y + 1 = 0$?",
      steps: [
        { text: "$L(2, 1) = 6 - 2 + 1 = 5 > 0$." },
        { text: "$L(-3, 4) = -9 - 8 + 1 = -16 < 0$." },
        { text: "The signs differ. *Why this step:* only the signs matter, not the sizes: $\\lvert L\\rvert$ is proportional to the distance from the line, which does not decide the side." },
      ],
      answer: "Opposite sides.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"positive means above the line\"",
      content:
        "The sign depends on how the equation is written. The point $(0, 5)$ is above the line $3x - 2y + 6 = 0$ (which cuts the y-axis at 3), yet $L(0, 5) = -10 + 6 = -4 < 0$. Multiply the equation by $-1$ and the sign flips. Never read \"above\" from a sign; compare signs of two points instead.",
    },
    { type: "heading", text: "Where a segment crosses the line" },
    {
      type: "text",
      content:
        "If $A$ and $B$ are on opposite sides, the segment $AB$ crosses the line at some point $P$ dividing it in a ratio $k : 1$. On the segment, $L$ changes linearly from $L(A)$ to $L(B)$, so $P = \\frac{kB + A}{k + 1}$ gives $L(P) = \\frac{kL(B) + L(A)}{k + 1}$. Setting this to 0:",
    },
    {
      type: "math",
      latex: "\\frac{AP}{PB} = k = -\\frac{L(A)}{L(B)} = -\\frac{ax_1 + by_1 + c}{ax_2 + by_2 + c}",
    },
    {
      type: "text",
      content:
        "A positive $k$ means internal division (opposite sides); a negative $k$ means the line meets $AB$ extended (same side).",
    },
    {
      type: "worked-example",
      id: "slc2-4-we2",
      title: "Worked example 2: the ratio of division",
      problem: "Find the ratio in which $2x + y - 4 = 0$ divides the segment from $A(2, -2)$ to $B(3, 7)$, and the point of division.",
      steps: [
        { text: "$L(A) = 4 - 2 - 4 = -2$ and $L(B) = 6 + 7 - 4 = 9$." },
        { text: "$k = -\\frac{-2}{9} = \\frac29$, positive, so the division is internal in the ratio $2 : 9$." },
        { text: "Section formula: $P = \\left(\\frac{2 \\cdot 3 + 9 \\cdot 2}{11}, \\frac{2 \\cdot 7 + 9 \\cdot (-2)}{11}\\right) = \\left(\\frac{24}{11}, -\\frac{4}{11}\\right)$. *Why this step:* substituting back, $2 \\cdot \\frac{24}{11} - \\frac{4}{11} - 4 = 0$, confirms the point is on the line." },
      ],
      answer: "Internally in the ratio $2 : 9$, at $\\left(\\frac{24}{11}, -\\frac{4}{11}\\right)$.",
    },
    { type: "heading", text: "Inside a triangle" },
    {
      type: "text",
      content:
        "A point $P$ is inside triangle $ABC$ exactly when, for each side, $P$ is on the same side as the opposite vertex. That is three sign tests: $L_{BC}(P)$ against $L_{BC}(A)$, $L_{CA}(P)$ against $L_{CA}(B)$, and $L_{AB}(P)$ against $L_{AB}(C)$.",
    },
    {
      type: "worked-example",
      id: "slc2-4-we3",
      title: "Worked example 3: three sign tests",
      problem: "Is $P(1, 1)$ inside the triangle with vertices $A(0, 0)$, $B(4, 0)$ and $C(0, 3)$?",
      steps: [
        { text: "Side $AB$ is $y = 0$: $P$ gives $1$ and $C$ gives $3$, same sign." },
        { text: "Side $AC$ is $x = 0$: $P$ gives $1$ and $B$ gives $4$, same sign." },
        { text: "Side $BC$ is $3x + 4y - 12 = 0$: $P$ gives $-5$ and $A$ gives $-12$, same sign. *Why this step:* each test compares $P$ with the vertex **not** on that side, the one that is certainly inside the corresponding half-plane." },
      ],
      answer: "Yes, $P$ passes all three tests and is inside.",
    },
    {
      type: "worked-example",
      id: "slc2-4-we4",
      title: "Worked example 4: a moving point inside a triangle (JEE Advanced)",
      problem:
        "Find all $\\alpha$ for which the point $(\\alpha, \\alpha^2)$ lies inside the triangle formed by $2x + 3y - 1 = 0$, $x + 2y - 3 = 0$ and $5x - 6y - 1 = 0$.",
      steps: [
        { text: "Vertices: the second and third lines meet at $A\\left(\\frac54, \\frac78\\right)$, the first and third at $B\\left(\\frac13, \\frac19\\right)$, the first and second at $C(-7, 5)$." },
        { text: "First line, compare with $A$: $L_1(A) = \\frac52 + \\frac{21}{8} - 1 > 0$, so need $3\\alpha^2 + 2\\alpha - 1 > 0$, i.e. $(3\\alpha - 1)(\\alpha + 1) > 0$: $\\alpha < -1$ or $\\alpha > \\frac13$." },
        { text: "Second line, compare with $B$: $L_2(B) = \\frac13 + \\frac29 - 3 < 0$, so need $2\\alpha^2 + \\alpha - 3 < 0$, i.e. $(2\\alpha + 3)(\\alpha - 1) < 0$: $-\\frac32 < \\alpha < 1$." },
        { text: "Third line, compare with $C$: $L_3(C) = -35 - 30 - 1 < 0$, so need $5\\alpha - 6\\alpha^2 - 1 < 0$, i.e. $(2\\alpha - 1)(3\\alpha - 1) > 0$: $\\alpha < \\frac13$ or $\\alpha > \\frac12$. *Why this step:* each side contributes a quadratic inequality in $\\alpha$, and the answer is their intersection." },
        { text: "Intersect the three: $-\\frac32 < \\alpha < -1$ or $\\frac12 < \\alpha < 1$." },
      ],
      answer: "$\\alpha \\in \\left(-\\frac32, -1\\right) \\cup \\left(\\frac12, 1\\right)$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "slc2-4-q1",
      variant: "practice",
      question: "Relative to the line $x + 2y - 2 = 0$, the points $(1, 1)$ and $(2, -1)$ lie",
      options: [
        { text: "on opposite sides", correct: true, feedback: "$L(1, 1) = 1$ and $L(2, -1) = -2$: opposite signs." },
        { text: "on the same side", feedback: "Compute both: $1 + 2 - 2 = 1$ and $2 - 2 - 2 = -2$." },
        { text: "one on the line", feedback: "Neither value is 0." },
        { text: "it depends on which way the line is written", feedback: "Rewriting multiplies both values by the same constant, so same/opposite never changes." },
      ],
      hint: "Substitute each point into $x + 2y - 2$.",
    },
    {
      type: "quiz",
      id: "slc2-4-q2",
      variant: "practice",
      question: "The point $(3, 2)$ and the origin, relative to $2x - 3y + 5 = 0$, are",
      options: [
        { text: "on the same side", correct: true, feedback: "$L(3, 2) = 6 - 6 + 5 = 5$ and $L(O) = 5$: both positive." },
        { text: "on opposite sides", feedback: "Both values are $+5$." },
        { text: "both on the line", feedback: "$L(O) = 5 \\ne 0$." },
        { text: "impossible to compare without a sketch", feedback: "Comparing signs of $L$ needs no sketch at all." },
      ],
      hint: "Compare the sign of $L(3, 2)$ with the sign of $c = 5$.",
    },
    {
      type: "numeric",
      id: "slc2-4-q3",
      variant: "practice",
      question:
        "The line $3x + y - 9 = 0$ divides the segment from $(1, 3)$ to $(2, 7)$ in the ratio $k : 1$. Find $k$.",
      answer: 0.75,
      hint: "$k = -\\frac{L(A)}{L(B)}$.",
      solution: "$L(1, 3) = 3 + 3 - 9 = -3$ and $L(2, 7) = 6 + 7 - 9 = 4$, so $k = \\frac34$: internal division in the ratio $3 : 4$.",
      commonMistakes: [
        { answer: 1.3333, tolerance: 0.01, feedback: "That is $\\frac{L(B)}{L(A)}$ in size. The ratio $AP : PB$ is $-\\frac{L(A)}{L(B)}$." },
        { answer: -0.75, feedback: "Keep the minus sign in the formula: $-\\frac{-3}{4} = +\\frac34$, an internal division." },
      ],
    },
    {
      type: "quiz",
      id: "slc2-4-q4",
      variant: "practice",
      multiple: true,
      question: "Which points lie on the same side of $x - 2y + 4 = 0$ as the origin? Select all that apply.",
      options: [
        { text: "$(1, 1)$", correct: true, feedback: "$1 - 2 + 4 = 3 > 0$, like $L(O) = 4$." },
        { text: "$(0, 3)$", feedback: "$0 - 6 + 4 = -2 < 0$: the other side." },
        { text: "$(-5, 0)$", feedback: "$-5 + 4 = -1 < 0$." },
        { text: "$(2, 2)$", correct: true, feedback: "$2 - 4 + 4 = 2 > 0$." },
        { text: "$(-4, 0)$", feedback: "$-4 + 4 = 0$: it is on the line." },
        { text: "$(3, -1)$", correct: true, feedback: "$3 + 2 + 4 = 9 > 0$." },
      ],
      hint: "$L(O) = 4 > 0$. Keep the points with $L > 0$.",
    },
    {
      type: "numeric",
      id: "slc2-4-q5",
      variant: "practice",
      question:
        "The line $x + y = 4$ divides the join of $(-1, 1)$ and $(5, 7)$ in the ratio $k : 1$. Find $k$.",
      answer: 0.5,
      hint: "Write the line as $x + y - 4 = 0$ and use $k = -\\frac{L(A)}{L(B)}$.",
      solution: "$L(-1, 1) = -4$, $L(5, 7) = 8$, so $k = \\frac48 = \\frac12$. The crossing point is $\\frac{(5, 7) + 2(-1, 1)}{3} = (1, 3)$, which is on $x + y = 4$.",
      commonMistakes: [
        { answer: 2, feedback: "Inverted: $AP : PB = -L(A) : L(B) = 4 : 8$." },
        { answer: -0.5, feedback: "$L(A)$ and $L(B)$ have opposite signs, so the ratio is positive (internal)." },
      ],
    },
    {
      type: "quiz",
      id: "slc2-4-q6",
      variant: "practice",
      question: "For which $k$ do $(k, 2)$ and $(1, 1)$ lie on opposite sides of $x + y - 4 = 0$?",
      options: [
        { text: "$k > 2$", correct: true, feedback: "$L(1, 1) = -2 < 0$, so need $L(k, 2) = k - 2 > 0$." },
        { text: "$k < 2$", feedback: "Then $L(k, 2) < 0$, the same sign as $L(1, 1)$." },
        { text: "$k > 4$", feedback: "$k = 3$ already works: $L(3, 2) = 1 > 0$." },
        { text: "$k \\ne 2$", feedback: "For $k < 2$ both values are negative: same side." },
      ],
      hint: "Find the sign of $L(1, 1)$ first, then demand the opposite sign for $L(k, 2)$.",
    },
    {
      type: "quiz",
      id: "slc2-4-q7",
      variant: "practice",
      question: "JEE Main. The point $(a, a)$ lies strictly between the lines $\\lvert x + y\\rvert = 4$ exactly when",
      options: [
        { text: "$\\lvert a\\rvert < 2$", correct: true, feedback: "Between $x + y = 4$ and $x + y = -4$ means $\\lvert 2a\\rvert < 4$." },
        { text: "$\\lvert a\\rvert < 4$", feedback: "The point has $x + y = 2a$, not $a$." },
        { text: "$a < 2$", feedback: "$a = -3$ gives $x + y = -6$, outside the strip." },
        { text: "$\\lvert a\\rvert > 2$", feedback: "That is outside the strip." },
      ],
      hint: "$\\lvert x + y\\rvert = 4$ is the pair $x + y = \\pm 4$. A point between them has $-4 < x + y < 4$.",
    },
    {
      type: "numeric",
      id: "slc2-4-q8",
      variant: "practice",
      question:
        "How many points with integer coordinates lie strictly inside the triangle with vertices $(0, 0)$, $(6, 0)$ and $(0, 4)$?",
      answer: 7,
      hint: "Strictly inside means $x > 0$, $y > 0$ and $2x + 3y < 12$ (the third side is $2x + 3y = 12$). Count row by row.",
      solution: "$y = 1$: $2x < 9$, so $x = 1, 2, 3, 4$. $y = 2$: $2x < 6$, so $x = 1, 2$. $y = 3$: $2x < 3$, so $x = 1$. Total $4 + 2 + 1 = 7$. (Pick's theorem agrees: area 12, 12 boundary points, $12 - 6 + 1 = 7$.)",
      commonMistakes: [
        { answer: 8, feedback: "The point $(3, 2)$ satisfies $2x + 3y = 12$: it is on the boundary, not strictly inside." },
        { answer: 6, feedback: "Recount $y = 1$: $x = 1, 2, 3, 4$ all give $2x + 3 < 12$." },
      ],
    },
    {
      type: "quiz",
      id: "slc2-4-q9",
      variant: "practice",
      question: "The point $(\\alpha, \\alpha^2)$ lies inside the triangle with vertices $(0, 0)$, $(2, 0)$ and $(0, 2)$ exactly when",
      options: [
        { text: "$0 < \\alpha < 1$", correct: true, feedback: "Need $\\alpha > 0$, $\\alpha^2 > 0$ and $\\alpha + \\alpha^2 < 2$, i.e. $(\\alpha + 2)(\\alpha - 1) < 0$." },
        { text: "$-2 < \\alpha < 1$", feedback: "That ignores the side $x = 0$: a negative $\\alpha$ puts the point left of the y-axis." },
        { text: "$0 < \\alpha < 2$", feedback: "At $\\alpha = 1.5$, $\\alpha + \\alpha^2 = 3.75 > 2$: outside." },
        { text: "$1 < \\alpha < 2$", feedback: "These points are beyond the side $x + y = 2$." },
      ],
      hint: "The three sides are $x = 0$, $y = 0$ and $x + y = 2$; write one inequality for each.",
    },
    {
      type: "numeric",
      id: "slc2-4-q10",
      variant: "practice",
      question:
        "Find the least integer $k$ for which $(k, 4)$ and $(1, 2)$ lie on the same side of $2x - y + 1 = 0$.",
      answer: 2,
      hint: "$L(1, 2) = 1 > 0$, so need $L(k, 4) > 0$.",
      solution: "$L(k, 4) = 2k - 3 > 0$ gives $k > 1.5$. The least integer is 2.",
      commonMistakes: [
        { answer: 1, feedback: "$L(1, 4) = -1 < 0$: opposite side." },
        { answer: 1.5, feedback: "At $k = 1.5$ the point is **on** the line; besides, the question asks for an integer." },
      ],
    },
    {
      type: "numeric",
      id: "slc2-4-q11",
      variant: "concept",
      question:
        "The point $(0, 5)$ lies above the line $3x - 2y + 6 = 0$. Compute $L(0, 5) = 3(0) - 2(5) + 6$.",
      answer: -4,
      hint: "Just substitute. Then compare with the misconception callout.",
      solution: "$0 - 10 + 6 = -4$. The point is above the line, but $L$ is negative: the sign of $L$ tells the side relative to the normal $(3, -2)$, which points down and to the right, not \"up\".",
      commonMistakes: [
        { answer: 4, feedback: "Sign slip: $-2 \\times 5 = -10$." },
        { answer: 16, feedback: "$-2y$ with $y = 5$ is $-10$, not $+10$." },
      ],
    },
    {
      type: "quiz",
      id: "slc2-4-q12",
      variant: "practice",
      multiple: true,
      question:
        "Which points lie strictly inside the triangle with vertices $A(0, 0)$, $B(5, 0)$ and $C(1, 4)$? Select all that apply.",
      options: [
        { text: "$(1, 1)$", correct: true, feedback: "$y > 0$, $x + y < 5$ and $4x - y > 0$: all three tests pass." },
        { text: "$(2, 2)$", correct: true, feedback: "$2 > 0$, $4 < 5$ and $8 - 2 > 0$." },
        { text: "$(3, 3)$", feedback: "$x + y = 6 > 5$: beyond side $BC$." },
        { text: "$\\left(\\frac12, 3\\right)$", feedback: "$4x - y = -1 < 0$, but $B$ gives $20 > 0$: beyond side $AC$." },
        { text: "$\\left(4, \\frac12\\right)$", correct: true, feedback: "$4.5 < 5$, $y > 0$ and $16 - 0.5 > 0$." },
      ],
      hint: "Sides: $AB$ is $y = 0$, $BC$ is $x + y = 5$, $AC$ is $y = 4x$. Compare each point with the opposite vertex.",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "angle-bisectors",
  title: "2.5 · Angle Bisectors",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "Two crossing lines make four angles, in two vertically opposite pairs. Each pair has its own bisector, so there are **two** bisectors, and they are perpendicular (half of $\\theta$ plus half of $180^\\circ - \\theta$ is $90^\\circ$). JEE questions rarely ask for \"the bisectors\"; they ask for a particular one: the bisector of the angle containing the origin, the acute-angle bisector, or the bisector of the angle containing a given point. This lesson builds one tool that answers all three: the sign of $L(P)$ from Lesson 2.4.",
    },
    { type: "heading", text: "Bisectors as an equidistant locus" },
    {
      type: "text",
      content:
        "A point lies on a bisector exactly when it is at equal distances from the two lines. With Lesson 2.2's formula:",
    },
    {
      type: "math",
      latex:
        "\\frac{\\lvert a_1x + b_1y + c_1 \\rvert}{\\sqrt{a_1^2 + b_1^2}} = \\frac{\\lvert a_2x + b_2y + c_2 \\rvert}{\\sqrt{a_2^2 + b_2^2}} \\iff \\frac{a_1x + b_1y + c_1}{\\sqrt{a_1^2 + b_1^2}} = \\pm\\frac{a_2x + b_2y + c_2}{\\sqrt{a_2^2 + b_2^2}}",
    },
    {
      type: "text",
      content:
        "The two signs give the two bisectors. Which sign gives which? Inside one of the four angular regions, $L_1$ and $L_2$ each keep a fixed sign. In a region where they have the **same** sign, the equal-distance condition reads $\\frac{L_1}{n_1} = +\\frac{L_2}{n_2}$; where they have **opposite** signs, it reads $\\frac{L_1}{n_1} = -\\frac{L_2}{n_2}$ (here $n_i = \\sqrt{a_i^2 + b_i^2}$).",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Which bisector is which",
      content:
        "- **Containing a given point $P$:** if $L_1(P)$ and $L_2(P)$ have the same sign, take $\\frac{L_1}{n_1} = +\\frac{L_2}{n_2}$; if opposite signs, take $-$.\n- **Containing the origin:** first rewrite the lines so that $c_1 > 0$ and $c_2 > 0$. Then the origin has both values positive, so the $+$ sign gives the bisector of the angle containing the origin.\n- **Acute or obtuse:** with $c_1, c_2 > 0$, if $a_1a_2 + b_1b_2 > 0$ the origin lies in the **obtuse** angle (so the $+$ bisector is the obtuse one); if $a_1a_2 + b_1b_2 < 0$ the origin lies in the **acute** angle (the $+$ bisector is the acute one).",
    },
    {
      type: "text",
      content:
        "Why the dot product decides it: the region where $L_1 > 0$ and $L_2 > 0$ is a wedge whose two walls have inward normals $(a_1, b_1)$ and $(a_2, b_2)$. A wedge's angle is $180^\\circ$ minus the angle between its inward normals. If the normals make an acute angle ($a_1a_2 + b_1b_2 > 0$), the wedge, which contains the origin, is obtuse.",
    },
    {
      type: "interactive",
      config: {
        component: "slc-line-explorer",
        mode: "two-lines",
        a: [-4, -1],
        b: [4, 3],
        c: [-3, 4],
        d: [4, -2],
        show: ["bisectors"],
        caption:
          "Both bisectors are drawn, perpendicular to each other, with the one through the origin's angle and the acute-angle bisector named in the readout. Drag the lines until the origin moves from the acute angle into the obtuse one, and watch the two labels part company.",
      },
    },
    { type: "heading", text: "Worked examples" },
    {
      type: "worked-example",
      id: "slc2-5-we1",
      title: "Worked example 1: origin bisector and acute bisector",
      problem:
        "For $3x - 4y + 7 = 0$ and $12x + 5y - 2 = 0$, find the bisector of the angle containing the origin and decide whether it bisects the acute angle.",
      steps: [
        { text: "Make both constants positive: $3x - 4y + 7 = 0$ and $-12x - 5y + 2 = 0$. *Why this step:* the origin rule only works after this normalisation." },
        {
          text: "Take the $+$ sign:",
          latex: "\\frac{3x - 4y + 7}{5} = \\frac{-12x - 5y + 2}{13} \\iff 39x - 52y + 91 = -60x - 25y + 10 \\iff 11x - 3y + 9 = 0",
        },
        { text: "Test: $a_1a_2 + b_1b_2 = 3(-12) + (-4)(-5) = -16 < 0$, so the origin lies in the acute angle." },
        { text: "The other bisector (the $-$ sign) is $21x + 77y - 101 = 0$, and it bisects the obtuse angle." },
      ],
      answer: "$11x - 3y + 9 = 0$ contains the origin's angle and is the acute-angle bisector.",
    },
    {
      type: "worked-example",
      id: "slc2-5-we2",
      title: "Worked example 2: the bisector of the angle containing a point",
      problem: "Find the bisector of the angle between $4x + 3y - 6 = 0$ and $5x + 12y + 9 = 0$ that contains the point $(1, 2)$.",
      steps: [
        { text: "$L_1(1, 2) = 4 + 6 - 6 = 4 > 0$ and $L_2(1, 2) = 5 + 24 + 9 = 38 > 0$: same sign." },
        {
          text: "Same sign means the $+$ bisector. *Why this step:* every point of that angular region, including the bisector inside it, has both values positive.",
          latex: "\\frac{4x + 3y - 6}{5} = \\frac{5x + 12y + 9}{13} \\iff 52x + 39y - 78 = 25x + 60y + 45",
        },
        { text: "Simplify: $27x - 21y - 123 = 0$, i.e. $9x - 7y - 41 = 0$." },
      ],
      answer: "$9x - 7y - 41 = 0$.",
    },
    {
      type: "worked-example",
      id: "slc2-5-we3",
      title: "Worked example 3: the internal bisector of a triangle",
      problem: "In the triangle with $A(0, 0)$, $B(4, 0)$ and $C(3, 4)$, find the internal bisector of angle $A$.",
      steps: [
        { text: "The sides through $A$ are $AB$: $y = 0$ and $AC$: $4x - 3y = 0$." },
        { text: "Bisectors: $y = \\pm\\frac{4x - 3y}{5}$, i.e. $x - 2y = 0$ or $2x + y = 0$." },
        { text: "The internal bisector separates $B$ from $C$. For $x - 2y$: $B$ gives $4$ and $C$ gives $-5$, opposite signs. *Why this step:* the origin trick is useless here because the lines pass through the origin; the vertex test always works." },
        { text: "Check with unit vectors: $\\frac{(4, 0)}{4} + \\frac{(3, 4)}{5} = \\left(\\frac85, \\frac45\\right)$, direction $(2, 1)$, slope $\\frac12$." },
      ],
      answer: "$x - 2y = 0$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the bisector containing the origin is the acute one\"",
      content:
        "It is acute only when the origin happens to lie in the acute angle. For $4x + 3y = 12$ and $3x + 4y = 12$ the origin lies in the **obtuse** angle, and the origin bisector $y = x$ is the obtuse-angle bisector. Always run the $a_1a_2 + b_1b_2$ test, after making $c_1, c_2 > 0$.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "A quick acute-bisector check",
      content:
        "The acute bisector makes an angle of less than $45^\\circ$ with each line. If in doubt, compute $\\tan$ of the angle between your bisector and one of the lines: it must be less than 1.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "slc2-5-q1",
      variant: "practice",
      question: "The bisectors of the angles between $y = 0$ and $\\sqrt3\\,x - y = 0$ are",
      options: [
        { text: "$x - \\sqrt3\\,y = 0$ and $\\sqrt3\\,x + y = 0$", correct: true, feedback: "The lines have inclinations $0^\\circ$ and $60^\\circ$, so the bisectors have inclinations $30^\\circ$ and $120^\\circ$." },
        { text: "$y = x$ and $y = -x$", feedback: "Those bisect the angles between the axes, not between $y = 0$ and a $60^\\circ$ line." },
        { text: "$\\sqrt3\\,x - y = 0$ and $x + \\sqrt3\\,y = 0$", feedback: "$\\sqrt3\\,x - y = 0$ is one of the given lines." },
        { text: "$x - \\sqrt3\\,y = 0$ only", feedback: "There are always two bisectors, at right angles." },
      ],
      hint: "Halve the angle between the inclinations, then add $90^\\circ$ for the other bisector.",
    },
    {
      type: "numeric",
      id: "slc2-5-q2",
      variant: "practice",
      question:
        "Find the x-intercept of the bisector of the angle containing the origin, between $3x - 4y + 10 = 0$ and $4x + 3y + 5 = 0$.",
      answer: 5,
      hint: "Both constants are already positive. Take $\\frac{3x - 4y + 10}{5} = +\\frac{4x + 3y + 5}{5}$.",
      solution: "$3x - 4y + 10 = 4x + 3y + 5$ gives $x + 7y - 5 = 0$, which meets $y = 0$ at $x = 5$.",
      commonMistakes: [
        { answer: -2.142857, tolerance: 0.01, feedback: "That is from the other bisector $7x - y + 15 = 0$, which bisects the angle not containing the origin." },
        { answer: -5, feedback: "From $x + 7y - 5 = 0$, $y = 0$ gives $x = +5$." },
      ],
    },
    {
      type: "quiz",
      id: "slc2-5-q3",
      variant: "practice",
      question: "For the lines $2x + y + 4 = 0$ and $x - 3y + 2 = 0$, the origin lies in",
      options: [
        { text: "the acute angle between them", correct: true, feedback: "Both constants are positive and $a_1a_2 + b_1b_2 = 2 - 3 = -1 < 0$." },
        { text: "the obtuse angle between them", feedback: "That needs $a_1a_2 + b_1b_2 > 0$ with $c_1, c_2 > 0$." },
        { text: "neither, since the lines are perpendicular", feedback: "Perpendicular would need $a_1a_2 + b_1b_2 = 0$; it is $-1$." },
        { text: "cannot be decided without a sketch", feedback: "The sign test decides it with no sketch." },
      ],
      hint: "Check that $c_1, c_2 > 0$, then look at the sign of $a_1a_2 + b_1b_2$.",
    },
    {
      type: "quiz",
      id: "slc2-5-q4",
      variant: "concept",
      multiple: true,
      question: "Which statements about the angle bisectors of two intersecting lines are true? Select all that apply.",
      options: [
        { text: "The two bisectors are perpendicular", correct: true, feedback: "$\\frac{\\theta}{2} + \\frac{180^\\circ - \\theta}{2} = 90^\\circ$." },
        { text: "Every point of either bisector is equidistant from the two lines", correct: true, feedback: "That is how the bisector equations were derived." },
        { text: "The bisector containing the origin is always the acute bisector", feedback: "Only when the origin lies in the acute angle; test $a_1a_2 + b_1b_2$." },
        { text: "With $c_1, c_2 > 0$ and $a_1a_2 + b_1b_2 > 0$, the $+$ bisector is the obtuse bisector", correct: true, feedback: "The origin is then in the obtuse angle, and the $+$ bisector bisects the origin's angle." },
        { text: "The acute bisector always has positive slope", feedback: "The slope of a bisector depends entirely on the lines; it can have any sign." },
      ],
      hint: "Recall the locus definition and the dot-product test.",
    },
    {
      type: "numeric",
      id: "slc2-5-q5",
      variant: "practice",
      question:
        "The bisector of the acute angle between $x - 2y + 2 = 0$ and $2x - y + 1 = 0$ is $y = mx + c$. Find $m$.",
      answer: 1,
      hint: "Constants are positive and $a_1a_2 + b_1b_2 = 2 + 2 = 4 > 0$: the origin is in the obtuse angle, so the acute bisector takes the $-$ sign.",
      solution: "$x - 2y + 2 = -(2x - y + 1)$ gives $3x - 3y + 3 = 0$, i.e. $y = x + 1$, so $m = 1$. Check: the lines have slopes $\\frac12$ and $2$ (inclinations about $26.6^\\circ$ and $63.4^\\circ$), whose acute angle is bisected at $45^\\circ$.",
      commonMistakes: [
        { answer: -1, feedback: "$x + y = 1$ is the $+$ bisector, which here bisects the obtuse angle (the one containing the origin)." },
        { answer: 2, feedback: "2 is the slope of one of the given lines." },
      ],
    },
    {
      type: "quiz",
      id: "slc2-5-q6",
      variant: "concept",
      question: "The lines $3x + 4y + 1 = 0$ and $4x - 3y + 2 = 0$ are perpendicular. Which of their bisectors is the acute-angle bisector?",
      options: [
        { text: "Neither: all four angles are $90^\\circ$, so both bisectors make $45^\\circ$ with each line", correct: true, feedback: "$a_1a_2 + b_1b_2 = 12 - 12 = 0$: there is no acute angle to bisect." },
        { text: "The one containing the origin", feedback: "The dot-product test gives 0, which is the perpendicular case: no angle is acute." },
        { text: "The one not containing the origin", feedback: "With perpendicular lines, both bisectors play the same role." },
        { text: "The one with positive slope", feedback: "Slope signs do not decide acute or obtuse." },
      ],
      hint: "What is $a_1a_2 + b_1b_2$ here, and what are the angles at the crossing?",
    },
    {
      type: "numeric",
      id: "slc2-5-q7",
      variant: "practice",
      question:
        "JEE Main. Find the slope of the bisector of the angle between $3x + 4y - 2 = 0$ and $5x - 12y + 3 = 0$ that contains the point $(1, 1)$.",
      answer: 8,
      hint: "$L_1(1, 1) = 5 > 0$ and $L_2(1, 1) = -4 < 0$: opposite signs, so take the $-$ sign.",
      solution: "$13(3x + 4y - 2) = -5(5x - 12y + 3)$ gives $39x + 52y - 26 = -25x + 60y - 15$, i.e. $64x - 8y - 11 = 0$. Its slope is $\\frac{64}{8} = 8$.",
      commonMistakes: [
        { answer: -0.125, feedback: "That is the slope of the $+$ bisector $14x + 112y - 41 = 0$, which bisects the other pair of angles." },
        { answer: -8, feedback: "From $64x - 8y - 11 = 0$, $y = 8x - \\frac{11}{8}$: the slope is $+8$." },
      ],
    },
    {
      type: "quiz",
      id: "slc2-5-q8",
      variant: "practice",
      question:
        "JEE Main. In the triangle with $A(1, 1)$, $B(4, 5)$ and $C(13, 6)$, the internal bisector of angle $A$ is",
      options: [
        { text: "$7x - 9y + 2 = 0$", correct: true, feedback: "$AB = 5$, $AC = 13$; the unit vectors $\\left(\\frac35, \\frac45\\right)$ and $\\left(\\frac{12}{13}, \\frac{5}{13}\\right)$ add to a vector of slope $\\frac{77}{99} = \\frac79$, through $(1, 1)$." },
        { text: "$9x + 7y - 16 = 0$", feedback: "That is perpendicular to the internal bisector: the external bisector." },
        { text: "$7x + 9y - 16 = 0$", feedback: "The bisector rises from $A$ towards both $B$ and $C$, so its slope is positive." },
        { text: "$x - y = 0$", feedback: "Slope 1 would bisect only if the two sides were symmetric about it; check $B$ and $C$ against it." },
      ],
      hint: "Add the unit vectors along $AB$ and $AC$; the sum points along the internal bisector.",
    },
    {
      type: "numeric",
      id: "slc2-5-q9",
      variant: "practice",
      question: "Find the slope of the bisector of the acute angle between $y = 0$ and $4x - 3y = 0$.",
      answer: 0.5,
      hint: "$4x - 3y = 0$ has slope $\\frac43$, so it makes an acute angle $\\theta$ with $y = 0$, where $\\tan\\theta = \\frac43$. You need $\\tan\\frac{\\theta}{2}$.",
      solution: "Bisectors: $y = \\pm\\frac{4x - 3y}{5}$, giving $x - 2y = 0$ and $2x + y = 0$. The first, slope $\\frac12$, lies inside the acute angle (between slopes 0 and $\\frac43$). Check: $\\tan\\frac\\theta2 = \\frac{\\sin\\theta}{1 + \\cos\\theta} = \\frac{4/5}{8/5} = \\frac12$.",
      commonMistakes: [
        { answer: -2, feedback: "$2x + y = 0$ bisects the obtuse angle." },
        { answer: 0.6667, tolerance: 0.01, feedback: "Half the slope is not the slope of half the angle: use $\\tan\\frac\\theta2$." },
      ],
    },
    {
      type: "quiz",
      id: "slc2-5-q10",
      variant: "practice",
      multiple: true,
      question:
        "JEE Advanced. Consider $L_1$: $4x + 3y - 12 = 0$ and $L_2$: $3x + 4y - 12 = 0$. Which statements are true? Select all that apply.",
      options: [
        { text: "The origin lies in the obtuse angle between $L_1$ and $L_2$", correct: true, feedback: "Rewrite as $-4x - 3y + 12 = 0$, $-3x - 4y + 12 = 0$: then $a_1a_2 + b_1b_2 = 12 + 12 > 0$." },
        { text: "$y = x$ is the acute-angle bisector", feedback: "$y = x$ is the $+$ (origin) bisector, which here bisects the obtuse angle." },
        { text: "The acute-angle bisector is $7x + 7y - 24 = 0$", correct: true, feedback: "The $-$ sign: $-4x - 3y + 12 = 3x + 4y - 12$." },
        { text: "The acute angle $\\theta$ between the lines has $\\tan\\theta = \\frac{7}{24}$", correct: true, feedback: "$\\left\\lvert\\frac{-\\frac43 + \\frac34}{1 + 1}\\right\\rvert = \\frac{7/12}{2} = \\frac{7}{24}$." },
        { text: "The point $(1, 1)$ lies in the angle bisected by $7x + 7y - 24 = 0$", feedback: "$L_1(1, 1) = -5$ and $L_2(1, 1) = -5$ have the same signs as at the origin, so $(1, 1)$ is in the origin's (obtuse) angle." },
      ],
      hint: "Make both constants positive first, then use the sign test and the dot-product test.",
    },
    {
      type: "numeric",
      id: "slc2-5-q11",
      variant: "practice",
      question:
        "The incentre of the triangle bounded by $x = 0$, $y = 0$ and $5x + 12y = 60$ lies on the bisector $y = x$ of the right angle. Find the inradius.",
      answer: 2,
      hint: "The incentre $(r, r)$ is at distance $r$ from $5x + 12y - 60 = 0$, and lies on the origin's side.",
      solution: "$\\frac{\\lvert 5r + 12r - 60\\rvert}{13} = r$ with $17r < 60$ gives $60 - 17r = 13r$, so $r = 2$. Check: for a right triangle $r = \\frac{5 + 12 - 13}{2} = 2$.",
      commonMistakes: [
        { answer: 15, feedback: "$r = 15$ solves the other sign, $17r - 60 = 13r$, which is an excentre beyond the hypotenuse." },
        { answer: 3.5294, tolerance: 0.01, feedback: "That is where $y = x$ meets the hypotenuse; the incentre is inside, at distance $r$ from it." },
      ],
    },
    {
      type: "numeric",
      id: "slc2-5-q12",
      variant: "practice",
      question:
        "A point $(h, 0)$ with $h > 0$ is equidistant from $3x + 4y = 12$ and $4x + 3y = 12$. Find $h$.",
      answer: 3.4286,
      tolerance: 0.01,
      hint: "Solve $\\lvert 3h - 12\\rvert = \\lvert 4h - 12\\rvert$.",
      solution: "$3h - 12 = 4h - 12$ gives $h = 0$ (excluded), and $3h - 12 = -(4h - 12)$ gives $7h = 24$, $h = \\frac{24}{7}$. That point is where the acute bisector $x + y = \\frac{24}{7}$ meets the x-axis.",
      commonMistakes: [
        { answer: 0, feedback: "$h = 0$ is on the other bisector $y = x$, but the question needs $h > 0$." },
        { answer: 3, feedback: "$(3, 0)$ is on $4x + 3y = 12$, so its distance from that line is 0." },
      ],
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-2-mastery",
  title: "2.6 · Chapter 2 Mastery",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "No new theory here, and no formula sheet. Every question below can be rebuilt from two objects: the slope (for angles) and the signed value $L(P) = ax_1 + by_1 + c$ together with the normal $(a, b)$ (for distances, feet, images, sides and bisectors). If you are stuck, draw the line, its normal arrow and the point.",
    },
    { type: "heading", text: "Reconstruct it" },
    {
      type: "callout",
      variant: "tip",
      title: "Rebuild the chapter from the normal vector",
      content:
        "Draw a line with its normal $(a, b)$ and a point $P$ off the line. Without notes:\n\n1. Why is the distance $\\frac{\\lvert L(P)\\rvert}{\\sqrt{a^2 + b^2}}$? (Project $\\overrightarrow{QP}$ onto the normal.)\n2. Walk from $P$ along the normal: $(x_1 + at, y_1 + bt)$. Which $t$ lands on the line? Which $t$ gives the image?\n3. Why does the sign of $L$ flip exactly when you cross the line?\n4. Why is the bisector of the angle containing a point $P$ given by the sign that matches the signs of $L_1(P)$ and $L_2(P)$?\n5. Why does $a_1a_2 + b_1b_2 > 0$ (with $c_1, c_2 > 0$) put the origin in the obtuse angle?",
    },
    {
      type: "interactive",
      config: {
        component: "slc-line-explorer",
        mode: "two-lines",
        a: [-5, 1],
        b: [4, -2],
        c: [-2, -4],
        d: [3, 4],
        show: ["bisectors"],
        caption:
          "Check your reconstructions. Before you drag anything, predict the acute angle, which bisector holds the origin, and whether it is the acute one. Then move a point and predict again.",
      },
    },
    { type: "heading", text: "Mastery questions" },
    {
      type: "numeric",
      id: "slc2-6-q1",
      variant: "mastery",
      question: "Find the acute angle, in degrees, between $x + \\sqrt3\\,y = 1$ and $\\sqrt3\\,x + y = 2$.",
      answer: 30,
      unit: "degrees",
      hint: "Lesson 2.1: find each inclination from the slopes $-\\frac{1}{\\sqrt3}$ and $-\\sqrt3$.",
      solution: "Inclinations $150^\\circ$ and $120^\\circ$ differ by $30^\\circ$. Check: $\\cos\\theta = \\frac{\\sqrt3 + \\sqrt3}{2 \\cdot 2} = \\frac{\\sqrt3}{2}$.",
      commonMistakes: [
        { answer: 60, feedback: "$60^\\circ$ would need the slopes $\\sqrt3$ and $-\\sqrt3$ or similar. Here both slopes are negative." },
        { answer: 150, feedback: "That is an inclination, not the angle between the lines." },
      ],
    },
    {
      type: "numeric",
      id: "slc2-6-q2",
      variant: "mastery",
      question: "Find the distance between the parallel lines $4x - 3y + 5 = 0$ and $8x - 6y - 15 = 0$.",
      answer: 2.5,
      hint: "Lesson 2.2: halve the second equation first.",
      solution: "$4x - 3y - 7.5 = 0$ and $4x - 3y + 5 = 0$: $d = \\frac{\\lvert 5 + 7.5\\rvert}{5} = 2.5$.",
      commonMistakes: [
        { answer: 4, feedback: "You subtracted $5$ and $-15$ without scaling: halve $8x - 6y - 15$ first." },
        { answer: 0.5, feedback: "The constants have opposite signs: $\\lvert 5 - (-7.5)\\rvert = 12.5$." },
      ],
    },
    {
      type: "quiz",
      id: "slc2-6-q3",
      variant: "mastery",
      question: "The foot of the perpendicular from $(-1, 3)$ to $3x - 4y - 16 = 0$ is",
      options: [
        { text: "$\\left(\\frac{68}{25}, -\\frac{49}{25}\\right)$", correct: true, feedback: "$L = -3 - 12 - 16 = -31$, $t = \\frac{31}{25}$: $\\left(-1 + \\frac{93}{25},\\ 3 - \\frac{124}{25}\\right)$." },
        { text: "$\\left(\\frac{161}{25}, -\\frac{173}{25}\\right)$", feedback: "That is the image ($t = \\frac{62}{25}$), not the foot." },
        { text: "$\\left(-\\frac{118}{25}, \\frac{199}{25}\\right)$", feedback: "That uses $t = -\\frac{31}{25}$: the sign of $t$ is $-\\frac{L(P)}{a^2 + b^2} = +\\frac{31}{25}$." },
        { text: "$(4, -1)$", feedback: "$(4, -1)$ is on the line, but the step from $P$ to it, $(5, -4)$, is not parallel to the normal $(3, -4)$, so it is not the foot of the perpendicular." },
      ],
      hint: "Lesson 2.3: $t = -\\frac{L(P)}{a^2 + b^2}$, then move from $P$ by $t(3, -4)$.",
    },
    {
      type: "numeric",
      id: "slc2-6-q4",
      variant: "mastery",
      question: "The image of $(-8, 12)$ in the line $4x + 7y + 13 = 0$ is $(h, k)$. Find $h + k$.",
      answer: -18,
      hint: "Lesson 2.3: $L(-8, 12) = 65$ and $a^2 + b^2 = 65$.",
      solution: "$t = -\\frac{2 \\cdot 65}{65} = -2$: $(h, k) = (-8 - 8,\\ 12 - 14) = (-16, -2)$, so $h + k = -18$.",
      commonMistakes: [
        { answer: -7, feedback: "That comes from the foot $(-12, 5)$. The image needs $t = -2$." },
        { answer: 26, feedback: "Moving with $t = +2$ goes the wrong way; $t = -\\frac{2L(P)}{a^2 + b^2}$ is negative here." },
      ],
    },
    {
      type: "quiz",
      id: "slc2-6-q5",
      variant: "mastery",
      multiple: true,
      question: "Which points lie on the opposite side of $2x - 3y + 6 = 0$ from the origin? Select all that apply.",
      options: [
        { text: "$(-3, 1)$", correct: true, feedback: "$-6 - 3 + 6 = -3 < 0$, while $L(O) = 6 > 0$." },
        { text: "$(-4, 0)$", correct: true, feedback: "$-8 + 6 = -2 < 0$." },
        { text: "$(1, 1)$", feedback: "$2 - 3 + 6 = 5 > 0$: the origin's side." },
        { text: "$(0, 2)$", feedback: "$-6 + 6 = 0$: on the line." },
        { text: "$(2, 5)$", correct: true, feedback: "$4 - 15 + 6 = -5 < 0$." },
      ],
      hint: "Lesson 2.4: $L(O) = 6 > 0$. Look for negative values.",
    },
    {
      type: "numeric",
      id: "slc2-6-q6",
      variant: "mastery",
      question:
        "The line $2x + 3y - 5 = 0$ divides the segment from $A(1, -2)$ to $B(5, 5)$ in the ratio $k : 1$. Find $k$.",
      answer: 0.45,
      hint: "Lesson 2.4: $k = -\\frac{L(A)}{L(B)}$.",
      solution: "$L(A) = 2 - 6 - 5 = -9$, $L(B) = 10 + 15 - 5 = 20$, so $k = \\frac{9}{20} = 0.45$ (internal).",
      commonMistakes: [
        { answer: 2.2222, tolerance: 0.01, feedback: "Inverted: the ratio $AP : PB$ is $-L(A) : L(B) = 9 : 20$." },
        { answer: -0.45, feedback: "Opposite signs of $L(A)$ and $L(B)$ give a positive (internal) ratio." },
      ],
    },
    {
      type: "quiz",
      id: "slc2-6-q7",
      variant: "mastery",
      question: "The bisector of the acute angle between $4x + 3y - 7 = 0$ and $24x + 7y - 31 = 0$ is",
      options: [
        { text: "$2x + y - 3 = 0$", correct: true, feedback: "With $c > 0$: $-4x - 3y + 7$ and $-24x - 7y + 31$; $a_1a_2 + b_1b_2 = 117 > 0$, so the origin is in the obtuse angle and the acute bisector takes the $-$ sign." },
        { text: "$x - 2y + 1 = 0$", feedback: "That is the $+$ bisector, which bisects the obtuse angle containing the origin." },
        { text: "$2x - y - 1 = 0$", feedback: "Both bisectors pass through the crossing point $(1, 1)$; this line does too, but it is not equidistant from the two lines." },
        { text: "$x + 2y - 3 = 0$", feedback: "Test a point: $(3, 0)$ is on it, at distances $1$ and $\\frac{41}{25}$ from the lines." },
      ],
      hint: "Lesson 2.5: make the constants positive, test $a_1a_2 + b_1b_2$, then pick the sign.",
    },
    {
      type: "numeric",
      id: "slc2-6-q8",
      variant: "mastery",
      question: "Find the length of the perpendicular from the origin to the line $\\frac{x}{3} + \\frac{y}{4} = 1$.",
      answer: 2.4,
      hint: "Lesson 2.2: rewrite as $4x + 3y - 12 = 0$.",
      solution: "$\\frac{12}{5} = 2.4$. (In general $\\frac{1}{p^2} = \\frac{1}{a^2} + \\frac{1}{b^2}$ for intercepts $a$, $b$.)",
      commonMistakes: [
        { answer: 12, feedback: "Divide by $\\sqrt{16 + 9} = 5$." },
        { answer: 5, feedback: "5 is the length of the segment between the intercepts, the hypotenuse." },
      ],
    },
    {
      type: "numeric",
      id: "slc2-6-q9",
      variant: "mastery",
      question:
        "JEE Main. Two points on the line $x + y = 4$ are at unit distance from $4x + 3y = 10$. Find the sum of their x-coordinates.",
      answer: -4,
      hint: "Put $y = 4 - x$ into $\\frac{\\lvert 4x + 3y - 10\\rvert}{5} = 1$.",
      solution: "$\\lvert 4x + 12 - 3x - 10\\rvert = 5$, i.e. $\\lvert x + 2\\rvert = 5$: $x = 3$ or $x = -7$. The points are $(3, 1)$ and $(-7, 11)$, and $3 + (-7) = -4$.",
      commonMistakes: [
        { answer: 3, feedback: "There are two points; the other has $x = -7$." },
        { answer: 6, feedback: "$\\lvert x + 2\\rvert = 5$ gives $x = 3$ or $x = -7$, not $\\pm 3$." },
      ],
    },
    {
      type: "numeric",
      id: "slc2-6-q10",
      variant: "mastery",
      question:
        "JEE Main. $p$ and $q$ are the perpendicular distances from the origin to $x\\sec\\theta + y\\csc\\theta = a$ and $x\\cos\\theta - y\\sin\\theta = a\\cos 2\\theta$. Then $4p^2 + q^2 = k a^2$. Find $k$.",
      answer: 1,
      hint: "For the first line, $\\sec^2\\theta + \\csc^2\\theta = \\frac{1}{\\sin^2\\theta\\cos^2\\theta}$. The second line already has $a^2 + b^2 = 1$.",
      solution: "$p = \\frac{a}{\\sqrt{\\sec^2\\theta + \\csc^2\\theta}} = a\\sin\\theta\\cos\\theta$, so $4p^2 = a^2\\sin^2 2\\theta$. $q = \\lvert a\\cos 2\\theta\\rvert$, so $q^2 = a^2\\cos^2 2\\theta$. Sum: $a^2$, so $k = 1$.",
      commonMistakes: [
        { answer: 2, feedback: "$4p^2 = a^2\\sin^2 2\\theta$, and $\\sin^2 2\\theta + \\cos^2 2\\theta = 1$." },
        { answer: 4, feedback: "The 4 is absorbed: $4\\sin^2\\theta\\cos^2\\theta = \\sin^2 2\\theta$." },
      ],
    },
    {
      type: "quiz",
      id: "slc2-6-q11",
      variant: "mastery",
      multiple: true,
      question: "Which lines are parallel to $3x + 4y = 0$ and at distance 3 from the point $(1, 2)$? Select all that apply.",
      options: [
        { text: "$3x + 4y + 4 = 0$", correct: true, feedback: "$\\frac{\\lvert 3 + 8 + 4\\rvert}{5} = 3$." },
        { text: "$3x + 4y - 26 = 0$", correct: true, feedback: "$\\frac{\\lvert 11 - 26\\rvert}{5} = 3$." },
        { text: "$3x + 4y - 4 = 0$", feedback: "$\\frac{\\lvert 11 - 4\\rvert}{5} = 1.4$." },
        { text: "$3x + 4y + 26 = 0$", feedback: "$\\frac{37}{5} = 7.4$." },
        { text: "$3x + 4y - 11 = 0$", feedback: "This one passes through $(1, 2)$: distance 0." },
      ],
      hint: "Lesson 2.2: $\\frac{\\lvert 11 + c\\rvert}{5} = 3$.",
    },
    {
      type: "numeric",
      id: "slc2-6-q12",
      variant: "mastery",
      question:
        "$A(1, 3)$ and $B(5, 1)$ are given, and $P$ moves on the line $y = x$. Find the least value of $PA + PB$ (to two decimal places).",
      answer: 4.4721,
      tolerance: 0.01,
      hint: "Lesson 2.4 before Lesson 2.3: are $A$ and $B$ on the same side of $y = x$?",
      solution: "$x - y$ is $-2$ at $A$ and $4$ at $B$: opposite sides. So the segment $AB$ itself crosses $y = x$, and the least value is $AB = \\sqrt{16 + 4} = 2\\sqrt5 \\approx 4.47$. No reflection is needed.",
      commonMistakes: [
        { answer: 2, feedback: "Reflecting $A$ to $(3, 1)$ is only right when $A$ and $B$ are on the **same** side. Here they are not." },
        { answer: 6, feedback: "That is $\\lvert L(A)\\rvert + \\lvert L(B)\\rvert$, not a length." },
      ],
    },
    {
      type: "quiz",
      id: "slc2-6-q13",
      variant: "mastery",
      question: "The point $(a, a^2)$ lies on the same side of $x + 2y - 3 = 0$ as the origin exactly when",
      options: [
        { text: "$-\\frac32 < a < 1$", correct: true, feedback: "$L(O) = -3 < 0$, so need $2a^2 + a - 3 < 0$, i.e. $(2a + 3)(a - 1) < 0$." },
        { text: "$a < -\\frac32$ or $a > 1$", feedback: "That is the opposite side." },
        { text: "$-1 < a < \\frac32$", feedback: "Factor again: $2a^2 + a - 3 = (2a + 3)(a - 1)$, with roots $-\\frac32$ and 1." },
        { text: "$0 < a < 1$", feedback: "$a = -1$ gives $L = -1 + 2 - 3 = -2 < 0$, also the origin's side." },
      ],
      hint: "Lesson 2.4: compare the sign of $L(a, a^2)$ with $L(0, 0) = -3$.",
    },
    {
      type: "numeric",
      id: "slc2-6-q14",
      variant: "mastery",
      question: "Two points on the y-axis are at distance 3 from the line $4x + 3y = 6$. Find the distance between them.",
      answer: 10,
      hint: "Solve $\\frac{\\lvert 3k - 6\\rvert}{5} = 3$ for $(0, k)$.",
      solution: "$\\lvert 3k - 6\\rvert = 15$ gives $k = 7$ or $k = -3$. The points $(0, 7)$ and $(0, -3)$ are 10 apart. (Equivalently: the gap between the two parallel lines at distance 3 is 6, measured perpendicular; along the y-axis it is $\\frac{6}{\\cos\\phi}$ with $\\cos\\phi = \\frac35$.)",
      commonMistakes: [
        { answer: 6, feedback: "6 is the perpendicular gap between the two parallel lines. Along the y-axis, which is slanted to them, the gap is longer." },
        { answer: 4, feedback: "The two values are $7$ and $-3$: subtract, $7 - (-3) = 10$." },
      ],
    },
    {
      type: "quiz",
      id: "slc2-6-q15",
      variant: "mastery",
      multiple: true,
      question: "For the line $4x - 3y = 5$ and the point $P(3, -1)$, which statements are true? Select all that apply.",
      options: [
        { text: "The foot of the perpendicular from $P$ is $\\left(\\frac75, \\frac15\\right)$", correct: true, feedback: "$L(P) = 12 + 3 - 5 = 10$, $t = -\\frac{10}{25}$: $\\left(3 - \\frac85,\\ -1 + \\frac65\\right)$." },
        { text: "The image of $P$ is $\\left(-\\frac15, \\frac75\\right)$", correct: true, feedback: "$t = -\\frac{20}{25}$: $\\left(3 - \\frac{16}{5},\\ -1 + \\frac{12}{5}\\right)$." },
        { text: "The distance of $P$ from the line is 10", feedback: "10 is $L(P)$; divide by $\\sqrt{16 + 9} = 5$ to get 2." },
        { text: "$P$ and the origin are on the same side of the line", feedback: "$L(P) = 10 > 0$ but $L(O) = -5 < 0$." },
        { text: "The image of $P$ is on the same side as the origin", correct: true, feedback: "Reflection flips the side: $L(P') = -10$, the same sign as $L(O)$." },
      ],
      hint: "Lessons 2.2 to 2.4: compute $L(P)$ once and use it everywhere.",
    },
    {
      type: "numeric",
      id: "slc2-6-q16",
      variant: "mastery",
      question:
        "JEE Advanced. Find the area of the parallelogram whose sides lie on $y = 2x$, $y = 2x + 4$, $y = -x$ and $y = -x + 3$.",
      answer: 4,
      hint: "Lesson 2.2: write the pairs as $2x - y + c = 0$ and $x + y + c = 0$, then use $\\frac{\\lvert(c_1 - d_1)(c_2 - d_2)\\rvert}{\\lvert a_1b_2 - a_2b_1\\rvert}$.",
      solution: "$\\frac{\\lvert 4 \\cdot 3\\rvert}{\\lvert 2 \\cdot 1 - 1 \\cdot (-1)\\rvert} = \\frac{12}{3} = 4$. Check by vertices: $(0, 0)$, $\\left(-\\frac43, \\frac43\\right)$, $\\left(-\\frac13, \\frac{10}{3}\\right)$, $(1, 2)$; the shoelace formula gives 4.",
      commonMistakes: [
        { answer: 12, feedback: "Divide by $\\lvert a_1b_2 - a_2b_1\\rvert = 3$." },
        { answer: 2, feedback: "Recheck the cross term: $a_1b_2 - a_2b_1 = 2(1) - 1(-1) = 3$, not 6." },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Where next",
      content:
        "So far we have handled lines one or two at a time. Chapter 3 treats them in bulk: when three lines meet at a point, how $L_1 + \\lambda L_2 = 0$ describes **every** line through an intersection without finding it, how to get the lines at a given angle to a line, and how one second-degree equation can hold a whole pair of lines. The bisector equation you just used, $\\frac{L_1}{n_1} = \\pm\\frac{L_2}{n_2}$, is already a member of such a family.",
    },
  ]),
};

export const slcChapter2Lessons: LessonSeed[] = [lesson01, lesson02, lesson03, lesson04, lesson05, lessonMastery];
