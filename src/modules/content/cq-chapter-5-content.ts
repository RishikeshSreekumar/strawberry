import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Complex Numbers & Quadratics Chapter 5 — Geometry with Complex Numbers.
 * Points as complex numbers: distance, section formula and lines; circles
 * and discs; loci from distances (bisector, ellipse, hyperbola branch,
 * Apollonius circle) and from arguments (rays and arcs); the rotation
 * theorem with equilateral triangles, squares and collinearity; and
 * maximum / minimum of the modulus under constraints.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "distance-section-formula-and-lines",
  title: "5.1 · Distance, Section Formula and Lines",
  position: 1,
  blocks: blocks([
    {
      type: "text",
      content:
        "In coordinate geometry a point is a pair $(x, y)$ and every formula comes in two halves, one for $x$ and one for $y$. In the Argand plane the same point is a single number $z = x + iy$, and the two halves collapse into one line of algebra. The midpoint of $A$ and $B$ is not \"average the x's, average the y's\": it is just $\\frac{a + b}{2}$.",
    },
    {
      type: "text",
      content:
        "This chapter turns that idea into a toolkit. Two facts from Chapter 3 do all the work: $\\lvert z_1 - z_2\\rvert$ is the **distance** between the points, and $\\arg(z_1 - z_2)$ is the **direction** of the arrow from $z_2$ to $z_1$. Distance gives circles and conics, direction gives lines, angles and rotations.",
    },
    { type: "heading", text: "Distance and the section formula" },
    {
      type: "callout",
      variant: "definition",
      title: "Distance, midpoint, section formula",
      content:
        "For points $A(z_1)$ and $B(z_2)$:\n\n- distance $AB = \\lvert z_2 - z_1\\rvert$\n- midpoint $= \\dfrac{z_1 + z_2}{2}$\n- the point dividing $AB$ **internally** in the ratio $m : n$ is $\\dfrac{mz_2 + nz_1}{m + n}$\n- the point dividing $AB$ **externally** in the ratio $m : n$ is $\\dfrac{mz_2 - nz_1}{m - n}$, $m \\ne n$",
    },
    {
      type: "text",
      content:
        "Why the section formula holds: a point $P(z)$ dividing $AB$ internally in $m : n$ sits on the segment with $AP : PB = m : n$, so the arrow $z - z_1$ is $\\frac{m}{m+n}$ of the arrow $z_2 - z_1$:",
    },
    {
      type: "math",
      latex: "z - z_1 = \\frac{m}{m+n}(z_2 - z_1) \\implies z = \\frac{(m+n)z_1 + mz_2 - mz_1}{m+n} = \\frac{mz_2 + nz_1}{m+n}",
    },
    {
      type: "text",
      content:
        "The weight $m$ sits on the **far** point $z_2$: the point is pulled towards whichever end carries the bigger weight, and $AP : PB = m : n$ with $m > n$ means $P$ is nearer $B$. The same arrow argument with $P$ outside the segment gives the external formula.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Centres of a triangle",
      content:
        "For a triangle with vertices $z_1, z_2, z_3$ and opposite side lengths $a = \\lvert z_2 - z_3\\rvert$, $b = \\lvert z_3 - z_1\\rvert$, $c = \\lvert z_1 - z_2\\rvert$:\n\n- centroid $= \\dfrac{z_1 + z_2 + z_3}{3}$\n- incentre $= \\dfrac{az_1 + bz_2 + cz_3}{a + b + c}$ (each vertex weighted by the **opposite** side)",
    },
    {
      type: "worked-example",
      id: "cq5-1-we1",
      title: "Worked example 1: internal and external division",
      problem:
        "Find the points dividing the join of $z_1 = 1 + 2i$ and $z_2 = 7 - 4i$ in the ratio $1 : 2$, internally and externally.",
      steps: [
        { text: "Internal, $m = 1$, $n = 2$: the weight 1 goes on $z_2$ and the weight 2 on $z_1$." },
        { latex: "\\frac{1\\cdot(7 - 4i) + 2(1 + 2i)}{3} = \\frac{9 + 0i}{3} = 3" },
        { text: "External: $\\dfrac{mz_2 - nz_1}{m - n}$ with $m - n = -1$. *Why this step:* the denominator is negative because the point lies beyond $z_1$, the end with the larger weight." },
        { latex: "\\frac{(7 - 4i) - 2(1 + 2i)}{1 - 2} = \\frac{5 - 8i}{-1} = -5 + 8i" },
      ],
      answer: "Internal point $3$, external point $-5 + 8i$.",
    },
    {
      type: "worked-example",
      id: "cq5-1-we2",
      title: "Worked example 2: an incentre",
      problem: "Find the incentre of the triangle with vertices $0$, $3$ and $3i$.",
      steps: [
        { text: "Opposite sides: $a = \\lvert 3 - 3i\\rvert = 3\\sqrt2$ (opposite $0$), $b = \\lvert 3i - 0\\rvert = 3$ (opposite $3$), $c = \\lvert 0 - 3\\rvert = 3$ (opposite $3i$)." },
        { latex: "I = \\frac{3\\sqrt2\\cdot 0 + 3\\cdot 3 + 3\\cdot 3i}{3\\sqrt2 + 6} = \\frac{3(1 + i)}{2 + \\sqrt2} = \\frac{3(2 - \\sqrt2)}{2}(1 + i)" },
        { text: "Check: the right angle is at $0$, so the inradius is $\\frac{3 + 3 - 3\\sqrt2}{2} = \\frac{3(2 - \\sqrt2)}{2} \\approx 0.88$, and the incentre should sit that far from both legs, at $(r, r)$. It does." },
      ],
      answer: "$I = \\frac{3(2 - \\sqrt2)}{2}(1 + i) \\approx 0.88 + 0.88i$.",
    },
    { type: "heading", text: "Collinearity" },
    {
      type: "text",
      content:
        "Three points $z_1, z_2, z_3$ lie on one line exactly when the arrows $z_2 - z_1$ and $z_3 - z_1$ point along the same line, forwards or backwards. Dividing one arrow by the other subtracts their directions, so the quotient must have argument $0$ or $\\pi$, which means it is **real**.",
    },
    {
      type: "math",
      latex: "z_1, z_2, z_3 \\text{ collinear} \\iff \\frac{z_3 - z_1}{z_2 - z_1} \\in \\mathbb{R} \\iff \\begin{vmatrix} z_1 & \\bar z_1 & 1 \\\\ z_2 & \\bar z_2 & 1 \\\\ z_3 & \\bar z_3 & 1 \\end{vmatrix} = 0",
    },
    {
      type: "text",
      content:
        "The determinant form comes from writing \"real\" as $w = \\bar w$ for $w = \\frac{z_3 - z_1}{z_2 - z_1}$ and cross-multiplying. Drag the three points below. The readout calls them collinear only when the ratio has no imaginary part.",
    },
    {
      type: "interactive",
      config: {
        component: "cq-argand-plane",
        mode: "rotation",
        z1: [-3, -1],
        z2: [-1, 0],
        z3: [1, 1],
        caption:
          "The ratio $\\frac{z_3 - z_1}{z_2 - z_1}$ starts at $2$, a real number, so the points are collinear. Move $z_3$ off the line and an imaginary part appears, together with a nonzero angle at $z_1$.",
      },
    },
    {
      type: "worked-example",
      id: "cq5-1-we3",
      title: "Worked example 3: testing collinearity",
      problem: "Are $1 + 2i$, $3 + 5i$ and $7 + 11i$ collinear?",
      steps: [
        { text: "Form the ratio with $z_1 = 1 + 2i$ as the common tail." },
        { latex: "\\frac{z_3 - z_1}{z_2 - z_1} = \\frac{6 + 9i}{2 + 3i} = 3" },
        { text: "The ratio is real (and positive, so $z_3$ is on the same side of $z_1$ as $z_2$, three times as far)." },
      ],
      answer: "Yes: the ratio is $3$, a real number.",
    },
    { type: "heading", text: "Equations of lines" },
    {
      type: "text",
      content:
        "A point $z$ lies on the line through $z_1$ and $z_2$ when $z_1, z_2, z$ are collinear: $\\frac{z - z_1}{z_2 - z_1}$ equals its own conjugate. Clearing denominators turns every line into the same shape:",
    },
    {
      type: "math",
      latex: "\\bar a z + a\\bar z + b = 0, \\qquad a \\ne 0 \\text{ complex}, \\ b \\text{ real}",
    },
    {
      type: "text",
      content:
        "Why this is a line: with $a = p + iq$ and $z = x + iy$, $\\bar a z + a \\bar z = 2\\,\\mathrm{Re}(\\bar a z) = 2(px + qy)$. So the equation is $2(px + qy) + b = 0$, an ordinary straight line whose normal points along $a$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Complex slope, parallel and perpendicular lines, distance to a line",
      content:
        "The **complex slope** of the line through $z_1, z_2$ is $\\omega = \\dfrac{z_1 - z_2}{\\bar z_1 - \\bar z_2}$, and for $\\bar a z + a\\bar z + b = 0$ it is $\\omega = -\\dfrac{a}{\\bar a}$. If the line makes angle $\\varphi$ with the real axis, $\\omega = e^{2i\\varphi}$.\n\n- parallel lines: $\\omega_1 = \\omega_2$\n- perpendicular lines: $\\omega_1 + \\omega_2 = 0$\n- distance from $z_0$ to $\\bar a z + a\\bar z + b = 0$: $\\dfrac{\\lvert \\bar a z_0 + a\\bar z_0 + b\\rvert}{2\\lvert a\\rvert}$",
    },
    {
      type: "worked-example",
      id: "cq5-1-we4",
      title: "Worked example 4: a line in complex form, and a distance",
      problem:
        "Write the line through $1 + i$ and $3 - i$ in the form $\\bar a z + a \\bar z + b = 0$, and find the distance of $2 + 3i$ from it.",
      steps: [
        { text: "In Cartesian terms the points are $(1, 1)$ and $(3, -1)$, so the line is $x + y = 2$." },
        { text: "Match $2(px + qy) + b = 0$: $p = q = 1$ and $b = -4$, so $a = 1 + i$. *Why this step:* $a$ is the normal direction $(p, q)$ written as a complex number." },
        { latex: "(1 - i)z + (1 + i)\\bar z - 4 = 0" },
        { text: "Check with $z = 1 + i$: $(1 - i)(1 + i) + (1 + i)(1 - i) - 4 = 2 + 2 - 4 = 0$." },
        { text: "Distance of $z_0 = 2 + 3i$: $\\bar a z_0 + a\\bar z_0 = 2\\,\\mathrm{Re}\\big((1 - i)(2 + 3i)\\big) = 2\\,\\mathrm{Re}(5 + i) = 10$." },
        { latex: "\\frac{\\lvert 10 - 4\\rvert}{2\\lvert 1 + i\\rvert} = \\frac{6}{2\\sqrt2} = \\frac{3}{\\sqrt2}" },
      ],
      answer: "$(1 - i)z + (1 + i)\\bar z - 4 = 0$, and the distance is $\\frac{3}{\\sqrt2} \\approx 2.12$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"equal moduli means collinear\"",
      content:
        "$\\lvert z_1\\rvert = \\lvert z_2\\rvert = \\lvert z_3\\rvert$ says the three points are the same distance from the **origin**: they lie on a circle centred at $0$, which is almost the opposite of lying on a line. Collinearity is about **directions**, so test the argument of $\\frac{z_3 - z_1}{z_2 - z_1}$ (it must be $0$ or $\\pi$), not any moduli.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the bigger weight goes on the nearer point\"",
      content:
        "In $\\frac{mz_2 + nz_1}{m+n}$ the ratio $AP : PB = m : n$ puts weight $m$ on $z_2 = B$. With $m > n$ the point is closer to $B$. Swapping the weights gives the point dividing in $n : m$ instead. If in doubt, test the midpoint case $m = n$, and then a case like $1 : 0$, which must give $P = A$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "cq5-1-q1",
      variant: "practice",
      question: "Find the distance between the points $3 + 4i$ and $-1 + i$.",
      answer: 5,
      hint: "Distance $= \\lvert z_1 - z_2\\rvert$.",
      solution: "$(3 + 4i) - (-1 + i) = 4 + 3i$, and $\\lvert 4 + 3i\\rvert = \\sqrt{16 + 9} = 5$.",
      commonMistakes: [
        { answer: 7, feedback: "That is $\\lvert 4\\rvert + \\lvert 3\\rvert$. The modulus is $\\sqrt{4^2 + 3^2}$, not the sum of the parts." },
        { answer: 25, feedback: "That is the square of the distance. Take the square root." },
      ],
    },
    {
      type: "quiz",
      id: "cq5-1-q2",
      variant: "practice",
      question: "What is the midpoint of $2 - 3i$ and $-4 + 7i$?",
      options: [
        { text: "$-1 + 2i$", correct: true, feedback: "$\\frac{(2 - 4) + (-3 + 7)i}{2} = \\frac{-2 + 4i}{2}$." },
        { text: "$-2 + 4i$", feedback: "That is the sum. Divide by 2 for the midpoint." },
        { text: "$3 - 5i$", feedback: "That is half the difference, the arrow from the midpoint to one end, not the midpoint itself." },
        { text: "$-1 + 5i$", feedback: "Check the imaginary parts: $\\frac{-3 + 7}{2} = 2$." },
      ],
      hint: "Midpoint $= \\frac{z_1 + z_2}{2}$: add, then halve.",
    },
    {
      type: "quiz",
      id: "cq5-1-q3",
      variant: "practice",
      question: "$P$ divides the join of $A(2 + i)$ and $B(8 + 10i)$ internally in the ratio $AP : PB = 1 : 2$. Which number is $P$?",
      options: [
        { text: "$4 + 4i$", correct: true, feedback: "$\\frac{1\\cdot(8 + 10i) + 2(2 + i)}{3} = \\frac{12 + 12i}{3}$. One third of the way from $A$ to $B$." },
        { text: "$6 + 7i$", feedback: "That divides in $2 : 1$: the weights are swapped. With $AP : PB = 1 : 2$, $P$ is nearer $A$." },
        { text: "$5 + 5.5i$", feedback: "That is the midpoint, ratio $1 : 1$." },
        { text: "$14 + 19i$", feedback: "That is an external division ($2 : 1$ externally)." },
      ],
      hint: "Use $\\frac{mz_2 + nz_1}{m + n}$ with $m = 1$ on $B$ and $n = 2$ on $A$. Then sanity-check: $P$ should be nearer $A$.",
    },
    {
      type: "quiz",
      id: "cq5-1-q4",
      variant: "practice",
      multiple: true,
      question: "Which of these triples of points are collinear? Select all that apply.",
      options: [
        { text: "$1$, $i$, $-1 + 2i$", correct: true, feedback: "$\\frac{-2 + 2i}{-1 + i} = 2$, real." },
        { text: "$0$, $1 + i$, $2 + 3i$", feedback: "$\\frac{2 + 3i}{1 + i} = \\frac{5 + i}{2}$ has a nonzero imaginary part." },
        { text: "$2 + i$, $4 + 2i$, $-2 - i$", correct: true, feedback: "$\\frac{-4 - 2i}{2 + i} = -2$, real (negative: the third point is on the other side of the first)." },
        { text: "$i$, $2i$, $1 + i$", feedback: "$\\frac{1}{i} = -i$, purely imaginary: the angle at $i$ is a right angle." },
      ],
      hint: "For each triple compute $\\frac{z_3 - z_1}{z_2 - z_1}$ and ask whether it is real.",
    },
    {
      type: "quiz",
      id: "cq5-1-q5",
      variant: "concept",
      question: "The points $z_1, z_2, z_3$ (distinct) are collinear exactly when",
      options: [
        { text: "$\\frac{z_3 - z_1}{z_2 - z_1}$ is real", correct: true, feedback: "A real ratio means the two arrows from $z_1$ differ in direction by $0$ or $\\pi$." },
        { text: "$\\frac{z_3 - z_1}{z_2 - z_1}$ is purely imaginary", feedback: "That means the arrows are perpendicular: a right angle at $z_1$." },
        { text: "$\\lvert z_1\\rvert = \\lvert z_2\\rvert = \\lvert z_3\\rvert$", feedback: "That puts the points on a circle centred at the origin, the opposite of a line." },
        { text: "$z_1 + z_2 + z_3 = 0$", feedback: "That says the centroid is the origin, which any triangle can satisfy after a shift." },
      ],
      hint: "Collinear is a statement about directions. Which operation compares the directions of two arrows?",
    },
    {
      type: "numeric",
      id: "cq5-1-q6",
      variant: "practice",
      question: "Find the distance of the centroid of the triangle with vertices $1 + 2i$, $3 - i$ and $5 + 8i$ from the origin. Give your answer to two decimal places.",
      answer: 4.2426,
      tolerance: 0.01,
      hint: "Centroid $= \\frac{z_1 + z_2 + z_3}{3}$, then take its modulus.",
      solution: "$\\frac{(1 + 3 + 5) + (2 - 1 + 8)i}{3} = 3 + 3i$, and $\\lvert 3 + 3i\\rvert = 3\\sqrt2 \\approx 4.24$.",
      commonMistakes: [
        { answer: 12.728, tolerance: 0.01, feedback: "That is $\\lvert 9 + 9i\\rvert$: you forgot to divide the sum by 3." },
        { answer: 18, feedback: "That is $\\lvert 3 + 3i\\rvert^2$. Take the square root." },
      ],
    },
    {
      type: "quiz",
      id: "cq5-1-q7",
      variant: "practice",
      question: "What is the complex slope $\\omega = \\frac{z_1 - z_2}{\\bar z_1 - \\bar z_2}$ of the line through $1 + i$ and $3 - i$?",
      options: [
        { text: "$-i$", correct: true, feedback: "$\\frac{-2 + 2i}{-2 - 2i} = -i$. The line makes $135^\\circ$ with the real axis and $e^{2i\\cdot 135^\\circ} = e^{i\\cdot 270^\\circ} = -i$." },
        { text: "$i$", feedback: "That is the complex slope of a line perpendicular to this one ($\\omega_1 + \\omega_2 = 0$)." },
        { text: "$-1$", feedback: "$-1$ is the ordinary (real) slope $\\frac{\\Delta y}{\\Delta x}$, not the complex slope." },
        { text: "$1$", feedback: "A complex slope of $1$ means $e^{2i\\varphi} = 1$, a horizontal line." },
      ],
      hint: "Compute $\\frac{-2 + 2i}{-2 - 2i}$ by multiplying top and bottom by the conjugate of the denominator.",
    },
    {
      type: "numeric",
      id: "cq5-1-q8",
      variant: "practice",
      question: "Find the distance of the origin from the line $(2 - i)z + (2 + i)\\bar z + 10 = 0$. Give your answer to two decimal places.",
      answer: 2.2361,
      tolerance: 0.01,
      hint: "Here $a = 2 + i$ and $b = 10$. Use $\\frac{\\lvert \\bar a z_0 + a\\bar z_0 + b\\rvert}{2\\lvert a\\rvert}$ with $z_0 = 0$.",
      solution: "At $z_0 = 0$ the numerator is $\\lvert b\\rvert = 10$, and $2\\lvert a\\rvert = 2\\sqrt5$. Distance $= \\frac{10}{2\\sqrt5} = \\sqrt5 \\approx 2.24$. (In Cartesian form the line is $2x + y + 5 = 0$, and $\\frac{5}{\\sqrt5} = \\sqrt5$.)",
      commonMistakes: [
        { answer: 4.4721, tolerance: 0.01, feedback: "That is $\\frac{10}{\\sqrt5}$: the denominator is $2\\lvert a\\rvert$, because $\\bar a z + a\\bar z$ is twice $\\mathrm{Re}(\\bar a z)$." },
        { answer: 2, feedback: "That is $\\frac{10}{5} = \\frac{b}{\\lvert a\\rvert^2}$. Use $2\\lvert a\\rvert = 2\\sqrt5$ in the denominator." },
      ],
    },
    {
      type: "quiz",
      id: "cq5-1-q9",
      variant: "concept",
      multiple: true,
      question: "JEE Main. The lines $\\bar a z + a\\bar z + b = 0$ and $\\bar c z + c\\bar z + d = 0$ ($b, d$ real) are perpendicular. Which conditions are equivalent to this? Select all that apply.",
      options: [
        { text: "$\\frac{a}{\\bar a} + \\frac{c}{\\bar c} = 0$", correct: true, feedback: "The complex slopes $-\\frac{a}{\\bar a}$ and $-\\frac{c}{\\bar c}$ must add to zero." },
        { text: "$\\bar a c + a\\bar c = 0$", correct: true, feedback: "Multiply the first condition by $\\bar a\\bar c$: $a\\bar c + c\\bar a = 0$, i.e. $\\mathrm{Re}(a\\bar c) = 0$: the normals $a$ and $c$ are perpendicular." },
        { text: "$\\frac{a}{\\bar a} = \\frac{c}{\\bar c}$", feedback: "Equal complex slopes means the lines are parallel." },
        { text: "$\\lvert a\\rvert = \\lvert c\\rvert$", feedback: "Scaling $a$ and $b$ together does not change a line, so $\\lvert a\\rvert$ carries no information about direction." },
      ],
      hint: "The complex slope of $\\bar a z + a\\bar z + b = 0$ is $-\\frac{a}{\\bar a}$, and perpendicular lines have slopes adding to zero.",
    },
    {
      type: "numeric",
      id: "cq5-1-q10",
      variant: "practice",
      question: "JEE Main. A triangle has vertices $0$, $6$ and $8i$. Its incentre is $p + iq$. Find $p + q$.",
      answer: 4,
      hint: "Weight each vertex by the length of the side **opposite** it: $\\frac{az_1 + bz_2 + cz_3}{a + b + c}$.",
      solution: "Opposite sides: to $0$ it is $\\lvert 6 - 8i\\rvert = 10$, to $6$ it is $\\lvert 8i\\rvert = 8$, to $8i$ it is $6$. Incentre $= \\frac{10\\cdot 0 + 8\\cdot 6 + 6\\cdot 8i}{24} = 2 + 2i$, so $p + q = 4$. (Right angle at $0$, inradius $\\frac{6 + 8 - 10}{2} = 2$: consistent.)",
      commonMistakes: [
        { answer: 4.6667, tolerance: 0.01, feedback: "That is the centroid $\\frac{6 + 8i}{3}$. The incentre weights vertices by opposite sides." },
        { answer: 5.3333, tolerance: 0.01, feedback: "You weighted each vertex by an adjacent side. The weight on a vertex is the side opposite it." },
      ],
    },
    {
      type: "numeric",
      id: "cq5-1-q11",
      variant: "practice",
      question: "JEE Main. If $\\lvert z\\rvert = 4$, find the area of the triangle with vertices $z$, $iz$ and $z + iz$.",
      answer: 8,
      hint: "From $z + iz$ the other two vertices are reached by the arrows $-iz$ and $-z$. How are $z$ and $iz$ related geometrically?",
      solution: "The sides from $z + iz$ to $z$ and to $iz$ are $-iz$ and $-z$: both of length $\\lvert z\\rvert$, and perpendicular because multiplying by $i$ turns through $90^\\circ$. So the triangle is right-angled with legs $4$ and $4$, and its area is $\\frac12 \\cdot 4 \\cdot 4 = 8$, in general $\\frac12\\lvert z\\rvert^2$.",
      commonMistakes: [
        { answer: 16, feedback: "That is the area of the square on the legs. A right triangle has half of $\\text{leg} \\times \\text{leg}$." },
        { answer: 4, feedback: "That is $\\frac{\\lvert z\\rvert^2}{4}$. The legs are both $\\lvert z\\rvert = 4$, so the area is $\\frac12\\cdot 16$." },
      ],
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "circles-and-discs",
  title: "5.2 · Circles and Discs",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "A circle is the set of points at a fixed distance from a centre. In the Argand plane \"distance from $a$\" is $\\lvert z - a\\rvert$, so the circle with centre $a$ and radius $r$ is simply $\\lvert z - a\\rvert = r$. No squares, no $x$ and $y$: the definition of a circle *is* its equation.",
    },
    { type: "heading", text: "The circle and its regions" },
    {
      type: "callout",
      variant: "definition",
      title: "Circle, disc, annulus",
      content:
        "- $\\lvert z - a\\rvert = r$: the circle with centre $a$ and radius $r$\n- $\\lvert z - a\\rvert < r$: the open disc (inside), $\\lvert z - a\\rvert \\le r$ the closed disc\n- $\\lvert z - a\\rvert > r$: the exterior\n- $r_1 < \\lvert z - a\\rvert < r_2$: an annulus (a ring)\n\nEvery point of the circle can be written $z = a + re^{i\\theta}$, $0 \\le \\theta < 2\\pi$.",
    },
    {
      type: "interactive",
      config: {
        component: "cq-locus-explorer",
        locus: "circle",
        a: [1, 1],
        k: { min: 0.5, max: 3, step: 0.5, initial: 2 },
        p: [2, -1],
        shade: true,
        draggable: ["a", "p"],
        caption:
          "The shaded disc is $\\lvert z - a\\rvert < k$. Drag $P$ across the boundary and watch the readout switch from inside to on to outside as $\\lvert P - a\\rvert$ passes $k$.",
      },
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the centre of |z + 2 − i| = 3 is 2 − i\"",
      content:
        "The centre is the number being **subtracted**. Rewrite first: $\\lvert z + 2 - i\\rvert = \\lvert z - (-2 + i)\\rvert$, so the centre is $-2 + i$. Reading the centre straight off the signs inside the modulus gives its reflection through the origin, a classic one-mark loss.",
    },
    {
      type: "worked-example",
      id: "cq5-2-we1",
      title: "Worked example 1: normalise before reading",
      problem: "Find the centre and radius of $\\lvert 2z - 4 + 6i\\rvert = 10$.",
      steps: [
        { text: "Factor out the coefficient of $z$: $\\lvert 2z - 4 + 6i\\rvert = \\lvert 2\\rvert\\,\\lvert z - 2 + 3i\\rvert$. *Why this step:* $\\lvert z - a\\rvert = r$ only reads as a circle when $z$ has coefficient 1, and $\\lvert kw\\rvert = \\lvert k\\rvert\\lvert w\\rvert$ lets us pull the 2 out." },
        { latex: "\\lvert z - (2 - 3i)\\rvert = 5" },
      ],
      answer: "Centre $2 - 3i$, radius $5$.",
    },
    { type: "heading", text: "The general equation of a circle" },
    {
      type: "text",
      content:
        "Square $\\lvert z - c\\rvert = r$ using $\\lvert w\\rvert^2 = w\\bar w$:",
    },
    {
      type: "math",
      latex: "(z - c)(\\bar z - \\bar c) = r^2 \\implies z\\bar z - \\bar c z - c\\bar z + \\lvert c\\rvert^2 - r^2 = 0",
    },
    {
      type: "text",
      content:
        "So every circle has the shape $z\\bar z + \\bar\\alpha z + \\alpha\\bar z + k = 0$ with $k$ real. Reading it back: $(z + \\alpha)(\\bar z + \\bar\\alpha) = \\lvert\\alpha\\rvert^2 - k$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "General circle",
      content:
        "$z\\bar z + \\bar\\alpha z + \\alpha\\bar z + k = 0$ ($k$ real) is a circle with\n\n- centre $-\\alpha$ (note: $\\alpha$ is the coefficient of $\\bar z$, and the coefficient of $z$ is its conjugate)\n- radius $\\sqrt{\\lvert\\alpha\\rvert^2 - k}$, a real circle when $\\lvert\\alpha\\rvert^2 > k$ (a single point if equal, empty if less)",
    },
    {
      type: "worked-example",
      id: "cq5-2-we2",
      title: "Worked example 2: centre and radius from the general form",
      problem: "Find the centre and radius of $z\\bar z + (2 - 3i)z + (2 + 3i)\\bar z - 3 = 0$.",
      steps: [
        { text: "The coefficient of $\\bar z$ is $\\alpha = 2 + 3i$ (and the coefficient of $z$ is $\\bar\\alpha = 2 - 3i$, as it should be). $k = -3$." },
        { text: "Centre $-\\alpha = -2 - 3i$." },
        { latex: "r = \\sqrt{\\lvert\\alpha\\rvert^2 - k} = \\sqrt{13 + 3} = 4" },
      ],
      answer: "Centre $-2 - 3i$, radius $4$.",
    },
    { type: "heading", text: "The circle on a diameter" },
    {
      type: "text",
      content:
        "The angle in a semicircle is a right angle. So $z$ lies on the circle with diameter $AB$ exactly when the arrows $z - a$ and $z - b$ are perpendicular, that is when their quotient is purely imaginary:",
    },
    {
      type: "math",
      latex: "\\frac{z - a}{z - b} \\text{ purely imaginary} \\iff (z - a)(\\bar z - \\bar b) + (\\bar z - \\bar a)(z - b) = 0",
    },
    {
      type: "worked-example",
      id: "cq5-2-we3",
      title: "Worked example 3: a purely imaginary quotient",
      problem: "Find the locus of $z$ for which $\\frac{z - 1}{z + 1}$ is purely imaginary.",
      steps: [
        { text: "Let $w = \\frac{z - 1}{z + 1}$. Purely imaginary means $w + \\bar w = 0$." },
        { latex: "\\frac{z - 1}{z + 1} + \\frac{\\bar z - 1}{\\bar z + 1} = 0 \\implies (z - 1)(\\bar z + 1) + (\\bar z - 1)(z + 1) = 0" },
        { text: "Expand: $(z\\bar z + z - \\bar z - 1) + (z\\bar z + \\bar z - z - 1) = 2z\\bar z - 2$." },
        { latex: "z\\bar z = 1 \\implies \\lvert z\\rvert = 1" },
        { text: "Exclude $z = -1$ (the quotient is undefined) and $z = 1$ (the quotient is $0$, conventionally not counted as purely imaginary). Geometrically: the circle with diameter from $-1$ to $1$." },
      ],
      answer: "The unit circle $\\lvert z\\rvert = 1$ without the points $\\pm 1$.",
    },
    {
      type: "worked-example",
      id: "cq5-2-we4",
      title: "Worked example 4: circle on a given diameter",
      problem: "Write the circle with the segment from $1 + i$ to $5 + 3i$ as diameter in the form $\\lvert z - c\\rvert = r$.",
      steps: [
        { text: "Centre = midpoint $= \\frac{6 + 4i}{2} = 3 + 2i$." },
        { text: "Radius = half the diameter $= \\frac{\\lvert 4 + 2i\\rvert}{2} = \\frac{2\\sqrt5}{2} = \\sqrt5$." },
      ],
      answer: "$\\lvert z - (3 + 2i)\\rvert = \\sqrt5$.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Two circles",
      content:
        "Circles $\\lvert z - z_1\\rvert = r_1$ and $\\lvert z - z_2\\rvert = r_2$ with $d = \\lvert z_1 - z_2\\rvert$:\n\n- touch externally if $d = r_1 + r_2$, internally if $d = \\lvert r_1 - r_2\\rvert$\n- cut in two points if $\\lvert r_1 - r_2\\rvert < d < r_1 + r_2$\n- do not meet otherwise",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "cq5-2-q1",
      variant: "practice",
      question: "What are the centre and radius of $\\lvert z + 3 - 4i\\rvert = 2$?",
      options: [
        { text: "Centre $-3 + 4i$, radius $2$", correct: true, feedback: "$\\lvert z - (-3 + 4i)\\rvert = 2$." },
        { text: "Centre $3 - 4i$, radius $2$", feedback: "The centre is the number subtracted from $z$. Rewrite as $\\lvert z - (-3 + 4i)\\rvert$." },
        { text: "Centre $-3 + 4i$, radius $4$", feedback: "The radius is the right-hand side, 2, not its square." },
        { text: "Centre $3 - 4i$, radius $\\sqrt2$", feedback: "Both parts are off: the centre's sign and the radius (no square root is taken)." },
      ],
      hint: "Write the left side as $\\lvert z - c\\rvert$.",
    },
    {
      type: "numeric",
      id: "cq5-2-q2",
      variant: "practice",
      question: "Find the radius of the circle $\\lvert 3z - 6 + 9i\\rvert = 12$.",
      answer: 4,
      hint: "Pull the 3 out of the modulus first.",
      solution: "$\\lvert 3z - 6 + 9i\\rvert = 3\\lvert z - (2 - 3i)\\rvert = 12$, so $\\lvert z - (2 - 3i)\\rvert = 4$.",
      commonMistakes: [
        { answer: 12, feedback: "The coefficient of $z$ is 3, so divide: $\\lvert z - (2 - 3i)\\rvert = 4$." },
        { answer: 36, feedback: "You multiplied by 3 instead of dividing." },
      ],
    },
    {
      type: "numeric",
      id: "cq5-2-q3",
      variant: "practice",
      question: "Find the radius of $z\\bar z - (3 + 4i)z - (3 - 4i)\\bar z + 9 = 0$.",
      answer: 4,
      hint: "Match with $z\\bar z + \\bar\\alpha z + \\alpha\\bar z + k = 0$: $\\alpha$ is the coefficient of $\\bar z$. Radius $\\sqrt{\\lvert\\alpha\\rvert^2 - k}$.",
      solution: "$\\alpha = -(3 - 4i) = -3 + 4i$, so $\\lvert\\alpha\\rvert^2 = 25$ and $k = 9$. Radius $= \\sqrt{25 - 9} = 4$.",
      commonMistakes: [
        { answer: 5, feedback: "That is $\\lvert\\alpha\\rvert$. Subtract $k$ under the root: $\\sqrt{25 - 9}$." },
        { answer: 5.831, tolerance: 0.01, feedback: "That is $\\sqrt{25 + 9}$. The constant $k$ is subtracted." },
      ],
    },
    {
      type: "quiz",
      id: "cq5-2-q4",
      variant: "practice",
      question: "What is the centre of the circle $z\\bar z - (3 + 4i)z - (3 - 4i)\\bar z + 9 = 0$?",
      options: [
        { text: "$3 - 4i$", correct: true, feedback: "$\\alpha = -3 + 4i$ (coefficient of $\\bar z$), centre $-\\alpha = 3 - 4i$. Check: $\\lvert z - c\\rvert^2 = z\\bar z - \\bar c z - c\\bar z + \\lvert c\\rvert^2$ with $\\bar c = 3 + 4i$." },
        { text: "$3 + 4i$", feedback: "That is the conjugate of the centre: you used the coefficient of $z$ instead of $\\bar z$." },
        { text: "$-3 + 4i$", feedback: "That is $\\alpha$ itself. The centre is $-\\alpha$." },
        { text: "$-3 - 4i$", feedback: "Both the sign and the conjugation went wrong." },
      ],
      hint: "Compare with $\\lvert z - c\\rvert^2 = z\\bar z - \\bar c z - c\\bar z + \\lvert c\\rvert^2$: the coefficient of $z$ is $-\\bar c$.",
    },
    {
      type: "quiz",
      id: "cq5-2-q5",
      variant: "practice",
      multiple: true,
      question: "Which points lie in the closed disc $\\lvert z - 1 - i\\rvert \\le 2$? Select all that apply.",
      options: [
        { text: "$2 + 2i$", correct: true, feedback: "Distance $\\lvert 1 + i\\rvert = \\sqrt2 < 2$." },
        { text: "$3 + i$", correct: true, feedback: "Distance exactly $2$: on the boundary, which the closed disc includes." },
        { text: "$-1 - i$", feedback: "Distance $\\lvert -2 - 2i\\rvert = 2\\sqrt2 > 2$." },
        { text: "$1 - i$", correct: true, feedback: "Distance $\\lvert -2i\\rvert = 2$: on the boundary." },
        { text: "$-1 + 2i$", feedback: "Distance $\\lvert -2 + i\\rvert = \\sqrt5 > 2$." },
      ],
      hint: "For each point compute its distance from the centre $1 + i$ and compare with 2. \"Closed\" includes the boundary.",
    },
    {
      type: "quiz",
      id: "cq5-2-q6",
      variant: "concept",
      question: "$\\frac{z - 2}{z - 2i}$ is purely imaginary. Where does $z$ lie?",
      options: [
        { text: "On the circle with centre $1 + i$ and radius $\\sqrt2$ (without $2$ and $2i$)", correct: true, feedback: "It is the circle on the diameter from $2$ to $2i$: centre at the midpoint, radius half of $\\lvert 2 - 2i\\rvert = 2\\sqrt2$." },
        { text: "On the line $y = x$", feedback: "That is where $z$ is equidistant from $2$ and $2i$, the perpendicular bisector." },
        { text: "On the line through $2$ and $2i$", feedback: "A **real** quotient gives that line. Purely imaginary means a right angle at $z$." },
        { text: "On the circle $\\lvert z\\rvert = 2$", feedback: "That circle passes through $2$ and $2i$ but does not have them as ends of a diameter." },
      ],
      hint: "Purely imaginary quotient means the arrows to $2$ and to $2i$ are perpendicular. Angle in a semicircle.",
    },
    {
      type: "numeric",
      id: "cq5-2-q7",
      variant: "practice",
      question: "The circles $\\lvert z\\rvert = 3$ and $\\lvert z - 4 - 3i\\rvert = r$ touch **externally**. Find $r$.",
      answer: 2,
      hint: "External touching: distance between centres $=$ sum of radii.",
      solution: "Distance between centres $\\lvert 4 + 3i\\rvert = 5 = 3 + r$, so $r = 2$.",
      commonMistakes: [
        { answer: 8, feedback: "$r = 8$ gives internal touching ($5 = 8 - 3$). External touching needs $5 = 3 + r$." },
        { answer: 5, feedback: "5 is the distance between the centres, not the radius." },
      ],
    },
    {
      type: "quiz",
      id: "cq5-2-q8",
      variant: "practice",
      question: "Describe the region $2 \\le \\lvert z + i\\rvert < 4$.",
      options: [
        { text: "A ring centred at $-i$, including the inner circle of radius 2 but not the outer circle of radius 4", correct: true, feedback: "$\\le$ keeps the inner boundary, $<$ drops the outer one." },
        { text: "A ring centred at $i$ with both boundary circles included", feedback: "The centre is $-i$ (rewrite $z + i = z - (-i)$), and the outer circle is excluded." },
        { text: "The disc of radius 4 centred at $-i$", feedback: "The points within 2 of $-i$ are excluded, which cuts a hole in the disc." },
        { text: "The region between the lines $\\mathrm{Im}\\,z = 2$ and $\\mathrm{Im}\\,z = 4$", feedback: "A modulus condition is about distance from a point, giving circles, not lines." },
      ],
      hint: "$\\lvert z + i\\rvert$ is the distance from $-i$. Treat each inequality separately.",
    },
    {
      type: "numeric",
      id: "cq5-2-q9",
      variant: "practice",
      question: "How many complex numbers $z = x + iy$ with $x$ and $y$ both integers satisfy $\\lvert z - 1\\rvert < 2$?",
      answer: 9,
      hint: "Write $(x - 1)^2 + y^2 < 4$ and list the integer values of $x - 1$ that can work.",
      solution: "With $u = x - 1$: $u^2 + y^2 < 4$. $u = 0$: $y^2 < 4$ gives $y = -1, 0, 1$. $u = \\pm 1$: $y^2 < 3$ gives $y = -1, 0, 1$ each. $u = \\pm 2$: $y^2 < 0$, none. Total $3 + 3 + 3 = 9$.",
      commonMistakes: [
        { answer: 13, feedback: "That counts the boundary points $1 \\pm 2$ and $1 \\pm 2i$. The inequality is strict." },
        { answer: 5, feedback: "You missed the points with $u = \\pm 1$ and $y = \\pm 1$, such as $2 + i$: $1 + 1 = 2 < 4$." },
      ],
    },
    {
      type: "quiz",
      id: "cq5-2-q10",
      variant: "practice",
      question: "JEE Main. If $\\lvert z\\rvert = 1$ and $z \\ne \\pm 1$, then $\\frac{z}{1 - z^2}$ lies on",
      options: [
        { text: "the imaginary axis", correct: true, feedback: "With $\\frac1z = \\bar z$: $\\frac{z}{1 - z^2} = \\frac{1}{\\frac1z - z} = \\frac{1}{\\bar z - z} = \\frac{1}{-2i\\,\\mathrm{Im}\\,z} = \\frac{i}{2\\,\\mathrm{Im}\\,z}$, purely imaginary." },
        { text: "the real axis", feedback: "Test $z = i$: $\\frac{i}{1 - (-1)} = \\frac{i}{2}$, not real." },
        { text: "the unit circle", feedback: "Test $z = i$: $\\lvert \\frac i2\\rvert = \\frac12 \\ne 1$." },
        { text: "the line $y = x$", feedback: "Test $z = i$: $\\frac{i}{2}$ has real part $0$ and imaginary part $\\frac12$." },
      ],
      hint: "On the unit circle $\\frac1z = \\bar z$. Divide top and bottom by $z$.",
    },
    {
      type: "quiz",
      id: "cq5-2-q11",
      variant: "practice",
      question: "JEE Advanced. $S$ is the set of $z$ with $\\lvert z - 2 + i\\rvert \\ge \\sqrt5$. The point $z_0 \\in S$ makes $\\frac{1}{\\lvert z_0 - 1\\rvert}$ as large as possible. What is the principal argument of $\\frac{4 - z_0 - \\bar z_0}{z_0 - \\bar z_0 + 2i}$?",
      options: [
        { text: "$-\\frac{\\pi}{2}$", correct: true, feedback: "$z_0$ is the point of $S$ nearest $1$: on the circle, along the ray from the centre $2 - i$ through $1$. Then $4 - 2\\,\\mathrm{Re}\\,z_0$ and $2(\\mathrm{Im}\\,z_0 + 1)$ are the same positive number $\\sqrt{10}$, so the quotient is $\\frac{\\sqrt{10}}{i\\sqrt{10}} = -i$." },
        { text: "$\\frac{\\pi}{2}$", feedback: "The denominator is $2i(\\mathrm{Im}\\,z_0 + 1)$ with a positive bracket. Dividing a positive real by a positive multiple of $i$ gives a negative multiple of $i$." },
        { text: "$\\frac{\\pi}{4}$", feedback: "The numerator is real and the denominator purely imaginary, so the quotient is purely imaginary: its argument is $\\pm\\frac\\pi2$." },
        { text: "$\\frac{3\\pi}{4}$", feedback: "A real divided by a purely imaginary number is purely imaginary, so the argument must be $\\pm\\frac\\pi2$." },
      ],
      hint: "$S$ is the outside of a circle and $1$ is inside it, so the nearest point of $S$ to $1$ lies on the circle along the ray from the centre through $1$. Then note $4 - z_0 - \\bar z_0$ is real and $z_0 - \\bar z_0 + 2i$ is purely imaginary.",
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "loci-from-distances",
  title: "5.3 · Loci from Distances",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "A **locus** is the set of points that obey a rule. When the rule is about distances to two fixed points $a$ and $b$, each natural question gives a famous curve. Equal distances give a line. A fixed **sum** gives an ellipse, a fixed **difference** a hyperbola, and a fixed **ratio** a circle. All four are one-line equations in $z$.",
    },
    { type: "heading", text: "Equal distances: the perpendicular bisector" },
    {
      type: "math",
      latex: "\\lvert z - a\\rvert = \\lvert z - b\\rvert",
    },
    {
      type: "text",
      content:
        "is the set of points equidistant from $a$ and $b$: the perpendicular bisector of the segment $ab$. Squaring with $\\lvert w\\rvert^2 = w\\bar w$ and cancelling $z\\bar z$ confirms it is a line of the form from Lesson 5.1:",
    },
    {
      type: "math",
      latex: "(\\bar b - \\bar a)z + (b - a)\\bar z + \\lvert a\\rvert^2 - \\lvert b\\rvert^2 = 0",
    },
    {
      type: "interactive",
      config: {
        component: "cq-locus-explorer",
        locus: "bisector",
        a: [-2, -1],
        b: [1, 2],
        p: [2, -1],
        draggable: ["a", "b", "p"],
        caption:
          "Drag $a$ and $b$: the line always passes through their midpoint at right angles to $ab$. Drag $P$ and the readout reports which point it is nearer.",
      },
    },
    {
      type: "worked-example",
      id: "cq5-3-we1",
      title: "Worked example 1: a bisector in Cartesian form",
      problem: "Find the locus $\\lvert z - 1\\rvert = \\lvert z + i\\rvert$.",
      steps: [
        { text: "Put $z = x + iy$ and square both sides: $(x - 1)^2 + y^2 = x^2 + (y + 1)^2$." },
        { text: "Cancel $x^2$ and $y^2$: $-2x + 1 = 2y + 1$." },
        { latex: "y = -x" },
        { text: "Check: the midpoint of $1$ and $-i$ is $\\frac{1 - i}{2}$, which lies on $y = -x$, and the line $y = -x$ is perpendicular to the segment from $1$ to $-i$ (slope $1$)." },
      ],
      answer: "The line $x + y = 0$, the perpendicular bisector of $1$ and $-i$.",
    },
    { type: "heading", text: "A fixed sum: the ellipse" },
    {
      type: "text",
      content:
        "Pin a loop of string at $a$ and $b$ and pull it tight with a pencil: the pencil keeps $\\lvert z - a\\rvert + \\lvert z - b\\rvert$ constant and draws an ellipse with **foci** $a$ and $b$. The triangle inequality says the sum is at least $\\lvert a - b\\rvert$, which decides what happens:",
    },
    {
      type: "callout",
      variant: "definition",
      title: "|z − a| + |z − b| = k",
      content:
        "- $k > \\lvert a - b\\rvert$: an ellipse with foci $a, b$, centre $\\frac{a + b}{2}$, semi-major axis $\\frac k2$, semi-minor axis $\\sqrt{\\frac{k^2}{4} - \\frac{\\lvert a - b\\rvert^2}{4}}$, eccentricity $\\frac{\\lvert a - b\\rvert}{k}$\n- $k = \\lvert a - b\\rvert$: the segment $ab$ itself\n- $k < \\lvert a - b\\rvert$: no points at all",
    },
    {
      type: "interactive",
      config: {
        component: "cq-locus-explorer",
        locus: "ellipse",
        a: [-2, 0],
        b: [2, 0],
        k: { min: 3, max: 8, step: 0.5, initial: 6 },
        p: [0, 2],
        draggable: ["a", "b", "p"],
        caption:
          "Shrink $k$ towards $\\lvert a - b\\rvert = 4$ and the ellipse flattens onto the segment. Below 4 it disappears: no point can be closer to $a$ and $b$ combined than they are to each other.",
      },
    },
    {
      type: "worked-example",
      id: "cq5-3-we2",
      title: "Worked example 2: identify the ellipse",
      problem: "Describe the locus $\\lvert z - 3\\rvert + \\lvert z + 3\\rvert = 10$.",
      steps: [
        { text: "Foci $\\pm 3$, so $\\lvert a - b\\rvert = 6 < 10$: a genuine ellipse, centre $0$." },
        { text: "Semi-major axis $A = \\frac{10}{2} = 5$, focal distance $c = 3$, semi-minor axis $B = \\sqrt{A^2 - c^2} = 4$." },
        { latex: "\\frac{x^2}{25} + \\frac{y^2}{16} = 1, \\qquad e = \\frac{c}{A} = \\frac35" },
      ],
      answer: "The ellipse $\\frac{x^2}{25} + \\frac{y^2}{16} = 1$ with eccentricity $\\frac35$.",
    },
    {
      type: "worked-example",
      id: "cq5-3-we3",
      title: "Worked example 3: the degenerate case",
      problem: "Describe the locus $\\lvert z - 2i\\rvert + \\lvert z + 2i\\rvert = 4$.",
      steps: [
        { text: "Here $\\lvert a - b\\rvert = \\lvert 4i\\rvert = 4 = k$." },
        { text: "Equality in the triangle inequality $\\lvert z - 2i\\rvert + \\lvert z + 2i\\rvert \\ge \\lvert 4i\\rvert$ holds only when $z$ lies **between** $2i$ and $-2i$ on the segment. *Why this step:* any point off the segment makes a genuine triangle, whose two sides beat the third." },
      ],
      answer: "The segment of the imaginary axis from $-2i$ to $2i$, not an ellipse.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"|z − 1| + |z + 1| = 2 is an ellipse\"",
      content:
        "It looks like the ellipse pattern, but $k = 2$ equals $\\lvert 1 - (-1)\\rvert$. The locus is the segment $[-1, 1]$ on the real axis. Always compare $k$ with the distance between the foci before naming the curve. With $k < 2$ there would be no points at all.",
    },
    { type: "heading", text: "A fixed difference: the hyperbola" },
    {
      type: "text",
      content:
        "$\\lvert z - a\\rvert - \\lvert z - b\\rvert = k$ with $0 < k < \\lvert a - b\\rvert$ is **one branch** of a hyperbola with foci $a$ and $b$: the branch nearer $b$ (those points are farther from $a$). A negative $k$ gives the other branch, and $\\big\\lvert\\lvert z - a\\rvert - \\lvert z - b\\rvert\\big\\rvert = k$ gives both. If $\\lvert k\\rvert = \\lvert a - b\\rvert$ the locus is a ray along the line $ab$, and larger $\\lvert k\\rvert$ gives nothing.",
    },
    {
      type: "interactive",
      config: {
        component: "cq-locus-explorer",
        locus: "hyperbola",
        a: [-2, 0],
        b: [2, 0],
        p: [2, 1],
        caption:
          "Slide $k$ through $0$: the branch swaps sides, passing through the bisector at $k = 0$. Push $\\lvert k\\rvert$ towards $4 = \\lvert a - b\\rvert$ and the branch closes up onto a ray.",
      },
    },
    {
      type: "worked-example",
      id: "cq5-3-we4",
      title: "Worked example 4: which branch?",
      problem: "Describe the locus $\\lvert z - 2\\rvert - \\lvert z + 2\\rvert = 2$.",
      steps: [
        { text: "Foci $\\pm 2$, $\\lvert a - b\\rvert = 4 > 2$, so a hyperbola branch. Centre $0$, $A = \\frac k2 = 1$, $c = 2$, $B^2 = c^2 - A^2 = 3$." },
        { latex: "x^2 - \\frac{y^2}{3} = 1" },
        { text: "Which branch: $\\lvert z - 2\\rvert > \\lvert z + 2\\rvert$, so $z$ is nearer $-2$. *Why this step:* the equation only fixes the difference with a sign, which picks one branch." },
      ],
      answer: "The left branch ($x \\le -1$) of $x^2 - \\frac{y^2}{3} = 1$.",
    },
    { type: "heading", text: "A fixed ratio: the circle of Apollonius" },
    {
      type: "text",
      content:
        "Now ask for points twice as far from $a$ as from $b$: $\\lvert z - a\\rvert = k\\lvert z - b\\rvert$. With $k = 1$ this is the bisector again. For any other positive $k$ the answer is a circle, discovered by Apollonius of Perga around 200 BC. Square and expand:",
    },
    {
      type: "math",
      latex: "(1 - k^2)z\\bar z - (\\bar a - k^2\\bar b)z - (a - k^2 b)\\bar z + \\lvert a\\rvert^2 - k^2\\lvert b\\rvert^2 = 0",
    },
    {
      type: "text",
      content:
        "Divide by $1 - k^2$ and compare with the general circle: the centre is $\\frac{a - k^2 b}{1 - k^2}$, and simplifying $\\sqrt{\\lvert\\alpha\\rvert^2 - k'}$ gives a tidy radius.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Apollonius circle",
      content:
        "$\\lvert z - a\\rvert = k\\lvert z - b\\rvert$ with $k > 0$, $k \\ne 1$, is the circle with\n\n- centre $\\dfrac{a - k^2 b}{1 - k^2}$ (on the line $ab$, outside the segment)\n- radius $\\dfrac{k\\lvert a - b\\rvert}{\\lvert 1 - k^2\\rvert}$\n\nFor $k > 1$ the circle surrounds $b$, for $k < 1$ it surrounds $a$.",
    },
    {
      type: "interactive",
      config: {
        component: "cq-locus-explorer",
        locus: "apollonius",
        a: [1, 0],
        b: [-1, 0],
        p: [-1, 1],
        draggable: ["a", "b", "p"],
        caption:
          "At $k = 2$ every point of the circle is twice as far from $a$ as from $b$. Slide $k$ towards 1 and the circle balloons into the bisector, then reappears on the other side.",
      },
    },
    {
      type: "worked-example",
      id: "cq5-3-we5",
      title: "Worked example 5: an Apollonius circle",
      problem: "Find the centre and radius of $\\lvert z - 1\\rvert = 2\\lvert z + 1\\rvert$.",
      steps: [
        { text: "$a = 1$, $b = -1$, $k = 2$. Centre $\\frac{a - k^2 b}{1 - k^2} = \\frac{1 + 4}{1 - 4} = -\\frac53$." },
        { text: "Radius $\\frac{k\\lvert a - b\\rvert}{\\lvert 1 - k^2\\rvert} = \\frac{2 \\cdot 2}{3} = \\frac43$." },
        { text: "Check in Cartesian form: $(x - 1)^2 + y^2 = 4\\big((x + 1)^2 + y^2\\big)$ gives $3x^2 + 3y^2 + 10x + 3 = 0$, i.e. $x^2 + y^2 + \\frac{10}{3}x + 1 = 0$: centre $-\\frac53$, radius$^2 = \\frac{25}{9} - 1 = \\frac{16}{9}$." },
      ],
      answer: "Centre $-\\frac53$, radius $\\frac43$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "cq5-3-q1",
      variant: "practice",
      question: "The locus $\\lvert z - 2\\rvert = \\lvert z - 2i\\rvert$ is",
      options: [
        { text: "the line $y = x$", correct: true, feedback: "The perpendicular bisector of $(2, 0)$ and $(0, 2)$ passes through $(1, 1)$ with slope 1." },
        { text: "the line $y = -x$", feedback: "That line is parallel to the segment from $2$ to $2i$, not perpendicular to it." },
        { text: "the line $x + y = 2$", feedback: "That is the line **through** $2$ and $2i$." },
        { text: "the circle with centre $1 + i$", feedback: "Equal distances from two points give a line, not a circle." },
      ],
      hint: "Equal distances from two points: the perpendicular bisector. Find the midpoint and the direction.",
    },
    {
      type: "numeric",
      id: "cq5-3-q2",
      variant: "practice",
      question: "Find the length of the minor axis of the ellipse $\\lvert z - 4\\rvert + \\lvert z + 4\\rvert = 10$.",
      answer: 6,
      hint: "Semi-major $A = \\frac k2$, focal distance $c$ is half the distance between the foci, semi-minor $B = \\sqrt{A^2 - c^2}$.",
      solution: "$A = 5$, $c = 4$, $B = \\sqrt{25 - 16} = 3$. The minor axis is $2B = 6$.",
      commonMistakes: [
        { answer: 3, feedback: "That is the semi-minor axis. The minor axis is twice it." },
        { answer: 10, feedback: "That is the major axis, $2A = k$." },
        { answer: 8, feedback: "That is the distance between the foci." },
      ],
    },
    {
      type: "numeric",
      id: "cq5-3-q3",
      variant: "practice",
      question: "Find the eccentricity of the ellipse $\\lvert z - 1 - i\\rvert + \\lvert z + 1 + i\\rvert = 4$. Give your answer to two decimal places.",
      answer: 0.7071,
      tolerance: 0.01,
      hint: "$e = \\frac{\\text{distance between foci}}{k}$.",
      solution: "The foci are $\\pm(1 + i)$, distance $\\lvert 2 + 2i\\rvert = 2\\sqrt2$. So $e = \\frac{2\\sqrt2}{4} = \\frac{1}{\\sqrt2} \\approx 0.71$.",
      commonMistakes: [
        { answer: 0.5, feedback: "You took the foci to be 2 apart. The distance between $1 + i$ and $-1 - i$ is $\\lvert 2 + 2i\\rvert = 2\\sqrt2$." },
        { answer: 1.4142, tolerance: 0.01, feedback: "You divided by $A = 2$ instead of $2A = 4$. An ellipse has $e < 1$." },
      ],
    },
    {
      type: "quiz",
      id: "cq5-3-q4",
      variant: "concept",
      multiple: true,
      question: "Which of these loci are circles? Select all that apply.",
      options: [
        { text: "$\\lvert z - 1\\rvert = 3\\lvert z + 1\\rvert$", correct: true, feedback: "A fixed ratio $k = 3 \\ne 1$: an Apollonius circle." },
        { text: "$\\lvert z - 1\\rvert = \\lvert z + 1\\rvert$", feedback: "Ratio $1$: the perpendicular bisector, the imaginary axis." },
        { text: "$\\lvert z + 2i\\rvert = 5$", correct: true, feedback: "Centre $-2i$, radius 5." },
        { text: "$\\lvert z - 1\\rvert + \\lvert z + 1\\rvert = 3$", feedback: "A fixed sum bigger than $2$: an ellipse." },
        { text: "$z\\bar z + (1 + i)z + (1 - i)\\bar z + 1 = 0$", correct: true, feedback: "$\\alpha = 1 - i$, $\\lvert\\alpha\\rvert^2 - k = 2 - 1 = 1 > 0$: a circle of radius 1 about $-1 + i$." },
      ],
      hint: "Fixed distance from one point, or fixed ratio $\\ne 1$ of distances, or a general-circle equation with $\\lvert\\alpha\\rvert^2 > k$.",
    },
    {
      type: "quiz",
      id: "cq5-3-q5",
      variant: "concept",
      question: "The locus $\\lvert z - 1\\rvert + \\lvert z + 1\\rvert = 2$ is",
      options: [
        { text: "the segment from $-1$ to $1$", correct: true, feedback: "$k$ equals the distance between the foci, so only points between them work." },
        { text: "an ellipse with foci $\\pm 1$", feedback: "An ellipse needs $k > \\lvert a - b\\rvert = 2$. Here $k = 2$ exactly." },
        { text: "empty", feedback: "Empty needs $k < 2$. Every point of the segment, such as $z = 0$, works." },
        { text: "the unit circle", feedback: "Test $z = i$: $\\lvert i - 1\\rvert + \\lvert i + 1\\rvert = 2\\sqrt2 \\ne 2$." },
      ],
      hint: "Compare $k$ with $\\lvert a - b\\rvert$ and remember when the triangle inequality is an equality.",
    },
    {
      type: "numeric",
      id: "cq5-3-q6",
      variant: "practice",
      question: "Find the radius of the circle $\\lvert z + 3\\rvert = 2\\lvert z\\rvert$.",
      answer: 2,
      hint: "Apollonius with $a = -3$, $b = 0$, $k = 2$: radius $\\frac{k\\lvert a - b\\rvert}{\\lvert 1 - k^2\\rvert}$.",
      solution: "$\\frac{2 \\cdot 3}{\\lvert 1 - 4\\rvert} = 2$. Check: $(x + 3)^2 + y^2 = 4(x^2 + y^2)$ gives $x^2 + y^2 - 2x - 3 = 0$, centre $1$, radius $\\sqrt{1 + 3} = 2$.",
      commonMistakes: [
        { answer: 6, feedback: "You forgot to divide by $\\lvert 1 - k^2\\rvert = 3$." },
        { answer: 3, feedback: "3 is the distance between $a$ and $b$, not the radius." },
      ],
    },
    {
      type: "quiz",
      id: "cq5-3-q7",
      variant: "practice",
      question: "What is the centre of the circle $\\lvert z + 3\\rvert = 2\\lvert z\\rvert$?",
      options: [
        { text: "$1$", correct: true, feedback: "$\\frac{a - k^2 b}{1 - k^2} = \\frac{-3 - 0}{-3} = 1$." },
        { text: "$-1$", feedback: "Sign slip: $\\frac{-3}{1 - 4} = +1$." },
        { text: "$-3$", feedback: "$-3$ is the point $a$. The Apollonius centre lies outside the segment $ab$." },
        { text: "$-\\frac32$", feedback: "That is the midpoint of $a$ and $b$, where the $k = 1$ bisector crosses the line $ab$." },
      ],
      hint: "Centre $= \\frac{a - k^2 b}{1 - k^2}$ with $a = -3$, $b = 0$, $k = 2$.",
    },
    {
      type: "quiz",
      id: "cq5-3-q8",
      variant: "practice",
      question: "The locus $\\lvert z - 4\\rvert - \\lvert z + 4\\rvert = 6$ is",
      options: [
        { text: "the left branch of $\\frac{x^2}{9} - \\frac{y^2}{7} = 1$", correct: true, feedback: "$A = 3$, $c = 4$, $B^2 = 7$, and $\\lvert z - 4\\rvert > \\lvert z + 4\\rvert$ puts $z$ nearer $-4$, on the left." },
        { text: "the right branch of $\\frac{x^2}{9} - \\frac{y^2}{7} = 1$", feedback: "On the right branch $z$ is nearer $4$, so $\\lvert z - 4\\rvert - \\lvert z + 4\\rvert$ is negative." },
        { text: "both branches of $\\frac{x^2}{9} - \\frac{y^2}{7} = 1$", feedback: "Both branches need $\\big\\lvert \\lvert z - 4\\rvert - \\lvert z + 4\\rvert\\big\\rvert = 6$. A signed difference picks one." },
        { text: "the ellipse $\\frac{x^2}{9} + \\frac{y^2}{7} = 1$", feedback: "A difference of distances gives a hyperbola, a sum gives an ellipse." },
      ],
      hint: "A fixed difference $0 < k < \\lvert a - b\\rvert$ gives one branch. Which focus are the points nearer?",
    },
    {
      type: "numeric",
      id: "cq5-3-q9",
      variant: "practice",
      question: "Find the least **integer** $k$ for which $\\lvert z - 3i\\rvert + \\lvert z + 3i\\rvert = k$ is a genuine ellipse (not a segment, not empty).",
      answer: 7,
      hint: "An ellipse needs $k$ strictly greater than the distance between the foci.",
      solution: "The foci are $6$ apart, so the locus is an ellipse exactly when $k > 6$. The least integer is $7$.",
      commonMistakes: [
        { answer: 6, feedback: "$k = 6$ gives the segment from $-3i$ to $3i$, not an ellipse." },
        { answer: 4, feedback: "With $k < 6$ the locus is empty." },
      ],
    },
    {
      type: "quiz",
      id: "cq5-3-q10",
      variant: "practice",
      question: "JEE Main. How many complex numbers satisfy $\\lvert z - 1\\rvert = \\lvert z + 1\\rvert = \\lvert z - i\\rvert$?",
      options: [
        { text: "Exactly one, $z = 0$", correct: true, feedback: "The bisector of $\\pm 1$ is the imaginary axis, the bisector of $-1$ and $i$ is $y = -x$, and they meet only at $0$, the circumcentre of the triangle $1, -1, i$." },
        { text: "None", feedback: "$z = 0$ is at distance 1 from all three points." },
        { text: "Exactly two", feedback: "Two different lines meet at one point." },
        { text: "Infinitely many", feedback: "That would need the two bisectors to coincide, which cannot happen for three distinct points that form a triangle." },
      ],
      hint: "Each equality is a perpendicular bisector. Where do two of them meet?",
    },
    {
      type: "quiz",
      id: "cq5-3-q11",
      variant: "practice",
      multiple: true,
      question: "JEE Advanced. Let $S = \\{z : \\lvert z - 2\\rvert = 2\\lvert z - 1\\rvert\\}$. Which statements are true? Select all that apply.",
      options: [
        { text: "$S$ is a circle with centre $\\frac23$ and radius $\\frac23$", correct: true, feedback: "Centre $\\frac{2 - 4\\cdot 1}{1 - 4} = \\frac23$, radius $\\frac{2\\cdot 1}{3} = \\frac23$." },
        { text: "$0 \\in S$", correct: true, feedback: "$\\lvert -2\\rvert = 2 = 2\\lvert -1\\rvert$." },
        { text: "$\\lvert z\\rvert \\le \\frac43$ for every $z \\in S$", correct: true, feedback: "The circle runs from $0$ to $\\frac43$ along the real axis, and $\\frac43$ is its farthest point from the origin." },
        { text: "$1 + i \\in S$", feedback: "$\\lvert -1 + i\\rvert = \\sqrt2$ but $2\\lvert i\\rvert = 2$." },
        { text: "$S$ is the perpendicular bisector of $1$ and $2$", feedback: "That would need ratio $1$. Here $k = 2$." },
      ],
      hint: "Apollonius with $a = 2$, $b = 1$, $k = 2$. Compute the centre and radius, then test each statement.",
    },
    {
      type: "numeric",
      id: "cq5-3-q12",
      variant: "practice",
      question: "JEE Main. Find the area enclosed by the curve $\\lvert z - 1\\rvert + \\lvert z + 1\\rvert = 4$. Give your answer to two decimal places.",
      answer: 10.8828,
      tolerance: 0.02,
      hint: "An ellipse with semi-axes $A$ and $B$ encloses area $\\pi AB$.",
      solution: "$A = 2$, $c = 1$, $B = \\sqrt{4 - 1} = \\sqrt3$. Area $= \\pi \\cdot 2 \\cdot \\sqrt3 = 2\\sqrt3\\pi \\approx 10.88$.",
      commonMistakes: [
        { answer: 12.566, tolerance: 0.02, feedback: "That is $4\\pi$, the area of a circle of radius 2. The ellipse is squashed: $B = \\sqrt3$." },
        { answer: 43.531, tolerance: 0.05, feedback: "You used the full axes $4$ and $2\\sqrt3$. The area is $\\pi$ times the **semi**-axes." },
      ],
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "loci-from-arguments",
  title: "5.4 · Loci from Arguments",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "Distance conditions give circles and conics. **Angle** conditions give rays and arcs. The key fact from Chapter 3: $\\arg(z - a)$ is the direction of the arrow from $a$ to $z$, and dividing two arrows subtracts their directions.",
    },
    { type: "heading", text: "Rays: arg(z − a) = θ" },
    {
      type: "text",
      content:
        "$\\arg(z - a) = \\theta$ says the arrow from $a$ to $z$ points in direction $\\theta$. The locus is the **ray** (half-line) leaving $a$ at angle $\\theta$, without the point $a$ itself, since $\\arg 0$ is undefined. It is not the whole line: the opposite half has argument $\\theta \\pm \\pi$.",
    },
    {
      type: "worked-example",
      id: "cq5-4-we1",
      title: "Worked example 1: a ray",
      problem: "Describe the locus $\\arg(z - 1 - i) = \\frac{\\pi}{4}$.",
      steps: [
        { text: "The arrow from $1 + i$ to $z$ points at $45^\\circ$: $z - (1 + i) = t(1 + i)$ with $t > 0$." },
        { text: "So $z = (1 + t) + (1 + t)i$: points on $y = x$ with $x > 1$. *Why this step:* $t > 0$ keeps only the half-line in the direction $45^\\circ$, not the backwards half." },
      ],
      answer: "The ray $y = x$, $x > 1$ (starting point $1 + i$ excluded).",
    },
    { type: "heading", text: "Arcs: arg((z − a)/(z − b)) = θ" },
    {
      type: "text",
      content:
        "Now take two fixed points. $\\arg\\frac{z - a}{z - b} = \\arg(z - a) - \\arg(z - b)$ is the angle you turn through going **from** the arrow $z - b$ **to** the arrow $z - a$, the angle that the segment $ab$ subtends at $z$. By the angles-in-the-same-segment theorem, the points where a chord subtends a fixed angle form an **arc** of a circle through $a$ and $b$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The arc locus",
      content:
        "For $0 < \\theta < \\pi$, $\\arg\\dfrac{z - a}{z - b} = \\theta$ is an arc of a circle through $a$ and $b$ (endpoints excluded):\n\n- the circle has radius $\\dfrac{\\lvert a - b\\rvert}{2\\sin\\theta}$\n- the arc lies on the **left** of the directed segment from $b$ to $a$\n- it is the major arc when $\\theta < \\frac\\pi2$, a semicircle when $\\theta = \\frac\\pi2$, the minor arc when $\\theta > \\frac\\pi2$\n\nA negative $\\theta$ gives the matching arc on the right of $b \\to a$.",
    },
    {
      type: "interactive",
      config: {
        component: "cq-locus-explorer",
        locus: "arc",
        a: [1, 0],
        b: [-1, 0],
        theta: { min: 15, max: 165, step: 15, initial: 90 },
        p: [0, 1],
        draggable: ["a", "b", "p"],
        caption:
          "At $\\theta = 90^\\circ$ the arc is the upper semicircle on the diameter from $-1$ to $1$, and $P = i$ sits on it. Lower $\\theta$: the arc grows into a major arc. Raise it: the arc shrinks towards the segment.",
      },
    },
    {
      type: "worked-example",
      id: "cq5-4-we2",
      title: "Worked example 2: a semicircle",
      problem: "Find the locus $\\arg\\frac{z - 1}{z + 1} = \\frac{\\pi}{2}$.",
      steps: [
        { text: "A right angle at $z$ between the arrows to $1$ and to $-1$: $z$ lies on the circle with diameter from $-1$ to $1$, that is $\\lvert z\\rvert = 1$." },
        { text: "Pick the half. Test $z = i$: $\\frac{i - 1}{i + 1} = i$, argument $+\\frac\\pi2$. Test $z = -i$: $\\frac{-i - 1}{-i + 1} = -i$, argument $-\\frac\\pi2$. *Why this step:* the argument condition is one-sided, so always test a point." },
        { text: "This matches the rule: from $b = -1$ to $a = 1$ is rightwards, and the left side is the upper half-plane." },
      ],
      answer: "The upper semicircle $\\lvert z\\rvert = 1$, $\\mathrm{Im}\\,z > 0$.",
    },
    {
      type: "worked-example",
      id: "cq5-4-we3",
      title: "Worked example 3: a major arc",
      problem: "Find the locus $\\arg\\frac{z - 2}{z + 2} = \\frac{\\pi}{4}$.",
      steps: [
        { text: "Radius $\\frac{\\lvert a - b\\rvert}{2\\sin\\theta} = \\frac{4}{2 \\cdot \\frac{\\sqrt2}{2}} = 2\\sqrt2$." },
        { text: "The centre is on the perpendicular bisector (the imaginary axis) at distance $\\sqrt{R^2 - 2^2} = 2$ from the midpoint $0$, on the same side as the arc because $\\theta < \\frac\\pi2$ makes it a major arc. The arc is on the left of $-2 \\to 2$, the upper side. So the centre is $2i$." },
        { latex: "\\lvert z - 2i\\rvert = 2\\sqrt2 \\iff x^2 + y^2 - 4y - 4 = 0" },
        { text: "Keep the part above the real axis ($y > 0$). The part below satisfies $\\arg\\frac{z - 2}{z + 2} = -\\frac{3\\pi}{4}$ instead." },
      ],
      answer: "The arc of $x^2 + y^2 - 4y - 4 = 0$ with $y > 0$.",
    },
    { type: "heading", text: "Real and purely imaginary quotients" },
    {
      type: "text",
      content:
        "Two special angle conditions do not fix the sign of the angle, so they give whole curves:\n\n- $\\frac{z - a}{z - b}$ **real**: angle $0$ or $\\pi$, so $z$ is on the line $ab$ (with $z \\ne b$)\n- $\\frac{z - a}{z - b}$ **purely imaginary**: angle $\\pm\\frac\\pi2$, so $z$ is on the full circle with diameter $ab$ (without $a$ and $b$)",
    },
    {
      type: "worked-example",
      id: "cq5-4-we4",
      title: "Worked example 4: a real quotient",
      problem: "Find the locus of $z$ for which $\\frac{z - 2i}{z + 2}$ is real.",
      steps: [
        { text: "Real quotient: $z$, $2i$ and $-2$ are collinear." },
        { text: "The line through $(0, 2)$ and $(-2, 0)$ is $y = x + 2$." },
        { text: "Exclude $z = -2$, where the quotient is undefined. ($z = 2i$ gives $0$, which is real, so it stays.)" },
      ],
      answer: "The line $y = x + 2$ without the point $-2$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"arg((z − a)/(z − b)) = θ is the whole circle\"",
      content:
        "The chord $ab$ splits its circle into two arcs, and on the other arc the angle is $\\theta - \\pi$, not $\\theta$. The argument condition picks **one** arc. Only the sign-free conditions (\"real\", \"purely imaginary\", $\\lvert\\arg\\rvert = \\theta$) give both. When unsure, test one convenient point, as in Worked example 2.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "cq5-4-q1",
      variant: "practice",
      question: "The locus $\\arg(z + 2) = \\frac{\\pi}{3}$ is",
      options: [
        { text: "the ray from $-2$ making $60^\\circ$ with the positive real axis, without $-2$", correct: true, feedback: "The arrow from $-2$ to $z$ has direction $60^\\circ$." },
        { text: "the full line through $-2$ at $60^\\circ$", feedback: "The backward half has argument $60^\\circ - 180^\\circ = -120^\\circ$." },
        { text: "the ray from $2$ at $60^\\circ$", feedback: "$z + 2 = z - (-2)$: the ray starts at $-2$." },
        { text: "a circle through $-2$", feedback: "A single argument condition fixes a direction from one point: a ray." },
      ],
      hint: "$\\arg(z - a) = \\theta$ is a ray from $a$. What is $a$ here?",
    },
    {
      type: "quiz",
      id: "cq5-4-q2",
      variant: "practice",
      question: "The locus $\\arg\\frac{z - 1}{z + 1} = -\\frac{\\pi}{2}$ is",
      options: [
        { text: "the lower semicircle $\\lvert z\\rvert = 1$, $\\mathrm{Im}\\,z < 0$", correct: true, feedback: "Test $z = -i$: $\\frac{-1 - i}{1 - i} = -i$, argument $-\\frac\\pi2$." },
        { text: "the upper semicircle $\\lvert z\\rvert = 1$, $\\mathrm{Im}\\,z > 0$", feedback: "At $z = i$ the quotient is $i$, argument $+\\frac\\pi2$, so the upper half belongs to $+\\frac\\pi2$." },
        { text: "the whole circle $\\lvert z\\rvert = 1$ without $\\pm 1$", feedback: "That needs the quotient to be purely imaginary with either sign." },
        { text: "the imaginary axis", feedback: "The imaginary axis is $\\lvert z - 1\\rvert = \\lvert z + 1\\rvert$, a distance condition." },
      ],
      hint: "Right angle at $z$ means the circle on the diameter $[-1, 1]$. Test $z = i$ and $z = -i$ to pick the half.",
    },
    {
      type: "quiz",
      id: "cq5-4-q3",
      variant: "concept",
      multiple: true,
      question: "Let $S$ be the set of $z$ for which $\\frac{z - 2}{z + 2}$ is purely imaginary and nonzero. Which statements are true? Select all that apply.",
      options: [
        { text: "$2i \\in S$", correct: true, feedback: "$\\frac{2i - 2}{2i + 2} = i$." },
        { text: "Every point of $S$ satisfies $\\lvert z\\rvert = 2$", correct: true, feedback: "$S$ is the circle with diameter from $-2$ to $2$." },
        { text: "$-2 \\in S$", feedback: "At $z = -2$ the quotient is undefined." },
        { text: "$S$ is the perpendicular bisector of $2$ and $-2$", feedback: "That is the distance condition $\\lvert z - 2\\rvert = \\lvert z + 2\\rvert$." },
        { text: "$1 + \\sqrt3 i \\in S$", correct: true, feedback: "$\\lvert 1 + \\sqrt3 i\\rvert = 2$ and it is not $\\pm 2$." },
      ],
      hint: "Purely imaginary quotient: right angle at $z$, so $z$ is on the circle with diameter from $-2$ to $2$.",
    },
    {
      type: "numeric",
      id: "cq5-4-q4",
      variant: "practice",
      question: "The locus $\\arg\\frac{z - 3}{z + 3} = \\frac{\\pi}{6}$ is an arc of a circle. Find its radius.",
      answer: 6,
      hint: "Radius $= \\frac{\\lvert a - b\\rvert}{2\\sin\\theta}$ (inscribed angle theorem: chord $= 2R\\sin\\theta$).",
      solution: "$\\lvert a - b\\rvert = 6$ and $\\sin\\frac\\pi6 = \\frac12$, so $R = \\frac{6}{2 \\cdot \\frac12} = 6$.",
      commonMistakes: [
        { answer: 3, feedback: "3 is half the chord. A small angle like $30^\\circ$ needs a big circle: $R = \\frac{6}{2\\sin 30^\\circ}$." },
        { answer: 5.196, tolerance: 0.01, feedback: "That uses $\\cos 30^\\circ$ or $\\tan$. The chord formula is $2R\\sin\\theta$." },
      ],
    },
    {
      type: "numeric",
      id: "cq5-4-q5",
      variant: "practice",
      question: "The locus $\\arg\\frac{z - 2}{z + 2} = \\frac{\\pi}{4}$ is an arc of a circle whose centre is $ci$ on the imaginary axis. Find $c$.",
      answer: 2,
      hint: "Radius $2\\sqrt2$, half-chord $2$. Which side of the real axis is the arc on, and is it a major or minor arc?",
      solution: "$R = \\frac{4}{2\\sin 45^\\circ} = 2\\sqrt2$, so the centre is $\\sqrt{8 - 4} = 2$ from the midpoint $0$. The arc is on the left of $-2 \\to 2$ (upper side), and $\\theta < \\frac\\pi2$ makes it a major arc, so the centre is on the same side: $c = 2$.",
      commonMistakes: [
        { answer: -2, feedback: "Centre $-2i$ carries the arc with $\\theta = -\\frac\\pi4$ (the mirror image). Test a point: the top of the circle about $2i$ gives argument $+\\frac\\pi4$." },
        { answer: 2.8284, tolerance: 0.01, feedback: "That is the radius $2\\sqrt2$, not the centre's distance from the chord." },
      ],
    },
    {
      type: "quiz",
      id: "cq5-4-q6",
      variant: "concept",
      question: "For $0 < \\theta < \\frac\\pi2$, the locus $\\arg\\frac{z - a}{z - b} = \\theta$ is",
      options: [
        { text: "a major arc of a circle through $a$ and $b$", correct: true, feedback: "Small inscribed angles come from far away: the larger arc." },
        { text: "a minor arc of a circle through $a$ and $b$", feedback: "Minor arcs see the chord at an obtuse angle, $\\theta > \\frac\\pi2$." },
        { text: "a semicircle", feedback: "That is the case $\\theta = \\frac\\pi2$ exactly." },
        { text: "a ray from $a$", feedback: "A ray comes from a single-point condition $\\arg(z - a) = \\theta$." },
      ],
      hint: "Inscribed angle on the major arc is less than $90^\\circ$, on the minor arc more.",
    },
    {
      type: "quiz",
      id: "cq5-4-q7",
      variant: "practice",
      question: "$\\frac{z - i}{z - 1}$ is real. Then $z$ lies on",
      options: [
        { text: "the line $x + y = 1$, with $z \\ne 1$", correct: true, feedback: "Real quotient: $z$, $i$ and $1$ are collinear, and $z = 1$ makes the quotient undefined." },
        { text: "the line $y = x$", feedback: "That is the perpendicular bisector of $1$ and $i$: equal distances, not collinearity." },
        { text: "the circle with diameter from $1$ to $i$", feedback: "That comes from a purely imaginary quotient." },
        { text: "the circle $\\lvert z\\rvert = 1$", feedback: "$\\frac12 + \\frac12 i$ satisfies the condition (quotient $-1$) but has modulus $\\frac{1}{\\sqrt2}$." },
      ],
      hint: "A real quotient of $z - a$ and $z - b$ means the three points are collinear.",
    },
    {
      type: "numeric",
      id: "cq5-4-q8",
      variant: "practice",
      question: "Find the area of the region $\\{z : \\lvert z\\rvert \\le 2,\\ \\frac\\pi4 \\le \\arg z \\le \\frac{3\\pi}{4}\\}$. Give your answer to two decimal places.",
      answer: 3.1416,
      tolerance: 0.01,
      hint: "The region is a sector of a disc. Sector area $= \\frac12 r^2\\varphi$.",
      solution: "A sector of radius 2 with angle $\\frac{3\\pi}{4} - \\frac\\pi4 = \\frac\\pi2$: area $\\frac12 \\cdot 4 \\cdot \\frac\\pi2 = \\pi \\approx 3.14$.",
      commonMistakes: [
        { answer: 6.2832, tolerance: 0.01, feedback: "You forgot the $\\frac12$ in $\\frac12 r^2\\varphi$." },
        { answer: 12.566, tolerance: 0.02, feedback: "That is the whole disc. The argument limits keep a quarter of it." },
      ],
    },
    {
      type: "quiz",
      id: "cq5-4-q9",
      variant: "practice",
      question: "JEE Main. The locus $\\arg\\frac{z - 1}{z + 1} = \\frac{\\pi}{4}$ is",
      options: [
        { text: "the part of $x^2 + y^2 - 2y - 1 = 0$ with $y > 0$", correct: true, feedback: "Radius $\\frac{2}{2\\sin 45^\\circ} = \\sqrt2$, centre $i$ (major arc above the axis): $x^2 + (y - 1)^2 = 2$." },
        { text: "the part of $x^2 + y^2 - 2y - 1 = 0$ with $y < 0$", feedback: "The lower piece is the minor arc, where the angle is $\\frac\\pi4 - \\pi = -\\frac{3\\pi}{4}$." },
        { text: "the whole circle $x^2 + y^2 + 2y - 1 = 0$", feedback: "Centre $-i$ is the mirror circle, and the locus is only an arc anyway." },
        { text: "the line $y = x + 1$", feedback: "An angle subtended by a chord gives an arc, not a line." },
      ],
      hint: "Radius $\\frac{\\lvert a - b\\rvert}{2\\sin\\theta}$. Arc on the left of $-1 \\to 1$, major because $\\theta < \\frac\\pi2$.",
    },
    {
      type: "quiz",
      id: "cq5-4-q10",
      variant: "practice",
      multiple: true,
      question: "JEE Advanced. Real numbers $\\alpha, \\beta$ are such that every $z = x + iy$ with $\\arg\\frac{z + \\alpha}{z + \\beta} = \\frac{\\pi}{4}$ satisfies $x^2 + y^2 + 5x - 3y + 4 = 0$. Which statements are true? Select all that apply.",
      options: [
        { text: "$\\alpha\\beta = 4$", correct: true, feedback: "$\\alpha = 1$, $\\beta = 4$." },
        { text: "$\\beta = 4$", correct: true, feedback: "The circle meets the real axis at $-1$ and $-4$, and the arc lies above, on the left of $-\\beta \\to -\\alpha$, so $-\\beta = -4$." },
        { text: "$\\alpha = -1$", feedback: "The arc passes through $-\\alpha$, which is $-1$, so $\\alpha = +1$." },
        { text: "$\\alpha\\beta = -4$", feedback: "Both $\\alpha = 1$ and $\\beta = 4$ are positive." },
      ],
      hint: "The arc's endpoints $-\\alpha$ and $-\\beta$ are where the circle meets the real axis ($y = 0$). Its centre $(-\\frac52, \\frac32)$ is above the axis and $\\theta < \\frac\\pi2$ gives a major arc, so the arc is the upper part. Which order of endpoints puts it on the left?",
    },
    {
      type: "numeric",
      id: "cq5-4-q11",
      variant: "practice",
      question: "JEE Main. $z$ satisfies both $\\arg(z - 3) = \\frac{3\\pi}{4}$ and $\\arg(z - 1) = \\frac{\\pi}{2}$. Find $\\lvert z\\rvert^2$.",
      answer: 5,
      hint: "Each condition is a ray. Write $z = 3 + t(-1 + i)$ and $z = 1 + si$ with $t, s > 0$.",
      solution: "The first ray: $z = (3 - t) + ti$. The second: $z = 1 + si$. Matching, $t = 2$ and $s = 2$, both positive, so $z = 1 + 2i$ and $\\lvert z\\rvert^2 = 5$.",
      commonMistakes: [
        { answer: 2.2361, tolerance: 0.01, feedback: "That is $\\lvert z\\rvert$. The question asks for its square." },
        { answer: 13, feedback: "Check the first ray's direction: $\\frac{3\\pi}{4}$ points up and to the left, so $\\mathrm{Re}\\,z$ decreases from 3." },
      ],
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "the-rotation-theorem",
  title: "5.5 · The Rotation Theorem",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "Multiplying by $e^{i\\theta}$ turns every arrow through $\\theta$ without stretching it (Chapter 3). That single fact replaces most of the trigonometry in triangle and polygon problems: to build a square, rotate a side by $90^\\circ$; to build an equilateral triangle, rotate by $60^\\circ$.",
    },
    { type: "heading", text: "Rotating about a point" },
    {
      type: "text",
      content:
        "Rotation about the origin through $\\theta$ (anticlockwise) sends $z$ to $ze^{i\\theta}$. To rotate about another centre $z_0$, move the centre to the origin, rotate, and move back:",
    },
    {
      type: "math",
      latex: "z' - z_0 = (z - z_0)e^{i\\theta} \\qquad \\text{(clockwise: } e^{-i\\theta}\\text{)}",
    },
    {
      type: "worked-example",
      id: "cq5-5-we1",
      title: "Worked example 1: rotate about the origin",
      problem: "Rotate $3 + 4i$ about the origin through $\\frac\\pi2$ and through $\\frac\\pi3$, anticlockwise.",
      steps: [
        { text: "Through $\\frac\\pi2$: multiply by $i$. $i(3 + 4i) = -4 + 3i$." },
        { text: "Through $\\frac\\pi3$: multiply by $e^{i\\pi/3} = \\frac12 + \\frac{\\sqrt3}{2}i$." },
        { latex: "(3 + 4i)\\left(\\tfrac12 + \\tfrac{\\sqrt3}{2}i\\right) = \\frac{3 - 4\\sqrt3}{2} + \\frac{4 + 3\\sqrt3}{2}i" },
      ],
      answer: "$-4 + 3i$ and $\\frac{3 - 4\\sqrt3}{2} + \\frac{4 + 3\\sqrt3}{2}i$ (both still of modulus 5).",
    },
    {
      type: "worked-example",
      id: "cq5-5-we2",
      title: "Worked example 2: rotate about another point",
      problem: "Rotate $4 + i$ about $1 + i$ through $\\frac\\pi2$ anticlockwise.",
      steps: [
        { text: "Arrow from the centre: $(4 + i) - (1 + i) = 3$." },
        { text: "Rotate the arrow: $3i$. *Why this step:* only the arrow from the centre turns, the centre stays put." },
        { text: "Add the centre back: $1 + i + 3i = 1 + 4i$." },
      ],
      answer: "$1 + 4i$.",
    },
    { type: "heading", text: "The rotation theorem" },
    {
      type: "text",
      content:
        "Now look at a triangle $z_1z_2z_3$ from the vertex $z_1$. The arrow $z_3 - z_1$ is the arrow $z_2 - z_1$ turned through the angle $\\theta$ at $z_1$ and stretched by the ratio of the two sides. In one equation:",
    },
    {
      type: "math",
      latex: "\\frac{z_3 - z_1}{z_2 - z_1} = \\frac{\\lvert z_3 - z_1\\rvert}{\\lvert z_2 - z_1\\rvert}\\,e^{i\\theta}",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Reading the ratio",
      content:
        "Let $w = \\frac{z_3 - z_1}{z_2 - z_1}$, with $\\theta$ the anticlockwise angle from $z_1z_2$ to $z_1z_3$.\n\n- $w$ real: $z_1, z_2, z_3$ collinear\n- $w$ purely imaginary: right angle at $z_1$\n- $\\lvert w\\rvert = 1$: isosceles, $\\lvert z_1z_2\\rvert = \\lvert z_1z_3\\rvert$\n- $w = e^{\\pm i\\pi/3}$: equilateral",
    },
    {
      type: "interactive",
      config: {
        component: "cq-argand-plane",
        mode: "rotation",
        z1: [0, 0],
        z2: [2, 1],
        z3: [-1, 2],
        caption:
          "The ratio starts at exactly $i$: modulus 1 and angle $90^\\circ$, a right isosceles triangle, half a square. Drag $z_3$ and read the modulus ratio and angle separately.",
      },
    },
    {
      type: "worked-example",
      id: "cq5-5-we3",
      title: "Worked example 3: completing a square",
      problem: "$ABCD$ is a square labelled anticlockwise, with $A = 1 + i$ and $B = 4 + 2i$. Find $C$ and $D$.",
      steps: [
        { text: "$AD$ is $AB$ turned through $+90^\\circ$ (anticlockwise labelling): $D - A = i(B - A) = i(3 + i) = -1 + 3i$." },
        { text: "So $D = 1 + i + (-1 + 3i) = 4i$." },
        { text: "$C = B + (D - A) = 4 + 2i + (-1 + 3i) = 3 + 5i$. *Why this step:* in a square (any parallelogram) $\\overrightarrow{BC} = \\overrightarrow{AD}$." },
        { text: "Check: $C - B = -1 + 3i = i(B - A)$ as well." },
      ],
      answer: "$C = 3 + 5i$, $D = 4i$.",
    },
    { type: "heading", text: "The equilateral triangle condition" },
    {
      type: "text",
      content:
        "If $z_1z_2z_3$ is equilateral and labelled anticlockwise, the angle at $z_1$ from $z_1z_2$ to $z_1z_3$ is $60^\\circ$, and so is the angle at $z_2$ from $z_2z_3$ to $z_2z_1$. Both ratios equal $e^{i\\pi/3}$:",
    },
    {
      type: "math",
      latex: "\\frac{z_3 - z_1}{z_2 - z_1} = \\frac{z_1 - z_2}{z_3 - z_2} \\implies (z_3 - z_1)(z_3 - z_2) = -(z_1 - z_2)^2",
    },
    {
      type: "text",
      content:
        "Expanding and collecting gives a symmetric condition, which therefore holds for either orientation:",
    },
    {
      type: "math",
      latex: "z_1^2 + z_2^2 + z_3^2 = z_1z_2 + z_2z_3 + z_3z_1",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Equivalent forms",
      content:
        "- $\\dfrac{1}{z_1 - z_2} + \\dfrac{1}{z_2 - z_3} + \\dfrac{1}{z_3 - z_1} = 0$\n- with centroid $z_0 = \\frac{z_1 + z_2 + z_3}{3}$: $z_1^2 + z_2^2 + z_3^2 = 3z_0^2$\n- in terms of the cube roots of unity (Chapter 4): $z_1 + \\omega z_2 + \\omega^2 z_3 = 0$ or $z_1 + \\omega^2 z_2 + \\omega z_3 = 0$\n- if the circumcentre is $0$: $z_2 = \\omega z_1$, $z_3 = \\omega^2 z_1$ (in some order), so $z_1 + z_2 + z_3 = 0$",
    },
    {
      type: "worked-example",
      id: "cq5-5-we4",
      title: "Worked example 4: the third vertex",
      problem: "An equilateral triangle has vertices $0$ and $2$. Find the third vertex.",
      steps: [
        { text: "Turn the side from $0$ to $2$ through $\\pm 60^\\circ$ about $0$: $z_3 = 2e^{\\pm i\\pi/3}$." },
        { latex: "z_3 = 2\\left(\\tfrac12 \\pm \\tfrac{\\sqrt3}{2}i\\right) = 1 \\pm \\sqrt3\\, i" },
        { text: "Check with the condition: $0 + 4 + (1 + \\sqrt3 i)^2 = 4 + (-2 + 2\\sqrt3 i) = 2 + 2\\sqrt3 i$, and $0 + 2(1 + \\sqrt3 i) + 0 = 2 + 2\\sqrt3 i$." },
      ],
      answer: "$1 + \\sqrt3 i$ or $1 - \\sqrt3 i$.",
    },
    {
      type: "interactive",
      config: {
        component: "cq-argand-plane",
        mode: "rotation",
        z1: [0, 0],
        z2: [2, 0],
        z3: [1, 1.5],
        caption:
          "No triangle with grid-point vertices is exactly equilateral, so the test never reads $0$ here. Watch it shrink as $z_3$ approaches $1 + 1.73i$: compare $1 + 1.5i$ with $1 + 2i$, and see the angle at $z_1$ approach $60^\\circ$.",
      },
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"rotate z about z₀ by multiplying z by e^{iθ}\"",
      content:
        "$ze^{i\\theta}$ rotates about the **origin**. Rotating $4 + i$ about $1 + i$ through $90^\\circ$ by computing $i(4 + i) = -1 + 4i$ gives the wrong point (the right answer is $1 + 4i$). Always rotate the arrow **from the centre**: $z' = z_0 + (z - z_0)e^{i\\theta}$.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Concyclic points",
      content:
        "Four points $z_1, z_2, z_3, z_4$ lie on one circle (or line) when the chord $z_1z_2$ subtends equal or supplementary angles at $z_3$ and $z_4$, i.e. when the cross ratio $\\dfrac{(z_3 - z_1)(z_4 - z_2)}{(z_3 - z_2)(z_4 - z_1)}$ is real.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "cq5-5-q1",
      variant: "practice",
      question: "Rotate $2 + i$ about the origin through $90^\\circ$ anticlockwise.",
      options: [
        { text: "$-1 + 2i$", correct: true, feedback: "$i(2 + i) = 2i - 1$." },
        { text: "$1 - 2i$", feedback: "That is the clockwise rotation, multiplication by $-i$." },
        { text: "$-2 - i$", feedback: "That is a half-turn, multiplication by $-1$." },
        { text: "$1 + 2i$", feedback: "Swapping the parts is a reflection in $y = x$, not a rotation." },
      ],
      hint: "Anticlockwise $90^\\circ$ is multiplication by $i$.",
    },
    {
      type: "numeric",
      id: "cq5-5-q2",
      variant: "practice",
      question: "The point $5$ is rotated about $2$ through $\\pi$. Where does it land? (The answer is real.)",
      answer: -1,
      hint: "$z' = z_0 + (z - z_0)e^{i\\pi}$, and $e^{i\\pi} = -1$.",
      solution: "$z' = 2 + (5 - 2)(-1) = -1$: the reflection of $5$ through $2$.",
      commonMistakes: [
        { answer: -5, feedback: "That is the half-turn about the origin. Rotate the arrow from the centre $2$." },
        { answer: 1, feedback: "Check: $2 + 3 \\cdot (-1) = -1$." },
      ],
    },
    {
      type: "quiz",
      id: "cq5-5-q3",
      variant: "practice",
      question: "Rotate $3 + 2i$ about $1$ through $\\frac\\pi2$ **clockwise**.",
      options: [
        { text: "$3 - 2i$", correct: true, feedback: "$1 + (2 + 2i)(-i) = 1 + 2 - 2i$." },
        { text: "$-1 + 2i$", feedback: "That is the anticlockwise rotation: $1 + (2 + 2i)i$." },
        { text: "$2 - 3i$", feedback: "That rotates about the origin: $(3 + 2i)(-i)$." },
        { text: "$1 - 2i$", feedback: "Rotate the arrow $2 + 2i$ from the centre, then add the centre back." },
      ],
      hint: "Clockwise $90^\\circ$ is multiplication by $-i$, applied to the arrow $z - 1$.",
    },
    {
      type: "quiz",
      id: "cq5-5-q4",
      variant: "concept",
      multiple: true,
      question: "Distinct points satisfy $\\frac{z_3 - z_1}{z_2 - z_1} = i$. Which statements are true? Select all that apply.",
      options: [
        { text: "The angle at $z_1$ is a right angle", correct: true, feedback: "$\\arg i = \\frac\\pi2$." },
        { text: "$\\lvert z_3 - z_1\\rvert = \\lvert z_2 - z_1\\rvert$", correct: true, feedback: "$\\lvert i\\rvert = 1$." },
        { text: "The triangle is equilateral", feedback: "Equilateral needs angle $60^\\circ$: the ratio would be $e^{\\pm i\\pi/3}$." },
        { text: "The points are collinear", feedback: "Collinear needs a real ratio." },
        { text: "$z_1, z_2, z_2 + z_3 - z_1, z_3$ are the vertices of a square", correct: true, feedback: "Two equal perpendicular sides from $z_1$ complete to a square, with fourth vertex $z_2 + (z_3 - z_1)$." },
      ],
      hint: "Read the modulus and the argument of $i$ separately.",
    },
    {
      type: "numeric",
      id: "cq5-5-q5",
      variant: "practice",
      question: "An equilateral triangle has vertices $0$, $4$ and $z_3$ with $\\mathrm{Im}\\,z_3 > 0$. Find $\\mathrm{Im}\\,z_3$ to two decimal places.",
      answer: 3.4641,
      tolerance: 0.01,
      hint: "Rotate the side from $0$ to $4$ through $+60^\\circ$.",
      solution: "$z_3 = 4e^{i\\pi/3} = 2 + 2\\sqrt3 i$, so $\\mathrm{Im}\\,z_3 = 2\\sqrt3 \\approx 3.46$.",
      commonMistakes: [
        { answer: 2, feedback: "That is the real part, $4\\cos 60^\\circ$." },
        { answer: 4, feedback: "The height of an equilateral triangle of side 4 is $4\\sin 60^\\circ$, less than the side." },
      ],
    },
    {
      type: "numeric",
      id: "cq5-5-q6",
      variant: "practice",
      question: "$ABCD$ is a square labelled anticlockwise with $A = 2 + i$ and $B = 5 + 3i$. If $C = p + qi$, find $p + q$.",
      answer: 9,
      hint: "$D - A = i(B - A)$, then $C = B + (D - A)$.",
      solution: "$B - A = 3 + 2i$, so $D - A = i(3 + 2i) = -2 + 3i$. $C = B + (D - A) = 5 + 3i - 2 + 3i = 3 + 6i$, and $p + q = 9$.",
      commonMistakes: [
        { answer: 7, feedback: "That is the clockwise square ($C = 7$). Anticlockwise labelling turns $AB$ by $+90^\\circ$, multiplication by $+i$." },
        { answer: 4, feedback: "That is $D = 4i$, not $C$. Add $D - A$ to $B$." },
      ],
    },
    {
      type: "quiz",
      id: "cq5-5-q7",
      variant: "concept",
      question: "Distinct points $z_1, z_2, z_3$ form an equilateral triangle if and only if",
      options: [
        { text: "$z_1^2 + z_2^2 + z_3^2 = z_1z_2 + z_2z_3 + z_3z_1$", correct: true, feedback: "The symmetric form of the rotation condition, valid for both orientations." },
        { text: "$z_1 + z_2 + z_3 = 0$", feedback: "Any triangle with centroid at the origin satisfies this." },
        { text: "$\\lvert z_1\\rvert = \\lvert z_2\\rvert = \\lvert z_3\\rvert$", feedback: "Any triangle inscribed in a circle centred at $0$ satisfies this." },
        { text: "$z_1z_2z_3 = 1$", feedback: "Products of vertices say nothing about side lengths." },
      ],
      hint: "Start from $\\frac{z_3 - z_1}{z_2 - z_1} = \\frac{z_1 - z_2}{z_3 - z_2}$ and expand.",
    },
    {
      type: "numeric",
      id: "cq5-5-q8",
      variant: "practice",
      question: "An equilateral triangle has its centroid at the origin and one vertex at $1 + \\sqrt3 i$. Find the product of its three vertices (it is real).",
      answer: -8,
      hint: "With centre $0$ the vertices are $z$, $\\omega z$, $\\omega^2 z$. Their product is $z^3$.",
      solution: "The product is $z \\cdot \\omega z \\cdot \\omega^2 z = \\omega^3 z^3 = z^3$, and $z = 1 + \\sqrt3 i = 2e^{i\\pi/3}$, so $z^3 = 8e^{i\\pi} = -8$.",
      commonMistakes: [
        { answer: 8, feedback: "$\\lvert z\\rvert^3 = 8$, but the argument $3 \\cdot \\frac\\pi3 = \\pi$ makes it negative." },
        { answer: 0, feedback: "That is the sum of the vertices, not their product." },
      ],
    },
    {
      type: "quiz",
      id: "cq5-5-q9",
      variant: "practice",
      multiple: true,
      question: "JEE Main. $\\lvert z_1\\rvert = \\lvert z_2\\rvert = \\lvert z_3\\rvert = 1$ and $z_1 + z_2 + z_3 = 0$. Which statements are true? Select all that apply.",
      options: [
        { text: "$z_1, z_2, z_3$ form an equilateral triangle", correct: true, feedback: "Circumcentre $0$ and centroid $0$ coincide, which only happens for an equilateral triangle." },
        { text: "$z_1^2 + z_2^2 + z_3^2 = 0$", correct: true, feedback: "$\\sum z_1z_2 = z_1z_2z_3\\sum\\frac{1}{z_1} = z_1z_2z_3\\,\\overline{\\sum z_1} = 0$, and $(\\sum z_1)^2 = \\sum z_1^2 + 2\\sum z_1z_2$." },
        { text: "$\\lvert z_1 - z_2\\rvert = \\sqrt3$", correct: true, feedback: "The side of an equilateral triangle inscribed in a unit circle is $\\sqrt3$." },
        { text: "$z_1z_2z_3 = 1$", feedback: "$z_1z_2z_3 = z_1^3$, which can be any point of the unit circle (try $z_1 = i$)." },
      ],
      hint: "On the unit circle $\\frac{1}{z} = \\bar z$. Also think about where the centroid and circumcentre are.",
    },
    {
      type: "numeric",
      id: "cq5-5-q10",
      variant: "practice",
      question: "JEE Main. An equilateral triangle is inscribed in $\\lvert z\\rvert = 2$ with one vertex $z_1 = 1 + \\sqrt3 i$. Find $\\mathrm{Re}\\,z_2 + \\mathrm{Re}\\,z_3$.",
      answer: -1,
      hint: "Circumcentre $0$ means the centroid is $0$ too.",
      solution: "$z_1 + z_2 + z_3 = 0$, so $z_2 + z_3 = -1 - \\sqrt3 i$ and the real parts add to $-1$. (Explicitly $z_2 = \\omega z_1 = -2$ and $z_3 = \\omega^2 z_1 = 1 - \\sqrt3 i$.)",
      commonMistakes: [
        { answer: 1, feedback: "Sign: $z_2 + z_3 = -z_1$." },
        { answer: -2, feedback: "$-2$ is one of the vertices. Add the other, $1 - \\sqrt3 i$." },
      ],
    },
    {
      type: "numeric",
      id: "cq5-5-q11",
      variant: "practice",
      question: "JEE Advanced. $P = 2 + 3i$ is rotated about $Q = 1 + i$ through $60^\\circ$ anticlockwise to $R$. Find $\\lvert R\\rvert^2$ to two decimal places.",
      answer: 8.268,
      tolerance: 0.01,
      hint: "$R = Q + (P - Q)e^{i\\pi/3}$ with $P - Q = 1 + 2i$.",
      solution: "$(1 + 2i)\\left(\\frac12 + \\frac{\\sqrt3}{2}i\\right) = \\left(\\frac12 - \\sqrt3\\right) + \\left(1 + \\frac{\\sqrt3}{2}\\right)i$. Adding $Q$: $R = \\left(\\frac32 - \\sqrt3\\right) + \\left(2 + \\frac{\\sqrt3}{2}\\right)i$.\n\n$\\lvert R\\rvert^2 = \\frac94 - 3\\sqrt3 + 3 + 4 + 2\\sqrt3 + \\frac34 = 10 - \\sqrt3 \\approx 8.27$.",
      commonMistakes: [
        { answer: 13, feedback: "That is $\\lvert P\\rvert^2$. Rotation about $Q$ keeps $\\lvert R - Q\\rvert = \\lvert P - Q\\rvert$, not the distance from the origin." },
        { answer: 11.732, tolerance: 0.01, feedback: "That is $10 + \\sqrt3$, from rotating clockwise. Anticlockwise uses $e^{+i\\pi/3}$." },
      ],
    },
    {
      type: "quiz",
      id: "cq5-5-q12",
      variant: "practice",
      question: "JEE Main. The vertices satisfy $\\frac{z_3 - z_1}{z_2 - z_1} = \\frac{1 - \\sqrt3 i}{2}$. The triangle is",
      options: [
        { text: "equilateral", correct: true, feedback: "$\\frac{1 - \\sqrt3 i}{2} = e^{-i\\pi/3}$: equal sides at $z_1$ and a $60^\\circ$ angle, labelled clockwise." },
        { text: "right-angled and isosceles", feedback: "That needs the ratio $\\pm i$." },
        { text: "isosceles with a $120^\\circ$ apex angle", feedback: "The argument is $-60^\\circ$, so the angle at $z_1$ is $60^\\circ$, not $120^\\circ$." },
        { text: "degenerate (collinear)", feedback: "The ratio is not real." },
      ],
      hint: "Find the modulus and argument of $\\frac{1 - \\sqrt3 i}{2}$.",
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "maximum-and-minimum-of-the-modulus",
  title: "5.6 · Maximum and Minimum of the Modulus",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "\"$z$ satisfies some condition. Find the greatest value of $\\lvert z\\rvert$.\" This is one of the most common JEE complex-number questions. Read it geometrically: $\\lvert z\\rvert$ is the distance from the origin, and $\\lvert z - q\\rvert$ the distance from $q$. So the question becomes: how near and how far can a point of the locus be from $q$?",
    },
    { type: "heading", text: "Distance from a point to a circle" },
    {
      type: "text",
      content:
        "If $z$ runs over the circle $\\lvert z - a\\rvert = r$, the nearest and farthest points from $q$ lie on the line through $q$ and the centre $a$. Moving along that line from $q$, you meet the circle at distance $\\lvert a - q\\rvert - r$ and leave it at $\\lvert a - q\\rvert + r$:",
    },
    {
      type: "math",
      latex: "\\min \\lvert z - q\\rvert = \\big\\lvert\\, \\lvert a - q\\rvert - r \\,\\big\\rvert, \\qquad \\max \\lvert z - q\\rvert = \\lvert a - q\\rvert + r",
    },
    {
      type: "interactive",
      config: {
        component: "cq-locus-explorer",
        locus: "circle",
        a: [3, 4],
        k: { min: 0.5, max: 4, step: 0.5, initial: 2 },
        p: [3, 2],
        probe: [0, 0],
        draggable: ["a", "p", "probe"],
        window: { xmin: -2, xmax: 8, ymin: -2, ymax: 7 },
        caption:
          "The solid segment reaches the nearest point of the circle, the dashed one the farthest. Both lie on the line through $q$ and the centre. Drag $q$ inside the circle: the minimum becomes $r - \\lvert a - q\\rvert$.",
      },
    },
    {
      type: "worked-example",
      id: "cq5-6-we1",
      title: "Worked example 1: |z| on a circle",
      problem: "If $\\lvert z - 3 - 4i\\rvert = 2$, find the least and greatest values of $\\lvert z\\rvert$ and the point where the least is attained.",
      steps: [
        { text: "Centre $3 + 4i$ at distance $5$ from $q = 0$, radius $2$, and $0$ is outside the circle." },
        { text: "$\\min\\lvert z\\rvert = 5 - 2 = 3$, $\\max\\lvert z\\rvert = 5 + 2 = 7$." },
        { text: "The nearest point is on the segment from $0$ to the centre, at distance 3: $\\frac35(3 + 4i) = 1.8 + 2.4i$." },
      ],
      answer: "$3 \\le \\lvert z\\rvert \\le 7$, with the minimum at $1.8 + 2.4i$.",
    },
    { type: "heading", text: "Bounds from the triangle inequality" },
    {
      type: "text",
      content:
        "When the condition is not a ready-made circle, the triangle inequality from Chapter 3 gives bounds:",
    },
    {
      type: "math",
      latex: "\\big\\lvert \\lvert z_1\\rvert - \\lvert z_2\\rvert \\big\\rvert \\le \\lvert z_1 \\pm z_2\\rvert \\le \\lvert z_1\\rvert + \\lvert z_2\\rvert",
    },
    {
      type: "text",
      content:
        "A bound is only the answer if it is **attained**: $\\lvert z_1 + z_2\\rvert = \\lvert z_1\\rvert + \\lvert z_2\\rvert$ needs $z_1$ and $z_2$ in the same direction, and you must check that such a $z$ obeys the given condition.",
    },
    {
      type: "worked-example",
      id: "cq5-6-we2",
      title: "Worked example 2: a disc and a shifted modulus",
      problem: "If $\\lvert z\\rvert \\le 2$, find the greatest and least values of $\\lvert z + 3 - 4i\\rvert$.",
      steps: [
        { text: "Triangle inequality: $\\lvert z + (3 - 4i)\\rvert \\le \\lvert z\\rvert + 5 \\le 7$." },
        { text: "Attained when $z$ points the same way as $3 - 4i$ with $\\lvert z\\rvert = 2$: $z = \\frac25(3 - 4i)$, and then $\\lvert z + 3 - 4i\\rvert = \\frac75 \\cdot 5 = 7$." },
        { text: "Lower bound: $\\lvert z + 3 - 4i\\rvert \\ge 5 - \\lvert z\\rvert \\ge 3$, attained at $z = -\\frac25(3 - 4i)$. *Why this step:* geometrically, the distance from $-3 + 4i$ to the disc of radius 2 about $0$." },
      ],
      answer: "Greatest $7$, least $3$.",
    },
    {
      type: "worked-example",
      id: "cq5-6-we3",
      title: "Worked example 3: the classic |z − 4/z| = 2",
      problem: "If $\\left\\lvert z - \\frac4z\\right\\rvert = 2$, find the greatest and least values of $\\lvert z\\rvert$.",
      steps: [
        { text: "Let $r = \\lvert z\\rvert$. Write $z = \\left(z - \\frac4z\\right) + \\frac4z$ and apply the triangle inequality." },
        { latex: "r \\le 2 + \\frac4r \\implies r^2 - 2r - 4 \\le 0 \\implies r \\le 1 + \\sqrt5" },
        { text: "Similarly $\\frac4z = z - \\left(z - \\frac4z\\right)$ gives $\\frac4r \\le r + 2$." },
        { latex: "r^2 + 2r - 4 \\ge 0 \\implies r \\ge \\sqrt5 - 1" },
        { text: "Both bounds are attained by real $z$: $z = 1 + \\sqrt5$ gives $z - \\frac4z = (1 + \\sqrt5) - (\\sqrt5 - 1) = 2$, and $z = \\sqrt5 - 1$ gives $-2$. *Why this step:* without checking attainment, a triangle-inequality bound is only a bound." },
      ],
      answer: "$\\max\\lvert z\\rvert = \\sqrt5 + 1$, $\\min\\lvert z\\rvert = \\sqrt5 - 1$.",
    },
    { type: "heading", text: "Two moving points and other loci" },
    {
      type: "worked-example",
      id: "cq5-6-we4",
      title: "Worked example 4: points on two circles",
      problem: "$z_1$ lies on $\\lvert z\\rvert = 1$ and $z_2$ on $\\lvert z - 6 - 8i\\rvert = 3$. Find the greatest and least values of $\\lvert z_1 - z_2\\rvert$.",
      steps: [
        { text: "Distance between centres $\\lvert 6 + 8i\\rvert = 10$, radii $1$ and $3$. The circles are separate since $10 > 1 + 3$." },
        { text: "Greatest: go through both centres and out the far sides, $10 + 1 + 3 = 14$. Least: the gap between them along the line of centres, $10 - 1 - 3 = 6$." },
      ],
      answer: "$6 \\le \\lvert z_1 - z_2\\rvert \\le 14$.",
    },
    {
      type: "interactive",
      config: {
        component: "cq-locus-explorer",
        locus: "ellipse",
        a: [-3, 0],
        b: [3, 0],
        k: { min: 6.5, max: 12, step: 0.5, initial: 10 },
        p: [0, 4],
        probe: [0, 0],
        draggable: ["p", "probe"],
        window: { xmin: -6, xmax: 6, ymin: -5, ymax: 5 },
        caption:
          "On the ellipse $\\lvert z - 3\\rvert + \\lvert z + 3\\rvert = 10$ the modulus $\\lvert z\\rvert$ runs from the semi-minor axis $4$ (top and bottom) to the semi-major axis $5$ (the ends). Move $q$ to see the extremes shift.",
      },
    },
    {
      type: "worked-example",
      id: "cq5-6-we5",
      title: "Worked example 5: |z| on an ellipse",
      problem: "If $\\lvert z - 3\\rvert + \\lvert z + 3\\rvert = 10$, find the range of $\\lvert z\\rvert$.",
      steps: [
        { text: "The locus is the ellipse $\\frac{x^2}{25} + \\frac{y^2}{16} = 1$, centred at the origin." },
        { text: "The distance from the centre of an ellipse ranges from the semi-minor to the semi-major axis." },
      ],
      answer: "$4 \\le \\lvert z\\rvert \\le 5$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the triangle-inequality bound is always the maximum\"",
      content:
        "From $\\lvert z\\rvert = 1$ you get $\\lvert z + 3i\\rvert \\le 4$, attained at $z = i$. Fine. But from $\\lvert z - 2\\rvert = 1$ you also get $\\lvert z\\rvert \\le \\lvert z - 2\\rvert + 2 = 3$ and $\\lvert z + 3i\\rvert \\le \\lvert z\\rvert + 3 \\le 6$, and the 6 is never reached: it needs $z = 3$ (for $\\lvert z\\rvert = 3$) pointing along $3i$ at the same time. The true maximum is $\\lvert 2 + 3i\\rvert + 1 = \\sqrt{13} + 1 \\approx 4.61$. Chained inequalities overshoot unless every equality case can hold together.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "cq5-6-q1",
      variant: "practice",
      question: "If $\\lvert z - 6 + 8i\\rvert = 4$, find the greatest value of $\\lvert z\\rvert$.",
      answer: 14,
      hint: "Distance from the origin to the centre $6 - 8i$, plus the radius.",
      solution: "$\\lvert 6 - 8i\\rvert = 10$, so $\\max\\lvert z\\rvert = 10 + 4 = 14$.",
      commonMistakes: [
        { answer: 6, feedback: "That is the least value, $10 - 4$." },
        { answer: 10, feedback: "That is the distance to the centre. The farthest point is a radius beyond it." },
      ],
    },
    {
      type: "numeric",
      id: "cq5-6-q2",
      variant: "practice",
      question: "If $\\lvert z + 5 - 12i\\rvert = 3$, find the least value of $\\lvert z\\rvert$.",
      answer: 10,
      hint: "The centre is $-5 + 12i$. Is the origin inside or outside the circle?",
      solution: "$\\lvert -5 + 12i\\rvert = 13 > 3$, so the origin is outside and $\\min\\lvert z\\rvert = 13 - 3 = 10$.",
      commonMistakes: [
        { answer: 16, feedback: "That is the greatest value, $13 + 3$." },
        { answer: 13, feedback: "That is the distance to the centre." },
      ],
    },
    {
      type: "quiz",
      id: "cq5-6-q3",
      variant: "practice",
      question: "If $\\lvert z - 1\\rvert = 3$, what is the least value of $\\lvert z\\rvert$?",
      options: [
        { text: "$2$", correct: true, feedback: "The origin is inside the circle (distance 1 from the centre), so the nearest point is $3 - 1 = 2$ away, at $z = -2$." },
        { text: "$0$", feedback: "$0$ is not on the circle: $\\lvert 0 - 1\\rvert = 1 \\ne 3$." },
        { text: "$-2$", feedback: "A modulus is never negative. Use $\\big\\lvert\\lvert a - q\\rvert - r\\big\\rvert$." },
        { text: "$4$", feedback: "That is the greatest value, $1 + 3$." },
      ],
      hint: "Is the origin inside the circle? Use $\\big\\lvert\\lvert a\\rvert - r\\big\\rvert$.",
    },
    {
      type: "numeric",
      id: "cq5-6-q4",
      variant: "practice",
      question: "If $\\lvert z\\rvert \\le 3$, find the greatest value of $\\lvert z - 4i\\rvert$.",
      answer: 7,
      hint: "$\\lvert z - 4i\\rvert \\le \\lvert z\\rvert + 4$. Where is equality attained?",
      solution: "$\\lvert z - 4i\\rvert \\le 3 + 4 = 7$, attained at $z = -3i$ (pointing directly away from $4i$).",
      commonMistakes: [
        { answer: 1, feedback: "That is the least value, $4 - 3$." },
        { answer: 5, feedback: "$5 = \\lvert 3 + 4i\\rvert$ comes from a perpendicular direction. The farthest point is directly opposite $4i$." },
      ],
    },
    {
      type: "numeric",
      id: "cq5-6-q5",
      variant: "practice",
      question: "If $\\left\\lvert z - \\frac2z\\right\\rvert = 1$, find the greatest value of $\\lvert z\\rvert$.",
      answer: 2,
      hint: "With $r = \\lvert z\\rvert$: $r \\le 1 + \\frac2r$. Then check that the bound is attained.",
      solution: "$r \\le 1 + \\frac2r$ gives $r^2 - r - 2 \\le 0$, $(r - 2)(r + 1) \\le 0$, so $r \\le 2$. At $z = 2$: $2 - 1 = 1$, so it is attained.",
      commonMistakes: [
        { answer: 1, feedback: "That is the least value: $\\frac2r \\le r + 1$ gives $r \\ge 1$." },
        { answer: 3, feedback: "Solve $r^2 - r - 2 \\le 0$ carefully: the roots are $2$ and $-1$." },
      ],
    },
    {
      type: "quiz",
      id: "cq5-6-q6",
      variant: "practice",
      multiple: true,
      question: "$z$ lies on the circle $\\lvert z - 2i\\rvert = 1$. Which statements are true? Select all that apply.",
      options: [
        { text: "$\\lvert z\\rvert \\ge 1$", correct: true, feedback: "$\\min\\lvert z\\rvert = 2 - 1 = 1$, at $z = i$." },
        { text: "$\\lvert z\\rvert \\le 3$", correct: true, feedback: "$\\max\\lvert z\\rvert = 2 + 1 = 3$, at $z = 3i$." },
        { text: "$\\arg z$ can be $0$", feedback: "The circle's lowest point is $i$, so it never reaches the positive real axis." },
        { text: "The largest and smallest values of $\\arg z$ differ by $\\frac\\pi3$", correct: true, feedback: "The tangents from $0$ make angle $\\alpha$ with $\\sin\\alpha = \\frac12$ either side of the imaginary axis: $\\arg z \\in \\left[\\frac\\pi3, \\frac{2\\pi}{3}\\right]$." },
        { text: "$\\mathrm{Re}\\,z$ can be $2$", feedback: "$\\lvert\\mathrm{Re}\\,z\\rvert \\le 1$ on a circle of radius 1 centred on the imaginary axis." },
      ],
      hint: "Sketch the circle centred at $2i$ with radius 1, and the two tangents to it from the origin.",
    },
    {
      type: "numeric",
      id: "cq5-6-q7",
      variant: "practice",
      question: "For $z$ in the disc $\\lvert z - 4i\\rvert \\le 2\\sqrt2$, find the least value of $\\arg z$ in degrees.",
      answer: 45,
      unit: "°",
      hint: "The extreme arguments are along the tangents from the origin. The tangent makes angle $\\alpha$ with the line to the centre, $\\sin\\alpha = \\frac{r}{\\lvert a\\rvert}$.",
      solution: "$\\sin\\alpha = \\frac{2\\sqrt2}{4} = \\frac{1}{\\sqrt2}$, so $\\alpha = 45^\\circ$. The centre is at $90^\\circ$, so $\\arg z$ ranges over $[45^\\circ, 135^\\circ]$. Least value $45^\\circ$.",
      commonMistakes: [
        { answer: 135, feedback: "That is the greatest value." },
        { answer: 90, feedback: "That is the argument of the centre. The disc spreads $45^\\circ$ either side." },
      ],
    },
    {
      type: "numeric",
      id: "cq5-6-q8",
      variant: "practice",
      question: "$z_1$ lies on $\\lvert z\\rvert = 2$ and $z_2$ on $\\lvert z - 3 - 4i\\rvert = 1$. Find the least value of $\\lvert z_1 - z_2\\rvert$.",
      answer: 2,
      hint: "Distance between centres minus both radii (check the circles do not overlap).",
      solution: "Centres $0$ and $3 + 4i$ are $5$ apart, and $5 > 2 + 1$, so the circles are separate. Least distance $5 - 2 - 1 = 2$.",
      commonMistakes: [
        { answer: 8, feedback: "That is the greatest value, $5 + 2 + 1$." },
        { answer: 3, feedback: "Subtract both radii: $5 - 2 - 1$." },
      ],
    },
    {
      type: "numeric",
      id: "cq5-6-q9",
      variant: "practice",
      question: "If $\\lvert z - 4\\rvert + \\lvert z + 4\\rvert = 10$, find the least value of $\\lvert z\\rvert$.",
      answer: 3,
      hint: "Find the semi-axes of the ellipse. Its centre is the origin.",
      solution: "$A = 5$, $c = 4$, $B = 3$. The least distance from the centre is the semi-minor axis, $3$, at $z = \\pm 3i$.",
      commonMistakes: [
        { answer: 5, feedback: "That is the greatest value, the semi-major axis." },
        { answer: 4, feedback: "4 is the focal distance. The minimum is the semi-minor axis $\\sqrt{25 - 16}$." },
      ],
    },
    {
      type: "numeric",
      id: "cq5-6-q10",
      variant: "practice",
      question: "JEE Main. If $\\lvert z - 3 - 2i\\rvert \\le 1$, find the least value of $\\lvert 2z - 6 + 5i\\rvert$.",
      answer: 7,
      hint: "$\\lvert 2z - 6 + 5i\\rvert = 2\\left\\lvert z - \\left(3 - \\frac52 i\\right)\\right\\rvert$: twice the distance from $3 - 2.5i$.",
      solution: "The disc has centre $3 + 2i$ and radius 1. Its distance from $3 - 2.5i$ is $4.5$, so the least distance from the disc is $3.5$, and the least value is $2 \\times 3.5 = 7$.",
      commonMistakes: [
        { answer: 3.5, feedback: "You forgot the factor 2 pulled out of the modulus." },
        { answer: 9, feedback: "That is twice the distance to the centre. Subtract the radius first." },
      ],
    },
    {
      type: "numeric",
      id: "cq5-6-q11",
      variant: "practice",
      question: "JEE Advanced. If $\\left\\lvert z + \\frac2z\\right\\rvert = 2$, find the greatest value of $\\lvert z\\rvert$ to two decimal places.",
      answer: 2.7321,
      tolerance: 0.01,
      hint: "$r \\le 2 + \\frac2r$. Then check attainment: try $z$ purely imaginary.",
      solution: "$r^2 - 2r - 2 \\le 0$ gives $r \\le 1 + \\sqrt3$. Attained: $z = ir$ gives $z + \\frac2z = i\\left(r - \\frac2r\\right)$, and $r - \\frac2r = 2$ at $r = 1 + \\sqrt3$. So $\\max\\lvert z\\rvert = 1 + \\sqrt3 \\approx 2.73$.",
      commonMistakes: [
        { answer: 0.7321, tolerance: 0.01, feedback: "That is the least value, $\\sqrt3 - 1$." },
        { answer: 3.2361, tolerance: 0.01, feedback: "That is $1 + \\sqrt5$, the answer for $\\lvert z - \\frac4z\\rvert = 2$. Here the constant is 2." },
      ],
    },
    {
      type: "numeric",
      id: "cq5-6-q12",
      variant: "practice",
      question: "JEE Main. If $\\lvert z\\rvert = 1$, find the greatest value of $\\lvert z^2 + z + 1\\rvert$.",
      answer: 3,
      hint: "Factor out $z$: $z^2 + z + 1 = z\\left(z + 1 + \\frac1z\\right)$, and on the unit circle $z + \\frac1z = 2\\cos\\theta$.",
      solution: "$\\lvert z^2 + z + 1\\rvert = \\lvert z\\rvert\\,\\lvert 1 + 2\\cos\\theta\\rvert = \\lvert 1 + 2\\cos\\theta\\rvert \\le 3$, attained at $z = 1$.",
      commonMistakes: [
        { answer: 1, feedback: "The value at $z = i$ is $\\lvert i\\rvert = 1$, but $z = 1$ gives more." },
        { answer: 2, feedback: "Check $z = 1$: $1 + 1 + 1 = 3$." },
      ],
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-5-mastery",
  title: "5.7 · Chapter 5 Mastery",
  position: 7,
  blocks: blocks([
    {
      type: "text",
      content:
        "This lesson hides the formula sheet. Every result in the chapter grows from two readings of a complex number: $\\lvert z - a\\rvert$ is a **distance** and $\\arg\\frac{z - a}{z - b}$ is an **angle**. If you can translate a condition into one of those words, you can rebuild the locus.",
    },
    { type: "heading", text: "Reconstruct it" },
    {
      type: "callout",
      variant: "tip",
      title: "Rebuild any locus from distance and angle",
      content:
        "Before checking the table below, try to say each locus in words, then name the curve.\n\n- one distance fixed: circle\n- two distances equal: perpendicular bisector\n- two distances adding to $k$: ellipse (if $k$ beats the focal distance)\n- two distances differing by $k$: one hyperbola branch\n- two distances in a fixed ratio $\\ne 1$: Apollonius circle\n- one direction fixed: ray\n- angle subtended by $ab$ fixed: arc, real ratio a line, imaginary ratio a full circle on a diameter",
    },
    {
      type: "table",
      headers: ["Condition", "In words", "Locus"],
      rows: [
        ["$\\lvert z - a\\rvert = r$", "distance from $a$ is $r$", "circle, centre $a$"],
        ["$\\lvert z - a\\rvert = \\lvert z - b\\rvert$", "equally far from $a$ and $b$", "perpendicular bisector of $ab$"],
        ["$\\lvert z - a\\rvert + \\lvert z - b\\rvert = k$", "distances add to $k$", "ellipse ($k > \\lvert a - b\\rvert$), segment ($=$)"],
        ["$\\lvert z - a\\rvert - \\lvert z - b\\rvert = k$", "distances differ by $k$", "hyperbola branch nearer $b$ ($0 < k < \\lvert a - b\\rvert$)"],
        ["$\\lvert z - a\\rvert = k\\lvert z - b\\rvert$", "fixed ratio $k \\ne 1$", "circle, centre $\\frac{a - k^2b}{1 - k^2}$"],
        ["$\\arg(z - a) = \\theta$", "direction from $a$ fixed", "ray from $a$"],
        ["$\\arg\\frac{z - a}{z - b} = \\theta$", "$ab$ subtends $\\theta$", "arc through $a, b$, left of $b \\to a$"],
        ["$\\frac{z_3 - z_1}{z_2 - z_1} = \\frac{\\lvert z_3 - z_1\\rvert}{\\lvert z_2 - z_1\\rvert}e^{i\\theta}$", "turn and stretch at $z_1$", "rotation theorem"],
      ],
    },
    {
      type: "interactive",
      config: {
        component: "cq-locus-explorer",
        locus: "apollonius",
        a: [2, 0],
        b: [-1, 0],
        k: { min: 0.25, max: 3, step: 0.25, initial: 2 },
        p: [0, 1],
        probe: [0, 0],
        draggable: ["a", "b", "p", "probe"],
        caption:
          "A last look before the questions. Predict the centre and radius from $\\frac{a - k^2b}{1 - k^2}$ and $\\frac{k\\lvert a - b\\rvert}{\\lvert 1 - k^2\\rvert}$, and the min and max of $\\lvert z\\rvert$ from the centre and radius, then check against the readouts.",
      },
    },
    { type: "heading", text: "Mastery questions" },
    {
      type: "numeric",
      id: "cq5-7-q1",
      variant: "mastery",
      question: "Find the radius of the circle $\\lvert z - 2 + i\\rvert = 3\\lvert z + 1\\rvert$ to two decimal places.",
      answer: 1.1859,
      tolerance: 0.01,
      hint: "Apollonius with $a = 2 - i$, $b = -1$, $k = 3$.",
      solution: "Radius $\\frac{k\\lvert a - b\\rvert}{\\lvert 1 - k^2\\rvert} = \\frac{3\\lvert 3 - i\\rvert}{8} = \\frac{3\\sqrt{10}}{8} \\approx 1.19$. (Centre $\\frac{a - 9b}{1 - 9} = \\frac{11 - i}{-8}$.)",
      commonMistakes: [
        { answer: 9.4868, tolerance: 0.01, feedback: "You forgot to divide by $\\lvert 1 - k^2\\rvert = 8$." },
        { answer: 1.0541, tolerance: 0.01, feedback: "You divided by $k^2 = 9$. The denominator is $\\lvert 1 - k^2\\rvert = 8$." },
      ],
    },
    {
      type: "quiz",
      id: "cq5-7-q2",
      variant: "mastery",
      question: "The locus $\\lvert z - 1\\rvert + \\lvert z + 1\\rvert = 2\\sqrt2$ is",
      options: [
        { text: "the ellipse $\\frac{x^2}{2} + y^2 = 1$", correct: true, feedback: "$A = \\sqrt2$, $c = 1$, $B = 1$." },
        { text: "the circle $x^2 + y^2 = 2$", feedback: "A sum of distances to two different foci gives an ellipse, not a circle." },
        { text: "the segment $[-1, 1]$", feedback: "That needs $k = 2$. Here $k = 2\\sqrt2 > 2$." },
        { text: "the ellipse $\\frac{x^2}{8} + y^2 = 1$", feedback: "The semi-major axis is $\\frac k2 = \\sqrt2$, so $A^2 = 2$, not 8." },
      ],
      hint: "$A = \\frac k2$, $c = 1$, $B^2 = A^2 - c^2$.",
    },
    {
      type: "quiz",
      id: "cq5-7-q3",
      variant: "mastery",
      question: "The locus $\\arg\\frac{z - i}{z + i} = \\frac\\pi2$ is",
      options: [
        { text: "the left half of the circle $\\lvert z\\rvert = 1$ ($\\mathrm{Re}\\,z < 0$)", correct: true, feedback: "Right angle at $z$: the circle on the diameter from $-i$ to $i$. Going from $b = -i$ up to $a = i$, the left side has $\\mathrm{Re}\\,z < 0$. Check $z = -1$: $\\frac{-1 - i}{-1 + i} = i$." },
        { text: "the right half of $\\lvert z\\rvert = 1$ ($\\mathrm{Re}\\,z > 0$)", feedback: "At $z = 1$ the quotient is $\\frac{1 - i}{1 + i} = -i$: argument $-\\frac\\pi2$." },
        { text: "the whole circle $\\lvert z\\rvert = 1$ without $\\pm i$", feedback: "That is the purely imaginary condition, both signs of the right angle." },
        { text: "the real axis", feedback: "Points on the real axis are equidistant from $\\pm i$: that is a distance condition." },
      ],
      hint: "Semicircle on the diameter from $-i$ to $i$. Test $z = 1$ and $z = -1$.",
    },
    {
      type: "numeric",
      id: "cq5-7-q4",
      variant: "mastery",
      question: "A square is centred at the origin and one vertex is $3 + 4i$. Find its area.",
      answer: 50,
      hint: "The vertices are $z, iz, -z, -iz$. Find a side length or use the diagonal.",
      solution: "Adjacent vertices $3 + 4i$ and $i(3 + 4i) = -4 + 3i$ are $\\lvert 7 + i\\rvert = \\sqrt{50}$ apart. Area $= 50$. (Or: diagonal $2\\lvert z\\rvert = 10$, area $\\frac{10^2}{2}$.)",
      commonMistakes: [
        { answer: 25, feedback: "That is $\\lvert z\\rvert^2$. The side is $\\lvert z - iz\\rvert = \\sqrt2\\lvert z\\rvert$, so the area is $2\\lvert z\\rvert^2$." },
        { answer: 100, feedback: "That is the square of the diagonal. Area $= \\frac{d^2}{2}$." },
      ],
    },
    {
      type: "quiz",
      id: "cq5-7-q5",
      variant: "mastery",
      multiple: true,
      question: "The points $z_1 = 1 + i$, $z_2 = 3 + 3i$, $z_3 = 3 - i$ form a triangle. Which statements are true? Select all that apply.",
      options: [
        { text: "The angle at $z_1$ is a right angle", correct: true, feedback: "$\\frac{z_3 - z_1}{z_2 - z_1} = \\frac{2 - 2i}{2 + 2i} = -i$." },
        { text: "$\\lvert z_2 - z_1\\rvert = \\lvert z_3 - z_1\\rvert$", correct: true, feedback: "$\\lvert -i\\rvert = 1$: isosceles." },
        { text: "The points are collinear", feedback: "The ratio $-i$ is not real." },
        { text: "The area is $8$", feedback: "Legs of length $2\\sqrt2$: area $\\frac12 \\cdot 8 = 4$." },
        { text: "The circumcentre is $3 + i$", correct: true, feedback: "For a right angle at $z_1$, the circumcentre is the midpoint of the hypotenuse $z_2z_3$: $\\frac{6 + 2i}{2}$." },
      ],
      hint: "Compute $\\frac{z_3 - z_1}{z_2 - z_1}$ and read its modulus and argument.",
    },
    {
      type: "numeric",
      id: "cq5-7-q6",
      variant: "mastery",
      question: "If $\\left\\lvert z - \\frac3z\\right\\rvert = 2$, find the greatest value of $\\lvert z\\rvert$.",
      answer: 3,
      hint: "$r \\le 2 + \\frac3r$, then check that the bound is attained.",
      solution: "$r^2 - 2r - 3 \\le 0$, $(r - 3)(r + 1) \\le 0$, $r \\le 3$. At $z = 3$: $3 - 1 = 2$. Attained.",
      commonMistakes: [
        { answer: 1, feedback: "That is the least value: $\\frac3r \\le r + 2$ gives $r \\ge 1$." },
        { answer: 2, feedback: "Solve $r^2 - 2r - 3 \\le 0$: the roots are $3$ and $-1$." },
      ],
    },
    {
      type: "numeric",
      id: "cq5-7-q7",
      variant: "mastery",
      question: "Find the least value of $\\lvert z\\rvert$ for $z$ on the line $(1 - i)z + (1 + i)\\bar z = 4$. Give your answer to two decimal places.",
      answer: 1.4142,
      tolerance: 0.01,
      hint: "Turn it into Cartesian form: $(1 - i)z + (1 + i)\\bar z = 2\\,\\mathrm{Re}\\big((1 - i)z\\big)$.",
      solution: "$2(x + y) = 4$, so the line is $x + y = 2$. Its distance from the origin is $\\frac{2}{\\sqrt2} = \\sqrt2 \\approx 1.41$, attained at $1 + i$.",
      commonMistakes: [
        { answer: 2, feedback: "The line is $x + y = 2$; its distance from $0$ is $\\frac{2}{\\sqrt{1^2 + 1^2}}$." },
        { answer: 2.8284, tolerance: 0.01, feedback: "You read the line as $x + y = 4$. $(1 - i)z + (1 + i)\\bar z$ is **twice** $x + y$." },
      ],
    },
    {
      type: "quiz",
      id: "cq5-7-q8",
      variant: "mastery",
      question: "What are the centre and radius of $z\\bar z + (1 - i)z + (1 + i)\\bar z - 7 = 0$?",
      options: [
        { text: "Centre $-1 - i$, radius $3$", correct: true, feedback: "$\\alpha = 1 + i$ (coefficient of $\\bar z$), centre $-\\alpha$, radius $\\sqrt{2 + 7}$." },
        { text: "Centre $1 + i$, radius $3$", feedback: "The centre is $-\\alpha$, not $\\alpha$." },
        { text: "Centre $-1 + i$, radius $3$", feedback: "You took $\\alpha$ from the coefficient of $z$. $\\alpha$ is the coefficient of $\\bar z$." },
        { text: "Centre $-1 - i$, radius $\\sqrt5$", feedback: "Radius $\\sqrt{\\lvert\\alpha\\rvert^2 - k}$ with $k = -7$: $\\sqrt{2 + 7} = 3$." },
      ],
      hint: "Match with $z\\bar z + \\bar\\alpha z + \\alpha\\bar z + k = 0$.",
    },
    {
      type: "numeric",
      id: "cq5-7-q9",
      variant: "mastery",
      question: "How many complex numbers satisfy both $\\lvert z\\rvert = 1$ and $\\lvert z - 2\\rvert = 2$?",
      answer: 2,
      hint: "Two circles: compare the distance between centres with the sum and difference of the radii.",
      solution: "Centres $0$ and $2$, $d = 2$, radii $1$ and $2$. Since $\\lvert 2 - 1\\rvert < 2 < 1 + 2$, the circles cut in two points.",
      commonMistakes: [
        { answer: 1, feedback: "Touching needs $d = 3$ or $d = 1$. Here $d = 2$ lies strictly between." },
        { answer: 0, feedback: "Try $z = \\frac14 + \\frac{\\sqrt{15}}{4}i$: it satisfies both." },
      ],
    },
    {
      type: "quiz",
      id: "cq5-7-q10",
      variant: "mastery",
      multiple: true,
      question: "JEE Advanced. $\\lvert z_1\\rvert = \\lvert z_2\\rvert = 1$ and $\\lvert z_1 + z_2\\rvert = \\sqrt3$. Which statements are true? Select all that apply.",
      options: [
        { text: "$\\lvert z_1 - z_2\\rvert = 1$", correct: true, feedback: "Parallelogram law: $\\lvert z_1 + z_2\\rvert^2 + \\lvert z_1 - z_2\\rvert^2 = 2(1 + 1) = 4$." },
        { text: "The angle between $z_1$ and $z_2$ (as arrows from $0$) is $60^\\circ$", correct: true, feedback: "$\\lvert z_1 + z_2\\rvert^2 = 2 + 2\\cos\\varphi = 3$ gives $\\cos\\varphi = \\frac12$." },
        { text: "$\\left(\\frac{z_1}{z_2}\\right)^3 = -1$", correct: true, feedback: "$\\frac{z_1}{z_2} = e^{\\pm i\\pi/3}$, and its cube is $e^{\\pm i\\pi} = -1$." },
        { text: "$z_1\\bar z_2$ is real", feedback: "$z_1\\bar z_2 = e^{\\pm i\\pi/3}$, not real." },
        { text: "$\\lvert z_1 - z_2\\rvert = \\sqrt3$", feedback: "The parallelogram law gives $\\lvert z_1 - z_2\\rvert^2 = 4 - 3 = 1$." },
      ],
      hint: "$\\lvert z_1 \\pm z_2\\rvert^2 = \\lvert z_1\\rvert^2 + \\lvert z_2\\rvert^2 \\pm 2\\,\\mathrm{Re}(z_1\\bar z_2)$.",
    },
    {
      type: "numeric",
      id: "cq5-7-q11",
      variant: "mastery",
      question: "JEE Main. $z$ lies on $\\lvert z - 2 - 2i\\rvert = \\sqrt2$. Find the greatest value of $\\arg z$ in degrees.",
      answer: 75,
      unit: "°",
      hint: "The centre $2 + 2i$ is at $45^\\circ$, distance $2\\sqrt2$. The tangents from the origin make angle $\\alpha$ with $\\sin\\alpha = \\frac{r}{\\lvert a\\rvert}$.",
      solution: "$\\sin\\alpha = \\frac{\\sqrt2}{2\\sqrt2} = \\frac12$, $\\alpha = 30^\\circ$. So $\\arg z \\in [15^\\circ, 75^\\circ]$, greatest $75^\\circ$.",
      commonMistakes: [
        { answer: 15, feedback: "That is the least value." },
        { answer: 90, feedback: "The circle does not reach the imaginary axis: its leftmost point has real part $2 - \\sqrt2 > 0$." },
      ],
    },
    {
      type: "quiz",
      id: "cq5-7-q12",
      variant: "mastery",
      question: "Distinct $z_1, z_2, z_3$ form an equilateral triangle with circumcentre $0$ exactly when",
      options: [
        { text: "$\\lvert z_1\\rvert = \\lvert z_2\\rvert = \\lvert z_3\\rvert$ and $z_1 + z_2 + z_3 = 0$", correct: true, feedback: "Equal moduli put the circumcentre at $0$, a zero sum puts the centroid there, and they coincide only for an equilateral triangle." },
        { text: "$z_1 + z_2 + z_3 = 0$", feedback: "Any triangle with centroid $0$ satisfies this, for example $1, 1 + i, -2 - i$." },
        { text: "$\\lvert z_1\\rvert = \\lvert z_2\\rvert = \\lvert z_3\\rvert$", feedback: "Any triangle inscribed in a circle about $0$ satisfies this." },
        { text: "$z_1z_2z_3 = 1$", feedback: "That says nothing about the shape." },
      ],
      hint: "Which two triangle centres does each condition fix, and when do they coincide?",
    },
    {
      type: "numeric",
      id: "cq5-7-q13",
      variant: "mastery",
      question: "Course link. The roots of $z^2 - 4z + 13 = 0$ are plotted in the Argand plane. Find the distance between them.",
      answer: 6,
      hint: "Solve with the quadratic formula (Chapter 2), then use $\\lvert z_1 - z_2\\rvert$.",
      solution: "$z = \\frac{4 \\pm \\sqrt{16 - 52}}{2} = 2 \\pm 3i$. The distance is $\\lvert 6i\\rvert = 6$.",
      commonMistakes: [
        { answer: 3, feedback: "That is the distance from each root to the real axis. The roots are $2 + 3i$ and $2 - 3i$, $6$ apart." },
        { answer: 4, feedback: "4 is the sum of the roots. Their distance is the modulus of their difference." },
      ],
    },
    {
      type: "numeric",
      id: "cq5-7-q14",
      variant: "mastery",
      question: "Find the area enclosed by $\\lvert z - 2i\\rvert + \\lvert z + 2i\\rvert = 6$, to two decimal places.",
      answer: 21.0744,
      tolerance: 0.03,
      hint: "Ellipse with foci $\\pm 2i$: $A = 3$, $c = 2$. Area $\\pi AB$.",
      solution: "$B = \\sqrt{9 - 4} = \\sqrt5$, area $= 3\\sqrt5\\,\\pi \\approx 21.07$.",
      commonMistakes: [
        { answer: 28.274, tolerance: 0.03, feedback: "That is the circle of radius 3, $9\\pi$. The ellipse has $B = \\sqrt5 < 3$." },
        { answer: 84.298, tolerance: 0.05, feedback: "You used the full axes. Area is $\\pi$ times the semi-axes." },
      ],
    },
    {
      type: "numeric",
      id: "cq5-7-q15",
      variant: "mastery",
      question: "Course link. The sixth roots of $64$ are the vertices of a regular hexagon (Chapter 4). Find its area to two decimal places.",
      answer: 10.3923,
      tolerance: 0.01,
      hint: "The roots have modulus $64^{1/6} = 2$. A regular hexagon of circumradius $R$ is six equilateral triangles of side $R$.",
      solution: "$R = 2$, area $= 6 \\cdot \\frac{\\sqrt3}{4}\\cdot 2^2 = 6\\sqrt3 \\approx 10.39$.",
      commonMistakes: [
        { answer: 1.7321, tolerance: 0.01, feedback: "That is one equilateral triangle. The hexagon has six." },
        { answer: 41.569, tolerance: 0.02, feedback: "You took the circumradius as 4. The sixth roots of 64 have modulus $64^{1/6} = 2$." },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Where next",
      content:
        "You can now move freely between a geometric statement and a one-line complex equation. Coordinate geometry takes the same loci (lines, circles, parabolas, ellipses, hyperbolas) and studies them in $x$ and $y$: tangents, normals, chords of contact. Whenever a problem there involves rotations or equilateral triangles, come back to $e^{i\\theta}$: it is usually the shortest route.",
    },
  ]),
};

export const cqChapter5Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lessonMastery,
];
