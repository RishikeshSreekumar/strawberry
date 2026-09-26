import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Matrices Chapter 1 — Matrix Multiplication Is Composition.
 * The product AB is "do B, then A". The row-by-column rule, AB != BA,
 * zero products, failed cancellation and the (A+B)^2 expansion all come
 * out of that one idea; then the special square matrices and the transpose.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const SHEAR: [[number, number], [number, number]] = [
  [1, 1],
  [0, 1],
];
const ROT90: [[number, number], [number, number]] = [
  [0, -1],
  [1, 0],
];

const lesson01: LessonSeed = {
  slug: "one-transformation-after-another",
  title: "1.1 · One Transformation After Another",
  position: 1,
  blocks: blocks([
    {
      type: "video",
      src: "/videos/mx-1-matrix-multiplication-is-composition.mp4",
      poster: "/videos/mx-1-matrix-multiplication-is-composition.jpg",
      title: "Chapter 1 overview video",
      caption:
        "A narrated walk through the whole chapter. Watch it now for the big picture, or come back to it as a recap.",
    },
    {
      type: "text",
      content:
        "In Chapter 0 a $2\\times2$ matrix became a machine: feed it the plane, and it stretches, turns, shears or squashes it. Its columns tell you where $\\hat{\\imath}$ and $\\hat{\\jmath}$ land. So here is the natural next question: **what happens if you run two machines, one after the other?**",
    },
    {
      type: "text",
      content:
        "Take $R = \\begin{pmatrix}0&-1\\\\1&0\\end{pmatrix}$, a quarter turn anticlockwise, and $S = \\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$, a horizontal shear. Rotate the plane first, then shear the result. The grid lines are still straight, still parallel and still evenly spaced, and the origin has not moved. So the combined effect is itself a single linear transformation, which means **a single matrix** does the whole job. That matrix is what we call the product.",
    },
    {
      type: "interactive",
      config: {
        component: "matrix-transform-grid",
        showDeterminant: false,
        mode: "compose",
        matrix: SHEAR,
        secondMatrix: ROT90,
        caption:
          "Slide t from 0 to 1: B (the rotation) acts. From 1 to 2: A (the shear) acts on the result. Then flip on \"AB in one move\" and watch a single matrix land the grid in exactly the same place.",
      },
    },
    {
      type: "callout",
      variant: "definition",
      title: "The product AB",
      content:
        "$AB$ is the matrix of the transformation **\"do $B$ first, then $A$\"**. For every vector $\\mathbf{v}$:\n$(AB)\\mathbf{v} = A(B\\mathbf{v})$.\nThe matrix nearest the vector acts first, exactly like $f(g(x))$ means \"apply $g$, then $f$\".",
    },
    {
      type: "text",
      content:
        "Now find that single matrix without any new rule. The columns of a matrix are where $\\hat{\\imath}$ and $\\hat{\\jmath}$ land, so just follow them through both machines.\n\n**Follow $\\hat{\\imath}$.** $B$ sends $\\hat{\\imath}$ to column 1 of $B$. Then $A$ acts on that vector. So column 1 of $AB$ is $A \\times (\\text{column 1 of } B)$.\n\n**Follow $\\hat{\\jmath}$.** The same argument gives column 2 of $AB$ as $A \\times (\\text{column 2 of } B)$.",
    },
    {
      type: "math",
      latex:
        "AB = A\\begin{pmatrix} | & | \\\\ \\mathbf{b}_1 & \\mathbf{b}_2 \\\\ | & | \\end{pmatrix} = \\begin{pmatrix} | & | \\\\ A\\mathbf{b}_1 & A\\mathbf{b}_2 \\\\ | & | \\end{pmatrix}",
    },
    {
      type: "callout",
      variant: "tip",
      title: "One sentence to remember",
      content:
        "**Column $j$ of $AB$ is $A$ times column $j$ of $B$.** Every product rule in this chapter is a consequence of that sentence.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 — rotate, then shear.** Find $SR$, the matrix for \"rotate by $90^\\circ$, then shear\".\n\n**Step 1: column 1.** $R$ sends $\\hat{\\imath}$ to $\\begin{pmatrix}0\\\\1\\end{pmatrix}$. The shear sends that to $0\\begin{pmatrix}1\\\\0\\end{pmatrix} + 1\\begin{pmatrix}1\\\\1\\end{pmatrix} = \\begin{pmatrix}1\\\\1\\end{pmatrix}$.\n\n**Step 2: column 2.** $R$ sends $\\hat{\\jmath}$ to $\\begin{pmatrix}-1\\\\0\\end{pmatrix}$. The shear sends that to $-1\\begin{pmatrix}1\\\\0\\end{pmatrix} + 0\\begin{pmatrix}1\\\\1\\end{pmatrix} = \\begin{pmatrix}-1\\\\0\\end{pmatrix}$.\n\n**Step 3: assemble.**",
    },
    {
      type: "math",
      latex:
        "SR = \\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}\\begin{pmatrix}0&-1\\\\1&0\\end{pmatrix} = \\begin{pmatrix}1&-1\\\\1&0\\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "Check it on the grid above: with \"AB in one move\" on, $\\hat{\\imath}$ ends at $(1, 1)$ and $\\hat{\\jmath}$ ends at $(-1, 0)$.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 — no geometry needed.** Let $A = \\begin{pmatrix}2&1\\\\1&3\\end{pmatrix}$ and $B = \\begin{pmatrix}1&-1\\\\2&0\\end{pmatrix}$. Find $AB$.\n\n**Step 1: column 1.** $A\\begin{pmatrix}1\\\\2\\end{pmatrix} = 1\\begin{pmatrix}2\\\\1\\end{pmatrix} + 2\\begin{pmatrix}1\\\\3\\end{pmatrix} = \\begin{pmatrix}4\\\\7\\end{pmatrix}$.\n\n**Step 2: column 2.** $A\\begin{pmatrix}-1\\\\0\\end{pmatrix} = -1\\begin{pmatrix}2\\\\1\\end{pmatrix} + 0\\begin{pmatrix}1\\\\3\\end{pmatrix} = \\begin{pmatrix}-2\\\\-1\\end{pmatrix}$.\n\n**Step 3: assemble.** $AB = \\begin{pmatrix}4&-2\\\\7&-1\\end{pmatrix}$.\n\nEach column is a *combination of the columns of $A$*, weighted by the entries of a column of $B$. That is the Chapter 0 rule for matrix times vector, used twice.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 — a game sprite (application).** A game engine first stretches a sprite horizontally by 2, using $D = \\begin{pmatrix}2&0\\\\0&1\\end{pmatrix}$, and then turns it a quarter turn anticlockwise with $R$. Find the single matrix the engine should store, and where the sprite's corner $(1, 1)$ ends up.\n\n**Step 1: name the product.** $D$ acts first, so the combined matrix is $RD$, not $DR$. *Why this step:* the matrix nearest the vector acts first, so the first move goes on the right.\n\n**Step 2: column 1.** $D\\hat{\\imath} = (2, 0)$, and $R$ turns that to $(0, 2)$.\n\n**Step 3: column 2.** $D\\hat{\\jmath} = (0, 1)$, and $R$ turns that to $(-1, 0)$.\n\n**Step 4: assemble and apply.**",
    },
    {
      type: "math",
      latex:
        "RD = \\begin{pmatrix}0&-1\\\\2&0\\end{pmatrix}, \\qquad RD\\begin{pmatrix}1\\\\1\\end{pmatrix} = \\begin{pmatrix}-1\\\\2\\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "Check in two stages: $D(1, 1) = (2, 1)$, then a quarter turn sends $(2, 1)$ to $(-1, 2)$. It matches. *Why store one matrix:* a sprite has thousands of pixels. Computing $RD$ once and then doing one matrix–vector multiplication per pixel is half the work of applying $D$ and $R$ separately to every pixel.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 — two reflections make a rotation (JEE-style).** Let $F_1 = \\begin{pmatrix}1&0\\\\0&-1\\end{pmatrix}$ (reflect in the x-axis) and $F_2 = \\begin{pmatrix}0&1\\\\1&0\\end{pmatrix}$ (reflect in the line $y = x$). Identify the single transformation \"reflect in the x-axis, then in $y = x$\".\n\n**Step 1: order.** $F_1$ acts first, so we want $F_2F_1$. *Why this step:* getting the order wrong gives the opposite answer, as Step 4 shows.\n\n**Step 2: follow $\\hat{\\imath}$.** $F_1$ leaves it at $(1, 0)$; $F_2$ swaps coordinates, giving $(0, 1)$.\n\n**Step 3: follow $\\hat{\\jmath}$.** $F_1$ sends it to $(0, -1)$; $F_2$ swaps that to $(-1, 0)$.\n\n**Step 4: recognise the matrices.**",
    },
    {
      type: "math",
      latex:
        "F_2F_1 = \\begin{pmatrix}0&-1\\\\1&0\\end{pmatrix} = R_{90^\\circ}, \\qquad F_1F_2 = \\begin{pmatrix}0&1\\\\-1&0\\end{pmatrix} = R_{-90^\\circ}",
    },
    {
      type: "text",
      content:
        "Two mirror images compose to a quarter turn, and swapping the order turns the other way. *Why this makes sense:* each reflection reverses orientation (clockwise becomes anticlockwise), so two of them restore it. A map that fixes the origin, keeps lengths and keeps orientation is a rotation. Its angle is twice the $45^\\circ$ between the two mirrors.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Reading order is not acting order",
      content:
        "You read $AB$ left to right, but the plane feels $B$ first. The same thing happens with functions: in $\\sin(x^2)$ you write $\\sin$ first, yet squaring happens first. Whenever you are unsure, put a vector on the right: $AB\\mathbf{v} = A(B\\mathbf{v})$, and $B$ is the one touching $\\mathbf{v}$.",
    },
    {
      type: "quiz",
      id: "mx1-1-q1",
      variant: "concept",
      question:
        "$R$ rotates the plane by $90^\\circ$ and $S$ shears it. In the product $SR$, which transformation does the plane feel first?",
      options: [
        {
          text: "$R$, the rotation.",
          correct: true,
          feedback: "$SR\\mathbf{v} = S(R\\mathbf{v})$: the matrix next to the vector acts first, like $g$ in $f(g(x))$.",
        },
        {
          text: "$S$, the shear, because it is written first.",
          feedback: "Written first, applied last. Put a vector on the right: $R$ touches $\\mathbf{v}$ before $S$ does.",
        },
        {
          text: "Both act at the same time, so order is irrelevant.",
          feedback: "A product is a sequence. As Lesson 1.3 shows, swapping the order usually changes the result.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx1-1-q2",
      variant: "practice",
      question:
        "$A = \\begin{pmatrix}1&2\\\\0&1\\end{pmatrix}$, $B = \\begin{pmatrix}3&0\\\\1&2\\end{pmatrix}$. What is the first column of $AB$?",
      options: [
        {
          text: "$\\begin{pmatrix}5\\\\1\\end{pmatrix}$",
          correct: true,
          feedback: "$A\\begin{pmatrix}3\\\\1\\end{pmatrix} = 3\\begin{pmatrix}1\\\\0\\end{pmatrix} + 1\\begin{pmatrix}2\\\\1\\end{pmatrix} = \\begin{pmatrix}5\\\\1\\end{pmatrix}$.",
        },
        {
          text: "$\\begin{pmatrix}3\\\\1\\end{pmatrix}$",
          feedback: "That is column 1 of $B$ — where $B$ alone sends $\\hat{\\imath}$. You still have to apply $A$.",
        },
        {
          text: "$\\begin{pmatrix}3\\\\0\\end{pmatrix}$",
          feedback: "That multiplies the first columns entry by entry. Instead, combine A's columns using B's column as weights.",
        },
        {
          text: "$\\begin{pmatrix}5\\\\4\\end{pmatrix}$",
          feedback: "That is row 1 of $AB$ written as a column ($AB = \\begin{pmatrix}5&4\\\\1&2\\end{pmatrix}$). Column 1 means $A$ times column 1 of $B$.",
        },
      ],
      hint: "Column 1 of $AB$ is $A$ times column 1 of $B$.",
    },
    {
      type: "quiz",
      id: "mx1-1-q3",
      variant: "practice",
      question:
        "$A = \\begin{pmatrix}2&-1\\\\1&1\\end{pmatrix}$, $B = \\begin{pmatrix}1&4\\\\0&2\\end{pmatrix}$. What is the second column of $AB$?",
      options: [
        {
          text: "$\\begin{pmatrix}6\\\\6\\end{pmatrix}$",
          correct: true,
          feedback: "$4\\begin{pmatrix}2\\\\1\\end{pmatrix} + 2\\begin{pmatrix}-1\\\\1\\end{pmatrix} = \\begin{pmatrix}8-2\\\\4+2\\end{pmatrix}$.",
        },
        {
          text: "$\\begin{pmatrix}-4\\\\2\\end{pmatrix}$",
          feedback: "That multiplies column 2 of $A$ by column 2 of $B$ entry by entry — not a matrix product.",
        },
        {
          text: "$\\begin{pmatrix}3\\\\2\\end{pmatrix}$",
          feedback: "That is $B$ applied to column 2 of $A$, i.e. column 2 of $BA$.",
        },
        {
          text: "$\\begin{pmatrix}4\\\\2\\end{pmatrix}$",
          feedback: "That is where $B$ sends $\\hat{\\jmath}$. $A$ has not acted yet.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx1-1-q4",
      variant: "concept",
      question:
        "$B$ sends $\\hat{\\imath}$ to $(2, 1)$. $F = \\begin{pmatrix}1&0\\\\0&-1\\end{pmatrix}$ reflects in the x-axis. Where does $FB$ send $\\hat{\\imath}$?",
      options: [
        {
          text: "$(2, -1)$",
          correct: true,
          feedback: "$B$ first takes $\\hat{\\imath}$ to $(2,1)$; then the reflection flips the second coordinate.",
        },
        {
          text: "$(1, 0)$, since $F$ leaves $\\hat{\\imath}$ fixed.",
          feedback: "$F$ does fix $\\hat{\\imath}$, but in $FB$ it never sees $\\hat{\\imath}$ — it sees $B\\hat{\\imath} = (2,1)$.",
        },
        {
          text: "$(2, 1)$",
          feedback: "That is only the first stage. The reflection still has to act.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx1-1-q5",
      variant: "practice",
      question:
        "A photo app stretches by $D = \\begin{pmatrix}3&0\\\\0&1\\end{pmatrix}$ and then rotates $90^\\circ$ anticlockwise with $R = \\begin{pmatrix}0&-1\\\\1&0\\end{pmatrix}$. Which single matrix does both?",
      options: [
        {
          text: "$\\begin{pmatrix}0&-1\\\\3&0\\end{pmatrix}$",
          correct: true,
          feedback: "$D$ first means $RD$. Column 1: $R(3, 0) = (0, 3)$. Column 2: $R(0, 1) = (-1, 0)$.",
        },
        {
          text: "$\\begin{pmatrix}0&-3\\\\1&0\\end{pmatrix}$",
          feedback: "That is $DR$: rotate first, then stretch. The first move goes on the right, next to the vector.",
        },
        {
          text: "$\\begin{pmatrix}0&-1\\\\1&0\\end{pmatrix}$",
          feedback: "That is $R$ alone; the stretch has been lost.",
        },
        {
          text: "$\\begin{pmatrix}0&-3\\\\3&0\\end{pmatrix}$",
          feedback: "That triples both columns. $D$ stretches only the x-direction, so only the image of $\\hat{\\imath}$ is tripled.",
        },
      ],
      hint: "The first move sits next to the vector: $RD\\mathbf{v} = R(D\\mathbf{v})$.",
    },
    {
      type: "quiz",
      id: "mx1-1-q6",
      variant: "practice",
      question:
        "Reflect in the y-axis with $F_y = \\begin{pmatrix}-1&0\\\\0&1\\end{pmatrix}$, then in the x-axis with $F_x = \\begin{pmatrix}1&0\\\\0&-1\\end{pmatrix}$. What single transformation is $F_xF_y$?",
      options: [
        {
          text: "A half turn: $F_xF_y = -I$.",
          correct: true,
          feedback: "$\\hat{\\imath} \\to (-1, 0) \\to (-1, 0)$ and $\\hat{\\jmath} \\to (0, 1) \\to (0, -1)$. Every vector goes to its negative: a $180^\\circ$ rotation.",
        },
        {
          text: "The identity: two reflections cancel.",
          feedback: "Reflecting twice in the *same* mirror cancels. These mirrors are $90^\\circ$ apart, so the result is a turn by $2 \\times 90^\\circ$.",
        },
        {
          text: "Reflection in the line $y = x$.",
          feedback: "Two reflections preserve orientation, so the result is a rotation, not a reflection.",
        },
        {
          text: "A quarter turn.",
          feedback: "The turn is twice the angle between the mirrors. These are $90^\\circ$ apart, giving $180^\\circ$.",
        },
      ],
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "the-row-by-column-rule",
  title: "1.2 · The Row-by-Column Rule",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "Computing whole columns is the right way to *think* about a product. For computing a single entry quickly, and for matrices that are not square, there is a faster rule. It is the same rule, just read one entry at a time.",
    },
    {
      type: "text",
      content:
        "From 1.1, column $j$ of $AB$ is $A\\mathbf{b}_j$. The $i$-th entry of $A\\mathbf{b}_j$ is what row $i$ of $A$ produces from $\\mathbf{b}_j$: multiply matching entries and add. For $2\\times2$ matrices:",
    },
    {
      type: "math",
      latex:
        "\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}\\begin{pmatrix}p&q\\\\r&s\\end{pmatrix} = \\begin{pmatrix}ap+br & aq+bs\\\\ cp+dr & cq+ds\\end{pmatrix}",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The row-by-column rule",
      content:
        "If $A$ is $m\\times n$ and $B$ is $n\\times p$, then $AB$ is the $m\\times p$ matrix whose entries are given by the formula below.\nIn words: **entry $(i, j)$ = row $i$ of $A$ \"dot\" column $j$ of $B$.**",
    },
    {
      type: "math",
      latex:
        "(AB)_{ij} = a_{i1}b_{1j} + a_{i2}b_{2j} + \\cdots + a_{in}b_{nj} = \\sum_{k=1}^{n} a_{ik}\\,b_{kj}",
    },
    {
      type: "text",
      content:
        "**Why the inner numbers must match.** Row $i$ of $A$ has $n$ entries, and column $j$ of $B$ has however many rows $B$ has. You can only pair them off if those counts agree. Think of dominoes: the touching ends have to match, and the outer ends give the shape of the answer.",
    },
    {
      type: "math",
      latex:
        "\\underset{m\\times \\boxed{n}}{A}\\;\\cdot\\;\\underset{\\boxed{n}\\times p}{B} \\;=\\; \\underset{m\\times p}{AB}",
    },
    {
      type: "table",
      headers: ["Order of $A$", "Order of $B$", "$AB$", "$BA$"],
      rows: [
        ["$2\\times3$", "$3\\times2$", "$2\\times2$", "$3\\times3$"],
        ["$2\\times3$", "$3\\times4$", "$2\\times4$", "not defined ($4 \\ne 2$)"],
        ["$1\\times3$", "$3\\times1$", "$1\\times1$ (a single number)", "$3\\times3$"],
        ["$3\\times3$", "$3\\times3$", "$3\\times3$", "$3\\times3$ (usually different)"],
        ["$2\\times2$", "$3\\times2$", "not defined ($2 \\ne 3$)", "$3\\times2$"],
      ],
    },
    {
      type: "callout",
      variant: "warning",
      title: "AB defined does not mean BA defined",
      content:
        "The second row of the table says it: a $2\\times3$ times a $3\\times4$ works, but the other way round the inner numbers are 4 and 2. Even when both products exist (first row), they can have **different orders**, so they cannot possibly be equal.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 — a $2\\times3$ times a $3\\times2$.** Let",
    },
    {
      type: "math",
      latex:
        "A = \\begin{pmatrix}1&2&0\\\\3&-1&4\\end{pmatrix}, \\qquad B = \\begin{pmatrix}2&1\\\\0&3\\\\-1&2\\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "**Step 1: order.** $(2\\times\\boxed{3})(\\boxed{3}\\times2)$, so $AB$ is $2\\times2$.\n\n**Step 2: row 1 of $A$.** $(1, 2, 0)\\cdot(2, 0, -1) = 2 + 0 + 0 = 2$ and $(1,2,0)\\cdot(1,3,2) = 1 + 6 + 0 = 7$.\n\n**Step 3: row 2 of $A$.** $(3,-1,4)\\cdot(2,0,-1) = 6 + 0 - 4 = 2$ and $(3,-1,4)\\cdot(1,3,2) = 3 - 3 + 8 = 8$.",
    },
    {
      type: "math",
      latex:
        "AB = \\begin{pmatrix}2&7\\\\2&8\\end{pmatrix}, \\qquad BA = \\begin{pmatrix}5&3&4\\\\9&-3&12\\\\5&-4&8\\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "$BA$ is a $(3\\times2)(2\\times3)$ product, so it is $3\\times3$. For instance its $(3,2)$ entry is row 3 of $B$ dot column 2 of $A$: $(-1)(2) + (2)(-1) = -4$. Same two matrices, two products of completely different sizes.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 — a $3\\times3$ product.** Let",
    },
    {
      type: "math",
      latex:
        "A = \\begin{pmatrix}1&0&2\\\\0&1&-1\\\\3&1&0\\end{pmatrix}, \\qquad B = \\begin{pmatrix}2&1&0\\\\1&0&1\\\\0&-1&1\\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "**Row 1 of $A$ is $(1, 0, 2)$.** With the columns of $B$: $2 + 0 + 0 = 2$; $1 + 0 - 2 = -1$; $0 + 0 + 2 = 2$.\n\n**Row 2 is $(0, 1, -1)$.** $0 + 1 - 0 = 1$; $0 + 0 + 1 = 1$; $0 + 1 - 1 = 0$.\n\n**Row 3 is $(3, 1, 0)$.** $6 + 1 + 0 = 7$; $3 + 0 + 0 = 3$; $0 + 1 + 0 = 1$.",
    },
    {
      type: "math",
      latex: "AB = \\begin{pmatrix}2&-1&2\\\\1&1&0\\\\7&3&1\\end{pmatrix}",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Exam habit",
      content:
        "Point your left index finger along a row of $A$ and your right index finger down a column of $B$. Move them together, multiply, add. Write the order of the answer **before** computing anything: it catches undefined products and tells you how many entries to expect.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 — where the rule comes from in business.** Two stores, X and Y, buy pens, notebooks and bags. In $Q$ the rows are stores and the columns are items. In $P$ each row is an item; column 1 is its unit cost price and column 2 its selling price (in ₹).",
    },
    {
      type: "math",
      latex:
        "Q = \\begin{pmatrix}10&5&2\\\\4&8&3\\end{pmatrix}, \\qquad P = \\begin{pmatrix}10&12\\\\40&50\\\\250&300\\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "The total cost of store X's order is $10(10) + 5(40) + 2(250) = 800$. That is row X of $Q$ dot the cost column of $P$ — a row-by-column entry. The whole table at once:",
    },
    {
      type: "math",
      latex:
        "QP = \\begin{pmatrix}800 & 970\\\\ 1110 & 1348\\end{pmatrix} \\quad \\begin{matrix}\\leftarrow \\text{store X: cost, revenue}\\\\ \\leftarrow \\text{store Y: cost, revenue}\\end{matrix}",
    },
    {
      type: "text",
      content:
        "Profit from X is ₹$(970 - 800) =$ ₹170 and from Y is ₹$(1348 - 1110) =$ ₹238. The inner dimension (3 items) is exactly the thing being summed over, which is why it has to match on both sides. $PQ$ would be a $(3\\times2)(2\\times3)$ product: defined, but it would pair prices with stores and mean nothing.",
    },
    {
      type: "quiz",
      id: "mx1-2-q1",
      variant: "practice",
      question:
        "$A = \\begin{pmatrix}1&2\\\\3&4\\end{pmatrix}$ and $B = \\begin{pmatrix}0&1\\\\1&0\\end{pmatrix}$. What is $AB$?",
      options: [
        {
          text: "$\\begin{pmatrix}2&1\\\\4&3\\end{pmatrix}$",
          correct: true,
          feedback: "Row 1: $(1,2)\\cdot(0,1) = 2$, $(1,2)\\cdot(1,0) = 1$. Row 2: $4$, $3$. Multiplying by this $B$ on the right swaps the columns of $A$.",
        },
        {
          text: "$\\begin{pmatrix}0&2\\\\3&0\\end{pmatrix}$",
          feedback: "That multiplies entry by entry. Matrix multiplication pairs rows with columns, because it describes composition.",
        },
        {
          text: "$\\begin{pmatrix}3&4\\\\1&2\\end{pmatrix}$",
          feedback: "That swaps the *rows*, which is $BA$. The swap matrix on the left acts on rows, on the right on columns.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx1-2-q2",
      variant: "concept",
      question: "$A$ is $2\\times3$ and $B$ is $3\\times4$. Which statement is true?",
      options: [
        {
          text: "$AB$ is defined and is $2\\times4$; $BA$ is not defined.",
          correct: true,
          feedback: "$(2\\times\\boxed{3})(\\boxed{3}\\times4)$ matches. $(3\\times\\boxed{4})(\\boxed{2}\\times3)$ does not.",
        },
        {
          text: "Both are defined, since $AB$ is.",
          feedback: "For $BA$ the inner numbers are 4 and 2. One product existing says nothing about the other.",
        },
        {
          text: "$AB$ is $3\\times3$.",
          feedback: "The *inner* 3s cancel; the outer numbers, 2 and 4, give the order.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx1-2-q3",
      variant: "practice",
      question:
        "$A = \\begin{pmatrix}2&-1&3\\\\0&4&1\\end{pmatrix}$, $B = \\begin{pmatrix}1&2\\\\5&0\\\\-2&3\\end{pmatrix}$. Find the entry $(AB)_{21}$.",
      options: [
        {
          text: "$18$",
          correct: true,
          feedback: "Row 2 of $A$ dot column 1 of $B$: $0(1) + 4(5) + 1(-2) = 18$.",
        },
        {
          text: "$13$",
          feedback: "That is $(AB)_{12}$: row 1 dot column 2. The first index picks the row of $A$.",
        },
        {
          text: "$-9$",
          feedback: "That is $(AB)_{11}$: row 1 dot column 1.",
        },
        {
          text: "$3$",
          feedback: "That is $(AB)_{22}$: row 2 dot column 2.",
        },
      ],
      hint: "$(AB)_{21}$ uses row 2 of $A$ and column 1 of $B$.",
    },
    {
      type: "quiz",
      id: "mx1-2-q4",
      variant: "practice",
      question:
        "What is $\\begin{pmatrix}1&2&3\\end{pmatrix}\\begin{pmatrix}4\\\\5\\\\6\\end{pmatrix}$?",
      options: [
        {
          text: "$\\begin{pmatrix}32\\end{pmatrix}$, a $1\\times1$ matrix.",
          correct: true,
          feedback: "$(1\\times3)(3\\times1)$ gives $1\\times1$: $4 + 10 + 18 = 32$.",
        },
        {
          text: "$\\begin{pmatrix}4&10&18\\end{pmatrix}$",
          feedback: "Those are the products, but a row times a column must add them.",
        },
        {
          text: "A $3\\times3$ matrix.",
          feedback: "That is the product in the other order, column times row: $(3\\times1)(1\\times3)$.",
        },
        {
          text: "Not defined.",
          feedback: "The inner numbers are $3$ and $3$ — they match.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx1-2-q5",
      variant: "practice",
      question:
        "$A$ is $m\\times n$, and both $AB$ and $BA$ are defined. What must the order of $B$ be?",
      options: [
        {
          text: "$n\\times m$",
          correct: true,
          feedback: "$AB$ needs $B$ to have $n$ rows; $BA$ needs $B$ to have $m$ columns. Then $AB$ is $m\\times m$ and $BA$ is $n\\times n$.",
        },
        {
          text: "$m\\times n$",
          feedback: "Then $AB$ would be $(m\\times n)(m\\times n)$, which needs $n = m$.",
        },
        {
          text: "It must be square.",
          feedback: "Not necessarily: a $2\\times3$ and a $3\\times2$ can be multiplied both ways.",
        },
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 4 — row · matrix · column (NCERT staple).** Find $x$ if the product below is the zero matrix. The orders are $(1\\times3)(3\\times3)(3\\times1)$, so the answer is $1\\times1$: a single number that must be 0.",
    },
    {
      type: "math",
      latex:
        "\\begin{pmatrix}1&x&1\\end{pmatrix}\\begin{pmatrix}1&3&2\\\\2&5&1\\\\15&3&2\\end{pmatrix}\\begin{pmatrix}1\\\\2\\\\x\\end{pmatrix} = O",
    },
    {
      type: "text",
      content:
        "**Step 1: row times matrix.** Row $(1, x, 1)$ against each column: $1 + 2x + 15 = 16 + 2x$; $3 + 5x + 3 = 6 + 5x$; $2 + x + 2 = 4 + x$. So the first product is the row $(16 + 2x,\\; 6 + 5x,\\; 4 + x)$.\n\n**Step 2: row times column.** $(16 + 2x)(1) + (6 + 5x)(2) + (4 + x)(x) = x^2 + 16x + 28$.\n\n**Step 3: solve.** $x^2 + 16x + 28 = (x + 2)(x + 14) = 0$, so $x = -2$ or $x = -14$.\n\nAssociativity (Lesson 1.4) means you could also do the matrix times the column first; you get the same quadratic.",
    },
    {
      type: "quiz",
      id: "mx1-2-q6",
      variant: "practice",
      question:
        "Find all $x$ with $\\begin{pmatrix}x&1&1\\end{pmatrix}\\begin{pmatrix}1&0&1\\\\0&2&0\\\\1&0&1\\end{pmatrix}\\begin{pmatrix}x\\\\-3\\\\2\\end{pmatrix} = O$.",
      options: [
        {
          text: "$x = 1$ or $x = -4$",
          correct: true,
          feedback: "Row times matrix: $(x + 1,\\; 2,\\; x + 1)$. Then $x(x + 1) + 2(-3) + 2(x + 1) = x^2 + 3x - 4 = (x + 4)(x - 1)$.",
        },
        {
          text: "$x = -1$ or $x = 4$",
          feedback: "Sign slip when factoring: $x^2 + 3x - 4 = (x + 4)(x - 1)$, whose roots are $1$ and $-4$.",
        },
        {
          text: "No real $x$.",
          feedback: "The product is $x^2 + 3x - 4$, a quadratic with two real roots. Recompute row times matrix first.",
        },
        {
          text: "The product is not defined.",
          feedback: "$(1\\times\\boxed{3})(\\boxed{3}\\times\\boxed{3})(\\boxed{3}\\times1)$: every inner pair matches, and the result is $1\\times1$.",
        },
      ],
      hint: "Multiply the row by the matrix first to get a $1\\times3$ row, then multiply by the column.",
    },
    {
      type: "text",
      content: "**Worked example 5 — find the unknown matrix (NCERT exam problem).** Find $A$ such that",
    },
    {
      type: "math",
      latex:
        "\\begin{pmatrix}2&-1\\\\1&0\\\\-3&4\\end{pmatrix}A = \\begin{pmatrix}-1&-8&-10\\\\1&-2&-5\\\\9&22&15\\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "**Step 1: order of $A$.** The left factor is $3\\times2$ and the answer is $3\\times3$, so $A$ must be $2\\times3$. *Why this step first:* it tells you how many unknowns to expect (six) and that $A$ has exactly two rows.\n\n**Step 2: read the rule by rows.** Row $i$ of a product is (row $i$ of the left matrix) times $A$, which is a combination of the **rows** of $A$. Call the rows of $A$ $\\mathbf{r}_1$ and $\\mathbf{r}_2$. Row 2 of the product is $1\\,\\mathbf{r}_1 + 0\\,\\mathbf{r}_2 = \\mathbf{r}_1$, so $\\mathbf{r}_1 = (1, -2, -5)$ with no work at all.\n\n**Step 3: use row 1.** $2\\mathbf{r}_1 - \\mathbf{r}_2 = (-1, -8, -10)$, so $\\mathbf{r}_2 = 2(1, -2, -5) - (-1, -8, -10) = (3, 4, 0)$.\n\n**Step 4: check with the unused row.** Row 3 should be $-3\\mathbf{r}_1 + 4\\mathbf{r}_2 = (-3 + 12,\\; 6 + 16,\\; 15 + 0) = (9, 22, 15)$. It matches, so",
    },
    {
      type: "math",
      latex: "A = \\begin{pmatrix}1&-2&-5\\\\3&4&0\\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "*Why the check matters:* three rows of data but only two unknown rows means the system is over-determined. If row 3 had not matched, no such $A$ would exist. This **row picture** (rows of $AB$ are combinations of the rows of $B$) is the mirror image of the column picture from 1.1.",
    },
    {
      type: "quiz",
      id: "mx1-2-q7",
      variant: "practice",
      question:
        "Canteen X sells 50 teas and 30 samosas a day; canteen Y sells 40 teas and 60 samosas. Tea costs ₹10 and a samosa ₹15. In $Q\\mathbf{p}$ with $Q = \\begin{pmatrix}50&30\\\\40&60\\end{pmatrix}$ and $\\mathbf{p} = \\begin{pmatrix}10\\\\15\\end{pmatrix}$, what is the entry for canteen Y?",
      options: [
        {
          text: "₹1300",
          correct: true,
          feedback: "Row Y dot the price column: $40(10) + 60(15) = 400 + 900 = 1300$.",
        },
        {
          text: "₹950",
          feedback: "That is canteen X: $50(10) + 30(15)$. Row 2 of $Q$ belongs to Y.",
        },
        {
          text: "₹1200",
          feedback: "That pairs teas with the samosa price: $40(15) + 60(10)$. Each quantity must meet its own item's price.",
        },
        {
          text: "₹2250",
          feedback: "That is the total for both canteens, $950 + 1300$. Each row of $Q\\mathbf{p}$ is one canteen.",
        },
      ],
      hint: "Row Y of $Q$ dot the price column.",
    },
    {
      type: "quiz",
      id: "mx1-2-q8",
      variant: "practice",
      question:
        "Find $A$ if $\\begin{pmatrix}1&0\\\\2&1\\end{pmatrix}A = \\begin{pmatrix}3&1\\\\7&4\\end{pmatrix}$.",
      options: [
        {
          text: "$\\begin{pmatrix}3&1\\\\1&2\\end{pmatrix}$",
          correct: true,
          feedback: "Row 1 of the product is $\\mathbf{r}_1 = (3, 1)$. Row 2 is $2\\mathbf{r}_1 + \\mathbf{r}_2 = (7, 4)$, so $\\mathbf{r}_2 = (7, 4) - (6, 2) = (1, 2)$.",
        },
        {
          text: "$\\begin{pmatrix}3&1\\\\7&4\\end{pmatrix}$",
          feedback: "That is the product itself. The left matrix is not $I$, so $A$ must differ from it.",
        },
        {
          text: "$\\begin{pmatrix}3&1\\\\4&3\\end{pmatrix}$",
          feedback: "That subtracts $\\mathbf{r}_1$ once. Row 2 of the left matrix is $(2, 1)$, so subtract $2\\mathbf{r}_1$.",
        },
        {
          text: "$\\begin{pmatrix}3&1\\\\13&6\\end{pmatrix}$",
          feedback: "That adds $2\\mathbf{r}_1$ instead of subtracting it.",
        },
      ],
      hint: "Row $i$ of the product is (row $i$ of the left matrix) times $A$: a combination of the rows of $A$.",
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "order-matters",
  title: "1.3 · Order Matters",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "Put on socks then shoes, and you are dressed. Shoes then socks, and you are not. Doing two things in sequence usually depends on the order. Matrix products are sequences, so we should expect $AB$ and $BA$ to differ. Here is that expectation on the grid.",
    },
    {
      type: "interactive",
      config: {
        component: "matrix-transform-grid",
        showDeterminant: false,
        mode: "compose",
        matrix: SHEAR,
        secondMatrix: ROT90,
        caption:
          "Rotate first, then shear: this is SR. Watch where the shaded square ends up.",
      },
    },
    {
      type: "interactive",
      config: {
        component: "matrix-transform-grid",
        showDeterminant: false,
        mode: "compose",
        matrix: ROT90,
        secondMatrix: SHEAR,
        caption:
          "Now shear first, then rotate: RS. Same two moves, different final square.",
      },
    },
    {
      type: "text",
      content:
        "Follow $\\hat{\\imath}$. **Rotate, then shear:** the rotation takes it to $(0, 1)$ and the shear pushes that to $(1, 1)$. **Shear, then rotate:** the shear leaves $\\hat{\\imath}$ alone, then the rotation takes it to $(0, 1)$. Different destinations, so different matrices:",
    },
    {
      type: "math",
      latex:
        "SR = \\begin{pmatrix}1&-1\\\\1&0\\end{pmatrix} \\;\\ne\\; RS = \\begin{pmatrix}0&-1\\\\1&1\\end{pmatrix}",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Non-commutativity",
      content:
        "In general $AB \\ne BA$. When $AB = BA$ happens, we say $A$ and $B$ **commute**. It is a special relationship, never an assumption.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 — the photo editor (application).** A photo app has two buttons: *Rotate* (a quarter turn anticlockwise, $R = \\begin{pmatrix}0&-1\\\\1&0\\end{pmatrix}$) and *Flip* (mirror left–right, $H = \\begin{pmatrix}-1&0\\\\0&1\\end{pmatrix}$). A sticker sits at $(2, 1)$. Does it matter which button you press first?\n\n**Step 1: flip, then rotate, which is $RH$.** Follow $\\hat{\\imath}$: $H$ gives $(-1, 0)$, then $R$ gives $(0, -1)$. Follow $\\hat{\\jmath}$: $H$ leaves $(0, 1)$, then $R$ gives $(-1, 0)$.\n\n**Step 2: rotate, then flip, which is $HR$.** $\\hat{\\imath}$: $R$ gives $(0, 1)$, and $H$ leaves it. $\\hat{\\jmath}$: $R$ gives $(-1, 0)$, and $H$ gives $(1, 0)$.\n\n*Why follow basis vectors instead of the sticker:* once you have the matrix, you can send every pixel, not just one point.",
    },
    {
      type: "math",
      latex:
        "RH = \\begin{pmatrix}0&-1\\\\-1&0\\end{pmatrix},\\; RH\\begin{pmatrix}2\\\\1\\end{pmatrix} = \\begin{pmatrix}-1\\\\-2\\end{pmatrix}; \\qquad HR = \\begin{pmatrix}0&1\\\\1&0\\end{pmatrix},\\; HR\\begin{pmatrix}2\\\\1\\end{pmatrix} = \\begin{pmatrix}1\\\\2\\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "**Step 3: interpret.** $RH$ is a reflection in the line $y = -x$ and $HR$ is a reflection in $y = x$. The sticker ends up in opposite quadrants. The order of the buttons matters, and the matrices say exactly how.",
    },
    {
      type: "text",
      content:
        "**Surprise 1: a zero product without a zero factor.** Let $A = \\begin{pmatrix}1&0\\\\0&0\\end{pmatrix}$, which projects every vector onto the x-axis, and $B = \\begin{pmatrix}0&0\\\\1&0\\end{pmatrix}$, which sends $\\hat{\\imath}$ to $\\hat{\\jmath}$ and kills $\\hat{\\jmath}$. $B$ puts everything on the y-axis, and $A$ then flattens the y-axis to the origin:",
    },
    {
      type: "math",
      latex:
        "AB = \\begin{pmatrix}1&0\\\\0&0\\end{pmatrix}\\begin{pmatrix}0&0\\\\1&0\\end{pmatrix} = \\begin{pmatrix}0&0\\\\0&0\\end{pmatrix}, \\qquad BA = \\begin{pmatrix}0&0\\\\1&0\\end{pmatrix} \\ne O",
    },
    {
      type: "interactive",
      config: {
        component: "matrix-transform-grid",
        showDeterminant: false,
        mode: "compose",
        matrix: [
          [1, 0],
          [0, 0],
        ],
        secondMatrix: [
          [0, 0],
          [1, 0],
        ],
        caption:
          "B squashes the whole plane onto the y-axis. A projects onto the x-axis, which sends every point of the y-axis to the origin. Nothing survives: AB = O.",
      },
    },
    {
      type: "callout",
      variant: "warning",
      title: "No zero-product rule",
      content:
        "For numbers, $ab = 0$ forces $a = 0$ or $b = 0$. For matrices, $AB = O$ can happen with **neither** $A$ nor $B$ zero. It happens exactly when everything $B$ outputs lies in what $A$ destroys. Another pair: $\\begin{pmatrix}1&1\\\\1&1\\end{pmatrix}\\begin{pmatrix}1&-1\\\\-1&1\\end{pmatrix} = O$.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 — every $B$ with $AB = O$ (JEE-style).** Let $A = \\begin{pmatrix}1&2\\\\2&4\\end{pmatrix}$. Find all $2\\times2$ matrices $B$ with $AB = O$.\n\n**Step 1: think in columns.** Column $j$ of $AB$ is $A\\mathbf{b}_j$ (Lesson 1.1), so $AB = O$ means $A$ kills **each column** of $B$. *Why this step:* one matrix equation becomes two copies of the same vector equation.\n\n**Step 2: what does $A$ kill?** $A\\begin{pmatrix}x\\\\y\\end{pmatrix} = \\begin{pmatrix}x + 2y\\\\2x + 4y\\end{pmatrix} = \\mathbf{0}$ exactly when $x = -2y$, i.e. when $(x, y)$ is a multiple of $(-2, 1)$. (Row 2 of $A$ is twice row 1, so there is only one condition.)\n\n**Step 3: assemble.** Both columns must be multiples of $(-2, 1)$:",
    },
    {
      type: "math",
      latex: "B = \\begin{pmatrix}-2r & -2s\\\\ r & s\\end{pmatrix}, \\quad r, s \\text{ any real numbers}",
    },
    {
      type: "text",
      content:
        "For instance $r = 1$, $s = 3$ gives $B = \\begin{pmatrix}-2&-6\\\\1&3\\end{pmatrix}$. Row 1 of $A$ against its columns gives $-2 + 2 = 0$ and $-6 + 6 = 0$, and row 2 gives twice those. Geometrically, $A$ squashes the plane onto the line through $(1, 2)$ and flattens the whole line through $(-2, 1)$ to the origin. Any $B$ whose outputs all lie on that second line is wiped out.",
    },
    {
      type: "text",
      content:
        "**Surprise 2: no cancellation.** Keep $A = \\begin{pmatrix}1&0\\\\0&0\\end{pmatrix}$ and take",
    },
    {
      type: "math",
      latex:
        "B = \\begin{pmatrix}2&3\\\\5&7\\end{pmatrix}, \\qquad C = \\begin{pmatrix}2&3\\\\-1&4\\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "Then $AB = \\begin{pmatrix}2&3\\\\0&0\\end{pmatrix} = AC$, yet $B \\ne C$. The projection throws away the second row, and that is exactly where $B$ and $C$ differ. Once information is destroyed, you cannot divide it back. (Chapter 3 shows cancellation *does* work when $A$ has an inverse.)",
    },
    {
      type: "callout",
      variant: "warning",
      title: "AB = AC does not give B = C",
      content:
        "$AB = AC$ only says $A(B - C) = O$. By Surprise 1 that can happen with $B - C \\ne O$. You may cancel $A$ only when $A$ is invertible.",
    },
    {
      type: "text",
      content:
        "**Surprise 3: the school algebra identities change.** Expand carefully, keeping every product in its order:",
    },
    {
      type: "math",
      latex:
        "(A+B)^2 = (A+B)(A+B) = A^2 + AB + BA + B^2",
    },
    {
      type: "math",
      latex: "(A+B)(A-B) = A^2 - AB + BA - B^2",
    },
    {
      type: "text",
      content:
        "The familiar $A^2 + 2AB + B^2$ needs $AB + BA = 2AB$, i.e. $AB = BA$. Likewise $(A+B)(A-B) = A^2 - B^2$ needs $-AB + BA = O$, the same condition.\n\n**Worked check.** $A = \\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$, $B = \\begin{pmatrix}1&0\\\\1&1\\end{pmatrix}$. Then $A + B = \\begin{pmatrix}2&1\\\\1&2\\end{pmatrix}$, so $(A+B)^2 = \\begin{pmatrix}5&4\\\\4&5\\end{pmatrix}$.\n\n$A^2 = \\begin{pmatrix}1&2\\\\0&1\\end{pmatrix}$, $B^2 = \\begin{pmatrix}1&0\\\\2&1\\end{pmatrix}$, $AB = \\begin{pmatrix}2&1\\\\1&1\\end{pmatrix}$, $BA = \\begin{pmatrix}1&1\\\\1&2\\end{pmatrix}$.\n\n$A^2 + AB + BA + B^2 = \\begin{pmatrix}5&4\\\\4&5\\end{pmatrix}$, which matches. But $A^2 + 2AB + B^2 = \\begin{pmatrix}6&4\\\\4&4\\end{pmatrix}$, which does not.",
    },
    {
      type: "table",
      headers: ["Pairs that always commute", "Why"],
      rows: [
        ["$A$ and $I$", "Doing nothing before or after changes nothing: $AI = IA = A$."],
        ["$A$ and $kI$ (a scalar matrix)", "Uniform scaling can be done before or after any linear map."],
        ["$A$ and $A^2$, $A^3$, ...", "$A \\cdot A^n$ and $A^n \\cdot A$ are both $A$ applied $n+1$ times."],
        ["Two diagonal matrices", "Each stretches the axes independently; the order of stretching is irrelevant."],
        ["Two rotations of the plane", "Turning by $\\alpha$ then $\\beta$ is turning by $\\alpha + \\beta$ either way."],
      ],
    },
    {
      type: "quiz",
      id: "mx1-3-q1",
      variant: "concept",
      question:
        "$A$, $B$, $C$ are $2\\times2$, $A \\ne O$, and $AB = AC$. What can you conclude?",
      options: [
        {
          text: "Only that $A(B - C) = O$; $B$ and $C$ may still be different.",
          correct: true,
          feedback: "With $A = \\begin{pmatrix}1&0\\\\0&0\\end{pmatrix}$, any $B$, $C$ with the same first row give $AB = AC$.",
        },
        {
          text: "$B = C$, by cancelling $A$.",
          feedback: "Cancelling means multiplying by $A^{-1}$, which need not exist. A projection loses information you cannot recover.",
        },
        {
          text: "$A = I$.",
          feedback: "$A = I$ is one way to get $AB = AC$ (with $B = C$), but many other $A$ work.",
        },
      ],
      hint: "Look for an $A$ that destroys part of every vector.",
    },
    {
      type: "quiz",
      id: "mx1-3-q2",
      variant: "concept",
      question:
        "For square matrices $A$, $B$ of the same order, which expansion is **always** correct?",
      options: [
        {
          text: "$(A+B)^2 = A^2 + AB + BA + B^2$",
          correct: true,
          feedback: "Expand $(A+B)(A+B)$ term by term and keep each product in order.",
        },
        {
          text: "$(A+B)^2 = A^2 + 2AB + B^2$",
          feedback: "That merges $AB$ and $BA$ into $2AB$, which is only valid when $AB = BA$.",
        },
        {
          text: "$(A+B)^2 = A^2 + B^2$",
          feedback: "The cross terms $AB + BA$ are not zero in general.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx1-3-q3",
      variant: "practice",
      question:
        "$A = \\begin{pmatrix}0&1\\\\0&0\\end{pmatrix}$, $B = \\begin{pmatrix}0&0\\\\1&0\\end{pmatrix}$. Find $AB - BA$.",
      options: [
        {
          text: "$\\begin{pmatrix}1&0\\\\0&-1\\end{pmatrix}$",
          correct: true,
          feedback: "$AB = \\begin{pmatrix}1&0\\\\0&0\\end{pmatrix}$ and $BA = \\begin{pmatrix}0&0\\\\0&1\\end{pmatrix}$.",
        },
        {
          text: "$O$",
          feedback: "That would mean $A$ and $B$ commute. Compute both products: they differ.",
        },
        {
          text: "$\\begin{pmatrix}0&1\\\\-1&0\\end{pmatrix}$",
          feedback: "That is $A - B$, not $AB - BA$.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx1-3-q4",
      variant: "concept",
      question: "Which matrix commutes with **every** $2\\times2$ matrix?",
      options: [
        {
          text: "$\\begin{pmatrix}3&0\\\\0&3\\end{pmatrix}$",
          correct: true,
          feedback: "$3I$ scales everything uniformly, so $(3I)A = 3A = A(3I)$ for every $A$.",
        },
        {
          text: "$\\begin{pmatrix}1&0\\\\0&2\\end{pmatrix}$",
          feedback: "It commutes with diagonal matrices, but not with the shear $\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$: the products are $\\begin{pmatrix}1&1\\\\0&2\\end{pmatrix}$ and $\\begin{pmatrix}1&2\\\\0&2\\end{pmatrix}$.",
        },
        {
          text: "$\\begin{pmatrix}0&1\\\\1&0\\end{pmatrix}$",
          feedback: "On the left it swaps rows, on the right it swaps columns — generally different results.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx1-3-q5",
      variant: "practice",
      question: "Which non-zero matrix satisfies $A^2 = O$?",
      options: [
        {
          text: "$\\begin{pmatrix}2&-4\\\\1&-2\\end{pmatrix}$",
          correct: true,
          feedback: "Row 1 dot the columns: $4 - 4 = 0$, $-8 + 8 = 0$; row 2: $2 - 2 = 0$, $-4 + 4 = 0$.",
        },
        {
          text: "$\\begin{pmatrix}1&1\\\\1&1\\end{pmatrix}$",
          feedback: "Its square is $\\begin{pmatrix}2&2\\\\2&2\\end{pmatrix} = 2A$.",
        },
        {
          text: "$\\begin{pmatrix}0&1\\\\1&0\\end{pmatrix}$",
          feedback: "A reflection: doing it twice gives back $I$, not $O$.",
        },
        {
          text: "$\\begin{pmatrix}1&-1\\\\-1&1\\end{pmatrix}$",
          feedback: "Its square is $\\begin{pmatrix}2&-2\\\\-2&2\\end{pmatrix} = 2A$.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx1-3-q6",
      variant: "concept",
      question: "When is $(A+B)(A-B) = A^2 - B^2$?",
      options: [
        {
          text: "Exactly when $AB = BA$.",
          correct: true,
          feedback: "The expansion is $A^2 - AB + BA - B^2$, and the middle terms cancel only if $AB = BA$.",
        },
        {
          text: "Always — it is the difference of squares.",
          feedback: "That identity uses commutativity, which matrices do not have in general.",
        },
        {
          text: "Only when $A = B$.",
          feedback: "$A = B$ is one case where they commute, but any commuting pair works.",
        },
      ],
    },
    {
      type: "text",
      content:
        "**Worked example — who commutes with the shear?** Find every $X = \\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}$ with $XS = SX$, where $S = \\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$.\n\n**Step 1.** $XS = \\begin{pmatrix}a & a + b\\\\ c & c + d\\end{pmatrix}$ and $SX = \\begin{pmatrix}a + c & b + d\\\\ c & d\\end{pmatrix}$.\n\n**Step 2: match entries.** $(1,1)$: $a = a + c$, so $c = 0$. $(1,2)$: $a + b = b + d$, so $a = d$. $(2,2)$: $c + d = d$, again $c = 0$.\n\n**Step 3.** So $X = \\begin{pmatrix}a&b\\\\0&a\\end{pmatrix} = aI + bN$ with $N = \\begin{pmatrix}0&1\\\\0&0\\end{pmatrix}$. Only a two-parameter family commutes with $S$, far fewer than all $2\\times2$ matrices. Commuting really is special.",
    },
    {
      type: "quiz",
      id: "mx1-3-q7",
      variant: "practice",
      question:
        "Which condition describes every $\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}$ that commutes with $\\begin{pmatrix}1&0\\\\1&1\\end{pmatrix}$?",
      options: [
        {
          text: "$b = 0$ and $a = d$",
          correct: true,
          feedback: "$XL = \\begin{pmatrix}a + b & b\\\\ c + d & d\\end{pmatrix}$ and $LX = \\begin{pmatrix}a & b\\\\ a + c & b + d\\end{pmatrix}$. Matching gives $b = 0$ and $a = d$; $c$ is free.",
        },
        {
          text: "$c = 0$ and $a = d$",
          feedback: "That is the answer for the upper shear $\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$. Here the shear is lower, so the roles of $b$ and $c$ swap. Compute both products.",
        },
        {
          text: "$b = c = 0$ (diagonal matrices only)",
          feedback: "Too strict: $\\begin{pmatrix}1&0\\\\5&1\\end{pmatrix}$ commutes with it, since two vertical shears add either way.",
        },
        {
          text: "Only scalar matrices $kI$",
          feedback: "Scalar matrices commute with everything, but they are not the only ones here: any lower shear $\\begin{pmatrix}a&0\\\\c&a\\end{pmatrix}$ works too.",
        },
      ],
      hint: "Write out $XL$ and $LX$ with letters and match all four entries.",
    },
    {
      type: "quiz",
      id: "mx1-3-q8",
      variant: "practice",
      question:
        "$F = \\begin{pmatrix}1&0\\\\0&-1\\end{pmatrix}$ flips in the x-axis and $R = \\begin{pmatrix}0&-1\\\\1&0\\end{pmatrix}$ turns $90^\\circ$ anticlockwise. Where does \"rotate, then flip\" send the point $(3, 1)$?",
      options: [
        {
          text: "$(-1, -3)$",
          correct: true,
          feedback: "Rotate first: $R(3, 1) = (-1, 3)$. Then flip: $(-1, -3)$. This is $FR$.",
        },
        {
          text: "$(1, 3)$",
          feedback: "That is $RF$: flip first to $(3, -1)$, then rotate to $(1, 3)$. The order of the buttons changed the answer.",
        },
        {
          text: "$(-1, 3)$",
          feedback: "That is only the rotation. The flip still has to act.",
        },
        {
          text: "$(3, -1)$",
          feedback: "That is only the flip, and it was applied first.",
        },
      ],
      hint: "Rotate first means $R$ sits next to the vector: $FR\\mathbf{v} = F(R\\mathbf{v})$.",
    },
    {
      type: "quiz",
      id: "mx1-3-q9",
      variant: "practice",
      question: "$A = \\begin{pmatrix}1&2\\\\2&4\\end{pmatrix}$. Which non-zero $B$ gives $AB = O$?",
      options: [
        {
          text: "$\\begin{pmatrix}2&4\\\\-1&-2\\end{pmatrix}$",
          correct: true,
          feedback: "Both columns, $(2, -1)$ and $(4, -2)$, are multiples of $(-2, 1)$, which $A$ kills: $2 - 2 = 0$ and $4 - 4 = 0$.",
        },
        {
          text: "$\\begin{pmatrix}2&-1\\\\-4&2\\end{pmatrix}$",
          feedback: "This one gives $BA = O$, not $AB = O$: in $AB$, the column $(2, -4)$ gives $2 - 8 = -6 \\ne 0$. Order matters.",
        },
        {
          text: "$\\begin{pmatrix}-2&1\\\\1&-2\\end{pmatrix}$",
          feedback: "Column 1, $(-2, 1)$, is killed, but column 2, $(1, -2)$, gives $1 - 4 = -3$. Both columns must be killed.",
        },
        {
          text: "$\\begin{pmatrix}1&2\\\\2&4\\end{pmatrix}$",
          feedback: "$A^2 = \\begin{pmatrix}5&10\\\\10&20\\end{pmatrix} = 5A \\ne O$. $A$ does not kill its own outputs.",
        },
      ],
      hint: "Every column of $B$ must be a multiple of $(-2, 1)$.",
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "the-algebra-that-does-work",
  title: "1.4 · The Algebra That Does Work",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "After 1.3 it can feel as if matrix algebra is a minefield. It isn't. Only commutativity (and the rules that lean on it) failed. Everything else you know from numbers still holds, and composition shows why.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The laws that hold",
      content:
        "For matrices whose orders make each product defined:\n**Associative:** $(AB)C = A(BC)$.\n**Distributive:** $A(B + C) = AB + AC$ and $(A + B)C = AC + BC$.\n**Identity:** $AI = IA = A$.\n**Scalars move freely:** $k(AB) = (kA)B = A(kB)$.",
    },
    {
      type: "text",
      content:
        "**Associativity, with no computation.** $(AB)C$ means \"do $C$, then do $AB$\", and $AB$ means \"do $B$, then $A$\". $A(BC)$ means \"do $BC$ (that is, $C$ then $B$), then $A$\". Both describe the same sequence $C \\to B \\to A$. The brackets only say which two steps you merged into one matrix first, and the plane ends up in the same place either way.",
    },
    {
      type: "math",
      latex: "(AB)C\\,\\mathbf{v} = A\\bigl(B(C\\mathbf{v})\\bigr) = A(BC)\\,\\mathbf{v}",
    },
    {
      type: "text",
      content:
        "**Distributivity.** $A(B + C)\\mathbf{v} = A(B\\mathbf{v} + C\\mathbf{v}) = AB\\mathbf{v} + AC\\mathbf{v}$, because a linear map respects sums (Chapter 0). Notice the orders: $A$ stays on the left in every term.\n\n**Associativity is what makes powers meaningful.** $A^3$ could mean $(AA)A$ or $A(AA)$, and associativity says these agree. So $A^n$ is simply \"apply $A$, $n$ times\", and $A^mA^n = A^{m+n}$ as with numbers.",
    },
    {
      type: "text",
      content:
        "**Worked example — city and village (associativity at work).** Each year 10% of a district's city population moves to the villages, and 20% of the village population moves to the city. Write the populations (in thousands) as $\\mathbf{v} = \\begin{pmatrix}\\text{city}\\\\\\text{village}\\end{pmatrix}$ and start with $\\mathbf{v}_0 = (600, 400)$.\n\n**Step 1: build the one-year matrix $M$ by columns.** Column 1 is what happens to 1 city-dweller: 0.9 stays, 0.1 leaves for the villages. Column 2 is what happens to 1 villager: 0.2 goes to the city, 0.8 stays. *Why columns:* a column records what happens to one unit of each input, exactly as with $\\hat{\\imath}$ and $\\hat{\\jmath}$.",
    },
    {
      type: "math",
      latex:
        "M = \\begin{pmatrix}0.9&0.2\\\\0.1&0.8\\end{pmatrix}, \\qquad M\\mathbf{v}_0 = \\begin{pmatrix}540 + 80\\\\60 + 320\\end{pmatrix} = \\begin{pmatrix}620\\\\380\\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "**Step 2: year two, two ways.** Stage by stage: $M(620, 380) = (558 + 76,\\; 62 + 304) = (634, 366)$. Or square first: $M^2 = \\begin{pmatrix}0.83&0.34\\\\0.17&0.66\\end{pmatrix}$, and $M^2(600, 400) = (498 + 136,\\; 102 + 264) = (634, 366)$.\n\n**Step 3: why they agree.** $M(M\\mathbf{v}_0) = (MM)\\mathbf{v}_0$ is associativity. *Why it matters:* a planner who wants year 10 for many different starting populations computes $M^{10}$ once and then does one multiplication per scenario. The total stays at 1000 every year because each column of $M$ adds up to 1: nobody appears or disappears.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "A² does not square the entries",
      content:
        "$A^2 = AA$ is a matrix product: $\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix}^2 = \\begin{pmatrix}7&10\\\\15&22\\end{pmatrix}$, not $\\begin{pmatrix}1&4\\\\9&16\\end{pmatrix}$. Squaring the entries has no geometric meaning. Applying the transformation twice does.",
    },
    {
      type: "text",
      content:
        "**Powers by pattern.** Think of the shear $A = \\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$ as pushing each horizontal line sideways by its height. Doing that twice pushes twice as far. So we expect $A^n$ to push by $n$.",
    },
    {
      type: "interactive",
      config: {
        component: "matrix-transform-grid",
        showDeterminant: false,
        mode: "compose",
        matrix: SHEAR,
        secondMatrix: SHEAR,
        caption:
          "Shear, then shear again. The product carries ĵ to (2, 1): the shear amount adds up. Change either matrix to [[1, 2], [0, 1]] and predict the product first.",
      },
    },
    {
      type: "text",
      content:
        "**Worked example 1 — prove $A^n = \\begin{pmatrix}1&n\\\\0&1\\end{pmatrix}$ by induction.**\n\n**Base case.** $n = 1$: $A^1 = A = \\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$. True.\n\n**Step.** Suppose $A^k = \\begin{pmatrix}1&k\\\\0&1\\end{pmatrix}$. Then",
    },
    {
      type: "math",
      latex:
        "A^{k+1} = A^kA = \\begin{pmatrix}1&k\\\\0&1\\end{pmatrix}\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix} = \\begin{pmatrix}1&1+k\\\\0&1\\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "That is the formula for $n = k+1$, so it holds for every $n \\ge 1$.",
    },
    {
      type: "text",
      content:
        "**Rotations.** Turning by $\\theta$, $n$ times, turns by $n\\theta$. So we expect the power of a rotation matrix to be the rotation matrix of $n\\theta$. The NCERT form of this uses the matrix below (it turns by $\\theta$ clockwise; the argument is identical either way).\n\n**Worked example 2 — prove the rotation-power formula by induction.** Let",
    },
    {
      type: "math",
      latex:
        "A = \\begin{pmatrix}\\cos\\theta&\\sin\\theta\\\\-\\sin\\theta&\\cos\\theta\\end{pmatrix}. \\quad\\text{Claim: } A^n = \\begin{pmatrix}\\cos n\\theta&\\sin n\\theta\\\\-\\sin n\\theta&\\cos n\\theta\\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "**Base case.** $n = 1$ is $A$ itself.\n\n**Step.** Suppose the formula holds for $n = k$. Then $A^{k+1} = A^kA$, and its $(1,1)$ entry is row 1 of $A^k$ dot column 1 of $A$: $\\cos k\\theta\\cos\\theta - \\sin k\\theta\\sin\\theta = \\cos(k+1)\\theta$. Its $(1,2)$ entry is $\\cos k\\theta\\sin\\theta + \\sin k\\theta\\cos\\theta = \\sin(k+1)\\theta$. The second row works the same way, giving $-\\sin(k+1)\\theta$ and $\\cos(k+1)\\theta$.\n\nThe product of matrices has turned into the **addition formulas** for $\\cos$ and $\\sin$. That is composition again: two turns add their angles. Consequences: a rotation by $90^\\circ$ has $A^4 = I$, and one by $30^\\circ$ has $A^{12} = I$.",
    },
    {
      type: "text",
      content:
        "**A related CBSE item.** For this $A$, find $\\theta$ in $(0, \\frac{\\pi}{2})$ with $A + A^T = I$. Here $A^T = \\begin{pmatrix}\\cos\\theta&-\\sin\\theta\\\\\\sin\\theta&\\cos\\theta\\end{pmatrix}$ (transpose swaps rows and columns; more in Lesson 1.6), so $A + A^T = \\begin{pmatrix}2\\cos\\theta&0\\\\0&2\\cos\\theta\\end{pmatrix}$. Setting this equal to $I$ gives $\\cos\\theta = \\frac{1}{2}$, so $\\theta = \\frac{\\pi}{3}$.",
    },
    {
      type: "text",
      content:
        "**All-ones matrix.** $J = \\begin{pmatrix}1&1\\\\1&1\\end{pmatrix}$ has $J^2 = \\begin{pmatrix}2&2\\\\2&2\\end{pmatrix} = 2J$. Then $J^3 = 2J^2 = 4J$, and in general $J^n = 2^{n-1}J$.",
    },
    {
      type: "text",
      content:
        "**Matrix polynomials.** Because powers, sums and scalar multiples all make sense, so does an expression like $A^2 - 5A + 7I$. The constant term must be written $7I$, not $7$: you cannot add a number to a matrix.\n\n**Worked example 3 (CBSE staple).** Show that $A = \\begin{pmatrix}3&1\\\\-1&2\\end{pmatrix}$ satisfies $A^2 - 5A + 7I = O$, and use it to find $A^3$.\n\n**Step 1: $A^2$.** $A^2 = \\begin{pmatrix}9-1 & 3+2\\\\ -3-2 & -1+4\\end{pmatrix} = \\begin{pmatrix}8&5\\\\-5&3\\end{pmatrix}$.\n\n**Step 2: substitute.** $A^2 - 5A + 7I = \\begin{pmatrix}8-15+7 & 5-5+0\\\\ -5+5+0 & 3-10+7\\end{pmatrix} = \\begin{pmatrix}0&0\\\\0&0\\end{pmatrix}$.\n\n**Step 3: reduce $A^3$.** From the identity, $A^2 = 5A - 7I$. Multiply both sides by $A$:",
    },
    {
      type: "math",
      latex:
        "A^3 = 5A^2 - 7A = 5(5A - 7I) - 7A = 18A - 35I = \\begin{pmatrix}19&18\\\\-18&1\\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "Check directly: $A^2A = \\begin{pmatrix}8&5\\\\-5&3\\end{pmatrix}\\begin{pmatrix}3&1\\\\-1&2\\end{pmatrix} = \\begin{pmatrix}24-5 & 8+10\\\\ -15-3 & -5+6\\end{pmatrix} = \\begin{pmatrix}19&18\\\\-18&1\\end{pmatrix}$. The identity turned a cubic into a linear expression in $A$. Multiplying by $A$ again and substituting gets you any power this way.",
    },
    {
      type: "text",
      content:
        "**Worked example 4.** Find $k$ so that $A = \\begin{pmatrix}3&-2\\\\4&-2\\end{pmatrix}$ satisfies $A^2 = kA - 2I$.\n\n**Step 1.** $A^2 = \\begin{pmatrix}9-8 & -6+4\\\\ 12-8 & -8+4\\end{pmatrix} = \\begin{pmatrix}1&-2\\\\4&-4\\end{pmatrix}$.\n\n**Step 2.** $kA - 2I = \\begin{pmatrix}3k-2 & -2k\\\\ 4k & -2k-2\\end{pmatrix}$.\n\n**Step 3: match entries.** The $(1,2)$ entry gives $-2k = -2$, so $k = 1$. Check the rest: $3(1) - 2 = 1$, $4(1) = 4$, $-2 - 2 = -4$. All four agree, so $k = 1$. Always check every entry: one entry can give a value that the others reject.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Where these identities come from",
      content:
        "Every $2\\times2$ matrix $A = \\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}$ satisfies the identity below (multiply it out to check).\nFor $\\begin{pmatrix}3&1\\\\-1&2\\end{pmatrix}$: $a + d = 5$ and $ad - bc = 7$, which is exactly the identity of Worked example 3. Use it to check your answers. You will meet $ad - bc$ again in Chapter 2.",
    },
    {
      type: "math",
      latex: "A^2 - (a+d)A + (ad - bc)I = O",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Trace",
      content:
        "The **trace** of a square matrix is the sum of its diagonal entries: $\\operatorname{tr}A = a_{11} + a_{22} + \\cdots + a_{nn}$. For a $2\\times2$ matrix it is the $a + d$ above.\n$\\operatorname{tr}(A + B) = \\operatorname{tr}A + \\operatorname{tr}B$ and $\\operatorname{tr}(kA) = k\\operatorname{tr}A$, since the diagonal adds and scales entry by entry.\n$\\operatorname{tr}(AB) = \\operatorname{tr}(BA)$, even though $AB \\ne BA$: $\\operatorname{tr}(AB) = \\sum_i\\sum_k a_{ik}b_{ki}$, and $\\operatorname{tr}(BA) = \\sum_k\\sum_i b_{ki}a_{ik}$ is the same sum of the same products in a different order.",
    },
    {
      type: "text",
      content:
        "**When the binomial theorem is allowed.** Expanding $(A + B)^n$ as $\\sum_r \\binom{n}{r}A^{n-r}B^r$ collects terms like $ABA$ and $A^2B$ together. That is legal **only when $AB = BA$** (Lesson 1.3). The cheapest commuting partner is $I$, which commutes with everything, so $(aI + N)^n$ can always be expanded binomially.\n\n**Worked example 5 (JEE) — powers of $A = \\begin{pmatrix}3&1\\\\0&3\\end{pmatrix}$.**\n\n**Step 1: split.** $A = 3I + N$ with $N = \\begin{pmatrix}0&1\\\\0&0\\end{pmatrix}$, and $N^2 = O$ (Lesson 1.5 calls this nilpotent).\n\n**Step 2: expand.** $3I$ commutes with $N$, so $(3I + N)^n = (3I)^n + n(3I)^{n-1}N + \\binom{n}{2}(3I)^{n-2}N^2 + \\cdots$. Every term from $N^2$ on is $O$.\n\n**Step 3: read off.**",
    },
    {
      type: "math",
      latex:
        "A^n = 3^nI + n\\,3^{n-1}N = \\begin{pmatrix}3^n & n\\,3^{n-1}\\\\ 0 & 3^n\\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "Check $n = 2$: $A^2 = \\begin{pmatrix}9&6\\\\0&9\\end{pmatrix}$, and the formula gives $9$ and $2\\cdot3 = 6$.\n\n**The same trick for an idempotent.** If $A^2 = A$ then every power $A^r$ is $A$, and $I$ commutes with $A$, so $(I + A)^n = I + \\binom{n}{1}A + \\binom{n}{2}A + \\cdots + \\binom{n}{n}A = I + (2^n - 1)A$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "No binomial expansion for non-commuting matrices",
      content:
        "With $A = \\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$, $B = \\begin{pmatrix}1&0\\\\1&1\\end{pmatrix}$ from Lesson 1.3, $(A + B)^2 \\ne A^2 + 2AB + B^2$. Before writing $\\binom{n}{r}$, check that the two pieces commute.",
    },
    {
      type: "quiz",
      id: "mx1-4-q1",
      variant: "concept",
      question: "$A = \\begin{pmatrix}1&2\\\\3&4\\end{pmatrix}$. What is $A^2$?",
      options: [
        {
          text: "$\\begin{pmatrix}7&10\\\\15&22\\end{pmatrix}$",
          correct: true,
          feedback: "$A^2 = AA$: row 1 gives $1 + 6 = 7$, $2 + 8 = 10$; row 2 gives $3 + 12 = 15$, $6 + 16 = 22$.",
        },
        {
          text: "$\\begin{pmatrix}1&4\\\\9&16\\end{pmatrix}$",
          feedback: "That squares each entry. $A^2$ means applying the transformation twice.",
        },
        {
          text: "$\\begin{pmatrix}2&4\\\\6&8\\end{pmatrix}$",
          feedback: "That is $2A$, i.e. $A + A$, not $AA$.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx1-4-q2",
      variant: "practice",
      question: "What is $\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}^5$?",
      options: [
        {
          text: "$\\begin{pmatrix}1&5\\\\0&1\\end{pmatrix}$",
          correct: true,
          feedback: "Five shears of 1 add up to one shear of 5: $A^n = \\begin{pmatrix}1&n\\\\0&1\\end{pmatrix}$.",
        },
        {
          text: "$\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$",
          feedback: "That would be true of an entry-wise power ($1^5 = 1$), but $A^5$ is five products.",
        },
        {
          text: "$\\begin{pmatrix}5&5\\\\0&5\\end{pmatrix}$",
          feedback: "That is $5A$. Powers compose; they do not scale.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx1-4-q3",
      variant: "practice",
      question: "$J = \\begin{pmatrix}1&1\\\\1&1\\end{pmatrix}$. What is $J^4$?",
      options: [
        {
          text: "$\\begin{pmatrix}8&8\\\\8&8\\end{pmatrix}$",
          correct: true,
          feedback: "$J^2 = 2J$, so $J^3 = 4J$ and $J^4 = 8J$: $J^n = 2^{n-1}J$.",
        },
        {
          text: "$\\begin{pmatrix}16&16\\\\16&16\\end{pmatrix}$",
          feedback: "That is $2^4J$. Check $n = 2$: $J^2 = 2J$, so the exponent is $n - 1$.",
        },
        {
          text: "$\\begin{pmatrix}4&4\\\\4&4\\end{pmatrix}$",
          feedback: "That is $J^3$.",
        },
        {
          text: "$\\begin{pmatrix}1&1\\\\1&1\\end{pmatrix}$",
          feedback: "Entry-wise powers of 1 stay 1, but $J^2$ already has entries equal to 2.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx1-4-q4",
      variant: "practice",
      question:
        "$A = \\begin{pmatrix}2&3\\\\1&-1\\end{pmatrix}$. For which $k$ is $A^2 = A + kI$?",
      options: [
        {
          text: "$k = 5$",
          correct: true,
          feedback: "$A^2 = \\begin{pmatrix}7&3\\\\1&4\\end{pmatrix}$ and $A + 5I = \\begin{pmatrix}7&3\\\\1&4\\end{pmatrix}$. (With $a + d = 1$ and $ad - bc = -5$, the identity is $A^2 - A - 5I = O$.)",
        },
        {
          text: "$k = -5$",
          feedback: "Sign slip: $A^2 - A = 5I$, so $k = +5$.",
        },
        {
          text: "$k = 7$",
          feedback: "7 is the $(1,1)$ entry of $A^2$. Subtract the $(1,1)$ entry of $A$ first: $7 - 2 = 5$.",
        },
        {
          text: "No such $k$ exists.",
          feedback: "Every entry agrees when $k = 5$. Compare $A^2$ with $A + kI$ entry by entry.",
        },
      ],
      hint: "Compute $A^2$, then compare with $A + kI$ entry by entry.",
    },
    {
      type: "quiz",
      id: "mx1-4-q5",
      variant: "practice",
      question: "A matrix satisfies $A^2 = 3A - 2I$. Express $A^3$ in the form $pA + qI$.",
      options: [
        {
          text: "$7A - 6I$",
          correct: true,
          feedback: "$A^3 = A \\cdot A^2 = 3A^2 - 2A = 3(3A - 2I) - 2A = 7A - 6I$.",
        },
        {
          text: "$9A - 4I$",
          feedback: "That squares the coefficients. Multiply by $A$ and substitute for $A^2$ instead.",
        },
        {
          text: "$7A - 2I$",
          feedback: "The $-2I$ gets multiplied by 3 when you substitute: $3(-2I) = -6I$.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx1-4-q6",
      variant: "concept",
      question: "$R$ rotates the plane by $30^\\circ$. What is $R^{12}$?",
      options: [
        {
          text: "$I$",
          correct: true,
          feedback: "Twelve turns of $30^\\circ$ make $360^\\circ$: everything is back where it started.",
        },
        {
          text: "$-I$",
          feedback: "That is $R^6$: $180^\\circ$ sends every vector to its negative.",
        },
        {
          text: "$12R$",
          feedback: "That scales $R$ by 12. A power composes the rotation with itself.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx1-4-q7",
      variant: "practice",
      question:
        "$A = \\begin{pmatrix}\\cos\\theta&\\sin\\theta\\\\-\\sin\\theta&\\cos\\theta\\end{pmatrix}$ with $\\theta = \\frac{\\pi}{6}$. What is $A^3$?",
      options: [
        {
          text: "$\\begin{pmatrix}0&1\\\\-1&0\\end{pmatrix}$",
          correct: true,
          feedback: "$A^3$ has angle $3\\theta = \\frac{\\pi}{2}$: $\\cos\\frac{\\pi}{2} = 0$ and $\\sin\\frac{\\pi}{2} = 1$.",
        },
        {
          text: "$\\begin{pmatrix}0&-1\\\\1&0\\end{pmatrix}$",
          feedback: "The signs are swapped. This $A$ has $+\\sin$ in the top right, and so does every power of it.",
        },
        {
          text: "$\\begin{pmatrix}\\cos^3\\frac{\\pi}{6}&\\sin^3\\frac{\\pi}{6}\\\\-\\sin^3\\frac{\\pi}{6}&\\cos^3\\frac{\\pi}{6}\\end{pmatrix}$",
          feedback: "That cubes each entry. A matrix power composes the rotation, so the angles add: $A^n$ has angle $n\\theta$.",
        },
        {
          text: "$3A$",
          feedback: "That scales $A$ by 3, which stretches the plane. Three turns of $30^\\circ$ are one turn of $90^\\circ$.",
        },
      ],
      hint: "$A^n$ is the same matrix with $\\theta$ replaced by $n\\theta$.",
    },
    {
      type: "quiz",
      id: "mx1-4-q8",
      variant: "practice",
      question: "Use $A = 2I + N$ to find $\\begin{pmatrix}2&1\\\\0&2\\end{pmatrix}^5$.",
      options: [
        {
          text: "$\\begin{pmatrix}32&80\\\\0&32\\end{pmatrix}$",
          correct: true,
          feedback: "$N^2 = O$ and $2I$ commutes with $N$, so $A^5 = 2^5I + 5\\cdot2^4N = 32I + 80N$.",
        },
        {
          text: "$\\begin{pmatrix}32&5\\\\0&32\\end{pmatrix}$",
          feedback: "The middle binomial term is $\\binom{5}{1}(2I)^4N = 5\\cdot16\\,N$. You dropped the $2^4$.",
        },
        {
          text: "$\\begin{pmatrix}32&1\\\\0&32\\end{pmatrix}$",
          feedback: "That raises each entry to the fifth power. $A^5$ is five products, not entry-wise powers.",
        },
        {
          text: "$\\begin{pmatrix}32&160\\\\0&32\\end{pmatrix}$",
          feedback: "The power of 2 on the middle term is $n - 1 = 4$, not 5: $5\\cdot2^4 = 80$.",
        },
      ],
      hint: "Expand $(2I + N)^5$ binomially; every term with $N^2$ or higher vanishes.",
    },
    {
      type: "quiz",
      id: "mx1-4-q9",
      variant: "concept",
      question:
        "For $A = \\begin{pmatrix}1&2\\\\3&4\\end{pmatrix}$ and $B = \\begin{pmatrix}0&1\\\\5&-2\\end{pmatrix}$, $AB = \\begin{pmatrix}10&-3\\\\20&-5\\end{pmatrix}$. Without multiplying, what is $\\operatorname{tr}(BA)$?",
      options: [
        {
          text: "$5$",
          correct: true,
          feedback: "$\\operatorname{tr}(BA) = \\operatorname{tr}(AB) = 10 + (-5) = 5$. Indeed $BA = \\begin{pmatrix}3&4\\\\-1&2\\end{pmatrix}$: a different matrix with the same trace.",
        },
        {
          text: "$-10$",
          feedback: "That is $\\operatorname{tr}A \\cdot \\operatorname{tr}B = 5 \\cdot (-2)$. The trace is not multiplicative.",
        },
        {
          text: "$3$",
          feedback: "That is $\\operatorname{tr}A + \\operatorname{tr}B$, which is $\\operatorname{tr}(A + B)$, not the trace of a product.",
        },
        {
          text: "It cannot be found without computing $BA$.",
          feedback: "$AB \\ne BA$ here, but their traces always agree: both are $\\sum_{i,k} a_{ik}b_{ki}$.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx1-4-q10",
      variant: "practice",
      question:
        "With the same migration matrix $M = \\begin{pmatrix}0.9&0.2\\\\0.1&0.8\\end{pmatrix}$, a district starts with 400 thousand people in the city and 600 thousand in the villages. What are the populations after one year?",
      options: [
        {
          text: "City 480, villages 520",
          correct: true,
          feedback: "$M(400, 600) = (360 + 120,\\; 40 + 480) = (480, 520)$.",
        },
        {
          text: "City 420, villages 560",
          feedback: "That is $M^T(400, 600)$: rows and columns were swapped. Column 1 of $M$ describes what happens to city people, so the city's new total is row 1: $0.9(400) + 0.2(600)$.",
        },
        {
          text: "City 360, villages 480",
          feedback: "Those are only the people who stayed. Movers arrive too: 120 into the city and 40 into the villages.",
        },
        {
          text: "City 400, villages 600 (no change)",
          feedback: "Only a population with city : village $= 2 : 1$ stays put, since then $0.1c = 0.2v$. Here 40 thousand leave the city but 120 thousand arrive.",
        },
      ],
      hint: "Multiply $M$ by the column $(400, 600)$: row 1 gives the city, row 2 the villages.",
    },
    {
      type: "quiz",
      id: "mx1-4-q11",
      variant: "practice",
      question:
        "$A = \\begin{pmatrix}2&1\\\\1&2\\end{pmatrix}$ satisfies $A^2 - 4A + 3I = O$. Write $A^3$ as $pA + qI$.",
      options: [
        {
          text: "$13A - 12I$",
          correct: true,
          feedback: "$A^3 = A \\cdot A^2 = 4A^2 - 3A = 4(4A - 3I) - 3A = 13A - 12I = \\begin{pmatrix}14&13\\\\13&14\\end{pmatrix}$, which matches $A^2A$ computed directly.",
        },
        {
          text: "$16A - 9I$",
          feedback: "That squares the coefficients. Multiply the identity by $A$, then substitute $A^2 = 4A - 3I$.",
        },
        {
          text: "$13A - 3I$",
          feedback: "When you substitute, the $-3I$ gets multiplied by 4: $4(-3I) = -12I$.",
        },
        {
          text: "$4A - 3I$",
          feedback: "That is $A^2$, not $A^3$. One more multiplication by $A$ is needed.",
        },
      ],
      hint: "Multiply $A^2 = 4A - 3I$ by $A$ and replace the $A^2$ that appears.",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "special-square-matrices",
  title: "1.5 · Special Square Matrices",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "Some matrices have names. Most of the names describe a pattern of entries, and the useful ones describe a **behaviour**: what happens when you apply the matrix twice, or a few times. Every name below goes with a picture you can see on the grid.",
    },
    {
      type: "interactive",
      config: {
        component: "matrix-transform-grid",
        showDeterminant: false,
        matrix: [
          [2, 0],
          [0, 3],
        ],
        presets: [
          { label: "Diagonal", matrix: [[2, 0], [0, 3]] },
          { label: "Scalar 2I", matrix: [[2, 0], [0, 2]] },
          { label: "Upper triangular", matrix: [[1, 1], [0, 1]] },
          { label: "Idempotent", matrix: [[1, 0], [0, 0]] },
          { label: "Oblique idempotent", matrix: [[1, 1], [0, 0]] },
          { label: "Nilpotent", matrix: [[0, 1], [0, 0]] },
          { label: "Involutory", matrix: [[0, 1], [1, 0]] },
          { label: "Orthogonal", matrix: [[0.6, -0.8], [0.8, 0.6]] },
        ],
        caption:
          "Load each preset and describe what it does before reading the table below. For the idempotent and nilpotent ones, ask: what would a second application do?",
      },
    },
    {
      type: "callout",
      variant: "definition",
      title: "Types by pattern",
      content:
        "For a square matrix $A = [a_{ij}]$:\n**Diagonal:** $a_{ij} = 0$ whenever $i \\ne j$. The diagonal entries can be anything, **including 0**.\n**Scalar:** diagonal with all diagonal entries equal: $A = kI$.\n**Identity:** the scalar matrix with $k = 1$.\n**Upper triangular:** $a_{ij} = 0$ for $i > j$ (zeros below the diagonal). **Lower triangular:** $a_{ij} = 0$ for $i < j$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Types by behaviour",
      content:
        "**Idempotent:** $A^2 = A$. Doing it twice is the same as doing it once.\n**Nilpotent:** $A^k = O$ for some positive integer $k$. The smallest such $k$ is the *index*.\n**Involutory:** $A^2 = I$. Doing it twice undoes it.\n**Orthogonal:** the columns are unit vectors at right angles to each other, so lengths and angles survive. (In 1.6 this becomes $A^TA = I$.)",
    },
    {
      type: "table",
      headers: ["Type", "Example", "What it does to the plane"],
      rows: [
        ["Diagonal", "$\\begin{pmatrix}2&0\\\\0&3\\end{pmatrix}$", "Stretches along the axes, each by its own factor"],
        ["Scalar $kI$", "$\\begin{pmatrix}2&0\\\\0&2\\end{pmatrix}$", "Uniform zoom by $k$ in every direction"],
        ["Identity $I$", "$\\begin{pmatrix}1&0\\\\0&1\\end{pmatrix}$", "Nothing moves"],
        ["Triangular", "$\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$", "Keeps the x-axis as a line (upper); here a shear"],
        ["Idempotent", "$\\begin{pmatrix}1&0\\\\0&0\\end{pmatrix}$", "Projection: once on the line, a second projection changes nothing"],
        ["Nilpotent", "$\\begin{pmatrix}0&1\\\\0&0\\end{pmatrix}$", "Sends $\\hat{\\jmath} \\to \\hat{\\imath} \\to \\mathbf{0}$: two steps flatten everything"],
        ["Involutory", "$\\begin{pmatrix}0&1\\\\1&0\\end{pmatrix}$", "Reflection in $y = x$: reflecting twice restores"],
        ["Orthogonal", "$\\begin{pmatrix}0.6&-0.8\\\\0.8&0.6\\end{pmatrix}$", "Rigid rotation (or reflection): no stretching"],
      ],
    },
    {
      type: "callout",
      variant: "warning",
      title: "Two naming traps",
      content:
        "**A diagonal matrix may have zeros on the diagonal.** $\\begin{pmatrix}5&0\\\\0&0\\end{pmatrix}$ is diagonal, and so is $O$. The rule is only about the *off*-diagonal entries.\n**Scalar is stricter than diagonal.** $\\begin{pmatrix}2&0\\\\0&3\\end{pmatrix}$ is diagonal but not scalar. Every scalar matrix is diagonal; not every diagonal matrix is scalar.",
    },
    {
      type: "text",
      content:
        "**Why a projection is idempotent.** Project every vector straight down onto the x-axis. After one projection every vector already lies on the x-axis, so projecting again changes nothing: $P^2 = P$. Conversely, any $A$ with $A^2 = A$ fixes everything in its output, which is what a projection does.\n\n**Why a reflection is involutory.** A mirror image of a mirror image is the original, so $F^2 = I$. On the grid: reflect in $y = x$ twice and $\\hat{\\imath}$, $\\hat{\\jmath}$ swap, then swap back.",
    },
    {
      type: "text",
      content:
        "**Worked example — shadows (application).** Model a vertical slice of a playground: $x$ runs along the ground and $y$ is height. Sunlight slants so that for every metre a ray drops, it moves $0.5$ m to the right. A point $(x, y)$ slides down its ray to the ground at $(x + 0.5y,\\; 0)$.\n\n**Step 1: the matrix.** Read off the columns: $\\hat{\\imath} = (1, 0)$ is already on the ground and stays; $\\hat{\\jmath} = (0, 1)$ lands at $(0.5, 0)$.",
    },
    {
      type: "math",
      latex:
        "P = \\begin{pmatrix}1&0.5\\\\0&0\\end{pmatrix}, \\qquad P\\begin{pmatrix}2\\\\3\\end{pmatrix} = \\begin{pmatrix}3.5\\\\0\\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "So the top of a 3 m pole standing at $x = 2$ casts its shadow at $x = 3.5$.\n\n**Step 2: predict $P^2$ before computing.** A shadow is already on the ground, and the shadow of a shadow is itself. So $P^2$ should equal $P$. *Why predict first:* the behaviour tells you the answer; the computation only confirms it.\n\n**Step 3: confirm.** Row 1, $(1, 0.5)$, against the columns: $1 + 0 = 1$ and $0.5 + 0 = 0.5$. Row 2 is all zeros. So $P^2 = P$. This $P$ is not diagonal and does not look special, yet its behaviour (flatten along a slant, then stay put) forces idempotence. It is the $k = 0.5$ member of the $\\begin{pmatrix}1&k\\\\0&0\\end{pmatrix}$ family.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 — a $3\\times3$ idempotent (NCERT).** Show $A = \\begin{pmatrix}2&-2&-4\\\\-1&3&4\\\\1&-2&-3\\end{pmatrix}$ is idempotent.\n\n**Row 1 $(2,-2,-4)$** against the columns: $4 + 2 - 4 = 2$; $-4 - 6 + 8 = -2$; $-8 - 8 + 12 = -4$.\n\n**Row 2 $(-1,3,4)$:** $-2 - 3 + 4 = -1$; $2 + 9 - 8 = 3$; $4 + 12 - 12 = 4$.\n\n**Row 3 $(1,-2,-3)$:** $2 + 2 - 3 = 1$; $-2 - 6 + 6 = -2$; $-4 - 8 + 9 = -3$.\n\nEvery row of $A^2$ reproduces the row of $A$, so $A^2 = A$.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 — a family of involutory and nilpotent $2\\times2$ matrices.** Try $A = \\begin{pmatrix}a&b\\\\c&-a\\end{pmatrix}$ (diagonal entries summing to 0):",
    },
    {
      type: "math",
      latex:
        "A^2 = \\begin{pmatrix}a^2 + bc & ab - ab\\\\ ca - ac & bc + a^2\\end{pmatrix} = (a^2 + bc)\\,I",
    },
    {
      type: "text",
      content:
        "So within this family, $A^2 = I$ exactly when $a^2 + bc = 1$, and $A^2 = O$ (nilpotent) exactly when $a^2 + bc = 0$. Apart from $\\pm I$, every $2\\times2$ involutory matrix has this form, and so does every nilpotent one.\n\n- $\\begin{pmatrix}3&-4\\\\2&-3\\end{pmatrix}$: $9 - 8 = 1$, involutory.\n- $\\begin{pmatrix}2&-4\\\\1&-2\\end{pmatrix}$: $4 - 4 = 0$, nilpotent of index 2.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 — nilpotent of index 3.** $N = \\begin{pmatrix}0&1&0\\\\0&0&1\\\\0&0&0\\end{pmatrix}$ shifts each coordinate up one slot: $(x, y, z) \\mapsto (y, z, 0)$, i.e. $\\mathbf{e}_3 \\to \\mathbf{e}_2 \\to \\mathbf{e}_1 \\to \\mathbf{0}$. So",
    },
    {
      type: "math",
      latex:
        "N^2 = \\begin{pmatrix}0&0&1\\\\0&0&0\\\\0&0&0\\end{pmatrix} \\ne O, \\qquad N^3 = O",
    },
    {
      type: "text",
      content:
        "Each application pushes the non-zero diagonal one place further towards the corner, until it falls off.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "A quick consequence",
      content:
        "If $A$ is idempotent, so is $I - A$: $(I - A)^2 = I - 2A + A^2 = I - 2A + A = I - A$. (Expanding like this is safe because $I$ commutes with $A$.) Geometrically: if $A$ projects onto one line, $I - A$ keeps the part $A$ threw away.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 — from a reflection to a projection (JEE-style).** If $F$ is involutory, show that $P = \\frac{1}{2}(I + F)$ is idempotent, and identify $P$ when $F = \\begin{pmatrix}0&1\\\\1&0\\end{pmatrix}$.\n\n**Step 1: expand.** $P^2 = \\frac{1}{4}(I + F)^2 = \\frac{1}{4}(I + 2F + F^2)$. *Why the expansion is legal:* $I$ commutes with $F$, so the cross terms $IF + FI$ really are $2F$.\n\n**Step 2: use $F^2 = I$.** $P^2 = \\frac{1}{4}(2I + 2F) = \\frac{1}{2}(I + F) = P$.\n\n**Step 3: the example.**",
    },
    {
      type: "math",
      latex:
        "P = \\frac{1}{2}\\begin{pmatrix}1&1\\\\1&1\\end{pmatrix} = \\begin{pmatrix}\\frac{1}{2}&\\frac{1}{2}\\\\\\frac{1}{2}&\\frac{1}{2}\\end{pmatrix}, \\qquad P\\begin{pmatrix}4\\\\0\\end{pmatrix} = \\begin{pmatrix}2\\\\2\\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "$P$ sends $(4, 0)$ to $(2, 2)$, the midpoint of $(4, 0)$ and its mirror image $(0, 4)$. That is the geometric reason behind the algebra: averaging a point with its reflection lands it on the mirror, so $\\frac{1}{2}(I + F)$ is the projection onto the mirror line $y = x$, and projections are idempotent.",
    },
    {
      type: "quiz",
      id: "mx1-5-q1",
      variant: "concept",
      question: "Which of these is a diagonal matrix?",
      options: [
        {
          text: "$\\begin{pmatrix}5&0\\\\0&0\\end{pmatrix}$",
          correct: true,
          feedback: "All off-diagonal entries are zero. A zero on the diagonal is allowed.",
        },
        {
          text: "$\\begin{pmatrix}0&2\\\\2&0\\end{pmatrix}$",
          feedback: "Its non-zero entries are exactly the off-diagonal ones.",
        },
        {
          text: "$\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$",
          feedback: "Upper triangular, but the $(1,2)$ entry is non-zero.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx1-5-q2",
      variant: "concept",
      question: "Which of these is a scalar matrix?",
      options: [
        {
          text: "$\\begin{pmatrix}-2&0\\\\0&-2\\end{pmatrix}$",
          correct: true,
          feedback: "It is $-2I$: diagonal, with equal diagonal entries. A uniform zoom by 2 combined with a half-turn.",
        },
        {
          text: "$\\begin{pmatrix}2&0\\\\0&3\\end{pmatrix}$",
          feedback: "Diagonal, but the diagonal entries differ, so it stretches the axes by different amounts.",
        },
        {
          text: "$\\begin{pmatrix}2&2\\\\2&2\\end{pmatrix}$",
          feedback: "Every entry is equal, but the off-diagonal ones must be zero.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx1-5-q3",
      variant: "practice",
      question: "$A = \\begin{pmatrix}3&-4\\\\2&-3\\end{pmatrix}$. Which describes $A$?",
      options: [
        {
          text: "Involutory: $A^2 = I$.",
          correct: true,
          feedback: "$A^2 = \\begin{pmatrix}9-8 & -12+12\\\\ 6-6 & -8+9\\end{pmatrix} = I$.",
        },
        {
          text: "Idempotent: $A^2 = A$.",
          feedback: "Compute $A^2$: it is $I$, not $A$.",
        },
        {
          text: "Nilpotent: $A^2 = O$.",
          feedback: "That needs $a^2 + bc = 0$; here $9 - 8 = 1$.",
        },
        {
          text: "Orthogonal.",
          feedback: "Column 1 is $(3, 2)$, with length $\\sqrt{13}$, not 1.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx1-5-q4",
      variant: "practice",
      question: "For which values of $k$ is $\\begin{pmatrix}1&k\\\\0&0\\end{pmatrix}$ idempotent?",
      options: [
        {
          text: "Every real $k$.",
          correct: true,
          feedback: "Its square is $\\begin{pmatrix}1&k\\\\0&0\\end{pmatrix}$ whatever $k$ is. Each one projects onto the x-axis, along a different direction.",
        },
        {
          text: "Only $k = 0$.",
          feedback: "$k = 0$ works, but so does every other $k$. Compute the square with $k$ left as a letter.",
        },
        {
          text: "Only $k = 1$.",
          feedback: "Try $k = 5$: row 1 dot column 2 is $1(5) + 5(0) = 5$. Still idempotent.",
        },
        {
          text: "No value of $k$.",
          feedback: "Row 1 dot column 1 is 1 and row 1 dot column 2 is $k$: the square reproduces the matrix.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx1-5-q5",
      variant: "practice",
      question:
        "What is the smallest $p$ with $N^p = O$ for $N = \\begin{pmatrix}0&1&0\\\\0&0&1\\\\0&0&0\\end{pmatrix}$?",
      options: [
        {
          text: "$3$",
          correct: true,
          feedback: "$N^2$ still has a 1 in the corner; $N^3 = O$. The index is 3.",
        },
        {
          text: "$2$",
          feedback: "$N^2 = \\begin{pmatrix}0&0&1\\\\0&0&0\\\\0&0&0\\end{pmatrix} \\ne O$.",
        },
        {
          text: "No such $p$ exists.",
          feedback: "Each power pushes the 1s one step towards the corner; after three steps they are gone.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx1-5-q6",
      variant: "concept",
      question:
        "$P$ satisfies $P^2 = P$ and is neither $O$ nor $I$. What does $P$ do to a vector that is already an output of $P$?",
      options: [
        {
          text: "Leaves it unchanged.",
          correct: true,
          feedback: "If $\\mathbf{w} = P\\mathbf{v}$, then $P\\mathbf{w} = P^2\\mathbf{v} = P\\mathbf{v} = \\mathbf{w}$. That is how a projection behaves.",
        },
        {
          text: "Sends it to $\\mathbf{0}$.",
          feedback: "That describes nilpotent behaviour, $P^2 = O$.",
        },
        {
          text: "Reflects it back to where it came from.",
          feedback: "That is involutory behaviour, $P^2 = I$.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx1-5-q7",
      variant: "practice",
      question:
        "Late-afternoon sun gives the shadow matrix $P = \\begin{pmatrix}1&0.75\\\\0&0\\end{pmatrix}$. A 4 m pole stands at $x = 2$. Where is the shadow of its top, $P\\begin{pmatrix}2\\\\4\\end{pmatrix}$?",
      options: [
        {
          text: "$(5, 0)$",
          correct: true,
          feedback: "$2 + 0.75 \\times 4 = 5$, and row 2 of $P$ sends the height to 0.",
        },
        {
          text: "$(2, 0)$",
          feedback: "That is the noon sun, straight overhead ($k = 0$). Here each ray slides $0.75$ m per metre of drop.",
        },
        {
          text: "$(5, 4)$",
          feedback: "A shadow lies on the ground. Row 2 of $P$ is zero, so the height becomes 0.",
        },
        {
          text: "$(3.5, 0)$",
          feedback: "That multiplies $0.75$ by the $x$-coordinate. The slide depends on the height: $0.75 \\times 4 = 3$.",
        },
      ],
      hint: "Row 1 of $P$ dot $(2, 4)$ gives the shadow's position.",
    },
    {
      type: "quiz",
      id: "mx1-5-q8",
      variant: "practice",
      question: "$F$ satisfies $F^2 = I$. Which of these is always idempotent?",
      options: [
        {
          text: "$\\frac{1}{2}(I + F)$",
          correct: true,
          feedback: "$\\frac{1}{4}(I + 2F + F^2) = \\frac{1}{4}(2I + 2F) = \\frac{1}{2}(I + F)$. It projects onto the mirror of $F$.",
        },
        {
          text: "$I + F$",
          feedback: "$(I + F)^2 = I + 2F + I = 2(I + F)$: off by a factor of 2. That is why the $\\frac{1}{2}$ is there.",
        },
        {
          text: "$2F$",
          feedback: "$(2F)^2 = 4F^2 = 4I$, which is not $2F$.",
        },
        {
          text: "$F$",
          feedback: "$F^2 = I$, which equals $F$ only when $F = I$. A reflection undoes itself; it does not stay put.",
        },
      ],
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "transpose-symmetric-skew-symmetric",
  title: "1.6 · Transpose, Symmetric and Skew-Symmetric",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "A table of marks can be stored with students as rows and subjects as columns, or the other way round. Same data, flipped layout. That flip is the **transpose**, and it turns out to interact with multiplication in a very specific way.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Transpose",
      content:
        "If $A = [a_{ij}]$ is $m\\times n$, its transpose $A^T$ (also written $A'$) is the $n\\times m$ matrix with $(A^T)_{ij} = a_{ji}$.\nRow $i$ of $A$ becomes column $i$ of $A^T$. For a square matrix it is a reflection of the entries across the main diagonal.",
    },
    {
      type: "math",
      latex:
        "A = \\begin{pmatrix}1&2&3\\\\4&5&6\\end{pmatrix} \\quad\\Longrightarrow\\quad A^T = \\begin{pmatrix}1&4\\\\2&5\\\\3&6\\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "Three properties follow straight from the entry formula:\n\n$(A^T)^T = A$: flipping twice restores.\n\n$(A + B)^T = A^T + B^T$: adding entry by entry commutes with moving entries around.\n\n$(kA)^T = kA^T$: scaling every entry commutes with moving them.\n\nThe fourth one involves a product, and it has a twist.",
    },
    {
      type: "text",
      content:
        "**Deriving $(AB)^T$.** Let $A$ be $m\\times n$ and $B$ be $n\\times p$. Look at the $(i, j)$ entry of $(AB)^T$:",
    },
    {
      type: "math",
      latex:
        "\\bigl((AB)^T\\bigr)_{ij} = (AB)_{ji} = \\sum_{k} a_{jk}\\,b_{ki} = \\sum_{k} (B^T)_{ik}\\,(A^T)_{kj} = (B^TA^T)_{ij}",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The reversal rule",
      content:
        "$(AB)^T = B^TA^T$ and $(ABC)^T = C^TB^TA^T$.\nIt is **socks and shoes**: you put socks on, then shoes; to undo, you take off the shoes first. The order reverses.",
    },
    {
      type: "text",
      content:
        "The orders confirm it. $AB$ is $m\\times p$, so $(AB)^T$ is $p\\times m$. $B^TA^T$ is $(p\\times n)(n\\times m) = p\\times m$, which matches. $A^TB^T$ would be $(n\\times m)(p\\times n)$, which is not even defined unless $m = p$.\n\n**Worked example 1 — check it.** $A = \\begin{pmatrix}1&2\\\\0&3\\end{pmatrix}$, $B = \\begin{pmatrix}2&0\\\\1&-1\\end{pmatrix}$.\n\n**Step 1.** $AB = \\begin{pmatrix}4&-2\\\\3&-3\\end{pmatrix}$, so $(AB)^T = \\begin{pmatrix}4&3\\\\-2&-3\\end{pmatrix}$.\n\n**Step 2.** $B^TA^T = \\begin{pmatrix}2&1\\\\0&-1\\end{pmatrix}\\begin{pmatrix}1&0\\\\2&3\\end{pmatrix} = \\begin{pmatrix}4&3\\\\-2&-3\\end{pmatrix}$. It matches.\n\n**Step 3.** For contrast, $A^TB^T = \\begin{pmatrix}1&0\\\\2&3\\end{pmatrix}\\begin{pmatrix}2&1\\\\0&-1\\end{pmatrix} = \\begin{pmatrix}2&1\\\\4&-1\\end{pmatrix}$. This one is wrong.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "(AB)ᵀ is not AᵀBᵀ",
      content:
        "Transposing a product reverses the order. $A^TB^T$ is $(BA)^T$, a different matrix whenever $AB \\ne BA$.",
    },
    {
      type: "text",
      content:
        "**Worked example — two ways to store a mark sheet (application).** Three students took two tests. With students as rows, the mark sheet $M$ is $3\\times2$. The final score counts test 1 at 30% and test 2 at 70%, so the weight column is $\\mathbf{w} = \\begin{pmatrix}0.3\\\\0.7\\end{pmatrix}$.",
    },
    {
      type: "math",
      latex:
        "M = \\begin{pmatrix}80&70\\\\60&90\\\\75&85\\end{pmatrix}, \\qquad M\\mathbf{w} = \\begin{pmatrix}24 + 49\\\\18 + 63\\\\22.5 + 59.5\\end{pmatrix} = \\begin{pmatrix}73\\\\81\\\\82\\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "**Step 1: the other layout.** A second teacher stores the same data with tests as rows. Her table is $M^T$, a $2\\times3$ matrix, and she wants the three final scores as a row.\n\n**Step 2: which product?** $M^T\\mathbf{w}$ is $(2\\times3)(2\\times1)$: not defined. The reversal rule says what to do: $(M\\mathbf{w})^T = \\mathbf{w}^TM^T$, which is $(1\\times2)(2\\times3) = 1\\times3$. *Why this step:* transposing a whole calculation reverses the order of its factors, so the weights move to the front.\n\n**Step 3: compute.** $\\mathbf{w}^TM^T = (0.3,\\; 0.7)\\begin{pmatrix}80&60&75\\\\70&90&85\\end{pmatrix} = (24 + 49,\\; 18 + 63,\\; 22.5 + 59.5) = (73, 81, 82)$. The same scores, laid out as a row. Spreadsheets and data libraries switch layouts like this constantly; the reversal rule tells you where each factor goes.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Symmetric and skew-symmetric",
      content:
        "A square matrix is **symmetric** if $A^T = A$, i.e. $a_{ij} = a_{ji}$: it is its own mirror image across the diagonal.\nIt is **skew-symmetric** if $A^T = -A$, i.e. $a_{ij} = -a_{ji}$.",
    },
    {
      type: "text",
      content:
        "**The diagonal of a skew-symmetric matrix is forced to be zero.** Put $j = i$ into $a_{ij} = -a_{ji}$: $a_{ii} = -a_{ii}$, so $2a_{ii} = 0$ and $a_{ii} = 0$. For example, $\\begin{pmatrix}0&2&-5\\\\-2&0&3\\\\5&-3&0\\end{pmatrix}$ is skew-symmetric. $\\begin{pmatrix}0&3\\\\-3&1\\end{pmatrix}$ is not, because of the 1 on the diagonal.",
    },
    {
      type: "text",
      content:
        "Symmetric matrices have a picture too. $\\begin{pmatrix}2&1\\\\1&2\\end{pmatrix}$ stretches along two **perpendicular** directions ($y = x$ by 3 and $y = -x$ by 1). Every real symmetric matrix has this property (the spectral theorem, which is beyond this course; Chapter 5 shows how to find these directions). It is one reason symmetric matrices are everywhere in physics and statistics. Here you can see it.",
    },
    {
      type: "interactive",
      config: {
        component: "matrix-transform-grid",
        showDeterminant: false,
        matrix: [
          [2, 1],
          [1, 2],
        ],
        showEigenLines: true,
        showProbe: true,
        probe: [1, 0],
        presets: [
          { label: "Symmetric", matrix: [[2, 1], [1, 2]] },
          { label: "Symmetric 2", matrix: [[3, 1], [1, 1]] },
          { label: "Skew 90° turn", matrix: [[0, -1], [1, 0]] },
          { label: "Not symmetric", matrix: [[1, 2], [0, 1]] },
        ],
        caption:
          "The dashed lines are directions the matrix only stretches. For the symmetric presets they are always perpendicular. The skew-symmetric one has none: it is a pure quarter turn.",
      },
    },
    {
      type: "text",
      content:
        "**Every square matrix splits into symmetric plus skew.** For any square $A$, transpose $A + A^T$ and $A - A^T$:",
    },
    {
      type: "math",
      latex:
        "\\begin{aligned}(A + A^T)^T &= A^T + A &&\\Rightarrow\\; A + A^T \\text{ is symmetric}\\\\ (A - A^T)^T &= A^T - A = -(A - A^T) &&\\Rightarrow\\; A - A^T \\text{ is skew}\\end{aligned}",
    },
    {
      type: "text",
      content: "Add the halves of these two and you get $A$ back:",
    },
    {
      type: "math",
      latex:
        "A = \\underbrace{\\tfrac{1}{2}(A + A^T)}_{P\\text{, symmetric}} + \\underbrace{\\tfrac{1}{2}(A - A^T)}_{Q\\text{, skew-symmetric}}",
    },
    {
      type: "text",
      content:
        "This split is unique: if $A = P + Q$ with $P$ symmetric and $Q$ skew, transposing gives $A^T = P - Q$, and solving these two equations forces the formulas above.\n\n**Worked example 2 — a $2\\times2$ split.** $A = \\begin{pmatrix}3&5\\\\1&-1\\end{pmatrix}$, $A^T = \\begin{pmatrix}3&1\\\\5&-1\\end{pmatrix}$.\n$P = \\frac{1}{2}\\begin{pmatrix}6&6\\\\6&-2\\end{pmatrix} = \\begin{pmatrix}3&3\\\\3&-1\\end{pmatrix}$, $Q = \\frac{1}{2}\\begin{pmatrix}0&4\\\\-4&0\\end{pmatrix} = \\begin{pmatrix}0&2\\\\-2&0\\end{pmatrix}$. Check: $P + Q = A$.\n\nShortcut: each off-diagonal pair $(a_{ij}, a_{ji})$ splits into its average (symmetric part) and half its difference (skew part). The diagonal goes entirely into $P$.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 — a $3\\times3$ split (CBSE).** $A = \\begin{pmatrix}2&-2&-4\\\\-1&3&4\\\\1&-2&-3\\end{pmatrix}$.\n\n**Step 1: transpose.** $A^T = \\begin{pmatrix}2&-1&1\\\\-2&3&-2\\\\-4&4&-3\\end{pmatrix}$.\n\n**Step 2: symmetric part.** $A + A^T = \\begin{pmatrix}4&-3&-3\\\\-3&6&2\\\\-3&2&-6\\end{pmatrix}$, so $P = \\begin{pmatrix}2&-\\frac{3}{2}&-\\frac{3}{2}\\\\-\\frac{3}{2}&3&1\\\\-\\frac{3}{2}&1&-3\\end{pmatrix}$.\n\n**Step 3: skew part.** $A - A^T = \\begin{pmatrix}0&-1&-5\\\\1&0&6\\\\5&-6&0\\end{pmatrix}$, so $Q = \\begin{pmatrix}0&-\\frac{1}{2}&-\\frac{5}{2}\\\\\\frac{1}{2}&0&3\\\\\\frac{5}{2}&-3&0\\end{pmatrix}$.\n\n**Step 4: check.** Row 3 of $P + Q$: $-\\frac{3}{2} + \\frac{5}{2} = 1$, $1 - 3 = -2$, $-3 + 0 = -3$. That is row 3 of $A$. Check the other rows the same way.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Facts that follow from the reversal rule",
      content:
        "$AA^T$ and $A^TA$ are always symmetric: $(AA^T)^T = (A^T)^TA^T = AA^T$.\nIf $A$ and $B$ are symmetric, $AB$ is symmetric **exactly when** $AB = BA$, since $(AB)^T = B^TA^T = BA$.\nOrthogonal matrices from 1.5 are exactly those with $A^TA = I$: entry $(i,j)$ of $A^TA$ is column $i$ dot column $j$.",
    },
    {
      type: "text",
      content:
        "**Worked example — orthogonal by the columns (NCERT/JEE).** Find $x$, $y$, $z$ so that the matrix below satisfies $A^TA = I$.",
    },
    {
      type: "math",
      latex: "A = \\begin{pmatrix}0&2y&z\\\\x&y&-z\\\\x&-y&z\\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "**Step 1: translate.** Entry $(i, j)$ of $A^TA$ is (column $i$ of $A$) $\\cdot$ (column $j$ of $A$). So $A^TA = I$ says that each column has squared length 1 and different columns have dot product 0. *Why this beats multiplying out:* nine entries collapse into three length conditions plus three checks.\n\n**Step 2: lengths.** Column 1, $(0, x, x)$: $2x^2 = 1$, so $x = \\pm\\frac{1}{\\sqrt{2}}$. Column 2, $(2y, y, -y)$: $6y^2 = 1$, so $y = \\pm\\frac{1}{\\sqrt{6}}$. Column 3, $(z, -z, z)$: $3z^2 = 1$, so $z = \\pm\\frac{1}{\\sqrt{3}}$.\n\n**Step 3: check perpendicularity.** Columns 1 and 2: $0 + xy - xy = 0$. Columns 1 and 3: $0 - xz + xz = 0$. Columns 2 and 3: $2yz - yz - yz = 0$. These vanish for every choice of signs, so all eight sign choices work.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 — proofs CBSE asks for.** Each one is the same move: transpose the expression, apply the reversal rule, then substitute $A^T = \\pm A$.\n\n**(a) If $A$, $B$ are symmetric, then $AB - BA$ is skew-symmetric.** $(AB - BA)^T = (AB)^T - (BA)^T = B^TA^T - A^TB^T = BA - AB = -(AB - BA)$.\n\n**(b) If $A$, $B$ are symmetric, then $AB + BA$ is symmetric.** $(AB + BA)^T = B^TA^T + A^TB^T = BA + AB$.\n\n**(c) If $A$ is symmetric, so is $B^TAB$ (for any $B$ of the same order).** $(B^TAB)^T = B^TA^T(B^T)^T = B^TAB$. The same computation shows that if $A$ is skew, $(B^TAB)^T = B^T(-A)B = -B^TAB$, so $B^TAB$ is skew.\n\nNotice how (a) and (b) fit Lesson 1.3: $AB - BA$ measures how far $A$ and $B$ are from commuting.",
    },
    {
      type: "quiz",
      id: "mx1-6-q1",
      variant: "concept",
      question: "For matrices $A$ and $B$ where $AB$ is defined, $(AB)^T$ equals:",
      options: [
        {
          text: "$B^TA^T$",
          correct: true,
          feedback: "The order reverses: $((AB)^T)_{ij} = (AB)_{ji} = \\sum_k (B^T)_{ik}(A^T)_{kj}$.",
        },
        {
          text: "$A^TB^T$",
          feedback: "That is $(BA)^T$. For a $2\\times3$ $A$ and $3\\times4$ $B$ it is not even defined.",
        },
        {
          text: "$AB$, since transposing a product changes nothing.",
          feedback: "$(AB)^T$ has the reverse order of $AB$: if $AB$ is $2\\times4$, then $(AB)^T$ is $4\\times2$.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx1-6-q2",
      variant: "practice",
      question: "$A$ is $2\\times3$. What is the order of $A^TA$?",
      options: [
        {
          text: "$3\\times3$",
          correct: true,
          feedback: "$A^T$ is $3\\times2$; $(3\\times2)(2\\times3) = 3\\times3$. (And $AA^T$ is $2\\times2$.)",
        },
        {
          text: "$2\\times2$",
          feedback: "That is the order of $AA^T$.",
        },
        {
          text: "Not defined.",
          feedback: "$A^T$ has 2 columns and $A$ has 2 rows, so the product is defined.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx1-6-q3",
      variant: "practice",
      question:
        "$A$ is a $3\\times3$ skew-symmetric matrix with $a_{12} = 4$, $a_{13} = -1$, $a_{23} = 2$. What is $a_{31}$?",
      options: [
        {
          text: "$1$",
          correct: true,
          feedback: "$a_{31} = -a_{13} = -(-1) = 1$.",
        },
        {
          text: "$-1$",
          feedback: "That would be the symmetric answer, $a_{31} = a_{13}$. Skew means $a_{31} = -a_{13}$.",
        },
        {
          text: "$0$",
          feedback: "Only the diagonal entries are forced to be 0.",
        },
        {
          text: "$-2$",
          feedback: "That is $a_{32} = -a_{23}$, the wrong position.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx1-6-q4",
      variant: "concept",
      question: "Is $\\begin{pmatrix}0&3\\\\-3&1\\end{pmatrix}$ skew-symmetric?",
      options: [
        {
          text: "No — a skew-symmetric matrix must have every diagonal entry equal to 0.",
          correct: true,
          feedback: "$a_{22} = -a_{22}$ forces $a_{22} = 0$, and here it is 1.",
        },
        {
          text: "Yes — the off-diagonal entries are negatives of each other.",
          feedback: "That is necessary but not enough: the condition $a_{ij} = -a_{ji}$ also applies when $i = j$.",
        },
        {
          text: "Yes — it is the sum of a skew and a symmetric part.",
          feedback: "*Every* square matrix is such a sum. That does not make it skew.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx1-6-q5",
      variant: "practice",
      question:
        "Write $A = \\begin{pmatrix}1&4\\\\2&5\\end{pmatrix}$ as $P + Q$ with $P$ symmetric and $Q$ skew-symmetric. What is $P$?",
      options: [
        {
          text: "$\\begin{pmatrix}1&3\\\\3&5\\end{pmatrix}$",
          correct: true,
          feedback: "$P = \\frac{1}{2}(A + A^T)$: the off-diagonal pair 4 and 2 averages to 3. Then $Q = \\begin{pmatrix}0&1\\\\-1&0\\end{pmatrix}$.",
        },
        {
          text: "$\\begin{pmatrix}0&1\\\\-1&0\\end{pmatrix}$",
          feedback: "That is $Q$, the skew part.",
        },
        {
          text: "$\\begin{pmatrix}2&6\\\\6&10\\end{pmatrix}$",
          feedback: "That is $A + A^T$; you forgot the factor $\\frac{1}{2}$.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx1-6-q6",
      variant: "concept",
      question: "$A$ and $B$ are symmetric matrices of the same order. When is $AB$ symmetric?",
      options: [
        {
          text: "Exactly when $AB = BA$.",
          correct: true,
          feedback: "$(AB)^T = B^TA^T = BA$, so $AB$ is symmetric iff $AB = BA$.",
        },
        {
          text: "Always.",
          feedback: "Try $\\begin{pmatrix}1&0\\\\0&2\\end{pmatrix}\\begin{pmatrix}0&1\\\\1&0\\end{pmatrix} = \\begin{pmatrix}0&1\\\\2&0\\end{pmatrix}$, which is not symmetric.",
        },
        {
          text: "Never.",
          feedback: "$A$ times $I$ is $A$, which is symmetric.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx1-6-q7",
      variant: "concept",
      question: "$A$ is skew-symmetric. What can you say about $A^2$?",
      options: [
        {
          text: "It is symmetric.",
          correct: true,
          feedback: "$(A^2)^T = (AA)^T = A^TA^T = (-A)(-A) = A^2$. The two minus signs cancel.",
        },
        {
          text: "It is skew-symmetric, like $A$.",
          feedback: "Transposing gives $(-A)(-A)$, and two minus signs make a plus. Try $A = \\begin{pmatrix}0&1\\\\-1&0\\end{pmatrix}$: $A^2 = -I$, which is symmetric, not skew.",
        },
        {
          text: "It is the zero matrix.",
          feedback: "Only the diagonal of $A$ is forced to be 0. For $A = \\begin{pmatrix}0&1\\\\-1&0\\end{pmatrix}$, $A^2 = -I \\ne O$.",
        },
        {
          text: "Nothing in general.",
          feedback: "The reversal rule settles it: $(A^2)^T = (A^T)^2 = (-A)^2 = A^2$.",
        },
      ],
      hint: "Transpose $AA$ with the reversal rule, then substitute $A^T = -A$.",
    },
    {
      type: "quiz",
      id: "mx1-6-q8",
      variant: "practice",
      question:
        "A school stores marks as $M^T$: 5 subjects as rows, 40 students as columns. $\\mathbf{w}$ is the $5\\times1$ column of subject weights. Which product gives the 40 final scores as a row?",
      options: [
        {
          text: "$\\mathbf{w}^TM^T$",
          correct: true,
          feedback: "$(1\\times5)(5\\times40) = 1\\times40$, and by the reversal rule it equals $(M\\mathbf{w})^T$.",
        },
        {
          text: "$M^T\\mathbf{w}$",
          feedback: "$(5\\times40)(5\\times1)$: the inner numbers 40 and 5 do not match.",
        },
        {
          text: "$\\mathbf{w}M^T$",
          feedback: "$(5\\times1)(5\\times40)$: the inner numbers 1 and 5 do not match.",
        },
        {
          text: "$M^T\\mathbf{w}^T$",
          feedback: "$(5\\times40)(1\\times5)$: the inner numbers 40 and 1 do not match.",
        },
      ],
      hint: "$M$ (students × subjects) times $\\mathbf{w}$ gives the scores as a column. Transpose that product.",
    },
    {
      type: "quiz",
      id: "mx1-6-q9",
      variant: "practice",
      question:
        "For which positive $x$ does $A = \\begin{pmatrix}x&0.8\\\\0.8&-x\\end{pmatrix}$ satisfy $A^TA = I$?",
      options: [
        {
          text: "$x = 0.6$",
          correct: true,
          feedback: "Column 1 has squared length $x^2 + 0.64 = 1$, so $x = 0.6$. The dot product of the columns is $0.8x - 0.8x = 0$ for any $x$.",
        },
        {
          text: "$x = 0.8$",
          feedback: "Then column 1 has squared length $0.64 + 0.64 = 1.28 \\ne 1$.",
        },
        {
          text: "$x = 0.36$",
          feedback: "$0.36$ is $x^2$. Take the square root: $x = 0.6$.",
        },
        {
          text: "$x = 1$",
          feedback: "Then column 1 is $(1, 0.8)$, with squared length $1.64$: too long to be a unit vector.",
        },
      ],
      hint: "Entry $(1,1)$ of $A^TA$ is column 1 dotted with itself.",
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "matrices-chapter-1-mastery",
  title: "1.7 · Chapter 1 Mastery",
  position: 7,
  blocks: blocks([
    {
      type: "callout",
      variant: "info",
      title: "The chapter in one chain",
      content:
        "**$AB$ = do $B$, then $A$.** Column $j$ of $AB$ is $A$ times column $j$ of $B$, and entry $(i,j)$ is row $i$ of $A$ dot column $j$ of $B$. The inner orders must match: $(m\\times n)(n\\times p) = m\\times p$.\n**Order matters:** $AB \\ne BA$ in general; $AB = O$ is possible with $A, B \\ne O$; $AB = AC$ does not give $B = C$; $(A+B)^2 = A^2 + AB + BA + B^2$.\n**What still works:** associativity, distributivity, $I$, powers, and matrix polynomials such as $A^2 - 5A + 7I = O$; the binomial theorem only for commuting pairs, e.g. $(aI + N)^n$; $\\operatorname{tr}(AB) = \\operatorname{tr}(BA)$.\n**Types:** diagonal, scalar, triangular; idempotent $A^2 = A$ (projection), nilpotent $A^k = O$, involutory $A^2 = I$ (reflection), orthogonal (rigid motion).\n**Transpose:** $(AB)^T = B^TA^T$; symmetric $A^T = A$, skew $A^T = -A$ (zero diagonal); $A = \\frac{1}{2}(A + A^T) + \\frac{1}{2}(A - A^T)$.",
    },
    {
      type: "quiz",
      id: "mx1-m-q1",
      variant: "mastery",
      question: "$A$ is $3\\times4$ and $B$ is $4\\times2$. Which is correct?",
      options: [
        {
          text: "$AB$ is $3\\times2$; $BA$ is not defined.",
          correct: true,
          feedback: "$(3\\times\\boxed{4})(\\boxed{4}\\times2)$ gives $3\\times2$; for $BA$ the inner numbers are 2 and 3.",
        },
        {
          text: "$AB$ is $4\\times4$; $BA$ is $2\\times3$.",
          feedback: "The outer numbers give the order of a product, not the inner ones.",
        },
        {
          text: "Both $AB$ and $BA$ are defined.",
          feedback: "$BA$ would need $B$'s 2 columns to match $A$'s 3 rows.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx1-m-q2",
      variant: "mastery",
      question:
        "$A = \\begin{pmatrix}1&-2&3\\\\0&4&-1\\end{pmatrix}$, $B = \\begin{pmatrix}2&1\\\\-1&0\\\\3&5\\end{pmatrix}$. Find $(AB)_{12}$.",
      options: [
        {
          text: "$16$",
          correct: true,
          feedback: "Row 1 of $A$ dot column 2 of $B$: $1(1) + (-2)(0) + 3(5) = 16$.",
        },
        {
          text: "$13$",
          feedback: "That is $(AB)_{11}$: $2 + 2 + 9$.",
        },
        {
          text: "$-7$",
          feedback: "That is $(AB)_{21}$: row 2 dot column 1.",
        },
        {
          text: "$-5$",
          feedback: "That is $(AB)_{22}$: row 2 dot column 2.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx1-m-q3",
      variant: "mastery",
      question:
        "For square matrices $A$, $B$, $C$ of the same order, which statement is **always** true?",
      options: [
        {
          text: "$(A+B)^2 = A^2 + AB + BA + B^2$",
          correct: true,
          feedback: "Distributivity with the order of each product kept intact.",
        },
        {
          text: "If $AB = O$ then $A = O$ or $B = O$.",
          feedback: "$\\begin{pmatrix}1&0\\\\0&0\\end{pmatrix}\\begin{pmatrix}0&0\\\\1&0\\end{pmatrix} = O$ with neither factor zero.",
        },
        {
          text: "If $AB = AC$ and $A \\ne O$ then $B = C$.",
          feedback: "Cancellation needs $A$ to be invertible, not merely non-zero.",
        },
        {
          text: "$(A - B)(A + B) = A^2 - B^2$",
          feedback: "It expands to $A^2 + AB - BA - B^2$, which equals $A^2 - B^2$ only when $AB = BA$.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx1-m-q4",
      variant: "mastery",
      question: "Which identity does $A = \\begin{pmatrix}2&1\\\\-1&1\\end{pmatrix}$ satisfy?",
      options: [
        {
          text: "$A^2 - 3A + 3I = O$",
          correct: true,
          feedback: "$A^2 = \\begin{pmatrix}3&3\\\\-3&0\\end{pmatrix}$, $3A = \\begin{pmatrix}6&3\\\\-3&3\\end{pmatrix}$, and $A^2 - 3A + 3I = O$. (Here $a + d = 3$ and $ad - bc = 2 + 1 = 3$.)",
        },
        {
          text: "$A^2 - 3A - 3I = O$",
          feedback: "The $(1,1)$ entry would be $3 - 6 - 3 = -6 \\ne 0$.",
        },
        {
          text: "$A^2 - 2A + 3I = O$",
          feedback: "The coefficient of $A$ is the trace $a + d = 2 + 1 = 3$, not the $(1,1)$ entry.",
        },
      ],
      hint: "For a $2\\times2$ matrix, $A^2 - (a+d)A + (ad - bc)I = O$.",
    },
    {
      type: "quiz",
      id: "mx1-m-q5",
      variant: "mastery",
      question: "Which property does $N = \\begin{pmatrix}0&1\\\\0&0\\end{pmatrix}$ have?",
      options: [
        {
          text: "Nilpotent: $N^2 = O$.",
          correct: true,
          feedback: "$N$ sends $\\hat{\\jmath}$ to $\\hat{\\imath}$ and $\\hat{\\imath}$ to $\\mathbf{0}$. After two steps nothing is left.",
        },
        {
          text: "Idempotent: $N^2 = N$.",
          feedback: "$N^2 = O$, which is not $N$.",
        },
        {
          text: "Involutory: $N^2 = I$.",
          feedback: "$N$ destroys $\\hat{\\imath}$, so nothing can bring it back; $N^2 = O$.",
        },
        {
          text: "Symmetric.",
          feedback: "$a_{12} = 1$ but $a_{21} = 0$.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx1-m-q6",
      variant: "mastery",
      question: "$(ABC)^T$ equals:",
      options: [
        {
          text: "$C^TB^TA^T$",
          correct: true,
          feedback: "Apply the reversal rule twice: $((AB)C)^T = C^T(AB)^T = C^TB^TA^T$.",
        },
        {
          text: "$A^TB^TC^T$",
          feedback: "Transposing reverses the order of a product.",
        },
        {
          text: "$C^TA^TB^T$",
          feedback: "Only the last factor moved. The whole order must reverse.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx1-m-q7",
      variant: "mastery",
      question:
        "What is the skew-symmetric part of $A = \\begin{pmatrix}2&6\\\\0&4\\end{pmatrix}$?",
      options: [
        {
          text: "$\\begin{pmatrix}0&3\\\\-3&0\\end{pmatrix}$",
          correct: true,
          feedback: "$\\frac{1}{2}(A - A^T) = \\frac{1}{2}\\begin{pmatrix}0&6\\\\-6&0\\end{pmatrix}$. The symmetric part is $\\begin{pmatrix}2&3\\\\3&4\\end{pmatrix}$.",
        },
        {
          text: "$\\begin{pmatrix}2&3\\\\3&4\\end{pmatrix}$",
          feedback: "That is the symmetric part, $\\frac{1}{2}(A + A^T)$.",
        },
        {
          text: "$\\begin{pmatrix}0&6\\\\-6&0\\end{pmatrix}$",
          feedback: "That is $A - A^T$; halve it.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx1-m-q8",
      variant: "mastery",
      question:
        "The plane is first reflected in the x-axis by $F = \\begin{pmatrix}1&0\\\\0&-1\\end{pmatrix}$, then rotated $90^\\circ$ anticlockwise by $R = \\begin{pmatrix}0&-1\\\\1&0\\end{pmatrix}$. Which single matrix does both?",
      options: [
        {
          text: "$\\begin{pmatrix}0&1\\\\1&0\\end{pmatrix}$, which is $RF$ (a reflection in $y = x$).",
          correct: true,
          feedback: "$F$ acts first, so the product is $RF$. $\\hat{\\imath} \\to \\hat{\\imath} \\to (0,1)$ and $\\hat{\\jmath} \\to (0,-1) \\to (1,0)$.",
        },
        {
          text: "$\\begin{pmatrix}0&-1\\\\-1&0\\end{pmatrix}$, which is $FR$.",
          feedback: "That rotates first and then reflects, so it is the wrong order. The first move goes on the right.",
        },
        {
          text: "$\\begin{pmatrix}1&-1\\\\1&-1\\end{pmatrix}$, which is $R + F$.",
          feedback: "Composition is a product, not a sum.",
        },
      ],
      hint: "Follow $\\hat{\\imath}$ and $\\hat{\\jmath}$ through $F$, then through $R$.",
    },
    {
      type: "interactive",
      config: {
        component: "matrix-transform-grid",
        showDeterminant: false,
        mode: "compose",
        matrix: ROT90,
        secondMatrix: [
          [1, 0],
          [0, -1],
        ],
        caption:
          "Check the last question: B is the reflection F (first), A is the rotation R (second). Compare the product readout with your answer, and see what the reversed order gives.",
      },
    },
    {
      type: "quiz",
      id: "mx1-m-q9",
      variant: "mastery",
      question: "What is $\\begin{pmatrix}1&0\\\\2&1\\end{pmatrix}^n$ for a positive integer $n$?",
      options: [
        {
          text: "$\\begin{pmatrix}1&0\\\\2n&1\\end{pmatrix}$",
          correct: true,
          feedback: "A vertical shear by 2, repeated $n$ times, is a vertical shear by $2n$. Induction: $\\begin{pmatrix}1&0\\\\2k&1\\end{pmatrix}\\begin{pmatrix}1&0\\\\2&1\\end{pmatrix} = \\begin{pmatrix}1&0\\\\2k+2&1\\end{pmatrix}$.",
        },
        {
          text: "$\\begin{pmatrix}1&0\\\\2^n&1\\end{pmatrix}$",
          feedback: "Try $n = 2$: the product has $(2,1)$ entry $2 + 2 = 4$, which fits both. At $n = 3$ it is 6, not 8. Shears add.",
        },
        {
          text: "$\\begin{pmatrix}1&0\\\\2&1\\end{pmatrix}$",
          feedback: "That would require the matrix to be idempotent. Its square has a 4 in the corner.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx1-m-q10",
      variant: "mastery",
      question:
        "$A = \\begin{pmatrix}1&0&2\\\\-1&3&1\\end{pmatrix}$, $B = \\begin{pmatrix}2&1\\\\0&-1\\\\1&4\\end{pmatrix}$. What is $AB$?",
      options: [
        {
          text: "$\\begin{pmatrix}4&9\\\\-1&0\\end{pmatrix}$",
          correct: true,
          feedback: "Row 1: $2 + 0 + 2 = 4$, $1 + 0 + 8 = 9$. Row 2: $-2 + 0 + 1 = -1$, $-1 - 3 + 4 = 0$.",
        },
        {
          text: "$\\begin{pmatrix}4&-1\\\\9&0\\end{pmatrix}$",
          feedback: "Right numbers, wrong places: that is $(AB)^T$. Entry $(i,j)$ uses row $i$ of $A$ and column $j$ of $B$.",
        },
        {
          text: "Not defined, because $A$ and $B$ have different orders.",
          feedback: "Equal orders are needed for *adding*. For multiplying, only the inner numbers must match: $(2\\times\\boxed{3})(\\boxed{3}\\times2)$.",
        },
        {
          text: "A $3\\times3$ matrix.",
          feedback: "That is $BA$, a $(3\\times2)(2\\times3)$ product. $AB$ takes its order from the outer numbers of $(2\\times3)(3\\times2)$.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx1-m-q11",
      variant: "mastery",
      question: "$A$ is a square matrix with $A^2 = A$. What is $(I + A)^3$?",
      options: [
        {
          text: "$I + 7A$",
          correct: true,
          feedback: "$I$ commutes with $A$ and every power of $A$ is $A$, so $(I + A)^3 = I + 3A + 3A + A = I + 7A$. In general $(I + A)^n = I + (2^n - 1)A$.",
        },
        {
          text: "$I + 3A$",
          feedback: "That keeps only the first two binomial terms. The $3A^2$ and $A^3$ terms are not zero here; they each equal a multiple of $A$.",
        },
        {
          text: "$I + A$",
          feedback: "$I + A$ is not idempotent: $(I + A)^2 = I + 3A$. Only $A$ repeats itself.",
        },
        {
          text: "$I + 8A$",
          feedback: "Count the binomial coefficients that multiply $A$: $3 + 3 + 1 = 7 = 2^3 - 1$. The $\\binom{3}{0} = 1$ goes with $I$.",
        },
      ],
      hint: "Expand $(I + A)^3$ binomially (allowed, since $I$ commutes with $A$) and replace every $A^r$ by $A$.",
    },
    {
      type: "quiz",
      id: "mx1-m-q12",
      variant: "mastery",
      question: "Which of these is **always** symmetric, for any matrix $A$ and any symmetric $B$ and $C$ of suitable orders?",
      options: [
        {
          text: "$AA^T$",
          correct: true,
          feedback: "$(AA^T)^T = (A^T)^TA^T = AA^T$, for any $A$, square or not.",
        },
        {
          text: "$A - A^T$ (for square $A$)",
          feedback: "That one is skew: $(A - A^T)^T = A^T - A$.",
        },
        {
          text: "$BC$",
          feedback: "$(BC)^T = C^TB^T = CB$, so $BC$ is symmetric only when $B$ and $C$ commute.",
        },
        {
          text: "$BC - CB$",
          feedback: "$(BC - CB)^T = CB - BC$: it is skew-symmetric.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx1-m-q13",
      variant: "mastery",
      question: "Every scalar matrix is diagonal. A diagonal matrix is scalar exactly when:",
      options: [
        {
          text: "All its diagonal entries are equal.",
          correct: true,
          feedback: "Then it is $kI$: the same zoom factor in every direction.",
        },
        {
          text: "All its diagonal entries are non-zero.",
          feedback: "$\\begin{pmatrix}2&0\\\\0&3\\end{pmatrix}$ has non-zero diagonal entries but stretches the axes differently. It is not $kI$.",
        },
        {
          text: "It is the identity matrix.",
          feedback: "$I$ is one scalar matrix, but $3I$ and $-2I$ (and even $O = 0I$) are scalar too.",
        },
        {
          text: "Its off-diagonal entries are zero.",
          feedback: "That is the definition of diagonal, which is already given. Scalar needs more.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx1-m-q14",
      variant: "mastery",
      question:
        "$A = \\begin{pmatrix}\\cos\\theta&\\sin\\theta\\\\-\\sin\\theta&\\cos\\theta\\end{pmatrix}$ with $\\theta = \\frac{\\pi}{4}$. What is the smallest positive $n$ with $A^n = I$?",
      options: [
        {
          text: "$8$",
          correct: true,
          feedback: "$A^n$ is the same matrix with angle $\\frac{n\\pi}{4}$. That equals $I$ when $\\frac{n\\pi}{4}$ is a multiple of $2\\pi$, first at $n = 8$.",
        },
        {
          text: "$4$",
          feedback: "$A^4$ has angle $\\pi$: $\\cos\\pi = -1$, so $A^4 = -I$.",
        },
        {
          text: "$2$",
          feedback: "$A^2$ has angle $\\frac{\\pi}{2}$: a quarter turn, not the identity.",
        },
        {
          text: "No such $n$ exists.",
          feedback: "Eight turns of $45^\\circ$ bring every vector back to where it started.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx1-m-q15",
      variant: "mastery",
      question: "$A$ and $B$ are symmetric matrices of the same order. Then $AB - BA$ is:",
      options: [
        {
          text: "skew-symmetric.",
          correct: true,
          feedback: "$(AB - BA)^T = B^TA^T - A^TB^T = BA - AB = -(AB - BA)$.",
        },
        {
          text: "symmetric.",
          feedback: "That is $AB + BA$. Transposing $AB - BA$ swaps the two products, which flips the sign.",
        },
        {
          text: "always $O$.",
          feedback: "Only when $A$ and $B$ commute. $\\begin{pmatrix}1&0\\\\0&2\\end{pmatrix}$ and $\\begin{pmatrix}0&1\\\\1&0\\end{pmatrix}$ are symmetric and do not commute.",
        },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "You can now multiply, compose and simplify. Chapter 2 asks one number of every square matrix: by what factor does it scale area? That number, the determinant, turns out to multiply exactly as the transformations compose: $\\det(AB) = \\det A \\cdot \\det B$.",
    },
  ]),
};

export const matricesChapter1Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lessonMastery,
];
