import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Matrices Chapter 0 — Matrices: Grids That Move the Plane.
 * Vocabulary first (order, entries, types, equality, addition, scalar
 * multiples), then the idea the whole course runs on: the columns of a
 * matrix are where the basis vectors land, so a matrix moves the plane.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "what-a-matrix-is",
  title: "0.1 · What a Matrix Is",
  position: 1,
  blocks: blocks([
    {
      type: "video",
      src: "/videos/mx-0-matrices-grids-that-move-the-plane.mp4",
      poster: "/videos/mx-0-matrices-grids-that-move-the-plane.jpg",
      title: "Chapter 0 overview video",
      caption:
        "A narrated walk through the whole chapter. Watch it now for the big picture, or come back to it as a recap.",
    },
    {
      type: "text",
      content:
        "A stationery shop keeps a notebook of how many pens, notebooks and erasers it sold each day. The owner never writes sentences like \"on Tuesday we sold 8 notebooks\". She draws a grid: one row per item, one column per day.",
    },
    {
      type: "table",
      headers: ["", "Mon", "Tue", "Wed", "Thu"],
      rows: [
        ["Pens", "12", "9", "15", "10"],
        ["Notebooks", "5", "8", "6", "7"],
        ["Erasers", "20", "14", "18", "11"],
      ],
    },
    {
      type: "text",
      content:
        "The labels matter to her, but once everyone agrees on what the rows and columns mean, the numbers alone carry all the information. Strip off the labels, put brackets around the grid, and you have a **matrix**:",
    },
    {
      type: "math",
      latex:
        "S = \\begin{pmatrix} 12 & 9 & 15 & 10 \\\\ 5 & 8 & 6 & 7 \\\\ 20 & 14 & 18 & 11 \\end{pmatrix}",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Matrix",
      content:
        "A **matrix** is a rectangular array of numbers arranged in rows and columns. The numbers are its **entries** (or elements). Rows run left to right; columns run top to bottom.",
    },
    {
      type: "text",
      content:
        "The first thing to say about any matrix is its shape. $S$ has 3 rows and 4 columns, so we say $S$ has **order $3 \\times 4$** (read \"3 by 4\"). Rows always come first. The order also tells you the number of entries: a $3 \\times 4$ matrix holds $3 \\cdot 4 = 12$ numbers.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Order and the entry $a_{ij}$",
      content:
        "A matrix with $m$ rows and $n$ columns has **order $m \\times n$**.\nThe entry in **row $i$, column $j$** is written $a_{ij}$ (for a matrix called $A$). The first subscript is the row, the second is the column. We often write $A = [a_{ij}]_{m \\times n}$.",
    },
    {
      type: "text",
      content:
        "Think of $a_{ij}$ as a street address: go down to row $i$ first, then across to column $j$. The phrase \"**R**ows before **C**olumns\" (RC, like remote control) is worth memorising, because it is the convention for the order *and* for the subscripts.",
    },
    {
      type: "text",
      content:
        "**Worked example.** Read entries of the sales matrix $S$.\n\n**Step 1.** $s_{23}$: row 2 is notebooks, column 3 is Wednesday. So $s_{23} = 6$.\n**Step 2.** $s_{31}$: row 3 is erasers, column 1 is Monday. So $s_{31} = 20$.\n**Step 3.** $s_{14}$: row 1, column 4. So $s_{14} = 10$.\n**Step 4.** Is there an $s_{41}$? No. $S$ has only 3 rows, so the row index can only be 1, 2 or 3.",
    },
    {
      type: "text",
      content:
        "**Worked example.** Write the general $2 \\times 3$ matrix.\n\nEvery entry is labelled by its address, row first:",
    },
    {
      type: "math",
      latex:
        "A = \\begin{pmatrix} a_{11} & a_{12} & a_{13} \\\\ a_{21} & a_{22} & a_{23} \\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "Notice what stays fixed. Along a row the first subscript stays the same; down a column the second subscript stays the same. If you see $a_{21}, a_{22}, a_{23}$ you are reading across row 2.",
    },
    {
      type: "text",
      content:
        "**Worked example (a shopping list as a matrix).** Three friends go to the fruit market. Asha buys 2 apples, 5 bananas, 1 mango and no oranges. Bhavin buys no apples, 6 bananas, 3 mangoes and 2 oranges. Chitra buys 4 apples, no bananas, 2 mangoes and 5 oranges. Record this as a matrix $F$ with one row per friend and one column per fruit (apples, bananas, mangoes, oranges).\n\n**Step 1: fix the meaning of rows and columns.** Rows = friends (Asha, Bhavin, Chitra); columns = fruits in the order given. *Why:* the numbers only mean something once everyone agrees on the layout.\n**Step 2: fill one row per friend.** A \"no apples\" is still an entry: it is 0, not a blank.",
    },
    {
      type: "math",
      latex:
        "F = \\begin{pmatrix} 2 & 5 & 1 & 0 \\\\ 0 & 6 & 3 & 2 \\\\ 4 & 0 & 2 & 5 \\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "**Step 3: order.** 3 friends (rows) and 4 fruits (columns): $F$ is $3 \\times 4$, with $12$ entries.\n**Step 4: read addresses.** $f_{23}$ is row 2 (Bhavin), column 3 (mangoes): $f_{23} = 3$. $f_{32}$ is Chitra's bananas: $f_{32} = 0$. *Why they differ:* swapping the subscripts swaps the person and the fruit.\n**Step 5: a question the matrix answers quickly.** Total bananas bought = everything in column 2 = $5 + 6 + 0 = 11$. Everything Asha bought = row 1 = $2 + 5 + 1 + 0 = 8$ fruits.\n**Step 6: what if we had chosen fruits as rows?** Then the same data is a $4 \\times 3$ matrix, and Bhavin's mangoes move to row 3, column 2. Both layouts are fine; you just must say which one you are using.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Two slips that cost marks",
      content:
        "**\"Order is columns × rows.\"** No. A matrix with 2 rows and 5 columns is $2 \\times 5$, never $5 \\times 2$. Those are different shapes.\n**\"$a_{23}$ is column 2, row 3.\"** No. $a_{23}$ is row 2, column 3. The same rule, rows first, governs both the order and the subscripts.",
    },
    {
      type: "text",
      content:
        "**Worked example (CBSE board style).** In the matrix below, write (i) the order, (ii) the number of elements, and (iii) the elements $a_{13}, a_{21}, a_{33}, a_{24}, a_{23}$.",
    },
    {
      type: "math",
      latex:
        "A = \\begin{pmatrix} 2 & 5 & 19 & -7 \\\\ 35 & -2 & \\frac{5}{2} & 12 \\\\ \\sqrt{3} & 1 & -5 & 17 \\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "**Step 1: order.** Count rows first (3), then columns (4): order $3 \\times 4$.\n**Step 2: number of elements.** $3 \\times 4 = 12$. *Why multiply:* each of the 3 rows holds one entry for each of the 4 columns.\n**Step 3: read each address, row first.**\n$a_{13}$: row 1, column 3 $\\Rightarrow 19$.\n$a_{21}$: row 2, column 1 $\\Rightarrow 35$.\n$a_{33}$: row 3, column 3 $\\Rightarrow -5$.\n$a_{24}$: row 2, column 4 $\\Rightarrow 12$.\n$a_{23}$: row 2, column 3 $\\Rightarrow \\frac{5}{2}$.\n**Step 4: check for impossible addresses.** Every requested subscript has row $\\le 3$ and column $\\le 4$, so all five exist. An $a_{42}$ would not.",
    },
    {
      type: "text",
      content:
        "Some shapes come up so often they have names. Each one is only about shape (or, for the zero matrix, about the entries). None of them is a new kind of object.",
    },
    {
      type: "table",
      headers: ["Name", "Shape", "Example"],
      rows: [
        ["Row matrix", "$1 \\times n$ (one row)", "$\\begin{pmatrix} 3 & -1 & 4 \\end{pmatrix}$, order $1 \\times 3$"],
        ["Column matrix", "$m \\times 1$ (one column)", "$\\begin{pmatrix} 2 \\\\ 0 \\\\ 7 \\end{pmatrix}$, order $3 \\times 1$"],
        ["Square matrix", "$n \\times n$ (rows = columns)", "$\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}$, order 2"],
        ["Rectangular matrix", "$m \\times n$ with $m \\ne n$", "$\\begin{pmatrix} 1 & 0 & 5 \\\\ 2 & 6 & 1 \\end{pmatrix}$, order $2 \\times 3$"],
        ["Zero (null) matrix $O$", "any order, every entry 0", "$\\begin{pmatrix} 0 & 0 \\\\ 0 & 0 \\end{pmatrix}$"],
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Column matrices are vectors",
      content:
        "A column matrix like $\\begin{pmatrix} 2 \\\\ -1 \\end{pmatrix}$ is exactly how we will write a point or arrow in the plane. Keep that in mind: by lesson 0.4 matrices will be acting on these columns and moving them.",
    },
    {
      type: "text",
      content:
        "A square matrix of order $n$ has a **main diagonal**: the entries $a_{11}, a_{22}, \\ldots, a_{nn}$, running from top-left to bottom-right. Many special matrices in Chapter 1 are defined by what happens on and off this diagonal.",
    },
    {
      type: "quiz",
      id: "mx0-1-q1",
      variant: "concept",
      question: "A matrix has 2 rows and 5 columns. What is its order?",
      options: [
        { text: "$2 \\times 5$", correct: true, feedback: "Rows first, then columns." },
        { text: "$5 \\times 2$", feedback: "That would be 5 rows and 2 columns, a tall thin matrix. The order always lists rows first." },
        { text: "$10$", feedback: "10 is the number of entries. The order describes the shape, $2 \\times 5$." },
        { text: "$7$", feedback: "7 is rows + columns. The order isn't a single number: it names both counts, rows first, as $2 \\times 5$." },
      ],
    },
    {
      type: "quiz",
      id: "mx0-1-q2",
      variant: "concept",
      question: "In a matrix $A$, where is the entry $a_{23}$?",
      options: [
        { text: "Row 2, column 3", correct: true, feedback: "The first subscript is the row, the second is the column." },
        { text: "Column 2, row 3", feedback: "This is the classic slip. Subscripts follow the same rule as the order: row first." },
        { text: "The 23rd entry, counting across", feedback: "$a_{23}$ is an address with two parts, not a single count." },
      ],
    },
    {
      type: "quiz",
      id: "mx0-1-q3",
      variant: "practice",
      question:
        "Let $A = \\begin{pmatrix} 3 & -1 & 4 \\\\ 0 & 7 & 2 \\end{pmatrix}$. What is $a_{13} + a_{21}$?",
      options: [
        { text: "$4$", correct: true, feedback: "$a_{13} = 4$ (row 1, column 3) and $a_{21} = 0$ (row 2, column 1), so the sum is 4." },
        { text: "$-1$", feedback: "You may have read $a_{21}$ as column 2, row 1, which is $-1$. Row comes first." },
        { text: "$6$", feedback: "You added $a_{23} = 2$. $a_{21}$ is row 2, **column 1**, which is 0, so the sum is $4 + 0$." },
        { text: "$11$", feedback: "7 is $a_{22}$ (row 2, column 2). $a_{21}$ is row 2, column 1, which is 0." },
      ],
      hint: "Go down to the row first, then across to the column.",
    },
    {
      type: "quiz",
      id: "mx0-1-q4",
      variant: "practice",
      question: "Which of these is a column matrix?",
      options: [
        { text: "$\\begin{pmatrix} 5 \\\\ -2 \\\\ 1 \\end{pmatrix}$", correct: true, feedback: "One column, three rows: order $3 \\times 1$." },
        { text: "$\\begin{pmatrix} 5 & -2 & 1 \\end{pmatrix}$", feedback: "That is one row: a row matrix of order $1 \\times 3$." },
        { text: "$\\begin{pmatrix} 5 & -2 \\\\ 1 & 0 \\end{pmatrix}$", feedback: "That is a $2 \\times 2$ square matrix." },
      ],
    },
    {
      type: "quiz",
      id: "mx0-1-q5",
      variant: "practice",
      question: "A matrix $B$ has order $4 \\times 3$. How many entries does it have, and how many are in each row?",
      options: [
        { text: "12 entries, 3 in each row", correct: true, feedback: "4 rows × 3 columns = 12. Each row runs across all 3 columns." },
        { text: "12 entries, 4 in each row", feedback: "Each row has one entry per column, and there are 3 columns." },
        { text: "7 entries, 3 in each row", feedback: "Entries multiply: $4 \\times 3 = 12$." },
      ],
    },
    {
      type: "quiz",
      id: "mx0-1-q6",
      variant: "practice",
      question:
        "Using the fruit matrix $F = \\begin{pmatrix} 2 & 5 & 1 & 0 \\\\ 0 & 6 & 3 & 2 \\\\ 4 & 0 & 2 & 5 \\end{pmatrix}$ (rows: Asha, Bhavin, Chitra; columns: apples, bananas, mangoes, oranges), what does $f_{34}$ tell you?",
      options: [
        { text: "Chitra bought 5 oranges.", correct: true, feedback: "Row 3 is Chitra and column 4 is oranges, and $f_{34} = 5$." },
        { text: "Chitra bought 2 mangoes.", feedback: "That is $f_{33}$. Column 4 is oranges." },
        { text: "The fourth friend bought 2 mangoes.", feedback: "There is no fourth friend: rows are friends and there are only 3. The first subscript is the row, so 3 means Chitra." },
        { text: "It doesn't exist, because $F$ has only 3 columns.", feedback: "$F$ is $3 \\times 4$: 3 rows and **4** columns. $f_{34}$ is row 3, column 4, which exists." },
      ],
      hint: "First subscript picks the friend (row), second picks the fruit (column).",
    },
    {
      type: "quiz",
      id: "mx0-1-q7",
      variant: "practice",
      question:
        "For $A = \\begin{pmatrix} 2 & 5 & 19 & -7 \\\\ 35 & -2 & \\frac{5}{2} & 12 \\\\ \\sqrt{3} & 1 & -5 & 17 \\end{pmatrix}$, what is $a_{31} \\cdot a_{14}$?",
      options: [
        { text: "$-7\\sqrt{3}$", correct: true, feedback: "$a_{31} = \\sqrt{3}$ (row 3, column 1) and $a_{14} = -7$ (row 1, column 4)." },
        { text: "$-133$", feedback: "That is $19 \\times (-7)$: you read $a_{31}$ as row 1, column 3. Row comes first, so $a_{31}$ is row 3, column 1, which is $\\sqrt{3}$." },
        { text: "$19$", feedback: "$19$ is $a_{13}$ alone. You need the product of $a_{31}$ and $a_{14}$." },
        { text: "$a_{14}$ does not exist", feedback: "The matrix has 4 columns, so row 1, column 4 exists: $a_{14} = -7$." },
      ],
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "building-matrices-from-rules",
  title: "0.2 · Building Matrices from Rules",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "Sometimes nobody hands you the numbers. Instead you get a **rule**: \"the entry in row $i$, column $j$ is $i + j$.\" That rule and an order are enough to write down the entire matrix, because every entry has an address $(i, j)$ and the rule turns that address into a number.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "A matrix from a rule",
      content:
        "$A = [a_{ij}]_{m \\times n}$ with $a_{ij} = f(i, j)$ means: for every row $i = 1, \\ldots, m$ and every column $j = 1, \\ldots, n$, compute $f(i, j)$ and put it at that address.",
    },
    {
      type: "text",
      content:
        "The safe method is to fill the matrix **one address at a time**, writing the address before the number. It is slow for three entries and saves you on the fifth.",
    },
    {
      type: "text",
      content:
        "**Worked example 1.** Construct a $2 \\times 3$ matrix with $a_{ij} = \\dfrac{(i + 2j)^2}{2}$.\n\n**Step 1: row 1** ($i = 1$).\n$a_{11} = \\frac{(1+2)^2}{2} = \\frac{9}{2}$, $a_{12} = \\frac{(1+4)^2}{2} = \\frac{25}{2}$, $a_{13} = \\frac{(1+6)^2}{2} = \\frac{49}{2}$.\n**Step 2: row 2** ($i = 2$).\n$a_{21} = \\frac{(2+2)^2}{2} = 8$, $a_{22} = \\frac{(2+4)^2}{2} = 18$, $a_{23} = \\frac{(2+6)^2}{2} = 32$.\n**Step 3: assemble.**",
    },
    {
      type: "math",
      latex:
        "A = \\begin{pmatrix} \\frac{9}{2} & \\frac{25}{2} & \\frac{49}{2} \\\\[4pt] 8 & 18 & 32 \\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "**Worked example 2.** Construct a $3 \\times 3$ matrix with $a_{ij} = |i - j|$.\n\n**Step 1.** On the main diagonal $i = j$, so every diagonal entry is $|0| = 0$.\n**Step 2.** One step off the diagonal, $|i - j| = 1$: that is $a_{12}, a_{21}, a_{23}, a_{32}$.\n**Step 3.** The two far corners $a_{13}$ and $a_{31}$ have $|i - j| = 2$.",
    },
    {
      type: "math",
      latex:
        "A = \\begin{pmatrix} 0 & 1 & 2 \\\\ 1 & 0 & 1 \\\\ 2 & 1 & 0 \\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "The rule's symmetry shows up as a picture: $|i - j| = |j - i|$, so the matrix is a mirror image of itself across the main diagonal. Chapter 1 will call such matrices **symmetric**. Looking for patterns like this is a good way to check your work.",
    },
    {
      type: "text",
      content:
        "**Worked example 3.** Construct a $3 \\times 2$ matrix with $a_{ij} = 2i - j$.\n\nRow 1: $a_{11} = 1$, $a_{12} = 0$. Row 2: $a_{21} = 3$, $a_{22} = 2$. Row 3: $a_{31} = 5$, $a_{32} = 4$.",
    },
    {
      type: "math",
      latex: "A = \\begin{pmatrix} 1 & 0 \\\\ 3 & 2 \\\\ 5 & 4 \\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (a rule in two pieces).** Construct the $3 \\times 3$ matrix with $a_{ij} = i$ if $i \\ge j$, and $a_{ij} = j$ if $i < j$.\n\n**Step 1: decide which piece applies.** On and below the diagonal ($i \\ge j$) use $i$, the row number. Above the diagonal ($i < j$) use $j$, the column number.\n**Step 2: row 1.** $a_{11} = 1$ (since $1 \\ge 1$), $a_{12} = 2$ and $a_{13} = 3$ (since $1 < 2$ and $1 < 3$).\n**Step 3: rows 2 and 3.** $a_{21} = 2$, $a_{22} = 2$, $a_{23} = 3$; $a_{31} = 3$, $a_{32} = 3$, $a_{33} = 3$.\n**Step 4: spot the pattern.** Every entry is the larger of $i$ and $j$, so the rule is really $a_{ij} = \\max(i, j)$.",
    },
    {
      type: "math",
      latex: "A = \\begin{pmatrix} 1 & 2 & 3 \\\\ 2 & 2 & 3 \\\\ 3 & 3 & 3 \\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (a distance chart is a rule matrix).** Four bus stops $P_1, P_2, P_3, P_4$ lie along a straight highway at the km markers $x_1 = 0$, $x_2 = 3$, $x_3 = 7$ and $x_4 = 12$. The distance chart printed in the bus is the $4 \\times 4$ matrix $D = [d_{ij}]$ with $d_{ij} = |x_i - x_j|$, the distance from stop $i$ to stop $j$. Build $D$.\n\n**Step 1: diagonal first.** $d_{ii} = |x_i - x_i| = 0$. *Why start here:* it is free, and it is a check (the distance from a stop to itself must be 0).\n**Step 2: row 1** (from $P_1$ at 0): $d_{12} = 3$, $d_{13} = 7$, $d_{14} = 12$.\n**Step 3: row 2** (from $P_2$ at 3): $d_{21} = 3$, $d_{23} = |3 - 7| = 4$, $d_{24} = |3 - 12| = 9$.\n**Step 4: row 3** (from $P_3$ at 7): $d_{31} = 7$, $d_{32} = 4$, $d_{34} = |7 - 12| = 5$.\n**Step 5: row 4** (from $P_4$ at 12): $d_{41} = 12$, $d_{42} = 9$, $d_{43} = 5$.",
    },
    {
      type: "math",
      latex:
        "D = \\begin{pmatrix} 0 & 3 & 7 & 12 \\\\ 3 & 0 & 4 & 9 \\\\ 7 & 4 & 0 & 5 \\\\ 12 & 9 & 5 & 0 \\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "**Step 6: check with the picture.** Going from $P_1$ to $P_4$ passes $P_2$ and $P_3$, so $d_{14}$ should equal $d_{12} + d_{23} + d_{34} = 3 + 4 + 5 = 12$ ✓. And, just like $|i - j|$ in example 2, $D$ is a mirror image of itself across the diagonal, because the trip from $i$ to $j$ is as long as the trip back.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Check the shape before the numbers",
      content:
        "A $3 \\times 2$ matrix has $i$ running to 3 and $j$ only to 2. If your answer has an $a_{13}$, you built the wrong shape.",
    },
    {
      type: "text",
      content:
        "**How many shapes can hold $N$ entries?** A matrix of order $m \\times n$ has exactly $mn$ entries. So asking \"what orders can a matrix with 12 entries have?\" is the same as asking \"which ordered pairs of positive whole numbers multiply to 12?\"",
    },
    {
      type: "table",
      headers: ["Entries", "Factor pairs $(m, n)$", "Number of orders"],
      rows: [
        ["12", "$1 \\times 12,\\ 12 \\times 1,\\ 2 \\times 6,\\ 6 \\times 2,\\ 3 \\times 4,\\ 4 \\times 3$", "6"],
        ["13", "$1 \\times 13,\\ 13 \\times 1$", "2"],
        ["18", "$1 \\times 18,\\ 18 \\times 1,\\ 2 \\times 9,\\ 9 \\times 2,\\ 3 \\times 6,\\ 6 \\times 3$", "6"],
        ["24", "$1 \\times 24,\\ 24 \\times 1,\\ 2 \\times 12,\\ 12 \\times 2,\\ 3 \\times 8,\\ 8 \\times 3,\\ 4 \\times 6,\\ 6 \\times 4$", "8"],
      ],
    },
    {
      type: "text",
      content:
        "Order matters inside the pair: $3 \\times 4$ and $4 \\times 3$ are different shapes (one is wide, one is tall), so each factor pair $a \\cdot b$ with $a \\ne b$ gives **two** orders. The shortcut: the number of orders equals the number of divisors of $N$. For 24 the divisors are $1, 2, 3, 4, 6, 8, 12, 24$: eight of them, eight orders.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "\"A prime number of entries means no matrix\"",
      content:
        "A prime $p$ has no factor pairs *other than* $1 \\times p$, and those still count. A matrix with 13 entries is a $1 \\times 13$ row matrix or a $13 \\times 1$ column matrix. Two orders, not zero.",
    },
    {
      type: "text",
      content:
        "**How many matrices can you fill?** Now fix the shape and restrict the entries. How many $2 \\times 2$ matrices have every entry equal to 0 or 1?\n\n**Step 1.** A $2 \\times 2$ matrix has 4 entries.\n**Step 2.** Each entry is chosen independently, with 2 choices.\n**Step 3.** By the multiplication principle, the total is $2 \\times 2 \\times 2 \\times 2 = 2^4 = 16$.",
    },
    {
      type: "text",
      content:
        "The same argument gives the general count: an $m \\times n$ matrix whose entries come from a set of $k$ values can be filled in $k^{mn}$ ways. A $3 \\times 3$ matrix with entries 0 or 1 already has $2^9 = 512$ possibilities.",
    },
    {
      type: "text",
      content:
        "**Worked example 6 (JEE style).** How many $2 \\times 2$ matrices with entries from $\\{-1, 0, 1\\}$ have **exactly two** zero entries?\n\n**Step 1: count without the condition, as a sanity bound.** $3^4 = 81$ matrices in all, so the answer must be smaller.\n**Step 2: choose where the zeros go.** The four addresses are $a_{11}, a_{12}, a_{21}, a_{22}$. The pairs of addresses that could hold the two zeros are $\\{11, 12\\}, \\{11, 21\\}, \\{11, 22\\}, \\{12, 21\\}, \\{12, 22\\}, \\{21, 22\\}$: **6** ways. *Why list them:* it guards against counting $\\{11, 12\\}$ and $\\{12, 11\\}$ twice.\n**Step 3: fill the other two addresses.** They must be non-zero, so each is $-1$ or $1$: $2 \\times 2 = 4$ ways.\n**Step 4: multiply.** Each choice of positions pairs with each filling: $6 \\times 4 = 24$ matrices.",
    },
    {
      type: "math",
      latex:
        "\\underbrace{6}_{\\text{positions of the zeros}} \\times \\underbrace{2 \\times 2}_{\\text{fill the rest with } \\pm 1} = 24",
    },
    {
      type: "quiz",
      id: "mx0-2-q1",
      variant: "practice",
      question: "Which is the $2 \\times 2$ matrix with $a_{ij} = i + j$?",
      options: [
        { text: "$\\begin{pmatrix} 2 & 3 \\\\ 3 & 4 \\end{pmatrix}$", correct: true, feedback: "$a_{11} = 2$, $a_{12} = 3$, $a_{21} = 3$, $a_{22} = 4$." },
        { text: "$\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}$", feedback: "That just numbers the entries in order. Compute $i + j$ at each address: $a_{11} = 1 + 1 = 2$." },
        { text: "$\\begin{pmatrix} 2 & 3 \\\\ 4 & 5 \\end{pmatrix}$", feedback: "Check $a_{21} = 2 + 1 = 3$, not 4." },
      ],
    },
    {
      type: "quiz",
      id: "mx0-2-q2",
      variant: "practice",
      question: "For the $2 \\times 3$ matrix with $a_{ij} = \\dfrac{(i + 2j)^2}{2}$, what is $a_{12}$?",
      options: [
        { text: "$\\dfrac{25}{2}$", correct: true, feedback: "$i = 1$, $j = 2$: $(1 + 4)^2 / 2 = 25/2$." },
        { text: "$8$", feedback: "That is $a_{21}$: you swapped row and column. $a_{12}$ means $i = 1$, $j = 2$." },
        { text: "$\\dfrac{9}{2}$", feedback: "That is $a_{11}$. For $a_{12}$ use $j = 2$." },
      ],
      hint: "Substitute $i = 1$ and $j = 2$ into the rule.",
    },
    {
      type: "quiz",
      id: "mx0-2-q6",
      variant: "practice",
      question: "For the $3 \\times 4$ matrix with $a_{ij} = \\dfrac{|-3i + j|}{2}$, what is $a_{23}$?",
      options: [
        { text: "$\\dfrac{3}{2}$", correct: true, feedback: "$i = 2$, $j = 3$: $|-6 + 3| / 2 = |-3| / 2 = 3/2$." },
        { text: "$-\\dfrac{3}{2}$", feedback: "You found $-6 + 3 = -3$ but dropped the modulus. $|-3| = 3$, and an entry defined by $|\\cdot|$ can never be negative." },
        { text: "$\\dfrac{7}{2}$", feedback: "That is $a_{32} = |-9 + 2| / 2$: you swapped row and column. $a_{23}$ means $i = 2$, $j = 3$." },
        { text: "$\\dfrac{9}{2}$", feedback: "That is $|6 + 3| / 2$: the minus sign on $3i$ was lost. The inside is $-3(2) + 3 = -3$." },
      ],
      hint: "Substitute $i = 2$, $j = 3$ inside the modulus first, then take the absolute value, then halve.",
    },
    {
      type: "quiz",
      id: "mx0-2-q3",
      variant: "practice",
      question: "How many possible orders can a matrix with 24 entries have?",
      options: [
        { text: "8", correct: true, feedback: "24 has 8 divisors (1, 2, 3, 4, 6, 8, 12, 24), and each divisor $m$ gives the order $m \\times \\frac{24}{m}$." },
        { text: "4", feedback: "That counts the unordered pairs. $3 \\times 8$ and $8 \\times 3$ are different orders." },
        { text: "6", feedback: "List them all: $1\\times24, 2\\times12, 3\\times8, 4\\times6$ and their reverses." },
      ],
      hint: "Count ordered pairs $(m, n)$ with $mn = 24$.",
    },
    {
      type: "quiz",
      id: "mx0-2-q4",
      variant: "concept",
      question: "A matrix has 7 entries. Which statement is true?",
      options: [
        { text: "It must be $1 \\times 7$ or $7 \\times 1$.", correct: true, feedback: "7 is prime, so the only factor pairs are $1 \\cdot 7$ and $7 \\cdot 1$: a row or a column matrix." },
        { text: "No such matrix exists, because 7 is prime.", feedback: "Prime doesn't mean no factor pairs. $1 \\times 7$ is a perfectly good row matrix." },
        { text: "It could be $2 \\times 3$ with one entry left blank.", feedback: "A matrix is a full rectangle; every position holds an entry." },
      ],
    },
    {
      type: "quiz",
      id: "mx0-2-q5",
      variant: "practice",
      question: "How many $2 \\times 3$ matrices have every entry equal to 0 or 1?",
      options: [
        { text: "$64$", correct: true, feedback: "6 entries, 2 choices each: $2^6 = 64$." },
        { text: "$12$", feedback: "That is $6 \\times 2$. The choices multiply, entry after entry: $2 \\cdot 2 \\cdot 2 \\cdot 2 \\cdot 2 \\cdot 2$." },
        { text: "$36$", feedback: "That is $6^2$. It should be 2 (choices) raised to the power 6 (entries)." },
      ],
    },
    {
      type: "quiz",
      id: "mx0-2-q7",
      variant: "practice",
      question:
        "Three towns sit on a straight road at km markers $x_1 = 0$, $x_2 = 4$, $x_3 = 10$. The distance matrix has $d_{ij} = |x_i - x_j|$. What is row 2 of this matrix?",
      options: [
        { text: "$\\begin{pmatrix} 4 & 0 & 6 \\end{pmatrix}$", correct: true, feedback: "From town 2 (at 4): $|4 - 0| = 4$, $|4 - 4| = 0$, $|4 - 10| = 6$." },
        { text: "$\\begin{pmatrix} 4 & 0 & -6 \\end{pmatrix}$", feedback: "$4 - 10 = -6$, but the rule takes the modulus. A distance is never negative." },
        { text: "$\\begin{pmatrix} 0 & 4 & 10 \\end{pmatrix}$", feedback: "That is row 1, the distances from town 1 at marker 0." },
        { text: "$\\begin{pmatrix} 4 & 0 & 10 \\end{pmatrix}$", feedback: "$d_{23}$ is the distance from town 2 to town 3: $|4 - 10| = 6$, not the marker 10." },
      ],
      hint: "Row 2 means $i = 2$ is fixed; let $j$ run over 1, 2, 3.",
    },
    {
      type: "quiz",
      id: "mx0-2-q8",
      variant: "practice",
      question:
        "How many $2 \\times 2$ matrices with entries from $\\{-1, 0, 1\\}$ have **exactly one** zero entry?",
      options: [
        { text: "$32$", correct: true, feedback: "4 choices for where the zero goes, then the other 3 entries are each $\\pm 1$: $4 \\times 2^3 = 32$." },
        { text: "$8$", feedback: "That fills the three non-zero entries ($2^3$) but forgets the zero could sit at any of the 4 addresses." },
        { text: "$81$", feedback: "That is $3^4$, every matrix with entries from the set, with no condition on the zeros." },
        { text: "$4$", feedback: "That only chooses the zero's position. The other three entries each still have 2 choices." },
      ],
      hint: "First choose the zero's address, then fill the rest.",
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "equality-addition-scalar-multiples",
  title: "0.3 · Equality, Addition and Scalar Multiples",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "The stationery shop has two branches. Branch A's sales matrix and branch B's sales matrix have the same rows (items) and the same columns (days). The total sales for the chain are found the obvious way: add the two grids **position by position**. Every operation in this lesson is that simple, and the conditions come straight from the shop.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Equal matrices",
      content:
        "$A = B$ means $A$ and $B$ have the **same order** and **every corresponding entry is equal**: $a_{ij} = b_{ij}$ for all $i, j$.",
    },
    {
      type: "text",
      content:
        "So a single matrix equation between $2 \\times 2$ matrices is really **four** ordinary equations at once. That is why matrix equality is a favourite way to set simultaneous equations.",
    },
    {
      type: "text",
      content:
        "**Worked example 1.** Find $a, b, c, d$ if",
    },
    {
      type: "math",
      latex:
        "\\begin{pmatrix} 2a + b & a - 2b \\\\ 5c - d & 4c + 3d \\end{pmatrix} = \\begin{pmatrix} 4 & -3 \\\\ 11 & 24 \\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "**Step 1: match entries.** Row 1 gives $2a + b = 4$ and $a - 2b = -3$. Row 2 gives $5c - d = 11$ and $4c + 3d = 24$.\n**Step 2: solve for $a, b$.** Double the first equation: $4a + 2b = 8$. Add $a - 2b = -3$: $5a = 5$, so $a = 1$, and then $b = 4 - 2 = 2$.\n**Step 3: solve for $c, d$.** Triple $5c - d = 11$: $15c - 3d = 33$. Add $4c + 3d = 24$: $19c = 57$, so $c = 3$, and then $d = 15 - 11 = 4$.\n**Step 4: check.** $2(1) + 2 = 4$ ✓, $1 - 4 = -3$ ✓, $15 - 4 = 11$ ✓, $12 + 12 = 24$ ✓.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Different orders are never equal",
      content:
        "$\\begin{pmatrix} 1 & 2 \\end{pmatrix}$ and $\\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix}$ hold the same numbers, but one is $1 \\times 2$ and the other is $2 \\times 1$. They are **not** equal. Position is part of the information.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Addition, subtraction and scalar multiples",
      content:
        "For $A = [a_{ij}]$ and $B = [b_{ij}]$ of the **same order**:\n$A + B = [a_{ij} + b_{ij}]$ and $A - B = [a_{ij} - b_{ij}]$.\nFor any number $k$ (a **scalar**): $kA = [k\\,a_{ij}]$, where every entry is multiplied by $k$.",
    },
    {
      type: "text",
      content:
        "**Worked example 2.** Let $A = \\begin{pmatrix} 1 & 2 & -3 \\\\ 0 & 4 & 5 \\end{pmatrix}$ and $B = \\begin{pmatrix} 3 & -1 & 2 \\\\ 1 & -2 & 0 \\end{pmatrix}$. Find $A + B$ and $2A - B$.\n\n**Step 1.** Both are $2 \\times 3$, so both operations are defined.\n**Step 2.** Add position by position:",
    },
    {
      type: "math",
      latex:
        "A + B = \\begin{pmatrix} 1+3 & 2-1 & -3+2 \\\\ 0+1 & 4-2 & 5+0 \\end{pmatrix} = \\begin{pmatrix} 4 & 1 & -1 \\\\ 1 & 2 & 5 \\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "**Step 3.** Scale first: $2A = \\begin{pmatrix} 2 & 4 & -6 \\\\ 0 & 8 & 10 \\end{pmatrix}$. Then subtract $B$:",
    },
    {
      type: "math",
      latex:
        "2A - B = \\begin{pmatrix} 2-3 & 4+1 & -6-2 \\\\ 0-1 & 8+2 & 10-0 \\end{pmatrix} = \\begin{pmatrix} -1 & 5 & -8 \\\\ -1 & 10 & 10 \\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "**Worked example 2b (back to the shop).** Rows are pens and notebooks; columns are Monday, Tuesday, Wednesday. Branch A sold $A = \\begin{pmatrix} 10 & 8 & 12 \\\\ 5 & 6 & 4 \\end{pmatrix}$ and branch B sold $B = \\begin{pmatrix} 6 & 7 & 8 \\\\ 5 & 4 & 6 \\end{pmatrix}$. Next week the owner wants every figure for the chain to be 10% higher. How many pens should the chain aim to sell on Wednesday?\n\n**Step 1: chain total.** Both are $2 \\times 3$, so add position by position: $A + B = \\begin{pmatrix} 16 & 15 & 20 \\\\ 10 & 10 & 10 \\end{pmatrix}$.\n**Step 2: 10% more is a scalar multiple.** Raising every entry by 10% multiplies it by $1.1$, so the target is $1.1(A + B) = \\begin{pmatrix} 17.6 & 16.5 & 22 \\\\ 11 & 11 & 11 \\end{pmatrix}$.\n**Step 3: read one entry.** Pens is row 1 and Wednesday is column 3, so the target is the $(1, 3)$ entry: **22 pens**.\n**Step 4: check.** Directly, $1.1 \\times (12 + 8) = 1.1 \\times 20 = 22$ ✓. Because $1.1(A + B) = 1.1A + 1.1B$, you could also scale each branch first and then add.",
    },
    {
      type: "text",
      content:
        "**Worked example 2c (profit after a festival discount).** A bakery sells cakes and loaves of bread, each in a small and a large size. Rows are (cake, bread); columns are (small, large). All prices are in rupees per item.",
    },
    {
      type: "math",
      latex:
        "C = \\begin{pmatrix} 200 & 350 \\\\ 30 & 50 \\end{pmatrix} \\ (\\text{cost}), \\qquad S = \\begin{pmatrix} 260 & 450 \\\\ 40 & 65 \\end{pmatrix} \\ (\\text{selling price})",
    },
    {
      type: "text",
      content:
        "During Diwali the bakery gives 10% off every selling price. Find the profit matrix, and say which item earns the least per piece.\n\n**Step 1: the discounted price is a scalar multiple.** 10% off leaves 90%, so the new price matrix is $0.9S$. *Why a scalar:* the same percentage applies to every entry.",
    },
    {
      type: "math",
      latex:
        "0.9S = \\begin{pmatrix} 234 & 405 \\\\ 36 & 58.5 \\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "**Step 2: profit = price − cost, entry by entry.** Both matrices are $2 \\times 2$ with the same labels, so subtraction is defined and each entry compares the same item.",
    },
    {
      type: "math",
      latex:
        "P = 0.9S - C = \\begin{pmatrix} 234 - 200 & 405 - 350 \\\\ 36 - 30 & 58.5 - 50 \\end{pmatrix} = \\begin{pmatrix} 34 & 55 \\\\ 6 & 8.5 \\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "**Step 3: read the answer.** The smallest entry is $p_{21} = 6$: a small loaf earns just ₹6 per piece. Every entry is positive, so nothing is sold at a loss.\n**Step 4: a common trap.** $0.9(S - C)$ would be $\\begin{pmatrix} 54 & 90 \\\\ 9 & 13.5 \\end{pmatrix}$, which discounts the *profit*, not the price. The distributive law says $0.9(S - C) = 0.9S - 0.9C$, and the bakery's costs don't drop by 10%.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "\"You can add a $2 \\times 3$ and a $3 \\times 2$ by lining them up\"",
      content:
        "You can't. Addition pairs each entry of $A$ with the entry at the **same address** in $B$. A $2 \\times 3$ matrix has an $a_{13}$; a $3 \\times 2$ matrix has no column 3 to pair it with, and its $b_{31}$ has no partner. In the shop picture, you'd be adding items to days. $A + B$ is simply **not defined** unless the orders match exactly.",
    },
    {
      type: "text",
      content:
        "Because each entry of $A + B$ is an ordinary sum of numbers, matrix addition inherits the familiar laws of numbers, entry by entry:",
    },
    {
      type: "table",
      headers: ["Law", "Statement (same-order matrices)", "Why"],
      rows: [
        ["Commutative", "$A + B = B + A$", "$a_{ij} + b_{ij} = b_{ij} + a_{ij}$"],
        ["Associative", "$(A + B) + C = A + (B + C)$", "Same law for numbers, in every position"],
        ["Zero matrix", "$A + O = A$", "Adding 0 to each entry changes nothing"],
        ["Additive inverse", "$A + (-A) = O$", "$-A = [-a_{ij}]$ cancels every entry"],
        ["Distributive", "$k(A + B) = kA + kB$, $(k + l)A = kA + lA$", "$k(a + b) = ka + kb$ for numbers"],
        ["Scalars", "$k(lA) = (kl)A$, $1A = A$, $(-1)A = -A$", "Same laws for numbers, entry by entry"],
      ],
    },
    {
      type: "text",
      content:
        "Those laws let you solve matrix equations exactly the way you solve equations with numbers: add, subtract and divide by scalars on both sides.",
    },
    {
      type: "text",
      content:
        "**Worked example 3.** Find $X$ and $Y$ if $2X + Y = \\begin{pmatrix} 5 & 4 \\\\ 1 & 7 \\end{pmatrix}$ and $X - Y = \\begin{pmatrix} 1 & -1 \\\\ -1 & 2 \\end{pmatrix}$.\n\n**Step 1: eliminate $Y$ by adding.** $3X = \\begin{pmatrix} 6 & 3 \\\\ 0 & 9 \\end{pmatrix}$.\n**Step 2: divide by the scalar 3.** $X = \\begin{pmatrix} 2 & 1 \\\\ 0 & 3 \\end{pmatrix}$.\n**Step 3: back-substitute.** $Y = X - (X - Y) = \\begin{pmatrix} 2 & 1 \\\\ 0 & 3 \\end{pmatrix} - \\begin{pmatrix} 1 & -1 \\\\ -1 & 2 \\end{pmatrix} = \\begin{pmatrix} 1 & 2 \\\\ 1 & 1 \\end{pmatrix}$.\n**Step 4: check.** $2X + Y = \\begin{pmatrix} 4+1 & 2+2 \\\\ 0+1 & 6+1 \\end{pmatrix} = \\begin{pmatrix} 5 & 4 \\\\ 1 & 7 \\end{pmatrix}$ ✓.",
    },
    {
      type: "text",
      content:
        "**Worked example 4.** If $X + Y = \\begin{pmatrix} 5 & 2 \\\\ 0 & 9 \\end{pmatrix}$ and $X - Y = \\begin{pmatrix} 3 & 6 \\\\ 0 & -1 \\end{pmatrix}$, then adding gives $2X = \\begin{pmatrix} 8 & 8 \\\\ 0 & 8 \\end{pmatrix}$, so $X = \\begin{pmatrix} 4 & 4 \\\\ 0 & 4 \\end{pmatrix}$; subtracting gives $2Y = \\begin{pmatrix} 2 & -4 \\\\ 0 & 10 \\end{pmatrix}$, so $Y = \\begin{pmatrix} 1 & -2 \\\\ 0 & 5 \\end{pmatrix}$.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (CBSE board style).** Find $x$ and $y$ if",
    },
    {
      type: "math",
      latex:
        "2\\begin{pmatrix} x & 5 \\\\ 7 & y - 3 \\end{pmatrix} + \\begin{pmatrix} 3 & -4 \\\\ 1 & 2 \\end{pmatrix} = \\begin{pmatrix} 7 & 6 \\\\ 15 & 14 \\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "**Step 1: simplify the left side into one matrix.** Scale first, then add. *Why this order:* the scalar 2 multiplies only the first matrix.\n$2\\begin{pmatrix} x & 5 \\\\ 7 & y - 3 \\end{pmatrix} = \\begin{pmatrix} 2x & 10 \\\\ 14 & 2y - 6 \\end{pmatrix}$, so the left side is $\\begin{pmatrix} 2x + 3 & 6 \\\\ 15 & 2y - 4 \\end{pmatrix}$.\n**Step 2: equate corresponding entries.** Top-left: $2x + 3 = 7$, so $x = 2$. Bottom-right: $2y - 4 = 14$, so $y = 9$.\n**Step 3: use the other entries as a free check.** Top-right: $6 = 6$ ✓. Bottom-left: $15 = 15$ ✓. If one of these had failed, the equation would have no solution at all, whatever $x$ and $y$ were.",
    },
    {
      type: "callout",
      variant: "info",
      title: "What's missing so far",
      content:
        "We can add matrices and multiply them by numbers, but we haven't multiplied a matrix by a matrix, or even by a vector. That needs an idea, not just a rule, and the idea is the next lesson.",
    },
    {
      type: "quiz",
      id: "mx0-3-q1",
      variant: "concept",
      question: "$A$ is $2 \\times 3$ and $B$ is $3 \\times 2$. What is $A + B$?",
      options: [
        { text: "Not defined", correct: true, feedback: "Addition needs identical orders, so that every entry has a partner at the same address." },
        { text: "A $2 \\times 3$ matrix, after rotating $B$ to fit", feedback: "Turning $B$ on its side makes a different matrix (Chapter 1 calls it the transpose). $A + B$ itself isn't defined." },
        { text: "A $3 \\times 3$ matrix", feedback: "Addition never changes the order. When the orders differ it isn't defined at all." },
      ],
    },
    {
      type: "quiz",
      id: "mx0-3-q2",
      variant: "practice",
      question:
        "If $\\begin{pmatrix} x + 2y & 1 \\\\ 3 & x - y \\end{pmatrix} = \\begin{pmatrix} 8 & 1 \\\\ 3 & 2 \\end{pmatrix}$, what are $x$ and $y$?",
      options: [
        { text: "$x = 4,\\ y = 2$", correct: true, feedback: "$x + 2y = 8$ and $x - y = 2$. Subtracting gives $3y = 6$, so $y = 2$ and $x = 4$. Check: $4 + 4 = 8$ ✓." },
        { text: "$x = 2,\\ y = 3$", feedback: "Check: $2 + 6 = 8$ ✓ but $2 - 3 = -1 \\ne 2$. Both equations must hold." },
        { text: "$x = 6,\\ y = 1$", feedback: "Check: $6 + 2 = 8$ ✓ but $6 - 1 = 5 \\ne 2$." },
      ],
      hint: "Match the top-left entries and the bottom-right entries to get two equations.",
    },
    {
      type: "quiz",
      id: "mx0-3-q3",
      variant: "practice",
      question:
        "If $A = \\begin{pmatrix} 1 & 0 \\\\ 2 & -1 \\end{pmatrix}$ and $B = \\begin{pmatrix} 2 & 1 \\\\ 0 & 3 \\end{pmatrix}$, what is $3A - 2B$?",
      options: [
        { text: "$\\begin{pmatrix} -1 & -2 \\\\ 6 & -9 \\end{pmatrix}$", correct: true, feedback: "$3A = \\begin{pmatrix} 3 & 0 \\\\ 6 & -3 \\end{pmatrix}$, $2B = \\begin{pmatrix} 4 & 2 \\\\ 0 & 6 \\end{pmatrix}$, and subtracting gives this." },
        { text: "$\\begin{pmatrix} -1 & -2 \\\\ 6 & 3 \\end{pmatrix}$", feedback: "Bottom-right: $3(-1) - 2(3) = -3 - 6 = -9$." },
        { text: "$\\begin{pmatrix} -1 & -1 \\\\ 2 & -4 \\end{pmatrix}$", feedback: "That is $A - B$. Scale each matrix first: $3A$ and $2B$." },
      ],
    },
    {
      type: "quiz",
      id: "mx0-3-q4",
      variant: "practice",
      question: "What is the additive inverse of $\\begin{pmatrix} 2 & -5 \\\\ 0 & 1 \\end{pmatrix}$?",
      options: [
        { text: "$\\begin{pmatrix} -2 & 5 \\\\ 0 & -1 \\end{pmatrix}$", correct: true, feedback: "Negate every entry; the sum is then the zero matrix." },
        { text: "$\\begin{pmatrix} \\frac{1}{2} & -\\frac{1}{5} \\\\ 0 & 1 \\end{pmatrix}$", feedback: "Reciprocals are about multiplying to 1. The additive inverse must *add* to $O$. (And 0 has no reciprocal anyway.)" },
        { text: "$\\begin{pmatrix} -2 & -5 \\\\ 0 & -1 \\end{pmatrix}$", feedback: "The $-5$ must become $+5$ so that $-5 + 5 = 0$." },
      ],
    },
    {
      type: "quiz",
      id: "mx0-3-q5",
      variant: "practice",
      question:
        "If $X + Y = \\begin{pmatrix} 4 & 2 \\\\ 6 & 0 \\end{pmatrix}$ and $X - Y = \\begin{pmatrix} 2 & 0 \\\\ 0 & 2 \\end{pmatrix}$, what is $Y$?",
      options: [
        { text: "$\\begin{pmatrix} 1 & 1 \\\\ 3 & -1 \\end{pmatrix}$", correct: true, feedback: "Subtracting the equations gives $2Y = \\begin{pmatrix} 2 & 2 \\\\ 6 & -2 \\end{pmatrix}$. Then halve." },
        { text: "$\\begin{pmatrix} 3 & 1 \\\\ 3 & 1 \\end{pmatrix}$", feedback: "That is $X$, from adding the equations. To get $Y$, subtract them." },
        { text: "$\\begin{pmatrix} 2 & 2 \\\\ 6 & -2 \\end{pmatrix}$", feedback: "That is $2Y$. Divide by 2." },
      ],
      hint: "$(X + Y) - (X - Y) = 2Y$.",
    },
    {
      type: "quiz",
      id: "mx0-3-q6",
      variant: "concept",
      question: "Is $\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix} = \\begin{pmatrix} 1 & 3 \\\\ 2 & 4 \\end{pmatrix}$?",
      options: [
        { text: "No: $a_{12} = 2$ but $b_{12} = 3$.", correct: true, feedback: "Same order and same set of numbers, but equality is checked address by address." },
        { text: "Yes: they contain the same four numbers.", feedback: "A matrix is not a bag of numbers. Where each number sits is part of the matrix." },
        { text: "Yes: the diagonals match.", feedback: "Every entry must match, not only the diagonal." },
      ],
    },
    {
      type: "quiz",
      id: "mx0-3-q7",
      variant: "concept",
      question:
        "If $\\begin{pmatrix} x^2 & 1 \\\\ 0 & x + 1 \\end{pmatrix} = \\begin{pmatrix} 4 & 1 \\\\ 0 & -1 \\end{pmatrix}$, what is $x$?",
      options: [
        { text: "$x = -2$ only", correct: true, feedback: "Top-left gives $x^2 = 4$, so $x = 2$ or $x = -2$. Bottom-right gives $x + 1 = -1$, so $x = -2$. Only $-2$ satisfies **every** entry." },
        { text: "$x = \\pm 2$", feedback: "$x^2 = 4$ allows both, but the matrices must match everywhere. With $x = 2$ the bottom-right entry is $3 \\ne -1$." },
        { text: "$x = 2$", feedback: "Check the bottom-right entry: $2 + 1 = 3$, not $-1$. The other root of $x^2 = 4$ is the one that works." },
        { text: "No solution", feedback: "$x = -2$ works in every entry: $(-2)^2 = 4$ ✓ and $-2 + 1 = -1$ ✓." },
      ],
      hint: "Solve each entry's equation, then keep only the values that satisfy all of them.",
    },
    {
      type: "quiz",
      id: "mx0-3-q8",
      variant: "practice",
      question:
        "Find $x$ and $y$ if $2\\begin{pmatrix} x & 3 \\\\ 1 & y \\end{pmatrix} + \\begin{pmatrix} 1 & -1 \\\\ 0 & 2 \\end{pmatrix} = \\begin{pmatrix} 7 & 5 \\\\ 2 & 10 \\end{pmatrix}$.",
      options: [
        { text: "$x = 3,\\ y = 4$", correct: true, feedback: "Top-left: $2x + 1 = 7$, so $x = 3$. Bottom-right: $2y + 2 = 10$, so $y = 4$. Checks: $6 - 1 = 5$ ✓, $2 + 0 = 2$ ✓." },
        { text: "$x = 6,\\ y = 8$", feedback: "You dropped the scalar 2: $x + 1 = 7$ and $y + 2 = 10$. The 2 multiplies every entry of the first matrix." },
        { text: "$x = 4,\\ y = 6$", feedback: "You added the constant instead of subtracting it: $2x = 7 + 1$. From $2x + 1 = 7$, $2x = 6$." },
      ],
      hint: "Scale the first matrix by 2, add, then match the top-left and bottom-right entries.",
    },
    {
      type: "quiz",
      id: "mx0-3-q9",
      variant: "practice",
      question:
        "Rows are students (Ravi, Sana) and columns are subjects (Maths, Physics). Term-1 marks are $T_1 = \\begin{pmatrix} 40 & 35 \\\\ 28 & 45 \\end{pmatrix}$ and term-2 marks are $T_2 = \\begin{pmatrix} 44 & 39 \\\\ 30 & 47 \\end{pmatrix}$. The average matrix is $\\frac{1}{2}(T_1 + T_2)$. What is Sana's average in Maths?",
      options: [
        { text: "$29$", correct: true, feedback: "Sana is row 2, Maths is column 1: $\\frac{1}{2}(28 + 30) = 29$." },
        { text: "$58$", feedback: "That is the $(2, 1)$ entry of $T_1 + T_2$. The scalar $\\frac{1}{2}$ still has to halve it." },
        { text: "$37$", feedback: "That is $\\frac{1}{2}(35 + 39)$, the $(1, 2)$ entry: Ravi's Physics. Row 2, column 1 is Sana's Maths." },
        { text: "$46$", feedback: "That is Sana's Physics average, $\\frac{1}{2}(45 + 47)$. Maths is column 1." },
      ],
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "a-matrix-is-a-machine",
  title: "0.4 · A Matrix Is a Machine",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "So far a matrix has been a storage box. Here is the idea the rest of this course runs on: **a $2 \\times 2$ matrix is an instruction for moving the whole plane.** Feed it a point, and it hands back a new point. Better still, you can see the instruction just by looking at its columns.",
    },
    {
      type: "text",
      content:
        "Start with the two arrows every point in the plane is built from: $\\hat{\\imath} = \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix}$ (one step right) and $\\hat{\\jmath} = \\begin{pmatrix} 0 \\\\ 1 \\end{pmatrix}$ (one step up). The point $\\begin{pmatrix} 3 \\\\ 2 \\end{pmatrix}$ is \"3 steps of $\\hat{\\imath}$ plus 2 steps of $\\hat{\\jmath}$\". Every grid line is made of these steps.",
    },
    {
      type: "text",
      content:
        "The matrix that leaves $\\hat{\\imath}$ and $\\hat{\\jmath}$ where they are, $I = \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}$, is the **identity**: it moves nothing. At $t = 0$ every grid below shows $I$.",
    },
    {
      type: "interactive",
      config: {
        component: "matrix-transform-grid",
        matrix: [
          [2, -1],
          [1, 1],
        ],
        showDeterminant: false,
        caption:
          "Slide t from 0 to 1. The green arrow is where î lands and the orange arrow is where ĵ lands. Now drag the arrow tips, and watch the whole grid follow the two arrows.",
      },
    },
    {
      type: "text",
      content:
        "Notice three things as the grid moves: the origin never moves; straight grid lines stay straight; and parallel grid lines stay parallel **and evenly spaced**. Transformations with these properties are called **linear**, and they are exactly the ones a matrix can describe.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The columns are where the basis vectors land",
      content:
        "For $A = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$:\nthe **first column** $\\begin{pmatrix} a \\\\ c \\end{pmatrix}$ is where $\\hat{\\imath}$ lands;\nthe **second column** $\\begin{pmatrix} b \\\\ d \\end{pmatrix}$ is where $\\hat{\\jmath}$ lands.",
    },
    {
      type: "text",
      content:
        "**Deriving where every point goes.** Take any vector $\\mathbf{v} = \\begin{pmatrix} x \\\\ y \\end{pmatrix} = x\\,\\hat{\\imath} + y\\,\\hat{\\jmath}$. Because the grid stays evenly spaced, \"$x$ steps of $\\hat{\\imath}$\" becomes \"$x$ steps of wherever $\\hat{\\imath}$ went\", and likewise for $y$. So the image of $\\mathbf{v}$ is built from the images of $\\hat{\\imath}$ and $\\hat{\\jmath}$ with the **same weights**:",
    },
    {
      type: "math",
      latex:
        "A\\mathbf{v} = x\\,(A\\hat{\\imath}) + y\\,(A\\hat{\\jmath}) = x\\begin{pmatrix} a \\\\ c \\end{pmatrix} + y\\begin{pmatrix} b \\\\ d \\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "Add those two columns entry by entry and you get the familiar formula:",
    },
    {
      type: "math",
      latex:
        "\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}\\begin{pmatrix} x \\\\ y \\end{pmatrix} = \\begin{pmatrix} ax + by \\\\ cx + dy \\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "This is the *definition* of a matrix times a vector: it is what the matrix must do if it keeps the grid straight, parallel and evenly spaced. The row rule is just the fast way to compute it.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Two ways to read the same answer",
      content:
        "**Column view (the meaning):** $A\\mathbf{v}$ is $x$ copies of column 1 plus $y$ copies of column 2.\n**Row view (the shortcut):** entry $i$ of $A\\mathbf{v}$ is row $i$ of $A$ times $\\mathbf{v}$, multiplied pairwise and added: $ax + by$, then $cx + dy$.\nBoth give the same numbers. Use rows to compute and columns to understand.",
    },
    {
      type: "text",
      content:
        "**Worked example 1.** Let $A = \\begin{pmatrix} 2 & -1 \\\\ 1 & 3 \\end{pmatrix}$. Where does $\\mathbf{v} = \\begin{pmatrix} 2 \\\\ -1 \\end{pmatrix}$ go?\n\n**Step 1: read the columns.** $\\hat{\\imath} \\to \\begin{pmatrix} 2 \\\\ 1 \\end{pmatrix}$ and $\\hat{\\jmath} \\to \\begin{pmatrix} -1 \\\\ 3 \\end{pmatrix}$.\n**Step 2: weight them by $\\mathbf{v}$'s entries.** $2\\begin{pmatrix} 2 \\\\ 1 \\end{pmatrix} + (-1)\\begin{pmatrix} -1 \\\\ 3 \\end{pmatrix} = \\begin{pmatrix} 4 \\\\ 2 \\end{pmatrix} + \\begin{pmatrix} 1 \\\\ -3 \\end{pmatrix} = \\begin{pmatrix} 5 \\\\ -1 \\end{pmatrix}$.\n**Step 3: check with rows.** $2(2) + (-1)(-1) = 5$ and $1(2) + 3(-1) = -1$ ✓.",
    },
    {
      type: "interactive",
      config: {
        component: "matrix-transform-grid",
        matrix: [
          [2, -1],
          [1, 3],
        ],
        showDeterminant: false,
        showProbe: true,
        probe: [2, -1],
        range: 6,
        caption:
          "The dashed arrow is v = (2, −1); the solid one is Av. The readout shows Av = x·col₁ + y·col₂. Drag v around and predict Av before you look.",
      },
    },
    {
      type: "text",
      content:
        "**Worked example 2.** A transformation sends $\\hat{\\imath}$ to $\\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix}$ and $\\hat{\\jmath}$ to $\\begin{pmatrix} -3 \\\\ 0 \\end{pmatrix}$. Find its matrix and the image of $\\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix}$.\n\n**Step 1: the images are the columns.** $A = \\begin{pmatrix} 1 & -3 \\\\ 2 & 0 \\end{pmatrix}$.\n**Step 2: combine.** $1\\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix} + 1\\begin{pmatrix} -3 \\\\ 0 \\end{pmatrix} = \\begin{pmatrix} -2 \\\\ 2 \\end{pmatrix}$.",
    },
    {
      type: "text",
      content:
        "**Worked example 3.** A matrix sends $\\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix}$ to $\\begin{pmatrix} 3 \\\\ 1 \\end{pmatrix}$ and $\\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix}$ to $\\begin{pmatrix} 4 \\\\ 4 \\end{pmatrix}$. Find the matrix.\n\n**Step 1.** $\\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix} = \\hat{\\imath} + \\hat{\\jmath}$, so its image is (image of $\\hat{\\imath}$) + (image of $\\hat{\\jmath}$).\n**Step 2.** Image of $\\hat{\\jmath}$ $= \\begin{pmatrix} 4 \\\\ 4 \\end{pmatrix} - \\begin{pmatrix} 3 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} 1 \\\\ 3 \\end{pmatrix}$.\n**Step 3.** $A = \\begin{pmatrix} 3 & 1 \\\\ 1 & 3 \\end{pmatrix}$.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (the column view in a juice bar).** A juice bar makes two blends. One jug of *Sunrise* uses 2 oranges and 1 mango; one jug of *Tropical* uses 1 orange and 3 mangoes. Today's order is 4 jugs of Sunrise and 5 jugs of Tropical. How much fruit is needed?\n\n**Step 1: each recipe is a column.** Put (oranges, mangoes) down each column, one column per blend. *Why columns:* a column is \"what one unit of this input produces\", exactly like the image of $\\hat{\\imath}$ or $\\hat{\\jmath}$.",
    },
    {
      type: "math",
      latex:
        "R = \\begin{pmatrix} 2 & 1 \\\\ 1 & 3 \\end{pmatrix}, \\qquad \\mathbf{v} = \\begin{pmatrix} 4 \\\\ 5 \\end{pmatrix} \\ (\\text{jugs of Sunrise, Tropical})",
    },
    {
      type: "text",
      content:
        "**Step 2: weight the columns by the order.** 4 jugs of the first recipe plus 5 jugs of the second:",
    },
    {
      type: "math",
      latex:
        "R\\mathbf{v} = 4\\begin{pmatrix} 2 \\\\ 1 \\end{pmatrix} + 5\\begin{pmatrix} 1 \\\\ 3 \\end{pmatrix} = \\begin{pmatrix} 8 + 5 \\\\ 4 + 15 \\end{pmatrix} = \\begin{pmatrix} 13 \\\\ 19 \\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "**Step 3: interpret.** 13 oranges and 19 mangoes.\n**Step 4: check with rows.** Row 1 of $R$ is \"oranges per jug of each blend\", $(2, 1)$, so oranges $= 2(4) + 1(5) = 13$ ✓. The row view answers \"how many of *this fruit*?\"; the column view answers \"what does *each blend* contribute?\". Same numbers, two stories.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (JEE style: two clues, unknown matrix).** A $2 \\times 2$ matrix $A$ satisfies $A\\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix} = \\begin{pmatrix} 5 \\\\ 4 \\end{pmatrix}$ and $A\\begin{pmatrix} 2 \\\\ -1 \\end{pmatrix} = \\begin{pmatrix} 0 \\\\ 3 \\end{pmatrix}$. Find $A$.\n\n**Step 1: name the unknown columns.** Let $\\mathbf{u} = A\\hat{\\imath}$ (column 1) and $\\mathbf{w} = A\\hat{\\jmath}$ (column 2). *Why:* the columns are all we need, and every clue is a weighted sum of them.\n**Step 2: turn the clues into vector equations.** $\\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix} = \\hat{\\imath} + 2\\hat{\\jmath}$ gives $\\mathbf{u} + 2\\mathbf{w} = \\begin{pmatrix} 5 \\\\ 4 \\end{pmatrix}$. And $\\begin{pmatrix} 2 \\\\ -1 \\end{pmatrix} = 2\\hat{\\imath} - \\hat{\\jmath}$ gives $2\\mathbf{u} - \\mathbf{w} = \\begin{pmatrix} 0 \\\\ 3 \\end{pmatrix}$.\n**Step 3: eliminate $\\mathbf{w}$.** Double the second equation and add the first: $5\\mathbf{u} = \\begin{pmatrix} 5 \\\\ 10 \\end{pmatrix}$, so $\\mathbf{u} = \\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix}$.\n**Step 4: back-substitute.** $\\mathbf{w} = 2\\mathbf{u} - \\begin{pmatrix} 0 \\\\ 3 \\end{pmatrix} = \\begin{pmatrix} 2 \\\\ 1 \\end{pmatrix}$.",
    },
    {
      type: "math",
      latex:
        "A = \\begin{pmatrix} 1 & 2 \\\\ 2 & 1 \\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "**Step 5: check both clues.** $A\\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix} = \\begin{pmatrix} 1 + 4 \\\\ 2 + 2 \\end{pmatrix} = \\begin{pmatrix} 5 \\\\ 4 \\end{pmatrix}$ ✓ and $A\\begin{pmatrix} 2 \\\\ -1 \\end{pmatrix} = \\begin{pmatrix} 2 - 2 \\\\ 4 - 1 \\end{pmatrix} = \\begin{pmatrix} 0 \\\\ 3 \\end{pmatrix}$ ✓. Two clues were enough because $(1, 2)$ and $(2, -1)$ point in different directions; two clues along the same line would not pin $A$ down.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "\"Matrix times vector multiplies entry by entry\"",
      content:
        "There is no entry-by-entry pairing here; the shapes don't even match ($2 \\times 2$ against $2 \\times 1$). The vector's entries are **weights on the columns**: $\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}\\begin{pmatrix} 5 \\\\ 6 \\end{pmatrix} = 5\\begin{pmatrix} 1 \\\\ 3 \\end{pmatrix} + 6\\begin{pmatrix} 2 \\\\ 4 \\end{pmatrix} = \\begin{pmatrix} 17 \\\\ 39 \\end{pmatrix}$.",
    },
    {
      type: "text",
      content:
        "One consequence is worth noticing now: $A\\begin{pmatrix} 0 \\\\ 0 \\end{pmatrix} = 0 \\cdot \\text{col}_1 + 0 \\cdot \\text{col}_2 = \\begin{pmatrix} 0 \\\\ 0 \\end{pmatrix}$. **Every matrix fixes the origin.** Lesson 0.5 uses this to rule out some motions entirely.",
    },
    {
      type: "quiz",
      id: "mx0-4-q1",
      variant: "concept",
      question: "What is $\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}\\begin{pmatrix} 5 \\\\ 6 \\end{pmatrix}$?",
      options: [
        { text: "$\\begin{pmatrix} 17 \\\\ 39 \\end{pmatrix}$", correct: true, feedback: "$5\\begin{pmatrix} 1 \\\\ 3 \\end{pmatrix} + 6\\begin{pmatrix} 2 \\\\ 4 \\end{pmatrix} = \\begin{pmatrix} 5 + 12 \\\\ 15 + 24 \\end{pmatrix}$." },
        { text: "$\\begin{pmatrix} 5 \\\\ 24 \\end{pmatrix}$", feedback: "That multiplies entry by entry down the diagonal. The vector's entries weight the *columns*." },
        { text: "$\\begin{pmatrix} 23 \\\\ 34 \\end{pmatrix}$", feedback: "That uses columns of $A$ as if they were rows: $1(5) + 3(6)$. Use row 1, $(1, 2)$: $1(5) + 2(6) = 17$." },
      ],
    },
    {
      type: "quiz",
      id: "mx0-4-q2",
      variant: "concept",
      question: "In $A = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$, where does $\\hat{\\jmath} = \\begin{pmatrix} 0 \\\\ 1 \\end{pmatrix}$ land?",
      options: [
        { text: "$\\begin{pmatrix} b \\\\ d \\end{pmatrix}$, the second column", correct: true, feedback: "$A\\hat{\\jmath} = 0 \\cdot \\text{col}_1 + 1 \\cdot \\text{col}_2$." },
        { text: "$\\begin{pmatrix} c \\\\ d \\end{pmatrix}$, the second row, stood up", feedback: "Rows aren't images. Column 2 is where $\\hat{\\jmath}$ goes." },
        { text: "$\\begin{pmatrix} a \\\\ c \\end{pmatrix}$, the first column", feedback: "That is where $\\hat{\\imath}$ lands." },
      ],
    },
    {
      type: "quiz",
      id: "mx0-4-q3",
      variant: "practice",
      question: "A transformation sends $\\hat{\\imath}$ to $\\begin{pmatrix} 2 \\\\ 0 \\end{pmatrix}$ and $\\hat{\\jmath}$ to $\\begin{pmatrix} 1 \\\\ 3 \\end{pmatrix}$. What is its matrix?",
      options: [
        { text: "$\\begin{pmatrix} 2 & 1 \\\\ 0 & 3 \\end{pmatrix}$", correct: true, feedback: "The images go in as columns, $\\hat{\\imath}$'s image first." },
        { text: "$\\begin{pmatrix} 2 & 0 \\\\ 1 & 3 \\end{pmatrix}$", feedback: "You wrote the images as rows. They are columns." },
        { text: "$\\begin{pmatrix} 1 & 2 \\\\ 3 & 0 \\end{pmatrix}$", feedback: "Column order matters: $\\hat{\\imath}$'s image is column 1." },
      ],
    },
    {
      type: "quiz",
      id: "mx0-4-q4",
      variant: "practice",
      question: "Let $A = \\begin{pmatrix} 0 & 2 \\\\ -1 & 1 \\end{pmatrix}$. What is $A\\begin{pmatrix} 3 \\\\ 1 \\end{pmatrix}$?",
      options: [
        { text: "$\\begin{pmatrix} 2 \\\\ -2 \\end{pmatrix}$", correct: true, feedback: "$3\\begin{pmatrix} 0 \\\\ -1 \\end{pmatrix} + 1\\begin{pmatrix} 2 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} 2 \\\\ -2 \\end{pmatrix}$." },
        { text: "$\\begin{pmatrix} 0 \\\\ 1 \\end{pmatrix}$", feedback: "That is entry-by-entry: $0 \\cdot 3$ and $1 \\cdot 1$. Weight the columns instead." },
        { text: "$\\begin{pmatrix} 6 \\\\ 2 \\end{pmatrix}$", feedback: "You put the weight 3 on column 2. The first entry of $\\mathbf{v}$ weights column 1." },
      ],
      hint: "$x \\cdot \\text{col}_1 + y \\cdot \\text{col}_2$ with $x = 3$, $y = 1$.",
    },
    {
      type: "quiz",
      id: "mx0-4-q5",
      variant: "practice",
      question:
        "A matrix sends $\\hat{\\imath}$ to $\\begin{pmatrix} 3 \\\\ 1 \\end{pmatrix}$ and $\\hat{\\jmath}$ to $\\begin{pmatrix} -1 \\\\ 2 \\end{pmatrix}$. Where does $\\begin{pmatrix} 2 \\\\ 3 \\end{pmatrix}$ go?",
      options: [
        { text: "$\\begin{pmatrix} 3 \\\\ 8 \\end{pmatrix}$", correct: true, feedback: "$2\\begin{pmatrix} 3 \\\\ 1 \\end{pmatrix} + 3\\begin{pmatrix} -1 \\\\ 2 \\end{pmatrix} = \\begin{pmatrix} 6 - 3 \\\\ 2 + 6 \\end{pmatrix}$." },
        { text: "$\\begin{pmatrix} 7 \\\\ 7 \\end{pmatrix}$", feedback: "That swaps the weights: $3\\begin{pmatrix} 3 \\\\ 1 \\end{pmatrix} + 2\\begin{pmatrix} -1 \\\\ 2 \\end{pmatrix}$. The first entry, 2, weights $\\hat{\\imath}$'s image." },
        { text: "$\\begin{pmatrix} 6 \\\\ 6 \\end{pmatrix}$", feedback: "Check the first entry: $2(3) + 3(-1) = 3$." },
      ],
    },
    {
      type: "quiz",
      id: "mx0-4-q6",
      variant: "practice",
      question:
        "A juice bar's recipe matrix is $R = \\begin{pmatrix} 3 & 1 \\\\ 1 & 2 \\end{pmatrix}$: column 1 is one jug of blend A, column 2 is one jug of blend B, and the rows are (oranges, mangoes). For 2 jugs of A and 3 jugs of B, how much fruit is needed?",
      options: [
        { text: "9 oranges and 8 mangoes", correct: true, feedback: "$2\\begin{pmatrix} 3 \\\\ 1 \\end{pmatrix} + 3\\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix} = \\begin{pmatrix} 9 \\\\ 8 \\end{pmatrix}$." },
        { text: "11 oranges and 7 mangoes", feedback: "That puts 3 jugs on blend A and 2 on blend B. The first entry of the order (2) weights column 1." },
        { text: "6 oranges and 6 mangoes", feedback: "That multiplies entry by entry ($3 \\cdot 2$ and $2 \\cdot 3$). Each jug count weights a whole recipe column." },
      ],
      hint: "Fruit needed $= 2 \\cdot (\\text{column 1}) + 3 \\cdot (\\text{column 2})$.",
    },
    {
      type: "quiz",
      id: "mx0-4-q7",
      variant: "practice",
      question:
        "A $2 \\times 2$ matrix sends $\\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix}$ to $\\begin{pmatrix} 3 \\\\ 1 \\end{pmatrix}$ and $\\begin{pmatrix} 1 \\\\ -1 \\end{pmatrix}$ to $\\begin{pmatrix} 1 \\\\ -1 \\end{pmatrix}$. What is the matrix?",
      options: [
        { text: "$\\begin{pmatrix} 2 & 1 \\\\ 0 & 1 \\end{pmatrix}$", correct: true, feedback: "With $\\mathbf{u}, \\mathbf{w}$ the columns: $\\mathbf{u} + \\mathbf{w} = (3, 1)$ and $\\mathbf{u} - \\mathbf{w} = (1, -1)$. Adding gives $\\mathbf{u} = (2, 0)$; subtracting gives $\\mathbf{w} = (1, 1)$." },
        { text: "$\\begin{pmatrix} 3 & 1 \\\\ 1 & -1 \\end{pmatrix}$", feedback: "Those are the images of $(1, 1)$ and $(1, -1)$, not of $\\hat{\\imath}$ and $\\hat{\\jmath}$. Solve for the columns first." },
        { text: "$\\begin{pmatrix} 2 & 0 \\\\ 1 & 1 \\end{pmatrix}$", feedback: "You found $\\mathbf{u} = (2, 0)$ and $\\mathbf{w} = (1, 1)$ correctly but wrote them as rows. They are columns." },
      ],
      hint: "Write $(1, 1) = \\hat{\\imath} + \\hat{\\jmath}$ and $(1, -1) = \\hat{\\imath} - \\hat{\\jmath}$, then add and subtract the two clues.",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "a-gallery-of-transformations",
  title: "0.5 · A Gallery of Transformations",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "If a matrix is fixed by where $\\hat{\\imath}$ and $\\hat{\\jmath}$ land, then writing the matrix for a motion is a two-question job: *where does the right-step go? where does the up-step go?* Let's use that to build a gallery of the motions you'll meet again and again.",
    },
    {
      type: "interactive",
      config: {
        component: "matrix-transform-grid",
        matrix: [
          [1, 0],
          [0, 1],
        ],
        showDeterminant: false,
        presets: [
          { label: "Stretch x by 2", matrix: [[2, 0], [0, 1]] },
          { label: "Scale by ½", matrix: [[0.5, 0], [0, 0.5]] },
          { label: "Rotate 90°", matrix: [[0, -1], [1, 0]] },
          { label: "Rotate 45°", matrix: [[0.707, -0.707], [0.707, 0.707]] },
          { label: "Reflect in x-axis", matrix: [[1, 0], [0, -1]] },
          { label: "Reflect in y = x", matrix: [[0, 1], [1, 0]] },
          { label: "Shear", matrix: [[1, 1], [0, 1]] },
          { label: "Project onto x-axis", matrix: [[1, 0], [0, 0]] },
        ],
        caption:
          "Click a preset and watch it play from the identity. For each one, say where î (green) and ĵ (orange) end up, then check the matrix's columns.",
      },
    },
    {
      type: "text",
      content:
        "**Scaling.** Stretch horizontally by $k$ and vertically by $m$: $\\hat{\\imath} \\to \\begin{pmatrix} k \\\\ 0 \\end{pmatrix}$, $\\hat{\\jmath} \\to \\begin{pmatrix} 0 \\\\ m \\end{pmatrix}$, so the matrix is $\\begin{pmatrix} k & 0 \\\\ 0 & m \\end{pmatrix}$. With $k = m$ the whole plane zooms uniformly, and $\\begin{pmatrix} -1 & 0 \\\\ 0 & -1 \\end{pmatrix}$ turns every arrow around (a half-turn about the origin).",
    },
    {
      type: "text",
      content:
        "**Rotation, derived.** Rotate the plane anticlockwise by $\\theta$ about the origin. From the unit circle in trigonometry, the point at angle $\\theta$ is $(\\cos\\theta, \\sin\\theta)$:\n\n**Step 1.** $\\hat{\\imath}$ starts at angle 0, so it lands at angle $\\theta$: $\\begin{pmatrix} \\cos\\theta \\\\ \\sin\\theta \\end{pmatrix}$.\n**Step 2.** $\\hat{\\jmath}$ starts at angle $90°$, so it lands at angle $\\theta + 90°$: $\\begin{pmatrix} \\cos(\\theta + 90°) \\\\ \\sin(\\theta + 90°) \\end{pmatrix} = \\begin{pmatrix} -\\sin\\theta \\\\ \\cos\\theta \\end{pmatrix}$.\n**Step 3.** Put the two images in as columns:",
    },
    {
      type: "math",
      latex:
        "R_\\theta = \\begin{pmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{pmatrix}",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Where the minus sign lives",
      content:
        "For an anticlockwise rotation the $-\\sin\\theta$ is **top-right**, because a small anticlockwise turn pushes $\\hat{\\jmath}$ to the left (negative $x$). If you forget, rebuild column 2 from the picture instead of guessing.",
    },
    {
      type: "text",
      content:
        "**Worked example 1.** Rotate $\\begin{pmatrix} 2 \\\\ 1 \\end{pmatrix}$ by $90°$ anticlockwise.\n\n**Step 1.** $\\theta = 90°$: $R_{90°} = \\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}$ (check: $\\hat{\\imath} \\to \\hat{\\jmath}$, $\\hat{\\jmath} \\to -\\hat{\\imath}$).\n**Step 2.** $2\\begin{pmatrix} 0 \\\\ 1 \\end{pmatrix} + 1\\begin{pmatrix} -1 \\\\ 0 \\end{pmatrix} = \\begin{pmatrix} -1 \\\\ 2 \\end{pmatrix}$.\n**Step 3: sanity check.** $(2, 1)$ is in quadrant I; a quarter turn should put it in quadrant II, at the same distance $\\sqrt{5}$. $(-1, 2)$ is both ✓.",
    },
    {
      type: "text",
      content:
        "**Worked example 2.** Rotate $\\begin{pmatrix} 2 \\\\ 0 \\end{pmatrix}$ by $60°$.\n\n$R_{60°} = \\begin{pmatrix} \\frac{1}{2} & -\\frac{\\sqrt{3}}{2} \\\\ \\frac{\\sqrt{3}}{2} & \\frac{1}{2} \\end{pmatrix}$, and $\\begin{pmatrix} 2 \\\\ 0 \\end{pmatrix} = 2\\hat{\\imath}$, so the image is twice column 1: $\\begin{pmatrix} 1 \\\\ \\sqrt{3} \\end{pmatrix}$. Its length is $\\sqrt{1 + 3} = 2$, as a rotation must keep it.",
    },
    {
      type: "text",
      content:
        "**Reflections, shears and projections.**\n\n**Reflection in the x-axis:** $\\hat{\\imath}$ stays, $\\hat{\\jmath}$ flips to $-\\hat{\\jmath}$.\n**Reflection in $y = x$:** the mirror swaps the axes, so $\\hat{\\imath} \\leftrightarrow \\hat{\\jmath}$, and every point $(x, y)$ goes to $(y, x)$.\n**Horizontal shear:** the x-axis stays put and each point slides horizontally by $k$ times its height $y$ (right above the axis and left below it, when $k > 0$); $\\hat{\\imath}$ stays and $\\hat{\\jmath} \\to \\begin{pmatrix} k \\\\ 1 \\end{pmatrix}$.\n**Projection onto the x-axis:** drop every point straight down (or up) onto the x-axis; $\\hat{\\imath}$ stays and $\\hat{\\jmath}$ is crushed to $\\mathbf{0}$.",
    },
    {
      type: "table",
      headers: ["Transformation", "$\\hat{\\imath} \\to$", "$\\hat{\\jmath} \\to$", "Matrix", "$(x, y) \\to$"],
      rows: [
        ["Scale by $k$ (x) and $m$ (y)", "$(k, 0)$", "$(0, m)$", "$\\begin{pmatrix} k & 0 \\\\ 0 & m \\end{pmatrix}$", "$(kx, my)$"],
        ["Rotate $90°$ anticlockwise", "$(0, 1)$", "$(-1, 0)$", "$\\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}$", "$(-y, x)$"],
        ["Rotate by $\\theta$", "$(\\cos\\theta, \\sin\\theta)$", "$(-\\sin\\theta, \\cos\\theta)$", "$\\begin{pmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{pmatrix}$", "rotated by $\\theta$"],
        ["Reflect in x-axis", "$(1, 0)$", "$(0, -1)$", "$\\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}$", "$(x, -y)$"],
        ["Reflect in y-axis", "$(-1, 0)$", "$(0, 1)$", "$\\begin{pmatrix} -1 & 0 \\\\ 0 & 1 \\end{pmatrix}$", "$(-x, y)$"],
        ["Reflect in $y = x$", "$(0, 1)$", "$(1, 0)$", "$\\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}$", "$(y, x)$"],
        ["Horizontal shear by $k$", "$(1, 0)$", "$(k, 1)$", "$\\begin{pmatrix} 1 & k \\\\ 0 & 1 \\end{pmatrix}$", "$(x + ky, y)$"],
        ["Vertical shear by $k$", "$(1, k)$", "$(0, 1)$", "$\\begin{pmatrix} 1 & 0 \\\\ k & 1 \\end{pmatrix}$", "$(x, kx + y)$"],
        ["Project onto x-axis", "$(1, 0)$", "$(0, 0)$", "$\\begin{pmatrix} 1 & 0 \\\\ 0 & 0 \\end{pmatrix}$", "$(x, 0)$"],
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 3 (matrix → picture).** What does $\\begin{pmatrix} 0 & -1 \\\\ -1 & 0 \\end{pmatrix}$ do?\n\n**Step 1.** Column 1: $\\hat{\\imath} \\to (0, -1)$. Column 2: $\\hat{\\jmath} \\to (-1, 0)$.\n**Step 2.** So $(x, y) \\to (-y, -x)$. The point $(1, -1)$ goes to $(1, -1)$: points on the line $y = -x$ don't move. The point $(1, 1)$ goes to $(-1, -1)$: points on the perpendicular line flip.\n**Step 3.** Fixed line plus a flip across it: this is the **reflection in $y = -x$**.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (how italic letters are made).** A font designer draws the letter I as the rectangle with corners $(0, 0), (2, 0), (2, 4), (0, 4)$. To italicise it, she applies the horizontal shear with $k = \\frac{1}{2}$. Where do the corners go, and does the letter use more ink?\n\n**Step 1: the matrix.** $\\hat{\\imath}$ stays, $\\hat{\\jmath} \\to \\left(\\frac{1}{2}, 1\\right)$, so $H = \\begin{pmatrix} 1 & \\frac{1}{2} \\\\ 0 & 1 \\end{pmatrix}$ and $(x, y) \\to \\left(x + \\frac{y}{2}, y\\right)$.\n**Step 2: the bottom corners.** $(0, 0)$ and $(2, 0)$ have $y = 0$, so they don't move. *Why:* a horizontal shear slides each point by an amount proportional to its height, and the base has height 0.\n**Step 3: the top corners.** At height 4 every point slides right by $\\frac{1}{2} \\cdot 4 = 2$: $(2, 4) \\to (4, 4)$ and $(0, 4) \\to (2, 4)$.",
    },
    {
      type: "math",
      latex:
        "(0,0),\\ (2,0),\\ (2,4),\\ (0,4) \\ \\xrightarrow{\\ H\\ } \\ (0,0),\\ (2,0),\\ (4,4),\\ (2,4)",
    },
    {
      type: "text",
      content:
        "**Step 4: the ink.** The rectangle has area $2 \\times 4 = 8$. The image is a parallelogram with the same base 2 and the same height 4, so its area is also $8$. A shear leans the letter over without making it fatter. (Chapter 2 will read this \"area stays the same\" straight off the matrix, as its determinant.)",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (JEE style: find the angle, then use it).** An anticlockwise rotation $R_\\theta$ about the origin, with $0° \\le \\theta < 360°$, sends $(2, 0)$ to $(\\sqrt{2}, \\sqrt{2})$. Find $\\theta$, and the image of $(1, 1)$.\n\n**Step 1: $(2, 0)$ is $2\\hat{\\imath}$, so its image is twice column 1.** $2(\\cos\\theta, \\sin\\theta) = (\\sqrt{2}, \\sqrt{2})$ gives $\\cos\\theta = \\sin\\theta = \\frac{\\sqrt{2}}{2}$. *Why both are needed:* $\\cos\\theta = \\frac{\\sqrt{2}}{2}$ alone allows $45°$ or $315°$; the sign of $\\sin\\theta$ picks one.\n**Step 2: the angle.** Both positive means quadrant I, so $\\theta = 45°$.\n**Step 3: the image of $(1, 1) = \\hat{\\imath} + \\hat{\\jmath}$.** Add the two columns of $R_{45°}$:",
    },
    {
      type: "math",
      latex:
        "R_{45°}\\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} \\frac{\\sqrt{2}}{2} \\\\ \\frac{\\sqrt{2}}{2} \\end{pmatrix} + \\begin{pmatrix} -\\frac{\\sqrt{2}}{2} \\\\ \\frac{\\sqrt{2}}{2} \\end{pmatrix} = \\begin{pmatrix} 0 \\\\ \\sqrt{2} \\end{pmatrix}",
    },
    {
      type: "text",
      content:
        "**Step 4: sanity check with the picture.** $(1, 1)$ points at $45°$ with length $\\sqrt{2}$. Turning it a further $45°$ should point it straight up, still with length $\\sqrt{2}$: that is $(0, \\sqrt{2})$ ✓.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "\"A shift is a matrix transformation\"",
      content:
        "Sliding the whole plane 2 units right, $(x, y) \\to (x + 2, y)$, moves the origin to $(2, 0)$. But every matrix sends $\\mathbf{0}$ to $0 \\cdot \\text{col}_1 + 0 \\cdot \\text{col}_2 = \\mathbf{0}$. So **no $2 \\times 2$ matrix can translate the plane**. The quick test for a matrix transformation: the origin stays fixed, and grid lines stay straight, parallel and evenly spaced.",
    },
    {
      type: "quiz",
      id: "mx0-5-q1",
      variant: "practice",
      question: "Which matrix reflects the plane in the line $y = x$?",
      options: [
        { text: "$\\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}$", correct: true, feedback: "$\\hat{\\imath} \\to (0, 1)$ and $\\hat{\\jmath} \\to (1, 0)$: the axes swap, and $(x, y) \\to (y, x)$." },
        { text: "$\\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}$", feedback: "That is the reflection in the x-axis: $\\hat{\\jmath}$ flips, $\\hat{\\imath}$ stays." },
        { text: "$\\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}$", feedback: "That is a $90°$ rotation: $\\hat{\\jmath} \\to (-1, 0)$, not $(1, 0)$." },
      ],
    },
    {
      type: "quiz",
      id: "mx0-5-q2",
      variant: "practice",
      question: "What does $\\begin{pmatrix} 1 & 0 \\\\ 0 & 0 \\end{pmatrix}$ do to the plane?",
      options: [
        { text: "Projects every point onto the x-axis", correct: true, feedback: "$(x, y) \\to (x, 0)$: $\\hat{\\jmath}$ is crushed to zero, so the whole plane collapses onto the x-axis." },
        { text: "Reflects in the x-axis", feedback: "A reflection would send $\\hat{\\jmath}$ to $(0, -1)$. Here column 2 is $(0, 0)$." },
        { text: "Does nothing; it's the identity", feedback: "The identity has a 1 in the bottom-right. Here $\\hat{\\jmath}$ lands on the origin." },
      ],
    },
    {
      type: "quiz",
      id: "mx0-5-q3",
      variant: "concept",
      question: "Is there a $2 \\times 2$ matrix that shifts every point 2 units right, $(x, y) \\to (x + 2, y)$?",
      options: [
        { text: "No, because every matrix keeps the origin fixed.", correct: true, feedback: "$A\\mathbf{0} = \\mathbf{0}$ always, but the shift moves the origin to $(2, 0)$." },
        { text: "Yes: $\\begin{pmatrix} 1 & 2 \\\\ 0 & 1 \\end{pmatrix}$", feedback: "That is a shear: $(x, y) \\to (x + 2y, y)$. Points on the x-axis don't move at all." },
        { text: "Yes: $\\begin{pmatrix} 3 & 0 \\\\ 0 & 1 \\end{pmatrix}$", feedback: "That stretches: $(1, 0) \\to (3, 0)$ but $(0, 0)$ stays put, and $(2, 0) \\to (6, 0)$." },
      ],
    },
    {
      type: "quiz",
      id: "mx0-5-q4",
      variant: "practice",
      question: "Which matrix rotates the plane $90°$ **clockwise**?",
      options: [
        { text: "$\\begin{pmatrix} 0 & 1 \\\\ -1 & 0 \\end{pmatrix}$", correct: true, feedback: "Clockwise, $\\hat{\\imath}$ goes down to $(0, -1)$ and $\\hat{\\jmath}$ goes right to $(1, 0)$. Those are the columns." },
        { text: "$\\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}$", feedback: "That sends $\\hat{\\imath}$ up to $(0, 1)$, which is anticlockwise." },
        { text: "$\\begin{pmatrix} -1 & 0 \\\\ 0 & -1 \\end{pmatrix}$", feedback: "That is a half turn ($180°$)." },
      ],
      hint: "Track $\\hat{\\imath}$ first: a quarter turn clockwise from $(1, 0)$ lands where?",
    },
    {
      type: "quiz",
      id: "mx0-5-q5",
      variant: "practice",
      question: "Rotating $\\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix}$ anticlockwise by $30°$ gives which vector?",
      options: [
        { text: "$\\begin{pmatrix} \\frac{\\sqrt{3}}{2} \\\\ \\frac{1}{2} \\end{pmatrix}$", correct: true, feedback: "It's column 1 of $R_{30°}$: $(\\cos 30°, \\sin 30°)$." },
        { text: "$\\begin{pmatrix} \\frac{1}{2} \\\\ \\frac{\\sqrt{3}}{2} \\end{pmatrix}$", feedback: "That is $(\\cos 60°, \\sin 60°)$, which is a $60°$ turn." },
        { text: "$\\begin{pmatrix} -\\frac{1}{2} \\\\ \\frac{\\sqrt{3}}{2} \\end{pmatrix}$", feedback: "That is column 2 of $R_{30°}$, where $\\hat{\\jmath}$ lands. $\\hat{\\imath}$'s image is column 1." },
      ],
    },
    {
      type: "quiz",
      id: "mx0-5-q6",
      variant: "practice",
      question: "What is the matrix of the horizontal shear that keeps the x-axis fixed and sends $(0, 1)$ to $(3, 1)$?",
      options: [
        { text: "$\\begin{pmatrix} 1 & 3 \\\\ 0 & 1 \\end{pmatrix}$", correct: true, feedback: "$\\hat{\\imath}$ stays at $(1, 0)$ and $\\hat{\\jmath}$ goes to $(3, 1)$. Those are the columns." },
        { text: "$\\begin{pmatrix} 1 & 0 \\\\ 3 & 1 \\end{pmatrix}$", feedback: "That sends $\\hat{\\imath}$ to $(1, 3)$, a vertical shear. The images go in as columns." },
        { text: "$\\begin{pmatrix} 3 & 1 \\\\ 1 & 0 \\end{pmatrix}$", feedback: "Column 1 must be $\\hat{\\imath}$'s image, which is still $(1, 0)$." },
      ],
    },
    {
      type: "quiz",
      id: "mx0-5-q7",
      variant: "practice",
      question:
        "An italic font uses the shear $\\begin{pmatrix} 1 & \\frac{1}{2} \\\\ 0 & 1 \\end{pmatrix}$. Where does the top of a letter stroke at $(1, 6)$ end up?",
      options: [
        { text: "$(4, 6)$", correct: true, feedback: "$(x, y) \\to \\left(x + \\frac{y}{2}, y\\right) = (1 + 3, 6)$. The height doesn't change; the point slides right by half its height." },
        { text: "$(1, 6.5)$", feedback: "That is $(x, \\frac{x}{2} + y)$, a vertical shear. The $\\frac{1}{2}$ is top-right, so it adds to the $x$-coordinate." },
        { text: "$(7, 6)$", feedback: "That slides by the full height 6, i.e. $k = 1$. Here $k = \\frac{1}{2}$, so the slide is 3." },
        { text: "$(1, 6)$", feedback: "Only points on the x-axis stay fixed under this shear. At height 6 the point slides." },
      ],
    },
    {
      type: "quiz",
      id: "mx0-5-q8",
      variant: "practice",
      question:
        "An anticlockwise rotation $R_\\theta$ with $0° \\le \\theta < 360°$ sends $(0, 3)$ to $(-3, 0)$. What is $\\theta$?",
      options: [
        { text: "$90°$", correct: true, feedback: "$(0, 3) = 3\\hat{\\jmath}$, so $3(-\\sin\\theta, \\cos\\theta) = (-3, 0)$: $\\sin\\theta = 1$, $\\cos\\theta = 0$, so $\\theta = 90°$. Picture: straight up, a quarter turn anticlockwise, points left." },
        { text: "$270°$", feedback: "$R_{270°}$ sends $\\hat{\\jmath}$ to $(-\\sin 270°, \\cos 270°) = (1, 0)$, so $(0, 3) \\to (3, 0)$: right, not left." },
        { text: "$180°$", feedback: "A half turn sends $(0, 3)$ to $(0, -3)$, straight down." },
        { text: "$45°$", feedback: "A $45°$ turn would give $\\left(-\\frac{3}{\\sqrt{2}}, \\frac{3}{\\sqrt{2}}\\right)$, not a point on the x-axis." },
      ],
      hint: "$(0, 3)$ is $3\\hat{\\jmath}$, so its image is 3 times column 2 of $R_\\theta$.",
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "matrices-chapter-0-mastery",
  title: "0.6 · Chapter 0 Mastery",
  position: 6,
  blocks: blocks([
    {
      type: "callout",
      variant: "info",
      title: "Chapter 0 in five lines",
      content:
        "**Order** $m \\times n$ = rows × columns; $a_{ij}$ sits in row $i$, column $j$.\n**Rules** $a_{ij} = f(i, j)$ build whole matrices; an $N$-entry matrix has one order per divisor of $N$.\n**Equality, $+$, $-$** work entry by entry and need identical orders; $kA$ scales every entry.\n**$A\\mathbf{v}$** $= x \\cdot \\text{col}_1 + y \\cdot \\text{col}_2$, because the columns are where $\\hat{\\imath}$ and $\\hat{\\jmath}$ land.\n**Gallery:** scalings, rotations, reflections, shears and projections are all matrices; translations are not.",
    },
    {
      type: "quiz",
      id: "mx0-6-q1",
      variant: "mastery",
      question: "How many different orders can a matrix with 18 entries have?",
      options: [
        { text: "6", correct: true, feedback: "18 has divisors 1, 2, 3, 6, 9, 18, giving $1\\times18, 2\\times9, 3\\times6, 6\\times3, 9\\times2, 18\\times1$." },
        { text: "3", feedback: "That counts unordered pairs. $2 \\times 9$ and $9 \\times 2$ are different orders." },
        { text: "4", feedback: "List every divisor of 18; each one gives a row count." },
      ],
    },
    {
      type: "quiz",
      id: "mx0-6-q2",
      variant: "mastery",
      question: "$A = [a_{ij}]_{3 \\times 2}$ with $a_{ij} = i^2 - j$. What is $a_{32}$?",
      options: [
        { text: "$7$", correct: true, feedback: "$i = 3$, $j = 2$: $9 - 2 = 7$." },
        { text: "$1$", feedback: "That is $a_{23}$ computed as $4 - 3$. But a $3 \\times 2$ matrix doesn't even have an $a_{23}$. Row first: $i = 3$." },
        { text: "$8$", feedback: "That is $a_{31} = 9 - 1$. Column 2 means $j = 2$." },
      ],
    },
    {
      type: "quiz",
      id: "mx0-6-q3",
      variant: "mastery",
      question:
        "If $\\begin{pmatrix} 2x + y & 3 \\\\ -1 & x - y \\end{pmatrix} = \\begin{pmatrix} 7 & 3 \\\\ -1 & 2 \\end{pmatrix}$, what are $x$ and $y$?",
      options: [
        { text: "$x = 3,\\ y = 1$", correct: true, feedback: "Adding $2x + y = 7$ and $x - y = 2$ gives $3x = 9$. Check: $6 + 1 = 7$ ✓, $3 - 1 = 2$ ✓." },
        { text: "$x = 2,\\ y = 3$", feedback: "$2(2) + 3 = 7$ ✓ but $2 - 3 = -1 \\ne 2$." },
        { text: "$x = 1,\\ y = 5$", feedback: "$2 + 5 = 7$ ✓ but $1 - 5 \\ne 2$. Both entries must match." },
      ],
      hint: "Match the top-left and bottom-right entries, then add the two equations to eliminate $y$.",
    },
    {
      type: "quiz",
      id: "mx0-6-q4",
      variant: "mastery",
      question: "$A$ and $B$ are $2 \\times 3$; $C$ is $3 \\times 2$. Which expression is defined?",
      options: [
        { text: "$A - 2B$", correct: true, feedback: "$2B$ is still $2 \\times 3$, the same order as $A$." },
        { text: "$A + C$", feedback: "$2 \\times 3$ and $3 \\times 2$ can't be added; entries have no partners at the same address." },
        { text: "$B - C$", feedback: "Different orders again. Subtraction has the same rule as addition." },
      ],
    },
    {
      type: "quiz",
      id: "mx0-6-q5",
      variant: "mastery",
      question: "What is $\\begin{pmatrix} 1 & 2 \\\\ -1 & 3 \\end{pmatrix}\\begin{pmatrix} 2 \\\\ 1 \\end{pmatrix}$?",
      options: [
        { text: "$\\begin{pmatrix} 4 \\\\ 1 \\end{pmatrix}$", correct: true, feedback: "$2\\begin{pmatrix} 1 \\\\ -1 \\end{pmatrix} + 1\\begin{pmatrix} 2 \\\\ 3 \\end{pmatrix} = \\begin{pmatrix} 4 \\\\ 1 \\end{pmatrix}$." },
        { text: "$\\begin{pmatrix} 2 \\\\ 3 \\end{pmatrix}$", feedback: "That multiplies the diagonal entries by the vector's entries. Weight the columns instead." },
        { text: "$\\begin{pmatrix} 5 \\\\ 5 \\end{pmatrix}$", feedback: "That weights column 1 by 1 and column 2 by 2. The first entry of $\\mathbf{v}$ (2) weights column 1." },
      ],
    },
    {
      type: "quiz",
      id: "mx0-6-q6",
      variant: "mastery",
      question: "What does $\\begin{pmatrix} -1 & 0 \\\\ 0 & 1 \\end{pmatrix}$ do to the plane?",
      options: [
        { text: "Reflects it in the y-axis", correct: true, feedback: "$\\hat{\\imath} \\to (-1, 0)$ and $\\hat{\\jmath}$ stays: $(x, y) \\to (-x, y)$." },
        { text: "Reflects it in the x-axis", feedback: "That would flip $\\hat{\\jmath}$ and keep $\\hat{\\imath}$. Here $\\hat{\\imath}$ is the one that flips." },
        { text: "Rotates it by $180°$", feedback: "A half turn flips both: $\\begin{pmatrix} -1 & 0 \\\\ 0 & -1 \\end{pmatrix}$." },
      ],
    },
    {
      type: "quiz",
      id: "mx0-6-q7",
      variant: "mastery",
      question: "A matrix sends $\\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix}$ to $\\begin{pmatrix} 2 \\\\ 1 \\end{pmatrix}$ and $\\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix}$ to $\\begin{pmatrix} 3 \\\\ 4 \\end{pmatrix}$. What is the matrix?",
      options: [
        { text: "$\\begin{pmatrix} 2 & 1 \\\\ 1 & 3 \\end{pmatrix}$", correct: true, feedback: "$\\hat{\\jmath} = (1, 1) - (1, 0)$, so its image is $(3, 4) - (2, 1) = (1, 3)$. Check: $(2, 1) + (1, 3) = (3, 4)$ ✓." },
        { text: "$\\begin{pmatrix} 2 & 3 \\\\ 1 & 4 \\end{pmatrix}$", feedback: "$(1, 1)$ is not $\\hat{\\jmath}$, so $(3, 4)$ can't go straight into column 2. Subtract $\\hat{\\imath}$'s image first." },
        { text: "$\\begin{pmatrix} 2 & 1 \\\\ 3 & 4 \\end{pmatrix}$", feedback: "The images belong in columns, and $(3, 4)$ is not $\\hat{\\jmath}$'s image." },
      ],
      hint: "Write $\\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix} = \\hat{\\imath} + \\hat{\\jmath}$.",
    },
    {
      type: "quiz",
      id: "mx0-6-q8",
      variant: "mastery",
      question: "Which of these maps **cannot** be written as a $2 \\times 2$ matrix acting on $\\begin{pmatrix} x \\\\ y \\end{pmatrix}$?",
      options: [
        { text: "$(x, y) \\to (x + 1, y)$", correct: true, feedback: "It moves the origin to $(1, 0)$; every matrix fixes the origin." },
        { text: "$(x, y) \\to (x + y, y)$", feedback: "That is the shear $\\begin{pmatrix} 1 & 1 \\\\ 0 & 1 \\end{pmatrix}$." },
        { text: "$(x, y) \\to (y, x)$", feedback: "That is the reflection in $y = x$, $\\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}$." },
        { text: "$(x, y) \\to (2x, 0)$", feedback: "That is $\\begin{pmatrix} 2 & 0 \\\\ 0 & 0 \\end{pmatrix}$: stretch then project onto the x-axis." },
      ],
    },
    {
      type: "quiz",
      id: "mx0-6-q9",
      variant: "mastery",
      question: "How many $3 \\times 3$ matrices have every entry equal to 0 or 1?",
      options: [
        { text: "$512$", correct: true, feedback: "9 entries, 2 choices each: $2^9 = 512$." },
        { text: "$18$", feedback: "That is $9 \\times 2$. Independent choices multiply: $2^9$." },
        { text: "$81$", feedback: "That is $9^2$. Choices multiply once per entry: $2 \\cdot 2 \\cdots 2$ (9 times) $= 2^9$." },
      ],
      hint: "Count the entries, then multiply the number of choices once per entry.",
    },
    {
      type: "quiz",
      id: "mx0-6-q10",
      variant: "mastery",
      question:
        "If $X + 2Y = \\begin{pmatrix} 4 & 1 \\\\ 3 & 5 \\end{pmatrix}$ and $X - Y = \\begin{pmatrix} 1 & -2 \\\\ 0 & 2 \\end{pmatrix}$, what is $Y$?",
      options: [
        { text: "$\\begin{pmatrix} 1 & 1 \\\\ 1 & 1 \\end{pmatrix}$", correct: true, feedback: "Subtracting the equations eliminates $X$: $3Y = \\begin{pmatrix} 3 & 3 \\\\ 3 & 3 \\end{pmatrix}$, so $Y = \\begin{pmatrix} 1 & 1 \\\\ 1 & 1 \\end{pmatrix}$. Check: $X = (X - Y) + Y = \\begin{pmatrix} 2 & -1 \\\\ 1 & 3 \\end{pmatrix}$, and $X + 2Y = \\begin{pmatrix} 4 & 1 \\\\ 3 & 5 \\end{pmatrix}$ ✓." },
        { text: "$\\begin{pmatrix} 3 & 3 \\\\ 3 & 3 \\end{pmatrix}$", feedback: "That is $3Y$. Divide every entry by the scalar 3." },
        { text: "$\\begin{pmatrix} 2 & -1 \\\\ 1 & 3 \\end{pmatrix}$", feedback: "That is $X$. The question asks for $Y$: $Y = X - (X - Y)$." },
      ],
      hint: "$(X + 2Y) - (X - Y) = 3Y$.",
    },
    {
      type: "quiz",
      id: "mx0-6-q11",
      variant: "mastery",
      question: "Where does the point $(0, 2)$ go under an anticlockwise rotation by $60°$ about the origin?",
      options: [
        { text: "$(-\\sqrt{3},\\ 1)$", correct: true, feedback: "$(0, 2) = 2\\hat{\\jmath}$, so its image is twice column 2 of $R_{60°}$: $2(-\\sin 60°, \\cos 60°) = 2\\left(-\\frac{\\sqrt{3}}{2}, \\frac{1}{2}\\right) = (-\\sqrt{3}, 1)$." },
        { text: "$(\\sqrt{3},\\ 1)$", feedback: "The sign of $-\\sin\\theta$ was lost. An anticlockwise turn pushes the upward arrow to the left, so the x-coordinate is negative." },
        { text: "$(1,\\ \\sqrt{3})$", feedback: "That is twice column 1, the image of $2\\hat{\\imath}$. The point $(0, 2)$ is along $\\hat{\\jmath}$, so use column 2." },
      ],
      hint: "$(0, 2) = 2\\hat{\\jmath}$. Where does $\\hat{\\jmath}$ land under $R_{60°}$?",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "A matrix is a move of the plane. So what happens when you make one move and then another? Chapter 1 answers that, and the answer *is* matrix multiplication. The row-by-column rule will come straight out of \"apply $B$, then $A$\".",
    },
  ]),
};

export const matricesChapter0Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lessonMastery,
];
