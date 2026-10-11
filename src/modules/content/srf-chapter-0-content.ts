import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Sets, Relations and Functions Chapter 0 — Sets and Their Language.
 * The vocabulary every later chapter leans on: well-defined collections,
 * roster and set-builder form, the empty set and cardinality, subsets and
 * the in/out argument for 2^n, the power set, and intervals as subsets of R.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "what-a-set-is",
  title: "0.1 · What a Set Is",
  position: 1,
  blocks: blocks([
    {
      type: "text",
      content:
        "Try to collect \"the good movies of 2025\" into one box. You and a friend will disagree about half of them, so the box has no definite contents. Now collect \"the prime numbers below 20\". Anyone, anywhere, puts exactly the same eight numbers in the box: 2, 3, 5, 7, 11, 13, 17, 19. The second collection is a **set**; the first is not. Everything in this course, relations, functions, inverse trig, is built out of sets, so we start by being precise about what one is.",
    },
    { type: "heading", text: "Well-defined collections" },
    {
      type: "callout",
      variant: "definition",
      title: "Set",
      content:
        "A **set** is a well-defined collection of distinct objects, called its **elements** (or members). *Well-defined* means that for any object whatever, there is a definite yes-or-no answer to \"is it in the collection?\".\nWe name sets with capital letters $A, B, C, \\dots$ and write $a \\in A$ for \"$a$ is an element of $A$\" and $a \\notin A$ for \"$a$ is not an element of $A$\".",
    },
    {
      type: "table",
      headers: ["Collection", "A set?", "Why"],
      rows: [
        ["The vowels of the English alphabet", "Yes", "Exactly $a, e, i, o, u$"],
        ["The rivers of India longer than 1000 km", "Yes", "Length is measurable, so membership is definite"],
        ["The most talented students in a class", "No", "\"Talented\" is a matter of opinion"],
        ["The natural numbers less than 1", "Yes", "Nothing qualifies, but that is a definite answer: the empty set (lesson 0.2)"],
        ["The large numbers", "No", "Is 1000 large? There is no fixed cut-off"],
      ],
    },
    {
      type: "text",
      content:
        "A few sets appear so often that they have permanent names. Learn the symbols now; JEE questions use them without comment.",
    },
    { type: "heading", text: "The standard number sets" },
    {
      type: "table",
      headers: ["Symbol", "Set", "Examples"],
      rows: [
        ["$\\mathbb{N}$", "Natural numbers $\\{1, 2, 3, \\dots\\}$", "In this course $0 \\notin \\mathbb{N}$, as in NCERT"],
        ["$\\mathbb{Z}$", "Integers $\\{\\dots, -2, -1, 0, 1, 2, \\dots\\}$", "$-7 \\in \\mathbb{Z}$, $\\frac12 \\notin \\mathbb{Z}$"],
        ["$\\mathbb{Z}^+$", "Positive integers", "Same as $\\mathbb{N}$"],
        ["$\\mathbb{Q}$", "Rationals $\\left\\{\\frac{p}{q} : p, q \\in \\mathbb{Z},\\ q \\ne 0\\right\\}$", "$0.75 = \\frac34$, $0.\\overline{3} = \\frac13$"],
        ["$\\mathbb{R}$", "Real numbers", "Every point of the number line"],
        ["$\\mathbb{Q}'$ or $\\mathbb{R} - \\mathbb{Q}$", "Irrationals", "$\\sqrt2$, $\\pi$, $e$"],
      ],
    },
    { type: "heading", text: "Roster form and set-builder form" },
    {
      type: "text",
      content:
        "There are two ways to tell someone what is in a set.\n\n- **Roster (tabular) form** lists the elements inside braces: $\\{2, 3, 5, 7\\}$. Order does not matter and repeats are ignored, so $\\{2, 3, 5, 7\\} = \\{7, 5, 3, 2\\} = \\{2, 2, 3, 5, 7\\}$. For long patterns we write dots: $\\{1, 3, 5, \\dots\\}$.\n- **Set-builder form** states the rule an element must satisfy: $\\{x : x \\text{ is a prime number less than } 10\\}$, read \"the set of all $x$ such that $x$ is a prime less than 10\". A vertical bar is also used: $\\{x \\mid x \\in \\mathbb{N},\\ x < 5\\}$.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Which form when?",
      content:
        "Roster form is best for small or obviously patterned sets. Set-builder form is the only option for sets like $\\{x \\in \\mathbb{R} : 0 < x < 1\\}$, whose elements cannot be listed at all. Converting between the two forms is a standard first question.",
    },
    {
      type: "worked-example",
      id: "srf0-1-we1",
      title: "Worked example 1: set-builder to roster",
      problem: "Write $A = \\{x \\in \\mathbb{Z} : \\lvert x - 1\\rvert < 3\\}$ in roster form.",
      steps: [
        { text: "Unpack the modulus: $\\lvert x - 1\\rvert < 3$ means $x - 1$ is within 3 of zero.", latex: "-3 < x - 1 < 3 \\iff -2 < x < 4" },
        { text: "Now apply the other condition, $x \\in \\mathbb{Z}$. *Why this step:* the inequality alone describes an interval of reals; only the integers in it belong to $A$. The integers strictly between $-2$ and $4$ are $-1, 0, 1, 2, 3$." },
      ],
      answer: "$A = \\{-1, 0, 1, 2, 3\\}$, a set with 5 elements.",
    },
    {
      type: "worked-example",
      id: "srf0-1-we2",
      title: "Worked example 2: roster to set-builder",
      problem: "Describe $B = \\{2, 5, 10, 17, 26\\}$ in set-builder form.",
      steps: [
        { text: "Look for a pattern. Subtract 1 from each element: $1, 4, 9, 16, 25$, the squares $1^2, 2^2, \\dots, 5^2$." },
        { text: "So each element is $n^2 + 1$ for $n = 1, 2, 3, 4, 5$. Write the rule and the range of $n$; leaving out \"$n \\le 5$\" would describe an infinite set." },
      ],
      answer: "$B = \\{x : x = n^2 + 1,\\ n \\in \\mathbb{N},\\ n \\le 5\\}$.",
    },
    {
      type: "worked-example",
      id: "srf0-1-we3",
      title: "Worked example 3: solution sets",
      problem: "Write in roster form: (a) $\\{x : x^2 - 5x + 6 = 0\\}$, (b) $\\{x : x = \\frac1n,\\ n \\in \\mathbb{N}\\}$.",
      steps: [
        { text: "(a) Factorise: $x^2 - 5x + 6 = (x - 2)(x - 3)$, so the set is $\\{2, 3\\}$." },
        { text: "(b) Put $n = 1, 2, 3, \\dots$: the set is $\\left\\{1, \\frac12, \\frac13, \\frac14, \\dots\\right\\}$. It is infinite, so roster form needs the dots." },
      ],
      answer: "(a) $\\{2, 3\\}$, (b) $\\left\\{1, \\frac12, \\frac13, \\dots\\right\\}$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"$\\{1, 1, 2\\}$ has three elements\"",
      content:
        "A set records only **which** objects belong, not how many times they were written. $\\{1, 1, 2\\} = \\{1, 2\\}$ has two elements. This matters in counting questions: the set of letters of the word \"ALLAHABAD\" is $\\{A, L, H, B, D\\}$, with 5 elements, not 9.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the order of the elements matters\"",
      content:
        "$\\{3, 1, 2\\}$ and $\\{1, 2, 3\\}$ are the same set. Order will matter for **ordered pairs** $(a, b)$ in Chapter 2, which is exactly why they get round brackets instead of braces.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "srf0-1-q1",
      variant: "concept",
      question: "Which of these collections is a set?",
      options: [
        { text: "The prime numbers less than 20", correct: true, feedback: "Membership is definite for every number: the set is $\\{2, 3, 5, 7, 11, 13, 17, 19\\}$." },
        { text: "The five most talented cricketers in India", feedback: "\"Most talented\" is opinion, so the collection is not well-defined." },
        { text: "The difficult chapters of JEE mathematics", feedback: "Difficulty depends on the student, so there is no definite membership test." },
        { text: "The large natural numbers", feedback: "There is no agreed cut-off for \"large\", so membership is not definite." },
      ],
      hint: "A set needs a yes-or-no membership test that everyone would answer the same way.",
    },
    {
      type: "numeric",
      id: "srf0-1-q2",
      variant: "practice",
      question: "How many elements does $\\{x \\in \\mathbb{Z} : \\lvert x + 2\\rvert \\le 3\\}$ have?",
      answer: 7,
      hint: "Rewrite the modulus inequality as $-3 \\le x + 2 \\le 3$, then count the integers.",
      solution: "$-3 \\le x + 2 \\le 3 \\iff -5 \\le x \\le 1$. The integers are $-5, -4, -3, -2, -1, 0, 1$: seven of them.",
      commonMistakes: [
        { answer: 5, feedback: "That counts only the integers strictly inside. The inequality is $\\le$, so $-5$ and $1$ are included." },
        { answer: 6, feedback: "Check the endpoints: both $-5$ and $1$ satisfy $\\lvert x + 2\\rvert \\le 3$." },
      ],
    },
    {
      type: "quiz",
      id: "srf0-1-q3",
      variant: "practice",
      question: "The roster form of $\\{x \\in \\mathbb{N} : x^2 < 20\\}$ is",
      options: [
        { text: "$\\{1, 2, 3, 4\\}$", correct: true, feedback: "$4^2 = 16 < 20$ but $5^2 = 25$, and natural numbers start at 1." },
        { text: "$\\{0, 1, 2, 3, 4\\}$", feedback: "$0 \\notin \\mathbb{N}$ in our convention." },
        { text: "$\\{-4, -3, \\dots, 3, 4\\}$", feedback: "That would be the answer over $\\mathbb{Z}$. Here $x \\in \\mathbb{N}$." },
        { text: "$\\{1, 2, 3, 4, 5\\}$", feedback: "$5^2 = 25$, which is not less than 20." },
      ],
      hint: "List $1, 2, 3, \\dots$ and stop at the first one whose square reaches 20.",
    },
    {
      type: "quiz",
      id: "srf0-1-q4",
      variant: "practice",
      multiple: true,
      question: "Select all the true statements.",
      options: [
        { text: "$3 \\in \\{1, 3, 5\\}$", correct: true, feedback: "3 is listed." },
        { text: "$\\{3\\} \\in \\{1, 3, 5\\}$", feedback: "The elements are the numbers 1, 3, 5. The set $\\{3\\}$ is not one of them." },
        { text: "$-2 \\notin \\mathbb{N}$", correct: true, feedback: "Natural numbers are positive." },
        { text: "$\\sqrt2 \\in \\mathbb{Q}$", feedback: "$\\sqrt2$ is irrational." },
        { text: "$0 \\in \\mathbb{Z}$", correct: true, feedback: "0 is an integer (though not a natural number)." },
      ],
      hint: "For each statement, ask what the elements of the right-hand set actually are, and whether the left-hand object is literally one of them.",
    },
    {
      type: "quiz",
      id: "srf0-1-q5",
      variant: "practice",
      question: "Which set-builder form describes $\\{3, 6, 9, 12, 15\\}$?",
      options: [
        { text: "$\\{x : x = 3n,\\ n \\in \\mathbb{N},\\ n \\le 5\\}$", correct: true, feedback: "$n = 1, \\dots, 5$ gives exactly the five listed multiples." },
        { text: "$\\{x : x = 3n,\\ n \\in \\mathbb{N}\\}$", feedback: "Without a bound on $n$ this is every positive multiple of 3, an infinite set." },
        { text: "$\\{x : x \\text{ is a multiple of } 3,\\ x < 15\\}$", feedback: "This leaves out 15 (and, without $x \\in \\mathbb{N}$, includes 0 and negatives)." },
        { text: "$\\{x : x = n + 3,\\ n \\in \\mathbb{N},\\ n \\le 5\\}$", feedback: "That gives $4, 5, 6, 7, 8$." },
      ],
      hint: "Spot the pattern, then make sure the rule produces no extra elements and misses none.",
    },
    {
      type: "numeric",
      id: "srf0-1-q6",
      variant: "practice",
      question: "How many elements does the set of letters of the word \"ALLAHABAD\" have?",
      answer: 5,
      hint: "Repeated letters are the same element and count once.",
      solution: "The distinct letters are A, L, H, B, D, so the set has 5 elements.",
      commonMistakes: [{ answer: 9, feedback: "That counts letters with repeats. A set keeps each distinct letter once." }],
    },
    {
      type: "quiz",
      id: "srf0-1-q7",
      variant: "concept",
      question: "How are $\\{1, 2, 3\\}$ and $\\{3, 1, 2, 2\\}$ related?",
      options: [
        { text: "They are the same set.", correct: true, feedback: "Both contain exactly 1, 2 and 3; order and repetition are ignored." },
        { text: "They differ, because the second has four elements.", feedback: "The repeated 2 is the same element; the second set also has three elements." },
        { text: "They differ, because the order is different.", feedback: "Order does not matter in a set." },
      ],
      hint: "A set is determined only by which objects belong to it.",
    },
    {
      type: "numeric",
      id: "srf0-1-q8",
      variant: "practice",
      question: "How many elements does $\\{x \\in \\mathbb{Z} : x^2 - 3x - 10 \\le 0\\}$ have?",
      answer: 8,
      hint: "Factorise the quadratic and find where the product is non-positive.",
      solution: "$x^2 - 3x - 10 = (x - 5)(x + 2) \\le 0 \\iff -2 \\le x \\le 5$. The integers $-2, -1, 0, 1, 2, 3, 4, 5$ number 8.",
      commonMistakes: [
        { answer: 7, feedback: "You lost one endpoint. Both $-2$ and $5$ make the expression zero, and $\\le 0$ includes zero." },
        { answer: 6, feedback: "Both endpoints $-2$ and $5$ belong to the set." },
      ],
    },
    {
      type: "heading",
      text: "JEE-style questions",
    },
    {
      type: "quiz",
      id: "srf0-1-q9",
      variant: "practice",
      multiple: true,
      question:
        "Let $A = \\{x \\in \\mathbb{R} : x^2 - 5x + 6 = 0\\}$. Which of the following sets are equal to $A$?",
      options: [
        { text: "$\\{2, 3\\}$", correct: true, feedback: "The roots of $(x - 2)(x - 3) = 0$." },
        { text: "$\\{x \\in \\mathbb{N} : x \\text{ divides } 6,\\ x > 1\\}$", feedback: "That is $\\{2, 3, 6\\}$, which also contains 6." },
        { text: "$\\{x \\in \\mathbb{Z} : (x - 2)(x - 3) = 0\\}$", correct: true, feedback: "Same equation; both roots are integers, so it is $\\{2, 3\\}$." },
        { text: "$\\{3, 2, 2\\}$", correct: true, feedback: "Order and repeats are ignored: this is $\\{2, 3\\}$." },
      ],
      hint: "Write each set in roster form and compare elements.",
    },
    {
      type: "numeric",
      id: "srf0-1-q10",
      variant: "practice",
      question: "How many elements does the set $\\left\\{\\sin\\frac{k\\pi}{2} : k \\in \\mathbb{Z}\\right\\}$ have?",
      answer: 3,
      hint: "Infinitely many values of $k$ do not mean infinitely many elements. List the values that actually occur.",
      solution: "As $k$ runs through the integers, $\\sin\\frac{k\\pi}{2}$ cycles through $0, 1, 0, -1$. The set is $\\{-1, 0, 1\\}$, with 3 elements.",
      commonMistakes: [
        { answer: 4, feedback: "The value 0 appears twice in each cycle, but it is one element." },
      ],
    },
    {
      type: "numeric",
      id: "srf0-1-q11",
      variant: "practice",
      question:
        "How many elements does $\\left\\{x \\in \\mathbb{Z} : \\frac{12}{x} \\in \\mathbb{Z}\\right\\}$ have?",
      answer: 12,
      hint: "$\\frac{12}{x}$ is an integer exactly when $x$ divides 12. Remember negative divisors.",
      solution: "The positive divisors of 12 are $1, 2, 3, 4, 6, 12$ (six of them). Each has a negative partner, giving $6 \\times 2 = 12$ integers. ($x = 0$ is excluded since $\\frac{12}{0}$ is undefined.)",
      commonMistakes: [{ answer: 6, feedback: "Those are the positive divisors only. $x \\in \\mathbb{Z}$ allows $x = -3$, for example, since $\\frac{12}{-3} = -4$." }],
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "kinds-of-sets",
  title: "0.2 · Kinds of Sets",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "Picture three boxes. The first is empty. The second holds a single sheet of paper with \"0\" written on it. The third holds an empty box. A careless reader calls all three \"nothing\", but they are different: the first has no contents, the other two each have exactly one thing inside. Sets behave the same way, and JEE questions love to test the difference.",
    },
    { type: "heading", text: "The empty set" },
    {
      type: "callout",
      variant: "definition",
      title: "Empty set",
      content:
        "The **empty set** (null set, void set) is the set with no elements, written $\\varnothing$ or $\\{\\ \\}$. There is only one empty set: any two sets with no elements have the same (no) elements.\nExamples: $\\{x \\in \\mathbb{N} : x < 1\\}$, $\\{x \\in \\mathbb{R} : x^2 + 1 = 0\\}$, $\\{x \\in \\mathbb{N} : 3 < x < 4\\}$.",
    },
    {
      type: "table",
      headers: ["Set", "Its elements", "Number of elements"],
      rows: [
        ["$\\varnothing$", "none", "$0$"],
        ["$\\{0\\}$", "the number $0$", "$1$"],
        ["$\\{\\varnothing\\}$", "the empty set itself", "$1$"],
        ["$\\{\\varnothing, \\{\\varnothing\\}\\}$", "$\\varnothing$ and $\\{\\varnothing\\}$", "$2$"],
      ],
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"$\\{\\varnothing\\}$ is empty\"",
      content:
        "$\\{\\varnothing\\}$ is a box containing an empty box. It has one element, so it is not empty, and $\\{\\varnothing\\} \\ne \\varnothing$. Likewise $\\{0\\} \\ne \\varnothing$: zero is a perfectly good element.",
    },
    { type: "heading", text: "Singleton, finite and infinite sets" },
    {
      type: "text",
      content:
        "A set with exactly one element is a **singleton**, like $\\{x \\in \\mathbb{N} : x \\text{ is even and prime}\\} = \\{2\\}$. A set is **finite** if it is empty or its elements can be counted off as $1, 2, \\dots, n$ for some natural number $n$; otherwise it is **infinite**. For a finite set, the number of distinct elements is its **cardinality**, written $n(A)$ (or $\\lvert A\\rvert$).",
    },
    {
      type: "worked-example",
      id: "srf0-2-we1",
      title: "Worked example 1: finding cardinalities",
      problem: "Find $n(A)$ and $n(B)$ for $A = \\{x \\in \\mathbb{R} : x^2 + 1 = 0\\}$ and $B = \\{x \\in \\mathbb{N} : 2x - 3 < 4\\}$.",
      steps: [
        { text: "For $A$: $x^2 = -1$ has no real solution, since squares of reals are never negative. So $A = \\varnothing$ and $n(A) = 0$." },
        { text: "For $B$: $2x - 3 < 4 \\iff x < 3.5$. The natural numbers below 3.5 are 1, 2, 3." },
      ],
      answer: "$n(A) = 0$ and $B = \\{1, 2, 3\\}$, so $n(B) = 3$.",
    },
    {
      type: "worked-example",
      id: "srf0-2-we2",
      title: "Worked example 2: finite or infinite?",
      problem:
        "Classify each set as finite or infinite: (a) $\\{x \\in \\mathbb{Z} : x^2 < 50\\}$, (b) $\\{x \\in \\mathbb{Q} : 0 < x < 1\\}$, (c) the set of lines through a given point, (d) $\\{x \\in \\mathbb{N} : x \\text{ divides } 360\\}$.",
      steps: [
        { text: "(a) $x^2 < 50$ means $-7 \\le x \\le 7$ for integers ($7^2 = 49$, $8^2 = 64$). That is 15 integers: finite." },
        { text: "(b) $\\frac12, \\frac13, \\frac14, \\dots$ already give infinitely many rationals in $(0, 1)$: infinite. *Why this step:* a bounded range does not make a set finite; only a countable-off list does." },
        { text: "(c) Every direction gives a different line: infinite." },
        { text: "(d) $360 = 2^3 \\cdot 3^2 \\cdot 5$ has $(3 + 1)(2 + 1)(1 + 1) = 24$ divisors: finite." },
      ],
      answer: "(a) finite, $n = 15$; (b) infinite; (c) infinite; (d) finite, $n = 24$.",
    },
    { type: "heading", text: "Equal sets and equivalent sets" },
    {
      type: "callout",
      variant: "definition",
      title: "Equal versus equivalent",
      content:
        "$A = B$ (**equal**) when they have exactly the same elements.\n$A$ and $B$ are **equivalent** when $n(A) = n(B)$, that is, the elements can be paired off one-to-one.\nEqual finite sets are always equivalent; equivalent sets need not be equal.",
    },
    {
      type: "worked-example",
      id: "srf0-2-we3",
      title: "Worked example 3: equal or only equivalent?",
      problem:
        "Compare (a) $\\{x : x^2 = 4\\}$ with $\\{-2, 2\\}$, (b) $\\{a, b, c\\}$ with $\\{1, 2, 3\\}$, (c) the letters of \"FOLLOW\" with the letters of \"WOLF\".",
      steps: [
        { text: "(a) $x^2 = 4 \\iff x = \\pm 2$, so the first set is $\\{-2, 2\\}$: equal (and so equivalent)." },
        { text: "(b) Both have 3 elements, but no element is shared: equivalent, not equal." },
        { text: "(c) FOLLOW gives $\\{F, O, L, W\\}$; WOLF gives $\\{W, O, L, F\\}$. Same elements: equal." },
      ],
      answer: "(a) equal, (b) equivalent but not equal, (c) equal.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"equivalent means equal\"",
      content:
        "Equivalence only compares **sizes**. $\\{1, 2, 3\\}$ and $\\{\\text{red}, \\text{green}, \\text{blue}\\}$ are equivalent and share no element at all.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "srf0-2-q1",
      variant: "practice",
      question: "Find $n\\big(\\{\\varnothing, \\{\\varnothing\\}\\}\\big)$.",
      answer: 2,
      hint: "Count the objects separated by the top-level comma. Each is one element, whatever is inside it.",
      solution: "The elements are $\\varnothing$ and $\\{\\varnothing\\}$: two distinct objects, so the cardinality is 2.",
      commonMistakes: [{ answer: 0, feedback: "The elements happen to be built from the empty set, but they are still elements. The set has two of them." }],
    },
    {
      type: "quiz",
      id: "srf0-2-q2",
      variant: "concept",
      question: "Which of these is the empty set?",
      options: [
        { text: "$\\{x \\in \\mathbb{N} : x < 1\\}$", correct: true, feedback: "Natural numbers start at 1, so nothing qualifies." },
        { text: "$\\{0\\}$", feedback: "This contains the number 0, so it has one element." },
        { text: "$\\{x \\in \\mathbb{R} : x^2 = 0\\}$", feedback: "$x = 0$ works, so the set is $\\{0\\}$." },
        { text: "$\\{\\varnothing\\}$", feedback: "This has one element, the empty set." },
      ],
      hint: "An empty set has no element at all. Try to find one element in each set.",
    },
    {
      type: "numeric",
      id: "srf0-2-q3",
      variant: "practice",
      question: "Find $n(\\{x \\in \\mathbb{Z} : x^2 < 50\\})$.",
      answer: 15,
      hint: "Find the largest integer whose square is below 50, then count from its negative up to it.",
      solution: "$7^2 = 49 < 50 \\le 64 = 8^2$, so the integers are $-7, \\dots, 7$: that is $7 + 1 + 7 = 15$.",
      commonMistakes: [
        { answer: 14, feedback: "Don't forget $x = 0$." },
        { answer: 7, feedback: "That counts only the positive integers. Negative integers have positive squares too." },
      ],
    },
    {
      type: "quiz",
      id: "srf0-2-q4",
      variant: "practice",
      multiple: true,
      question: "Select all the infinite sets.",
      options: [
        { text: "$\\{x \\in \\mathbb{Q} : 0 < x < 1\\}$", correct: true, feedback: "$\\frac1n$ for $n \\ge 2$ already gives infinitely many." },
        { text: "$\\{x \\in \\mathbb{N} : x \\text{ divides } 360\\}$", feedback: "360 has 24 divisors: finite." },
        { text: "The set of points on a circle", correct: true, feedback: "A circle has infinitely many points." },
        { text: "$\\{x \\in \\mathbb{Z} : \\lvert x\\rvert < 10^6\\}$", feedback: "Huge, but finite: $2 \\times 10^6 - 1$ integers." },
        { text: "$\\{x \\in \\mathbb{R} : \\sin x = 0\\}$", correct: true, feedback: "$x = k\\pi$ for every integer $k$." },
      ],
      hint: "\"Very large\" is still finite. Ask whether you could ever finish listing the elements.",
    },
    {
      type: "quiz",
      id: "srf0-2-q5",
      variant: "concept",
      question: "$A = \\{1, 2, 3\\}$ and $B = \\{p, q, r\\}$. Which statement is correct?",
      options: [
        { text: "$A$ and $B$ are equivalent but not equal.", correct: true, feedback: "Same size, different elements." },
        { text: "$A = B$.", feedback: "Equal sets need the same elements; these share none." },
        { text: "$A$ and $B$ are neither equal nor equivalent.", feedback: "Both have 3 elements, so they are equivalent." },
      ],
      hint: "Equal compares elements; equivalent compares only the number of elements.",
    },
    {
      type: "quiz",
      id: "srf0-2-q6",
      variant: "concept",
      multiple: true,
      question: "Select all the true statements.",
      options: [
        { text: "$n(\\varnothing) = 0$", correct: true, feedback: "The empty set has no elements." },
        { text: "$\\varnothing = \\{0\\}$", feedback: "$\\{0\\}$ contains the number 0, so it is not empty." },
        { text: "$\\{\\varnothing\\} \\ne \\varnothing$", correct: true, feedback: "$\\{\\varnothing\\}$ has one element." },
        { text: "$n(\\{0\\}) = 0$", feedback: "$\\{0\\}$ has one element, the number 0." },
      ],
      hint: "Separate \"the number zero\" from \"no elements\".",
    },
    {
      type: "numeric",
      id: "srf0-2-q7",
      variant: "practice",
      question: "Find $n(\\{x \\in \\mathbb{N} : 2x - 3 < 15\\})$.",
      answer: 8,
      hint: "Solve the inequality for $x$, then count the natural numbers that satisfy it.",
      solution: "$2x < 18 \\iff x < 9$, so the set is $\\{1, 2, \\dots, 8\\}$, with 8 elements.",
      commonMistakes: [{ answer: 9, feedback: "The inequality is strict: $x = 9$ gives $2(9) - 3 = 15$, not less than 15." }],
    },
    {
      type: "quiz",
      id: "srf0-2-q8",
      variant: "practice",
      question: "Which pair of sets are equal?",
      options: [
        { text: "The letters of \"ALLOY\" and the letters of \"LOYAL\"", correct: true, feedback: "Both are $\\{A, L, O, Y\\}$." },
        { text: "$\\{x : x^2 = 9\\}$ and $\\{3\\}$", feedback: "$x = -3$ also works, so the first set is $\\{-3, 3\\}$." },
        { text: "$\\{x \\in \\mathbb{N} : x < 3\\}$ and $\\{0, 1, 2\\}$", feedback: "$0 \\notin \\mathbb{N}$: the first set is $\\{1, 2\\}$." },
        { text: "$\\varnothing$ and $\\{\\varnothing\\}$", feedback: "The second has one element; the first has none." },
      ],
      hint: "Write both sets of each pair in roster form.",
    },
    { type: "heading", text: "JEE-style questions" },
    {
      type: "numeric",
      id: "srf0-2-q9",
      variant: "practice",
      question: "Find the number of elements of $\\{x \\in \\mathbb{R} : \\lvert x\\rvert^2 - 3\\lvert x\\rvert + 2 = 0\\}$.",
      answer: 4,
      hint: "Treat $\\lvert x\\rvert$ as the unknown first. Each positive value of $\\lvert x\\rvert$ gives two values of $x$.",
      solution: "Put $t = \\lvert x\\rvert \\ge 0$: $t^2 - 3t + 2 = (t - 1)(t - 2) = 0$, so $t = 1$ or $2$. Then $x = \\pm 1, \\pm 2$: four elements.",
      commonMistakes: [{ answer: 2, feedback: "Those are the values of $\\lvert x\\rvert$. Each gives two values of $x$." }],
    },
    {
      type: "numeric",
      id: "srf0-2-q10",
      variant: "practice",
      question: "Find $n(A)$ where $A = \\{x \\in [0, 2\\pi] : 2\\sin^2 x = 1\\}$.",
      answer: 4,
      hint: "$\\sin^2 x = \\frac12$ means $\\sin x = \\pm\\frac{1}{\\sqrt2}$. Count solutions in one full turn.",
      solution: "$\\sin x = \\frac{1}{\\sqrt2}$ gives $x = \\frac{\\pi}{4}, \\frac{3\\pi}{4}$; $\\sin x = -\\frac{1}{\\sqrt2}$ gives $x = \\frac{5\\pi}{4}, \\frac{7\\pi}{4}$. So $n(A) = 4$.",
      commonMistakes: [{ answer: 2, feedback: "Don't forget the negative square root: $\\sin x = -\\frac{1}{\\sqrt2}$ gives two more." }],
    },
    {
      type: "quiz",
      id: "srf0-2-q11",
      variant: "practice",
      question: "Which of these sets is a singleton?",
      options: [
        { text: "$\\{x \\in \\mathbb{N} : x^2 = 9\\}$", correct: true, feedback: "Only $x = 3$; $-3 \\notin \\mathbb{N}$." },
        { text: "$\\{x \\in \\mathbb{Z} : x^2 = 9\\}$", feedback: "That is $\\{-3, 3\\}$, with two elements." },
        { text: "$\\{x \\in \\mathbb{R} : x^2 + 9 = 0\\}$", feedback: "No real solution: this is $\\varnothing$." },
        { text: "$\\{x \\in \\mathbb{N} : x \\text{ is prime and } x < 5\\}$", feedback: "That is $\\{2, 3\\}$." },
      ],
      hint: "A singleton has exactly one element. Check the universe each set lives in.",
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "subsets",
  title: "0.3 · Subsets and Proper Subsets",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "Every student in your class is a student in your school. Picture the class as a small bag sitting inside the bigger school bag. That containment, one set sitting entirely inside another, is the idea of a **subset**. It sounds trivial, but it hides the single most common trap in this chapter: the difference between being an **element** of a set and being a **subset** of it.",
    },
    { type: "heading", text: "What a subset is" },
    {
      type: "callout",
      variant: "definition",
      title: "Subset and proper subset",
      content:
        "$A \\subseteq B$ ($A$ is a **subset** of $B$) if every element of $A$ is also an element of $B$: $x \\in A \\Rightarrow x \\in B$.\n$A \\subset B$ ($A$ is a **proper subset** of $B$) if $A \\subseteq B$ and $A \\ne B$, so $B$ has at least one element not in $A$.\n$B$ is then a **superset** of $A$, written $B \\supseteq A$.",
    },
    {
      type: "callout",
      variant: "info",
      title: "A note on notation",
      content:
        "Some books, including NCERT, write $A \\subset B$ for any subset and say \"proper\" in words. In this course $\\subseteq$ allows equality and $\\subset$ means proper. In a JEE question, read the intent from the context.",
    },
    {
      type: "text",
      content:
        "Two consequences come straight from the definition.\n\n1. **Every set is a subset of itself**: $A \\subseteq A$, since every element of $A$ is in $A$.\n2. **Equality by double inclusion**: $A = B \\iff A \\subseteq B$ and $B \\subseteq A$. This is how equalities between sets are proved in Chapter 1.\n\nThe number systems form a chain of proper subsets: $\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}$, and also $\\mathbb{Q}' \\subset \\mathbb{R}$.",
    },
    { type: "heading", text: "Why the empty set is a subset of everything" },
    {
      type: "text",
      content:
        "Is $\\varnothing \\subseteq \\{1, 2\\}$? The definition asks: is every element of $\\varnothing$ in $\\{1, 2\\}$? To show it fails, you would have to produce an element of $\\varnothing$ that is not in $\\{1, 2\\}$, and $\\varnothing$ has no elements to produce. A claim about \"every element\" of an empty collection cannot fail; mathematicians call it **vacuously true**. So $\\varnothing \\subseteq A$ for every set $A$.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Two subsets every set has",
      content:
        "Every set $A$ has $\\varnothing$ and $A$ itself as subsets. For $A \\ne \\varnothing$ these are two different subsets; $\\varnothing$ has only one subset, itself.",
    },
    { type: "heading", text: "Membership versus inclusion" },
    {
      type: "text",
      content:
        "$\\in$ relates an **object** to a set: \"is this object one of the elements?\". $\\subseteq$ relates a **set** to a set: \"is every element of the first one an element of the second?\". The trap appears when the elements are themselves sets.",
    },
    {
      type: "worked-example",
      id: "srf0-3-we1",
      title: "Worked example 1: the $\\in$ versus $\\subseteq$ trap",
      problem:
        "Let $A = \\{1, \\{1\\}, \\{1, 2\\}\\}$. Decide which are true: $1 \\in A$, $\\{1\\} \\in A$, $\\{1\\} \\subseteq A$, $\\{1, 2\\} \\in A$, $\\{1, 2\\} \\subseteq A$, $2 \\in A$, $\\varnothing \\subseteq A$, $\\varnothing \\in A$.",
      steps: [
        { text: "First list the elements of $A$. There are three: the number $1$, the set $\\{1\\}$, and the set $\\{1, 2\\}$. *Why this step:* every $\\in$ question is now a lookup in this list, and every $\\subseteq$ question asks whether each element of the left side is on this list." },
        {
          table: {
            headers: ["Statement", "Check", "True?"],
            rows: [
              ["$1 \\in A$", "1 is on the list", "Yes"],
              ["$\\{1\\} \\in A$", "$\\{1\\}$ is on the list", "Yes"],
              ["$\\{1\\} \\subseteq A$", "its only element, 1, is on the list", "Yes"],
              ["$\\{1, 2\\} \\in A$", "$\\{1, 2\\}$ is on the list", "Yes"],
              ["$\\{1, 2\\} \\subseteq A$", "needs $2 \\in A$, but 2 is not on the list", "No"],
              ["$2 \\in A$", "2 appears only inside $\\{1, 2\\}$", "No"],
              ["$\\varnothing \\subseteq A$", "always", "Yes"],
              ["$\\varnothing \\in A$", "$\\varnothing$ is not on the list", "No"],
            ],
          },
        },
      ],
      answer: "True: $1 \\in A$, $\\{1\\} \\in A$, $\\{1\\} \\subseteq A$, $\\{1, 2\\} \\in A$, $\\varnothing \\subseteq A$. False: the other three.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"$\\{1\\} \\in \\{1, 2\\}$\"",
      content:
        "The elements of $\\{1, 2\\}$ are the numbers 1 and 2. The set $\\{1\\}$ is not one of them, so $\\{1\\} \\notin \\{1, 2\\}$; what is true is $\\{1\\} \\subseteq \\{1, 2\\}$ (and $1 \\in \\{1, 2\\}$). Similarly $1 \\subseteq \\{1, 2\\}$ is meaningless: the left side of $\\subseteq$ must be a set.",
    },
    { type: "heading", text: "Counting subsets" },
    {
      type: "text",
      content:
        "To build a subset of $\\{a, b, c\\}$, walk past each element and decide: **in** or **out**. Three independent two-way choices give $2 \\times 2 \\times 2 = 8$ subsets. Choosing \"out\" every time gives $\\varnothing$; \"in\" every time gives the whole set.",
    },
    {
      type: "math",
      latex:
        "n(A) = n \\implies \\text{number of subsets} = 2^n, \\quad \\text{proper subsets} = 2^n - 1, \\quad \\text{non-empty proper subsets} = 2^n - 2",
    },
    {
      type: "worked-example",
      id: "srf0-3-we2",
      title: "Worked example 2: all subsets of a 3-element set",
      problem: "List all the subsets of $\\{a, b, c\\}$ and say how many are proper.",
      steps: [
        { text: "Group by size: size 0: $\\varnothing$. Size 1: $\\{a\\}, \\{b\\}, \\{c\\}$. Size 2: $\\{a, b\\}, \\{a, c\\}, \\{b, c\\}$. Size 3: $\\{a, b, c\\}$." },
        { text: "Total $1 + 3 + 3 + 1 = 8 = 2^3$. All except $\\{a, b, c\\}$ itself are proper: $8 - 1 = 7$." },
      ],
      answer: "8 subsets, 7 of them proper.",
    },
    {
      type: "worked-example",
      id: "srf0-3-we3",
      title: "Worked example 3: a JEE-style twist",
      problem:
        "Set $A$ has $m$ elements and set $B$ has $n$ elements. $A$ has 112 more subsets than $B$. Find $m$ and $n$.",
      steps: [
        { text: "Translate: $2^m - 2^n = 112$, so $m > n$. Factor out the smaller power:", latex: "2^n\\left(2^{m - n} - 1\\right) = 112 = 2^4 \\times 7" },
        { text: "$2^{m - n} - 1$ is odd (for $m > n$), so it must be the odd part 7, and $2^n$ must be the power-of-two part $2^4$. *Why this step:* a number splits uniquely into a power of 2 times an odd number." },
        { text: "$2^n = 16 \\Rightarrow n = 4$, and $2^{m - n} = 8 \\Rightarrow m - n = 3 \\Rightarrow m = 7$. Check: $128 - 16 = 112$." },
      ],
      answer: "$m = 7$, $n = 4$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "srf0-3-q1",
      variant: "concept",
      question: "For $A = \\{1, 2, 3\\}$, which statement is true?",
      options: [
        { text: "$\\{1\\} \\subseteq A$", correct: true, feedback: "Its only element, 1, is in $A$." },
        { text: "$\\{1\\} \\in A$", feedback: "The elements of $A$ are numbers; $\\{1\\}$ is a set, not one of them." },
        { text: "$1 \\subseteq A$", feedback: "The left side of $\\subseteq$ must be a set; 1 is a number. You mean $1 \\in A$." },
        { text: "$\\varnothing \\in A$", feedback: "$\\varnothing$ is a subset of $A$, but not an element of it." },
      ],
      hint: "$\\in$ needs an element on the left; $\\subseteq$ needs a set on the left.",
    },
    {
      type: "quiz",
      id: "srf0-3-q2",
      variant: "practice",
      multiple: true,
      question: "Let $A = \\{1, \\{1\\}, \\{1, 2\\}\\}$. Select all the true statements.",
      options: [
        { text: "$\\{1\\} \\in A$", correct: true, feedback: "$\\{1\\}$ is listed as an element." },
        { text: "$\\{1\\} \\subseteq A$", correct: true, feedback: "Its element 1 is in $A$." },
        { text: "$\\{1, 2\\} \\subseteq A$", feedback: "That needs $2 \\in A$, but 2 is not an element of $A$." },
        { text: "$\\{\\{1, 2\\}\\} \\subseteq A$", correct: true, feedback: "Its only element, $\\{1, 2\\}$, is an element of $A$." },
        { text: "$2 \\in A$", feedback: "2 sits inside the element $\\{1, 2\\}$; it is not itself an element of $A$." },
      ],
      hint: "List the three elements of $A$ first, then check each statement against that list.",
    },
    {
      type: "numeric",
      id: "srf0-3-q3",
      variant: "practice",
      question: "How many subsets does $\\{x \\in \\mathbb{N} : x \\le 6\\}$ have?",
      answer: 64,
      hint: "Find the number of elements $n$, then use $2^n$.",
      solution: "The set is $\\{1, 2, 3, 4, 5, 6\\}$, so it has $2^6 = 64$ subsets.",
      commonMistakes: [
        { answer: 63, feedback: "That is the number of **proper** subsets." },
        { answer: 128, feedback: "$0 \\notin \\mathbb{N}$, so the set has 6 elements, not 7." },
      ],
    },
    {
      type: "numeric",
      id: "srf0-3-q4",
      variant: "practice",
      question: "How many proper subsets does the set of vowels $\\{a, e, i, o, u\\}$ have?",
      answer: 31,
      hint: "Proper subsets are all subsets except the set itself.",
      solution: "$2^5 - 1 = 31$.",
      commonMistakes: [
        { answer: 32, feedback: "That is all subsets, including the set itself." },
        { answer: 30, feedback: "That also removes $\\varnothing$, which **is** a proper subset." },
      ],
    },
    {
      type: "numeric",
      id: "srf0-3-q5",
      variant: "practice",
      question: "A set has 6 elements. How many of its subsets are neither empty nor the whole set?",
      answer: 62,
      hint: "Start from all $2^6$ subsets and remove the two excluded ones.",
      solution: "$2^6 - 2 = 64 - 2 = 62$.",
      commonMistakes: [{ answer: 63, feedback: "Remove both $\\varnothing$ and the whole set." }],
    },
    {
      type: "quiz",
      id: "srf0-3-q6",
      variant: "concept",
      question: "Why is $\\varnothing \\subseteq A$ for every set $A$?",
      options: [
        { text: "Because $\\varnothing$ has no element that could fail to be in $A$.", correct: true, feedback: "To break $\\varnothing \\subseteq A$ you would need an element of $\\varnothing$ outside $A$. There is none, so the statement is vacuously true." },
        { text: "Because $\\varnothing$ is an element of every set.", feedback: "False: $\\varnothing \\notin \\{1, 2\\}$, for instance. Being a subset is different from being an element." },
        { text: "It is a convention with no reason behind it.", feedback: "It follows directly from the definition of $\\subseteq$." },
        { text: "Because every set contains 0.", feedback: "$\\varnothing$ is not 0, and most sets do not contain 0." },
      ],
      hint: "Ask what you would need to exhibit to show $\\varnothing \\not\\subseteq A$.",
    },
    {
      type: "quiz",
      id: "srf0-3-q7",
      variant: "practice",
      multiple: true,
      question: "Select all the true statements.",
      options: [
        { text: "$\\mathbb{N} \\subset \\mathbb{Z}$", correct: true, feedback: "Every natural number is an integer, and $0 \\in \\mathbb{Z} - \\mathbb{N}$." },
        { text: "$\\mathbb{Q} \\subseteq \\mathbb{Z}$", feedback: "$\\frac12 \\in \\mathbb{Q}$ but $\\frac12 \\notin \\mathbb{Z}$." },
        { text: "$\\mathbb{Z} \\subset \\mathbb{Q}$", correct: true, feedback: "$n = \\frac{n}{1}$, and $\\frac12$ shows the inclusion is proper." },
        { text: "$\\{x \\in \\mathbb{R} : x^2 = 2\\} \\subseteq \\mathbb{Q}$", feedback: "The set is $\\{-\\sqrt2, \\sqrt2\\}$, and $\\sqrt2$ is irrational." },
        { text: "$\\varnothing \\subset \\{\\varnothing\\}$", correct: true, feedback: "$\\varnothing$ is a subset of every set, and $\\{\\varnothing\\} \\ne \\varnothing$, so it is a proper subset." },
      ],
      hint: "For each claimed inclusion, look for one element of the left set that is missing from the right set.",
    },
    {
      type: "quiz",
      id: "srf0-3-q8",
      variant: "practice",
      question:
        "In $\\mathbb{N}$, let $A$ be the multiples of 4 and $B$ the multiples of 6. Which is true?",
      options: [
        { text: "Neither $A \\subseteq B$ nor $B \\subseteq A$.", correct: true, feedback: "$4 \\in A - B$ and $6 \\in B - A$." },
        { text: "$A \\subseteq B$", feedback: "$4 \\in A$ but 4 is not a multiple of 6." },
        { text: "$B \\subseteq A$", feedback: "$6 \\in B$ but 6 is not a multiple of 4." },
        { text: "$A = B$", feedback: "They share 12, 24, ... but are not equal." },
      ],
      hint: "One counterexample element is enough to break an inclusion.",
    },
    { type: "heading", text: "JEE-style questions" },
    {
      type: "numeric",
      id: "srf0-3-q9",
      variant: "practice",
      question:
        "Sets $A$ and $B$ have $m$ and $n$ elements. The number of subsets of $A$ exceeds the number of subsets of $B$ by 56. Find $m + n$.",
      answer: 9,
      hint: "Write $2^m - 2^n = 2^n(2^{m-n} - 1)$ and split 56 into a power of 2 times an odd number.",
      solution: "$56 = 2^3 \\times 7$, so $2^n = 8$ and $2^{m - n} - 1 = 7$. Hence $n = 3$, $m - n = 3$, $m = 6$, and $m + n = 9$. Check: $64 - 8 = 56$.",
      commonMistakes: [{ answer: 6, feedback: "That is $m$ alone. The question asks for $m + n$." }],
    },
    {
      type: "numeric",
      id: "srf0-3-q10",
      variant: "practice",
      question:
        "A set $S$ has exactly 255 proper subsets. How many elements does $S$ have?",
      answer: 8,
      hint: "Proper subsets number $2^n - 1$.",
      solution: "$2^n - 1 = 255 \\Rightarrow 2^n = 256 \\Rightarrow n = 8$.",
      commonMistakes: [{ answer: 255, feedback: "255 counts subsets, not elements. Solve $2^n - 1 = 255$." }],
    },
    {
      type: "quiz",
      id: "srf0-3-q11",
      variant: "concept",
      question: "If $A \\subseteq B$ and $B \\subseteq A$, then",
      options: [
        { text: "$A = B$", correct: true, feedback: "Each contains every element of the other: double inclusion." },
        { text: "$A \\subset B$ (properly)", feedback: "A proper subset needs an element of $B$ outside $A$, which $B \\subseteq A$ forbids." },
        { text: "$A$ and $B$ must both be empty", feedback: "Any set satisfies $A \\subseteq A$; take $B = A = \\{1\\}$." },
        { text: "Nothing can be concluded", feedback: "This is exactly the standard test for equality of sets." },
      ],
      hint: "Combine the two directions: every element of $A$ is in $B$, and every element of $B$ is in $A$.",
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "the-power-set",
  title: "0.4 · The Power Set",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "In lesson 0.3 you listed the eight subsets of $\\{a, b, c\\}$. Now put all eight into one box. That box is a new set, whose elements are sets. It is called the **power set**, and it is where the number $2^n$ really lives.",
    },
    { type: "heading", text: "The set of all subsets" },
    {
      type: "callout",
      variant: "definition",
      title: "Power set",
      content:
        "The **power set** of $A$ is $P(A) = \\{S : S \\subseteq A\\}$, the set of all subsets of $A$.\nSo $S \\in P(A) \\iff S \\subseteq A$. If $n(A) = n$, then $n(P(A)) = 2^n$.",
    },
    {
      type: "text",
      content:
        "The in/out argument becomes a table. Each row is one string of in/out decisions, so each row is one subset, and there are $2^3 = 8$ rows.",
    },
    {
      type: "table",
      headers: ["$a$?", "$b$?", "$c$?", "Subset"],
      rows: [
        ["out", "out", "out", "$\\varnothing$"],
        ["in", "out", "out", "$\\{a\\}$"],
        ["out", "in", "out", "$\\{b\\}$"],
        ["out", "out", "in", "$\\{c\\}$"],
        ["in", "in", "out", "$\\{a, b\\}$"],
        ["in", "out", "in", "$\\{a, c\\}$"],
        ["out", "in", "in", "$\\{b, c\\}$"],
        ["in", "in", "in", "$\\{a, b, c\\}$"],
      ],
    },
    {
      type: "worked-example",
      id: "srf0-4-we1",
      title: "Worked example 1: elements that are sets",
      problem: "Write out $P(A)$ for $A = \\{1, \\{2\\}\\}$.",
      steps: [
        { text: "$A$ has two elements, the number $1$ and the set $\\{2\\}$, so $P(A)$ has $2^2 = 4$ elements." },
        { text: "Make the in/out choices: none, only $1$, only $\\{2\\}$, both. *Why this step:* treat $\\{2\\}$ as a single object; putting it into a subset gives $\\{\\{2\\}\\}$, with double braces." },
      ],
      answer: "$P(A) = \\{\\varnothing, \\{1\\}, \\{\\{2\\}\\}, \\{1, \\{2\\}\\}\\}$.",
    },
    { type: "heading", text: "Power sets built from nothing" },
    {
      type: "worked-example",
      id: "srf0-4-we2",
      title: "Worked example 2: iterating from the empty set",
      problem: "Find $P(\\varnothing)$, $P(P(\\varnothing))$ and $n\\big(P(P(P(\\varnothing)))\\big)$.",
      steps: [
        { text: "$\\varnothing$ has exactly one subset, itself. So $P(\\varnothing) = \\{\\varnothing\\}$, which has **one** element ($2^0 = 1$)." },
        { text: "$P(\\varnothing) = \\{\\varnothing\\}$ has one element, so its power set has $2^1 = 2$ elements: $P(P(\\varnothing)) = \\{\\varnothing, \\{\\varnothing\\}\\}$." },
        { text: "That set has 2 elements, so its power set has $2^2 = 4$ elements." },
      ],
      answer: "$P(\\varnothing) = \\{\\varnothing\\}$, $P(P(\\varnothing)) = \\{\\varnothing, \\{\\varnothing\\}\\}$, and $n(P(P(P(\\varnothing)))) = 4$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"$P(\\varnothing) = \\varnothing$\"",
      content:
        "A power set is never empty: it always contains $\\varnothing$ (and the set itself). $P(\\varnothing) = \\{\\varnothing\\}$ has one element, matching $2^0 = 1$.",
    },
    { type: "heading", text: "Counting subsets with conditions" },
    {
      type: "text",
      content:
        "The in/out picture also handles conditions: a condition simply fixes some of the choices.\n\n- Subsets **containing** a given element $a$: $a$ is forced in, the other $n - 1$ are free: $2^{n-1}$.\n- Containing $a$ but **not** $b$: two choices forced: $2^{n-2}$.\n- Subsets with exactly $k$ elements: choose which $k$ are in: $\\binom{n}{k}$. Adding over all $k$ gives $\\binom{n}{0} + \\binom{n}{1} + \\dots + \\binom{n}{n} = 2^n$.\n- \"At least one of\" conditions: count the complement and subtract.",
    },
    {
      type: "worked-example",
      id: "srf0-4-we3",
      title: "Worked example 3: conditions on subsets of a 6-element set",
      problem:
        "For $A = \\{1, 2, 3, 4, 5, 6\\}$, count the subsets that (a) contain 1 but not 2, (b) have exactly 3 elements, (c) contain at least one of 1 and 2.",
      steps: [
        { text: "(a) 1 forced in, 2 forced out, the other 4 elements free: $2^4 = 16$." },
        { text: "(b) Choose the 3 members: $\\binom{6}{3} = 20$." },
        { text: "(c) Complement: subsets containing **neither** 1 nor 2 have both forced out: $2^4 = 16$. *Why this step:* \"at least one\" splits into three cases (1 only, 2 only, both); the complement is a single case. So $64 - 16 = 48$." },
      ],
      answer: "(a) 16, (b) 20, (c) 48.",
    },
    { type: "heading", text: "Power sets and set operations" },
    {
      type: "text",
      content:
        "Chapter 1 defines $A \\cap B$ (elements in both) and $A \\cup B$ (elements in at least one) properly; here is a first look at how power sets interact with them.\n\n- $P(A) \\cap P(B) = P(A \\cap B)$: a set lies inside both $A$ and $B$ exactly when it lies inside their overlap.\n- $P(A) \\cup P(B) \\subseteq P(A \\cup B)$, but usually not equal: a subset of $A \\cup B$ can take elements from both sides.",
    },
    {
      type: "worked-example",
      id: "srf0-4-we4",
      title: "Worked example 4: the union is smaller",
      problem: "For $A = \\{1, 2\\}$ and $B = \\{2, 3\\}$, compare $n(P(A) \\cup P(B))$ with $n(P(A \\cup B))$.",
      steps: [
        { text: "$P(A) = \\{\\varnothing, \\{1\\}, \\{2\\}, \\{1, 2\\}\\}$ and $P(B) = \\{\\varnothing, \\{2\\}, \\{3\\}, \\{2, 3\\}\\}$. They share $\\varnothing$ and $\\{2\\}$." },
        { text: "So $P(A) \\cup P(B)$ has $4 + 4 - 2 = 6$ elements." },
        { text: "$A \\cup B = \\{1, 2, 3\\}$, so $P(A \\cup B)$ has 8 elements. The missing two are $\\{1, 3\\}$ and $\\{1, 2, 3\\}$, which mix elements from both sides." },
      ],
      answer: "$n(P(A) \\cup P(B)) = 6 < 8 = n(P(A \\cup B))$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "srf0-4-q1",
      variant: "practice",
      question: "If $n(P(A)) = 64$, find $n(A)$.",
      answer: 6,
      hint: "$n(P(A)) = 2^{n(A)}$.",
      solution: "$2^{n(A)} = 64 = 2^6$, so $n(A) = 6$.",
      commonMistakes: [{ answer: 8, feedback: "$8^2 = 64$, but the relation is $2^{n(A)}$, not $n(A)^2$." }],
    },
    {
      type: "quiz",
      id: "srf0-4-q2",
      variant: "concept",
      question: "$P(\\varnothing)$ equals",
      options: [
        { text: "$\\{\\varnothing\\}$", correct: true, feedback: "The only subset of $\\varnothing$ is $\\varnothing$ itself." },
        { text: "$\\varnothing$", feedback: "A power set always contains $\\varnothing$, so it cannot be empty." },
        { text: "$\\{0\\}$", feedback: "0 is a number, not a subset of $\\varnothing$." },
        { text: "$\\{\\varnothing, \\{\\varnothing\\}\\}$", feedback: "That is $P(P(\\varnothing))$, one level higher." },
      ],
      hint: "List the subsets of $\\varnothing$. How many are there?",
    },
    {
      type: "numeric",
      id: "srf0-4-q3",
      variant: "practice",
      question: "Find $n\\big(P(P(P(\\varnothing)))\\big)$.",
      answer: 4,
      hint: "Work outwards: each $P$ turns a set of size $k$ into one of size $2^k$, starting from $k = 0$.",
      solution: "$0 \\to 2^0 = 1 \\to 2^1 = 2 \\to 2^2 = 4$.",
      commonMistakes: [
        { answer: 8, feedback: "That would be $2^3$, as if you started from size 1 or applied $P$ four times. Start from $n(\\varnothing) = 0$." },
        { answer: 2, feedback: "That is $n(P(P(\\varnothing)))$. There is one more $P$." },
      ],
    },
    {
      type: "quiz",
      id: "srf0-4-q4",
      variant: "practice",
      multiple: true,
      question: "Let $A = \\{a, b\\}$. Select all the elements of $P(A)$.",
      options: [
        { text: "$\\varnothing$", correct: true, feedback: "The empty subset is always in the power set." },
        { text: "$\\{a\\}$", correct: true, feedback: "A subset of $A$." },
        { text: "$a$", feedback: "$a$ is an element of $A$, not a subset. $P(A)$ contains sets." },
        { text: "$\\{a, b\\}$", correct: true, feedback: "$A$ itself is one of its subsets." },
        { text: "$\\{\\{a\\}\\}$", feedback: "Its element $\\{a\\}$ is not an element of $A$, so it is not a subset of $A$." },
      ],
      hint: "$S \\in P(A)$ exactly when $S \\subseteq A$.",
    },
    {
      type: "numeric",
      id: "srf0-4-q5",
      variant: "practice",
      question: "How many subsets of $\\{1, 2, \\dots, 8\\}$ contain the element 3?",
      answer: 128,
      hint: "Force 3 in; the other elements are free.",
      solution: "Seven free in/out choices: $2^7 = 128$ (exactly half of the $2^8 = 256$ subsets).",
      commonMistakes: [{ answer: 256, feedback: "That is all subsets, with or without 3." }],
    },
    {
      type: "numeric",
      id: "srf0-4-q6",
      variant: "practice",
      question: "How many subsets of $\\{1, 2, \\dots, 7\\}$ have exactly 3 elements?",
      answer: 35,
      hint: "Choose which 3 of the 7 elements are in.",
      solution: "$\\binom{7}{3} = \\frac{7 \\cdot 6 \\cdot 5}{3!} = 35$.",
      commonMistakes: [{ answer: 210, feedback: "$7 \\cdot 6 \\cdot 5$ counts ordered choices; a subset has no order, so divide by $3!$." }],
    },
    {
      type: "numeric",
      id: "srf0-4-q7",
      variant: "practice",
      question: "How many subsets of $\\{1, 2, 3, 4, 5, 6\\}$ contain 1 but not 6?",
      answer: 16,
      hint: "Two choices are forced; four are free.",
      solution: "$2^{6 - 2} = 2^4 = 16$.",
      commonMistakes: [{ answer: 32, feedback: "That forces only one element. Both 1 (in) and 6 (out) are fixed." }],
    },
    {
      type: "quiz",
      id: "srf0-4-q8",
      variant: "practice",
      multiple: true,
      question: "For arbitrary sets $A$ and $B$, which statements always hold?",
      options: [
        { text: "$P(A) \\cap P(B) = P(A \\cap B)$", correct: true, feedback: "$S \\subseteq A$ and $S \\subseteq B$ together say $S \\subseteq A \\cap B$." },
        { text: "$P(A) \\cup P(B) = P(A \\cup B)$", feedback: "Fails for $A = \\{1\\}$, $B = \\{2\\}$: $\\{1, 2\\} \\in P(A \\cup B)$ but in neither $P(A)$ nor $P(B)$." },
        { text: "$P(A) \\cup P(B) \\subseteq P(A \\cup B)$", correct: true, feedback: "A subset of $A$ (or of $B$) is a subset of $A \\cup B$." },
        { text: "$\\varnothing \\in P(A)$", correct: true, feedback: "$\\varnothing \\subseteq A$." },
        { text: "$A \\in P(A)$", correct: true, feedback: "$A \\subseteq A$." },
      ],
      hint: "Translate $S \\in P(X)$ into $S \\subseteq X$ and test small examples like $A = \\{1\\}$, $B = \\{2\\}$.",
    },
    { type: "heading", text: "JEE-style questions" },
    {
      type: "numeric",
      id: "srf0-4-q9",
      variant: "practice",
      question: "$n(A) = 3$, $n(B) = 5$ and $A \\subseteq B$. How many sets $C$ satisfy $A \\subseteq C \\subseteq B$?",
      answer: 4,
      hint: "The elements of $A$ must be in $C$; the elements of $B$ outside $A$ are free.",
      solution: "$C$ must contain the 3 elements of $A$; each of the $5 - 3 = 2$ remaining elements of $B$ is in or out. So $2^2 = 4$.",
      commonMistakes: [
        { answer: 32, feedback: "That counts all subsets of $B$, ignoring $A \\subseteq C$." },
        { answer: 2, feedback: "Each of the 2 free elements has 2 choices: $2 \\times 2 = 4$." },
      ],
    },
    {
      type: "numeric",
      id: "srf0-4-q10",
      variant: "practice",
      question: "How many subsets of $\\{1, 2, \\dots, 10\\}$ have at least 2 elements?",
      answer: 1013,
      hint: "Subtract the subsets with 0 or 1 elements from the total.",
      solution: "Total $2^{10} = 1024$. Size 0: 1. Size 1: 10. So $1024 - 1 - 10 = 1013$.",
      commonMistakes: [
        { answer: 1014, feedback: "Remove the empty set too." },
        { answer: 1023, feedback: "Also remove the 10 single-element subsets." },
      ],
    },
    {
      type: "numeric",
      id: "srf0-4-q11",
      variant: "practice",
      question: "How many **non-empty** subsets of $\\{1, 2, 3, 4, 5\\}$ contain no two consecutive integers?",
      answer: 12,
      hint: "Count by size. With 3 elements from 1 to 5 and gaps between them, there is very little room.",
      solution: "Size 1: 5 subsets. Size 2: all $\\binom{5}{2} = 10$ pairs minus the 4 consecutive pairs $\\{1,2\\}, \\{2,3\\}, \\{3,4\\}, \\{4,5\\}$: 6. Size 3: only $\\{1, 3, 5\\}$: 1. Size 4 or more: impossible. Total $5 + 6 + 1 = 12$.",
      commonMistakes: [
        { answer: 13, feedback: "That includes the empty set, which the question excludes." },
        { answer: 11, feedback: "Check size 3: $\\{1, 3, 5\\}$ works." },
      ],
    },
    {
      type: "quiz",
      id: "srf0-4-q12",
      variant: "practice",
      question: "If $A = \\{\\varnothing\\}$, then $P(A)$ is",
      options: [
        { text: "$\\{\\varnothing, \\{\\varnothing\\}\\}$", correct: true, feedback: "$A$ has one element, $\\varnothing$. Its subsets are $\\varnothing$ (leave it out) and $\\{\\varnothing\\}$ (put it in)." },
        { text: "$\\{\\varnothing\\}$", feedback: "That is $A$ itself; a 1-element set has 2 subsets." },
        { text: "$\\varnothing$", feedback: "A power set is never empty." },
        { text: "$\\{\\{\\varnothing\\}\\}$", feedback: "This misses the empty subset." },
      ],
      hint: "Treat $\\varnothing$ as a single object $x$: what is $P(\\{x\\})$?",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "universal-set-and-intervals",
  title: "0.5 · Universal Set and Intervals",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "Solve $x^2 = 2$. Over $\\mathbb{Q}$ there is no solution; over $\\mathbb{R}$ there are two. Solve $2x = 3$: no answer in $\\mathbb{Z}$, one in $\\mathbb{Q}$. The equation did not change; the **universe** of allowed answers did. Every set question quietly happens inside some background set, and naming it removes the ambiguity.",
    },
    { type: "heading", text: "The universal set" },
    {
      type: "callout",
      variant: "definition",
      title: "Universal set",
      content:
        "A **universal set** $U$ is a set containing every set under discussion as a subset. It is chosen to suit the context: for questions about triangles, $U$ could be the set of all triangles; for a number problem, $U$ could be $\\mathbb{Z}$ or $\\mathbb{R}$; for a survey, $U$ is everyone surveyed.",
    },
    {
      type: "text",
      content:
        "In a Venn diagram, $U$ is the rectangle and every set is a region inside it. Below, $U = \\{1, 2, \\dots, 10\\}$, $A$ is the set of even numbers in $U$ and $B$ the set of multiples of 3 in $U$. Each number shows how many elements sit in that region.",
    },
    {
      type: "interactive",
      config: {
        component: "srf-venn-diagram",
        sets: 2,
        labels: ["A: even", "B: mult. of 3"],
        universeLabel: "U: 1 to 10",
        counts: { "": 3, A: 4, B: 2, AB: 1 },
        expressions: [
          { expr: "A", latex: "A" },
          { expr: "B", latex: "B" },
          { expr: "U", latex: "U" },
        ],
        initialExpression: 0,
        caption:
          "Shade $A$: the regions add to $4 + 1 = 5$ (that is 2, 4, 6, 8, 10). Shade $B$: $2 + 1 = 3$. Shade $U$: all 10. Which numbers are the 3 outside both circles?",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: $A$ is the whole left circle, overlap included, so $n(A) = 5$; $B$ is the whole right circle, $n(B) = 3$; the number 6 sits in the overlap because it is in both; and the three numbers outside both circles are 1, 5 and 7. Both sets are subsets of $U$, which is all a universal set has to be.",
    },
    { type: "heading", text: "Intervals: the subsets of R you will use most" },
    {
      type: "text",
      content:
        "Domains and ranges of functions (Chapter 3) are almost always written as **intervals**, the unbroken stretches of the number line. Square brackets include the endpoint; round brackets exclude it.",
    },
    {
      type: "table",
      headers: ["Interval", "Set-builder form", "Endpoints", "Name"],
      rows: [
        ["$(a, b)$", "$\\{x \\in \\mathbb{R} : a < x < b\\}$", "neither", "open"],
        ["$[a, b]$", "$\\{x \\in \\mathbb{R} : a \\le x \\le b\\}$", "both", "closed"],
        ["$[a, b)$", "$\\{x \\in \\mathbb{R} : a \\le x < b\\}$", "$a$ only", "half-open"],
        ["$(a, b]$", "$\\{x \\in \\mathbb{R} : a < x \\le b\\}$", "$b$ only", "half-open"],
        ["$(a, \\infty)$, $[a, \\infty)$", "$\\{x : x > a\\}$, $\\{x : x \\ge a\\}$", "never $\\infty$", "rays"],
        ["$(-\\infty, b)$, $(-\\infty, b]$", "$\\{x : x < b\\}$, $\\{x : x \\le b\\}$", "never $-\\infty$", "rays"],
        ["$(-\\infty, \\infty)$", "$\\mathbb{R}$", "none", "the whole line"],
      ],
    },
    {
      type: "callout",
      variant: "definition",
      title: "Length of an interval",
      content:
        "Each of $(a, b)$, $[a, b]$, $[a, b)$, $(a, b]$ has **length** $b - a$. Including or excluding a single endpoint changes the set but not the length.",
    },
    {
      type: "worked-example",
      id: "srf0-5-we1",
      title: "Worked example 1: translating between forms",
      problem:
        "(a) Write $\\{x \\in \\mathbb{R} : -2 < x \\le 5\\}$ as an interval. (b) Write $[3, \\infty)$ in set-builder form. (c) Write $\\{x \\in \\mathbb{R} : \\lvert x - 1\\rvert \\le 2\\}$ as an interval.",
      steps: [
        { text: "(a) $-2$ is excluded (strict $<$), $5$ included ($\\le$): $(-2, 5]$." },
        { text: "(b) $\\{x \\in \\mathbb{R} : x \\ge 3\\}$." },
        { text: "(c) $\\lvert x - 1\\rvert \\le 2 \\iff -2 \\le x - 1 \\le 2 \\iff -1 \\le x \\le 3$: the interval $[-1, 3]$, centred at 1 with radius 2." },
      ],
      answer: "(a) $(-2, 5]$, (b) $\\{x \\in \\mathbb{R} : x \\ge 3\\}$, (c) $[-1, 3]$.",
    },
    { type: "heading", text: "Combining intervals on a number line" },
    {
      type: "text",
      content:
        "To find where two conditions hold **together**, draw both intervals on one number line and keep the stretch covered twice. To find where **at least one** holds, keep everything covered at least once. This is exactly how domains are found in Chapter 3.",
    },
    {
      type: "worked-example",
      id: "srf0-5-we2",
      title: "Worked example 2: overlap and union",
      problem: "Let $I = [-1, 4)$ and $J = (2, 7]$. Find the set of $x$ in both, and the set of $x$ in at least one.",
      steps: [
        { text: "Both: $x \\ge -1$, $x < 4$, $x > 2$, $x \\le 7$. The binding constraints are $x > 2$ and $x < 4$: the interval $(2, 4)$. *Why this step:* the overlap starts at the larger left end and stops at the smaller right end, and each endpoint keeps the bracket of the interval it came from." },
        { text: "At least one: the intervals overlap, so together they cover from $-1$ (included, from $I$) to $7$ (included, from $J$): $[-1, 7]$." },
      ],
      answer: "Both: $(2, 4)$. At least one: $[-1, 7]$.",
    },
    {
      type: "worked-example",
      id: "srf0-5-we3",
      title: "Worked example 3: a domain preview",
      problem: "For which real $x$ are both $\\sqrt{x - 1}$ and $\\sqrt{5 - x}$ real? How many integers are there in this set?",
      steps: [
        { text: "$\\sqrt{x - 1}$ is real when $x \\ge 1$, that is $x \\in [1, \\infty)$." },
        { text: "$\\sqrt{5 - x}$ is real when $x \\le 5$, that is $x \\in (-\\infty, 5]$." },
        { text: "Both: $[1, 5]$, which contains the integers $1, 2, 3, 4, 5$." },
      ],
      answer: "$x \\in [1, 5]$, containing 5 integers.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"$[2, 5)$ contains 5\"",
      content:
        "The round bracket at 5 says \"up to but not including\". $[2, 5)$ contains $4.9$, $4.99$, $4.999$, ... but not 5, and it has no largest element. It does contain 2.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"$\\infty$ can be included\"",
      content:
        "$\\infty$ is not a real number, so it can never be an element of a set of reals. Write $[3, \\infty)$, never $[3, \\infty]$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "srf0-5-q1",
      variant: "practice",
      question: "$\\{x \\in \\mathbb{R} : -3 \\le x < 2\\}$ in interval notation is",
      options: [
        { text: "$[-3, 2)$", correct: true, feedback: "$-3$ is included ($\\le$), $2$ excluded ($<$)." },
        { text: "$(-3, 2]$", feedback: "The brackets are swapped." },
        { text: "$[-3, 2]$", feedback: "$2$ is excluded by the strict inequality." },
        { text: "$(-3, 2)$", feedback: "$-3$ is included by $\\le$." },
      ],
      hint: "Square bracket for $\\le$ or $\\ge$, round bracket for $<$ or $>$.",
    },
    {
      type: "quiz",
      id: "srf0-5-q2",
      variant: "concept",
      question: "Which of these is **not** valid interval notation?",
      options: [
        { text: "$[2, \\infty]$", correct: true, feedback: "$\\infty$ is not a real number, so it can never be included." },
        { text: "$[2, \\infty)$", feedback: "Valid: all reals $x \\ge 2$." },
        { text: "$(-\\infty, 0)$", feedback: "Valid: all negative reals." },
        { text: "$(-1, 1]$", feedback: "Valid: $-1 < x \\le 1$." },
      ],
      hint: "Which symbol can never sit next to a square bracket?",
    },
    {
      type: "numeric",
      id: "srf0-5-q3",
      variant: "practice",
      question: "How many integers lie in the interval $(-2.5, 3]$?",
      answer: 6,
      hint: "List the integers from the first one above $-2.5$ up to 3.",
      solution: "$-2, -1, 0, 1, 2, 3$: six integers.",
      commonMistakes: [
        { answer: 5, feedback: "3 is included (square bracket)." },
        { answer: 7, feedback: "$-3 < -2.5$, so $-3$ is not in the interval." },
      ],
    },
    {
      type: "numeric",
      id: "srf0-5-q4",
      variant: "practice",
      question: "What is the length of the interval $[-3, 7)$?",
      answer: 10,
      hint: "Length is right end minus left end; brackets do not matter.",
      solution: "$7 - (-3) = 10$.",
      commonMistakes: [{ answer: 4, feedback: "Subtracting a negative: $7 - (-3) = 7 + 3$." }],
    },
    {
      type: "quiz",
      id: "srf0-5-q5",
      variant: "practice",
      question: "The set of $x$ in both $(1, 5]$ and $[3, 8)$ is",
      options: [
        { text: "$[3, 5]$", correct: true, feedback: "Start at the larger left end (3, included by $[3, 8)$) and stop at the smaller right end (5, included by $(1, 5]$)." },
        { text: "$(1, 8)$", feedback: "That is where **at least one** holds." },
        { text: "$(3, 5)$", feedback: "Both 3 and 5 belong to both intervals." },
        { text: "$[1, 8]$", feedback: "That is neither the overlap nor even the union (1 and 8 are excluded)." },
      ],
      hint: "Draw both on one number line and keep the stretch covered twice; check each endpoint separately.",
    },
    {
      type: "quiz",
      id: "srf0-5-q6",
      variant: "practice",
      question: "$\\{x \\in \\mathbb{R} : \\lvert x - 2\\rvert < 3\\}$ is the interval",
      options: [
        { text: "$(-1, 5)$", correct: true, feedback: "$-3 < x - 2 < 3 \\iff -1 < x < 5$." },
        { text: "$[-1, 5]$", feedback: "The inequality is strict, so the endpoints are excluded." },
        { text: "$(-5, 1)$", feedback: "The centre is $+2$, not $-2$." },
        { text: "$(-\\infty, -1) \\cup (5, \\infty)$", feedback: "That is $\\lvert x - 2\\rvert > 3$." },
      ],
      hint: "$\\lvert x - c\\rvert < r$ means $x$ is within $r$ of $c$.",
    },
    {
      type: "quiz",
      id: "srf0-5-q7",
      variant: "practice",
      multiple: true,
      question: "Which of these intervals contain the number 2?",
      options: [
        { text: "$[2, 3)$", correct: true, feedback: "Square bracket at 2." },
        { text: "$(2, 3)$", feedback: "Round bracket at 2 excludes it." },
        { text: "$(-\\infty, 2]$", correct: true, feedback: "Square bracket at 2." },
        { text: "$(1, 2)$", feedback: "Round bracket at 2 excludes it." },
        { text: "$[-2, 2]$", correct: true, feedback: "Closed at both ends." },
      ],
      hint: "Look only at the bracket next to 2, if 2 is an endpoint.",
    },
    {
      type: "quiz",
      id: "srf0-5-q8",
      variant: "concept",
      multiple: true,
      question: "$A = \\{1, 2, 3\\}$ and $B = \\{2, 4, 6\\}$. Which of these could serve as a universal set for both?",
      options: [
        { text: "$\\{1, 2, 3, 4, 6\\}$", correct: true, feedback: "It contains every element of $A$ and of $B$." },
        { text: "$\\mathbb{N}$", correct: true, feedback: "Both sets are subsets of $\\mathbb{N}$." },
        { text: "$\\{1, 2, 3\\}$", feedback: "$B \\not\\subseteq \\{1, 2, 3\\}$, since 4 and 6 are missing." },
        { text: "$\\{2, 4, 6, 8\\}$", feedback: "1 and 3 are missing, so $A$ is not a subset." },
        { text: "$\\mathbb{Z}$", correct: true, feedback: "Both sets are subsets of $\\mathbb{Z}$." },
      ],
      hint: "A universal set must contain each set under discussion as a subset.",
    },
    { type: "heading", text: "JEE-style questions" },
    {
      type: "numeric",
      id: "srf0-5-q9",
      variant: "practice",
      question: "How many integers $x$ satisfy $x^2 - 5x - 14 \\le 0$?",
      answer: 10,
      hint: "Factorise; the solution set is a closed interval between the roots.",
      solution: "$x^2 - 5x - 14 = (x - 7)(x + 2) \\le 0 \\iff x \\in [-2, 7]$. The integers $-2, -1, \\dots, 7$ number $7 - (-2) + 1 = 10$.",
      commonMistakes: [
        { answer: 9, feedback: "Counting integers from $a$ to $b$ inclusive gives $b - a + 1$." },
        { answer: 8, feedback: "Both roots $-2$ and $7$ satisfy $\\le 0$." },
      ],
    },
    {
      type: "numeric",
      id: "srf0-5-q10",
      variant: "practice",
      question: "How many integers lie in both $[-3, 4]$ and $(0, 10)$?",
      answer: 4,
      hint: "Find the overlapping interval first.",
      solution: "The overlap is $(0, 4]$, whose integers are $1, 2, 3, 4$.",
      commonMistakes: [{ answer: 5, feedback: "0 is excluded by the round bracket of $(0, 10)$." }],
    },
    {
      type: "quiz",
      id: "srf0-5-q11",
      variant: "practice",
      question: "The set of real $x$ with $x^2 < 9$ and $x > -1$ is",
      options: [
        { text: "$(-1, 3)$", correct: true, feedback: "$x^2 < 9 \\iff x \\in (-3, 3)$; the overlap with $(-1, \\infty)$ is $(-1, 3)$." },
        { text: "$(-3, 3)$", feedback: "That ignores the condition $x > -1$." },
        { text: "$[-1, 3]$", feedback: "Both inequalities are strict." },
        { text: "$(-1, 9)$", feedback: "$x^2 < 9$ means $\\lvert x\\rvert < 3$, not $x < 9$." },
      ],
      hint: "Turn each condition into an interval, then overlap them.",
    },
    {
      type: "quiz",
      id: "srf0-5-q12",
      variant: "practice",
      multiple: true,
      question: "Let $A = [-2, 5)$ and $B = (1, 7]$. Select all the true statements.",
      options: [
        { text: "$1 \\in A$ and $1 \\notin B$", correct: true, feedback: "$-2 \\le 1 < 5$, but $B$ starts just after 1." },
        { text: "$5 \\in A$", feedback: "The round bracket excludes 5." },
        { text: "$7 \\in B$", correct: true, feedback: "The square bracket includes 7." },
        { text: "$A \\subseteq (-3, 5]$", correct: true, feedback: "Every $x$ with $-2 \\le x < 5$ satisfies $-3 < x \\le 5$." },
        { text: "$B \\subseteq A$", feedback: "$6 \\in B$ but $6 \\notin A$." },
      ],
      hint: "Check each endpoint against its bracket; for an inclusion, look for a point of the left set outside the right one.",
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-0-mastery",
  title: "0.6 · Chapter 0 Mastery",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "No new ideas here: every question below can be rebuilt from four habits. **List the elements first** (roster form settles most traps). **Separate $\\in$ from $\\subseteq$** (object versus set). **Count subsets with in/out choices** ($2^n$, then force or forbid elements for conditions). **Draw intervals on one number line** and check each endpoint's bracket.",
    },
    { type: "heading", text: "Reconstruct it" },
    {
      type: "table",
      headers: ["Signal in the question", "Habit"],
      rows: [
        ["Set-builder form, \"how many elements\"", "Convert to roster; repeats count once"],
        ["Sets whose elements are sets", "List the top-level elements, then test $\\in$ and $\\subseteq$"],
        ["\"subsets\", \"proper subsets\", $P(A)$", "$2^n$, $2^n - 1$, $n(P(A)) = 2^{n(A)}$"],
        ["\"containing $a$\", \"not containing $b$\", \"exactly $k$\"", "Force choices: $2^{n-1}$, $2^{n-2}$, $\\binom{n}{k}$"],
        ["Inequalities and brackets", "Number line; overlap = larger left end to smaller right end"],
      ],
    },
    { type: "heading", text: "Mixed mastery problems" },
    {
      type: "quiz",
      id: "srf0-6-q1",
      variant: "mastery",
      question: "The roster form of $\\{x \\in \\mathbb{Z} : x^2 \\le 4\\}$ is",
      options: [
        { text: "$\\{-2, -1, 0, 1, 2\\}$", correct: true, feedback: "$x^2 \\le 4 \\iff -2 \\le x \\le 2$." },
        { text: "$\\{1, 2\\}$", feedback: "That is the answer over $\\mathbb{N}$." },
        { text: "$\\{-2, 2\\}$", feedback: "That is $x^2 = 4$, not $x^2 \\le 4$." },
        { text: "$\\{-1, 0, 1\\}$", feedback: "$\\pm 2$ satisfy $x^2 \\le 4$ with equality." },
      ],
      hint: "Turn $x^2 \\le 4$ into a range for $x$, then keep the integers.",
    },
    {
      type: "numeric",
      id: "srf0-6-q2",
      variant: "mastery",
      question: "Find $n(\\{x \\in \\mathbb{N} : x \\text{ divides } 36\\})$.",
      answer: 9,
      hint: "Use the prime factorisation: $36 = 2^2 \\cdot 3^2$.",
      solution: "The number of divisors of $2^2 \\cdot 3^2$ is $(2 + 1)(2 + 1) = 9$: 1, 2, 3, 4, 6, 9, 12, 18, 36.",
      commonMistakes: [{ answer: 8, feedback: "Did you miss 36 itself, or 1?" }],
    },
    {
      type: "quiz",
      id: "srf0-6-q3",
      variant: "mastery",
      multiple: true,
      question: "Let $A = \\{\\varnothing, \\{\\varnothing\\}\\}$. Select all the true statements.",
      options: [
        { text: "$\\varnothing \\in A$", correct: true, feedback: "$\\varnothing$ is listed as an element." },
        { text: "$\\varnothing \\subseteq A$", correct: true, feedback: "True for every set." },
        { text: "$\\{\\varnothing\\} \\subseteq A$", correct: true, feedback: "Its only element, $\\varnothing$, is in $A$." },
        { text: "$\\{\\{\\varnothing\\}\\} \\in A$", feedback: "The elements of $A$ are $\\varnothing$ and $\\{\\varnothing\\}$. $\\{\\{\\varnothing\\}\\}$ is not one of them (though it is a subset)." },
        { text: "$n(P(A)) = 4$", correct: true, feedback: "$n(A) = 2$, so $2^2 = 4$." },
      ],
      hint: "Write down the two elements of $A$ and test every statement against that list.",
    },
    {
      type: "numeric",
      id: "srf0-6-q4",
      variant: "mastery",
      question: "How many proper subsets does $\\{x \\in \\mathbb{N} : x^2 < 30\\}$ have?",
      answer: 31,
      hint: "Find the set first; then use $2^n - 1$.",
      solution: "$5^2 = 25 < 30 \\le 36$, so the set is $\\{1, 2, 3, 4, 5\\}$ and has $2^5 - 1 = 31$ proper subsets.",
      commonMistakes: [
        { answer: 32, feedback: "That counts the set itself, which is not a proper subset." },
        { answer: 63, feedback: "$6^2 = 36$ is not below 30, so the set has 5 elements." },
      ],
    },
    {
      type: "numeric",
      id: "srf0-6-q5",
      variant: "mastery",
      question:
        "Sets $A$ and $B$ have $m$ and $n$ elements, and $A$ has 240 more subsets than $B$. Find $m + n$.",
      answer: 12,
      hint: "$2^n(2^{m-n} - 1) = 240$. Split 240 into a power of 2 times an odd number.",
      solution: "$240 = 2^4 \\times 15$, so $2^n = 16$ and $2^{m-n} - 1 = 15$. Then $n = 4$, $m - n = 4$, $m = 8$. Check: $256 - 16 = 240$. So $m + n = 12$.",
      commonMistakes: [{ answer: 8, feedback: "That is $m$. Add $n = 4$." }],
    },
    {
      type: "numeric",
      id: "srf0-6-q6",
      variant: "mastery",
      question: "If $n(A) = 2$, find $n(P(P(A)))$.",
      answer: 16,
      hint: "Apply $k \\mapsto 2^k$ twice.",
      solution: "$n(P(A)) = 2^2 = 4$, so $n(P(P(A))) = 2^4 = 16$.",
      commonMistakes: [{ answer: 8, feedback: "$P(A)$ has 4 elements, so $P(P(A))$ has $2^4$, not $2 \\times 4$." }],
    },
    {
      type: "quiz",
      id: "srf0-6-q7",
      variant: "mastery",
      question: "$\\{x \\in \\mathbb{R} : \\lvert x + 1\\rvert \\ge 2\\}$ equals",
      options: [
        { text: "$(-\\infty, -3] \\cup [1, \\infty)$", correct: true, feedback: "$x + 1 \\ge 2$ or $x + 1 \\le -2$, so $x \\ge 1$ or $x \\le -3$." },
        { text: "$[-3, 1]$", feedback: "That is $\\lvert x + 1\\rvert \\le 2$." },
        { text: "$(-\\infty, -1] \\cup [3, \\infty)$", feedback: "The centre is $-1$: the points at distance 2 from $-1$ are $-3$ and $1$." },
        { text: "$(-\\infty, -3) \\cup (1, \\infty)$", feedback: "$\\ge$ includes the endpoints $-3$ and $1$." },
      ],
      hint: "$\\lvert x - c\\rvert \\ge r$ means $x$ is at least $r$ away from $c$, on either side.",
    },
    {
      type: "numeric",
      id: "srf0-6-q8",
      variant: "mastery",
      question: "How many subsets of $\\{1, 2, \\dots, 10\\}$ contain both 1 and 2 but not 10?",
      answer: 128,
      hint: "Three in/out decisions are forced.",
      solution: "1 and 2 are in, 10 is out, and the other 7 elements are free: $2^7 = 128$.",
      commonMistakes: [{ answer: 256, feedback: "That forgets the condition on 10." }],
    },
    {
      type: "quiz",
      id: "srf0-6-q9",
      variant: "mastery",
      multiple: true,
      question: "Select all the sets that are empty.",
      options: [
        { text: "$\\{x \\in \\mathbb{R} : x^2 + x + 1 = 0\\}$", correct: true, feedback: "Discriminant $1 - 4 = -3 < 0$: no real root." },
        { text: "$\\{x \\in \\mathbb{N} : 3 < x < 4\\}$", correct: true, feedback: "No natural number lies strictly between 3 and 4." },
        { text: "$\\{x \\in \\mathbb{Q} : x^2 = 3\\}$", correct: true, feedback: "$\\pm\\sqrt3$ are irrational." },
        { text: "$\\{x \\in \\mathbb{Z} : \\lvert x\\rvert < 1\\}$", feedback: "$x = 0$ qualifies: the set is $\\{0\\}$." },
        { text: "$\\{x \\in \\mathbb{R} : x^2 \\le 0\\}$", feedback: "$x = 0$ qualifies." },
      ],
      hint: "For each set, try to find a single element. Watch the universe ($\\mathbb{N}$, $\\mathbb{Z}$, $\\mathbb{Q}$, $\\mathbb{R}$).",
    },
    {
      type: "numeric",
      id: "srf0-6-q10",
      variant: "mastery",
      question: "How many elements does $\\left\\{\\cos\\frac{n\\pi}{3} : n \\in \\mathbb{Z}\\right\\}$ have?",
      answer: 4,
      hint: "The values repeat with period 6 in $n$. List one period and remove repeats.",
      solution: "For $n = 0, 1, \\dots, 5$: $1, \\frac12, -\\frac12, -1, -\\frac12, \\frac12$. The distinct values are $\\{-1, -\\frac12, \\frac12, 1\\}$: 4 elements.",
      commonMistakes: [{ answer: 6, feedback: "Six values of $n$, but $\\pm\\frac12$ each repeat." }],
    },
    {
      type: "quiz",
      id: "srf0-6-q11",
      variant: "mastery",
      question: "$A = \\{x : x^2 - 3x + 2 = 0\\}$ and $B = \\{x \\in \\mathbb{N} : x < 3\\}$. Then",
      options: [
        { text: "$A = B$", correct: true, feedback: "Both are $\\{1, 2\\}$." },
        { text: "$A$ and $B$ are equivalent but not equal", feedback: "They have exactly the same elements, so they are equal (and so also equivalent)." },
        { text: "$A \\subset B$ properly", feedback: "$A = B$, so the inclusion is not proper." },
        { text: "$A$ and $B$ are not equivalent", feedback: "Both have 2 elements." },
      ],
      hint: "Roster form for both.",
    },
    {
      type: "numeric",
      id: "srf0-6-q12",
      variant: "mastery",
      question: "How many subsets of $\\{1, 2, 3, 4, 5, 6\\}$ have an odd number of elements?",
      answer: 32,
      hint: "Add $\\binom{6}{1} + \\binom{6}{3} + \\binom{6}{5}$, or pair each subset with the one obtained by toggling the element 1.",
      solution: "$\\binom{6}{1} + \\binom{6}{3} + \\binom{6}{5} = 6 + 20 + 6 = 32$. (Toggling 1 in or out pairs odd-size subsets with even-size ones, so exactly half of the 64 are odd.)",
      commonMistakes: [{ answer: 31, feedback: "Nothing needs removing: the empty set has 0 elements, an even number, so it was never counted. The odd sizes give $6 + 20 + 6$." }],
    },
    {
      type: "numeric",
      id: "srf0-6-q13",
      variant: "mastery",
      question: "How many integers lie in $[-\\pi, \\pi]$?",
      answer: 7,
      hint: "$\\pi \\approx 3.14$.",
      solution: "The integers from $-3$ to $3$: seven of them.",
      commonMistakes: [{ answer: 6, feedback: "Count 0 as well: $-3, \\dots, 3$." }],
    },
    {
      type: "quiz",
      id: "srf0-6-q14",
      variant: "mastery",
      multiple: true,
      question: "A set $A$ has 4 elements, one of which is $a$. Select all the true statements.",
      options: [
        { text: "$n(P(A)) = 16$", correct: true, feedback: "$2^4 = 16$." },
        { text: "$A$ has 15 proper subsets", correct: true, feedback: "$16 - 1 = 15$." },
        { text: "$A$ has 6 subsets with exactly 2 elements", correct: true, feedback: "$\\binom{4}{2} = 6$." },
        { text: "$A$ has 8 subsets containing $a$", correct: true, feedback: "$2^{4 - 1} = 8$." },
        { text: "$A$ has 16 non-empty subsets", feedback: "Non-empty subsets number $16 - 1 = 15$." },
      ],
      hint: "Every count here is an in/out count: $2^n$, minus something, or with some choices forced.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "You can now describe, compare and count sets. Chapter 1 combines them: union, intersection, difference and complement as choices of Venn regions, the laws of set algebra, and inclusion–exclusion for counting the elements of $A \\cup B$ and $A \\cup B \\cup C$.",
    },
  ]),
};

export const srfChapter0Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lessonMastery,
];
