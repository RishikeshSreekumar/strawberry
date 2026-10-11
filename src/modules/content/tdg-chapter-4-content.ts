import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Three-Dimensional Geometry Chapter 4 — Planes. A plane is a point plus a
 * normal: the point-normal and general forms, the normal form (distance
 * from the origin, foot of the perpendicular from O), the plane through
 * three points and the coplanarity of four points, the intercept form
 * (tetrahedron volume, centroid loci), the family P₁ + λP₂ = 0 of planes
 * through a line, the angle between two planes, distances from a plane and
 * between parallel planes, the two sides of a plane and the bisector planes.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "a-plane-from-a-point-and-a-normal",
  title: "4.1 · A Plane from a Point and a Normal",
  position: 1,
  blocks: blocks([
    {
      type: "text",
      content:
        "Hold a sheet of card flat and push a pencil straight through it. The pencil does not lie in the card; it sticks out at right angles to it. Yet the pencil **fixes** how the card is tilted: once you know the pencil's direction and one point of the card, there is only one way to place the card.",
    },
    {
      type: "text",
      content:
        "That is the whole idea of this chapter. In Chapter 2 a line was a point plus a **direction** along it. A plane is a point plus a direction **perpendicular** to it, called a **normal**. Every equation of a plane in this chapter is that one fact written in a different way.",
    },
    { type: "heading", text: "The point-normal equation" },
    {
      type: "text",
      content:
        "Let the plane pass through $A$ with position vector $\\vec a$, and let $\\vec n$ be a normal. A point $P$ with position vector $\\vec r$ lies on the plane exactly when the arrow $\\overrightarrow{AP} = \\vec r - \\vec a$ lies **in** the plane, and every arrow in the plane is perpendicular to $\\vec n$. Perpendicular means the dot product is zero:",
    },
    {
      type: "math",
      latex: "(\\vec r - \\vec a)\\cdot\\vec n = 0 \\quad\\Longleftrightarrow\\quad \\vec r\\cdot\\vec n = \\vec a\\cdot\\vec n",
    },
    {
      type: "text",
      content:
        "Write $\\vec n = a\\hat i + b\\hat j + c\\hat k$, $\\vec a = (x_1, y_1, z_1)$ and $\\vec r = (x, y, z)$, and expand the dot product:",
    },
    {
      type: "math",
      latex: "a(x - x_1) + b(y - y_1) + c(z - z_1) = 0",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Plane through a point with a given normal",
      content:
        "The plane through $(x_1, y_1, z_1)$ with normal direction ratios $(a, b, c)$ is\n\n$$a(x - x_1) + b(y - y_1) + c(z - z_1) = 0,$$\n\nin vector form $(\\vec r - \\vec a)\\cdot\\vec n = 0$, or $\\vec r\\cdot\\vec n = d$ with $d = \\vec a\\cdot\\vec n$.",
    },
    {
      type: "interactive",
      config: {
        component: "tdg-space-viewer",
        mode: "plane",
        plane: [2, -1, 4, -16],
        p: [3, 1, 5],
        show: ["normal", "foot"],
        caption:
          "The plane $2x - y + 4z = 16$ with its normal $(2, -1, 4)$. Rotate the view until the plane is edge-on: the normal then points straight across the screen, at right angles to every line drawn in the plane. The dashed drop from $P$ runs parallel to the normal.",
      },
    },
    {
      type: "worked-example",
      id: "tdg4-1-we1",
      title: "Worked example 1: a point and a normal",
      problem: "Find the equation of the plane through $(1, -2, 3)$ with normal $2\\hat i - \\hat j + 4\\hat k$.",
      steps: [
        {
          text: "Substitute into the point-normal form with $(a, b, c) = (2, -1, 4)$.",
          latex: "2(x - 1) - (y + 2) + 4(z - 3) = 0",
        },
        { text: "Expand: $2x - 2 - y - 2 + 4z - 12 = 0$.", latex: "2x - y + 4z - 16 = 0" },
        { text: "Check with the given point. *Why this step:* a slipped sign in the constant is the most common error. $2 + 2 + 12 = 16$. ✓" },
      ],
      answer: "$2x - y + 4z = 16$, or $\\vec r\\cdot(2\\hat i - \\hat j + 4\\hat k) = 16$.",
    },
    { type: "heading", text: "The general equation and its normal" },
    {
      type: "text",
      content:
        "Expanding the point-normal form always gives $ax + by + cz + d = 0$ with $d = -(ax_1 + by_1 + cz_1)$. Conversely, any equation $ax + by + cz + d = 0$ with $a, b, c$ not all zero is a plane: pick any point $(x_1, y_1, z_1)$ that satisfies it, subtract, and you are back at $a(x - x_1) + b(y - y_1) + c(z - z_1) = 0$. So the coefficients of $x$, $y$ and $z$ **are** a normal. You read the normal off the equation without doing any work.",
    },
    {
      type: "table",
      headers: ["Equation", "Normal", "What the plane is"],
      rows: [
        ["$z = k$", "$(0, 0, 1)$", "parallel to the xy-plane, at height $k$"],
        ["$x = 0$", "$(1, 0, 0)$", "the yz-plane itself"],
        ["$ax + by + d = 0$", "$(a, b, 0)$", "parallel to the z-axis (no $z$ term)"],
        ["$by + cz + d = 0$", "$(0, b, c)$", "parallel to the x-axis (no $x$ term)"],
        ["$ax + by + cz = 0$", "$(a, b, c)$", "through the origin ($d = 0$)"],
      ],
    },
    {
      type: "text",
      content:
        "Why does a missing variable mean \"parallel to that axis\"? If there is no $z$ term, the normal $(a, b, 0)$ is perpendicular to $\\hat k$, so the direction $\\hat k$ lies along the plane: from any point of the plane you can move up or down freely and stay on it. In the same way, two planes with the same normal are **parallel**: $ax + by + cz + d = 0$ for different values of $d$ is a stack of parallel planes.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the point $(a, b, c)$ lies on the plane\"",
      content:
        "In $ax + by + cz + d = 0$ the triple $(a, b, c)$ is a **direction**, not a point. It sticks out of the plane at right angles. For $2x + y - 2z = 3$ the point $(2, 1, -2)$ gives $4 + 1 + 4 = 9 \\ne 3$, so it is not on the plane; what is true is that the arrow $2\\hat i + \\hat j - 2\\hat k$ is perpendicular to every line in it.",
    },
    {
      type: "worked-example",
      id: "tdg4-1-we2",
      title: "Worked example 2: a parallel plane through a point",
      problem: "Find the plane through $(2, 1, -1)$ parallel to $3x - 2y + z = 7$.",
      steps: [
        { text: "Parallel planes share a normal, so the new plane is $3x - 2y + z = k$ for some constant $k$." },
        { text: "Make it pass through $(2, 1, -1)$. *Why this step:* the point fixes the constant, nothing else is left to choose.", latex: "k = 3(2) - 2(1) + (-1) = 3" },
      ],
      answer: "$3x - 2y + z = 3$.",
    },
    {
      type: "worked-example",
      id: "tdg4-1-we3",
      title: "Worked example 3: the perpendicular bisector plane",
      problem: "Find the locus of points equidistant from $A(1, 2, 3)$ and $B(3, -2, 1)$.",
      steps: [
        { text: "Picture: the points equidistant from $A$ and $B$ form the plane through the midpoint $M$ of $AB$ that is perpendicular to $AB$. So the normal is $\\overrightarrow{AB}$ and the point is $M$." },
        { text: "$M = (2, 0, 2)$ and $\\overrightarrow{AB} = (2, -4, -2)$, which is parallel to $(1, -2, -1)$.", latex: "(x - 2) - 2(y - 0) - (z - 2) = 0 \\;\\Longrightarrow\\; x - 2y - z = 0" },
        {
          text: "Check by algebra. *Why this step:* the locus method of Chapter 0 must give the same plane. Expand $PA^2 = PB^2$; the squares cancel:",
          latex: "-2x - 4y - 6z + 14 = -6x + 4y - 2z + 14 \\;\\Longrightarrow\\; 4x - 8y - 4z = 0",
        },
      ],
      answer: "The plane $x - 2y - z = 0$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "tdg4-1-q1",
      variant: "practice",
      question: "The plane through $(1, 2, -1)$ with normal $3\\hat i - \\hat j + 2\\hat k$ is $3x - y + 2z + d = 0$. Find $d$.",
      answer: 1,
      hint: "Substitute the point: $3(1) - 2 + 2(-1) + d = 0$.",
      solution: "$3 - 2 - 2 + d = 0$, so $d = 1$. The plane is $3x - y + 2z + 1 = 0$.",
      commonMistakes: [{ answer: -1, feedback: "Check the sign: $3 - 2 - 2 = -1$, so $d = +1$ makes the sum zero." }],
    },
    {
      type: "quiz",
      id: "tdg4-1-q2",
      variant: "practice",
      question: "A normal to the plane $2x - 3z = 5$ has direction ratios",
      options: [
        { text: "$(2, 0, -3)$", correct: true, feedback: "The coefficients of $x$, $y$, $z$ in order; there is no $y$ term, so the middle entry is 0." },
        { text: "$(2, -3, 0)$", feedback: "The $-3$ multiplies $z$, not $y$." },
        { text: "$(2, -3, 5)$", feedback: "The constant 5 is not part of the normal; it only fixes which of the parallel planes this is." },
        { text: "$(0, 2, -3)$", feedback: "The first entry belongs to $x$, whose coefficient is 2." },
      ],
      hint: "Read the coefficients of $x$, $y$ and $z$; a missing variable has coefficient 0.",
    },
    {
      type: "quiz",
      id: "tdg4-1-q3",
      variant: "practice",
      multiple: true,
      question: "Which planes are parallel to the z-axis (or contain it)? Select all that apply.",
      options: [
        { text: "$2x + 3y = 6$", correct: true, feedback: "No $z$ term: the normal $(2, 3, 0)$ is perpendicular to $\\hat k$." },
        { text: "$x - y = 0$", correct: true, feedback: "Normal $(1, -1, 0)$; this plane actually contains the z-axis, since it also passes through the origin." },
        { text: "$y = -2$", correct: true, feedback: "Normal $(0, 1, 0)$ is perpendicular to $\\hat k$. The plane is parallel to the xz-plane, which contains the z-axis direction." },
        { text: "$z = 4$", feedback: "Its normal is $\\hat k$ itself, so this plane is perpendicular to the z-axis." },
        { text: "$x + z = 1$", feedback: "Normal $(1, 0, 1)$ has $\\hat k$-component 1, so $\\vec n\\cdot\\hat k \\ne 0$." },
      ],
      hint: "A plane is parallel to the z-axis exactly when its normal is perpendicular to $\\hat k$, i.e. the coefficient of $z$ is 0.",
    },
    {
      type: "numeric",
      id: "tdg4-1-q4",
      variant: "practice",
      question: "The plane through $(2, -1, 3)$ parallel to $x - 2y + 2z = 5$ is $x - 2y + 2z = k$. Find $k$.",
      answer: 10,
      hint: "Keep the normal $(1, -2, 2)$ and substitute the point.",
      solution: "$k = 2 - 2(-1) + 2(3) = 2 + 2 + 6 = 10$.",
      commonMistakes: [
        { answer: 5, feedback: "5 belongs to the given plane. The new plane is parallel to it, through a different point." },
        { answer: 6, feedback: "$-2y$ at $y = -1$ is $+2$, not $-2$." },
      ],
    },
    {
      type: "quiz",
      id: "tdg4-1-q5",
      variant: "concept",
      question: "For the plane $2x + y - 2z = 3$, which statement is true?",
      options: [
        { text: "The vector $2\\hat i + \\hat j - 2\\hat k$ is perpendicular to the plane", correct: true, feedback: "The coefficients form a normal." },
        { text: "The point $(2, 1, -2)$ lies on the plane", feedback: "$4 + 1 + 4 = 9 \\ne 3$. The coefficients are a direction, not a point of the plane." },
        { text: "The plane is parallel to the vector $2\\hat i + \\hat j - 2\\hat k$", feedback: "That vector is the normal: perpendicular to the plane, not along it." },
        { text: "The plane passes through the origin", feedback: "At the origin the left side is 0, not 3." },
      ],
      hint: "What does the triple of coefficients $(a, b, c)$ mean geometrically?",
    },
    {
      type: "numeric",
      id: "tdg4-1-q6",
      variant: "practice",
      question:
        "The plane of points equidistant from $A(2, 3, -1)$ and $B(4, -1, 3)$ is written $x - 2y + 2z = r$. Find $r$.",
      answer: 3,
      hint: "Normal $\\overrightarrow{AB} = (2, -4, 4) \\parallel (1, -2, 2)$; the plane passes through the midpoint of $AB$.",
      solution: "Midpoint $M = (3, 1, 1)$. Then $r = 3 - 2(1) + 2(1) = 3$. Check with $PA^2 = PB^2$ at a point of the plane such as $(3, 0, 0)$: $PA^2 = 1 + 9 + 1 = 11$ and $PB^2 = 1 + 1 + 9 = 11$.",
      commonMistakes: [
        { answer: -3, feedback: "Recompute at the midpoint $(3, 1, 1)$: $3 - 2 + 2 = 3$." },
        { answer: 0, feedback: "The plane does not pass through the origin: it passes through the midpoint of $AB$." },
      ],
    },
    {
      type: "numeric",
      id: "tdg4-1-q7",
      variant: "practice",
      question:
        "The point $(1, k, 2)$ lies on the plane through $(0, 1, 1)$ with normal $2\\hat i + 3\\hat j - \\hat k$. Find $k$. (A fraction such as 2/3 is fine.)",
      answer: 0.6667,
      tolerance: 0.005,
      hint: "First write the plane: $2x + 3(y - 1) - (z - 1) = 0$.",
      solution: "The plane is $2x + 3y - z - 2 = 0$. At $(1, k, 2)$: $2 + 3k - 2 - 2 = 0$, so $3k = 2$ and $k = \\frac23$.",
      commonMistakes: [{ answer: 2, feedback: "You found $3k$; divide by 3." }],
    },
    {
      type: "quiz",
      id: "tdg4-1-q8",
      variant: "concept",
      multiple: true,
      question: "Which equations describe a single plane through the origin? Select all that apply.",
      options: [
        { text: "$3x - y + z = 0$", correct: true, feedback: "Linear with no constant term." },
        { text: "$x = 0$", correct: true, feedback: "The yz-plane." },
        { text: "$2x = 3y$", correct: true, feedback: "$2x - 3y = 0$: a plane through the z-axis." },
        { text: "$x + y + z = 1$", feedback: "The origin gives $0 \\ne 1$." },
        { text: "$xy = 0$", feedback: "Not linear: it is the pair of planes $x = 0$ and $y = 0$, not one plane." },
      ],
      hint: "A plane is a **linear** equation; it passes through the origin when the constant term is 0.",
    },
    {
      type: "numeric",
      id: "tdg4-1-q9",
      variant: "practice",
      question:
        "JEE Main. A plane through $(2, 1, -1)$ is perpendicular to the line joining $(1, 0, 2)$ and $(3, 2, 1)$. Find the x-coordinate of the point where it meets the x-axis.",
      answer: 3.5,
      tolerance: 0.001,
      hint: "The joining vector $(2, 2, -1)$ is the normal.",
      solution: "$2(x - 2) + 2(y - 1) - (z + 1) = 0$, i.e. $2x + 2y - z = 7$. On the x-axis $y = z = 0$, so $x = \\frac72 = 3.5$.",
      commonMistakes: [
        { answer: 7, feedback: "7 is the constant; on the x-axis $2x = 7$." },
        { answer: 2, feedback: "The plane passes through $(2, 1, -1)$, but that point is not on the x-axis." },
      ],
    },
    {
      type: "quiz",
      id: "tdg4-1-q10",
      variant: "practice",
      question:
        "The plane through $(1, -1, 2)$ perpendicular to both the planes $2x + y - 2z = 5$ and $3x - 6y - 2z = 7$ is",
      options: [
        { text: "$14x + 2y + 15z = 42$", correct: true, feedback: "Its normal is perpendicular to both given normals: $(2, 1, -2)\\times(3, -6, -2) = (-14, -2, -15)$." },
        { text: "$14x - 2y + 15z = 46$", feedback: "It passes through the point, but its normal $(14, -2, 15)$ has dot product $28 - 2 - 30 = -4$ with $(2, 1, -2)$, not 0." },
        { text: "$2x + y - 2z = -3$", feedback: "This is parallel to the first plane, not perpendicular to it." },
        { text: "$14x + 2y + 15z = 30$", feedback: "Right normal, but the point gives $14 - 2 + 30 = 42$, not 30." },
      ],
      hint: "A plane perpendicular to two planes has its normal perpendicular to both of their normals: use the cross product.",
    },
    {
      type: "numeric",
      id: "tdg4-1-q11",
      variant: "practice",
      question:
        "JEE Main. The foot of the perpendicular from the origin to a plane is $(2, -1, 2)$. Find the x-coordinate of the point where the plane meets the x-axis.",
      answer: 4.5,
      tolerance: 0.001,
      hint: "The arrow from $O$ to the foot is perpendicular to the plane, and the foot lies on the plane.",
      solution: "Normal $(2, -1, 2)$ through $(2, -1, 2)$: $2x - y + 2z = 4 + 1 + 4 = 9$. On the x-axis, $x = \\frac92 = 4.5$.",
      commonMistakes: [
        { answer: 2, feedback: "The foot has x-coordinate 2, but it is not on the x-axis." },
        { answer: 9, feedback: "$2x = 9$ on the x-axis: divide by 2." },
      ],
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "the-normal-form-of-a-plane",
  title: "4.2 · The Normal Form",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "Stand at the origin and look at a plane that does not pass through you. Of all the points on the plane, one is nearest: the **foot of the perpendicular** $N$ from $O$. The segment $ON$ is perpendicular to the plane, so it points along the normal, and its length $p$ is the distance of the plane from the origin.",
    },
    {
      type: "text",
      content:
        "Knowing $p$ and the unit normal $\\hat n$ (pointing from $O$ towards the plane) fixes the plane completely. This lesson writes the plane in terms of exactly those two things, the **normal form**, and shows how to convert any general equation into it.",
    },
    { type: "heading", text: "Deriving the normal form" },
    {
      type: "text",
      content:
        "The foot is $N = p\\hat n$. Take any point $P$ on the plane. The arrow $\\overrightarrow{NP}$ lies in the plane, so it is perpendicular to $\\hat n$, and therefore the shadow of $\\overrightarrow{OP} = \\vec r$ on $\\hat n$ is just the shadow of $\\overrightarrow{ON}$, which is $p$:",
    },
    {
      type: "math",
      latex: "\\vec r\\cdot\\hat n = (\\overrightarrow{ON} + \\overrightarrow{NP})\\cdot\\hat n = p + 0 = p",
    },
    {
      type: "text",
      content:
        "With $\\hat n = l\\hat i + m\\hat j + n\\hat k$, where $l, m, n$ are the direction cosines of the normal, this reads $lx + my + nz = p$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Normal form of a plane",
      content:
        "$$\\vec r\\cdot\\hat n = p \\qquad\\text{or}\\qquad lx + my + nz = p,$$\n\nwhere $\\hat n = (l, m, n)$ is the **unit** normal pointing from the origin towards the plane and $p \\ge 0$ is the distance of the plane from the origin. The foot of the perpendicular from $O$ is $p\\hat n = (pl, pm, pn)$.",
    },
    { type: "heading", text: "Converting from the general form" },
    {
      type: "text",
      content:
        "Start from $ax + by + cz + d = 0$. Move the constant across: $ax + by + cz = -d$. Now divide by $\\sqrt{a^2 + b^2 + c^2}$ so that the coefficients become direction cosines, and choose the **sign** of the square root so that the right side comes out non-negative:",
    },
    {
      type: "math",
      latex:
        "\\frac{a}{\\pm\\sqrt{a^2 + b^2 + c^2}}\\,x + \\frac{b}{\\pm\\sqrt{a^2 + b^2 + c^2}}\\,y + \\frac{c}{\\pm\\sqrt{a^2 + b^2 + c^2}}\\,z = \\frac{-d}{\\pm\\sqrt{a^2 + b^2 + c^2}} \\ge 0",
    },
    {
      type: "text",
      content:
        "Read off $p = \\frac{\\lvert d\\rvert}{\\sqrt{a^2 + b^2 + c^2}}$, the distance from the origin, and the foot $p\\hat n$, which simplifies to $\\frac{-d}{a^2 + b^2 + c^2}(a, b, c)$ whatever the signs.",
    },
    {
      type: "interactive",
      config: {
        component: "tdg-space-viewer",
        mode: "plane",
        plane: [1, 2, 2, -9],
        show: ["normal"],
        sliders: [{ name: "d", min: -12, max: 12, step: 1, initial: -9 }],
        caption:
          "The plane $x + 2y + 2z + d = 0$, starting at $d = -9$ (distance 3 from $O$, foot $(1, 2, 2)$). Slide $d$: the plane moves parallel to itself, the foot slides along the normal line through $O$, and when $d$ changes sign the plane passes through the origin and the unit normal of the normal form flips to the other side.",
      },
    },
    {
      type: "worked-example",
      id: "tdg4-2-we1",
      title: "Worked example 1: general form to normal form",
      problem: "Write $2x - 3y + 6z + 14 = 0$ in normal form. Find its distance from the origin and the direction cosines of its normal.",
      steps: [
        { text: "Move the constant: $2x - 3y + 6z = -14$. The length of the normal is $\\sqrt{4 + 9 + 36} = 7$." },
        {
          text: "The right side is negative, so divide by $-7$. *Why this step:* in the normal form $p$ is a distance and must be $\\ge 0$.",
          latex: "-\\frac27 x + \\frac37 y - \\frac67 z = 2",
        },
      ],
      answer: "$p = 2$; the normal has direction cosines $\\left(-\\frac27, \\frac37, -\\frac67\\right)$.",
    },
    {
      type: "worked-example",
      id: "tdg4-2-we2",
      title: "Worked example 2: the foot of the perpendicular from O",
      problem: "Find the foot of the perpendicular from the origin to $x + 2y + 2z = 9$.",
      steps: [
        { text: "$\\lvert\\vec n\\rvert = 3$, so the normal form is $\\frac13 x + \\frac23 y + \\frac23 z = 3$: $p = 3$ and $\\hat n = \\frac13(1, 2, 2)$." },
        { text: "The foot is $p\\hat n = 3 \\cdot \\frac13(1, 2, 2) = (1, 2, 2)$. Check: $1 + 4 + 4 = 9$. ✓" },
      ],
      answer: "$(1, 2, 2)$.",
    },
    {
      type: "worked-example",
      id: "tdg4-2-we3",
      title: "Worked example 3: building a plane from p and a normal",
      problem: "Find the plane at distance 6 from the origin whose normal (pointing away from the origin) is along $2\\hat i - \\hat j + 2\\hat k$.",
      steps: [
        { text: "Unit normal: $\\hat n = \\frac13(2, -1, 2)$." },
        { text: "Normal form $\\vec r\\cdot\\hat n = 6$; multiply through by 3.", latex: "2x - y + 2z = 18" },
      ],
      answer: "$2x - y + 2z = 18$, i.e. $\\vec r\\cdot(2\\hat i - \\hat j + 2\\hat k) = 18$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"just divide by the length\"",
      content:
        "Dividing $3x + 4y - 12z + 26 = 0$ by 13 gives $\\frac{3}{13}x + \\frac{4}{13}y - \\frac{12}{13}z = -2$, which is **not** the normal form: $p$ would be $-2$. A distance cannot be negative, so divide by $-13$ instead, which flips the unit normal to point from the origin towards the plane: $-\\frac{3}{13}x - \\frac{4}{13}y + \\frac{12}{13}z = 2$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "tdg4-2-q1",
      variant: "practice",
      question: "Find the distance of the plane $6x - 3y + 2z - 14 = 0$ from the origin.",
      answer: 2,
      hint: "$p = \\frac{\\lvert d\\rvert}{\\sqrt{a^2 + b^2 + c^2}}$.",
      solution: "$\\sqrt{36 + 9 + 4} = 7$, so $p = \\frac{14}{7} = 2$.",
      commonMistakes: [{ answer: 14, feedback: "Divide by the length of the normal, $\\sqrt{49} = 7$." }],
    },
    {
      type: "quiz",
      id: "tdg4-2-q2",
      variant: "practice",
      question: "The normal form of $3x + 4y - 12z + 26 = 0$ is",
      options: [
        { text: "$-\\frac{3}{13}x - \\frac{4}{13}y + \\frac{12}{13}z = 2$", correct: true, feedback: "Move 26 across, then divide by $-13$ so the right side is positive." },
        { text: "$\\frac{3}{13}x + \\frac{4}{13}y - \\frac{12}{13}z = 2$", feedback: "This is the plane $3x + 4y - 12z = 26$, a different plane. From $3x + 4y - 12z = -26$, dividing by $+13$ gives $-2$ on the right." },
        { text: "$\\frac{3}{13}x + \\frac{4}{13}y - \\frac{12}{13}z = -2$", feedback: "Correct plane, but $p = -2$ is not allowed: divide by $-13$ instead." },
        { text: "$3x + 4y - 12z = -26$", feedback: "The coefficients are not direction cosines: $3^2 + 4^2 + 12^2 \\ne 1$." },
      ],
      hint: "Constant to the right, then divide by $\\pm 13$ with the sign that makes $p \\ge 0$.",
    },
    {
      type: "numeric",
      id: "tdg4-2-q3",
      variant: "practice",
      question: "The foot of the perpendicular from the origin to $2x - y + 2z = 18$ is $(\\alpha, \\beta, \\gamma)$. Find $\\alpha + \\beta + \\gamma$.",
      answer: 6,
      hint: "Foot $= p\\hat n$ with $p = 6$ and $\\hat n = \\frac13(2, -1, 2)$.",
      solution: "$p = \\frac{18}{3} = 6$, foot $= 6 \\cdot \\frac13(2, -1, 2) = (4, -2, 4)$. Check: $8 + 2 + 8 = 18$. The sum is 6.",
      commonMistakes: [
        { answer: 1, feedback: "That is the sum for $\\hat n$ alone; the foot is $p\\hat n$ with $p = 6$." },
        { answer: 18, feedback: "The foot lies on the plane but its coordinates are $(4, -2, 4)$." },
      ],
    },
    {
      type: "numeric",
      id: "tdg4-2-q4",
      variant: "practice",
      question:
        "In the normal form $lx + my + nz = p$ of $x - 2y + 2z + 6 = 0$, find $n$, the coefficient of $z$. (A fraction such as -2/3 is fine.)",
      answer: -0.6667,
      tolerance: 0.005,
      hint: "$x - 2y + 2z = -6$; which sign of $\\pm 3$ makes the right side positive?",
      solution: "Divide $x - 2y + 2z = -6$ by $-3$: $-\\frac13 x + \\frac23 y - \\frac23 z = 2$. So $n = -\\frac23$.",
      commonMistakes: [{ answer: 0.6667, tolerance: 0.005, feedback: "With $+3$ the right side is $-2$, not allowed. Divide by $-3$." }],
    },
    {
      type: "quiz",
      id: "tdg4-2-q5",
      variant: "practice",
      multiple: true,
      question: "For the plane $\\vec r\\cdot(6\\hat i - 2\\hat j + 3\\hat k) = -7$, which statements are true? Select all that apply.",
      options: [
        { text: "Its distance from the origin is 1", correct: true, feedback: "$\\frac{\\lvert -7\\rvert}{\\sqrt{36 + 4 + 9}} = \\frac77 = 1$." },
        { text: "Its normal form is $\\vec r\\cdot\\frac{-6\\hat i + 2\\hat j - 3\\hat k}{7} = 1$", correct: true, feedback: "Divide by $-7$ to make the right side positive." },
        { text: "The foot of the perpendicular from O is $\\left(-\\frac67, \\frac27, -\\frac37\\right)$", correct: true, feedback: "$p\\hat n$ with $p = 1$." },
        { text: "Its distance from the origin is 7", feedback: "7 is the length of the normal. Divide 7 by 7." },
        { text: "It passes through the origin", feedback: "At $\\vec r = \\vec 0$ the left side is $0 \\ne -7$." },
      ],
      hint: "$\\lvert\\vec n\\rvert = 7$. Divide by $-7$.",
    },
    {
      type: "numeric",
      id: "tdg4-2-q6",
      variant: "practice",
      question: "Find the distance from the origin of the plane through $(2, 3, 1)$ with normal $\\hat i + \\hat j + \\hat k$ (to two decimal places).",
      answer: 3.4641,
      tolerance: 0.01,
      hint: "The plane is $x + y + z = 6$.",
      solution: "$x + y + z = 2 + 3 + 1 = 6$, so $p = \\frac{6}{\\sqrt3} = 2\\sqrt3 \\approx 3.46$.",
      commonMistakes: [{ answer: 6, feedback: "Divide by $\\lvert\\vec n\\rvert = \\sqrt3$." }],
    },
    {
      type: "quiz",
      id: "tdg4-2-q7",
      variant: "concept",
      question: "In the normal form $lx + my + nz = p$, which statement is always true?",
      options: [
        { text: "$p \\ge 0$ and $p$ is the distance of the plane from the origin", correct: true, feedback: "That is how the form is built: $p = \\lvert ON\\rvert$." },
        { text: "$l, m, n$ may be any direction ratios of the normal", feedback: "They must be direction cosines: $l^2 + m^2 + n^2 = 1$." },
        { text: "$p$ is negative when the plane is below the origin", feedback: "The sign is absorbed into $(l, m, n)$, which points from O to the plane." },
        { text: "$l + m + n = 1$", feedback: "It is the squares that add to 1." },
      ],
      hint: "Recall the two choices made when converting: divide by the length, and pick the sign.",
    },
    {
      type: "numeric",
      id: "tdg4-2-q8",
      variant: "practice",
      question:
        "Two planes are at distance 3 from the origin and have normals with direction ratios $(2, -2, 1)$. Find the product of their z-intercepts.",
      answer: -81,
      hint: "$\\frac{\\lvert k\\rvert}{3} = 3$ for $2x - 2y + z = k$.",
      solution: "$\\lvert k\\rvert = 9$, so the planes are $2x - 2y + z = 9$ and $2x - 2y + z = -9$, with z-intercepts $9$ and $-9$. The product is $-81$.",
      commonMistakes: [
        { answer: 81, feedback: "The two planes lie on opposite sides of the origin: their intercepts have opposite signs." },
        { answer: -9, feedback: "Each z-intercept is $\\pm 9$, so their product is $-81$." },
      ],
    },
    {
      type: "numeric",
      id: "tdg4-2-q9",
      variant: "practice",
      question:
        "JEE Main. A plane is at distance $2\\sqrt3$ from the origin, and its normal (away from the origin) makes equal acute angles with the three axes. Find the x-intercept of the plane.",
      answer: 6,
      hint: "Equal acute angles give $l = m = n = \\frac{1}{\\sqrt3}$.",
      solution: "$\\frac{x + y + z}{\\sqrt3} = 2\\sqrt3$, so $x + y + z = 6$ and the x-intercept is 6.",
      commonMistakes: [{ answer: 2, feedback: "Multiply both sides by $\\sqrt3$: $2\\sqrt3 \\cdot \\sqrt3 = 6$." }],
    },
    {
      type: "quiz",
      id: "tdg4-2-q10",
      variant: "practice",
      question: "The normal form of the plane $z = -5$ is",
      options: [
        { text: "$-z = 5$", correct: true, feedback: "Unit normal $(0, 0, -1)$ points from O down to the plane, and $p = 5$." },
        { text: "$z = -5$", feedback: "Here $p = -5 < 0$, which is not allowed." },
        { text: "$z = 5$", feedback: "That is a different plane, above the origin." },
        { text: "$x + y + z = -5$", feedback: "Not even the same plane." },
      ],
      hint: "Make the right side non-negative.",
    },
    {
      type: "numeric",
      id: "tdg4-2-q11",
      variant: "practice",
      question:
        "Find the sum of the distances of the parallel planes $2x - y + 2z = 6$ and $2x - y + 2z = -12$ from the origin.",
      answer: 6,
      hint: "Each distance is $\\frac{\\lvert\\text{constant}\\rvert}{3}$.",
      solution: "Distances $\\frac63 = 2$ and $\\frac{12}{3} = 4$, sum 6. The constants have opposite signs, so the origin lies between the planes and 6 is also the distance between them.",
      commonMistakes: [{ answer: 2, feedback: "$\\lvert 2 - 4\\rvert$ would apply if both planes were on the same side. Add the two distances." }],
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "the-plane-through-three-points",
  title: "4.3 · The Plane Through Three Points",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "A three-legged stool never wobbles, however uneven the floor: three points that are not in a line always have exactly one plane through them. A four-legged table can wobble, because four points need not lie in one plane.",
    },
    {
      type: "text",
      content:
        "To write that plane we need a point (any of the three will do) and a normal. The normal must be perpendicular to every arrow in the plane, in particular to $\\overrightarrow{AB}$ and $\\overrightarrow{AC}$. Vector algebra already has the tool that makes a vector perpendicular to two given ones: the cross product.",
    },
    { type: "heading", text: "Normal from a cross product" },
    {
      type: "math",
      latex: "\\vec n = \\overrightarrow{AB}\\times\\overrightarrow{AC}, \\qquad (\\vec r - \\vec a)\\cdot\\vec n = 0",
    },
    {
      type: "text",
      content:
        "Writing out $(\\vec r - \\vec a)\\cdot(\\overrightarrow{AB}\\times\\overrightarrow{AC})$ gives a scalar triple product, and a scalar triple product is a $3 \\times 3$ determinant. So the same plane can be written in one line:",
    },
    {
      type: "math",
      latex:
        "\\begin{vmatrix} x - x_1 & y - y_1 & z - z_1 \\\\ x_2 - x_1 & y_2 - y_1 & z_2 - z_1 \\\\ x_3 - x_1 & y_3 - y_1 & z_3 - z_1 \\end{vmatrix} = 0",
    },
    {
      type: "text",
      content:
        "Read it as volume: $P$ is on the plane exactly when the box built on $\\overrightarrow{AP}$, $\\overrightarrow{AB}$ and $\\overrightarrow{AC}$ is flat. The same idea answers \"are four points coplanar?\": $A, B, C, D$ are coplanar exactly when $[\\overrightarrow{AB}\\;\\overrightarrow{AC}\\;\\overrightarrow{AD}] = 0$.",
    },
    {
      type: "interactive",
      config: {
        component: "tdg-space-viewer",
        mode: "plane",
        plane: [2, 3, -3, -5],
        p: [4, 0, 1],
        show: ["normal"],
        caption:
          "The plane $2x + 3y - 3z = 5$ through $A(1, 1, 0)$, $B(1, 2, 1)$ and $C(-2, 2, -1)$ from Worked example 1. Its normal $(2, 3, -3)$ is parallel to $\\overrightarrow{AB}\\times\\overrightarrow{AC}$. The marked point $P(4, 0, 1)$ is on the plane too, so its distance readout is 0.",
      },
    },
    {
      type: "worked-example",
      id: "tdg4-3-we1",
      title: "Worked example 1: three points, one plane",
      problem: "Find the plane through $A(1, 1, 0)$, $B(1, 2, 1)$ and $C(-2, 2, -1)$.",
      steps: [
        { text: "Two arrows in the plane: $\\overrightarrow{AB} = (0, 1, 1)$ and $\\overrightarrow{AC} = (-3, 1, -1)$." },
        {
          text: "Their cross product is a normal.",
          latex: "\\vec n = \\begin{vmatrix} \\hat i & \\hat j & \\hat k \\\\ 0 & 1 & 1 \\\\ -3 & 1 & -1 \\end{vmatrix} = (-1 - 1)\\hat i - (0 + 3)\\hat j + (0 + 3)\\hat k = (-2, -3, 3)",
        },
        { text: "Through $A$: $-2(x - 1) - 3(y - 1) + 3z = 0$, i.e. $2x + 3y - 3z = 5$." },
        { text: "Check all three points. *Why this step:* one check per point catches a slip in the cross product. $A$: $2 + 3 = 5$; $B$: $2 + 6 - 3 = 5$; $C$: $-4 + 6 + 3 = 5$. ✓" },
      ],
      answer: "$2x + 3y - 3z = 5$.",
    },
    {
      type: "worked-example",
      id: "tdg4-3-we2",
      title: "Worked example 2: are four points coplanar?",
      problem: "Show that $A(0, -1, -1)$, $B(4, 5, 1)$, $C(3, 9, 4)$ and $D(-4, 4, 4)$ are coplanar.",
      steps: [
        { text: "Arrows from $A$: $\\overrightarrow{AB} = (4, 6, 2)$, $\\overrightarrow{AC} = (3, 10, 5)$, $\\overrightarrow{AD} = (-4, 5, 5)$." },
        {
          text: "Compute their triple product. *Why this step:* zero volume means the three arrows, and so the four points, lie in one plane.",
          latex: "\\begin{vmatrix} 4 & 6 & 2 \\\\ 3 & 10 & 5 \\\\ -4 & 5 & 5 \\end{vmatrix} = 4(50 - 25) - 6(15 + 20) + 2(15 + 40) = 100 - 210 + 110 = 0",
        },
      ],
      answer: "The determinant is 0, so the four points are coplanar.",
    },
    {
      type: "worked-example",
      id: "tdg4-3-we3",
      title: "Worked example 3: three points on the axes",
      problem: "Find the plane through $(1, 0, 0)$, $(0, 2, 0)$ and $(0, 0, 3)$.",
      steps: [
        { text: "From $A(1, 0, 0)$: $\\overrightarrow{AB} = (-1, 2, 0)$, $\\overrightarrow{AC} = (-1, 0, 3)$, and $\\overrightarrow{AB}\\times\\overrightarrow{AC} = (6, 3, 2)$." },
        { text: "Through $A$: $6(x - 1) + 3y + 2z = 0$, i.e. $6x + 3y + 2z = 6$." },
        { text: "Divide by 6: $\\frac x1 + \\frac y2 + \\frac z3 = 1$. The numbers under $x$, $y$, $z$ are exactly where the plane cuts the axes; Lesson 4.4 turns this into a form of its own." },
      ],
      answer: "$6x + 3y + 2z = 6$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"any three points fix a plane\"",
      content:
        "Only three **non-collinear** points do. If $A$, $B$, $C$ are on one line, then $\\overrightarrow{AB}\\times\\overrightarrow{AC} = \\vec 0$, there is no normal to use, and infinitely many planes (a whole book of pages hinged on that line) pass through all three. Always glance at the cross product: if it is $\\vec 0$, stop.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "tdg4-3-q1",
      variant: "practice",
      question: "The plane through $A(2, 1, 0)$, $B(3, -2, -2)$ and $C(3, 1, 7)$ is $7x + 3y + pz = q$. Find $q$.",
      answer: 17,
      hint: "$\\overrightarrow{AB}\\times\\overrightarrow{AC}$ with $\\overrightarrow{AB} = (1, -3, -2)$ and $\\overrightarrow{AC} = (1, 0, 7)$.",
      solution: "$\\overrightarrow{AB}\\times\\overrightarrow{AC} = (-21, -9, 3) = -3(7, 3, -1)$. Through $A$: $7x + 3y - z = 14 + 3 = 17$. Check $B$: $21 - 6 + 2 = 17$; $C$: $21 + 3 - 7 = 17$.",
      commonMistakes: [{ answer: -17, feedback: "With the normal $(7, 3, -1)$, the constant at $A(2, 1, 0)$ is $14 + 3 = +17$." }],
    },
    {
      type: "quiz",
      id: "tdg4-3-q2",
      variant: "practice",
      question: "Which point lies on the plane through $(1, 1, 0)$, $(1, 2, 1)$ and $(-2, 2, -1)$?",
      options: [
        { text: "$(4, 0, 1)$", correct: true, feedback: "The plane is $2x + 3y - 3z = 5$, and $8 + 0 - 3 = 5$." },
        { text: "$(0, 0, 0)$", feedback: "$0 \\ne 5$." },
        { text: "$(1, 1, 1)$", feedback: "$2 + 3 - 3 = 2 \\ne 5$." },
        { text: "$(2, 1, 1)$", feedback: "$4 + 3 - 3 = 4 \\ne 5$." },
      ],
      hint: "Find the plane first (Worked example 1), then substitute each point.",
    },
    {
      type: "numeric",
      id: "tdg4-3-q3",
      variant: "practice",
      question: "The points $O(0, 0, 0)$, $A(1, 2, 1)$, $B(2, 1, 3)$ and $C(k, 1, 1)$ are coplanar. Find $k$.",
      answer: 0.8,
      tolerance: 0.001,
      hint: "With $O$ as the base point, the triple product of $\\vec a$, $\\vec b$, $\\vec c$ must vanish.",
      solution: "$\\begin{vmatrix} 1 & 2 & 1 \\\\ 2 & 1 & 3 \\\\ k & 1 & 1 \\end{vmatrix} = 1(1 - 3) - 2(2 - 3k) + 1(2 - k) = 5k - 4 = 0$, so $k = \\frac45 = 0.8$.",
      commonMistakes: [{ answer: -0.8, tolerance: 0.001, feedback: "The middle cofactor is $-2(2 - 3k) = -4 + 6k$: watch the sign of the $\\hat j$ term." }],
    },
    {
      type: "quiz",
      id: "tdg4-3-q4",
      variant: "concept",
      multiple: true,
      question: "For which sets of three points is there **no** unique plane through them? Select all that apply.",
      options: [
        { text: "$(1, 2, 3)$, $(2, 4, 6)$, $(3, 6, 9)$", correct: true, feedback: "All three are multiples of $(1, 2, 3)$: they lie on one line through the origin." },
        { text: "$(1, 0, 2)$, $(3, 1, 5)$, $(5, 2, 8)$", correct: true, feedback: "The steps $(2, 1, 3)$ and $(4, 2, 6)$ are parallel: collinear." },
        { text: "$(2, 2, 2)$, $(2, 2, 2)$, $(1, 0, 1)$", correct: true, feedback: "Two of the points coincide, so there are really only two points." },
        { text: "$(0, 0, 0)$, $(1, 1, 1)$, $(2, 2, 3)$", feedback: "$(1, 1, 1)\\times(2, 2, 3) = (1, -1, 0) \\ne \\vec 0$: one plane." },
        { text: "$(1, 1, 1)$, $(2, 3, 4)$, $(3, 5, 6)$", feedback: "The steps $(1, 2, 3)$ and $(2, 4, 5)$ are not parallel." },
      ],
      hint: "There is no unique plane exactly when $\\overrightarrow{AB}\\times\\overrightarrow{AC} = \\vec 0$.",
    },
    {
      type: "numeric",
      id: "tdg4-3-q5",
      variant: "practice",
      question:
        "A plane passes through $(2, 2, 1)$ and $(9, 3, 6)$ and is perpendicular to the plane $2x + 6y + 6z = 9$. Written as $3x + 4y + cz = d$, find $c + d$.",
      answer: 4,
      hint: "Its normal is perpendicular to the joining vector $(7, 1, 5)$ and to the normal $(2, 6, 6)$.",
      solution: "$(7, 1, 5)\\times(2, 6, 6) = (-24, -32, 40) = -8(3, 4, -5)$. Through $(2, 2, 1)$: $3x + 4y - 5z = 6 + 8 - 5 = 9$. So $c + d = -5 + 9 = 4$.",
      commonMistakes: [{ answer: 14, feedback: "The $\\hat k$ component is $7 \\cdot 6 - 1 \\cdot 2 = 40$, so $c = -5$ after dividing by $-8$." }],
    },
    {
      type: "quiz",
      id: "tdg4-3-q6",
      variant: "concept",
      question: "A student computes $\\overrightarrow{AB}\\times\\overrightarrow{AC} = \\vec 0$ for three points $A$, $B$, $C$. What follows?",
      options: [
        { text: "$A$, $B$, $C$ are collinear, and infinitely many planes contain them", correct: true, feedback: "Parallel arrows from a common point lie on one line." },
        { text: "The plane through them passes through the origin", feedback: "The cross product says nothing about the origin." },
        { text: "The plane through them is $z = 0$", feedback: "There is no single plane." },
        { text: "The three points coincide", feedback: "Coinciding points are one case, but distinct collinear points also give $\\vec 0$." },
      ],
      hint: "When is a cross product zero?",
    },
    {
      type: "numeric",
      id: "tdg4-3-q7",
      variant: "practice",
      question:
        "Find the distance of the origin from the plane through $(1, 0, 0)$, $(0, 2, 0)$ and $(0, 0, 2)$ (to two decimal places).",
      answer: 0.8165,
      tolerance: 0.01,
      hint: "The plane is $x + \\frac y2 + \\frac z2 = 1$, i.e. $2x + y + z = 2$.",
      solution: "$2x + y + z = 2$, so the distance is $\\frac{2}{\\sqrt{4 + 1 + 1}} = \\frac{2}{\\sqrt6} \\approx 0.82$.",
      commonMistakes: [{ answer: 2, feedback: "Divide by $\\lvert\\vec n\\rvert = \\sqrt6$." }],
    },
    {
      type: "numeric",
      id: "tdg4-3-q8",
      variant: "practice",
      question:
        "JEE Main. Find the x-intercept of the plane through $(1, 2, 3)$, $(-1, 4, 2)$ and $(3, 1, 1)$.",
      answer: 4.6,
      tolerance: 0.001,
      hint: "Normal $= (-2, 2, -1)\\times(2, -1, -2)$.",
      solution: "$(-2, 2, -1)\\times(2, -1, -2) = (-5, -6, -2)$, so the normal is $(5, 6, 2)$. Through $(1, 2, 3)$: $5x + 6y + 2z = 5 + 12 + 6 = 23$. Setting $y = z = 0$: $x = \\frac{23}{5} = 4.6$.",
      commonMistakes: [{ answer: 23, feedback: "On the x-axis $5x = 23$: divide by 5." }],
    },
    {
      type: "quiz",
      id: "tdg4-3-q9",
      variant: "practice",
      question: "The plane containing $(0, 0, 0)$, $(1, 1, 1)$ and $(1, -1, 0)$ is",
      options: [
        { text: "$x + y - 2z = 0$", correct: true, feedback: "$(1, 1, 1)\\times(1, -1, 0) = (1, 1, -2)$, through the origin." },
        { text: "$x - y = 0$", feedback: "$(1, -1, 0)$ gives $2 \\ne 0$." },
        { text: "$x + y + z = 0$", feedback: "$(1, 1, 1)$ gives $3 \\ne 0$." },
        { text: "$x + y + 2z = 0$", feedback: "$(1, 1, 1)$ gives $4 \\ne 0$." },
      ],
      hint: "The plane passes through O, so its normal is $\\vec b\\times\\vec c$ and the constant is 0.",
    },
    {
      type: "numeric",
      id: "tdg4-3-q10",
      variant: "practice",
      question: "JEE Main. The points $(3, 2, 1)$, $(4, \\lambda, 5)$, $(4, 2, -2)$ and $(6, 5, -1)$ are coplanar. Find $\\lambda$.",
      answer: 5,
      hint: "Take arrows from $(3, 2, 1)$ and set their triple product to 0.",
      solution: "Arrows $(1, \\lambda - 2, 4)$, $(1, 0, -3)$, $(3, 3, -2)$. The determinant is $1(0 + 9) - (\\lambda - 2)(-2 + 9) + 4(3 - 0) = 21 - 7(\\lambda - 2) = 35 - 7\\lambda$. Zero gives $\\lambda = 5$.",
      commonMistakes: [{ answer: -5, feedback: "Recheck the middle term: $-(\\lambda - 2)\\cdot 7$, so $35 - 7\\lambda = 0$." }],
    },
    {
      type: "quiz",
      id: "tdg4-3-q11",
      variant: "practice",
      multiple: true,
      question: "Let $A(1, 0, 1)$, $B(0, 1, 1)$, $C(1, 1, 0)$. Which statements are true? Select all that apply.",
      options: [
        { text: "The plane $ABC$ is $x + y + z = 2$", correct: true, feedback: "$\\overrightarrow{AB}\\times\\overrightarrow{AC} = (-1, -1, -1)$; each point gives 2." },
        { text: "The plane $ABC$ is at distance $\\frac{2}{\\sqrt3}$ from the origin", correct: true, feedback: "$\\frac{2}{\\sqrt3}$." },
        { text: "Triangle $ABC$ is equilateral", correct: true, feedback: "Every side is $\\sqrt2$." },
        { text: "A normal to the plane is $\\hat i - \\hat j + \\hat k$", feedback: "With $\\overrightarrow{AB} = (-1, 1, 0)$ it has dot product $-1 - 1 = -2 \\ne 0$, so it is not perpendicular to the plane. The normal is $(1, 1, 1)$." },
        { text: "The origin lies on the plane $ABC$", feedback: "$0 \\ne 2$." },
      ],
      hint: "Find the normal with a cross product, then test each claim.",
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "the-intercept-form-of-a-plane",
  title: "4.4 · The Intercept Form",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "A plane that is not parallel to any axis and does not pass through the origin slices off a corner of space: it meets the x-, y- and z-axes at three points $A(a, 0, 0)$, $B(0, b, 0)$, $C(0, 0, c)$. Together with $O$ they make a tetrahedron. Worked example 3 of Lesson 4.3 found that such a plane can be written with $a$, $b$, $c$ in plain sight.",
    },
    { type: "heading", text: "Deriving the intercept form" },
    {
      type: "text",
      content:
        "Write the plane as $Ax + By + Cz = D$. It does not pass through O, so $D \\ne 0$. Put in the three axis points: $A(a, 0, 0)$ gives $Aa = D$, so $A = \\frac Da$; likewise $B = \\frac Db$ and $C = \\frac Dc$. Substitute and divide by $D$:",
    },
    {
      type: "math",
      latex: "\\frac{x}{a} + \\frac{y}{b} + \\frac{z}{c} = 1",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Intercept form",
      content:
        "The plane with intercepts $a$, $b$, $c$ on the x-, y- and z-axes (all non-zero) is $\\frac xa + \\frac yb + \\frac zc = 1$. To find the intercepts of $px + qy + rz = s$ with $s \\ne 0$, divide by $s$: $a = \\frac sp$, $b = \\frac sq$, $c = \\frac sr$. Intercepts are **signed**: a negative intercept is on the negative half of the axis.",
    },
    {
      type: "interactive",
      config: {
        component: "tdg-space-viewer",
        mode: "plane",
        plane: [2, -3, 4, -12],
        show: ["intercepts", "normal"],
        caption:
          "The plane $2x - 3y + 4z = 12$ with its intercept triangle: $a = 6$, $b = -4$, $c = 3$. Rotate to see that the y-intercept is on the negative y-axis. The tetrahedron $OABC$ has volume $\\frac16\\lvert abc\\rvert = 12$.",
      },
    },
    { type: "heading", text: "Volume, centroid and distance from the intercepts" },
    {
      type: "text",
      content:
        "Three facts follow straight from the corner tetrahedron $OABC$, whose three edges at $O$ are mutually perpendicular:\n\n- **Volume:** $V = \\frac16\\lvert abc\\rvert$ (a right-angled corner: base $\\frac12\\lvert ab\\rvert$, height $\\lvert c\\rvert$, a third of base times height).\n- **Centroid of triangle $ABC$:** $\\left(\\frac a3, \\frac b3, \\frac c3\\right)$; of the tetrahedron $OABC$: $\\left(\\frac a4, \\frac b4, \\frac c4\\right)$.\n- **Distance from O:** the normal is $\\left(\\frac1a, \\frac1b, \\frac1c\\right)$, so $p = \\frac{1}{\\sqrt{\\frac{1}{a^2} + \\frac{1}{b^2} + \\frac{1}{c^2}}}$, i.e. $\\frac{1}{p^2} = \\frac{1}{a^2} + \\frac{1}{b^2} + \\frac{1}{c^2}$.",
    },
    {
      type: "worked-example",
      id: "tdg4-4-we1",
      title: "Worked example 1: intercepts and volume",
      problem: "Find the intercepts of $2x - 3y + 4z = 12$ and the volume of the tetrahedron it cuts off with the coordinate planes.",
      steps: [
        { text: "Divide by 12: $\\frac x6 + \\frac{y}{-4} + \\frac z3 = 1$. So $a = 6$, $b = -4$, $c = 3$." },
        { text: "Volume $= \\frac16\\lvert 6 \\cdot (-4) \\cdot 3\\rvert = \\frac{72}{6} = 12$. *Why this step:* the modulus matters; a volume is never negative." },
      ],
      answer: "Intercepts $6$, $-4$, $3$; volume 12.",
    },
    {
      type: "worked-example",
      id: "tdg4-4-we2",
      title: "Worked example 2: a plane from the centroid of its intercept triangle",
      problem: "A plane meets the axes at $A$, $B$, $C$, and the centroid of triangle $ABC$ is $(1, 2, 3)$. Find the plane.",
      steps: [
        { text: "The centroid is $\\left(\\frac a3, \\frac b3, \\frac c3\\right) = (1, 2, 3)$, so $a = 3$, $b = 6$, $c = 9$." },
        { text: "Intercept form: $\\frac x3 + \\frac y6 + \\frac z9 = 1$. Multiply by 18.", latex: "6x + 3y + 2z = 18" },
        { text: "Shortcut worth remembering: if the centroid is $(\\alpha, \\beta, \\gamma)$, the plane is $\\frac x\\alpha + \\frac y\\beta + \\frac z\\gamma = 3$." },
      ],
      answer: "$6x + 3y + 2z = 18$.",
    },
    {
      type: "worked-example",
      id: "tdg4-4-we3",
      title: "Worked example 3: a locus (JEE classic)",
      problem:
        "A variable plane stays at a constant distance $p$ from the origin and meets the axes at $A$, $B$, $C$. Find the locus of the centroid of triangle $ABC$.",
      steps: [
        { text: "Let the plane be $\\frac xa + \\frac yb + \\frac zc = 1$. Its distance from O is $p$, so $\\frac{1}{a^2} + \\frac{1}{b^2} + \\frac{1}{c^2} = \\frac{1}{p^2}$." },
        { text: "Call the centroid $(x, y, z)$: $x = \\frac a3$, $y = \\frac b3$, $z = \\frac c3$, so $a = 3x$, $b = 3y$, $c = 3z$. *Why this step:* the locus method is always \"name the moving point, then eliminate the parameters\"." },
        { text: "Substitute:", latex: "\\frac{1}{9x^2} + \\frac{1}{9y^2} + \\frac{1}{9z^2} = \\frac{1}{p^2} \\;\\Longrightarrow\\; \\frac{1}{x^2} + \\frac{1}{y^2} + \\frac{1}{z^2} = \\frac{9}{p^2}" },
        { text: "For the centroid of the tetrahedron $OABC$ the same steps with $a = 4x$ give $\\frac{1}{x^2} + \\frac{1}{y^2} + \\frac{1}{z^2} = \\frac{16}{p^2}$." },
      ],
      answer: "$x^{-2} + y^{-2} + z^{-2} = 9p^{-2}$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the intercepts of $px + qy + rz = s$ are $p$, $q$, $r$\"",
      content:
        "The coefficients are the **normal**, not the intercepts. $2x + 3y + 6z = 12$ cuts the axes at $6$, $4$, $2$, which are $\\frac{12}{2}$, $\\frac{12}{3}$, $\\frac{12}{6}$. Also, not every plane has an intercept form: a plane through the origin, or parallel to an axis (a missing variable), does not cut all three axes at single non-zero points.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "tdg4-4-q1",
      variant: "practice",
      question: "Find the sum of the three intercepts of $3x - 2y + 6z - 12 = 0$.",
      answer: 0,
      hint: "Divide $3x - 2y + 6z = 12$ by 12.",
      solution: "Intercepts $\\frac{12}{3} = 4$, $\\frac{12}{-2} = -6$, $\\frac{12}{6} = 2$. Sum $4 - 6 + 2 = 0$.",
      commonMistakes: [{ answer: 12, feedback: "The y-intercept is $-6$, not $6$: intercepts are signed." }],
    },
    {
      type: "quiz",
      id: "tdg4-4-q2",
      variant: "practice",
      question: "The intercept form of $4x + 3y - 6z + 12 = 0$ is",
      options: [
        { text: "$\\frac{x}{-3} + \\frac{y}{-4} + \\frac z2 = 1$", correct: true, feedback: "$4x + 3y - 6z = -12$; divide by $-12$." },
        { text: "$\\frac x3 + \\frac y4 - \\frac z2 = 1$", feedback: "Moving $+12$ across gives $-12$ on the right; this has every sign flipped." },
        { text: "$\\frac x4 + \\frac y3 + \\frac{z}{-6} = 1$", feedback: "These are the coefficients, which are the normal." },
        { text: "$\\frac{x}{-3} + \\frac{y}{-4} + \\frac{z}{-2} = 1$", feedback: "The z-intercept: $-6z = -12$ gives $z = 2$." },
      ],
      hint: "Constant to the right, then divide so the right side is 1.",
    },
    {
      type: "numeric",
      id: "tdg4-4-q3",
      variant: "practice",
      question: "Find the volume of the tetrahedron cut off from the coordinate axes by $2x + 3y + 6z = 12$.",
      answer: 8,
      hint: "Intercepts first, then $\\frac16\\lvert abc\\rvert$.",
      solution: "Intercepts $6$, $4$, $2$. Volume $= \\frac{6 \\cdot 4 \\cdot 2}{6} = 8$.",
      commonMistakes: [
        { answer: 48, feedback: "That is $abc$; the tetrahedron is $\\frac16$ of the box." },
        { answer: 24, feedback: "The factor is $\\frac16$, not $\\frac12$." },
      ],
    },
    {
      type: "numeric",
      id: "tdg4-4-q4",
      variant: "practice",
      question:
        "A plane meets the axes at $A$, $B$, $C$ and the centroid of triangle $ABC$ is $(2, -1, 3)$. Find the distance of the plane from the origin (to two decimal places).",
      answer: 2.5714,
      tolerance: 0.01,
      hint: "$\\frac x2 + \\frac{y}{-1} + \\frac z3 = 3$.",
      solution: "Intercepts $6$, $-3$, $9$: $\\frac x6 - \\frac y3 + \\frac z9 = 1$, i.e. $3x - 6y + 2z = 18$. Distance $\\frac{18}{\\sqrt{9 + 36 + 4}} = \\frac{18}{7} \\approx 2.57$.",
      commonMistakes: [{ answer: 18, feedback: "Divide by $\\sqrt{49} = 7$." }],
    },
    {
      type: "quiz",
      id: "tdg4-4-q5",
      variant: "concept",
      multiple: true,
      question: "Which planes can **not** be written in intercept form $\\frac xa + \\frac yb + \\frac zc = 1$? Select all that apply.",
      options: [
        { text: "$x + y + z = 0$", correct: true, feedback: "It passes through O: all three intercepts would be 0." },
        { text: "$2x + 3y = 6$", correct: true, feedback: "Parallel to the z-axis: it never meets the z-axis." },
        { text: "$z = 5$", correct: true, feedback: "It meets only the z-axis." },
        { text: "$\\frac x2 + \\frac y3 + \\frac z4 = 1$", feedback: "Already in intercept form." },
        { text: "$x - y + z = 1$", feedback: "Intercepts $1$, $-1$, $1$." },
      ],
      hint: "The form needs three non-zero, finite intercepts.",
    },
    {
      type: "numeric",
      id: "tdg4-4-q6",
      variant: "practice",
      question:
        "JEE Main. A variable plane at distance 3 from the origin meets the axes at $A$, $B$, $C$. The centroid of triangle $ABC$ lies on $x^{-2} + y^{-2} + z^{-2} = k$. Find $k$.",
      answer: 1,
      hint: "Worked example 3: $k = \\frac{9}{p^2}$.",
      solution: "$\\frac{1}{a^2} + \\frac{1}{b^2} + \\frac{1}{c^2} = \\frac19$ with $a = 3x$ etc. gives $\\frac19\\left(x^{-2} + y^{-2} + z^{-2}\\right) = \\frac19$, so $k = 1$.",
      commonMistakes: [
        { answer: 0.1111, tolerance: 0.001, feedback: "Substitute $a = 3x$: the $\\frac19$ appears on both sides and cancels." },
        { answer: 3, feedback: "$\\frac{9}{p^2} = \\frac99 = 1$." },
      ],
    },
    {
      type: "numeric",
      id: "tdg4-4-q7",
      variant: "practice",
      question:
        "JEE Main. A variable plane at distance 2 from the origin meets the axes at $A$, $B$, $C$. The centroid of the tetrahedron $OABC$ lies on $x^{-2} + y^{-2} + z^{-2} = k$. Find $k$.",
      answer: 4,
      hint: "The tetrahedron centroid is $\\left(\\frac a4, \\frac b4, \\frac c4\\right)$.",
      solution: "$a = 4x$ etc., so $\\frac{1}{16}\\left(x^{-2} + y^{-2} + z^{-2}\\right) = \\frac14$, giving $k = 4$.",
      commonMistakes: [{ answer: 2.25, feedback: "That uses the triangle centroid ($\\frac{9}{p^2}$). The tetrahedron has four vertices: $\\frac{16}{p^2}$." }],
    },
    {
      type: "quiz",
      id: "tdg4-4-q8",
      variant: "practice",
      question: "A plane meets the axes at $A$, $B$, $C$, and the centroid of triangle $ABC$ is $(\\alpha, \\beta, \\gamma)$. The plane is",
      options: [
        { text: "$\\frac x\\alpha + \\frac y\\beta + \\frac z\\gamma = 3$", correct: true, feedback: "$a = 3\\alpha$, so $\\frac{x}{3\\alpha} + \\ldots = 1$." },
        { text: "$\\frac x\\alpha + \\frac y\\beta + \\frac z\\gamma = 1$", feedback: "That has intercepts $\\alpha, \\beta, \\gamma$, but the intercepts are three times the centroid." },
        { text: "$\\frac x\\alpha + \\frac y\\beta + \\frac z\\gamma = \\frac13$", feedback: "The factor goes the other way." },
        { text: "$\\alpha x + \\beta y + \\gamma z = 3$", feedback: "The centroid coordinates go in the denominators." },
      ],
      hint: "The intercepts are $3\\alpha$, $3\\beta$, $3\\gamma$.",
    },
    {
      type: "numeric",
      id: "tdg4-4-q9",
      variant: "practice",
      question: "A plane cuts equal intercepts on the three axes and passes through $(2, -3, 4)$. Find the intercept.",
      answer: 3,
      hint: "Equal intercepts $a$: the plane is $x + y + z = a$.",
      solution: "$a = 2 - 3 + 4 = 3$.",
      commonMistakes: [{ answer: 9, feedback: "$-3$ is negative: $2 - 3 + 4 = 3$." }],
    },
    {
      type: "numeric",
      id: "tdg4-4-q10",
      variant: "practice",
      question:
        "JEE Main. A plane meets the axes at $A$, $B$, $C$ so that the centroid of triangle $ABC$ is $(1, 1, 1)$. Find the area of triangle $ABC$ (to two decimal places).",
      answer: 7.7942,
      tolerance: 0.01,
      hint: "$A(3, 0, 0)$, $B(0, 3, 0)$, $C(0, 0, 3)$; use $\\frac12\\lvert\\overrightarrow{AB}\\times\\overrightarrow{AC}\\rvert$.",
      solution: "$\\overrightarrow{AB} = (-3, 3, 0)$, $\\overrightarrow{AC} = (-3, 0, 3)$, cross product $(9, 9, 9)$ of length $9\\sqrt3$. Area $\\frac{9\\sqrt3}{2} \\approx 7.79$ (equilateral with side $3\\sqrt2$).",
      commonMistakes: [{ answer: 4.5, feedback: "That is the area of one right-angled face such as $OAB$, not of the slanted triangle." }],
    },
    {
      type: "quiz",
      id: "tdg4-4-q11",
      variant: "concept",
      question: "A plane has intercepts $a$, $b$, $c$. Its distance $p$ from the origin satisfies",
      options: [
        { text: "$\\frac{1}{p^2} = \\frac{1}{a^2} + \\frac{1}{b^2} + \\frac{1}{c^2}$", correct: true, feedback: "The normal is $\\left(\\frac1a, \\frac1b, \\frac1c\\right)$ and the constant is 1." },
        { text: "$p^2 = a^2 + b^2 + c^2$", feedback: "That would make the plane farther away than every intercept, but the nearest point is closer than any of them." },
        { text: "$p = \\frac{a + b + c}{3}$", feedback: "No such averaging rule holds." },
        { text: "$\\frac1p = \\frac1a + \\frac1b + \\frac1c$", feedback: "The squares are needed: it comes from the length of the normal." },
      ],
      hint: "Apply $p = \\frac{\\lvert d\\rvert}{\\lvert\\vec n\\rvert}$ to $\\frac xa + \\frac yb + \\frac zc - 1 = 0$.",
    },
    {
      type: "quiz",
      id: "tdg4-4-q12",
      variant: "practice",
      multiple: true,
      question: "For the plane $\\frac x2 + \\frac y3 + \\frac z6 = 1$, which statements are true? Select all that apply.",
      options: [
        { text: "A normal is $3\\hat i + 2\\hat j + \\hat k$", correct: true, feedback: "Multiply by 6: $3x + 2y + z = 6$." },
        { text: "The tetrahedron it cuts from the axes has volume 6", correct: true, feedback: "$\\frac{2 \\cdot 3 \\cdot 6}{6} = 6$." },
        { text: "The centroid of its intercept triangle is $\\left(\\frac23, 1, 2\\right)$", correct: true, feedback: "A third of each intercept." },
        { text: "A normal is $2\\hat i + 3\\hat j + 6\\hat k$", feedback: "Those are the intercepts, not the normal." },
        { text: "Its distance from the origin is 1", feedback: "$\\frac{6}{\\sqrt{14}} \\approx 1.60$." },
      ],
      hint: "Clear the fractions first: $3x + 2y + z = 6$.",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "planes-through-the-intersection-of-two-planes",
  title: "4.5 · Planes Through the Intersection of Two Planes",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "Open a book and stand it on the table. All its pages share one line, the spine, and swing about it. Two non-parallel planes meet in a line, and through that line pass infinitely many planes, like the pages. This lesson writes **all** of those pages with a single equation and one free number.",
    },
    {
      type: "text",
      content:
        "You met the same idea for lines in the plane: $L_1 + \\lambda L_2 = 0$ is every line through the point where $L_1$ and $L_2$ cross. In space the \"point\" becomes a line and the \"lines\" become planes, and the algebra is word for word the same.",
    },
    { type: "heading", text: "The family P1 + λP2 = 0" },
    {
      type: "text",
      content:
        "Write the two planes with everything on one side: $P_1 \\equiv a_1x + b_1y + c_1z + d_1 = 0$ and $P_2 \\equiv a_2x + b_2y + c_2z + d_2 = 0$. Consider",
    },
    {
      type: "math",
      latex: "P_1 + \\lambda P_2 = 0 \\;\\Longleftrightarrow\\; (a_1 + \\lambda a_2)x + (b_1 + \\lambda b_2)y + (c_1 + \\lambda c_2)z + (d_1 + \\lambda d_2) = 0",
    },
    {
      type: "text",
      content:
        "Two observations do all the work.\n\n1. It is **linear** in $x, y, z$, so (for every $\\lambda$ that leaves a non-zero normal) it is a plane.\n2. Every point on the common line makes $P_1 = 0$ and $P_2 = 0$, so it makes $P_1 + \\lambda P_2 = 0 + \\lambda \\cdot 0 = 0$. The plane **contains** the common line, whatever $\\lambda$ is.\n\nConversely, every plane through the common line arises this way, except $P_2 = 0$ itself (it would need $\\lambda = \\infty$). In vector form the family is $\\vec r\\cdot(\\vec n_1 + \\lambda\\vec n_2) = q_1 + \\lambda q_2$ for planes $\\vec r\\cdot\\vec n_i = q_i$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Planes through a line",
      content:
        "Every plane through the line of intersection of $P_1 = 0$ and $P_2 = 0$ (other than $P_2 = 0$) is $P_1 + \\lambda P_2 = 0$. **One extra condition** fixes $\\lambda$: a point the plane passes through, a plane it is perpendicular to, an axis or line it is parallel to, or a distance from a point. The direction of the common line itself is $\\vec n_1\\times\\vec n_2$.",
    },
    {
      type: "interactive",
      config: {
        component: "tdg-space-viewer",
        mode: "two-planes",
        plane: [1, 1, 1, -6],
        plane2: [2, 3, 4, 5],
        show: ["intersection", "normal"],
        caption:
          "The planes $x + y + z = 6$ and $2x + 3y + 4z + 5 = 0$ and their line of intersection. Every member of $P_1 + \\lambda P_2 = 0$ is a page hinged on this line. Rotate until you look straight along the line: both planes then appear edge-on as two crossing lines, like the spine of a book seen end-on.",
      },
    },
    {
      type: "worked-example",
      id: "tdg4-5-we1",
      title: "Worked example 1: the member through a point",
      problem: "Find the plane through the intersection of $x + y + z = 6$ and $2x + 3y + 4z + 5 = 0$ that passes through $(1, 1, 1)$.",
      steps: [
        { text: "Write both with zero on the right and form the family: $(x + y + z - 6) + \\lambda(2x + 3y + 4z + 5) = 0$." },
        {
          text: "Substitute $(1, 1, 1)$. *Why this step:* the only unknown left is $\\lambda$, and one point fixes it.",
          latex: "(3 - 6) + \\lambda(2 + 3 + 4 + 5) = 0 \\;\\Longrightarrow\\; -3 + 14\\lambda = 0 \\;\\Longrightarrow\\; \\lambda = \\tfrac{3}{14}",
        },
        { text: "Multiply the family by 14 and put $\\lambda = \\frac{3}{14}$: $14(x + y + z - 6) + 3(2x + 3y + 4z + 5) = 0$.", latex: "20x + 23y + 26z - 69 = 0" },
      ],
      answer: "$20x + 23y + 26z = 69$. Check: $20 + 23 + 26 = 69$.",
    },
    {
      type: "worked-example",
      id: "tdg4-5-we2",
      title: "Worked example 2: the member perpendicular to a plane",
      problem: "Find the plane through the intersection of $x + y + z = 1$ and $2x + 3y + 4z = 5$ that is perpendicular to $x - y + z = 0$.",
      steps: [
        { text: "Family: $(x + y + z - 1) + \\lambda(2x + 3y + 4z - 5) = 0$, with normal $(1 + 2\\lambda, 1 + 3\\lambda, 1 + 4\\lambda)$." },
        {
          text: "Perpendicular planes have perpendicular normals, so dot with $(1, -1, 1)$.",
          latex: "(1 + 2\\lambda) - (1 + 3\\lambda) + (1 + 4\\lambda) = 1 + 3\\lambda = 0 \\;\\Longrightarrow\\; \\lambda = -\\tfrac13",
        },
        { text: "$3(x + y + z - 1) - (2x + 3y + 4z - 5) = 0$ gives $x - z + 2 = 0$." },
        { text: "Check that it really contains the line. *Why this step:* a wrong $\\lambda$ still gives a plane, so test a point of the line. Setting $z = 0$ in both planes gives $x + y = 1$, $2x + 3y = 5$, so $(-2, 3, 0)$ is on the line, and $-2 - 0 + 2 = 0$. ✓" },
      ],
      answer: "$x - z + 2 = 0$.",
    },
    {
      type: "worked-example",
      id: "tdg4-5-we3",
      title: "Worked example 3: parallel to an axis",
      problem: "Find the plane through the intersection of $2x + y - z = 3$ and $x - y + 2z = 4$ that is parallel to the x-axis.",
      steps: [
        { text: "Family: $(2x + y - z - 3) + \\lambda(x - y + 2z - 4) = 0$. The coefficient of $x$ is $2 + \\lambda$." },
        { text: "Parallel to the x-axis means no $x$ term (Lesson 4.1), so $\\lambda = -2$." },
        { text: "$(2x + y - z - 3) - 2(x - y + 2z - 4) = 3y - 5z + 5 = 0$." },
      ],
      answer: "$3y - 5z + 5 = 0$.",
    },
    {
      type: "worked-example",
      id: "tdg4-5-we4",
      title: "Worked example 4: the direction of the common line",
      problem: "Find direction ratios of the line of intersection of $x + y + z = 1$ and $2x + 3y + 4z = 5$.",
      steps: [
        { text: "The line lies in both planes, so it is perpendicular to both normals $(1, 1, 1)$ and $(2, 3, 4)$." },
        { text: "Their cross product:", latex: "(1, 1, 1)\\times(2, 3, 4) = (4 - 3,\\ 2 - 4,\\ 3 - 2) = (1, -2, 1)" },
      ],
      answer: "$(1, -2, 1)$. With the point $(-2, 3, 0)$ from Worked example 2 the line is $\\frac{x + 2}{1} = \\frac{y - 3}{-2} = \\frac z1$ (Chapter 5 returns to this).",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"λ comes from the two planes alone\"",
      content:
        "$P_1 + \\lambda P_2 = 0$ is a whole family; the two given planes do not pick a member. You always need one more condition. Two more traps: write **both** planes as \"$\\ldots = 0$\" before adding (adding $x + y + z = 6$ to $\\lambda$ times $2x + 3y + 4z = -5$ with the constants on the wrong sides gives a plane that misses the line), and remember that $P_2 = 0$ itself is not a member, so if the answer turns out to be $P_2$, the equation for $\\lambda$ will have no solution.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "tdg4-5-q1",
      variant: "practice",
      question:
        "The plane $(x + 2y + 3z - 4) + \\lambda(2x + y - z + 5) = 0$ passes through the origin. Find $\\lambda$.",
      answer: 0.8,
      tolerance: 0.001,
      hint: "At the origin each bracket is just its constant.",
      solution: "$-4 + 5\\lambda = 0$, so $\\lambda = \\frac45$. The plane is $13x + 14y + 11z = 0$.",
      commonMistakes: [
        { answer: -0.8, tolerance: 0.001, feedback: "$-4 + 5\\lambda = 0$ gives a positive $\\lambda$." },
        { answer: 1.25, tolerance: 0.001, feedback: "Solve $5\\lambda = 4$, not $4\\lambda = 5$." },
      ],
    },
    {
      type: "quiz",
      id: "tdg4-5-q2",
      variant: "practice",
      multiple: true,
      question: "Which planes contain the line of intersection of $x + y + z = 1$ and $x - y = 0$? Select all that apply.",
      options: [
        { text: "$2x + z = 1$", correct: true, feedback: "$\\lambda = 1$: $(x + y + z - 1) + (x - y) = 2x + z - 1$." },
        { text: "$3x - y + z = 1$", correct: true, feedback: "$\\lambda = 2$." },
        { text: "$2y + z = 1$", correct: true, feedback: "$\\lambda = -1$." },
        { text: "$x + y + z = 0$", feedback: "Parallel to the first plane, so it cannot share any point with it." },
        { text: "$x + y = 1$", feedback: "Every member except $x - y = 0$ has $z$-coefficient 1. Test the point $\\left(\\frac13, \\frac13, \\frac13\\right)$ of the line: $\\frac23 \\ne 1$." },
      ],
      hint: "Write the family $(x + y + z - 1) + \\lambda(x - y) = 0$ and look for a matching $\\lambda$.",
    },
    {
      type: "numeric",
      id: "tdg4-5-q3",
      variant: "practice",
      question:
        "The plane through the intersection of $x - 2y + z = 1$ and $2x + y + z = 8$ that passes through $(1, 1, 1)$ is $2x + by + cz + d = 0$. Find $b + c + d$.",
      answer: -2,
      hint: "At $(1, 1, 1)$: $P_1 = -1$ and $P_2 = -4$.",
      solution: "$-1 - 4\\lambda = 0$ gives $\\lambda = -\\frac14$. Then $4P_1 - P_2 = 4x - 8y + 4z - 4 - 2x - y - z + 8 = 2x - 9y + 3z + 4$. So $b + c + d = -9 + 3 + 4 = -2$. Check: $2 - 9 + 3 + 4 = 0$.",
      commonMistakes: [{ answer: -10, feedback: "The constant is $-4 + 8 = +4$." }],
    },
    {
      type: "numeric",
      id: "tdg4-5-q4",
      variant: "practice",
      question:
        "The plane through the intersection of $x + y + z = 1$ and $2x + 3y - z + 4 = 0$ that is parallel to the x-axis is $y + bz + c = 0$. Find $b + c$.",
      answer: 3,
      hint: "Kill the $x$ term: $1 + 2\\lambda = 0$.",
      solution: "$\\lambda = -\\frac12$: $2(x + y + z - 1) - (2x + 3y - z + 4) = -y + 3z - 6 = 0$, i.e. $y - 3z + 6 = 0$. So $b + c = -3 + 6 = 3$.",
      commonMistakes: [{ answer: -9, feedback: "Multiply through by $-1$ to make the $y$ coefficient $+1$: the constant becomes $+6$." }],
    },
    {
      type: "numeric",
      id: "tdg4-5-q5",
      variant: "practice",
      question:
        "The line of intersection of $x + 2y + z = 3$ and $2x - y + 3z = 1$ has direction ratios $(7, p, q)$. Find $p + q$.",
      answer: -6,
      hint: "$(1, 2, 1)\\times(2, -1, 3)$.",
      solution: "$(2 \\cdot 3 - 1 \\cdot (-1),\\ 1 \\cdot 2 - 1 \\cdot 3,\\ 1 \\cdot (-1) - 2 \\cdot 2) = (7, -1, -5)$, so $p + q = -6$.",
      commonMistakes: [{ answer: 6, feedback: "The middle component is $c_1a_2 - a_1c_2 = 2 - 3 = -1$." }],
    },
    {
      type: "quiz",
      id: "tdg4-5-q6",
      variant: "concept",
      question: "Why does every point of the line $P_1 = 0 = P_2$ lie on $P_1 + \\lambda P_2 = 0$, for every $\\lambda$?",
      options: [
        { text: "Both $P_1$ and $P_2$ are 0 there, so $P_1 + \\lambda P_2 = 0 + \\lambda \\cdot 0 = 0$", correct: true, feedback: "That is the whole proof." },
        { text: "Because $\\lambda$ is chosen to make it so", feedback: "No choice is needed; it holds for every $\\lambda$." },
        { text: "Because the two normals are parallel", feedback: "If they were parallel the planes would not meet in a line." },
        { text: "It holds only for $\\lambda = 1$", feedback: "Any multiple of zero is zero." },
      ],
      hint: "Evaluate each bracket at a point of the line.",
    },
    {
      type: "quiz",
      id: "tdg4-5-q7",
      variant: "concept",
      question:
        "Which plane through the line of intersection of $2x - y + z = 3$ and $x + y + 2z = 0$ is **not** of the form $(2x - y + z - 3) + \\lambda(x + y + 2z) = 0$ for any real $\\lambda$?",
      options: [
        { text: "$x + y + 2z = 0$", correct: true, feedback: "$P_2$ itself would need $\\lambda \\to \\infty$." },
        { text: "$3x + 3z = 3$", feedback: "$\\lambda = 1$ gives $3x + 3z - 3 = 0$." },
        { text: "$2x - y + z = 3$", feedback: "$\\lambda = 0$." },
        { text: "$x - 2y - z = 3$", feedback: "$\\lambda = -1$ gives $x - 2y - z - 3 = 0$." },
      ],
      hint: "Which plane needs \"infinitely much\" of $P_2$?",
    },
    {
      type: "numeric",
      id: "tdg4-5-q8",
      variant: "practice",
      question:
        "The plane through the intersection of $x + 2y + 3z = 4$ and $2x + y - z + 5 = 0$ that is perpendicular to $5x + 3y + 6z + 8 = 0$ meets the x-axis at $x = k$. Find $k$ (to two decimal places).",
      answer: -3.3922,
      tolerance: 0.01,
      hint: "Normal $(1 + 2\\lambda, 2 + \\lambda, 3 - \\lambda)$ dotted with $(5, 3, 6)$ is 0.",
      solution: "$5 + 10\\lambda + 6 + 3\\lambda + 18 - 6\\lambda = 29 + 7\\lambda = 0$, so $\\lambda = -\\frac{29}{7}$. Then $7P_1 - 29P_2$ gives $-51x - 15y + 50z - 173 = 0$, i.e. $51x + 15y - 50z + 173 = 0$. On the x-axis $x = -\\frac{173}{51} \\approx -3.39$.",
      commonMistakes: [{ answer: 3.3922, tolerance: 0.01, feedback: "$51x + 173 = 0$ makes $x$ negative." }],
    },
    {
      type: "numeric",
      id: "tdg4-5-q9",
      variant: "practice",
      question:
        "JEE Main. The plane through the line of intersection of $2x + y - z = 3$ and $5x - 3y + 4z + 9 = 0$ that is parallel to the line $\\frac{x - 1}{2} = \\frac{y - 3}{4} = \\frac{z - 5}{5}$ is $7x + 9y - 10z = d$. Find $d$.",
      answer: 27,
      hint: "Parallel to a line means the normal is perpendicular to its direction $(2, 4, 5)$.",
      solution: "Normal $(2 + 5\\lambda, 1 - 3\\lambda, -1 + 4\\lambda)\\cdot(2, 4, 5) = 3 + 18\\lambda = 0$, so $\\lambda = -\\frac16$. $6P_1 - P_2 = 7x + 9y - 10z - 27 = 0$, so $d = 27$.",
      commonMistakes: [{ answer: -27, feedback: "Move the constant across: $7x + 9y - 10z - 27 = 0$ means $d = +27$." }],
    },
    {
      type: "quiz",
      id: "tdg4-5-q10",
      variant: "practice",
      multiple: true,
      question: "For the line of intersection of $x + y + z = 2$ and $x - y = 0$, which statements are true? Select all that apply.",
      options: [
        { text: "Its direction ratios are $(1, 1, -2)$", correct: true, feedback: "$(1, 1, 1)\\times(1, -1, 0) = (1, 1, -2)$." },
        { text: "It passes through $(1, 1, 0)$", correct: true, feedback: "$1 + 1 + 0 = 2$ and $1 - 1 = 0$." },
        { text: "It lies in the plane $2x + z = 2$", correct: true, feedback: "That is the member with $\\lambda = 1$." },
        { text: "It is parallel to the z-axis", feedback: "Its direction $(1, 1, -2)$ is not along $\\hat k$." },
        { text: "Its direction ratios are $(1, -1, 0)$", feedback: "That is the normal of the second plane, which is perpendicular to the line." },
      ],
      hint: "Direction: cross the normals. Point: satisfy both equations.",
    },
    {
      type: "numeric",
      id: "tdg4-5-q11",
      variant: "practice",
      question:
        "JEE Advanced. Two planes through the line of intersection of $x + y + z = 3$ and $x - y + z = 1$ are at distance 1 from the origin. One of them is $y = 1$; the other is $2x + py + qz = r$. Find $p + q + r$.",
      answer: 4,
      hint: "Family $(1 + \\lambda)x + (1 - \\lambda)y + (1 + \\lambda)z = 3 + \\lambda$; set its distance from O equal to 1.",
      solution: "$(3 + \\lambda)^2 = 2(1 + \\lambda)^2 + (1 - \\lambda)^2$ simplifies to $\\lambda^2 - 2\\lambda - 3 = 0$, so $\\lambda = -1$ (giving $y = 1$) or $\\lambda = 3$, giving $4x - 2y + 4z = 6$, i.e. $2x - y + 2z = 3$. So $p + q + r = -1 + 2 + 3 = 4$. Check: $\\frac{3}{3} = 1$.",
      commonMistakes: [{ answer: -2, feedback: "The constant is $\\frac{3 + 3}{2} = 3$, on the right with a plus sign." }],
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "the-angle-between-two-planes",
  title: "4.6 · The Angle Between Two Planes",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "Open a laptop. The angle between the screen and the keyboard is measured by looking along the hinge: in that view both are lines, and you read the angle between those lines. This is the **dihedral angle** between two planes.",
    },
    {
      type: "text",
      content:
        "Measuring it directly is awkward, but there is a shortcut. Stick a pencil out of the screen at right angles and another out of the keyboard. Turn the laptop and the two pencils turn with their planes; the angle between the pencils is the same as the angle between the planes (or its supplement). The pencils are the **normals**, and the angle between two vectors is a dot product.",
    },
    { type: "heading", text: "The angle from the normals" },
    {
      type: "text",
      content:
        "Look along the line of intersection. Each plane is a line through the hinge, and each normal is perpendicular to its line. Rotating both lines by $90^\\circ$ turns them into the normals, so the angle between the normals equals the angle between the planes or its supplement. Taking the modulus of the cosine picks the acute one:",
    },
    {
      type: "math",
      latex: "\\cos\\theta = \\frac{\\lvert\\vec n_1\\cdot\\vec n_2\\rvert}{\\lvert\\vec n_1\\rvert\\,\\lvert\\vec n_2\\rvert} = \\frac{\\lvert a_1a_2 + b_1b_2 + c_1c_2\\rvert}{\\sqrt{a_1^2 + b_1^2 + c_1^2}\\,\\sqrt{a_2^2 + b_2^2 + c_2^2}}",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Parallel and perpendicular planes",
      content:
        "- **Perpendicular:** $a_1a_2 + b_1b_2 + c_1c_2 = 0$ (normals perpendicular).\n- **Parallel:** $\\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2}$ (normals parallel). If the constants are in the same ratio too, the planes coincide.\n- **With a coordinate plane:** the xy-plane has normal $\\hat k$, so the angle between $ax + by + cz + d = 0$ and the xy-plane has $\\cos\\theta = \\frac{\\lvert c\\rvert}{\\sqrt{a^2 + b^2 + c^2}}$.",
    },
    {
      type: "interactive",
      config: {
        component: "tdg-distance-lab",
        mode: "two-planes",
        plane1: [2, -1, 1, -6],
        plane2: [1, 1, 2, -7],
        caption:
          "Worked example 1 in the lab: $2x - y + z = 6$ and $x + y + 2z = 7$. Step the coefficients and watch $\\cos\\theta$. Make the dot product of the normals zero to get perpendicular planes; make the normals proportional to get parallel planes, and the lab switches to measuring the gap between them.",
      },
    },
    {
      type: "worked-example",
      id: "tdg4-6-we1",
      title: "Worked example 1: the angle between two planes",
      problem: "Find the angle between $2x - y + z = 6$ and $x + y + 2z = 7$.",
      steps: [
        { text: "Normals $(2, -1, 1)$ and $(1, 1, 2)$, each of length $\\sqrt6$." },
        { text: "Dot product $2 - 1 + 2 = 3$.", latex: "\\cos\\theta = \\frac{3}{\\sqrt6\\,\\sqrt6} = \\frac12" },
      ],
      answer: "$\\theta = 60^\\circ$.",
    },
    {
      type: "worked-example",
      id: "tdg4-6-we2",
      title: "Worked example 2: an unknown for perpendicularity",
      problem: "Find $k$ so that $2x + ky - 3z = 5$ and $x + 2y + 4z = 1$ are perpendicular.",
      steps: [
        { text: "Perpendicular planes have perpendicular normals: $(2, k, -3)\\cdot(1, 2, 4) = 0$." },
        { text: "$2 + 2k - 12 = 0$, so $k = 5$." },
      ],
      answer: "$k = 5$.",
    },
    {
      type: "worked-example",
      id: "tdg4-6-we3",
      title: "Worked example 3: angle with a coordinate plane",
      problem: "Find the angle between the plane $x + y + z = 1$ and the xy-plane.",
      steps: [
        { text: "The xy-plane is $z = 0$, normal $\\hat k$." },
        { text: "$\\cos\\theta = \\frac{\\lvert 1\\rvert}{\\sqrt3}$. *Why this step:* only the $z$ coefficient survives the dot product with $\\hat k$." },
      ],
      answer: "$\\theta = \\cos^{-1}\\frac{1}{\\sqrt3} \\approx 54.7^\\circ$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"parallel planes have equal equations\"",
      content:
        "$2x - 4y + 6z = 5$ and $x - 2y + 3z = 1$ look different but are parallel: the normals $(2, -4, 6)$ and $(1, -2, 3)$ are proportional. Only the normals need to be proportional; the constants decide whether the planes are different ($\\frac52 \\ne \\frac11$ here) or the same. Also, without the modulus the formula may give the obtuse angle; \"the angle between the planes\" means the acute one.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "tdg4-6-q1",
      variant: "practice",
      question: "Find $\\cos\\theta$, where $\\theta$ is the acute angle between $x + 2y + 2z = 5$ and $2x - y + 2z = 1$. (A fraction such as 4/9 is fine.)",
      answer: 0.4444,
      tolerance: 0.005,
      hint: "Both normals have length 3.",
      solution: "$\\vec n_1\\cdot\\vec n_2 = 2 - 2 + 4 = 4$, so $\\cos\\theta = \\frac49$.",
      commonMistakes: [{ answer: 4, feedback: "Divide by the lengths: $3 \\times 3 = 9$." }],
    },
    {
      type: "numeric",
      id: "tdg4-6-q2",
      variant: "practice",
      question: "Find the angle, in degrees, between the planes $x + y = 3$ and $y + z = 1$.",
      answer: 60,
      unit: "degrees",
      hint: "Normals $(1, 1, 0)$ and $(0, 1, 1)$.",
      solution: "$\\cos\\theta = \\frac{1}{\\sqrt2\\,\\sqrt2} = \\frac12$, so $\\theta = 60^\\circ$.",
      commonMistakes: [
        { answer: 120, feedback: "That is the obtuse angle; the angle between planes is taken acute." },
        { answer: 90, feedback: "The dot product is 1, not 0." },
      ],
    },
    {
      type: "numeric",
      id: "tdg4-6-q3",
      variant: "practice",
      question: "Find $k$ so that the planes $x - 2y + kz = 1$ and $3x + y + 2z = 4$ are perpendicular.",
      answer: -0.5,
      tolerance: 0.001,
      hint: "$3 - 2 + 2k = 0$.",
      solution: "$(1, -2, k)\\cdot(3, 1, 2) = 1 + 2k = 0$, so $k = -\\frac12$.",
      commonMistakes: [{ answer: 0.5, tolerance: 0.001, feedback: "$1 + 2k = 0$ gives a negative $k$." }],
    },
    {
      type: "quiz",
      id: "tdg4-6-q4",
      variant: "practice",
      multiple: true,
      question: "Which pairs of planes are parallel (possibly the same plane)? Select all that apply.",
      options: [
        { text: "$2x - y + 3z = 1$ and $4x - 2y + 6z = 7$", correct: true, feedback: "Normals in ratio $1 : 2$." },
        { text: "$x + y + z = 1$ and $x - y - z = 4$", feedback: "$(1, 1, 1)$ and $(1, -1, -1)$ are not proportional." },
        { text: "$x + 2y = 3$ and $2x + 4y + z = 1$", feedback: "The second has a $z$ term: $(1, 2, 0)$ is not proportional to $(2, 4, 1)$." },
        { text: "$3x - 6y + 9z = 3$ and $x - 2y + 3z = 1$", correct: true, feedback: "Everything is in ratio $3 : 1$: these are the same plane." },
        { text: "$x - y = 0$ and $y - x = 2$", correct: true, feedback: "Normals $(1, -1, 0)$ and $(-1, 1, 0)$ are opposite, which still counts as parallel." },
      ],
      hint: "Compare the normals only; a factor of $-1$ is allowed.",
    },
    {
      type: "numeric",
      id: "tdg4-6-q5",
      variant: "practice",
      question: "Find $\\cos\\theta$, where $\\theta$ is the angle between the plane $2x - y + 2z = 3$ and the xy-plane. (A fraction is fine.)",
      answer: 0.6667,
      tolerance: 0.005,
      hint: "Dot the normal with $\\hat k$.",
      solution: "$\\cos\\theta = \\frac{\\lvert 2\\rvert}{3} = \\frac23$, so $\\theta \\approx 48.2^\\circ$.",
      commonMistakes: [
        { answer: 0.3333, tolerance: 0.005, feedback: "That uses the $y$ coefficient. The xy-plane has normal $\\hat k$, so use the $z$ coefficient." },
        { answer: 0.7454, tolerance: 0.005, feedback: "That is $\\sin\\theta$. The angle between planes is the angle between normals: use the cosine." },
      ],
    },
    {
      type: "quiz",
      id: "tdg4-6-q6",
      variant: "concept",
      question: "The angle between two planes is defined as",
      options: [
        { text: "the acute angle between their normals", correct: true, feedback: "Equivalently, the dihedral angle seen looking along the line of intersection." },
        { text: "the angle between any line in one plane and any line in the other", feedback: "Different pairs of lines give different angles, so this does not define anything." },
        { text: "the angle between the lines where the two planes cut the xy-plane", feedback: "Those traces depend on how the planes sit relative to the xy-plane, not just on the planes themselves; tilt both planes together and the traces change." },
        { text: "the angle between their x-intercepts", feedback: "Intercepts are points on an axis, not directions." },
      ],
      hint: "Which direction does a plane have that is unique up to sign?",
    },
    {
      type: "numeric",
      id: "tdg4-6-q7",
      variant: "practice",
      question: "The plane $x + by + cz = 5$ is parallel to $2x - 4y + 6z = 1$. Find $b + c$.",
      answer: 1,
      hint: "Divide the second normal by 2.",
      solution: "$(2, -4, 6) = 2(1, -2, 3)$, so $b = -2$ and $c = 3$: $b + c = 1$.",
      commonMistakes: [{ answer: 2, feedback: "Scale so the $x$ coefficient is 1: $b = -2$, $c = 3$." }],
    },
    {
      type: "numeric",
      id: "tdg4-6-q8",
      variant: "practice",
      question:
        "Find the acute angle, in degrees, between the plane through $(1, 0, 0)$, $(0, 1, 0)$, $(0, 0, 1)$ and the plane $z = 0$ (to one decimal place).",
      answer: 54.7356,
      tolerance: 0.1,
      unit: "degrees",
      hint: "The first plane is $x + y + z = 1$.",
      solution: "$\\cos\\theta = \\frac{1}{\\sqrt3}$, so $\\theta \\approx 54.7^\\circ$.",
      commonMistakes: [{ answer: 35.2644, tolerance: 0.1, feedback: "That is the complement: you used sine instead of cosine." }],
    },
    {
      type: "quiz",
      id: "tdg4-6-q9",
      variant: "practice",
      question: "The planes $2x - y + 4z = 5$ and $5x - 2.5y + 10z = 6$ are",
      options: [
        { text: "parallel but not the same plane", correct: true, feedback: "Normals in ratio $2 : 5$, but $\\frac56 \\ne \\frac25$." },
        { text: "the same plane", feedback: "The constants are not in the ratio $2 : 5$." },
        { text: "perpendicular", feedback: "$10 + 2.5 + 40 \\ne 0$." },
        { text: "inclined at $60^\\circ$", feedback: "Proportional normals make an angle of $0^\\circ$." },
      ],
      hint: "Compare $\\frac{a_1}{a_2}$, $\\frac{b_1}{b_2}$, $\\frac{c_1}{c_2}$ and then the constants.",
    },
    {
      type: "numeric",
      id: "tdg4-6-q10",
      variant: "practice",
      question:
        "JEE Main. The angle between the planes $x + y + 2z = 3$ and $2x - y + kz = 1$ is $60^\\circ$. Find the positive value of $k$.",
      answer: 1,
      hint: "$\\frac{\\lvert 1 + 2k\\rvert}{\\sqrt6\\,\\sqrt{5 + k^2}} = \\frac12$; square both sides.",
      solution: "$4(1 + 2k)^2 = 6(5 + k^2)$ gives $10k^2 + 16k - 26 = 0$, i.e. $5k^2 + 8k - 13 = 0 = (k - 1)(5k + 13)$. So $k = 1$ or $k = -\\frac{13}{5}$. The positive value is 1. Check: $\\frac{3}{\\sqrt6\\sqrt6} = \\frac12$.",
      commonMistakes: [{ answer: -2.6, tolerance: 0.01, feedback: "That root also works, but it is negative." }],
    },
    {
      type: "quiz",
      id: "tdg4-6-q11",
      variant: "practice",
      multiple: true,
      question: "For the plane $2x + 2y - z = 5$, which statements are true? Select all that apply.",
      options: [
        { text: "It makes an angle $\\cos^{-1}\\frac13$ with the xy-plane", correct: true, feedback: "$\\frac{\\lvert -1\\rvert}{3}$." },
        { text: "It is perpendicular to the plane $x - y = 0$", correct: true, feedback: "$2 - 2 + 0 = 0$." },
        { text: "It is parallel to $4x + 4y - 2z = 1$", correct: true, feedback: "Normals in ratio $1 : 2$." },
        { text: "It makes equal angles with the yz- and xz-planes", correct: true, feedback: "$\\lvert a\\rvert = \\lvert b\\rvert = 2$." },
        { text: "It is perpendicular to the z-axis", feedback: "Its normal is not along $\\hat k$." },
      ],
      hint: "The yz-plane has normal $\\hat i$, the xz-plane $\\hat j$, the xy-plane $\\hat k$.",
    },
  ]),
};

