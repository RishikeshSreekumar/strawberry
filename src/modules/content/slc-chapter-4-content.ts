import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Straight Lines and Circles Chapter 4 — Circles. The circle as "every
 * point at distance r from a centre", written in centre-radius, general,
 * diameter and parametric form; the conditions for a second-degree equation
 * to be a circle; circles touching the axes and the intercepts on the axes;
 * the position of a point (the sign of S₁) with nearest and farthest
 * distances; a line against a circle (distance from the centre against the
 * radius, chord length, the tangency condition c² = a²(1 + m²)); tangents
 * at a point (T = 0), of a given slope and from an external point, the
 * tangent length √S₁; and normals, which always pass through the centre.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "the-equation-of-a-circle",
  title: "4.1 · The Equation of a Circle",
  position: 1,
  blocks: blocks([
    {
      type: "text",
      content:
        "Tie a string of length $r$ to a peg and swing a pencil around it: the pencil traces a **circle**. Everything about circles in coordinate geometry comes from that one sentence: a circle is the set of all points at a fixed distance $r$ (the **radius**) from a fixed point (the **centre**).",
    },
    {
      type: "text",
      content:
        "You already own the tool that turns \"at distance $r$\" into algebra: the distance formula from Chapter 0. In this lesson we write the circle's equation, expand it into the **general form** that JEE questions are written in, and learn to read the centre and radius straight back out of it.",
    },
    { type: "heading", text: "Centre-radius form" },
    {
      type: "text",
      content:
        "Let the centre be $C(h, k)$ and let $P(x, y)$ be any point of the plane. $P$ is on the circle exactly when $CP = r$. Squaring both sides (both are non-negative, so nothing is lost):",
    },
    {
      type: "math",
      latex: "CP = r \\iff (x - h)^2 + (y - k)^2 = r^2",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Centre-radius form",
      content:
        "The circle with centre $(h, k)$ and radius $r$ is $(x - h)^2 + (y - k)^2 = r^2$.\n\n- centre at the origin: $x^2 + y^2 = r^2$\n- the equation says nothing more than \"distance from the centre equals $r$\": every circle fact in this chapter is a consequence",
    },
    {
      type: "worked-example",
      id: "slc4-1-we1",
      title: "Worked example 1: writing a circle from its centre and a point",
      problem: "Find the equation of the circle with centre $(2, -3)$ that passes through $(5, 1)$.",
      steps: [
        { text: "The radius is the distance from the centre to the given point. *Why this step:* a point on the circle is at distance $r$ from the centre, by definition.", latex: "r^2 = (5 - 2)^2 + (1 + 3)^2 = 9 + 16 = 25" },
        { text: "Substitute into the centre-radius form.", latex: "(x - 2)^2 + (y + 3)^2 = 25" },
        { text: "Expanded: $x^2 - 4x + 4 + y^2 + 6y + 9 = 25$." },
      ],
      answer: "$(x - 2)^2 + (y + 3)^2 = 25$, i.e. $x^2 + y^2 - 4x + 6y - 12 = 0$.",
    },
    { type: "heading", text: "The general form" },
    {
      type: "text",
      content:
        "Expand $(x - h)^2 + (y - k)^2 = r^2$ and every circle becomes $x^2 + y^2 - 2hx - 2ky + (h^2 + k^2 - r^2) = 0$. Naming the coefficients $2g = -2h$, $2f = -2k$ and $c = h^2 + k^2 - r^2$ gives the form in which circles are usually handed to you:",
    },
    {
      type: "math",
      latex: "x^2 + y^2 + 2gx + 2fy + c = 0",
    },
    {
      type: "text",
      content:
        "To read it backwards, complete both squares: $(x + g)^2 + (y + f)^2 = g^2 + f^2 - c$. So the centre is $(-g, -f)$ and $r^2 = g^2 + f^2 - c$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Centre and radius of the general form",
      content:
        "For $x^2 + y^2 + 2gx + 2fy + c = 0$:\n\n- centre $(-g, -f)$: **minus half** the coefficients of $x$ and $y$\n- radius $\\sqrt{g^2 + f^2 - c}$\n- $c$ is the value of the left side at the origin, so the circle passes through the origin iff $c = 0$\n\nThe recipe works **only** when the coefficients of $x^2$ and $y^2$ are both 1. Divide through first.",
    },
    {
      type: "interactive",
      config: {
        component: "slc-circle-lab",
        mode: "circle",
        centre: [1, -1],
        radius: { min: 0.5, max: 4, step: 0.25, initial: 3 },
        p: [3, 2],
        show: ["general-form"],
        caption:
          "Drag the centre and move the radius slider. Watch $g$ and $f$ track the centre with the **opposite** sign, while $c = h^2 + k^2 - r^2$ falls as the circle grows. When the circle passes through the origin, $c$ is exactly 0.",
      },
    },
    {
      type: "worked-example",
      id: "slc4-1-we2",
      title: "Worked example 2: centre and radius from the general form",
      problem: "Find the centre and radius of $x^2 + y^2 - 6x + 4y - 12 = 0$.",
      steps: [
        { text: "Match coefficients: $2g = -6$, $2f = 4$, $c = -12$, so $g = -3$, $f = 2$." },
        { text: "Centre $(-g, -f) = (3, -2)$. *Why this step:* the centre is minus half of each linear coefficient." },
        { text: "Radius:", latex: "r = \\sqrt{g^2 + f^2 - c} = \\sqrt{9 + 4 + 12} = 5" },
      ],
      answer: "Centre $(3, -2)$, radius $5$.",
    },
    {
      type: "worked-example",
      id: "slc4-1-we3",
      title: "Worked example 3: divide first",
      problem: "Find the centre and radius of $2x^2 + 2y^2 - 8x + 12y + 8 = 0$.",
      steps: [
        { text: "Divide by 2 so the squares have coefficient 1. *Why this step:* the formulas $(-g, -f)$ and $\\sqrt{g^2 + f^2 - c}$ were derived for $x^2 + y^2 + \\dots$, not $2x^2 + 2y^2 + \\dots$", latex: "x^2 + y^2 - 4x + 6y + 4 = 0" },
        { text: "$g = -2$, $f = 3$, $c = 4$. Centre $(2, -3)$." },
        { text: "Radius:", latex: "r = \\sqrt{4 + 9 - 4} = 3" },
      ],
      answer: "Centre $(2, -3)$, radius $3$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the centre is (g, f)\"",
      content:
        "The centre of $x^2 + y^2 + 2gx + 2fy + c = 0$ is $(-g, -f)$. For $x^2 + y^2 - 6x + 4y - 12 = 0$ the centre is $(3, -2)$, not $(-3, 2)$ and not $(-6, 4)$. Check by completing the square: $(x - 3)^2 + (y + 2)^2 = 25$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"r = √(g² + f² + c)\"",
      content:
        "Completing the square **moves** $c$ to the other side: $(x + g)^2 + (y + f)^2 = g^2 + f^2 - c$. The minus sign is why a large positive $c$ can make the radius imaginary, and why $c = 0$ (a circle through the origin) gives $r = \\sqrt{g^2 + f^2}$, the distance from the centre to the origin.",
    },
    { type: "heading", text: "When is a second-degree equation a circle?" },
    {
      type: "text",
      content:
        "The general second-degree equation is $ax^2 + 2hxy + by^2 + 2gx + 2fy + c = 0$. Compare it with the expanded circle: the circle has **equal** coefficients of $x^2$ and $y^2$ and **no** $xy$ term. After dividing by $a$ the only remaining question is whether $g^2 + f^2 - c$ is a genuine square of a radius.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Conditions for a circle",
      content:
        "$ax^2 + 2hxy + by^2 + 2gx + 2fy + c = 0$ represents a circle iff\n\n1. $a = b \\ne 0$\n2. $h = 0$ (no $xy$ term)\n3. after dividing by $a$, $g^2 + f^2 - c \\ge 0$\n\nIf $g^2 + f^2 - c > 0$ it is a **real** circle. If it equals 0 the \"circle\" is a single point, the **point circle** (radius 0). If it is negative no real point satisfies the equation (an **imaginary circle**).",
    },
    {
      type: "worked-example",
      id: "slc4-1-we4",
      title: "Worked example 4: forcing a circle (JEE Main)",
      problem:
        "The equation $px^2 + (2 - q)xy + 3y^2 - 6qx + 30y + 6q = 0$ represents a circle. Find $p$, $q$, the centre and the radius.",
      steps: [
        { text: "No $xy$ term: $2 - q = 0$, so $q = 2$." },
        { text: "Equal squares: $p = 3$. The equation is $3x^2 + 3y^2 - 12x + 30y + 12 = 0$." },
        { text: "Divide by 3. *Why this step:* only now do the centre and radius formulas apply.", latex: "x^2 + y^2 - 4x + 10y + 4 = 0" },
        { text: "Centre $(2, -5)$, radius $\\sqrt{4 + 25 - 4} = 5$." },
      ],
      answer: "$p = 3$, $q = 2$, centre $(2, -5)$, radius $5$.",
    },
    { type: "heading", text: "A circle through three points" },
    {
      type: "text",
      content:
        "A circle has three unknowns ($g$, $f$, $c$), so three points fix it, provided they are not collinear. Substitute each point into $x^2 + y^2 + 2gx + 2fy + c = 0$ and solve the three linear equations. Look for shortcuts first: a point at the origin gives $c = 0$ immediately, and a right angle in the triangle means the hypotenuse is a diameter.",
    },
    {
      type: "worked-example",
      id: "slc4-1-we5",
      title: "Worked example 5: the circumcircle of three points",
      problem: "Find the circle through $(0, 0)$, $(4, 0)$ and $(0, 6)$.",
      steps: [
        { text: "Through the origin, so $c = 0$." },
        { text: "Through $(4, 0)$: $16 + 8g = 0$, so $g = -2$. Through $(0, 6)$: $36 + 12f = 0$, so $f = -3$." },
        { text: "The circle is $x^2 + y^2 - 4x - 6y = 0$: centre $(2, 3)$, radius $\\sqrt{13}$. *Why this step:* a check. The angle at the origin is a right angle, so the hypotenuse from $(4, 0)$ to $(0, 6)$ is a diameter, with midpoint $(2, 3)$ and half-length $\\frac12\\sqrt{52} = \\sqrt{13}$." },
      ],
      answer: "$x^2 + y^2 - 4x - 6y = 0$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "slc4-1-q1",
      variant: "practice",
      question: "Find the radius of the circle $x^2 + y^2 + 8x - 6y = 0$.",
      answer: 5,
      hint: "Here $g = 4$, $f = -3$, $c = 0$. Use $r = \\sqrt{g^2 + f^2 - c}$.",
      solution: "$r = \\sqrt{16 + 9 - 0} = 5$. (Since $c = 0$ the circle passes through the origin, and $r$ is the distance from the centre $(-4, 3)$ to the origin.)",
      commonMistakes: [
        { answer: 10, feedback: "10 is the diameter. The radius is $\\sqrt{g^2 + f^2 - c}$ with $g = 4$, not $2g = 8$." },
        { answer: 25, feedback: "25 is $r^2$. Take the square root." },
      ],
    },
    {
      type: "quiz",
      id: "slc4-1-q2",
      variant: "practice",
      question: "What is the centre of $x^2 + y^2 - 4x + 10y - 7 = 0$?",
      options: [
        { text: "$(2, -5)$", correct: true, feedback: "$2g = -4$ and $2f = 10$, so $(-g, -f) = (2, -5)$." },
        { text: "$(-2, 5)$", feedback: "That is $(g, f)$. The centre is $(-g, -f)$." },
        { text: "$(4, -10)$", feedback: "Halve the coefficients: the centre is minus **half** the coefficient of each variable." },
        { text: "$(-4, 10)$", feedback: "That is the coefficients themselves. Halve them and change their signs." },
      ],
      hint: "Centre $(-g, -f)$: minus half the coefficients of $x$ and $y$.",
    },
    {
      type: "numeric",
      id: "slc4-1-q3",
      variant: "practice",
      question: "Find the radius of the circle $3x^2 + 3y^2 - 6x + 12y - 12 = 0$.",
      answer: 3,
      hint: "Divide by 3 first, so that the coefficients of $x^2$ and $y^2$ are 1.",
      solution: "Dividing by 3: $x^2 + y^2 - 2x + 4y - 4 = 0$. Then $g = -1$, $f = 2$, $c = -4$ and $r = \\sqrt{1 + 4 + 4} = 3$.",
      commonMistakes: [
        { answer: 7.55, tolerance: 0.01, feedback: "You used $g = -3$, $f = 6$, $c = -12$ straight from the undivided equation. Divide by 3 first." },
        { answer: 9, feedback: "9 is $r^2$." },
      ],
    },
    {
      type: "quiz",
      id: "slc4-1-q4",
      variant: "concept",
      multiple: true,
      question: "Which of these equations represent a real circle of positive radius? Select all that apply.",
      options: [
        { text: "$x^2 + y^2 - 4x + 6y - 3 = 0$", correct: true, feedback: "$g^2 + f^2 - c = 4 + 9 + 3 = 16$: radius 4." },
        { text: "$2x^2 + 2y^2 + 4x - 8y + 1 = 0$", correct: true, feedback: "Divide by 2: $g = 1$, $f = -2$, $c = \\frac12$, and $1 + 4 - \\frac12 = \\frac92 > 0$." },
        { text: "$x^2 + 2y^2 - 4x + 1 = 0$", feedback: "The coefficients of $x^2$ and $y^2$ differ, so it is not a circle (it is an ellipse)." },
        { text: "$x^2 + y^2 + 2xy + 4 = 0$", feedback: "A circle has no $xy$ term." },
        { text: "$x^2 + y^2 - 2x + 4y + 5 = 0$", feedback: "$g^2 + f^2 - c = 1 + 4 - 5 = 0$: this is the point circle $(1, -2)$, radius 0." },
        { text: "$x^2 + y^2 + 6x + 10 = 0$", feedback: "$9 + 0 - 10 = -1 < 0$: no real point satisfies it." },
      ],
      hint: "Check three things: equal coefficients of $x^2$ and $y^2$, no $xy$ term, and $g^2 + f^2 - c > 0$ after dividing through.",
    },
    {
      type: "numeric",
      id: "slc4-1-q5",
      variant: "practice",
      question:
        "The circle with centre $(2, -3)$ and radius 4 is written as $x^2 + y^2 + 2gx + 2fy + c = 0$. Find $c$.",
      answer: -3,
      hint: "$c = h^2 + k^2 - r^2$, or expand $(x - 2)^2 + (y + 3)^2 = 16$.",
      solution: "$c = 4 + 9 - 16 = -3$, giving $x^2 + y^2 - 4x + 6y - 3 = 0$.",
      commonMistakes: [
        { answer: 29, feedback: "$c = h^2 + k^2 - r^2$: subtract $r^2$, don't add it." },
        { answer: 9, feedback: "You subtracted $r = 4$ instead of $r^2 = 16$." },
      ],
    },
    {
      type: "numeric",
      id: "slc4-1-q6",
      variant: "practice",
      question:
        "The circle with centre $(1, 2)$ passing through $(4, 6)$ is $x^2 + y^2 + 2gx + 2fy + c = 0$. Find $c$.",
      answer: -20,
      hint: "First $r^2$ = (distance from centre to the point)$^2$. Then $c = h^2 + k^2 - r^2$.",
      solution: "$r^2 = 3^2 + 4^2 = 25$, so $c = 1 + 4 - 25 = -20$: $x^2 + y^2 - 2x - 4y - 20 = 0$. Check $(4, 6)$: $16 + 36 - 8 - 24 - 20 = 0$.",
      commonMistakes: [
        { answer: 30, feedback: "Sign slip: $c = h^2 + k^2 - r^2$, not $h^2 + k^2 + r^2$." },
        { answer: 0, feedback: "Only a circle through the origin has $c = 0$. This one has radius 5 and centre at distance $\\sqrt5$ from the origin." },
      ],
    },
    {
      type: "quiz",
      id: "slc4-1-q7",
      variant: "practice",
      question: "For which real $k$ does $x^2 + y^2 - 4x + 2y + k = 0$ represent a real circle of positive radius?",
      options: [
        { text: "$k < 5$", correct: true, feedback: "$r^2 = 4 + 1 - k > 0$ gives $k < 5$." },
        { text: "$k \\le 5$", feedback: "At $k = 5$ the radius is 0: a point circle, not a circle of positive radius." },
        { text: "$k > 5$", feedback: "Then $g^2 + f^2 - k < 0$ and no real point satisfies the equation." },
        { text: "$k < -5$", feedback: "These work, but so does $k = 0$ (radius $\\sqrt5$). The condition is $5 - k > 0$." },
      ],
      hint: "Need $g^2 + f^2 - c > 0$ with $g = -2$, $f = 1$, $c = k$.",
    },
    {
      type: "numeric",
      id: "slc4-1-q8",
      variant: "practice",
      question: "Find the radius of the circle through $(0, 0)$, $(6, 0)$ and $(0, 8)$.",
      answer: 5,
      hint: "The triangle has a right angle at the origin. Which side is a diameter?",
      solution: "The hypotenuse from $(6, 0)$ to $(0, 8)$ has length 10 and is a diameter (angle in a semicircle), so $r = 5$. Algebraically: $c = 0$, $g = -3$, $f = -4$, $r = \\sqrt{9 + 16} = 5$.",
      commonMistakes: [
        { answer: 10, feedback: "10 is the diameter, the hypotenuse." },
        { answer: 7, feedback: "Average of 6 and 8 is not a radius. Use the hypotenuse as the diameter." },
      ],
    },
    {
      type: "numeric",
      id: "slc4-1-q9",
      variant: "practice",
      question:
        "JEE Main. The equation $(a - 2)x^2 + by^2 + (b - 3)xy + 4x + 4y - 1 = 0$ represents a circle. Find its radius (to two decimal places).",
      answer: 1.1055,
      tolerance: 0.01,
      hint: "No $xy$ term forces $b$. Equal squares then force $a$. Divide by the common coefficient before reading off $g$, $f$, $c$.",
      solution: "$b - 3 = 0$ gives $b = 3$, and $a - 2 = b$ gives $a = 5$. The equation is $3x^2 + 3y^2 + 4x + 4y - 1 = 0$, i.e. $x^2 + y^2 + \\frac43 x + \\frac43 y - \\frac13 = 0$. So $g = f = \\frac23$, $c = -\\frac13$ and $r^2 = \\frac49 + \\frac49 + \\frac39 = \\frac{11}{9}$, $r = \\frac{\\sqrt{11}}{3} \\approx 1.11$.",
      commonMistakes: [
        { answer: 3, feedback: "You read $g = f = 2$, $c = -1$ from the undivided equation. Divide by 3 first." },
        { answer: 1.22, tolerance: 0.01, feedback: "That is $r^2 = \\frac{11}{9}$. Take the square root." },
      ],
    },
    {
      type: "quiz",
      id: "slc4-1-q10",
      variant: "practice",
      question: "The circle through $(1, 1)$ and $(2, -1)$ with its centre on the x-axis is",
      options: [
        { text: "$x^2 + y^2 - 3x + 1 = 0$", correct: true, feedback: "Centre $(h, 0)$ with $(h - 1)^2 + 1 = (h - 2)^2 + 1$ gives $h = \\frac32$. Both points satisfy $x^2 + y^2 - 3x + 1 = 0$." },
        { text: "$x^2 + y^2 + 3x + 1 = 0$", feedback: "Centre $(-\\frac32, 0)$: check $(1, 1)$, giving $1 + 1 + 3 + 1 = 6 \\ne 0$." },
        { text: "$x^2 + y^2 - 3x - 1 = 0$", feedback: "Check $(1, 1)$: $1 + 1 - 3 - 1 = -2 \\ne 0$." },
        { text: "$x^2 + y^2 - 3y + 1 = 0$", feedback: "That centre $(0, \\frac32)$ is on the y-axis, not the x-axis." },
      ],
      hint: "Let the centre be $(h, 0)$ and equate its distances to the two points.",
    },
    {
      type: "numeric",
      id: "slc4-1-q11",
      variant: "practice",
      question:
        "JEE Main. A circle passes through $(2, 0)$ and $(0, 4)$ and its centre lies on the line $x + y = 2$. Find the square of its radius (to two decimal places).",
      answer: 5.5556,
      tolerance: 0.01,
      hint: "The centre $(h, k)$ is equidistant from the two points and satisfies $h + k = 2$: two linear equations.",
      solution: "$(h - 2)^2 + k^2 = h^2 + (k - 4)^2$ simplifies to $2k - h = 3$. With $h + k = 2$: $k = \\frac53$, $h = \\frac13$. Then $r^2 = \\left(\\frac13 - 2\\right)^2 + \\left(\\frac53\\right)^2 = \\frac{25}{9} + \\frac{25}{9} = \\frac{50}{9} \\approx 5.56$.",
      commonMistakes: [
        { answer: 2.357, tolerance: 0.01, feedback: "That is $r$. The question asks for $r^2 = \\frac{50}{9}$." },
        { answer: 5, feedback: "That is the square of half the distance between the points, which would put the centre at their midpoint $(1, 2)$. But $1 + 2 \\ne 2$." },
      ],
    },
    {
      type: "quiz",
      id: "slc4-1-q12",
      variant: "concept",
      multiple: true,
      question:
        "For the circle $x^2 + y^2 + 2gx + 2fy + c = 0$, which statements are true? Select all that apply.",
      options: [
        { text: "It passes through the origin iff $c = 0$", correct: true, feedback: "Substituting $(0, 0)$ leaves exactly $c$." },
        { text: "Its centre lies on the x-axis iff $f = 0$", correct: true, feedback: "The centre is $(-g, -f)$, on the x-axis iff $-f = 0$." },
        { text: "If $c < 0$ it is always a real circle", correct: true, feedback: "$g^2 + f^2 - c \\ge -c > 0$." },
        { text: "Its centre is $(g, f)$", feedback: "The centre is $(-g, -f)$." },
        { text: "Its radius is $\\sqrt{g^2 + f^2 + c}$", feedback: "Completing the square moves $c$ across: $r^2 = g^2 + f^2 - c$." },
      ],
      hint: "Complete the square: $(x + g)^2 + (y + f)^2 = g^2 + f^2 - c$, then test each statement.",
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "diameter-form-parametric-form-and-special-circles",
  title: "4.2 · Diameter Form, Parametric Form and Special Circles",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "The centre-radius form needs the centre. Very often a question hands you something else: the two ends of a diameter, the fact that the circle touches an axis, or the length of the chord it cuts on an axis. This lesson turns each of those into an equation directly, and then gives the circle a **parametric form** that is the fastest way to find a maximum or minimum on it.",
    },
    { type: "heading", text: "The diameter form" },
    {
      type: "text",
      content:
        "Let $A(x_1, y_1)$ and $B(x_2, y_2)$ be the ends of a diameter. The picture to keep in mind is the **angle in a semicircle**: for every other point $P$ on the circle, $\\angle APB = 90^\\circ$. So $PA \\perp PB$, and the product of their slopes is $-1$:",
    },
    {
      type: "math",
      latex: "\\frac{y - y_1}{x - x_1} \\cdot \\frac{y - y_2}{x - x_2} = -1 \\iff (x - x_1)(x - x_2) + (y - y_1)(y - y_2) = 0",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Diameter form",
      content:
        "The circle on the segment from $(x_1, y_1)$ to $(x_2, y_2)$ as diameter is\n\n$$(x - x_1)(x - x_2) + (y - y_1)(y - y_2) = 0$$\n\nThe cleared form also holds at $P = A$ and $P = B$ (both products vanish), so no point is lost. Reading off: $2g = -(x_1 + x_2)$, $2f = -(y_1 + y_2)$ and $c = x_1x_2 + y_1y_2$.",
    },
    {
      type: "worked-example",
      id: "slc4-2-we1",
      title: "Worked example 1: a circle on a diameter",
      problem: "Find the circle with $(1, 2)$ and $(5, -4)$ as the ends of a diameter, and check its centre and radius.",
      steps: [
        { text: "Diameter form:", latex: "(x - 1)(x - 5) + (y - 2)(y + 4) = 0" },
        { text: "Expand: $x^2 - 6x + 5 + y^2 + 2y - 8 = 0$, i.e. $x^2 + y^2 - 6x + 2y - 3 = 0$." },
        { text: "Check: the centre $(3, -1)$ is the midpoint of the diameter, and $r = \\sqrt{9 + 1 + 3} = \\sqrt{13}$ is half of $\\sqrt{16 + 36} = \\sqrt{52}$. *Why this step:* two independent routes to the same centre and radius catch sign slips." },
      ],
      answer: "$x^2 + y^2 - 6x + 2y - 3 = 0$ (centre $(3, -1)$, radius $\\sqrt{13}$).",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the diameter form has plus signs\"",
      content:
        "It is $(x - x_1)(x - x_2)$, with the endpoint coordinates **subtracted**, because the factors are the runs from $P$ to $A$ and to $B$. A quick test: the endpoints themselves must satisfy the equation. For the ends $(1, 2)$ and $(5, -4)$, $(x + 1)(x + 5) + \\dots$ fails at $x = 1$.",
    },
    { type: "heading", text: "Intercepts on the axes" },
    {
      type: "text",
      content:
        "Where does $x^2 + y^2 + 2gx + 2fy + c = 0$ cross the x-axis? Put $y = 0$: $x^2 + 2gx + c = 0$. Its two roots are the crossing points, and the distance between two roots of a monic quadratic is $\\sqrt{(\\text{sum})^2 - 4(\\text{product})}$.",
    },
    {
      type: "math",
      latex: "\\text{x-intercept} = 2\\sqrt{g^2 - c}, \\qquad \\text{y-intercept} = 2\\sqrt{f^2 - c}",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Intercepts and touching the axes",
      content:
        "- The circle cuts the x-axis in two points iff $g^2 > c$, and the chord it cuts has length $2\\sqrt{g^2 - c}$.\n- It **touches** the x-axis iff $g^2 = c$ (the two roots merge), and the y-axis iff $f^2 = c$.\n- Geometrically: a circle with centre $(h, k)$ touches the x-axis iff $r = \\lvert k\\rvert$, the y-axis iff $r = \\lvert h\\rvert$.\n- Touching both axes: centre $(\\pm a, \\pm a)$ and radius $\\lvert a\\rvert$, one circle family per quadrant.",
    },
    {
      type: "worked-example",
      id: "slc4-2-we2",
      title: "Worked example 2: the intercepts of a circle",
      problem: "Find the lengths of the chords cut by $x^2 + y^2 - 6x - 8y + 5 = 0$ on the two axes.",
      steps: [
        { text: "$g = -3$, $f = -4$, $c = 5$." },
        { text: "x-intercept $2\\sqrt{g^2 - c} = 2\\sqrt{9 - 5} = 4$. Check: $y = 0$ gives $x^2 - 6x + 5 = 0$, roots 1 and 5, which are 4 apart." },
        { text: "y-intercept $2\\sqrt{f^2 - c} = 2\\sqrt{16 - 5} = 2\\sqrt{11}$." },
      ],
      answer: "$4$ on the x-axis and $2\\sqrt{11}$ on the y-axis.",
    },
    {
      type: "worked-example",
      id: "slc4-2-we3",
      title: "Worked example 3: touching both axes",
      problem: "Find every circle that touches both coordinate axes and has its centre on the line $2x - y = 3$.",
      steps: [
        { text: "Touching both axes forces the centre to $(a, a)$ or $(a, -a)$ with radius $\\lvert a\\rvert$. *Why this step:* the distances to both axes must equal the radius, so $\\lvert h\\rvert = \\lvert k\\rvert = r$." },
        { text: "Centre $(a, a)$: $2a - a = 3$, so $a = 3$: $(x - 3)^2 + (y - 3)^2 = 9$." },
        { text: "Centre $(a, -a)$: $2a + a = 3$, so $a = 1$: $(x - 1)^2 + (y + 1)^2 = 1$." },
      ],
      answer: "$x^2 + y^2 - 6x - 6y + 9 = 0$ and $x^2 + y^2 - 2x + 2y + 1 = 0$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the intercept is 2√(g² + c)\"",
      content:
        "The x-intercept is $2\\sqrt{g^2 - c}$. It comes from the roots of $x^2 + 2gx + c = 0$, whose difference is $\\sqrt{4g^2 - 4c}$. For $x^2 + y^2 - 6x - 8y + 5 = 0$ the wrong formula gives $2\\sqrt{14}$, but the roots 1 and 5 are plainly 4 apart.",
    },
    { type: "heading", text: "The parametric form" },
    {
      type: "text",
      content:
        "Walk around the circle with centre $(h, k)$ and radius $r$, and let $\\theta$ be the angle the radius makes with the positive x-direction. The run and rise of the radius are $r\\cos\\theta$ and $r\\sin\\theta$, exactly as on the unit circle, just scaled and shifted:",
    },
    {
      type: "math",
      latex: "x = h + r\\cos\\theta, \\qquad y = k + r\\sin\\theta, \\qquad 0 \\le \\theta < 2\\pi",
    },
    {
      type: "interactive",
      config: {
        component: "slc-circle-lab",
        mode: "circle",
        centre: [1, 1],
        radius: { min: 0.5, max: 4, step: 0.25, initial: 3 },
        p: [4, 1],
        show: ["parametric", "general-form"],
        caption:
          "Move the $\\theta$ slider and watch the point $(h + r\\cos\\theta,\\ k + r\\sin\\theta)$ travel round the circle. One parameter replaces two coordinates tied by an equation, which is why the parametric form turns a maximum on a circle into a maximum of $a\\cos\\theta + b\\sin\\theta$.",
      },
    },
    {
      type: "text",
      content:
        "The pay-off: any linear expression $px + qy$ on the circle becomes $\\text{constant} + r(p\\cos\\theta + q\\sin\\theta)$, and you know from trigonometry that $p\\cos\\theta + q\\sin\\theta$ ranges over $\\left[-\\sqrt{p^2 + q^2}, \\sqrt{p^2 + q^2}\\right]$.",
    },
    {
      type: "worked-example",
      id: "slc4-2-we4",
      title: "Worked example 4: a maximum on a circle",
      problem: "Find the greatest value of $x + y$ for points $(x, y)$ on $x^2 + y^2 - 2x - 4y - 4 = 0$.",
      steps: [
        { text: "Centre $(1, 2)$, radius $\\sqrt{1 + 4 + 4} = 3$. Parametrise: $x = 1 + 3\\cos\\theta$, $y = 2 + 3\\sin\\theta$." },
        { text: "Then $x + y = 3 + 3(\\cos\\theta + \\sin\\theta)$. *Why this step:* a two-variable maximum has become a one-variable trigonometric one." },
        { text: "$\\cos\\theta + \\sin\\theta \\le \\sqrt2$, with equality at $\\theta = \\frac{\\pi}{4}$.", latex: "x + y \\le 3 + 3\\sqrt2" },
      ],
      answer: "$3 + 3\\sqrt2$, at the point $\\left(1 + \\frac{3}{\\sqrt2},\\ 2 + \\frac{3}{\\sqrt2}\\right)$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "slc4-2-q1",
      variant: "practice",
      question:
        "The circle on the segment joining $(-2, 3)$ and $(4, -5)$ as diameter is $x^2 + y^2 + 2gx + 2fy + c = 0$. Find $c$.",
      answer: -23,
      hint: "In the diameter form, $c = x_1x_2 + y_1y_2$.",
      solution: "$(x + 2)(x - 4) + (y - 3)(y + 5) = 0$ has constant term $(2)(-4) + (-3)(5) = -8 - 15 = -23$.",
      commonMistakes: [
        { answer: 7, feedback: "Sign slip: $x_1x_2 = (-2)(4) = -8$ and $y_1y_2 = (3)(-5) = -15$." },
        { answer: -7, feedback: "Check $y_1y_2 = 3 \\times (-5) = -15$, and add it to $x_1x_2 = -8$." },
      ],
    },
    {
      type: "numeric",
      id: "slc4-2-q2",
      variant: "practice",
      question: "Find the radius of the circle having $(0, 0)$ and $(6, 8)$ as the ends of a diameter.",
      answer: 5,
      hint: "The radius is half the length of the diameter.",
      solution: "The diameter has length $\\sqrt{36 + 64} = 10$, so $r = 5$. (Diameter form: $x^2 + y^2 - 6x - 8y = 0$, $r = \\sqrt{9 + 16} = 5$.)",
      commonMistakes: [{ answer: 10, feedback: "10 is the diameter." }],
    },
    {
      type: "numeric",
      id: "slc4-2-q3",
      variant: "practice",
      question: "Find the length of the chord cut on the x-axis by $x^2 + y^2 - 8x + 6y + 12 = 0$.",
      answer: 4,
      hint: "x-intercept $= 2\\sqrt{g^2 - c}$, or put $y = 0$ and find the gap between the roots.",
      solution: "$g = -4$, $c = 12$: $2\\sqrt{16 - 12} = 4$. Check: $x^2 - 8x + 12 = 0$ has roots 2 and 6.",
      commonMistakes: [
        { answer: 10.58, tolerance: 0.01, feedback: "That is $2\\sqrt{g^2 + c}$. The constant moves across with a minus sign: $2\\sqrt{g^2 - c}$." },
        { answer: 2, feedback: "That is half the chord, $\\sqrt{g^2 - c}$." },
      ],
    },
    {
      type: "numeric",
      id: "slc4-2-q4",
      variant: "practice",
      question: "Find the length of the chord cut on the y-axis by $x^2 + y^2 + 4x - 10y - 11 = 0$.",
      answer: 12,
      hint: "y-intercept $= 2\\sqrt{f^2 - c}$ with $f = -5$.",
      solution: "$2\\sqrt{25 + 11} = 12$. Check: $y^2 - 10y - 11 = 0$ has roots 11 and $-1$, which are 12 apart.",
      commonMistakes: [
        { answer: 6, feedback: "That is half the chord." },
        { answer: 7.48, tolerance: 0.01, feedback: "That is $2\\sqrt{f^2 - 11}$: with $c = -11$, $f^2 - c = 25 + 11$." },
      ],
    },
    {
      type: "quiz",
      id: "slc4-2-q5",
      variant: "concept",
      question: "The circle $x^2 + y^2 + 2gx + 2fy + c = 0$ touches the x-axis exactly when",
      options: [
        { text: "$g^2 = c$", correct: true, feedback: "Putting $y = 0$ gives $x^2 + 2gx + c = 0$, which has a double root iff $4g^2 - 4c = 0$." },
        { text: "$f^2 = c$", feedback: "That is the condition for touching the **y**-axis (put $x = 0$)." },
        { text: "$g^2 + f^2 = c$", feedback: "That makes the radius zero: a point circle." },
        { text: "$c = 0$", feedback: "$c = 0$ means the circle passes through the origin." },
      ],
      hint: "Put $y = 0$ and ask when the resulting quadratic in $x$ has equal roots.",
    },
    {
      type: "quiz",
      id: "slc4-2-q6",
      variant: "practice",
      question: "The circle of radius 3 that touches both axes and lies in the second quadrant is",
      options: [
        { text: "$x^2 + y^2 + 6x - 6y + 9 = 0$", correct: true, feedback: "Centre $(-3, 3)$, and $c = 9 + 9 - 9 = 9$." },
        { text: "$x^2 + y^2 - 6x + 6y + 9 = 0$", feedback: "Centre $(3, -3)$: that circle is in the fourth quadrant." },
        { text: "$x^2 + y^2 + 6x - 6y - 9 = 0$", feedback: "The centre is right but $c = h^2 + k^2 - r^2 = 9$, not $-9$ (that circle has radius $3\\sqrt3$)." },
        { text: "$x^2 + y^2 + 6x + 6y + 9 = 0$", feedback: "Centre $(-3, -3)$: the third quadrant." },
      ],
      hint: "The second quadrant has $x < 0$, $y > 0$, so the centre is $(-3, 3)$.",
    },
    {
      type: "numeric",
      id: "slc4-2-q7",
      variant: "practice",
      question:
        "On the circle $(x - 2)^2 + (y + 1)^2 = 16$, find the x-coordinate of the point with parameter $\\theta = \\frac{\\pi}{3}$.",
      answer: 4,
      hint: "$x = h + r\\cos\\theta$ with $h = 2$, $r = 4$.",
      solution: "$x = 2 + 4\\cos\\frac{\\pi}{3} = 2 + 2 = 4$.",
      commonMistakes: [
        { answer: 3, feedback: "$r = 4$, not 2: the equation has $r^2 = 16$." },
        { answer: 5.46, tolerance: 0.01, feedback: "That uses $\\sin\\frac{\\pi}{3}$. The x-coordinate uses the cosine." },
      ],
    },
    {
      type: "numeric",
      id: "slc4-2-q8",
      variant: "practice",
      question: "Find the greatest value of $x + y$ for points on $x^2 + y^2 = 8$.",
      answer: 4,
      hint: "Use $x = 2\\sqrt2\\cos\\theta$, $y = 2\\sqrt2\\sin\\theta$.",
      solution: "$x + y = 2\\sqrt2(\\cos\\theta + \\sin\\theta) \\le 2\\sqrt2 \\cdot \\sqrt2 = 4$, at $(2, 2)$.",
      commonMistakes: [
        { answer: 5.66, tolerance: 0.01, feedback: "$\\cos\\theta + \\sin\\theta$ is at most $\\sqrt2$, not 2: they cannot both equal 1." },
        { answer: 2.83, tolerance: 0.01, feedback: "That is the radius. Multiply by the maximum $\\sqrt2$ of $\\cos\\theta + \\sin\\theta$." },
      ],
    },
    {
      type: "numeric",
      id: "slc4-2-q9",
      variant: "practice",
      question: "Find the greatest value of $3x + 4y$ for points on $x^2 + y^2 - 2x - 4y - 4 = 0$.",
      answer: 26,
      hint: "Centre $(1, 2)$, radius 3. Parametrise and use $\\lvert 3\\cos\\theta + 4\\sin\\theta\\rvert \\le 5$.",
      solution: "$3x + 4y = 3(1 + 3\\cos\\theta) + 4(2 + 3\\sin\\theta) = 11 + 3(3\\cos\\theta + 4\\sin\\theta) \\le 11 + 15 = 26$.",
      commonMistakes: [
        { answer: 15, feedback: "That is only the varying part. Add the value $3 \\cdot 1 + 4 \\cdot 2 = 11$ at the centre." },
        { answer: 14, feedback: "You added only $r = 3$ to 11. The varying part is $3(3\\cos\\theta + 4\\sin\\theta)$, whose maximum is $3 \\times 5 = 15$." },
      ],
    },
    {
      type: "quiz",
      id: "slc4-2-q10",
      variant: "practice",
      multiple: true,
      question:
        "JEE Main. Which circles touch both coordinate axes and have their centre on the line $x - 2y = 3$? Select all that apply.",
      options: [
        { text: "$x^2 + y^2 + 6x + 6y + 9 = 0$", correct: true, feedback: "Centre $(-3, -3)$: $-3 + 6 = 3$, and radius $3 = \\lvert -3\\rvert$." },
        { text: "$x^2 + y^2 - 2x + 2y + 1 = 0$", correct: true, feedback: "Centre $(1, -1)$: $1 + 2 = 3$, and radius 1." },
        { text: "$x^2 + y^2 - 6x - 6y + 9 = 0$", feedback: "Centre $(3, 3)$ gives $3 - 6 = -3 \\ne 3$." },
        { text: "$x^2 + y^2 + 2x - 2y + 1 = 0$", feedback: "Centre $(-1, 1)$ gives $-1 - 2 = -3 \\ne 3$." },
      ],
      hint: "Try centres $(a, a)$ and $(a, -a)$ on the line, each with radius $\\lvert a\\rvert$.",
    },
    {
      type: "quiz",
      id: "slc4-2-q11",
      variant: "practice",
      question: "The circle with centre $(2, 3)$ that touches the y-axis is",
      options: [
        { text: "$x^2 + y^2 - 4x - 6y + 9 = 0$", correct: true, feedback: "Touching the y-axis means $r = \\lvert h\\rvert = 2$, so $c = 4 + 9 - 4 = 9$." },
        { text: "$x^2 + y^2 - 4x - 6y + 4 = 0$", feedback: "That has $r = 3$: it touches the **x**-axis." },
        { text: "$x^2 + y^2 + 4x + 6y + 9 = 0$", feedback: "That centre is $(-2, -3)$." },
        { text: "$x^2 + y^2 - 4x - 6y + 13 = 0$", feedback: "$c = 13$ makes $r = 0$: a point circle." },
      ],
      hint: "The radius is the distance from the centre to the y-axis, which is $\\lvert h\\rvert$.",
    },
    {
      type: "numeric",
      id: "slc4-2-q12",
      variant: "practice",
      question:
        "JEE Main. A circle touches the x-axis at $(3, 0)$ and cuts a chord of length 8 on the y-axis. Find its radius.",
      answer: 5,
      hint: "The centre is $(3, k)$ with $r = \\lvert k\\rvert$. The centre is 3 from the y-axis and the half-chord is 4.",
      solution: "Half-chord, distance to the chord and radius form a right triangle: $r^2 = 3^2 + 4^2 = 25$, so $r = 5$ (centre $(3, \\pm 5)$).",
      commonMistakes: [
        { answer: 4, feedback: "4 is the half-chord. The radius is the hypotenuse of the right triangle with legs 3 and 4." },
        { answer: 3, feedback: "3 is the distance from the centre to the y-axis." },
      ],
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "position-of-a-point",
  title: "4.3 · Position of a Point",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "Is the point $(1, 2)$ inside the circle $x^2 + y^2 - 4x + 2y - 11 = 0$? You could find the centre and radius and compare a distance. There is a quicker test that needs nothing but substitution, and the number it produces turns out to be one of the most useful quantities in this whole chapter.",
    },
    { type: "heading", text: "Substitute the point: the sign of S₁" },
    {
      type: "text",
      content:
        "Write $S \\equiv x^2 + y^2 + 2gx + 2fy + c$ and let $S_1$ be its value at $P(x_1, y_1)$. Completing the square with $C(-g, -f)$ shows what $S_1$ really is:",
    },
    {
      type: "math",
      latex: "S_1 = (x_1 + g)^2 + (y_1 + f)^2 - (g^2 + f^2 - c) = CP^2 - r^2",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Position of a point",
      content:
        "For $S \\equiv x^2 + y^2 + 2gx + 2fy + c$ (coefficients of $x^2$, $y^2$ equal to 1) and $S_1 = S(x_1, y_1)$:\n\n- $S_1 < 0$: $CP < r$, $P$ is **inside**\n- $S_1 = 0$: $P$ is **on** the circle\n- $S_1 > 0$: $P$ is **outside**\n\n$S_1 = CP^2 - r^2$ is called the **power** of $P$. In Lesson 4.5 its square root will turn out to be the length of the tangent from $P$.",
    },
    {
      type: "interactive",
      config: {
        component: "slc-circle-lab",
        mode: "circle",
        centre: [1, 0],
        radius: { min: 0.5, max: 4, step: 0.25, initial: 3 },
        p: [3, 2],
        show: ["general-form"],
        draggable: ["p", "centre"],
        caption:
          "Drag $P$ across the circle. $S_1$ is negative inside, passes through 0 exactly on the circle, and grows like $CP^2$ outside. It is the same number as $CP^2 - r^2$, shown alongside.",
      },
    },
    {
      type: "worked-example",
      id: "slc4-3-we1",
      title: "Worked example 1: inside or outside?",
      problem: "Where does $(1, 2)$ lie relative to $x^2 + y^2 - 4x + 2y - 11 = 0$?",
      steps: [
        { text: "Substitute: $S_1 = 1 + 4 - 4 + 4 - 11 = -6$." },
        { text: "$S_1 < 0$, so the point is inside. *Why this step:* $S_1 = CP^2 - r^2$, so a negative value says $CP < r$. Check: centre $(2, -1)$, $r = 4$, $CP = \\sqrt{1 + 9} = \\sqrt{10} < 4$, and $10 - 16 = -6$." },
      ],
      answer: "Inside ($S_1 = -6$).",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"S₁ works on any equation of the circle\"",
      content:
        "The **sign** of $S_1$ still decides inside/outside if every coefficient is scaled by a positive number, but the **value** $CP^2 - r^2$ needs the coefficients of $x^2$ and $y^2$ to be 1. For $2x^2 + 2y^2 + \\dots$ the substituted value is $2(CP^2 - r^2)$. And multiplying the equation by $-1$ flips the sign completely, so always write the circle with $+x^2 + y^2$ first.",
    },
    { type: "heading", text: "Nearest and farthest points" },
    {
      type: "text",
      content:
        "Every line from $P$ through the centre $C$ meets the circle twice, once on each side of $C$. Along that line the two meeting points are at distances $\\lvert CP - r\\rvert$ and $CP + r$ from $P$, and by the triangle inequality no point of the circle is nearer or farther.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Least and greatest distance from P to the circle",
      content:
        "- least distance $= \\lvert CP - r\\rvert$ (this is $CP - r$ if $P$ is outside, $r - CP$ if inside)\n- greatest distance $= CP + r$\n- both are attained where the line $PC$ meets the circle: the nearest point is $C + r\\cdot\\frac{\\overrightarrow{CP}}{CP}$ when $P$ is outside",
    },
    {
      type: "worked-example",
      id: "slc4-3-we2",
      title: "Worked example 2: nearest and farthest",
      problem:
        "For $P(10, 9)$ and the circle $x^2 + y^2 - 4x - 6y - 12 = 0$, find the least and greatest distances from $P$ to the circle and the nearest point.",
      steps: [
        { text: "Centre $(2, 3)$, radius $\\sqrt{4 + 9 + 12} = 5$, and $CP = \\sqrt{64 + 36} = 10$." },
        { text: "$P$ is outside, so least $= 10 - 5 = 5$ and greatest $= 10 + 5 = 15$." },
        { text: "Nearest point: go from $C$ towards $P$ by $r$. *Why this step:* the unit vector from $C$ to $P$ is $\\frac{(8, 6)}{10}$, and the nearest point lies $r$ units along it.", latex: "(2, 3) + 5 \\cdot \\left(\\tfrac{8}{10}, \\tfrac{6}{10}\\right) = (6, 6)" },
      ],
      answer: "Least distance $5$ (at $(6, 6)$), greatest $15$.",
    },
    {
      type: "worked-example",
      id: "slc4-3-we3",
      title: "Worked example 3: a parameter that puts a point inside",
      problem: "For which real $k$ does $(k, k)$ lie inside $x^2 + y^2 - 4x - 2y - 4 = 0$?",
      steps: [
        { text: "Inside means $S_1 < 0$: $k^2 + k^2 - 4k - 2k - 4 < 0$." },
        { text: "Simplify: $2k^2 - 6k - 4 < 0$, i.e. $k^2 - 3k - 2 < 0$. *Why this step:* a quadratic inequality is negative between its roots." },
        { text: "Roots $\\frac{3 \\pm \\sqrt{17}}{2}$." },
      ],
      answer: "$\\frac{3 - \\sqrt{17}}{2} < k < \\frac{3 + \\sqrt{17}}{2}$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "slc4-3-q1",
      variant: "practice",
      question: "Where does $(3, -1)$ lie relative to $x^2 + y^2 - 2x + 4y - 4 = 0$?",
      options: [
        { text: "Inside", correct: true, feedback: "$S_1 = 9 + 1 - 6 - 4 - 4 = -4 < 0$." },
        { text: "On the circle", feedback: "$S_1 = -4$, not 0." },
        { text: "Outside", feedback: "Recompute: $9 + 1 - 6 - 4 - 4 = -4$, which is negative." },
        { text: "It cannot be decided without the radius", feedback: "The sign of $S_1$ decides it with no square roots." },
      ],
      hint: "Substitute the point into the left-hand side and look at the sign.",
    },
    {
      type: "numeric",
      id: "slc4-3-q2",
      variant: "practice",
      question: "Find the power $S_1$ of the point $(2, 3)$ with respect to $x^2 + y^2 - 6x - 2y + 1 = 0$.",
      answer: -4,
      hint: "Substitute $x = 2$, $y = 3$ into $x^2 + y^2 - 6x - 2y + 1$.",
      solution: "$4 + 9 - 12 - 6 + 1 = -4$, so the point is inside. Check: centre $(3, 1)$, $r^2 = 9$, $CP^2 = 1 + 4 = 5$, $5 - 9 = -4$.",
      commonMistakes: [
        { answer: 4, feedback: "Sign slip: $-6x = -12$ and $-2y = -6$." },
        { answer: 5, feedback: "5 is $CP^2$. The power is $CP^2 - r^2$." },
      ],
    },
    {
      type: "numeric",
      id: "slc4-3-q3",
      variant: "practice",
      question: "Find the shortest distance from $(5, 12)$ to the circle $x^2 + y^2 = 36$.",
      answer: 7,
      hint: "$CP = 13$. The point is outside, so the least distance is $CP - r$.",
      solution: "$CP = \\sqrt{25 + 144} = 13$ and $r = 6$, so the least distance is $13 - 6 = 7$.",
      commonMistakes: [
        { answer: 13, feedback: "13 is the distance to the centre. Subtract the radius." },
        { answer: 19, feedback: "19 is the greatest distance $CP + r$." },
      ],
    },
    {
      type: "numeric",
      id: "slc4-3-q4",
      variant: "practice",
      question:
        "Find the greatest distance from $(1, 1)$ to a point of $x^2 + y^2 - 4x - 6y - 3 = 0$ (to two decimal places).",
      answer: 6.2361,
      tolerance: 0.01,
      hint: "Centre $(2, 3)$, radius 4. Is $(1, 1)$ inside or outside? The greatest distance is $CP + r$ either way.",
      solution: "$r = \\sqrt{4 + 9 + 3} = 4$, $CP = \\sqrt{1 + 4} = \\sqrt5$. Greatest distance $4 + \\sqrt5 \\approx 6.24$.",
      commonMistakes: [
        { answer: 1.76, tolerance: 0.01, feedback: "That is the least distance $r - CP$." },
        { answer: 4, feedback: "4 is the radius. The point is not the centre." },
      ],
    },
    {
      type: "numeric",
      id: "slc4-3-q5",
      variant: "practice",
      question:
        "Find the least distance from $(1, 1)$ to a point of $x^2 + y^2 - 4x - 6y - 3 = 0$ (to two decimal places).",
      answer: 1.7639,
      tolerance: 0.01,
      hint: "The point is inside ($S_1 = 1 + 1 - 4 - 6 - 3 < 0$), so the least distance is $r - CP$.",
      solution: "$r - CP = 4 - \\sqrt5 \\approx 1.76$.",
      commonMistakes: [
        { answer: -1.76, tolerance: 0.01, feedback: "A distance is never negative. For an inside point it is $r - CP$, not $CP - r$." },
        { answer: 6.24, tolerance: 0.01, feedback: "That is the greatest distance." },
      ],
    },
    {
      type: "numeric",
      id: "slc4-3-q6",
      variant: "practice",
      question: "How many points with integer coordinates lie strictly inside the circle $x^2 + y^2 = 9$?",
      answer: 25,
      hint: "Strictly inside means $x^2 + y^2 < 9$. Which values can $x$ take, and for each, which $y$?",
      solution: "$\\lvert x\\rvert \\le 2$ and $\\lvert y\\rvert \\le 2$ are forced (a coordinate of $\\pm 3$ already gives 9). Every one of the $5 \\times 5 = 25$ points of that block works, even the corners $(\\pm2, \\pm2)$, where $x^2 + y^2 = 8 < 9$. So there are 25 points.",
      commonMistakes: [
        { answer: 29, feedback: "The four points $(\\pm3, 0)$, $(0, \\pm3)$ are on the circle, not strictly inside." },
        { answer: 21, feedback: "The corners $(\\pm2, \\pm2)$ give $x^2 + y^2 = 8 < 9$: they are inside." },
      ],
    },
    {
      type: "quiz",
      id: "slc4-3-q7",
      variant: "practice",
      question: "For which $k$ does $(k, 1)$ lie inside $x^2 + y^2 - 2x - 3 = 0$?",
      options: [
        { text: "$1 - \\sqrt3 < k < 1 + \\sqrt3$", correct: true, feedback: "$S_1 = k^2 - 2k - 2 < 0$ between the roots $1 \\pm \\sqrt3$." },
        { text: "$k < 1 - \\sqrt3$ or $k > 1 + \\sqrt3$", feedback: "That is $S_1 > 0$: outside." },
        { text: "$-1 < k < 3$", feedback: "That is where $(k, 0)$ is inside. With $y = 1$ the chord is shorter." },
        { text: "$-\\sqrt3 < k < \\sqrt3$", feedback: "The centre is $(1, 0)$, so the interval is centred at 1." },
      ],
      hint: "Inside means $S_1 < 0$: substitute $(k, 1)$ and solve the quadratic inequality in $k$.",
    },
    {
      type: "quiz",
      id: "slc4-3-q8",
      variant: "practice",
      multiple: true,
      question:
        "Which points lie strictly inside $x^2 + y^2 - 6x - 4y + 4 = 0$? Select all that apply.",
      options: [
        { text: "$(1, 1)$", correct: true, feedback: "$1 + 1 - 6 - 4 + 4 = -4 < 0$." },
        { text: "$(5, 4)$", correct: true, feedback: "$25 + 16 - 30 - 16 + 4 = -1 < 0$." },
        { text: "$(2, 2)$", correct: true, feedback: "$4 + 4 - 12 - 8 + 4 = -8 < 0$." },
        { text: "$(0, 2)$", feedback: "$0 + 4 - 0 - 8 + 4 = 0$: on the circle, not inside." },
        { text: "$(6, 5)$", feedback: "$36 + 25 - 36 - 20 + 4 = 9 > 0$: outside." },
      ],
      hint: "Compute $S_1$ for each point. Strictly inside means $S_1 < 0$.",
    },
    {
      type: "numeric",
      id: "slc4-3-q9",
      variant: "practice",
      question:
        "Find the least positive integer $k$ for which $(2, k)$ lies outside $x^2 + y^2 - 4x + 2y - 4 = 0$.",
      answer: 3,
      hint: "Outside means $S_1 > 0$. Substitute and solve the inequality in $k$.",
      solution: "$S_1 = 4 + k^2 - 8 + 2k - 4 = k^2 + 2k - 8 = (k + 4)(k - 2) > 0$, so $k > 2$ or $k < -4$. The least positive integer is 3.",
      commonMistakes: [{ answer: 2, feedback: "At $k = 2$, $S_1 = 0$: the point is on the circle." }],
    },
    {
      type: "quiz",
      id: "slc4-3-q10",
      variant: "practice",
      question:
        "JEE Main. As $(x, y)$ moves on the circle $(x - 3)^2 + (y - 4)^2 = 4$, the set of values of $x^2 + y^2$ is",
      options: [
        { text: "$[9, 49]$", correct: true, feedback: "$x^2 + y^2$ is the squared distance from the origin, which ranges from $(5 - 2)^2$ to $(5 + 2)^2$." },
        { text: "$[3, 7]$", feedback: "Those are the distances themselves. The expression is the **square** of the distance." },
        { text: "$[21, 29]$", feedback: "That is $25 \\pm 4$: you added $\\pm r^2$ instead of using $(CP \\pm r)^2$." },
        { text: "$[0, 49]$", feedback: "The origin is outside the circle ($CP = 5 > 2$), so the distance never reaches 0." },
      ],
      hint: "$x^2 + y^2 = OP^2$. The origin is at distance 5 from the centre.",
    },
    {
      type: "numeric",
      id: "slc4-3-q11",
      variant: "practice",
      question:
        "JEE Main. The point on $x^2 + y^2 = 16$ nearest to $(6, 8)$ is $(a, b)$. Find $a + b$.",
      answer: 5.6,
      tolerance: 0.001,
      hint: "The nearest point is on the segment from the centre $O$ to $(6, 8)$, at distance 4 from $O$.",
      solution: "$(a, b) = 4 \\cdot \\frac{(6, 8)}{10} = (2.4, 3.2)$, so $a + b = 5.6$.",
      commonMistakes: [
        { answer: -5.6, feedback: "$(-2.4, -3.2)$ is the **farthest** point, on the other side of the centre." },
        { answer: 14, feedback: "That is $6 + 8$: the given point, not the nearest point on the circle." },
      ],
    },
    {
      type: "quiz",
      id: "slc4-3-q12",
      variant: "concept",
      multiple: true,
      question:
        "Let $S \\equiv x^2 + y^2 + 2gx + 2fy + c$ and $S_1 = S(x_1, y_1)$. Which statements are true? Select all that apply.",
      options: [
        { text: "$S_1 = CP^2 - r^2$, where $C$ is the centre", correct: true, feedback: "Complete the square in $S$ and substitute." },
        { text: "$S_1 < 0$ exactly when $P$ is inside the circle", correct: true, feedback: "$CP^2 < r^2$." },
        { text: "$S_1$ is least when $P$ is the centre, where it equals $-r^2$", correct: true, feedback: "$CP^2 - r^2$ is smallest when $CP = 0$." },
        { text: "$S_1 = 0$ implies $P$ is the centre", feedback: "$S_1 = 0$ means $CP = r$: $P$ is on the circle." },
        { text: "Writing the circle as $-x^2 - y^2 - 2gx - 2fy - c = 0$ leaves the sign of $S_1$ unchanged", feedback: "Multiplying by $-1$ flips every value, so the sign test reverses. Always use $+x^2 + y^2$." },
      ],
      hint: "Everything follows from $S_1 = CP^2 - r^2$.",
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "a-line-and-a-circle",
  title: "4.4 · A Line and a Circle",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "Slide a ruler across a coin. Far away it misses; at one moment it just grazes the edge; then it cuts straight through. Which of the three happens depends on one number only: how far the ruler is from the **centre** of the coin, compared with the radius. That single comparison answers every \"line meets circle\" question in JEE, usually in one line.",
    },
    { type: "heading", text: "Distance from the centre decides everything" },
    {
      type: "text",
      content:
        "Let the circle have centre $C$ and radius $r$, and let $d$ be the perpendicular distance from $C$ to the line (Chapter 2: $d = \\frac{\\lvert ah + bk + c\\rvert}{\\sqrt{a^2 + b^2}}$ for the line $ax + by + c = 0$ and centre $(h, k)$).",
    },
    {
      type: "table",
      headers: ["Comparison", "Picture", "Meeting points"],
      rows: [
        ["$d > r$", "the line misses the circle", "none"],
        ["$d = r$", "the line **touches** the circle: a tangent", "one (the foot of the perpendicular from $C$)"],
        ["$d < r$", "the line cuts a chord: a secant", "two"],
      ],
    },
    {
      type: "interactive",
      config: {
        component: "slc-circle-lab",
        mode: "line",
        centre: [0, 0],
        radius: { min: 0.5, max: 4.5, step: 0.25, initial: 3 },
        a: [-4, -3],
        b: [4, 1],
        caption:
          "Drag $A$ and $B$ to move the line. The readout compares $d$ with $r$: as the line slides outward the chord shrinks, collapses to a single point exactly when $d = r$, and vanishes when $d > r$. The chord length always equals $2\\sqrt{r^2 - d^2}$.",
      },
    },
    { type: "heading", text: "The length of a chord" },
    {
      type: "text",
      content:
        "When $d < r$, drop the perpendicular from $C$ to the chord. It lands at the chord's **midpoint** (the perpendicular from the centre bisects a chord), and it makes a right triangle with the radius to one end of the chord as hypotenuse:",
    },
    {
      type: "math",
      latex: "\\left(\\tfrac{\\ell}{2}\\right)^2 + d^2 = r^2 \\implies \\ell = 2\\sqrt{r^2 - d^2}",
    },
    {
      type: "worked-example",
      id: "slc4-4-we1",
      title: "Worked example 1: secant, chord length",
      problem: "Show that $3x + 4y - 10 = 0$ cuts $x^2 + y^2 = 9$, and find the length of the chord.",
      steps: [
        { text: "Distance from the centre $(0, 0)$: $d = \\frac{\\lvert -10\\rvert}{5} = 2$." },
        { text: "$d = 2 < 3 = r$, so the line is a secant. *Why this step:* the comparison settles the question before any substitution." },
        { text: "Chord length:", latex: "\\ell = 2\\sqrt{9 - 4} = 2\\sqrt5" },
      ],
      answer: "It cuts the circle, in a chord of length $2\\sqrt5$.",
    },
    {
      type: "worked-example",
      id: "slc4-4-we2",
      title: "Worked example 2: the substitution route agrees",
      problem: "Find where $y = x + 1$ meets $x^2 + y^2 = 13$, and the length of the chord.",
      steps: [
        { text: "Substitute: $x^2 + (x + 1)^2 = 13$, i.e. $2x^2 + 2x - 12 = 0$, i.e. $x^2 + x - 6 = 0$, so $x = 2$ or $x = -3$." },
        { text: "Points $(2, 3)$ and $(-3, -2)$, at distance $\\sqrt{25 + 25} = 5\\sqrt2$." },
        { text: "Check with distances: $d = \\frac{1}{\\sqrt2}$ and $2\\sqrt{13 - \\frac12} = 2\\sqrt{12.5} = \\sqrt{50} = 5\\sqrt2$. *Why this step:* substitution gives the points themselves, the distance route gives the length faster. Use whichever the question needs." },
      ],
      answer: "Meeting points $(2, 3)$ and $(-3, -2)$, chord length $5\\sqrt2$.",
    },
    { type: "heading", text: "The tangency condition" },
    {
      type: "text",
      content:
        "For the circle $x^2 + y^2 = a^2$ (centre $O$) and the line $y = mx + c$, i.e. $mx - y + c = 0$, tangency means $d = a$:",
    },
    {
      type: "math",
      latex: "\\frac{\\lvert c\\rvert}{\\sqrt{1 + m^2}} = a \\iff c^2 = a^2(1 + m^2)",
    },
    {
      type: "text",
      content:
        "The same condition falls out of substitution. Putting $y = mx + c$ into $x^2 + y^2 = a^2$ gives $(1 + m^2)x^2 + 2mcx + (c^2 - a^2) = 0$, and a tangent meets the circle once, so this quadratic must have a double root. Its discriminant $4m^2c^2 - 4(1 + m^2)(c^2 - a^2) = 4\\left[a^2(1 + m^2) - c^2\\right]$ vanishes exactly when $c^2 = a^2(1 + m^2)$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Tangency condition",
      content:
        "- $y = mx + c$ touches $x^2 + y^2 = a^2$ iff $c^2 = a^2(1 + m^2)$, so the tangents of slope $m$ are $y = mx \\pm a\\sqrt{1 + m^2}$.\n- $lx + my + n = 0$ touches $x^2 + y^2 = a^2$ iff $n^2 = a^2(l^2 + m^2)$.\n- For a circle with centre $(h, k)$ and radius $r$, there is no shortcut formula to memorise: write **distance from the centre = radius**.",
    },
    {
      type: "worked-example",
      id: "slc4-4-we3",
      title: "Worked example 3: tangents of a given slope",
      problem: "Find $c$ so that $y = 2x + c$ touches $x^2 + y^2 = 5$.",
      steps: [
        { text: "Here $a^2 = 5$, $m = 2$: $c^2 = 5(1 + 4) = 25$." },
        { text: "So $c = \\pm 5$. *Why this step:* two parallel tangents of each slope, one on each side of the centre." },
      ],
      answer: "$c = 5$ or $c = -5$.",
    },
    {
      type: "worked-example",
      id: "slc4-4-we4",
      title: "Worked example 4: tangency to a circle not at the origin",
      problem: "Find $k$ so that $x + y = k$ touches $x^2 + y^2 - 2x - 4y + 3 = 0$.",
      steps: [
        { text: "Centre $(1, 2)$, radius $\\sqrt{1 + 4 - 3} = \\sqrt2$." },
        { text: "Distance from the centre to $x + y - k = 0$ equals the radius. *Why this step:* the formula $c^2 = a^2(1 + m^2)$ assumes the centre is at the origin, so go back to the definition.", latex: "\\frac{\\lvert 1 + 2 - k\\rvert}{\\sqrt2} = \\sqrt2 \\implies \\lvert 3 - k\\rvert = 2" },
      ],
      answer: "$k = 1$ or $k = 5$.",
    },
    {
      type: "worked-example",
      id: "slc4-4-we5",
      title: "Worked example 5: a chord that subtends a right angle",
      problem: "For which $c$ does the line $y = x + c$ cut a chord of $x^2 + y^2 = 16$ that subtends a right angle at the centre?",
      steps: [
        { text: "If the chord subtends $90^\\circ$ at $O$, the triangle formed by $O$ and the chord's ends is right isosceles with legs $r = 4$, so the distance from $O$ to the chord is $\\frac{r}{\\sqrt2} = 2\\sqrt2$. *Why this step:* the perpendicular from $O$ bisects the right angle, so $d = r\\cos 45^\\circ$." },
        { text: "Distance from $O$ to $x - y + c = 0$:", latex: "\\frac{\\lvert c\\rvert}{\\sqrt2} = 2\\sqrt2 \\implies \\lvert c\\rvert = 4" },
      ],
      answer: "$c = \\pm 4$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"c² = a²(1 + m²) works for every circle\"",
      content:
        "It was derived with the centre at the origin. For $(x - 1)^2 + y^2 = 4$ and $y = x + c$, the formula would give $c = \\pm 2\\sqrt2$, but the real condition is $\\frac{\\lvert 1 + c\\rvert}{\\sqrt2} = 2$, i.e. $c = -1 \\pm 2\\sqrt2$. When the centre moves, use distance $=$ radius.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the chord length is 2√(r² + d²)\" or \"r − d\"",
      content:
        "The radius is the **hypotenuse** of the right triangle, so the half-chord is $\\sqrt{r^2 - d^2}$. A chord through the centre ($d = 0$) is a diameter of length $2r$, and a tangent ($d = r$) has chord length 0: both checks pass only with $2\\sqrt{r^2 - d^2}$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "slc4-4-q1",
      variant: "practice",
      question: "The line $3x - 4y + 15 = 0$ and the circle $x^2 + y^2 = 9$",
      options: [
        { text: "touch at one point", correct: true, feedback: "$d = \\frac{15}{5} = 3 = r$." },
        { text: "meet at two points", feedback: "That needs $d < 3$, but $d = 3$." },
        { text: "do not meet", feedback: "That needs $d > 3$, but $d = 3$." },
        { text: "meet at the origin", feedback: "The origin is the centre, not a point of the circle." },
      ],
      hint: "Compare the distance from the origin to the line with the radius 3.",
    },
    {
      type: "numeric",
      id: "slc4-4-q2",
      variant: "practice",
      question: "Find the length of the chord cut by the line $5x + 12y = 65$ on the circle $x^2 + y^2 = 169$.",
      answer: 24,
      hint: "$d = \\frac{65}{13}$. Then $\\ell = 2\\sqrt{r^2 - d^2}$.",
      solution: "$d = 5$, $r = 13$, so $\\ell = 2\\sqrt{169 - 25} = 2 \\cdot 12 = 24$.",
      commonMistakes: [
        { answer: 12, feedback: "12 is the half-chord. Double it." },
        { answer: 8, feedback: "That is $2(r - d)$. Use Pythagoras: $2\\sqrt{r^2 - d^2}$." },
      ],
    },
    {
      type: "numeric",
      id: "slc4-4-q3",
      variant: "practice",
      question: "Find the positive value of $c$ for which $y = 3x + c$ touches $x^2 + y^2 = 10$.",
      answer: 10,
      hint: "$c^2 = a^2(1 + m^2)$ with $a^2 = 10$, $m = 3$.",
      solution: "$c^2 = 10(1 + 9) = 100$, so $c = 10$.",
      commonMistakes: [
        { answer: 100, feedback: "100 is $c^2$." },
        { answer: 31.62, tolerance: 0.01, feedback: "You used $a = 10$. The radius is $\\sqrt{10}$, so $a^2 = 10$." },
      ],
    },
    {
      type: "numeric",
      id: "slc4-4-q4",
      variant: "practice",
      question: "In how many points does the line $x + y = 5$ meet the circle $x^2 + y^2 - 2x - 2y - 2 = 0$?",
      answer: 0,
      hint: "Centre $(1, 1)$, radius 2. Compare the distance from the centre to the line with 2.",
      solution: "$d = \\frac{\\lvert 1 + 1 - 5\\rvert}{\\sqrt2} = \\frac{3}{\\sqrt2} \\approx 2.12 > 2$, so the line misses the circle.",
      commonMistakes: [
        { answer: 2, feedback: "Compute $d = \\frac{3}{\\sqrt2} \\approx 2.12$, which exceeds $r = 2$." },
        { answer: 1, feedback: "Tangency needs $d = r$ exactly." },
      ],
    },
    {
      type: "quiz",
      id: "slc4-4-q5",
      variant: "practice",
      multiple: true,
      question: "Which lines are tangent to $x^2 + y^2 = 4$? Select all that apply.",
      options: [
        { text: "$y = x + 2\\sqrt2$", correct: true, feedback: "$c^2 = 8 = 4(1 + 1)$." },
        { text: "$x = 2$", correct: true, feedback: "A vertical line at distance 2 from the centre." },
        { text: "$3x + 4y = 10$", correct: true, feedback: "$d = \\frac{10}{5} = 2$." },
        { text: "$y = 2x + 4$", feedback: "$c^2 = 16$ but $a^2(1 + m^2) = 20$: $d = \\frac{4}{\\sqrt5} < 2$, a secant." },
        { text: "$x + y = 2$", feedback: "$d = \\frac{2}{\\sqrt2} = \\sqrt2 < 2$: a secant." },
      ],
      hint: "For each line compute the distance from the origin and compare it with 2.",
    },
    {
      type: "numeric",
      id: "slc4-4-q6",
      variant: "practice",
      question:
        "Find the length of the chord cut by $x - y + 1 = 0$ on $x^2 + y^2 - 4x - 2y - 4 = 0$ (to two decimal places).",
      answer: 5.2915,
      tolerance: 0.01,
      hint: "Centre $(2, 1)$, radius 3. Find $d$, then use $2\\sqrt{r^2 - d^2}$.",
      solution: "$r = \\sqrt{4 + 1 + 4} = 3$, $d = \\frac{\\lvert 2 - 1 + 1\\rvert}{\\sqrt2} = \\sqrt2$. Chord $= 2\\sqrt{9 - 2} = 2\\sqrt7 \\approx 5.29$.",
      commonMistakes: [
        { answer: 2.65, tolerance: 0.01, feedback: "That is the half-chord $\\sqrt7$." },
        { answer: 6.63, tolerance: 0.01, feedback: "That is $2\\sqrt{11} = 2\\sqrt{r^2 + d^2}$. The radius is the hypotenuse: subtract." },
      ],
    },
    {
      type: "numeric",
      id: "slc4-4-q7",
      variant: "practice",
      question:
        "The line $4x + 3y + k = 0$ touches $x^2 + y^2 - 2x - 4y - 4 = 0$. Find the sum of all possible values of $k$.",
      answer: -20,
      hint: "Centre $(1, 2)$, radius 3. Set $\\frac{\\lvert 4 + 6 + k\\rvert}{5} = 3$.",
      solution: "$\\lvert 10 + k\\rvert = 15$ gives $k = 5$ or $k = -25$, with sum $-20$.",
      commonMistakes: [
        { answer: 20, feedback: "Sign slip: the values are $5$ and $-25$." },
        { answer: 0, feedback: "The two values are not symmetric about 0: they are symmetric about $-10$, the value that puts the line through the centre." },
      ],
    },
    {
      type: "quiz",
      id: "slc4-4-q8",
      variant: "practice",
      question: "For which $m$ does $y = mx + 2$ meet $x^2 + y^2 = 1$ in two distinct points?",
      options: [
        { text: "$\\lvert m\\rvert > \\sqrt3$", correct: true, feedback: "$\\frac{2}{\\sqrt{1 + m^2}} < 1 \\iff 1 + m^2 > 4$." },
        { text: "$\\lvert m\\rvert < \\sqrt3$", feedback: "Those lines are flatter, so they pass above the circle: $d > 1$." },
        { text: "$\\lvert m\\rvert > 1$", feedback: "At $m = 1.5$, $d = \\frac{2}{\\sqrt{3.25}} \\approx 1.11 > 1$: no meeting." },
        { text: "every real $m$", feedback: "At $m = 0$ the line $y = 2$ misses the unit circle." },
      ],
      hint: "Two points means $d < r$: $\\frac{2}{\\sqrt{1 + m^2}} < 1$.",
    },
    {
      type: "numeric",
      id: "slc4-4-q9",
      variant: "practice",
      question:
        "JEE Main. The line $y = x + c$ cuts a chord of $x^2 + y^2 = 8$ that subtends a right angle at the centre. Find $c^2$.",
      answer: 8,
      hint: "A right angle at the centre puts the chord at distance $\\frac{r}{\\sqrt2}$ from it.",
      solution: "$r = 2\\sqrt2$, so $d = 2$. Then $\\frac{\\lvert c\\rvert}{\\sqrt2} = 2$, $\\lvert c\\rvert = 2\\sqrt2$, $c^2 = 8$.",
      commonMistakes: [
        { answer: 16, feedback: "That makes $d = r$: a tangent. A right angle at the centre needs $d = \\frac{r}{\\sqrt2}$." },
        { answer: 4, feedback: "4 is $d^2$. The distance from $O$ to $x - y + c = 0$ is $\\frac{\\lvert c\\rvert}{\\sqrt2}$, so $c^2 = 2d^2$." },
      ],
    },
    {
      type: "numeric",
      id: "slc4-4-q10",
      variant: "practice",
      question:
        "Find the x-coordinate of the midpoint of the chord cut off by $2x + y = 5$ on the circle $x^2 + y^2 = 25$.",
      answer: 2,
      hint: "The midpoint of a chord is the foot of the perpendicular from the centre to the chord.",
      solution: "The perpendicular from $O$ runs along the normal direction $(2, 1)$: the foot is $t(2, 1)$ with $2(2t) + t = 5$, so $t = 1$ and the midpoint is $(2, 1)$. (The chord's ends are $(0, 5)$ and $(4, -3)$, whose midpoint is indeed $(2, 1)$.)",
      commonMistakes: [
        { answer: 2.5, feedback: "That is where the line meets the x-axis, not the midpoint of the chord." },
        { answer: 1, feedback: "1 is the y-coordinate of the midpoint $(2, 1)$." },
      ],
    },
    {
      type: "quiz",
      id: "slc4-4-q11",
      variant: "practice",
      multiple: true,
      question:
        "JEE Main. For the circle $x^2 + y^2 - 6x + 8y = 0$, which statements are true? Select all that apply.",
      options: [
        { text: "It passes through the origin", correct: true, feedback: "$c = 0$." },
        { text: "$3x - 4y = 0$ is the tangent at the origin", correct: true, feedback: "Distance from the centre $(3, -4)$ is $\\frac{9 + 16}{5} = 5 = r$, and the line passes through the origin, which is on the circle." },
        { text: "It cuts a chord of length 6 on the x-axis", correct: true, feedback: "$2\\sqrt{g^2 - c} = 2\\sqrt{9} = 6$." },
        { text: "$y = 1$ is a tangent", correct: true, feedback: "The centre is at height $-4$, and $\\lvert 1 - (-4)\\rvert = 5 = r$." },
        { text: "$x = 7$ is a tangent", feedback: "$\\lvert 7 - 3\\rvert = 4 < 5$: a secant. The vertical tangents are $x = -2$ and $x = 8$." },
      ],
      hint: "Centre $(3, -4)$, radius 5. Every tangency test is \"distance from the centre $= 5$\".",
    },
    {
      type: "numeric",
      id: "slc4-4-q12",
      variant: "practice",
      question:
        "The line $3x + 4y = 15$ cuts the circle $x^2 + y^2 = 25$ at $A$ and $B$. Find the area of triangle $OAB$, where $O$ is the centre.",
      answer: 12,
      hint: "The height of the triangle from $O$ is $d$, and the base is the chord.",
      solution: "$d = 3$ and the chord is $2\\sqrt{25 - 9} = 8$, so the area is $\\frac12 \\cdot 8 \\cdot 3 = 12$.",
      commonMistakes: [
        { answer: 24, feedback: "Don't forget the $\\frac12$ in the area of a triangle." },
        { answer: 6, feedback: "Use the full chord, 8, as the base, not the half-chord." },
      ],
    },
    {
      type: "quiz",
      id: "slc4-4-q13",
      variant: "concept",
      question: "The line $y = x + c$ touches the circle $(x - 1)^2 + y^2 = 4$ exactly when",
      options: [
        { text: "$c = -1 \\pm 2\\sqrt2$", correct: true, feedback: "$\\frac{\\lvert 1 - 0 + c\\rvert}{\\sqrt2} = 2$ gives $\\lvert c + 1\\rvert = 2\\sqrt2$." },
        { text: "$c = \\pm 2\\sqrt2$", feedback: "That is $c^2 = a^2(1 + m^2)$, which assumes the centre is at the origin. Here it is $(1, 0)$." },
        { text: "$c = 1 \\pm 2\\sqrt2$", feedback: "Sign slip in the distance: substitute the centre $(1, 0)$ into $x - y + c$ to get $1 + c$." },
        { text: "$c = -1 \\pm \\sqrt2$", feedback: "The radius is 2, so $\\lvert 1 + c\\rvert = 2\\sqrt2$, not $\\sqrt2$." },
      ],
      hint: "Use distance from the centre $(1, 0)$ to $x - y + c = 0$ equals 2.",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "tangents",
  title: "4.5 · Tangents",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "A wheel rolling on a road touches the road at one point, and the spoke to that point stands straight up. That is the whole theory of tangents to a circle: **the tangent at a point is perpendicular to the radius there.** From it come the equation of the tangent at a point, the tangents of a given slope, the tangents from an outside point, and the length of a tangent.",
    },
    { type: "heading", text: "The tangent at a point: T = 0" },
    {
      type: "text",
      content:
        "Take $x^2 + y^2 = a^2$ and a point $P(x_1, y_1)$ on it. The radius $OP$ has direction $(x_1, y_1)$, so the tangent at $P$ is the line through $P$ with **normal vector** $(x_1, y_1)$:",
    },
    {
      type: "math",
      latex: "x_1(x - x_1) + y_1(y - y_1) = 0 \\iff xx_1 + yy_1 = x_1^2 + y_1^2 = a^2",
    },
    {
      type: "text",
      content:
        "For the general circle the radius from $C(-g, -f)$ to $P$ has direction $(x_1 + g, y_1 + f)$, and the same computation (using $S_1 = 0$) gives the tangent in a memorable pattern: replace $x^2$ by $xx_1$, $y^2$ by $yy_1$, $2x$ by $x + x_1$ and $2y$ by $y + y_1$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Tangent at a point (T = 0)",
      content:
        "At $P(x_1, y_1)$ **on** the circle:\n\n- $x^2 + y^2 = a^2$: tangent $xx_1 + yy_1 = a^2$\n- $x^2 + y^2 + 2gx + 2fy + c = 0$: tangent $xx_1 + yy_1 + g(x + x_1) + f(y + y_1) + c = 0$\n\nThis expression is written $T$, so the tangent is $T = 0$.",
    },
    {
      type: "worked-example",
      id: "slc4-5-we1",
      title: "Worked example 1: the tangent at a point",
      problem: "Find the tangent to $x^2 + y^2 - 4x + 6y - 12 = 0$ at $(5, 1)$.",
      steps: [
        { text: "Check the point is on the circle: $25 + 1 - 20 + 6 - 12 = 0$. *Why this step:* $T = 0$ is the tangent only for a point **on** the circle." },
        { text: "Apply the pattern with $g = -2$, $f = 3$, $c = -12$:", latex: "5x + y - 2(x + 5) + 3(y + 1) - 12 = 0 \\implies 3x + 4y - 19 = 0" },
        { text: "Check: the centre is $(2, -3)$, the radius direction is $(5 - 2, 1 + 3) = (3, 4)$, and that is the normal of the tangent." },
      ],
      answer: "$3x + 4y - 19 = 0$.",
    },
    { type: "heading", text: "Tangents of a given slope" },
    {
      type: "text",
      content:
        "Lesson 4.4 already did the work: $y = mx + c$ touches $x^2 + y^2 = a^2$ iff $c^2 = a^2(1 + m^2)$. For a circle with centre $(h, k)$, shift the picture: the tangents of slope $m$ are $y - k = m(x - h) \\pm r\\sqrt{1 + m^2}$.",
    },
    {
      type: "math",
      latex: "y = mx \\pm a\\sqrt{1 + m^2} \\quad \\text{touches } x^2 + y^2 = a^2 \\text{ for every } m",
    },
    {
      type: "worked-example",
      id: "slc4-5-we2",
      title: "Worked example 2: tangents parallel to a line",
      problem: "Find the tangents to $x^2 + y^2 = 5$ that are parallel to $2x - y + 7 = 0$.",
      steps: [
        { text: "The slope is $m = 2$, and $a\\sqrt{1 + m^2} = \\sqrt5 \\cdot \\sqrt5 = 5$." },
        { text: "So the tangents are $y = 2x \\pm 5$. *Why this step:* every slope gives exactly two tangents, one on each side of the centre." },
      ],
      answer: "$y = 2x + 5$ and $y = 2x - 5$.",
    },
    { type: "heading", text: "Tangents from an external point" },
    {
      type: "text",
      content:
        "From a point $P$ outside the circle you can draw exactly two tangents (from inside, none; from a point on the circle, one). To find them, write every line through $P$ as $y - y_1 = m(x - x_1)$ and demand distance from the centre $=$ radius. That gives a quadratic in $m$ whose two roots are the two slopes. If the quadratic drops to degree one, the missing tangent is vertical.",
    },
    {
      type: "interactive",
      config: {
        component: "slc-circle-lab",
        mode: "tangents",
        centre: [0, 0],
        radius: { min: 0.5, max: 4, step: 0.25, initial: 2.5 },
        p: [4.5, 2],
        show: ["tangents", "chord-of-contact"],
        caption:
          "Drag $P$ around. Outside the circle there are two tangents, each of length $\\sqrt{S_1}$. Bring $P$ onto the circle and they merge into one; take it inside and they disappear. The two radii to the points of contact are always perpendicular to the tangents.",
      },
    },
    {
      type: "worked-example",
      id: "slc4-5-we3",
      title: "Worked example 3: the two tangents from a point",
      problem: "Find the tangents from $(7, 1)$ to $x^2 + y^2 = 25$.",
      steps: [
        { text: "A line through $(7, 1)$: $mx - y + (1 - 7m) = 0$. Tangency: $\\frac{\\lvert 1 - 7m\\rvert}{\\sqrt{1 + m^2}} = 5$." },
        { text: "Square: $1 - 14m + 49m^2 = 25 + 25m^2$, i.e. $12m^2 - 7m - 12 = 0$. *Why this step:* squaring removes both the modulus and the root, and each root of the quadratic is one tangent." },
        { text: "$m = \\frac{7 \\pm 25}{24}$, so $m = \\frac43$ or $m = -\\frac34$." },
        { text: "Tangents: $y - 1 = \\frac43(x - 7)$ and $y - 1 = -\\frac34(x - 7)$." },
      ],
      answer: "$4x - 3y - 25 = 0$ and $3x + 4y - 25 = 0$ (they happen to be perpendicular: $m_1m_2 = -1$).",
    },
    { type: "heading", text: "The length of a tangent" },
    {
      type: "text",
      content:
        "Let the tangent from $P$ touch the circle at $T$. The radius $CT$ is perpendicular to $PT$, so triangle $CTP$ has its right angle at $T$:",
    },
    {
      type: "math",
      latex: "PT^2 = CP^2 - r^2 = S_1 \\implies PT = \\sqrt{S_1}",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Length of the tangent, angle between the tangents",
      content:
        "- From an external point $P(x_1, y_1)$ the two tangents have equal length $L = \\sqrt{S_1}$ (equation written with $x^2$, $y^2$ coefficients 1).\n- The angle $\\theta$ between the two tangents satisfies $\\tan\\frac{\\theta}{2} = \\frac{r}{L}$, from the right triangle $CTP$.\n- The **pair of tangents** from $P$, as one equation, is $SS_1 = T^2$ (a JEE Advanced shortcut: it is the second-degree equation of both lines together).",
    },
    {
      type: "worked-example",
      id: "slc4-5-we4",
      title: "Worked example 4: tangent length and the angle between the tangents",
      problem: "From $P(2, 0)$ tangents are drawn to $x^2 + y^2 = 1$. Find the length of each tangent and the angle between them.",
      steps: [
        { text: "$S_1 = 4 + 0 - 1 = 3$, so $L = \\sqrt3$." },
        { text: "$\\tan\\frac{\\theta}{2} = \\frac{r}{L} = \\frac{1}{\\sqrt3}$, so $\\frac{\\theta}{2} = 30^\\circ$. *Why this step:* in the right triangle $CTP$ the angle at $P$ is half the angle between the tangents, with opposite side $r$ and adjacent side $L$." },
      ],
      answer: "Each tangent has length $\\sqrt3$, and they meet at $60^\\circ$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"T = 0 is always a tangent\"",
      content:
        "$T = 0$ is the tangent at $(x_1, y_1)$ only when that point is **on** the circle. For an outside point, $T = 0$ is a different line altogether: the chord joining the two points of contact (the chord of contact, Chapter 5). Writing $7x + y = 25$ for \"the tangent from $(7, 1)$ to $x^2 + y^2 = 25$\" is a classic wrong answer.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"length of tangent = √S₁ for any equation\"",
      content:
        "$\\sqrt{S_1}$ is the tangent length only when the coefficients of $x^2$ and $y^2$ are 1. For $2x^2 + 2y^2 - 4x + 6y - 1 = 0$ and $P(1, 2)$, substituting directly gives 17, but the true $S_1$ (after dividing by 2) is $8.5$, and the tangent length is $\\sqrt{8.5}$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "slc4-5-q1",
      variant: "practice",
      question: "The tangent to $x^2 + y^2 = 13$ at $(2, -3)$ is",
      options: [
        { text: "$2x - 3y = 13$", correct: true, feedback: "$xx_1 + yy_1 = a^2$ with $(x_1, y_1) = (2, -3)$." },
        { text: "$2x + 3y = 13$", feedback: "Keep the sign of $y_1 = -3$." },
        { text: "$3x + 2y = 13$", feedback: "That swaps the coordinates. $3x + 2y = 0$ would be the normal direction." },
        { text: "$2x - 3y = \\sqrt{13}$", feedback: "The right side is $a^2 = 13$, not $a$." },
      ],
      hint: "Use $xx_1 + yy_1 = a^2$.",
    },
    {
      type: "numeric",
      id: "slc4-5-q2",
      variant: "practice",
      question: "Find the length of the tangent from $(6, 8)$ to $x^2 + y^2 = 64$.",
      answer: 6,
      hint: "$L = \\sqrt{S_1} = \\sqrt{x_1^2 + y_1^2 - a^2}$.",
      solution: "$S_1 = 36 + 64 - 64 = 36$, so $L = 6$. (Right triangle with hypotenuse $CP = 10$ and leg $r = 8$.)",
      commonMistakes: [
        { answer: 36, feedback: "36 is $S_1$. The length is its square root." },
        { answer: 2, feedback: "That is $CP - r$, the shortest distance to the circle, not the tangent length." },
      ],
    },
    {
      type: "numeric",
      id: "slc4-5-q3",
      variant: "practice",
      question:
        "Find the length of the tangent from $(1, 2)$ to $2x^2 + 2y^2 - 4x + 6y - 1 = 0$ (to two decimal places).",
      answer: 2.9155,
      tolerance: 0.01,
      hint: "Divide by 2 first, then $L = \\sqrt{S_1}$.",
      solution: "$x^2 + y^2 - 2x + 3y - \\frac12 = 0$, so $S_1 = 1 + 4 - 2 + 6 - \\frac12 = 8.5$ and $L = \\sqrt{8.5} \\approx 2.92$.",
      commonMistakes: [
        { answer: 4.12, tolerance: 0.01, feedback: "That is $\\sqrt{17}$, from substituting into the undivided equation. Divide by 2 first." },
        { answer: 8.5, feedback: "8.5 is $S_1$. Take the square root." },
      ],
    },
    {
      type: "numeric",
      id: "slc4-5-q4",
      variant: "practice",
      question:
        "The tangent to $x^2 + y^2 + 2x - 4y - 8 = 0$ at $(1, -1)$ meets the x-axis at $(p, 0)$. Find $p$.",
      answer: 2.5,
      tolerance: 0.001,
      hint: "Check that $(1, -1)$ is on the circle, then write $T = 0$: $x - y + (x + 1) - 2(y - 1) - 8 = 0$.",
      solution: "$1 + 1 + 2 + 4 - 8 = 0$, so the point is on the circle. $T = 0$ gives $2x - 3y - 5 = 0$. Put $y = 0$: $x = 2.5$.",
      commonMistakes: [
        { answer: 5, feedback: "You found $2x = 5$. Divide by 2." },
        { answer: -1.67, tolerance: 0.01, feedback: "That is the y-intercept ($x = 0$ gives $y = -\\frac53$)." },
      ],
    },
    {
      type: "quiz",
      id: "slc4-5-q5",
      variant: "practice",
      question: "The tangents to $x^2 + y^2 = 8$ with slope $-1$ are",
      options: [
        { text: "$y = -x \\pm 4$", correct: true, feedback: "$a\\sqrt{1 + m^2} = 2\\sqrt2 \\cdot \\sqrt2 = 4$." },
        { text: "$y = -x \\pm 2\\sqrt2$", feedback: "That is $\\pm a$. The intercept is $\\pm a\\sqrt{1 + m^2}$." },
        { text: "$y = -x \\pm 8$", feedback: "That uses $a^2$ instead of $a$." },
        { text: "$y = x \\pm 4$", feedback: "Those have slope $+1$." },
      ],
      hint: "$y = mx \\pm a\\sqrt{1 + m^2}$ with $a = 2\\sqrt2$, $m = -1$.",
    },
    {
      type: "numeric",
      id: "slc4-5-q6",
      variant: "practice",
      question: "Find the angle (in degrees) between the tangents drawn from $(4, 0)$ to $x^2 + y^2 = 8$.",
      answer: 90,
      unit: "degrees",
      hint: "$L = \\sqrt{S_1}$ and $\\tan\\frac{\\theta}{2} = \\frac{r}{L}$.",
      solution: "$L = \\sqrt{16 - 8} = 2\\sqrt2 = r$, so $\\tan\\frac{\\theta}{2} = 1$ and $\\theta = 90^\\circ$.",
      commonMistakes: [
        { answer: 45, feedback: "45 degrees is $\\frac{\\theta}{2}$. Double it." },
        { answer: 60, feedback: "Check $L$: $\\sqrt{16 - 8} = 2\\sqrt2$, which equals the radius." },
      ],
    },
    {
      type: "numeric",
      id: "slc4-5-q7",
      variant: "practice",
      question: "Find the angle (in degrees) between the tangents drawn from $(2, 0)$ to $x^2 + y^2 = 1$.",
      answer: 60,
      unit: "degrees",
      hint: "$\\sin\\frac{\\theta}{2} = \\frac{r}{CP}$ is another way to see it.",
      solution: "$\\sin\\frac{\\theta}{2} = \\frac{1}{2}$, so $\\frac{\\theta}{2} = 30^\\circ$ and $\\theta = 60^\\circ$. (Equivalently $L = \\sqrt3$ and $\\tan\\frac{\\theta}{2} = \\frac{1}{\\sqrt3}$.)",
      commonMistakes: [
        { answer: 30, feedback: "30 degrees is half the angle between the tangents." },
        { answer: 120, feedback: "120 degrees is the angle the two radii make at the centre, the supplement of the angle at $P$." },
      ],
    },
    {
      type: "quiz",
      id: "slc4-5-q8",
      variant: "practice",
      multiple: true,
      question: "Tangents are drawn from $(7, 1)$ to $x^2 + y^2 = 25$. Which statements are true? Select all that apply.",
      options: [
        { text: "$4x - 3y = 25$ is one of them", correct: true, feedback: "It passes through $(7, 1)$ ($28 - 3 = 25$) and its distance from $O$ is $\\frac{25}{5} = 5$." },
        { text: "$3x + 4y = 25$ is one of them", correct: true, feedback: "Through $(7, 1)$ and at distance 5 from $O$." },
        { text: "The two tangents are perpendicular", correct: true, feedback: "Slopes $\\frac43$ and $-\\frac34$ multiply to $-1$." },
        { text: "Each tangent has length 7", feedback: "$L = \\sqrt{49 + 1 - 25} = 5$." },
        { text: "$7x + y = 25$ is one of them", feedback: "That is $T = 0$ for an outside point: the chord of contact, not a tangent." },
      ],
      hint: "Each tangent passes through $(7, 1)$ and is at distance 5 from the origin.",
    },
    {
      type: "numeric",
      id: "slc4-5-q9",
      variant: "practice",
      question:
        "Find the length of the tangent from $(5, 3)$ to $x^2 + y^2 + 2x - 4y + 1 = 0$ (to two decimal places).",
      answer: 5.7446,
      tolerance: 0.01,
      hint: "$L = \\sqrt{S_1}$.",
      solution: "$S_1 = 25 + 9 + 10 - 12 + 1 = 33$, so $L = \\sqrt{33} \\approx 5.74$.",
      commonMistakes: [
        { answer: 33, feedback: "33 is $S_1$. Take the square root." },
        { answer: 3.32, tolerance: 0.01, feedback: "That is $\\sqrt{11}$: check the signs, $+2x = +10$ and $-4y = -12$." },
      ],
    },
    {
      type: "numeric",
      id: "slc4-5-q10",
      variant: "practice",
      question:
        "JEE Main. The tangent to $x^2 + y^2 = 25$ at $(3, 4)$ meets the axes at $A$ and $B$. Find the area of triangle $OAB$ (to two decimal places).",
      answer: 26.0417,
      tolerance: 0.01,
      hint: "The tangent is $3x + 4y = 25$. Find its intercepts.",
      solution: "$A = \\left(\\frac{25}{3}, 0\\right)$, $B = \\left(0, \\frac{25}{4}\\right)$, area $= \\frac12 \\cdot \\frac{25}{3} \\cdot \\frac{25}{4} = \\frac{625}{24} \\approx 26.04$.",
      commonMistakes: [
        { answer: 52.08, tolerance: 0.01, feedback: "Don't forget the $\\frac12$." },
        { answer: 6, feedback: "That is the triangle with vertices $O$, $(3, 0)$, $(0, 4)$. The tangent's intercepts are $\\frac{25}{3}$ and $\\frac{25}{4}$." },
      ],
    },
    {
      type: "numeric",
      id: "slc4-5-q11",
      variant: "practice",
      question: "The line $y = mx + 5$ touches $x^2 + y^2 = 5$. Find $m^2$.",
      answer: 4,
      hint: "$c^2 = a^2(1 + m^2)$ with $c = 5$, $a^2 = 5$.",
      solution: "$25 = 5(1 + m^2)$, so $m^2 = 4$ ($m = \\pm 2$).",
      commonMistakes: [
        { answer: 2, feedback: "2 is $m$. The question asks for $m^2$." },
        { answer: 5, feedback: "Solve $25 = 5(1 + m^2)$: $1 + m^2 = 5$, so $m^2 = 4$." },
      ],
    },
    {
      type: "numeric",
      id: "slc4-5-q12",
      variant: "practice",
      question:
        "JEE Advanced. Tangents $PA$ and $PB$ are drawn from $P(6, 8)$ to $x^2 + y^2 = 64$. Find the area of the quadrilateral $OAPB$.",
      answer: 48,
      hint: "$OAPB$ is two congruent right triangles, each with legs $r$ and $L$.",
      solution: "$L = \\sqrt{100 - 64} = 6$, $r = 8$. Each right triangle $OAP$ has area $\\frac12 \\cdot 8 \\cdot 6 = 24$, so the quadrilateral has area $rL = 48$.",
      commonMistakes: [
        { answer: 24, feedback: "That is one of the two triangles." },
        { answer: 80, feedback: "That uses $CP = 10$ in place of the tangent length 6." },
      ],
    },
    {
      type: "quiz",
      id: "slc4-5-q13",
      variant: "concept",
      question:
        "For a point $P(x_1, y_1)$ **outside** the circle $S = 0$, what does the line $T = 0$ represent?",
      options: [
        { text: "The chord joining the two points of contact of the tangents from $P$", correct: true, feedback: "It is the chord of contact. You will derive this in Chapter 5." },
        { text: "One of the two tangents from $P$", feedback: "$T = 0$ is a tangent only when $P$ is on the circle. From outside it does not even pass through $P$." },
        { text: "The normal through $P$", feedback: "The normal through $P$ is the line $PC$." },
        { text: "Nothing: $T = 0$ only makes sense for points on the circle", feedback: "It always defines a line. From outside, it is the chord of contact." },
      ],
      hint: "Test the line $7x + y = 25$ for $P(7, 1)$ and $x^2 + y^2 = 25$: does it pass through $P$? Where does it meet the circle?",
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "normals",
  title: "4.6 · Normals",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "The **normal** to a curve at a point is the line through that point perpendicular to the tangent. For most curves, finding normals is real work. For a circle it is free: the tangent is perpendicular to the radius, so the normal **is** the line of the radius. Every normal to a circle passes through its centre.",
    },
    { type: "heading", text: "The normal at a point" },
    {
      type: "text",
      content:
        "At $P(x_1, y_1)$ on $x^2 + y^2 + 2gx + 2fy + c = 0$, the normal is the line through $P$ and the centre $C(-g, -f)$. In two-point form:",
    },
    {
      type: "math",
      latex: "\\frac{x - x_1}{x_1 + g} = \\frac{y - y_1}{y_1 + f}",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Normals to a circle",
      content:
        "- The normal at $P$ is the line $CP$. For $x^2 + y^2 = a^2$ it is $\\frac{x}{x_1} = \\frac{y}{y_1}$, i.e. $y_1x - x_1y = 0$.\n- Every line through the centre is a normal (at the two points where it meets the circle).\n- So if two normals are given, their intersection is the centre.",
    },
    {
      type: "interactive",
      config: {
        component: "slc-circle-lab",
        mode: "circle",
        centre: [1, 0.5],
        radius: { min: 0.5, max: 4, step: 0.25, initial: 3 },
        p: [3, 3],
        show: ["normal", "parametric"],
        caption:
          "Move the point round the circle with the $\\theta$ slider. However you move it, the normal swings about one fixed point: the centre. Drag the centre and every normal follows it.",
      },
    },
    {
      type: "worked-example",
      id: "slc4-6-we1",
      title: "Worked example 1: the normal at a point",
      problem: "Find the normal to $x^2 + y^2 - 2x - 4y - 20 = 0$ at $(4, 6)$.",
      steps: [
        { text: "Check: $16 + 36 - 8 - 24 - 20 = 0$, so $(4, 6)$ is on the circle. The centre is $(1, 2)$." },
        { text: "The normal is the line through $(1, 2)$ and $(4, 6)$, of slope $\\frac43$. *Why this step:* a normal to a circle always passes through the centre, so two points fix it." },
        { text: "Equation: $y - 2 = \\frac43(x - 1)$, i.e. $4x - 3y + 2 = 0$. Check both points: $4 - 6 + 2 = 0$ and $16 - 18 + 2 = 0$." },
      ],
      answer: "$4x - 3y + 2 = 0$.",
    },
    {
      type: "worked-example",
      id: "slc4-6-we2",
      title: "Worked example 2: a circle from two normals (JEE Main)",
      problem:
        "Two normals to a circle are $2x - 3y = 5$ and $3x - 4y = 7$, and the circle has area $154$ square units (take $\\pi = \\frac{22}{7}$). Find the circle.",
      steps: [
        { text: "Normals meet at the centre. Solve: from $2x - 3y = 5$ and $3x - 4y = 7$ we get $x = 1$, $y = -1$. *Why this step:* every normal passes through the centre, so two of them pin it down." },
        { text: "$\\pi r^2 = 154$ gives $r^2 = 49$." },
        { text: "Circle: $(x - 1)^2 + (y + 1)^2 = 49$." },
      ],
      answer: "$x^2 + y^2 - 2x + 2y - 47 = 0$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"to find the normal, first find the tangent, then flip the slope\"",
      content:
        "It works, but it is the long way round and it fails when the tangent is horizontal or vertical. For a circle, simply join the point to the centre. At $(-1, 0)$ on $x^2 + y^2 - 4x + 2y - 5 = 0$ (centre $(2, -1)$) the normal is the line through $(-1, 0)$ and $(2, -1)$: $x + 3y + 1 = 0$, in one step.",
    },
    { type: "heading", text: "Shortest distances via the normal" },
    {
      type: "text",
      content:
        "Shortest-distance questions are normal questions in disguise. The shortest segment from a point to a circle runs along the normal through that point (Lesson 4.3). The shortest segment from a line to a circle that it misses runs along the perpendicular from the centre to the line, which is also a normal of the circle: its length is $d - r$.",
    },
    {
      type: "worked-example",
      id: "slc4-6-we3",
      title: "Worked example 3: shortest distance from a line to a circle",
      problem: "Find the shortest distance between the line $3x + 4y = 40$ and the circle $x^2 + y^2 = 25$, and the point of the circle nearest to the line.",
      steps: [
        { text: "$d = \\frac{40}{5} = 8 > 5$, so the line misses the circle." },
        { text: "Shortest distance $= d - r = 3$. *Why this step:* along the perpendicular from the centre, the circle reaches $r$ units towards the line and leaves a gap of $d - r$." },
        { text: "The nearest point is $r$ units from $O$ along the normal direction $(3, 4)$ of the line:", latex: "5 \\cdot \\tfrac{(3, 4)}{5} = (3, 4)" },
      ],
      answer: "Shortest distance $3$, attained at $(3, 4)$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "slc4-6-q1",
      variant: "practice",
      question: "The normal to $x^2 + y^2 = 25$ at $(3, 4)$ is",
      options: [
        { text: "$4x - 3y = 0$", correct: true, feedback: "The line through $O$ and $(3, 4)$: $y = \\frac43x$." },
        { text: "$3x + 4y = 25$", feedback: "That is the tangent at $(3, 4)$." },
        { text: "$3x - 4y = 0$", feedback: "That line through $O$ has slope $\\frac34$, so it misses $(3, 4)$." },
        { text: "$4x + 3y = 0$", feedback: "Slope $-\\frac43$: through $O$ but not through $(3, 4)$." },
      ],
      hint: "The normal joins the point to the centre $O$.",
    },
    {
      type: "numeric",
      id: "slc4-6-q2",
      variant: "practice",
      question:
        "Two normals to a circle are $2x + y = 7$ and $x - y = 2$, and the circle passes through the origin. Find the square of its radius.",
      answer: 10,
      hint: "The normals meet at the centre.",
      solution: "Adding the equations: $3x = 9$, $x = 3$, $y = 1$. The centre is $(3, 1)$ and $r^2 = 9 + 1 = 10$.",
      commonMistakes: [
        { answer: 3.16, tolerance: 0.01, feedback: "That is $r = \\sqrt{10}$. The question asks for $r^2$." },
        { answer: 4, feedback: "That is $(3 - 1)^2$: the radius runs from $(3, 1)$ to the origin, so $r^2 = 3^2 + 1^2$." },
      ],
    },
    {
      type: "numeric",
      id: "slc4-6-q3",
      variant: "practice",
      question:
        "Find the shortest distance between the line $x + y = 10$ and the circle $x^2 + y^2 - 2x - 2y - 2 = 0$ (to two decimal places).",
      answer: 3.6569,
      tolerance: 0.01,
      hint: "Centre $(1, 1)$, radius 2. Shortest distance $= d - r$ if the line misses.",
      solution: "$d = \\frac{\\lvert 1 + 1 - 10\\rvert}{\\sqrt2} = 4\\sqrt2 \\approx 5.66 > 2$. Shortest distance $= 4\\sqrt2 - 2 \\approx 3.66$.",
      commonMistakes: [
        { answer: 5.66, tolerance: 0.01, feedback: "That is the distance from the centre. Subtract the radius." },
        { answer: 7.66, tolerance: 0.01, feedback: "That is $d + r$, the greatest distance from the line to a point of the circle." },
      ],
    },
    {
      type: "quiz",
      id: "slc4-6-q4",
      variant: "practice",
      question: "The normal to $x^2 + y^2 - 4x + 2y - 5 = 0$ at $(-1, 0)$ is",
      options: [
        { text: "$x + 3y + 1 = 0$", correct: true, feedback: "Through $(-1, 0)$ and the centre $(2, -1)$: $-1 + 0 + 1 = 0$ and $2 - 3 + 1 = 0$." },
        { text: "$3x - y + 3 = 0$", feedback: "That is the tangent at $(-1, 0)$: it is perpendicular to the radius." },
        { text: "$x - 3y + 1 = 0$", feedback: "It passes through $(-1, 0)$ but not through the centre: $2 + 3 + 1 \\ne 0$." },
        { text: "$3x + y + 3 = 0$", feedback: "Check the centre $(2, -1)$: $6 - 1 + 3 \\ne 0$." },
      ],
      hint: "Find the centre, then the line through it and $(-1, 0)$.",
    },
    {
      type: "numeric",
      id: "slc4-6-q5",
      variant: "practice",
      question:
        "The point of $x^2 + y^2 = 169$ nearest to the line $5x + 12y = 338$ is $(p, q)$. Find $p + q$.",
      answer: 17,
      hint: "The nearest point lies on the perpendicular from the centre to the line, at distance 13 from the centre.",
      solution: "The normal direction of the line is $(5, 12)$, of length 13. The nearest point is $13 \\cdot \\frac{(5, 12)}{13} = (5, 12)$, so $p + q = 17$. (The line is at distance $\\frac{338}{13} = 26$, so the gap is $26 - 13 = 13$.)",
      commonMistakes: [
        { answer: -17, feedback: "$(-5, -12)$ is the farthest point, on the far side of the centre." },
        { answer: 13, feedback: "13 is the shortest distance (and the radius), not $p + q$." },
      ],
    },
    {
      type: "quiz",
      id: "slc4-6-q6",
      variant: "concept",
      multiple: true,
      question: "Which statements about normals to a circle are true? Select all that apply.",
      options: [
        { text: "Every normal passes through the centre", correct: true, feedback: "The normal at $P$ is the line of the radius $CP$." },
        { text: "The normal at $P$ is perpendicular to the tangent at $P$", correct: true, feedback: "That is the definition of a normal." },
        { text: "Through any point other than the centre there is exactly one normal line", correct: true, feedback: "It is the line joining that point to the centre (a normal at two points of the circle)." },
        { text: "Infinitely many normals pass through the centre", correct: true, feedback: "Every line through the centre is a normal." },
        { text: "A normal at $P$ can be parallel to the tangent at $P$", feedback: "They are perpendicular, so they always meet at $P$." },
      ],
      hint: "Picture the radius to $P$: it is the normal at $P$.",
    },
    {
      type: "numeric",
      id: "slc4-6-q7",
      variant: "practice",
      question:
        "Find the greatest distance from the origin to a point of the circle $x^2 + y^2 - 6x - 8y = 0$.",
      answer: 10,
      hint: "The origin is on this circle ($c = 0$). The farthest point is at the other end of the normal through it.",
      solution: "Centre $(3, 4)$, radius 5, and the origin is on the circle. The normal through $O$ is a diameter, so the farthest point $(6, 8)$ is at distance $2r = 10$.",
      commonMistakes: [
        { answer: 5, feedback: "5 is the radius, the distance to the centre." },
        { answer: 0, feedback: "0 is the least distance, since the origin is on the circle." },
      ],
    },
    {
      type: "numeric",
      id: "slc4-6-q8",
      variant: "practice",
      question:
        "JEE Main. Two normals to a circle are $2x - 3y = 5$ and $3x - 4y = 7$, and the circle has area $154$ (with $\\pi = \\frac{22}{7}$). The circle is $x^2 + y^2 + 2gx + 2fy + c = 0$. Find $c$.",
      answer: -47,
      hint: "Centre = intersection of the normals. $r^2$ from the area. Then $c = h^2 + k^2 - r^2$.",
      solution: "Centre $(1, -1)$, $r^2 = 154 \\cdot \\frac{7}{22} = 49$, so $c = 1 + 1 - 49 = -47$.",
      commonMistakes: [
        { answer: 51, feedback: "Sign slip: $c = h^2 + k^2 - r^2$." },
        { answer: -5, feedback: "You used $r^2 = 7$. $\\pi r^2 = 154$ gives $r^2 = 49$." },
      ],
    },
    {
      type: "numeric",
      id: "slc4-6-q9",
      variant: "practice",
      question:
        "The normal at a point of $x^2 + y^2 - 4x + 6y - 3 = 0$ cuts the circle again. Find the length of the chord it cuts.",
      answer: 8,
      hint: "Every normal passes through the centre. What kind of chord passes through the centre?",
      solution: "The normal is a diameter, so the chord has length $2r = 2\\sqrt{4 + 9 + 3} = 8$.",
      commonMistakes: [
        { answer: 4, feedback: "4 is the radius. A normal chord is a full diameter." },
        { answer: 6.32, tolerance: 0.01, feedback: "That is $2\\sqrt{10}$: $r^2 = g^2 + f^2 - c = 4 + 9 + 3 = 16$." },
      ],
    },
    {
      type: "quiz",
      id: "slc4-6-q10",
      variant: "practice",
      question: "The normal at the origin to the circle $x^2 + y^2 - 2x - 4y = 0$ is",
      options: [
        { text: "$y = 2x$", correct: true, feedback: "The line through the origin and the centre $(1, 2)$." },
        { text: "$x + 2y = 0$", feedback: "That is the tangent at the origin, perpendicular to the radius." },
        { text: "$y = -2x$", feedback: "That misses the centre $(1, 2)$." },
        { text: "$2y = x$", feedback: "Slope $\\frac12$: check the centre $(1, 2)$, which needs slope 2." },
      ],
      hint: "The origin is on the circle ($c = 0$). Join it to the centre.",
    },
    {
      type: "numeric",
      id: "slc4-6-q11",
      variant: "practice",
      question:
        "JEE Main. Find the least distance between a point of the circle $x^2 + y^2 = 1$ and a point of the line $3x + 4y = 12$.",
      answer: 1.4,
      tolerance: 0.001,
      hint: "Distance from the centre to the line, minus the radius.",
      solution: "$d = \\frac{12}{5} = 2.4 > 1$, so the least distance is $2.4 - 1 = 1.4$, along the normal from $O$.",
      commonMistakes: [
        { answer: 2.4, feedback: "That is the distance from the centre. Subtract the radius." },
        { answer: 3.4, feedback: "That is $d + r$." },
      ],
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-4-mastery",
  title: "4.7 · Chapter 4 Mastery",
  position: 7,
  blocks: blocks([
    {
      type: "text",
      content:
        "No new theory here and no formula sheet. Every result in this chapter is the sentence \"distance from the centre equals the radius\" in a different costume. If a question stalls, find the centre and the radius, draw the picture, and ask which distance is being compared with $r$.",
    },
    { type: "heading", text: "Reconstruct it" },
    {
      type: "callout",
      variant: "tip",
      title: "Rebuild the chapter from one sentence",
      content:
        "Without notes, derive:\n\n1. The centre and radius of $x^2 + y^2 + 2gx + 2fy + c = 0$. (Complete the square. Why must the $x^2$ and $y^2$ coefficients be equal, and why no $xy$ term?)\n2. The diameter form. (Which angle is a right angle?)\n3. The meaning of $S_1$. (Why is it $CP^2 - r^2$?)\n4. The chord length $2\\sqrt{r^2 - d^2}$ and the condition $c^2 = a^2(1 + m^2)$. (Draw the right triangle.)\n5. The tangent $T = 0$ at a point. (Which vector is normal to it?)\n6. The tangent length $\\sqrt{S_1}$ and the angle between the two tangents. (Which triangle?)\n7. Why every normal passes through the centre.",
    },
    {
      type: "interactive",
      config: {
        component: "slc-circle-lab",
        mode: "tangents",
        centre: [-0.5, 0],
        radius: { min: 0.5, max: 4, step: 0.25, initial: 2.5 },
        p: [3.5, 2.5],
        show: ["tangents", "general-form"],
        caption:
          "Check your reconstructions here. Predict $S_1$, the tangent length and the angle between the tangents for a position of $P$, then drag $P$ there and compare.",
      },
    },
    { type: "heading", text: "Mastery questions" },
    {
      type: "numeric",
      id: "slc4-7-q1",
      variant: "mastery",
      question: "Find the radius of $x^2 + y^2 - 10x + 4y + 4 = 0$.",
      answer: 5,
      hint: "Lesson 4.1: $r = \\sqrt{g^2 + f^2 - c}$.",
      solution: "$g = -5$, $f = 2$, $c = 4$: $r = \\sqrt{25 + 4 - 4} = 5$.",
      commonMistakes: [
        { answer: 5.74, tolerance: 0.01, feedback: "That is $\\sqrt{33} = \\sqrt{g^2 + f^2 + c}$. The constant enters with a minus sign." },
        { answer: 25, feedback: "25 is $r^2$." },
      ],
    },
    {
      type: "quiz",
      id: "slc4-7-q2",
      variant: "mastery",
      question:
        "The equation $2x^2 + \\lambda xy + 2y^2 + (\\lambda - 4)x + 6y - 5 = 0$ represents a circle. Its centre is",
      options: [
        { text: "$\\left(1, -\\frac32\\right)$", correct: true, feedback: "$\\lambda = 0$ (no $xy$ term). Dividing by 2: $x^2 + y^2 - 2x + 3y - \\frac52 = 0$, centre $\\left(1, -\\frac32\\right)$." },
        { text: "$\\left(-1, \\frac32\\right)$", feedback: "That is $(g, f)$. The centre is $(-g, -f)$." },
        { text: "$(2, -3)$", feedback: "Divide by 2 before reading off $g$ and $f$." },
        { text: "$(1, -3)$", feedback: "Both coefficients must be halved after dividing by 2: $2f = 3$." },
      ],
      hint: "Lesson 4.1: first force $\\lambda$ from the $xy$ term, then divide by 2.",
    },
    {
      type: "numeric",
      id: "slc4-7-q3",
      variant: "mastery",
      question:
        "The circle on the segment from $(3, -2)$ to $(-1, 4)$ as diameter is $x^2 + y^2 + 2gx + 2fy + c = 0$. Find $c$.",
      answer: -11,
      hint: "Lesson 4.2: $c = x_1x_2 + y_1y_2$.",
      solution: "$c = (3)(-1) + (-2)(4) = -3 - 8 = -11$.",
      commonMistakes: [
        { answer: 5, feedback: "Sign slip: $(-2)(4) = -8$, not $+8$." },
        { answer: 11, feedback: "Both products are negative: $-3$ and $-8$." },
      ],
    },
    {
      type: "numeric",
      id: "slc4-7-q4",
      variant: "mastery",
      question: "Find the length of the chord cut on the x-axis by $x^2 + y^2 + 6x - 4y - 16 = 0$.",
      answer: 10,
      hint: "Lesson 4.2: $2\\sqrt{g^2 - c}$.",
      solution: "$2\\sqrt{9 + 16} = 10$. Check: $x^2 + 6x - 16 = 0$ has roots 2 and $-8$.",
      commonMistakes: [
        { answer: 5, feedback: "That is half the chord." },
        { answer: 8.94, tolerance: 0.01, feedback: "That is the y-intercept $2\\sqrt{f^2 - c} = 2\\sqrt{20}$. The x-axis chord uses $g$." },
      ],
    },
    {
      type: "numeric",
      id: "slc4-7-q5",
      variant: "mastery",
      question: "Find the shortest distance from $(10, 7)$ to the circle $x^2 + y^2 - 4x - 2y - 20 = 0$.",
      answer: 5,
      hint: "Lesson 4.3: $CP - r$ for an outside point.",
      solution: "Centre $(2, 1)$, $r = \\sqrt{4 + 1 + 20} = 5$, $CP = \\sqrt{64 + 36} = 10$. Shortest distance $10 - 5 = 5$.",
      commonMistakes: [
        { answer: 15, feedback: "That is the greatest distance $CP + r$." },
        { answer: 10, feedback: "That is the distance to the centre." },
      ],
    },
    {
      type: "quiz",
      id: "slc4-7-q6",
      variant: "mastery",
      question: "The point $(2, 3)$ relative to the circle $x^2 + y^2 - 4x + 6y - 12 = 0$ is",
      options: [
        { text: "outside", correct: true, feedback: "$S_1 = 4 + 9 - 8 + 18 - 12 = 11 > 0$. (Centre $(2, -3)$, $r = 5$, $CP = 6$.)" },
        { text: "inside", feedback: "$S_1 = 11$ is positive." },
        { text: "on the circle", feedback: "$S_1 = 11 \\ne 0$." },
        { text: "at the centre", feedback: "The centre is $(2, -3)$." },
      ],
      hint: "Lesson 4.3: the sign of $S_1$.",
    },
    {
      type: "numeric",
      id: "slc4-7-q7",
      variant: "mastery",
      question: "Find the length of the chord cut by $4x - 3y = 10$ on the circle $x^2 + y^2 = 8$.",
      answer: 4,
      hint: "Lesson 4.4: $2\\sqrt{r^2 - d^2}$.",
      solution: "$d = \\frac{10}{5} = 2$, so the chord is $2\\sqrt{8 - 4} = 4$.",
      commonMistakes: [
        { answer: 2, feedback: "That is the half-chord." },
        { answer: 1.66, tolerance: 0.01, feedback: "That is $2(r - d) = 2(2\\sqrt2 - 2)$. Use Pythagoras: $2\\sqrt{r^2 - d^2}$." },
      ],
    },
    {
      type: "numeric",
      id: "slc4-7-q8",
      variant: "mastery",
      question:
        "The line $3x - 4y + c = 0$ touches the circle $x^2 + y^2 - 2x - 4y + 1 = 0$. Find the positive value of $c$.",
      answer: 15,
      hint: "Lesson 4.4: centre $(1, 2)$, radius 2. Distance from the centre $=$ radius.",
      solution: "$\\frac{\\lvert 3 - 8 + c\\rvert}{5} = 2$ gives $\\lvert c - 5\\rvert = 10$, so $c = 15$ or $c = -5$. The positive value is 15.",
      commonMistakes: [
        { answer: 10, feedback: "That is $c^2 = a^2(l^2 + m^2)$ applied as if the centre were the origin. Substitute the centre $(1, 2)$." },
        { answer: 5, feedback: "$c = 5$ puts the line through the centre. Tangency needs $\\lvert c - 5\\rvert = 10$." },
      ],
    },
    {
      type: "quiz",
      id: "slc4-7-q9",
      variant: "mastery",
      multiple: true,
      question:
        "Which lines are tangents to $x^2 + y^2 = 25$ parallel to $3x + 4y = 0$? Select all that apply.",
      options: [
        { text: "$3x + 4y = 25$", correct: true, feedback: "Distance $\\frac{25}{5} = 5$." },
        { text: "$3x + 4y = -25$", correct: true, feedback: "Distance $\\frac{25}{5} = 5$, on the other side." },
        { text: "$3x + 4y = 5$", feedback: "Distance 1: a secant." },
        { text: "$4x - 3y = 25$", feedback: "A tangent, but perpendicular to $3x + 4y = 0$, not parallel." },
      ],
      hint: "Lesson 4.5: parallel lines are $3x + 4y = k$. Tangency needs $\\frac{\\lvert k\\rvert}{5} = 5$.",
    },
    {
      type: "numeric",
      id: "slc4-7-q10",
      variant: "mastery",
      question: "Find the length of the tangent from $(-2, 5)$ to $x^2 + y^2 + 2x - 4y - 4 = 0$.",
      answer: 1,
      hint: "Lesson 4.5: $L = \\sqrt{S_1}$.",
      solution: "$S_1 = 4 + 25 - 4 - 20 - 4 = 1$, so $L = 1$.",
      commonMistakes: [
        { answer: 3, feedback: "3 is the radius ($\\sqrt{1 + 4 + 4}$). The tangent length is $\\sqrt{S_1}$." },
        { answer: 3.16, tolerance: 0.01, feedback: "That is $CP = \\sqrt{10}$, the distance to the centre $(-1, 2)$." },
      ],
    },
    {
      type: "numeric",
      id: "slc4-7-q11",
      variant: "mastery",
      question: "Find the angle (in degrees) between the tangents drawn from $(6, 0)$ to $x^2 + y^2 = 9$.",
      answer: 60,
      unit: "degrees",
      hint: "Lesson 4.5: $\\sin\\frac{\\theta}{2} = \\frac{r}{CP}$.",
      solution: "$\\sin\\frac{\\theta}{2} = \\frac36 = \\frac12$, so $\\theta = 60^\\circ$.",
      commonMistakes: [
        { answer: 30, feedback: "30 degrees is half the angle." },
        { answer: 120, feedback: "120 degrees is the angle between the radii to the points of contact." },
      ],
    },
    {
      type: "numeric",
      id: "slc4-7-q12",
      variant: "mastery",
      question:
        "JEE Main. The tangent to $x^2 + y^2 = 8$ at $(2, 2)$ meets the axes at $A$ and $B$. Find the area of triangle $OAB$.",
      answer: 8,
      hint: "Lesson 4.5: the tangent is $2x + 2y = 8$.",
      solution: "$x + y = 4$ meets the axes at $(4, 0)$ and $(0, 4)$: area $\\frac12 \\cdot 4 \\cdot 4 = 8$.",
      commonMistakes: [
        { answer: 16, feedback: "Don't forget the $\\frac12$." },
        { answer: 2, feedback: "The intercepts of $x + y = 4$ are 4 and 4, not 2 and 2." },
      ],
    },
    {
      type: "numeric",
      id: "slc4-7-q13",
      variant: "mastery",
      question:
        "Two normals to a circle are $x + y = 4$ and $x - y = 2$, and the circle touches the y-axis. Writing it as $x^2 + y^2 + 2gx + 2fy + c = 0$, find $c$.",
      answer: 1,
      hint: "Lesson 4.6: the normals meet at the centre. Touching the y-axis makes $r = \\lvert h\\rvert$.",
      solution: "Centre $(3, 1)$, $r = 3$, so $c = 9 + 1 - 9 = 1$.",
      commonMistakes: [
        { answer: 9, feedback: "That takes $r = 1$ (touching the x-axis). Touching the y-axis means $r = \\lvert h\\rvert = 3$." },
        { answer: 19, feedback: "Sign slip: $c = h^2 + k^2 - r^2$." },
      ],
    },
    {
      type: "quiz",
      id: "slc4-7-q14",
      variant: "mastery",
      multiple: true,
      question:
        "JEE Advanced. For the circle $x^2 + y^2 - 6x - 8y + 16 = 0$, which statements are true? Select all that apply.",
      options: [
        { text: "It touches the y-axis", correct: true, feedback: "Centre $(3, 4)$, radius 3, and $\\lvert h\\rvert = 3 = r$ (equivalently $f^2 = 16 = c$)." },
        { text: "It does not meet the x-axis", correct: true, feedback: "$g^2 - c = 9 - 16 < 0$: the centre is 4 above the axis but $r = 3$." },
        { text: "The origin lies outside it", correct: true, feedback: "$S_1 = 16 > 0$." },
        { text: "The tangent from the origin has length 4", correct: true, feedback: "$\\sqrt{S_1} = \\sqrt{16} = 4$." },
        { text: "It touches the x-axis", feedback: "That needs $r = \\lvert k\\rvert = 4$, but $r = 3$." },
      ],
      hint: "Find the centre and radius, then test each statement with a distance or with $S_1$.",
    },
    {
      type: "quiz",
      id: "slc4-7-q15",
      variant: "mastery",
      question: "The greatest value of $4x - 3y$ for points on $x^2 + y^2 - 2x + 4y = 0$ is",
      options: [
        { text: "$10 + 5\\sqrt5$", correct: true, feedback: "Centre $(1, -2)$, $r = \\sqrt5$: $4x - 3y = 10 + \\sqrt5(4\\cos\\theta - 3\\sin\\theta) \\le 10 + 5\\sqrt5$." },
        { text: "$10 + \\sqrt5$", feedback: "The varying part is $r(4\\cos\\theta - 3\\sin\\theta)$, whose maximum is $5r$, not $r$." },
        { text: "$5\\sqrt5$", feedback: "Add the value at the centre, $4(1) - 3(-2) = 10$." },
        { text: "$35$", feedback: "That uses $r = 5$. Here $r^2 = 1 + 4 - 0 = 5$." },
      ],
      hint: "Lesson 4.2: parametrise with $x = 1 + \\sqrt5\\cos\\theta$, $y = -2 + \\sqrt5\\sin\\theta$.",
    },
    {
      type: "numeric",
      id: "slc4-7-q16",
      variant: "mastery",
      question:
        "JEE Main. For how many integers $k$ does the line $3x + 4y = k$ meet the circle $x^2 + y^2 = 4$ in two distinct points?",
      answer: 19,
      hint: "Lesson 4.4: two points means $d < r$.",
      solution: "$\\frac{\\lvert k\\rvert}{5} < 2$ gives $\\lvert k\\rvert < 10$: $k = -9, \\dots, 9$, which is 19 integers.",
      commonMistakes: [
        { answer: 21, feedback: "$k = \\pm 10$ give tangents (one point each), not two points." },
        { answer: 9, feedback: "$k$ can be negative or zero too: $-9$ to $9$." },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Where next",
      content:
        "In this chapter $T = 0$ was the tangent at a point on the circle, and we warned that for a point outside it is \"something else\". Chapter 5 says exactly what: the chord of contact, and more generally the polar. With $T$, $S_1$ and $S$ as building blocks you will write chords with a given midpoint, common tangents of two circles, their common chord, and every circle through the meeting points of two curves.",
    },
  ]),
};

export const slcChapter4Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lessonMastery,
];
