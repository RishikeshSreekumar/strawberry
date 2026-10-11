import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Complex Numbers & Quadratics Chapter 3 — The Argand Plane and Polar Form.
 * A complex number becomes a point and an arrow: modulus is distance,
 * argument is direction (principal value in (−π, π]), polar and Euler forms
 * r(cos θ + i sin θ) = re^{iθ}, multiplication as scale-and-rotate, and the
 * triangle inequality with its equality cases. Chapter 4 (De Moivre) builds
 * directly on the product rule proved here.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "complex-numbers-as-points",
  title: "3.1 · Complex Numbers as Points",
  position: 1,
  blocks: blocks([
    {
      type: "text",
      content:
        "For two hundred years after Cardano, mathematicians used $\\sqrt{-1}$ while calling it \"imaginary\", \"impossible\", even \"useless\". Real numbers had a home, the number line, and $i$ did not. Around 1800 a Norwegian surveyor, Caspar Wessel, and a Parisian bookkeeper, Jean-Robert Argand, independently found it one: **step off the line**.",
    },
    {
      type: "text",
      content:
        "Here is the idea in one sentence. Multiplying by $-1$ turns the number line through half a turn ($3 \\mapsto -3$). Since $i \\cdot i = -1$, multiplying by $i$ twice must be a half turn, so multiplying by $i$ once should be a **quarter turn**. A quarter turn takes $1$ off the line to a point straight above $0$. That point is $i$, and the line has grown into a plane.",
    },
    { type: "heading", text: "The Argand plane" },
    {
      type: "callout",
      variant: "definition",
      title: "The Argand plane (complex plane)",
      content:
        "The complex number $z = x + iy$ is drawn as the point $(x, y)$, or as the arrow from the origin $O$ to that point. The horizontal axis is the **real axis**, the vertical axis the **imaginary axis**.\n\n- Purely real numbers ($y = 0$) lie on the real axis.\n- Purely imaginary numbers ($x = 0$) lie on the imaginary axis.\n- $0$ is the origin, on both axes.",
    },
    {
      type: "text",
      content:
        "So $3 + 2i$ is the point $(3, 2)$, $-1 - i$ is $(-1, -1)$, $4$ is $(4, 0)$ and $-2i$ is $(0, -2)$. Nothing about the algebra of Chapter 2 changes. We have only given every complex number an address, and the payoff is that algebraic facts now have pictures and pictures have algebra.",
    },
    {
      type: "callout",
      variant: "info",
      title: "The modulus is the distance from the origin",
      content:
        "Chapter 2 defined $|z| = \\sqrt{x^2 + y^2}$. In the plane that is Pythagoras: $|z|$ is the length of the arrow from $O$ to $z$. Complex numbers cannot be ordered (\"$2 + i > 1 + 3i$\" means nothing), but their moduli are real numbers and can be compared freely: $|2 + i| = \\sqrt5 < \\sqrt{10} = |1 + 3i|$.",
    },
    { type: "heading", text: "Addition is adding arrows" },
    {
      type: "math",
      latex: "(x_1 + iy_1) + (x_2 + iy_2) = (x_1 + x_2) + i(y_1 + y_2)",
    },
    {
      type: "text",
      content:
        "Coordinates add separately, exactly as vector components do. So $z_1 + z_2$ is the arrow $z_1$ followed by the arrow $z_2$: the far corner of the parallelogram with sides $Oz_1$ and $Oz_2$. Subtraction is the other diagonal. Since $z_2 + (z_1 - z_2) = z_1$, the number $z_1 - z_2$ is the arrow that runs **from $z_2$ to $z_1$**.",
    },
    {
      type: "interactive",
      config: {
        component: "cq-argand-plane",
        mode: "sum",
        z1: [3, 1],
        z2: [1, 2],
        show: ["difference"],
        caption:
          "Drag $z_1$ and $z_2$. The green arrow $z_1 + z_2$ is the parallelogram's diagonal from $O$. The orange arrow runs from $z_2$ to $z_1$ and its copy from $O$ is $z_1 - z_2$: the same length, the same direction. That length is the distance between the two points.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the orange arrow from $z_2$ to $z_1$ and the dashed copy from the origin are parallel and equal. Moving both points by the same amount leaves $z_1 - z_2$ unchanged, which is why differences describe the *relative* position of two points.",
    },
    { type: "heading", text: "Distance, midpoint and centroid" },
    {
      type: "callout",
      variant: "definition",
      title: "Distance between two points",
      content:
        "The distance between the points $z_1 = x_1 + iy_1$ and $z_2 = x_2 + iy_2$ is the length of the arrow $z_1 - z_2$:\n\n$$|z_1 - z_2| = \\sqrt{(x_1 - x_2)^2 + (y_1 - y_2)^2}.$$\n\nThis single fact powers the whole of Chapter 5: $|z - a| = r$ is a circle, $|z - a| = |z - b|$ a perpendicular bisector.",
    },
    {
      type: "math",
      latex:
        "\\text{midpoint of } z_1, z_2 = \\frac{z_1 + z_2}{2}, \\qquad \\text{centroid of } z_1, z_2, z_3 = \\frac{z_1 + z_2 + z_3}{3}",
    },
    {
      type: "text",
      content:
        "Both formulas are averages of coordinates, written once for complex numbers instead of twice for $x$ and $y$. A useful consequence: the diagonals of a parallelogram $ABCD$ bisect each other, so $\\frac{a + c}{2} = \\frac{b + d}{2}$, that is $a + c = b + d$.",
    },
    { type: "heading", text: "Reflections and turns" },
    {
      type: "table",
      headers: ["Number", "Point", "Geometric move from $z = x + iy$"],
      rows: [
        ["$\\bar z = x - iy$", "$(x, -y)$", "reflection in the real axis"],
        ["$-z = -x - iy$", "$(-x, -y)$", "half turn about $O$ (point reflection)"],
        ["$-\\bar z = -x + iy$", "$(-x, y)$", "reflection in the imaginary axis"],
        ["$iz = -y + ix$", "$(-y, x)$", "quarter turn anticlockwise about $O$"],
      ],
    },
    {
      type: "worked-example",
      id: "cq3-1-we1",
      title: "Worked example 1: distance",
      problem: "Find the distance between the points $3 + 2i$ and $-1 - i$.",
      steps: [
        { text: "Subtract: $(3 + 2i) - (-1 - i) = 4 + 3i$. *Why this step:* the distance is the length of the arrow joining the points, and that arrow is the difference." },
        { latex: "|4 + 3i| = \\sqrt{4^2 + 3^2} = \\sqrt{25} = 5" },
      ],
      answer: "The distance is $5$.",
    },
    {
      type: "worked-example",
      id: "cq3-1-we2",
      title: "Worked example 2: classifying a triangle",
      problem: "Show that the points $z_1 = 1 + i$, $z_2 = 4 + 5i$ and $z_3 = -3 + 4i$ form a right-angled isosceles triangle.",
      steps: [
        { text: "$|z_2 - z_1| = |3 + 4i| = 5$ and $|z_3 - z_1| = |-4 + 3i| = 5$." },
        { text: "$|z_3 - z_2| = |-7 - i| = \\sqrt{50}$." },
        { text: "Two sides are equal (isosceles), and $5^2 + 5^2 = 50 = (\\sqrt{50})^2$, so by the converse of Pythagoras the angle at $z_1$ is a right angle. *Why this step:* side lengths alone decide the shape of a triangle." },
      ],
      answer: "Sides $5, 5, \\sqrt{50}$: right-angled at $z_1$ and isosceles.",
    },
    {
      type: "worked-example",
      id: "cq3-1-we3",
      title: "Worked example 3: completing a parallelogram",
      problem: "$A = 1 + 2i$, $B = 4 + 3i$ and $C = 6 + 7i$ are three consecutive vertices of a parallelogram $ABCD$. Find $D$.",
      steps: [
        { text: "The diagonals $AC$ and $BD$ bisect each other, so they share a midpoint: $\\frac{A + C}{2} = \\frac{B + D}{2}$." },
        { latex: "D = A + C - B = (1 + 2i) + (6 + 7i) - (4 + 3i) = 3 + 6i" },
        { text: "Check: $\\overrightarrow{AD} = D - A = 2 + 4i$ and $\\overrightarrow{BC} = C - B = 2 + 4i$. Equal arrows, as opposite sides of a parallelogram must be." },
      ],
      answer: "$D = 3 + 6i$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"$|z_1 - z_2| = |z_1| - |z_2|$\"",
      content:
        "The modulus of a difference is a distance between two points, not a difference of two distances from $O$. Take $z_1 = 3$ and $z_2 = 3i$: both are 3 from the origin, so $|z_1| - |z_2| = 0$, yet the points are $|3 - 3i| = 3\\sqrt2$ apart. Always subtract first, then take the modulus.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "cq3-1-q1",
      variant: "practice",
      question: "Which point of the plane represents $-2 + 3i$?",
      options: [
        { text: "$(-2, 3)$", correct: true, feedback: "Real part along the horizontal axis, imaginary part up the vertical axis." },
        { text: "$(3, -2)$", feedback: "The coordinates are swapped. The real part comes first." },
        { text: "$(-2, 3i)$", feedback: "The coordinates are both real numbers: the imaginary part of $-2 + 3i$ is $3$, not $3i$." },
        { text: "$(2, -3)$", feedback: "That is $2 - 3i = -z$, the half-turn image of the point." },
      ],
      hint: "$x + iy$ sits at $(x, y)$.",
    },
    {
      type: "numeric",
      id: "cq3-1-q2",
      variant: "practice",
      question: "Find the distance between the points $2 - i$ and $-1 + 3i$.",
      answer: 5,
      hint: "Subtract the two numbers, then take the modulus of the result.",
      solution: "$(2 - i) - (-1 + 3i) = 3 - 4i$, and $|3 - 4i| = \\sqrt{9 + 16} = 5$.",
      commonMistakes: [
        { answer: 0.93, tolerance: 0.01, feedback: "That is $\\sqrt{10} - \\sqrt5 = |{-1} + 3i| - |2 - i|$. Distance is the modulus of the difference, not the difference of moduli." },
        { answer: 7, feedback: "You added $3 + 4$. The modulus is $\\sqrt{3^2 + 4^2}$, not $3 + 4$." },
      ],
    },
    {
      type: "quiz",
      id: "cq3-1-q3",
      variant: "concept",
      multiple: true,
      question: "Which of these numbers lie on the imaginary axis? Select all that apply.",
      options: [
        { text: "$5i$", correct: true, feedback: "Real part $0$: the point $(0, 5)$." },
        { text: "$0$", correct: true, feedback: "The origin lies on both axes." },
        { text: "$-i^2$", feedback: "$-i^2 = -(-1) = 1$, a real number on the real axis." },
        { text: "$i^3$", correct: true, feedback: "$i^3 = i^2 \\cdot i = -i$, the point $(0, -1)$." },
        { text: "$2 + 0i$", feedback: "That is the real number $2$." },
      ],
      hint: "Simplify each number to $x + iy$ first, then check whether $x = 0$.",
    },
    {
      type: "quiz",
      id: "cq3-1-q4",
      variant: "concept",
      question: "The point $-\\bar z$ is the image of the point $z$ under",
      options: [
        { text: "reflection in the imaginary axis", correct: true, feedback: "$x + iy \\mapsto -x + iy$: the imaginary part stays, the real part flips." },
        { text: "reflection in the real axis", feedback: "That is $\\bar z$ alone." },
        { text: "a half turn about the origin", feedback: "That is $-z$, which flips both coordinates." },
        { text: "a quarter turn about the origin", feedback: "That is $iz$, which sends $(x, y)$ to $(-y, x)$." },
      ],
      hint: "Write $z = x + iy$ and compute $-\\bar z$ coordinate by coordinate.",
    },
    {
      type: "numeric",
      id: "cq3-1-q5",
      variant: "practice",
      question: "The midpoint of the segment joining $3 + 5i$ and $-1 - i$ is $p + iq$. Enter $q$.",
      answer: 2,
      hint: "Midpoint $= \\frac{z_1 + z_2}{2}$.",
      solution: "$\\dfrac{(3 + 5i) + (-1 - i)}{2} = \\dfrac{2 + 4i}{2} = 1 + 2i$, so $q = 2$.",
      commonMistakes: [
        { answer: 1, feedback: "$1$ is the real part $p$. The question asks for the imaginary part." },
        { answer: 4, feedback: "You added the points but forgot to halve." },
        { answer: 3, feedback: "You subtracted the imaginary parts: $\\frac{5 - (-1)}{2} = 3$. The midpoint averages them: $\\frac{5 + (-1)}{2}$." },
      ],
    },
    {
      type: "numeric",
      id: "cq3-1-q6",
      variant: "practice",
      question: "$ABCD$ is a parallelogram (vertices in that order) with $A = -1$, $B = 2 + i$ and $C = 3 + 4i$. Find $|D|$.",
      answer: 3,
      hint: "The diagonals of a parallelogram bisect each other: $A + C = B + D$.",
      solution: "$D = A + C - B = -1 + (3 + 4i) - (2 + i) = 3i$, so $|D| = 3$.",
      commonMistakes: [
        { answer: 7.81, tolerance: 0.01, feedback: "You used $D = B + C - A = 6 + 5i$, which treats $A$ and $D$ as opposite. In $ABCD$, $A$ is opposite $C$." },
        { answer: 3.61, tolerance: 0.01, feedback: "That is $|A + B - C|$, the wrong pairing. $A$ and $C$ are opposite, so $D = A + C - B$." },
      ],
    },
    {
      type: "quiz",
      id: "cq3-1-q7",
      variant: "practice",
      question: "The triangle with vertices $0$, $4$ and $4 + 3i$ is",
      options: [
        { text: "right-angled and scalene", correct: true, feedback: "Sides $4$, $3$ and $5$: all different, and $3^2 + 4^2 = 5^2$, so the right angle is at $4$." },
        { text: "equilateral", feedback: "The sides are $4$, $|4 + 3i - 4| = 3$ and $|4 + 3i| = 5$." },
        { text: "isosceles but not right-angled", feedback: "No two of $4, 3, 5$ are equal." },
        { text: "obtuse-angled", feedback: "$3^2 + 4^2 = 5^2$ exactly, so the largest angle is exactly $90°$." },
      ],
      hint: "Find all three side lengths as moduli of differences.",
    },
    {
      type: "quiz",
      id: "cq3-1-q8",
      variant: "concept",
      multiple: true,
      question: "Which statements are true for every complex number $z$? Select all that apply.",
      options: [
        { text: "$|\\bar z| = |z|$", correct: true, feedback: "A reflection does not change the distance from $O$." },
        { text: "$|-z| = |z|$", correct: true, feedback: "A half turn about $O$ keeps distances from $O$." },
        { text: "$\\bar z$ is the reflection of $z$ in the imaginary axis", feedback: "$\\bar z$ flips the imaginary part: it is the reflection in the **real** axis." },
        { text: "$-z$ is the reflection of $z$ through the origin", correct: true, feedback: "$-z$ is the point diametrically opposite $z$, with $O$ as midpoint." },
        { text: "$|z| \\ge \\operatorname{Re} z$", correct: true, feedback: "$|z| = \\sqrt{x^2 + y^2} \\ge \\sqrt{x^2} = |x| \\ge x$." },
      ],
      hint: "Picture each move in the plane, and remember $|z| = \\sqrt{x^2 + y^2}$.",
    },
    {
      type: "numeric",
      id: "cq3-1-q9",
      variant: "practice",
      question: "JEE Main. For a real number $x$, the distance between $x + 2i$ and $1 - 2i$ is $5$. Find the sum of all possible values of $x$.",
      answer: 2,
      hint: "Write the distance as $\\sqrt{(x - 1)^2 + 4^2}$ and set it equal to 5.",
      solution: "$|(x - 1) + 4i| = 5$ gives $(x - 1)^2 + 16 = 25$, so $x - 1 = \\pm 3$ and $x = 4$ or $x = -2$. The sum is $2$.",
      commonMistakes: [
        { answer: 4, feedback: "That is only one of the two values. $(x - 1)^2 = 9$ has two square roots." },
        { answer: 6, feedback: "That is the difference of the two values, $4 - (-2)$. The question asks for their sum." },
      ],
    },
    {
      type: "quiz",
      id: "cq3-1-q10",
      variant: "practice",
      question: "JEE Main. The centroid of the triangle with vertices $1 + 2i$, $3 - i$ and $-1 + 2i$ is",
      options: [
        { text: "$1 + i$", correct: true, feedback: "$\\frac{(1 + 3 - 1) + (2 - 1 + 2)i}{3} = \\frac{3 + 3i}{3} = 1 + i$." },
        { text: "$3 + 3i$", feedback: "That is the sum of the vertices. Divide by 3." },
        { text: "$\\frac32 + \\frac32 i$", feedback: "You divided by 2. The centroid averages three points." },
        { text: "$1 + 2i$", feedback: "That is the first vertex, not the average of all three." },
      ],
      hint: "Centroid $= \\frac{z_1 + z_2 + z_3}{3}$.",
    },
    {
      type: "quiz",
      id: "cq3-1-q11",
      variant: "practice",
      question: "JEE Main. The points $z_1, z_2, z_3, z_4$, taken in order, are the vertices of a parallelogram. Which condition must hold?",
      options: [
        { text: "$z_1 + z_3 = z_2 + z_4$", correct: true, feedback: "Opposite vertices $z_1, z_3$ and $z_2, z_4$ give diagonals with a common midpoint." },
        { text: "$z_1 + z_2 = z_3 + z_4$", feedback: "$z_1, z_2$ are adjacent, not opposite. This would make the midpoints of two sides coincide." },
        { text: "$|z_1 - z_3| = |z_2 - z_4|$", feedback: "Equal diagonals make a rectangle. A general parallelogram's diagonals have different lengths." },
        { text: "$z_1 z_3 = z_2 z_4$", feedback: "The midpoint condition is about sums, not products." },
      ],
      hint: "The diagonals of a parallelogram bisect each other.",
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "argument-and-principal-argument",
  title: "3.2 · Argument and Principal Argument",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "A ship's navigator who knows only \"the harbour is 5 km away\" is lost: the harbour could be anywhere on a circle. She also needs a **bearing**. Complex numbers are the same. The modulus $|z|$ says how far the point is from the origin. The argument says in which direction it lies.",
    },
    { type: "heading", text: "The argument of a complex number" },
    {
      type: "callout",
      variant: "definition",
      title: "Argument",
      content:
        "For $z \\ne 0$, an **argument** of $z$ is any angle $\\theta$, measured from the positive real axis to the arrow $Oz$ (anticlockwise positive), so that\n\n$$z = |z|(\\cos\\theta + i\\sin\\theta).$$\n\nEquivalently, $\\cos\\theta = \\dfrac{x}{|z|}$ and $\\sin\\theta = \\dfrac{y}{|z|}$ for $z = x + iy$.",
    },
    {
      type: "text",
      content:
        "Turning a further full circle points the same way, so if $\\theta$ is an argument then so is $\\theta + 2k\\pi$ for every integer $k$. The set of all of them is written $\\arg z$. To have one definite answer we choose a representative.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Principal argument",
      content:
        "The **principal argument** $\\operatorname{Arg} z$ is the unique argument in the interval $(-\\pi, \\pi]$. Points above the real axis get $0 < \\operatorname{Arg} z < \\pi$, points below get $-\\pi < \\operatorname{Arg} z < 0$, and the negative real axis gets $\\pi$ (not $-\\pi$).\n\nThe argument of $0$ is **undefined**: the zero arrow has no direction.",
    },
    {
      type: "callout",
      variant: "info",
      title: "A note on conventions",
      content:
        "Some books use $[0, 2\\pi)$ for the principal value. JEE and NCERT use $(-\\pi, \\pi]$, and so does this course. When a question says \"principal argument\", give a value in $(-\\pi, \\pi]$.",
    },
    { type: "heading", text: "The quadrant rule" },
    {
      type: "text",
      content:
        "Never compute $\\tan^{-1}(y/x)$ and stop. That function only returns angles in $(-\\frac{\\pi}{2}, \\frac{\\pi}{2})$, the right half of the plane. Instead find the **acute reference angle**\n\n$$\\alpha = \\tan^{-1}\\left|\\frac{y}{x}\\right|, \\quad 0 \\le \\alpha \\le \\frac{\\pi}{2},$$\n\nthen place it in the right quadrant from a sketch.",
    },
    {
      type: "table",
      headers: ["Where $z = x + iy$ is", "Signs", "$\\operatorname{Arg} z$"],
      rows: [
        ["Quadrant I", "$x > 0,\\ y > 0$", "$\\alpha$"],
        ["Quadrant II", "$x < 0,\\ y > 0$", "$\\pi - \\alpha$"],
        ["Quadrant III", "$x < 0,\\ y < 0$", "$-(\\pi - \\alpha) = -\\pi + \\alpha$"],
        ["Quadrant IV", "$x > 0,\\ y < 0$", "$-\\alpha$"],
        ["Positive real axis", "$x > 0,\\ y = 0$", "$0$"],
        ["Negative real axis", "$x < 0,\\ y = 0$", "$\\pi$"],
        ["Positive imaginary axis", "$x = 0,\\ y > 0$", "$\\frac{\\pi}{2}$"],
        ["Negative imaginary axis", "$x = 0,\\ y < 0$", "$-\\frac{\\pi}{2}$"],
      ],
    },
    {
      type: "interactive",
      config: {
        component: "cq-argand-plane",
        mode: "point",
        z1: [-2, 2],
        show: ["unit-circle"],
        caption:
          "Drag $z$ into each quadrant and onto each axis. The orange arc is $\\operatorname{Arg} z$: anticlockwise (positive) above the real axis, clockwise (negative) below it. Watch the readout jump from about $+180°$ to about $-180°$ as $z$ crosses the negative real axis.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the principal argument is continuous everywhere except across the negative real axis, where it jumps by $2\\pi$. On that axis itself it is $\\pi$. This cut is the price of choosing one value out of infinitely many.",
    },
    { type: "heading", text: "Worked examples" },
    {
      type: "worked-example",
      id: "cq3-2-we1",
      title: "Worked example 1: second quadrant",
      problem: "Find $\\operatorname{Arg}(-1 + \\sqrt3\\, i)$.",
      steps: [
        { text: "Sketch: $x = -1 < 0$, $y = \\sqrt3 > 0$, so the point is in quadrant II. *Why this step:* the quadrant decides which formula from the table applies." },
        { text: "Reference angle: $\\alpha = \\tan^{-1}\\left|\\frac{\\sqrt3}{-1}\\right| = \\tan^{-1}\\sqrt3 = \\frac{\\pi}{3}$." },
        { latex: "\\operatorname{Arg} z = \\pi - \\frac{\\pi}{3} = \\frac{2\\pi}{3}" },
      ],
      answer: "$\\operatorname{Arg}(-1 + \\sqrt3\\, i) = \\frac{2\\pi}{3}$.",
    },
    {
      type: "worked-example",
      id: "cq3-2-we2",
      title: "Worked example 2: third quadrant",
      problem: "Find $\\operatorname{Arg}(-\\sqrt3 - i)$.",
      steps: [
        { text: "Both parts are negative: quadrant III, so the answer lies in $(-\\pi, -\\frac{\\pi}{2})$." },
        { text: "Reference angle: $\\alpha = \\tan^{-1}\\frac{1}{\\sqrt3} = \\frac{\\pi}{6}$." },
        { latex: "\\operatorname{Arg} z = -\\pi + \\frac{\\pi}{6} = -\\frac{5\\pi}{6}" },
        { text: "Check: $\\cos\\left(-\\frac{5\\pi}{6}\\right) = -\\frac{\\sqrt3}{2}$ and $\\sin\\left(-\\frac{5\\pi}{6}\\right) = -\\frac12$, and $|z| = 2$, so $2\\left(-\\frac{\\sqrt3}{2} - \\frac{i}{2}\\right) = -\\sqrt3 - i$. Correct." },
      ],
      answer: "$\\operatorname{Arg}(-\\sqrt3 - i) = -\\frac{5\\pi}{6}$ (not $\\frac{7\\pi}{6}$, which is outside $(-\\pi, \\pi]$).",
    },
    {
      type: "worked-example",
      id: "cq3-2-we3",
      title: "Worked example 3: points on the axes",
      problem: "Find the principal arguments of $-3$, $-4i$ and $7i$.",
      steps: [
        { text: "$-3$ lies on the negative real axis: $\\operatorname{Arg}(-3) = \\pi$. *Why this step:* the interval $(-\\pi, \\pi]$ includes $\\pi$ and excludes $-\\pi$." },
        { text: "$-4i$ lies on the negative imaginary axis: $\\operatorname{Arg}(-4i) = -\\frac{\\pi}{2}$." },
        { text: "$7i$ lies on the positive imaginary axis: $\\operatorname{Arg}(7i) = \\frac{\\pi}{2}$. The size of the number never matters, only its direction." },
      ],
      answer: "$\\pi$, $-\\frac{\\pi}{2}$ and $\\frac{\\pi}{2}$.",
    },
    {
      type: "worked-example",
      id: "cq3-2-we4",
      title: "Worked example 4: the general argument",
      problem: "Write down all the arguments of $-1 - i$.",
      steps: [
        { text: "Quadrant III with reference angle $\\frac{\\pi}{4}$, so $\\operatorname{Arg}(-1 - i) = -\\pi + \\frac{\\pi}{4} = -\\frac{3\\pi}{4}$." },
        { text: "Every other argument differs by whole turns." },
        { latex: "\\arg(-1 - i) = -\\frac{3\\pi}{4} + 2k\\pi, \\quad k \\in \\mathbb{Z}" },
      ],
      answer: "$-\\frac{3\\pi}{4} + 2k\\pi$ for integer $k$, for example $\\frac{5\\pi}{4}$, $-\\frac{11\\pi}{4}$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"$\\arg z = \\tan^{-1}\\frac{y}{x}$ in every quadrant\"",
      content:
        "For $z = -1 - i$, $\\tan^{-1}\\frac{-1}{-1} = \\tan^{-1} 1 = \\frac{\\pi}{4}$, which points into quadrant I, the exact opposite direction. The calculator cannot see the signs of $x$ and $y$ separately once you divide them. Always sketch the point, find the acute reference angle, then use the quadrant table.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Two quick rules from pictures",
      content:
        "- Reflecting in the real axis reverses the angle: $\\operatorname{Arg} \\bar z = -\\operatorname{Arg} z$, except on the negative real axis where both are $\\pi$.\n- A half turn adds or subtracts $\\pi$: $\\operatorname{Arg}(-z) = \\operatorname{Arg} z - \\pi$ if $\\operatorname{Arg} z > 0$, and $\\operatorname{Arg} z + \\pi$ if $\\operatorname{Arg} z \\le 0$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "cq3-2-q1",
      variant: "practice",
      question: "$\\operatorname{Arg}(-1 + i) = $",
      options: [
        { text: "$\\frac{3\\pi}{4}$", correct: true, feedback: "Quadrant II with reference angle $\\frac{\\pi}{4}$: $\\pi - \\frac{\\pi}{4}$." },
        { text: "$-\\frac{\\pi}{4}$", feedback: "That is $\\tan^{-1}\\frac{1}{-1}$, which points into quadrant IV. The point $(-1, 1)$ is in quadrant II." },
        { text: "$\\frac{\\pi}{4}$", feedback: "That is the reference angle only. The point is to the left of the imaginary axis." },
        { text: "$-\\frac{3\\pi}{4}$", feedback: "That is $\\operatorname{Arg}(-1 - i)$, below the real axis." },
      ],
      hint: "Sketch $(-1, 1)$: which quadrant, and what acute angle does it make with the real axis?",
    },
    {
      type: "numeric",
      id: "cq3-2-q2",
      variant: "practice",
      question: "$\\operatorname{Arg}(1 - \\sqrt3\\, i) = k\\pi$. Enter $k$ (a fraction like 2/3 is fine).",
      answer: -1 / 3,
      tolerance: 0.001,
      hint: "Quadrant IV: the principal argument is minus the reference angle.",
      solution: "$x = 1 > 0$, $y = -\\sqrt3 < 0$: quadrant IV. Reference angle $\\tan^{-1}\\sqrt3 = \\frac{\\pi}{3}$, so $\\operatorname{Arg} z = -\\frac{\\pi}{3}$ and $k = -\\frac13$.",
      commonMistakes: [
        { answer: 1 / 3, tolerance: 0.001, feedback: "The point is below the real axis, so its principal argument is negative." },
        { answer: 5 / 3, tolerance: 0.001, feedback: "$\\frac{5\\pi}{3}$ is an argument, but not the principal one: it lies outside $(-\\pi, \\pi]$." },
        { answer: -1 / 6, tolerance: 0.001, feedback: "$\\tan\\frac{\\pi}{6} = \\frac{1}{\\sqrt3}$, not $\\sqrt3$. The reference angle is $\\frac{\\pi}{3}$." },
      ],
    },
    {
      type: "numeric",
      id: "cq3-2-q3",
      variant: "practice",
      question: "Find $\\operatorname{Arg}(-\\sqrt3 - i)$ in degrees.",
      answer: -150,
      unit: "°",
      hint: "Quadrant III: $\\operatorname{Arg} z = -(180° - \\alpha)$.",
      solution: "Reference angle $\\tan^{-1}\\frac{1}{\\sqrt3} = 30°$. Quadrant III, so $\\operatorname{Arg} z = -(180° - 30°) = -150°$.",
      commonMistakes: [
        { answer: 30, feedback: "That is $\\tan^{-1}\\frac{-1}{-\\sqrt3}$, pointing into quadrant I. Both parts of $z$ are negative." },
        { answer: 210, feedback: "$210°$ is an argument but not the principal one, which must lie in $(-180°, 180°]$." },
        { answer: -30, feedback: "$-30°$ is in quadrant IV. The real part of $z$ is negative, so $z$ is in quadrant III." },
      ],
    },
    {
      type: "quiz",
      id: "cq3-2-q4",
      variant: "practice",
      question: "$\\operatorname{Arg}(-5) = $",
      options: [
        { text: "$\\pi$", correct: true, feedback: "$-5$ is on the negative real axis, and $(-\\pi, \\pi]$ contains $\\pi$." },
        { text: "$-\\pi$", feedback: "$-\\pi$ is an argument, but the principal interval $(-\\pi, \\pi]$ excludes it." },
        { text: "$0$", feedback: "$0$ is the direction of the positive real axis. A negative number points the other way." },
        { text: "undefined", feedback: "Only $\\arg 0$ is undefined. $-5$ is a non-zero arrow." },
      ],
      hint: "Which way does the arrow from $0$ to $-5$ point?",
    },
    {
      type: "quiz",
      id: "cq3-2-q5",
      variant: "concept",
      multiple: true,
      question: "Which numbers have principal argument in the interval $\\left(\\frac{\\pi}{2}, \\pi\\right]$? Select all that apply.",
      options: [
        { text: "$-2 + i$", correct: true, feedback: "Quadrant II: the argument is between $\\frac{\\pi}{2}$ and $\\pi$." },
        { text: "$-3$", correct: true, feedback: "$\\operatorname{Arg}(-3) = \\pi$, the right-hand end of the interval, which is included." },
        { text: "$-1 - i$", feedback: "Quadrant III: $\\operatorname{Arg} = -\\frac{3\\pi}{4}$, a negative angle." },
        { text: "$2i$", feedback: "$\\operatorname{Arg}(2i) = \\frac{\\pi}{2}$, which the open end of the interval excludes." },
        { text: "$-\\sqrt3 + i$", correct: true, feedback: "Quadrant II: $\\operatorname{Arg} = \\frac{5\\pi}{6}$." },
      ],
      hint: "$\\left(\\frac{\\pi}{2}, \\pi\\right]$ is quadrant II together with the negative real axis.",
    },
    {
      type: "quiz",
      id: "cq3-2-q6",
      variant: "concept",
      question: "What is $\\arg 0$?",
      options: [
        { text: "It is undefined", correct: true, feedback: "The zero arrow has no direction: $0 = 0(\\cos\\theta + i\\sin\\theta)$ for every $\\theta$." },
        { text: "$0$", feedback: "Every $\\theta$ works in $0 = 0 \\cdot (\\cos\\theta + i\\sin\\theta)$, so no single value is singled out." },
        { text: "$\\pi$", feedback: "$\\pi$ is the argument of negative real numbers, not of zero." },
        { text: "$\\frac{\\pi}{2}$", feedback: "There is no reason to prefer the imaginary axis. Zero has no direction at all." },
      ],
      hint: "Can you tell which direction an arrow of length zero points?",
    },
    {
      type: "numeric",
      id: "cq3-2-q7",
      variant: "practice",
      question: "$\\operatorname{Arg}(-4i) = k\\pi$. Enter $k$.",
      answer: -0.5,
      tolerance: 0.001,
      hint: "$-4i$ lies on the negative imaginary axis.",
      solution: "The arrow from $0$ to $-4i$ points straight down, a quarter turn clockwise: $\\operatorname{Arg}(-4i) = -\\frac{\\pi}{2}$, so $k = -\\frac12$.",
      commonMistakes: [
        { answer: 0.5, tolerance: 0.001, feedback: "$\\frac{\\pi}{2}$ is the direction of $+i$. The point $-4i$ is below the real axis." },
        { answer: 1.5, tolerance: 0.001, feedback: "$\\frac{3\\pi}{2}$ is outside the principal interval $(-\\pi, \\pi]$." },
      ],
    },
    {
      type: "quiz",
      id: "cq3-2-q8",
      variant: "concept",
      question: "If $\\operatorname{Arg} z = \\frac{2\\pi}{3}$, then $\\operatorname{Arg}(-z) = $",
      options: [
        { text: "$-\\frac{\\pi}{3}$", correct: true, feedback: "A half turn adds $\\pi$: $\\frac{2\\pi}{3} + \\pi = \\frac{5\\pi}{3}$, which is $-\\frac{\\pi}{3}$ in $(-\\pi, \\pi]$." },
        { text: "$-\\frac{2\\pi}{3}$", feedback: "That is $\\operatorname{Arg} \\bar z$, the reflection in the real axis, not the half turn." },
        { text: "$\\frac{5\\pi}{3}$", feedback: "Right direction, but outside the principal interval. Subtract $2\\pi$." },
        { text: "$\\frac{\\pi}{3}$", feedback: "That is $\\operatorname{Arg}(-\\bar z)$, the reflection in the imaginary axis." },
      ],
      hint: "$-z$ is $z$ turned through half a turn about the origin.",
    },
    {
      type: "quiz",
      id: "cq3-2-q9",
      variant: "practice",
      question: "JEE Main. The principal argument of $(1 + i\\sqrt3)^2$ is",
      options: [
        { text: "$\\frac{2\\pi}{3}$", correct: true, feedback: "$(1 + i\\sqrt3)^2 = 1 - 3 + 2\\sqrt3\\, i = -2 + 2\\sqrt3\\, i$: quadrant II with reference angle $\\frac{\\pi}{3}$." },
        { text: "$\\frac{\\pi}{3}$", feedback: "That is the argument of $1 + i\\sqrt3$ itself, before squaring." },
        { text: "$-\\frac{\\pi}{3}$", feedback: "Check the sign of the imaginary part of the square: $2\\sqrt3 > 0$." },
        { text: "$\\frac{4\\pi}{3}$", feedback: "Squaring doubled $\\frac{\\pi}{3}$ to $\\frac{2\\pi}{3}$, not quadrupled it." },
      ],
      hint: "Expand the square into $x + iy$, then use the quadrant rule.",
    },
    {
      type: "quiz",
      id: "cq3-2-q10",
      variant: "practice",
      multiple: true,
      question: "JEE Advanced. For every non-zero complex number $z$, which statements about principal arguments are true? Select all that apply.",
      options: [
        { text: "$\\operatorname{Arg}(-z) - \\operatorname{Arg} z = \\pm\\pi$", correct: true, feedback: "A half turn changes the direction by $\\pi$, and keeping the answer in $(-\\pi, \\pi]$ only decides the sign." },
        { text: "$\\operatorname{Arg} z + \\operatorname{Arg} \\bar z$ is $0$ or $2\\pi$", correct: true, feedback: "It is $0$ off the negative real axis and $\\pi + \\pi = 2\\pi$ on it." },
        { text: "$\\operatorname{Arg}(2z) = \\operatorname{Arg} z$", correct: true, feedback: "Scaling by a positive real number keeps the direction." },
        { text: "$\\operatorname{Arg} \\bar z = -\\operatorname{Arg} z$", feedback: "It fails on the negative real axis: $\\operatorname{Arg}(-1) = \\pi = \\operatorname{Arg}(\\overline{-1})$, not $-\\pi$." },
        { text: "$\\operatorname{Arg}(iz) = \\operatorname{Arg} z + \\frac{\\pi}{2}$", feedback: "Fails for $z = -1$: $\\operatorname{Arg}(-i) = -\\frac{\\pi}{2}$, not $\\frac{3\\pi}{2}$. Adding angles can leave the principal interval." },
      ],
      hint: "Test each statement on awkward points: the negative real axis and points in quadrant II.",
    },
    {
      type: "numeric",
      id: "cq3-2-q11",
      variant: "practice",
      question: "JEE Main. Find the principal argument of $z = \\dfrac{-2}{1 + i\\sqrt3}$ in degrees.",
      answer: 120,
      unit: "°",
      hint: "Rationalise: multiply top and bottom by $1 - i\\sqrt3$.",
      solution: "$z = \\dfrac{-2(1 - i\\sqrt3)}{1 + 3} = \\dfrac{-1 + i\\sqrt3}{2}$. Quadrant II, reference angle $60°$, so $\\operatorname{Arg} z = 180° - 60° = 120°$.",
      commonMistakes: [
        { answer: -60, feedback: "$-60°$ is the argument of $\\frac{1 - i\\sqrt3}{2}$. The factor $-2$ also flips the direction." },
        { answer: 60, feedback: "Check the real part: $-\\frac12 < 0$, so the point is in quadrant II." },
        { answer: -120, feedback: "The imaginary part $\\frac{\\sqrt3}{2}$ is positive, so the argument is positive." },
      ],
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "polar-form",
  title: "3.3 · Polar Form",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "There are two natural ways to give directions to a point. \"Walk 3 east and 4 north\" is Cartesian: $3 + 4i$. \"Walk 5 in the direction $53.1°$ north of east\" is polar: distance and bearing. Both describe the same point, but each makes different jobs easy. Addition is easy in Cartesian form. Multiplication, powers and roots, as the next lessons show, are easy in polar form.",
    },
    { type: "heading", text: "The polar form" },
    {
      type: "callout",
      variant: "definition",
      title: "Polar (modulus-argument) form",
      content:
        "Every non-zero complex number can be written\n\n$$z = r(\\cos\\theta + i\\sin\\theta), \\qquad r = |z| > 0,\\ \\theta = \\arg z.$$\n\nWith the principal argument this form is unique. It is often abbreviated $z = r\\operatorname{cis}\\theta$.",
    },
    {
      type: "text",
      content:
        "The derivation is just the definition of sine and cosine. If the arrow $Oz$ has length $r$ and makes angle $\\theta$ with the real axis, dropping a perpendicular to the real axis makes a right triangle with legs $x = r\\cos\\theta$ and $y = r\\sin\\theta$. Then $z = x + iy = r\\cos\\theta + i\\,r\\sin\\theta$.",
    },
    {
      type: "math",
      latex:
        "\\text{polar} \\to \\text{Cartesian: } x = r\\cos\\theta,\\ y = r\\sin\\theta \\qquad \\text{Cartesian} \\to \\text{polar: } r = \\sqrt{x^2 + y^2},\\ \\theta = \\operatorname{Arg} z",
    },
    {
      type: "interactive",
      config: {
        component: "cq-argand-plane",
        mode: "point",
        z1: [1, 1],
        show: ["unit-circle"],
        caption:
          "Drag $z$ around. The readout shows the same point three ways: $x + iy$, the polar form $r(\\cos\\theta + i\\sin\\theta)$ and the Euler form $re^{i\\theta}$ of the next lesson. The dashed lines are $x = r\\cos\\theta$ and $y = r\\sin\\theta$.",
      },
    },
    { type: "heading", text: "Converting between forms" },
    {
      type: "worked-example",
      id: "cq3-3-we1",
      title: "Worked example 1: Cartesian to polar",
      problem: "Write $1 + i$ in polar form.",
      steps: [
        { text: "$r = \\sqrt{1 + 1} = \\sqrt2$." },
        { text: "The point is in quadrant I with $\\tan\\alpha = 1$, so $\\theta = \\frac{\\pi}{4}$." },
        { latex: "1 + i = \\sqrt2\\left(\\cos\\frac{\\pi}{4} + i\\sin\\frac{\\pi}{4}\\right)" },
      ],
      answer: "$1 + i = \\sqrt2\\left(\\cos\\frac{\\pi}{4} + i\\sin\\frac{\\pi}{4}\\right)$.",
    },
    {
      type: "worked-example",
      id: "cq3-3-we2",
      title: "Worked example 2: a second-quadrant number",
      problem: "Write $-\\sqrt3 + i$ in polar form with the principal argument.",
      steps: [
        { text: "$r = \\sqrt{3 + 1} = 2$." },
        { text: "Quadrant II, reference angle $\\tan^{-1}\\frac{1}{\\sqrt3} = \\frac{\\pi}{6}$, so $\\theta = \\pi - \\frac{\\pi}{6} = \\frac{5\\pi}{6}$." },
        { latex: "-\\sqrt3 + i = 2\\left(\\cos\\frac{5\\pi}{6} + i\\sin\\frac{5\\pi}{6}\\right)" },
      ],
      answer: "$2\\left(\\cos\\frac{5\\pi}{6} + i\\sin\\frac{5\\pi}{6}\\right)$.",
    },
    {
      type: "worked-example",
      id: "cq3-3-we3",
      title: "Worked example 3: polar to Cartesian",
      problem: "Write $4\\left(\\cos\\left(-\\frac{2\\pi}{3}\\right) + i\\sin\\left(-\\frac{2\\pi}{3}\\right)\\right)$ in the form $x + iy$.",
      steps: [
        { text: "$\\cos\\left(-\\frac{2\\pi}{3}\\right) = -\\frac12$ and $\\sin\\left(-\\frac{2\\pi}{3}\\right) = -\\frac{\\sqrt3}{2}$." },
        { latex: "4\\left(-\\frac12 - \\frac{\\sqrt3}{2}i\\right) = -2 - 2\\sqrt3\\, i" },
      ],
      answer: "$-2 - 2\\sqrt3\\, i$.",
    },
    { type: "heading", text: "Forms that look polar but are not" },
    {
      type: "text",
      content:
        "The polar form has a strict shape: a **positive** number times $(\\cos\\theta + i\\sin\\theta)$, with the **same** angle in both places, cosine first and a **plus** sign. JEE questions love expressions that break one of these rules. Rewrite them with the identities $\\cos(-\\theta) = \\cos\\theta$, $\\sin(-\\theta) = -\\sin\\theta$, $\\cos(\\theta + \\pi) = -\\cos\\theta$ and $\\cos\\left(\\frac{\\pi}{2} - \\theta\\right) = \\sin\\theta$.",
    },
    {
      type: "table",
      headers: ["Expression", "True polar form", "Modulus, argument"],
      rows: [
        ["$\\cos\\theta - i\\sin\\theta$", "$\\cos(-\\theta) + i\\sin(-\\theta)$", "$1,\\ -\\theta$"],
        ["$\\sin\\theta + i\\cos\\theta$", "$\\cos\\left(\\frac{\\pi}{2} - \\theta\\right) + i\\sin\\left(\\frac{\\pi}{2} - \\theta\\right)$", "$1,\\ \\frac{\\pi}{2} - \\theta$"],
        ["$-r(\\cos\\theta + i\\sin\\theta)$, $r > 0$", "$r\\left(\\cos(\\theta + \\pi) + i\\sin(\\theta + \\pi)\\right)$", "$r,\\ \\theta \\pm \\pi$"],
      ],
    },
    {
      type: "worked-example",
      id: "cq3-3-we4",
      title: "Worked example 4: the half-angle trick",
      problem: "For $0 < \\alpha < \\pi$, find the modulus and principal argument of $z = 1 - \\cos\\alpha + i\\sin\\alpha$.",
      steps: [
        { text: "Use $1 - \\cos\\alpha = 2\\sin^2\\frac{\\alpha}{2}$ and $\\sin\\alpha = 2\\sin\\frac{\\alpha}{2}\\cos\\frac{\\alpha}{2}$. *Why this step:* both parts then share the factor $2\\sin\\frac{\\alpha}{2}$." },
        { latex: "z = 2\\sin\\tfrac{\\alpha}{2}\\left(\\sin\\tfrac{\\alpha}{2} + i\\cos\\tfrac{\\alpha}{2}\\right)" },
        { text: "The bracket is the wrong shape (sine first), so rewrite it: $\\sin\\frac{\\alpha}{2} = \\cos\\left(\\frac{\\pi}{2} - \\frac{\\alpha}{2}\\right)$ and $\\cos\\frac{\\alpha}{2} = \\sin\\left(\\frac{\\pi}{2} - \\frac{\\alpha}{2}\\right)$." },
        { latex: "z = 2\\sin\\tfrac{\\alpha}{2}\\left(\\cos\\tfrac{\\pi - \\alpha}{2} + i\\sin\\tfrac{\\pi - \\alpha}{2}\\right)" },
        { text: "For $0 < \\alpha < \\pi$, the factor $2\\sin\\frac{\\alpha}{2}$ is positive and $\\frac{\\pi - \\alpha}{2}$ lies in $\\left(0, \\frac{\\pi}{2}\\right)$, inside the principal range. *Why this step:* the form is only the polar form once the front factor is checked to be positive." },
      ],
      answer: "$|z| = 2\\sin\\frac{\\alpha}{2}$ and $\\operatorname{Arg} z = \\frac{\\pi - \\alpha}{2}$.",
    },
    {
      type: "worked-example",
      id: "cq3-3-we5",
      title: "Worked example 5: when the front factor turns negative",
      problem: "Find the modulus and principal argument of $z = 1 + \\cos\\alpha + i\\sin\\alpha$ when $\\pi < \\alpha < 2\\pi$.",
      steps: [
        { text: "Half-angle identities: $1 + \\cos\\alpha = 2\\cos^2\\frac{\\alpha}{2}$ and $\\sin\\alpha = 2\\sin\\frac{\\alpha}{2}\\cos\\frac{\\alpha}{2}$, so $z = 2\\cos\\frac{\\alpha}{2}\\left(\\cos\\frac{\\alpha}{2} + i\\sin\\frac{\\alpha}{2}\\right)$." },
        { text: "Now $\\frac{\\alpha}{2} \\in \\left(\\frac{\\pi}{2}, \\pi\\right)$, so $\\cos\\frac{\\alpha}{2} < 0$. The front factor is **negative**, so this is not yet polar form." },
        { text: "Absorb the minus sign as a half turn: $-1 = \\cos(-\\pi) + i\\sin(-\\pi)$." },
        { latex: "z = \\left(-2\\cos\\tfrac{\\alpha}{2}\\right)\\left(\\cos\\left(\\tfrac{\\alpha}{2} - \\pi\\right) + i\\sin\\left(\\tfrac{\\alpha}{2} - \\pi\\right)\\right)" },
        { text: "$\\frac{\\alpha}{2} - \\pi \\in \\left(-\\frac{\\pi}{2}, 0\\right)$, inside the principal range." },
      ],
      answer: "$|z| = -2\\cos\\frac{\\alpha}{2}$ and $\\operatorname{Arg} z = \\frac{\\alpha}{2} - \\pi$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"$-2(\\cos\\theta + i\\sin\\theta)$ has modulus $-2$\"",
      content:
        "A modulus is a distance and is never negative. The minus sign is a half turn: $-2(\\cos\\theta + i\\sin\\theta) = 2\\left(\\cos(\\theta + \\pi) + i\\sin(\\theta + \\pi)\\right)$, with modulus $2$ and argument $\\theta + \\pi$ (shifted by $2\\pi$ if needed to land in $(-\\pi, \\pi]$). Before reading off $r$ and $\\theta$, always check the front factor is positive and the bracket is exactly $\\cos\\theta + i\\sin\\theta$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "cq3-3-q1",
      variant: "practice",
      question: "The polar form of $-1 - i$ (principal argument) is",
      options: [
        { text: "$\\sqrt2\\left(\\cos\\left(-\\frac{3\\pi}{4}\\right) + i\\sin\\left(-\\frac{3\\pi}{4}\\right)\\right)$", correct: true, feedback: "Modulus $\\sqrt2$, quadrant III with reference angle $\\frac{\\pi}{4}$." },
        { text: "$\\sqrt2\\left(\\cos\\frac{\\pi}{4} + i\\sin\\frac{\\pi}{4}\\right)$", feedback: "That is $1 + i$, the opposite point." },
        { text: "$-\\sqrt2\\left(\\cos\\frac{\\pi}{4} + i\\sin\\frac{\\pi}{4}\\right)$", feedback: "This equals $-1 - i$, but a negative front factor is not polar form." },
        { text: "$2\\left(\\cos\\left(-\\frac{3\\pi}{4}\\right) + i\\sin\\left(-\\frac{3\\pi}{4}\\right)\\right)$", feedback: "$|-1 - i| = \\sqrt{1 + 1} = \\sqrt2$, not $2$." },
      ],
      hint: "Find $r$ first, then the quadrant and the reference angle.",
    },
    {
      type: "numeric",
      id: "cq3-3-q2",
      variant: "practice",
      question: "Write $6\\left(\\cos\\frac{5\\pi}{6} + i\\sin\\frac{5\\pi}{6}\\right)$ as $x + iy$. Enter $x$ to two decimal places.",
      answer: -5.196,
      tolerance: 0.01,
      hint: "$x = r\\cos\\theta$ and $\\cos\\frac{5\\pi}{6} = -\\frac{\\sqrt3}{2}$.",
      solution: "$x = 6\\cos\\frac{5\\pi}{6} = 6 \\cdot \\left(-\\frac{\\sqrt3}{2}\\right) = -3\\sqrt3 \\approx -5.20$ (and $y = 6 \\cdot \\frac12 = 3$).",
      commonMistakes: [
        { answer: 5.196, tolerance: 0.01, feedback: "$\\frac{5\\pi}{6}$ is in quadrant II, where cosine is negative." },
        { answer: 3, feedback: "$3$ is the imaginary part $y = 6\\sin\\frac{5\\pi}{6}$. The question asks for the real part." },
      ],
    },
    {
      type: "quiz",
      id: "cq3-3-q3",
      variant: "concept",
      question: "The polar form of $2(\\cos\\theta - i\\sin\\theta)$ is",
      options: [
        { text: "$2\\left(\\cos(-\\theta) + i\\sin(-\\theta)\\right)$", correct: true, feedback: "$\\cos(-\\theta) = \\cos\\theta$ and $\\sin(-\\theta) = -\\sin\\theta$, so the minus moves into the angle." },
        { text: "$-2\\left(\\cos\\theta + i\\sin\\theta\\right)$", feedback: "That changes the real part's sign too: it equals $-2\\cos\\theta - 2i\\sin\\theta$." },
        { text: "$2\\left(\\cos\\theta + i\\sin\\theta\\right)$", feedback: "That is the conjugate of the given number." },
        { text: "$2\\left(\\cos(\\pi - \\theta) + i\\sin(\\pi - \\theta)\\right)$", feedback: "$\\cos(\\pi - \\theta) = -\\cos\\theta$, so the real part would flip." },
      ],
      hint: "Which angle has the same cosine as $\\theta$ but the opposite sine?",
    },
    {
      type: "quiz",
      id: "cq3-3-q4",
      variant: "concept",
      multiple: true,
      question: "Which of these are written in polar form $r(\\cos\\theta + i\\sin\\theta)$ with $r > 0$, exactly as they stand? Select all that apply.",
      options: [
        { text: "$3(\\cos 40° + i\\sin 40°)$", correct: true, feedback: "Positive front factor, same angle, cosine first, plus sign." },
        { text: "$-3(\\cos 40° + i\\sin 40°)$", feedback: "The front factor is negative. As polar form this is $3(\\cos 220° + i\\sin 220°)$, that is $3(\\cos(-140°) + i\\sin(-140°))$." },
        { text: "$3(\\cos 40° - i\\sin 40°)$", feedback: "Minus sign. Its polar form is $3(\\cos(-40°) + i\\sin(-40°))$." },
        { text: "$3(\\sin 40° + i\\cos 40°)$", feedback: "Sine first. Its polar form is $3(\\cos 50° + i\\sin 50°)$." },
        { text: "$\\sqrt2\\left(\\cos\\left(-\\frac{\\pi}{4}\\right) + i\\sin\\left(-\\frac{\\pi}{4}\\right)\\right)$", correct: true, feedback: "A negative angle is fine: this is $1 - i$ in polar form." },
      ],
      hint: "Check three things: front factor positive, the same angle in both places, and the exact pattern $\\cos + i\\sin$.",
    },
    {
      type: "numeric",
      id: "cq3-3-q5",
      variant: "practice",
      question: "Find $|z|$ for $z = -4(\\cos 20° + i\\sin 20°)$.",
      answer: 4,
      hint: "Modulus is a distance. What does the factor $-1$ do to distance from $O$?",
      solution: "$|z| = |-4| \\cdot |\\cos 20° + i\\sin 20°| = 4 \\cdot 1 = 4$.",
      commonMistakes: [{ answer: -4, feedback: "A modulus is never negative. The $-1$ is a half turn, which does not change length." }],
    },
    {
      type: "numeric",
      id: "cq3-3-q6",
      variant: "practice",
      question: "Find the principal argument of $z = -4(\\cos 20° + i\\sin 20°)$ in degrees.",
      answer: -160,
      unit: "°",
      hint: "The minus sign is a half turn: add $180°$, then bring the angle into $(-180°, 180°]$.",
      solution: "$z = 4(\\cos 200° + i\\sin 200°)$ and $200° - 360° = -160°$.",
      commonMistakes: [
        { answer: 20, feedback: "The factor $-4$ is negative, so $20°$ is not the argument of $z$ itself." },
        { answer: 200, feedback: "Correct direction, but $200°$ is outside $(-180°, 180°]$. Subtract $360°$." },
        { answer: 160, feedback: "$z$ points into quadrant III (both parts negative), so its principal argument is negative." },
      ],
    },
    {
      type: "numeric",
      id: "cq3-3-q7",
      variant: "practice",
      question: "Find the principal argument of $\\sin\\frac{\\pi}{6} + i\\cos\\frac{\\pi}{6}$ in degrees.",
      answer: 60,
      unit: "°",
      hint: "$\\sin\\theta + i\\cos\\theta = \\cos\\left(90° - \\theta\\right) + i\\sin\\left(90° - \\theta\\right)$.",
      solution: "The number is $\\frac12 + \\frac{\\sqrt3}{2}i = \\cos 60° + i\\sin 60°$, so the argument is $90° - 30° = 60°$.",
      commonMistakes: [{ answer: 30, feedback: "The sine comes first here, so the angle is not $30°$. Rewrite it as $\\cos 60° + i\\sin 60°$." }],
    },
    {
      type: "quiz",
      id: "cq3-3-q8",
      variant: "practice",
      question: "For $0 < \\alpha < \\pi$, the modulus of $1 - \\cos\\alpha + i\\sin\\alpha$ is",
      options: [
        { text: "$2\\sin\\frac{\\alpha}{2}$", correct: true, feedback: "$|z|^2 = (1 - \\cos\\alpha)^2 + \\sin^2\\alpha = 2 - 2\\cos\\alpha = 4\\sin^2\\frac{\\alpha}{2}$." },
        { text: "$2\\cos\\frac{\\alpha}{2}$", feedback: "That is the modulus of $1 + \\cos\\alpha + i\\sin\\alpha$." },
        { text: "$\\sqrt2$", feedback: "That would need $\\cos\\alpha = 0$. In general $|z|^2 = 2 - 2\\cos\\alpha$." },
        { text: "$1$", feedback: "$|\\cos\\alpha + i\\sin\\alpha| = 1$, but here the real part is $1 - \\cos\\alpha$." },
      ],
      hint: "Compute $|z|^2 = (1 - \\cos\\alpha)^2 + \\sin^2\\alpha$ and use a half-angle identity.",
    },
    {
      type: "numeric",
      id: "cq3-3-q9",
      variant: "practice",
      question: "JEE Main. Find the principal argument, in degrees, of $z = 1 + \\cos\\frac{6\\pi}{5} + i\\sin\\frac{6\\pi}{5}$.",
      answer: -72,
      unit: "°",
      hint: "Write $z = 2\\cos\\frac{\\alpha}{2}\\left(\\cos\\frac{\\alpha}{2} + i\\sin\\frac{\\alpha}{2}\\right)$ with $\\alpha = 216°$ and check the sign of the front factor.",
      solution: "With $\\alpha = 216°$, $z = 2\\cos 108°\\,(\\cos 108° + i\\sin 108°)$. Since $\\cos 108° < 0$, write $z = (-2\\cos 108°)\\left(\\cos(108° - 180°) + i\\sin(108° - 180°)\\right)$, so $\\operatorname{Arg} z = -72°$.",
      commonMistakes: [
        { answer: 108, feedback: "The front factor $2\\cos 108°$ is negative. Absorb it as a half turn: $108° - 180°$." },
        { answer: 216, feedback: "$216°$ is the angle of $\\cos\\alpha + i\\sin\\alpha$. Adding $1$ changes the direction." },
        { answer: -144, feedback: "That is $216° - 360°$, the argument of $e^{i\\alpha}$, not of $1 + e^{i\\alpha}$." },
      ],
    },
    {
      type: "quiz",
      id: "cq3-3-q10",
      variant: "practice",
      question: "JEE Advanced. Let $\\frac{\\pi}{2} < \\alpha < \\pi$ and $z = 1 + i\\tan\\alpha$. Then the modulus and principal argument of $z$ are",
      options: [
        { text: "$-\\sec\\alpha$ and $\\alpha - \\pi$", correct: true, feedback: "$z = \\dfrac{\\cos\\alpha + i\\sin\\alpha}{\\cos\\alpha}$ with $\\cos\\alpha < 0$, so $z = (-\\sec\\alpha)\\left(\\cos(\\alpha - \\pi) + i\\sin(\\alpha - \\pi)\\right)$, and $\\alpha - \\pi \\in \\left(-\\frac{\\pi}{2}, 0\\right)$." },
        { text: "$\\sec\\alpha$ and $\\alpha$", feedback: "$\\sec\\alpha < 0$ here, so it cannot be a modulus." },
        { text: "$-\\sec\\alpha$ and $\\alpha$", feedback: "Right modulus, but $z$ has real part $1 > 0$, so its argument cannot be the obtuse angle $\\alpha$." },
        { text: "$\\sec\\alpha$ and $\\alpha - \\pi$", feedback: "Right argument, but $\\sec\\alpha$ is negative for an obtuse angle." },
      ],
      hint: "Write $1 + i\\tan\\alpha = \\sec\\alpha(\\cos\\alpha + i\\sin\\alpha)$ and check the sign of $\\sec\\alpha$.",
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "euler-form",
  title: "3.4 · Euler Form",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "Richard Feynman, aged 14, wrote in his notebook that this was \"the most remarkable formula in mathematics\":\n\n$$e^{i\\pi} + 1 = 0.$$\n\nIt ties together the five most important constants, $0$, $1$, $e$, $i$ and $\\pi$. By the end of this lesson it will look not mysterious but obvious: it says that turning through half a turn sends $1$ to $-1$.",
    },
    { type: "heading", text: "Why cos θ + i sin θ behaves like an exponential" },
    {
      type: "text",
      content:
        "Let $f(\\theta) = \\cos\\theta + i\\sin\\theta$, the point at angle $\\theta$ on the unit circle. Differentiate with respect to $\\theta$, treating $i$ as a constant:",
    },
    {
      type: "math",
      latex:
        "f'(\\theta) = -\\sin\\theta + i\\cos\\theta = i(\\cos\\theta + i\\sin\\theta) = i\\,f(\\theta), \\qquad f(0) = 1",
    },
    {
      type: "text",
      content:
        "A function whose derivative is a constant $k$ times itself, starting at $1$, is $e^{k\\theta}$: that is the defining property of the exponential. Here $k = i$. So it is natural to **define** $e^{i\\theta}$ as $\\cos\\theta + i\\sin\\theta$, and everything we know about exponentials will hold. The power series tell the same story: putting $x = i\\theta$ into $e^x = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\cdots$ and using $i^2 = -1$ splits it into the series for $\\cos\\theta$ and $i\\sin\\theta$.",
    },
    {
      type: "math",
      latex:
        "e^{i\\theta} = \\left(1 - \\frac{\\theta^2}{2!} + \\frac{\\theta^4}{4!} - \\cdots\\right) + i\\left(\\theta - \\frac{\\theta^3}{3!} + \\frac{\\theta^5}{5!} - \\cdots\\right) = \\cos\\theta + i\\sin\\theta",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Euler's formula and the Euler form",
      content:
        "$$e^{i\\theta} = \\cos\\theta + i\\sin\\theta \\quad (\\theta \\text{ in radians}).$$\n\nSo every non-zero complex number has the compact **Euler (exponential) form** $z = re^{i\\theta}$, where $r = |z|$ and $\\theta = \\arg z$.",
    },
    { type: "heading", text: "Reading e^(iθ) on the unit circle" },
    {
      type: "table",
      headers: ["Fact", "Reason"],
      rows: [
        ["$|e^{i\\theta}| = 1$", "$\\cos^2\\theta + \\sin^2\\theta = 1$: always on the unit circle"],
        ["$e^{i\\pi} = -1$, $e^{i\\pi/2} = i$, $e^{2\\pi i} = 1$", "half turn, quarter turn, full turn"],
        ["$e^{i(\\theta + 2\\pi)} = e^{i\\theta}$", "a full extra turn changes nothing"],
        ["$\\overline{e^{i\\theta}} = e^{-i\\theta} = \\dfrac{1}{e^{i\\theta}}$", "reflection in the real axis reverses the angle"],
        ["$e^{i\\alpha}e^{i\\beta} = e^{i(\\alpha + \\beta)}$", "the angle-addition formulas (lesson 3.5)"],
      ],
    },
    {
      type: "interactive",
      config: {
        component: "cq-argand-plane",
        mode: "point",
        z1: [0.6, 0.8],
        snap: 0.1,
        show: ["unit-circle", "conjugate"],
        window: { xmin: -2, xmax: 2, ymin: -2, ymax: 2 },
        caption:
          "$z = 0.6 + 0.8i$ sits on the unit circle, so its Euler form is $e^{i\\theta}$ with no front factor. Its conjugate $e^{-i\\theta}$ is the mirror point. Drag $z$ off the circle and a modulus $r$ appears in front.",
      },
    },
    {
      type: "interactive",
      config: {
        component: "cq-argand-plane",
        mode: "powers",
        z1: [0.8, 0.6],
        snap: 0.1,
        n: { min: 1, max: 12, initial: 6 },
        show: ["unit-circle"],
        window: { xmin: -2, xmax: 2, ymin: -2, ymax: 2 },
        caption:
          "Powers of a number on the unit circle: $\\left(e^{i\\theta}\\right)^n = e^{in\\theta}$ walks round the circle in equal steps of $\\theta$. Drag $z$ slightly outside the circle and the walk spirals outward instead.",
      },
    },
    { type: "heading", text: "Cosine and sine from exponentials" },
    {
      type: "text",
      content:
        "Add and subtract $e^{i\\theta} = \\cos\\theta + i\\sin\\theta$ and $e^{-i\\theta} = \\cos\\theta - i\\sin\\theta$:",
    },
    {
      type: "math",
      latex: "\\cos\\theta = \\frac{e^{i\\theta} + e^{-i\\theta}}{2}, \\qquad \\sin\\theta = \\frac{e^{i\\theta} - e^{-i\\theta}}{2i}",
    },
    {
      type: "text",
      content:
        "These turn trigonometry into algebra. For $z = e^{i\\theta}$ they say $z + \\frac1z = 2\\cos\\theta$ and $z - \\frac1z = 2i\\sin\\theta$, a pair JEE uses again and again.",
    },
    { type: "heading", text: "Worked examples" },
    {
      type: "worked-example",
      id: "cq3-4-we1",
      title: "Worked example 1: Euler form of a Cartesian number",
      problem: "Write $-1 + i$ and $-2i$ in Euler form with principal arguments.",
      steps: [
        { text: "$-1 + i$: modulus $\\sqrt2$, quadrant II, argument $\\frac{3\\pi}{4}$. So $-1 + i = \\sqrt2\\,e^{3\\pi i/4}$." },
        { text: "$-2i$: modulus $2$, pointing straight down, argument $-\\frac{\\pi}{2}$. So $-2i = 2e^{-i\\pi/2}$." },
      ],
      answer: "$-1 + i = \\sqrt2\\,e^{3\\pi i/4}$ and $-2i = 2e^{-i\\pi/2}$.",
    },
    {
      type: "worked-example",
      id: "cq3-4-we2",
      title: "Worked example 2: Euler's identity",
      problem: "Evaluate $e^{i\\pi}$, $e^{i\\pi/2}$ and $e^{3\\pi i}$.",
      steps: [
        { text: "$e^{i\\pi} = \\cos\\pi + i\\sin\\pi = -1$, so $e^{i\\pi} + 1 = 0$." },
        { text: "$e^{i\\pi/2} = \\cos\\frac{\\pi}{2} + i\\sin\\frac{\\pi}{2} = i$." },
        { text: "$e^{3\\pi i} = e^{i\\pi}e^{2\\pi i} = -1 \\cdot 1 = -1$. *Why this step:* any multiple of $2\\pi$ in the angle is a whole number of turns and can be dropped." },
      ],
      answer: "$-1$, $i$ and $-1$.",
    },
    {
      type: "worked-example",
      id: "cq3-4-we3",
      title: "Worked example 3: a sum of exponentials",
      problem: "Simplify $e^{i\\pi/4} + e^{-i\\pi/4}$ and $e^{i\\pi/3} \\cdot e^{i\\pi/6}$.",
      steps: [
        { text: "$e^{i\\pi/4} + e^{-i\\pi/4} = 2\\cos\\frac{\\pi}{4} = \\sqrt2$. *Why this step:* a number plus its conjugate is twice the real part." },
        { text: "$e^{i\\pi/3} \\cdot e^{i\\pi/6} = e^{i(\\pi/3 + \\pi/6)} = e^{i\\pi/2} = i$." },
      ],
      answer: "$\\sqrt2$ and $i$.",
    },
    {
      type: "worked-example",
      id: "cq3-4-we4",
      title: "Worked example 4: a surprise, i to the power i",
      problem: "Using $i = e^{i\\pi/2}$, find the principal value of $i^i$.",
      steps: [
        { text: "$i^i = \\left(e^{i\\pi/2}\\right)^i = e^{i \\cdot i\\pi/2} = e^{-\\pi/2}$." },
        { text: "$e^{-\\pi/2} \\approx 0.208$, a real number. (Other arguments of $i$, $\\frac{\\pi}{2} + 2k\\pi$, give the other real values $e^{-\\pi/2 - 2k\\pi}$.)" },
      ],
      answer: "$i^i = e^{-\\pi/2} \\approx 0.208$: an imaginary power of an imaginary number can be real.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"$|e^{i\\theta}|$ grows with $\\theta$, like $e^\\theta$\"",
      content:
        "$e^{\\theta}$ for real $\\theta$ grows without bound, but $e^{i\\theta}$ never leaves the unit circle: $|e^{i\\theta}| = \\sqrt{\\cos^2\\theta + \\sin^2\\theta} = 1$ for every real $\\theta$. A real exponent changes the **size**, an imaginary exponent changes only the **direction**. In general $|e^{x + iy}| = e^x$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"$e^{i\\,30}$ means a turn of $30°$\"",
      content:
        "Euler's formula is a calculus fact, and calculus measures angles in radians. $e^{30i}$ is a turn of 30 **radians**, about $1719°$. A $30°$ turn is $e^{i\\pi/6}$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "cq3-4-q1",
      variant: "practice",
      question: "$e^{i\\pi} = $",
      options: [
        { text: "$-1$", correct: true, feedback: "$\\cos\\pi + i\\sin\\pi = -1 + 0i$." },
        { text: "$1$", feedback: "That is $e^{2\\pi i}$, a full turn. $\\pi$ is a half turn." },
        { text: "$i$", feedback: "That is $e^{i\\pi/2}$, a quarter turn." },
        { text: "$e^{\\pi}$, about $23.1$", feedback: "$|e^{i\\pi}| = 1$. An imaginary exponent does not change size." },
      ],
      hint: "Use $e^{i\\theta} = \\cos\\theta + i\\sin\\theta$ with $\\theta = \\pi$.",
    },
    {
      type: "numeric",
      id: "cq3-4-q2",
      variant: "practice",
      question: "Find $\\left|5e^{7\\pi i/9}\\right|$.",
      answer: 5,
      hint: "$|e^{i\\theta}| = 1$ for every real $\\theta$.",
      solution: "$|5e^{7\\pi i/9}| = 5 \\cdot |e^{7\\pi i/9}| = 5 \\cdot 1 = 5$.",
      commonMistakes: [{ answer: 1, feedback: "$|e^{i\\theta}| = 1$, but the factor $5$ scales the length." }],
    },
    {
      type: "quiz",
      id: "cq3-4-q3",
      variant: "practice",
      question: "The Euler form of $-3i$ with the principal argument is",
      options: [
        { text: "$3e^{-i\\pi/2}$", correct: true, feedback: "Length 3, pointing straight down: argument $-\\frac{\\pi}{2}$." },
        { text: "$3e^{i\\pi/2}$", feedback: "That is $3i$, pointing up." },
        { text: "$-3e^{i\\pi/2}$", feedback: "It equals $-3i$, but the front factor of an Euler form must be the (positive) modulus." },
        { text: "$3e^{3\\pi i/2}$", feedback: "It equals $-3i$, but $\\frac{3\\pi}{2}$ is not in $(-\\pi, \\pi]$." },
      ],
      hint: "Find the modulus and the principal argument, then write $re^{i\\theta}$.",
    },
    {
      type: "quiz",
      id: "cq3-4-q4",
      variant: "concept",
      multiple: true,
      question: "Which of these equal $1$? Select all that apply.",
      options: [
        { text: "$e^{2\\pi i}$", correct: true, feedback: "One full turn." },
        { text: "$e^{-2\\pi i}$", correct: true, feedback: "One full turn clockwise, still back at $1$." },
        { text: "$e^{i\\pi}$", feedback: "A half turn: $-1$." },
        { text: "$e^{0}$", correct: true, feedback: "No turn at all." },
        { text: "$e^{i}$", feedback: "A turn of one radian: $\\cos 1 + i\\sin 1 \\approx 0.54 + 0.84i$." },
      ],
      hint: "$e^{i\\theta} = 1$ exactly when $\\theta$ is a whole number of full turns, $2k\\pi$.",
    },
    {
      type: "numeric",
      id: "cq3-4-q5",
      variant: "practice",
      question: "Find $\\operatorname{Im}\\left(2e^{5\\pi i/6}\\right)$.",
      answer: 1,
      hint: "$\\operatorname{Im}(re^{i\\theta}) = r\\sin\\theta$.",
      solution: "$2\\sin\\frac{5\\pi}{6} = 2 \\cdot \\frac12 = 1$.",
      commonMistakes: [
        { answer: -1.732, tolerance: 0.01, feedback: "That is the real part, $2\\cos\\frac{5\\pi}{6} = -\\sqrt3$." },
        { answer: 0.5, feedback: "You forgot the modulus $2$." },
      ],
    },
    {
      type: "quiz",
      id: "cq3-4-q6",
      variant: "concept",
      question: "The conjugate of $re^{i\\theta}$ (with $r > 0$, $\\theta$ real) is",
      options: [
        { text: "$re^{-i\\theta}$", correct: true, feedback: "Reflection in the real axis keeps the length and reverses the angle." },
        { text: "$-re^{i\\theta}$", feedback: "That is $-z$, the half turn." },
        { text: "$\\frac{1}{r}e^{-i\\theta}$", feedback: "That is $\\frac1z$. It equals $\\bar z$ only when $r = 1$." },
        { text: "$re^{i(\\pi - \\theta)}$", feedback: "That is $-\\bar z$, the reflection in the imaginary axis." },
      ],
      hint: "Conjugation is reflection in the real axis. What does it do to length and to angle?",
    },
    {
      type: "numeric",
      id: "cq3-4-q7",
      variant: "practice",
      question: "Evaluate $\\dfrac{e^{i\\pi/6} - e^{-i\\pi/6}}{2i}$.",
      answer: 0.5,
      tolerance: 0.001,
      hint: "This is the exponential formula for one of the trigonometric functions.",
      solution: "$\\dfrac{e^{i\\theta} - e^{-i\\theta}}{2i} = \\sin\\theta$, so the value is $\\sin\\frac{\\pi}{6} = \\frac12$.",
      commonMistakes: [
        { answer: 0.866, tolerance: 0.001, feedback: "That is $\\cos\\frac{\\pi}{6}$. The difference over $2i$ gives sine." },
        { answer: 1, feedback: "The numerator is $2i\\sin\\frac{\\pi}{6} = i$, and dividing by $2i$ gives $\\frac12$." },
      ],
    },
    {
      type: "numeric",
      id: "cq3-4-q8",
      variant: "practice",
      question: "Find the principal argument of $e^{7\\pi i/4}$ in degrees.",
      answer: -45,
      unit: "°",
      hint: "$\\frac{7\\pi}{4} = 315°$ is outside $(-180°, 180°]$.",
      solution: "$315° - 360° = -45°$, so $e^{7\\pi i/4} = e^{-i\\pi/4} = \\frac{1 - i}{\\sqrt2}$.",
      commonMistakes: [{ answer: 315, feedback: "Right direction, but not the principal value. Subtract $360°$." }],
    },
    {
      type: "quiz",
      id: "cq3-4-q9",
      variant: "concept",
      question: "Which of these is **not** equal to $i$?",
      options: [
        { text: "$e^{-i\\pi/2}$", correct: true, feedback: "A quarter turn clockwise lands on $-i$." },
        { text: "$e^{i\\pi/2}$", feedback: "This is $i$: a quarter turn anticlockwise." },
        { text: "$e^{5\\pi i/2}$", feedback: "This is $i$: $\\frac{5\\pi}{2} = \\frac{\\pi}{2} + 2\\pi$." },
        { text: "$e^{-3\\pi i/2}$", feedback: "This is $i$: three quarter turns clockwise end where one anticlockwise does." },
      ],
      hint: "Reduce each angle by multiples of $2\\pi$ and see where it points.",
    },
    {
      type: "numeric",
      id: "cq3-4-q10",
      variant: "practice",
      question: "JEE Main. Find $\\left|e^{i\\pi/3} - 1\\right|$.",
      answer: 1,
      hint: "$|e^{i\\theta} - 1|^2 = (\\cos\\theta - 1)^2 + \\sin^2\\theta = 2 - 2\\cos\\theta$.",
      solution: "$|e^{i\\theta} - 1| = \\sqrt{2 - 2\\cos\\theta} = 2\\left|\\sin\\frac{\\theta}{2}\\right|$. With $\\theta = \\frac{\\pi}{3}$ this is $2\\sin\\frac{\\pi}{6} = 1$. Geometrically: $0$, $1$ and $e^{i\\pi/3}$ form an equilateral triangle of side 1.",
      commonMistakes: [
        { answer: 0, feedback: "$|e^{i\\theta}| - |1| = 0$, but the modulus of a difference is a distance between points." },
        { answer: 2, feedback: "$2$ is the distance from $1$ to $-1 = e^{i\\pi}$, not to $e^{i\\pi/3}$." },
      ],
    },
    {
      type: "quiz",
      id: "cq3-4-q11",
      variant: "practice",
      multiple: true,
      question: "JEE Advanced. Let $z = e^{i\\theta}$ with $\\theta$ real. Which statements are true? Select all that apply.",
      options: [
        { text: "$z + \\frac1z$ is real", correct: true, feedback: "$z + \\frac1z = e^{i\\theta} + e^{-i\\theta} = 2\\cos\\theta$." },
        { text: "$z - \\frac1z$ is purely imaginary or zero", correct: true, feedback: "$z - \\frac1z = 2i\\sin\\theta$." },
        { text: "$|z| = 1$", correct: true, feedback: "$e^{i\\theta}$ lies on the unit circle." },
        { text: "$\\bar z = \\frac1z$", correct: true, feedback: "$\\bar z = e^{-i\\theta} = \\frac{1}{e^{i\\theta}}$, true for every $z$ with $|z| = 1$." },
        { text: "$z^2 = e^{i\\theta^2}$", feedback: "$z^2 = e^{2i\\theta}$: exponents multiply by 2, the angle is not squared." },
      ],
      hint: "Use $\\frac1z = e^{-i\\theta}$ and the exponential formulas for $\\cos$ and $\\sin$.",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "multiplication-is-scale-and-rotate",
  title: "3.5 · Multiplication Is Scale and Rotate",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "Adding complex numbers was adding arrows. Multiplying them looks messy in Cartesian form: $(a + ib)(c + id) = (ac - bd) + i(ad + bc)$. What does that formula *do* to a point? Switch to polar form and the mess turns into one clean sentence: **multiplying by $z_2$ stretches by $|z_2|$ and turns by $\\arg z_2$.**",
    },
    { type: "heading", text: "The product rule in polar form" },
    {
      type: "text",
      content:
        "Take $z_1 = r_1(\\cos\\theta_1 + i\\sin\\theta_1)$ and $z_2 = r_2(\\cos\\theta_2 + i\\sin\\theta_2)$ and multiply out, using $i^2 = -1$:",
    },
    {
      type: "math",
      latex:
        "\\begin{aligned} z_1z_2 &= r_1r_2\\left[(\\cos\\theta_1\\cos\\theta_2 - \\sin\\theta_1\\sin\\theta_2) + i(\\sin\\theta_1\\cos\\theta_2 + \\cos\\theta_1\\sin\\theta_2)\\right] \\\\ &= r_1r_2\\left[\\cos(\\theta_1 + \\theta_2) + i\\sin(\\theta_1 + \\theta_2)\\right] \\end{aligned}",
    },
    {
      type: "text",
      content:
        "The two brackets are exactly the angle-addition formulas for cosine and sine. In Euler form the same fact is just the law of exponents: $r_1e^{i\\theta_1} \\cdot r_2e^{i\\theta_2} = r_1r_2\\,e^{i(\\theta_1 + \\theta_2)}$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Multiplication and division in polar form",
      content:
        "$$z_1z_2 = r_1r_2\\,e^{i(\\theta_1 + \\theta_2)}, \\qquad \\frac{z_1}{z_2} = \\frac{r_1}{r_2}\\,e^{i(\\theta_1 - \\theta_2)} \\quad (z_2 \\ne 0).$$\n\n**Moduli multiply (or divide), arguments add (or subtract).** In particular $|z_1z_2| = |z_1||z_2|$, $\\left|\\frac{z_1}{z_2}\\right| = \\frac{|z_1|}{|z_2|}$, and $\\frac1z = \\frac1r e^{-i\\theta}$.",
    },
    {
      type: "interactive",
      config: {
        component: "cq-argand-plane",
        mode: "product",
        z1: [2, 1],
        z2: [1, 1],
        show: ["unit-circle", "quotient"],
        caption:
          "Drag $z_1$ and $z_2$. The coloured arcs show $\\arg z_1$, $\\arg z_2$ and $\\arg(z_1z_2)$: the third is the sum of the first two. Put $z_2$ on the unit circle and the product is a pure rotation of $z_1$. The dashed orange arrow is $\\frac{z_1}{z_2}$: arguments subtract.",
      },
    },
    { type: "heading", text: "Argument rules" },
    {
      type: "math",
      latex:
        "\\arg(z_1z_2) = \\arg z_1 + \\arg z_2, \\quad \\arg\\frac{z_1}{z_2} = \\arg z_1 - \\arg z_2, \\quad \\arg\\bar z = -\\arg z, \\quad \\arg z^n = n\\arg z \\quad (\\text{mod } 2\\pi)",
    },
    {
      type: "text",
      content:
        "\"mod $2\\pi$\" matters. These are equalities between **sets** of arguments, or between angles up to whole turns. For principal arguments you may have to add or subtract $2\\pi$ to bring the sum back into $(-\\pi, \\pi]$, as the next example shows.",
    },
    {
      type: "worked-example",
      id: "cq3-5-we1",
      title: "Worked example 1: a product, and a free trig value",
      problem: "Find $(1 + i)(\\sqrt3 + i)$ in polar form and in Cartesian form, and deduce $\\cos\\frac{5\\pi}{12}$.",
      steps: [
        { text: "Polar forms: $1 + i = \\sqrt2\\,e^{i\\pi/4}$ and $\\sqrt3 + i = 2e^{i\\pi/6}$." },
        { text: "Multiply moduli and add arguments: $(1 + i)(\\sqrt3 + i) = 2\\sqrt2\\,e^{i5\\pi/12}$, since $\\frac{\\pi}{4} + \\frac{\\pi}{6} = \\frac{5\\pi}{12}$." },
        { text: "Directly: $(1 + i)(\\sqrt3 + i) = \\sqrt3 + i + \\sqrt3 i - 1 = (\\sqrt3 - 1) + i(\\sqrt3 + 1)$." },
        { text: "Compare real parts: $2\\sqrt2\\cos\\frac{5\\pi}{12} = \\sqrt3 - 1$. *Why this step:* two descriptions of one number must agree part by part." },
        { latex: "\\cos\\frac{5\\pi}{12} = \\frac{\\sqrt3 - 1}{2\\sqrt2} = \\frac{\\sqrt6 - \\sqrt2}{4}" },
      ],
      answer: "$2\\sqrt2\\,e^{i5\\pi/12} = (\\sqrt3 - 1) + i(\\sqrt3 + 1)$, so $\\cos 75° = \\frac{\\sqrt6 - \\sqrt2}{4}$.",
    },
    {
      type: "worked-example",
      id: "cq3-5-we2",
      title: "Worked example 2: a quotient",
      problem: "Write $\\dfrac{1 + i\\sqrt3}{1 - i}$ in polar form.",
      steps: [
        { text: "$1 + i\\sqrt3 = 2e^{i\\pi/3}$ and $1 - i = \\sqrt2\\,e^{-i\\pi/4}$." },
        { text: "Divide moduli, subtract arguments: $\\frac{2}{\\sqrt2} = \\sqrt2$ and $\\frac{\\pi}{3} - \\left(-\\frac{\\pi}{4}\\right) = \\frac{7\\pi}{12}$." },
        { latex: "\\frac{1 + i\\sqrt3}{1 - i} = \\sqrt2\\,e^{i7\\pi/12} = \\sqrt2\\left(\\cos\\frac{7\\pi}{12} + i\\sin\\frac{7\\pi}{12}\\right)" },
      ],
      answer: "$\\sqrt2\\,e^{i7\\pi/12}$ (and $\\frac{7\\pi}{12}$ is already in $(-\\pi, \\pi]$).",
    },
    {
      type: "worked-example",
      id: "cq3-5-we3",
      title: "Worked example 3: principal arguments do not always add",
      problem: "Let $z_1 = z_2 = -1 + i$. Compare $\\operatorname{Arg} z_1 + \\operatorname{Arg} z_2$ with $\\operatorname{Arg}(z_1z_2)$.",
      steps: [
        { text: "$\\operatorname{Arg}(-1 + i) = \\frac{3\\pi}{4}$, so the sum is $\\frac{3\\pi}{2}$." },
        { text: "$(-1 + i)^2 = 1 - 2i - 1 = -2i$, whose principal argument is $-\\frac{\\pi}{2}$." },
        { text: "$\\frac{3\\pi}{2} - 2\\pi = -\\frac{\\pi}{2}$: the sum and the principal argument differ by one full turn. *Why this step:* the sum left the interval $(-\\pi, \\pi]$, so it must be pulled back." },
      ],
      answer: "$\\operatorname{Arg}(z_1z_2) = \\operatorname{Arg} z_1 + \\operatorname{Arg} z_2 - 2\\pi$ here. In general the correction is $0$ or $\\pm 2\\pi$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"$\\operatorname{Arg}(z_1z_2) = \\operatorname{Arg} z_1 + \\operatorname{Arg} z_2$ always\"",
      content:
        "The rule $\\arg(z_1z_2) = \\arg z_1 + \\arg z_2$ holds up to multiples of $2\\pi$. For principal values, $\\operatorname{Arg}(z_1z_2) = \\operatorname{Arg} z_1 + \\operatorname{Arg} z_2 + 2k\\pi$ with $k \\in \\{-1, 0, 1\\}$ chosen to land in $(-\\pi, \\pi]$. Two numbers in quadrant II, like $-1 + i$ twice, are the standard counterexample.",
    },
    { type: "heading", text: "Rotation about the origin" },
    {
      type: "text",
      content:
        "Since $|e^{i\\alpha}| = 1$, multiplying by $e^{i\\alpha}$ does not stretch at all. It is a **pure rotation** about the origin through $\\alpha$ (anticlockwise if $\\alpha > 0$). The most important case is $i = e^{i\\pi/2}$:\n\n- $iz$ is $z$ rotated through $90°$ anticlockwise: $i(x + iy) = -y + ix$.\n- $-iz$ is $z$ rotated through $90°$ clockwise.\n- $-z = e^{i\\pi}z$ is the half turn.",
    },
    {
      type: "interactive",
      config: {
        component: "cq-argand-plane",
        mode: "point",
        z1: [3, 1],
        show: ["i-times", "negative"],
        caption:
          "The green arrow $iz$ is always $z$ turned a quarter turn anticlockwise, and $-z$ a half turn. Drag $z$ and check: $i(x + iy) = -y + ix$ moves $(x, y)$ to $(-y, x)$.",
      },
    },
    {
      type: "worked-example",
      id: "cq3-5-we4",
      title: "Worked example 4: rotating a point",
      problem: "The point $2 + i$ is rotated about the origin through $90°$ clockwise, and the point $3 + 4i$ through $60°$ anticlockwise. Find the images.",
      steps: [
        { text: "Clockwise $90°$ is multiplication by $e^{-i\\pi/2} = -i$: $-i(2 + i) = -2i - i^2 = 1 - 2i$." },
        { text: "Anticlockwise $60°$ is multiplication by $e^{i\\pi/3} = \\frac12 + \\frac{\\sqrt3}{2}i$." },
        { latex: "(3 + 4i)\\left(\\tfrac12 + \\tfrac{\\sqrt3}{2}i\\right) = \\frac{3 - 4\\sqrt3}{2} + \\frac{4 + 3\\sqrt3}{2}\\,i" },
        { text: "Check: both images still have the original moduli, $\\sqrt5$ and $5$, because rotations keep distances from the centre." },
      ],
      answer: "$1 - 2i$, and $\\frac{3 - 4\\sqrt3}{2} + \\frac{4 + 3\\sqrt3}{2}i$.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Preview: rotating about another point",
      content:
        "To rotate $z$ about a centre $c$, shift $c$ to the origin, rotate, and shift back: $z' - c = (z - c)e^{i\\alpha}$. Chapter 5 turns this into the rotation theorem.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "cq3-5-q1",
      variant: "practice",
      question: "Find $|(3 + 4i)(1 - i)|$ to two decimal places.",
      answer: 7.071,
      tolerance: 0.01,
      hint: "Moduli multiply: $|z_1z_2| = |z_1||z_2|$.",
      solution: "$|3 + 4i| \\cdot |1 - i| = 5\\sqrt2 \\approx 7.07$.",
      commonMistakes: [
        { answer: 6.414, tolerance: 0.01, feedback: "That is $5 + \\sqrt2$. Moduli multiply, they do not add." },
        { answer: 7, feedback: "Close, but $5\\sqrt2 \\approx 7.071$. Expand: $(3 + 4i)(1 - i) = 7 + i$, and $|7 + i| = \\sqrt{50}$." },
      ],
    },
    {
      type: "numeric",
      id: "cq3-5-q2",
      variant: "practice",
      question: "Find the principal argument of $(1 + i)(\\sqrt3 + i)$ in degrees.",
      answer: 75,
      unit: "°",
      hint: "Arguments add: $\\arg(1 + i) = 45°$ and $\\arg(\\sqrt3 + i) = 30°$.",
      solution: "$45° + 30° = 75°$, which is already in $(-180°, 180°]$.",
      commonMistakes: [
        { answer: 15, feedback: "That is the difference of the arguments, for a quotient. For a product they add." },
        { answer: 1350, feedback: "Arguments add, they do not multiply." },
      ],
    },
    {
      type: "quiz",
      id: "cq3-5-q3",
      variant: "concept",
      question: "Multiplying a complex number $z$ by $i$",
      options: [
        { text: "rotates $z$ through $90°$ anticlockwise about the origin", correct: true, feedback: "$i = e^{i\\pi/2}$: modulus 1, argument $\\frac{\\pi}{2}$." },
        { text: "reflects $z$ in the imaginary axis", feedback: "That is $-\\bar z$. For example $i \\cdot 1 = i$, but the reflection of $1$ is $-1$." },
        { text: "rotates $z$ through $90°$ clockwise", feedback: "Clockwise is multiplication by $-i$." },
        { text: "swaps the real and imaginary parts", feedback: "$i(x + iy) = -y + ix$: they swap, but the new real part also changes sign." },
      ],
      hint: "Write $i$ in Euler form.",
    },
    {
      type: "numeric",
      id: "cq3-5-q4",
      variant: "practice",
      question: "Find $\\operatorname{Arg}\\left[(-1 + i)(-1 + i\\sqrt3)\\right]$ in degrees.",
      answer: -105,
      unit: "°",
      hint: "Add the principal arguments $135°$ and $120°$, then bring the result into $(-180°, 180°]$.",
      solution: "$135° + 120° = 255°$, and $255° - 360° = -105°$.",
      commonMistakes: [
        { answer: 255, feedback: "Right direction, but outside the principal range. Subtract $360°$." },
        { answer: 15, feedback: "That is $135° - 120°$. For a product the arguments add." },
      ],
    },
    {
      type: "quiz",
      id: "cq3-5-q5",
      variant: "practice",
      question: "The point $4 + i$ is rotated about the origin through $90°$ **clockwise**. Its image is",
      options: [
        { text: "$1 - 4i$", correct: true, feedback: "$-i(4 + i) = -4i - i^2 = 1 - 4i$." },
        { text: "$-1 + 4i$", feedback: "That is $i(4 + i)$, the anticlockwise rotation." },
        { text: "$4 - i$", feedback: "That is the conjugate, a reflection in the real axis." },
        { text: "$-4 - i$", feedback: "That is the half turn, $-(4 + i)$." },
      ],
      hint: "A clockwise quarter turn is multiplication by $-i$.",
    },
    {
      type: "quiz",
      id: "cq3-5-q6",
      variant: "concept",
      multiple: true,
      question: "For non-zero complex numbers $z_1$ and $z_2$, which statements are always true (arguments taken mod $2\\pi$)? Select all that apply.",
      options: [
        { text: "$\\left|\\frac{z_1}{z_2}\\right| = \\frac{|z_1|}{|z_2|}$", correct: true, feedback: "Moduli divide." },
        { text: "$\\arg(z_1\\bar z_2) = \\arg z_1 - \\arg z_2$", correct: true, feedback: "$\\arg \\bar z_2 = -\\arg z_2$, and arguments of a product add." },
        { text: "$\\arg(z_1 + z_2) = \\arg z_1 + \\arg z_2$", feedback: "Arguments add for products, not sums. For $z_1 = 1$, $z_2 = i$: $\\arg(1 + i) = \\frac{\\pi}{4}$, but $\\arg 1 + \\arg i = \\frac{\\pi}{2}$." },
        { text: "$|z_1z_2| = |z_1| + |z_2|$", feedback: "Moduli multiply: $|2 \\cdot 3| = 6 \\ne 5$." },
        { text: "$\\arg(z_1^2) = 2\\arg z_1$", correct: true, feedback: "Squaring adds the argument to itself (mod $2\\pi$)." },
      ],
      hint: "Products: moduli multiply and arguments add. Sums obey neither rule.",
    },
    {
      type: "numeric",
      id: "cq3-5-q7",
      variant: "practice",
      question: "Find the principal argument of $\\dfrac{\\sqrt3 + i}{1 + i}$ in degrees.",
      answer: -15,
      unit: "°",
      hint: "Arguments subtract for a quotient.",
      solution: "$30° - 45° = -15°$.",
      commonMistakes: [
        { answer: 15, feedback: "Order matters: numerator's argument minus denominator's, $30° - 45°$." },
        { answer: 75, feedback: "That is the product's argument. For a quotient, subtract." },
      ],
    },
    {
      type: "numeric",
      id: "cq3-5-q8",
      variant: "practice",
      question: "Find $\\left|\\dfrac{(2 + 2i)^3}{(1 - i\\sqrt3)^2}\\right|$ to two decimal places.",
      answer: 5.657,
      tolerance: 0.01,
      hint: "Never expand: $|z^n| = |z|^n$ and moduli divide.",
      solution: "$|2 + 2i| = 2\\sqrt2$, so the numerator has modulus $(2\\sqrt2)^3 = 16\\sqrt2$. The denominator has modulus $2^2 = 4$. The answer is $4\\sqrt2 \\approx 5.66$.",
      commonMistakes: [
        { answer: 11.314, tolerance: 0.01, feedback: "You divided by $|1 - i\\sqrt3| = 2$ instead of its square." },
        { answer: 22.627, tolerance: 0.01, feedback: "That is only the numerator, $(2\\sqrt2)^3 = 16\\sqrt2$. Divide by the denominator's modulus, $4$." },
      ],
    },
    {
      type: "quiz",
      id: "cq3-5-q9",
      variant: "practice",
      question: "JEE Main. Non-zero complex numbers $z_1$ and $z_2$ satisfy $|z_1| = |z_2|$ and $\\arg z_1 + \\arg z_2 = \\pi$. Then $z_1 = $",
      options: [
        { text: "$-\\bar z_2$", correct: true, feedback: "With $z_1 = re^{i\\alpha}$, $z_2 = re^{i(\\pi - \\alpha)}$, so $\\bar z_2 = re^{i(\\alpha - \\pi)} = -re^{i\\alpha} = -z_1$." },
        { text: "$\\bar z_2$", feedback: "$\\bar z_2$ has argument $\\alpha - \\pi$, a half turn away from $z_1$." },
        { text: "$-z_2$", feedback: "$-z_2$ has argument $-\\alpha$ (mod $2\\pi$), not $\\alpha$." },
        { text: "$z_2$", feedback: "Then both arguments would be $\\frac{\\pi}{2}$, a special case only." },
      ],
      hint: "Write $z_1 = re^{i\\alpha}$, $z_2 = re^{i(\\pi - \\alpha)}$ and compute $\\bar z_2$.",
    },
    {
      type: "numeric",
      id: "cq3-5-q10",
      variant: "practice",
      question: "JEE Main. The point $2 + 3i$ is rotated about the origin through $90°$ anticlockwise and then its distance from the origin is doubled. If the new point is $p + iq$, enter $p$.",
      answer: -6,
      hint: "Both moves together are multiplication by $2i$.",
      solution: "$2i(2 + 3i) = 4i + 6i^2 = -6 + 4i$, so $p = -6$.",
      commonMistakes: [
        { answer: 4, feedback: "$4$ is the imaginary part $q$." },
        { answer: 6, feedback: "Sign slip: $6i^2 = -6$." },
        { answer: -3, feedback: "You rotated but forgot to double." },
      ],
    },
    {
      type: "quiz",
      id: "cq3-5-q11",
      variant: "practice",
      multiple: true,
      question: "JEE Advanced. Let $|z_1| = |z_2| = 1$ and $\\arg\\dfrac{z_1}{z_2} = \\dfrac{\\pi}{2}$. Which statements are true? Select all that apply.",
      options: [
        { text: "$z_1 = iz_2$", correct: true, feedback: "$\\frac{z_1}{z_2}$ has modulus $1$ and argument $\\frac{\\pi}{2}$, so it is $i$." },
        { text: "$|z_1 + z_2| = \\sqrt2$", correct: true, feedback: "$|iz_2 + z_2| = |1 + i||z_2| = \\sqrt2$." },
        { text: "$|z_1 - z_2| = \\sqrt2$", correct: true, feedback: "$|i - 1||z_2| = \\sqrt2$: the two points and $O$ form a right isosceles triangle." },
        { text: "$z_1\\bar z_2 = -i$", feedback: "$z_1\\bar z_2 = \\frac{z_1}{z_2}|z_2|^2 = i$." },
        { text: "$z_1^2 + z_2^2 = 0$", correct: true, feedback: "$z_1^2 = i^2z_2^2 = -z_2^2$." },
      ],
      hint: "First pin down $\\frac{z_1}{z_2}$ exactly, then substitute $z_1 = (\\ldots)z_2$ everywhere.",
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "the-triangle-inequality",
  title: "3.6 · The Triangle Inequality",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "Walking from $O$ to $z_1$ and then on by the arrow $z_2$ brings you to $z_1 + z_2$. Going straight there is never longer than the detour. That one sentence about a triangle, the **triangle inequality**, is the main tool for every \"greatest and least value of $|z|$\" question in JEE.",
    },
    { type: "heading", text: "The inequality and its picture" },
    {
      type: "math",
      latex: "|z_1 + z_2| \\le |z_1| + |z_2|",
    },
    {
      type: "interactive",
      config: {
        component: "cq-argand-plane",
        mode: "sum",
        z1: [2, 1],
        z2: [1, 2],
        caption:
          "The triangle $O$, $z_1$, $z_1 + z_2$ has sides $|z_1|$, $|z_2|$ and $|z_1 + z_2|$. Compare the readouts $|z_1 + z_2|$ and $|z_1| + |z_2|$. Make them equal by dragging $z_2$ onto the ray through $z_1$, and make $|z_1 + z_2|$ as small as possible by pointing $z_2$ the opposite way.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: equality happens only when the triangle collapses flat, with $z_2$ pointing in exactly the same direction as $z_1$. Pointing $z_2$ the opposite way makes $|z_1 + z_2|$ as small as possible, namely $\\big||z_1| - |z_2|\\big|$.",
    },
    { type: "heading", text: "An algebraic proof" },
    {
      type: "text",
      content:
        "From Chapter 2, $|w|^2 = w\\bar w$. Expand $|z_1 + z_2|^2$ this way:",
    },
    {
      type: "math",
      latex:
        "|z_1 + z_2|^2 = (z_1 + z_2)(\\bar z_1 + \\bar z_2) = |z_1|^2 + |z_2|^2 + z_1\\bar z_2 + \\overline{z_1\\bar z_2} = |z_1|^2 + |z_2|^2 + 2\\operatorname{Re}(z_1\\bar z_2)",
    },
    {
      type: "text",
      content:
        "A real part is never more than the modulus: $\\operatorname{Re}(z_1\\bar z_2) \\le |z_1\\bar z_2| = |z_1||z_2|$. So $|z_1 + z_2|^2 \\le (|z_1| + |z_2|)^2$, and taking square roots proves the inequality. Equality needs $\\operatorname{Re}(z_1\\bar z_2) = |z_1\\bar z_2|$, that is $z_1\\bar z_2$ real and non-negative, which means $z_1$ and $z_2$ point the same way ($\\arg z_1 = \\arg z_2$) or one of them is $0$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The four forms and their equality cases",
      content:
        "For all complex $z_1, z_2$:\n\n$$\\big||z_1| - |z_2|\\big| \\le |z_1 \\pm z_2| \\le |z_1| + |z_2|.$$\n\n- $|z_1 + z_2| = |z_1| + |z_2|$ iff same direction ($\\arg z_1 = \\arg z_2$).\n- $|z_1 - z_2| = |z_1| + |z_2|$ iff opposite directions ($\\arg z_1 - \\arg z_2 = \\pm\\pi$).\n- $|z_1 - z_2| = \\big||z_1| - |z_2|\\big|$ iff same direction.\n- $|z_1 + z_2| = \\big||z_1| - |z_2|\\big|$ iff opposite directions.\n\n(When one number is $0$ every equality holds.)",
    },
    {
      type: "callout",
      variant: "tip",
      title: "The parallelogram law, a free bonus",
      content:
        "Adding the expansions of $|z_1 + z_2|^2$ and $|z_1 - z_2|^2$ cancels the cross terms: $|z_1 + z_2|^2 + |z_1 - z_2|^2 = 2\\left(|z_1|^2 + |z_2|^2\\right)$. The squares of a parallelogram's diagonals add up to the squares of its four sides.",
    },
    { type: "heading", text: "Using it for greatest and least values" },
    {
      type: "worked-example",
      id: "cq3-6-we1",
      title: "Worked example 1: a disc and a point",
      problem: "If $|z| \\le 2$, find the greatest and least values of $|z - 3 + 4i|$.",
      steps: [
        { text: "Read the expression as a distance: $|z - (3 - 4i)|$ is the distance from $z$ to the point $3 - 4i$, which is $|3 - 4i| = 5$ from the origin. *Why this step:* the picture tells you where the extremes are before any algebra." },
        { text: "Upper bound: $|z - (3 - 4i)| \\le |z| + |3 - 4i| \\le 2 + 5 = 7$." },
        { text: "Lower bound: $|z - (3 - 4i)| \\ge |3 - 4i| - |z| \\ge 5 - 2 = 3$." },
        { text: "Both are attained on the line through $0$ and $3 - 4i$: $z = -\\frac{2}{5}(3 - 4i)$ gives $7$, and $z = \\frac{2}{5}(3 - 4i)$ gives $3$. *Why this step:* an inequality is only a greatest value once some $z$ achieves it." },
      ],
      answer: "Greatest value $7$, least value $3$.",
    },
    {
      type: "worked-example",
      id: "cq3-6-we2",
      title: "Worked example 2: two fixed lengths",
      problem: "$|z_1| = 3$ and $|z_2| = 5$. Find all possible values of $|z_1 + z_2|$.",
      steps: [
        { text: "Triangle inequality: $|z_1 + z_2| \\le 3 + 5 = 8$, equality when $z_1, z_2$ point the same way." },
        { text: "Reverse form: $|z_1 + z_2| \\ge 5 - 3 = 2$, equality when they point opposite ways." },
        { text: "As the angle between them varies continuously from $0$ to $\\pi$, $|z_1 + z_2|$ takes every value in between." },
      ],
      answer: "$|z_1 + z_2|$ can be any number in $[2, 8]$.",
    },
    {
      type: "worked-example",
      id: "cq3-6-we3",
      title: "Worked example 3: a sum of two distances",
      problem: "Find the least value of $|z - 1| + |z + 1|$ and the points where it occurs.",
      steps: [
        { text: "$|z - 1| + |z + 1| = |1 - z| + |z + 1| \\ge |(1 - z) + (z + 1)| = 2$. *Why this step:* writing $|z - 1|$ as $|1 - z|$ makes the $z$ terms cancel inside the sum." },
        { text: "Equality needs $1 - z$ and $z + 1$ in the same direction, which happens exactly when $z$ lies on the segment from $-1$ to $1$." },
      ],
      answer: "The least value is $2$, attained at every real $z$ with $-1 \\le z \\le 1$.",
    },
    {
      type: "worked-example",
      id: "cq3-6-we4",
      title: "Worked example 4: a JEE-style bound",
      problem: "Show that if $|z| < \\frac12$, then $\\left|(1 + i)z^3 + iz\\right| < \\frac34$.",
      steps: [
        { text: "Triangle inequality, then moduli multiply: $|(1 + i)z^3 + iz| \\le |1 + i||z|^3 + |i||z| = \\sqrt2|z|^3 + |z|$." },
        { text: "With $|z| < \\frac12$: $\\sqrt2|z|^3 + |z| < \\frac{\\sqrt2}{8} + \\frac12 \\approx 0.677$." },
        { text: "$0.677 < 0.75$, so the claim holds." },
      ],
      answer: "$|(1 + i)z^3 + iz| < \\frac{\\sqrt2}{8} + \\frac12 < \\frac34$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"$|z_1 + z_2| = |z_1| + |z_2|$ also when they point in opposite directions\"",
      content:
        "If $z_2$ points opposite to $z_1$, the arrows cancel: $|3 + (-1)| = 2$, not $4$. Opposite directions give equality in the **difference** form, $|z_1 - z_2| = |z_1| + |z_2|$. Keep the picture: a sum is longest when the arrows line up, shortest when they oppose.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the bound is always the answer\"",
      content:
        "$|z_1 + z_2| \\le |z_1| + |z_2|$ gives an upper bound, but it is the greatest value only if equality can actually happen under the question's conditions. Always exhibit a $z$ that attains the bound.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "cq3-6-q1",
      variant: "practice",
      question: "If $|z_1| = 4$ and $|z_2| = 7$, find the greatest possible value of $|z_1 + z_2|$.",
      answer: 11,
      hint: "When is a sum of two arrows longest?",
      solution: "$|z_1 + z_2| \\le 4 + 7 = 11$, attained when $z_1$ and $z_2$ point the same way.",
      commonMistakes: [{ answer: 3, feedback: "$3$ is the least value, when the arrows oppose." }],
    },
    {
      type: "numeric",
      id: "cq3-6-q2",
      variant: "practice",
      question: "If $|z_1| = 4$ and $|z_2| = 7$, find the least possible value of $|z_1 - z_2|$.",
      answer: 3,
      hint: "$|z_1 - z_2| \\ge \\big||z_1| - |z_2|\\big|$.",
      solution: "$|z_1 - z_2| \\ge |7 - 4| = 3$, attained when $z_1$ and $z_2$ point the same way, for example $z_1 = 4$, $z_2 = 7$.",
      commonMistakes: [
        { answer: -3, feedback: "A modulus is never negative: the bound is $\\big||z_1| - |z_2|\\big|$." },
        { answer: 11, feedback: "$11$ is the greatest value of $|z_1 - z_2|$, when the arrows oppose." },
      ],
    },
    {
      type: "quiz",
      id: "cq3-6-q3",
      variant: "concept",
      question: "For non-zero $z_1, z_2$, $|z_1 + z_2| = |z_1| + |z_2|$ holds exactly when",
      options: [
        { text: "$\\arg z_1 = \\arg z_2$", correct: true, feedback: "The triangle collapses with the arrows lined up in the same direction." },
        { text: "$\\arg z_1 - \\arg z_2 = \\pm\\pi$", feedback: "Opposite arrows cancel. That is the equality case for $|z_1 - z_2| = |z_1| + |z_2|$." },
        { text: "$|z_1| = |z_2|$", feedback: "Equal lengths are irrelevant: $1$ and $i$ have $|1 + i| = \\sqrt2 < 2$." },
        { text: "$\\arg z_1 - \\arg z_2 = \\pm\\frac{\\pi}{2}$", feedback: "Perpendicular arrows give $|z_1 + z_2|^2 = |z_1|^2 + |z_2|^2$, Pythagoras, not a straight line." },
      ],
      hint: "Equality needs $\\operatorname{Re}(z_1\\bar z_2) = |z_1||z_2|$.",
    },
    {
      type: "quiz",
      id: "cq3-6-q4",
      variant: "concept",
      question: "For non-zero $z_1, z_2$, $|z_1 - z_2| = |z_1| + |z_2|$ holds exactly when",
      options: [
        { text: "$z_1$ and $z_2$ point in opposite directions", correct: true, feedback: "Then $z_1$ and $-z_2$ point the same way, and $|z_1 + (-z_2)| = |z_1| + |{-z_2}|$." },
        { text: "$z_1$ and $z_2$ point in the same direction", feedback: "Then the difference is shortest: $|z_1 - z_2| = \\big||z_1| - |z_2|\\big|$." },
        { text: "$z_1 \\perp z_2$ (perpendicular arrows)", feedback: "Then $|z_1 - z_2|^2 = |z_1|^2 + |z_2|^2$, smaller than $(|z_1| + |z_2|)^2$." },
        { text: "never", feedback: "It happens: $|3 - (-2)| = 5 = 3 + 2$." },
      ],
      hint: "Write $z_1 - z_2 = z_1 + (-z_2)$ and apply the same-direction rule.",
    },
    {
      type: "numeric",
      id: "cq3-6-q5",
      variant: "practice",
      question: "If $|z| \\le 3$, find the greatest value of $|z + 6 - 8i|$.",
      answer: 13,
      hint: "$|z + 6 - 8i|$ is the distance from $z$ to $-6 + 8i$, which is 10 from the origin.",
      solution: "$|z + (6 - 8i)| \\le |z| + |6 - 8i| \\le 3 + 10 = 13$, attained at $z = \\frac{3}{10}(6 - 8i)$.",
      commonMistakes: [
        { answer: 7, feedback: "$7$ is the least value. For the greatest, go to the far side of the disc." },
        { answer: 17, feedback: "$|6 - 8i| = \\sqrt{36 + 64} = 10$, not $14$." },
      ],
    },
    {
      type: "numeric",
      id: "cq3-6-q6",
      variant: "practice",
      question: "If $|z| \\le 3$, find the least value of $|z + 6 - 8i|$.",
      answer: 7,
      hint: "Reverse triangle inequality: $|z + w| \\ge |w| - |z|$.",
      solution: "$|z + (6 - 8i)| \\ge 10 - |z| \\ge 7$, attained at $z = -\\frac{3}{10}(6 - 8i)$, the point of the disc nearest $-6 + 8i$.",
      commonMistakes: [
        { answer: 0, feedback: "The point $-6 + 8i$ is outside the disc $|z| \\le 3$, so the distance cannot be $0$." },
        { answer: 13, feedback: "$13$ is the greatest value." },
      ],
    },
    {
      type: "quiz",
      id: "cq3-6-q7",
      variant: "concept",
      multiple: true,
      question: "Which statements hold for **all** complex numbers $z_1, z_2$? Select all that apply.",
      options: [
        { text: "$|z_1 + z_2| \\le |z_1| + |z_2|$", correct: true, feedback: "The triangle inequality." },
        { text: "$|z_1 - z_2| \\ge |z_1| - |z_2|$", correct: true, feedback: "The reverse triangle inequality (even with the absolute value outside)." },
        { text: "$|z_1 - z_2| \\le |z_1| - |z_2|$", feedback: "Fails for $z_1 = 1$, $z_2 = -1$: $2 \\le 0$ is false." },
        { text: "$|z_1 + z_2|^2 + |z_1 - z_2|^2 = 2\\left(|z_1|^2 + |z_2|^2\\right)$", correct: true, feedback: "The parallelogram law: the cross terms $\\pm 2\\operatorname{Re}(z_1\\bar z_2)$ cancel." },
        { text: "$|z_1 + z_2| \\ge |z_1| + |z_2|$", feedback: "Reversed. Equality is the best it can do." },
      ],
      hint: "Test any doubtful statement on $z_1 = 1$, $z_2 = -1$ and on $z_1 = 1$, $z_2 = i$.",
    },
    {
      type: "numeric",
      id: "cq3-6-q8",
      variant: "practice",
      question: "Find the least value of $|z - 2| + |z + 2|$ over all complex $z$.",
      answer: 4,
      hint: "Write it as $|2 - z| + |z + 2|$ and apply the triangle inequality.",
      solution: "$|2 - z| + |z + 2| \\ge |(2 - z) + (z + 2)| = 4$, with equality for every real $z$ in $[-2, 2]$.",
      commonMistakes: [{ answer: 0, feedback: "The two distances cannot both vanish: no point is at $2$ and $-2$ at once." }],
    },
    {
      type: "quiz",
      id: "cq3-6-q9",
      variant: "practice",
      question: "JEE Main. If $|z + 4| \\le 3$, the greatest value of $|z + 1|$ is",
      options: [
        { text: "$6$", correct: true, feedback: "$|z + 1| = |(z + 4) - 3| \\le |z + 4| + 3 \\le 6$, attained at $z = -7$." },
        { text: "$4$", feedback: "The centre $-4$ is $3$ from $-1$, and the farthest point of the disc is a further radius $3$ beyond the centre: $3 + 3$." },
        { text: "$3$", feedback: "$3$ is the distance from the centre $-4$ to $-1$. Add the radius." },
        { text: "$7$", feedback: "At $z = -7$, $|z + 1| = 6$. Check that $-8$ is outside the disc." },
      ],
      hint: "Write $z + 1 = (z + 4) - 3$.",
    },
    {
      type: "numeric",
      id: "cq3-6-q10",
      variant: "practice",
      question: "JEE Main. If $|z| = 2$, find the greatest value of $\\left|z + \\frac1z\\right|$.",
      answer: 2.5,
      tolerance: 0.001,
      hint: "Triangle inequality, then check that some $z$ with $|z| = 2$ attains the bound.",
      solution: "$\\left|z + \\frac1z\\right| \\le |z| + \\frac{1}{|z|} = 2 + \\frac12 = \\frac52$, attained at $z = 2$ (both terms positive real). (The least value is $2 - \\frac12 = \\frac32$, at $z = 2i$.)",
      commonMistakes: [
        { answer: 1.5, tolerance: 0.001, feedback: "$\\frac32$ is the least value, at $z = \\pm 2i$." },
        { answer: 4, feedback: "$\\left|\\frac1z\\right| = \\frac{1}{|z|} = \\frac12$, not $2$." },
      ],
    },
    {
      type: "numeric",
      id: "cq3-6-q11",
      variant: "practice",
      question: "JEE Advanced. Complex numbers $z_1, z_2, z_3$ satisfy $|z_1| = 1$, $|z_2| = 2$, $|z_3| = 3$ and $|9z_1z_2 + 4z_1z_3 + z_2z_3| = 12$. Find $|z_1 + z_2 + z_3|$.",
      answer: 2,
      hint: "Factor out $z_1z_2z_3$ and use $\\frac{1}{z} = \\frac{\\bar z}{|z|^2}$.",
      solution: "$9z_1z_2 + 4z_1z_3 + z_2z_3 = z_1z_2z_3\\left(\\frac{9}{z_3} + \\frac{4}{z_2} + \\frac{1}{z_1}\\right) = z_1z_2z_3\\left(\\bar z_3 + \\bar z_2 + \\bar z_1\\right)$, because $\\frac{9}{z_3} = \\frac{9\\bar z_3}{|z_3|^2} = \\bar z_3$ and similarly for the others.\n\nTaking moduli: $12 = 1 \\cdot 2 \\cdot 3 \\cdot |\\overline{z_1 + z_2 + z_3}| = 6|z_1 + z_2 + z_3|$, so $|z_1 + z_2 + z_3| = 2$.",
      commonMistakes: [
        { answer: 6, feedback: "$6 = |z_1| + |z_2| + |z_3|$ is only an upper bound, and it is not the value here." },
        { answer: 12, feedback: "Divide by $|z_1z_2z_3| = 6$." },
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
        "This chapter rests on four pictures: a point and its arrow, the angle the arrow makes, the product as a stretch-and-turn, and the triangle formed by two arrows and their sum. If you can redraw those four pictures, every formula in the chapter follows. This lesson first asks you to rebuild the key results with no formula sheet, then tests the whole chapter at JEE level.",
    },
    { type: "heading", text: "Reconstruct it" },
    {
      type: "callout",
      variant: "tip",
      title: "How to use this section",
      content:
        "Each example below hides its steps. Try to produce the whole argument on paper first, then reveal one step at a time and compare. If you get stuck, the lesson in brackets has the full story.",
    },
    {
      type: "worked-example",
      id: "cq3-7-we1",
      title: "Reconstruct 1: the product rule (lesson 3.5)",
      problem:
        "Starting only from $i^2 = -1$ and the angle-addition formulas, prove that $r_1(\\cos\\theta_1 + i\\sin\\theta_1) \\cdot r_2(\\cos\\theta_2 + i\\sin\\theta_2) = r_1r_2\\left(\\cos(\\theta_1 + \\theta_2) + i\\sin(\\theta_1 + \\theta_2)\\right)$, and state what it means geometrically.",
      steps: [
        { text: "Multiply out the brackets, four terms: $\\cos\\theta_1\\cos\\theta_2 + i\\cos\\theta_1\\sin\\theta_2 + i\\sin\\theta_1\\cos\\theta_2 + i^2\\sin\\theta_1\\sin\\theta_2$." },
        { text: "Use $i^2 = -1$ and collect real and imaginary parts." },
        { latex: "(\\cos\\theta_1\\cos\\theta_2 - \\sin\\theta_1\\sin\\theta_2) + i(\\sin\\theta_1\\cos\\theta_2 + \\cos\\theta_1\\sin\\theta_2)" },
        { text: "Recognise $\\cos(\\theta_1 + \\theta_2)$ and $\\sin(\\theta_1 + \\theta_2)$, and put back the factor $r_1r_2$." },
        { text: "Meaning: multiplying by $z_2$ scales every point by $|z_2|$ and rotates it about $O$ through $\\arg z_2$. Moduli multiply, arguments add." },
      ],
      answer: "$z_1z_2 = r_1r_2\\,e^{i(\\theta_1 + \\theta_2)}$: scale by $r_2$, rotate by $\\theta_2$.",
    },
    {
      type: "worked-example",
      id: "cq3-7-we2",
      title: "Reconstruct 2: the principal-argument rule (lesson 3.2)",
      problem:
        "Without the table, find $\\operatorname{Arg} z$ for $z = x + iy$ in each quadrant in terms of the acute angle $\\alpha = \\tan^{-1}\\left|\\frac{y}{x}\\right|$, using only a sketch.",
      steps: [
        { text: "Draw the arrow and the acute angle $\\alpha$ it makes with the real axis (positive or negative side, whichever is nearer)." },
        { text: "Quadrant I: the arrow is $\\alpha$ above the positive real axis, so $\\operatorname{Arg} z = \\alpha$. Quadrant IV: $\\alpha$ below it, so $-\\alpha$." },
        { text: "Quadrant II: the arrow is $\\alpha$ above the **negative** real axis, which is at angle $\\pi$, so the arrow is at $\\pi - \\alpha$." },
        { text: "Quadrant III: $\\alpha$ below the negative real axis. Measured clockwise (to stay in $(-\\pi, \\pi]$) that is $-(\\pi - \\alpha)$." },
      ],
      answer: "$\\alpha$, $\\pi - \\alpha$, $-(\\pi - \\alpha)$, $-\\alpha$ in quadrants I, II, III, IV.",
    },
    {
      type: "worked-example",
      id: "cq3-7-we3",
      title: "Reconstruct 3: the triangle inequality (lesson 3.6)",
      problem: "Prove $|z_1 + z_2| \\le |z_1| + |z_2|$ from $|w|^2 = w\\bar w$, and find when equality holds.",
      steps: [
        { text: "$|z_1 + z_2|^2 = (z_1 + z_2)(\\bar z_1 + \\bar z_2) = |z_1|^2 + |z_2|^2 + 2\\operatorname{Re}(z_1\\bar z_2)$." },
        { text: "$\\operatorname{Re}(w) \\le |w|$ for any $w$, and $|z_1\\bar z_2| = |z_1||z_2|$." },
        { text: "So $|z_1 + z_2|^2 \\le (|z_1| + |z_2|)^2$. Equality iff $z_1\\bar z_2 \\ge 0$ (real, non-negative), that is, the arrows point the same way." },
      ],
      answer: "$|z_1 + z_2| \\le |z_1| + |z_2|$, with equality iff $\\arg z_1 = \\arg z_2$ (or one is $0$).",
    },
    {
      type: "table",
      headers: ["Picture", "Formula you should be able to rebuild"],
      rows: [
        ["Point and arrow", "$|z_1 - z_2|$ = distance, $\\frac{z_1 + z_2}{2}$ = midpoint"],
        ["Angle of the arrow", "$\\operatorname{Arg} z \\in (-\\pi, \\pi]$ by quadrant"],
        ["Unit circle", "$e^{i\\theta} = \\cos\\theta + i\\sin\\theta$, $|e^{i\\theta}| = 1$"],
        ["Stretch and turn", "$r_1e^{i\\theta_1} \\cdot r_2e^{i\\theta_2} = r_1r_2e^{i(\\theta_1 + \\theta_2)}$"],
        ["Triangle of arrows", "$\\big||z_1| - |z_2|\\big| \\le |z_1 \\pm z_2| \\le |z_1| + |z_2|$"],
      ],
    },
    { type: "heading", text: "Mastery questions" },
    {
      type: "numeric",
      id: "cq3-7-q1",
      variant: "mastery",
      question: "Find the distance between the points $1 + 2i$ and $4 - 2i$.",
      answer: 5,
      hint: "Distance is the modulus of the difference.",
      solution: "$(4 - 2i) - (1 + 2i) = 3 - 4i$, and $|3 - 4i| = 5$.",
      commonMistakes: [{ answer: 7, feedback: "$3 + 4 = 7$. The modulus is $\\sqrt{3^2 + 4^2}$." }],
    },
    {
      type: "numeric",
      id: "cq3-7-q2",
      variant: "mastery",
      question: "Find $\\operatorname{Arg}(-2 + 2\\sqrt3\\, i)$ in degrees.",
      answer: 120,
      unit: "°",
      hint: "Quadrant II: $180° - \\alpha$ with $\\tan\\alpha = \\sqrt3$.",
      solution: "$\\alpha = \\tan^{-1}\\frac{2\\sqrt3}{2} = 60°$, quadrant II, so $\\operatorname{Arg} = 120°$.",
      commonMistakes: [
        { answer: -60, feedback: "That is $\\tan^{-1}\\frac{2\\sqrt3}{-2}$, which points into quadrant IV." },
        { answer: 60, feedback: "That is the reference angle. The real part is negative." },
      ],
    },
    {
      type: "numeric",
      id: "cq3-7-q3",
      variant: "mastery",
      question: "Find the principal argument of $\\dfrac{-1 - i}{1 + i\\sqrt3}$ in degrees.",
      answer: 165,
      unit: "°",
      hint: "Subtract the arguments, then adjust into $(-180°, 180°]$.",
      solution: "$\\operatorname{Arg}(-1 - i) = -135°$ and $\\operatorname{Arg}(1 + i\\sqrt3) = 60°$. The difference is $-195°$, and $-195° + 360° = 165°$.",
      commonMistakes: [
        { answer: -195, feedback: "Right direction, but outside $(-180°, 180°]$. Add $360°$." },
        { answer: -75, feedback: "That is $-135° + 60°$, the argument of the product." },
      ],
    },
    {
      type: "quiz",
      id: "cq3-7-q4",
      variant: "mastery",
      question: "The polar form of $-\\sqrt3 - i$ with principal argument is",
      options: [
        { text: "$2\\left(\\cos\\left(-\\frac{5\\pi}{6}\\right) + i\\sin\\left(-\\frac{5\\pi}{6}\\right)\\right)$", correct: true, feedback: "Modulus 2, quadrant III, reference angle $\\frac{\\pi}{6}$: $-\\pi + \\frac{\\pi}{6}$." },
        { text: "$2\\left(\\cos\\frac{7\\pi}{6} + i\\sin\\frac{7\\pi}{6}\\right)$", feedback: "Equal in value, but $\\frac{7\\pi}{6}$ is not in $(-\\pi, \\pi]$." },
        { text: "$2\\left(\\cos\\frac{\\pi}{6} + i\\sin\\frac{\\pi}{6}\\right)$", feedback: "That is $\\sqrt3 + i$, the opposite point." },
        { text: "$-2\\left(\\cos\\frac{\\pi}{6} + i\\sin\\frac{\\pi}{6}\\right)$", feedback: "Equal in value, but a negative front factor is not polar form." },
      ],
      hint: "Modulus first, then quadrant, then reference angle.",
    },
    {
      type: "quiz",
      id: "cq3-7-q5",
      variant: "mastery",
      multiple: true,
      question: "Let $z = 2e^{i\\pi/3}$. Which statements are true? Select all that apply.",
      options: [
        { text: "$\\bar z = 2e^{-i\\pi/3}$", correct: true, feedback: "Conjugation reverses the angle and keeps the length." },
        { text: "$iz = 2e^{i5\\pi/6}$", correct: true, feedback: "Multiplying by $i$ adds $\\frac{\\pi}{2}$: $\\frac{\\pi}{3} + \\frac{\\pi}{2} = \\frac{5\\pi}{6}$." },
        { text: "$-z = 2e^{i2\\pi/3}$", feedback: "$-z$ adds $\\pi$: $\\frac{4\\pi}{3}$, that is $2e^{-i2\\pi/3}$. $2e^{i2\\pi/3}$ is $-\\bar z$." },
        { text: "$\\frac1z = 2e^{-i\\pi/3}$", feedback: "$\\frac1z = \\frac12 e^{-i\\pi/3}$: the modulus is inverted too." },
        { text: "$z^2 = 4e^{i2\\pi/3}$", correct: true, feedback: "Square the modulus, double the argument." },
      ],
      hint: "Each operation is a stretch and/or turn: work out what it does to $r = 2$ and to $\\theta = \\frac{\\pi}{3}$.",
    },
    {
      type: "numeric",
      id: "cq3-7-q6",
      variant: "mastery",
      question: "$|z_1| = 3$, $|z_2| = 4$ and $\\arg z_1 - \\arg z_2 = \\frac{\\pi}{2}$. Find $|z_1 + z_2|$.",
      answer: 5,
      hint: "Perpendicular arrows: $\\operatorname{Re}(z_1\\bar z_2) = 0$.",
      solution: "$|z_1 + z_2|^2 = 9 + 16 + 2\\operatorname{Re}(z_1\\bar z_2)$, and $z_1\\bar z_2 = 12e^{i\\pi/2} = 12i$ has real part $0$. So $|z_1 + z_2| = 5$.",
      commonMistakes: [
        { answer: 7, feedback: "$7$ needs the arrows to point the same way. Here they are perpendicular." },
        { answer: 1, feedback: "$1$ needs the arrows to point opposite ways." },
      ],
    },
    {
      type: "numeric",
      id: "cq3-7-q7",
      variant: "mastery",
      question: "If $|z - 2i| \\le 1$, find the greatest value of $|z + 2|$ to two decimal places.",
      answer: 3.828,
      tolerance: 0.01,
      hint: "Write $z + 2 = (z - 2i) + (2 + 2i)$.",
      solution: "$|z + 2| \\le |z - 2i| + |2 + 2i| \\le 1 + 2\\sqrt2 \\approx 3.83$, attained where the line from $-2$ through the centre $2i$ meets the far side of the disc.",
      commonMistakes: [
        { answer: 1.828, tolerance: 0.01, feedback: "That is the least value, $2\\sqrt2 - 1$." },
        { answer: 5, feedback: "$|2 + 2i| = 2\\sqrt2 \\approx 2.83$, not $4$." },
      ],
    },
    {
      type: "quiz",
      id: "cq3-7-q8",
      variant: "mastery",
      question: "If $\\operatorname{Arg} z_1 = \\frac{5\\pi}{6}$ and $\\operatorname{Arg} z_2 = \\frac{\\pi}{2}$, then $\\operatorname{Arg}(z_1z_2) = $",
      options: [
        { text: "$-\\frac{2\\pi}{3}$", correct: true, feedback: "$\\frac{5\\pi}{6} + \\frac{\\pi}{2} = \\frac{4\\pi}{3}$, and $\\frac{4\\pi}{3} - 2\\pi = -\\frac{2\\pi}{3}$." },
        { text: "$\\frac{4\\pi}{3}$", feedback: "Right direction, but not in $(-\\pi, \\pi]$." },
        { text: "$\\frac{\\pi}{3}$", feedback: "That is the difference of the arguments." },
        { text: "$\\frac{5\\pi^2}{12}$", feedback: "Arguments add, they do not multiply." },
      ],
      hint: "Add, then subtract $2\\pi$ if the sum leaves $(-\\pi, \\pi]$.",
    },
    {
      type: "numeric",
      id: "cq3-7-q9",
      variant: "mastery",
      question: "Find the principal argument of $1 + \\cos\\frac{2\\pi}{3} + i\\sin\\frac{2\\pi}{3}$ in degrees.",
      answer: 60,
      unit: "°",
      hint: "$1 + \\cos\\alpha + i\\sin\\alpha = 2\\cos\\frac{\\alpha}{2}\\left(\\cos\\frac{\\alpha}{2} + i\\sin\\frac{\\alpha}{2}\\right)$.",
      solution: "With $\\alpha = 120°$: $2\\cos 60°(\\cos 60° + i\\sin 60°)$, and $2\\cos 60° = 1 > 0$, so the argument is $60°$. (Directly: $1 - \\frac12 + \\frac{\\sqrt3}{2}i$.)",
      commonMistakes: [{ answer: 120, feedback: "$120°$ is the angle of $e^{i\\alpha}$. Adding $1$ halves the angle." }],
    },
    {
      type: "quiz",
      id: "cq3-7-q10",
      variant: "mastery",
      question: "JEE Main. The point $1 + 2i$ is rotated through $90°$ anticlockwise about the origin, and the image is then reflected in the real axis. The final point is",
      options: [
        { text: "$-2 - i$", correct: true, feedback: "$i(1 + 2i) = -2 + i$, and its conjugate is $-2 - i$." },
        { text: "$-2 + i$", feedback: "That is the rotated point before the reflection." },
        { text: "$2 - i$", feedback: "That rotates clockwise: $-i(1 + 2i) = 2 - i$." },
        { text: "$1 - 2i$", feedback: "That reflects without rotating." },
      ],
      hint: "Rotation by $90°$ anticlockwise is multiplication by $i$, reflection in the real axis is conjugation.",
    },
    {
      type: "quiz",
      id: "cq3-7-q11",
      variant: "mastery",
      multiple: true,
      question: "JEE Advanced. Non-zero complex numbers satisfy $|z_1 + z_2| = |z_1 - z_2|$. Which statements must be true? Select all that apply.",
      options: [
        { text: "$\\operatorname{Re}(z_1\\bar z_2) = 0$", correct: true, feedback: "Subtracting the expansions of the two squares leaves $4\\operatorname{Re}(z_1\\bar z_2) = 0$." },
        { text: "$\\frac{z_1}{z_2}$ is purely imaginary", correct: true, feedback: "$\\frac{z_1}{z_2} = \\frac{z_1\\bar z_2}{|z_2|^2}$ has real part $0$ and is non-zero." },
        { text: "$\\arg z_1 - \\arg z_2 = \\pm\\frac{\\pi}{2}$ (mod $2\\pi$)", correct: true, feedback: "The arrows are perpendicular: the parallelogram is a rectangle with equal diagonals." },
        { text: "$|z_1| = |z_2|$", feedback: "Not needed: $z_1 = 1$, $z_2 = 5i$ works." },
        { text: "$z_1 + z_2 = 0$", feedback: "Then $|z_1 + z_2| = 0$ while $|z_1 - z_2| = 2|z_1| \\ne 0$." },
      ],
      hint: "Expand both sides with $|w|^2 = w\\bar w$ and subtract.",
    },
    {
      type: "numeric",
      id: "cq3-7-q12",
      variant: "mastery",
      question: "JEE Main. Find the principal argument of $\\dfrac{-1 + i}{\\sqrt3 + i}$ in degrees.",
      answer: 105,
      unit: "°",
      hint: "Arguments subtract: $135° - 30°$.",
      solution: "$\\operatorname{Arg}(-1 + i) - \\operatorname{Arg}(\\sqrt3 + i) = 135° - 30° = 105°$, already in $(-180°, 180°]$.",
      commonMistakes: [
        { answer: 165, feedback: "That adds the arguments. A quotient subtracts them." },
        { answer: -15, feedback: "$\\operatorname{Arg}(-1 + i)$ is $135°$, not $15°$ or $-45°$: the point is in quadrant II." },
      ],
    },
    {
      type: "numeric",
      id: "cq3-7-q13",
      variant: "mastery",
      question: "JEE Advanced. $z$ varies over the disc $|z - 3 + 2i| \\le 4$. Find the difference between the greatest and least values of $|z + 1 - 5i|$.",
      answer: 8,
      hint: "The disc has centre $3 - 2i$ and radius 4. How far is its centre from $-1 + 5i$, and is that point inside the disc?",
      solution: "$|z + 1 - 5i|$ is the distance from $z$ to $-1 + 5i$. The centre $3 - 2i$ is $|4 - 7i| = \\sqrt{65} \\approx 8.06$ away, more than the radius, so the point is outside. Greatest $= \\sqrt{65} + 4$, least $= \\sqrt{65} - 4$, difference $= 8$, twice the radius.",
      commonMistakes: [
        { answer: 4, feedback: "That is the radius. The greatest and least distances differ by a whole diameter." },
        { answer: 12.06, tolerance: 0.01, feedback: "That is the greatest value alone. Subtract the least value." },
      ],
    },
    {
      type: "quiz",
      id: "cq3-7-q14",
      variant: "mastery",
      question: "For non-zero $z_1, z_2$, the equality $|z_1 - z_2| = \\big||z_1| - |z_2|\\big|$ holds exactly when",
      options: [
        { text: "$z_1$ and $z_2$ point in the same direction", correct: true, feedback: "Then the arrow from $z_2$ to $z_1$ runs along the same ray, with length the difference of the moduli." },
        { text: "$z_1$ and $z_2$ point in opposite directions", feedback: "Then $|z_1 - z_2| = |z_1| + |z_2|$, the largest possible." },
        { text: "$|z_1| = |z_2|$", feedback: "That makes the right side $0$, forcing $z_1 = z_2$. Not the general condition." },
        { text: "$z_1$ and $z_2$ are perpendicular", feedback: "Then $|z_1 - z_2|^2 = |z_1|^2 + |z_2|^2$." },
      ],
      hint: "When is the third side of the triangle $O$, $z_1$, $z_2$ as short as possible?",
    },
    {
      type: "numeric",
      id: "cq3-7-q15",
      variant: "mastery",
      question: "JEE Main. Find the principal argument of $1 + i\\tan\\frac{3\\pi}{4}$ in degrees.",
      answer: -45,
      unit: "°",
      hint: "Either evaluate $\\tan\\frac{3\\pi}{4}$ directly, or use $1 + i\\tan\\alpha = (-\\sec\\alpha)e^{i(\\alpha - \\pi)}$ for obtuse $\\alpha$.",
      solution: "$\\tan\\frac{3\\pi}{4} = -1$, so the number is $1 - i$, with argument $-45°$. The general rule gives the same: $\\alpha - \\pi = 135° - 180° = -45°$.",
      commonMistakes: [
        { answer: 135, feedback: "The real part is $1 > 0$, so the argument cannot be obtuse. Subtract $180°$." },
        { answer: 45, feedback: "The imaginary part is $\\tan 135° = -1 < 0$." },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Where next",
      content:
        "The product rule says multiplying by $re^{i\\theta}$ scales by $r$ and turns by $\\theta$. Do it $n$ times and you get $(re^{i\\theta})^n = r^ne^{in\\theta}$: that is De Moivre's theorem, the subject of Chapter 4. Run it backwards and you can take $n$-th roots, which turn out to sit at the corners of a regular polygon.",
    },
  ]),
};

export const cqChapter3Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lessonMastery,
];