const lesson07: LessonSeed = {
  slug: "distances-and-the-two-sides-of-a-plane",
  title: "4.7 · Distances and the Two Sides of a Plane",
  position: 7,
  blocks: blocks([
    {
      type: "text",
      content:
        "A plane splits space into two halves, the way a wall splits a house into two rooms. Two questions about a point $P$ follow at once: **how far** is $P$ from the wall, and **which room** is it in? One number answers both: the value you get by substituting $P$ into the plane's equation.",
    },
    {
      type: "text",
      content:
        "This is the same signed quantity $L(P) = ax_1 + by_1 + c$ that measured side and distance for a line in the plane. In space it is $P(x_1, y_1, z_1) = ax_1 + by_1 + cz_1 + d$, and the arguments carry over unchanged.",
    },
    { type: "heading", text: "Distance of a point from a plane" },
    {
      type: "text",
      content:
        "Take any point $A$ on the plane $ax + by + cz + d = 0$. The perpendicular distance from $P$ is the length of the shadow of $\\overrightarrow{AP}$ on the unit normal $\\hat n = \\frac{(a, b, c)}{\\sqrt{a^2 + b^2 + c^2}}$:",
    },
    {
      type: "math",
      latex:
        "\\text{distance} = \\lvert\\overrightarrow{AP}\\cdot\\hat n\\rvert = \\frac{\\lvert a(x_1 - x_A) + b(y_1 - y_A) + c(z_1 - z_A)\\rvert}{\\sqrt{a^2 + b^2 + c^2}} = \\frac{\\lvert ax_1 + by_1 + cz_1 + d\\rvert}{\\sqrt{a^2 + b^2 + c^2}}",
    },
    {
      type: "text",
      content:
        "The last step uses $ax_A + by_A + cz_A = -d$, because $A$ is on the plane. In vector form, for the plane $\\vec r\\cdot\\vec n = q$ the distance of $\\vec p$ is $\\frac{\\lvert\\vec p\\cdot\\vec n - q\\rvert}{\\lvert\\vec n\\rvert}$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Distances from planes",
      content:
        "- Point to plane: $\\dfrac{\\lvert ax_1 + by_1 + cz_1 + d\\rvert}{\\sqrt{a^2 + b^2 + c^2}}$.\n- Parallel planes $ax + by + cz + d_1 = 0$ and $ax + by + cz + d_2 = 0$ (the **same** $a, b, c$): $\\dfrac{\\lvert d_1 - d_2\\rvert}{\\sqrt{a^2 + b^2 + c^2}}$.",
    },
    {
      type: "interactive",
      config: {
        component: "tdg-distance-lab",
        mode: "point-plane",
        p1: [2, 3, -5],
        plane1: [1, 2, -2, -9],
        caption:
          "Worked example 1 in the lab: the point $(2, 3, -5)$ and the plane $x + 2y - 2z = 9$. The signed value $P(x_1, y_1, z_1)$ is computed first; its modulus over $\\lvert\\vec n\\rvert$ is the distance, and its sign compared with the origin's says which side. Step the point through the plane and watch the sign flip.",
      },
    },
    {
      type: "worked-example",
      id: "tdg4-7-we1",
      title: "Worked example 1: point to plane",
      problem: "Find the distance of $(2, 3, -5)$ from $x + 2y - 2z = 9$.",
      steps: [
        { text: "Write the plane as $x + 2y - 2z - 9 = 0$ and substitute: $2 + 6 + 10 - 9 = 9$." },
        { text: "Divide by $\\sqrt{1 + 4 + 4} = 3$." },
      ],
      answer: "$\\frac93 = 3$.",
    },
    {
      type: "worked-example",
      id: "tdg4-7-we2",
      title: "Worked example 2: two parallel planes",
      problem: "Find the distance between $2x - y + 3z = 4$ and $4x - 2y + 6z + 6 = 0$.",
      steps: [
        { text: "The normals are proportional, so the planes are parallel. Make the normals **identical**: halve the second, $2x - y + 3z + 3 = 0$. The first is $2x - y + 3z - 4 = 0$." },
        { text: "Now subtract the constants. *Why this step:* the constants are only comparable once the normals match.", latex: "\\frac{\\lvert -4 - 3\\rvert}{\\sqrt{4 + 1 + 9}} = \\frac{7}{\\sqrt{14}} = \\frac{\\sqrt{14}}{2}" },
        { text: "Check: the point $(2, 0, 0)$ is on the first plane, and its distance from the second is $\\frac{\\lvert 8 + 6\\rvert}{\\sqrt{56}} = \\frac{14}{2\\sqrt{14}} = \\frac{\\sqrt{14}}{2}$. ✓" },
      ],
      answer: "$\\frac{\\sqrt{14}}{2} \\approx 1.87$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: subtracting constants before matching normals",
      content:
        "For $2x - y + 3z = 4$ and $4x - 2y + 6z + 6 = 0$, the tempting $\\frac{\\lvert -4 - 6\\rvert}{\\sqrt{14}}$ is wrong: the second equation is the first scaled by 2, so its constant is doubled too. Scale one equation so that $(a, b, c)$ is literally the same in both, and also put both constants on the same side (both as \"$+ d = 0$\") before subtracting.",
    },
    { type: "heading", text: "Which side of the plane" },
    {
      type: "text",
      content:
        "Write $P(x, y, z) = ax + by + cz + d$. Moving a point in the direction of the normal increases $P$, moving against it decreases $P$, and $P = 0$ exactly on the plane. So $P$ is positive on one side and negative on the other:\n\n- $P(A)$ and $P(B)$ with the **same** sign: $A$ and $B$ are on the same side; the segment $AB$ does not cross the plane.\n- **Opposite** signs: the plane cuts the segment $AB$ between them.\n\nThe sizes tell you where the cut happens. $P$ changes linearly along $AB$, so the crossing point divides $AB$ in the ratio $\\lvert P(A)\\rvert : \\lvert P(B)\\rvert$. With signs, the plane divides $AB$ in the ratio $-P(A) : P(B)$: positive means internal, negative means external.",
    },
    {
      type: "worked-example",
      id: "tdg4-7-we3",
      title: "Worked example 3: same side or opposite",
      problem: "Are $(1, 2, 3)$ and $(-1, -1, 2)$ on the same side of $x + y - 2z + 1 = 0$? Is the origin with them?",
      steps: [
        { text: "$P(1, 2, 3) = 1 + 2 - 6 + 1 = -2$ and $P(-1, -1, 2) = -1 - 1 - 4 + 1 = -5$. Same sign: same side." },
        { text: "$P(0, 0, 0) = 1 > 0$: the origin is on the other side." },
      ],
      answer: "The two points are on the same side; the origin is on the opposite side.",
    },
    {
      type: "worked-example",
      id: "tdg4-7-we4",
      title: "Worked example 4: where a plane cuts a segment",
      problem: "In what ratio does the plane $x - 2y + 3z = 5$ divide the segment joining $A(-2, 4, 7)$ and $B(3, 5, -4)$? Find the point.",
      steps: [
        { text: "$P(A) = -2 - 8 + 21 - 5 = 6$, $P(B) = 3 - 10 - 12 - 5 = -24$. Opposite signs: the plane cuts $AB$ internally." },
        { text: "Ratio $-P(A) : P(B) = -6 : -24 = 1 : 4$." },
        { text: "Section formula with $1 : 4$:", latex: "\\frac{4A + B}{5} = \\left(\\frac{-8 + 3}{5}, \\frac{16 + 5}{5}, \\frac{28 - 4}{5}\\right) = \\left(-1, \\tfrac{21}{5}, \\tfrac{24}{5}\\right)" },
        { text: "Check: $-1 - \\frac{42}{5} + \\frac{72}{5} = -1 + 6 = 5$. ✓" },
      ],
      answer: "$1 : 4$ internally, at $\\left(-1, \\frac{21}{5}, \\frac{24}{5}\\right)$.",
    },
    { type: "heading", text: "Bisector planes (JEE Advanced)" },
    {
      type: "text",
      content:
        "Two intersecting planes make two pairs of dihedral angles. A point is equidistant from both planes exactly when $\\frac{\\lvert P_1\\rvert}{\\lvert\\vec n_1\\rvert} = \\frac{\\lvert P_2\\rvert}{\\lvert\\vec n_2\\rvert}$, which splits into the two **bisector planes**\n\n$$\\frac{a_1x + b_1y + c_1z + d_1}{\\sqrt{a_1^2 + b_1^2 + c_1^2}} = \\pm\\frac{a_2x + b_2y + c_2z + d_2}{\\sqrt{a_2^2 + b_2^2 + c_2^2}}.$$\n\nAs with angle bisectors of lines: first make $d_1, d_2 > 0$. Then the $+$ sign gives the bisector of the angle containing the origin. If additionally $\\vec n_1\\cdot\\vec n_2 > 0$, the origin lies in the **obtuse** angle; if $\\vec n_1\\cdot\\vec n_2 < 0$, in the acute one.",
    },
    {
      type: "worked-example",
      id: "tdg4-7-we5",
      title: "Worked example 5: the two bisector planes",
      problem: "Find the bisector planes of $2x - y + 2z + 3 = 0$ and $3x - 2y + 6z + 8 = 0$, and say which bisects the acute angle.",
      steps: [
        { text: "Both constants are already positive. Lengths of normals: 3 and 7." },
        { text: "The $+$ bisector (origin side): $7(2x - y + 2z + 3) = 3(3x - 2y + 6z + 8)$.", latex: "5x - y - 4z - 3 = 0" },
        { text: "The $-$ bisector: $7(2x - y + 2z + 3) = -3(3x - 2y + 6z + 8)$.", latex: "23x - 13y + 32z + 45 = 0" },
        { text: "$\\vec n_1\\cdot\\vec n_2 = 6 + 2 + 12 = 20 > 0$, so the origin is in the obtuse angle. *Why this step:* the sign test saves computing any angle. The acute bisector is the other one." },
      ],
      answer: "Bisectors $5x - y - 4z = 3$ (bisects the angle in which O lies, which is obtuse) and $23x - 13y + 32z + 45 = 0$ (bisects the acute angle).",
    },
    {
      type: "interactive",
      config: {
        component: "tdg-space-viewer",
        mode: "plane",
        plane: [1, 2, -2, -9],
        p: [2, 3, -5],
        show: ["normal", "foot", "image"],
        sliders: [
          { name: "px", min: -4, max: 6, step: 1, initial: 2 },
          { name: "py", min: -4, max: 6, step: 1, initial: 3 },
          { name: "pz", min: -6, max: 4, step: 1, initial: -5 },
        ],
        caption:
          "Move $P$ with the sliders. The dashed perpendicular has length $\\frac{\\lvert P(x_1, y_1, z_1)\\rvert}{3}$; push $P$ through the plane and its image swaps sides with it, while the side readout flips sign.",
      },
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "tdg4-7-q1",
      variant: "practice",
      question: "Find the distance of $(3, -2, 1)$ from $2x - y + 2z + 3 = 0$ (to two decimal places).",
      answer: 4.3333,
      tolerance: 0.01,
      hint: "Substitute, take the modulus, divide by 3.",
      solution: "$\\frac{\\lvert 6 + 2 + 2 + 3\\rvert}{3} = \\frac{13}{3} \\approx 4.33$.",
      commonMistakes: [{ answer: 13, feedback: "Divide by $\\sqrt{4 + 1 + 4} = 3$." }],
    },
    {
      type: "numeric",
      id: "tdg4-7-q2",
      variant: "practice",
      question: "Find the distance between the parallel planes $2x + 3y + 6z = 7$ and $4x + 6y + 12z + 21 = 0$.",
      answer: 2.5,
      tolerance: 0.001,
      hint: "Halve the second equation first.",
      solution: "$2x + 3y + 6z - 7 = 0$ and $2x + 3y + 6z + 10.5 = 0$: $\\frac{\\lvert -7 - 10.5\\rvert}{7} = 2.5$.",
      commonMistakes: [
        { answer: 4, feedback: "You compared $-7$ with $21$ without halving the second equation." },
        { answer: 0.5, feedback: "Put both constants on the same side: $-7$ and $+10.5$ differ by 17.5." },
      ],
    },
    {
      type: "quiz",
      id: "tdg4-7-q3",
      variant: "practice",
      multiple: true,
      question: "Which points are on the same side of $x + y + z - 3 = 0$ as the origin? Select all that apply.",
      options: [
        { text: "$(1, 1, 0)$", correct: true, feedback: "$P = -1$, the same sign as $P(O) = -3$." },
        { text: "$(-5, 4, 3)$", correct: true, feedback: "$P = -1$." },
        { text: "$(0, 0, 2.9)$", correct: true, feedback: "$P = -0.1$: close to the plane, but on the origin's side." },
        { text: "$(2, 2, 2)$", feedback: "$P = 3 > 0$." },
        { text: "$(1, 1, 1)$", feedback: "$P = 0$: on the plane itself, on neither side." },
      ],
      hint: "Compare the sign of $x + y + z - 3$ with its value $-3$ at the origin.",
    },
    {
      type: "numeric",
      id: "tdg4-7-q4",
      variant: "practice",
      question: "The plane $2x + y - z = 3$ divides the segment from $A(1, 1, 1)$ to $B(3, 2, 0)$ in the ratio $1 : k$. Find $k$.",
      answer: 5,
      hint: "$P(A) = -1$, $P(B) = 5$; the ratio is $-P(A) : P(B)$.",
      solution: "$-(-1) : 5 = 1 : 5$, so $k = 5$. The point is $\\frac{5A + B}{6} = \\left(\\frac43, \\frac76, \\frac56\\right)$, and $\\frac83 + \\frac76 - \\frac56 = 3$. ✓",
      commonMistakes: [{ answer: 0.2, tolerance: 0.001, feedback: "The ratio is $1 : 5$, so $k = 5$, not $\\frac15$." }],
    },
    {
      type: "numeric",
      id: "tdg4-7-q5",
      variant: "practice",
      question:
        "The planes parallel to $2x - y + 2z + 4 = 0$ at distance 3 from it are $2x - y + 2z + d = 0$. Find the product of the two values of $d$.",
      answer: -65,
      hint: "$\\frac{\\lvert d - 4\\rvert}{3} = 3$.",
      solution: "$\\lvert d - 4\\rvert = 9$ gives $d = 13$ or $d = -5$, product $-65$.",
      commonMistakes: [{ answer: 7, feedback: "Multiply the gap 3 by $\\lvert\\vec n\\rvert = 3$ first: $d - 4 = \\pm 9$, not $\\pm 3$." }],
    },
    {
      type: "quiz",
      id: "tdg4-7-q6",
      variant: "practice",
      question: "Of the two bisector planes of $x + 2y + 2z - 3 = 0$ and $2x - y + 2z + 6 = 0$, the one that bisects the angle in which the origin lies is",
      options: [
        { text: "$3x + y + 4z + 3 = 0$", correct: true, feedback: "Make constants positive: $-x - 2y - 2z + 3$ and $2x - y + 2z + 6$; take the $+$ sign (both normals have length 3)." },
        { text: "$x - 3y + 9 = 0$", feedback: "That is the other bisector." },
        { text: "$3x + y + 4z - 3 = 0$", feedback: "Recheck the constants: $-3 + 6 = 3$ ends up as $+3$." },
        { text: "$x + y + z = 0$", feedback: "It passes through the origin, but the origin is not equidistant from the two planes (distances 1 and 2)." },
      ],
      hint: "Make both constants positive, then take $\\frac{P_1}{\\lvert\\vec n_1\\rvert} = +\\frac{P_2}{\\lvert\\vec n_2\\rvert}$.",
    },
    {
      type: "quiz",
      id: "tdg4-7-q7",
      variant: "concept",
      multiple: true,
      question:
        "For the planes $x + 2y + 2z - 3 = 0$ and $2x - y + 2z + 6 = 0$, which statements are true? Select all that apply.",
      options: [
        { text: "The bisector of the angle in which the origin lies is the acute-angle bisector", correct: true, feedback: "With constants positive the normals are $(-1, -2, -2)$ and $(2, -1, 2)$, dot product $-4 < 0$: the origin is in the acute angle." },
        { text: "$x - 3y + 9 = 0$ bisects the obtuse angle", correct: true, feedback: "It is the other bisector." },
        { text: "The origin is equidistant from the two planes", feedback: "Distances $\\frac33 = 1$ and $\\frac63 = 2$." },
        { text: "The origin lies in the obtuse angle between the planes", feedback: "The dot product test says acute." },
      ],
      hint: "Constants positive first; then the sign of $\\vec n_1\\cdot\\vec n_2$ decides.",
    },
    {
      type: "numeric",
      id: "tdg4-7-q8",
      variant: "practice",
      question:
        "JEE Main. The points $(1, 1, k)$ and $(-3, 0, 1)$ are equidistant from the plane $3x + 4y - 12z + 13 = 0$. Find the sum of all possible values of $k$. (A fraction is fine.)",
      answer: 3.3333,
      tolerance: 0.01,
      hint: "Equal distances mean $\\lvert 20 - 12k\\rvert = \\lvert -8\\rvert$.",
      solution: "$P(1, 1, k) = 20 - 12k$ and $P(-3, 0, 1) = -8$. So $20 - 12k = \\pm 8$: $k = 1$ or $k = \\frac73$. Sum $\\frac{10}{3} \\approx 3.33$.",
      commonMistakes: [{ answer: 1, feedback: "There is a second value from the other sign: $20 - 12k = 8$ gives $k = 1$, and $20 - 12k = -8$ gives $k = \\frac73$." }],
    },
    {
      type: "numeric",
      id: "tdg4-7-q9",
      variant: "practice",
      question:
        "JEE Main. The planes $2x - y + 2z = 3$ and $2x - y + 2z = k$ are 2 units apart, and the origin lies between them. Find $k$.",
      answer: -3,
      hint: "The first plane is at signed distance $\\frac33 = 1$ from O along the normal; the second must be on the other side.",
      solution: "$\\frac{\\lvert k - 3\\rvert}{3} = 2$ gives $k = 9$ or $k = -3$. For the origin to lie between them the constants must have opposite signs, so $k = -3$.",
      commonMistakes: [{ answer: 9, feedback: "With $k = 9$ both planes are on the same side of the origin." }],
    },
    {
      type: "numeric",
      id: "tdg4-7-q10",
      variant: "practice",
      question:
        "Find the distance of $(1, 2, 3)$ from the plane through $(1, 0, 0)$, $(0, 1, 0)$ and $(0, 0, 1)$ (to two decimal places).",
      answer: 2.8868,
      tolerance: 0.01,
      hint: "The plane is $x + y + z = 1$.",
      solution: "$\\frac{\\lvert 1 + 2 + 3 - 1\\rvert}{\\sqrt3} = \\frac{5}{\\sqrt3} \\approx 2.89$.",
      commonMistakes: [{ answer: 5, feedback: "Divide by $\\sqrt3$." }],
    },
    {
      type: "quiz",
      id: "tdg4-7-q11",
      variant: "practice",
      question:
        "JEE Advanced. The plane $2x - 3y + 6z = k$ meets the segment joining $(1, 1, 1)$ and $(3, 1, -1)$ (endpoints included) exactly when",
      options: [
        { text: "$-3 \\le k \\le 5$", correct: true, feedback: "$P$ at the endpoints is $5 - k$ and $-3 - k$; they must not have the same strict sign." },
        { text: "$k \\ge 5$", feedback: "For $k > 5$ both values are negative: same side." },
        { text: "$k \\le -3$ or $k \\ge 5$", feedback: "That is where the endpoints are on the same side (or touching)." },
        { text: "$-5 \\le k \\le 3$", feedback: "Recompute: at $(3, 1, -1)$, $6 - 3 - 6 = -3$." },
      ],
      hint: "Substitute both endpoints into $2x - 3y + 6z - k$ and require $(5 - k)(-3 - k) \\le 0$.",
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-4-mastery",
  title: "4.8 · Chapter 4 Mastery",
  position: 8,
  blocks: blocks([
    {
      type: "text",
      content:
        "No new theory here, and no formula sheet. Every question below can be rebuilt from one picture: a plane is a point plus a normal, and the signed value $P(x_1, y_1, z_1) = ax_1 + by_1 + cz_1 + d$ measures side and distance. If you are stuck, draw the plane edge-on with its normal arrow.",
    },
    { type: "heading", text: "Reconstruct it" },
    {
      type: "callout",
      variant: "tip",
      title: "Rebuild the chapter from the normal",
      content:
        "Without notes:\n\n1. Why is $(\\vec r - \\vec a)\\cdot\\vec n = 0$ the plane through $A$ with normal $\\vec n$, and why are the coefficients of $ax + by + cz + d = 0$ a normal?\n2. Where does $\\vec r\\cdot\\hat n = p$ come from, and how do you choose the sign when dividing by $\\sqrt{a^2 + b^2 + c^2}$?\n3. Why is $\\overrightarrow{AB}\\times\\overrightarrow{AC}$ a normal to the plane $ABC$, and what does a zero triple product say about four points?\n4. Derive $\\frac xa + \\frac yb + \\frac zc = 1$ and $\\frac{1}{p^2} = \\frac{1}{a^2} + \\frac{1}{b^2} + \\frac{1}{c^2}$.\n5. Why does $P_1 + \\lambda P_2 = 0$ contain the line $P_1 = 0 = P_2$ for every $\\lambda$?\n6. Why is the angle between planes the angle between normals, and why is the distance $\\frac{\\lvert P(x_1, y_1, z_1)\\rvert}{\\lvert\\vec n\\rvert}$?",
    },
    {
      type: "interactive",
      config: {
        component: "tdg-space-viewer",
        mode: "plane",
        plane: [2, -1, 2, -11],
        p: [1, 3, 4],
        show: ["normal", "foot", "image", "intercepts"],
        sliders: [
          { name: "px", min: -4, max: 6, step: 1, initial: 1 },
          { name: "py", min: -4, max: 6, step: 1, initial: 3 },
          { name: "pz", min: -4, max: 6, step: 1, initial: 4 },
          { name: "d", min: -15, max: 15, step: 1, initial: -11 },
        ],
        caption:
          "The plane $2x - y + 2z = 11$ of question 1. Before moving anything, predict its distance from the origin, its intercepts and the distance of $P(1, 3, 4)$. Then change $d$ and predict again: which readouts change and which stay fixed?",
      },
    },
    { type: "heading", text: "Mastery questions" },
    {
      type: "numeric",
      id: "tdg4-8-q1",
      variant: "mastery",
      question:
        "Find the distance from the origin of the plane through $(2, -1, 3)$ perpendicular to the vector $2\\hat i - \\hat j + 2\\hat k$ (to two decimal places).",
      answer: 3.6667,
      tolerance: 0.01,
      hint: "Lesson 4.1 for the plane, Lesson 4.2 for its distance from O.",
      solution: "$2x - y + 2z = 4 + 1 + 6 = 11$; distance $\\frac{11}{3} \\approx 3.67$.",
      commonMistakes: [{ answer: 11, feedback: "Divide by $\\lvert\\vec n\\rvert = 3$." }],
    },
    {
      type: "quiz",
      id: "tdg4-8-q2",
      variant: "mastery",
      question: "The normal form of $x + 2y - 2z + 9 = 0$ is",
      options: [
        { text: "$-\\frac13 x - \\frac23 y + \\frac23 z = 3$", correct: true, feedback: "$x + 2y - 2z = -9$; divide by $-3$." },
        { text: "$\\frac13 x + \\frac23 y - \\frac23 z = -3$", feedback: "The right side must be non-negative." },
        { text: "$-x - 2y + 2z = 9$", feedback: "The coefficients must be direction cosines; divide by 3." },
        { text: "$\\frac13 x + \\frac23 y - \\frac23 z = 3$", feedback: "That is the plane $x + 2y - 2z = 9$, a different plane." },
      ],
      hint: "Lesson 4.2: constant to the right, divide by $\\pm 3$ so that $p \\ge 0$.",
    },
    {
      type: "numeric",
      id: "tdg4-8-q3",
      variant: "mastery",
      question:
        "Find the distance of $(1, 1, 1)$ from the plane through $(0, 1, 1)$, $(1, 1, 2)$ and $(-1, 2, -2)$ (to two decimal places).",
      answer: 0.4082,
      tolerance: 0.005,
      hint: "Lesson 4.3 for the plane, then Lesson 4.7.",
      solution: "Arrows $(1, 0, 1)$ and $(-1, 1, -3)$ have cross product $(-1, 2, 1)$. Through $(0, 1, 1)$: $-x + 2y + z = 3$, i.e. $x - 2y - z + 3 = 0$. At $(1, 1, 1)$: $\\frac{\\lvert 1 - 2 - 1 + 3\\rvert}{\\sqrt6} = \\frac{1}{\\sqrt6} \\approx 0.41$.",
      commonMistakes: [{ answer: 1, feedback: "Divide by $\\sqrt{1 + 4 + 1} = \\sqrt6$." }],
    },
    {
      type: "numeric",
      id: "tdg4-8-q4",
      variant: "mastery",
      question: "Find the volume of the tetrahedron cut off from the coordinate axes by $3x + 4y + 6z = 24$.",
      answer: 32,
      hint: "Lesson 4.4: intercepts, then $\\frac16\\lvert abc\\rvert$.",
      solution: "Intercepts $8$, $6$, $4$. Volume $\\frac{8 \\cdot 6 \\cdot 4}{6} = 32$.",
      commonMistakes: [{ answer: 192, feedback: "That is $abc$; take one sixth." }],
    },
    {
      type: "numeric",
      id: "tdg4-8-q5",
      variant: "mastery",
      question:
        "JEE Main. A variable plane at a fixed distance $p$ from the origin meets the axes at $A$, $B$, $C$, and the centroid of triangle $ABC$ moves on $x^{-2} + y^{-2} + z^{-2} = 16$. Find $p$.",
      answer: 0.75,
      tolerance: 0.001,
      hint: "Lesson 4.4: the locus is $x^{-2} + y^{-2} + z^{-2} = \\frac{9}{p^2}$.",
      solution: "$\\frac{9}{p^2} = 16$, so $p = \\frac34$.",
      commonMistakes: [{ answer: 0.25, tolerance: 0.001, feedback: "That is $\\frac{1}{\\sqrt{16}}$; the triangle centroid brings a factor 9." }],
    },
    {
      type: "numeric",
      id: "tdg4-8-q6",
      variant: "mastery",
      question:
        "The plane through the intersection of $2x + 3y - z + 1 = 0$ and $x + y - 2z + 3 = 0$ that is perpendicular to $3x - y - 2z = 4$ is $7x + 13y + 4z = d$. Find $d$.",
      answer: 9,
      hint: "Lesson 4.5: normal $(2 + \\lambda, 3 + \\lambda, -1 - 2\\lambda)$ dotted with $(3, -1, -2)$ is 0.",
      solution: "$5 + 6\\lambda = 0$, so $\\lambda = -\\frac56$. $6P_1 - 5P_2 = 7x + 13y + 4z - 9 = 0$, so $d = 9$.",
      commonMistakes: [{ answer: -9, feedback: "Move $-9$ to the right: $d = +9$." }],
    },
    {
      type: "numeric",
      id: "tdg4-8-q7",
      variant: "mastery",
      question: "Find the angle, in degrees, between the planes $3x - 4y + 5z = 0$ and $2x - y - 2z = 5$.",
      answer: 90,
      unit: "degrees",
      hint: "Lesson 4.6: compute $\\vec n_1\\cdot\\vec n_2$ first.",
      solution: "$6 + 4 - 10 = 0$: the planes are perpendicular.",
      commonMistakes: [{ answer: 0, feedback: "A zero dot product means perpendicular normals, i.e. $90^\\circ$." }],
    },
    {
      type: "quiz",
      id: "tdg4-8-q8",
      variant: "mastery",
      multiple: true,
      question: "For the planes $x - 2y + 2z = 3$ and $2x - 4y + 4z = -3$, which statements are true? Select all that apply.",
      options: [
        { text: "They are parallel", correct: true, feedback: "Normals in ratio $1 : 2$." },
        { text: "The distance between them is 1.5", correct: true, feedback: "Halve the second: $x - 2y + 2z + 1.5 = 0$; $\\frac{\\lvert -3 - 1.5\\rvert}{3} = 1.5$." },
        { text: "The origin lies between them", correct: true, feedback: "With matching normals the constants $-3$ and $+1.5$ have opposite signs." },
        { text: "The distance between them is 2", feedback: "That compares $3$ with $-3$ without halving." },
        { text: "They are perpendicular", feedback: "Their normals are parallel, not perpendicular." },
      ],
      hint: "Lessons 4.6 and 4.7: match the normals before comparing constants.",
    },
    {
      type: "numeric",
      id: "tdg4-8-q9",
      variant: "mastery",
      question: "Find the distance of $(2, 1, -1)$ from $3x - 4y + 12z = 5$ (to two decimal places).",
      answer: 1.1538,
      tolerance: 0.01,
      hint: "Lesson 4.7.",
      solution: "$\\frac{\\lvert 6 - 4 - 12 - 5\\rvert}{13} = \\frac{15}{13} \\approx 1.15$.",
      commonMistakes: [{ answer: 15, feedback: "Divide by $\\sqrt{9 + 16 + 144} = 13$." }],
    },
    {
      type: "quiz",
      id: "tdg4-8-q10",
      variant: "mastery",
      question:
        "JEE Advanced. Of the two bisector planes of $2x + y + 2z - 6 = 0$ and $x - 2y + 2z + 3 = 0$, the one that bisects the angle in which the origin lies is",
      options: [
        { text: "$3x - y + 4z - 3 = 0$", correct: true, feedback: "Constants positive: $-2x - y - 2z + 6$ and $x - 2y + 2z + 3$, both normals of length 3; equate with the $+$ sign." },
        { text: "$x + 3y - 9 = 0$", feedback: "That is the other bisector." },
        { text: "$3x - y + 4z + 3 = 0$", feedback: "Recheck the constant: $6 - 3 = 3$ moves across as $-3$." },
        { text: "$x + 3y + 9 = 0$", feedback: "Not equidistant: at $(-9, 0, 0)$ the distances are 8 and 2." },
      ],
      hint: "Lesson 4.7: make both constants positive, then take the $+$ sign.",
    },
    {
      type: "numeric",
      id: "tdg4-8-q11",
      variant: "mastery",
      question:
        "The plane through the intersection of $x + y + z = 1$ and $2x + 3y + 4z = 5$ that passes through $(1, 2, 3)$ meets the x-axis at $x = k$. Find $k$.",
      answer: -2,
      hint: "Lesson 4.5: at $(1, 2, 3)$, $P_1 = 5$ and $P_2 = 15$.",
      solution: "$5 + 15\\lambda = 0$, so $\\lambda = -\\frac13$, and $3P_1 - P_2 = x - z + 2 = 0$. On the x-axis $x = -2$.",
      commonMistakes: [{ answer: 2, feedback: "$x + 2 = 0$ gives $x = -2$." }],
    },
    {
      type: "numeric",
      id: "tdg4-8-q12",
      variant: "mastery",
      question: "The points $(1, 0, 0)$, $(0, 1, 0)$, $(0, 0, 1)$ and $(k, k, k)$ are coplanar. Find $k$. (A fraction is fine.)",
      answer: 0.3333,
      tolerance: 0.005,
      hint: "Lesson 4.3: the first three points determine the plane.",
      solution: "The plane is $x + y + z = 1$, so $3k = 1$ and $k = \\frac13$.",
      commonMistakes: [{ answer: 3, feedback: "$3k = 1$, so $k = \\frac13$." }],
    },
    {
      type: "quiz",
      id: "tdg4-8-q13",
      variant: "mastery",
      multiple: true,
      question:
        "Which statements hold for **every** plane $ax + by + cz + d = 0$ ($a, b, c$ not all zero)? Select all that apply.",
      options: [
        { text: "$(a, b, c)$ is a normal to the plane", correct: true, feedback: "Lesson 4.1." },
        { text: "If $d = 0$ the plane passes through the origin", correct: true, feedback: "$(0, 0, 0)$ satisfies it." },
        { text: "If $c = 0$ the plane is parallel to (or contains) the z-axis", correct: true, feedback: "The normal is perpendicular to $\\hat k$." },
        { text: "Its x-intercept is $a$", feedback: "It is $-\\frac da$ (when $a \\ne 0$)." },
        { text: "Its distance from the origin is $\\frac{d}{\\sqrt{a^2 + b^2 + c^2}}$", feedback: "A distance needs the modulus: $\\frac{\\lvert d\\rvert}{\\sqrt{a^2 + b^2 + c^2}}$." },
      ],
      hint: "Lessons 4.1, 4.2 and 4.4.",
    },
    {
      type: "numeric",
      id: "tdg4-8-q14",
      variant: "mastery",
      question:
        "The foot of the perpendicular from the origin to $2x + 3y + 6z = 49$ is $(\\alpha, \\beta, \\gamma)$. Find $\\alpha + \\beta + \\gamma$.",
      answer: 11,
      hint: "Lesson 4.2: the foot is $\\frac{-d}{a^2 + b^2 + c^2}(a, b, c)$ for the plane written as $\\ldots + d = 0$.",
      solution: "$\\frac{49}{49}(2, 3, 6) = (2, 3, 6)$, sum 11. Check: $4 + 9 + 36 = 49$.",
      commonMistakes: [{ answer: 7, feedback: "7 is the distance $\\frac{49}{7}$; the question asks for the foot." }],
    },
    {
      type: "numeric",
      id: "tdg4-8-q15",
      variant: "mastery",
      question:
        "JEE Advanced. The plane $P_3$ contains the line of intersection of $x + 2y - z + 1 = 0$ and $2x - y + z - 1 = 0$ and passes through $(0, 1, 1)$. Find the distance of $(1, 1, 1)$ from $P_3$ (to two decimal places).",
      answer: 0.9806,
      tolerance: 0.005,
      hint: "Lesson 4.5 then 4.7: at $(0, 1, 1)$, $P_1 = 2$ and $P_2 = -1$.",
      solution: "$2 - \\lambda = 0$, so $\\lambda = 2$: $P_1 + 2P_2 = 5x + z - 1 = 0$. Distance of $(1, 1, 1)$: $\\frac{\\lvert 5 + 1 - 1\\rvert}{\\sqrt{26}} = \\frac{5}{\\sqrt{26}} \\approx 0.98$.",
      commonMistakes: [{ answer: 5, feedback: "Divide by $\\sqrt{25 + 1} = \\sqrt{26}$." }],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Where next",
      content:
        "You now have lines (Chapters 2 and 3) and planes (this chapter) as separate objects. Chapter 5 puts them in one picture: the angle between a line and a plane, where a line pierces a plane, the foot and image of a point in a plane (walk along the normal, using exactly the $P(x_1, y_1, z_1)$ of Lesson 4.7), the plane containing two coplanar lines, and the projection of a line on a plane. The family $P_1 + \\lambda P_2 = 0$ returns too: a line given as two planes is exactly the spine of such a family.",
    },
  ]),
};

export const tdgChapter4Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lesson07,
  lessonMastery,
];
