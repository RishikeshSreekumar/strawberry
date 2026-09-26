import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Permutations, Combinations & the Binomial Theorem — Chapter 4:
 * Pascal's Triangle and the Binomial Theorem.
 * Entries of Pascal's triangle count paths, its patterns have one-line
 * counting proofs, and expanding (a + b)^n is choosing which brackets
 * contribute b: general term, specific coefficients, middle and greatest terms.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "pascals-triangle-as-paths",
  title: "4.1 · Pascal's Triangle as Paths",
  position: 1,
  blocks: blocks([
    {
      type: "video",
      src: "/videos/pc-4-pascal-and-the-binomial-theorem.mp4",
      poster: "/videos/pc-4-pascal-and-the-binomial-theorem.jpg",
      title: "Chapter 4 overview video",
      caption:
        "A narrated walk through the whole chapter. Watch it now for the big picture, or come back to it as a recap.",
    },
    {
      type: "text",
      content:
        "Stack numbers in a triangle: put a 1 at the top, and make every other number the sum of the two numbers just above it (a missing neighbour counts as 0). The rows come out as 1; 1 1; 1 2 1; 1 3 3 1; 1 4 6 4 1; …\n\nThat is **Pascal's triangle**. You could treat it as a curiosity built by a rule. This lesson shows what it *counts*, and why that makes every entry a familiar number, $^nC_r$.",
    },
    {
      type: "text",
      content:
        "Picture a ball dropped at the top of the triangle. At every entry it bounces either **down-left (L)** or **down-right (R)**. How many different routes lead to a given entry?\n\nNumber the rows $n = 0, 1, 2, \\dots$ from the top, and the positions in a row $r = 0, 1, \\dots, n$ from the left. To land in row $n$ the ball makes exactly $n$ bounces, and to end at position $r$ exactly $r$ of them must be R.",
    },
    {
      type: "interactive",
      config: {
        component: "pnc-pascal-triangle",
        mode: "paths",
        rows: 8,
        initialCell: { n: 5, r: 2 },
        caption:
          "Tap any entry: every path from the top to it lights up. Step through them with Previous/Next path and watch each one spelled as an L/R word. Row 5, position 2 has 10 paths, and every word has exactly two R's.",
      },
    },
    {
      type: "text",
      content:
        "So a route to row $n$, position $r$ is a **word of $n$ letters with exactly $r$ R's**, such as L R L L R for row 5, position 2. Choosing a word means choosing *which* $r$ of the $n$ bounces are R. That is a selection of $r$ positions from $n$:",
    },
    {
      type: "math",
      latex: "\\#\\{\\text{paths to row } n,\\ \\text{position } r\\} = {}^{n}C_{r} = \\frac{n!}{r!\\,(n-r)!}",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Pascal's triangle",
      content:
        "The entry in row $n$, position $r$ (both counted from 0) is $^nC_r$, the number of L/R paths from the apex to it. Row $n$ is $^nC_0, {}^nC_1, \\dots, {}^nC_n$.",
    },
    {
      type: "text",
      content:
        "Now the building rule has a reason. Every path to an entry has a **last bounce**. Either it came from the entry up-left (last bounce R) or from the entry up-right (last bounce L). These two kinds of path don't overlap and together cover everything, so by the sum rule:",
    },
    {
      type: "math",
      latex: "{}^{n}C_{r} = \\underbrace{{}^{n-1}C_{r-1}}_{\\text{last step R}} + \\underbrace{{}^{n-1}C_{r}}_{\\text{last step L}}",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Same rule, two stories",
      content:
        "In Lesson 2.2 you proved Pascal's rule by asking \"is the special person in the committee or out?\" Here the same identity comes from \"did the last step come from the left or the right?\" Both proofs split the set by one yes/no decision about a single element.",
    },
    {
      type: "text",
      content:
        "**Grid paths are the same thing.** Tilt the triangle 45° and the L/R bounces become moves **Right (R)** and **Up (U)** on a grid. Walking from $(0, 0)$ to $(p, q)$ takes $p + q$ unit moves, of which exactly $q$ are U. So the route is a word of length $p + q$ with $q$ U's:",
    },
    {
      type: "math",
      latex: "\\#\\{\\text{grid paths } (0,0) \\to (p,q)\\} = {}^{p+q}C_{q} = {}^{p+q}C_{p}",
    },
    {
      type: "text",
      content:
        "**Worked example 1 — a city grid.** How many shortest routes are there from $(0,0)$ to $(4,3)$ moving only right or up?\n\n1. Every shortest route uses 4 R's and 3 U's: 7 moves in all.\n2. A route is fixed once you decide which 3 of the 7 moves are U.\n3. Count: $^7C_3 = \\dfrac{7 \\cdot 6 \\cdot 5}{3!} = 35$.\n\nCheck against the triangle: 35 sits in row 7, position 3.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 — through a checkpoint.** How many shortest routes from $(0,0)$ to $(3,2)$ pass through $(1,1)$?\n\n1. Split the trip at the checkpoint. Leg 1, $(0,0) \\to (1,1)$: one R, one U, so $^2C_1 = 2$ routes.\n2. Leg 2, $(1,1) \\to (3,2)$: two R's, one U, so $^3C_1 = 3$ routes.\n3. Every leg-1 route can be followed by every leg-2 route (product rule): $2 \\times 3 = 6$.\n\nFor comparison, all routes $(0,0) \\to (3,2)$: $^5C_2 = 10$. So 4 of the 10 routes avoid $(1,1)$.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 — a warehouse robot avoids a spill.** A robot drives from its dock at $(0,0)$ to a shelf at $(5,4)$ on a grid of aisles, moving only east (R) or north (U). A spill blocks the crossing at $(2,2)$. How many shortest routes avoid it?\n\n1. All routes: 9 moves, 4 of them U, so $^9C_4 = 126$.\n   *Why this step:* \"avoid\" is hard to count directly. Counting everything first sets up the complement.\n2. Routes **through** $(2,2)$: leg 1 $(0,0) \\to (2,2)$ gives $^4C_2 = 6$, and leg 2 $(2,2) \\to (5,4)$ (3 R's, 2 U's) gives $^5C_2 = 10$. Product: $60$.\n   *Why this step:* splitting at the blocked point turns the \"bad\" routes into a checkpoint count, exactly like Worked example 2.\n3. Routes avoiding the spill: $126 - 60 = 66$.\n   *Why this step:* every route either passes through $(2,2)$ or doesn't, so the good routes are what's left after removing the bad ones.",
    },
    {
      type: "math",
      latex: "\\underbrace{{}^9C_4}_{126} - \\underbrace{{}^4C_2 \\cdot {}^5C_2}_{6 \\cdot 10 = 60} = 66",
    },
    {
      type: "text",
      content:
        "**Worked example 4 — exam style: two checkpoints (inclusion-exclusion).** How many shortest routes from $(0,0)$ to $(4,4)$ pass through $(1,1)$ **or** $(3,3)$?\n\n1. Through $(1,1)$: $^2C_1 \\cdot {}^6C_3 = 2 \\cdot 20 = 40$.\n2. Through $(3,3)$: $^6C_3 \\cdot {}^2C_1 = 20 \\cdot 2 = 40$.\n3. Through **both**: three legs, $^2C_1 \\cdot {}^4C_2 \\cdot {}^2C_1 = 2 \\cdot 6 \\cdot 2 = 24$.\n   *Why this step:* a route through both points was counted once in step 1 and again in step 2. Adding 40 + 40 would count those 24 routes twice.\n4. Through at least one: $40 + 40 - 24 = 56$.\n\nSo of the $^8C_4 = 70$ routes, only $70 - 56 = 14$ miss both checkpoints.",
    },
    {
      type: "table",
      headers: ["Question", "Word being counted", "Count"],
      rows: [
        ["Paths to row 6, position 2 of the triangle", "6 letters, 2 R's", "$^6C_2 = 15$"],
        ["Grid routes $(0,0) \\to (4,3)$", "7 letters, 3 U's", "$^7C_3 = 35$"],
        ["Grid routes $(0,0) \\to (5,5)$", "10 letters, 5 U's", "$^{10}C_5 = 252$"],
        ["Heads/tails sequences of 8 tosses with exactly 3 heads", "8 letters, 3 H's", "$^8C_3 = 56$"],
      ],
    },
    {
      type: "callout",
      variant: "warning",
      title: "Count from 0",
      content:
        "The apex is row 0 and the first entry of every row is position 0. Row 5 is 1 5 10 10 5 1, which is $^5C_0$ to $^5C_5$. Counting rows from 1 shifts every answer by one row.",
    },
    {
      type: "quiz",
      id: "pc4-1-q1",
      variant: "practice",
      question: "How many L/R paths lead from the apex to row 6, position 2 of Pascal's triangle?",
      options: [
        { text: "12", feedback: "That is $6 \\times 2$. You need to choose which 2 of the 6 bounces are R, not multiply." },
        { text: "15", correct: true, feedback: "A path is a 6-letter word with 2 R's: $^6C_2 = 15$. Row 6 reads 1 6 15 20 15 6 1." },
        { text: "30", feedback: "That is $^6P_2$. The two R's are identical letters, so their order doesn't matter: divide by $2!$." },
        { text: "21", feedback: "That is $^7C_2$, which is row 7. Rows are counted from 0." },
      ],
    },
    {
      type: "quiz",
      id: "pc4-1-q2",
      variant: "concept",
      question: "Why is the number of paths to row $n$, position $r$ equal to $^nC_r$?",
      options: [
        { text: "Because each entry is the sum of the two above it.", feedback: "That is true, but it explains how the triangle is built, not why the answer is $^nC_r$. The link is the L/R word." },
        {
          text: "A path is a word of $n$ bounces with exactly $r$ R's, and choosing the word means choosing which $r$ of the $n$ positions hold R.",
          correct: true,
          feedback: "Exactly. Paths are selections of positions in disguise.",
        },
        { text: "Because there are $n$ rows and $r$ columns, giving $n \\times r$ paths.", feedback: "Paths aren't a product of row and column numbers. Row 4, position 2 has 6 paths, not 8." },
      ],
    },
    {
      type: "quiz",
      id: "pc4-1-q3",
      variant: "practice",
      question: "How many shortest grid routes go from $(0,0)$ to $(6,4)$ using only right and up moves?",
      options: [
        { text: "24", feedback: "That is $6 \\times 4$. Routes are words of R's and U's, not a grid area." },
        { text: "5040", feedback: "That is $^{10}P_4$. The four U moves are identical, so their order is already fixed." },
        { text: "1024", feedback: "That is $2^{10}$, every R/U word of length 10. Only the words with exactly 4 U's end at $(6,4)$." },
        { text: "210", correct: true, feedback: "10 moves, choose which 4 are U: $^{10}C_4 = \\dfrac{10 \\cdot 9 \\cdot 8 \\cdot 7}{24} = 210$." },
      ],
      hint: "How many moves in total, and how many of them are up?",
    },
    {
      type: "quiz",
      id: "pc4-1-q4",
      variant: "practice",
      question: "How many shortest routes from $(0,0)$ to $(4,4)$ pass through $(2,2)$?",
      options: [
        { text: "12", feedback: "That adds the two legs ($6 + 6$). Each first leg can be followed by any second leg, so multiply." },
        { text: "70", feedback: "That is every route to $(4,4)$, $^8C_4 = 70$. Many of them miss $(2,2)$." },
        { text: "36", correct: true, feedback: "Each leg is 2 R's and 2 U's: $^4C_2 = 6$ ways. Legs multiply: $6 \\times 6 = 36$." },
      ],
      hint: "Split the walk at the checkpoint, count each leg, then combine.",
    },
    {
      type: "quiz",
      id: "pc4-1-q5",
      variant: "concept",
      question: "Row 7, position 3 of the triangle is 35. Which split does \"the last step came from up-left or up-right\" give?",
      options: [
        { text: "$^6C_2 + {}^6C_3 = 15 + 20$", correct: true, feedback: "Last bounce R means coming from row 6, position 2; last bounce L means coming from row 6, position 3." },
        { text: "$^6C_3 + {}^6C_4 = 20 + 15$", feedback: "The numbers add to 35 by symmetry, but the neighbours of position 3 in row 6 are positions 2 and 3, not 3 and 4." },
        { text: "$^7C_2 + {}^7C_4 = 21 + 35$", feedback: "The two parents live in the row above, row 6, not in row 7." },
      ],
    },
    {
      type: "quiz",
      id: "pc4-1-q6",
      variant: "practice",
      question: "A delivery rider goes from $(0,0)$ to $(4,3)$ moving only east or north. The crossing $(2,1)$ is closed for roadworks. How many shortest routes avoid it?",
      options: [
        { text: "18", feedback: "That is the number of routes **through** $(2,1)$: $^3C_1 \\cdot {}^4C_2 = 3 \\cdot 6$. Subtract it from the total." },
        { text: "35", feedback: "That is every route, $^7C_3$, including the ones through the roadworks." },
        { text: "17", correct: true, feedback: "Total $^7C_3 = 35$. Through $(2,1)$: $^3C_1 \\cdot {}^4C_2 = 3 \\cdot 6 = 18$. Avoiding: $35 - 18 = 17$." },
        { text: "53", feedback: "That adds the bad routes to the total. Routes that avoid the block are the total **minus** the routes through it." },
      ],
      hint: "Count all routes, then subtract those that pass through $(2,1)$.",
    },
    {
      type: "quiz",
      id: "pc4-1-q7",
      variant: "practice",
      question: "How many shortest routes from $(0,0)$ to $(3,3)$ pass through $(1,1)$ or $(2,2)$ (or both)?",
      options: [
        { text: "24", feedback: "That is $12 + 12$. Routes through both points were counted twice; subtract them once." },
        { text: "16", correct: true, feedback: "Through $(1,1)$: $2 \\cdot {}^4C_2 = 12$. Through $(2,2)$: $^4C_2 \\cdot 2 = 12$. Both: $2 \\cdot 2 \\cdot 2 = 8$. So $12 + 12 - 8 = 16$." },
        { text: "8", feedback: "That counts only routes through **both** points. The question asks for at least one." },
        { text: "4", feedback: "That is the number of routes that miss both points: $20 - 16$." },
      ],
      hint: "Inclusion-exclusion: $|A \\cup B| = |A| + |B| - |A \\cap B|$.",
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "patterns-in-the-triangle",
  title: "4.2 · Patterns in the Triangle",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "Stare at Pascal's triangle long enough and patterns come out of it: rows that add to powers of 2, a mirror down the middle, diagonals that sum like a hockey stick. Each one could be checked on a few rows and trusted. This lesson does better: every pattern gets a **one-line counting reason**, so you know it holds in every row, not just the rows you looked at.",
    },
    {
      type: "text",
      content:
        "**Pattern 1 — row sums are powers of 2.** Add up row 4: $1 + 4 + 6 + 4 + 1 = 16 = 2^4$.\n\n*Counting reason.* Each entry in row $n$ counts the paths that end there. Add them up and you have counted every path of $n$ bounces, and each bounce has 2 choices. Equivalently, $^nC_r$ counts the subsets of size $r$ of an $n$-set, and summing over all sizes counts all $2^n$ subsets.",
    },
    {
      type: "math",
      latex: "{}^{n}C_{0} + {}^{n}C_{1} + \\cdots + {}^{n}C_{n} = 2^{n}",
    },
    {
      type: "interactive",
      config: {
        component: "pnc-pascal-triangle",
        mode: "highlight",
        pattern: "row-sum",
        rows: 10,
        initialCell: { n: 6, r: 0 },
        caption:
          "Row-sum pattern. Slide n and watch each row's total double: every new row counts paths that are one bounce longer, and each bounce has two choices.",
      },
    },
    {
      type: "text",
      content:
        "**Worked example 1 — pizza toppings.** A pizzeria offers 8 toppings. How many different pizzas can you order with **at least one** topping? With **at least two**?\n\n1. Each topping is either on or off: $2^8 = 256$ topping sets in all.\n   *Why this step:* this is the row sum $^8C_0 + {}^8C_1 + \\cdots + {}^8C_8$ counted the fast way, one yes/no per topping.\n2. At least one topping: remove the empty set, the plain base ($^8C_0 = 1$). That gives $256 - 1 = 255$.\n3. At least two: also remove the 8 single-topping pizzas ($^8C_1 = 8$). That gives $256 - 1 - 8 = 247$.\n   *Why this step:* \"at least\" questions are quickest by complement. The row total is known, so subtract the few small entries at the start of the row.",
    },
    {
      type: "math",
      latex: "{}^8C_2 + {}^8C_3 + \\cdots + {}^8C_8 = 2^8 - {}^8C_0 - {}^8C_1 = 256 - 1 - 8 = 247",
    },
    {
      type: "text",
      content:
        "**Worked example 2 — exam style: even-sized subsets.** Show that a set of $n \\ge 1$ elements has as many even-sized subsets as odd-sized ones, so that $^nC_0 + {}^nC_2 + {}^nC_4 + \\cdots = 2^{n-1}$.\n\n1. Fix one element, call it $x$. For any subset $S$, **toggle** $x$: add it if it's missing, remove it if it's there.\n2. Toggling changes the size by exactly 1, so it turns an even subset into an odd one and back.\n   *Why this step:* a rule that swaps two kinds of object, and undoes itself when applied twice, pairs them off one-to-one. That is the same idea as the L/R swap behind symmetry.\n3. So the even and odd subsets are equal in number. Together they make all $2^n$ subsets, so each kind numbers $2^{n-1}$.\n\nCheck on row 4: $1 + 6 + 1 = 8$ and $4 + 4 = 8$, and $2^3 = 8$. ✓ A club of 9 people can therefore form $2^8 = 256$ committees of even size (counting the empty one).",
    },
    {
      type: "text",
      content:
        "**Pattern 2 — symmetry.** Every row reads the same backwards: $^nC_r = {}^nC_{n-r}$.\n\n*Counting reason.* Swap every L with R. A path to position $r$ becomes a path to position $n - r$, and doing it twice gives back the original path. So the two sets of paths match one-to-one. (Or: choosing the $r$ people who are in is the same as choosing the $n - r$ who are out.)",
    },
    {
      type: "interactive",
      config: {
        component: "pnc-pascal-triangle",
        mode: "highlight",
        pattern: "symmetry",
        rows: 10,
        initialCell: { n: 8, r: 2 },
        caption: "Symmetry. The selected entry and its mirror image across the centre line are always equal: ⁸C₂ = ⁸C₆ = 28.",
      },
    },
    {
      type: "text",
      content:
        "**Worked example 3 — CBSE style: solving with symmetry.** If $^nC_7 = {}^nC_{12}$, find $n$ and then $^nC_{17}$.\n\n1. Along one row the entries rise to the middle and then fall, so two entries can be equal only if they are the same position or mirror images. Positions 7 and 12 are different, so they must be mirrors: $7 + 12 = n$, giving $n = 19$.\n   *Why this step:* mirror positions $r$ and $n - r$ always add to $n$.\n2. $^{19}C_{17} = {}^{19}C_{2} = \\dfrac{19 \\cdot 18}{2} = 171$.\n   *Why this step:* choosing 17 from 19 is the same as choosing the 2 left out, and a product of two numbers is far easier than one of seventeen.",
    },
    {
      type: "math",
      latex: "{}^nC_a = {}^nC_b,\\ a \\ne b \\;\\Rightarrow\\; a + b = n",
    },
    {
      type: "text",
      content:
        "**Pattern 3 — the hockey stick.** Run down a diagonal from its top 1 and add: $1 + 3 + 6 + 10 + 15 = 35$. The total is the entry diagonally below the last one, the blade of the stick.",
    },
    {
      type: "math",
      latex: "{}^{r}C_{r} + {}^{r+1}C_{r} + \\cdots + {}^{n}C_{r} = {}^{n+1}C_{r+1}",
    },
    {
      type: "interactive",
      config: {
        component: "pnc-pascal-triangle",
        mode: "highlight",
        pattern: "hockey-stick",
        rows: 10,
        initialCell: { n: 7, r: 3 },
        caption:
          "Hockey stick. The blade is ⁷C₃ = 35; the handle runs up column 2: ²C₂ + ³C₂ + ⁴C₂ + ⁵C₂ + ⁶C₂ = 1 + 3 + 6 + 10 + 15.",
      },
    },
    {
      type: "text",
      content:
        "*Counting reason.* Count the ways to choose $r + 1$ numbers from $\\{1, 2, \\dots, n + 1\\}$. Split by the **largest** number chosen. If the largest is $k + 1$, the other $r$ numbers come from $\\{1, \\dots, k\\}$, in $^kC_r$ ways. The largest can be anything from $r + 1$ up to $n + 1$, so $k$ runs from $r$ to $n$. The cases don't overlap and cover every choice, which adds up to the identity.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 — sums you already know.** The case $r = 1$ says $^1C_1 + {}^2C_1 + \\cdots + {}^nC_1 = {}^{n+1}C_2$, which is $1 + 2 + \\cdots + n = \\dfrac{n(n+1)}{2}$. The famous triangular-number formula is a hockey stick.\n\nThe case $r = 2$: $^2C_2 + {}^3C_2 + \\cdots + {}^{7}C_2 = 1 + 3 + 6 + 10 + 15 + 21 = 56 = {}^8C_3$. A sum of triangular numbers is a tetrahedral number.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 — a word problem.** A shop stacks oranges in a triangular pyramid: 1 on top, then 3, 6, 10, … (the triangular numbers), with 8 layers. How many oranges are there?\n\n1. Layer $k$ holds the $k$-th triangular number, $^{k+1}C_2$. The layers are $^2C_2, {}^3C_2, \\dots, {}^9C_2$.\n   *Why this step:* writing the layers as entries of one diagonal is what lets the hockey stick apply.\n2. The handle runs from $^2C_2$ to $^9C_2$, so the blade is $^{10}C_3 = \\dfrac{10 \\cdot 9 \\cdot 8}{6} = 120$.\n3. Check: $1 + 3 + 6 + 10 + 15 + 21 + 28 + 36 = 120$. ✓",
    },
    {
      type: "text",
      content:
        "**Worked example 6 — JEE classic: telescoping with Pascal's rule.** Evaluate $^{47}C_4 + \\displaystyle\\sum_{j=1}^{5} {}^{52-j}C_3$.\n\n1. Write the sum out, smallest term first: $^{47}C_4 + {}^{47}C_3 + {}^{48}C_3 + {}^{49}C_3 + {}^{50}C_3 + {}^{51}C_3$.\n   *Why this step:* the lone $^{47}C_4$ is waiting for a partner from the same row. Ordering the terms shows which one.\n2. Pascal's rule: $^{47}C_4 + {}^{47}C_3 = {}^{48}C_4$.\n3. Then $^{48}C_4 + {}^{48}C_3 = {}^{49}C_4$, and so on. Each step climbs one row.\n4. After the last step: $^{51}C_4 + {}^{51}C_3 = {}^{52}C_4$.\n\nThe answer is $^{52}C_4$. No arithmetic is needed, only repeated use of \"each entry is the sum of the two above it\". The hockey stick is this same chain started from the top of the diagonal.",
    },
    {
      type: "math",
      latex: "{}^{47}C_4 + {}^{47}C_3 + {}^{48}C_3 + \\cdots + {}^{51}C_3 = {}^{48}C_4 + {}^{48}C_3 + \\cdots = \\cdots = {}^{52}C_4",
    },
    {
      type: "text",
      content:
        "**Pattern 4 — odd entries.** Colour the odd entries and a fractal appears: triangles inside triangles (the Sierpiński triangle).\n\n*Reason.* Only parity matters when you add: odd + odd = even, odd + even = odd. So the odd/even picture obeys its own \"Pascal's rule\" and repeats itself at every scale. Rows $1, 3, 7, 15$ (one less than a power of 2) are entirely odd, while row 8 is odd only at its two ends.",
    },
    {
      type: "interactive",
      config: {
        component: "pnc-pascal-triangle",
        mode: "highlight",
        pattern: "odd-entries",
        rows: 12,
        initialCell: { n: 7, r: 0 },
        caption: "Odd entries lit. Row 7 is all odd; row 8 collapses to just its two end 1's, and the pattern starts over at a larger scale.",
      },
    },
    {
      type: "text",
      content:
        "**Pattern 5 — powers of 11.** Read rows 0 to 4 as numbers: 1, 11, 121, 1331, 14641. These are $11^0, 11^1, 11^2, 11^3, 11^4$.\n\n*Reason.* $11 = 10 + 1$, and $(10 + 1)^n = {}^nC_0 \\cdot 10^n + {}^nC_1 \\cdot 10^{n-1} + \\cdots + {}^nC_n$. (Lesson 4.3 proves this expansion.) Each entry is the digit in one decimal place, **as long as every entry is a single digit**.",
    },
    {
      type: "interactive",
      config: {
        component: "pnc-pascal-triangle",
        mode: "highlight",
        pattern: "powers-of-11",
        rows: 8,
        initialCell: { n: 5, r: 0 },
        caption: "Powers of 11. Rows 0 to 4 read off directly. From row 5 the two-digit entries carry into the next place.",
      },
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"11ⁿ reads off every row\"",
      content:
        "Row 5 is 1 5 10 10 5 1, and gluing the numbers together gives 15101051. But $11^5 = 161051$. The entry 10 cannot fit in one decimal place: its 1 carries into the next place, like carrying in long addition. Working from the right: $1,\\ 5,\\ 10 \\to 0$ carry 1, $10 + 1 = 11 \\to 1$ carry 1, $5 + 1 = 6,\\ 1$, which gives 161051. The identity $(10+1)^n = \\sum {}^nC_r 10^{n-r}$ is always true. Reading the digits off directly works only up to row 4.",
    },
    {
      type: "table",
      headers: ["Pattern", "Statement", "One-line counting reason"],
      rows: [
        ["Row sum", "$\\sum_r {}^nC_r = 2^n$", "All paths of $n$ bounces, 2 choices each"],
        ["Symmetry", "$^nC_r = {}^nC_{n-r}$", "Swap L and R (or: choose who is out)"],
        ["Pascal's rule", "$^nC_r = {}^{n-1}C_{r-1} + {}^{n-1}C_r$", "Last bounce was R or L"],
        ["Hockey stick", "$\\sum_{k=r}^{n} {}^kC_r = {}^{n+1}C_{r+1}$", "Split by the largest number chosen"],
        ["Powers of 11", "$11^n = \\sum {}^nC_r 10^{n-r}$", "$(10+1)^n$; digits only while entries $< 10$"],
      ],
    },
    {
      type: "quiz",
      id: "pc4-2-q1",
      variant: "practice",
      question: "What is the sum of the entries in row 9 of Pascal's triangle?",
      options: [
        { text: "1024", feedback: "That is $2^{10}$, the sum of row 10. Rows are counted from 0." },
        { text: "81", feedback: "That is $9^2$. Each bounce has 2 choices, so the total is $2^9$." },
        { text: "512", correct: true, feedback: "$2^9 = 512$: all paths of 9 bounces, each with two choices." },
        { text: "126", feedback: "That is $^9C_4$, the largest single entry of row 9, not the whole row." },
      ],
    },
    {
      type: "quiz",
      id: "pc4-2-q2",
      variant: "concept",
      question: "Row 5 of Pascal's triangle is 1 5 10 10 5 1. What is $11^5$?",
      options: [
        { text: "15101051", feedback: "That glues the entries together and ignores the carries. A two-digit entry can't sit in one decimal place." },
        { text: "151051", feedback: "Close, but the carries weren't finished. Add the place values: $10^5 + 5\\cdot 10^4 + 10\\cdot 10^3 + 10\\cdot 10^2 + 5\\cdot 10 + 1$." },
        { text: "161051", correct: true, feedback: "The 10's carry: $(10+1)^5 = 100000 + 50000 + 10000 + 1000 + 50 + 1 = 161051$." },
      ],
      hint: "Each entry $^5C_r$ multiplies $10^{5-r}$. Add the place values rather than gluing digits.",
    },
    {
      type: "quiz",
      id: "pc4-2-q3",
      variant: "practice",
      question: "Evaluate $^2C_2 + {}^3C_2 + {}^4C_2 + {}^5C_2 + {}^6C_2 + {}^7C_2$.",
      options: [
        { text: "56", correct: true, feedback: "Hockey stick: the sum is $^8C_3 = 56$. Check: $1 + 3 + 6 + 10 + 15 + 21 = 56$." },
        { text: "35", feedback: "That is $^7C_3$, the blade for a handle ending at $^6C_2$. This handle goes one step further, to $^7C_2$." },
        { text: "28", feedback: "That is $^8C_2$. The blade is one column to the right of the handle: $^8C_3$." },
        { text: "70", feedback: "That is $^8C_4$. The blade is $^{n+1}C_{r+1}$ with $r = 2$." },
      ],
    },
    {
      type: "quiz",
      id: "pc4-2-q4",
      variant: "practice",
      question: "Evaluate $^{20}C_{17}$ without a calculator.",
      options: [
        { text: "6840", feedback: "That is $20 \\cdot 19 \\cdot 18$ without dividing by $3!$." },
        { text: "1140", correct: true, feedback: "Symmetry: $^{20}C_{17} = {}^{20}C_3 = \\dfrac{20 \\cdot 19 \\cdot 18}{6} = 1140$." },
        { text: "190", feedback: "That is $^{20}C_2$. The mirror of 17 in row 20 is $20 - 17 = 3$." },
      ],
      hint: "Choosing 17 to keep is the same as choosing 3 to leave out.",
    },
    {
      type: "quiz",
      id: "pc4-2-q5",
      variant: "practice",
      question: "How many entries of row 8 (1 8 28 56 70 56 28 8 1) are odd, and why?",
      options: [
        { text: "9, because every entry of a row one less than a power of 2 is odd", feedback: "That describes row 7, which is $2^3 - 1$. Row 8 is a power of 2, the opposite extreme." },
        { text: "2, because row 8 is where the odd-entry fractal starts a new, larger copy", correct: true, feedback: "Only the end 1's are odd. Rows $2^k$ always look like this: 1, then all even, then 1." },
        { text: "4", feedback: "Check each entry: 8, 28, 56 and 70 are all even." },
      ],
    },
    {
      type: "quiz",
      id: "pc4-2-q6",
      variant: "practice",
      question: "A sandwich counter offers 6 fillings, and a sandwich must have at least one filling. How many different sandwiches are possible? (Only the set of fillings matters.)",
      options: [
        { text: "64", feedback: "That is $2^6$, which includes the empty sandwich with no filling. Subtract it." },
        { text: "63", correct: true, feedback: "Each filling is in or out: $2^6 = 64$ sets, minus the empty one: $63$." },
        { text: "720", feedback: "That is $6!$, which orders the fillings. A sandwich is a set of fillings, not a sequence." },
        { text: "6", feedback: "That counts only single-filling sandwiches, $^6C_1$. Add the sandwiches with 2, 3, … fillings too." },
      ],
      hint: "Row sum minus the $^6C_0$ entry.",
    },
    {
      type: "quiz",
      id: "pc4-2-q7",
      variant: "practice",
      question: "If $^nC_4 = {}^nC_{10}$, what is $^nC_{12}$?",
      options: [
        { text: "91", correct: true, feedback: "Mirror positions: $4 + 10 = n = 14$. Then $^{14}C_{12} = {}^{14}C_2 = \\frac{14 \\cdot 13}{2} = 91$." },
        { text: "1001", feedback: "That is $^{14}C_4$. The mirror of 12 in row 14 is 2, not 4." },
        { text: "66", feedback: "That is $^{12}C_2$. First find $n$: equal entries at positions 4 and 10 mean $n = 4 + 10$." },
        { text: "182", feedback: "That is $14 \\cdot 13$. Divide by $2!$ because the two left out form a set." },
      ],
      hint: "Two different positions with equal entries must be mirror images, so they add to $n$.",
    },
    {
      type: "quiz",
      id: "pc4-2-q8",
      variant: "concept",
      question: "How many subsets of a 7-element set have an odd number of elements?",
      options: [
        { text: "128", feedback: "That is $2^7$, every subset. Toggling one fixed element pairs odd subsets with even ones, so the odd ones are half." },
        { text: "64", correct: true, feedback: "Toggling a fixed element swaps odd and even subsets one-to-one, so each kind is half of $2^7$: $64$. Check: $7 + 35 + 21 + 1 = 64$." },
        { text: "63", feedback: "Nothing needs removing here. The empty set has size 0, which is even, so it was never among the odd subsets." },
        { text: "35", feedback: "That is $^7C_3$, only the 3-element subsets. Add sizes 1, 5 and 7 too." },
      ],
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "expanding-by-choosing",
  title: "4.3 · Expanding (a + b)ⁿ by Choosing",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "Expanding $(a + b)^2 = a^2 + 2ab + b^2$ is familiar. Doing $(a+b)^7$ by repeated multiplication is slow and error-prone. There is a better way, because multiplying out brackets is a **counting process**.",
    },
    {
      type: "text",
      content:
        "Write $(a + b)^3 = (a + b)(a + b)(a + b)$. To make one term of the product, you pick **one letter from each bracket** and multiply the picks. Every way of picking gives one term, so there are $2 \\times 2 \\times 2 = 8$ terms before you collect anything:",
    },
    {
      type: "table",
      headers: ["Picks (bracket 1, 2, 3)", "Product", "Number of b's"],
      rows: [
        ["a a a", "$a^3$", "0"],
        ["a a b, a b a, b a a", "$a^2b$ (three times)", "1"],
        ["a b b, b a b, b b a", "$ab^2$ (three times)", "2"],
        ["b b b", "$b^3$", "3"],
      ],
    },
    {
      type: "math",
      latex: "(a+b)^3 = a^3 + 3a^2b + 3ab^2 + b^3",
    },
    {
      type: "text",
      content:
        "Where did the 3 in $3a^2b$ come from? The term $a^2b$ appears once for each way of choosing **which one bracket** supplies the $b$: $^3C_1 = 3$ ways. In general, with $n$ brackets, the term $a^{n-r}b^r$ appears once for every choice of **which $r$ brackets supply $b$** (the rest supply $a$). That is $^nC_r$ times. This is Lesson 4.1 again: each pick is a word of a's and b's, just as each path was a word of L's and R's.\n\nThis counting argument is a **complete proof** of the binomial theorem for every positive integer $n$, not just a pattern spotted on small cases.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The binomial theorem",
      content:
        "For every positive integer $n$: $(a + b)^n = \\displaystyle\\sum_{r=0}^{n} {}^nC_r\\, a^{n-r} b^r = {}^nC_0 a^n + {}^nC_1 a^{n-1}b + {}^nC_2 a^{n-2}b^2 + \\cdots + {}^nC_n b^n$. The numbers $^nC_r$ (also written $\\binom{n}{r}$) are called **binomial coefficients**. They are exactly row $n$ of Pascal's triangle.",
    },
    {
      type: "callout",
      variant: "info",
      title: "The textbook proof by induction",
      content:
        "NCERT proves the theorem by induction. The step: assume the formula for $n$ and multiply both sides by $(a + b)$. The term $a^{n+1-r}b^r$ then arrives twice, as $a \\cdot {}^nC_r a^{n-r}b^r$ and as $b \\cdot {}^nC_{r-1} a^{n-r+1}b^{r-1}$. So its coefficient is $^nC_{r-1} + {}^nC_r = {}^{n+1}C_r$ by Pascal's rule, which is the formula for $n + 1$. It is the same fact as Lesson 4.1: each entry is the sum of the two above it.",
    },
    {
      type: "interactive",
      config: {
        component: "pnc-pascal-triangle",
        mode: "expansion",
        rows: 10,
        expansion: { a: "a", b: "b" },
        initialCell: { n: 3, r: 1 },
        caption:
          "Slide n to change the power and see the expansion written with binomial coefficients, then with the numbers worked out. Slide r to pick out one term.",
      },
    },
    {
      type: "text",
      content:
        "Read off the shape of every expansion:\n\n- There are $n + 1$ terms ($r = 0, 1, \\dots, n$).\n- The power of $a$ falls from $n$ to 0 while the power of $b$ rises from 0 to $n$. In every term the two powers add to $n$.\n- The coefficients are symmetric, because $^nC_r = {}^nC_{n-r}$.\n- Putting $a = b = 1$ gives $2^n = \\sum {}^nC_r$, the row-sum pattern of Lesson 4.2.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"(a + b)ⁿ = aⁿ + bⁿ\"",
      content:
        "This keeps only the two picks \"all a\" and \"all b\" and throws away every mixed pick. Test it: $(1 + 1)^2 = 4$, but $1^2 + 1^2 = 2$. For $n = 3$ you lose the six mixed picks worth $3a^2b + 3ab^2$. Powers do not distribute over addition. They do distribute over multiplication: $(ab)^n = a^n b^n$.",
    },
    {
      type: "text",
      content:
        "**Signs: $(a - b)^n$.** Write it as $(a + (-b))^n$. The term with $r$ copies of $-b$ carries $(-b)^r = (-1)^r b^r$, so the signs **alternate** $+, -, +, -, \\dots$, starting with $+$:",
    },
    {
      type: "math",
      latex: "(a - b)^n = \\sum_{r=0}^{n} (-1)^r\\, {}^nC_r\\, a^{n-r} b^r",
    },
    {
      type: "text",
      content:
        "**Worked example 1 — expand $(x + 2)^4$.**\n\n1. Row 4 of the triangle: 1, 4, 6, 4, 1.\n2. Terms: $x^4,\\ 4 \\cdot x^3 \\cdot 2,\\ 6 \\cdot x^2 \\cdot 2^2,\\ 4 \\cdot x \\cdot 2^3,\\ 2^4$.\n3. Simplify: $x^4 + 8x^3 + 24x^2 + 32x + 16$.\n4. Check with $x = 1$: $1 + 8 + 24 + 32 + 16 = 81 = 3^4$. ✓",
    },
    {
      type: "interactive",
      config: {
        component: "pnc-pascal-triangle",
        mode: "expansion",
        rows: 8,
        expansion: { a: "x", b: "2" },
        initialCell: { n: 4, r: 2 },
        caption: "(x + 2)⁴ term by term. The selected term is T₃ = ⁴C₂ · x² · 2² = 6 · 4 · x² = 24x². The readout leaves 2² unsimplified.",
      },
    },
    {
      type: "text",
      content:
        "**Worked example 2 — expand $\\left(x - \\dfrac{1}{x}\\right)^4$.**\n\n1. The general term is $^4C_r\\, x^{4-r} \\left(-\\dfrac{1}{x}\\right)^r = (-1)^r\\, {}^4C_r\\, x^{4-2r}$.\n2. $r = 0, 1, 2, 3, 4$ give $x^4,\\ -4x^2,\\ 6,\\ -\\dfrac{4}{x^2},\\ \\dfrac{1}{x^4}$.\n3. So $\\left(x - \\dfrac1x\\right)^4 = x^4 - 4x^2 + 6 - \\dfrac{4}{x^2} + \\dfrac{1}{x^4}$. Notice the constant term 6 in the middle; Lesson 4.4 shows how to find terms like that directly.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 — arithmetic with the theorem.** Find $(1.01)^5$ to 5 decimal places.\n\n1. $(1 + 0.01)^5 = 1 + 5(0.01) + 10(0.01)^2 + 10(0.01)^3 + 5(0.01)^4 + (0.01)^5$.\n2. $= 1 + 0.05 + 0.001 + 0.00001 + 0.00000005 + 0.0000000001$.\n3. $= 1.0510100501$, so $(1.01)^5 \\approx 1.05101$.\n\nThe terms shrink fast, which is why a few terms of a binomial expansion make good approximations.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 — growth in the real world.** A town of 10,000 people grows by 2% every year. What is its population after 3 years?\n\n1. Each year multiplies the population by $1.02$, so after 3 years it is $10000 \\times (1 + 0.02)^3$.\n   *Why this step:* 2% growth on the current population is multiplication by $1 + 0.02$, repeated once per year.\n2. Expand with row 3 (1, 3, 3, 1): $(1 + 0.02)^3 = 1 + 3(0.02) + 3(0.02)^2 + (0.02)^3 = 1 + 0.06 + 0.0012 + 0.000008 = 1.061208$.\n3. Population $= 10000 \\times 1.061208 \\approx 10612$.\n\nRead the terms: $1 + 0.06$ is \"2% of the original, three times\", which would give 10,600. The $3(0.02)^2$ term is growth on earlier growth, the compounding. It adds 12 people. The last term adds less than 1 person.",
    },
    {
      type: "math",
      latex: "10000(1.02)^3 = 10000\\,\\big(\\underbrace{1 + 0.06}_{\\text{simple growth}} + \\underbrace{0.0012 + 0.000008}_{\\text{compounding}}\\big) = 10612.08",
    },
    {
      type: "text",
      content:
        "**Worked example 5 — CBSE/NCERT style: a divisibility proof.** Prove that $9^{n+1} - 8n - 9$ is divisible by 64 for every positive integer $n$.\n\n1. Write $9 = 1 + 8$ and expand: $9^{n+1} = (1 + 8)^{n+1} = 1 + {}^{n+1}C_1 \\cdot 8 + {}^{n+1}C_2 \\cdot 8^2 + {}^{n+1}C_3 \\cdot 8^3 + \\cdots$\n   *Why this step:* 64 is $8^2$. Splitting 9 as $1 + 8$ makes every term from $r = 2$ onward carry a factor $8^2$.\n2. The first two terms are $1 + 8(n + 1) = 8n + 9$, exactly what is being subtracted.\n3. So $9^{n+1} - 8n - 9 = 8^2\\left[{}^{n+1}C_2 + {}^{n+1}C_3 \\cdot 8 + \\cdots\\right] = 64 \\times (\\text{an integer})$. ∎\n\nCheck: $n = 1$ gives $81 - 8 - 9 = 64$, and $n = 2$ gives $729 - 16 - 9 = 704 = 64 \\times 11$. ✓",
    },
    {
      type: "math",
      latex: "9^{n+1} - 8n - 9 = 64\\left[{}^{n+1}C_2 + 8\\,{}^{n+1}C_3 + 8^2\\,{}^{n+1}C_4 + \\cdots\\right]",
    },
    {
      type: "quiz",
      id: "pc4-3-q1",
      variant: "concept",
      question: "A student writes $(x + 3)^2 = x^2 + 9$. What went wrong?",
      options: [
        { text: "Nothing; squaring distributes over addition.", feedback: "Test with $x = 1$: $(1 + 3)^2 = 16$ but $1 + 9 = 10$. Powers don't distribute over $+$." },
        { text: "The 9 should be 6.", feedback: "The 9 is correct ($3^2$). The missing piece is a whole term, $6x$." },
        { text: "The mixed picks ($x$ from one bracket, 3 from the other) were dropped. There are $^2C_1 = 2$ of them, giving $6x$.", correct: true, feedback: "Right: $(x+3)^2 = x^2 + 6x + 9$. Check with $x = 1$: $16$, not $10$." },
      ],
    },
    {
      type: "quiz",
      id: "pc4-3-q2",
      variant: "practice",
      question: "What is the coefficient of $a^2b^3$ in $(a + b)^5$?",
      options: [
        { text: "5", feedback: "That is $^5C_1$, for $a^4b$. Here 3 brackets give $b$." },
        { text: "6", feedback: "That is $2 \\times 3$. The coefficient counts the ways to choose the $b$-brackets." },
        { text: "10", correct: true, feedback: "Choose which 3 of the 5 brackets supply $b$: $^5C_3 = 10$." },
        { text: "60", feedback: "That is $^5P_3$. The brackets supplying $b$ form a set, so there is no order." },
      ],
    },
    {
      type: "quiz",
      id: "pc4-3-q3",
      variant: "practice",
      question: "In the expansion of $(x - 2)^4$, what is the coefficient of $x$?",
      options: [
        { text: "$32$", feedback: "An odd number of $(-2)$'s makes the term negative." },
        { text: "$-32$", correct: true, feedback: "$x^1$ needs $r = 3$ copies of $-2$: $^4C_3 (-2)^3 = 4 \\cdot (-8) = -32$." },
        { text: "$-8$", feedback: "That is $(-2)^3$ without the coefficient $^4C_3 = 4$." },
        { text: "$24$", feedback: "That is the $x^2$ coefficient, $^4C_2 (-2)^2$." },
      ],
      hint: "Which $r$ leaves $x^{4-r} = x^1$?",
    },
    {
      type: "quiz",
      id: "pc4-3-q4",
      variant: "practice",
      question: "Use the binomial theorem to find $101^4$.",
      options: [
        { text: "104060401", correct: true, feedback: "$(100 + 1)^4 = 10^8 + 4 \\cdot 10^6 + 6 \\cdot 10^4 + 4 \\cdot 10^2 + 1 = 104060401$." },
        { text: "100000001", feedback: "That is $100^4 + 1^4$, the \"power distributes\" error again." },
        { text: "14641", feedback: "That is $11^4$. The coefficients 1 4 6 4 1 are right but here they sit two places apart." },
      ],
    },
    {
      type: "quiz",
      id: "pc4-3-q5",
      variant: "practice",
      question: "How many terms does the expansion of $(2x - y)^{12}$ have, and what is the sum of all its coefficients?",
      options: [
        { text: "12 terms; sum of coefficients $2^{12}$", feedback: "There are $n + 1$ terms, and $2^{12}$ would be right only for $(x + y)^{12}$." },
        { text: "13 terms; sum of coefficients $3^{12}$", feedback: "The count is right, but the $-y$ matters: set $x = y = 1$ to get $(2 - 1)^{12}$." },
        { text: "13 terms; sum of coefficients $1$", correct: true, feedback: "$r = 0, \\dots, 12$ gives 13 terms. Put $x = y = 1$: $(2 - 1)^{12} = 1$." },
      ],
      hint: "The sum of the coefficients is the value of the expression when every variable is 1.",
    },
    {
      type: "quiz",
      id: "pc4-3-q6",
      variant: "practice",
      question: "Use the binomial theorem to find $(0.99)^5$ correct to 4 decimal places.",
      options: [
        { text: "0.9500", feedback: "That keeps only $1 - 5(0.01)$. The third term, $10(0.01)^2 = 0.001$, still changes the 3rd decimal place." },
        { text: "0.9490", feedback: "The third term is $+10(0.01)^2$. Signs alternate $+, -, +, -$, so an even power of $-0.01$ is positive." },
        { text: "0.9510", correct: true, feedback: "$(1 - 0.01)^5 = 1 - 0.05 + 0.001 - 0.00001 + \\cdots = 0.95099\\ldots \\approx 0.9510$." },
        { text: "1.0510", feedback: "That is $(1.01)^5$. Here $b = -0.01$, so the signs alternate." },
      ],
      hint: "Write $0.99 = 1 - 0.01$ and keep terms until they stop affecting the 4th decimal place.",
    },
    {
      type: "quiz",
      id: "pc4-3-q7",
      variant: "practice",
      question: "What is the largest number that divides $6^n - 5n - 1$ for every positive integer $n$?",
      options: [
        { text: "5", feedback: "5 always divides it, but so does a larger number. Expand $(1 + 5)^n$: every term from $r = 2$ has a factor $5^2$." },
        { text: "125", feedback: "Test $n = 2$: $36 - 10 - 1 = 25$, which is not divisible by 125." },
        { text: "25", correct: true, feedback: "$(1 + 5)^n = 1 + 5n + 25\\left[{}^nC_2 + 5\\,{}^nC_3 + \\cdots\\right]$, so 25 always divides it, and $n = 2$ gives exactly 25, so nothing larger works." },
        { text: "36", feedback: "Test $n = 2$: the value is 25, which 36 does not divide." },
      ],
      hint: "Write $6 = 1 + 5$, expand, and see what the first two terms cancel.",
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "the-general-term",
  title: "4.4 · The General Term",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "Exam questions rarely ask for a whole expansion. They ask for **one term**: the coefficient of $x^5$, the term without $x$, the 6th term. Writing out all $n + 1$ terms to find one wastes time. The counting picture points straight at the term you want.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "General term",
      content:
        "In $(a + b)^n$ the term with $r$ factors of $b$ is $T_{r+1} = {}^nC_r\\, a^{n-r}\\, b^r$, for $r = 0, 1, \\dots, n$. It is the $(r+1)$-th term because counting starts at $r = 0$: the first term $T_1$ has no $b$ at all.",
    },
    {
      type: "table",
      headers: ["Term", "$r$ (number of b's)", "Formula in $(a+b)^n$"],
      rows: [
        ["$T_1$", "0", "$^nC_0\\, a^n$"],
        ["$T_2$", "1", "$^nC_1\\, a^{n-1} b$"],
        ["$T_3$", "2", "$^nC_2\\, a^{n-2} b^2$"],
        ["$T_{r+1}$", "$r$", "$^nC_r\\, a^{n-r} b^r$"],
        ["$T_{n+1}$ (last)", "$n$", "$^nC_n\\, b^n$"],
      ],
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"Tᵣ uses ⁿCᵣ\"",
      content:
        "The subscript of the term is always **one more** than the $r$ in $^nC_r$. The 5th term of $(1 + x)^{10}$ is $T_5$, so $r = 4$: $^{10}C_4 x^4 = 210x^4$. Using $^{10}C_5 x^5 = 252x^5$ gives the 6th term. A quick check: $T_1$ must be the term with no $b$, and $r = 0$ gives exactly that.",
    },
    {
      type: "text",
      content:
        "**The method** for any \"find the term\" question:\n\n1. Write $T_{r+1}$ with the actual $a$ and $b$, including signs and coefficients inside them.\n2. Collect the power of $x$ as a function of $r$.\n3. Set that power equal to what you want and solve for $r$. It must be a whole number from 0 to $n$; if it isn't, no such term exists.\n4. Substitute $r$ back and simplify.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 — the coefficient of $x^5$ in $(2x - 3)^8$.**\n\n1. $a = 2x$, $b = -3$: $T_{r+1} = {}^8C_r (2x)^{8-r} (-3)^r$.\n2. The power of $x$ is $8 - r$.\n3. $8 - r = 5$ gives $r = 3$.\n4. Coefficient $= {}^8C_3 \\cdot 2^5 \\cdot (-3)^3 = 56 \\cdot 32 \\cdot (-27) = -48384$.\n\nThe sign comes from $(-3)^3$: an odd number of negative factors. The $2^5$ is easy to forget. The 2 belongs to $a = 2x$, so it is raised to the same power as $x$.",
    },
    {
      type: "math",
      latex: "T_4 = {}^8C_3\\,(2x)^5(-3)^3 = 56 \\cdot 32 \\cdot (-27)\\,x^5 = -48384\\,x^5",
    },
    {
      type: "text",
      content:
        "**Worked example 2 — the term independent of $x$ in $\\left(x^2 + \\dfrac{1}{x}\\right)^9$.** \"Independent of $x$\" means the power of $x$ is 0.\n\n1. $T_{r+1} = {}^9C_r (x^2)^{9-r} \\left(x^{-1}\\right)^r$.\n2. Power of $x$: $2(9 - r) - r = 18 - 3r$.\n3. $18 - 3r = 0$ gives $r = 6$, a whole number between 0 and 9, so the term exists. It is $T_7$.\n4. $T_7 = {}^9C_6 = {}^9C_3 = 84$.",
    },
    {
      type: "math",
      latex: "T_{r+1} = {}^9C_r\\, x^{18-3r} \\;\\Rightarrow\\; r = 6,\\quad T_7 = {}^9C_6 = 84",
    },
    {
      type: "text",
      content:
        "**Worked example 3 — when there is no such term.** Is there a term independent of $x$ in $\\left(x + \\dfrac{1}{x^2}\\right)^7$?\n\n1. $T_{r+1} = {}^7C_r\\, x^{7-r} x^{-2r} = {}^7C_r\\, x^{7-3r}$.\n2. $7 - 3r = 0$ gives $r = \\dfrac{7}{3}$, which is not an integer.\n3. So **no** term is independent of $x$. The powers present are $7, 4, 1, -2, -5, \\dots$, and they jump over 0.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 — a term counted from the end.** Find the 3rd term from the end of $\\left(x + \\dfrac1x\\right)^{10}$.\n\n1. There are 11 terms, so the 3rd from the end is the 9th from the start: $T_9$, with $r = 8$.\n2. $T_9 = {}^{10}C_8\\, x^{2} \\left(\\dfrac1x\\right)^8 = 45\\,x^{-6}$.\n\nShortcut: the $k$-th term from the end of $(a + b)^n$ is the $k$-th term from the start of $(b + a)^n$. Here that is $^{10}C_2 \\left(\\dfrac1x\\right)^{8} x^2$, the same answer.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 — adding two expansions.** Simplify $(x + a)^n + (x - a)^n$, then evaluate $(\\sqrt2 + 1)^6 + (\\sqrt2 - 1)^6$.\n\n1. The terms of the two expansions are $^nC_r\\, x^{n-r} a^r$ and $(-1)^r\\, {}^nC_r\\, x^{n-r} a^r$.\n2. For even $r$ they are equal, so they add up to twice the term. For odd $r$ they are opposites and cancel.\n3. So $(x + a)^n + (x - a)^n = 2\\left[x^n + {}^nC_2\\, x^{n-2} a^2 + {}^nC_4\\, x^{n-4} a^4 + \\cdots\\right]$. Only the even-$r$ terms are left.\n4. Put $x = \\sqrt2$, $a = 1$, $n = 6$: $2\\left[(\\sqrt2)^6 + 15(\\sqrt2)^4 + 15(\\sqrt2)^2 + 1\\right] = 2[8 + 60 + 30 + 1] = 198$.\n\nThe surds all had even powers, so the answer is a whole number. In the same way $(x + a)^n - (x - a)^n$ keeps only the odd-$r$ terms, doubled.",
    },
    {
      type: "table",
      headers: ["Expression", "Terms left", "$n$ even", "$n$ odd"],
      rows: [
        ["$(x + a)^n + (x - a)^n$", "even $r$", "$\\frac{n}{2} + 1$", "$\\frac{n+1}{2}$"],
        ["$(x + a)^n - (x - a)^n$", "odd $r$", "$\\frac{n}{2}$", "$\\frac{n+1}{2}$"],
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 6 — a coefficient in a product.** Find the coefficient of $x^3$ in $(1 + 2x)(1 - x)^6$.\n\n1. An $x^3$ in the product comes from one of two pairings: $1 \\times$ (the $x^3$ term of $(1 - x)^6$), or $2x \\times$ (the $x^2$ term of $(1 - x)^6$).\n2. In $(1 - x)^6$ the coefficient of $x^k$ is $(-1)^k\\, {}^6C_k$: for $x^3$ it is $-20$, for $x^2$ it is $15$.\n3. Coefficient $= 1 \\cdot (-20) + 2 \\cdot 15 = 10$.\n\nList every way the powers can add up to the one you want, find each coefficient with the general term, and add the products.",
    },
    {
      type: "text",
      content:
        "**Running the general term backwards.** So far $n$, $a$ and $b$ were given and you found a term. Exam questions often give a coefficient and ask for the unknown instead. The method is the same: write $T_{r+1}$, then set up an equation.\n\n**Worked example 7 — find $n$.** In $(1 + x)^n$ the coefficient of $x^2$ is 36. Find $n$.\n\n1. The $x^2$ term has $r = 2$: its coefficient is $^nC_2 = \\dfrac{n(n-1)}{2}$.\n2. $\\dfrac{n(n-1)}{2} = 36 \\Rightarrow n^2 - n - 72 = 0 \\Rightarrow (n - 9)(n + 8) = 0$.\n3. $n$ is a positive integer, so $n = 9$. Check: $^9C_2 = 36$. ✓\n   *Why this step:* the quadratic has two roots. Only one can be the power of an expansion.",
    },
    {
      type: "text",
      content:
        "**Worked example 8 — NCERT/JEE style: find a parameter.** The coefficients of $x^2$ and $x^3$ in $(3 + ax)^9$ are equal. Find $a$ (with $a \\ne 0$).\n\n1. General term: $T_{r+1} = {}^9C_r\\, 3^{9-r} (ax)^r = {}^9C_r\\, 3^{9-r} a^r x^r$.\n   *Why this step:* the unknown $a$ sits inside $b = ax$, so it gets raised to the power $r$ along with $x$.\n2. Coefficient of $x^2$: $^9C_2 \\cdot 3^7 a^2 = 36 \\cdot 3^7 a^2$. Coefficient of $x^3$: $^9C_3 \\cdot 3^6 a^3 = 84 \\cdot 3^6 a^3$.\n3. Set them equal and divide both sides by $3^6 a^2$ (allowed, since $a \\ne 0$): $36 \\cdot 3 = 84a$, so $a = \\dfrac{108}{84} = \\dfrac{9}{7}$.\n   *Why this step:* dividing by the common powers leaves a one-line linear equation instead of a huge one.\n4. Check: $36 \\cdot 2187 \\cdot \\dfrac{81}{49}$ and $84 \\cdot 729 \\cdot \\dfrac{729}{343}$ both equal $\\dfrac{6377292}{49}$. ✓",
    },
    {
      type: "math",
      latex: "{}^9C_2\\,3^7a^2 = {}^9C_3\\,3^6a^3 \\;\\Rightarrow\\; 36 \\cdot 3 = 84\\,a \\;\\Rightarrow\\; a = \\frac{9}{7}",
    },
    {
      type: "callout",
      variant: "tip",
      title: "JEE extension: counting rational terms",
      content:
        "How many terms of $\\left(\\sqrt2 + \\sqrt[3]{3}\\right)^{10}$ are rational? The general term is $^{10}C_r\\, 2^{(10-r)/2}\\, 3^{r/3}$. It is rational exactly when both exponents are whole numbers: $10 - r$ even (so $r$ even) and $r$ a multiple of 3. So $r$ is a multiple of 6 between 0 and 10: $r = 0$ or $r = 6$, giving **2** rational terms, $T_1 = 32$ and $T_7 = {}^{10}C_6 \\cdot 4 \\cdot 9 = 7560$. Same method as the term independent of $x$: write the exponents in terms of $r$ and ask which $r$ make them integers.",
    },
    {
      type: "text",
      content:
        "**Three terms instead of two: the multinomial coefficient (JEE).** The choosing argument never cared that the bracket had only two letters. In $(a + b + c)^n$ each of the $n$ brackets supplies one of $a$, $b$ or $c$. A term $a^p b^q c^s$, with $p + q + s = n$, appears once for every way of deciding which $p$ brackets give $a$, which $q$ give $b$ and which $s$ give $c$. Each such decision is a word of $n$ letters with $p$ a's, $q$ b's and $s$ c's, and lesson 1.3 counted those words:",
    },
    {
      type: "math",
      latex: "\\text{coefficient of } a^p b^q c^s \\text{ in } (a + b + c)^n = \\frac{n!}{p!\\,q!\\,s!}, \\qquad p + q + s = n",
    },
    {
      type: "text",
      content:
        "With only two letters this is $\\dfrac{n!}{(n-r)!\\,r!} = {}^nC_r$, the binomial coefficient again. It is also the labelled-groups count from 3.1, and lesson 3.2 counted how many different terms there are: ${}^{n+2}C_2$.\n\n**Worked example 9 — a multinomial coefficient.** Find the coefficient of $x^2y^3z$ in $(x + 2y - z)^6$.\n\n1. Check the powers: $2 + 3 + 1 = 6$, so the term exists.\n2. Choose which 2 brackets give $x$, which 3 give $2y$ and which 1 gives $-z$: $\\dfrac{6!}{2!\\,3!\\,1!} = 60$ ways.\n3. Each such pick multiplies to $x^2\\,(2y)^3\\,(-z) = -8\\,x^2y^3z$.\n   *Why this step:* exactly as with two terms, the number inside each part is raised to the same power as its variable, signs included.\n4. Coefficient $= 60 \\times (-8) = -480$.",
    },
    {
      type: "interactive",
      config: {
        component: "pnc-pascal-triangle",
        mode: "expansion",
        rows: 10,
        expansion: { a: "2x", b: "-3" },
        initialCell: { n: 8, r: 3 },
        caption:
          "(2x − 3)⁸ from Worked Example 1, with T₄ selected (the readout writes it as 2x plus −3). Each extra factor of (−3) flips the sign: odd r gives a negative term, even r a positive one. The subscript of T always stays one ahead of r.",
      },
    },
    {
      type: "quiz",
      id: "pc4-4-q1",
      variant: "concept",
      question: "What is the 4th term of $(1 + x)^9$?",
      options: [
        { text: "$126x^4$", feedback: "That is $^9C_4 x^4$, which is $T_5$. The off-by-one trap: $T_{r+1}$ uses $^nC_r$." },
        { text: "$84x^3$", correct: true, feedback: "$T_4$ means $r = 3$: $^9C_3 x^3 = 84x^3$." },
        { text: "$36x^2$", feedback: "That is $T_3$ ($r = 2$)." },
      ],
    },
    {
      type: "quiz",
      id: "pc4-4-q2",
      variant: "practice",
      question: "What is the coefficient of $x^4$ in $(1 - 2x)^6$?",
      options: [
        { text: "$-240$", feedback: "$(-2)^4 = +16$. An even number of negative factors gives a positive result." },
        { text: "15", feedback: "That is $^6C_4$ alone. The $-2$ inside $b = -2x$ is also raised to the 4th power." },
        { text: "$-160$", feedback: "That is the $x^3$ coefficient, $^6C_3 (-2)^3$." },
        { text: "240", correct: true, feedback: "$r = 4$: $^6C_4 (-2)^4 = 15 \\cdot 16 = 240$. Even power, so positive." },
      ],
    },
    {
      type: "quiz",
      id: "pc4-4-q3",
      variant: "practice",
      question: "What is the term independent of $x$ in $\\left(2x^2 - \\dfrac{1}{x}\\right)^6$?",
      options: [
        { text: "15", feedback: "That is $^6C_4$ alone. The factor $2$ in $a = 2x^2$ is raised to $6 - 4 = 2$." },
        { text: "60", correct: true, feedback: "Power $2(6 - r) - r = 12 - 3r = 0$ gives $r = 4$: $^6C_4 \\cdot 2^{2} \\cdot (-1)^4 = 15 \\cdot 4 = 60$." },
        { text: "$-160$", feedback: "That takes $r = 3$, but then the power of $x$ is $12 - 9 = 3$, not 0." },
        { text: "240", feedback: "That uses $2^4$. The 2 belongs to $a$, whose power is $n - r = 2$." },
      ],
      hint: "Write the power of $x$ in $T_{r+1}$ and set it to 0.",
    },
    {
      type: "quiz",
      id: "pc4-4-q4",
      variant: "concept",
      question: "Does $\\left(x^2 + \\dfrac{1}{x}\\right)^8$ have a term independent of $x$?",
      options: [
        { text: "Yes: it is the middle term, $^8C_4$.", feedback: "The middle term is $^8C_4 x^{8} x^{-4} = 70x^4$. That still contains $x$." },
        { text: "No: $16 - 3r = 0$ gives $r = \\frac{16}{3}$, which is not a whole number.", correct: true, feedback: "The powers present are $16, 13, 10, \\dots, 1, -2, \\dots$, and 0 is skipped." },
        { text: "Yes: every binomial expansion has a constant term.", feedback: "$(1 + x)^n$ does, but in general the powers can skip 0. Solve for $r$ to check." },
      ],
    },
    {
      type: "quiz",
      id: "pc4-4-q5",
      variant: "practice",
      question: "What is the 3rd term from the end of $\\left(x + \\dfrac{1}{x}\\right)^{10}$?",
      options: [
        { text: "$45x^6$", feedback: "That is the 3rd term from the start, $T_3$." },
        { text: "$120x^{-4}$", feedback: "That is $T_8$ ($r = 7$), the 4th from the end." },
        { text: "$45x^{-6}$", correct: true, feedback: "11 terms, so it is $T_9$ ($r = 8$): $^{10}C_8 x^2 x^{-8} = 45x^{-6}$." },
      ],
      hint: "With $n + 1$ terms, the $k$-th from the end is the $(n + 2 - k)$-th from the start.",
    },
    {
      type: "quiz",
      id: "pc4-4-q6",
      variant: "practice",
      question: "What is the coefficient of $x^2$ in $(1 + 2x)(1 - x)^5$?",
      options: [
        { text: "10", feedback: "That is only $1 \\times$ (the $x^2$ term of $(1-x)^5$). The pairing $2x \\times$ (the $x$ term) also gives $x^2$." },
        { text: "20", feedback: "The $x$ term of $(1 - x)^5$ is $-5x$, not $+5x$: one factor of $-x$ makes it negative." },
        { text: "$-10$", feedback: "That is only the pairing $2x \\times (-5x)$. Add $1 \\times 10x^2$ as well." },
        { text: "0", correct: true, feedback: "$1 \\cdot {}^5C_2 + 2 \\cdot (-{}^5C_1) = 10 - 10 = 0$. The two pairings cancel exactly." },
      ],
      hint: "An $x^2$ comes from $1 \\times x^2$ or from $2x \\times x$. Find both coefficients in $(1 - x)^5$.",
    },
    {
      type: "quiz",
      id: "pc4-4-q7",
      variant: "practice",
      question: "Evaluate $(\\sqrt3 + 1)^4 + (\\sqrt3 - 1)^4$.",
      options: [
        { text: "28", feedback: "That is the bracket before doubling. Each surviving term appears once in each expansion." },
        { text: "20", feedback: "That is $2[9 + 1]$, which drops the middle term $^4C_2 (\\sqrt3)^2 = 18$." },
        { text: "56", correct: true, feedback: "Only even $r$ survive, doubled: $2\\left[(\\sqrt3)^4 + 6(\\sqrt3)^2 + 1\\right] = 2[9 + 18 + 1] = 56$." },
        { text: "$32\\sqrt3$", feedback: "That is the difference $(\\sqrt3 + 1)^4 - (\\sqrt3 - 1)^4$, which keeps the odd-$r$ terms. For the sum they cancel." },
      ],
      hint: "In the sum, the odd-$r$ terms cancel and the even-$r$ terms double.",
    },
    {
      type: "quiz",
      id: "pc4-4-q8",
      variant: "practice",
      question: "In $(1 + x)^n$ the coefficient of $x^2$ is 28. What is $n$?",
      options: [
        { text: "7", feedback: "$^7C_2 = 21$. Solve $\\frac{n(n-1)}{2} = 28$." },
        { text: "8", correct: true, feedback: "$\\frac{n(n-1)}{2} = 28 \\Rightarrow n^2 - n - 56 = 0 \\Rightarrow (n - 8)(n + 7) = 0$, so $n = 8$." },
        { text: "14", feedback: "That solves $2n = 28$. The coefficient of $x^2$ is $^nC_2 = \\frac{n(n-1)}{2}$, not $2n$." },
        { text: "28", feedback: "28 is the coefficient, not the power. $^{28}C_2 = 378$." },
      ],
    },
    {
      type: "quiz",
      id: "pc4-4-q9",
      variant: "practice",
      question: "The coefficients of $x^2$ and $x^3$ in $(2 + ax)^6$ are equal, with $a \\ne 0$. What is $a$?",
      options: [
        { text: "$\\frac{3}{2}$", correct: true, feedback: "$^6C_2\\, 2^4 a^2 = {}^6C_3\\, 2^3 a^3$, i.e. $240a^2 = 160a^3$, so $a = \\frac{240}{160} = \\frac32$." },
        { text: "$\\frac{2}{3}$", feedback: "That is the ratio flipped. From $240a^2 = 160a^3$, divide by $160a^2$: $a = \\frac{240}{160}$." },
        { text: "$\\frac{3}{4}$", feedback: "That solves $15a^2 = 20a^3$ and forgets the powers of 2: $2^4$ for $x^2$ and $2^3$ for $x^3$." },
      ],
      hint: "Write the $x^2$ and $x^3$ coefficients from $T_{r+1} = {}^6C_r\\, 2^{6-r} a^r x^r$ and set them equal.",
    },
    {
      type: "quiz",
      id: "pc4-4-q10",
      variant: "practice",
      question: "What is the coefficient of $a^2bc$ in $(a + b + c)^4$?",
      options: [
        { text: "12", correct: true, feedback: "Choose which 2 brackets give $a$, which 1 gives $b$ and which 1 gives $c$: $\\frac{4!}{2!\\,1!\\,1!} = 12$." },
        { text: "6", feedback: "${}^4C_2$ only chooses the $a$-brackets. The other two brackets can then give $b, c$ or $c, b$: multiply by 2." },
        { text: "24", feedback: "$4!$ treats the two $a$-brackets as giving different letters. Swapping which of them supplies $a$ changes nothing: divide by $2!$." },
        { text: "15", feedback: "${}^6C_2 = 15$ is the number of **different terms** in $(a + b + c)^4$, not the coefficient of one of them." },
      ],
      hint: "A term is a word of 4 letters: two a's, one b, one c.",
    },
    {
      type: "quiz",
      id: "pc4-4-q11",
      variant: "practice",
      question: "What is the coefficient of $x^2y$ in $(x + y + 2)^5$?",
      options: [
        { text: "120", correct: true, feedback: "The five brackets give $x, x, y, 2, 2$: $\\frac{5!}{2!\\,1!\\,2!} = 30$ ways, each worth $2^2 = 4$. $30 \\times 4 = 120$." },
        { text: "30", feedback: "That counts the picks but forgets their value: the two brackets that give 2 contribute $2^2 = 4$." },
        { text: "10", feedback: "${}^5C_2$ only chooses the $x$-brackets. The remaining 3 brackets still have to split into one $y$ and two 2's." },
        { text: "0", feedback: "The powers $2 + 1 = 3$ fall short of 5, but the constant 2 fills the other two brackets. The term exists." },
      ],
      hint: "The constant 2 is the third 'letter'. How many brackets must supply it?",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "middle-and-greatest-terms",
  title: "4.5 · Middle Terms and the Largest Coefficient",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "Look along any row of Pascal's triangle: the numbers climb, peak in the middle, then fall back symmetrically. Row 10 is 1, 10, 45, 120, 210, **252**, 210, 120, 45, 10, 1. This lesson explains where the peak is and why, and then asks a harder question. When the terms carry extra numbers, like the 2 in $(1 + 2x)^{10}$, which term is actually the largest?",
    },
    {
      type: "interactive",
      config: {
        component: "pnc-pascal-triangle",
        mode: "highlight",
        pattern: "symmetry",
        rows: 12,
        initialCell: { n: 10, r: 5 },
        caption:
          "Row 10 with its centre entry ¹⁰C₅ = 252 selected. Set r to the middle of the row (n/2, or (n − 1)/2 for odd n): even rows have one central entry; in odd rows the selected entry and its mirror sit side by side and are equal, e.g. ¹¹C₅ = ¹¹C₆ = 462.",
      },
    },
    {
      type: "text",
      content:
        "**Why the middle is the peak.** Compare neighbours in row $n$:",
    },
    {
      type: "math",
      latex: "\\frac{{}^nC_{r+1}}{{}^nC_r} = \\frac{n!}{(r+1)!\\,(n-r-1)!} \\cdot \\frac{r!\\,(n-r)!}{n!} = \\frac{n - r}{r + 1}",
    },
    {
      type: "text",
      content:
        "The ratio is bigger than 1 exactly when $n - r > r + 1$, that is $r < \\dfrac{n-1}{2}$. So the entries grow up to the middle and shrink after it. For even $n$ the single largest is $^nC_{n/2}$. For odd $n$ there is a tie between $^nC_{(n-1)/2}$ and $^nC_{(n+1)/2}$, where the ratio is exactly 1.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Middle terms",
      content:
        "$(a + b)^n$ has $n + 1$ terms. If $n$ is **even**, there is one middle term, $T_{\\frac{n}{2}+1}$. If $n$ is **odd**, there are two, $T_{\\frac{n+1}{2}}$ and $T_{\\frac{n+3}{2}}$. The middle terms carry the largest binomial coefficient.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 — the middle term of $\\left(x - \\dfrac{2}{x}\\right)^{10}$.**\n\n1. $n = 10$ is even, so 11 terms and one middle term, $T_6$, with $r = 5$.\n2. $T_6 = {}^{10}C_5\\, x^5 \\left(-\\dfrac{2}{x}\\right)^5 = 252 \\cdot (-32) \\cdot x^5 x^{-5}$.\n3. $T_6 = -8064$. Here the middle term is also the term independent of $x$.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 — the middle terms of $(1 + x)^7$.**\n\n1. $n = 7$ is odd, so 8 terms and two middle terms, $T_4$ and $T_5$ ($r = 3$ and $r = 4$).\n2. $T_4 = {}^7C_3 x^3 = 35x^3$ and $T_5 = {}^7C_4 x^4 = 35x^4$.\n3. Equal coefficients, by symmetry.",
    },
    {
      type: "interactive",
      config: {
        component: "pnc-pascal-triangle",
        mode: "expansion",
        rows: 10,
        expansion: { a: "a", b: "x" },
        initialCell: { n: 7, r: 3 },
        caption: "(a + x)⁷ with T₄ = ⁷C₃ a⁴x³ selected. Put a = 1 to get (1 + x)⁷, where T₄ = 35x³. Move r to 4 to see its twin T₅ = 35x⁴.",
      },
    },
    {
      type: "text",
      content:
        "**The numerically greatest term.** Once $a$ and $b$ are numbers other than 1, the binomial coefficient is no longer the whole story. Use the same trick as above: compare each term with the one before it. In $(a + b)^n$,",
    },
    {
      type: "math",
      latex: "\\frac{T_{r+1}}{T_r} = \\frac{{}^nC_r\\, a^{n-r} b^r}{{}^nC_{r-1}\\, a^{n-r+1} b^{r-1}} = \\frac{n - r + 1}{r} \\cdot \\frac{b}{a}",
    },
    {
      type: "text",
      content:
        "Work with absolute values. While $\\left|\\dfrac{T_{r+1}}{T_r}\\right| > 1$ the terms are still growing. Find the **largest $r$ with $\\left|\\dfrac{T_{r+1}}{T_r}\\right| \\ge 1$**. Then $T_{r+1}$, not $T_r$, is the greatest term: the ratio says the step *into* $T_{r+1}$ was still a step up. If the ratio equals 1 exactly at that $r$, then $T_r$ and $T_{r+1}$ tie.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 — the greatest term of $(1 + 2x)^{10}$ at $x = \\frac12$.**\n\n1. $a = 1$, $b = 2x = 1$, so $\\dfrac{T_{r+1}}{T_r} = \\dfrac{11 - r}{r}$.\n2. $\\dfrac{11 - r}{r} \\ge 1 \\iff 11 \\ge 2r \\iff r \\le 5.5$, so $r = 5$ is the last step up.\n3. The greatest term is $T_6 = {}^{10}C_5 \\cdot 1^5 = 252$.\n\nAt $x = \\frac12$ every term is just $^{10}C_r$, so the peak is the middle, as the triangle said. The ratio test was not really needed here. The next example is one where it is.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 — the peak moves off-centre: $(1 + 3x)^8$ at $x = \\frac12$.**\n\n1. $a = 1$, $b = 3x = \\frac32$, so $\\dfrac{T_{r+1}}{T_r} = \\dfrac{9 - r}{r} \\cdot \\dfrac32$.\n2. $\\ge 1 \\iff 3(9 - r) \\ge 2r \\iff r \\le 5.4$, so the largest such $r$ is 5, and the greatest term is $T_6$.\n3. $T_6 = {}^8C_5 \\left(\\dfrac32\\right)^5 = 56 \\cdot \\dfrac{243}{32} = \\dfrac{1701}{4} = 425.25$.\n4. Compare: the middle term $T_5 = 70 \\cdot \\dfrac{81}{16} = 354.375$ and $T_7 = 28 \\cdot \\dfrac{729}{64} \\approx 318.94$ are both smaller.\n\nBecause $b > a$, the growing powers of $\\frac32$ pull the peak to the right of the middle.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 — a tie: the greatest term of $(3 + 2x)^9$ at $x = 1$.**\n\n1. $a = 3$, $b = 2$: $\\dfrac{T_{r+1}}{T_r} = \\dfrac{10 - r}{r} \\cdot \\dfrac{2}{3}$.\n2. $\\ge 1 \\iff 2(10 - r) \\ge 3r \\iff r \\le 4$, with **equality** at $r = 4$.\n3. So $T_5 = T_4$, and both are the greatest: $T_4 = {}^9C_3 \\cdot 3^6 \\cdot 2^3 = 84 \\cdot 729 \\cdot 8 = 489888$, and $T_5 = {}^9C_4 \\cdot 3^5 \\cdot 2^4 = 126 \\cdot 243 \\cdot 16 = 489888$.\n4. Check the neighbours: $T_3 = 314928$ and $T_6 = 326592$, both smaller.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the largest coefficient is always the middle one\"",
      content:
        "That holds only for the **binomial coefficients** $^nC_r$. The coefficients of $(1 + 2x)^{10}$ are $^{10}C_r\\, 2^r$, and the growing $2^r$ pushes the peak to the right. Ratio: $\\dfrac{11 - r}{r} \\cdot 2 \\ge 1 \\iff r \\le 7$, so the ratio is $\\ge 1$ up to $r = 7$ and $T_8$, the $x^7$ term, is the largest. Its coefficient is $^{10}C_7 \\cdot 2^7 = 120 \\cdot 128 = 15360$. (Not $T_7$: the last step up is the step *into* $T_8$.) The middle coefficient is only $^{10}C_5 \\cdot 2^5 = 8064$.",
    },
    {
      type: "text",
      content:
        "**Running the ratio backwards.** The neighbour ratio $\\dfrac{{}^nC_r}{{}^nC_{r-1}} = \\dfrac{n - r + 1}{r}$ also works in reverse: given ratios of coefficients, it finds $n$ and $r$.\n\n**Worked example 6 — three consecutive coefficients.** Three consecutive coefficients of $(1 + x)^n$ are in the ratio $1 : 3 : 5$. Find $n$.\n\n1. Call them $^nC_{r-1}$, $^nC_r$, $^nC_{r+1}$.\n2. First ratio: $\\dfrac{{}^nC_r}{{}^nC_{r-1}} = \\dfrac{n - r + 1}{r} = 3$, so $n + 1 = 4r$.\n3. Second ratio: $\\dfrac{{}^nC_{r+1}}{{}^nC_r} = \\dfrac{n - r}{r + 1} = \\dfrac{5}{3}$, so $3n - 3r = 5r + 5$, that is $3n = 8r + 5$.\n4. Substitute $n = 4r - 1$: $12r - 3 = 8r + 5$, so $r = 2$ and $n = 7$.\n5. Check: $^7C_1, {}^7C_2, {}^7C_3 = 7, 21, 35$, which is $1 : 3 : 5$. ✓",
    },
    {
      type: "text",
      content:
        "**Worked example 7 — a real-world greatest term: the most likely number of sixes.** Roll a fair die 10 times. Which number of sixes is most likely?\n\n1. Expand $\\left(\\dfrac56 + \\dfrac16\\right)^{10} = 1$. The term $^{10}C_r \\left(\\dfrac56\\right)^{10-r} \\left(\\dfrac16\\right)^r$ is the chance of exactly $r$ sixes: choose which $r$ rolls are sixes, then multiply the chances.\n   *Why this step:* the chances for $r = 0, 1, \\dots, 10$ are exactly the terms of a binomial expansion, so \"most likely\" means \"greatest term\".\n2. Ratio with $a = \\dfrac56$, $b = \\dfrac16$: $\\dfrac{T_{r+1}}{T_r} = \\dfrac{11 - r}{r} \\cdot \\dfrac{1/6}{5/6} = \\dfrac{11 - r}{5r}$.\n3. $\\dfrac{11 - r}{5r} \\ge 1 \\iff 11 \\ge 6r \\iff r \\le 1.83$, so $r = 1$ is the last step up and the greatest term is $T_2$: **exactly one six**.\n   *Why this step:* $T_{r+1}$ corresponds to $r$ sixes, so $T_2$ means 1 six. The off-by-one trap applies here too.\n4. Check: the chances of 0, 1 and 2 sixes are about $0.162$, $0.323$ and $0.291$.\n\nThe peak sits near $10 \\times \\dfrac16 \\approx 1.7$, the average number of sixes, and not in the middle of the row.",
    },
    {
      type: "text",
      content:
        "**Worked example 8 — JEE style: the greatest term of $(2 + 3x)^9$ at $x = \\frac32$.**\n\n1. $a = 2$, $b = 3x = \\dfrac92$, so $\\left|\\dfrac{b}{a}\\right| = \\dfrac94$ and $\\dfrac{T_{r+1}}{T_r} = \\dfrac{10 - r}{r} \\cdot \\dfrac94$.\n   *Why this step:* put the number in for $x$ **before** comparing. The size of $b/a$ decides how far the peak moves.\n2. $\\dfrac{9(10 - r)}{4r} \\ge 1 \\iff 90 \\ge 13r \\iff r \\le 6.92$, so $r = 6$ is the last step up and the greatest term is $T_7$.\n3. $T_7 = {}^9C_6 \\cdot 2^3 \\cdot \\left(\\dfrac92\\right)^6 = 84 \\cdot 8 \\cdot \\dfrac{531441}{64} = \\dfrac{7 \\cdot 3^{13}}{2} = 5580130.5$.\n   *Why this step:* the inequality gave no equality at a whole number, so there is a single greatest term and no tie.\n4. Sanity check: $\\dfrac{T_8}{T_7} = \\dfrac{3}{7} \\cdot \\dfrac94 = \\dfrac{27}{28} < 1$, so $T_8$ is only slightly smaller. The peak is far to the right of the middle terms $T_5, T_6$.",
    },
    {
      type: "math",
      latex: "\\frac{T_{r+1}}{T_r} = \\frac{10-r}{r}\\cdot\\frac{9}{4} \\ge 1 \\iff r \\le \\frac{90}{13} \\;\\Rightarrow\\; T_7 = {}^9C_6\\,2^3\\left(\\tfrac92\\right)^6 = \\frac{7 \\cdot 3^{13}}{2}",
    },
    {
      type: "table",
      headers: ["Question", "Tool"],
      rows: [
        ["Middle term(s)", "$n$ even: $T_{n/2+1}$. $n$ odd: $T_{(n+1)/2}$ and $T_{(n+3)/2}$"],
        ["Largest binomial coefficient $^nC_r$", "The middle: $^nC_{\\lfloor n/2 \\rfloor}$"],
        ["Largest term or coefficient with numbers inside", "Ratio $\\left|\\frac{T_{r+1}}{T_r}\\right| = \\frac{n-r+1}{r}\\left|\\frac{b}{a}\\right| \\ge 1$"],
      ],
    },
    {
      type: "quiz",
      id: "pc4-5-q1",
      variant: "practice",
      question: "How many middle terms does $(a + b)^{11}$ have, and which are they?",
      options: [
        { text: "Two: $T_6$ and $T_7$", correct: true, feedback: "12 terms, so the middle pair is the 6th and 7th ($r = 5$ and $r = 6$)." },
        { text: "One: $T_6$", feedback: "With 12 terms there is no single centre term. Odd $n$ gives two middle terms." },
        { text: "Two: $T_5$ and $T_6$", feedback: "That is one step too early: the middle of 12 terms is the 6th and 7th." },
      ],
    },
    {
      type: "quiz",
      id: "pc4-5-q2",
      variant: "practice",
      question: "What is the middle term of $\\left(x + \\dfrac{1}{x}\\right)^8$?",
      options: [
        { text: "$56x^2$", feedback: "That is $T_4$ ($r = 3$). With 9 terms the middle is the 5th." },
        { text: "$70x^4$", feedback: "The $x^4$ from $a$ cancels against $\\left(\\frac1x\\right)^4$ from $b$." },
        { text: "70", correct: true, feedback: "$T_5$ ($r = 4$): $^8C_4\\, x^4 x^{-4} = 70$." },
      ],
    },
    {
      type: "quiz",
      id: "pc4-5-q3",
      variant: "practice",
      question: "What is the greatest binomial coefficient in the expansion of $(a + b)^{12}$?",
      options: [
        { text: "792", feedback: "That is $^{12}C_5$, one step short of the middle." },
        { text: "924", correct: true, feedback: "$n = 12$ is even, so the peak is $^{12}C_6 = 924$." },
        { text: "4096", feedback: "That is $2^{12}$, the sum of the whole row, not its largest entry." },
      ],
    },
    {
      type: "quiz",
      id: "pc4-5-q4",
      variant: "concept",
      question: "Which power of $x$ has the largest coefficient in $(1 + 2x)^{10}$?",
      options: [
        { text: "$x^5$, the middle term", feedback: "Only the plain binomial coefficients peak in the middle. $^{10}C_5 \\cdot 2^5 = 8064 < 15360$." },
        { text: "$x^7$, with coefficient $^{10}C_7 \\cdot 2^7 = 15360$", correct: true, feedback: "The ratio $\\frac{11-r}{r}\\cdot 2 \\ge 1$ holds up to $r = 7$. The factor $2^r$ pushes the peak right of centre." },
        { text: "$x^{10}$, since $2^{10}$ is the largest power of 2", feedback: "$2^{10} = 1024$ is the whole coefficient of $x^{10}$, because $^{10}C_{10} = 1$. Much smaller." },
      ],
      hint: "Find when $\\frac{T_{r+1}}{T_r} = \\frac{11 - r}{r} \\cdot 2$ drops below 1.",
    },
    {
      type: "quiz",
      id: "pc4-5-q5",
      variant: "practice",
      question: "What are the middle terms of $(1 + x)^9$?",
      options: [
        { text: "$84x^3$ and $126x^4$", feedback: "That is $T_4$ and $T_5$, one step too early. 10 terms, so the middle pair is the 5th and 6th." },
        { text: "$252x^5$", feedback: "That is the middle of row 10. Row 9 has an even number of entries, so it has two middle terms." },
        { text: "$126x^4$ and $126x^5$", correct: true, feedback: "$T_5$ and $T_6$: $^9C_4 x^4$ and $^9C_5 x^5$, equal coefficients by symmetry." },
      ],
    },
    {
      type: "quiz",
      id: "pc4-5-q6",
      variant: "practice",
      question: "What is the numerically greatest term of $(1 + 3x)^8$ at $x = \\frac12$?",
      options: [
        { text: "$T_6 = {}^8C_5 \\left(\\frac32\\right)^5 = 425.25$", correct: true, feedback: "$\\frac{9 - r}{r} \\cdot \\frac32 \\ge 1 \\iff r \\le 5.4$. The largest such $r$ is 5, so the greatest term is $T_{r+1} = T_6$." },
        { text: "$T_5 = {}^8C_4 \\left(\\frac32\\right)^4 = 354.375$", feedback: "That is the middle term. Because $b = \\frac32 > a = 1$, the peak moves right of centre." },
        { text: "$T_7 = {}^8C_6 \\left(\\frac32\\right)^6 \\approx 318.94$", feedback: "Too far: at $r = 6$ the ratio is $\\frac{3}{6} \\cdot \\frac32 = 0.75 < 1$, so $T_7$ is already smaller than $T_6$." },
        { text: "$70$", feedback: "That is $^8C_4$, the largest binomial coefficient. Each term also carries a power of $\\frac32$." },
      ],
      hint: "Solve $\\frac{9 - r}{r} \\cdot \\frac{3}{2} \\ge 1$ for the largest whole $r$; the greatest term is then $T_{r+1}$.",
    },
    {
      type: "quiz",
      id: "pc4-5-q7",
      variant: "practice",
      question: "Three consecutive coefficients of $(1 + x)^n$ are $45$, $120$ and $210$. What is $n$?",
      options: [
        { text: "9", feedback: "Row 9 is 1 9 36 84 126 … It contains none of 45, 120, 210." },
        { text: "11", feedback: "Row 11 has 55, 165, 330 in those places. Solve the two ratio equations together." },
        { text: "10", correct: true, feedback: "$\\frac{n - r + 1}{r} = \\frac{120}{45} = \\frac83$ and $\\frac{n - r}{r + 1} = \\frac{210}{120} = \\frac74$ give $n = 10$, $r = 3$. Indeed $^{10}C_2, {}^{10}C_3, {}^{10}C_4 = 45, 120, 210$." },
        { text: "12", feedback: "Row 12 has 66, 220, 495 there. Set up $\\frac{n - r + 1}{r} = \\frac83$ and $\\frac{n - r}{r + 1} = \\frac74$." },
      ],
      hint: "Divide neighbours: $\\frac{{}^nC_r}{{}^nC_{r-1}} = \\frac{n - r + 1}{r}$. Two ratios give two equations in $n$ and $r$.",
    },
    {
      type: "quiz",
      id: "pc4-5-q8",
      variant: "practice",
      question: "A fair die is rolled 12 times. Using the greatest term of $\\left(\\frac56 + \\frac16\\right)^{12}$, which number of sixes is most likely?",
      options: [
        { text: "6, the middle of the row", feedback: "The middle wins only when $a = b$. Here $\\frac{b}{a} = \\frac15$, which drags the peak far to the left." },
        { text: "1", feedback: "At $r = 2$ the ratio is $\\frac{11}{2} \\cdot \\frac15 = 1.1 > 1$, so 2 sixes are still more likely than 1." },
        { text: "2", correct: true, feedback: "$\\frac{13 - r}{r} \\cdot \\frac15 \\ge 1 \\iff r \\le \\frac{13}{6} \\approx 2.17$. The last step up is into $T_3$, which is 2 sixes." },
        { text: "3", feedback: "At $r = 3$ the ratio is $\\frac{10}{3} \\cdot \\frac15 = \\frac23 < 1$, so 3 sixes are less likely than 2." },
      ],
      hint: "$\\frac{T_{r+1}}{T_r} = \\frac{13 - r}{r} \\cdot \\frac{1/6}{5/6}$. And $T_{r+1}$ means $r$ sixes.",
    },
    {
      type: "quiz",
      id: "pc4-5-q9",
      variant: "practice",
      question: "What is the greatest term in the expansion of $(1 + 2x)^9$ at $x = 1$?",
      options: [
        { text: "$T_6 = {}^9C_5 \\cdot 2^5 = 4032$", feedback: "The ratio into $T_7$ is $\\frac{4}{6} \\cdot 2 = \\frac43 > 1$, so $T_7$ is bigger still." },
        { text: "$T_7 = {}^9C_6 \\cdot 2^6 = 5376$", correct: true, feedback: "$\\frac{10 - r}{r} \\cdot 2 \\ge 1 \\iff r \\le \\frac{20}{3} \\approx 6.67$, so $r = 6$ and the greatest term is $T_7 = 84 \\cdot 64 = 5376$." },
        { text: "$T_8 = {}^9C_7 \\cdot 2^7 = 4608$", feedback: "One step too far: the ratio into $T_8$ is $\\frac{3}{7} \\cdot 2 = \\frac67 < 1$." },
        { text: "$T_5 = {}^9C_4 \\cdot 2^4 = 2016$", feedback: "That is a middle term. The factor $2^r$ pushes the peak right of centre." },
      ],
      hint: "Find the largest whole $r$ with $\\frac{10 - r}{r} \\cdot 2 \\ge 1$; the greatest term is $T_{r+1}$.",
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "chapter-4-mastery",
  title: "4.6 · Chapter 4 Mastery",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "One idea runs through this whole chapter. The number $^nC_r$ counts ways to choose $r$ positions out of $n$. The positions might be bounces on the triangle, moves on a grid, or brackets supplying $b$. These questions mix every skill: reading the triangle, a single term, a coefficient with signs, the term independent of $x$, middle terms, the greatest coefficient, and the off-by-one trap.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Checklist before you answer",
      content:
        "1. Write $T_{r+1} = {}^nC_r a^{n-r} b^r$ with the real $a$ and $b$, signs included. 2. Get the power of $x$ in terms of $r$ and solve. 3. The $k$-th term uses $r = k - 1$. 4. Raise the numbers inside $a$ and $b$ to their powers too.",
    },
    {
      type: "quiz",
      id: "pc4-6-q1",
      variant: "mastery",
      question: "What is the coefficient of $x^4$ in $(x + 3)^7$?",
      options: [
        { text: "2835", feedback: "That uses $r = 4$, i.e. $3^4$. But $r$ counts the 3's, and $x^4$ leaves $7 - 4 = 3$ of them." },
        { text: "945", correct: true, feedback: "$x^4$ means $7 - r = 4$, so $r = 3$: $^7C_3 \\cdot 3^3 = 35 \\cdot 27 = 945$." },
        { text: "35", feedback: "That is $^7C_3$ alone. The three 3's contribute $3^3 = 27$." },
        { text: "189", feedback: "That is $7 \\cdot 27$. The coefficient is $^7C_3 = 35$, not 7." },
      ],
    },
    {
      type: "quiz",
      id: "pc4-6-q2",
      variant: "mastery",
      question: "What is the term independent of $x$ in $\\left(x - \\dfrac{1}{x^2}\\right)^9$?",
      options: [
        { text: "$84$", feedback: "Three factors of $-\\frac{1}{x^2}$ make the term negative." },
        { text: "$126$", feedback: "That is $^9C_4$. Solve $9 - 3r = 0$ for $r$." },
        { text: "There is no such term.", feedback: "$9 - 3r = 0$ gives $r = 3$, a whole number, so the term exists." },
        { text: "$-84$", correct: true, feedback: "Power: $(9 - r) - 2r = 9 - 3r = 0$, so $r = 3$: $^9C_3 (-1)^3 = -84$." },
      ],
      hint: "Each factor $\\frac{1}{x^2}$ contributes $x^{-2}$.",
    },
    {
      type: "quiz",
      id: "pc4-6-q3",
      variant: "mastery",
      question: "What is the 6th term of $(2 + x)^8$?",
      options: [
        { text: "$112x^6$", feedback: "That is $^8C_6 \\cdot 2^2 x^6 = T_7$. The off-by-one trap: $T_{r+1}$ uses $^nC_r$." },
        { text: "$448x^5$", correct: true, feedback: "$T_6$ means $r = 5$: $^8C_5 \\cdot 2^3 \\cdot x^5 = 56 \\cdot 8\\, x^5 = 448x^5$." },
        { text: "$56x^5$", feedback: "The 2 in $a = 2$ is raised to $8 - 5 = 3$: multiply by 8." },
        { text: "$1792x^3$", feedback: "That is $^8C_5 \\cdot 2^5 x^3$, which swaps the roles of $a$ and $b$." },
      ],
    },
    {
      type: "quiz",
      id: "pc4-6-q4",
      variant: "mastery",
      question: "What is the middle term of $\\left(x + \\dfrac{2}{x}\\right)^6$?",
      options: [
        { text: "160", correct: true, feedback: "7 terms, so the middle is $T_4$ ($r = 3$): $^6C_3 \\cdot 2^3 \\cdot x^3 x^{-3} = 20 \\cdot 8 = 160$." },
        { text: "20", feedback: "That is $^6C_3$ alone. The factor $2^3 = 8$ comes from $\\left(\\frac{2}{x}\\right)^3$." },
        { text: "$240x^{-2}$", feedback: "That is $T_5$ ($r = 4$): $^6C_4 \\cdot 2^4 x^{-2}$, one step past the middle." },
      ],
    },
    {
      type: "quiz",
      id: "pc4-6-q5",
      variant: "mastery",
      question: "Evaluate $^3C_3 + {}^4C_3 + {}^5C_3 + {}^6C_3 + {}^7C_3$.",
      options: [
        { text: "56", feedback: "That is $^8C_3$. The blade moves one column right: $^{n+1}C_{r+1}$." },
        { text: "35", feedback: "That is just the last term, $^7C_3$." },
        { text: "70", correct: true, feedback: "Hockey stick: $^8C_4 = 70$. Check: $1 + 4 + 10 + 20 + 35 = 70$." },
      ],
    },
    {
      type: "quiz",
      id: "pc4-6-q6",
      variant: "mastery",
      question: "What is the coefficient of $x^2y^3$ in $(2x - y)^5$?",
      options: [
        { text: "$40$", feedback: "Three factors of $-y$ give a negative sign." },
        { text: "$-80$", feedback: "That uses $2^3$. The 2 goes with $x$, whose power is 2." },
        { text: "$-10$", feedback: "The $2x$ contributes $2^2 = 4$ as well." },
        { text: "$-40$", correct: true, feedback: "$r = 3$ factors of $-y$: $^5C_3 \\cdot 2^2 \\cdot (-1)^3 = 10 \\cdot 4 \\cdot (-1) = -40$." },
      ],
    },
    {
      type: "quiz",
      id: "pc4-6-q7",
      variant: "mastery",
      question: "How many shortest grid routes from $(0,0)$ to $(5,3)$ pass through $(2,1)$?",
      options: [
        { text: "13", feedback: "That adds the legs. Each first leg pairs with every second leg, so multiply." },
        { text: "30", correct: true, feedback: "Leg 1: 2 R's, 1 U: $^3C_1 = 3$. Leg 2: 3 R's, 2 U's: $^5C_2 = 10$. Product: $30$." },
        { text: "56", feedback: "That is every route, $^8C_3 = 56$, including those that miss $(2,1)$." },
      ],
    },
    {
      type: "quiz",
      id: "pc4-6-q8",
      variant: "mastery",
      question: "Which statement is true?",
      options: [
        { text: "$(a + b)^5 = a^5 + b^5$ whenever $a$ and $b$ are positive.", feedback: "Test $a = b = 1$: $32 \\ne 2$. The mixed picks are missing." },
        { text: "Row 5 of Pascal's triangle read as digits gives $11^5$.", feedback: "Gluing 1 5 10 10 5 1 gives 15101051, but $11^5 = 161051$. The entries of 10 carry." },
        { text: "The sum of the coefficients of $(3x - 1)^5$ is 32.", correct: true, feedback: "Put $x = 1$: $(3 - 1)^5 = 2^5 = 32$." },
        { text: "The largest coefficient of $(1 + 2x)^{10}$ belongs to the middle term.", feedback: "The factor $2^r$ moves the peak to $x^7$ (coefficient 15360)." },
      ],
    },
    {
      type: "quiz",
      id: "pc4-6-q9",
      variant: "mastery",
      question: "Which power(s) of $x$ have the largest coefficient in $(1 + 2x)^8$?",
      options: [
        { text: "$x^5$ and $x^6$, tied at 1792", correct: true, feedback: "$\\frac{9 - r}{r} \\cdot 2 \\ge 1 \\iff r \\le 6$, with equality at $r = 6$. So $^8C_5 \\cdot 2^5 = 56 \\cdot 32$ and $^8C_6 \\cdot 2^6 = 28 \\cdot 64$ are both 1792." },
        { text: "$x^6$ only, 1792", feedback: "The ratio is exactly 1 at $r = 6$, so the $x^6$ coefficient equals the $x^5$ coefficient: a tie." },
        { text: "$x^4$, the middle term, 1120", feedback: "$^8C_4 \\cdot 2^4 = 1120$. The factor $2^r$ pushes the peak right of centre." },
        { text: "$x^8$, 256", feedback: "$2^8 = 256$ is the whole coefficient of $x^8$, since $^8C_8 = 1$. Much smaller." },
      ],
      hint: "Coefficient ratio: $\\frac{{}^8C_r 2^r}{{}^8C_{r-1} 2^{r-1}} = \\frac{9 - r}{r} \\cdot 2$. What happens when it equals 1 exactly?",
    },
    {
      type: "quiz",
      id: "pc4-6-q10",
      variant: "mastery",
      question: "What are the middle terms of $(2x - 1)^7$?",
      options: [
        { text: "$560x^4$ and $-280x^3$", feedback: "The signs are swapped. $T_4$ has $r = 3$ factors of $-1$ (negative), $T_5$ has 4 (positive)." },
        { text: "$-35x^4$ and $35x^3$", feedback: "The 2 in $a = 2x$ is raised to the power too: $2^4 = 16$ and $2^3 = 8$." },
        { text: "$-560x^4$ and $280x^3$", correct: true, feedback: "8 terms, so $T_4$ and $T_5$. $T_4 = {}^7C_3 (2x)^4 (-1)^3 = -560x^4$ and $T_5 = {}^7C_4 (2x)^3 (-1)^4 = 280x^3$." },
        { text: "$-560x^4$ only", feedback: "$n = 7$ is odd, so there are 8 terms and two middle terms." },
      ],
    },
    {
      type: "quiz",
      id: "pc4-6-q11",
      variant: "mastery",
      question: "If $^nC_9 = {}^nC_7$, what is $^nC_2$?",
      options: [
        { text: "240", feedback: "That is $16 \\cdot 15$ without dividing by $2!$." },
        { text: "105", feedback: "That is $^{15}C_2$. Equal entries at positions 9 and 7 are mirrors, so $n = 9 + 7 = 16$." },
        { text: "120", correct: true, feedback: "Mirror positions add to $n$: $n = 16$. Then $^{16}C_2 = \\frac{16 \\cdot 15}{2} = 120$." },
        { text: "No such $n$ exists.", feedback: "Different positions in a row can hold equal entries when they are mirror images: $^{16}C_7 = {}^{16}C_9$." },
      ],
    },
    {
      type: "quiz",
      id: "pc4-6-q12",
      variant: "mastery",
      question: "What is the largest number that divides $3^{2n+2} - 8n - 9$ for every positive integer $n$?",
      options: [
        { text: "8", feedback: "8 does always divide it, but so does something larger. $3^{2n+2} = 9^{n+1} = (1 + 8)^{n+1}$, and every term from $r = 2$ has $8^2$." },
        { text: "64", correct: true, feedback: "$(1 + 8)^{n+1} - 8n - 9 = 64\\left[{}^{n+1}C_2 + 8\\,{}^{n+1}C_3 + \\cdots\\right]$, and $n = 1$ gives exactly 64, so nothing larger works." },
        { text: "128", feedback: "Test $n = 1$: $81 - 8 - 9 = 64$, which 128 does not divide." },
        { text: "81", feedback: "Test $n = 1$: the value is 64, and 81 does not divide 64." },
      ],
      hint: "Rewrite $3^{2n+2}$ as a power of 9, then split 9 as $1 + 8$.",
    },
  ]),
};

export const pncChapter4Lessons: LessonSeed[] = [lesson01, lesson02, lesson03, lesson04, lesson05, lesson06];
