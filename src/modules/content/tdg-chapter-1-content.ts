import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Three-Dimensional Geometry Chapter 1 — Direction of a Line. The
 * direction of a line in space as three numbers: direction cosines (recap
 * from vector algebra, with what changes for an undirected line), direction
 * ratios and the direction of the line through two points, the angle
 * between two lines, parallel and perpendicular conditions (including lines
 * whose direction cosines satisfy two given relations), and the projection
 * of a segment on a line.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "direction-cosines-of-a-line",
  title: "1.1 · Direction Cosines of a Line",
  position: 1,
  blocks: blocks([
    {
      type: "text",
      content:
        "In the plane, one number (the slope, or the inclination) fixes the direction of a line. In space a line can tilt in two independent ways, so one number is not enough. The cleanest description uses the three angles the line makes with the coordinate axes.",
    },
    {
      type: "text",
      content:
        "You met these angles in vector algebra as the direction angles of a **vector**. This lesson recaps them in one screen and then asks what changes when the object is a **line**, which has no arrowhead.",
    },
    { type: "heading", text: "Recap: direction cosines of a vector" },
    {
      type: "text",
      content:
        "Let $\\vec r = x\\hat i + y\\hat j + z\\hat k$ have length $r$ and make angles $\\alpha$, $\\beta$, $\\gamma$ with the positive x, y and z axes. Dropping a perpendicular from the tip to each axis gives a right triangle with hypotenuse $r$ and the coordinate as the adjacent side, so",
    },
    {
      type: "math",
      latex: "l = \\cos\\alpha = \\frac{x}{r}, \\qquad m = \\cos\\beta = \\frac{y}{r}, \\qquad n = \\cos\\gamma = \\frac{z}{r}",
    },
    {
      type: "text",
      content:
        "Squaring and adding, $l^2 + m^2 + n^2 = \\frac{x^2 + y^2 + z^2}{r^2} = 1$. In other words $(l, m, n)$ are the components of the **unit vector** $\\hat r$. Each angle lies in $[0^\\circ, 180^\\circ]$, and a negative cosine means an obtuse angle with that axis.",
    },
    {
      type: "interactive",
      config: {
        component: "vec-space-3d",
        mode: "direction-angles",
        a: [2, 3, 6],
        sliders: [
          { name: "ax", min: -6, max: 6, step: 1, initial: 2 },
          { name: "ay", min: -6, max: 6, step: 1, initial: 3 },
          { name: "az", min: -6, max: 6, step: 1, initial: 6 },
        ],
        showAngles: true,
        readouts: ["direction-cosines", "magnitude"],
        caption:
          "Drag to rotate. At $(2, 3, 6)$ the length is 7 and the direction cosines are $\\frac27, \\frac37, \\frac67$. Watch $l^2 + m^2 + n^2$ stay at 1 while the sum of the three angles wanders.",
      },
    },
    { type: "heading", text: "What changes for a line" },
    {
      type: "text",
      content:
        "A line through the origin along $\\vec r$ also runs along $-\\vec r$. If we direct it one way, the angles are $\\alpha, \\beta, \\gamma$; directed the other way, they become $180^\\circ - \\alpha$, $180^\\circ - \\beta$, $180^\\circ - \\gamma$, and every cosine changes sign.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Direction cosines of a line",
      content:
        "If a line, given a sense, makes angles $\\alpha, \\beta, \\gamma$ with the positive axes, then $l = \\cos\\alpha$, $m = \\cos\\beta$, $n = \\cos\\gamma$ are its **direction cosines** (DCs), and\n\n$$l^2 + m^2 + n^2 = 1.$$\n\nAn undirected line has **two** sets of DCs, $(l, m, n)$ and $(-l, -m, -n)$. A line not through the origin has the same DCs as the parallel line through the origin.",
    },
    {
      type: "text",
      content:
        "Some standard sets: the x-axis has DCs $(1, 0, 0)$ (or $(-1, 0, 0)$), the y-axis $(0, 1, 0)$, the z-axis $(0, 0, 1)$. A line in the xy-plane making $30^\\circ$ with the x-axis has $\\gamma = 90^\\circ$, so its DCs are $\\left(\\frac{\\sqrt3}{2}, \\frac12, 0\\right)$.",
    },
    { type: "heading", text: "Identities you can derive in one line" },
    {
      type: "text",
      content:
        "Everything below comes from $\\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma = 1$:\n\n- $\\sin^2\\alpha + \\sin^2\\beta + \\sin^2\\gamma = 3 - 1 = 2$.\n- $\\cos 2\\alpha + \\cos 2\\beta + \\cos 2\\gamma = (2\\cos^2\\alpha - 1) + (2\\cos^2\\beta - 1) + (2\\cos^2\\gamma - 1) = 2 - 3 = -1$.\n- A line equally inclined to the three axes has $3l^2 = 1$, so $l = m = n = \\pm\\frac{1}{\\sqrt3}$.\n- Three numbers can be DCs only if their squares add to exactly 1.",
    },
    {
      type: "interactive",
      config: {
        component: "tdg-distance-lab",
        mode: "direction",
        d1: [1, 1, 1],
        caption:
          "Start with direction $(1, 1, 1)$: each DC is $\\frac{1}{\\sqrt3} \\approx 0.577$ and each angle is about $54.7^\\circ$, not $60^\\circ$. Change the numbers and check that the squares of the DCs always add to 1.",
      },
    },
    {
      type: "worked-example",
      id: "tdg1-1-we1",
      title: "Worked example 1: the third angle",
      problem: "A line makes $60^\\circ$ with the x-axis and $45^\\circ$ with the y-axis. Find the angle it makes with the z-axis.",
      steps: [
        { text: "Write the identity with the two known cosines, $\\cos 60^\\circ = \\frac12$ and $\\cos 45^\\circ = \\frac{1}{\\sqrt2}$." },
        { latex: "\\cos^2\\gamma = 1 - \\frac14 - \\frac12 = \\frac14" },
        {
          text: "So $\\cos\\gamma = \\pm\\frac12$. *Why two answers:* the identity fixes only $\\cos^2\\gamma$. With $\\cos\\gamma = \\frac12$ we get $\\gamma = 60^\\circ$; with $-\\frac12$ we get $120^\\circ$, which describes a different line, symmetric to the first in the xy-plane.",
        },
      ],
      answer: "$\\gamma = 60^\\circ$ or $120^\\circ$ (the acute angle is $60^\\circ$).",
    },
    {
      type: "worked-example",
      id: "tdg1-1-we2",
      title: "Worked example 2: can these be direction cosines?",
      problem: "Decide whether $\\left(\\frac12, \\frac12, \\frac12\\right)$ and $\\left(\\frac{1}{\\sqrt2}, \\frac12, -\\frac12\\right)$ can be the direction cosines of a line.",
      steps: [
        { text: "Test the sum of squares for the first triple: $\\frac14 + \\frac14 + \\frac14 = \\frac34 \\ne 1$. Not DCs (they are direction ratios of some line, a topic for Lesson 1.2)." },
        { text: "Second triple: $\\frac12 + \\frac14 + \\frac14 = 1$. These are DCs. The line makes $45^\\circ$ with the x-axis, $60^\\circ$ with the y-axis and $120^\\circ$ with the z-axis." },
      ],
      answer: "Only the second triple can be direction cosines.",
    },
    {
      type: "worked-example",
      id: "tdg1-1-we3",
      title: "Worked example 3: a line equally inclined to the axes",
      problem: "Find the direction cosines of a line that makes equal angles with the three coordinate axes, and the angle itself.",
      steps: [
        { text: "Let the common angle be $\\alpha$. Then $3\\cos^2\\alpha = 1$." },
        { latex: "\\cos\\alpha = \\pm\\frac{1}{\\sqrt3}" },
        { text: "The DCs are $\\left(\\frac{1}{\\sqrt3}, \\frac{1}{\\sqrt3}, \\frac{1}{\\sqrt3}\\right)$ or all three negative. *Why the sign is shared:* the angles are equal, so their cosines are equal, including the sign." },
      ],
      answer: "$\\pm\\left(\\frac{1}{\\sqrt3}, \\frac{1}{\\sqrt3}, \\frac{1}{\\sqrt3}\\right)$, with $\\alpha = \\cos^{-1}\\frac{1}{\\sqrt3} \\approx 54.7^\\circ$ (or its supplement).",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the three angles add to 180°\"",
      content:
        "In a triangle the angles add to $180^\\circ$, but direction angles are not the angles of any triangle. The line equally inclined to the axes has $\\alpha = \\beta = \\gamma \\approx 54.7^\\circ$, total about $164^\\circ$; the x-axis itself has $0^\\circ + 90^\\circ + 90^\\circ = 180^\\circ$. The only rule is $\\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma = 1$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a line has exactly one set of direction cosines\"",
      content:
        "A vector has one set. A line has two, $(l, m, n)$ and $(-l, -m, -n)$, one for each sense of travel. When an answer key gives $\\left(\\frac23, -\\frac13, \\frac23\\right)$ and you found $\\left(-\\frac23, \\frac13, -\\frac23\\right)$, you are both right.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "tdg1-1-q1",
      variant: "practice",
      question: "A line makes $45^\\circ$ with the x-axis and $60^\\circ$ with the y-axis. Find the **acute** angle, in degrees, that it makes with the z-axis.",
      answer: 60,
      unit: "degrees",
      hint: "$\\cos^2\\gamma = 1 - \\cos^2 45^\\circ - \\cos^2 60^\\circ$.",
      solution: "$\\cos^2\\gamma = 1 - \\frac12 - \\frac14 = \\frac14$, so $\\cos\\gamma = \\pm\\frac12$. The acute angle is $60^\\circ$.",
      commonMistakes: [
        { answer: 75, feedback: "That is $180^\\circ - 45^\\circ - 60^\\circ$: the angles do not add to $180^\\circ$. Use the sum of squares of the cosines." },
        { answer: 120, feedback: "$120^\\circ$ is the obtuse possibility; the question asks for the acute one." },
      ],
    },
    {
      type: "quiz",
      id: "tdg1-1-q2",
      variant: "practice",
      multiple: true,
      question: "Which triples can be the direction cosines of a line? Select all that apply.",
      options: [
        { text: "$\\left(\\frac{1}{\\sqrt2}, \\frac12, \\frac12\\right)$", correct: true, feedback: "$\\frac12 + \\frac14 + \\frac14 = 1$." },
        { text: "$\\left(\\frac27, -\\frac37, \\frac67\\right)$", correct: true, feedback: "$\\frac{4 + 9 + 36}{49} = 1$. A negative entry is fine: that angle is obtuse." },
        { text: "$\\left(\\frac12, \\frac12, \\frac12\\right)$", feedback: "The squares add to $\\frac34$." },
        { text: "$(1, 1, 1)$", feedback: "The squares add to 3. These could be direction ratios, not cosines." },
        { text: "$\\left(\\frac{1}{\\sqrt3}, \\frac{1}{\\sqrt3}, \\frac13\\right)$", feedback: "$\\frac13 + \\frac13 + \\frac19 = \\frac79$." },
      ],
      hint: "Add the squares. Only a total of exactly 1 works.",
    },
    {
      type: "numeric",
      id: "tdg1-1-q3",
      variant: "practice",
      question: "A line makes angles $\\alpha, \\beta, \\gamma$ with the coordinate axes. Find $\\sin^2\\alpha + \\sin^2\\beta + \\sin^2\\gamma$.",
      answer: 2,
      hint: "Replace each $\\sin^2$ by $1 - \\cos^2$.",
      solution: "$3 - (\\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma) = 3 - 1 = 2$.",
      commonMistakes: [
        { answer: 1, feedback: "That is the sum of the squares of the **cosines**." },
        { answer: 3, feedback: "Subtract the cosine squares: $\\sin^2 = 1 - \\cos^2$ for each angle." },
      ],
    },
    {
      type: "numeric",
      id: "tdg1-1-q4",
      variant: "practice",
      question: "For a line making angles $\\alpha, \\beta, \\gamma$ with the axes, find $\\cos 2\\alpha + \\cos 2\\beta + \\cos 2\\gamma$.",
      answer: -1,
      hint: "$\\cos 2\\alpha = 2\\cos^2\\alpha - 1$.",
      solution: "$2(\\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma) - 3 = 2 - 3 = -1$.",
      commonMistakes: [
        { answer: 1, feedback: "Check the sign: the three $-1$ terms total $-3$." },
        { answer: 2, feedback: "Use $\\cos 2\\alpha = 2\\cos^2\\alpha - 1$, then the sum is $2 \\cdot 1 - 3$." },
      ],
    },
    {
      type: "quiz",
      id: "tdg1-1-q5",
      variant: "concept",
      question: "A line has direction cosines $(l, m, n)$. Which triple is **also** a set of direction cosines of the same line?",
      options: [
        { text: "$(-l, -m, -n)$", correct: true, feedback: "Reversing the sense of travel turns each angle into its supplement and flips every cosine." },
        { text: "$(l, m, -n)$", feedback: "Flipping one sign gives a different line (the mirror image in the xy-plane)." },
        { text: "$(2l, 2m, 2n)$", feedback: "Its squares add to 4. It is a set of direction ratios of the line, not cosines." },
        { text: "$(m, n, l)$", feedback: "Permuting the entries points the line in a different direction." },
      ],
      hint: "What happens to the angles with the axes if you walk along the line the other way?",
    },
    {
      type: "numeric",
      id: "tdg1-1-q6",
      variant: "practice",
      question: "A line makes equal acute angles with the three coordinate axes. Find the cosine of that angle (to three decimal places).",
      answer: 0.57735,
      tolerance: 0.001,
      hint: "Set $l = m = n$ in $l^2 + m^2 + n^2 = 1$.",
      solution: "$3l^2 = 1$, so $l = \\frac{1}{\\sqrt3} \\approx 0.577$.",
      commonMistakes: [
        { answer: 0.33333, tolerance: 0.001, feedback: "That is $l^2$. Take the square root." },
        { answer: 0.5, feedback: "$\\cos 60^\\circ = 0.5$ would need $3 \\cdot \\frac14 = 1$, which fails. The angle is about $54.7^\\circ$." },
      ],
    },
    {
      type: "numeric",
      id: "tdg1-1-q7",
      variant: "practice",
      question: "A directed line makes $120^\\circ$ with the x-axis and $45^\\circ$ with the y-axis, and an obtuse angle with the z-axis. Find that angle in degrees.",
      answer: 120,
      unit: "degrees",
      hint: "$\\cos^2\\gamma = 1 - \\cos^2 120^\\circ - \\cos^2 45^\\circ$; then choose the sign for an obtuse angle.",
      solution: "$\\cos^2\\gamma = 1 - \\frac14 - \\frac12 = \\frac14$. Obtuse means $\\cos\\gamma = -\\frac12$, so $\\gamma = 120^\\circ$.",
      commonMistakes: [
        { answer: 60, feedback: "$\\cos\\gamma = +\\frac12$ gives the acute angle. The line here makes an obtuse angle with the z-axis." },
        { answer: 15, feedback: "The angles do not add to $180^\\circ$. Use the cosines." },
      ],
    },
    {
      type: "quiz",
      id: "tdg1-1-q8",
      variant: "concept",
      multiple: true,
      question: "For every line with direction angles $\\alpha, \\beta, \\gamma$, which statements are true? Select all that apply.",
      options: [
        { text: "$\\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma = 1$", correct: true, feedback: "The DCs are the components of a unit vector." },
        { text: "$\\sin^2\\alpha + \\sin^2\\beta + \\sin^2\\gamma = 2$", correct: true, feedback: "$3 - 1 = 2$." },
        { text: "$\\cos 2\\alpha + \\cos 2\\beta + \\cos 2\\gamma = -1$", correct: true, feedback: "$2 \\cdot 1 - 3 = -1$." },
        { text: "$\\alpha + \\beta + \\gamma = 180^\\circ$", feedback: "For the line equally inclined to the axes the sum is about $164^\\circ$." },
        { text: "$\\cos\\alpha + \\cos\\beta + \\cos\\gamma = 1$", feedback: "The cosines themselves can add to anything between $-\\sqrt3$ and $\\sqrt3$; it is their **squares** that add to 1." },
      ],
      hint: "Everything true here follows from $l^2 + m^2 + n^2 = 1$.",
    },
    {
      type: "numeric",
      id: "tdg1-1-q9",
      variant: "practice",
      question: "A line has direction cosines $l = \\frac13$, $m = -\\frac23$ and $n > 0$. Find $n$ (a fraction such as 3/4 is fine).",
      answer: 0.666667,
      tolerance: 0.001,
      hint: "$n^2 = 1 - l^2 - m^2$.",
      solution: "$n^2 = 1 - \\frac19 - \\frac49 = \\frac49$, and $n > 0$ gives $n = \\frac23$.",
      commonMistakes: [
        { answer: 0.444444, tolerance: 0.001, feedback: "That is $n^2$. Take the square root." },
        { answer: 1.333333, tolerance: 0.001, feedback: "The cosines do not add to 1; their squares do." },
      ],
    },
    {
      type: "quiz",
      id: "tdg1-1-q10",
      variant: "practice",
      question:
        "JEE Main. A line makes angles $\\alpha, \\beta, \\gamma, \\delta$ with the four body diagonals of a cube. Then $\\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma + \\cos^2\\delta$ equals",
      options: [
        { text: "$\\frac43$", correct: true, feedback: "With the cube's edges as axes the diagonals have DCs $\\frac{1}{\\sqrt3}(\\pm1, \\pm1, 1)$. Squaring $\\frac{l \\pm m \\pm n}{\\sqrt3}$ and adding over the four sign patterns, the cross terms cancel and leave $\\frac{4(l^2 + m^2 + n^2)}{3} = \\frac43$." },
        { text: "$1$", feedback: "That would be the answer for the three coordinate axes, not the four diagonals." },
        { text: "$\\frac{4}{9}$", feedback: "Each $\\cos^2$ carries a factor $\\frac13$ from the diagonal's length $\\sqrt3$, not $\\frac19$." },
        { text: "$2$", feedback: "Test the line along an edge, $(1, 0, 0)$: each diagonal gives $\\cos^2 = \\frac13$, total $\\frac43$." },
      ],
      hint: "Take the cube's edges as the axes; the diagonals have direction ratios $(1, 1, 1)$, $(-1, 1, 1)$, $(1, -1, 1)$, $(1, 1, -1)$.",
    },
    {
      type: "numeric",
      id: "tdg1-1-q11",
      variant: "practice",
      question:
        "JEE Main. A line makes an angle $\\theta$ with each of the x and y axes and an angle $\\beta$ with the z-axis, where $\\sin^2\\beta = 3\\sin^2\\theta$. Find $\\cos^2\\theta$.",
      answer: 0.6,
      hint: "Write $2\\cos^2\\theta + \\cos^2\\beta = 1$ and replace $\\cos^2\\beta$ by $1 - 3\\sin^2\\theta$.",
      solution: "$2\\cos^2\\theta + 1 - 3\\sin^2\\theta = 1$, so $2\\cos^2\\theta = 3(1 - \\cos^2\\theta)$, giving $5\\cos^2\\theta = 3$ and $\\cos^2\\theta = \\frac35$.",
      commonMistakes: [
        { answer: 0.4, feedback: "$\\frac25$ is $\\sin^2\\theta$; the question asks for $\\cos^2\\theta$." },
        { answer: 0.75, feedback: "Count the $\\cos^2\\theta$ terms: the line makes $\\theta$ with **two** axes." },
      ],
    },
    {
      type: "quiz",
      id: "tdg1-1-q12",
      variant: "practice",
      question: "The direction cosines of the y-axis are",
      options: [
        { text: "$(0, 1, 0)$", correct: true, feedback: "It makes $90^\\circ$ with the x and z axes and $0^\\circ$ with itself." },
        { text: "$(1, 0, 1)$", feedback: "Those squares add to 2, so they cannot be DCs. (As direction ratios they would describe a line parallel to the xz-plane.)" },
        { text: "$(0, 0, 1)$", feedback: "That is the z-axis." },
        { text: "$\\left(\\frac{1}{\\sqrt3}, \\frac{1}{\\sqrt3}, \\frac{1}{\\sqrt3}\\right)$", feedback: "That is the line equally inclined to the axes." },
      ],
      hint: "Find the angle the y-axis makes with each axis.",
    },
    {
      type: "numeric",
      id: "tdg1-1-q13",
      variant: "practice",
      question: "A line makes equal acute angles $\\alpha$ with the x and y axes and $45^\\circ$ with the z-axis. Find $\\alpha$ in degrees.",
      answer: 60,
      unit: "degrees",
      hint: "$2\\cos^2\\alpha + \\cos^2 45^\\circ = 1$.",
      solution: "$2\\cos^2\\alpha = 1 - \\frac12 = \\frac12$, so $\\cos\\alpha = \\frac12$ and $\\alpha = 60^\\circ$.",
      commonMistakes: [
        { answer: 67.5, feedback: "The angles do not share $135^\\circ$ between them. Work with the cosines." },
        { answer: 45, feedback: "Then $\\cos^2$ would total $\\frac32$, too much." },
      ],
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "direction-ratios-and-two-points",
  title: "1.2 · Direction Ratios and Two Points",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "Direction cosines are tidy but rarely what a problem hands you. A line through $A(1, 2, 3)$ and $B(3, 5, 9)$ obviously runs \"2 across, 3 along, 6 up\", and those three numbers already fix its direction. They are **direction ratios**.",
    },
    { type: "heading", text: "Direction ratios" },
    {
      type: "callout",
      variant: "definition",
      title: "Direction ratios",
      content:
        "Any three numbers $(a, b, c)$, not all zero, proportional to the direction cosines $(l, m, n)$ of a line are **direction ratios** (DRs) of the line:\n\n$$\\frac{l}{a} = \\frac{m}{b} = \\frac{n}{c}.$$\n\nA line has infinitely many sets of DRs (every non-zero multiple), but only two sets of DCs.",
    },
    {
      type: "text",
      content:
        "Going back from ratios to cosines is normalising a vector. Since $(l, m, n) = k(a, b, c)$ and $l^2 + m^2 + n^2 = 1$, we need $k^2(a^2 + b^2 + c^2) = 1$:",
    },
    {
      type: "math",
      latex: "l = \\frac{\\pm a}{\\sqrt{a^2 + b^2 + c^2}}, \\quad m = \\frac{\\pm b}{\\sqrt{a^2 + b^2 + c^2}}, \\quad n = \\frac{\\pm c}{\\sqrt{a^2 + b^2 + c^2}}",
    },
    {
      type: "text",
      content: "with the same sign taken throughout. The two choices of sign are the two senses of the line.",
    },
    { type: "heading", text: "The line through two points" },
    {
      type: "text",
      content:
        "The vector $\\overrightarrow{AB} = (x_2 - x_1)\\hat i + (y_2 - y_1)\\hat j + (z_2 - z_1)\\hat k$ lies along the line $AB$, so its components are DRs of the line, and dividing by the length $AB$ gives DCs:",
    },
    {
      type: "math",
      latex: "\\text{DRs: } (x_2 - x_1,\\ y_2 - y_1,\\ z_2 - z_1), \\qquad \\text{DCs: } \\pm\\left(\\frac{x_2 - x_1}{AB}, \\frac{y_2 - y_1}{AB}, \\frac{z_2 - z_1}{AB}\\right)",
    },
    {
      type: "interactive",
      config: {
        component: "tdg-space-viewer",
        mode: "line",
        a: [1, 2, 3],
        b: [2, 3, 6],
        show: ["general-point"],
        caption:
          "The line through $A(1, 2, 3)$ with direction ratios $(2, 3, 6)$. At $\\lambda = 1$ the moving point is $B(3, 5, 9)$. Rotate the view: the step from $A$ to $B$ is $(2, 3, 6)$ whichever way you look, and its length 7 turns the ratios into the cosines $\\frac27, \\frac37, \\frac67$.",
      },
    },
    {
      type: "worked-example",
      id: "tdg1-2-we1",
      title: "Worked example 1: ratios to cosines",
      problem: "A line has direction ratios $(2, -1, -2)$. Find its direction cosines.",
      steps: [
        { text: "Length of the ratio vector:", latex: "\\sqrt{4 + 1 + 4} = 3" },
        { text: "Divide each ratio by 3, and allow both senses." },
      ],
      answer: "$\\pm\\left(\\frac23, -\\frac13, -\\frac23\\right)$.",
    },
    {
      type: "worked-example",
      id: "tdg1-2-we2",
      title: "Worked example 2: the line through two points",
      problem: "Find the direction cosines of the line through $P(1, 2, 3)$ and $Q(-1, 4, 2)$.",
      steps: [
        { text: "DRs from the difference $Q - P$:", latex: "(-1 - 1,\\ 4 - 2,\\ 2 - 3) = (-2, 2, -1)" },
        { text: "Length: $\\sqrt{4 + 4 + 1} = 3$. *Why this step:* $PQ = 3$, so the DCs are the DRs divided by 3." },
      ],
      answer: "$\\pm\\left(-\\frac23, \\frac23, -\\frac13\\right)$.",
    },
    {
      type: "worked-example",
      id: "tdg1-2-we3",
      title: "Worked example 3: collinearity by direction ratios",
      problem: "Show that $A(2, -1, 3)$, $B(4, 3, 1)$ and $C(5, 5, 0)$ are collinear, and find $AB : BC$.",
      steps: [
        { text: "DRs of $AB$: $(2, 4, -2)$. DRs of $BC$: $(1, 2, -1)$." },
        { text: "These are proportional ($(2, 4, -2) = 2(1, 2, -1)$), so $AB$ and $BC$ are parallel. *Why that is enough:* they also share the point $B$, so they lie on one line." },
        { text: "The factor 2 says $AB = 2\\,BC$, with $B$ between $A$ and $C$ (same sense)." },
      ],
      answer: "Collinear, with $AB : BC = 2 : 1$.",
    },
    {
      type: "worked-example",
      id: "tdg1-2-we4",
      title: "Worked example 4: a zero direction ratio",
      problem: "Find the direction cosines of the line through $(1, 2, 3)$ and $(1, 5, 7)$, and describe its position.",
      steps: [
        { text: "DRs: $(0, 3, 4)$, length 5, so DCs $\\pm\\left(0, \\frac35, \\frac45\\right)$." },
        { text: "$l = 0$ means $\\alpha = 90^\\circ$: the line is perpendicular to the x-axis. Every point on it has $x = 1$, so it lies in the plane $x = 1$, parallel to the yz-plane." },
      ],
      answer: "$\\pm\\left(0, \\frac35, \\frac45\\right)$; the line is perpendicular to the x-axis.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"direction ratios are unique, or must add up to 1\"",
      content:
        "$(2, 3, 6)$, $(4, 6, 12)$, $(-2, -3, -6)$ and $\\left(\\frac27, \\frac37, \\frac67\\right)$ are all DRs of the same line. Nothing about DRs adds to 1. Only DCs obey a rule, $l^2 + m^2 + n^2 = 1$, and you get them by dividing by $\\sqrt{a^2 + b^2 + c^2}$, never by $a + b + c$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "tdg1-2-q1",
      variant: "practice",
      question: "A line has direction ratios $(3, -6, 2)$. Find its direction cosine $l$, choosing the sense in which $l > 0$ (a fraction is fine).",
      answer: 0.428571,
      tolerance: 0.001,
      hint: "Divide by $\\sqrt{9 + 36 + 4}$.",
      solution: "$\\sqrt{49} = 7$, so $l = \\frac37$.",
      commonMistakes: [
        { answer: 3, feedback: "3 is the direction ratio. Normalise it." },
        { answer: 0.272727, tolerance: 0.001, feedback: "You divided by $3 + 6 + 2 = 11$. Divide by the length $\\sqrt{a^2 + b^2 + c^2} = 7$." },
      ],
    },
    {
      type: "quiz",
      id: "tdg1-2-q2",
      variant: "practice",
      question: "The direction cosines of the line through $A(1, 2, 3)$ and $B(3, 5, 9)$ are",
      options: [
        { text: "$\\pm\\left(\\frac27, \\frac37, \\frac67\\right)$", correct: true, feedback: "DRs $(2, 3, 6)$, length 7." },
        { text: "$\\pm\\left(\\frac17, \\frac27, \\frac37\\right)$", feedback: "Those come from the coordinates of $A$, not from $B - A$." },
        { text: "$\\pm\\left(\\frac{2}{11}, \\frac{3}{11}, \\frac{6}{11}\\right)$", feedback: "Divide by the length 7, not by the sum 11." },
        { text: "$\\pm(2, 3, 6)$", feedback: "These are direction ratios; their squares add to 49." },
      ],
      hint: "Subtract the coordinates, then divide by the length $AB$.",
    },
    {
      type: "quiz",
      id: "tdg1-2-q3",
      variant: "practice",
      multiple: true,
      question: "A line has direction cosines $\\left(\\frac13, -\\frac23, \\frac23\\right)$. Which are direction ratios of this line? Select all that apply.",
      options: [
        { text: "$(1, -2, 2)$", correct: true, feedback: "Three times the DCs." },
        { text: "$(-3, 6, -6)$", correct: true, feedback: "$-9$ times the DCs: the opposite sense is the same line." },
        { text: "$(2, -4, 4)$", correct: true, feedback: "Six times the DCs." },
        { text: "$(1, 2, 2)$", feedback: "The middle sign differs, so the triple is not proportional." },
        { text: "$\\left(\\frac13, -\\frac23, -\\frac23\\right)$", feedback: "Only one sign is flipped: a different direction." },
      ],
      hint: "DRs are any non-zero multiple of the DCs, including a negative multiple.",
    },
    {
      type: "numeric",
      id: "tdg1-2-q4",
      variant: "practice",
      question: "The points $A(1, 2, 3)$, $B(2, k, 5)$ and $C(4, 8, 9)$ are collinear. Find $k$.",
      answer: 4,
      hint: "The DRs of $AB$, $(1, k - 2, 2)$, must be proportional to those of $AC$, $(3, 6, 6)$.",
      solution: "$AC = (3, 6, 6) = 3(1, 2, 2)$, so $AB = (1, k - 2, 2)$ must equal $(1, 2, 2)$: $k - 2 = 2$, $k = 4$.",
      commonMistakes: [
        { answer: 2, feedback: "Then $AB = (1, 0, 2)$, which is not proportional to $(3, 6, 6)$." },
        { answer: 8, feedback: "$k$ is the y-coordinate of $B$, not of $C$; solve $k - 2 = 2$." },
      ],
    },
    {
      type: "numeric",
      id: "tdg1-2-q5",
      variant: "practice",
      question: "Find the cosine of the angle that the line from $P(-2, 4, -5)$ to $Q(1, 2, 3)$, directed from $P$ to $Q$, makes with the positive z-axis (to three decimal places).",
      answer: 0.911685,
      tolerance: 0.001,
      hint: "DRs $(3, -2, 8)$; divide the third by the length.",
      solution: "$\\overrightarrow{PQ} = (3, -2, 8)$, length $\\sqrt{9 + 4 + 64} = \\sqrt{77}$. So $n = \\frac{8}{\\sqrt{77}} \\approx 0.912$.",
      commonMistakes: [
        { answer: 0.615385, tolerance: 0.001, feedback: "You divided by $3 + 2 + 8 = 13$. Use $\\sqrt{77}$." },
        { answer: -0.911685, tolerance: 0.001, feedback: "Directed from $P$ to $Q$, $z$ increases from $-5$ to $3$: the cosine is positive." },
      ],
    },
    {
      type: "quiz",
      id: "tdg1-2-q6",
      variant: "concept",
      question: "A line has direction ratios $(0, 3, -4)$. Which statement must be true?",
      options: [
        { text: "It is perpendicular to the x-axis", correct: true, feedback: "$l = 0$, so $\\alpha = 90^\\circ$." },
        { text: "It is parallel to the x-axis", feedback: "Parallel to the x-axis would need DRs $(1, 0, 0)$." },
        { text: "It lies in the yz-plane", feedback: "It is **parallel** to the yz-plane; it lies in it only if one of its points has $x = 0$." },
        { text: "It passes through the origin", feedback: "Direction says nothing about position." },
      ],
      hint: "What angle does a line with $l = 0$ make with the x-axis?",
    },
    {
      type: "numeric",
      id: "tdg1-2-q7",
      variant: "practice",
      question: "A line has direction ratios $(2, 2, k)$ with $k > 0$ and makes $45^\\circ$ with the z-axis. Find $k$ (to two decimal places).",
      answer: 2.8284,
      tolerance: 0.01,
      hint: "$\\frac{k}{\\sqrt{8 + k^2}} = \\frac{1}{\\sqrt2}$.",
      solution: "Squaring, $2k^2 = 8 + k^2$, so $k^2 = 8$ and $k = 2\\sqrt2 \\approx 2.83$.",
      commonMistakes: [
        { answer: 8, feedback: "8 is $k^2$." },
        { answer: 2, feedback: "With $k = 2$, $n = \\frac{2}{\\sqrt{12}}$, an angle of about $54.7^\\circ$." },
      ],
    },
    {
      type: "quiz",
      id: "tdg1-2-q8",
      variant: "practice",
      multiple: true,
      question: "Which sets of three points are collinear? Select all that apply.",
      options: [
        { text: "$(1, 2, 3)$, $(2, 3, 4)$, $(4, 5, 6)$", correct: true, feedback: "Steps $(1, 1, 1)$ and $(3, 3, 3)$ from the first point." },
        { text: "$(0, 0, 0)$, $(1, 2, 3)$, $(-2, -4, -6)$", correct: true, feedback: "$(-2, -4, -6) = -2(1, 2, 3)$." },
        { text: "$(-1, 2, 1)$, $(1, 3, 3)$, $(5, 5, 7)$", correct: true, feedback: "Steps $(2, 1, 2)$ and $(6, 3, 6)$." },
        { text: "$(1, 0, 0)$, $(0, 1, 0)$, $(0, 0, 1)$", feedback: "Steps $(-1, 1, 0)$ and $(-1, 0, 1)$ are not proportional; these form an equilateral triangle." },
        { text: "$(2, 1, 3)$, $(3, 3, 4)$, $(5, 7, 7)$", feedback: "Steps $(1, 2, 1)$ and $(3, 6, 4)$: the last ratio breaks." },
      ],
      hint: "From the first point, find the DRs to each of the other two and test proportionality.",
    },
    {
      type: "numeric",
      id: "tdg1-2-q9",
      variant: "practice",
      question: "The points $A(3, 2, -4)$, $B(5, 4, -6)$ and $C(9, 8, -10)$ are collinear. Find the ratio $\\frac{AB}{BC}$.",
      answer: 0.5,
      hint: "Compare $\\overrightarrow{AB}$ with $\\overrightarrow{BC}$.",
      solution: "$\\overrightarrow{AB} = (2, 2, -2)$ and $\\overrightarrow{BC} = (4, 4, -4) = 2\\overrightarrow{AB}$. So $AB : BC = 1 : 2$ and $\\frac{AB}{BC} = \\frac12$.",
      commonMistakes: [
        { answer: 2, feedback: "That is $\\frac{BC}{AB}$." },
        { answer: 1, feedback: "The steps are proportional but not equal: $(4, 4, -4)$ is twice $(2, 2, -2)$." },
      ],
    },
    {
      type: "quiz",
      id: "tdg1-2-q10",
      variant: "practice",
      question: "JEE Main. If $\\left(\\frac1c, \\frac1c, \\frac1c\\right)$ are the direction cosines of a line, then $c$ equals",
      options: [
        { text: "$\\pm\\sqrt3$", correct: true, feedback: "$\\frac{3}{c^2} = 1$." },
        { text: "$\\pm3$", feedback: "Then the squares add to $\\frac13$." },
        { text: "$\\pm1$", feedback: "Then the squares add to 3." },
        { text: "$\\pm\\frac{1}{\\sqrt3}$", feedback: "That is the value of each DC, not of $c$." },
      ],
      hint: "Use $l^2 + m^2 + n^2 = 1$.",
    },
    {
      type: "numeric",
      id: "tdg1-2-q11",
      variant: "practice",
      question: "Find the angle, in degrees, that $\\overrightarrow{OP}$ makes with the positive y-axis, where $P = (2, -3, 6)$ (to one decimal place).",
      answer: 115.377,
      tolerance: 0.1,
      unit: "degrees",
      hint: "$\\cos\\beta = \\frac{y}{OP}$, and $OP = 7$.",
      solution: "$\\cos\\beta = -\\frac37$, so $\\beta = \\cos^{-1}\\left(-\\frac37\\right) \\approx 115.4^\\circ$. The angle is obtuse because $y < 0$.",
      commonMistakes: [
        { answer: 64.623, tolerance: 0.1, feedback: "That is $\\cos^{-1}\\frac37$. A directed segment with negative $y$-component makes an obtuse angle with the positive y-axis." },
      ],
    },
    {
      type: "quiz",
      id: "tdg1-2-q12",
      variant: "practice",
      multiple: true,
      question: "Which are direction ratios of the line joining $(1, -1, 2)$ and $(3, 4, -2)$? Select all that apply.",
      options: [
        { text: "$(2, 5, -4)$", correct: true, feedback: "Second point minus first." },
        { text: "$(-2, -5, 4)$", correct: true, feedback: "First minus second: the same line." },
        { text: "$(4, 10, -8)$", correct: true, feedback: "Twice $(2, 5, -4)$." },
        { text: "$(4, 3, 0)$", feedback: "That is the **sum** of the coordinates." },
        { text: "$(2, 5, 4)$", feedback: "$z$ goes from 2 to $-2$: the change is $-4$." },
      ],
      hint: "Subtract the coordinates; any non-zero multiple also works.",
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "angle-between-two-lines-in-space",
  title: "1.3 · The Angle Between Two Lines",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "Two lines in space usually do not meet. They can still make an angle: slide one of them parallel to itself until it crosses the other, and measure there. Sliding does not change a direction, so the angle depends only on the two directions, and directions are exactly what DCs and DRs record.",
    },
    { type: "heading", text: "The formula from the dot product" },
    {
      type: "text",
      content:
        "If the lines have DCs $(l_1, m_1, n_1)$ and $(l_2, m_2, n_2)$, these are unit vectors $\\hat u_1, \\hat u_2$ along them. The dot product gives the cosine of the angle between the unit vectors:",
    },
    {
      type: "math",
      latex: "\\hat u_1\\cdot\\hat u_2 = l_1l_2 + m_1m_2 + n_1n_2 = \\cos\\theta",
    },
    {
      type: "text",
      content:
        "A line has no preferred sense, so reversing one of them flips the sign and replaces $\\theta$ by $180^\\circ - \\theta$. The angle **between two lines** is conventionally the acute one, which the modulus picks out. With DRs, normalise first.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Angle between two lines",
      content:
        "With DCs: $\\cos\\theta = \\lvert l_1l_2 + m_1m_2 + n_1n_2\\rvert$.\n\nWith DRs $(a_1, b_1, c_1)$ and $(a_2, b_2, c_2)$:\n\n$$\\cos\\theta = \\frac{\\lvert a_1a_2 + b_1b_2 + c_1c_2\\rvert}{\\sqrt{a_1^2 + b_1^2 + c_1^2}\\,\\sqrt{a_2^2 + b_2^2 + c_2^2}}$$\n\nAnd the sine form (Lagrange's identity, $\\lvert\\hat u_1 \\times \\hat u_2\\rvert = \\sin\\theta$):\n\n$$\\sin^2\\theta = (m_1n_2 - m_2n_1)^2 + (n_1l_2 - n_2l_1)^2 + (l_1m_2 - l_2m_1)^2$$",
    },
    {
      type: "interactive",
      config: {
        component: "tdg-distance-lab",
        mode: "two-directions",
        d1: [2, -1, 2],
        d2: [1, 2, -2],
        caption:
          "Two lines with DRs $(2, -1, 2)$ and $(1, 2, -2)$. The dot product is $-4$ and each length is 3, so $\\cos\\theta = \\frac49$. Flip every sign of one line: the dot product changes sign but the line, and the acute angle, do not change.",
      },
    },
    {
      type: "worked-example",
      id: "tdg1-3-we1",
      title: "Worked example 1: angle from direction ratios",
      problem: "Find the angle between the lines with direction ratios $(2, -1, 2)$ and $(1, 2, -2)$.",
      steps: [
        { text: "Dot product and lengths:", latex: "2 - 2 - 4 = -4, \\qquad \\sqrt{9} = 3, \\qquad \\sqrt{9} = 3" },
        { text: "Take the modulus. *Why this step:* the negative sign only says that these two **senses** make an obtuse angle; the lines make the acute one.", latex: "\\cos\\theta = \\frac{4}{9}" },
      ],
      answer: "$\\theta = \\cos^{-1}\\frac49 \\approx 63.6^\\circ$.",
    },
    {
      type: "worked-example",
      id: "tdg1-3-we2",
      title: "Worked example 2: the diagonals of a cube",
      problem: "Find the angle between two body diagonals of a cube, between a body diagonal and an edge, and between a body diagonal and a face diagonal through the same vertex.",
      steps: [
        { text: "Put the cube $[0, 1]^3$ on the axes. The diagonals from $O(0, 0, 0)$ to $(1, 1, 1)$ and from $(1, 0, 0)$ to $(0, 1, 1)$ have DRs $(1, 1, 1)$ and $(-1, 1, 1)$." },
        { text: "Two body diagonals:", latex: "\\cos\\theta = \\frac{\\lvert -1 + 1 + 1\\rvert}{\\sqrt3\\,\\sqrt3} = \\frac13" },
        { text: "Body diagonal $(1, 1, 1)$ and the edge $(1, 0, 0)$:", latex: "\\cos\\theta = \\frac{1}{\\sqrt3}" },
        { text: "Body diagonal $(1, 1, 1)$ and the face diagonal $(1, 1, 0)$ from the same vertex:", latex: "\\cos\\theta = \\frac{2}{\\sqrt3\\,\\sqrt2} = \\sqrt{\\frac23}" },
      ],
      answer: "$\\cos^{-1}\\frac13 \\approx 70.5^\\circ$, $\\cos^{-1}\\frac{1}{\\sqrt3} \\approx 54.7^\\circ$ and $\\cos^{-1}\\sqrt{\\frac23} \\approx 35.3^\\circ$.",
    },
    {
      type: "interactive",
      config: {
        component: "tdg-space-viewer",
        mode: "two-lines",
        a: [0, 0, 0],
        b: [1, 1, 1],
        c: [1, 0, 0],
        d: [-1, 1, 1],
        caption:
          "Two body diagonals of the unit cube: through $O$ along $(1, 1, 1)$ and through $(1, 0, 0)$ along $(-1, 1, 1)$. They cross at the centre $\\left(\\frac12, \\frac12, \\frac12\\right)$ at the angle $\\cos^{-1}\\frac13$. Rotate until you look straight down one face: the picture changes, the angle does not.",
      },
    },
    {
      type: "worked-example",
      id: "tdg1-3-we3",
      title: "Worked example 3: the sine form",
      problem: "Use the sine form to find the angle between lines with direction ratios $(1, 1, 0)$ and $(0, 1, 1)$.",
      steps: [
        { text: "The cross product of the DR vectors is $(1 \\cdot 1 - 0 \\cdot 1,\\ 0 \\cdot 0 - 1 \\cdot 1,\\ 1 \\cdot 1 - 1 \\cdot 0) = (1, -1, 1)$, of length $\\sqrt3$." },
        { text: "Divide by the product of the lengths, $\\sqrt2 \\cdot \\sqrt2 = 2$. *Why this step:* the sine form for DRs is $\\frac{\\lvert\\vec b_1 \\times \\vec b_2\\rvert}{\\lvert\\vec b_1\\rvert\\lvert\\vec b_2\\rvert}$.", latex: "\\sin\\theta = \\frac{\\sqrt3}{2}" },
        { text: "Check with cosine: $\\cos\\theta = \\frac{1}{2}$. Both say $60^\\circ$." },
      ],
      answer: "$\\theta = 60^\\circ$.",
    },
    {
      type: "worked-example",
      id: "tdg1-3-we4",
      title: "Worked example 4: an angle of a triangle in space",
      problem: "Find the angle at $A$ of the triangle with vertices $A(1, 1, 1)$, $B(2, 3, 3)$ and $C(-1, 2, -1)$.",
      steps: [
        { text: "Vectors **from** $A$: $\\overrightarrow{AB} = (1, 2, 2)$ and $\\overrightarrow{AC} = (-2, 1, -2)$." },
        { text: "Here keep the sign. *Why this step:* the interior angle of a triangle is the angle between the two directed sides leaving $A$, and it may be obtuse.", latex: "\\cos A = \\frac{-2 + 2 - 4}{3 \\cdot 3} = -\\frac49" },
      ],
      answer: "$A = \\cos^{-1}\\left(-\\frac49\\right) \\approx 116.4^\\circ$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a negative dot product means the lines make an obtuse angle\"",
      content:
        "Two **lines** always make an acute (or right) angle, together with its supplement. A negative value of $l_1l_2 + m_1m_2 + n_1n_2$ only says the senses you happened to choose point apart. Take the modulus for the angle between lines. Keep the sign only when the question is about directed segments, such as the interior angle of a triangle.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "tdg1-3-q1",
      variant: "practice",
      question: "Find the angle, in degrees, between the lines with direction ratios $(1, 1, 2)$ and $(\\sqrt3 - 1, -\\sqrt3 - 1, 4)$.",
      answer: 60,
      unit: "degrees",
      hint: "The dot product is $6$; the lengths are $\\sqrt6$ and $\\sqrt{24}$.",
      solution: "$(\\sqrt3 - 1) + (-\\sqrt3 - 1) + 8 = 6$. Lengths: $\\sqrt6$ and $\\sqrt{(4 - 2\\sqrt3) + (4 + 2\\sqrt3) + 16} = \\sqrt{24}$. So $\\cos\\theta = \\frac{6}{\\sqrt{144}} = \\frac12$ and $\\theta = 60^\\circ$.",
      commonMistakes: [
        { answer: 30, feedback: "$\\cos\\theta = \\frac12$ gives $60^\\circ$; $\\frac12$ is $\\sin 30^\\circ$." },
        { answer: 90, feedback: "The dot product is 6, not 0." },
      ],
    },
    {
      type: "numeric",
      id: "tdg1-3-q2",
      variant: "practice",
      question: "Find $\\cos\\theta$, where $\\theta$ is the angle between the lines with direction ratios $(3, -6, 2)$ and $(2, 3, -6)$ (a fraction is fine).",
      answer: 0.489796,
      tolerance: 0.001,
      hint: "Dot product over the product of lengths, then take the modulus.",
      solution: "$6 - 18 - 12 = -24$, and each length is 7. So $\\cos\\theta = \\frac{24}{49}$.",
      commonMistakes: [
        { answer: -0.489796, tolerance: 0.001, feedback: "The angle between lines is acute: take the modulus." },
        { answer: 24, feedback: "Divide by the lengths $7 \\times 7$." },
      ],
    },
    {
      type: "quiz",
      id: "tdg1-3-q3",
      variant: "practice",
      question: "The angle between any two body diagonals of a cube is",
      options: [
        { text: "$\\cos^{-1}\\frac13$", correct: true, feedback: "DRs $(1, 1, 1)$ and $(-1, 1, 1)$: $\\frac{1}{3}$." },
        { text: "$\\cos^{-1}\\frac{1}{\\sqrt3}$", feedback: "That is the angle between a body diagonal and an edge." },
        { text: "$\\cos^{-1}\\sqrt{\\frac23}$", feedback: "That is the angle between a body diagonal and a face diagonal through the same vertex." },
        { text: "$90^\\circ$", feedback: "The face diagonals of a square are perpendicular; the body diagonals of a cube are not." },
      ],
      hint: "Take DRs $(1, 1, 1)$ and $(-1, 1, 1)$.",
    },
    {
      type: "numeric",
      id: "tdg1-3-q4",
      variant: "practice",
      question: "Find the angle, in degrees, between a body diagonal of a cube and any of its edges (to one decimal place).",
      answer: 54.7356,
      tolerance: 0.1,
      unit: "degrees",
      hint: "DRs $(1, 1, 1)$ and $(1, 0, 0)$.",
      solution: "$\\cos\\theta = \\frac{1}{\\sqrt3}$, so $\\theta \\approx 54.7^\\circ$.",
      commonMistakes: [
        { answer: 70.5288, tolerance: 0.1, feedback: "That is the angle between two body diagonals." },
        { answer: 45, feedback: "$45^\\circ$ is the angle between a **face** diagonal and an edge." },
      ],
    },
    {
      type: "quiz",
      id: "tdg1-3-q5",
      variant: "practice",
      multiple: true,
      question: "Which lines are perpendicular to the line with direction ratios $(1, 2, -1)$? Select all that apply.",
      options: [
        { text: "DRs $(1, 0, 1)$", correct: true, feedback: "$1 + 0 - 1 = 0$." },
        { text: "DRs $(2, -1, 0)$", correct: true, feedback: "$2 - 2 + 0 = 0$." },
        { text: "DRs $(3, -1, 1)$", correct: true, feedback: "$3 - 2 - 1 = 0$." },
        { text: "DRs $(1, 2, 1)$", feedback: "$1 + 4 - 1 = 4$." },
        { text: "DRs $(-1, -2, 1)$", feedback: "That is the same line, traversed the other way." },
      ],
      hint: "Perpendicular means $a_1a_2 + b_1b_2 + c_1c_2 = 0$.",
    },
    {
      type: "numeric",
      id: "tdg1-3-q6",
      variant: "practice",
      question: "Find $\\sin\\theta$, where $\\theta$ is the angle between the lines with direction ratios $(2, 2, 1)$ and $(1, 2, 2)$ (to three decimal places).",
      answer: 0.458123,
      tolerance: 0.001,
      hint: "The cross product of the DR vectors is $(2, -3, 2)$; or find $\\cos\\theta$ first.",
      solution: "$\\lvert(2, -3, 2)\\rvert = \\sqrt{17}$ and the lengths are 3 and 3, so $\\sin\\theta = \\frac{\\sqrt{17}}{9} \\approx 0.458$. Check: $\\cos\\theta = \\frac89$ and $\\frac{17}{81} + \\frac{64}{81} = 1$.",
      commonMistakes: [
        { answer: 0.888889, tolerance: 0.001, feedback: "That is $\\cos\\theta = \\frac89$." },
        { answer: 4.123106, tolerance: 0.01, feedback: "That is $\\sqrt{17}$; divide by $3 \\times 3$." },
      ],
    },
    {
      type: "numeric",
      id: "tdg1-3-q7",
      variant: "practice",
      question: "Find the angle at $A$, in degrees, of the triangle with vertices $A(1, 1, 1)$, $B(2, 3, 3)$ and $C(-1, 2, -1)$ (to one decimal place).",
      answer: 116.388,
      tolerance: 0.1,
      unit: "degrees",
      hint: "Use $\\overrightarrow{AB}$ and $\\overrightarrow{AC}$ and keep the sign of the dot product.",
      solution: "$\\overrightarrow{AB} = (1, 2, 2)$, $\\overrightarrow{AC} = (-2, 1, -2)$, $\\cos A = \\frac{-4}{9}$, so $A \\approx 116.4^\\circ$.",
      commonMistakes: [
        { answer: 63.612, tolerance: 0.1, feedback: "That is the acute angle between the **lines** $AB$ and $AC$. The interior angle of the triangle uses the signed dot product." },
      ],
    },
    {
      type: "quiz",
      id: "tdg1-3-q8",
      variant: "concept",
      question: "Two directed lines have $l_1l_2 + m_1m_2 + n_1n_2 = -\\frac12$. The angle between the (undirected) lines is",
      options: [
        { text: "$60^\\circ$", correct: true, feedback: "The modulus gives $\\cos\\theta = \\frac12$." },
        { text: "$120^\\circ$", feedback: "$120^\\circ$ is the angle between the two chosen **senses**. Between the lines we report the acute angle." },
        { text: "$30^\\circ$", feedback: "$\\cos 30^\\circ = \\frac{\\sqrt3}{2}$." },
        { text: "$150^\\circ$", feedback: "That would need $\\cos = -\\frac{\\sqrt3}{2}$." },
      ],
      hint: "Take the modulus.",
    },
    {
      type: "numeric",
      id: "tdg1-3-q9",
      variant: "practice",
      question: "JEE Main. For any real $a, b, c$ (not making either triple zero), find the angle, in degrees, between the lines with direction ratios $(a, b, c)$ and $(b - c, c - a, a - b)$.",
      answer: 90,
      unit: "degrees",
      hint: "Expand $a(b - c) + b(c - a) + c(a - b)$.",
      solution: "$ab - ac + bc - ab + ca - bc = 0$, so the lines are perpendicular for every such $a, b, c$.",
      commonMistakes: [
        { answer: 0, feedback: "A zero dot product means perpendicular, not parallel." },
        { answer: 60, feedback: "Expand the dot product fully: every term cancels." },
      ],
    },
    {
      type: "numeric",
      id: "tdg1-3-q10",
      variant: "practice",
      question: "JEE Main. Find $\\cos^2\\theta$, where $\\theta$ is the angle between a body diagonal of a cube and a diagonal of a face that starts at the same vertex.",
      answer: 0.666667,
      tolerance: 0.001,
      hint: "DRs $(1, 1, 1)$ and $(1, 1, 0)$.",
      solution: "$\\cos\\theta = \\frac{2}{\\sqrt3\\,\\sqrt2}$, so $\\cos^2\\theta = \\frac{4}{6} = \\frac23$.",
      commonMistakes: [
        { answer: 0.333333, tolerance: 0.001, feedback: "$\\frac13$ is $\\cos^2$ for a body diagonal and an edge." },
        { answer: 0.111111, tolerance: 0.001, feedback: "$\\frac19$ is $\\cos^2$ for two body diagonals." },
      ],
    },
    {
      type: "quiz",
      id: "tdg1-3-q11",
      variant: "concept",
      multiple: true,
      question: "Which statements are true? Select all that apply.",
      options: [
        { text: "For DCs, $\\sin^2\\theta = \\sum(m_1n_2 - m_2n_1)^2$", correct: true, feedback: "That is $\\lvert\\hat u_1 \\times \\hat u_2\\rvert^2$." },
        { text: "The lines are perpendicular exactly when $l_1l_2 + m_1m_2 + n_1n_2 = 0$", correct: true, feedback: "$\\cos\\theta = 0$." },
        { text: "The lines are parallel exactly when $\\sin\\theta = 0$", correct: true, feedback: "Then the cross product of the directions vanishes." },
        { text: "For DRs, $\\cos\\theta = \\lvert a_1a_2 + b_1b_2 + c_1c_2\\rvert$ without dividing by anything", feedback: "DRs must be normalised: divide by both lengths." },
        { text: "Two lines that do not meet have no angle between them", feedback: "Slide one parallel to itself until they meet; the angle is that between the directions." },
      ],
      hint: "Think of $(l, m, n)$ as unit vectors and use the dot and cross products.",
    },
    {
      type: "numeric",
      id: "tdg1-3-q12",
      variant: "practice",
      question: "Find the cosine of the angle between the line through $A(1, 2, 3)$ and $B(4, 6, 3)$ and the line through $C(0, 0, 0)$ and $D(0, 3, 4)$.",
      answer: 0.48,
      hint: "DRs $(3, 4, 0)$ and $(0, 3, 4)$, both of length 5.",
      solution: "$\\cos\\theta = \\frac{0 + 12 + 0}{5 \\cdot 5} = \\frac{12}{25} = 0.48$.",
      commonMistakes: [
        { answer: 12, feedback: "Divide by the lengths, $5 \\times 5$." },
        { answer: 0.6, feedback: "Recompute the dot product: only the $y$-terms survive, $4 \\times 3 = 12$." },
      ],
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "parallel-and-perpendicular-lines-in-space",
  title: "1.4 · Parallel and Perpendicular Lines",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "The two extreme angles get their own tests. Parallel lines have the same direction, so their DRs are proportional. Perpendicular lines have a zero dot product. Both tests need nothing but arithmetic on the DRs, and together with the cross product they let you build a direction perpendicular to two given ones.",
    },
    { type: "heading", text: "The two conditions" },
    {
      type: "callout",
      variant: "definition",
      title: "Parallel and perpendicular lines",
      content:
        "For lines with DRs $(a_1, b_1, c_1)$ and $(a_2, b_2, c_2)$:\n\n- **Parallel** (or the same line): $\\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2}$, i.e. $(a_1, b_1, c_1) = k(a_2, b_2, c_2)$. A zero in a denominator means the matching numerator is zero too.\n- **Perpendicular**: $a_1a_2 + b_1b_2 + c_1c_2 = 0$.\n\nWith DCs: parallel means $(l_1, m_1, n_1) = \\pm(l_2, m_2, n_2)$; perpendicular means $l_1l_2 + m_1m_2 + n_1n_2 = 0$.",
    },
    {
      type: "interactive",
      config: {
        component: "tdg-distance-lab",
        mode: "two-directions",
        d1: [1, 2, -1],
        d2: [1, 0, 1],
        caption:
          "Directions $(1, 2, -1)$ and $(1, 0, 1)$: the dot product is 0, so the lines are perpendicular. Now make the second triple a multiple of the first and watch the verdict switch to parallel.",
      },
    },
    { type: "heading", text: "A direction perpendicular to two lines" },
    {
      type: "text",
      content:
        "A line perpendicular to both $\\vec b_1 = (a_1, b_1, c_1)$ and $\\vec b_2 = (a_2, b_2, c_2)$ must run along $\\vec b_1 \\times \\vec b_2$, the vector perpendicular to both (vector algebra, Chapter 4). Written out, its DRs are",
    },
    {
      type: "math",
      latex: "(b_1c_2 - b_2c_1,\\ \\ c_1a_2 - c_2a_1,\\ \\ a_1b_2 - a_2b_1)",
    },
    {
      type: "text",
      content:
        "This is the **cofactor method** in older books: write the two rows of DRs, and for each position cover that column and take the $2 \\times 2$ cross-multiplication, minding the sign of the middle one. Always check the answer by dotting it with both given directions.",
    },
    {
      type: "worked-example",
      id: "tdg1-4-we1",
      title: "Worked example 1: making two lines perpendicular",
      problem: "Find $\\lambda$ so that the lines with DRs $(2, \\lambda, 3)$ and $(1, -2, 4)$ are perpendicular.",
      steps: [
        { latex: "2(1) + \\lambda(-2) + 3(4) = 0 \\;\\Rightarrow\\; 14 - 2\\lambda = 0" },
        { text: "So $\\lambda = 7$. *Check:* $(2, 7, 3)\\cdot(1, -2, 4) = 2 - 14 + 12 = 0$." },
      ],
      answer: "$\\lambda = 7$.",
    },
    {
      type: "worked-example",
      id: "tdg1-4-we2",
      title: "Worked example 2: perpendicular to two lines",
      problem: "Find direction ratios of a line perpendicular to the lines with DRs $(1, 2, 3)$ and $(-3, 2, 5)$.",
      steps: [
        { text: "Cross product of the DR vectors:", latex: "(2 \\cdot 5 - 3 \\cdot 2,\\ \\ 3 \\cdot (-3) - 1 \\cdot 5,\\ \\ 1 \\cdot 2 - 2 \\cdot (-3)) = (4, -14, 8)" },
        { text: "Scale down by 2 to $(2, -7, 4)$. *Why this step:* any multiple is a set of DRs, and small numbers are easier to check." },
        { text: "Check: $(2, -7, 4)\\cdot(1, 2, 3) = 2 - 14 + 12 = 0$ and $(2, -7, 4)\\cdot(-3, 2, 5) = -6 - 14 + 20 = 0$." },
      ],
      answer: "$(2, -7, 4)$ (or any non-zero multiple).",
    },
    { type: "heading", text: "Lines whose direction cosines obey two relations" },
    {
      type: "text",
      content:
        "A favourite JEE problem gives one linear and one quadratic relation between $l, m, n$. The linear one lets you eliminate a variable; the quadratic then becomes a homogeneous quadratic in the other two, which factors into two ratios: two lines. Since only the **ratios** matter, you never need $l^2 + m^2 + n^2 = 1$ until the very end (if at all).",
    },
    {
      type: "worked-example",
      id: "tdg1-4-we3",
      title: "Worked example 3: two lines from two relations",
      problem: "The direction cosines of two lines satisfy $l + m + n = 0$ and $l^2 + m^2 - n^2 = 0$. Find the angle between the lines.",
      steps: [
        { text: "From the linear relation, $n = -(l + m)$. Substitute:", latex: "l^2 + m^2 - (l + m)^2 = -2lm = 0" },
        { text: "So $l = 0$ or $m = 0$." },
        { text: "If $l = 0$: $n = -m$, DRs $(0, 1, -1)$. If $m = 0$: $n = -l$, DRs $(1, 0, -1)$. *Why ratios suffice:* the angle formula normalises anyway." },
        { latex: "\\cos\\theta = \\frac{\\lvert 0 + 0 + 1\\rvert}{\\sqrt2\\,\\sqrt2} = \\frac12" },
      ],
      answer: "$\\theta = 60^\\circ$.",
    },
    {
      type: "worked-example",
      id: "tdg1-4-we4",
      title: "Worked example 4: parallel with a zero ratio",
      problem: "Are the lines with DRs $(2, 0, -4)$ and $(-1, 0, 2)$ parallel?",
      steps: [
        { text: "$(2, 0, -4) = -2(-1, 0, 2)$, so yes. *Why the zero is harmless:* the form $\\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2}$ would show $\\frac00$; read it as \"both middle entries are zero\", which is consistent with the factor $-2$." },
      ],
      answer: "Parallel (and both are perpendicular to the y-axis).",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"parallel means the direction ratios are equal\"",
      content:
        "Parallel means **proportional**, with any non-zero factor, including a negative one. $(2, -3, 6)$ and $(-4, 6, -12)$ are parallel. And the factor must be the same for all three entries: $(2, 3, 4)$ and $(4, 6, 9)$ are not parallel, even though two of the ratios agree.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "tdg1-4-q1",
      variant: "practice",
      question: "Find $\\lambda$ for which the lines with direction ratios $(\\lambda, 2, -3)$ and $(2, \\lambda, 4)$ are perpendicular.",
      answer: 3,
      hint: "Set the dot product to zero: $2\\lambda + 2\\lambda - 12 = 0$.",
      solution: "$4\\lambda = 12$, so $\\lambda = 3$. Check: $(3, 2, -3)\\cdot(2, 3, 4) = 6 + 6 - 12 = 0$.",
      commonMistakes: [
        { answer: -3, feedback: "With $\\lambda = -3$ the dot product is $-6 - 6 - 12 = -24$." },
        { answer: 6, feedback: "Both middle and first products contain $\\lambda$: $2\\lambda + 2\\lambda = 4\\lambda$." },
      ],
    },
    {
      type: "numeric",
      id: "tdg1-4-q2",
      variant: "practice",
      question: "Find $k$ for which the lines with direction ratios $(2, -1, k)$ and $(-6, 3, 9)$ are parallel.",
      answer: -3,
      hint: "The common factor is $\\frac{-6}{2} = -3$.",
      solution: "$(-6, 3, 9) = -3(2, -1, -3)$, so $k = -3$.",
      commonMistakes: [
        { answer: 3, feedback: "The factor is $-3$: $9 = -3k$ gives $k = -3$." },
        { answer: 9, feedback: "Parallel means proportional, not equal entries." },
      ],
    },
    {
      type: "quiz",
      id: "tdg1-4-q3",
      variant: "practice",
      question: "Direction ratios of a line perpendicular to both lines with DRs $(2, -1, 1)$ and $(1, 1, -2)$ are",
      options: [
        { text: "$(1, 5, 3)$", correct: true, feedback: "Cross product: $((-1)(-2) - 1 \\cdot 1,\\ 1 \\cdot 1 - 2(-2),\\ 2 \\cdot 1 - (-1) \\cdot 1) = (1, 5, 3)$. Check: $2 - 5 + 3 = 0$ and $1 + 5 - 6 = 0$." },
        { text: "$(1, -5, 3)$", feedback: "Sign slip in the middle term: $(1, -5, 3)\\cdot(2, -1, 1) = 10$." },
        { text: "$(3, 0, -1)$", feedback: "That is the sum of the two directions; it is not perpendicular to them." },
        { text: "$(2, -1, -2)$", feedback: "That multiplies entries position by position, which is not the cross product." },
      ],
      hint: "Use the cross product and check by dotting with both directions.",
    },
    {
      type: "quiz",
      id: "tdg1-4-q4",
      variant: "practice",
      multiple: true,
      question: "Which pairs of direction ratios describe parallel lines? Select all that apply.",
      options: [
        { text: "$(1, -2, 3)$ and $(-2, 4, -6)$", correct: true, feedback: "Factor $-2$." },
        { text: "$(0, 2, -1)$ and $(0, -4, 2)$", correct: true, feedback: "Factor $-2$, with the zeros matching." },
        { text: "$(3, 0, 0)$ and $(-1, 0, 0)$", correct: true, feedback: "Both along the x-axis." },
        { text: "$(1, 1, 0)$ and $(1, 1, 1)$", feedback: "The third entries break proportionality." },
        { text: "$(2, 3, 4)$ and $(4, 6, 9)$", feedback: "The factors are $2, 2, \\frac94$: not one common factor." },
      ],
      hint: "Look for one factor $k$ that works for all three entries.",
    },
    {
      type: "numeric",
      id: "tdg1-4-q5",
      variant: "practice",
      question:
        "The direction cosines of two lines satisfy $3l + m + 5n = 0$ and $6mn - 2nl + 5lm = 0$. Find the cosine of the angle between them (a fraction is fine).",
      answer: 0.166667,
      tolerance: 0.001,
      hint: "Put $m = -3l - 5n$ into the quadratic; it reduces to $(l + n)(l + 2n) = 0$.",
      solution: "Substituting gives $-15l^2 - 45ln - 30n^2 = 0$, i.e. $(l + n)(l + 2n) = 0$. If $l = -n$, then $m = -2n$: DRs $(-1, -2, 1)$. If $l = -2n$, then $m = n$: DRs $(-2, 1, 1)$. So $\\cos\\theta = \\frac{2 - 2 + 1}{\\sqrt6\\,\\sqrt6} = \\frac16$.",
      commonMistakes: [
        { answer: 1, feedback: "Divide the dot product 1 by the lengths $\\sqrt6 \\cdot \\sqrt6$." },
        { answer: 0, feedback: "Recheck the two directions: $(-1, -2, 1)\\cdot(-2, 1, 1) = 2 - 2 + 1 = 1$, not 0." },
      ],
    },
    {
      type: "quiz",
      id: "tdg1-4-q6",
      variant: "practice",
      question: "JEE Main. The direction cosines of two lines satisfy $l + m + n = 0$ and $l^2 + m^2 - n^2 = 0$. The angle between the lines is",
      options: [
        { text: "$60^\\circ$", correct: true, feedback: "The lines have DRs $(0, 1, -1)$ and $(1, 0, -1)$; $\\cos\\theta = \\frac12$." },
        { text: "$90^\\circ$", feedback: "$(0, 1, -1)\\cdot(1, 0, -1) = 1 \\ne 0$." },
        { text: "$30^\\circ$", feedback: "$\\cos\\theta = \\frac{1}{2}$, which is $60^\\circ$." },
        { text: "$45^\\circ$", feedback: "Divide the dot product 1 by $\\sqrt2 \\cdot \\sqrt2 = 2$." },
      ],
      hint: "Eliminate $n = -(l + m)$; the quadratic becomes $lm = 0$.",
    },
    {
      type: "numeric",
      id: "tdg1-4-q7",
      variant: "practice",
      question: "How many distinct lines through the origin make equal acute angles with the three coordinate axes? (As usual, the angle between two lines is the acute one.)",
      answer: 4,
      hint: "The DCs are $\\left(\\pm\\frac{1}{\\sqrt3}, \\pm\\frac{1}{\\sqrt3}, \\pm\\frac{1}{\\sqrt3}\\right)$, and a line owns a triple and its negative.",
      solution: "There are $2^3 = 8$ sign patterns, and each line accounts for two of them ($(l, m, n)$ and $(-l, -m, -n)$). So there are 4 lines: the four body diagonals of a cube centred at the origin.",
      commonMistakes: [
        { answer: 8, feedback: "Each line has two sets of DCs, so 8 sign patterns give 4 lines." },
        { answer: 1, feedback: "$(1, 1, 1)$ is one such line, but $(1, -1, 1)$ also makes the acute angle $\\cos^{-1}\\frac{1}{\\sqrt3}$ with each axis." },
      ],
    },
    {
      type: "numeric",
      id: "tdg1-4-q8",
      variant: "practice",
      question: "The line through $(1, 2, k)$ and $(3, 4, 6)$ is perpendicular to the line with direction ratios $(1, 1, 2)$. Find $k$.",
      answer: 8,
      hint: "DRs of the first line: $(2, 2, 6 - k)$.",
      solution: "$2 + 2 + 2(6 - k) = 0$, so $16 - 2k = 0$ and $k = 8$.",
      commonMistakes: [
        { answer: -8, feedback: "Solve $16 - 2k = 0$: $k = +8$." },
        { answer: 4, feedback: "Don't forget the factor 2 in $2(6 - k)$: $4 + 12 - 2k = 0$." },
      ],
    },
    {
      type: "quiz",
      id: "tdg1-4-q9",
      variant: "concept",
      multiple: true,
      question: "Which are direction ratios of a line parallel to the line with DRs $(2, -3, 6)$? Select all that apply.",
      options: [
        { text: "$(2, -3, 6)$", correct: true, feedback: "Factor 1." },
        { text: "$(-4, 6, -12)$", correct: true, feedback: "Factor $-2$: a negative factor is still parallel." },
        { text: "$\\left(\\frac27, -\\frac37, \\frac67\\right)$", correct: true, feedback: "Factor $\\frac17$: these are its DCs." },
        { text: "$(-2, -3, -6)$", feedback: "Only two signs flipped: no single factor works." },
        { text: "$(6, -3, 2)$", feedback: "Same numbers, different order: a different direction." },
      ],
      hint: "Parallel means proportional with one common factor.",
    },
    {
      type: "numeric",
      id: "tdg1-4-q10",
      variant: "practice",
      question: "A line is perpendicular to both lines with direction ratios $(1, 1, 0)$ and $(0, 1, 1)$. Find the acute angle, in degrees, that it makes with the x-axis (to one decimal place).",
      answer: 54.7356,
      tolerance: 0.1,
      unit: "degrees",
      hint: "Its DRs are the cross product $(1, -1, 1)$.",
      solution: "$(1, 1, 0) \\times (0, 1, 1) = (1, -1, 1)$, so $\\lvert l\\rvert = \\frac{1}{\\sqrt3}$ and the acute angle is $\\cos^{-1}\\frac{1}{\\sqrt3} \\approx 54.7^\\circ$.",
      commonMistakes: [
        { answer: 45, feedback: "The DRs $(1, -1, 1)$ have length $\\sqrt3$, not $\\sqrt2$." },
        { answer: 125.264, tolerance: 0.1, feedback: "That is the obtuse angle; the question asks for the acute one." },
      ],
    },
    {
      type: "numeric",
      id: "tdg1-4-q11",
      variant: "practice",
      question: "JEE Main. Find the sum of all real $k$ for which the lines with direction ratios $(k, -3, 2)$ and $(k, k, -1)$ are perpendicular.",
      answer: 3,
      hint: "The condition is a quadratic in $k$; use the sum of its roots after checking they are real.",
      solution: "$k^2 - 3k - 2 = 0$. The discriminant is $9 + 8 = 17 > 0$, so both roots are real, and their sum is 3.",
      commonMistakes: [
        { answer: -3, feedback: "For $k^2 - 3k - 2 = 0$ the sum of roots is $-\\frac{-3}{1} = 3$." },
        { answer: -2, feedback: "$-2$ is the product of the roots." },
      ],
    },
    {
      type: "quiz",
      id: "tdg1-4-q12",
      variant: "practice",
      multiple: true,
      question: "A line is perpendicular to the lines with DRs $(1, 2, 2)$ and $(2, -2, 1)$. Which could be its direction cosines? Select all that apply.",
      options: [
        { text: "$\\left(\\frac23, \\frac13, -\\frac23\\right)$", correct: true, feedback: "The cross product is $(6, 3, -6) = 3(2, 1, -2)$, of length 9; normalising gives this." },
        { text: "$\\left(-\\frac23, -\\frac13, \\frac23\\right)$", correct: true, feedback: "The other sense of the same line." },
        { text: "$\\left(\\frac23, -\\frac13, -\\frac23\\right)$", feedback: "Dot with $(1, 2, 2)$: $\\frac{2 - 2 - 4}{3} \\ne 0$." },
        { text: "$\\left(\\frac13, \\frac23, \\frac23\\right)$", feedback: "That is parallel to the first line, not perpendicular." },
        { text: "$(2, 1, -2)$", feedback: "These are DRs; their squares add to 9, not 1." },
      ],
      hint: "Cross the two directions, then normalise; both senses count.",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "projection-of-a-segment-on-a-line",
  title: "1.5 · Projection of a Segment on a Line",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "Hold a rod in sunlight above a straight track: its shadow on the track is its **projection**. Drop perpendiculars from both ends of the segment $AB$ to a line $L$; the feet cut off a piece of $L$, and its length is the projection of $AB$ on $L$.",
    },
    { type: "heading", text: "Projection as a dot product" },
    {
      type: "text",
      content:
        "If $\\hat u = (l, m, n)$ is a unit vector along $L$, the shadow of $\\overrightarrow{AB}$ along $L$ is $\\overrightarrow{AB}\\cdot\\hat u = AB\\cos\\theta$ (vector algebra, Chapter 3). In coordinates:",
    },
    {
      type: "math",
      latex: "\\text{projection of } AB \\text{ on } L = \\lvert l(x_2 - x_1) + m(y_2 - y_1) + n(z_2 - z_1)\\rvert",
    },
    {
      type: "text",
      content:
        "If $L$ is given by DRs $(a, b, c)$, normalise first: divide by $\\sqrt{a^2 + b^2 + c^2}$. If $L$ is the line through $C$ and $D$, its DRs are $D - C$.",
    },
    { type: "heading", text: "Projections on the axes" },
    {
      type: "text",
      content:
        "On the x-axis, $\\hat u = (1, 0, 0)$, and the projection is just $x_2 - x_1$ (signed) or its modulus. The three axis projections are the components of $\\overrightarrow{AB}$, so\n\n- $AB^2 = (\\text{proj}_x)^2 + (\\text{proj}_y)^2 + (\\text{proj}_z)^2$, and\n- the DCs of $AB$ are the projections divided by $AB$.\n\nOn a coordinate **plane** the shadow keeps two components: on the xy-plane it has length $\\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$.",
    },
    {
      type: "interactive",
      config: {
        component: "tdg-space-viewer",
        mode: "points",
        a: [0, 1, 1],
        b: [3, 5, 3],
        show: ["projections", "box"],
        caption:
          "The segment from $A(0, 1, 1)$ to $B(3, 5, 3)$ and its shadows on the three axes: 3, 4 and 2. Their squares add to $AB^2 = 29$. Rotate the view to see each shadow as the edge of the box that $AB$ is the diagonal of.",
      },
    },
    {
      type: "worked-example",
      id: "tdg1-5-we1",
      title: "Worked example 1: projection on a line given by ratios",
      problem: "Find the projection of the segment joining $A(1, 2, 3)$ and $B(-1, 4, 2)$ on the line with direction ratios $(2, 3, -6)$.",
      steps: [
        { text: "$\\overrightarrow{AB} = (-2, 2, -1)$. Normalise the line: length $\\sqrt{4 + 9 + 36} = 7$." },
        { latex: "\\frac{\\lvert -4 + 6 + 6\\rvert}{7} = \\frac{8}{7}" },
      ],
      answer: "$\\frac87$.",
    },
    {
      type: "worked-example",
      id: "tdg1-5-we2",
      title: "Worked example 2: rebuilding a segment from its shadows",
      problem: "The projections of a segment on the x, y and z axes are 12, 4 and 3. Find its length and direction cosines.",
      steps: [
        { text: "The projections are the components of the segment as a vector.", latex: "\\text{length} = \\sqrt{144 + 16 + 9} = 13" },
        { text: "Divide by the length. *Why this step:* $\\text{proj}_x = AB\\cos\\alpha$." },
      ],
      answer: "Length 13, DCs $\\left(\\frac{12}{13}, \\frac{4}{13}, \\frac{3}{13}\\right)$.",
    },
    {
      type: "worked-example",
      id: "tdg1-5-we3",
      title: "Worked example 3: projection on the line through two points",
      problem: "Find the projection of $AB$ on $CD$, where $A(6, 3, 2)$, $B(5, 1, 4)$, $C(3, -4, 7)$ and $D(0, 2, 5)$.",
      steps: [
        { text: "$\\overrightarrow{AB} = (-1, -2, 2)$ and $\\overrightarrow{CD} = (-3, 6, -2)$, with $CD = 7$." },
        { latex: "\\frac{\\lvert 3 - 12 - 4\\rvert}{7} = \\frac{13}{7}" },
      ],
      answer: "$\\frac{13}{7}$.",
    },
    {
      type: "worked-example",
      id: "tdg1-5-we4",
      title: "Worked example 4: distance from a line by Pythagoras",
      problem: "A line passes through $A(1, 2, -1)$ with direction ratios $(2, 1, 2)$. Find the distance of $B(4, 2, 2)$ from the line.",
      steps: [
        { text: "$\\overrightarrow{AB} = (3, 0, 3)$, so $AB^2 = 18$." },
        { text: "Projection of $AB$ on the line: $\\frac{6 + 0 + 6}{3} = 4$. *Why this step:* the projection is the distance from $A$ to the foot of the perpendicular from $B$." },
        { latex: "d = \\sqrt{AB^2 - 4^2} = \\sqrt{18 - 16} = \\sqrt2" },
      ],
      answer: "$\\sqrt2$. (Chapter 2 finds the foot itself.)",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: projecting on direction ratios without normalising",
      content:
        "$\\lvert a\\Delta x + b\\Delta y + c\\Delta z\\rvert$ is the projection multiplied by $\\sqrt{a^2 + b^2 + c^2}$. Unless the triple is already a set of DCs, divide by its length. A quick check: a projection can never exceed the segment's own length.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Signed or unsigned?",
      content:
        "\"The projection of $AB$ on the x-axis\" is often meant as $x_2 - x_1$ with its sign, which records the direction; its length is $\\lvert x_2 - x_1\\rvert$. If a question says the projections are $6, -3, 2$, it is giving signed values, and the segment's components are exactly those numbers.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "tdg1-5-q1",
      variant: "practice",
      question: "Find the projection of the segment from $A(1, 2, 3)$ to $B(2, -1, 5)$ on the line with direction ratios $(2, -1, 2)$.",
      answer: 3,
      hint: "$\\overrightarrow{AB} = (1, -3, 2)$; divide the dot product by 3.",
      solution: "$\\frac{2 + 3 + 4}{\\sqrt{4 + 1 + 4}} = \\frac{9}{3} = 3$.",
      commonMistakes: [
        { answer: 9, feedback: "Normalise: divide by the length of $(2, -1, 2)$, which is 3." },
        { answer: 1, feedback: "The middle term is $(-3)(-1) = +3$, not $-3$." },
      ],
    },
    {
      type: "numeric",
      id: "tdg1-5-q2",
      variant: "practice",
      question: "The projections of a segment on the coordinate axes are 12, 4 and 3. Find its length.",
      answer: 13,
      hint: "The projections are the components of the segment.",
      solution: "$\\sqrt{144 + 16 + 9} = 13$.",
      commonMistakes: [
        { answer: 19, feedback: "Lengths add like Pythagoras, not directly." },
        { answer: 169, feedback: "That is the square of the length." },
      ],
    },
    {
      type: "numeric",
      id: "tdg1-5-q3",
      variant: "practice",
      question: "The projections of a segment on the x, y and z axes are 2, 3 and 6. Find the cosine of the angle it makes with the z-axis (a fraction is fine).",
      answer: 0.857143,
      tolerance: 0.001,
      hint: "$\\cos\\gamma = \\frac{\\text{proj}_z}{\\text{length}}$.",
      solution: "Length $\\sqrt{4 + 9 + 36} = 7$, so $\\cos\\gamma = \\frac67$.",
      commonMistakes: [
        { answer: 0.545455, tolerance: 0.001, feedback: "You divided by $2 + 3 + 6 = 11$; the length is 7." },
        { answer: 6, feedback: "Divide the projection by the length." },
      ],
    },
    {
      type: "quiz",
      id: "tdg1-5-q4",
      variant: "practice",
      question: "The projection of the segment joining $(1, 2, 3)$ and $(-1, 4, 2)$ on the line with direction ratios $(2, 3, -6)$ is",
      options: [
        { text: "$\\frac87$", correct: true, feedback: "$\\frac{\\lvert -4 + 6 + 6\\rvert}{7}$." },
        { text: "$8$", feedback: "Divide by the length 7 of the DR triple." },
        { text: "$\\frac{16}{7}$", feedback: "Recheck the products: $(-2)(2) + 2(3) + (-1)(-6) = 8$." },
        { text: "$3$", feedback: "3 is the length of the segment itself; the projection is shorter." },
      ],
      hint: "Dot product of $\\overrightarrow{AB}$ with the DRs, divided by $\\sqrt{4 + 9 + 36}$.",
    },
    {
      type: "quiz",
      id: "tdg1-5-q5",
      variant: "practice",
      multiple: true,
      question: "For $A(3, -1, 2)$ and $B(-2, 4, 0)$, which statements are true? Select all that apply.",
      options: [
        { text: "The signed projection of $AB$ on the x-axis is $-5$", correct: true, feedback: "$x_2 - x_1 = -2 - 3$." },
        { text: "$AB = 3\\sqrt6$", correct: true, feedback: "$\\sqrt{25 + 25 + 4} = \\sqrt{54}$." },
        { text: "The projection of $AB$ on the xy-plane has length $5\\sqrt2$", correct: true, feedback: "$\\sqrt{25 + 25}$." },
        { text: "$AB = 5 + 5 + 2 = 12$", feedback: "Projections combine by Pythagoras, not by adding." },
        { text: "The signed projection of $AB$ on the z-axis is $+2$", feedback: "$z_2 - z_1 = 0 - 2 = -2$." },
      ],
      hint: "Compute $\\overrightarrow{AB} = (-5, 5, -2)$ first.",
    },
    {
      type: "numeric",
      id: "tdg1-5-q6",
      variant: "practice",
      question: "Find the projection of the segment from $A(1, 0, -1)$ to $B(3, 2, 3)$ on the line through $O(0, 0, 0)$ and $D(2, -1, 2)$ (a fraction is fine).",
      answer: 3.333333,
      tolerance: 0.01,
      hint: "$\\overrightarrow{AB} = (2, 2, 4)$ and $OD = 3$.",
      solution: "$\\frac{4 - 2 + 8}{3} = \\frac{10}{3}$.",
      commonMistakes: [
        { answer: 10, feedback: "Divide by $OD = 3$." },
        { answer: 4.898979, tolerance: 0.01, feedback: "That is the length of $AB$ itself, $\\sqrt{24}$." },
      ],
    },
    {
      type: "numeric",
      id: "tdg1-5-q7",
      variant: "practice",
      question: "The signed projections of a segment on the x, y and z axes are $6$, $-3$ and $2$. Find its length.",
      answer: 7,
      hint: "Square, add, take the root.",
      solution: "$\\sqrt{36 + 9 + 4} = 7$.",
      commonMistakes: [
        { answer: 5, feedback: "$6 - 3 + 2$ adds the projections; use Pythagoras." },
        { answer: 11, feedback: "Adding the absolute values overestimates; use $\\sqrt{36 + 9 + 4}$." },
      ],
    },
    {
      type: "numeric",
      id: "tdg1-5-q8",
      variant: "practice",
      question: "The segment of the previous question (signed axis projections $6, -3, 2$) is projected onto the line with direction ratios $(2, 2, 1)$. Find the length of the projection (a fraction is fine).",
      answer: 2.666667,
      tolerance: 0.01,
      hint: "The segment's vector is $(6, -3, 2)$; normalise $(2, 2, 1)$.",
      solution: "$\\frac{\\lvert 12 - 6 + 2\\rvert}{3} = \\frac83$.",
      commonMistakes: [
        { answer: 8, feedback: "Divide by $\\sqrt{4 + 4 + 1} = 3$." },
        { answer: 6.666667, tolerance: 0.01, feedback: "The $y$-term is $(-3)(2) = -6$, not $+6$." },
      ],
    },
    {
      type: "quiz",
      id: "tdg1-5-q9",
      variant: "concept",
      question: "The length of the projection of $AB$ (with $\\overrightarrow{AB} = (\\Delta x, \\Delta y, \\Delta z)$) on a line with direction ratios $(a, b, c)$ is",
      options: [
        { text: "$\\dfrac{\\lvert a\\Delta x + b\\Delta y + c\\Delta z\\rvert}{\\sqrt{a^2 + b^2 + c^2}}$", correct: true, feedback: "Dot with the unit vector along the line." },
        { text: "$\\lvert a\\Delta x + b\\Delta y + c\\Delta z\\rvert$", feedback: "That works only when $(a, b, c)$ are DCs." },
        { text: "$\\dfrac{a\\Delta x + b\\Delta y + c\\Delta z}{a + b + c}$", feedback: "Normalise by the length of the DR vector, not by the sum of its entries." },
        { text: "$\\sqrt{\\Delta x^2 + \\Delta y^2 + \\Delta z^2}$", feedback: "That is the length of $AB$ itself, which is the projection only when $AB$ is parallel to the line." },
      ],
      hint: "Projection $= \\overrightarrow{AB}\\cdot\\hat u$ with $\\hat u$ a **unit** vector.",
    },
    {
      type: "numeric",
      id: "tdg1-5-q10",
      variant: "practice",
      question: "A line passes through the origin with direction ratios $(1, 2, 2)$. Find the perpendicular distance of $B(3, 3, 0)$ from it.",
      answer: 3,
      hint: "Project $\\overrightarrow{OB}$ on the line, then use Pythagoras.",
      solution: "Projection $= \\frac{3 + 6 + 0}{3} = 3$, and $OB^2 = 18$. Distance $= \\sqrt{18 - 9} = 3$.",
      commonMistakes: [
        { answer: 4.242641, tolerance: 0.01, feedback: "That is $OB = \\sqrt{18}$, the distance to the origin, not to the line." },
        { answer: 9, feedback: "9 is the square of the distance (or the unnormalised projection)." },
      ],
    },
    {
      type: "quiz",
      id: "tdg1-5-q11",
      variant: "practice",
      multiple: true,
      question: "A segment has length 14 and direction ratios $(2, -3, 6)$. Which could be its signed projections on the x, y and z axes? Select all that apply.",
      options: [
        { text: "$(4, -6, 12)$", correct: true, feedback: "$14 \\cdot \\frac17(2, -3, 6)$." },
        { text: "$(-4, 6, -12)$", correct: true, feedback: "The same segment traversed the other way." },
        { text: "$(2, -3, 6)$", feedback: "That segment has length 7." },
        { text: "$(28, -42, 84)$", feedback: "You multiplied the DRs by 14 without normalising; that has length 98." },
        { text: "$(4, 6, 12)$", feedback: "The y-component must have the opposite sign to the x- and z-components, as in $(2, -3, 6)$." },
      ],
      hint: "Projections $= 14 \\times$ (DCs), with either sense allowed.",
    },
    {
      type: "numeric",
      id: "tdg1-5-q12",
      variant: "practice",
      question:
        "JEE Advanced. The projections of a segment on the xy-, yz- and zx-planes have lengths $5$, $\\sqrt{160}$ and $\\sqrt{153}$. Find the length of the segment.",
      answer: 13,
      hint: "If the components are $(p, q, r)$, the three squared plane projections are $p^2 + q^2$, $q^2 + r^2$, $r^2 + p^2$.",
      solution: "Adding, $2(p^2 + q^2 + r^2) = 25 + 160 + 153 = 338$, so the length is $\\sqrt{169} = 13$. (The components are $3, 4, 12$ in size.)",
      commonMistakes: [
        { answer: 18.384776, tolerance: 0.01, feedback: "Each component appears in two plane projections: halve 338 before taking the root." },
        { answer: 30.018, tolerance: 0.1, feedback: "The plane projections combine through their squares, not by adding the lengths." },
      ],
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-1-mastery",
  title: "1.6 · Chapter 1 Mastery",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "No new theory and no formula sheet. Every question below can be rebuilt from one idea: a direction is a vector, its DCs are the unit vector, and angles and projections are dot products. If you are stuck, write the direction as a vector and ask which product answers the question.",
    },
    { type: "heading", text: "Reconstruct it" },
    {
      type: "callout",
      variant: "tip",
      title: "Rebuild the chapter from the unit vector",
      content:
        "Without notes:\n\n1. Why is $l^2 + m^2 + n^2 = 1$, and why does a line have two sets of DCs?\n2. How do you turn DRs $(a, b, c)$ into DCs, and why is it $\\sqrt{a^2 + b^2 + c^2}$ and not $a + b + c$?\n3. Why is the angle between two lines $\\cos^{-1}\\lvert\\hat u_1\\cdot\\hat u_2\\rvert$, and when should you keep the sign?\n4. Which product gives a direction perpendicular to two lines?\n5. Why is the projection of $AB$ on a line $\\lvert\\overrightarrow{AB}\\cdot\\hat u\\rvert$, and how do the three axis projections rebuild $AB$?",
    },
    {
      type: "interactive",
      config: {
        component: "tdg-distance-lab",
        mode: "two-directions",
        d1: [5, -12, 13],
        d2: [-3, 4, 5],
        caption:
          "Check your reconstructions. Before you change anything, predict the cosine of the angle between these two lines. Then edit the numbers to make them perpendicular, and then parallel.",
      },
    },
    { type: "heading", text: "Mastery questions" },
    {
      type: "numeric",
      id: "tdg1-6-q1",
      variant: "mastery",
      question: "A line makes $120^\\circ$ with the x-axis and $60^\\circ$ with the y-axis. Find the acute angle, in degrees, that it makes with the z-axis.",
      answer: 45,
      unit: "degrees",
      hint: "Lesson 1.1: $\\cos^2\\gamma = 1 - \\cos^2\\alpha - \\cos^2\\beta$.",
      solution: "$\\cos^2\\gamma = 1 - \\frac14 - \\frac14 = \\frac12$, so the acute angle is $45^\\circ$.",
      commonMistakes: [
        { answer: 135, feedback: "That is the obtuse possibility." },
        { answer: 0, feedback: "The angles do not add to $180^\\circ$; use the cosines." },
      ],
    },
    {
      type: "quiz",
      id: "tdg1-6-q2",
      variant: "mastery",
      question: "The direction cosines of the line through $(3, -1, 2)$ and $(5, -7, 5)$ are",
      options: [
        { text: "$\\pm\\left(\\frac27, -\\frac67, \\frac37\\right)$", correct: true, feedback: "DRs $(2, -6, 3)$, length 7." },
        { text: "$\\pm\\left(\\frac{2}{11}, -\\frac{6}{11}, \\frac{3}{11}\\right)$", feedback: "Divide by the length 7, not by $2 + 6 + 3$." },
        { text: "$\\pm(2, -6, 3)$", feedback: "These are DRs." },
        { text: "$\\pm\\left(\\frac37, -\\frac17, \\frac27\\right)$", feedback: "Those come from the first point's coordinates." },
      ],
      hint: "Lesson 1.2: subtract, then divide by the length.",
    },
    {
      type: "numeric",
      id: "tdg1-6-q3",
      variant: "mastery",
      question: "Find $\\cos\\theta$ for the angle between the lines with direction ratios $(5, -12, 13)$ and $(-3, 4, 5)$ (a fraction is fine).",
      answer: 0.0153846,
      tolerance: 0.0003,
      hint: "Lesson 1.3: the lengths are $\\sqrt{338}$ and $\\sqrt{50}$, whose product is 130.",
      solution: "Dot product $-15 - 48 + 65 = 2$; $\\sqrt{338 \\cdot 50} = 130$. So $\\cos\\theta = \\frac{2}{130} = \\frac{1}{65}$.",
      commonMistakes: [
        { answer: 2, feedback: "Divide by the product of the lengths, 130." },
        { answer: -0.0153846, tolerance: 0.0003, feedback: "The dot product is $+2$; and in any case the angle between lines uses the modulus." },
      ],
    },
    {
      type: "numeric",
      id: "tdg1-6-q4",
      variant: "mastery",
      question: "Find $k$ for which the lines with direction ratios $(k, 1, -2)$ and $(2, k, 1)$ are perpendicular (a fraction is fine).",
      answer: 0.666667,
      tolerance: 0.001,
      hint: "Lesson 1.4: $2k + k - 2 = 0$.",
      solution: "$3k = 2$, so $k = \\frac23$.",
      commonMistakes: [
        { answer: 2, feedback: "Both the first and the second products contain $k$: $2k + k = 3k$." },
        { answer: -0.666667, tolerance: 0.001, feedback: "Check the sign: $3k - 2 = 0$." },
      ],
    },
    {
      type: "quiz",
      id: "tdg1-6-q5",
      variant: "mastery",
      multiple: true,
      question: "Which triples can be direction cosines of a line? Select all that apply.",
      options: [
        { text: "$\\left(\\frac{1}{\\sqrt2}, 0, -\\frac{1}{\\sqrt2}\\right)$", correct: true, feedback: "$\\frac12 + 0 + \\frac12 = 1$." },
        { text: "$(0, 0, -1)$", correct: true, feedback: "The negative z-axis." },
        { text: "$\\left(\\frac13, \\frac23, \\frac23\\right)$", correct: true, feedback: "$\\frac{1 + 4 + 4}{9} = 1$." },
        { text: "$\\left(\\frac12, \\frac12, \\frac12\\right)$", feedback: "The squares add to $\\frac34$." },
        { text: "$\\left(\\frac35, \\frac45, \\frac15\\right)$", feedback: "The squares add to $\\frac{26}{25}$." },
      ],
      hint: "Lesson 1.1: the squares must add to exactly 1.",
    },
    {
      type: "numeric",
      id: "tdg1-6-q6",
      variant: "mastery",
      question:
        "JEE Main. A line makes angles $\\alpha, \\beta, \\gamma, \\delta$ with the four body diagonals of a cube. Find $\\sin^2\\alpha + \\sin^2\\beta + \\sin^2\\gamma + \\sin^2\\delta$ (a fraction is fine).",
      answer: 2.666667,
      tolerance: 0.001,
      hint: "Lesson 1.3: the four $\\cos^2$ values add to $\\frac43$.",
      solution: "$\\sum\\sin^2 = 4 - \\sum\\cos^2 = 4 - \\frac43 = \\frac83$.",
      commonMistakes: [
        { answer: 1.333333, tolerance: 0.001, feedback: "$\\frac43$ is the sum of the **cosine** squares." },
        { answer: 2, feedback: "2 is the answer for the three coordinate axes; here there are four diagonals." },
      ],
    },
    {
      type: "numeric",
      id: "tdg1-6-q7",
      variant: "mastery",
      question: "A segment of length 21 makes acute angles with all three axes and has direction ratios $(2, 3, 6)$. Find its projection on the y-axis.",
      answer: 9,
      hint: "Lesson 1.5: projection on the y-axis $= 21 \\times m$.",
      solution: "DCs $\\left(\\frac27, \\frac37, \\frac67\\right)$, so the y-projection is $21 \\cdot \\frac37 = 9$.",
      commonMistakes: [
        { answer: 3, feedback: "3 is the direction ratio; scale by $\\frac{21}{7}$." },
        { answer: 63, feedback: "Normalise first: divide by the length 7." },
      ],
    },
    {
      type: "numeric",
      id: "tdg1-6-q8",
      variant: "mastery",
      question:
        "JEE Advanced. The direction cosines of two lines satisfy $l - 5m + 3n = 0$ and $7l^2 + 5m^2 - 3n^2 = 0$. Find the cosine of the angle between them (to three decimal places).",
      answer: 0.763763,
      tolerance: 0.001,
      hint: "Lesson 1.4: put $l = 5m - 3n$ into the quadratic; it reduces to $(2m - n)(3m - 2n) = 0$.",
      solution: "Substituting gives $30(6m^2 - 7mn + 2n^2) = 0$. If $n = 2m$, then $l = -m$: DRs $(-1, 1, 2)$. If $2n = 3m$, then $l = \\frac{m}{2}$: DRs $(1, 2, 3)$. So $\\cos\\theta = \\frac{-1 + 2 + 6}{\\sqrt6\\,\\sqrt{14}} = \\frac{7}{\\sqrt{84}} \\approx 0.764$.",
      commonMistakes: [
        { answer: 7, feedback: "Divide the dot product by $\\sqrt6\\,\\sqrt{14}$." },
        { answer: 0.5, feedback: "Recheck the factorisation of $6m^2 - 7mn + 2n^2$: it is $(2m - n)(3m - 2n)$." },
      ],
    },
    {
      type: "quiz",
      id: "tdg1-6-q9",
      variant: "mastery",
      question: "The angle between a body diagonal of a cube and a diagonal of a face meeting it at a vertex is",
      options: [
        { text: "$\\cos^{-1}\\sqrt{\\frac23}$", correct: true, feedback: "$(1, 1, 1)\\cdot(1, 1, 0) = 2$, over $\\sqrt3\\,\\sqrt2$." },
        { text: "$\\cos^{-1}\\frac13$", feedback: "That is between two body diagonals." },
        { text: "$\\cos^{-1}\\frac{1}{\\sqrt3}$", feedback: "That is between a body diagonal and an edge." },
        { text: "$45^\\circ$", feedback: "That is between a face diagonal and an edge." },
      ],
      hint: "Lesson 1.3: DRs $(1, 1, 1)$ and $(1, 1, 0)$.",
    },
    {
      type: "numeric",
      id: "tdg1-6-q10",
      variant: "mastery",
      question: "Find the projection of the segment from $A(1, -1, 0)$ to $B(4, 1, 2)$ on the line with direction ratios $(-2, 3, 6)$ (a fraction is fine).",
      answer: 1.714286,
      tolerance: 0.001,
      hint: "Lesson 1.5: $\\overrightarrow{AB} = (3, 2, 2)$; divide by 7.",
      solution: "$\\frac{\\lvert -6 + 6 + 12\\rvert}{7} = \\frac{12}{7}$.",
      commonMistakes: [
        { answer: 12, feedback: "Normalise: divide by $\\sqrt{4 + 9 + 36} = 7$." },
        { answer: 4.123106, tolerance: 0.01, feedback: "That is the length $AB = \\sqrt{17}$." },
      ],
    },
    {
      type: "quiz",
      id: "tdg1-6-q11",
      variant: "mastery",
      multiple: true,
      question: "For the points $A(1, 2, 3)$, $B(3, 4, 7)$ and $C(-3, -2, -5)$, which statements are true? Select all that apply.",
      options: [
        { text: "$A$, $B$, $C$ are collinear", correct: true, feedback: "$\\overrightarrow{AB} = (2, 2, 4)$ and $\\overrightarrow{AC} = (-4, -4, -8) = -2\\overrightarrow{AB}$." },
        { text: "$A$ lies between $B$ and $C$", correct: true, feedback: "The factor $-2$ is negative: $B$ and $C$ are on opposite sides of $A$." },
        { text: "The DCs of the line are $\\pm\\left(\\frac{1}{\\sqrt6}, \\frac{1}{\\sqrt6}, \\frac{2}{\\sqrt6}\\right)$", correct: true, feedback: "DRs $(1, 1, 2)$, length $\\sqrt6$." },
        { text: "$B$ lies between $A$ and $C$", feedback: "$C$ is on the far side of $A$ from $B$." },
        { text: "The line is parallel to the xy-plane", feedback: "Its $n$ is not zero; the z-coordinate changes along it." },
      ],
      hint: "Lesson 1.2: compare $\\overrightarrow{AB}$ and $\\overrightarrow{AC}$, including the sign of the factor.",
    },
    {
      type: "numeric",
      id: "tdg1-6-q12",
      variant: "mastery",
      question: "Find the angle at $B$, in degrees, of the triangle with vertices $A(0, 0, 0)$, $B(1, 2, 2)$ and $C(2, -2, 1)$.",
      answer: 45,
      unit: "degrees",
      hint: "Lesson 1.3: use $\\overrightarrow{BA}$ and $\\overrightarrow{BC}$, keeping the sign.",
      solution: "$\\overrightarrow{BA} = (-1, -2, -2)$, $\\overrightarrow{BC} = (1, -4, -1)$. Dot product $-1 + 8 + 2 = 9$; lengths 3 and $\\sqrt{18}$. $\\cos B = \\frac{9}{3\\sqrt{18}} = \\frac{1}{\\sqrt2}$, so $B = 45^\\circ$. (The angle at $A$ is $90^\\circ$, since $\\overrightarrow{AB}\\cdot\\overrightarrow{AC} = 0$.)",
      commonMistakes: [
        { answer: 90, feedback: "The right angle is at $A$; the question asks for the angle at $B$." },
        { answer: 135, feedback: "Use the vectors leaving $B$: $\\overrightarrow{BA}$ and $\\overrightarrow{BC}$." },
      ],
    },
    {
      type: "quiz",
      id: "tdg1-6-q13",
      variant: "mastery",
      question: "Direction ratios of a line perpendicular to both lines with DRs $(1, -1, 2)$ and $(2, 1, -1)$ are",
      options: [
        { text: "$(-1, 5, 3)$", correct: true, feedback: "Cross product: $((-1)(-1) - 2 \\cdot 1,\\ 2 \\cdot 2 - 1 \\cdot (-1),\\ 1 \\cdot 1 - (-1) \\cdot 2) = (-1, 5, 3)$." },
        { text: "$(1, 5, 3)$", feedback: "Dot with $(1, -1, 2)$: $1 - 5 + 6 = 2 \\ne 0$." },
        { text: "$(3, 0, 1)$", feedback: "That is the sum of the two directions." },
        { text: "$(-1, -5, 3)$", feedback: "Dot with $(1, -1, 2)$: $-1 + 5 + 6 = 10 \\ne 0$." },
      ],
      hint: "Lesson 1.4: cross product, then check both dot products.",
    },
    {
      type: "numeric",
      id: "tdg1-6-q14",
      variant: "mastery",
      question: "The line through $A(2, -1, \\lambda)$ and $B(4, 3, 5)$ is parallel to the line with direction ratios $(1, 2, 3)$. Find $\\lambda$.",
      answer: -1,
      hint: "Lesson 1.4: $(2, 4, 5 - \\lambda)$ must be a multiple of $(1, 2, 3)$.",
      solution: "The factor is 2 (from the first two entries), so $5 - \\lambda = 6$ and $\\lambda = -1$.",
      commonMistakes: [
        { answer: 11, feedback: "$5 - \\lambda = 6$ gives $\\lambda = -1$, not $5 + 6$." },
        { answer: 2, feedback: "The factor is 2, but it multiplies 3: $5 - \\lambda = 6$." },
      ],
    },
    {
      type: "numeric",
      id: "tdg1-6-q15",
      variant: "mastery",
      question:
        "JEE Main. The direction cosines of two lines satisfy $2l + 2m - n = 0$ and $mn + nl + lm = 0$. Find the angle between the lines, in degrees.",
      answer: 90,
      unit: "degrees",
      hint: "Lesson 1.4: put $n = 2l + 2m$ into the quadratic; it becomes $(2l + m)(l + 2m) = 0$.",
      solution: "$m(2l + 2m) + (2l + 2m)l + lm = 2l^2 + 5lm + 2m^2 = (2l + m)(l + 2m) = 0$. If $m = -2l$: $n = -2l$, DRs $(1, -2, -2)$. If $l = -2m$: $n = -2m$, DRs $(-2, 1, -2)$. Dot product $-2 - 2 + 4 = 0$, so the lines are perpendicular.",
      commonMistakes: [
        { answer: 60, feedback: "Compute the dot product of $(1, -2, -2)$ and $(-2, 1, -2)$: it is 0." },
        { answer: 0, feedback: "The two lines have different directions; a zero dot product means $90^\\circ$." },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Where next",
      content:
        "A direction alone does not place a line: infinitely many parallel lines share it. Chapter 2 adds a point, writes the line as $\\vec r = \\vec a + \\lambda\\vec b$ and in Cartesian form, and uses its general point to find the foot of a perpendicular, the distance from a point, images and intersections. The projection trick of Lesson 1.5 is the first step of that foot-of-perpendicular method.",
    },
  ]),
};

export const tdgChapter1Lessons: LessonSeed[] = [lesson01, lesson02, lesson03, lesson04, lesson05, lessonMastery];
