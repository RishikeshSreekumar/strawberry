import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Matrices Chapter 5 — Rank and Eigenvalues: The Shape of a Transformation.
 * The finale: rank counts the dimensions that survive and settles every
 * consistency question from Chapter 4; eigenvectors are the directions a
 * transformation does not turn, eigenvalues their stretch; the
 * characteristic equation finds them, and Cayley–Hamilton turns it into a
 * machine for inverses and powers. Ends with a full-course diagnostic.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const CHAR_WINDOW = { xmin: -1, xmax: 7, ymin: -4, ymax: 12 };

const lesson01: LessonSeed = {
  slug: "rank-how-many-dimensions-survive",
  title: "5.1 · Rank: How Many Dimensions Survive",
  position: 1,
  blocks: blocks([
    {
      type: "video",
      src: "/videos/mx-5-rank-and-eigenvalues.mp4",
      poster: "/videos/mx-5-rank-and-eigenvalues.jpg",
      title: "Chapter 5 overview video",
      caption:
        "A narrated walk through the whole chapter. Watch it now for the big picture, or come back to it as a recap.",
    },
    {
      type: "text",
      content:
        "In Chapter 2 the determinant gave a yes/no answer to one question: *does the plane get squashed?* When $\\det A = 0$, the answer was yes, and that was the end of the story. But a squash can be mild or total. A matrix can flatten the plane onto a line, or crush everything to a single point. Those are very different transformations, and $\\det A = 0$ cannot tell them apart.",
    },
    {
      type: "text",
      content:
        "The number that tells them apart is the **rank**: how many dimensions are still standing after the transformation has done its work. Try the three presets below and watch what the unit square becomes.",
    },
    {
      type: "interactive",
      config: {
        component: "matrix-transform-grid",
        matrix: [
          [2, 1],
          [1, 3],
        ],
        showDeterminant: true,
        presets: [
          { label: "Rank 2: plane to plane", matrix: [[2, 1], [1, 3]] },
          { label: "Rank 1: onto a line", matrix: [[1, 2], [2, 4]] },
          { label: "Rank 1: another line", matrix: [[1, -1], [-2, 2]] },
          { label: "Rank 0: to a point", matrix: [[0, 0], [0, 0]] },
        ],
        caption:
          "Rank 2: the square becomes a genuine parallelogram and the whole plane is still covered. Rank 1: both columns lie on one line, so every output lands on that line. Rank 0: every vector goes to the origin.",
      },
    },
    {
      type: "text",
      content:
        "Look at *why* the rank-1 presets collapse. In $\\begin{pmatrix}1&2\\\\2&4\\end{pmatrix}$ the second column $(2, 4)$ is twice the first column $(1, 2)$. Every output $x\\,(1,2) + y\\,(2,4) = (x + 2y)(1, 2)$ is a multiple of $(1,2)$, so the whole plane lands on one line. The columns only supply **one** independent direction.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Rank",
      content:
        "The **rank** of a matrix $A$, written $\\operatorname{rank} A$ or $\\rho(A)$, is the number of dimensions in its output: the maximum number of linearly independent columns. Equivalently, it is the maximum number of linearly independent rows. For an $m \\times n$ matrix, $0 \\le \\operatorname{rank} A \\le \\min(m, n)$, and $\\operatorname{rank} A = 0$ only for the zero matrix.",
    },
    {
      type: "text",
      content:
        "\"Independent\" means no member of the set can be built from the others. Two vectors are dependent exactly when they are parallel. Three vectors in space are dependent exactly when one lies in the plane of the other two.",
    },
    {
      type: "text",
      content:
        "**Rows and columns always agree.** Take $\\begin{pmatrix}1&2\\\\3&6\\end{pmatrix}$. The columns $(1,3)$ and $(2,6)$ are parallel, so the column rank is 1. The rows $(1,2)$ and $(3,6)$ are parallel too, so the row rank is also 1. This is not a coincidence of the example. Row rank equals column rank for every matrix, and that is why we can speak of *the* rank. (Row reduction shows why below: the pivots count both.)",
    },
    {
      type: "callout",
      variant: "info",
      title: "Square matrices: rank and determinant",
      content:
        "An $n \\times n$ matrix has full rank $n$ exactly when nothing is squashed, i.e. when $\\det A \\ne 0$. So $\\det A \\ne 0 \\iff \\operatorname{rank} A = n \\iff A^{-1}$ exists. Rank refines the determinant: when $\\det A = 0$, the rank says *how much* was lost.",
    },
    {
      type: "text",
      content:
        "### Method 1: row reduce to echelon form\n\nRow operations never change the rank. Swapping rows reorders them, scaling by a non-zero number keeps the same line, and adding a multiple of one row to another never creates or destroys independence. So reduce to echelon form, where independence is visible at a glance, and count.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Rank by echelon form",
      content:
        "$\\operatorname{rank} A$ = the number of **non-zero rows** in any row echelon form of $A$ = the number of pivots.",
    },
    {
      type: "text",
      content:
        "**Why pivots count columns too.** A row operation never changes which combinations of the columns give zero, because it applies the same operation to every column's entries. So a set of columns is independent before reduction exactly when it is independent after. In echelon form the pivot columns are clearly independent, and every other column is built from them. So the number of independent columns is the number of pivots, which is also the number of non-zero rows. Row rank = column rank.",
    },
    {
      type: "text",
      content:
        "**Worked example 1.** Find the rank of $A = \\begin{pmatrix}1&2&3\\\\2&4&6\\\\1&0&1\\end{pmatrix}$.\n\n**Step 1.** $R_2 \\to R_2 - 2R_1$ gives $(0, 0, 0)$. Row 2 was secretly twice row 1.\n\n**Step 2.** $R_3 \\to R_3 - R_1$ gives $(0, -2, -2)$.\n\n**Step 3.** Swap $R_2 \\leftrightarrow R_3$ to put the zero row at the bottom:",
    },
    {
      type: "math",
      latex: "\\begin{pmatrix}1&2&3\\\\0&-2&-2\\\\0&0&0\\end{pmatrix} \\quad\\Rightarrow\\quad \\operatorname{rank} A = 2",
    },
    {
      type: "text",
      content:
        "Notice that the original matrix had **three** non-zero rows. The rank is 2 because one row depended on the others, which only showed up after elimination. Try it yourself below.",
    },
    {
      type: "interactive",
      config: {
        component: "matrix-row-reducer",
        mode: "rank",
        matrix: [
          [1, 2, 3],
          [2, 4, 6],
          [1, 0, 1],
        ],
        target: "echelon",
        caption:
          "Use R₂ → R₂ − 2R₁ and R₃ → R₃ − R₁, then swap. Once you reach echelon form, the rank appears: count the non-zero rows.",
      },
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: rank = non-zero rows of the original matrix",
      content:
        "Only in **echelon** form do the non-zero rows count the rank. In the original matrix a row can be non-zero but still dependent on the others, like $(2,4,6) = 2(1,2,3)$. Reduce first, then count.",
    },
    {
      type: "text",
      content:
        "### Method 2: the largest non-zero minor\n\nThe classical textbook definition (used in many Indian boards and older NCERT texts) goes through determinants: $\\operatorname{rank} A = r$ if some $r \\times r$ minor of $A$ is non-zero and every $(r+1) \\times (r+1)$ minor is zero. It is the same number, seen another way. A non-zero $r \\times r$ minor picks out $r$ rows and $r$ columns that span a genuine $r$-dimensional box.",
    },
    {
      type: "text",
      content:
        "**Worked example 2.** Find the rank of $B = \\begin{pmatrix}1&2&3\\\\4&5&6\\\\7&8&9\\end{pmatrix}$.\n\n**Step 1: the only $3\\times3$ minor.** $\\det B = 1(45-48) - 2(36-42) + 3(32-35) = -3 + 12 - 9 = 0$. So $\\operatorname{rank} B < 3$.\n\n**Step 2: look for a non-zero $2\\times2$ minor.** Rows 1–2, columns 1–2: $\\begin{vmatrix}1&2\\\\4&5\\end{vmatrix} = 5 - 8 = -3 \\ne 0$.\n\n**Conclusion.** $\\operatorname{rank} B = 2$. The whole of space is flattened onto a plane. (Indeed $R_3 = 2R_2 - R_1$.)",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (a $2 \\times 3$).** Find the rank of $C = \\begin{pmatrix}1&-1&2\\\\-2&2&-4\\end{pmatrix}$.\n\nThe maximum possible is $\\min(2,3) = 2$. But $R_2 = -2R_1$, so $R_2 \\to R_2 + 2R_1$ gives a zero row and $\\operatorname{rank} C = 1$. Check with minors: all three $2\\times2$ minors are $0$, for example $\\begin{vmatrix}1&-1\\\\-2&2\\end{vmatrix} = 2 - 2 = 0$, and there is a non-zero $1\\times1$ minor (the entry 1).",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (application: redundant gift packs).** A sweet shop sells three gift packs. Pack P contains 2 chocolates, 1 cookie and 3 candies; pack Q contains 1, 2, 0; pack R contains 4, 5, 3. The owner wonders whether R is a genuinely new product, or whether a customer could build it from P's and Q's. How many *independent* packs are there?\n\n**Step 1: turn the packs into rows.** Each pack is a vector (chocolates, cookies, candies). Stack them:",
    },
    {
      type: "math",
      latex: "\\begin{pmatrix}2&1&3\\\\1&2&0\\\\4&5&3\\end{pmatrix} \\xrightarrow{R_1 \\leftrightarrow R_2} \\begin{pmatrix}1&2&0\\\\2&1&3\\\\4&5&3\\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "*Why this step:* a leading 1 makes the eliminations use whole numbers. Swapping rows never changes the rank.\n\n**Step 2: eliminate below the pivot.** $R_2 \\to R_2 - 2R_1$ gives $(0, -3, 3)$, and $R_3 \\to R_3 - 4R_1$ gives $(0, -3, 3)$.\n\n**Step 3: eliminate again.** $R_3 \\to R_3 - R_2$ gives $(0, 0, 0)$.",
    },
    {
      type: "math",
      latex: "\\begin{pmatrix}1&2&0\\\\0&-3&3\\\\0&0&0\\end{pmatrix} \\quad\\Rightarrow\\quad \\operatorname{rank} = 2",
    },
    {
      type: "text",
      content:
        "**Interpretation.** Only two packs are independent. Indeed $R = P + 2Q$: $(2,1,3) + 2(1,2,0) = (4, 5, 3)$. ✓ Buying one P and two Q's gives exactly the contents of an R. In picture terms, the set of all mixes you can make from these packs is a **plane** in 3D (chocolate, cookie, candy) space, not all of space. A customer who wants, say, only candies can never get them, whatever packs they combine.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (JEE pattern).** For which real $k$ is $\\operatorname{rank}\\begin{pmatrix}1&1&1\\\\1&k&1\\\\1&1&k\\end{pmatrix}$ equal to 3, 2 or 1?\n\n**Step 1: eliminate with the first row.** $R_2 \\to R_2 - R_1$ gives $(0, k - 1, 0)$, and $R_3 \\to R_3 - R_1$ gives $(0, 0, k - 1)$.",
    },
    {
      type: "math",
      latex: "\\begin{pmatrix}1&1&1\\\\0&k-1&0\\\\0&0&k-1\\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "*Why this step:* the first row has a 1 in every place, so subtracting it clears column 1 without creating fractions, and the parameter $k$ is left sitting on the diagonal.\n\n**Step 2: split into cases on $k - 1$.**\n- $k \\ne 1$: three pivots, so $\\operatorname{rank} = 3$. (Check: $\\det = (k - 1)^2 \\ne 0$.)\n- $k = 1$: rows 2 and 3 vanish and $\\operatorname{rank} = 1$. All three rows are $(1, 1, 1)$.\n\n**Conclusion.** The rank is **never** 2. That is the trap in the exam question: the answer to \"for which $k$ is the rank 2?\" is \"no value of $k$\". The determinant $(k - 1)^2$ only says $k = 1$ is singular. The echelon form says *how* singular.",
    },
    {
      type: "table",
      headers: ["Method", "When it is quickest", "Watch out for"],
      rows: [
        ["Echelon form", "Almost always, especially 3×3 or larger", "Count non-zero rows only after reducing"],
        ["Largest non-zero minor", "2×2 and 2×3, or when a determinant is easy", "A 3×3 has nine 2×2 minors; you need just one non-zero"],
        ["Spot dependence by eye", "Rows or columns that are obvious multiples", "Dependence can involve three rows at once, e.g. R₃ = R₁ + R₂"],
      ],
    },
    {
      type: "quiz",
      id: "mx5-1-q1",
      variant: "concept",
      question: "What is the rank of $\\begin{pmatrix}1&2&3\\\\2&4&6\\\\3&6&9\\end{pmatrix}$?",
      options: [
        { text: "1", correct: true, feedback: "Rows 2 and 3 are 2 and 3 times row 1. Elimination leaves one non-zero row, so everything lands on a single line." },
        { text: "3", feedback: "That counts the non-zero rows of the original matrix. They are all multiples of $(1,2,3)$, so only one is independent." },
        { text: "0", feedback: "Rank 0 is reserved for the zero matrix. This matrix still sends vectors to a line." },
        { text: "2", feedback: "Try $R_2 - 2R_1$ and $R_3 - 3R_1$: both rows vanish, not just one." },
      ],
      hint: "Compare each row with the first row.",
    },
    {
      type: "quiz",
      id: "mx5-1-q2",
      variant: "concept",
      question: "A $3 \\times 5$ matrix has 3 linearly independent rows. How many linearly independent columns does it have?",
      options: [
        { text: "Exactly 3", correct: true, feedback: "Row rank always equals column rank. The five columns live in 3-dimensional space and span all of it, so exactly 3 of them are independent." },
        { text: "5", feedback: "Five vectors in $\\mathbb{R}^3$ can never be independent. At most 3 can be." },
        { text: "It could be anything from 1 to 5", feedback: "Row rank and column rank are always equal, so the column count is fixed at 3." },
      ],
    },
    {
      type: "quiz",
      id: "mx5-1-q3",
      variant: "practice",
      question: "Find the rank of $\\begin{pmatrix}1&1&1\\\\1&2&3\\\\2&3&4\\end{pmatrix}$.",
      options: [
        { text: "2", correct: true, feedback: "$R_3 = R_1 + R_2$, so the determinant is 0. The minor $\\begin{vmatrix}1&1\\\\1&2\\end{vmatrix} = 1 \\ne 0$, so the rank is 2." },
        { text: "3", feedback: "Check the determinant: $1(8-9) - 1(4-6) + 1(3-4) = 0$. The third row is the sum of the first two." },
        { text: "1", feedback: "Rows 1 and 2 are not parallel: $(1,1,1)$ and $(1,2,3)$ point in different directions." },
      ],
      hint: "Is any row a combination of the other two?",
    },
    {
      type: "quiz",
      id: "mx5-1-q4",
      variant: "practice",
      question: "For which $k$ does $\\begin{pmatrix}1&2\\\\3&k\\end{pmatrix}$ have rank 1?",
      options: [
        { text: "$k = 6$", correct: true, feedback: "Then $(3, 6) = 3(1, 2)$: the rows are parallel and the determinant $k - 6$ is zero." },
        { text: "$k = 0$", feedback: "With $k = 0$ the determinant is $-6 \\ne 0$, so the rank is 2." },
        { text: "$k = 2$", feedback: "The determinant is $2 - 6 = -4 \\ne 0$, so the rank is still 2." },
        { text: "No value of $k$", feedback: "Setting $\\det = k - 6 = 0$ gives a value that works." },
      ],
    },
    {
      type: "quiz",
      id: "mx5-1-q5",
      variant: "practice",
      question: "What is the largest possible rank of a $3 \\times 4$ matrix?",
      options: [
        { text: "3", correct: true, feedback: "Rank is at most $\\min(m, n) = \\min(3, 4) = 3$. There are only three rows." },
        { text: "4", feedback: "Four columns in $\\mathbb{R}^3$ cannot be independent. The row count caps the rank at 3." },
        { text: "12", feedback: "That is the number of entries, not the number of independent directions." },
      ],
    },
    {
      type: "quiz",
      id: "mx5-1-q6",
      variant: "practice",
      question: "Three alloy recipes use (copper, zinc, tin) in kg: $(1, 0, 2)$, $(0, 1, 1)$ and $(2, 3, 7)$. How many of the recipes are genuinely independent?",
      options: [
        { text: "2", correct: true, feedback: "$(2, 3, 7) = 2(1, 0, 2) + 3(0, 1, 1)$, so the third recipe is a mix of the first two. The rank of the $3\\times3$ matrix is 2." },
        { text: "3", feedback: "Reduce: $R_3 - 2R_1 = (0, 3, 3)$, then subtracting $3R_2$ leaves a zero row. One recipe depends on the others." },
        { text: "1", feedback: "$(1, 0, 2)$ and $(0, 1, 1)$ are not parallel, so at least two are independent." },
      ],
      hint: "Try writing the third recipe as $a(1,0,2) + b(0,1,1)$. The first two components give $a$ and $b$ at once.",
    },
    {
      type: "quiz",
      id: "mx5-1-q7",
      variant: "practice",
      question: "What is the rank of $\\begin{pmatrix}1&1&1\\\\1&k&1\\\\1&1&k\\end{pmatrix}$ when $k = 1$?",
      options: [
        { text: "1", correct: true, feedback: "At $k = 1$ every row is $(1, 1, 1)$. After $R_2 - R_1$ and $R_3 - R_1$, only one non-zero row is left." },
        { text: "2", feedback: "The echelon form has $k - 1$ in **both** of the lower pivot positions, so they vanish together. The rank jumps from 3 straight to 1." },
        { text: "3", feedback: "$\\det = (k - 1)^2 = 0$ at $k = 1$, so the rank is below 3." },
      ],
      hint: "Subtract row 1 from rows 2 and 3 and see what $k - 1$ becomes.",
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "rank-and-solutions",
  title: "5.2 · Rank and Solutions",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "Chapter 4 classified systems $AX = B$ with a patchwork of tests: $D \\ne 0$, then $(\\operatorname{adj} A)B$, then a warning that even $D = D_1 = D_2 = D_3 = 0$ does not settle it. Rank replaces the patchwork with one clean rule.",
    },
    {
      type: "text",
      content:
        "Here is the idea. $AX = B$ asks whether $B$ is one of the outputs of $A$. The outputs of $A$ are the combinations of its columns, a space of dimension $\\operatorname{rank} A$. Now add $B$ as an extra column to form the **augmented matrix** $[A \\mid B]$:\n\n- If $B$ is already a combination of the columns, it adds no new direction and the rank stays the same.\n- If $B$ is not a combination of the columns, it sticks out of the output space and the rank goes up by one.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Rouché–Capelli theorem",
      content:
        "For $AX = B$ with $n$ unknowns:\n\n**Consistent** $\\iff \\operatorname{rank} A = \\operatorname{rank}[A \\mid B]$.\n\nIf consistent with common rank $r$: **unique solution** when $r = n$; **infinitely many** when $r < n$, with $n - r$ free parameters.",
    },
    {
      type: "text",
      content:
        "The row-reduction view gives the same rule. Reduce $[A \\mid B]$ to echelon form. If some row reads $[0\\;0\\;0 \\mid c]$ with $c \\ne 0$, that row says $0 = c$: no solution. It is a non-zero row of $[A \\mid B]$ but a zero row of $A$, so $\\operatorname{rank}[A \\mid B] = \\operatorname{rank} A + 1$. Otherwise the ranks match, the pivots fix $r$ of the unknowns, and the other $n - r$ unknowns are free.",
    },
    {
      type: "table",
      headers: ["Rank pattern (n unknowns)", "Echelon form shows", "Solutions", "Geometry (3 unknowns)"],
      rows: [
        ["rank A < rank [A | B]", "a row 0 = c, c ≠ 0", "None", "Planes with no common point"],
        ["rank A = rank [A | B] = n", "a pivot in every column of A", "Exactly one", "Three planes through one point"],
        ["rank A = rank [A | B] = n − 1", "one free variable", "Infinitely many, 1 parameter", "Planes sharing a line"],
        ["rank A = rank [A | B] = n − 2", "two free variables", "Infinitely many, 2 parameters", "All three equations are the same plane"],
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 1: infinitely many.** Solve $x + y + z = 6$, $x + 2y + 3z = 14$, $x + 4y + 7z = 30$.\n\n**Step 1.** $R_2 \\to R_2 - R_1$ and $R_3 \\to R_3 - R_1$:\n$[0\\;1\\;2 \\mid 8]$ and $[0\\;3\\;6 \\mid 24]$.\n\n**Step 2.** $R_3 \\to R_3 - 3R_2$ gives $[0\\;0\\;0 \\mid 0]$.",
    },
    {
      type: "math",
      latex: "\\left[\\begin{array}{ccc|c}1&1&1&6\\\\0&1&2&8\\\\0&0&0&0\\end{array}\\right] \\qquad \\operatorname{rank} A = \\operatorname{rank}[A \\mid B] = 2 < 3",
    },
    {
      type: "text",
      content:
        "**Step 3.** One free parameter ($3 - 2 = 1$). Let $z = t$. Then $y = 8 - 2t$ and $x = 6 - y - z = -2 + t$.\n\n**Check** in the third equation: $(-2 + t) + 4(8 - 2t) + 7t = -2 + 32 + (t - 8t + 7t) = 30$. ✓ The three planes share a whole line.",
    },
    {
      type: "interactive",
      config: {
        component: "matrix-row-reducer",
        mode: "rank",
        matrix: [
          [1, 1, 1],
          [1, 2, 3],
          [1, 4, 7],
        ],
        augmented: [[6], [14], [30]],
        target: "echelon",
        caption:
          "Reduce to echelon form and read off rank A and rank [A | B]. Then undo, imagine the 30 changed to 31, and predict what the last row will say.",
      },
    },
    {
      type: "text",
      content:
        "**Worked example 2: none.** Change only the last right-hand side: $x + 4y + 7z = 31$. The same steps give a last row of $[0\\;0\\;0 \\mid 1]$, which says $0 = 1$. Now $\\operatorname{rank} A = 2$ but $\\operatorname{rank}[A \\mid B] = 3$: inconsistent. The coefficient side is exactly as before, and only $B$ moved off the output plane.",
    },
    {
      type: "text",
      content:
        "### Settling the three-parallel-planes puzzle\n\nIn 4.4 we met $x + y + z = 1$, $x + y + z = 2$, $x + y + z = 3$. Here $D = 0$, and $D_1 = D_2 = D_3 = 0$ as well, because each $D_i$ still has two equal columns. Cramer's test was silent, yet the planes are parallel and never meet. Rank settles it at once:",
    },
    {
      type: "math",
      latex: "\\left[\\begin{array}{ccc|c}1&1&1&1\\\\1&1&1&2\\\\1&1&1&3\\end{array}\\right] \\to \\left[\\begin{array}{ccc|c}1&1&1&1\\\\0&0&0&1\\\\0&0&0&2\\end{array}\\right] \\to \\left[\\begin{array}{ccc|c}1&1&1&1\\\\0&0&0&1\\\\0&0&0&0\\end{array}\\right]",
    },
    {
      type: "text",
      content:
        "$\\operatorname{rank} A = 1$ but $\\operatorname{rank}[A \\mid B] = 2$. Inconsistent, with no guesswork. The determinants only see $A$ being squashed; rank also sees *where $B$ is* relative to the squashed output.",
    },
    {
      type: "text",
      content:
        "**Worked example 3: rank 1, two parameters.** Compare $x + y + z = 2$, $2x + 2y + 2z = 4$, $3x + 3y + 3z = 6$. Every row, right-hand side included, is a multiple of the first, so $\\operatorname{rank} A = \\operatorname{rank}[A \\mid B] = 1$. Consistent, with $3 - 1 = 2$ free parameters: $y = s$, $z = t$, $x = 2 - s - t$. All three equations describe the same plane, which is the last row of the table above.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (JEE pattern).** For which $\\lambda, \\mu$ does the system $x + y + z = 6$, $x + 2y + 3z = 10$, $x + 2y + \\lambda z = \\mu$ have (a) a unique solution, (b) no solution, (c) infinitely many?\n\n**Step 1.** $R_2 - R_1$: $[0\\;1\\;2 \\mid 4]$. $R_3 - R_1$: $[0\\;1\\;\\lambda - 1 \\mid \\mu - 6]$.\n\n**Step 2.** $R_3 - R_2$: $[0\\;0\\;\\lambda - 3 \\mid \\mu - 10]$.\n\n**Step 3: read the last row.**\n(a) $\\lambda \\ne 3$: pivot in every column, rank 3 = 3 unknowns, **unique**, whatever $\\mu$ is.\n(b) $\\lambda = 3$, $\\mu \\ne 10$: the row is $0 = \\mu - 10 \\ne 0$, so $\\operatorname{rank} A = 2 < 3 = \\operatorname{rank}[A \\mid B]$: **none**.\n(c) $\\lambda = 3$, $\\mu = 10$: zero row, both ranks 2 < 3: **infinitely many**, one parameter.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (application: a purse of coins).** A purse holds 10 coins, all ₹1, ₹2 or ₹5, worth ₹26 in total. How many of each could there be?\n\n**Step 1: set up the system.** Let $x, y, z$ be the numbers of ₹1, ₹2 and ₹5 coins. Counting coins gives $x + y + z = 10$; counting rupees gives $x + 2y + 5z = 26$.\n\n**Step 2: reduce the augmented matrix.** $R_2 \\to R_2 - R_1$:",
    },
    {
      type: "math",
      latex: "\\left[\\begin{array}{ccc|c}1&1&1&10\\\\1&2&5&26\\end{array}\\right] \\to \\left[\\begin{array}{ccc|c}1&1&1&10\\\\0&1&4&16\\end{array}\\right] \\qquad \\operatorname{rank} A = \\operatorname{rank}[A \\mid B] = 2 < 3",
    },
    {
      type: "text",
      content:
        "*Why this step:* before hunting for answers, rank tells us what kind of answer to expect. Equal ranks: consistent. Rank 2 with 3 unknowns: exactly $3 - 2 = 1$ free parameter, a whole line of solutions.\n\n**Step 3: solve in terms of the free unknown.** Let $z = t$. Row 2 gives $y = 16 - 4t$, and row 1 gives $x = 10 - y - z = -6 + 3t$.\n\n**Step 4: let the real world cut the line down.** Coin counts must be whole numbers $\\ge 0$. $x \\ge 0$ needs $t \\ge 2$, and $y \\ge 0$ needs $t \\le 4$. So $t = 2, 3, 4$:",
    },
    {
      type: "table",
      headers: ["z = t", "y = 16 − 4t", "x = 3t − 6", "Check: x + 2y + 5z"],
      rows: [
        ["2", "8", "0", "0 + 16 + 10 = 26 ✓"],
        ["3", "4", "3", "3 + 8 + 15 = 26 ✓"],
        ["4", "0", "6", "6 + 0 + 20 = 26 ✓"],
      ],
    },
    {
      type: "text",
      content:
        "**Interpretation.** The algebra gives infinitely many solutions (a line in space), and the physical constraints pick out exactly three points on that line. The rank told you the purse cannot be pinned down from two facts alone: you would need a third, independent piece of information, such as \"there are 4 ₹2 coins\".",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: equal ranks mean a unique solution",
      content:
        "Equal ranks mean the system is **consistent**, and nothing more. Uniqueness needs the common rank to equal the number of unknowns. In worked example 1 the ranks are equal (both 2), and there are infinitely many solutions.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Homogeneous systems AX = O",
      content:
        "Appending a column of zeros never raises the rank, so $\\operatorname{rank}[A \\mid O] = \\operatorname{rank} A$ always. Homogeneous systems are always consistent ($X = O$ works). There are non-trivial solutions exactly when $\\operatorname{rank} A < n$. For square $A$ that means $\\det A = 0$, the same result as 4.4.",
    },
    {
      type: "text",
      content:
        "**Worked example 6 (JEE Main).** The system $x + ky + 3z = 0$, $3x + ky - 2z = 0$, $2x + 4y - 3z = 0$ has a non-zero solution $(x, y, z)$. Find $k$, and then find $\\dfrac{xz}{y^2}$.\n\n**Step 1: non-trivial solutions need rank below 3.** So $\\det A = 0$. Expand along row 1:",
    },
    {
      type: "math",
      latex: "\\begin{vmatrix}1&k&3\\\\3&k&-2\\\\2&4&-3\\end{vmatrix} = 1(-3k + 8) - k(-9 + 4) + 3(12 - 2k) = -4k + 44 = 0 \\;\\Rightarrow\\; k = 11",
    },
    {
      type: "text",
      content:
        "*Why this step:* a homogeneous system is always consistent, so the only question is whether the solution is unique ($X = O$) or a whole line. That is decided by $\\operatorname{rank} A < 3$, i.e. $\\det A = 0$.\n\n**Step 2: find the line of solutions.** With $k = 11$, subtract equation 1 from equation 2: $2x - 5z = 0$, so $x = \\frac{5}{2}z$. Put this into equation 3: $5z + 4y - 3z = 0$, so $y = -\\frac{1}{2}z$.\n\n*Why this step:* subtracting the first two equations kills $y$ in one move, because both have $11y$.\n\n**Step 3: check in equation 1.** $\\frac{5}{2}z - \\frac{11}{2}z + 3z = -3z + 3z = 0$. ✓ The rank is exactly 2, and the solutions form the line through $(5, -1, 2)$.\n\n**Step 4: the ratio.** $\\dfrac{xz}{y^2} = \\dfrac{\\frac{5}{2}z \\cdot z}{\\frac{1}{4}z^2} = 10$. The free parameter $z$ cancels, which is why the question can ask for a single number even though there are infinitely many solutions.",
    },
    {
      type: "quiz",
      id: "mx5-2-q1",
      variant: "concept",
      question: "A system in 3 unknowns has $\\operatorname{rank} A = \\operatorname{rank}[A \\mid B] = 2$. What can you conclude?",
      options: [
        { text: "Infinitely many solutions, with one free parameter", correct: true, feedback: "The ranks agree, so it is consistent. $n - r = 3 - 2 = 1$ unknown is free." },
        { text: "Exactly one solution, because the ranks are equal", feedback: "Equal ranks only guarantee consistency. Uniqueness needs rank = number of unknowns = 3." },
        { text: "No solution, because the rank is less than 3", feedback: "A rank below 3 does not make it inconsistent. Inconsistency needs rank $A$ < rank $[A \\mid B]$." },
      ],
    },
    {
      type: "quiz",
      id: "mx5-2-q2",
      variant: "practice",
      question: "A $3 \\times 3$ system has $\\operatorname{rank} A = 2$ and $\\operatorname{rank}[A \\mid B] = 3$. How many solutions does it have?",
      options: [
        { text: "None", correct: true, feedback: "$B$ points outside the output plane of $A$. Row reduction would show a row $0 = c$ with $c \\ne 0$." },
        { text: "Exactly one", feedback: "A unique solution needs both ranks to be 3." },
        { text: "Infinitely many", feedback: "That needs equal ranks. Here they differ, so the system is inconsistent." },
      ],
    },
    {
      type: "quiz",
      id: "mx5-2-q3",
      variant: "practice",
      question: "A consistent system has 4 unknowns and $\\operatorname{rank} A = 2$. How many free parameters does its solution have?",
      options: [
        { text: "2", correct: true, feedback: "Free parameters $= n - r = 4 - 2 = 2$." },
        { text: "4", feedback: "Only unknowns without a pivot are free. Two of the four have pivots." },
        { text: "0", feedback: "Zero free parameters would need rank 4." },
      ],
    },
    {
      type: "quiz",
      id: "mx5-2-q4",
      variant: "practice",
      question: "For $x + y + z = 6$, $x + 2y + 3z = 10$, $x + 2y + \\lambda z = \\mu$, when is there **no** solution?",
      options: [
        { text: "$\\lambda = 3$ and $\\mu \\ne 10$", correct: true, feedback: "The last echelon row is $[0\\;0\\;\\lambda - 3 \\mid \\mu - 10]$, which reads $0 = $ non-zero exactly here." },
        { text: "$\\lambda = 3$ and $\\mu = 10$", feedback: "Then the last row is all zeros: infinitely many solutions." },
        { text: "$\\lambda \\ne 3$", feedback: "Then there is a pivot in every column: a unique solution." },
        { text: "$\\mu \\ne 10$, for any $\\lambda$", feedback: "If $\\lambda \\ne 3$ the system has a unique solution whatever $\\mu$ is." },
      ],
      hint: "Reduce to echelon form and look at the last row.",
    },
    {
      type: "quiz",
      id: "mx5-2-q5",
      variant: "concept",
      question: "$AX = O$ with $A$ a $3 \\times 3$ matrix of rank 2. Which is true?",
      options: [
        { text: "It has infinitely many solutions, including non-trivial ones", correct: true, feedback: "It is homogeneous, so it is consistent, and $3 - 2 = 1$ free parameter gives a whole line of solutions." },
        { text: "It has only the trivial solution", feedback: "That happens only when the rank is 3 ($\\det A \\ne 0$)." },
        { text: "It has no solution", feedback: "A homogeneous system always has $X = O$, so it is always consistent." },
      ],
    },
    {
      type: "quiz",
      id: "mx5-2-q7",
      variant: "practice",
      question: "For which $k$ does $x + y + z = 0$, $2x + 3y + kz = 0$, $x + 2y + 3z = 0$ have non-trivial solutions?",
      options: [
        { text: "$k = 4$", correct: true, feedback: "$\\det A = 1(9 - 2k) - 1(6 - k) + 1(4 - 3) = 4 - k$. Non-trivial solutions need $\\operatorname{rank} A < 3$, i.e. $\\det A = 0$, so $k = 4$." },
        { text: "$k = 3$", feedback: "At $k = 3$, $\\det A = 4 - 3 = 1 \\ne 0$. The rank is 3 and only $X = O$ works." },
        { text: "No value: homogeneous systems only have $X = O$", feedback: "They always have $X = O$, but they also have non-trivial solutions whenever $\\operatorname{rank} A < 3$." },
      ],
      hint: "Non-trivial solutions exist exactly when $\\det A = 0$. Expand along row 1.",
    },
    {
      type: "quiz",
      id: "mx5-2-q6",
      variant: "concept",
      question: "Can $\\operatorname{rank}[A \\mid B]$ ever be **less** than $\\operatorname{rank} A$?",
      options: [
        { text: "No. Adding a column can keep the rank or raise it by 1, never lower it", correct: true, feedback: "The columns of $A$ are still there, so their independent directions survive. $B$ can only add at most one new one." },
        { text: "Yes, when $B$ is the zero column", feedback: "A zero column adds nothing, so the rank stays equal." },
        { text: "Yes, when the system has no solution", feedback: "In that case the augmented rank is *larger*, by exactly one." },
      ],
    },
    {
      type: "quiz",
      id: "mx5-2-q8",
      variant: "practice",
      question: "A purse holds 12 coins, all ₹1, ₹2 or ₹5, worth ₹30 in total. How many different combinations of coins are possible?",
      options: [
        { text: "3", correct: true, feedback: "Reduction gives $y + 4z = 18$, so $y = 18 - 4z$ and $x = 3z - 6$. Whole numbers $\\ge 0$ need $2 \\le z \\le 4$: $(0, 10, 2)$, $(3, 6, 3)$, $(6, 2, 4)$." },
        { text: "Infinitely many", feedback: "The *real* solutions form a line, since rank 2 < 3 unknowns. But coin counts must be whole numbers $\\ge 0$, which leaves only a few points on it." },
        { text: "Exactly 1", feedback: "Two equations in three unknowns cannot pin down one answer: there is a free parameter. Check $z = 2, 3, 4$." },
        { text: "None", feedback: "The ranks are equal, so the system is consistent. Try $z = 3$: $x = 3$, $y = 6$, and $3 + 12 + 15 = 30$." },
      ],
      hint: "Subtract the coin equation from the value equation to get $y + 4z = 18$, then express $x$ and $y$ in terms of $z$.",
    },
    {
      type: "quiz",
      id: "mx5-2-q9",
      variant: "practice",
      question: "For which $k$ does $x + ky + 3z = 0$, $3x + ky - 2z = 0$, $2x + 4y - 3z = 0$ have a non-zero solution?",
      options: [
        { text: "$k = 11$", correct: true, feedback: "$\\det A = -4k + 44$, which is zero at $k = 11$. Then $\\operatorname{rank} A = 2$ and there is a whole line of solutions." },
        { text: "$k = -11$", feedback: "Sign slip. $\\det A = -4k + 44$ vanishes at $k = +11$." },
        { text: "Every $k$, because homogeneous systems are always consistent", feedback: "Consistent, yes, but for $k \\ne 11$ the only solution is $X = O$. Non-zero solutions need $\\operatorname{rank} A < 3$." },
      ],
      hint: "Non-zero solutions exist exactly when $\\det A = 0$.",
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "directions-that-dont-turn",
  title: "5.3 · Directions That Don't Turn",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "Apply a matrix to the plane and almost every arrow gets knocked off its line: it is turned as well as stretched. But look closely and some transformations have special directions where arrows only stretch, shrink or flip, and never turn. Those directions are the skeleton of the transformation.",
    },
    {
      type: "text",
      content:
        "Below, $A = \\begin{pmatrix}2&1\\\\1&2\\end{pmatrix}$. The dashed probe is $\\mathbf{v}$ and the solid arrow is its image $A\\mathbf{v}$. Drag the tip of the probe to different directions and watch the angle between them. Almost everywhere $A\\mathbf{v}$ points somewhere new. Find the two directions where $\\mathbf{v}$ and $A\\mathbf{v}$ line up.",
    },
    {
      type: "interactive",
      config: {
        component: "matrix-transform-grid",
        matrix: [
          [2, 1],
          [1, 2],
        ],
        showProbe: true,
        probe: [1, 0],
        showEigenLines: false,
        caption:
          "The thin dashed arrow is v and the solid arrow is Av. Move v until the two lie on one line. The readout below the grid tells you when you have landed on one.",
      },
    },
    {
      type: "text",
      content:
        "For $\\begin{pmatrix}2&1\\\\1&2\\end{pmatrix}$ the lines are $y = x$ and $y = -x$. Check by hand: $A(1,1) = (3, 3) = 3\\,(1,1)$, stretched by 3. $A(1,-1) = (1, -1) = 1\\,(1,-1)$, not moved at all. Every other direction gets turned. Below, the same grid now draws these lines for you.",
    },
    {
      type: "interactive",
      config: {
        component: "matrix-transform-grid",
        matrix: [
          [2, 1],
          [1, 2],
        ],
        showProbe: true,
        probe: [1, 1],
        showEigenLines: true,
        presets: [
          { label: "Symmetric [2 1; 1 2]", matrix: [[2, 1], [1, 2]] },
          { label: "Stretch x2, y3", matrix: [[2, 0], [0, 3]] },
          { label: "Shear", matrix: [[1, 1], [0, 1]] },
          { label: "Rotate 90°", matrix: [[0, -1], [1, 0]] },
          { label: "Reflect in y = x", matrix: [[0, 1], [1, 0]] },
          { label: "Project onto x-axis", matrix: [[1, 0], [0, 0]] },
          { label: "Scale by 2", matrix: [[2, 0], [0, 2]] },
        ],
        caption:
          "The thin dashed arrow is v; the coloured dashed lines are the eigen-lines, each labelled with its stretch factor λ. Try each preset and predict its eigen-lines before you click.",
      },
    },
    {
      type: "callout",
      variant: "definition",
      title: "Eigenvector and eigenvalue",
      content:
        "A **non-zero** vector $\\mathbf{v}$ is an **eigenvector** of a square matrix $A$ if $A\\mathbf{v} = \\lambda\\mathbf{v}$ for some scalar $\\lambda$. The number $\\lambda$ is the corresponding **eigenvalue**: the factor by which that direction is stretched. $\\lambda > 1$ stretches, $0 < \\lambda < 1$ shrinks, $\\lambda < 0$ flips the arrow to point the opposite way along the same line, and $\\lambda = 0$ crushes the direction to the origin.",
    },
    {
      type: "math",
      latex: "A\\mathbf{v} = \\lambda\\mathbf{v}, \\qquad \\mathbf{v} \\ne \\mathbf{0}",
    },
    {
      type: "text",
      content:
        "Two consequences follow straight from linearity.\n\n**Eigenvectors come in whole lines.** If $A\\mathbf{v} = \\lambda\\mathbf{v}$ then $A(k\\mathbf{v}) = kA\\mathbf{v} = \\lambda(k\\mathbf{v})$. Any non-zero multiple works too, which is why the picture shows eigen-*lines*, not single arrows.\n\n**The zero vector is excluded on purpose.** $A\\mathbf{0} = \\lambda\\mathbf{0}$ holds for *every* $\\lambda$ and every $A$. If $\\mathbf{0}$ counted, every number would be an eigenvalue of every matrix, and the idea would say nothing.",
    },
    {
      type: "text",
      content:
        "Use the presets on the grid above to go through the gallery from Chapter 0. Predict each row of the table before you click.",
    },
    {
      type: "table",
      headers: ["Transformation", "Matrix", "Eigen-directions", "Eigenvalues"],
      rows: [
        ["Stretch x by 2, y by 3", "$\\begin{pmatrix}2&0\\\\0&3\\end{pmatrix}$", "the x-axis and the y-axis", "2 and 3"],
        ["Shear", "$\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$", "only the x-axis", "1 (repeated)"],
        ["Rotation by 90°", "$\\begin{pmatrix}0&-1\\\\1&0\\end{pmatrix}$", "none (every arrow turns)", "no real ones"],
        ["Reflection in y = x", "$\\begin{pmatrix}0&1\\\\1&0\\end{pmatrix}$", "y = x and y = −x", "1 and −1"],
        ["Projection onto x-axis", "$\\begin{pmatrix}1&0\\\\0&0\\end{pmatrix}$", "the x-axis and the y-axis", "1 and 0"],
        ["Scaling by 2", "$\\begin{pmatrix}2&0\\\\0&2\\end{pmatrix}$", "every direction", "2"],
        ["Rotation by 180°", "$\\begin{pmatrix}-1&0\\\\0&-1\\end{pmatrix}$", "every direction", "−1"],
      ],
    },
    {
      type: "text",
      content:
        "Each row can be read from the picture.\n\n- **Shear:** it slides every horizontal line sideways. Arrows on the x-axis slide along themselves; every other arrow tilts.\n- **Reflection:** the mirror line stays fixed ($\\lambda = 1$), and the perpendicular line is flipped onto itself ($\\lambda = -1$).\n- **Projection:** the x-axis is kept ($\\lambda = 1$) and the y-axis is flattened to the origin ($\\lambda = 0$).\n- **Rotation** by $90^\\circ$ turns *everything*, so there is no real direction left alone. Rotation by $0$ or $\\pi$ is the exception: $I$ and $-I$ keep every line.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: every matrix has real eigenvectors",
      content:
        "A rotation by any angle other than $0$ or $\\pi$ turns every non-zero vector, so no real $\\mathbf{v}$ satisfies $A\\mathbf{v} = \\lambda\\mathbf{v}$. Its eigenvalues exist only as complex numbers. (Every $3\\times3$ real matrix does have at least one real eigenvalue, because a cubic always has a real root. A rotation of space has its axis.)",
    },
    {
      type: "callout",
      variant: "info",
      title: "λ = 0 means a collapse",
      content:
        "$\\lambda = 0$ is an eigenvalue $\\iff$ some non-zero $\\mathbf{v}$ has $A\\mathbf{v} = \\mathbf{0}$ $\\iff$ $A$ squashes a direction $\\iff$ $\\det A = 0$ $\\iff$ rank $< n$. The projection is the example: its y-axis is the crushed direction.",
    },
    {
      type: "text",
      content:
        "**Worked example 1.** Check that $(1,1)$ and $(1,-2)$ are eigenvectors of $A = \\begin{pmatrix}4&1\\\\2&3\\end{pmatrix}$, and find their eigenvalues.\n\n**Step 1.** $A\\begin{pmatrix}1\\\\1\\end{pmatrix} = \\begin{pmatrix}4 + 1\\\\2 + 3\\end{pmatrix} = \\begin{pmatrix}5\\\\5\\end{pmatrix} = 5\\begin{pmatrix}1\\\\1\\end{pmatrix}$, so $\\lambda = 5$.\n\n**Step 2.** $A\\begin{pmatrix}1\\\\-2\\end{pmatrix} = \\begin{pmatrix}4 - 2\\\\2 - 6\\end{pmatrix} = \\begin{pmatrix}2\\\\-4\\end{pmatrix} = 2\\begin{pmatrix}1\\\\-2\\end{pmatrix}$, so $\\lambda = 2$.",
    },
    {
      type: "text",
      content:
        "**Worked example 2.** Which of $(1, 2)$, $(1, -2)$, $(1, 0)$ are eigenvectors of $B = \\begin{pmatrix}1&1\\\\4&1\\end{pmatrix}$?\n\n**$(1,2)$:** $B\\mathbf{v} = (1 + 2,\\; 4 + 2) = (3, 6) = 3(1,2)$. Eigenvector, $\\lambda = 3$.\n\n**$(1,-2)$:** $B\\mathbf{v} = (1 - 2,\\; 4 - 2) = (-1, 2) = -1\\,(1,-2)$. Eigenvector, $\\lambda = -1$: flipped along its own line.\n\n**$(1,0)$:** $B\\mathbf{v} = (1, 4)$, which is not a multiple of $(1, 0)$. Not an eigenvector.",
    },
    {
      type: "text",
      content:
        "The test is always the same: compute $A\\mathbf{v}$ and ask whether it is a multiple of $\\mathbf{v}$. For 2D vectors, $(p, q)$ is a multiple of $(r, s)$ exactly when $ps - qr = 0$.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (application: city and suburbs).** Each year 10% of a city's residents move to the suburbs and 20% of suburban residents move to the city; everyone else stays. If $(c, s)$ are this year's populations (in lakhs), next year's are $M\\begin{pmatrix}c\\\\s\\end{pmatrix}$ with",
    },
    {
      type: "math",
      latex: "M = \\begin{pmatrix}0.9 & 0.2\\\\ 0.1 & 0.8\\end{pmatrix} \\qquad \\begin{aligned} c_{\\text{new}} &= 0.9c + 0.2s \\\\ s_{\\text{new}} &= 0.1c + 0.8s \\end{aligned}",
    },
    {
      type: "text",
      content:
        "Show that $(2, 1)$ and $(1, -1)$ are eigenvectors, and explain what they mean for the long run.\n\n**Step 1: test $(2, 1)$.** $M(2, 1) = (1.8 + 0.2,\\; 0.2 + 0.8) = (2, 1)$. Eigenvector with $\\lambda = 1$.\n\n*Why it matters:* a population split $2 : 1$ between city and suburbs is **unchanged** by a year of moving. The 0.2 lakh leaving the city is exactly replaced by the 0.2 lakh arriving. It is a steady state.\n\n**Step 2: test $(1, -1)$.** $M(1, -1) = (0.9 - 0.2,\\; 0.1 - 0.8) = (0.7, -0.7) = 0.7\\,(1, -1)$. Eigenvector with $\\lambda = 0.7$.\n\n*Why it matters:* $(1, -1)$ is not a population (it has a negative entry), but it is a *correction*: moving people from one region to the other without changing the total. Each year that correction shrinks to 70% of its size.\n\n**Step 3: the long run.** Suppose the region starts with 3 lakh people, all in the city: $(3, 0) = 1\\cdot(2, 1) + 1\\cdot(1, -1)$. After $n$ years this becomes $(2, 1) + 0.7^n(1, -1)$. As $0.7^n \\to 0$, the populations settle to 2 lakh in the city and 1 lakh in the suburbs, whatever the starting split. The eigenvector with $\\lambda = 1$ is the future; the one with $\\lambda < 1$ fades away.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (JEE/CBSE pattern).** Let $A = \\begin{pmatrix}3&1&1\\\\0&4&1\\\\2&1&2\\end{pmatrix}$. (a) Show $(1, 1, 1)$ is an eigenvector. (b) Find $A^3\\begin{pmatrix}1\\\\1\\\\1\\end{pmatrix}$. (c) Given $\\det A = 15$, find the sum of all nine entries of $A^{-1}$.\n\n**(a)** $A(1, 1, 1)$ adds up each row: $(3 + 1 + 1,\\; 0 + 4 + 1,\\; 2 + 1 + 2) = (5, 5, 5) = 5(1, 1, 1)$. So $\\lambda = 5$.\n\n*Why this works:* multiplying by $(1, 1, 1)$ always gives the row sums. If every row sums to the same number $s$, then $(1, 1, 1)$ is an eigenvector with eigenvalue $s$. Spot equal row sums and you get an eigenvalue for free.\n\n**(b)** Apply $A$ three times; each time the vector is multiplied by 5: $A^3(1, 1, 1) = 5^3(1, 1, 1) = (125, 125, 125)$. No matrix cubing needed.\n\n**(c)** $\\det A = 15 \\ne 0$, so $A^{-1}$ exists. Apply $A^{-1}$ to $A(1,1,1) = 5(1,1,1)$ and divide by 5: $A^{-1}(1, 1, 1) = \\frac{1}{5}(1, 1, 1)$. So every row of $A^{-1}$ sums to $\\frac{1}{5}$, and the three rows together sum to $\\frac{3}{5}$.\n\n*Why this step:* \"sum of all entries\" is the sum of the row sums, and the row sums are exactly what $A^{-1}(1,1,1)$ computes.\n\n**Check** with cofactors: the nine cofactors of $A$ add up to $7 + 2 - 8 - 1 + 4 - 1 - 3 - 3 + 12 = 9$, and $\\frac{9}{15} = \\frac{3}{5}$. ✓",
    },
    {
      type: "quiz",
      id: "mx5-3-q1",
      variant: "concept",
      question: "Why is the zero vector never counted as an eigenvector?",
      options: [
        { text: "Because $A\\mathbf{0} = \\lambda\\mathbf{0}$ for every $\\lambda$, so it would make every number an eigenvalue", correct: true, feedback: "The definition is meant to pick out special directions and stretch factors. $\\mathbf{0}$ has no direction and would fit every $\\lambda$." },
        { text: "Because $A\\mathbf{0}$ is undefined", feedback: "$A\\mathbf{0} = \\mathbf{0}$ is perfectly well defined. The problem is that it fits too many $\\lambda$." },
        { text: "It is an eigenvector, with eigenvalue 0", feedback: "Eigenvalue 0 comes from a *non-zero* vector sent to $\\mathbf{0}$. The zero vector itself is excluded by definition." },
      ],
    },
    {
      type: "quiz",
      id: "mx5-3-q2",
      variant: "concept",
      question: "How many real eigen-directions does the rotation $\\begin{pmatrix}0&-1\\\\1&0\\end{pmatrix}$ have?",
      options: [
        { text: "None", correct: true, feedback: "A $90^\\circ$ turn moves every non-zero arrow off its line. Its eigenvalues are $\\pm i$, which are not real." },
        { text: "Two, the x-axis and the y-axis", feedback: "The x-axis is sent to the y-axis, which is a different line. That is a turn, not a stretch." },
        { text: "Every direction, because length is preserved", feedback: "Keeping length is not the same as keeping direction. Eigenvectors must stay on their own line." },
      ],
    },
    {
      type: "quiz",
      id: "mx5-3-q3",
      variant: "practice",
      question: "Which vector is an eigenvector of $\\begin{pmatrix}2&1\\\\1&2\\end{pmatrix}$?",
      options: [
        { text: "$(1, -1)$", correct: true, feedback: "$A(1,-1) = (2 - 1, 1 - 2) = (1, -1)$, so it is an eigenvector with $\\lambda = 1$." },
        { text: "$(1, 2)$", feedback: "$A(1, 2) = (4, 5)$, which is not a multiple of $(1, 2)$." },
        { text: "$(2, 1)$", feedback: "$A(2, 1) = (5, 4)$, which is not a multiple of $(2, 1)$." },
        { text: "$(0, 0)$", feedback: "The zero vector is excluded by definition." },
      ],
      hint: "Multiply and check whether the result is a multiple of the input.",
    },
    {
      type: "quiz",
      id: "mx5-3-q4",
      variant: "practice",
      question: "What are the eigenvalues of the reflection in the x-axis, $\\begin{pmatrix}1&0\\\\0&-1\\end{pmatrix}$?",
      options: [
        { text: "$1$ and $-1$", correct: true, feedback: "The mirror line (the x-axis) is fixed, $\\lambda = 1$. The y-axis is flipped onto itself, $\\lambda = -1$." },
        { text: "$1$ only", feedback: "The x-axis gives 1, but the y-axis is also an eigen-direction. It is flipped, so $\\lambda = -1$." },
        { text: "$0$ and $1$", feedback: "$\\lambda = 0$ would mean some direction is crushed. A reflection loses nothing, since $\\det = -1 \\ne 0$." },
      ],
    },
    {
      type: "quiz",
      id: "mx5-3-q5",
      variant: "concept",
      question: "A $2\\times2$ matrix $A$ has $0$ as an eigenvalue. What must be true?",
      options: [
        { text: "$\\det A = 0$: some non-zero direction is crushed to the origin", correct: true, feedback: "$A\\mathbf{v} = 0\\cdot\\mathbf{v} = \\mathbf{0}$ with $\\mathbf{v} \\ne \\mathbf{0}$ means $A$ collapses, so $A$ is singular." },
        { text: "$A$ is the zero matrix", feedback: "The projection $\\begin{pmatrix}1&0\\\\0&0\\end{pmatrix}$ has eigenvalue 0 and is not zero. Only one direction needs to be crushed." },
        { text: "The eigenvector is $\\mathbf{0}$", feedback: "Eigenvectors are non-zero by definition. It is the *output* that is zero." },
      ],
    },
    {
      type: "quiz",
      id: "mx5-3-q6",
      variant: "practice",
      question: "Each year 20% of a town's residents move to the villages around it and 30% of village residents move to the town. With $M = \\begin{pmatrix}0.8&0.3\\\\0.2&0.7\\end{pmatrix}$ acting on (town, villages), which split is a steady state?",
      options: [
        { text: "Town : villages $= 3 : 2$", correct: true, feedback: "$M(3, 2) = (2.4 + 0.6,\\; 0.6 + 1.4) = (3, 2)$: an eigenvector with $\\lambda = 1$. The 0.6 leaving the town is replaced by the 0.6 arriving." },
        { text: "Town : villages $= 2 : 3$", feedback: "$M(2, 3) = (2.5, 2.5)$, which is not a multiple of $(2, 3)$. The flows do not balance." },
        { text: "Town : villages $= 1 : 1$", feedback: "$M(1, 1) = (1.1, 0.9)$. People keep drifting towards the town." },
      ],
      hint: "Solve $(M - I)\\mathbf{v} = \\mathbf{0}$: the first row reads $-0.2x + 0.3y = 0$.",
    },
    {
      type: "quiz",
      id: "mx5-3-q7",
      variant: "practice",
      question: "$A = \\begin{pmatrix}1&4&2\\\\3&0&4\\\\2&2&3\\end{pmatrix}$. Which eigenvalue goes with the eigenvector $(1, 1, 1)$?",
      options: [
        { text: "$7$", correct: true, feedback: "Every row sums to 7, so $A(1,1,1) = (7, 7, 7) = 7(1, 1, 1)$." },
        { text: "$4$", feedback: "That is the trace, $1 + 0 + 3$. Multiplying by $(1,1,1)$ adds up the *rows*, not the diagonal." },
        { text: "$21$", feedback: "That is the sum of all nine entries. $A(1,1,1)$ is $(7, 7, 7)$, which is 7 times $(1,1,1)$." },
      ],
      hint: "What does multiplying by $(1, 1, 1)$ do to each row?",
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "finding-eigenvalues",
  title: "5.4 · Finding Eigenvalues",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "Sweeping a probe works in 2D, but you cannot sweep your way through a $3\\times3$ matrix. We need an equation. Luckily, every piece of it has already been built in earlier chapters.",
    },
    {
      type: "text",
      content:
        "**Step 1: move everything to one side.** $A\\mathbf{v} = \\lambda\\mathbf{v}$ is the same as $A\\mathbf{v} - \\lambda I\\mathbf{v} = \\mathbf{0}$. The $I$ is needed because you cannot subtract a number from a matrix:",
    },
    { type: "math", latex: "(A - \\lambda I)\\,\\mathbf{v} = \\mathbf{0}" },
    {
      type: "text",
      content:
        "**Step 2: this is a homogeneous system.** For a fixed $\\lambda$, it is $M\\mathbf{v} = \\mathbf{0}$ with $M = A - \\lambda I$. We want a **non-trivial** solution, $\\mathbf{v} \\ne \\mathbf{0}$.\n\n**Step 3: use 4.4 and 2.2.** A homogeneous square system has a non-trivial solution exactly when $M$ squashes a direction, i.e. when $\\det M = 0$. If $\\det M \\ne 0$, then $M^{-1}$ exists and $\\mathbf{v} = M^{-1}\\mathbf{0} = \\mathbf{0}$, which is useless.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The characteristic equation",
      content:
        "$\\lambda$ is an eigenvalue of $A$ $\\iff$ $\\det(A - \\lambda I) = 0$. The left side is a polynomial in $\\lambda$, the **characteristic polynomial**, of degree $n$ for an $n\\times n$ matrix. Its roots are the eigenvalues. For each root, the eigenvectors are the non-zero solutions of $(A - \\lambda I)\\mathbf{v} = \\mathbf{0}$.",
    },
    {
      type: "text",
      content:
        "In picture terms: subtracting $\\lambda I$ is a family of transformations, one for each $\\lambda$. Most members of the family are invertible. The eigenvalues are the special values of $\\lambda$ where $A - \\lambda I$ collapses the plane.",
    },
    {
      type: "text",
      content:
        "### The 2×2 formula\n\nFor $A = \\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}$, expand the determinant:",
    },
    {
      type: "math",
      latex: "\\det(A - \\lambda I) = \\begin{vmatrix}a - \\lambda & b\\\\ c & d - \\lambda\\end{vmatrix} = (a - \\lambda)(d - \\lambda) - bc = \\lambda^2 - (a + d)\\lambda + (ad - bc)",
    },
    {
      type: "math",
      latex: "\\lambda^2 - (\\operatorname{tr}A)\\,\\lambda + \\det A = 0",
    },
    {
      type: "text",
      content:
        "Here $\\operatorname{tr}A = a + d$ is the **trace**, the sum of the diagonal. So a $2\\times2$ characteristic equation can be written straight from two numbers.",
    },
    {
      type: "text",
      content:
        "**Worked example 1.** Find the eigenvalues and eigenvectors of $A = \\begin{pmatrix}4&1\\\\2&3\\end{pmatrix}$.\n\n**Step 1: the characteristic equation.** $\\operatorname{tr}A = 7$ and $\\det A = 12 - 2 = 10$, so $\\lambda^2 - 7\\lambda + 10 = 0$, i.e. $(\\lambda - 5)(\\lambda - 2) = 0$. The eigenvalues are $\\lambda = 5, 2$.\n\n**Step 2: $\\lambda = 5$.** $A - 5I = \\begin{pmatrix}-1&1\\\\2&-2\\end{pmatrix}$. Both rows say $-x + y = 0$, so $y = x$ and $\\mathbf{v} = (1, 1)$.\n\n**Step 3: $\\lambda = 2$.** $A - 2I = \\begin{pmatrix}2&1\\\\2&1\\end{pmatrix}$. Both rows say $2x + y = 0$, so $\\mathbf{v} = (1, -2)$.\n\nThese are the vectors checked in 5.3. The rows of $A - \\lambda I$ always come out parallel at an eigenvalue. That is the collapse, and it is a built-in arithmetic check: if the rows are not parallel, you have made an error.",
    },
    {
      type: "text",
      content:
        "The characteristic polynomial is an ordinary function of $\\lambda$, so we can graph it. The horizontal axis below plays the role of $\\lambda$. Drag the point and watch $p(\\lambda)$ reach zero exactly at 2 and 5.",
    },
    {
      type: "interactive",
      config: {
        component: "graph-explorer",
        expr: "x^2 - 7*x + 10",
        exprLatex: "p(\\lambda) = \\lambda^2 - 7\\lambda + 10",
        window: CHAR_WINDOW,
        initial: 2,
      },
    },
    {
      type: "interactive",
      config: {
        component: "equation-solution-viewer",
        expr: "x^2 - 7*x + 10",
        exprLatex: "\\lambda^2 - 7\\lambda + 10",
        initialLevel: 0,
        minLevel: -3,
        maxLevel: 6,
        levelStep: 0.25,
        window: CHAR_WINDOW,
        caption:
          "Solving p(λ) = c is the same as finding the eigenvalues of a matrix with the same trace 7 but determinant 10 − c. At c = 0 the crossings are 2 and 5. At c = −2.25 (det 12.25) the roots merge into a repeated eigenvalue. Below that the discriminant is negative, there are no real eigenvalues, and no direction survives unturned, like a rotation.",
      },
    },
    {
      type: "text",
      content:
        "The level slider shows the three possible cases for a $2\\times 2$ matrix, sorted by the discriminant $(\\operatorname{tr}A)^2 - 4\\det A$:\n\n- **Positive:** two distinct real eigenvalues and two eigen-lines.\n- **Zero:** one repeated eigenvalue. This happens with the shear, $(1 - \\lambda)^2 = 0$.\n- **Negative:** no real eigenvalues. For the $90^\\circ$ rotation, $\\lambda^2 + 1 = 0$.",
    },
    {
      type: "text",
      content:
        "**Worked example 2: the shear.** $A = \\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$ has $\\operatorname{tr} = 2$, $\\det = 1$, so $\\lambda^2 - 2\\lambda + 1 = (\\lambda - 1)^2 = 0$. The only eigenvalue is $\\lambda = 1$. Then $A - I = \\begin{pmatrix}0&1\\\\0&0\\end{pmatrix}$ forces $y = 0$, so the eigenvectors are $(1, 0)$ and its multiples. That is only **one** eigen-line, even though the root is repeated, which matches the picture.",
    },
    {
      type: "text",
      content:
        "### Triangular matrices and a 3×3 example\n\nIf $A$ is triangular, so is $A - \\lambda I$, and the determinant of a triangular matrix is the product of its diagonal. So $\\det(A - \\lambda I) = (a_{11} - \\lambda)(a_{22} - \\lambda)\\cdots$, and **the eigenvalues are the diagonal entries.**",
    },
    {
      type: "text",
      content:
        "**Worked example 3.** Find the eigenvalues and eigenvectors of $A = \\begin{pmatrix}2&1&0\\\\0&3&1\\\\0&0&5\\end{pmatrix}$.\n\n**Eigenvalues:** the matrix is upper triangular, so $\\lambda = 2, 3, 5$.\n\n**$\\lambda = 2$:** $A - 2I = \\begin{pmatrix}0&1&0\\\\0&1&1\\\\0&0&3\\end{pmatrix}$. Row 3 gives $z = 0$, then row 2 gives $y = 0$, and $x$ is free. $\\mathbf{v} = (1, 0, 0)$.\n\n**$\\lambda = 3$:** $A - 3I = \\begin{pmatrix}-1&1&0\\\\0&0&1\\\\0&0&2\\end{pmatrix}$. Then $z = 0$ and $-x + y = 0$, so $\\mathbf{v} = (1, 1, 0)$.\n\n**$\\lambda = 5$:** $A - 5I = \\begin{pmatrix}-3&1&0\\\\0&-2&1\\\\0&0&0\\end{pmatrix}$. Then $z = 2y$ and $y = 3x$, so $\\mathbf{v} = (1, 3, 6)$.\n\n**Check:** $A(1,3,6) = (2 + 3,\\; 9 + 6,\\; 30) = (5, 15, 30) = 5(1, 3, 6)$. ✓",
    },
    {
      type: "callout",
      variant: "info",
      title: "The general 3×3 characteristic equation",
      content:
        "$\\lambda^3 - (\\operatorname{tr}A)\\lambda^2 + S_2\\,\\lambda - \\det A = 0$, where $S_2$ is the sum of the three principal $2\\times2$ minors (the ones centred on the diagonal: delete row $i$ and column $i$). For the example above: $\\operatorname{tr} = 10$, $S_2 = 15 + 10 + 6 = 31$, $\\det = 30$, giving $\\lambda^3 - 10\\lambda^2 + 31\\lambda - 30 = (\\lambda - 2)(\\lambda - 3)(\\lambda - 5)$.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (not triangular).** Find the eigenvalues and eigenvectors of $A = \\begin{pmatrix}2&1&1\\\\1&2&1\\\\1&1&2\\end{pmatrix}$.\n\n**Step 1: the three coefficients.** $\\operatorname{tr}A = 6$. Each principal $2\\times2$ minor is $\\begin{vmatrix}2&1\\\\1&2\\end{vmatrix} = 3$, so $S_2 = 3 + 3 + 3 = 9$. And $\\det A = 2(4 - 1) - 1(2 - 1) + 1(1 - 2) = 4$.\n\n**Step 2: the cubic.** $\\lambda^3 - 6\\lambda^2 + 9\\lambda - 4 = 0$. Try $\\lambda = 1$: $1 - 6 + 9 - 4 = 0$ ✓. Dividing out $(\\lambda - 1)$ leaves $\\lambda^2 - 5\\lambda + 4 = (\\lambda - 1)(\\lambda - 4)$, so the polynomial is $(\\lambda - 1)^2(\\lambda - 4)$. The eigenvalues are $1, 1, 4$.\n\n**Step 3: $\\lambda = 4$.** $A - 4I = \\begin{pmatrix}-2&1&1\\\\1&-2&1\\\\1&1&-2\\end{pmatrix}$. Row 1 minus row 2 gives $-3x + 3y = 0$, so $x = y$; similarly $y = z$. So $\\mathbf{v} = (1, 1, 1)$.\n\n**Step 4: $\\lambda = 1$.** $A - I = \\begin{pmatrix}1&1&1\\\\1&1&1\\\\1&1&1\\end{pmatrix}$ has rank 1, and every row says $x + y + z = 0$. That is a whole **plane** of eigenvectors, spanned for example by $(1, -1, 0)$ and $(1, 0, -1)$.\n\n**Check:** $1 + 1 + 4 = 6 = \\operatorname{tr}A$ and $1 \\times 1 \\times 4 = 4 = \\det A$. ✓",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Repeated root: one line or a whole plane?",
      content:
        "A repeated eigenvalue does not tell you how many eigen-directions it has. For the shear, $\\lambda = 1$ is a double root and $A - I$ has rank 1 in a $2\\times2$ setting, so only **one** line survives. Here $\\lambda = 1$ is a double root and $A - I$ has rank 1 in a $3\\times3$ setting, so $3 - 1 = 2$ free parameters give a whole **plane**. Always count with $n - \\operatorname{rank}(A - \\lambda I)$.",
    },
    {
      type: "quiz",
      id: "mx5-4-q7",
      variant: "practice",
      question: "For $A = \\begin{pmatrix}2&1&1\\\\1&2&1\\\\1&1&2\\end{pmatrix}$, which is an eigenvector for $\\lambda = 1$?",
      options: [
        { text: "$(1, -1, 0)$", correct: true, feedback: "$A(1,-1,0) = (2 - 1,\\; 1 - 2,\\; 1 - 1) = (1, -1, 0)$. It satisfies $x + y + z = 0$, the plane of $\\lambda = 1$ eigenvectors." },
        { text: "$(1, 1, 1)$", feedback: "$A(1,1,1) = (4, 4, 4) = 4(1,1,1)$. That is the eigenvector for $\\lambda = 4$." },
        { text: "$(1, 0, 0)$", feedback: "$A(1,0,0) = (2, 1, 1)$, which is not a multiple of $(1, 0, 0)$. It turns." },
      ],
      hint: "For $\\lambda = 1$, every row of $A - I$ says $x + y + z = 0$.",
    },
    {
      type: "text",
      content:
        "### Trace = sum, determinant = product\n\nIf the eigenvalues are $\\lambda_1, \\lambda_2$, then the characteristic polynomial is $(\\lambda - \\lambda_1)(\\lambda - \\lambda_2) = \\lambda^2 - (\\lambda_1 + \\lambda_2)\\lambda + \\lambda_1\\lambda_2$. Match it with $\\lambda^2 - (\\operatorname{tr}A)\\lambda + \\det A$:",
    },
    {
      type: "math",
      latex: "\\lambda_1 + \\lambda_2 + \\cdots + \\lambda_n = \\operatorname{tr}A, \\qquad \\lambda_1\\lambda_2\\cdots\\lambda_n = \\det A",
    },
    {
      type: "text",
      content:
        "The product rule has a picture behind it. Along each eigen-direction, lengths scale by $\\lambda_i$, so area (or volume) scales by the product, and that is the determinant. (This picture needs a full set of real eigen-directions. For the shear or a rotation the identity still holds algebraically, from matching coefficients, even though the picture breaks down.) It also gives a fast check: in worked example 1, $5 + 2 = 7 = \\operatorname{tr}A$ and $5 \\times 2 = 10 = \\det A$. ✓",
    },
    {
      type: "table",
      headers: ["If A has eigenvalue λ with eigenvector v…", "Matrix", "Eigenvalue", "Why"],
      rows: [
        ["powers", "$A^k$", "$\\lambda^k$", "$A^2\\mathbf{v} = A(\\lambda\\mathbf{v}) = \\lambda^2\\mathbf{v}$"],
        ["scalar multiples", "$kA$", "$k\\lambda$", "$(kA)\\mathbf{v} = k\\lambda\\mathbf{v}$"],
        ["shift", "$A + cI$", "$\\lambda + c$", "$(A + cI)\\mathbf{v} = (\\lambda + c)\\mathbf{v}$"],
        ["inverse (A invertible)", "$A^{-1}$", "$1/\\lambda$", "apply $A^{-1}$ to $A\\mathbf{v} = \\lambda\\mathbf{v}$ and divide by $\\lambda$"],
        ["transpose", "$A^T$", "$\\lambda$ (same values)", "$\\det(A^T - \\lambda I) = \\det(A - \\lambda I)$"],
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 5 (routine, with a negative eigenvalue).** Find the eigenvalues and eigenvectors of $A = \\begin{pmatrix}1&4\\\\2&3\\end{pmatrix}$.\n\n**Step 1.** $\\operatorname{tr}A = 4$ and $\\det A = 3 - 8 = -5$, so",
    },
    {
      type: "math",
      latex: "\\lambda^2 - 4\\lambda - 5 = (\\lambda - 5)(\\lambda + 1) = 0 \\;\\Rightarrow\\; \\lambda = 5,\\; -1",
    },
    {
      type: "text",
      content:
        "*Why this step:* a negative determinant forces the two eigenvalues to have opposite signs (their product is $-5$). So before factoring you already know one direction will be flipped.\n\n**Step 2: $\\lambda = 5$.** $A - 5I = \\begin{pmatrix}-4&4\\\\2&-2\\end{pmatrix}$. The rows are parallel (the built-in check) and both say $x = y$, so $\\mathbf{v} = (1, 1)$.\n\n**Step 3: $\\lambda = -1$.** $A + I = \\begin{pmatrix}2&4\\\\2&4\\end{pmatrix}$. Both rows say $x + 2y = 0$, so $\\mathbf{v} = (2, -1)$.\n\n**Check.** $A(2, -1) = (2 - 4,\\; 4 - 3) = (-2, 1) = -1\\,(2, -1)$. ✓ And $5 + (-1) = 4 = \\operatorname{tr}A$, $5 \\times (-1) = -5 = \\det A$. ✓",
    },
    {
      type: "text",
      content:
        "**Worked example 6 (application: stretching a rubber sheet).** A square rubber sheet is pulled so that each point $(x, y)$ moves to $A(x, y)$ with $A = \\begin{pmatrix}3&1\\\\1&3\\end{pmatrix}$. Fibres pointing in most directions get rotated as well as stretched. Which fibre directions are only stretched, by how much, and by what factor does the area grow?\n\n**Step 1: the characteristic equation.** $\\operatorname{tr}A = 6$, $\\det A = 9 - 1 = 8$, so $\\lambda^2 - 6\\lambda + 8 = (\\lambda - 4)(\\lambda - 2) = 0$.\n\n**Step 2: the directions.** For $\\lambda = 4$: $A - 4I = \\begin{pmatrix}-1&1\\\\1&-1\\end{pmatrix}$ gives $y = x$. For $\\lambda = 2$: $A - 2I = \\begin{pmatrix}1&1\\\\1&1\\end{pmatrix}$ gives $y = -x$.\n\n*Why this step:* these are the **principal stretch directions** that engineers look for when they test materials. Fibres along $y = x$ stretch to 4 times their length; fibres along $y = -x$ double. Every other fibre also turns, which is where shearing stress comes from.\n\n**Step 3: the area.** Area scales by $\\det A = 8$, which is $4 \\times 2$: the two principal stretches multiplied. A $10\\text{ cm} \\times 10\\text{ cm}$ patch becomes $800\\text{ cm}^2$.\n\nNotice that the two eigen-lines of this symmetric matrix are **perpendicular**. That is true for every symmetric matrix, and it is why material scientists can always find a pair of perpendicular principal directions.",
    },
    {
      type: "text",
      content:
        "**Worked example 7 (JEE pattern).** A $3\\times3$ matrix $A$ has eigenvalues $1, -1, 2$. Find (a) $\\det A$, (b) $\\operatorname{tr}(A^2)$, (c) $\\det(A^2 + 2A - I)$, (d) $\\det(\\operatorname{adj}A)$.\n\n**(a)** Determinant = product of eigenvalues $= 1 \\cdot (-1) \\cdot 2 = -2$.\n\n**(b)** $A^2$ has eigenvalues $1^2, (-1)^2, 2^2 = 1, 1, 4$, so $\\operatorname{tr}(A^2) = 6$.\n\n*Why this step:* on an eigenvector, $A^2$ acts as $\\lambda^2$ (first row of the table). The trace is the sum of the eigenvalues of $A^2$, not the square of $\\operatorname{tr}A = 2$.\n\n**(c)** On an eigenvector, the matrix $A^2 + 2A - I$ acts as the number $q(\\lambda) = \\lambda^2 + 2\\lambda - 1$:",
    },
    {
      type: "math",
      latex: "q(1) = 2, \\quad q(-1) = 1 - 2 - 1 = -2, \\quad q(2) = 4 + 4 - 1 = 7 \\;\\Rightarrow\\; \\det(A^2 + 2A - I) = 2 \\cdot (-2) \\cdot 7 = -28",
    },
    {
      type: "text",
      content:
        "*Why this step:* combining the \"powers\", \"scalar multiples\" and \"shift\" rows of the table, any polynomial in $A$ has eigenvalues $q(\\lambda_i)$. Then the determinant is their product.\n\n**(d)** From Chapter 3, $\\det(\\operatorname{adj}A) = (\\det A)^{n-1} = (-2)^2 = 4$. **Check** with eigenvalues: $\\operatorname{adj}A = (\\det A)\\,A^{-1}$ has eigenvalues $\\frac{-2}{\\lambda}$, i.e. $-2, 2, -1$, whose product is $4$. ✓",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: eigenvalues are the diagonal entries",
      content:
        "That shortcut works **only for triangular** (including diagonal) matrices. Take $\\begin{pmatrix}1&2\\\\3&2\\end{pmatrix}$: its diagonal entries are 1 and 2, but $\\operatorname{tr} = 3$ and $\\det = 2 - 6 = -4$, so $\\lambda^2 - 3\\lambda - 4 = (\\lambda - 4)(\\lambda + 1)$. The eigenvalues are $4$ and $-1$. The diagonal entries do still add up to the eigenvalues ($1 + 2 = 4 + (-1)$), but they are not the eigenvalues themselves.",
    },
    {
      type: "quiz",
      id: "mx5-4-q1",
      variant: "concept",
      question: "What are the eigenvalues of $\\begin{pmatrix}1&2\\\\3&2\\end{pmatrix}$?",
      options: [
        { text: "$4$ and $-1$", correct: true, feedback: "$\\lambda^2 - 3\\lambda - 4 = (\\lambda - 4)(\\lambda + 1)$. Check: $4 + (-1) = 3 = $ trace and $4 \\times (-1) = -4 = \\det$." },
        { text: "$1$ and $2$", feedback: "Those are the diagonal entries. That shortcut only works for triangular matrices." },
        { text: "$3$ and $-4$", feedback: "Those are the trace and the determinant: the coefficients of the characteristic polynomial, not its roots." },
      ],
      hint: "Write $\\lambda^2 - (\\operatorname{tr}A)\\lambda + \\det A = 0$.",
    },
    {
      type: "quiz",
      id: "mx5-4-q2",
      variant: "practice",
      question: "Find the eigenvalues of $\\begin{pmatrix}5&4\\\\1&2\\end{pmatrix}$.",
      options: [
        { text: "$1$ and $6$", correct: true, feedback: "$\\operatorname{tr} = 7$ and $\\det = 10 - 4 = 6$, so $\\lambda^2 - 7\\lambda + 6 = (\\lambda - 1)(\\lambda - 6)$." },
        { text: "$5$ and $2$", feedback: "The diagonal entries are not the eigenvalues unless the matrix is triangular." },
        { text: "$2$ and $3$", feedback: "These multiply to 6, but add to 5, not to the trace 7." },
        { text: "$-1$ and $-6$", feedback: "Sign slip: the roots of $\\lambda^2 - 7\\lambda + 6$ are positive." },
      ],
    },
    {
      type: "quiz",
      id: "mx5-4-q3",
      variant: "practice",
      question: "For $A = \\begin{pmatrix}5&4\\\\1&2\\end{pmatrix}$, which vector is an eigenvector for $\\lambda = 6$?",
      options: [
        { text: "$(4, 1)$", correct: true, feedback: "$A - 6I = \\begin{pmatrix}-1&4\\\\1&-4\\end{pmatrix}$ gives $x = 4y$. Check: $A(4,1) = (24, 6) = 6(4, 1)$." },
        { text: "$(1, 4)$", feedback: "$A(1, 4) = (21, 9)$, which is not a multiple of $(1, 4)$. The components are the wrong way round." },
        { text: "$(1, -1)$", feedback: "$A(1,-1) = (1, -1)$. That is an eigenvector, but for $\\lambda = 1$." },
      ],
    },
    {
      type: "quiz",
      id: "mx5-4-q4",
      variant: "practice",
      question: "A $3\\times3$ matrix $A$ has eigenvalues $1, 2, 3$. What is $\\det(2A)$?",
      options: [
        { text: "$48$", correct: true, feedback: "$2A$ has eigenvalues $2, 4, 6$, whose product is $48$. Equivalently, $\\det(2A) = 2^3 \\det A = 8 \\times 6$." },
        { text: "$12$", feedback: "That is $2\\det A$. Scaling a $3\\times3$ matrix by 2 scales the determinant by $2^3$." },
        { text: "$6$", feedback: "That is $\\det A$ itself. Scaling by 2 doubles every eigenvalue." },
        { text: "$24$", feedback: "That is $2^2\\det A$. A $3\\times3$ matrix has three rows, each scaled by 2, so the factor is $2^3 = 8$." },
      ],
    },
    {
      type: "quiz",
      id: "mx5-4-q5",
      variant: "concept",
      question: "Why do we look for $\\lambda$ with $\\det(A - \\lambda I) = 0$ instead of solving $(A - \\lambda I)\\mathbf{v} = \\mathbf{0}$ with an inverse?",
      options: [
        { text: "If $A - \\lambda I$ were invertible, the only solution would be $\\mathbf{v} = \\mathbf{0}$, which is not allowed", correct: true, feedback: "Non-zero solutions of a homogeneous system need the matrix to collapse, which is what $\\det = 0$ means." },
        { text: "Because inverses of $3\\times3$ matrices are too slow to compute", feedback: "Speed is not the issue. Inverting would only ever give $\\mathbf{v} = \\mathbf{0}$." },
        { text: "Because $\\det(A - \\lambda I) = 0$ gives the eigenvectors directly", feedback: "It gives the eigenvalues. The eigenvectors come afterwards, from $(A - \\lambda I)\\mathbf{v} = \\mathbf{0}$." },
      ],
    },
    {
      type: "quiz",
      id: "mx5-4-q6",
      variant: "practice",
      question: "$A$ is invertible and has eigenvalue $\\lambda = 4$. Which is an eigenvalue of $A^{-1} + I$?",
      options: [
        { text: "$\\frac{5}{4}$", correct: true, feedback: "$A^{-1}$ has eigenvalue $\\frac{1}{4}$ on the same eigenvector, and adding $I$ adds 1: $\\frac{1}{4} + 1 = \\frac{5}{4}$." },
        { text: "$\\frac{1}{5}$", feedback: "That would be the eigenvalue of $(A + I)^{-1}$. The order of the operations matters." },
        { text: "$-3$", feedback: "The inverse gives $\\frac{1}{\\lambda}$, not $-\\lambda$." },
      ],
    },
    {
      type: "quiz",
      id: "mx5-4-q8",
      variant: "practice",
      question: "A sheet is deformed by $A = \\begin{pmatrix}5&2\\\\2&5\\end{pmatrix}$. What are its principal stretch factors, and by what factor does area change?",
      options: [
        { text: "Stretches 7 and 3; area × 21", correct: true, feedback: "$\\operatorname{tr} = 10$, $\\det = 25 - 4 = 21$, so $\\lambda^2 - 10\\lambda + 21 = (\\lambda - 7)(\\lambda - 3)$. Area scales by $7 \\times 3 = 21$." },
        { text: "Stretches 5 and 5; area × 25", feedback: "The diagonal entries are the eigenvalues only for triangular matrices. The off-diagonal 2's matter." },
        { text: "Stretches 7 and 3; area × 10", feedback: "The stretches are right, but area scales by their **product** (the determinant), not their sum (the trace)." },
      ],
      hint: "Use $\\lambda^2 - (\\operatorname{tr}A)\\lambda + \\det A = 0$.",
    },
    {
      type: "quiz",
      id: "mx5-4-q9",
      variant: "practice",
      question: "A $3\\times3$ matrix has eigenvalues $1, -1, 2$. What is $\\det(A^2 + I)$?",
      options: [
        { text: "$20$", correct: true, feedback: "$A^2 + I$ has eigenvalues $\\lambda^2 + 1 = 2, 2, 5$, whose product is $20$." },
        { text: "$5$", feedback: "That is $(\\det A)^2 + 1 = 4 + 1$. The $+I$ shifts each eigenvalue of $A^2$ separately before you multiply." },
        { text: "$9$", feedback: "That adds the eigenvalues $2 + 2 + 5$, which gives the trace of $A^2 + I$, not its determinant." },
      ],
      hint: "Find the eigenvalues of $A^2 + I$ first, then multiply them.",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "cayley-hamilton-and-powers",
  title: "5.5 · Cayley–Hamilton and Powers",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "In 1.4 you were told to *show* that some matrix satisfied an identity like $A^2 - 5A + 7I = O$, and then use it. Where do such identities come from? From the characteristic polynomial. Every square matrix satisfies its own characteristic equation.",
    },
    {
      type: "text",
      content:
        "**Try it first.** $A = \\begin{pmatrix}4&1\\\\2&3\\end{pmatrix}$ has characteristic polynomial $\\lambda^2 - 7\\lambda + 10$. Replace $\\lambda$ by $A$ and the constant $10$ by $10I$:",
    },
    {
      type: "math",
      latex: "A^2 = \\begin{pmatrix}18&7\\\\14&11\\end{pmatrix}, \\quad 7A = \\begin{pmatrix}28&7\\\\14&21\\end{pmatrix}, \\quad A^2 - 7A + 10I = \\begin{pmatrix}18 - 28 + 10 & 0\\\\ 0 & 11 - 21 + 10\\end{pmatrix} = O",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Cayley–Hamilton theorem",
      content:
        "If $p(\\lambda) = \\det(A - \\lambda I)$ is the characteristic polynomial of a square matrix $A$, then $p(A) = O$.\n\n$2\\times2$: $A^2 - (\\operatorname{tr}A)A + (\\det A)I = O$.\n\n$3\\times3$: $A^3 - (\\operatorname{tr}A)A^2 + S_2\\,A - (\\det A)I = O$, where $S_2$ is the sum of the principal $2\\times2$ minors.",
    },
    {
      type: "text",
      content:
        "**Proof for every $2\\times2$.** Let $A = \\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}$. Then\n\n$A^2 = \\begin{pmatrix}a^2 + bc & ab + bd\\\\ ac + cd & bc + d^2\\end{pmatrix}$ and $(a + d)A = \\begin{pmatrix}a^2 + ad & ab + bd\\\\ ac + cd & ad + d^2\\end{pmatrix}$.\n\nSubtract. The off-diagonal entries cancel exactly and both diagonal entries become $bc - ad$:",
    },
    {
      type: "math",
      latex: "A^2 - (a + d)A = \\begin{pmatrix}bc - ad & 0\\\\ 0 & bc - ad\\end{pmatrix} = -(ad - bc)\\,I \\;\\;\\Longrightarrow\\;\\; A^2 - (\\operatorname{tr}A)A + (\\det A)I = O",
    },
    {
      type: "text",
      content:
        "**Why it should be true: the eigen-direction view.** If $A\\mathbf{v} = \\lambda\\mathbf{v}$, then $A^2\\mathbf{v} = \\lambda^2\\mathbf{v}$, and so $p(A)\\mathbf{v} = p(\\lambda)\\mathbf{v} = 0\\cdot\\mathbf{v} = \\mathbf{0}$. So $p(A)$ kills every eigenvector. When the eigenvectors span the plane, like $(1,1)$ and $(1,-2)$ here, $p(A)$ kills every vector, which means $p(A) = O$. The theorem goes further: it holds even for matrices like the shear, which do not have enough eigenvectors.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"just put λ = A, so det(A − AI) = det(O) = 0\"",
      content:
        "That argument proves nothing, for two reasons.\n\n**Type mismatch:** $\\det(\\cdots)$ is a **number**, and $0$ is a number. The theorem claims a **matrix** equation, $p(A) = O$.\n\n**Illegal substitution:** $\\det(A - \\lambda I)$ is defined for scalar $\\lambda$. You must first expand it into the polynomial $\\lambda^2 - 7\\lambda + 10$ and only then substitute a matrix. Try the same trick on the trace: for a $2\\times2$, $\\operatorname{tr}(A - \\lambda I) = \\operatorname{tr}A - 2\\lambda$. Putting $\\lambda = A$ gives $\\operatorname{tr}(A - A) = 0$, which would \"prove\" $(\\operatorname{tr}A)I - 2A = O$. That is false for $A = \\begin{pmatrix}4&1\\\\2&3\\end{pmatrix}$, since $7I - 2A = \\begin{pmatrix}-1&-2\\\\-4&1\\end{pmatrix} \\ne O$. Substituting a matrix into an unexpanded determinant or trace is not allowed.",
    },
    {
      type: "text",
      content:
        "### Use 1: the inverse without the adjoint\n\nFrom $A^2 - 7A + 10I = O$: $A(A - 7I) = -10I$, so $A\\cdot\\frac{1}{10}(7I - A) = I$. Therefore",
    },
    {
      type: "math",
      latex: "A^{-1} = \\frac{1}{10}(7I - A) = \\frac{1}{10}\\begin{pmatrix}3&-1\\\\-2&4\\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "This matches the $2\\times2$ formula from 3.2 (swap the diagonal, negate the off-diagonal, divide by $\\det = 10$). In general, $\\det A \\ne 0$ lets you divide the constant term out, and the inverse becomes a polynomial in $A$. When $\\det A = 0$ the constant term vanishes and there is nothing to divide by, just as you would expect.",
    },
    {
      type: "text",
      content:
        "### Use 2: taming high powers\n\nThe identity says $A^2 = 7A - 10I$, so any power can be rewritten in terms of $A$ and $I$ alone.\n\n$A^3 = A\\cdot A^2 = 7A^2 - 10A = 7(7A - 10I) - 10A = 39A - 70I$.\n\n**Check directly:** $39A - 70I = \\begin{pmatrix}156 - 70 & 39\\\\78 & 117 - 70\\end{pmatrix} = \\begin{pmatrix}86&39\\\\78&47\\end{pmatrix}$, and $A\\cdot A^2 = \\begin{pmatrix}4&1\\\\2&3\\end{pmatrix}\\begin{pmatrix}18&7\\\\14&11\\end{pmatrix} = \\begin{pmatrix}86&39\\\\78&47\\end{pmatrix}$. ✓",
    },
    {
      type: "text",
      content:
        "**All powers at once.** Every $A^n$ has the form $\\alpha A + \\beta I$. On an eigenvector, this becomes $\\lambda^n = \\alpha\\lambda + \\beta$. Use both eigenvalues:\n\n$5^n = 5\\alpha + \\beta$ and $2^n = 2\\alpha + \\beta$, which give $\\alpha = \\dfrac{5^n - 2^n}{3}$ and $\\beta = \\dfrac{5\\cdot 2^n - 2\\cdot 5^n}{3}$.\n\nFor $n = 3$: $\\alpha = \\frac{125 - 8}{3} = 39$ and $\\beta = \\frac{40 - 250}{3} = -70$. ✓",
    },
    {
      type: "text",
      content:
        "**Worked example (application: Fibonacci's rabbits).** Each month, every adult pair of rabbits produces a new pair, and new pairs become adults after one month. If $(a_n, b_n)$ are the adult and baby pairs in month $n$, then $a_{n+1} = a_n + b_n$ and $b_{n+1} = a_n$, i.e.",
    },
    {
      type: "math",
      latex: "\\begin{pmatrix}a_{n+1}\\\\b_{n+1}\\end{pmatrix} = F\\begin{pmatrix}a_n\\\\b_n\\end{pmatrix}, \\qquad F = \\begin{pmatrix}1&1\\\\1&0\\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "Find $F^5$, and hence the population after 5 months starting from one baby pair.\n\n**Step 1: Cayley–Hamilton.** $\\operatorname{tr}F = 1$ and $\\det F = 0 - 1 = -1$, so $F^2 - F - I = O$, i.e. $F^2 = F + I$.\n\n*Why this step:* this single identity lets us replace every $F^2$ by $F + I$, so each new power costs one substitution instead of a full matrix multiplication.\n\n**Step 2: climb the powers.**\n$F^3 = F\\cdot F^2 = F^2 + F = 2F + I$\n$F^4 = 2F^2 + F = 2(F + I) + F = 3F + 2I$\n$F^5 = 3F^2 + 2F = 3(F + I) + 2F = 5F + 3I$\n\nThe coefficients $1, 1, 2, 3, 5$ are the Fibonacci numbers: in general $F^n = f_n F + f_{n-1} I$.\n\n**Step 3: write out the matrix.**",
    },
    {
      type: "math",
      latex: "F^5 = 5\\begin{pmatrix}1&1\\\\1&0\\end{pmatrix} + 3\\begin{pmatrix}1&0\\\\0&1\\end{pmatrix} = \\begin{pmatrix}8&5\\\\5&3\\end{pmatrix}, \\qquad F^5\\begin{pmatrix}0\\\\1\\end{pmatrix} = \\begin{pmatrix}5\\\\3\\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "**Interpretation.** After 5 months there are 5 adult pairs and 3 baby pairs, 8 in all. The eigenvalues of $F$ are the roots of $\\lambda^2 - \\lambda - 1 = 0$, i.e. $\\frac{1 \\pm \\sqrt{5}}{2}$. The larger one, the golden ratio $\\approx 1.618$, is the long-run monthly growth factor of the colony.",
    },
    {
      type: "text",
      content:
        "**Worked example (JEE pattern).** $A = \\begin{pmatrix}1&2\\\\2&1\\end{pmatrix}$. Using Cayley–Hamilton, find $A^{-1}$ and find $\\alpha, \\beta$ with $A^5 = \\alpha A + \\beta I$.\n\n**Step 1: the identity.** $\\operatorname{tr}A = 2$ and $\\det A = 1 - 4 = -3$, so $A^2 - 2A - 3I = O$. The eigenvalues are the roots of $\\lambda^2 - 2\\lambda - 3 = (\\lambda - 3)(\\lambda + 1)$: $\\lambda = 3, -1$.\n\n**Step 2: the inverse.** $A(A - 2I) = 3I$, so $A^{-1} = \\frac{1}{3}(A - 2I) = \\frac{1}{3}\\begin{pmatrix}-1&2\\\\2&-1\\end{pmatrix}$.\n\n*Why this step:* keep all terms containing $A$ on the left and factor $A$ out; the constant term, moved to the right, becomes the divisor.\n\n**Step 3: the power, using eigenvalues.** $A^5 = \\alpha A + \\beta I$ must hold on each eigenvector, so $\\lambda^5 = \\alpha\\lambda + \\beta$ for $\\lambda = 3$ and $\\lambda = -1$:",
    },
    {
      type: "math",
      latex: "\\begin{aligned} 243 &= 3\\alpha + \\beta \\\\ -1 &= -\\alpha + \\beta \\end{aligned} \\;\\Rightarrow\\; 4\\alpha = 244,\\; \\alpha = 61,\\; \\beta = 60",
    },
    {
      type: "text",
      content:
        "*Why this step:* two unknowns need two equations, and the two eigenvalues supply exactly two. This is much faster than climbing from $A^2$ to $A^5$ one power at a time.\n\n**Check.** $A^5 = 61A + 60I = \\begin{pmatrix}121&122\\\\122&121\\end{pmatrix}$. On the eigenvector $(1, 1)$: $A^5(1, 1) = (243, 243) = 3^5(1, 1)$. ✓",
    },
    {
      type: "text",
      content:
        "**Worked example (CBSE/JEE).** $A = \\begin{pmatrix}3&1\\\\-1&2\\end{pmatrix}$. Show $A^2 - 5A + 7I = O$, then find $A^{-1}$ and $A^4$.\n\n**Step 1.** $\\operatorname{tr}A = 5$ and $\\det A = 6 + 1 = 7$. Cayley–Hamilton gives $A^2 - 5A + 7I = O$ immediately. No multiplication is needed.\n\n**Step 2: the inverse.** $A(5I - A) = 7I$, so $A^{-1} = \\frac{1}{7}(5I - A) = \\frac{1}{7}\\begin{pmatrix}2&-1\\\\1&3\\end{pmatrix}$.\n\n**Step 3: powers.** $A^2 = 5A - 7I$. Then $A^3 = 5A^2 - 7A = 5(5A - 7I) - 7A = 18A - 35I$, and $A^4 = 18A^2 - 35A = 18(5A - 7I) - 35A = 55A - 126I = \\begin{pmatrix}39&55\\\\-55&-16\\end{pmatrix}$.",
    },
    {
      type: "text",
      content:
        "**Worked example (3×3, JEE).** Use Cayley–Hamilton to find $A^{-1}$ for $A = \\begin{pmatrix}2&1&1\\\\1&2&1\\\\1&1&2\\end{pmatrix}$, the matrix from worked example 4 in 5.4.\n\n**Step 1: the characteristic polynomial.** From 5.4, $\\operatorname{tr}A = 6$, $S_2 = 9$, $\\det A = 4$. Cayley–Hamilton gives $A^3 - 6A^2 + 9A - 4I = O$.\n\n**Step 2: factor out $A$.** $A(A^2 - 6A + 9I) = 4I$, so $A^{-1} = \\frac{1}{4}(A^2 - 6A + 9I)$.\n\n**Step 3: compute.** $A^2 = \\begin{pmatrix}6&5&5\\\\5&6&5\\\\5&5&6\\end{pmatrix}$ (row 1 times column 1 is $4 + 1 + 1 = 6$; row 1 times column 2 is $2 + 2 + 1 = 5$). Then",
    },
    {
      type: "math",
      latex: "A^{-1} = \\frac{1}{4}\\left[\\begin{pmatrix}6&5&5\\\\5&6&5\\\\5&5&6\\end{pmatrix} - \\begin{pmatrix}12&6&6\\\\6&12&6\\\\6&6&12\\end{pmatrix} + \\begin{pmatrix}9&0&0\\\\0&9&0\\\\0&0&9\\end{pmatrix}\\right] = \\frac{1}{4}\\begin{pmatrix}3&-1&-1\\\\-1&3&-1\\\\-1&-1&3\\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "**Check.** Row 1 of $A$ times column 1 of $4A^{-1}$: $2(3) + 1(-1) + 1(-1) = 4$. Row 1 times column 2: $2(-1) + 1(3) + 1(-1) = 0$. So $A \\cdot 4A^{-1} = 4I$. ✓ No cofactors, no adjoint: one matrix square and some arithmetic.",
    },
    {
      type: "quiz",
      id: "mx5-5-q7",
      variant: "practice",
      question: "A $3\\times3$ matrix satisfies $A^3 - 6A^2 + 9A - 4I = O$. Then $A^{-1} = $",
      options: [
        { text: "$\\frac{1}{4}(A^2 - 6A + 9I)$", correct: true, feedback: "Move $4I$ across: $A(A^2 - 6A + 9I) = 4I$. Divide by 4." },
        { text: "$-\\frac{1}{4}(A^2 - 6A + 9I)$", feedback: "Sign slip: $-4I$ moves across as $+4I$, so the factor is $+\\frac{1}{4}$." },
        { text: "$\\frac{1}{4}(A^2 - 6A + 9)$", feedback: "The constant term must be $9I$, a matrix. You cannot add the number 9 to a matrix." },
        { text: "$A^2 - 6A + 9I$", feedback: "That product equals $4I$, not $I$. Divide by $\\det A = 4$." },
      ],
      hint: "Keep the terms containing $A$ on one side and factor $A$ out.",
    },
    {
      type: "text",
      content:
        "**Worked example (nilpotent).** $N = \\begin{pmatrix}2&-1\\\\4&-2\\end{pmatrix}$ has $\\operatorname{tr} = 0$ and $\\det = -4 + 4 = 0$, so Cayley–Hamilton says $N^2 = O$. Then the binomial expansion of $(I + N)^n$ stops after two terms, because $I$ and $N$ commute and every higher power of $N$ is zero:",
    },
    {
      type: "math",
      latex: "(I + N)^n = I + nN + \\binom{n}{2}N^2 + \\cdots = I + nN = \\begin{pmatrix}1 + 2n & -n\\\\ 4n & 1 - 2n\\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "### Preview: diagonal matrices make powers trivial\n\nFor a diagonal matrix, powers act on each axis separately: $\\begin{pmatrix}5&0\\\\0&2\\end{pmatrix}^n = \\begin{pmatrix}5^n&0\\\\0&2^n\\end{pmatrix}$. Our $A = \\begin{pmatrix}4&1\\\\2&3\\end{pmatrix}$ *is* that diagonal matrix, seen through tilted axes: along $(1,1)$ it stretches by 5 and along $(1,-2)$ by 2. Put the eigenvectors in the columns of $P = \\begin{pmatrix}1&1\\\\1&-2\\end{pmatrix}$ and you get $A = PDP^{-1}$, so $A^n = PD^nP^{-1}$. This is **diagonalization**, the main idea of a first university linear algebra course. You have just seen why it works.",
    },
    {
      type: "interactive",
      config: {
        component: "matrix-transform-grid",
        matrix: [
          [4, 1],
          [2, 3],
        ],
        showProbe: true,
        probe: [1, 1],
        showEigenLines: true,
        range: 6,
        presets: [
          { label: "A = [4 1; 2 3]", matrix: [[4, 1], [2, 3]] },
          { label: "D = diag(5, 2)", matrix: [[5, 0], [0, 2]] },
        ],
        caption:
          "A and D do the same thing: stretch by 5 along one line and by 2 along another. For D those lines are the axes; for A they are tilted. Drag the probe onto each eigen-line and compare.",
      },
    },
    {
      type: "quiz",
      id: "mx5-5-q1",
      variant: "concept",
      question: "A student \"proves\" Cayley–Hamilton by writing $p(A) = \\det(A - A\\cdot I) = \\det(O) = 0$. What is wrong?",
      options: [
        { text: "$\\det(\\cdots)$ is a number, while the theorem is a matrix equation; $\\lambda$ must be a scalar until the polynomial is expanded", correct: true, feedback: "The theorem says $A^2 - (\\operatorname{tr}A)A + (\\det A)I$ is the zero **matrix**. You have to expand $p$ first and substitute afterwards." },
        { text: "Nothing, that is the standard proof", feedback: "It compares a scalar with a matrix and substitutes a matrix where only a number is allowed. The real proof expands the polynomial." },
        { text: "$\\det(O)$ is not 0", feedback: "$\\det(O)$ is 0. The error is in the substitution, not in this last step." },
      ],
    },
    {
      type: "quiz",
      id: "mx5-5-q2",
      variant: "practice",
      question: "Which equation does $A = \\begin{pmatrix}1&2\\\\3&4\\end{pmatrix}$ satisfy?",
      options: [
        { text: "$A^2 - 5A - 2I = O$", correct: true, feedback: "$\\operatorname{tr}A = 5$ and $\\det A = 4 - 6 = -2$, so $A^2 - 5A + (-2)I = O$." },
        { text: "$A^2 - 5A + 2I = O$", feedback: "Sign slip: $\\det A = 4 - 6 = -2$, so the constant term is $-2I$." },
        { text: "$A^2 + 5A - 2I = O$", feedback: "The linear term is $-(\\operatorname{tr}A)A = -5A$." },
      ],
      hint: "Use $A^2 - (\\operatorname{tr}A)A + (\\det A)I = O$.",
    },
    {
      type: "quiz",
      id: "mx5-5-q3",
      variant: "practice",
      question: "$A^2 - 5A + 7I = O$. Which expression equals $A^{-1}$?",
      options: [
        { text: "$\\frac{1}{7}(5I - A)$", correct: true, feedback: "$A(5I - A) = 5A - A^2 = 7I$, so dividing by 7 gives the inverse." },
        { text: "$\\frac{1}{7}(A - 5I)$", feedback: "$A(A - 5I) = A^2 - 5A = -7I$, so this is $-A^{-1}$." },
        { text: "$7(5I - A)$", feedback: "You need to divide by 7 to turn $7I$ into $I$, not multiply." },
      ],
    },
    {
      type: "quiz",
      id: "mx5-5-q4",
      variant: "practice",
      question: "If $A^2 = 7A - 10I$, express $A^3$ in the form $\\alpha A + \\beta I$.",
      options: [
        { text: "$39A - 70I$", correct: true, feedback: "$A^3 = 7A^2 - 10A = 7(7A - 10I) - 10A = 39A - 70I$." },
        { text: "$49A - 70I$", feedback: "You forgot the $-10A$ from $A\\cdot(-10I)$: $49A - 10A = 39A$." },
        { text: "$343A - 1000I$", feedback: "Matrix powers do not distribute like that. Multiply the identity by $A$ and substitute for $A^2$ again." },
      ],
    },
    {
      type: "quiz",
      id: "mx5-5-q5",
      variant: "practice",
      question: "$N = \\begin{pmatrix}2&-1\\\\4&-2\\end{pmatrix}$. What is $(I + N)^{10}$?",
      options: [
        { text: "$I + 10N$", correct: true, feedback: "$\\operatorname{tr}N = 0$ and $\\det N = 0$, so $N^2 = O$ by Cayley–Hamilton. The binomial expansion stops after $I + 10N$." },
        { text: "$I + N^{10}$", feedback: "Matrix binomials still have the middle terms. It is $N^2 = O$ that kills them, and that leaves the $10N$ term." },
        { text: "$I$", feedback: "$N^2 = O$, but $N$ itself is not zero. The term $10N$ survives." },
      ],
    },
    {
      type: "quiz",
      id: "mx5-5-q6",
      variant: "concept",
      question: "A matrix satisfies $A^2 - 3A + 2I = O$. Which could be an eigenvalue of $A$?",
      options: [
        { text: "$2$", correct: true, feedback: "If $A\\mathbf{v} = \\lambda\\mathbf{v}$ then $(\\lambda^2 - 3\\lambda + 2)\\mathbf{v} = \\mathbf{0}$, so $\\lambda$ must be 1 or 2." },
        { text: "$3$", feedback: "$3^2 - 3\\cdot 3 + 2 = 2 \\ne 0$. Any eigenvalue must satisfy the same polynomial." },
        { text: "$-2$", feedback: "$4 + 6 + 2 = 12 \\ne 0$, so $-2$ cannot be an eigenvalue." },
      ],
    },
    {
      type: "quiz",
      id: "mx5-5-q8",
      variant: "practice",
      question: "For $F = \\begin{pmatrix}1&1\\\\1&0\\end{pmatrix}$, $F^2 = F + I$ and $F^5 = 5F + 3I$. Express $F^6$ as $\\alpha F + \\beta I$.",
      options: [
        { text: "$8F + 5I$", correct: true, feedback: "$F^6 = F\\cdot F^5 = 5F^2 + 3F = 5(F + I) + 3F = 8F + 5I = \\begin{pmatrix}13&8\\\\8&5\\end{pmatrix}$." },
        { text: "$6F + 5I$", feedback: "Multiply $5F + 3I$ by $F$: $5F^2 + 3F$. Replacing $F^2$ by $F + I$ gives $5F + 5I + 3F$, so the $F$ coefficient is 8." },
        { text: "$5F + 8I$", feedback: "The coefficients are the right Fibonacci numbers in the wrong places. The larger one multiplies $F$." },
      ],
      hint: "Multiply $F^5 = 5F + 3I$ by $F$, then replace $F^2$ with $F + I$.",
    },
    {
      type: "quiz",
      id: "mx5-5-q9",
      variant: "practice",
      question: "$A = \\begin{pmatrix}1&2\\\\2&1\\end{pmatrix}$ satisfies $A^2 = 2A + 3I$. Express $A^3$ as $\\alpha A + \\beta I$.",
      options: [
        { text: "$7A + 6I$", correct: true, feedback: "$A^3 = 2A^2 + 3A = 2(2A + 3I) + 3A = 7A + 6I$. Check with eigenvalue 3: $7(3) + 6 = 27 = 3^3$. ✓" },
        { text: "$4A + 6I$", feedback: "You dropped the $3A$ that comes from $A \\cdot 3I$. Total $A$ coefficient: $4 + 3 = 7$." },
        { text: "$7A + 3I$", feedback: "$2 \\times 3I = 6I$. Check with eigenvalue $-1$: $7(-1) + 3 = -4 \\ne (-1)^3$." },
      ],
      hint: "Multiply $A^2 = 2A + 3I$ by $A$ and substitute for $A^2$ again. Check with $\\lambda = 3$ and $\\lambda = -1$.",
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "matrices-chapter-5-mastery",
  title: "5.6 · Chapter 5 Mastery",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "This is the finale, so it is a diagnostic for the **whole course**, weighted towards rank and eigenvalues. Before each answer, try to say which idea from the chain the question is testing: columns, composition, area, undo, systems, or shape.",
    },
    {
      type: "table",
      headers: ["Idea", "One-line meaning", "Key test or formula"],
      rows: [
        ["Columns", "where î, ĵ land", "$A\\mathbf{v} = x\\,\\text{col}_1 + y\\,\\text{col}_2$"],
        ["Product", "do B, then A", "$(AB)_{ij}$ = row $i$ · column $j$"],
        ["Determinant", "signed area/volume factor", "$\\det(AB) = \\det A\\det B$, $\\det(kA) = k^n\\det A$"],
        ["Inverse", "undo", "exists iff $\\det A \\ne 0$; $A^{-1} = \\frac{1}{\\lvert A\\rvert}\\operatorname{adj}A$"],
        ["Rank", "dimensions that survive", "consistent iff rank A = rank [A | B]; free = n − rank"],
        ["Eigen", "directions that don't turn", "$\\det(A - \\lambda I) = 0$; $\\sum\\lambda = \\operatorname{tr}$, $\\prod\\lambda = \\det$"],
      ],
    },
    {
      type: "quiz",
      id: "mx5-6-q1",
      variant: "mastery",
      question: "What is the rank of $\\begin{pmatrix}1&2&-1\\\\2&4&-2\\\\3&6&-3\\end{pmatrix}$?",
      options: [
        { text: "1", correct: true, feedback: "Every row is a multiple of $(1, 2, -1)$. Echelon form keeps just one non-zero row." },
        { text: "3", feedback: "Three non-zero rows in the original does not mean rank 3. Reduce first." },
        { text: "2", feedback: "$R_2 - 2R_1$ and $R_3 - 3R_1$ both vanish, so only one row is left." },
      ],
    },
    {
      type: "quiz",
      id: "mx5-6-q2",
      variant: "mastery",
      question: "For $x + 2y = 3$ and $2x + ky = c$, which choice gives **infinitely many** solutions?",
      options: [
        { text: "$k = 4$, $c = 6$", correct: true, feedback: "The second equation is exactly twice the first, so rank A = rank [A | B] = 1 < 2. One free parameter." },
        { text: "$k = 4$, $c = 7$", feedback: "The lines are parallel but distinct: rank A = 1 and rank [A | B] = 2, so there is no solution." },
        { text: "$k = 3$, $c = 6$", feedback: "$\\det = 3 - 4 = -1 \\ne 0$, so there is a unique solution." },
      ],
      hint: "Make the second equation a multiple of the first, right-hand side included.",
    },
    {
      type: "quiz",
      id: "mx5-6-q3",
      variant: "mastery",
      question: "A system of 3 equations in 3 unknowns has $D = D_1 = D_2 = D_3 = 0$. What can you conclude?",
      options: [
        { text: "Nothing yet: it may have none or infinitely many; compare rank A with rank [A | B]", correct: true, feedback: "The three parallel planes $x + y + z = 1, 2, 3$ have all four determinants zero and no solution. Rank decides." },
        { text: "Infinitely many solutions", feedback: "That is the famous trap. Parallel distinct planes also give $D = D_i = 0$, and they have no solution." },
        { text: "No solution", feedback: "Three copies of the same plane also give all zeros, and they have infinitely many solutions." },
      ],
    },
    {
      type: "quiz",
      id: "mx5-6-q4",
      variant: "mastery",
      question: "What are the eigenvalues of $\\begin{pmatrix}2&3\\\\0&-1\\end{pmatrix}$?",
      options: [
        { text: "$2$ and $-1$", correct: true, feedback: "The matrix is triangular, so the eigenvalues are its diagonal entries. Check: sum $1 = $ trace, product $-2 = \\det$." },
        { text: "$2$ and $3$", feedback: "3 is an off-diagonal entry. For a triangular matrix, read the diagonal." },
        { text: "$1$ and $-2$", feedback: "Those are the trace and the determinant, not the eigenvalues." },
      ],
    },
    {
      type: "quiz",
      id: "mx5-6-q5",
      variant: "mastery",
      question: "A $2\\times 2$ matrix has trace 5 and determinant 6. What are its eigenvalues?",
      options: [
        { text: "$2$ and $3$", correct: true, feedback: "$\\lambda^2 - 5\\lambda + 6 = (\\lambda - 2)(\\lambda - 3)$. Sum 5, product 6." },
        { text: "$5$ and $6$", feedback: "Those are the coefficients of the characteristic polynomial, not its roots." },
        { text: "$1$ and $6$", feedback: "The product is 6, but the sum is 7, not the trace 5." },
      ],
    },
    {
      type: "quiz",
      id: "mx5-6-q6",
      variant: "mastery",
      question: "Which vector is an eigenvector of $\\begin{pmatrix}3&1\\\\0&2\\end{pmatrix}$ for $\\lambda = 2$?",
      options: [
        { text: "$(1, -1)$", correct: true, feedback: "$A - 2I = \\begin{pmatrix}1&1\\\\0&0\\end{pmatrix}$ gives $x + y = 0$. Check: $A(1,-1) = (2, -2) = 2(1, -1)$." },
        { text: "$(1, 0)$", feedback: "$A(1,0) = (3, 0)$: an eigenvector, but for $\\lambda = 3$." },
        { text: "$(0, 1)$", feedback: "$A(0,1) = (1, 2)$, which is not a multiple of $(0, 1)$." },
      ],
    },
    {
      type: "interactive",
      config: {
        component: "matrix-transform-grid",
        matrix: [
          [2, 1],
          [0, 1],
        ],
        editable: false,
        showDeterminant: true,
        showEigenLines: false,
        caption: "A fixed transformation. Read where î and ĵ land.",
      },
    },
    {
      type: "quiz",
      id: "mx5-6-q7",
      variant: "mastery",
      question: "The grid above shows a transformation. Read its matrix from where $\\hat{\\imath}$ and $\\hat{\\jmath}$ land, then give its eigenvalues.",
      options: [
        { text: "$\\begin{pmatrix}2&1\\\\0&1\\end{pmatrix}$, eigenvalues $2$ and $1$", correct: true, feedback: "The images are the **columns**. The matrix is triangular, so $\\lambda = 2, 1$. The x-axis is stretched by 2, and the line through $(1, -1)$ is left fixed." },
        { text: "$\\begin{pmatrix}2&0\\\\1&1\\end{pmatrix}$, eigenvalues $2$ and $1$", feedback: "That puts the images in the rows. Where $\\hat{\\imath}$ lands is the first **column**." },
        { text: "$\\begin{pmatrix}2&1\\\\0&1\\end{pmatrix}$, eigenvalues $2$ and $0$", feedback: "The columns are right, but $\\det = 2 \\ne 0$, so 0 cannot be an eigenvalue." },
      ],
    },
    {
      type: "quiz",
      id: "mx5-6-q8",
      variant: "mastery",
      question: "$A = \\begin{pmatrix}1&1\\\\1&1\\end{pmatrix}$. Using Cayley–Hamilton, what is $A^5$?",
      options: [
        { text: "$16A$", correct: true, feedback: "$\\operatorname{tr} = 2$ and $\\det = 0$ give $A^2 = 2A$. Then $A^n = 2^{n-1}A$, so $A^5 = 16A$." },
        { text: "$32A$", feedback: "$A^2 = 2A$ means each extra factor of $A$ multiplies by 2. From $A^1$ to $A^5$ that is four doublings: $2^4 = 16$." },
        { text: "$A$", feedback: "That would need $A^2 = A$. Here $A^2 = 2A$." },
      ],
    },
    {
      type: "quiz",
      id: "mx5-6-q9",
      variant: "mastery",
      question: "$A$ and $B$ are $3\\times3$ with $\\det A = 3$ and $\\det B = -2$. What is $\\det(2AB)$?",
      options: [
        { text: "$-48$", correct: true, feedback: "$\\det(2AB) = 2^3\\det A\\det B = 8 \\times 3 \\times (-2) = -48$." },
        { text: "$-12$", feedback: "Scaling a $3\\times3$ matrix by 2 multiplies the determinant by $2^3$, not by 2." },
        { text: "$48$", feedback: "The sign is off: $\\det B$ is negative, so the product flips orientation." },
      ],
    },
    {
      type: "quiz",
      id: "mx5-6-q10",
      variant: "mastery",
      question: "A $2\\times2$ matrix $A$ has eigenvalues $2$ and $-3$. What is $\\det(A^2)$?",
      options: [
        { text: "$36$", correct: true, feedback: "$A^2$ has eigenvalues $4$ and $9$, product 36. Equivalently, $(\\det A)^2 = (-6)^2 = 36$." },
        { text: "$-36$", feedback: "$\\det(A^2) = (\\det A)^2$ is a square, so it cannot be negative." },
        { text: "$1$", feedback: "That is $(\\operatorname{tr}A)^2 = (-1)^2$. The determinant is the product of the eigenvalues." },
      ],
    },
    {
      type: "quiz",
      id: "mx5-6-q11",
      variant: "mastery",
      question: "What is the inverse of $\\begin{pmatrix}2&1\\\\5&3\\end{pmatrix}$?",
      options: [
        { text: "$\\begin{pmatrix}3&-1\\\\-5&2\\end{pmatrix}$", correct: true, feedback: "$\\det = 6 - 5 = 1$. Swap the diagonal, negate the off-diagonal, divide by 1." },
        { text: "$\\begin{pmatrix}-3&1\\\\5&-2\\end{pmatrix}$", feedback: "That negates everything, which gives $-A^{-1}$." },
        { text: "$\\begin{pmatrix}\\frac12&1\\\\\\frac15&\\frac13\\end{pmatrix}$", feedback: "Reciprocals of the entries are not an inverse. Undoing a transformation does not work entry by entry." },
      ],
    },
    {
      type: "quiz",
      id: "mx5-6-q12",
      variant: "mastery",
      question: "Why is $AB \\ne BA$ for a rotation $A$ by $90^\\circ$ and a shear $B$?",
      options: [
        { text: "$AB$ means shear then rotate, $BA$ means rotate then shear, and the two orders put the grid in different places", correct: true, feedback: "The product is composition, read right to left. Changing the order changes the transformation." },
        { text: "Because matrix multiplication is only defined in one order", feedback: "Both products of $2\\times2$ matrices are defined. They just give different results." },
        { text: "Because $\\det(AB) \\ne \\det(BA)$", feedback: "In fact $\\det(AB) = \\det(BA) = \\det A\\det B$. Two different matrices can have the same area factor." },
      ],
    },
    {
      type: "quiz",
      id: "mx5-6-q13",
      variant: "mastery",
      question: "A $3\\times3$ matrix $A$ has eigenvalues $0$, $1$ and $4$. Which statement is true?",
      options: [
        { text: "$A$ is singular and has rank 2", correct: true, feedback: "Eigenvalue 0 means one direction is crushed, so $\\det A = 0 \\cdot 1 \\cdot 4 = 0$. The other two eigen-directions survive, so the rank is 2." },
        { text: "$A$ is invertible, because its trace is $5 \\ne 0$", feedback: "Invertibility depends on the determinant, the product of the eigenvalues, which is 0." },
        { text: "$A$ has rank 1, because it has one zero eigenvalue", feedback: "One zero eigenvalue crushes one direction: $3 - 1 = 2$ survive." },
      ],
    },
    {
      type: "quiz",
      id: "mx5-6-q14",
      variant: "mastery",
      question: "For matrices $A$ and $B$ where $AB$ is defined, $(AB)^T = $",
      options: [
        { text: "$B^TA^T$", correct: true, feedback: "Entry $(i, j)$ of $(AB)^T$ is row $j$ of $A$ times column $i$ of $B$, which is row $i$ of $B^T$ times column $j$ of $A^T$. Like undoing, transposing reverses the order." },
        { text: "$A^TB^T$", feedback: "The order reverses. For a $2\\times3$ $A$ and $3\\times4$ $B$, $A^TB^T$ is not even defined." },
        { text: "$AB$", feedback: "Transpose does not cancel. $(AB)^T = AB$ only when $AB$ happens to be symmetric." },
      ],
      hint: "Think of $(AB)^{-1} = B^{-1}A^{-1}$.",
    },
    {
      type: "quiz",
      id: "mx5-6-q15",
      variant: "mastery",
      question: "$A$ is $3\\times3$ with $\\det A = 4$. What is $\\det(\\operatorname{adj} A)$?",
      options: [
        { text: "$16$", correct: true, feedback: "$A\\,\\operatorname{adj}A = (\\det A)I$. Take determinants: $\\det A \\cdot \\det(\\operatorname{adj}A) = (\\det A)^3$, so $\\det(\\operatorname{adj}A) = (\\det A)^{n-1} = 4^2 = 16$." },
        { text: "$4$", feedback: "The adjoint does not scale areas the way $A$ does. $\\lvert\\operatorname{adj}A\\rvert = \\lvert A\\rvert^{n-1}$, and $n - 1 = 2$." },
        { text: "$64$", feedback: "That is $\\lvert A\\rvert^n$, the determinant of $(\\det A)I$. Divide by $\\det A$ once: $\\lvert A\\rvert^{n-1}$." },
        { text: "$\\frac{1}{4}$", feedback: "That is $\\det(A^{-1})$. The adjoint is $(\\det A)A^{-1}$, so its determinant is $4^3 \\times \\frac14 = 16$." },
      ],
      hint: "Start from $A\\,\\operatorname{adj}A = (\\det A)I$ and take determinants.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "The whole course in one chain",
      content:
        "The **columns** of a matrix are where the basis vectors land, so $A\\mathbf{v}$ is a combination of columns. A **product** is one transformation after another, which is why order matters. The **determinant** is the factor by which area or volume scales, which is why $\\det(AB) = \\det A\\det B$. The **inverse** undoes the transformation, which is possible exactly when nothing was squashed. **Solving $AX = B$** asks which input lands on $B$. **Rank** counts the dimensions that survive and decides whether that input exists. **Eigenvectors** are the directions that don't turn, and their eigenvalues multiply to the determinant. Almost every exam question on matrices is one link in this chain.",
    },
  ]),
};

export const matricesChapter5Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lessonMastery,
];
