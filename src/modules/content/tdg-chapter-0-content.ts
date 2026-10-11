import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Three-Dimensional Geometry Chapter 0 — Coordinates in Space. Three
 * mutually perpendicular axes locate every point by three signed
 * distances: octants and their sign patterns, points on the axes and
 * coordinate planes, feet of perpendiculars and distances from the axes;
 * the distance formula (Pythagoras twice), the section formula (internal
 * and external, the k : 1 method), centroids of a triangle and of a
 * tetrahedron, the incentre, and the projections of a segment on the axes
 * and on the coordinate planes.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "axes-octants-and-coordinates",
  title: "0.1 · Axes, Octants and Coordinates",
  position: 1,
  blocks: blocks([
    {
      type: "text",
      content:
        "On a sheet of paper two numbers fix a point. Stand in the corner of a room and you need three: how far along one wall, how far along the other, and how high above the floor. Three-dimensional geometry starts by making that corner precise: three mutually perpendicular lines through one point $O$, and every point in space described by three signed numbers $(x, y, z)$.",
    },
    {
      type: "text",
      content:
        "You met these axes in vector algebra, where $\\hat i$, $\\hat j$, $\\hat k$ point along them and a point $P(x, y, z)$ has position vector $x\\hat i + y\\hat j + z\\hat k$. This chapter looks at the same frame through the eyes of coordinate geometry: which region a point is in, how far it is from the axes and planes, and how distance and division work.",
    },
    { type: "heading", text: "Three axes and three coordinate planes" },
    {
      type: "text",
      content:
        "Take the x-axis and y-axis on the floor, as in the plane, and stand the z-axis straight up at $O$. The system is **right-handed**: curl the fingers of your right hand from the positive x-axis towards the positive y-axis and your thumb points along the positive z-axis.\n\nEach pair of axes spans a **coordinate plane**:\n\n- the **xy-plane** (the floor) contains the x- and y-axes; on it $z = 0$;\n- the **yz-plane** contains the y- and z-axes; on it $x = 0$;\n- the **zx-plane** contains the z- and x-axes; on it $y = 0$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Coordinates of a point",
      content:
        "Drop perpendiculars from $P$ to the three coordinate planes. Then\n\n- $x$ is the **signed distance of $P$ from the yz-plane**,\n- $y$ is the signed distance from the zx-plane,\n- $z$ is the signed distance from the xy-plane.\n\nEach sign says on which side of that plane $P$ sits. Equivalently, $P$ is the far corner of a box with one corner at $O$ and edges $x$, $y$, $z$ along the axes.",
    },
    {
      type: "interactive",
      config: {
        component: "tdg-space-viewer",
        mode: "points",
        a: [3, -4, 5],
        b: [-2, 3, 2],
        show: ["box"],
        caption:
          "Each point sits at the far corner of its coordinate box. Rotate the view until you are looking straight down the z-axis: the box collapses to the plane picture $(x, y)$, and the height $z$ disappears into your line of sight. Then look along the x-axis and read off $(y, z)$.",
      },
    },
    { type: "heading", text: "Eight octants" },
    {
      type: "text",
      content:
        "The three coordinate planes cut space into eight regions called **octants**, just as two axes cut the plane into four quadrants. An octant is fixed by the signs of $x$, $y$ and $z$; there are $2 \\times 2 \\times 2 = 8$ sign patterns.",
    },
    {
      type: "table",
      headers: ["Octant", "I", "II", "III", "IV", "V", "VI", "VII", "VIII"],
      rows: [
        ["$x$", "$+$", "$-$", "$-$", "$+$", "$+$", "$-$", "$-$", "$+$"],
        ["$y$", "$+$", "$+$", "$-$", "$-$", "$+$", "$+$", "$-$", "$-$"],
        ["$z$", "$+$", "$+$", "$+$", "$+$", "$-$", "$-$", "$-$", "$-$"],
      ],
    },
    {
      type: "text",
      content:
        "Octants I to IV sit above the floor in the order of the four quadrants; V to VIII sit directly below them. Books number the octants differently, so in this course we name an octant by its **sign pattern**, for example $(+, -, +)$, which never depends on a convention.",
    },
    { type: "heading", text: "Points on the axes and coordinate planes" },
    {
      type: "text",
      content:
        "A coordinate that is zero puts the point on a boundary:\n\n- one zero coordinate: the point is on a coordinate plane. $(0, 3, -2)$ is on the yz-plane because $x = 0$.\n- two zero coordinates: the point is on an axis. $(0, 0, 5)$ is on the z-axis, which lies in **both** the yz-plane and the zx-plane.\n- three zeros: the origin.\n\nSo the x-axis is described by **two** equations, $y = 0$ and $z = 0$, while the equation $x = 0$ alone is a whole plane.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"$x = 0$ is the x-axis\"",
      content:
        "In the plane, $x = 0$ is the y-axis, and students carry the habit over. In space, $x = 0$ is the **yz-plane**: every point $(0, y, z)$. A single equation in space usually describes a surface, not a line; a line needs two equations at once.",
    },
    { type: "heading", text: "Feet of perpendiculars and distances from the axes" },
    {
      type: "text",
      content:
        "From $P(x, y, z)$:\n\n- the foot of the perpendicular on the **xy-plane** is $(x, y, 0)$, and $P$ is $\\lvert z\\rvert$ from that plane; similarly $(0, y, z)$ and $\\lvert x\\rvert$ for the yz-plane, $(x, 0, z)$ and $\\lvert y\\rvert$ for the zx-plane;\n- the foot of the perpendicular on the **x-axis** is $(x, 0, 0)$, and the distance from $P$ to it is $\\sqrt{y^2 + z^2}$, because the step from $(x, 0, 0)$ to $P$ is $(0, y, z)$.",
    },
    {
      type: "math",
      latex:
        "d_x = \\sqrt{y^2 + z^2}, \\qquad d_y = \\sqrt{z^2 + x^2}, \\qquad d_z = \\sqrt{x^2 + y^2}",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the x-coordinate is the distance from the x-axis\"",
      content:
        "The x-coordinate measures how far $P$ is from the **yz-plane**, and it is the coordinate **along** the x-axis. The distance from the x-axis uses the **other two** coordinates: $\\sqrt{y^2 + z^2}$. A point far out along the x-axis, like $(100, 0, 0)$, is at distance 0 from the x-axis.",
    },
    { type: "heading", text: "Reflections in the coordinate planes" },
    {
      type: "text",
      content:
        "Reflecting in a coordinate plane flips the one coordinate that measures distance from that plane and keeps the other two. In the xy-plane: $(x, y, z) \\to (x, y, -z)$. Reflecting in an **axis** flips the two coordinates off that axis: in the x-axis, $(x, y, z) \\to (x, -y, -z)$. Reflecting in the origin flips all three.",
    },
    { type: "heading", text: "Worked examples" },
    {
      type: "worked-example",
      id: "tdg0-1-we1",
      title: "Worked example 1: reading a point",
      problem:
        "For $P(3, -4, 5)$ give its octant (as a sign pattern), the feet of the perpendiculars to the three coordinate planes and to the three axes, and its distances from the three coordinate planes.",
      steps: [
        { text: "Signs: $x > 0$, $y < 0$, $z > 0$, so $P$ is in the octant $(+, -, +)$ (octant IV in the table above)." },
        { text: "Feet on the coordinate planes: kill one coordinate at a time. xy-plane $(3, -4, 0)$, yz-plane $(0, -4, 5)$, zx-plane $(3, 0, 5)$." },
        { text: "Feet on the axes: keep one coordinate. $(3, 0, 0)$, $(0, -4, 0)$, $(0, 0, 5)$." },
        { text: "Distances from the planes are the absolute coordinates: 5 from the xy-plane, 3 from the yz-plane, 4 from the zx-plane." },
      ],
      answer: "Octant $(+, -, +)$; plane feet $(3, -4, 0)$, $(0, -4, 5)$, $(3, 0, 5)$; axis feet $(3, 0, 0)$, $(0, -4, 0)$, $(0, 0, 5)$; distances 5, 3, 4.",
    },
    {
      type: "worked-example",
      id: "tdg0-1-we2",
      title: "Worked example 2: distances from the axes",
      problem: "Find the distances of $P(3, -4, 5)$ from the x-, y- and z-axes.",
      steps: [
        {
          text: "From the x-axis the foot is $(3, 0, 0)$, so the step to $P$ is $(0, -4, 5)$. *Why this step:* the distance from an axis ignores the coordinate along that axis.",
          latex: "d_x = \\sqrt{(-4)^2 + 5^2} = \\sqrt{41}",
        },
        { latex: "d_y = \\sqrt{3^2 + 5^2} = \\sqrt{34}, \\qquad d_z = \\sqrt{3^2 + (-4)^2} = 5" },
      ],
      answer: "$\\sqrt{41}$, $\\sqrt{34}$ and $5$.",
    },
    {
      type: "worked-example",
      id: "tdg0-1-we3",
      title: "Worked example 3: reflections",
      problem: "Reflect $Q(2, -3, 4)$ in the xy-plane, in the yz-plane, in the z-axis and in the origin.",
      steps: [
        { text: "In the xy-plane only $z$ flips: $(2, -3, -4)$." },
        { text: "In the yz-plane only $x$ flips: $(-2, -3, 4)$." },
        { text: "In the z-axis the two coordinates off the axis flip: $(-2, 3, 4)$. *Why this step:* the foot on the z-axis is $(0, 0, 4)$, and the image is as far beyond it as $Q$ is before it." },
        { text: "In the origin all three flip: $(-2, 3, -4)$." },
      ],
      answer: "$(2, -3, -4)$, $(-2, -3, 4)$, $(-2, 3, 4)$, $(-2, 3, -4)$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "tdg0-1-q1",
      variant: "practice",
      question: "Find the distance of $P(2, -6, 3)$ from the z-axis (to two decimal places).",
      answer: 6.3246,
      tolerance: 0.01,
      hint: "The distance from the z-axis uses the x- and y-coordinates only.",
      solution: "$d_z = \\sqrt{2^2 + (-6)^2} = \\sqrt{40} = 2\\sqrt{10} \\approx 6.32$.",
      commonMistakes: [
        { answer: 3, feedback: "3 is the distance from the xy-plane, not from the z-axis." },
        { answer: 7, feedback: "7 is the distance from the origin, $\\sqrt{4 + 36 + 9}$. Drop the $z$ term." },
      ],
    },
    {
      type: "quiz",
      id: "tdg0-1-q2",
      variant: "practice",
      question: "Which point lies in the same octant as $(-1, 4, -2)$?",
      options: [
        { text: "$(-5, 1, -3)$", correct: true, feedback: "Same sign pattern $(-, +, -)$." },
        { text: "$(5, -1, -3)$", feedback: "Pattern $(+, -, -)$: the first two signs differ." },
        { text: "$(-5, -1, 3)$", feedback: "Pattern $(-, -, +)$." },
        { text: "$(-5, 1, 3)$", feedback: "Pattern $(-, +, +)$: this one is above the xy-plane." },
      ],
      hint: "An octant is a sign pattern. Compare the signs, not the sizes.",
    },
    {
      type: "quiz",
      id: "tdg0-1-q3",
      variant: "practice",
      multiple: true,
      question: "Which points lie on the yz-plane? Select all that apply.",
      options: [
        { text: "$(0, 3, -2)$", correct: true, feedback: "$x = 0$." },
        { text: "$(0, 0, 5)$", correct: true, feedback: "It is on the z-axis, and the z-axis lies in the yz-plane." },
        { text: "$(0, 0, 0)$", correct: true, feedback: "The origin lies on every coordinate plane." },
        { text: "$(3, 0, 0)$", feedback: "This is on the x-axis, which meets the yz-plane only at $O$." },
        { text: "$(2, 3, 0)$", feedback: "$z = 0$ puts it on the xy-plane; its $x$ is 2." },
      ],
      hint: "The yz-plane is the set of points with $x = 0$.",
    },
    {
      type: "numeric",
      id: "tdg0-1-q4",
      variant: "practice",
      question: "How far is $(3, -4, 12)$ from the xy-plane?",
      answer: 12,
      hint: "The z-coordinate is the signed distance from the xy-plane.",
      solution: "$\\lvert z\\rvert = 12$.",
      commonMistakes: [
        { answer: 13, feedback: "13 is the distance from the origin." },
        { answer: 5, feedback: "5 is the distance from the z-axis, $\\sqrt{9 + 16}$." },
      ],
    },
    {
      type: "quiz",
      id: "tdg0-1-q5",
      variant: "concept",
      question: "The x-coordinate of a point $P$ is",
      options: [
        { text: "its signed distance from the yz-plane", correct: true, feedback: "The yz-plane is $x = 0$; moving away from it changes only $x$." },
        { text: "its distance from the x-axis", feedback: "That is $\\sqrt{y^2 + z^2}$, which does not involve $x$ at all." },
        { text: "its signed distance from the zx-plane", feedback: "That is $y$: the zx-plane is $y = 0$." },
        { text: "its distance from the origin", feedback: "That is $\\sqrt{x^2 + y^2 + z^2}$." },
      ],
      hint: "Which coordinate plane has the equation $x = 0$?",
    },
    {
      type: "numeric",
      id: "tdg0-1-q6",
      variant: "practice",
      question: "The foot of the perpendicular from $(4, -3, 7)$ to the y-axis is $(0, b, 0)$. Find $b$.",
      answer: -3,
      hint: "On the y-axis only the y-coordinate survives.",
      solution: "The foot keeps the coordinate along the axis: $(0, -3, 0)$, so $b = -3$.",
      commonMistakes: [
        { answer: 3, feedback: "The foot keeps the sign: $P$ is on the negative side of the zx-plane." },
        { answer: 0, feedback: "That would be the origin; the foot keeps $P$'s coordinate along the axis, so it is at $y = -3$." },
      ],
    },
    {
      type: "numeric",
      id: "tdg0-1-q7",
      variant: "practice",
      question: "The image of $(2, -5, 3)$ in the zx-plane is $(a, b, c)$. Find $a + b + c$.",
      answer: 10,
      hint: "The zx-plane is $y = 0$: only $y$ flips.",
      solution: "Image $(2, 5, 3)$, so $a + b + c = 10$.",
      commonMistakes: [
        { answer: 0, feedback: "That is the sum for the original point. Flip the y-coordinate." },
        { answer: -6, feedback: "You flipped $z$, which is the reflection in the xy-plane." },
      ],
    },
    {
      type: "quiz",
      id: "tdg0-1-q8",
      variant: "practice",
      multiple: true,
      question: "For $P(1, -2, 3)$, which statements are true? Select all that apply.",
      options: [
        { text: "$P$ is 3 units from the xy-plane", correct: true, feedback: "$\\lvert z\\rvert = 3$." },
        { text: "$P$ is $\\sqrt{13}$ units from the x-axis", correct: true, feedback: "$\\sqrt{(-2)^2 + 3^2} = \\sqrt{13}$." },
        { text: "The foot of the perpendicular from $P$ to the z-axis is $(0, 0, 3)$", correct: true, feedback: "Keep $z$, kill $x$ and $y$." },
        { text: "$P$ lies in the octant $(+, +, +)$", feedback: "$y = -2 < 0$: the octant is $(+, -, +)$." },
        { text: "$P$ is 2 units from the yz-plane", feedback: "The distance from the yz-plane is $\\lvert x\\rvert = 1$." },
      ],
      hint: "Distance from a plane: one coordinate. Distance from an axis: the other two.",
    },
    {
      type: "numeric",
      id: "tdg0-1-q9",
      variant: "concept",
      question: "In how many octants do the points with $xyz < 0$ lie?",
      answer: 4,
      hint: "The product is negative when an odd number of the coordinates are negative.",
      solution: "Exactly one negative coordinate: 3 patterns. All three negative: 1 pattern. Total 4 octants.",
      commonMistakes: [
        { answer: 1, feedback: "All three negative is only one way. One negative and two positive also gives a negative product." },
        { answer: 3, feedback: "You counted one negative coordinate; add the pattern $(-, -, -)$." },
      ],
    },
    {
      type: "quiz",
      id: "tdg0-1-q10",
      variant: "practice",
      question: "The distance of $P(a, b, c)$ from the x-axis is",
      options: [
        { text: "$\\sqrt{b^2 + c^2}$", correct: true, feedback: "The foot is $(a, 0, 0)$; the step to $P$ is $(0, b, c)$." },
        { text: "$\\lvert a\\rvert$", feedback: "$\\lvert a\\rvert$ is the distance from the yz-plane." },
        { text: "$\\sqrt{a^2 + b^2}$", feedback: "That is the distance from the z-axis." },
        { text: "$\\sqrt{a^2 + c^2}$", feedback: "That is the distance from the y-axis." },
      ],
      hint: "Find the foot on the x-axis first.",
    },
    {
      type: "numeric",
      id: "tdg0-1-q11",
      variant: "practice",
      question:
        "JEE Main. The distances of a point $P$ from the x-, y- and z-axes are $\\sqrt5$, $\\sqrt{10}$ and $\\sqrt{13}$. Find $OP$ (to two decimal places).",
      answer: 3.7417,
      tolerance: 0.01,
      hint: "Square and add the three distances: each coordinate squared appears twice.",
      solution:
        "$(y^2 + z^2) + (z^2 + x^2) + (x^2 + y^2) = 5 + 10 + 13 = 28$, so $2(x^2 + y^2 + z^2) = 28$ and $OP = \\sqrt{14} \\approx 3.74$. (Indeed $x^2 = 9$, $y^2 = 4$, $z^2 = 1$.)",
      commonMistakes: [
        { answer: 5.2915, tolerance: 0.01, feedback: "$\\sqrt{28}$ forgets that each square appears twice in the sum. Halve first." },
        { answer: 14, feedback: "14 is $OP^2$; take the square root." },
      ],
    },
    {
      type: "numeric",
      id: "tdg0-1-q12",
      variant: "practice",
      question:
        "JEE Main. $A$, $B$, $C$ are the feet of the perpendiculars from $P(2, 3, 6)$ to the xy-, yz- and zx-planes. Find the area of triangle $ABC$ (to two decimal places).",
      answer: 11.225,
      tolerance: 0.01,
      hint: "$A(2, 3, 0)$, $B(0, 3, 6)$, $C(2, 0, 6)$. Use $\\frac12\\lvert\\overrightarrow{AB} \\times \\overrightarrow{AC}\\rvert$ from vector algebra.",
      solution:
        "$\\overrightarrow{AB} = (-2, 0, 6)$, $\\overrightarrow{AC} = (0, -3, 6)$, and $\\overrightarrow{AB} \\times \\overrightarrow{AC} = (18, 12, 6)$ with length $\\sqrt{504} = 6\\sqrt{14}$. Area $= 3\\sqrt{14} \\approx 11.22$.",
      commonMistakes: [
        { answer: 22.45, tolerance: 0.02, feedback: "That is the parallelogram. The triangle is half of $\\lvert\\overrightarrow{AB} \\times \\overrightarrow{AC}\\rvert$." },
      ],
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "the-distance-formula-in-space",
  title: "0.2 · The Distance Formula",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "How long is the diagonal of a shoebox? In the plane the distance between two points is Pythagoras on the coordinate differences. In space we use Pythagoras **twice**: once across the floor of the box, then once up its height.",
    },
    { type: "heading", text: "Pythagoras twice" },
    {
      type: "text",
      content:
        "Let $A(x_1, y_1, z_1)$ and $B(x_2, y_2, z_2)$. Build the box with $AB$ as its long diagonal and edges parallel to the axes. Its edges are $\\lvert\\Delta x\\rvert = \\lvert x_2 - x_1\\rvert$, $\\lvert\\Delta y\\rvert$, $\\lvert\\Delta z\\rvert$.\n\n1. Across the bottom face, from $A$ to the corner $C$ directly below $B$: $AC^2 = \\Delta x^2 + \\Delta y^2$.\n2. The edge $CB$ is vertical, so triangle $ACB$ has a right angle at $C$: $AB^2 = AC^2 + \\Delta z^2$.",
    },
    {
      type: "math",
      latex: "AB = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2 + (z_2 - z_1)^2}",
    },
    {
      type: "text",
      content:
        "In vector language this is just $\\lvert\\overrightarrow{AB}\\rvert = \\lvert\\vec b - \\vec a\\rvert$, the magnitude formula from vector algebra applied to the step from $A$ to $B$. The distance from the origin is $OP = \\sqrt{x^2 + y^2 + z^2}$.",
    },
    {
      type: "interactive",
      config: {
        component: "tdg-distance-lab",
        mode: "two-points",
        p1: [1, -2, 3],
        p2: [4, 2, -9],
        caption:
          "Change the coordinates and watch the three differences $\\Delta x$, $\\Delta y$, $\\Delta z$. The distance squares each one, so a sign change in any difference leaves the distance unchanged.",
      },
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"$AB = \\lvert\\Delta x\\rvert + \\lvert\\Delta y\\rvert + \\lvert\\Delta z\\rvert$\"",
      content:
        "Adding the edges gives the length of a path that walks along three edges of the box, which is always at least the straight diagonal. From $(0, 0, 0)$ to $(1, 1, 1)$ the walk is 3 but the diagonal is $\\sqrt3 \\approx 1.73$. Square, add, then take the root.",
    },
    { type: "heading", text: "Using distances" },
    {
      type: "text",
      content:
        "Everything the distance formula did in the plane, it does in space:\n\n- **classify a triangle**: compare $AB^2$, $BC^2$, $CA^2$ (equal sides, or Pythagoras for a right angle);\n- **test collinearity**: $A$, $B$, $C$ are collinear exactly when the largest distance equals the sum of the other two;\n- **find a locus**: write the condition on $P(x, y, z)$ as an equation.",
    },
    {
      type: "worked-example",
      id: "tdg0-2-we1",
      title: "Worked example 1: a distance",
      problem: "Find the distance between $A(1, -2, 3)$ and $B(4, 2, -9)$.",
      steps: [
        { text: "Differences: $\\Delta x = 3$, $\\Delta y = 4$, $\\Delta z = -12$." },
        { latex: "AB = \\sqrt{9 + 16 + 144} = \\sqrt{169} = 13" },
      ],
      answer: "$AB = 13$.",
    },
    {
      type: "worked-example",
      id: "tdg0-2-we2",
      title: "Worked example 2: classifying a triangle",
      problem: "Show that $A(0, 7, 10)$, $B(-1, 6, 6)$ and $C(-4, 9, 6)$ form an isosceles right-angled triangle.",
      steps: [
        { latex: "AB^2 = 1 + 1 + 16 = 18, \\quad BC^2 = 9 + 9 + 0 = 18, \\quad CA^2 = 16 + 4 + 16 = 36" },
        { text: "$AB = BC$, so the triangle is isosceles. *Why this step:* compare squares, so no roots are needed." },
        { text: "$AB^2 + BC^2 = 36 = CA^2$, so by the converse of Pythagoras the angle at $B$ is $90^\\circ$." },
      ],
      answer: "Isosceles with the right angle at $B$.",
    },
    {
      type: "worked-example",
      id: "tdg0-2-we3",
      title: "Worked example 3: collinearity by distances",
      problem: "Are $A(-2, 3, 5)$, $B(1, 2, 3)$ and $C(7, 0, -1)$ collinear?",
      steps: [
        { latex: "AB = \\sqrt{9 + 1 + 4} = \\sqrt{14}, \\quad BC = \\sqrt{36 + 4 + 16} = 2\\sqrt{14}, \\quad AC = \\sqrt{81 + 9 + 36} = 3\\sqrt{14}" },
        { text: "$AB + BC = 3\\sqrt{14} = AC$. *Why this step:* if $B$ were off the segment $AC$, the triangle inequality would make $AB + BC > AC$." },
      ],
      answer: "Yes, collinear, with $B$ between $A$ and $C$.",
    },
    {
      type: "worked-example",
      id: "tdg0-2-we4",
      title: "Worked example 4: the locus of equidistant points",
      problem: "Find the locus of points equidistant from $A(1, 2, 3)$ and $B(3, 2, -1)$.",
      steps: [
        { text: "Let $P(x, y, z)$ satisfy $PA^2 = PB^2$:", latex: "(x - 1)^2 + (y - 2)^2 + (z - 3)^2 = (x - 3)^2 + (y - 2)^2 + (z + 1)^2" },
        { text: "The squares $x^2$, $y^2$, $z^2$ cancel. *Why this step:* this is why the answer is flat, a plane, rather than curved.", latex: "-2x + 1 - 6z + 9 = -6x + 9 + 2z + 1 \\implies 4x - 8z = 0" },
        { text: "So $x - 2z = 0$. Check with the midpoint $(2, 2, 1)$: $2 - 2 = 0$." },
      ],
      answer: "The plane $x - 2z = 0$: the perpendicular bisector plane of $AB$.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Lines in the plane become planes in space",
      content:
        "In the plane the points equidistant from $A$ and $B$ form the perpendicular bisector **line**. In space they form the perpendicular bisector **plane**. Chapter 4 explains why any first-degree equation $ax + by + cz + d = 0$ is a plane; for now, notice that the squares always cancel.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "tdg0-2-q1",
      variant: "practice",
      question: "Find the distance between $(2, -1, 3)$ and $(-4, 1, 0)$.",
      answer: 7,
      hint: "Differences $(-6, 2, -3)$.",
      solution: "$\\sqrt{36 + 4 + 9} = \\sqrt{49} = 7$.",
      commonMistakes: [
        { answer: 11, feedback: "That adds the edges $6 + 2 + 3$. Square, add, then take the root." },
        { answer: 49, feedback: "49 is the square of the distance." },
      ],
    },
    {
      type: "numeric",
      id: "tdg0-2-q2",
      variant: "practice",
      question: "Find the distance of $(6, -2, 3)$ from the origin.",
      answer: 7,
      hint: "$OP = \\sqrt{x^2 + y^2 + z^2}$.",
      solution: "$\\sqrt{36 + 4 + 9} = 7$.",
      commonMistakes: [
        { answer: 11, feedback: "Do not add the coordinates; add their squares." },
        { answer: 6.3246, tolerance: 0.01, feedback: "That is $\\sqrt{40}$, the distance from the z-axis. Include $z^2 = 9$." },
      ],
    },
    {
      type: "quiz",
      id: "tdg0-2-q3",
      variant: "practice",
      question: "The triangle with vertices $A(1, 2, 3)$, $B(2, 3, 1)$ and $C(3, 1, 2)$ is",
      options: [
        { text: "equilateral", correct: true, feedback: "$AB^2 = BC^2 = CA^2 = 6$." },
        { text: "right-angled and isosceles", feedback: "All three squares equal 6, and $6 + 6 \\ne 6$." },
        { text: "scalene", feedback: "Compute the three squared sides: they are all 6." },
        { text: "degenerate (the points are collinear)", feedback: "Equal sides of length $\\sqrt6$ cannot satisfy $AB + BC = AC$." },
      ],
      hint: "Compute $AB^2$, $BC^2$ and $CA^2$.",
    },
    {
      type: "numeric",
      id: "tdg0-2-q4",
      variant: "practice",
      question: "The distance between $P(k, 2, 1)$ and $Q(1, -1, 1)$ is 5. Find the positive value of $k$.",
      answer: 5,
      hint: "$(k - 1)^2 + 9 + 0 = 25$.",
      solution: "$(k - 1)^2 = 16$, so $k - 1 = \\pm4$: $k = 5$ or $k = -3$. The positive value is 5.",
      commonMistakes: [
        { answer: -3, feedback: "$-3$ also works, but it is not positive." },
        { answer: 4, feedback: "$k - 1 = 4$ gives $k = 5$." },
      ],
    },
    {
      type: "quiz",
      id: "tdg0-2-q5",
      variant: "practice",
      multiple: true,
      question: "Which triples of points are collinear? Select all that apply.",
      options: [
        { text: "$(1, 2, 3)$, $(2, 3, 4)$, $(4, 5, 6)$", correct: true, feedback: "Steps $(1, 1, 1)$ and $(3, 3, 3)$: distances $\\sqrt3 + 2\\sqrt3 = 3\\sqrt3$." },
        { text: "$(-1, 0, 2)$, $(1, 1, 1)$, $(5, 3, -1)$", correct: true, feedback: "Steps $(2, 1, -1)$ and $(6, 3, -3)$: distances $\\sqrt6 + 2\\sqrt6 = 3\\sqrt6$." },
        { text: "$(0, 0, 0)$, $(1, 2, 3)$, $(2, 4, 7)$", feedback: "$\\sqrt{14} + \\sqrt{1 + 4 + 16} = \\sqrt{14} + \\sqrt{21} \\approx 8.32$, but the far distance is $\\sqrt{69} \\approx 8.31$. Not equal." },
        { text: "$(1, 1, 1)$, $(2, 2, 1)$, $(3, 3, 2)$", feedback: "The steps $(1, 1, 0)$ and $(2, 2, 1)$ are not in the same direction." },
      ],
      hint: "Check whether the largest distance is the sum of the other two (or whether the steps are proportional).",
    },
    {
      type: "numeric",
      id: "tdg0-2-q6",
      variant: "practice",
      question:
        "The locus of points equidistant from $A(2, 3, -1)$ and $B(4, -1, 3)$ is the plane $x + by + cz = d$. Find $d$.",
      answer: 3,
      hint: "Expand $PA^2 = PB^2$; the squares cancel. Then divide so that the coefficient of $x$ is 1.",
      solution:
        "$-4x - 6y + 2z + 14 = -8x + 2y - 6z + 26$, i.e. $4x - 8y + 8z = 12$, so $x - 2y + 2z = 3$. Check: the midpoint $(3, 1, 1)$ gives $3 - 2 + 2 = 3$.",
      commonMistakes: [
        { answer: 12, feedback: "That is before dividing by 4; the question fixes the x-coefficient at 1." },
        { answer: -3, feedback: "Check the sign with the midpoint $(3, 1, 1)$, which must lie on the plane." },
      ],
    },
    {
      type: "numeric",
      id: "tdg0-2-q7",
      variant: "practice",
      question: "Find the point on the x-axis equidistant from $(1, 2, 3)$ and $(3, 5, -2)$. Give its x-coordinate.",
      answer: 6,
      hint: "Take $P(x, 0, 0)$ and set $PA^2 = PB^2$.",
      solution: "$(x - 1)^2 + 4 + 9 = (x - 3)^2 + 25 + 4$ gives $-2x + 14 = -6x + 38$, so $x = 6$.",
      commonMistakes: [
        { answer: -6, feedback: "Recheck the signs: $4x = 24$ gives $x = +6$." },
        { answer: 2, feedback: "The midpoint's x-coordinate is 2, but the midpoint is not on the x-axis." },
      ],
    },
    {
      type: "quiz",
      id: "tdg0-2-q8",
      variant: "concept",
      question: "A student says the distance from $(1, 2, 3)$ to $(4, 6, 3)$ is $3 + 4 + 0 = 7$. What is the distance?",
      options: [
        { text: "5", correct: true, feedback: "$\\sqrt{9 + 16 + 0} = 5$. The student walked along the edges instead of the diagonal." },
        { text: "7", feedback: "7 is the length of a path along the box edges, longer than the straight line." },
        { text: "25", feedback: "25 is the square of the distance." },
        { text: "$\\sqrt7$", feedback: "Square each difference before adding: $9 + 16 = 25$." },
      ],
      hint: "Square, add, root.",
    },
    {
      type: "numeric",
      id: "tdg0-2-q9",
      variant: "practice",
      question:
        "Find the perimeter of the triangle with vertices $A(0, 4, 1)$, $B(2, 3, -1)$ and $C(4, 5, 0)$ (to two decimal places).",
      answer: 10.2426,
      tolerance: 0.01,
      hint: "Compute the three sides separately.",
      solution: "$AB = \\sqrt{4 + 1 + 4} = 3$, $BC = \\sqrt{4 + 4 + 1} = 3$, $CA = \\sqrt{16 + 1 + 1} = 3\\sqrt2$. Perimeter $= 6 + 3\\sqrt2 \\approx 10.24$. (It is a right isosceles triangle: $9 + 9 = 18$.)",
      commonMistakes: [
        { answer: 6, tolerance: 0.01, feedback: "You left out $CA = 3\\sqrt2$." },
        { answer: 12, tolerance: 0.01, feedback: "$CA = \\sqrt{18}$, not 6." },
      ],
    },
    {
      type: "numeric",
      id: "tdg0-2-q10",
      variant: "practice",
      question:
        "JEE Main. $A(3, 4, 5)$ and $B(-1, 3, -7)$ are fixed. Find the least value of $PA^2 + PB^2$ as $P$ moves through space.",
      answer: 80.5,
      tolerance: 0.01,
      hint: "Expand $PA^2 + PB^2$ and complete the square: the minimum is at the midpoint $M$ of $AB$.",
      solution:
        "$PA^2 + PB^2 = 2x^2 + 2y^2 + 2z^2 - 4x - 14y + 4z + 109 = 2PM^2 + \\frac{AB^2}{2}$, where $M = (1, \\frac72, -1)$. With $AB^2 = 16 + 1 + 144 = 161$, the least value is $\\frac{161}{2} = 80.5$, at $P = M$. (The locus $PA^2 + PB^2 = $ const is a sphere centred at $M$.)",
      commonMistakes: [
        { answer: 161, feedback: "161 is $AB^2$, the value when $P$ is at $A$ or $B$. The midpoint does better." },
        { answer: 40.25, tolerance: 0.01, feedback: "At $M$ each of $PA^2$ and $PB^2$ is $\\frac{161}{4}$; add both." },
      ],
    },
    {
      type: "quiz",
      id: "tdg0-2-q11",
      variant: "practice",
      multiple: true,
      question: "For the triangle with vertices $(1, 0, 0)$, $(0, 1, 0)$ and $(0, 0, 1)$, which statements are true? Select all that apply.",
      options: [
        { text: "It is equilateral", correct: true, feedback: "Each side is $\\sqrt{1 + 1 + 0} = \\sqrt2$." },
        { text: "Each side has length $\\sqrt2$", correct: true, feedback: "For example from $(1, 0, 0)$ to $(0, 1, 0)$: $\\sqrt{1 + 1}$." },
        { text: "Each vertex is 1 unit from the origin", correct: true, feedback: "Each is a unit step along an axis." },
        { text: "It is right-angled", feedback: "$2 + 2 \\ne 2$; all angles are $60^\\circ$." },
        { text: "It lies in a coordinate plane", feedback: "No coordinate is zero at all three vertices." },
      ],
      hint: "Compute the three side lengths.",
    },
    {
      type: "numeric",
      id: "tdg0-2-q12",
      variant: "practice",
      question: "JEE Main. Find the point on the z-axis equidistant from $(1, 5, 7)$ and $(5, 1, -4)$. Give its z-coordinate.",
      answer: 1.5,
      hint: "Take $(0, 0, z)$ and set the squared distances equal.",
      solution: "$1 + 25 + (z - 7)^2 = 25 + 1 + (z + 4)^2$ gives $-14z + 49 = 8z + 16$, so $z = \\frac{33}{22} = 1.5$.",
      commonMistakes: [
        { answer: -1.5, feedback: "Recheck: $-22z = -33$ gives $z = +1.5$." },
      ],
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "the-section-formula-in-space",
  title: "0.3 · The Section Formula",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "Walk from $A$ to $B$ and stop two thirds of the way. In the plane you would find your position with the section formula. In space nothing changes except that there is a third coordinate: each coordinate is divided on its own, because projecting the walk onto any axis divides the shadow in the same ratio.",
    },
    { type: "heading", text: "Internal division" },
    {
      type: "text",
      content:
        "Let $P$ divide $AB$ internally in the ratio $m : n$, so $AP : PB = m : n$ and $\\overrightarrow{AP} = \\frac{m}{m + n}\\overrightarrow{AB}$. In position vectors (vector algebra 2.1):",
    },
    {
      type: "math",
      latex:
        "\\vec p = \\vec a + \\frac{m}{m + n}(\\vec b - \\vec a) = \\frac{m\\vec b + n\\vec a}{m + n} \\implies P = \\left(\\frac{mx_2 + nx_1}{m + n},\\ \\frac{my_2 + ny_1}{m + n},\\ \\frac{mz_2 + nz_1}{m + n}\\right)",
    },
    {
      type: "text",
      content:
        "Coordinate picture of the same fact: drop perpendiculars from $A$, $P$, $B$ to the xy-plane. The feet are collinear and, by similar triangles, divide in the same ratio $m : n$, so the plane section formula gives $x$ and $y$. Doing the same with the yz-plane gives $z$. The **midpoint** is the case $m = n$: $\\left(\\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2}, \\frac{z_1 + z_2}{2}\\right)$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: swapping the weights",
      content:
        "In $\\frac{mx_2 + nx_1}{m + n}$ the weight $m$ goes with $B$, the **far** end from where you start counting. If $P$ is closer to $B$ (that is, $m > n$), $B$ must pull harder. Check every answer: the point dividing in $2 : 1$ is two thirds of the way from $A$, nearer to $B$.",
    },
    { type: "heading", text: "External division" },
    {
      type: "text",
      content:
        "$P$ divides $AB$ **externally** in $m : n$ when $P$ is on the line $AB$ but outside the segment, with $AP : PB = m : n$. Replace $n$ by $-n$:",
    },
    {
      type: "math",
      latex: "P = \\left(\\frac{mx_2 - nx_1}{m - n},\\ \\frac{my_2 - ny_1}{m - n},\\ \\frac{mz_2 - nz_1}{m - n}\\right), \\qquad m \\ne n",
    },
    {
      type: "text",
      content:
        "If $m > n$ the point lies beyond $B$; if $m < n$ it lies before $A$. With $m = n$ there is no such point: no point outside the segment is equally far from both ends.",
    },
    {
      type: "interactive",
      config: {
        component: "tdg-space-viewer",
        mode: "points",
        a: [-2, 1, 3],
        b: [4, -2, 0],
        show: ["section", "external"],
        m: { min: 1, max: 5, step: 1, initial: 2 },
        n: { min: 1, max: 5, step: 1, initial: 1 },
        caption:
          "Move the $m$ and $n$ sliders. The internal point slides between $A$ and $B$; the external point runs off beyond $B$ when $m > n$, beyond $A$ when $m < n$, and disappears when $m = n$.",
      },
    },
    { type: "heading", text: "The k : 1 method" },
    {
      type: "text",
      content:
        "To find the ratio in which a plane or a given point divides $AB$, call the ratio $k : 1$. The dividing point is",
    },
    {
      type: "math",
      latex: "P = \\left(\\frac{kx_2 + x_1}{k + 1},\\ \\frac{ky_2 + y_1}{k + 1},\\ \\frac{kz_2 + z_1}{k + 1}\\right)",
    },
    {
      type: "text",
      content:
        "Impose the condition (for the yz-plane: x-coordinate 0) and solve for $k$. A **positive** $k$ means internal division; a **negative** $k$ means external division in the ratio $\\lvert k\\rvert : 1$. For a coordinate plane the answer is immediate: the yz-plane divides $AB$ in the ratio $k = -\\frac{x_1}{x_2}$.",
    },
    { type: "heading", text: "Worked examples" },
    {
      type: "worked-example",
      id: "tdg0-3-we1",
      title: "Worked example 1: internal division",
      problem: "Find the point dividing the join of $A(2, -3, 4)$ and $B(8, 0, 10)$ internally in the ratio $1 : 2$.",
      steps: [
        { text: "$m = 1$ goes with $B$ and $n = 2$ with $A$:", latex: "P = \\left(\\frac{8 + 4}{3},\\ \\frac{0 - 6}{3},\\ \\frac{10 + 8}{3}\\right) = (4, -2, 6)" },
        { text: "Check: $P$ should be one third of the way from $A$. $\\overrightarrow{AB} = (6, 3, 6)$, and $A + \\frac13(6, 3, 6) = (4, -2, 6)$." },
      ],
      answer: "$(4, -2, 6)$.",
    },
    {
      type: "worked-example",
      id: "tdg0-3-we2",
      title: "Worked example 2: external division",
      problem: "Find the point dividing the join of $A(1, -2, 3)$ and $B(3, 4, -5)$ externally in the ratio $2 : 3$.",
      steps: [
        { latex: "P = \\left(\\frac{2(3) - 3(1)}{2 - 3},\\ \\frac{2(4) - 3(-2)}{2 - 3},\\ \\frac{2(-5) - 3(3)}{2 - 3}\\right) = (-3, -14, 19)" },
        { text: "Check: $m < n$, so $P$ should lie before $A$. Indeed $P = A - 2\\overrightarrow{AB} = (1, -2, 3) - 2(2, 6, -8)$. *Why this step:* the external point is $A + \\frac{m}{m - n}\\overrightarrow{AB}$, here with $\\frac{2}{-1} = -2$." },
      ],
      answer: "$(-3, -14, 19)$.",
    },
    {
      type: "worked-example",
      id: "tdg0-3-we3",
      title: "Worked example 3: where a coordinate plane cuts a segment",
      problem: "In what ratio does the yz-plane divide the join of $A(-2, 4, 7)$ and $B(3, -5, 8)$? Find the point of division.",
      steps: [
        { text: "Let the ratio be $k : 1$. On the yz-plane the x-coordinate is 0:", latex: "\\frac{3k - 2}{k + 1} = 0 \\implies k = \\frac23" },
        { text: "$k > 0$, so the division is internal, in the ratio $2 : 3$." },
        { latex: "y = \\frac{-5 \\cdot \\frac23 + 4}{\\frac53} = \\frac25, \\qquad z = \\frac{8 \\cdot \\frac23 + 7}{\\frac53} = \\frac{37}{5}" },
      ],
      answer: "Internally in $2 : 3$, at $\\left(0, \\frac25, \\frac{37}{5}\\right)$.",
    },
    {
      type: "worked-example",
      id: "tdg0-3-we4",
      title: "Worked example 4: collinearity by a common ratio",
      problem: "Show that $A(2, -3, 4)$, $B(-1, 2, 1)$ and $C\\left(0, \\frac13, 2\\right)$ are collinear.",
      steps: [
        { text: "Suppose $C$ divides $AB$ in $k : 1$. The x-coordinate gives", latex: "\\frac{-k + 2}{k + 1} = 0 \\implies k = 2" },
        { text: "Test the other two coordinates with $k = 2$. *Why this step:* one coordinate always gives some $k$; collinearity needs the **same** $k$ to work for all three.", latex: "\\frac{2(2) - 3}{3} = \\frac13, \\qquad \\frac{2(1) + 4}{3} = 2" },
        { text: "Both match $C$, so $C$ lies on $AB$ and divides it internally in $2 : 1$." },
      ],
      answer: "Collinear; $C$ divides $AB$ in $2 : 1$.",
    },
    {
      type: "worked-example",
      id: "tdg0-3-we5",
      title: "Worked example 5: the fourth vertex of a parallelogram",
      problem: "$A(1, 2, 3)$, $B(-1, -2, -1)$ and $C(2, 3, 2)$ are three vertices of the parallelogram $ABCD$. Find $D$.",
      steps: [
        { text: "The diagonals $AC$ and $BD$ bisect each other, so they have the same midpoint:", latex: "\\frac{A + C}{2} = \\frac{B + D}{2} \\implies D = A + C - B" },
        { latex: "D = (1 + 2 + 1,\\ 2 + 3 + 2,\\ 3 + 2 + 1) = (4, 7, 6)" },
      ],
      answer: "$D(4, 7, 6)$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "tdg0-3-q1",
      variant: "practice",
      question: "$P$ divides the join of $A(-1, 2, 1)$ and $B(5, 8, -5)$ internally in the ratio $2 : 1$. Find the sum of the coordinates of $P$.",
      answer: 6,
      hint: "$P = A + \\frac23\\overrightarrow{AB}$.",
      solution: "$\\overrightarrow{AB} = (6, 6, -6)$, so $P = (-1 + 4, 2 + 4, 1 - 4) = (3, 6, -3)$, sum 6.",
      commonMistakes: [
        { answer: 4, feedback: "That is $(1, 4, -1)$, one third of the way: the weights are swapped. $2 : 1$ puts $P$ nearer $B$." },
      ],
    },
    {
      type: "numeric",
      id: "tdg0-3-q2",
      variant: "practice",
      question: "Find the sum of the coordinates of the midpoint of $(3, -5, 8)$ and $(-1, 7, 2)$.",
      answer: 7,
      hint: "Average each coordinate.",
      solution: "Midpoint $(1, 1, 5)$, sum 7.",
      commonMistakes: [
        { answer: 14, feedback: "That is the sum before halving." },
        { answer: 1, feedback: "You averaged with a minus sign, giving half the step $(-2, 6, -3)$, not the midpoint." },
      ],
    },
    {
      type: "numeric",
      id: "tdg0-3-q3",
      variant: "practice",
      question: "The xy-plane divides the join of $(1, 2, 3)$ and $(-3, 4, -5)$ in the ratio $k : 1$. Find $k$.",
      answer: 0.6,
      hint: "On the xy-plane $z = 0$: solve $\\frac{-5k + 3}{k + 1} = 0$.",
      solution: "$k = \\frac35 = 0.6$: internal division in $3 : 5$.",
      commonMistakes: [
        { answer: 1.6667, tolerance: 0.001, feedback: "That is $\\frac53$: the ratio is $AP : PB$, with $k$ multiplying the second point." },
        { answer: -0.6, feedback: "The z-coordinates $3$ and $-5$ have opposite signs, so the plane is crossed between them: $k > 0$." },
      ],
    },
    {
      type: "quiz",
      id: "tdg0-3-q4",
      variant: "practice",
      question: "The zx-plane divides the join of $(2, 3, 4)$ and $(1, 5, -2)$",
      options: [
        { text: "externally in the ratio $3 : 5$", correct: true, feedback: "$\\frac{5k + 3}{k + 1} = 0$ gives $k = -\\frac35$: external, $3 : 5$." },
        { text: "internally in the ratio $3 : 5$", feedback: "Both y-coordinates are positive, so both points are on the same side of the zx-plane: the crossing is outside the segment." },
        { text: "externally in the ratio $5 : 3$", feedback: "$k = -\\frac{y_1}{y_2} = -\\frac35$, so the ratio is $3 : 5$." },
        { text: "not at all: the line is parallel to the zx-plane", feedback: "The y-coordinate changes from 3 to 5, so the line does cross $y = 0$." },
      ],
      hint: "The zx-plane is $y = 0$.",
    },
    {
      type: "numeric",
      id: "tdg0-3-q5",
      variant: "practice",
      question: "Find the y-coordinate of the point dividing the join of $A(2, 1, -3)$ and $B(5, -8, 3)$ externally in the ratio $2 : 1$.",
      answer: -17,
      hint: "$y = \\frac{2(-8) - 1(1)}{2 - 1}$.",
      solution: "$y = \\frac{-16 - 1}{1} = -17$. The point is $(8, -17, 9)$, which is $A + 2\\overrightarrow{AB}$: beyond $B$.",
      commonMistakes: [
        { answer: -5, feedback: "That is the internal point $(4, -5, 1)$. External division uses $\\frac{my_2 - ny_1}{m - n}$." },
        { answer: 17, feedback: "Watch the sign: $-16 - 1 = -17$." },
      ],
    },
    {
      type: "numeric",
      id: "tdg0-3-q6",
      variant: "practice",
      question: "$P$ is on the segment from $A(2, -1, 4)$ to $B(7, 4, -6)$ with $2AP = 3PB$. Find the z-coordinate of $P$.",
      answer: -2,
      hint: "$2AP = 3PB$ means $AP : PB = 3 : 2$.",
      solution: "$P = A + \\frac35\\overrightarrow{AB} = (2, -1, 4) + \\frac35(5, 5, -10) = (5, 2, -2)$.",
      commonMistakes: [
        { answer: 0, feedback: "That uses $2 : 3$. From $2AP = 3PB$, $\\frac{AP}{PB} = \\frac32$." },
      ],
    },
    {
      type: "quiz",
      id: "tdg0-3-q7",
      variant: "concept",
      multiple: true,
      question: "Which statements about dividing $AB$ in the ratio $m : n$ are true? Select all that apply.",
      options: [
        { text: "The midpoint is the case $m = n$", correct: true, feedback: "$\\frac{x_2 + x_1}{2}$." },
        { text: "External division with $m = n$ gives no point", correct: true, feedback: "The denominator $m - n$ vanishes." },
        { text: "In the $k : 1$ method a negative $k$ means external division", correct: true, feedback: "The dividing point lies outside the segment." },
        { text: "The internal point is nearer to $A$ when $m > n$", feedback: "$AP : PB = m : n$ with $m > n$ means $AP > PB$: nearer to $B$." },
        { text: "The internal point is $\\frac{mx_1 + nx_2}{m + n}$", feedback: "The weights are crossed: $m$ goes with $x_2$." },
      ],
      hint: "Test each statement with a simple case like $A = 0$, $B = 3$ on a number line.",
    },
    {
      type: "numeric",
      id: "tdg0-3-q8",
      variant: "practice",
      question: "$A(3, -1, 2)$, $B(1, 2, -4)$ and $C(-1, 1, 2)$ are three vertices of the parallelogram $ABCD$. Find the sum of the coordinates of $D$.",
      answer: 7,
      hint: "$D = A + C - B$ (the diagonals $AC$ and $BD$ share a midpoint).",
      solution: "$D = (3 - 1 - 1,\\ -1 + 1 - 2,\\ 2 + 2 + 4) = (1, -2, 8)$, sum 7.",
      commonMistakes: [
        { answer: 1, feedback: "That is $A + B - C$, which makes $AB$ a diagonal. In $ABCD$ the diagonals are $AC$ and $BD$." },
        { answer: -3, feedback: "That is $B + C - A$, the vertex opposite $A$." },
      ],
    },
    {
      type: "numeric",
      id: "tdg0-3-q9",
      variant: "practice",
      question: "$C(4, y, z)$ lies on the line through $A(1, 2, 3)$ and $B(3, 6, 7)$. Find $y + z$.",
      answer: 17,
      hint: "$C = A + t\\overrightarrow{AB}$; the x-coordinate fixes $t$.",
      solution: "$\\overrightarrow{AB} = (2, 4, 4)$ and $1 + 2t = 4$ gives $t = \\frac32$. So $y = 2 + 6 = 8$, $z = 3 + 6 = 9$, and $y + z = 17$.",
      commonMistakes: [
        { answer: 13, feedback: "That is $B$'s $y + z$. $C$ is beyond $B$ ($t = 1.5$)." },
      ],
    },
    {
      type: "quiz",
      id: "tdg0-3-q10",
      variant: "practice",
      question: "With $A(1, 2, 3)$, $B(3, 6, 7)$ and $C(4, 8, 9)$, the point $C$ divides $AB$",
      options: [
        { text: "externally in the ratio $3 : 1$", correct: true, feedback: "$AC = \\frac32 AB$ and $CB = \\frac12 AB$, with $C$ beyond $B$: $3 : 1$ externally." },
        { text: "internally in the ratio $3 : 1$", feedback: "$C$ is beyond $B$ ($x = 4 > 3$), so the division is external." },
        { text: "externally in the ratio $1 : 3$", feedback: "With $m < n$ the point would lie before $A$, not beyond $B$." },
        { text: "internally in the ratio $2 : 1$", feedback: "Check the x-coordinates: $\\frac{2(3) + 1}{3} = \\frac73 \\ne 4$." },
      ],
      hint: "Use $k : 1$ on the x-coordinate: $\\frac{3k + 1}{k + 1} = 4$.",
    },
    {
      type: "numeric",
      id: "tdg0-3-q11",
      variant: "practice",
      question:
        "JEE Main. The join of $A(2, 4, 5)$ and $B(3, 5, -4)$ meets the xy-plane at $P$. Find the x-coordinate of $P$ (to two decimal places).",
      answer: 2.5556,
      tolerance: 0.01,
      hint: "$k = -\\frac{z_1}{z_2} = \\frac54$, then use the section formula for $x$.",
      solution: "$k = \\frac54$, internal $5 : 4$. $x = \\frac{\\frac54(3) + 2}{\\frac94} = \\frac{23}{9} \\approx 2.56$.",
      commonMistakes: [
        { answer: 2.4444, tolerance: 0.01, feedback: "That is $\\frac{22}{9}$, from the ratio $4 : 5$: the weights are swapped." },
      ],
    },
    {
      type: "numeric",
      id: "tdg0-3-q12",
      variant: "practice",
      question:
        "JEE Main. $P$ and $Q$ are the points of trisection of the segment from $A(-2, 5, 4)$ to $B(4, -1, -2)$. Find $PQ$ (to two decimal places).",
      answer: 3.4641,
      tolerance: 0.01,
      hint: "$P$ and $Q$ divide $AB$ in $1 : 2$ and $2 : 1$; $PQ$ is one third of $AB$.",
      solution: "$P = (0, 3, 2)$ and $Q = (2, 1, 0)$, so $PQ = \\sqrt{4 + 4 + 4} = 2\\sqrt3 \\approx 3.46$, one third of $AB = 6\\sqrt3$.",
      commonMistakes: [
        { answer: 10.3923, tolerance: 0.01, feedback: "That is the whole of $AB$." },
        { answer: 6.9282, tolerance: 0.01, feedback: "That is $AQ$, two thirds of $AB$." },
      ],
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "centroids-and-centres-in-space",
  title: "0.4 · Centroids and Centres in Space",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "Hang three equal weights at the corners of a triangle and it balances at one point, the **centroid**. Hang four at the corners of a tetrahedron and it again balances at one point. In coordinates both balance points are plain averages; the work is in seeing why, and in how the medians are divided.",
    },
    { type: "heading", text: "The centroid of a triangle" },
    {
      type: "text",
      content:
        "In triangle $ABC$ let $D$ be the midpoint of $BC$. The centroid $G$ divides the median $AD$ in $2 : 1$ from the vertex (vector algebra 2.3). The section formula in space gives",
    },
    {
      type: "math",
      latex:
        "G = \\frac{2D + A}{3} = \\frac{A + B + C}{3} = \\left(\\frac{x_1 + x_2 + x_3}{3},\\ \\frac{y_1 + y_2 + y_3}{3},\\ \\frac{z_1 + z_2 + z_3}{3}\\right)",
    },
    {
      type: "text",
      content:
        "The result is symmetric in $A$, $B$, $C$, so the same point lies two thirds of the way along **every** median: the three medians are concurrent.",
    },
    { type: "heading", text: "The centroid of a tetrahedron" },
    {
      type: "text",
      content:
        "A tetrahedron $ABCD$ has four vertices, four triangular faces and six edges. Join each vertex to the centroid of the opposite face: $G_A = \\frac{B + C + D}{3}$ for the face $BCD$. The point that divides $AG_A$ in $3 : 1$ from $A$ is",
    },
    {
      type: "math",
      latex: "G = \\frac{3G_A + A}{4} = \\frac{A + B + C + D}{4}",
    },
    {
      type: "text",
      content:
        "Again symmetric, so all four segments vertex-to-face-centroid pass through $G$ and are divided in $3 : 1$. The same point is also the midpoint of each segment joining the midpoints of two **opposite** edges, since $\\frac12\\left(\\frac{A + B}{2} + \\frac{C + D}{2}\\right) = \\frac{A + B + C + D}{4}$.",
    },
    {
      type: "interactive",
      config: {
        component: "tdg-space-viewer",
        mode: "points",
        a: [0, 0, 0],
        b: [4, 0, 0],
        c: [0, 4, 0],
        d: [0, 0, 4],
        show: ["centroid"],
        caption:
          "The triangle $ABC$ and the tetrahedron $ABCD$ with their centroids. Rotate the view and check that the tetrahedron's centroid sits a quarter of the way from the face $ABC$ towards $D$, not a third.",
      },
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the tetrahedron centroid divides the median in 2 : 1\"",
      content:
        "The $2 : 1$ belongs to the triangle, which has three vertices. The tetrahedron has four, and its centroid divides each vertex-to-face-centroid segment in $3 : 1$. The pattern: with $k$ equal weights, the centroid is $\\frac{k - 1}{k}$ of the way from a vertex to the centroid of the rest.",
    },
    { type: "heading", text: "The incentre of a triangle in space" },
    {
      type: "text",
      content:
        "The incentre is a **weighted** average, with each vertex weighted by the length of the opposite side. With $a = BC$, $b = CA$, $c = AB$:",
    },
    {
      type: "math",
      latex: "I = \\frac{aA + bB + cC}{a + b + c}",
    },
    {
      type: "text",
      content:
        "The derivation is the one from the plane (the angle bisector from $A$ divides $BC$ in $c : b$), and it never used the fact that the triangle lies in the xy-plane, so the formula holds for a triangle anywhere in space. Only for an equilateral triangle does the incentre coincide with the centroid.",
    },
    { type: "heading", text: "Worked examples" },
    {
      type: "worked-example",
      id: "tdg0-4-we1",
      title: "Worked example 1: a centroid",
      problem: "Find the centroid of the triangle with vertices $(3, -5, 7)$, $(-1, 7, -6)$ and $(1, 1, 2)$.",
      steps: [{ latex: "G = \\left(\\frac{3 - 1 + 1}{3},\\ \\frac{-5 + 7 + 1}{3},\\ \\frac{7 - 6 + 2}{3}\\right) = (1, 1, 1)" }],
      answer: "$(1, 1, 1)$.",
    },
    {
      type: "worked-example",
      id: "tdg0-4-we2",
      title: "Worked example 2: vertices from the midpoints of the sides",
      problem:
        "The midpoints of the sides $BC$, $CA$ and $AB$ of a triangle are $D(1, 2, -3)$, $E(3, 0, 1)$ and $F(-1, 1, -4)$. Find the vertices.",
      steps: [
        { text: "$AFDE$ is a parallelogram (the midpoint theorem: $FD \\parallel AC$ and $DE \\parallel AB$), so its diagonals bisect each other and $A = E + F - D$. *Why this step:* it avoids solving nine equations." },
        { latex: "A = (3 - 1 - 1,\\ 0 + 1 - 2,\\ 1 - 4 + 3) = (1, -1, 0)" },
        { latex: "B = D + F - E = (-3, 3, -8), \\qquad C = D + E - F = (5, 1, 2)" },
        { text: "Check: the midpoint of $B$ and $C$ is $(1, 2, -3) = D$." },
      ],
      answer: "$A(1, -1, 0)$, $B(-3, 3, -8)$, $C(5, 1, 2)$.",
    },
    {
      type: "worked-example",
      id: "tdg0-4-we3",
      title: "Worked example 3: the 3 : 1 division in a tetrahedron",
      problem:
        "For the tetrahedron $O(0, 0, 0)$, $A(4, 0, 0)$, $B(0, 8, 0)$, $C(0, 0, 12)$, find the centroid $G$ and check that it divides $C G_C$ in $3 : 1$, where $G_C$ is the centroid of the face $OAB$.",
      steps: [
        { latex: "G = \\frac{(0, 0, 0) + (4, 0, 0) + (0, 8, 0) + (0, 0, 12)}{4} = (1, 2, 3)" },
        { latex: "G_C = \\frac{O + A + B}{3} = \\left(\\frac43, \\frac83, 0\\right)" },
        { text: "The point dividing $CG_C$ in $3 : 1$ from $C$:", latex: "\\frac{3G_C + C}{4} = \\frac{(4, 8, 0) + (0, 0, 12)}{4} = (1, 2, 3) = G" },
      ],
      answer: "$G(1, 2, 3)$, and it is $\\frac34$ of the way from $C$ to $G_C$.",
    },
    {
      type: "worked-example",
      id: "tdg0-4-we4",
      title: "Worked example 4: an incentre",
      problem: "Find the incentre of the triangle $A(1, 2, 3)$, $B(4, 2, 3)$, $C(1, 2, 7)$.",
      steps: [
        { text: "Side lengths: $c = AB = 3$, $b = CA = 4$, $a = BC = \\sqrt{9 + 0 + 16} = 5$." },
        { text: "Weight each vertex by its opposite side. *Why this step:* the longest side is opposite $A$, so $A$ gets the largest weight.", latex: "I = \\frac{5(1, 2, 3) + 4(4, 2, 3) + 3(1, 2, 7)}{12} = \\frac{(24, 24, 48)}{12} = (2, 2, 4)" },
      ],
      answer: "$I(2, 2, 4)$. (The centroid is $(2, 2, \\frac{13}{3})$, a different point.)",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "tdg0-4-q1",
      variant: "practice",
      question: "Find the y-coordinate of the centroid of the triangle with vertices $(2, -1, 3)$, $(4, 5, -2)$ and $(-3, 2, 8)$.",
      answer: 2,
      hint: "Average the y-coordinates.",
      solution: "$\\frac{-1 + 5 + 2}{3} = 2$. The centroid is $(1, 2, 3)$.",
      commonMistakes: [{ answer: 6, feedback: "Divide the sum by 3." }],
    },
    {
      type: "numeric",
      id: "tdg0-4-q2",
      variant: "practice",
      question: "Two vertices of a triangle are $A(1, 1, 1)$ and $B(2, -3, 4)$ and its centroid is $G(2, 0, 3)$. Find the sum of the coordinates of the third vertex $C$.",
      answer: 9,
      hint: "$C = 3G - A - B$.",
      solution: "$C = (6 - 3,\\ 0 + 2,\\ 9 - 5) = (3, 2, 4)$, sum 9.",
      commonMistakes: [
        { answer: 4, feedback: "Use $3G$, not $2G$: the centroid averages three points." },
      ],
    },
    {
      type: "numeric",
      id: "tdg0-4-q3",
      variant: "practice",
      question: "Find the sum of the coordinates of the centroid of the tetrahedron with vertices $(0, 0, 0)$, $(2, 0, 0)$, $(0, 4, 0)$ and $(0, 0, 6)$.",
      answer: 3,
      hint: "Average four points.",
      solution: "$G = \\left(\\frac24, \\frac44, \\frac64\\right) = \\left(\\frac12, 1, \\frac32\\right)$, sum 3.",
      commonMistakes: [
        { answer: 4, feedback: "You divided by 3; a tetrahedron has four vertices." },
      ],
    },
    {
      type: "quiz",
      id: "tdg0-4-q4",
      variant: "concept",
      question: "The centroid $G$ of tetrahedron $ABCD$ divides the segment from $A$ to the centroid $G_A$ of face $BCD$ in the ratio $AG : GG_A =$",
      options: [
        { text: "$3 : 1$", correct: true, feedback: "$G = \\frac{3G_A + A}{4}$." },
        { text: "$2 : 1$", feedback: "That is the triangle's ratio, for three vertices." },
        { text: "$1 : 3$", feedback: "$G$ is nearer the face than the vertex, so $AG$ is the longer part." },
        { text: "$4 : 1$", feedback: "Check: $\\frac{4G_A + A}{5}$ is not symmetric in all four vertices." },
      ],
      hint: "Write $\\frac{A + B + C + D}{4}$ as a combination of $A$ and $G_A = \\frac{B + C + D}{3}$.",
    },
    {
      type: "numeric",
      id: "tdg0-4-q5",
      variant: "practice",
      question:
        "The midpoints of the sides $BC$, $CA$, $AB$ of triangle $ABC$ are $(1, 5, -1)$, $(0, 4, -2)$ and $(2, 3, 4)$. Find the sum of the coordinates of $A$.",
      answer: 6,
      hint: "$A = E + F - D$, where $D$ is the midpoint of the side opposite $A$.",
      solution: "$A = (0 + 2 - 1,\\ 4 + 3 - 5,\\ -2 + 4 + 1) = (1, 2, 3)$, sum 6.",
      commonMistakes: [
        { answer: -2, feedback: "That is $D + E - F = C$, the vertex opposite the side $AB$." },
      ],
    },
    {
      type: "numeric",
      id: "tdg0-4-q6",
      variant: "practice",
      question:
        "A plane meets the axes at $(a, 0, 0)$, $(0, b, 0)$ and $(0, 0, c)$, and the centroid of the triangle these points form is $(1, 2, 3)$. Find $a + b + c$.",
      answer: 18,
      hint: "The centroid is $\\left(\\frac a3, \\frac b3, \\frac c3\\right)$.",
      solution: "$a = 3$, $b = 6$, $c = 9$, so $a + b + c = 18$.",
      commonMistakes: [{ answer: 6, feedback: "Each intercept is three times the centroid coordinate." }],
    },
    {
      type: "quiz",
      id: "tdg0-4-q7",
      variant: "practice",
      multiple: true,
      question: "For a tetrahedron $ABCD$ with centroid $G$, which statements are true? Select all that apply.",
      options: [
        { text: "$G = \\frac{A + B + C + D}{4}$", correct: true, feedback: "The average of the four vertices." },
        { text: "$G$ is the midpoint of the segment joining the midpoints of $AB$ and $CD$", correct: true, feedback: "$\\frac12\\left(\\frac{A + B}{2} + \\frac{C + D}{2}\\right)$." },
        { text: "$G$ divides the segment from $A$ to the centroid of face $BCD$ in $3 : 1$", correct: true, feedback: "$G = \\frac{3G_A + A}{4}$." },
        { text: "$G$ coincides with the centroid of face $BCD$", feedback: "That would ignore $A$ completely." },
        { text: "$G$ divides each vertex-to-face-centroid segment in $2 : 1$", feedback: "That is the triangle rule; here it is $3 : 1$." },
      ],
      hint: "Everything follows from $G = \\frac{A + B + C + D}{4}$.",
    },
    {
      type: "numeric",
      id: "tdg0-4-q8",
      variant: "practice",
      question: "Find the z-coordinate of the incentre of the triangle $A(1, 0, 2)$, $B(1, 6, 2)$, $C(1, 0, 10)$.",
      answer: 4,
      hint: "Sides: $AB = 6$, $AC = 8$, $BC = 10$. Weight each vertex by the opposite side.",
      solution: "$a = BC = 10$, $b = CA = 8$, $c = AB = 6$. $z = \\frac{10(2) + 8(2) + 6(10)}{24} = \\frac{96}{24} = 4$. (The incentre is $(1, 2, 4)$.)",
      commonMistakes: [
        { answer: 4.6667, tolerance: 0.01, feedback: "That is the centroid's $z$, $\\frac{14}{3}$. The incentre weights the vertices by the opposite sides." },
      ],
    },
    {
      type: "quiz",
      id: "tdg0-4-q9",
      variant: "concept",
      question: "For which triangles is the incentre always the same point as the centroid?",
      options: [
        { text: "Equilateral triangles", correct: true, feedback: "Equal sides mean equal weights, so the weighted average is the plain average." },
        { text: "Right-angled triangles", feedback: "The 6-8-10 triangle above has different incentre and centroid." },
        { text: "All triangles", feedback: "The incentre weights the vertices by the opposite side lengths." },
        { text: "Triangles lying in a coordinate plane", feedback: "Position in space does not matter; only the side lengths do." },
      ],
      hint: "When are the weights $a$, $b$, $c$ equal?",
    },
    {
      type: "numeric",
      id: "tdg0-4-q10",
      variant: "practice",
      question:
        "JEE Main. The centroid of the triangle with vertices $(a, 1, 3)$, $(-2, b, -5)$ and $(4, 7, c)$ is the origin. Find $a + b + c$.",
      answer: -8,
      hint: "Each coordinate sum must be 0.",
      solution: "$a - 2 + 4 = 0$, $1 + b + 7 = 0$, $3 - 5 + c = 0$ give $a = -2$, $b = -8$, $c = 2$. Sum $-8$.",
      commonMistakes: [{ answer: 8, feedback: "Check the signs: $b = -8$ and $a = -2$." }],
    },
    {
      type: "numeric",
      id: "tdg0-4-q11",
      variant: "practice",
      question:
        "JEE Main. $A$, $B$, $C$ lie on the x-, y- and z-axes and the centroid of the tetrahedron $OABC$ is $(1, -2, 3)$. Find the volume of $OABC$.",
      answer: 64,
      hint: "The centroid is $\\left(\\frac a4, \\frac b4, \\frac c4\\right)$. The volume is $\\frac16\\lvert abc\\rvert$ (the triple product from vector algebra).",
      solution: "$a = 4$, $b = -8$, $c = 12$. Volume $= \\frac16\\lvert 4 \\cdot (-8) \\cdot 12\\rvert = \\frac{384}{6} = 64$.",
      commonMistakes: [
        { answer: 27, feedback: "You multiplied by 3 instead of 4: the tetrahedron has four vertices, one at $O$." },
        { answer: 384, feedback: "That is the box $\\lvert abc\\rvert$; the tetrahedron is $\\frac16$ of it." },
      ],
    },
    {
      type: "numeric",
      id: "tdg0-4-q12",
      variant: "practice",
      question: "Find the length of the median from $A$ in the triangle $A(0, 0, 6)$, $B(0, 4, 0)$, $C(6, 0, 0)$.",
      answer: 7,
      hint: "The median runs from $A$ to the midpoint of $BC$.",
      solution: "Midpoint of $BC$: $(3, 2, 0)$. Length $\\sqrt{9 + 4 + 36} = 7$.",
      commonMistakes: [
        { answer: 4.6667, tolerance: 0.01, feedback: "That is $AG$, two thirds of the median." },
      ],
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "projections-of-a-segment-on-the-axes",
  title: "0.5 · Projections of a Segment on the Axes",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "Shine a light perpendicular to the x-axis and a rod $AB$ casts a shadow on the axis, from $x_1$ to $x_2$. That shadow is the **projection** of $AB$ on the x-axis. Projections are how Chapter 1 will measure the direction of a line, so it pays to know exactly what they are.",
    },
    { type: "heading", text: "Projections on the axes" },
    {
      type: "text",
      content:
        "Drop perpendiculars from $A(x_1, y_1, z_1)$ and $B(x_2, y_2, z_2)$ to the x-axis. The feet are $(x_1, 0, 0)$ and $(x_2, 0, 0)$, so",
    },
    {
      type: "math",
      latex: "\\text{proj}_x AB = x_2 - x_1, \\qquad \\text{proj}_y AB = y_2 - y_1, \\qquad \\text{proj}_z AB = z_2 - z_1",
    },
    {
      type: "text",
      content:
        "These are **signed** lengths: the projection on the x-axis is negative when $B$ is behind $A$ in the x-direction. The length of the shadow is the absolute value. In vector terms $x_2 - x_1 = \\overrightarrow{AB}\\cdot\\hat i$, the component of $\\overrightarrow{AB}$ along $\\hat i$.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Two facts that come for free",
      content:
        "1. The squares of the three projections add up to $AB^2$: that is the distance formula.\n2. If $AB$ makes angle $\\alpha$ with the positive x-axis, the projection is $AB\\cos\\alpha$. So the projections divided by the length, $\\frac{x_2 - x_1}{AB}$ and so on, are the cosines of the angles $AB$ makes with the axes: the **direction cosines** of Chapter 1.",
    },
    {
      type: "interactive",
      config: {
        component: "tdg-space-viewer",
        mode: "points",
        a: [1, -2, 1],
        b: [3, 2, 5],
        show: ["projections", "box"],
        caption:
          "The shadows of $AB$ on the three axes. They are the edges of the box with diagonal $AB$, so the three squares add to $AB^2$. Rotate until you look straight down the z-axis: what you see is the projection of $AB$ on the xy-plane.",
      },
    },
    { type: "heading", text: "Projections on the coordinate planes" },
    {
      type: "text",
      content:
        "Dropping perpendiculars to the **xy-plane** sends $A$ to $(x_1, y_1, 0)$ and $B$ to $(x_2, y_2, 0)$. The projection is a segment, of length",
    },
    {
      type: "math",
      latex: "\\sqrt{\\Delta x^2 + \\Delta y^2} \\text{ on the xy-plane}, \\quad \\sqrt{\\Delta y^2 + \\Delta z^2} \\text{ on the yz-plane}, \\quad \\sqrt{\\Delta z^2 + \\Delta x^2} \\text{ on the zx-plane}",
    },
    {
      type: "text",
      content:
        "Adding the squares of the three plane projections counts each $\\Delta^2$ twice: the sum is $2AB^2$. This little identity solves a family of JEE problems.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"projections are always positive lengths\"",
      content:
        "A projection on an axis is $x_2 - x_1$, with a sign that records direction. The segment from $(5, 0, 0)$ to $(2, 0, 0)$ has projection $-3$ on the x-axis. When a question asks for a **length** of a projection, take the absolute value; when it uses projections to build direction cosines, keep the signs.",
    },
    { type: "heading", text: "Worked examples" },
    {
      type: "worked-example",
      id: "tdg0-5-we1",
      title: "Worked example 1: every projection of one segment",
      problem:
        "For $A(1, -2, 3)$ and $B(4, 2, 15)$ find the projections of $AB$ on the three axes and the lengths of its projections on the three coordinate planes.",
      steps: [
        { text: "On the axes: $\\Delta x = 3$, $\\Delta y = 4$, $\\Delta z = 12$. Check: $9 + 16 + 144 = 169 = AB^2$, so $AB = 13$." },
        { latex: "\\text{xy: } \\sqrt{9 + 16} = 5, \\quad \\text{yz: } \\sqrt{16 + 144} = 4\\sqrt{10}, \\quad \\text{zx: } \\sqrt{144 + 9} = \\sqrt{153}" },
        { text: "Check the identity: $25 + 160 + 153 = 338 = 2 \\cdot 169$." },
      ],
      answer: "Axes: $3, 4, 12$. Planes: $5$, $4\\sqrt{10}$, $\\sqrt{153}$.",
    },
    {
      type: "worked-example",
      id: "tdg0-5-we2",
      title: "Worked example 2: a segment from its projections",
      problem:
        "The projections of a segment on the x-, y- and z-axes are $2$, $-3$ and $6$. Find its length and the cosines of the angles it makes with the axes.",
      steps: [
        { latex: "L = \\sqrt{2^2 + (-3)^2 + 6^2} = \\sqrt{49} = 7" },
        { text: "Each projection is $L\\cos(\\text{angle})$. *Why this step:* this is the definition of a projection, and it is how Chapter 1 defines direction cosines.", latex: "\\cos\\alpha = \\frac27, \\quad \\cos\\beta = -\\frac37, \\quad \\cos\\gamma = \\frac67" },
      ],
      answer: "Length 7; cosines $\\frac27, -\\frac37, \\frac67$.",
    },
    {
      type: "worked-example",
      id: "tdg0-5-we3",
      title: "Worked example 3: the plane-projection identity",
      problem: "The projections of a segment on the xy-, yz- and zx-planes have lengths $\\sqrt{34}$, $\\sqrt{41}$ and $5$. Find the segment's length.",
      steps: [
        { text: "Square and add: each of $\\Delta x^2$, $\\Delta y^2$, $\\Delta z^2$ appears twice.", latex: "34 + 41 + 25 = 100 = 2L^2" },
        { text: "So $L^2 = 50$ and $L = 5\\sqrt2$. *Why this step:* a consistency check is worth doing: $\\Delta x^2 = 50 - 41 = 9$, $\\Delta y^2 = 50 - 25 = 25$, $\\Delta z^2 = 50 - 34 = 16$, all non-negative." },
      ],
      answer: "$5\\sqrt2 \\approx 7.07$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "tdg0-5-q1",
      variant: "practice",
      question: "For $A(2, 5, -1)$ and $B(-3, 1, 4)$, find the (signed) projection of $AB$ on the y-axis.",
      answer: -4,
      hint: "$y_2 - y_1$.",
      solution: "$1 - 5 = -4$: the shadow points in the negative y-direction, with length 4.",
      commonMistakes: [{ answer: 4, feedback: "4 is the length of the shadow. The signed projection is $y_2 - y_1 = -4$." }],
    },
    {
      type: "numeric",
      id: "tdg0-5-q2",
      variant: "practice",
      question: "The projections of a segment on the coordinate axes are $2$, $-3$ and $6$. Find its length.",
      answer: 7,
      hint: "The squares of the projections add to the square of the length.",
      solution: "$\\sqrt{4 + 9 + 36} = 7$.",
      commonMistakes: [
        { answer: 11, feedback: "Do not add the projections; add their squares." },
        { answer: 5, feedback: "You added the signed projections. Square them first." },
      ],
    },
    {
      type: "numeric",
      id: "tdg0-5-q3",
      variant: "practice",
      question: "Find the length of the projection of the segment from $(1, 2, 3)$ to $(4, 6, 8)$ on the yz-plane (to two decimal places).",
      answer: 6.4031,
      tolerance: 0.01,
      hint: "On the yz-plane the x-difference disappears.",
      solution: "$\\Delta y = 4$, $\\Delta z = 5$: $\\sqrt{16 + 25} = \\sqrt{41} \\approx 6.40$.",
      commonMistakes: [
        { answer: 5, feedback: "That is the projection on the xy-plane, $\\sqrt{9 + 16}$." },
        { answer: 7.0711, tolerance: 0.01, feedback: "That is the full length $\\sqrt{50}$. Drop the x-difference." },
      ],
    },
    {
      type: "quiz",
      id: "tdg0-5-q4",
      variant: "practice",
      multiple: true,
      question: "For $A(0, 0, 0)$ and $B(2, -3, 6)$, which statements are true? Select all that apply.",
      options: [
        { text: "The projection of $AB$ on the x-axis is 2", correct: true, feedback: "$2 - 0$." },
        { text: "The projection of $AB$ on the y-axis has length 3", correct: true, feedback: "The signed projection is $-3$; its length is 3." },
        { text: "$AB = 7$", correct: true, feedback: "$\\sqrt{4 + 9 + 36}$." },
        { text: "The projection of $AB$ on the xy-plane has length $\\sqrt{13}$", correct: true, feedback: "$\\sqrt{4 + 9}$." },
        { text: "The projection of $AB$ on the z-axis is 7", feedback: "It is $6 - 0 = 6$; 7 is the full length." },
      ],
      hint: "Axis projections are single differences; plane projections use two.",
    },
    {
      type: "quiz",
      id: "tdg0-5-q5",
      variant: "concept",
      question: "A segment is parallel to the z-axis. Its projections on the x- and y-axes are",
      options: [
        { text: "both 0", correct: true, feedback: "Its endpoints share $x$ and $y$, so both differences vanish." },
        { text: "both equal to its length", feedback: "Only the z-projection equals the length (up to sign)." },
        { text: "equal to each other but not zero", feedback: "Perpendicular to an axis means zero shadow on it." },
        { text: "undefined", feedback: "Projections are always defined: here they are zero." },
      ],
      hint: "What do the endpoints have in common?",
    },
    {
      type: "numeric",
      id: "tdg0-5-q6",
      variant: "practice",
      question: "A segment of length 14 has projections of lengths 4 and 6 on the x- and y-axes. Find the length of its projection on the z-axis.",
      answer: 12,
      hint: "$4^2 + 6^2 + p^2 = 14^2$.",
      solution: "$p^2 = 196 - 16 - 36 = 144$, so $p = 12$.",
      commonMistakes: [
        { answer: 4, feedback: "$14 - 4 - 6$ treats lengths as if they add. Use squares." },
      ],
    },
    {
      type: "numeric",
      id: "tdg0-5-q7",
      variant: "practice",
      question: "A segment has projections $12$, $4$, $3$ on the x-, y- and z-axes. Find the cosine of the angle it makes with the x-axis (to three decimal places).",
      answer: 0.923077,
      tolerance: 0.001,
      hint: "First find the length; the cosine is projection over length.",
      solution: "Length $\\sqrt{144 + 16 + 9} = 13$, so $\\cos\\alpha = \\frac{12}{13} \\approx 0.923$.",
      commonMistakes: [
        { answer: 0.631579, tolerance: 0.001, feedback: "$\\frac{12}{19}$ divides by the sum of the projections. Divide by the length, 13." },
      ],
    },
    {
      type: "numeric",
      id: "tdg0-5-q8",
      variant: "practice",
      question: "A rod of length 5 has projections of lengths $p$, $q$, $r$ on the xy-, yz- and zx-planes. Find $p^2 + q^2 + r^2$.",
      answer: 50,
      hint: "Each of $\\Delta x^2$, $\\Delta y^2$, $\\Delta z^2$ appears in two of the three planes.",
      solution: "$p^2 + q^2 + r^2 = 2(\\Delta x^2 + \\Delta y^2 + \\Delta z^2) = 2 \\cdot 25 = 50$, whatever the rod's direction.",
      commonMistakes: [
        { answer: 25, feedback: "That is the rule for the axes. For the planes, each square is counted twice." },
        { answer: 75, feedback: "Each square appears in **two** planes, not three." },
      ],
    },
    {
      type: "quiz",
      id: "tdg0-5-q9",
      variant: "concept",
      question: "The projection on the xy-plane of the segment from $(1, 2, 3)$ to $(1, 2, 9)$ is",
      options: [
        { text: "a single point", correct: true, feedback: "Both ends drop to $(1, 2, 0)$: the segment is vertical." },
        { text: "a segment of length 6", feedback: "Length 6 is the projection on the z-axis." },
        { text: "a segment of length $\\sqrt{12}$", feedback: "$\\Delta x = \\Delta y = 0$, so the shadow on the floor has no length." },
        { text: "the whole xy-plane", feedback: "Projecting a segment gives a segment or a point." },
      ],
      hint: "Drop each endpoint to $z = 0$.",
    },
    {
      type: "numeric",
      id: "tdg0-5-q10",
      variant: "practice",
      question:
        "JEE Main. $P$ lies in the octant $(+, +, +)$, $OP = 6\\sqrt3$, and the projections of $OP$ on the three axes are equal. Find the x-coordinate of $P$.",
      answer: 6,
      hint: "Equal projections $k$ give $OP = k\\sqrt3$.",
      solution: "$3k^2 = 108$, so $k = 6$ (positive in this octant). $P = (6, 6, 6)$.",
      commonMistakes: [
        { answer: 3.4641, tolerance: 0.01, feedback: "You divided $6\\sqrt3$ by 3. The squares add: $3k^2 = OP^2$." },
        { answer: 18, feedback: "$k\\sqrt3 = 6\\sqrt3$ gives $k = 6$." },
      ],
    },
    {
      type: "numeric",
      id: "tdg0-5-q11",
      variant: "practice",
      question:
        "JEE Main. The projections of a segment on the xy-, yz- and zx-planes have lengths $\\sqrt{29}$, $\\sqrt{13}$ and $\\sqrt{20}$. Find the length of the segment (to two decimal places).",
      answer: 5.5678,
      tolerance: 0.01,
      hint: "The three squares add to $2L^2$.",
      solution: "$29 + 13 + 20 = 62 = 2L^2$, so $L = \\sqrt{31} \\approx 5.57$. (Consistent: $\\Delta x^2 = 31 - 13 = 18$, $\\Delta y^2 = 31 - 20 = 11$, $\\Delta z^2 = 31 - 29 = 2$.)",
      commonMistakes: [
        { answer: 7.874, tolerance: 0.01, feedback: "$\\sqrt{62}$ forgets that each square appears twice." },
      ],
    },
    {
      type: "quiz",
      id: "tdg0-5-q12",
      variant: "practice",
      multiple: true,
      question: "Which triples can be the projections on the x-, y- and z-axes of a segment of length 3? Select all that apply.",
      options: [
        { text: "$1, 2, 2$", correct: true, feedback: "$1 + 4 + 4 = 9$." },
        { text: "$2, -2, 1$", correct: true, feedback: "Signs do not matter for the length: $4 + 4 + 1 = 9$." },
        { text: "$3, 0, 0$", correct: true, feedback: "A segment along the x-axis." },
        { text: "$1, 1, 1$", feedback: "$1 + 1 + 1 = 3$, so the length would be $\\sqrt3$." },
        { text: "$2, 2, 2$", feedback: "That gives length $2\\sqrt3 \\approx 3.46$." },
      ],
      hint: "The squares must add to 9.",
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-0-mastery",
  title: "0.6 · Chapter 0 Mastery",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "No new theory and no formula sheet. Every question below can be rebuilt from one picture: the box with a segment as its diagonal. Its edges are the projections $\\Delta x$, $\\Delta y$, $\\Delta z$; Pythagoras twice gives the distance; walking a fraction of the way along each edge gives the section formula; averaging corners gives centroids.",
    },
    { type: "heading", text: "Reconstruct it" },
    {
      type: "callout",
      variant: "tip",
      title: "Rebuild the chapter from the coordinate box",
      content:
        "Draw $A$, $B$ and the box with diagonal $AB$. Without notes:\n\n1. Why is the distance from the x-axis $\\sqrt{y^2 + z^2}$ and not $\\lvert x\\rvert$?\n2. Derive $AB^2 = \\Delta x^2 + \\Delta y^2 + \\Delta z^2$ using two right triangles.\n3. Why does the point dividing $AB$ in $m : n$ put the weight $m$ on $B$?\n4. Why does the yz-plane divide $AB$ in the ratio $-x_1 : x_2$, and what does a negative ratio mean?\n5. Why does the centroid of a tetrahedron divide each vertex-to-face-centroid segment in $3 : 1$?\n6. Why do the squares of the projections on the three coordinate planes add to $2AB^2$?",
    },
    {
      type: "interactive",
      config: {
        component: "tdg-distance-lab",
        mode: "two-points",
        p1: [1, -2, 4],
        p2: [4, 4, -2],
        caption:
          "Check your reconstructions here. Before changing anything, predict the distance, the midpoint, and in which ratio each coordinate plane divides the segment; then edit a coordinate and predict again.",
      },
    },
    { type: "heading", text: "Mastery questions" },
    {
      type: "numeric",
      id: "tdg0-6-q1",
      variant: "mastery",
      question: "Find the distance between $(3, -4, 1)$ and $(-1, 4, 0)$.",
      answer: 9,
      hint: "Lesson 0.2: differences $(-4, 8, -1)$.",
      solution: "$\\sqrt{16 + 64 + 1} = \\sqrt{81} = 9$.",
      commonMistakes: [{ answer: 13, feedback: "That adds the absolute differences. Square, add, root." }],
    },
    {
      type: "quiz",
      id: "tdg0-6-q2",
      variant: "mastery",
      question: "The point $(-2, -3, 4)$ is reflected in the xy-plane. The image lies in the octant",
      options: [
        { text: "$(-, -, -)$", correct: true, feedback: "Reflection in the xy-plane flips $z$: $(-2, -3, -4)$." },
        { text: "$(-, -, +)$", feedback: "That is the original point's octant." },
        { text: "$(+, +, +)$", feedback: "Only one coordinate changes in a reflection in a coordinate plane, and here it is $z$." },
        { text: "$(+, +, -)$", feedback: "That is the reflection in the origin." },
      ],
      hint: "Lesson 0.1: reflecting in a coordinate plane flips one coordinate.",
    },
    {
      type: "numeric",
      id: "tdg0-6-q3",
      variant: "mastery",
      question: "Find the distance of $(-4, 3, 12)$ from the y-axis (to two decimal places).",
      answer: 12.6491,
      tolerance: 0.01,
      hint: "Lesson 0.1: the distance from the y-axis uses $x$ and $z$.",
      solution: "$\\sqrt{16 + 144} = \\sqrt{160} = 4\\sqrt{10} \\approx 12.65$.",
      commonMistakes: [
        { answer: 13, feedback: "13 is the distance from the origin." },
        { answer: 3, feedback: "3 is the distance from the zx-plane." },
      ],
    },
    {
      type: "numeric",
      id: "tdg0-6-q4",
      variant: "mastery",
      question: "The zx-plane divides the join of $A(3, -6, 2)$ and $B(-1, 2, 4)$ in the ratio $k : 1$. Find $k$.",
      answer: 3,
      hint: "Lesson 0.3: $k = -\\frac{y_1}{y_2}$.",
      solution: "$\\frac{2k - 6}{k + 1} = 0$ gives $k = 3$: internally $3 : 1$, at $(0, 0, \\frac72)$.",
      commonMistakes: [{ answer: 0.3333, tolerance: 0.001, feedback: "Inverted: $k$ multiplies the second point's coordinate." }],
    },
    {
      type: "numeric",
      id: "tdg0-6-q5",
      variant: "mastery",
      question: "$P$ divides the join of $A(1, 2, 3)$ and $B(3, 4, 5)$ externally in the ratio $3 : 1$. Find the sum of the coordinates of $P$.",
      answer: 15,
      hint: "Lesson 0.3: $\\frac{mx_2 - nx_1}{m - n}$.",
      solution: "$P = \\left(\\frac{9 - 1}{2}, \\frac{12 - 2}{2}, \\frac{15 - 3}{2}\\right) = (4, 5, 6)$, sum 15.",
      commonMistakes: [{ answer: 10.5, tolerance: 0.01, feedback: "That is the internal point $(2.5, 3.5, 4.5)$." }],
    },
    {
      type: "quiz",
      id: "tdg0-6-q6",
      variant: "mastery",
      multiple: true,
      question: "Which triples of points are collinear? Select all that apply.",
      options: [
        { text: "$(2, -1, 3)$, $(4, 3, 1)$, $(5, 5, 0)$", correct: true, feedback: "Steps $(2, 4, -2)$ and $(3, 6, -3)$ are proportional." },
        { text: "$(0, -7, -7)$, $(1, -4, -5)$, $(-1, -10, -9)$", correct: true, feedback: "Steps $(1, 3, 2)$ and $(-1, -3, -2)$: the first point is the midpoint." },
        { text: "$(0, 0, 0)$, $(3, -6, 9)$, $(-1, 2, -3)$", correct: true, feedback: "$(3, -6, 9) = -3(-1, 2, -3)$." },
        { text: "$(1, 1, 1)$, $(2, 3, 4)$, $(3, 5, 8)$", feedback: "Steps $(1, 2, 3)$ and $(2, 4, 7)$ are not proportional." },
        { text: "$(1, 0, 0)$, $(0, 1, 0)$, $(0, 0, 1)$", feedback: "They form an equilateral triangle." },
      ],
      hint: "Lessons 0.2 and 0.3: compare the steps from the first point.",
    },
    {
      type: "numeric",
      id: "tdg0-6-q7",
      variant: "mastery",
      question: "Find the area of the triangle with vertices $A(0, 1, 2)$, $B(2, -1, 3)$ and $C(1, -3, 1)$.",
      answer: 4.5,
      hint: "Lesson 0.2: compute the three squared sides and look for Pythagoras.",
      solution: "$AB^2 = 4 + 4 + 1 = 9$, $BC^2 = 1 + 4 + 4 = 9$, $AC^2 = 1 + 16 + 1 = 18$. Right-angled at $B$ with legs 3 and 3: area $\\frac12 \\cdot 3 \\cdot 3 = 4.5$.",
      commonMistakes: [{ answer: 9, feedback: "Half the product of the legs." }],
    },
    {
      type: "numeric",
      id: "tdg0-6-q8",
      variant: "mastery",
      question: "The triangle with vertices $(1, -2, 4)$, $(3, a, -2)$ and $(b, 5, c)$ has centroid $(2, 1, 3)$. Find $a + b + c$.",
      answer: 9,
      hint: "Lesson 0.4: the coordinate sums are $6$, $3$, $9$.",
      solution: "$1 + 3 + b = 6$ gives $b = 2$; $-2 + a + 5 = 3$ gives $a = 0$; $4 - 2 + c = 9$ gives $c = 7$. Sum 9.",
      commonMistakes: [{ answer: -3, feedback: "You subtracted the known coordinates from the centroid itself. Multiply the centroid by 3 first: the coordinate sums must be $6$, $3$, $9$." }],
    },
    {
      type: "numeric",
      id: "tdg0-6-q9",
      variant: "mastery",
      question:
        "Find the sum of the coordinates of the centroid of the tetrahedron with vertices $(1, 2, 3)$, $(-1, 0, 4)$, $(2, 3, -1)$ and $(2, -1, 2)$.",
      answer: 4,
      hint: "Lesson 0.4: average the four vertices.",
      solution: "Sum of vertices $(4, 4, 8)$, so $G = (1, 1, 2)$, sum 4.",
      commonMistakes: [{ answer: 5.3333, tolerance: 0.01, feedback: "Divide by 4, not 3." }],
    },
    {
      type: "numeric",
      id: "tdg0-6-q10",
      variant: "mastery",
      question: "A segment of length 9 has projections of lengths 1 and 4 on the x- and y-axes. Find the length of its projection on the z-axis.",
      answer: 8,
      hint: "Lesson 0.5: the squares of the projections add to the square of the length.",
      solution: "$\\sqrt{81 - 1 - 16} = \\sqrt{64} = 8$.",
      commonMistakes: [{ answer: 4, feedback: "$9 - 1 - 4$ treats lengths as if they add." }],
    },
    {
      type: "quiz",
      id: "tdg0-6-q11",
      variant: "mastery",
      question: "The locus of points equidistant from $O(0, 0, 0)$ and $A(2, 4, -6)$ is",
      options: [
        { text: "$x + 2y - 3z = 14$", correct: true, feedback: "$PO^2 = PA^2$ gives $4x + 8y - 12z = 56$. The midpoint $(1, 2, -3)$ satisfies it." },
        { text: "$x + 2y - 3z = 0$", feedback: "That plane passes through $O$, which is not equidistant from $O$ and $A$." },
        { text: "$x + 2y - 3z = 7$", feedback: "Test the midpoint $(1, 2, -3)$: $1 + 4 + 9 = 14$." },
        { text: "$x + 2y + 3z = 14$", feedback: "The normal must be along $\\overrightarrow{OA} = (2, 4, -6)$." },
      ],
      hint: "Lesson 0.2: expand $PO^2 = PA^2$; the squares cancel.",
    },
    {
      type: "numeric",
      id: "tdg0-6-q12",
      variant: "mastery",
      question:
        "JEE Main. A point $P$ is 3 units from the xy-plane, 4 units from the yz-plane and 5 units from the x-axis. Find $OP$ (to two decimal places).",
      answer: 6.4031,
      tolerance: 0.01,
      hint: "Lesson 0.1: $\\lvert z\\rvert = 3$, $\\lvert x\\rvert = 4$, and $y^2 + z^2 = 25$.",
      solution: "$z^2 = 9$, $x^2 = 16$, $y^2 = 25 - 9 = 16$. $OP = \\sqrt{16 + 16 + 9} = \\sqrt{41} \\approx 6.40$.",
      commonMistakes: [
        { answer: 7.0711, tolerance: 0.01, feedback: "$\\sqrt{9 + 16 + 25}$ treats 5 as a coordinate. The distance from the x-axis is $\\sqrt{y^2 + z^2}$." },
      ],
    },
    {
      type: "numeric",
      id: "tdg0-6-q13",
      variant: "mastery",
      question:
        "In triangle $ABC$, $A = (1, 1, 1)$ and the midpoint of $BC$ is $(4, 1, -2)$. Find the distance from $A$ to the centroid (to two decimal places).",
      answer: 2.8284,
      tolerance: 0.01,
      hint: "Lesson 0.4: the centroid is two thirds of the way along the median from $A$.",
      solution: "The median has length $\\sqrt{9 + 0 + 9} = 3\\sqrt2$; $AG = \\frac23 \\cdot 3\\sqrt2 = 2\\sqrt2 \\approx 2.83$.",
      commonMistakes: [
        { answer: 4.2426, tolerance: 0.01, feedback: "That is the whole median." },
        { answer: 1.4142, tolerance: 0.01, feedback: "That is $GD$, the short part." },
      ],
    },
    {
      type: "quiz",
      id: "tdg0-6-q14",
      variant: "mastery",
      multiple: true,
      question: "Which statements are true? Select all that apply.",
      options: [
        { text: "The points with $xyz > 0$ fill exactly four octants", correct: true, feedback: "Zero or two negative coordinates: $1 + 3 = 4$ sign patterns." },
        { text: "The plane $z = 0$ contains both the x-axis and the y-axis", correct: true, feedback: "It is the xy-plane." },
        { text: "The reflection of $(x, y, z)$ in the origin is $(-x, -y, -z)$", correct: true, feedback: "All three coordinates flip." },
        { text: "The points with $x = 0$ and $y = 0$ form the z-axis", correct: true, feedback: "Two equations: the intersection of the yz- and zx-planes." },
        { text: "The distance of $(x, y, z)$ from the z-axis is $\\lvert z\\rvert$", feedback: "It is $\\sqrt{x^2 + y^2}$; $\\lvert z\\rvert$ is the distance from the xy-plane." },
      ],
      hint: "Lesson 0.1.",
    },
    {
      type: "numeric",
      id: "tdg0-6-q15",
      variant: "mastery",
      question:
        "JEE Advanced. For $A(1, -2, 4)$ and $B(4, 4, -2)$, find the length of the part of the segment $AB$ that lies in the octant $(+, +, +)$.",
      answer: 3,
      hint: "Lessons 0.3 and 0.2: write the points of $AB$ as $A + t\\overrightarrow{AB}$, $0 \\le t \\le 1$, and find the $t$ where each coordinate is positive.",
      solution:
        "$\\overrightarrow{AB} = (3, 6, -6)$ and $AB = 9$. The point $(1 + 3t, -2 + 6t, 4 - 6t)$ has $x > 0$ always, $y > 0$ for $t > \\frac13$ (the zx-plane cuts $AB$ in $1 : 2$) and $z > 0$ for $t < \\frac23$ (the xy-plane cuts it in $2 : 1$). So $\\frac13 < t < \\frac23$: one third of $AB$, length 3.",
      commonMistakes: [
        { answer: 9, feedback: "9 is the whole segment; parts of it have $y < 0$ or $z < 0$." },
        { answer: 6, feedback: "The positive-$y$ part and the positive-$z$ part overlap only in the middle third." },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Where next",
      content:
        "You can now locate points, measure them and divide segments. Chapter 1 turns the projections of a segment into the **direction** of a line: divide $\\Delta x$, $\\Delta y$, $\\Delta z$ by the length and you get the direction cosines, which (with the dot product) give the angle between two lines and the projection of a segment on any line, not just on an axis.",
    },
  ]),
};

export const tdgChapter0Lessons: LessonSeed[] = [lesson01, lesson02, lesson03, lesson04, lesson05, lessonMastery];
