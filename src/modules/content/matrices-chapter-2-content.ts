import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Matrices Chapter 2 — Determinants: How Much Space Changes.
 * The determinant is the signed factor by which a transformation scales
 * area (volume in 3D). ad − bc comes from boxing a parallelogram; cofactor
 * expansion, every row/column property, the smart-evaluation tricks, and
 * the triangle-area and collinearity formulas all follow from that meaning.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "the-area-scale-factor",
  title: "2.1 · The Area Scale Factor",
  position: 1,
  blocks: blocks([
    {
      type: "video",
      src: "/videos/mx-2-determinants-how-much-space-changes.mp4",
      poster: "/videos/mx-2-determinants-how-much-space-changes.jpg",
      title: "Chapter 2 overview video",
      caption:
        "A narrated walk through the whole chapter. Watch it now for the big picture, or come back to it as a recap.",
    },
    {
      type: "text",
      content:
        "A $2\\times2$ matrix moves the whole plane. Grid lines stay straight, parallel and evenly spaced, and the origin stays put. So every little grid square turns into the **same** parallelogram. The shapes change, but they all change their area by one common factor.\n\nThat factor is a single number attached to the matrix. It is called the **determinant**, and this chapter is about what it measures and how to compute it.",
    },
    {
      type: "text",
      content:
        "Watch the unit square, the one with sides $\\hat{\\imath}$ and $\\hat{\\jmath}$. After the transformation its sides are the two **columns** of the matrix, so it becomes the parallelogram those columns span. Its area is the scale factor, since the unit square started with area 1.",
    },
    {
      type: "interactive",
      config: {
        component: "matrix-transform-grid",
        matrix: [
          [3, 1],
          [1, 2],
        ],
        showDeterminant: true,
        range: 8,
        presets: [
          { label: "Stretch", matrix: [[2, 0], [0, 3]] },
          { label: "Shear", matrix: [[1, 1], [0, 1]] },
          { label: "Rotate 90°", matrix: [[0, -1], [1, 0]] },
          { label: "Reflect in y = x", matrix: [[0, 1], [1, 0]] },
          { label: "Flip and double", matrix: [[1, 2], [3, 4]] },
        ],
        caption:
          "The shaded parallelogram is the image of the unit square, and its area is the determinant readout. Try the presets: the rotation and the shear keep the area at 1, the stretch multiplies it by 6, and the two flips change the shading colour.",
      },
    },
    {
      type: "text",
      content:
        "**Deriving the area.** Take $A = \\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}$ with all entries positive, so the columns $(a, c)$ and $(b, d)$ both point into the first quadrant. Also take column 1 $(a, c)$ lying below column 2 $(b, d)$, so turning from column 1 to column 2 is anticlockwise, as in the default picture. Put the parallelogram they span inside a bounding box. The box reaches to $a + b$ across and $c + d$ up.",
    },
    { type: "math", latex: "\\text{box} = (a+b)(c+d) = ac + ad + bc + bd" },
    {
      type: "text",
      content:
        "The box is the parallelogram plus six pieces around it:\n\n- two right triangles with legs $a$ and $c$, which together make an $a \\times c$ rectangle: area $ac$\n- two right triangles with legs $b$ and $d$, together area $bd$\n- two small rectangles in the corners, each $b \\times c$: area $2bc$\n\nSubtract them all from the box:",
    },
    {
      type: "math",
      latex:
        "\\text{parallelogram} = (ac + ad + bc + bd) - ac - bd - 2bc = ad - bc",
    },
    {
      type: "text",
      content:
        "If the columns are the other way round (column 1 above column 2), the same boxing gives $bc - ad$: the same area with the opposite sign. That sign is the orientation, explained below.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The determinant of a 2×2 matrix",
      content:
        "$\\det A = |A| = \\begin{vmatrix}a&b\\\\c&d\\end{vmatrix} = ad - bc$.\n\nIt is a **number**, not a matrix. $|\\det A|$ is the factor by which $A$ scales every area. Its **sign** says whether $A$ keeps the plane's orientation (positive) or flips it over (negative).",
    },
    {
      type: "text",
      content:
        "**Why the sign?** In the standard plane you turn anticlockwise to get from $\\hat{\\imath}$ to $\\hat{\\jmath}$. If after the transformation you still turn anticlockwise from column 1 to column 2, orientation is kept and $ad - bc > 0$. If the turn is now clockwise, the plane has been flipped over like a page turned face down, and $ad - bc < 0$. The reflection $\\begin{pmatrix}0&1\\\\1&0\\end{pmatrix}$ swaps $\\hat{\\imath}$ and $\\hat{\\jmath}$, so its determinant is $0 - 1 = -1$. Area is kept and orientation is reversed.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Area is positive, the determinant need not be",
      content:
        "The determinant is a **signed** area. A negative value is not a mistake. It gives two pieces of information together: the area factor $|\\det A|$, and the fact that the plane was flipped. When a problem asks for an area, take the modulus.",
    },
    {
      type: "text",
      content:
        "**Why every shape scales by the same factor.** Fill any shape with tiny grid squares. Each square becomes a copy of the same small parallelogram, scaled by $|\\det A|$. So the total area is scaled by $|\\det A|$ too, whether the shape is a triangle, a circle or a map outline.",
    },
    {
      type: "text",
      content:
        "**Worked example 1.** $A = \\begin{pmatrix}3&1\\\\1&2\\end{pmatrix}$.\n\n1. $\\det A = 3\\cdot2 - 1\\cdot1 = 5$.\n2. The unit square (area 1) becomes a parallelogram of area 5.\n3. A square of side 2 (area 4) becomes a parallelogram of area $4 \\times 5 = 20$.\n4. The unit circle (area $\\pi$) becomes an ellipse of area $5\\pi$.\n5. $5 > 0$, so orientation is kept.",
    },
    {
      type: "text",
      content:
        "**Worked example 2.** $B = \\begin{pmatrix}1&2\\\\3&4\\end{pmatrix}$.\n\n1. $\\det B = 1\\cdot4 - 2\\cdot3 = 4 - 6 = -2$.\n2. Areas are doubled: $|{-2}| = 2$.\n3. The sign is negative, so the plane is flipped. Column 1 is $(1, 3)$ and column 2 is $(2, 4)$. Going from $(1,3)$ to $(2,4)$ turns clockwise, the opposite of $\\hat{\\imath} \\to \\hat{\\jmath}$.",
    },
    {
      type: "table",
      headers: ["Matrix", "Determinant", "What happens to area"],
      rows: [
        ["$\\begin{pmatrix}k&0\\\\0&k\\end{pmatrix}$ (scale by $k$)", "$k^2$", "Both directions stretch by $k$, so area $\\times k^2$"],
        ["$\\begin{pmatrix}1&k\\\\0&1\\end{pmatrix}$ (shear)", "$1$", "Slides layers sideways; area unchanged"],
        ["$\\begin{pmatrix}\\cos\\theta&-\\sin\\theta\\\\\\sin\\theta&\\cos\\theta\\end{pmatrix}$ (rotation)", "$\\cos^2\\theta + \\sin^2\\theta = 1$", "Rigid turn; area and orientation kept"],
        ["$\\begin{pmatrix}1&0\\\\0&-1\\end{pmatrix}$ (reflect in x-axis)", "$-1$", "Area kept, orientation reversed"],
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 3 (application): printing a warped sticker.** A design app applies $T = \\begin{pmatrix}2&-1\\\\1&3\\end{pmatrix}$ to a rectangular sticker 4 cm wide and 3 cm tall. How much vinyl does the warped sticker need?\n\n1. Original area: $4 \\times 3 = 12\\ \\text{cm}^2$.\n2. $\\det T = 2\\cdot3 - (-1)\\cdot1 = 6 + 1 = 7$. *Why this step:* the determinant is the one number that tells us how every area changes, so we never need the coordinates of the new corners.\n3. New area: $12 \\times |7| = 84\\ \\text{cm}^2$. *Why the modulus:* vinyl is a real area, so we use the size of the factor. Here $7 > 0$ anyway, so the sticker is not printed mirror-image.",
    },
    {
      type: "math",
      latex: "\\text{new area} = |\\det T| \\times \\text{old area} = 7 \\times 12 = 84\\ \\text{cm}^2",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (exam style).** Find all real $\\lambda$ for which $M = \\begin{pmatrix}\\lambda&2\\\\3&\\lambda+1\\end{pmatrix}$ multiplies every area by 6 **and** keeps the orientation of the plane.\n\n1. Compute the determinant: $\\det M = \\lambda(\\lambda + 1) - 2\\cdot3 = \\lambda^2 + \\lambda - 6$.\n2. Translate the words. \"Multiplies areas by 6\" says $|\\det M| = 6$. \"Keeps orientation\" says $\\det M > 0$. Together: $\\det M = +6$. *Why this step:* the two conditions pin down both the size and the sign of the determinant.\n3. Solve $\\lambda^2 + \\lambda - 6 = 6$, i.e. $\\lambda^2 + \\lambda - 12 = 0$, so $(\\lambda + 4)(\\lambda - 3) = 0$.\n4. $\\lambda = 3$ or $\\lambda = -4$.\n5. Check $\\lambda = 3$: $3\\cdot4 - 6 = 6$. Check $\\lambda = -4$: $(-4)(-3) - 6 = 6$. Both work.\n\nIf the question had said only \"multiplies areas by 6\", you would also need $\\det M = -6$: $\\lambda^2 + \\lambda = 0$, giving $\\lambda = 0$ or $\\lambda = -1$. Those two matrices scale area by 6 but flip the plane.",
    },
    {
      type: "quiz",
      id: "mx2-1-q1",
      variant: "concept",
      question: "What is $\\det\\begin{pmatrix}2&1\\\\1&3\\end{pmatrix}$?",
      options: [
        {
          text: "The matrix $\\begin{pmatrix}3&-1\\\\-1&2\\end{pmatrix}$",
          feedback: "That matrix (the adjoint) shows up in Chapter 3. A determinant is never a matrix; it is a single number.",
        },
        {
          text: "The single number 5",
          correct: true,
          feedback: "$2\\cdot3 - 1\\cdot1 = 5$. A determinant is one number: the area scale factor.",
        },
        {
          text: "The matrix $\\begin{pmatrix}6&1\\\\1&6\\end{pmatrix}$",
          feedback: "A determinant does not produce another grid of numbers. It reduces the whole matrix to one number, $ad - bc$.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx2-1-q2",
      variant: "concept",
      question:
        "You compute $\\det\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix} = -2$. Which statement is right?",
      options: [
        {
          text: "There must be an arithmetic slip, because area cannot be negative.",
          feedback: "There is no slip. The determinant is a *signed* area, and a negative sign is how it reports a flip.",
        },
        {
          text: "Areas are multiplied by $-2$, so a square of area 1 has area $-2$ afterwards.",
          feedback: "Actual areas are always positive. The image has area $|{-2}| = 2$, and the sign only reports orientation.",
        },
        {
          text: "Areas double, and the plane is flipped over.",
          correct: true,
          feedback: "The size of the determinant is the area factor, and the minus sign records the reversed orientation.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx2-1-q3",
      variant: "practice",
      question: "Evaluate $\\begin{vmatrix}5&-2\\\\3&4\\end{vmatrix}$.",
      options: [
        { text: "$26$", correct: true, feedback: "$5\\cdot4 - (-2)\\cdot3 = 20 + 6 = 26$." },
        { text: "$14$", feedback: "Subtracting $-6$ means adding 6: $20 - (-6) = 26$." },
        { text: "$-26$", feedback: "You computed $bc - ad$, taking the diagonals in the wrong order. It is (main diagonal) minus (other diagonal): $20 - (-6) = 26$." },
      ],
      hint: "Main diagonal product minus the other diagonal product. Watch the minus sign on $-2$.",
    },
    {
      type: "quiz",
      id: "mx2-1-q4",
      variant: "practice",
      question:
        "A triangle of area 6 is transformed by $\\begin{pmatrix}3&1\\\\1&2\\end{pmatrix}$. What is the area of its image?",
      options: [
        { text: "$11$", feedback: "Areas are multiplied by the determinant, not increased by it." },
        { text: "$15$", feedback: "It is a triangle, but the factor applies to *its* area. There is no extra $\\frac{1}{2}$: $6 \\times 5 = 30$." },
        { text: "$30$", correct: true, feedback: "$\\det = 6 - 1 = 5$, and every area is multiplied by 5: $6 \\times 5 = 30$." },
      ],
    },
    {
      type: "quiz",
      id: "mx2-1-q5",
      variant: "practice",
      question: "Which matrix reverses the orientation of the plane?",
      options: [
        { text: "$\\begin{pmatrix}1&3\\\\2&1\\end{pmatrix}$", correct: true, feedback: "$1 - 6 = -5 < 0$: the plane is flipped and areas are multiplied by 5." },
        { text: "$\\begin{pmatrix}2&5\\\\1&3\\end{pmatrix}$", feedback: "$6 - 5 = 1 > 0$: orientation is kept (and so is area)." },
        { text: "$\\begin{pmatrix}4&1\\\\3&1\\end{pmatrix}$", feedback: "$4 - 3 = 1 > 0$: orientation is kept." },
      ],
    },
    {
      type: "quiz",
      id: "mx2-1-q6",
      variant: "practice",
      question:
        "A 5 cm by 2 cm label is warped by $\\begin{pmatrix}3&-1\\\\2&1\\end{pmatrix}$. What is the area of the warped label?",
      options: [
        { text: "$15\\ \\text{cm}^2$", feedback: "Areas are multiplied by the determinant, not increased by it: $10 + 5$ adds instead of multiplying." },
        { text: "$50\\ \\text{cm}^2$", correct: true, feedback: "$\\det = 3\\cdot1 - (-1)\\cdot2 = 5$, and the label's area $10$ is multiplied by 5: $50\\ \\text{cm}^2$." },
        { text: "$10\\ \\text{cm}^2$", feedback: "That would need $\\det = 1$. Here $3 - (-2) = 5$: watch the double minus." },
      ],
      hint: "Find the original area, then multiply by $|\\det|$.",
    },
    {
      type: "quiz",
      id: "mx2-1-q7",
      variant: "practice",
      question:
        "For which real $\\lambda$ does $\\begin{pmatrix}\\lambda&1\\\\4&\\lambda\\end{pmatrix}$ multiply areas by 5 while keeping orientation?",
      options: [
        { text: "$\\lambda = 3$ or $\\lambda = -3$", correct: true, feedback: "Keeping orientation means $\\det = +5$: $\\lambda^2 - 4 = 5$, so $\\lambda^2 = 9$. Both signs work. ($\\det = -5$ would need $\\lambda^2 = -1$, which has no real solution.)" },
        { text: "$\\lambda = 3$ only", feedback: "$\\lambda^2 = 9$ has a negative root too, and $(-3)(-3) - 4 = 5$ as well." },
        { text: "$\\lambda = \\pm\\sqrt{5}$", feedback: "You set $\\lambda^2 = 5$ and forgot the $bc = 4$ term. The determinant is $\\lambda^2 - 4$." },
      ],
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "zero-determinant-squashing-the-plane",
  title: "2.2 · Zero Determinant: Squashing the Plane",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "If the determinant is the area of the parallelogram spanned by the columns, what does it mean for it to be **zero**? The parallelogram has no area. It has been flattened into a line segment, or even a single point.",
    },
    {
      type: "interactive",
      config: {
        component: "matrix-transform-grid",
        matrix: [
          [2, 1],
          [1, 1],
        ],
        showDeterminant: true,
        presets: [
          { label: "Start", matrix: [[2, 1], [1, 1]] },
          { label: "Almost flat", matrix: [[2, 3.5], [1, 2]] },
          { label: "Collapse", matrix: [[2, 4], [1, 2]] },
          { label: "Project onto x-axis", matrix: [[1, 0], [0, 0]] },
          { label: "Zero matrix", matrix: [[0, 0], [0, 0]] },
        ],
        caption:
          "Drag the tip of the second column towards the line through the first column. As the two columns line up, the shaded area shrinks to 0 and the whole grid collapses onto that line.",
      },
    },
    {
      type: "text",
      content:
        "The area is zero exactly when the two columns lie on the same line through the origin, which means one is a multiple of the other:",
    },
    {
      type: "math",
      latex:
        "ad - bc = 0 \\iff \\begin{pmatrix}b\\\\d\\end{pmatrix} = k\\begin{pmatrix}a\\\\c\\end{pmatrix} \\text{ (or column 1 is zero)} \\iff \\text{the columns are parallel}",
    },
    {
      type: "text",
      content:
        "You can check the algebra directly. If $b = ka$ and $d = kc$, then $ad - bc = a(kc) - (ka)c = 0$. Going the other way, suppose $ad = bc$ and $a \\ne 0$. Put $k = \\frac{b}{a}$. Then $b = ka$ and $d = \\frac{bc}{a} = kc$, so column 2 is $k$ times column 1. (If $a = 0$ but $c \\ne 0$, use $k = \\frac{d}{c}$ in the same way. If $a = c = 0$, column 1 is zero and the columns are trivially parallel.)",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Singular and non-singular",
      content:
        "A square matrix with $\\det A = 0$ is **singular**. It squashes the plane down to a line (or to the origin itself). A matrix with $\\det A \\ne 0$ is **non-singular**: the plane stays a plane.\n\nIn 3D, $\\det A = 0$ means the three columns lie in one plane, so space is flattened (onto a plane, a line or the origin).",
    },
    {
      type: "text",
      content:
        "**Worked example 1.** $A = \\begin{pmatrix}2&4\\\\1&2\\end{pmatrix}$.\n\n1. $\\det A = 2\\cdot2 - 4\\cdot1 = 0$, so $A$ is singular.\n2. The columns are $(2, 1)$ and $(4, 2)$, and the second is twice the first.\n3. Any input goes to $A\\begin{pmatrix}x\\\\y\\end{pmatrix} = x\\begin{pmatrix}2\\\\1\\end{pmatrix} + y\\begin{pmatrix}4\\\\2\\end{pmatrix} = (x + 2y)\\begin{pmatrix}2\\\\1\\end{pmatrix}$.\n4. So the whole plane lands on the line through the origin in direction $(2, 1)$, which is the line $y = \\frac{x}{2}$.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "A collapse cannot be undone",
      content:
        "In worked example 1, every point with $x + 2y = 3$ (for instance $(3, 0)$, $(1, 1)$ and $(-1, 2)$) lands on the same output $(6, 3)$. Given only the output, you cannot tell which input it came from. No transformation can un-squash a line back into a plane. Chapter 3 turns this into the rule that **a matrix has an inverse exactly when $\\det A \\ne 0$**.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (find $k$).** For which $k$ is $\\begin{pmatrix}k&2\\\\8&k\\end{pmatrix}$ singular?\n\n1. Set the determinant to zero: $k \\cdot k - 2 \\cdot 8 = 0$.\n2. $k^2 = 16$, so $k = 4$ or $k = -4$.\n3. Check $k = 4$: the columns are $(4, 8)$ and $(2, 4)$, and the first is twice the second. Check $k = -4$: the columns are $(-4, 8)$ and $(2, -4)$, and the first is $-2$ times the second. Both are parallel pairs.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (application): shadows.** Evening sunlight falls along the direction $(1, 1)$ onto flat ground, the $x$-axis. A point $(x, y)$ at height $y$ slides down along $(-1, -1)$ until it hits the ground, landing at $(x - y, 0)$.\n\n1. Write the shadow map as a matrix: $S\\begin{pmatrix}x\\\\y\\end{pmatrix} = \\begin{pmatrix}x - y\\\\0\\end{pmatrix}$, so $S = \\begin{pmatrix}1&-1\\\\0&0\\end{pmatrix}$. *Why:* column 1 is where $\\hat{\\imath}$ lands, $(1, 0)$, and column 2 is where $\\hat{\\jmath}$ lands, $(-1, 0)$.\n2. $\\det S = 1\\cdot0 - (-1)\\cdot0 = 0$. The columns $(1, 0)$ and $(-1, 0)$ are parallel, so the plane is flattened onto the ground line.\n3. Consequence: the points $(3, 1)$, $(4, 2)$ and $(5, 3)$ all cast the shadow $(2, 0)$. A short post near the wall and a tall post further away can have the same shadow.\n\nThis is why one shadow, or one X-ray photograph, cannot tell you the full shape of an object: the map from object to image is singular, and information about depth is lost. CT scanners combine many projections from different angles for exactly this reason.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (exam style).** Find all $k$ for which $A = \\begin{pmatrix}k-1&2\\\\3&k-2\\end{pmatrix}$ is singular, and for each value name the line onto which $A$ squashes the plane.\n\n1. $\\det A = (k-1)(k-2) - 2\\cdot3 = k^2 - 3k + 2 - 6 = k^2 - 3k - 4$.\n2. Set it to zero: $(k - 4)(k + 1) = 0$, so $k = 4$ or $k = -1$. *Why:* singular means zero area scale factor, and nothing else.\n3. $k = 4$: $A = \\begin{pmatrix}3&2\\\\3&2\\end{pmatrix}$. The columns $(3, 3)$ and $(2, 2)$ both point along $(1, 1)$, so the plane lands on the line $y = x$.\n4. $k = -1$: $A = \\begin{pmatrix}-2&2\\\\3&-3\\end{pmatrix}$. Column 2 is $-1$ times column 1, and both point along $(2, -3)$, so the plane lands on $y = -\\frac{3}{2}x$.\n\n*Why step 3 and 4 use the columns:* every output $A\\mathbf{v}$ is a combination of the columns, so when the columns are parallel the outputs all lie along their common direction.",
    },
    {
      type: "table",
      headers: ["$\\det A$", "Image of the plane", "Example"],
      rows: [
        ["$\\ne 0$", "The whole plane (areas scaled by $|\\det A|$)", "$\\begin{pmatrix}3&1\\\\1&2\\end{pmatrix}$"],
        ["$0$, but $A \\ne O$", "A line through the origin", "$\\begin{pmatrix}2&4\\\\1&2\\end{pmatrix}$, $\\begin{pmatrix}1&0\\\\0&0\\end{pmatrix}$"],
        ["$0$ with $A = O$", "The single point $O$", "$\\begin{pmatrix}0&0\\\\0&0\\end{pmatrix}$"],
      ],
    },
    {
      type: "quiz",
      id: "mx2-2-q1",
      variant: "concept",
      question: "You are told $\\det A = 0$ for a $2\\times2$ matrix $A$. Which conclusion is safe?",
      options: [
        {
          text: "$A$ is the zero matrix.",
          feedback: "$\\begin{pmatrix}1&2\\\\2&4\\end{pmatrix}$ has determinant $4 - 4 = 0$ and no zero entries. The zero matrix is just the most extreme case.",
        },
        {
          text: "The columns of $A$ are parallel: one is a multiple of the other.",
          correct: true,
          feedback: "Zero area means the spanning parallelogram is flat, so the columns lie on one line through the origin.",
        },
        {
          text: "$A$ has a row of zeros.",
          feedback: "A zero row does force $\\det A = 0$, but the reverse is false: $\\begin{pmatrix}1&2\\\\2&4\\end{pmatrix}$ is singular with no zero row.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx2-2-q2",
      variant: "practice",
      question: "For which $k$ is $\\begin{pmatrix}k&6\\\\2&3\\end{pmatrix}$ singular?",
      options: [
        { text: "$k = 9$", feedback: "Substitute it back: $3 \\cdot 9 - 12 = 15 \\ne 0$. The condition is $3k - 12 = 0$." },
        { text: "$k = 4$", correct: true, feedback: "$3k - 12 = 0$ gives $k = 4$. The columns become $(4, 2)$ and $(6, 3)$, both multiples of $(2, 1)$." },
        { text: "$k = -4$", feedback: "Check the sign: $3k - 6\\cdot2 = 0$ gives $k = +4$." },
      ],
    },
    {
      type: "quiz",
      id: "mx2-2-q3",
      variant: "practice",
      question: "For which values of $k$ does $\\begin{pmatrix}k&3\\\\12&k\\end{pmatrix}$ squash the plane onto a line?",
      options: [
        { text: "$k = 6$ or $k = -6$", correct: true, feedback: "$k^2 - 36 = 0$ has two roots, and both make the columns parallel: $(6, 12) = 2(3, 6)$ and $(-6, 12) = -2(3, -6)$." },
        { text: "$k = 6$ only", feedback: "$k^2 = 36$ has a negative root too. With $k = -6$ the columns are $(-6, 12)$ and $(3, -6)$, which are parallel." },
        { text: "$k = 36$", feedback: "36 is $k^2$, not $k$. Take the square root, and remember both signs." },
      ],
    },
    {
      type: "quiz",
      id: "mx2-2-q4",
      variant: "concept",
      question: "Where does $\\begin{pmatrix}3&-6\\\\1&-2\\end{pmatrix}$ send the whole plane?",
      options: [
        { text: "Onto the single point $O$", feedback: "Only the zero matrix does that. Here the output $(x - 2y)(3, 1)$ can be any multiple of $(3, 1)$." },
        { text: "Onto the line $y = 3x$", feedback: "The direction is the column $(3, 1)$, which rises 1 for every 3 across. That is $y = \\frac{x}{3}$." },
        { text: "Onto the line through $O$ in the direction $(3, 1)$, i.e. $y = \\frac{x}{3}$", correct: true, feedback: "Column 2 is $-2$ times column 1, so every output is $x(3, 1) + y(-6, -2) = (x - 2y)(3, 1)$, a multiple of $(3, 1)$." },
      ],
      hint: "Write $A\\mathbf{v}$ as $x$ times column 1 plus $y$ times column 2.",
    },
    {
      type: "quiz",
      id: "mx2-2-q5",
      variant: "practice",
      question: "Which of these matrices is singular?",
      options: [
        { text: "$\\begin{pmatrix}4&-6\\\\-2&3\\end{pmatrix}$", correct: true, feedback: "$12 - 12 = 0$. Column 2 is $-\\frac{3}{2}$ times column 1." },
        { text: "$\\begin{pmatrix}3&6\\\\1&-2\\end{pmatrix}$", feedback: "$-6 - 6 = -12 \\ne 0$: non-singular (and orientation-reversing)." },
        { text: "$\\begin{pmatrix}2&3\\\\3&2\\end{pmatrix}$", feedback: "$4 - 9 = -5 \\ne 0$." },
      ],
    },
    {
      type: "quiz",
      id: "mx2-2-q6",
      variant: "practice",
      question: "For which $k$ is $\\begin{pmatrix}k+1&3\\\\2&k\\end{pmatrix}$ singular?",
      options: [
        { text: "$k = 2$ or $k = -3$", correct: true, feedback: "$k(k+1) - 6 = k^2 + k - 6 = (k - 2)(k + 3)$. At $k = 2$ the columns are $(3, 2)$ and $(3, 2)$; at $k = -3$ they are $(-2, 2)$ and $(3, -3)$. Parallel both times." },
        { text: "$k = -2$ or $k = 3$", feedback: "The signs of the roots slipped. $(k - 2)(k + 3) = 0$ gives $k = 2$ or $k = -3$; substitute $k = 3$ to see $12 - 6 = 6 \\ne 0$." },
        { text: "$k = 2$ only", feedback: "The quadratic $k^2 + k - 6$ has two roots. $k = -3$ gives $(-3)(-2) - 6 = 0$ as well." },
      ],
      hint: "Expand $(k+1)k - 3\\cdot2$ and factor.",
    },
    {
      type: "quiz",
      id: "mx2-2-q7",
      variant: "practice",
      question:
        "The singular map $\\begin{pmatrix}1&2\\\\0&0\\end{pmatrix}$ sends $(x, y)$ to $(x + 2y, 0)$. Which point lands on the same output as $(5, 0)$?",
      options: [
        { text: "$(2, 1)$", feedback: "$2 + 2\\cdot1 = 4$, so it lands on $(4, 0)$, not $(5, 0)$." },
        { text: "$(1, 2)$", correct: true, feedback: "$1 + 2\\cdot2 = 5$, so it lands on $(5, 0)$ too. Every point on the line $x + 2y = 5$ is crushed to the same output, which is why a singular map cannot be undone." },
        { text: "$(0, 5)$", feedback: "$0 + 2\\cdot5 = 10$, so it lands on $(10, 0)$." },
      ],
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "three-by-three-determinants",
  title: "2.3 · 3×3 Determinants: Minors, Cofactors, Expansion",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "In space, a $3\\times3$ matrix sends the unit cube to a slanted box (a **parallelepiped**) whose edges are the three columns. Its determinant is the **signed volume** of that box: $|\\det A|$ is the factor by which volumes change, and a negative sign means space has been mirrored (a right hand turned into a left hand).",
    },
    {
      type: "interactive",
      config: {
        component: "vec-space-3d",
        mode: "triple",
        a: [2, 0, 5],
        b: [1, 4, 2],
        c: [3, -1, 1],
        showNormal: false,
        readouts: ["volume"],
        caption:
          "The three arrows are the columns (2, 0, 5), (1, 4, 2) and (3, −1, 1) of the matrix in Worked example 1 below: the unit cube's edges î, ĵ, k̂ land on them, and the cube becomes this slanted box. Drag to rotate. The readout's bracket notation comes from Vector Algebra; here it is just det A = −53. The size 53 is the box's volume, and the minus sign says the three edges are in left-handed order.",
      },
    },
    {
      type: "text",
      content:
        "We need a way to compute it. The plan is to reduce one $3\\times3$ determinant to three $2\\times2$ ones, which we already know how to evaluate. That needs two pieces of vocabulary.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Minor and cofactor",
      content:
        "The **minor** $M_{ij}$ of entry $a_{ij}$ is the determinant left after deleting row $i$ and column $j$.\n\nThe **cofactor** is the minor with a sign attached: $C_{ij} = (-1)^{i+j} M_{ij}$.",
    },
    {
      type: "text",
      content:
        "The sign $(-1)^{i+j}$ is $+$ when $i + j$ is even and $-$ when it is odd. It makes a checkerboard that starts with $+$ in the top-left corner:",
    },
    { type: "math", latex: "\\begin{pmatrix}+&-&+\\\\-&+&-\\\\+&-&+\\end{pmatrix}" },
    {
      type: "callout",
      variant: "definition",
      title: "Expansion along a row or column",
      content:
        "Pick **any** row or column. Multiply each entry by its cofactor and add. For row 1:\n$\\det A = a_{11}C_{11} + a_{12}C_{12} + a_{13}C_{13}$.\nEvery row and every column gives the same answer.",
    },
    { type: "text", content: "Written out along row 1, with the checkerboard signs visible:" },
    {
      type: "math",
      latex:
        "\\begin{vmatrix}a_{11}&a_{12}&a_{13}\\\\a_{21}&a_{22}&a_{23}\\\\a_{31}&a_{32}&a_{33}\\end{vmatrix} = a_{11}\\begin{vmatrix}a_{22}&a_{23}\\\\a_{32}&a_{33}\\end{vmatrix} - a_{12}\\begin{vmatrix}a_{21}&a_{23}\\\\a_{31}&a_{33}\\end{vmatrix} + a_{13}\\begin{vmatrix}a_{21}&a_{22}\\\\a_{31}&a_{32}\\end{vmatrix}",
    },
    {
      type: "text",
      content:
        "**Where the formula comes from.** Volume depends linearly on each edge: stretch one edge by 2 and the volume doubles, and if an edge is a sum of two vectors, the volume is the sum of the two volumes. The edges are the columns, so split the first column along the axes:\n\n$(a_{11}, a_{21}, a_{31}) = a_{11}\\hat{e}_1 + a_{21}\\hat{e}_2 + a_{31}\\hat{e}_3$.\n\nSo $\\det A$ is a sum of three boxes. In the first, the first edge is $a_{11}\\hat{e}_1$, pointing straight along the $x$-axis. Shearing the other two edges along $\\hat{e}_1$ does not change the volume, and it wipes out their first entries, leaving $(0, a_{22}, a_{32})$ and $(0, a_{23}, a_{33})$ in the $yz$-plane. Now the box is a base in the $yz$-plane of signed area $M_{11} = \\begin{vmatrix}a_{22}&a_{23}\\\\a_{32}&a_{33}\\end{vmatrix}$ with height $a_{11}$, so its volume is $a_{11}M_{11}$.\n\nThe boxes with first edge $a_{21}\\hat{e}_2$ and $a_{31}\\hat{e}_3$ work the same way, giving $a_{21}M_{21}$ and $a_{31}M_{31}$ up to sign. The sign comes from orientation: treating $\\hat{e}_2$ (or $\\hat{e}_3$) as the leading axis reorders the axes, and each swap flips the sign. The result is expansion down column 1:",
    },
    {
      type: "math",
      latex: "\\det A = a_{11}M_{11} - a_{21}M_{21} + a_{31}M_{31}",
    },
    {
      type: "text",
      content:
        "Expanding along row 1, as in the formula above, gives the same number. Rows can play the role of edges too, because $\\det A^T = \\det A$, which 2.4 shows. The worked example below checks both routes.",
    },
    {
      type: "text",
      content:
        "**Worked example 1.** $A = \\begin{pmatrix}2&1&3\\\\0&4&-1\\\\5&2&1\\end{pmatrix}$, expanded along row 1.\n\n1. $a_{11} = 2$ with sign $+$: $M_{11} = \\begin{vmatrix}4&-1\\\\2&1\\end{vmatrix} = 4 + 2 = 6$.\n2. $a_{12} = 1$ with sign $-$: $M_{12} = \\begin{vmatrix}0&-1\\\\5&1\\end{vmatrix} = 0 + 5 = 5$, so $C_{12} = -5$.\n3. $a_{13} = 3$ with sign $+$: $M_{13} = \\begin{vmatrix}0&4\\\\5&2\\end{vmatrix} = 0 - 20 = -20$.\n4. $\\det A = 2(6) + 1(-5) + 3(-20) = 12 - 5 - 60 = -53$.",
    },
    {
      type: "text",
      content:
        "**Check along column 1.** Column 1 is $(2, 0, 5)$, and its zero removes a term.\n\n1. $2 \\cdot C_{11} = 2 \\cdot 6 = 12$.\n2. $0 \\cdot C_{21} = 0$, so there is nothing to compute.\n3. $5 \\cdot C_{31}$, where $C_{31} = +\\begin{vmatrix}1&3\\\\4&-1\\end{vmatrix} = -1 - 12 = -13$.\n4. $\\det A = 12 + 0 + 5(-13) = 12 - 65 = -53$. It matches.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Expand along the line with the most zeros",
      content:
        "Every zero entry removes a whole $2\\times2$ determinant from the work. Scan all six rows and columns first and pick the one with the most zeros. Also, for a **triangular** matrix (all zeros above or below the diagonal), the determinant is just the product of the diagonal entries. (Expand down column 1 for an upper triangular matrix, or along row 1 for a lower triangular one, where only $a_{11}$ is non-zero. The minor is triangular again, so repeat: only the diagonal entries survive.)",
    },
    {
      type: "text",
      content:
        "**Worked example 2.** $B = \\begin{pmatrix}3&0&2\\\\1&0&-4\\\\2&5&1\\end{pmatrix}$. Column 2 holds two zeros, so expand along it.\n\n1. Only $a_{32} = 5$ survives. Position $(3,2)$ has $i + j = 5$, which is odd, so the sign is $-$.\n2. $M_{32}$: delete row 3 and column 2, leaving $\\begin{vmatrix}3&2\\\\1&-4\\end{vmatrix} = -12 - 2 = -14$.\n3. $C_{32} = -(-14) = 14$.\n4. $\\det B = 5 \\times 14 = 70$.\n\nExpanding along row 1 instead gives $3(0 + 20) - 0 + 2(5 - 0) = 60 + 10 = 70$.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (application): the volume of a crystal cell.** In a crystal, atoms repeat in a slanted box called the unit cell. For one (made-up) triclinic crystal the three edge vectors, in ångströms, are $(2, 1, 0)$, $(0, 3, 1)$ and $(1, 0, 2)$. What is the volume of the cell?\n\n1. Put the edges in as columns: $A = \\begin{pmatrix}2&0&1\\\\1&3&0\\\\0&1&2\\end{pmatrix}$. *Why:* the unit cube's edges go to the columns, so $|\\det A|$ is the box's volume.\n2. Row 1 has a zero in the middle, so expand along it (signs $+\\,-\\,+$).\n3. $a_{11} = 2$: $M_{11} = \\begin{vmatrix}3&0\\\\1&2\\end{vmatrix} = 6$, giving $+2 \\cdot 6 = 12$.\n4. $a_{12} = 0$: nothing to compute.\n5. $a_{13} = 1$: $M_{13} = \\begin{vmatrix}1&3\\\\0&1\\end{vmatrix} = 1$, giving $+1 \\cdot 1 = 1$.\n6. $\\det A = 12 + 1 = 13$, so the cell's volume is $13\\ \\text{Å}^3$. The sign is positive, so the three edges, taken in this order, form a right-handed set.\n\nChemists use exactly this number to compute a crystal's density: the mass of the atoms in one cell divided by its volume.",
    },
    {
      type: "text",
      content:
        "**Sarrus' rule, a 3×3-only check.** Copy the first two columns to the right of the matrix. Add the three products running down to the right, then subtract the three products running up to the right. For $A$ above:\n\n- Down: $2\\cdot4\\cdot1 + 1\\cdot(-1)\\cdot5 + 3\\cdot0\\cdot2 = 8 - 5 + 0 = 3$\n- Up: $3\\cdot4\\cdot5 + 2\\cdot(-1)\\cdot2 + 1\\cdot0\\cdot1 = 60 - 4 + 0 = 56$\n- $\\det A = 3 - 56 = -53$. It agrees.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Sarrus does not generalise",
      content:
        "A $3\\times3$ determinant has $3! = 6$ terms, and Sarrus' six diagonals happen to list exactly those. A $4\\times4$ determinant has $4! = 24$ terms, but the diagonal pattern only produces 8. For $4\\times4$ and larger, use cofactor expansion (or the row operations of 2.4).",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (exam style): solve a determinant equation.** Find all real $x$ with $\\begin{vmatrix}1&x&2\\\\2&1&x\\\\x&2&1\\end{vmatrix} = 0$.\n\n1. No row or column has a zero, so expand along row 1 (signs $+\\,-\\,+$).\n2. $M_{11} = \\begin{vmatrix}1&x\\\\2&1\\end{vmatrix} = 1 - 2x$.\n3. $M_{12} = \\begin{vmatrix}2&x\\\\x&1\\end{vmatrix} = 2 - x^2$, and it enters with a minus sign: $-x(2 - x^2) = x^3 - 2x$.\n4. $M_{13} = \\begin{vmatrix}2&1\\\\x&2\\end{vmatrix} = 4 - x$, giving $+2(4 - x) = 8 - 2x$.\n5. Add: $(1 - 2x) + (x^3 - 2x) + (8 - 2x) = x^3 - 6x + 9$.\n6. Try small integer roots (they must divide 9). $x = -3$: $-27 + 18 + 9 = 0$. So $(x + 3)$ is a factor: $x^3 - 6x + 9 = (x + 3)(x^2 - 3x + 3)$.\n7. The quadratic has discriminant $9 - 12 = -3 < 0$, so it has no real roots. *Why check:* a cubic can have up to three real roots, and an exam answer that lists only one needs a reason.\n\nAnswer: $x = -3$ is the only real solution. Check it: at $x = -3$ the rows are $(1, -3, 2)$, $(2, 1, -3)$, $(-3, 2, 1)$, and they add to $(0, 0, 0)$, so the three row vectors lie in one plane.",
    },
    {
      type: "math",
      latex: "x^3 - 6x + 9 = (x + 3)(x^2 - 3x + 3) = 0 \\implies x = -3",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (exam style): the wrong cofactors give zero.** A CBSE favourite: for $A = \\begin{pmatrix}2&1&3\\\\0&4&-1\\\\5&2&1\\end{pmatrix}$ from Worked example 1, compute $a_{11}C_{21} + a_{12}C_{22} + a_{13}C_{23}$ (row 1 entries with row 2 cofactors).\n\n1. $C_{21} = -\\begin{vmatrix}1&3\\\\2&1\\end{vmatrix} = -(1 - 6) = 5$.\n2. $C_{22} = +\\begin{vmatrix}2&3\\\\5&1\\end{vmatrix} = 2 - 15 = -13$.\n3. $C_{23} = -\\begin{vmatrix}2&1\\\\5&2\\end{vmatrix} = -(4 - 5) = 1$.\n4. Row 2's own entries give the determinant: $0(5) + 4(-13) + (-1)(1) = -53$. It matches.\n5. Row 1's entries instead: $2(5) + 1(-13) + 3(1) = 10 - 13 + 3 = 0$.\n\n*Why zero?* The cofactors of row 2 never look at row 2 itself. So $a_{11}C_{21} + a_{12}C_{22} + a_{13}C_{23}$ is the expansion of the matrix you get by overwriting row 2 with a copy of row 1. That matrix has two equal rows, a flat box, and 2.4 shows its determinant is 0. This fact is the engine behind the inverse formula in Chapter 3.",
    },
    {
      type: "quiz",
      id: "mx2-3-q1",
      variant: "concept",
      question:
        "For $A = \\begin{pmatrix}2&1&3\\\\0&4&-1\\\\5&2&1\\end{pmatrix}$ the minor $M_{12} = 5$. What is the cofactor $C_{12}$?",
      options: [
        { text: "$5$", feedback: "That is the minor. The cofactor carries the sign $(-1)^{i+j}$, which is negative here." },
        { text: "$-53$", feedback: "That is the full determinant of $A$, not a single cofactor." },
        { text: "$-5$", correct: true, feedback: "$C_{12} = (-1)^{1+2} M_{12} = -5$. Position $(1,2)$ is a minus square on the checkerboard." },
      ],
    },
    {
      type: "quiz",
      id: "mx2-3-q2",
      variant: "practice",
      question: "Evaluate $\\begin{vmatrix}1&2&3\\\\0&1&4\\\\5&6&0\\end{vmatrix}$.",
      options: [
        { text: "$-79$", feedback: "You added all three terms. The middle term takes a minus sign: $-2(0 - 20) = +40$." },
        { text: "$1$", correct: true, feedback: "$1(0 - 24) - 2(0 - 20) + 3(0 - 5) = -24 + 40 - 15 = 1$." },
        { text: "$31$", feedback: "You dropped the sign on the third term: $-24 + 40 + 15$. The minor $M_{13} = 0 - 5 = -5$ is negative, so the term is $3(-5) = -15$." },
      ],
      hint: "Row 1, signs $+\\,-\\,+$. Or expand along column 1, which has a zero.",
    },
    {
      type: "quiz",
      id: "mx2-3-q3",
      variant: "concept",
      question: "Can Sarrus' diagonal rule compute a $4\\times4$ determinant?",
      options: [
        {
          text: "Yes, if you copy the first three columns instead of two.",
          feedback: "That still gives only 8 diagonal products, while the determinant needs $4! = 24$ terms.",
        },
        {
          text: "No. A $4\\times4$ determinant has 24 terms, and the diagonal pattern gives only 8.",
          correct: true,
          feedback: "Sarrus happens to work for $3\\times3$ because $3! = 6$ matches its six diagonals. Use cofactor expansion instead.",
        },
        {
          text: "Yes, it works for any square matrix.",
          feedback: "It works only for $3\\times3$ (and trivially $2\\times2$).",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx2-3-q4",
      variant: "practice",
      question: "Evaluate $\\begin{vmatrix}4&0&0\\\\7&2&0\\\\1&5&3\\end{vmatrix}$.",
      options: [
        { text: "$0$", feedback: "Zeros above the diagonal do not make the determinant zero. Only a zero on the diagonal would." },
        { text: "$29$", feedback: "The entries below the diagonal do not contribute. Expand along row 1: $4 \\cdot \\begin{vmatrix}2&0\\\\5&3\\end{vmatrix} = 24$." },
        { text: "$24$", correct: true, feedback: "It is lower triangular, so the determinant is $4 \\cdot 2 \\cdot 3$. Expanding along row 1 confirms it: $4(6 - 0) = 24$." },
      ],
    },
    {
      type: "quiz",
      id: "mx2-3-q5",
      variant: "practice",
      question:
        "For $A = \\begin{pmatrix}2&1&3\\\\0&4&-1\\\\5&2&1\\end{pmatrix}$, find the cofactor $C_{23}$.",
      options: [
        { text: "$1$", correct: true, feedback: "Delete row 2 and column 3: $M_{23} = \\begin{vmatrix}2&1\\\\5&2\\end{vmatrix} = 4 - 5 = -1$. The sign $(-1)^{5} = -1$ gives $C_{23} = 1$." },
        { text: "$-1$", feedback: "That is the minor $M_{23}$. Position $(2,3)$ has $i + j = 5$, which is odd, so the sign flips it to $+1$." },
        { text: "$-13$", feedback: "That is $M_{22} = \\begin{vmatrix}2&3\\\\5&1\\end{vmatrix} = 2 - 15$: you deleted column 2. Delete row 2 and column 3, leaving $\\begin{pmatrix}2&1\\\\5&2\\end{pmatrix}$." },
      ],
    },
    {
      type: "quiz",
      id: "mx2-3-q6",
      variant: "practice",
      question:
        "A slanted box has edges $(1, 0, 2)$, $(0, 3, 1)$ and $(2, 1, 0)$. What is its volume?",
      options: [
        { text: "$-13$", feedback: "That is the determinant, which is a *signed* volume. The minus sign only says the edges are in left-handed order; the volume itself is the modulus." },
        { text: "$13$", correct: true, feedback: "With the edges as columns, expand along row 1 $(1, 0, 2)$: $1(0 - 1) - 0 + 2(0 - 6) = -1 - 12 = -13$. Volume $= |{-13}| = 13$." },
        { text: "$11$", feedback: "A sign slipped in the last term. $M_{13} = \\begin{vmatrix}0&3\\\\2&1\\end{vmatrix} = 0 - 6 = -6$, so the term is $2(-6) = -12$ and the total is $-13$." },
      ],
      hint: "Put the edges in as columns and expand along the row with a zero.",
    },
    {
      type: "quiz",
      id: "mx2-3-q7",
      variant: "practice",
      question:
        "$A = \\begin{pmatrix}1&2&3\\\\0&1&4\\\\5&6&0\\end{pmatrix}$ has $\\det A = 1$, and its row 3 cofactors are $C_{31} = 5$, $C_{32} = -4$, $C_{33} = 1$. What is $a_{11}C_{31} + a_{12}C_{32} + a_{13}C_{33}$?",
      options: [
        { text: "$0$", correct: true, feedback: "$1(5) + 2(-4) + 3(1) = 0$. Row 1 entries with row 3 cofactors expand a matrix whose row 3 is a copy of row 1: two equal rows, zero volume." },
        { text: "$1$", feedback: "That is $\\det A$, which uses row 3's *own* entries: $5(5) + 6(-4) + 0(1) = 1$. Row 1's entries with row 3's cofactors give something else." },
        { text: "$16$", feedback: "You dropped the sign on $C_{32}$: $5 + 8 + 3$. With $C_{32} = -4$ the sum is $5 - 8 + 3 = 0$." },
      ],
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "properties-from-the-picture",
  title: "2.4 · Properties from the Picture",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "Because a determinant is a signed area or volume, you can predict what each row or column change does to it before computing anything. Each property below is a statement about parallelograms.",
    },
    {
      type: "text",
      content:
        "**First: rows and columns behave the same.** For a $2\\times2$, $\\det A^T = ad - cb = \\det A$. For a $3\\times3$, expanding $A^T$ along its first row is the same calculation as expanding $A$ along its first column. So",
    },
    { type: "math", latex: "\\det A^T = \\det A" },
    {
      type: "text",
      content:
        "and every property below that mentions rows holds for columns too.",
    },
    {
      type: "text",
      content:
        "**1. Swapping two rows flips the sign.** Swapping the two edges of a parallelogram reverses the turning direction from edge 1 to edge 2. The area is the same, but the orientation is opposite: $\\begin{vmatrix}c&d\\\\a&b\\end{vmatrix} = cb - da = -(ad - bc)$.\n\n**2. Scaling one row by $k$ scales the determinant by $k$.** Stretch one edge of a parallelogram by $k$ and its area is multiplied by $k$.\n\n**3. Adding a multiple of one row to another leaves the determinant unchanged.** This is a shear: one edge slides along the direction of the other. The base stays the same and so does the height, so the area is unchanged.",
    },
    {
      type: "interactive",
      config: {
        component: "matrix-transform-grid",
        matrix: [
          [1, 1.5],
          [0, 1],
        ],
        showDeterminant: true,
        presets: [
          { label: "Shear 1.5", matrix: [[1, 1.5], [0, 1]] },
          { label: "Shear 3", matrix: [[1, 3], [0, 1]] },
          { label: "Shear −2", matrix: [[1, -2], [0, 1]] },
          { label: "Swap columns", matrix: [[0, 1], [1, 0]] },
          { label: "Scale one column", matrix: [[3, 0], [0, 1]] },
        ],
        caption:
          "Every shear slides the top edge of the square along its own line, so base and height stay the same. The determinant stays at 1 however far you shear. Compare with swapping (sign flips) and scaling one column (area triples).",
      },
    },
    {
      type: "text",
      content:
        "**4. Two equal rows give 0.** Swap the two equal rows. The matrix does not change, but property 1 says the determinant changes sign. So $D = -D$, which forces $D = 0$. Geometrically, two identical edges span a flat shape.\n\n**5. Proportional rows give 0.** Take the factor $k$ out (property 2) and you have two equal rows.\n\n**6. A row of zeros gives 0.** One edge has length zero, so the box is flat.\n\n**7. A row that is a sum splits the determinant.** Volume is linear in each edge:\n$\\begin{vmatrix}a_1 + b_1 & a_2 + b_2\\\\c&d\\end{vmatrix} = \\begin{vmatrix}a_1&a_2\\\\c&d\\end{vmatrix} + \\begin{vmatrix}b_1&b_2\\\\c&d\\end{vmatrix}$.",
    },
    {
      type: "text",
      content:
        "**8. $\\det(AB) = \\det A \\cdot \\det B$.** $AB$ means \"apply $B$, then $A$\". $B$ multiplies every area by $\\det B$, then $A$ multiplies the result by $\\det A$. Scale factors of successive transformations multiply.",
    },
    {
      type: "text",
      content:
        "Check it with numbers. $A = \\begin{pmatrix}2&1\\\\1&1\\end{pmatrix}$ has $\\det A = 1$ and $B = \\begin{pmatrix}3&0\\\\1&2\\end{pmatrix}$ has $\\det B = 6$. Then $AB = \\begin{pmatrix}7&2\\\\4&2\\end{pmatrix}$ and $\\det(AB) = 14 - 8 = 6 = 1 \\times 6$.\n\nThis gives some useful results immediately. $\\det(BA) = \\det(AB)$ even though $BA \\ne AB$. Also $\\det(A^n) = (\\det A)^n$.\n\nAnd if $A$ has an inverse, $AA^{-1} = I$ gives $\\det A \\cdot \\det(A^{-1}) = \\det I = 1$, so $\\det(A^{-1}) = \\frac{1}{\\det A}$. The undoing transformation shrinks areas by exactly the factor $A$ stretched them. This also shows that a matrix with $\\det A = 0$ can have no inverse, since nothing times 0 is 1.",
    },
    {
      type: "text",
      content:
        "**9. Odd-order skew-symmetric determinants vanish.** If $A$ is skew-symmetric ($A^T = -A$) and $n$ is odd, then\n$\\det A = \\det A^T = \\det(-A) = (-1)^n \\det A = -\\det A$\n(negating $A$ negates each of its $n$ rows, a factor of $-1$ per row), so $2\\det A = 0$ and $\\det A = 0$. Every $3\\times3$ skew-symmetric matrix is singular, whatever its entries. (For even $n$ this fails: $\\begin{vmatrix}0&1\\\\-1&0\\end{vmatrix} = 1$.)",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Two tempting non-rules",
      content:
        "**$\\det(kA) \\ne k\\det A$.** Multiplying the matrix by $k$ scales *every* row, so property 2 applies $n$ times: $\\det(kA) = k^n \\det A$ for an $n\\times n$ matrix. In the plane, doubling every length multiplies areas by $2^2 = 4$.\n\n**$\\det(A + B) \\ne \\det A + \\det B$.** Take $A = B = I_2$. Then $\\det(A + B) = \\det(2I) = 4$, but $\\det A + \\det B = 2$. The determinant respects products, not sums of whole matrices.",
    },
    {
      type: "table",
      headers: ["Operation on a square matrix", "Effect on the determinant", "Picture"],
      rows: [
        ["$R_i \\leftrightarrow R_j$", "$\\times(-1)$", "Orientation reversed"],
        ["$R_i \\to kR_i$", "$\\times k$", "One edge stretched"],
        ["$R_i \\to R_i + kR_j$", "Unchanged", "A shear"],
        ["Two equal / proportional rows", "$= 0$", "Flat box"],
        ["$A \\to A^T$", "Unchanged", "Rows and columns interchangeable"],
        ["$A \\to kA$ ($n\\times n$)", "$\\times k^n$", "Every edge stretched"],
        ["$A \\to AB$", "$\\det A \\cdot \\det B$", "Scale factors multiply"],
        ["$A \\to A^{-1}$", "$\\frac{1}{\\det A}$", "The undo shrinks by the same factor"],
        ["$A^T = -A$, $n$ odd", "$= 0$", "Skew-symmetric of odd order"],
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 1.** $A$ is $3\\times3$ with $\\det A = 4$.\n\n1. $\\det(2A) = 2^3 \\cdot 4 = 32$.\n2. $\\det(-A) = (-1)^3 \\cdot 4 = -4$.\n3. $\\det(A^T) = 4$.\n4. $\\det(A^2) = 4^2 = 16$.",
    },
    {
      type: "text",
      content:
        "**Worked example 2.** Suppose $\\begin{vmatrix}a&b&c\\\\d&e&f\\\\g&h&i\\end{vmatrix} = 5$.\n\n1. $\\begin{vmatrix}d&e&f\\\\a&b&c\\\\2g&2h&2i\\end{vmatrix}$: one swap ($\\times(-1)$) and one row scaled by 2 ($\\times 2$), giving $5 \\times (-1) \\times 2 = -10$.\n2. $\\begin{vmatrix}a&b&c\\\\d+2a&e+2b&f+2c\\\\g&h&i\\end{vmatrix}$: this is $R_2 \\to R_2 + 2R_1$, a shear, so the value stays $5$.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (routine): chaining the rules.** $A$ and $B$ are $3\\times3$ with $\\det A = 3$ and $\\det B = -2$.\n\n1. $\\det(2AB^T) = 2^3 \\cdot \\det A \\cdot \\det B^T = 8 \\cdot 3 \\cdot (-2) = -48$. *Why $2^3$:* the scalar 2 stretches all three rows. *Why $\\det B^T = \\det B$:* transposing never changes a determinant.\n2. $\\det(A^{-1}B^2) = \\frac{1}{\\det A} \\cdot (\\det B)^2 = \\frac{1}{3} \\cdot 4 = \\frac{4}{3}$. *Why:* the inverse undoes $A$'s scaling, and $B$ applied twice scales by $(-2)^2$.\n3. $\\det\\big((AB)^{-1}\\big) = \\frac{1}{\\det A \\det B} = \\frac{1}{-6} = -\\frac{1}{6}$. Undoing a flip is still a flip, so the sign stays negative.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (application): a growing game sprite.** A game applies $T = \\begin{pmatrix}1&2\\\\-1&1\\end{pmatrix}$ to a sprite of area $5$ square units once every frame.\n\n1. $\\det T = 1\\cdot1 - 2\\cdot(-1) = 3$, so each frame multiplies the area by 3.\n2. After 4 frames the matrix applied is $T^4$, and $\\det(T^4) = 3^4 = 81$. The area is $5 \\times 81 = 405$. *Why this is quicker:* we never compute $T^4$ itself; the product rule lets the scale factors multiply.\n3. When does the area first pass $10\\,000$? Need $5 \\cdot 3^n > 10\\,000$, i.e. $3^n > 2000$. Since $3^6 = 729$ and $3^7 = 2187$, it happens on frame $n = 7$.\n\nThe same reasoning is how graphics engines sanity-check a chain of transformations: if the product of the determinants is 0 somewhere, a model has been flattened and will vanish from the screen.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (exam style): a trap with simultaneous operations.** $A$ is $3\\times3$ with rows $R_1, R_2, R_3$ and $\\det A = 5$. Find the determinant $D$ of the matrix with rows $R_1 + 2R_3,\\ 3R_2,\\ R_3 - R_1$.\n\nThe tempting answer is \"two shears and one scaling, so $3 \\times 5 = 15$\". That is wrong. Both new rows are built from the **original** rows, so they are not two shears applied one after the other. Work step by step instead, using only honest row operations:\n\n1. Take the 3 out of row 2: $D = 3 \\cdot \\det(R_1 + 2R_3,\\ R_2,\\ R_3 - R_1)$.\n2. Add row 3 to row 1 (a genuine shear, value unchanged): $(R_1 + 2R_3) + (R_3 - R_1) = 3R_3$. So $D = 3 \\cdot \\det(3R_3,\\ R_2,\\ R_3 - R_1)$.\n3. Take the 3 out of row 1: $D = 9 \\cdot \\det(R_3,\\ R_2,\\ R_3 - R_1)$.\n4. Subtract row 1 from row 3 (a shear): $(R_3 - R_1) - R_3 = -R_1$. So $D = 9 \\cdot \\det(R_3,\\ R_2,\\ -R_1)$.\n5. Take out the $-1$, then swap rows 1 and 3: $D = 9 \\cdot (-1) \\cdot (-1) \\cdot \\det(R_1, R_2, R_3) = 9 \\cdot 5 = 45$.\n\n*Why step 2 is allowed:* at that moment row 3 really is $R_3 - R_1$, so adding it to row 1 is a single shear of the current matrix. Each step changes one row using the rows as they currently stand.",
    },
    {
      type: "math",
      latex:
        "\\det(R_1 + 2R_3,\\ 3R_2,\\ R_3 - R_1) = 9\\det(R_1, R_2, R_3) = 45",
    },
    {
      type: "text",
      content:
        "Now follow the determinant through a sequence of row operations yourself. The readout keeps track of the factor each step has multiplied it by. For this matrix, the target answer is $\\det A = -5$. First swap to bring a non-zero entry to the top, then clear below it.",
    },
    {
      type: "interactive",
      config: {
        component: "matrix-row-reducer",
        mode: "determinant",
        matrix: [
          [0, 2, 1],
          [1, 3, 2],
          [2, 1, 4],
        ],
        target: "echelon",
        caption:
          "Try R₁ ↔ R₂, then R₃ → R₃ − 2R₁, then clear below the second pivot. Once the matrix is triangular, det A = (product of the diagonal) ÷ (the running factor).",
      },
    },
    {
      type: "quiz",
      id: "mx2-4-q1",
      variant: "concept",
      question: "$A$ is a $3\\times3$ matrix with $\\det A = 2$. What is $\\det(3A)$?",
      options: [
        { text: "$6$", feedback: "That treats $3A$ as scaling one row. $3A$ scales every row, so the factor 3 applies three times." },
        { text: "$18$", feedback: "$3^2$ would be right for a $2\\times2$ matrix. This one is $3\\times3$, so it is $3^3$." },
        { text: "$54$", correct: true, feedback: "All three rows are multiplied by 3: $3^3 \\cdot 2 = 27 \\cdot 2 = 54$." },
      ],
    },
    {
      type: "quiz",
      id: "mx2-4-q2",
      variant: "concept",
      question: "Let $A = B = I_2$. What is $\\det(A + B)$?",
      options: [
        { text: "$4$", correct: true, feedback: "$A + B = 2I$, which doubles both directions, so areas are multiplied by $2^2 = 4$." },
        { text: "$2$", feedback: "That is $\\det A + \\det B$. The determinant does not split over a sum of matrices." },
        { text: "$1$", feedback: "$2I$ is not the identity. It doubles every length." },
      ],
    },
    {
      type: "quiz",
      id: "mx2-4-q3",
      variant: "practice",
      question: "$\\det A = 3$ and $\\det B = -2$ (both $2\\times2$), and $AB \\ne BA$. What is $\\det(BA)$?",
      options: [
        { text: "It cannot be found, since $BA \\ne AB$.", feedback: "The matrices differ, but determinants are numbers and $(-2)(3) = (3)(-2)$." },
        { text: "$-6$", correct: true, feedback: "$\\det(BA) = \\det B \\cdot \\det A = -6$. The products differ, but their scale factors are the same numbers multiplied in either order." },
        { text: "$6$", feedback: "One factor is negative, so the product is negative: the composition flips orientation once." },
      ],
    },
    {
      type: "quiz",
      id: "mx2-4-q4",
      variant: "practice",
      question:
        "A $3\\times3$ matrix has rows $R_1, R_2, R_3$ and determinant 5. What is the determinant of the matrix with rows $R_2, R_1, 3R_3$?",
      options: [
        { text: "$15$", feedback: "Swapping two rows reverses orientation. Don't drop the sign." },
        { text: "$-15$", correct: true, feedback: "The swap gives $\\times(-1)$ and scaling $R_3$ gives $\\times 3$: $5 \\cdot (-1) \\cdot 3 = -15$." },
        { text: "$-135$", feedback: "Only one row is scaled by 3, so the factor is 3, not $3^3$." },
      ],
    },
    {
      type: "quiz",
      id: "mx2-4-q5",
      variant: "concept",
      question: "What does $R_2 \\to R_2 + 4R_1$ do to a determinant?",
      options: [
        { text: "Nothing, because it is a shear and base and height are unchanged.", correct: true, feedback: "This is the operation that lets you create zeros without changing the value." },
        { text: "Multiplies it by 4", feedback: "That would be $R_2 \\to 4R_2$. Here $R_2$ keeps its own coefficient 1." },
        { text: "Multiplies it by 5", feedback: "The added part, $4R_1$, is parallel to an existing edge, so it contributes zero area." },
      ],
    },
    {
      type: "quiz",
      id: "mx2-4-q6",
      variant: "practice",
      question: "Evaluate $\\begin{vmatrix}1&2&3\\\\2&4&6\\\\7&8&9\\end{vmatrix}$ without expanding.",
      options: [
        { text: "$-6$", feedback: "Look at rows 1 and 2 before expanding: one is twice the other." },
        { text: "$2$", feedback: "Proportional rows do not give the proportionality constant. They give zero." },
        { text: "$0$", correct: true, feedback: "$R_2 = 2R_1$. Proportional rows give a flat box, so the determinant is 0." },
      ],
    },
    {
      type: "quiz",
      id: "mx2-4-q7",
      variant: "concept",
      question: "What is $\\begin{vmatrix}0&2&-3\\\\-2&0&4\\\\3&-4&0\\end{vmatrix}$?",
      options: [
        { text: "$0$", correct: true, feedback: "The matrix is skew-symmetric ($A^T = -A$) of odd order 3, so $\\det A = (-1)^3\\det A$ forces $\\det A = 0$. Expanding confirms it: $0 - 2(0 - 12) + (-3)(8 - 0) = 24 - 24 = 0$." },
        { text: "$24$", feedback: "That is only the middle term, $-2(0 - 12) = 24$. The third term, $-3(8 - 0) = -24$, cancels it exactly, as it must for an odd-order skew-symmetric matrix." },
        { text: "$-24$", feedback: "That is only the third term. The middle term contributes $+24$, and the total is 0. Spot $A^T = -A$ first and you need no expansion at all." },
      ],
      hint: "Compare the matrix with its transpose before expanding anything.",
    },
    {
      type: "quiz",
      id: "mx2-4-q8",
      variant: "practice",
      question:
        "$A$ and $B$ are $3\\times3$ with $\\det A = 2$ and $\\det B = 3$. What is $\\det(2A^{-1}B^T)$?",
      options: [
        { text: "$12$", correct: true, feedback: "$2^3 \\cdot \\frac{1}{2} \\cdot 3 = 8 \\cdot \\frac{3}{2} = 12$." },
        { text: "$3$", feedback: "You used $\\det(2M) = 2\\det M$. The scalar 2 stretches all three rows, so it contributes $2^3 = 8$." },
        { text: "$48$", feedback: "You used $\\det A$ where you needed $\\det(A^{-1}) = \\frac{1}{2}$: $8 \\cdot 2 \\cdot 3 = 48$." },
      ],
      hint: "Handle the scalar, the inverse and the transpose one at a time.",
    },
    {
      type: "quiz",
      id: "mx2-4-q9",
      variant: "practice",
      question:
        "A sprite of area 4 is transformed three times in a row by a $2\\times2$ matrix $T$ with $\\det T = -2$. What happens?",
      options: [
        { text: "Area 32, and the sprite ends up mirrored", correct: true, feedback: "$\\det(T^3) = (-2)^3 = -8$. The area is $4 \\times 8 = 32$, and an odd number of flips leaves it mirrored." },
        { text: "Area 32, same orientation as at the start", feedback: "Each application flips the plane. Three flips is an odd number, so the result is mirrored: $(-2)^3 = -8 < 0$." },
        { text: "Area 24, mirrored", feedback: "Scale factors multiply: $2 \\times 2 \\times 2 = 8$, not $2 \\times 3$. The area is $4 \\times 8 = 32$." },
      ],
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "evaluating-determinants-smartly",
  title: "2.5 · Evaluating Determinants Smartly",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "Full expansion always works, but with letters as entries it quickly becomes a long, error-prone calculation. The properties of 2.4 give a shorter route. **Create zeros** with shears (free), **pull out common factors**, then expand along the line that is now mostly zeros.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "The toolkit",
      content:
        "1. $R_i \\to R_i \\pm kR_j$ (or the same with columns): value unchanged, and it can create zeros.\n2. If every entry of a row has a common factor $k$, write $k$ in front: $\\det = k \\times$ (determinant with that row divided by $k$).\n3. Two equal or proportional rows or columns: the value is 0. Stop.\n4. Finish by expanding along the row or column with the most zeros.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Taking a factor out multiplies, it does not divide",
      content:
        "$\\begin{vmatrix}6&9\\\\1&4\\end{vmatrix} = 3\\begin{vmatrix}2&3\\\\1&4\\end{vmatrix}$. The factor comes out **in front** as a multiplier, because the original row really is 3 times the smaller one. Check: $24 - 9 = 15$ and $3(8 - 3) = 15$. Also, a factor comes out of **one row at a time**. Taking 3 out of the whole matrix would give $3^n$, not 3.",
    },
    {
      type: "text",
      content:
        "**Warm-up example (routine): the toolkit on numbers.** Evaluate $\\begin{vmatrix}2&4&6\\\\3&7&10\\\\5&9&17\\end{vmatrix}$.\n\n1. Row 1 has the common factor 2. Take it out: $2\\begin{vmatrix}1&2&3\\\\3&7&10\\\\5&9&17\\end{vmatrix}$. *Why:* a leading 1 makes the next step clean, with no fractions.\n2. $R_2 \\to R_2 - 3R_1$ gives $(0, 1, 1)$, and $R_3 \\to R_3 - 5R_1$ gives $(0, -1, 2)$. *Why:* shears are free, and they empty column 1 below the leading 1.\n3. Expand along column 1, where only the top 1 survives: $2 \\cdot 1 \\cdot \\begin{vmatrix}1&1\\\\-1&2\\end{vmatrix} = 2(2 + 1) = 6$.\n\nCheck by full expansion: $2(119 - 90) - 4(51 - 50) + 6(27 - 35) = 58 - 4 - 48 = 6$. The smart route used one $2\\times2$ determinant instead of three.",
    },
    {
      type: "text",
      content:
        "**Worked example 1: spot it first.** $\\begin{vmatrix}102&18&36\\\\1&3&4\\\\17&3&6\\end{vmatrix}$.\n\n1. Compare $R_1$ with $R_3$: $102 = 6\\cdot17$, $18 = 6\\cdot3$, $36 = 6\\cdot6$.\n2. So $R_1 = 6R_3$, and proportional rows give determinant $0$. There is nothing to expand.",
    },
    {
      type: "text",
      content:
        "**Worked example 2: the Vandermonde determinant.** Show that $\\begin{vmatrix}1&a&a^2\\\\1&b&b^2\\\\1&c&c^2\\end{vmatrix} = (a-b)(b-c)(c-a)$.\n\n1. $R_2 \\to R_2 - R_1$ and $R_3 \\to R_3 - R_1$ (shears, value unchanged). The new rows are $(0,\\; b-a,\\; b^2-a^2)$ and $(0,\\; c-a,\\; c^2-a^2)$.\n2. Use $b^2 - a^2 = (b-a)(b+a)$. Take $(b-a)$ out of $R_2$ and $(c-a)$ out of $R_3$. The rows become $(0, 1, b+a)$ and $(0, 1, c+a)$.\n3. Expand along column 1, whose only non-zero entry is the 1 at the top: $1 \\cdot \\begin{vmatrix}1&b+a\\\\1&c+a\\end{vmatrix} = (c + a) - (b + a) = c - b$.\n4. Total: $(b-a)(c-a)(c-b)$. Rewrite $(b - a) = -(a-b)$ and $(c - b) = -(b - c)$. The two minus signs cancel, giving $(a-b)(b-c)(c-a)$.",
    },
    {
      type: "math",
      latex:
        "\\begin{vmatrix}1&a&a^2\\\\1&b&b^2\\\\1&c&c^2\\end{vmatrix} = (a-b)(b-c)(c-a)",
    },
    {
      type: "text",
      content:
        "The result also makes sense geometrically. If any two of $a, b, c$ are equal, two rows are equal, so the determinant must vanish. That is why each difference appears as a factor.\n\nTry it numerically with $a = 2,\\ b = 3,\\ c = 5$. The formula gives $(2-3)(3-5)(5-2) = (-1)(-2)(3) = 6$. Reduce the matrix yourself and check.",
    },
    {
      type: "interactive",
      config: {
        component: "matrix-row-reducer",
        mode: "determinant",
        matrix: [
          [1, 2, 4],
          [1, 3, 9],
          [1, 5, 25],
        ],
        allowedOps: ["add", "scale", "swap"],
        caption:
          "Start with R₂ → R₂ − R₁ and R₃ → R₃ − R₁, exactly as in the derivation. Then clear the last entry below the diagonal. The diagonal product should come out as 6.",
      },
    },
    {
      type: "text",
      content:
        "**Worked example 3: pulling out $a + b + c$.** Show that $\\begin{vmatrix}a-b-c&2a&2a\\\\2b&b-c-a&2b\\\\2c&2c&c-a-b\\end{vmatrix} = (a+b+c)^3$.\n\n1. $R_1 \\to R_1 + R_2 + R_3$. Each column sums to $a + b + c$: for example, $(a-b-c) + 2b + 2c = a + b + c$. Row 1 becomes $(a+b+c,\\ a+b+c,\\ a+b+c)$.\n2. Take $(a + b + c)$ out of row 1, leaving the row $(1, 1, 1)$.\n3. $C_2 \\to C_2 - C_1$ and $C_3 \\to C_3 - C_1$. Row 1 becomes $(1, 0, 0)$. Row 2 becomes $(2b,\\ -(a+b+c),\\ 0)$ and row 3 becomes $(2c,\\ 0,\\ -(a+b+c))$.\n4. The matrix is now lower triangular, so the determinant is the product of the diagonal: $1 \\cdot (-(a+b+c))^2 = (a+b+c)^2$.\n5. Total: $(a+b+c) \\cdot (a+b+c)^2 = (a+b+c)^3$.",
    },
    {
      type: "text",
      content:
        "**Worked example 4: an identity with no expansion.** Show $\\begin{vmatrix}1&a&b+c\\\\1&b&c+a\\\\1&c&a+b\\end{vmatrix} = 0$.\n\n1. $C_3 \\to C_3 + C_2$. Every entry of column 3 becomes $a + b + c$.\n2. Column 3 is now $(a+b+c)$ times column 1, and proportional columns give 0.",
    },
    {
      type: "text",
      content:
        "**Worked example 5: solving $\\det = 0$.** Solve $\\begin{vmatrix}x+a&x&x\\\\x&x+a&x\\\\x&x&x+a\\end{vmatrix} = 0$, where $a \\ne 0$.\n\n1. $C_1 \\to C_1 + C_2 + C_3$. Every entry of column 1 becomes $3x + a$. Take it out, leaving column 1 as $(1, 1, 1)$.\n2. $R_2 \\to R_2 - R_1$ and $R_3 \\to R_3 - R_1$. The rows become $(1, x, x)$, $(0, a, 0)$ and $(0, 0, a)$.\n3. That is upper triangular, so it equals $1 \\cdot a \\cdot a = a^2$.\n4. The determinant is $a^2(3x + a) = 0$. Since $a \\ne 0$, $x = -\\frac{a}{3}$.\n\nSurprise: the determinant looks cubic in $x$, but it is only linear. Every $x^2$ and $x^3$ term cancels, which the column trick shows at once.\n\nCheck with $x = a = 1$: $\\begin{vmatrix}2&1&1\\\\1&2&1\\\\1&1&2\\end{vmatrix} = 2(3) - 1(1) + 1(-1) = 4$, and $a^2(3x + a) = 4$.",
    },
    {
      type: "text",
      content:
        "**Worked example 6: the factor theorem.** Here is a second route to the Vandermonde result, which works without any row operations. Call the determinant $D$ and think of it as a polynomial in $a$, $b$, $c$.\n\n1. Put $a = b$. Then rows 1 and 2 are equal, so $D = 0$. A polynomial that vanishes whenever $a = b$ has $(a - b)$ as a factor.\n2. In the same way, $b = c$ makes $R_2 = R_3$ and $c = a$ makes $R_3 = R_1$, so $(b - c)$ and $(c - a)$ are factors too.\n3. Degree count: every term of the expansion is a product $1 \\cdot (\\text{a letter}) \\cdot (\\text{a letter})^2$, of total degree 3. The product $(a-b)(b-c)(c-a)$ already has degree 3, so only a constant is left: $D = k(a-b)(b-c)(c-a)$.\n4. Fix $k$ by comparing one coefficient. The main diagonal gives the term $1 \\cdot b \\cdot c^2 = bc^2$ in $D$. In $k(a-b)(b-c)(c-a)$, the only way to get $bc^2$ is $(-b)(-c)(c)$, with coefficient $k$. So $k = 1$.\n\nThe method is general: set two letters equal, spot two equal rows, and read off a factor. Then count degrees to see what is left.",
    },
    {
      type: "text",
      content:
        "**Worked example 7: the circulant.** Show that $\\begin{vmatrix}a&b&c\\\\b&c&a\\\\c&a&b\\end{vmatrix} = -(a+b+c)(a^2+b^2+c^2-ab-bc-ca) = -(a^3+b^3+c^3-3abc)$.\n\n1. $R_1 \\to R_1 + R_2 + R_3$. Each column holds $a$, $b$ and $c$ once, so row 1 becomes $(a+b+c,\\ a+b+c,\\ a+b+c)$. Take $(a + b + c)$ out, leaving row 1 as $(1, 1, 1)$.\n2. $C_2 \\to C_2 - C_1$ and $C_3 \\to C_3 - C_1$. The rows become $(1, 0, 0)$, $(b,\\ c-b,\\ a-b)$ and $(c,\\ a-c,\\ b-c)$.\n3. Expand along row 1: $(c-b)(b-c) - (a-b)(a-c) = -(b-c)^2 - (a^2 - ab - ac + bc)$.\n4. Multiply out: $-(b^2 - 2bc + c^2) - a^2 + ab + ac - bc = -(a^2 + b^2 + c^2 - ab - bc - ca)$.\n5. Total: $-(a+b+c)(a^2+b^2+c^2-ab-bc-ca)$, and the identity $a^3+b^3+c^3-3abc = (a+b+c)(a^2+b^2+c^2-ab-bc-ca)$ gives the second form.\n\nCheck with $a = 1,\\ b = c = 0$: the matrix is $\\begin{pmatrix}1&0&0\\\\0&0&1\\\\0&1&0\\end{pmatrix}$, a single swap of the identity's last two rows, with determinant $-1$. The formula gives $-(1 + 0 + 0 - 0) = -1$.",
    },
    {
      type: "text",
      content:
        "**Worked example 8 (exam style): a Vandermonde cousin.** Prove that $\\begin{vmatrix}1&1&1\\\\a&b&c\\\\a^3&b^3&c^3\\end{vmatrix} = (a-b)(b-c)(c-a)(a+b+c)$.\n\n1. $C_2 \\to C_2 - C_1$ and $C_3 \\to C_3 - C_1$ (shears, value unchanged). Row 1 becomes $(1, 0, 0)$, row 2 becomes $(a,\\ b-a,\\ c-a)$ and row 3 becomes $(a^3,\\ b^3-a^3,\\ c^3-a^3)$.\n2. Factor: $b^3 - a^3 = (b-a)(b^2+ab+a^2)$ and $c^3 - a^3 = (c-a)(c^2+ca+a^2)$. Take $(b-a)$ out of column 2 and $(c-a)$ out of column 3. *Why:* the answer is a product, so we pull factors out as soon as they appear.\n3. Expand along row 1: $(b-a)(c-a)\\begin{vmatrix}1&1\\\\b^2+ab+a^2&c^2+ca+a^2\\end{vmatrix}$.\n4. The $2\\times2$ is $(c^2 + ca + a^2) - (b^2 + ab + a^2) = (c^2 - b^2) + a(c - b) = (c - b)(c + b + a)$.\n5. Total: $(b-a)(c-a)(c-b)(a+b+c)$. Writing $(b-a) = -(a-b)$ and $(c-b) = -(b-c)$, the two minus signs cancel: $(a-b)(b-c)(c-a)(a+b+c)$.\n\nCheck with $a, b, c = 1, 2, 3$: direct expansion of $\\begin{vmatrix}1&1&1\\\\1&2&3\\\\1&8&27\\end{vmatrix}$ gives $1(54 - 24) - 1(27 - 3) + 1(8 - 2) = 12$, and the formula gives $(-1)(-1)(2)(6) = 12$.",
    },
    {
      type: "text",
      content:
        "**Worked example 9 (application): why computers never expand.** Evaluate the $4\\times4$ determinant $\\begin{vmatrix}1&2&0&1\\\\2&5&1&3\\\\0&1&3&2\\\\1&3&2&4\\end{vmatrix}$.\n\n1. $R_2 \\to R_2 - 2R_1$ gives $(0, 1, 1, 1)$, and $R_4 \\to R_4 - R_1$ gives $(0, 1, 2, 3)$. Row 3 already starts with 0.\n2. Expand down column 1 (only the top 1 survives): $\\begin{vmatrix}1&1&1\\\\1&3&2\\\\1&2&3\\end{vmatrix}$.\n3. $R_2 \\to R_2 - R_1$ gives $(0, 2, 1)$ and $R_3 \\to R_3 - R_1$ gives $(0, 1, 2)$. Expand again: $\\begin{vmatrix}2&1\\\\1&2\\end{vmatrix} = 4 - 1 = 3$.\n\nSo the determinant is 3. *Why this matters:* full cofactor expansion of an $n\\times n$ determinant has $n!$ terms. For $n = 20$ that is $20! \\approx 2.4 \\times 10^{18}$ products, which would take a computer doing a billion per second about 77 years. Clearing columns with shears takes roughly $\\frac{n^3}{3} \\approx 2700$ operations, a tiny fraction of a second. Every spreadsheet and scientific library computes determinants this way.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Don't cancel a factor away",
      content:
        "When solving $\\det = 0$, a factor you take out, such as $(3x + a)$ or $(x - 3)$, is part of the answer. Setting each factor to zero gives every root. Dividing the equation by a factor that contains $x$ throws roots away.",
    },
    {
      type: "quiz",
      id: "mx2-5-q1",
      variant: "concept",
      question: "Which is a correct way to rewrite $\\begin{vmatrix}6&9\\\\1&4\\end{vmatrix}$?",
      options: [
        { text: "$\\frac{1}{3}\\begin{vmatrix}2&3\\\\1&4\\end{vmatrix}$", feedback: "The original row is *bigger*, so its determinant is bigger too. A factor you take out goes in front as a multiplier." },
        { text: "$9\\begin{vmatrix}2&3\\\\1&4\\end{vmatrix}$", feedback: "Only row 1 is divided by 3, so only one factor of 3 comes out. $3^2$ would require dividing both rows." },
        { text: "$3\\begin{vmatrix}2&3\\\\1&4\\end{vmatrix}$", correct: true, feedback: "Row 1 is 3 times $(2, 3)$, so the determinant is 3 times as big: $3 \\times 5 = 15$." },
      ],
    },
    {
      type: "quiz",
      id: "mx2-5-q2",
      variant: "practice",
      question: "Evaluate $\\begin{vmatrix}1&3&9\\\\1&4&16\\\\1&7&49\\end{vmatrix}$.",
      options: [
        { text: "$-12$", feedback: "Keep the cyclic order $(a-b)(b-c)(c-a)$. Two of the factors, $-1$ and $-3$, are negative, so the product is positive." },
        { text: "$12$", correct: true, feedback: "Vandermonde with $a, b, c = 3, 4, 7$: $(3-4)(4-7)(7-3) = (-1)(-3)(4) = 12$." },
        { text: "$84$", feedback: "That is the product $3\\cdot4\\cdot7$ of the letters, not of their differences." },
      ],
    },
    {
      type: "quiz",
      id: "mx2-5-q3",
      variant: "practice",
      question: "Solve $\\begin{vmatrix}x+2&x&x\\\\x&x+2&x\\\\x&x&x+2\\end{vmatrix} = 0$.",
      options: [
        { text: "$x = -2$", feedback: "Substitute it back: the value is $a^2(3x+a) = 4(-6+2) = -16 \\ne 0$." },
        { text: "$x = -\\frac{2}{3}$", correct: true, feedback: "With $a = 2$ the determinant is $4(3x + 2)$, which is zero only when $x = -\\frac{2}{3}$." },
        { text: "$x = \\frac{2}{3}$", feedback: "Check the sign: $3x + 2 = 0$ gives $x = -\\frac{2}{3}$." },
      ],
      hint: "Add all three columns into column 1 and take out the common factor.",
    },
    {
      type: "quiz",
      id: "mx2-5-q4",
      variant: "concept",
      question: "What is $\\begin{vmatrix}1&bc&a(b+c)\\\\1&ca&b(c+a)\\\\1&ab&c(a+b)\\end{vmatrix}$?",
      options: [
        { text: "$(a-b)(b-c)(c-a)$", feedback: "It has a column of 1s like Vandermonde, but the other columns are not $a$ and $a^2$. One column operation shows it is zero." },
        { text: "$ab + bc + ca$", feedback: "$ab+bc+ca$ appears after the column operation, but then column 3 is that constant times column 1, so the determinant is 0." },
        { text: "$0$ for all $a, b, c$", correct: true, feedback: "$C_3 \\to C_3 + C_2$ makes every entry of column 3 equal to $ab + bc + ca$ (e.g. $a(b+c) + bc$), so column 3 is proportional to column 1." },
      ],
      hint: "Add column 2 to column 3 and look at what every entry becomes.",
    },
    {
      type: "quiz",
      id: "mx2-5-q5",
      variant: "practice",
      question:
        "In $\\begin{vmatrix}a-b-c&2a&2a\\\\2b&b-c-a&2b\\\\2c&2c&c-a-b\\end{vmatrix}$, what does row 1 become after $R_1 \\to R_1 + R_2 + R_3$?",
      options: [
        { text: "$(a+b+c,\\ a+b+c,\\ a+b+c)$", correct: true, feedback: "Each column sums to $a + b + c$. Taking it out leads to the result $(a+b+c)^3$." },
        { text: "$(a-b-c,\\ 2a,\\ 2a)$", feedback: "That is row 1 before the operation. You need to add rows 2 and 3 to it." },
        { text: "$(a+b+c,\\ 0,\\ 0)$", feedback: "The zeros come later, from the column operations $C_2 - C_1$ and $C_3 - C_1$." },
      ],
    },
    {
      type: "quiz",
      id: "mx2-5-q6",
      variant: "practice",
      question: "Solve $\\begin{vmatrix}x&3&3\\\\3&x&3\\\\3&3&x\\end{vmatrix} = 0$.",
      options: [
        { text: "$x = 3$ only", feedback: "At $x = 3$ all rows are equal, so it is a root, but the factor $(x + 6)$ you took out gives another: at $x = -6$ every row sums to 0." },
        { text: "$x = -6$ only", feedback: "You found the factor $x + 6$ and then lost $(x - 3)^2$. After taking out $x + 6$, the remaining triangular determinant is $(x - 3)^2$, which vanishes at $x = 3$." },
        { text: "$x = 3$ or $x = -6$", correct: true, feedback: "$C_1 \\to C_1 + C_2 + C_3$ gives the factor $x + 6$. Then $R_2 - R_1$ and $R_3 - R_1$ leave rows $(1,3,3)$, $(0, x-3, 0)$, $(0, 0, x-3)$, so $\\det = (x+6)(x-3)^2$. Both factors give roots." },
      ],
      hint: "Add all three columns into column 1. What is left after you take out the common factor?",
    },
    {
      type: "quiz",
      id: "mx2-5-q7",
      variant: "practice",
      question: "Evaluate $\\begin{vmatrix}3&6&9\\\\2&5&8\\\\1&1&4\\end{vmatrix}$.",
      options: [
        { text: "$3$", feedback: "You took 3 out of row 1 and then forgot to put it back in front. The remaining determinant is 3, so the answer is $3 \\times 3 = 9$." },
        { text: "$9$", correct: true, feedback: "Take 3 out of $R_1$ to get $(1, 2, 3)$. Then $R_2 - 2R_1 = (0, 1, 2)$ and $R_3 - R_1 = (0, -1, 1)$, so the value is $3\\begin{vmatrix}1&2\\\\-1&1\\end{vmatrix} = 3 \\cdot 3 = 9$." },
        { text: "$27$", feedback: "Only row 1 carries the factor 3, so it comes out once. 27 treats it as if it came out of two rows." },
      ],
      hint: "Take the common factor out of row 1 first, then clear column 1.",
    },
    {
      type: "quiz",
      id: "mx2-5-q8",
      variant: "practice",
      question: "Evaluate $\\begin{vmatrix}1&1&1\\\\1&2&4\\\\1&8&64\\end{vmatrix}$.",
      options: [
        { text: "$6$", feedback: "That is $(a-b)(b-c)(c-a)$ alone. With cubes in the last row there is an extra factor $a + b + c = 7$." },
        { text: "$-42$", feedback: "Keep the cyclic order: $(1-2)(2-4)(4-1) = (-1)(-2)(3) = +6$, then times 7." },
        { text: "$42$", correct: true, feedback: "It is $\\begin{vmatrix}1&1&1\\\\a&b&c\\\\a^3&b^3&c^3\\end{vmatrix}$ with $a, b, c = 1, 2, 4$: $(-1)(-2)(3)(1 + 2 + 4) = 42$." },
      ],
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "area-of-a-triangle-and-collinearity",
  title: "2.6 · Area of a Triangle and Collinearity",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "A triangle with vertices $P_1(x_1, y_1)$, $P_2(x_2, y_2)$, $P_3(x_3, y_3)$ is half of a parallelogram. In 2.1 we learned how to find a parallelogram's area from a determinant. The only obstacle is that the triangle need not have a corner at the origin.",
    },
    {
      type: "text",
      content:
        "**Step 1: translate.** Slide the triangle so $P_1$ sits at the origin. Sliding does not change area. The two edges from $P_1$ become the vectors",
    },
    {
      type: "math",
      latex:
        "\\mathbf{u} = (x_2 - x_1,\\; y_2 - y_1), \\qquad \\mathbf{v} = (x_3 - x_1,\\; y_3 - y_1)",
    },
    {
      type: "text",
      content:
        "**Step 2: halve the parallelogram.** $\\mathbf{u}$ and $\\mathbf{v}$ span a parallelogram whose area is $|\\det[\\mathbf{u}\\;\\mathbf{v}]|$, and the triangle is half of it.",
    },
    {
      type: "interactive",
      config: {
        component: "matrix-transform-grid",
        matrix: [
          [5, 3],
          [0, 3],
        ],
        editable: true,
        range: 9,
        caption:
          "The columns are u = P₂ − P₁ = (5, 0) and v = P₃ − P₁ = (3, 3) for the triangle (1, 0), (6, 0), (4, 3) slid so that P₁ sits at the origin. The shaded parallelogram has area 15. The diagonal joining the tips of u and v cuts it into two congruent triangles, and the one with a corner at the origin is our triangle, with area 7.5. Drag the tip of v to see both areas change together.",
      },
    },
    {
      type: "text",
      content:
        "**Step 3: package it as a 3×3.** Put the coordinates into a determinant with a column of 1s. Apply $R_2 \\to R_2 - R_1$ and $R_3 \\to R_3 - R_1$, which are shears and leave the value unchanged:",
    },
    {
      type: "math",
      latex:
        "\\begin{vmatrix}x_1&y_1&1\\\\x_2&y_2&1\\\\x_3&y_3&1\\end{vmatrix} = \\begin{vmatrix}x_1&y_1&1\\\\x_2-x_1&y_2-y_1&0\\\\x_3-x_1&y_3-y_1&0\\end{vmatrix} = \\begin{vmatrix}x_2-x_1&y_2-y_1\\\\x_3-x_1&y_3-y_1\\end{vmatrix}",
    },
    {
      type: "text",
      content:
        "The last step expands along column 3. Its only non-zero entry is the 1 in position $(1,3)$, whose sign is $+$. What remains is exactly the parallelogram determinant from Step 2, written with $\\mathbf{u}$ and $\\mathbf{v}$ as rows, which has the same value because $\\det A^T = \\det A$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Area of a triangle",
      content:
        "$\\Delta = \\frac{1}{2}\\left|\\begin{vmatrix}x_1&y_1&1\\\\x_2&y_2&1\\\\x_3&y_3&1\\end{vmatrix}\\right|$.\n\nThe modulus is essential. The determinant is positive when the vertices are listed anticlockwise and negative when they are listed clockwise.",
    },
    {
      type: "text",
      content:
        "**Worked example 1.** The triangle $(1, 0)$, $(6, 0)$, $(4, 3)$.\n\n1. $\\begin{vmatrix}1&0&1\\\\6&0&1\\\\4&3&1\\end{vmatrix} = 1(0 - 3) - 0 + 1(18 - 0) = -3 + 18 = 15$.\n2. $\\Delta = \\frac{1}{2} \\cdot 15 = 7.5$.\n3. Check with base and height: the base from $(1,0)$ to $(6,0)$ is 5, the height is 3, and $\\frac{1}{2} \\cdot 5 \\cdot 3 = 7.5$.",
    },
    {
      type: "text",
      content:
        "**Worked example 1b (application): surveying a field.** A surveyor marks the corners of a four-sided field, in metres, at $A(0, 0)$, $B(8, 0)$, $C(10, 6)$ and $D(2, 8)$, going round anticlockwise. What is its area?\n\n1. Cut along the diagonal $AC$ into triangles $ABC$ and $ACD$. *Why:* the formula handles triangles, and any convex polygon splits into triangles from one corner.\n2. $ABC$: $\\begin{vmatrix}0&0&1\\\\8&0&1\\\\10&6&1\\end{vmatrix}$. Row 1 has two zeros, so expand along it: $+1 \\cdot \\begin{vmatrix}8&0\\\\10&6\\end{vmatrix} = 48$. Area $24\\ \\text{m}^2$.\n3. $ACD$: $\\begin{vmatrix}0&0&1\\\\10&6&1\\\\2&8&1\\end{vmatrix} = +1 \\cdot \\begin{vmatrix}10&6\\\\2&8\\end{vmatrix} = 80 - 12 = 68$. Area $34\\ \\text{m}^2$.\n4. Total: $24 + 34 = 58\\ \\text{m}^2$.\n\n*Why both determinants came out positive:* both triangles were listed anticlockwise, in the same direction as the field. Surveyors' software (the \"shoelace formula\") is exactly this sum of signed triangle areas, which is why it works for any simple polygon listed in order.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Collinearity",
      content:
        "Three points lie on one line exactly when the triangle they form has zero area:\n$\\begin{vmatrix}x_1&y_1&1\\\\x_2&y_2&1\\\\x_3&y_3&1\\end{vmatrix} = 0$.\nThis is the same idea as 2.2: the edges $\\mathbf{u}$ and $\\mathbf{v}$ are parallel.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (collinear).** Are $(1, 2)$, $(3, 6)$, $(-2, -4)$ collinear?\n\n$\\begin{vmatrix}1&2&1\\\\3&6&1\\\\-2&-4&1\\end{vmatrix} = 1(6 + 4) - 2(3 + 2) + 1(-12 + 12) = 10 - 10 + 0 = 0$. Yes, they all lie on $y = 2x$.",
    },
    {
      type: "text",
      content:
        "**Worked example 2b (exam style).** Find $k$ if the points $(k,\\ 2 - 2k)$, $(1 - k,\\ 2k)$ and $(-4 - k,\\ 6 - 2k)$ are collinear.\n\n1. Set the coordinate determinant to zero. Expanding directly is messy, so first apply $R_2 \\to R_2 - R_1$ and $R_3 \\to R_3 - R_1$. *Why:* shears keep the value and clear the column of 1s.\n2. The new rows are $(1 - 2k,\\ 4k - 2,\\ 0)$ and $(-4 - 2k,\\ 4,\\ 0)$. Expand along column 3, where only the top 1 survives (sign $+$):\n3. $\\begin{vmatrix}1-2k&4k-2\\\\-4-2k&4\\end{vmatrix} = 4(1 - 2k) + (4k - 2)(4 + 2k) = 4 - 8k + 8k^2 + 12k - 8 = 8k^2 + 4k - 4$.\n4. $8k^2 + 4k - 4 = 4(2k - 1)(k + 1) = 0$, so $k = \\frac{1}{2}$ or $k = -1$.\n5. Check $k = -1$: the points are $(-1, 4)$, $(2, -2)$, $(-3, 8)$. The slopes from $(-1, 4)$ are $\\frac{-6}{3} = -2$ and $\\frac{4}{-2} = -2$. Collinear.\n6. Check $k = \\frac{1}{2}$: the points are $(\\frac{1}{2}, 1)$, $(\\frac{1}{2}, 1)$, $(-\\frac{9}{2}, 5)$. Two of them coincide, so they are collinear only trivially.\n\nMost answer keys list both values. If the question insists on three **distinct** points, only $k = -1$ survives. Checking your roots is what exposes this.",
    },
    {
      type: "text",
      content:
        "**Equation of a line through two points.** A general point $(x, y)$ is on the line through $(x_1, y_1)$ and $(x_2, y_2)$ exactly when the three points are collinear:",
    },
    {
      type: "math",
      latex: "\\begin{vmatrix}x&y&1\\\\x_1&y_1&1\\\\x_2&y_2&1\\end{vmatrix} = 0",
    },
    {
      type: "text",
      content:
        "**Worked example 3.** The line through $(2, 1)$ and $(4, 5)$.\n\n1. $\\begin{vmatrix}x&y&1\\\\2&1&1\\\\4&5&1\\end{vmatrix} = x(1 - 5) - y(2 - 4) + 1(10 - 4) = -4x + 2y + 6$.\n2. Set it to zero: $2y = 4x - 6$, so $y = 2x - 3$.\n3. Check: $(2, 1)$ gives $4 - 3 = 1$, and $(4, 5)$ gives $8 - 3 = 5$.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (find $k$ from an area).** The triangle $(k, 0)$, $(4, 0)$, $(0, 2)$ has area 4. Find $k$.\n\n1. $\\begin{vmatrix}k&0&1\\\\4&0&1\\\\0&2&1\\end{vmatrix} = k(0 - 2) - 0 + 1(8 - 0) = 8 - 2k$.\n2. $\\frac{1}{2}|8 - 2k| = 4$, so $|8 - 2k| = 8$.\n3. The modulus gives **two** equations: $8 - 2k = 8$ or $8 - 2k = -8$.\n4. $k = 0$ or $k = 8$.\n\nBoth are genuine. $(0,0), (4,0), (0,2)$ and $(8,0), (4,0), (0,2)$ each have base 4 on the x-axis and height 2.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Don't drop the modulus",
      content:
        "Writing $\\frac{1}{2}(8 - 2k) = 4$ finds only $k = 0$ and misses the triangle on the other side. An area condition almost always produces two values, one for each orientation of the vertices.",
    },
    {
      type: "quiz",
      id: "mx2-6-q1",
      variant: "practice",
      question: "Find the area of the triangle with vertices $(2, 7)$, $(1, 1)$, $(10, 8)$.",
      options: [
        { text: "$\\frac{47}{2}$", correct: true, feedback: "$2(1 - 8) - 7(1 - 10) + 1(8 - 10) = -14 + 63 - 2 = 47$. Halve it: $\\frac{47}{2}$." },
        { text: "$47$", feedback: "That is the determinant, which is the parallelogram's area. The triangle is half of it." },
        { text: "$\\frac{47}{4}$", feedback: "You halved twice. The determinant 47 is already the parallelogram's area, so one factor of $\\frac{1}{2}$ gives the triangle: $\\frac{47}{2}$." },
      ],
    },
    {
      type: "quiz",
      id: "mx2-6-q2",
      variant: "concept",
      question: "The triangle $(-2, 0)$, $(0, 4)$, $(0, k)$ has area 4. What are the possible values of $k$?",
      options: [
        { text: "$k = 0$ only", feedback: "You took only the case $2k - 8 = -8$. The modulus also allows $2k - 8 = +8$, giving $k = 8$: the triangle $(-2,0), (0,4), (0,8)$ has base 4 on the y-axis and height 2." },
        { text: "$k = 0$ or $k = 8$", correct: true, feedback: "$\\begin{vmatrix}-2&0&1\\\\0&4&1\\\\0&k&1\\end{vmatrix} = -2(4 - k) = 2k - 8$, and $\\frac{1}{2}|2k - 8| = 4$ opens into two cases: $2k - 8 = 8$ or $2k - 8 = -8$." },
        { text: "$k = 8$ only", feedback: "You dropped the modulus. $2k - 8 = -8$ is also allowed, giving $k = 0$, and the triangle $(-2,0), (0,4), (0,0)$ does have area 4." },
      ],
    },
    {
      type: "quiz",
      id: "mx2-6-q3",
      variant: "practice",
      question: "For which $k$ are $(1, -1)$, $(2, 1)$, $(4, k)$ collinear?",
      options: [
        { text: "$k = 3$", feedback: "From $(2,1)$ to $(4,k)$ you move 2 across at slope 2, so $k = 1 + 4 = 5$." },
        { text: "$k = 5$", correct: true, feedback: "$1(1 - k) + 1(2 - 4) + 1(2k - 4) = k - 5 = 0$. The slope is 2 throughout." },
        { text: "$k = -5$", feedback: "Check the sign of the middle term: $-(-1)(2 - 4) = -2$." },
      ],
    },
    {
      type: "quiz",
      id: "mx2-6-q4",
      variant: "practice",
      question: "Using determinants, the line through $(1, 2)$ and $(3, 8)$ is:",
      options: [
        { text: "$y = 3x - 1$", correct: true, feedback: "$\\begin{vmatrix}x&y&1\\\\1&2&1\\\\3&8&1\\end{vmatrix} = x(2 - 8) - y(1 - 3) + (8 - 6) = -6x + 2y + 2 = 0$, which rearranges to $y = 3x - 1$. Both points check out." },
        { text: "$y = 3x + 1$", feedback: "The sign of the constant slipped. Substitute $(1, 2)$: $3 + 1 = 4 \\ne 2$." },
        { text: "$y = \\frac{x}{3} + \\frac{5}{3}$", feedback: "This passes through $(1, 2)$ but not $(3, 8)$. Its slope $\\frac{1}{3}$ is run over rise; the true slope is $\\frac{8-2}{3-1} = 3$." },
      ],
    },
    {
      type: "quiz",
      id: "mx2-6-q5",
      variant: "concept",
      question:
        "Listing the vertices of a triangle in one order gives the coordinate determinant $-15$. What is the area?",
      options: [
        { text: "$-7.5$", feedback: "An area is never negative. Take the modulus." },
        { text: "It can't be found. List the vertices in another order to get a positive value.", feedback: "Reordering would only flip the sign to $+15$. Taking the modulus does the same job." },
        { text: "$7.5$", correct: true, feedback: "Area is half the *modulus*. The minus sign just means the vertices were listed clockwise." },
      ],
    },
    {
      type: "quiz",
      id: "mx2-6-q6",
      variant: "practice",
      question:
        "A triangular garden bed has corners at $(1, 1)$, $(9, 3)$ and $(4, 8)$, in metres. What is its area?",
      options: [
        { text: "$25\\ \\text{m}^2$", correct: true, feedback: "$1(3 - 8) - 1(9 - 4) + 1(72 - 12) = -5 - 5 + 60 = 50$, and half of it is 25." },
        { text: "$50\\ \\text{m}^2$", feedback: "50 is the determinant, the area of the parallelogram. The triangle is half of it." },
        { text: "$30\\ \\text{m}^2$", feedback: "The middle term takes a minus sign: $-1(9 - 4) = -5$. With it the determinant is 50, not 60." },
      ],
      hint: "Expand along row 1, with signs $+\\,-\\,+$, then halve the modulus.",
    },
    {
      type: "quiz",
      id: "mx2-6-q7",
      variant: "practice",
      question:
        "For which $k$ does the point $(k, k^2)$ on the parabola $y = x^2$ lie on the line through $(0, 2)$ and $(1, 3)$?",
      options: [
        { text: "$k = -2$ or $k = 1$", feedback: "The roots' signs slipped. At $k = 1$ the point is $(1, 1)$, which is not on $y = x + 2$." },
        { text: "$k = 2$ only", feedback: "$k^2 - k - 2 = (k - 2)(k + 1)$ has two roots. $(-1, 1)$ also lies on $y = x + 2$." },
        { text: "$k = 2$ or $k = -1$", correct: true, feedback: "$\\begin{vmatrix}k&k^2&1\\\\0&2&1\\\\1&3&1\\end{vmatrix} = k(2 - 3) - k^2(0 - 1) + (0 - 2) = k^2 - k - 2 = (k - 2)(k + 1)$. The points $(2, 4)$ and $(-1, 1)$ are where the line meets the parabola." },
      ],
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "matrices-chapter-2-mastery",
  title: "2.7 · Chapter 2 Mastery",
  position: 7,
  blocks: blocks([
    {
      type: "text",
      content:
        "The questions mix computation and meaning. Before calculating, ask what the determinant is measuring in that question.",
    },
    {
      type: "callout",
      variant: "info",
      title: "The chapter in five lines",
      content:
        "1. $\\det A$ is the signed area (volume) scale factor. For $2\\times2$ it is $ad - bc$, and a negative sign means orientation is flipped.\n2. $\\det A = 0$ exactly when the columns are parallel: the plane collapses and cannot be un-collapsed.\n3. $3\\times3$: expand along any row or column using cofactors $C_{ij} = (-1)^{i+j}M_{ij}$. Choose the line with the most zeros.\n4. A swap flips the sign, scaling a row scales the determinant, and a shear changes nothing. $\\det A^T = \\det A$, $\\det(kA) = k^n\\det A$, $\\det(AB) = \\det A\\det B$, $\\det(A^{-1}) = \\frac{1}{\\det A}$. Odd-order skew-symmetric determinants are 0.\n5. Triangle area $= \\frac{1}{2}|\\det|$ of the coordinates with a column of 1s. Zero means collinear, and an area condition gives two values of $k$.",
    },
    {
      type: "quiz",
      id: "mx2-7-q1",
      variant: "mastery",
      question: "Evaluate $\\begin{vmatrix}4&-3\\\\-2&5\\end{vmatrix}$.",
      options: [
        { text: "$14$", correct: true, feedback: "$4 \\cdot 5 - (-3)(-2) = 20 - 6 = 14$. Two negatives multiply to $+6$, which is then subtracted." },
        { text: "$26$", feedback: "You took $(-3)(-2)$ as $-6$. Two negatives give $+6$, so it is $20 - 6 = 14$." },
        { text: "$-14$", feedback: "You computed $bc - ad = 6 - 20$, the diagonals in the wrong order. It is (main diagonal) minus (other diagonal)." },
      ],
    },
    {
      type: "quiz",
      id: "mx2-7-q2",
      variant: "mastery",
      question: "Evaluate $\\begin{vmatrix}2&0&1\\\\3&1&0\\\\0&4&2\\end{vmatrix}$.",
      options: [
        { text: "$-8$", feedback: "The sign on $a_{13}$ is $+$ (position $(1,3)$, $i+j = 4$). You subtracted the third term." },
        { text: "$4$", feedback: "You dropped the third term. $M_{13} = \\begin{vmatrix}3&1\\\\0&4\\end{vmatrix} = 12$." },
        { text: "$16$", correct: true, feedback: "Row 1: $2(2 - 0) - 0 + 1(12 - 0) = 4 + 12 = 16$." },
      ],
    },
    {
      type: "quiz",
      id: "mx2-7-q3",
      variant: "mastery",
      question: "$A$ is $3\\times3$ with $\\det A = -2$. What is $\\det(2A^T)$?",
      options: [
        { text: "$-4$", feedback: "$2A^T$ scales all three rows, so the factor is $2^3$, not $2$." },
        { text: "$-16$", correct: true, feedback: "Transposing does not change the determinant, and scaling a $3\\times3$ matrix by 2 multiplies it by $2^3$: $8 \\cdot (-2) = -16$." },
        { text: "$16$", feedback: "Transposing does not change the sign of the determinant." },
      ],
    },
    {
      type: "quiz",
      id: "mx2-7-q4",
      variant: "mastery",
      question: "$A$ and $B$ are $2\\times2$ with $\\det A = 3$ and $\\det B = 4$. What is $\\det(A^2B)$?",
      options: [
        { text: "$24$", feedback: "$\\det(A^2)$ is $3^2 = 9$, not $2 \\cdot 3$." },
        { text: "$36$", correct: true, feedback: "$\\det(A)^2\\det B = 9 \\cdot 4 = 36$. The scale factors of successive transformations multiply." },
        { text: "$13$", feedback: "Determinants of products multiply, they do not add." },
      ],
    },
    {
      type: "quiz",
      id: "mx2-7-q5",
      variant: "mastery",
      question: "What does $\\begin{pmatrix}0&1\\\\1&0\\end{pmatrix}$ do to area and orientation?",
      options: [
        { text: "Destroys area, because the diagonal entries are 0", feedback: "Zeros on the diagonal do not make the determinant zero. $0 - 1 = -1$." },
        { text: "Keeps both area and orientation, since it only swaps coordinates", feedback: "Swapping $\\hat{\\imath}$ and $\\hat{\\jmath}$ is a mirror image, which reverses orientation." },
        { text: "Keeps area and reverses orientation", correct: true, feedback: "$\\det = -1$: $|{-1}| = 1$ keeps area, and the minus sign records the reflection in $y = x$." },
      ],
    },
    {
      type: "quiz",
      id: "mx2-7-q6",
      variant: "mastery",
      question: "A non-zero $2\\times2$ matrix sends a square of area 3 to a figure of area 0. What must be true?",
      options: [
        { text: "$\\det A = 0$, and the plane is squashed onto a line through the origin", correct: true, feedback: "Area $3 \\times |\\det A| = 0$ forces $\\det A = 0$. Since $A \\ne O$, the image is a line, not a point." },
        { text: "$A$ is the zero matrix", feedback: "We were told $A$ is non-zero. A matrix like $\\begin{pmatrix}1&2\\\\2&4\\end{pmatrix}$ also gives zero area." },
        { text: "$\\det A = -3$", feedback: "A negative determinant flips orientation but keeps the area non-zero ($3 \\times 3 = 9$ here)." },
      ],
    },
    {
      type: "quiz",
      id: "mx2-7-q7",
      variant: "mastery",
      question:
        "$\\begin{vmatrix}a&b&c\\\\d&e&f\\\\g&h&i\\end{vmatrix} = 6$. What is the determinant with rows $(a+2d,\\ b+2e,\\ c+2f)$, $(d, e, f)$, $(-g, -h, -i)$?",
      options: [
        { text: "$-12$", feedback: "Adding $2R_2$ to $R_1$ does not double anything. It is a shear, so the value is unchanged." },
        { text: "$6$", feedback: "Negating one row multiplies the determinant by $-1$." },
        { text: "$-6$", correct: true, feedback: "$R_1 \\to R_1 + 2R_2$ is a shear (no change), and negating $R_3$ gives $\\times(-1)$: the result is $-6$." },
      ],
    },
    {
      type: "quiz",
      id: "mx2-7-q8",
      variant: "mastery",
      question: "Evaluate $\\begin{vmatrix}1&1&1\\\\2&3&5\\\\4&9&25\\end{vmatrix}$.",
      options: [
        { text: "$6$", correct: true, feedback: "Its **columns** are $(1, a, a^2)$ with $a, b, c = 2, 3, 5$, so it is the transpose of the Vandermonde form, and $\\det A^T = \\det A$: $(2-3)(3-5)(5-2) = (-1)(-2)(3) = 6$." },
        { text: "$-6$", feedback: "Keep the cyclic order $(a-b)(b-c)(c-a)$. There are two negative factors, so the product is positive. Transposing does not change the sign." },
        { text: "$30$", feedback: "That is $2 \\cdot 3 \\cdot 5$, the product of the letters. Vandermonde multiplies their differences." },
      ],
    },
    {
      type: "quiz",
      id: "mx2-7-q9",
      variant: "mastery",
      question: "For which $k$ are $(3, -2)$, $(k, 2)$, $(8, 8)$ collinear?",
      options: [
        { text: "$k = 4$", feedback: "At $x = 4$ the line through the other two points has $y = 0$, not 2." },
        { text: "$k = 5$", correct: true, feedback: "The slope from $(3,-2)$ to $(8,8)$ is $\\frac{10}{5} = 2$. Rising 4 to reach $y = 2$ takes 2 across, so $k = 5$. The determinant $3(2 - 8) + 2(k - 8) + (8k - 16) = 10k - 50$ is zero at $k = 5$ too." },
        { text: "$k = 5$ or $k = -5$", feedback: "Collinearity sets the determinant itself to zero, and there is no modulus here. The equation is linear in $k$, so it has one solution." },
      ],
    },
    {
      type: "quiz",
      id: "mx2-7-q10",
      variant: "mastery",
      question: "The triangle with vertices $(1, 1)$, $(k, 1)$, $(3, 5)$ has area 6. Find $k$.",
      options: [
        { text: "$k = 4$ only", feedback: "You dropped the modulus. $4k - 4 = -12$ also works, giving $k = -2$: the base from $(-2, 1)$ to $(1, 1)$ is 3 as well." },
        { text: "$k = 4$ or $k = -2$", correct: true, feedback: "$\\begin{vmatrix}1&1&1\\\\k&1&1\\\\3&5&1\\end{vmatrix} = 1(1-5) - 1(k-3) + 1(5k-3) = 4k - 4$. Then $\\frac{1}{2}|4k - 4| = 6$ gives $4k - 4 = \\pm12$. Check: both triangles have base 3 on $y = 1$ and height 4." },
        { text: "$k = -2$ only", feedback: "The case $4k - 4 = +12$ gives $k = 4$ too. An area condition almost always gives two values, one for each orientation." },
      ],
    },
    {
      type: "quiz",
      id: "mx2-7-q11",
      variant: "mastery",
      question: "Solve $\\begin{vmatrix}x+1&1&1\\\\1&x+1&1\\\\1&1&x+1\\end{vmatrix} = 0$.",
      options: [
        { text: "$x = 0$ or $x = -3$", correct: true, feedback: "$C_1 \\to C_1 + C_2 + C_3$ gives the factor $x + 3$. Then $R_2 - R_1$ and $R_3 - R_1$ leave $(0, x, 0)$ and $(0, 0, x)$, so $\\det = x^2(x+3)$." },
        { text: "$x = -3$ only", feedback: "You kept the factor $x + 3$ and lost $x^2$. At $x = 0$ every entry is 1, so all rows are equal and the determinant is 0." },
        { text: "$x = -1$", feedback: "At $x = -1$ the diagonal is 0, but that does not make the determinant 0: $\\begin{vmatrix}0&1&1\\\\1&0&1\\\\1&1&0\\end{vmatrix} = 2$." },
      ],
    },
    {
      type: "quiz",
      id: "mx2-7-q12",
      variant: "mastery",
      question: "$A$ is a $3\\times3$ skew-symmetric matrix ($A^T = -A$) with some non-zero entries. What is $\\det A$?",
      options: [
        { text: "It depends on the entries", feedback: "For odd order it never does. $\\det A = \\det(-A) = -\\det A$ forces zero for every skew-symmetric $3\\times3$." },
        { text: "$1$", feedback: "The diagonal of a skew-symmetric matrix is all zeros, not ones. The argument $\\det A = -\\det A$ gives 0." },
        { text: "$0$", correct: true, feedback: "$\\det A = \\det A^T = \\det(-A) = (-1)^3\\det A = -\\det A$, so $\\det A = 0$ whatever the entries." },
      ],
    },
    {
      type: "quiz",
      id: "mx2-7-q13",
      variant: "mastery",
      question: "$A$ is $3\\times3$ and invertible with $\\det A = 4$. What is $\\det(2A^{-1})$?",
      options: [
        { text: "$2$", correct: true, feedback: "$\\det(A^{-1}) = \\frac{1}{4}$, and scaling a $3\\times3$ matrix by 2 multiplies by $2^3$: $8 \\cdot \\frac{1}{4} = 2$." },
        { text: "$\\frac{1}{2}$", feedback: "You used $\\det(2M) = 2\\det M$. All three rows are doubled, so the factor is $2^3 = 8$." },
        { text: "$32$", feedback: "You used $\\det A$ instead of $\\det(A^{-1}) = \\frac{1}{\\det A}$. The inverse shrinks areas by the factor $A$ stretched them." },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "A zero determinant means a collapse that nothing can undo. Chapter 3 asks the opposite question: when $\\det A \\ne 0$, how do you build the transformation that undoes $A$? The $ad - bc$ you derived here turns up in its denominator.",
    },
  ]),
};

export const matricesChapter2Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lessonMastery,
];
