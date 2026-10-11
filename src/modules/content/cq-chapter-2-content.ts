import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Complex Numbers & Quadratics Chapter 2 — Complex Numbers as Numbers.
 * Why the number i is needed (the quadratic formula and Cardano's cubic),
 * the algebra of a + ib, division and powers of i, the conjugate and the
 * modulus with their properties, square roots of a complex number, and
 * quadratics with complex roots (conjugate pairs for real coefficients,
 * the formula with a complex square root otherwise, equations in z and z̄).
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "why-we-need-i",
  title: "2.1 · Why We Need i",
  position: 1,
  blocks: blocks([
    {
      type: "text",
      content:
        "In Chapter 0 the discriminant split quadratics into three kinds. When $D > 0$ there are two real roots, when $D = 0$ one repeated root, and when $D < 0$ we said \"no real roots\" and stopped. Take the simplest such equation, $x^2 + 1 = 0$. The parabola $y = x^2 + 1$ sits entirely above the x-axis, so no real number squares to $-1$.",
    },
    {
      type: "interactive",
      config: {
        component: "cq-quadratic-explorer",
        a: { min: -2, max: 2, step: 0.5, initial: 1 },
        b: { min: -4, max: 4, step: 0.5, initial: 0 },
        c: { min: -4, max: 4, step: 0.5, initial: 1 },
        readouts: ["discriminant", "roots"],
        window: { xmin: -4, xmax: 4, ymin: -3, ymax: 6 },
        caption:
          "Start at $x^2 + 1$: the graph misses the axis and $D = -4$. Lower $c$ through $0$ and watch two real roots appear. For $c > 0$ the roots readout is written with an $i$: this chapter explains what that means.",
      },
    },
    {
      type: "text",
      content:
        "For two centuries mathematicians were happy to stop there: \"no real roots\" seemed to be the honest answer. What forced them to go further was not a quadratic at all but a cubic.",
    },
    { type: "heading", text: "Cardano's cubic: a real answer through an impossible door" },
    {
      type: "text",
      content:
        "In 1545 Cardano published a formula for cubics of the form $x^3 = px + q$:",
    },
    {
      type: "math",
      latex:
        "x = \\sqrt[3]{\\frac q2 + \\sqrt{\\frac{q^2}{4} - \\frac{p^3}{27}}} + \\sqrt[3]{\\frac q2 - \\sqrt{\\frac{q^2}{4} - \\frac{p^3}{27}}}",
    },
    {
      type: "text",
      content:
        "Bombelli tried it on $x^3 = 15x + 4$. Here $p = 15$, $q = 4$, so $\\frac{q^2}{4} - \\frac{p^3}{27} = 4 - 125 = -121$ and the formula reads\n\n$$x = \\sqrt[3]{2 + \\sqrt{-121}} + \\sqrt[3]{2 - \\sqrt{-121}}.$$\n\nYet the equation plainly has the real root $x = 4$, since $64 = 60 + 4$. The formula was heading for a perfectly real answer, but it had to pass through the square root of a negative number to get there. Refusing to calculate with $\\sqrt{-121}$ meant refusing a real root.",
    },
    {
      type: "worked-example",
      id: "cq2-1-we1",
      title: "Worked example 1: Bombelli's calculation",
      problem:
        "Write $\\sqrt{-121} = 11\\sqrt{-1}$ and call $\\sqrt{-1} = i$, a symbol with $i^2 = -1$. Show that $(2 + i)^3 = 2 + 11i$, and use it to finish Cardano's formula for $x^3 = 15x + 4$.",
      steps: [
        { text: "Expand with the binomial theorem, treating $i$ like any letter: $(2 + i)^3 = 8 + 3(4)(i) + 3(2)(i^2) + i^3$." },
        { text: "Use $i^2 = -1$, so $i^3 = i^2 \\cdot i = -i$. *Why this step:* this single rule is the only new thing. Everything else is ordinary algebra." },
        { latex: "(2+i)^3 = 8 + 12i - 6 - i = 2 + 11i" },
        { text: "So $\\sqrt[3]{2 + 11i} = 2 + i$, and in the same way $(2 - i)^3 = 2 - 11i$, so $\\sqrt[3]{2 - 11i} = 2 - i$." },
        { text: "Add: $x = (2 + i) + (2 - i) = 4$. The $i$'s cancel and the real root appears." },
      ],
      answer: "$x = (2 + i) + (2 - i) = 4$, the real root, reached by calculating with $\\sqrt{-1}$.",
    },
    { type: "heading", text: "The imaginary unit" },
    {
      type: "callout",
      variant: "definition",
      title: "The imaginary unit i",
      content:
        "We declare a new number $i$ with $$i^2 = -1,$$ and agree to keep all the usual rules of arithmetic (commutative, associative and distributive laws). For a positive real $a$ we define $\\sqrt{-a} = i\\sqrt a$. Numbers $bi$ with real $b \\ne 0$ are called **purely imaginary**.",
    },
    {
      type: "text",
      content:
        "With $i$ available, $x^2 + 1 = 0$ has the two roots $x = \\pm i$, because $i^2 = -1$ and $(-i)^2 = i^2 = -1$. More generally $x^2 + a = 0$ with $a > 0$ gives $x = \\pm i\\sqrt a$. The word \"imaginary\" is a historical accident (Descartes meant it as an insult). These numbers are as legitimate as negative numbers, which also once seemed absurd.",
    },
    {
      type: "worked-example",
      id: "cq2-1-we2",
      title: "Worked example 2: simplifying square roots of negatives",
      problem: "Simplify (a) $\\sqrt{-16} + \\sqrt{-25}$ and (b) $\\sqrt{-2}\\cdot\\sqrt{-8}$.",
      steps: [
        { text: "(a) Convert each root first: $\\sqrt{-16} = 4i$ and $\\sqrt{-25} = 5i$, so the sum is $9i$." },
        { text: "(b) Again convert **before** multiplying: $\\sqrt{-2} = i\\sqrt2$ and $\\sqrt{-8} = i\\sqrt8$. *Why this step:* the rule $\\sqrt a\\sqrt b = \\sqrt{ab}$ was proved only for $a, b \\ge 0$, so never apply it to two negatives." },
        { latex: "\\sqrt{-2}\\cdot\\sqrt{-8} = i\\sqrt2 \\cdot i\\sqrt8 = i^2\\sqrt{16} = -4" },
      ],
      answer: "(a) $9i$, (b) $-4$ (not $+4$).",
    },
    {
      type: "worked-example",
      id: "cq2-1-we3",
      title: "Worked example 3: a quadratic with D < 0",
      problem: "Solve $x^2 + 2x + 5 = 0$.",
      steps: [
        { text: "Complete the square: $x^2 + 2x + 1 = -4$, so $(x + 1)^2 = -4$." },
        { text: "Take square roots using $i$: $x + 1 = \\pm\\sqrt{-4} = \\pm 2i$." },
        { text: "So $x = -1 \\pm 2i$. Check one root: $(-1 + 2i)^2 + 2(-1 + 2i) + 5 = (1 - 4i - 4) + (-2 + 4i) + 5 = 0$." },
      ],
      answer: "$x = -1 + 2i$ or $x = -1 - 2i$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"$\\sqrt a\\sqrt b = \\sqrt{ab}$ always\"",
      content:
        "The rule $\\sqrt a\\sqrt b = \\sqrt{ab}$ holds when at least one of $a, b$ is non-negative. With both negative it fails: $$\\sqrt{-4}\\sqrt{-9} = (2i)(3i) = 6i^2 = -6, \\quad\\text{but}\\quad \\sqrt{(-4)(-9)} = \\sqrt{36} = 6.$$ Always rewrite $\\sqrt{-a}$ as $i\\sqrt a$ first, then multiply. The famous \"proof\" that $-1 = 1$ uses exactly this illegal step.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "cq2-1-q1",
      variant: "practice",
      question: "What is $\\sqrt{-9}\\times\\sqrt{-4}$?",
      options: [
        { text: "$-6$", correct: true, feedback: "$\\sqrt{-9}\\sqrt{-4} = (3i)(2i) = 6i^2 = -6$." },
        { text: "$6$", feedback: "That merges the roots into $\\sqrt{36}$, which is illegal when both numbers under the roots are negative." },
        { text: "$6i$", feedback: "$i \\cdot i = i^2 = -1$, a real number. The product has no $i$ left in it." },
        { text: "$-6i$", feedback: "Two factors of $i$ give $i^2 = -1$, not $-i$." },
      ],
      hint: "Rewrite each root as $i$ times a real root before multiplying.",
    },
    {
      type: "numeric",
      id: "cq2-1-q2",
      variant: "practice",
      question: "Evaluate $\\sqrt{-16}\\cdot\\sqrt{-1}$.",
      answer: -4,
      hint: "$\\sqrt{-16} = 4i$ and $\\sqrt{-1} = i$.",
      solution: "$\\sqrt{-16}\\cdot\\sqrt{-1} = 4i \\cdot i = 4i^2 = -4$.",
      commonMistakes: [
        { answer: 4, feedback: "That is $\\sqrt{(-16)(-1)} = \\sqrt{16}$. The product rule for roots fails when both are negative." },
      ],
    },
    {
      type: "numeric",
      id: "cq2-1-q3",
      variant: "practice",
      question: "$\\sqrt{-25} + 3\\sqrt{-4} - \\sqrt{-49} = ki$ for a real number $k$. Find $k$.",
      answer: 4,
      hint: "Convert each term to a real multiple of $i$, then combine like terms.",
      solution: "$5i + 3(2i) - 7i = (5 + 6 - 7)i = 4i$, so $k = 4$.",
      commonMistakes: [
        { answer: 0, feedback: "Check the middle term: $3\\sqrt{-4} = 3 \\cdot 2i = 6i$." },
        { answer: -16, feedback: "You treated $\\sqrt{-25}$ as $-5$ (and so on). $\\sqrt{-25} = 5i$, not a negative real." },
      ],
    },
    {
      type: "quiz",
      id: "cq2-1-q4",
      variant: "practice",
      question: "Solve $x^2 + 16 = 0$.",
      options: [
        { text: "$x = \\pm 4i$", correct: true, feedback: "$x^2 = -16$, so $x = \\pm\\sqrt{-16} = \\pm 4i$. Check: $(4i)^2 = 16i^2 = -16$." },
        { text: "$x = \\pm 4$", feedback: "$4^2 = 16$, not $-16$." },
        { text: "$x = 4i$ only", feedback: "Every non-zero number has two square roots: $-4i$ also squares to $-16$." },
        { text: "No solution", feedback: "No **real** solution. With $i$ there are two." },
      ],
      hint: "Isolate $x^2$, then use $\\sqrt{-a} = i\\sqrt a$ and remember the $\\pm$.",
    },
    {
      type: "quiz",
      id: "cq2-1-q5",
      variant: "concept",
      question: "Select all the statements that are true.",
      multiple: true,
      options: [
        { text: "$\\sqrt{-3}\\cdot\\sqrt{-12} = -6$", correct: true, feedback: "$i\\sqrt3 \\cdot i\\sqrt{12} = i^2\\sqrt{36} = -6$." },
        { text: "$\\sqrt{-3}\\cdot\\sqrt{12} = \\sqrt{-36}$", correct: true, feedback: "With one negative the product rule survives: both sides equal $6i$." },
        { text: "$\\sqrt{(-3)(-12)} = \\sqrt{-3}\\cdot\\sqrt{-12}$", feedback: "The left side is $\\sqrt{36} = 6$, the right side is $-6$." },
        { text: "$i^2 = -1$", correct: true, feedback: "That is the definition of $i$." },
        { text: "$\\sqrt{-1}$ is not a number, so it may not be used in a calculation", feedback: "Bombelli's cubic shows that calculating with it is exactly what gives the real root $4$." },
      ],
      hint: "Test each product by converting $\\sqrt{-a}$ to $i\\sqrt a$ first.",
    },
    {
      type: "numeric",
      id: "cq2-1-q6",
      variant: "practice",
      question: "Expand $(2 + i)^3$ and write it as $2 + bi$. Find $b$.",
      answer: 11,
      hint: "$(2 + i)^3 = 8 + 3\\cdot 4\\cdot i + 3\\cdot 2\\cdot i^2 + i^3$, with $i^3 = -i$.",
      solution: "$8 + 12i - 6 - i = 2 + 11i$, so $b = 11$. This is why $\\sqrt[3]{2 + 11i} = 2 + i$ in Bombelli's calculation.",
      commonMistakes: [
        { answer: 13, feedback: "$i^3 = -i$, so the last term subtracts $i$: $12 - 1 = 11$." },
        { answer: 12, feedback: "You dropped the $i^3$ term. It contributes $-i$." },
      ],
    },
    {
      type: "quiz",
      id: "cq2-1-q7",
      variant: "practice",
      question: "Solve $x^2 + 2x + 10 = 0$.",
      options: [
        { text: "$x = -1 \\pm 3i$", correct: true, feedback: "$(x + 1)^2 = -9$, so $x + 1 = \\pm 3i$." },
        { text: "$x = 1 \\pm 3i$", feedback: "Completing the square gives $(x + 1)^2$, so the real part is $-1$." },
        { text: "$x = -1 \\pm 9i$", feedback: "$\\sqrt{-9} = 3i$, not $9i$." },
        { text: "$x = -2 \\pm 6i$", feedback: "You forgot to divide by $2a = 2$ in the formula: $\\frac{-2 \\pm 6i}{2}$." },
      ],
      hint: "Complete the square: $x^2 + 2x + 1 = -9$.",
    },
    {
      type: "quiz",
      id: "cq2-1-q8",
      variant: "concept",
      question: "A student writes: $-1 = i \\cdot i = \\sqrt{-1}\\cdot\\sqrt{-1} = \\sqrt{(-1)(-1)} = \\sqrt 1 = 1$. Which equality is the mistake?",
      shuffle: false,
      options: [
        { text: "$-1 = i\\cdot i$", feedback: "This is the definition $i^2 = -1$." },
        { text: "$i\\cdot i = \\sqrt{-1}\\cdot\\sqrt{-1}$", feedback: "This is the definition $\\sqrt{-1} = i$." },
        { text: "$\\sqrt{-1}\\cdot\\sqrt{-1} = \\sqrt{(-1)(-1)}$", correct: true, feedback: "Right: merging two roots of negative numbers is not allowed." },
        { text: "$\\sqrt{(-1)(-1)} = \\sqrt 1 = 1$", feedback: "That is ordinary real arithmetic and is correct." },
      ],
      hint: "Which rule of real square roots needs both numbers to be non-negative?",
    },
    {
      type: "quiz",
      id: "cq2-1-q9",
      variant: "practice",
      question: "JEE Main. The value of $\\sqrt{-2}\\cdot\\sqrt{-3}\\cdot\\sqrt{-6}$ is",
      options: [
        { text: "$-6i$", correct: true, feedback: "$i\\sqrt2 \\cdot i\\sqrt3 \\cdot i\\sqrt6 = i^3\\sqrt{36} = -6i$." },
        { text: "$6i$", feedback: "$i^3 = i^2 \\cdot i = -i$, so the sign is negative." },
        { text: "$-6$", feedback: "Three factors of $i$ leave one $i$ behind: $i^3 = -i$." },
        { text: "$6$", feedback: "You merged the roots into $\\sqrt{36}$, which is not allowed for negatives, and dropped the $i$." },
      ],
      hint: "Each root contributes one factor of $i$. What is $i^3$?",
    },
    {
      type: "quiz",
      id: "cq2-1-q10",
      variant: "practice",
      question: "JEE Main. Applying Cardano's formula to $x^3 = 6x + 4$ gives $x = \\sqrt[3]{2 + \\sqrt{-4}} + \\sqrt[3]{2 - \\sqrt{-4}}$. Given that $(-1 + i)^3 = 2 + 2i$, which real root does the formula produce?",
      options: [
        { text: "$-2$", correct: true, feedback: "$\\sqrt[3]{2 + 2i} = -1 + i$ and $\\sqrt[3]{2 - 2i} = -1 - i$, so $x = -2$. Check: $-8 = -12 + 4$." },
        { text: "$2$", feedback: "Check it: $8 \\ne 12 + 4$. Add $(-1 + i) + (-1 - i)$ carefully." },
        { text: "$-2 + 2i$", feedback: "The imaginary parts $+i$ and $-i$ cancel." },
        { text: "The formula fails because $\\sqrt{-4}$ is not real", feedback: "Calculating through $\\sqrt{-4} = 2i$ is exactly what produces the real root." },
      ],
      hint: "Conjugating $(-1 + i)^3 = 2 + 2i$ gives $(-1 - i)^3 = 2 - 2i$. Add the two cube roots.",
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "the-algebra-of-a-plus-ib",
  title: "2.2 · The Algebra of a + ib",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "Once $i$ is allowed, sums like $3 + 2i$ appear naturally: they are the roots of $x^2 - 6x + 13 = 0$. Every number we can now build has a real piece and an $i$ piece, and we never need anything more. This lesson sets up the arithmetic of such numbers.",
    },
    { type: "heading", text: "Complex numbers and their parts" },
    {
      type: "callout",
      variant: "definition",
      title: "Complex number, real part, imaginary part",
      content:
        "A **complex number** is $z = a + ib$ with $a, b$ real. The set of all of them is $\\mathbb C$.\n\n- $a = \\mathrm{Re}\\, z$ is the **real part**.\n- $b = \\mathrm{Im}\\, z$ is the **imaginary part**. It is the real number $b$, not $bi$.\n\n$z$ is **purely real** when $b = 0$ and **purely imaginary** when $a = 0$, $b \\ne 0$. Every real number is a complex number with imaginary part $0$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Equality",
      content:
        "$a + ib = c + id$ (with $a, b, c, d$ real) exactly when $a = c$ **and** $b = d$. One complex equation is two real equations.",
    },
    {
      type: "text",
      content:
        "Why must the parts match? If $a + ib = c + id$ then $a - c = i(d - b)$. Square both sides: $(a - c)^2 = -(d - b)^2$. The left side is $\\ge 0$ and the right side is $\\le 0$, so both are $0$, giving $a = c$ and $b = d$.",
    },
    { type: "heading", text: "Adding and multiplying" },
    {
      type: "text",
      content:
        "Add and subtract part by part, like collecting like terms. Multiply by expanding the brackets and replacing $i^2$ by $-1$:",
    },
    {
      type: "math",
      latex:
        "\\begin{aligned} (a + ib) \\pm (c + id) &= (a \\pm c) + i(b \\pm d) \\\\ (a + ib)(c + id) &= ac + iad + ibc + i^2bd = (ac - bd) + i(ad + bc) \\end{aligned}",
    },
    {
      type: "text",
      content:
        "All the familiar laws carry over: addition and multiplication are commutative and associative, multiplication distributes over addition, $0$ and $1$ behave as usual, and every $z$ has a negative $-z = -a - ib$. Adding complex numbers also has a picture: treat $a + ib$ as the arrow to the point $(a, b)$, and addition becomes adding arrows tip to tail. Chapter 3 develops this. Here is a preview.",
    },
    {
      type: "interactive",
      config: {
        component: "cq-argand-plane",
        mode: "sum",
        z1: [3, 1],
        z2: [1, 2],
        show: ["difference"],
        caption:
          "Drag $z_1$ and $z_2$. The readout $z_1 + z_2$ just adds real parts and imaginary parts separately, which is the parallelogram rule for arrows.",
      },
    },
    {
      type: "worked-example",
      id: "cq2-2-we1",
      title: "Worked example 1: a product",
      problem: "Write $(3 + 2i)(4 - i)$ in the form $a + ib$.",
      steps: [
        { text: "Expand all four products: $12 - 3i + 8i - 2i^2$." },
        { text: "Replace $i^2$ by $-1$: $-2i^2 = +2$. *Why this step:* this is where the product differs from a product of real binomials." },
        { latex: "(3 + 2i)(4 - i) = 12 + 2 + (-3 + 8)i = 14 + 5i" },
      ],
      answer: "$14 + 5i$.",
    },
    {
      type: "worked-example",
      id: "cq2-2-we2",
      title: "Worked example 2: equating real and imaginary parts",
      problem: "Find real $x, y$ with $(x + iy)(2 - 3i) = 4 + i$.",
      steps: [
        { text: "Expand the left side: $2x - 3ix + 2iy - 3i^2y = (2x + 3y) + i(2y - 3x)$." },
        { text: "Equate parts. *Why this step:* $x, y$ are real, so $2x + 3y$ and $2y - 3x$ are real, and equality of complex numbers means equality of both parts." },
        { latex: "2x + 3y = 4, \\qquad -3x + 2y = 1" },
        { text: "Solve: multiply the first by 2 and the second by 3 and subtract to get $13x = 5$, so $x = \\frac{5}{13}$. Then $3y = 4 - \\frac{10}{13} = \\frac{42}{13}$, so $y = \\frac{14}{13}$." },
      ],
      answer: "$x = \\frac{5}{13}$, $y = \\frac{14}{13}$.",
    },
    {
      type: "worked-example",
      id: "cq2-2-we3",
      title: "Worked example 3: a JEE-style equation",
      problem: "Find real $x, y$ with $(3x - 2iy)(2 + i)^2 = 10(1 + i)$.",
      steps: [
        { text: "Simplify the known factor first: $(2 + i)^2 = 4 + 4i + i^2 = 3 + 4i$." },
        { text: "Expand: $(3x - 2iy)(3 + 4i) = 9x + 12ix - 6iy - 8i^2y = (9x + 8y) + i(12x - 6y)$." },
        { latex: "9x + 8y = 10, \\qquad 12x - 6y = 10" },
        { text: "From the second, $y = 2x - \\frac53$. Substitute: $9x + 16x - \\frac{40}{3} = 10$, so $25x = \\frac{70}{3}$ and $x = \\frac{14}{15}$. Then $y = \\frac{28}{15} - \\frac{25}{15} = \\frac15$." },
      ],
      answer: "$x = \\frac{14}{15}$, $y = \\frac15$.",
    },
    {
      type: "worked-example",
      id: "cq2-2-we4",
      title: "Worked example 4: powers of 1 + i",
      problem: "Compute $(1 + i)^2$, $(1 - i)^2$ and $(1 + i)^4$.",
      steps: [
        { text: "$(1 + i)^2 = 1 + 2i + i^2 = 2i$." },
        { text: "$(1 - i)^2 = 1 - 2i + i^2 = -2i$." },
        { text: "$(1 + i)^4 = \\left((1 + i)^2\\right)^2 = (2i)^2 = 4i^2 = -4$. *Why this step:* squaring first keeps the arithmetic tiny. Remember $(1 \\pm i)^2 = \\pm 2i$, it saves time in JEE problems." },
      ],
      answer: "$(1 + i)^2 = 2i$, $(1 - i)^2 = -2i$, $(1 + i)^4 = -4$.",
    },
    { type: "heading", text: "No ordering of complex numbers" },
    {
      type: "text",
      content:
        "Real numbers can be compared with $<$ in a way that respects arithmetic: if $x > 0$ and $y > 0$ then $xy > 0$, and $x^2 \\ge 0$ always. No such ordering exists on $\\mathbb C$. Suppose $i > 0$. Then $i \\cdot i > 0$, so $-1 > 0$, which is false. Suppose instead $i < 0$. Then $-i > 0$, so $(-i)(-i) > 0$, which again says $-1 > 0$. Either way we reach a contradiction.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"$3 + 2i > 1 + 2i$ because $3 > 1$\"",
      content:
        "Inequalities between complex numbers are meaningless unless both are real. You may compare real quantities built from them, such as $\\mathrm{Re}\\, z$, $\\mathrm{Im}\\, z$ or (next lessons) $|z|$. A JEE statement like \"$z_1 > z_2$\" silently tells you both are real.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"$\\mathrm{Im}(3 - 4i) = -4i$\"",
      content:
        "The imaginary part is the real coefficient: $\\mathrm{Im}(3 - 4i) = -4$. Writing $-4i$ breaks every formula that uses it, e.g. $z = \\mathrm{Re}\\, z + i\\,\\mathrm{Im}\\, z$ would give $3 + i(-4i) = 7$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "cq2-2-q1",
      variant: "practice",
      question: "What is $\\mathrm{Im}(5 - 7i)$?",
      options: [
        { text: "$-7$", correct: true, feedback: "The imaginary part is the real coefficient of $i$." },
        { text: "$-7i$", feedback: "The imaginary part is a real number. $-7i$ is the imaginary **term**." },
        { text: "$7$", feedback: "Keep the sign: the coefficient of $i$ is $-7$." },
        { text: "$5$", feedback: "$5$ is the real part." },
      ],
      hint: "Write $z = a + ib$ and read off $b$.",
    },
    {
      type: "numeric",
      id: "cq2-2-q2",
      variant: "practice",
      question: "Find $\\mathrm{Re}\\left[(2 + 3i)(1 - 4i)\\right]$.",
      answer: 14,
      hint: "The real part of $(a + ib)(c + id)$ is $ac - bd$.",
      solution: "$(2 + 3i)(1 - 4i) = 2 - 8i + 3i - 12i^2 = 14 - 5i$, so the real part is $14$.",
      commonMistakes: [
        { answer: -10, feedback: "$-12i^2 = +12$, not $-12$. The product of the imaginary parts enters with a minus sign: $ac - bd = 2 - (3)(-4) = 14$." },
        { answer: 2, feedback: "You multiplied only the real parts. The term $-12i^2$ is real too." },
      ],
    },
    {
      type: "numeric",
      id: "cq2-2-q3",
      variant: "practice",
      question: "Find $\\mathrm{Im}\\left[(2 + 3i)(1 - 4i)\\right]$.",
      answer: -5,
      hint: "The imaginary part of $(a + ib)(c + id)$ is $ad + bc$.",
      solution: "$ad + bc = 2(-4) + 3(1) = -5$.",
      commonMistakes: [
        { answer: -12, feedback: "That is $bd$, which becomes real after $i^2 = -1$. The imaginary part is $ad + bc$." },
        { answer: 11, feedback: "Watch the sign of $-8i$: $-8 + 3 = -5$." },
      ],
    },
    {
      type: "quiz",
      id: "cq2-2-q4",
      variant: "concept",
      question: "Select all the statements that are true for all complex numbers $z, z_1, z_2$.",
      multiple: true,
      options: [
        { text: "$3 + 2i > 1 + 2i$", feedback: "Complex numbers that are not real cannot be compared with $>$." },
        { text: "$(1 + i)^2 = 2i$", correct: true, feedback: "$1 + 2i + i^2 = 2i$." },
        { text: "$\\mathrm{Re}(z_1 + z_2) = \\mathrm{Re}\\, z_1 + \\mathrm{Re}\\, z_2$", correct: true, feedback: "Addition is part by part." },
        { text: "$\\mathrm{Re}(z_1z_2) = \\mathrm{Re}\\, z_1 \\cdot \\mathrm{Re}\\, z_2$", feedback: "$\\mathrm{Re}(z_1z_2) = ac - bd$: the imaginary parts contribute $-bd$. Try $z_1 = z_2 = i$." },
        { text: "$\\mathrm{Im}(iz) = \\mathrm{Re}\\, z$", correct: true, feedback: "$i(a + ib) = -b + ia$, whose imaginary part is $a$." },
      ],
      hint: "Test each claim with $z = a + ib$, or with small examples like $z_1 = z_2 = i$.",
    },
    {
      type: "numeric",
      id: "cq2-2-q5",
      variant: "practice",
      question: "Real numbers $x, y$ satisfy $(x + 2y) + i(2x - y) = 4 + 3i$. Find $x + y$.",
      answer: 3,
      hint: "Equate real parts and imaginary parts to get two linear equations.",
      solution: "$x + 2y = 4$ and $2x - y = 3$. Doubling the second and adding: $5x = 10$, so $x = 2$ and $y = 1$. Hence $x + y = 3$.",
      commonMistakes: [
        { answer: 7, feedback: "You added $4 + 3$. Solve for $x$ and $y$ first." },
      ],
    },
    {
      type: "quiz",
      id: "cq2-2-q6",
      variant: "practice",
      question: "$(1 + i)^4$ equals",
      options: [
        { text: "$-4$", correct: true, feedback: "$(1 + i)^4 = (2i)^2 = -4$." },
        { text: "$4$", feedback: "$(2i)^2 = 4i^2 = -4$." },
        { text: "$4i$", feedback: "$(1 + i)^2 = 2i$, and squaring again gives $4i^2$, a real number." },
        { text: "$-4i$", feedback: "Square $2i$ once more: $(2i)^2 = 4i^2 = -4$." },
      ],
      hint: "Square $1 + i$ first, then square the result.",
    },
    {
      type: "numeric",
      id: "cq2-2-q7",
      variant: "practice",
      question: "Find $\\mathrm{Im}\\left[(1 + i)^6\\right]$.",
      answer: -8,
      hint: "$(1 + i)^6 = \\left((1 + i)^2\\right)^3 = (2i)^3$.",
      solution: "$(2i)^3 = 8i^3 = -8i$, so the imaginary part is $-8$.",
      commonMistakes: [
        { answer: 8, feedback: "$i^3 = -i$, so $(2i)^3 = -8i$." },
        { answer: -8000, feedback: "Scale check: $|1 + i|^6 = (\\sqrt2)^6 = 8$, so nothing bigger than 8 can appear." },
      ],
    },
    {
      type: "quiz",
      id: "cq2-2-q8",
      variant: "concept",
      question: "Why can we not define \"$i > 0$\" in a way that keeps the usual rules of inequalities?",
      options: [
        { text: "Because then $i \\cdot i > 0$, that is $-1 > 0$", correct: true, feedback: "And $i < 0$ fails too: then $-i > 0$ and $(-i)^2 = -1 > 0$." },
        { text: "Because $i$ is not a number", feedback: "$i$ is a perfectly good number. It just cannot be placed on an ordered line." },
        { text: "Because $i$ is too small to compare", feedback: "Size is measured by the modulus $|i| = 1$. That is not the issue." },
        { text: "We can: $i > 0$ because its imaginary part is positive", feedback: "That ordering does not respect multiplication: it would give $i \\cdot i = -1 > 0$." },
      ],
      hint: "Positive times positive must be positive. Apply that to $i \\cdot i$.",
    },
    {
      type: "numeric",
      id: "cq2-2-q9",
      variant: "practice",
      question: "JEE Main. Real numbers $x, y$ satisfy $(1 - i)x + (1 + i)y = 1 - 3i$. Find $xy$.",
      answer: -2,
      hint: "Collect: $(x + y) + i(y - x) = 1 - 3i$.",
      solution: "$x + y = 1$ and $y - x = -3$, so $y = -1$ and $x = 2$. Hence $xy = -2$.",
      commonMistakes: [
        { answer: 2, feedback: "Check the sign of $y$: $y - x = -3$ with $x + y = 1$ gives $y = -1$." },
        { answer: -3, feedback: "That is $y - x$. Solve for both and multiply." },
      ],
    },
    {
      type: "quiz",
      id: "cq2-2-q10",
      variant: "practice",
      question: "JEE Main. For which real $x$ is $(x + i)^2$ purely imaginary? Select all that apply.",
      multiple: true,
      options: [
        { text: "$x = 1$", correct: true, feedback: "$(1 + i)^2 = 2i$." },
        { text: "$x = -1$", correct: true, feedback: "$(-1 + i)^2 = 1 - 2i - 1 = -2i$." },
        { text: "$x = 0$", feedback: "$i^2 = -1$ is real, not purely imaginary." },
        { text: "$x = 2$", feedback: "$(2 + i)^2 = 3 + 4i$ has real part $3$." },
      ],
      hint: "$(x + i)^2 = (x^2 - 1) + 2xi$. Make the real part zero while the imaginary part stays non-zero.",
    },
    {
      type: "numeric",
      id: "cq2-2-q11",
      variant: "mastery",
      question: "JEE Main. Real numbers $a > 0$ and $b$ satisfy $(a + ib)^2 = 3 + 4i$. Find $a + b$.",
      answer: 3,
      hint: "Equate parts: $a^2 - b^2 = 3$ and $2ab = 4$. Try small integers.",
      solution: "$2ab = 4$ gives $b = \\frac2a$, and then $a^2 - \\frac{4}{a^2} = 3$, i.e. $a^4 - 3a^2 - 4 = 0$, so $a^2 = 4$ and $a = 2$, $b = 1$. Hence $a + b = 3$. (Lesson 2.6 turns this into a general method for square roots.)",
      commonMistakes: [
        { answer: 1, feedback: "With $a > 0$ we need $a = 2$, $b = 1$. $a - b = 1$, but the question asks for $a + b$." },
        { answer: -3, feedback: "That is the other square root $-(2 + i)$, which has $a < 0$." },
      ],
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "division-and-powers-of-i",
  title: "2.3 · Division and Powers of i",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "Adding and multiplying complex numbers is just algebra with $i^2 = -1$. Dividing looks harder: what is $\\frac{3 + 2i}{1 - i}$ in the form $a + ib$? The trick is the same one you used to rationalise $\\frac{1}{\\sqrt2 - 1}$: multiply top and bottom by a partner that makes the bottom real.",
    },
    { type: "heading", text: "Dividing by making the denominator real" },
    {
      type: "text",
      content:
        "The partner of $c + id$ is $c - id$ (its **conjugate**, studied properly in the next lesson). Their product is real and positive:",
    },
    { type: "math", latex: "(c + id)(c - id) = c^2 - i^2d^2 = c^2 + d^2" },
    {
      type: "callout",
      variant: "definition",
      title: "Division and reciprocal",
      content:
        "For $c + id \\ne 0$: $$\\frac{a + ib}{c + id} = \\frac{(a + ib)(c - id)}{c^2 + d^2} = \\frac{ac + bd}{c^2 + d^2} + i\\,\\frac{bc - ad}{c^2 + d^2}.$$ In particular $\\dfrac{1}{c + id} = \\dfrac{c - id}{c^2 + d^2}$. Do not memorise the long formula: multiply by the conjugate each time.",
    },
    {
      type: "worked-example",
      id: "cq2-3-we1",
      title: "Worked example 1: a quotient",
      problem: "Write $\\dfrac{3 + 2i}{1 - i}$ in the form $a + ib$.",
      steps: [
        { text: "Multiply top and bottom by $1 + i$, the conjugate of the denominator. *Why this step:* $(1 - i)(1 + i) = 1 + 1 = 2$ is real." },
        { latex: "\\frac{(3 + 2i)(1 + i)}{2} = \\frac{3 + 3i + 2i + 2i^2}{2} = \\frac{1 + 5i}{2}" },
      ],
      answer: "$\\dfrac{3 + 2i}{1 - i} = \\dfrac12 + \\dfrac52 i$.",
    },
    {
      type: "worked-example",
      id: "cq2-3-we2",
      title: "Worked example 2: a quotient that is pure",
      problem: "Simplify $\\dfrac{1 + i}{1 - i}$.",
      steps: [
        { text: "Multiply by $\\frac{1 + i}{1 + i}$: the top becomes $(1 + i)^2 = 2i$ and the bottom $1 - i^2 = 2$." },
        { text: "So $\\frac{1 + i}{1 - i} = i$. Similarly $\\frac{1 - i}{1 + i} = -i$. These two show up constantly in JEE problems." },
      ],
      answer: "$\\dfrac{1 + i}{1 - i} = i$.",
    },
    { type: "heading", text: "Powers of i repeat every four steps" },
    {
      type: "table",
      headers: ["$n$", "$1$", "$2$", "$3$", "$4$", "$5$", "$6$", "$7$", "$8$"],
      rows: [["$i^n$", "$i$", "$-1$", "$-i$", "$1$", "$i$", "$-1$", "$-i$", "$1$"]],
    },
    {
      type: "text",
      content:
        "Since $i^4 = (i^2)^2 = 1$, multiplying by $i^4$ changes nothing, so $i^n$ depends only on the remainder of $n$ when divided by $4$:",
    },
    {
      type: "math",
      latex: "i^{4k} = 1, \\qquad i^{4k+1} = i, \\qquad i^{4k+2} = -1, \\qquad i^{4k+3} = -i",
    },
    {
      type: "text",
      content:
        "This works for negative exponents too. $i^{-1} = \\frac1i = \\frac{-i}{-i^2} = -i$, which matches the pattern because $-1 = 4(-1) + 3$. In the Argand plane, multiplying by $i$ is a quarter turn about $0$, so four multiplications bring you home. Drag $z$ off $i$ to see the general spiral.",
    },
    {
      type: "interactive",
      config: {
        component: "cq-argand-plane",
        mode: "powers",
        z1: [0, 1],
        n: { min: 1, max: 12, initial: 4 },
        show: ["unit-circle"],
        snap: 0.5,
        window: { xmin: -2.5, xmax: 2.5, ymin: -2.5, ymax: 2.5 },
        caption:
          "With $z = i$, slide $n$: the powers visit $i, -1, -i, 1$ and repeat. Each step is a quarter turn on the unit circle.",
      },
    },
    {
      type: "worked-example",
      id: "cq2-3-we3",
      title: "Worked example 3: large and negative powers",
      problem: "Evaluate $i^{2026}$ and $i^{-35}$.",
      steps: [
        { text: "$2026 = 4 \\times 506 + 2$, so $i^{2026} = i^2 = -1$." },
        { text: "$-35 = 4 \\times (-9) + 1$, so $i^{-35} = i^1 = i$. *Why this step:* choose the remainder in $\\{0, 1, 2, 3\\}$ even for a negative exponent." },
        { text: "Check the second another way: $i^{-35} = \\frac{1}{i^{35}} = \\frac{1}{i^3} = \\frac{1}{-i} = i$." },
      ],
      answer: "$i^{2026} = -1$ and $i^{-35} = i$.",
    },
    {
      type: "text",
      content:
        "Any four consecutive powers add to zero, because $i^n(1 + i + i^2 + i^3) = i^n(1 + i - 1 - i) = 0$. So long sums of powers of $i$ collapse in blocks of four.",
    },
    {
      type: "worked-example",
      id: "cq2-3-we4",
      title: "Worked example 4: summing powers",
      problem: "Evaluate $\\displaystyle\\sum_{k=1}^{102} i^k$.",
      steps: [
        { text: "The first $100$ terms form $25$ blocks of four consecutive powers, each summing to $0$." },
        { text: "What remains is $i^{101} + i^{102} = i + (-1)$, using $101 = 4 \\cdot 25 + 1$ and $102 = 4 \\cdot 25 + 2$." },
      ],
      answer: "$\\displaystyle\\sum_{k=1}^{102} i^k = -1 + i$.",
    },
    {
      type: "worked-example",
      id: "cq2-3-we5",
      title: "Worked example 5: a power of a quotient",
      problem: "Find $(1 + i)^{10}$ and the smallest positive integer $n$ with $\\left(\\dfrac{1 + i}{1 - i}\\right)^n = 1$.",
      steps: [
        { text: "$(1 + i)^{10} = \\left((1 + i)^2\\right)^5 = (2i)^5 = 32i^5 = 32i$." },
        { text: "$\\frac{1 + i}{1 - i} = i$ (Worked example 2), so we need $i^n = 1$." },
        { text: "$i^n = 1$ exactly when $4 \\mid n$, so the smallest positive $n$ is $4$." },
      ],
      answer: "$(1 + i)^{10} = 32i$ and $n = 4$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"$i^{-1} = i$\" (or \"$\\frac1i = 1$\")",
      content:
        "$\\frac1i$ is the number that multiplies $i$ to give $1$. Since $i \\cdot (-i) = -i^2 = 1$, $\\frac1i = -i$. A quick way to see it: multiply top and bottom by $i$, $\\frac1i = \\frac{i}{i^2} = -i$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "cq2-3-q1",
      variant: "practice",
      question: "$\\dfrac1i$ equals",
      options: [
        { text: "$-i$", correct: true, feedback: "$\\frac1i = \\frac{i}{i^2} = -i$. Check: $i(-i) = 1$." },
        { text: "$i$", feedback: "$i \\cdot i = -1$, not $1$." },
        { text: "$1$", feedback: "$i \\cdot 1 = i \\ne 1$." },
        { text: "$-1$", feedback: "$i \\cdot (-1) = -i \\ne 1$." },
      ],
      hint: "Multiply top and bottom by $i$.",
    },
    {
      type: "numeric",
      id: "cq2-3-q2",
      variant: "practice",
      question: "Find the real part of $\\dfrac{3 + 2i}{1 - i}$.",
      answer: 0.5,
      tolerance: 0.001,
      hint: "Multiply top and bottom by $1 + i$.",
      solution: "$\\frac{(3 + 2i)(1 + i)}{2} = \\frac{1 + 5i}{2}$, so the real part is $\\frac12$.",
      commonMistakes: [
        { answer: 3, feedback: "You cannot divide part by part: $\\frac{3 + 2i}{1 - i}$ is not $\\frac31 + \\frac{2i}{-i}$." },
        { answer: 2.5, feedback: "That is the imaginary part." },
        { answer: 1, feedback: "You forgot to divide by $(1 - i)(1 + i) = 2$." },
      ],
    },
    {
      type: "quiz",
      id: "cq2-3-q3",
      variant: "practice",
      question: "$i^{2026}$ equals",
      options: [
        { text: "$-1$", correct: true, feedback: "$2026 = 4 \\cdot 506 + 2$, so $i^{2026} = i^2 = -1$." },
        { text: "$1$", feedback: "$2026$ is even but not a multiple of $4$." },
        { text: "$i$", feedback: "The remainder on division by $4$ is $2$, not $1$." },
        { text: "$-i$", feedback: "The remainder on division by $4$ is $2$, not $3$." },
      ],
      hint: "Find the remainder of $2026$ on division by $4$ (look at the last two digits, $26$).",
    },
    {
      type: "numeric",
      id: "cq2-3-q4",
      variant: "practice",
      question: "Evaluate $i + i^2 + i^3 + \\dots + i^{2023}$.",
      answer: -1,
      hint: "Group the terms in fours. How many are left over after $2020$ terms?",
      solution: "The first $2020$ terms make $505$ blocks of four, each summing to $0$. The rest is $i^{2021} + i^{2022} + i^{2023} = i - 1 - i = -1$.",
      commonMistakes: [
        { answer: 0, feedback: "$2023$ is not a multiple of $4$: three terms are left over." },
        { answer: 1, feedback: "Check the leftovers: $i^{2021} = i$, $i^{2022} = -1$, $i^{2023} = -i$." },
      ],
    },
    {
      type: "quiz",
      id: "cq2-3-q5",
      variant: "concept",
      question: "Which of these equal $1$? Select all that apply ($k$ is an integer).",
      multiple: true,
      options: [
        { text: "$i^{100}$", correct: true, feedback: "$100$ is a multiple of $4$." },
        { text: "$i^{-8}$", correct: true, feedback: "$-8$ is a multiple of $4$: $i^{-8} = \\frac{1}{i^8} = 1$." },
        { text: "$i^{4k+2}$", feedback: "$i^{4k+2} = i^2 = -1$." },
        { text: "$(-i)^4$", correct: true, feedback: "$(-i)^4 = (-1)^4 i^4 = 1$." },
        { text: "$i^{-2}$", feedback: "$i^{-2} = \\frac{1}{i^2} = -1$." },
      ],
      hint: "$i^n = 1$ exactly when $n$ is a multiple of $4$ (negative multiples included).",
    },
    {
      type: "numeric",
      id: "cq2-3-q6",
      variant: "practice",
      question: "Find the smallest positive integer $n$ for which $\\left(\\dfrac{1 + i}{1 - i}\\right)^n = 1$.",
      answer: 4,
      hint: "Simplify the fraction first.",
      solution: "$\\frac{1 + i}{1 - i} = \\frac{(1 + i)^2}{2} = i$, and $i^n = 1$ first happens at $n = 4$.",
      commonMistakes: [
        { answer: 2, feedback: "$i^2 = -1$, not $1$." },
        { answer: 1, feedback: "The fraction is $i$, not $1$." },
      ],
    },
    {
      type: "numeric",
      id: "cq2-3-q7",
      variant: "practice",
      question: "Find the imaginary part of $\\dfrac{2 + i}{2 - i}$.",
      answer: 0.8,
      tolerance: 0.001,
      hint: "Multiply top and bottom by $2 + i$. The denominator becomes $4 + 1$.",
      solution: "$\\frac{(2 + i)^2}{5} = \\frac{3 + 4i}{5}$, so the imaginary part is $\\frac45 = 0.8$.",
      commonMistakes: [
        { answer: 0.6, feedback: "That is the real part, $\\frac35$." },
        { answer: 4, feedback: "Divide by $(2 - i)(2 + i) = 5$." },
        { answer: 1.333, tolerance: 0.01, feedback: "The denominator is $2^2 + 1^2 = 5$, not $4 - 1 = 3$: $i^2 = -1$ makes it a sum." },
      ],
    },
    {
      type: "quiz",
      id: "cq2-3-q8",
      variant: "practice",
      question: "$(1 + i)^{10}$ equals",
      options: [
        { text: "$32i$", correct: true, feedback: "$(2i)^5 = 32i^5 = 32i$." },
        { text: "$-32i$", feedback: "$i^5 = i^4 \\cdot i = i$." },
        { text: "$32$", feedback: "An odd power of $2i$ keeps one factor of $i$." },
        { text: "$1024i$", feedback: "$(1 + i)^{10} = \\left((1 + i)^2\\right)^5 = (2i)^5$, and $2^5 = 32$." },
      ],
      hint: "Use $(1 + i)^2 = 2i$.",
    },
    {
      type: "quiz",
      id: "cq2-3-q9",
      variant: "practice",
      question: "JEE Main. The value of $\\displaystyle\\sum_{n=1}^{13}\\left(i^n + i^{n+1}\\right)$ is",
      options: [
        { text: "$-1 + i$", correct: true, feedback: "$\\sum (i^n + i^{n+1}) = (1 + i)\\sum_{n=1}^{13} i^n = (1 + i)\\,i = -1 + i$." },
        { text: "$i$", feedback: "That is $\\sum_{n=1}^{13} i^n$ alone. Each term also carries the factor $(1 + i)$." },
        { text: "$0$", feedback: "$13$ is not a multiple of $4$, so the sum does not vanish." },
        { text: "$-i$", feedback: "Recompute: the first $12$ powers cancel, leaving $i^{13} = i$, then multiply by $1 + i$." },
      ],
      hint: "Factor $i^n + i^{n+1} = i^n(1 + i)$, then sum the powers of $i$ in blocks of four.",
    },
    {
      type: "numeric",
      id: "cq2-3-q10",
      variant: "practice",
      question: "JEE Main. Evaluate $(1 + i)^8 + (1 - i)^8$.",
      answer: 32,
      hint: "$(1 \\pm i)^2 = \\pm 2i$, so each eighth power is a fourth power of $\\pm 2i$.",
      solution: "$(1 + i)^8 = (2i)^4 = 16$ and $(1 - i)^8 = (-2i)^4 = 16$, so the sum is $32$.",
      commonMistakes: [
        { answer: 0, feedback: "Even powers do not cancel: $(-2i)^4 = (2i)^4 = 16$." },
        { answer: 512, feedback: "$(2i)^4 = 16$, not $256$." },
      ],
    },
    {
      type: "numeric",
      id: "cq2-3-q11",
      variant: "mastery",
      question: "JEE Main. Write $\\dfrac{(1 + i)^2}{2 - i} = a + ib$. Find $a + b$.",
      answer: 0.4,
      tolerance: 0.001,
      hint: "$(1 + i)^2 = 2i$. Then multiply top and bottom by $2 + i$.",
      solution: "$\\frac{2i}{2 - i} = \\frac{2i(2 + i)}{5} = \\frac{-2 + 4i}{5}$. So $a = -\\frac25$, $b = \\frac45$ and $a + b = \\frac25 = 0.4$.",
      commonMistakes: [
        { answer: 1.2, tolerance: 0.001, feedback: "Check the sign of $a$: $2i \\cdot i = 2i^2 = -2$." },
        { answer: 2, feedback: "You forgot to divide by $(2 - i)(2 + i) = 5$." },
      ],
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "the-conjugate",
  title: "2.4 · The Conjugate",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "Division in the last lesson relied on one partner: $c - id$, which turned $c + id$ into the real number $c^2 + d^2$. That partner deserves a name, because it does far more than divide. It tests whether a number is real, it is the reason complex roots of real equations come in pairs, and it leads straight to the modulus.",
    },
    { type: "heading", text: "Definition and picture" },
    {
      type: "callout",
      variant: "definition",
      title: "Conjugate",
      content:
        "The **conjugate** of $z = a + ib$ is $\\bar z = a - ib$: same real part, opposite imaginary part. Geometrically $\\bar z$ is the mirror image of $z$ in the real axis.",
    },
    {
      type: "interactive",
      config: {
        component: "cq-argand-plane",
        mode: "point",
        z1: [2, 1],
        show: ["conjugate", "negative"],
        caption:
          "Drag $z$. The conjugate $\\bar z$ is its reflection in the real axis, while $-z$ is the half-turn about $0$. Put $z$ on the real axis and $\\bar z$ lands on top of it: that is the test \"$z$ real $\\iff z = \\bar z$\".",
      },
    },
    { type: "heading", text: "Properties, each with a one-line reason" },
    {
      type: "math",
      latex:
        "\\begin{aligned} z + \\bar z &= 2\\,\\mathrm{Re}\\, z, & z - \\bar z &= 2i\\,\\mathrm{Im}\\, z, & z\\bar z &= a^2 + b^2 \\ge 0, \\\\ \\bar{\\bar z} &= z, & \\overline{z_1 \\pm z_2} &= \\bar z_1 \\pm \\bar z_2, & \\overline{z_1z_2} &= \\bar z_1\\,\\bar z_2, \\\\ \\overline{\\left(\\tfrac{z_1}{z_2}\\right)} &= \\tfrac{\\bar z_1}{\\bar z_2}, & \\overline{z^n} &= (\\bar z)^n. \\end{aligned}",
    },
    {
      type: "text",
      content:
        "The first three come from adding, subtracting and multiplying $a + ib$ and $a - ib$. The product rule is the important one. With $z_1 = a + ib$, $z_2 = c + id$:\n\n- $z_1z_2 = (ac - bd) + i(ad + bc)$, so $\\overline{z_1z_2} = (ac - bd) - i(ad + bc)$.\n- $\\bar z_1\\bar z_2 = (a - ib)(c - id) = (ac - bd) - i(ad + bc)$.\n\nThey agree. Applying the product rule to $z_2 \\cdot \\frac{z_1}{z_2} = z_1$ gives the quotient rule, and repeating it gives $\\overline{z^n} = (\\bar z)^n$. In words: **conjugation passes through $+$, $-$, $\\times$, $\\div$ and powers**. It is like replacing $i$ by $-i$ everywhere, which is allowed because $-i$ satisfies the same defining equation $x^2 = -1$.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Real and purely imaginary tests",
      content:
        "- $z$ is real $\\iff z = \\bar z$ (because $z - \\bar z = 2i\\,\\mathrm{Im}\\, z$).\n- $z$ is purely imaginary or zero $\\iff z = -\\bar z$ (because $z + \\bar z = 2\\,\\mathrm{Re}\\, z$).\n\nThese turn \"is this real?\" into an equation you can manipulate without ever splitting $z$ into $x + iy$.",
    },
    {
      type: "text",
      content:
        "One more consequence, used in Lesson 2.7. If a polynomial $P$ has **real** coefficients, conjugation passes through every sum, product and power and leaves the coefficients alone, so $\\overline{P(z)} = P(\\bar z)$. If $P(z) = 0$ then $P(\\bar z) = \\bar 0 = 0$: non-real roots of real polynomials come in conjugate pairs.",
    },
    {
      type: "worked-example",
      id: "cq2-4-we1",
      title: "Worked example 1: the three basic combinations",
      problem: "For $z = 3 - 4i$, find $\\bar z$, $z + \\bar z$, $z - \\bar z$ and $z\\bar z$.",
      steps: [
        { text: "$\\bar z = 3 + 4i$." },
        { text: "$z + \\bar z = 6 = 2\\,\\mathrm{Re}\\, z$ and $z - \\bar z = -8i = 2i\\,\\mathrm{Im}\\, z$." },
        { text: "$z\\bar z = 3^2 + 4^2 = 25$. *Why this step:* $z\\bar z$ is always the real number $a^2 + b^2$, the square of the distance from $0$." },
      ],
      answer: "$\\bar z = 3 + 4i$, $z + \\bar z = 6$, $z - \\bar z = -8i$, $z\\bar z = 25$.",
    },
    {
      type: "worked-example",
      id: "cq2-4-we2",
      title: "Worked example 2: a purely imaginary quotient (JEE classic)",
      problem: "If $z \\ne -1$ and $\\dfrac{z - 1}{z + 1}$ is purely imaginary, show that $z\\bar z = 1$.",
      steps: [
        { text: "Let $w = \\frac{z - 1}{z + 1}$. Purely imaginary means $w + \\bar w = 0$. *Why this step:* the conjugate test avoids writing $z = x + iy$ and expanding." },
        { text: "Conjugate through the quotient: $\\bar w = \\frac{\\bar z - 1}{\\bar z + 1}$." },
        { latex: "\\frac{z - 1}{z + 1} + \\frac{\\bar z - 1}{\\bar z + 1} = 0 \\implies (z - 1)(\\bar z + 1) + (\\bar z - 1)(z + 1) = 0" },
        { text: "Expand: $(z\\bar z + z - \\bar z - 1) + (z\\bar z + \\bar z - z - 1) = 2z\\bar z - 2 = 0$." },
      ],
      answer: "$z\\bar z = 1$: $z$ lies on the unit circle (Lesson 2.5 writes this as $|z| = 1$).",
    },
    {
      type: "worked-example",
      id: "cq2-4-we3",
      title: "Worked example 3: when is a quotient real?",
      problem: "For which real $\\theta$ is $\\dfrac{3 + 2i\\sin\\theta}{1 - 2i\\sin\\theta}$ (a) purely real, (b) purely imaginary?",
      steps: [
        { text: "Write $s = \\sin\\theta$ and multiply top and bottom by $1 + 2is$. The denominator becomes $1 + 4s^2 > 0$." },
        { latex: "(3 + 2is)(1 + 2is) = 3 + 6is + 2is + 4i^2s^2 = (3 - 4s^2) + 8s\\,i" },
        { text: "(a) Real when the imaginary part $8s = 0$, i.e. $\\sin\\theta = 0$, so $\\theta = n\\pi$." },
        { text: "(b) Purely imaginary when the real part $3 - 4s^2 = 0$ (the imaginary part $8s$ is then non-zero), so $\\sin^2\\theta = \\frac34$ and $\\theta = n\\pi \\pm \\frac\\pi3$." },
      ],
      answer: "(a) $\\theta = n\\pi$, (b) $\\theta = n\\pi \\pm \\frac\\pi3$, for integers $n$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"$\\overline{iz} = i\\bar z$\"",
      content:
        "Conjugation acts on **every** factor, including the constant $i$: $\\overline{iz} = \\bar i\\,\\bar z = -i\\bar z$. Check with $z = 1$: $\\overline{i} = -i$, not $i$. Only real constants pass through unchanged, $\\overline{3z} = 3\\bar z$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "cq2-4-q1",
      variant: "practice",
      question: "The conjugate of $(2 + i)^2$ is",
      options: [
        { text: "$3 - 4i$", correct: true, feedback: "$(2 + i)^2 = 3 + 4i$, and also $(2 - i)^2 = 3 - 4i$, as the power rule promises." },
        { text: "$3 + 4i$", feedback: "That is $(2 + i)^2$ itself." },
        { text: "$-3 + 4i$", feedback: "Conjugation flips only the imaginary part." },
        { text: "$4 - i$", feedback: "That squares the parts separately. Expand $(2 + i)^2 = 4 + 4i + i^2$ first." },
      ],
      hint: "Either square first and then conjugate, or conjugate first: $\\overline{z^2} = (\\bar z)^2$.",
    },
    {
      type: "quiz",
      id: "cq2-4-q2",
      variant: "concept",
      question: "Select all the statements that hold for every complex $z, z_1, z_2$.",
      multiple: true,
      options: [
        { text: "$\\overline{z_1 + z_2} = \\bar z_1 + \\bar z_2$", correct: true, feedback: "Conjugation is applied part by part." },
        { text: "$\\overline{z_1z_2} = \\bar z_1\\bar z_2$", correct: true, feedback: "Both sides equal $(ac - bd) - i(ad + bc)$." },
        { text: "$z + \\bar z$ is real", correct: true, feedback: "It is $2\\,\\mathrm{Re}\\, z$." },
        { text: "$z - \\bar z$ is real", feedback: "It is $2i\\,\\mathrm{Im}\\, z$, purely imaginary (or zero)." },
        { text: "$z\\bar z$ is a non-negative real number", correct: true, feedback: "$z\\bar z = a^2 + b^2 \\ge 0$." },
      ],
      hint: "Write $z = a + ib$ and compute each side.",
    },
    {
      type: "quiz",
      id: "cq2-4-q3",
      variant: "concept",
      question: "$\\overline{iz}$ equals",
      options: [
        { text: "$-i\\bar z$", correct: true, feedback: "Conjugate both factors: $\\bar i = -i$." },
        { text: "$i\\bar z$", feedback: "The constant $i$ is not real, so it is conjugated too." },
        { text: "$i z$", feedback: "Nothing was conjugated." },
        { text: "$-iz$", feedback: "Only $i$ was conjugated. $z$ must become $\\bar z$ as well." },
      ],
      hint: "Use $\\overline{z_1z_2} = \\bar z_1\\bar z_2$ with $z_1 = i$.",
    },
    {
      type: "numeric",
      id: "cq2-4-q4",
      variant: "practice",
      question: "For $z = 3 - 4i$, find $z\\bar z$.",
      answer: 25,
      hint: "$z\\bar z = a^2 + b^2$.",
      solution: "$(3 - 4i)(3 + 4i) = 9 + 16 = 25$.",
      commonMistakes: [
        { answer: -7, feedback: "That is $a^2 - b^2$, the real part of $z^2$. $z\\bar z = a^2 + b^2$." },
        { answer: 5, feedback: "That is $\\sqrt{z\\bar z}$, the modulus." },
      ],
    },
    {
      type: "numeric",
      id: "cq2-4-q5",
      variant: "practice",
      question: "For $z = 1 + 2i$, find the real part of $\\dfrac{\\bar z}{z}$.",
      answer: -0.6,
      tolerance: 0.001,
      hint: "Multiply top and bottom by $\\bar z$: $\\frac{\\bar z}{z} = \\frac{\\bar z^2}{z\\bar z}$.",
      solution: "$\\bar z^2 = (1 - 2i)^2 = -3 - 4i$ and $z\\bar z = 5$, so $\\frac{\\bar z}{z} = \\frac{-3 - 4i}{5}$ with real part $-0.6$.",
      commonMistakes: [
        { answer: 0.6, feedback: "$(1 - 2i)^2 = 1 - 4i + 4i^2 = -3 - 4i$: the real part is negative." },
        { answer: -3, feedback: "Divide by $z\\bar z = 5$." },
      ],
    },
    {
      type: "quiz",
      id: "cq2-4-q6",
      variant: "concept",
      question: "A complex number satisfies $z = \\bar z$. What can you conclude?",
      options: [
        { text: "$z$ is real", correct: true, feedback: "$z - \\bar z = 2i\\,\\mathrm{Im}\\, z = 0$ forces $\\mathrm{Im}\\, z = 0$." },
        { text: "$z$ is purely imaginary", feedback: "That is the condition $z = -\\bar z$." },
        { text: "$z = 0$", feedback: "Every real number satisfies $z = \\bar z$, e.g. $z = 5$." },
        { text: "$z\\bar z = 1$", feedback: "That describes the unit circle, not the real axis." },
      ],
      hint: "Look at $z - \\bar z$.",
    },
    {
      type: "quiz",
      id: "cq2-4-q7",
      variant: "concept",
      question: "A non-zero complex number satisfies $z = -\\bar z$. Select all statements that follow.",
      multiple: true,
      options: [
        { text: "$z$ is purely imaginary", correct: true, feedback: "$z + \\bar z = 2\\,\\mathrm{Re}\\, z = 0$." },
        { text: "$\\mathrm{Re}\\, z = 0$", correct: true, feedback: "Same statement in different words." },
        { text: "$z^2$ is a negative real number", correct: true, feedback: "$z = bi$ with $b \\ne 0$ gives $z^2 = -b^2 < 0$." },
        { text: "$z\\bar z = 1$", feedback: "$z = 5i$ satisfies $z = -\\bar z$ but $z\\bar z = 25$." },
      ],
      hint: "Turn $z = -\\bar z$ into a statement about $\\mathrm{Re}\\, z$, then write $z = bi$.",
    },
    {
      type: "numeric",
      id: "cq2-4-q8",
      variant: "practice",
      question: "How many complex numbers $z$ satisfy $\\bar z = z^2$?",
      answer: 4,
      hint: "Put $z = x + iy$ and equate parts: $x = x^2 - y^2$ and $-y = 2xy$. The second gives $y = 0$ or $x = -\\frac12$.",
      solution: "If $y = 0$: $x = x^2$, so $z = 0$ or $z = 1$. If $x = -\\frac12$: $-\\frac12 = \\frac14 - y^2$, so $y = \\pm\\frac{\\sqrt3}{2}$. Four solutions: $0$, $1$, $-\\frac12 \\pm \\frac{\\sqrt3}{2}i$.",
      commonMistakes: [
        { answer: 2, feedback: "Those are the real solutions $0$ and $1$. The case $x = -\\frac12$ adds two more." },
        { answer: 3, feedback: "Don't forget $z = 0$: it satisfies $\\bar 0 = 0^2$." },
      ],
    },
    {
      type: "quiz",
      id: "cq2-4-q9",
      variant: "practice",
      question: "JEE Main. For $\\theta \\in \\left(0, \\frac\\pi2\\right]$, the number $\\dfrac{3 + 2i\\sin\\theta}{1 - 2i\\sin\\theta}$ is purely imaginary when $\\theta$ equals",
      options: [
        { text: "$\\frac\\pi3$", correct: true, feedback: "The real part is $\\frac{3 - 4\\sin^2\\theta}{1 + 4\\sin^2\\theta}$, zero when $\\sin\\theta = \\frac{\\sqrt3}{2}$." },
        { text: "$\\frac\\pi6$", feedback: "$\\sin\\frac\\pi6 = \\frac12$ gives $3 - 4 \\cdot \\frac14 = 2 \\ne 0$." },
        { text: "$\\frac\\pi4$", feedback: "$\\sin^2\\frac\\pi4 = \\frac12$ gives $3 - 2 = 1 \\ne 0$." },
        { text: "$\\frac\\pi2$", feedback: "$\\sin^2\\frac\\pi2 = 1$ gives $3 - 4 = -1 \\ne 0$." },
      ],
      hint: "Multiply top and bottom by $1 + 2i\\sin\\theta$ and set the real part to zero.",
    },
    {
      type: "quiz",
      id: "cq2-4-q10",
      variant: "practice",
      question: "JEE Main. If $z \\ne -1$ and $\\dfrac{z - 1}{z + 1}$ is purely imaginary, then $z$ lies on",
      options: [
        { text: "the circle $z\\bar z = 1$", correct: true, feedback: "Adding $w + \\bar w = 0$ and clearing denominators gives $2z\\bar z - 2 = 0$." },
        { text: "the real axis", feedback: "For real $z \\ne \\pm 1$ the quotient is real and non-zero." },
        { text: "the imaginary axis", feedback: "Try $z = \\frac{3 + 4i}{5}$: it is not on the imaginary axis but works." },
        { text: "the line $\\mathrm{Re}\\, z = 1$", feedback: "Use the conjugate test $w + \\bar w = 0$ and expand." },
      ],
      hint: "Use $w + \\bar w = 0$ with $\\bar w = \\frac{\\bar z - 1}{\\bar z + 1}$.",
    },
    {
      type: "quiz",
      id: "cq2-4-q11",
      variant: "mastery",
      question: "JEE Advanced. For every complex $z$, which of these are always real? Select all that apply.",
      multiple: true,
      options: [
        { text: "$z + \\bar z$", correct: true, feedback: "$2\\,\\mathrm{Re}\\, z$." },
        { text: "$z\\bar z$", correct: true, feedback: "$a^2 + b^2$." },
        { text: "$z^2 + \\bar z^2$", correct: true, feedback: "$\\bar z^2 = \\overline{z^2}$, so this is $2\\,\\mathrm{Re}(z^2)$." },
        { text: "$z^2 - \\bar z^2$", feedback: "This is $2i\\,\\mathrm{Im}(z^2)$, purely imaginary in general (try $z = 1 + i$: $2i - (-2i) = 4i$)." },
        { text: "$i(z - \\bar z)$", correct: true, feedback: "$i \\cdot 2i\\,\\mathrm{Im}\\, z = -2\\,\\mathrm{Im}\\, z$." },
      ],
      hint: "An expression $w$ is real exactly when $\\bar w = w$. Conjugate each one and compare.",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "the-modulus",
  title: "2.5 · The Modulus",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "Complex numbers cannot be ordered, but they can be measured. The product $z\\bar z = a^2 + b^2$ is always a non-negative real number, and its square root is the distance from $0$ to the point $(a, b)$. That distance, the **modulus**, is the complex number's size.",
    },
    { type: "heading", text: "Definition and first properties" },
    {
      type: "callout",
      variant: "definition",
      title: "Modulus",
      content:
        "The **modulus** of $z = a + ib$ is $$|z| = \\sqrt{a^2 + b^2}, \\qquad\\text{so}\\qquad |z|^2 = z\\bar z.$$ It is the distance from $0$ to $z$. $|z| = 0$ only for $z = 0$.",
    },
    {
      type: "text",
      content:
        "Straight from the definition:\n\n- $|z| = |\\bar z| = |-z|$ (reflections and half-turns keep the distance from $0$).\n- $|\\mathrm{Re}\\, z| \\le |z|$ and $|\\mathrm{Im}\\, z| \\le |z|$ (a leg of a right triangle is at most the hypotenuse).\n- $|z_1 - z_2|$ is the distance between the points $z_1$ and $z_2$ (Chapter 3 uses this constantly).",
    },
    { type: "heading", text: "The modulus is multiplicative" },
    {
      type: "text",
      content:
        "Here $|z|^2 = z\\bar z$ pays off. Because conjugation passes through products,",
    },
    {
      type: "math",
      latex:
        "|z_1z_2|^2 = (z_1z_2)\\overline{(z_1z_2)} = z_1\\bar z_1\\,z_2\\bar z_2 = |z_1|^2|z_2|^2 \\implies |z_1z_2| = |z_1|\\,|z_2|",
    },
    {
      type: "text",
      content:
        "In the same way $\\left|\\frac{z_1}{z_2}\\right| = \\frac{|z_1|}{|z_2|}$ and $|z^n| = |z|^n$. So you never need to expand a product or quotient just to find its modulus: take the modulus of each factor. Drag the two numbers below and compare $|z_1||z_2|$ with $|z_1z_2|$.",
    },
    {
      type: "interactive",
      config: {
        component: "cq-argand-plane",
        mode: "product",
        z1: [2, 1],
        z2: [1, 1],
        show: ["unit-circle", "quotient"],
        caption:
          "The readouts $|z_1|\\cdot|z_2|$ and $|z_1z_2|$ always agree. Put $z_2$ on the unit circle and the product has the same modulus as $z_1$.",
      },
    },
    {
      type: "worked-example",
      id: "cq2-5-we1",
      title: "Worked example 1: modulus without expanding",
      problem: "Find $\\left|\\dfrac{(3 + 4i)(1 - i)}{2 + i}\\right|$.",
      steps: [
        { text: "Take the modulus of each factor. *Why this step:* the modulus is multiplicative, so expanding the product would be wasted effort." },
        { latex: "\\frac{|3 + 4i|\\,|1 - i|}{|2 + i|} = \\frac{5\\sqrt2}{\\sqrt5} = \\sqrt{10}" },
      ],
      answer: "$\\sqrt{10}$.",
    },
    {
      type: "worked-example",
      id: "cq2-5-we2",
      title: "Worked example 2: an identity on the unit circle",
      problem: "If $|z_1| = 1$ and $\\bar z_1z_2 \\ne 1$, show that $\\left|\\dfrac{z_1 - z_2}{1 - \\bar z_1z_2}\\right| = 1$.",
      steps: [
        { text: "Multiply the denominator by $|z_1| = 1$, which changes nothing: $|1 - \\bar z_1z_2| = |z_1|\\,|1 - \\bar z_1z_2| = |z_1 - z_1\\bar z_1z_2|$." },
        { text: "Use $z_1\\bar z_1 = |z_1|^2 = 1$. *Why this step:* on the unit circle, $\\bar z = \\frac1z$, which is the key to most such identities." },
        { text: "So $|1 - \\bar z_1z_2| = |z_1 - z_2|$, and the quotient has modulus $1$." },
      ],
      answer: "The numerator and denominator have equal moduli, so the quotient has modulus $1$.",
    },
    { type: "heading", text: "The modulus of a sum" },
    {
      type: "text",
      content:
        "Sums are different: in general $|z_1 + z_2| \\ne |z_1| + |z_2|$. The exact formula again comes from $|w|^2 = w\\bar w$:",
    },
    {
      type: "math",
      latex:
        "\\begin{aligned} |z_1 + z_2|^2 &= (z_1 + z_2)(\\bar z_1 + \\bar z_2) = |z_1|^2 + |z_2|^2 + z_1\\bar z_2 + \\bar z_1z_2 \\\\ &= |z_1|^2 + |z_2|^2 + 2\\,\\mathrm{Re}(z_1\\bar z_2) \\end{aligned}",
    },
    {
      type: "text",
      content:
        "The cross terms combine because $\\bar z_1z_2 = \\overline{z_1\\bar z_2}$, and $w + \\bar w = 2\\,\\mathrm{Re}\\, w$. Replacing $z_2$ by $-z_2$ gives $|z_1 - z_2|^2 = |z_1|^2 + |z_2|^2 - 2\\,\\mathrm{Re}(z_1\\bar z_2)$. Adding the two:",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Parallelogram law",
      content:
        "$$|z_1 + z_2|^2 + |z_1 - z_2|^2 = 2\\left(|z_1|^2 + |z_2|^2\\right).$$ The two diagonals of a parallelogram, squared and added, equal the sum of the squares of its four sides. And $|z_1 + z_2| = |z_1 - z_2|$ exactly when $\\mathrm{Re}(z_1\\bar z_2) = 0$, that is, when $\\frac{z_1}{z_2}$ is purely imaginary (the arrows are perpendicular, the parallelogram is a rectangle).",
    },
    {
      type: "interactive",
      config: {
        component: "cq-argand-plane",
        mode: "sum",
        z1: [3, 1],
        z2: [-1, 2],
        show: ["difference"],
        caption:
          "$z_1 + z_2$ and $z_1 - z_2$ are the two diagonals of the parallelogram on $z_1$ and $z_2$. Make the arrows perpendicular and the diagonals become equal.",
      },
    },
    {
      type: "worked-example",
      id: "cq2-5-we3",
      title: "Worked example 3: the parallelogram law",
      problem: "$|z_1| = 3$, $|z_2| = 4$ and $|z_1 + z_2| = 5$. Find $|z_1 - z_2|$.",
      steps: [
        { latex: "|z_1 - z_2|^2 = 2(|z_1|^2 + |z_2|^2) - |z_1 + z_2|^2 = 2(9 + 16) - 25 = 25" },
        { text: "So $|z_1 - z_2| = 5$. *Why this step:* equal diagonals mean a rectangle: $z_1 \\perp z_2$, which fits $3^2 + 4^2 = 5^2$." },
      ],
      answer: "$|z_1 - z_2| = 5$.",
    },
    {
      type: "worked-example",
      id: "cq2-5-we4",
      title: "Worked example 4: an equation with the modulus",
      problem: "Solve $|z| + z = 2 + i$.",
      steps: [
        { text: "Write $z = x + iy$. Then $\\sqrt{x^2 + y^2} + x + iy = 2 + i$." },
        { text: "Imaginary parts: $y = 1$. Real parts: $\\sqrt{x^2 + 1} = 2 - x$. *Why this step:* $|z|$ is real, so it only appears in the real-part equation." },
        { text: "Square: $x^2 + 1 = 4 - 4x + x^2$, so $x = \\frac34$. Check $2 - x = \\frac54 > 0$ and $\\sqrt{\\frac{9}{16} + 1} = \\frac54$." },
      ],
      answer: "$z = \\frac34 + i$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"$|z_1 + z_2| = |z_1| + |z_2|$\" and \"$|z|^2 = z^2$\"",
      content:
        "The modulus multiplies but does not add: $|1 + i| = \\sqrt2$, while $|1| + |i| = 2$. Equality needs the two arrows to point the same way (Lesson 3.6). And $|z|^2 = z\\bar z$, not $z^2$: for $z = i$, $|z|^2 = 1$ but $z^2 = -1$. The two agree only for real $z$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "cq2-5-q1",
      variant: "practice",
      question: "Find $|5 - 12i|$.",
      answer: 13,
      hint: "$|a + ib| = \\sqrt{a^2 + b^2}$.",
      solution: "$\\sqrt{25 + 144} = \\sqrt{169} = 13$.",
      commonMistakes: [
        { answer: 17, feedback: "That adds $5 + 12$. The modulus is a Pythagorean length." },
        { answer: 7, feedback: "Squares add, they never subtract: $\\sqrt{5^2 + 12^2}$." },
      ],
    },
    {
      type: "numeric",
      id: "cq2-5-q2",
      variant: "practice",
      question: "Find $\\left|\\dfrac{(3 + 4i)(1 - i)}{2 + i}\\right|^2$.",
      answer: 10,
      hint: "Square the moduli of the factors: $|3 + 4i|^2 = 25$ and so on.",
      solution: "$\\frac{|3 + 4i|^2|1 - i|^2}{|2 + i|^2} = \\frac{25 \\cdot 2}{5} = 10$.",
      commonMistakes: [
        { answer: 50, feedback: "You forgot to divide by $|2 + i|^2 = 5$." },
        { answer: 3.162, tolerance: 0.01, feedback: "That is the modulus itself, $\\sqrt{10}$. The question asks for its square." },
      ],
    },
    {
      type: "quiz",
      id: "cq2-5-q3",
      variant: "concept",
      question: "For every complex $z$, $|z|^2$ equals",
      options: [
        { text: "$z\\bar z$", correct: true, feedback: "$(a + ib)(a - ib) = a^2 + b^2$." },
        { text: "$z^2$", feedback: "$z^2$ is complex in general: for $z = i$ it is $-1$, while $|z|^2 = 1$." },
        { text: "$(\\mathrm{Re}\\, z)^2 - (\\mathrm{Im}\\, z)^2$", feedback: "That is $\\mathrm{Re}(z^2)$. The modulus squared adds the squares." },
        { text: "$2\\,\\mathrm{Re}\\, z$", feedback: "That is $z + \\bar z$." },
      ],
      hint: "Multiply $a + ib$ by its conjugate.",
    },
    {
      type: "quiz",
      id: "cq2-5-q4",
      variant: "concept",
      question: "Select all identities that hold for every $z, z_1, z_2$.",
      multiple: true,
      options: [
        { text: "$|z_1z_2| = |z_1|\\,|z_2|$", correct: true, feedback: "The modulus is multiplicative." },
        { text: "$|z_1 + z_2| = |z_1| + |z_2|$", feedback: "Only when the arrows point the same way. $|1 + i| = \\sqrt2 \\ne 2$." },
        { text: "$|\\bar z| = |z|$", correct: true, feedback: "Reflecting in the real axis keeps the distance from $0$." },
        { text: "$|z^5| = |z|^5$", correct: true, feedback: "Repeat the product rule." },
        { text: "$|z_1 - z_2| = |z_1| - |z_2|$", feedback: "$|1 - (-1)| = 2$ but $|1| - |-1| = 0$." },
      ],
      hint: "Products behave perfectly. For sums, try $z_1 = 1$, $z_2 = i$ or $z_2 = -1$.",
    },
    {
      type: "numeric",
      id: "cq2-5-q5",
      variant: "practice",
      question: "$|z_1| = 3$, $|z_2| = 4$ and $|z_1 + z_2| = 5$. Find $|z_1 - z_2|$.",
      answer: 5,
      hint: "Parallelogram law: $|z_1 + z_2|^2 + |z_1 - z_2|^2 = 2(|z_1|^2 + |z_2|^2)$.",
      solution: "$|z_1 - z_2|^2 = 2(9 + 16) - 25 = 25$, so $|z_1 - z_2| = 5$.",
      commonMistakes: [
        { answer: 1, feedback: "$|z_1| - |z_2|$ is not $|z_1 - z_2|$ in general. Use the parallelogram law." },
        { answer: 7, feedback: "$|z_1| + |z_2|$ is only an upper bound." },
      ],
    },
    {
      type: "numeric",
      id: "cq2-5-q6",
      variant: "practice",
      question: "$|z_1| = 2$, $|z_2| = 3$ and $\\mathrm{Re}(z_1\\bar z_2) = 1$. Find $|z_1 + z_2|^2$.",
      answer: 15,
      hint: "$|z_1 + z_2|^2 = |z_1|^2 + |z_2|^2 + 2\\,\\mathrm{Re}(z_1\\bar z_2)$.",
      solution: "$4 + 9 + 2(1) = 15$.",
      commonMistakes: [
        { answer: 14, feedback: "The cross term is $2\\,\\mathrm{Re}(z_1\\bar z_2)$: don't forget the factor $2$." },
        { answer: 13, feedback: "That drops the cross term, which is only right when the arrows are perpendicular." },
        { answer: 25, feedback: "$(|z_1| + |z_2|)^2$ is the largest possible value, reached only when the arrows are parallel." },
      ],
    },
    {
      type: "quiz",
      id: "cq2-5-q7",
      variant: "concept",
      question: "For non-zero $z_1, z_2$, the condition $|z_1 + z_2| = |z_1 - z_2|$ means",
      options: [
        { text: "$\\frac{z_1}{z_2}$ is purely imaginary", correct: true, feedback: "It forces $\\mathrm{Re}(z_1\\bar z_2) = 0$, and $\\frac{z_1}{z_2} = \\frac{z_1\\bar z_2}{|z_2|^2}$." },
        { text: "$\\frac{z_1}{z_2}$ is real", feedback: "Real ratios mean parallel arrows, where the diagonals are most unequal." },
        { text: "$|z_1| = |z_2|$", feedback: "Equal sides give a rhombus, whose diagonals are perpendicular, not equal." },
        { text: "$z_1 = \\bar z_2$", feedback: "Try $z_1 = 2 + i$, $z_2 = 2 - i$: $|z_1 + z_2| = 4$ but $|z_1 - z_2| = |2i| = 2$." },
      ],
      hint: "Subtract the formulas for $|z_1 \\pm z_2|^2$.",
    },
    {
      type: "numeric",
      id: "cq2-5-q8",
      variant: "practice",
      question: "Solve $|z| + z = 2 + i$ and give $\\mathrm{Re}\\, z$.",
      answer: 0.75,
      tolerance: 0.001,
      hint: "The imaginary parts force $\\mathrm{Im}\\, z = 1$. Then $\\sqrt{x^2 + 1} = 2 - x$.",
      solution: "$y = 1$ and $x^2 + 1 = (2 - x)^2$ give $x = \\frac34$.",
      commonMistakes: [
        { answer: 1, feedback: "That is $\\mathrm{Im}\\, z$." },
        { answer: 1.25, tolerance: 0.001, feedback: "That is $|z| = \\frac54$." },
      ],
    },
    {
      type: "numeric",
      id: "cq2-5-q9",
      variant: "practice",
      question: "JEE Main. A complex number satisfies $|z| - z = 1 + 2i$. Find $|z|$.",
      answer: 2.5,
      tolerance: 0.001,
      hint: "Write $z = x + iy$: the imaginary parts give $-y = 2$.",
      solution: "$y = -2$ and $\\sqrt{x^2 + 4} - x = 1$, so $x^2 + 4 = (1 + x)^2$ and $x = \\frac32$. Then $|z| = 1 + x = \\frac52$.",
      commonMistakes: [
        { answer: 1.5, tolerance: 0.001, feedback: "That is $\\mathrm{Re}\\, z$. The modulus is $\\sqrt{\\frac94 + 4} = \\frac52$." },
        { answer: 2.236, tolerance: 0.01, feedback: "That is $|1 + 2i|$. Solve for $z$ first." },
      ],
    },
    {
      type: "quiz",
      id: "cq2-5-q10",
      variant: "practice",
      question: "JEE Main. If $|z_1| = 1$ and $\\bar z_1z_2 \\ne 1$, then $\\left|\\dfrac{z_1 - z_2}{1 - \\bar z_1z_2}\\right|$ equals",
      options: [
        { text: "$1$", correct: true, feedback: "$|1 - \\bar z_1z_2| = |z_1|\\,|1 - \\bar z_1z_2| = |z_1 - z_2|$ since $z_1\\bar z_1 = 1$." },
        { text: "$|z_2|$", feedback: "Try $z_2 = 0$: the quotient is $|z_1| = 1$, whatever $|z_2|$ would suggest." },
        { text: "$|z_1 - z_2|$", feedback: "The denominator has the same modulus as the numerator." },
        { text: "It depends on $z_2$", feedback: "Multiply the denominator by $|z_1| = 1$ and simplify." },
      ],
      hint: "Multiply the denominator by $|z_1| = 1$ and use $z_1\\bar z_1 = 1$.",
    },
    {
      type: "numeric",
      id: "cq2-5-q11",
      variant: "mastery",
      question: "JEE Advanced. $|z_1| = |z_2| = |z_3| = 1$ and $\\left|\\dfrac{1}{z_1} + \\dfrac{1}{z_2} + \\dfrac{1}{z_3}\\right| = 1$. Find $|z_1 + z_2 + z_3|$.",
      answer: 1,
      hint: "On the unit circle $\\frac1z = \\bar z$.",
      solution: "$\\frac1{z_k} = \\frac{\\bar z_k}{|z_k|^2} = \\bar z_k$, so $1 = |\\bar z_1 + \\bar z_2 + \\bar z_3| = |\\overline{z_1 + z_2 + z_3}| = |z_1 + z_2 + z_3|$.",
      commonMistakes: [
        { answer: 3, feedback: "$3$ is only the upper bound from the triangle inequality. Use $\\frac1z = \\bar z$." },
        { answer: 0, feedback: "Conjugation does not change the modulus, so the answer is the given value." },
      ],
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "square-roots-of-a-complex-number",
  title: "2.6 · Square Roots of a Complex Number",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "We invented $i$ so that $-1$ would have a square root. A natural worry: will $i$ itself need a square root that forces yet another new number, and so on forever? No. Every complex number already has two square roots inside $\\mathbb C$, and this lesson shows how to find them with nothing but real algebra.",
    },
    { type: "heading", text: "Setting up the equations" },
    {
      type: "text",
      content:
        "We want real $x, y$ with $(x + iy)^2 = a + ib$. Expanding, $x^2 - y^2 + 2ixy = a + ib$, so equating parts gives two real equations. A third equation comes free from the modulus, because $|w^2| = |w|^2$:",
    },
    {
      type: "math",
      latex:
        "x^2 - y^2 = a, \\qquad 2xy = b, \\qquad x^2 + y^2 = |a + ib| = \\sqrt{a^2 + b^2}",
    },
    {
      type: "text",
      content:
        "Adding and subtracting the first and third equations gives $x^2$ and $y^2$ directly. The middle equation then decides the signs: $xy$ must have the same sign as $b$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Square roots of a + ib",
      content:
        "With $r = |a + ib|$: $$x^2 = \\frac{r + a}{2}, \\qquad y^2 = \\frac{r - a}{2},$$ $$\\sqrt{a + ib} = \\pm\\left(\\sqrt{\\frac{r + a}{2}} + i\\,\\mathrm{sgn}(b)\\sqrt{\\frac{r - a}{2}}\\right) \\quad (b \\ne 0).$$ For $b > 0$ the parts of the root have the same sign, for $b < 0$ opposite signs. For $b = 0$: $\\sqrt{a} = \\pm\\sqrt a$ if $a \\ge 0$ and $\\pm i\\sqrt{|a|}$ if $a < 0$.",
    },
    {
      type: "text",
      content:
        "The two roots are negatives of each other, so they sit at opposite ends of a diameter of the circle of radius $\\sqrt{|a + ib|}$. Drag $w$ below and watch the pair of roots turn at half the speed of $w$.",
    },
    {
      type: "interactive",
      config: {
        component: "cq-argand-plane",
        mode: "roots",
        z1: [3, 4],
        n: { min: 2, max: 2, initial: 2 },
        show: ["unit-circle"],
        snap: 0.5,
        window: { xmin: -5, xmax: 5, ymin: -5, ymax: 5 },
        caption:
          "With $w = 3 + 4i$ the square roots are $z_0 = 2 + i$ and $z_1 = -2 - i$: modulus $\\sqrt{|w|} = \\sqrt5$, opposite each other. The root's angle is half of $w$'s.",
      },
    },
    { type: "heading", text: "Worked examples" },
    {
      type: "worked-example",
      id: "cq2-6-we1",
      title: "Worked example 1: square roots of 5 + 12i",
      problem: "Find the square roots of $5 + 12i$.",
      steps: [
        { text: "$r = |5 + 12i| = 13$." },
        { text: "$x^2 = \\frac{13 + 5}{2} = 9$ and $y^2 = \\frac{13 - 5}{2} = 4$." },
        { text: "$b = 12 > 0$, so $x$ and $y$ have the same sign. *Why this step:* $2xy = 12$ is positive." },
        { text: "Check: $(3 + 2i)^2 = 9 + 12i - 4 = 5 + 12i$." },
      ],
      answer: "$\\pm(3 + 2i)$.",
    },
    {
      type: "worked-example",
      id: "cq2-6-we2",
      title: "Worked example 2: a negative imaginary part",
      problem: "Find the square roots of $-8 - 6i$.",
      steps: [
        { text: "$r = \\sqrt{64 + 36} = 10$." },
        { text: "$x^2 = \\frac{10 - 8}{2} = 1$ and $y^2 = \\frac{10 + 8}{2} = 9$." },
        { text: "$b = -6 < 0$, so $x, y$ have opposite signs: $x = 1, y = -3$ or $x = -1, y = 3$." },
        { text: "Check: $(1 - 3i)^2 = 1 - 6i - 9 = -8 - 6i$." },
      ],
      answer: "$\\pm(1 - 3i)$.",
    },
    {
      type: "worked-example",
      id: "cq2-6-we3",
      title: "Worked example 3: the square roots of i",
      problem: "Find the square roots of $i$.",
      steps: [
        { text: "Here $a = 0$, $b = 1$, $r = 1$." },
        { text: "$x^2 = \\frac12$, $y^2 = \\frac12$, and $b > 0$ means equal signs." },
        { text: "Check: $\\left(\\frac{1 + i}{\\sqrt2}\\right)^2 = \\frac{1 + 2i + i^2}{2} = \\frac{2i}{2} = i$." },
      ],
      answer: "$\\pm\\dfrac{1 + i}{\\sqrt2}$.",
    },
    {
      type: "worked-example",
      id: "cq2-6-we4",
      title: "Worked example 4: guess and check with integers",
      problem: "Find the square roots of $3 - 4i$ quickly.",
      steps: [
        { text: "Look for integers with $x^2 - y^2 = 3$ and $xy = -2$. *Why this step:* when $a$ and $b$ are integers, the roots often are too, and $xy = \\frac b2$ narrows the search to a few factor pairs." },
        { text: "$x = 2$, $y = -1$ works: $4 - 1 = 3$ and $2(2)(-1) = -4$." },
      ],
      answer: "$\\pm(2 - i)$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: choosing the signs independently",
      content:
        "From $x^2 = 9$, $y^2 = 4$ it is tempting to list four roots $\\pm 3 \\pm 2i$. Only two are right. $(3 - 2i)^2 = 5 - 12i$, not $5 + 12i$. The equation $2xy = b$ ties the signs together: a non-zero complex number has **exactly two** square roots, and they are negatives of each other.",
    },
    {
      type: "callout",
      variant: "info",
      title: "About the symbol",
      content:
        "For complex numbers $\\sqrt{w}$ usually means \"either square root\", and answers are written with $\\pm$. There is no positive root to prefer, because complex numbers have no ordering.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "cq2-6-q1",
      variant: "practice",
      question: "The square roots of $5 + 12i$ are",
      options: [
        { text: "$\\pm(3 + 2i)$", correct: true, feedback: "$(3 + 2i)^2 = 9 + 12i - 4 = 5 + 12i$." },
        { text: "$\\pm(3 - 2i)$", feedback: "$(3 - 2i)^2 = 5 - 12i$. With $b > 0$ the parts share a sign." },
        { text: "$\\pm(2 + 3i)$", feedback: "$(2 + 3i)^2 = -5 + 12i$: the real part has the wrong sign." },
        { text: "$3 \\pm 2i$", feedback: "$3 - 2i$ is not a root. The two roots are negatives of each other." },
      ],
      hint: "$r = 13$, $x^2 = \\frac{r + a}{2}$, $y^2 = \\frac{r - a}{2}$, and the sign of $xy$ is the sign of $b$.",
    },
    {
      type: "quiz",
      id: "cq2-6-q2",
      variant: "practice",
      question: "The square roots of $-8 - 6i$ are",
      options: [
        { text: "$\\pm(1 - 3i)$", correct: true, feedback: "$(1 - 3i)^2 = 1 - 6i - 9 = -8 - 6i$." },
        { text: "$\\pm(1 + 3i)$", feedback: "$(1 + 3i)^2 = -8 + 6i$. With $b < 0$ the parts have opposite signs." },
        { text: "$\\pm(3 - i)$", feedback: "$(3 - i)^2 = 8 - 6i$: $x^2$ and $y^2$ are swapped." },
        { text: "$\\pm(2\\sqrt2 - i\\sqrt6)$", feedback: "Use $x^2 = \\frac{r + a}{2}$ with $r = 10$ and $a = -8$." },
      ],
      hint: "$r = 10$, so $x^2 = 1$ and $y^2 = 9$.",
    },
    {
      type: "numeric",
      id: "cq2-6-q3",
      variant: "practice",
      question: "The square roots of $-15 - 8i$ are $\\pm(p + qi)$ with $p > 0$. Find $q$.",
      answer: -4,
      hint: "$r = 17$. Then $p^2 = 1$, $q^2 = 16$, and $pq < 0$ because $b < 0$.",
      solution: "$r = \\sqrt{225 + 64} = 17$, $p^2 = \\frac{17 - 15}{2} = 1$, $q^2 = \\frac{17 + 15}{2} = 16$. With $p = 1 > 0$ and $pq < 0$, $q = -4$. Check: $(1 - 4i)^2 = 1 - 8i - 16 = -15 - 8i$.",
      commonMistakes: [
        { answer: 4, feedback: "$2pq = -8 < 0$, so with $p > 0$ we need $q < 0$." },
        { answer: -1, feedback: "You swapped $p^2$ and $q^2$. Since $a = -15 < 0$, the imaginary part is the larger one." },
      ],
    },
    {
      type: "numeric",
      id: "cq2-6-q4",
      variant: "practice",
      question: "Find the modulus of either square root of $7 - 24i$.",
      answer: 5,
      hint: "$|w^2| = |w|^2$, so $|\\sqrt{z}| = \\sqrt{|z|}$.",
      solution: "$|7 - 24i| = 25$, so each square root has modulus $5$. (They are $\\pm(4 - 3i)$.)",
      commonMistakes: [
        { answer: 25, feedback: "That is $|7 - 24i|$. A square root has the square root of that modulus." },
      ],
    },
    {
      type: "quiz",
      id: "cq2-6-q5",
      variant: "concept",
      question: "Which of these are square roots of $i$? Select all that apply.",
      multiple: true,
      options: [
        { text: "$\\frac{1 + i}{\\sqrt2}$", correct: true, feedback: "Its square is $\\frac{2i}{2} = i$." },
        { text: "$-\\frac{1 + i}{\\sqrt2}$", correct: true, feedback: "The negative of a square root is also a square root." },
        { text: "$\\frac{1 - i}{\\sqrt2}$", feedback: "Its square is $\\frac{-2i}{2} = -i$." },
        { text: "$i$", feedback: "$i^2 = -1$, not $i$." },
      ],
      hint: "Square each candidate, using $(1 \\pm i)^2 = \\pm 2i$.",
    },
    {
      type: "quiz",
      id: "cq2-6-q6",
      variant: "concept",
      question: "Why can we add the equation $x^2 + y^2 = \\sqrt{a^2 + b^2}$ when solving $(x + iy)^2 = a + ib$?",
      options: [
        { text: "Taking moduli: $|x + iy|^2 = |(x + iy)^2| = |a + ib|$", correct: true, feedback: "The modulus is multiplicative, so $|w^2| = |w|^2$." },
        { text: "It is the real part of $(x + iy)^2$", feedback: "The real part is $x^2 - y^2$." },
        { text: "It is an extra assumption that picks one of the roots", feedback: "It holds for both roots. It is a consequence, not an assumption." },
        { text: "It follows from $2xy = b$", feedback: "It comes from the modulus, not from the imaginary part." },
      ],
      hint: "What does taking the modulus of both sides give?",
    },
    {
      type: "numeric",
      id: "cq2-6-q7",
      variant: "practice",
      question: "Real $x > 0$ and $y$ satisfy $(x + iy)^2 = -3 + 4i$. Find $x + y$.",
      answer: 3,
      hint: "$r = 5$: $x^2 = 1$, $y^2 = 4$, and $xy > 0$.",
      solution: "$x = 1$, $y = 2$. Check: $(1 + 2i)^2 = 1 + 4i - 4 = -3 + 4i$. So $x + y = 3$.",
      commonMistakes: [
        { answer: -1, feedback: "$b = 4 > 0$ means $x, y$ have the same sign, so $y = 2$." },
      ],
    },
    {
      type: "quiz",
      id: "cq2-6-q8",
      variant: "practice",
      question: "JEE Main. The square roots of $-7 - 24i$ are",
      options: [
        { text: "$\\pm(3 - 4i)$", correct: true, feedback: "$(3 - 4i)^2 = 9 - 24i - 16 = -7 - 24i$." },
        { text: "$\\pm(4 - 3i)$", feedback: "$(4 - 3i)^2 = 7 - 24i$: the real part comes out $+7$." },
        { text: "$\\pm(3 + 4i)$", feedback: "$(3 + 4i)^2 = -7 + 24i$: wrong sign of the imaginary part." },
        { text: "$\\pm(4 + 3i)$", feedback: "$(4 + 3i)^2 = 7 + 24i$." },
      ],
      hint: "$r = 25$, $x^2 = 9$, $y^2 = 16$, opposite signs.",
    },
    {
      type: "quiz",
      id: "cq2-6-q9",
      variant: "concept",
      question: "JEE Main. If $\\sqrt{a + ib} = x + iy$ (real $a, b, x, y$), then one square root of $a - ib$ is",
      options: [
        { text: "$x - iy$", correct: true, feedback: "Conjugate $(x + iy)^2 = a + ib$: $(x - iy)^2 = a - ib$." },
        { text: "$y + ix$", feedback: "$(y + ix)^2 = y^2 - x^2 + 2ixy = -a + ib$." },
        { text: "$-y + ix$", feedback: "$(-y + ix)^2 = y^2 - x^2 - 2ixy = -a - ib$." },
        { text: "$\\frac{1}{x + iy}$", feedback: "That squares to $\\frac{1}{a + ib}$." },
      ],
      hint: "Conjugation passes through squares: $\\overline{w^2} = \\bar w^2$.",
    },
    {
      type: "numeric",
      id: "cq2-6-q10",
      variant: "mastery",
      question: "JEE Advanced. The square roots of $-48 - 14i$ are $\\pm(p + qi)$ with $p > 0$. Find $p - q$.",
      answer: 8,
      hint: "$|-48 - 14i| = \\sqrt{2304 + 196} = 50$.",
      solution: "$p^2 = \\frac{50 - 48}{2} = 1$, $q^2 = \\frac{50 + 48}{2} = 49$, and $b < 0$ gives $q = -7$ with $p = 1$. Check: $(1 - 7i)^2 = 1 - 14i - 49$. So $p - q = 8$.",
      commonMistakes: [
        { answer: -6, feedback: "That is $p + q$. The question asks for $p - q = 1 - (-7)$." },
      ],
    },
  ]),
};

