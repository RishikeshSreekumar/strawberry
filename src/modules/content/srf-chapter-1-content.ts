import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Sets, Relations and Functions Chapter 1 — Set Operations and Counting.
 * Every operation is a choice of Venn regions: union, intersection,
 * difference, complement and symmetric difference. The laws of set algebra
 * are proved by element-chasing and by regions, then the region picture
 * turns into inclusion–exclusion counting for two and three sets, survey
 * problems and bounds on overlaps.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "union-and-intersection",
  title: "1.1 · Union and Intersection",
  position: 1,
  blocks: blocks([
    {
      type: "text",
      content:
        "A school has a chess club $C = \\{\\text{Asha}, \\text{Ben}, \\text{Chen}, \\text{Dev}\\}$ and a quiz club $Q = \\{\\text{Chen}, \\text{Dev}, \\text{Ella}\\}$. The principal asks two different questions. \"Who is in **some** club?\" gets five names. \"Who is in **both** clubs?\" gets two names, Chen and Dev. These two questions are the two most basic ways of combining sets, and every later operation is built from them.",
    },
    { type: "heading", text: "Union: everything in either set" },
    {
      type: "callout",
      variant: "definition",
      title: "Union",
      content:
        "$A \\cup B = \\{x : x \\in A \\text{ or } x \\in B\\}$.\nThe \"or\" is **inclusive**: an element in both sets belongs to the union (once). In a Venn diagram the union is everything inside at least one circle.",
    },
    {
      type: "text",
      content:
        "For the clubs, $C \\cup Q = \\{\\text{Asha}, \\text{Ben}, \\text{Chen}, \\text{Dev}, \\text{Ella}\\}$. Chen and Dev are listed once, because a set never repeats an element.",
    },
    { type: "heading", text: "Intersection: what the sets share" },
    {
      type: "callout",
      variant: "definition",
      title: "Intersection and disjoint sets",
      content:
        "$A \\cap B = \\{x : x \\in A \\text{ and } x \\in B\\}$, the overlap of the two circles.\nIf $A \\cap B = \\varnothing$ the sets are **disjoint**: their circles do not overlap at all.",
    },
    {
      type: "text",
      content:
        "For the clubs, $C \\cap Q = \\{\\text{Chen}, \\text{Dev}\\}$. The set of even numbers and the set of odd numbers are disjoint; so are $\\{1, 2\\}$ and $\\{3, 4\\}$. Try the four basic shadings below and notice how each one is a choice of regions.",
    },
    {
      type: "interactive",
      config: {
        component: "srf-venn-diagram",
        sets: 2,
        expressions: [
          { expr: "A", latex: "A" },
          { expr: "B", latex: "B" },
          { expr: "A|B", latex: "A \\cup B" },
          { expr: "A&B", latex: "A \\cap B" },
        ],
        initialExpression: 2,
        caption:
          "A two-set diagram has four regions: $A$ only, both, $B$ only, and outside. $A \\cup B$ is three of them, $A \\cap B$ just one. Click regions to shade your own choice.",
      },
    },
    { type: "heading", text: "Computing unions and intersections" },
    {
      type: "worked-example",
      id: "srf1-1-we1",
      title: "Worked example 1: finite sets",
      problem: "Let $A = \\{1, 2, 3, 4, 6\\}$ and $B = \\{2, 4, 6, 8\\}$. Find $A \\cup B$ and $A \\cap B$.",
      steps: [
        { text: "Union: list every element of $A$, then add the elements of $B$ not yet listed (only 8 is new)." },
        { latex: "A \\cup B = \\{1, 2, 3, 4, 6, 8\\}" },
        { text: "Intersection: keep the elements of $A$ that also appear in $B$." },
        { latex: "A \\cap B = \\{2, 4, 6\\}" },
      ],
      answer: "$A \\cup B = \\{1, 2, 3, 4, 6, 8\\}$, $A \\cap B = \\{2, 4, 6\\}$.",
    },
    {
      type: "worked-example",
      id: "srf1-1-we2",
      title: "Worked example 2: intervals",
      problem: "Let $A = [-1, 3)$ and $B = (1, 5]$. Find $A \\cup B$ and $A \\cap B$.",
      steps: [
        { text: "Draw both on one number line. $A$ runs from $-1$ (included) to 3 (excluded); $B$ from 1 (excluded) to 5 (included)." },
        { text: "The union runs from the leftmost start to the rightmost end. The two intervals overlap, so there is no gap. Endpoint $-1$ is in $A$, endpoint 5 is in $B$." },
        { latex: "A \\cup B = [-1, 5]" },
        { text: "The intersection runs from the later start to the earlier end. *Why this step:* a point must clear **both** left endpoints and stay under **both** right endpoints. 1 is excluded (not in $B$) and 3 is excluded (not in $A$)." },
        { latex: "A \\cap B = (1, 3)" },
      ],
      answer: "$A \\cup B = [-1, 5]$ and $A \\cap B = (1, 3)$.",
    },
    { type: "heading", text: "The laws of union and intersection" },
    {
      type: "table",
      headers: ["Law", "Union", "Intersection"],
      rows: [
        ["Commutative", "$A \\cup B = B \\cup A$", "$A \\cap B = B \\cap A$"],
        ["Associative", "$(A \\cup B) \\cup C = A \\cup (B \\cup C)$", "$(A \\cap B) \\cap C = A \\cap (B \\cap C)$"],
        ["Idempotent", "$A \\cup A = A$", "$A \\cap A = A$"],
        ["Identity", "$A \\cup \\varnothing = A$", "$A \\cap U = A$"],
        ["Domination", "$A \\cup U = U$", "$A \\cap \\varnothing = \\varnothing$"],
        ["Absorption", "$A \\cup (A \\cap B) = A$", "$A \\cap (A \\cup B) = A$"],
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Three ways to say \"A is inside B\"",
      content:
        "$A \\subseteq B \\iff A \\cup B = B \\iff A \\cap B = A$.\nIf the circle for $A$ sits inside the circle for $B$, joining them adds nothing to $B$, and overlapping them leaves all of $A$. JEE questions often disguise a subset condition in one of these forms.",
    },
    {
      type: "worked-example",
      id: "srf1-1-we3",
      title: "Worked example 3: when union equals intersection",
      problem: "Show that if $A \\cup B = A \\cap B$, then $A = B$.",
      steps: [
        { text: "Always $A \\subseteq A \\cup B$ and $A \\cap B \\subseteq B$." },
        { text: "Chain them through the given equality:", latex: "A \\subseteq A \\cup B = A \\cap B \\subseteq B" },
        { text: "So $A \\subseteq B$. Swapping the roles of $A$ and $B$ in the same chain gives $B \\subseteq A$." },
        { text: "Two sets each contained in the other are equal." },
      ],
      answer: "$A \\subseteq B$ and $B \\subseteq A$, so $A = B$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"union means elements in exactly one of the sets\"",
      content:
        "Mathematical \"or\" is inclusive. Chen is in both clubs and is certainly in $C \\cup Q$. The set of elements in exactly one of the sets is a different operation, the symmetric difference, which comes in the next lesson.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the union has as many elements as the two sets together\"",
      content:
        "$n(C) + n(Q) = 4 + 3 = 7$, but $n(C \\cup Q) = 5$: Chen and Dev were counted twice. Only for disjoint sets is $n(A \\cup B) = n(A) + n(B)$. Lesson 1.4 turns this correction into a formula.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "srf1-1-q1",
      variant: "practice",
      question: "Let $A = \\{a, b, c\\}$ and $B = \\{c, d\\}$. Which set is $A \\cup B$?",
      options: [
        { text: "$\\{a, b, c, d\\}$", correct: true, feedback: "Every element of either set, each listed once." },
        { text: "$\\{a, b\\}$", feedback: "That is $A - B$: it removes $c$, which belongs to both sets and so certainly to the union." },
        { text: "$\\{c\\}$", feedback: "That is the intersection: what the sets share." },
        { text: "$\\{a, b, d\\}$", feedback: "That leaves out $c$, which is in both sets. Union is inclusive." },
      ],
      hint: "Union collects everything in at least one of the sets.",
    },
    {
      type: "numeric",
      id: "srf1-1-q2",
      variant: "practice",
      question:
        "$A = \\{x \\in \\mathbb{N} : x \\le 10,\\ x \\text{ even}\\}$ and $B = \\{x \\in \\mathbb{N} : x \\le 10,\\ x \\text{ a multiple of } 3\\}$. Find $n(A \\cup B)$.",
      answer: 7,
      hint: "List both sets, then merge them without repeating 6.",
      solution:
        "$A = \\{2, 4, 6, 8, 10\\}$ and $B = \\{3, 6, 9\\}$. Merging: $A \\cup B = \\{2, 3, 4, 6, 8, 9, 10\\}$, so $n(A \\cup B) = 7$.",
      commonMistakes: [
        { answer: 8, feedback: "You counted 6 twice. It is in both sets but appears once in the union." },
        { answer: 1, feedback: "That is $n(A \\cap B)$: only 6 is shared." },
      ],
    },
    {
      type: "quiz",
      id: "srf1-1-q3",
      variant: "concept",
      question: "For sets $A$ and $B$, it is given that $A \\cap B = A$. What can you conclude?",
      options: [
        { text: "$A \\subseteq B$", correct: true, feedback: "Every element of $A$ survives the intersection, so every element of $A$ is in $B$." },
        { text: "$B \\subseteq A$", feedback: "The other way round. $A \\cap B = B$ would give $B \\subseteq A$." },
        { text: "$A = B$", feedback: "Too strong: $A = \\{1\\}$, $B = \\{1, 2\\}$ satisfies $A \\cap B = A$ with $A \\ne B$." },
        { text: "$A = \\varnothing$", feedback: "Possible, but not forced: $A = \\{1\\}$, $B = \\{1, 2\\}$ also works." },
      ],
      hint: "If intersecting with $B$ removes nothing from $A$, where must every element of $A$ already be?",
    },
    {
      type: "quiz",
      id: "srf1-1-q4",
      variant: "practice",
      multiple: true,
      question: "Which of the following hold for **all** sets $A$ and $B$? Select all that apply.",
      options: [
        { text: "$A \\cap B \\subseteq A$", correct: true, feedback: "Anything in both sets is in particular in $A$." },
        { text: "$A \\subseteq A \\cup B$", correct: true, feedback: "Every element of $A$ is in $A$ or $B$." },
        { text: "$A \\cup B \\subseteq A$", feedback: "Fails whenever $B$ has an element outside $A$, e.g. $A = \\{1\\}$, $B = \\{2\\}$." },
        { text: "$A \\cap (A \\cup B) = A$", correct: true, feedback: "Absorption: $A \\subseteq A \\cup B$, so intersecting with it leaves $A$ unchanged." },
      ],
      hint: "Test each statement on $A = \\{1\\}$, $B = \\{2\\}$, then think about why the true ones always hold.",
    },
    {
      type: "numeric",
      id: "srf1-1-q5",
      variant: "practice",
      question: "Let $A = [-2, 5)$ and $B = (0, 8]$. How many integers lie in $A \\cap B$?",
      answer: 4,
      hint: "Find the intersection interval first: later start, earlier end, with the right endpoint types.",
      solution: "$A \\cap B = (0, 5)$: 0 is excluded (not in $B$) and 5 is excluded (not in $A$). The integers in it are 1, 2, 3, 4, so there are 4.",
      commonMistakes: [
        { answer: 5, feedback: "Check the endpoints: 0 is not in $B$ and 5 is not in $A$, so exactly one of your integers should go." },
        { answer: 6, feedback: "Both 0 and 5 are excluded from the intersection." },
      ],
    },
    {
      type: "quiz",
      id: "srf1-1-q6",
      variant: "practice",
      question: "Which pair of sets is disjoint?",
      options: [
        { text: "The set of even primes and the set of odd natural numbers", correct: true, feedback: "The only even prime is 2, which is not odd. The intersection is empty." },
        { text: "$\\mathbb{N}$ and $\\mathbb{Z}$", feedback: "$\\mathbb{N} \\subseteq \\mathbb{Z}$, so their intersection is all of $\\mathbb{N}$." },
        { text: "$\\{x : x^2 = 1\\}$ and $\\{-1, 0\\}$", feedback: "$-1$ satisfies $x^2 = 1$, so it is shared." },
        { text: "Multiples of 4 and multiples of 6", feedback: "12, 24, 36, ... are in both." },
      ],
      hint: "Disjoint means the intersection is empty: look for any shared element.",
    },
    {
      type: "numeric",
      id: "srf1-1-q7",
      variant: "practice",
      question:
        "For $k = 1, 2, \\ldots, 10$ let $A_k = \\{k, k + 1, \\ldots, 2k\\}$ (integers). How many elements does $A_1 \\cup A_2 \\cup \\cdots \\cup A_{10}$ have?",
      answer: 20,
      hint: "Each $A_k$ is a block of consecutive integers. Do neighbouring blocks overlap or leave gaps?",
      solution:
        "$A_1 = \\{1, 2\\}$, $A_2 = \\{2, 3, 4\\}$, $A_3 = \\{3, \\ldots, 6\\}$, ..., $A_{10} = \\{10, \\ldots, 20\\}$. Since $A_{k+1}$ starts at $k + 1 \\le 2k$, each block overlaps the previous one, so the union is the unbroken block $\\{1, 2, \\ldots, 20\\}$: 20 elements.",
      commonMistakes: [
        { answer: 65, feedback: "That adds the sizes $2 + 3 + \\cdots + 11$, counting overlaps repeatedly. A union lists each element once." },
        { answer: 11, feedback: "That is only $n(A_{10})$. The smaller blocks add 1 to 9." },
      ],
    },
    {
      type: "quiz",
      id: "srf1-1-q8",
      variant: "concept",
      question: "For sets $A$, $B$, $C$, which condition guarantees $B = C$?",
      options: [
        { text: "$A \\cup B = A \\cup C$ and $A \\cap B = A \\cap C$ together", correct: true, feedback: "Outside $A$, the unions agree, so $B$ and $C$ agree outside $A$. Inside $A$, the intersections agree. So $B$ and $C$ have the same elements everywhere." },
        { text: "$A \\cup B = A \\cup C$ alone", feedback: "Take $A = \\{1, 2\\}$, $B = \\{1\\}$, $C = \\{2\\}$: both unions are $\\{1, 2\\}$ but $B \\ne C$." },
        { text: "$A \\cap B = A \\cap C$ alone", feedback: "Take $A = \\{1\\}$, $B = \\{2\\}$, $C = \\{3\\}$: both intersections are empty but $B \\ne C$." },
        { text: "None of these conditions is enough", feedback: "The two conditions together do force $B = C$. Check an element inside $A$ and one outside $A$ separately." },
      ],
      hint: "Split the question: what do you know about elements inside $A$, and what about elements outside $A$?",
    },
    {
      type: "quiz",
      id: "srf1-1-q9",
      variant: "practice",
      multiple: true,
      question:
        "JEE style. Let $X = \\{4^n - 3n - 1 : n \\in \\mathbb{N}\\}$ and $Y = \\{9(n - 1) : n \\in \\mathbb{N}\\}$. Which statements are true? Select all that apply.",
      options: [
        { text: "$X \\cup Y = Y$", correct: true, feedback: "$4^n = (1 + 3)^n = 1 + 3n + 9(\\ldots)$, so every element of $X$ is a multiple of 9 that is $\\ge 0$, hence in $Y$. $X \\subseteq Y$ gives $X \\cup Y = Y$." },
        { text: "$X \\cap Y = X$", correct: true, feedback: "Again because $X \\subseteq Y$." },
        { text: "$X = Y$", feedback: "$18 \\in Y$ but $X = \\{0, 9, 54, 243, \\ldots\\}$ jumps past 18." },
        { text: "$X \\cup Y = X$", feedback: "That would need $Y \\subseteq X$, and $18 \\in Y$ is not in $X$." },
      ],
      hint: "Expand $4^n = (1 + 3)^n$ by the binomial theorem: the first two terms cancel $3n + 1$.",
    },
    {
      type: "numeric",
      id: "srf1-1-q10",
      variant: "practice",
      question:
        "JEE style. $A = \\{x \\in \\mathbb{Z} : x^2 < 20\\}$ and $B = \\{x \\in \\mathbb{Z} : |x - 2| \\le 3\\}$. Find $n(A \\cap B)$.",
      answer: 6,
      hint: "Turn each condition into a list of integers: $x^2 < 20$ allows $|x| \\le 4$; $|x - 2| \\le 3$ means $-1 \\le x \\le 5$.",
      solution:
        "$A = \\{-4, -3, \\ldots, 4\\}$ (since $4^2 = 16 < 20 < 25 = 5^2$) and $B = \\{-1, 0, \\ldots, 5\\}$. The intersection is $\\{-1, 0, 1, 2, 3, 4\\}$, which has 6 elements.",
      commonMistakes: [
        { answer: 9, feedback: "That is $n(A)$. Now keep only those also within 3 of 2." },
        { answer: 7, feedback: "That is $n(B)$. 5 is in $B$ but $5^2 = 25$ is not less than 20." },
        { answer: 5, feedback: "Recheck the edges: $-1$ is in $B$ ($|-1 - 2| = 3$) and in $A$." },
      ],
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "difference-complement-symmetric-difference",
  title: "1.2 · Difference, Complement and Symmetric Difference",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "Union and intersection combine sets. The next three operations **remove** things. \"Students in the chess club but not the quiz club\" removes the quiz club from the chess club. \"Students in no club\" removes all members from the whole school. \"Students in exactly one club\" removes the overlap from the union. Each is again just a choice of Venn regions.",
    },
    { type: "heading", text: "Difference and complement" },
    {
      type: "callout",
      variant: "definition",
      title: "Difference",
      content:
        "$A - B = \\{x : x \\in A \\text{ and } x \\notin B\\}$, the part of $A$ outside $B$ (also written $A \\setminus B$).\nIn general $A - B \\ne B - A$: they are the two crescents of the diagram.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Complement",
      content:
        "With a universal set $U$ fixed, the complement of $A$ is $A' = U - A = \\{x \\in U : x \\notin A\\}$ (also written $A^c$).\nThe complement depends on $U$: the complement of the even numbers is the odd numbers inside $\\mathbb{N}$, but includes $\\frac12$ inside $\\mathbb{Q}$.",
    },
    {
      type: "text",
      content:
        "The single most useful identity in this chapter connects the two:",
    },
    {
      type: "math",
      latex: "A - B = A \\cap B'",
    },
    {
      type: "text",
      content:
        "Both sides say \"in $A$ and not in $B$\". Rewriting every difference as an intersection with a complement lets the laws of the next lesson handle differences too.",
    },
    {
      type: "table",
      headers: ["Complement law", "Meaning"],
      rows: [
        ["$A \\cup A' = U$", "every element is either in $A$ or not"],
        ["$A \\cap A' = \\varnothing$", "no element is both"],
        ["$(A')' = A$", "not-not-in $A$ means in $A$"],
        ["$U' = \\varnothing$, $\\varnothing' = U$", "the extremes swap"],
        ["$A \\subseteq B \\iff B' \\subseteq A'$", "inclusion reverses under complement"],
      ],
    },
    { type: "heading", text: "Symmetric difference: exactly one of the two" },
    {
      type: "callout",
      variant: "definition",
      title: "Symmetric difference",
      content:
        "$A \\,\\Delta\\, B = (A - B) \\cup (B - A) = (A \\cup B) - (A \\cap B)$, the elements in **exactly one** of the sets: both crescents, without the lens in the middle.",
    },
    {
      type: "interactive",
      config: {
        component: "srf-venn-diagram",
        sets: 2,
        expressions: [
          { expr: "A-B", latex: "A - B" },
          { expr: "A&B'", latex: "A \\cap B'" },
          { expr: "B-A", latex: "B - A" },
          { expr: "A'", latex: "A'" },
          { expr: "A^B", latex: "A \\,\\Delta\\, B" },
          { expr: "(A|B)-(A&B)", latex: "(A \\cup B) - (A \\cap B)" },
          { expr: "(A|B)'", latex: "(A \\cup B)'" },
        ],
        initialExpression: 0,
        caption:
          "Shade $A - B$ and then $A \\cap B'$: the readout says they are the same set. Do the same for the two forms of $A \\,\\Delta\\, B$. Then click your own shading for \"in neither set\" and see which preset it matches.",
      },
    },
    {
      type: "text",
      content:
        "Three pieces, $A - B$, $A \\cap B$ and $B - A$, never overlap and together make $A \\cup B$. Most counting arguments in this chapter start by splitting a union into these disjoint pieces.",
    },
    { type: "heading", text: "Worked examples" },
    {
      type: "worked-example",
      id: "srf1-2-we1",
      title: "Worked example 1: all four operations",
      problem:
        "$U = \\{1, 2, \\ldots, 10\\}$, $A = \\{1, 2, 3, 4, 5\\}$, $B = \\{4, 5, 6, 7\\}$. Find $A - B$, $B - A$, $A'$ and $A \\,\\Delta\\, B$.",
      steps: [
        { text: "$A - B$: strike 4 and 5 out of $A$.", latex: "A - B = \\{1, 2, 3\\}" },
        { text: "$B - A$: strike 4 and 5 out of $B$.", latex: "B - A = \\{6, 7\\}" },
        { text: "$A'$: everything in $U$ outside $A$.", latex: "A' = \\{6, 7, 8, 9, 10\\}" },
        { text: "$A \\,\\Delta\\, B$: join the two differences.", latex: "A \\,\\Delta\\, B = \\{1, 2, 3, 6, 7\\}" },
        { text: "Check: $(A \\cup B) - (A \\cap B) = \\{1, \\ldots, 7\\} - \\{4, 5\\}$ gives the same set." },
      ],
      answer: "$A - B = \\{1, 2, 3\\}$, $B - A = \\{6, 7\\}$, $A' = \\{6, \\ldots, 10\\}$, $A \\,\\Delta\\, B = \\{1, 2, 3, 6, 7\\}$.",
    },
    {
      type: "worked-example",
      id: "srf1-2-we2",
      title: "Worked example 2: intervals",
      problem: "With $U = \\mathbb{R}$, $A = [0, 4]$ and $B = (2, 6)$, find $A - B$, $B'$ and $A \\,\\Delta\\, B$.",
      steps: [
        { text: "$A - B$: keep the points of $[0, 4]$ not in $(2, 6)$. Since 2 is **not** in $B$, it stays.", latex: "A - B = [0, 2]" },
        { text: "$B'$: everything outside $(2, 6)$, endpoints included because $B$ excludes them.", latex: "B' = (-\\infty, 2] \\cup [6, \\infty)" },
        { text: "$B - A$: points of $(2, 6)$ beyond 4. Since 4 **is** in $A$, it is removed.", latex: "B - A = (4, 6)" },
        { text: "Join the two differences.", latex: "A \\,\\Delta\\, B = [0, 2] \\cup (4, 6)" },
      ],
      answer: "$A - B = [0, 2]$, $B' = (-\\infty, 2] \\cup [6, \\infty)$, $A \\,\\Delta\\, B = [0, 2] \\cup (4, 6)$.",
    },
    {
      type: "worked-example",
      id: "srf1-2-we3",
      title: "Worked example 3: cancelling a symmetric difference",
      problem: "Show that $A \\,\\Delta\\, B = A \\,\\Delta\\, C$ implies $B = C$.",
      steps: [
        { text: "Think of membership as a yes/no switch. $x \\in A \\,\\Delta\\, B$ exactly when **one** of \"$x \\in A$\", \"$x \\in B$\" is true." },
        { text: "Fix any $x$. If $x \\notin A$, then $x \\in A \\,\\Delta\\, B \\iff x \\in B$, and likewise $x \\in A \\,\\Delta\\, C \\iff x \\in C$. The given equality gives $x \\in B \\iff x \\in C$." },
        { text: "If $x \\in A$, then $x \\in A \\,\\Delta\\, B \\iff x \\notin B$, and likewise for $C$. So $x \\notin B \\iff x \\notin C$, which is the same as $x \\in B \\iff x \\in C$." },
        { text: "Every $x$ is in $B$ exactly when it is in $C$." },
      ],
      answer: "$B = C$: symmetric difference can be cancelled, unlike union or intersection.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"$n(A - B) = n(A) - n(B)$\"",
      content:
        "Take $A = \\{1, 2, 3\\}$ and $B = \\{3, 4, 5, 6\\}$. Then $A - B = \\{1, 2\\}$ has 2 elements, while $n(A) - n(B) = -1$, which cannot be a count. Only the elements of $B$ that are **in** $A$ get removed: $n(A - B) = n(A) - n(A \\cap B)$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"$A - B$ and $B - A$ are the same set\"",
      content:
        "They are the two opposite crescents and are always disjoint. In Worked example 1 they are $\\{1, 2, 3\\}$ and $\\{6, 7\\}$. They are equal only when both are empty, that is, when $A = B$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "srf1-2-q1",
      variant: "practice",
      question: "$U = \\{1, 2, \\ldots, 9\\}$ and $A = \\{2, 4, 6, 8\\}$. What is $A'$?",
      options: [
        { text: "$\\{1, 3, 5, 7, 9\\}$", correct: true, feedback: "Everything in $U$ that is not in $A$." },
        { text: "$\\{1, 3, 5, 7\\}$", feedback: "9 is in $U$ and not in $A$, so it belongs to $A'$." },
        { text: "All odd integers", feedback: "The complement is taken inside $U$, which stops at 9." },
        { text: "$\\varnothing$", feedback: "$\\varnothing$ would mean $A = U$, but $A$ misses the odd numbers." },
      ],
      hint: "The complement is $U - A$: start from $U$ and remove the elements of $A$.",
    },
    {
      type: "numeric",
      id: "srf1-2-q2",
      variant: "practice",
      question: "$n(A) = 12$, $n(B) = 9$ and $n(A \\cap B) = 4$. Find $n(A - B)$.",
      answer: 8,
      hint: "$A - B$ is $A$ with its shared part removed.",
      solution: "$n(A - B) = n(A) - n(A \\cap B) = 12 - 4 = 8$.",
      commonMistakes: [
        { answer: 3, feedback: "$12 - 9$ removes all of $B$, but only the 4 shared elements were ever in $A$." },
        { answer: 5, feedback: "That is $n(B - A) = 9 - 4$." },
      ],
    },
    {
      type: "numeric",
      id: "srf1-2-q3",
      variant: "practice",
      question: "With the same data ($n(A) = 12$, $n(B) = 9$, $n(A \\cap B) = 4$), find $n(A \\,\\Delta\\, B)$.",
      answer: 13,
      hint: "$A \\,\\Delta\\, B$ is the two crescents: $(A - B) \\cup (B - A)$, which are disjoint.",
      solution: "$n(A - B) = 8$ and $n(B - A) = 5$, so $n(A \\,\\Delta\\, B) = 13$. In one formula: $n(A) + n(B) - 2n(A \\cap B) = 21 - 8 = 13$.",
      commonMistakes: [
        { answer: 17, feedback: "That is $n(A \\cup B) = 21 - 4$. The symmetric difference also drops the 4 shared elements." },
        { answer: 21, feedback: "That double-counts the overlap instead of removing it." },
      ],
    },
    {
      type: "quiz",
      id: "srf1-2-q4",
      variant: "practice",
      multiple: true,
      question: "Which of these sets are equal to $A - B$ for all sets $A$, $B$ (inside a universal set $U$)? Select all that apply.",
      options: [
        { text: "$A \\cap B'$", correct: true, feedback: "The basic identity: in $A$ and not in $B$." },
        { text: "$A - (A \\cap B)$", correct: true, feedback: "Removing the shared part is the same as removing all of $B$, because only the shared part was in $A$." },
        { text: "$(A \\cup B) - B$", correct: true, feedback: "Joining $B$ and then removing it leaves exactly the part of $A$ outside $B$." },
        { text: "$B' - A'$", correct: true, feedback: "$B' - A' = B' \\cap (A')' = B' \\cap A$, which is $A - B$." },
        { text: "$B - A$", feedback: "That is the opposite crescent." },
      ],
      hint: "Rewrite each option as an intersection with complements using $X - Y = X \\cap Y'$, then compare.",
    },
    {
      type: "quiz",
      id: "srf1-2-q5",
      variant: "concept",
      question: "When is $A \\,\\Delta\\, B = \\varnothing$?",
      options: [
        { text: "Exactly when $A = B$", correct: true, feedback: "No element may be in exactly one set, so every element is in both or neither: $A = B$." },
        { text: "Exactly when $A$ and $B$ are disjoint", feedback: "For disjoint sets $A \\,\\Delta\\, B = A \\cup B$, the opposite extreme." },
        { text: "Exactly when $A \\subseteq B$", feedback: "If $A = \\{1\\}$ and $B = \\{1, 2\\}$, then $A \\,\\Delta\\, B = \\{2\\}$." },
        { text: "Never", feedback: "$A \\,\\Delta\\, A = \\varnothing$ for every set $A$." },
      ],
      hint: "$A \\,\\Delta\\, B$ collects the elements in exactly one set. When are there none?",
    },
    {
      type: "quiz",
      id: "srf1-2-q6",
      variant: "practice",
      question: "Inside a universal set $U$, what is $A \\,\\Delta\\, A'$?",
      options: [
        { text: "$U$", correct: true, feedback: "Every element of $U$ is in exactly one of $A$, $A'$." },
        { text: "$\\varnothing$", feedback: "That is $A \\cap A'$ (or $A \\,\\Delta\\, A$)." },
        { text: "$A$", feedback: "The elements of $A'$ are also in exactly one of the two sets." },
        { text: "$A'$", feedback: "The elements of $A$ are also in exactly one of the two sets." },
      ],
      hint: "For each element of $U$, in how many of $A$ and $A'$ does it lie?",
    },
    {
      type: "quiz",
      id: "srf1-2-q7",
      variant: "practice",
      multiple: true,
      question: "Which of these properties does the symmetric difference $\\Delta$ have? Select all that apply.",
      options: [
        { text: "$A \\,\\Delta\\, B = B \\,\\Delta\\, A$", correct: true, feedback: "\"Exactly one of the two\" does not care about order." },
        { text: "$(A \\,\\Delta\\, B) \\,\\Delta\\, C = A \\,\\Delta\\, (B \\,\\Delta\\, C)$", correct: true, feedback: "Both sides are the elements lying in an odd number of the three sets." },
        { text: "$A \\,\\Delta\\, \\varnothing = A$", correct: true, feedback: "Nothing in $\\varnothing$, so \"exactly one\" means \"in $A$\"." },
        { text: "$A \\,\\Delta\\, A = A$", feedback: "No element is in exactly one of $A$ and $A$, so $A \\,\\Delta\\, A = \\varnothing$." },
      ],
      hint: "Think of $x \\in A \\,\\Delta\\, B$ as \"$x$ is in an odd number of the sets\".",
    },
    {
      type: "numeric",
      id: "srf1-2-q8",
      variant: "practice",
      question:
        "$U = \\{1, 2, \\ldots, 50\\}$, $A$ = multiples of 3 in $U$, $B$ = multiples of 5 in $U$. Find $n(A - B)$.",
      answer: 13,
      hint: "Count the multiples of 3, then remove those that are also multiples of 5, i.e. multiples of 15.",
      solution: "$n(A) = \\lfloor 50/3 \\rfloor = 16$ and $n(A \\cap B) = \\lfloor 50/15 \\rfloor = 3$ (15, 30, 45). So $n(A - B) = 16 - 3 = 13$.",
      commonMistakes: [
        { answer: 6, feedback: "$16 - 10$ removes every multiple of 5, but most of them were never multiples of 3." },
        { answer: 16, feedback: "That is $n(A)$. Remove 15, 30 and 45." },
      ],
    },
    {
      type: "numeric",
      id: "srf1-2-q9",
      variant: "practice",
      question: "With $U = \\mathbb{R}$, $A = [-3, 5]$ and $B = (1, 7)$. $A \\,\\Delta\\, B$ is a union of two intervals. What is their total length?",
      answer: 6,
      hint: "Find $A - B$ and $B - A$ separately as intervals.",
      solution: "$A - B = [-3, 1]$ (length 4) and $B - A = (5, 7)$ (length 2). Total length $4 + 2 = 6$.",
      commonMistakes: [
        { answer: 10, feedback: "That is the length of $A \\cup B = [-3, 7)$. Remove the overlap $(1, 5]$, of length 4." },
        { answer: 4, feedback: "That is only $A - B$. Add $B - A = (5, 7)$." },
      ],
    },
    {
      type: "quiz",
      id: "srf1-2-q10",
      variant: "practice",
      question: "JEE style. Sets $A$, $B$, $C$ satisfy $A \\,\\Delta\\, B = A \\,\\Delta\\, C$. Which conclusion is correct?",
      options: [
        { text: "$B = C$", correct: true, feedback: "Symmetric difference cancels: apply $A \\,\\Delta$ to both sides and use $A \\,\\Delta\\, A = \\varnothing$ with associativity." },
        { text: "Only $B \\subseteq C$ can be concluded", feedback: "The situation is symmetric in $B$ and $C$, so $C \\subseteq B$ follows equally." },
        { text: "Nothing can be concluded about $B$ and $C$", feedback: "Unlike $A \\cup B = A \\cup C$, this condition does pin down $B$. See Worked example 3." },
        { text: "$A = B = C$", feedback: "$A$ can be anything: $A \\,\\Delta\\, B = A \\,\\Delta\\, B$ holds for any $A$." },
      ],
      hint: "Use $A \\,\\Delta\\, (A \\,\\Delta\\, B) = (A \\,\\Delta\\, A) \\,\\Delta\\, B = B$.",
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "laws-of-set-algebra",
  title: "1.3 · Laws of Set Algebra",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "\"Not (tea or coffee)\" means \"no tea and no coffee\". Everybody understands this sentence without being taught it. De Morgan's laws are exactly this piece of everyday logic written with sets. Together with the distributive laws they let you simplify any set expression the way algebra simplifies polynomials.",
    },
    { type: "heading", text: "The distributive and De Morgan laws" },
    {
      type: "callout",
      variant: "definition",
      title: "Distributive laws",
      content:
        "$A \\cap (B \\cup C) = (A \\cap B) \\cup (A \\cap C)$\n$A \\cup (B \\cap C) = (A \\cup B) \\cap (A \\cup C)$\nUnlike numbers, **both** operations distribute over each other: $a + bc = (a + b)(a + c)$ is false for numbers, but its set version is true.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "De Morgan's laws",
      content:
        "$(A \\cup B)' = A' \\cap B'$ and $(A \\cap B)' = A' \\cup B'$.\nComplementing swaps $\\cup$ and $\\cap$. The same holds for differences: $A - (B \\cup C) = (A - B) \\cap (A - C)$ and $A - (B \\cap C) = (A - B) \\cup (A - C)$.",
    },
    {
      type: "interactive",
      config: {
        component: "srf-venn-diagram",
        sets: 3,
        expressions: [
          { expr: "A&(B|C)", latex: "A \\cap (B \\cup C)" },
          { expr: "(A&B)|(A&C)", latex: "(A \\cap B) \\cup (A \\cap C)" },
          { expr: "A|(B&C)", latex: "A \\cup (B \\cap C)" },
          { expr: "(A|B)&(A|C)", latex: "(A \\cup B) \\cap (A \\cup C)" },
          { expr: "(A|B)&C", latex: "(A \\cup B) \\cap C" },
          { expr: "(A|B|C)'", latex: "(A \\cup B \\cup C)'" },
          { expr: "A'&B'&C'", latex: "A' \\cap B' \\cap C'" },
        ],
        initialExpression: 0,
        caption:
          "Shade each side of a law in turn: the readout shows when two expressions shade the same regions. Compare $A \\cup (B \\cap C)$ with the tempting but wrong $(A \\cup B) \\cap C$.",
      },
    },
    { type: "heading", text: "Two ways to prove a law" },
    {
      type: "text",
      content:
        "To prove $X = Y$ for sets you can **chase elements**: show every element of $X$ is in $Y$, and every element of $Y$ is in $X$ (double inclusion). Or you can **check regions**: three sets in general position cut $U$ into 8 regions, and an element's region decides its membership in every expression. If two expressions contain the same regions, they are equal for all sets.",
    },
    {
      type: "worked-example",
      id: "srf1-3-we1",
      title: "Worked example 1: De Morgan by element-chasing",
      problem: "Prove $(A \\cup B)' = A' \\cap B'$.",
      steps: [
        { text: "($\\subseteq$) Let $x \\in (A \\cup B)'$. Then $x \\notin A \\cup B$, so $x$ is in neither set: $x \\notin A$ and $x \\notin B$." },
        { text: "That says $x \\in A'$ and $x \\in B'$, so $x \\in A' \\cap B'$." },
        { text: "($\\supseteq$) Let $x \\in A' \\cap B'$. Then $x \\notin A$ and $x \\notin B$, so $x$ is not in $A$ or $B$: $x \\notin A \\cup B$, i.e. $x \\in (A \\cup B)'$." },
        { text: "Each side is contained in the other, so they are equal." },
      ],
      answer: "$(A \\cup B)' = A' \\cap B'$.",
    },
    {
      type: "worked-example",
      id: "srf1-3-we2",
      title: "Worked example 2: a distributive law by regions",
      problem: "Prove $A \\cup (B \\cap C) = (A \\cup B) \\cap (A \\cup C)$ by checking all eight regions.",
      steps: [
        { text: "Label each region by the sets it lies in (\"AB\" = in $A$ and $B$, not $C$). Work out each side region by region." },
        {
          table: {
            headers: ["Region", "$B \\cap C$", "$A \\cup (B \\cap C)$", "$A \\cup B$", "$A \\cup C$", "$(A \\cup B) \\cap (A \\cup C)$"],
            rows: [
              ["outside", "no", "no", "no", "no", "no"],
              ["A", "no", "yes", "yes", "yes", "yes"],
              ["B", "no", "no", "yes", "no", "no"],
              ["C", "no", "no", "no", "yes", "no"],
              ["AB", "no", "yes", "yes", "yes", "yes"],
              ["AC", "no", "yes", "yes", "yes", "yes"],
              ["BC", "yes", "yes", "yes", "yes", "yes"],
              ["ABC", "yes", "yes", "yes", "yes", "yes"],
            ],
          },
        },
        { text: "The two answer columns agree in every row. Since every element of every possible universe lies in exactly one of these regions, the sets are equal." },
      ],
      answer: "Both sides contain the regions A, AB, AC, BC, ABC and nothing else, so they are equal.",
    },
    { type: "heading", text: "Simplifying set expressions" },
    {
      type: "text",
      content:
        "Simplify with the laws exactly as you would factorise in algebra. The moves you need most: rewrite $X - Y$ as $X \\cap Y'$, push complements inside with De Morgan, distribute, then use $A \\cap A' = \\varnothing$, $A \\cup A' = U$ and absorption.",
    },
    {
      type: "worked-example",
      id: "srf1-3-we3",
      title: "Worked example 3: factor out the common set",
      problem: "Simplify $(A \\cup B) \\cap (A \\cup B')$.",
      steps: [
        { text: "Both brackets are \"$A \\cup$ something\". Use the second distributive law backwards." },
        { latex: "(A \\cup B) \\cap (A \\cup B') = A \\cup (B \\cap B')" },
        { text: "$B \\cap B' = \\varnothing$ and $A \\cup \\varnothing = A$." },
      ],
      answer: "$(A \\cup B) \\cap (A \\cup B') = A$.",
    },
    {
      type: "worked-example",
      id: "srf1-3-we4",
      title: "Worked example 4: difference inside a complement",
      problem: "Simplify $\\left(A' \\cup (A - B)\\right)'$.",
      steps: [
        { text: "De Morgan on the outer complement:", latex: "\\left(A' \\cup (A - B)\\right)' = A \\cap (A - B)'" },
        { text: "Write $A - B = A \\cap B'$ and apply De Morgan again: $(A \\cap B')' = A' \\cup B$." },
        { latex: "A \\cap (A' \\cup B) = (A \\cap A') \\cup (A \\cap B) = A \\cap B" },
      ],
      answer: "$\\left(A' \\cup (A - B)\\right)' = A \\cap B$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a Venn picture of one example proves a law\"",
      content:
        "Drawing $A = \\{1, 2\\}$, $B = \\{2, 3\\}$ and checking a law proves nothing: the law might fail for other sets. The region method is a proof only because the diagram shows **every** possible region (8 for three sets), so it covers every element of every possible example. To **disprove** a law, one counterexample is enough.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"$A \\cup (B \\cap C) = (A \\cup B) \\cap C$\"",
      content:
        "Moving brackets is not allowed when the two operations differ. Region A (in $A$ only) is in the left side but not the right, since it is outside $C$. Mixed expressions need the distributive law, not regrouping.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "srf1-3-q1",
      variant: "practice",
      question: "$(A \\cup B)'$ equals",
      options: [
        { text: "$A' \\cap B'$", correct: true, feedback: "De Morgan: \"not in either\" means \"not in $A$ and not in $B$\"." },
        { text: "$A' \\cup B'$", feedback: "That is $(A \\cap B)'$, a bigger set: it includes the crescents." },
        { text: "$A \\cap B$", feedback: "Complement swaps $\\cup$ and $\\cap$ **and** complements each set." },
        { text: "$A' \\cap B$", feedback: "That is $B - A$, the part of $B$ outside $A$. Elements of $B$ are in $A \\cup B$, so none of them belong to $(A \\cup B)'$." },
      ],
      hint: "Read it as \"not (in $A$ or in $B$)\" and say it in plain English.",
    },
    {
      type: "quiz",
      id: "srf1-3-q2",
      variant: "practice",
      question: "Simplify $A \\cap (A \\cup B)'$.",
      options: [
        { text: "$\\varnothing$", correct: true, feedback: "$(A \\cup B)' = A' \\cap B'$, so the expression is $A \\cap A' \\cap B' = \\varnothing$." },
        { text: "$A - B$", feedback: "$(A \\cup B)'$ lies outside $A$ entirely, so nothing of $A$ survives." },
        { text: "$A \\cap B'$", feedback: "Expand $(A \\cup B)'$ with De Morgan first; an $A'$ appears." },
        { text: "$B'$", feedback: "Intersecting with $A$ can only give a subset of $A$." },
      ],
      hint: "Apply De Morgan to $(A \\cup B)'$, then look for $A \\cap A'$.",
    },
    {
      type: "quiz",
      id: "srf1-3-q3",
      variant: "practice",
      multiple: true,
      question: "Which identities hold for **all** sets $A$, $B$, $C$? Select all that apply.",
      options: [
        { text: "$A - (B \\cup C) = (A - B) \\cap (A - C)$", correct: true, feedback: "De Morgan inside $A$: not in ($B$ or $C$) means not in $B$ and not in $C$." },
        { text: "$A - (B \\cap C) = (A - B) \\cap (A - C)$", feedback: "The right side should be a union. An element of $A \\cap B$ outside $C$ is in the left side but not in $A - B$." },
        { text: "$A \\cup (B - C) = (A \\cup B) - C$", feedback: "An element of $A \\cap C$ is in the left side (it is in $A$) but removed on the right." },
        { text: "$A \\cap (B - C) = (A \\cap B) - (A \\cap C)$", correct: true, feedback: "Both sides equal $A \\cap B \\cap C'$." },
      ],
      hint: "Rewrite every difference as $X \\cap Y'$, then expand with De Morgan and compare. For a false one, find a single region where the sides disagree.",
    },
    {
      type: "quiz",
      id: "srf1-3-q4",
      variant: "practice",
      question: "Simplify $(A \\cap B) \\cup (A \\cap B')$.",
      options: [
        { text: "$A$", correct: true, feedback: "Factor out $A$: $A \\cap (B \\cup B') = A \\cap U = A$." },
        { text: "$B$", feedback: "Both pieces lie inside $A$, so the result must be a subset of $A$." },
        { text: "$\\varnothing$", feedback: "The two pieces are disjoint, but their union is all of $A$, not empty." },
        { text: "$U$", feedback: "Nothing outside $A$ appears in either piece." },
      ],
      hint: "Use the distributive law backwards to factor out $A$.",
    },
    {
      type: "quiz",
      id: "srf1-3-q5",
      variant: "practice",
      question: "Simplify $(A' \\cup B')' \\cup (A \\cap B')$.",
      options: [
        { text: "$A$", correct: true, feedback: "$(A' \\cup B')' = A \\cap B$ by De Morgan, and $(A \\cap B) \\cup (A \\cap B') = A$." },
        { text: "$A \\cap B$", feedback: "That is just the first piece; the second adds the part of $A$ outside $B$." },
        { text: "$A \\cup B$", feedback: "Both pieces lie inside $A$, so the union cannot include $B - A$." },
        { text: "$B'$", feedback: "Apply De Morgan to the first term carefully: $(A' \\cup B')' = A \\cap B$." },
      ],
      hint: "First apply De Morgan to $(A' \\cup B')'$.",
    },
    {
      type: "numeric",
      id: "srf1-3-q6",
      variant: "practice",
      question: "$n(U) = 100$ and $n(A' \\cap B') = 15$. Find $n(A \\cup B)$.",
      answer: 85,
      hint: "By De Morgan, $A' \\cap B'$ is the complement of a familiar set.",
      solution: "$A' \\cap B' = (A \\cup B)'$, so $n(A \\cup B) = n(U) - n\\left((A \\cup B)'\\right) = 100 - 15 = 85$.",
      commonMistakes: [{ answer: 15, feedback: "15 is the count **outside** $A \\cup B$." }],
    },
    {
      type: "numeric",
      id: "srf1-3-q7",
      variant: "practice",
      question:
        "$U = \\{1, 2, \\ldots, 20\\}$, $A$ = even numbers in $U$, $B$ = multiples of 3 in $U$. Find $n\\left((A \\cup B)'\\right)$.",
      answer: 7,
      hint: "Count $A \\cup B$ by adding and correcting for the multiples of 6, or count $A' \\cap B'$ directly.",
      solution:
        "$n(A) = 10$, $n(B) = 6$, $n(A \\cap B) = 3$ (6, 12, 18). So $n(A \\cup B) = 13$ and $n((A \\cup B)') = 20 - 13 = 7$.\n\nCheck via De Morgan: $A' \\cap B'$ = odd numbers not divisible by 3 = $\\{1, 5, 7, 11, 13, 17, 19\\}$, 7 elements.",
      commonMistakes: [
        { answer: 4, feedback: "You subtracted $10 + 6 = 16$ from 20, counting 6, 12, 18 twice." },
        { answer: 13, feedback: "That is $n(A \\cup B)$; the question asks for its complement." },
      ],
    },
    {
      type: "quiz",
      id: "srf1-3-q8",
      variant: "concept",
      question: "If $A \\subseteq B$, which statement must be true?",
      options: [
        { text: "$B' \\subseteq A'$", correct: true, feedback: "Anything outside the bigger set $B$ is certainly outside the smaller set $A$." },
        { text: "$A' \\subseteq B'$", feedback: "Inclusion reverses under complement: an element of $B - A$ is in $A'$ but not in $B'$." },
        { text: "$A \\cap B' = A$", feedback: "$A \\cap B' = A - B = \\varnothing$ when $A \\subseteq B$." },
        { text: "$A \\cup B = A$", feedback: "$A \\cup B = B$ when $A \\subseteq B$." },
      ],
      hint: "Draw $A$ as a small circle inside $B$. Which region is outside both?",
    },
    {
      type: "quiz",
      id: "srf1-3-q9",
      variant: "practice",
      multiple: true,
      question: "JEE style. For all sets $A$, $B$, $C$, which of the following are identities? Select all that apply.",
      options: [
        { text: "$(A - B) - C = A - (B \\cup C)$", correct: true, feedback: "Both are $A \\cap B' \\cap C'$." },
        { text: "$A - (B - C) = (A - B) \\cup (A \\cap C)$", correct: true, feedback: "$A \\cap (B \\cap C')' = A \\cap (B' \\cup C) = (A \\cap B') \\cup (A \\cap C)$." },
        { text: "$(A \\cup B) - C = (A - C) \\cup (B - C)$", correct: true, feedback: "$(A \\cup B) \\cap C' = (A \\cap C') \\cup (B \\cap C')$ by distributivity." },
        { text: "$A \\cap (B \\cup C) = (A \\cap B) \\cup C$", feedback: "Region C (in $C$ only) is on the right but not the left." },
      ],
      hint: "Turn every difference into an intersection with a complement, then use De Morgan and distributivity.",
    },
    {
      type: "numeric",
      id: "srf1-3-q10",
      variant: "concept",
      question: "Three circles are drawn so that every possible overlap appears. Including the region outside all circles, how many regions does the diagram have?",
      answer: 8,
      hint: "Each region is described by an in/out choice for each of the three sets.",
      solution: "Each region corresponds to a yes/no answer to \"in $A$?\", \"in $B$?\", \"in $C$?\": $2^3 = 8$ regions, one of which (no, no, no) is outside all circles.",
      commonMistakes: [{ answer: 7, feedback: "That counts only the regions inside the circles. The outside region counts too." }],
    },
    {
      type: "quiz",
      id: "srf1-3-q11",
      variant: "practice",
      question: "JEE style. The set $(A \\cap B') \\cup (A' \\cap B) \\cup (A \\cap B)$ equals",
      options: [
        { text: "$A \\cup B$", correct: true, feedback: "The three pieces are the three regions inside the circles: $A$ only, $B$ only and both." },
        { text: "$A \\,\\Delta\\, B$", feedback: "That is just the first two pieces; the third adds the overlap back." },
        { text: "$U$", feedback: "The region outside both circles is missing." },
        { text: "$A \\cap B$", feedback: "That is only the last piece." },
      ],
      hint: "Each bracket is one region of a two-set Venn diagram. Which regions are listed?",
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "counting-with-two-sets",
  title: "1.4 · Counting with Two Sets",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "In a class of 45 students, 30 drink tea and 25 drink coffee. That is $30 + 25 = 55$ \"tea or coffee\" answers from only 45 students. The numbers are not wrong: some students drink both and were counted twice. Every counting formula in this chapter is a careful way of undoing that double counting.",
    },
    { type: "heading", text: "The two-set formula" },
    {
      type: "text",
      content:
        "Split $A \\cup B$ into its three disjoint regions: $a$ elements in $A$ only, $c$ in both, $b$ in $B$ only. Then $n(A) = a + c$, $n(B) = b + c$ and $n(A \\cup B) = a + b + c$. Adding $n(A) + n(B)$ gives $a + b + 2c$, one $c$ too many.",
    },
    {
      type: "math",
      latex: "n(A \\cup B) = n(A) + n(B) - n(A \\cap B)",
    },
    {
      type: "table",
      headers: ["Quantity", "Formula"],
      rows: [
        ["In $A$ but not $B$", "$n(A - B) = n(A) - n(A \\cap B)$"],
        ["In exactly one", "$n(A \\,\\Delta\\, B) = n(A) + n(B) - 2n(A \\cap B)$"],
        ["In neither", "$n(A' \\cap B') = n(U) - n(A \\cup B)$"],
        ["Disjoint sets", "$n(A \\cup B) = n(A) + n(B)$"],
      ],
    },
    {
      type: "interactive",
      config: {
        component: "srf-venn-diagram",
        sets: 2,
        labels: ["A: tea", "B: coffee"],
        universeLabel: "Class",
        counts: { "": 5, A: 15, B: 10, AB: 15 },
        expressions: [
          { expr: "A", latex: "A" },
          { expr: "A|B", latex: "A \\cup B" },
          { expr: "A-B", latex: "A - B" },
          { expr: "A^B", latex: "A \\,\\Delta\\, B" },
          { expr: "(A|B)'", latex: "(A \\cup B)'" },
        ],
        initialExpression: 1,
        showInclusionExclusion: true,
        caption:
          "45 students: 30 drink tea, 25 drink coffee, 15 drink both and 5 drink neither. Shade each expression and check the total against the formula in the table.",
      },
    },
    { type: "heading", text: "Worked examples" },
    {
      type: "worked-example",
      id: "srf1-4-we1",
      title: "Worked example 1: a class survey",
      problem:
        "In a class of 50, 30 study Maths, 25 study Physics and 10 study both. How many study at least one, neither, and exactly one of the subjects?",
      steps: [
        { text: "At least one is the union.", latex: "n(M \\cup P) = 30 + 25 - 10 = 45" },
        { text: "Neither is everyone else: $50 - 45 = 5$." },
        { text: "Exactly one: Maths only $30 - 10 = 20$, Physics only $25 - 10 = 15$, total 35. *Why this step:* the formula $n(M) + n(P) - 2n(M \\cap P) = 55 - 20 = 35$ agrees." },
      ],
      answer: "At least one: 45; neither: 5; exactly one: 35.",
    },
    {
      type: "worked-example",
      id: "srf1-4-we2",
      title: "Worked example 2: running the formula backwards",
      problem: "$n(A) = 40$, $n(B) = 26$ and $n(A \\cup B) = 50$. Find $n(A \\cap B)$ and $n(A - B)$.",
      steps: [
        { text: "Rearrange the union formula:", latex: "n(A \\cap B) = n(A) + n(B) - n(A \\cup B) = 40 + 26 - 50 = 16" },
        { text: "Then $n(A - B) = 40 - 16 = 24$." },
      ],
      answer: "$n(A \\cap B) = 16$, $n(A - B) = 24$.",
    },
    { type: "heading", text: "How big can the overlap be?" },
    {
      type: "text",
      content:
        "Often the overlap is **not** given and the question asks for its possible values. Two facts pin it down. The overlap fits inside each set, so $n(A \\cap B) \\le \\min(n(A), n(B))$. And the union fits inside $U$, so $n(A) + n(B) - n(A \\cap B) \\le n(U)$.",
    },
    {
      type: "math",
      latex: "\\max\\left(0,\\ n(A) + n(B) - n(U)\\right) \\le n(A \\cap B) \\le \\min\\left(n(A), n(B)\\right)",
    },
    {
      type: "worked-example",
      id: "srf1-4-we3",
      title: "Worked example 3: bounds from percentages",
      problem: "60% of a town reads a Hindi paper and 55% reads an English paper. Between what limits does the percentage reading both lie?",
      steps: [
        { text: "Upper limit: the overlap cannot exceed the smaller group, 55% (every English reader also reads Hindi)." },
        { text: "Lower limit: the union is at most 100%, so $60 + 55 - x \\le 100$, giving $x \\ge 15$." },
        { text: "Both extremes are possible, and so is everything between." },
      ],
      answer: "Between 15% and 55%.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"just add the two counts\"",
      content:
        "$n(A) + n(B)$ counts the overlap twice. It equals $n(A \\cup B)$ only for disjoint sets. A quick sanity check: if your \"union\" is bigger than the whole population, you have double counted.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"30 drink tea\" means 30 drink only tea",
      content:
        "In survey language \"30 drink tea\" is $n(A)$, which includes the tea-and-coffee drinkers. \"Only tea\" or \"tea but not coffee\" is $n(A - B)$. Reading $n(A)$ as a region count is the most common error in these problems.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "srf1-4-q1",
      variant: "practice",
      question: "$n(A) = 25$, $n(B) = 18$ and $n(A \\cap B) = 7$. Find $n(A \\cup B)$.",
      answer: 36,
      hint: "Add, then subtract the overlap once.",
      solution: "$n(A \\cup B) = 25 + 18 - 7 = 36$.",
      commonMistakes: [
        { answer: 43, feedback: "That double-counts the 7 shared elements." },
        { answer: 29, feedback: "Subtract the overlap once, not twice. $43 - 14 = 29$ is the number in exactly one set." },
      ],
    },
    {
      type: "numeric",
      id: "srf1-4-q2",
      variant: "practice",
      question: "$n(U) = 60$, $n(A) = 35$, $n(B) = 30$ and $n(A \\cap B) = 15$. How many elements of $U$ are in neither $A$ nor $B$?",
      answer: 10,
      hint: "Neither = everything minus the union.",
      solution: "$n(A \\cup B) = 35 + 30 - 15 = 50$, so neither $= 60 - 50 = 10$.",
      commonMistakes: [{ answer: -5, feedback: "You subtracted $35 + 30$ from 60 without adding back the overlap." }],
    },
    {
      type: "numeric",
      id: "srf1-4-q3",
      variant: "practice",
      question: "$n(A \\cup B) = 70$, $n(A) = 45$ and $n(B) = 40$. Find $n(A \\cap B)$.",
      answer: 15,
      hint: "Solve the union formula for the overlap.",
      solution: "$n(A \\cap B) = 45 + 40 - 70 = 15$.",
    },
    {
      type: "quiz",
      id: "srf1-4-q4",
      variant: "concept",
      question: "Which expression counts the elements in **exactly one** of $A$ and $B$?",
      options: [
        { text: "$n(A) + n(B) - 2n(A \\cap B)$", correct: true, feedback: "The overlap is counted twice in $n(A) + n(B)$ and must be removed completely." },
        { text: "$n(A) + n(B) - n(A \\cap B)$", feedback: "That is $n(A \\cup B)$, which still includes the overlap once." },
        { text: "$n(A \\cup B) + n(A \\cap B)$", feedback: "That adds the overlap instead of removing it." },
        { text: "$n(A) - n(B)$", feedback: "That is not even a count of any region in general (it can be negative)." },
      ],
      hint: "Exactly one = union minus the overlap.",
    },
    {
      type: "numeric",
      id: "srf1-4-q5",
      variant: "practice",
      question:
        "In a group of 65 people, everyone likes at least one of cricket and tennis. 40 like cricket and 10 like both. How many like tennis?",
      answer: 35,
      hint: "The union is the whole group, 65.",
      solution: "$65 = 40 + n(T) - 10$, so $n(T) = 35$. (Of these, $35 - 10 = 25$ like only tennis.)",
      commonMistakes: [
        { answer: 25, feedback: "That is the number who like **only** tennis. The 10 who like both also like tennis." },
        { answer: 15, feedback: "Add the overlap back: $65 - 40 + 10$." },
      ],
    },
    {
      type: "quiz",
      id: "srf1-4-q6",
      variant: "practice",
      multiple: true,
      question:
        "$n(U) = 50$, $n(A) = 30$ and $n(B) = 35$. Which values are possible for $n(A \\cap B)$? Select all that apply.",
      options: [
        { text: "10", feedback: "Then $n(A \\cup B) = 55 > 50$: impossible." },
        { text: "15", correct: true, feedback: "The minimum: $30 + 35 - 50 = 15$, with $A \\cup B = U$." },
        { text: "22", correct: true, feedback: "Any integer between 15 and 30 is possible." },
        { text: "30", correct: true, feedback: "The maximum: $A \\subseteq B$." },
        { text: "32", feedback: "The overlap cannot exceed $n(A) = 30$." },
      ],
      hint: "Use $\\max(0, n(A) + n(B) - n(U)) \\le n(A \\cap B) \\le \\min(n(A), n(B))$.",
    },
    {
      type: "numeric",
      id: "srf1-4-q7",
      variant: "practice",
      question:
        "JEE style. Of 100 students, 70 like mathematics and 55 like music. What is the **least** possible number who like both?",
      answer: 25,
      hint: "The union cannot exceed 100.",
      solution: "$70 + 55 - x \\le 100$ gives $x \\ge 25$. It is attained when nobody dislikes both.",
      commonMistakes: [
        { answer: 55, feedback: "That is the **greatest** possible overlap." },
        { answer: 0, feedback: "With $70 + 55 = 125 > 100$, at least 25 students must be in both." },
      ],
    },
    {
      type: "numeric",
      id: "srf1-4-q8",
      variant: "practice",
      question:
        "In the same class (100 students, 70 like mathematics, 55 like music), what is the **greatest** possible number who like exactly one of the two?",
      answer: 75,
      hint: "Exactly one $= 70 + 55 - 2x$. Which value of $x$ makes it largest?",
      solution: "Exactly one $= 125 - 2x$ is largest when $x$ is smallest, $x = 25$: $125 - 50 = 75$.",
      commonMistakes: [
        { answer: 15, feedback: "That uses the largest overlap, 55, which gives the **least** number in exactly one." },
        { answer: 100, feedback: "At least 25 students like both, so they are not in exactly one." },
      ],
    },
    {
      type: "quiz",
      id: "srf1-4-q9",
      variant: "practice",
      multiple: true,
      question: "JEE style. $n(A) = 4$ and $n(B) = 6$, with no other information. Which values can $n(A \\cup B)$ take? Select all that apply.",
      options: [
        { text: "5", feedback: "The union contains $B$, so it has at least 6 elements." },
        { text: "6", correct: true, feedback: "When $A \\subseteq B$." },
        { text: "8", correct: true, feedback: "When the overlap has 2 elements." },
        { text: "10", correct: true, feedback: "When $A$ and $B$ are disjoint." },
        { text: "11", feedback: "At most $4 + 6 = 10$." },
      ],
      hint: "The overlap can be anything from 0 to 4.",
    },
    {
      type: "numeric",
      id: "srf1-4-q10",
      variant: "practice",
      question: "JEE style. How many integers from 1 to 300 are divisible by 3 or by 7?",
      answer: 128,
      hint: "Divisible by both 3 and 7 means divisible by 21.",
      solution: "$\\lfloor 300/3 \\rfloor = 100$, $\\lfloor 300/7 \\rfloor = 42$, $\\lfloor 300/21 \\rfloor = 14$. So $100 + 42 - 14 = 128$.",
      commonMistakes: [
        { answer: 142, feedback: "The 14 multiples of 21 were counted twice." },
        { answer: 114, feedback: "Subtract the multiples of 21 once only." },
      ],
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "three-sets-inclusion-exclusion",
  title: "1.5 · Three Sets and Inclusion–Exclusion",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "With three sets the double counting gets worse. Add $n(A) + n(B) + n(C)$ and anything in two sets is counted twice, anything in all three is counted three times. Subtracting the three pairwise overlaps fixes the first problem but overshoots on the second. The cure is a pattern that generalises to any number of sets: **add the singles, subtract the pairs, add back the triple.**",
    },
    { type: "heading", text: "The three-set formula" },
    {
      type: "math",
      latex:
        "n(A \\cup B \\cup C) = n(A) + n(B) + n(C) - n(A \\cap B) - n(B \\cap C) - n(C \\cap A) + n(A \\cap B \\cap C)",
    },
    {
      type: "text",
      content:
        "Write $S_1$ for the sum of the three single counts, $S_2$ for the sum of the three pairwise intersections and $S_3 = n(A \\cap B \\cap C)$. The formula is $n(A \\cup B \\cup C) = S_1 - S_2 + S_3$. To see why it is right, ask how many times each region is counted.",
    },
    {
      type: "table",
      headers: ["An element lying in", "Counted in $S_1$", "in $S_2$", "in $S_3$", "Net $S_1 - S_2 + S_3$"],
      rows: [
        ["exactly one set", "1", "0", "0", "1"],
        ["exactly two sets", "2", "1", "0", "1"],
        ["all three sets", "3", "3", "1", "1"],
        ["no set", "0", "0", "0", "0"],
      ],
    },
    {
      type: "text",
      content:
        "Every element of the union is counted exactly once, and nothing outside is counted at all. That is the whole proof. The same bookkeeping gives formulas for the \"exactly\" counts, writing $E_k$ for the number of elements in exactly $k$ of the sets.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Exactly-k counts for three sets",
      content:
        "- Exactly three: $E_3 = S_3$\n- Exactly two: $E_2 = S_2 - 3S_3$ (each triple element sits in all three pairwise intersections)\n- Exactly one: $E_1 = S_1 - 2S_2 + 3S_3$\n- At least two: $E_2 + E_3 = S_2 - 2S_3$",
    },
    {
      type: "interactive",
      config: {
        component: "srf-venn-diagram",
        sets: 3,
        counts: { "": 6, A: 3, B: 6, C: 11, AB: 6, AC: 4, BC: 6, ABC: 8 },
        expressions: [
          { expr: "A|B|C", latex: "A \\cup B \\cup C" },
          { expr: "A&B", latex: "A \\cap B" },
          { expr: "(A&B)-C", latex: "(A \\cap B) - C" },
          { expr: "(A-B-C)|(B-A-C)|(C-A-B)", latex: "\\text{exactly one}" },
          { expr: "((A&B)|(B&C)|(A&C))-(A&B&C)", latex: "\\text{exactly two}" },
          { expr: "(A|B|C)'", latex: "\\text{none}" },
        ],
        initialExpression: 0,
        showInclusionExclusion: true,
        caption:
          "A survey of 50 people about three products. Shade $A \\cap B$ and notice it has two regions (6 + 8): it is **not** \"exactly $A$ and $B$\". Then shade \"exactly one\" and check $S_1 - 2S_2 + 3S_3$.",
      },
    },
    { type: "heading", text: "The region-filling method" },
    {
      type: "text",
      content:
        "For a full survey problem, fill the diagram **from the centre outwards**: the triple region first, then each \"two sets only\" region (pairwise count minus the centre), then each \"one set only\" region (single count minus everything already inside that circle). Each step uses only numbers already found.",
    },
    {
      type: "worked-example",
      id: "srf1-5-we1",
      title: "Worked example 1: fill the diagram",
      problem:
        "In a survey of 50 people, 21 use product A, 26 use B and 29 use C. 14 use A and B, 12 use A and C, 14 use B and C, and 8 use all three. How many use exactly one product, and how many use none?",
      steps: [
        { text: "Centre: $n(A \\cap B \\cap C) = 8$." },
        { text: "Two-only regions: A and B only $14 - 8 = 6$; A and C only $12 - 8 = 4$; B and C only $14 - 8 = 6$." },
        { text: "One-only regions: A only $21 - 6 - 4 - 8 = 3$; B only $26 - 6 - 6 - 8 = 6$; C only $29 - 4 - 6 - 8 = 11$." },
        { text: "Exactly one: $3 + 6 + 11 = 20$. Check with the formula: $S_1 - 2S_2 + 3S_3 = 76 - 80 + 24 = 20$." },
        { text: "Union: $S_1 - S_2 + S_3 = 76 - 40 + 8 = 44$, so none $= 50 - 44 = 6$." },
      ],
      answer: "Exactly one product: 20 people; none: 6 people.",
    },
    {
      type: "worked-example",
      id: "srf1-5-we2",
      title: "Worked example 2: divisibility",
      problem: "How many integers from 1 to 1000 are divisible by 2, 3 or 5? How many by none of them?",
      steps: [
        { text: "Let $A$, $B$, $C$ be the multiples of 2, 3, 5. A number is in two of them exactly when it is divisible by the product (2, 3, 5 are coprime)." },
        { text: "Singles: $500 + 333 + 200 = 1033$." },
        { text: "Pairs: multiples of 6, 10, 15: $166 + 100 + 66 = 332$." },
        { text: "Triple: multiples of 30: $\\lfloor 1000/30 \\rfloor = 33$." },
        { latex: "n(A \\cup B \\cup C) = 1033 - 332 + 33 = 734" },
        { text: "None: $1000 - 734 = 266$." },
      ],
      answer: "734 are divisible by 2, 3 or 5; 266 by none of them.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"$n(A \\cap B)$ means in exactly $A$ and $B$\"",
      content:
        "$A \\cap B$ includes the centre region, the elements in $C$ as well. \"Exactly $A$ and $B$\" (or \"$A$ and $B$ only\") is $n(A \\cap B) - n(A \\cap B \\cap C)$. Survey questions say \"14 use A and B\" and mean the full intersection, centre included.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"exactly one $= S_1 - S_2 + S_3$\"",
      content:
        "That is **at least** one. The exactly-one count must also remove the two-set and three-set elements entirely: $E_1 = S_1 - 2S_2 + 3S_3$. When in doubt, fill the regions and add.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "srf1-5-q1",
      variant: "practice",
      question:
        "$n(A) = 20$, $n(B) = 18$, $n(C) = 15$, $n(A \\cap B) = 7$, $n(B \\cap C) = 6$, $n(A \\cap C) = 5$ and $n(A \\cap B \\cap C) = 3$. Find $n(A \\cup B \\cup C)$.",
      answer: 38,
      hint: "Singles minus pairs plus the triple.",
      solution: "$S_1 = 53$, $S_2 = 18$, $S_3 = 3$. $n(A \\cup B \\cup C) = 53 - 18 + 3 = 38$.",
      commonMistakes: [
        { answer: 35, feedback: "You forgot to add back the triple, which the pairs removed three times." },
        { answer: 41, feedback: "Add the triple back once, not twice." },
      ],
    },
    {
      type: "numeric",
      id: "srf1-5-q2",
      variant: "practice",
      question: "With the same data, how many elements lie in exactly two of the sets?",
      answer: 9,
      hint: "Each pairwise intersection contains the centre, so the centre was counted three times in $S_2$.",
      solution: "$E_2 = S_2 - 3S_3 = 18 - 9 = 9$. Region by region: $(7 - 3) + (6 - 3) + (5 - 3) = 4 + 3 + 2 = 9$.",
      commonMistakes: [
        { answer: 18, feedback: "That is $S_2$, which includes the triple region three times." },
        { answer: 15, feedback: "Subtract the triple once from **each** pair: $3 \\times 3 = 9$ in total." },
      ],
    },
    {
      type: "numeric",
      id: "srf1-5-q3",
      variant: "practice",
      question: "With the same data, how many elements lie in exactly one of the sets?",
      answer: 26,
      hint: "Use $E_1 = S_1 - 2S_2 + 3S_3$, or subtract $E_2$ and $E_3$ from the union.",
      solution: "$E_1 = 53 - 36 + 9 = 26$. Check: $E_1 + E_2 + E_3 = 26 + 9 + 3 = 38$, the union.",
      commonMistakes: [{ answer: 38, feedback: "38 is the union, which includes the 9 + 3 elements in two or three sets." }],
    },
    {
      type: "quiz",
      id: "srf1-5-q4",
      variant: "concept",
      question: "An element lies in all three sets $A$, $B$, $C$. How many times is it counted in $S_2 = n(A \\cap B) + n(B \\cap C) + n(C \\cap A)$?",
      options: [
        { text: "3", correct: true, feedback: "It is in all three pairwise intersections. That is why $S_1 - S_2$ counts it $3 - 3 = 0$ times and the triple must be added back." },
        { text: "1", feedback: "Check each of the three intersections: it is in every one." },
        { text: "2", feedback: "There are three pairs, and it belongs to each." },
        { text: "0", feedback: "Being in all three sets, it is certainly in each pair's overlap." },
      ],
      hint: "List the three pairwise intersections and test membership in each.",
    },
    {
      type: "numeric",
      id: "srf1-5-q5",
      variant: "practice",
      question: "How many integers from 1 to 100 are divisible by 2, 3 or 5?",
      answer: 74,
      hint: "Pairs are multiples of 6, 10, 15; the triple is multiples of 30.",
      solution: "$50 + 33 + 20 - 16 - 10 - 6 + 3 = 74$.",
      commonMistakes: [
        { answer: 71, feedback: "Add back the 3 multiples of 30." },
        { answer: 103, feedback: "Subtract the overlaps (multiples of 6, 10 and 15)." },
      ],
    },
    {
      type: "numeric",
      id: "srf1-5-q6",
      variant: "practice",
      question: "How many integers from 1 to 1000 are divisible by **none** of 2, 3 and 5?",
      answer: 266,
      hint: "Find how many are divisible by at least one, then take the complement.",
      solution: "From Worked example 2, 734 are divisible by at least one, so $1000 - 734 = 266$ are divisible by none.",
      commonMistakes: [{ answer: 734, feedback: "That is the number divisible by at least one of them." }],
    },
    {
      type: "quiz",
      id: "srf1-5-q7",
      variant: "practice",
      multiple: true,
      question: "With $S_1$, $S_2$, $S_3$ as defined in this lesson, which formulas are correct for three sets? Select all that apply.",
      options: [
        { text: "Exactly two $= S_2 - 3S_3$", correct: true, feedback: "The centre sits in all three pairwise intersections." },
        { text: "At least two $= S_2 - 2S_3$", correct: true, feedback: "$E_2 + E_3 = (S_2 - 3S_3) + S_3$." },
        { text: "Exactly one $= S_1 - S_2 + S_3$", feedback: "That is the union (at least one)." },
        { text: "Exactly three $= S_3$", correct: true, feedback: "The triple intersection is precisely the elements in all three." },
      ],
      hint: "For each formula, count how many times it counts an element in exactly 1, 2 and 3 sets.",
    },
    {
      type: "quiz",
      id: "srf1-5-q8",
      variant: "practice",
      question: "Which expression equals $n\\left(A \\cap (B \\cup C)\\right)$?",
      options: [
        { text: "$n(A \\cap B) + n(A \\cap C) - n(A \\cap B \\cap C)$", correct: true, feedback: "Distribute: $A \\cap (B \\cup C) = (A \\cap B) \\cup (A \\cap C)$, then apply the two-set formula. The overlap of the two pieces is $A \\cap B \\cap C$." },
        { text: "$n(A \\cap B) + n(A \\cap C)$", feedback: "Elements in all three sets are counted twice." },
        { text: "$n(A) + n(B \\cup C) - n(A \\cap B \\cap C)$", feedback: "That mixes a union-type formula with the wrong correction term." },
        { text: "$n(A) - n(B \\cap C)$", feedback: "Not a valid count: $B \\cap C$ need not lie inside $A$." },
      ],
      hint: "Use the distributive law, then the two-set inclusion–exclusion formula.",
    },
    {
      type: "numeric",
      id: "srf1-5-q9",
      variant: "practice",
      question:
        "JEE style. Sets $A$, $B$, $C$ each have 10 elements, and each pairwise intersection has 4 elements. What is the **largest** possible value of $n(A \\cup B \\cup C)$?",
      answer: 22,
      hint: "Write $t = n(A \\cap B \\cap C)$. The union is $30 - 12 + t$. How large can $t$ be?",
      solution:
        "$n(A \\cup B \\cup C) = 30 - 12 + t = 18 + t$. The triple lies inside each pairwise intersection, so $t \\le 4$. With $t = 4$ every region count is non-negative (each two-only region is 0, each one-only region is $10 - 4 = 6$), so the maximum union is $18 + 4 = 22$.",
      commonMistakes: [
        { answer: 18, feedback: "That is the smallest value, with $t = 0$. The union grows with $t$." },
        { answer: 30, feedback: "The pairwise overlaps are given as 4 each, so the sets cannot be disjoint." },
      ],
    },
    {
      type: "numeric",
      id: "srf1-5-q10",
      variant: "practice",
      question:
        "JEE style. In a town of 10,000 families, 40% buy newspaper A, 20% buy B and 10% buy C. 5% buy A and B, 3% buy B and C, 4% buy A and C, and 2% buy all three. How many families buy **only** A?",
      answer: 3300,
      hint: "Only A = $n(A)$ minus the two two-only regions touching A minus the centre.",
      solution:
        "Only A $= 40 - (5 - 2) - (4 - 2) - 2 = 40 - 5 - 4 + 2 = 33\\%$, which is 3300 families.",
      commonMistakes: [
        { answer: 3100, feedback: "You subtracted 5% and 4% but forgot that the 2% buying all three was subtracted twice. Add it back once." },
        { answer: 4000, feedback: "That is everyone who buys A, including those who also buy B or C." },
      ],
    },
    {
      type: "numeric",
      id: "srf1-5-q11",
      variant: "practice",
      question: "In the same town, how many families buy **none** of the three newspapers?",
      answer: 4000,
      hint: "Find the union percentage first.",
      solution: "Union $= 40 + 20 + 10 - 5 - 3 - 4 + 2 = 60\\%$. None $= 40\\%$, which is 4000 families.",
      commonMistakes: [
        { answer: 3800, feedback: "Add the 2% buying all three back after subtracting the pairs." },
        { answer: 3000, feedback: "Adding 40 + 20 + 10 = 70% ignores the overlaps." },
      ],
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "survey-problems-and-jee-set-puzzles",
  title: "1.6 · Survey Problems and JEE Set Puzzles",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "Survey problems are not about new formulas. They are about **translation**: turning sentences like \"watch football but not hockey\" into regions, then filling the diagram in an order where every number is already known. Most mistakes happen in the translation, not in the arithmetic.",
    },
    { type: "heading", text: "From words to regions" },
    {
      type: "table",
      headers: ["Phrase", "Set", "Count"],
      rows: [
        ["\"like A\"", "$A$", "$n(A)$, all of circle $A$"],
        ["\"like A and B\"", "$A \\cap B$", "includes those who also like C"],
        ["\"like A and B only\" / \"exactly A and B\"", "$(A \\cap B) - C$", "$n(A \\cap B) - n(A \\cap B \\cap C)$"],
        ["\"like A but not B\"", "$A - B$", "$n(A) - n(A \\cap B)$"],
        ["\"like only A\"", "$A - (B \\cup C)$", "circle $A$ minus all its overlaps"],
        ["\"like at least one\"", "$A \\cup B \\cup C$", "inclusion–exclusion"],
        ["\"like none\" / \"neither\"", "$(A \\cup B \\cup C)'$", "$n(U) - n(A \\cup B \\cup C)$"],
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "The survey recipe",
      content:
        "1. Name the sets and the universe (the total surveyed).\n2. Translate every given number into a set from the table.\n3. Fill regions from the centre outwards, or set the unknown as $x$ and fill in terms of $x$.\n4. Use the total to find $x$.\n5. Check every region is a non-negative integer. A negative region means the data are inconsistent.",
    },
    { type: "heading", text: "Worked examples" },
    {
      type: "worked-example",
      id: "srf1-6-we1",
      title: "Worked example 1: the unknown is in the centre",
      problem:
        "500 TV viewers were surveyed. 285 watch football, 195 watch hockey and 115 watch basketball. 70 watch football and hockey, 45 football and basketball, 50 hockey and basketball. 50 watch none of the three. How many watch all three, and how many watch football only?",
      steps: [
        { text: "Let $t$ = number watching all three. Those watching at least one: $500 - 50 = 450$." },
        { text: "Inclusion–exclusion:", latex: "450 = (285 + 195 + 115) - (70 + 45 + 50) + t = 595 - 165 + t" },
        { text: "So $t = 450 - 430 = 20$." },
        { text: "Football only $= 285 - (70 - 20) - (45 - 20) - 20 = 285 - 50 - 25 - 20 = 190$." },
      ],
      answer: "20 watch all three; 190 watch football only.",
    },
    {
      type: "interactive",
      config: {
        component: "srf-venn-diagram",
        sets: 3,
        labels: ["Football", "Hockey", "Basketball"],
        universeLabel: "Viewers",
        counts: { "": 50, A: 190, B: 95, C: 40, AB: 50, AC: 25, BC: 30, ABC: 20 },
        expressions: [
          { expr: "A|B|C", latex: "A \\cup B \\cup C" },
          { expr: "A-(B|C)", latex: "A - (B \\cup C)" },
          { expr: "A&B", latex: "A \\cap B" },
          { expr: "(A&B)-C", latex: "(A \\cap B) - C" },
          { expr: "B-A", latex: "B - A" },
        ],
        initialExpression: 0,
        showInclusionExclusion: true,
        caption:
          "The filled diagram for Worked example 1 ($A$ = football, $B$ = hockey, $C$ = basketball). Check that each given number is the total of the right regions: \"70 watch football and hockey\" is $50 + 20$.",
      },
    },
    {
      type: "worked-example",
      id: "srf1-6-we2",
      title: "Worked example 2: bounds on an overlap",
      problem:
        "In a group, 63% like cheese and 76% like apples. If $x$% like both, find all possible values of $x$.",
      steps: [
        { text: "Upper bound: the overlap is inside the cheese group, so $x \\le 63$." },
        { text: "Lower bound: $n(\\text{union}) = 63 + 76 - x \\le 100$, so $x \\ge 39$." },
        { text: "Every value in between can occur (move people between \"apples only\" and \"both\")." },
      ],
      answer: "$39 \\le x \\le 63$.",
    },
    {
      type: "worked-example",
      id: "srf1-6-we3",
      title: "Worked example 3: catching inconsistent data",
      problem:
        "A report says: of 100 students, 70 passed Maths, 50 passed Physics, 15 passed both and 5 failed both. Can the report be right?",
      steps: [
        { text: "Passed at least one $= 70 + 50 - 15 = 105$." },
        { text: "That exceeds the 100 students surveyed, before even counting the 5 who failed both. Equivalently, the region \"failed both\" would be $100 - 105 = -5$." },
      ],
      answer: "No: the data force a negative region, so at least one figure is wrong.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"every survey number is a region count\"",
      content:
        "\"70 watch football and hockey\" is not the football-and-hockey-only region; it is the whole lens, centre included. Only phrases with \"only\", \"exactly\" or \"but not\" name single regions. Writing a given number straight into a region of the diagram is the classic slip that makes every later region wrong.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "srf1-6-q1",
      variant: "practice",
      question: "In a survey, $T$ = people who like tea and $C$ = people who like coffee. \"People who like tea but not coffee\" is",
      options: [
        { text: "$T - C$", correct: true, feedback: "In $T$ and not in $C$." },
        { text: "$T \\cap C$", feedback: "That is people who like both." },
        { text: "$C - T$", feedback: "That is coffee but not tea." },
        { text: "$T \\cup C'$", feedback: "That also includes people who like neither." },
      ],
      hint: "\"but not\" removes the second set.",
    },
    {
      type: "numeric",
      id: "srf1-6-q2",
      variant: "practice",
      question: "63% of a group like cheese and 76% like apples. What is the **largest** possible percentage who like both?",
      answer: 63,
      unit: "%",
      hint: "The overlap fits inside the smaller group.",
      solution: "The overlap cannot exceed 63%, and 63% is achieved when every cheese lover also likes apples (the union is then 76%).",
      commonMistakes: [{ answer: 39, feedback: "That is the smallest possible overlap." }],
    },
    {
      type: "numeric",
      id: "srf1-6-q3",
      variant: "practice",
      question:
        "In a group of 50 students, 22 study French, 25 German and 20 Spanish. 8 study French and German, 7 German and Spanish, 6 French and Spanish, and 3 study all three. How many study none of the three?",
      answer: 1,
      hint: "Find the union by inclusion–exclusion.",
      solution: "Union $= 67 - 21 + 3 = 49$, so none $= 50 - 49 = 1$.",
      commonMistakes: [
        { answer: 4, feedback: "Add the 3 students in all three languages back after subtracting the pairs." },
        { answer: 0, feedback: "Recompute: $22 + 25 + 20 = 67$, pairs $8 + 7 + 6 = 21$, triple 3." },
      ],
    },
    {
      type: "numeric",
      id: "srf1-6-q4",
      variant: "practice",
      question: "In the same group, how many students study exactly one language?",
      answer: 34,
      hint: "$E_1 = S_1 - 2S_2 + 3S_3$.",
      solution: "$E_1 = 67 - 42 + 9 = 34$. Region by region: French only $22 - 5 - 3 - 3 = 11$, German only $25 - 5 - 4 - 3 = 13$, Spanish only $20 - 4 - 3 - 3 = 10$; total 34.",
      commonMistakes: [{ answer: 49, feedback: "That is the number studying at least one language." }],
    },
    {
      type: "quiz",
      id: "srf1-6-q5",
      variant: "concept",
      question: "Each report below describes 100 students and two subjects. Which report **must** contain an error?",
      options: [
        { text: "70 passed Maths, 50 passed Physics, 15 passed both", correct: true, feedback: "At least one would be $105 > 100$." },
        { text: "60 passed Maths, 50 passed Physics, 30 passed both", feedback: "At least one is 80, leaving 20 who failed both. Consistent." },
        { text: "40 passed Maths, 30 passed Physics, 0 passed both", feedback: "At least one is 70. Consistent." },
        { text: "90 passed Maths, 90 passed Physics, 85 passed both", feedback: "At least one is 95 and $85 \\le 90$. Consistent." },
      ],
      hint: "Compute $n(M \\cup P)$ for each report and compare with 100.",
    },
    {
      type: "quiz",
      id: "srf1-6-q6",
      variant: "practice",
      multiple: true,
      question:
        "JEE style. In an exam, 55% of the candidates passed Physics and 67% passed Chemistry, and every candidate passed at least one of the two. Which statements are true? Select all that apply.",
      options: [
        { text: "22% passed both", correct: true, feedback: "$55 + 67 - x = 100$ gives $x = 22$." },
        { text: "33% passed only Physics", correct: true, feedback: "$55 - 22 = 33$." },
        { text: "45% passed only Chemistry", correct: true, feedback: "$67 - 22 = 45$." },
        { text: "45% passed only Physics", feedback: "Only Physics is $55 - 22 = 33\\%$." },
      ],
      hint: "\"Every candidate passed at least one\" means the union is 100%.",
    },
    {
      type: "numeric",
      id: "srf1-6-q7",
      variant: "practice",
      question:
        "JEE style. 400 people were surveyed about news, sports and movie channels. 230 watch news, 160 sports and 120 movies. 60 watch news and sports, 50 sports and movies, 40 news and movies. 30 watch none. How many watch all three?",
      answer: 10,
      hint: "Let $t$ be the triple; the union is $400 - 30$.",
      solution: "$370 = 510 - 150 + t$, so $t = 10$.",
      commonMistakes: [
        { answer: 40, feedback: "The union is 370, not 400: the 30 who watch none are outside it." },
        { answer: 20, feedback: "Recheck the pair sum: $60 + 50 + 40 = 150$." },
      ],
    },
    {
      type: "numeric",
      id: "srf1-6-q8",
      variant: "practice",
      question: "In the same survey, how many watch **only** news?",
      answer: 140,
      hint: "Subtract both two-only regions touching news and the centre from 230.",
      solution: "News and sports only $= 60 - 10 = 50$; news and movies only $= 40 - 10 = 30$. Only news $= 230 - 50 - 30 - 10 = 140$.",
      commonMistakes: [
        { answer: 130, feedback: "You subtracted 60 and 40 in full, removing the centre twice. Add it back once: $230 - 100 + 10$." },
        { answer: 230, feedback: "That is everyone who watches news." },
      ],
    },
    {
      type: "numeric",
      id: "srf1-6-q9",
      variant: "practice",
      question:
        "JEE style. How many integers from 1 to 1000 are divisible by 4 or by 6, **but not by both**?",
      answer: 250,
      hint: "This is a symmetric difference. Divisible by both 4 and 6 means divisible by $\\operatorname{lcm}(4, 6) = 12$.",
      solution: "Multiples of 4: 250; of 6: 166; of 12: 83. Exactly one $= 250 + 166 - 2(83) = 250$.",
      commonMistakes: [
        { answer: 333, feedback: "That is divisible by 4 **or** 6 (the union). Remove the 83 multiples of 12 too." },
        { answer: 375, feedback: "Both 4 and 6 means a multiple of 12, not of 24." },
      ],
    },
    {
      type: "quiz",
      id: "srf1-6-q10",
      variant: "practice",
      multiple: true,
      question: "For finite sets $A$ and $B$, which conditions on counts alone guarantee $A \\subseteq B$? Select all that apply.",
      options: [
        { text: "$n(A \\cup B) = n(B)$", correct: true, feedback: "Then $n(A - B) = n(A \\cup B) - n(B) = 0$, so nothing of $A$ lies outside $B$." },
        { text: "$n(A \\cap B) = n(A)$", correct: true, feedback: "$A \\cap B \\subseteq A$ with equal size forces $A \\cap B = A$." },
        { text: "$n(A - B) = 0$", correct: true, feedback: "No element of $A$ lies outside $B$." },
        { text: "$n(A) < n(B)$", feedback: "$A = \\{1\\}$, $B = \\{2, 3\\}$: smaller but not inside." },
      ],
      hint: "Each true condition should say \"no element of $A$ lies outside $B$\" in disguise.",
    },
    {
      type: "numeric",
      id: "srf1-6-q11",
      variant: "practice",
      question: "JEE style. In a class, 40 students play cricket, 30 play football and 25 play both. Everybody plays at least one of the two. How many students play exactly one game?",
      answer: 20,
      hint: "Exactly one $= n(C) + n(F) - 2n(C \\cap F)$.",
      solution: "$40 + 30 - 50 = 20$ (cricket only 15, football only 5). The class has $40 + 30 - 25 = 45$ students.",
      commonMistakes: [
        { answer: 45, feedback: "That is the class size: those who play at least one." },
        { answer: 70, feedback: "Adding 40 and 30 counts the 25 who play both twice." },
      ],
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-1-mastery",
  title: "1.7 · Chapter 1 Mastery",
  position: 7,
  blocks: blocks([
    {
      type: "text",
      content:
        "Every question below comes back to one idea: **an expression is a choice of Venn regions, and a count is a sum over regions.** Rewrite differences as intersections with complements, use De Morgan to push complements inside, and count by inclusion–exclusion or by filling the diagram from the centre.",
    },
    { type: "heading", text: "The chapter on one card" },
    {
      type: "table",
      headers: ["Tool", "Statement"],
      rows: [
        ["Difference", "$A - B = A \\cap B'$"],
        ["De Morgan", "$(A \\cup B)' = A' \\cap B'$, $(A \\cap B)' = A' \\cup B'$"],
        ["Distributive", "$A \\cap (B \\cup C) = (A \\cap B) \\cup (A \\cap C)$ and dually"],
        ["Two sets", "$n(A \\cup B) = n(A) + n(B) - n(A \\cap B)$"],
        ["Three sets", "$S_1 - S_2 + S_3$; exactly two $S_2 - 3S_3$; exactly one $S_1 - 2S_2 + 3S_3$"],
        ["Overlap bounds", "$\\max(0, n(A) + n(B) - n(U)) \\le n(A \\cap B) \\le \\min(n(A), n(B))$"],
      ],
    },
    { type: "heading", text: "Mastery questions" },
    {
      type: "quiz",
      id: "srf1-7-q1",
      variant: "mastery",
      question: "Simplify $(A \\cup B)' \\cup (A' \\cap B)$.",
      options: [
        { text: "$A'$", correct: true, feedback: "$(A' \\cap B') \\cup (A' \\cap B) = A' \\cap (B' \\cup B) = A'$." },
        { text: "$B$", feedback: "Both pieces lie outside $A$, so the result is a subset of $A'$; and it is all of $A'$." },
        { text: "$A' \\cap B'$", feedback: "That is just the first piece. The second adds $B - A$." },
        { text: "$U$", feedback: "Nothing in $A$ appears in either piece." },
      ],
      hint: "Apply De Morgan to the first piece, then factor out $A'$.",
    },
    {
      type: "quiz",
      id: "srf1-7-q2",
      variant: "mastery",
      multiple: true,
      question: "Which of the following are identities for all sets $A$, $B$? Select all that apply.",
      options: [
        { text: "$A - (A - B) = A \\cap B$", correct: true, feedback: "Removing from $A$ its part outside $B$ leaves its part inside $B$." },
        { text: "$(A - B) \\cup B = A \\cup B$", correct: true, feedback: "$(A \\cap B') \\cup B = (A \\cup B) \\cap (B' \\cup B) = A \\cup B$." },
        { text: "$(A \\cup B) - A = B$", feedback: "$(A \\cup B) - A = B - A$, which loses $A \\cap B$." },
        { text: "$A \\,\\Delta\\, (A \\cap B) = A - B$", correct: true, feedback: "$A \\cap B \\subseteq A$, so exactly-one-of means \"in $A$ but not in $A \\cap B$\", which is $A - B$." },
      ],
      hint: "Test each on a two-set diagram region by region: A only, both, B only, outside.",
    },
    {
      type: "numeric",
      id: "srf1-7-q3",
      variant: "mastery",
      question: "$n(U) = 120$, $n(A) = 50$, $n(B) = 70$ and $n(A' \\cap B') = 20$. Find $n(A \\cap B)$.",
      answer: 20,
      hint: "De Morgan turns $A' \\cap B'$ into the complement of $A \\cup B$.",
      solution: "$n(A \\cup B) = 120 - 20 = 100$, so $n(A \\cap B) = 50 + 70 - 100 = 20$.",
      commonMistakes: [{ answer: 0, feedback: "The union is $120 - 20 = 100$, not 120." }],
    },
    {
      type: "numeric",
      id: "srf1-7-q4",
      variant: "mastery",
      question: "With the same data, find $n(A \\,\\Delta\\, B)$.",
      answer: 80,
      hint: "$n(A \\,\\Delta\\, B) = n(A \\cup B) - n(A \\cap B)$.",
      solution: "$100 - 20 = 80$. (Equivalently $50 + 70 - 2(20) = 80$.)",
      commonMistakes: [{ answer: 100, feedback: "That is the union; remove the overlap." }],
    },
    {
      type: "numeric",
      id: "srf1-7-q5",
      variant: "mastery",
      question: "How many integers from 1 to 500 are divisible by 2, 5 or 7?",
      answer: 329,
      hint: "Pairs: multiples of 10, 14, 35. Triple: multiples of 70.",
      solution: "$250 + 100 + 71 - 50 - 35 - 14 + 7 = 329$.",
      commonMistakes: [
        { answer: 322, feedback: "Add back the 7 multiples of 70." },
        { answer: 421, feedback: "Subtract the pairwise overlaps." },
      ],
    },
    {
      type: "numeric",
      id: "srf1-7-q6",
      variant: "mastery",
      question:
        "$n(A) = 40$, $n(B) = 35$, $n(C) = 30$, $n(A \\cap B) = 12$, $n(B \\cap C) = 10$, $n(A \\cap C) = 8$ and $n(A \\cap B \\cap C) = 5$. How many elements lie in exactly two of the sets?",
      answer: 15,
      hint: "$E_2 = S_2 - 3S_3$.",
      solution: "$S_2 = 30$, so $E_2 = 30 - 15 = 15$ (regions $7 + 5 + 3$).",
      commonMistakes: [
        { answer: 30, feedback: "That is $S_2$, which counts the centre three times." },
        { answer: 25, feedback: "Subtract the centre from **each** of the three pairs." },
      ],
    },
    {
      type: "numeric",
      id: "srf1-7-q7",
      variant: "mastery",
      question: "With the same data, find $n(A \\cup B \\cup C)$.",
      answer: 80,
      hint: "$S_1 - S_2 + S_3$.",
      solution: "$105 - 30 + 5 = 80$.",
      commonMistakes: [{ answer: 75, feedback: "Add the triple back." }],
    },
    {
      type: "quiz",
      id: "srf1-7-q8",
      variant: "mastery",
      question: "80% of people in a city drink tea and 70% drink coffee. What can you say about the percentage who drink both?",
      options: [
        { text: "It is at least 50% and at most 70%", correct: true, feedback: "$80 + 70 - x \\le 100$ gives $x \\ge 50$; and $x \\le 70$, the smaller group." },
        { text: "It is exactly 50%", feedback: "50% is only the minimum. Nothing forces the union to be 100%." },
        { text: "It is at most 50%", feedback: "Reversed: 50% is a lower bound." },
        { text: "It can be anything from 0% to 70%", feedback: "Below 50% the union would exceed 100%." },
      ],
      hint: "Upper bound from the smaller group, lower bound from the union being at most 100%.",
    },
    {
      type: "quiz",
      id: "srf1-7-q9",
      variant: "mastery",
      multiple: true,
      question: "Sets satisfy $A \\cap B = A \\cap C$. Which conclusions follow for all such sets? Select all that apply.",
      options: [
        { text: "$A - B = A - C$", correct: true, feedback: "$A - B = A - (A \\cap B) = A - (A \\cap C) = A - C$." },
        { text: "$A \\cap B' = A \\cap C'$", correct: true, feedback: "The same statement as $A - B = A - C$." },
        { text: "$B = C$", feedback: "$A = \\varnothing$ makes the condition hold for any $B$, $C$." },
        { text: "$A \\cup B = A \\cup C$", feedback: "$A = \\{1\\}$, $B = \\{2\\}$, $C = \\{3\\}$: intersections both empty, unions differ." },
      ],
      hint: "The condition only tells you about $B$ and $C$ inside $A$.",
    },
    {
      type: "quiz",
      id: "srf1-7-q10",
      variant: "mastery",
      question:
        "JEE style. Let $X = \\{8^n - 7n - 1 : n \\in \\mathbb{N}\\}$ and $Y = \\{49(n - 1) : n \\in \\mathbb{N}\\}$. Then",
      options: [
        { text: "$X \\subset Y$ (a proper subset)", correct: true, feedback: "$8^n = (1 + 7)^n = 1 + 7n + 49(\\ldots)$, so each element of $X$ is a non-negative multiple of 49. But $98 \\in Y$ while $X = \\{0, 49, 490, \\ldots\\}$ skips it." },
        { text: "$Y \\subset X$", feedback: "$98 = 49 \\times 2$ is in $Y$, but $8^n - 7n - 1$ jumps from 49 ($n = 2$) to 490 ($n = 3$)." },
        { text: "$X = Y$", feedback: "$98 \\in Y$ but $98 \\notin X$." },
        { text: "$X \\cap Y = \\varnothing$", feedback: "$0 = 8 - 7 - 1$ is in both (with $n = 1$)." },
      ],
      hint: "Expand $(1 + 7)^n$ with the binomial theorem.",
    },
    {
      type: "numeric",
      id: "srf1-7-q11",
      variant: "mastery",
      question:
        "Of 200 people, 120 read magazine A, 90 read B and 70 read C. 40 read A and B, 30 read B and C, 35 read A and C, and 15 read all three. How many read **only** C?",
      answer: 20,
      hint: "Only C $= n(C) - [n(B \\cap C) - 15] - [n(A \\cap C) - 15] - 15$.",
      solution: "B and C only $= 15$, A and C only $= 20$. Only C $= 70 - 15 - 20 - 15 = 20$.",
      commonMistakes: [
        { answer: 5, feedback: "Subtracting 30 and 35 in full removes the centre twice; add 15 back once." },
        { answer: 70, feedback: "That is everyone who reads C." },
      ],
    },
    {
      type: "numeric",
      id: "srf1-7-q12",
      variant: "mastery",
      question: "In the same survey, how many people read none of the three magazines?",
      answer: 10,
      hint: "Union by inclusion–exclusion, then subtract from 200.",
      solution: "Union $= 280 - 105 + 15 = 190$, so none $= 200 - 190 = 10$.",
      commonMistakes: [{ answer: 25, feedback: "Add the 15 who read all three back into the union." }],
    },
    {
      type: "quiz",
      id: "srf1-7-q13",
      variant: "mastery",
      question: "For finite sets, $n(A \\cup B \\cup C) = n(A) + n(B) + n(C)$ holds exactly when",
      options: [
        { text: "the sets are pairwise disjoint", correct: true, feedback: "Then every correction term vanishes; and if any pair overlapped, the sum would exceed the union." },
        { text: "$A \\cap B \\cap C = \\varnothing$", feedback: "Two of the sets could still overlap: $A = B = \\{1\\}$, $C = \\varnothing$." },
        { text: "the sets are equal", feedback: "Then the union has $n(A)$ elements, not $3n(A)$ (unless all are empty)." },
        { text: "always", feedback: "$A = B = \\{1\\}$, $C = \\varnothing$: union 1, sum 2." },
      ],
      hint: "$S_1$ exceeds the union by $E_2 + 2E_3$. When is that zero?",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "You can now read, simplify and count any combination of up to three sets. Chapter 2 builds a new kind of set out of ordered pairs, the Cartesian product, and uses its subsets to describe relationships between elements: relations.",
    },
  ]),
};

export const srfChapter1Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lessonMastery,
];
