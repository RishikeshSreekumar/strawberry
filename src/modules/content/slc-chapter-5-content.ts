import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Straight Lines and Circles Chapter 5 — Chords and Systems of Circles.
 * Three expressions do all the work: S (the circle), S₁ (S at a point, the
 * power of the point) and T (the tangent-like linear expression). The
 * chapter builds the chord with a given midpoint (T = S₁), the chord of
 * contact and the polar (T = 0), the director circle, two circles (relative
 * positions, common tangents, centres of similitude, common chord, angle of
 * intersection, orthogonality), the families S + λL = 0 and S + λS' = 0,
 * and the radical axis and radical centre, ending with JEE-style mastery.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "chord-with-a-given-midpoint-and-chord-of-contact",
  title: "5.1 · Chord With a Given Midpoint and Chord of Contact",
  position: 1,
  blocks: blocks([
    {
      type: "text",
      content:
        "In Chapter 4 you met three expressions built from a circle $S \\equiv x^2 + y^2 + 2gx + 2fy + c = 0$ and a point $P(x_1, y_1)$:\n\n- $S_1 = x_1^2 + y_1^2 + 2gx_1 + 2fy_1 + c$, the value of $S$ at $P$ (its sign says inside or outside, and it equals $CP^2 - r^2$)\n- $T = xx_1 + yy_1 + g(x + x_1) + f(y + y_1) + c$, which is linear in $x$ and $y$\n- $T = 0$, which is the tangent at $P$ **when $P$ is on the circle**",
    },
    {
      type: "text",
      content:
        "This chapter asks what $T = 0$ and $T = S_1$ mean when $P$ is **not** on the circle. The answers are two of the most used lines in JEE circle problems: the chord whose midpoint is $P$, and the chord joining the points where the tangents from $P$ touch the circle.",
    },
    { type: "heading", text: "The chord with a given midpoint" },
    {
      type: "text",
      content:
        "Draw a circle with centre $C$ and mark a point $M$ inside it. Of all the chords through $M$, exactly one has $M$ as its midpoint: the one **perpendicular to $CM$**. The reason is the symmetry of a circle: the perpendicular from the centre to any chord bisects it, so the midpoint of a chord is always the foot of the perpendicular from $C$.",
    },
    {
      type: "interactive",
      config: {
        component: "slc-circle-lab",
        mode: "tangents",
        centre: [0, 0],
        radius: { min: 1, max: 4.5, step: 0.25, initial: 3.5 },
        p: [1.5, 1],
        show: ["midpoint-chord", "polar"],
        draggable: ["p", "centre"],
        caption:
          "With $P$ inside the circle, the lab draws the chord with midpoint $P$ (it is always perpendicular to $CP$) and the polar of $P$, which lies outside the circle and is parallel to that chord. Drag $P$ towards the centre: the chord grows into a diameter and the polar runs away.",
      },
    },
    {
      type: "text",
      content:
        "Now turn the picture into an equation. With $M = (x_1, y_1)$ and $C = (-g, -f)$, the direction $\\overrightarrow{CM} = (x_1 + g,\\ y_1 + f)$ is a normal to the chord, so the chord is",
    },
    {
      type: "math",
      latex: "(x_1 + g)(x - x_1) + (y_1 + f)(y - y_1) = 0",
    },
    {
      type: "text",
      content:
        "Expand and add $g x_1 + f y_1 + c$ to both sides. The left side becomes $xx_1 + yy_1 + g(x + x_1) + f(y + y_1) + c = T$ and the right side becomes $x_1^2 + y_1^2 + 2gx_1 + 2fy_1 + c = S_1$:",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Chord with midpoint (x₁, y₁)",
      content:
        "The chord of $S = 0$ whose midpoint is $(x_1, y_1)$ is\n\n$$T = S_1$$\n\nFor $x^2 + y^2 = a^2$ this reads $xx_1 + yy_1 = x_1^2 + y_1^2$. Its length is $2\\sqrt{r^2 - CM^2}$, by Pythagoras in the right triangle formed by $C$, $M$ and an end of the chord.",
    },
    {
      type: "worked-example",
      id: "slc5-1-we1",
      title: "Worked example 1: chord bisected at a point",
      problem:
        "Find the chord of $x^2 + y^2 - 4x + 6y - 12 = 0$ whose midpoint is $(1, -1)$, and its length.",
      steps: [
        { text: "Read off $g = -2$, $f = 3$, $c = -12$: centre $(2, -3)$, $r^2 = 4 + 9 + 12 = 25$." },
        {
          text: "Build $T$ at $(1, -1)$: $T = x(1) + y(-1) - 2(x + 1) + 3(y - 1) - 12 = -x + 2y - 17$.",
        },
        { text: "$S_1 = 1 + 1 - 4 - 6 - 12 = -20$. *Why this step:* $S_1 < 0$ confirms $(1, -1)$ is inside, so such a chord exists." },
        { text: "$T = S_1$: $-x + 2y - 17 = -20$, that is $x - 2y - 3 = 0$." },
        {
          text: "Check the picture: $\\overrightarrow{CM} = (-1, 2)$ has slope $-2$, and the chord has slope $\\frac12$, perpendicular. Length: $CM^2 = 5$, so the length is $2\\sqrt{25 - 5} = 4\\sqrt5$.",
        },
      ],
      answer: "$x - 2y - 3 = 0$, of length $4\\sqrt5 \\approx 8.94$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the chord bisected at P is T = 0\"",
      content:
        "$T = 0$ passes through $(x_1, y_1)$ only when $S_1 = 0$, that is, only when the point is on the circle. For an interior point $M$, $T = 0$ is a line **outside** the circle (the polar, Lesson 5.2). The chord bisected at $M$ must pass through $M$, and $T = S_1$ does: substituting $(x_1, y_1)$ into $T$ gives exactly $S_1$.",
    },
    { type: "heading", text: "The chord of contact" },
    {
      type: "text",
      content:
        "From an external point $P$ draw the two tangents, touching the circle at $A$ and $B$. The segment $AB$ is the **chord of contact** of $P$. You might expect to need $A$ and $B$ to write its equation. You don't, and the reason is a beautiful piece of symmetry.",
    },
    {
      type: "interactive",
      config: {
        component: "slc-circle-lab",
        mode: "tangents",
        centre: [0, 0],
        radius: { min: 1, max: 4.5, step: 0.25, initial: 3 },
        p: [5, 0],
        show: ["tangents", "chord-of-contact"],
        draggable: ["p", "centre"],
        caption:
          "Drag $P$ around outside the circle. The two tangents, their length $\\sqrt{S_1}$ and the chord of contact $AB$ update live. Move $P$ far away and $AB$ approaches a diameter; bring $P$ close and $AB$ shrinks to a point.",
      },
    },
    {
      type: "text",
      content:
        "Let $A = (\\alpha, \\beta)$. The tangent at $A$ is $x\\alpha + y\\beta + g(x + \\alpha) + f(y + \\beta) + c = 0$, and it passes through $P(x_1, y_1)$:",
    },
    {
      type: "math",
      latex: "x_1\\alpha + y_1\\beta + g(x_1 + \\alpha) + f(y_1 + \\beta) + c = 0",
    },
    {
      type: "text",
      content:
        "Read this the other way round: it says the point $(\\alpha, \\beta)$ satisfies $xx_1 + yy_1 + g(x + x_1) + f(y + y_1) + c = 0$, which is the line $T = 0$. The same argument works for $B$. A line through both $A$ and $B$ is the line $AB$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Chord of contact from (x₁, y₁)",
      content:
        "The chord of contact of the tangents from $P(x_1, y_1)$ to $S = 0$ is\n\n$$T = 0$$\n\nWith $R$ the radius and $L = \\sqrt{S_1}$ the length of each tangent:\n\n- length of the chord of contact $= \\dfrac{2LR}{\\sqrt{L^2 + R^2}}$\n- area of triangle $PAB$ $= \\dfrac{RL^3}{R^2 + L^2}$\n- area of quadrilateral $PACB$ $= RL$, and $P, A, C, B$ lie on the circle with diameter $CP$",
    },
    {
      type: "text",
      content:
        "The formulas come from the right angle at $A$: triangle $CAP$ has legs $R$ and $L$ and hypotenuse $CP = \\sqrt{R^2 + L^2}$. The half-chord is the altitude to the hypotenuse, $\\frac{RL}{\\sqrt{R^2 + L^2}}$. The distance from $P$ to the chord is $\\frac{L^2}{\\sqrt{R^2 + L^2}}$ (the projection of $PA$ on $PC$). Half the base times the height gives the area.",
    },
    {
      type: "worked-example",
      id: "slc5-1-we2",
      title: "Worked example 2: chord of contact, its length and the triangle",
      problem:
        "Tangents are drawn from $P(4, 3)$ to $x^2 + y^2 = 9$, touching at $A$ and $B$. Find the chord of contact, its length and the area of triangle $PAB$.",
      steps: [
        { text: "$T = 0$: $4x + 3y = 9$." },
        { text: "$S_1 = 16 + 9 - 9 = 16$, so $L = 4$; and $R = 3$." },
        {
          text: "Length $= \\frac{2 \\cdot 4 \\cdot 3}{\\sqrt{16 + 9}} = \\frac{24}{5}$. *Why this step:* check it directly: the distance from $O$ to $4x + 3y = 9$ is $\\frac95$, and $2\\sqrt{9 - \\frac{81}{25}} = 2 \\cdot \\frac{12}{5}$, the same.",
        },
        { text: "Area $= \\frac{RL^3}{R^2 + L^2} = \\frac{3 \\cdot 64}{25} = \\frac{192}{25}$. Check: the distance from $P$ to the chord is $\\frac{16 + 9 - 9}{5} = \\frac{16}{5}$, and $\\frac12 \\cdot \\frac{24}{5} \\cdot \\frac{16}{5} = \\frac{192}{25}$." },
      ],
      answer: "$4x + 3y = 9$; length $\\frac{24}{5}$; area $\\frac{192}{25} = 7.68$.",
    },
    { type: "heading", text: "Loci of midpoints of chords" },
    {
      type: "text",
      content:
        "JEE loves to ask where the midpoints of a family of chords go. The method is always the same: call the midpoint $(h, k)$, write its chord as $T = S_1$, impose the condition on the chord, and replace $(h, k)$ by $(x, y)$. For $x^2 + y^2 = a^2$ the chord with midpoint $(h, k)$ is $hx + ky = h^2 + k^2$, at distance $\\sqrt{h^2 + k^2}$ from $O$.",
    },
    {
      type: "worked-example",
      id: "slc5-1-we3",
      title: "Worked example 3: midpoints of chords through a fixed point",
      problem:
        "Find the locus of the midpoints of the chords of $x^2 + y^2 = a^2$ that pass through a fixed point $(p, q)$.",
      steps: [
        { text: "The chord with midpoint $(h, k)$ is $hx + ky = h^2 + k^2$." },
        { text: "It passes through $(p, q)$: $hp + kq = h^2 + k^2$." },
        {
          text: "Replace $(h, k)$ by $(x, y)$: $x^2 + y^2 - px - qy = 0$. *Why this step:* the picture agrees: the midpoint $M$ sees $O$ and $(p, q)$ at a right angle ($OM \\perp$ chord), so $M$ lies on the circle with diameter from $O$ to $(p, q)$.",
        },
      ],
      answer: "$x^2 + y^2 - px - qy = 0$, the circle on the segment from the centre to $(p, q)$ as diameter.",
    },
    {
      type: "worked-example",
      id: "slc5-1-we4",
      title: "Worked example 4: chords of fixed length, chords subtending a right angle",
      problem:
        "For $x^2 + y^2 = a^2$, find the locus of the midpoints of (a) chords of length $2l$ and (b) chords that subtend a right angle at the centre.",
      steps: [
        {
          text: "(a) The midpoint is at distance $d$ from $O$ with $d^2 + l^2 = a^2$, so $h^2 + k^2 = a^2 - l^2$: the locus is $x^2 + y^2 = a^2 - l^2$. *Why this step:* the half-chord, the radius to its end and $OM$ form a right triangle.",
        },
        {
          text: "(b) A chord subtending $90^\\circ$ at $O$ makes an isosceles right triangle with two radii, so $OM = \\frac{a}{\\sqrt2}$: the locus is $x^2 + y^2 = \\frac{a^2}{2}$.",
        },
      ],
      answer: "(a) $x^2 + y^2 = a^2 - l^2$; (b) $x^2 + y^2 = \\frac{a^2}{2}$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "slc5-1-q1",
      variant: "practice",
      question: "The chord of $x^2 + y^2 = 16$ whose midpoint is $(1, 2)$ has equation $x + 2y = k$. Find $k$.",
      answer: 5,
      hint: "Use $T = S_1$ with $(x_1, y_1) = (1, 2)$: $x + 2y - 16 = 1 + 4 - 16$.",
      solution: "$T = x + 2y - 16$, $S_1 = 1 + 4 - 16 = -11$. So $x + 2y - 16 = -11$, i.e. $x + 2y = 5$. Check: $(1, 2)$ is on it.",
      commonMistakes: [
        { answer: 16, feedback: "That is $T = 0$, the polar of $(1, 2)$. It does not even pass through $(1, 2)$." },
        { answer: -11, feedback: "$-11$ is $S_1$. Set $T = S_1$ and simplify: the constants $-16$ and $-11$ combine to give $5$." },
      ],
    },
    {
      type: "quiz",
      id: "slc5-1-q2",
      variant: "practice",
      question: "The chord of $x^2 + y^2 - 2x + 4y - 20 = 0$ bisected at $(2, 1)$ is",
      options: [
        { text: "$x + 3y - 5 = 0$", correct: true, feedback: "$T = x + 3y - 20$, $S_1 = -15$, so $T = S_1$ gives $x + 3y = 5$. It is perpendicular to $\\overrightarrow{CM} = (1, 3)$." },
        { text: "$x + 3y - 20 = 0$", feedback: "That is $T = 0$, which misses $(2, 1)$: $2 + 3 - 20 \\ne 0$." },
        { text: "$3x - y - 5 = 0$", feedback: "This line passes through $(2, 1)$ and the centre $(1, -2)$: it is the diameter through $M$, perpendicular to the chord you want." },
        { text: "$x + 3y + 5 = 0$", feedback: "Sign slip: $(2, 1)$ gives $2 + 3 + 5 \\ne 0$." },
      ],
      hint: "Centre $(1, -2)$. The chord is perpendicular to $CM$, or use $T = S_1$ directly.",
    },
    {
      type: "numeric",
      id: "slc5-1-q3",
      variant: "practice",
      question: "Find the length of the chord of $x^2 + y^2 = 25$ whose midpoint is $(3, -1)$. Give the answer to two decimal places.",
      answer: 7.746,
      tolerance: 0.01,
      hint: "Length $= 2\\sqrt{r^2 - CM^2}$.",
      solution: "$CM^2 = 9 + 1 = 10$, so the length is $2\\sqrt{25 - 10} = 2\\sqrt{15} \\approx 7.75$.",
      commonMistakes: [
        { answer: 3.873, tolerance: 0.01, feedback: "$\\sqrt{15}$ is the half-chord. Double it." },
        { answer: 6, tolerance: 0.01, feedback: "$2\\sqrt{25 - 16}$ would need $CM = 4$. Here $CM^2 = 9 + 1 = 10$." },
      ],
    },
    {
      type: "numeric",
      id: "slc5-1-q4",
      variant: "practice",
      question:
        "Tangents are drawn from $(6, 8)$ to $x^2 + y^2 = 25$. Find the length of the chord of contact, to two decimal places.",
      answer: 8.66,
      tolerance: 0.01,
      hint: "$L = \\sqrt{S_1}$, $R = 5$, and the length is $\\frac{2LR}{\\sqrt{L^2 + R^2}}$. Or use the distance from $O$ to $6x + 8y = 25$.",
      solution: "$L^2 = 36 + 64 - 25 = 75$. Length $= \\frac{2 \\cdot 5\\sqrt3 \\cdot 5}{\\sqrt{100}} = 5\\sqrt3 \\approx 8.66$. Check: the chord $6x + 8y = 25$ is at distance $2.5$ from $O$, and $2\\sqrt{25 - 6.25} = 5\\sqrt3$.",
      commonMistakes: [
        { answer: 4.33, tolerance: 0.01, feedback: "That is the half-chord. Double it." },
        { answer: 17.32, tolerance: 0.01, feedback: "That is $2L$, twice the tangent length, not the chord." },
      ],
    },
    {
      type: "numeric",
      id: "slc5-1-q5",
      variant: "practice",
      question:
        "For the same point $(6, 8)$ and circle $x^2 + y^2 = 25$, find the area of the triangle formed by the two tangents and the chord of contact, to two decimal places.",
      answer: 32.476,
      tolerance: 0.01,
      hint: "Area $= \\frac{RL^3}{R^2 + L^2}$, or half the chord times the distance from $P$ to the chord.",
      solution: "$\\frac{5 \\cdot (5\\sqrt3)^3}{25 + 75} = \\frac{5 \\cdot 375\\sqrt3}{100} = \\frac{75\\sqrt3}{4} \\approx 32.48$. Check: distance from $P$ to $6x + 8y = 25$ is $\\frac{75}{10} = 7.5$, and $\\frac12 \\cdot 5\\sqrt3 \\cdot 7.5$ agrees.",
      commonMistakes: [
        { answer: 43.3, tolerance: 0.05, feedback: "$RL = 25\\sqrt3 \\approx 43.3$ is the area of the quadrilateral $PACB$ (kite with the centre), not of triangle $PAB$." },
        { answer: 10.83, tolerance: 0.05, feedback: "That is the area of triangle $OAB$: it uses the distance from $O$ to the chord. Use the distance from $P$ to the chord, $7.5$." },
      ],
    },
    {
      type: "quiz",
      id: "slc5-1-q6",
      variant: "practice",
      question: "The locus of the midpoints of the chords of $x^2 + y^2 = 9$ that have length 4 is",
      options: [
        { text: "$x^2 + y^2 = 5$", correct: true, feedback: "Half-chord 2, radius 3, so the distance from $O$ is $\\sqrt{9 - 4} = \\sqrt5$." },
        { text: "$x^2 + y^2 = 4$", feedback: "That puts the midpoint at distance 2, which is the half-chord, not the distance from the centre." },
        { text: "$x^2 + y^2 = 1$", feedback: "That subtracts the full length 4 from 3 and squares. Use $d^2 = r^2 - (\\text{half-chord})^2 = 9 - 4$." },
        { text: "$x^2 + y^2 = 13$", feedback: "$9 + 4$ would put the midpoints outside the circle." },
      ],
      hint: "Right triangle: (distance from centre)$^2$ + (half-chord)$^2$ = $r^2$.",
    },
    {
      type: "quiz",
      id: "slc5-1-q7",
      variant: "concept",
      question:
        "$M(x_1, y_1)$ is a point strictly inside the circle $S = 0$ (other than the centre). Which line is the chord bisected at $M$?",
      options: [
        { text: "$T = S_1$, the line through $M$ perpendicular to $CM$", correct: true, feedback: "Substituting $M$ into $T$ gives $S_1$, so $M$ is on it, and its normal is $\\overrightarrow{CM}$." },
        { text: "$T = 0$", feedback: "$T = 0$ passes through $M$ only when $S_1 = 0$. For an interior point it is the polar, which misses the circle entirely." },
        { text: "The line $CM$", feedback: "$CM$ is a diameter through $M$. Its midpoint is $C$, not $M$." },
        { text: "$S = S_1$", feedback: "$S = S_1$ is a circle concentric with $S$, through $M$, not a line." },
      ],
      hint: "The chord must pass through $M$. Which of these lines is satisfied by $(x_1, y_1)$?",
    },
    {
      type: "quiz",
      id: "slc5-1-q8",
      variant: "practice",
      multiple: true,
      question:
        "Tangents are drawn from $P(5, 0)$ to $x^2 + y^2 = 9$, touching it at $A$ and $B$; $O$ is the origin. Which statements are true? Select all that apply.",
      options: [
        { text: "The chord of contact is $x = \\frac95$", correct: true, feedback: "$T = 0$: $5x = 9$." },
        { text: "$AB = \\frac{24}{5}$", correct: true, feedback: "$L = 4$, $R = 3$: $\\frac{2 \\cdot 4 \\cdot 3}{5} = \\frac{24}{5}$." },
        { text: "$O$, $A$, $P$, $B$ lie on one circle", correct: true, feedback: "$\\angle OAP = \\angle OBP = 90^\\circ$, so both lie on the circle with diameter $OP$." },
        { text: "The tangents are perpendicular", feedback: "That needs $OP = 3\\sqrt2 \\approx 4.24$. Here $OP = 5$, so the angle is $2\\tan^{-1}\\frac34 \\approx 73.7^\\circ$." },
        { text: "Each tangent has length 5", feedback: "$L = \\sqrt{25 - 9} = 4$. 5 is $OP$." },
      ],
      hint: "Work out $L = \\sqrt{S_1}$ first, then use the right angles at $A$ and $B$.",
    },
    {
      type: "numeric",
      id: "slc5-1-q9",
      variant: "practice",
      question:
        "JEE Main. Tangents are drawn to $x^2 + y^2 = 16$ from every point of the circle $x^2 + y^2 = 64$. The chords of contact all touch a fixed circle $x^2 + y^2 = r^2$. Find $r$.",
      answer: 2,
      hint: "Take the point $(8\\cos\\theta, 8\\sin\\theta)$. Its chord of contact is $8x\\cos\\theta + 8y\\sin\\theta = 16$. How far is that line from $O$?",
      solution: "The distance from $O$ to $x\\cos\\theta + y\\sin\\theta = 2$ is $2$ for every $\\theta$, so every chord of contact touches $x^2 + y^2 = 4$. In general the radii $a$, $b$, $c$ satisfy $b^2 = ac$: here $16 = 8 \\cdot 2$.",
      commonMistakes: [
        { answer: 4, feedback: "4 is the radius of the circle being touched by the tangents, not of the envelope of the chords." },
        { answer: 8, feedback: "The chords lie inside the circle of radius 4. Compute the distance $\\frac{16}{8}$." },
      ],
    },
    {
      type: "numeric",
      id: "slc5-1-q10",
      variant: "practice",
      question:
        "The midpoints of the chords of $x^2 + y^2 = 16$ that subtend a right angle at the centre lie on $x^2 + y^2 = k$. Find $k$.",
      answer: 8,
      hint: "The chord and two radii form an isosceles right triangle. How far is the midpoint of its hypotenuse from the right-angle vertex?",
      solution: "The midpoint of the hypotenuse is at distance $\\frac{4}{\\sqrt2} = 2\\sqrt2$ from $O$, so $k = 8$.",
      commonMistakes: [
        { answer: 16, feedback: "That is the circle itself. The midpoints are strictly inside." },
        { answer: 4, feedback: "4 would mean distance 2 from $O$. The distance is $\\frac{4}{\\sqrt2} = 2\\sqrt2$, whose square is 8." },
      ],
    },
    {
      type: "quiz",
      id: "slc5-1-q11",
      variant: "practice",
      question:
        "JEE Main. The locus of the midpoints of the chords of $x^2 + y^2 - 2x - 2y - 2 = 0$ that pass through the origin is",
      options: [
        { text: "$x^2 + y^2 - x - y = 0$", correct: true, feedback: "Centre $C(1, 1)$. The midpoint $M$ sees $O$ and $C$ at a right angle, so $M$ lies on the circle with diameter $OC$: $x(x - 1) + y(y - 1) = 0$." },
        { text: "$x^2 + y^2 - 2x - 2y = 0$", feedback: "That is the circle through $O$ concentric with the given one. Use the condition $CM \\perp OM$." },
        { text: "$x + y = 1$", feedback: "The locus of midpoints of chords through a fixed point is a circle, not a line." },
        { text: "$x^2 + y^2 + x + y = 0$", feedback: "Signs: the diameter runs from $(0, 0)$ to $(1, 1)$, so the centre of the locus is $(\\frac12, \\frac12)$." },
      ],
      hint: "With midpoint $(h, k)$, the chord is $T = S_1$. Make it pass through $(0, 0)$.",
    },
    {
      type: "quiz",
      id: "slc5-1-q12",
      variant: "practice",
      multiple: true,
      question:
        "JEE Advanced. From an external point $P$, tangents $PA$ and $PB$ are drawn to a circle with centre $C$ and radius $R$; the tangent length is $L$. Which statements are true for every such $P$? Select all that apply.",
      options: [
        { text: "$CP$ is the perpendicular bisector of $AB$", correct: true, feedback: "$PA = PB$ and $CA = CB$, so both $P$ and $C$ are on the perpendicular bisector of $AB$." },
        { text: "Area of quadrilateral $PACB = RL$", correct: true, feedback: "It is two right triangles with legs $R$ and $L$." },
        { text: "$AB = \\dfrac{2RL}{\\sqrt{R^2 + L^2}}$", correct: true, feedback: "The half-chord is the altitude to the hypotenuse $CP$ in triangle $CAP$." },
        { text: "$AB = 2L$", feedback: "$AB < PA + PB = 2L$ by the triangle inequality." },
        { text: "The chord of contact passes through $C$", feedback: "It passes through $C$ only in the limit $P \\to \\infty$. Its distance from $C$ is $\\frac{R^2}{CP} > 0$." },
      ],
      hint: "Everything follows from the right angles $\\angle CAP = \\angle CBP = 90^\\circ$ and the symmetry about $CP$.",
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "pole-and-polar-and-the-director-circle",
  title: "5.2 · Pole and Polar; the Director Circle",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "Lesson 5.1 gave $T = 0$ a meaning for an external point: the chord of contact. For a point on the circle it is the tangent. What about a point **inside**, where there are no tangents to draw? The equation $T = 0$ still describes a perfectly good line. This lesson names it (the **polar**), finds what it means geometrically, and then uses tangents in a different way to build the **director circle**.",
    },
    { type: "heading", text: "The polar of a point" },
    {
      type: "callout",
      variant: "definition",
      title: "Polar and pole",
      content:
        "The **polar** of $P(x_1, y_1)$ with respect to $S = 0$ is the line $T = 0$, wherever $P$ is. If a line is the polar of $P$, then $P$ is the **pole** of that line.\n\n- $P$ outside: the polar is the chord of contact of $P$\n- $P$ on the circle: the polar is the tangent at $P$\n- $P$ inside: the polar lies entirely outside the circle\n- $P$ at the centre: there is no polar ($T = 0$ reduces to $g^2 + f^2 - c = 0$, which is false)",
    },
    {
      type: "text",
      content:
        "For $x^2 + y^2 = a^2$ the polar of $P$ is $xx_1 + yy_1 = a^2$. Two facts are visible at once:\n\n1. Its normal is $(x_1, y_1)$, so the polar is **perpendicular to $OP$**.\n2. Its distance from $O$ is $\\frac{a^2}{\\sqrt{x_1^2 + y_1^2}} = \\frac{a^2}{OP}$. So if $P$ is at distance $d$, the polar crosses the line $OP$ at distance $\\frac{a^2}{d}$ on the same side. A point near the centre has a far-away polar; a point on the circle has its tangent as polar.",
    },
    {
      type: "interactive",
      config: {
        component: "slc-circle-lab",
        mode: "tangents",
        centre: [0, 0],
        radius: { min: 1, max: 4, step: 0.25, initial: 2.5 },
        p: [1, 1],
        show: ["polar", "midpoint-chord", "chord-of-contact", "tangents"],
        draggable: ["p"],
        caption:
          "Drag $P$ from inside the circle to outside. Inside, the polar sits outside the circle, parallel to the chord bisected at $P$. As $P$ crosses the circle the polar becomes the tangent, and outside it becomes the chord of contact. It is always perpendicular to $OP$, at distance $\\frac{r^2}{OP}$ from the centre.",
      },
    },
    {
      type: "text",
      content:
        "There is a geometric meaning for an interior point too. Take any chord through $P$ and draw the tangents at its two ends; they meet at a point $Q$. The chord is the chord of contact of $Q$, so it is $T_Q = 0$, and it passes through $P$. By the symmetry of $T$ (swap the roles of $(x, y)$ and $(x_1, y_1)$), $Q$ lies on $T_P = 0$. So the polar of $P$ is the locus of the meeting points of tangents at the ends of chords through $P$.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Conjugate points",
      content:
        "If $Q$ lies on the polar of $P$, then $P$ lies on the polar of $Q$: both statements are the single symmetric equation $x_1x_2 + y_1y_2 + g(x_1 + x_2) + f(y_1 + y_2) + c = 0$. Such $P$ and $Q$ are called **conjugate points**. For $x^2 + y^2 = a^2$ the condition is $x_1x_2 + y_1y_2 = a^2$.",
    },
    {
      type: "worked-example",
      id: "slc5-2-we1",
      title: "Worked example 1: the polar of an interior point",
      problem: "Find the polar of $(1, -1)$ with respect to $x^2 + y^2 = 9$ and its distance from the centre.",
      steps: [
        { text: "$T = 0$: $x(1) + y(-1) = 9$, that is $x - y = 9$." },
        {
          text: "Distance from $O$: $\\frac{9}{\\sqrt2} \\approx 6.36$. *Why this step:* it agrees with $\\frac{a^2}{OP} = \\frac{9}{\\sqrt2}$, and it is greater than 3, so the polar of this interior point misses the circle.",
        },
      ],
      answer: "$x - y = 9$, at distance $\\frac{9}{\\sqrt2}$ from the centre.",
    },
    { type: "heading", text: "Finding the pole of a line" },
    {
      type: "text",
      content:
        "To find the pole of a given line, write the polar of an unknown point $(h, k)$ and make it **proportional** to the given equation. For $x^2 + y^2 = a^2$ and the line $lx + my + n = 0$: $hx + ky - a^2 = 0$ must be a multiple of $lx + my + n = 0$, so $\\frac{h}{l} = \\frac{k}{m} = \\frac{-a^2}{n}$.",
    },
    {
      type: "worked-example",
      id: "slc5-2-we2",
      title: "Worked example 2: pole with respect to the standard circle",
      problem: "Find the pole of $2x + y = 5$ with respect to $x^2 + y^2 = 10$.",
      steps: [
        { text: "The polar of $(h, k)$ is $hx + ky = 10$." },
        { text: "Compare with $2x + y = 5$: $\\frac{h}{2} = \\frac{k}{1} = \\frac{10}{5} = 2$." },
        { text: "So $(h, k) = (4, 2)$. Check: the polar of $(4, 2)$ is $4x + 2y = 10$, which is $2x + y = 5$." },
      ],
      answer: "$(4, 2)$.",
    },
    {
      type: "worked-example",
      id: "slc5-2-we3",
      title: "Worked example 3: pole with respect to a general circle",
      problem: "Find the pole of $x + y = 2$ with respect to $x^2 + y^2 - 2x + 4y - 4 = 0$.",
      steps: [
        {
          text: "Polar of $(h, k)$: $xh + yk - (x + h) + 2(y + k) - 4 = 0$, i.e. $(h - 1)x + (k + 2)y + (-h + 2k - 4) = 0$.",
        },
        { text: "Proportional to $x + y - 2 = 0$: $h - 1 = \\lambda$, $k + 2 = \\lambda$, $-h + 2k - 4 = -2\\lambda$." },
        {
          text: "Substitute $h = 1 + \\lambda$, $k = \\lambda - 2$: $-1 - \\lambda + 2\\lambda - 4 - 4 = -2\\lambda$, so $\\lambda - 9 = -2\\lambda$ and $\\lambda = 3$. *Why this step:* one unknown multiplier turns three proportionality conditions into one linear equation.",
        },
        { text: "Pole $(4, 1)$. Check: its polar is $3x + 3y - 6 = 0$, i.e. $x + y = 2$." },
      ],
      answer: "$(4, 1)$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a polar exists only for external points\"",
      content:
        "Every point except the centre has a polar. For an external point it happens to be the chord of contact, which is why the two are often confused; for an interior point there are no tangents, but $T = 0$ is still a real line (outside the circle). Questions that say \"polar\" never require the point to be outside.",
    },
    { type: "heading", text: "The director circle" },
    {
      type: "text",
      content:
        "From which points are the two tangents to $x^2 + y^2 = a^2$ **perpendicular**? If $PA \\perp PB$, then $OAPB$ has four right angles and two adjacent sides $OA = OB = a$: it is a square. Its diagonal $OP$ is $a\\sqrt2$. So the points form the circle $x^2 + y^2 = 2a^2$.",
    },
    {
      type: "text",
      content:
        "The algebra confirms it. A tangent of slope $m$ is $y = mx \\pm a\\sqrt{1 + m^2}$. Through $(h, k)$: $(k - mh)^2 = a^2(1 + m^2)$, a quadratic in $m$:",
    },
    {
      type: "math",
      latex: "(h^2 - a^2)m^2 - 2hk\\,m + (k^2 - a^2) = 0",
    },
    {
      type: "text",
      content:
        "Its two roots are the slopes of the two tangents. Perpendicular means $m_1m_2 = -1$, i.e. $\\frac{k^2 - a^2}{h^2 - a^2} = -1$, which gives $h^2 + k^2 = 2a^2$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Director circle",
      content:
        "The **director circle** of a circle is the locus of points from which the two tangents are perpendicular. It is concentric with the circle and has radius $\\sqrt2$ times as large:\n\n- for $x^2 + y^2 = a^2$: $x^2 + y^2 = 2a^2$\n- for $(x - h)^2 + (y - k)^2 = r^2$: $(x - h)^2 + (y - k)^2 = 2r^2$",
    },
    {
      type: "interactive",
      config: {
        component: "slc-circle-lab",
        mode: "tangents",
        centre: [0, 0],
        radius: { min: 1, max: 3.5, step: 0.25, initial: 2.5 },
        p: [2.5, 2.5],
        show: ["tangents", "chord-of-contact", "director-circle"],
        draggable: ["p", "centre"],
        caption:
          "$P$ starts on the director circle (dashed), where the tangents meet at a right angle. Slide it along the dashed circle: the angle stays $90^\\circ$. Move it off the dashed circle and the angle changes.",
      },
    },
    {
      type: "worked-example",
      id: "slc5-2-we4",
      title: "Worked example 4: director circle of a general circle",
      problem: "Find the director circle of $x^2 + y^2 - 4x + 6y - 3 = 0$.",
      steps: [
        { text: "Centre $(2, -3)$, $r^2 = 4 + 9 + 3 = 16$." },
        { text: "Director circle: same centre, radius squared $2r^2 = 32$: $(x - 2)^2 + (y + 3)^2 = 32$. *Why this step:* the square $OAPB$ argument only used the centre and the radius, so it shifts with the circle." },
        { text: "Expand: $x^2 + y^2 - 4x + 6y + 13 - 32 = 0$." },
      ],
      answer: "$x^2 + y^2 - 4x + 6y - 19 = 0$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "slc5-2-q1",
      variant: "practice",
      question: "The polar of $(3, -2)$ with respect to $x^2 + y^2 = 4$ is",
      options: [
        { text: "$3x - 2y = 4$", correct: true, feedback: "$T = 0$: $3x + (-2)y = 4$." },
        { text: "$3x - 2y = 13$", feedback: "13 is $OP^2$. The right side of $xx_1 + yy_1 = a^2$ is $a^2 = 4$." },
        { text: "$2x + 3y = 4$", feedback: "That line is parallel to $OP$. The polar is perpendicular to $OP$, with normal $(3, -2)$." },
        { text: "$3x - 2y + 4 = 0$", feedback: "Sign slip: $T = xx_1 + yy_1 - a^2$, so the constant is $-4$." },
      ],
      hint: "For $x^2 + y^2 = a^2$ the polar of $(x_1, y_1)$ is $xx_1 + yy_1 = a^2$.",
    },
    {
      type: "numeric",
      id: "slc5-2-q2",
      variant: "practice",
      question: "The pole of $3x + 4y = 5$ with respect to $x^2 + y^2 = 25$ is $(h, k)$. Find $h + k$.",
      answer: 35,
      hint: "$hx + ky = 25$ must be a multiple of $3x + 4y = 5$: $\\frac h3 = \\frac k4 = \\frac{25}{5}$.",
      solution: "The ratio is 5, so $(h, k) = (15, 20)$ and $h + k = 35$. The line is close to the centre (distance 1), so its pole is far away (distance $\\frac{25}{1} = 25$).",
      commonMistakes: [
        { answer: 1.4, tolerance: 0.01, feedback: "That uses the ratio $\\frac{5}{25}$ upside down: $(\\frac35, \\frac45)$. The polar of that point is $3x + 4y = 125$." },
        { answer: -35, feedback: "Sign slip: both equations have the constant on the right with the same sign, so the ratio is $+5$." },
      ],
    },
    {
      type: "numeric",
      id: "slc5-2-q3",
      variant: "practice",
      question: "The points $(1, 2)$ and $(k, 3)$ are conjugate with respect to $x^2 + y^2 = 11$. Find $k$.",
      answer: 5,
      hint: "Conjugate: $x_1x_2 + y_1y_2 = a^2$.",
      solution: "$1 \\cdot k + 2 \\cdot 3 = 11$ gives $k = 5$. Check: the polar of $(1, 2)$ is $x + 2y = 11$, and $(5, 3)$ lies on it.",
      commonMistakes: [
        { answer: 17, feedback: "Move the 6 across with a minus sign: $k = 11 - 6$." },
        { answer: -5, feedback: "Sign slip: $k + 6 = 11$." },
      ],
    },
    {
      type: "numeric",
      id: "slc5-2-q4",
      variant: "practice",
      question: "The director circle of $x^2 + y^2 - 6x + 8y + 16 = 0$ has radius $\\rho$. Find $\\rho^2$.",
      answer: 18,
      hint: "Find $r^2$ of the given circle first; the director circle has radius $r\\sqrt2$.",
      solution: "Centre $(3, -4)$, $r^2 = 9 + 16 - 16 = 9$. So $\\rho^2 = 2r^2 = 18$.",
      commonMistakes: [
        { answer: 9, feedback: "That is the given circle's $r^2$. Double it." },
        { answer: 36, feedback: "That is $(2r)^2$. The director radius is $r\\sqrt2$, not $2r$." },
      ],
    },
    {
      type: "quiz",
      id: "slc5-2-q5",
      variant: "concept",
      question: "$P$ is a point strictly inside a circle, not at the centre. Its polar",
      options: [
        { text: "lies entirely outside the circle, perpendicular to $CP$", correct: true, feedback: "Its distance from $C$ is $\\frac{r^2}{CP} > r$ since $CP < r$." },
        { text: "is the chord bisected at $P$", feedback: "That chord is $T = S_1$. The polar $T = 0$ is parallel to it but outside the circle." },
        { text: "passes through $P$", feedback: "Substituting $P$ into $T$ gives $S_1 < 0$, not 0. $P$ is not on its own polar." },
        { text: "does not exist", feedback: "Only the centre has no polar. Any other interior point has one." },
      ],
      hint: "Compare the distance of the polar from the centre, $\\frac{r^2}{CP}$, with $r$.",
    },
    {
      type: "numeric",
      id: "slc5-2-q6",
      variant: "practice",
      question:
        "Find the distance of the polar of $(1, 1)$ with respect to $x^2 + y^2 = 8$ from the origin, to two decimal places.",
      answer: 5.657,
      tolerance: 0.01,
      hint: "The polar is $x + y = 8$. Or use $\\frac{a^2}{OP}$.",
      solution: "$\\frac{8}{\\sqrt2} = 4\\sqrt2 \\approx 5.66$, and $\\frac{a^2}{OP} = \\frac{8}{\\sqrt2}$ agrees.",
      commonMistakes: [
        { answer: 1.414, tolerance: 0.01, feedback: "That is $OP$, the distance of the point itself." },
        { answer: 8, feedback: "Divide by $\\sqrt{1^2 + 1^2}$: the distance from $O$ to $x + y = 8$ is $\\frac{8}{\\sqrt2}$." },
      ],
    },
    {
      type: "quiz",
      id: "slc5-2-q7",
      variant: "practice",
      multiple: true,
      question: "For the circle $x^2 + y^2 = a^2$ and a point $P \\ne O$, which statements about the polar of $P$ are true? Select all that apply.",
      options: [
        { text: "It is perpendicular to $OP$", correct: true, feedback: "Its normal vector is $(x_1, y_1)$, the direction of $OP$." },
        { text: "Its distance from $O$ is $\\frac{a^2}{OP}$", correct: true, feedback: "$\\frac{a^2}{\\sqrt{x_1^2 + y_1^2}}$." },
        { text: "If $P$ is on the circle, it is the tangent at $P$", correct: true, feedback: "Then $T = 0$ is exactly the tangent." },
        { text: "It always passes through $P$", feedback: "Only when $P$ is on the circle ($S_1 = 0$)." },
        { text: "Moving $P$ closer to $O$ moves the polar closer to $O$", feedback: "The distance $\\frac{a^2}{OP}$ grows as $OP$ shrinks." },
      ],
      hint: "Write the polar $xx_1 + yy_1 = a^2$ and read off its normal and its distance from $O$.",
    },
    {
      type: "numeric",
      id: "slc5-2-q8",
      variant: "practice",
      question:
        "The two tangents from $(h, 3)$ to $x^2 + y^2 = 9$ are perpendicular, and $h > 0$. Find $h$.",
      answer: 3,
      hint: "The point must lie on the director circle $x^2 + y^2 = 18$.",
      solution: "$h^2 + 9 = 18$ gives $h = 3$ (taking $h > 0$). Check: from $(3, 3)$ the tangents are $x = 3$ and $y = 3$, which are perpendicular.",
      commonMistakes: [
        { answer: 0, feedback: "That puts the point on the circle itself ($h^2 + 9 = 9$). Use the director circle, radius squared $2a^2 = 18$." },
        { answer: 9, feedback: "$h^2 = 9$, so $h = 3$." },
      ],
    },
    {
      type: "quiz",
      id: "slc5-2-q9",
      variant: "practice",
      question: "JEE Main. The pole of $x + y = 4$ with respect to $x^2 + y^2 + 2x - 4y - 4 = 0$ is",
      options: [
        { text: "$(2, 5)$", correct: true, feedback: "Polar of $(h, k)$: $(h + 1)x + (k - 2)y + (h - 2k - 4) = 0$. Proportional to $x + y - 4$ gives $h + 1 = k - 2 = \\lambda$ and $\\lambda = 3$: $(2, 5)$." },
        { text: "$(-4, -1)$", feedback: "That is the centre minus $3(1, 1)$. Check: the polar of $(-4, -1)$ is $-3x - 3y - 6 = 0$, i.e. $x + y = -2$." },
        { text: "$(4, 4)$", feedback: "The polar of $(4, 4)$ is $5x + 2y - 8 = 0$, not parallel to $x + y = 4$." },
        { text: "$(1, 3)$", feedback: "$(1, 3)$ lies on $x + y = 4$; a point on its own polar would have to be on the circle, and $S(1, 3) = -4 \\ne 0$." },
      ],
      hint: "Write the polar of $(h, k)$ as $T = 0$, group the $x$, $y$ and constant terms, and make them proportional to $1 : 1 : -4$.",
    },
    {
      type: "quiz",
      id: "slc5-2-q10",
      variant: "practice",
      multiple: true,
      question:
        "JEE Advanced. $P$ is a point on the director circle of $x^2 + y^2 = a^2$, and $PA$, $PB$ are the tangents from $P$. Which statements are true? Select all that apply.",
      options: [
        { text: "$\\angle APB = 90^\\circ$", correct: true, feedback: "That is the definition of the director circle." },
        { text: "$OAPB$ is a square of side $a$", correct: true, feedback: "Four right angles and $OA = OB = a$." },
        { text: "The chord of contact $AB$ touches $x^2 + y^2 = \\frac{a^2}{2}$", correct: true, feedback: "Its distance from $O$ is $\\frac{a^2}{OP} = \\frac{a^2}{a\\sqrt2} = \\frac{a}{\\sqrt2}$." },
        { text: "The director circle of $(x - h)^2 + (y - k)^2 = r^2$ is $(x - h)^2 + (y - k)^2 = 2r$", feedback: "The radius is $r\\sqrt2$, so the right side is $2r^2$." },
        { text: "The tangent length from $P$ is $a\\sqrt2$", feedback: "$L = \\sqrt{OP^2 - a^2} = \\sqrt{2a^2 - a^2} = a$." },
      ],
      hint: "Draw the square $OAPB$. Everything is in that picture.",
    },
    {
      type: "numeric",
      id: "slc5-2-q11",
      variant: "practice",
      question:
        "The locus of the point of intersection of perpendicular tangents to $x^2 + y^2 - 4x - 2y - 4 = 0$ is $x^2 + y^2 - 4x - 2y + c = 0$. Find $c$.",
      answer: -13,
      hint: "Centre $(2, 1)$, $r^2 = 9$. The director circle has the same centre and radius squared 18.",
      solution: "$(x - 2)^2 + (y - 1)^2 = 18$ expands to $x^2 + y^2 - 4x - 2y + 5 - 18 = 0$, so $c = -13$.",
      commonMistakes: [
        { answer: -4, feedback: "That is the original circle. The director circle has radius squared $2 \\cdot 9 = 18$." },
        { answer: -8, feedback: "Doubling the constant term does not double $r^2$. Write the centre-radius form first." },
      ],
    },
    {
      type: "numeric",
      id: "slc5-2-q12",
      variant: "practice",
      question:
        "JEE Advanced. The poles, with respect to $x^2 + y^2 = 16$, of all the tangents to $x^2 + y^2 = 4$ lie on a circle $x^2 + y^2 = k$. Find $k$.",
      answer: 64,
      hint: "The polar of $(h, k)$ is $hx + ky = 16$. Make its distance from $O$ equal to 2.",
      solution: "$\\frac{16}{\\sqrt{h^2 + k^2}} = 2$ gives $h^2 + k^2 = 64$. In general the locus is $x^2 + y^2 = \\frac{a^4}{b^2}$.",
      commonMistakes: [
        { answer: 8, feedback: "That is the radius. The question asks for $k = \\text{radius}^2 = 64$." },
        { answer: 4, feedback: "The poles of tangents to a smaller circle lie on a bigger circle, of radius $\\frac{16}{2} = 8$." },
      ],
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "two-circles-and-their-common-tangents",
  title: "5.3 · Two Circles and Their Common Tangents",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "Put two coins on a table and slide one towards the other. Far apart, you can lay a ruler along four different lines that touch both coins. When the coins touch, two of those lines merge into one. When one coin overlaps the other, only two remain, and so on until one coin sits inside the other and no line touches both. The whole story is told by three numbers: the distance $d$ between the centres and the radii $r_1$, $r_2$.",
    },
    { type: "heading", text: "Five relative positions" },
    {
      type: "table",
      headers: ["Condition", "Position", "Common tangents"],
      rows: [
        ["$d > r_1 + r_2$", "separate (each outside the other)", "4: two direct, two transverse"],
        ["$d = r_1 + r_2$", "touch externally", "3: two direct, one at the point of contact"],
        ["$\\lvert r_1 - r_2\\rvert < d < r_1 + r_2$", "intersect at two points", "2: both direct"],
        ["$d = \\lvert r_1 - r_2\\rvert$", "touch internally", "1: at the point of contact"],
        ["$d < \\lvert r_1 - r_2\\rvert$", "one inside the other", "0"],
      ],
    },
    {
      type: "text",
      content:
        "The two boundary numbers have a picture. $r_1 + r_2$ is the distance at which the circles touch from outside; $\\lvert r_1 - r_2\\rvert$ is the distance at which the smaller circle touches the bigger one from inside. Between those the circles cross. A **direct** (external) common tangent has both circles on the same side; a **transverse** (internal) one passes between them, so it only exists when there is a gap between the circles.",
    },
    {
      type: "interactive",
      config: {
        component: "slc-circle-lab",
        mode: "two-circles",
        centre: [-2, 0],
        radius: { min: 0.5, max: 4, step: 0.25, initial: 1.5 },
        centre2: [2.5, 0.5],
        radius2: { min: 0.5, max: 4, step: 0.25, initial: 2 },
        show: ["common-tangents"],
        draggable: ["centre", "centre2"],
        caption:
          "Drag the second centre towards the first and watch the count of common tangents drop $4 \\to 3 \\to 2 \\to 1 \\to 0$. The readout compares $d$ with $r_1 + r_2$ and $\\lvert r_1 - r_2\\rvert$ at every step. Try making the radii equal: the direct tangents become parallel.",
      },
    },
    {
      type: "worked-example",
      id: "slc5-3-we1",
      title: "Worked example 1: classify a pair of circles",
      problem: "How many common tangents do $x^2 + y^2 = 4$ and $x^2 + y^2 - 8x + 7 = 0$ have?",
      steps: [
        { text: "First circle: centre $(0, 0)$, $r_1 = 2$. Second: centre $(4, 0)$, $r_2 = \\sqrt{16 - 7} = 3$." },
        { text: "$d = 4$, $r_1 + r_2 = 5$, $\\lvert r_1 - r_2\\rvert = 1$. *Why this step:* never guess from the equations; compute the three numbers and compare." },
        { text: "$1 < 4 < 5$: the circles intersect, so there are 2 common tangents." },
      ],
      answer: "2 (the circles intersect).",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"touching circles have two common tangents\"",
      content:
        "Externally touching circles have **three**: the two direct tangents survive, and the two transverse tangents merge into the single tangent at the point of contact. Internally touching circles have just **one**. Count by imagining the coins, not by assuming \"touching\" means \"tangent\" singular.",
    },
    { type: "heading", text: "Centres of similitude" },
    {
      type: "text",
      content:
        "Where do the common tangents cross the line of centres? Take a direct tangent touching the circles at $A_1$ and $A_2$ and meeting $C_1C_2$ at $E$. The radii $C_1A_1$ and $C_2A_2$ are both perpendicular to the tangent, so triangles $EC_1A_1$ and $EC_2A_2$ are similar, and $\\frac{EC_1}{EC_2} = \\frac{r_1}{r_2}$. The same holds for a transverse tangent, with the meeting point $I$ between the centres.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Centres of similitude and tangent lengths",
      content:
        "- The two direct common tangents meet at the **external centre of similitude** $E$, which divides $C_1C_2$ **externally** in the ratio $r_1 : r_2$.\n- The two transverse common tangents meet at the **internal centre of similitude** $I$, which divides $C_1C_2$ **internally** in the ratio $r_1 : r_2$.\n- Length of a direct common tangent (between the points of contact): $\\sqrt{d^2 - (r_1 - r_2)^2}$.\n- Length of a transverse common tangent: $\\sqrt{d^2 - (r_1 + r_2)^2}$.",
    },
    {
      type: "text",
      content:
        "The lengths are Pythagoras. Slide the direct tangent segment $A_1A_2$ parallel to itself until $A_1$ lands on $C_1$: it becomes one leg of a right triangle with hypotenuse $d$ and other leg $r_1 - r_2$. For the transverse tangent the other leg is $r_1 + r_2$, which is why that tangent exists only when $d > r_1 + r_2$.",
    },
    {
      type: "worked-example",
      id: "slc5-3-we2",
      title: "Worked example 2: lengths and centres of similitude",
      problem:
        "For $x^2 + y^2 = 4$ and $(x - 6)^2 + y^2 = 1$, find the lengths of the direct and transverse common tangents and both centres of similitude.",
      steps: [
        { text: "$d = 6$, $r_1 = 2$, $r_2 = 1$; $d > r_1 + r_2 = 3$, so there are four common tangents." },
        { text: "Direct: $\\sqrt{36 - 1} = \\sqrt{35}$. Transverse: $\\sqrt{36 - 9} = 3\\sqrt3$." },
        {
          text: "$I$ divides $(0,0)$ to $(6,0)$ internally in $2 : 1$: $I = \\left(\\frac{2 \\cdot 6 + 1 \\cdot 0}{3}, 0\\right) = (4, 0)$. *Why this step:* the ratio is $r_1 : r_2$, with $r_1$ attached to $C_1$, so $I$ is nearer the smaller circle.",
        },
        { text: "$E$ divides externally in $2 : 1$: $E = \\left(\\frac{2 \\cdot 6 - 1 \\cdot 0}{2 - 1}, 0\\right) = (12, 0)$, beyond the smaller circle." },
      ],
      answer: "Direct $\\sqrt{35}$, transverse $3\\sqrt3$; $I = (4, 0)$, $E = (12, 0)$.",
    },
    { type: "heading", text: "Equations of the common tangents" },
    {
      type: "text",
      content:
        "Once you have a centre of similitude, the tangents through it are found exactly as in Lesson 4.5: write a line of unknown slope through the point and demand that its distance from either centre equals that circle's radius. (A vertical line through the point must be checked separately, since it has no slope.)",
    },
    {
      type: "worked-example",
      id: "slc5-3-we3",
      title: "Worked example 3: the four common tangents",
      problem: "Find all the common tangents of $x^2 + y^2 = 4$ and $(x - 6)^2 + y^2 = 1$.",
      steps: [
        {
          text: "Transverse tangents pass through $I(4, 0)$: $y = m(x - 4)$. Distance from $O$ equals 2: $\\frac{\\lvert 4m\\rvert}{\\sqrt{1 + m^2}} = 2$, so $16m^2 = 4 + 4m^2$ and $m = \\pm\\frac{1}{\\sqrt3}$.",
        },
        { text: "Transverse tangents: $x \\mp \\sqrt3\\,y - 4 = 0$. Check the other circle: distance from $(6, 0)$ is $\\frac{2}{2} = 1$." },
        {
          text: "Direct tangents pass through $E(12, 0)$: $y = m(x - 12)$, and $\\frac{\\lvert 12m\\rvert}{\\sqrt{1 + m^2}} = 2$ gives $144m^2 = 4 + 4m^2$, so $m = \\pm\\frac{1}{\\sqrt{35}}$. *Why this step:* using the bigger circle or the smaller one gives the same slopes, a built-in check.",
        },
        { text: "Direct tangents: $x \\mp \\sqrt{35}\\,y - 12 = 0$." },
      ],
      answer: "$x - \\sqrt3 y - 4 = 0$, $x + \\sqrt3 y - 4 = 0$, $x - \\sqrt{35} y - 12 = 0$, $x + \\sqrt{35} y - 12 = 0$.",
    },
    {
      type: "worked-example",
      id: "slc5-3-we4",
      title: "Worked example 4: a parameter that makes circles touch",
      problem: "For which $r > 0$ does $(x - 3)^2 + (y - 4)^2 = r^2$ touch $x^2 + y^2 = 1$?",
      steps: [
        { text: "$d = 5$, $r_1 = 1$." },
        { text: "Externally: $5 = 1 + r$, so $r = 4$." },
        { text: "Internally: $5 = \\lvert r - 1\\rvert$, so $r = 6$ (the unit circle sits inside, touching). *Why this step:* \"touch\" without a qualifier allows both kinds." },
      ],
      answer: "$r = 4$ (externally) or $r = 6$ (internally).",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "slc5-3-q1",
      variant: "practice",
      question:
        "JEE Main. How many common tangents do $x^2 + y^2 - 4x - 6y - 12 = 0$ and $x^2 + y^2 + 6x + 18y + 26 = 0$ have?",
      answer: 3,
      hint: "Find both centres and radii, then compare $d$ with $r_1 + r_2$.",
      solution: "Centres $(2, 3)$ and $(-3, -9)$; radii $\\sqrt{4 + 9 + 12} = 5$ and $\\sqrt{9 + 81 - 26} = 8$. $d = \\sqrt{25 + 144} = 13 = 5 + 8$: they touch externally, so 3 common tangents.",
      commonMistakes: [
        { answer: 4, feedback: "4 needs $d > r_1 + r_2$. Here $d = 13$ exactly equals $5 + 8$." },
        { answer: 2, feedback: "Externally touching circles keep both direct tangents and gain the tangent at the contact point: 3." },
        { answer: 1, feedback: "1 is for internal touching, $d = \\lvert r_1 - r_2\\rvert = 3$." },
      ],
    },
    {
      type: "quiz",
      id: "slc5-3-q2",
      variant: "practice",
      question: "The circles $x^2 + y^2 = 16$ and $x^2 + y^2 - 2x = 0$",
      options: [
        { text: "have no common tangent: the second lies inside the first", correct: true, feedback: "Centres $(0, 0)$ and $(1, 0)$, radii 4 and 1. $d = 1 < 4 - 1 = 3$." },
        { text: "touch internally", feedback: "That needs $d = 3$. Here $d = 1$." },
        { text: "intersect at two points", feedback: "That needs $3 < d < 5$." },
        { text: "have two common tangents", feedback: "A circle strictly inside another has no line touching both." },
      ],
      hint: "Second circle: $(x - 1)^2 + y^2 = 1$. Compare $d$ with $\\lvert r_1 - r_2\\rvert$.",
    },
    {
      type: "numeric",
      id: "slc5-3-q3",
      variant: "practice",
      question:
        "Find the length of a transverse common tangent of $x^2 + y^2 = 4$ and $(x - 6)^2 + (y - 8)^2 = 16$.",
      answer: 8,
      hint: "$\\sqrt{d^2 - (r_1 + r_2)^2}$.",
      solution: "$d = 10$, $r_1 + r_2 = 6$: $\\sqrt{100 - 36} = 8$.",
      commonMistakes: [
        { answer: 9.798, tolerance: 0.01, feedback: "That is $\\sqrt{100 - 4}$, the direct common tangent. Transverse uses $r_1 + r_2$." },
        { answer: 10, feedback: "10 is the distance between the centres." },
      ],
    },
    {
      type: "numeric",
      id: "slc5-3-q4",
      variant: "practice",
      question:
        "For the same circles, $x^2 + y^2 = 4$ and $(x - 6)^2 + (y - 8)^2 = 16$, find the length of a direct common tangent, to two decimal places.",
      answer: 9.798,
      tolerance: 0.01,
      hint: "$\\sqrt{d^2 - (r_1 - r_2)^2}$.",
      solution: "$\\sqrt{100 - 4} = \\sqrt{96} = 4\\sqrt6 \\approx 9.80$.",
      commonMistakes: [
        { answer: 8, feedback: "8 is the transverse length. The direct one uses $r_1 - r_2 = -2$, so it is longer." },
        { answer: 10, feedback: "10 is $d$. Subtract $(r_1 - r_2)^2 = 4$ under the root." },
      ],
    },
    {
      type: "numeric",
      id: "slc5-3-q5",
      variant: "practice",
      question:
        "The direct common tangents of $x^2 + y^2 = 4$ and $(x - 6)^2 + (y - 8)^2 = 16$ meet at $(p, q)$. Find $p + q$.",
      answer: -14,
      hint: "The external centre of similitude divides $C_1C_2$ externally in $r_1 : r_2 = 2 : 4 = 1 : 2$.",
      solution: "External division of $(0, 0)$ and $(6, 8)$ in $1 : 2$: $\\left(\\frac{1 \\cdot 6 - 2 \\cdot 0}{1 - 2}, \\frac{1 \\cdot 8 - 2 \\cdot 0}{1 - 2}\\right) = (-6, -8)$. It lies beyond the **smaller** circle, as it must. $p + q = -14$.",
      commonMistakes: [
        { answer: 4.667, tolerance: 0.01, feedback: "That is the internal centre $(2, \\frac83)$, where the transverse tangents meet." },
        { answer: 28, feedback: "That divides externally in $2 : 1$, putting $E$ beyond the bigger circle. The ratio is $r_1 : r_2$ with $r_1$ at $C_1$." },
      ],
    },
    {
      type: "quiz",
      id: "slc5-3-q6",
      variant: "practice",
      question: "The circles $x^2 + y^2 = 1$ and $(x - 3)^2 + (y - 4)^2 = r^2$ have exactly two common tangents if and only if",
      options: [
        { text: "$4 < r < 6$", correct: true, feedback: "Two tangents means the circles cross: $\\lvert r - 1\\rvert < 5 < r + 1$." },
        { text: "$r > 6$", feedback: "Then $d = 5 < r - 1$: the unit circle is inside, no common tangent." },
        { text: "$0 < r < 4$", feedback: "Then $d > r + 1$: separate circles with 4 common tangents." },
        { text: "$r = 4$ or $r = 6$", feedback: "Those are the touching cases, with 3 and 1 tangents." },
      ],
      hint: "Write the intersection condition $\\lvert r_1 - r_2\\rvert < d < r_1 + r_2$ with $d = 5$.",
    },
    {
      type: "quiz",
      id: "slc5-3-q7",
      variant: "practice",
      multiple: true,
      question: "Which pairs of circles have **exactly one** common tangent? Select all that apply.",
      options: [
        { text: "$x^2 + y^2 = 9$ and $(x - 1)^2 + y^2 = 4$", correct: true, feedback: "$d = 1 = 3 - 2$: internal touching." },
        { text: "$x^2 + y^2 - 2x = 0$ and $x^2 + y^2 - 4x = 0$", correct: true, feedback: "Centres $(1, 0)$, $(2, 0)$, radii 1, 2: $d = 1 = 2 - 1$. They touch internally at the origin." },
        { text: "$x^2 + y^2 = 16$ and $(x - 2)^2 + y^2 = 4$", correct: true, feedback: "$d = 2 = 4 - 2$: internal touching at $(4, 0)$." },
        { text: "$x^2 + y^2 = 9$ and $(x - 5)^2 + y^2 = 4$", feedback: "$d = 5 = 3 + 2$: external touching, 3 tangents." },
        { text: "$x^2 + y^2 = 25$ and $x^2 + y^2 - 6x - 8y + 21 = 0$", feedback: "Second: centre $(3, 4)$, radius 2. $d = 5$, and $3 < 5 < 7$: they intersect, 2 tangents." },
      ],
      hint: "Exactly one common tangent means internal touching: $d = \\lvert r_1 - r_2\\rvert$.",
    },
    {
      type: "numeric",
      id: "slc5-3-q8",
      variant: "practice",
      question:
        "JEE Main. Find the number of common tangents of $x^2 + y^2 = 4$ and $x^2 + y^2 - 6x - 8y - 24 = 0$.",
      answer: 1,
      hint: "The second circle has centre $(3, 4)$. Find its radius and compare $d$ with the difference of radii.",
      solution: "$r_2 = \\sqrt{9 + 16 + 24} = 7$, $r_1 = 2$, $d = 5 = 7 - 2$. Internal touching: exactly 1 common tangent.",
      commonMistakes: [
        { answer: 3, feedback: "3 is for external touching, $d = r_1 + r_2 = 9$. Here $d = 5 = r_2 - r_1$." },
        { answer: 2, feedback: "Two tangents need $5 < d < 9$. At $d = 5$ the small circle touches the big one from inside." },
      ],
    },
    {
      type: "numeric",
      id: "slc5-3-q9",
      variant: "practice",
      question:
        "The circle $(x - 3)^2 + (y - 4)^2 = r^2$ touches $x^2 + y^2 = 4$ **externally**. Find $r$.",
      answer: 3,
      hint: "External touching: $d = r_1 + r_2$.",
      solution: "$d = 5 = 2 + r$, so $r = 3$.",
      commonMistakes: [
        { answer: 7, feedback: "$r = 7$ makes them touch internally ($d = 7 - 2$)." },
        { answer: 5, feedback: "5 is the distance between the centres, not the radius." },
      ],
    },
    {
      type: "quiz",
      id: "slc5-3-q10",
      variant: "concept",
      question: "Two circles touch each other externally. How many common tangents do they have?",
      options: [
        { text: "3", correct: true, feedback: "Two direct tangents, plus the two transverse ones merged into the tangent at the contact point." },
        { text: "2", feedback: "The tangent at the point of contact is also common to both circles." },
        { text: "1", feedback: "One is the internal-touching count." },
        { text: "4", feedback: "Four needs a gap between the circles so that two separate transverse tangents fit." },
      ],
      hint: "Picture two coins touching side by side and count the ruler positions.",
    },
    {
      type: "quiz",
      id: "slc5-3-q11",
      variant: "practice",
      multiple: true,
      question:
        "Consider $x^2 + y^2 = 1$ and $(x - 4)^2 + y^2 = 1$. Which statements are true? Select all that apply.",
      options: [
        { text: "There are four common tangents", correct: true, feedback: "$d = 4 > 1 + 1$." },
        { text: "The direct common tangents are $y = 1$ and $y = -1$", correct: true, feedback: "Equal radii: the direct tangents are parallel to the line of centres, at distance 1 from it." },
        { text: "The transverse common tangents meet at $(2, 0)$", correct: true, feedback: "The internal centre divides $C_1C_2$ in $1 : 1$: the midpoint." },
        { text: "The transverse common tangents have slopes $\\pm\\frac{1}{\\sqrt3}$", correct: true, feedback: "$y = m(x - 2)$ at distance 1 from $O$: $4m^2 = 1 + m^2$." },
        { text: "The transverse common tangents are perpendicular", feedback: "Slopes $\\pm\\frac{1}{\\sqrt3}$ make angles $\\pm 30^\\circ$ with the axis: the tangents meet at $60^\\circ$." },
      ],
      hint: "Equal radii put the external centre of similitude at infinity: what does that say about the direct tangents?",
    },
    {
      type: "numeric",
      id: "slc5-3-q12",
      variant: "practice",
      question:
        "JEE Main. Find the length of a transverse common tangent of $x^2 + y^2 - 2x - 4y - 4 = 0$ and $x^2 + y^2 - 18x - 16y + 120 = 0$.",
      answer: 6,
      hint: "Centres $(1, 2)$ and $(9, 8)$. Find the radii, then use $\\sqrt{d^2 - (r_1 + r_2)^2}$.",
      solution: "$r_1 = \\sqrt{1 + 4 + 4} = 3$, $r_2 = \\sqrt{81 + 64 - 120} = 5$, $d = \\sqrt{64 + 36} = 10$. Transverse length $\\sqrt{100 - 64} = 6$.",
      commonMistakes: [
        { answer: 9.798, tolerance: 0.01, feedback: "That is $\\sqrt{100 - 4}$, the direct tangent length." },
        { answer: 8, feedback: "That uses $r_1 + r_2 = 6$. Recompute $r_2 = \\sqrt{25} = 5$, so $r_1 + r_2 = 8$." },
      ],
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "common-chord-angle-of-intersection-and-orthogonal-circles",
  title: "5.4 · Common Chord, Angle of Intersection and Orthogonal Circles",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "When two circles cross, three questions come up straight away. Along which line do they cross? At what angle? And when is that angle a right angle? Each answer is one line of algebra, and each comes from a picture you can draw in ten seconds.",
    },
    { type: "heading", text: "The common chord" },
    {
      type: "text",
      content:
        "Write both circles with $x^2$ and $y^2$ coefficients equal to 1: $S \\equiv x^2 + y^2 + 2g_1x + 2f_1y + c_1 = 0$ and $S' \\equiv x^2 + y^2 + 2g_2x + 2f_2y + c_2 = 0$. A point on both makes $S = 0$ and $S' = 0$, so it also makes $S - S' = 0$. In $S - S'$ the squares cancel:",
    },
    {
      type: "math",
      latex: "S - S' \\equiv 2(g_1 - g_2)x + 2(f_1 - f_2)y + (c_1 - c_2) = 0",
    },
    {
      type: "text",
      content:
        "That is a straight line through both meeting points: the **common chord**. Its normal $(g_1 - g_2, f_1 - f_2)$ is the direction of $C_1C_2$, so the common chord is **perpendicular to the line of centres**, and the line of centres bisects it (each centre is equidistant from the two meeting points).",
    },
    {
      type: "worked-example",
      id: "slc5-4-we1",
      title: "Worked example 1: common chord and its length",
      problem: "Find the common chord of $x^2 + y^2 = 16$ and $x^2 + y^2 - 6x - 8y + 16 = 0$, and its length.",
      steps: [
        { text: "$S - S' = 6x + 8y - 32 = 0$, i.e. $3x + 4y = 16$." },
        {
          text: "Distance from $C_1 = (0, 0)$: $\\frac{16}{5}$. Half-chord: $\\sqrt{16 - \\frac{256}{25}} = \\sqrt{\\frac{144}{25}} = \\frac{12}{5}$. *Why this step:* the chord length needs only one circle and the chord's distance from its centre.",
        },
        { text: "Check with $C_2 = (3, 4)$, $r_2 = 3$: distance $\\frac{\\lvert 9 + 16 - 16\\rvert}{5} = \\frac95$, half-chord $\\sqrt{9 - \\frac{81}{25}} = \\frac{12}{5}$. Same." },
      ],
      answer: "$3x + 4y = 16$, length $\\frac{24}{5}$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: subtracting without normalising",
      content:
        "$S - S' = 0$ is a line only if both equations have the **same** $x^2$ coefficient. Before subtracting $2x^2 + 2y^2 - 4x + 6 = 0$ from anything, divide it by 2. Otherwise the squares do not cancel and you get a circle, not the chord.",
    },
    { type: "heading", text: "The angle of intersection" },
    {
      type: "text",
      content:
        "The angle between two curves at a common point is the angle between their tangents there. For circles the tangents are perpendicular to the radii, so the angle between the tangents equals the angle between the radii $C_1P$ and $C_2P$ (or its supplement). Triangle $C_1PC_2$ has sides $r_1$, $r_2$, $d$, and the cosine rule gives the angle at $P$:",
    },
    {
      type: "math",
      latex: "\\cos\\theta = \\frac{r_1^2 + r_2^2 - d^2}{2r_1r_2}",
    },
    {
      type: "interactive",
      config: {
        component: "slc-circle-lab",
        mode: "two-circles",
        centre: [-1, 0],
        radius: { min: 0.5, max: 4, step: 0.25, initial: 2 },
        centre2: [1.5, 0],
        radius2: { min: 0.5, max: 4, step: 0.25, initial: 1.5 },
        show: ["radical-axis", "orthogonal"],
        draggable: ["centre", "centre2"],
        caption:
          "These circles start orthogonal: $d^2 = 2.5^2 = 2^2 + 1.5^2$. At each meeting point the radius of one circle is the tangent of the other. Drag a centre and watch the angle readout leave $90^\\circ$, while the common chord stays perpendicular to the line of centres.",
      },
    },
    { type: "heading", text: "Orthogonal circles" },
    {
      type: "text",
      content:
        "Circles cut **orthogonally** when $\\theta = 90^\\circ$, i.e. $d^2 = r_1^2 + r_2^2$ (Pythagoras in triangle $C_1PC_2$). Substitute $C_1 = (-g_1, -f_1)$, $C_2 = (-g_2, -f_2)$, $r_i^2 = g_i^2 + f_i^2 - c_i$:",
    },
    {
      type: "math",
      latex: "(g_1 - g_2)^2 + (f_1 - f_2)^2 = g_1^2 + f_1^2 - c_1 + g_2^2 + f_2^2 - c_2",
    },
    {
      type: "text",
      content: "The squares cancel and leave the condition every JEE aspirant should be able to rebuild in a line:",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Orthogonality",
      content:
        "$S = 0$ and $S' = 0$ cut orthogonally if and only if\n\n$$2g_1g_2 + 2f_1f_2 = c_1 + c_2$$\n\nEquivalent forms: $d^2 = r_1^2 + r_2^2$; the tangent to one circle at a common point passes through the centre of the other; the tangent length from $C_2$ to the first circle equals $r_2$.",
    },
    {
      type: "worked-example",
      id: "slc5-4-we2",
      title: "Worked example 2: testing orthogonality two ways",
      problem: "Show that $x^2 + y^2 = 16$ and $x^2 + y^2 - 6x - 8y + 16 = 0$ cut orthogonally.",
      steps: [
        { text: "Geometrically: $d = 5$, $r_1 = 4$, $r_2 = 3$, and $25 = 16 + 9$." },
        { text: "Algebraically: $g_1 = f_1 = 0$, $c_1 = -16$; $g_2 = -3$, $f_2 = -4$, $c_2 = 16$. Left side $2(0)(-3) + 2(0)(-4) = 0$; right side $-16 + 16 = 0$. *Why this step:* the algebraic test needs no square roots, which is why JEE uses it." },
      ],
      answer: "Both tests confirm a right angle of intersection.",
    },
    {
      type: "worked-example",
      id: "slc5-4-we3",
      title: "Worked example 3: a circle orthogonal to two circles",
      problem:
        "Find the circle through $(1, 1)$ that cuts both $x^2 + y^2 = 4$ and $x^2 + y^2 - 6x + 5 = 0$ orthogonally.",
      steps: [
        { text: "Let the circle be $x^2 + y^2 + 2gx + 2fy + c = 0$." },
        { text: "Orthogonal to $x^2 + y^2 - 4 = 0$: $0 = c - 4$, so $c = 4$." },
        { text: "Orthogonal to $x^2 + y^2 - 6x + 5 = 0$ ($g' = -3$, $f' = 0$, $c' = 5$): $2g(-3) = 4 + 5$, so $g = -\\frac32$." },
        { text: "Through $(1, 1)$: $1 + 1 - 3 + 2f + 4 = 0$, so $f = -\\frac32$. *Why this step:* three conditions for three unknowns $g$, $f$, $c$." },
        { text: "Check: centre $(\\frac32, \\frac32)$, $r^2 = \\frac94 + \\frac94 - 4 = \\frac12$; $d^2$ to $(0, 0)$ is $\\frac92 = 4 + \\frac12$, and to $(3, 0)$ is $\\frac92 = 4 + \\frac12$." },
      ],
      answer: "$x^2 + y^2 - 3x - 3y + 4 = 0$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"orthogonal means c₁ = c₂\"",
      content:
        "The condition is $2g_1g_2 + 2f_1f_2 = c_1 + c_2$, a **sum** of constants on the right and a cross term on the left. $x^2 + y^2 = 1$ and $x^2 + y^2 - 4x + 1 = 0$ have $c_1 = -1 \\ne c_2 = 1$ yet cut orthogonally ($0 = -1 + 1$); and $x^2 + y^2 = 4$, $x^2 + y^2 - 2x - 4 = 0$ have equal $c$ but cross at $\\cos\\theta = \\frac{2}{\\sqrt5}$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "slc5-4-q1",
      variant: "practice",
      question: "The common chord of $x^2 + y^2 - 4x = 0$ and $x^2 + y^2 - 4y = 0$ is",
      options: [
        { text: "$y = x$", correct: true, feedback: "$S - S' = -4x + 4y = 0$. Both circles pass through $(0, 0)$ and $(2, 2)$." },
        { text: "$x + y = 0$", feedback: "$(2, 2)$ lies on both circles but not on $x + y = 0$. Subtracting the equations gives $-4x + 4y = 0$." },
        { text: "$x + y = 2$", feedback: "That is the line of centres. The common chord is perpendicular to it." },
        { text: "$x + y = 4$", feedback: "Subtract the equations: the $x^2$, $y^2$ cancel and leave $-4x + 4y = 0$." },
      ],
      hint: "Subtract one equation from the other.",
    },
    {
      type: "numeric",
      id: "slc5-4-q2",
      variant: "practice",
      question:
        "Find the length of the common chord of $x^2 + y^2 - 4x = 0$ and $x^2 + y^2 - 4y = 0$, to two decimal places.",
      answer: 2.828,
      tolerance: 0.01,
      hint: "The common chord $y = x$ meets the first circle where $2x^2 - 4x = 0$.",
      solution: "The meeting points are $(0, 0)$ and $(2, 2)$, so the length is $2\\sqrt2 \\approx 2.83$.",
      commonMistakes: [
        { answer: 1.414, tolerance: 0.01, feedback: "That is half the chord." },
        { answer: 4, feedback: "4 is the diameter of each circle. The chord $y = x$ is not a diameter." },
      ],
    },
    {
      type: "numeric",
      id: "slc5-4-q3",
      variant: "practice",
      question:
        "Find the acute angle, in degrees, at which $x^2 + y^2 = 4$ and $(x - 2)^2 + y^2 = 4$ intersect.",
      answer: 60,
      unit: "degrees",
      hint: "$\\cos\\theta = \\frac{r_1^2 + r_2^2 - d^2}{2r_1r_2}$ with $r_1 = r_2 = d = 2$.",
      solution: "$\\cos\\theta = \\frac{4 + 4 - 4}{8} = \\frac12$, so $\\theta = 60^\\circ$. Triangle $C_1PC_2$ is equilateral.",
      commonMistakes: [
        { answer: 120, feedback: "$120^\\circ$ is the supplement. The angle between two curves is usually reported as the acute one." },
        { answer: 90, feedback: "Orthogonal would need $d^2 = r_1^2 + r_2^2 = 8$; here $d^2 = 4$." },
      ],
    },
    {
      type: "numeric",
      id: "slc5-4-q4",
      variant: "practice",
      question:
        "The circles $x^2 + y^2 + 2kx + 4y - 3 = 0$ and $x^2 + y^2 - 6x + 2y + 1 = 0$ cut orthogonally. Find $k$.",
      answer: 1,
      hint: "$2g_1g_2 + 2f_1f_2 = c_1 + c_2$ with $g_1 = k$, $f_1 = 2$, $g_2 = -3$, $f_2 = 1$.",
      solution: "$2k(-3) + 2(2)(1) = -3 + 1$, so $-6k + 4 = -2$ and $k = 1$. Check: centres $(-1, -2)$, $(3, -1)$, $d^2 = 17 = 8 + 9 = r_1^2 + r_2^2$.",
      commonMistakes: [
        { answer: -1, feedback: "Sign slip: $-6k = -6$ gives $k = +1$." },
        { answer: 1.333, tolerance: 0.01, feedback: "That uses $c_1 - c_2$ on the right. The condition has the **sum** $c_1 + c_2$." },
      ],
    },
    {
      type: "quiz",
      id: "slc5-4-q5",
      variant: "practice",
      multiple: true,
      question:
        "Two circles with centres $C_1$, $C_2$, radii $r_1$, $r_2$ and equations $S = 0$, $S' = 0$ (unit $x^2$ coefficients) meet at $P$. Which conditions are each equivalent to their cutting orthogonally? Select all that apply.",
      options: [
        { text: "$C_1C_2^2 = r_1^2 + r_2^2$", correct: true, feedback: "Pythagoras in triangle $C_1PC_2$ with the right angle at $P$." },
        { text: "$2g_1g_2 + 2f_1f_2 = c_1 + c_2$", correct: true, feedback: "The same condition written in coefficients." },
        { text: "The tangent to $S = 0$ at $P$ passes through $C_2$", correct: true, feedback: "The tangent to the first circle at $P$ is perpendicular to $C_1P$, and so is $C_2P$." },
        { text: "$c_1 = c_2$", feedback: "Not equivalent: see $x^2 + y^2 = 1$ and $x^2 + y^2 - 4x + 1 = 0$, orthogonal with $c_1 \\ne c_2$." },
        { text: "The common chord is a diameter of one of the circles", feedback: "That is the condition for one circle to **bisect** the other's circumference, a different property." },
      ],
      hint: "Start from the right angle at $P$ between the two radii.",
    },
    {
      type: "numeric",
      id: "slc5-4-q6",
      variant: "practice",
      question:
        "JEE Main. The circle $x^2 + y^2 + kx + 4 = 0$ bisects the circumference of $x^2 + y^2 - 2x - 4y + 1 = 0$. Find $k$.",
      answer: -13,
      hint: "To bisect the circumference, the common chord $S - S' = 0$ must pass through the centre $(1, 2)$ of the second circle.",
      solution: "$S - S' = (k + 2)x + 4y + 3 = 0$. Through $(1, 2)$: $k + 2 + 8 + 3 = 0$, so $k = -13$. The first circle, $x^2 + y^2 - 13x + 4 = 0$, is real.",
      commonMistakes: [
        { answer: 13, feedback: "Sign slip in $S - S'$: the $x$-coefficient is $k - (-2) = k + 2$." },
        { answer: -11, feedback: "Recheck the constant: $c_1 - c_2 = 4 - 1 = 3$, so $k + 2 + 8 + 3 = 0$." },
      ],
    },
    {
      type: "numeric",
      id: "slc5-4-q7",
      variant: "practice",
      question: "Find the length of the common chord of $x^2 + y^2 = 25$ and $x^2 + y^2 - 12x + 11 = 0$.",
      answer: 8,
      hint: "Subtract: the common chord is a vertical line. Then use the first circle.",
      solution: "$S - S' = 12x - 36 = 0$, so $x = 3$. On $x^2 + y^2 = 25$: $y = \\pm 4$. Length 8.",
      commonMistakes: [
        { answer: 4, feedback: "4 is the half-chord, from $(3, 0)$ to $(3, 4)$." },
        { answer: 10, feedback: "10 is a diameter of either circle. The chord $x = 3$ is not a diameter." },
      ],
    },
    {
      type: "numeric",
      id: "slc5-4-q8",
      variant: "practice",
      question:
        "The circle $(x - k)^2 + y^2 = 5$ with $k > 0$ cuts $x^2 + y^2 = 4$ orthogonally. Find $k$.",
      answer: 3,
      hint: "Orthogonal: $d^2 = r_1^2 + r_2^2$.",
      solution: "$k^2 = 4 + 5 = 9$, so $k = 3$.",
      commonMistakes: [
        { answer: 9, feedback: "9 is $k^2$." },
        { answer: 1, feedback: "That uses $d^2 = r_2^2 - r_1^2$. Orthogonal means the squares **add**." },
      ],
    },
    {
      type: "quiz",
      id: "slc5-4-q9",
      variant: "practice",
      question:
        "JEE Main. The locus of the centre of a circle that passes through $(3, 4)$ and cuts $x^2 + y^2 = 4$ orthogonally is",
      options: [
        { text: "$6x + 8y = 29$", correct: true, feedback: "With centre $(h, k)$: $r^2 = h^2 + k^2 - 4$ (orthogonal) and $r^2 = (h - 3)^2 + (k - 4)^2$. Equating: $6h + 8k = 29$." },
        { text: "$6x + 8y = 21$", feedback: "That comes from $r^2 = h^2 + k^2 + 4$. Orthogonality gives $d^2 = r^2 + 4$, so $r^2 = h^2 + k^2 - 4$." },
        { text: "$3x + 4y = 25$", feedback: "That is the tangent to $x^2 + y^2 = 25$ at $(3, 4)$, unrelated to the condition." },
        { text: "$x^2 + y^2 = 29$", feedback: "The squares cancel when the two expressions for $r^2$ are equated, leaving a line." },
      ],
      hint: "Write $r^2$ two ways: from orthogonality and from passing through $(3, 4)$.",
    },
    {
      type: "quiz",
      id: "slc5-4-q10",
      variant: "practice",
      multiple: true,
      question: "For two circles that intersect at two points, which statements about the common chord are true? Select all that apply.",
      options: [
        { text: "It is perpendicular to the line of centres", correct: true, feedback: "Its normal $(g_1 - g_2, f_1 - f_2)$ is the direction of $C_1C_2$." },
        { text: "It is bisected by the line of centres", correct: true, feedback: "Each centre is equidistant from both meeting points, so the line of centres is the perpendicular bisector of the chord." },
        { text: "Its equation $S - S' = 0$ needs both $x^2$ coefficients equal first", correct: true, feedback: "Otherwise the squares do not cancel." },
        { text: "It passes through both centres", feedback: "It passes through a centre only in special cases (when it is a diameter of that circle)." },
        { text: "It always passes through the midpoint of $C_1C_2$", feedback: "Only when $r_1 = r_2$. For $x^2 + y^2 = 16$ and $x^2 + y^2 - 6x - 8y + 16 = 0$ the chord $3x + 4y = 16$ crosses $C_1C_2$ at distance $\\frac{16}{5}$ from $O$, not at the midpoint (distance $\\frac52$)." },
      ],
      hint: "Use the symmetry of the picture about the line of centres.",
    },
    {
      type: "numeric",
      id: "slc5-4-q11",
      variant: "practice",
      question:
        "JEE Advanced. A circle passes through $(3, 0)$ and cuts both $x^2 + y^2 = 9$ and $x^2 + y^2 - 8y + 7 = 0$ orthogonally. Find its radius.",
      answer: 2,
      hint: "Take $x^2 + y^2 + 2gx + 2fy + c = 0$. Each orthogonality gives one equation, and the point gives the third.",
      solution: "Orthogonal to $x^2 + y^2 - 9$: $c = 9$. Orthogonal to the second ($f' = -4$, $c' = 7$): $-8f = 9 + 7$, $f = -2$. Through $(3, 0)$: $9 + 6g + 9 = 0$, $g = -3$. Circle $x^2 + y^2 - 6x - 4y + 9 = 0$, $r^2 = 9 + 4 - 9 = 4$, so $r = 2$.",
      commonMistakes: [
        { answer: 4, feedback: "4 is $r^2$." },
        { answer: 3, feedback: "Check $c$: orthogonality to $x^2 + y^2 - 9 = 0$ gives $0 = c - 9$, so $c = 9$, not $-9$." },
      ],
    },
    {
      type: "quiz",
      id: "slc5-4-q12",
      variant: "concept",
      question: "Which pair of circles cuts orthogonally?",
      options: [
        { text: "$x^2 + y^2 = 1$ and $x^2 + y^2 - 4x + 1 = 0$", correct: true, feedback: "$2g_1g_2 + 2f_1f_2 = 0$ and $c_1 + c_2 = -1 + 1 = 0$. Geometrically $d^2 = 4 = 1 + 3$." },
        { text: "$x^2 + y^2 = 4$ and $x^2 + y^2 - 2x - 4 = 0$", feedback: "Equal $c$ is not the test: $0 \\ne -8$. They cross at $\\cos\\theta = \\frac{4 + 5 - 1}{2 \\cdot 2\\sqrt5}$, not $90^\\circ$." },
        { text: "$x^2 + y^2 = 4$ and $(x - 4)^2 + y^2 = 4$", feedback: "$d^2 = 16 > 8$: these touch externally at $(2, 0)$; they do not cross at all." },
        { text: "$x^2 + y^2 = 9$ and $(x - 3)^2 + y^2 = 9$", feedback: "$d^2 = 9 \\ne 18$: they cross at $60^\\circ$." },
      ],
      hint: "Use $2g_1g_2 + 2f_1f_2 = c_1 + c_2$, or $d^2 = r_1^2 + r_2^2$.",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "families-of-circles",
  title: "5.5 · Families of Circles",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "In Chapter 3 the family $L_1 + \\lambda L_2 = 0$ gave every line through the meeting point of two lines, without ever finding that point. Circles have exactly the same trick. If a circle and a line (or two circles) meet at two points, a one-parameter equation describes **every** circle through those two points, and one extra condition picks out the one you want.",
    },
    { type: "heading", text: "Why S + λL = 0 works" },
    {
      type: "text",
      content:
        "Let $S = 0$ be a circle and $L = 0$ a line that meets it at $A$ and $B$. Consider, for any number $\\lambda$,",
    },
    {
      type: "math",
      latex: "S + \\lambda L = 0",
    },
    {
      type: "text",
      content:
        "Two observations make it a family of circles through $A$ and $B$:\n\n1. Adding a linear expression changes only the $x$, $y$ and constant terms, so the coefficients of $x^2$ and $y^2$ stay equal and there is still no $xy$ term: it is a circle (when real).\n2. At $A$ and $B$ both $S = 0$ and $L = 0$, so $S + \\lambda L = 0$ there for **every** $\\lambda$.\n\nConversely every circle through $A$ and $B$ arises this way: its centre lies on the perpendicular bisector of $AB$, and as $\\lambda$ runs over the reals the centre $(-g - \\frac{\\lambda a}{2}, -f - \\frac{\\lambda b}{2})$ of $S + \\lambda(ax + by + c) = 0$ runs along exactly that line.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The four standard families",
      content:
        "- Circles through the meeting points of $S = 0$ and the line $L = 0$: $S + \\lambda L = 0$\n- Circles through the meeting points of $S = 0$ and $S' = 0$: $S + \\lambda S' = 0$ with $\\lambda \\ne -1$ (both written with unit $x^2$ coefficient)\n- Circles through two points $A(x_1, y_1)$, $B(x_2, y_2)$: $(x - x_1)(x - x_2) + (y - y_1)(y - y_2) + \\lambda L_{AB} = 0$, where $L_{AB} = 0$ is the line $AB$ (the first part is the circle on $AB$ as diameter)\n- Circles touching the line $L = 0$ at the point $(x_1, y_1)$: $(x - x_1)^2 + (y - y_1)^2 + \\lambda L = 0$ (the first part is a point circle at the point of contact)",
    },
    {
      type: "interactive",
      config: {
        component: "slc-circle-lab",
        mode: "line",
        centre: [0, 0],
        radius: { min: 1, max: 4.5, step: 0.25, initial: 3 },
        a: [-4, -1],
        b: [4, 3],
        draggable: ["a", "b", "centre"],
        caption:
          "A circle $S = 0$ and a line $L = 0$ through $A$ and $B$. Every circle $S + \\lambda L = 0$ passes through the two crossing points shown. The member whose centre lies **on** the line is the smallest: its diameter is the chord, whose length the readout gives as $2\\sqrt{r^2 - d^2}$.",
      },
    },
    { type: "heading", text: "Worked examples" },
    {
      type: "worked-example",
      id: "slc5-5-we1",
      title: "Worked example 1: through the meeting points and a third point",
      problem: "Find the circle through the meeting points of $x^2 + y^2 = 9$ and $x + y = 1$ that passes through the origin.",
      steps: [
        { text: "Family: $x^2 + y^2 - 9 + \\lambda(x + y - 1) = 0$." },
        { text: "Through $(0, 0)$: $-9 - \\lambda = 0$, so $\\lambda = -9$. *Why this step:* one unknown, one condition. We never need the two meeting points themselves." },
        { text: "$x^2 + y^2 - 9 - 9x - 9y + 9 = 0$." },
      ],
      answer: "$x^2 + y^2 - 9x - 9y = 0$.",
    },
    {
      type: "worked-example",
      id: "slc5-5-we2",
      title: "Worked example 2: the smallest circle through the meeting points",
      problem: "Find the smallest circle through the meeting points of $x^2 + y^2 - 2x - 4y - 4 = 0$ and $x + y - 1 = 0$.",
      steps: [
        { text: "Family: $x^2 + y^2 + (\\lambda - 2)x + (\\lambda - 4)y - 4 - \\lambda = 0$, centre $\\left(\\frac{2 - \\lambda}{2}, \\frac{4 - \\lambda}{2}\\right)$." },
        {
          text: "The smallest circle through two points has them as ends of a diameter, so its centre is on the chord: $\\frac{2 - \\lambda}{2} + \\frac{4 - \\lambda}{2} - 1 = 0$, giving $\\lambda = 2$. *Why this step:* any circle through $A$ and $B$ has radius at least $\\frac{AB}{2}$, with equality exactly when $AB$ is a diameter.",
        },
        { text: "Circle: $x^2 + y^2 - 2y - 6 = 0$, centre $(0, 1)$, radius $\\sqrt7$." },
        { text: "Check: the given circle has centre $(1, 2)$, $r = 3$, and the line is at distance $\\frac{2}{\\sqrt2} = \\sqrt2$, so the half-chord is $\\sqrt{9 - 2} = \\sqrt7$. It matches." },
      ],
      answer: "$x^2 + y^2 - 2y - 6 = 0$.",
    },
    {
      type: "worked-example",
      id: "slc5-5-we3",
      title: "Worked example 3: through the meeting points of two circles",
      problem:
        "Find the circle through the meeting points of $x^2 + y^2 - 4 = 0$ and $x^2 + y^2 - 2x - 4y + 4 = 0$ that passes through the origin.",
      steps: [
        { text: "Family: $(x^2 + y^2 - 4) + \\lambda(x^2 + y^2 - 2x - 4y + 4) = 0$." },
        { text: "Through $(0, 0)$: $-4 + 4\\lambda = 0$, so $\\lambda = 1$." },
        { text: "$2x^2 + 2y^2 - 2x - 4y = 0$; divide by 2. *Why this step:* after combining, the $x^2$ coefficient is $1 + \\lambda$, which must be made 1 before reading off a centre." },
      ],
      answer: "$x^2 + y^2 - x - 2y = 0$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"every λ gives a circle\"",
      content:
        "In $S + \\lambda S' = 0$ the $x^2$ coefficient is $1 + \\lambda$. At $\\lambda = -1$ the squares vanish and you get the **line** $S - S' = 0$, the common chord (Lesson 5.4), not a circle. So the family $S + \\lambda S' = 0$ misses no circle through the two points except $S' = 0$ itself, and it contains that one line as a degenerate member.",
    },
    {
      type: "worked-example",
      id: "slc5-5-we4",
      title: "Worked example 4: touching a line at a given point",
      problem: "Find the circle that touches the line $y = x$ at $(1, 1)$ and passes through $(1, -1)$.",
      steps: [
        { text: "Family: $(x - 1)^2 + (y - 1)^2 + \\lambda(x - y) = 0$. *Why this step:* the point circle at $(1, 1)$ plus a multiple of the tangent line gives circles that meet the line only at $(1, 1)$, twice: they touch there." },
        { text: "Through $(1, -1)$: $0 + 4 + 2\\lambda = 0$, so $\\lambda = -2$." },
        { text: "$x^2 + y^2 - 2x - 2y + 2 - 2x + 2y = 0$, i.e. $x^2 + y^2 - 4x + 2 = 0$." },
        { text: "Check: centre $(2, 0)$, $r = \\sqrt2$, distance from $(2, 0)$ to $x - y = 0$ is $\\frac{2}{\\sqrt2} = \\sqrt2$." },
      ],
      answer: "$x^2 + y^2 - 4x + 2 = 0$.",
    },
    {
      type: "worked-example",
      id: "slc5-5-we5",
      title: "Worked example 5: through two points and touching an axis",
      problem: "Find the circles through $(1, 0)$ and $(3, 0)$ that touch the y-axis.",
      steps: [
        { text: "Family through the two points (line $AB$ is $y = 0$): $(x - 1)(x - 3) + y^2 + \\lambda y = 0$, i.e. $x^2 + y^2 - 4x + \\lambda y + 3 = 0$." },
        { text: "Meet $x = 0$: $y^2 + \\lambda y + 3 = 0$. Touching means a double root: $\\lambda^2 = 12$, $\\lambda = \\pm 2\\sqrt3$." },
        { text: "Centres $(2, \\mp\\sqrt3)$, radius $\\sqrt{4 + 3 - 3} = 2$, which equals the distance to the y-axis, as it should." },
      ],
      answer: "$x^2 + y^2 - 4x \\pm 2\\sqrt3\\,y + 3 = 0$, both of radius 2.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "slc5-5-q1",
      variant: "practice",
      question: "The circle through the meeting points of $x^2 + y^2 = 4$ and $x + y = 2$ that passes through $(2, 2)$ is",
      options: [
        { text: "$x^2 + y^2 - 2x - 2y = 0$", correct: true, feedback: "$S + \\lambda L$ at $(2, 2)$: $4 + 2\\lambda = 0$, $\\lambda = -2$." },
        { text: "$x^2 + y^2 + 2x + 2y - 8 = 0$", feedback: "That is $\\lambda = +2$. Check $(2, 2)$: $4 + 4 + 4 + 4 - 8 \\ne 0$." },
        { text: "$x^2 + y^2 - 2x - 2y - 4 = 0$", feedback: "Expand carefully: $-4 - 2(x + y - 2) = -2x - 2y + 0$." },
        { text: "$x^2 + y^2 - 4x - 4y + 4 = 0$", feedback: "That circle touches the axes at $(2, 0)$ and $(0, 2)$ but does not pass through $(2, 2)$: $4 + 4 - 8 - 8 + 4 \\ne 0$." },
      ],
      hint: "Write $x^2 + y^2 - 4 + \\lambda(x + y - 2) = 0$ and substitute $(2, 2)$.",
    },
    {
      type: "numeric",
      id: "slc5-5-q2",
      variant: "practice",
      question: "Find the radius of the smallest circle through the meeting points of $x^2 + y^2 = 25$ and the line $x = 3$.",
      answer: 4,
      hint: "The smallest circle has the common chord as diameter.",
      solution: "$x = 3$ meets the circle at $(3, \\pm 4)$, a chord of length 8. The smallest circle has radius 4 (it is $(x - 3)^2 + y^2 = 16$).",
      commonMistakes: [
        { answer: 5, feedback: "5 is the radius of the given circle, which also passes through the points but is not the smallest." },
        { answer: 8, feedback: "8 is the chord, which is the **diameter** of the smallest circle." },
      ],
    },
    {
      type: "numeric",
      id: "slc5-5-q3",
      variant: "practice",
      question:
        "The circle through the meeting points of $x^2 + y^2 - 4 = 0$ and $x^2 + y^2 - 2x - 4y + 4 = 0$ that passes through the origin is $x^2 + y^2 + ax + by = 0$. Find $a + b$.",
      answer: -3,
      hint: "Use $S + \\lambda S' = 0$, find $\\lambda$ from the origin, then divide by the $x^2$ coefficient.",
      solution: "$-4 + 4\\lambda = 0$ gives $\\lambda = 1$; the sum is $2x^2 + 2y^2 - 2x - 4y = 0$, i.e. $x^2 + y^2 - x - 2y = 0$. So $a + b = -3$.",
      commonMistakes: [
        { answer: -6, feedback: "You forgot to divide by the $x^2$ coefficient $1 + \\lambda = 2$." },
        { answer: 3, feedback: "Sign slip: the $x$ and $y$ terms come from $S'$ with their minus signs." },
      ],
    },
    {
      type: "quiz",
      id: "slc5-5-q4",
      variant: "concept",
      question: "In the family $S + \\lambda S' = 0$ (both circles with unit $x^2$ coefficient), the member with $\\lambda = -1$ is",
      options: [
        { text: "the common chord (radical axis), a straight line", correct: true, feedback: "The squares cancel: $S - S' = 0$ is linear." },
        { text: "the circle with the common chord as diameter", feedback: "That circle is a different member, found by putting its centre on the chord." },
        { text: "the circle $S' = 0$", feedback: "$S' = 0$ itself corresponds to $\\lambda \\to \\infty$ (divide by $\\lambda$)." },
        { text: "a point circle", feedback: "No squares survive at $\\lambda = -1$, so it cannot be any circle." },
      ],
      hint: "Look at the coefficient of $x^2$ in $S + \\lambda S'$.",
    },
    {
      type: "numeric",
      id: "slc5-5-q5",
      variant: "practice",
      question: "A circle touches the x-axis at $(3, 0)$ and passes through $(1, 4)$. Find its radius.",
      answer: 2.5,
      hint: "Family: $(x - 3)^2 + y^2 + \\lambda y = 0$.",
      solution: "At $(1, 4)$: $4 + 16 + 4\\lambda = 0$, $\\lambda = -5$. Circle $x^2 + y^2 - 6x - 5y + 9 = 0$: centre $(3, \\frac52)$, radius $\\frac52$ (equal to the height of the centre, as touching the x-axis requires).",
      commonMistakes: [
        { answer: 5, feedback: "5 is the diameter (and $-\\lambda$). The centre is at height $\\frac{5}{2}$." },
        { answer: 4, feedback: "4 is the height of the given point, not of the centre." },
      ],
    },
    {
      type: "numeric",
      id: "slc5-5-q6",
      variant: "practice",
      question:
        "Among the circles through $(0, 0)$ and $(4, 0)$, one has its centre on the line $y = 3$. Find the square of its radius.",
      answer: 13,
      hint: "Family: $x(x - 4) + y^2 + \\lambda y = 0$, with centre $(2, -\\frac{\\lambda}{2})$.",
      solution: "$-\\frac{\\lambda}{2} = 3$ gives $\\lambda = -6$: $x^2 + y^2 - 4x - 6y = 0$, centre $(2, 3)$, $r^2 = 4 + 9 = 13$.",
      commonMistakes: [
        { answer: 9, feedback: "That is only the vertical part. The radius reaches $(0, 0)$ from $(2, 3)$: $r^2 = 4 + 9$." },
        { answer: 4, feedback: "4 is the square of half of $AB$, the smallest circle's radius. This circle's centre is 3 units above the chord." },
      ],
    },
    {
      type: "quiz",
      id: "slc5-5-q7",
      variant: "practice",
      multiple: true,
      question: "Which statements about families of circles are true? Select all that apply.",
      options: [
        { text: "Every member of $S + \\lambda L = 0$ passes through the points where $L = 0$ meets $S = 0$", correct: true, feedback: "At those points both $S$ and $L$ vanish." },
        { text: "The centres of $S + \\lambda L = 0$ lie on a line perpendicular to $L = 0$", correct: true, feedback: "The centre moves by $-\\frac{\\lambda}{2}(a, b)$, along the normal of $L$." },
        { text: "$(x - x_1)^2 + (y - y_1)^2 + \\lambda L = 0$ with $(x_1, y_1)$ on $L = 0$ touches $L = 0$ at $(x_1, y_1)$", correct: true, feedback: "On $L = 0$ it reduces to $(x - x_1)^2 + (y - y_1)^2 = 0$: a double meeting at the point." },
        { text: "$S + \\lambda S' = 0$ is a circle for every real $\\lambda$", feedback: "$\\lambda = -1$ gives a line." },
        { text: "$S + \\lambda L = 0$ needs $L = 0$ to actually cut $S = 0$ to be a circle", feedback: "The equation is a circle (possibly with no real meeting points) for each $\\lambda$ that gives a positive radius squared; cutting is needed only for the \"through the meeting points\" interpretation." },
      ],
      hint: "Substitute the meeting points, and look at how the centre moves with $\\lambda$.",
    },
    {
      type: "quiz",
      id: "slc5-5-q8",
      variant: "practice",
      question:
        "JEE Main. The circle through the meeting points of $x^2 + y^2 - 6x = 0$ and $x - y = 0$ whose centre lies on the y-axis is",
      options: [
        { text: "$x^2 + y^2 - 6y = 0$", correct: true, feedback: "$x^2 + y^2 - 6x + \\lambda(x - y) = 0$ has centre $\\left(\\frac{6 - \\lambda}{2}, \\frac{\\lambda}{2}\\right)$; on the y-axis gives $\\lambda = 6$." },
        { text: "$x^2 + y^2 - 3x - 3y = 0$", feedback: "That is the smallest member, centre $(\\frac32, \\frac32)$ on the chord, not on the y-axis." },
        { text: "$x^2 + y^2 + 6y = 0$", feedback: "It does not pass through $(3, 3)$: $9 + 9 + 18 \\ne 0$." },
        { text: "$x^2 + y^2 - 6x = 0$", feedback: "That is the given circle, centre $(3, 0)$ on the x-axis." },
      ],
      hint: "Write the family $S + \\lambda L = 0$ and make the x-coordinate of its centre zero.",
    },
    {
      type: "numeric",
      id: "slc5-5-q9",
      variant: "practice",
      question:
        "The circle through the meeting points of $x^2 + y^2 + 2x + 3y - 7 = 0$ and $x^2 + y^2 + 3x - 2y - 1 = 0$ that passes through $(1, 2)$ is $x^2 + y^2 + ax + by + c = 0$. Find $a + b + c$.",
      answer: 2,
      hint: "$S(1, 2) = 6$ and $S'(1, 2) = 3$. Choose $\\lambda$ so that $S + \\lambda S'$ vanishes at $(1, 2)$.",
      solution: "$6 + 3\\lambda = 0$, $\\lambda = -2$. $S - 2S' = -x^2 - y^2 - 4x + 7y - 5 = 0$, i.e. $x^2 + y^2 + 4x - 7y + 5 = 0$. Check $(1, 2)$: $1 + 4 + 4 - 14 + 5 = 0$. So $a + b + c = 4 - 7 + 5 = 2$.",
      commonMistakes: [
        { answer: -2, feedback: "You kept the $x^2$ coefficient $-1$. Multiply through by $-1$ first." },
        { answer: 6, feedback: "6 is $S(1, 2)$, not the requested sum." },
      ],
    },
    {
      type: "numeric",
      id: "slc5-5-q10",
      variant: "practice",
      question:
        "JEE Advanced. Two circles pass through $(1, 0)$ and $(3, 0)$ and touch the y-axis. Find the radius of each.",
      answer: 2,
      hint: "The centre is on $x = 2$ (perpendicular bisector of the two points), and touching the y-axis means radius $= \\lvert x\\text{-coordinate of centre}\\rvert$.",
      solution: "Centre $(2, k)$, radius 2 (distance to the y-axis). Through $(1, 0)$: $1 + k^2 = 4$, $k = \\pm\\sqrt3$. Both circles have radius 2.",
      commonMistakes: [
        { answer: 1, feedback: "1 is half the distance between the points. The radius must also equal the distance from the centre to the y-axis, which is 2." },
        { answer: 1.732, tolerance: 0.01, feedback: "$\\sqrt3$ is the height of the centre, not the radius." },
      ],
    },
    {
      type: "quiz",
      id: "slc5-5-q11",
      variant: "practice",
      question: "The smallest circle through the meeting points of $x^2 + y^2 = 9$ and $x + y = 3$ is",
      options: [
        { text: "$x^2 + y^2 - 3x - 3y = 0$", correct: true, feedback: "The meeting points are $(3, 0)$ and $(0, 3)$; the circle on them as diameter is $x(x - 3) + y(y - 3) = 0$." },
        { text: "$x^2 + y^2 + 3x + 3y - 18 = 0$", feedback: "That is $\\lambda = +3$, centre $(-\\frac32, -\\frac32)$, which is not on the chord." },
        { text: "$x^2 + y^2 - 9 = 0$", feedback: "The given circle passes through both points, but it is not the smallest." },
        { text: "$x^2 + y^2 - 3x - 3y - 9 = 0$", feedback: "Expand $S + \\lambda L$ with $\\lambda = -3$: the constant is $-9 + 9 = 0$." },
      ],
      hint: "Put the centre of $S + \\lambda L = 0$ on the line $L = 0$.",
    },
    {
      type: "quiz",
      id: "slc5-5-q12",
      variant: "practice",
      multiple: true,
      question:
        "JEE Advanced. Consider the circles that touch the line $x + y = 2$ at $(1, 1)$. Which statements are true? Select all that apply.",
      options: [
        { text: "They are $(x - 1)^2 + (y - 1)^2 + \\lambda(x + y - 2) = 0$", correct: true, feedback: "Point circle at the contact point plus a multiple of the tangent." },
        { text: "Their centres lie on $y = x$", correct: true, feedback: "The centre is $(1 - \\frac{\\lambda}{2}, 1 - \\frac{\\lambda}{2})$, on the normal to the line at $(1, 1)$." },
        { text: "The member through $(3, 3)$ has radius $\\sqrt2$", correct: true, feedback: "$4 + 4 + 4\\lambda = 0$ gives $\\lambda = -2$: $x^2 + y^2 - 4x - 4y + 6 = 0$, centre $(2, 2)$, $r^2 = 8 - 6 = 2$." },
        { text: "The member through the origin has its centre at $(1, 1)$", feedback: "Through $(0, 0)$: $2 - 2\\lambda = 0$, $\\lambda = 1$, centre $(\\frac12, \\frac12)$, radius $\\frac{1}{\\sqrt2}$." },
        { text: "Every member passes through the origin", feedback: "Only the member with $\\lambda = 1$ does." },
      ],
      hint: "Write the family and find the centre as a function of $\\lambda$.",
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "radical-axis-and-radical-centre",
  title: "5.6 · Radical Axis and Radical Centre",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "Lesson 5.4 found the common chord of two crossing circles as $S - S' = 0$. But $S - S'$ is a line even when the circles do **not** cross. What does it mean then? The answer goes through one number attached to every point and every circle: the power of the point.",
    },
    { type: "heading", text: "The power of a point" },
    {
      type: "callout",
      variant: "definition",
      title: "Power of a point",
      content:
        "The **power** of $P(x_1, y_1)$ with respect to $S = 0$ (unit $x^2$ coefficient) is\n\n$$S_1 = CP^2 - r^2$$\n\n- $P$ outside: $S_1 > 0$ and $S_1 = L^2$, the square of the tangent length\n- $P$ on the circle: $S_1 = 0$\n- $P$ inside: $S_1 < 0$\n\nFor **any** line through $P$ meeting the circle at $A$ and $B$, $PA \\cdot PB = \\lvert S_1\\rvert$.",
    },
    {
      type: "text",
      content:
        "The last fact (the power-of-a-point theorem) follows from the parametric form of a line. Put $(x_1 + t\\cos\\theta,\\ y_1 + t\\sin\\theta)$ into $S$: you get $t^2 + (\\dots)t + S_1 = 0$, whose roots $t_1$, $t_2$ are the signed distances $PA$ and $PB$. Their product is $S_1$, **whatever the direction $\\theta$**.",
    },
    {
      type: "worked-example",
      id: "slc5-6-we1",
      title: "Worked example 1: the power-of-a-point theorem",
      problem:
        "A line through $P(10, 0)$ meets $x^2 + y^2 = 36$ at $A$ and $B$ with $PA = 4$. Find $PB$.",
      steps: [
        { text: "Power of $P$: $100 - 36 = 64 > 0$, so $P$ is outside." },
        { text: "$PA \\cdot PB = 64$, so $PB = 16$. *Why this step:* the product does not depend on which secant is drawn, so the direction never needs to be found." },
        { text: "Sanity check along the x-axis: $A = (6, 0)$ and $B = (-6, 0)$ give $4 \\cdot 16 = 64$." },
      ],
      answer: "$PB = 16$.",
    },
    { type: "heading", text: "The radical axis" },
    {
      type: "text",
      content:
        "Which points have **equal power** with respect to two circles? For an outside point that means equal tangent lengths to both circles. The condition $S_1 = S'_1$ for the point $(x, y)$ is",
    },
    {
      type: "math",
      latex: "S - S' = 0 \\iff 2(g_1 - g_2)x + 2(f_1 - f_2)y + (c_1 - c_2) = 0",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Radical axis",
      content:
        "The **radical axis** of two non-concentric circles is the locus of points of equal power: $S - S' = 0$ (unit $x^2$ coefficients). It is always perpendicular to the line of centres.\n\n- crossing circles: it is the common chord\n- touching circles: it is the common tangent at the point of contact\n- separate circles: it lies between them (but not, in general, through the midpoint of $C_1C_2$), and from any of its points outside the circles the tangents to both circles are equal\n- concentric circles: $S - S'$ is a non-zero constant, so there is no radical axis",
    },
    {
      type: "interactive",
      config: {
        component: "slc-circle-lab",
        mode: "two-circles",
        centre: [-3, 0],
        radius: { min: 0.5, max: 4, step: 0.25, initial: 2 },
        centre2: [3, 0],
        radius2: { min: 0.5, max: 4, step: 0.25, initial: 1 },
        show: ["radical-axis"],
        draggable: ["centre", "centre2"],
        caption:
          "Two separate circles and their radical axis. Make the left circle bigger: the axis slides **towards the smaller circle**, away from the midpoint of the centres. Drag the circles into each other and the axis becomes the common chord; make them touch and it becomes the common tangent.",
      },
    },
    {
      type: "worked-example",
      id: "slc5-6-we2",
      title: "Worked example 2: the radical axis is not the perpendicular bisector",
      problem: "Find the radical axis of $x^2 + y^2 = 4$ and $x^2 + y^2 - 10x + 24 = 0$, and compare it with the midpoint of the centres.",
      steps: [
        { text: "Centres $(0, 0)$ and $(5, 0)$, radii 2 and 1: $d = 5 > 3$, separate circles." },
        { text: "$S - S' = 10x - 28 = 0$, so $x = 2.8$." },
        {
          text: "The midpoint of the centres has $x = 2.5$. *Why this step:* equal **powers** is not equal **distances**: $d_1^2 - 4 = d_2^2 - 1$ pushes the axis towards the smaller circle.",
        },
        { text: "Check at $(2.8, 0)$: $2.8^2 - 4 = 3.84$ and $2.2^2 - 1 = 3.84$. Equal tangent lengths $\\sqrt{3.84}$." },
      ],
      answer: "$x = 2.8$, which is not the perpendicular bisector $x = 2.5$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the radical axis bisects the segment of centres\"",
      content:
        "It does only when $r_1 = r_2$. In general it crosses $C_1C_2$ at the point $M$ with $C_1M^2 - r_1^2 = C_2M^2 - r_2^2$, which is closer to the smaller circle. Always compute $S - S' = 0$; never draw the perpendicular bisector by eye.",
    },
    { type: "heading", text: "The radical centre" },
    {
      type: "text",
      content:
        "Three circles give three radical axes, $S_1 - S_2 = 0$, $S_2 - S_3 = 0$, $S_3 - S_1 = 0$. The third equation is minus the sum of the first two, so a point on two of the axes is automatically on the third. If the centres are not collinear the axes are not parallel and they meet in one point, the **radical centre**: the point with equal power with respect to all three circles. If that power is positive, the circle centred at the radical centre with radius $\\sqrt{\\text{power}}$ cuts all three circles orthogonally (its radius is the common tangent length).",
    },
    {
      type: "interactive",
      config: {
        component: "slc-circle-lab",
        mode: "three-circles",
        centre: [-2.5, -1],
        radius: { min: 0.5, max: 3, step: 0.25, initial: 1.5 },
        centre2: [2.5, -1.5],
        radius2: { min: 0.5, max: 3, step: 0.25, initial: 1 },
        centre3: [0, 2.5],
        radius3: { min: 0.5, max: 3, step: 0.25, initial: 1.25 },
        show: ["radical-axis", "orthogonal"],
        draggable: ["centre", "centre2", "centre3"],
        caption:
          "The three radical axes always pass through one point, the radical centre. When it lies outside all three circles, the lab draws the circle that cuts all three at right angles. Line the three centres up and the axes become parallel: no radical centre.",
      },
    },
    {
      type: "worked-example",
      id: "slc5-6-we3",
      title: "Worked example 3: radical centre and the orthogonal circle",
      problem:
        "Find the radical centre of $x^2 + y^2 - 1 = 0$, $x^2 + y^2 - 8x + 15 = 0$, $x^2 + y^2 - 8y + 15 = 0$, and the circle cutting all three orthogonally.",
      steps: [
        { text: "First minus second: $8x - 16 = 0$, so $x = 2$." },
        { text: "First minus third: $8y - 16 = 0$, so $y = 2$. The radical centre is $(2, 2)$." },
        { text: "Power there: $4 + 4 - 1 = 7$ (check with the second: $4 + 4 - 16 + 15 = 7$). *Why this step:* a positive power means the radical centre is outside all three circles, so a real orthogonal circle exists." },
        { text: "Orthogonal circle: $(x - 2)^2 + (y - 2)^2 = 7$." },
      ],
      answer: "Radical centre $(2, 2)$; orthogonal circle $x^2 + y^2 - 4x - 4y + 1 = 0$.",
    },
    {
      type: "worked-example",
      id: "slc5-6-we4",
      title: "Worked example 4: centres of circles orthogonal to two circles",
      problem:
        "Show that the centre of any circle cutting both $S = 0$ and $S' = 0$ orthogonally lies on their radical axis.",
      steps: [
        { text: "Let the circle have centre $P$ and radius $\\rho$." },
        {
          text: "Orthogonal to $S$: $CP^2 = r^2 + \\rho^2$, so the power of $P$ with respect to $S$ is $CP^2 - r^2 = \\rho^2$. *Why this step:* orthogonality is exactly the statement that the radius $\\rho$ is the tangent length from $P$.",
        },
        { text: "Likewise the power of $P$ with respect to $S'$ is $\\rho^2$. Equal powers: $P$ is on the radical axis." },
      ],
      answer: "The locus of such centres is (the part outside both circles of) the radical axis $S - S' = 0$.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Coaxal systems in brief",
      content:
        "All circles $S + \\lambda(S - S') = 0$, equivalently $S + \\lambda L = 0$ with $L$ the radical axis of $S$ and $S'$, share the same radical axis pairwise. Such a family is called **coaxal**. When $S$ and $S'$ cross, every member passes through the two crossing points (the families of Lesson 5.5); when they don't, the members nest around two limiting points.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "slc5-6-q1",
      variant: "practice",
      question: "The radical axis of $x^2 + y^2 + 2x + 4y - 4 = 0$ and $x^2 + y^2 - 4x + 2y + 1 = 0$ is",
      options: [
        { text: "$6x + 2y - 5 = 0$", correct: true, feedback: "$S - S' = (2 + 4)x + (4 - 2)y + (-4 - 1)$." },
        { text: "$6x + 2y + 5 = 0$", feedback: "Constant: $c_1 - c_2 = -4 - 1 = -5$." },
        { text: "$x - 3y - 5 = 0$", feedback: "That is the line of centres, through $(-1, -2)$ and $(2, -1)$. The radical axis is perpendicular to it." },
        { text: "$6x + 2y - 3 = 0$", feedback: "That adds the constants: $-4 + 1$. Subtract: $-4 - 1$." },
      ],
      hint: "Subtract the second equation from the first.",
    },
    {
      type: "numeric",
      id: "slc5-6-q2",
      variant: "practice",
      question: "Find the power of the point $(3, 4)$ with respect to $x^2 + y^2 - 4x - 2y - 4 = 0$.",
      answer: 1,
      hint: "Substitute the point into the left side.",
      solution: "$9 + 16 - 12 - 8 - 4 = 1$. The point is just outside: tangent length 1.",
      commonMistakes: [
        { answer: 25, feedback: "That is only $x^2 + y^2$. Include the linear terms and the constant." },
        { answer: -1, feedback: "Recheck: $25 - 20 - 4 = 1$." },
      ],
    },
    {
      type: "numeric",
      id: "slc5-6-q3",
      variant: "practice",
      question:
        "The radical axis of $x^2 + y^2 = 4$ and $x^2 + y^2 - 10x + 24 = 0$ is the line $x = k$. Find $k$.",
      answer: 2.8,
      tolerance: 0.001,
      hint: "Subtract the equations.",
      solution: "$S - S' = 10x - 28 = 0$, so $k = 2.8$, nearer the smaller circle (centre $(5, 0)$, radius 1) than the midpoint $2.5$.",
      commonMistakes: [
        { answer: 2.5, feedback: "That is the midpoint of the centres. Equal powers, not equal distances." },
        { answer: 2.4, tolerance: 0.001, feedback: "That would come from $10x = 24$: subtract the constants, $-4 - 24 = -28$." },
      ],
    },
    {
      type: "numeric",
      id: "slc5-6-q4",
      variant: "practice",
      question:
        "Find the radical centre $(p, q)$ of $x^2 + y^2 - 9 = 0$, $x^2 + y^2 - 10x + 9 = 0$ and $x^2 + y^2 - 10y + 21 = 0$, and give $p + q$.",
      answer: 4.8,
      tolerance: 0.001,
      hint: "Subtract the second from the first, then the third from the first.",
      solution: "$10x - 18 = 0$ gives $p = 1.8$; $10y - 30 = 0$ gives $q = 3$. So $p + q = 4.8$.",
      commonMistakes: [
        { answer: 3.6, tolerance: 0.001, feedback: "Check the third subtraction: $-9 - 21 = -30$, so $q = 3$." },
        { answer: 5.4, tolerance: 0.001, feedback: "Check the first subtraction: $-9 - 9 = -18$, so $p = 1.8$." },
      ],
    },
    {
      type: "numeric",
      id: "slc5-6-q5",
      variant: "practice",
      question: "For the three circles in the previous question, find the radius of the circle that cuts all three orthogonally.",
      answer: 1.8,
      tolerance: 0.001,
      hint: "Its centre is the radical centre $(1.8, 3)$ and its radius is the square root of the common power.",
      solution: "Power with respect to $x^2 + y^2 - 9$: $3.24 + 9 - 9 = 3.24$. Radius $\\sqrt{3.24} = 1.8$. (Check with the third circle: $3.24 + 9 - 30 + 21 = 3.24$.)",
      commonMistakes: [
        { answer: 3.24, tolerance: 0.001, feedback: "3.24 is the power, the **square** of the radius." },
        { answer: 3.499, tolerance: 0.01, feedback: "That is the distance from the origin to the radical centre. The radius is the tangent length, $\\sqrt{\\text{power}}$." },
      ],
    },
    {
      type: "quiz",
      id: "slc5-6-q6",
      variant: "practice",
      multiple: true,
      question: "Which statements about the radical axis of two non-concentric circles are true? Select all that apply.",
      options: [
        { text: "It is perpendicular to the line of centres", correct: true, feedback: "Its normal $(g_1 - g_2, f_1 - f_2)$ points along $C_1C_2$." },
        { text: "For crossing circles it is the common chord", correct: true, feedback: "Both are $S - S' = 0$." },
        { text: "For circles touching externally it is the common tangent at the point of contact", correct: true, feedback: "It passes through the contact point (power 0 for both) and is perpendicular to $C_1C_2$." },
        { text: "Tangents drawn to the two circles from any of its points outside them are equal", correct: true, feedback: "Equal powers mean equal squared tangent lengths." },
        { text: "It always passes through the midpoint of $C_1C_2$", feedback: "Only when the radii are equal." },
      ],
      hint: "Everything follows from \"equal power\" and the form of $S - S'$.",
    },
    {
      type: "quiz",
      id: "slc5-6-q7",
      variant: "concept",
      question: "Two separate circles have radii 3 and 1. Their radical axis crosses the segment joining the centres",
      options: [
        { text: "closer to the centre of the smaller circle", correct: true, feedback: "At $M$: $C_1M^2 - 9 = C_2M^2 - 1$ forces $C_1M > C_2M$." },
        { text: "exactly at its midpoint", feedback: "That needs equal radii." },
        { text: "closer to the centre of the larger circle", feedback: "Test: with centres 6 apart, $x^2 - 9 = (6 - x)^2 - 1$ gives $x = \\frac{11}{3} > 3$, nearer the small circle." },
        { text: "nowhere: separate circles have no radical axis", feedback: "Only concentric circles lack a radical axis. Separate circles have one, between them." },
      ],
      hint: "Equal powers: $C_1M^2 - r_1^2 = C_2M^2 - r_2^2$. Which distance must be larger?",
    },
    {
      type: "numeric",
      id: "slc5-6-q8",
      variant: "practice",
      question:
        "A chord of $x^2 + y^2 = 25$ passes through $P(1, 1)$ and is divided by $P$ into segments $PA$ and $PB$. Find $PA \\cdot PB$.",
      answer: 23,
      hint: "Power of a point: $PA \\cdot PB = \\lvert S_1\\rvert$, the same for every chord through $P$.",
      solution: "$S_1 = 1 + 1 - 25 = -23$, so $PA \\cdot PB = 23$. Check with the diameter through $P$: $(5 - \\sqrt2)(5 + \\sqrt2) = 23$.",
      commonMistakes: [
        { answer: -23, feedback: "$S_1 = -23$ is negative because $P$ is inside; the product of the lengths is $\\lvert S_1\\rvert = 23$." },
        { answer: 2, feedback: "2 is $OP^2$. The product is $r^2 - OP^2$." },
      ],
    },
    {
      type: "quiz",
      id: "slc5-6-q9",
      variant: "practice",
      question:
        "JEE Main. The locus of the centres of circles that cut both $x^2 + y^2 + 4x - 6y + 9 = 0$ and $x^2 + y^2 - 4x + 6y + 4 = 0$ orthogonally is",
      options: [
        { text: "$8x - 12y + 5 = 0$", correct: true, feedback: "The centres lie on the radical axis: $S - S' = 8x - 12y + 5 = 0$." },
        { text: "$8x - 12y - 5 = 0$", feedback: "Constant: $9 - 4 = +5$." },
        { text: "$3x + 2y = 0$", feedback: "That is the line of centres, through $(-2, 3)$ and $(2, -3)$. The locus is perpendicular to it." },
        { text: "$x^2 + y^2 = 13$", feedback: "The locus of centres of circles orthogonal to two circles is a line, their radical axis." },
      ],
      hint: "Orthogonal to both means equal power (the radius squared) with respect to both.",
    },
    {
      type: "numeric",
      id: "slc5-6-q10",
      variant: "practice",
      question:
        "JEE Advanced. Find the radius of the circle that cuts $x^2 + y^2 - 4 = 0$, $2x^2 + 2y^2 - 12x + 10 = 0$ and $x^2 + y^2 - 6y + 8 = 0$ orthogonally.",
      answer: 1.5,
      tolerance: 0.001,
      hint: "Divide the second equation by 2 first. Then find the radical centre and the power there.",
      solution: "Second: $x^2 + y^2 - 6x + 5 = 0$. First minus second: $6x - 9 = 0$, $x = 1.5$. First minus third: $6y - 12 = 0$, $y = 2$. Power at $(1.5, 2)$: $2.25 + 4 - 4 = 2.25$. Radius $1.5$.",
      commonMistakes: [
        { answer: 2.25, tolerance: 0.001, feedback: "2.25 is the power, the square of the radius." },
        { answer: 2.5, tolerance: 0.001, feedback: "2.5 is the distance from the origin to the radical centre $(1.5, 2)$. The radius is the tangent length." },
      ],
    },
    {
      type: "quiz",
      id: "slc5-6-q11",
      variant: "practice",
      question: "The tangents drawn from a point $P$ to two non-concentric circles are equal in length. Then $P$ must lie on",
      options: [
        { text: "the radical axis of the two circles", correct: true, feedback: "Equal tangent lengths mean equal powers." },
        { text: "the perpendicular bisector of the segment of centres", feedback: "Equal tangent lengths are not equal distances to the centres unless the radii are equal." },
        { text: "the line of centres", feedback: "Points with equal tangents form a line perpendicular to the line of centres." },
        { text: "the director circle of either circle", feedback: "The director circle is about perpendicular tangents to one circle, not equal tangents to two." },
      ],
      hint: "Tangent length squared is the power of the point.",
    },
    {
      type: "quiz",
      id: "slc5-6-q12",
      variant: "practice",
      multiple: true,
      question: "JEE Advanced. Three circles with distinct centres are given. Which statements are true? Select all that apply.",
      options: [
        { text: "If the centres are collinear, the three radical axes are parallel and there is no radical centre", correct: true, feedback: "Each axis is perpendicular to the common line of centres." },
        { text: "If the centres are not collinear, the three radical axes are concurrent", correct: true, feedback: "$(S_1 - S_2) + (S_2 - S_3) + (S_3 - S_1) \\equiv 0$, and the axes are not parallel." },
        { text: "If the radical centre lies inside all three circles, no real circle cuts all three orthogonally", correct: true, feedback: "The common power is negative, so there is no real radius $\\sqrt{\\text{power}}$." },
        { text: "The radical centre is always the circumcentre of the triangle of centres", feedback: "Only when the three radii are equal." },
        { text: "If one pair of the circles does not intersect, there is no radical centre", feedback: "Non-intersecting circles still have a radical axis ($S - S' = 0$), so the radical centre still exists when the centres are not collinear." },
      ],
      hint: "Use $(S_1 - S_2) + (S_2 - S_3) + (S_3 - S_1) = 0$ and the meaning of a negative power.",
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
        "This lesson has no new theory and no formula sheet. Every result in this chapter was built from three expressions, $S$, $S_1$ and $T$, and from two right angles: the radius meets a tangent at $90^\\circ$, and the line from the centre to a chord's midpoint meets the chord at $90^\\circ$. If a question stalls, draw the circle, mark the centre, and look for those right angles.",
    },
    { type: "heading", text: "Reconstruct it" },
    {
      type: "callout",
      variant: "tip",
      title: "Rebuild the chapter from S, S₁ and T",
      content:
        "Without notes, answer each of these:\n\n1. Why does the chord with midpoint $(x_1, y_1)$ have the equation $T = S_1$? (Start from \"perpendicular to $CM$, through $M$\".)\n2. Why does the chord of contact from $P$ come out as $T = 0$ without ever finding the points of contact? (Swap the roles of $(x, y)$ and $(x_1, y_1)$.)\n3. Why is the director circle of radius $r\\sqrt2$? (Draw the square.)\n4. Why does $d$ against $r_1 + r_2$ and $\\lvert r_1 - r_2\\rvert$ decide the number of common tangents? (Slide one coin towards another.)\n5. Why is orthogonality $2g_1g_2 + 2f_1f_2 = c_1 + c_2$? (Write $d^2 = r_1^2 + r_2^2$ in coefficients.)\n6. Why does every circle through the meeting points of $S$ and $L$ have the form $S + \\lambda L = 0$, and why is $\\lambda = -1$ forbidden in $S + \\lambda S' = 0$?\n7. Why do the three radical axes of three circles meet in a point?",
    },
    {
      type: "interactive",
      config: {
        component: "slc-circle-lab",
        mode: "two-circles",
        centre: [-1.5, 0],
        radius: { min: 0.5, max: 4, step: 0.25, initial: 2 },
        centre2: [2, 1],
        radius2: { min: 0.5, max: 4, step: 0.25, initial: 1.5 },
        show: ["common-tangents", "radical-axis", "orthogonal"],
        draggable: ["centre", "centre2"],
        caption:
          "Check your reconstructions here. Before you drag, predict the number of common tangents, where the radical axis will sit, and whether the circles will be orthogonal; then drag and compare.",
      },
    },
    { type: "heading", text: "Mastery questions" },
    {
      type: "numeric",
      id: "slc5-7-q1",
      variant: "mastery",
      question:
        "Find the length of the chord of $x^2 + y^2 - 4x - 6y - 12 = 0$ whose midpoint is $(4, 3)$, to two decimal places.",
      answer: 9.165,
      tolerance: 0.01,
      hint: "Lesson 5.1: centre $(2, 3)$, radius 5, and length $= 2\\sqrt{r^2 - CM^2}$.",
      solution: "$CM = 2$, so the length is $2\\sqrt{25 - 4} = 2\\sqrt{21} \\approx 9.17$. (The chord itself is $x = 4$.)",
      commonMistakes: [
        { answer: 4.583, tolerance: 0.01, feedback: "That is the half-chord $\\sqrt{21}$." },
        { answer: 10, feedback: "10 is the diameter. The chord bisected at $(4, 3)$ is 2 units from the centre." },
      ],
    },
    {
      type: "numeric",
      id: "slc5-7-q2",
      variant: "mastery",
      question:
        "Tangents from $(2, 4)$ touch $x^2 + y^2 = 4$ at $A$ and $B$. Find the area of triangle $PAB$, where $P = (2, 4)$.",
      answer: 6.4,
      tolerance: 0.01,
      hint: "Lesson 5.1: $L = \\sqrt{S_1}$, $R = 2$, area $= \\frac{RL^3}{R^2 + L^2}$.",
      solution: "$L^2 = 4 + 16 - 4 = 16$, $L = 4$. Area $= \\frac{2 \\cdot 64}{4 + 16} = 6.4$. Check: the chord $2x + 4y = 4$ has length $\\frac{2 \\cdot 4 \\cdot 2}{\\sqrt{20}} = \\frac{16}{\\sqrt{20}}$ and lies $\\frac{16}{\\sqrt{20}}$ from $P$, so the area is $\\frac12 \\cdot \\frac{256}{20} = 6.4$.",
      commonMistakes: [
        { answer: 8, feedback: "$RL = 8$ is the area of the kite $PACB$ (with the centre), not of triangle $PAB$." },
        { answer: 12.8, tolerance: 0.01, feedback: "You doubled the area. Area is half base times height." },
      ],
    },
    {
      type: "quiz",
      id: "slc5-7-q3",
      variant: "mastery",
      question: "The pole of $3x + 4y = 50$ with respect to $x^2 + y^2 = 100$ is",
      options: [
        { text: "$(6, 8)$", correct: true, feedback: "$\\frac h3 = \\frac k4 = \\frac{100}{50} = 2$. Its polar $6x + 8y = 100$ is the given line." },
        { text: "$\\left(\\frac32, 2\\right)$", feedback: "That uses the ratio $\\frac{50}{100}$ upside down; its polar is $3x + 4y = 200$." },
        { text: "$(-6, -8)$", feedback: "Its polar is $-6x - 8y = 100$, on the other side of the centre." },
        { text: "$(12, 16)$", feedback: "Its polar is $12x + 16y = 100$, i.e. $3x + 4y = 25$." },
      ],
      hint: "Lesson 5.2: make $hx + ky = 100$ proportional to $3x + 4y = 50$.",
    },
    {
      type: "numeric",
      id: "slc5-7-q4",
      variant: "mastery",
      question:
        "The director circle of $x^2 + y^2 - 2x + 6y + 1 = 0$ is $x^2 + y^2 - 2x + 6y + c = 0$. Find $c$.",
      answer: -8,
      hint: "Lesson 5.2: same centre, radius squared doubled.",
      solution: "Centre $(1, -3)$, $r^2 = 1 + 9 - 1 = 9$. Director circle $(x - 1)^2 + (y + 3)^2 = 18$, i.e. $x^2 + y^2 - 2x + 6y + 10 - 18 = 0$, so $c = -8$.",
      commonMistakes: [
        { answer: 2, feedback: "Doubling the constant term is not doubling $r^2$. Write the centre-radius form first." },
        { answer: -26, feedback: "That uses $(2r)^2 = 36$. The director radius is $r\\sqrt2$, so $r^2$ doubles to 18." },
      ],
    },
    {
      type: "numeric",
      id: "slc5-7-q5",
      variant: "mastery",
      question: "How many common tangents do $x^2 + y^2 = 1$ and $x^2 + y^2 - 6x - 8y + 9 = 0$ have?",
      answer: 3,
      hint: "Lesson 5.3: second circle centre $(3, 4)$, radius $\\sqrt{9 + 16 - 9}$.",
      solution: "$r_2 = 4$, $r_1 = 1$, $d = 5 = r_1 + r_2$: external touching, 3 common tangents.",
      commonMistakes: [
        { answer: 4, feedback: "Four needs $d > 5$. Here $d = 5$ exactly." },
        { answer: 2, feedback: "Touching circles keep both direct tangents and add the tangent at the contact point." },
      ],
    },
    {
      type: "numeric",
      id: "slc5-7-q6",
      variant: "mastery",
      question:
        "Find the length of a transverse common tangent of $(x - 1)^2 + (y - 2)^2 = 4$ and $(x - 7)^2 + (y - 10)^2 = 36$.",
      answer: 6,
      hint: "Lesson 5.3: $\\sqrt{d^2 - (r_1 + r_2)^2}$.",
      solution: "$d = \\sqrt{36 + 64} = 10$, $r_1 + r_2 = 8$: $\\sqrt{100 - 64} = 6$.",
      commonMistakes: [
        { answer: 9.165, tolerance: 0.01, feedback: "That is the direct tangent, $\\sqrt{100 - 16}$." },
        { answer: 8, feedback: "8 is $r_1 + r_2$." },
      ],
    },
    {
      type: "numeric",
      id: "slc5-7-q7",
      variant: "mastery",
      question:
        "The circles $x^2 + y^2 - 4x + 2ky + 3 = 0$ and $x^2 + y^2 + 6x + 4y - 1 = 0$ cut orthogonally. Find $k$.",
      answer: 3.5,
      tolerance: 0.001,
      hint: "Lesson 5.4: $2g_1g_2 + 2f_1f_2 = c_1 + c_2$ with $g_1 = -2$, $f_1 = k$, $g_2 = 3$, $f_2 = 2$.",
      solution: "$2(-2)(3) + 2(k)(2) = 3 - 1$: $-12 + 4k = 2$, so $k = 3.5$.",
      commonMistakes: [
        { answer: 4, feedback: "That uses the difference $c_1 - c_2 = 4$ on the right. The condition has the **sum** $3 + (-1) = 2$." },
        { answer: -2.5, tolerance: 0.001, feedback: "Sign slip on $2g_1g_2 = 2(-2)(3) = -12$." },
      ],
    },
    {
      type: "numeric",
      id: "slc5-7-q8",
      variant: "mastery",
      question:
        "Find the length of the common chord of $x^2 + y^2 = 9$ and $x^2 + y^2 - 6x = 0$, to two decimal places.",
      answer: 5.196,
      tolerance: 0.01,
      hint: "Lesson 5.4: subtract to get the chord, then use the first circle.",
      solution: "$S - S' = 6x - 9 = 0$, $x = \\frac32$. Half-chord $\\sqrt{9 - \\frac94} = \\frac{3\\sqrt3}{2}$, so the length is $3\\sqrt3 \\approx 5.20$.",
      commonMistakes: [
        { answer: 2.598, tolerance: 0.01, feedback: "That is the half-chord." },
        { answer: 6, feedback: "6 is a diameter. The chord $x = \\frac32$ is not a diameter of either circle." },
      ],
    },
    {
      type: "quiz",
      id: "slc5-7-q9",
      variant: "mastery",
      question:
        "The circle through the meeting points of $x^2 + y^2 - 6x = 0$ and $x^2 + y^2 - 4y = 0$ whose centre lies on $y = x$ is",
      options: [
        { text: "$5x^2 + 5y^2 - 12x - 12y = 0$", correct: true, feedback: "$(1 + \\lambda)(x^2 + y^2) - 6x - 4\\lambda y = 0$ has centre $\\left(\\frac{3}{1 + \\lambda}, \\frac{2\\lambda}{1 + \\lambda}\\right)$; on $y = x$ gives $\\lambda = \\frac32$." },
        { text: "$x^2 + y^2 - 3x - 2y = 0$", feedback: "That is $\\lambda = 1$, centre $(\\frac32, 1)$, not on $y = x$." },
        { text: "$x^2 + y^2 - 6x - 4y = 0$", feedback: "That adds $-6x$ and $-4y$ to a single $x^2 + y^2$, which is not of the form $S + \\lambda S'$ (it misses the meeting point $(\\frac{24}{13}, \\frac{36}{13})$)." },
        { text: "$5x^2 + 5y^2 + 12x + 12y = 0$", feedback: "Its centre $(-\\frac65, -\\frac65)$ is on $y = x$, but it does not pass through $(\\frac{24}{13}, \\frac{36}{13})$." },
      ],
      hint: "Lesson 5.5: write $S + \\lambda S' = 0$, find its centre, and put it on $y = x$.",
    },
    {
      type: "numeric",
      id: "slc5-7-q10",
      variant: "mastery",
      question:
        "Find the radius of the circle that cuts $x^2 + y^2 = 4$, $x^2 + y^2 - 4x = 0$ and $x^2 + y^2 - 4y - 12 = 0$ orthogonally.",
      answer: 1,
      hint: "Lesson 5.6: the centre is the radical centre and the radius is the square root of the power there.",
      solution: "First minus second: $4x - 4 = 0$, $x = 1$. First minus third: $4y + 8 = 0$, $y = -2$. Power at $(1, -2)$: $1 + 4 - 4 = 1$. Radius 1. (Checks: $1 + 4 - 4 = 1$ and $1 + 4 + 8 - 12 = 1$.)",
      commonMistakes: [
        { answer: 2.236, tolerance: 0.01, feedback: "That is the distance from the origin to the radical centre." },
        { answer: 5, feedback: "5 is $x^2 + y^2$ at the radical centre; subtract 4 to get the power." },
      ],
    },
    {
      type: "quiz",
      id: "slc5-7-q11",
      variant: "mastery",
      multiple: true,
      question:
        "Tangents $PA$ and $PB$ are drawn from $P(7, 1)$ to $x^2 + y^2 = 25$. Which statements are true? Select all that apply.",
      options: [
        { text: "$\\angle APB = 90^\\circ$", correct: true, feedback: "$OP^2 = 50 = 2 \\cdot 25$: $P$ is on the director circle." },
        { text: "The chord of contact is $7x + y = 25$", correct: true, feedback: "$T = 0$." },
        { text: "$AB = 5\\sqrt2$", correct: true, feedback: "$L = R = 5$: $\\frac{2 \\cdot 5 \\cdot 5}{\\sqrt{50}} = 5\\sqrt2$. ($OAPB$ is a square and $AB$ its diagonal.)" },
        { text: "The area of triangle $PAB$ is 25", feedback: "$\\frac{RL^3}{R^2 + L^2} = \\frac{625}{50} = 12.5$: half of the square $OAPB$." },
        { text: "Each tangent has length 5", correct: true, feedback: "$\\sqrt{49 + 1 - 25} = 5$." },
      ],
      hint: "Lessons 5.1 and 5.2: compute $OP^2$ first.",
    },
    {
      type: "numeric",
      id: "slc5-7-q12",
      variant: "mastery",
      question:
        "JEE Main. The midpoints of the chords of $x^2 + y^2 = 4$ that subtend an angle of $120^\\circ$ at the centre lie on $x^2 + y^2 = k$. Find $k$.",
      answer: 1,
      hint: "Lesson 5.1: the distance from the centre to the midpoint is $r\\cos 60^\\circ$.",
      solution: "Half the angle is $60^\\circ$, so the distance is $2\\cos 60^\\circ = 1$ and $k = 1$.",
      commonMistakes: [
        { answer: 3, feedback: "$3 = (2\\sin 60^\\circ)^2$ is the square of the half-chord, not of the distance to the centre." },
        { answer: 2, feedback: "That is the right-angle case, $\\frac{r^2}{2}$. For $120^\\circ$ the chord is closer to the centre." },
      ],
    },
    {
      type: "quiz",
      id: "slc5-7-q13",
      variant: "mastery",
      question:
        "JEE Main. The circles $x^2 + y^2 = 4$ and $x^2 + y^2 - 6x - 8y + k = 0$ have exactly two common tangents if and only if",
      options: [
        { text: "$-24 < k < 16$", correct: true, feedback: "Centre $(3, 4)$, $r^2 = 25 - k$, $d = 5$. Crossing needs $3 < r < 7$, i.e. $9 < 25 - k < 49$." },
        { text: "$k < 16$", feedback: "That only gives $r > 3$. For $r \\ge 7$ the small circle is inside or touching internally." },
        { text: "$-24 < k < 9$", feedback: "The bound 9 belongs to $r^2$, not to $k$: $r^2 > 9$ means $k < 16$." },
        { text: "$k > 16$", feedback: "Then $r < 3$ and $d > r_1 + r_2$: four common tangents (or no circle at all for $k > 25$)." },
      ],
      hint: "Lesson 5.3: two common tangents means the circles cross: $\\lvert r_1 - r_2\\rvert < d < r_1 + r_2$.",
    },
    {
      type: "numeric",
      id: "slc5-7-q14",
      variant: "mastery",
      question:
        "A circle touches the line $x + y = 2$ at $(1, 1)$ and passes through $(0, 4)$. Find the square of its radius.",
      answer: 12.5,
      tolerance: 0.001,
      hint: "Lesson 5.5: $(x - 1)^2 + (y - 1)^2 + \\lambda(x + y - 2) = 0$.",
      solution: "At $(0, 4)$: $1 + 9 + 2\\lambda = 0$, $\\lambda = -5$. Centre $\\left(1 + \\frac52, 1 + \\frac52\\right) = (3.5, 3.5)$, and $r^2 = 2.5^2 + 2.5^2 = 12.5$. Check: distance from $(0, 4)$ to the centre squared is $12.25 + 0.25 = 12.5$.",
      commonMistakes: [
        { answer: 3.536, tolerance: 0.01, feedback: "That is the radius itself; the question asks for its square." },
        { answer: 10, feedback: "10 is $-2\\lambda$ (the value of the point-circle part at $(0, 4)$), not $r^2$." },
      ],
    },
    {
      type: "quiz",
      id: "slc5-7-q15",
      variant: "mastery",
      multiple: true,
      question:
        "JEE Advanced. Let $S \\equiv x^2 + y^2 - 4$ and $S' \\equiv x^2 + y^2 - 6x + 8$. Which statements are true? Select all that apply.",
      options: [
        { text: "The circles touch externally at $(2, 0)$", correct: true, feedback: "Centres $(0, 0)$, $(3, 0)$, radii 2 and 1: $d = 3 = 2 + 1$." },
        { text: "Their radical axis is $x = 2$", correct: true, feedback: "$S - S' = 6x - 12 = 0$, the common tangent at the contact point." },
        { text: "They have exactly three common tangents", correct: true, feedback: "External touching." },
        { text: "Every member of $S + \\lambda S' = 0$ ($\\lambda \\ne -1$) touches the line $x = 2$ at $(2, 0)$", correct: true, feedback: "Each member passes through $(2, 0)$ and has its centre $\\left(\\frac{3\\lambda}{1 + \\lambda}, 0\\right)$ on the x-axis, so its tangent there is vertical." },
        { text: "They cut orthogonally", feedback: "$d^2 = 9 \\ne 4 + 1$. Touching circles meet at angle $0$, not $90^\\circ$." },
      ],
      hint: "Find centres and radii first; then use $S - S'$ and the family $S + \\lambda S'$.",
    },
    {
      type: "numeric",
      id: "slc5-7-q16",
      variant: "mastery",
      question:
        "A line through $P(5, 5)$ cuts $x^2 + y^2 = 10$ at $A$ and $B$, with $PA = 5$. Find $PB$.",
      answer: 8,
      hint: "Lesson 5.6: $PA \\cdot PB$ equals the power of $P$.",
      solution: "Power $= 25 + 25 - 10 = 40$, so $PB = \\frac{40}{5} = 8$.",
      commonMistakes: [
        { answer: 10, feedback: "That uses $OP^2 = 50$. The power is $OP^2 - r^2 = 40$." },
        { answer: 6.325, tolerance: 0.01, feedback: "$\\sqrt{40}$ is the tangent length, the case $PA = PB$." },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Where this course has taken you",
      content:
        "You started with two points and the distance formula. From it came the section formula, the centres of a triangle and area (Chapter 0); slope and every form of a line (Chapter 1); the signed value $L(P)$ that measures side and distance (Chapter 2); families $L_1 + \\lambda L_2 = 0$ and pairs of lines (Chapter 3); the circle and its tangents (Chapter 4); and finally $S$, $S_1$ and $T$, which produce every chord, polar, family and radical axis (Chapter 5). The same three moves (turn a condition into an equation, use a family instead of solving, check with a picture) carry straight on into parabolas, ellipses and hyperbolas.",
    },
  ]),
};

export const slcChapter5Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lessonMastery,
];
