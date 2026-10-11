import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Sets, Relations and Functions Chapter 2 — Relations.
 * Ordered pairs and Cartesian products, a relation as any subset of A × B,
 * the four properties read off an arrow diagram (loops, two-way arrows,
 * shortcuts), JEE's standard relations on Z, R, lines and triangles,
 * equivalence relations as partitions, and counting relations with a
 * given property by deciding which pairs are still free.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "ordered-pairs-and-cartesian-products",
  title: "2.1 · Ordered Pairs and Cartesian Products",
  position: 1,
  blocks: blocks([
    {
      type: "text",
      content:
        "A cinema ticket says **Row 3, Seat 5**. Your friend's says **Row 5, Seat 3**. Same two numbers, different seats. A set $\\{3, 5\\}$ cannot tell these apart, because a set ignores order. To talk about seats, grid points, inputs paired with outputs, or \"who is related to whom\", we need an object that remembers which number came first. That object is the **ordered pair**, and it is the atom from which this whole chapter (and every function in Chapter 3) is built.",
    },
    { type: "heading", text: "Ordered pairs" },
    {
      type: "callout",
      variant: "definition",
      title: "Ordered pair",
      content:
        "An **ordered pair** $(a, b)$ has a first entry $a$ and a second entry $b$. Two ordered pairs are equal only when they agree entry by entry:\n$$(a, b) = (c, d) \\iff a = c \\text{ and } b = d.$$\nSo $(3, 5) \\ne (5, 3)$, while the sets $\\{3, 5\\}$ and $\\{5, 3\\}$ are equal. The entries may repeat: $(2, 2)$ is a perfectly good ordered pair.",
    },
    {
      type: "worked-example",
      id: "srf2-1-we1",
      title: "Worked example 1: equating pairs",
      problem: "Find $x$ and $y$ if $(2x - y,\\ x + y) = (1, 5)$.",
      steps: [
        { text: "Equal ordered pairs means equal first entries **and** equal second entries. *Why this step:* one equation of pairs is really two equations of numbers.", latex: "2x - y = 1, \\qquad x + y = 5" },
        { text: "Add the two equations: $3x = 6$, so $x = 2$. Then $y = 5 - 2 = 3$." },
        { text: "Check: $(2 \\cdot 2 - 3,\\ 2 + 3) = (1, 5)$ ✓." },
      ],
      answer: "$x = 2$, $y = 3$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"(1, 2) = (2, 1)\"",
      content:
        "Brackets matter. Curly braces $\\{1, 2\\}$ build a set, where order is invisible. Round brackets $(1, 2)$ build an ordered pair, where order is the whole point. The point $(1, 2)$ on a graph is not the point $(2, 1)$.",
    },
    { type: "heading", text: "The Cartesian product" },
    {
      type: "callout",
      variant: "definition",
      title: "Cartesian product",
      content:
        "For sets $A$ and $B$, the **Cartesian product** is the set of all ordered pairs with first entry from $A$ and second entry from $B$:\n$$A \\times B = \\{(a, b) : a \\in A,\\ b \\in B\\}.$$\nIf $A$ or $B$ is empty, $A \\times B = \\varnothing$ (there is nothing to pair).",
    },
    {
      type: "text",
      content:
        "Take $A = \\{1, 2, 3\\}$ and $B = \\{p, q\\}$. Lay $A$ along the rows and $B$ along the columns: every cell of the grid is one ordered pair. The grid has 3 rows and 2 columns, so 6 cells. This is just the product rule from counting: choose the first entry (3 ways) **and** the second entry (2 ways).",
    },
    {
      type: "table",
      headers: ["", "$p$", "$q$"],
      rows: [
        ["$1$", "$(1, p)$", "$(1, q)$"],
        ["$2$", "$(2, p)$", "$(2, q)$"],
        ["$3$", "$(3, p)$", "$(3, q)$"],
      ],
    },
    {
      type: "math",
      latex: "n(A \\times B) = n(A) \\cdot n(B), \\qquad n(A \\times B \\times C) = n(A)\\, n(B)\\, n(C)",
    },
    {
      type: "text",
      content:
        "The picture you already know is the coordinate plane: $\\mathbb{R} \\times \\mathbb{R} = \\mathbb{R}^2$ is the set of all points $(x, y)$. A finite product such as $\\{1, 2, 3\\} \\times \\{1, 2\\}$ is a little grid of 6 **lattice points** in that plane. Similarly $A \\times A \\times A$ is the set of ordered triples $(a, b, c)$, and $\\mathbb{R}^3$ is space.",
    },
    {
      type: "callout",
      variant: "info",
      title: "When is $A \\times B = B \\times A$?",
      content:
        "$(1, p) \\in A \\times B$ but $(1, p) \\notin B \\times A$ (its first entry would have to come from $B$). In general $A \\times B \\ne B \\times A$. They are equal only when $A = B$, or when one of the sets is empty (both products are then $\\varnothing$). Note that $n(A \\times B) = n(B \\times A)$ always: same size, different pairs.",
    },
    {
      type: "worked-example",
      id: "srf2-1-we2",
      title: "Worked example 2: rebuilding the sets",
      problem:
        "$A \\times B$ has 6 elements, and three of them are $(a, 1)$, $(b, 2)$ and $(c, 1)$. Find $A$, $B$ and the remaining elements.",
      steps: [
        { text: "First entries come from $A$: so $a, b, c \\in A$. Second entries come from $B$: so $1, 2 \\in B$." },
        { text: "Already $n(A) \\ge 3$ and $n(B) \\ge 2$, so $n(A)\\,n(B) \\ge 6$. Since the product has exactly 6 elements, both bounds are attained. *Why this step:* the product rule pins down the sizes, so there is no room for extra elements." },
        { text: "So $A = \\{a, b, c\\}$ and $B = \\{1, 2\\}$. The missing pairs are $(a, 2)$, $(b, 1)$ and $(c, 2)$." },
      ],
      answer: "$A = \\{a, b, c\\}$, $B = \\{1, 2\\}$; the other elements are $(a, 2), (b, 1), (c, 2)$.",
    },
    { type: "heading", text: "Products and the set operations" },
    {
      type: "text",
      content:
        "The product distributes over the set operations in each slot. Think of the grid: restricting the columns to $B \\cap C$ keeps exactly the cells that lie in both the $B$-columns and the $C$-columns.",
    },
    {
      type: "math",
      latex:
        "\\begin{aligned} A \\times (B \\cap C) &= (A \\times B) \\cap (A \\times C) \\\\ A \\times (B \\cup C) &= (A \\times B) \\cup (A \\times C) \\\\ A \\times (B - C) &= (A \\times B) - (A \\times C) \\\\ (A \\times B) \\cap (C \\times D) &= (A \\cap C) \\times (B \\cap D) \\end{aligned}",
    },
    {
      type: "text",
      content:
        "The last line has a favourite JEE consequence. Put $C = B$ and $D = A$: a pair lies in both $A \\times B$ and $B \\times A$ exactly when **both** its entries lie in $A \\cap B$. So $(A \\times B) \\cap (B \\times A) = (A \\cap B) \\times (A \\cap B)$, which has $n(A \\cap B)^2$ elements. Union does **not** behave this way: $(A \\times B) \\cup (C \\times D)$ is usually smaller than $(A \\cup C) \\times (B \\cup D)$.",
    },
    {
      type: "worked-example",
      id: "srf2-1-we3",
      title: "Worked example 3: a common-pairs count",
      problem:
        "$n(A) = 3$, $n(B) = 4$ and $n(A \\cap B) = 2$. How many elements do $A \\times B$ and $B \\times A$ have in common?",
      steps: [
        { text: "Common elements form $(A \\times B) \\cap (B \\times A) = (A \\cap B) \\times (A \\cap B)$." },
        { text: "That set has $2 \\times 2 = 4$ elements. *Why this step:* the sizes of $A$ and $B$ themselves are a distraction; only the overlap matters." },
      ],
      answer: "4 common elements.",
    },
    {
      type: "worked-example",
      id: "srf2-1-we4",
      title: "Worked example 4: subsets of a product",
      problem:
        "$A = \\{1, 2, 3\\}$ and $B = \\{x, y\\}$. How many subsets of $A \\times B$ have at least 3 elements?",
      steps: [
        { text: "$n(A \\times B) = 3 \\times 2 = 6$, so $A \\times B$ has $2^6 = 64$ subsets." },
        { text: "Subsets with fewer than 3 elements: $\\binom{6}{0} + \\binom{6}{1} + \\binom{6}{2} = 1 + 6 + 15 = 22$. *Why this step:* \"at least\" is easiest through the complement." },
        { text: "So $64 - 22 = 42$ subsets have at least 3 elements." },
      ],
      answer: "42.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "srf2-1-q1",
      variant: "practice",
      question: "If $(2a - 1,\\ b + 3) = (5, 1)$, find $a + b$.",
      answer: 1,
      hint: "Equate first entries and second entries separately.",
      solution: "$2a - 1 = 5$ gives $a = 3$. $b + 3 = 1$ gives $b = -2$. So $a + b = 1$.",
      commonMistakes: [
        { answer: 7, feedback: "You may have taken $b = 4$ by adding 3 instead of subtracting it: $b + 3 = 1$ gives $b = -2$." },
      ],
    },
    {
      type: "quiz",
      id: "srf2-1-q2",
      variant: "concept",
      question: "$A = \\{1, 2\\}$ and $B = \\{3, 4, 5\\}$. Which of these is an element of $A \\times B$?",
      options: [
        { text: "$(2, 5)$", correct: true, feedback: "First entry $2 \\in A$, second entry $5 \\in B$." },
        { text: "$(5, 2)$", feedback: "That is in $B \\times A$: its first entry comes from $B$." },
        { text: "$\\{1, 3\\}$", feedback: "Elements of a product are ordered pairs, not two-element sets." },
        { text: "$(1, 2)$", feedback: "The second entry must come from $B$, and $2 \\notin B$." },
      ],
      hint: "First entry from the first set, second entry from the second set.",
    },
    {
      type: "numeric",
      id: "srf2-1-q3",
      variant: "practice",
      question: "$n(A) = 3$ and $n(B) = 4$. How many elements does $A \\times A \\times B$ have?",
      answer: 36,
      hint: "Choose each of the three entries independently and multiply.",
      solution: "$n(A)\\,n(A)\\,n(B) = 3 \\times 3 \\times 4 = 36$.",
      commonMistakes: [
        { answer: 12, feedback: "That is $n(A \\times B)$. There are three slots: $A$, $A$ and $B$." },
        { answer: 10, feedback: "Sizes multiply in a product, they do not add." },
      ],
    },
    {
      type: "quiz",
      id: "srf2-1-q4",
      variant: "practice",
      question:
        "$A \\times B$ has 6 elements, three of which are $(1, p)$, $(2, q)$ and $(3, p)$. What is $B$?",
      options: [
        { text: "$\\{p, q\\}$", correct: true, feedback: "$n(A) \\ge 3$ and $n(B) \\ge 2$ with product 6 forces $A = \\{1, 2, 3\\}$ and $B = \\{p, q\\}$." },
        { text: "$\\{1, 2, 3\\}$", feedback: "That is $A$: the first entries come from $A$." },
        { text: "$\\{p, q, r\\}$ for some unknown $r$", feedback: "Then $n(A \\times B) \\ge 3 \\times 3 = 9$, too many." },
        { text: "It cannot be determined", feedback: "The count 6 fixes both sizes exactly. Use the product rule." },
      ],
      hint: "Read off which elements must be in $A$ and in $B$, then use $n(A)\\,n(B) = 6$.",
    },
    {
      type: "quiz",
      id: "srf2-1-q5",
      variant: "concept",
      question: "$A = \\{1, 2, 3\\}$. What is $A \\times \\varnothing$?",
      options: [
        { text: "$\\varnothing$", correct: true, feedback: "There is no second entry to choose, so no pair can be formed: $3 \\times 0 = 0$ elements." },
        { text: "$A$", feedback: "The elements of a product are pairs. With nothing in the second set, no pair exists." },
        { text: "$\\{(1, \\varnothing), (2, \\varnothing), (3, \\varnothing)\\}$", feedback: "$\\varnothing$ is not an element of $\\varnothing$, so it cannot be a second entry." },
      ],
      hint: "Count the pairs with the product rule.",
    },
    {
      type: "quiz",
      id: "srf2-1-q6",
      variant: "practice",
      multiple: true,
      question: "For non-empty sets $A$ and $B$, which statements are **always** true? Select all that apply.",
      options: [
        { text: "$n(A \\times B) = n(B \\times A)$", correct: true, feedback: "Both equal $n(A)\\,n(B)$." },
        { text: "$A \\times B = B \\times A$", feedback: "Only when $A = B$. With $A = \\{1\\}$, $B = \\{2\\}$: $\\{(1, 2)\\} \\ne \\{(2, 1)\\}$." },
        { text: "$A \\times (B \\cup C) = (A \\times B) \\cup (A \\times C)$", correct: true, feedback: "The product distributes over union in each slot." },
        { text: "$(A \\times B) \\cup (C \\times D) = (A \\cup C) \\times (B \\cup D)$", feedback: "The right side also contains mixed pairs such as $(a, d)$ with $a \\in A$, $d \\in D$." },
      ],
      hint: "Test each statement on tiny sets such as $\\{1\\}$ and $\\{2\\}$.",
    },
    {
      type: "numeric",
      id: "srf2-1-q7",
      variant: "practice",
      question:
        "$n(A) = 4$, $n(B) = 5$ and $n(A \\cap B) = 3$. Find the number of elements in $(A \\times B) \\cap (B \\times A)$.",
      answer: 9,
      hint: "$(A \\times B) \\cap (B \\times A) = (A \\cap B) \\times (A \\cap B)$.",
      solution: "Both entries must lie in $A \\cap B$, which has 3 elements, so the count is $3^2 = 9$.",
      commonMistakes: [
        { answer: 3, feedback: "The common part is a set of **pairs** from $A \\cap B$, so square the count." },
        { answer: 20, feedback: "That is $n(A \\times B)$. Only pairs lying in both products count." },
      ],
    },
    { type: "heading", text: "JEE-style problems" },
    {
      type: "quiz",
      id: "srf2-1-q8",
      variant: "practice",
      multiple: true,
      question:
        "$A = \\{1, 2, 3\\}$, $B = \\{3, 4\\}$ and $C = \\{4, 5, 6\\}$. Which statements are true? Select all that apply.",
      options: [
        { text: "$A \\times (B \\cap C) = \\{(1, 4), (2, 4), (3, 4)\\}$", correct: true, feedback: "$B \\cap C = \\{4\\}$, so pair each element of $A$ with 4." },
        { text: "$n(A \\times (B \\cup C)) = 12$", correct: true, feedback: "$B \\cup C = \\{3, 4, 5, 6\\}$ has 4 elements: $3 \\times 4 = 12$." },
        { text: "$(A \\times B) \\cap (A \\times C) = \\varnothing$", feedback: "It equals $A \\times (B \\cap C)$, which has 3 elements." },
        { text: "$(3, 3) \\in (A \\times B) \\cap (B \\times A)$", correct: true, feedback: "$3 \\in A \\cap B$, so $(3, 3)$ lies in both products." },
      ],
      hint: "Work out $B \\cap C$ and $B \\cup C$ first, then use the distributive laws.",
    },
    {
      type: "numeric",
      id: "srf2-1-q9",
      variant: "practice",
      question:
        "$A$ has 3 elements and $B$ has 2 elements. How many subsets of $A \\times B$ contain at least 3 elements?",
      answer: 42,
      hint: "Total subsets of a 6-element set, minus those with 0, 1 or 2 elements.",
      solution: "$2^6 - \\left[\\binom60 + \\binom61 + \\binom62\\right] = 64 - 22 = 42$.",
      commonMistakes: [
        { answer: 22, feedback: "That is the number with **fewer** than 3 elements. Subtract it from 64." },
        { answer: 41, feedback: "Did you also subtract the full set? Subsets with all 6 elements do have at least 3." },
      ],
    },
    {
      type: "numeric",
      id: "srf2-1-q10",
      variant: "practice",
      question:
        "$A = \\{x \\in \\mathbb{Z} : x^2 < 5\\}$ and $B = \\{1, 2, 3\\}$. Find $n\\big((A \\times B) \\cap (B \\times A)\\big)$.",
      answer: 4,
      hint: "List $A$, find $A \\cap B$, then square its size.",
      solution: "$A = \\{-2, -1, 0, 1, 2\\}$, so $A \\cap B = \\{1, 2\\}$. The common pairs are $(A \\cap B) \\times (A \\cap B)$, with $2^2 = 4$ elements.",
      commonMistakes: [
        { answer: 9, feedback: "$3 \\notin A$ because $3^2 = 9 > 5$. So $A \\cap B = \\{1, 2\\}$." },
        { answer: 2, feedback: "Square it: the common elements are pairs with both entries in $A \\cap B$." },
      ],
    },
    {
      type: "quiz",
      id: "srf2-1-q11",
      variant: "concept",
      question: "$A$ and $B$ are non-empty sets with $A \\times B = B \\times A$. What can you conclude?",
      options: [
        { text: "$A = B$", correct: true, feedback: "Take $a \\in A$, $b \\in B$. Then $(a, b) \\in B \\times A$, so $a \\in B$ and $b \\in A$. Hence $A \\subseteq B$ and $B \\subseteq A$." },
        { text: "$n(A) = n(B)$ only", feedback: "True, but much more is forced: the sets are equal." },
        { text: "$A \\cap B = \\varnothing$", feedback: "The opposite: every element of $A$ turns out to lie in $B$." },
        { text: "Nothing in particular", feedback: "Chase a single pair $(a, b)$ through the equality." },
      ],
      hint: "Pick any pair $(a, b)$ from $A \\times B$ and ask which sets its entries must belong to.",
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "relations-domain-and-range",
  title: "2.2 · Relations, Domain and Range",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "\"Is the parent of\", \"is less than\", \"has the same remainder as\", \"is perpendicular to\": everyday language is full of ways two things can be related. Mathematics makes all of them one idea. To know a relation completely, you only need the list of pairs that are related. **That list is the relation.**",
    },
    { type: "heading", text: "A relation is a set of pairs" },
    {
      type: "callout",
      variant: "definition",
      title: "Relation",
      content:
        "A **relation** $R$ from a set $A$ to a set $B$ is any subset of $A \\times B$. If $(a, b) \\in R$ we write $a\\,R\\,b$ and say \"$a$ is related to $b$\". A relation from $A$ to itself, $R \\subseteq A \\times A$, is called a **relation on $A$**.",
    },
    {
      type: "text",
      content:
        "Because any subset counts, $\\varnothing$ (the **empty relation**) and the whole of $A \\times A$ (the **universal relation**) are both relations on $A$. A relation can be written in three ways:\n- **Roster form:** $R = \\{(1, 2), (2, 3), (3, 4)\\}$.\n- **Set-builder form:** $R = \\{(a, b) : a, b \\in A,\\ b = a + 1\\}$.\n- **Arrow diagram:** draw the elements as dots and an arrow $a \\to b$ for every pair.",
    },
    {
      type: "interactive",
      config: {
        component: "srf-mapping-explorer",
        mode: "relation",
        domain: ["1", "2", "3", "4"],
        pairs: [
          ["1", "2"],
          ["2", "3"],
          ["3", "4"],
        ],
        caption:
          "This is $R = \\{(a, b) : b = a + 1\\}$ on $A = \\{1, 2, 3, 4\\}$. Read the domain and range under the diagram, then press **Show R⁻¹** and watch every arrow reverse. Tick extra cells to see how the domain and range change.",
      },
    },
    { type: "heading", text: "Domain, codomain and range" },
    {
      type: "callout",
      variant: "definition",
      title: "Domain, codomain, range",
      content:
        "For a relation $R$ from $A$ to $B$:\n- the **domain** is the set of first entries, $\\{a : (a, b) \\in R\\}$\n- the **codomain** is the whole set $B$\n- the **range** is the set of second entries, $\\{b : (a, b) \\in R\\}$.\nAlways domain $\\subseteq A$ and range $\\subseteq$ codomain.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"range = codomain\"",
      content:
        "The codomain is the set you **allow** second entries to come from. The range is what is **actually** hit. For $R = \\{(1, 2), (2, 3), (3, 4)\\}$ on $\\{1, 2, 3, 4\\}$ the codomain is $\\{1, 2, 3, 4\\}$ but the range is only $\\{2, 3, 4\\}$.",
    },
    {
      type: "worked-example",
      id: "srf2-2-we1",
      title: "Worked example 1: a relation from an equation",
      problem:
        "$R = \\{(x, y) : x, y \\in \\mathbb{N},\\ 2x + y = 10\\}$. Write $R$ in roster form and find its domain and range.",
      steps: [
        { text: "Solve for $y$: $y = 10 - 2x$. We need $y \\ge 1$, so $2x \\le 9$, giving $x \\in \\{1, 2, 3, 4\\}$. *Why this step:* the condition $y \\in \\mathbb{N}$ is what cuts the list off." },
        { text: "Pairs: $x = 1 \\Rightarrow y = 8$, $x = 2 \\Rightarrow y = 6$, $x = 3 \\Rightarrow y = 4$, $x = 4 \\Rightarrow y = 2$.", latex: "R = \\{(1, 8), (2, 6), (3, 4), (4, 2)\\}" },
        { text: "Domain = first entries, range = second entries." },
      ],
      answer: "$R = \\{(1, 8), (2, 6), (3, 4), (4, 2)\\}$, domain $\\{1, 2, 3, 4\\}$, range $\\{2, 4, 6, 8\\}$.",
    },
    { type: "heading", text: "How many relations are there?" },
    {
      type: "text",
      content:
        "If $n(A) = m$ and $n(B) = n$, then $A \\times B$ has $mn$ pairs. Building a relation means deciding, for **each** pair, \"in\" or \"out\". That is $mn$ independent yes/no choices:",
    },
    {
      type: "math",
      latex: "\\#\\{\\text{relations from } A \\text{ to } B\\} = 2^{mn}, \\qquad \\#\\{\\text{relations on } A\\} = 2^{n^2} \\text{ when } n(A) = n",
    },
    {
      type: "worked-example",
      id: "srf2-2-we2",
      title: "Worked example 2: counting relations",
      problem:
        "$A = \\{1, 2\\}$ and $B = \\{a, b, c\\}$. (i) How many relations are there from $A$ to $B$? (ii) How many of them contain the pair $(1, a)$? (iii) How many have exactly 2 pairs?",
      steps: [
        { text: "(i) $A \\times B$ has 6 pairs, each in or out: $2^6 = 64$." },
        { text: "(ii) $(1, a)$ is forced in; the other 5 pairs are free: $2^5 = 32$. *Why this step:* a forced pair is no longer a choice, so it drops out of the exponent." },
        { text: "(iii) Choose which 2 of the 6 pairs: $\\binom{6}{2} = 15$." },
      ],
      answer: "64 relations; 32 contain $(1, a)$; 15 have exactly 2 pairs.",
    },
    { type: "heading", text: "The inverse relation" },
    {
      type: "callout",
      variant: "definition",
      title: "Inverse relation",
      content:
        "The **inverse** of $R$ from $A$ to $B$ is the relation from $B$ to $A$ obtained by swapping every pair:\n$$R^{-1} = \\{(b, a) : (a, b) \\in R\\}.$$\nOn an arrow diagram, every arrow turns round. So $\\text{domain}(R^{-1}) = \\text{range}(R)$ and $\\text{range}(R^{-1}) = \\text{domain}(R)$, and $(R^{-1})^{-1} = R$.",
    },
    {
      type: "worked-example",
      id: "srf2-2-we3",
      title: "Worked example 3: inverse of a relation on Z",
      problem:
        "$R = \\{(x, x^2) : x \\in \\{-2, -1, 0, 1, 2\\}\\}$. Find $R^{-1}$, its domain and its range.",
      steps: [
        { text: "$R = \\{(-2, 4), (-1, 1), (0, 0), (1, 1), (2, 4)\\}$." },
        { text: "Swap every pair:", latex: "R^{-1} = \\{(4, -2), (1, -1), (0, 0), (1, 1), (4, 2)\\}" },
        { text: "Domain of $R^{-1}$ = range of $R$ = $\\{0, 1, 4\\}$. Range of $R^{-1}$ = domain of $R$ = $\\{-2, -1, 0, 1, 2\\}$. Notice that 4 is related to two different numbers in $R^{-1}$; Chapter 3 will say that $R^{-1}$ is not a function." },
      ],
      answer: "$R^{-1} = \\{(4, -2), (1, -1), (0, 0), (1, 1), (4, 2)\\}$, domain $\\{0, 1, 4\\}$, range $\\{-2, -1, 0, 1, 2\\}$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "srf2-2-q1",
      variant: "practice",
      question: "How many relations are there from a set with 3 elements to a set with 2 elements?",
      answer: 64,
      hint: "Count the pairs in $A \\times B$; each is in or out.",
      solution: "$A \\times B$ has $3 \\times 2 = 6$ pairs, so there are $2^6 = 64$ relations.",
      commonMistakes: [
        { answer: 6, feedback: "6 is the number of pairs. A relation is any **subset** of those pairs." },
        { answer: 8, feedback: "That is $2^3$. The exponent is the number of pairs, $mn = 6$." },
        { answer: 9, feedback: "That is $3^2$, the number of functions from a 2-set to a 3-set. Relations are subsets of $A \\times B$." },
      ],
    },
    {
      type: "numeric",
      id: "srf2-2-q2",
      variant: "practice",
      question: "How many relations are there on a set with 4 elements?",
      answer: 65536,
      hint: "A relation on $A$ is a subset of $A \\times A$.",
      solution: "$A \\times A$ has $4^2 = 16$ pairs, so there are $2^{16} = 65536$ relations.",
      commonMistakes: [
        { answer: 16, feedback: "16 is the number of pairs in $A \\times A$, not the number of subsets." },
        { answer: 256, feedback: "That is $2^8$. The exponent is $n^2 = 16$." },
      ],
    },
    {
      type: "quiz",
      id: "srf2-2-q3",
      variant: "practice",
      question: "$R = \\{(x, y) : x, y \\in \\mathbb{N},\\ x + 2y = 8\\}$. What is the domain of $R$?",
      options: [
        { text: "$\\{2, 4, 6\\}$", correct: true, feedback: "$y = 1, 2, 3$ give $x = 6, 4, 2$. $y = 4$ gives $x = 0 \\notin \\mathbb{N}$." },
        { text: "$\\{0, 2, 4, 6\\}$", feedback: "$0 \\notin \\mathbb{N}$, so the pair $(0, 4)$ is not allowed." },
        { text: "$\\{1, 2, 3\\}$", feedback: "That is the range: the second entries." },
        { text: "$\\{1, 2, 3, 4, 5, 6, 7, 8\\}$", feedback: "The domain is the set of first entries that actually appear in $R$." },
      ],
      hint: "Run through $y = 1, 2, 3, \\dots$ and keep only natural-number $x$.",
    },
    {
      type: "numeric",
      id: "srf2-2-q4",
      variant: "practice",
      question:
        "$R = \\{(x, x^3) : x \\text{ is a prime number less than } 10\\}$. Find the sum of the elements of the range of $R$.",
      answer: 503,
      hint: "The primes below 10 are 2, 3, 5, 7. The range is the set of their cubes.",
      solution: "Range $= \\{8, 27, 125, 343\\}$, with sum $8 + 27 + 125 + 343 = 503$.",
      commonMistakes: [
        { answer: 17, feedback: "That is the sum of the domain $\\{2, 3, 5, 7\\}$. The range holds the second entries $x^3$." },
        { answer: 504, feedback: "1 is not a prime, so $1^3 = 1$ is not in the range." },
      ],
    },
    {
      type: "quiz",
      id: "srf2-2-q5",
      variant: "concept",
      question: "$R = \\{(1, a), (2, b), (3, a)\\}$ from $\\{1, 2, 3\\}$ to $\\{a, b, c\\}$. What is $R^{-1}$?",
      options: [
        { text: "$\\{(a, 1), (b, 2), (a, 3)\\}$", correct: true, feedback: "Swap each pair. Its domain $\\{a, b\\}$ is the range of $R$." },
        { text: "$\\{(1, a), (2, b), (3, a)\\}$", feedback: "That is $R$ itself. The inverse swaps the entries." },
        { text: "$\\{(a, 1), (b, 2), (c, 3)\\}$", feedback: "$c$ is not related to anything; only existing pairs are swapped." },
        { text: "Not defined, since $a$ appears twice", feedback: "Every relation has an inverse relation. (Whether it is a **function** is a separate question.)" },
      ],
      hint: "Turn every arrow round.",
    },
    {
      type: "quiz",
      id: "srf2-2-q6",
      variant: "concept",
      multiple: true,
      question: "For a relation $R$ from $A$ to $B$, which statements are always true? Select all that apply.",
      options: [
        { text: "The range of $R$ is a subset of $B$.", correct: true, feedback: "Second entries come from $B$." },
        { text: "The range of $R$ equals $B$.", feedback: "Only if every element of $B$ is hit. The empty relation has empty range." },
        { text: "The domain of $R^{-1}$ equals the range of $R$.", correct: true, feedback: "Swapping pairs swaps the roles of first and second entries." },
        { text: "$R \\subseteq A \\times B$", correct: true, feedback: "That is the definition of a relation from $A$ to $B$." },
      ],
      hint: "Separate what is **allowed** (codomain) from what is **used** (range).",
    },
    {
      type: "numeric",
      id: "srf2-2-q7",
      variant: "practice",
      question: "$A = \\{1, 2\\}$ and $B = \\{4, 5, 6\\}$. How many **non-empty** relations are there from $A$ to $B$?",
      answer: 63,
      hint: "All relations minus the empty one.",
      solution: "$2^{2 \\times 3} - 1 = 64 - 1 = 63$.",
      commonMistakes: [{ answer: 64, feedback: "That includes the empty relation $\\varnothing$." }],
    },
    { type: "heading", text: "JEE-style problems" },
    {
      type: "numeric",
      id: "srf2-2-q8",
      variant: "practice",
      question:
        "$A$ and $B$ each have 3 elements, and $(a_1, b_1)$ is a fixed element of $A \\times B$. How many relations from $A$ to $B$ contain $(a_1, b_1)$?",
      answer: 256,
      hint: "One pair is forced in; the rest are free.",
      solution: "$A \\times B$ has 9 pairs. With $(a_1, b_1)$ forced in, the other 8 are free: $2^8 = 256$.",
      commonMistakes: [
        { answer: 512, feedback: "That is all relations. Half of them leave $(a_1, b_1)$ out." },
        { answer: 255, feedback: "Forcing one pair in halves the count: $2^9 / 2 = 2^8$." },
      ],
    },
    {
      type: "quiz",
      id: "srf2-2-q9",
      variant: "practice",
      multiple: true,
      question: "$R = \\{(a, b) \\in \\mathbb{Z} \\times \\mathbb{Z} : b = a^2\\}$. Which statements are true? Select all that apply.",
      options: [
        { text: "$(-3, 9) \\in R$", correct: true, feedback: "$(-3)^2 = 9$." },
        { text: "$(9, -3) \\in R^{-1}$", correct: true, feedback: "$(9, -3) \\in R^{-1}$ exactly when $(-3, 9) \\in R$, which holds." },
        { text: "The domain of $R$ is $\\mathbb{Z}$.", correct: true, feedback: "Every integer $a$ has $(a, a^2) \\in R$." },
        { text: "The range of $R$ is $\\mathbb{Z}$.", feedback: "Only perfect squares $0, 1, 4, 9, \\dots$ appear as second entries." },
      ],
      hint: "Check each pair against $b = a^2$; for $R^{-1}$, swap first.",
    },
    {
      type: "numeric",
      id: "srf2-2-q10",
      variant: "practice",
      question: "$A = \\{1, 2, 3\\}$ and $B = \\{4, 5\\}$. How many relations from $A$ to $B$ contain exactly 2 ordered pairs?",
      answer: 15,
      hint: "Choose 2 of the pairs in $A \\times B$.",
      solution: "$A \\times B$ has 6 pairs; choose 2 of them: $\\binom{6}{2} = 15$.",
      commonMistakes: [
        { answer: 30, feedback: "The two pairs are chosen, not arranged: a relation is a set, so order does not matter." },
        { answer: 64, feedback: "That counts all relations, of every size." },
      ],
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "reflexive-symmetric-transitive",
  title: "2.3 · Reflexive, Symmetric, Transitive",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "Compare three relations on a set of people: \"lives in the same city as\", \"is a friend of\" and \"is taller than\". Everybody lives in the same city as themselves; nobody is taller than themselves. Friendship goes both ways; height does not. If $a$ is taller than $b$ and $b$ is taller than $c$, then $a$ is taller than $c$; friendship has no such guarantee. These three yes/no questions are the **reflexive**, **symmetric** and **transitive** properties, and on an arrow diagram each one is something you can see.",
    },
    { type: "heading", text: "The three properties" },
    {
      type: "callout",
      variant: "definition",
      title: "Reflexive, symmetric, transitive",
      content:
        "Let $R$ be a relation on a set $A$.\n- **Reflexive:** $(a, a) \\in R$ for **every** $a \\in A$. Picture: a loop at every dot.\n- **Symmetric:** $(a, b) \\in R \\Rightarrow (b, a) \\in R$. Picture: every arrow is two-way.\n- **Transitive:** $(a, b) \\in R$ and $(b, c) \\in R \\Rightarrow (a, c) \\in R$. Picture: every two-step path $a \\to b \\to c$ has a one-step shortcut $a \\to c$.",
    },
    {
      type: "text",
      content:
        "Below is $R = \\{(1, 1), (2, 2), (3, 3), (1, 2), (2, 1), (2, 3)\\}$ on $\\{1, 2, 3\\}$. The checker names the pair that breaks each property. Try fixing them one at a time: which single pair would you add to make it symmetric? Does that break or fix transitivity?",
    },
    {
      type: "interactive",
      config: {
        component: "srf-mapping-explorer",
        mode: "relation",
        domain: ["1", "2", "3"],
        pairs: [
          ["1", "1"],
          ["2", "2"],
          ["3", "3"],
          ["1", "2"],
          ["2", "1"],
          ["2", "3"],
        ],
        caption:
          "Loops = reflexive, two-way arrows = symmetric, shortcuts for every two-step path = transitive. Adding $(3, 2)$ makes $R$ symmetric, but then $1 \\to 2 \\to 3$ still needs the shortcut $(1, 3)$.",
      },
    },
    {
      type: "worked-example",
      id: "srf2-3-we1",
      title: "Worked example 1: checking all three",
      problem:
        "On $A = \\{1, 2, 3\\}$, is $R = \\{(1, 1), (2, 2), (3, 3), (1, 2), (2, 1), (2, 3)\\}$ reflexive, symmetric, transitive?",
      steps: [
        { text: "**Reflexive:** $(1, 1), (2, 2), (3, 3)$ are all present. Yes." },
        { text: "**Symmetric:** $(2, 3) \\in R$ but $(3, 2) \\notin R$. No. *Why this step:* one counterexample is enough to kill a \"for all\" property." },
        { text: "**Transitive:** $(1, 2) \\in R$ and $(2, 3) \\in R$, but $(1, 3) \\notin R$. No." },
      ],
      answer: "Reflexive, not symmetric, not transitive.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Checking transitivity without missing a case",
      content:
        "Go through the pairs one at a time. For each $(a, b)$, look at **every arrow leaving $b$**, say $b \\to c$, and check that $a \\to c$ is present. Do not forget $c = a$: the path $a \\to b \\to a$ demands the loop $(a, a)$.",
    },
    {
      type: "worked-example",
      id: "srf2-3-we2",
      title: "Worked example 2: the hidden loop",
      problem: "On $A = \\{1, 2, 3\\}$, is $R = \\{(1, 2), (2, 1)\\}$ transitive?",
      steps: [
        { text: "Take $(1, 2)$. Arrows leaving 2: only $2 \\to 1$. So we need $(1, 1)$." },
        { text: "$(1, 1) \\notin R$. So $R$ is **not** transitive. (Similarly $(2, 1), (1, 2)$ would need $(2, 2)$.) *Why this step:* a two-way arrow is a two-step path back to the start, and transitivity demands a loop there." },
        { text: "For completeness: $R$ is symmetric, and not reflexive (no loops at all)." },
      ],
      answer: "Not transitive: $(1, 2), (2, 1) \\in R$ but $(1, 1) \\notin R$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"reflexive means some (a, a) is present\"",
      content:
        "Reflexive means **every** element has its loop. $\\{(1, 1), (2, 2)\\}$ on $\\{1, 2, 3\\}$ is not reflexive, because $(3, 3)$ is missing. The set $A$ matters: the same pairs on $\\{1, 2\\}$ would be reflexive.",
    },
    { type: "heading", text: "Three special relations" },
    {
      type: "table",
      headers: ["Relation on $A$ (non-empty)", "Reflexive", "Symmetric", "Transitive"],
      rows: [
        ["Empty relation $\\varnothing$", "No", "Yes (vacuously)", "Yes (vacuously)"],
        ["Identity relation $I_A = \\{(a, a) : a \\in A\\}$", "Yes", "Yes", "Yes"],
        ["Universal relation $A \\times A$", "Yes", "Yes", "Yes"],
      ],
    },
    {
      type: "text",
      content:
        "Why is the empty relation symmetric? The rule says \"**if** $(a, b) \\in R$, **then** $(b, a) \\in R$\". With no pairs at all, there is no case in which the \"if\" holds, so there is nothing to fail. This is **vacuous truth**, and JEE loves it. The same logic makes $\\{(1, 2)\\}$ transitive: there is no two-step path at all.",
    },
    {
      type: "worked-example",
      id: "srf2-3-we3",
      title: "Worked example 3: making a relation reflexive and transitive",
      problem:
        "$R = \\{(1, 2), (2, 3)\\}$ on $A = \\{1, 2, 3\\}$. What is the least number of pairs to add so that $R$ becomes reflexive and transitive?",
      steps: [
        { text: "Reflexive forces the three loops $(1, 1), (2, 2), (3, 3)$." },
        { text: "Transitive: the path $1 \\to 2 \\to 3$ forces $(1, 3)$." },
        { text: "Check the new set $\\{(1, 1), (2, 2), (3, 3), (1, 2), (2, 3), (1, 3)\\}$: every two-step path now has its shortcut, so nothing more is forced. *Why this step:* an added pair can create new paths, so always re-check after adding." },
      ],
      answer: "4 pairs: $(1, 1), (2, 2), (3, 3), (1, 3)$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "srf2-3-q1",
      variant: "practice",
      multiple: true,
      question:
        "$R = \\{(1, 1), (2, 2), (1, 2)\\}$ on $A = \\{1, 2, 3\\}$. Which properties does $R$ have? Select all that apply.",
      options: [
        { text: "Reflexive", feedback: "$(3, 3)$ is missing." },
        { text: "Symmetric", feedback: "$(1, 2) \\in R$ but $(2, 1) \\notin R$." },
        { text: "Transitive", correct: true, feedback: "The only two-step paths are $1 \\to 1 \\to 2$ and $1 \\to 2 \\to 2$, whose shortcut $(1, 2)$ is present." },
      ],
      hint: "Check loops for every element of $A$, reverses of every pair, and shortcuts for every two-step path.",
    },
    {
      type: "quiz",
      id: "srf2-3-q2",
      variant: "concept",
      multiple: true,
      question: "Which properties does the empty relation on $A = \\{1, 2\\}$ have? Select all that apply.",
      options: [
        { text: "Reflexive", feedback: "$(1, 1)$ and $(2, 2)$ are missing. Reflexivity demands pairs, so it is not vacuous." },
        { text: "Symmetric", correct: true, feedback: "No pair exists to violate the \"if ... then\" rule." },
        { text: "Transitive", correct: true, feedback: "No two-step path exists, so no shortcut is required." },
      ],
      hint: "Symmetric and transitive are \"if ... then\" rules. Reflexive is a demand that pairs exist.",
    },
    {
      type: "quiz",
      id: "srf2-3-q3",
      variant: "concept",
      question: "$R = \\{(1, 2), (2, 1)\\}$ on $A = \\{1, 2\\}$. Why is $R$ **not** transitive?",
      options: [
        { text: "$(1, 2)$ and $(2, 1)$ are in $R$ but $(1, 1)$ is not.", correct: true, feedback: "The path $1 \\to 2 \\to 1$ demands the loop $(1, 1)$." },
        { text: "It has no three distinct elements $a, b, c$.", feedback: "Transitivity does not require distinct elements: $c$ may equal $a$." },
        { text: "It is symmetric, and symmetric relations are never transitive.", feedback: "The identity relation is both symmetric and transitive." },
        { text: "It is actually transitive.", feedback: "Follow the arrow $1 \\to 2$ and then $2 \\to 1$." },
      ],
      hint: "Trace $1 \\to 2 \\to 1$. What shortcut does that two-step path need?",
    },
    {
      type: "numeric",
      id: "srf2-3-q4",
      variant: "practice",
      question:
        "$R = \\{(1, 2), (2, 1)\\}$ on $A = \\{1, 2, 3\\}$. What is the least number of pairs that must be added to make $R$ transitive?",
      answer: 2,
      hint: "Find every two-step path and the shortcut it needs.",
      solution: "$1 \\to 2 \\to 1$ needs $(1, 1)$, and $2 \\to 1 \\to 2$ needs $(2, 2)$. After adding them, all paths have shortcuts. So 2 pairs. (The loop $(3, 3)$ is not needed for transitivity.)",
      commonMistakes: [
        { answer: 3, feedback: "$(3, 3)$ is needed for reflexivity, not transitivity: 3 is not on any path." },
        { answer: 0, feedback: "The path $1 \\to 2 \\to 1$ needs the loop $(1, 1)$." },
      ],
    },
    {
      type: "numeric",
      id: "srf2-3-q5",
      variant: "practice",
      question: "How many ordered pairs does the smallest reflexive relation on $\\{a, b, c, d\\}$ contain?",
      answer: 4,
      hint: "Reflexive forces exactly the loops; nothing else is required.",
      solution: "The smallest reflexive relation is the identity relation $\\{(a, a), (b, b), (c, c), (d, d)\\}$: 4 pairs.",
      commonMistakes: [{ answer: 16, feedback: "That is the universal relation, the **largest** reflexive relation." }],
    },
    {
      type: "quiz",
      id: "srf2-3-q6",
      variant: "practice",
      question:
        "On $A = \\{1, 2, 3\\}$, $R = \\{(1, 1), (2, 2), (3, 3), (1, 2), (2, 3), (1, 3)\\}$. Which description is correct?",
      options: [
        { text: "Reflexive and transitive, not symmetric", correct: true, feedback: "All loops present; the only path with distinct ends, $1 \\to 2 \\to 3$, has its shortcut; $(1, 2)$ has no reverse." },
        { text: "Reflexive, symmetric and transitive", feedback: "$(1, 2) \\in R$ but $(2, 1) \\notin R$." },
        { text: "Reflexive and symmetric, not transitive", feedback: "Check $1 \\to 2 \\to 3$: the shortcut $(1, 3)$ is there." },
        { text: "Transitive only", feedback: "All three loops are present, so it is reflexive too." },
      ],
      hint: "This is the \"$\\le$\" relation on $\\{1, 2, 3\\}$.",
    },
    {
      type: "quiz",
      id: "srf2-3-q7",
      variant: "concept",
      question: "Is $R = \\{(1, 2)\\}$ on $A = \\{1, 2, 3\\}$ transitive?",
      options: [
        { text: "Yes, since there is no two-step path at all", correct: true, feedback: "From 2 no arrow leaves, so no shortcut is ever demanded. Vacuously transitive." },
        { text: "No, because $(2, 1)$ is missing", feedback: "That is the symmetric property, not the transitive one." },
        { text: "No, because $(1, 1)$ is missing", feedback: "$(1, 1)$ would only be needed if there were a path $1 \\to b \\to 1$." },
      ],
      hint: "Look for a pair $(a, b)$ followed by a pair starting at $b$.",
    },
    { type: "heading", text: "JEE-style problems" },
    {
      type: "quiz",
      id: "srf2-3-q8",
      variant: "practice",
      multiple: true,
      question:
        "On $A = \\{1, 2, 3, 4\\}$, let $R = \\{(1, 3), (4, 2), (2, 4), (2, 3), (3, 1)\\}$. Which statements are true? Select all that apply.",
      options: [
        { text: "$R$ is not reflexive.", correct: true, feedback: "It has no loops at all." },
        { text: "$R$ is not symmetric.", correct: true, feedback: "$(2, 3) \\in R$ but $(3, 2) \\notin R$." },
        { text: "$R$ is not transitive.", correct: true, feedback: "$(1, 3), (3, 1) \\in R$ but $(1, 1) \\notin R$." },
        { text: "$R$ is symmetric.", feedback: "Every pair except $(2, 3)$ has its reverse, and one exception is enough." },
      ],
      hint: "Check each pair's reverse, and the two-step paths $1 \\to 3 \\to 1$ and $4 \\to 2 \\to 4$.",
    },
    {
      type: "quiz",
      id: "srf2-3-q9",
      variant: "practice",
      multiple: true,
      question:
        "On a set of people (with at least two siblings in it), $a\\,R\\,b$ means \"$a$ is a sibling of $b$\" ($a \\ne b$, sharing both parents). Which properties does $R$ have? Select all that apply.",
      options: [
        { text: "Reflexive", feedback: "Nobody is their own sibling." },
        { text: "Symmetric", correct: true, feedback: "If $a$ is a sibling of $b$, then $b$ is a sibling of $a$." },
        { text: "Transitive", feedback: "$a R b$ and $b R a$ would force $a R a$, which is false. The hidden-loop trap again." },
      ],
      hint: "For transitivity, try the path $a \\to b \\to a$.",
    },
    {
      type: "numeric",
      id: "srf2-3-q10",
      variant: "practice",
      question:
        "$R = \\{(1, 2), (2, 3)\\}$ on $A = \\{1, 2, 3\\}$. What is the least number of pairs to add so that $R$ becomes reflexive and transitive?",
      answer: 4,
      hint: "Add the loops, then the shortcut for $1 \\to 2 \\to 3$, then re-check.",
      solution: "Loops $(1, 1), (2, 2), (3, 3)$ and the shortcut $(1, 3)$. The result has every shortcut it needs. So 4 pairs.",
      commonMistakes: [
        { answer: 3, feedback: "The loops make it reflexive, but $1 \\to 2 \\to 3$ still needs $(1, 3)$." },
        { answer: 7, feedback: "That makes it an equivalence relation. Symmetry was not asked for." },
      ],
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "antisymmetric-and-standard-relations",
  title: "2.4 · Antisymmetric Relations and the Standard Examples",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "\"Is at most\" ($\\le$) is not symmetric: $2 \\le 5$ but $5 \\not\\le 2$. In fact it fails symmetry as badly as possible: the **only** way to have both $a \\le b$ and $b \\le a$ is $a = b$. That stronger behaviour has its own name, **antisymmetric**, and it marks the relations that put things in order. This lesson pins it down, then works through the relations on $\\mathbb{Z}$, $\\mathbb{R}$, lines and triangles that JEE uses again and again.",
    },
    { type: "heading", text: "Antisymmetric relations" },
    {
      type: "callout",
      variant: "definition",
      title: "Antisymmetric",
      content:
        "A relation $R$ on $A$ is **antisymmetric** if\n$$(a, b) \\in R \\text{ and } (b, a) \\in R \\implies a = b.$$\nPicture: no two-way arrow between **different** elements. Loops are allowed.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a relation must be either symmetric or antisymmetric\"",
      content:
        "\"Antisymmetric\" is not the same as \"not symmetric\". On $\\{1, 2, 3\\}$:\n- $\\{(1, 2), (2, 1), (1, 3)\\}$ is **neither**: it has a two-way arrow $1 \\leftrightarrow 2$ and a one-way arrow $1 \\to 3$.\n- $\\{(1, 1), (2, 2)\\}$ and $\\varnothing$ are **both**: no arrows between different elements at all.\nIn fact a relation is both symmetric and antisymmetric exactly when it contains nothing but loops.",
    },
    {
      type: "interactive",
      config: {
        component: "srf-mapping-explorer",
        mode: "relation",
        domain: ["1", "2", "3", "4", "6"],
        pairs: [
          ["1", "1"],
          ["1", "2"],
          ["1", "3"],
          ["1", "4"],
          ["1", "6"],
          ["2", "2"],
          ["2", "4"],
          ["2", "6"],
          ["3", "3"],
          ["3", "6"],
          ["4", "4"],
          ["6", "6"],
        ],
        caption:
          "\"$a$ divides $b$\" on $\\{1, 2, 3, 4, 6\\}$: reflexive, antisymmetric and transitive, the pattern of an **ordering**. Add the pair $(2, 1)$ and watch antisymmetry fail.",
      },
    },
    { type: "heading", text: "The standard examples" },
    {
      type: "text",
      content:
        "To show a property **holds**, argue for arbitrary elements. To show it **fails**, one concrete counterexample is enough. The table collects the relations that come up most often; the worked examples below show how the less obvious entries are decided.",
    },
    {
      type: "table",
      headers: ["Relation", "Reflexive", "Symmetric", "Transitive", "Antisymmetric"],
      rows: [
        ["$a \\le b$ on $\\mathbb{R}$", "Yes", "No", "Yes", "Yes"],
        ["$a < b$ on $\\mathbb{R}$", "No", "No", "Yes", "Yes (vacuously)"],
        ["$a \\mid b$ on $\\mathbb{N}$", "Yes", "No", "Yes", "Yes"],
        ["$a \\mid b$ on $\\mathbb{Z}$", "Yes", "No", "Yes", "No: $2 \\mid -2$, $-2 \\mid 2$"],
        ["$a - b$ even, on $\\mathbb{Z}$", "Yes", "Yes", "Yes", "No"],
        ["$\\lvert a - b\\rvert \\le 1$ on $\\mathbb{R}$", "Yes", "Yes", "No", "No"],
        ["$ab \\ge 0$ on $\\mathbb{R}$", "Yes", "Yes", "No", "No"],
        ["$1 + ab > 0$ on $\\mathbb{R}$", "Yes", "Yes", "No", "No"],
        ["$a \\le b^2$ on $\\mathbb{R}$", "No", "No", "No", "No"],
        ["$L_1 \\parallel L_2$ (lines, a line parallel to itself)", "Yes", "Yes", "Yes", "No"],
        ["$L_1 \\perp L_2$ (lines in a plane)", "No", "Yes", "No", "No"],
        ["$T_1 \\sim T_2$ (similar triangles)", "Yes", "Yes", "Yes", "No"],
      ],
    },
    {
      type: "worked-example",
      id: "srf2-4-we1",
      title: "Worked example 1: $1 + ab > 0$",
      problem: "On $\\mathbb{R}$, let $a\\,R\\,b \\iff 1 + ab > 0$. Decide reflexive, symmetric, transitive.",
      steps: [
        { text: "**Reflexive:** $1 + a \\cdot a = 1 + a^2 \\ge 1 > 0$ for every real $a$. Yes." },
        { text: "**Symmetric:** $1 + ab = 1 + ba$, so the condition does not care about order. Yes." },
        { text: "**Transitive:** look for $a\\,R\\,b$, $b\\,R\\,c$ with $a$ and $c$ of opposite signs and large. Take $a = 1$, $b = -\\tfrac12$, $c = -2$. *Why this step:* $b$ must be small so that it is related to both, while $a$ and $c$ multiply to something below $-1$." },
        { text: "Check: $1 + (1)(-\\tfrac12) = \\tfrac12 > 0$ and $1 + (-\\tfrac12)(-2) = 2 > 0$, but $1 + (1)(-2) = -1 < 0$. So $a\\,R\\,b$, $b\\,R\\,c$ but not $a\\,R\\,c$." },
      ],
      answer: "Reflexive and symmetric, not transitive.",
    },
    {
      type: "worked-example",
      id: "srf2-4-we2",
      title: "Worked example 2: $a \\le b^2$",
      problem: "On $\\mathbb{R}$, let $a\\,R\\,b \\iff a \\le b^2$. Decide reflexive, symmetric, transitive.",
      steps: [
        { text: "**Reflexive?** Need $a \\le a^2$ for all $a$. Fails at $a = \\tfrac12$: $\\tfrac12 > \\tfrac14$. No. *Why this step:* numbers between 0 and 1 shrink when squared, which is where $a \\le a^2$ breaks." },
        { text: "**Symmetric?** $1 \\le 2^2$, so $1\\,R\\,2$. But $2 \\le 1^2$ is false. No." },
        { text: "**Transitive?** $3 \\le 2^2$ and $2 \\le (1.5)^2 = 2.25$, so $3\\,R\\,2$ and $2\\,R\\,1.5$. But $3 \\le 2.25$ is false. No." },
      ],
      answer: "Neither reflexive, nor symmetric, nor transitive.",
    },
    {
      type: "worked-example",
      id: "srf2-4-we3",
      title: "Worked example 3: divisibility on N and on Z",
      problem: "Is \"$a$ divides $b$\" antisymmetric on $\\mathbb{N}$? On $\\mathbb{Z}$?",
      steps: [
        { text: "On $\\mathbb{N}$: if $a \\mid b$ and $b \\mid a$, then $a \\le b$ and $b \\le a$ (a positive multiple is at least as big), so $a = b$. Antisymmetric." },
        { text: "On $\\mathbb{Z}$: $2 \\mid -2$ (as $-2 = (-1) \\cdot 2$) and $-2 \\mid 2$, but $2 \\ne -2$. Not antisymmetric. *Why this step:* negative numbers break the size argument, since $b = -a$ is a multiple of $a$ of the same size." },
      ],
      answer: "Antisymmetric on $\\mathbb{N}$, not antisymmetric on $\\mathbb{Z}$.",
    },
    {
      type: "worked-example",
      id: "srf2-4-we4",
      title: "Worked example 4: perpendicular lines",
      problem: "On the set of lines in a plane, $L_1\\,R\\,L_2 \\iff L_1 \\perp L_2$. Decide reflexive, symmetric, transitive.",
      steps: [
        { text: "**Reflexive:** no line is perpendicular to itself. No." },
        { text: "**Symmetric:** if $L_1 \\perp L_2$ then $L_2 \\perp L_1$. Yes." },
        { text: "**Transitive:** if $L_1 \\perp L_2$ and $L_2 \\perp L_3$, then $L_1 \\parallel L_3$ (both make $90°$ with $L_2$), so $L_1 \\not\\perp L_3$. No. *Why this step:* in a plane, two right-angle turns bring you back to the original direction." },
      ],
      answer: "Symmetric only.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "srf2-4-q1",
      variant: "concept",
      question: "Which relation on $\\{1, 2, 3\\}$ is antisymmetric but **not** symmetric?",
      options: [
        { text: "$\\{(1, 2), (2, 3)\\}$", correct: true, feedback: "No two-way arrows, so antisymmetric. $(1, 2)$ has no reverse, so not symmetric." },
        { text: "$\\{(1, 2), (2, 1)\\}$", feedback: "Symmetric, and not antisymmetric: $1 \\leftrightarrow 2$ is a two-way arrow between different elements." },
        { text: "$\\{(1, 1), (2, 2)\\}$", feedback: "Only loops: this one is both symmetric and antisymmetric." },
        { text: "$\\{(1, 2), (2, 1), (1, 3)\\}$", feedback: "Neither: two-way $1 \\leftrightarrow 2$ kills antisymmetry, one-way $1 \\to 3$ kills symmetry." },
      ],
      hint: "Antisymmetric = no two-way arrow between different elements.",
    },
    {
      type: "quiz",
      id: "srf2-4-q2",
      variant: "practice",
      multiple: true,
      question: "On $\\mathbb{R}$, $a\\,R\\,b \\iff \\lvert a - b\\rvert \\le 1$. Which properties does $R$ have? Select all that apply.",
      options: [
        { text: "Reflexive", correct: true, feedback: "$\\lvert a - a\\rvert = 0 \\le 1$." },
        { text: "Symmetric", correct: true, feedback: "$\\lvert a - b\\rvert = \\lvert b - a\\rvert$." },
        { text: "Transitive", feedback: "$0\\,R\\,1$ and $1\\,R\\,2$, but $\\lvert 0 - 2\\rvert = 2 > 1$." },
        { text: "Antisymmetric", feedback: "$0\\,R\\,0.5$ and $0.5\\,R\\,0$ with $0 \\ne 0.5$." },
      ],
      hint: "For transitivity, chain two steps of size 1.",
    },
    {
      type: "quiz",
      id: "srf2-4-q3",
      variant: "practice",
      question: "On $\\mathbb{R}$, $a\\,R\\,b \\iff ab \\ge 0$. Which pair of facts shows that $R$ is **not** transitive?",
      options: [
        { text: "$(-1)\\,R\\,0$ and $0\\,R\\,1$, but not $(-1)\\,R\\,1$", correct: true, feedback: "Zero is related to everything, so it bridges a negative and a positive number." },
        { text: "$1\\,R\\,2$ and $2\\,R\\,3$, but not $1\\,R\\,3$", feedback: "$1 \\cdot 3 = 3 \\ge 0$, so $1\\,R\\,3$ holds." },
        { text: "$(-1)\\,R\\,(-2)$ and $(-2)\\,R\\,(-3)$, but not $(-1)\\,R\\,(-3)$", feedback: "$(-1)(-3) = 3 \\ge 0$, so it holds." },
        { text: "$R$ is transitive", feedback: "Look at what the number 0 is related to." },
      ],
      hint: "Which number is related to every real number?",
    },
    {
      type: "quiz",
      id: "srf2-4-q4",
      variant: "practice",
      multiple: true,
      question: "On the set of lines in a plane, $L_1\\,R\\,L_2 \\iff L_1 \\perp L_2$. Which properties does $R$ have? Select all that apply.",
      options: [
        { text: "Reflexive", feedback: "No line is perpendicular to itself." },
        { text: "Symmetric", correct: true, feedback: "Perpendicularity works both ways." },
        { text: "Transitive", feedback: "$L_1 \\perp L_2$ and $L_2 \\perp L_3$ give $L_1 \\parallel L_3$." },
        { text: "Antisymmetric", feedback: "$L_1 \\perp L_2$ and $L_2 \\perp L_1$ with $L_1 \\ne L_2$." },
      ],
      hint: "Draw three lines: what is the angle between the first and the third?",
    },
    {
      type: "quiz",
      id: "srf2-4-q5",
      variant: "concept",
      question: "\"$a$ divides $b$\" is antisymmetric on $\\mathbb{N}$. Why is it **not** antisymmetric on $\\mathbb{Z}$?",
      options: [
        { text: "$3 \\mid -3$ and $-3 \\mid 3$, but $3 \\ne -3$", correct: true, feedback: "Negatives allow $a$ and $-a$ to divide each other." },
        { text: "$0$ divides nothing", feedback: "That has nothing to do with antisymmetry, which is about two-way pairs." },
        { text: "It is not reflexive on $\\mathbb{Z}$", feedback: "Reflexivity is a separate property; every integer divides itself anyway." },
        { text: "$2 \\mid 4$ but $4 \\nmid 2$", feedback: "That shows it is not symmetric, which is no obstacle to antisymmetry." },
      ],
      hint: "Look for two **different** integers that divide each other.",
    },
    {
      type: "quiz",
      id: "srf2-4-q6",
      variant: "practice",
      multiple: true,
      question: "On $\\mathbb{N}$, $a\\,R\\,b \\iff a + b = 10$. Which properties does $R$ have? Select all that apply.",
      options: [
        { text: "Reflexive", feedback: "$a + a = 10$ only for $a = 5$, so for example $(1, 1) \\notin R$." },
        { text: "Symmetric", correct: true, feedback: "$a + b = b + a$." },
        { text: "Transitive", feedback: "$(1, 9)$ and $(9, 1)$ are in $R$, but $(1, 1)$ is not." },
      ],
      hint: "Reflexive needs $a + a = 10$ for **every** $a \\in \\mathbb{N}$.",
    },
    {
      type: "numeric",
      id: "srf2-4-q7",
      variant: "practice",
      question:
        "On $A = \\{1, 2, 3, 4, 5, 6\\}$, $R = \\{(a, b) : a \\text{ divides } b\\}$. How many ordered pairs are in $R$?",
      answer: 14,
      hint: "For each $b$, count its divisors in $A$.",
      solution: "Number of divisors: $b = 1$: 1, $b = 2$: 2, $b = 3$: 2, $b = 4$: 3, $b = 5$: 2, $b = 6$: 4. Total $1 + 2 + 2 + 3 + 2 + 4 = 14$.",
      commonMistakes: [
        { answer: 8, feedback: "Don't forget the loops: every number divides itself." },
        { answer: 15, feedback: "Count again for $b = 5$: its divisors in $A$ are only 1 and 5." },
      ],
    },
    {
      type: "quiz",
      id: "srf2-4-q8",
      variant: "practice",
      multiple: true,
      question: "Which relations on $\\{1, 2, 3\\}$ are **both** symmetric and antisymmetric? Select all that apply.",
      options: [
        { text: "$\\varnothing$", correct: true, feedback: "No pairs, so both rules hold vacuously." },
        { text: "$\\{(1, 1), (2, 2), (3, 3)\\}$", correct: true, feedback: "Only loops: every arrow is its own reverse, and no two-way arrow joins different elements." },
        { text: "$\\{(2, 2)\\}$", correct: true, feedback: "A single loop. Symmetric and antisymmetric." },
        { text: "$\\{(1, 2), (2, 1)\\}$", feedback: "Symmetric, but $1 \\ne 2$ are joined both ways." },
      ],
      hint: "Both at once forces every arrow to be a loop.",
    },
    { type: "heading", text: "JEE-style problems" },
    {
      type: "quiz",
      id: "srf2-4-q9",
      variant: "practice",
      question:
        "On $\\mathbb{R}$, $a\\,R\\,b \\iff 1 + ab > 0$. Which statement is correct?",
      options: [
        { text: "$R$ is reflexive and symmetric but not transitive.", correct: true, feedback: "$1 + a^2 > 0$ and $1 + ab = 1 + ba$, but $1\\,R\\,(-\\tfrac12)$, $(-\\tfrac12)\\,R\\,(-2)$ and not $1\\,R\\,(-2)$." },
        { text: "$R$ is an equivalence relation.", feedback: "Transitivity fails: try $a = 1$, $b = -\\tfrac12$, $c = -2$." },
        { text: "$R$ is symmetric and transitive but not reflexive.", feedback: "$1 + a^2 \\ge 1 > 0$, so every $a$ is related to itself." },
        { text: "$R$ is reflexive and transitive but not symmetric.", feedback: "$ab = ba$, so the condition is symmetric." },
      ],
      hint: "Reflexive and symmetric are quick. For transitivity, use a small middle number between a positive and a negative one.",
    },
    {
      type: "quiz",
      id: "srf2-4-q10",
      variant: "practice",
      question:
        "On $A = \\{3, 6, 9, 12\\}$, $R = \\{(3, 3), (6, 6), (9, 9), (12, 12), (6, 12), (3, 9), (3, 12), (3, 6)\\}$. Among reflexive, symmetric and transitive, $R$ is",
      options: [
        { text: "reflexive and transitive only", correct: true, feedback: "All loops present, every path such as $3 \\to 6 \\to 12$ has its shortcut, and $(6, 12)$ has no reverse." },
        { text: "an equivalence relation", feedback: "$(3, 6) \\in R$ but $(6, 3) \\notin R$." },
        { text: "reflexive and symmetric only", feedback: "No pair between different elements has its reverse." },
        { text: "reflexive only", feedback: "Check the paths: $3 \\to 6 \\to 12$ needs $(3, 12)$, which is present." },
      ],
      hint: "This is \"$a$ divides $b$\" restricted to a few pairs. Check $3 \\to 6 \\to 12$.",
    },
    {
      type: "quiz",
      id: "srf2-4-q11",
      variant: "practice",
      question: "On $\\mathbb{R}$, $a\\,R\\,b \\iff a \\le b^2$. Which statement is correct?",
      options: [
        { text: "$R$ is neither reflexive, nor symmetric, nor transitive.", correct: true, feedback: "$\\tfrac12 > \\tfrac14$, $1\\,R\\,2$ but not $2\\,R\\,1$, and $3\\,R\\,2$, $2\\,R\\,1.5$ but $3 > 2.25$." },
        { text: "$R$ is reflexive only.", feedback: "$a \\le a^2$ fails for $a = \\tfrac12$." },
        { text: "$R$ is transitive only.", feedback: "$3 \\le 2^2$ and $2 \\le 1.5^2$, but $3 \\not\\le 1.5^2$." },
        { text: "$R$ is reflexive and transitive.", feedback: "Test $a$ between 0 and 1 for reflexivity." },
      ],
      hint: "Test numbers between 0 and 1 for reflexivity.",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "equivalence-relations-and-classes",
  title: "2.5 · Equivalence Relations and Classes",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "Tip a drawer of socks onto the bed and sort them by colour. \"Has the same colour as\" is reflexive (a sock matches itself), symmetric and transitive. And it does something more: it splits the socks into **piles**, each sock in exactly one pile. Any relation with those three properties sorts its set into piles in this way, and the piles are the real reason such relations matter.",
    },
    { type: "heading", text: "Equivalence relations" },
    {
      type: "callout",
      variant: "definition",
      title: "Equivalence relation and equivalence class",
      content:
        "A relation $R$ on $A$ is an **equivalence relation** if it is reflexive, symmetric and transitive. The **equivalence class** of $a \\in A$ is the set of everything related to $a$:\n$$[a] = \\{x \\in A : x\\,R\\,a\\}.$$",
    },
    {
      type: "worked-example",
      id: "srf2-5-we1",
      title: "Worked example 1: congruence modulo n",
      problem:
        "Fix $n \\ge 2$. On $\\mathbb{Z}$, let $a\\,R\\,b \\iff n \\mid (a - b)$ (written $a \\equiv b \\pmod n$). Show that $R$ is an equivalence relation and describe its classes for $n = 4$.",
      steps: [
        { text: "**Reflexive:** $a - a = 0 = 0 \\cdot n$." },
        { text: "**Symmetric:** if $a - b = kn$ then $b - a = (-k)n$." },
        { text: "**Transitive:** if $a - b = kn$ and $b - c = ln$, add them: $a - c = (k + l)n$. *Why this step:* differences chain by addition, which is exactly what transitivity needs." },
        { text: "For $n = 4$, two integers are related exactly when they leave the same remainder on division by 4. There are four classes:", latex: "[0] = \\{\\dots, -4, 0, 4, 8, \\dots\\}, \\quad [1] = \\{\\dots, -3, 1, 5, \\dots\\}, \\quad [2], \\quad [3]" },
        { text: "Names are not unique: $[3] = [-1] = [7]$, since $3$, $-1$ and $7$ all leave remainder 3." },
      ],
      answer: "An equivalence relation with exactly $n$ classes, the remainders $0, 1, \\dots, n - 1$ (four classes for $n = 4$).",
    },
    { type: "heading", text: "Classes form a partition" },
    {
      type: "text",
      content:
        "Two facts make the piles picture exact:\n1. Every element is in its own class, since $a\\,R\\,a$. So the classes cover $A$.\n2. Two classes are either **identical** or **disjoint**. If some $x$ lies in both $[a]$ and $[b]$, then $x\\,R\\,a$ and $x\\,R\\,b$, so by symmetry and transitivity $a\\,R\\,b$, and then everything related to $a$ is related to $b$ and vice versa.\nA collection of non-empty, pairwise disjoint subsets whose union is $A$ is called a **partition** of $A$. Conversely, every partition gives an equivalence relation: \"lies in the same block as\". Equivalence relations and partitions are the same thing seen two ways.",
    },
    {
      type: "interactive",
      config: {
        component: "srf-mapping-explorer",
        mode: "relation",
        domain: ["1", "2", "3", "4", "5", "6"],
        pairs: [
          ["1", "2"],
          ["2", "3"],
          ["4", "5"],
        ],
        caption:
          "Press **Equivalence closure** to get the smallest equivalence relation containing these three pairs. The classes $\\{1, 2, 3\\}$, $\\{4, 5\\}$, $\\{6\\}$ appear: each class becomes a fully connected cluster with loops.",
      },
    },
    {
      type: "worked-example",
      id: "srf2-5-we2",
      title: "Worked example 2: the smallest equivalence relation",
      problem:
        "Find the smallest equivalence relation on $A = \\{1, 2, 3, 4\\}$ containing $(1, 2)$ and $(2, 3)$. How many pairs does it have?",
      steps: [
        { text: "Any equivalence relation containing these pairs puts 1, 2, 3 in one class (1 with 2, 2 with 3, then transitivity). Nothing forces 4 to join them. *Why this step:* think in classes, not in pairs, and the answer is immediate." },
        { text: "So the partition is $\\{1, 2, 3\\}, \\{4\\}$." },
        { text: "A class of size $k$ contributes all $k^2$ pairs within it: $3^2 + 1^2 = 10$ pairs." },
      ],
      answer: "$\\{1, 2, 3\\}^2 \\cup \\{(4, 4)\\}$, which has 10 pairs.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Counting the pairs of an equivalence relation",
      content:
        "If the classes have sizes $k_1, k_2, \\dots, k_r$, the relation contains $k_1^2 + k_2^2 + \\dots + k_r^2$ ordered pairs, since every element is related to every element of its own class, itself included.",
    },
    {
      type: "worked-example",
      id: "srf2-5-we3",
      title: "Worked example 3: pairs of natural numbers",
      problem:
        "On $\\mathbb{N} \\times \\mathbb{N}$, let $(a, b)\\,R\\,(c, d) \\iff a + d = b + c$. Show $R$ is an equivalence relation and describe the class of $(1, 3)$.",
      steps: [
        { text: "Rewrite: $a + d = b + c \\iff b - a = d - c$. So $(a, b)$ and $(c, d)$ are related exactly when they have the same \"gap\" $b - a$. *Why this step:* a relation of the form \"same value of some quantity\" is automatically an equivalence relation." },
        { text: "Reflexive, symmetric and transitive all follow from properties of equality of the gaps." },
        { text: "The class of $(1, 3)$ is all pairs with gap 2:", latex: "[(1, 3)] = \\{(1, 3), (2, 4), (3, 5), \\dots\\} = \\{(a, a + 2) : a \\in \\mathbb{N}\\}" },
      ],
      answer: "An equivalence relation; $[(1, 3)] = \\{(a, a + 2) : a \\in \\mathbb{N}\\}$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"symmetric + transitive implies reflexive\"",
      content:
        "The tempting proof: \"from $a\\,R\\,b$, symmetry gives $b\\,R\\,a$, and transitivity gives $a\\,R\\,a$\". The flaw: it assumes some $b$ with $a\\,R\\,b$ **exists**. An element with no arrows at all gets no loop. Counterexample: $R = \\{(1, 1)\\}$ on $\\{1, 2\\}$ is symmetric and transitive, but $(2, 2) \\notin R$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "srf2-5-q1",
      variant: "practice",
      question: "Which of these is an equivalence relation on $\\mathbb{Z}$?",
      options: [
        { text: "$a\\,R\\,b \\iff a - b$ is divisible by 3", correct: true, feedback: "Congruence modulo 3: reflexive, symmetric and transitive." },
        { text: "$a\\,R\\,b \\iff a \\le b$", feedback: "Not symmetric." },
        { text: "$a\\,R\\,b \\iff a$ divides $b$", feedback: "Not symmetric: $2 \\mid 4$ but $4 \\nmid 2$." },
        { text: "$a\\,R\\,b \\iff \\lvert a - b\\rvert \\le 1$", feedback: "Not transitive: $0\\,R\\,1$, $1\\,R\\,2$, but not $0\\,R\\,2$." },
      ],
      hint: "An equivalence relation is usually \"has the same something as\".",
    },
    {
      type: "numeric",
      id: "srf2-5-q2",
      variant: "practice",
      question: "How many equivalence classes does congruence modulo 7 have on $\\mathbb{Z}$?",
      answer: 7,
      hint: "Classes correspond to possible remainders.",
      solution: "Remainders on division by 7 are $0, 1, \\dots, 6$: 7 classes.",
      commonMistakes: [{ answer: 6, feedback: "Don't forget remainder 0: the multiples of 7 form a class too." }],
    },
    {
      type: "numeric",
      id: "srf2-5-q3",
      variant: "practice",
      question:
        "How many ordered pairs are in the smallest equivalence relation on $\\{1, 2, 3, 4, 5\\}$ that contains $(1, 2)$ and $(3, 4)$?",
      answer: 9,
      hint: "Find the classes, then add the squares of their sizes.",
      solution: "Classes $\\{1, 2\\}$, $\\{3, 4\\}$, $\\{5\\}$. Pairs: $2^2 + 2^2 + 1^2 = 9$.",
      commonMistakes: [
        { answer: 7, feedback: "Did you forget the loop $(5, 5)$ or a reverse pair? Each class of size $k$ gives $k^2$ pairs." },
        { answer: 25, feedback: "That is the universal relation. Nothing forces 1 and 3 into the same class." },
      ],
    },
    {
      type: "numeric",
      id: "srf2-5-q4",
      variant: "practice",
      question:
        "$R = \\{(1, 2), (2, 3)\\}$ on $A = \\{1, 2, 3\\}$. What is the least number of ordered pairs to add so that $R$ becomes an equivalence relation?",
      answer: 7,
      hint: "All three elements end up in one class.",
      solution: "1, 2, 3 are forced into one class, so the result is all of $A \\times A$, with 9 pairs. $9 - 2 = 7$ must be added.",
      commonMistakes: [
        { answer: 4, feedback: "That makes it reflexive and transitive. Symmetry then forces the reverses too." },
        { answer: 9, feedback: "Two of the 9 pairs are already present." },
      ],
    },
    {
      type: "quiz",
      id: "srf2-5-q5",
      variant: "practice",
      question:
        "On $\\mathbb{R}$, $x\\,R\\,y \\iff x - y \\in \\mathbb{Z}$. This is an equivalence relation. What is the class of $\\tfrac12$?",
      options: [
        { text: "$\\{\\tfrac12 + k : k \\in \\mathbb{Z}\\}$", correct: true, feedback: "Everything differing from $\\tfrac12$ by an integer: $\\dots, -\\tfrac12, \\tfrac12, \\tfrac32, \\dots$" },
        { text: "$\\{\\tfrac12\\}$", feedback: "$\\tfrac32 - \\tfrac12 = 1 \\in \\mathbb{Z}$, so $\\tfrac32$ is in the class too." },
        { text: "$\\mathbb{Z}$", feedback: "That is the class of 0." },
        { text: "$\\{\\tfrac{k}{2} : k \\in \\mathbb{Z}\\}$", feedback: "$1 - \\tfrac12 = \\tfrac12 \\notin \\mathbb{Z}$, so 1 is not in the class." },
      ],
      hint: "The class collects everything whose difference from $\\tfrac12$ is an integer.",
    },
    {
      type: "quiz",
      id: "srf2-5-q6",
      variant: "concept",
      multiple: true,
      question: "$R$ is an equivalence relation on a non-empty set $A$. Which statements are always true? Select all that apply.",
      options: [
        { text: "$a \\in [a]$ for every $a \\in A$", correct: true, feedback: "Reflexivity." },
        { text: "Two classes are either equal or disjoint.", correct: true, feedback: "A shared element forces the classes to coincide." },
        { text: "$[a] = [b] \\iff a\\,R\\,b$", correct: true, feedback: "Equal classes means related, and related elements have equal classes." },
        { text: "There are always at least two classes.", feedback: "The universal relation $A \\times A$ has a single class, $A$ itself." },
      ],
      hint: "Think of classes as the blocks of a partition.",
    },
    {
      type: "numeric",
      id: "srf2-5-q7",
      variant: "practice",
      question:
        "The partition $\\{\\{1, 2\\}, \\{3\\}\\}$ of $\\{1, 2, 3\\}$ corresponds to an equivalence relation. How many ordered pairs does that relation contain?",
      answer: 5,
      hint: "Add the squares of the block sizes.",
      solution: "$2^2 + 1^2 = 5$: $(1, 1), (1, 2), (2, 1), (2, 2), (3, 3)$.",
      commonMistakes: [{ answer: 3, feedback: "Each element is related to every element of its block, itself included, in both orders." }],
    },
    {
      type: "quiz",
      id: "srf2-5-q8",
      variant: "concept",
      question: "Which relation on $\\{1, 2\\}$ is symmetric and transitive but **not** reflexive?",
      options: [
        { text: "$\\{(1, 1)\\}$", correct: true, feedback: "Symmetric and transitive, but 2 has no arrows at all, so no loop is forced for it." },
        { text: "$\\{(1, 2), (2, 1)\\}$", feedback: "Not transitive: it would need $(1, 1)$ and $(2, 2)$." },
        { text: "$\\{(1, 1), (2, 2)\\}$", feedback: "That is reflexive." },
        { text: "None exists, since symmetric and transitive imply reflexive", feedback: "The usual \"proof\" assumes every element is related to something." },
      ],
      hint: "Find an element that is related to nothing.",
    },
    { type: "heading", text: "JEE-style problems" },
    {
      type: "quiz",
      id: "srf2-5-q9",
      variant: "practice",
      multiple: true,
      question:
        "On $\\mathbb{N} \\times \\mathbb{N}$, $(a, b)\\,R\\,(c, d) \\iff ad = bc$. Which statements are true? Select all that apply.",
      options: [
        { text: "$(1, 2)\\,R\\,(3, 6)$", correct: true, feedback: "$1 \\cdot 6 = 2 \\cdot 3$." },
        { text: "$(2, 4)\\,R\\,(3, 5)$", feedback: "$2 \\cdot 5 = 10 \\ne 12 = 4 \\cdot 3$." },
        { text: "$R$ is an equivalence relation.", correct: true, feedback: "$ad = bc \\iff \\tfrac{a}{b} = \\tfrac{c}{d}$: \"same fraction as\" is an equivalence relation." },
        { text: "The class of $(1, 1)$ is $\\{(n, n) : n \\in \\mathbb{N}\\}$.", correct: true, feedback: "$(1, 1)\\,R\\,(c, d) \\iff d = c$." },
      ],
      hint: "Rewrite $ad = bc$ as an equality of fractions.",
    },
    {
      type: "quiz",
      id: "srf2-5-q10",
      variant: "practice",
      question:
        "On the set of lines in the $xy$-plane, $L_1\\,R\\,L_2 \\iff L_1$ is parallel to or coincides with $L_2$. What is the equivalence class of the line $y = 2x + 1$?",
      options: [
        { text: "All lines $y = 2x + c$, $c \\in \\mathbb{R}$", correct: true, feedback: "The class is all lines with slope 2." },
        { text: "Only the line $y = 2x + 1$", feedback: "Every line of slope 2 is parallel to it." },
        { text: "All lines through $(0, 1)$", feedback: "Those share a point, not a direction." },
        { text: "All lines $y = -\\tfrac12 x + c$", feedback: "Those are perpendicular to it." },
      ],
      hint: "Parallel lines share a slope.",
    },
    {
      type: "numeric",
      id: "srf2-5-q11",
      variant: "practice",
      question:
        "On $A = \\{1, 2, 3, \\dots, 10\\}$, $a\\,R\\,b \\iff a - b$ is divisible by 3. How many ordered pairs are in $R$?",
      answer: 34,
      hint: "Find the class sizes, then add their squares.",
      solution: "Classes: $\\{3, 6, 9\\}$, $\\{1, 4, 7, 10\\}$, $\\{2, 5, 8\\}$, of sizes 3, 4, 3. Pairs: $9 + 16 + 9 = 34$.",
      commonMistakes: [
        { answer: 30, feedback: "The class $\\{1, 4, 7, 10\\}$ has 4 elements, not 3." },
        { answer: 24, feedback: "Did you leave out the loops $(a, a)$? Each class of size $k$ gives $k^2$ pairs." },
      ],
    },
    {
      type: "numeric",
      id: "srf2-5-q12",
      variant: "practice",
      question: "How many equivalence relations on $\\{1, 2, 3\\}$ contain the pair $(1, 2)$?",
      answer: 2,
      hint: "1 and 2 must share a class. Where can 3 go?",
      solution: "Either 3 joins them (one class $\\{1, 2, 3\\}$) or it stays alone ($\\{1, 2\\}, \\{3\\}$). So 2.",
      commonMistakes: [{ answer: 5, feedback: "That is the total number of equivalence relations on a 3-element set. Most of them separate 1 and 2." }],
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "counting-relations",
  title: "2.6 · Counting Relations with Given Properties",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "On an $n$-element set there are $2^{n^2}$ relations. How many are reflexive? Symmetric? Antisymmetric? JEE asks this every few years, and every answer comes from one idea: **sort the $n^2$ pairs by what the property says about them, then count only the choices that are still free.**",
    },
    { type: "heading", text: "Sorting the pairs" },
    {
      type: "text",
      content:
        "Draw $A \\times A$ as an $n \\times n$ grid. It has two kinds of cells:\n- the **diagonal**: the $n$ loops $(a, a)$\n- the **off-diagonal** cells: $n^2 - n = n(n - 1)$ pairs $(a, b)$ with $a \\ne b$. They come in **mirror pairs** $\\{(a, b), (b, a)\\}$, and there are $\\frac{n(n - 1)}{2}$ such mirror pairs.\nEach property makes a demand on one of these kinds and leaves the other free.",
    },
    {
      type: "interactive",
      config: {
        component: "srf-mapping-explorer",
        mode: "relation",
        domain: ["1", "2", "3"],
        pairs: [
          ["1", "1"],
          ["2", "2"],
          ["3", "3"],
        ],
        caption:
          "The grid has 3 diagonal cells and 3 mirror pairs of off-diagonal cells. Keep the diagonal ticked and tick off-diagonal cells in mirror pairs: every such choice is reflexive and symmetric, and there are $2^3 = 8$ of them.",
      },
    },
    { type: "heading", text: "The counting formulas" },
    {
      type: "table",
      headers: ["Property", "Diagonal ($n$ cells)", "Off-diagonal ($\\frac{n(n-1)}{2}$ mirror pairs)", "Count", "$n = 3$"],
      rows: [
        ["Any relation", "free: $2^n$", "each pair free: $4$ ways", "$2^{n^2}$", "512"],
        ["Reflexive", "forced in: 1 way", "free: $4$ ways", "$2^{n^2 - n}$", "64"],
        ["Symmetric", "free: $2^n$", "both or neither: 2 ways", "$2^{n(n+1)/2}$", "64"],
        ["Reflexive and symmetric", "forced in", "both or neither: 2 ways", "$2^{n(n-1)/2}$", "8"],
        ["Antisymmetric", "free: $2^n$", "neither, one way, or the other: 3 ways", "$2^n \\cdot 3^{n(n-1)/2}$", "216"],
        ["Reflexive and antisymmetric", "forced in", "3 ways", "$3^{n(n-1)/2}$", "27"],
        ["Symmetric and antisymmetric", "free: $2^n$", "neither: 1 way", "$2^n$", "8"],
      ],
    },
    {
      type: "worked-example",
      id: "srf2-6-we1",
      title: "Worked example 1: symmetric relations on three elements",
      problem: "How many symmetric relations are there on $A = \\{1, 2, 3\\}$?",
      steps: [
        { text: "Diagonal: $(1, 1), (2, 2), (3, 3)$ are unaffected by symmetry, so each is in or out: $2^3 = 8$ ways." },
        { text: "Mirror pairs: $\\{(1, 2), (2, 1)\\}$, $\\{(1, 3), (3, 1)\\}$, $\\{(2, 3), (3, 2)\\}$. Symmetry says each mirror pair is taken whole or not at all: 2 ways each, $2^3 = 8$. *Why this step:* symmetry ties the two cells of a mirror pair together, so they make one choice, not two." },
        { text: "Total $8 \\times 8 = 64 = 2^{3 \\cdot 4 / 2}$." },
      ],
      answer: "64 symmetric relations.",
    },
    {
      type: "worked-example",
      id: "srf2-6-we2",
      title: "Worked example 2: antisymmetric relations",
      problem: "How many antisymmetric relations are there on $A = \\{1, 2, 3\\}$?",
      steps: [
        { text: "Diagonal: loops are allowed, each in or out: $2^3 = 8$." },
        { text: "Each mirror pair $\\{(a, b), (b, a)\\}$ may hold neither, only $(a, b)$, or only $(b, a)$, but not both: 3 ways. Three mirror pairs: $3^3 = 27$." },
        { text: "Total $8 \\times 27 = 216$." },
      ],
      answer: "216 antisymmetric relations.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"there are $2^n$ relations on an $n$-element set\"",
      content:
        "A relation is a subset of $A \\times A$, which has $n^2$ elements, so there are $2^{n^2}$ relations. $2^n$ counts the subsets of $A$ itself, a different thing. Always ask: \"subsets of **what**?\"",
    },
    { type: "heading", text: "Counting equivalence relations" },
    {
      type: "text",
      content:
        "Transitivity does not split cleanly into free cells, so there is no product formula for transitive relations (there are 13 on a 2-element set and 171 on a 3-element set, found by listing). Equivalence relations, though, are easy to count by the partition picture of 2.5: **count the ways to split $A$ into non-empty blocks.** These counts are the Bell numbers $1, 2, 5, 15, 52, \\dots$ for $n = 1, 2, 3, 4, 5$.",
    },
    {
      type: "worked-example",
      id: "srf2-6-we3",
      title: "Worked example 3: equivalence relations on four elements",
      problem: "How many equivalence relations are there on $A = \\{1, 2, 3, 4\\}$?",
      steps: [
        { text: "Sort the partitions by block sizes. *Why this step:* each shape of partition is counted by a quick choose-the-blocks argument." },
        {
          text: "Count each shape:",
          table: {
            headers: ["Block sizes", "Number of partitions"],
            rows: [
              ["$4$", "$1$"],
              ["$3 + 1$", "$\\binom43 = 4$"],
              ["$2 + 2$", "$\\frac12\\binom42 = 3$"],
              ["$2 + 1 + 1$", "$\\binom42 = 6$"],
              ["$1 + 1 + 1 + 1$", "$1$"],
            ],
          },
        },
        { text: "Total $1 + 4 + 3 + 6 + 1 = 15$. (For $2 + 2$, choosing $\\{1, 2\\}$ or choosing $\\{3, 4\\}$ gives the same partition, hence the $\\frac12$.)" },
      ],
      answer: "15 equivalence relations.",
    },
    {
      type: "worked-example",
      id: "srf2-6-we4",
      title: "Worked example 4: a JEE Main favourite",
      problem:
        "How many relations on $A = \\{1, 2, 3\\}$ contain $(1, 2)$ and $(2, 3)$ and are reflexive and transitive but **not** symmetric?",
      steps: [
        { text: "Reflexive forces the three loops; transitive forces $(1, 3)$ from $1 \\to 2 \\to 3$. Base: $\\{(1, 1), (2, 2), (3, 3), (1, 2), (2, 3), (1, 3)\\}$." },
        { text: "The only pairs left are $(2, 1)$, $(3, 2)$, $(3, 1)$. Try adding them. *Why this step:* every candidate is the base plus some of the remaining pairs, so we test each choice for transitivity and symmetry." },
        { text: "Add nothing: transitive, not symmetric ✓. Add $(2, 1)$ only: still transitive ✓. Add $(3, 2)$ only: still transitive ✓. Add $(3, 1)$ only: then $3 \\to 1 \\to 2$ needs $(3, 2)$ ✗. Any two of them force the third (e.g. $(2, 1)$ and $(3, 2)$ give $3 \\to 2 \\to 1$, needing $(3, 1)$), and all three give $A \\times A$, which is symmetric ✗." },
      ],
      answer: "3 relations.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "srf2-6-q1",
      variant: "practice",
      question: "How many reflexive relations are there on a set with 4 elements?",
      answer: 4096,
      hint: "The 4 loops are forced; the other $16 - 4$ pairs are free.",
      solution: "$2^{16 - 4} = 2^{12} = 4096$.",
      commonMistakes: [
        { answer: 65536, feedback: "That is all relations. The 4 loops are not free." },
        { answer: 16, feedback: "That is $2^4$. The free cells are the 12 off-diagonal ones." },
      ],
    },
    {
      type: "numeric",
      id: "srf2-6-q2",
      variant: "practice",
      question: "How many symmetric relations are there on a set with 4 elements?",
      answer: 1024,
      hint: "4 free loops, and $\\frac{4 \\cdot 3}{2} = 6$ mirror pairs, each all-or-nothing.",
      solution: "$2^4 \\cdot 2^6 = 2^{10} = 1024$, matching $2^{n(n+1)/2}$ with $n = 4$.",
      commonMistakes: [
        { answer: 64, feedback: "That counts the mirror pairs only. The 4 loops are free too." },
        { answer: 4096, feedback: "That is the reflexive count. Symmetry ties the mirror pairs together." },
      ],
    },
    {
      type: "numeric",
      id: "srf2-6-q3",
      variant: "practice",
      question: "How many relations on a 4-element set are both reflexive and symmetric?",
      answer: 64,
      hint: "Loops forced, mirror pairs all-or-nothing.",
      solution: "$2^{n(n-1)/2} = 2^6 = 64$.",
      commonMistakes: [{ answer: 1024, feedback: "That is symmetric only. Reflexivity fixes the 4 loops." }],
    },
    {
      type: "numeric",
      id: "srf2-6-q4",
      variant: "practice",
      question: "How many antisymmetric relations are there on $\\{a, b\\}$?",
      answer: 12,
      hint: "2 free loops, and one mirror pair with 3 allowed states.",
      solution: "$2^2 \\cdot 3^1 = 12$.",
      commonMistakes: [
        { answer: 16, feedback: "That is all relations on $\\{a, b\\}$, including the 4 with both $(a, b)$ and $(b, a)$." },
        { answer: 3, feedback: "Loops are allowed in an antisymmetric relation: $2^2$ more choices." },
      ],
    },
    {
      type: "numeric",
      id: "srf2-6-q5",
      variant: "practice",
      question: "How many equivalence relations are there on $\\{1, 2, 3, 4\\}$?",
      answer: 15,
      hint: "Count the partitions of a 4-element set by block sizes.",
      solution: "$4$: 1. $3 + 1$: 4. $2 + 2$: 3. $2 + 1 + 1$: 6. $1 + 1 + 1 + 1$: 1. Total 15.",
      commonMistakes: [
        { answer: 18, feedback: "The $2 + 2$ case was counted twice: $\\{1, 2\\}, \\{3, 4\\}$ is the same partition as $\\{3, 4\\}, \\{1, 2\\}$." },
        { answer: 64, feedback: "That is the number of reflexive and symmetric relations. Most of them are not transitive." },
      ],
    },
    {
      type: "quiz",
      id: "srf2-6-q6",
      variant: "concept",
      question: "How many relations are there on a set with $n$ elements?",
      options: [
        { text: "$2^{n^2}$", correct: true, feedback: "$A \\times A$ has $n^2$ pairs, each in or out." },
        { text: "$2^n$", feedback: "That counts subsets of $A$, not of $A \\times A$." },
        { text: "$n^2$", feedback: "That is the number of pairs, not the number of subsets of pairs." },
        { text: "$n^n$", feedback: "That counts functions from $A$ to $A$ (Chapter 3)." },
      ],
      hint: "A relation on $A$ is a subset of $A \\times A$.",
    },
    {
      type: "numeric",
      id: "srf2-6-q7",
      variant: "practice",
      question: "How many relations on $\\{1, 2, 3\\}$ are both reflexive and antisymmetric?",
      answer: 27,
      hint: "Loops forced; each of the 3 mirror pairs has 3 allowed states.",
      solution: "$3^{3} = 27$.",
      commonMistakes: [{ answer: 216, feedback: "That is antisymmetric only. Reflexivity fixes all 3 loops." }],
    },
    {
      type: "numeric",
      id: "srf2-6-q8",
      variant: "practice",
      question: "How many relations on $\\{1, 2, 3\\}$ are both symmetric and antisymmetric?",
      answer: 8,
      hint: "Both at once means no off-diagonal pairs at all.",
      solution: "Only loops are allowed, and each of the 3 loops is in or out: $2^3 = 8$.",
      commonMistakes: [{ answer: 1, feedback: "The empty relation is one of them, but any set of loops also works." }],
    },
    { type: "heading", text: "JEE-style problems" },
    {
      type: "numeric",
      id: "srf2-6-q9",
      variant: "practice",
      question:
        "How many relations on $\\{1, 2, 3\\}$ containing $(1, 2)$ and $(2, 3)$ are reflexive and transitive but not symmetric?",
      answer: 3,
      hint: "Start from the forced pairs, then test adding each of $(2, 1)$, $(3, 2)$, $(3, 1)$.",
      solution: "The base $\\{(1, 1), (2, 2), (3, 3), (1, 2), (2, 3), (1, 3)\\}$ works. Adding $(2, 1)$ alone or $(3, 2)$ alone keeps it transitive. Adding $(3, 1)$ alone breaks transitivity, any two force the third, and all three give the symmetric $A \\times A$. So 3.",
      commonMistakes: [
        { answer: 1, feedback: "The base relation is one, but you can also add $(2, 1)$ alone, or $(3, 2)$ alone." },
        { answer: 4, feedback: "Adding $(3, 1)$ alone breaks transitivity: $3 \\to 1 \\to 2$ needs $(3, 2)$." },
      ],
    },
    {
      type: "numeric",
      id: "srf2-6-q10",
      variant: "practice",
      question: "How many equivalence relations on $\\{1, 2, 3\\}$ contain both $(1, 2)$ and $(2, 1)$?",
      answer: 2,
      hint: "1 and 2 share a block; 3 joins them or stays alone.",
      solution: "Partitions $\\{1, 2, 3\\}$ and $\\{1, 2\\}, \\{3\\}$: 2 relations.",
      commonMistakes: [{ answer: 5, feedback: "That counts all equivalence relations on a 3-element set." }],
    },
    {
      type: "quiz",
      id: "srf2-6-q11",
      variant: "practice",
      multiple: true,
      question: "$A$ has $n$ elements. Which counts are correct? Select all that apply.",
      options: [
        { text: "Reflexive relations on $A$: $2^{n(n-1)}$", correct: true, feedback: "$n^2 - n = n(n - 1)$ free off-diagonal cells." },
        { text: "Symmetric relations on $A$: $2^{n(n-1)/2}$", feedback: "That is reflexive **and** symmetric. Symmetric alone also has $n$ free loops: $2^{n(n+1)/2}$." },
        { text: "Antisymmetric relations on $A$: $2^n \\cdot 3^{n(n-1)/2}$", correct: true, feedback: "Free loops times 3 states per mirror pair." },
        { text: "Relations from $A$ to a 2-element set: $2^{2n}$", correct: true, feedback: "$A \\times B$ has $2n$ pairs." },
      ],
      hint: "Split into diagonal and mirror pairs, and decide what each property forces.",
    },
    {
      type: "numeric",
      id: "srf2-6-q12",
      variant: "practice",
      question:
        "A relation on $\\{1, 2, 3\\}$ must be symmetric and must contain $(1, 2)$. How many such relations are there?",
      answer: 32,
      hint: "The mirror pair $\\{(1, 2), (2, 1)\\}$ is forced in; everything else is chosen as for a symmetric relation.",
      solution: "Free choices: 3 loops ($2^3$) and the other 2 mirror pairs ($2^2$). Total $2^5 = 32$.",
      commonMistakes: [
        { answer: 64, feedback: "That is all symmetric relations; half of them leave out $\\{(1, 2), (2, 1)\\}$." },
        { answer: 16, feedback: "Only one mirror pair is forced. The other two mirror pairs and all three loops stay free." },
      ],
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-2-mastery",
  title: "2.7 · Chapter 2 Mastery",
  position: 7,
  blocks: blocks([
    {
      type: "text",
      content:
        "No formula sheet this time. Every question below can be rebuilt from three pictures: the **grid** of $A \\times B$ (one cell per ordered pair), the **arrow diagram** (loops, two-way arrows, shortcuts) and the **partition** into classes. Before answering, decide which picture the question is really about.",
    },
    { type: "heading", text: "Reconstruct it" },
    {
      type: "table",
      headers: ["If the question asks about...", "Rebuild it from"],
      rows: [
        ["$n(A \\times B)$, common pairs of $A \\times B$ and $B \\times A$", "The grid: $n(A)\\,n(B)$ cells, common pairs $= (A \\cap B)^2$"],
        ["Number of relations", "Each cell in or out: $2^{\\text{cells}}$"],
        ["Reflexive / symmetric / transitive / antisymmetric", "Loops / two-way arrows / shortcuts (including $a \\to b \\to a$) / no two-way arrows"],
        ["Counting relations with a property", "Diagonal cells and mirror pairs: which are forced, which are free"],
        ["Equivalence relations, classes, closures", "Partitions: pairs $= \\sum k_i^2$, relations $=$ number of partitions"],
      ],
    },
    { type: "heading", text: "Mastery questions" },
    {
      type: "numeric",
      id: "srf2-7-q1",
      variant: "mastery",
      question: "$A = \\{1, 2, 3, 4\\}$ and $B = \\{2, 4, 6\\}$. Find $n\\big((A \\times B) \\cap (B \\times A)\\big)$.",
      answer: 4,
      hint: "Only pairs with both entries in $A \\cap B$ survive.",
      solution: "$A \\cap B = \\{2, 4\\}$, so the common pairs are $\\{2, 4\\} \\times \\{2, 4\\}$: 4 of them.",
      commonMistakes: [{ answer: 2, feedback: "The common part is a set of pairs: square $n(A \\cap B)$." }],
    },
    {
      type: "numeric",
      id: "srf2-7-q2",
      variant: "mastery",
      question: "$A$ has 5 elements and $B$ has 2 elements. How many relations are there from $A$ to $B$?",
      answer: 1024,
      hint: "Count the cells of the grid $A \\times B$ first.",
      solution: "$n(A \\times B) = 10$, so there are $2^{10} = 1024$ relations.",
      commonMistakes: [
        { answer: 32, feedback: "That is $2^5$. The exponent is $mn = 10$." },
        { answer: 25, feedback: "That is $5^2$. Relations are subsets of the 10 pairs." },
      ],
    },
    {
      type: "quiz",
      id: "srf2-7-q3",
      variant: "mastery",
      multiple: true,
      question:
        "On $A = \\{1, 2, 3, 4\\}$, $R = \\{(1, 1), (2, 2), (3, 3), (4, 4), (1, 2), (2, 1), (3, 4)\\}$. Which statements are true? Select all that apply.",
      options: [
        { text: "$R$ is reflexive.", correct: true, feedback: "All four loops are present." },
        { text: "$R$ is symmetric.", feedback: "$(3, 4) \\in R$ but $(4, 3) \\notin R$." },
        { text: "$R$ is transitive.", correct: true, feedback: "Paths $1 \\to 2 \\to 1$ and $2 \\to 1 \\to 2$ have their loops, and paths through loops are harmless." },
        { text: "$R$ is antisymmetric.", feedback: "$(1, 2)$ and $(2, 1)$ are both present with $1 \\ne 2$." },
      ],
      hint: "Check the hidden-loop paths $1 \\to 2 \\to 1$ and $2 \\to 1 \\to 2$, and the reverse of $(3, 4)$.",
    },
    {
      type: "quiz",
      id: "srf2-7-q4",
      variant: "mastery",
      question: "Which of these is an equivalence relation on $\\mathbb{R}$?",
      options: [
        { text: "$x\\,R\\,y \\iff x - y \\in \\mathbb{Q}$", correct: true, feedback: "$0 \\in \\mathbb{Q}$, negatives of rationals are rational, and sums of rationals are rational." },
        { text: "$x\\,R\\,y \\iff \\lvert x - y\\rvert \\le 1$", feedback: "Not transitive: $0, 1, 2$." },
        { text: "$x\\,R\\,y \\iff xy \\ge 0$", feedback: "Not transitive: $-1\\,R\\,0$ and $0\\,R\\,1$, but $(-1)(1) < 0$." },
        { text: "$x\\,R\\,y \\iff x \\le y$", feedback: "Not symmetric." },
      ],
      hint: "Which condition is \"the difference belongs to a set closed under negatives and sums\"?",
    },
    {
      type: "numeric",
      id: "srf2-7-q5",
      variant: "mastery",
      question: "How many relations on $\\{1, 2, 3\\}$ are reflexive and symmetric?",
      answer: 8,
      hint: "Loops forced, 3 mirror pairs each all-or-nothing.",
      solution: "$2^{3 \\cdot 2 / 2} = 2^3 = 8$.",
      commonMistakes: [
        { answer: 64, feedback: "That is symmetric only (or reflexive only)." },
        { answer: 5, feedback: "That counts the equivalence relations, which must also be transitive." },
      ],
    },
    {
      type: "numeric",
      id: "srf2-7-q6",
      variant: "mastery",
      question: "How many antisymmetric relations are there on a set with 3 elements?",
      answer: 216,
      hint: "Free loops, and 3 allowed states for each mirror pair.",
      solution: "$2^3 \\cdot 3^3 = 8 \\cdot 27 = 216$.",
      commonMistakes: [
        { answer: 27, feedback: "That is reflexive and antisymmetric. Loops are free here." },
        { answer: 64, feedback: "Each mirror pair has 3 allowed states (neither, one, the other), not 2." },
      ],
    },
    {
      type: "numeric",
      id: "srf2-7-q7",
      variant: "mastery",
      question:
        "$R = \\{(1, 2), (2, 3), (3, 4)\\}$ on $A = \\{1, 2, 3, 4, 5\\}$. What is the least number of pairs to add to $R$ to make it an equivalence relation?",
      answer: 14,
      hint: "Find the classes of the smallest equivalence relation containing $R$, count its pairs, then subtract 3.",
      solution: "Classes $\\{1, 2, 3, 4\\}$ and $\\{5\\}$: $16 + 1 = 17$ pairs. Already present: 3. Add $17 - 3 = 14$.",
      commonMistakes: [
        { answer: 17, feedback: "That is the size of the final relation. Three of its pairs are already in $R$." },
        { answer: 22, feedback: "5 is not forced into the big class: $\\{5\\}$ stays on its own." },
      ],
    },
    {
      type: "numeric",
      id: "srf2-7-q8",
      variant: "mastery",
      question: "How many equivalence relations are there on a set with 5 elements?",
      answer: 52,
      hint: "List partition shapes: $5$, $4 + 1$, $3 + 2$, $3 + 1 + 1$, $2 + 2 + 1$, $2 + 1 + 1 + 1$, $1 + 1 + 1 + 1 + 1$.",
      solution: "$1 + 5 + 10 + 10 + 15 + 10 + 1 = 52$. For $2 + 2 + 1$: choose the singleton (5 ways), then split the other four into two pairs (3 ways): 15.",
      commonMistakes: [
        { answer: 67, feedback: "The $2 + 2 + 1$ case: the two pairs are unordered, so it is $5 \\times 3 = 15$, not 30." },
        { answer: 15, feedback: "That is the count for 4 elements." },
      ],
    },
    {
      type: "quiz",
      id: "srf2-7-q9",
      variant: "mastery",
      question:
        "A student writes: \"If $R$ is symmetric and transitive, take any $a$. Then $a\\,R\\,b$ for some $b$, so $b\\,R\\,a$, so $a\\,R\\,a$. Hence $R$ is reflexive.\" What is wrong?",
      options: [
        { text: "There may be no $b$ with $a\\,R\\,b$.", correct: true, feedback: "An element with no arrows gets no loop: $\\{(1, 1)\\}$ on $\\{1, 2\\}$." },
        { text: "Symmetry does not give $b\\,R\\,a$.", feedback: "That step is exactly what symmetry says." },
        { text: "Transitivity cannot be used with $c = a$.", feedback: "It can: $c$ may equal $a$." },
        { text: "Nothing: the argument is correct.", feedback: "Try $R = \\{(1, 1)\\}$ on $\\{1, 2\\}$." },
      ],
      hint: "Is every element guaranteed to be related to something?",
    },
    {
      type: "quiz",
      id: "srf2-7-q10",
      variant: "mastery",
      multiple: true,
      question: "On $\\mathbb{Z}$, $a\\,R\\,b \\iff 4 \\mid (a - b)$. Which statements are true? Select all that apply.",
      options: [
        { text: "$R$ has exactly 4 equivalence classes.", correct: true, feedback: "Remainders 0, 1, 2, 3." },
        { text: "$[1] = [-3]$", correct: true, feedback: "$1 - (-3) = 4$." },
        { text: "$[2] \\cap [6] = \\varnothing$", feedback: "$6 - 2 = 4$, so $[2] = [6]$: equal, not disjoint." },
        { text: "$R$ is antisymmetric.", feedback: "$0\\,R\\,4$ and $4\\,R\\,0$ with $0 \\ne 4$." },
      ],
      hint: "Two classes are equal exactly when their representatives are related.",
    },
    {
      type: "numeric",
      id: "srf2-7-q11",
      variant: "mastery",
      question:
        "On $A = \\{1, 2, \\dots, 20\\}$, $a\\,R\\,b \\iff a - b$ is divisible by 5. How many elements does the class $[2]$ contain?",
      answer: 4,
      hint: "List the numbers in $A$ leaving remainder 2 on division by 5.",
      solution: "$[2] = \\{2, 7, 12, 17\\}$: 4 elements.",
      commonMistakes: [{ answer: 5, feedback: "22 is outside $A$. The class stops at 17." }],
    },
    {
      type: "quiz",
      id: "srf2-7-q12",
      variant: "mastery",
      question:
        "$A$ and $B$ are finite sets with $n(A \\times B) = 6$ and $(1, x), (2, y), (3, x) \\in A \\times B$. How many relations from $B$ to $A$ have exactly one pair?",
      options: [
        { text: "6", correct: true, feedback: "$A = \\{1, 2, 3\\}$, $B = \\{x, y\\}$, so $B \\times A$ has 6 pairs, and a one-pair relation is a choice of one of them." },
        { text: "64", feedback: "That counts all relations from $B$ to $A$." },
        { text: "2", feedback: "That is $n(B)$. Count the pairs of $B \\times A$." },
        { text: "8", feedback: "That is $2^3$. One-pair relations are just the single pairs of $B \\times A$." },
      ],
      hint: "First recover $A$ and $B$ from the given pairs and $n(A \\times B) = 6$.",
    },
  ]),
};

export const srfChapter2Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lessonMastery,
];
