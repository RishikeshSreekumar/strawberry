import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Vector Algebra Chapter 1 — Vectors in Coordinates.
 * Pin arrows to an origin and a grid so they become numbers: position
 * vectors, i/j/k components, magnitude, unit vectors, direction cosines
 * and direction ratios.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "position-vectors",
  title: "1.1 · Position Vectors",
  position: 1,
  blocks: blocks([
    {
      type: "video",
      src: "/videos/va-1-vectors-in-coordinates.mp4",
      poster: "/videos/va-1-vectors-in-coordinates.jpg",
      title: "Chapter 1 overview video",
      caption:
        "A narrated walk through the whole chapter. Watch it now for the big picture, or come back to it as a recap.",
    },
    {
      type: "text",
      content:
        "In Chapter 0 a vector was a *free* arrow: slide it anywhere without turning or stretching it and it stays the same vector. That freedom is great for pictures, but a free arrow gives you nothing to calculate with. To turn arrows into numbers you need a fixed reference point to measure everything from.",
    },
    {
      type: "text",
      content:
        "So pick one point and call it the **origin** $O$. Now every point $P$ in the plane (or in space) comes with its own arrow: the one that starts at $O$ and ends at $P$. The point and that arrow carry exactly the same information. Tell me the arrow and I know where the point is. Tell me the point and I can draw the arrow.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Position vector",
      content:
        "The **position vector** of a point $P$ relative to the origin $O$ is $\\overrightarrow{OP}$. We name it with the matching lower-case letter: $\\vec p = \\overrightarrow{OP}$, $\\vec a = \\overrightarrow{OA}$, $\\vec b = \\overrightarrow{OB}$. If $P$ has coordinates $(x, y)$, the arrow $\\vec p$ runs from $(0,0)$ to $(x,y)$.",
    },
    {
      type: "text",
      content:
        "The payoff comes when you ask for the arrow **between** two points. Walk from $O$ to $A$, then from $A$ to $B$. By the triangle law this two-leg trip is the same as going straight from $O$ to $B$:",
    },
    {
      type: "math",
      latex:
        "\\overrightarrow{OA} + \\overrightarrow{AB} = \\overrightarrow{OB} \\quad\\Longrightarrow\\quad \\vec a + \\overrightarrow{AB} = \\vec b \\quad\\Longrightarrow\\quad \\overrightarrow{AB} = \\vec b - \\vec a",
    },
    {
      type: "text",
      content:
        "Read the result aloud: the arrow from $A$ to $B$ is **(where you end) minus (where you start)**. Or, since $\\overrightarrow{AB}$ has its tail at $A$ and its tip at $B$: **tip minus tail**. Drag $A$ and $B$ below and compare the arrow $\\overrightarrow{AB}$ with the difference of the two position vectors.",
    },
    {
      type: "interactive",
      config: {
        component: "vec-canvas-2d",
        mode: "position",
        a: [-3, 1],
        b: [2, 3],
        draggable: ["a", "b"],
        readouts: ["components", "magnitude"],
        caption:
          "The two faint arrows from O are the position vectors of A and B. The bold arrow from A to B is always b − a: tip minus tail.",
      },
    },
    {
      type: "text",
      content:
        "In coordinates, subtracting position vectors means subtracting coordinates, one pair at a time. If $A = (x_1, y_1)$ and $B = (x_2, y_2)$, the arrow from $A$ to $B$ moves $x_2 - x_1$ across and $y_2 - y_1$ up. (Lesson 1.2 will make \"across\" and \"up\" precise with $\\hat i$ and $\\hat j$.)",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: AB = a − b",
      content:
        "The letters appear in the order $A$, $B$, so it is tempting to subtract in that order. But $\\vec a - \\vec b$ is the arrow from $B$ **to** $A$: it has the right length and exactly the wrong direction. Always subtract the start from the end: $\\overrightarrow{AB} = \\vec b - \\vec a$ and $\\overrightarrow{BA} = \\vec a - \\vec b = -\\overrightarrow{AB}$.",
    },
    {
      type: "text",
      content:
        "**Worked example 1.** $A = (2, -1)$ and $B = (5, 3)$. Find $\\overrightarrow{AB}$ and its length.\n\n1. End minus start: $\\overrightarrow{AB} = (5 - 2,\\ 3 - (-1)) = (3, 4)$.\n2. The arrow goes 3 across and 4 up, so by Pythagoras its length is $\\sqrt{3^2 + 4^2} = 5$.\n3. Check the direction: from $A$ you must go right and up to reach $B$, and both numbers are positive. Good.",
    },
    {
      type: "text",
      content:
        "**Worked example 2.** $A = (1, 4)$ and $\\overrightarrow{AB} = (-3, 2)$. Where is $B$?\n\n1. Rearrange $\\overrightarrow{AB} = \\vec b - \\vec a$ as $\\vec b = \\vec a + \\overrightarrow{AB}$. (This is the triangle law again: start at $A$, then walk along $\\overrightarrow{AB}$.)\n2. $\\vec b = (1 + (-3),\\ 4 + 2) = (-2, 6)$, so $B = (-2, 6)$.",
    },
    {
      type: "text",
      content:
        "**Worked example 2b: a ship's log (application).** Measure positions in km from a lighthouse $O$, with $x$ pointing east and $y$ north. A ship leaves port $P = (-2, 1)$ and sails straight to a buoy $B = (4, 9)$. From the buoy it sails on with displacement $\\overrightarrow{BC} = (3, -5)$ to a fishing ground $C$. Find (a) the distance from port to buoy, (b) where $C$ is, and (c) how far $C$ is from port in a straight line.",
    },
    {
      type: "math",
      latex:
        "\\overrightarrow{PB} = \\vec b - \\vec p = (4 - (-2),\\ 9 - 1) = (6, 8), \\qquad PB = \\sqrt{6^2 + 8^2} = 10 \\text{ km}",
    },
    {
      type: "text",
      content:
        "*Why this step:* the trip from port to buoy is an arrow between two points, so it is end minus start. Its length is the distance sailed.\n\n**(b)** $\\vec c = \\vec b + \\overrightarrow{BC} = (4 + 3,\\ 9 - 5) = (7, 4)$. *Why:* we know where the second leg starts and which arrow it follows, so we add, exactly as in worked example 2.\n\n**(c)** $\\overrightarrow{PC} = \\vec c - \\vec p = (7 - (-2),\\ 4 - 1) = (9, 3)$, so $PC = \\sqrt{81 + 9} = \\sqrt{90} = 3\\sqrt{10} \\approx 9.49$ km.\n\nCheck with the triangle law: $\\overrightarrow{PB} + \\overrightarrow{BC} = (6, 8) + (3, -5) = (9, 3) = \\overrightarrow{PC}$. The ship sailed $10 + \\sqrt{34} \\approx 15.8$ km but ended only about $9.5$ km from port: distances along a path do not add like arrows do.",
    },
    {
      type: "text",
      content:
        "**Worked example 3: the origin does not matter.** Move the origin somewhere else and every position vector changes. Does $\\overrightarrow{AB}$ change? Suppose the new origin $O'$ sits at position $\\vec s$ from the old one. Then the new position vectors are $\\vec a - \\vec s$ and $\\vec b - \\vec s$, and\n\n$(\\vec b - \\vec s) - (\\vec a - \\vec s) = \\vec b - \\vec a.$\n\nThe shift cancels. Position vectors depend on where you put $O$, but the arrow from $A$ to $B$ does not. That is the free vector from Chapter 0, recovered.",
    },
    {
      type: "text",
      content:
        "**Worked example 4: the missing vertex (exam style).** $ABCD$ is a parallelogram (vertices in that order) with $A = (1, 2)$, $B = (4, 3)$ and $C = (6, 6)$. Find $D$.\n\n1. In parallelogram $ABCD$, side $AB$ and side $DC$ are the same free vector: equal length, same direction. *Why this step:* worked example 3 showed that an arrow between two points is a free vector, so \"opposite sides are equal and parallel\" becomes one vector equation.",
    },
    {
      type: "math",
      latex:
        "\\overrightarrow{AB} = \\overrightarrow{DC} \\;\\Longrightarrow\\; \\vec b - \\vec a = \\vec c - \\vec d \\;\\Longrightarrow\\; \\vec d = \\vec a + \\vec c - \\vec b",
    },
    {
      type: "text",
      content:
        "2. $\\vec d = (1 + 6 - 4,\\ 2 + 6 - 3) = (3, 5)$, so $D = (3, 5)$.\n3. Check the other pair of sides: $\\overrightarrow{AD} = (2, 3)$ and $\\overrightarrow{BC} = (2, 3)$. Equal, as they must be.\n\n*Exam trap:* if the question only says \"$A$, $B$, $C$ are three vertices of a parallelogram\" without fixing the order, there are **three** answers: $\\vec a + \\vec c - \\vec b = (3, 5)$, $\\vec a + \\vec b - \\vec c = (-1, -1)$ and $\\vec b + \\vec c - \\vec a = (9, 7)$. The missing vertex is always the sum of its two neighbours minus the vertex opposite it.",
    },
    {
      type: "table",
      headers: ["Arrow", "In position vectors", "Say it as"],
      rows: [
        ["$\\overrightarrow{OA}$", "$\\vec a$", "the position vector of A"],
        ["$\\overrightarrow{AO}$", "$-\\vec a$", "back from A to the origin"],
        ["$\\overrightarrow{AB}$", "$\\vec b - \\vec a$", "end B minus start A"],
        ["$\\overrightarrow{BA}$", "$\\vec a - \\vec b$", "end A minus start B"],
        ["$\\overrightarrow{AB} + \\overrightarrow{BC}$", "$(\\vec b - \\vec a) + (\\vec c - \\vec b) = \\vec c - \\vec a$", "the triangle law: $\\overrightarrow{AC}$"],
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "A quick self-check",
      content:
        "After computing $\\overrightarrow{AB}$, add it to $A$. You must land on $B$. If you land somewhere else, you subtracted in the wrong order.",
    },
    {
      type: "quiz",
      id: "va1-1-q1",
      variant: "concept",
      question: "$A = (1, 2)$ and $B = (4, 6)$. What is $\\overrightarrow{AB}$?",
      options: [
        { text: "$(3, 4)$", correct: true, feedback: "End minus start: $(4 - 1, 6 - 2)$. Adding it to $A$ lands you on $B$." },
        { text: "$(-3, -4)$", feedback: "That is $\\vec a - \\vec b$, the arrow from $B$ back to $A$. Subtract the start from the end." },
        { text: "$(5, 8)$", feedback: "That is $\\vec a + \\vec b$. A displacement between points is a difference, not a sum." },
      ],
      hint: "Tip minus tail: the tip of $\\overrightarrow{AB}$ is at $B$.",
    },
    {
      type: "quiz",
      id: "va1-1-q2",
      variant: "practice",
      question: "$P$ has position vector $(2, -3)$ and $\\overrightarrow{PQ} = (4, 5)$. Where is $Q$?",
      options: [
        { text: "$(6, 2)$", correct: true, feedback: "$\\vec q = \\vec p + \\overrightarrow{PQ} = (2 + 4, -3 + 5)$." },
        { text: "$(-2, -8)$", feedback: "That is $\\vec p - \\overrightarrow{PQ}$, which walks the arrow backwards from $P$." },
        { text: "$(2, 8)$", feedback: "That is $\\overrightarrow{PQ} - \\vec p$. Start at $P$ and walk along $\\overrightarrow{PQ}$: add." },
      ],
    },
    {
      type: "quiz",
      id: "va1-1-q3",
      variant: "practice",
      question: "$A = (-1, 3)$ and $B = (2, -1)$. What is $\\overrightarrow{BA}$?",
      options: [
        { text: "$(-3, 4)$", correct: true, feedback: "$\\overrightarrow{BA}$ ends at $A$ and starts at $B$: $\\vec a - \\vec b = (-1 - 2, 3 - (-1))$." },
        { text: "$(3, -4)$", feedback: "That is $\\overrightarrow{AB}$. The order of the letters matters: $\\overrightarrow{BA}$ starts at $B$." },
        { text: "$(1, 2)$", feedback: "That is $\\vec a + \\vec b$." },
      ],
    },
    {
      type: "quiz",
      id: "va1-1-q4",
      variant: "concept",
      question: "You move the origin to a different point. What happens to the position vectors $\\vec a$, $\\vec b$ and to $\\overrightarrow{AB}$?",
      options: [
        { text: "$\\vec a$ and $\\vec b$ change, but $\\overrightarrow{AB}$ stays the same.", correct: true, feedback: "Both position vectors shift by the same amount, and the shift cancels in $\\vec b - \\vec a$." },
        { text: "All three change.", feedback: "The arrow from $A$ to $B$ is fixed by the two points alone. It does not know where the origin is." },
        { text: "Nothing changes: position vectors do not depend on the origin.", feedback: "They do: a position vector is an arrow from the origin, so a new origin means new arrows." },
      ],
    },
    {
      type: "quiz",
      id: "va1-1-q5",
      variant: "practice",
      question: "For any three points $A$, $B$, $C$, what is $\\overrightarrow{AB} + \\overrightarrow{BC} + \\overrightarrow{CA}$?",
      options: [
        { text: "$\\vec 0$", correct: true, feedback: "$(\\vec b - \\vec a) + (\\vec c - \\vec b) + (\\vec a - \\vec c)$: everything cancels. A closed trip has zero displacement." },
        { text: "$2\\overrightarrow{AC}$", feedback: "Write each arrow as end minus start and add: every position vector appears once with $+$ and once with $-$." },
        { text: "$\\vec a + \\vec b + \\vec c$", feedback: "Expand each arrow as end minus start. The terms cancel in pairs." },
      ],
    },
    {
      type: "quiz",
      id: "va1-1-q6",
      variant: "practice",
      question: "A delivery robot drives in a straight line from $(-1, 4)$ to $(5, -4)$, in metres. How far does it travel?",
      options: [
        { text: "$10$ m", correct: true, feedback: "The displacement is $(5 - (-1),\\ -4 - 4) = (6, -8)$, and $\\sqrt{36 + 64} = 10$." },
        { text: "$14$ m", feedback: "That adds $6 + 8$: the walk along two sides of a rectangle, not the straight line. Use Pythagoras." },
        { text: "$4$ m", feedback: "That is the length of $\\vec a + \\vec b = (4, 0)$. The trip is end minus start." },
      ],
      hint: "Find the displacement (end minus start), then its length.",
    },
    {
      type: "quiz",
      id: "va1-1-q7",
      variant: "practice",
      question: "$PQRS$ is a parallelogram with $P = (0, 1)$, $Q = (3, 2)$ and $R = (5, 5)$. Where is $S$?",
      options: [
        { text: "$(2, 4)$", correct: true, feedback: "$\\overrightarrow{PQ} = \\overrightarrow{SR}$ gives $\\vec s = \\vec p + \\vec r - \\vec q = (0 + 5 - 3,\\ 1 + 5 - 2)$. Check: $\\overrightarrow{PS} = (2, 3) = \\overrightarrow{QR}$." },
        { text: "$(8, 6)$", feedback: "That is $\\vec q + \\vec r - \\vec p$, the vertex opposite $P$. In $PQRS$, $S$ is opposite $Q$." },
        { text: "$(-2, -2)$", feedback: "That is $\\vec p + \\vec q - \\vec r$, the vertex opposite $R$. $S$ is opposite $Q$, so subtract $\\vec q$." },
      ],
      hint: "The missing vertex = (its two neighbours) minus (the vertex opposite it). $S$'s neighbours are $P$ and $R$.",
    },
    {
      type: "quiz",
      id: "va1-1-q8",
      variant: "practice",
      question: "A survey drone starts at $P = (-3, 2)$ (in metres), flies straight to $B = (1, 5)$, then flies on with displacement $\\overrightarrow{BC} = (2, -9)$. How far is $C$ from $P$ in a straight line?",
      options: [
        { text: "$6\\sqrt2 \\approx 8.49$ m", correct: true, feedback: "$\\vec c = \\vec b + \\overrightarrow{BC} = (3, -4)$, so $\\overrightarrow{PC} = (3 - (-3),\\ -4 - 2) = (6, -6)$ and $|\\overrightarrow{PC}| = \\sqrt{72} = 6\\sqrt2$. Check: $\\overrightarrow{PB} + \\overrightarrow{BC} = (4, 3) + (2, -9) = (6, -6)$." },
        { text: "$5 + \\sqrt{85} \\approx 14.2$ m", feedback: "That is the distance flown along the two legs, $|(4, 3)| + |(2, -9)|$. Straight-line distance is the length of the total displacement." },
        { text: "$12$ m", feedback: "That adds $6 + 6$, the walk along two sides of a square. Use Pythagoras on $(6, -6)$." },
      ],
      hint: "Find $C$ first by adding $\\overrightarrow{BC}$ to $\\vec b$, then take end minus start from $P$.",
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "components-in-the-plane",
  title: "1.2 · Components in the Plane",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "You pull a heavy box across the floor with a rope, pulling with a force of 10 N at $30^\\circ$ above the ground. Only part of that pull drags the box forward. The rest tries to lift it. How much goes each way?",
    },
    {
      type: "text",
      content:
        "Answering that means splitting the arrow into a horizontal piece and a vertical piece. Those two pieces are the vector's **components**, and they turn every plane vector into a pair of numbers.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The unit vectors i and j",
      content:
        "$\\hat i$ is the arrow of length 1 pointing along the positive $x$-axis, and $\\hat j$ is the arrow of length 1 along the positive $y$-axis. In coordinates, $\\hat i$ runs from $(0,0)$ to $(1,0)$ and $\\hat j$ from $(0,0)$ to $(0,1)$.",
    },
    {
      type: "text",
      content:
        "Take a point $P = (x, y)$ and drop a perpendicular to the $x$-axis at $M = (x, 0)$. The walk $O \\to M \\to P$ goes $x$ units along the $x$-axis, then $y$ units parallel to the $y$-axis. By the triangle law, and because scaling $\\hat i$ by $x$ gives an arrow $x$ units long in that direction:",
    },
    {
      type: "math",
      latex: "\\overrightarrow{OP} = \\overrightarrow{OM} + \\overrightarrow{MP} = x\\,\\hat i + y\\,\\hat j",
    },
    {
      type: "text",
      content:
        "**This split is unique.** Suppose $x\\hat i + y\\hat j = x'\\hat i + y'\\hat j$. Then $(x - x')\\hat i = (y' - y)\\hat j$. The left side points along the $x$-axis and the right side along the $y$-axis. Two such arrows can only be equal if both are $\\vec 0$, so $x = x'$ and $y = y'$. Each plane vector has exactly one pair of components.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Components",
      content:
        "If $\\vec r = x\\hat i + y\\hat j$, then $x$ is the $x$-component and $y$ is the $y$-component of $\\vec r$. We often write the pair as $\\vec r = (x, y)$. The vectors $x\\hat i$ and $y\\hat j$ are called the **vector components**.",
    },
    {
      type: "text",
      content:
        "**From length and angle to components.** Suppose $\\vec r$ has length $r$ and makes angle $\\theta$ with the positive $x$-axis. The arrow, its horizontal leg and its vertical leg form a right triangle with hypotenuse $r$. This is the triangle from trigonometry: the horizontal leg is $r\\cos\\theta$ and the vertical leg is $r\\sin\\theta$. Change the angle and the size of the pull below.",
    },
    {
      type: "interactive",
      config: {
        component: "right-triangle-explorer",
        initialAngle: 30,
        minAngle: 10,
        maxAngle: 80,
        initialScale: 10,
        minScale: 2,
        maxScale: 10,
        showScale: true,
        ratios: ["cos", "sin"],
        angleLabel: "\\theta",
        unit: "N",
        caption:
          "The hypotenuse is the rope's pull. The bottom side is the forward part, r cos θ, and the upright side is the lifting part, r sin θ. A steeper rope sends more of the pull into lifting.",
      },
    },
    {
      type: "math",
      latex: "x = r\\cos\\theta, \\qquad y = r\\sin\\theta, \\qquad \\vec r = r\\cos\\theta\\,\\hat i + r\\sin\\theta\\,\\hat j",
    },
    {
      type: "text",
      content:
        "**Worked example 1: the rope.** $r = 10$ N and $\\theta = 30^\\circ$.\n\n1. Forward part: $x = 10\\cos 30^\\circ = 10 \\cdot \\frac{\\sqrt 3}{2} = 5\\sqrt 3 \\approx 8.66$ N.\n2. Lifting part: $y = 10\\sin 30^\\circ = 10 \\cdot \\frac12 = 5$ N.\n3. So $\\vec F = 5\\sqrt3\\,\\hat i + 5\\,\\hat j$. Check: $\\sqrt{(5\\sqrt3)^2 + 5^2} = \\sqrt{75 + 25} = 10$. The length comes back.",
    },
    {
      type: "text",
      content:
        "The formulas $x = r\\cos\\theta$ and $y = r\\sin\\theta$ are the unit-circle definitions from trigonometry, scaled by $r$. They hold for **any** angle, not only acute ones. For an arrow pointing into the second quadrant, $\\cos\\theta$ is negative, so $x$ is negative. That is the correct answer: the arrow really does go left.",
    },
    {
      type: "interactive",
      config: {
        component: "vec-canvas-2d",
        mode: "components",
        a: [-3, 4],
        draggable: ["a"],
        readouts: ["components", "magnitude", "angle"],
        caption:
          "Drag the tip around all four quadrants. The dashed legs show x î and y ĵ. When the tip is left of the y-axis, the x-component is negative.",
      },
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: components are lengths, so they can't be negative",
      content:
        "A component is a **signed** number: it records both how far and which way along the axis. The vector $-3\\hat i + 4\\hat j$ has $x$-component $-3$. Its horizontal leg has *length* $3$, but the component is $-3$, because the arrow goes left. If you drop the sign you describe a different vector, the mirror image $3\\hat i + 4\\hat j$.",
    },
    {
      type: "table",
      headers: ["Arrow points into", "Angle $\\theta$", "Sign of $x$", "Sign of $y$"],
      rows: [
        ["Quadrant I", "$0^\\circ < \\theta < 90^\\circ$", "$+$", "$+$"],
        ["Quadrant II", "$90^\\circ < \\theta < 180^\\circ$", "$-$", "$+$"],
        ["Quadrant III", "$180^\\circ < \\theta < 270^\\circ$", "$-$", "$-$"],
        ["Quadrant IV", "$270^\\circ < \\theta < 360^\\circ$", "$+$", "$-$"],
      ],
    },
    {
      type: "text",
      content:
        "**Going back: from components to length and angle.** The legs are $|x|$ and $|y|$, so Pythagoras gives the length $r = \\sqrt{x^2 + y^2}$. (Squaring removes the signs.) For the angle, $\\tan\\theta = \\frac{y}{x}$, but a calculator's $\\tan^{-1}$ only returns angles between $-90^\\circ$ and $90^\\circ$. Always check which quadrant the arrow points into.",
    },
    {
      type: "text",
      content:
        "**Worked example 2.** Find the length and direction of $\\vec v = -3\\hat i + 4\\hat j$.\n\n1. Length: $\\sqrt{(-3)^2 + 4^2} = \\sqrt{25} = 5$.\n2. Signs: $x < 0$, $y > 0$, so the arrow points into quadrant II.\n3. Reference angle: $\\tan^{-1}\\frac{4}{3} \\approx 53.13^\\circ$.\n4. In quadrant II, $\\theta = 180^\\circ - 53.13^\\circ \\approx 126.87^\\circ$.",
    },
    {
      type: "text",
      content:
        "**Adding and scaling in components.** Let $\\vec a = a_1\\hat i + a_2\\hat j$ and $\\vec b = b_1\\hat i + b_2\\hat j$. The addition laws from Chapter 0 let us regroup the four pieces, and the distributive law for scalars merges the like terms:",
    },
    {
      type: "math",
      latex:
        "\\vec a + \\vec b = (a_1\\hat i + b_1\\hat i) + (a_2\\hat j + b_2\\hat j) = (a_1 + b_1)\\hat i + (a_2 + b_2)\\hat j",
    },
    {
      type: "math",
      latex: "k\\vec a = k(a_1\\hat i + a_2\\hat j) = (ka_1)\\hat i + (ka_2)\\hat j",
    },
    {
      type: "text",
      content:
        "So the triangle law, which in Chapter 0 needed a careful drawing, becomes plain arithmetic: **add the components separately, and scale each component by** $k$. Subtraction follows as $\\vec a - \\vec b = \\vec a + (-1)\\vec b$.",
    },
    {
      type: "text",
      content:
        "**Worked example 3.** $\\vec a = 2\\hat i - \\hat j$ and $\\vec b = -\\hat i + 3\\hat j$. Find $3\\vec a - 2\\vec b$.\n\n1. $3\\vec a = 6\\hat i - 3\\hat j$.\n2. $2\\vec b = -2\\hat i + 6\\hat j$.\n3. $3\\vec a - 2\\vec b = (6 - (-2))\\hat i + (-3 - 6)\\hat j = 8\\hat i - 9\\hat j$.",
    },
    {
      type: "text",
      content:
        "**Worked example 3b: building one vector from two (exam style).** $\\vec a = 2\\hat i + 3\\hat j$ and $\\vec b = -\\hat i + 2\\hat j$. Write $\\vec c = 4\\hat i + 13\\hat j$ as $p\\,\\vec a + q\\,\\vec b$.\n\n1. Expand the right side in components: $p\\vec a + q\\vec b = (2p - q)\\hat i + (3p + 2q)\\hat j$. *Why this step:* scaling and adding work one component at a time, so the combination is just another pair of numbers.\n2. Components are unique, so match them with $\\vec c$:",
    },
    {
      type: "math",
      latex: "2p - q = 4, \\qquad 3p + 2q = 13",
    },
    {
      type: "text",
      content:
        "3. From the first equation $q = 2p - 4$. Substitute: $3p + 2(2p - 4) = 13$, so $7p = 21$, giving $p = 3$ and $q = 2$.\n4. Check: $3(2\\hat i + 3\\hat j) + 2(-\\hat i + 2\\hat j) = (6 - 2)\\hat i + (9 + 4)\\hat j = 4\\hat i + 13\\hat j$. ✓\n\nThe uniqueness of components is what turns one vector equation into two ordinary equations. Without it, you could not \"match\" anything.",
    },
    {
      type: "quiz",
      id: "va1-2-q6",
      variant: "practice",
      question: "$\\vec a = \\hat i + 2\\hat j$ and $\\vec b = 3\\hat i - \\hat j$. If $5\\hat i + 3\\hat j = p\\,\\vec a + q\\,\\vec b$, what are $p$ and $q$?",
      options: [
        { text: "$p = 2,\\ q = 1$", correct: true, feedback: "Matching components: $p + 3q = 5$ and $2p - q = 3$. Then $p = 5 - 3q$ gives $10 - 7q = 3$, so $q = 1$, $p = 2$. Check: $(2 + 3)\\hat i + (4 - 1)\\hat j$." },
        { text: "$p = 1,\\ q = 2$", feedback: "Then $1\\vec a + 2\\vec b = 7\\hat i + 0\\hat j$. Swapped values: always substitute back." },
        { text: "$p = 5,\\ q = 3$", feedback: "Those are the components of the target vector, not the multipliers. Set up $p + 3q = 5$ and $2p - q = 3$." },
      ],
      hint: "Expand $p\\vec a + q\\vec b$ into $\\hat i$ and $\\hat j$ parts, then match each part.",
    },
    {
      type: "text",
      content:
        "**Worked example 4: a velocity pointing down and to the left.** A ball moves at 20 m/s in the direction $240^\\circ$. Resolve it.\n\n1. $x = 20\\cos 240^\\circ = 20 \\cdot (-\\tfrac12) = -10$.\n2. $y = 20\\sin 240^\\circ = 20 \\cdot (-\\tfrac{\\sqrt3}{2}) = -10\\sqrt3 \\approx -17.32$.\n3. $\\vec v = -10\\,\\hat i - 10\\sqrt3\\,\\hat j$. Both components are negative because $240^\\circ$ is in quadrant III.",
    },
    {
      type: "text",
      content:
        "**Worked example 5: two ropes on one crate (application).** Two people pull a crate across a floor. One pulls with $10$ N at $30^\\circ$ to the $x$-axis, the other with $6$ N at $120^\\circ$. What single pull would do the same job (the **resultant**), and which way does it point?\n\n1. Resolve each force. *Why this step:* arrows at different angles cannot be added as numbers, but their components can.",
    },
    {
      type: "math",
      latex:
        "\\vec F_1 = 10\\cos30^\\circ\\,\\hat i + 10\\sin30^\\circ\\,\\hat j = 5\\sqrt3\\,\\hat i + 5\\,\\hat j, \\qquad \\vec F_2 = 6\\cos120^\\circ\\,\\hat i + 6\\sin120^\\circ\\,\\hat j = -3\\,\\hat i + 3\\sqrt3\\,\\hat j",
    },
    {
      type: "text",
      content:
        "2. Add component by component: $\\vec R = (5\\sqrt3 - 3)\\,\\hat i + (5 + 3\\sqrt3)\\,\\hat j \\approx 5.66\\,\\hat i + 10.20\\,\\hat j$.\n3. Length: $|\\vec R| = \\sqrt{5.66^2 + 10.20^2} \\approx 11.66$ N. Exactly, $|\\vec R|^2 = (5\\sqrt3 - 3)^2 + (5 + 3\\sqrt3)^2 = (84 - 30\\sqrt3) + (52 + 30\\sqrt3) = 136$, so $|\\vec R| = \\sqrt{136} = 2\\sqrt{34}$ N.\n4. Direction: both components are positive (quadrant I), so $\\theta = \\tan^{-1}\\frac{10.20}{5.66} \\approx 60.96^\\circ$.\n\n*Cross-check:* $30^\\circ$ and $120^\\circ$ are exactly $90^\\circ$ apart, so the two pulls are perpendicular and $|\\vec R| = \\sqrt{10^2 + 6^2} = \\sqrt{136}$. The resultant sits $\\tan^{-1}\\frac{6}{10} \\approx 30.96^\\circ$ beyond the first rope: $30^\\circ + 30.96^\\circ = 60.96^\\circ$. Two different routes, same answer. Note that the resultant is **less** than $10 + 6 = 16$ N: pulls at an angle partly waste each other.",
    },
    {
      type: "quiz",
      id: "va1-2-q7",
      variant: "practice",
      question: "Two forces act on a point: $6$ N at $0^\\circ$ and $6$ N at $120^\\circ$. What is their resultant?",
      options: [
        { text: "$6$ N at $60^\\circ$", correct: true, feedback: "$\\vec F_1 = 6\\hat i$ and $\\vec F_2 = -3\\hat i + 3\\sqrt3\\hat j$, so $\\vec R = 3\\hat i + 3\\sqrt3\\hat j$. Length $\\sqrt{9 + 27} = 6$, angle $\\tan^{-1}\\sqrt3 = 60^\\circ$." },
        { text: "$12$ N at $60^\\circ$", feedback: "Magnitudes only add when the forces point the same way. Resolve and add components: the $x$-parts partly cancel." },
        { text: "$6\\sqrt3$ N at $60^\\circ$", feedback: "That would be the resultant if the forces were $60^\\circ$ apart. Here they are $120^\\circ$ apart; resolve $6$ N at $120^\\circ$ carefully: its $x$-part is $-3$." },
      ],
      hint: "Resolve each force with $r\\cos\\theta$, $r\\sin\\theta$, then add.",
    },
    {
      type: "quiz",
      id: "va1-2-q1",
      variant: "practice",
      question: "A vector of length 6 makes an angle of $150^\\circ$ with the positive $x$-axis. What are its components?",
      options: [
        { text: "$(-3\\sqrt3,\\ 3)$", correct: true, feedback: "$6\\cos150^\\circ = -3\\sqrt3$ and $6\\sin150^\\circ = 3$. The arrow points into quadrant II, so it goes left and up." },
        { text: "$(3\\sqrt3,\\ 3)$", feedback: "That arrow points into quadrant I, at $30^\\circ$. The $x$-component must carry the minus sign." },
        { text: "$(3,\\ -3\\sqrt3)$", feedback: "Sine and cosine are swapped, and the signs are wrong. $x$ goes with cosine." },
      ],
      hint: "Use $x = r\\cos\\theta$, $y = r\\sin\\theta$ directly. The signs take care of themselves.",
    },
    {
      type: "quiz",
      id: "va1-2-q2",
      variant: "practice",
      question: "$\\vec a = 3\\hat i - 2\\hat j$ and $\\vec b = -\\hat i + 4\\hat j$. What is $2\\vec a + \\vec b$?",
      options: [
        { text: "$5\\hat i$", correct: true, feedback: "$(6 - 1)\\hat i + (-4 + 4)\\hat j = 5\\hat i + 0\\hat j$." },
        { text: "$5\\hat i + 8\\hat j$", feedback: "Check the $\\hat j$ part: $2 \\times (-2) + 4 = 0$." },
        { text: "$7\\hat i - 8\\hat j$", feedback: "That is $2\\vec a - \\vec b$." },
      ],
    },
    {
      type: "quiz",
      id: "va1-2-q3",
      variant: "concept",
      question: "Which statement about $\\vec v = -4\\hat i - 3\\hat j$ is correct?",
      options: [
        { text: "Its $x$-component is $-4$, and its horizontal leg has length 4.", correct: true, feedback: "The component is signed. The length of the leg is its absolute value." },
        { text: "Its components are 4 and 3, since components are lengths.", feedback: "Then $\\vec v$ would equal $4\\hat i + 3\\hat j$, which points the opposite way. Components carry signs." },
        { text: "Its length is $-5$.", feedback: "A length is never negative: $\\sqrt{16 + 9} = 5$. Only components can be negative." },
      ],
    },
    {
      type: "quiz",
      id: "va1-2-q4",
      variant: "concept",
      question: "What are the length and direction of $-\\sqrt3\\,\\hat i + \\hat j$?",
      options: [
        { text: "Length 2, at $150^\\circ$", correct: true, feedback: "$\\sqrt{3 + 1} = 2$. The arrow points into quadrant II with reference angle $30^\\circ$, so $180^\\circ - 30^\\circ = 150^\\circ$." },
        { text: "Length 2, at $-30^\\circ$", feedback: "That is what $\\tan^{-1}(-1/\\sqrt3)$ gives on a calculator, but $-30^\\circ$ points into quadrant IV. This arrow goes left and up." },
        { text: "Length 2, at $30^\\circ$", feedback: "That arrow goes right and up. Here the $x$-component is negative." },
      ],
      hint: "Find the quadrant from the signs before you trust $\\tan^{-1}$.",
    },
    {
      type: "quiz",
      id: "va1-2-q5",
      variant: "practice",
      question: "If $(x + y)\\hat i + (x - y)\\hat j = 5\\hat i + \\hat j$, what are $x$ and $y$?",
      options: [
        { text: "$x = 3,\\ y = 2$", correct: true, feedback: "Components are unique, so $x + y = 5$ and $x - y = 1$. Adding gives $2x = 6$." },
        { text: "$x = 2,\\ y = 3$", feedback: "Then $x - y = -1$, not 1." },
        { text: "$x = 5,\\ y = 1$", feedback: "Those are the components on the right, not $x$ and $y$. Set up the two equations." },
      ],
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "into-three-dimensions",
  title: "1.3 · Into Three Dimensions",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "A drone hovers above a playground. To say where it is, \"4 m east and 3 m north of the gate\" is not enough. You also need its height. Space needs three numbers, so it needs a third axis and a third unit vector.",
    },
    {
      type: "text",
      content:
        "Put three mutually perpendicular axes through the origin: $x$, $y$ and $z$. There are two mirror-image ways to label them, and mathematics and physics always use the same one: the **right-handed** system.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Right-handed axes",
      content:
        "Point the fingers of your right hand along the positive $x$-axis and curl them towards the positive $y$-axis. Your thumb then points along the positive $z$-axis. If $x$ points east and $y$ points north, $z$ points up. Swapping any two axes (or reversing one) gives the mirror-image, left-handed system. Every formula in this course assumes right-handed axes; in Chapter 4 the cross product would come out pointing the wrong way in a left-handed system.",
    },
    {
      type: "text",
      content:
        "Along the axes sit three unit vectors: $\\hat i$ along $x$, $\\hat j$ along $y$ and $\\hat k$ along $z$. The argument from Lesson 1.2 works one dimension higher. To reach $P = (x, y, z)$, walk $x$ along $\\hat i$, then $y$ along $\\hat j$, then $z$ along $\\hat k$:",
    },
    {
      type: "math",
      latex: "\\vec r = \\overrightarrow{OP} = x\\,\\hat i + y\\,\\hat j + z\\,\\hat k",
    },
    {
      type: "text",
      content:
        "The three numbers are again unique, and addition and scaling still work one component at a time: $(a_1, a_2, a_3) + (b_1, b_2, b_3) = (a_1 + b_1, a_2 + b_2, a_3 + b_3)$ and $k(a_1, a_2, a_3) = (ka_1, ka_2, ka_3)$.",
    },
    {
      type: "table",
      headers: ["Where the point lies", "Its coordinates", "Its position vector"],
      rows: [
        ["On the $x$-axis", "$(x, 0, 0)$", "$x\\hat i$"],
        ["On the $z$-axis", "$(0, 0, z)$", "$z\\hat k$"],
        ["In the $xy$-plane (the floor)", "$(x, y, 0)$", "$x\\hat i + y\\hat j$"],
        ["In the $yz$-plane", "$(0, y, z)$", "$y\\hat j + z\\hat k$"],
        ["Anywhere", "$(x, y, z)$", "$x\\hat i + y\\hat j + z\\hat k$"],
      ],
    },
    {
      type: "text",
      content:
        "**The length.** How long is $\\vec r$? Picture a box with one corner at $O$ and the opposite corner at $P$, its edges along the axes with lengths $|x|$, $|y|$, $|z|$. The vector $\\vec r$ is the box's long diagonal. Find its length with Pythagoras, used twice.",
    },
    {
      type: "text",
      content:
        "**Step 1, along the floor.** Let $Q = (x, y, 0)$ be the point on the floor directly below $P$. The floor diagonal $OQ$ is the hypotenuse of a flat right triangle with legs $|x|$ and $|y|$:\n\n$OQ^2 = x^2 + y^2.$\n\n**Step 2, straight up.** The segment $QP$ is vertical, so it is perpendicular to everything on the floor, including $OQ$. Triangle $OQP$ has its right angle at $Q$, with legs $OQ$ and $|z|$:\n\n$OP^2 = OQ^2 + z^2 = x^2 + y^2 + z^2.$",
    },
    {
      type: "math",
      latex: "|\\vec r| = \\sqrt{x^2 + y^2 + z^2}",
    },
    {
      type: "interactive",
      config: {
        component: "vec-space-3d",
        mode: "components",
        a: [2, 3, 6],
        sliders: [
          { name: "ax", min: -4, max: 4, step: 1, initial: 2 },
          { name: "ay", min: -4, max: 4, step: 1, initial: 3 },
          { name: "az", min: -6, max: 6, step: 1, initial: 6 },
        ],
        showBox: true,
        readouts: ["magnitude"],
        caption:
          "Drag to rotate the view. The floor diagonal and the vertical leg form the second right triangle. At (2, 3, 6) the length is √(4 + 9 + 36) = 7.",
      },
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: |r| = x + y + z",
      content:
        "Adding the components adds the lengths of the box's edges: that is the distance you would travel walking along the edges, not the straight-line distance. In the plane, $3\\hat i + 4\\hat j$ has length 5, not 7. It gets worse with signs: $\\hat i - \\hat j$ would get \"length\" 0, but it is clearly not the zero vector. Square, add, then take the square root.",
    },
    {
      type: "text",
      content:
        "**Distance between two points.** The distance from $A$ to $B$ is the length of the arrow $\\overrightarrow{AB} = \\vec b - \\vec a$ from Lesson 1.1:",
    },
    {
      type: "math",
      latex: "AB = |\\vec b - \\vec a| = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2 + (z_2 - z_1)^2}",
    },
    {
      type: "text",
      content:
        "**Worked example 1.** Find $|2\\hat i - 3\\hat j + 6\\hat k|$.\n\n1. Square each component: $4$, $9$, $36$. The minus sign disappears.\n2. Add: $49$.\n3. Square root: $|\\vec r| = 7$.",
    },
    {
      type: "text",
      content:
        "**Worked example 2.** Find the distance between $A = (1, -2, 3)$ and $B = (3, 1, -3)$.\n\n1. $\\overrightarrow{AB} = (3 - 1,\\ 1 - (-2),\\ -3 - 3) = (2, 3, -6)$.\n2. $AB = \\sqrt{4 + 9 + 36} = 7$.",
    },
    {
      type: "text",
      content:
        "**Worked example 3.** Show that $A = (0, 7, -10)$, $B = (1, 6, -6)$ and $C = (4, 9, -6)$ form an isosceles triangle. Is it also right-angled?\n\n1. $\\overrightarrow{AB} = (1, -1, 4)$, so $AB = \\sqrt{1 + 1 + 16} = \\sqrt{18}$.\n2. $\\overrightarrow{BC} = (3, 3, 0)$, so $BC = \\sqrt{9 + 9 + 0} = \\sqrt{18}$.\n3. $\\overrightarrow{AC} = (4, 2, 4)$, so $AC = \\sqrt{16 + 4 + 16} = 6$.\n4. $AB = BC$, so the triangle is isosceles.\n5. $AB^2 + BC^2 = 18 + 18 = 36 = AC^2$. By the converse of Pythagoras, the angle at $B$ is a right angle.",
    },
    {
      type: "text",
      content:
        "**Worked example 4: the drone from the opening (application).** Put the playground gate at $O$, with $x$ east, $y$ north and $z$ up, in metres. The drone hovers at $D = (4, 3, 12)$. (a) How far is it from the gate? (b) It then flies straight to $E = (-2, 11, 12)$. How far does it fly, and is the flight level? (c) How far is $E$ from the gate?\n\n**(a)** $|\\overrightarrow{OD}| = \\sqrt{4^2 + 3^2 + 12^2} = \\sqrt{16 + 9 + 144} = \\sqrt{169} = 13$ m. *Why this step:* the distance from the origin is the length of the position vector, the long diagonal of a $4 \\times 3 \\times 12$ box. Pythagoras twice: the floor diagonal is $5$, then $\\sqrt{5^2 + 12^2} = 13$.",
    },
    {
      type: "math",
      latex:
        "\\overrightarrow{DE} = \\vec e - \\vec d = (-2 - 4,\\ 11 - 3,\\ 12 - 12) = (-6, 8, 0), \\qquad DE = \\sqrt{36 + 64 + 0} = 10 \\text{ m}",
    },
    {
      type: "text",
      content:
        "**(b)** *Why this step:* the flight is an arrow between two points, so it is end minus start (Lesson 1.1). The $\\hat k$ component is $0$: the height never changes, so the flight is level. A zero component is information, not something to skip.\n\n**(c)** $|\\overrightarrow{OE}| = \\sqrt{(-2)^2 + 11^2 + 12^2} = \\sqrt{4 + 121 + 144} = \\sqrt{269} \\approx 16.4$ m.\n\nNotice $16.4 < 13 + 10$: the straight-line distance is shorter than the path, exactly as the triangle inequality demands.",
    },
    {
      type: "text",
      content:
        "**Worked example 5: a point on an axis (exam style).** Find the point on the $x$-axis that is equidistant from $A = (1, 2, 3)$ and $B = (3, 5, -2)$.\n\n1. Any point on the $x$-axis has the form $P = (x, 0, 0)$. *Why this step:* \"on the $x$-axis\" means the $y$- and $z$-coordinates are zero, which leaves a single unknown.\n2. Equate the **squared** distances. *Why:* $PA = PB$ is equivalent to $PA^2 = PB^2$ (both are non-negative), and squaring removes the square roots.",
    },
    {
      type: "math",
      latex:
        "(x - 1)^2 + 2^2 + 3^2 = (x - 3)^2 + 5^2 + (-2)^2 \\;\\Longrightarrow\\; x^2 - 2x + 14 = x^2 - 6x + 38",
    },
    {
      type: "text",
      content:
        "3. The $x^2$ terms cancel, so the equation is linear: $4x = 24$, $x = 6$. The point is $P = (6, 0, 0)$.\n4. Check: $PA^2 = 25 + 4 + 9 = 38$ and $PB^2 = 9 + 25 + 4 = 38$. ✓\n\nThe same method finds a point on the $y$-axis $(0, y, 0)$, on the $z$-axis $(0, 0, z)$, or in the $xy$-plane $(x, y, 0)$ (then you need a second condition).",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Sanity check",
      content:
        "The length of a vector is always at least as large as the absolute value of each component, and at most $|x| + |y| + |z|$. For $2\\hat i - 3\\hat j + 6\\hat k$: $6 \\le 7 \\le 11$. If your answer falls outside that range, recheck the arithmetic.",
    },
    {
      type: "quiz",
      id: "va1-3-q1",
      variant: "concept",
      question: "A student writes $|2\\hat i + 3\\hat j + 6\\hat k| = 11$. What went wrong?",
      options: [
        { text: "They added the components. That is the walk along the box's edges; the straight diagonal is $\\sqrt{4 + 9 + 36} = 7$.", correct: true, feedback: "Length combines the components with Pythagoras: square, add, square root." },
        { text: "Nothing: the length of a vector is the sum of its components.", feedback: "Then $\\hat i - \\hat j$ would have length 0. Adding components measures the path along the edges, not the arrow." },
        { text: "They forgot to square the answer; the length is $121$.", feedback: "Squaring goes on the components before adding, and the square root comes last: $\\sqrt{49} = 7$." },
      ],
    },
    {
      type: "quiz",
      id: "va1-3-q6",
      variant: "practice",
      question: "The points $(a, 2, 1)$ and $(1, -1, 1)$ are 5 units apart. Find $a$.",
      options: [
        { text: "$a = 5$ or $a = -3$", correct: true, feedback: "$(a - 1)^2 + 3^2 + 0^2 = 25$, so $(a - 1)^2 = 16$ and $a - 1 = \\pm 4$. Both points work: there are two spots on that line at distance 5." },
        { text: "$a = 5$ only", feedback: "$(a - 1)^2 = 16$ has two roots. $a - 1 = -4$ works just as well." },
        { text: "$a = 3$", feedback: "That forgets to square: $a - 1 + 3 = 5$. Use $(a - 1)^2 + 9 = 25$." },
      ],
      hint: "Set the squared distance equal to $25$ and solve for $a$.",
    },
    {
      type: "quiz",
      id: "va1-3-q2",
      variant: "practice",
      question: "What is the distance between $(2, -1, 3)$ and $(4, 1, 4)$?",
      options: [
        { text: "$3$", correct: true, feedback: "The difference is $(2, 2, 1)$, and $\\sqrt{4 + 4 + 1} = 3$." },
        { text: "$5$", feedback: "That adds the differences $2 + 2 + 1$ instead of combining them with Pythagoras." },
        { text: "$9$", feedback: "That is the squared distance. Take the square root." },
      ],
    },
    {
      type: "quiz",
      id: "va1-3-q3",
      variant: "concept",
      question: "In a right-handed system, the positive $x$-axis points east and the positive $y$-axis points north. Where does the positive $z$-axis point?",
      options: [
        { text: "Up", correct: true, feedback: "Curl the fingers of your right hand from east to north, and your thumb points up." },
        { text: "Down", feedback: "That would make the system left-handed. Try the curl with your right hand." },
        { text: "Either way; it is a convention you choose each time.", feedback: "The convention is fixed: right-handed, always. The cross product in Chapter 4 depends on it." },
      ],
    },
    {
      type: "quiz",
      id: "va1-3-q4",
      variant: "practice",
      question: "What is $|-3\\hat i + 4\\hat k|$?",
      options: [
        { text: "$5$", correct: true, feedback: "The missing $\\hat j$ term is a 0 component: $\\sqrt{9 + 0 + 16} = 5$." },
        { text: "$1$", feedback: "That adds $-3 + 4$. Components must be squared before adding." },
        { text: "$7$", feedback: "That adds $3 + 4$. Use $\\sqrt{x^2 + y^2 + z^2}$." },
      ],
    },
    {
      type: "quiz",
      id: "va1-3-q5",
      variant: "practice",
      question: "$\\vec a = \\hat i - 2\\hat j + 3\\hat k$ and $\\vec b = 3\\hat i - \\hat k$. What is $2\\vec a - \\vec b$?",
      options: [
        { text: "$-\\hat i - 4\\hat j + 7\\hat k$", correct: true, feedback: "$(2 - 3)\\hat i + (-4 - 0)\\hat j + (6 - (-1))\\hat k$." },
        { text: "$-\\hat i - 4\\hat j + 5\\hat k$", feedback: "Check the $\\hat k$ part: subtracting $-1$ adds 1, so $6 + 1 = 7$." },
        { text: "$5\\hat i - 4\\hat j + 5\\hat k$", feedback: "That is $2\\vec a + \\vec b$." },
      ],
      hint: "$\\vec b$ has no $\\hat j$ term, so its $y$-component is 0.",
    },
    {
      type: "quiz",
      id: "va1-3-q7",
      variant: "practice",
      question: "A flagpole stands at the origin with its top at $T = (0, 0, 12)$ (metres). A straight stay cable runs from $T$ to a ground anchor at $G = (4, -3, 0)$. How long is the cable?",
      options: [
        { text: "$13$ m", correct: true, feedback: "$\\overrightarrow{TG} = (4, -3, -12)$ and $\\sqrt{16 + 9 + 144} = \\sqrt{169} = 13$. The anchor is $5$ m from the foot of the pole, and $\\sqrt{5^2 + 12^2} = 13$." },
        { text: "$5$ m", feedback: "That is only the distance along the ground from the pole's foot to the anchor. The cable also climbs 12 m." },
        { text: "$19$ m", feedback: "That adds $4 + 3 + 12$, the walk along the box's edges. Square, add, then take the square root." },
      ],
      hint: "End minus start, then $\\sqrt{x^2 + y^2 + z^2}$.",
    },
    {
      type: "quiz",
      id: "va1-3-q8",
      variant: "practice",
      question: "Which point on the $y$-axis is equidistant from $A = (2, 1, 3)$ and $B = (1, 5, 2)$?",
      options: [
        { text: "$(0, 2, 0)$", correct: true, feedback: "With $P = (0, y, 0)$: $4 + (y - 1)^2 + 9 = 1 + (y - 5)^2 + 4$ gives $y^2 - 2y + 14 = y^2 - 10y + 30$, so $8y = 16$. Check: $PA^2 = 4 + 1 + 9 = 14$ and $PB^2 = 1 + 9 + 4 = 14$." },
        { text: "$(0, 3, 0)$", feedback: "Test it: $PA^2 = 4 + 4 + 9 = 17$ but $PB^2 = 1 + 4 + 4 = 9$. Not equal." },
        { text: "$(2, 0, 0)$", feedback: "That point is on the $x$-axis. A point on the $y$-axis has the form $(0, y, 0)$." },
      ],
      hint: "Let $P = (0, y, 0)$ and set $PA^2 = PB^2$. The $y^2$ terms cancel.",
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "unit-vectors-and-component-algebra",
  title: "1.4 · Unit Vectors and Component Algebra",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "A vector packs two things together: a length and a direction. Often you want the direction alone: \"which way is north-east?\", \"which way does this force push?\". The trick is to keep the direction and set the length to 1.",
    },
    {
      type: "text",
      content:
        "Scaling by a positive number never changes direction, and from Lesson 1.3, $|k\\vec a| = \\sqrt{(ka_1)^2 + (ka_2)^2 + (ka_3)^2} = |k|\\,|\\vec a|$. So dividing $\\vec a$ by its own length keeps the direction and makes the length exactly $\\frac{|\\vec a|}{|\\vec a|} = 1$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Unit vector",
      content:
        "A **unit vector** has length 1. The unit vector in the direction of a non-zero vector $\\vec a$ is\n\n$\\hat a = \\frac{\\vec a}{|\\vec a|}.$\n\nTurning $\\vec a$ into $\\hat a$ is called **normalising**. Rearranged, $\\vec a = |\\vec a|\\,\\hat a$: every vector is (its length) times (its direction). The zero vector has no direction, so it has no unit vector.",
    },
    {
      type: "text",
      content:
        "In the plane, a unit vector's tip lies on the circle of radius 1. That is the unit circle from trigonometry, so every plane unit vector is $\\cos\\theta\\,\\hat i + \\sin\\theta\\,\\hat j$ for some angle $\\theta$. Turn the angle below: the point's coordinates are the unit vector's components.",
    },
    {
      type: "interactive",
      config: {
        component: "unit-circle",
        initialAngle: 45,
        minAngle: 0,
        maxAngle: 360,
        step: 1,
        showTriangle: true,
        showCoordinates: true,
        showReferenceAngle: false,
        showTangent: false,
        showRadians: false,
        caption:
          "The radius is a unit vector at angle θ. Its components are (cos θ, sin θ), and cos²θ + sin²θ = 1 is just the statement that its length is 1. At 45° the components are both 1/√2, not 1.",
      },
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: i + j is a unit vector",
      content:
        "It is made from two unit vectors, but it is the diagonal of a $1 \\times 1$ square, with length $\\sqrt{1^2 + 1^2} = \\sqrt 2 \\approx 1.41$. The unit vector pointing the same way is $\\frac{1}{\\sqrt2}\\hat i + \\frac{1}{\\sqrt2}\\hat j$, the point at $45^\\circ$ on the unit circle. Likewise $\\hat i + \\hat j + \\hat k$ has length $\\sqrt3$. A sum of unit vectors is almost never a unit vector.",
    },
    {
      type: "interactive",
      config: {
        component: "vec-canvas-2d",
        mode: "components",
        a: [1, 1],
        draggable: ["a"],
        snap: false,
        window: { xmin: -2, xmax: 2, ymin: -2, ymax: 2 },
        readouts: ["components", "magnitude"],
        caption:
          "Put the tip at (1, 1): the length reads √2 ≈ 1.41, not 1. Now drag it to (0.7, 0.7), which is almost on the unit circle.",
      },
    },
    {
      type: "text",
      content:
        "**Worked example 1: normalise.** Find the unit vector along $\\vec a = 2\\hat i - \\hat j + 2\\hat k$.\n\n1. $|\\vec a| = \\sqrt{4 + 1 + 4} = 3$.\n2. $\\hat a = \\frac13(2\\hat i - \\hat j + 2\\hat k) = \\frac23\\hat i - \\frac13\\hat j + \\frac23\\hat k$.\n3. Check: $\\frac49 + \\frac19 + \\frac49 = 1$.",
    },
    {
      type: "text",
      content:
        "**Worked example 2: a given length in a given direction.** Find the vector of length 10 along $3\\hat i - 4\\hat j$.\n\n1. Normalise the direction: $|3\\hat i - 4\\hat j| = 5$, so the unit vector is $\\frac15(3\\hat i - 4\\hat j)$.\n2. Scale to length 10: $10 \\cdot \\frac15(3\\hat i - 4\\hat j) = 6\\hat i - 8\\hat j$.\n3. The vector of length 10 in the *opposite* direction is $-6\\hat i + 8\\hat j$.",
    },
    {
      type: "math",
      latex: "\\text{vector of length } \\lambda \\text{ along } \\vec a \\;=\\; \\lambda\\,\\hat a \\;=\\; \\lambda\\,\\frac{\\vec a}{|\\vec a|}",
    },
    {
      type: "text",
      content:
        "**Worked example 3: unit vector along a sum.** $\\vec a = 2\\hat i + 2\\hat j - 5\\hat k$ and $\\vec b = 2\\hat i + \\hat j + 3\\hat k$. Find the unit vector along $\\vec a + \\vec b$.\n\n1. $\\vec a + \\vec b = 4\\hat i + 3\\hat j - 2\\hat k$.\n2. $|\\vec a + \\vec b| = \\sqrt{16 + 9 + 4} = \\sqrt{29}$.\n3. Unit vector: $\\frac{1}{\\sqrt{29}}(4\\hat i + 3\\hat j - 2\\hat k)$.\n\nAdd first, then normalise. $\\hat a + \\hat b$ is a different vector, and generally not a unit vector.",
    },
    {
      type: "text",
      content:
        "**Worked example 3b: a force along a cable (application).** A crane hook at $A = (1, 2, 3)$ is pulled by a cable towards a winch at $B = (3, -1, 9)$ (metres). The tension is $14$ N. Write the force as a vector.\n\n1. Direction first: $\\overrightarrow{AB} = (3 - 1,\\ -1 - 2,\\ 9 - 3) = (2, -3, 6)$. *Why this step:* a cable pulls along itself, from the hook towards the winch, so the force points along $\\overrightarrow{AB}$ (end minus start).\n2. Normalise: $|\\overrightarrow{AB}| = \\sqrt{4 + 9 + 36} = 7$, so the direction is $\\frac17(2\\hat i - 3\\hat j + 6\\hat k)$. *Why:* $\\overrightarrow{AB}$ has length 7 m, which has nothing to do with the force. Stripping it to length 1 keeps only the direction.\n3. Scale to the size of the force:",
    },
    {
      type: "math",
      latex: "\\vec F = 14 \\cdot \\frac{2\\hat i - 3\\hat j + 6\\hat k}{7} = 4\\hat i - 6\\hat j + 12\\hat k \\text{ N}",
    },
    {
      type: "text",
      content:
        "4. Check: $|\\vec F| = \\sqrt{16 + 36 + 144} = \\sqrt{196} = 14$. ✓ This \"direction from two points, normalise, scale\" routine is how every force, velocity and field vector along a line is written in physics.",
    },
    {
      type: "quiz",
      id: "va1-4-q9",
      variant: "practice",
      question: "A rope pulls a buoy at $A = (0, 1, -1)$ towards $B = (2, -1, 0)$ with a tension of $15$ N. What is the force vector?",
      options: [
        { text: "$10\\hat i - 10\\hat j + 5\\hat k$", correct: true, feedback: "$\\overrightarrow{AB} = (2, -2, 1)$ with length $3$, so $\\vec F = \\frac{15}{3}(2\\hat i - 2\\hat j + \\hat k)$. Check: $\\sqrt{100 + 100 + 25} = 15$." },
        { text: "$30\\hat i - 30\\hat j + 15\\hat k$", feedback: "That multiplies $\\overrightarrow{AB}$ by 15 without normalising, giving length 45." },
        { text: "$\\frac53(2\\hat i - 2\\hat j + \\hat k)$", feedback: "That divides by 9, the squared length of $\\overrightarrow{AB}$. Its length is only 5." },
      ],
      hint: "Direction $\\overrightarrow{AB}$, normalise, then multiply by 15.",
    },
    {
      type: "text",
      content:
        "**Equal vectors have equal components.** Components are unique (Lesson 1.2), so one vector equation in 3D is really three number equations:",
    },
    {
      type: "math",
      latex: "a_1\\hat i + a_2\\hat j + a_3\\hat k = b_1\\hat i + b_2\\hat j + b_3\\hat k \\iff a_1 = b_1,\\ a_2 = b_2,\\ a_3 = b_3",
    },
    {
      type: "text",
      content:
        "**Worked example 4.** Solve $(x + 2)\\hat i + (y - x)\\hat j + 2z\\,\\hat k = 5\\hat i + \\hat j - 4\\hat k$.\n\n1. $\\hat i$: $x + 2 = 5$, so $x = 3$.\n2. $\\hat j$: $y - x = 1$, so $y = 4$.\n3. $\\hat k$: $2z = -4$, so $z = -2$.",
    },
    {
      type: "quiz",
      id: "va1-4-q7",
      variant: "concept",
      question: "$\\vec a = 3\\hat i + 4\\hat j$ and $\\vec b = 5\\hat k$. Are they equal?",
      options: [
        { text: "No: both have length 5, but the components differ, so the vectors differ.", correct: true, feedback: "Equal vectors need all three components equal: $(3, 4, 0) \\ne (0, 0, 5)$. Equal length is only one number out of three." },
        { text: "Yes, because both have length 5.", feedback: "Length is one number; a vector in space needs three. $\\vec a$ lies flat on the floor and $\\vec b$ points straight up." },
        { text: "Cannot tell without a picture.", feedback: "The components settle it: compare them one at a time." },
      ],
    },
    {
      type: "text",
      content:
        "**Collinearity as proportional components.** From Chapter 0, $\\vec a$ and $\\vec b$ (with $\\vec b \\ne \\vec 0$) are collinear exactly when $\\vec a = \\lambda\\vec b$ for some number $\\lambda$. In components that means $a_1 = \\lambda b_1$, $a_2 = \\lambda b_2$, $a_3 = \\lambda b_3$, so the components are in the same ratio:",
    },
    {
      type: "math",
      latex: "\\vec a \\parallel \\vec b \\iff \\frac{a_1}{b_1} = \\frac{a_2}{b_2} = \\frac{a_3}{b_3} \\;(= \\lambda)",
    },
    {
      type: "callout",
      variant: "info",
      title: "When a component is zero",
      content:
        "Read the ratio test as \"$\\vec a = \\lambda\\vec b$\". If $b_3 = 0$ then $a_3$ must also be 0, and you compare only the other ratios. The sign of $\\lambda$ tells you whether the two arrows point the same way ($\\lambda > 0$) or opposite ways ($\\lambda < 0$).",
    },
    {
      type: "text",
      content:
        "**Worked example 5.** Are $\\vec a = 2\\hat i - 3\\hat j + 4\\hat k$ and $\\vec b = -4\\hat i + 6\\hat j - 8\\hat k$ collinear?\n\nRatios: $\\frac{2}{-4} = \\frac{-3}{6} = \\frac{4}{-8} = -\\frac12$. All equal, so $\\vec a = -\\frac12\\vec b$. They are collinear and point in opposite directions.\n\n**Worked example 6.** Find $p$ and $q$ so that $3\\hat i + p\\hat j + 2\\hat k$ is parallel to $6\\hat i - 2\\hat j + q\\hat k$.\n\n1. The $\\hat i$ ratio fixes $\\lambda$: $\\frac36 = \\frac12$.\n2. $\\frac{p}{-2} = \\frac12$, so $p = -1$.\n3. $\\frac{2}{q} = \\frac12$, so $q = 4$.",
    },
    {
      type: "text",
      content:
        "**Worked example 7: collinear points with unknowns (exam style).** The points $A = (2, -1, 3)$, $B = (4, 3, 1)$ and $C = (5, p, q)$ are collinear. Find $p$ and $q$.\n\n1. Three points are collinear when the arrows $\\overrightarrow{AB}$ and $\\overrightarrow{AC}$ are parallel. *Why this step:* both arrows start at $A$, so if they point along the same line, $B$ and $C$ both lie on that line through $A$. Parallel arrows from different starting points would not be enough.\n2. Compute both arrows (end minus start):",
    },
    {
      type: "math",
      latex: "\\overrightarrow{AB} = (2, 4, -2), \\qquad \\overrightarrow{AC} = (3,\\ p + 1,\\ q - 3)",
    },
    {
      type: "text",
      content:
        "3. Parallel means $\\overrightarrow{AC} = \\lambda\\,\\overrightarrow{AB}$. The first components have no unknowns, so they fix $\\lambda$: $3 = 2\\lambda$, $\\lambda = \\frac32$. *Why:* always find $\\lambda$ from a component you already know, then use it on the others.\n4. $p + 1 = \\frac32 \\cdot 4 = 6$, so $p = 5$. And $q - 3 = \\frac32 \\cdot (-2) = -3$, so $q = 0$.\n5. Check: $C = (5, 5, 0)$ and $\\overrightarrow{AC} = (3, 6, -3) = \\frac32(2, 4, -2)$. ✓ Since $\\lambda = \\frac32 > 1$, $C$ lies beyond $B$ on the ray from $A$.",
    },
    {
      type: "quiz",
      id: "va1-4-q10",
      variant: "practice",
      question: "The points $A = (1, 2, -1)$, $B = (3, 1, 1)$ and $C = (7, p, q)$ are collinear. What are $p$ and $q$?",
      options: [
        { text: "$p = -1,\\ q = 5$", correct: true, feedback: "$\\overrightarrow{AB} = (2, -1, 2)$ and $\\overrightarrow{AC} = (6,\\ p - 2,\\ q + 1)$. The $x$-parts give $\\lambda = 3$, so $p - 2 = -3$ and $q + 1 = 6$." },
        { text: "$p = -3,\\ q = 6$", feedback: "Those are the components of $\\overrightarrow{AC} = 3\\overrightarrow{AB}$, not the coordinates of $C$. Add back $A$'s coordinates: $\\vec c = \\vec a + \\overrightarrow{AC}$." },
        { text: "$p = -5,\\ q = 7$", feedback: "Sign slip when solving: $p - 2 = -3$ gives $p = -1$, and $q + 1 = 6$ gives $q = 5$." },
      ],
      hint: "Find $\\lambda$ from the $x$-components of $\\overrightarrow{AB}$ and $\\overrightarrow{AC}$.",
    },
    {
      type: "quiz",
      id: "va1-4-q1",
      variant: "concept",
      question: "Is $\\hat i + \\hat j + \\hat k$ a unit vector?",
      options: [
        { text: "No. Its length is $\\sqrt3$, so the unit vector in that direction is $\\frac{1}{\\sqrt3}(\\hat i + \\hat j + \\hat k)$.", correct: true, feedback: "Always check with $\\sqrt{x^2 + y^2 + z^2}$: here $\\sqrt{1 + 1 + 1}$." },
        { text: "Yes, because every component is 1.", feedback: "Length is $\\sqrt{1^2 + 1^2 + 1^2} = \\sqrt3$, not 1. Components of 1 do not make a length of 1." },
        { text: "Yes, because it is a sum of unit vectors.", feedback: "Adding unit vectors usually changes the length. $\\hat i + \\hat j$ already has length $\\sqrt2$." },
      ],
    },
    {
      type: "quiz",
      id: "va1-4-q2",
      variant: "practice",
      question: "What is the unit vector along $4\\hat i - 4\\hat j + 2\\hat k$?",
      options: [
        { text: "$\\frac16(4\\hat i - 4\\hat j + 2\\hat k)$", correct: true, feedback: "$|\\vec a| = \\sqrt{16 + 16 + 4} = 6$. Simplified: $\\frac23\\hat i - \\frac23\\hat j + \\frac13\\hat k$." },
        { text: "$\\frac12(4\\hat i - 4\\hat j + 2\\hat k)$", feedback: "2 is the sum of the components, $4 - 4 + 2$. Divide by the length, $\\sqrt{16 + 16 + 4}$." },
        { text: "$\\frac1{36}(4\\hat i - 4\\hat j + 2\\hat k)$", feedback: "36 is $|\\vec a|^2$. Take the square root first." },
      ],
    },
    {
      type: "quiz",
      id: "va1-4-q3",
      variant: "practice",
      question: "Which vector has length 9 and points in the direction of $\\hat i - 2\\hat j + 2\\hat k$?",
      options: [
        { text: "$3\\hat i - 6\\hat j + 6\\hat k$", correct: true, feedback: "$|\\hat i - 2\\hat j + 2\\hat k| = 3$, so the answer is $9 \\cdot \\frac13(\\hat i - 2\\hat j + 2\\hat k)$. Check: $\\sqrt{9 + 36 + 36} = 9$." },
        { text: "$9\\hat i - 18\\hat j + 18\\hat k$", feedback: "That scales the original vector by 9 without normalising first, giving length 27." },
        { text: "$\\frac13\\hat i - \\frac23\\hat j + \\frac23\\hat k$", feedback: "That is the unit vector. Now scale it to length 9." },
      ],
      hint: "Normalise first, then multiply by the length you want.",
    },
    {
      type: "quiz",
      id: "va1-4-q4",
      variant: "practice",
      question: "For which $\\lambda$ is $2\\hat i + \\lambda\\hat j - \\hat k$ parallel to $-6\\hat i + 9\\hat j + 3\\hat k$?",
      options: [
        { text: "$\\lambda = -3$", correct: true, feedback: "The ratio is $\\frac{2}{-6} = -\\frac13$; the $\\hat k$ ratio $\\frac{-1}{3}$ agrees, and $\\frac{\\lambda}{9} = -\\frac13$ gives $\\lambda = -3$." },
        { text: "$\\lambda = 3$", feedback: "Then $\\frac{3}{9} = \\frac13$, but the other ratios are $-\\frac13$. The signs must match too." },
        { text: "$\\lambda = -27$", feedback: "That multiplies $9$ by $-3$ instead of by $-\\frac13$." },
      ],
    },
    {
      type: "quiz",
      id: "va1-4-q5",
      variant: "concept",
      question: "$\\hat a$ is the unit vector along $\\vec a$. Which of these is also a unit vector?",
      options: [
        { text: "$-\\hat a$", correct: true, feedback: "Reversing the direction does not change the length: $|-\\hat a| = |-1| \\cdot 1 = 1$." },
        { text: "$2\\hat a$", feedback: "$|2\\hat a| = 2$." },
        { text: "$\\hat a + \\hat i$", feedback: "A sum of two unit vectors has length between 0 and 2, and usually not 1." },
      ],
    },
    {
      type: "quiz",
      id: "va1-4-q6",
      variant: "practice",
      question: "If $x\\hat i + 2\\hat j - z\\hat k = 3\\hat i + y\\hat j + \\hat k$, what are $x$, $y$, $z$?",
      options: [
        { text: "$x = 3,\\ y = 2,\\ z = -1$", correct: true, feedback: "Match components: $x = 3$, $2 = y$, and $-z = 1$." },
        { text: "$x = 3,\\ y = 2,\\ z = 1$", feedback: "The $\\hat k$ component on the left is $-z$, so $-z = 1$." },
        { text: "No solution: the two vectors look different.", feedback: "Equal vectors just need equal components, and each equation here has a solution." },
      ],
    },
    {
      type: "quiz",
      id: "va1-4-q8",
      variant: "practice",
      question: "For which $k$ is $k(\\hat i + 2\\hat j + 2\\hat k)$ a unit vector?",
      options: [
        { text: "$k = \\pm\\frac13$", correct: true, feedback: "$|k(\\hat i + 2\\hat j + 2\\hat k)| = |k| \\cdot \\sqrt{1 + 4 + 4} = 3|k|$. Setting $3|k| = 1$ gives $k = \\pm\\frac13$: the negative value gives the unit vector pointing the other way." },
        { text: "$k = \\frac15$", feedback: "5 is the component sum $1 + 2 + 2$, not the length. The length is $\\sqrt{1 + 4 + 4} = 3$." },
        { text: "$k = \\frac19$", feedback: "9 is the squared length. Divide by the length itself, 3." },
      ],
      hint: "$|k\\vec a| = |k|\\,|\\vec a|$.",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "direction-cosines-and-ratios",
  title: "1.5 · Direction Cosines and Direction Ratios",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "In the plane, one angle describes a direction: the angle with the $x$-axis. In space one angle is not enough, since infinitely many directions make $60^\\circ$ with the $x$-axis (they form a cone). So record the angle the vector makes with **each** axis.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Direction angles and direction cosines",
      content:
        "Let $\\vec r$ make angles $\\alpha$, $\\beta$, $\\gamma$ with the positive $x$-, $y$- and $z$-axes, each between $0^\\circ$ and $180^\\circ$. These are its **direction angles**. Their cosines are the **direction cosines**:\n\n$l = \\cos\\alpha, \\qquad m = \\cos\\beta, \\qquad n = \\cos\\gamma.$",
    },
    {
      type: "text",
      content:
        "**Deriving the formula.** Let $\\vec r = \\overrightarrow{OP}$ with $P = (x, y, z)$ and $r = |\\vec r|$. Drop a perpendicular from $P$ to the $x$-axis. Its foot is $A = (x, 0, 0)$, because the only thing that changes along the $x$-axis is the first coordinate. Triangle $OAP$ has a right angle at $A$, hypotenuse $OP = r$, and angle $\\alpha$ at $O$. The side along the axis is $OA$, so\n\n$\\cos\\alpha = \\frac{x}{r}.$\n\nIf $\\alpha$ is obtuse, $A$ lies on the negative $x$-axis and $x$ is negative, which matches $\\cos\\alpha < 0$. If $P$ is on the $x$-axis the triangle collapses, but then $\\alpha$ is $0^\\circ$ or $180^\\circ$ and $\\frac{x}{r} = \\pm 1$ still equals $\\cos\\alpha$. The same argument with the $y$- and $z$-axes gives the other two.",
    },
    {
      type: "math",
      latex: "l = \\frac{x}{r}, \\qquad m = \\frac{y}{r}, \\qquad n = \\frac{z}{r}, \\qquad r = \\sqrt{x^2 + y^2 + z^2}",
    },
    {
      type: "text",
      content:
        "Rearranged, $x = lr$, $y = mr$, $z = nr$: the components are the shadows of $\\vec r$ on the axes. The axes themselves are the easiest case: $\\hat i$ makes angles $0^\\circ, 90^\\circ, 90^\\circ$, so the $x$-axis has direction cosines $(1, 0, 0)$; likewise the $y$-axis has $(0, 1, 0)$ and the $z$-axis $(0, 0, 1)$.\n\nLook at what the formula says. Dividing each component by $r$ is exactly how you normalise, so the direction cosines are **the components of the unit vector**:",
    },
    {
      type: "math",
      latex: "\\hat r = \\frac{\\vec r}{r} = l\\,\\hat i + m\\,\\hat j + n\\,\\hat k \\quad\\Longrightarrow\\quad l^2 + m^2 + n^2 = |\\hat r|^2 = 1",
    },
    {
      type: "text",
      content:
        "So $\\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma = 1$ is not a new fact to memorise. It says a unit vector has length 1. Rotate the view below and change the components. The three angles move together, and the sum of the squared cosines stays at 1.",
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
          "The arcs mark α, β, γ, the angles to the three positive axes. At (2, 3, 6) the length is 7 and the direction cosines are 2/7, 3/7, 6/7. Make a component negative and its angle becomes obtuse.",
      },
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: α + β + γ = 180°",
      content:
        "That is the rule for a triangle's angles, and these three angles do not form a triangle. The true relation is between the squared cosines. For $\\hat i + \\hat j + \\hat k$ each angle is $\\cos^{-1}\\frac{1}{\\sqrt3} \\approx 54.7^\\circ$, and the sum is about $164.2^\\circ$. (For $\\hat i$ itself the angles are $0^\\circ, 90^\\circ, 90^\\circ$ and happen to sum to $180^\\circ$, which is how the myth survives.)",
    },
    {
      type: "text",
      content:
        "**Worked example 1.** Find the direction cosines of $\\vec r = 2\\hat i - 3\\hat j + 6\\hat k$.\n\n1. $r = \\sqrt{4 + 9 + 36} = 7$.\n2. $l = \\frac27$, $m = -\\frac37$, $n = \\frac67$.\n3. Check: $\\frac{4 + 9 + 36}{49} = 1$. Also $m < 0$, so $\\beta$ is obtuse: the vector leans away from the positive $y$-axis.",
    },
    {
      type: "text",
      content:
        "**Worked example 2.** A vector makes $45^\\circ$ with the $x$-axis and $60^\\circ$ with the $y$-axis. What angle does it make with the $z$-axis?\n\n1. $l = \\cos45^\\circ = \\frac{1}{\\sqrt2}$ and $m = \\cos 60^\\circ = \\frac12$.\n2. $n^2 = 1 - \\frac12 - \\frac14 = \\frac14$, so $n = \\pm\\frac12$.\n3. $\\gamma = 60^\\circ$ or $120^\\circ$. Both answers are valid: one vector tilts up and its mirror image in the floor tilts down.",
    },
    {
      type: "text",
      content:
        "**Worked example 3.** A vector makes equal angles with all three axes. Find its direction cosines.\n\n$l = m = n$, so $3l^2 = 1$ and $l = \\pm\\frac{1}{\\sqrt3}$. The direction cosines are $\\left(\\frac1{\\sqrt3}, \\frac1{\\sqrt3}, \\frac1{\\sqrt3}\\right)$ or $\\left(-\\frac1{\\sqrt3}, -\\frac1{\\sqrt3}, -\\frac1{\\sqrt3}\\right)$.",
    },
    {
      type: "text",
      content:
        "**Worked example 3b: how steeply does the drone climb? (application).** A drone takes off from the pad $O$ and flies in a straight line to $P = (6, 2, 3)$, with $x$ east, $y$ north and $z$ up (metres). Find the angle its path makes with east, with the vertical, and with the ground.\n\n1. Length: $r = \\sqrt{36 + 4 + 9} = 7$ m. Direction cosines: $l = \\frac67$, $m = \\frac27$, $n = \\frac37$. *Why this step:* each direction cosine is (component) / (length), the cosine of the angle with that axis.\n2. Angle with east: $\\alpha = \\cos^{-1}\\frac67 \\approx 31.0^\\circ$.\n3. Angle with the vertical: $\\gamma = \\cos^{-1}\\frac37 \\approx 64.6^\\circ$.\n4. Angle with the ground (the climb angle) is **not** a direction angle. The ground is the $xy$-plane, perpendicular to the $z$-axis, so the climb angle $\\phi$ and $\\gamma$ add to $90^\\circ$:",
    },
    {
      type: "math",
      latex: "\\phi = 90^\\circ - \\gamma \\approx 25.4^\\circ, \\qquad \\sin\\phi = \\cos\\gamma = n = \\tfrac37",
    },
    {
      type: "text",
      content:
        "*Cross-check:* the drone moves $\\sqrt{6^2 + 2^2} = \\sqrt{40} \\approx 6.32$ m horizontally while rising 3 m, and $\\tan^{-1}\\frac{3}{6.32} \\approx 25.4^\\circ$. ✓ Exam questions love this twist: \"angle with the $z$-axis\" and \"angle with the $xy$-plane\" are complements.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Direction ratios",
      content:
        "Any three numbers $a, b, c$ (not all zero) proportional to the direction cosines, $a : b : c = l : m : n$, are called **direction ratios**. The components $(x, y, z)$ of a vector are one set of direction ratios for it, since $(x, y, z) = r(l, m, n)$.",
    },
    {
      type: "text",
      content:
        "To convert direction ratios back to direction cosines, normalise: divide by $\\sqrt{a^2 + b^2 + c^2}$. For a **line**, which has no arrowhead, both signs are allowed:",
    },
    {
      type: "math",
      latex: "l = \\pm\\frac{a}{\\sqrt{a^2 + b^2 + c^2}}, \\quad m = \\pm\\frac{b}{\\sqrt{a^2 + b^2 + c^2}}, \\quad n = \\pm\\frac{c}{\\sqrt{a^2 + b^2 + c^2}}",
    },
    {
      type: "text",
      content:
        "Use the same sign for all three. For a vector, the sign is fixed by the direction the arrow points.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: direction ratios are unique",
      content:
        "$(2, 3, 6)$, $(4, 6, 12)$, $(1, 1.5, 3)$ and $(-2, -3, -6)$ are all direction ratios of the same line. Scaling by any non-zero number gives another valid set. Only the direction cosines are pinned down, and even they only up to sign for a line, because they must satisfy $l^2 + m^2 + n^2 = 1$.",
    },
    {
      type: "table",
      headers: ["", "Direction cosines $(l, m, n)$", "Direction ratios $(a, b, c)$"],
      rows: [
        ["What they are", "Cosines of the angles with the axes", "Any numbers proportional to $l, m, n$"],
        ["Sum of squares", "Always $1$", "Anything positive"],
        ["How many sets", "One for a vector; two ($\\pm$) for a line", "Infinitely many"],
        ["From a vector $x\\hat i + y\\hat j + z\\hat k$", "$\\left(\\frac{x}{r}, \\frac{y}{r}, \\frac{z}{r}\\right)$", "$(x, y, z)$, or any multiple"],
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 4.** A line has direction ratios $1, -2, 2$. Find its direction cosines.\n\n$\\sqrt{1 + 4 + 4} = 3$, so the direction cosines are $\\pm\\left(\\frac13, -\\frac23, \\frac23\\right)$.\n\n**Worked example 5.** Find the direction cosines of the line through $A = (-2, 4, -5)$ and $B = (1, 2, 3)$.\n\n1. Direction ratios from $\\overrightarrow{AB}$: $(1 - (-2),\\ 2 - 4,\\ 3 - (-5)) = (3, -2, 8)$.\n2. $\\sqrt{9 + 4 + 64} = \\sqrt{77}$.\n3. Direction cosines: $\\pm\\left(\\frac{3}{\\sqrt{77}}, \\frac{-2}{\\sqrt{77}}, \\frac{8}{\\sqrt{77}}\\right)$.",
    },
    {
      type: "text",
      content:
        "**Worked example 6: build a vector from its length and direction.** Find the vector of magnitude 6 that makes equal acute angles with the three axes.\n\n1. Equal angles means $l = m = n$, so $3l^2 = 1$. The angles are acute, so $l = m = n = \\frac{1}{\\sqrt3}$.\n2. The unit vector is $\\hat r = \\frac{1}{\\sqrt3}(\\hat i + \\hat j + \\hat k)$.\n3. Scale to length 6: $\\vec r = 6 \\cdot \\frac{1}{\\sqrt3}(\\hat i + \\hat j + \\hat k) = 2\\sqrt3\\,(\\hat i + \\hat j + \\hat k)$.\n\nIn general, a vector of length $r$ with direction cosines $l, m, n$ is $\\vec r = r\\,(l\\,\\hat i + m\\,\\hat j + n\\,\\hat k)$.",
    },
    {
      type: "text",
      content:
        "**Worked example 7: an identity (exam style).** A line makes angles $\\alpha, \\beta, \\gamma$ with the axes. Prove that $\\cos 2\\alpha + \\cos 2\\beta + \\cos 2\\gamma = -1$.\n\n1. Rewrite each term using only $\\cos^2$: $\\cos 2\\theta = 2\\cos^2\\theta - 1$. *Why this step:* the one fact we know about direction angles is about $\\cos^2$, so steer every expression towards it.",
    },
    {
      type: "math",
      latex:
        "\\cos 2\\alpha + \\cos 2\\beta + \\cos 2\\gamma = 2(\\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma) - 3 = 2(1) - 3 = -1",
    },
    {
      type: "text",
      content:
        "2. Test it on $\\hat i$ (angles $0^\\circ, 90^\\circ, 90^\\circ$): $\\cos 0^\\circ + \\cos 180^\\circ + \\cos 180^\\circ = 1 - 1 - 1 = -1$. ✓\n\n**Worked example 8: collinearity by direction ratios.** Are $A = (2, 3, -4)$, $B = (1, -2, 3)$ and $C = (3, 8, -11)$ collinear?\n\n1. Direction ratios of $AB$: $(1 - 2,\\ -2 - 3,\\ 3 - (-4)) = (-1, -5, 7)$.\n2. Direction ratios of $BC$: $(3 - 1,\\ 8 - (-2),\\ -11 - 3) = (2, 10, -14)$.\n3. $(2, 10, -14) = -2 \\times (-1, -5, 7)$. *Why this matters:* proportional direction ratios mean $AB$ and $BC$ are parallel, and since they share the point $B$ they lie on one line. So yes, the points are collinear.",
    },
    {
      type: "quiz",
      id: "va1-5-q1",
      variant: "concept",
      question: "Can $\\frac12, \\frac12, \\frac12$ be the direction cosines of a line?",
      options: [
        { text: "No, because $\\frac14 + \\frac14 + \\frac14 = \\frac34 \\ne 1$.", correct: true, feedback: "Direction cosines are the components of a unit vector, so their squares must add to 1. (They can still be direction ratios.)" },
        { text: "Yes, since each value lies between $-1$ and $1$.", feedback: "That is necessary but not enough. Their squares must also add to exactly 1." },
        { text: "Yes, since $\\cos60^\\circ = \\frac12$ and $60^\\circ \\times 3 = 180^\\circ$.", feedback: "The angles do not need to add to $180^\\circ$. The test is $l^2 + m^2 + n^2 = 1$." },
      ],
    },
    {
      type: "quiz",
      id: "va1-5-q2",
      variant: "concept",
      question: "For every vector, which of these holds for its direction angles $\\alpha, \\beta, \\gamma$?",
      options: [
        { text: "$\\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma = 1$", correct: true, feedback: "The direction cosines are the components of the unit vector, whose length is 1." },
        { text: "$\\alpha + \\beta + \\gamma = 180^\\circ$", feedback: "These angles are not the angles of a triangle. For $\\hat i + \\hat j + \\hat k$ they add to about $164^\\circ$." },
        { text: "$\\cos\\alpha + \\cos\\beta + \\cos\\gamma = 1$", feedback: "For $\\hat i + \\hat j + \\hat k$ this sum is $\\frac{3}{\\sqrt3} = \\sqrt3$. It is the squares that add to 1." },
      ],
    },
    {
      type: "quiz",
      id: "va1-5-q3",
      variant: "practice",
      question: "What are the direction cosines of $4\\hat i - 4\\hat j + 2\\hat k$?",
      options: [
        { text: "$\\frac23,\\ -\\frac23,\\ \\frac13$", correct: true, feedback: "Length $\\sqrt{16 + 16 + 4} = 6$, and $(4, -4, 2)/6$. Check: $\\frac49 + \\frac49 + \\frac19 = 1$." },
        { text: "$4,\\ -4,\\ 2$", feedback: "Those are direction ratios. Divide by the length to get cosines." },
        { text: "$\\frac19,\\ -\\frac19,\\ \\frac1{18}$", feedback: "That divides by 36, the squared length. Divide by 6." },
      ],
    },
    {
      type: "quiz",
      id: "va1-5-q4",
      variant: "practice",
      question: "A line makes $60^\\circ$ with the $x$-axis and $45^\\circ$ with the $y$-axis. What angle can it make with the $z$-axis?",
      options: [
        { text: "$60^\\circ$ or $120^\\circ$", correct: true, feedback: "$\\cos^2\\gamma = 1 - \\frac14 - \\frac12 = \\frac14$, so $\\cos\\gamma = \\pm\\frac12$." },
        { text: "$75^\\circ$", feedback: "That uses $\\alpha + \\beta + \\gamma = 180^\\circ$, which is false. Use the squared cosines." },
        { text: "$90^\\circ$", feedback: "Then $\\cos^2\\alpha + \\cos^2\\beta = \\frac14 + \\frac12 = \\frac34$ would have to equal 1." },
      ],
      hint: "$l^2 + m^2 + n^2 = 1$.",
    },
    {
      type: "quiz",
      id: "va1-5-q5",
      variant: "concept",
      question: "One student gives direction ratios $2, -1, 2$ for a line; another gives $-4, 2, -4$. Who is right?",
      options: [
        { text: "Both. Direction ratios can be scaled by any non-zero number.", correct: true, feedback: "$(-4, 2, -4) = -2 \\times (2, -1, 2)$, so both describe the same line." },
        { text: "Only the first, because direction ratios are unique.", feedback: "They are not unique. Only the direction cosines are fixed (up to sign for a line)." },
        { text: "Neither, because direction ratios must satisfy $a^2 + b^2 + c^2 = 1$.", feedback: "That condition is for direction cosines. Direction ratios can be any proportional set." },
      ],
    },
    {
      type: "quiz",
      id: "va1-5-q6",
      variant: "practice",
      question: "A line has direction ratios $2, 3, 6$. What are its direction cosines?",
      options: [
        { text: "$\\pm\\left(\\frac27, \\frac37, \\frac67\\right)$", correct: true, feedback: "$\\sqrt{4 + 9 + 36} = 7$, and a line allows both signs." },
        { text: "$\\pm\\left(\\frac2{11}, \\frac3{11}, \\frac6{11}\\right)$", feedback: "11 is $2 + 3 + 6$. Divide by $\\sqrt{2^2 + 3^2 + 6^2}$." },
        { text: "$\\pm\\left(\\frac2{49}, \\frac3{49}, \\frac6{49}\\right)$", feedback: "49 is the sum of squares. Take its square root." },
      ],
    },
    {
      type: "quiz",
      id: "va1-5-q7",
      variant: "practice",
      question: "For any vector with direction angles $\\alpha, \\beta, \\gamma$, what is $\\sin^2\\alpha + \\sin^2\\beta + \\sin^2\\gamma$?",
      options: [
        { text: "$2$", correct: true, feedback: "Each $\\sin^2 = 1 - \\cos^2$, so the sum is $3 - (l^2 + m^2 + n^2) = 3 - 1 = 2$." },
        { text: "$1$", feedback: "That is the cosine identity. Here each $\\sin^2\\theta = 1 - \\cos^2\\theta$, so the sum is $3 - 1$." },
        { text: "$0$", feedback: "Each $\\sin^2$ is at least 0, and they cannot all vanish: that would need all three angles to be $0^\\circ$ or $180^\\circ$ at once." },
      ],
      hint: "Write each $\\sin^2$ as $1 - \\cos^2$.",
    },
    {
      type: "quiz",
      id: "va1-5-q8",
      variant: "practice",
      question: "A searchlight at the origin shines along the ray through $(2, -1, 2)$, with $z$ pointing up. What angle does the beam make with the ground (the $xy$-plane)?",
      options: [
        { text: "$\\sin^{-1}\\frac23 \\approx 41.8^\\circ$", correct: true, feedback: "Length $\\sqrt{4 + 1 + 4} = 3$, so $n = \\cos\\gamma = \\frac23$. The angle with the ground is $90^\\circ - \\gamma$, whose sine is $\\cos\\gamma = \\frac23$." },
        { text: "$\\cos^{-1}\\frac23 \\approx 48.2^\\circ$", feedback: "That is $\\gamma$, the angle with the vertical $z$-axis. The ground is perpendicular to that axis, so take the complement." },
        { text: "$\\tan^{-1} 1 = 45^\\circ$", feedback: "That compares the rise 2 with the $x$-component 2 only. The horizontal distance is $\\sqrt{2^2 + 1^2} = \\sqrt5$, and $\\tan^{-1}\\frac{2}{\\sqrt5} \\approx 41.8^\\circ$." },
      ],
      hint: "The angle with the $xy$-plane is $90^\\circ - \\gamma$.",
    },
    {
      type: "quiz",
      id: "va1-5-q9",
      variant: "practice",
      question: "A line makes angles $\\alpha, \\beta, \\gamma$ with the coordinate axes. What is $\\cos 2\\alpha + \\cos 2\\beta + \\cos 2\\gamma$?",
      options: [
        { text: "$-1$", correct: true, feedback: "$\\cos 2\\theta = 2\\cos^2\\theta - 1$, so the sum is $2(l^2 + m^2 + n^2) - 3 = 2 - 3$." },
        { text: "$1$", feedback: "That is $l^2 + m^2 + n^2$. Converting each $\\cos 2\\theta$ to $2\\cos^2\\theta - 1$ brings in a $-3$." },
        { text: "$2$", feedback: "That is the value of $\\sin^2\\alpha + \\sin^2\\beta + \\sin^2\\gamma$. Here use $\\cos 2\\theta = 2\\cos^2\\theta - 1$." },
      ],
      hint: "Use $\\cos 2\\theta = 2\\cos^2\\theta - 1$ on each term.",
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
        "This chapter turned arrows into numbers. You should now move freely between four descriptions of the same vector: **the arrow**, **its components**, **its length**, and **its direction** (as a unit vector or as direction cosines). The questions below mix all of them.",
    },
    {
      type: "table",
      headers: ["Want", "Do this"],
      rows: [
        ["Arrow from $A$ to $B$", "$\\overrightarrow{AB} = \\vec b - \\vec a$ (end minus start)"],
        ["Components from length and angle (2D)", "$x = r\\cos\\theta$, $y = r\\sin\\theta$"],
        ["Length", "$|\\vec r| = \\sqrt{x^2 + y^2 + z^2}$"],
        ["Unit vector", "$\\hat a = \\vec a / |\\vec a|$"],
        ["Length $\\lambda$ along $\\vec a$", "$\\lambda\\,\\hat a$"],
        ["Direction cosines", "$(l, m, n) = (x, y, z)/r$, with $l^2 + m^2 + n^2 = 1$"],
        ["Collinear?", "Components proportional: $\\frac{a_1}{b_1} = \\frac{a_2}{b_2} = \\frac{a_3}{b_3}$"],
      ],
    },
    {
      type: "text",
      content:
        "**One problem, the whole chapter (worked).** $A = (-1, 3, 2)$ and $B = (3, -1, 4)$. Find (a) $\\overrightarrow{AB}$, (b) the distance $AB$, (c) the direction cosines of $\\overrightarrow{AB}$ and the angle it makes with the $z$-axis, and (d) the vector of length 9 in the direction of $\\overrightarrow{AB}$.\n\n**(a)** End minus start: $\\overrightarrow{AB} = (3 - (-1),\\ -1 - 3,\\ 4 - 2) = 4\\hat i - 4\\hat j + 2\\hat k$.\n\n**(b)** $AB = \\sqrt{16 + 16 + 4} = \\sqrt{36} = 6$. *Why:* distance is the length of the arrow between the points.",
    },
    {
      type: "math",
      latex:
        "\\text{(c)}\\quad (l, m, n) = \\frac{(4, -4, 2)}{6} = \\left(\\tfrac23,\\ -\\tfrac23,\\ \\tfrac13\\right), \\qquad \\gamma = \\cos^{-1}\\tfrac13 \\approx 70.5^\\circ",
    },
    {
      type: "text",
      content:
        "*Why:* direction cosines are the components of the unit vector, so divide by the length. Check: $\\frac49 + \\frac49 + \\frac19 = 1$. ✓\n\n**(d)** $9 \\cdot \\hat{AB} = 9\\left(\\frac23\\hat i - \\frac23\\hat j + \\frac13\\hat k\\right) = 6\\hat i - 6\\hat j + 3\\hat k$. *Why:* normalise, then scale. Check: $\\sqrt{36 + 36 + 9} = 9$. ✓\n\nOne arrow, four descriptions: components, length, direction cosines, and a rescaled copy. Every question below is some slice of this routine.",
    },
    {
      type: "quiz",
      id: "va1-6-q1",
      variant: "mastery",
      question: "$A = (2, -1, 3)$ and $B = (-1, 3, 5)$. What is $\\overrightarrow{AB}$?",
      options: [
        { text: "$-3\\hat i + 4\\hat j + 2\\hat k$", correct: true, feedback: "End minus start: $(-1 - 2,\\ 3 - (-1),\\ 5 - 3)$." },
        { text: "$3\\hat i - 4\\hat j - 2\\hat k$", feedback: "That is $\\overrightarrow{BA} = \\vec a - \\vec b$." },
        { text: "$\\hat i + 2\\hat j + 8\\hat k$", feedback: "That is $\\vec a + \\vec b$." },
      ],
    },
    {
      type: "quiz",
      id: "va1-6-q2",
      variant: "mastery",
      question: "With the same points, what is the distance $AB$?",
      options: [
        { text: "$\\sqrt{29}$", correct: true, feedback: "$\\sqrt{(-3)^2 + 4^2 + 2^2} = \\sqrt{9 + 16 + 4}$." },
        { text: "$9$", feedback: "That adds $3 + 4 + 2$. Distance uses Pythagoras." },
        { text: "$29$", feedback: "That is the squared distance." },
      ],
    },
    {
      type: "quiz",
      id: "va1-6-q3",
      variant: "mastery",
      question: "A force of 8 N acts at $120^\\circ$ to the positive $x$-axis. What are its components?",
      options: [
        { text: "$-4\\,\\hat i + 4\\sqrt3\\,\\hat j$", correct: true, feedback: "$8\\cos120^\\circ = -4$ and $8\\sin120^\\circ = 4\\sqrt3$." },
        { text: "$4\\,\\hat i + 4\\sqrt3\\,\\hat j$", feedback: "At $120^\\circ$ the force points left, so the $x$-component is negative." },
        { text: "$4\\sqrt3\\,\\hat i - 4\\,\\hat j$", feedback: "Cosine goes with $x$ and sine with $y$, and here $x < 0 < y$." },
      ],
    },
    {
      type: "quiz",
      id: "va1-6-q4",
      variant: "mastery",
      question: "What is the unit vector along $3\\hat i - 6\\hat j + 2\\hat k$?",
      options: [
        { text: "$\\frac17(3\\hat i - 6\\hat j + 2\\hat k)$", correct: true, feedback: "$\\sqrt{9 + 36 + 4} = 7$." },
        { text: "$\\frac1{49}(3\\hat i - 6\\hat j + 2\\hat k)$", feedback: "49 is the squared length." },
        { text: "$\\frac1{11}(3\\hat i - 6\\hat j + 2\\hat k)$", feedback: "11 is $|3| + |-6| + |2|$, not the length." },
      ],
    },
    {
      type: "quiz",
      id: "va1-6-q5",
      variant: "mastery",
      question: "Which vector has length 7 and points along $2\\hat i - \\hat j + 2\\hat k$?",
      options: [
        { text: "$\\frac{14}{3}\\hat i - \\frac73\\hat j + \\frac{14}{3}\\hat k$", correct: true, feedback: "$|2\\hat i - \\hat j + 2\\hat k| = 3$, so the answer is $\\frac73(2\\hat i - \\hat j + 2\\hat k)$. Check: $\\frac73 \\times 3 = 7$." },
        { text: "$14\\hat i - 7\\hat j + 14\\hat k$", feedback: "That multiplies by 7 without normalising, giving length 21." },
        { text: "$\\frac27\\hat i - \\frac17\\hat j + \\frac27\\hat k$", feedback: "That divides by 7 instead of by the length 3, and its length is $\\frac37$." },
      ],
    },
    {
      type: "quiz",
      id: "va1-6-q6",
      variant: "mastery",
      question: "What are the direction cosines of the vector from $(1, 2, -3)$ to $(-1, -2, 1)$?",
      options: [
        { text: "$-\\frac13,\\ -\\frac23,\\ \\frac23$", correct: true, feedback: "The vector is $(-2, -4, 4)$ with length $\\sqrt{4 + 16 + 16} = 6$." },
        { text: "$\\frac13,\\ \\frac23,\\ -\\frac23$", feedback: "That is the vector from the second point to the first. A vector's direction cosines carry its sign." },
        { text: "$-2,\\ -4,\\ 4$", feedback: "Those are direction ratios. Divide by the length 6." },
      ],
    },
    {
      type: "quiz",
      id: "va1-6-q7",
      variant: "mastery",
      question: "Which triple can be the direction cosines of a line?",
      options: [
        { text: "$\\frac{1}{\\sqrt2},\\ \\frac12,\\ \\frac12$", correct: true, feedback: "$\\frac12 + \\frac14 + \\frac14 = 1$." },
        { text: "$\\frac13,\\ \\frac23,\\ \\frac13$", feedback: "$\\frac19 + \\frac49 + \\frac19 = \\frac69 \\ne 1$." },
        { text: "$1,\\ 1,\\ -1$", feedback: "The squares add to 3. These can only be direction ratios." },
      ],
      hint: "Square, add, and compare with 1.",
    },
    {
      type: "quiz",
      id: "va1-6-q8",
      variant: "mastery",
      question: "A vector makes $60^\\circ$ with both the $x$-axis and the $y$-axis. Which angle can it make with the $z$-axis?",
      options: [
        { text: "$45^\\circ$ or $135^\\circ$", correct: true, feedback: "$n^2 = 1 - \\frac14 - \\frac14 = \\frac12$, so $n = \\pm\\frac1{\\sqrt2}$ and $\\gamma = 45^\\circ$ or $135^\\circ$." },
        { text: "$60^\\circ$", feedback: "Then $\\frac14 + \\frac14 + \\frac14 = \\frac34 \\ne 1$." },
        { text: "$90^\\circ$", feedback: "Then only $\\frac12$ of the required 1 is accounted for." },
      ],
    },
    {
      type: "quiz",
      id: "va1-6-q9",
      variant: "mastery",
      question: "For which $p$ are $\\hat i - 2\\hat j + 3\\hat k$ and $-2\\hat i + p\\hat j - 6\\hat k$ collinear?",
      options: [
        { text: "$p = 4$", correct: true, feedback: "The ratio is $\\frac{-2}{1} = \\frac{-6}{3} = -2$, so $p = -2 \\times (-2) = 4$." },
        { text: "$p = -4$", feedback: "Then the $\\hat j$ ratio is $\\frac{-4}{-2} = 2$, but the others are $-2$." },
        { text: "$p = 1$", feedback: "The second vector must be exactly $-2$ times the first, component by component." },
      ],
    },
    {
      type: "quiz",
      id: "va1-6-q10",
      variant: "mastery",
      question: "Are $A = (1, -2, -8)$, $B = (5, 0, -2)$ and $C = (11, 3, 7)$ collinear?",
      options: [
        { text: "Yes: $\\overrightarrow{AB} = (4, 2, 6)$ and $\\overrightarrow{BC} = (6, 3, 9)$ are proportional.", correct: true, feedback: "$\\overrightarrow{BC} = \\frac32\\overrightarrow{AB}$, and the two arrows share the point $B$, so all three points lie on one line. $B$ divides $AC$ in the ratio $2 : 3$." },
        { text: "No, because the coordinates of $A$, $B$, $C$ are not proportional.", feedback: "Collinearity of points is about the arrows between them, not their position vectors. Compare $\\overrightarrow{AB}$ and $\\overrightarrow{BC}$." },
        { text: "No, because $\\overrightarrow{AB} \\ne \\overrightarrow{BC}$.", feedback: "They need to be parallel, not equal. $(6, 3, 9) = \\frac32(4, 2, 6)$." },
      ],
    },
    {
      type: "quiz",
      id: "va1-6-q11",
      variant: "mastery",
      question: "$A = (0, 1, 2)$ and $B = (2, -1, 3)$. Which vector has length 12 and points from $A$ towards $B$?",
      options: [
        { text: "$8\\hat i - 8\\hat j + 4\\hat k$", correct: true, feedback: "$\\overrightarrow{AB} = (2, -2, 1)$ with length 3, so the answer is $\\frac{12}{3}(2\\hat i - 2\\hat j + \\hat k)$. Check: $\\sqrt{64 + 64 + 16} = 12$." },
        { text: "$-8\\hat i + 8\\hat j - 4\\hat k$", feedback: "Right length, wrong way: that points from $B$ towards $A$. Use end minus start, $\\vec b - \\vec a$." },
        { text: "$24\\hat i - 24\\hat j + 12\\hat k$", feedback: "That scales $\\overrightarrow{AB}$ by 12 without normalising, giving length 36." },
      ],
      hint: "Arrow, normalise, scale.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "Position vectors let you name any point with one symbol. Chapter 2 uses them to locate special points (the point dividing a segment in a given ratio, the midpoint, the centroid) and to prove classical geometry theorems in a few lines of algebra.",
    },
  ]),
};

export const vectorsChapter1Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lessonMastery,
];