const lesson07: LessonSeed = {
  slug: "quadratics-with-complex-roots",
  title: "2.7 · Quadratics with Complex Roots",
  position: 7,
  blocks: blocks([
    {
      type: "text",
      content:
        "The chapter began with quadratics that had \"no real roots\". With $i$ and complex square roots in hand, every quadratic $az^2 + bz + c = 0$ (even one with complex coefficients) has exactly two roots in $\\mathbb C$, counted with multiplicity. The quadratic formula still works word for word: we only need to be able to take the square root of the discriminant.",
    },
    { type: "heading", text: "Real coefficients: conjugate pairs" },
    {
      type: "text",
      content:
        "When $a, b, c$ are real and $D = b^2 - 4ac < 0$, write $\\sqrt D = i\\sqrt{-D}$:",
    },
    {
      type: "math",
      latex: "z = \\frac{-b \\pm i\\sqrt{-D}}{2a} = -\\frac{b}{2a} \\pm i\\,\\frac{\\sqrt{4ac - b^2}}{2a}",
    },
    {
      type: "text",
      content:
        "The two roots are conjugates of each other. Sum and product are still $-\\frac ba$ and $\\frac ca$ (both real, as they must be, since $z + \\bar z$ and $z\\bar z$ are real). On the graph the real part $-\\frac{b}{2a}$ is the x-coordinate of the vertex: the parabola floats above or below the axis, and the roots sit \"off the page\" directly beneath the vertex.",
    },
    {
      type: "interactive",
      config: {
        component: "cq-quadratic-explorer",
        a: { min: -2, max: 2, step: 0.5, initial: 1 },
        b: { min: -6, max: 6, step: 1, initial: -4 },
        c: { min: -4, max: 14, step: 1, initial: 13 },
        readouts: ["discriminant", "roots", "vertex", "sum-product"],
        window: { xmin: -3, xmax: 7, ymin: -4, ymax: 16 },
        caption:
          "$z^2 - 4z + 13$ has $D = -36$ and roots $2 \\pm 3i$. The real part $2$ is the vertex's x-coordinate. Lower $c$ and watch the imaginary part shrink to $0$ at $c = 4$, where the roots become real.",
      },
    },
    {
      type: "callout",
      variant: "tip",
      title: "Conjugate root theorem",
      content:
        "If a polynomial has **real** coefficients and $p + iq$ ($q \\ne 0$) is a root, then $p - iq$ is also a root (Lesson 2.4: $P(\\bar z) = \\overline{P(z)}$). For a quadratic this pins the equation down: $$(z - p - iq)(z - p + iq) = z^2 - 2pz + (p^2 + q^2).$$",
    },
    {
      type: "worked-example",
      id: "cq2-7-we1",
      title: "Worked example 1: solving with D < 0",
      problem: "Solve $z^2 - 4z + 13 = 0$.",
      steps: [
        { text: "$D = 16 - 52 = -36$, so $\\sqrt D = 6i$." },
        { latex: "z = \\frac{4 \\pm 6i}{2} = 2 \\pm 3i" },
        { text: "Check with Vieta: sum $4$, product $(2 + 3i)(2 - 3i) = 4 + 9 = 13$." },
      ],
      answer: "$z = 2 \\pm 3i$.",
    },
    {
      type: "worked-example",
      id: "cq2-7-we2",
      title: "Worked example 2: from one complex root to the equation",
      problem: "$1 - i$ is a root of $z^2 + az + b = 0$ with real $a, b$. Find $a$ and $b$.",
      steps: [
        { text: "The coefficients are real, so $1 + i$ is the other root. *Why this step:* without real coefficients we could not conclude this." },
        { text: "Sum $= 2 = -a$, product $= (1 - i)(1 + i) = 2 = b$." },
      ],
      answer: "$a = -2$, $b = 2$: the equation is $z^2 - 2z + 2 = 0$.",
    },
    { type: "heading", text: "Complex coefficients" },
    {
      type: "text",
      content:
        "If the coefficients are complex, the roots need not be conjugates. Use the quadratic formula with the square root found by the method of Lesson 2.6, then check with sum and product.",
    },
    {
      type: "worked-example",
      id: "cq2-7-we3",
      title: "Worked example 3: complex coefficients",
      problem: "Solve $z^2 - (3 + i)z + (2 + 2i) = 0$.",
      steps: [
        { text: "$D = (3 + i)^2 - 4(2 + 2i) = (8 + 6i) - 8 - 8i = -2i$." },
        { text: "Square roots of $-2i$: $r = 2$, $x^2 = \\frac{2 + 0}{2} = 1$, $y^2 = 1$, and $b < 0$ gives opposite signs, so $\\sqrt{-2i} = \\pm(1 - i)$." },
        { latex: "z = \\frac{(3 + i) \\pm (1 - i)}{2} = 2 \\ \\text{ or } \\ 1 + i" },
        { text: "Check: sum $3 + i$, product $2(1 + i) = 2 + 2i$." },
      ],
      answer: "$z = 2$ or $z = 1 + i$. The roots are not conjugates: the coefficients are not real.",
    },
    {
      type: "worked-example",
      id: "cq2-7-we4",
      title: "Worked example 4: a larger discriminant",
      problem: "Solve $z^2 - (5 - i)z + (18 + i) = 0$.",
      steps: [
        { text: "$D = (5 - i)^2 - 4(18 + i) = (24 - 10i) - 72 - 4i = -48 - 14i$." },
        { text: "From Lesson 2.6, $\\sqrt{-48 - 14i} = \\pm(1 - 7i)$." },
        { latex: "z = \\frac{(5 - i) \\pm (1 - 7i)}{2} = 3 - 4i \\ \\text{ or } \\ 2 + 3i" },
        { text: "Check: sum $5 - i$, product $(3 - 4i)(2 + 3i) = 6 + 9i - 8i + 12 = 18 + i$." },
      ],
      answer: "$z = 3 - 4i$ or $z = 2 + 3i$.",
    },
    { type: "heading", text: "Equations involving z and its conjugate" },
    {
      type: "text",
      content:
        "Equations mixing $z$ with $\\bar z$ or $|z|$ are not polynomial equations in $z$, so the quadratic formula does not apply. The reliable method: put $z = x + iy$, equate real and imaginary parts, and solve the resulting pair of real equations case by case.",
    },
    {
      type: "worked-example",
      id: "cq2-7-we5",
      title: "Worked example 5: z² + |z| = 0",
      problem: "Find all complex $z$ with $z^2 + |z| = 0$.",
      steps: [
        { text: "$z = x + iy$: $(x^2 - y^2 + \\sqrt{x^2 + y^2}) + 2xy\\,i = 0$." },
        { text: "Imaginary part: $xy = 0$. *Why this step:* this splits the problem into two easy cases." },
        { text: "Case $y = 0$: $x^2 + |x| = 0$, so $x = 0$." },
        { text: "Case $x = 0$: $-y^2 + |y| = 0$, so $|y| = 0$ or $|y| = 1$, giving $z = 0, i, -i$." },
      ],
      answer: "$z = 0$, $i$ or $-i$ (three solutions).",
    },
    {
      type: "worked-example",
      id: "cq2-7-we6",
      title: "Worked example 6: z̄ = iz²",
      problem: "Find all complex $z$ with $\\bar z = iz^2$.",
      steps: [
        { text: "$iz^2 = i(x^2 - y^2 + 2ixy) = -2xy + i(x^2 - y^2)$, and $\\bar z = x - iy$." },
        { latex: "x = -2xy, \\qquad -y = x^2 - y^2" },
        { text: "From the first, $x = 0$ or $y = -\\frac12$." },
        { text: "$x = 0$: $-y = -y^2$, so $y = 0$ or $y = 1$, giving $z = 0, i$." },
        { text: "$y = -\\frac12$: $\\frac12 = x^2 - \\frac14$, so $x = \\pm\\frac{\\sqrt3}{2}$." },
      ],
      answer: "$z = 0$, $i$, $\\frac{\\sqrt3}{2} - \\frac i2$, $-\\frac{\\sqrt3}{2} - \\frac i2$ (four solutions).",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"complex roots always come in conjugate pairs\"",
      content:
        "Only for **real** coefficients. $z^2 - (3 + i)z + (2 + 2i) = 0$ has roots $2$ and $1 + i$, which are not conjugates. Before using the conjugate root theorem, check that every coefficient is real. A real quadratic can never have exactly one non-real root.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "cq2-7-q1",
      variant: "practice",
      question: "The roots of $z^2 - 4z + 13 = 0$ are",
      options: [
        { text: "$2 \\pm 3i$", correct: true, feedback: "$D = -36$, $\\sqrt D = 6i$, $z = \\frac{4 \\pm 6i}{2}$." },
        { text: "$-2 \\pm 3i$", feedback: "The sum of the roots is $-\\frac ba = 4$, so the real part is $+2$." },
        { text: "$2 \\pm 6i$", feedback: "Divide the whole numerator by $2a = 2$." },
        { text: "$4 \\pm 6i$", feedback: "You forgot to divide by $2a$." },
      ],
      hint: "$D = 16 - 52$. Then use the formula with $\\sqrt{-36} = 6i$.",
    },
    {
      type: "numeric",
      id: "cq2-7-q2",
      variant: "practice",
      question: "$3 - 2i$ is a root of $z^2 + pz + q = 0$ with $p, q$ real. Find $q$.",
      answer: 13,
      hint: "The other root is the conjugate. $q$ is the product of the roots.",
      solution: "$q = (3 - 2i)(3 + 2i) = 9 + 4 = 13$.",
      commonMistakes: [
        { answer: 5, feedback: "$(3 - 2i)(3 + 2i) = 9 - 4i^2 = 9 + 4$." },
        { answer: -6, feedback: "That is $p$, minus the sum of the roots." },
      ],
    },
    {
      type: "numeric",
      id: "cq2-7-q3",
      variant: "practice",
      question: "For the same equation ($3 - 2i$ a root, real $p, q$), find $p$.",
      answer: -6,
      hint: "The sum of the roots is $-p$.",
      solution: "Sum $= (3 - 2i) + (3 + 2i) = 6 = -p$, so $p = -6$.",
      commonMistakes: [
        { answer: 6, feedback: "Sum of roots $= -\\frac ba = -p$, so $p$ is minus the sum." },
      ],
    },
    {
      type: "quiz",
      id: "cq2-7-q4",
      variant: "concept",
      question: "Select all the statements that are true.",
      multiple: true,
      options: [
        { text: "If a real-coefficient quadratic has root $2 + i$, then $2 - i$ is also a root", correct: true, feedback: "Conjugate root theorem." },
        { text: "$z^2 - (3 + i)z + 2 + 2i = 0$ has roots $2$ and $1 + i$", correct: true, feedback: "Sum $3 + i$ and product $2 + 2i$ both check." },
        { text: "Every quadratic's non-real roots are conjugates of each other", feedback: "Only when the coefficients are real." },
        { text: "A real quadratic can have exactly one non-real root", feedback: "Non-real roots of real polynomials come in conjugate pairs." },
        { text: "A real quadratic with $D < 0$ has a pair of conjugate roots", correct: true, feedback: "$-\\frac{b}{2a} \\pm i\\frac{\\sqrt{-D}}{2a}$." },
      ],
      hint: "The conjugate root theorem needs real coefficients.",
    },
    {
      type: "numeric",
      id: "cq2-7-q5",
      variant: "practice",
      question: "How many complex numbers satisfy $z^2 + |z| = 0$?",
      answer: 3,
      hint: "With $z = x + iy$ the imaginary part gives $xy = 0$. Treat $x = 0$ and $y = 0$ separately.",
      solution: "$y = 0$ gives only $z = 0$. $x = 0$ gives $|y| = y^2$, so $z = 0, \\pm i$. Three distinct solutions.",
      commonMistakes: [
        { answer: 1, feedback: "$z = 0$ works, but so do $z = \\pm i$: $i^2 + |i| = -1 + 1 = 0$." },
        { answer: 2, feedback: "Don't forget $z = 0$." },
      ],
    },
    {
      type: "numeric",
      id: "cq2-7-q6",
      variant: "practice",
      question: "How many complex numbers satisfy $\\bar z = iz^2$?",
      answer: 4,
      hint: "Equate parts: $x = -2xy$ and $-y = x^2 - y^2$.",
      solution: "$x = 0$ gives $z = 0, i$. $y = -\\frac12$ gives $x = \\pm\\frac{\\sqrt3}{2}$. Four solutions in all.",
      commonMistakes: [
        { answer: 2, feedback: "That is only the case $x = 0$. The case $y = -\\frac12$ adds two more." },
        { answer: 3, feedback: "Recount: $0$, $i$ and the two numbers $\\pm\\frac{\\sqrt3}{2} - \\frac i2$." },
      ],
    },
    {
      type: "quiz",
      id: "cq2-7-q7",
      variant: "practice",
      question: "The roots of $z^2 - (5 - i)z + (18 + i) = 0$ are",
      options: [
        { text: "$3 - 4i$ and $2 + 3i$", correct: true, feedback: "Sum $5 - i$, product $18 + i$." },
        { text: "$3 + 4i$ and $2 - 3i$", feedback: "These sum to $5 + i$, not $5 - i$." },
        { text: "$3 - 4i$ and $3 + 4i$", feedback: "Conjugate roots need real coefficients. These have sum $6$." },
        { text: "$2 \\pm 3i$", feedback: "Sum $4$ and product $13$ do not match." },
      ],
      hint: "$D = -48 - 14i$, and its square roots are $\\pm(1 - 7i)$. Or test each option by sum and product.",
    },
    {
      type: "numeric",
      id: "cq2-7-q8",
      variant: "practice",
      question: "$\\alpha, \\beta$ are the roots of $z^2 + 2z + 5 = 0$. Find $\\alpha^2 + \\beta^2$.",
      answer: -6,
      hint: "$\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta$, valid for complex roots too.",
      solution: "$(-2)^2 - 2(5) = -6$. (Directly: $(-1 \\pm 2i)^2 = -3 \\mp 4i$, which add to $-6$.)",
      commonMistakes: [
        { answer: 6, feedback: "Watch the sign: $4 - 10 = -6$. A sum of squares of non-real numbers can be negative." },
        { answer: 14, feedback: "That uses $+2\\alpha\\beta$. The identity is $(\\alpha + \\beta)^2 - 2\\alpha\\beta$." },
        { answer: 10, feedback: "That is $|\\alpha|^2 + |\\beta|^2$, a different quantity." },
      ],
    },
    {
      type: "quiz",
      id: "cq2-7-q9",
      variant: "practice",
      question: "JEE Main. For real $a$, the equation $x^2 + ax + 4 = 0$ has non-real roots exactly when",
      options: [
        { text: "$-4 < a < 4$", correct: true, feedback: "$D = a^2 - 16 < 0$." },
        { text: "$a < -4$ or $a > 4$", feedback: "That is where the roots are real and distinct." },
        { text: "$-2 < a < 2$", feedback: "$D = a^2 - 4 \\cdot 4 = a^2 - 16$, not $a^2 - 4$." },
        { text: "$a > 0$", feedback: "$a = 5$ gives $D = 9 > 0$: real roots." },
      ],
      hint: "Non-real roots of a real quadratic means $D < 0$.",
    },
    {
      type: "numeric",
      id: "cq2-7-q10",
      variant: "practice",
      question: "JEE Main. $\\alpha, \\beta$ are the roots of $x^2 - x + 1 = 0$. Find $\\alpha^{2009} + \\beta^{2009}$.",
      answer: 1,
      hint: "Multiply $x^2 - x + 1$ by $x + 1$: each root satisfies $\\alpha^3 = -1$.",
      solution: "$(x + 1)(x^2 - x + 1) = x^3 + 1$, so $\\alpha^3 = \\beta^3 = -1$. Since $2009 = 3 \\cdot 669 + 2$, $\\alpha^{2009} = (-1)^{669}\\alpha^2 = -\\alpha^2$. Hence the sum is $-(\\alpha^2 + \\beta^2) = -\\left((\\alpha + \\beta)^2 - 2\\alpha\\beta\\right) = -(1 - 2) = 1$.",
      commonMistakes: [
        { answer: -1, feedback: "Check the sign: $\\alpha^2 + \\beta^2 = 1 - 2 = -1$, and the sum is minus that." },
        { answer: 2, feedback: "$\\alpha^{2009}$ is not $1$: use $\\alpha^3 = -1$ and the remainder of $2009$ on division by $3$." },
      ],
    },
    {
      type: "quiz",
      id: "cq2-7-q11",
      variant: "mastery",
      question: "JEE Advanced. $z^2 + bz + c = 0$ has real $b, c$ and a root $\\alpha = 1 + 2i$. Let $\\beta$ be the other root. Select all that are true.",
      multiple: true,
      options: [
        { text: "$\\beta = 1 - 2i$", correct: true, feedback: "Real coefficients force the conjugate." },
        { text: "$b = -2$", correct: true, feedback: "$\\alpha + \\beta = 2 = -b$." },
        { text: "$c = 5$", correct: true, feedback: "$\\alpha\\beta = 1 + 4 = 5$." },
        { text: "$\\frac{\\alpha}{\\beta}$ is real", feedback: "$\\frac{\\alpha}{\\beta} = \\frac{\\alpha^2}{|\\alpha|^2} = \\frac{-3 + 4i}{5}$, not real." },
        { text: "$\\alpha^2 + \\beta^2 = 6$", feedback: "$\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta = 4 - 10 = -6$." },
      ],
      hint: "Find $\\beta$ from the conjugate root theorem, then use Vieta.",
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-2-mastery",
  title: "2.8 · Chapter 2 Mastery",
  position: 8,
  blocks: blocks([
    {
      type: "text",
      content:
        "This chapter rests on two facts: $i^2 = -1$, and the conjugate $\\bar z$ with $z\\bar z = |z|^2$. Everything else (division, the conjugate and modulus rules, square roots, conjugate roots) can be rebuilt from those two in a few lines. Do the rebuilding below before the questions, without looking back.",
    },
    { type: "heading", text: "Reconstruct it" },
    {
      type: "callout",
      variant: "tip",
      title: "Rebuild the conjugate and modulus rules",
      content:
        "1. Expand $(a + ib)(c + id)$ and $(a - ib)(c - id)$ and see that $\\overline{z_1z_2} = \\bar z_1\\bar z_2$.\n2. Use it in $|z_1z_2|^2 = z_1z_2\\,\\overline{z_1z_2}$ to get $|z_1z_2| = |z_1||z_2|$.\n3. Expand $(z_1 + z_2)(\\bar z_1 + \\bar z_2)$ to get $|z_1 + z_2|^2 = |z_1|^2 + |z_2|^2 + 2\\,\\mathrm{Re}(z_1\\bar z_2)$, then the parallelogram law.\n4. Explain why $\\frac{1}{z} = \\frac{\\bar z}{|z|^2}$ and why, on the unit circle, $\\frac1z = \\bar z$.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Rebuild the square-root formula",
      content:
        "Set $(x + iy)^2 = a + ib$. Write the real-part and imaginary-part equations, add the modulus equation $x^2 + y^2 = \\sqrt{a^2 + b^2}$, solve for $x^2$ and $y^2$, and decide the signs from $2xy = b$. Test your formula on $\\sqrt{-5 + 12i}$.",
    },
    {
      type: "math",
      latex:
        "|z|^2 = z\\bar z, \\qquad \\frac{z_1}{z_2} = \\frac{z_1\\bar z_2}{|z_2|^2}, \\qquad z \\in \\mathbb R \\iff z = \\bar z, \\qquad \\sqrt{a + ib} = \\pm\\left(\\sqrt{\\tfrac{|z| + a}{2}} + i\\,\\mathrm{sgn}(b)\\sqrt{\\tfrac{|z| - a}{2}}\\right)",
    },
    { type: "heading", text: "Mastery questions" },
    {
      type: "numeric",
      id: "cq2-8-q1",
      variant: "mastery",
      question: "Find the real part of $\\dfrac{(2 - 3i)^2}{1 + i}$.",
      answer: -8.5,
      tolerance: 0.001,
      hint: "Square first, then multiply top and bottom by $1 - i$.",
      solution: "$(2 - 3i)^2 = -5 - 12i$. Then $\\frac{(-5 - 12i)(1 - i)}{2} = \\frac{-5 + 5i - 12i - 12}{2} = \\frac{-17 - 7i}{2}$, real part $-8.5$.",
      commonMistakes: [
        { answer: -3.5, tolerance: 0.001, feedback: "That is the imaginary part." },
        { answer: -17, feedback: "Divide by $(1 + i)(1 - i) = 2$." },
        { answer: 3.5, tolerance: 0.001, feedback: "$(2 - 3i)^2 = 4 - 12i - 9$: the real part is $-5$, not $13$." },
      ],
    },
    {
      type: "quiz",
      id: "cq2-8-q2",
      variant: "mastery",
      question: "$i^{57} + \\dfrac{1}{i^{125}}$ equals",
      options: [
        { text: "$0$", correct: true, feedback: "$i^{57} = i$ and $i^{125} = i$, so the sum is $i + \\frac1i = i - i = 0$." },
        { text: "$2i$", feedback: "$\\frac1i = -i$, not $i$." },
        { text: "$-2i$", feedback: "$i^{57} = i^1 = i$ since $57 = 4 \\cdot 14 + 1$." },
        { text: "$2$", feedback: "Both terms are imaginary: $i^{57} = i$ and $\\frac{1}{i^{125}} = -i$." },
      ],
      hint: "Reduce each exponent modulo $4$, and remember $\\frac1i = -i$.",
    },
    {
      type: "numeric",
      id: "cq2-8-q3",
      variant: "mastery",
      question: "Evaluate $1 + i^2 + i^4 + i^6 + \\dots + i^{20}$.",
      answer: 1,
      hint: "$i^{2k} = (-1)^k$. How many terms are there?",
      solution: "The terms are $(-1)^k$ for $k = 0, 1, \\dots, 10$: eleven terms alternating $1, -1, \\dots$, starting and ending with $1$, so the sum is $1$.",
      commonMistakes: [
        { answer: 0, feedback: "There are $11$ terms, an odd number, so they do not cancel completely." },
        { answer: 11, feedback: "$i^2 = -1$, so the terms alternate in sign." },
      ],
    },
    {
      type: "quiz",
      id: "cq2-8-q4",
      variant: "mastery",
      question: "$z$ is a non-real complex number. Which of these are necessarily real? Select all that apply.",
      multiple: true,
      options: [
        { text: "$z + \\bar z$", correct: true, feedback: "$2\\,\\mathrm{Re}\\, z$." },
        { text: "$z\\bar z$", correct: true, feedback: "$|z|^2$." },
        { text: "$\\frac{z}{\\bar z}$", feedback: "$\\frac{z}{\\bar z} = \\frac{z^2}{|z|^2}$, which is real only if $z^2$ is. For $z = 1 + i$ it is $i$." },
        { text: "$(z - \\bar z)^2$", correct: true, feedback: "$(2i\\,\\mathrm{Im}\\, z)^2 = -4(\\mathrm{Im}\\, z)^2$." },
        { text: "$z^2 + \\bar z^2$", correct: true, feedback: "$2\\,\\mathrm{Re}(z^2)$." },
      ],
      hint: "$w$ is real exactly when $\\bar w = w$. Conjugate each expression.",
    },
    {
      type: "numeric",
      id: "cq2-8-q5",
      variant: "mastery",
      question: "$|z_1| = |z_2| = |z_3| = 1$ and $z_1 + z_2 + z_3 = 0$. Find $z_1^2 + z_2^2 + z_3^2$.",
      answer: 0,
      hint: "Conjugate the sum and use $\\bar z_k = \\frac{1}{z_k}$ to find $z_1z_2 + z_2z_3 + z_3z_1$.",
      solution: "$\\bar z_1 + \\bar z_2 + \\bar z_3 = 0$ gives $\\frac1{z_1} + \\frac1{z_2} + \\frac1{z_3} = 0$, so $z_1z_2 + z_2z_3 + z_3z_1 = 0$. Then $\\sum z_k^2 = \\left(\\sum z_k\\right)^2 - 2\\sum z_jz_k = 0 - 0 = 0$.",
      commonMistakes: [
        { answer: 3, feedback: "$|z_k^2| = 1$ does not make $z_k^2 = 1$." },
        { answer: -2, feedback: "Find $z_1z_2 + z_2z_3 + z_3z_1$ from the conjugate equation: it is $0$." },
      ],
    },
    {
      type: "quiz",
      id: "cq2-8-q6",
      variant: "mastery",
      question: "The square roots of $-5 + 12i$ are",
      options: [
        { text: "$\\pm(2 + 3i)$", correct: true, feedback: "$(2 + 3i)^2 = 4 + 12i - 9 = -5 + 12i$." },
        { text: "$\\pm(3 + 2i)$", feedback: "$(3 + 2i)^2 = 5 + 12i$: here $a = -5 < 0$, so $|y| > |x|$." },
        { text: "$\\pm(2 - 3i)$", feedback: "$(2 - 3i)^2 = -5 - 12i$." },
        { text: "$2 \\pm 3i$", feedback: "The two roots are negatives of each other." },
      ],
      hint: "$r = 13$: $x^2 = 4$, $y^2 = 9$, same signs because $b > 0$.",
    },
    {
      type: "numeric",
      id: "cq2-8-q7",
      variant: "mastery",
      question: "For how many $\\theta \\in [0, 2\\pi]$ is $\\dfrac{3 + 2i\\sin\\theta}{1 - 2i\\sin\\theta}$ a real number?",
      answer: 3,
      hint: "The imaginary part is $\\frac{8\\sin\\theta}{1 + 4\\sin^2\\theta}$.",
      solution: "Real exactly when $\\sin\\theta = 0$, i.e. $\\theta = 0, \\pi, 2\\pi$: three values.",
      commonMistakes: [
        { answer: 2, feedback: "Both endpoints $0$ and $2\\pi$ are in the closed interval." },
        { answer: 4, feedback: "$\\sin^2\\theta = \\frac34$ gives the **purely imaginary** cases, not the real ones." },
      ],
    },
    {
      type: "numeric",
      id: "cq2-8-q8",
      variant: "mastery",
      question: "How many complex numbers satisfy $z^3 = \\bar z$?",
      answer: 5,
      hint: "Take moduli: $|z|^3 = |z|$. Then for $|z| = 1$ use $\\bar z = \\frac1z$.",
      solution: "$|z|^3 = |z|$ gives $|z| = 0$ or $1$. $|z| = 0$ gives $z = 0$. If $|z| = 1$, $\\bar z = \\frac1z$, so $z^4 = 1$: $z = \\pm1, \\pm i$. Five solutions.",
      commonMistakes: [
        { answer: 4, feedback: "Don't forget $z = 0$." },
        { answer: 3, feedback: "$z^3 = \\bar z$ is not a cubic in $z$. On $|z| = 1$ it becomes $z^4 = 1$." },
      ],
    },
    {
      type: "numeric",
      id: "cq2-8-q9",
      variant: "mastery",
      question: "$|z_1| = 2$, $|z_2| = 3$ and $|z_1 + z_2| = 4$. Find $|z_1 - z_2|^2$.",
      answer: 10,
      hint: "Parallelogram law.",
      solution: "$|z_1 - z_2|^2 = 2(4 + 9) - 16 = 10$.",
      commonMistakes: [
        { answer: 1, feedback: "$(|z_1| - |z_2|)^2 = 1$ is only the smallest possible value." },
        { answer: 26, feedback: "Subtract $|z_1 + z_2|^2 = 16$ from $2(|z_1|^2 + |z_2|^2) = 26$." },
      ],
    },
    {
      type: "quiz",
      id: "cq2-8-q10",
      variant: "mastery",
      question: "$\\left(\\dfrac{1 + i}{1 - i}\\right)^{2026}$ equals",
      options: [
        { text: "$-1$", correct: true, feedback: "The fraction is $i$, and $i^{2026} = i^2 = -1$." },
        { text: "$1$", feedback: "$2026$ is not a multiple of $4$." },
        { text: "$i$", feedback: "$2026 \\equiv 2 \\pmod 4$." },
        { text: "$-i$", feedback: "$2026 \\equiv 2 \\pmod 4$, so the answer is $i^2$." },
      ],
      hint: "Simplify the fraction, then reduce the exponent modulo $4$.",
    },
    {
      type: "quiz",
      id: "cq2-8-q11",
      variant: "mastery",
      question: "JEE Advanced. $z$ is non-real with $|z| = 1$. Which of these must hold? Select all that apply.",
      multiple: true,
      options: [
        { text: "$\\bar z = \\frac1z$", correct: true, feedback: "$z\\bar z = |z|^2 = 1$." },
        { text: "$\\frac{z - 1}{z + 1}$ is purely imaginary", correct: true, feedback: "Reverse the argument of Lesson 2.4: with $z\\bar z = 1$, $w + \\bar w = \\frac{2z\\bar z - 2}{|z + 1|^2} = 0$, and $w \\ne 0$ since $z \\ne 1$." },
        { text: "$z + \\frac1z$ is real", correct: true, feedback: "It is $z + \\bar z = 2\\,\\mathrm{Re}\\, z$." },
        { text: "$z^2$ is real", feedback: "$z = \\frac{1 + i}{\\sqrt2}$ has $z^2 = i$." },
        { text: "$|z + 1|^2 + |z - 1|^2 = 4$", correct: true, feedback: "Parallelogram law: $2(|z|^2 + 1) = 4$." },
      ],
      hint: "Use $\\bar z = \\frac1z$ and the parallelogram law.",
    },
    {
      type: "numeric",
      id: "cq2-8-q12",
      variant: "mastery",
      question: "One root of $z^2 - (3 + i)z + (4 + 3i) = 0$ is $1 + 2i$. Let $\\alpha, \\beta$ be the two roots. Find $|\\alpha|^2 + |\\beta|^2$.",
      answer: 10,
      hint: "The coefficients are not real, so the other root is not the conjugate. Use the sum of roots.",
      solution: "$\\beta = (3 + i) - (1 + 2i) = 2 - i$. Check the product: $(1 + 2i)(2 - i) = 2 - i + 4i + 2 = 4 + 3i$. Then $|\\alpha|^2 + |\\beta|^2 = 5 + 5 = 10$.",
      commonMistakes: [
        { answer: 5, feedback: "That counts only one root. Both have modulus squared $5$." },
        { answer: -6, feedback: "That is $\\alpha^2 + \\beta^2$ for the conjugate pair $1 \\pm 2i$, but the other root here is $2 - i$, not $1 - 2i$." },
      ],
    },
    {
      type: "numeric",
      id: "cq2-8-q13",
      variant: "mastery",
      question: "JEE Main. $\\alpha, \\beta$ are the roots of $x^2 + x + 1 = 0$. Find $\\alpha^{2026} + \\beta^{2026}$.",
      answer: -1,
      hint: "$(x - 1)(x^2 + x + 1) = x^3 - 1$, so $\\alpha^3 = \\beta^3 = 1$.",
      solution: "$2026 = 3 \\cdot 675 + 1$, so $\\alpha^{2026} + \\beta^{2026} = \\alpha + \\beta = -1$.",
      commonMistakes: [
        { answer: 2, feedback: "$2026$ is not a multiple of $3$: the remainder is $1$." },
        { answer: 1, feedback: "$\\alpha + \\beta = -\\frac ba = -1$." },
      ],
    },
    {
      type: "numeric",
      id: "cq2-8-q14",
      variant: "mastery",
      question: "JEE Main. A complex number satisfies $|z| + z = 3 + 4i$. Find $|z|$.",
      answer: 4.1667,
      tolerance: 0.01,
      hint: "The imaginary part gives $\\mathrm{Im}\\, z = 4$. Then $\\sqrt{x^2 + 16} = 3 - x$.",
      solution: "$x^2 + 16 = 9 - 6x + x^2$ gives $x = -\\frac76$, and $|z| = 3 - x = \\frac{25}{6} \\approx 4.17$.",
      commonMistakes: [
        { answer: 5, feedback: "That is $|3 + 4i|$. Solve for $z$ first." },
        { answer: -1.1667, tolerance: 0.01, feedback: "That is $\\mathrm{Re}\\, z$." },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Where next",
      content:
        "So far a complex number has been a pair of parts handled by algebra. Chapter 3 draws it: $z = x + iy$ becomes the point $(x, y)$ of the **Argand plane**, $|z|$ becomes a distance, and a new quantity, the argument, becomes an angle. In that picture multiplication turns out to be a rotation, which is why $i$ cycles with period $4$.",
    },
  ]),
};

export const cqChapter2Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lesson07,
  lessonMastery,
];
