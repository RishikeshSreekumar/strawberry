import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Straight Lines and Circles Chapter 0 — The Coordinate Plane. Points as
 * number pairs: the distance formula (Pythagoras on the coordinate
 * differences), the section formula for internal and external division,
 * the centres of a triangle (centroid, incentre, excentres, circumcentre,
 * orthocentre and the Euler line), area of a triangle or polygon by the
 * determinant / shoelace formula and collinearity, the locus of a moving
 * point and its equation, and shifting (and briefly rotating) the axes.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "points-and-the-distance-formula",
  title: "0.1 · Points and the Distance Formula",
  position: 1,
  blocks: blocks([
    {
      type: "text",
      content:
        "Coordinate geometry rests on one idea of Descartes: **a point is a pair of numbers**. Once every point is a pair $(x, y)$, a geometric question (Is this triangle right-angled? Is this quadrilateral a square? Where is the point equally far from three towns?) becomes arithmetic on those numbers.",
    },
    {
      type: "text",
      content:
        "This whole course is built from that translation. In this first lesson we build the most basic tool of all: the distance between two points. Almost everything later (the section formula, the circle, the distance from a line) is this formula in disguise.",
    },
    { type: "heading", text: "Coordinates and quadrants" },
    {
      type: "text",
      content:
        "Draw two perpendicular number lines meeting at the **origin** $O$: the horizontal x-axis and the vertical y-axis. A point $P$ is located by dropping perpendiculars to the axes: the foot on the x-axis gives the **abscissa** $x$, the foot on the y-axis gives the **ordinate** $y$, and we write $P(x, y)$. The order matters: $(2, 5)$ and $(5, 2)$ are different points.",
    },
    {
      type: "table",
      headers: ["Region", "Sign of $x$", "Sign of $y$", "Example"],
      rows: [
        ["Quadrant I", "$+$", "$+$", "$(3, 2)$"],
        ["Quadrant II", "$-$", "$+$", "$(-3, 2)$"],
        ["Quadrant III", "$-$", "$-$", "$(-3, -2)$"],
        ["Quadrant IV", "$+$", "$-$", "$(3, -2)$"],
        ["x-axis", "any", "$0$", "$(4, 0)$"],
        ["y-axis", "$0$", "any", "$(0, -1)$"],
      ],
    },
    { type: "heading", text: "The distance formula" },
    {
      type: "text",
      content:
        "Take $A(x_1, y_1)$ and $B(x_2, y_2)$. Walk from $A$ horizontally to $C(x_2, y_1)$, then vertically up to $B$. The horizontal leg has length $\\lvert x_2 - x_1\\rvert$, the vertical leg has length $\\lvert y_2 - y_1\\rvert$, and the angle at $C$ is a right angle. Pythagoras does the rest:",
    },
    {
      type: "math",
      latex: "AB^2 = (x_2 - x_1)^2 + (y_2 - y_1)^2 \\qquad\\Longrightarrow\\qquad AB = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Distance formula",
      content:
        "The distance between $A(x_1, y_1)$ and $B(x_2, y_2)$ is\n\n$$AB = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}.$$\n\nThe squares remove the signs, so the order of the points does not matter. In particular the distance of $P(x, y)$ from the origin is $OP = \\sqrt{x^2 + y^2}$.",
    },
    {
      type: "interactive",
      config: {
        component: "slc-line-explorer",
        mode: "line",
        a: [-2, 3],
        b: [4, -5],
        caption:
          "Drag $A$ and $B$. The horizontal gap $\\Delta x$ and the vertical gap $\\Delta y$ are the legs of a right triangle whose hypotenuse is $AB$. Swap the two points: both gaps change sign, but their squares (and so the distance) do not.",
      },
    },
    {
      type: "worked-example",
      id: "slc0-1-we1",
      title: "Worked example 1: a straight distance",
      problem: "Find the distance between $A(-2, 3)$ and $B(4, -5)$.",
      steps: [
        { text: "Coordinate differences: $\\Delta x = 4 - (-2) = 6$ and $\\Delta y = -5 - 3 = -8$." },
        {
          text: "Square, add and take the root. *Why this step:* the sign of $\\Delta y$ does not matter once it is squared, so there is no need to decide which point is \"first\".",
          latex: "AB = \\sqrt{6^2 + (-8)^2} = \\sqrt{100} = 10",
        },
      ],
      answer: "$AB = 10$.",
    },
    {
      type: "worked-example",
      id: "slc0-1-we2",
      title: "Worked example 2: proving a triangle is equilateral",
      problem: "Show that $A(1, 1)$, $B(-1, -1)$ and $C(-\\sqrt3, \\sqrt3)$ are the vertices of an equilateral triangle.",
      steps: [
        { text: "$AB^2 = (-2)^2 + (-2)^2 = 8$." },
        {
          text: "$BC^2 = (-\\sqrt3 + 1)^2 + (\\sqrt3 + 1)^2 = (4 - 2\\sqrt3) + (4 + 2\\sqrt3) = 8$. *Why this step:* compare squared distances, which avoids square roots until the very end.",
        },
        { text: "$CA^2 = (1 + \\sqrt3)^2 + (1 - \\sqrt3)^2 = (4 + 2\\sqrt3) + (4 - 2\\sqrt3) = 8$." },
      ],
      answer: "All three sides equal $2\\sqrt2$, so the triangle is equilateral.",
    },
    { type: "heading", text: "Classifying triangles and quadrilaterals" },
    {
      type: "text",
      content:
        "To name a figure from its vertices, compute **every side and both diagonals** (for a quadrilateral), then read the table below. Compare squared lengths: they are whole numbers when the coordinates are, and a right angle shows up as $p^2 + q^2 = r^2$.",
    },
    {
      type: "table",
      headers: ["Figure", "Distance test"],
      rows: [
        ["Right triangle", "the squares of two sides add up to the square of the third"],
        ["Isosceles triangle", "two sides equal"],
        ["Parallelogram", "both pairs of opposite sides equal (equivalently, the diagonals share a midpoint)"],
        ["Rectangle", "opposite sides equal **and** diagonals equal"],
        ["Rhombus", "all four sides equal"],
        ["Square", "all four sides equal **and** diagonals equal"],
      ],
    },
    {
      type: "worked-example",
      id: "slc0-1-we3",
      title: "Worked example 3: rhombus or square?",
      problem: "Classify the quadrilateral with vertices $A(0, 0)$, $B(2, 1)$, $C(3, 3)$, $D(1, 2)$, taken in order.",
      steps: [
        { text: "Sides: $AB^2 = 4 + 1 = 5$, $BC^2 = 1 + 4 = 5$, $CD^2 = 4 + 1 = 5$, $DA^2 = 1 + 4 = 5$. All four sides equal $\\sqrt5$." },
        {
          text: "Diagonals: $AC^2 = 9 + 9 = 18$, $BD^2 = 1 + 1 = 2$. *Why this step:* equal sides alone only give a rhombus. A square also needs equal diagonals.",
        },
        { text: "The diagonals are $3\\sqrt2$ and $\\sqrt2$, which are unequal." },
      ],
      answer: "$ABCD$ is a rhombus but not a square.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"four equal sides means a square\"",
      content:
        "Push a square at one corner and it leans over into a rhombus: the four sides keep their length, but the diagonals become unequal and the angles stop being right angles. Always check the diagonals (or one angle) before writing \"square\".",
    },
    { type: "heading", text: "Points at given distances" },
    {
      type: "text",
      content:
        "\"Find the point on the x-axis equidistant from $A$ and $B$\" has a standard first move: write the unknown point with as few unknowns as the question allows. A point on the x-axis is $(x, 0)$, a point on the y-axis is $(0, y)$, a point on $y = x$ is $(t, t)$. Then set the **squared** distances equal: the $x^2$ terms cancel and a linear equation remains.",
    },
    {
      type: "worked-example",
      id: "slc0-1-we4",
      title: "Worked example 4: equidistant point on an axis",
      problem: "Find the point on the x-axis that is equidistant from $A(2, -5)$ and $B(-2, 9)$.",
      steps: [
        { text: "Let the point be $P(x, 0)$. *Why this step:* being on the x-axis already fixes $y = 0$, leaving one unknown." },
        { text: "Set $PA^2 = PB^2$:", latex: "(x - 2)^2 + 25 = (x + 2)^2 + 81" },
        { text: "The $x^2$ terms cancel: $-4x + 29 = 4x + 85$, so $-8x = 56$ and $x = -7$." },
        { text: "Check: $PA^2 = 81 + 25 = 106$ and $PB^2 = 25 + 81 = 106$." },
      ],
      answer: "$P(-7, 0)$.",
    },
    {
      type: "worked-example",
      id: "slc0-1-we5",
      title: "Worked example 5: two answers, not one",
      problem: "Find the points on the y-axis at distance 5 from $(4, 1)$.",
      steps: [
        { text: "Let the point be $(0, y)$. Then $16 + (y - 1)^2 = 25$." },
        { text: "So $(y - 1)^2 = 9$ and $y - 1 = \\pm 3$. *Why this step:* a square root always brings two signs. Geometrically, a circle of radius 5 about $(4, 1)$ cuts the y-axis twice." },
      ],
      answer: "$(0, 4)$ and $(0, -2)$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"distance is the gap in x plus the gap in y\"",
      content:
        "$\\lvert\\Delta x\\rvert + \\lvert\\Delta y\\rvert$ is the distance a taxi drives along a grid of streets, not the straight-line distance. From $(0, 0)$ to $(3, 4)$ the taxi drives 7, but the crow flies $\\sqrt{9 + 16} = 5$. The straight line is the hypotenuse, never the sum of the legs.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "slc0-1-q1",
      variant: "practice",
      question: "Find the distance between $(3, -4)$ and $(-3, 4)$.",
      answer: 10,
      hint: "$\\Delta x = -6$ and $\\Delta y = 8$. Square, add, take the root.",
      solution: "$\\sqrt{36 + 64} = \\sqrt{100} = 10$. (The two points are reflections of each other in the origin, each at distance 5 from it.)",
      commonMistakes: [
        { answer: 14, feedback: "That is $\\lvert\\Delta x\\rvert + \\lvert\\Delta y\\rvert$, the taxi distance. Use Pythagoras." },
        { answer: 0, feedback: "You added the coordinates instead of subtracting them: $(3 + (-3), -4 + 4) = (0, 0)$. Distance uses differences." },
        { answer: 100, feedback: "100 is $AB^2$. Take the square root." },
      ],
    },
    {
      type: "quiz",
      id: "slc0-1-q2",
      variant: "concept",
      question: "The point $(a, b)$ lies in the third quadrant. In which quadrant does $(-a, b)$ lie?",
      options: [
        { text: "Fourth quadrant", correct: true, feedback: "Third quadrant means $a < 0$ and $b < 0$. Then $-a > 0$ and $b < 0$: positive $x$, negative $y$." },
        { text: "First quadrant", feedback: "$b$ is still negative, so the point is below the x-axis." },
        { text: "Second quadrant", feedback: "The second quadrant has $x < 0$, but $-a > 0$." },
        { text: "Third quadrant", feedback: "Changing the sign of the abscissa reflects the point in the y-axis, which moves it out of the third quadrant." },
      ],
      hint: "Write down the signs of $a$ and $b$ first, then the signs of $-a$ and $b$.",
    },
    {
      type: "numeric",
      id: "slc0-1-q3",
      variant: "practice",
      question: "Find the distance of the point $(-5, 12)$ from the origin.",
      answer: 13,
      hint: "Use $OP = \\sqrt{x^2 + y^2}$.",
      solution: "$\\sqrt{25 + 144} = \\sqrt{169} = 13$.",
      commonMistakes: [
        { answer: 17, feedback: "That adds $5 + 12$. Square first, then add, then take the root." },
        { answer: 7, feedback: "That is $12 - 5$. Signs disappear when you square: use $\\sqrt{25 + 144}$." },
      ],
    },
    {
      type: "numeric",
      id: "slc0-1-q4",
      variant: "practice",
      question: "The distance between $(x, 2)$ and $(3, -2)$ is 5, and $x > 0$. Find $x$.",
      answer: 6,
      hint: "$(x - 3)^2 + 16 = 25$. Solve for $x - 3$, keeping both signs, then use $x > 0$.",
      solution: "$(x - 3)^2 = 9$ gives $x = 6$ or $x = 0$. The condition $x > 0$ keeps $x = 6$.",
      commonMistakes: [
        { answer: 0, feedback: "$x = 0$ also gives distance 5, but the question asks for $x > 0$." },
        { answer: 3, feedback: "That would make $\\Delta x = 0$ and the distance only 4." },
      ],
    },
    {
      type: "quiz",
      id: "slc0-1-q5",
      variant: "practice",
      question: "The triangle with vertices $A(1, 1)$, $B(4, 5)$ and $C(8, 2)$ is",
      options: [
        { text: "right-angled and isosceles", correct: true, feedback: "$AB^2 = 25$, $BC^2 = 25$, $CA^2 = 50 = 25 + 25$: two equal sides and Pythagoras holds, with the right angle at $B$." },
        { text: "equilateral", feedback: "$CA^2 = 49 + 1 = 50$, which differs from $AB^2 = 25$." },
        { text: "right-angled and scalene", feedback: "$AB$ and $BC$ are both 5, so it is isosceles." },
        { text: "obtuse-angled", feedback: "$AB^2 + BC^2 = CA^2$ exactly, so the largest angle is exactly $90^\\circ$." },
      ],
      hint: "Compute $AB^2$, $BC^2$ and $CA^2$, then compare.",
    },
    {
      type: "quiz",
      id: "slc0-1-q6",
      variant: "practice",
      multiple: true,
      question:
        "For the quadrilateral $A(-2, -1)$, $B(1, 0)$, $C(4, 3)$, $D(1, 2)$ (in this order), which statements are true? Select all that apply.",
      options: [
        { text: "Opposite sides are equal", correct: true, feedback: "$AB^2 = CD^2 = 10$ and $BC^2 = DA^2 = 18$." },
        { text: "The diagonals bisect each other", correct: true, feedback: "Both $AC$ and $BD$ have midpoint $(1, 1)$." },
        { text: "It is a rectangle", feedback: "The diagonals are unequal: $AC^2 = 52$, $BD^2 = 4$." },
        { text: "It is a rhombus", feedback: "Adjacent sides differ: $\\sqrt{10}$ and $\\sqrt{18}$." },
        { text: "It is a parallelogram", correct: true, feedback: "Opposite sides equal (or diagonals sharing a midpoint) is exactly the parallelogram test." },
      ],
      hint: "Find all four squared sides, both squared diagonals, and the midpoints of the diagonals.",
    },
    {
      type: "numeric",
      id: "slc0-1-q7",
      variant: "practice",
      question: "Find the abscissa of the point on the x-axis that is equidistant from $(7, 6)$ and $(3, 4)$.",
      answer: 7.5,
      hint: "Let the point be $(x, 0)$ and set the squared distances equal. The $x^2$ terms cancel.",
      solution: "$(x - 7)^2 + 36 = (x - 3)^2 + 16$ gives $-14x + 85 = -6x + 25$, so $8x = 60$ and $x = \\frac{15}{2}$.",
      commonMistakes: [
        { answer: 5, feedback: "5 is the average of 7 and 3. That would be right only if both points were at the same height." },
        { answer: -7.5, feedback: "Sign slip when moving terms across: $-14x + 6x = 25 - 85$ gives $-8x = -60$." },
      ],
    },
    {
      type: "numeric",
      id: "slc0-1-q8",
      variant: "practice",
      question: "Find the perimeter of the triangle with vertices $(0, 4)$, $(0, 0)$ and $(3, 0)$.",
      answer: 12,
      hint: "Two sides lie along the axes. The third is a hypotenuse.",
      solution: "The legs are 4 and 3 and the hypotenuse is $\\sqrt{9 + 16} = 5$, so the perimeter is 12.",
      commonMistakes: [
        { answer: 14, feedback: "The slanted side is not $3 + 4 = 7$. It is $\\sqrt{3^2 + 4^2} = 5$." },
        { answer: 7, feedback: "Add the third side too: $3 + 4 + 5$." },
      ],
    },
    {
      type: "quiz",
      id: "slc0-1-q9",
      variant: "practice",
      question:
        "JEE Main. The distance between $(a\\cos\\alpha, a\\sin\\alpha)$ and $(a\\cos\\beta, a\\sin\\beta)$, where $a > 0$, is",
      options: [
        { text: "$2a\\left\\lvert\\sin\\frac{\\alpha - \\beta}{2}\\right\\rvert$", correct: true, feedback: "$d^2 = a^2(2 - 2\\cos(\\alpha - \\beta)) = 4a^2\\sin^2\\frac{\\alpha - \\beta}{2}$." },
        { text: "$2a\\left\\lvert\\cos\\frac{\\alpha - \\beta}{2}\\right\\rvert$", feedback: "$1 - \\cos\\theta = 2\\sin^2\\frac\\theta2$, not $2\\cos^2\\frac\\theta2$. Test $\\alpha = \\beta$: the distance must be 0." },
        { text: "$a\\lvert\\sin(\\alpha - \\beta)\\rvert$", feedback: "Test $\\beta = \\alpha + \\pi$: the points are opposite ends of a diameter, distance $2a$, but this gives 0." },
        { text: "$a\\sqrt2$", feedback: "That is the distance only when the two radii are perpendicular." },
      ],
      hint: "Expand $d^2$ and use $\\cos^2 + \\sin^2 = 1$ and $\\cos\\alpha\\cos\\beta + \\sin\\alpha\\sin\\beta = \\cos(\\alpha - \\beta)$.",
    },
    {
      type: "quiz",
      id: "slc0-1-q10",
      variant: "practice",
      question:
        "JEE Main. A point $P(x, y)$ is equidistant from $A(a + b, b - a)$ and $B(a - b, a + b)$. Then",
      options: [
        { text: "$bx = ay$", correct: true, feedback: "$PA^2 - PB^2 = -4b(x - a) + 4a(y - b) = 4(ay - bx)$, which is zero exactly when $bx = ay$." },
        { text: "$ax = by$", feedback: "Check with $a = 1$, $b = 2$: $A(3, 1)$, $B(-1, 3)$, and $P(1, 2)$ is equidistant (both distances $\\sqrt5$). Then $ax = 1$ but $by = 4$." },
        { text: "$x + y = 0$", feedback: "The midpoint of $AB$ is $(a, b)$, which lies on the locus, but generally $a + b \\ne 0$." },
        { text: "$ax + by = 0$", feedback: "The midpoint $(a, b)$ must satisfy the answer, and $a^2 + b^2 \\ne 0$." },
      ],
      hint: "Set $PA^2 = PB^2$ and expand. Writing $u = x - a$ and $v = y - b$ shortens the algebra.",
    },
    {
      type: "numeric",
      id: "slc0-1-q11",
      variant: "practice",
      question:
        "Two points on the y-axis are at distance 10 from $(6, 3)$. Find the sum of their ordinates.",
      answer: 6,
      hint: "$36 + (y - 3)^2 = 100$ has two solutions.",
      solution: "$(y - 3)^2 = 64$, so $y = 11$ or $y = -5$. Their sum is 6 (twice the ordinate 3 of the centre, as symmetry predicts).",
      commonMistakes: [
        { answer: 11, feedback: "That is only one of the two points. The other is $y = -5$." },
        { answer: 16, feedback: "That is $11 - (-5)$, the gap between them, not their sum." },
      ],
    },
    {
      type: "quiz",
      id: "slc0-1-q12",
      variant: "practice",
      multiple: true,
      question: "Which of these points lie at distance exactly 5 from the origin? Select all that apply.",
      options: [
        { text: "$(3, 4)$", correct: true, feedback: "$\\sqrt{9 + 16} = 5$." },
        { text: "$(-4, 3)$", correct: true, feedback: "$\\sqrt{16 + 9} = 5$: signs do not matter." },
        { text: "$(5, 5)$", feedback: "$\\sqrt{50} = 5\\sqrt2$." },
        { text: "$(0, -5)$", correct: true, feedback: "It sits on the y-axis, 5 below the origin." },
        { text: "$(1, 4)$", feedback: "$\\sqrt{17} \\ne 5$." },
      ],
      hint: "Check $x^2 + y^2 = 25$ for each point.",
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "the-section-formula",
  title: "0.2 · The Section Formula",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "Where is the point two-thirds of the way from $A$ to $B$? Where does a rope tied between two pegs cross the x-axis? Where is the fourth corner of a parallelogram? All three questions ask for a point **on a line through two known points**, located by a ratio. The answer is one formula, and it is nothing more than a weighted average.",
    },
    { type: "heading", text: "Internal division" },
    {
      type: "text",
      content:
        "Say $P$ lies on segment $AB$ with $AP : PB = m : n$. Drop perpendiculars from $A$, $P$, $B$ to the x-axis and draw horizontal lines through $A$ and $P$. The two small right triangles (one with hypotenuse $AP$, one with hypotenuse $PB$) are similar, because their hypotenuses lie on the same line. Their horizontal legs are $x - x_1$ and $x_2 - x$, so",
    },
    {
      type: "math",
      latex: "\\frac{x - x_1}{x_2 - x} = \\frac{m}{n} \\quad\\Longrightarrow\\quad n(x - x_1) = m(x_2 - x) \\quad\\Longrightarrow\\quad x = \\frac{mx_2 + nx_1}{m + n}",
    },
    {
      type: "text",
      content: "The same argument with the vertical legs gives $y$. Notice the cross pattern: $m$, the part next to $A$, multiplies the coordinates of $B$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Section formula",
      content:
        "The point dividing $A(x_1, y_1)$ and $B(x_2, y_2)$ in the ratio $m : n$\n\n- **internally** is $\\left(\\dfrac{mx_2 + nx_1}{m + n},\\ \\dfrac{my_2 + ny_1}{m + n}\\right)$\n- **externally** (on the line $AB$ but outside the segment, with $AP : PB = m : n$) is $\\left(\\dfrac{mx_2 - nx_1}{m - n},\\ \\dfrac{my_2 - ny_1}{m - n}\\right)$, $m \\ne n$\n- the **midpoint** ($m = n$) is $\\left(\\dfrac{x_1 + x_2}{2},\\ \\dfrac{y_1 + y_2}{2}\\right)$",
    },
    {
      type: "text",
      content:
        "Read the internal formula as a **weighted average**: $P = \\frac{n}{m + n}A + \\frac{m}{m + n}B$. The weights are positive and add to 1, so $P$ sits between $A$ and $B$, pulled towards the endpoint with the larger weight. External division is the same formula with $n$ replaced by $-n$: one weight goes negative, which pushes $P$ outside the segment.",
    },
    {
      type: "interactive",
      config: {
        component: "slc-line-explorer",
        mode: "section",
        a: [-2, -1],
        b: [1, 1],
        m: { min: 1, max: 6, step: 1, initial: 2 },
        n: { min: 1, max: 6, step: 1, initial: 1 },
        show: ["external"],
        caption:
          "$P$ divides $AB$ internally and $Q$ externally in the ratio $m : n$. Raise $m$: $P$ slides towards $B$ and $Q$ moves in from far away. Set $m = n$: $P$ is the midpoint and $Q$ disappears, because no point outside the segment is equally far from both ends.",
      },
    },
    { type: "heading", text: "Worked examples" },
    {
      type: "worked-example",
      id: "slc0-2-we1",
      title: "Worked example 1: internal division",
      problem: "Find the point dividing $A(1, -2)$ and $B(7, 4)$ internally in the ratio $2 : 1$.",
      steps: [
        { text: "Here $m = 2$ goes with $B$ and $n = 1$ goes with $A$. *Why this step:* the cross pattern is the commonest place to slip, so name which number multiplies which point before substituting." },
        { latex: "x = \\frac{2 \\cdot 7 + 1 \\cdot 1}{3} = 5, \\qquad y = \\frac{2 \\cdot 4 + 1 \\cdot (-2)}{3} = 2" },
        { text: "Check: $P$ should be two-thirds of the way from $A$ to $B$. Indeed $1 + \\frac23 \\cdot 6 = 5$ and $-2 + \\frac23 \\cdot 6 = 2$." },
      ],
      answer: "$(5, 2)$.",
    },
    {
      type: "worked-example",
      id: "slc0-2-we2",
      title: "Worked example 2: external division",
      problem: "Find the point dividing $A(2, 1)$ and $B(5, 4)$ externally in the ratio $3 : 2$.",
      steps: [
        { latex: "x = \\frac{3 \\cdot 5 - 2 \\cdot 2}{3 - 2} = 11, \\qquad y = \\frac{3 \\cdot 4 - 2 \\cdot 1}{3 - 2} = 10" },
        { text: "Sanity check: since $m > n$, $Q$ is farther from $A$ than from $B$, so it lies beyond $B$. Indeed $AQ = \\sqrt{81 + 81} = 9\\sqrt2$ and $QB = \\sqrt{36 + 36} = 6\\sqrt2$, in the ratio $3 : 2$. *Why this step:* the picture tells you which side of the segment to expect, which catches sign errors." },
      ],
      answer: "$(11, 10)$.",
    },
    {
      type: "text",
      content:
        "**The $k : 1$ method.** When the ratio is the unknown, call it $k : 1$. Then $P = \\left(\\frac{kx_2 + x_1}{k + 1}, \\frac{ky_2 + y_1}{k + 1}\\right)$ and one condition on $P$ gives one equation in $k$. If $k$ comes out positive the division is internal; if negative, external in the ratio $\\lvert k\\rvert : 1$.",
    },
    {
      type: "worked-example",
      id: "slc0-2-we3",
      title: "Worked example 3: where an axis cuts a segment",
      problem: "In what ratio does the y-axis divide the segment joining $(-3, 4)$ and $(6, -2)$? Find the point of division.",
      steps: [
        { text: "Let the ratio be $k : 1$. A point on the y-axis has $x = 0$. *Why this step:* the y-axis gives exactly one condition, which is all we need for one unknown." },
        { latex: "\\frac{6k - 3}{k + 1} = 0 \\quad\\Longrightarrow\\quad k = \\frac12" },
        { text: "$k > 0$, so the division is internal in the ratio $1 : 2$. The ordinate is $\\frac{\\frac12(-2) + 4}{\\frac32} = 2$." },
      ],
      answer: "Internally in the ratio $1 : 2$, at $(0, 2)$.",
    },
    {
      type: "worked-example",
      id: "slc0-2-we4",
      title: "Worked example 4: points of trisection",
      problem: "Find the points that trisect the segment from $A(-2, 5)$ to $B(4, -1)$.",
      steps: [
        { text: "The trisection points divide $AB$ in the ratios $1 : 2$ and $2 : 1$." },
        { text: "Ratio $1 : 2$ (nearer $A$): $\\left(\\frac{4 + 2(-2)}{3}, \\frac{-1 + 2 \\cdot 5}{3}\\right) = (0, 3)$." },
        { text: "Ratio $2 : 1$ (nearer $B$): $\\left(\\frac{2 \\cdot 4 - 2}{3}, \\frac{2(-1) + 5}{3}\\right) = (2, 1)$. *Why this step:* the second point is also the midpoint of the first point and $B$, a quick check." },
      ],
      answer: "$(0, 3)$ and $(2, 1)$.",
    },
    {
      type: "worked-example",
      id: "slc0-2-we5",
      title: "Worked example 5: the fourth vertex of a parallelogram",
      problem: "Three consecutive vertices of a parallelogram $ABCD$ are $A(1, 2)$, $B(4, 3)$ and $C(6, 6)$. Find $D$.",
      steps: [
        { text: "The diagonals of a parallelogram bisect each other, so $AC$ and $BD$ have the same midpoint. *Why this step:* this turns a shape fact into a midpoint equation." },
        { latex: "\\frac{A + C}{2} = \\frac{B + D}{2} \\quad\\Longrightarrow\\quad D = A + C - B = (1 + 6 - 4,\\ 2 + 6 - 3)" },
      ],
      answer: "$D(3, 5)$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: swapping m and n",
      content:
        "\"$P$ divides $AB$ in the ratio $2 : 1$\" means $AP$ is twice $PB$, so $P$ is **nearer $B$**. The formula multiplies $B$ by 2: $\\frac{2B + 1A}{3}$. Writing $\\frac{2A + B}{3}$ gives the other trisection point. A ten-second check: the bigger number belongs to the far endpoint.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Harmonic conjugates (for JEE Advanced)",
      content:
        "If $P$ divides $AB$ internally and $Q$ divides it externally **in the same ratio**, then $P$ and $Q$ are called harmonic conjugates with respect to $A$ and $B$. For $A(0, 0)$, $B(3, 0)$ and ratio $2 : 1$: $P = (2, 0)$, $Q = (6, 0)$. This pair reappears with the angle bisectors of a triangle and with poles and polars in Chapter 5.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "slc0-2-q1",
      variant: "practice",
      question: "Find the x-coordinate of the point dividing the join of $(2, 3)$ and $(8, 9)$ internally in the ratio $1 : 2$.",
      answer: 4,
      hint: "$m = 1$ multiplies the second point, $n = 2$ multiplies the first.",
      solution: "$x = \\frac{1 \\cdot 8 + 2 \\cdot 2}{3} = 4$ (and $y = \\frac{9 + 6}{3} = 5$). The point is one-third of the way from $(2, 3)$.",
      commonMistakes: [
        { answer: 6, feedback: "That is the ratio $2 : 1$, the other trisection point. Put $m = 1$ with $(8, 9)$." },
        { answer: 5, feedback: "5 is the midpoint's x-coordinate, which is the ratio $1 : 1$." },
      ],
    },
    {
      type: "quiz",
      id: "slc0-2-q2",
      variant: "practice",
      question: "The point dividing $A(-1, 3)$ and $B(4, -2)$ internally in the ratio $3 : 2$ is",
      options: [
        { text: "$(2, 0)$", correct: true, feedback: "$\\left(\\frac{3 \\cdot 4 + 2(-1)}{5}, \\frac{3(-2) + 2 \\cdot 3}{5}\\right) = (2, 0)$." },
        { text: "$(1, 1)$", feedback: "That uses $\\frac{3A + 2B}{5}$, the ratio $2 : 3$." },
        { text: "$(14, -12)$", feedback: "That is the external point $\\frac{3B - 2A}{1}$." },
        { text: "$(1.5, 0.5)$", feedback: "That is the midpoint, the ratio $1 : 1$." },
      ],
      hint: "Use $\\frac{mB + nA}{m + n}$ with $m = 3$, $n = 2$.",
    },
    {
      type: "numeric",
      id: "slc0-2-q3",
      variant: "practice",
      question:
        "The x-axis divides the segment joining $(2, -3)$ and $(5, 6)$ in the ratio $k : 1$. Find $k$.",
      answer: 0.5,
      hint: "On the x-axis the ordinate is zero: $\\frac{6k - 3}{k + 1} = 0$.",
      solution: "$6k - 3 = 0$ gives $k = \\frac12$: internal division in the ratio $1 : 2$. The meeting point is $(3, 0)$.",
      commonMistakes: [
        { answer: 2, feedback: "That is $n : m$ the wrong way round. With $k$ multiplying $(5, 6)$, $6k - 3 = 0$ gives $k = \\frac12$." },
        { answer: -0.5, feedback: "A sign slip: the ordinates $-3$ and $6$ are on opposite sides of the axis, so the division is internal and $k > 0$." },
      ],
    },
    {
      type: "numeric",
      id: "slc0-2-q4",
      variant: "practice",
      question: "Find the y-coordinate of the point dividing $A(1, 2)$ and $B(4, 5)$ externally in the ratio $2 : 1$.",
      answer: 8,
      hint: "External: $\\frac{my_2 - ny_1}{m - n}$.",
      solution: "$y = \\frac{2 \\cdot 5 - 1 \\cdot 2}{2 - 1} = 8$, and $x = \\frac{8 - 1}{1} = 7$. The point $(7, 8)$ is beyond $B$, twice as far from $A$ as from $B$.",
      commonMistakes: [
        { answer: 4, feedback: "That is the internal point $\\frac{2 \\cdot 5 + 2}{3}$." },
        { answer: -1, feedback: "That is the external point for $1 : 2$, which lies beyond $A$." },
      ],
    },
    {
      type: "quiz",
      id: "slc0-2-q5",
      variant: "concept",
      question: "Which point divides the segment $AB$ externally in the ratio $1 : 1$?",
      options: [
        { text: "No point does", correct: true, feedback: "The formula has $m - n = 0$ in the denominator. Geometrically, outside the segment one end is always nearer than the other." },
        { text: "The midpoint of $AB$", feedback: "The midpoint divides $AB$ internally in $1 : 1$." },
        { text: "The point $A$", feedback: "At $A$, $AP = 0$ while $PB = AB$: the ratio is $0 : 1$." },
        { text: "The reflection of $A$ in $B$", feedback: "That point $Q = 2B - A$ has $AQ : QB = 2 : 1$." },
      ],
      hint: "Look at the denominator of the external section formula.",
    },
    {
      type: "numeric",
      id: "slc0-2-q6",
      variant: "practice",
      question:
        "$A(-2, -1)$, $B(1, 0)$, $C(4, 3)$ are three consecutive vertices of a parallelogram $ABCD$. If $D = (p, q)$, find $p + q$.",
      answer: 3,
      hint: "The diagonals $AC$ and $BD$ share a midpoint, so $D = A + C - B$.",
      solution: "$D = (-2 + 4 - 1,\\ -1 + 3 - 0) = (1, 2)$, so $p + q = 3$.",
      commonMistakes: [
        { answer: 11, feedback: "$B + C - A = (7, 4)$ is the fourth vertex of the parallelogram $ABDC$ (with $A$ opposite $D$), not $ABCD$." },
        { answer: -9, feedback: "$A + B - C$ is the vertex opposite $C$. In $ABCD$, $D$ is opposite $B$." },
      ],
    },
    {
      type: "quiz",
      id: "slc0-2-q7",
      variant: "concept",
      multiple: true,
      question: "$P$ divides $AB$ internally in the ratio $m : n$, with $m, n > 0$. Which statements are true? Select all that apply.",
      options: [
        { text: "$P$ lies between $A$ and $B$", correct: true, feedback: "Both weights $\\frac{n}{m + n}$ and $\\frac{m}{m + n}$ are positive." },
        { text: "If $m > n$, $P$ is nearer to $B$ than to $A$", correct: true, feedback: "$AP = \\frac{m}{m + n}AB$ is more than half of $AB$." },
        { text: "$P = \\dfrac{mA + nB}{m + n}$", feedback: "The weights cross over: $P = \\frac{nA + mB}{m + n}$." },
        { text: "If $m = n$, $P$ is the midpoint", correct: true, feedback: "Equal weights $\\frac12, \\frac12$." },
        { text: "$P$ lies on the extension of $AB$ beyond $B$", feedback: "That is external division." },
      ],
      hint: "Think of $P$ as the weighted average $\\frac{n}{m + n}A + \\frac{m}{m + n}B$.",
    },
    {
      type: "numeric",
      id: "slc0-2-q8",
      variant: "practice",
      question: "Find the x-coordinate of the point of trisection of $A(3, -4)$, $B(9, 8)$ that is nearer to $A$.",
      answer: 5,
      hint: "Nearer to $A$ means $AP : PB = 1 : 2$.",
      solution: "$\\left(\\frac{9 + 2 \\cdot 3}{3}, \\frac{8 + 2(-4)}{3}\\right) = (5, 0)$.",
      commonMistakes: [
        { answer: 7, feedback: "$(7, 4)$ is the trisection point nearer to $B$." },
        { answer: 6, feedback: "6 is the midpoint's x-coordinate." },
      ],
    },
    {
      type: "quiz",
      id: "slc0-2-q9",
      variant: "practice",
      question: "JEE Main. The point $(7, 11)$ divides the join of $A(1, -1)$ and $B(4, 5)$",
      options: [
        { text: "externally in the ratio $2 : 1$", correct: true, feedback: "With ratio $k : 1$, $\\frac{4k + 1}{k + 1} = 7$ gives $k = -2$. The y-coordinate agrees: $\\frac{-10 - 1}{-1} = 11$." },
        { text: "internally in the ratio $2 : 1$", feedback: "The internal point for $2 : 1$ is $(3, 3)$, between $A$ and $B$." },
        { text: "externally in the ratio $1 : 2$", feedback: "That point lies beyond $A$: $\\frac{1 \\cdot 4 - 2 \\cdot 1}{-1} = -2$." },
        { text: "internally in the ratio $1 : 2$", feedback: "$(7, 11)$ is not between $A$ and $B$: its x-coordinate exceeds both 1 and 4." },
      ],
      hint: "Use the $k : 1$ method on the x-coordinate. A negative $k$ means external division.",
    },
    {
      type: "numeric",
      id: "slc0-2-q10",
      variant: "practice",
      question:
        "JEE Main. The points $P$ and $Q$ trisect the segment from $A(2, -2)$ to $B(-7, 4)$. Find the sum of all four coordinates of $P$ and $Q$.",
      answer: -3,
      hint: "$P = \\frac{2A + B}{3}$ and $Q = \\frac{A + 2B}{3}$. Or notice that $P + Q = A + B$.",
      solution: "$P = (-1, 0)$ and $Q = (-4, 2)$, so the sum is $-1 + 0 - 4 + 2 = -3$. Shortcut: $P + Q = A + B = (-5, 2)$.",
      commonMistakes: [
        { answer: -1.5, feedback: "That is the sum of the coordinates of the midpoint only. $P + Q$ equals $A + B$, not half of it." },
        { answer: 3, feedback: "Check the signs: $A + B = (2 - 7, -2 + 4) = (-5, 2)$." },
      ],
    },
    {
      type: "quiz",
      id: "slc0-2-q11",
      variant: "practice",
      multiple: true,
      question: "Which of these points lie on the segment joining $A(0, 0)$ and $B(6, 9)$ (between the endpoints)? Select all that apply.",
      options: [
        { text: "$(2, 3)$", correct: true, feedback: "It divides $AB$ internally in the ratio $1 : 2$." },
        { text: "$(4, 6)$", correct: true, feedback: "Ratio $2 : 1$ internally." },
        { text: "$(8, 12)$", feedback: "It is on the line $AB$, but beyond $B$: external division in the ratio $4 : 1$." },
        { text: "$(3, 4)$", feedback: "The line $AB$ has $y = 1.5x$, and $4 \\ne 4.5$, so this point is not on the line at all." },
        { text: "$(-2, -3)$", feedback: "On the line, but beyond $A$ (external division)." },
      ],
      hint: "A point between $A$ and $B$ is $(6t, 9t)$ for some $t$ in $[0, 1]$.",
    },
    {
      type: "numeric",
      id: "slc0-2-q12",
      variant: "practice",
      question:
        "JEE Advanced. $P$ and $Q$ divide the segment from $A(0, 0)$ to $B(3, 0)$ internally and externally in the same ratio $2 : 1$. Find $PQ$.",
      answer: 4,
      hint: "$P = \\frac{2B + A}{3}$ and $Q = \\frac{2B - A}{1}$.",
      solution: "$P = (2, 0)$ and $Q = (6, 0)$, so $PQ = 4$. ($P$ and $Q$ are harmonic conjugates of $A$ and $B$.)",
      commonMistakes: [
        { answer: 3, feedback: "3 is $AB$. Find $Q$ first: it lies beyond $B$, at $(6, 0)$." },
        { answer: 1, feedback: "That is $PB$. $Q$ is at $(6, 0)$, not at $B$." },
      ],
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "centres-of-a-triangle",
  title: "0.3 · Centres of a Triangle",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "A triangle has not one centre but several, each answering a different question. Where would a cardboard triangle balance? (centroid) Where is the point equally far from the three sides? (incentre) From the three vertices? (circumcentre) Where do the three altitudes meet? (orthocentre) In coordinates, each centre is either a **weighted average of the vertices** or the **meeting point of two lines**, and the section formula of Lesson 0.2 builds them all.",
    },
    {
      type: "text",
      content:
        "Throughout, the triangle is $A(x_1, y_1)$, $B(x_2, y_2)$, $C(x_3, y_3)$ and the side lengths are named after the opposite vertex: $a = BC$, $b = CA$, $c = AB$.",
    },
    { type: "heading", text: "The centroid" },
    {
      type: "text",
      content:
        "A **median** joins a vertex to the midpoint of the opposite side. Let $D = \\frac{B + C}{2}$ be the midpoint of $BC$, and take the point $G$ dividing the median $AD$ in the ratio $2 : 1$:",
    },
    {
      type: "math",
      latex: "G = \\frac{2D + 1 \\cdot A}{3} = \\frac{(B + C) + A}{3} = \\left(\\frac{x_1 + x_2 + x_3}{3},\\ \\frac{y_1 + y_2 + y_3}{3}\\right)",
    },
    {
      type: "text",
      content:
        "The answer is symmetric in $A$, $B$, $C$, so the same point lies two-thirds of the way down **every** median. That is the proof that the three medians are concurrent, and the meeting point is the centroid.",
    },
    { type: "heading", text: "The incentre and the excentres" },
    {
      type: "text",
      content:
        "The internal bisector of angle $A$ meets $BC$ at a point $D$ with $BD : DC = AB : AC = c : b$ (the angle bisector theorem). So $D = \\frac{bB + cC}{b + c}$. The bisector from $B$ cuts $AD$ in the ratio $AI : ID = (b + c) : a$, and the section formula gives a perfectly symmetric result:",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Incentre and excentres",
      content:
        "The **incentre** (meeting point of the internal angle bisectors, centre of the inscribed circle) is\n\n$$I = \\left(\\frac{ax_1 + bx_2 + cx_3}{a + b + c},\\ \\frac{ay_1 + by_2 + cy_3}{a + b + c}\\right).$$\n\nEach vertex is weighted by the length of the **opposite** side. The **excentre opposite $A$** (centre of the circle touching $BC$ and the extensions of $AB$ and $AC$) changes the sign of $a$:\n\n$$I_1 = \\left(\\frac{-ax_1 + bx_2 + cx_3}{-a + b + c},\\ \\frac{-ay_1 + by_2 + cy_3}{-a + b + c}\\right),$$\n\nand similarly $I_2$ (sign of $b$ changed) and $I_3$ (sign of $c$ changed). The inradius is $r = \\frac{\\Delta}{s}$ and the exradius opposite $A$ is $r_1 = \\frac{\\Delta}{s - a}$, where $s$ is the semi-perimeter.",
    },
    {
      type: "interactive",
      config: {
        component: "slc-line-explorer",
        mode: "triangle",
        a: [-4, -3],
        b: [4, -3],
        c: [1, 4],
        show: ["centroid", "medians", "incentre", "incircle"],
        caption:
          "Drag the vertices. The centroid $G$ always sits two-thirds of the way down each median. The incentre $I$ is pulled towards the vertex opposite the **longest** side: stretch $AB$ and watch $I$ move towards $C$, while $G$ ignores side lengths entirely.",
      },
    },
    {
      type: "worked-example",
      id: "slc0-3-we1",
      title: "Worked example 1: centroid",
      problem: "Find the centroid of the triangle with vertices $(1, 4)$, $(-2, 3)$ and $(7, -1)$.",
      steps: [
        { text: "Average the abscissae and the ordinates separately.", latex: "G = \\left(\\frac{1 - 2 + 7}{3},\\ \\frac{4 + 3 - 1}{3}\\right) = (2, 2)" },
      ],
      answer: "$G(2, 2)$.",
    },
    {
      type: "worked-example",
      id: "slc0-3-we2",
      title: "Worked example 2: incentre of a right triangle",
      problem: "Find the incentre and the inradius of the triangle $A(0, 0)$, $B(4, 0)$, $C(0, 3)$.",
      steps: [
        { text: "Sides: $a = BC = 5$, $b = CA = 3$, $c = AB = 4$. *Why this step:* each weight is the side **opposite** its vertex, so name the sides carefully before substituting." },
        { latex: "I = \\left(\\frac{5 \\cdot 0 + 3 \\cdot 4 + 4 \\cdot 0}{12},\\ \\frac{5 \\cdot 0 + 3 \\cdot 0 + 4 \\cdot 3}{12}\\right) = (1, 1)" },
        { text: "Check with $r = \\frac{\\Delta}{s}$: $\\Delta = 6$, $s = 6$, $r = 1$, and $(1, 1)$ is indeed at distance 1 from both axes." },
      ],
      answer: "$I(1, 1)$, $r = 1$.",
    },
    {
      type: "worked-example",
      id: "slc0-3-we3",
      title: "Worked example 3: an excentre",
      problem: "For the same triangle $A(0, 0)$, $B(4, 0)$, $C(0, 3)$, find the excentre opposite $A$.",
      steps: [
        { text: "Change the sign of $a = 5$: the denominator is $-5 + 3 + 4 = 2$." },
        { latex: "I_1 = \\left(\\frac{-5 \\cdot 0 + 3 \\cdot 4 + 4 \\cdot 0}{2},\\ \\frac{-5 \\cdot 0 + 3 \\cdot 0 + 4 \\cdot 3}{2}\\right) = (6, 6)" },
        { text: "Check: $r_1 = \\frac{\\Delta}{s - a} = \\frac{6}{1} = 6$. The point $(6, 6)$ is 6 from both axes, and its distance from $BC$ (the line $3x + 4y = 12$) is $\\frac{\\lvert 18 + 24 - 12\\rvert}{5} = 6$. *Why this step:* an excentre is equidistant from all three side-lines, which is an easy independent check." },
      ],
      answer: "$I_1(6, 6)$, exradius 6.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the incentre is the average of the vertices\"",
      content:
        "The plain average is the centroid. The incentre weights each vertex by the opposite side, so it agrees with the centroid only when $a = b = c$. In the 3-4-5 triangle above, $G = \\left(\\frac43, 1\\right)$ but $I = (1, 1)$.",
    },
    { type: "heading", text: "The circumcentre and the orthocentre" },
    {
      type: "text",
      content:
        "These two are intersections, not averages.\n\n- The **circumcentre** $O$ is equidistant from the three vertices, so it solves $OA^2 = OB^2$ and $OA^2 = OC^2$: two linear equations (the $x^2 + y^2$ terms cancel, exactly as in Lesson 0.1).\n- The **orthocentre** $H$ is where the altitudes meet. An altitude passes through a vertex perpendicular to the opposite side. We use the fact that perpendicular lines have slopes multiplying to $-1$ (proved in Lesson 1.2).",
    },
    {
      type: "worked-example",
      id: "slc0-3-we4",
      title: "Worked example 4: circumcentre",
      problem: "Find the circumcentre and circumradius of $A(0, 0)$, $B(6, 0)$, $C(2, 4)$.",
      steps: [
        { text: "$OA = OB$ puts $O$ on the perpendicular bisector of $AB$, which is $x = 3$. *Why this step:* when a side is horizontal, its perpendicular bisector is a vertical line you can read off at once." },
        { text: "$OA^2 = OC^2$ with $O(3, y)$:", latex: "9 + y^2 = (3 - 2)^2 + (y - 4)^2 = 1 + y^2 - 8y + 16 \\quad\\Longrightarrow\\quad y = 1" },
        { text: "$R = OA = \\sqrt{9 + 1} = \\sqrt{10}$." },
      ],
      answer: "$O(3, 1)$, $R = \\sqrt{10}$.",
    },
    {
      type: "worked-example",
      id: "slc0-3-we5",
      title: "Worked example 5: orthocentre",
      problem: "Find the orthocentre of the same triangle $A(0, 0)$, $B(6, 0)$, $C(2, 4)$.",
      steps: [
        { text: "$AB$ is horizontal, so the altitude from $C$ is vertical: $x = 2$." },
        { text: "Slope of $BC$ is $\\frac{4 - 0}{2 - 6} = -1$, so the altitude from $A$ has slope $1$: $y = x$. *Why this step:* two altitudes are enough, since all three are concurrent." },
        { text: "Intersect: $H = (2, 2)$." },
      ],
      answer: "$H(2, 2)$.",
    },
    { type: "heading", text: "The Euler line" },
    {
      type: "text",
      content:
        "For the triangle in the last two examples, $G = \\left(\\frac83, \\frac43\\right)$, $O = (3, 1)$ and $H = (2, 2)$. Check: $\\frac{2O + H}{3} = \\left(\\frac{8}{3}, \\frac{4}{3}\\right) = G$. This is no accident.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Euler line",
      content:
        "In every triangle the circumcentre $O$, centroid $G$ and orthocentre $H$ are collinear, and $G$ divides $OH$ internally in the ratio $1 : 2$:\n\n$$G = \\frac{2O + H}{3}, \\qquad H = 3G - 2O.$$\n\nSo knowing any two of $O$, $G$, $H$ gives the third. Special cases: in a **right triangle**, $H$ is the right-angle vertex and $O$ is the midpoint of the hypotenuse. In an **equilateral** triangle all the centres coincide. In an **isosceles** triangle all of them lie on the axis of symmetry.",
    },
    {
      type: "interactive",
      config: {
        component: "slc-line-explorer",
        mode: "triangle",
        a: [-4, -2],
        b: [4, -2],
        c: [-1, 3],
        show: ["centroid", "circumcentre", "orthocentre", "euler-line", "circumcircle"],
        caption:
          "Drag $C$ and watch $O$, $G$, $H$ stay on one line with $GH = 2\\,OG$. Make the angle at $C$ a right angle: $H$ jumps onto $C$ and $O$ onto the midpoint of $AB$. Make the triangle obtuse: $O$ and $H$ both leave the triangle.",
      },
    },
    {
      type: "interactive",
      config: {
        component: "slc-line-explorer",
        mode: "triangle",
        a: [-1, -1],
        b: [1.5, -1],
        c: [0, 1.5],
        show: ["incentre", "incircle", "excentres"],
        window: { xmin: -8, xmax: 8, ymin: -7, ymax: 7 },
        caption:
          "The incentre and the three excentres. Each excentre sits on one internal bisector and two external bisectors, outside the triangle. Flatten the triangle and watch the excentre opposite the obtuse angle race away.",
      },
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "slc0-3-q1",
      variant: "practice",
      question: "Find the x-coordinate of the centroid of the triangle with vertices $(3, -5)$, $(-7, 4)$ and $(10, -2)$.",
      answer: 2,
      hint: "Average the three abscissae.",
      solution: "$\\frac{3 - 7 + 10}{3} = 2$, and the ordinate is $\\frac{-5 + 4 - 2}{3} = -1$.",
      commonMistakes: [
        { answer: 6, feedback: "That is the sum. Divide by 3." },
        { answer: -1, feedback: "$-1$ is the y-coordinate." },
      ],
    },
    {
      type: "numeric",
      id: "slc0-3-q2",
      variant: "practice",
      question:
        "Two vertices of a triangle are $(1, 2)$ and $(3, 5)$, and its centroid is $(2, 2)$. Find the y-coordinate of the third vertex.",
      answer: -1,
      hint: "The three ordinates add up to $3 \\times 2 = 6$.",
      solution: "$y = 3 \\cdot 2 - 2 - 5 = -1$ (and $x = 6 - 1 - 3 = 2$), so the third vertex is $(2, -1)$.",
      commonMistakes: [
        { answer: -5, feedback: "The three ordinates sum to $3 \\times 2$, not to 2." },
        { answer: 1.5, feedback: "Averaging the two known ordinates does not give the third vertex. Use $y_1 + y_2 + y_3 = 3\\bar y$." },
      ],
    },
    {
      type: "quiz",
      id: "slc0-3-q3",
      variant: "concept",
      question: "With $a = BC$, $b = CA$, $c = AB$, the incentre of triangle $ABC$ is",
      options: [
        { text: "$\\dfrac{aA + bB + cC}{a + b + c}$", correct: true, feedback: "Each vertex is weighted by the side opposite it." },
        { text: "$\\dfrac{bA + cB + aC}{a + b + c}$", feedback: "The weights must be the opposite sides: $a$ with $A$, $b$ with $B$, $c$ with $C$." },
        { text: "$\\dfrac{A + B + C}{3}$", feedback: "That is the centroid." },
        { text: "$\\dfrac{A + B + C}{a + b + c}$", feedback: "This is not even a weighted average: the weights do not add to 1." },
      ],
      hint: "The bisector from $A$ meets $BC$ in the ratio $c : b$. Which vertex gets which weight?",
    },
    {
      type: "numeric",
      id: "slc0-3-q4",
      variant: "practice",
      question: "Find the x-coordinate of the incentre of the triangle $(0, 0)$, $(12, 0)$, $(0, 5)$.",
      answer: 2,
      hint: "Sides: the hypotenuse is 13. Weight each vertex by the side opposite it.",
      solution: "With $A(0, 0)$, $B(12, 0)$, $C(0, 5)$: $a = 13$, $b = 5$, $c = 12$. $x = \\frac{13 \\cdot 0 + 5 \\cdot 12 + 12 \\cdot 0}{30} = 2$. Indeed $r = \\frac{\\Delta}{s} = \\frac{30}{15} = 2$ and $I = (2, 2)$.",
      commonMistakes: [
        { answer: 4, feedback: "4 is the centroid's abscissa. The incentre weights vertices by the opposite sides." },
        { answer: 4.8, feedback: "That weights $B$ by its adjacent side 12 instead of the opposite side 5." },
      ],
    },
    {
      type: "quiz",
      id: "slc0-3-q5",
      variant: "practice",
      question: "The circumcentre of the triangle with vertices $(0, 0)$, $(8, 0)$, $(0, 6)$ is",
      options: [
        { text: "$(4, 3)$", correct: true, feedback: "The right angle is at the origin, so the circumcentre is the midpoint of the hypotenuse." },
        { text: "$(0, 0)$", feedback: "That is the orthocentre (the right-angle vertex)." },
        { text: "$\\left(\\frac83, 2\\right)$", feedback: "That is the centroid." },
        { text: "$(2, 2)$", feedback: "That is the incentre: $a = 10$, $b = 6$, $c = 8$ give $\\frac{(48, 48)}{24}$." },
      ],
      hint: "The angle at the origin is a right angle. An angle in a semicircle is a right angle.",
    },
    {
      type: "quiz",
      id: "slc0-3-q6",
      variant: "concept",
      multiple: true,
      question: "Triangle $ABC$ has a right angle at $A$. Which statements are true? Select all that apply.",
      options: [
        { text: "The orthocentre is $A$", correct: true, feedback: "The two legs are themselves altitudes, and they meet at $A$." },
        { text: "The circumcentre is the midpoint of $BC$", correct: true, feedback: "The hypotenuse is a diameter of the circumcircle." },
        { text: "The circumradius is $\\frac12 BC$", correct: true, feedback: "Half the diameter." },
        { text: "The centroid is $A$", feedback: "The centroid is always strictly inside the triangle." },
        { text: "The incentre lies on $BC$", feedback: "The incentre is always strictly inside the triangle." },
      ],
      hint: "Which two sides of a right triangle are already altitudes?",
    },
    {
      type: "numeric",
      id: "slc0-3-q7",
      variant: "practice",
      question:
        "Find the square of the circumradius of the triangle $A(0, 0)$, $B(8, 0)$, $C(2, 6)$.",
      answer: 20,
      hint: "The circumcentre lies on $x = 4$. Then use $OA^2 = OC^2$.",
      solution: "$O(4, y)$: $16 + y^2 = 4 + (y - 6)^2$ gives $16 = 40 - 12y$, $y = 2$. So $O = (4, 2)$ and $R^2 = 16 + 4 = 20$.",
      commonMistakes: [
        { answer: 4.47, tolerance: 0.01, feedback: "That is $R = \\sqrt{20}$. The question asks for $R^2$." },
        { answer: 16, feedback: "You need $OA^2 = 4^2 + 2^2$; the centre is not on the x-axis." },
      ],
    },
    {
      type: "numeric",
      id: "slc0-3-q8",
      variant: "practice",
      question:
        "The orthocentre of the triangle $A(0, 0)$, $B(8, 0)$, $C(2, 6)$ is $(p, q)$. Find $p + q$.",
      answer: 4,
      hint: "The altitude from $C$ is vertical. The altitude from $A$ is perpendicular to $BC$, whose slope is $-1$.",
      solution: "Altitude from $C$: $x = 2$. Altitude from $A$: $y = x$. So $H = (2, 2)$ and $p + q = 4$. Check with Euler: $G = \\left(\\frac{10}{3}, 2\\right)$, $O = (4, 2)$, $3G - 2O = (2, 2)$.",
      commonMistakes: [
        { answer: 6, feedback: "$(4, 2)$ is the circumcentre, not the orthocentre." },
        { answer: 5.33, tolerance: 0.01, feedback: "That is the centroid $\\left(\\frac{10}{3}, 2\\right)$." },
      ],
    },
    {
      type: "quiz",
      id: "slc0-3-q9",
      variant: "practice",
      question:
        "JEE Main. A triangle has circumcentre $(1, 2)$ and centroid $(3, 4)$. Its orthocentre is",
      options: [
        { text: "$(7, 8)$", correct: true, feedback: "$H = 3G - 2O = (9 - 2, 12 - 4)$." },
        { text: "$(5, 6)$", feedback: "That is $2G - O$, the reflection of $O$ in $G$. But $GH = 2\\,OG$, not $OG$." },
        { text: "$(2, 3)$", feedback: "That is the midpoint of $O$ and $G$." },
        { text: "$(-3, -2)$", feedback: "That is $3O - 2G$: the roles of $O$ and $H$ are swapped." },
      ],
      hint: "$G$ divides $OH$ in the ratio $1 : 2$, so $G = \\frac{2O + H}{3}$.",
    },
    {
      type: "numeric",
      id: "slc0-3-q10",
      variant: "practice",
      question:
        "Find the x-coordinate of the excentre opposite $A$ for the triangle $A(0, 0)$, $B(6, 0)$, $C(0, 8)$.",
      answer: 12,
      hint: "Sides $a = 10$, $b = 8$, $c = 6$. Change the sign of $a$.",
      solution: "$I_1 = \\frac{-10(0, 0) + 8(6, 0) + 6(0, 8)}{-10 + 8 + 6} = \\frac{(48, 48)}{4} = (12, 12)$. Check: $r_1 = \\frac{\\Delta}{s - a} = \\frac{24}{2} = 12$.",
      commonMistakes: [
        { answer: 2, feedback: "$(2, 2)$ is the incentre. For the excentre opposite $A$, the weight of $A$ becomes $-a$." },
        { answer: 3, feedback: "With $-a$ in the numerator, the denominator must be $-a + b + c = 4$ too." },
      ],
    },
    {
      type: "quiz",
      id: "slc0-3-q11",
      variant: "concept",
      question: "In which kind of triangle does the incentre always coincide with the centroid?",
      options: [
        { text: "Equilateral", correct: true, feedback: "With $a = b = c$ the incentre weights are equal, so $I = G$. (Conversely, $I = G$ forces equal sides.)" },
        { text: "Isosceles", feedback: "Both lie on the axis of symmetry, but at different heights in general. Try $(-1, 0)$, $(1, 0)$, $(0, 5)$." },
        { text: "Right-angled", feedback: "In the 3-4-5 triangle $G = \\left(\\frac43, 1\\right)$ but $I = (1, 1)$." },
        { text: "Every triangle", feedback: "Only when the weights $a$, $b$, $c$ are equal." },
      ],
      hint: "When are the weights $a$, $b$, $c$ in the incentre formula all equal?",
    },
    {
      type: "quiz",
      id: "slc0-3-q12",
      variant: "practice",
      multiple: true,
      question:
        "JEE Advanced. For a non-equilateral triangle with circumcentre $O$, centroid $G$, orthocentre $H$ and incentre $I$, which statements are always true? Select all that apply.",
      options: [
        { text: "$O$, $G$, $H$ are collinear", correct: true, feedback: "They lie on the Euler line." },
        { text: "$OG : GH = 1 : 2$", correct: true, feedback: "$G = \\frac{2O + H}{3}$." },
        { text: "$I$ lies on the line $OH$", feedback: "In general it does not. In the 3-4-5 triangle with right angle at the origin, $O$ and $H$ lie on $y = \\frac34 x$, but $I = (1, 1)$ does not." },
        { text: "$H = 3G - 2O$", correct: true, feedback: "Rearranged from $3G = 2O + H$." },
        { text: "$G$ is the midpoint of $OH$", feedback: "$G$ divides $OH$ in the ratio $1 : 2$, not $1 : 1$." },
      ],
      hint: "Recall the Euler line: which centres lie on it, and in what ratio?",
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "area-and-collinearity",
  title: "0.4 · Area and Collinearity",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "Given three vertices, the area of a triangle could be found with Heron's formula: three square roots and a fourth. Coordinates offer something far cleaner, a formula with **no square roots at all**. It also answers a second question for free: three points are collinear exactly when the \"triangle\" they form has zero area.",
    },
    { type: "heading", text: "Area from trapezia" },
    {
      type: "text",
      content:
        "Drop perpendiculars from $A(x_1, y_1)$, $B(x_2, y_2)$, $C(x_3, y_3)$ to the x-axis. Each side of the triangle, together with its two perpendiculars and the axis, bounds a trapezium. The trapezium under side $PQ$ has area $\\frac12(y_P + y_Q)(x_Q - x_P)$, positive when we move rightwards along the axis. Going round the triangle, the trapezia under the two \"upper\" sides minus the one under the \"lower\" side leave exactly the triangle. Adding the three signed trapezia and simplifying gives",
    },
    {
      type: "math",
      latex: "\\Delta = \\frac12\\left\\lvert x_1(y_2 - y_3) + x_2(y_3 - y_1) + x_3(y_1 - y_2)\\right\\rvert = \\frac12\\left\\lvert \\begin{vmatrix} x_1 & y_1 & 1 \\\\ x_2 & y_2 & 1 \\\\ x_3 & y_3 & 1 \\end{vmatrix} \\right\\rvert",
    },
    {
      type: "text",
      content:
        "Without the modulus the expression is a **signed area**: positive when $A \\to B \\to C$ runs counter-clockwise, negative when it runs clockwise. The absolute value gives the area.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Area and collinearity",
      content:
        "- **Triangle:** $\\Delta = \\frac12\\lvert x_1(y_2 - y_3) + x_2(y_3 - y_1) + x_3(y_1 - y_2)\\rvert$.\n- **Polygon** with vertices $(x_1, y_1), \\dots, (x_n, y_n)$ taken **in order** round the boundary (shoelace formula): $\\text{Area} = \\frac12\\left\\lvert \\sum_{i=1}^{n} (x_iy_{i+1} - x_{i+1}y_i)\\right\\rvert$, with $(x_{n+1}, y_{n+1}) = (x_1, y_1)$.\n- **Collinearity:** $A$, $B$, $C$ are collinear $\\iff$ $x_1(y_2 - y_3) + x_2(y_3 - y_1) + x_3(y_1 - y_2) = 0$.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "A shortcut: shift one vertex to the origin",
      content:
        "Area does not change when the whole figure slides. Subtract $A$ from every vertex: the triangle becomes $(0, 0)$, $(p, q)$, $(r, s)$ with $p = x_2 - x_1$, $q = y_2 - y_1$ and so on, and its area is simply $\\frac12\\lvert ps - qr\\rvert$. This is often the fastest hand computation.",
    },
    {
      type: "interactive",
      config: {
        component: "slc-line-explorer",
        mode: "triangle",
        a: [-4, -2],
        b: [2, 1],
        c: [0, 4],
        show: ["centroid", "medians"],
        caption:
          "Watch the area readout as you drag $C$ towards the line $AB$: it shrinks to zero exactly when the three points line up. The medians cut the triangle into six small triangles of equal area, so $G$ splits it into three equal thirds $GBC$, $GCA$, $GAB$.",
      },
    },
    { type: "heading", text: "Worked examples" },
    {
      type: "worked-example",
      id: "slc0-4-we1",
      title: "Worked example 1: area of a triangle",
      problem: "Find the area of the triangle with vertices $A(1, 2)$, $B(4, 6)$, $C(7, 3)$.",
      steps: [
        { latex: "\\frac12\\left\\lvert 1(6 - 3) + 4(3 - 2) + 7(2 - 6)\\right\\rvert = \\frac12\\lvert 3 + 4 - 28\\rvert = \\frac{21}{2}" },
        { text: "The value inside the modulus is negative, so $A \\to B \\to C$ runs clockwise. *Why this step:* the sign carries orientation, which matters later when we compare sides of a line. For area, drop it." },
      ],
      answer: "Area $= \\frac{21}{2}$ square units.",
    },
    {
      type: "worked-example",
      id: "slc0-4-we2",
      title: "Worked example 2: area of a quadrilateral",
      problem: "Find the area of the quadrilateral with vertices $(1, 1)$, $(5, 2)$, $(6, 5)$, $(2, 6)$, taken in order.",
      steps: [
        { text: "Shoelace terms $x_iy_{i+1} - x_{i+1}y_i$ round the boundary. *Why this step:* each term is twice the signed area of the triangle formed by the origin and one side, and the pieces add up to the polygon.",
          table: {
            headers: ["Side", "$x_iy_{i+1} - x_{i+1}y_i$"],
            rows: [
              ["$(1, 1) \\to (5, 2)$", "$2 - 5 = -3$"],
              ["$(5, 2) \\to (6, 5)$", "$25 - 12 = 13$"],
              ["$(6, 5) \\to (2, 6)$", "$36 - 10 = 26$"],
              ["$(2, 6) \\to (1, 1)$", "$2 - 6 = -4$"],
            ],
          },
        },
        { text: "The sum is $32$, so the area is $\\frac12 \\cdot 32$." },
      ],
      answer: "Area $= 16$ square units.",
    },
    {
      type: "worked-example",
      id: "slc0-4-we3",
      title: "Worked example 3: a collinearity condition",
      problem: "Find $k$ if $(1, -1)$, $(k, 3)$ and $(4, 5)$ are collinear.",
      steps: [
        { latex: "1(3 - 5) + k(5 - (-1)) + 4(-1 - 3) = -2 + 6k - 16 = 0" },
        { text: "So $k = 3$. Check with slopes: from $(1, -1)$ to $(4, 5)$ the slope is 2, and from $(1, -1)$ to $(3, 3)$ it is also 2." },
      ],
      answer: "$k = 3$.",
    },
    {
      type: "worked-example",
      id: "slc0-4-we4",
      title: "Worked example 4: an unknown vertex from the area",
      problem: "Find $k$ if the triangle with vertices $(k, 0)$, $(4, 0)$, $(0, 2)$ has area 4.",
      steps: [
        { latex: "\\frac12\\left\\lvert k(0 - 2) + 4(2 - 0) + 0\\right\\rvert = \\frac12\\lvert 8 - 2k\\rvert = 4" },
        { text: "$\\lvert 8 - 2k\\rvert = 8$, so $8 - 2k = 8$ or $8 - 2k = -8$. *Why this step:* the modulus hides two orientations, clockwise and counter-clockwise, and each gives a valid triangle." },
      ],
      answer: "$k = 0$ or $k = 8$ (base from $(0, 0)$ or from $(8, 0)$ to $(4, 0)$, height 2).",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: vertices in any order",
      content:
        "For a triangle the order of the vertices only changes the sign. For a polygon with four or more vertices the order is essential: the shoelace formula follows the boundary, and a crossed order traces a bow-tie whose two halves cancel. The square $(0, 0)$, $(4, 0)$, $(4, 4)$, $(0, 4)$ has area 16, but in the order $(0, 0)$, $(4, 0)$, $(0, 4)$, $(4, 4)$ the formula returns 0. Sketch first and list the vertices going round.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Area ratios you can use without computing",
      content:
        "- A median splits a triangle into two equal areas (equal bases, same height).\n- The centroid splits it into three equal areas: $[GBC] = [GCA] = [GAB] = \\frac13[ABC]$.\n- The triangle formed by the midpoints of the sides has area $\\frac14[ABC]$.\n- If $P$ divides $BC$ in the ratio $m : n$, then $[ABP] : [APC] = m : n$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "slc0-4-q1",
      variant: "practice",
      question: "Find the area of the triangle with vertices $(2, 3)$, $(-1, 0)$ and $(2, -4)$.",
      answer: 10.5,
      hint: "Use $\\frac12\\lvert x_1(y_2 - y_3) + x_2(y_3 - y_1) + x_3(y_1 - y_2)\\rvert$.",
      solution: "$\\frac12\\lvert 2(0 + 4) + (-1)(-4 - 3) + 2(3 - 0)\\rvert = \\frac12\\lvert 8 + 7 + 6\\rvert = \\frac{21}{2}$. (Or: base from $(2, 3)$ to $(2, -4)$ is 7, height from $x = -1$ to $x = 2$ is 3.)",
      commonMistakes: [
        { answer: 21, feedback: "Don't forget the factor $\\frac12$." },
        { answer: 3.5, feedback: "Check the sign of the middle term: $(-1)(-4 - 3) = +7$." },
      ],
    },
    {
      type: "numeric",
      id: "slc0-4-q2",
      variant: "practice",
      question: "Find $k$ if $(2, -3)$, $(k, 0)$ and $(6, 3)$ are collinear.",
      answer: 4,
      hint: "Set the area expression equal to zero.",
      solution: "$2(0 - 3) + k(3 + 3) + 6(-3 - 0) = 6k - 24 = 0$, so $k = 4$. (The point $(4, 0)$ is the midpoint of the other two.)",
      commonMistakes: [
        { answer: -4, feedback: "Sign slip: $-6 + 6k - 18 = 0$ gives $k = +4$." },
        { answer: 2, feedback: "Substitute back: $(2, 0)$ makes the area $\\frac12\\lvert -6 + 12 - 18\\rvert = 6 \\ne 0$." },
      ],
    },
    {
      type: "numeric",
      id: "slc0-4-q3",
      variant: "practice",
      question:
        "Find the area of the quadrilateral with vertices $(-4, -2)$, $(-3, -5)$, $(3, -2)$, $(2, 3)$, taken in order.",
      answer: 28,
      hint: "Shoelace: add $x_iy_{i+1} - x_{i+1}y_i$ round the boundary, then halve.",
      solution: "Terms: $20 - 6 = 14$, $6 + 15 = 21$, $9 + 4 = 13$, $-4 + 12 = 8$. Sum $56$, area $28$.",
      commonMistakes: [
        { answer: 56, feedback: "Halve the shoelace sum." },
        { answer: 14, feedback: "That is the first term only. Add all four sides' terms." },
      ],
    },
    {
      type: "quiz",
      id: "slc0-4-q4",
      variant: "concept",
      question: "The expression $x_1(y_2 - y_3) + x_2(y_3 - y_1) + x_3(y_1 - y_2)$ equals zero. What does this say about $A$, $B$, $C$?",
      options: [
        { text: "They are collinear", correct: true, feedback: "Zero area means the triangle has collapsed onto a line." },
        { text: "Angle $B$ is a right angle", feedback: "A right angle shows up through Pythagoras or perpendicular slopes, not through zero area." },
        { text: "The triangle is equilateral", feedback: "An equilateral triangle has positive area." },
        { text: "One of the points is the origin", feedback: "Collinear points need not include the origin, and a triangle with a vertex at the origin can have any area." },
      ],
      hint: "The expression is twice the signed area.",
    },
    {
      type: "quiz",
      id: "slc0-4-q5",
      variant: "practice",
      multiple: true,
      question: "Which triples of points are collinear? Select all that apply.",
      options: [
        { text: "$(1, 2)$, $(3, 6)$, $(5, 10)$", correct: true, feedback: "All lie on $y = 2x$." },
        { text: "$(0, 0)$, $(1, 1)$, $(2, 3)$", feedback: "Slope 1 then slope 2: they bend." },
        { text: "$(-1, 3)$, $(1, 1)$, $(3, -1)$", correct: true, feedback: "All lie on $x + y = 2$." },
        { text: "$(2, 5)$, $(4, 9)$, $(6, 12)$", feedback: "Slope 2 then slope $\\frac32$." },
        { text: "$(a, b + c)$, $(b, c + a)$, $(c, a + b)$", correct: true, feedback: "Each satisfies $x + y = a + b + c$." },
      ],
      hint: "Compare slopes, or look for one linear equation that all three points satisfy.",
    },
    {
      type: "numeric",
      id: "slc0-4-q6",
      variant: "practice",
      question:
        "Triangle $ABC$ has vertices $(0, 0)$, $(8, 0)$, $(2, 6)$. Find the area of the triangle formed by the midpoints of its sides.",
      answer: 6,
      hint: "The midpoint triangle has a quarter of the area.",
      solution: "$[ABC] = \\frac12 \\cdot 8 \\cdot 6 = 24$, so the midpoint triangle has area 6. Direct check: midpoints $(4, 0)$, $(5, 3)$, $(1, 3)$ give $\\frac12\\lvert 4(0) + 5(3) + 1(-3)\\rvert = 6$.",
      commonMistakes: [
        { answer: 12, feedback: "The midpoint triangle has half the side lengths, so a quarter (not half) of the area." },
        { answer: 24, feedback: "24 is the area of $ABC$ itself." },
      ],
    },
    {
      type: "quiz",
      id: "slc0-4-q7",
      variant: "concept",
      question: "For which real $k$ does the triangle with vertices $(0, 0)$, $(4, 0)$, $(k, 5)$ have area 10?",
      options: [
        { text: "Every real $k$", correct: true, feedback: "The base on the x-axis is 4 and the height is always 5, whatever $k$ is: area $\\frac12 \\cdot 4 \\cdot 5 = 10$." },
        { text: "Only $k = 2$", feedback: "Sliding the apex parallel to the base keeps the height, so the area does not change." },
        { text: "Only $k = 0$ or $k = 4$", feedback: "These make a right triangle, but the area is the same for every $k$." },
        { text: "No real $k$", feedback: "$k = 0$ already gives a right triangle with legs 4 and 5, area 10." },
      ],
      hint: "Base on the x-axis, apex on the line $y = 5$. What is the height?",
    },
    {
      type: "numeric",
      id: "slc0-4-q8",
      variant: "practice",
      question:
        "The triangle with vertices $(2, 3)$, $(5, k)$, $(-1, 1)$ has area 6. Find the sum of all possible values of $k$.",
      answer: 10,
      hint: "Set $\\frac12\\lvert\\cdots\\rvert = 6$ and remember the modulus gives two cases.",
      solution: "$\\frac12\\lvert 2(k - 1) + 5(1 - 3) + (-1)(3 - k)\\rvert = \\frac12\\lvert 3k - 15\\rvert = 6$, so $3k - 15 = \\pm 12$: $k = 9$ or $k = 1$. Sum 10.",
      commonMistakes: [
        { answer: 9, feedback: "That is one value. The other orientation gives $k = 1$." },
        { answer: 5, feedback: "$k = 5$ makes the area zero (the points are collinear)." },
      ],
    },
    {
      type: "quiz",
      id: "slc0-4-q9",
      variant: "practice",
      question: "$G$ is the centroid of triangle $ABC$, whose area is 30. The area of triangle $GBC$ is",
      options: [
        { text: "$10$", correct: true, feedback: "$G$ is at one-third of the height of $A$ above $BC$, on the same base." },
        { text: "$15$", feedback: "That is the area cut off by a median, $[ABD]$, not by the centroid." },
        { text: "$20$", feedback: "That is $[GAB] + [GCA]$, the rest of the triangle." },
        { text: "$7.5$", feedback: "That would be a quarter, the midpoint triangle's share." },
      ],
      hint: "$G$ divides the median from $A$ in the ratio $2 : 1$, so its distance from $BC$ is one-third of $A$'s.",
    },
    {
      type: "numeric",
      id: "slc0-4-q10",
      variant: "practice",
      question: "Find the area of the pentagon with vertices $(0, 0)$, $(4, 0)$, $(6, 3)$, $(3, 6)$, $(0, 4)$, taken in order.",
      answer: 25.5,
      hint: "Five shoelace terms, then halve.",
      solution: "Terms: $0$, $12 - 0 = 12$, $36 - 9 = 27$, $12 - 0 = 12$, $0$. Sum $51$, area $\\frac{51}{2}$.",
      commonMistakes: [
        { answer: 51, feedback: "Halve the shoelace sum." },
        { answer: 36, feedback: "36 is the bounding $6 \\times 6$ square. The pentagon cuts off three corners." },
      ],
    },
    {
      type: "quiz",
      id: "slc0-4-q11",
      variant: "practice",
      multiple: true,
      question:
        "JEE Main. Consider the triangle with vertices $(t, t - 2)$, $(t + 2, t + 2)$, $(t + 3, t)$ for real $t$. Which statements are true? Select all that apply.",
      options: [
        { text: "Its area is 4 for every $t$", correct: true, feedback: "Subtract $(t, t)$ from every vertex: $(0, -2)$, $(2, 2)$, $(3, 0)$, with area $\\frac12\\lvert 0 + 2(0 + 2) + 3(-2 - 2)\\rvert = 4$." },
        { text: "Its area depends on $t$", feedback: "Changing $t$ only slides the triangle along the direction $(1, 1)$." },
        { text: "The three points are collinear for some $t$", feedback: "The area is always 4, never 0." },
        { text: "Translating a triangle never changes its area", correct: true, feedback: "That is exactly why $t$ drops out." },
      ],
      hint: "Every vertex has the form $(t, t) + (\\text{constant vector})$.",
    },
    {
      type: "quiz",
      id: "slc0-4-q12",
      variant: "concept",
      question:
        "A student applies the shoelace formula to the square $A(0, 0)$, $B(4, 0)$, $C(0, 4)$, $D(4, 4)$ in the order $A, B, C, D$. What does she get?",
      options: [
        { text: "0, because that order traces a self-crossing bow-tie", correct: true, feedback: "Terms $0 + 16 - 16 + 0 = 0$. The two halves of the bow-tie have opposite orientations and cancel. Going round, the order is $A, B, D, C$." },
        { text: "16, the correct area", feedback: "The shoelace formula needs the vertices in boundary order. Here $B \\to C$ cuts across the square." },
        { text: "32, double the area", feedback: "Work out the four terms: $0$, $16$, $-16$, $0$." },
        { text: "8, half the area", feedback: "Work out the four terms: they add to 0." },
      ],
      hint: "Sketch the path $A \\to B \\to C \\to D \\to A$. Does it go round the square?",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "locus-and-its-equation",
  title: "0.5 · Locus and Its Equation",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "A goat tied to a peg by a 3 m rope walks with the rope taut. Where can it be? On a circle. A point moves so that it is always equally far from two lamps. Where can it be? On the perpendicular bisector. In each case a **condition** on a moving point traces out a **path**. The path is called a **locus**, and coordinate geometry's great trick is that the condition, written in $x$ and $y$, *is* the equation of the path.",
    },
    { type: "heading", text: "What a locus equation means" },
    {
      type: "callout",
      variant: "definition",
      title: "Locus",
      content:
        "The **locus** of a point is the set of all positions it can take while obeying a given condition. An equation $f(x, y) = 0$ is the **equation of the locus** if\n\n- every point on the locus satisfies $f(x, y) = 0$, and\n- every point satisfying $f(x, y) = 0$ lies on the locus.",
    },
    {
      type: "text",
      content:
        "The method is always the same four steps:\n\n1. Call the moving point $P(h, k)$. (Using $h, k$ keeps it separate from the $x, y$ already in the problem.)\n2. Translate the geometric condition into an equation in $h$ and $k$, using distance, section or area formulas.\n3. If the condition involves a **parameter** (an angle, a slope, the position of another moving point), eliminate it.\n4. Simplify, then replace $h$ by $x$ and $k$ by $y$.",
    },
    { type: "heading", text: "Lines and circles as loci" },
    {
      type: "worked-example",
      id: "slc0-5-we1",
      title: "Worked example 1: equidistant from two points",
      problem: "Find the locus of a point equidistant from $A(1, 2)$ and $B(3, -4)$.",
      steps: [
        { text: "Let $P(h, k)$. The condition $PA = PB$ is equivalent to $PA^2 = PB^2$:", latex: "(h - 1)^2 + (k - 2)^2 = (h - 3)^2 + (k + 4)^2" },
        { text: "The squares cancel: $-2h + 1 - 4k + 4 = -6h + 9 + 8k + 16$, so $4h - 12k - 20 = 0$. *Why this step:* equal distances from two points always lose the quadratic terms, which is why this locus is a line." },
        { text: "Divide by 4 and rename: $x - 3y = 5$. Check: the midpoint $(2, -1)$ satisfies it." },
      ],
      answer: "$x - 3y = 5$, the perpendicular bisector of $AB$.",
    },
    {
      type: "worked-example",
      id: "slc0-5-we2",
      title: "Worked example 2: a distance ratio (Apollonius)",
      problem: "Find the locus of $P$ with $PA = 2PB$, where $A(0, 0)$ and $B(3, 0)$.",
      steps: [
        { text: "Square to avoid roots: $PA^2 = 4PB^2$.", latex: "h^2 + k^2 = 4\\left[(h - 3)^2 + k^2\\right]" },
        { text: "$3h^2 + 3k^2 - 24h + 36 = 0$, i.e. $x^2 + y^2 - 8x + 12 = 0$, or $(x - 4)^2 + y^2 = 4$." },
        { text: "Check on the x-axis: $x = 2$ gives $PA = 2$, $PB = 1$, and $x = 6$ gives $PA = 6$, $PB = 3$. *Why this step:* two easy points on the locus confirm the algebra." },
      ],
      answer: "The circle $x^2 + y^2 - 8x + 12 = 0$: centre $(4, 0)$, radius 2.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Which conditions give which curves",
      content:
        "- $PA = PB$: a straight line (the perpendicular bisector).\n- $PA = r$: a circle.\n- $PA = \\lambda PB$ with $\\lambda \\ne 1$: a circle (the circle of Apollonius).\n- $PA^2 + PB^2 = $ constant: a circle centred at the midpoint of $AB$.\n- $PA^2 - PB^2 = $ constant: a straight line perpendicular to $AB$.\n- $\\angle APB = 90^\\circ$: the circle on $AB$ as diameter (without $A$ and $B$).",
    },
    { type: "heading", text: "Eliminating a parameter" },
    {
      type: "text",
      content:
        "Often the moving point is driven by something else: a rod sliding between two walls, a vertex running along a line, an angle that turns. Then step 2 gives $h$ and $k$ **in terms of a parameter**, and step 3 removes the parameter using a relation it must satisfy.",
    },
    {
      type: "worked-example",
      id: "slc0-5-we3",
      title: "Worked example 3: the sliding ladder",
      problem: "A rod of length 6 slides with one end on the x-axis and the other on the y-axis. Find the locus of its midpoint.",
      steps: [
        { text: "Let the ends be $(a, 0)$ and $(0, b)$. The length gives $a^2 + b^2 = 36$. *Why this step:* $a$ and $b$ are the parameters, and this is the one relation tying them together." },
        { text: "The midpoint is $(h, k) = \\left(\\frac a2, \\frac b2\\right)$, so $a = 2h$, $b = 2k$." },
        { text: "Substitute: $4h^2 + 4k^2 = 36$." },
      ],
      answer: "$x^2 + y^2 = 9$: the midpoint moves on a circle of radius 3 about the corner.",
    },
    {
      type: "worked-example",
      id: "slc0-5-we4",
      title: "Worked example 4: centroid of a moving vertex",
      problem: "$A(2, 3)$ and $B(-2, 1)$ are fixed, and $C$ moves on the line $y = 2x - 3$. Find the locus of the centroid of triangle $ABC$.",
      steps: [
        { text: "Write $C = (t, 2t - 3)$. *Why this step:* one parameter $t$ describes every point of the line." },
        { latex: "h = \\frac{2 - 2 + t}{3} = \\frac t3, \\qquad k = \\frac{3 + 1 + 2t - 3}{3} = \\frac{2t + 1}{3}" },
        { text: "From the first, $t = 3h$. Then $3k = 6h + 1$." },
      ],
      answer: "$6x - 3y + 1 = 0$, a line parallel to the one $C$ runs on.",
    },
    {
      type: "interactive",
      config: {
        component: "slc-line-explorer",
        mode: "triangle",
        a: [-3, -2],
        b: [3, -2],
        c: [0, 3],
        draggable: ["c"],
        show: ["centroid", "medians"],
        caption:
          "Only $C$ moves. Drag it along a straight path and watch $G$: it runs along a parallel path at one-third of the speed, because $G = \\frac{A + B}{3} + \\frac{C}{3}$. That one line of algebra is the whole locus argument of Worked example 4.",
      },
    },
    {
      type: "worked-example",
      id: "slc0-5-we5",
      title: "Worked example 5: a trigonometric parameter",
      problem: "Find the locus of the point $(2 + 3\\cos\\theta,\\ -1 + 3\\sin\\theta)$ as $\\theta$ varies.",
      steps: [
        { text: "Isolate the trigonometric parts: $\\cos\\theta = \\frac{h - 2}{3}$ and $\\sin\\theta = \\frac{k + 1}{3}$." },
        { text: "Use $\\cos^2\\theta + \\sin^2\\theta = 1$. *Why this step:* this identity is the relation that every angle parameter obeys, so it is the natural eliminator." },
      ],
      answer: "$(x - 2)^2 + (y + 1)^2 = 9$, a circle of radius 3 centred at $(2, -1)$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: leaving the parameter in the answer",
      content:
        "\"The locus is $x = \\frac t3$, $y = \\frac{2t + 1}{3}$\" describes the path, but it is not the equation of the locus. The answer must be a single relation between $x$ and $y$ alone. Also watch for points that must be **excluded**: in the right-angle locus $\\angle APB = 90^\\circ$, the points $A$ and $B$ satisfy the circle's equation but make no angle at all.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "slc0-5-q1",
      variant: "practice",
      question: "The locus of a point equidistant from $(2, 0)$ and $(0, 2)$ is",
      options: [
        { text: "$y = x$", correct: true, feedback: "$(h - 2)^2 + k^2 = h^2 + (k - 2)^2$ reduces to $h = k$." },
        { text: "$x + y = 2$", feedback: "That is the line through the two points, not their perpendicular bisector." },
        { text: "$x = 2$", feedback: "$(0, 0)$ is equidistant from both points but is not on $x = 2$." },
        { text: "$x^2 + y^2 = 4$", feedback: "Equal distances from two points give a line, not a circle." },
      ],
      hint: "Set the squared distances equal; the squares cancel.",
    },
    {
      type: "numeric",
      id: "slc0-5-q2",
      variant: "practice",
      question:
        "A point moves so that its distance from $(3, 0)$ is always 2. Its locus is $x^2 + y^2 - 6x + c = 0$. Find $c$.",
      answer: 5,
      hint: "Expand $(x - 3)^2 + y^2 = 4$.",
      solution: "$x^2 - 6x + 9 + y^2 = 4$, so $x^2 + y^2 - 6x + 5 = 0$.",
      commonMistakes: [
        { answer: 13, feedback: "Move the 4 across with a minus sign: $9 - 4$, not $9 + 4$." },
        { answer: -5, feedback: "$9 - 4 = +5$." },
      ],
    },
    {
      type: "quiz",
      id: "slc0-5-q3",
      variant: "practice",
      question:
        "$P$ moves so that $PA^2 + PB^2 = 10$, where $A(1, 0)$ and $B(-1, 0)$. The locus of $P$ is",
      options: [
        { text: "$x^2 + y^2 = 4$", correct: true, feedback: "$(h - 1)^2 + k^2 + (h + 1)^2 + k^2 = 2h^2 + 2k^2 + 2 = 10$." },
        { text: "$x^2 + y^2 = 5$", feedback: "You halved 10 but forgot the $+2$ from $1 + 1$." },
        { text: "$x^2 + y^2 = 10$", feedback: "Expand both squares: the coefficient of $h^2$ is 2." },
        { text: "$x = 0$", feedback: "That would come from $PA^2 - PB^2 = 0$." },
      ],
      hint: "Expand both squared distances and collect terms.",
    },
    {
      type: "numeric",
      id: "slc0-5-q4",
      variant: "practice",
      question:
        "$P$ moves so that $PA = 3PB$, where $A(0, 0)$ and $B(4, 0)$. Its locus is a circle. Find its radius.",
      answer: 1.5,
      hint: "Square: $h^2 + k^2 = 9[(h - 4)^2 + k^2]$, then complete the square.",
      solution: "$8h^2 + 8k^2 - 72h + 144 = 0$, i.e. $x^2 + y^2 - 9x + 18 = 0$. Centre $(4.5, 0)$, radius $\\sqrt{20.25 - 18} = 1.5$. Check: $(3, 0)$ and $(6, 0)$ are on it, a diameter of length 3.",
      commonMistakes: [
        { answer: 3, feedback: "3 is the diameter, from $(3, 0)$ to $(6, 0)$." },
        { answer: 4.5, feedback: "4.5 is the x-coordinate of the centre." },
      ],
    },
    {
      type: "numeric",
      id: "slc0-5-q5",
      variant: "practice",
      question:
        "A rod $AB$ of length 10 slides with $A$ on the x-axis and $B$ on the y-axis. The point $P$ on the rod with $AP : PB = 2 : 3$ traces $\\frac{x^2}{p^2} + \\frac{y^2}{q^2} = 1$ with $p, q > 0$. Find $p$.",
      answer: 6,
      hint: "With $A(a, 0)$, $B(0, b)$ and $a^2 + b^2 = 100$, the section formula gives $P = \\left(\\frac{3a}{5}, \\frac{2b}{5}\\right)$.",
      solution: "$a = \\frac{5h}{3}$, $b = \\frac{5k}{2}$, so $\\frac{25h^2}{9} + \\frac{25k^2}{4} = 100$, i.e. $\\frac{x^2}{36} + \\frac{y^2}{16} = 1$. So $p = 6$ (and $q = 4$).",
      commonMistakes: [
        { answer: 4, feedback: "4 is $q$. Or you used $\\frac{2A + 3B}{5}$, which swaps the ratio: $AP : PB = 2 : 3$ puts weight 3 on $A$." },
        { answer: 10, feedback: "10 is the rod's length. Only the midpoint of the rod traces a circle; this point traces an ellipse." },
      ],
    },
    {
      type: "quiz",
      id: "slc0-5-q6",
      variant: "practice",
      multiple: true,
      question:
        "$P$ moves so that the area of triangle $PAB$ is 6, where $A(0, 0)$ and $B(4, 0)$. Which descriptions of the locus are correct? Select all that apply.",
      options: [
        { text: "$y^2 = 9$", correct: true, feedback: "$\\frac12 \\cdot 4 \\cdot \\lvert k\\rvert = 6$ gives $\\lvert k\\rvert = 3$, i.e. $k^2 = 9$." },
        { text: "A pair of lines parallel to $AB$", correct: true, feedback: "$y = 3$ and $y = -3$." },
        { text: "Only the line $y = 3$", feedback: "Points below $AB$ give triangles of the same area: the modulus hides two cases." },
        { text: "A circle through $A$ and $B$", feedback: "The height above $AB$ is fixed, not the angle at $P$." },
        { text: "$x^2 = 9$", feedback: "The height is measured perpendicular to $AB$, i.e. vertically." },
      ],
      hint: "The base $AB$ lies on the x-axis, so the height is $\\lvert k\\rvert$.",
    },
    {
      type: "numeric",
      id: "slc0-5-q7",
      variant: "practice",
      question:
        "$A(1, 2)$ and $B(3, -2)$ are fixed and $C$ moves along the y-axis. The centroid of triangle $ABC$ moves on the line $x = c$. Find $c$.",
      answer: 1.3333,
      tolerance: 0.01,
      hint: "Write $C = (0, t)$ and compute the centroid's abscissa.",
      solution: "$G = \\left(\\frac{1 + 3 + 0}{3}, \\frac{2 - 2 + t}{3}\\right) = \\left(\\frac43, \\frac t3\\right)$. The abscissa never changes: $x = \\frac43$.",
      commonMistakes: [
        { answer: 4, feedback: "Divide the sum of abscissae by 3." },
        { answer: 2, feedback: "2 is the average of $A$ and $B$ only; $C$ contributes $x = 0$ to the centroid." },
      ],
    },
    {
      type: "quiz",
      id: "slc0-5-q8",
      variant: "practice",
      question: "Eliminate $t$: $x = \\cos t + \\sin t$, $y = \\cos t - \\sin t$.",
      options: [
        { text: "$x^2 + y^2 = 2$", correct: true, feedback: "$x^2 + y^2 = 2(\\cos^2 t + \\sin^2 t) = 2$: the cross terms cancel." },
        { text: "$x^2 - y^2 = 2$", feedback: "$x^2 - y^2 = 4\\sin t\\cos t = 2\\sin 2t$, which varies with $t$." },
        { text: "$x^2 + y^2 = 1$", feedback: "Each of $x^2$ and $y^2$ contributes $\\cos^2 t + \\sin^2 t$." },
        { text: "$xy = 1$", feedback: "$xy = \\cos^2 t - \\sin^2 t = \\cos 2t$, which varies." },
      ],
      hint: "Square both and add.",
    },
    {
      type: "numeric",
      id: "slc0-5-q9",
      variant: "practice",
      question:
        "JEE Main. $P$ moves so that $PA^2 - PB^2 = 3$, where $A(1, 1)$ and $B(3, 2)$. Its locus is the line $2x + y = c$. Find $c$.",
      answer: 7,
      hint: "Expand $PA^2 - PB^2$: all squared terms cancel.",
      solution: "$(h - 1)^2 + (k - 1)^2 - (h - 3)^2 - (k - 2)^2 = 4h + 2k - 11 = 3$, so $2h + k = 7$.",
      commonMistakes: [
        { answer: 5.5, feedback: "$2x + y = \\frac{11}{2}$ is the locus for $PA^2 - PB^2 = 0$ (the perpendicular bisector). Include the 3." },
        { answer: 4, feedback: "Move the $-11$ across correctly: $4h + 2k = 14$." },
      ],
    },
    {
      type: "quiz",
      id: "slc0-5-q10",
      variant: "concept",
      question:
        "$Q$ moves on the circle $x^2 + y^2 = 16$. The locus of the midpoint of $OQ$, where $O$ is the origin, is",
      options: [
        { text: "$x^2 + y^2 = 4$", correct: true, feedback: "$Q = (2h, 2k)$ must satisfy $4h^2 + 4k^2 = 16$." },
        { text: "$x^2 + y^2 = 8$", feedback: "Halving every distance from $O$ quarters $x^2 + y^2$, not halves it." },
        { text: "$x^2 + y^2 = 16$", feedback: "The midpoint is half as far from $O$ as $Q$ is." },
        { text: "$x^2 + y^2 = 64$", feedback: "That substitutes $Q = \\left(\\frac h2, \\frac k2\\right)$, the wrong way round." },
      ],
      hint: "If the midpoint is $(h, k)$, then $Q = (2h, 2k)$.",
    },
    {
      type: "quiz",
      id: "slc0-5-q11",
      variant: "practice",
      multiple: true,
      question:
        "JEE Advanced. $A(-a, 0)$ and $B(a, 0)$ are fixed, $a > 0$, and $P$ moves so that $\\angle APB = 90^\\circ$. Which statements are true? Select all that apply.",
      options: [
        { text: "$P$ lies on $x^2 + y^2 = a^2$", correct: true, feedback: "$PA^2 + PB^2 = AB^2$ gives $2h^2 + 2k^2 + 2a^2 = 4a^2$." },
        { text: "The points $A$ and $B$ themselves are not on the locus", correct: true, feedback: "At $P = A$ there is no angle $APB$. They satisfy the equation but must be excluded." },
        { text: "The locus is a straight line", feedback: "It is a circle: the angle in a semicircle." },
        { text: "$P$ lies on $x^2 + y^2 = 2a^2$", feedback: "Use Pythagoras: $PA^2 + PB^2 = (2a)^2$." },
      ],
      hint: "A right angle at $P$ means $PA^2 + PB^2 = AB^2$.",
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "shifting-the-origin",
  title: "0.6 · Shifting the Origin",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "The equation $x^2 + y^2 - 4x + 6y - 3 = 0$ looks messy. Stand at the point $(2, -3)$ instead of at the origin and measure everything from there, and it becomes $X^2 + Y^2 = 16$: a circle of radius 4 around you. The curve did not change at all. Only the place we measure from changed. Choosing a good origin is one of the oldest simplifying tricks in geometry.",
    },
    { type: "heading", text: "Translation of axes" },
    {
      type: "text",
      content:
        "Move the origin to $O'(h, k)$ and draw new axes $O'X$ and $O'Y$ parallel to the old ones. A point $P$ has old coordinates $(x, y)$ and new coordinates $(X, Y)$. Walking from $O$ to $P$ is the same as walking from $O$ to $O'$ and then from $O'$ to $P$, so the horizontal steps add: $x = h + X$, and likewise $y = k + Y$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Shifting the origin to (h, k)",
      content:
        "If the origin is shifted to $(h, k)$ with the axes kept parallel, then\n\n$$x = X + h, \\quad y = Y + k \\qquad\\text{equivalently}\\qquad X = x - h, \\quad Y = y - k.$$\n\nTo get the **new equation of a curve**, substitute $x = X + h$ and $y = Y + k$ into the old equation. Distances, areas, slopes and angles are unchanged: only coordinates and equations change.",
    },
    {
      type: "worked-example",
      id: "slc0-6-we1",
      title: "Worked example 1: new coordinates of a point",
      problem: "The origin is shifted to $(1, 2)$. Find the new coordinates of the point $(3, -1)$.",
      steps: [
        { text: "$X = x - h = 3 - 1 = 2$ and $Y = y - k = -1 - 2 = -3$. *Why this step:* new coordinates measure from the new origin, so subtract it." },
      ],
      answer: "$(2, -3)$.",
    },
    {
      type: "worked-example",
      id: "slc0-6-we2",
      title: "Worked example 2: transforming the equation of a line",
      problem: "Find the equation of the line $3x - 2y + 5 = 0$ when the origin is shifted to $(1, 4)$.",
      steps: [
        { text: "Substitute $x = X + 1$, $y = Y + 4$:", latex: "3(X + 1) - 2(Y + 4) + 5 = 3X - 2Y + 0 = 0" },
        { text: "The constant vanished because the new origin $(1, 4)$ lies on the line: $3 - 8 + 5 = 0$. *Why this step:* a curve passes through the new origin exactly when its new equation has no constant term, which is a good check." },
      ],
      answer: "$3X - 2Y = 0$. The slope $\\frac32$ is unchanged.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: substituting the wrong way round",
      content:
        "To move the origin **to** $(h, k)$ you replace $x$ by $X + h$ (not $X - h$). Check with a single point: the new origin $(h, k)$ must get new coordinates $(0, 0)$. With $x = X + h$, putting $X = 0$ gives $x = h$, as it should.",
    },
    { type: "heading", text: "Removing the first-degree terms" },
    {
      type: "text",
      content:
        "For an equation with $x^2$ and $y^2$ terms (and no $xy$ term), there is a shift that kills the $x$ and $y$ terms. Either complete the square, or substitute $x = X + h$, $y = Y + k$ and choose $h$, $k$ to make the coefficients of $X$ and $Y$ zero. The new origin turns out to be the **centre** of the curve.",
    },
    {
      type: "worked-example",
      id: "slc0-6-we3",
      title: "Worked example 3: shifting to the centre of a circle",
      problem: "Shift the origin so that $x^2 + y^2 - 4x + 6y - 3 = 0$ has no first-degree terms, and find the new equation.",
      steps: [
        { text: "Complete the squares: $(x - 2)^2 - 4 + (y + 3)^2 - 9 - 3 = 0$, i.e. $(x - 2)^2 + (y + 3)^2 = 16$." },
        { text: "Shift the origin to $(2, -3)$: $X = x - 2$, $Y = y + 3$. *Why this step:* the brackets are already the new coordinates." },
      ],
      answer: "Origin at $(2, -3)$, new equation $X^2 + Y^2 = 16$.",
    },
    {
      type: "worked-example",
      id: "slc0-6-we4",
      title: "Worked example 4: the coefficient method",
      problem: "To what point must the origin be shifted so that $x^2 + 2y^2 - 4x + 8y + 7 = 0$ has no first-degree terms? Find the new equation.",
      steps: [
        { text: "Substitute $x = X + h$, $y = Y + k$. The coefficient of $X$ is $2h - 4$ and that of $Y$ is $4k + 8$. *Why this step:* only the terms $x^2$ and $-4x$ produce an $X$ term, and only $2y^2$ and $8y$ produce a $Y$ term." },
        { text: "Set both to zero: $h = 2$, $k = -2$." },
        { text: "The new constant is the old left side evaluated at $(2, -2)$: $4 + 8 - 8 - 16 + 7 = -5$." },
      ],
      answer: "Origin at $(2, -2)$; new equation $X^2 + 2Y^2 = 5$.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "The new constant term for free",
      content:
        "After the shift $x = X + h$, $y = Y + k$, the constant term of the new equation is $f(h, k)$, the old expression evaluated at the new origin. (Every other term contains $X$ or $Y$, which vanish at the new origin.)",
    },
    { type: "heading", text: "A glimpse of rotation" },
    {
      type: "text",
      content:
        "The axes can also be turned through an angle $\\theta$ about the origin. A point's new coordinates are its coordinates along the turned axes, and the relations are\n\n$x = X\\cos\\theta - Y\\sin\\theta$, $\\quad y = X\\sin\\theta + Y\\cos\\theta$.\n\nRotation removes an $xy$ term, just as translation removes first-degree terms. It is used mainly for conics; here one example is enough.",
    },
    {
      type: "worked-example",
      id: "slc0-6-we5",
      title: "Worked example 5: rotating a rectangular hyperbola",
      problem: "Rotate the axes through $45^\\circ$ and find the new equation of $xy = 2$.",
      steps: [
        { text: "With $\\cos 45^\\circ = \\sin 45^\\circ = \\frac{1}{\\sqrt2}$: $x = \\frac{X - Y}{\\sqrt2}$, $y = \\frac{X + Y}{\\sqrt2}$." },
        { text: "Then $xy = \\frac{X^2 - Y^2}{2} = 2$. *Why this step:* the product $(X - Y)(X + Y)$ is a difference of squares, which is exactly what removes the cross term." },
      ],
      answer: "$X^2 - Y^2 = 4$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "slc0-6-q1",
      variant: "practice",
      question: "The origin is shifted to $(2, -3)$. Find the new ordinate $Y$ of the point $(5, 1)$.",
      answer: 4,
      hint: "$Y = y - k$ with $k = -3$.",
      solution: "$Y = 1 - (-3) = 4$ (and $X = 5 - 2 = 3$).",
      commonMistakes: [
        { answer: -2, feedback: "That is $y + k$. New coordinates subtract the new origin: $Y = y - k$." },
        { answer: 3, feedback: "3 is the new abscissa $X$." },
      ],
    },
    {
      type: "numeric",
      id: "slc0-6-q2",
      variant: "practice",
      question:
        "After the origin is shifted to $(3, 4)$, a point has new coordinates $(-1, 2)$. Find its original ordinate $y$.",
      answer: 6,
      hint: "$y = Y + k$.",
      solution: "$y = 2 + 4 = 6$ (and $x = -1 + 3 = 2$). The original point is $(2, 6)$.",
      commonMistakes: [
        { answer: -2, feedback: "That is $Y - k$. To go back to old coordinates, add the new origin." },
        { answer: 2, feedback: "2 is the new ordinate $Y$, which is what you were given." },
      ],
    },
    {
      type: "quiz",
      id: "slc0-6-q3",
      variant: "practice",
      question:
        "To remove the first-degree terms from $x^2 + y^2 + 6x - 10y + 5 = 0$, the origin must be shifted to",
      options: [
        { text: "$(-3, 5)$", correct: true, feedback: "$(x + 3)^2 + (y - 5)^2 = 29$: the centre is $(-3, 5)$." },
        { text: "$(3, -5)$", feedback: "$x^2 + 6x$ completes to $(x + 3)^2$, which is zero at $x = -3$." },
        { text: "$(6, -10)$", feedback: "Halve the coefficients and change their signs: $h = -\\frac62$, $k = \\frac{10}{2}$." },
        { text: "$(-6, 10)$", feedback: "Half of 6 is 3: the centre is $(-3, 5)$." },
      ],
      hint: "Complete the square in $x$ and in $y$.",
    },
    {
      type: "numeric",
      id: "slc0-6-q4",
      variant: "practice",
      question:
        "After the shift in the previous question, the equation becomes $X^2 + Y^2 = c$. Find $c$.",
      answer: 29,
      hint: "$9 + 25 - 5$.",
      solution: "$(x + 3)^2 - 9 + (y - 5)^2 - 25 + 5 = 0$, so $X^2 + Y^2 = 29$.",
      commonMistakes: [
        { answer: 39, feedback: "The constant 5 moves to the other side with a minus sign: $34 - 5$." },
        { answer: -29, feedback: "That is the new constant term on the left, $f(-3, 5) = -29$. On the right it is $+29$." },
      ],
    },
    {
      type: "quiz",
      id: "slc0-6-q5",
      variant: "concept",
      multiple: true,
      question: "Which of these are unchanged when the origin is shifted (axes kept parallel)? Select all that apply.",
      options: [
        { text: "The distance between two points", correct: true, feedback: "Both points shift by the same $(h, k)$, so the differences are unchanged." },
        { text: "The area of a triangle", correct: true, feedback: "Area is built from coordinate differences." },
        { text: "The slope of a line", correct: true, feedback: "Slope is $\\frac{\\Delta y}{\\Delta x}$, a ratio of differences." },
        { text: "The coordinates of a point", feedback: "They change by $(-h, -k)$." },
        { text: "The constant term in the equation of a line", feedback: "The new constant is the old left side evaluated at the new origin. In Worked example 2 it went from 5 to 0." },
      ],
      hint: "Which quantities depend only on differences of coordinates?",
    },
    {
      type: "quiz",
      id: "slc0-6-q6",
      variant: "practice",
      question: "The origin is shifted to $(2, 1)$. The new equation of the line $2x - y + 3 = 0$ is",
      options: [
        { text: "$2X - Y + 6 = 0$", correct: true, feedback: "$2(X + 2) - (Y + 1) + 3 = 2X - Y + 6$. Check: the new constant is the old left side at $(2, 1)$, which is $4 - 1 + 3 = 6$." },
        { text: "$2X - Y = 0$", feedback: "That substitutes $x = X - 2$, $y = Y - 1$, moving the origin to $(-2, -1)$ instead." },
        { text: "$2X - Y + 3 = 0$", feedback: "The constant changes unless the old left side happens to equal 3 at the new origin." },
        { text: "$2X - Y + 9 = 0$", feedback: "Recompute: $2 \\cdot 2 - 1 + 3 = 6$." },
      ],
      hint: "Substitute $x = X + 2$, $y = Y + 1$.",
    },
    {
      type: "numeric",
      id: "slc0-6-q7",
      variant: "practice",
      question:
        "The origin is shifted to $(h, k)$ so that $2x^2 + 3y^2 - 8x + 18y + 5 = 0$ has no first-degree terms. Find $h + k$.",
      answer: -1,
      hint: "Coefficient of $X$: $4h - 8$. Coefficient of $Y$: $6k + 18$.",
      solution: "$h = 2$, $k = -3$, so $h + k = -1$.",
      commonMistakes: [
        { answer: 1, feedback: "Both signs flipped: $4h - 8 = 0$ gives $h = +2$, $6k + 18 = 0$ gives $k = -3$." },
        { answer: -5, feedback: "That takes $h$ and $k$ as minus half the coefficients of $x$ and $y$, which works only when the $x^2$ and $y^2$ coefficients are 1. Here $4h = 8$ and $6k = -18$." },
      ],
    },
    {
      type: "numeric",
      id: "slc0-6-q8",
      variant: "practice",
      question:
        "After the shift in the previous question, the equation is $2X^2 + 3Y^2 + c = 0$. Find $c$.",
      answer: -30,
      hint: "The new constant is the old left side evaluated at the new origin $(2, -3)$.",
      solution: "$2(4) + 3(9) - 16 - 54 + 5 = -30$, so $2X^2 + 3Y^2 = 30$.",
      commonMistakes: [
        { answer: 30, feedback: "$30$ is on the right of $2X^2 + 3Y^2 = 30$. As a constant on the left it is $-30$." },
        { answer: 5, feedback: "The constant term changes with the shift: evaluate the old expression at $(2, -3)$." },
      ],
    },
    {
      type: "quiz",
      id: "slc0-6-q9",
      variant: "practice",
      question: "JEE Main. The axes are rotated through $45^\\circ$. The equation $xy = 8$ becomes",
      options: [
        { text: "$X^2 - Y^2 = 16$", correct: true, feedback: "$xy = \\frac{(X - Y)(X + Y)}{2} = \\frac{X^2 - Y^2}{2} = 8$." },
        { text: "$X^2 - Y^2 = 8$", feedback: "Don't forget the $\\frac{1}{\\sqrt2} \\cdot \\frac{1}{\\sqrt2} = \\frac12$." },
        { text: "$X^2 + Y^2 = 16$", feedback: "$(X - Y)(X + Y)$ is a difference of squares." },
        { text: "$X^2 - Y^2 = 4$", feedback: "Multiply by 2, don't divide: $\\frac{X^2 - Y^2}{2} = 8$." },
      ],
      hint: "$x = \\frac{X - Y}{\\sqrt2}$, $y = \\frac{X + Y}{\\sqrt2}$.",
    },
    {
      type: "quiz",
      id: "slc0-6-q10",
      variant: "practice",
      multiple: true,
      question:
        "Shifting the origin to $(h, k)$ turns $x^2 + y^2 - 2x + 4y + 1 = 0$ into $X^2 + Y^2 = 4$. Which statements are true? Select all that apply.",
      options: [
        { text: "$(h, k) = (1, -2)$", correct: true, feedback: "$(x - 1)^2 + (y + 2)^2 = 1 + 4 - 1 = 4$." },
        { text: "The curve is a circle of radius 2", correct: true, feedback: "$X^2 + Y^2 = 4$." },
        { text: "Shifting the origin changed the radius", feedback: "The curve is the same set of points; only its equation changed." },
        { text: "$(h, k) = (-1, 2)$", feedback: "The sign flips when completing the square: $x^2 - 2x = (x - 1)^2 - 1$." },
        { text: "The old point $(1, -2)$ has new coordinates $(0, 0)$", correct: true, feedback: "It is the new origin." },
      ],
      hint: "Complete the squares.",
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-0-mastery",
  title: "0.7 · Chapter 0 Mastery",
  position: 7,
  blocks: blocks([
    {
      type: "text",
      content:
        "This lesson has no new theory and no formula sheet. Every formula of this chapter grows from two roots: **Pythagoras** (the distance formula) and **similar triangles** (the section formula). If you forget a formula, rebuild it from those two before you reach for memory.",
    },
    { type: "heading", text: "Reconstruct it" },
    {
      type: "callout",
      variant: "tip",
      title: "Rebuild the chapter from two ideas",
      content:
        "Without notes, answer each of these:\n\n1. Draw $A$, $B$ and the corner $C(x_2, y_1)$. Why is $AB^2 = (x_2 - x_1)^2 + (y_2 - y_1)^2$?\n2. Put $P$ on $AB$ with $AP : PB = m : n$. Which two triangles are similar, and why does $m$ end up multiplying $B$?\n3. Why is the centroid $\\frac{A + B + C}{3}$? (Divide a median $2 : 1$.) Why does the incentre weight each vertex by the opposite side? (Angle bisector theorem, twice.)\n4. Why does $\\frac12\\lvert x_1(y_2 - y_3) + \\cdots\\rvert$ give an area, and what does its sign mean?\n5. In a locus problem, what are $h$ and $k$, and when must you eliminate a parameter?\n6. Shifting the origin to $(h, k)$: do you substitute $x = X + h$ or $x = X - h$? Check with the new origin itself.",
    },
    {
      type: "interactive",
      config: {
        component: "slc-line-explorer",
        mode: "triangle",
        a: [-4, -3],
        b: [4, -2],
        c: [-1, 4],
        show: ["centroid", "incentre", "circumcentre", "orthocentre", "euler-line"],
        caption:
          "Check your reconstructions here. Before you drag, predict: where does each centre go when the triangle becomes right-angled, isosceles, equilateral, obtuse? Which centres can leave the triangle?",
      },
    },
    { type: "heading", text: "Mastery questions" },
    {
      type: "numeric",
      id: "slc0-7-q1",
      variant: "mastery",
      question: "Find the distance between $(-1, 3)$ and $(4, -9)$.",
      answer: 13,
      hint: "Lesson 0.1: $\\Delta x = 5$, $\\Delta y = -12$.",
      solution: "$\\sqrt{25 + 144} = 13$.",
      commonMistakes: [
        { answer: 17, feedback: "That adds the gaps. Square, add, then take the root." },
        { answer: 169, feedback: "169 is the square of the distance." },
      ],
    },
    {
      type: "numeric",
      id: "slc0-7-q2",
      variant: "mastery",
      question:
        "$P$ divides the join of $A(-2, 1)$ and $B(6, 9)$ internally in the ratio $3 : 1$. If $P = (p, q)$, find $p + q$.",
      answer: 11,
      hint: "Lesson 0.2: $P = \\frac{3B + 1A}{4}$.",
      solution: "$P = \\left(\\frac{18 - 2}{4}, \\frac{27 + 1}{4}\\right) = (4, 7)$, so $p + q = 11$.",
      commonMistakes: [
        { answer: 3, feedback: "That uses $\\frac{3A + B}{4} = (0, 3)$, the ratio $1 : 3$." },
        { answer: 7, feedback: "That is the midpoint $(2, 5)$. The ratio is $3 : 1$, not $1 : 1$." },
      ],
    },
    {
      type: "quiz",
      id: "slc0-7-q3",
      variant: "mastery",
      question: "The x-axis divides the segment joining $(3, -6)$ and $(-2, 4)$",
      options: [
        { text: "internally in the ratio $3 : 2$", correct: true, feedback: "$\\frac{4k - 6}{k + 1} = 0$ gives $k = \\frac32$. (The division point is the origin.)" },
        { text: "internally in the ratio $2 : 3$", feedback: "The distance from the first point to the axis is 6 and from the second is 4: $6 : 4 = 3 : 2$." },
        { text: "externally in the ratio $3 : 2$", feedback: "The ordinates $-6$ and $4$ have opposite signs, so the axis lies between the points." },
        { text: "externally in the ratio $2 : 3$", feedback: "The points are on opposite sides of the x-axis, so the division is internal." },
      ],
      hint: "Lesson 0.2: use the $k : 1$ method on the ordinate, or compare the distances of the two points from the axis.",
    },
    {
      type: "numeric",
      id: "slc0-7-q4",
      variant: "mastery",
      question:
        "The midpoints of the sides of a triangle are $(1, 2)$, $(3, 4)$ and $(5, 0)$. Find the sum of the coordinates of the triangle's centroid.",
      answer: 5,
      hint: "The triangle and its midpoint triangle have the same centroid.",
      solution: "The midpoints add up to $\\frac{(A + B) + (B + C) + (C + A)}{2} = A + B + C$, so the centroid is $\\frac{(9, 6)}{3} = (3, 2)$, with coordinate sum 5.",
      commonMistakes: [
        { answer: 15, feedback: "That is the sum of all six coordinates of the midpoints. Divide by 3 to get the centroid." },
        { answer: 10, feedback: "The centroid is the average of the midpoints, not twice it." },
      ],
    },
    {
      type: "numeric",
      id: "slc0-7-q5",
      variant: "mastery",
      question:
        "In triangle $ABC$, the midpoints of $BC$, $CA$, $AB$ are $D(1, 2)$, $E(3, 4)$, $F(5, 0)$. Find the x-coordinate of $A$.",
      answer: 7,
      hint: "$AFDE$ is a parallelogram, so $A = E + F - D$.",
      solution: "$A = (3 + 5 - 1, 4 + 0 - 2) = (7, 2)$. Check: the midpoint of $AB$ should be $F$, and $B = D + F - E = (3, -2)$ gives midpoint $(5, 0)$.",
      commonMistakes: [
        { answer: -1, feedback: "$D + E - F = (-1, 6)$ is $C$, the vertex opposite $F$." },
        { answer: 3, feedback: "$D + F - E = (3, -2)$ is $B$." },
      ],
    },
    {
      type: "numeric",
      id: "slc0-7-q6",
      variant: "mastery",
      question: "Find the inradius of the triangle with vertices $(0, 0)$, $(20, 0)$ and $(0, 15)$.",
      answer: 5,
      hint: "Lesson 0.3: find the incentre, or use $r = \\frac{\\Delta}{s}$.",
      solution: "Sides 20, 15, 25, so $s = 30$ and $\\Delta = 150$: $r = 5$. The incentre formula gives $I = \\frac{25(0, 0) + 15(20, 0) + 20(0, 15)}{60} = (5, 5)$, at distance 5 from both axes.",
      commonMistakes: [
        { answer: 2.5, feedback: "You divided the area by the perimeter 60. Use the semi-perimeter $s = 30$." },
        { answer: 10, feedback: "For a right triangle $r = \\frac{p + q - h}{2}$ (legs $p, q$, hypotenuse $h$): $\\frac{20 + 15 - 25}{2} = 5$. Don't forget to halve." },
      ],
    },
    {
      type: "quiz",
      id: "slc0-7-q7",
      variant: "mastery",
      question: "The orthocentre of the triangle with vertices $(0, 0)$, $(4, 0)$ and $(0, 3)$ is",
      options: [
        { text: "$(0, 0)$", correct: true, feedback: "The right angle is at the origin, and the two legs are altitudes." },
        { text: "$(2, 1.5)$", feedback: "That is the circumcentre, the midpoint of the hypotenuse." },
        { text: "$\\left(\\frac43, 1\\right)$", feedback: "That is the centroid." },
        { text: "$(1, 1)$", feedback: "That is the incentre." },
      ],
      hint: "Lesson 0.3: in a right triangle, which two sides are already altitudes?",
    },
    {
      type: "numeric",
      id: "slc0-7-q8",
      variant: "mastery",
      question:
        "A triangle has circumcentre $(1, 1)$ and orthocentre $(4, 7)$. Find the y-coordinate of its centroid.",
      answer: 3,
      hint: "Lesson 0.3: $G = \\frac{2O + H}{3}$.",
      solution: "$G = \\frac{(2, 2) + (4, 7)}{3} = (2, 3)$.",
      commonMistakes: [
        { answer: 4, feedback: "4 is the midpoint's ordinate. $G$ divides $OH$ in the ratio $1 : 2$, not $1 : 1$." },
        { answer: 5, feedback: "That uses $\\frac{O + 2H}{3}$: $G$ is nearer to $O$, so $O$ gets the weight 2." },
      ],
    },
    {
      type: "numeric",
      id: "slc0-7-q9",
      variant: "mastery",
      question: "Find the area of the triangle with vertices $(-2, -1)$, $(4, -3)$ and $(2, 5)$.",
      answer: 22,
      hint: "Lesson 0.4: the determinant formula.",
      solution: "$\\frac12\\lvert -2(-3 - 5) + 4(5 + 1) + 2(-1 + 3)\\rvert = \\frac12\\lvert 16 + 24 + 4\\rvert = 22$.",
      commonMistakes: [
        { answer: 44, feedback: "Don't forget the $\\frac12$." },
        { answer: 6, feedback: "Check the first term: $-2(-3 - 5) = +16$." },
      ],
    },
    {
      type: "numeric",
      id: "slc0-7-q10",
      variant: "mastery",
      question: "Find $k$ if $(k, -1)$, $(2, 1)$ and $(4, 5)$ are collinear.",
      answer: 1,
      hint: "Lesson 0.4: zero area, or equal slopes.",
      solution: "The slope from $(2, 1)$ to $(4, 5)$ is 2, so $\\frac{1 - (-1)}{2 - k} = 2$ gives $k = 1$. Area check: $1(1 - 5) + 2(5 + 1) + 4(-1 - 1) = -4 + 12 - 8 = 0$.",
      commonMistakes: [
        { answer: 3, feedback: "Recheck: $(3, -1)$ gives slope $\\frac{2}{-1} = -2$ to $(2, 1)$." },
        { answer: 0, feedback: "$(0, -1)$ gives slope 1 to $(2, 1)$, but the line has slope 2." },
      ],
    },
    {
      type: "quiz",
      id: "slc0-7-q11",
      variant: "mastery",
      multiple: true,
      question:
        "For the triangle $A(0, 0)$, $B(6, 0)$, $C(0, 8)$, which statements are true? Select all that apply.",
      options: [
        { text: "The circumcentre is $(3, 4)$", correct: true, feedback: "Right angle at $A$: the midpoint of the hypotenuse $BC$." },
        { text: "The incentre is $(2, 2)$", correct: true, feedback: "$a = 10$, $b = 8$, $c = 6$: $\\frac{8(6, 0) + 6(0, 8)}{24} = (2, 2)$." },
        { text: "The orthocentre is $\\left(2, \\frac83\\right)$", feedback: "That is the centroid. The orthocentre is the right-angle vertex $(0, 0)$." },
        { text: "The excentre opposite $A$ is $(12, 12)$", correct: true, feedback: "$\\frac{-10(0, 0) + 8(6, 0) + 6(0, 8)}{4} = (12, 12)$, and $r_1 = \\frac{24}{2} = 12$." },
        { text: "The centroid is $(3, 4)$", feedback: "The centroid is $\\left(\\frac{0 + 6 + 0}{3}, \\frac{0 + 0 + 8}{3}\\right) = \\left(2, \\frac83\\right)$." },
      ],
      hint: "Lesson 0.3: identify the right angle first, then use the weighted-average formulas.",
    },
    {
      type: "numeric",
      id: "slc0-7-q12",
      variant: "mastery",
      question:
        "The locus of a point equidistant from $A(2, 3)$ and $B(4, -1)$ is $x - 2y = c$. Find $c$.",
      answer: 1,
      hint: "Lesson 0.5: set $PA^2 = PB^2$, or note that the midpoint of $AB$ is on the locus.",
      solution: "$(h - 2)^2 + (k - 3)^2 = (h - 4)^2 + (k + 1)^2$ gives $4h - 8k - 4 = 0$, i.e. $x - 2y = 1$. Check: the midpoint $(3, 1)$ gives $3 - 2 = 1$.",
      commonMistakes: [
        { answer: -1, feedback: "Sign slip: substitute the midpoint $(3, 1)$ to check: $3 - 2(1) = 1$." },
        { answer: 4, feedback: "Divide $4h - 8k = 4$ through by 4." },
      ],
    },
    {
      type: "quiz",
      id: "slc0-7-q13",
      variant: "mastery",
      question:
        "A rod of length $2l$ slides with its ends on the coordinate axes. The locus of its midpoint is",
      options: [
        { text: "$x^2 + y^2 = l^2$", correct: true, feedback: "Ends $(2h, 0)$ and $(0, 2k)$: $4h^2 + 4k^2 = 4l^2$." },
        { text: "$x^2 + y^2 = 4l^2$", feedback: "That is the condition on the ends $(a, b)$, before halving." },
        { text: "$x^2 + y^2 = 2l^2$", feedback: "The midpoint is $\\left(\\frac a2, \\frac b2\\right)$, so $x^2 + y^2 = \\frac{a^2 + b^2}{4}$." },
        { text: "$x + y = l$", feedback: "Test the position with the rod lying along the x-axis: the midpoint is $(l, 0)$. Now stand the rod at $45^\\circ$: the midpoint $\\left(\\frac{l}{\\sqrt2}, \\frac{l}{\\sqrt2}\\right)$ is not on $x + y = l$." },
      ],
      hint: "Lesson 0.5: let the ends be $(a, 0)$, $(0, b)$ with $a^2 + b^2 = 4l^2$.",
    },
    {
      type: "numeric",
      id: "slc0-7-q14",
      variant: "mastery",
      question:
        "The origin is shifted to remove the first-degree terms of $x^2 + y^2 - 6x + 8y + 9 = 0$. The new equation is $X^2 + Y^2 = c$. Find $c$.",
      answer: 16,
      hint: "Lesson 0.6: complete the squares.",
      solution: "$(x - 3)^2 + (y + 4)^2 = 9 + 16 - 9 = 16$. The new origin is $(3, -4)$ and the circle has radius 4.",
      commonMistakes: [
        { answer: 34, feedback: "The constant 9 moves across with a minus sign: $25 - 9$." },
        { answer: 4, feedback: "4 is the radius. The equation has $c = r^2$." },
      ],
    },
    {
      type: "numeric",
      id: "slc0-7-q15",
      variant: "mastery",
      question:
        "JEE Main. $A(1, 2)$ and $B(4, 6)$ are fixed and $C(t, 0)$ lies on the x-axis. The area of triangle $ABC$ is 5. Find the sum of all possible values of $t$.",
      answer: -1,
      hint: "Lesson 0.4: $\\frac12\\lvert 1(6 - 0) + 4(0 - 2) + t(2 - 6)\\rvert = 5$.",
      solution: "$\\frac12\\lvert -2 - 4t\\rvert = 5$, so $\\lvert 1 + 2t\\rvert = 5$: $t = 2$ or $t = -3$. Sum $-1$.",
      commonMistakes: [
        { answer: 2, feedback: "That is one value. The modulus gives a second, $t = -3$." },
        { answer: 5, feedback: "Solve both cases: $1 + 2t = 5$ and $1 + 2t = -5$." },
      ],
    },
    {
      type: "quiz",
      id: "slc0-7-q16",
      variant: "mastery",
      multiple: true,
      question:
        "JEE Advanced. Let $I$ be the incentre and $I_1, I_2, I_3$ the excentres of a triangle $ABC$ (with $I_1$ opposite $A$, and so on). Which statements are true? Select all that apply.",
      options: [
        { text: "$I_1 = \\dfrac{-aA + bB + cC}{-a + b + c}$", correct: true, feedback: "The incentre formula with the sign of $a$ changed." },
        { text: "$I$ is the orthocentre of triangle $I_1I_2I_3$", correct: true, feedback: "$AI_1$ is the internal bisector at $A$, and $I_2I_3$ is the external bisector at $A$, which is perpendicular to it. So the three lines $AI_1$, $BI_2$, $CI_3$ are altitudes of $I_1I_2I_3$, and they meet at $I$." },
        { text: "$I_1$ lies on the internal bisector of angle $A$", correct: true, feedback: "$I_1$ is on the internal bisector of $A$ and the external bisectors of $B$ and $C$." },
        { text: "$I_1$ lies inside the triangle", feedback: "Every excentre lies outside the triangle (the exradius circle touches the side $BC$ from outside)." },
        { text: "$I_1$ lies on the external bisector of angle $A$", feedback: "$I_1$ lies on the **internal** bisector of $A$. The external bisector of $A$ carries $I_2$ and $I_3$." },
      ],
      hint: "Lesson 0.3: which three bisectors pass through the excentre opposite $A$? Internal and external bisectors at a vertex are perpendicular.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Where next",
      content:
        "So far a line has appeared only as \"the set of points with zero area\" or as a locus that happened to come out linear. Chapter 1 studies the straight line directly: its steepness (the slope), the conditions for two lines to be parallel or perpendicular (which we borrowed for the orthocentre), and the half-dozen standard ways of writing its equation.",
    },
  ]),
};

export const slcChapter0Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lessonMastery,
];
