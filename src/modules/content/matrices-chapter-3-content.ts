import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Matrices Chapter 3 — The Inverse: Undoing a Transformation.
 * The inverse as "undo": it exists exactly when nothing was squashed
 * (det ≠ 0). Built for 2×2 by derivation, for 3×3 via the adjoint, and by
 * row reduction; plus the rules for inverses of products and transposes.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "undoing-a-transformation",
  title: "3.1 · Undoing a Transformation",
  position: 1,
  blocks: blocks([
    {
      type: "video",
      src: "/videos/mx-3-the-inverse-undoing-a-transformation.mp4",
      poster: "/videos/mx-3-the-inverse-undoing-a-transformation.jpg",
      title: "Chapter 3 overview video",
      caption:
        "A narrated walk through the whole chapter. Watch it now for the big picture, or come back to it as a recap.",
    },
    {
      type: "text",
      content:
        "A matrix is a machine that moves the plane: every point goes somewhere new. The natural next question is the one you ask of any action. **Can it be undone?** If $A$ shears and turns the grid, is there a matrix that takes every point back to exactly where it started?",
    },
    {
      type: "text",
      content:
        "Below, the slider runs in two halves. From $t = 0$ to $t = 1$ the plane is carried by $A$. From $t = 1$ to $t = 2$ a second matrix, $A^{-1}$, acts on the result, and the grid slides back home. The default $A$ is a rotation by $90^\\circ$ followed by a shear.",
    },
    {
      type: "interactive",
      config: {
        component: "matrix-transform-grid",
        mode: "inverse",
        matrix: [
          [1, -1],
          [1, 0],
        ],
        presets: [
          { label: "Rotate, then shear", matrix: [[1, -1], [1, 0]] },
          { label: "Stretch", matrix: [[2, 0], [0, 0.5]] },
          { label: "Area-preserving tilt (det 1)", matrix: [[2, 1], [1, 1]] },
          { label: "Collapse onto a line", matrix: [[1, 2], [0.5, 1]] },
          { label: "Project onto x-axis", matrix: [[1, 0], [0, 0]] },
        ],
        caption:
          "Play the full sweep 0 → 2 for each preset. The grid always returns home — until you pick a collapsing matrix, where the slider stops at 1.",
      },
    },
    {
      type: "text",
      content:
        "Try the two collapsing presets. After $t = 1$ the whole plane has been flattened onto a line. The slider refuses to continue, and for a good reason: **many different inputs have landed on the same output.** A machine that receives one point on that line has no way to know which of the many original points it came from.",
    },
    {
      type: "text",
      content:
        "Make that concrete with $A = \\begin{pmatrix} 1 & 2 \\\\ 2 & 4 \\end{pmatrix}$. Then\n\n$A\\begin{pmatrix} 2 \\\\ 0 \\end{pmatrix} = \\begin{pmatrix} 2 \\\\ 4 \\end{pmatrix}$ and $A\\begin{pmatrix} 0 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} 2 \\\\ 4 \\end{pmatrix}$.\n\nTwo different inputs, one output. Any \"undo\" would have to send $(2, 4)$ back to $(2,0)$ **and** to $(0,1)$ at the same time. No function can do that, so no inverse exists.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Inverse matrix",
      content:
        "A square matrix $A$ is **invertible** (or **non-singular**) if there is a matrix $B$ of the same size with\n\n$AB = BA = I.$\n\nThat $B$ is written $A^{-1}$. If no such $B$ exists, $A$ is **singular**.",
    },
    {
      type: "text",
      content:
        "Why both orders, $AB$ **and** $BA$? Because \"undo\" has to work either way round: apply $A$ then $A^{-1}$ and you are home; apply $A^{-1}$ then $A$ and you are home too. (For square matrices it turns out one equation forces the other, but the definition asks for both.) And only **square** matrices qualify: a $2\\times3$ matrix sends 3D space into the plane, which necessarily crushes a whole direction.",
    },
    {
      type: "text",
      content:
        "**When does an inverse exist?** Chapter 2 gave the determinant a meaning: $|\\det A|$ is the factor by which $A$ scales areas (volumes in 3D). A collapse onto a line sends every region to zero area, so the collapsing matrices are exactly those with $\\det A = 0$. If $\\det A \\ne 0$, nothing is flattened, every output comes from exactly one input, and the move can be reversed.",
    },
    {
      type: "math",
      latex: "A^{-1} \\text{ exists} \\iff \\det A \\ne 0",
    },
    {
      type: "text",
      content:
        "There is a quick algebraic reason for one direction too. If $AB = I$, take determinants: $\\det A \\cdot \\det B = \\det I = 1$. A product can only equal 1 if neither factor is 0, so $\\det A \\ne 0$. Lesson 3.2 builds the inverse explicitly whenever $\\det A \\ne 0$, which settles the other direction.",
    },
    {
      type: "callout",
      variant: "info",
      title: "An inverse is unique",
      content:
        "Suppose $B$ and $C$ both undo $A$: $BA = I$ and $AC = I$. Then\n\n$B = BI = B(AC) = (BA)C = IC = C.$\n\nSo there is only ever one inverse, and writing *the* inverse $A^{-1}$ is justified. The whole proof is associativity: bracket the product $BAC$ two ways.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 — checking a claimed inverse.** Is $B = \\begin{pmatrix} 1 & -1 \\\\ -1 & 2 \\end{pmatrix}$ the inverse of $A = \\begin{pmatrix} 2 & 1 \\\\ 1 & 1 \\end{pmatrix}$?\n\n**Step 1.** Multiply row by column: $AB = \\begin{pmatrix} 2\\cdot1 + 1\\cdot(-1) & 2\\cdot(-1) + 1\\cdot 2 \\\\ 1\\cdot1 + 1\\cdot(-1) & 1\\cdot(-1)+1\\cdot2 \\end{pmatrix} = \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}$.\n\n**Step 2.** The other order: $BA = \\begin{pmatrix} 2-1 & 1-1 \\\\ -2+2 & -1+2 \\end{pmatrix} = I$.\n\n**Conclusion.** Yes, $B = A^{-1}$. Note that $\\det A = 2 - 1 = 1 \\ne 0$, as it must be.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 — deciding invertibility.** For which $k$ is $A = \\begin{pmatrix} k & 4 \\\\ 1 & k \\end{pmatrix}$ singular?\n\n**Step 1.** $\\det A = k\\cdot k - 4\\cdot 1 = k^2 - 4$.\n\n**Step 2.** Singular means $\\det A = 0$: $k^2 = 4$, so $k = 2$ or $k = -2$.\n\n**Check** $k = 2$: $A = \\begin{pmatrix} 2 & 4 \\\\ 1 & 2 \\end{pmatrix}$: the first row is twice the second, so both columns point along $(2,1)$ and the plane collapses onto that line. For every other $k$, $A$ is invertible.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 — can this code be cracked back? (application)** Two friends send two-letter messages as number pairs ($A = 1, B = 2, \\ldots, Z = 26$). Before sending, each pair $(x, y)$ is scrambled by a matrix: the sent pair is $M\\begin{pmatrix} x \\\\ y \\end{pmatrix}$. Their first choice is $M = \\begin{pmatrix} 2 & 1 \\\\ 4 & 2 \\end{pmatrix}$. Can the receiver always unscramble?\n\n**Step 1 — test the determinant.** $\\det M = 2\\cdot2 - 1\\cdot4 = 0$. *Why start here:* the determinant decides invertibility in one line, before any clever guessing.\n\n**Step 2 — find the collision the zero warns about.** \"AC\" is $(1, 3)$, and $M\\begin{pmatrix} 1 \\\\ 3 \\end{pmatrix} = \\begin{pmatrix} 2 + 3 \\\\ 4 + 6 \\end{pmatrix} = \\begin{pmatrix} 5 \\\\ 10 \\end{pmatrix}$. \"BA\" is $(2, 1)$, and $M\\begin{pmatrix} 2 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} 4 + 1 \\\\ 8 + 2 \\end{pmatrix} = \\begin{pmatrix} 5 \\\\ 10 \\end{pmatrix}$. *Why this matters:* the receiver gets $(5, 10)$ and cannot tell which word was sent. Every output lies on the line $y = 2x$, which is the collapse you saw in the grid.\n\n**Step 3 — repair the code.** Change one entry: $M = \\begin{pmatrix} 2 & 1 \\\\ 3 & 2 \\end{pmatrix}$, with $\\det M = 4 - 3 = 1 \\ne 0$. Now \"AC\" goes to $(5, 9)$ and \"BA\" to $(5, 8)$, and the undo matrix $\\begin{pmatrix} 2 & -1 \\\\ -3 & 2 \\end{pmatrix}$ (you will derive it in Lesson 3.2) recovers the message: $\\begin{pmatrix} 2 & -1 \\\\ -3 & 2 \\end{pmatrix}\\begin{pmatrix} 5 \\\\ 9 \\end{pmatrix} = \\begin{pmatrix} 10 - 9 \\\\ -15 + 18 \\end{pmatrix} = \\begin{pmatrix} 1 \\\\ 3 \\end{pmatrix}$, which is \"AC\". ✓",
    },
    {
      type: "text",
      content:
        "**Worked example 4 — a 3×3 with a parameter (JEE style).** For which real $\\lambda$ is $A = \\begin{pmatrix} 1 & \\lambda & 0 \\\\ 0 & 1 & \\lambda \\\\ \\lambda & 0 & 1 \\end{pmatrix}$ singular?\n\n**Step 1 — expand along row 1.** $\\det A = 1\\begin{vmatrix} 1 & \\lambda \\\\ 0 & 1 \\end{vmatrix} - \\lambda\\begin{vmatrix} 0 & \\lambda \\\\ \\lambda & 1 \\end{vmatrix} + 0 = 1\\cdot(1 - 0) - \\lambda(0 - \\lambda^2) = 1 + \\lambda^3.$ *Why row 1:* it contains a zero, so one of the three minors is not needed.\n\n**Step 2 — set it to zero.** $\\lambda^3 = -1$. The only real cube root of $-1$ is $\\lambda = -1$. (Factorising, $1 + \\lambda^3 = (1 + \\lambda)(1 - \\lambda + \\lambda^2)$, and the quadratic has discriminant $1 - 4 < 0$, so it has no real roots.)\n\n**Step 3 — see the collapse.** At $\\lambda = -1$ the rows are $(1, -1, 0)$, $(0, 1, -1)$, $(-1, 0, 1)$, and they add up to $(0, 0, 0)$. One row is minus the sum of the other two, so space is flattened onto a plane. For every other real $\\lambda$, $A^{-1}$ exists.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 — a proof question (CBSE/JEE style).** $A$ is a square matrix with $A^2 = A$ and $A \\ne I$. Show that $A$ is singular.\n\n**Step 1 — suppose the opposite.** Assume $A^{-1}$ exists. *Why:* the only tool that turns $A^2 = A$ into something simpler is cancelling an $A$, and cancelling is exactly what an inverse allows.\n\n**Step 2 — cancel.** Multiply $A^2 = A$ on the left by $A^{-1}$: $A^{-1}AA = A^{-1}A$, so $IA = I$, which says $A = I$.\n\n**Step 3 — contradiction.** That contradicts $A \\ne I$. So $A^{-1}$ cannot exist, and $|A| = 0$.\n\n**Picture.** $A^2 = A$ says \"doing $A$ twice is the same as doing it once\", like a projection onto a line. Projecting a second time changes nothing, and projecting destroys information, so it cannot be undone. Example: $\\begin{pmatrix} 1 & 0 \\\\ 0 & 0 \\end{pmatrix}$.",
    },
    {
      type: "table",
      headers: ["", "Non-singular ($\\det A \\ne 0$)", "Singular ($\\det A = 0$)"],
      rows: [
        ["What happens to the plane", "Moved, possibly flipped, but still a full plane", "Flattened onto a line (or a point)"],
        ["Distinct inputs", "Always give distinct outputs", "Some give the same output"],
        ["$A\\mathbf{x} = \\mathbf{0}$", "Only $\\mathbf{x} = \\mathbf{0}$", "Has non-zero solutions too"],
        ["$A^{-1}$", "Exists and is unique", "Does not exist"],
        ["Cancelling: $AB = AC \\Rightarrow B = C$?", "Yes — multiply on the left by $A^{-1}$", "Not guaranteed"],
      ],
    },
    {
      type: "callout",
      variant: "warning",
      title: "You cannot always cancel a matrix",
      content:
        "With numbers, $ab = ac$ and $a \\ne 0$ give $b = c$. With matrices the condition is $\\det A \\ne 0$, not $A \\ne O$. Example: $A = \\begin{pmatrix} 1 & 1 \\\\ 1 & 1 \\end{pmatrix}$, $B = \\begin{pmatrix} 1 & 0 \\\\ 0 & 0 \\end{pmatrix}$, $C = \\begin{pmatrix} 0 & 0 \\\\ 1 & 0 \\end{pmatrix}$ give $AB = AC = \\begin{pmatrix} 1 & 0 \\\\ 1 & 0 \\end{pmatrix}$, yet $B \\ne C$. The singular $A$ erased the difference.",
    },
    {
      type: "quiz",
      id: "mx3-1-q1",
      variant: "concept",
      question:
        "A student says: \"The inverse of $A = \\begin{pmatrix} 2 & 1 \\\\ 1 & 1 \\end{pmatrix}$ is $\\begin{pmatrix} \\frac12 & 1 \\\\ 1 & 1 \\end{pmatrix}$ — just take the reciprocal of each entry.\" What is wrong?",
      options: [
        {
          text: "The inverse must satisfy $AA^{-1} = I$, and here $A$ times that matrix is $\\begin{pmatrix} 2 & 3 \\\\ \\frac32 & 2 \\end{pmatrix}$, not $I$.",
          correct: true,
          feedback:
            "Matrix multiplication mixes entries (row times column), so undoing it cannot be done entry by entry. The true inverse is $\\begin{pmatrix} 1 & -1 \\\\ -1 & 2 \\end{pmatrix}$.",
        },
        {
          text: "Nothing — reciprocals are right, but only when $\\det A = 1$.",
          feedback:
            "Here $\\det A = 1$ and it still fails. Multiply it out: the product is not $I$.",
        },
        {
          text: "The idea is right, but you must also transpose the result.",
          feedback:
            "Transposing $\\begin{pmatrix} \\frac12 & 1 \\\\ 1 & 1 \\end{pmatrix}$ changes nothing, and the product with $A$ is still not $I$.",
        },
        {
          text: "Reciprocals are right for every matrix without zero entries.",
          feedback:
            "No. The only matrices where entrywise reciprocals work are diagonal ones, like $\\begin{pmatrix} 2 & 0 \\\\ 0 & 5 \\end{pmatrix}^{-1} = \\begin{pmatrix} \\frac12 & 0 \\\\ 0 & \\frac15 \\end{pmatrix}$, and there the zeros stay zeros.",
        },
      ],
      hint: "Multiply $A$ by the proposed matrix and see whether you get $I$.",
    },
    {
      type: "quiz",
      id: "mx3-1-q2",
      variant: "practice",
      question: "Which of these matrices has an inverse?",
      options: [
        {
          text: "$\\begin{pmatrix} 3 & 5 \\\\ 1 & 2 \\end{pmatrix}$",
          correct: true,
          feedback: "$\\det = 6 - 5 = 1 \\ne 0$, so nothing collapses and an inverse exists.",
        },
        {
          text: "$\\begin{pmatrix} 3 & 6 \\\\ 1 & 2 \\end{pmatrix}$",
          feedback: "$\\det = 6 - 6 = 0$. The first row is 3 times the second, so the plane collapses onto a line.",
        },
        {
          text: "$\\begin{pmatrix} 0 & 0 \\\\ 4 & 7 \\end{pmatrix}$",
          feedback: "A zero row makes $\\det = 0$: every output has first coordinate 0, so the whole plane is crushed onto the y-axis.",
        },
        {
          text: "$\\begin{pmatrix} -2 & 4 \\\\ 1 & -2 \\end{pmatrix}$",
          feedback: "$\\det = 4 - 4 = 0$. The columns $(-2,1)$ and $(4,-2)$ point along the same line.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx3-1-q3",
      variant: "concept",
      question:
        "$P = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}$ has two zero entries. Is it invertible?",
      options: [
        {
          text: "Yes. It reflects the plane in $y = x$, and reflecting again undoes it: $P^{-1} = P$.",
          correct: true,
          feedback: "Check: $P^2 = I$. Zero entries are irrelevant; only $\\det P = -1 \\ne 0$ matters.",
        },
        {
          text: "No, a matrix with a zero entry can never be inverted.",
          feedback: "That is the reciprocal misconception again. Invertibility is about $\\det$, not individual entries. $I$ itself has zeros and is its own inverse.",
        },
        {
          text: "No, because $\\det P$ is negative.",
          feedback: "A negative determinant means the plane is flipped, not flattened. Flips can be undone.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx3-1-q4",
      variant: "practice",
      question:
        "A square matrix satisfies $A^3 = O$ (for example $\\begin{pmatrix} 0 & 1 \\\\ 0 & 0 \\end{pmatrix}$ has $A^2 = O$). Can $A$ be invertible?",
      options: [
        {
          text: "No: $(\\det A)^3 = \\det(A^3) = \\det O = 0$, so $\\det A = 0$.",
          correct: true,
          feedback: "Determinants multiply, so a power of $A$ being the zero matrix forces $\\det A = 0$.",
        },
        {
          text: "Yes, as long as $A \\ne O$.",
          feedback: "$A \\ne O$ is not enough. The example $\\begin{pmatrix} 0 & 1 \\\\ 0 & 0 \\end{pmatrix}$ is non-zero but has $\\det = 0$.",
        },
        {
          text: "Only if $A$ is $3\\times3$.",
          feedback: "The size has nothing to do with it; the determinant argument works for any $n$.",
        },
      ],
      hint: "Take the determinant of both sides.",
    },
    {
      type: "quiz",
      id: "mx3-1-q5",
      variant: "practice",
      question:
        "For which values of $k$ is $A = \\begin{pmatrix} k & 2 \\\\ 3 & k - 1 \\end{pmatrix}$ singular?",
      options: [
        {
          text: "$k = 3$ or $k = -2$",
          correct: true,
          feedback:
            "$\\det A = k(k - 1) - 6 = k^2 - k - 6 = (k - 3)(k + 2)$. Check $k = 3$: $\\begin{pmatrix} 3 & 2 \\\\ 3 & 2 \\end{pmatrix}$ has two equal rows.",
        },
        {
          text: "$k = -3$ or $k = 2$",
          feedback: "Signs flipped when reading roots off $(k - 3)(k + 2) = 0$. Substitute $k = 2$: $\\det = 2 - 6 = -4 \\ne 0$.",
        },
        {
          text: "$k = 0$ or $k = 1$",
          feedback: "Those make the diagonal product $k(k-1)$ zero, but you still have to subtract $2\\cdot3 = 6$. The determinant is $-6$ there.",
        },
        {
          text: "No value of $k$; the matrix is always invertible.",
          feedback: "$k^2 - k - 6$ has real roots, so for two values of $k$ the determinant is zero.",
        },
      ],
      hint: "Write $\\det A$ as a quadratic in $k$ and factorise.",
    },
    {
      type: "quiz",
      id: "mx3-1-q6",
      variant: "practice",
      question:
        "A code scrambles each pair $(x, y)$ with $M = \\begin{pmatrix} 3 & 6 \\\\ 1 & 2 \\end{pmatrix}$. The pair $(2, 0)$ is sent as $(6, 2)$. Which other pair is **also** sent as $(6, 2)$, proving the code cannot be decoded?",
      options: [
        {
          text: "$(0, 1)$",
          correct: true,
          feedback:
            "$M\\begin{pmatrix} 0 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} 6 \\\\ 2 \\end{pmatrix}$. Two inputs, one output, and indeed $\\det M = 6 - 6 = 0$.",
        },
        {
          text: "$(1, 0)$",
          feedback: "$M\\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix} = \\begin{pmatrix} 3 \\\\ 1 \\end{pmatrix}$, only half of $(6, 2)$.",
        },
        {
          text: "$(1, 1)$",
          feedback: "$M\\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} 9 \\\\ 3 \\end{pmatrix}$. It lands on the same line, but not the same point.",
        },
        {
          text: "$(2, 1)$",
          feedback: "$M\\begin{pmatrix} 2 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} 12 \\\\ 4 \\end{pmatrix}$.",
        },
      ],
      hint: "Column 2 of $M$ is twice column 1, so $2\\cdot(\\text{column }1) = 1\\cdot(\\text{column }2)$.",
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "the-2x2-inverse-derived",
  title: "3.2 · The 2×2 Inverse, Derived",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "Lesson 3.1 said an inverse exists when $\\det A \\ne 0$. Now build it. There is no trick to memorize: the inverse is the matrix $X$ that solves $AX = I$, so write $X$ with four unknowns and solve.",
    },
    {
      type: "math",
      latex:
        "\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}\\begin{pmatrix} p & q \\\\ r & s \\end{pmatrix} = \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "Read it column by column. The first column of $X$ must be sent to $(1, 0)$, the second to $(0, 1)$. That is two small systems:\n\n$ap + br = 1,\\quad cp + dr = 0$ and $aq + bs = 0,\\quad cq + ds = 1.$",
    },
    {
      type: "text",
      content:
        "**Solve for** $p$. Multiply the first equation by $d$ and the second by $b$: $adp + bdr = d$ and $bcp + bdr = 0$. Subtract to kill $r$: $(ad - bc)\\,p = d$.\n\n**Solve for** $r$. Multiply the first by $c$ and the second by $a$: $acp + bcr = c$ and $acp + adr = 0$. Subtract: $(ad - bc)\\,r = -c$.\n\n**Second column, same moves.** $(ad - bc)\\,q = -b$ and $(ad - bc)\\,s = a$.",
    },
    {
      type: "text",
      content:
        "Every unknown came out as \"something divided by $ad - bc$\". That number is $\\det A$, and now you can **see** why it must be non-zero: it is what you divide by. If $ad - bc = 0$ the equations become $0 \\cdot p = d$, $0 \\cdot r = -c$, $0 \\cdot q = -b$, $0 \\cdot s = a$, which force $a = b = c = d = 0$. But then $A = O$ and $AX = O \\ne I$. Either way no inverse exists.",
    },
    {
      type: "math",
      latex:
        "\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}^{-1} = \\frac{1}{ad - bc}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}, \\qquad ad - bc \\ne 0",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Reading the recipe",
      content:
        "**Swap** the two entries on the main diagonal ($a \\leftrightarrow d$), **negate** the two off-diagonal entries ($b \\to -b$, $c \\to -c$), then **divide** by the determinant.",
    },
    {
      type: "text",
      content:
        "**Check by multiplying**, because a derivation deserves a check:\n\n$\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix} = \\begin{pmatrix} ad - bc & -ab + ab \\\\ cd - cd & -bc + ad \\end{pmatrix} = (ad - bc)\\,I.$\n\nDivide by $ad - bc$ and you get exactly $I$. The swapped-and-negated matrix gives $\\det A$ times the identity. Lesson 3.3 names it the **adjoint**, and the same fact holds for every size.",
    },
    {
      type: "text",
      content:
        "**Worked example 1.** $A = \\begin{pmatrix} 4 & 7 \\\\ 2 & 6 \\end{pmatrix}$.\n\n**Step 1 — determinant.** $4\\cdot6 - 7\\cdot2 = 24 - 14 = 10 \\ne 0$, so $A^{-1}$ exists.\n\n**Step 2 — swap and negate.** $\\begin{pmatrix} 6 & -7 \\\\ -2 & 4 \\end{pmatrix}$.\n\n**Step 3 — divide.** $A^{-1} = \\dfrac{1}{10}\\begin{pmatrix} 6 & -7 \\\\ -2 & 4 \\end{pmatrix} = \\begin{pmatrix} 0.6 & -0.7 \\\\ -0.2 & 0.4 \\end{pmatrix}$.\n\n**Check.** $\\begin{pmatrix} 4 & 7 \\\\ 2 & 6 \\end{pmatrix}\\begin{pmatrix} 6 & -7 \\\\ -2 & 4 \\end{pmatrix} = \\begin{pmatrix} 24 - 14 & -28 + 28 \\\\ 12 - 12 & -14 + 24 \\end{pmatrix} = 10I$. ✓",
    },
    {
      type: "text",
      content:
        "**Worked example 2 — a negative determinant.** $A = \\begin{pmatrix} 3 & -2 \\\\ 5 & -4 \\end{pmatrix}$.\n\n**Step 1.** $\\det A = 3(-4) - (-2)(5) = -12 + 10 = -2$.\n\n**Step 2.** Swap and negate: $\\begin{pmatrix} -4 & 2 \\\\ -5 & 3 \\end{pmatrix}$. (Negating $-2$ gives $+2$.)\n\n**Step 3.** Divide by $-2$: $A^{-1} = \\begin{pmatrix} 2 & -1 \\\\ \\frac52 & -\\frac32 \\end{pmatrix}$.\n\n**Check.** Row 1 of $A$ with column 1: $3\\cdot2 + (-2)\\cdot\\frac52 = 6 - 5 = 1$. Row 2 with column 2: $5\\cdot(-1) + (-4)(-\\frac32) = -5 + 6 = 1$. The off-diagonal products are $-3 + 3 = 0$ and $10 - 10 = 0$. ✓",
    },
    {
      type: "text",
      content:
        "**Worked example 3 — decoding a secret message (application).** Letters are numbered $A = 1, \\ldots, Z = 26$ and sent in pairs, scrambled by $M = \\begin{pmatrix} 3 & 1 \\\\ 5 & 2 \\end{pmatrix}$. You receive the pair $(21, 38)$. What was the message?\n\n**Step 1 — the receiver needs $M^{-1}$.** $\\det M = 6 - 5 = 1$, so $M^{-1} = \\begin{pmatrix} 2 & -1 \\\\ -5 & 3 \\end{pmatrix}$. *Why this step:* the sender computed $\\mathbf{c} = M\\mathbf{m}$; multiplying on the left by $M^{-1}$ gives $M^{-1}\\mathbf{c} = \\mathbf{m}$.\n\n**Step 2 — unscramble.** $M^{-1}\\begin{pmatrix} 21 \\\\ 38 \\end{pmatrix} = \\begin{pmatrix} 42 - 38 \\\\ -105 + 114 \\end{pmatrix} = \\begin{pmatrix} 4 \\\\ 9 \\end{pmatrix}$, which is \"DI\".\n\n**Step 3 — check by re-encoding.** $M\\begin{pmatrix} 4 \\\\ 9 \\end{pmatrix} = \\begin{pmatrix} 12 + 9 \\\\ 20 + 18 \\end{pmatrix} = \\begin{pmatrix} 21 \\\\ 38 \\end{pmatrix}$. ✓\n\n**Why pick $\\det M = 1$?** You divide by the determinant, so $\\det M = \\pm1$ keeps the decoded numbers whole. This is the idea behind the Hill cipher. Real versions work modulo 26, but the undo principle is the same.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 — solving a matrix equation (CBSE style).** Find $X$ with $AX = B$, where $A = \\begin{pmatrix} 2 & 1 \\\\ 5 & 3 \\end{pmatrix}$ and $B = \\begin{pmatrix} 1 & 0 \\\\ 2 & 1 \\end{pmatrix}$.\n\n**Step 1 — invert $A$.** $\\det A = 6 - 5 = 1$, so $A^{-1} = \\begin{pmatrix} 3 & -1 \\\\ -5 & 2 \\end{pmatrix}$.\n\n**Step 2 — multiply on the correct side.** $A$ sits on the **left** of $X$, so multiply both sides on the left: $A^{-1}AX = A^{-1}B$, which gives $X = A^{-1}B$. *Why the side matters:* $BA^{-1}$ is a different matrix in general, because matrix products do not commute.\n\n**Step 3 — compute.** $X = \\begin{pmatrix} 3 & -1 \\\\ -5 & 2 \\end{pmatrix}\\begin{pmatrix} 1 & 0 \\\\ 2 & 1 \\end{pmatrix} = \\begin{pmatrix} 3 - 2 & 0 - 1 \\\\ -5 + 4 & 0 + 2 \\end{pmatrix} = \\begin{pmatrix} 1 & -1 \\\\ -1 & 2 \\end{pmatrix}$.\n\n**Check.** $AX = \\begin{pmatrix} 2 - 1 & -2 + 2 \\\\ 5 - 3 & -5 + 6 \\end{pmatrix} = \\begin{pmatrix} 1 & 0 \\\\ 2 & 1 \\end{pmatrix} = B$. ✓",
    },
    {
      type: "text",
      content:
        "**Worked example 5 — a matrix that is its own inverse (JEE style).** Show that if $A = \\begin{pmatrix} a & b \\\\ c & -a \\end{pmatrix}$ with $a^2 + bc = 1$, then $A^{-1} = A$.\n\n**Step 1 — determinant.** $\\det A = a(-a) - bc = -(a^2 + bc) = -1$. *Why first:* it is non-zero, so the inverse exists, and it is the number we will divide by.\n\n**Step 2 — swap and negate.** Swapping $a$ and $-a$ and negating $b, c$ gives $\\begin{pmatrix} -a & -b \\\\ -c & a \\end{pmatrix}$.\n\n**Step 3 — divide by $-1$.** $A^{-1} = \\begin{pmatrix} a & b \\\\ c & -a \\end{pmatrix} = A$. ✓\n\n**A numerical instance.** $A = \\begin{pmatrix} 3 & 4 \\\\ -2 & -3 \\end{pmatrix}$ has $9 + 4(-2) = 1$, and indeed $A^2 = \\begin{pmatrix} 9 - 8 & 12 - 12 \\\\ -6 + 6 & -8 + 9 \\end{pmatrix} = I$. Geometrically, such matrices behave like reflections: do them twice and you are home.",
    },
    {
      type: "text",
      content:
        "**Geometry first, formula second.** For the famous transformations you should be able to *guess* the inverse before computing it. Try them below: apply each one, then watch the inverse undo it.",
    },
    {
      type: "interactive",
      config: {
        component: "matrix-transform-grid",
        mode: "inverse",
        matrix: [
          [0, -1],
          [1, 0],
        ],
        presets: [
          { label: "Rotate 90°", matrix: [[0, -1], [1, 0]] },
          { label: "Reflect in y = x", matrix: [[0, 1], [1, 0]] },
          { label: "Reflect in x-axis", matrix: [[1, 0], [0, -1]] },
          { label: "Shear by 1", matrix: [[1, 1], [0, 1]] },
          { label: "Scale x by 2", matrix: [[2, 0], [0, 1]] },
        ],
        caption:
          "Rotation is undone by rotating back; a reflection is undone by reflecting again; a shear by shearing the other way; a stretch by shrinking.",
      },
    },
    {
      type: "table",
      headers: ["Transformation", "Matrix", "Inverse", "Why"],
      rows: [
        ["Rotation by $\\theta$", "$\\begin{pmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{pmatrix}$", "$\\begin{pmatrix} \\cos\\theta & \\sin\\theta \\\\ -\\sin\\theta & \\cos\\theta \\end{pmatrix}$", "Rotation by $-\\theta$; $\\det = \\cos^2\\theta + \\sin^2\\theta = 1$"],
        ["Reflection in $y = x$", "$\\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}$", "itself", "$\\det = -1$; swap-negate-divide returns the same matrix"],
        ["Shear by $k$", "$\\begin{pmatrix} 1 & k \\\\ 0 & 1 \\end{pmatrix}$", "$\\begin{pmatrix} 1 & -k \\\\ 0 & 1 \\end{pmatrix}$", "Shear back by $-k$"],
        ["Scaling", "$\\begin{pmatrix} p & 0 \\\\ 0 & q \\end{pmatrix}$", "$\\begin{pmatrix} \\frac1p & 0 \\\\ 0 & \\frac1q \\end{pmatrix}$", "Undo each stretch ($p, q \\ne 0$)"],
      ],
    },
    {
      type: "text",
      content:
        "Check the rotation row with the formula: $\\det = \\cos^2\\theta + \\sin^2\\theta = 1$, and swap-and-negate gives $\\begin{pmatrix} \\cos\\theta & \\sin\\theta \\\\ -\\sin\\theta & \\cos\\theta \\end{pmatrix}$. Since $\\cos(-\\theta) = \\cos\\theta$ and $\\sin(-\\theta) = -\\sin\\theta$, that is exactly rotation by $-\\theta$. The algebra agrees with the picture. It also is also the **transpose** of the rotation matrix. That is no accident: rotations are the orthogonal matrices of Lesson 1.6, with $A^TA = I$, and the inverse of an orthogonal matrix is always its transpose.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Swap the diagonal, negate the off-diagonal",
      content:
        "The most common slip is to swap $a$ and $d$ and then negate **everything**, giving $\\begin{pmatrix} -d & -b \\\\ -c & -a \\end{pmatrix}$. Multiply it by $A$ and the off-diagonal entries are $-2ab$ and $-2cd$, not 0, so the result is not even a multiple of $I$. A related slip negates the diagonal instead of the off-diagonal, giving $\\begin{pmatrix} -d & b \\\\ c & -a \\end{pmatrix} = -\\operatorname{adj}A$, which produces $-A^{-1}$. Only $b$ and $c$ change sign.",
    },
    {
      type: "quiz",
      id: "mx3-2-q1",
      variant: "concept",
      question:
        "For $A = \\begin{pmatrix} 4 & 7 \\\\ 2 & 6 \\end{pmatrix}$ (with $\\det A = 10$), which is $A^{-1}$?",
      options: [
        {
          text: "$\\frac{1}{10}\\begin{pmatrix} 6 & -7 \\\\ -2 & 4 \\end{pmatrix}$",
          correct: true,
          feedback: "Swap the diagonal (4 and 6), negate only the off-diagonal (7 and 2), divide by 10.",
        },
        {
          text: "$\\frac{1}{10}\\begin{pmatrix} -6 & -7 \\\\ -2 & -4 \\end{pmatrix}$",
          feedback: "You negated everything, including the diagonal. Check row 1 of $A$ against column 2: $4(-7) + 7(-4) = -56 \\ne 0$, so this is not even a multiple of $A^{-1}$. Only the off-diagonal entries change sign.",
        },
        {
          text: "$\\frac{1}{10}\\begin{pmatrix} 6 & 7 \\\\ 2 & 4 \\end{pmatrix}$",
          feedback: "The off-diagonal signs must flip. Check: row 1 of $A$ times column 2 would be $28 + 28 \\ne 0$.",
        },
        {
          text: "$\\frac{1}{10}\\begin{pmatrix} 4 & -7 \\\\ -2 & 6 \\end{pmatrix}$",
          feedback: "The diagonal entries must swap places too.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx3-2-q2",
      variant: "practice",
      question: "Find the inverse of $\\begin{pmatrix} 5 & 3 \\\\ 3 & 2 \\end{pmatrix}$.",
      options: [
        {
          text: "$\\begin{pmatrix} 2 & -3 \\\\ -3 & 5 \\end{pmatrix}$",
          correct: true,
          feedback: "$\\det = 10 - 9 = 1$, so the inverse is just the swapped-and-negated matrix. Check: $5\\cdot2 + 3(-3) = 1$.",
        },
        {
          text: "$\\begin{pmatrix} -2 & 3 \\\\ 3 & -5 \\end{pmatrix}$",
          feedback: "That is $-A^{-1}$. The diagonal entries should keep their signs.",
        },
        {
          text: "$\\begin{pmatrix} 5 & -3 \\\\ -3 & 2 \\end{pmatrix}$",
          feedback: "The diagonal entries 5 and 2 must swap.",
        },
        {
          text: "It does not exist.",
          feedback: "$\\det = 5\\cdot2 - 3\\cdot3 = 1 \\ne 0$, so it does.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx3-2-q3",
      variant: "practice",
      question:
        "$A = \\begin{pmatrix} 2 & 3 \\\\ 1 & k \\end{pmatrix}$ and $A^{-1} = \\begin{pmatrix} 2 & -3 \\\\ -1 & 2 \\end{pmatrix}$. Find $k$.",
      options: [
        {
          text: "$k = 2$",
          correct: true,
          feedback: "Then $\\det A = 4 - 3 = 1$ and swap-negate gives $\\begin{pmatrix} 2 & -3 \\\\ -1 & 2 \\end{pmatrix}$. ✓",
        },
        {
          text: "$k = -2$",
          feedback: "Then $\\det A = -4 - 3 = -7$ and the inverse would have entries divided by $-7$.",
        },
        {
          text: "$k = \\frac12$",
          feedback: "That makes $\\det A = 1 - 3 = -2$. Multiply out $AA^{-1}$ with this $k$ and the bottom-right entry is $-3 + 1 = -2$, not 1.",
        },
      ],
      hint: "Multiply row 2 of $A$ by column 2 of $A^{-1}$; it must equal 1.",
    },
    {
      type: "quiz",
      id: "mx3-2-q4",
      variant: "practice",
      question:
        "For $A = \\begin{pmatrix} 2 & 3 \\\\ 5 & -2 \\end{pmatrix}$, it turns out that $A^{-1} = \\lambda A$. Find $\\lambda$.",
      options: [
        {
          text: "$\\lambda = \\frac{1}{19}$",
          correct: true,
          feedback:
            "$\\det A = -4 - 15 = -19$, so $A^{-1} = -\\frac{1}{19}\\begin{pmatrix} -2 & -3 \\\\ -5 & 2 \\end{pmatrix} = \\frac{1}{19}\\begin{pmatrix} 2 & 3 \\\\ 5 & -2 \\end{pmatrix} = \\frac{1}{19}A$.",
        },
        {
          text: "$\\lambda = -\\frac{1}{19}$",
          feedback: "The minus sign in $\\det A = -19$ cancels against the negated entries. Write $A^{-1}$ out fully.",
        },
        {
          text: "$\\lambda = 19$",
          feedback: "You multiplied by the determinant instead of dividing.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx3-2-q5",
      variant: "concept",
      question:
        "Without computing, what is the inverse of $\\begin{pmatrix} \\cos 30^\\circ & -\\sin 30^\\circ \\\\ \\sin 30^\\circ & \\cos 30^\\circ \\end{pmatrix}$?",
      options: [
        {
          text: "Rotation by $-30^\\circ$: $\\begin{pmatrix} \\cos 30^\\circ & \\sin 30^\\circ \\\\ -\\sin 30^\\circ & \\cos 30^\\circ \\end{pmatrix}$",
          correct: true,
          feedback: "To undo a turn, turn back. The formula confirms it, since the determinant is 1.",
        },
        {
          text: "Rotation by $330^\\circ$ written as $\\begin{pmatrix} \\cos 30^\\circ & -\\sin 30^\\circ \\\\ \\sin 30^\\circ & \\cos 30^\\circ \\end{pmatrix}$",
          feedback: "Rotating by $330^\\circ$ is correct, but that matrix is the original $30^\\circ$ rotation again.",
        },
        {
          text: "The same matrix — rotations are their own inverses.",
          feedback: "Only rotation by $180^\\circ$ (or $0^\\circ$) is its own inverse. It is *reflections* that undo themselves.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx3-2-q6",
      variant: "practice",
      question:
        "Pairs of letters ($A = 1, \\ldots, Z = 26$) are scrambled by $M = \\begin{pmatrix} 2 & 1 \\\\ 1 & 1 \\end{pmatrix}$. You receive $(13, 8)$. What was the original pair?",
      options: [
        {
          text: "$(5, 3)$, i.e. \"EC\"",
          correct: true,
          feedback:
            "$M^{-1} = \\begin{pmatrix} 1 & -1 \\\\ -1 & 2 \\end{pmatrix}$ ($\\det M = 1$), and $M^{-1}\\begin{pmatrix} 13 \\\\ 8 \\end{pmatrix} = \\begin{pmatrix} 5 \\\\ 3 \\end{pmatrix}$. Check: $M\\begin{pmatrix} 5 \\\\ 3 \\end{pmatrix} = \\begin{pmatrix} 13 \\\\ 8 \\end{pmatrix}$. ✓",
        },
        {
          text: "$(34, 21)$",
          feedback: "That is $M\\begin{pmatrix} 13 \\\\ 8 \\end{pmatrix}$: you scrambled the message a second time instead of undoing it.",
        },
        {
          text: "$(21, 29)$",
          feedback: "You used $\\begin{pmatrix} 1 & 1 \\\\ 1 & 2 \\end{pmatrix}$, which swaps the diagonal but forgets to negate the off-diagonal entries.",
        },
      ],
      hint: "Find $M^{-1}$, then multiply it by the received pair.",
    },
    {
      type: "quiz",
      id: "mx3-2-q7",
      variant: "practice",
      question:
        "With $A = \\begin{pmatrix} 2 & 1 \\\\ 5 & 3 \\end{pmatrix}$ and $B = \\begin{pmatrix} 1 & 1 \\\\ 0 & 1 \\end{pmatrix}$, find $X$ such that $XA = B$.",
      options: [
        {
          text: "$\\begin{pmatrix} -2 & 1 \\\\ -5 & 2 \\end{pmatrix}$",
          correct: true,
          feedback:
            "$A$ is on the right of $X$, so multiply on the right by $A^{-1} = \\begin{pmatrix} 3 & -1 \\\\ -5 & 2 \\end{pmatrix}$: $X = BA^{-1} = \\begin{pmatrix} 3 - 5 & -1 + 2 \\\\ -5 & 2 \\end{pmatrix}$. Check: $XA = \\begin{pmatrix} -4 + 5 & -2 + 3 \\\\ -10 + 10 & -5 + 6 \\end{pmatrix} = B$. ✓",
        },
        {
          text: "$\\begin{pmatrix} 3 & 2 \\\\ -5 & -3 \\end{pmatrix}$",
          feedback: "That is $A^{-1}B$, which solves $AX = B$. Here $A$ is on the right, so you need $BA^{-1}$.",
        },
        {
          text: "$\\begin{pmatrix} 7 & 4 \\\\ 5 & 3 \\end{pmatrix}$",
          feedback: "That is $BA$. To remove $A$ you multiply by its inverse, not by $B$ against $A$.",
        },
      ],
      hint: "From $XA = B$, multiply both sides on the right by $A^{-1}$.",
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "cofactors-and-the-adjoint",
  title: "3.3 · Cofactors and the Adjoint",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "The $2\\times2$ recipe hid a pattern. The matrix $\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}$ multiplied $A$ to give $(\\det A)\\,I$. For $3\\times3$ and larger we need a matrix with the same property. Its entries turn out to be the **cofactors** you used in Chapter 2 to expand determinants, arranged in the right places.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Minor, cofactor, adjoint",
      content:
        "**Minor** $M_{ij}$: the determinant left after deleting row $i$ and column $j$ of $A$.\n**Cofactor** $C_{ij} = (-1)^{i+j} M_{ij}$ — the minor with the checkerboard sign $\\begin{smallmatrix} + & - & + \\\\ - & + & - \\\\ + & - & + \\end{smallmatrix}$.\n**Adjoint** (adjugate) $\\operatorname{adj} A$: the **transpose** of the matrix of cofactors. So the entry in row $i$, column $j$ of $\\operatorname{adj}A$ is $C_{ji}$.",
    },
    {
      type: "text",
      content:
        "**Test it on 2×2.** For $A = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$: $C_{11} = d$, $C_{12} = -c$, $C_{21} = -b$, $C_{22} = a$. The cofactor matrix is $\\begin{pmatrix} d & -c \\\\ -b & a \\end{pmatrix}$, and transposing gives $\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}$, exactly the matrix from Lesson 3.2. The transpose is what put $-b$ in the top-right corner.",
    },
    {
      type: "text",
      content:
        "**Why does the adjoint work?** Look at the entry in row $i$, column $j$ of $A\\,(\\operatorname{adj}A)$. Row $i$ of $A$ is $(a_{i1}, a_{i2}, a_{i3})$; column $j$ of $\\operatorname{adj}A$ is row $j$ of the cofactor matrix, $(C_{j1}, C_{j2}, C_{j3})$. So",
    },
    {
      type: "math",
      latex: "\\big(A\\,\\operatorname{adj}A\\big)_{ij} = a_{i1}C_{j1} + a_{i2}C_{j2} + a_{i3}C_{j3}",
    },
    {
      type: "text",
      content:
        "**On the diagonal** ($i = j$) this is $a_{i1}C_{i1} + a_{i2}C_{i2} + a_{i3}C_{i3}$: the entries of row $i$ times their own cofactors. That is the cofactor expansion of $\\det A$ along row $i$, so every diagonal entry equals $\\det A$.\n\n**Off the diagonal** ($i \\ne j$) the entries of row $i$ are paired with the cofactors of a *different* row $j$, which are **alien cofactors**. Now take $A$ and overwrite row $j$ with a copy of row $i$. The cofactors $C_{j1}, C_{j2}, C_{j3}$ do not look at row $j$ at all (it is deleted when you form them), so they are unchanged. The sum above is therefore the expansion of this new matrix along its row $j$. But the new matrix has **two equal rows**, so its determinant is 0.\n\nThat proves $A\\,(\\operatorname{adj}A) = (\\det A)\\,I$. The same argument with **columns** (column $j$ of $A$ against the cofactors of column $i$, i.e. expansion down a column) gives $(\\operatorname{adj}A)\\,A = (\\det A)\\,I$ too.",
    },
    {
      type: "math",
      latex: "A\\,(\\operatorname{adj}A) = (\\operatorname{adj}A)\\,A = (\\det A)\\,I",
    },
    {
      type: "callout",
      variant: "info",
      title: "Expansion with alien cofactors vanishes",
      content:
        "Multiply the entries of one row by the cofactors of a **different** row and add: the answer is always 0. The same holds for columns. This single fact is why the adjoint gives $(\\det A)\\,I$: the diagonal entries are $\\det A$ and every off-diagonal entry is 0.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 — a 3×3 adjoint in steps.** $A = \\begin{pmatrix} 1 & 2 & 1 \\\\ 0 & 3 & 2 \\\\ 1 & 0 & 1 \\end{pmatrix}$.\n\n**Step 1 — row 1 cofactors.**\n$C_{11} = +\\begin{vmatrix} 3 & 2 \\\\ 0 & 1 \\end{vmatrix} = 3$, $C_{12} = -\\begin{vmatrix} 0 & 2 \\\\ 1 & 1 \\end{vmatrix} = -(0 - 2) = 2$, $C_{13} = +\\begin{vmatrix} 0 & 3 \\\\ 1 & 0 \\end{vmatrix} = -3$.\n\n**Step 2 — row 2 cofactors.**\n$C_{21} = -\\begin{vmatrix} 2 & 1 \\\\ 0 & 1 \\end{vmatrix} = -2$, $C_{22} = +\\begin{vmatrix} 1 & 1 \\\\ 1 & 1 \\end{vmatrix} = 0$, $C_{23} = -\\begin{vmatrix} 1 & 2 \\\\ 1 & 0 \\end{vmatrix} = -(0 - 2) = 2$.\n\n**Step 3 — row 3 cofactors.**\n$C_{31} = +\\begin{vmatrix} 2 & 1 \\\\ 3 & 2 \\end{vmatrix} = 1$, $C_{32} = -\\begin{vmatrix} 1 & 1 \\\\ 0 & 2 \\end{vmatrix} = -2$, $C_{33} = +\\begin{vmatrix} 1 & 2 \\\\ 0 & 3 \\end{vmatrix} = 3$.",
    },
    {
      type: "math",
      latex:
        "\\text{cofactor matrix} = \\begin{pmatrix} 3 & 2 & -3 \\\\ -2 & 0 & 2 \\\\ 1 & -2 & 3 \\end{pmatrix}, \\qquad \\operatorname{adj}A = \\begin{pmatrix} 3 & -2 & 1 \\\\ 2 & 0 & -2 \\\\ -3 & 2 & 3 \\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "**Step 4 — the determinant for free.** Expand along row 1 with the cofactors you already have: $\\det A = 1\\cdot3 + 2\\cdot2 + 1\\cdot(-3) = 4$.\n\n**Step 5 — check.** Row 1 of $A$, $(1, 2, 1)$, against the columns of $\\operatorname{adj}A$: $3 + 4 - 3 = 4$, $-2 + 0 + 2 = 0$, $1 - 4 + 3 = 0$. Row 2, $(0, 3, 2)$: $0 + 6 - 6 = 0$, $0 + 0 + 4 = 4$, $0 - 6 + 6 = 0$. Row 3, $(1, 0, 1)$: $3 - 3 = 0$, $-2 + 2 = 0$, $1 + 3 = 4$. So $A\\,(\\operatorname{adj}A) = 4I$. ✓",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Don't forget the transpose",
      content:
        "The adjoint is **not** the cofactor matrix; it is its transpose. In the example, $C_{12} = 2$ sits in row 1, column 2 of the cofactor matrix but in row 2, column 1 of $\\operatorname{adj}A$. Skip the transpose and $A$ times your matrix is not a multiple of $I$ (unless $A$ happens to be symmetric, which is why this mistake can survive a lazy check).",
    },
    {
      type: "text",
      content:
        "**Worked example 2 — verify $A(\\operatorname{adj}A) = (\\operatorname{adj}A)A = |A|\\,I$ (a standard NCERT exercise).** $A = \\begin{pmatrix} 1 & -1 & 2 \\\\ 3 & 0 & -2 \\\\ 1 & 0 & 3 \\end{pmatrix}$.\n\n**Step 1 — cofactors, row by row, with the checkerboard signs.**\nRow 1: $C_{11} = +(0\\cdot3 - (-2)\\cdot0) = 0$, $C_{12} = -(3\\cdot3 - (-2)\\cdot1) = -11$, $C_{13} = +(3\\cdot0 - 0\\cdot1) = 0$.\nRow 2: $C_{21} = -((-1)\\cdot3 - 2\\cdot0) = 3$, $C_{22} = +(1\\cdot3 - 2\\cdot1) = 1$, $C_{23} = -(1\\cdot0 - (-1)\\cdot1) = -1$.\nRow 3: $C_{31} = +((-1)(-2) - 2\\cdot0) = 2$, $C_{32} = -(1\\cdot(-2) - 2\\cdot3) = 8$, $C_{33} = +(1\\cdot0 - (-1)\\cdot3) = 3$.\n\n**Step 2 — transpose.** $\\operatorname{adj}A = \\begin{pmatrix} 0 & 3 & 2 \\\\ -11 & 1 & 8 \\\\ 0 & -1 & 3 \\end{pmatrix}$. *Why:* row 1 of the adjoint holds the cofactors of **column** 1 of $A$.\n\n**Step 3 — the determinant, the lazy way.** Column 2 of $A$ is $(-1, 0, 0)$, so expand down it: $|A| = (-1)\\cdot C_{12} = (-1)(-11) = 11$. *Why column 2:* two zeros mean only one term survives.\n\n**Step 4 — multiply.** Row 1 of $A$, $(1, -1, 2)$, against the columns of $\\operatorname{adj}A$: $0 + 11 + 0 = 11$, $3 - 1 - 2 = 0$, $2 - 8 + 6 = 0$. Row 2, $(3, 0, -2)$: $0$, $9 + 2 = 11$, $6 - 6 = 0$. Row 3, $(1, 0, 3)$: $0$, $3 - 3 = 0$, $2 + 9 = 11$. So $A(\\operatorname{adj}A) = 11I$. Multiplying in the other order, row 1 of $\\operatorname{adj}A$, $(0, 3, 2)$, against column 1 of $A$, $(1, 3, 1)$, gives $0 + 9 + 2 = 11$, and the remaining entries work out the same way to $11I$. ✓",
    },
    {
      type: "text",
      content:
        "**Worked example 3 — one entry, not nine (application).** An engineer's model of a three-beam frame has stiffness matrix $A = \\begin{pmatrix} 1 & -1 & 2 \\\\ 3 & 0 & -2 \\\\ 1 & 0 & 3 \\end{pmatrix}$ (the matrix from Worked example 2). The deflection she cares about depends only on the entry in row 2, column 3 of $A^{-1}$. Find it without building the whole inverse.\n\n**Step 1 — use the identity.** Dividing $A(\\operatorname{adj}A) = |A|\\,I$ by $|A|$ shows that $A^{-1} = \\frac{1}{|A|}\\operatorname{adj}A$ (Lesson 3.4 makes this official). So $(A^{-1})_{23} = \\dfrac{(\\operatorname{adj}A)_{23}}{|A|}$.\n\n**Step 2 — remember the transpose.** $(\\operatorname{adj}A)_{23} = C_{32}$, the cofactor of the entry in row **3**, column **2**. *Why this is the trap:* reaching for $C_{23} = -1$ gives the wrong answer.\n\n**Step 3 — compute one cofactor.** $C_{32} = -\\begin{vmatrix} 1 & 2 \\\\ 3 & -2 \\end{vmatrix} = -(-2 - 6) = 8$, and $|A| = 11$. So $(A^{-1})_{23} = \\dfrac{8}{11}$.\n\nOne $2\\times2$ determinant instead of nine. For large systems, this shortcut is the difference between a quick answer and an afternoon of arithmetic.",
    },
    {
      type: "text",
      content:
        "**Properties, each derived from the key identity** $A\\,\\operatorname{adj}A = |A|\\,I$ (for an $n\\times n$ matrix $A$, $n \\ge 2$):\n\n**Property 1.** $|\\operatorname{adj}A| = |A|^{n-1}$. Take determinants: $|A|\\cdot|\\operatorname{adj}A| = \\big||A|\\,I\\big| = |A|^n$, since scaling all $n$ rows by $|A|$ multiplies the determinant by $|A|^n$. Divide by $|A|$ when it is non-zero. In the example: $|\\operatorname{adj}A| = 4^2 = 16$.\n\nIf $|A| = 0$ you cannot divide, so argue differently. Now $A\\,\\operatorname{adj}A = O$. If $\\operatorname{adj}A$ were invertible, multiplying on the right by its inverse would force $A = O$, whose adjoint is $O$, a contradiction. So $|\\operatorname{adj}A| = 0 = |A|^{n-1}$ too, and the formula holds for every $A$.\n\n**Property 2.** $\\operatorname{adj}(AB) = (\\operatorname{adj}B)(\\operatorname{adj}A)$. The order reverses, just like transposes and (next lesson) inverses. For invertible matrices it follows from $\\operatorname{adj}A = |A|\\,A^{-1}$.\n\n**Property 3.** $\\operatorname{adj}(kA) = k^{n-1}\\operatorname{adj}A$, because each cofactor is an $(n-1)\\times(n-1)$ determinant, so it picks up $k^{n-1}$.\n\n**Property 4.** $\\operatorname{adj}(A^T) = (\\operatorname{adj}A)^T$ and $\\operatorname{adj}(\\operatorname{adj}A) = |A|^{n-2}A$.\n\n**Property 5.** For invertible $A$, $\\operatorname{adj}(A^{-1}) = (\\operatorname{adj}A)^{-1} = \\dfrac{A}{|A|}$. Both sides come from $\\operatorname{adj}M = |M|\\,M^{-1}$: with $M = A^{-1}$ it gives $\\frac{1}{|A|}A$, and inverting $\\operatorname{adj}A = |A|\\,A^{-1}$ gives $\\frac{1}{|A|}A$ as well. Taking determinants, $|\\operatorname{adj}(A^{-1})| = |A|^{-(n-1)}$.",
    },
    {
      type: "table",
      headers: ["Quantity", "$n = 2$", "$n = 3$", "General $n$"],
      rows: [
        ["$|\\operatorname{adj}A|$", "$|A|$", "$|A|^2$", "$|A|^{n-1}$"],
        ["$|kA|$", "$k^2|A|$", "$k^3|A|$", "$k^n|A|$"],
        ["$\\operatorname{adj}(kA)$", "$k\\operatorname{adj}A$", "$k^2\\operatorname{adj}A$", "$k^{n-1}\\operatorname{adj}A$"],
        ["$\\operatorname{adj}(\\operatorname{adj}A)$", "$A$", "$|A|\\,A$", "$|A|^{n-2}A$"],
        ["$\\operatorname{adj}(A^{-1}) = (\\operatorname{adj}A)^{-1}$", "$\\frac{A}{|A|}$", "$\\frac{A}{|A|}$", "$\\frac{A}{|A|}$"],
        ["$|\\operatorname{adj}(A^{-1})|$", "$\\frac{1}{|A|}$", "$\\frac{1}{|A|^2}$", "$|A|^{-(n-1)}$"],
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 4 — stacking the properties (JEE style).** $A$ is $3\\times3$ with $|A| = 4$. Find $|\\operatorname{adj}(2A)|$.\n\n**Route 1 — apply the adjoint rule to the matrix $2A$.** $|\\operatorname{adj}M| = |M|^{n-1}$ with $M = 2A$ and $n = 3$. First $|2A| = 2^3|A| = 32$. *Why $2^3$:* scaling a $3\\times3$ matrix by 2 scales all three rows, and each row contributes a factor of 2. So $|\\operatorname{adj}(2A)| = 32^2 = 1024$.\n\n**Route 2 — pull the scalar out first.** $\\operatorname{adj}(2A) = 2^{n-1}\\operatorname{adj}A = 4\\operatorname{adj}A$. Then $|4\\operatorname{adj}A| = 4^3\\,|\\operatorname{adj}A| = 64\\cdot|A|^2 = 64\\cdot16 = 1024$.\n\nTwo routes, one answer. Doing it both ways is the best defence against the classic slip of writing $|4\\operatorname{adj}A| = 4\\,|\\operatorname{adj}A|$, which forgets that a scalar comes out of a determinant once per row.",
    },
    {
      type: "quiz",
      id: "mx3-3-q1",
      variant: "concept",
      question:
        "For $A = \\begin{pmatrix} 1 & 2 & 1 \\\\ 0 & 3 & 2 \\\\ 1 & 0 & 1 \\end{pmatrix}$, what is the entry in row 1, column 2 of $\\operatorname{adj}A$?",
      options: [
        {
          text: "$-2$",
          correct: true,
          feedback: "$(\\operatorname{adj}A)_{12} = C_{21} = -\\begin{vmatrix} 2 & 1 \\\\ 0 & 1 \\end{vmatrix} = -2$. Row and column swap roles because of the transpose.",
        },
        {
          text: "$2$",
          feedback: "That is $C_{12}$, the (1,2) entry of the cofactor matrix. The adjoint is its transpose, so you need $C_{21}$.",
        },
        {
          text: "$0$",
          feedback: "That is $C_{22}$, the middle entry, which is the same in both matrices.",
        },
        {
          text: "$-3$",
          feedback: "That is $C_{13}$. Look for the cofactor of the entry in row 2, column 1.",
        },
      ],
      hint: "$(\\operatorname{adj}A)_{ij} = C_{ji}$.",
    },
    {
      type: "quiz",
      id: "mx3-3-q2",
      variant: "practice",
      question:
        "For the same $A = \\begin{pmatrix} 1 & 2 & 1 \\\\ 0 & 3 & 2 \\\\ 1 & 0 & 1 \\end{pmatrix}$, evaluate $a_{11}C_{21} + a_{12}C_{22} + a_{13}C_{23}$.",
      options: [
        {
          text: "$0$",
          correct: true,
          feedback: "Row 1 entries with row 2 cofactors are alien cofactors: $1(-2) + 2(0) + 1(2) = 0$. It is the determinant of a matrix with row 1 copied into row 2.",
        },
        {
          text: "$4$",
          feedback: "That would be row 1 with its **own** cofactors, which gives $\\det A$. These are row 2's cofactors.",
        },
        {
          text: "$-4$",
          feedback: "Compute it directly: $1\\cdot(-2) + 2\\cdot0 + 1\\cdot2$.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx3-3-q3",
      variant: "practice",
      question: "$A$ is a $3\\times3$ matrix with $|A| = 5$. What is $|\\operatorname{adj}A|$?",
      options: [
        {
          text: "$25$",
          correct: true,
          feedback: "$|\\operatorname{adj}A| = |A|^{n-1} = 5^2 = 25$.",
        },
        {
          text: "$125$",
          feedback: "That is $|A|^n$, which is $|A|\\cdot|\\operatorname{adj}A|$. Divide one factor of $|A|$ back out.",
        },
        {
          text: "$5$",
          feedback: "That rule, $|\\operatorname{adj}A| = |A|$, is for $2\\times2$ only.",
        },
        {
          text: "$\\frac15$",
          feedback: "That is $|A^{-1}|$, a different quantity.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx3-3-q4",
      variant: "practice",
      question: "What is $\\operatorname{adj}\\begin{pmatrix} 3 & -1 \\\\ 4 & 2 \\end{pmatrix}$?",
      options: [
        {
          text: "$\\begin{pmatrix} 2 & 1 \\\\ -4 & 3 \\end{pmatrix}$",
          correct: true,
          feedback: "Swap the diagonal, negate the off-diagonal: $-1 \\to 1$ and $4 \\to -4$. No division, since that is the adjoint, not the inverse.",
        },
        {
          text: "$\\frac{1}{10}\\begin{pmatrix} 2 & 1 \\\\ -4 & 3 \\end{pmatrix}$",
          feedback: "That is $A^{-1}$ ($\\det = 6 + 4 = 10$). The adjoint is not divided by the determinant.",
        },
        {
          text: "$\\begin{pmatrix} 2 & -4 \\\\ 1 & 3 \\end{pmatrix}$",
          feedback: "That is the cofactor matrix. Transpose it to get the adjoint.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx3-3-q5",
      variant: "practice",
      question: "$A$ is $3\\times3$ with $|A| = 3$. Find $|\\operatorname{adj}(\\operatorname{adj}A)|$.",
      options: [
        {
          text: "$81$",
          correct: true,
          feedback: "$|\\operatorname{adj}A| = 3^2 = 9$, and applying the rule again: $|\\operatorname{adj}(\\operatorname{adj}A)| = 9^2 = 81$. In general $|A|^{(n-1)^2}$.",
        },
        {
          text: "$9$",
          feedback: "That is one application of the rule. Apply it again to $\\operatorname{adj}A$, whose determinant is 9.",
        },
        {
          text: "$27$",
          feedback: "The exponent is $(n-1)^2 = 4$, not 3.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx3-3-q6",
      variant: "practice",
      question: "$A$ is $3\\times3$ with $|A| = 2$. Find $|\\operatorname{adj}(3A)|$.",
      options: [
        {
          text: "$2916$",
          correct: true,
          feedback:
            "$|3A| = 3^3\\cdot2 = 54$ and $|\\operatorname{adj}(3A)| = 54^2 = 2916$. Route 2 agrees: $\\operatorname{adj}(3A) = 9\\operatorname{adj}A$, so the determinant is $9^3\\cdot|A|^2 = 729\\cdot4 = 2916$.",
        },
        {
          text: "$36$",
          feedback: "You used $\\operatorname{adj}(3A) = 9\\operatorname{adj}A$ but then wrote $|9\\operatorname{adj}A| = 9\\,|\\operatorname{adj}A|$. A scalar leaves a $3\\times3$ determinant cubed: $9^3$.",
        },
        {
          text: "$108$",
          feedback: "That is $3^3\\,|\\operatorname{adj}A|$, which treats $\\operatorname{adj}(3A)$ as $3\\operatorname{adj}A$. The adjoint picks up $3^{n-1} = 9$.",
        },
        {
          text: "$54$",
          feedback: "That is $|3A|$. The adjoint's determinant is $|3A|^{n-1} = 54^2$.",
        },
      ],
      hint: "$|\\operatorname{adj}M| = |M|^2$ for $3\\times3$ $M$; take $M = 3A$.",
    },
    {
      type: "quiz",
      id: "mx3-3-q7",
      variant: "practice",
      question:
        "For $A = \\begin{pmatrix} 1 & -1 & 2 \\\\ 3 & 0 & -2 \\\\ 1 & 0 & 3 \\end{pmatrix}$ (with $|A| = 11$), what is the entry in row 1, column 3 of $A^{-1}$?",
      options: [
        {
          text: "$\\frac{2}{11}$",
          correct: true,
          feedback:
            "$(A^{-1})_{13} = \\frac{C_{31}}{|A|}$ and $C_{31} = +\\begin{vmatrix} -1 & 2 \\\\ 0 & -2 \\end{vmatrix} = 2 - 0 = 2$.",
        },
        {
          text: "$0$",
          feedback: "That is $\\frac{C_{13}}{|A|}$. The transpose means you need the cofactor of position (3,1), not (1,3).",
        },
        {
          text: "$2$",
          feedback: "Right cofactor, but you forgot to divide by $|A| = 11$. That is the adjoint's entry, not the inverse's.",
        },
        {
          text: "$\\frac{3}{11}$",
          feedback: "That is $\\frac{C_{21}}{|A|}$, the (1,2) entry of $A^{-1}$.",
        },
      ],
      hint: "$(A^{-1})_{ij} = C_{ji}/|A|$.",
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "inverse-via-the-adjoint",
  title: "3.4 · Inverse via the Adjoint, and Its Rules",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "Lesson 3.3 ended with $A\\,(\\operatorname{adj}A) = (\\operatorname{adj}A)\\,A = |A|\\,I$. If $|A| \\ne 0$, divide both sides by it. The matrix $\\frac{1}{|A|}\\operatorname{adj}A$ multiplies $A$ to give $I$ in both orders, so by uniqueness it **is** the inverse.",
    },
    {
      type: "math",
      latex: "A^{-1} = \\frac{1}{|A|}\\,\\operatorname{adj}A, \\qquad |A| \\ne 0",
    },
    {
      type: "text",
      content:
        "**Worked example 1 — full 3×3 inverse.** $A = \\begin{pmatrix} 1 & -1 & 2 \\\\ 0 & 2 & -3 \\\\ 3 & -2 & 4 \\end{pmatrix}$.\n\n**Step 1 — determinant** (along row 1): $1(8 - 6) - (-1)(0 + 9) + 2(0 - 6) = 2 + 9 - 12 = -1$. Non-zero, so $A^{-1}$ exists.\n\n**Step 2 — cofactors.**\nRow 1: $C_{11} = 8 - 6 = 2$, $C_{12} = -(0 + 9) = -9$, $C_{13} = 0 - 6 = -6$.\nRow 2: $C_{21} = -(-4 + 4) = 0$, $C_{22} = 4 - 6 = -2$, $C_{23} = -(-2 + 3) = -1$.\nRow 3: $C_{31} = 3 - 4 = -1$, $C_{32} = -(-3 - 0) = 3$, $C_{33} = 2 - 0 = 2$.\n\n**Step 3 — transpose into the adjoint.** $\\operatorname{adj}A = \\begin{pmatrix} 2 & 0 & -1 \\\\ -9 & -2 & 3 \\\\ -6 & -1 & 2 \\end{pmatrix}$.\n\n**Step 4 — divide by the determinant**, $|A| = -1$, which flips every sign:",
    },
    {
      type: "math",
      latex: "A^{-1} = \\begin{pmatrix} -2 & 0 & 1 \\\\ 9 & 2 & -3 \\\\ 6 & 1 & -2 \\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "**Step 5 — verify.** Check $AA^{-1} = I$. Row 1 of $A$, $(1, -1, 2)$: with column 1, $-2 - 9 + 12 = 1$; with column 2, $0 - 2 + 2 = 0$; with column 3, $1 + 3 - 4 = 0$. Row 2, $(0, 2, -3)$: $18 - 18 = 0$, $4 - 3 = 1$, $-6 + 6 = 0$. Row 3, $(3, -2, 4)$: $-6 - 18 + 24 = 0$, $0 - 4 + 4 = 0$, $3 + 6 - 8 = 1$. ✓ Always do this check: one sign slip in a cofactor shows up at once.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 — a fractional inverse.** From Lesson 3.3, $A = \\begin{pmatrix} 1 & 2 & 1 \\\\ 0 & 3 & 2 \\\\ 1 & 0 & 1 \\end{pmatrix}$ has $|A| = 4$ and $\\operatorname{adj}A = \\begin{pmatrix} 3 & -2 & 1 \\\\ 2 & 0 & -2 \\\\ -3 & 2 & 3 \\end{pmatrix}$. So\n\n$A^{-1} = \\dfrac14\\begin{pmatrix} 3 & -2 & 1 \\\\ 2 & 0 & -2 \\\\ -3 & 2 & 3 \\end{pmatrix}.$\n\nThe check was already done: $A\\,(\\operatorname{adj}A) = 4I$. Leave the $\\frac14$ outside; that keeps the arithmetic clean and the answer readable.",
    },
    {
      type: "text",
      content:
        "Before the rules, a picture. Below, $B$ (a shear) acts first and then $A$. Ask yourself: to bring the grid home, which one must be undone first?",
    },
    {
      type: "interactive",
      config: {
        component: "matrix-transform-grid",
        mode: "compose",
        matrix: [
          [2, 1],
          [1, 1],
        ],
        secondMatrix: [
          [1, 1],
          [0, 1],
        ],
        caption:
          "Do B (shear), then A. To get home, undo A first, then B. Try the inverse of the product in the next grid.",
      },
    },
    {
      type: "interactive",
      config: {
        component: "matrix-transform-grid",
        mode: "inverse",
        matrix: [
          [2, 3],
          [1, 2],
        ],
        caption:
          "This is AB = [[2, 3], [1, 2]], the combined move from the grid above. Its inverse carries the grid home, and Worked example 3 shows it equals B⁻¹A⁻¹.",
      },
    },
    {
      type: "text",
      content:
        "**The rules.** Each one is derived by checking a candidate against the definition $XY = I$.\n\n**Inverse of a product.** Think of $AB$ as \"do $B$, then $A$\". To undo it, undo the **last** step first: undo $A$, then undo $B$. That is $B^{-1}A^{-1}$. It is the socks-and-shoes rule: socks go on first, shoes second, and to undo you take the shoes off first. Check it:\n\n$(AB)(B^{-1}A^{-1}) = A(BB^{-1})A^{-1} = AIA^{-1} = AA^{-1} = I.$",
    },
    {
      type: "math",
      latex:
        "(AB)^{-1} = B^{-1}A^{-1}, \\qquad (A^T)^{-1} = (A^{-1})^T, \\qquad |A^{-1}| = \\frac{1}{|A|}",
    },
    {
      type: "text",
      content:
        "**Transpose.** Using $(XY)^T = Y^TX^T$: $A^T(A^{-1})^T = (A^{-1}A)^T = I^T = I$. So $(A^{-1})^T$ undoes $A^T$. Inverting and transposing can be done in either order.\n\n**Determinant.** $|A|\\cdot|A^{-1}| = |AA^{-1}| = |I| = 1$. The inverse scales areas by the reciprocal factor, which is what you would expect from an undo.\n\n**Two more that follow straight from the definition:** $(A^{-1})^{-1} = A$, and $(kA)^{-1} = \\frac1k A^{-1}$ for $k \\ne 0$.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 — checking socks-and-shoes with numbers.** $A = \\begin{pmatrix} 2 & 1 \\\\ 1 & 1 \\end{pmatrix}$, $B = \\begin{pmatrix} 1 & 1 \\\\ 0 & 1 \\end{pmatrix}$, so $A^{-1} = \\begin{pmatrix} 1 & -1 \\\\ -1 & 2 \\end{pmatrix}$ and $B^{-1} = \\begin{pmatrix} 1 & -1 \\\\ 0 & 1 \\end{pmatrix}$.\n\n**Step 1.** $AB = \\begin{pmatrix} 2 & 3 \\\\ 1 & 2 \\end{pmatrix}$, $\\det = 1$, so $(AB)^{-1} = \\begin{pmatrix} 2 & -3 \\\\ -1 & 2 \\end{pmatrix}$.\n\n**Step 2.** $B^{-1}A^{-1} = \\begin{pmatrix} 1 & -1 \\\\ 0 & 1 \\end{pmatrix}\\begin{pmatrix} 1 & -1 \\\\ -1 & 2 \\end{pmatrix} = \\begin{pmatrix} 2 & -3 \\\\ -1 & 2 \\end{pmatrix}$. ✓ Matches.\n\n**Step 3.** The wrong order: $A^{-1}B^{-1} = \\begin{pmatrix} 1 & -1 \\\\ -1 & 2 \\end{pmatrix}\\begin{pmatrix} 1 & -1 \\\\ 0 & 1 \\end{pmatrix} = \\begin{pmatrix} 1 & -2 \\\\ -1 & 3 \\end{pmatrix}$. Different.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "$(AB)^{-1} \\ne A^{-1}B^{-1}$ in general",
      content:
        "The order reverses, for the same reason $(AB)^T = B^TA^T$. The two orders agree only when $A^{-1}$ and $B^{-1}$ commute. For three matrices: $(ABC)^{-1} = C^{-1}B^{-1}A^{-1}$.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 — undoing a photo edit (application).** A design app first shears an image with $S = \\begin{pmatrix} 1 & 2 \\\\ 0 & 1 \\end{pmatrix}$, then rotates it by $90^\\circ$ with $R = \\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}$. A pixel ends up at $(3, 5)$. Where was it originally, and what single matrix is the \"Undo\" button?\n\n**Step 1 — the combined edit.** Shear first, rotate second, so the edit is $RS$ (the first move sits on the right): $RS = \\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}\\begin{pmatrix} 1 & 2 \\\\ 0 & 1 \\end{pmatrix} = \\begin{pmatrix} 0 & -1 \\\\ 1 & 2 \\end{pmatrix}$.\n\n**Step 2 — undo in reverse order.** $(RS)^{-1} = S^{-1}R^{-1}$: un-rotate first (by $-90^\\circ$), then un-shear. *Why reversed:* the rotation happened last, so it has to be undone first. $S^{-1} = \\begin{pmatrix} 1 & -2 \\\\ 0 & 1 \\end{pmatrix}$ and $R^{-1} = \\begin{pmatrix} 0 & 1 \\\\ -1 & 0 \\end{pmatrix}$, so\n\n$S^{-1}R^{-1} = \\begin{pmatrix} 1 & -2 \\\\ 0 & 1 \\end{pmatrix}\\begin{pmatrix} 0 & 1 \\\\ -1 & 0 \\end{pmatrix} = \\begin{pmatrix} 2 & 1 \\\\ -1 & 0 \\end{pmatrix}.$\n\n**Step 3 — check against the edit.** $\\begin{pmatrix} 0 & -1 \\\\ 1 & 2 \\end{pmatrix}\\begin{pmatrix} 2 & 1 \\\\ -1 & 0 \\end{pmatrix} = \\begin{pmatrix} 1 & 0 \\\\ 2 - 2 & 1 \\end{pmatrix} = I$. ✓\n\n**Step 4 — send the pixel home.** $\\begin{pmatrix} 2 & 1 \\\\ -1 & 0 \\end{pmatrix}\\begin{pmatrix} 3 \\\\ 5 \\end{pmatrix} = \\begin{pmatrix} 11 \\\\ -3 \\end{pmatrix}$. Re-applying the edit: $RS\\begin{pmatrix} 11 \\\\ -3 \\end{pmatrix} = \\begin{pmatrix} 3 \\\\ 11 - 6 \\end{pmatrix} = \\begin{pmatrix} 3 \\\\ 5 \\end{pmatrix}$. ✓",
    },
    {
      type: "text",
      content:
        "**Worked example 5 — $(AB)^{-1}$ without ever finding $A$ (a standard NCERT exercise).** Given $A^{-1} = \\begin{pmatrix} 3 & -1 & 1 \\\\ -15 & 6 & -5 \\\\ 5 & -2 & 2 \\end{pmatrix}$ and $B = \\begin{pmatrix} 1 & 2 & -2 \\\\ -1 & 3 & 0 \\\\ 0 & -2 & 1 \\end{pmatrix}$, find $(AB)^{-1}$.\n\n**Step 1 — choose the rule.** $(AB)^{-1} = B^{-1}A^{-1}$. *Why this saves work:* $A^{-1}$ is already given, so only $B$ needs inverting. Recovering $A$ first would be a wasted detour.\n\n**Step 2 — $|B|$ along row 1.** $1(3 - 0) - 2(-1 - 0) + (-2)(2 - 0) = 3 + 2 - 4 = 1$.\n\n**Step 3 — cofactors of $B$.**\nRow 1: $C_{11} = 3$, $C_{12} = -(-1 - 0) = 1$, $C_{13} = 2 - 0 = 2$.\nRow 2: $C_{21} = -(2 - 4) = 2$, $C_{22} = 1 - 0 = 1$, $C_{23} = -(-2 - 0) = 2$.\nRow 3: $C_{31} = 0 + 6 = 6$, $C_{32} = -(0 - 2) = 2$, $C_{33} = 3 + 2 = 5$.\nTranspose and divide by $|B| = 1$: $B^{-1} = \\begin{pmatrix} 3 & 2 & 6 \\\\ 1 & 1 & 2 \\\\ 2 & 2 & 5 \\end{pmatrix}$.\n\n**Step 4 — multiply in the right order.** Row 1 of $B^{-1}$, $(3, 2, 6)$, against the columns of $A^{-1}$: $9 - 30 + 30 = 9$, $-3 + 12 - 12 = -3$, $3 - 10 + 12 = 5$. Row 2, $(1, 1, 2)$: $3 - 15 + 10 = -2$, $-1 + 6 - 4 = 1$, $1 - 5 + 4 = 0$. Row 3, $(2, 2, 5)$: $6 - 30 + 25 = 1$, $-2 + 12 - 10 = 0$, $2 - 10 + 10 = 2$.",
    },
    {
      type: "math",
      latex: "(AB)^{-1} = B^{-1}A^{-1} = \\begin{pmatrix} 9 & -3 & 5 \\\\ -2 & 1 & 0 \\\\ 1 & 0 & 2 \\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "**Worked example 6 — determinants of combinations (JEE style).** $A$ and $B$ are $3\\times3$ with $|A| = 2$ and $|B| = 3$. Find $|3A^{-1}B^T|$.\n\n**Step 1 — split the product.** Determinants multiply: $|3A^{-1}B^T| = |3I|\\cdot|A^{-1}|\\cdot|B^T|$. *Why this is allowed:* $3A^{-1}B^T = (3I)A^{-1}B^T$, and $|XY| = |X||Y|$.\n\n**Step 2 — each factor on its own.** $|3I| = 3^3 = 27$ (one factor of 3 per row), $|A^{-1}| = \\frac{1}{|A|} = \\frac12$, $|B^T| = |B| = 3$.\n\n**Step 3 — combine.** $27\\cdot\\frac12\\cdot3 = \\dfrac{81}{2}$.\n\nThe three facts in play (the scalar becomes $k^n$, the inverse gives the reciprocal, the transpose changes nothing) cover most one-line JEE questions on this topic.",
    },
    {
      type: "text",
      content:
        "**Special cases worth knowing on sight.** Each row below comes from one of the rules above, not from new theory. Powers: $A^n$ is $A$ applied $n$ times, so socks-and-shoes undoes it by applying $A^{-1}$ $n$ times. Symmetric: if $A^T = A$ then $(A^{-1})^T = (A^T)^{-1} = A^{-1}$. Orthogonal: $AA^T = I$ says that $A^T$ undoes $A$, and by uniqueness it **is** the inverse. Nilpotent: if $N^3 = O$ then $(I - N)(I + N + N^2) = I - N^3 = I$, the matrix version of $\\frac{1}{1-x} = 1 + x + x^2 + \\cdots$, which here stops after finitely many terms.",
    },
    {
      type: "table",
      headers: ["Type of matrix", "Condition", "Inverse", "Why"],
      rows: [
        ["Diagonal", "$D = \\operatorname{diag}(d_1, \\ldots, d_n)$, every $d_i \\ne 0$", "$\\operatorname{diag}\\left(\\frac{1}{d_1}, \\ldots, \\frac{1}{d_n}\\right)$", "Undo each axis stretch separately"],
        ["Upper (lower) triangular", "every diagonal entry $a_{ii} \\ne 0$", "Upper (lower) triangular, with diagonal entries $\\frac{1}{a_{ii}}$", "$|A| = a_{11}a_{22}\\cdots a_{nn}$; row reduction never disturbs the zeros"],
        ["Symmetric", "$A^T = A$", "Symmetric too", "$(A^{-1})^T = (A^T)^{-1} = A^{-1}$"],
        ["Orthogonal", "$AA^T = A^TA = I$", "$A^{-1} = A^T$", "The definition itself; rotations are the main example"],
        ["Involutory", "$A^2 = I$", "$A^{-1} = A$", "$A \\cdot A = I$; reflections are the main example"],
        ["Power", "$A$ invertible", "$(A^n)^{-1} = (A^{-1})^n$", "Socks-and-shoes applied to $A\\cdot A\\cdots A$"],
        ["$I - N$, nilpotent $N$", "$N^k = O$", "$I + N + \\cdots + N^{k-1}$", "The product telescopes to $I - N^k = I$"],
      ],
    },
    {
      type: "text",
      content:
        "**The polynomial method.** Sometimes you know an equation that $A$ satisfies, and the inverse falls out of it with no adjoint at all. Take $A = \\begin{pmatrix} 2 & 3 \\\\ 1 & 2 \\end{pmatrix}$.\n\n**Step 1 — verify the equation.** $A^2 = \\begin{pmatrix} 7 & 12 \\\\ 4 & 7 \\end{pmatrix}$ and $4A = \\begin{pmatrix} 8 & 12 \\\\ 4 & 8 \\end{pmatrix}$, so $A^2 - 4A + I = \\begin{pmatrix} 7 - 8 + 1 & 0 \\\\ 0 & 7 - 8 + 1 \\end{pmatrix} = O$.\n\n**Step 2 — isolate the identity.** $A^2 - 4A = -I$, so $A(A - 4I) = -I$, i.e. $A(4I - A) = I$.\n\n**Step 3 — read off the inverse.** $A^{-1} = 4I - A = \\begin{pmatrix} 2 & -3 \\\\ -1 & 2 \\end{pmatrix}$. The $2\\times2$ formula agrees, since $\\det A = 1$.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "The general move",
      content:
        "If $A$ satisfies a polynomial with a **non-zero constant term**, move the constant term to one side as a multiple of $I$ and factor $A$ out of everything else: $A \\cdot (\\ldots) = cI$ gives $A^{-1} = \\frac1c(\\ldots)$. Every $2\\times2$ matrix satisfies $A^2 - (\\operatorname{tr}A)A + (\\det A)I = O$, a preview of the Cayley–Hamilton theorem in Chapter 5.",
    },
    {
      type: "text",
      content:
        "**Worked example 7 — a 3×3 CBSE classic.** $A = \\begin{pmatrix} 2 & -1 & 1 \\\\ -1 & 2 & -1 \\\\ 1 & -1 & 2 \\end{pmatrix}$ satisfies $A^3 - 6A^2 + 9A - 4I = O$. Show this, and hence find $A^{-1}$.\n\n**Step 0 — check the equation.** $A^2 = \\begin{pmatrix} 6 & -5 & 5 \\\\ -5 & 6 & -5 \\\\ 5 & -5 & 6 \\end{pmatrix}$ and $A^3 = A\\cdot A^2 = \\begin{pmatrix} 22 & -21 & 21 \\\\ -21 & 22 & -21 \\\\ 21 & -21 & 22 \\end{pmatrix}$. Now compare entry by entry. On the diagonal: $22 - 6(6) + 9(2) - 4 = 22 - 36 + 18 - 4 = 0$. At position (1,2): $-21 - 6(-5) + 9(-1) - 0 = -21 + 30 - 9 = 0$. At position (1,3): $21 - 30 + 9 = 0$. The other entries match by the same pattern, so $A^3 - 6A^2 + 9A - 4I = O$. Where does this cubic come from? Its coefficients are the trace ($6$), the sum of the principal $2\\times2$ minors ($9$) and $|A| = 4$. That is the Cayley–Hamilton theorem of Chapter 5.\n\n**Step 1.** $A^3 - 6A^2 + 9A = 4I$, so $A(A^2 - 6A + 9I) = 4I$ and $A^{-1} = \\frac14(A^2 - 6A + 9I)$.\n\n**Step 2.** $A^2 = \\begin{pmatrix} 6 & -5 & 5 \\\\ -5 & 6 & -5 \\\\ 5 & -5 & 6 \\end{pmatrix}$.\n\n**Step 3.** $A^2 - 6A + 9I = \\begin{pmatrix} 6 - 12 + 9 & -5 + 6 & 5 - 6 \\\\ -5 + 6 & 6 - 12 + 9 & -5 + 6 \\\\ 5 - 6 & -5 + 6 & 6 - 12 + 9 \\end{pmatrix} = \\begin{pmatrix} 3 & 1 & -1 \\\\ 1 & 3 & 1 \\\\ -1 & 1 & 3 \\end{pmatrix}$.\n\nSo $A^{-1} = \\frac14\\begin{pmatrix} 3 & 1 & -1 \\\\ 1 & 3 & 1 \\\\ -1 & 1 & 3 \\end{pmatrix}$. That bracket is exactly $\\operatorname{adj}A$, and $|A| = 4$, so the two methods agree.",
    },
    {
      type: "quiz",
      id: "mx3-4-q1",
      variant: "concept",
      question:
        "$A$ and $B$ are invertible $n\\times n$ matrices. Which is always equal to $(AB)^{-1}$?",
      options: [
        {
          text: "$B^{-1}A^{-1}$",
          correct: true,
          feedback: "$AB$ means \"$B$ first, then $A$\"; undo the last step first. Check: $(AB)(B^{-1}A^{-1}) = I$.",
        },
        {
          text: "$A^{-1}B^{-1}$",
          feedback: "Try it: $(AB)(A^{-1}B^{-1}) = ABA^{-1}B^{-1}$, and nothing cancels because $B$ and $A^{-1}$ are in the way. In Worked example 3 this order gave the wrong matrix.",
        },
        {
          text: "$\\dfrac{1}{AB}$",
          feedback: "Division by a matrix is not defined. The inverse is a matrix $X$ with $(AB)X = I$.",
        },
        {
          text: "$\\dfrac{1}{|A||B|}\\,AB$",
          feedback: "Dividing by the determinant scales the matrix but does not undo it. Its product with $AB$ is $\\frac{(AB)^2}{|AB|}$, not $I$.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx3-4-q2",
      variant: "practice",
      question:
        "For $A = \\begin{pmatrix} 1 & -1 & 2 \\\\ 0 & 2 & -3 \\\\ 3 & -2 & 4 \\end{pmatrix}$ with $|A| = -1$, what is the entry in row 2, column 1 of $A^{-1}$?",
      options: [
        {
          text: "$9$",
          correct: true,
          feedback: "$(A^{-1})_{21} = \\frac{C_{12}}{|A|} = \\frac{-9}{-1} = 9$.",
        },
        {
          text: "$-9$",
          feedback: "That is $C_{12}$ before dividing by $|A| = -1$.",
        },
        {
          text: "$0$",
          feedback: "That is $C_{21}$. The adjoint's (2,1) entry is $C_{12}$ because of the transpose.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx3-4-q3",
      variant: "practice",
      question:
        "A square matrix satisfies $A^2 - 5A + 7I = O$. Which expression is $A^{-1}$?",
      options: [
        {
          text: "$\\frac17(5I - A)$",
          correct: true,
          feedback: "$A^2 - 5A = -7I$ gives $A(5I - A) = 7I$, so $A^{-1} = \\frac17(5I - A)$.",
        },
        {
          text: "$\\frac17(A - 5I)$",
          feedback: "Watch the sign: $A(A - 5I) = -7I$, so this is $-A^{-1}$.",
        },
        {
          text: "$\\frac{1}{7}(A - 5)$",
          feedback: "You cannot subtract a number from a matrix. The 5 must be $5I$, and the sign is also off.",
        },
        {
          text: "$7(5I - A)$",
          feedback: "You need to divide by 7, not multiply.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx3-4-q4",
      variant: "practice",
      question: "$A$ is $3\\times3$ with $|A| = -2$. Find $|A^{-1}|$ and $|(A^T)^{-1}|$.",
      options: [
        {
          text: "Both equal $-\\frac12$.",
          correct: true,
          feedback: "$|A^{-1}| = \\frac{1}{|A|} = -\\frac12$, and $|A^T| = |A|$, so the transpose changes nothing.",
        },
        {
          text: "$\\frac12$ and $-\\frac12$",
          feedback: "The reciprocal keeps the sign: $\\frac{1}{-2} = -\\frac12$. And transposing never changes a determinant.",
        },
        {
          text: "$-\\frac18$ and $-\\frac18$",
          feedback: "You mixed in the $k^n$ rule for $|kA|$. The inverse's determinant is simply the reciprocal.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx3-4-q5",
      variant: "concept",
      question: "Which of these is **not** true for invertible $A$?",
      options: [
        {
          text: "$(A + B)^{-1} = A^{-1} + B^{-1}$ for every invertible $B$",
          correct: true,
          feedback:
            "Correct, this one is false. Take $A = B = I$: $(2I)^{-1} = \\frac12 I$, but $I^{-1} + I^{-1} = 2I$. The inverse does not split over sums.",
        },
        {
          text: "$(A^T)^{-1} = (A^{-1})^T$",
          feedback: "This is true: $A^T(A^{-1})^T = (A^{-1}A)^T = I$.",
        },
        {
          text: "$(A^{-1})^{-1} = A$",
          feedback: "This is true: $A$ undoes $A^{-1}$, since $A^{-1}A = I$.",
        },
        {
          text: "$(3A)^{-1} = \\frac13 A^{-1}$",
          feedback: "This is true: $(3A)(\\frac13A^{-1}) = AA^{-1} = I$.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx3-4-q6",
      variant: "practice",
      question:
        "$N = \\begin{pmatrix} 0 & 1 & 2 \\\\ 0 & 0 & 3 \\\\ 0 & 0 & 0 \\end{pmatrix}$ satisfies $N^3 = O$. Find $(I - N)^{-1}$.",
      options: [
        {
          text: "$\\begin{pmatrix} 1 & 1 & 5 \\\\ 0 & 1 & 3 \\\\ 0 & 0 & 1 \\end{pmatrix}$",
          correct: true,
          feedback:
            "$N^2 = \\begin{pmatrix} 0 & 0 & 3 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{pmatrix}$, so $I + N + N^2$ has top-right entry $2 + 3 = 5$. It works because $(I - N)(I + N + N^2) = I - N^3 = I$.",
        },
        {
          text: "$\\begin{pmatrix} 1 & 1 & 2 \\\\ 0 & 1 & 3 \\\\ 0 & 0 & 1 \\end{pmatrix}$",
          feedback:
            "That is $I + N$, which drops the $N^2$ term. Check: $(I - N)(I + N) = I - N^2 \\ne I$, because $N^2 \\ne O$ here.",
        },
        {
          text: "$\\begin{pmatrix} 1 & -1 & -2 \\\\ 0 & 1 & -3 \\\\ 0 & 0 & 1 \\end{pmatrix}$",
          feedback: "That is $I - N$ itself. Negating the off-diagonal is the $2\\times2$ adjoint pattern, and it does not carry over here.",
        },
        {
          text: "$\\begin{pmatrix} 1 & -1 & 1 \\\\ 0 & 1 & -3 \\\\ 0 & 0 & 1 \\end{pmatrix}$",
          feedback: "That is $I - N + N^2$, the series for $(I + N)^{-1}$. Here the matrix is $I - N$, so every sign is $+$.",
        },
      ],
      hint: "Copy $\\frac{1}{1-x} = 1 + x + x^2 + \\cdots$, which stops because $N^3 = O$.",
    },
    {
      type: "quiz",
      id: "mx3-4-q7",
      variant: "practice",
      question: "$A$ and $B$ are $3\\times3$ with $|A| = 3$ and $|B| = -2$. Find $|2A^TB^{-1}|$.",
      options: [
        {
          text: "$-12$",
          correct: true,
          feedback: "$|2I| = 2^3 = 8$, $|A^T| = 3$, $|B^{-1}| = -\\frac12$, so the product is $8\\cdot3\\cdot(-\\frac12) = -12$.",
        },
        {
          text: "$-3$",
          feedback: "You took the scalar out as $2$ instead of $2^3$. Each of the three rows carries a factor of 2.",
        },
        {
          text: "$-\\frac{16}{3}$",
          feedback: "That is $8\\cdot\\frac13\\cdot(-2)$: you inverted $A$ instead of $B$. The transpose leaves $|A|$ alone; the inverse is on $B$.",
        },
        {
          text: "$12$",
          feedback: "The reciprocal of $-2$ is $-\\frac12$; the sign survives.",
        },
      ],
      hint: "Handle the scalar, the transpose and the inverse one at a time.",
    },
    {
      type: "quiz",
      id: "mx3-4-q8",
      variant: "practice",
      question:
        "A photo is first reflected in $y = x$ by $P = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}$, then stretched horizontally by $D = \\begin{pmatrix} 2 & 0 \\\\ 0 & 1 \\end{pmatrix}$. Which matrix undoes the whole edit?",
      options: [
        {
          text: "$\\begin{pmatrix} 0 & 1 \\\\ \\frac12 & 0 \\end{pmatrix}$",
          correct: true,
          feedback:
            "The edit is $DP = \\begin{pmatrix} 0 & 2 \\\\ 1 & 0 \\end{pmatrix}$ and its inverse is $P^{-1}D^{-1} = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}\\begin{pmatrix} \\frac12 & 0 \\\\ 0 & 1 \\end{pmatrix} = \\begin{pmatrix} 0 & 1 \\\\ \\frac12 & 0 \\end{pmatrix}$. Check: $\\begin{pmatrix} 0 & 2 \\\\ 1 & 0 \\end{pmatrix}\\begin{pmatrix} 0 & 1 \\\\ \\frac12 & 0 \\end{pmatrix} = I$. ✓",
        },
        {
          text: "$\\begin{pmatrix} 0 & \\frac12 \\\\ 1 & 0 \\end{pmatrix}$",
          feedback:
            "That is $D^{-1}P^{-1}$, the wrong order: it un-stretches before un-reflecting. Multiplying it by the edit gives $\\begin{pmatrix} 2 & 0 \\\\ 0 & \\frac12 \\end{pmatrix}$, not $I$.",
        },
        {
          text: "$\\begin{pmatrix} 0 & 2 \\\\ 1 & 0 \\end{pmatrix}$",
          feedback: "That is the edit $DP$ itself, not its undo.",
        },
      ],
      hint: "The stretch happened last, so undo it first: $(DP)^{-1} = P^{-1}D^{-1}$.",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "inverse-by-row-operations",
  title: "3.5 · Inverse by Row Operations",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "The adjoint needs nine $2\\times2$ determinants for a $3\\times3$ matrix, and sixteen $3\\times3$ ones for a $4\\times4$. There is a method that scales far better, and it reuses the row operations from Chapter 2: write $A$ next to $I$, reduce $A$ to $I$ with row operations, and whatever $I$ has turned into is $A^{-1}$. **The right-hand block ends up holding the inverse.**",
    },
    {
      type: "math",
      latex: "\\big[\\,A \\mid I\\,\\big] \\;\\xrightarrow{\\text{row operations}}\\; \\big[\\,I \\mid A^{-1}\\,\\big]",
    },
    {
      type: "text",
      content:
        "**Why does this work? Every row operation is a matrix.** Do a row operation to the identity and call the result an **elementary matrix** $E$. Multiplying any matrix by $E$ on the left performs that same row operation on it. For example, in $2\\times2$:\n\n$E = \\begin{pmatrix} 1 & 0 \\\\ -3 & 1 \\end{pmatrix}$ (that is $R_2 \\to R_2 - 3R_1$ applied to $I$) gives $E\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = \\begin{pmatrix} a & b \\\\ c - 3a & d - 3b \\end{pmatrix}$.\n\nThe new row 2 is the old row 2 minus 3 times row 1, exactly as advertised.",
    },
    {
      type: "table",
      headers: ["Row operation", "Elementary matrix ($2\\times2$ example)", "Its inverse"],
      rows: [
        ["Swap $R_1 \\leftrightarrow R_2$", "$\\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}$", "the same swap"],
        ["Scale $R_2 \\to kR_2$ ($k \\ne 0$)", "$\\begin{pmatrix} 1 & 0 \\\\ 0 & k \\end{pmatrix}$", "scale by $\\frac1k$"],
        ["Add $R_2 \\to R_2 + kR_1$", "$\\begin{pmatrix} 1 & 0 \\\\ k & 1 \\end{pmatrix}$", "$R_2 \\to R_2 - kR_1$"],
      ],
    },
    {
      type: "text",
      content:
        "Now suppose a sequence of operations $E_1, E_2, \\ldots, E_k$ turns $A$ into $I$:\n\n$E_k \\cdots E_2E_1\\,A = I.$\n\nThat says the product $E_k\\cdots E_1$ is a matrix that undoes $A$, so it **is** $A^{-1}$. Meanwhile the right-hand block started as $I$ and received the same operations, so it now holds $E_k\\cdots E_1\\,I = A^{-1}$. The right side is a *record* of everything you did, compressed into one matrix.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 — 2×2.** $A = \\begin{pmatrix} 2 & 1 \\\\ 5 & 3 \\end{pmatrix}$.\n\n$\\left[\\begin{array}{cc|cc} 2 & 1 & 1 & 0 \\\\ 5 & 3 & 0 & 1 \\end{array}\\right]$\n\n**Step 1.** $R_1 \\to \\frac12R_1$: row 1 becomes $\\left(1,\\ \\frac12 \\mid \\frac12,\\ 0\\right)$.\n**Step 2.** $R_2 \\to R_2 - 5R_1$: row 2 becomes $\\left(0,\\ \\frac12 \\mid -\\frac52,\\ 1\\right)$.\n**Step 3.** $R_2 \\to 2R_2$: row 2 becomes $\\left(0,\\ 1 \\mid -5,\\ 2\\right)$.\n**Step 4.** $R_1 \\to R_1 - \\frac12R_2$: row 1 becomes $\\left(1,\\ 0 \\mid 3,\\ -1\\right)$.\n\nSo $A^{-1} = \\begin{pmatrix} 3 & -1 \\\\ -5 & 2 \\end{pmatrix}$. The formula agrees: $\\det A = 1$, and swapping and negating gives the same matrix.",
    },
    {
      type: "text",
      content:
        "Do it yourself below. The goal is to turn the left block into $I$. A sensible order is: get a 1 in the top-left, clear the entry below it, get a 1 in the next diagonal spot, then clear upward.",
    },
    {
      type: "interactive",
      config: {
        component: "matrix-row-reducer",
        mode: "inverse",
        matrix: [
          [2, 1],
          [5, 3],
        ],
        target: "reduced",
        caption:
          "Reduce the left block to I. Try the four steps from the worked example, or find your own route; the right block always ends at the same A⁻¹.",
      },
    },
    {
      type: "text",
      content:
        "**Worked example 2 — 3×3.** $A = \\begin{pmatrix} 1 & 2 & 3 \\\\ 0 & 1 & 4 \\\\ 5 & 6 & 0 \\end{pmatrix}$.\n\n$\\left[\\begin{array}{ccc|ccc} 1 & 2 & 3 & 1 & 0 & 0 \\\\ 0 & 1 & 4 & 0 & 1 & 0 \\\\ 5 & 6 & 0 & 0 & 0 & 1 \\end{array}\\right]$\n\n**Going down (clear below the diagonal).**\n**Step 1.** $R_3 \\to R_3 - 5R_1$: $\\left(0,\\ -4,\\ -15 \\mid -5,\\ 0,\\ 1\\right)$.\n**Step 2.** $R_3 \\to R_3 + 4R_2$: $\\left(0,\\ 0,\\ 1 \\mid -5,\\ 4,\\ 1\\right)$. The pivots are all 1 already.\n\n**Going up (clear above the diagonal).**\n**Step 3.** $R_2 \\to R_2 - 4R_3$: $\\left(0,\\ 1,\\ 0 \\mid 20,\\ -15,\\ -4\\right)$.\n**Step 4.** $R_1 \\to R_1 - 3R_3$: $\\left(1,\\ 2,\\ 0 \\mid 16,\\ -12,\\ -3\\right)$.\n**Step 5.** $R_1 \\to R_1 - 2R_2$: $\\left(1,\\ 0,\\ 0 \\mid -24,\\ 18,\\ 5\\right)$.",
    },
    {
      type: "math",
      latex: "A^{-1} = \\begin{pmatrix} -24 & 18 & 5 \\\\ 20 & -15 & -4 \\\\ -5 & 4 & 1 \\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "**Check** one row and one column at least: row 1 of $A$, $(1, 2, 3)$, with column 1, $(-24, 20, -5)$, gives $-24 + 40 - 15 = 1$. Row 3, $(5, 6, 0)$, with column 1 gives $-120 + 120 = 0$. Here $\\det A = 1$, so the adjoint method would give the same matrix, but it would take nine minors. Reproduce the steps below.",
    },
    {
      type: "interactive",
      config: {
        component: "matrix-row-reducer",
        mode: "inverse",
        matrix: [
          [1, 2, 3],
          [0, 1, 4],
          [5, 6, 0],
        ],
        target: "reduced",
        caption: "Five operations are enough: two going down, three going up.",
      },
    },
    {
      type: "text",
      content:
        "**Worked example 3 — when the top-left entry is 0 (NCERT style).** $A = \\begin{pmatrix} 0 & 1 & 2 \\\\ 1 & 0 & 3 \\\\ 4 & -3 & 8 \\end{pmatrix}$.\n\n$\\left[\\begin{array}{ccc|ccc} 0 & 1 & 2 & 1 & 0 & 0 \\\\ 1 & 0 & 3 & 0 & 1 & 0 \\\\ 4 & -3 & 8 & 0 & 0 & 1 \\end{array}\\right]$\n\n**Step 1.** $R_1 \\leftrightarrow R_2$. *Why:* you cannot scale a 0 up to a 1, and a swap is the cheapest way to get a non-zero pivot. Row 1 is now $\\left(1,\\ 0,\\ 3 \\mid 0,\\ 1,\\ 0\\right)$ and row 2 is $\\left(0,\\ 1,\\ 2 \\mid 1,\\ 0,\\ 0\\right)$.\n**Step 2.** $R_3 \\to R_3 - 4R_1$: $\\left(0,\\ -3,\\ -4 \\mid 0,\\ -4,\\ 1\\right)$.\n**Step 3.** $R_3 \\to R_3 + 3R_2$: $\\left(0,\\ 0,\\ 2 \\mid 3,\\ -4,\\ 1\\right)$.\n**Step 4.** $R_3 \\to \\frac12R_3$: $\\left(0,\\ 0,\\ 1 \\mid \\frac32,\\ -2,\\ \\frac12\\right)$.\n**Step 5.** $R_2 \\to R_2 - 2R_3$: $\\left(0,\\ 1,\\ 0 \\mid -2,\\ 4,\\ -1\\right)$.\n**Step 6.** $R_1 \\to R_1 - 3R_3$: $\\left(1,\\ 0,\\ 0 \\mid -\\frac92,\\ 7,\\ -\\frac32\\right)$.",
    },
    {
      type: "math",
      latex:
        "A^{-1} = \\begin{pmatrix} -\\frac92 & 7 & -\\frac32 \\\\ -2 & 4 & -1 \\\\ \\frac32 & -2 & \\frac12 \\end{pmatrix} = \\frac12\\begin{pmatrix} -9 & 14 & -3 \\\\ -4 & 8 & -2 \\\\ 3 & -4 & 1 \\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "**Check.** Row 1 of $A$, $(0, 1, 2)$, with column 1 of $A^{-1}$, $(-\\frac92, -2, \\frac32)$: $0 - 2 + 3 = 1$. Row 3, $(4, -3, 8)$, with column 3, $(-\\frac32, -1, \\frac12)$: $-6 + 3 + 4 = 1$. Row 2, $(1, 0, 3)$, with column 2, $(7, 4, -2)$: $7 + 0 - 6 = 1$. ✓\n\n**Bonus — the determinant from the bookkeeping.** The swap multiplied the determinant by $-1$ and Step 4 multiplied it by $\\frac12$; the other steps left it alone. The process ended at $I$, whose determinant is 1, so $|A|\\cdot(-1)\\cdot\\frac12 = 1$ and $|A| = -2$. Expanding $|A|$ directly along row 1 gives $0 - 1(8 - 12) + 2(-3 - 0) = 4 - 6 = -2$, the same.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 — planning a diet (application).** A dietitian uses three foods. One serving of food $X$ gives 1 unit of protein, 0 of fibre and 1 of iron; food $Y$ gives $(2, 1, 2)$; food $Z$ gives $(1, 1, 2)$. If $\\mathbf{q}$ lists the servings, the nutrients are $\\mathbf{n} = M\\mathbf{q}$ with\n\n$M = \\begin{pmatrix} 1 & 2 & 1 \\\\ 0 & 1 & 1 \\\\ 1 & 2 & 2 \\end{pmatrix}$ (each column is one food).\n\nShe gets a new target $\\mathbf{n}$ for every patient. *Why invert once:* with $M^{-1}$ in hand, every target is answered by one multiplication, $\\mathbf{q} = M^{-1}\\mathbf{n}$.\n\n**Step 1.** $R_3 \\to R_3 - R_1$: $\\left(0,\\ 0,\\ 1 \\mid -1,\\ 0,\\ 1\\right)$. The third pivot is ready at once.\n**Step 2.** $R_2 \\to R_2 - R_3$: $\\left(0,\\ 1,\\ 0 \\mid 1,\\ 1,\\ -1\\right)$.\n**Step 3.** $R_1 \\to R_1 - R_3$: $\\left(1,\\ 2,\\ 0 \\mid 2,\\ 0,\\ -1\\right)$.\n**Step 4.** $R_1 \\to R_1 - 2R_2$: $\\left(1,\\ 0,\\ 0 \\mid 0,\\ -2,\\ 1\\right)$.\n\nSo $M^{-1} = \\begin{pmatrix} 0 & -2 & 1 \\\\ 1 & 1 & -1 \\\\ -1 & 0 & 1 \\end{pmatrix}$.\n\n**Step 5 — a patient needs 10 protein, 4 fibre, 13 iron.** $\\mathbf{q} = M^{-1}\\begin{pmatrix} 10 \\\\ 4 \\\\ 13 \\end{pmatrix} = \\begin{pmatrix} 0 - 8 + 13 \\\\ 10 + 4 - 13 \\\\ -10 + 0 + 13 \\end{pmatrix} = \\begin{pmatrix} 5 \\\\ 1 \\\\ 3 \\end{pmatrix}$: 5 servings of $X$, 1 of $Y$, 3 of $Z$.\n\n**Check.** Protein $5 + 2 + 3 = 10$, fibre $0 + 1 + 3 = 4$, iron $5 + 2 + 6 = 13$. ✓ The next patient, who needs $(12, 5, 15)$, costs one more multiplication: $\\mathbf{q} = (5, 2, 3)$.",
    },
    {
      type: "text",
      content:
        "**When it fails.** If $A$ is singular, row reduction tells you on its own: at some point a **row of zeros appears in the left block**. For $\\begin{pmatrix} 1 & 2 \\\\ 2 & 4 \\end{pmatrix}$, the step $R_2 \\to R_2 - 2R_1$ gives $\\left(0,\\ 0 \\mid -2,\\ 1\\right)$. No further row operation can create a pivot in that row, so the left block can never become $I$. Row operations multiply the determinant by non-zero factors, so a zero row on the left means $\\det A = 0$. Try it on a famous singular $3\\times3$:",
    },
    {
      type: "interactive",
      config: {
        component: "matrix-row-reducer",
        mode: "inverse",
        matrix: [
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
        ],
        caption:
          "Clear the first column, then clear below the second pivot. Watch for the zero row, which is the signal that no inverse exists.",
      },
    },
    {
      type: "text",
      content:
        "**Worked example 5 — where does it break? (JEE/CBSE style).** For which $k$ does $A = \\begin{pmatrix} 1 & 1 & 1 \\\\ 1 & 2 & 3 \\\\ 1 & 3 & k \\end{pmatrix}$ fail to have an inverse?\n\n**Step 1.** $R_2 \\to R_2 - R_1$: $(0,\\ 1,\\ 2)$. $R_3 \\to R_3 - R_1$: $(0,\\ 2,\\ k - 1)$. *Why only the left block:* the question is whether an inverse exists, and that is decided by the left block alone.\n**Step 2.** $R_3 \\to R_3 - 2R_2$: $(0,\\ 0,\\ k - 5)$.\n\n**Step 3 — read the verdict.** If $k = 5$, row 3 of the left block is all zeros, so $A$ is singular. If $k \\ne 5$, scale row 3 by $\\frac{1}{k-5}$ and carry on to $I$.\n\n**Cross-check with the determinant.** Expanding along row 1: $1(2k - 9) - 1(k - 3) + 1(3 - 2) = 2k - 9 - k + 3 + 1 = k - 5$. It vanishes exactly at $k = 5$. The two methods agree because the steps used (adding multiples of rows) do not change the determinant, so $|A|$ equals the product of the diagonal $1\\cdot1\\cdot(k-5)$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Rows only (or columns only), never both",
      content:
        "Row operations are left-multiplications: $E_k\\cdots E_1A = I$. Column operations are right-multiplications: $AF_1\\cdots F_m = I$, which also gives an inverse, applied to the stacked block $\\begin{bmatrix} A \\\\ I \\end{bmatrix}$. Mix them and you get $E\\,A\\,F = I$, so $A^{-1} = FE$. The right-hand block has recorded only $E$, not $FE$, so what it shows is wrong. Pick one kind of operation and stick to it for the whole inversion.",
    },
    {
      type: "quiz",
      id: "mx3-5-q1",
      variant: "concept",
      question:
        "Midway through reducing $[A \\mid I]$, a student uses one **column** operation on the left block because it clears an entry quickly, then finishes with row operations. The left block ends as $I$. Is the right block $A^{-1}$?",
      options: [
        {
          text: "Not in general. The column operation multiplied $A$ on the right, and the right block never recorded it.",
          correct: true,
          feedback:
            "With $E A F = I$ the true inverse is $FE$, but the right block holds only $E$. Stay with row operations throughout.",
        },
        {
          text: "Yes — row and column operations both preserve invertibility, so any mix works.",
          feedback:
            "Both preserve invertibility, but they act from opposite sides. The $[A \\mid I]$ bookkeeping only tracks left-multiplications.",
        },
        {
          text: "Yes, provided the column operation was also applied to the right block.",
          feedback:
            "Then the right block holds $EIF = EF$, but the inverse is $FE$. Matrix products do not commute, so these differ in general.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx3-5-q2",
      variant: "practice",
      question:
        "Which elementary matrix performs $R_1 \\to R_1 + 2R_2$ on a $2\\times2$ matrix (by multiplying on the left)?",
      options: [
        {
          text: "$\\begin{pmatrix} 1 & 2 \\\\ 0 & 1 \\end{pmatrix}$",
          correct: true,
          feedback: "Apply the operation to $I$: row 1 $(1, 0)$ plus 2 × row 2 $(0, 1)$ gives $(1, 2)$.",
        },
        {
          text: "$\\begin{pmatrix} 1 & 0 \\\\ 2 & 1 \\end{pmatrix}$",
          feedback: "That performs $R_2 \\to R_2 + 2R_1$, changing row 2 instead.",
        },
        {
          text: "$\\begin{pmatrix} 3 & 0 \\\\ 0 & 1 \\end{pmatrix}$",
          feedback: "That scales row 1 by 3; it does not bring in row 2.",
        },
      ],
      hint: "Do the operation to the identity matrix.",
    },
    {
      type: "quiz",
      id: "mx3-5-q3",
      variant: "practice",
      question:
        "Reducing $\\left[\\begin{array}{cc|cc} 1 & 2 & 1 & 0 \\\\ 3 & 7 & 0 & 1 \\end{array}\\right]$: after $R_2 \\to R_2 - 3R_1$, which single step finishes the job, and what is $A^{-1}$?",
      options: [
        {
          text: "$R_1 \\to R_1 - 2R_2$, giving $A^{-1} = \\begin{pmatrix} 7 & -2 \\\\ -3 & 1 \\end{pmatrix}$",
          correct: true,
          feedback:
            "After step 1 row 2 is $(0, 1 \\mid -3, 1)$. Then row 1 is $(1, 2 \\mid 1, 0) - 2(0, 1 \\mid -3, 1) = (1, 0 \\mid 7, -2)$. The formula agrees: $\\det = 1$.",
        },
        {
          text: "$R_1 \\to R_1 - 2R_2$, giving $A^{-1} = \\begin{pmatrix} 1 & -2 \\\\ -3 & 1 \\end{pmatrix}$",
          feedback: "The right block changes too: $1 - 2(-3) = 7$, not 1. Apply every operation across the whole row.",
        },
        {
          text: "$R_2 \\to \\frac17R_2$, giving $A^{-1} = \\begin{pmatrix} 1 & 0 \\\\ -\\frac37 & \\frac17 \\end{pmatrix}$",
          feedback: "After the first step the 7 has already become $7 - 6 = 1$, and the 2 above it still needs clearing.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx3-5-q4",
      variant: "practice",
      question:
        "While reducing $[A \\mid I]$ for a $3\\times3$ matrix, the left block reaches $\\begin{pmatrix} 1 & 2 & 3 \\\\ 0 & -3 & -6 \\\\ 0 & 0 & 0 \\end{pmatrix}$. What can you conclude?",
      options: [
        {
          text: "$A$ is singular; $A^{-1}$ does not exist.",
          correct: true,
          feedback: "A zero row in the left block means $\\det A = 0$, since row operations only multiply the determinant by non-zero factors.",
        },
        {
          text: "You made an arithmetic mistake; a correct reduction always reaches $I$.",
          feedback: "Only for invertible matrices. For $\\begin{pmatrix} 1&2&3\\\\4&5&6\\\\7&8&9 \\end{pmatrix}$ this zero row is exactly right.",
        },
        {
          text: "Swap the zero row upward and continue; it will reach $I$ eventually.",
          feedback: "Swapping moves the zero row around, but no row operation can make it non-zero using only the other rows.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx3-5-q5",
      variant: "practice",
      question: "What is the inverse of the elementary matrix $E = \\begin{pmatrix} 1 & 0 \\\\ -3 & 1 \\end{pmatrix}$?",
      options: [
        {
          text: "$\\begin{pmatrix} 1 & 0 \\\\ 3 & 1 \\end{pmatrix}$",
          correct: true,
          feedback: "$E$ does $R_2 \\to R_2 - 3R_1$; the undo is $R_2 \\to R_2 + 3R_1$.",
        },
        {
          text: "$\\begin{pmatrix} 1 & -3 \\\\ 0 & 1 \\end{pmatrix}$",
          feedback: "That is the transpose; it acts on row 1 instead of row 2.",
        },
        {
          text: "$\\begin{pmatrix} 1 & 0 \\\\ -\\frac13 & 1 \\end{pmatrix}$",
          feedback: "That is the reciprocal misconception again. Undo the operation instead.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx3-5-q6",
      variant: "practice",
      question:
        "Row-reducing $A = \\begin{pmatrix} 1 & 2 & 1 \\\\ 2 & 5 & 3 \\\\ 1 & 3 & k \\end{pmatrix}$, for which $k$ does a zero row appear in the left block?",
      options: [
        {
          text: "$k = 2$",
          correct: true,
          feedback:
            "$R_2 - 2R_1 = (0, 1, 1)$, $R_3 - R_1 = (0, 1, k - 1)$, then $R_3 - R_2 = (0, 0, k - 2)$. The determinant agrees: $|A| = k - 2$.",
        },
        {
          text: "$k = 1$",
          feedback: "After $R_3 \\to R_3 - R_1$ the last entry is $k - 1$, but the second entry is still 1. Clear it with $R_2$ first: the last entry becomes $k - 2$.",
        },
        {
          text: "$k = 3$",
          feedback: "With $k = 3$ the reduced third row is $(0, 0, 1)$, a perfectly good pivot. $|A| = 1$ there.",
        },
        {
          text: "No value of $k$; the first two rows are independent.",
          feedback: "Two independent rows are not enough. The third row can still be a combination of them, and it is when $k = 2$: row 3 $= $ row 2 $-$ row 1.",
        },
      ],
      hint: "Clear the first column, then use the new row 2 to clear below the second pivot.",
    },
    {
      type: "quiz",
      id: "mx3-5-q7",
      variant: "practice",
      question:
        "To invert $A = \\begin{pmatrix} 0 & 2 \\\\ 3 & 1 \\end{pmatrix}$ by row operations you start with $R_1 \\leftrightarrow R_2$. What is $A^{-1}$?",
      options: [
        {
          text: "$\\begin{pmatrix} -\\frac16 & \\frac13 \\\\ \\frac12 & 0 \\end{pmatrix}$",
          correct: true,
          feedback:
            "After the swap: $(3, 1 \\mid 0, 1)$ and $(0, 2 \\mid 1, 0)$. Scale: $R_2 \\to \\frac12R_2$ gives $(0, 1 \\mid \\frac12, 0)$; $R_1 \\to R_1 - R_2$ gives $(3, 0 \\mid -\\frac12, 1)$; $R_1 \\to \\frac13R_1$ gives $(1, 0 \\mid -\\frac16, \\frac13)$. Formula check: $\\det A = -6$.",
        },
        {
          text: "$\\begin{pmatrix} \\frac16 & -\\frac13 \\\\ -\\frac12 & 0 \\end{pmatrix}$",
          feedback: "That is $-A^{-1}$, what you get by dividing by $+6$ instead of $\\det A = -6$. Multiply by $A$: the result is $-I$.",
        },
        {
          text: "It does not exist, because the top-left entry is 0.",
          feedback: "A zero in the pivot position only means you must swap. $\\det A = 0 - 6 = -6 \\ne 0$, so the inverse exists.",
        },
      ],
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "matrices-chapter-3-mastery",
  title: "3.6 · Chapter 3 Mastery",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "When does an inverse exist, how do you build it, and how do the rules combine? Each question below tests one of those three.",
    },
    {
      type: "callout",
      variant: "info",
      title: "The chapter in five lines",
      content:
        "1. $A^{-1}$ undoes $A$: $AA^{-1} = A^{-1}A = I$. It is unique, and it exists exactly when $\\det A \\ne 0$ (nothing squashed).\n2. $2\\times2$: swap the diagonal, negate the off-diagonal, divide by $ad - bc$.\n3. $A\\,(\\operatorname{adj}A) = |A|\\,I$ with $\\operatorname{adj}A$ = **transpose** of the cofactor matrix, so $A^{-1} = \\frac{1}{|A|}\\operatorname{adj}A$ and $|\\operatorname{adj}A| = |A|^{n-1}$.\n4. $(AB)^{-1} = B^{-1}A^{-1}$, $(A^T)^{-1} = (A^{-1})^T$, $|A^{-1}| = \\frac{1}{|A|}$; a polynomial equation in $A$ can hand you $A^{-1}$.\n5. Row-reduce $[A \\mid I]$ to $[I \\mid A^{-1}]$ with row operations only; a zero row on the left means singular.",
    },
    {
      type: "quiz",
      id: "mx3-6-q1",
      variant: "mastery",
      question: "For which values of $k$ does $\\begin{pmatrix} k & 2 \\\\ 8 & k \\end{pmatrix}$ have **no** inverse?",
      options: [
        {
          text: "$k = 4$ or $k = -4$",
          correct: true,
          feedback: "$\\det = k^2 - 16 = 0$ gives $k = \\pm4$. For those, the columns are parallel and the plane collapses.",
        },
        {
          text: "$k = 4$ only",
          feedback: "$k = -4$ also gives $k^2 = 16$. Don't drop the negative root.",
        },
        {
          text: "$k = 0$",
          feedback: "At $k = 0$, $\\det = -16 \\ne 0$, so the matrix is invertible. Zero entries don't matter.",
        },
        {
          text: "$k = \\pm 16$",
          feedback: "Solve $k^2 = 16$, not $k = 16$.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx3-6-q2",
      variant: "mastery",
      question: "Find $\\begin{pmatrix} 3 & 1 \\\\ 5 & 2 \\end{pmatrix}^{-1}$.",
      options: [
        {
          text: "$\\begin{pmatrix} 2 & -1 \\\\ -5 & 3 \\end{pmatrix}$",
          correct: true,
          feedback: "$\\det = 6 - 5 = 1$. Check: $3\\cdot2 + 1\\cdot(-5) = 1$ and $3\\cdot(-1) + 1\\cdot3 = 0$.",
        },
        {
          text: "$\\begin{pmatrix} -2 & -1 \\\\ -5 & -3 \\end{pmatrix}$",
          feedback: "Only the off-diagonal entries are negated.",
        },
        {
          text: "$\\begin{pmatrix} 2 & -5 \\\\ -1 & 3 \\end{pmatrix}$",
          feedback: "That is the cofactor matrix, which is the transpose of the right answer.",
        },
        {
          text: "$\\begin{pmatrix} \\frac13 & 1 \\\\ \\frac15 & \\frac12 \\end{pmatrix}$",
          feedback: "Entrywise reciprocals do not undo matrix multiplication.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx3-6-q3",
      variant: "mastery",
      question:
        "For $A = \\begin{pmatrix} 2 & 0 & 1 \\\\ 1 & 3 & 0 \\\\ 0 & 1 & 4 \\end{pmatrix}$, what is the entry in row 1, column 3 of $\\operatorname{adj}A$?",
      options: [
        {
          text: "$-3$",
          correct: true,
          feedback: "$(\\operatorname{adj}A)_{13} = C_{31} = +\\begin{vmatrix} 0 & 1 \\\\ 3 & 0 \\end{vmatrix} = 0 - 3 = -3$.",
        },
        {
          text: "$1$",
          feedback: "That is $C_{13} = \\begin{vmatrix} 1 & 3 \\\\ 0 & 1 \\end{vmatrix} = 1$. The transpose means you need $C_{31}$.",
        },
        {
          text: "$3$",
          feedback: "The minor is $0\\cdot0 - 1\\cdot3 = -3$ and the sign for position (3,1) is $+$.",
        },
      ],
      hint: "$(\\operatorname{adj}A)_{ij} = C_{ji}$: delete row 3 and column 1.",
    },
    {
      type: "quiz",
      id: "mx3-6-q4",
      variant: "mastery",
      question: "$A$ is a $3\\times3$ matrix with $|A| = 2$. Find $|\\operatorname{adj}(2A)|$.",
      options: [
        {
          text: "$256$",
          correct: true,
          feedback: "$|2A| = 2^3\\cdot2 = 16$, and $|\\operatorname{adj}(2A)| = |2A|^{2} = 256$. Or: $\\operatorname{adj}(2A) = 4\\operatorname{adj}A$, so $4^3\\cdot|A|^2 = 64 \\cdot 4 = 256$.",
        },
        {
          text: "$16$",
          feedback: "That is $|2A|$. The adjoint's determinant is $|2A|^{n-1}$.",
        },
        {
          text: "$64$",
          feedback: "$64 = 4^3$ is only the factor from $\\operatorname{adj}(2A) = 4\\operatorname{adj}A$. It still multiplies $|\\operatorname{adj}A| = |A|^2 = 4$.",
        },
        {
          text: "$32$",
          feedback: "Track both steps: $|kA| = k^n|A|$ first, then $|\\operatorname{adj}M| = |M|^{n-1}$.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx3-6-q5",
      variant: "mastery",
      question:
        "$A^{-1} = \\begin{pmatrix} 1 & 2 \\\\ 0 & 1 \\end{pmatrix}$ and $B^{-1} = \\begin{pmatrix} 1 & 0 \\\\ 3 & 1 \\end{pmatrix}$. Find $(AB)^{-1}$.",
      options: [
        {
          text: "$\\begin{pmatrix} 1 & 2 \\\\ 3 & 7 \\end{pmatrix}$",
          correct: true,
          feedback: "$(AB)^{-1} = B^{-1}A^{-1} = \\begin{pmatrix} 1 & 0 \\\\ 3 & 1 \\end{pmatrix}\\begin{pmatrix} 1 & 2 \\\\ 0 & 1 \\end{pmatrix} = \\begin{pmatrix} 1 & 2 \\\\ 3 & 7 \\end{pmatrix}$.",
        },
        {
          text: "$\\begin{pmatrix} 7 & 2 \\\\ 3 & 1 \\end{pmatrix}$",
          feedback: "That is $A^{-1}B^{-1}$, the wrong order. Socks and shoes: undo the last step first.",
        },
        {
          text: "$\\begin{pmatrix} 2 & 2 \\\\ 3 & 2 \\end{pmatrix}$",
          feedback: "That is $A^{-1} + B^{-1}$. Inverses of products come from products of inverses.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx3-6-q6",
      variant: "mastery",
      question: "A square matrix satisfies $A^2 - 3A + 2I = O$. Then $A^{-1} =$",
      options: [
        {
          text: "$\\frac12(3I - A)$",
          correct: true,
          feedback: "$A^2 - 3A = -2I$, so $A(3I - A) = 2I$ and $A^{-1} = \\frac12(3I - A)$.",
        },
        {
          text: "$\\frac12(A - 3I)$",
          feedback: "Sign slip: $A(A - 3I) = -2I$, so this is $-A^{-1}$.",
        },
        {
          text: "$3I - A$",
          feedback: "That product with $A$ is $2I$, not $I$. Divide by 2.",
        },
        {
          text: "It need not exist.",
          feedback: "The constant term $2I$ is non-zero, which is exactly what guarantees the inverse.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx3-6-q7",
      variant: "mastery",
      question:
        "Reducing $\\left[\\begin{array}{cc|cc} 1 & 2 & \\frac12 & 0 \\\\ 3 & 7 & 0 & 1 \\end{array}\\right]$ (row 1 was just scaled by $\\frac12$), which operation is next, and what does row 2 become?",
      options: [
        {
          text: "$R_2 \\to R_2 - 3R_1$, giving $\\left(0,\\ 1 \\mid -\\frac32,\\ 1\\right)$",
          correct: true,
          feedback: "It clears the 3 below the pivot, and the right block changes too: $0 - 3\\cdot\\frac12 = -\\frac32$.",
        },
        {
          text: "$R_2 \\to R_2 - 3R_1$, giving $\\left(0,\\ 1 \\mid 0,\\ 1\\right)$",
          feedback: "The operation acts on the whole row, including the right block.",
        },
        {
          text: "$C_1 \\to C_1 - \\frac32 C_2$ (a column operation)",
          feedback: "Mixing in column operations ruins the $[A \\mid I]$ bookkeeping. Use row operations only.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx3-6-q8",
      variant: "mastery",
      question: "$A$ is $3\\times3$ and invertible with $|A| = 4$. Which is correct?",
      options: [
        {
          text: "$|A^{-1}| = \\frac14$ and $|\\operatorname{adj}A| = 16$",
          correct: true,
          feedback: "$|A^{-1}| = \\frac{1}{|A|}$ and $|\\operatorname{adj}A| = |A|^{n-1} = 4^2$.",
        },
        {
          text: "$|A^{-1}| = -4$ and $|\\operatorname{adj}A| = 16$",
          feedback: "The inverse's determinant is the reciprocal, not the negative.",
        },
        {
          text: "$|A^{-1}| = \\frac14$ and $|\\operatorname{adj}A| = 64$",
          feedback: "$64 = 4^3$ would be $|A|^n$. The exponent is $n - 1 = 2$.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx3-6-q9",
      variant: "mastery",
      question: "$A$ is square and $AX = O$ has a solution $X \\ne O$. What follows?",
      options: [
        {
          text: "$A$ is singular.",
          correct: true,
          feedback: "If $A^{-1}$ existed, $X = A^{-1}O = O$. A non-zero input sent to zero means some direction was squashed.",
        },
        {
          text: "$A = O$.",
          feedback: "$\\begin{pmatrix} 1 & 1 \\\\ 1 & 1 \\end{pmatrix}$ sends $(1, -1)$ to $(0, 0)$ without being the zero matrix.",
        },
        {
          text: "Nothing — invertible matrices can send non-zero vectors to zero too.",
          feedback: "An invertible matrix can be undone, and undoing would send $O$ back to both $O$ and $X$. Impossible.",
        },
      ],
    },
    {
      type: "quiz",
      id: "mx3-6-q10",
      variant: "mastery",
      question: "$A$ is a $3\\times3$ matrix with $|\\operatorname{adj}A| = 49$. What is $|A|$?",
      options: [
        {
          text: "$\\pm 7$",
          correct: true,
          feedback: "$|\\operatorname{adj}A| = |A|^{n-1} = |A|^2 = 49$, so $|A| = 7$ or $|A| = -7$. Both are possible: $A$ and $-A$ have the same adjoint determinant, since $|{-A}| = -|A|$ for $3\\times3$.",
        },
        {
          text: "$7$ only",
          feedback: "$|A|^2 = 49$ has two roots. Squaring hides the sign, so $|A| = -7$ fits too.",
        },
        {
          text: "$49$",
          feedback: "That confuses $|\\operatorname{adj}A|$ with $|A|$. For $3\\times3$, $|\\operatorname{adj}A| = |A|^2$, so take the square root.",
        },
        {
          text: "$\\sqrt[3]{49}$",
          feedback: "The exponent is $n - 1 = 2$, not $n = 3$.",
        },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "The inverse was built to undo; Chapter 4 puts it to work. A system of equations is $AX = B$: \"which input does $A$ send to $B$?\" When $A^{-1}$ exists the answer is $X = A^{-1}B$, and when it doesn't, the determinant and row reduction tell you whether there are no solutions or infinitely many.",
    },
  ]),
};

export const matricesChapter3Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lessonMastery,
];
