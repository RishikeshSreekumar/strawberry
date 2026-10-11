import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Three-Dimensional Geometry Chapter 5 — Lines and Planes Together. A line
 * (point plus direction) and a plane (point plus normal) in one picture:
 * the angle between them (sin φ = |b·n| / |b||n|), parallel, perpendicular
 * and lying-in conditions, where a line meets a plane, the ratio in which a
 * plane divides a segment, distance measured along a line, the foot and
 * image of a point in a plane, the image of a line, coplanar lines and the
 * plane containing them, lines given as the intersection of two planes,
 * the projection of a line on a plane, JEE mixed problems and a
 * full-course mastery diagnostic.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "the-angle-between-a-line-and-a-plane",
  title: "5.1 · The Angle Between a Line and a Plane",
  position: 1,
  blocks: blocks([
    {
      type: "text",
      content:
        "Chapters 2 and 3 were about lines, Chapter 4 about planes. This chapter puts one of each in the same picture. A line is a point $A$ plus a direction $\\vec b$; a plane is a point plus a normal $\\vec n$. Almost every question about the pair comes down to one number: the dot product $\\vec b \\cdot \\vec n$.",
    },
    {
      type: "text",
      content:
        "Start with the angle. Hold a pencil against a table top. The angle the pencil makes with the table is measured to its **shadow** on the table, not to some arbitrary line drawn on the table. If the pencil stands straight up, the angle is $90^\\circ$; if it lies flat, the angle is $0^\\circ$.",
    },
    { type: "heading", text: "The angle with the normal, and its complement" },
    {
      type: "text",
      content:
        "The normal $\\vec n$ stands straight up from the plane. If the line makes an angle $\\theta$ with the normal, it makes the complementary angle $\\phi = 90^\\circ - \\theta$ with the plane itself: a line along the normal ($\\theta = 0$) is perpendicular to the plane ($\\phi = 90^\\circ$), and a line perpendicular to the normal ($\\theta = 90^\\circ$) runs flat along the plane ($\\phi = 0$). Since $\\cos\\theta = \\sin(90^\\circ - \\theta) = \\sin\\phi$, the dot product of $\\vec b$ and $\\vec n$ gives the **sine** of the angle we want:",
    },
    {
      type: "math",
      latex: "\\sin\\phi = \\cos\\theta = \\frac{\\lvert \\vec b \\cdot \\vec n \\rvert}{\\lvert \\vec b \\rvert\\,\\lvert \\vec n \\rvert} = \\frac{\\lvert a_1a_2 + b_1b_2 + c_1c_2 \\rvert}{\\sqrt{a_1^2 + b_1^2 + c_1^2}\\,\\sqrt{a_2^2 + b_2^2 + c_2^2}}",
    },
    {
      type: "text",
      content:
        "Here $(a_1, b_1, c_1)$ are direction ratios of the line and $(a_2, b_2, c_2)$ is the normal of the plane $a_2x + b_2y + c_2z + d = 0$. The modulus makes $\\phi$ the acute angle, $0^\\circ \\le \\phi \\le 90^\\circ$, exactly as for two lines in Chapter 1.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Angle between a line and a plane",
      content:
        "For the line $\\vec r = \\vec a + \\lambda\\vec b$ and the plane $\\vec r \\cdot \\vec n = d$, the angle $\\phi$ between them satisfies\n\n$$\\sin\\phi = \\frac{\\lvert \\vec b \\cdot \\vec n \\rvert}{\\lvert \\vec b \\rvert\\,\\lvert \\vec n \\rvert}.$$\n\n- **Parallel to the plane** (or lying in it): $\\vec b \\cdot \\vec n = 0$, so $\\phi = 0$.\n- **Perpendicular to the plane**: $\\vec b \\parallel \\vec n$, i.e. $\\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2}$, so $\\phi = 90^\\circ$.\n- **Lying in the plane**: parallel to it **and** one point of the line (say $A$) satisfies the plane equation.",
    },
    {
      type: "interactive",
      config: {
        component: "tdg-space-viewer",
        mode: "line-plane",
        a: [1, 2, -1],
        b: [1, -1, 1],
        plane: [2, -1, 1, -4],
        show: ["normal", "intersection", "projection"],
        caption:
          "The line $\\vec r = (\\hat i + 2\\hat j - \\hat k) + \\lambda(\\hat i - \\hat j + \\hat k)$ and the plane $2x - y + z = 4$ with its normal. Rotate until the plane is seen edge-on: the angle $\\phi$ is measured from the line to its **shadow** (the projection) in the plane, and the angle to the normal is $90^\\circ - \\phi$.",
      },
    },
    {
      type: "worked-example",
      id: "tdg5-1-we1",
      title: "Worked example 1: the angle from the formula",
      problem:
        "Find the angle between the line $\\vec r = (\\hat i + 2\\hat j - \\hat k) + \\lambda(\\hat i - \\hat j + \\hat k)$ and the plane $2x - y + z = 4$.",
      steps: [
        { text: "Read the direction of the line, $\\vec b = (1, -1, 1)$, and the normal of the plane, $\\vec n = (2, -1, 1)$." },
        {
          text: "Dot product and lengths. *Why this step:* the dot product compares the line with the **normal**, which is why it gives a sine, not a cosine.",
          latex: "\\vec b \\cdot \\vec n = 2 + 1 + 1 = 4, \\qquad \\lvert\\vec b\\rvert = \\sqrt3, \\qquad \\lvert\\vec n\\rvert = \\sqrt6",
        },
        { latex: "\\sin\\phi = \\frac{4}{\\sqrt3\\,\\sqrt6} = \\frac{4}{3\\sqrt2} = \\frac{2\\sqrt2}{3}" },
        { text: "So $\\phi = \\sin^{-1}\\frac{2\\sqrt2}{3} \\approx 70.5^\\circ$. The line is steep: it makes only about $19.5^\\circ$ with the normal." },
      ],
      answer: "$\\phi = \\sin^{-1}\\frac{2\\sqrt2}{3} \\approx 70.5^\\circ$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"use cos, just like two lines\"",
      content:
        "For two lines, $\\cos\\theta = \\frac{\\lvert\\vec b_1 \\cdot \\vec b_2\\rvert}{\\lvert\\vec b_1\\rvert\\lvert\\vec b_2\\rvert}$. Copying that with $\\vec n$ in place of $\\vec b_2$ gives the angle with the **normal**, which is the complement of the answer. A quick sanity check: a line along the normal gives $\\vec b \\cdot \\vec n = \\lvert\\vec b\\rvert\\lvert\\vec n\\rvert$, and it must come out as $90^\\circ$ to the plane. Only $\\sin$ does that.",
    },
    { type: "heading", text: "Parallel, perpendicular, or lying in the plane" },
    {
      type: "text",
      content:
        "The two extreme cases give clean algebraic tests. $\\vec b \\cdot \\vec n = 0$ says the line runs flat: it is parallel to the plane, and either never touches it or lies entirely in it. To decide which, test **one** point of the line in the plane equation: if one point is in the plane and the line never leaves the plane's direction, every point is in it.",
    },
    {
      type: "worked-example",
      id: "tdg5-1-we2",
      title: "Worked example 2: parallel, then lying in the plane",
      problem:
        "Find $k$ for which the line $\\frac{x - 1}{2} = \\frac{y - 2}{k} = \\frac{z - 3}{-1}$ is parallel to the plane $x + 2y + 4z = 5$. For that $k$, does the line lie in the plane? If not, which plane parallel to the given one does contain it?",
      steps: [
        {
          text: "Parallel means the direction is perpendicular to the normal:",
          latex: "(2, k, -1) \\cdot (1, 2, 4) = 2 + 2k - 4 = 0 \\implies k = 1",
        },
        { text: "Test the point $(1, 2, 3)$ of the line: $1 + 4 + 12 = 17 \\ne 5$. So the line is parallel to the plane but never meets it." },
        { text: "*Why this step:* a plane with the same normal through $(1, 2, 3)$ contains the line, because the line is parallel to it and shares a point. That plane is $x + 2y + 4z = 17$." },
      ],
      answer: "$k = 1$; the line is parallel to $x + 2y + 4z = 5$ (not in it) and lies in $x + 2y + 4z = 17$.",
    },
    {
      type: "worked-example",
      id: "tdg5-1-we3",
      title: "Worked example 3: perpendicular to a plane",
      problem:
        "The line $\\frac{x - 2}{3} = \\frac{y + 1}{\\alpha} = \\frac{z - 4}{-6}$ is perpendicular to the plane $x + 2y + \\beta z = 9$. Find $\\alpha$ and $\\beta$.",
      steps: [
        { text: "Perpendicular to the plane means parallel to its normal, so the direction ratios are proportional." },
        { latex: "\\frac{3}{1} = \\frac{\\alpha}{2} = \\frac{-6}{\\beta}" },
        { text: "The first ratio is 3, so $\\alpha = 6$ and $\\beta = -2$. *Why this step:* the known pair $(3, 1)$ fixes the scale factor; the unknowns follow from it." },
      ],
      answer: "$\\alpha = 6$, $\\beta = -2$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"perpendicular to the plane means $\\vec b \\cdot \\vec n = 0$\"",
      content:
        "$\\vec b \\cdot \\vec n = 0$ says the line is perpendicular to the **normal**, so it is **parallel** to the plane. A line perpendicular to the plane is parallel to the normal: proportional direction ratios, $\\vec b \\times \\vec n = \\vec 0$.",
    },
    {
      type: "interactive",
      config: {
        component: "tdg-distance-lab",
        mode: "line-plane",
        p1: [1, 2, -1],
        d1: [1, -1, 1],
        plane1: [2, -1, 1, -4],
        caption:
          "Worked example 1 on live numbers. Step the direction ratios until $\\vec b \\cdot \\vec n = 0$ (try $(1, 1, -1)$): the angle drops to $0^\\circ$, and the readout says whether the line is parallel to the plane or lies in it. Then make $\\vec b$ a multiple of $(2, -1, 1)$ and watch $\\phi$ reach $90^\\circ$.",
      },
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "tdg5-1-q1",
      variant: "practice",
      question: "Find the angle, in degrees, between the line $\\frac{x}{1} = \\frac{y}{1} = \\frac{z}{\\sqrt6}$ and the xy-plane.",
      answer: 60,
      unit: "degrees",
      hint: "The xy-plane is $z = 0$, with normal $(0, 0, 1)$. Use $\\sin\\phi = \\frac{\\lvert\\vec b \\cdot \\vec n\\rvert}{\\lvert\\vec b\\rvert\\lvert\\vec n\\rvert}$.",
      solution: "$\\vec b = (1, 1, \\sqrt6)$ has length $\\sqrt8$, and $\\vec b \\cdot \\vec n = \\sqrt6$. So $\\sin\\phi = \\frac{\\sqrt6}{\\sqrt8} = \\frac{\\sqrt3}{2}$ and $\\phi = 60^\\circ$.",
      commonMistakes: [
        { answer: 30, feedback: "That is the angle with the normal (the z-axis). The angle with the plane is its complement." },
      ],
    },
    {
      type: "quiz",
      id: "tdg5-1-q2",
      variant: "concept",
      question: "A line has direction $\\vec b$ and a plane has normal $\\vec n$. The quantity $\\frac{\\lvert\\vec b \\cdot \\vec n\\rvert}{\\lvert\\vec b\\rvert\\lvert\\vec n\\rvert}$ equals",
      options: [
        { text: "the sine of the angle between the line and the plane", correct: true, feedback: "It is the cosine of the angle with the normal, which is the sine of the complementary angle with the plane." },
        { text: "the cosine of the angle between the line and the plane", feedback: "That would make a line along the normal sit at $0^\\circ$ to the plane, which is backwards." },
        { text: "the tangent of the angle between the line and the plane", feedback: "A ratio of a dot product to lengths is a cosine of something: here of the angle with the normal." },
        { text: "zero whenever the line meets the plane", feedback: "It is zero when the line is **parallel** to the plane, which is exactly when it may not meet it." },
      ],
      hint: "What angle does the dot product measure, and how is it related to the angle with the plane?",
    },
    {
      type: "numeric",
      id: "tdg5-1-q3",
      variant: "practice",
      question:
        "Find $\\sin\\phi$, where $\\phi$ is the angle between the line $\\frac{x + 1}{2} = \\frac{y - 3}{3} = \\frac{z - 4}{6}$ and the plane $10x + 2y - 11z = 3$. (A fraction such as 3/7 is fine.)",
      answer: 0.3809524,
      tolerance: 0.001,
      hint: "$\\vec b = (2, 3, 6)$ has length 7 and $\\vec n = (10, 2, -11)$ has length 15.",
      solution: "$\\vec b \\cdot \\vec n = 20 + 6 - 66 = -40$, so $\\sin\\phi = \\frac{40}{7 \\cdot 15} = \\frac{8}{21} \\approx 0.381$. The negative sign only says $\\vec b$ makes an obtuse angle with this choice of normal.",
      commonMistakes: [
        { answer: -0.3809524, tolerance: 0.001, feedback: "Take the modulus: the angle between a line and a plane lies between $0^\\circ$ and $90^\\circ$." },
        { answer: 0.9246, tolerance: 0.002, feedback: "That is $\\cos\\phi$. The dot-product ratio is already $\\sin\\phi$." },
      ],
    },
    {
      type: "numeric",
      id: "tdg5-1-q4",
      variant: "practice",
      question: "Find $k$ so that the line $\\frac{x - 2}{3} = \\frac{y + 1}{k} = \\frac{z - 1}{-2}$ is parallel to the plane $2x + y + 4z = 5$.",
      answer: 2,
      hint: "Parallel to the plane means $\\vec b \\cdot \\vec n = 0$.",
      solution: "$(3, k, -2) \\cdot (2, 1, 4) = 6 + k - 8 = 0$, so $k = 2$. (The point $(2, -1, 1)$ gives $4 - 1 + 4 = 7 \\ne 5$, so the line is parallel to the plane without lying in it.)",
      commonMistakes: [
        { answer: -2, feedback: "Check the sum: $6 + k - 8 = 0$ gives $k = +2$." },
        { answer: 1.5, feedback: "That makes the direction **proportional** to the normal in its first entry, which is the perpendicular test, not the parallel one." },
      ],
    },
    {
      type: "quiz",
      id: "tdg5-1-q5",
      variant: "practice",
      multiple: true,
      question:
        "The line $\\frac{x - 1}{1} = \\frac{y + 2}{-1} = \\frac{z - 3}{2}$ never crosses which of these planes at a single point (it is parallel to the plane or lies in it)? Select all that apply.",
      options: [
        { text: "$x + y = 7$", correct: true, feedback: "$(1, -1, 2) \\cdot (1, 1, 0) = 0$: parallel. The point $(1, -2, 3)$ gives $-1 \\ne 7$, so the line never meets it." },
        { text: "$2x - z + 1 = 0$", correct: true, feedback: "$2 - 2 = 0$: parallel, and $(1, -2, 3)$ gives $2 - 3 + 1 = 0$, so the line lies in this plane." },
        { text: "$3x + y - z = 2$", correct: true, feedback: "$3 - 1 - 2 = 0$: parallel; the point gives $3 - 2 - 3 = -2 \\ne 2$." },
        { text: "$x - y + 2z = 0$", feedback: "The normal $(1, -1, 2)$ **is** the direction of the line: the line is perpendicular to this plane and crosses it once." },
        { text: "$x + y + z = 0$", feedback: "$\\vec b \\cdot \\vec n = 1 - 1 + 2 = 2 \\ne 0$, so the line crosses it at one point." },
      ],
      hint: "Compute $\\vec b \\cdot \\vec n$ with $\\vec b = (1, -1, 2)$ for each plane.",
    },
    {
      type: "numeric",
      id: "tdg5-1-q6",
      variant: "practice",
      question:
        "The line $\\frac{x - 1}{2} = \\frac{y - 1}{p} = \\frac{z - 1}{-4}$ is perpendicular to the plane $3x - 6y + qz = 1$. Find $p + q$.",
      answer: -10,
      hint: "Perpendicular to the plane: $\\frac{2}{3} = \\frac{p}{-6} = \\frac{-4}{q}$.",
      solution: "The common ratio is $\\frac23$. Then $p = \\frac23(-6) = -4$ and $-4 = \\frac23 q$ gives $q = -6$. So $p + q = -10$.",
      commonMistakes: [
        { answer: 10, feedback: "Both $p$ and $q$ are negative: $p = -4$, $q = -6$." },
        { answer: -6.6666667, feedback: "You wrote $\\frac{q}{-4} = \\frac23$, flipping the last ratio and getting $q = -\\frac83$. Keep the line's numbers on top throughout: $\\frac{-4}{q} = \\frac23$ gives $q = -6$." },
      ],
    },
    {
      type: "quiz",
      id: "tdg5-1-q7",
      variant: "practice",
      question: "The line $\\vec r = (2\\hat i - \\hat j + \\hat k) + \\lambda(\\hat i + 2\\hat j - \\hat k)$ and the plane $\\vec r \\cdot (\\hat i - \\hat j - \\hat k) = 4$",
      options: [
        { text: "are parallel and never meet", correct: true, feedback: "$\\vec b \\cdot \\vec n = 1 - 2 + 1 = 0$, and $(2, -1, 1)$ gives $2 + 1 - 1 = 2 \\ne 4$." },
        { text: "meet in exactly one point", feedback: "A single meeting point needs $\\vec b \\cdot \\vec n \\ne 0$; here it is 0." },
        { text: "the line lies in the plane", feedback: "The point $(2, -1, 1)$ is not on the plane: it gives 2, not 4." },
        { text: "the line is perpendicular to the plane", feedback: "$(1, 2, -1)$ is not a multiple of $(1, -1, -1)$." },
      ],
      hint: "Compute $\\vec b \\cdot \\vec n$ first, then test the point $\\vec a$.",
    },
    {
      type: "numeric",
      id: "tdg5-1-q8",
      variant: "practice",
      question:
        "Find the angle, in degrees, between the line $x - 1 = \\frac{2y + 3}{4} = \\frac{3 - z}{-2}$ and the plane $x + y = 1$.",
      answer: 45,
      unit: "degrees",
      tolerance: 0.1,
      hint: "Rewrite the line so each numerator is (variable minus a number) with coefficient 1: $\\frac{2y + 3}{4} = \\frac{y + 3/2}{2}$ and $\\frac{3 - z}{-2} = \\frac{z - 3}{2}$.",
      solution: "The line is $\\frac{x - 1}{1} = \\frac{y + 3/2}{2} = \\frac{z - 3}{2}$, so $\\vec b = (1, 2, 2)$ with length 3. With $\\vec n = (1, 1, 0)$: $\\sin\\phi = \\frac{3}{3\\sqrt2} = \\frac{1}{\\sqrt2}$, so $\\phi = 45^\\circ$.",
      commonMistakes: [
        { answer: 50.49, tolerance: 0.2, feedback: "You read the direction off the raw denominators $(1, 4, -2)$. Divide out the coefficients of $y$ and $z$ first (Lesson 2.2)." },
      ],
    },
    {
      type: "numeric",
      id: "tdg5-1-q9",
      variant: "practice",
      question:
        "JEE Main. The angle between the line $x - 2 = 2y = 2z$ and the plane $x - 2y + \\sqrt{\\lambda}\\,z = 1$ is $\\sin^{-1}\\frac13$. Find $\\lambda$.",
      answer: 10,
      hint: "The line is $\\frac{x - 2}{1} = \\frac{y}{1/2} = \\frac{z}{1/2}$, so $\\vec b = (2, 1, 1)$.",
      solution: "$\\vec b \\cdot \\vec n = 2 - 2 + \\sqrt\\lambda = \\sqrt\\lambda$, $\\lvert\\vec b\\rvert = \\sqrt6$, $\\lvert\\vec n\\rvert = \\sqrt{5 + \\lambda}$. So $\\frac{\\sqrt\\lambda}{\\sqrt6\\sqrt{5 + \\lambda}} = \\frac13$, i.e. $9\\lambda = 6(5 + \\lambda)$, $3\\lambda = 30$, $\\lambda = 10$.",
      commonMistakes: [
        { answer: 3.1623, tolerance: 0.01, feedback: "That is $\\sqrt\\lambda$. The question asks for $\\lambda$ itself." },
      ],
    },
    {
      type: "quiz",
      id: "tdg5-1-q10",
      variant: "concept",
      question:
        "A student says: \"The line makes $30^\\circ$ with the normal of the plane, so it makes $30^\\circ$ with the plane.\" What is the correct angle with the plane?",
      options: [
        { text: "$60^\\circ$", correct: true, feedback: "The angle with the plane is the complement of the angle with the normal: $90^\\circ - 30^\\circ$." },
        { text: "$30^\\circ$", feedback: "That is the angle with the normal. A line along the normal would then be at $0^\\circ$ to the plane, which is absurd." },
        { text: "$120^\\circ$", feedback: "Angles between a line and a plane are taken between $0^\\circ$ and $90^\\circ$." },
        { text: "It cannot be found without the equation of the line", feedback: "The angle with the normal is enough: the two angles add to $90^\\circ$." },
      ],
      hint: "The normal stands at $90^\\circ$ to the plane.",
    },
    {
      type: "numeric",
      id: "tdg5-1-q11",
      variant: "practice",
      question: "Find the angle, in degrees, between the line $\\frac x2 = \\frac y2 = \\frac z1$ and the plane $2x + 2y + z = 5$.",
      answer: 90,
      unit: "degrees",
      hint: "Compare the direction of the line with the normal of the plane.",
      solution: "$\\vec b = (2, 2, 1)$ is the normal $\\vec n$ itself, so $\\sin\\phi = \\frac{9}{3 \\cdot 3} = 1$: the line is perpendicular to the plane.",
      commonMistakes: [
        { answer: 0, feedback: "$0^\\circ$ means parallel, which needs $\\vec b \\cdot \\vec n = 0$. Here $\\vec b \\cdot \\vec n = 9$, its largest possible value." },
      ],
    },
    {
      type: "quiz",
      id: "tdg5-1-q12",
      variant: "practice",
      multiple: true,
      question:
        "JEE Main. For the line $\\frac{x - 2}{1} = \\frac{y - 1}{1} = \\frac{z + 1}{-2}$ and the plane $x + y + z = 2$, which statements are true? Select all that apply.",
      options: [
        { text: "The line lies in the plane", correct: true, feedback: "$\\vec b \\cdot \\vec n = 1 + 1 - 2 = 0$ and $(2, 1, -1)$ gives $2 + 1 - 1 = 2$." },
        { text: "The angle between the line and the plane is $0^\\circ$", correct: true, feedback: "$\\sin\\phi = 0$." },
        { text: "The direction of the line is perpendicular to the normal $(1, 1, 1)$", correct: true, feedback: "That is what $\\vec b \\cdot \\vec n = 0$ says." },
        { text: "The line meets the plane at exactly one point", feedback: "It meets it at every point: the whole line is in the plane." },
        { text: "The distance between the line and the plane is $\\frac{1}{\\sqrt3}$", feedback: "A line lying in a plane is at distance 0 from it." },
      ],
      hint: "Test $\\vec b \\cdot \\vec n$, then test the point $(2, 1, -1)$.",
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "where-a-line-meets-a-plane",
  title: "5.2 · Where a Line Meets a Plane",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "A line hits a plane the way an arrow hits a wall. Walk along the line with the parameter $\\lambda$; the plane equation tells you, at each step, how far you are from the wall (its sign says which side). At exactly one value of $\\lambda$ that reading is zero, unless you are walking parallel to the wall.",
    },
    { type: "heading", text: "Substitute the general point" },
    {
      type: "text",
      content:
        "Every point of the line $\\frac{x - x_1}{a} = \\frac{y - y_1}{b} = \\frac{z - z_1}{c} = \\lambda$ is $(x_1 + a\\lambda,\\ y_1 + b\\lambda,\\ z_1 + c\\lambda)$ (Lesson 2.3). Put it into the plane $Ax + By + Cz + D = 0$:",
    },
    {
      type: "math",
      latex: "(Ax_1 + By_1 + Cz_1 + D) + (Aa + Bb + Cc)\\lambda = 0 \\quad\\text{i.e.}\\quad P(A) + (\\vec n \\cdot \\vec b)\\lambda = 0",
    },
    {
      type: "text",
      content:
        "This is one linear equation in $\\lambda$, and it has exactly three possible outcomes. The coefficient of $\\lambda$ is $\\vec n \\cdot \\vec b$, the same quantity that decided parallelism in Lesson 5.1.",
    },
    {
      type: "table",
      headers: ["$\\vec n \\cdot \\vec b$", "$P(A)$", "Equation", "Meaning"],
      rows: [
        ["$\\ne 0$", "anything", "$\\lambda = -\\frac{P(A)}{\\vec n \\cdot \\vec b}$", "one meeting point"],
        ["$0$", "$\\ne 0$", "$P(A) = 0$ is false", "parallel, no meeting point"],
        ["$0$", "$0$", "$0 = 0$ for every $\\lambda$", "the line lies in the plane"],
      ],
    },
    {
      type: "interactive",
      config: {
        component: "tdg-space-viewer",
        mode: "line-plane",
        a: [2, -1, 2],
        b: [3, 4, 2],
        plane: [1, -1, 1, -5],
        show: ["intersection", "normal"],
        caption:
          "The line through $(2, -1, 2)$ with direction $(3, 4, 2)$ meets $x - y + z = 5$ at $\\lambda = 0$, because $(2, -1, 2)$ is already on the plane. Rotate the view: the line pierces the plane once and comes out on the other side.",
      },
    },
    {
      type: "worked-example",
      id: "tdg5-2-we1",
      title: "Worked example 1: the meeting point, then a distance",
      problem:
        "Find the distance of the point $(-1, -5, -10)$ from the point where the line $\\vec r = 2\\hat i - \\hat j + 2\\hat k + \\lambda(3\\hat i + 4\\hat j + 2\\hat k)$ meets the plane $\\vec r \\cdot (\\hat i - \\hat j + \\hat k) = 5$.",
      steps: [
        { text: "General point: $(2 + 3\\lambda,\\ -1 + 4\\lambda,\\ 2 + 2\\lambda)$." },
        {
          text: "Substitute into $x - y + z = 5$:",
          latex: "(2 + 3\\lambda) - (-1 + 4\\lambda) + (2 + 2\\lambda) = 5 + \\lambda = 5 \\implies \\lambda = 0",
        },
        { text: "So the meeting point is $(2, -1, 2)$. *Why this step:* $\\lambda = 0$ simply means the given point $\\vec a$ is already on the plane; nothing special is going on." },
        { latex: "\\sqrt{(2 + 1)^2 + (-1 + 5)^2 + (2 + 10)^2} = \\sqrt{9 + 16 + 144} = 13" },
      ],
      answer: "13.",
    },
    { type: "heading", text: "The ratio in which a plane divides a segment" },
    {
      type: "text",
      content:
        "Lesson 4.7 gave the side test: points $A$ and $B$ are on opposite sides of the plane exactly when $P(A)$ and $P(B)$ have opposite signs. The meeting point of line $AB$ with the plane is a section point. Write it as dividing $AB$ in $k : 1$, i.e. $\\frac{kB + A}{k + 1}$. Since $P$ is linear, $P\\left(\\frac{kB + A}{k + 1}\\right) = \\frac{kP(B) + P(A)}{k + 1}$, and setting this to zero gives",
    },
    {
      type: "math",
      latex: "k = -\\frac{P(A)}{P(B)}",
    },
    {
      type: "text",
      content:
        "A positive $k$ (opposite signs) means internal division; a negative $k$ (same signs) means external division: the plane meets line $AB$ outside the segment.",
    },
    {
      type: "worked-example",
      id: "tdg5-2-we2",
      title: "Worked example 2: the ratio and the point",
      problem: "In what ratio does the plane $2x + y - z = 3$ divide the segment joining $A(1, 2, 3)$ and $B(4, -1, 0)$? Find the point of division.",
      steps: [
        { text: "Evaluate $P(x, y, z) = 2x + y - z - 3$ at both ends: $P(A) = 2 + 2 - 3 - 3 = -2$, $P(B) = 8 - 1 - 0 - 3 = 4$." },
        { text: "Opposite signs, so the division is internal, with $k = -\\frac{-2}{4} = \\frac12$: the ratio is $1 : 2$." },
        {
          text: "Section formula with $AP : PB = 1 : 2$. *Why this step:* the nearer end $A$ gets the bigger weight.",
          latex: "\\frac{2A + 1B}{3} = \\left(\\frac{2 + 4}{3},\\ \\frac{4 - 1}{3},\\ \\frac{6 + 0}{3}\\right) = (2, 1, 2)",
        },
        { text: "Check: $4 + 1 - 2 = 3$. The point is on the plane." },
      ],
      answer: "Internally in the ratio $1 : 2$, at $(2, 1, 2)$.",
    },
    { type: "heading", text: "Distance measured along a line" },
    {
      type: "text",
      content:
        "The perpendicular distance from a point to a plane is the **shortest** route. JEE often asks instead for the distance measured **parallel to a given line**: walk from the point in the given direction until you hit the plane, and measure that walk. It is never shorter than the perpendicular distance.",
    },
    {
      type: "worked-example",
      id: "tdg5-2-we3",
      title: "Worked example 3: distance parallel to a line",
      problem:
        "Find the distance of the point $(1, -2, 3)$ from the plane $x - y + z = 5$, measured parallel to the line $\\frac x2 = \\frac y3 = \\frac{z}{-6}$.",
      steps: [
        { text: "Walk from $(1, -2, 3)$ in direction $(2, 3, -6)$: the general point is $(1 + 2\\lambda,\\ -2 + 3\\lambda,\\ 3 - 6\\lambda)$." },
        {
          text: "Substitute into the plane:",
          latex: "(1 + 2\\lambda) - (-2 + 3\\lambda) + (3 - 6\\lambda) = 6 - 7\\lambda = 5 \\implies \\lambda = \\frac17",
        },
        { text: "*Why this step:* with direction ratios $(2, 3, -6)$ of length $\\sqrt{4 + 9 + 36} = 7$, a step of $\\lambda$ covers a distance $7\\lvert\\lambda\\rvert$." },
        { text: "So the distance is $7 \\cdot \\frac17 = 1$. (The meeting point is $\\left(\\frac97, -\\frac{11}{7}, \\frac{15}{7}\\right)$, which is 1 unit from $(1, -2, 3)$.)" },
      ],
      answer: "1.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"distance along a line equals the perpendicular distance\"",
      content:
        "In Worked example 3 the perpendicular distance is $\\frac{\\lvert 1 + 2 + 3 - 5\\rvert}{\\sqrt3} = \\frac{1}{\\sqrt3} \\approx 0.58$, but the walk parallel to the line is 1. The two agree only when the given line is along the normal. Also remember that $\\lvert\\lambda\\rvert$ is a distance only when the direction is a unit vector; otherwise multiply by $\\lvert\\vec b\\rvert$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "tdg5-2-q1",
      variant: "practice",
      question:
        "The line $\\frac{x - 1}{2} = \\frac{y - 2}{3} = \\frac{z - 3}{4}$ meets the plane $2x + y - z = 10$ at a point. Find its z-coordinate.",
      answer: 15,
      hint: "Substitute $(1 + 2\\lambda, 2 + 3\\lambda, 3 + 4\\lambda)$ into the plane.",
      solution: "$2(1 + 2\\lambda) + (2 + 3\\lambda) - (3 + 4\\lambda) = 1 + 3\\lambda = 10$, so $\\lambda = 3$ and the point is $(7, 11, 15)$.",
      commonMistakes: [
        { answer: 3, feedback: "3 is the value of $\\lambda$. Put it back into $z = 3 + 4\\lambda$." },
      ],
    },
    {
      type: "quiz",
      id: "tdg5-2-q2",
      variant: "practice",
      question: "Substituting the general point of the line $\\vec r = (\\hat i + \\hat j + \\hat k) + \\lambda(2\\hat i - \\hat j + \\hat k)$ into the plane $x + y - z = 4$ gives",
      options: [
        { text: "$1 = 4$: the line is parallel to the plane and never meets it", correct: true, feedback: "$(1 + 2\\lambda) + (1 - \\lambda) - (1 + \\lambda) = 1$ for every $\\lambda$, and $1 \\ne 4$." },
        { text: "$0 = 0$: the line lies in the plane", feedback: "That would need the constant to be 1, i.e. the plane $x + y - z = 1$." },
        { text: "one value of $\\lambda$, so one meeting point", feedback: "The $\\lambda$ terms cancel: $2 - 1 - 1 = 0$." },
        { text: "a quadratic in $\\lambda$ with two meeting points", feedback: "A line and a plane give a **linear** equation in $\\lambda$." },
      ],
      hint: "Collect the $\\lambda$ terms; their coefficient is $\\vec n \\cdot \\vec b$.",
    },
    {
      type: "numeric",
      id: "tdg5-2-q3",
      variant: "practice",
      question:
        "The plane $2x + y + z = 4$ divides the segment from $A(1, 2, 3)$ to $B(-1, 0, 1)$ in the ratio $k : 1$. Find $k$.",
      answer: 0.6,
      hint: "$k = -\\frac{P(A)}{P(B)}$ with $P = 2x + y + z - 4$.",
      solution: "$P(A) = 2 + 2 + 3 - 4 = 3$, $P(B) = -2 + 0 + 1 - 4 = -5$. So $k = \\frac35 = 0.6$, internal. The point $\\frac{5A + 3B}{8} = \\left(\\frac14, \\frac54, \\frac94\\right)$ satisfies $\\frac12 + \\frac54 + \\frac94 = 4$.",
      commonMistakes: [
        { answer: 1.6667, tolerance: 0.01, feedback: "That is $\\frac{P(B)}{P(A)}$ in size: the ratio $AP : PB$ is $-P(A) : P(B)$, with $A$'s value on top." },
        { answer: -0.6, feedback: "$P(A)$ and $P(B)$ have opposite signs, so $k$ is positive: internal division." },
      ],
    },
    {
      type: "numeric",
      id: "tdg5-2-q4",
      variant: "practice",
      question:
        "JEE Main. Find the distance of the point $(3, 4, 5)$ from the plane $x + y + z = 2$, measured parallel to the line $2x = y = z$.",
      answer: 6,
      hint: "Rewrite $2x = y = z$ as $\\frac{x}{1/2} = \\frac y1 = \\frac z1$, so the direction is $(1, 2, 2)$.",
      solution: "Walk $(3 + \\lambda, 4 + 2\\lambda, 5 + 2\\lambda)$: $12 + 5\\lambda = 2$, $\\lambda = -2$. The step has length $\\lvert\\lambda\\rvert\\cdot\\lvert(1, 2, 2)\\rvert = 2 \\cdot 3 = 6$.",
      commonMistakes: [
        { answer: 5.7735, tolerance: 0.01, feedback: "That is the perpendicular distance $\\frac{10}{\\sqrt3}$. The question measures along the given line." },
        { answer: 6.1237, tolerance: 0.01, feedback: "You took the direction as $(2, 1, 1)$. For $2x = y = z$, divide: $\\frac{x}{1/2} = y = z$, direction $(1, 2, 2)$." },
      ],
    },
    {
      type: "quiz",
      id: "tdg5-2-q5",
      variant: "practice",
      multiple: true,
      question: "Which planes contain the whole line $\\frac{x - 1}{2} = \\frac{y + 1}{-1} = \\frac{z - 2}{1}$? Select all that apply.",
      options: [
        { text: "$x + y - z + 2 = 0$", correct: true, feedback: "$2 - 1 - 1 = 0$ and $1 - 1 - 2 + 2 = 0$." },
        { text: "$x + 2y + 1 = 0$", correct: true, feedback: "$2 - 2 = 0$ and $1 - 2 + 1 = 0$." },
        { text: "$y + z = 1$", correct: true, feedback: "$-1 + 1 = 0$ and $-1 + 2 = 1$." },
        { text: "$x - y - 3z + 5 = 0$", feedback: "Parallel ($2 + 1 - 3 = 0$), but the point $(1, -1, 2)$ gives $1 + 1 - 6 + 5 = 1 \\ne 0$." },
        { text: "$2x - y + z = 5$", feedback: "The point $(1, -1, 2)$ is on it, but the normal is the direction of the line: the line crosses this plane at right angles." },
      ],
      hint: "A plane contains the line when $\\vec n \\cdot \\vec b = 0$ **and** the point $(1, -1, 2)$ satisfies its equation.",
    },
    {
      type: "numeric",
      id: "tdg5-2-q6",
      variant: "practice",
      question: "JEE Main. The line $\\frac{x - 4}{1} = \\frac{y - 2}{1} = \\frac{z - k}{2}$ lies in the plane $2x - 4y + z = 7$. Find $k$.",
      answer: 7,
      hint: "The direction is already perpendicular to the normal; make the point $(4, 2, k)$ satisfy the plane.",
      solution: "$(1, 1, 2) \\cdot (2, -4, 1) = 2 - 4 + 2 = 0$. Then $8 - 8 + k = 7$ gives $k = 7$.",
      commonMistakes: [
        { answer: -7, feedback: "$2(4) - 4(2) + k = k$, so $k = 7$." },
      ],
    },
    {
      type: "numeric",
      id: "tdg5-2-q7",
      variant: "practice",
      question:
        "The line through $P(1, -5, 9)$ parallel to $x = y = z$ meets the plane $x - y + z = 5$ at $Q$. Find $PQ^2$.",
      answer: 300,
      hint: "Walk $(1 + \\lambda, -5 + \\lambda, 9 + \\lambda)$ until it satisfies the plane.",
      solution: "$(1 + \\lambda) - (-5 + \\lambda) + (9 + \\lambda) = 15 + \\lambda = 5$, so $\\lambda = -10$ and $Q = (-9, -15, -1)$. $PQ^2 = 3 \\cdot 100 = 300$, i.e. $PQ = 10\\sqrt3$.",
      commonMistakes: [
        { answer: 100, feedback: "The step $\\lambda = -10$ is along $(1, 1, 1)$, which has length $\\sqrt3$: $PQ^2 = 100 \\cdot 3$." },
        { answer: 33.33, tolerance: 0.01, feedback: "That is the square of the perpendicular distance $\\frac{10}{\\sqrt3}$." },
      ],
    },
    {
      type: "quiz",
      id: "tdg5-2-q8",
      variant: "concept",
      question: "After substituting the general point of a line into a plane equation you get $0\\cdot\\lambda = 5$. What does this mean?",
      options: [
        { text: "The line is parallel to the plane and does not meet it", correct: true, feedback: "$\\vec n \\cdot \\vec b = 0$ and the point of the line is off the plane." },
        { text: "The line meets the plane at $\\lambda = 5$", feedback: "There is no $\\lambda$ with $0 = 5$." },
        { text: "The line lies in the plane", feedback: "That would give $0 = 0$, true for every $\\lambda$." },
        { text: "The line is perpendicular to the plane", feedback: "A perpendicular line always meets the plane: $\\vec n \\cdot \\vec b = \\lvert\\vec n\\rvert\\lvert\\vec b\\rvert \\ne 0$." },
      ],
      hint: "Which row of the table gives a false constant equation?",
    },
    {
      type: "numeric",
      id: "tdg5-2-q9",
      variant: "practice",
      question:
        "JEE Main. The line $\\frac{x - 2}{3} = \\frac{y + 1}{2} = \\frac{z - 1}{-1}$ meets the plane $2x + 3y - z + 13 = 0$ at $P$ and the plane $3x + y + 4z = 16$ at $Q$. Find $PQ$ (to two decimal places).",
      answer: 7.4833,
      tolerance: 0.01,
      hint: "Find $\\lambda$ for each plane separately with the general point $(2 + 3\\lambda, -1 + 2\\lambda, 1 - \\lambda)$.",
      solution: "First plane: $13 + 13\\lambda = 0$, $\\lambda = -1$, $P = (-1, -3, 2)$. Second: $9 + 7\\lambda = 16$, $\\lambda = 1$, $Q = (5, 1, 0)$. $PQ = \\sqrt{36 + 16 + 4} = 2\\sqrt{14} \\approx 7.48$.",
      commonMistakes: [
        { answer: 2, feedback: "2 is the difference of the $\\lambda$ values. Multiply by $\\lvert(3, 2, -1)\\rvert = \\sqrt{14}$." },
      ],
    },
    {
      type: "quiz",
      id: "tdg5-2-q10",
      variant: "practice",
      multiple: true,
      question: "For the line $\\frac x1 = \\frac y2 = \\frac z3$ and the plane $x + y + z = 6$, which statements are true? Select all that apply.",
      options: [
        { text: "They meet at $(1, 2, 3)$", correct: true, feedback: "$6\\lambda = 6$ gives $\\lambda = 1$." },
        { text: "The plane divides the segment from $O$ to $(2, 4, 6)$ in the ratio $1 : 1$", correct: true, feedback: "$P(O) = -6$, $P(2, 4, 6) = 6$, so $k = 1$." },
        { text: "$\\sin\\phi = \\frac{6}{\\sqrt{42}}$, where $\\phi$ is the angle between the line and the plane", correct: true, feedback: "$\\frac{\\lvert 1 + 2 + 3\\rvert}{\\sqrt{14}\\sqrt3}$." },
        { text: "The line is perpendicular to the plane", feedback: "$(1, 2, 3)$ is not a multiple of $(1, 1, 1)$." },
        { text: "$O$ and $(2, 4, 6)$ are on the same side of the plane", feedback: "$P$ is $-6$ at one and $6$ at the other: opposite sides." },
      ],
      hint: "Use the general point $(\\lambda, 2\\lambda, 3\\lambda)$ and the side test.",
    },
    {
      type: "numeric",
      id: "tdg5-2-q11",
      variant: "practice",
      question:
        "The line $\\frac{1 - x}{2} = \\frac{y + 1}{3} = \\frac{z - 2}{-1}$ meets the plane $x + 2y + z = 7$. Find the y-coordinate of the meeting point.",
      answer: 5,
      hint: "$\\frac{1 - x}{2} = \\frac{x - 1}{-2}$, so the direction is $(-2, 3, -1)$.",
      solution: "General point $(1 - 2\\lambda, -1 + 3\\lambda, 2 - \\lambda)$. Substituting: $1 + 3\\lambda = 7$, $\\lambda = 2$, point $(-3, 5, 0)$.",
      commonMistakes: [
        { answer: 1.5714, tolerance: 0.01, feedback: "You used direction $(2, 3, -1)$. The numerator $1 - x$ flips the sign: the direction is $(-2, 3, -1)$." },
      ],
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "foot-and-image-in-a-plane",
  title: "5.3 · Foot of the Perpendicular and Image in a Plane",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "Stand in front of a mirror. The shortest route from your nose to the glass is straight along the normal, and your reflection stands the same distance **behind** the glass on that same normal line. That is the whole lesson: the foot of the perpendicular is where the normal line through $P$ meets the plane, and the image is twice as far along it.",
    },
    { type: "heading", text: "Walk along the normal" },
    {
      type: "text",
      content:
        "Take the plane $ax + by + cz + d = 0$ and the point $P(x_1, y_1, z_1)$. The line through $P$ along the normal is $(x_1 + at,\\ y_1 + bt,\\ z_1 + ct)$. Substitute it into the plane (Lesson 5.2):",
    },
    {
      type: "math",
      latex: "(ax_1 + by_1 + cz_1 + d) + (a^2 + b^2 + c^2)t = 0 \\implies t_{\\text{foot}} = -\\frac{ax_1 + by_1 + cz_1 + d}{a^2 + b^2 + c^2}",
    },
    {
      type: "text",
      content:
        "The foot $F$ is the midpoint of $P$ and its image $P'$, so the image is at twice the parameter: $t_{\\text{image}} = 2t_{\\text{foot}}$. Written symmetrically, with $P(x_1, y_1, z_1)$ standing for the value $ax_1 + by_1 + cz_1 + d$:",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Foot and image in a plane",
      content:
        "For the point $(x_1, y_1, z_1)$ and the plane $ax + by + cz + d = 0$:\n\n- **Foot** $(x, y, z)$: $\\frac{x - x_1}{a} = \\frac{y - y_1}{b} = \\frac{z - z_1}{c} = -\\frac{ax_1 + by_1 + cz_1 + d}{a^2 + b^2 + c^2}$\n- **Image** $(x, y, z)$: $\\frac{x - x_1}{a} = \\frac{y - y_1}{b} = \\frac{z - z_1}{c} = -\\frac{2(ax_1 + by_1 + cz_1 + d)}{a^2 + b^2 + c^2}$\n\nThe distance from $P$ to the plane is $\\lvert t_{\\text{foot}}\\rvert\\sqrt{a^2 + b^2 + c^2} = \\frac{\\lvert ax_1 + by_1 + cz_1 + d\\rvert}{\\sqrt{a^2 + b^2 + c^2}}$, the formula of Lesson 4.7.",
    },
    {
      type: "interactive",
      config: {
        component: "tdg-space-viewer",
        mode: "plane",
        plane: [2, -1, 1, 3],
        p: [1, 3, 4],
        show: ["normal", "foot", "image"],
        sliders: [
          { name: "px", min: -4, max: 4, step: 1, initial: 1 },
          { name: "py", min: -4, max: 5, step: 1, initial: 3 },
          { name: "pz", min: -4, max: 5, step: 1, initial: 4 },
        ],
        caption:
          "The plane $2x - y + z + 3 = 0$, the point $P$, its foot and its image. Move $P$ with the sliders: the segment from $P$ to its image always runs along the normal, and the foot always sits at its midpoint. Move $P$ onto the plane and all three points merge.",
      },
    },
    {
      type: "worked-example",
      id: "tdg5-3-we1",
      title: "Worked example 1: foot and image",
      problem: "Find the foot of the perpendicular and the image of $P(1, 3, 4)$ in the plane $2x - y + z + 3 = 0$.",
      steps: [
        { text: "Evaluate the plane at $P$: $2 - 3 + 4 + 3 = 6$, and $a^2 + b^2 + c^2 = 4 + 1 + 1 = 6$." },
        {
          text: "Foot: $t = -\\frac66 = -1$. *Why this step:* the sign of $t$ sends us from $P$ toward the plane, against the normal because $P$ is on the positive side.",
          latex: "F = (1 - 2,\\ 3 + 1,\\ 4 - 1) = (-1, 4, 3)",
        },
        { text: "Image: $t = -2$.", latex: "P' = (1 - 4,\\ 3 + 2,\\ 4 - 2) = (-3, 5, 2)" },
        { text: "Check: the midpoint of $P$ and $P'$ is $(-1, 4, 3) = F$, and $F$ is on the plane: $-2 - 4 + 3 + 3 = 0$." },
      ],
      answer: "Foot $(-1, 4, 3)$, image $(-3, 5, 2)$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the image is the foot plus P\"",
      content:
        "The foot is the **midpoint**: $F = \\frac{P + P'}{2}$, so $P' = 2F - P$, not $F + P$. A quick check catches it: the image must be as far from the plane as $P$, on the other side, so $P(P') = -P(P)$. For Worked example 1, $P(P) = 6$ and $P(-3, 5, 2) = -6 - 5 + 2 + 3 = -6$.",
    },
    { type: "heading", text: "The image of a line" },
    {
      type: "text",
      content:
        "A line is fixed by two of its points, so its image is the line through the images of two points. Two shortcuts save work:",
    },
    {
      type: "text",
      content:
        "- If the line **meets** the plane at $M$, then $M$ is its own image, so the image line passes through $M$ and the image of any one other point.\n- If the line is **parallel** to the plane, its image is parallel to it too (same direction ratios), through the image of any one point.",
    },
    {
      type: "worked-example",
      id: "tdg5-3-we2",
      title: "Worked example 2: image of a parallel line",
      problem:
        "JEE Main. Find the image of the line $\\frac{x - 1}{3} = \\frac{y - 3}{1} = \\frac{z - 4}{-5}$ in the plane $2x - y + z + 3 = 0$.",
      steps: [
        { text: "Test the direction against the normal: $(3, 1, -5) \\cdot (2, -1, 1) = 6 - 1 - 5 = 0$. The line is parallel to the plane." },
        { text: "*Why this step:* a parallel line has a parallel image, so we only need the image of one point. The line passes through $(1, 3, 4)$, whose image is $(-3, 5, 2)$ by Worked example 1." },
        { latex: "\\frac{x + 3}{3} = \\frac{y - 5}{1} = \\frac{z - 2}{-5}" },
      ],
      answer: "$\\frac{x + 3}{3} = \\frac{y - 5}{1} = \\frac{z - 2}{-5}$.",
    },
    {
      type: "worked-example",
      id: "tdg5-3-we3",
      title: "Worked example 3: image of a line that meets the plane",
      problem: "Find the image of the line through $A(1, 2, 3)$ with direction $(2, 1, 0)$ in the plane $x + y + z = 3$.",
      steps: [
        { text: "Meeting point: $(1 + 2\\lambda) + (2 + \\lambda) + 3 = 6 + 3\\lambda = 3$, so $\\lambda = -1$ and $M = (-1, 1, 3)$." },
        { text: "Image of $A$: $P(A) = 1 + 2 + 3 - 3 = 3$, $a^2 + b^2 + c^2 = 3$, so $t = -2$ and $A' = (-1, 0, 1)$." },
        {
          text: "The image line joins $M$ and $A'$. *Why this step:* $M$ is on the mirror, so it is its own image.",
          latex: "\\overrightarrow{MA'} = (0, -1, -2) \\parallel (0, 1, 2), \\qquad \\frac{x + 1}{0} = \\frac{y - 1}{1} = \\frac{z - 3}{2}",
        },
        { text: "Check by reflecting the direction itself: $\\vec b - \\frac{2(\\vec b\\cdot\\vec n)}{\\lvert\\vec n\\rvert^2}\\vec n = (2, 1, 0) - 2(1, 1, 1) = (0, -1, -2)$." },
      ],
      answer: "$\\frac{x + 1}{0} = \\frac{y - 1}{1} = \\frac{z - 3}{2}$ (that is, $x = -1$ and $\\frac{y - 1}{1} = \\frac{z - 3}{2}$).",
    },
    {
      type: "interactive",
      config: {
        component: "tdg-distance-lab",
        mode: "point-plane",
        p1: [1, 3, 4],
        plane1: [2, -1, 1, 3],
        caption:
          "Worked example 1 as a calculation: the value $P(x_1, y_1, z_1)$, the parameter $t$, the foot and the image. Step $P$ across the plane and watch $P(x_1, y_1, z_1)$ change sign while the foot stays the midpoint.",
      },
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "tdg5-3-q1",
      variant: "practice",
      question:
        "The foot of the perpendicular from the origin to the plane $2x - 3y + 6z + 14 = 0$ is $(\\alpha, \\beta, \\gamma)$. Find $\\alpha + \\beta + \\gamma$. (A fraction such as 3/7 is fine.)",
      answer: -1.4285714,
      tolerance: 0.001,
      hint: "$t = -\\frac{14}{49}$; the foot is $t(2, -3, 6)$.",
      solution: "$t = -\\frac{2}{7}$, so the foot is $\\left(-\\frac47, \\frac67, -\\frac{12}{7}\\right)$ and the sum is $-\\frac{10}{7}$.",
      commonMistakes: [
        { answer: 1.4285714, tolerance: 0.001, feedback: "Sign of $t$: $t = -\\frac{P(O)}{a^2 + b^2 + c^2}$ and $P(O) = +14$." },
      ],
    },
    {
      type: "numeric",
      id: "tdg5-3-q2",
      variant: "practice",
      question: "The image of $(1, 2, 3)$ in the plane $x + 2y + 4z = 38$ is $(\\alpha, \\beta, \\gamma)$. Find $\\alpha + \\beta + \\gamma$.",
      answer: 20,
      hint: "$P(1, 2, 3) = 1 + 4 + 12 - 38 = -21$ and $a^2 + b^2 + c^2 = 21$.",
      solution: "$t = -\\frac{2(-21)}{21} = 2$, so the image is $(1 + 2, 2 + 4, 3 + 8) = (3, 6, 11)$, with sum 20.",
      commonMistakes: [
        { answer: 13, feedback: "That is the foot $(2, 4, 7)$. The image is twice as far: $t = 2$, not 1." },
        { answer: -8, feedback: "Moving with $t = -2$ goes away from the plane. $P(1, 2, 3) < 0$, so $t$ is positive." },
      ],
    },
    {
      type: "quiz",
      id: "tdg5-3-q3",
      variant: "practice",
      question: "The image of $P(3, -2, 1)$ in the plane $x - 2y + 2z = 3$ is",
      options: [
        { text: "$\\left(\\frac53, \\frac23, -\\frac53\\right)$", correct: true, feedback: "$P(P) = 3 + 4 + 2 - 3 = 6$, $t = -\\frac{12}{9} = -\\frac43$: $\\left(3 - \\frac43,\\ -2 + \\frac83,\\ 1 - \\frac83\\right)$." },
        { text: "$\\left(\\frac73, -\\frac23, -\\frac13\\right)$", feedback: "That is the foot ($t = -\\frac23$). The image needs twice the parameter." },
        { text: "$\\left(\\frac{13}{3}, -\\frac{14}{3}, \\frac{11}{3}\\right)$", feedback: "That uses $t = +\\frac43$, walking away from the plane." },
        { text: "$(-3, 2, -1)$", feedback: "That is the reflection in the origin, not in the plane." },
      ],
      hint: "$t = -\\frac{2P(P)}{a^2 + b^2 + c^2}$, then move from $P$ by $t(1, -2, 2)$.",
    },
    {
      type: "numeric",
      id: "tdg5-3-q4",
      variant: "practice",
      question: "Find the distance between the point $(2, 1, -1)$ and its image in the plane $x + 2y + 2z = 10$. (A fraction such as 5/3 is fine.)",
      answer: 5.3333333,
      tolerance: 0.001,
      hint: "The point and its image are both at the perpendicular distance from the plane, on opposite sides.",
      solution: "Distance to the plane: $\\frac{\\lvert 2 + 2 - 2 - 10\\rvert}{3} = \\frac83$. The image is as far on the other side, so the gap is $\\frac{16}{3}$.",
      commonMistakes: [
        { answer: 2.6666667, tolerance: 0.001, feedback: "That is the distance to the plane, i.e. to the foot. The image is twice as far." },
      ],
    },
    {
      type: "quiz",
      id: "tdg5-3-q5",
      variant: "concept",
      multiple: true,
      question: "$P'$ is the image of $P$ in a plane $\\pi$ with normal $\\vec n$, and $F$ is the foot of the perpendicular from $P$. Which statements are true? Select all that apply.",
      options: [
        { text: "$F$ is the midpoint of $PP'$", correct: true, feedback: "The mirror is halfway between object and image." },
        { text: "$\\overrightarrow{PP'}$ is parallel to $\\vec n$", correct: true, feedback: "Both $F$ and $P'$ are reached by walking along the normal." },
        { text: "If $P$ lies on $\\pi$, then $P' = P$", correct: true, feedback: "$P(P) = 0$ gives $t = 0$." },
        { text: "The image of the origin in $ax + by + cz + d = 0$ is $-\\frac{2d}{a^2 + b^2 + c^2}(a, b, c)$", correct: true, feedback: "At the origin $P(O) = d$, so $t = -\\frac{2d}{a^2 + b^2 + c^2}$." },
        { text: "$P' = P - 2F$", feedback: "From $F = \\frac{P + P'}{2}$: $P' = 2F - P$." },
      ],
      hint: "Start from the picture: walk from $P$ along the normal to $F$, then the same distance again.",
    },
    {
      type: "quiz",
      id: "tdg5-3-q6",
      variant: "practice",
      question: "The image of the line $\\frac{x - 1}{1} = \\frac{y - 2}{-2} = \\frac{z - 3}{1}$ in the plane $x + y + z = 3$ is",
      options: [
        { text: "$\\frac{x + 1}{1} = \\frac{y}{-2} = \\frac{z - 1}{1}$", correct: true, feedback: "The line is parallel to the plane ($1 - 2 + 1 = 0$), so the image keeps the direction and passes through the image $(-1, 0, 1)$ of $(1, 2, 3)$." },
        { text: "$\\frac{x}{1} = \\frac{y - 1}{-2} = \\frac{z - 2}{1}$", feedback: "That passes through the foot $(0, 1, 2)$: it is the **projection** of the line, not its image." },
        { text: "$\\frac{x + 1}{1} = \\frac{y}{1} = \\frac{z - 1}{1}$", feedback: "The image of a parallel line keeps the direction $(1, -2, 1)$; $(1, 1, 1)$ is the normal." },
        { text: "$\\frac{x - 1}{1} = \\frac{y - 2}{-2} = \\frac{z - 3}{1}$", feedback: "That is the line itself. It does not lie in the plane: $(1, 2, 3)$ gives $6 \\ne 3$." },
      ],
      hint: "Check $\\vec b \\cdot \\vec n$ first. Then reflect the point $(1, 2, 3)$.",
    },
    {
      type: "numeric",
      id: "tdg5-3-q7",
      variant: "practice",
      question: "The image of $A(1, 2, 3)$ in a plane $\\pi$ is $B(7, 6, 9)$. If $\\pi$ is $3x + 2y + 3z = d$, find $d$.",
      answer: 38,
      hint: "The plane is the perpendicular bisector plane of $AB$: normal along $\\overrightarrow{AB}$, through the midpoint.",
      solution: "$\\overrightarrow{AB} = (6, 4, 6) \\parallel (3, 2, 3)$, and the midpoint is $(4, 4, 6)$. So $d = 12 + 8 + 18 = 38$.",
      commonMistakes: [
        { answer: 16, feedback: "That puts the plane through $A$. The mirror passes through the **midpoint** of $A$ and $B$." },
        { answer: 60, feedback: "That puts the plane through $B$. Use the midpoint $(4, 4, 6)$." },
      ],
    },
    {
      type: "numeric",
      id: "tdg5-3-q8",
      variant: "practice",
      question:
        "The foot of the perpendicular from $P(1, -2, 3)$ to a plane is $F(2, -1, 5)$. Find the distance of the origin from that plane (to two decimal places).",
      answer: 4.4907,
      tolerance: 0.01,
      hint: "The normal is $\\overrightarrow{PF}$, and the plane passes through $F$.",
      solution: "$\\overrightarrow{PF} = (1, 1, 2)$, so the plane is $x + y + 2z = 2 - 1 + 10 = 11$. Its distance from $O$ is $\\frac{11}{\\sqrt6} \\approx 4.49$.",
      commonMistakes: [
        { answer: 5.4772, tolerance: 0.01, feedback: "That is $\\lvert OF\\rvert = \\sqrt{30}$. $F$ is the foot from $P$, not from the origin." },
        { answer: 2.4495, tolerance: 0.01, feedback: "That is $PF = \\sqrt6$, the distance of $P$ from the plane." },
      ],
    },
    {
      type: "numeric",
      id: "tdg5-3-q9",
      variant: "practice",
      question:
        "JEE Advanced. A ray of light from $A(2, 2, 2)$ reflects off the plane mirror $x + y + z = 3$ and then passes through $B(4, 1, 0)$. The point of incidence is $(\\alpha, \\beta, \\gamma)$. Find $\\alpha$.",
      answer: 2.4,
      hint: "The reflected ray looks as if it came from the image $A'$ of $A$. Join $A'$ to $B$ and meet the mirror.",
      solution: "$P(A) = 3$, so $t = -2$ and $A' = (0, 0, 0)$. ($P(B) = 2$ has the same sign as $P(A)$, so $A$ and $B$ are on the same side, as they must be.) Line $A'B$: $(4s, s, 0)$; on the mirror $5s = 3$, $s = \\frac35$, giving $\\left(\\frac{12}{5}, \\frac35, 0\\right)$.",
      commonMistakes: [
        { answer: 1, feedback: "$(1, 1, 1)$ is the foot of the perpendicular from $A$, not the point of incidence." },
      ],
    },
    {
      type: "quiz",
      id: "tdg5-3-q10",
      variant: "concept",
      question:
        "A student finds the foot $F(2, 0, 1)$ of the perpendicular from $P(4, 2, 3)$ to a plane and writes the image as $F + P = (6, 2, 4)$. What is the image?",
      options: [
        { text: "$(0, -2, -1)$", correct: true, feedback: "$P' = 2F - P = (4 - 4, 0 - 2, 2 - 3)$." },
        { text: "$(6, 2, 4)$", feedback: "Adding position vectors has no geometric meaning here. The foot is the midpoint, so $P' = 2F - P$." },
        { text: "$(3, 1, 2)$", feedback: "That is the midpoint of $P$ and $F$, a point between $P$ and the plane." },
        { text: "$(-2, -2, -2)$", feedback: "That is $F - P$, the step from $P$ to the plane. Take that step once more from $F$." },
      ],
      hint: "The foot is the midpoint of $P$ and its image.",
    },
    {
      type: "numeric",
      id: "tdg5-3-q11",
      variant: "practice",
      question: "Find the distance between the origin and its image in the plane $2x + 3y + 6z = 14$.",
      answer: 4,
      hint: "The image of $O$ is twice as far from $O$ as the plane is.",
      solution: "The distance from $O$ to the plane is $\\frac{14}{7} = 2$, so $OO' = 4$. (The image is $\\frac{4}{7}(2, 3, 6)$.)",
      commonMistakes: [
        { answer: 2, feedback: "2 is the distance to the plane. The image is on the far side, at twice that." },
      ],
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "coplanar-lines-and-their-plane",
  title: "5.4 · Coplanar Lines and the Plane Containing Them",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "Chapter 3 sorted pairs of lines into parallel, intersecting and skew, and measured the gap between skew lines by projecting the join $\\vec a_2 - \\vec a_1$ on the common normal $\\vec b_1 \\times \\vec b_2$. Now turn that around. When the gap is zero the lines lie in one plane, and $\\vec b_1 \\times \\vec b_2$ is not just the common normal of the lines: it is the **normal of that plane**.",
    },
    { type: "heading", text: "The coplanarity condition" },
    {
      type: "text",
      content:
        "Two lines $\\vec r = \\vec a_1 + \\lambda\\vec b_1$ and $\\vec r = \\vec a_2 + \\mu\\vec b_2$ lie in one plane exactly when the three vectors $\\vec a_2 - \\vec a_1$, $\\vec b_1$, $\\vec b_2$ are coplanar: the box they span is flat. That is a zero scalar triple product (vector algebra 5.3):",
    },
    {
      type: "math",
      latex: "(\\vec a_2 - \\vec a_1) \\cdot (\\vec b_1 \\times \\vec b_2) = 0 \\iff \\begin{vmatrix} x_2 - x_1 & y_2 - y_1 & z_2 - z_1 \\\\ a_1 & b_1 & c_1 \\\\ a_2 & b_2 & c_2 \\end{vmatrix} = 0",
    },
    {
      type: "text",
      content:
        "This is the numerator of the shortest-distance formula of Lesson 3.3. Zero means the lines are coplanar: they intersect if $\\vec b_1 \\times \\vec b_2 \\ne \\vec 0$, and are parallel otherwise.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The plane containing two lines",
      content:
        "- **Two intersecting lines:** normal $\\vec n = \\vec b_1 \\times \\vec b_2$, through $\\vec a_1$: $(\\vec r - \\vec a_1) \\cdot (\\vec b_1 \\times \\vec b_2) = 0$.\n- **Two parallel lines** (direction $\\vec b$): normal $\\vec n = \\vec b \\times (\\vec a_2 - \\vec a_1)$, because the join $\\vec a_2 - \\vec a_1$ also lies in the plane.\n- **A line and a point $P$ off it:** normal $\\vec n = \\vec b \\times (\\vec p - \\vec a)$.\n- **A line $L_1$, parallel to another line $L_2$:** normal $\\vec n = \\vec b_1 \\times \\vec b_2$, through $\\vec a_1$.\n\nIn every case: find two directions lying in the plane, cross them for the normal, and use one known point.",
    },
    {
      type: "interactive",
      config: {
        component: "tdg-space-viewer",
        mode: "two-lines",
        a: [-3, 1, 5],
        b: [-3, 1, 5],
        c: [-1, 2, 5],
        d: [-1, 2, 5],
        show: ["shortest-distance"],
        caption:
          "The two lines of Worked example 1. The readout says **intersecting**: the shortest distance is 0, so they are coplanar. Rotate until both lines collapse onto one straight edge: you are then looking along their common plane $x - 2y + z = 0$.",
      },
    },
    {
      type: "worked-example",
      id: "tdg5-4-we1",
      title: "Worked example 1: show coplanar, find the plane",
      problem:
        "Show that the lines $\\frac{x + 3}{-3} = \\frac{y - 1}{1} = \\frac{z - 5}{5}$ and $\\frac{x + 1}{-1} = \\frac{y - 2}{2} = \\frac{z - 5}{5}$ are coplanar, and find the plane containing them.",
      steps: [
        { text: "Read $\\vec a_1 = (-3, 1, 5)$, $\\vec b_1 = (-3, 1, 5)$, $\\vec a_2 = (-1, 2, 5)$, $\\vec b_2 = (-1, 2, 5)$, so $\\vec a_2 - \\vec a_1 = (2, 1, 0)$." },
        {
          text: "Cross the directions. *Why this step:* this vector is perpendicular to both lines, so it is the normal of any plane containing both.",
          latex: "\\vec b_1 \\times \\vec b_2 = (1 \\cdot 5 - 5 \\cdot 2,\\ 5 \\cdot (-1) - (-3) \\cdot 5,\\ (-3) \\cdot 2 - 1 \\cdot (-1)) = (-5, 10, -5)",
        },
        { text: "Coplanarity test: $(2, 1, 0) \\cdot (-5, 10, -5) = -10 + 10 + 0 = 0$. The lines are coplanar (and they intersect, since the cross product is not zero)." },
        { text: "Plane with normal $(1, -2, 1)$ through $(-3, 1, 5)$: $(x + 3) - 2(y - 1) + (z - 5) = 0$, i.e. $x - 2y + z = 0$. Check $(-1, 2, 5)$: $-1 - 4 + 5 = 0$." },
      ],
      answer: "Coplanar; the plane is $x - 2y + z = 0$.",
    },
    {
      type: "worked-example",
      id: "tdg5-4-we2",
      title: "Worked example 2: the value that makes lines meet",
      problem:
        "JEE Main. The lines $\\frac{x - 1}{2} = \\frac{y + 1}{3} = \\frac{z - 1}{4}$ and $\\frac{x - 3}{1} = \\frac{y - k}{2} = \\frac{z}{1}$ intersect. Find $k$.",
      steps: [
        { text: "The directions $(2, 3, 4)$ and $(1, 2, 1)$ are not parallel, so the lines intersect exactly when they are coplanar." },
        { latex: "\\vec b_1 \\times \\vec b_2 = (3 - 8,\\ 4 - 2,\\ 4 - 3) = (-5, 2, 1), \\qquad \\vec a_2 - \\vec a_1 = (2,\\ k + 1,\\ -1)" },
        {
          text: "Set the triple product to zero. *Why this step:* it is the Cartesian determinant expanded along its first row.",
          latex: "-10 + 2(k + 1) - 1 = 2k - 9 = 0 \\implies k = \\frac92",
        },
      ],
      answer: "$k = \\frac92$.",
    },
    {
      type: "worked-example",
      id: "tdg5-4-we3",
      title: "Worked example 3: the plane through a line and a point",
      problem: "Find the plane containing the line $\\frac{x + 1}{-3} = \\frac{y - 3}{2} = \\frac{z + 2}{1}$ and the point $(0, 7, -7)$.",
      steps: [
        { text: "Two directions in the plane: the line's $\\vec b = (-3, 2, 1)$ and the join from $A(-1, 3, -2)$ to $P(0, 7, -7)$, namely $(1, 4, -5)$." },
        { latex: "\\vec b \\times \\overrightarrow{AP} = (2(-5) - 1 \\cdot 4,\\ 1 \\cdot 1 - (-3)(-5),\\ (-3) \\cdot 4 - 2 \\cdot 1) = (-14, -14, -14)" },
        { text: "Normal $(1, 1, 1)$ through $(0, 7, -7)$: $x + y + z = 0$. *Why this step:* any point of the plane fixes the constant; $A$ gives $-1 + 3 - 2 = 0$ too." },
      ],
      answer: "$x + y + z = 0$.",
    },
    {
      type: "worked-example",
      id: "tdg5-4-we4",
      title: "Worked example 4: a plane through one line parallel to another",
      problem:
        "Find the plane containing the line through $(1, 2, 3)$ with direction $(1, 0, 1)$ and parallel to the line through $(2, 0, 0)$ with direction $(0, 1, 1)$. Then find the distance of the second line from it.",
      steps: [
        { text: "The plane contains direction $(1, 0, 1)$ and is parallel to $(0, 1, 1)$, so its normal is $(1, 0, 1) \\times (0, 1, 1) = (-1, -1, 1)$." },
        { text: "Through $(1, 2, 3)$: $-(x - 1) - (y - 2) + (z - 3) = 0$, i.e. $x + y - z = 0$." },
        {
          text: "The second line is parallel to this plane, so every point of it is at the same distance. *Why this step:* this distance is exactly the shortest distance between the two lines (Lesson 3.2).",
          latex: "\\frac{\\lvert 2 + 0 - 0\\rvert}{\\sqrt3} = \\frac{2}{\\sqrt3}",
        },
      ],
      answer: "$x + y - z = 0$; the distance is $\\frac{2}{\\sqrt3}$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the normal of the plane is $\\vec b_1 + \\vec b_2$\"",
      content:
        "$\\vec b_1 + \\vec b_2$ lies **in** the plane (it is a combination of two directions in it), so it can never be the normal. The normal must be perpendicular to both lines: $\\vec b_1 \\times \\vec b_2$. And for parallel lines $\\vec b_1 \\times \\vec b_2 = \\vec 0$ gives no normal at all; use the join $\\vec a_2 - \\vec a_1$ as the second direction.",
    },
    {
      type: "interactive",
      config: {
        component: "tdg-distance-lab",
        mode: "skew-lines",
        p1: [1, 2, 3],
        d1: [2, 3, 4],
        p2: [4, 1, 0],
        d2: [5, 2, 1],
        caption:
          "These two lines meet at $(-1, -1, -1)$: the triple product, and so the shortest distance, is 0. Step any coordinate of the second point by one and watch the lines become skew; step it back and they are coplanar again.",
      },
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "tdg5-4-q1",
      variant: "practice",
      multiple: true,
      question: "Which pairs of lines are coplanar? Select all that apply.",
      options: [
        { text: "$\\frac x1 = \\frac y1 = \\frac z1$ and $\\frac x1 = \\frac y2 = \\frac z3$", correct: true, feedback: "Both pass through the origin: intersecting lines are coplanar." },
        { text: "$\\frac{x - 1}{1} = \\frac y1 = \\frac z1$ and $\\frac x1 = \\frac{y - 1}{1} = \\frac z1$", correct: true, feedback: "Parallel lines always lie in one plane." },
        { text: "$\\frac{x - 1}{2} = \\frac{y - 2}{3} = \\frac{z - 3}{4}$ and $\\frac{x - 2}{3} = \\frac{y - 3}{4} = \\frac{z - 4}{5}$", correct: true, feedback: "$(1, 1, 1) \\cdot (-1, 2, -1) = 0$." },
        { text: "the x-axis and the line through $(0, 1, 0)$ parallel to the z-axis", feedback: "$(0, 1, 0) \\cdot \\left((1, 0, 0) \\times (0, 0, 1)\\right) = (0, 1, 0) \\cdot (0, -1, 0) = -1 \\ne 0$: skew." },
        { text: "$\\frac{x - 1}{2} = \\frac{y + 1}{3} = \\frac{z - 1}{4}$ and $\\frac{x - 3}{1} = \\frac{y - 2}{2} = \\frac z1$", feedback: "This is Worked example 2 with $k = 2$: $2k - 9 = -5 \\ne 0$, skew." },
      ],
      hint: "Compute $(\\vec a_2 - \\vec a_1) \\cdot (\\vec b_1 \\times \\vec b_2)$, and remember that parallel lines are coplanar.",
    },
    {
      type: "numeric",
      id: "tdg5-4-q2",
      variant: "practice",
      question:
        "JEE Main. The lines $\\frac{x - 2}{1} = \\frac{y - 3}{1} = \\frac{z - 4}{-k}$ and $\\frac{x - 1}{k} = \\frac{y - 4}{2} = \\frac{z - 5}{1}$ are coplanar. Find the negative value of $k$.",
      answer: -3,
      hint: "Set the determinant with rows $(-1, 1, 1)$, $(1, 1, -k)$, $(k, 2, 1)$ to zero.",
      solution: "$-1(1 + 2k) - 1(1 + k^2) + 1(2 - k) = -k^2 - 3k = -k(k + 3)$. So $k = 0$ or $k = -3$; the negative value is $-3$.",
      commonMistakes: [
        { answer: 3, feedback: "The roots of $k^2 + 3k = 0$ are $0$ and $-3$." },
        { answer: 0, feedback: "$k = 0$ also works, but it is not negative." },
      ],
    },
    {
      type: "numeric",
      id: "tdg5-4-q3",
      variant: "practice",
      question:
        "The lines $\\vec r = (\\hat i + \\hat j) + \\lambda(\\hat i + 2\\hat j - \\hat k)$ and $\\vec r = (\\hat i + \\hat j) + \\mu(-\\hat i + \\hat j - 2\\hat k)$ meet at $(1, 1, 0)$. Find the distance of $(1, 2, 3)$ from the plane containing them (to two decimal places).",
      answer: 2.3094,
      tolerance: 0.01,
      hint: "Normal $= (1, 2, -1) \\times (-1, 1, -2)$, through $(1, 1, 0)$.",
      solution: "$\\vec n = (-3, 3, 3) \\parallel (1, -1, -1)$, so the plane is $x - y - z = 0$. The distance is $\\frac{\\lvert 1 - 2 - 3\\rvert}{\\sqrt3} = \\frac{4}{\\sqrt3} \\approx 2.31$.",
      commonMistakes: [
        { answer: 4, feedback: "Divide by $\\lvert\\vec n\\rvert = \\sqrt3$." },
      ],
    },
    {
      type: "quiz",
      id: "tdg5-4-q4",
      variant: "practice",
      question: "The plane containing the lines $\\frac{x - 1}{1} = \\frac{y - 2}{2} = \\frac{z - 3}{3}$ and $\\frac{x - 1}{2} = \\frac{y - 2}{1} = \\frac{z - 3}{1}$ is",
      options: [
        { text: "$x - 5y + 3z = 0$", correct: true, feedback: "$(1, 2, 3) \\times (2, 1, 1) = (-1, 5, -3)$, and the plane passes through $(1, 2, 3)$: $1 - 10 + 9 = 0$." },
        { text: "$x + 5y + 3z = 20$", feedback: "The middle cofactor sign slipped: the $\\hat j$ component is $3 \\cdot 2 - 1 \\cdot 1 = 5$, giving $(-1, 5, -3)$, not $(-1, -5, -3)$." },
        { text: "$3x + 3y + 4z = 21$", feedback: "$(3, 3, 4) = \\vec b_1 + \\vec b_2$ lies in the plane; it cannot be the normal." },
        { text: "$x - 5y + 3z = 1$", feedback: "Right normal, but $(1, 2, 3)$ gives 0, not 1." },
      ],
      hint: "Both lines pass through $(1, 2, 3)$. Cross the directions.",
    },
    {
      type: "numeric",
      id: "tdg5-4-q5",
      variant: "practice",
      question:
        "Find the x-intercept of the plane containing the line $\\frac{x - 1}{1} = \\frac y2 = \\frac{z + 1}{-1}$ and the point $(2, 1, 3)$. (A fraction such as 7/9 is fine.)",
      answer: 1.1111111,
      tolerance: 0.001,
      hint: "Normal $= (1, 2, -1) \\times \\overrightarrow{AP}$ with $A(1, 0, -1)$, $P(2, 1, 3)$.",
      solution: "$\\overrightarrow{AP} = (1, 1, 4)$, and $(1, 2, -1) \\times (1, 1, 4) = (9, -5, -1)$. Through $A$: $9x - 5y - z = 10$. On the x-axis $9x = 10$, so the intercept is $\\frac{10}{9}$.",
      commonMistakes: [
        { answer: -1.1111111, tolerance: 0.001, feedback: "Check the constant: $9(1) - 5(0) - (-1) = 10$, so $9x = +10$." },
      ],
    },
    {
      type: "numeric",
      id: "tdg5-4-q6",
      variant: "practice",
      question:
        "Find the shortest distance between $\\frac{x - 1}{2} = \\frac{y - 2}{3} = \\frac{z - 3}{4}$ and $\\frac{x - 2}{3} = \\frac{y - 4}{4} = \\frac{z - 5}{5}$ by first finding the plane through the first line parallel to the second (to two decimal places).",
      answer: 0.4082,
      tolerance: 0.005,
      hint: "Normal $(2, 3, 4) \\times (3, 4, 5)$; then the distance of $(2, 4, 5)$ from the plane.",
      solution: "$\\vec n = (-1, 2, -1)$, and the plane through $(1, 2, 3)$ is $x - 2y + z = 0$. The point $(2, 4, 5)$ is at $\\frac{\\lvert 2 - 8 + 5\\rvert}{\\sqrt6} = \\frac{1}{\\sqrt6} \\approx 0.41$.",
      commonMistakes: [
        { answer: 1, feedback: "Divide $\\lvert P(2, 4, 5)\\rvert = 1$ by $\\lvert\\vec n\\rvert = \\sqrt6$." },
      ],
    },
    {
      type: "quiz",
      id: "tdg5-4-q7",
      variant: "practice",
      multiple: true,
      question:
        "$L_1$ passes through $A(1, 0, 0)$ and $L_2$ through $B(0, 1, 0)$, with directions $(1, 1, 1)$ and $(2, 2, 2)$. Which statements are true? Select all that apply.",
      options: [
        { text: "$L_1$ and $L_2$ are coplanar", correct: true, feedback: "They are parallel, and parallel lines always share a plane." },
        { text: "The plane containing them is $x + y - 2z = 1$", correct: true, feedback: "Normal $(1, 1, 1) \\times (-1, 1, 0) = (-1, -1, 2)$; through $A$: $x + y - 2z = 1$, and $B$ fits too." },
        { text: "The shortest-distance formula with $\\vec b_1 \\times \\vec b_2$ gives $\\frac00$ here", correct: true, feedback: "$\\vec b_1 \\times \\vec b_2 = \\vec 0$ for parallel lines: use Lesson 3.4 instead." },
        { text: "$\\vec b_1 \\times \\vec b_2$ is the normal of the plane containing them", feedback: "It is the zero vector. Cross $\\vec b$ with the join $\\overrightarrow{AB}$ instead." },
        { text: "The plane $x + y + z = 1$ contains both lines", feedback: "It contains $A$ and $B$, but $(1, 1, 1) \\cdot (1, 1, 1) = 3 \\ne 0$: the lines cross it instead of lying in it." },
      ],
      hint: "For parallel lines the second direction in the plane is the join $\\overrightarrow{AB}$.",
    },
    {
      type: "numeric",
      id: "tdg5-4-q8",
      variant: "practice",
      question:
        "The lines in Worked example 2 (with $k = \\frac92$) meet at a point $(\\alpha, \\beta, \\gamma)$. Find $\\alpha + \\beta + \\gamma$.",
      answer: -12.5,
      hint: "Equate $(1 + 2s, -1 + 3s, 1 + 4s)$ and $(3 + t, \\frac92 + 2t, t)$; use the x- and z-equations first.",
      solution: "From $z$: $t = 1 + 4s$. From $x$: $1 + 2s = 4 + 4s$, so $s = -\\frac32$ and $t = -5$. The point is $\\left(-2, -\\frac{11}{2}, -5\\right)$; the y-equation agrees: $-1 - \\frac92 = \\frac92 - 10$. Sum: $-12.5$.",
      commonMistakes: [
        { answer: -1.5, feedback: "That is the parameter $s$. Substitute it back into the general point." },
      ],
    },
    {
      type: "numeric",
      id: "tdg5-4-q9",
      variant: "practice",
      question:
        "Find the distance of the origin from the plane containing the two lines of Worked example 2 (with $k = \\frac92$), to two decimal places.",
      answer: 1.0954,
      tolerance: 0.01,
      hint: "The normal is $\\vec b_1 \\times \\vec b_2 = (-5, 2, 1)$; the plane passes through $(1, -1, 1)$.",
      solution: "$-5(x - 1) + 2(y + 1) + (z - 1) = 0$ gives $5x - 2y - z = 6$. Distance: $\\frac{6}{\\sqrt{30}} \\approx 1.10$.",
      commonMistakes: [
        { answer: 6, feedback: "Divide by $\\lvert\\vec n\\rvert = \\sqrt{30}$." },
      ],
    },
    {
      type: "quiz",
      id: "tdg5-4-q10",
      variant: "concept",
      question: "Two intersecting lines have directions $\\vec b_1$ and $\\vec b_2$. The normal of the plane containing them is",
      options: [
        { text: "$\\vec b_1 \\times \\vec b_2$", correct: true, feedback: "It is perpendicular to both lines, hence to the plane they span." },
        { text: "$\\vec b_1 + \\vec b_2$", feedback: "That vector lies in the plane, along the diagonal of the parallelogram on $\\vec b_1$, $\\vec b_2$." },
        { text: "$\\vec b_1 - \\vec b_2$", feedback: "Also a direction in the plane, not perpendicular to it." },
        { text: "$\\vec b_1 \\cdot \\vec b_2$", feedback: "That is a number, not a vector." },
      ],
      hint: "The normal must be perpendicular to both directions.",
    },
    {
      type: "quiz",
      id: "tdg5-4-q11",
      variant: "concept",
      question: "For two lines, $(\\vec a_2 - \\vec a_1) \\cdot (\\vec b_1 \\times \\vec b_2) = 0$. What can you conclude?",
      options: [
        { text: "They are coplanar: they intersect, or they are parallel", correct: true, feedback: "A zero triple product says the lines lie in one plane. If $\\vec b_1 \\times \\vec b_2 \\ne \\vec 0$ they meet; otherwise they are parallel." },
        { text: "They must intersect", feedback: "Parallel lines also give 0, because $\\vec b_1 \\times \\vec b_2 = \\vec 0$." },
        { text: "They are skew", feedback: "Skew lines give a non-zero triple product: the box they span has volume." },
        { text: "They are perpendicular", feedback: "Perpendicularity is $\\vec b_1 \\cdot \\vec b_2 = 0$, a different test." },
      ],
      hint: "What does a zero triple product say about the three vectors?",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "lines-as-intersections-and-projections",
  title: "5.5 · Lines as Intersections of Planes and Projections",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "Two walls of a room meet along a vertical edge. That edge is a line, and it is described completely by saying \"on this wall **and** on that wall\". JEE often gives a line this way, as a pair of plane equations, and expects you to turn it into a point and a direction. The second half of the lesson goes the other way: the shadow a line casts on a plane under light falling along the normal, its **projection**.",
    },
    { type: "heading", text: "From two planes to a point and a direction" },
    {
      type: "text",
      content:
        "The line $a_1x + b_1y + c_1z + d_1 = 0 = a_2x + b_2y + c_2z + d_2$ (the **unsymmetric form**) lies in both planes, so its direction is perpendicular to both normals:",
    },
    {
      type: "math",
      latex: "\\vec b = \\vec n_1 \\times \\vec n_2 = \\begin{vmatrix} \\hat i & \\hat j & \\hat k \\\\ a_1 & b_1 & c_1 \\\\ a_2 & b_2 & c_2 \\end{vmatrix}",
    },
    {
      type: "text",
      content:
        "For a point, fix one coordinate (usually $z = 0$) and solve the two plane equations for the other two. This works whenever the line actually crosses the plane $z = 0$, i.e. whenever the z-component of $\\vec b$ is not zero. If it is zero, $z$ is constant along the line, so fix $x$ or $y$ instead.",
    },
    {
      type: "interactive",
      config: {
        component: "tdg-space-viewer",
        mode: "two-planes",
        plane: [1, 1, 1, 1],
        plane2: [4, 1, -2, 2],
        show: ["intersection", "normal"],
        caption:
          "The planes $x + y + z + 1 = 0$ and $4x + y - 2z + 2 = 0$ and their line of intersection (Worked example 1). Rotate until you look straight along the line: both planes then appear as edges through one point, and both normals lie flat in your view, perpendicular to the line.",
      },
    },
    {
      type: "worked-example",
      id: "tdg5-5-we1",
      title: "Worked example 1: unsymmetric to symmetric form",
      problem: "Write the line $x + y + z + 1 = 0 = 4x + y - 2z + 2$ in symmetric form.",
      steps: [
        {
          text: "Direction from the cross product of the normals:",
          latex: "(1, 1, 1) \\times (4, 1, -2) = (1(-2) - 1 \\cdot 1,\\ 1 \\cdot 4 - 1 \\cdot (-2),\\ 1 \\cdot 1 - 1 \\cdot 4) = (-3, 6, -3) \\parallel (1, -2, 1)",
        },
        { text: "A point: put $z = 0$. Then $x + y = -1$ and $4x + y = -2$, so $3x = -1$: $x = -\\frac13$, $y = -\\frac23$." },
        { text: "*Why this step:* check the point in both planes: $-\\frac13 - \\frac23 + 0 + 1 = 0$ and $-\\frac43 - \\frac23 + 2 = 0$." },
      ],
      answer: "$\\frac{x + \\frac13}{1} = \\frac{y + \\frac23}{-2} = \\frac{z}{1}$.",
    },
    {
      type: "worked-example",
      id: "tdg5-5-we2",
      title: "Worked example 2: when setting a coordinate to zero fails",
      problem: "Write the line $2x + y - z = 3$, $x - y + z = 0$ in symmetric form.",
      steps: [
        { text: "Direction: $(2, 1, -1) \\times (1, -1, 1) = (1 - 1,\\ -1 - 2,\\ -2 - 1) = (0, -3, -3) \\parallel (0, 1, 1)$." },
        { text: "Adding the equations gives $3x = 3$, so $x = 1$ at **every** point of the line. *Why this step:* the zero x-component of the direction warned us; setting $x = 0$ would give no solution." },
        { text: "Put $z = 0$ instead: $x = 1$ and $1 - y = 0$, so $y = 1$. The point is $(1, 1, 0)$." },
      ],
      answer: "$\\frac{x - 1}{0} = \\frac{y - 1}{1} = \\frac{z}{1}$, i.e. $x = 1$, $y - 1 = z$.",
    },
    { type: "heading", text: "The projection of a line on a plane" },
    {
      type: "text",
      content:
        "Drop a perpendicular from every point of the line to the plane; the feet form the **projection**. Two ways to get it:",
    },
    {
      type: "text",
      content:
        "1. **Project two points.** Take two points of the line, find their feet in the plane (Lesson 5.3), join them. If the line meets the plane at $M$, use $M$ as one of them: it is its own foot.\n2. **The perpendicular plane.** The perpendiculars from the line sweep out a plane that contains the line and the normal $\\vec n$, so its normal is $\\vec b \\times \\vec n$. The projection is where this plane cuts the given plane, a line in unsymmetric form.",
    },
    {
      type: "text",
      content:
        "The direction of the projection is the part of $\\vec b$ that lies along the plane: $\\vec b - \\frac{\\vec b \\cdot \\vec n}{\\lvert\\vec n\\rvert^2}\\vec n$. Compare the image of a line (Lesson 5.3), which subtracts that normal part **twice**.",
    },
    {
      type: "worked-example",
      id: "tdg5-5-we3",
      title: "Worked example 3: projection both ways",
      problem: "Find the projection of the line through $A(1, 1, 1)$ with direction $(1, 2, 0)$ on the plane $x + y + z = 6$.",
      steps: [
        { text: "Meeting point: $3 + 3\\lambda = 6$, $\\lambda = 1$, $M = (2, 3, 1)$." },
        { text: "Foot of $A$: $P(A) = -3$, so $t = 1$ and $F = (2, 2, 2)$." },
        {
          text: "Method 1: join $M$ and $F$.",
          latex: "\\overrightarrow{MF} = (0, -1, 1), \\qquad \\frac{x - 2}{0} = \\frac{y - 3}{-1} = \\frac{z - 1}{1}",
        },
        {
          text: "Method 2: the plane through the line with normal $\\vec b \\times \\vec n = (1, 2, 0) \\times (1, 1, 1) = (2, -1, -1)$, through $A$: $2x - y - z = 0$. *Why this step:* $M$ and $F$ both satisfy it ($4 - 3 - 1 = 0$, $4 - 2 - 2 = 0$), so the two methods describe the same line.",
        },
      ],
      answer: "$\\frac{x - 2}{0} = \\frac{y - 3}{-1} = \\frac{z - 1}{1}$, equivalently $2x - y - z = 0 = x + y + z - 6$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the projection has the same direction as the line\"",
      content:
        "Only when the line is parallel to the plane. In general the projection keeps the part of $\\vec b$ along the plane and loses the normal part: in Worked example 3 the line runs along $(1, 2, 0)$ but its projection along $(0, -1, 1)$. And a line perpendicular to the plane projects to a single **point**.",
    },
    {
      type: "interactive",
      config: {
        component: "tdg-space-viewer",
        mode: "line-plane",
        a: [1, 1, 1],
        b: [1, 2, 0],
        plane: [1, 1, 1, -6],
        show: ["projection", "intersection", "normal"],
        caption:
          "Worked example 3. The line, its meeting point $M$ with $x + y + z = 6$, and its projection. Rotate to look straight down the normal: the line and its projection then lie exactly on top of each other, which is what \"shadow under light along the normal\" means.",
      },
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "tdg5-5-q1",
      variant: "practice",
      question:
        "The line $x + y + z = 1$, $2x - y + z = 3$ has direction ratios $(2, b, c)$. Find $b + c$.",
      answer: -2,
      hint: "Cross the normals $(1, 1, 1)$ and $(2, -1, 1)$.",
      solution: "$(1 \\cdot 1 - 1 \\cdot (-1),\\ 1 \\cdot 2 - 1 \\cdot 1,\\ 1 \\cdot (-1) - 1 \\cdot 2) = (2, 1, -3)$, so $b + c = -2$.",
      commonMistakes: [
        { answer: -4, feedback: "The middle component is $c_1a_2 - a_1c_2 = 2 - 1 = +1$. Watch the sign of the $\\hat j$ term." },
      ],
    },
    {
      type: "quiz",
      id: "tdg5-5-q2",
      variant: "practice",
      question: "The line $x + 2y + z = 4$, $x - y - z = -2$ in symmetric form is",
      options: [
        { text: "$\\frac x1 = \\frac{y - 2}{-2} = \\frac z3$", correct: true, feedback: "Direction $(1, 2, 1) \\times (1, -1, -1) = (-1, 2, -3)$, and $z = 0$ gives $(0, 2, 0)$." },
        { text: "$\\frac x1 = \\frac{y - 2}{2} = \\frac z3$", feedback: "The $\\hat j$ component's sign slipped: $(-1, 2, -3) \\parallel (1, -2, 3)$." },
        { text: "$\\frac x2 = \\frac{y - 2}{-1} = \\frac{z}{-1}$", feedback: "$(2, -1, -1)$ is not perpendicular to $(1, 2, 1)$: $2 - 2 - 1 \\ne 0$." },
        { text: "$\\frac{x - 1}{1} = \\frac{y - 2}{-2} = \\frac{z - 3}{3}$", feedback: "$(1, 2, 3)$ is not on the first plane: $1 + 4 + 3 = 8 \\ne 4$." },
      ],
      hint: "Cross the normals, then set $z = 0$ to find a point.",
    },
    {
      type: "numeric",
      id: "tdg5-5-q3",
      variant: "practice",
      question:
        "Find the length of the projection of the segment from $A(1, 0, 2)$ to $B(3, 3, 8)$ on the plane $3x + 4z = 5$ (to two decimal places).",
      answer: 3.6056,
      tolerance: 0.01,
      hint: "Split $\\overrightarrow{AB}$ into a part along the unit normal and a part along the plane.",
      solution: "$\\overrightarrow{AB} = (2, 3, 6)$ has length 7. Along the unit normal $\\frac15(3, 0, 4)$ its component is $\\frac{6 + 24}{5} = 6$. The part along the plane has length $\\sqrt{49 - 36} = \\sqrt{13} \\approx 3.61$.",
      commonMistakes: [
        { answer: 6, feedback: "6 is the component **along the normal**, the part the projection throws away." },
        { answer: 7, feedback: "7 is the length of $AB$ itself; it shrinks when projected unless $AB$ is parallel to the plane." },
      ],
    },
    {
      type: "numeric",
      id: "tdg5-5-q4",
      variant: "practice",
      question:
        "The projection of the line $\\frac{x - 1}{1} = \\frac{y - 1}{-1} = \\frac{z - 1}{1}$ on the plane $x + y + z = 6$ has direction ratios $(1, p, q)$. Find $p + q$.",
      answer: -1,
      hint: "Remove the normal part: $\\vec b - \\frac{\\vec b \\cdot \\vec n}{\\lvert\\vec n\\rvert^2}\\vec n$.",
      solution: "$\\vec b \\cdot \\vec n = 1$, so the projected direction is $(1, -1, 1) - \\frac13(1, 1, 1) = \\left(\\frac23, -\\frac43, \\frac23\\right) \\parallel (1, -2, 1)$. So $p + q = -1$. (The projection passes through the meeting point $(4, -2, 4)$.)",
      commonMistakes: [
        { answer: 0, feedback: "That keeps the direction of the line, $(1, -1, 1)$. The projection loses the normal part." },
      ],
    },
    {
      type: "quiz",
      id: "tdg5-5-q5",
      variant: "concept",
      multiple: true,
      question: "Which statements about the projection of a line $L$ on a plane $\\pi$ are true? Select all that apply.",
      options: [
        { text: "If $L$ is perpendicular to $\\pi$, its projection is a single point", correct: true, feedback: "Every point of $L$ drops to the same foot." },
        { text: "If $L$ is parallel to $\\pi$, its projection is a line parallel to $L$", correct: true, feedback: "The normal part of $\\vec b$ is zero, so the direction is kept." },
        { text: "If $L$ meets $\\pi$ at $M$, the projection passes through $M$", correct: true, feedback: "$M$ is its own foot." },
        { text: "The projection lies in the plane through $L$ perpendicular to $\\pi$", correct: true, feedback: "That plane is swept out by the perpendiculars from $L$." },
        { text: "The direction of the projection is $\\vec b \\times \\vec n$", feedback: "$\\vec b \\times \\vec n$ is the **normal** of the perpendicular plane, not a direction in $\\pi$ along the shadow." },
        { text: "The projection always has the same direction as $L$", feedback: "Only for lines parallel to $\\pi$." },
      ],
      hint: "Picture the shadow of a stick under light falling along the normal.",
    },
    {
      type: "numeric",
      id: "tdg5-5-q6",
      variant: "practice",
      question:
        "Find the distance of the origin from the plane that contains the line $\\frac{x - 1}{2} = \\frac{y + 1}{-1} = \\frac z3$ and is perpendicular to the plane $x + 2y + z = 12$ (to two decimal places).",
      answer: 0.9238,
      tolerance: 0.01,
      hint: "Its normal is $\\vec b \\times \\vec n = (2, -1, 3) \\times (1, 2, 1)$, and it passes through $(1, -1, 0)$.",
      solution: "$\\vec b \\times \\vec n = (-7, 1, 5)$. Through $(1, -1, 0)$: $7x - y - 5z = 8$. Distance: $\\frac{8}{\\sqrt{75}} \\approx 0.92$.",
      commonMistakes: [
        { answer: 8, feedback: "Divide by $\\lvert\\vec n\\rvert = \\sqrt{49 + 1 + 25} = \\sqrt{75}$." },
      ],
    },
    {
      type: "numeric",
      id: "tdg5-5-q7",
      variant: "practice",
      question:
        "Find the cosine of the acute angle between the line $x + y + z = 1$, $2x - y + z = 3$ and the z-axis (to three decimal places).",
      answer: 0.8018,
      tolerance: 0.002,
      hint: "The direction is $(2, 1, -3)$ (question 1); its direction cosine with the z-axis is $\\frac{\\lvert c\\rvert}{\\lvert\\vec b\\rvert}$.",
      solution: "$\\cos\\gamma = \\frac{3}{\\sqrt{14}} \\approx 0.802$.",
      commonMistakes: [
        { answer: -0.8018, tolerance: 0.002, feedback: "The acute angle has a positive cosine: take the modulus." },
        { answer: 0.5345, tolerance: 0.002, feedback: "That is $\\frac{2}{\\sqrt{14}}$, the cosine with the x-axis." },
      ],
    },
    {
      type: "quiz",
      id: "tdg5-5-q8",
      variant: "practice",
      multiple: true,
      question: "Which points lie on the line $x + y + z = 1$, $2x - y + z = 3$? Select all that apply.",
      options: [
        { text: "$(2, 0, -1)$", correct: true, feedback: "$2 + 0 - 1 = 1$ and $4 - 0 - 1 = 3$." },
        { text: "$(4, 1, -4)$", correct: true, feedback: "$4 + 1 - 4 = 1$ and $8 - 1 - 4 = 3$." },
        { text: "$(0, -1, 2)$", correct: true, feedback: "$0 - 1 + 2 = 1$ and $0 + 1 + 2 = 3$." },
        { text: "$(0, 2, -1)$", feedback: "It is on the first plane, but $0 - 2 - 1 = -3 \\ne 3$." },
        { text: "$(1, 0, 0)$", feedback: "First plane yes, second plane gives $2 \\ne 3$." },
      ],
      hint: "A point is on the line exactly when it satisfies **both** plane equations.",
    },
    {
      type: "numeric",
      id: "tdg5-5-q9",
      variant: "practice",
      question:
        "Find the distance of the point $(1, 2, 3)$ from the line $x + y + z = 1$, $2x - y + z = 3$ (to two decimal places).",
      answer: 3.2733,
      tolerance: 0.01,
      hint: "Symmetric form first: point $(2, 0, -1)$, direction $(2, 1, -3)$. Then $\\frac{\\lvert(\\vec p - \\vec a) \\times \\vec b\\rvert}{\\lvert\\vec b\\rvert}$ (Lesson 2.4).",
      solution: "$\\vec p - \\vec a = (-1, 2, 4)$, and $(-1, 2, 4) \\times (2, 1, -3) = (-10, 5, -5)$ with length $5\\sqrt6$. Dividing by $\\sqrt{14}$: $5\\sqrt{\\frac37} \\approx 3.27$.",
      commonMistakes: [
        { answer: 4.5826, tolerance: 0.01, feedback: "That is $\\lvert\\vec p - \\vec a\\rvert = \\sqrt{21}$, the distance to one particular point of the line, not the perpendicular distance." },
      ],
    },
    {
      type: "quiz",
      id: "tdg5-5-q10",
      variant: "concept",
      question:
        "To find a point on the line $x + y - z = 2$, $x - y + z = 4$, a student sets $x = 0$ and gets no solution. Why?",
      options: [
        { text: "Every point of the line has $x = 3$, so the line never meets the plane $x = 0$", correct: true, feedback: "Adding the equations gives $2x = 6$. The direction $(0, 1, 1)$ has zero x-component." },
        { text: "The two planes are parallel, so there is no line", feedback: "The normals $(1, 1, -1)$ and $(1, -1, 1)$ are not proportional; the planes do meet." },
        { text: "The line passes through the origin", feedback: "The origin gives $0 = 2$ in the first equation." },
        { text: "Setting a coordinate to zero never works for the unsymmetric form", feedback: "It works whenever the line crosses that coordinate plane; here $y = 0$ or $z = 0$ works." },
      ],
      hint: "Add the two equations.",
    },
    {
      type: "numeric",
      id: "tdg5-5-q11",
      variant: "practice",
      question:
        "The projection of the line $\\frac{x - 1}{2} = \\frac{y - 2}{3} = \\frac{z - 3}{6}$ on the xy-plane makes an angle $\\theta$ with the x-axis. Find $\\tan\\theta$.",
      answer: 1.5,
      hint: "Projecting on $z = 0$ simply drops the z-component of the direction.",
      solution: "The projected direction is $(2, 3, 0)$, a line of slope $\\frac32$ in the xy-plane, so $\\tan\\theta = 1.5$.",
      commonMistakes: [
        { answer: 3, feedback: "That is $\\frac{6}{2}$, using the z-component. Projection on the xy-plane keeps $x$ and $y$ only." },
      ],
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "jee-mixed-problems-in-3d",
  title: "5.6 · JEE Mixed Problems",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "JEE problems in three dimensions rarely test one formula. They chain two or three steps: reflect a point, then build a plane; turn two planes into a line, then measure a distance. The skill is choosing the right **object** first (a point, a direction, a normal) and then the right product. This lesson is a workshop: a strategy table, four multi-step examples, then practice.",
    },
    { type: "heading", text: "A strategy table" },
    {
      type: "table",
      headers: ["The question asks for", "Find first", "Then use"],
      rows: [
        ["Angle between two lines / two planes", "two directions / two normals", "$\\cos\\theta = \\frac{\\lvert\\vec u\\cdot\\vec v\\rvert}{\\lvert\\vec u\\rvert\\lvert\\vec v\\rvert}$"],
        ["Angle between a line and a plane", "$\\vec b$ and $\\vec n$", "$\\sin\\phi = \\frac{\\lvert\\vec b\\cdot\\vec n\\rvert}{\\lvert\\vec b\\rvert\\lvert\\vec n\\rvert}$"],
        ["Distance of a point from a line", "a point $A$ and $\\vec b$", "$\\frac{\\lvert(\\vec p - \\vec a)\\times\\vec b\\rvert}{\\lvert\\vec b\\rvert}$, or the foot by $\\overrightarrow{PQ}\\cdot\\vec b = 0$"],
        ["Distance of a point from a plane", "the plane in general form", "$\\frac{\\lvert P(x_1, y_1, z_1)\\rvert}{\\lvert\\vec n\\rvert}$"],
        ["Distance along a given line", "the general point along that line", "substitute in the plane, length $\\lvert\\lambda\\rvert\\lvert\\vec b\\rvert$"],
        ["Shortest distance of two lines", "$\\vec a_2 - \\vec a_1$, $\\vec b_1 \\times \\vec b_2$", "$\\frac{\\lvert(\\vec a_2 - \\vec a_1)\\cdot(\\vec b_1\\times\\vec b_2)\\rvert}{\\lvert\\vec b_1\\times\\vec b_2\\rvert}$; parallel: Lesson 3.4"],
        ["Plane through given objects", "two directions in the plane and one point", "normal = their cross product"],
        ["Plane through the line $P_1 = 0 = P_2$", "the extra condition", "$P_1 + \\lambda P_2 = 0$, solve for $\\lambda$"],
        ["Foot / image in a plane", "$P(x_1, y_1, z_1)$ and $\\lvert\\vec n\\rvert^2$", "$t = -\\frac{P}{\\lvert\\vec n\\rvert^2}$ (twice for the image)"],
        ["Line given by two planes", "$\\vec n_1 \\times \\vec n_2$ and one point", "symmetric form"],
      ],
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"one formula per question\"",
      content:
        "Most JEE questions need two objects you are not given: the image of a point before the plane through it, the symmetric form of a line before its distance from anything. Before reaching for a formula, list what each step needs (a point? a direction? a normal?) and where it will come from.",
    },
    { type: "heading", text: "Worked problems" },
    {
      type: "worked-example",
      id: "tdg5-6-we1",
      title: "Worked example 1: image, then a plane",
      problem:
        "JEE Advanced. $P$ is the image of $(3, 1, 7)$ in the plane $x - y + z = 3$. Find the plane through $P$ containing the line $\\frac x1 = \\frac y2 = \\frac z1$.",
      steps: [
        { text: "Image: the plane value at $(3, 1, 7)$ is $3 - 1 + 7 - 3 = 6$ and $\\lvert\\vec n\\rvert^2 = 3$, so $t = -4$ and $P = (3 - 4,\\ 1 + 4,\\ 7 - 4) = (-1, 5, 3)$." },
        {
          text: "The plane contains the line, which passes through $O$ with direction $(1, 2, 1)$, and the point $P$. *Why this step:* two directions in the plane are $(1, 2, 1)$ and $\\overrightarrow{OP} = (-1, 5, 3)$.",
          latex: "(1, 2, 1) \\times (-1, 5, 3) = (6 - 5,\\ -1 - 3,\\ 5 + 2) = (1, -4, 7)",
        },
        { text: "Through $O$: $x - 4y + 7z = 0$. Check $P$: $-1 - 20 + 21 = 0$." },
      ],
      answer: "$x - 4y + 7z = 0$.",
    },
    {
      type: "worked-example",
      id: "tdg5-6-we2",
      title: "Worked example 2: a line parallel to a plane that meets a line",
      problem:
        "Find the line through $P(3, 1, 2)$ that is parallel to the plane $x + 2y - z = 1$ and meets the line $\\frac{x - 1}{1} = \\frac y1 = \\frac{z + 1}{2}$.",
      steps: [
        { text: "The meeting point is a general point $Q = (1 + t,\\ t,\\ -1 + 2t)$ of the given line. Then $\\overrightarrow{PQ} = (t - 2,\\ t - 1,\\ 2t - 3)$." },
        {
          text: "Parallel to the plane means $\\overrightarrow{PQ} \\cdot \\vec n = 0$. *Why this step:* one unknown $t$, one condition.",
          latex: "(t - 2) + 2(t - 1) - (2t - 3) = t - 1 = 0 \\implies t = 1",
        },
        { text: "$Q = (2, 1, 1)$ and $\\overrightarrow{PQ} = (-1, 0, -1) \\parallel (1, 0, 1)$." },
      ],
      answer: "$\\frac{x - 3}{1} = \\frac{y - 1}{0} = \\frac{z - 2}{1}$.",
    },
    {
      type: "worked-example",
      id: "tdg5-6-we3",
      title: "Worked example 3: distance between a line and a parallel plane",
      problem: "Show that the line $\\vec r = (2\\hat i - 2\\hat j + 3\\hat k) + \\lambda(\\hat i - \\hat j + 4\\hat k)$ is parallel to the plane $\\vec r \\cdot (\\hat i + 5\\hat j + \\hat k) = 5$, and find the distance between them.",
      steps: [
        { text: "$\\vec b \\cdot \\vec n = 1 - 5 + 4 = 0$, so the line is parallel to the plane." },
        { text: "*Why this step:* every point of a parallel line is at the same distance from the plane, so any one point will do. Use $(2, -2, 3)$." },
        { latex: "\\frac{\\lvert 2 - 10 + 3 - 5\\rvert}{\\sqrt{1 + 25 + 1}} = \\frac{10}{3\\sqrt3}" },
      ],
      answer: "$\\frac{10}{3\\sqrt3} \\approx 1.92$.",
    },
    {
      type: "worked-example",
      id: "tdg5-6-we4",
      title: "Worked example 4: a family member with a condition",
      problem:
        "Find the plane through the line of intersection of $x + y + z = 1$ and $2x + 3y + 4z = 5$ that is perpendicular to the plane $x - y + z = 0$.",
      steps: [
        { text: "Every such plane is $(x + y + z - 1) + \\lambda(2x + 3y + 4z - 5) = 0$, with normal $(1 + 2\\lambda,\\ 1 + 3\\lambda,\\ 1 + 4\\lambda)$ (Lesson 4.5)." },
        {
          text: "Perpendicular planes have perpendicular normals:",
          latex: "(1 + 2\\lambda) - (1 + 3\\lambda) + (1 + 4\\lambda) = 1 + 3\\lambda = 0 \\implies \\lambda = -\\frac13",
        },
        { text: "Substitute and multiply by 3: $3(x + y + z - 1) - (2x + 3y + 4z - 5) = x - z + 2 = 0$. *Why this step:* clearing the fraction gives integer coefficients; the plane is the same." },
      ],
      answer: "$x - z + 2 = 0$.",
    },
    {
      type: "interactive",
      config: {
        component: "tdg-distance-lab",
        mode: "point-plane",
        p1: [3, 1, 7],
        plane1: [1, -1, 1, -3],
        caption:
          "Step 1 of Worked example 1: the image of $(3, 1, 7)$ in $x - y + z = 3$. Check the readout against $(-1, 5, 3)$, then change the point and predict the image before you look.",
      },
    },
    { type: "heading", text: "Practice" },
    {
      type: "numeric",
      id: "tdg5-6-q1",
      variant: "practice",
      question:
        "$P$ is the image of $(2, 1, 5)$ in the plane $x + y + z = 2$. The plane through $P$ containing the line $\\frac x1 = \\frac y1 = \\frac z2$ is $7x + \\beta y + \\gamma z = 0$. Find $\\beta + \\gamma$.",
      answer: -6,
      hint: "Worked example 1 with new numbers: image first, then cross $(1, 1, 2)$ with $\\overrightarrow{OP}$.",
      solution: "The plane value at $(2, 1, 5)$ is 6, so $t = -4$ and $P = (-2, -3, 1)$. $(1, 1, 2) \\times (-2, -3, 1) = (1 + 6,\\ -4 - 1,\\ -3 + 2) = (7, -5, -1)$. So $\\beta + \\gamma = -6$.",
      commonMistakes: [
        { answer: 6, feedback: "Check the signs of the cross product: $(7, -5, -1)$." },
      ],
    },
    {
      type: "numeric",
      id: "tdg5-6-q2",
      variant: "practice",
      question: "JEE Main. Find the shortest distance between the z-axis and the line $x + y + 2z - 3 = 0 = 2x + 3y + 4z - 4$.",
      answer: 2,
      hint: "Symmetric form first: direction $(1, 1, 2) \\times (2, 3, 4)$, and a point with $z = 0$.",
      solution: "Direction $(4 - 6,\\ 4 - 4,\\ 3 - 2) = (-2, 0, 1)$; with $z = 0$: $x + y = 3$, $2x + 3y = 4$, so $(5, -2, 0)$. Take this line as line 1 and the z-axis ($O$, direction $(0, 0, 1)$) as line 2: $\\vec b_1 \\times \\vec b_2 = (0, 2, 0)$ and $(\\vec a_2 - \\vec a_1) = (-5, 2, 0)$, so $SD = \\frac{\\lvert 4\\rvert}{2} = 2$.",
      commonMistakes: [
        { answer: 5.3852, tolerance: 0.01, feedback: "That is the distance from $O$ to the point $(5, -2, 0)$, not the shortest distance between the lines." },
      ],
    },
    {
      type: "quiz",
      id: "tdg5-6-q3",
      variant: "practice",
      multiple: true,
      question:
        "For the line $L: \\frac{x - 1}{2} = \\frac{y + 1}{-1} = \\frac{z - 3}{1}$ and the plane $\\pi: x + y + z = 3$, which statements are true? Select all that apply.",
      options: [
        { text: "$L$ meets $\\pi$ at $(1, -1, 3)$", correct: true, feedback: "$3 + 2\\lambda = 3$ gives $\\lambda = 0$: the given point is on $\\pi$." },
        { text: "The angle $\\phi$ between $L$ and $\\pi$ has $\\sin\\phi = \\frac{\\sqrt2}{3}$", correct: true, feedback: "$\\frac{\\lvert 2 - 1 + 1\\rvert}{\\sqrt6\\sqrt3} = \\frac{2}{3\\sqrt2} = \\frac{\\sqrt2}{3}$." },
        { text: "The projection of $L$ on $\\pi$ has direction $(4, -5, 1)$", correct: true, feedback: "$(2, -1, 1) - \\frac23(1, 1, 1) = \\frac13(4, -5, 1)$." },
        { text: "The image of $L$ in $\\pi$ has direction $(2, 7, 1)$", feedback: "$(2, -1, 1) - \\frac43(1, 1, 1) = \\frac13(2, -7, -1)$: the image direction is $(2, -7, -1)$." },
        { text: "$L$ is parallel to $\\pi$", feedback: "$\\vec b \\cdot \\vec n = 2 \\ne 0$." },
      ],
      hint: "Use $\\vec b \\cdot \\vec n = 2$ and $\\lvert\\vec n\\rvert^2 = 3$ throughout: remove $\\frac{2}{3}\\vec n$ for the projection, $\\frac43\\vec n$ for the image.",
    },
    {
      type: "numeric",
      id: "tdg5-6-q4",
      variant: "practice",
      question:
        "A line through $P(1, 2, 3)$, parallel to the plane $x - y + 2z = 5$, meets the line $\\frac{x + 1}{1} = \\frac{y - 1}{2} = \\frac z1$ at $Q(\\alpha, \\beta, \\gamma)$. Find $\\alpha + \\beta + \\gamma$.",
      answer: 28,
      hint: "Worked example 2: $Q = (-1 + t, 1 + 2t, t)$ and $\\overrightarrow{PQ} \\cdot (1, -1, 2) = 0$.",
      solution: "$\\overrightarrow{PQ} = (t - 2, 2t - 1, t - 3)$; $(t - 2) - (2t - 1) + 2(t - 3) = t - 7 = 0$, so $t = 7$ and $Q = (6, 15, 7)$, with sum 28.",
      commonMistakes: [
        { answer: 7, feedback: "7 is the parameter $t$. Substitute it into the general point." },
      ],
    },
    {
      type: "numeric",
      id: "tdg5-6-q5",
      variant: "practice",
      question:
        "Find the distance between the line $\\frac{x - 2}{3} = \\frac{y - 3}{4} = \\frac{z - 4}{5}$ and the plane $x - 2y + z = 5$ (to two decimal places).",
      answer: 2.0412,
      tolerance: 0.01,
      hint: "Check $\\vec b \\cdot \\vec n$ first; if it is 0, use any point of the line.",
      solution: "$3 - 8 + 5 = 0$: parallel. The point $(2, 3, 4)$ gives $2 - 6 + 4 - 5 = -5$, so the distance is $\\frac{5}{\\sqrt6} \\approx 2.04$.",
      commonMistakes: [
        { answer: 5, feedback: "Divide by $\\lvert\\vec n\\rvert = \\sqrt6$." },
      ],
    },
    {
      type: "numeric",
      id: "tdg5-6-q6",
      variant: "practice",
      question:
        "The foot of the perpendicular from $P(1, 0, 3)$ to the line through $A(4, 7, 1)$ and $B(3, 5, 3)$ is $(\\alpha, \\beta, \\gamma)$. Find $\\alpha + \\beta + \\gamma$. (A fraction such as 3/7 is fine.)",
      answer: 9.6666667,
      tolerance: 0.001,
      hint: "Direction $\\overrightarrow{AB} = (-1, -2, 2)$; general point $Q = (4 - \\lambda, 7 - 2\\lambda, 1 + 2\\lambda)$; set $\\overrightarrow{PQ} \\cdot \\overrightarrow{AB} = 0$.",
      solution: "$\\overrightarrow{PQ} = (3 - \\lambda, 7 - 2\\lambda, -2 + 2\\lambda)$; the dot product is $9\\lambda - 21 = 0$, so $\\lambda = \\frac73$. The foot is $\\left(\\frac53, \\frac73, \\frac{17}{3}\\right)$, with sum $\\frac{29}{3}$.",
      commonMistakes: [
        { answer: 2.3333333, tolerance: 0.001, feedback: "That is $\\lambda$. Substitute it into the general point." },
      ],
    },
    {
      type: "numeric",
      id: "tdg5-6-q7",
      variant: "practice",
      question:
        "The plane through the line of intersection of $x + 2y + 3z = 4$ and $2x + y - z + 5 = 0$ that is perpendicular to $5x + 3y + 6z + 8 = 0$ is $51x + 15y - 50z + k = 0$. Find $k$.",
      answer: 173,
      hint: "Worked example 4: $(x + 2y + 3z - 4) + \\lambda(2x + y - z + 5) = 0$ with normal perpendicular to $(5, 3, 6)$.",
      solution: "$5(1 + 2\\lambda) + 3(2 + \\lambda) + 6(3 - \\lambda) = 29 + 7\\lambda = 0$, so $\\lambda = -\\frac{29}{7}$. Multiplying by 7: $7(x + 2y + 3z - 4) - 29(2x + y - z + 5) = -51x - 15y + 50z - 173 = 0$, so $k = 173$.",
      commonMistakes: [
        { answer: -173, feedback: "Multiply the whole equation by $-1$ to match the leading $51x$: the constant becomes $+173$." },
      ],
    },
    {
      type: "numeric",
      id: "tdg5-6-q8",
      variant: "practice",
      question:
        "JEE Main. Find the shortest distance between $\\frac{x - 3}{3} = \\frac{y - 8}{-1} = \\frac{z - 3}{1}$ and $\\frac{x + 3}{-3} = \\frac{y + 7}{2} = \\frac{z - 6}{4}$ (to two decimal places).",
      answer: 16.4317,
      tolerance: 0.01,
      hint: "$\\vec b_1 \\times \\vec b_2 = (3, -1, 1) \\times (-3, 2, 4)$ and $\\vec a_2 - \\vec a_1 = (-6, -15, 3)$.",
      solution: "$\\vec b_1 \\times \\vec b_2 = (-6, -15, 3)$, which happens to equal $\\vec a_2 - \\vec a_1$. So $SD = \\frac{270}{\\sqrt{270}} = \\sqrt{270} = 3\\sqrt{30} \\approx 16.43$.",
      commonMistakes: [
        { answer: 270, feedback: "Divide by $\\lvert\\vec b_1 \\times \\vec b_2\\rvert = \\sqrt{270}$." },
      ],
    },
    {
      type: "quiz",
      id: "tdg5-6-q9",
      variant: "practice",
      multiple: true,
      question:
        "JEE Advanced. Which planes bisect an angle between the planes $2x - y + 2z = 3$ and $3x - 2y + 6z = 8$? Select all that apply.",
      options: [
        { text: "$5x - y - 4z + 3 = 0$", correct: true, feedback: "From $7(2x - y + 2z - 3) = 3(3x - 2y + 6z - 8)$." },
        { text: "$23x - 13y + 32z - 45 = 0$", correct: true, feedback: "From $7(2x - y + 2z - 3) = -3(3x - 2y + 6z - 8)$." },
        { text: "$5x - 3y + 8z - 11 = 0$", feedback: "That is the plain sum of the equations, without dividing by $\\lvert\\vec n_1\\rvert = 3$ and $\\lvert\\vec n_2\\rvert = 7$." },
        { text: "$x - y + 4z - 5 = 0$", feedback: "That is the plain difference; it is not equidistant from the two planes." },
      ],
      hint: "Points equidistant from both planes: $\\frac{2x - y + 2z - 3}{3} = \\pm\\frac{3x - 2y + 6z - 8}{7}$ (Lesson 4.7).",
    },
    {
      type: "numeric",
      id: "tdg5-6-q10",
      variant: "practice",
      question:
        "The image of the origin in a plane $\\pi$ is $(2, 4, 4)$. Find the volume of the tetrahedron cut from the coordinate axes by $\\pi$. (A fraction such as 3/8 is fine.)",
      answer: 30.375,
      tolerance: 0.001,
      hint: "$\\pi$ is the perpendicular bisector plane of $O$ and $(2, 4, 4)$; then use the intercepts (Lesson 4.4).",
      solution: "Normal $(1, 2, 2)$ through the midpoint $(1, 2, 2)$: $x + 2y + 2z = 9$. Intercepts $9, \\frac92, \\frac92$, so the volume is $\\frac16 \\cdot 9 \\cdot \\frac92 \\cdot \\frac92 = \\frac{243}{8}$.",
      commonMistakes: [
        { answer: 182.25, tolerance: 0.001, feedback: "Include the $\\frac16$: the tetrahedron is $\\frac16\\lvert abc\\rvert$." },
        { answer: 243, feedback: "That uses the plane through $(2, 4, 4)$ itself, $x + 2y + 2z = 18$. The mirror passes through the midpoint." },
      ],
    },
    {
      type: "numeric",
      id: "tdg5-6-q11",
      variant: "practice",
      question:
        "Find the angle, in degrees, between the line $x + y + z = 1$, $2x - y + z = 3$ and the plane $x + y = 0$ (to one decimal place).",
      answer: 34.54,
      tolerance: 0.1,
      unit: "degrees",
      hint: "The line's direction is $(2, 1, -3)$ (Lesson 5.5); then $\\sin\\phi = \\frac{\\lvert\\vec b \\cdot \\vec n\\rvert}{\\lvert\\vec b\\rvert\\lvert\\vec n\\rvert}$.",
      solution: "$\\sin\\phi = \\frac{\\lvert 2 + 1\\rvert}{\\sqrt{14}\\sqrt2} = \\frac{3}{\\sqrt{28}} \\approx 0.567$, so $\\phi \\approx 34.5^\\circ$.",
      commonMistakes: [
        { answer: 55.46, tolerance: 0.1, feedback: "That is the angle with the normal. The angle with the plane is its complement." },
      ],
    },
    {
      type: "numeric",
      id: "tdg5-6-q12",
      variant: "practice",
      question:
        "JEE Main. The line $\\frac{x - 1}{2} = \\frac{y + 1}{3} = \\frac{z - 2}{4}$ meets the plane $x + 2y + 3z = 15$ at $P$. Find the distance of $P$ from the origin.",
      answer: 4.5,
      hint: "Substitute $(1 + 2\\lambda, -1 + 3\\lambda, 2 + 4\\lambda)$ into the plane.",
      solution: "$5 + 20\\lambda = 15$, so $\\lambda = \\frac12$ and $P = \\left(2, \\frac12, 4\\right)$. $OP = \\sqrt{4 + \\frac14 + 16} = \\frac92$.",
      commonMistakes: [
        { answer: 0.5, feedback: "0.5 is $\\lambda$. Find $P$ and then its distance from $O$." },
      ],
    },
    {
      type: "quiz",
      id: "tdg5-6-q13",
      variant: "concept",
      question: "To find the distance of a point $P$ from a plane measured parallel to a line $L$, what do you compute first?",
      options: [
        { text: "The general point of the line through $P$ with the direction of $L$", correct: true, feedback: "Then substitute it in the plane for $\\lambda$, and the distance is $\\lvert\\lambda\\rvert\\lvert\\vec b\\rvert$." },
        { text: "The perpendicular distance $\\frac{\\lvert P(x_1, y_1, z_1)\\rvert}{\\lvert\\vec n\\rvert}$", feedback: "That is the shortest distance, along the normal, not along $L$." },
        { text: "The point where $L$ itself meets the plane", feedback: "$L$ usually does not pass through $P$; you walk from $P$ **parallel** to $L$." },
        { text: "The foot of the perpendicular from $P$ to $L$", feedback: "That measures the distance from $P$ to the line $L$, not to the plane." },
      ],
      hint: "Strategy table, row 5.",
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
        "This is the closing diagnostic for the whole course. No new theory and no formula sheet: every question can be rebuilt from three objects. A **point** (coordinates, distances, section and centroid), a **direction** $\\vec b$ (direction cosines, angles between lines, the general point of a line) and a **normal** $\\vec n$ (planes, sides, distances, feet and images), joined by the dot, cross and triple products.",
    },
    { type: "heading", text: "Reconstruct it" },
    {
      type: "callout",
      variant: "tip",
      title: "Rebuild the course from a point, a direction and a normal",
      content:
        "Without notes, explain each of these from a picture:\n\n1. Why $l^2 + m^2 + n^2 = 1$, and why the angle between two lines is $\\cos^{-1}\\lvert l_1l_2 + m_1m_2 + n_1n_2\\rvert$. (Chapter 1)\n2. Why the foot from $P$ to a line solves $\\overrightarrow{PQ(\\lambda)} \\cdot \\vec b = 0$, and why the distance is $\\frac{\\lvert(\\vec p - \\vec a) \\times \\vec b\\rvert}{\\lvert\\vec b\\rvert}$. (Chapter 2)\n3. Why the shortest distance between skew lines is the projection of $\\vec a_2 - \\vec a_1$ on $\\vec b_1 \\times \\vec b_2$, and why it vanishes exactly when the lines are coplanar. (Chapter 3)\n4. Why $\\frac{\\lvert ax_1 + by_1 + cz_1 + d\\rvert}{\\sqrt{a^2 + b^2 + c^2}}$ is the distance from a plane, and why $P_1 + \\lambda P_2 = 0$ passes through the line $P_1 = 0 = P_2$. (Chapter 4)\n5. Why the angle with a plane uses $\\sin$, and why the image of a point needs twice the foot's parameter. (Chapter 5)",
    },
    {
      type: "interactive",
      config: {
        component: "tdg-space-viewer",
        mode: "line-plane",
        a: [0, 0, 0],
        b: [1, 0, 0],
        plane: [1, 1, 1, -3],
        show: ["projection", "intersection", "normal"],
        sliders: [{ name: "d", min: -6, max: 6, step: 1, initial: -3 }],
        caption:
          "The x-axis and the plane $x + y + z = 3$ (question 18). Before moving the slider, predict where the axis meets the plane and the direction of its projection. Then slide the constant $d$: the meeting point moves, but the angle and the projected direction do not. Why?",
      },
    },
    { type: "heading", text: "Mastery questions" },
    {
      type: "numeric",
      id: "tdg5-7-q1",
      variant: "mastery",
      question:
        "The segment joining $(2, 3, 4)$ and $(-3, 5, -4)$ crosses the yz-plane at a point. Find the z-coordinate of that point.",
      answer: 0.8,
      hint: "Lesson 0.3: the yz-plane ($x = 0$) divides the segment in the ratio $-x_1 : x_2 = 2 : 3$.",
      solution: "Ratio $2 : 3$, internal. The point is $\\frac{3(2, 3, 4) + 2(-3, 5, -4)}{5} = \\left(0, \\frac{19}{5}, \\frac45\\right)$, so $z = 0.8$.",
      commonMistakes: [
        { answer: -0.8, feedback: "Weights: $\\frac{3 \\cdot 4 + 2 \\cdot (-4)}{5} = \\frac45$. The nearer end gets the bigger weight." },
        { answer: 0, feedback: "That is the midpoint's z-coordinate. The yz-plane does not cut the segment in half here." },
      ],
    },
    {
      type: "numeric",
      id: "tdg5-7-q2",
      variant: "mastery",
      question: "A line makes angles of $45^\\circ$ and $60^\\circ$ with the x- and y-axes. Find the acute angle, in degrees, it makes with the z-axis.",
      answer: 60,
      unit: "degrees",
      hint: "Lesson 1.1: $\\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma = 1$.",
      solution: "$\\cos^2\\gamma = 1 - \\frac12 - \\frac14 = \\frac14$, so $\\cos\\gamma = \\pm\\frac12$ and the acute angle is $60^\\circ$.",
      commonMistakes: [
        { answer: 75, feedback: "The angles with the axes do not add to $180^\\circ$. Use the squares of the cosines." },
      ],
    },
    {
      type: "numeric",
      id: "tdg5-7-q3",
      variant: "mastery",
      question: "Find the cosine of the acute angle between two body diagonals of a cube. (A fraction such as 1/2 is fine.)",
      answer: 0.3333333,
      tolerance: 0.001,
      hint: "Lesson 1.3: on the unit cube the diagonals have directions $(1, 1, 1)$ and $(1, 1, -1)$.",
      solution: "$\\cos\\theta = \\frac{\\lvert 1 + 1 - 1\\rvert}{\\sqrt3\\sqrt3} = \\frac13$, so $\\theta \\approx 70.5^\\circ$.",
      commonMistakes: [
        { answer: 0.5, feedback: "Check the dot product: $(1, 1, 1) \\cdot (1, 1, -1) = 1$, and the lengths are $\\sqrt3$ each." },
      ],
    },
    {
      type: "numeric",
      id: "tdg5-7-q4",
      variant: "mastery",
      question:
        "Find the projection of the segment from $A(2, 3, -1)$ to $B(3, 5, 1)$ on the line with direction ratios $(2, -1, 2)$. (A fraction such as 3/4 is fine.)",
      answer: 1.3333333,
      tolerance: 0.001,
      hint: "Lesson 1.5: $\\overrightarrow{AB} \\cdot \\hat u$ with $\\hat u = \\frac13(2, -1, 2)$.",
      solution: "$\\overrightarrow{AB} = (1, 2, 2)$, and $\\frac{2 - 2 + 4}{3} = \\frac43$.",
      commonMistakes: [
        { answer: 4, feedback: "Normalise the direction ratios first: divide by $\\lvert(2, -1, 2)\\rvert = 3$." },
      ],
    },
    {
      type: "numeric",
      id: "tdg5-7-q5",
      variant: "mastery",
      question: "Find the distance of $P(1, 6, 3)$ from the line $\\frac x1 = \\frac{y - 1}{2} = \\frac{z - 2}{3}$ (to two decimal places).",
      answer: 3.6056,
      tolerance: 0.01,
      hint: "Lesson 2.4: general point $Q(\\lambda, 1 + 2\\lambda, 2 + 3\\lambda)$ and $\\overrightarrow{PQ} \\cdot (1, 2, 3) = 0$.",
      solution: "$\\overrightarrow{PQ} \\cdot (1, 2, 3) = 14\\lambda - 14 = 0$, so $\\lambda = 1$ and the foot is $(1, 3, 5)$. $PQ = \\sqrt{0 + 9 + 4} = \\sqrt{13} \\approx 3.61$.",
      commonMistakes: [
        { answer: 13, feedback: "That is $PQ^2$. Take the square root." },
      ],
    },
    {
      type: "quiz",
      id: "tdg5-7-q6",
      variant: "mastery",
      question: "The image of $P(1, 6, 3)$ in the line $\\frac x1 = \\frac{y - 1}{2} = \\frac{z - 2}{3}$ is",
      options: [
        { text: "$(1, 0, 7)$", correct: true, feedback: "With foot $Q(1, 3, 5)$: $2Q - P = (2 - 1, 6 - 6, 10 - 3)$." },
        { text: "$(1, 3, 5)$", feedback: "That is the foot $Q$, the midpoint of $P$ and its image." },
        { text: "$(2, 9, 8)$", feedback: "That is $P + Q$. The image is $2Q - P$." },
        { text: "$(-1, -6, -3)$", feedback: "That is the reflection of $P$ in the origin." },
      ],
      hint: "Lesson 2.5: the foot is the midpoint of $P$ and its image.",
    },
    {
      type: "numeric",
      id: "tdg5-7-q7",
      variant: "mastery",
      question:
        "Find the shortest distance between $\\vec r = (\\hat i + 2\\hat j + \\hat k) + \\lambda(\\hat i - \\hat j + \\hat k)$ and $\\vec r = (2\\hat i - \\hat j - \\hat k) + \\mu(2\\hat i + \\hat j + 2\\hat k)$ (to two decimal places).",
      answer: 2.1213,
      tolerance: 0.01,
      hint: "Lesson 3.2: $\\frac{\\lvert(\\vec a_2 - \\vec a_1) \\cdot (\\vec b_1 \\times \\vec b_2)\\rvert}{\\lvert\\vec b_1 \\times \\vec b_2\\rvert}$.",
      solution: "$\\vec b_1 \\times \\vec b_2 = (-3, 0, 3)$, $\\vec a_2 - \\vec a_1 = (1, -3, -2)$, dot product $-9$. $SD = \\frac{9}{3\\sqrt2} = \\frac{3}{\\sqrt2} \\approx 2.12$.",
      commonMistakes: [
        { answer: 3.7417, tolerance: 0.01, feedback: "That is $\\lvert\\vec a_2 - \\vec a_1\\rvert = \\sqrt{14}$, the distance between the two given points, not the shortest distance." },
      ],
    },
    {
      type: "numeric",
      id: "tdg5-7-q8",
      variant: "mastery",
      question:
        "Find the distance between the parallel lines $\\vec r = \\hat i + 2\\hat j - 4\\hat k + \\lambda(2\\hat i + 3\\hat j + 6\\hat k)$ and $\\vec r = 3\\hat i + 3\\hat j - 5\\hat k + \\mu(2\\hat i + 3\\hat j + 6\\hat k)$ (to two decimal places).",
      answer: 2.4453,
      tolerance: 0.01,
      hint: "Lesson 3.4: $\\frac{\\lvert(\\vec a_2 - \\vec a_1) \\times \\vec b\\rvert}{\\lvert\\vec b\\rvert}$.",
      solution: "$(2, 1, -1) \\times (2, 3, 6) = (9, -14, 4)$ with length $\\sqrt{293}$. Dividing by 7: $\\frac{\\sqrt{293}}{7} \\approx 2.45$.",
      commonMistakes: [
        { answer: 17.1172, tolerance: 0.01, feedback: "That is $\\lvert(\\vec a_2 - \\vec a_1) \\times \\vec b\\rvert = \\sqrt{293}$. Divide by $\\lvert\\vec b\\rvert = 7$." },
      ],
    },
    {
      type: "numeric",
      id: "tdg5-7-q9",
      variant: "mastery",
      question:
        "The lines $\\frac{x - 1}{2} = \\frac{y - 2}{3} = \\frac{z - 3}{4}$ and $\\frac{x - 4}{5} = \\frac{y - 1}{2} = \\frac z1$ intersect at $(\\alpha, \\beta, \\gamma)$. Find $\\alpha + \\beta + \\gamma$.",
      answer: -3,
      hint: "Lesson 2.6: equate $(1 + 2s, 2 + 3s, 3 + 4s)$ and $(4 + 5t, 1 + 2t, t)$; solve two equations, check the third.",
      solution: "From $z$: $t = 3 + 4s$. From $x$: $1 + 2s = 4 + 5(3 + 4s)$, so $s = -1$, $t = -1$. Both give $(-1, -1, -1)$ (the y-equation agrees: $2 - 3 = 1 - 2$). Sum $-3$.",
      commonMistakes: [
        { answer: -1, feedback: "$-1$ is the parameter (and each coordinate). The question asks for the sum." },
      ],
    },
    {
      type: "numeric",
      id: "tdg5-7-q10",
      variant: "mastery",
      question: "Find the distance between the planes $2x - y + 2z + 3 = 0$ and $4x - 2y + 4z + 5 = 0$. (A fraction such as 1/3 is fine.)",
      answer: 0.1666667,
      tolerance: 0.001,
      hint: "Lesson 4.7: halve the second equation so the normals match.",
      solution: "$2x - y + 2z + \\frac52 = 0$, so the distance is $\\frac{\\lvert 3 - \\frac52\\rvert}{3} = \\frac16$.",
      commonMistakes: [
        { answer: 0.6666667, tolerance: 0.001, feedback: "You subtracted 3 and 5 without matching the normals first." },
      ],
    },
    {
      type: "numeric",
      id: "tdg5-7-q11",
      variant: "mastery",
      question: "Find the angle, in degrees, between the planes $2x - y + z = 6$ and $x + y + 2z = 7$.",
      answer: 60,
      unit: "degrees",
      hint: "Lesson 4.6: the angle between the normals.",
      solution: "$\\cos\\theta = \\frac{\\lvert 2 - 1 + 2\\rvert}{\\sqrt6\\sqrt6} = \\frac12$, so $\\theta = 60^\\circ$.",
      commonMistakes: [
        { answer: 30, feedback: "$\\cos\\theta = \\frac12$ gives $60^\\circ$. Two planes use the cosine of the angle between their normals." },
      ],
    },
    {
      type: "quiz",
      id: "tdg5-7-q12",
      variant: "mastery",
      multiple: true,
      question: "For the plane $\\frac x2 + \\frac y3 + \\frac z6 = 1$, which statements are true? Select all that apply.",
      options: [
        { text: "Its intercepts on the axes are 2, 3 and 6", correct: true, feedback: "Read straight off the intercept form." },
        { text: "$(3, 2, 1)$ is a normal to it", correct: true, feedback: "Multiply by 6: $3x + 2y + z = 6$." },
        { text: "Its distance from the origin is $\\frac{6}{\\sqrt{14}}$", correct: true, feedback: "$\\frac{6}{\\sqrt{9 + 4 + 1}}$." },
        { text: "It cuts off a tetrahedron of volume 6 with the coordinate planes", correct: true, feedback: "$\\frac16 \\cdot 2 \\cdot 3 \\cdot 6 = 6$." },
        { text: "$(2, 3, 6)$ is a normal to it", feedback: "The normal is $\\left(\\frac12, \\frac13, \\frac16\\right) \\parallel (3, 2, 1)$, the reciprocals of the intercepts." },
        { text: "$(1, 1, 1)$ and the origin are on the same side of it", feedback: "$3 + 2 + 1 - 6 = 0$: the point $(1, 1, 1)$ lies on the plane." },
      ],
      hint: "Lessons 4.4 and 4.7: clear the fractions first.",
    },
    {
      type: "numeric",
      id: "tdg5-7-q13",
      variant: "mastery",
      question:
        "The plane through the intersection of $x + y + z = 6$ and $2x + 3y + 4z + 5 = 0$ that passes through $(1, 1, 1)$ is $20x + 23y + 26z + k = 0$. Find $k$.",
      answer: -69,
      hint: "Lesson 4.5: $(x + y + z - 6) + \\lambda(2x + 3y + 4z + 5) = 0$ at $(1, 1, 1)$.",
      solution: "$-3 + 14\\lambda = 0$, so $\\lambda = \\frac{3}{14}$. Multiplying by 14: $14(x + y + z - 6) + 3(2x + 3y + 4z + 5) = 20x + 23y + 26z - 69 = 0$.",
      commonMistakes: [
        { answer: 69, feedback: "Check: $(1, 1, 1)$ gives $20 + 23 + 26 = 69$, so $k = -69$." },
      ],
    },
    {
      type: "numeric",
      id: "tdg5-7-q14",
      variant: "mastery",
      question: "Find $\\sin\\phi$, where $\\phi$ is the angle between the line $\\frac x2 = \\frac{y}{-1} = \\frac z2$ and the plane $x + y + z = 4$ (to three decimal places).",
      answer: 0.5774,
      tolerance: 0.002,
      hint: "Lesson 5.1: $\\sin\\phi = \\frac{\\lvert\\vec b \\cdot \\vec n\\rvert}{\\lvert\\vec b\\rvert\\lvert\\vec n\\rvert}$.",
      solution: "$\\frac{\\lvert 2 - 1 + 2\\rvert}{3\\sqrt3} = \\frac{1}{\\sqrt3} \\approx 0.577$.",
      commonMistakes: [
        { answer: 0.8165, tolerance: 0.002, feedback: "That is $\\cos\\phi$. The dot-product ratio already gives $\\sin\\phi$." },
      ],
    },
    {
      type: "numeric",
      id: "tdg5-7-q15",
      variant: "mastery",
      question: "The image of $(1, 2, 3)$ in the plane $x + y + z = 0$ is $(\\alpha, \\beta, \\gamma)$. Find $\\alpha + \\beta + \\gamma$.",
      answer: -6,
      hint: "Lesson 5.3: $t = -\\frac{2 \\cdot 6}{3}$.",
      solution: "$t = -4$, so the image is $(1 - 4, 2 - 4, 3 - 4) = (-3, -2, -1)$, with sum $-6$. (Check: $-6$ is minus the value 6 at the original point.)",
      commonMistakes: [
        { answer: 0, feedback: "That is the foot $(-1, 0, 1)$, which lies on the plane. The image is twice as far." },
      ],
    },
    {
      type: "numeric",
      id: "tdg5-7-q16",
      variant: "mastery",
      question:
        "JEE Main. Find the distance of the point $(1, 0, -3)$ from the plane $x - y - z = 9$, measured parallel to the line $\\frac{x - 2}{2} = \\frac{y + 2}{3} = \\frac{z - 6}{-6}$.",
      answer: 7,
      hint: "Lesson 5.2: walk $(1 + 2\\lambda, 3\\lambda, -3 - 6\\lambda)$ to the plane; the step has length $7\\lvert\\lambda\\rvert$.",
      solution: "$(1 + 2\\lambda) - 3\\lambda - (-3 - 6\\lambda) = 4 + 5\\lambda = 9$, so $\\lambda = 1$. The meeting point is $(3, 3, -9)$, at distance $7 \\cdot 1 = 7$.",
      commonMistakes: [
        { answer: 2.8868, tolerance: 0.01, feedback: "That is the perpendicular distance $\\frac{5}{\\sqrt3}$, not the distance parallel to the line." },
        { answer: 1, feedback: "1 is $\\lambda$. Multiply by $\\lvert(2, 3, -6)\\rvert = 7$." },
      ],
    },
    {
      type: "quiz",
      id: "tdg5-7-q17",
      variant: "mastery",
      multiple: true,
      question: "For the line $\\vec r = \\hat i + \\lambda(\\hat i + \\hat j + \\hat k)$ and the plane $x - 2y + z = 1$, which statements are true? Select all that apply.",
      options: [
        { text: "The line lies in the plane", correct: true, feedback: "$1 - 2 + 1 = 0$ and $(1, 0, 0)$ gives $1 = 1$." },
        { text: "The angle between the line and the plane is $0^\\circ$", correct: true, feedback: "$\\vec b \\cdot \\vec n = 0$." },
        { text: "The image of the line in the plane is the line itself", correct: true, feedback: "Every point of the line is on the mirror." },
        { text: "The line meets the plane $x - 2y + z = 5$ at exactly one point", feedback: "It is parallel to that plane too and does not lie in it, so it never meets it." },
        { text: "The projection of the line on the plane is a single point", feedback: "Only a line perpendicular to the plane projects to a point; this line is its own projection." },
      ],
      hint: "Lessons 5.1 to 5.5: start from $\\vec b \\cdot \\vec n$ and one point.",
    },
    {
      type: "numeric",
      id: "tdg5-7-q18",
      variant: "mastery",
      question:
        "JEE Advanced. The x-axis is projected on the plane $x + y + z = 3$. Find the cosine of the angle between the x-axis and its projection (to three decimal places).",
      answer: 0.8165,
      tolerance: 0.002,
      hint: "Lesson 5.5: the projection joins the meeting point $(3, 0, 0)$ to the foot of the origin.",
      solution: "The foot of $O$ is $(1, 1, 1)$, so the projection has direction $(1, 1, 1) - (3, 0, 0) = (-2, 1, 1)$. $\\cos = \\frac{\\lvert -2\\rvert}{\\sqrt6} = \\sqrt{\\frac23} \\approx 0.816$. This is $\\cos\\phi$, where $\\sin\\phi = \\frac{1}{\\sqrt3}$ is the sine of the angle between the axis and the plane.",
      commonMistakes: [
        { answer: 0.5774, tolerance: 0.002, feedback: "That is $\\sin\\phi$, the sine of the angle between the axis and the plane. The angle with the projection **is** $\\phi$, so you need its cosine." },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Course complete",
      content:
        "You can now place any point, line and plane in space and measure every angle and distance between them. Look back at how little you needed: the coordinate box (Chapter 0), the direction of a line (Chapter 1), its general point (Chapter 2), the common normal $\\vec b_1 \\times \\vec b_2$ (Chapter 3), the normal of a plane and the signed value $P(x_1, y_1, z_1)$ (Chapter 4), and the dot product of a direction with a normal (Chapter 5). When a JEE question looks new, ask which of these objects it is really about.",
    },
  ]),
};

export const tdgChapter5Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lessonMastery,
];
