import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Matrices Chapter 4 — Solving Systems of Linear Equations.
 * AX = B asks "which input does A send to B?". Two pictures of a system,
 * the inverse method, Cramer's rule as a ratio of areas, consistency when
 * D = 0 (and homogeneous systems), Gaussian elimination, and JEE-style
 * parameter questions with word-problem applications.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "two-pictures-of-a-system",
  title: "4.1 · Two Pictures of a System",
  position: 1,
  blocks: blocks([
    {
      type: "video",
      src: "/videos/mx-4-solving-systems-of-linear-equations.mp4",
      poster: "/videos/mx-4-solving-systems-of-linear-equations.jpg",
      title: "Chapter 4 overview video",
      caption:
        "A narrated walk through the whole chapter. Watch it now for the big picture, or come back to it as a recap.",
    },
    {
      type: "text",
      content:
        "You have been solving pairs of equations like $x + y = 4$, $x - y = 0$ since Class 9. You add, subtract, substitute, and out comes $x = 2$, $y = 2$. This chapter asks a sharper question: **before** doing any algebra, can you tell whether there will be one answer, no answer, or infinitely many? And can you see *why*?",
    },
    {
      type: "text",
      content:
        "There are two completely different ways to picture the same system. Each one explains something the other hides, so you need both.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The row picture",
      content:
        "Read the system **one equation (one row) at a time**. Each equation $a x + b y = c$ in two unknowns is a straight line in the plane. A solution is a point lying on *every* line at once, so solving the system means finding where the lines meet.",
    },
    {
      type: "interactive",
      config: {
        component: "linear-system-lines",
        line1: { a: 1, b: 1, c: 4 },
        line2: { a: 1, b: -1, c: 0 },
        presets: [
          { label: "Crossing", line1: { a: 1, b: 1, c: 4 }, line2: { a: 1, b: -1, c: 0 } },
          { label: "Parallel", line1: { a: 1, b: 2, c: 3 }, line2: { a: 2, b: 4, c: 1 } },
          { label: "Coincident", line1: { a: 1, b: 2, c: 3 }, line2: { a: 2, b: 4, c: 6 } },
        ],
        caption:
          "Two lines, two equations. Slide the coefficients and watch the status badge. Can you make the lines miss each other entirely? Can you make them lie on top of each other?",
      },
    },
    {
      type: "text",
      content:
        "Two straight lines in a plane can only do three things:\n\n**Cross once**: exactly one common point, so the system has a **unique solution**.\n\n**Run parallel**: same direction, different positions, so they never meet and there is **no solution**. The system is called **inconsistent**.\n\n**Coincide**: they are the same line written twice, so every point on it works and there are **infinitely many solutions**.\n\nThere is no fourth option. Two distinct straight lines cannot meet in exactly two points, so a linear system can never have exactly two solutions.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Two equations, two unknowns does not guarantee one answer",
      content:
        "Counting equations and unknowns tells you what *usually* happens, not what must happen. $x + 2y = 3$ and $2x + 4y = 1$ are two equations in two unknowns with **no** solution: double the first and you get $2x + 4y = 6$, which cannot also equal 1.",
    },
    {
      type: "text",
      content:
        "You can spot the three cases from the coefficients alone. The lines are parallel exactly when their slopes match, which happens when the $x$- and $y$-coefficients are in the same ratio. Whether they are the same line depends on the right-hand sides too.",
    },
    {
      type: "table",
      headers: ["Condition on $a_1x + b_1y = c_1$, $a_2x + b_2y = c_2$", "Lines", "Solutions"],
      rows: [
        ["$\\dfrac{a_1}{a_2} \\ne \\dfrac{b_1}{b_2}$", "Cross once", "Unique"],
        ["$\\dfrac{a_1}{a_2} = \\dfrac{b_1}{b_2} \\ne \\dfrac{c_1}{c_2}$", "Parallel, distinct", "None (inconsistent)"],
        ["$\\dfrac{a_1}{a_2} = \\dfrac{b_1}{b_2} = \\dfrac{c_1}{c_2}$", "Coincident", "Infinitely many"],
      ],
    },
    {
      type: "callout",
      variant: "warning",
      title: "Ratios need non-zero denominators",
      content:
        "The ratio test breaks when a coefficient in the second equation is 0. For $x = 1$ and $x = 2$, $\\frac{b_1}{b_2} = \\frac{0}{0}$; for $x + y = 1$ and $y = 3$, $\\frac{a_1}{a_2} = \\frac{1}{0}$. The safe form is cross-multiplied: the lines are parallel or identical exactly when $a_1b_2 - a_2b_1 = 0$, which is the determinant $D$ of lesson 4.3. So $x = 1$, $x = 2$ has $D = 1\\cdot0 - 1\\cdot0 = 0$ (parallel vertical lines), while $x + y = 1$, $y = 3$ has $D = 1\\cdot1 - 0\\cdot1 = 1 \\ne 0$ (they cross at $(-2, 3)$).",
    },
    {
      type: "text",
      content:
        "**Worked example 1: classify before you solve.**\n\n(a) $3x - y = 5$, $x + y = 3$. Ratios $\\frac{3}{1}$ and $\\frac{-1}{1}$ differ, so the lines cross: unique solution. Adding gives $4x = 8$, so $x = 2$, $y = 1$.\n\n(b) $x + 2y = 3$, $2x + 4y = 1$. $\\frac{1}{2} = \\frac{2}{4}$ but $\\frac{3}{1} \\ne \\frac{1}{2}$: parallel, no solution.\n\n(c) $x + 2y = 3$, $2x + 4y = 6$. All three ratios equal $\\frac{1}{2}$: the second equation is the first doubled, so there are infinitely many solutions, e.g. $(3, 0)$, $(1, 1)$, $(-1, 2)$, and in general $(3 - 2t,\\ t)$.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (word problem): two cab plans.** Cab company A charges ₹200 flat plus ₹10 per km. Company B charges ₹50 flat plus ₹15 per km. For what trip length do they cost the same, and what is that cost?\n\n**Step 1. Name the unknowns.** Let the trip be $x$ km and the fare ₹$y$.\n\n**Step 2. One line per plan.** A: $y = 200 + 10x$, i.e. $10x - y = -200$. B: $y = 50 + 15x$, i.e. $15x - y = -50$.\n\n*Why this step:* writing both in the form $ax + by = c$ lets you run the ratio test before doing any algebra.\n\n**Step 3. Classify.** $\\frac{10}{15} \\ne \\frac{-1}{-1}$, so the lines cross once: exactly one break-even point exists.\n\n**Step 4. Solve.** Set the fares equal: $200 + 10x = 50 + 15x$, so $5x = 150$, $x = 30$ km, and $y = 200 + 300 = 500$.\n\n**Step 5. Check with plan B.** $50 + 15(30) = 500$ ✓. Below 30 km, B is cheaper (smaller flat fee); beyond 30 km, A is cheaper (smaller per-km rate).\n\n**Twist.** If B changed to ₹50 + ₹10 per km, both lines would have slope 10 but different intercepts: parallel, no solution. In real terms, B would be ₹150 cheaper on *every* trip, so the fares are never equal.",
    },
    {
      type: "math",
      latex: "\\text{A: } 10x - y = -200,\\qquad \\text{B: } 15x - y = -50 \\;\\Rightarrow\\; (x, y) = (30,\\ 500)",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (CBSE board style).** For which value of $k$ does the system $kx + 3y = k - 3$, $12x + ky = k$ have **no** solution?\n\n**Step 1. Force parallel lines.** No solution needs $\\frac{a_1}{a_2} = \\frac{b_1}{b_2}$: $\\frac{k}{12} = \\frac{3}{k}$, so $k^2 = 36$ and $k = 6$ or $k = -6$.\n\n*Why this step:* if the slopes differ, the lines must cross, so only these two values are even candidates. (Equivalently, $D = k^2 - 36 = 0$.)\n\n**Step 2. Test each candidate against the constants.**\n\n$k = 6$: the equations are $6x + 3y = 3$ and $12x + 6y = 6$. The second is exactly twice the first: the **same** line, infinitely many solutions. Reject.\n\n$k = -6$: the equations are $-6x + 3y = -9$ and $12x - 6y = -6$. Multiply the first by $-2$: $12x - 6y = 18$, which cannot also equal $-6$. Parallel and distinct.\n\n**Answer:** $k = -6$.\n\n*Why step 2 matters:* a candidate from step 1 only says the lines are parallel **or** identical. Examiners pick numbers so that one candidate is a trap, exactly as here.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The column picture",
      content:
        "Now read the system **one unknown (one column) at a time**. Write $x + y = 4$, $x - y = 0$ as\n\n$x\\begin{pmatrix}1\\\\1\\end{pmatrix} + y\\begin{pmatrix}1\\\\-1\\end{pmatrix} = \\begin{pmatrix}4\\\\0\\end{pmatrix}.$\n\nThe question becomes: **how much of each column do you need to reach the target $B$?** This is exactly $AX = B$ from Chapter 0: $A$ sends the input $X = (x, y)$ to the combination $x\\cdot(\\text{column } 1) + y\\cdot(\\text{column } 2)$.",
    },
    {
      type: "interactive",
      config: {
        component: "matrix-transform-grid",
        matrix: [
          [1, 1],
          [1, -1],
        ],
        editable: false,
        showDeterminant: false,
        showProbe: true,
        probe: [1, 1],
        range: 5,
        caption:
          "A has columns (1, 1) and (1, −1). Drag the dashed input v until its image Av lands on B = (4, 0). The readout shows Av as x·col₁ + y·col₂. Which input gets there?",
      },
    },
    {
      type: "text",
      content:
        "You should find $v = (2, 2)$: two of the first column plus two of the second gives $(2 + 2,\\ 2 - 2) = (4, 0)$. That is the same answer as the row picture, but the question has changed. It is no longer \"where do two lines meet?\" but \"**which input does $A$ send to $B$?**\" That question drives the rest of the chapter.",
    },
    {
      type: "text",
      content:
        "The column picture explains the three cases in a new way.\n\n**Columns point in different directions** (the grid is not squashed, $\\det A \\ne 0$): every target $B$ in the plane is reached by exactly one combination. Unique solution.\n\n**Columns parallel** ($\\det A = 0$): every combination lies on one line through the origin. If $B$ is off that line, you cannot reach it (no solution). If $B$ is on it, you can reach it in infinitely many ways, because you can trade some of one column for some of the other.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Three unknowns: planes",
      content:
        "With three unknowns, each equation $ax + by + cz = d$ is a **plane** in space. Three planes can meet in a single point (unique), along a common line (infinitely many), or share no common point at all: two parallel planes, three parallel planes, or three planes that meet in pairs along three parallel lines, like the sides of a triangular prism. In the column picture, three columns in space either point in genuinely different directions (every $B$ reachable, uniquely) or all lie in one plane (only targets in that plane are reachable).",
    },
    {
      type: "table",
      headers: ["Picture", "One solution", "No solution", "Infinitely many"],
      rows: [
        ["Row (2 unknowns)", "Lines cross once", "Lines parallel", "Lines coincide"],
        ["Row (3 unknowns)", "Planes meet at a point", "No point on all three planes", "Planes share a line (or a plane)"],
        ["Column", "Columns independent: every $B$ reached once", "$B$ outside the span of the columns", "$B$ inside the span, columns dependent"],
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 4: solve by the column picture.** Find $x, y$ with $x\\begin{pmatrix}1\\\\2\\end{pmatrix} + y\\begin{pmatrix}3\\\\1\\end{pmatrix} = \\begin{pmatrix}5\\\\5\\end{pmatrix}$.\n\n**Step 1.** Read off the rows: $x + 3y = 5$ and $2x + y = 5$.\n\n**Step 2.** From the second, $y = 5 - 2x$. Substitute: $x + 15 - 6x = 5$, so $x = 2$, $y = 1$.\n\n**Step 3. Check in the column picture.** $2(1, 2) + 1(3, 1) = (2 + 3,\\ 4 + 1) = (5, 5)$. ✓",
    },
    {
      type: "quiz",
      id: "mx4-1-q1",
      variant: "concept",
      question: "True or false: every system of two linear equations in two unknowns has exactly one solution.",
      options: [
        {
          text: "False. The two lines can be parallel (no solution) or coincide (infinitely many).",
          correct: true,
          feedback: "Right. Counting equations only tells you what usually happens. The geometry decides.",
        },
        { text: "True, because there are as many equations as unknowns.", feedback: "Try $x + y = 1$, $x + y = 2$. Two equations, two unknowns, no solution: the lines are parallel." },
        { text: "False, because some systems have exactly two solutions.", feedback: "Two distinct straight lines cannot meet in exactly two points. The only options are one, none or infinitely many." },
      ],
    },
    {
      type: "quiz",
      id: "mx4-1-q2",
      variant: "practice",
      question: "How many solutions does $2x - 3y = 5$, $4x - 6y = 10$ have?",
      options: [
        { text: "Infinitely many", correct: true, feedback: "The second equation is exactly twice the first, so it is the same line: all three ratios equal $\\frac{1}{2}$." },
        { text: "Exactly one", feedback: "Check the ratios: $\\frac{2}{4} = \\frac{-3}{-6}$, so the lines are parallel or identical. They cannot cross once." },
        { text: "None", feedback: "The constants are in the same ratio too ($\\frac{5}{10} = \\frac{1}{2}$), so the lines coincide rather than stay apart." },
      ],
      hint: "Compare $\\frac{a_1}{a_2}$, $\\frac{b_1}{b_2}$ and $\\frac{c_1}{c_2}$.",
    },
    {
      type: "quiz",
      id: "mx4-1-q3",
      variant: "practice",
      question: "Which system has **no** solution?",
      options: [
        { text: "$x - y = 2$, $3x - 3y = 5$", correct: true, feedback: "$\\frac{1}{3} = \\frac{-1}{-3}$ but $\\frac{2}{5} \\ne \\frac{1}{3}$: parallel, distinct lines." },
        { text: "$x - y = 2$, $3x - 3y = 6$", feedback: "All three ratios are $\\frac{1}{3}$, so this is the same line twice: infinitely many solutions." },
        { text: "$x - y = 2$, $x + y = 6$", feedback: "Different slopes, so the lines cross once at $(4, 2)$." },
      ],
    },
    {
      type: "quiz",
      id: "mx4-1-q4",
      variant: "concept",
      question:
        "In the column picture of $x\\begin{pmatrix}1\\\\2\\end{pmatrix} + y\\begin{pmatrix}2\\\\4\\end{pmatrix} = B$, which statement is correct?",
      options: [
        {
          text: "Only targets $B$ on the line through $(1, 2)$ can be reached, and each one in infinitely many ways.",
          correct: true,
          feedback: "The columns are parallel ($(2, 4) = 2(1, 2)$), so every combination lies on one line. On it you can trade one column for the other endlessly.",
        },
        { text: "Every target $B$ can be reached, because there are two columns.", feedback: "Two columns only fill the plane when they point in different directions. These two are parallel." },
        { text: "No target can be reached, because the columns are parallel.", feedback: "$B = (3, 6)$ is reached by $x = 1, y = 1$ (and many others). Targets *on* the line are fine." },
      ],
    },
    {
      type: "quiz",
      id: "mx4-1-q5",
      variant: "practice",
      question: "For which value of $k$ does $kx + 2y = 5$, $3x + y = 1$ have **no** solution?",
      options: [
        { text: "$k = 6$", correct: true, feedback: "$\\frac{k}{3} = \\frac{2}{1}$ gives $k = 6$. Then $6x + 2y = 5$ and (doubling the second) $6x + 2y = 2$: parallel and distinct." },
        { text: "$k = \\frac{3}{2}$", feedback: "That comes from $\\frac{k}{3} = \\frac{1}{2}$, with the $y$-ratio flipped. The $y$-coefficients give $\\frac{2}{1} = 2$, so $\\frac{k}{3} = 2$." },
        { text: "No value of $k$ works", feedback: "At $k = 6$ the lines are parallel, and the constants $5$ and $2$ (after doubling) are out of step, so there is no solution." },
      ],
      hint: "Make $\\frac{a_1}{a_2} = \\frac{b_1}{b_2}$, then check that the constants break the ratio.",
    },
    {
      type: "quiz",
      id: "mx4-1-q6",
      variant: "practice",
      question:
        "Gym A charges ₹1000 to join plus ₹500 per month. Gym B charges ₹2500 to join plus ₹200 per month. After how many months have the two cost the same in total?",
      options: [
        { text: "5 months (₹3500 each)", correct: true, feedback: "$1000 + 500m = 2500 + 200m$ gives $300m = 1500$, $m = 5$. Check: $1000 + 2500 = 3500$ and $2500 + 1000 = 3500$ ✓." },
        { text: "3 months", feedback: "At 3 months A costs $1000 + 1500 = 2500$ but B costs $2500 + 600 = 3100$. Not equal yet." },
        { text: "Never: the plans are parallel lines", feedback: "The slopes (monthly rates) are 500 and 200, which differ, so the cost lines must cross exactly once." },
      ],
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "matrix-form-and-the-inverse-method",
  title: "4.2 · Matrix Form and the Inverse Method",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "If $A$ is a machine that sends inputs to outputs, then solving $AX = B$ means running the machine **backwards**: given the output $B$, recover the input $X$. Chapter 3 built exactly the tool for that, the inverse $A^{-1}$, the transformation that undoes $A$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Matrix form of a system",
      content:
        "The system $a_1x + b_1y + c_1z = d_1$, $a_2x + b_2y + c_2z = d_2$, $a_3x + b_3y + c_3z = d_3$ is $AX = B$ with\n\n$A = \\begin{pmatrix} a_1 & b_1 & c_1 \\\\ a_2 & b_2 & c_2 \\\\ a_3 & b_3 & c_3 \\end{pmatrix}$ (the **coefficient matrix**), $X = \\begin{pmatrix} x \\\\ y \\\\ z \\end{pmatrix}$, $B = \\begin{pmatrix} d_1 \\\\ d_2 \\\\ d_3 \\end{pmatrix}$.\n\nRow $i$ of $A$ holds the coefficients of equation $i$; column $j$ of $A$ holds every coefficient of unknown $j$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "A missing term is a zero coefficient",
      content:
        "In $x + y = 3$, $y + z = 5$, $x + z = 4$, each equation skips one unknown. Keep the columns lined up by writing the skipped unknown with coefficient 0: $1x + 1y + 0z = 3$, and so on. The coefficient matrix is $\\begin{pmatrix} 1 & 1 & 0 \\\\ 0 & 1 & 1 \\\\ 1 & 0 & 1 \\end{pmatrix}$, not a jagged table.",
    },
    {
      type: "text",
      content:
        "Now derive the method. Suppose $|A| \\ne 0$, so $A^{-1}$ exists. Multiply both sides of $AX = B$ on the **left** by $A^{-1}$:",
    },
    {
      type: "math",
      latex: "A^{-1}(AX) = A^{-1}B \\;\\Rightarrow\\; (A^{-1}A)X = A^{-1}B \\;\\Rightarrow\\; IX = A^{-1}B \\;\\Rightarrow\\; X = A^{-1}B",
    },
    {
      type: "text",
      content:
        "The solution is also **unique**: if $AX_1 = B$ and $AX_2 = B$, multiplying each by $A^{-1}$ gives $X_1 = A^{-1}B = X_2$. Geometrically, a transformation that does not squash the plane never sends two different inputs to the same output.",
    },
    {
      type: "interactive",
      config: {
        component: "matrix-transform-grid",
        mode: "inverse",
        matrix: [
          [2, 1],
          [1, 1],
        ],
        editable: false,
        showProbe: true,
        probe: [1, 1],
        caption:
          "A = [[2, 1], [1, 1]]. From t = 0 to 1 the plane moves by A, carrying v = (1, 1) to Av = (3, 2). From 1 to 2, A⁻¹ carries everything back. Solving 2x + y = 3, x + y = 2 is that second half: start at B = (3, 2) and undo.",
      },
    },
    {
      type: "text",
      content:
        "**Worked example 1 (2 × 2).** Solve $2x + y = 3$, $x + y = 2$.\n\n**Step 1.** $A = \\begin{pmatrix} 2 & 1 \\\\ 1 & 1 \\end{pmatrix}$, $B = \\begin{pmatrix} 3 \\\\ 2 \\end{pmatrix}$, $|A| = 2 - 1 = 1 \\ne 0$.\n\n**Step 2.** $A^{-1} = \\frac{1}{1}\\begin{pmatrix} 1 & -1 \\\\ -1 & 2 \\end{pmatrix}$ (swap the diagonal, negate the off-diagonal, divide by the determinant).\n\n**Step 3.** $X = A^{-1}B = \\begin{pmatrix} 3 - 2 \\\\ -3 + 4 \\end{pmatrix} = \\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix}$, so $x = 1$, $y = 1$. Check: $2 + 1 = 3$ ✓, $1 + 1 = 2$ ✓.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (3 × 3, the CBSE staple).** Solve $x - y + 2z = 7$, $3x + 4y - 5z = -5$, $2x - y + 3z = 12$.\n\n**Step 1. Set up.** $A = \\begin{pmatrix} 1 & -1 & 2 \\\\ 3 & 4 & -5 \\\\ 2 & -1 & 3 \\end{pmatrix}$, $B = \\begin{pmatrix} 7 \\\\ -5 \\\\ 12 \\end{pmatrix}$.\n\n**Step 2. Determinant** (expand along row 1): $|A| = 1(12 - 5) - (-1)(9 + 10) + 2(-3 - 8) = 7 + 19 - 22 = 4 \\ne 0$, so a unique solution exists.\n\n**Step 3. Cofactors.** Row 1: $C_{11} = 7$, $C_{12} = -19$, $C_{13} = -11$. Row 2: $C_{21} = 1$, $C_{22} = -1$, $C_{23} = -1$. Row 3: $C_{31} = -3$, $C_{32} = 11$, $C_{33} = 7$.\n\n**Step 4. Adjoint** (transpose of the cofactor matrix): $\\operatorname{adj}A = \\begin{pmatrix} 7 & 1 & -3 \\\\ -19 & -1 & 11 \\\\ -11 & -1 & 7 \\end{pmatrix}$.\n\n**Step 5. Multiply.** $X = \\frac{1}{4}\\operatorname{adj}A\\,B = \\frac{1}{4}\\begin{pmatrix} 49 - 5 - 36 \\\\ -133 + 5 + 132 \\\\ -77 + 5 + 84 \\end{pmatrix} = \\frac{1}{4}\\begin{pmatrix} 8 \\\\ 4 \\\\ 12 \\end{pmatrix} = \\begin{pmatrix} 2 \\\\ 1 \\\\ 3 \\end{pmatrix}$.\n\n**Step 6. Check** in the original equations: $2 - 1 + 6 = 7$ ✓, $6 + 4 - 15 = -5$ ✓, $4 - 1 + 9 = 12$ ✓.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Always check in the original equations",
      content:
        "One sign slip in a cofactor ruins the answer, and it costs ten seconds to substitute back. In an exam, a check that fails tells you to recompute the adjoint, which is where almost every error lives.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (given a product).** A favourite CBSE question hands you the inverse in disguise: show that $\\begin{pmatrix} 1 & -1 & 2 \\\\ 0 & 2 & -3 \\\\ 3 & -2 & 4 \\end{pmatrix}\\begin{pmatrix} -2 & 0 & 1 \\\\ 9 & 2 & -3 \\\\ 6 & 1 & -2 \\end{pmatrix} = I$, then solve $x - y + 2z = 1$, $2y - 3z = 1$, $3x - 2y + 4z = 2$.\n\n**Step 1.** Multiply out: row 1 · column 1 $= -2 - 9 + 12 = 1$, row 1 · column 2 $= 0 - 2 + 2 = 0$, and so on. The product is $I$, so the second matrix is $A^{-1}$ for the first.\n\n**Step 2.** The system is $AX = B$ with that first matrix as $A$ (note the 0 for the missing $x$ in equation 2) and $B = (1, 1, 2)$.\n\n**Step 3.** $X = A^{-1}B = \\begin{pmatrix} -2 + 0 + 2 \\\\ 9 + 2 - 6 \\\\ 6 + 1 - 4 \\end{pmatrix} = \\begin{pmatrix} 0 \\\\ 5 \\\\ 3 \\end{pmatrix}$. Check: $0 - 5 + 6 = 1$ ✓, $10 - 9 = 1$ ✓, $0 - 10 + 12 = 2$ ✓.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (word problem).** A shop charges ₹60 for 4 kg onion, 3 kg wheat and 2 kg rice; ₹90 for 2 kg onion, 4 kg wheat and 6 kg rice; and ₹70 for 6 kg onion, 2 kg wheat and 3 kg rice. Find the price per kg of each.\n\n**Step 1. Name the unknowns.** Let the prices per kg be $x$ (onion), $y$ (wheat), $z$ (rice).\n\n**Step 2. One equation per sentence.** $4x + 3y + 2z = 60$, $2x + 4y + 6z = 90$, $6x + 2y + 3z = 70$.\n\n**Step 3.** $|A| = 4(12 - 12) - 3(6 - 36) + 2(4 - 24) = 0 + 90 - 40 = 50$.\n\n**Step 4.** $\\operatorname{adj}A = \\begin{pmatrix} 0 & -5 & 10 \\\\ 30 & 0 & -20 \\\\ -20 & 10 & 10 \\end{pmatrix}$, so $X = \\frac{1}{50}\\begin{pmatrix} 0 - 450 + 700 \\\\ 1800 + 0 - 1400 \\\\ -1200 + 900 + 700 \\end{pmatrix} = \\frac{1}{50}\\begin{pmatrix} 250 \\\\ 400 \\\\ 400 \\end{pmatrix} = \\begin{pmatrix} 5 \\\\ 8 \\\\ 8 \\end{pmatrix}$.\n\nOnion ₹5/kg, wheat ₹8/kg, rice ₹8/kg. Check the first bill: $20 + 24 + 16 = 60$ ✓.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Order matters: $X = A^{-1}B$, never $BA^{-1}$",
      content:
        "Matrix multiplication is not commutative, so \"divide by $A$\" is not a thing. You must multiply by $A^{-1}$ on the **same side** that $A$ sits on, which is the left. For a $3 \\times 3$ system, $BA^{-1}$ is not even defined: $B$ is $3 \\times 1$ and $A^{-1}$ is $3 \\times 3$, and the inner orders $1$ and $3$ do not match.",
    },
    {
      type: "callout",
      variant: "info",
      title: "When the method fails",
      content:
        "If $|A| = 0$ there is no $A^{-1}$ and this method says nothing, neither \"no solution\" nor \"infinitely many\". The system might have either. Lesson 4.4 handles that case.",
    },
    {
      type: "quiz",
      id: "mx4-2-q1",
      variant: "concept",
      question: "From $AX = B$ with $|A| \\ne 0$, which step is correct?",
      options: [
        { text: "$X = A^{-1}B$", correct: true, feedback: "Multiply on the left by $A^{-1}$, the same side $A$ is on. Then $A^{-1}A = I$ disappears." },
        { text: "$X = BA^{-1}$", feedback: "Multiplying on the right would give $AXA^{-1}$, not $X$. For a column $B$ the product $BA^{-1}$ is not even defined." },
        { text: "$X = \\dfrac{B}{A}$", feedback: "There is no division of matrices. The inverse replaces division, and it must go on the correct side." },
      ],
    },
    {
      type: "quiz",
      id: "mx4-2-q2",
      variant: "practice",
      question: "What is the coefficient matrix of $2x - z = 3$, $x + y = 1$, $3y + z = 4$?",
      options: [
        { text: "$\\begin{pmatrix} 2 & 0 & -1 \\\\ 1 & 1 & 0 \\\\ 0 & 3 & 1 \\end{pmatrix}$", correct: true, feedback: "Every missing unknown becomes a 0 in its own column." },
        { text: "$\\begin{pmatrix} 2 & -1 & 0 \\\\ 1 & 1 & 0 \\\\ 3 & 1 & 0 \\end{pmatrix}$", feedback: "This packs the coefficients to the left. Column 2 must hold the $y$-coefficients: 0, 1, 3." },
        { text: "$\\begin{pmatrix} 2 & 1 & 0 \\\\ 0 & 1 & 3 \\\\ -1 & 0 & 1 \\end{pmatrix}$", feedback: "That is the transpose. Each **row** should be one equation." },
      ],
    },
    {
      type: "quiz",
      id: "mx4-2-q3",
      variant: "practice",
      question:
        "For some system $AX = B$, $A^{-1} = \\begin{pmatrix} 1 & -1 \\\\ -1 & 2 \\end{pmatrix}$ and $B = \\begin{pmatrix} 5 \\\\ 7 \\end{pmatrix}$. What is $X$?",
      options: [
        { text: "$x = -2$, $y = 9$", correct: true, feedback: "$x = 5 - 7 = -2$, $y = -5 + 14 = 9$." },
        { text: "$x = 12$, $y = 19$", feedback: "That is $A^{-1}$ with signs dropped. Keep the $-1$ entries: $1\\cdot5 + (-1)\\cdot7 = -2$." },
        { text: "$x = -2$, $y = 3$", feedback: "Row 2 of $A^{-1}$ gives $-1\\cdot5 + 2\\cdot7 = 9$, not 3." },
      ],
      hint: "Row $i$ of $A^{-1}$ dotted with $B$ gives the $i$-th unknown.",
    },
    {
      type: "quiz",
      id: "mx4-2-q4",
      variant: "practice",
      question:
        "Solve $x + y = 3$, $y + z = 5$, $x + z = 4$. (Here $|A| = 2$ and $\\operatorname{adj}A = \\begin{pmatrix} 1 & -1 & 1 \\\\ 1 & 1 & -1 \\\\ -1 & 1 & 1 \\end{pmatrix}$.)",
      options: [
        { text: "$(x, y, z) = (1, 2, 3)$", correct: true, feedback: "$\\frac{1}{2}(3 - 5 + 4,\\ 3 + 5 - 4,\\ -3 + 5 + 4) = (1, 2, 3)$. Check: $1 + 2 = 3$ ✓." },
        { text: "$(x, y, z) = (2, 4, 6)$", feedback: "That is $(\\operatorname{adj}A)B$. You still need to divide by $|A| = 2$." },
        { text: "$(x, y, z) = (3, 2, 1)$", feedback: "Check: $x + y = 5$, not 3. Multiply $\\operatorname{adj}A$ by $B$ row by row." },
      ],
    },
    {
      type: "quiz",
      id: "mx4-2-q5",
      variant: "concept",
      question: "For a system $AX = B$ you find $|A| = 0$. What can you conclude?",
      options: [
        { text: "The inverse method cannot be used; the system may have no solution or infinitely many.", correct: true, feedback: "Singular $A$ means no $A^{-1}$. Which of the two cases you are in needs a further test (lesson 4.4)." },
        { text: "The system has no solution.", feedback: "Not necessarily. Two coincident lines have $|A| = 0$ and infinitely many solutions." },
        { text: "The solution is $X = O$.", feedback: "$X = O$ only solves $AX = B$ when $B = O$. And $|A| = 0$ does not produce any formula for $X$." },
      ],
    },
    {
      type: "quiz",
      id: "mx4-2-q6",
      variant: "practice",
      question:
        "A school gives awards of ₹$x$ for honesty, ₹$y$ for regularity and ₹$z$ for hard work. The three awards total ₹6000. The honesty award plus three times the hard-work award is ₹11000. The honesty and hard-work awards together equal twice the regularity award. What is the hard-work award $z$?",
      options: [
        { text: "₹3500", correct: true, feedback: "$x + y + z = 6000$, $x + 0y + 3z = 11000$, $x - 2y + z = 0$ ($|A| = 6$). The third says $x + z = 2y$, so the first gives $3y = 6000$, $y = 2000$ and $x + z = 4000$. Subtract that from $x + 3z = 11000$: $2z = 7000$, $z = 3500$, $x = 500$. Check: $500 + 10500 = 11000$ ✓, $500 - 4000 + 3500 = 0$ ✓." },
        { text: "₹2000", feedback: "That is $y$, the regularity award. Keep going: $x + z = 4000$ and $x + 3z = 11000$." },
        { text: "₹7000", feedback: "That is $2z$. Subtracting $x + z = 4000$ from $x + 3z = 11000$ gives $2z = 7000$, so $z = 3500$." },
      ],
      hint: "\"Together equal twice\" becomes $x - 2y + z = 0$. The second equation has no $y$, so its $y$-coefficient is 0.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "When the system uses $A^T$",
      content:
        "A common CBSE follow-up: \"find $A^{-1}$, hence solve\" a system whose coefficient matrix is not $A$ but $A^T$ (the equations are read down the **columns** of $A$). There is no need to invert again: $(A^T)^{-1} = (A^{-1})^T$, so $X = (A^{-1})^TB$. Always compare the system's coefficient matrix with $A$ entry by entry before multiplying.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (CBSE board style, the transpose trap).** Find $A^{-1}$ for $A = \\begin{pmatrix} 1 & 1 & 1 \\\\ 0 & 1 & 2 \\\\ 1 & 0 & 1 \\end{pmatrix}$. Hence solve $x + z = 4$, $x + y = 3$, $x + 2y + z = 8$.\n\n**Step 1. Determinant.** Expand along row 1: $|A| = 1(1 - 0) - 1(0 - 2) + 1(0 - 1) = 1 + 2 - 1 = 2 \\ne 0$.\n\n**Step 2. Cofactors and adjoint.** Row 1: $C_{11} = 1$, $C_{12} = 2$, $C_{13} = -1$. Row 2: $C_{21} = -1$, $C_{22} = 0$, $C_{23} = 1$. Row 3: $C_{31} = 1$, $C_{32} = -2$, $C_{33} = 1$. Transposing,",
    },
    {
      type: "math",
      latex:
        "A^{-1} = \\frac{1}{2}\\operatorname{adj}A = \\frac{1}{2}\\begin{pmatrix} 1 & -1 & 1 \\\\ 2 & 0 & -2 \\\\ -1 & 1 & 1 \\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "**Step 3. Compare the system with $A$.** The system's coefficient matrix is $\\begin{pmatrix} 1 & 0 & 1 \\\\ 1 & 1 & 0 \\\\ 1 & 2 & 1 \\end{pmatrix}$. Its rows are the **columns** of $A$, so it is $A^T$, not $A$.\n\n*Why this step:* using $A^{-1}B$ here would solve a different system and give a wrong answer with no warning. Ten seconds of comparison saves the whole question.\n\n**Step 4. Use $(A^T)^{-1} = (A^{-1})^T$.** Transpose the inverse you already have and multiply by $B = (4, 3, 8)$:",
    },
    {
      type: "math",
      latex:
        "X = \\frac{1}{2}\\begin{pmatrix} 1 & 2 & -1 \\\\ -1 & 0 & 1 \\\\ 1 & -2 & 1 \\end{pmatrix}\\begin{pmatrix} 4 \\\\ 3 \\\\ 8 \\end{pmatrix} = \\frac{1}{2}\\begin{pmatrix} 4 + 6 - 8 \\\\ -4 + 0 + 8 \\\\ 4 - 6 + 8 \\end{pmatrix} = \\begin{pmatrix} 1 \\\\ 2 \\\\ 3 \\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "**Step 5. Check** in the original equations: $1 + 3 = 4$ ✓, $1 + 2 = 3$ ✓, $1 + 4 + 3 = 8$ ✓. So $x = 1$, $y = 2$, $z = 3$.\n\n**A related shortcut.** Some papers give two matrices with $AB = kI$ (for example $AB = 6I$). Divide by $k$: $A\\left(\\frac{1}{k}B\\right) = I$, so $A^{-1} = \\frac{1}{k}B$ and no adjoint is needed at all.",
    },
    {
      type: "quiz",
      id: "mx4-2-q7",
      variant: "concept",
      question:
        "You know $A^{-1}$. A system's coefficient matrix turns out to be $A^T$. Which gives $X$?",
      options: [
        { text: "$X = (A^{-1})^TB$", correct: true, feedback: "$(A^T)^{-1} = (A^{-1})^T$, since $A^T(A^{-1})^T = (A^{-1}A)^T = I$." },
        { text: "$X = A^{-1}B$", feedback: "That solves $AX = B$, a different system. Here the rows of the coefficient matrix are the columns of $A$." },
        { text: "$X = B^TA^{-1}$", feedback: "That is a row, not a column, and the order is wrong. Left-multiply by the inverse of the actual coefficient matrix." },
      ],
    },
    {
      type: "quiz",
      id: "mx4-2-q8",
      variant: "practice",
      question:
        "For two $3 \\times 3$ matrices, $AB = 6I$. You must solve $AX = C$. Which is correct?",
      options: [
        { text: "$X = \\frac{1}{6}BC$", correct: true, feedback: "$A\\left(\\frac{1}{6}B\\right) = I$, so $A^{-1} = \\frac{1}{6}B$ and $X = A^{-1}C = \\frac{1}{6}BC$." },
        { text: "$X = 6BC$", feedback: "That would need $A^{-1} = 6B$, but then $A(6B) = 36I$, not $I$. Divide by 6, do not multiply." },
        { text: "$X = BC$", feedback: "$AB = 6I$, not $I$, so $B$ is six times too big to be $A^{-1}$." },
      ],
    },
    {
      type: "quiz",
      id: "mx4-2-q9",
      variant: "practice",
      question:
        "3 kg apples and 2 kg bananas cost ₹440; 1 kg apples and 1 kg bananas cost ₹180. Using $A^{-1} = \\begin{pmatrix} 1 & -2 \\\\ -1 & 3 \\end{pmatrix}$ for $A = \\begin{pmatrix} 3 & 2 \\\\ 1 & 1 \\end{pmatrix}$, what is the price of apples per kg?",
      options: [
        { text: "₹80", correct: true, feedback: "$X = A^{-1}B$: apples $= 440 - 360 = 80$, bananas $= -440 + 540 = 100$. Check: $240 + 200 = 440$ ✓." },
        { text: "₹100", feedback: "That is the banana price, from row 2 of $A^{-1}$. Row 1 gives the first unknown." },
        { text: "₹800", feedback: "Keep the sign of the $-2$: $1\\cdot440 + (-2)\\cdot180 = 80$, not $440 + 360$." },
      ],
      hint: "Row 1 of $A^{-1}$ dotted with $(440, 180)$ gives the apple price.",
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "cramers-rule",
  title: "4.3 · Cramer's Rule",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "The inverse method gives you all the unknowns at once, but it makes you build the whole adjoint. Sometimes you only want **one** unknown, say just $y$. Cramer's rule gives any single unknown as a ratio of two determinants, and it has a lovely geometric meaning.",
    },
    {
      type: "text",
      content:
        "**Derivation by elimination.** Take $a_1x + b_1y = c_1$ and $a_2x + b_2y = c_2$. To kill $y$, multiply the first by $b_2$ and the second by $b_1$, then subtract:",
    },
    {
      type: "math",
      latex: "(a_1b_2 - a_2b_1)\\,x = c_1b_2 - c_2b_1",
    },
    {
      type: "text",
      content:
        "Both sides are $2 \\times 2$ determinants. The left bracket is $D$, the determinant of the coefficient matrix. The right side is the same determinant with the **$x$-column replaced by the constants**. Killing $x$ instead gives the matching result for $y$:",
    },
    {
      type: "math",
      latex:
        "D = \\begin{vmatrix} a_1 & b_1 \\\\ a_2 & b_2 \\end{vmatrix},\\quad D_x = \\begin{vmatrix} c_1 & b_1 \\\\ c_2 & b_2 \\end{vmatrix},\\quad D_y = \\begin{vmatrix} a_1 & c_1 \\\\ a_2 & c_2 \\end{vmatrix},\\qquad x = \\frac{D_x}{D},\\; y = \\frac{D_y}{D}\\quad (D \\ne 0)",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Cramer's rule",
      content:
        "If $D = |A| \\ne 0$, the system $AX = B$ has the unique solution $x_i = \\dfrac{D_i}{D}$, where $D_i$ is $|A|$ with **column $i$ replaced by $B$**. For three unknowns: $x = \\frac{D_1}{D}$, $y = \\frac{D_2}{D}$, $z = \\frac{D_3}{D}$.",
    },
    {
      type: "text",
      content:
        "**Why a column? The area picture.** In the column picture, $B = x\\,\\mathbf{a}_1 + y\\,\\mathbf{a}_2$, where $\\mathbf{a}_1, \\mathbf{a}_2$ are the columns of $A$. Now compute $D_x$, the determinant with $B$ in place of column 1, using the properties from Chapter 2:",
    },
    {
      type: "math",
      latex:
        "D_x = \\det(B,\\ \\mathbf{a}_2) = \\det(x\\mathbf{a}_1 + y\\mathbf{a}_2,\\ \\mathbf{a}_2) = x\\det(\\mathbf{a}_1, \\mathbf{a}_2) + y\\underbrace{\\det(\\mathbf{a}_2, \\mathbf{a}_2)}_{0} = x\\,D",
    },
    {
      type: "text",
      content:
        "So $x$ is a **ratio of areas**: the parallelogram built on $B$ and $\\mathbf{a}_2$, divided by the parallelogram built on the two columns. Sliding $B$ parallel to $\\mathbf{a}_2$ is a shear, which changes only the $y$-amount and leaves that area alone. The only thing that changes the area is how far along $\\mathbf{a}_1$ you have travelled, and that is exactly $x$.",
    },
    {
      type: "interactive",
      config: {
        component: "matrix-transform-grid",
        matrix: [
          [2, 3],
          [1, -1],
        ],
        editable: false,
        showProbe: true,
        probe: [2, 1],
        range: 8,
        caption:
          "A = [[2, 3], [1, −1]], the system 2x + 3y = 7, x − y = 1. The shaded parallelogram of the two columns a₁ = (2, 1) and a₂ = (3, −1) has signed area D = −5. The probe v = (2, 1) lands on B = (7, 1): two of column 1 plus one of column 2, matching x = Dₓ/D = 2 and y = D_y/D = 1.",
      },
    },
    {
      type: "interactive",
      config: {
        component: "matrix-transform-grid",
        matrix: [
          [7, 3],
          [1, -1],
        ],
        editable: false,
        showDeterminant: true,
        range: 8,
        caption:
          "Columns B and a₂. Signed area −10, exactly twice D = −5, so x = D_x/D = 2. Slide B along a₂ (a shear) and this area does not change.",
      },
    },
    {
      type: "text",
      content:
        "Compare the two shaded parallelograms. $B = 2\\mathbf{a}_1 + 1\\mathbf{a}_2$, and the $1\\mathbf{a}_2$ part is a slide along $\\mathbf{a}_2$ that adds no area. What is left is $2\\mathbf{a}_1$ against $\\mathbf{a}_2$: twice the original parallelogram. That factor of 2 **is** $x$.",
    },
    {
      type: "interactive",
      config: {
        component: "linear-system-lines",
        line1: { a: 2, b: 3, c: 7 },
        line2: { a: 1, b: -1, c: 1 },
        caption:
          "The same system in the row picture, with D, Dₓ and D_y computed live. Change one coefficient and watch the intersection and the three determinants move together. Push D towards 0 and the formula blows up exactly when the lines turn parallel.",
      },
    },
    {
      type: "text",
      content:
        "**Worked example 1 (2 × 2).** Solve $2x + 3y = 7$, $x - y = 1$.\n\n$D = \\begin{vmatrix} 2 & 3 \\\\ 1 & -1 \\end{vmatrix} = -2 - 3 = -5$.\n\n$D_x = \\begin{vmatrix} 7 & 3 \\\\ 1 & -1 \\end{vmatrix} = -7 - 3 = -10$, so $x = \\frac{-10}{-5} = 2$.\n\n$D_y = \\begin{vmatrix} 2 & 7 \\\\ 1 & 1 \\end{vmatrix} = 2 - 7 = -5$, so $y = \\frac{-5}{-5} = 1$.\n\nCheck: $4 + 3 = 7$ ✓, $2 - 1 = 1$ ✓.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (3 × 3).** Solve $x + y + z = 6$, $2x - y + z = 3$, $x + 2y - z = 2$.\n\n**Step 1.** $D = \\begin{vmatrix} 1 & 1 & 1 \\\\ 2 & -1 & 1 \\\\ 1 & 2 & -1 \\end{vmatrix} = 1(1 - 2) - 1(-2 - 1) + 1(4 + 1) = -1 + 3 + 5 = 7$.\n\n**Step 2.** Replace column 1 by $B = (6, 3, 2)$: $D_1 = \\begin{vmatrix} 6 & 1 & 1 \\\\ 3 & -1 & 1 \\\\ 2 & 2 & -1 \\end{vmatrix} = 6(1 - 2) - 1(-3 - 2) + 1(6 + 2) = -6 + 5 + 8 = 7$.\n\n**Step 3.** Replace column 2: $D_2 = \\begin{vmatrix} 1 & 6 & 1 \\\\ 2 & 3 & 1 \\\\ 1 & 2 & -1 \\end{vmatrix} = 1(-3 - 2) - 6(-2 - 1) + 1(4 - 3) = -5 + 18 + 1 = 14$.\n\n**Step 4.** Replace column 3: $D_3 = \\begin{vmatrix} 1 & 1 & 6 \\\\ 2 & -1 & 3 \\\\ 1 & 2 & 2 \\end{vmatrix} = 1(-2 - 6) - 1(4 - 3) + 6(4 + 1) = -8 - 1 + 30 = 21$.\n\n**Step 5.** $x = \\frac{7}{7} = 1$, $y = \\frac{14}{7} = 2$, $z = \\frac{21}{7} = 3$. Check: $1 + 2 + 3 = 6$ ✓, $2 - 2 + 3 = 3$ ✓, $1 + 4 - 3 = 2$ ✓.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (word problem): ticket sales.** A school play sold 300 tickets: adult tickets at ₹50 and student tickets at ₹20. The takings were ₹9600. How many of each were sold?\n\n**Step 1. Set up.** Let $x$ = adult tickets, $y$ = student tickets. Count: $x + y = 300$. Money: $50x + 20y = 9600$.\n\n*Why two equations:* each sentence of information that is independent of the others gives one equation. Two unknowns need two.\n\n**Step 2. Three determinants.**",
    },
    {
      type: "math",
      latex:
        "D = \\begin{vmatrix} 1 & 1 \\\\ 50 & 20 \\end{vmatrix} = -30,\\quad D_x = \\begin{vmatrix} 300 & 1 \\\\ 9600 & 20 \\end{vmatrix} = 6000 - 9600 = -3600,\\quad D_y = \\begin{vmatrix} 1 & 300 \\\\ 50 & 9600 \\end{vmatrix} = 9600 - 15000 = -5400",
    },
    {
      type: "text",
      content:
        "**Step 3.** $x = \\frac{-3600}{-30} = 120$ adults and $y = \\frac{-5400}{-30} = 180$ students.\n\n*Why keep the signs:* $D$, $D_x$, $D_y$ are all negative here, and the negatives cancel. Dropping a sign halfway through is the most common way to get a negative number of tickets.\n\n**Step 4. Check.** $120 + 180 = 300$ ✓ and $6000 + 3600 = 9600$ ✓.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (CBSE board style, reciprocal unknowns).** Solve $\\dfrac{2}{x} + \\dfrac{3}{y} + \\dfrac{10}{z} = 4$, $\\dfrac{4}{x} - \\dfrac{6}{y} + \\dfrac{5}{z} = 1$, $\\dfrac{6}{x} + \\dfrac{9}{y} - \\dfrac{20}{z} = 2$.\n\n**Step 1. Make it linear.** Put $u = \\frac{1}{x}$, $v = \\frac{1}{y}$, $w = \\frac{1}{z}$: $2u + 3v + 10w = 4$, $4u - 6v + 5w = 1$, $6u + 9v - 20w = 2$.\n\n*Why this step:* the equations are not linear in $x, y, z$, but they are linear in the reciprocals. Every method in this chapter needs a linear system, so change the unknowns first.\n\n**Step 2. $D$** (expand along row 1): $D = 2(120 - 45) - 3(-80 - 30) + 10(36 + 36) = 150 + 330 + 720 = 1200$.\n\n**Step 3. Replace each column by $(4, 1, 2)$.**\n\n$D_u = \\begin{vmatrix} 4 & 3 & 10 \\\\ 1 & -6 & 5 \\\\ 2 & 9 & -20 \\end{vmatrix} = 4(75) - 3(-30) + 10(21) = 300 + 90 + 210 = 600$.\n\n$D_v = \\begin{vmatrix} 2 & 4 & 10 \\\\ 4 & 1 & 5 \\\\ 6 & 2 & -20 \\end{vmatrix} = 2(-30) - 4(-110) + 10(2) = -60 + 440 + 20 = 400$.\n\n$D_w = \\begin{vmatrix} 2 & 3 & 4 \\\\ 4 & -6 & 1 \\\\ 6 & 9 & 2 \\end{vmatrix} = 2(-21) - 3(2) + 4(72) = -42 - 6 + 288 = 240$.\n\n**Step 4.** $u = \\frac{600}{1200} = \\frac{1}{2}$, $v = \\frac{400}{1200} = \\frac{1}{3}$, $w = \\frac{240}{1200} = \\frac{1}{5}$.\n\n**Step 5. Undo the substitution.** $x = 2$, $y = 3$, $z = 5$. Check equation 1: $1 + 1 + 2 = 4$ ✓.\n\n*Why step 5 matters:* the most common lost mark is stopping at $u = \\frac{1}{2}$ and writing $x = \\frac{1}{2}$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Replace the column, not the row",
      content:
        "$D_i$ swaps $B$ into **column** $i$, the column that holds the coefficients of the $i$-th unknown. Replacing row $i$ would mix coefficients of different unknowns with the constants and give a meaningless number. The area derivation shows why: $B$ is a combination of the *columns*.",
    },
    {
      type: "table",
      headers: ["Situation", "Best tool", "Why"],
      rows: [
        ["$2 \\times 2$ system, any question", "Cramer", "Three tiny determinants, done"],
        ["$3 \\times 3$, only one unknown asked", "Cramer", "Two determinants ($D$ and one $D_i$) instead of a whole adjoint"],
        ["$3 \\times 3$, all unknowns, or \"use matrix method\"", "Inverse ($A^{-1}B$)", "One adjoint gives everything, and CBSE often asks for this method by name"],
        ["$D = 0$", "Neither: test consistency (4.4) or row-reduce (4.5)", "Both formulas divide by $D$"],
        ["4 or more unknowns", "Row reduction", "Determinants grow far too fast"],
        ["Number of equations ≠ number of unknowns", "Row reduction", "Determinants exist only for square $A$, so neither $A^{-1}$ nor Cramer applies"],
      ],
    },
    {
      type: "quiz",
      id: "mx4-3-q1",
      variant: "concept",
      question: "In Cramer's rule for $x + y + z = 6$, $2x - y + z = 3$, $x + 2y - z = 2$, how is $D_2$ formed?",
      options: [
        { text: "Replace the second **column** of $A$ (the $y$-coefficients) with $(6, 3, 2)$.", correct: true, feedback: "Column 2 belongs to $y$, so $D_2$ is the determinant that gives $y = D_2/D$." },
        { text: "Replace the second **row** of $A$ with $(6, 3, 2)$.", feedback: "Rows are equations, not unknowns. The constants must go into the column of the unknown you want." },
        { text: "Delete row 2 and column 2 of $A$.", feedback: "That is the minor $M_{22}$, a $2 \\times 2$ determinant from Chapter 2, not a Cramer determinant." },
      ],
    },
    {
      type: "quiz",
      id: "mx4-3-q2",
      variant: "practice",
      question: "Use Cramer's rule on $3x - 2y = 4$, $x + 4y = 6$. What is $x$?",
      options: [
        { text: "$x = 2$", correct: true, feedback: "$D = 12 + 2 = 14$, $D_x = \\begin{vmatrix} 4 & -2 \\\\ 6 & 4 \\end{vmatrix} = 16 + 12 = 28$, $x = 2$. (And $y = 14/14 = 1$.)" },
        { text: "$x = 1$", feedback: "That is $y$. For $x$, put the constants in the first column: $D_x = 28$." },
        { text: "$x = \\frac{1}{2}$", feedback: "You divided the wrong way round. $x = D_x/D = 28/14$." },
      ],
    },
    {
      type: "quiz",
      id: "mx4-3-q3",
      variant: "practice",
      question:
        "For $2x + y + z = 3$, $x - y + 2z = 6$, $3x + 2y - z = -1$ you are given $D = 6$. What is $y$?",
      options: [
        { text: "$y = -1$", correct: true, feedback: "$D_2 = \\begin{vmatrix} 2 & 3 & 1 \\\\ 1 & 6 & 2 \\\\ 3 & -1 & -1 \\end{vmatrix} = 2(-6 + 2) - 3(-1 - 6) + 1(-1 - 18) = -8 + 21 - 19 = -6$, so $y = -6/6 = -1$." },
        { text: "$y = 1$", feedback: "Watch the signs in the expansion: $D_2 = -8 + 21 - 19 = -6$, not $6$." },
        { text: "$y = 2$", feedback: "That is $z$ (the full solution is $x = 1$, $y = -1$, $z = 2$). Replace column 2, not column 3." },
      ],
      hint: "Put $(3, 6, -1)$ in the second column and expand along row 1.",
    },
    {
      type: "quiz",
      id: "mx4-3-q4",
      variant: "concept",
      question: "Geometrically, why does $D_x = x\\,D$ in a $2 \\times 2$ system?",
      options: [
        {
          text: "$B = x\\mathbf{a}_1 + y\\mathbf{a}_2$, and the $y\\mathbf{a}_2$ part adds no area to the parallelogram on $B$ and $\\mathbf{a}_2$.",
          correct: true,
          feedback: "Sliding along $\\mathbf{a}_2$ is a shear, so it does not change the area. Only the $x$ multiples of $\\mathbf{a}_1$ count.",
        },
        { text: "Because $D_x$ and $D$ are always equal.", feedback: "They are equal only when $x = 1$." },
        { text: "Because replacing a row by $B$ multiplies the determinant by $x$.", feedback: "Cramer replaces a column, and the reason is linearity in that column plus $\\det(\\mathbf{a}_2, \\mathbf{a}_2) = 0$." },
      ],
    },
    {
      type: "quiz",
      id: "mx4-3-q5",
      variant: "practice",
      question: "For a $3 \\times 3$ system you are asked only for $z$. Which is the most efficient approach?",
      options: [
        { text: "Compute $D$ and $D_3$, then $z = D_3/D$.", correct: true, feedback: "Two determinants and you are done. There is no need for all nine cofactors." },
        { text: "Compute the full adjoint, then $A^{-1}B$.", feedback: "That works, but it computes $x$ and $y$ you were not asked for." },
        { text: "Compute $D_1$, $D_2$, $D_3$ and add them.", feedback: "Their sum means nothing. $z$ needs only $D_3$ and $D$." },
      ],
    },
    {
      type: "quiz",
      id: "mx4-3-q6",
      variant: "practice",
      question:
        "3 pens and 2 notebooks cost ₹110; 1 pen and 4 notebooks cost ₹120. Using Cramer's rule, what does one notebook cost?",
      options: [
        { text: "₹25", correct: true, feedback: "$D = 12 - 2 = 10$, $D_y = \\begin{vmatrix} 3 & 110 \\\\ 1 & 120 \\end{vmatrix} = 360 - 110 = 250$, so $y = 25$. (A pen costs ₹$\\frac{200}{10} = 20$.) Check: $20 + 100 = 120$ ✓." },
        { text: "₹20", feedback: "That is the pen price, $D_x/D$. The notebook is the second unknown, so replace column 2." },
        { text: "₹250", feedback: "That is $D_y$ on its own. Divide by $D = 10$." },
      ],
    },
    {
      type: "quiz",
      id: "mx4-3-q7",
      variant: "practice",
      question: "Solve $\\dfrac{2}{x} + \\dfrac{3}{y} = 13$, $\\dfrac{5}{x} - \\dfrac{4}{y} = -2$. What is $x$?",
      options: [
        { text: "$x = \\frac{1}{2}$", correct: true, feedback: "With $u = \\frac{1}{x}$, $v = \\frac{1}{y}$: $D = -8 - 15 = -23$, $D_u = -52 + 6 = -46$, so $u = 2$ and $x = \\frac{1}{2}$. ($v = 3$, $y = \\frac{1}{3}$.)" },
        { text: "$x = 2$", feedback: "That is $u = \\frac{1}{x}$. Undo the substitution: $x = \\frac{1}{u}$." },
        { text: "$x = \\frac{1}{3}$", feedback: "That is $y$. Cramer's $D_u$ replaces the first column, the coefficients of $\\frac{1}{x}$." },
      ],
      hint: "Put $u = \\frac{1}{x}$, $v = \\frac{1}{y}$ first.",
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "consistency-when-d-is-zero",
  title: "4.4 · Consistency: When D = 0",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "Both the inverse method and Cramer's rule divide by $D = |A|$. When $D = 0$ they go silent. The geometry tells you why: $A$ squashes the plane (or space) flat, so some targets are never reached and the ones that are get reached by infinitely many inputs. The job now is to tell those two cases apart.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Consistent and inconsistent",
      content:
        "A system is **consistent** if it has at least one solution (exactly one, or infinitely many) and **inconsistent** if it has none.",
    },
    {
      type: "interactive",
      config: {
        component: "linear-system-lines",
        line1: { a: 1, b: 2, c: 3 },
        line2: { a: 2, b: 4, c: 1 },
        adjustable: ["c1", "c2"],
        sliderMin: -8,
        sliderMax: 8,
        presets: [
          { label: "Parallel (D = 0, none)", line1: { a: 1, b: 2, c: 3 }, line2: { a: 2, b: 4, c: 1 } },
          { label: "Coincident (D = 0, infinite)", line1: { a: 1, b: 2, c: 3 }, line2: { a: 2, b: 4, c: 6 } },
          { label: "Crossing (D ≠ 0)", line1: { a: 1, b: 2, c: 3 }, line2: { a: 2, b: -1, c: 1 } },
        ],
        caption:
          "Only the right-hand sides c₁ and c₂ have sliders, so D stays 0 in the first two presets. Move c₂ and the lines stay parallel. At exactly c₂ = 6 they snap together and Dₓ, D_y become 0 too.",
      },
    },
    {
      type: "text",
      content:
        "In two unknowns the picture is clean. $D = 0$ means the lines are parallel or the same. If $D_x$ or $D_y$ is non-zero, the right-hand sides are out of step and the lines are distinct: **no solution**. If $D = D_x = D_y = 0$ (and the equations are not both of the form $0 = c$), the lines coincide: **infinitely many**.",
    },
    {
      type: "text",
      content:
        "**Warm-up example (2 × 2).** Classify $3x - 6y = 9$, $x - 2y = 4$.\n\n**Step 1.** $D = \\begin{vmatrix} 3 & -6 \\\\ 1 & -2 \\end{vmatrix} = -6 + 6 = 0$. So there is no unique solution.\n\n**Step 2.** $D_x = \\begin{vmatrix} 9 & -6 \\\\ 4 & -2 \\end{vmatrix} = -18 + 24 = 6 \\ne 0$.\n\n*Why this step:* $D = 0$ only says \"parallel or identical\". A single non-zero $D_x$ (or $D_y$) proves the right-hand sides are out of step, so the lines are distinct.\n\n**Conclusion: no solution.** The picture agrees: divide the first equation by 3 to get $x - 2y = 3$, while the second says $x - 2y = 4$. Same slope, different lines.",
    },
    {
      type: "text",
      content:
        "For three unknowns, CBSE uses a test built on the adjoint. Recall from Chapter 3 that $(\\operatorname{adj}A)A = |A|\\,I$. Suppose $X$ solves $AX = B$ and multiply by $\\operatorname{adj}A$:",
    },
    {
      type: "math",
      latex: "(\\operatorname{adj}A)B = (\\operatorname{adj}A)AX = |A|\\,X",
    },
    {
      type: "text",
      content:
        "If $|A| = 0$ the right side is $O$. So **any** solvable system with $|A| = 0$ must have $(\\operatorname{adj}A)B = O$. Turn that around: if $(\\operatorname{adj}A)B \\ne O$, no solution can exist. But the implication only runs one way. $(\\operatorname{adj}A)B = O$ is necessary, not sufficient.",
    },
    {
      type: "table",
      headers: ["Test", "Result", "Conclusion"],
      rows: [
        ["$|A| \\ne 0$", "(not needed)", "Consistent, unique solution $X = A^{-1}B$"],
        ["$|A| = 0$", "$(\\operatorname{adj}A)B \\ne O$", "Inconsistent: no solution"],
        ["$|A| = 0$", "$(\\operatorname{adj}A)B = O$", "Infinitely many **or** none. Check by solving (row-reduce)"],
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 1 (inconsistent).** Test $3x - y - 2z = 2$, $2y - z = -1$, $3x - 5y = 3$.\n\n**Step 1.** $A = \\begin{pmatrix} 3 & -1 & -2 \\\\ 0 & 2 & -1 \\\\ 3 & -5 & 0 \\end{pmatrix}$, $|A| = 3(0 - 5) - (-1)(0 + 3) + (-2)(0 - 6) = -15 + 3 + 12 = 0$.\n\n**Step 2.** $\\operatorname{adj}A = \\begin{pmatrix} -5 & 10 & 5 \\\\ -3 & 6 & 3 \\\\ -6 & 12 & 6 \\end{pmatrix}$.\n\n**Step 3.** $(\\operatorname{adj}A)B = \\begin{pmatrix} -10 - 10 + 15 \\\\ -6 - 6 + 9 \\\\ -12 - 12 + 18 \\end{pmatrix} = \\begin{pmatrix} -5 \\\\ -3 \\\\ -6 \\end{pmatrix} \\ne O$.\n\nSo the system is **inconsistent**. You can see it directly too: (equation 1) $-$ (equation 3) gives $4y - 2z = -1$, but twice equation 2 says $4y - 2z = -2$.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (infinitely many).** Test $x + y + z = 6$, $x + 2y + 3z = 14$, $2x + 3y + 4z = 20$.\n\n**Step 1.** $|A| = 1(8 - 9) - 1(4 - 6) + 1(3 - 4) = -1 + 2 - 1 = 0$.\n\n**Step 2.** $\\operatorname{adj}A = \\begin{pmatrix} -1 & -1 & 1 \\\\ 2 & 2 & -2 \\\\ -1 & -1 & 1 \\end{pmatrix}$ and $(\\operatorname{adj}A)B = (-6 - 14 + 20,\\ 12 + 28 - 40,\\ -6 - 14 + 20) = (0, 0, 0)$.\n\n**Step 3. Confirm by solving.** Equation 3 is equation 1 + equation 2, so it adds nothing. Subtract equation 1 from equation 2: $y + 2z = 8$. Let $z = t$. Then $y = 8 - 2t$ and $x = 6 - y - z = t - 2$.\n\nSolution: $(x, y, z) = (t - 2,\\ 8 - 2t,\\ t)$ for every real $t$: a whole line of solutions where three planes share an edge.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "D = 0 does not mean \"no solution\"",
      content:
        "$D = 0$ only says the solution, if there is one, is not unique. Example 2 has $D = 0$ and infinitely many solutions. Always run the second test before concluding anything.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "D = D₁ = D₂ = D₃ = 0 does not guarantee infinitely many",
      content:
        "Take $x + y + z = 1$, $x + y + z = 2$, $x + y + z = 3$: three parallel planes, so obviously no solution. Yet $D = 0$ (equal rows), and every $D_i$ is 0 because it has two equal columns. Even $\\operatorname{adj}A = O$ here, so $(\\operatorname{adj}A)B = O$ as well. The determinant tests cannot see the difference. Row reduction can: $R_2 - R_1$ gives $0 = 1$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Homogeneous systems",
      content:
        "A system $AX = O$ (every constant is 0) is **homogeneous**. It is **always consistent**, because $X = O$ (the **trivial solution**) works. The question is whether there are others:\n\n$|A| \\ne 0$: only the trivial solution, since $X = A^{-1}O = O$.\n\n$|A| = 0$: **infinitely many** non-trivial solutions as well.",
    },
    {
      type: "text",
      content:
        "The geometry makes this obvious. $AX = O$ asks which inputs get sent to the origin. If $A$ does not squash anything, only the origin goes there. If $A$ squashes space onto a plane or a line, a whole line (or plane) of inputs collapses onto the origin. For a homogeneous system the \"no solution\" case cannot happen, so $|A| = 0$ settles it.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (homogeneous with a parameter).** For which $k$ does $kx + y + z = 0$, $x + ky + z = 0$, $x + y + kz = 0$ have a non-trivial solution?\n\n**Step 1.** Need $|A| = 0$. Add all columns into column 1 (the value does not change): every entry of column 1 becomes $k + 2$, so\n\n$|A| = (k + 2)\\begin{vmatrix} 1 & 1 & 1 \\\\ 1 & k & 1 \\\\ 1 & 1 & k \\end{vmatrix}$.\n\n**Step 2.** Subtract row 1 from rows 2 and 3: the determinant becomes $(k + 2)\\begin{vmatrix} 1 & 1 & 1 \\\\ 0 & k - 1 & 0 \\\\ 0 & 0 & k - 1 \\end{vmatrix} = (k + 2)(k - 1)^2$.\n\n**Step 3.** Non-trivial solutions exist iff $k = 1$ or $k = -2$. Check $k = -2$: $(1, 1, 1)$ gives $-2 + 1 + 1 = 0$ in each equation ✓.\n\n**Step 4. Actually solve at each value.** The two singular cases collapse different amounts.\n\n$k = -2$: the equations are $-2x + y + z = 0$, $x - 2y + z = 0$, $x + y - 2z = 0$. Subtract the second from the third: $3y - 3z = 0$, so $y = z$. Then the second gives $x = 2y - z = z$. So $(x, y, z) = (t, t, t)$: a **line** of solutions, often written $x : y : z = 1 : 1 : 1$.\n\n$k = 1$: all three equations are the same, $x + y + z = 0$. Two unknowns are free: $(x, y, z) = (-s - t,\\ s,\\ t)$, a whole **plane** of solutions.\n\n$|A| = 0$ guarantees non-trivial solutions; how many free parameters you get is what Chapter 5's rank will measure.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (homogeneous, find the solutions).** Find $\\lambda$ so that $x + y + z = 0$, $2x + y - z = 0$, $3x + 2y + \\lambda z = 0$ has a non-trivial solution, and find all such solutions.\n\n**Step 1.** $|A| = 1(\\lambda + 2) - 1(2\\lambda + 3) + 1(4 - 3) = -\\lambda$. Non-trivial solutions need $|A| = 0$, so $\\lambda = 0$.\n\n*Why only $|A|$:* a homogeneous system is always consistent, so there is no \"none\" case to rule out. The determinant alone decides.\n\n**Step 2. Solve at $\\lambda = 0$.** Subtract equation 1 from equation 2: $x - 2z = 0$, so $x = 2z$. Then equation 1 gives $y = -x - z = -3z$. Let $z = t$:",
    },
    {
      type: "math",
      latex: "(x, y, z) = (2t,\\ -3t,\\ t),\\quad t \\in \\mathbb{R},\\qquad\\text{i.e. } x : y : z = 2 : -3 : 1",
    },
    {
      type: "text",
      content:
        "**Step 3. Check** in the equation you did not use: $3(2t) + 2(-3t) + 0 = 0$ ✓. (It had to work: at $\\lambda = 0$, equation 3 is equation 1 + equation 2.)",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (real world): balancing a chemical equation.** Propane burns in oxygen: $a\\,\\mathrm{C_3H_8} + b\\,\\mathrm{O_2} \\to c\\,\\mathrm{CO_2} + d\\,\\mathrm{H_2O}$. Find the smallest whole-number coefficients.\n\n**Step 1. One equation per element** (atoms in = atoms out).\n\nCarbon: $3a = c$. Hydrogen: $8a = 2d$. Oxygen: $2b = 2c + d$.\n\n**Step 2. Recognise the type.** Move everything to one side: $3a - c = 0$, $8a - 2d = 0$, $2b - 2c - d = 0$. Every constant is 0, so the system is **homogeneous**: $(0, 0, 0, 0)$ always works (burn nothing, get nothing). It has 3 equations in 4 unknowns, so at least one unknown is free and a non-trivial solution is guaranteed.\n\n**Step 3. Solve with $a = t$.** $c = 3t$, $d = 4t$, and $2b = 6t + 4t$, so $b = 5t$.\n\n**Step 4. Pick the smallest whole numbers:** $t = 1$ gives $\\mathrm{C_3H_8} + 5\\,\\mathrm{O_2} \\to 3\\,\\mathrm{CO_2} + 4\\,\\mathrm{H_2O}$. Check oxygen: $10 = 6 + 4$ ✓.\n\n*Why the free parameter is physical:* doubling every coefficient (burning twice as much) balances just as well. The line of solutions $(t, 5t, 3t, 4t)$ is exactly that freedom.",
    },
    {
      type: "quiz",
      id: "mx4-4-q1",
      variant: "concept",
      question: "A $3 \\times 3$ system $AX = B$ has $|A| = 0$. A classmate writes \"no solution\". What is wrong?",
      options: [
        { text: "$|A| = 0$ allows no solution **or** infinitely many; you must check $(\\operatorname{adj}A)B$ and then solve.", correct: true, feedback: "Exactly. A squashing $A$ misses some targets but hits others infinitely often." },
        { text: "Nothing: $|A| = 0$ always means no solution.", feedback: "Coincident planes (or lines) have $|A| = 0$ and infinitely many solutions." },
        { text: "$|A| = 0$ always means infinitely many solutions.", feedback: "Parallel planes have $|A| = 0$ and no solution. Neither conclusion is automatic." },
      ],
    },
    {
      type: "quiz",
      id: "mx4-4-q2",
      variant: "concept",
      question:
        "For $x + y + z = 1$, $x + y + z = 2$, $x + y + z = 3$, all of $D, D_1, D_2, D_3$ are 0. How many solutions are there?",
      options: [
        { text: "None", correct: true, feedback: "Three parallel planes never meet. So $D = D_1 = D_2 = D_3 = 0$ does not guarantee infinitely many solutions." },
        { text: "Infinitely many, because all four determinants are zero", feedback: "That rule works for two lines, but not in three dimensions. Here subtracting equations gives $0 = 1$." },
        { text: "Exactly one", feedback: "A unique solution needs $D \\ne 0$." },
      ],
    },
    {
      type: "quiz",
      id: "mx4-4-q3",
      variant: "practice",
      question: "For which $k$ does $kx + 2y = 3$, $2x + y = 1$ have **no** solution?",
      options: [
        { text: "$k = 4$", correct: true, feedback: "$D = k - 4 = 0$ at $k = 4$. Then $4x + 2y = 3$ and $4x + 2y = 2$ (doubling the second) are parallel and distinct." },
        { text: "$k = 1$", feedback: "At $k = 1$, $D = 1 - 4 = -3 \\ne 0$, so there is a unique solution." },
        { text: "No value of $k$", feedback: "Set $D = k\\cdot1 - 2\\cdot2 = 0$ and check the constants." },
      ],
      hint: "First find where $D = 0$, then check whether the constants are in the same ratio.",
    },
    {
      type: "quiz",
      id: "mx4-4-q4",
      variant: "practice",
      question: "For which values of $k$ does $x + ky = 0$, $kx + 4y = 0$ have a non-trivial solution?",
      options: [
        { text: "$k = 2$ or $k = -2$", correct: true, feedback: "$|A| = 4 - k^2 = 0$ gives $k = \\pm 2$. For $k = 2$, $(2, -1)$ works in both equations." },
        { text: "$k = 4$ only", feedback: "The determinant is $1\\cdot4 - k\\cdot k = 4 - k^2$, not $4 - k$." },
        { text: "Every $k$, because homogeneous systems always have solutions", feedback: "They always have the *trivial* solution. Non-trivial ones need $|A| = 0$." },
      ],
    },
    {
      type: "quiz",
      id: "mx4-4-q5",
      variant: "practice",
      question: "For $AX = B$ you find $|A| = 0$ and $(\\operatorname{adj}A)B = \\begin{pmatrix} 2 \\\\ 0 \\\\ -1 \\end{pmatrix}$. The system is:",
      options: [
        { text: "Inconsistent", correct: true, feedback: "A solution would force $(\\operatorname{adj}A)B = |A|X = O$. It is not $O$, so there is no solution." },
        { text: "Consistent with infinitely many solutions", feedback: "That needs $(\\operatorname{adj}A)B = O$ (and a check). A non-zero result rules solutions out." },
        { text: "Consistent with a unique solution", feedback: "Unique needs $|A| \\ne 0$." },
      ],
    },
    {
      type: "quiz",
      id: "mx4-4-q6",
      variant: "practice",
      question: "Classify $2x - 4y = 6$, $x - 2y = 3$.",
      options: [
        { text: "Infinitely many solutions", correct: true, feedback: "$D = -4 + 4 = 0$, $D_x = 6(-2) - (-4)(3) = 0$, $D_y = 2\\cdot3 - 6\\cdot1 = 0$. The first equation is twice the second: the same line." },
        { text: "No solution", feedback: "That needs a non-zero $D_x$ or $D_y$. Here both are 0, and the equations describe one line." },
        { text: "Exactly one solution", feedback: "$D = 2(-2) - (-4)(1) = 0$, so the solution cannot be unique." },
      ],
      hint: "Compute $D$ first; if it is 0, compute $D_x$ and $D_y$.",
    },
    {
      type: "quiz",
      id: "mx4-4-q7",
      variant: "practice",
      question:
        "Balance $a\\,\\mathrm{CH_4} + b\\,\\mathrm{O_2} \\to c\\,\\mathrm{CO_2} + d\\,\\mathrm{H_2O}$ with the smallest whole numbers. What is $(a, b, c, d)$?",
      options: [
        { text: "$(1, 2, 1, 2)$", correct: true, feedback: "C: $a = c$. H: $4a = 2d$. O: $2b = 2c + d$. With $a = 1$: $c = 1$, $d = 2$, $b = 2$. Oxygen check: $4 = 2 + 2$ ✓." },
        { text: "$(1, 1, 1, 2)$", feedback: "Carbon and hydrogen balance, but oxygen does not: $2$ atoms on the left against $2 + 2 = 4$ on the right." },
        { text: "$(2, 4, 2, 4)$", feedback: "This balances (it is $t = 2$ on the solution line $(t, 2t, t, 2t)$), but it is not the smallest. Take $t = 1$." },
      ],
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "row-reduction-gaussian-elimination",
  title: "4.5 · Row Reduction: Gaussian Elimination",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "Determinant tests can leave you with \"infinitely many or none, check\". Row reduction is the check. It is the elimination you already do by hand, organised so that it always finishes and always tells you which of the three cases you are in. It also works when $D = 0$ and for any number of equations.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Augmented matrix and the three moves",
      content:
        "Write $AX = B$ as the **augmented matrix** $[A \\mid B]$: coefficients, a bar, then constants. Each row is an equation. Three **elementary row operations** never change the solution set:\n\n**Swap** two rows ($R_i \\leftrightarrow R_j$): list the equations in another order.\n\n**Scale** a row by $k \\ne 0$ ($R_i \\to kR_i$): multiply an equation through.\n\n**Add** a multiple of one row to another ($R_i \\to R_i + kR_j$): add equations.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Echelon form",
      content:
        "A matrix is in **row echelon form** when (1) any all-zero rows are at the bottom, and (2) each non-zero row's first non-zero entry (its **pivot**) is strictly to the right of the pivot above. It is in **reduced** row echelon form if, in addition, every pivot is 1 and is the only non-zero entry in its column.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (unique).** Solve $x + y + z = 6$, $2x - y + z = 3$, $x + 2y - z = 2$.",
    },
    {
      type: "math",
      latex:
        "\\left[\\begin{array}{ccc|c} 1 & 1 & 1 & 6 \\\\ 2 & -1 & 1 & 3 \\\\ 1 & 2 & -1 & 2 \\end{array}\\right] \\xrightarrow[R_3 \\to R_3 - R_1]{R_2 \\to R_2 - 2R_1} \\left[\\begin{array}{ccc|c} 1 & 1 & 1 & 6 \\\\ 0 & -3 & -1 & -9 \\\\ 0 & 1 & -2 & -4 \\end{array}\\right] \\xrightarrow{R_2 \\leftrightarrow R_3} \\left[\\begin{array}{ccc|c} 1 & 1 & 1 & 6 \\\\ 0 & 1 & -2 & -4 \\\\ 0 & -3 & -1 & -9 \\end{array}\\right] \\xrightarrow{R_3 \\to R_3 + 3R_2} \\left[\\begin{array}{ccc|c} 1 & 1 & 1 & 6 \\\\ 0 & 1 & -2 & -4 \\\\ 0 & 0 & -7 & -21 \\end{array}\\right]",
    },
    {
      type: "text",
      content:
        "**Back-substitute** from the bottom: $-7z = -21$ gives $z = 3$. Then $y - 2(3) = -4$ gives $y = 2$. Then $x + 2 + 3 = 6$ gives $x = 1$. The same $(1, 2, 3)$ that Cramer gave in lesson 4.3.",
    },
    {
      type: "interactive",
      config: {
        component: "matrix-row-reducer",
        mode: "solve",
        matrix: [
          [1, 1, 1],
          [2, -1, 1],
          [1, 2, -1],
        ],
        augmented: [[6], [3], [2]],
        target: "echelon",
        caption:
          "Your turn. Clear column 1 below the pivot (R₂ → R₂ − 2R₁, R₃ → R₃ − R₁), then clear column 2. Your steps may differ from the worked example and still reach a valid echelon form. Keep going to reduced form and the tool writes out x, y, z.",
      },
    },
    {
      type: "text",
      content:
        "**Worked example 2 (no solution).** Solve $x + y + z = 2$, $x + 2y + 3z = 5$, $2x + 3y + 4z = 9$.",
    },
    {
      type: "math",
      latex:
        "\\left[\\begin{array}{ccc|c} 1 & 1 & 1 & 2 \\\\ 1 & 2 & 3 & 5 \\\\ 2 & 3 & 4 & 9 \\end{array}\\right] \\xrightarrow[R_3 \\to R_3 - 2R_1]{R_2 \\to R_2 - R_1} \\left[\\begin{array}{ccc|c} 1 & 1 & 1 & 2 \\\\ 0 & 1 & 2 & 3 \\\\ 0 & 1 & 2 & 5 \\end{array}\\right] \\xrightarrow{R_3 \\to R_3 - R_2} \\left[\\begin{array}{ccc|c} 1 & 1 & 1 & 2 \\\\ 0 & 1 & 2 & 3 \\\\ 0 & 0 & 0 & 2 \\end{array}\\right]",
    },
    {
      type: "text",
      content:
        "The last row reads $0x + 0y + 0z = 2$, that is $0 = 2$. No choice of $x, y, z$ can make that true, so the system is **inconsistent**. The reason is visible in the original: equation 1 + equation 2 gives $2x + 3y + 4z = 7$, but equation 3 demands 9.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (infinitely many).** Solve $x + y + z = 6$, $x + 2y + 3z = 14$, $2x + 3y + 4z = 20$ (lesson 4.4's system).",
    },
    {
      type: "math",
      latex:
        "\\left[\\begin{array}{ccc|c} 1 & 1 & 1 & 6 \\\\ 1 & 2 & 3 & 14 \\\\ 2 & 3 & 4 & 20 \\end{array}\\right] \\xrightarrow[R_3 \\to R_3 - 2R_1]{R_2 \\to R_2 - R_1} \\left[\\begin{array}{ccc|c} 1 & 1 & 1 & 6 \\\\ 0 & 1 & 2 & 8 \\\\ 0 & 1 & 2 & 8 \\end{array}\\right] \\xrightarrow{R_3 \\to R_3 - R_2} \\left[\\begin{array}{ccc|c} 1 & 1 & 1 & 6 \\\\ 0 & 1 & 2 & 8 \\\\ 0 & 0 & 0 & 0 \\end{array}\\right]",
    },
    {
      type: "text",
      content:
        "Now the last row reads $0 = 0$. It is always true, so it puts no restriction on anything. Only two real equations remain for three unknowns. Column 3 has no pivot, so $z$ is a **free variable**: call it $t$. Back-substitute:\n\n$y + 2t = 8 \\Rightarrow y = 8 - 2t$, and $x + (8 - 2t) + t = 6 \\Rightarrow x = t - 2$.\n\nThe **parametric solution** is $(x, y, z) = (t - 2,\\ 8 - 2t,\\ t)$, $t \\in \\mathbb{R}$. For example $t = 0$ gives $(-2, 8, 0)$ and $t = 4$ gives $(2, 0, 4)$. Both check in all three equations.",
    },
    {
      type: "interactive",
      config: {
        component: "matrix-row-reducer",
        mode: "solve",
        matrix: [
          [1, 1, 1],
          [1, 2, 3],
          [2, 3, 4],
        ],
        augmented: [[6], [14], [20]],
        target: "reduced",
        caption:
          "Reduce this one all the way to reduced row echelon form. A zero row appears, z becomes free, and the tool writes x and y in terms of z. Compare with x = t − 2, y = 8 − 2t.",
      },
    },
    {
      type: "callout",
      variant: "warning",
      title: "A zero row does not mean \"no solution\"",
      content:
        "Look at the **whole** row, including the entry after the bar.\n\n$[\\,0\\;0\\;0 \\mid c\\,]$ with $c \\ne 0$ means $0 = c$: **inconsistent**.\n\n$[\\,0\\;0\\;0 \\mid 0\\,]$ means $0 = 0$: a redundant equation. If it leaves a column without a pivot, that variable is free and you get **infinitely many** solutions.",
    },
    {
      type: "table",
      headers: ["Echelon form of $[A \\mid B]$ ($n$ unknowns)", "Solutions"],
      rows: [
        ["Some row $[\\,0 \\cdots 0 \\mid c\\,]$ with $c \\ne 0$", "None"],
        ["No such row, and a pivot in every one of the $n$ columns", "Exactly one"],
        ["No such row, and some column without a pivot", "Infinitely many (one parameter per free column)"],
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 4 (word problem): a jar of coins.** A jar holds 30 coins of ₹1, ₹2 and ₹5, worth ₹80 in all. There are 2 more ₹1 coins than ₹5 coins. How many of each?\n\n**Step 1. Equations.** Let $a, b, c$ be the numbers of ₹1, ₹2, ₹5 coins. Count: $a + b + c = 30$. Value: $a + 2b + 5c = 80$. Comparison: $a - c = 2$.\n\n*Why write $a - c = 2$ with a 0 for $b$:* the augmented matrix needs every row to have an entry in every column.\n\n**Step 2. Row-reduce.** Use row 1 as the pivot row to clear column 1, then clear column 2:",
    },
    {
      type: "math",
      latex:
        "\\left[\\begin{array}{ccc|c} 1 & 1 & 1 & 30 \\\\ 1 & 2 & 5 & 80 \\\\ 1 & 0 & -1 & 2 \\end{array}\\right] \\xrightarrow[R_3 \\to R_3 - R_1]{R_2 \\to R_2 - R_1} \\left[\\begin{array}{ccc|c} 1 & 1 & 1 & 30 \\\\ 0 & 1 & 4 & 50 \\\\ 0 & -1 & -2 & -28 \\end{array}\\right] \\xrightarrow{R_3 \\to R_3 + R_2} \\left[\\begin{array}{ccc|c} 1 & 1 & 1 & 30 \\\\ 0 & 1 & 4 & 50 \\\\ 0 & 0 & 2 & 22 \\end{array}\\right]",
    },
    {
      type: "text",
      content:
        "**Step 3. Back-substitute.** $2c = 22$, so $c = 11$. Then $b + 44 = 50$, so $b = 6$. Then $a = 30 - 6 - 11 = 13$.\n\n*Why bottom-up:* echelon form leaves the last row with one unknown, and each row above adds exactly one new one.\n\n**Step 4. Check** all three facts: $13 + 6 + 11 = 30$ ✓, $13 + 12 + 55 = 80$ ✓, $13 - 11 = 2$ ✓. So 13 one-rupee, 6 two-rupee and 11 five-rupee coins.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (exam style): more equations than unknowns.** For which value of $c$ is the system $x + y = 3$, $2x - y = 0$, $3x + 2y = c$ consistent? Solve it for that $c$.\n\n**Step 1. Why not determinants?** The coefficient matrix is $3 \\times 2$, so it has no determinant. Three lines in a plane usually have no common point; the question is when all three pass through one point.\n\n**Step 2. Row-reduce with $c$ left as a letter.**",
    },
    {
      type: "math",
      latex:
        "\\left[\\begin{array}{cc|c} 1 & 1 & 3 \\\\ 2 & -1 & 0 \\\\ 3 & 2 & c \\end{array}\\right] \\xrightarrow[R_3 \\to R_3 - 3R_1]{R_2 \\to R_2 - 2R_1} \\left[\\begin{array}{cc|c} 1 & 1 & 3 \\\\ 0 & -3 & -6 \\\\ 0 & -1 & c - 9 \\end{array}\\right] \\xrightarrow{R_3 \\to R_3 - \\frac{1}{3}R_2} \\left[\\begin{array}{cc|c} 1 & 1 & 3 \\\\ 0 & -3 & -6 \\\\ 0 & 0 & c - 7 \\end{array}\\right]",
    },
    {
      type: "text",
      content:
        "**Step 3. Read the last row.** It says $0 = c - 7$. If $c \\ne 7$ that is a contradiction: no solution. If $c = 7$ it is $0 = 0$, and the system is consistent.\n\n**Step 4. Solve at $c = 7$.** $-3y = -6$ gives $y = 2$, then $x = 1$. Check the third line: $3 + 4 = 7$ ✓.\n\n*Why this works:* the first two lines always meet at $(1, 2)$. The third line passes through that point only when $c = 3(1) + 2(2) = 7$. Row reduction found that without drawing anything.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Why it always works",
      content:
        "Each operation can be undone (swap back, scale by $\\frac{1}{k}$, subtract what you added), so no solution is ever created or lost. And the process always finishes: work column by column. Once a column has its pivot and zeros beneath it, later steps never disturb it, so after at most one pass per column you reach echelon form. Row reduction is the same elimination from Class 9, done in an order that always terminates.",
    },
    {
      type: "quiz",
      id: "mx4-5-q1",
      variant: "concept",
      question: "Row-reducing $[A \\mid B]$ produces the bottom row $[\\,0\\;0\\;0 \\mid 0\\,]$ (and no row of the form $0 = c$). What does this row tell you?",
      options: [
        { text: "One equation was redundant. The system is consistent, and if a column now lacks a pivot there are infinitely many solutions.", correct: true, feedback: "$0 = 0$ is always true: it removes an equation but adds no contradiction." },
        { text: "The system has no solution.", feedback: "Only a row reading $0 = c$ with $c \\ne 0$ does that. Here the constant is 0 too." },
        { text: "The only solution is $x = y = z = 0$.", feedback: "The row says nothing about the values. It just says one equation was a combination of the others." },
      ],
    },
    {
      type: "quiz",
      id: "mx4-5-q2",
      variant: "practice",
      question:
        "An augmented matrix reduces to $\\left[\\begin{array}{ccc|c} 1 & 0 & 2 & 1 \\\\ 0 & 1 & -1 & 3 \\\\ 0 & 0 & 0 & 4 \\end{array}\\right]$. The system has:",
      options: [
        { text: "No solution", correct: true, feedback: "Row 3 says $0 = 4$." },
        { text: "Infinitely many solutions, since $z$ is free", feedback: "Check the whole zero row first: its constant is 4, so it is a contradiction." },
        { text: "The unique solution $x = 1$, $y = 3$, $z = 4$", feedback: "The 4 sits after the bar in a row with all-zero coefficients. It is not a value of $z$." },
      ],
    },
    {
      type: "quiz",
      id: "mx4-5-q3",
      variant: "practice",
      question:
        "Back-substitute: $\\left[\\begin{array}{ccc|c} 1 & 1 & 2 & 9 \\\\ 0 & 1 & 3 & 11 \\\\ 0 & 0 & 2 & 6 \\end{array}\\right]$. What is $x$?",
      options: [
        { text: "$x = 1$", correct: true, feedback: "$z = 3$, then $y = 11 - 9 = 2$, then $x = 9 - 2 - 6 = 1$." },
        { text: "$x = 9$", feedback: "That ignores the $y$ and $z$ terms in row 1. Start from the bottom row." },
        { text: "$x = 4$", feedback: "Row 1 is $x + y + 2z = 9$, so $z$ counts twice: $x = 9 - 2 - 2(3) = 1$. Getting 4 means the coefficient 2 on $z$ was dropped." },
      ],
      hint: "Solve the bottom row first, then move up.",
    },
    {
      type: "quiz",
      id: "mx4-5-q4",
      variant: "practice",
      question:
        "A system reduces to $x - 2z = 1$, $y + z = 4$ (plus a row $0 = 0$). Which is the parametric solution?",
      options: [
        { text: "$(x, y, z) = (1 + 2t,\\ 4 - t,\\ t)$", correct: true, feedback: "$z$ has no pivot, so $z = t$. Then $x = 1 + 2t$, $y = 4 - t$." },
        { text: "$(x, y, z) = (1 - 2t,\\ 4 + t,\\ t)$", feedback: "Moving $-2z$ across makes it $+2t$: $x = 1 + 2t$." },
        { text: "$(x, y, z) = (1, 4, 0)$ only", feedback: "That is just the $t = 0$ member of an infinite family." },
      ],
    },
    {
      type: "quiz",
      id: "mx4-5-q5",
      variant: "concept",
      question: "Which operation is **not** allowed while row-reducing $[A \\mid B]$?",
      options: [
        { text: "Multiplying a row by 0", correct: true, feedback: "That deletes an equation and cannot be undone, so it can create new solutions. Scaling needs $k \\ne 0$." },
        { text: "Swapping two rows", feedback: "Allowed: it just lists the equations in a different order." },
        { text: "Replacing $R_2$ by $R_2 - 5R_1$", feedback: "Allowed: subtracting a multiple of one equation from another keeps every solution." },
      ],
    },
    {
      type: "quiz",
      id: "mx4-5-q6",
      variant: "practice",
      question:
        "Zoo tickets cost ₹20 (child), ₹50 (adult) and ₹30 (senior). 50 visitors paid ₹1450 in all, and there were as many children as adults and seniors combined. How many adults came?",
      options: [
        { text: "10", correct: true, feedback: "$c + a + s = 50$ and $c - a - s = 0$ give $c = 25$, $a + s = 25$. Then $50a + 30s = 1450 - 500 = 950$, so $20a + 750 = 950$ and $a = 10$ ($s = 15$). Check: $500 + 500 + 450 = 1450$ ✓." },
        { text: "15", feedback: "That is the number of seniors. With $s = 15$: $a = 25 - 15 = 10$." },
        { text: "25", feedback: "That is the number of children (half of 50). Adults and seniors share the other 25." },
      ],
      hint: "Add the first and third equations to find the children first.",
    },
    {
      type: "quiz",
      id: "mx4-5-q7",
      variant: "practice",
      question: "For which $c$ is $x + y = 5$, $x - y = 1$, $2x + 3y = c$ consistent?",
      options: [
        { text: "$c = 12$", correct: true, feedback: "The first two give $x = 3$, $y = 2$. The third line passes through $(3, 2)$ only if $c = 6 + 6 = 12$. Row reduction leaves the last row as $[\\,0\\;0 \\mid c - 12\\,]$." },
        { text: "$c = 11$", feedback: "Substitute $(3, 2)$: $2(3) + 3(2) = 12$, not 11. At $c = 11$ the last row reads $0 = -1$." },
        { text: "Every $c$, because each equation is a line", feedback: "Three lines in a plane need not share a point. Only one value of $c$ makes the third line pass through $(3, 2)$." },
      ],
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "parameters-and-applications",
  title: "4.6 · Parameters and Applications",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "JEE loves a system with letters in it: \"find $\\lambda$ and $\\mu$ so that the system has no solution\". It looks like a new topic, but it is lesson 4.4 and 4.5 run in order: **first** find where $D = 0$, **then** row-reduce at those values to split \"none\" from \"infinitely many\".",
    },
    {
      type: "callout",
      variant: "tip",
      title: "The two-step recipe",
      content:
        "**Step 1.** Compute $D$ as a function of the parameter(s). Every value with $D \\ne 0$ gives a **unique** solution.\n\n**Step 2.** At each value with $D = 0$, substitute and row-reduce $[A \\mid B]$. A row $0 = c$ with $c \\ne 0$ gives **none**; otherwise you get **infinitely many**.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (the classic).** For $x + y + z = 6$, $x + 2y + 3z = 10$, $x + 2y + \\lambda z = \\mu$, find the conditions for a unique solution, no solution, and infinitely many.\n\n**Step 1.** $D = \\begin{vmatrix} 1 & 1 & 1 \\\\ 1 & 2 & 3 \\\\ 1 & 2 & \\lambda \\end{vmatrix} = 1(2\\lambda - 6) - 1(\\lambda - 3) + 1(2 - 2) = \\lambda - 3$.\n\nSo $\\lambda \\ne 3$ gives a **unique** solution, whatever $\\mu$ is.\n\n**Step 2.** At $\\lambda = 3$, equations 2 and 3 have identical left sides. $R_3 \\to R_3 - R_2$ gives the row $[\\,0\\;0\\;0 \\mid \\mu - 10\\,]$.\n\n$\\mu \\ne 10$: the row reads $0 = \\mu - 10 \\ne 0$, so **no solution**.\n\n$\\mu = 10$: the row is $0 = 0$, so **infinitely many**.",
    },
    {
      type: "table",
      headers: ["Condition", "Solutions"],
      rows: [
        ["$\\lambda \\ne 3$ (any $\\mu$)", "Unique"],
        ["$\\lambda = 3,\\ \\mu \\ne 10$", "None"],
        ["$\\lambda = 3,\\ \\mu = 10$", "Infinitely many"],
      ],
    },
    {
      type: "interactive",
      config: {
        component: "matrix-row-reducer",
        mode: "solve",
        matrix: [
          [1, 1, 1],
          [1, 2, 3],
          [1, 2, 3],
        ],
        augmented: [[6], [10], [12]],
        target: "echelon",
        caption:
          "Worked example 1 at λ = 3, μ = 12. Reduce it and watch the 0 = 2 row appear. Then imagine μ = 10: the same steps leave 0 = 0 instead.",
      },
    },
    {
      type: "text",
      content:
        "**Worked example 2 (2 × 2 with the parameter everywhere).** For which $k$ does $(k + 1)x + 8y = 4k$, $kx + (k + 3)y = 3k - 1$ have no solution?\n\n**Step 1.** $D = (k + 1)(k + 3) - 8k = k^2 - 4k + 3 = (k - 1)(k - 3)$. Unique unless $k = 1$ or $k = 3$.\n\n**Step 2a.** $k = 1$: $2x + 8y = 4$ and $x + 4y = 2$. The first is twice the second: the same line, **infinitely many**.\n\n**Step 2b.** $k = 3$: $4x + 8y = 12$, i.e. $x + 2y = 3$, and $3x + 6y = 8$, i.e. $x + 2y = \\frac{8}{3}$. Parallel and distinct: **no solution**.\n\nAnswer: $k = 3$. Notice that $D = 0$ alone would have given you two candidates, and only one of them is correct.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (JEE Main style: a case that never happens).** Discuss the system $x + y + z = 2$, $2x + 3y + 2z = 5$, $2x + 3y + (a^2 - 1)z = a + 1$ for all real $a$.\n\n**Step 1. Compute $D$ the smart way.** Rows 2 and 3 differ only in the $z$-coefficient. $R_3 \\to R_3 - R_2$ (which does not change $D$) turns row 3 into $(0,\\ 0,\\ a^2 - 3)$. Expand along that row:",
    },
    {
      type: "math",
      latex:
        "D = (a^2 - 3)\\begin{vmatrix} 1 & 1 \\\\ 2 & 3 \\end{vmatrix} = (a^2 - 3)(3 - 2) = a^2 - 3",
    },
    {
      type: "text",
      content:
        "*Why not expand directly:* you could, but a row operation that creates two zeros first turns a nine-term expansion into one product and removes the chance of a sign slip.\n\n**Step 2.** $a^2 \\ne 3$: $D \\ne 0$, **unique** solution.\n\n**Step 3. At $a^2 = 3$, row-reduce the augmented matrix.** The same move $R_3 \\to R_3 - R_2$ now gives the row $[\\,0\\;0\\;0 \\mid (a + 1) - 5\\,] = [\\,0\\;0\\;0 \\mid a - 4\\,]$.\n\n**Step 4. Read it.** At $a = \\sqrt{3}$ or $a = -\\sqrt{3}$, $a - 4 \\ne 0$, so the row says $0 = $ (non-zero): **no solution**.\n\n**Conclusion.** Unique for $|a| \\ne \\sqrt{3}$; no solution for $|a| = \\sqrt{3}$; **infinitely many for no value of $a$**. That would need $a = 4$ *and* $a^2 = 3$ at once, which is impossible.\n\n*Why this is a favourite:* an option like \"infinitely many solutions for $a = 4$\" looks tempting, because it makes the constant vanish. But at $a = 4$, $D = 13 \\ne 0$, so the solution is unique.",
    },
    {
      type: "text",
      content:
        "**Application 1: mixture.** How many litres of a 10% acid solution and a 25% acid solution make 30 L of a 20% solution?\n\nLet $x$, $y$ be the litres used. Volume: $x + y = 30$. Acid: $0.10x + 0.25y = 0.20 \\times 30 = 6$, i.e. $2x + 5y = 120$.\n\nCramer: $D = 5 - 2 = 3$, $D_x = 150 - 120 = 30$, $D_y = 120 - 60 = 60$. So $x = 10$ L and $y = 20$ L. Check the acid: $1 + 5 = 6$ ✓.",
    },
    {
      type: "text",
      content:
        "**Application 2: investment.** ₹10,000 is split among schemes paying 5%, 8% and 10% a year. The yearly interest is ₹780, and the amount in the 10% scheme equals the other two combined. Find each amount.\n\n**Set up.** $x + y + z = 10000$, $5x + 8y + 10z = 78000$ (interest × 100), $x + y - z = 0$.\n\n**Row-reduce** (it is the fastest here): $R_3 \\to R_3 - R_1$ gives $-2z = -10000$, so $z = 5000$. Then $x + y = 5000$ and $5x + 8y = 28000$. Substituting $x = 5000 - y$: $25000 + 3y = 28000$, so $y = 1000$ and $x = 4000$.\n\nCheck the interest: $200 + 80 + 500 = 780$ ✓.",
    },
    {
      type: "text",
      content:
        "**Application 3: a traffic network.** Three one-way roads form a loop: $x_1$ cars/hour from junction P to Q, $x_2$ from Q to R, $x_3$ from R to P. At each junction, cars in = cars out. External roads: 400 enter and 100 leave at P, 200 enter and 600 leave at Q, 500 enter and 400 leave at R.\n\n**P:** $400 + x_3 = x_1 + 100$, i.e. $x_1 - x_3 = 300$. **Q:** $x_1 + 200 = x_2 + 600$, i.e. $x_1 - x_2 = 400$. **R:** $x_2 + 500 = x_3 + 400$, i.e. $x_3 - x_2 = 100$.\n\n$D = \\begin{vmatrix} 1 & 0 & -1 \\\\ 1 & -1 & 0 \\\\ 0 & -1 & 1 \\end{vmatrix} = 1(-1) - 0 + (-1)(-1) = 0$, and (Q) $-$ (P) is exactly (R), so the system is consistent with **infinitely many** solutions. Let $x_2 = t$: then $x_1 = t + 400$ and $x_3 = t + 100$.\n\nThe free parameter means something real: any number of extra cars can circle the loop without changing a junction count. Traffic cannot flow backwards on a one-way road, so $t \\ge 0$, and the minimum flows are $x_1 = 400$, $x_2 = 0$, $x_3 = 100$.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (fewer equations than unknowns).** Solve $x + y + z = 3$, $x + 2y + 3z = 4$.\n\nHere $A = \\begin{pmatrix} 1 & 1 & 1 \\\\ 1 & 2 & 3 \\end{pmatrix}$ is $2 \\times 3$. It has no determinant and no inverse, so neither $A^{-1}B$ nor Cramer can even start. Row reduction does not care about the shape.\n\n**Step 1.** $R_2 \\to R_2 - R_1$: $\\left[\\begin{array}{ccc|c} 1 & 1 & 1 & 3 \\\\ 0 & 1 & 2 & 1 \\end{array}\\right]$.\n\n**Step 2.** Column 3 has no pivot, so $z = t$ is free. Then $y = 1 - 2t$ and $x = 3 - y - z = 2 + t$.\n\nSolution: $(x, y, z) = (2 + t,\\ 1 - 2t,\\ t)$. Check equation 2: $(2 + t) + 2(1 - 2t) + 3t = 4$ ✓. Two planes in space that are not parallel meet in a line, and that is exactly this one-parameter family.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Determinant methods need a square system",
      content:
        "The inverse method and Cramer's rule both need a **square** coefficient matrix: as many equations as unknowns. With 2 equations in 3 unknowns, or 3 equations in 2 unknowns, $|A|$ does not exist. Row-reduce instead. Fewer equations than unknowns can never give a unique solution (some column must lack a pivot); more equations than unknowns is often inconsistent, but not always.",
    },
    {
      type: "table",
      headers: ["If the question...", "Use", "Reason"],
      rows: [
        ["says \"using matrices\" / \"matrix method\"", "Inverse: $X = A^{-1}B$", "It is the method being examined"],
        ["asks for one unknown, or is $2 \\times 2$", "Cramer", "Fewest determinants"],
        ["has a parameter", "$D$ first, then row-reduce at $D = 0$", "Splits unique / none / infinite cleanly"],
        ["has $D = 0$, or the number of equations ≠ number of unknowns (or more than 3 unknowns)", "Row reduction", "Determinants exist only for square $A$; row reduction never gets stuck"],
        ["is homogeneous", "$|A| = 0$ ⇔ non-trivial", "It is always consistent"],
      ],
    },
    {
      type: "quiz",
      id: "mx4-6-q1",
      variant: "practice",
      question:
        "For $x + y + z = 3$, $x + 2y + 3z = 4$, $x + 4y + \\lambda z = \\mu$, when is there **no** solution?",
      options: [
        { text: "$\\lambda = 7$ and $\\mu \\ne 6$", correct: true, feedback: "$D = \\lambda - 7$. At $\\lambda = 7$: $R_2 - R_1 = [0\\;1\\;2 \\mid 1]$, $R_3 - R_1 = [0\\;3\\;6 \\mid \\mu - 3]$, then subtracting 3 times the first gives $[0\\;0\\;0 \\mid \\mu - 6]$." },
        { text: "$\\lambda = 7$ and $\\mu = 6$", feedback: "Then the last row is $0 = 0$: infinitely many solutions." },
        { text: "$\\lambda \\ne 7$", feedback: "$D \\ne 0$ gives a unique solution." },
      ],
      hint: "Expand $D$ along row 1, then row-reduce at the value that makes it zero.",
    },
    {
      type: "quiz",
      id: "mx4-6-q2",
      variant: "concept",
      question:
        "A student finds $D = (k - 1)(k - 3)$ and writes \"no solution for $k = 1$ or $k = 3$\". What is the flaw?",
      options: [
        { text: "$D = 0$ only rules out uniqueness; each value must be checked, and one may give infinitely many.", correct: true, feedback: "In worked example 2, $k = 1$ gives coincident lines and only $k = 3$ gives no solution." },
        { text: "There is no flaw.", feedback: "Substitute $k = 1$: $2x + 8y = 4$ and $x + 4y = 2$ are the same line." },
        { text: "The student should have set $D_x = 0$ instead.", feedback: "$D$ is the right first step. The error is stopping there." },
      ],
    },
    {
      type: "quiz",
      id: "mx4-6-q3",
      variant: "practice",
      question:
        "A 30% alloy and a 50% alloy are melted together to make 20 kg of a 45% alloy. How much of the 30% alloy is used?",
      options: [
        { text: "5 kg", correct: true, feedback: "$x + y = 20$, $0.3x + 0.5y = 9$, so $3x + 5y = 90$. Then $3x + 100 - 5x = 90$ gives $x = 5$ (and $y = 15$). Check: $1.5 + 7.5 = 9$ ✓." },
        { text: "15 kg", feedback: "That is the amount of the 50% alloy. The mix must lean towards the 50% one to average 45%." },
        { text: "10 kg", feedback: "Equal amounts would give a 40% alloy, not 45%." },
      ],
      hint: "One equation for the total mass, one for the amount of metal.",
    },
    {
      type: "quiz",
      id: "mx4-6-q4",
      variant: "practice",
      question: "Which value of $k$ gives **infinitely many** solutions to $x + 2y = 3$, $3x + ky = 9$?",
      options: [
        { text: "$k = 6$", correct: true, feedback: "$D = k - 6 = 0$, and then $3x + 6y = 9$ is three times the first equation: same line." },
        { text: "$k = 2$", feedback: "$D = 2 - 6 = -4 \\ne 0$: unique solution." },
        { text: "No value: $k = 6$ gives no solution", feedback: "Check the constants: $\\frac{3}{9} = \\frac{1}{3}$, the same ratio as the coefficients. The lines coincide." },
      ],
    },
    {
      type: "quiz",
      id: "mx4-6-q5",
      variant: "concept",
      question: "In the traffic network, why does the system have infinitely many solutions rather than none?",
      options: [
        { text: "The junction equations are dependent (their total is conserved), and cars can circle the loop freely.", correct: true, feedback: "Inflow equals outflow overall (1100 = 1100), so the three equations are consistent but only two are independent." },
        { text: "Because there are more unknowns than equations.", feedback: "There are three of each. The infinite family comes from the dependence, not the count." },
        { text: "Because traffic flows are always zero.", feedback: "The minimum solution still has $x_1 = 400$ and $x_3 = 100$." },
      ],
    },
    {
      type: "quiz",
      id: "mx4-6-q6",
      variant: "practice",
      question:
        "For $x + y + z = 1$, $x + 2y + z = 3$, $x + 2y + (k^2 - 3)z = k - 1$, for which $k$ is there **no** solution?",
      options: [
        { text: "$k = 2$ or $k = -2$", correct: true, feedback: "$R_3 - R_2$ gives $(0, 0, k^2 - 4 \\mid k - 4)$, so $D = k^2 - 4$. At $k = \\pm 2$ the row reads $0 = -2$ or $0 = -6$: no solution either way. Infinitely many never happens." },
        { text: "$k = 2$ only", feedback: "Check $k = -2$ too: $k^2 - 4 = 0$ and $k - 4 = -6 \\ne 0$, so it also gives no solution." },
        { text: "$k = 4$", feedback: "At $k = 4$ the constant vanishes, but $D = 16 - 4 = 12 \\ne 0$: a unique solution." },
      ],
      hint: "Subtract row 2 from row 3 in the augmented matrix.",
    },
    {
      type: "quiz",
      id: "mx4-6-q7",
      variant: "practice",
      question:
        "Each 100 g of food P gives 2 units of protein and 1 unit of iron; each 100 g of food Q gives 1 unit of protein and 3 units of iron. A diet needs exactly 8 units of protein and 9 units of iron. How much of P is needed?",
      options: [
        { text: "300 g", correct: true, feedback: "With $p$, $q$ in 100 g units: $2p + q = 8$, $p + 3q = 9$. $D = 5$, $D_p = 24 - 9 = 15$, so $p = 3$ (300 g) and $q = 2$ (200 g). Check iron: $3 + 6 = 9$ ✓." },
        { text: "200 g", feedback: "That is the amount of Q. $D_q = 18 - 8 = 10$ gives $q = 2$." },
        { text: "400 g", feedback: "400 g of P alone meets the protein ($2 \\times 4 = 8$) but gives only 4 units of iron. Both nutrients must match." },
      ],
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "matrices-chapter-4-mastery",
  title: "4.7 · Chapter 4 Mastery",
  position: 7,
  blocks: blocks([
    {
      type: "callout",
      variant: "info",
      title: "Chapter 4 in one screen",
      content:
        "**Two pictures:** rows are lines or planes that must meet; columns are directions you combine to reach $B$.\n\n**$|A| \\ne 0$:** unique solution, $X = A^{-1}B$ (left-multiply), or $x_i = D_i/D$ with $B$ in **column** $i$.\n\n**$|A| = 0$:** none or infinitely many. $(\\operatorname{adj}A)B \\ne O$ means none; $(\\operatorname{adj}A)B = O$ means you still have to check.\n\n**Homogeneous $AX = O$:** always consistent; non-trivial solutions iff $|A| = 0$.\n\n**Row reduction:** $[0 \\cdots 0 \\mid c \\ne 0]$ means none; otherwise each column without a pivot is a free parameter.\n\n**Parameters:** find where $D = 0$, then row-reduce at those values.",
    },
    {
      type: "quiz",
      id: "mx4-7-q1",
      variant: "mastery",
      question:
        "Two pens and three notebooks cost ₹62; four pens and one notebook cost ₹44. What does a notebook cost?",
      options: [
        { text: "₹16", correct: true, feedback: "$2p + 3n = 62$, $4p + n = 44$. $D = 2 - 12 = -10$, $D_n = 88 - 248 = -160$, so $n = 16$ (and $p = 7$). Check: $14 + 48 = 62$ ✓." },
        { text: "₹7", feedback: "That is the pen. Cramer for $n$ puts the constants in the notebook column." },
        { text: "₹12", feedback: "Check: $4p + 12 = 44$ gives $p = 8$, but then $16 + 36 = 52 \\ne 62$." },
      ],
    },
    {
      type: "quiz",
      id: "mx4-7-q2",
      variant: "mastery",
      question:
        "For $x + y = 2$, $y + z = 4$, $x + z = 4$: $A^{-1} = \\frac{1}{2}\\begin{pmatrix} 1 & -1 & 1 \\\\ 1 & 1 & -1 \\\\ -1 & 1 & 1 \\end{pmatrix}$. What is $z$?",
      options: [
        { text: "$z = 3$", correct: true, feedback: "Row 3 of $A^{-1}$ times $B$: $\\frac{1}{2}(-2 + 4 + 4) = 3$. Then $x = 1$, $y = 1$; check $1 + 3 = 4$ ✓." },
        { text: "$z = 6$", feedback: "You forgot the factor $\\frac{1}{2}$." },
        { text: "$z = 1$", feedback: "That is $x$ (or $y$). Use row 3 of $A^{-1}$." },
      ],
    },
    {
      type: "quiz",
      id: "mx4-7-q3",
      variant: "mastery",
      question:
        "For $x + y - z = 0$, $2x - y + z = 6$, $x + 2y + z = 7$, you find $D = -9$. What is $z$?",
      options: [
        { text: "$z = 3$", correct: true, feedback: "$D_3 = \\begin{vmatrix} 1 & 1 & 0 \\\\ 2 & -1 & 6 \\\\ 1 & 2 & 7 \\end{vmatrix} = 1(-7 - 12) - 1(14 - 6) + 0 = -27$, so $z = -27/-9 = 3$. (Full solution $(2, 1, 3)$.)" },
        { text: "$z = -3$", feedback: "Both $D_3$ and $D$ are negative, so their ratio is positive." },
        { text: "$z = 2$", feedback: "That is $x$. Put $(0, 6, 7)$ in the third column." },
      ],
    },
    {
      type: "quiz",
      id: "mx4-7-q4",
      variant: "mastery",
      question: "Which equation correctly solves $AX = B$ when $A$ is invertible?",
      options: [
        { text: "$X = A^{-1}B$", correct: true, feedback: "Left-multiply both sides by $A^{-1}$." },
        { text: "$X = BA^{-1}$", feedback: "Order matters. For a column $B$ this product is not even defined." },
        { text: "$X = (\\operatorname{adj}A)B$", feedback: "You must also divide by $|A|$: $X = \\frac{1}{|A|}(\\operatorname{adj}A)B$." },
      ],
    },
    {
      type: "quiz",
      id: "mx4-7-q5",
      variant: "mastery",
      question: "A system has $|A| = 0$ and $(\\operatorname{adj}A)B = O$. What can you say?",
      options: [
        { text: "It has either infinitely many solutions or none; you must check further.", correct: true, feedback: "The adjoint test is necessary but not sufficient. Three parallel planes pass it and still have no solution." },
        { text: "It definitely has infinitely many solutions.", feedback: "Counterexample: $x + y + z = 1, 2, 3$. There $\\operatorname{adj}A = O$, yet there is no solution." },
        { text: "It definitely has no solution.", feedback: "Lesson 4.4's example 2 passes this test and has a whole line of solutions." },
      ],
    },
    {
      type: "quiz",
      id: "mx4-7-q6",
      variant: "mastery",
      question:
        "For which $k$ does $x + y + z = 0$, $x + 2y + 3z = 0$, $x + 3y + kz = 0$ have a non-trivial solution?",
      options: [
        { text: "$k = 5$", correct: true, feedback: "$|A| = 1(2k - 9) - 1(k - 3) + 1(3 - 2) = k - 5 = 0$. At $k = 5$, $(1, -2, 1)$ satisfies all three: $1 - 2 + 1 = 0$, $1 - 4 + 3 = 0$, $1 - 6 + 5 = 0$ ✓." },
        { text: "$k = \\frac{9}{2}$", feedback: "You kept only the first term of the expansion, $2k - 9$. The other two cofactor terms add $-(k - 3) + 1$, giving $|A| = k - 5$." },
        { text: "No $k$: homogeneous systems only have the trivial solution", feedback: "Only when $|A| \\ne 0$. Singular $A$ sends a whole line to the origin." },
      ],
    },
    {
      type: "quiz",
      id: "mx4-7-q7",
      variant: "mastery",
      question:
        "A system reduces to $\\left[\\begin{array}{ccc|c} 1 & 2 & -1 & 3 \\\\ 0 & 1 & 4 & 2 \\\\ 0 & 0 & 0 & 0 \\end{array}\\right]$. How many solutions are there?",
      options: [
        { text: "Infinitely many, with one free parameter", correct: true, feedback: "The zero row reads $0 = 0$. Column 3 has no pivot, so $z = t$ is free." },
        { text: "None, because there is a zero row", feedback: "Only a zero row with a non-zero constant is a contradiction. This one is $0 = 0$." },
        { text: "Exactly one", feedback: "Uniqueness needs a pivot in every column. Column 3 has none." },
      ],
    },
    {
      type: "quiz",
      id: "mx4-7-q8",
      variant: "mastery",
      question:
        "For $x + y + z = 3$, $x + 2y + 3z = 5$, $x + 3y + \\lambda z = \\mu$, which condition gives **infinitely many** solutions?",
      options: [
        { text: "$\\lambda = 5$, $\\mu = 7$", correct: true, feedback: "$D = \\lambda - 5$. At $\\lambda = 5$: $R_2 - R_1 = [0\\;1\\;2 \\mid 2]$, $R_3 - R_1 = [0\\;2\\;4 \\mid \\mu - 3]$, and subtracting twice the first leaves $[0\\;0\\;0 \\mid \\mu - 7]$. At $\\mu = 7$ that is $0 = 0$." },
        { text: "$\\lambda = 5$, $\\mu \\ne 7$", feedback: "Then the last row reads $0 = \\mu - 7 \\ne 0$: no solution." },
        { text: "$\\lambda \\ne 5$", feedback: "$D = \\lambda - 5 \\ne 0$ gives exactly one solution." },
      ],
      hint: "Expand $D$ along row 1, then row-reduce at the value of $\\lambda$ that makes it zero.",
    },
    {
      type: "quiz",
      id: "mx4-7-q9",
      variant: "mastery",
      question:
        "In the column picture, $A$'s two columns are $(1, 3)$ and $(2, 6)$. For which $B$ does $AX = B$ have solutions?",
      options: [
        { text: "$B = (4, 12)$", correct: true, feedback: "Both columns lie on the line $y = 3x$, so only targets on that line are reachable. $(4, 12)$ is on it, and is reached in infinitely many ways." },
        { text: "$B = (4, 10)$", feedback: "$(4, 10)$ is not on $y = 3x$, and every combination of the columns is." },
        { text: "Every $B$", feedback: "Parallel columns span only a line, not the plane. $D = 6 - 6 = 0$." },
      ],
    },
    {
      type: "quiz",
      id: "mx4-7-q10",
      variant: "mastery",
      question:
        "A purse holds 20 coins of ₹1, ₹2 and ₹5, worth ₹50 in all. There are twice as many ₹2 coins as ₹5 coins. How many ₹5 coins are there?",
      options: [
        { text: "5", correct: true, feedback: "Let $x, y, z$ count the ₹1, ₹2, ₹5 coins: $x + y + z = 20$, $x + 2y + 5z = 50$, $y - 2z = 0$. Substituting $y = 2z$: $x + 3z = 20$ and $x + 9z = 50$, so $6z = 30$, $z = 5$, $y = 10$, $x = 5$. Check: $5 + 20 + 25 = 50$ ✓." },
        { text: "10", feedback: "That is the number of ₹2 coins ($y = 2z$). The question asks for $z$." },
        { text: "4", feedback: "Check: $z = 4$ gives $y = 8$, $x = 8$, worth $8 + 16 + 20 = 44 \\ne 50$." },
      ],
      hint: "One equation for the count, one for the value, one for \"twice as many\". Write the missing unknown with coefficient 0.",
    },
    {
      type: "quiz",
      id: "mx4-7-q11",
      variant: "mastery",
      question:
        "A system reduces to $\\left[\\begin{array}{ccc|c} 1 & -1 & 2 & 4 \\\\ 0 & 2 & 1 & 1 \\\\ 0 & 0 & 0 & 3 \\end{array}\\right]$. How many solutions are there?",
      options: [
        { text: "None", correct: true, feedback: "Row 3 reads $0x + 0y + 0z = 3$, that is $0 = 3$. The system is inconsistent." },
        { text: "Infinitely many, since column 3 has no pivot", feedback: "Before counting free variables, read every zero row in full. This one ends in 3, a contradiction." },
        { text: "Exactly one", feedback: "A unique solution needs a pivot in every column and no row $0 = c$. This fails both." },
      ],
    },
    {
      type: "quiz",
      id: "mx4-7-q12",
      variant: "mastery",
      question:
        "You row-reduce a **homogeneous** system $AX = O$. Can a row $[\\,0\\;0\\;0 \\mid c\\,]$ with $c \\ne 0$ ever appear?",
      options: [
        { text: "No. The constant column starts as all zeros and row operations keep it that way, so a homogeneous system is always consistent.", correct: true, feedback: "Adding, scaling or swapping zeros only ever gives zeros. And $X = O$ always works anyway." },
        { text: "Yes, whenever $|A| = 0$.", feedback: "$|A| = 0$ for a homogeneous system means infinitely many solutions, never none. The bar column stays 0." },
        { text: "Yes, if the equations are inconsistent.", feedback: "A homogeneous system cannot be inconsistent: the trivial solution $X = O$ always satisfies it." },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "The case analysis in this chapter (determinants, adjoint tests, zero rows) has one clean summary: **rank**, the number of dimensions that survive a transformation. Chapter 5 shows that the whole chapter comes down to comparing rank $A$ with rank $[A \\mid B]$, and then finds the directions a matrix does not turn at all.",
    },
  ]),
};

export const matricesChapter4Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lessonMastery,
];
