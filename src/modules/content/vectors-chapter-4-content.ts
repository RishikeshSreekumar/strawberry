import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Vector Algebra Chapter 4 — The Cross Product.
 * The second product: a vector perpendicular to both inputs, oriented by
 * the right-hand rule, whose length is the area of the parallelogram they
 * span. Components via the i-j-k cycle and the determinant, then areas,
 * unit normals, Lagrange's identity, torque and the law of sines.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "turning-area-and-direction",
  title: "4.1 · Turning, Area and a Missing Direction",
  position: 1,
  blocks: blocks([
    {
      type: "video",
      src: "/videos/va-4-cross-product.mp4",
      poster: "/videos/va-4-cross-product.jpg",
      title: "Chapter 4 overview video",
      caption:
        "A narrated walk through the whole chapter. Watch it now for the big picture, or come back to it as a recap.",
    },
    {
      type: "text",
      content:
        "Picture a spanner on a bolt. The spanner lies flat on the table, pointing east from the bolt. You push the free end north. The spanner swings, the bolt turns, and the bolt *moves*, but it does not move east and it does not move north. It moves straight **up** out of the table (it loosens), along an axis perpendicular to both the spanner and your push.",
    },
    {
      type: "text",
      content:
        "The dot product from Chapter 3 cannot describe this. It turns two vectors into a single number, and a number has no direction. The spanner problem needs a product of two vectors that gives a **third direction**, one that neither input points along. That product is the **cross product**, written $\\vec a \\times \\vec b$.",
    },
    {
      type: "text",
      content:
        "Before any formula, ask what such a product should depend on.\n\n**How hard it turns.** Pushing along the spanner (straight at the bolt) turns nothing. Pushing at right angles to the spanner turns the most. So the size should grow with $\\sin\\theta$, where $\\theta$ is the angle between the two vectors, and it should also grow with both lengths.\n\n**Which way it turns.** Push north and the bolt comes up; push south and it goes down. So swapping the sense of the turn should flip the answer's direction.",
    },
    {
      type: "text",
      content:
        "Now look at two vectors $\\vec a$ and $\\vec b$ from a common tail. They span a parallelogram. Its base is $|\\vec a|$ and its height is $|\\vec b|\\sin\\theta$, so its area is",
    },
    { type: "math", latex: "\\text{Area} = |\\vec a|\\,|\\vec b|\\sin\\theta" },
    {
      type: "text",
      content:
        "That is exactly the size the spanner wanted. So here is the plan for the new product: its **length** is the area of the parallelogram, and its **direction** is the one direction the parallelogram does not contain, the line perpendicular to its face. A flat patch of area in space has a size and a facing, and the cross product packs both into one arrow.",
    },
    {
      type: "interactive",
      config: {
        component: "vec-space-3d",
        mode: "cross",
        a: [3, 0, 0],
        b: [2, 2, 0],
        sliders: [{ name: "angle", min: 0, max: 360, step: 5, initial: 45 }],
        readouts: ["cross", "area"],
        caption:
          "Swing b around a: the normal grows as the parallelogram opens and flips when b swings past the line of a (at 180°). Drag the scene to rotate it and see that the arrow always stands straight out of the parallelogram.",
      },
    },
    {
      type: "text",
      content:
        "Things to notice as you drag the slider:\n\n- At $0^\\circ$ the parallelogram is flat, the area is 0, and the arrow vanishes.\n- The arrow is longest at $90^\\circ$, where $\\sin\\theta = 1$.\n- Between $0^\\circ$ and $180^\\circ$ the arrow points up (+z). Past $180^\\circ$, $\\vec b$ has swung to the other side of the line through $\\vec a$, so the turn from $\\vec a$ to $\\vec b$ is now clockwise from above and the arrow points down.\n- The arrow never leans into the plane of $\\vec a$ and $\\vec b$. It stays perpendicular to both.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The right-hand rule",
      content:
        "Point the fingers of your **right** hand along $\\vec a$, then curl them toward $\\vec b$ through the smaller angle. Your thumb points along $\\vec a \\times \\vec b$.\n\nEquivalently: if you look down at the parallelogram from the tip of $\\vec a\\times\\vec b$, the turn from $\\vec a$ to $\\vec b$ is anticlockwise.",
    },
    {
      type: "text",
      content:
        "Check it on the spanner. The spanner (the position of the push, $\\vec r$) points east, the push $\\vec F$ points north. Seen from above, east-to-north is an anticlockwise turn, so the thumb points **up**. That matches a standard right-handed bolt: turned anticlockwise from above, it comes up and loosens. Turned clockwise (push south), it goes down and tightens.",
    },
    {
      type: "text",
      content:
        "**Worked example 1.** Take $\\vec a = 3\\hat i$ and $\\vec b = 2\\hat i + 2\\hat j$, the starting picture above (the angle between them is $45^\\circ$).\n\n1. Both lie in the $xy$-plane, so the perpendicular direction is the $z$-axis.\n2. The parallelogram has base $|\\vec a| = 3$ along the x-axis and height 2 (the $y$-coordinate of $\\vec b$), so its area is $3 \\times 2 = 6$. (Check with the formula: $3 \\cdot 2\\sqrt2 \\cdot \\sin 45^\\circ = 6$.)\n3. Fingers along $+x$, curl toward $\\vec b$, which points at $45^\\circ$ up and to the right (into the first quadrant): anticlockwise from above, so the thumb points to $+z$.\n4. Therefore $\\vec a \\times \\vec b = 6\\hat k$.",
    },
    {
      type: "text",
      content:
        "**Worked example 2.** Swap the order: $\\vec b \\times \\vec a$ with the same vectors.\n\n1. The parallelogram is the same shape, so the length is still 6.\n2. Now the fingers start along $\\vec b$ and curl toward $\\vec a$: that is clockwise when seen from above, so the thumb points to $-z$.\n3. Therefore $\\vec b \\times \\vec a = -6\\hat k$. Order matters, and reversing it flips the arrow.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (a solar panel).** A rectangular rooftop panel in Chennai has one edge $\\vec a = 2\\hat i$ m running east along the roof, and the other edge $\\vec b = 1.2\\hat j + 0.9\\hat k$ m running up the slope, north and upward. Find the size and direction of $\\vec a \\times \\vec b$, the panel's area vector.\n\n1. **Angle.** $\\vec a \\cdot \\vec b = 0$, so the edges meet at $90^\\circ$ and $\\sin\\theta = 1$. *Why:* the size uses $\\sin\\theta$, so find the angle first. A rectangle's edges are perpendicular anyway.\n2. **Size.** $|\\vec b| = \\sqrt{1.44 + 0.81} = \\sqrt{2.25} = 1.5$ m, so $|\\vec a \\times \\vec b| = 2 \\times 1.5 \\times 1 = 3$ m², the panel's area.\n3. **Direction, part 1.** The arrow must be perpendicular to $\\vec a$ (east), so it has no east component: it lives in the north-up plane. It must also be perpendicular to the slope $\\vec b$. In the north-up plane only two unit directions do that: $(0, -0.6, 0.8)$ (up and south) or its opposite. Check: $(0, -0.6, 0.8)\\cdot(0, 1.2, 0.9) = -0.72 + 0.72 = 0$. *Why:* perpendicular to both inputs pins down a line; the right-hand rule then picks the end.\n4. **Direction, part 2.** If $\\vec b$ pointed flat north, east-to-north would give a thumb straight up (Worked example 1's picture). Tilting $\\vec b$ upward tips the thumb backward, toward the south, while it stays perpendicular to $\\vec b$. So the thumb points up and south.\n5. **Answer.** $\\vec a \\times \\vec b = 3(0, -0.6, 0.8) = -1.8\\hat j + 2.4\\hat k$ m²: an arrow of length 3 pointing up and toward the southern sky, which is where the sun sits at noon in India. The area vector tells you both how big the panel is and which way it faces.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (exam style).** $|\\vec a| = 2$, $|\\vec b| = 3$, and the parallelogram on $\\vec a$ and $\\vec b$ has area $3\\sqrt3$. Find the angle between $\\vec a$ and $\\vec b$.\n\n1. Area $= |\\vec a||\\vec b|\\sin\\theta$, so $6\\sin\\theta = 3\\sqrt3$ and $\\sin\\theta = \\frac{\\sqrt3}{2}$. *Why:* the area is the one fact that involves the angle, so solve it for $\\sin\\theta$.\n2. On $0 \\le \\theta \\le 180^\\circ$, two angles have this sine: $\\theta = 60^\\circ$ or $\\theta = 120^\\circ$. *Why both:* a parallelogram with a $60^\\circ$ corner also has a $120^\\circ$ corner, and the two have the same area. Area alone cannot tell them apart.\n3. Answer: $60^\\circ$ or $120^\\circ$. If the question also says $\\vec a\\cdot\\vec b < 0$, only $120^\\circ$ survives (Lesson 4.5 returns to this).",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the cross product lies in the plane of a and b\"",
      content:
        "It never does (unless it is the zero vector). The whole point is to capture the direction the two inputs *do not* supply. If $\\vec a$ and $\\vec b$ lie on the floor, $\\vec a \\times \\vec b$ points straight up or straight down, never along the floor. A quick sanity check for any cross product you compute: it must be perpendicular to both inputs.",
    },
    {
      type: "table",
      headers: ["", "Dot product $\\vec a\\cdot\\vec b$", "Cross product $\\vec a\\times\\vec b$"],
      rows: [
        ["Output", "A number (scalar)", "A vector"],
        ["Size uses", "$\\cos\\theta$", "$\\sin\\theta$"],
        ["Biggest when", "Parallel ($\\theta = 0$)", "Perpendicular ($\\theta = 90^\\circ$)"],
        ["Zero when", "Perpendicular", "Parallel"],
        ["Measures", "How much they agree (shadow, work)", "How much they turn (area, torque)"],
      ],
    },
    {
      type: "quiz",
      id: "va4-1-q1",
      variant: "concept",
      question:
        "$\\vec a$ and $\\vec b$ both lie in the horizontal $xy$-plane and are not parallel. Where does $\\vec a \\times \\vec b$ point?",
      options: [
        {
          text: "Along the $z$-axis: straight up or straight down.",
          correct: true,
          feedback: "It is perpendicular to both inputs, so it must leave the plane at right angles. The right-hand rule picks up or down.",
        },
        {
          text: "Somewhere in the $xy$-plane, between $\\vec a$ and $\\vec b$.",
          feedback: "That is the misconception. A vector between $\\vec a$ and $\\vec b$ is something like $\\vec a + \\vec b$, a sum, not a cross product.",
        },
        {
          text: "Along $\\vec a$, since $\\vec a$ comes first.",
          feedback: "The cross product is perpendicular to $\\vec a$, so it can never point along it (unless it is zero).",
        },
      ],
    },
    {
      type: "quiz",
      id: "va4-1-q2",
      variant: "practice",
      question:
        "$\\vec a$ points east and $\\vec b$ points north (with $z$ up). Which way does $\\vec a \\times \\vec b$ point?",
      options: [
        { text: "Up", correct: true, feedback: "East to north is anticlockwise seen from above, so the right thumb points up. This is $\\hat i \\times \\hat j = \\hat k$." },
        { text: "Down", feedback: "That is $\\vec b \\times \\vec a$: curling from north to east is clockwise from above." },
        { text: "North-east", feedback: "That lies in the plane of the inputs; the cross product leaves the plane." },
        { text: "West", feedback: "West lies in the floor plane, and a cross product is perpendicular to the plane of its inputs." },
      ],
      hint: "Fingers east, curl toward north, and look where your thumb goes.",
    },
    {
      type: "quiz",
      id: "va4-1-q3",
      variant: "practice",
      question:
        "In the interactive, $|\\vec a| = 3$ and $|\\vec b| = 2\\sqrt2$. At what angle between them is $|\\vec a \\times \\vec b|$ largest?",
      options: [
        { text: "$90^\\circ$", correct: true, feedback: "The length is $|\\vec a||\\vec b|\\sin\\theta$, and $\\sin\\theta$ peaks at $90^\\circ$, where the parallelogram is a rectangle." },
        { text: "$0^\\circ$", feedback: "At $0^\\circ$ the parallelogram is flat, so the area and the cross product are zero." },
        { text: "$180^\\circ$", feedback: "Anti-parallel vectors also span zero area." },
        { text: "It does not depend on the angle.", feedback: "It depends on $\\sin\\theta$: the more the parallelogram opens, the longer the arrow." },
      ],
    },
    {
      type: "quiz",
      id: "va4-1-q4",
      variant: "concept",
      question:
        "You push on a spanner exactly along its length, straight toward the bolt. Why does the bolt not turn?",
      options: [
        {
          text: "The angle between the spanner and the push is $0^\\circ$, so $\\sin\\theta = 0$ and the turning effect vanishes.",
          correct: true,
          feedback: "Parallel vectors span no area. Turning needs a component of force across the spanner.",
        },
        {
          text: "The push is too small; any force along the spanner turns the bolt if it is big enough.",
          feedback: "Size does not help: $|\\vec r||\\vec F|\\sin 0^\\circ = 0$ for every $|\\vec F|$.",
        },
        {
          text: "Because $\\cos 0^\\circ = 1$, the effect is maximal but in the wrong direction.",
          feedback: "Turning uses $\\sin\\theta$, not $\\cos\\theta$. Cosine belongs to the dot product.",
        },
      ],
    },
    {
      type: "quiz",
      id: "va4-1-q5",
      variant: "practice",
      question:
        "A rectangular table top has edges $\\vec a = 1.5\\hat i$ m (east) and $\\vec b = 0.8\\hat j$ m (north), with $z$ up. What is $\\vec a \\times \\vec b$?",
      options: [
        { text: "$1.2\\,\\hat k$ m²", correct: true, feedback: "The edges are perpendicular, so the length is $1.5 \\times 0.8 = 1.2$ m², the area. East to north is anticlockwise from above, so it points up." },
        { text: "$-1.2\\,\\hat k$ m²", feedback: "Right size, wrong sense. Curl from east toward north: the thumb points up, not down. $-1.2\\hat k$ is $\\vec b \\times \\vec a$." },
        { text: "$1.2$ m² (just a number)", feedback: "$1.2$ is the size, but a cross product is a vector. It also records which way the surface faces." },
        { text: "$2.3\\,\\hat k$ m²", feedback: "$1.5 + 0.8 = 2.3$ adds the edges. The area of a rectangle multiplies them." },
      ],
      hint: "Size = area of the rectangle. Direction = right-hand rule from east to north.",
    },
    {
      type: "quiz",
      id: "va4-1-q6",
      variant: "practice",
      question:
        "$|\\vec a| = 4$, $|\\vec b| = 5$ and the parallelogram on $\\vec a$ and $\\vec b$ has area 10. What can the angle between $\\vec a$ and $\\vec b$ be?",
      options: [
        { text: "$30^\\circ$ or $150^\\circ$", correct: true, feedback: "$20\\sin\\theta = 10$ gives $\\sin\\theta = \\frac12$, and both $30^\\circ$ and $150^\\circ$ have that sine. The area cannot tell them apart." },
        { text: "$30^\\circ$ only", feedback: "$\\sin 150^\\circ = \\frac12$ as well. A parallelogram with a $30^\\circ$ corner has a $150^\\circ$ corner too, with the same area." },
        { text: "$60^\\circ$ or $120^\\circ$", feedback: "That solves $\\cos\\theta = \\frac12$ or $\\sin\\theta = \\frac{\\sqrt3}{2}$. Area uses $\\sin\\theta$, and here $\\sin\\theta = \\frac{10}{20} = \\frac12$." },
        { text: "$90^\\circ$", feedback: "At $90^\\circ$ the area would be $4 \\times 5 = 20$, not 10." },
      ],
      hint: "Area = |a||b| sin θ. Solve for sin θ, then list every angle in [0°, 180°] with that sine.",
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "definition-and-properties",
  title: "4.2 · Definition and Properties",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "Lesson 4.1 decided what the cross product should be: length equal to the parallelogram's area, direction perpendicular to it, sense fixed by the right-hand rule. Writing that down as a formula gives the definition.",
    },
    {
      type: "math",
      latex: "\\vec a \\times \\vec b = |\\vec a|\\,|\\vec b|\\sin\\theta\\;\\hat n",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The cross (vector) product",
      content:
        "For vectors $\\vec a$, $\\vec b$ with angle $\\theta$ between them ($0 \\le \\theta \\le \\pi$), the cross product is the vector above, where $\\hat n$ is the unit vector perpendicular to both $\\vec a$ and $\\vec b$, chosen so that $\\vec a$, $\\vec b$, $\\hat n$ form a right-handed system (the right-hand rule). If $\\vec a$ or $\\vec b$ is zero, or they are parallel, $\\vec a \\times \\vec b = \\vec 0$.",
    },
    {
      type: "text",
      content:
        "Because $0 \\le \\theta \\le \\pi$, $\\sin\\theta \\ge 0$, so the length is never negative and all the direction information lives in $\\hat n$. Every property below is read straight off this picture, not memorised.",
    },
    {
      type: "text",
      content:
        "**1. Anticommutativity: $\\vec b \\times \\vec a = -\\,\\vec a \\times \\vec b$.** Swapping the order leaves the parallelogram and its area unchanged. But curling from $\\vec b$ to $\\vec a$ is the opposite turn, so the thumb flips. Same length, opposite direction.",
    },
    {
      type: "text",
      content:
        "**2. A vector crossed with itself: $\\vec a \\times \\vec a = \\vec 0$.** The angle is 0, $\\sin 0 = 0$, and a vector spans no area with itself.",
    },
    {
      type: "text",
      content:
        "**3. The parallel test.** For non-zero $\\vec a$ and $\\vec b$, $\\vec a \\times \\vec b = \\vec 0$ exactly when $\\sin\\theta = 0$, i.e. $\\theta = 0$ or $\\pi$. So",
    },
    { type: "math", latex: "\\vec a \\parallel \\vec b \\iff \\vec a \\times \\vec b = \\vec 0 \\qquad (\\vec a, \\vec b \\neq \\vec 0)" },
    {
      type: "text",
      content:
        "Compare with the dot product: dot is zero for perpendicular vectors, cross is zero for parallel ones. Between them they test both extremes.",
    },
    {
      type: "text",
      content:
        "**4. Scalars pull out: $(k\\vec a) \\times \\vec b = k(\\vec a \\times \\vec b) = \\vec a \\times (k\\vec b)$.** Stretching one side by $k > 0$ stretches the area by $k$ and keeps the facing. A negative $k$ reverses $\\vec a$, which reverses the turn and flips the arrow, which is again multiplication by $k$.",
    },
    {
      type: "text",
      content:
        "**5. Distributivity: $\\vec a \\times (\\vec b + \\vec c) = \\vec a \\times \\vec b + \\vec a \\times \\vec c$.** Here is the picture argument. Project $\\vec b$ and $\\vec c$ onto the plane perpendicular to $\\vec a$: that keeps only the parts that contribute to area with $\\vec a$. Replacing $\\vec b$ by its part perpendicular to $\\vec a$ does not change $\\vec a \\times \\vec b$: the parallel part lies along $\\vec a$ and spans no area (same base, same height). For a vector $\\vec v$ in that plane, $\\vec a \\times \\vec v$ is just $\\vec v$ rotated by $90^\\circ$ about $\\vec a$ and scaled by $|\\vec a|$. Rotating and scaling a triangle $\\vec b$, $\\vec c$, $\\vec b + \\vec c$ gives another triangle, so the images still add. We accept this and use it heavily in 4.3.",
    },
    {
      type: "text",
      content:
        "Now apply the definition to the unit vectors $\\hat i, \\hat j, \\hat k$. They are mutually perpendicular unit vectors, so each cross product of two different ones has length $1 \\cdot 1 \\cdot \\sin 90^\\circ = 1$ and points along the third. The right-hand rule gives the sign.",
    },
    {
      type: "math",
      latex:
        "\\hat i \\times \\hat j = \\hat k, \\qquad \\hat j \\times \\hat k = \\hat i, \\qquad \\hat k \\times \\hat i = \\hat j",
    },
    {
      type: "math",
      latex:
        "\\hat j \\times \\hat i = -\\hat k, \\qquad \\hat k \\times \\hat j = -\\hat i, \\qquad \\hat i \\times \\hat k = -\\hat j, \\qquad \\hat i\\times\\hat i = \\hat j\\times\\hat j = \\hat k\\times\\hat k = \\vec 0",
    },
    {
      type: "callout",
      variant: "tip",
      title: "The cycle",
      content:
        "Write $\\hat i \\to \\hat j \\to \\hat k \\to \\hat i$ around a circle. Crossing two neighbours **in the direction of the arrows** gives the third with a plus sign. Going **against** the arrows gives the third with a minus sign. You never need to memorise six products, only one circle.",
    },
    {
      type: "table",
      headers: ["$\\times$", "$\\hat i$", "$\\hat j$", "$\\hat k$"],
      rows: [
        ["$\\hat i$", "$\\vec 0$", "$\\hat k$", "$-\\hat j$"],
        ["$\\hat j$", "$-\\hat k$", "$\\vec 0$", "$\\hat i$"],
        ["$\\hat k$", "$\\hat j$", "$-\\hat i$", "$\\vec 0$"],
      ],
    },
    {
      type: "text",
      content: "Read the table as (row) $\\times$ (column). It is antisymmetric across the diagonal, which is anticommutativity in table form.",
    },
    {
      type: "text",
      content:
        "**Worked example 1.** $|\\vec a| = 4$, $|\\vec b| = 3$, and the angle between them is $\\frac{\\pi}{6}$. Find $|\\vec a \\times \\vec b|$.\n\n$|\\vec a \\times \\vec b| = 4 \\cdot 3 \\cdot \\sin\\frac{\\pi}{6} = 12 \\cdot \\frac12 = 6.$",
    },
    {
      type: "text",
      content:
        "**Worked example 2.** Compute $(2\\hat i + 3\\hat j) \\times (\\hat i - \\hat j)$ using only the properties.\n\n1. Distribute: $2\\hat i\\times\\hat i - 2\\hat i\\times\\hat j + 3\\hat j\\times\\hat i - 3\\hat j\\times\\hat j$.\n2. Self-products vanish: $\\hat i\\times\\hat i = \\hat j\\times\\hat j = \\vec 0$.\n3. Use the cycle: $\\hat i\\times\\hat j = \\hat k$, $\\hat j\\times\\hat i = -\\hat k$.\n4. Result: $-2\\hat k - 3\\hat k = -5\\hat k$.\n\nCheck the direction: both vectors lie in the $xy$-plane, so the answer must be along $\\hat k$. It is.",
    },
    {
      type: "text",
      content:
        "**Worked example 3.** Simplify $(\\vec a - \\vec b) \\times (\\vec a + \\vec b)$.\n\n1. Distribute: $\\vec a\\times\\vec a + \\vec a\\times\\vec b - \\vec b\\times\\vec a - \\vec b\\times\\vec b$.\n2. $\\vec a\\times\\vec a = \\vec b\\times\\vec b = \\vec 0$.\n3. $-\\vec b\\times\\vec a = +\\vec a\\times\\vec b$ by anticommutativity.\n4. Result: $2(\\vec a\\times\\vec b)$.\n\nIf the product were commutative the answer would have been $\\vec 0$; the order carries real information.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (a charged particle in a magnet).** A moving charge in a magnetic field feels the force $\\vec F = q\\,(\\vec v \\times \\vec B)$. A proton ($q = 1.6\\times10^{-19}$ C) moves with $\\vec v = 2\\times10^{6}\\,\\hat i$ m/s through a field $\\vec B = 0.5\\,\\hat j$ T. Find the force.\n\n1. Pull the scalars out: $\\vec v \\times \\vec B = (2\\times10^6)(0.5)\\,(\\hat i \\times \\hat j) = 10^6\\,(\\hat i\\times\\hat j)$. *Why:* property 4 lets numbers leave the product, so only a unit-vector product is left.\n2. Use the cycle: $\\hat i \\times \\hat j = \\hat k$, so $\\vec v\\times\\vec B = 10^6\\,\\hat k$.\n3. Multiply by the charge: $\\vec F = 1.6\\times10^{-19}\\times10^6\\,\\hat k = 1.6\\times10^{-13}\\,\\hat k$ N.\n4. Read the answer. The force is perpendicular to the velocity, so it bends the path without speeding the proton up. That is why charges circle in a magnetic field. An electron (negative $q$) would be pushed along $-\\hat k$. A proton moving along $\\hat j$, parallel to $\\vec B$, would feel no force at all, since $\\hat j\\times\\hat j = \\vec 0$.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (CBSE style).** $|\\vec a| = 2$, $|\\vec b| = 3$ and the angle between them is $\\frac{\\pi}{6}$. Find $|(\\vec a - 2\\vec b)\\times(3\\vec a + \\vec b)|$.\n\n1. Distribute, keeping every factor in order: $3\\,\\vec a\\times\\vec a + \\vec a\\times\\vec b - 6\\,\\vec b\\times\\vec a - 2\\,\\vec b\\times\\vec b$. *Why:* distributivity works, but only if you never swap the two sides of a $\\times$.\n2. Drop the self-products: $\\vec a\\times\\vec a = \\vec b\\times\\vec b = \\vec 0$.\n3. Turn $\\vec b\\times\\vec a$ into $-\\vec a\\times\\vec b$: $-6\\,\\vec b\\times\\vec a = +6\\,\\vec a\\times\\vec b$. *Why:* now every term is a multiple of the same vector, so they can be added.\n4. Total: $\\vec a\\times\\vec b + 6\\,\\vec a\\times\\vec b = 7\\,(\\vec a\\times\\vec b)$.\n5. $|\\vec a\\times\\vec b| = 2\\cdot3\\cdot\\sin\\frac{\\pi}{6} = 3$, so the answer is $7 \\times 3 = 21$.\n\nEvery product of two combinations of $\\vec a$ and $\\vec b$ collapses to a single multiple of $\\vec a\\times\\vec b$. The multiple is the $2\\times2$ determinant of the coefficients: $\\begin{vmatrix} 1 & -2 \\\\ 3 & 1\\end{vmatrix} = 1 + 6 = 7$.",
    },
    {
      type: "text",
      content:
        "**Worked example 6 (NCERT/JEE classic).** Given $\\vec a\\times\\vec b = \\vec c\\times\\vec d$ and $\\vec a\\times\\vec c = \\vec b\\times\\vec d$, show that $\\vec a - \\vec d$ is parallel to $\\vec b - \\vec c$ (assuming both are non-zero).\n\n1. **Aim.** Parallel means the cross product is zero, so the goal is $(\\vec a - \\vec d)\\times(\\vec b - \\vec c) = \\vec 0$. *Why:* property 3 turns a geometric claim (parallel) into an algebraic one (a product equals $\\vec 0$).\n2. **Expand.** $(\\vec a - \\vec d)\\times(\\vec b - \\vec c) = \\vec a\\times\\vec b - \\vec a\\times\\vec c - \\vec d\\times\\vec b + \\vec d\\times\\vec c$.\n3. **Match the given forms.** $-\\vec d\\times\\vec b = +\\vec b\\times\\vec d$ and $\\vec d\\times\\vec c = -\\vec c\\times\\vec d$. So the expression is $(\\vec a\\times\\vec b - \\vec c\\times\\vec d) - (\\vec a\\times\\vec c - \\vec b\\times\\vec d)$. *Why:* anticommutativity rewrites each term so it matches one of the given equations.\n4. **Use the data.** Each bracket is $\\vec 0$, so the product is $\\vec 0$, and $\\vec a - \\vec d \\parallel \\vec b - \\vec c$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a×b = b×a\"",
      content:
        "Ordinary multiplication commutes, so it is tempting to assume this one does. It does not: $\\hat i \\times \\hat j = \\hat k$ but $\\hat j \\times \\hat i = -\\hat k$. The two answers have the same length and opposite directions. Whenever you expand a product of sums, keep every factor in its original order.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the cross product is associative\"",
      content:
        "Brackets matter. Take $\\hat i, \\hat i, \\hat j$:\n\n$\\hat i \\times (\\hat i \\times \\hat j) = \\hat i \\times \\hat k = -\\hat j$\n\n$(\\hat i \\times \\hat i) \\times \\hat j = \\vec 0 \\times \\hat j = \\vec 0$\n\nOne example is enough to show that $\\vec a \\times (\\vec b \\times \\vec c)$ and $(\\vec a \\times \\vec b) \\times \\vec c$ are different in general. An expression like $\\vec a \\times \\vec b \\times \\vec c$ with no brackets is meaningless.",
    },
    {
      type: "quiz",
      id: "va4-2-q1",
      variant: "concept",
      question: "If $\\vec a \\times \\vec b = 2\\hat i - \\hat j + 3\\hat k$, what is $\\vec b \\times \\vec a$?",
      options: [
        { text: "$-2\\hat i + \\hat j - 3\\hat k$", correct: true, feedback: "Reversing the order flips the arrow: $\\vec b\\times\\vec a = -(\\vec a\\times\\vec b)$." },
        { text: "$2\\hat i - \\hat j + 3\\hat k$", feedback: "That assumes the cross product commutes. Curling from $\\vec b$ to $\\vec a$ is the opposite turn, so the thumb points the other way." },
        { text: "$\\vec 0$", feedback: "It is zero only if $\\vec a\\times\\vec b$ is zero. Here it is not." },
        { text: "It cannot be found without $\\vec a$ and $\\vec b$.", feedback: "Anticommutativity gives it immediately: same length, opposite direction." },
      ],
    },
    {
      type: "quiz",
      id: "va4-2-q2",
      variant: "practice",
      question: "Evaluate $\\hat k \\times \\hat j$.",
      options: [
        { text: "$-\\hat i$", correct: true, feedback: "$\\hat k \\to \\hat j$ goes against the cycle $\\hat i\\to\\hat j\\to\\hat k\\to\\hat i$, so the result is minus the third vector." },
        { text: "$\\hat i$", feedback: "That is $\\hat j \\times \\hat k$. The order here is reversed." },
        { text: "$\\vec 0$", feedback: "Only a vector crossed with itself (or a parallel vector) gives zero." },
        { text: "$1$", feedback: "A cross product is a vector, not a number. You may be thinking of a dot product of equal unit vectors." },
      ],
      hint: "Place i, j, k around a circle and check which way k → j runs.",
    },
    {
      type: "quiz",
      id: "va4-2-q3",
      variant: "concept",
      question: "Which is correct?",
      options: [
        {
          text: "$\\hat i \\times (\\hat i \\times \\hat j) = -\\hat j$, but $(\\hat i \\times \\hat i) \\times \\hat j = \\vec 0$.",
          correct: true,
          feedback: "Different brackets, different answers: the cross product is not associative.",
        },
        {
          text: "Both equal $-\\hat j$, because brackets never matter in a product.",
          feedback: "$\\hat i \\times \\hat i = \\vec 0$, and $\\vec 0 \\times \\hat j = \\vec 0$, not $-\\hat j$.",
        },
        {
          text: "Both equal $\\vec 0$, because $\\hat i$ appears twice.",
          feedback: "In the first one, $\\hat i \\times \\hat j = \\hat k$ first, and $\\hat i \\times \\hat k = -\\hat j$ is not zero.",
        },
      ],
    },
    {
      type: "quiz",
      id: "va4-2-q4",
      variant: "practice",
      question: "$|\\vec a| = 2$, $|\\vec b| = 3$ and the angle between them is $30^\\circ$. Find $|\\vec a \\times \\vec b|$.",
      options: [
        { text: "$3$", correct: true, feedback: "$2 \\cdot 3 \\cdot \\sin 30^\\circ = 6 \\cdot \\frac12 = 3$." },
        { text: "$3\\sqrt3$", feedback: "That uses $\\cos 30^\\circ$, which belongs to the dot product." },
        { text: "$6$", feedback: "That forgets the $\\sin\\theta$ factor, which is only 1 when the vectors are perpendicular." },
        { text: "$6\\sqrt3$", feedback: "That multiplies by $2\\cos 30^\\circ = \\sqrt3$ instead of $\\sin 30^\\circ = \\frac12$. The cross product's length uses $\\sin\\theta$: $6 \\cdot \\frac12 = 3$." },
      ],
    },
    {
      type: "quiz",
      id: "va4-2-q5",
      variant: "practice",
      question: "Simplify $(\\vec a + \\vec b) \\times (\\vec a - \\vec b)$.",
      options: [
        { text: "$-2(\\vec a \\times \\vec b)$", correct: true, feedback: "$\\vec a\\times\\vec a - \\vec a\\times\\vec b + \\vec b\\times\\vec a - \\vec b\\times\\vec b = -\\vec a\\times\\vec b - \\vec a\\times\\vec b$." },
        { text: "$2(\\vec a \\times \\vec b)$", feedback: "That is $(\\vec a - \\vec b)\\times(\\vec a + \\vec b)$. The order of the factors is reversed here, which flips the sign." },
        { text: "$\\vec 0$", feedback: "That would be true if $\\vec b \\times \\vec a = \\vec a \\times \\vec b$, but they are negatives of each other." },
        { text: "$|\\vec a|^2 - |\\vec b|^2$", feedback: "That is the *dot* product $(\\vec a + \\vec b)\\cdot(\\vec a - \\vec b)$, a number. A cross product is a vector." },
      ],
    },
    {
      type: "quiz",
      id: "va4-2-q6",
      variant: "concept",
      question: "$\\vec a$ and $\\vec b$ are non-zero and $\\vec a \\times \\vec b = \\vec 0$. What must be true?",
      options: [
        { text: "$\\vec a$ and $\\vec b$ are parallel (same or opposite direction).", correct: true, feedback: "$|\\vec a||\\vec b|\\sin\\theta = 0$ with non-zero lengths forces $\\sin\\theta = 0$, so $\\theta = 0$ or $\\pi$." },
        { text: "$\\vec a$ and $\\vec b$ are perpendicular.", feedback: "Perpendicular vectors have the *largest* cross product. Zero dot product means perpendicular." },
        { text: "$\\vec a = \\vec b$", feedback: "Equal vectors do give zero, but so do $\\vec b = -3\\vec a$ or any other parallel pair." },
      ],
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a×b = a×c, so b = c\"",
      content:
        "You cannot cancel $\\vec a$ from a cross product. Take $\\vec a = \\hat i$, $\\vec b = \\hat j$, $\\vec c = \\hat j + \\hat i$. Then $\\vec a \\times \\vec c = \\hat i\\times\\hat j + \\hat i\\times\\hat i = \\hat k = \\vec a \\times \\vec b$, yet $\\vec b \\neq \\vec c$.\n\nWhat the equation really says: $\\vec a \\times (\\vec b - \\vec c) = \\vec 0$, so (for $\\vec a \\neq \\vec 0$) $\\vec b - \\vec c$ is **parallel to** $\\vec a$. Any part of $\\vec b$ along $\\vec a$ is invisible to the cross product, because it adds no area.",
    },
    {
      type: "quiz",
      id: "va4-2-q7",
      variant: "concept",
      question: "$\\vec a \\neq \\vec 0$ and $\\vec a \\times \\vec b = \\vec a \\times \\vec c$. What can you conclude?",
      options: [
        { text: "$\\vec b - \\vec c$ is parallel to $\\vec a$ (or zero).", correct: true, feedback: "Subtract: $\\vec a \\times (\\vec b - \\vec c) = \\vec 0$, and a zero cross product with non-zero $\\vec a$ means $\\vec b - \\vec c = \\lambda\\vec a$." },
        { text: "$\\vec b = \\vec c$", feedback: "Cancelling like ordinary algebra fails here. Counterexample: $\\hat i \\times \\hat j = \\hat i \\times (\\hat j + \\hat i) = \\hat k$, but $\\hat j \\neq \\hat j + \\hat i$." },
        { text: "$\\vec b$ and $\\vec c$ are perpendicular to each other.", feedback: "Nothing forces that. In the counterexample $\\hat j\\cdot(\\hat j + \\hat i) = 1$." },
        { text: "$\\vec b = -\\vec c$", feedback: "That would give $\\vec a\\times\\vec b = -\\vec a\\times\\vec c$, the opposite of what is given." },
      ],
      hint: "Move everything to one side and factor out a.",
    },
    {
      type: "quiz",
      id: "va4-2-q8",
      variant: "concept",
      question: "For two vectors, $\\vec a \\cdot \\vec b = 0$ **and** $\\vec a \\times \\vec b = \\vec 0$. What must be true?",
      options: [
        { text: "$\\vec a = \\vec 0$ or $\\vec b = \\vec 0$.", correct: true, feedback: "If both were non-zero, we would need $\\cos\\theta = 0$ and $\\sin\\theta = 0$ at once, which is impossible since $\\sin^2\\theta + \\cos^2\\theta = 1$." },
        { text: "They are perpendicular.", feedback: "Perpendicular non-zero vectors have $|\\vec a\\times\\vec b| = |\\vec a||\\vec b| \\neq 0$." },
        { text: "They are parallel.", feedback: "Parallel non-zero vectors have $\\vec a\\cdot\\vec b = \\pm|\\vec a||\\vec b| \\neq 0$." },
        { text: "They are both unit vectors at $45^\\circ$.", feedback: "At $45^\\circ$ both products are non-zero." },
      ],
    },
    {
      type: "quiz",
      id: "va4-2-q9",
      variant: "practice",
      question: "Simplify $(2\\vec a + \\vec b) \\times (\\vec a - 3\\vec b)$.",
      options: [
        { text: "$-7\\,(\\vec a \\times \\vec b)$", correct: true, feedback: "$2\\vec a\\times\\vec a - 6\\,\\vec a\\times\\vec b + \\vec b\\times\\vec a - 3\\,\\vec b\\times\\vec b = -6\\,\\vec a\\times\\vec b - \\vec a\\times\\vec b$. The coefficient determinant agrees: $(2)(-3) - (1)(1) = -7$." },
        { text: "$-5\\,(\\vec a \\times \\vec b)$", feedback: "That treats $\\vec b\\times\\vec a$ as $+\\vec a\\times\\vec b$. It is $-\\vec a\\times\\vec b$, so the two terms add to $-7$." },
        { text: "$7\\,(\\vec a \\times \\vec b)$", feedback: "Sign error: the biggest term is $2\\vec a\\times(-3\\vec b) = -6\\,\\vec a\\times\\vec b$, which is negative." },
        { text: "$-6\\,(\\vec a \\times \\vec b)$", feedback: "You dropped the $\\vec b\\times\\vec a$ term. Only $\\vec a\\times\\vec a$ and $\\vec b\\times\\vec b$ vanish." },
      ],
      hint: "Expand all four terms in order, drop the self-products, then write b × a as −a × b.",
    },
    {
      type: "quiz",
      id: "va4-2-q10",
      variant: "practice",
      question:
        "A proton ($q = 1.6\\times10^{-19}$ C) moves with $\\vec v = 3\\times10^{5}\\,\\hat j$ m/s through a magnetic field $\\vec B = 0.2\\,\\hat k$ T. Find $\\vec F = q\\,(\\vec v \\times \\vec B)$.",
      options: [
        { text: "$9.6\\times10^{-15}\\,\\hat i$ N", correct: true, feedback: "$\\vec v\\times\\vec B = (3\\times10^5)(0.2)(\\hat j\\times\\hat k) = 6\\times10^4\\,\\hat i$, and $1.6\\times10^{-19}\\times6\\times10^4 = 9.6\\times10^{-15}$." },
        { text: "$-9.6\\times10^{-15}\\,\\hat i$ N", feedback: "That is $q\\,(\\vec B\\times\\vec v)$. The order is velocity first: $\\hat j\\times\\hat k = +\\hat i$." },
        { text: "$9.6\\times10^{-15}\\,\\hat k$ N", feedback: "The force is perpendicular to $\\vec B$, so it cannot point along $\\hat k$." },
        { text: "$\\vec 0$", feedback: "The velocity is perpendicular to the field, so the force is as large as it can be. It is zero only when $\\vec v \\parallel \\vec B$." },
      ],
      hint: "Pull the numbers out and use the cycle for ĵ × k̂.",
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "computing-in-components",
  title: "4.3 · Computing in Components",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "The definition $|\\vec a||\\vec b|\\sin\\theta\\,\\hat n$ is great for understanding and terrible for computing: for $\\vec a = 2\\hat i + 3\\hat j - \\hat k$ you do not know $\\theta$ or $\\hat n$ in advance. The fix is the same trick that gave the component dot product: write both vectors in components, distribute, and let the unit-vector table do the work.",
    },
    {
      type: "text",
      content: "Let $\\vec a = a_1\\hat i + a_2\\hat j + a_3\\hat k$ and $\\vec b = b_1\\hat i + b_2\\hat j + b_3\\hat k$. Distributing gives nine terms:",
    },
    {
      type: "math",
      latex:
        "\\vec a \\times \\vec b = \\sum a_p b_q\\,(\\hat e_p \\times \\hat e_q) \\quad\\text{over all 9 pairs of } \\hat e_p, \\hat e_q \\in \\{\\hat i, \\hat j, \\hat k\\}",
    },
    {
      type: "text",
      content:
        "The three terms with a unit vector crossed with itself vanish. The other six, using the cycle $\\hat i \\to \\hat j \\to \\hat k \\to \\hat i$:",
    },
    {
      type: "table",
      headers: ["Term", "Unit product", "Contribution"],
      rows: [
        ["$a_1 b_2$", "$\\hat i \\times \\hat j = \\hat k$", "$+a_1b_2\\,\\hat k$"],
        ["$a_1 b_3$", "$\\hat i \\times \\hat k = -\\hat j$", "$-a_1b_3\\,\\hat j$"],
        ["$a_2 b_1$", "$\\hat j \\times \\hat i = -\\hat k$", "$-a_2b_1\\,\\hat k$"],
        ["$a_2 b_3$", "$\\hat j \\times \\hat k = \\hat i$", "$+a_2b_3\\,\\hat i$"],
        ["$a_3 b_1$", "$\\hat k \\times \\hat i = \\hat j$", "$+a_3b_1\\,\\hat j$"],
        ["$a_3 b_2$", "$\\hat k \\times \\hat j = -\\hat i$", "$-a_3b_2\\,\\hat i$"],
      ],
    },
    { type: "text", content: "Collect by unit vector:" },
    {
      type: "math",
      latex:
        "\\vec a \\times \\vec b = (a_2b_3 - a_3b_2)\\,\\hat i + (a_3b_1 - a_1b_3)\\,\\hat j + (a_1b_2 - a_2b_1)\\,\\hat k",
    },
    {
      type: "text",
      content:
        "Look at the pattern. The $\\hat i$ component uses only the $y$ and $z$ parts (the two directions other than $x$), in the cyclic order $2,3$ minus $3,2$. The $\\hat j$ component follows the cycle $3,1$ minus $1,3$. The $\\hat k$ component: $1,2$ minus $2,1$. Every component is \"next times next-next, minus the reverse\".",
    },
    {
      type: "text",
      content: "The same formula is produced by expanding a $3\\times3$ determinant along its first row:",
    },
    {
      type: "math",
      latex:
        "\\vec a \\times \\vec b = \\begin{vmatrix} \\hat i & \\hat j & \\hat k \\\\ a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\end{vmatrix}",
    },
    {
      type: "math",
      latex:
        "= \\hat i\\begin{vmatrix} a_2 & a_3 \\\\ b_2 & b_3 \\end{vmatrix} - \\hat j\\begin{vmatrix} a_1 & a_3 \\\\ b_1 & b_3 \\end{vmatrix} + \\hat k\\begin{vmatrix} a_1 & a_2 \\\\ b_1 & b_2 \\end{vmatrix}",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The determinant form",
      content:
        "This is bookkeeping, not a new idea: a determinant with vectors in its top row is not a genuine determinant of numbers. It is a reliable layout for the six terms you just derived, with the unit vectors in row 1, $\\vec a$ in row 2 and $\\vec b$ in row 3 (order matters: swapping rows 2 and 3 flips the sign, just as $\\vec b\\times\\vec a = -\\vec a\\times\\vec b$).",
    },
    {
      type: "text",
      content:
        "The cofactor signs along the first row go $+,\\,-,\\,+$. So the $\\hat j$ term is **minus** $(a_1b_3 - a_3b_1)$, which is the same as $+(a_3b_1 - a_1b_3)$ in the derived formula. Both forms agree; they just put the minus sign in different places.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the middle (j) term has a plus sign\"",
      content:
        "In the determinant expansion the middle cofactor has a **minus** in front: $-\\hat j(a_1b_3 - a_3b_1)$. Writing $+\\hat j(a_1b_3 - a_3b_1)$ is the single most common cross-product error, and it produces a vector that is *not* perpendicular to $\\vec a$ and $\\vec b$. Either keep the $+,-,+$ pattern, or use the cyclic form $(a_3b_1 - a_1b_3)$, which has no extra sign to remember.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Always check your answer",
      content:
        "The result must be perpendicular to both inputs, so $(\\vec a \\times \\vec b)\\cdot\\vec a = 0$ and $(\\vec a \\times \\vec b)\\cdot\\vec b = 0$. Two quick dot products catch nearly every sign slip.",
    },
    {
      type: "text",
      content:
        "**Worked example 1.** $\\vec a = 2\\hat i + 3\\hat j - \\hat k$, $\\vec b = \\hat i - \\hat j + 2\\hat k$.\n\n1. $\\hat i$: $a_2b_3 - a_3b_2 = (3)(2) - (-1)(-1) = 6 - 1 = 5$.\n2. $\\hat j$: $-(a_1b_3 - a_3b_1) = -\\big((2)(2) - (-1)(1)\\big) = -(4 + 1) = -5$.\n3. $\\hat k$: $a_1b_2 - a_2b_1 = (2)(-1) - (3)(1) = -2 - 3 = -5$.\n4. So $\\vec a \\times \\vec b = 5\\hat i - 5\\hat j - 5\\hat k$.\n5. Check: $\\cdot\\,\\vec a = 10 - 15 + 5 = 0$ and $\\cdot\\,\\vec b = 5 + 5 - 10 = 0$. Both zero, so the answer is perpendicular to both.",
    },
    {
      type: "text",
      content:
        "**Worked example 2.** $\\vec a = \\hat i + 2\\hat j + 3\\hat k$, $\\vec b = 4\\hat i + 5\\hat j + 6\\hat k$.\n\n1. $\\hat i$: $(2)(6) - (3)(5) = 12 - 15 = -3$.\n2. $\\hat j$: $-\\big((1)(6) - (3)(4)\\big) = -(6 - 12) = 6$.\n3. $\\hat k$: $(1)(5) - (2)(4) = 5 - 8 = -3$.\n4. So $\\vec a \\times \\vec b = -3\\hat i + 6\\hat j - 3\\hat k$.\n5. Check: $\\cdot\\,\\vec a = -3 + 12 - 9 = 0$ and $\\cdot\\,\\vec b = -12 + 30 - 18 = 0$.\n\nNotice the $\\hat j$ term: the inner bracket was $-6$, and the minus sign in front turned it into $+6$. With the wrong sign you would get $-6$, and the check $\\cdot\\,\\vec a = -3 - 12 - 9 = -24$ would fail loudly.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (missing components).** $\\vec a = 3\\hat i - \\hat k$, $\\vec b = \\hat j + 2\\hat k$. Write the zeros in explicitly: $\\vec a = (3, 0, -1)$, $\\vec b = (0, 1, 2)$.\n\n1. $\\hat i$: $(0)(2) - (-1)(1) = 1$.\n2. $\\hat j$: $-\\big((3)(2) - (-1)(0)\\big) = -6$.\n3. $\\hat k$: $(3)(1) - (0)(0) = 3$.\n4. So $\\vec a \\times \\vec b = \\hat i - 6\\hat j + 3\\hat k$.\n5. Check: $\\cdot\\,\\vec a = 3 + 0 - 3 = 0$ and $\\cdot\\,\\vec b = 0 - 6 + 6 = 0$.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (a spinning turntable).** A body spinning with angular velocity $\\vec\\omega$ moves each of its points with velocity $\\vec v = \\vec\\omega\\times\\vec r$. A turntable spins about the vertical axis with $\\vec\\omega = 2\\hat k$ rad/s. Find the velocity of a point at $\\vec r = 3\\hat i + 4\\hat j + \\hat k$ m.\n\n1. Write both as triples: $\\vec\\omega = (0, 0, 2)$, $\\vec r = (3, 4, 1)$. *Why:* the zeros are easy to lose if you do not write them.\n2. $\\hat i$: $(0)(1) - (2)(4) = -8$.\n3. $\\hat j$: $-\\big((0)(1) - (2)(3)\\big) = -(-6) = 6$.\n4. $\\hat k$: $(0)(4) - (0)(3) = 0$.\n5. So $\\vec v = -8\\hat i + 6\\hat j$ m/s, with speed $\\sqrt{64 + 36} = 10$ m/s.\n6. **Physics check.** The point is $\\sqrt{3^2 + 4^2} = 5$ m from the axis, and a point turning at $2$ rad/s at radius 5 m moves at $2 \\times 5 = 10$ m/s. The formula agrees. The height $z = 1$ does not matter, and $v_z = 0$ because the turntable spins flat. *Why this check:* the cross product only sees the part of $\\vec r$ perpendicular to $\\vec\\omega$, which is exactly the distance from the axis.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (JEE/CBSE: find the vector).** $\\vec a = \\hat i + \\hat j + \\hat k$. Find $\\vec b$ with $\\vec a\\times\\vec b = \\hat j - \\hat k$ and $\\vec a\\cdot\\vec b = 3$.\n\n1. **Unknowns.** Let $\\vec b = (x, y, z)$. *Why:* three unknown components need three independent equations.\n2. **Cross product in components.** $\\vec a\\times\\vec b = \\big((1)z - (1)y,\\ (1)x - (1)z,\\ (1)y - (1)x\\big) = (z - y,\\ x - z,\\ y - x)$.\n3. **Match with $(0, 1, -1)$.** $z - y = 0$, $x - z = 1$, $y - x = -1$. These give only two independent facts: $z = y$ and $x = y + 1$. *Why only two:* $\\vec a\\times\\vec b$ cannot see the part of $\\vec b$ along $\\vec a$ (the cancellation misconception from 4.2), so one more equation is needed.\n4. **Use the dot product.** $x + y + z = (y + 1) + y + y = 3y + 1 = 3$, so $y = \\frac23$.\n5. **Answer.** $\\vec b = \\frac13(5\\hat i + 2\\hat j + 2\\hat k)$.\n6. **Check.** $\\vec a\\times\\vec b = \\big(\\frac23 - \\frac23,\\ \\frac53 - \\frac23,\\ \\frac23 - \\frac53\\big) = (0, 1, -1)$ and $\\vec a\\cdot\\vec b = \\frac{5 + 2 + 2}{3} = 3$. Both hold.\n\nA consistency test first: a given $\\vec a\\times\\vec b$ must be perpendicular to $\\vec a$. Here $(1,1,1)\\cdot(0,1,-1) = 0$, so a solution can exist. If that dot product were not 0, no $\\vec b$ would work.",
    },
    {
      type: "interactive",
      config: {
        component: "vec-space-3d",
        mode: "cross",
        a: [2, 3, -1],
        b: [1, -1, 2],
        sliders: [
          { name: "ax", min: -3, max: 3, step: 1, initial: 2 },
          { name: "ay", min: -3, max: 3, step: 1, initial: 3 },
          { name: "az", min: -3, max: 3, step: 1, initial: -1 },
        ],
        readouts: ["cross", "area"],
        caption:
          "This starts at worked example 1. Change the components of a, predict the cross product with the formula, then compare with the readout.",
      },
    },
    {
      type: "quiz",
      id: "va4-3-q1",
      variant: "practice",
      question: "Compute $(\\hat i + \\hat j) \\times (\\hat j + \\hat k)$.",
      options: [
        { text: "$\\hat i - \\hat j + \\hat k$", correct: true, feedback: "$\\hat i$: $1\\cdot1 - 0\\cdot1 = 1$; $\\hat j$: $-(1\\cdot1 - 0\\cdot0) = -1$; $\\hat k$: $1\\cdot1 - 1\\cdot0 = 1$. Check: dot with $(1,1,0)$ gives $1 - 1 = 0$." },
        { text: "$\\hat i + \\hat j + \\hat k$", feedback: "That is the plus-sign-on-$\\hat j$ error. Dot it with $\\hat i + \\hat j$: you get 2, not 0, so it cannot be perpendicular." },
        { text: "$-\\hat i + \\hat j - \\hat k$", feedback: "That is $(\\hat j + \\hat k) \\times (\\hat i + \\hat j)$, the reversed order." },
        { text: "$\\hat j$", feedback: "$\\hat j$ is shared by both inputs, so it cannot be perpendicular to them: $\\hat j\\cdot(\\hat i + \\hat j) = 1$. Distribute all four terms." },
      ],
      hint: "Write the vectors as (1, 1, 0) and (0, 1, 1) and use the determinant with signs +, −, +.",
    },
    {
      type: "quiz",
      id: "va4-3-q2",
      variant: "practice",
      question: "Find $\\vec a \\times \\vec b$ for $\\vec a = 2\\hat i + \\hat k$ and $\\vec b = \\hat i + 3\\hat j$.",
      options: [
        { text: "$-3\\hat i + \\hat j + 6\\hat k$", correct: true, feedback: "$(0\\cdot0 - 1\\cdot3,\\ 1\\cdot1 - 2\\cdot0,\\ 2\\cdot3 - 0\\cdot1) = (-3, 1, 6)$. Check: $\\cdot\\,\\vec a = -6 + 6 = 0$, $\\cdot\\,\\vec b = -3 + 3 = 0$." },
        { text: "$-3\\hat i - \\hat j + 6\\hat k$", feedback: "Sign slip in the $\\hat j$ term. Dot with $\\vec b = (1,3,0)$: $-3 - 3 = -6 \\ne 0$." },
        { text: "$3\\hat i - \\hat j - 6\\hat k$", feedback: "That is $\\vec b \\times \\vec a$." },
        { text: "$2\\hat i + 0\\hat j + 0\\hat k$", feedback: "Multiplying matching components is the dot-product habit. The cross product pairs *different* components." },
      ],
    },
    {
      type: "quiz",
      id: "va4-3-q3",
      variant: "practice",
      question: "Evaluate $(\\hat i + \\hat j) \\times (\\hat i - \\hat j)$.",
      options: [
        { text: "$-2\\hat k$", correct: true, feedback: "$\\hat i\\times\\hat i - \\hat i\\times\\hat j + \\hat j\\times\\hat i - \\hat j\\times\\hat j = -\\hat k - \\hat k$." },
        { text: "$2\\hat k$", feedback: "Check the order: $-\\hat i\\times\\hat j = -\\hat k$ and $\\hat j\\times\\hat i = -\\hat k$. Both are negative." },
        { text: "$\\vec 0$", feedback: "The two vectors are perpendicular, so their cross product is as large as it can be, not zero." },
        { text: "$0$", feedback: "That is the dot product: $1 - 1 = 0$. The cross product is a vector." },
      ],
    },
    {
      type: "quiz",
      id: "va4-3-q4",
      variant: "concept",
      question:
        "For $\\vec a = \\hat i + 2\\hat j$ and $\\vec b = \\hat j + 3\\hat k$, a student gets $\\vec a \\times \\vec b = 6\\hat i + 3\\hat j + \\hat k$. What does the perpendicularity check say?",
      options: [
        {
          text: "It is wrong: dotting with $\\vec a$ gives $6 + 6 = 12$, not 0. The correct answer is $6\\hat i - 3\\hat j + \\hat k$.",
          correct: true,
          feedback: "The $\\hat j$ term should be $-(1\\cdot3 - 0\\cdot0) = -3$. With it, $\\cdot\\,\\vec a = 6 - 6 = 0$ and $\\cdot\\,\\vec b = -3 + 3 = 0$.",
        },
        {
          text: "It is right, because every component is non-zero.",
          feedback: "Having non-zero components says nothing about correctness. Only the dot-product check does.",
        },
        {
          text: "It is right, because dotting with $\\vec b$ gives $3 + 3 = 6$, which is positive.",
          feedback: "A correct cross product dotted with either input gives exactly 0, not a positive number.",
        },
      ],
    },
    {
      type: "quiz",
      id: "va4-3-q5",
      variant: "practice",
      question: "For $\\vec a = (1, 2, 3)$ and $\\vec b = (2, 4, 6)$, what is $\\vec a \\times \\vec b$, and why?",
      options: [
        { text: "$\\vec 0$, because $\\vec b = 2\\vec a$ and parallel vectors span no area.", correct: true, feedback: "The formula agrees: $(2\\cdot6 - 3\\cdot4,\\ 3\\cdot2 - 1\\cdot6,\\ 1\\cdot4 - 2\\cdot2) = (0,0,0)$." },
        { text: "$28$, the sum of the products of components.", feedback: "$2 + 8 + 18 = 28$ is the dot product." },
        { text: "$(2, 8, 18)$", feedback: "Multiplying component by component is not a vector product." },
      ],
    },
    {
      type: "quiz",
      id: "va4-3-q6",
      variant: "practice",
      question:
        "A disc spins with $\\vec\\omega = 3\\hat k$ rad/s. Find the velocity $\\vec v = \\vec\\omega\\times\\vec r$ of the point at $\\vec r = \\hat i + 2\\hat j + 5\\hat k$ m.",
      options: [
        { text: "$-6\\hat i + 3\\hat j$ m/s", correct: true, feedback: "$(0,0,3)\\times(1,2,5) = \\big(0\\cdot5 - 3\\cdot2,\\ 3\\cdot1 - 0\\cdot5,\\ 0\\cdot2 - 0\\cdot1\\big) = (-6, 3, 0)$. Speed $3\\sqrt5$ = $3$ rad/s times the distance $\\sqrt5$ from the axis." },
        { text: "$6\\hat i - 3\\hat j$ m/s", feedback: "That is $\\vec r\\times\\vec\\omega$. The formula is $\\vec\\omega\\times\\vec r$, and reversing the order reverses the spin." },
        { text: "$-6\\hat i - 3\\hat j$ m/s", feedback: "Sign slip in the $\\hat j$ term. Check: $(-6,-3,0)\\cdot(1,2,5) = -12 \\neq 0$, so it is not perpendicular to $\\vec r$." },
        { text: "$3\\hat i + 6\\hat j + 15\\hat k$ m/s", feedback: "That is $3\\vec r$, a scalar multiple. A point on a spinning disc moves sideways, perpendicular to both the axis and $\\vec r$." },
      ],
      hint: "Write ω = (0, 0, 3). The velocity of a flat spin has no k̂ part.",
    },
    {
      type: "quiz",
      id: "va4-3-q7",
      variant: "practice",
      question:
        "$\\vec a = \\hat i + \\hat j + \\hat k$. Which $\\vec b$ satisfies both $\\vec a\\times\\vec b = \\hat i - \\hat j$ and $\\vec a\\cdot\\vec b = 3$?",
      options: [
        { text: "$\\frac13(2\\hat i + 2\\hat j + 5\\hat k)$", correct: true, feedback: "$\\vec a\\times\\vec b = (z - y,\\ x - z,\\ y - x)$. Matching $(1, -1, 0)$ gives $y = x$, $z = x + 1$, and then $3x + 1 = 3$ gives $x = \\frac23$." },
        { text: "$\\frac13(5\\hat i + 2\\hat j + 2\\hat k)$", feedback: "The dot product is 3, but its cross product with $\\vec a$ is $\\hat j - \\hat k$ (Worked example 5), not $\\hat i - \\hat j$." },
        { text: "$\\hat i + \\hat j + \\hat k$", feedback: "$\\vec a\\cdot\\vec a = 3$, but $\\vec a\\times\\vec a = \\vec 0$, not $\\hat i - \\hat j$." },
        { text: "$-\\hat i - \\hat j + 5\\hat k$", feedback: "The dot product is 3, but $\\vec a\\times\\vec b = (6, -6, 0)$, six times too big. Both conditions must hold." },
      ],
      hint: "Let b = (x, y, z). Then a × b = (z − y, x − z, y − x). Match components, then use a·b.",
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "areas-of-parallelograms-and-triangles",
  title: "4.4 · Areas of Parallelograms and Triangles",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "The length of $\\vec a \\times \\vec b$ was built to be an area. That turns every area problem in 3D, where you cannot easily draw a base and height, into a mechanical computation.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Area formulas",
      content:
        "**Parallelogram** with adjacent sides $\\vec a$, $\\vec b$: $\\text{Area} = |\\vec a \\times \\vec b|$.\n\n**Triangle** with two sides $\\vec a$, $\\vec b$ from a common vertex: $\\text{Area} = \\tfrac12|\\vec a \\times \\vec b|$.\n\n**Triangle** with vertices $A$, $B$, $C$: $\\text{Area} = \\tfrac12\\,\\big|\\overrightarrow{AB} \\times \\overrightarrow{AC}\\big|$.",
    },
    {
      type: "text",
      content:
        "The triangle is half the parallelogram: a diagonal cuts a parallelogram into two congruent triangles. The vertex version just builds the two sides from a common corner $A$. Any corner works; $\\overrightarrow{BA} \\times \\overrightarrow{BC}$ gives the same length.",
    },
    {
      type: "interactive",
      config: {
        component: "vec-space-3d",
        mode: "cross",
        a: [1, 2, 2],
        b: [2, 1, -2],
        sliders: [
          { name: "ax", min: -3, max: 3, step: 1, initial: 1 },
          { name: "az", min: -3, max: 3, step: 1, initial: 2 },
        ],
        readouts: ["cross", "area"],
        caption:
          "The shaded parallelogram's area is the length of the normal arrow. The readout also shows the triangle, which is half. Change a and watch both update together.",
      },
    },
    {
      type: "text",
      content:
        "**Worked example 1 (parallelogram from sides).** Sides $\\vec a = \\hat i + 2\\hat j + 2\\hat k$ and $\\vec b = 2\\hat i + \\hat j - 2\\hat k$.\n\n1. $\\hat i$: $(2)(-2) - (2)(1) = -6$. $\\hat j$: $-\\big((1)(-2) - (2)(2)\\big) = 6$. $\\hat k$: $(1)(1) - (2)(2) = -3$.\n2. $\\vec a \\times \\vec b = -6\\hat i + 6\\hat j - 3\\hat k$ (check: $\\cdot\\,\\vec a = -6 + 12 - 6 = 0$).\n3. Area $= \\sqrt{36 + 36 + 9} = \\sqrt{81} = 9$.\n\nThis is the starting picture in the interactive above.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (triangle from vertices).** $A(1, 1, 2)$, $B(2, 3, 5)$, $C(1, 5, 5)$.\n\n1. $\\overrightarrow{AB} = (1, 2, 3)$, $\\overrightarrow{AC} = (0, 4, 3)$.\n2. $\\hat i$: $(2)(3) - (3)(4) = -6$. $\\hat j$: $-\\big((1)(3) - (3)(0)\\big) = -3$. $\\hat k$: $(1)(4) - (2)(0) = 4$.\n3. $\\overrightarrow{AB} \\times \\overrightarrow{AC} = (-6, -3, 4)$, with length $\\sqrt{36 + 9 + 16} = \\sqrt{61}$.\n4. Area $= \\tfrac12\\sqrt{61}$.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (a shade sail).** A triangular shade sail over a school courtyard is tied at $A(1, 0, 3)$, $B(5, 0, 3)$ and $C(1, 3, 9)$, in metres. The fabric costs ₹250 per m². Roughly how much fabric money is needed?\n\n1. **Sides from one corner.** $\\overrightarrow{AB} = (4, 0, 0)$, $\\overrightarrow{AC} = (0, 3, 6)$. *Why:* the sail is tilted in 3D, so there is no easy base and height to measure. Two sides from a common corner are all the cross product needs.\n2. **Cross.** $\\hat i$: $(0)(6) - (0)(3) = 0$. $\\hat j$: $-\\big((4)(6) - (0)(0)\\big) = -24$. $\\hat k$: $(4)(3) - (0)(0) = 12$. So $\\overrightarrow{AB}\\times\\overrightarrow{AC} = (0, -24, 12)$.\n3. **Length.** $\\sqrt{0 + 576 + 144} = \\sqrt{720} = 12\\sqrt5$.\n4. **Halve for the triangle.** Area $= 6\\sqrt5 \\approx 13.42$ m².\n5. **Cost.** $13.42 \\times 250 \\approx$ ₹3354.\n6. **Cross-check.** $\\overrightarrow{AB}\\cdot\\overrightarrow{AC} = 0$, so the corner at $A$ is a right angle and the area is $\\tfrac12 \\cdot 4 \\cdot |\\overrightarrow{AC}| = \\tfrac12\\cdot4\\cdot3\\sqrt5 = 6\\sqrt5$. It agrees. Measuring only the sail's shadow on the ground, $\\tfrac12\\cdot4\\cdot3 = 6$ m², would badly underestimate the fabric, because the sail rises steeply toward $C$.",
    },
    {
      type: "text",
      content:
        "**Parallelogram from its diagonals.** Sometimes you are given the diagonals instead of the sides. With sides $\\vec a$, $\\vec b$, the diagonals are $\\vec d_1 = \\vec a + \\vec b$ and $\\vec d_2 = \\vec b - \\vec a$. Cross them and expand, keeping the order:",
    },
    {
      type: "math",
      latex:
        "\\vec d_1 \\times \\vec d_2 = (\\vec a + \\vec b) \\times (\\vec b - \\vec a) = \\vec a\\times\\vec b - \\underbrace{\\vec a\\times\\vec a}_{\\vec 0} + \\underbrace{\\vec b\\times\\vec b}_{\\vec 0} - \\vec b\\times\\vec a = 2\\,(\\vec a \\times \\vec b)",
    },
    {
      type: "math",
      latex: "\\text{Area} = |\\vec a \\times \\vec b| = \\tfrac12\\,|\\vec d_1 \\times \\vec d_2|",
    },
    {
      type: "text",
      content:
        "A sanity check in the plane: a rhombus with perpendicular diagonals of lengths $p$ and $q$ has area $\\tfrac12 pq$ (the familiar school formula). Here $|\\vec d_1 \\times \\vec d_2| = pq\\sin 90^\\circ = pq$, and the half gives $\\tfrac12 pq$. They agree.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"area from diagonals is |d₁ × d₂|\"",
      content:
        "The half is not optional. The diagonals' cross product is **twice** $\\vec a \\times \\vec b$, as the expansion shows. Forgetting the $\\tfrac12$ doubles the area. Remember which formula has the half by the derivation, not by rote: sides give $|\\vec a\\times\\vec b|$ directly; diagonals give $2(\\vec a\\times\\vec b)$, so you halve.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (from diagonals).** $\\vec d_1 = 3\\hat i + \\hat j - 2\\hat k$, $\\vec d_2 = \\hat i - 3\\hat j + 4\\hat k$.\n\n1. $\\hat i$: $(1)(4) - (-2)(-3) = 4 - 6 = -2$.\n2. $\\hat j$: $-\\big((3)(4) - (-2)(1)\\big) = -(12 + 2) = -14$.\n3. $\\hat k$: $(3)(-3) - (1)(1) = -10$.\n4. $|\\vec d_1 \\times \\vec d_2| = \\sqrt{4 + 196 + 100} = \\sqrt{300} = 10\\sqrt3$.\n5. Area $= \\tfrac12 \\cdot 10\\sqrt3 = 5\\sqrt3$.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (JEE style: sides built from other vectors).** $\\vec a$ and $\\vec b$ are unit vectors at $30^\\circ$ to each other. Find the area of the parallelogram with adjacent sides $\\vec p = \\vec a + 2\\vec b$ and $\\vec q = 2\\vec a + \\vec b$.\n\n1. **Area is $|\\vec p\\times\\vec q|$.** *Why:* we are given sides, so no half is needed.\n2. **Expand in order.** $\\vec p\\times\\vec q = 2\\,\\vec a\\times\\vec a + \\vec a\\times\\vec b + 4\\,\\vec b\\times\\vec a + 2\\,\\vec b\\times\\vec b$.\n3. **Simplify.** Self-products vanish and $4\\,\\vec b\\times\\vec a = -4\\,\\vec a\\times\\vec b$, so $\\vec p\\times\\vec q = -3\\,(\\vec a\\times\\vec b)$. (Coefficient check: $\\begin{vmatrix}1 & 2\\\\ 2 & 1\\end{vmatrix} = 1 - 4 = -3$.)\n4. **Size of $\\vec a\\times\\vec b$.** $1\\cdot1\\cdot\\sin30^\\circ = \\frac12$.\n5. **Area.** $|-3| \\cdot \\frac12 = \\frac32$. *Why the absolute value:* the minus sign only says the new parallelogram faces the other way; area is a length and cannot be negative.",
    },
    {
      type: "text",
      content:
        "**Worked example 6 (triangle from position vectors).** Let $A$, $B$, $C$ have position vectors $\\vec a$, $\\vec b$, $\\vec c$. Show that the area of triangle $ABC$ is $\\tfrac12|\\vec a\\times\\vec b + \\vec b\\times\\vec c + \\vec c\\times\\vec a|$.\n\n1. Start from the vertex formula: $\\overrightarrow{AB}\\times\\overrightarrow{AC} = (\\vec b - \\vec a)\\times(\\vec c - \\vec a)$.\n2. Distribute, keeping the order: $\\vec b\\times\\vec c - \\vec b\\times\\vec a - \\vec a\\times\\vec c + \\vec a\\times\\vec a$.\n3. $\\vec a\\times\\vec a = \\vec 0$; $-\\vec b\\times\\vec a = \\vec a\\times\\vec b$; $-\\vec a\\times\\vec c = \\vec c\\times\\vec a$.\n4. So $\\overrightarrow{AB}\\times\\overrightarrow{AC} = \\vec a\\times\\vec b + \\vec b\\times\\vec c + \\vec c\\times\\vec a$, and the area is half its length.\n\nThe cyclic pattern $a\\to b\\to c\\to a$ is easy to remember, and it gives a collinearity test straight from position vectors: $A$, $B$, $C$ are collinear exactly when $\\vec a\\times\\vec b + \\vec b\\times\\vec c + \\vec c\\times\\vec a = \\vec 0$.",
    },
    {
      type: "text",
      content:
        "**Collinearity as zero area.** Three points $A$, $B$, $C$ lie on one line exactly when the triangle they form is flat, i.e. has zero area:",
    },
    { type: "math", latex: "A, B, C \\text{ collinear} \\iff \\overrightarrow{AB} \\times \\overrightarrow{AC} = \\vec 0" },
    {
      type: "text",
      content:
        "**Worked example 7.** Are $A(2, -1, 3)$, $B(3, 1, 2)$, $C(5, 5, 0)$ collinear?\n\n1. $\\overrightarrow{AB} = (1, 2, -1)$, $\\overrightarrow{AC} = (3, 6, -3)$.\n2. $\\overrightarrow{AC} = 3\\,\\overrightarrow{AB}$, so the cross product is $\\vec 0$ (the formula agrees: $(2\\cdot(-3) - (-1)\\cdot6,\\ (-1)\\cdot3 - 1\\cdot(-3),\\ 1\\cdot6 - 2\\cdot3) = (0, 0, 0)$).\n3. Zero area, so yes: the three points are collinear.",
    },
    {
      type: "table",
      headers: ["You are given", "Area of", "Formula"],
      rows: [
        ["Adjacent sides $\\vec a$, $\\vec b$", "Parallelogram", "$|\\vec a \\times \\vec b|$"],
        ["Adjacent sides $\\vec a$, $\\vec b$", "Triangle", "$\\tfrac12|\\vec a \\times \\vec b|$"],
        ["Vertices $A$, $B$, $C$", "Triangle", "$\\tfrac12|\\overrightarrow{AB} \\times \\overrightarrow{AC}|$"],
        ["Position vectors $\\vec a$, $\\vec b$, $\\vec c$", "Triangle", "$\\tfrac12|\\vec a\\times\\vec b + \\vec b\\times\\vec c + \\vec c\\times\\vec a|$"],
        ["Diagonals $\\vec d_1$, $\\vec d_2$", "Parallelogram", "$\\tfrac12|\\vec d_1 \\times \\vec d_2|$"],
      ],
    },
    {
      type: "quiz",
      id: "va4-4-q1",
      variant: "practice",
      question: "Find the area of the parallelogram with adjacent sides $\\vec a = \\hat i + \\hat j + \\hat k$ and $\\vec b = \\hat i - \\hat j$.",
      options: [
        { text: "$\\sqrt6$", correct: true, feedback: "$\\vec a \\times \\vec b = (1\\cdot0 - 1\\cdot(-1),\\ 1\\cdot1 - 1\\cdot0,\\ 1\\cdot(-1) - 1\\cdot1) = (1, 1, -2)$, length $\\sqrt{1 + 1 + 4} = \\sqrt6$." },
        { text: "$\\dfrac{\\sqrt6}{2}$", feedback: "That is the triangle. A parallelogram with these sides has the full $|\\vec a\\times\\vec b|$." },
        { text: "$0$", feedback: "That is $\\vec a \\cdot \\vec b = 1 - 1 + 0$, the dot product. The vectors are perpendicular, not parallel." },
        { text: "$\\sqrt6 \\cdot \\sqrt2$", feedback: "$|\\vec a||\\vec b| = \\sqrt3\\cdot\\sqrt2 = \\sqrt6$ already, since the angle is $90^\\circ$. Multiplying again double-counts." },
      ],
    },
    {
      type: "quiz",
      id: "va4-4-q2",
      variant: "practice",
      question: "Find the area of the triangle with vertices $O(0,0,0)$, $P(2,0,0)$ and $Q(0,3,0)$.",
      options: [
        { text: "$3$", correct: true, feedback: "$\\tfrac12|(2,0,0)\\times(0,3,0)| = \\tfrac12|(0,0,6)| = 3$. It matches $\\tfrac12 \\cdot 2 \\cdot 3$ for a right triangle." },
        { text: "$6$", feedback: "That is the parallelogram. A triangle is half." },
        { text: "$\\sqrt{13}$", feedback: "That is the length of the side $PQ$, not an area." },
      ],
    },
    {
      type: "quiz",
      id: "va4-4-q3",
      variant: "concept",
      question: "The diagonals of a parallelogram are $\\vec d_1 = 2\\hat i$ and $\\vec d_2 = 4\\hat j$. What is its area?",
      options: [
        { text: "$4$", correct: true, feedback: "$\\tfrac12|\\vec d_1\\times\\vec d_2| = \\tfrac12|8\\hat k| = 4$. It is a rhombus with diagonals 2 and 4, and $\\tfrac12\\cdot2\\cdot4 = 4$ agrees." },
        { text: "$8$", feedback: "That forgets the half. The diagonals' cross product is twice the sides' cross product." },
        { text: "$2$", feedback: "That halves twice. Only one factor of $\\tfrac12$ appears." },
        { text: "$16$", feedback: "Area uses the cross product's length, $|2\\hat i \\times 4\\hat j| = 8$, and then halves it." },
      ],
    },
    {
      type: "quiz",
      id: "va4-4-q4",
      variant: "practice",
      question: "For which $\\lambda$ are $A(1, 2, 3)$, $B(2, 4, \\lambda)$ and $C(3, 6, 7)$ collinear?",
      options: [
        { text: "$\\lambda = 5$", correct: true, feedback: "$\\overrightarrow{AB} = (1, 2, \\lambda - 3)$ must be parallel to $\\overrightarrow{AC} = (2, 4, 4)$, so $\\lambda - 3 = 2$. Then $\\overrightarrow{AB}\\times\\overrightarrow{AC} = \\vec 0$." },
        { text: "$\\lambda = 7$", feedback: "Then $\\overrightarrow{AB} = (1, 2, 4)$, which is not a multiple of $(2, 4, 4)$." },
        { text: "$\\lambda = 3$", feedback: "Then $\\overrightarrow{AB} = (1, 2, 0)$, not parallel to $(2, 4, 4)$." },
        { text: "No value works.", feedback: "The $x$ and $y$ parts of $\\overrightarrow{AC}$ are already twice those of $\\overrightarrow{AB}$, so choose $\\lambda$ to match $z$." },
      ],
      hint: "Collinear means AB × AC = 0, which means AC is a multiple of AB.",
    },
    {
      type: "quiz",
      id: "va4-4-q5",
      variant: "concept",
      question: "Why is the area of triangle $ABC$ equal to $\\tfrac12|\\overrightarrow{AB}\\times\\overrightarrow{AC}|$ and not $|\\overrightarrow{AB}\\times\\overrightarrow{AC}|$?",
      options: [
        { text: "$|\\overrightarrow{AB}\\times\\overrightarrow{AC}|$ is the area of the parallelogram on those sides, and a diagonal splits it into two equal triangles.", correct: true, feedback: "Exactly. The half is geometry, not a convention." },
        { text: "Because the cross product double-counts every vector.", feedback: "The cross product's length is exactly the parallelogram area; nothing is double-counted." },
        { text: "Because $\\sin\\theta \\le \\tfrac12$ inside a triangle.", feedback: "Triangle angles can have $\\sin\\theta$ up to 1. The half comes from the shape, not the angle." },
      ],
    },
    {
      type: "quiz",
      id: "va4-4-q6",
      variant: "practice",
      question:
        "Points $A$, $B$, $C$ have position vectors $\\vec a$, $\\vec b$, $\\vec c$ with $\\vec a\\times\\vec b = \\hat k$, $\\vec b\\times\\vec c = 2\\hat i$ and $\\vec c\\times\\vec a = 2\\hat j + \\hat k$. Find the area of triangle $ABC$.",
      options: [
        { text: "$\\sqrt3$", correct: true, feedback: "Sum: $2\\hat i + 2\\hat j + 2\\hat k$, length $2\\sqrt3$. Half of that is $\\sqrt3$." },
        { text: "$2\\sqrt3$", feedback: "That is the parallelogram. The triangle takes half of $|\\vec a\\times\\vec b + \\vec b\\times\\vec c + \\vec c\\times\\vec a|$." },
        { text: "$\\dfrac{1 + 2 + \\sqrt5}{2}$", feedback: "That adds the lengths of the three cross products. Add the vectors first, then take one length." },
        { text: "$\\dfrac12$", feedback: "That uses only $\\vec a\\times\\vec b$, the area of triangle $OAB$ (with the origin), not triangle $ABC$." },
      ],
      hint: "Area = ½|a×b + b×c + c×a|. Add the three vectors, then take the length.",
    },
    {
      type: "quiz",
      id: "va4-4-q7",
      variant: "practice",
      question:
        "A triangular roof panel has corners $A(0, 0, 0)$, $B(6, 0, 0)$ and $C(0, 4, 3)$, in metres. What is its area?",
      options: [
        { text: "$15$ m²", correct: true, feedback: "$\\overrightarrow{AB}\\times\\overrightarrow{AC} = (6,0,0)\\times(0,4,3) = (0, -18, 24)$, length $\\sqrt{324 + 576} = 30$, and the triangle is half." },
        { text: "$30$ m²", feedback: "That is the parallelogram on $\\overrightarrow{AB}$ and $\\overrightarrow{AC}$. A triangle takes half." },
        { text: "$12$ m²", feedback: "That is $\\tfrac12\\cdot6\\cdot4$, the area of the roof's shadow on the floor. The panel slopes up to height 3, so it is bigger than its shadow." },
        { text: "$9$ m²", feedback: "That is $\\tfrac12\\cdot6\\cdot3$, which uses the height of $C$ instead of the full slant side. Use the cross product." },
      ],
      hint: "Area = ½|AB × AC|.",
    },
    {
      type: "quiz",
      id: "va4-4-q8",
      variant: "practice",
      question:
        "$|\\vec a| = 2$, $|\\vec b| = 3$ and the angle between them is $30^\\circ$. Find the area of the parallelogram with adjacent sides $2\\vec a + \\vec b$ and $\\vec a - \\vec b$.",
      options: [
        { text: "$9$", correct: true, feedback: "$(2\\vec a + \\vec b)\\times(\\vec a - \\vec b) = -2\\,\\vec a\\times\\vec b + \\vec b\\times\\vec a = -3\\,\\vec a\\times\\vec b$, and $|\\vec a\\times\\vec b| = 2\\cdot3\\cdot\\frac12 = 3$. So the area is $3 \\times 3 = 9$." },
        { text: "$3$", feedback: "That treats $\\vec b\\times\\vec a$ as $+\\vec a\\times\\vec b$, giving $-2 + 1 = -1$. It is $-\\vec a\\times\\vec b$, so the multiple is $-3$." },
        { text: "$9\\sqrt3$", feedback: "That uses $\\cos30^\\circ$. The cross product's length uses $\\sin30^\\circ = \\frac12$." },
        { text: "$\\dfrac92$", feedback: "That halves, as for a triangle. Sides of a parallelogram give the full $|\\vec p\\times\\vec q|$." },
      ],
      hint: "Expand the product to a multiple of a × b, then use |a × b| = |a||b| sin θ.",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "normals-sines-and-torque",
  title: "4.5 · Normals, Sines and Torque",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "The cross product has two halves, a length and a direction. This lesson uses each half on its own: the direction gives **normals**, the length gives **sines**, and the whole vector gives **torque**.",
    },
    {
      type: "text",
      content:
        "**Unit normals.** $\\vec a \\times \\vec b$ is perpendicular to both $\\vec a$ and $\\vec b$. Divide by its length to make it a unit vector. But the line perpendicular to a plane has two directions, and $-\\vec a\\times\\vec b = \\vec b \\times \\vec a$ is just as perpendicular. So there are always two answers:",
    },
    {
      type: "math",
      latex: "\\hat n = \\pm\\,\\frac{\\vec a \\times \\vec b}{|\\vec a \\times \\vec b|}",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"there is only one unit vector perpendicular to both\"",
      content:
        "A plane has two faces. Stand on the floor: straight up and straight down are both perpendicular to it. When a question asks for \"a unit vector perpendicular to both $\\vec a$ and $\\vec b$\", both $\\pm\\frac{\\vec a\\times\\vec b}{|\\vec a\\times\\vec b|}$ are correct; when it asks for \"the unit vectors\", give both. Only a stated orientation (\"with the right-hand rule from $\\vec a$ to $\\vec b$\") picks one.",
    },
    {
      type: "text",
      content:
        "**Worked example 1.** $\\vec a = 3\\hat i + 2\\hat j + 2\\hat k$, $\\vec b = \\hat i + 2\\hat j - 2\\hat k$. Find the unit vectors perpendicular to both $\\vec a + \\vec b$ and $\\vec a - \\vec b$.\n\n1. $\\vec a + \\vec b = (4, 4, 0)$, $\\vec a - \\vec b = (2, 0, 4)$.\n2. Cross: $\\hat i$: $(4)(4) - (0)(0) = 16$. $\\hat j$: $-\\big((4)(4) - (0)(2)\\big) = -16$. $\\hat k$: $(4)(0) - (4)(2) = -8$. So $(16, -16, -8)$.\n3. Length: $\\sqrt{256 + 256 + 64} = \\sqrt{576} = 24$.\n4. Unit normals: $\\pm\\frac{1}{24}(16, -16, -8) = \\pm\\frac13(2\\hat i - 2\\hat j - \\hat k)$.\n5. Check: $(2, -2, -1)\\cdot(4, 4, 0) = 0$ and $(2, -2, -1)\\cdot(2, 0, 4) = 4 - 4 = 0$.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (a vector of given length).** Find the vectors of magnitude 6 perpendicular to both $\\vec a = 2\\hat i - 2\\hat j + \\hat k$ and $\\vec b = \\hat i + 2\\hat j + 2\\hat k$.\n\n1. $\\hat i$: $(-2)(2) - (1)(2) = -6$. $\\hat j$: $-\\big((2)(2) - (1)(1)\\big) = -3$. $\\hat k$: $(2)(2) - (-2)(1) = 6$. So $\\vec a\\times\\vec b = (-6, -3, 6)$.\n2. Check: $\\cdot\\,\\vec a = -12 + 6 + 6 = 0$ and $\\cdot\\,\\vec b = -6 - 6 + 12 = 0$.\n3. Length $\\sqrt{36 + 9 + 36} = 9$, so the unit normals are $\\pm\\frac19(-6, -3, 6) = \\pm\\frac13(-2, -1, 2)$.\n4. Scale by 6: $\\pm 2(-2, -1, 2) = \\pm(-4\\hat i - 2\\hat j + 4\\hat k)$.\n\nThe recipe for \"magnitude $k$, perpendicular to both\" is always $\\pm k\\,\\dfrac{\\vec a\\times\\vec b}{|\\vec a\\times\\vec b|}$: find the direction, make it unit, then stretch.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (JEE style: picking the sign).** Find the vector of magnitude 9 that is perpendicular to both $\\vec a = \\hat i + 2\\hat j$ and $\\vec b = 2\\hat j + \\hat k$ and makes an **acute** angle with the positive $z$-axis.\n\n1. **Direction.** $\\vec a = (1, 2, 0)$, $\\vec b = (0, 2, 1)$. $\\hat i$: $(2)(1) - (0)(2) = 2$. $\\hat j$: $-\\big((1)(1) - (0)(0)\\big) = -1$. $\\hat k$: $(1)(2) - (2)(0) = 2$. So $\\vec a\\times\\vec b = (2, -1, 2)$.\n2. **Check.** $(2,-1,2)\\cdot(1,2,0) = 2 - 2 = 0$ and $(2,-1,2)\\cdot(0,2,1) = -2 + 2 = 0$.\n3. **Unit, then stretch.** Length $\\sqrt{4 + 1 + 4} = 3$, so the candidates are $\\pm\\frac93(2, -1, 2) = \\pm(6\\hat i - 3\\hat j + 6\\hat k)$.\n4. **Pick the sign.** An acute angle with the positive $z$-axis means a positive dot product with $\\hat k$, i.e. a positive $z$-component. *Why:* $\\vec v\\cdot\\hat k = |\\vec v|\\cos\\gamma$, which is positive exactly when the angle $\\gamma$ is acute. Only the plus sign has $z = +6 > 0$.\n5. **Answer.** $6\\hat i - 3\\hat j + 6\\hat k$.\n\nThe cross product finds the line; an extra condition in the question chooses the end.",
    },
    {
      type: "text",
      content:
        "**Sines.** Taking lengths in the definition gives a second angle formula, a partner to $\\cos\\theta = \\frac{\\vec a\\cdot\\vec b}{|\\vec a||\\vec b|}$:",
    },
    { type: "math", latex: "\\sin\\theta = \\frac{|\\vec a \\times \\vec b|}{|\\vec a|\\,|\\vec b|}" },
    {
      type: "text",
      content:
        "**Worked example 4.** Find the angle between $\\vec a = \\hat i + \\hat j$ and $\\vec b = \\hat j + \\hat k$ using the cross product.\n\n1. $\\vec a\\times\\vec b = (1, -1, 1)$, so $|\\vec a\\times\\vec b| = \\sqrt3$.\n2. $|\\vec a||\\vec b| = \\sqrt2\\cdot\\sqrt2 = 2$, so $\\sin\\theta = \\frac{\\sqrt3}{2}$.\n3. That allows **two** angles in $[0, \\pi]$: $\\theta = 60^\\circ$ or $\\theta = 120^\\circ$.\n4. Decide with the dot product: $\\vec a\\cdot\\vec b = 1 > 0$, so the angle is acute. $\\theta = 60^\\circ$.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Sine alone cannot tell acute from obtuse",
      content:
        "On $[0, \\pi]$, $\\sin\\theta = \\sin(\\pi - \\theta)$ and $\\sin\\theta \\ge 0$, so $|\\vec a\\times\\vec b|$ gives the same value for $\\theta$ and $180^\\circ - \\theta$. Use the **sign of the dot product** to choose: positive means acute, negative means obtuse. (Or just use $\\cos\\theta$ from the dot product, which is never ambiguous on $[0, \\pi]$.)",
    },
    {
      type: "text",
      content:
        "The dot product gives $\\cos\\theta$ and the cross product gives $\\sin\\theta$, for the same angle. Since $\\sin^2\\theta + \\cos^2\\theta = 1$, the two products must be linked. Multiply that identity by $|\\vec a|^2|\\vec b|^2$:",
    },
    {
      type: "math",
      latex:
        "\\underbrace{|\\vec a|^2|\\vec b|^2\\sin^2\\theta}_{|\\vec a\\times\\vec b|^2} + \\underbrace{|\\vec a|^2|\\vec b|^2\\cos^2\\theta}_{(\\vec a\\cdot\\vec b)^2} = |\\vec a|^2|\\vec b|^2",
    },
    {
      type: "math",
      latex: "|\\vec a \\times \\vec b|^2 + (\\vec a \\cdot \\vec b)^2 = |\\vec a|^2\\,|\\vec b|^2",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Lagrange's identity",
      content:
        "The identity above is Pythagoras for the two products: the \"turning\" part and the \"agreeing\" part of $\\vec a$ and $\\vec b$ together make up all of $|\\vec a||\\vec b|$. Use it to get $|\\vec a\\times\\vec b|$ without components.",
    },
    {
      type: "text",
      content:
        "**Worked example 5.** $|\\vec a| = 2$, $|\\vec b| = 5$ and $\\vec a \\cdot \\vec b = 6$. Find $|\\vec a \\times \\vec b|$.\n\n1. $|\\vec a \\times \\vec b|^2 = |\\vec a|^2|\\vec b|^2 - (\\vec a\\cdot\\vec b)^2 = 4 \\cdot 25 - 36 = 64$.\n2. $|\\vec a \\times \\vec b| = 8$.\n\nNo angle, no components, just the identity.",
    },
    {
      type: "text",
      content:
        "**Worked example 6 (CBSE board favourite).** $|\\vec a\\times\\vec b|^2 + (\\vec a\\cdot\\vec b)^2 = 144$ and $|\\vec a| = 4$. Find $|\\vec b|$.\n\n1. **Recognise the left side.** By Lagrange's identity it equals $|\\vec a|^2|\\vec b|^2$, whatever the angle. *Why:* the question hides the identity; seeing it is the whole problem.\n2. So $16\\,|\\vec b|^2 = 144$, giving $|\\vec b|^2 = 9$.\n3. $|\\vec b| = 3$ (a length is never negative).\n\nNotice that the angle between $\\vec a$ and $\\vec b$ could be anything; the sum $\\sin^2\\theta + \\cos^2\\theta = 1$ wipes it out.",
    },
    {
      type: "text",
      content:
        "**Torque.** Back to the spanner. A force $\\vec F$ applied at position $\\vec r$ (measured from the pivot) has turning effect",
    },
    { type: "math", latex: "\\vec \\tau = \\vec r \\times \\vec F, \\qquad |\\vec \\tau| = |\\vec r|\\,|\\vec F|\\sin\\theta" },
    {
      type: "text",
      content:
        "The size is (lever length) × (force) × $\\sin\\theta$, which is why a longer spanner helps and why pushing along the spanner does nothing. The direction is the axis the bolt turns about, with the right-hand rule giving the sense. Order matters: it is $\\vec r \\times \\vec F$, not $\\vec F \\times \\vec r$.",
    },
    {
      type: "text",
      content:
        "**Worked example 7.** A spanner lies along $\\vec r = 0.3\\,\\hat i$ m and you push with $\\vec F = 40\\,\\hat j$ N. Then $\\vec\\tau = 0.3 \\cdot 40\\,(\\hat i \\times \\hat j) = 12\\,\\hat k$ N m: 12 N m about the vertical axis, anticlockwise seen from above.",
    },
    {
      type: "text",
      content:
        "**Worked example 8.** A force $\\vec F = 3\\hat i + 2\\hat j + \\hat k$ N acts at a point with position $\\vec r = \\hat i - \\hat j + 2\\hat k$ m relative to the pivot.\n\n1. $\\hat i$: $(-1)(1) - (2)(2) = -5$. $\\hat j$: $-\\big((1)(1) - (2)(3)\\big) = 5$. $\\hat k$: $(1)(2) - (-1)(3) = 5$.\n2. $\\vec \\tau = -5\\hat i + 5\\hat j + 5\\hat k$ N m, with $|\\vec\\tau| = 5\\sqrt3$ N m.\n3. Check: $\\vec\\tau\\cdot\\vec r = -5 - 5 + 10 = 0$ and $\\vec\\tau\\cdot\\vec F = -15 + 10 + 5 = 0$.",
    },
    {
      type: "text",
      content:
        "**Worked example 9 (opening a door).** A door is hinged along the vertical $z$-axis. Its handle is at $\\vec r = 0.8\\,\\hat i$ m from the hinge line, and you pull with $\\vec F = 12\\hat i + 16\\hat j$ N (partly away from the hinge, partly across the door). Find the torque.\n\n1. Distribute: $\\vec\\tau = \\vec r\\times\\vec F = 0.8\\cdot12\\,(\\hat i\\times\\hat i) + 0.8\\cdot16\\,(\\hat i\\times\\hat j)$. *Why:* splitting $\\vec F$ into parts along and across the door shows which part does the turning.\n2. $\\hat i\\times\\hat i = \\vec 0$: the $12\\hat i$ N part pulls straight along the door and turns nothing, however hard you pull.\n3. $\\hat i\\times\\hat j = \\hat k$: $\\vec\\tau = 12.8\\,\\hat k$ N m, a turn about the hinge, anticlockwise seen from above.\n4. **Check with the angle.** $|\\vec F| = \\sqrt{144 + 256} = 20$ N and $\\sin\\theta = \\frac{16}{20} = 0.8$, so $|\\vec\\tau| = 0.8 \\times 20 \\times 0.8 = 12.8$ N m. It agrees.\n\nThis is why you push a door at right angles to it, and at the handle side, far from the hinge: both make $|\\vec r|\\sin\\theta$ as large as possible.",
    },
    {
      type: "text",
      content:
        "**Torque about a point other than the origin.** The lever arm always runs **from the pivot to the point where the force acts**. About a pivot $Q$, with the force applied at $P$, use $\\vec r = \\overrightarrow{QP} = \\vec P - \\vec Q$, not the position vector of $P$.\n\nExample: $\\vec F = 2\\hat j$ N acts at $P(3, 1, 0)$; find the torque about $Q(1, 1, 0)$. Then $\\vec r = (3, 1, 0) - (1, 1, 0) = (2, 0, 0)$ and $\\vec\\tau = 2\\hat i \\times 2\\hat j = 4\\hat k$ N m. (Using $P$'s position $(3, 1, 0)$ from the origin would wrongly give $6\\hat k$.)",
    },
    {
      type: "text",
      content:
        "**Geometry pay-off: the law of sines.** Take a triangle $ABC$ and let its sides, taken head to tail, be $\\vec a = \\overrightarrow{BC}$, $\\vec b = \\overrightarrow{CA}$, $\\vec c = \\overrightarrow{AB}$. Going round the triangle brings you home, so $\\vec a + \\vec b + \\vec c = \\vec 0$.",
    },
    {
      type: "text",
      content:
        "1. Cross with $\\vec a$: $\\vec a\\times\\vec a + \\vec a\\times\\vec b + \\vec a\\times\\vec c = \\vec 0$, so $\\vec a\\times\\vec b = -\\vec a\\times\\vec c = \\vec c\\times\\vec a$.\n2. Cross with $\\vec b$ the same way: $\\vec b\\times\\vec a + \\vec b\\times\\vec c = \\vec 0$, so $\\vec b\\times\\vec c = \\vec a\\times\\vec b$.\n3. Therefore $\\vec a \\times \\vec b = \\vec b \\times \\vec c = \\vec c \\times \\vec a$. Each has length twice the triangle's area, which is why they agree.\n4. Take lengths. The angle between $\\overrightarrow{BC}$ and $\\overrightarrow{CA}$ (placed tail to tail) is $\\pi - C$, and $\\sin(\\pi - C) = \\sin C$. So $|\\vec a\\times\\vec b| = ab\\sin C$, and similarly for the others.",
    },
    {
      type: "math",
      latex:
        "ab\\sin C = bc\\sin A = ca\\sin B \\quad\\xrightarrow{\\;\\div\\, abc\\;}\\quad \\frac{\\sin A}{a} = \\frac{\\sin B}{b} = \\frac{\\sin C}{c}",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Dot for cosines, cross for sines",
      content:
        "In Chapter 3 the dot product gave the law of cosines from $|\\vec a - \\vec b|^2$. Now the cross product gives the law of sines. Both classical triangle laws are the two vector products in disguise.",
    },
    {
      type: "table",
      headers: ["Question", "Use"],
      rows: [
        ["A direction perpendicular to two vectors", "$\\pm\\frac{\\vec a\\times\\vec b}{|\\vec a\\times\\vec b|}$ (two answers)"],
        ["A vector of magnitude $k$ perpendicular to both", "$\\pm k\\,\\frac{\\vec a\\times\\vec b}{|\\vec a\\times\\vec b|}$"],
        ["$\\sin\\theta$ between two vectors", "$\\frac{|\\vec a\\times\\vec b|}{|\\vec a||\\vec b|}$ (then the dot product's sign for acute or obtuse)"],
        ["$|\\vec a\\times\\vec b|$ from lengths and a dot product", "Lagrange: $\\sqrt{|\\vec a|^2|\\vec b|^2 - (\\vec a\\cdot\\vec b)^2}$"],
        ["Turning effect of a force", "$\\vec\\tau = \\vec r\\times\\vec F$, with $\\vec r$ from the pivot to the point of action"],
      ],
    },
    {
      type: "quiz",
      id: "va4-5-q1",
      variant: "concept",
      question: "How many unit vectors are perpendicular to both $\\hat i$ and $\\hat j$?",
      options: [
        { text: "Two: $\\hat k$ and $-\\hat k$.", correct: true, feedback: "The plane of $\\hat i$ and $\\hat j$ has two sides. $\\hat i\\times\\hat j = \\hat k$ gives one; its negative is the other." },
        { text: "One: $\\hat k$.", feedback: "$-\\hat k$ is also a unit vector and also perpendicular to both. The right-hand rule only picks one if the question asks for an orientation." },
        { text: "Infinitely many.", feedback: "Perpendicular to *one* vector allows infinitely many. Perpendicular to two non-parallel vectors pins down a single line, which has two unit directions." },
      ],
    },
    {
      type: "quiz",
      id: "va4-5-q2",
      variant: "practice",
      question: "Find the unit vectors perpendicular to both $\\vec a = \\hat i - \\hat j + \\hat k$ and $\\vec b = 2\\hat i + \\hat j$.",
      options: [
        { text: "$\\pm\\dfrac{1}{\\sqrt{14}}(-\\hat i + 2\\hat j + 3\\hat k)$", correct: true, feedback: "$\\vec a\\times\\vec b = \\big((-1)(0) - (1)(1),\\ (1)(2) - (1)(0),\\ (1)(1) - (-1)(2)\\big) = (-1, 2, 3)$, length $\\sqrt{14}$. Both signs are valid." },
        { text: "$\\dfrac{1}{\\sqrt{14}}(-\\hat i + 2\\hat j + 3\\hat k)$ only", feedback: "Its negative is equally perpendicular. Both belong in the answer." },
        { text: "$\\pm(-\\hat i + 2\\hat j + 3\\hat k)$", feedback: "Right direction, but its length is $\\sqrt{14}$. Divide by the length to get a unit vector." },
        { text: "$\\pm\\dfrac{1}{\\sqrt{14}}(-\\hat i - 2\\hat j + 3\\hat k)$", feedback: "That has the $\\hat j$ sign error: $(-1,-2,3)\\cdot(1,-1,1) = 4 \\neq 0$." },
      ],
      hint: "Write b as (2, 1, 0) and use the determinant with signs +, −, +.",
    },
    {
      type: "quiz",
      id: "va4-5-q3",
      variant: "practice",
      question: "$|\\vec a| = 10$, $|\\vec b| = 2$ and $\\vec a \\cdot \\vec b = 12$. Find $|\\vec a \\times \\vec b|$.",
      options: [
        { text: "$16$", correct: true, feedback: "$|\\vec a\\times\\vec b|^2 = 100 \\cdot 4 - 144 = 256$, so 16." },
        { text: "$4\\sqrt{34}$", feedback: "That adds: $\\sqrt{400 + 144}$. Lagrange subtracts the dot product's square: $\\sqrt{400 - 144} = 16$." },
        { text: "$20$", feedback: "That is $|\\vec a||\\vec b|$, which ignores the angle. It would only be right if the vectors were perpendicular." },
        { text: "$256$", feedback: "That is $|\\vec a\\times\\vec b|^2$. Take the square root." },
      ],
      hint: "Lagrange: |a × b|² = |a|²|b|² − (a·b)².",
    },
    {
      type: "quiz",
      id: "va4-5-q6",
      variant: "concept",
      question:
        "For two vectors, $|\\vec a\\times\\vec b| = \\frac12|\\vec a||\\vec b|$ and $\\vec a\\cdot\\vec b < 0$. What is the angle between them?",
      options: [
        { text: "$150^\\circ$", correct: true, feedback: "$\\sin\\theta = \\frac12$ allows $30^\\circ$ or $150^\\circ$. A negative dot product means obtuse, so $150^\\circ$." },
        { text: "$30^\\circ$", feedback: "$\\sin\\theta = \\frac12$ does allow $30^\\circ$, but then $\\vec a\\cdot\\vec b$ would be positive. Sine cannot tell acute from obtuse; the dot product can." },
        { text: "$120^\\circ$", feedback: "$\\sin 120^\\circ = \\frac{\\sqrt3}{2}$, not $\\frac12$." },
        { text: "$-30^\\circ$", feedback: "The angle between two vectors is always in $[0^\\circ, 180^\\circ]$." },
      ],
      hint: "List both angles in [0°, 180°] with that sine, then use the dot product's sign.",
    },
    {
      type: "quiz",
      id: "va4-5-q4",
      variant: "practice",
      question: "A force $\\vec F = 20\\,\\hat j$ N acts at $\\vec r = 0.5\\,\\hat i$ m from a pivot. What is the torque $\\vec\\tau$?",
      options: [
        { text: "$10\\,\\hat k$ N m", correct: true, feedback: "$\\vec r\\times\\vec F = 0.5 \\cdot 20\\,(\\hat i\\times\\hat j) = 10\\hat k$." },
        { text: "$-10\\,\\hat k$ N m", feedback: "That is $\\vec F\\times\\vec r$. Torque is $\\vec r\\times\\vec F$." },
        { text: "$10$ N m (a scalar)", feedback: "The size is right, but torque is a vector: it has an axis and a sense." },
        { text: "$\\vec 0$", feedback: "The force is perpendicular to the lever arm, so the torque is as large as possible, not zero." },
      ],
    },
    {
      type: "quiz",
      id: "va4-5-q5",
      variant: "concept",
      question:
        "In triangle $ABC$ with $\\vec a = \\overrightarrow{BC}$, $\\vec b = \\overrightarrow{CA}$, $\\vec c = \\overrightarrow{AB}$, why is $\\vec a\\times\\vec b = \\vec b\\times\\vec c$?",
      options: [
        { text: "Because $\\vec a + \\vec b + \\vec c = \\vec 0$; crossing with $\\vec b$ gives $\\vec b\\times\\vec a + \\vec b\\times\\vec c = \\vec 0$.", correct: true, feedback: "Then $\\vec b\\times\\vec c = -\\vec b\\times\\vec a = \\vec a\\times\\vec b$. Both have length twice the area." },
        { text: "Because the cross product is commutative.", feedback: "It is anticommutative. The equality comes from the triangle closing." },
        { text: "Because all three sides of every triangle are equal.", feedback: "The result holds for any triangle, not only equilateral ones." },
      ],
    },
    {
      type: "quiz",
      id: "va4-5-q7",
      variant: "practice",
      question:
        "A door handle is at $\\vec r = 0.5\\,\\hat i$ m from the hinge line, and you pull with $\\vec F = 6\\hat i + 8\\hat j$ N. What is the torque $\\vec\\tau = \\vec r\\times\\vec F$?",
      options: [
        { text: "$4\\,\\hat k$ N m", correct: true, feedback: "$0.5\\cdot6\\,(\\hat i\\times\\hat i) + 0.5\\cdot8\\,(\\hat i\\times\\hat j) = 4\\hat k$. The $6\\hat i$ part pulls along the door and turns nothing." },
        { text: "$5\\,\\hat k$ N m", feedback: "That uses the full $|\\vec F| = 10$ N at right angles. Only the part across the door, 8 N, turns it: $0.5 \\times 8 = 4$." },
        { text: "$3\\,\\hat k$ N m", feedback: "That uses the 6 N part, which points along the door. That part has $\\sin\\theta = 0$ with $\\vec r$ and gives no torque." },
        { text: "$-4\\,\\hat k$ N m", feedback: "That is $\\vec F\\times\\vec r$. Torque puts the lever arm first." },
      ],
      hint: "Split F into the part along r and the part across r. Only one of them turns the door.",
    },
    {
      type: "quiz",
      id: "va4-5-q8",
      variant: "practice",
      question: "$|\\vec a\\times\\vec b|^2 + (\\vec a\\cdot\\vec b)^2 = 400$ and $|\\vec a| = 5$. Find $|\\vec b|$.",
      options: [
        { text: "$4$", correct: true, feedback: "The left side is $|\\vec a|^2|\\vec b|^2 = 25\\,|\\vec b|^2$, so $|\\vec b|^2 = 16$ and $|\\vec b| = 4$." },
        { text: "$16$", feedback: "That is $|\\vec b|^2$. Take the square root." },
        { text: "$80$", feedback: "That divides 400 by $|\\vec a| = 5$. The identity has $|\\vec a|^2 = 25$." },
        { text: "It depends on the angle between them.", feedback: "Lagrange's identity removes the angle: $\\sin^2\\theta + \\cos^2\\theta = 1$." },
      ],
      hint: "The left side is Lagrange's identity in disguise.",
    },
    {
      type: "quiz",
      id: "va4-5-q9",
      variant: "practice",
      question:
        "Which unit vector is perpendicular to both $\\vec a = \\hat i + \\hat j$ and $\\vec b = \\hat j + \\hat k$ **and** makes an acute angle with the positive $x$-axis?",
      options: [
        { text: "$\\dfrac{1}{\\sqrt3}(\\hat i - \\hat j + \\hat k)$", correct: true, feedback: "$\\vec a\\times\\vec b = (1, -1, 1)$, length $\\sqrt3$. Of the two unit normals, only this one has a positive $x$-component." },
        { text: "$\\dfrac{1}{\\sqrt3}(-\\hat i + \\hat j - \\hat k)$", feedback: "It is perpendicular to both, but its $x$-component is negative, so it makes an obtuse angle with the $x$-axis." },
        { text: "$\\dfrac{1}{\\sqrt3}(\\hat i + \\hat j + \\hat k)$", feedback: "Not perpendicular: $(1,1,1)\\cdot(1,1,0) = 2 \\neq 0$. That is the $\\hat j$ sign slip." },
        { text: "$\\hat i - \\hat j + \\hat k$", feedback: "Right direction, but its length is $\\sqrt3$, not 1." },
      ],
      hint: "Find ±(a × b)/|a × b|, then keep the one with a positive x-component.",
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-4-mastery",
  title: "4.6 · Chapter 4 Mastery",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "One chapter, one idea: the cross product is a vector whose length is the parallelogram's area and whose direction is the face's normal, oriented by the right-hand rule. Everything below is that idea applied. Work each question on paper first, and check every cross product by dotting it with its inputs.",
    },
    {
      type: "table",
      headers: ["Tool", "Formula"],
      rows: [
        ["Definition", "$\\vec a\\times\\vec b = |\\vec a||\\vec b|\\sin\\theta\\,\\hat n$"],
        ["Components", "$(a_2b_3 - a_3b_2,\\ a_3b_1 - a_1b_3,\\ a_1b_2 - a_2b_1)$"],
        ["Unit cycle", "$\\hat i\\times\\hat j = \\hat k,\\ \\hat j\\times\\hat k = \\hat i,\\ \\hat k\\times\\hat i = \\hat j$"],
        ["Areas", "$|\\vec a\\times\\vec b|$, $\\tfrac12|\\overrightarrow{AB}\\times\\overrightarrow{AC}|$, $\\tfrac12|\\vec d_1\\times\\vec d_2|$"],
        ["Unit normals", "$\\pm\\frac{\\vec a\\times\\vec b}{|\\vec a\\times\\vec b|}$"],
        ["Lagrange", "$|\\vec a\\times\\vec b|^2 + (\\vec a\\cdot\\vec b)^2 = |\\vec a|^2|\\vec b|^2$"],
        ["Torque", "$\\vec\\tau = \\vec r\\times\\vec F$"],
      ],
    },
    {
      type: "quiz",
      id: "va4-6-q1",
      variant: "mastery",
      question: "Compute $(2\\hat i - \\hat j + \\hat k) \\times (\\hat i + 3\\hat j - 2\\hat k)$.",
      options: [
        { text: "$-\\hat i + 5\\hat j + 7\\hat k$", correct: true, feedback: "$\\hat i$: $(-1)(-2) - (1)(3) = -1$; $\\hat j$: $-\\big((2)(-2) - (1)(1)\\big) = 5$; $\\hat k$: $(2)(3) - (-1)(1) = 7$. Check with $\\vec a$: $-2 - 5 + 7 = 0$." },
        { text: "$-\\hat i - 5\\hat j + 7\\hat k$", feedback: "Sign error in the $\\hat j$ term. Dot with $(2,-1,1)$: $-2 + 5 + 7 = 10 \\neq 0$." },
        { text: "$\\hat i - 5\\hat j - 7\\hat k$", feedback: "That is the reversed product $\\vec b \\times \\vec a$." },
        { text: "$-3$", feedback: "That is the dot product $2 - 3 - 2$. The cross product is a vector." },
      ],
    },
    {
      type: "quiz",
      id: "va4-6-q2",
      variant: "mastery",
      question: "Evaluate $\\hat i \\times \\hat k + \\hat k \\times \\hat j$.",
      options: [
        { text: "$-\\hat i - \\hat j$", correct: true, feedback: "Both run against the cycle: $\\hat i\\times\\hat k = -\\hat j$ and $\\hat k\\times\\hat j = -\\hat i$." },
        { text: "$\\hat i + \\hat j$", feedback: "Those would be $\\hat j\\times\\hat k + \\hat k\\times\\hat i$, which follow the cycle. Here both are reversed." },
        { text: "$\\vec 0$", feedback: "Only equal (or parallel) unit vectors cross to zero." },
        { text: "$\\hat i - \\hat j$", feedback: "Check each one separately against $\\hat i\\to\\hat j\\to\\hat k\\to\\hat i$." },
      ],
    },
    {
      type: "quiz",
      id: "va4-6-q3",
      variant: "mastery",
      question: "Find the area of the triangle with vertices $A(1,0,0)$, $B(0,1,0)$, $C(0,0,1)$.",
      options: [
        { text: "$\\dfrac{\\sqrt3}{2}$", correct: true, feedback: "$\\overrightarrow{AB}\\times\\overrightarrow{AC} = (-1,1,0)\\times(-1,0,1) = (1,1,1)$, length $\\sqrt3$, halved. It is an equilateral triangle of side $\\sqrt2$, and $\\frac{\\sqrt3}{4}(\\sqrt2)^2$ agrees." },
        { text: "$\\sqrt3$", feedback: "That is the parallelogram. A triangle needs the half." },
        { text: "$\\dfrac12$", feedback: "That is the area of one face of the unit cube's corner, e.g. triangle $OAB$, not triangle $ABC$." },
        { text: "$\\dfrac{3}{2}$", feedback: "$|(1,1,1)| = \\sqrt3$, not 3." },
      ],
    },
    {
      type: "quiz",
      id: "va4-6-q4",
      variant: "mastery",
      question: "A parallelogram has diagonals $\\vec d_1 = \\hat i + \\hat j$ and $\\vec d_2 = \\hat i - \\hat j + 2\\hat k$. Find its area.",
      options: [
        { text: "$\\sqrt3$", correct: true, feedback: "$\\vec d_1\\times\\vec d_2 = (2, -2, -2)$, length $2\\sqrt3$, and the area is half of that." },
        { text: "$2\\sqrt3$", feedback: "That is $|\\vec d_1\\times\\vec d_2|$ without the half. The diagonals' product is twice the sides' product." },
        { text: "$\\dfrac{\\sqrt3}{2}$", feedback: "One half only. You halved twice." },
        { text: "$0$", feedback: "That is $\\vec d_1\\cdot\\vec d_2 = 1 - 1 + 0$: the diagonals are perpendicular, not parallel." },
      ],
    },
    {
      type: "quiz",
      id: "va4-6-q5",
      variant: "mastery",
      question: "Which set lists **all** the unit vectors perpendicular to both $\\vec a = 2\\hat i - \\hat j + 2\\hat k$ and $\\vec b = \\hat i + 2\\hat j - 2\\hat k$?",
      options: [
        { text: "$\\pm\\dfrac{1}{\\sqrt{65}}(-2\\hat i + 6\\hat j + 5\\hat k)$", correct: true, feedback: "$\\vec a\\times\\vec b = \\big((-1)(-2) - (2)(2),\\ (2)(1) - (2)(-2),\\ (2)(2) - (-1)(1)\\big) = (-2, 6, 5)$, length $\\sqrt{65}$. Check: $\\cdot\\,\\vec a = -4 - 6 + 10 = 0$. Divide and take both signs." },
        { text: "$\\dfrac{1}{\\sqrt{65}}(-2\\hat i + 6\\hat j + 5\\hat k)$ only", feedback: "Its negative is also a unit vector perpendicular to both. \"All\" means both." },
        { text: "$\\pm\\dfrac{1}{65}(-2\\hat i + 6\\hat j + 5\\hat k)$", feedback: "Divide by the length $\\sqrt{65}$, not by $65$ (which is the length squared). Your vector has length $\\frac{1}{\\sqrt{65}}$, not 1." },
        { text: "$\\pm\\dfrac{1}{\\sqrt{65}}(-2\\hat i - 6\\hat j + 5\\hat k)$", feedback: "Sign slip in the $\\hat j$ term: $(-2,-6,5)\\cdot(2,-1,2) = 12 \\neq 0$." },
      ],
    },
    {
      type: "quiz",
      id: "va4-6-q6",
      variant: "mastery",
      question: "$|\\vec a| = 3$, $|\\vec b| = 4$ and $|\\vec a \\times \\vec b| = 6\\sqrt3$. Find $|\\vec a \\cdot \\vec b|$.",
      options: [
        { text: "$6$", correct: true, feedback: "$(\\vec a\\cdot\\vec b)^2 = 9\\cdot16 - 108 = 36$. Equivalently $\\sin\\theta = \\frac{6\\sqrt3}{12} = \\frac{\\sqrt3}{2}$, so $|\\cos\\theta| = \\frac12$." },
        { text: "$36$", feedback: "That is $(\\vec a\\cdot\\vec b)^2$. Take the square root." },
        { text: "$12$", feedback: "That is $|\\vec a||\\vec b|$; it would need $\\cos\\theta = \\pm1$, but then the cross product would be zero." },
        { text: "$6\\sqrt3$", feedback: "That is the cross product's length again. Use Lagrange's identity to separate the two." },
      ],
    },
    {
      type: "quiz",
      id: "va4-6-q7",
      variant: "mastery",
      question: "For which $\\lambda$ is $(2\\hat i + \\lambda\\hat j + 6\\hat k) \\times (\\hat i + 3\\hat j + 3\\hat k) = \\vec 0$?",
      options: [
        { text: "$\\lambda = 6$", correct: true, feedback: "Zero cross product means parallel: $(2, \\lambda, 6) = 2(1, 3, 3)$ forces $\\lambda = 6$." },
        { text: "$\\lambda = 3$", feedback: "Then $(2, 3, 6)$ is not a multiple of $(1, 3, 3)$; the $\\hat k$ component of the cross product would be $2\\cdot3 - 3\\cdot1 = 3$." },
        { text: "$\\lambda = -\\dfrac{20}{3}$", feedback: "That makes the *dot* product zero ($2 + 3\\lambda + 18 = 0$), i.e. perpendicular vectors. A zero cross product needs parallel vectors." },
        { text: "No value works.", feedback: "The $x$ and $z$ components are already in ratio 2 : 1, so one $\\lambda$ does." },
      ],
    },
    {
      type: "quiz",
      id: "va4-6-q8",
      variant: "mastery",
      question: "A force $\\vec F = \\hat i$ N acts at $P(1, 2, 3)$. Find the torque about the point $Q(1, 0, 1)$.",
      options: [
        { text: "$2\\hat j - 2\\hat k$ N m", correct: true, feedback: "$\\vec r = \\overrightarrow{QP} = (0, 2, 2)$, and $\\vec r\\times\\vec F = (2\\cdot0 - 2\\cdot0,\\ 2\\cdot1 - 0\\cdot0,\\ 0\\cdot0 - 2\\cdot1) = (0, 2, -2)$." },
        { text: "$-2\\hat j + 2\\hat k$ N m", feedback: "That is $\\vec F\\times\\vec r$. Torque is $\\vec r\\times\\vec F$, lever arm first." },
        { text: "$3\\hat j - 2\\hat k$ N m", feedback: "That uses the position of $P$ from the origin, not from the pivot $Q$." },
        { text: "$0$", feedback: "That is $\\vec r\\cdot\\vec F$. The lever arm is perpendicular to the force, so the torque is not zero." },
      ],
      hint: "The lever arm runs from the pivot to the point where the force acts.",
    },
    {
      type: "quiz",
      id: "va4-6-q9",
      variant: "mastery",
      question: "Find the area of the parallelogram whose adjacent sides are $\\vec a = 3\\hat i + \\hat j + 4\\hat k$ and $\\vec b = \\hat i - \\hat j + \\hat k$.",
      options: [
        { text: "$\\sqrt{42}$", correct: true, feedback: "$\\vec a\\times\\vec b = \\big((1)(1) - (4)(-1),\\ (4)(1) - (3)(1),\\ (3)(-1) - (1)(1)\\big) = (5, 1, -4)$, length $\\sqrt{25 + 1 + 16} = \\sqrt{42}$." },
        { text: "$\\dfrac{\\sqrt{42}}{2}$", feedback: "That is the triangle on these sides. The parallelogram is the full $|\\vec a\\times\\vec b|$." },
        { text: "$6$", feedback: "That is $\\vec a\\cdot\\vec b = 3 - 1 + 4$, the dot product. Area needs the cross product." },
        { text: "$\\sqrt{78}$", feedback: "That is $|\\vec a||\\vec b| = \\sqrt{26}\\cdot\\sqrt3$, which ignores the angle. It is the area only if the sides are perpendicular, and here $\\vec a\\cdot\\vec b = 6 \\neq 0$." },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "You now have a product for shadows (dot) and a product for areas (cross). Chapter 5 combines them: $\\vec a\\cdot(\\vec b\\times\\vec c)$ is the base area of a box times its height, a signed volume. Zero volume means a flat box, which gives the cleanest coplanarity test there is.",
    },
  ]),
};

export const vectorsChapter4Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lessonMastery,
];
