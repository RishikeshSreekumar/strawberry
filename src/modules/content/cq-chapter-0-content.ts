import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Complex Numbers & Quadratics Chapter 0 — Quadratic Equations.
 * Standard form and roots, factorising, completing the square and the
 * quadratic formula, the discriminant and the nature of roots, Vieta's
 * sum and product of roots, symmetric functions (with Newton's recurrence),
 * transformation of roots, and equations reducible to quadratics.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "what-a-quadratic-equation-is",
  title: "0.1 · What a Quadratic Equation Is",
  position: 1,
  blocks: blocks([
    {
      type: "text",
      content:
        "A gardener wants a rectangular bed whose length is 3 m more than its width and whose area is exactly 40 m². Call the width $x$. Then the length is $x + 3$ and the area condition reads $x(x + 3) = 40$, that is,",
    },
    { type: "math", latex: "x^2 + 3x - 40 = 0" },
    {
      type: "text",
      content:
        "The unknown appears squared, so neither \"move everything to one side and divide\" nor guessing is a reliable method. This chapter builds the complete toolkit for such equations: how to solve them, how to tell in advance what kind of roots they have, and how to reason about the roots without ever finding them.",
    },
    { type: "heading", text: "Standard form" },
    {
      type: "callout",
      variant: "definition",
      title: "Quadratic equation",
      content:
        "A **quadratic equation** in $x$ is one that can be written in the **standard form**\n\n$$ax^2 + bx + c = 0, \\qquad a \\ne 0,$$\n\nwhere $a, b, c$ are constants (real numbers until Chapter 2). A number $\\alpha$ with $a\\alpha^2 + b\\alpha + c = 0$ is a **root** (or solution) of the equation, and a **zero** of the expression $ax^2 + bx + c$.",
    },
    {
      type: "text",
      content:
        "The condition $a \\ne 0$ is what makes it quadratic: with $a = 0$ the equation collapses to the linear $bx + c = 0$. Always bring an equation to standard form before judging it. For example $(x + 1)(x - 2) = 3x$ is quadratic (it becomes $x^2 - 4x - 2 = 0$), but $(x - 1)^2 = x^2 + 2$ is not: the $x^2$ terms cancel and leave $-2x + 1 = 2$.",
    },
    { type: "heading", text: "Roots are where the parabola meets the x-axis" },
    {
      type: "text",
      content:
        "Every quadratic expression $f(x) = ax^2 + bx + c$ has a graph, the parabola $y = f(x)$. A root of $f(x) = 0$ is an $x$ at which the height $y$ is zero: a point where the parabola touches or crosses the x-axis. Below, $f(x) = x^2 - 2x - 3$ crosses at $x = -1$ and $x = 3$. Move the sliders and watch the roots move with the curve.",
    },
    {
      type: "interactive",
      config: {
        component: "cq-quadratic-explorer",
        readouts: ["roots", "factored"],
        showVertex: false,
        showAxis: false,
        caption:
          "The green dots are the roots: the $x$ where $y = 0$. Try $c = 1$ with $a = 1$, $b = -2$: the parabola just touches the axis. Raise $c$ further and it lifts clear off, so the equation has no real root at all.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: a parabola can meet a horizontal line at most twice. That is the geometric reason a quadratic equation has **at most two** roots. Sometimes it has two, sometimes one (the parabola just touches), sometimes none on the real line. Lesson 0.3 tells you which case you are in without drawing anything.",
    },
    { type: "heading", text: "The zero-product rule and factorising" },
    {
      type: "math",
      latex: "pq = 0 \\iff p = 0 \\text{ or } q = 0",
    },
    {
      type: "text",
      content:
        "This **zero-product rule** is the engine of factorising. If the quadratic splits as $a(x - \\alpha)(x - \\beta)$, setting it to zero forces one bracket to vanish, so the roots are $\\alpha$ and $\\beta$.\n\nTo factorise $ax^2 + bx + c$ by **splitting the middle term**, look for two numbers whose product is $ac$ and whose sum is $b$, split $bx$ into those two pieces, then group in pairs.",
    },
    {
      type: "worked-example",
      id: "cq0-1-we1",
      title: "Worked example 1: the garden",
      problem: "Solve $x^2 + 3x - 40 = 0$ and give the dimensions of the garden bed.",
      steps: [
        { text: "We need two numbers with product $ac = -40$ and sum $b = 3$: they are $8$ and $-5$." },
        { latex: "x^2 + 8x - 5x - 40 = x(x + 8) - 5(x + 8) = (x + 8)(x - 5)" },
        { text: "By the zero-product rule $x = -8$ or $x = 5$. *Why this step:* a width cannot be negative, so the context rejects $x = -8$ even though it is a perfectly good root of the equation." },
      ],
      answer: "Width 5 m, length 8 m (the equation's roots are $5$ and $-8$).",
    },
    {
      type: "worked-example",
      id: "cq0-1-we2",
      title: "Worked example 2: a leading coefficient that is not 1",
      problem: "Solve $6x^2 - x - 2 = 0$ by factorising.",
      steps: [
        { text: "Product $ac = 6 \\times (-2) = -12$, sum $b = -1$. The pair is $-4$ and $3$. *Why this step:* with $a \\ne 1$ we must use $ac$, not $c$, or the grouping will not work." },
        { latex: "6x^2 - 4x + 3x - 2 = 2x(3x - 2) + 1(3x - 2) = (2x + 1)(3x - 2)" },
        { text: "So $2x + 1 = 0$ or $3x - 2 = 0$." },
      ],
      answer: "$x = -\\tfrac12$ or $x = \\tfrac23$.",
    },
    {
      type: "worked-example",
      id: "cq0-1-we3",
      title: "Worked example 3: surds in the coefficients",
      problem: "Solve $x^2 - (1 + \\sqrt3)x + \\sqrt3 = 0$.",
      steps: [
        { text: "Look for two numbers with product $\\sqrt3$ and sum $1 + \\sqrt3$: they are $1$ and $\\sqrt3$." },
        { latex: "x^2 - x - \\sqrt3 x + \\sqrt3 = x(x - 1) - \\sqrt3(x - 1) = (x - 1)(x - \\sqrt3)" },
      ],
      answer: "$x = 1$ or $x = \\sqrt3$.",
    },
    { type: "heading", text: "At most two roots, unless it is an identity" },
    {
      type: "callout",
      variant: "info",
      title: "Three roots means all coefficients vanish",
      content:
        "If $ax^2 + bx + c = 0$ with $a \\ne 0$ had three distinct roots, its parabola would meet the x-axis three times, which is impossible. So if an equation of the form $ax^2 + bx + c = 0$ is satisfied by **three or more distinct** values of $x$, then $a = b = c = 0$ and the equation is an **identity**, true for every $x$.",
    },
    {
      type: "worked-example",
      id: "cq0-1-we4",
      title: "Worked example 4: when is it an identity?",
      problem:
        "For which real $a$ is $(a^2 - 1)x^2 + (a - 1)x + (a^2 - 4a + 3) = 0$ satisfied by every real $x$?",
      steps: [
        { text: "An identity needs all three coefficients to be zero at once." },
        { latex: "a^2 - 1 = 0 \\Rightarrow a = \\pm 1, \\qquad a - 1 = 0 \\Rightarrow a = 1, \\qquad a^2 - 4a + 3 = (a - 1)(a - 3) = 0 \\Rightarrow a = 1, 3" },
        { text: "The only value common to all three lists is $a = 1$." },
      ],
      answer: "$a = 1$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"divide both sides by x\"",
      content:
        "From $x^2 = 7x$ it is tempting to cancel $x$ and write $x = 7$. That division is only legal when $x \\ne 0$, so it silently throws away the root $x = 0$. Instead bring everything to one side and factorise: $x^2 - 7x = x(x - 7) = 0$, so $x = 0$ or $x = 7$. Never divide an equation by an expression that might be zero.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"(x − 2)(x − 3) = 6 means x − 2 = 6 or x − 3 = 6\"",
      content:
        "The zero-product rule works **only** with $0$ on the right. A product can equal $6$ in infinitely many ways ($2 \\times 3$, $12 \\times \\tfrac12$, ...). Expand first: $x^2 - 5x + 6 = 6$ gives $x^2 - 5x = 0$, so $x = 0$ or $x = 5$. Check: $(-2)(-3) = 6$ and $(3)(2) = 6$. The false method would give $x = 8$ or $x = 9$, neither of which works.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "cq0-1-q1",
      variant: "practice",
      question: "Find the positive root of $x^2 + 3x - 40 = 0$.",
      answer: 5,
      hint: "Find two numbers with product $-40$ and sum $3$.",
      solution: "$x^2 + 3x - 40 = (x + 8)(x - 5)$, so the roots are $-8$ and $5$. The positive one is $5$.",
      commonMistakes: [
        { answer: 8, feedback: "Sign slip: the factors are $(x + 8)(x - 5)$, so the roots are $-8$ and $+5$." },
        { answer: 40, feedback: "40 is the constant term, not a root. Factorise first." },
      ],
    },
    {
      type: "quiz",
      id: "cq0-1-q2",
      variant: "concept",
      question: "Which of these are quadratic equations in $x$? Select all that apply.",
      multiple: true,
      options: [
        { text: "$x^2 = 0$", correct: true, feedback: "Standard form $1\\cdot x^2 + 0x + 0 = 0$ with $a = 1 \\ne 0$. It has the single (double) root $0$." },
        { text: "$(x + 1)(x - 2) = 3x$", correct: true, feedback: "Expanding gives $x^2 - 4x - 2 = 0$, with $a = 1$." },
        { text: "$(x - 1)^2 = x^2 + 2$", feedback: "The $x^2$ terms cancel, leaving the linear $-2x + 1 = 2$." },
        { text: "$3x^2 - 2x = 3x^2 + 1$", feedback: "Again the $x^2$ terms cancel: $-2x = 1$ is linear." },
        { text: "$\\sqrt2\\, x^2 + \\pi x - 1 = 0$", correct: true, feedback: "Irrational coefficients are fine. All that matters is $a = \\sqrt2 \\ne 0$." },
      ],
      hint: "Bring every equation to the form $ax^2 + bx + c = 0$ and check whether the $x^2$ coefficient survives.",
    },
    {
      type: "quiz",
      id: "cq0-1-q3",
      variant: "concept",
      question: "Solve $x^2 = 7x$.",
      options: [
        { text: "$x = 7$", feedback: "You divided by $x$, which loses the root $x = 0$." },
        { text: "$x = 0$ or $x = 7$", correct: true, feedback: "$x^2 - 7x = x(x - 7) = 0$." },
        { text: "$x = 0$ only", feedback: "$x = 7$ also works: $49 = 49$." },
        { text: "$x = \\pm\\sqrt7$", feedback: "That would solve $x^2 = 7$, not $x^2 = 7x$." },
      ],
      hint: "Move everything to one side and factor out $x$. Do not divide by $x$.",
    },
    {
      type: "numeric",
      id: "cq0-1-q4",
      variant: "practice",
      question: "Find the larger root of $(x - 2)(x - 3) = 6$.",
      answer: 5,
      hint: "The right-hand side is not zero, so expand and rearrange first.",
      solution: "$x^2 - 5x + 6 = 6 \\Rightarrow x^2 - 5x = 0 \\Rightarrow x(x - 5) = 0$, so $x = 0$ or $x = 5$. The larger is $5$.",
      commonMistakes: [
        { answer: 9, feedback: "That comes from setting $x - 3 = 6$. The zero-product rule only works with $0$ on the right." },
        { answer: 8, feedback: "That comes from setting $x - 2 = 6$. Expand first: $x^2 - 5x = 0$." },
        { answer: 3, feedback: "$x = 3$ makes the left side $0$, not $6$." },
      ],
    },
    {
      type: "numeric",
      id: "cq0-1-q5",
      variant: "practice",
      question: "Factorise $6x^2 - 7x - 3$ and give the positive root of $6x^2 - 7x - 3 = 0$ as a decimal.",
      answer: 1.5,
      tolerance: 0.001,
      hint: "Split $-7x$ using two numbers with product $6 \\times (-3) = -18$ and sum $-7$.",
      solution: "The pair is $-9$ and $2$: $6x^2 - 9x + 2x - 3 = 3x(2x - 3) + (2x - 3) = (3x + 1)(2x - 3)$. Roots $-\\tfrac13$ and $\\tfrac32$.",
      commonMistakes: [
        { answer: -1.5, feedback: "Sign slip: $2x - 3 = 0$ gives $x = +\\tfrac32$." },
        { answer: 0.3333, tolerance: 0.01, feedback: "The root from $3x + 1 = 0$ is $-\\tfrac13$, which is negative." },
      ],
    },
    {
      type: "quiz",
      id: "cq0-1-q6",
      variant: "concept",
      question: "An equation of the form $ax^2 + bx + c = 0$ with real $a, b, c$ is known to be satisfied by $x = 1$, $x = 2$ and $x = 3$. What follows?",
      options: [
        { text: "$a = b = c = 0$: the equation is an identity", correct: true, feedback: "A genuine quadratic (or linear) equation has at most two roots, so three roots force every coefficient to vanish." },
        { text: "$a = 1$, $b = -6$, $c = 11$", feedback: "That is how you would build a cubic with roots 1, 2, 3, not a quadratic." },
        { text: "This is impossible, so no such equation exists", feedback: "It exists: $0x^2 + 0x + 0 = 0$ is satisfied by every $x$." },
        { text: "$a \\ne 0$ and $b^2 - 4ac > 0$", feedback: "With $a \\ne 0$ there would be at most two roots." },
      ],
      hint: "How many times can a parabola cross the x-axis?",
    },
    {
      type: "numeric",
      id: "cq0-1-q7",
      variant: "practice",
      question: "A rectangle has perimeter 34 cm and area 60 cm². Find the length of its diagonal in cm.",
      answer: 13,
      unit: "cm",
      hint: "If one side is $x$, the other is $17 - x$. Form the area equation.",
      solution: "$x(17 - x) = 60 \\Rightarrow x^2 - 17x + 60 = 0 \\Rightarrow (x - 5)(x - 12) = 0$. Sides 5 and 12, diagonal $\\sqrt{25 + 144} = 13$ cm.",
      commonMistakes: [
        { answer: 17, feedback: "17 is the semi-perimeter (sum of the sides). The diagonal is $\\sqrt{5^2 + 12^2}$." },
        { answer: 12, feedback: "12 is the longer side. The question asks for the diagonal." },
      ],
    },
    {
      type: "quiz",
      id: "cq0-1-q8",
      variant: "practice",
      question: "JEE Main. Which numbers are roots of $x^2 - (\\sqrt2 + \\sqrt3)x + \\sqrt6 = 0$? Select all that apply.",
      multiple: true,
      options: [
        { text: "$\\sqrt2$", correct: true, feedback: "$2 - (\\sqrt2 + \\sqrt3)\\sqrt2 + \\sqrt6 = 2 - 2 - \\sqrt6 + \\sqrt6 = 0$." },
        { text: "$\\sqrt3$", correct: true, feedback: "The equation factorises as $(x - \\sqrt2)(x - \\sqrt3) = 0$." },
        { text: "$-\\sqrt2$", feedback: "Both roots are positive here: their sum $\\sqrt2 + \\sqrt3$ and product $\\sqrt6$ are positive." },
        { text: "$\\sqrt6$", feedback: "$\\sqrt6$ is the product of the roots, not a root." },
      ],
      hint: "Look for two numbers whose product is $\\sqrt6$ and whose sum is $\\sqrt2 + \\sqrt3$.",
    },
    {
      type: "numeric",
      id: "cq0-1-q9",
      variant: "practice",
      question: "JEE Main. One root of $2x^2 + kx - 6 = 0$ is $2$. Find the other root.",
      answer: -1.5,
      tolerance: 0.001,
      hint: "Substitute $x = 2$ to find $k$, then solve the equation.",
      solution: "$8 + 2k - 6 = 0 \\Rightarrow k = -1$. Then $2x^2 - x - 6 = (2x + 3)(x - 2) = 0$, so the other root is $-\\tfrac32$.",
      commonMistakes: [
        { answer: 1.5, feedback: "Sign slip: $2x + 3 = 0$ gives $x = -\\tfrac32$." },
        { answer: -3, feedback: "The factor is $2x + 3$, so the root is $-\\tfrac32$, not $-3$." },
        { answer: -1, feedback: "$-1$ is the value of $k$, not the other root." },
      ],
    },
    {
      type: "quiz",
      id: "cq0-1-q10",
      variant: "mastery",
      question: "JEE Main. For which real $a$ is $(a^2 - 3a + 2)x^2 + (a^2 - 5a + 6)x + (a^2 - 4) = 0$ satisfied by more than two values of $x$?",
      options: [
        { text: "$a = 2$", correct: true, feedback: "$a^2 - 3a + 2 = (a-1)(a-2)$, $a^2 - 5a + 6 = (a-2)(a-3)$ and $a^2 - 4 = (a-2)(a+2)$ all vanish at $a = 2$, so the equation is an identity." },
        { text: "$a = 1$", feedback: "At $a = 1$ the $x^2$ term vanishes but the others give $2x - 3 = 0$, one root only." },
        { text: "$a = 3$", feedback: "At $a = 3$ the $x^2$ coefficient is $2 \\ne 0$." },
        { text: "No such $a$", feedback: "An identity is satisfied by every $x$. Look for an $a$ killing all three coefficients." },
      ],
      hint: "More than two roots means an identity: all three coefficients must be zero for the same $a$.",
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "completing-the-square-and-the-quadratic-formula",
  title: "0.2 · Completing the Square and the Quadratic Formula",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "Factorising works beautifully when the roots are nice numbers, and fails completely when they are not: try splitting the middle term of $x^2 - 4x - 1$. We need a method that never fails. It comes from an ancient picture.",
    },
    { type: "heading", text: "Completing the square, by picture" },
    {
      type: "text",
      content:
        "Read $x^2 + 6x$ as an area: an $x$ by $x$ square plus a $6$ by $x$ strip. Cut the strip into two $3$ by $x$ pieces and glue one to the right side and one to the top of the square. The shape is now an $(x + 3)$ by $(x + 3)$ square with a $3$ by $3$ corner missing. Adding $9$ **completes the square**:",
    },
    { type: "math", latex: "x^2 + 6x + 9 = (x + 3)^2" },
    {
      type: "text",
      content:
        "So $x^2 + 6x = 16$ becomes $(x + 3)^2 = 25$, giving $x + 3 = \\pm 5$, that is $x = 2$ or $x = -8$. The rule: for $x^2 + px$, add $\\left(\\tfrac{p}{2}\\right)^2$, the square of **half** the coefficient of $x$.",
    },
    {
      type: "worked-example",
      id: "cq0-2-we1",
      title: "Worked example 1: roots that will not factorise",
      problem: "Solve $x^2 - 4x - 1 = 0$.",
      steps: [
        { text: "Move the constant: $x^2 - 4x = 1$." },
        { text: "Half of $-4$ is $-2$, and $(-2)^2 = 4$. Add $4$ to both sides. *Why this step:* the left side becomes a perfect square, so one square root finishes the job." },
        { latex: "x^2 - 4x + 4 = 5 \\Rightarrow (x - 2)^2 = 5 \\Rightarrow x - 2 = \\pm\\sqrt5" },
      ],
      answer: "$x = 2 \\pm \\sqrt5$.",
    },
    {
      type: "worked-example",
      id: "cq0-2-we2",
      title: "Worked example 2: leading coefficient 2",
      problem: "Solve $2x^2 + 3x - 5 = 0$ by completing the square.",
      steps: [
        { text: "Divide by $2$ first. *Why this step:* the trick needs $x^2$ with coefficient $1$." },
        { latex: "x^2 + \\tfrac32 x = \\tfrac52" },
        { text: "Half of $\\tfrac32$ is $\\tfrac34$, so add $\\tfrac{9}{16}$:" },
        { latex: "\\left(x + \\tfrac34\\right)^2 = \\tfrac52 + \\tfrac9{16} = \\tfrac{49}{16} \\Rightarrow x + \\tfrac34 = \\pm\\tfrac74" },
      ],
      answer: "$x = 1$ or $x = -\\tfrac52$.",
    },
    { type: "heading", text: "Deriving the quadratic formula" },
    {
      type: "text",
      content:
        "Now do exactly the same moves with letters. Start from $ax^2 + bx + c = 0$ with $a \\ne 0$:",
    },
    {
      type: "math",
      latex:
        "\\begin{aligned} x^2 + \\frac{b}{a}x &= -\\frac{c}{a} \\\\ x^2 + \\frac{b}{a}x + \\frac{b^2}{4a^2} &= \\frac{b^2}{4a^2} - \\frac{c}{a} \\\\ \\left(x + \\frac{b}{2a}\\right)^2 &= \\frac{b^2 - 4ac}{4a^2} \\\\ x + \\frac{b}{2a} &= \\pm\\frac{\\sqrt{b^2 - 4ac}}{2a} \\end{aligned}",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The quadratic formula",
      content:
        "The roots of $ax^2 + bx + c = 0$ ($a \\ne 0$) are\n\n$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}.$$\n\nIn the last line of the derivation, $\\sqrt{4a^2} = 2\\lvert a\\rvert$, but the $\\pm$ already covers both signs, so $2a$ is correct whether $a$ is positive or negative.",
    },
    { type: "heading", text: "Vertex form" },
    {
      type: "text",
      content:
        "The third line of the derivation, multiplied back by $a$, rewrites the quadratic itself in **vertex form**:",
    },
    {
      type: "math",
      latex: "ax^2 + bx + c = a\\left(x + \\frac{b}{2a}\\right)^2 - \\frac{b^2 - 4ac}{4a} = a(x - h)^2 + k, \\quad h = -\\frac{b}{2a},\\ k = -\\frac{b^2 - 4ac}{4a}",
    },
    {
      type: "text",
      content:
        "So every parabola is the graph of $y = x^2$ stretched by $a$ and slid so its vertex sits at $(h, k)$. The roots sit symmetrically on either side of $x = h$, at distance $\\frac{\\sqrt{b^2 - 4ac}}{2\\lvert a\\rvert}$. Check this live: the explorer shows the vertex, the axis of symmetry and the roots.",
    },
    {
      type: "interactive",
      config: {
        component: "cq-quadratic-explorer",
        a: { min: -3, max: 3, step: 0.5, initial: 1 },
        b: { min: -6, max: 6, step: 0.5, initial: -4 },
        c: { min: -6, max: 6, step: 0.5, initial: -1 },
        readouts: ["roots", "vertex", "factored", "range"],
        caption:
          "Start at $x^2 - 4x - 1$: vertex $(2, -5)$, roots $2 \\pm \\sqrt5$. The dashed line $x = -\\tfrac{b}{2a}$ always sits exactly halfway between the roots.",
      },
    },
    {
      type: "worked-example",
      id: "cq0-2-we3",
      title: "Worked example 3: straight from the formula",
      problem: "Solve $3x^2 - 5x + 1 = 0$.",
      steps: [
        { text: "Here $a = 3$, $b = -5$, $c = 1$, so $b^2 - 4ac = 25 - 12 = 13$." },
        { latex: "x = \\frac{-(-5) \\pm \\sqrt{13}}{2 \\cdot 3} = \\frac{5 \\pm \\sqrt{13}}{6}" },
      ],
      answer: "$x = \\dfrac{5 \\pm \\sqrt{13}}{6}$, approximately $1.434$ and $0.232$.",
    },
    {
      type: "worked-example",
      id: "cq0-2-we4",
      title: "Worked example 4: surd coefficients",
      problem: "Solve $x^2 - 2\\sqrt3\\, x - 1 = 0$.",
      steps: [
        { text: "$b^2 - 4ac = 12 + 4 = 16$, a perfect square, so the root simplifies nicely." },
        { latex: "x = \\frac{2\\sqrt3 \\pm 4}{2} = \\sqrt3 \\pm 2" },
      ],
      answer: "$x = \\sqrt3 + 2$ or $x = \\sqrt3 - 2$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"add the square of half of b\" when a ≠ 1",
      content:
        "For $2x^2 + 8x$ adding $16$ does **not** complete a square: $2x^2 + 8x + 16$ is not a perfect square. First factor out (or divide by) $a$: $2(x^2 + 4x) = 2\\big((x + 2)^2 - 4\\big)$. The same slip in the formula is writing $\\frac{-b \\pm \\sqrt{D}}{2}$: the denominator is $2a$, always.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "cq0-2-q1",
      variant: "practice",
      question: "What number must be added to $x^2 - 10x$ to make it a perfect square?",
      answer: 25,
      hint: "Add the square of half the coefficient of $x$.",
      solution: "Half of $-10$ is $-5$, and $(-5)^2 = 25$: $x^2 - 10x + 25 = (x - 5)^2$.",
      commonMistakes: [
        { answer: 100, feedback: "That squares the whole coefficient. Use half of it: $(-5)^2 = 25$." },
        { answer: 5, feedback: "5 is half the coefficient; you still need to square it." },
      ],
    },
    {
      type: "quiz",
      id: "cq0-2-q2",
      variant: "practice",
      question: "Completing the square on $x^2 + 8x + 3 = 0$ gives",
      options: [
        { text: "$(x + 4)^2 = 13$", correct: true, feedback: "$x^2 + 8x + 16 = 13$, since we added $16$ to both sides of $x^2 + 8x = -3$." },
        { text: "$(x + 4)^2 = 19$", feedback: "Moving $3$ across gives $-3$, so the right side is $-3 + 16 = 13$." },
        { text: "$(x + 8)^2 = 61$", feedback: "Use half the coefficient: $(x + 4)^2$, not $(x + 8)^2$." },
        { text: "$(x - 4)^2 = 13$", feedback: "The sign inside the bracket matches the sign of the $x$ term: $+8x$ gives $x + 4$." },
      ],
      hint: "Write $x^2 + 8x = -3$, then add $\\left(\\tfrac82\\right)^2$ to both sides.",
    },
    {
      type: "numeric",
      id: "cq0-2-q3",
      variant: "practice",
      question: "Find the larger root of $x^2 - 4x - 1 = 0$, correct to two decimal places.",
      answer: 4.236,
      tolerance: 0.01,
      hint: "Complete the square: $(x - 2)^2 = 5$.",
      solution: "$x = 2 \\pm \\sqrt5$, and $2 + \\sqrt5 \\approx 4.24$.",
      commonMistakes: [
        { answer: -0.236, tolerance: 0.01, feedback: "That is the smaller root $2 - \\sqrt5$." },
        { answer: 2.236, tolerance: 0.01, feedback: "That is $\\sqrt5$ alone; add the $2$ from $(x - 2)^2$." },
      ],
    },
    {
      type: "quiz",
      id: "cq0-2-q4",
      variant: "practice",
      question: "The roots of $2x^2 - 4x + 1 = 0$ are",
      options: [
        { text: "$1 \\pm \\dfrac{\\sqrt2}{2}$", correct: true, feedback: "$x = \\frac{4 \\pm \\sqrt{16 - 8}}{4} = \\frac{4 \\pm 2\\sqrt2}{4} = 1 \\pm \\frac{\\sqrt2}{2}$." },
        { text: "$2 \\pm \\sqrt2$", feedback: "That divides by $2$ instead of $2a = 4$." },
        { text: "$1 \\pm \\sqrt2$", feedback: "$\\sqrt8 = 2\\sqrt2$, and $\\frac{2\\sqrt2}{4} = \\frac{\\sqrt2}{2}$, not $\\sqrt2$." },
        { text: "$-1 \\pm \\dfrac{\\sqrt2}{2}$", feedback: "The formula starts with $-b = +4$, so the roots are centred at $+1$." },
      ],
      hint: "Use $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$ with $a = 2$, $b = -4$, $c = 1$.",
    },
    {
      type: "numeric",
      id: "cq0-2-q5",
      variant: "practice",
      question: "Write $2x^2 - 12x + 7$ in the form $a(x - h)^2 + k$. What is $k$?",
      answer: -11,
      hint: "Factor $2$ out of the first two terms: $2(x^2 - 6x) + 7$.",
      solution: "$2(x^2 - 6x) + 7 = 2\\big((x - 3)^2 - 9\\big) + 7 = 2(x - 3)^2 - 11$. Check with $k = -\\frac{D}{4a} = -\\frac{144 - 56}{8} = -11$.",
      commonMistakes: [
        { answer: -2, feedback: "You subtracted $9$ but forgot it is multiplied by the factor $2$: $2 \\times 9 = 18$." },
        { answer: -29, feedback: "You subtracted $36$. Inside the bracket you add and subtract $9$, which becomes $18$ outside." },
      ],
    },
    {
      type: "quiz",
      id: "cq0-2-q6",
      variant: "concept",
      question: "Which statements about $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$ are true? Select all that apply.",
      multiple: true,
      options: [
        { text: "It works for any $a \\ne 0$, including negative $a$", correct: true, feedback: "The $\\pm$ absorbs the sign of $\\sqrt{4a^2} = 2\\lvert a\\rvert$, so no sign assumption is needed." },
        { text: "It needs $a > 0$", feedback: "No: the derivation divides by $a$, which only needs $a \\ne 0$." },
        { text: "When $b = 0$ it gives $x = \\pm\\sqrt{-c/a}$", correct: true, feedback: "$x = \\frac{\\pm\\sqrt{-4ac}}{2a} = \\pm\\sqrt{\\frac{-4ac}{4a^2}} = \\pm\\sqrt{-c/a}$." },
        { text: "When $c \\ne 0$ the same roots are $x = \\frac{2c}{-b \\mp \\sqrt{b^2 - 4ac}}$", correct: true, feedback: "Multiply top and bottom of the formula by $-b \\mp \\sqrt{D}$: the numerator becomes $b^2 - D = 4ac$." },
      ],
      hint: "Re-run the derivation and ask where each assumption is used. For the last option, rationalise the numerator.",
    },
    {
      type: "numeric",
      id: "cq0-2-q7",
      variant: "practice",
      question: "Find the least value of $x^2 - 6x + 11$ over all real $x$.",
      answer: 2,
      hint: "Complete the square; a square is never negative.",
      solution: "$x^2 - 6x + 11 = (x - 3)^2 + 2 \\ge 2$, with equality at $x = 3$.",
      commonMistakes: [
        { answer: 3, feedback: "3 is where the minimum occurs, not the minimum value." },
        { answer: 11, feedback: "11 is the value at $x = 0$; the minimum is at the vertex $x = 3$." },
      ],
    },
    {
      type: "numeric",
      id: "cq0-2-q8",
      variant: "practice",
      question: "Find the positive root of $x^2 - 2\\sqrt2\\, x - 6 = 0$, correct to two decimal places.",
      answer: 4.2426,
      tolerance: 0.01,
      hint: "$b^2 - 4ac = 8 + 24 = 32$, and $\\sqrt{32} = 4\\sqrt2$.",
      solution: "$x = \\frac{2\\sqrt2 \\pm 4\\sqrt2}{2} = 3\\sqrt2$ or $-\\sqrt2$. The positive root is $3\\sqrt2 \\approx 4.24$.",
      commonMistakes: [
        { answer: 1.414, tolerance: 0.01, feedback: "The roots are $3\\sqrt2$ and $-\\sqrt2$; you took $+\\sqrt2$." },
        { answer: 8.485, tolerance: 0.01, feedback: "You forgot to divide by $2a = 2$." },
      ],
    },
    {
      type: "quiz",
      id: "cq0-2-q9",
      variant: "practice",
      question: "JEE Main. For real $a \\ne b$, the roots of $(a - b)x^2 + (b - c)x + (c - a) = 0$ are",
      options: [
        { text: "$1$ and $\\dfrac{c - a}{a - b}$", correct: true, feedback: "The coefficients add to zero, so $x = 1$ is a root, and the product of roots is $\\frac{c - a}{a - b}$." },
        { text: "$1$ and $\\dfrac{a - b}{c - a}$", feedback: "That is the reciprocal of the second root." },
        { text: "$-1$ and $\\dfrac{c - a}{a - b}$", feedback: "Substitute $x = -1$: $(a - b) - (b - c) + (c - a) = 2c - 2b$, not zero in general." },
        { text: "$1$ and $\\dfrac{b - c}{a - b}$", feedback: "$\\frac{b - c}{a - b}$ is minus the sum of the roots." },
      ],
      hint: "Add the three coefficients. What does it mean if they sum to zero?",
    },
    {
      type: "numeric",
      id: "cq0-2-q10",
      variant: "mastery",
      question: "JEE Main. $x = 2 + \\sqrt3$ is a root of $x^2 - 4x + 1 = 0$. Find $x^2 + \\dfrac{1}{x^2}$.",
      answer: 14,
      hint: "Divide the equation by $x$ to get $x + \\frac1x$, then square.",
      solution: "$x^2 - 4x + 1 = 0 \\Rightarrow x + \\frac1x = 4$. Squaring: $x^2 + 2 + \\frac1{x^2} = 16$, so $x^2 + \\frac{1}{x^2} = 14$.",
      commonMistakes: [
        { answer: 16, feedback: "$\\left(x + \\frac1x\\right)^2 = x^2 + 2 + \\frac1{x^2}$: subtract the $2$." },
        { answer: 18, feedback: "The middle term $2 \\cdot x \\cdot \\frac1x = 2$ must be subtracted, not added." },
      ],
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "the-discriminant-and-the-nature-of-roots",
  title: "0.3 · The Discriminant and the Nature of Roots",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "Look again at the formula $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$. Everything in it is ordinary arithmetic except one square root. Whether that square root is positive, zero or impossible (over the reals) decides what kind of roots you get, and you can find out before solving anything.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Discriminant",
      content:
        "The **discriminant** of $ax^2 + bx + c = 0$ is $D = b^2 - 4ac$. It \"discriminates\" between the possible kinds of roots. When $b$ is even, $b = 2b'$, it is often quicker to use $\\frac{D}{4} = b'^2 - ac$, which has the same sign.",
    },
    { type: "heading", text: "Three cases, three pictures" },
    {
      type: "table",
      headers: ["Discriminant", "Roots", "Parabola $y = ax^2 + bx + c$"],
      rows: [
        ["$D > 0$", "two distinct real roots $\\frac{-b \\pm \\sqrt D}{2a}$", "crosses the x-axis twice"],
        ["$D = 0$", "two equal real roots $x = -\\frac{b}{2a}$", "touches the x-axis at its vertex"],
        ["$D < 0$", "no real roots (a pair of complex conjugate roots, Chapter 2)", "misses the x-axis entirely"],
      ],
    },
    {
      type: "text",
      content:
        "The picture explains the table. The vertex sits at height $-\\frac{D}{4a}$. With $a > 0$ the parabola opens upwards, so it reaches the axis exactly when its lowest point is at or below it, that is when $-\\frac{D}{4a} \\le 0$, that is when $D \\ge 0$. Slide $c$ in $x^2 - 4x + c$ and watch the case change at $c = 4$.",
    },
    {
      type: "interactive",
      config: {
        component: "cq-quadratic-explorer",
        a: { min: -2, max: 2, step: 0.5, initial: 1 },
        b: { min: -6, max: 6, step: 0.5, initial: -4 },
        c: { min: -2, max: 8, step: 0.5, initial: 3 },
        readouts: ["discriminant", "roots", "vertex"],
        caption:
          "With $a = 1$, $b = -4$: $c = 3$ gives $D = 4 > 0$ (roots 1 and 3), $c = 4$ gives $D = 0$ (a double root at 2), and $c = 5$ gives $D = -4 < 0$ (roots $2 \\pm i$, no crossing).",
      },
    },
    { type: "heading", text: "Rational or irrational roots" },
    {
      type: "text",
      content:
        "Suppose now that $a, b, c$ are **rational** (for instance integers). Then $-b$ and $2a$ are rational, so the roots are rational exactly when $\\sqrt D$ is rational, that is when $D$ is the square of a rational number.",
    },
    {
      type: "table",
      headers: ["$a, b, c$ rational and ...", "Roots"],
      rows: [
        ["$D > 0$ and a perfect square", "rational and distinct"],
        ["$D > 0$, not a perfect square", "irrational, a conjugate pair $p + \\sqrt q$ and $p - \\sqrt q$"],
        ["$D = 0$", "rational and equal"],
        ["$D < 0$", "non-real, a conjugate pair $p + iq$ and $p - iq$"],
      ],
    },
    {
      type: "callout",
      variant: "info",
      title: "Irrational roots come in conjugate pairs",
      content:
        "With rational coefficients the two roots are $\\frac{-b + \\sqrt D}{2a}$ and $\\frac{-b - \\sqrt D}{2a}$: they differ only in the sign of the surd. So if $2 + \\sqrt3$ is a root of a quadratic with rational coefficients, $2 - \\sqrt3$ is the other root.",
    },
    {
      type: "worked-example",
      id: "cq0-3-we1",
      title: "Worked example 1: the conjugate partner",
      problem: "$2 + \\sqrt3$ is a root of $x^2 + bx + c = 0$ with $b, c$ rational. Find $b$ and $c$.",
      steps: [
        { text: "Rational coefficients force the other root to be $2 - \\sqrt3$." },
        { latex: "(x - 2 - \\sqrt3)(x - 2 + \\sqrt3) = (x - 2)^2 - 3 = x^2 - 4x + 1" },
      ],
      answer: "$b = -4$, $c = 1$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"D ≥ 0 means rational roots\"",
      content:
        "$D \\ge 0$ only guarantees **real** roots. $x^2 - 6x + 7 = 0$ has $D = 8$, so its roots $3 \\pm \\sqrt2$ are real but irrational. And the perfect-square test only applies to **rational** coefficients: $x^2 - 2\\sqrt2\\, x + 2 = 0$ has $D = 0$, yet its double root is $\\sqrt2$. Likewise the conjugate-pair rule fails for irrational coefficients: $x^2 - (1 + \\sqrt2)x + \\sqrt2 = 0$ has roots $1$ and $\\sqrt2$, and $-\\sqrt2$ is nowhere to be seen.",
    },
    { type: "heading", text: "Parameter problems" },
    {
      type: "text",
      content:
        "The workhorse JEE question gives a quadratic with a parameter and asks for which values its roots are equal, real or non-real. Translate the condition into an equation or inequality in $D$ and solve that.",
    },
    {
      type: "worked-example",
      id: "cq0-3-we2",
      title: "Worked example 2: equal roots",
      problem: "Find $k$ so that $x^2 - 2(k + 1)x + k^2 + 4 = 0$ has equal roots.",
      steps: [
        { text: "$b = -2(k + 1)$ is even, so use $\\frac D4 = b'^2 - ac$ with $b' = -(k + 1)$." },
        { latex: "\\frac D4 = (k + 1)^2 - (k^2 + 4) = 2k - 3" },
        { text: "Equal roots need $D = 0$." },
      ],
      answer: "$k = \\tfrac32$ (the equation is then $x^2 - 5x + \\tfrac{25}{4} = 0$, with double root $\\tfrac52$).",
    },
    {
      type: "worked-example",
      id: "cq0-3-we3",
      title: "Worked example 3: real roots, and the case a = 0",
      problem: "For which real $k$ does $kx^2 + 4x + 1 = 0$ have real roots?",
      steps: [
        { text: "If $k \\ne 0$ the equation is quadratic and needs $D = 16 - 4k \\ge 0$, i.e. $k \\le 4$." },
        { text: "If $k = 0$ the equation is $4x + 1 = 0$, with the real root $-\\tfrac14$. *Why this step:* the discriminant test only applies when the $x^2$ coefficient is non-zero, so $k = 0$ must be checked separately." },
      ],
      answer: "All $k \\le 4$ (with $k = 0$ giving a linear equation). If the question demands a quadratic, the answer is $k \\le 4$, $k \\ne 0$.",
    },
    {
      type: "worked-example",
      id: "cq0-3-we4",
      title: "Worked example 4: always real",
      problem: "Show that the roots of $(x - a)(x - b) = h^2$ are real for all real $a, b, h$.",
      steps: [
        { text: "Standard form: $x^2 - (a + b)x + (ab - h^2) = 0$." },
        { latex: "D = (a + b)^2 - 4(ab - h^2) = (a - b)^2 + 4h^2 \\ge 0" },
        { text: "A sum of squares is never negative, and it is zero only when $a = b$ and $h = 0$." },
      ],
      answer: "The roots are always real, and equal only when $a = b$ and $h = 0$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "cq0-3-q1",
      variant: "practice",
      question: "What is the nature of the roots of $2x^2 - 3x + 5 = 0$?",
      options: [
        { text: "No real roots", correct: true, feedback: "$D = 9 - 40 = -31 < 0$." },
        { text: "Two distinct real roots", feedback: "Compute $D = b^2 - 4ac = 9 - 40$. It is negative." },
        { text: "Two equal real roots", feedback: "That needs $D = 0$, but $D = -31$." },
        { text: "Two distinct rational roots", feedback: "Rational roots need $D$ to be a non-negative perfect square." },
      ],
      hint: "Compute $D = b^2 - 4ac$ and look at its sign.",
    },
    {
      type: "numeric",
      id: "cq0-3-q2",
      variant: "practice",
      question: "Find the discriminant of $3x^2 - 7x + 2 = 0$.",
      answer: 25,
      hint: "$D = b^2 - 4ac$ with $b = -7$.",
      solution: "$D = (-7)^2 - 4(3)(2) = 49 - 24 = 25$, a perfect square, so the roots ($2$ and $\\tfrac13$) are rational.",
      commonMistakes: [
        { answer: 73, feedback: "It is $b^2 \\mathbf{-} 4ac$: $49 - 24$." },
        { answer: -25, feedback: "$(-7)^2 = +49$; squaring removes the sign." },
      ],
    },
    {
      type: "quiz",
      id: "cq0-3-q3",
      variant: "practice",
      question: "The roots of $x^2 - 6x + 7 = 0$ are",
      options: [
        { text: "real, distinct and irrational", correct: true, feedback: "$D = 36 - 28 = 8 > 0$ but not a perfect square: $x = 3 \\pm \\sqrt2$." },
        { text: "real, distinct and rational", feedback: "$D = 8$ is not a perfect square." },
        { text: "real and equal", feedback: "$D = 8 \\ne 0$." },
        { text: "non-real", feedback: "$D = 8 > 0$." },
      ],
      hint: "Find $D$, then ask whether it is a perfect square.",
    },
    {
      type: "numeric",
      id: "cq0-3-q4",
      variant: "practice",
      question: "For which positive value of $k$ does $x^2 - kx + 9 = 0$ have equal roots?",
      answer: 6,
      hint: "Equal roots: $D = k^2 - 36 = 0$.",
      solution: "$k^2 = 36$, so $k = \\pm 6$; the positive value is $6$ (double root $x = 3$).",
      commonMistakes: [
        { answer: 3, feedback: "3 is the double root, not $k$." },
        { answer: 36, feedback: "$k^2 = 36$, so $k = 6$." },
      ],
    },
    {
      type: "quiz",
      id: "cq0-3-q5",
      variant: "concept",
      question: "Which equations have rational roots? Select all that apply.",
      multiple: true,
      options: [
        { text: "$6x^2 - x - 2 = 0$", correct: true, feedback: "$D = 1 + 48 = 49 = 7^2$: roots $\\tfrac23$ and $-\\tfrac12$." },
        { text: "$x^2 - 5x + 3 = 0$", feedback: "$D = 13$, not a perfect square." },
        { text: "$4x^2 - 12x + 9 = 0$", correct: true, feedback: "$D = 0$: double root $\\tfrac32$, rational." },
        { text: "$x^2 + x + 1 = 0$", feedback: "$D = -3$: no real roots at all." },
        { text: "$x^2 - 2\\sqrt2\\, x + 2 = 0$", feedback: "$D = 0$, but the coefficients are irrational: the double root is $\\sqrt2$." },
      ],
      hint: "The perfect-square test needs rational coefficients. Check that first.",
    },
    {
      type: "numeric",
      id: "cq0-3-q6",
      variant: "practice",
      question: "Find the greatest integer $k$ for which $x^2 + 4x + k = 0$ has two distinct real roots.",
      answer: 3,
      hint: "Distinct real roots need $D > 0$, strictly.",
      solution: "$D = 16 - 4k > 0 \\Rightarrow k < 4$. The greatest integer is $3$.",
      commonMistakes: [
        { answer: 4, feedback: "At $k = 4$, $D = 0$: the roots are equal, not distinct." },
        { answer: -4, feedback: "Solve $16 - 4k > 0$: it gives $k < 4$, not $k < -4$." },
      ],
    },
    {
      type: "quiz",
      id: "cq0-3-q7",
      variant: "practice",
      question: "$3 - \\sqrt5$ is a root of $x^2 + px + q = 0$ with $p, q$ rational. Then $(p, q) =$",
      options: [
        { text: "$(-6, 4)$", correct: true, feedback: "Partner root $3 + \\sqrt5$: sum $6 = -p$, product $9 - 5 = 4 = q$." },
        { text: "$(6, 4)$", feedback: "The sum of roots is $-p$, so $p = -6$." },
        { text: "$(-6, 14)$", feedback: "$(3 - \\sqrt5)(3 + \\sqrt5) = 9 - 5 = 4$, not $9 + 5$." },
        { text: "$(-3, 4)$", feedback: "The sum of the two roots is $6$, not $3$." },
      ],
      hint: "With rational coefficients the other root is the conjugate surd $3 + \\sqrt5$.",
    },
    {
      type: "quiz",
      id: "cq0-3-q8",
      variant: "practice",
      question: "JEE Main. The number of integers $m$ for which $(1 + m^2)x^2 - 2(1 + 3m)x + (1 + 8m) = 0$ has no real root is",
      options: [
        { text: "infinitely many", correct: true, feedback: "$\\frac D4 = (1 + 3m)^2 - (1 + m^2)(1 + 8m) = -2m(2m - 1)^2$, which is negative for every integer $m \\ge 1$." },
        { text: "0", feedback: "Try $m = 1$: $\\frac D4 = -2 < 0$, so there is at least one." },
        { text: "1", feedback: "$m = 2$ also works ($\\frac D4 = -36$), and so does every larger integer." },
        { text: "2", feedback: "Every integer $m \\ge 1$ works." },
      ],
      hint: "Expand $\\frac D4$ carefully and factorise: it simplifies to $-2m(2m - 1)^2$.",
    },
    {
      type: "quiz",
      id: "cq0-3-q9",
      variant: "practice",
      question: "If $a, b, c$ are real, $a \\ne 0$ and $a + b + c = 0$, then the roots of $ax^2 + bx + c = 0$ are",
      options: [
        { text: "always real", correct: true, feedback: "$b = -(a + c)$ gives $D = (a + c)^2 - 4ac = (a - c)^2 \\ge 0$. In fact $x = 1$ is a root." },
        { text: "always non-real", feedback: "$x = 1$ satisfies the equation, since $a + b + c = 0$." },
        { text: "always equal", feedback: "Only when $a = c$." },
        { text: "real only when $b > 0$", feedback: "$D = (a - c)^2 \\ge 0$ whatever the sign of $b$." },
      ],
      hint: "Substitute $b = -(a + c)$ into $D$. Or try $x = 1$.",
    },
    {
      type: "quiz",
      id: "cq0-3-q10",
      variant: "mastery",
      question: "JEE Advanced. For real $a, b, c$, consider $(x - a)(x - b) + (x - b)(x - c) + (x - c)(x - a) = 0$. Which statements are true? Select all that apply.",
      multiple: true,
      options: [
        { text: "Its roots are always real", correct: true, feedback: "It is $3x^2 - 2(a + b + c)x + (ab + bc + ca) = 0$ with $\\frac D4 = a^2 + b^2 + c^2 - ab - bc - ca = \\tfrac12\\big[(a - b)^2 + (b - c)^2 + (c - a)^2\\big] \\ge 0$." },
        { text: "Its roots are equal if and only if $a = b = c$", correct: true, feedback: "The sum of three squares is zero only when every bracket is zero." },
        { text: "It can have non-real roots when $a, b, c$ are distinct", feedback: "$D \\ge 0$ always, so the roots are always real." },
        { text: "$x = a$ is always a root", feedback: "At $x = a$ only the middle product survives: $(a - b)(a - c)$, which is non-zero for distinct $a, b, c$." },
      ],
      hint: "Expand to standard form and write $\\frac D4$ as half a sum of three squares.",
    },
    {
      type: "numeric",
      id: "cq0-3-q11",
      variant: "mastery",
      question: "JEE Main. Find the positive value of $k$ for which $(k - 2)x^2 + 8x + k + 4 = 0$ has equal roots.",
      answer: 4,
      hint: "Use $\\frac D4 = 16 - (k - 2)(k + 4) = 0$.",
      solution: "$16 - (k^2 + 2k - 8) = 0 \\Rightarrow k^2 + 2k - 24 = 0 \\Rightarrow (k + 6)(k - 4) = 0$. The positive value is $k = 4$ (then $2x^2 + 8x + 8 = 0$, double root $-2$).",
      commonMistakes: [
        { answer: 6, feedback: "Sign slip in the factors: $k^2 + 2k - 24 = (k + 6)(k - 4)$." },
        { answer: 2, feedback: "$k = 2$ kills the $x^2$ term, leaving a linear equation." },
      ],
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "sum-and-product-of-roots",
  title: "0.4 · Sum and Product of Roots",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "The roots of $2x^2 - 7x + 3 = 0$ are $3$ and $\\tfrac12$. Their sum is $\\tfrac72$ and their product is $\\tfrac32$. Now look at the coefficients: $-\\frac{b}{a} = \\frac72$ and $\\frac{c}{a} = \\frac32$. That is no coincidence, and it lets you know the sum and product of the roots of **any** quadratic without solving it.",
    },
    { type: "heading", text: "Vieta's relations from the factored form" },
    {
      type: "text",
      content:
        "If $\\alpha$ and $\\beta$ are the roots of $ax^2 + bx + c = 0$, the quadratic factorises as $a(x - \\alpha)(x - \\beta)$. Expand and compare coefficients:",
    },
    {
      type: "math",
      latex: "a(x - \\alpha)(x - \\beta) = ax^2 - a(\\alpha + \\beta)x + a\\alpha\\beta \\equiv ax^2 + bx + c",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Sum and product of roots (Vieta)",
      content:
        "For $ax^2 + bx + c = 0$ with roots $\\alpha, \\beta$:\n\n$$\\alpha + \\beta = -\\frac{b}{a}, \\qquad \\alpha\\beta = \\frac{c}{a}.$$\n\nThis holds for every quadratic, real or complex roots alike. A second check: adding the two roots from the formula, the $\\pm\\sqrt D$ parts cancel and leave $\\frac{-2b}{2a}$.",
    },
    {
      type: "interactive",
      config: {
        component: "cq-quadratic-explorer",
        a: { min: -3, max: 3, step: 0.5, initial: 2 },
        b: { min: -8, max: 8, step: 0.5, initial: -7 },
        c: { min: -6, max: 6, step: 0.5, initial: 3 },
        readouts: ["roots", "sum-product", "factored"],
        caption:
          "Compare the roots with the readouts for $\\alpha + \\beta$ and $\\alpha\\beta$. Push $c$ up until $D < 0$: the roots turn complex, but the sum and product stay real and keep obeying Vieta.",
      },
    },
    { type: "heading", text: "Forming an equation from its roots" },
    {
      type: "text",
      content:
        "Read Vieta backwards. Dividing $ax^2 + bx + c = 0$ by $a$ gives $x^2 - (\\alpha + \\beta)x + \\alpha\\beta = 0$. So the quadratic with given roots is",
    },
    { type: "math", latex: "x^2 - (\\text{sum of roots})\\,x + (\\text{product of roots}) = 0" },
    {
      type: "worked-example",
      id: "cq0-4-we1",
      title: "Worked example 1: surd roots",
      problem: "Form the quadratic equation whose roots are $2 + \\sqrt3$ and $2 - \\sqrt3$.",
      steps: [
        { text: "Sum $= 4$, product $= 4 - 3 = 1$." },
        { latex: "x^2 - 4x + 1 = 0" },
      ],
      answer: "$x^2 - 4x + 1 = 0$.",
    },
    {
      type: "worked-example",
      id: "cq0-4-we2",
      title: "Worked example 2: integer coefficients",
      problem: "Form the quadratic with integer coefficients whose roots are $\\tfrac32$ and $-\\tfrac13$.",
      steps: [
        { text: "Sum $= \\tfrac32 - \\tfrac13 = \\tfrac76$, product $= -\\tfrac12$." },
        { text: "$x^2 - \\tfrac76 x - \\tfrac12 = 0$. Multiply by $6$. *Why this step:* scaling an equation by a non-zero constant does not change its roots." },
      ],
      answer: "$6x^2 - 7x - 3 = 0$.",
    },
    { type: "heading", text: "Conditions on the roots" },
    {
      type: "text",
      content:
        "Many problems describe the roots indirectly: in a given ratio, one the square of the other, differing by a constant. Name the roots so that the condition is built in, then apply Vieta.",
    },
    {
      type: "worked-example",
      id: "cq0-4-we3",
      title: "Worked example 3: roots in a ratio",
      problem: "The roots of $x^2 - 5x + k = 0$ are in the ratio $2 : 3$. Find $k$.",
      steps: [
        { text: "Let the roots be $2t$ and $3t$. *Why this step:* this naming makes the ratio automatic, leaving one unknown $t$." },
        { text: "Sum: $5t = 5$, so $t = 1$ and the roots are $2$ and $3$." },
        { text: "Product: $k = 2 \\times 3 = 6$." },
      ],
      answer: "$k = 6$.",
    },
    {
      type: "worked-example",
      id: "cq0-4-we4",
      title: "Worked example 4: one root the square of the other",
      problem: "One root of $x^2 - 6x + k = 0$ is the square of the other. Find all possible $k$. Then find the general condition on $a, b, c$ for $ax^2 + bx + c = 0$.",
      steps: [
        { text: "Let the roots be $\\alpha$ and $\\alpha^2$. Sum: $\\alpha + \\alpha^2 = 6$, so $\\alpha = 2$ or $\\alpha = -3$." },
        { text: "Product $k = \\alpha \\cdot \\alpha^2 = \\alpha^3$: $k = 8$ or $k = -27$." },
        { text: "In general $\\alpha^3 = \\frac ca$ and $\\alpha + \\alpha^2 = -\\frac ba$. Cube the second: $(\\alpha + \\alpha^2)^3 = \\alpha^3 + \\alpha^6 + 3\\alpha^3(\\alpha + \\alpha^2)$." },
        { latex: "-\\frac{b^3}{a^3} = \\frac ca + \\frac{c^2}{a^2} - \\frac{3bc}{a^2} \\Rightarrow a^2c + ac^2 + b^3 = 3abc" },
      ],
      answer: "$k = 8$ or $k = -27$. In general the condition is $a^2c + ac^2 + b^3 = 3abc$.",
    },
    {
      type: "worked-example",
      id: "cq0-4-we5",
      title: "Worked example 5: roots differing by a constant",
      problem: "The roots of $x^2 - px + q = 0$ differ by $1$. Find a relation between $p$ and $q$.",
      steps: [
        { latex: "(\\alpha - \\beta)^2 = (\\alpha + \\beta)^2 - 4\\alpha\\beta = p^2 - 4q" },
        { text: "The roots differ by $1$, so $(\\alpha - \\beta)^2 = 1$. *Why this step:* squaring removes the question of which root is bigger." },
      ],
      answer: "$p^2 - 4q = 1$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the sum of roots is b/a\"",
      content:
        "The sum is $-\\frac ba$, with a minus sign. Quick test with $x^2 - 5x + 6 = 0$: the roots are $2$ and $3$, sum $5$, and $-\\frac{b}{a} = -\\frac{-5}{1} = 5$. If you remember the formed equation $x^2 - (\\text{sum})x + \\text{product}$, the sign takes care of itself.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "cq0-4-q1",
      variant: "practice",
      question: "Find the sum of the roots of $3x^2 + 5x - 2 = 0$.",
      answer: -1.6667,
      tolerance: 0.001,
      hint: "$\\alpha + \\beta = -\\frac ba$. You may type a fraction such as -5/3.",
      solution: "$\\alpha + \\beta = -\\frac53$. (The roots are $\\tfrac13$ and $-2$.)",
      commonMistakes: [
        { answer: 1.6667, tolerance: 0.001, feedback: "The sum is $-\\frac ba$, so it is negative here." },
        { answer: -0.6667, tolerance: 0.001, feedback: "That is the product $\\frac ca$." },
      ],
    },
    {
      type: "numeric",
      id: "cq0-4-q2",
      variant: "practice",
      question: "Find the product of the roots of $3x^2 + 5x - 2 = 0$.",
      answer: -0.6667,
      tolerance: 0.001,
      hint: "$\\alpha\\beta = \\frac ca$. You may type -2/3.",
      solution: "$\\alpha\\beta = \\frac{-2}{3}$. Check: $\\tfrac13 \\times (-2) = -\\tfrac23$.",
      commonMistakes: [
        { answer: 0.6667, tolerance: 0.001, feedback: "No minus sign is added for the product: it is simply $\\frac ca = \\frac{-2}{3}$." },
        { answer: -2, feedback: "Divide by $a = 3$: the product is $\\frac ca$." },
      ],
    },
    {
      type: "quiz",
      id: "cq0-4-q3",
      variant: "practice",
      question: "The quadratic equation with roots $-2$ and $5$ is",
      options: [
        { text: "$x^2 - 3x - 10 = 0$", correct: true, feedback: "Sum $3$, product $-10$." },
        { text: "$x^2 + 3x - 10 = 0$", feedback: "The coefficient of $x$ is $-(\\text{sum}) = -3$." },
        { text: "$x^2 - 3x + 10 = 0$", feedback: "The product $(-2)(5) = -10$." },
        { text: "$x^2 - 7x - 10 = 0$", feedback: "The sum is $-2 + 5 = 3$, not $7$." },
      ],
      hint: "Use $x^2 - (\\text{sum})x + \\text{product} = 0$.",
    },
    {
      type: "numeric",
      id: "cq0-4-q4",
      variant: "practice",
      question: "One root of $x^2 - 7x + k = 0$ is $2$. Find $k$.",
      answer: 10,
      hint: "The other root is $7 - 2$, from the sum.",
      solution: "Sum $= 7$, so the other root is $5$ and $k = 2 \\times 5 = 10$.",
      commonMistakes: [
        { answer: 5, feedback: "5 is the other root; $k$ is the product of the roots." },
        { answer: -10, feedback: "Substitute: $4 - 14 + k = 0$ gives $k = +10$." },
      ],
    },
    {
      type: "quiz",
      id: "cq0-4-q5",
      variant: "practice",
      question: "The roots of $x^2 + px + 12 = 0$ are in the ratio $1 : 3$. Then $p =$",
      options: [
        { text: "$\\pm 8$", correct: true, feedback: "Roots $t, 3t$: $3t^2 = 12$ gives $t = \\pm 2$, and $p = -(t + 3t) = -4t = \\mp 8$." },
        { text: "$8$ only", feedback: "$t = 2$ and $t = -2$ both give valid equations: roots $2, 6$ or $-2, -6$." },
        { text: "$\\pm 4$", feedback: "$p = -4t$, and $t = \\pm 2$." },
        { text: "$\\pm 6$", feedback: "Use the product to find $t$ first: $3t^2 = 12$." },
      ],
      hint: "Name the roots $t$ and $3t$, use the product to find $t$, then the sum to find $p$.",
    },
    {
      type: "numeric",
      id: "cq0-4-q6",
      variant: "practice",
      question: "The roots of $x^2 - 7x + q = 0$ differ by $1$. Find $q$.",
      answer: 12,
      hint: "$(\\alpha - \\beta)^2 = (\\alpha + \\beta)^2 - 4\\alpha\\beta$.",
      solution: "$49 - 4q = 1 \\Rightarrow q = 12$. Check: the roots are $3$ and $4$.",
      commonMistakes: [
        { answer: 12.5, tolerance: 0.01, feedback: "That solves $49 - 4q = -1$. The square of the difference is $+1$." },
        { answer: 48, feedback: "Divide by $4$: $4q = 48$." },
      ],
    },
    {
      type: "quiz",
      id: "cq0-4-q7",
      variant: "concept",
      question: "For $2x^2 - 6x - 5 = 0$, which statements are true? Select all that apply.",
      multiple: true,
      options: [
        { text: "The sum of the roots is $3$", correct: true, feedback: "$-\\frac ba = \\frac62 = 3$." },
        { text: "The product of the roots is $-\\tfrac52$", correct: true, feedback: "$\\frac ca = -\\frac52$." },
        { text: "The roots have opposite signs", correct: true, feedback: "A negative product means one positive and one negative root (and $D > 0$ is then automatic)." },
        { text: "Both roots are positive", feedback: "Two positive roots would have a positive product." },
      ],
      hint: "Read the sum and product from Vieta, then think about what the sign of the product says.",
    },
    {
      type: "numeric",
      id: "cq0-4-q8",
      variant: "practice",
      question: "One root of $x^2 - 6x + k = 0$ is the square of the other. Find the positive value of $k$.",
      answer: 8,
      hint: "Let the roots be $\\alpha$ and $\\alpha^2$: then $\\alpha + \\alpha^2 = 6$ and $k = \\alpha^3$.",
      solution: "$\\alpha^2 + \\alpha - 6 = 0 \\Rightarrow \\alpha = 2$ or $-3$, so $k = 8$ or $-27$. The positive value is $8$ (roots $2$ and $4$).",
      commonMistakes: [
        { answer: 4, feedback: "4 is the larger root. $k$ is the product $2 \\times 4$." },
        { answer: 27, feedback: "$\\alpha = -3$ gives $k = (-3)^3 = -27$, which is negative." },
      ],
    },
    {
      type: "numeric",
      id: "cq0-4-q9",
      variant: "practice",
      question: "JEE Main. The roots of $x^2 - bx + c = 0$ are two consecutive integers. Find $b^2 - 4c$.",
      answer: 1,
      hint: "$b^2 - 4c = (\\alpha + \\beta)^2 - 4\\alpha\\beta = (\\alpha - \\beta)^2$.",
      solution: "$b^2 - 4c = (\\alpha - \\beta)^2$, and consecutive integers differ by $1$, so the answer is $1$.",
      commonMistakes: [
        { answer: 0, feedback: "That would mean equal roots. Consecutive integers differ by $1$." },
        { answer: -1, feedback: "$(\\alpha - \\beta)^2$ is a square, so it cannot be negative." },
      ],
    },
    {
      type: "quiz",
      id: "cq0-4-q10",
      variant: "practice",
      question: "JEE Main. In $ax^2 + bx + c = 0$ the sum of the roots equals the sum of their squares. Then",
      options: [
        { text: "$2ac = ab + b^2$", correct: true, feedback: "$-\\frac ba = \\frac{b^2}{a^2} - \\frac{2c}a$; multiply by $a^2$: $-ab = b^2 - 2ac$." },
        { text: "$2ac = b^2 - ab$", feedback: "Check the sign of the sum: $\\alpha + \\beta = -\\frac ba$." },
        { text: "$ac = ab + b^2$", feedback: "$\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta$ brings a factor $2$ on $\\frac ca$." },
        { text: "$b^2 = 4ac$", feedback: "That is the equal-roots condition, a different question." },
      ],
      hint: "Write $\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta$, substitute Vieta, and clear denominators.",
    },
    {
      type: "numeric",
      id: "cq0-4-q11",
      variant: "mastery",
      question: "JEE Main. The quadratic $x^2 + bx + c = 0$ with rational $b, c$ has $\\dfrac{1}{2 + \\sqrt5}$ as a root. Find $b$.",
      answer: 4,
      hint: "Rationalise $\\frac{1}{2 + \\sqrt5}$ first, then use the conjugate partner.",
      solution: "$\\frac{1}{2 + \\sqrt5} = \\frac{2 - \\sqrt5}{4 - 5} = \\sqrt5 - 2$. The other root is $-\\sqrt5 - 2$. Sum $-4$, product $4 - 5 = -1$, so the equation is $x^2 + 4x - 1 = 0$ and $b = 4$.",
      commonMistakes: [
        { answer: -4, feedback: "$-4$ is the sum of the roots; $b = -(\\text{sum}) = 4$." },
        { answer: -1, feedback: "$-1$ is $c$, the product." },
      ],
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "symmetric-functions-of-roots",
  title: "0.5 · Symmetric Functions of Roots",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "The roots of $x^2 - 3x + 1 = 0$ are $\\frac{3 \\pm \\sqrt5}{2}$. Squaring and adding them by brute force is messy. Yet $\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta = 9 - 2 = 7$ takes one line. This lesson turns that trick into a system.",
    },
    { type: "heading", text: "What makes an expression symmetric" },
    {
      type: "callout",
      variant: "definition",
      title: "Symmetric function of the roots",
      content:
        "An expression in $\\alpha$ and $\\beta$ is **symmetric** if swapping $\\alpha$ and $\\beta$ leaves it unchanged: $\\alpha^2 + \\beta^2$, $\\alpha\\beta$, $\\frac1\\alpha + \\frac1\\beta$ are symmetric, while $\\alpha - \\beta$ and $\\alpha^2\\beta$ are not.",
    },
    {
      type: "text",
      content:
        "A classical theorem says every symmetric polynomial in $\\alpha, \\beta$ can be written as a polynomial in the two **elementary** symmetric functions $s = \\alpha + \\beta$ and $p = \\alpha\\beta$. Vieta hands us $s = -\\frac ba$ and $p = \\frac ca$, so every symmetric expression in the roots can be computed straight from the coefficients.",
    },
    { type: "heading", text: "The standard identities" },
    {
      type: "table",
      headers: ["Expression", "In terms of $s = \\alpha + \\beta$, $p = \\alpha\\beta$"],
      rows: [
        ["$\\alpha^2 + \\beta^2$", "$s^2 - 2p$"],
        ["$(\\alpha - \\beta)^2$", "$s^2 - 4p$"],
        ["$\\lvert\\alpha - \\beta\\rvert$ (real roots)", "$\\sqrt{s^2 - 4p} = \\frac{\\sqrt D}{\\lvert a\\rvert}$"],
        ["$\\alpha^3 + \\beta^3$", "$s^3 - 3ps$"],
        ["$\\alpha^4 + \\beta^4$", "$(s^2 - 2p)^2 - 2p^2$"],
        ["$\\frac1\\alpha + \\frac1\\beta$", "$\\frac sp$"],
        ["$\\frac\\alpha\\beta + \\frac\\beta\\alpha$", "$\\frac{s^2 - 2p}{p}$"],
        ["$\\alpha^2\\beta + \\alpha\\beta^2$", "$ps$"],
        ["$(\\alpha + k)(\\beta + k)$", "$p + ks + k^2$"],
      ],
    },
    {
      type: "text",
      content:
        "Each line comes from expanding a power of $s$: for example $s^3 = \\alpha^3 + 3\\alpha^2\\beta + 3\\alpha\\beta^2 + \\beta^3 = (\\alpha^3 + \\beta^3) + 3ps$. You never need to memorise the table; you need to be able to rebuild any line in ten seconds. Check numerically with the explorer: the readouts give the roots, the sum and the product.",
    },
    {
      type: "interactive",
      config: {
        component: "cq-quadratic-explorer",
        a: { min: -3, max: 3, step: 0.5, initial: 1 },
        b: { min: -6, max: 6, step: 0.5, initial: -3 },
        c: { min: -6, max: 6, step: 0.5, initial: 1 },
        readouts: ["roots", "sum-product"],
        caption:
          "For $x^2 - 3x + 1$ the roots are about $2.62$ and $0.38$. Square and add them on a calculator: you get $7 = s^2 - 2p$.",
      },
    },
    {
      type: "worked-example",
      id: "cq0-5-we1",
      title: "Worked example 1: squares and cubes",
      problem: "If $\\alpha, \\beta$ are the roots of $2x^2 - 5x + 1 = 0$, find $\\alpha^2 + \\beta^2$ and $\\alpha^3 + \\beta^3$.",
      steps: [
        { text: "$s = \\frac52$, $p = \\frac12$." },
        { latex: "\\alpha^2 + \\beta^2 = s^2 - 2p = \\tfrac{25}{4} - 1 = \\tfrac{21}{4}" },
        { latex: "\\alpha^3 + \\beta^3 = s^3 - 3ps = \\tfrac{125}{8} - 3 \\cdot \\tfrac12 \\cdot \\tfrac52 = \\tfrac{125}{8} - \\tfrac{30}{8} = \\tfrac{95}{8}" },
      ],
      answer: "$\\alpha^2 + \\beta^2 = \\tfrac{21}{4}$ and $\\alpha^3 + \\beta^3 = \\tfrac{95}{8}$.",
    },
    {
      type: "worked-example",
      id: "cq0-5-we2",
      title: "Worked example 2: fourth powers by repeated squaring",
      problem: "If $\\alpha, \\beta$ are the roots of $x^2 - 3x + 1 = 0$, find $\\alpha^4 + \\beta^4$.",
      steps: [
        { text: "$\\alpha^2 + \\beta^2 = 9 - 2 = 7$ and $\\alpha^2\\beta^2 = p^2 = 1$." },
        { text: "Square again: $\\alpha^4 + \\beta^4 = (\\alpha^2 + \\beta^2)^2 - 2\\alpha^2\\beta^2$. *Why this step:* $\\alpha^2$ and $\\beta^2$ are themselves a pair with known sum and product." },
        { latex: "\\alpha^4 + \\beta^4 = 49 - 2 = 47" },
      ],
      answer: "$\\alpha^4 + \\beta^4 = 47$.",
    },
    { type: "heading", text: "Newton's recurrence for power sums" },
    {
      type: "text",
      content:
        "Let $S_n = \\alpha^n + \\beta^n$. Since $a\\alpha^2 + b\\alpha + c = 0$, multiplying by $\\alpha^{n-2}$ gives $a\\alpha^n + b\\alpha^{n-1} + c\\alpha^{n-2} = 0$, and the same for $\\beta$. Add the two:",
    },
    {
      type: "math",
      latex: "aS_n + bS_{n-1} + cS_{n-2} = 0, \\qquad S_0 = 2,\\ S_1 = -\\frac ba",
    },
    {
      type: "text",
      content:
        "The same argument works for $T_n = \\alpha^n - \\beta^n$, or for any combination $u\\alpha^n + v\\beta^n$: each satisfies the recurrence. JEE loves to hide this inside a strange-looking ratio.",
    },
    {
      type: "worked-example",
      id: "cq0-5-we3",
      title: "Worked example 3: a JEE favourite",
      problem: "$\\alpha, \\beta$ are the roots of $x^2 - 6x - 2 = 0$ and $a_n = \\alpha^n - \\beta^n$. Find $\\dfrac{a_{10} - 2a_8}{2a_9}$.",
      steps: [
        { text: "Here $a = 1$, $b = -6$, $c = -2$, so the recurrence is $a_n - 6a_{n-1} - 2a_{n-2} = 0$." },
        { text: "With $n = 10$: $a_{10} = 6a_9 + 2a_8$, so $a_{10} - 2a_8 = 6a_9$. *Why this step:* the numerator is exactly what the recurrence produces, so no power ever needs computing." },
        { latex: "\\frac{a_{10} - 2a_8}{2a_9} = \\frac{6a_9}{2a_9} = 3" },
      ],
      answer: "$3$.",
    },
    { type: "heading", text: "Expressions that are not symmetric" },
    {
      type: "text",
      content:
        "$\\alpha - \\beta$ changes sign when the roots are swapped, so Vieta can only give it up to sign: $\\alpha - \\beta = \\pm\\sqrt{s^2 - 4p}$. The same goes for $\\alpha^2 - \\beta^2 = (\\alpha + \\beta)(\\alpha - \\beta)$ or $\\alpha^3 - \\beta^3 = (\\alpha - \\beta)(s^2 - p)$. If the question labels the roots (say $\\alpha > \\beta$), pick the sign accordingly.",
    },
    {
      type: "worked-example",
      id: "cq0-5-we4",
      title: "Worked example 4: a difference with labelled roots",
      problem: "$\\alpha > \\beta$ are the roots of $x^2 - 5x + 3 = 0$. Find $\\alpha^2 - \\beta^2$.",
      steps: [
        { latex: "\\alpha - \\beta = +\\sqrt{s^2 - 4p} = \\sqrt{25 - 12} = \\sqrt{13}" },
        { text: "The positive square root is chosen because $\\alpha > \\beta$." },
        { latex: "\\alpha^2 - \\beta^2 = (\\alpha + \\beta)(\\alpha - \\beta) = 5\\sqrt{13}" },
      ],
      answer: "$\\alpha^2 - \\beta^2 = 5\\sqrt{13}$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"|α − β| = √(s² − 2p)\"",
      content:
        "That mixes up two identities. $s^2 - 2p$ is $\\alpha^2 + \\beta^2$. The difference needs $(\\alpha - \\beta)^2 = (\\alpha + \\beta)^2 - 4\\alpha\\beta = s^2 - 4p$. Test on $x^2 - 5x + 6$ (roots 2 and 3): $s^2 - 4p = 25 - 24 = 1$, correct, while $s^2 - 2p = 13$ is wrong.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "cq0-5-q1",
      variant: "practice",
      question: "If $\\alpha, \\beta$ are the roots of $x^2 - 5x + 3 = 0$, find $\\alpha^2 + \\beta^2$.",
      answer: 19,
      hint: "$\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta$.",
      solution: "$s = 5$, $p = 3$: $25 - 6 = 19$.",
      commonMistakes: [
        { answer: 22, feedback: "The correction term is $2p = 6$, not $p$." },
        { answer: 31, feedback: "Subtract $2p$; do not add it." },
        { answer: 25, feedback: "$(\\alpha + \\beta)^2$ includes the cross term $2\\alpha\\beta$, which must be removed." },
      ],
    },
    {
      type: "numeric",
      id: "cq0-5-q2",
      variant: "practice",
      question: "If $\\alpha, \\beta$ are the roots of $x^2 - 5x + 3 = 0$, find $\\dfrac1\\alpha + \\dfrac1\\beta$.",
      answer: 1.6667,
      tolerance: 0.001,
      hint: "Combine over a common denominator: $\\frac{\\alpha + \\beta}{\\alpha\\beta}$.",
      solution: "$\\frac sp = \\frac53$.",
      commonMistakes: [
        { answer: 0.6, tolerance: 0.001, feedback: "Inverted: it is $\\frac{s}{p} = \\frac53$, not $\\frac ps$." },
      ],
    },
    {
      type: "numeric",
      id: "cq0-5-q3",
      variant: "practice",
      question: "If $\\alpha, \\beta$ are the roots of $2x^2 - 3x - 1 = 0$, find $(\\alpha - \\beta)^2$.",
      answer: 4.25,
      tolerance: 0.001,
      hint: "$(\\alpha - \\beta)^2 = s^2 - 4p$, or $\\frac{D}{a^2}$.",
      solution: "$s = \\frac32$, $p = -\\frac12$: $\\frac94 + 2 = \\frac{17}{4}$. Check: $\\frac{D}{a^2} = \\frac{9 + 8}{4}$.",
      commonMistakes: [
        { answer: 3.25, tolerance: 0.001, feedback: "That is $s^2 - 2p = \\alpha^2 + \\beta^2$. The difference needs $4p$." },
        { answer: 0.25, tolerance: 0.001, feedback: "Watch the sign of $p$: $-4p = +2$." },
      ],
    },
    {
      type: "numeric",
      id: "cq0-5-q4",
      variant: "practice",
      question: "If $\\alpha, \\beta$ are the roots of $x^2 - 3x + 1 = 0$, find $\\alpha^3 + \\beta^3$.",
      answer: 18,
      hint: "$\\alpha^3 + \\beta^3 = s^3 - 3ps$.",
      solution: "$27 - 3(1)(3) = 18$.",
      commonMistakes: [
        { answer: 24, feedback: "The correction is $3ps = 9$, not $3p = 3$." },
        { answer: 27, feedback: "$s^3$ contains the cross terms $3\\alpha^2\\beta + 3\\alpha\\beta^2 = 3ps$; subtract them." },
      ],
    },
    {
      type: "quiz",
      id: "cq0-5-q5",
      variant: "concept",
      question: "Which expressions are symmetric in $\\alpha$ and $\\beta$? Select all that apply.",
      multiple: true,
      options: [
        { text: "$\\alpha^2\\beta + \\alpha\\beta^2$", correct: true, feedback: "Swapping gives $\\beta^2\\alpha + \\beta\\alpha^2$, the same. It equals $ps$." },
        { text: "$\\alpha - \\beta$", feedback: "Swapping changes the sign." },
        { text: "$\\frac\\alpha\\beta + \\frac\\beta\\alpha$", correct: true, feedback: "The two terms trade places. It equals $\\frac{s^2 - 2p}{p}$." },
        { text: "$\\alpha^3 - \\beta^3$", feedback: "Swapping changes the sign." },
        { text: "$(\\alpha + 1)(\\beta + 1)$", correct: true, feedback: "Swapping just reorders the factors. It equals $p + s + 1$." },
      ],
      hint: "Swap $\\alpha$ and $\\beta$ in each expression and see whether it changes.",
    },
    {
      type: "numeric",
      id: "cq0-5-q6",
      variant: "practice",
      question: "If $\\alpha, \\beta$ are the roots of $x^2 - 2x - 1 = 0$, find $\\alpha^4 + \\beta^4$.",
      answer: 34,
      hint: "First find $\\alpha^2 + \\beta^2$ and $\\alpha^2\\beta^2$, then square again.",
      solution: "$\\alpha^2 + \\beta^2 = 4 + 2 = 6$ and $\\alpha^2\\beta^2 = 1$, so $\\alpha^4 + \\beta^4 = 36 - 2 = 34$.",
      commonMistakes: [
        { answer: 38, feedback: "Subtract $2\\alpha^2\\beta^2 = 2$; do not add it." },
        { answer: 2, feedback: "$\\alpha^2 + \\beta^2 = s^2 - 2p = 4 - 2(-1) = 6$, not $2$. Watch the sign of $p$." },
      ],
    },
    {
      type: "numeric",
      id: "cq0-5-q7",
      variant: "practice",
      question: "If $\\alpha, \\beta$ are the roots of $x^2 - 4x + 2 = 0$, find $\\dfrac\\alpha\\beta + \\dfrac\\beta\\alpha$.",
      answer: 6,
      hint: "$\\frac\\alpha\\beta + \\frac\\beta\\alpha = \\frac{\\alpha^2 + \\beta^2}{\\alpha\\beta}$.",
      solution: "$\\frac{16 - 4}{2} = 6$.",
      commonMistakes: [
        { answer: 8, feedback: "The numerator is $\\alpha^2 + \\beta^2 = s^2 - 2p = 12$, not $s^2 = 16$." },
        { answer: 2, feedback: "That is $\\frac{s}{p}$, the sum of reciprocals." },
      ],
    },
    {
      type: "quiz",
      id: "cq0-5-q8",
      variant: "concept",
      question: "For $ax^2 + bx + c = 0$ with real roots $\\alpha, \\beta$, the distance between the roots $\\lvert\\alpha - \\beta\\rvert$ equals",
      options: [
        { text: "$\\dfrac{\\sqrt{b^2 - 4ac}}{\\lvert a\\rvert}$", correct: true, feedback: "$(\\alpha - \\beta)^2 = \\frac{b^2}{a^2} - \\frac{4c}{a} = \\frac{D}{a^2}$." },
        { text: "$\\dfrac{\\sqrt{b^2 - 4ac}}{2a}$", feedback: "That is the half-distance from the axis to each root (and the sign of $a$ matters)." },
        { text: "$\\dfrac{\\sqrt{b^2 - 2ac}}{\\lvert a\\rvert}$", feedback: "That uses $s^2 - 2p$, which is $\\alpha^2 + \\beta^2$." },
        { text: "$\\dfrac{b^2 - 4ac}{a^2}$", feedback: "That is the square of the distance." },
      ],
      hint: "$(\\alpha - \\beta)^2 = s^2 - 4p$. Put it over a common denominator.",
    },
    {
      type: "numeric",
      id: "cq0-5-q9",
      variant: "practice",
      question: "JEE Main. $\\alpha, \\beta$ are the roots of $x^2 - 6x - 2 = 0$ and $a_n = \\alpha^n - \\beta^n$. Find $\\dfrac{a_{10} - 2a_8}{2a_9}$.",
      answer: 3,
      hint: "Each of $\\alpha, \\beta$ satisfies $x^{n} = 6x^{n-1} + 2x^{n-2}$.",
      solution: "$a_{10} = 6a_9 + 2a_8$, so $\\frac{a_{10} - 2a_8}{2a_9} = \\frac{6a_9}{2a_9} = 3$.",
      commonMistakes: [
        { answer: 6, feedback: "You forgot the $2$ in the denominator $2a_9$." },
        { answer: 1.5, tolerance: 0.001, feedback: "The recurrence gives $a_{10} - 2a_8 = 6a_9$, so the ratio is $\\frac{6}{2}$." },
      ],
    },
    {
      type: "numeric",
      id: "cq0-5-q10",
      variant: "practice",
      question: "$\\alpha, \\beta$ are the roots of $x^2 - x - 1 = 0$ and $S_n = \\alpha^n + \\beta^n$. Find $S_6$.",
      answer: 18,
      hint: "$S_n = S_{n-1} + S_{n-2}$ with $S_0 = 2$ and $S_1 = 1$.",
      solution: "$S_0 = 2, S_1 = 1, S_2 = 3, S_3 = 4, S_4 = 7, S_5 = 11, S_6 = 18$.",
      commonMistakes: [
        { answer: 11, feedback: "That is $S_5$. One more step." },
        { answer: 8, feedback: "That is the Fibonacci number $F_6$; here $S_0 = 2$, so the sequence is the Lucas numbers." },
      ],
    },
    {
      type: "quiz",
      id: "cq0-5-q11",
      variant: "mastery",
      question: "JEE Advanced. $\\alpha, \\beta$ are the roots of $x^2 - px + r = 0$, and $\\frac\\alpha2, 2\\beta$ are the roots of $x^2 - qx + r = 0$. Then $r =$",
      options: [
        { text: "$\\tfrac29(2p - q)(2q - p)$", correct: true, feedback: "From $\\alpha + \\beta = p$ and $\\frac\\alpha2 + 2\\beta = q$: $\\beta = \\frac{2q - p}{3}$, $\\alpha = \\frac{2(2p - q)}{3}$, and $r = \\alpha\\beta$." },
        { text: "$\\tfrac29(p - q)(2q - p)$", feedback: "Test with $\\alpha = 2$, $\\beta = 1$: $p = q = 3$, $r = 2$, but this gives $0$." },
        { text: "$\\tfrac29(q - 2p)(2q - p)$", feedback: "The sign of the first factor is wrong: this is negative when the true $r$ is positive." },
        { text: "$\\tfrac19(2p - q)(2q - p)$", feedback: "$\\alpha = \\frac{2(2p - q)}{3}$ carries a factor $2$." },
      ],
      hint: "The two equations share the product $r$. Use the two sums to solve for $\\alpha$ and $\\beta$ in terms of $p$ and $q$.",
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "transformation-of-roots",
  title: "0.6 · Transformation of Roots",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "The roots of $x^2 - 5x + 6 = 0$ are $2$ and $3$. Suppose you want an equation whose roots are $4$ and $6$, twice the old ones. You could build it from scratch. But there is a slicker idea that works even when you cannot find the roots at all: transform the **equation**, not the roots.",
    },
    { type: "heading", text: "The substitution rule" },
    {
      type: "text",
      content:
        "Say $\\alpha$ is a root of $f(x) = 0$ and you want an equation satisfied by $y = g(\\alpha)$. Solve for the old root: $\\alpha = g^{-1}(y)$. Since $f(\\alpha) = 0$, we get $f\\big(g^{-1}(y)\\big) = 0$. Rename $y$ as $x$:",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Transformation of roots",
      content:
        "If $\\alpha, \\beta$ are the roots of $f(x) = 0$, then the equation with roots $g(\\alpha), g(\\beta)$ is $f\\big(g^{-1}(x)\\big) = 0$. In words: **to apply $g$ to the roots, apply the inverse of $g$ to $x$**.",
    },
    {
      type: "table",
      headers: ["New roots", "Replace $x$ by", "Equation from $ax^2 + bx + c = 0$"],
      rows: [
        ["$k\\alpha,\\ k\\beta$", "$\\frac xk$", "$ax^2 + bkx + ck^2 = 0$"],
        ["$\\alpha + k,\\ \\beta + k$", "$x - k$", "$a(x - k)^2 + b(x - k) + c = 0$"],
        ["$-\\alpha,\\ -\\beta$", "$-x$", "$ax^2 - bx + c = 0$"],
        ["$\\frac1\\alpha,\\ \\frac1\\beta$", "$\\frac1x$", "$cx^2 + bx + a = 0$ (coefficients reversed)"],
        ["$\\alpha^2,\\ \\beta^2$", "$\\sqrt x$", "$(ax + c)^2 = b^2x$"],
      ],
    },
    {
      type: "text",
      content:
        "The last row deserves a word. Replacing $x$ by $\\sqrt x$ gives $ax + b\\sqrt x + c = 0$. Isolate the surd, $ax + c = -b\\sqrt x$, and square to clear it: $(ax + c)^2 = b^2 x$. Graphically, the shift row is the cleanest: replacing $x$ by $x - k$ slides the whole parabola $k$ units to the right, roots and all.",
    },
    {
      type: "interactive",
      config: {
        component: "cq-quadratic-explorer",
        a: { min: -2, max: 2, step: 0.5, initial: 1 },
        b: { min: -12, max: 12, step: 1, initial: -5 },
        c: { min: -10, max: 30, step: 1, initial: 6 },
        readouts: ["roots", "sum-product", "factored"],
        window: { xmin: -2, xmax: 10, ymin: -8, ymax: 8 },
        caption:
          "Start at $x^2 - 5x + 6$ (roots $2, 3$). Doubling the roots: set $b = -10$, $c = 24$, which is $4 \\cdot f(\\tfrac x2)$. Shifting the roots up by $2$: set $b = -9$, $c = 20$, which is $f(x - 2)$.",
      },
    },
    { type: "heading", text: "Worked transformations" },
    {
      type: "worked-example",
      id: "cq0-6-we1",
      title: "Worked example 1: doubling the roots",
      problem: "$\\alpha, \\beta$ are the roots of $2x^2 - 3x + 1 = 0$. Form the equation with roots $2\\alpha, 2\\beta$.",
      steps: [
        { text: "New root $x = 2\\alpha$ means $\\alpha = \\frac x2$. Substitute into the old equation." },
        { latex: "2\\left(\\tfrac x2\\right)^2 - 3\\left(\\tfrac x2\\right) + 1 = 0 \\Rightarrow \\tfrac{x^2}{2} - \\tfrac{3x}{2} + 1 = 0" },
        { text: "Multiply by $2$. Check: the old roots are $1, \\tfrac12$, so the new ones are $2, 1$." },
      ],
      answer: "$x^2 - 3x + 2 = 0$.",
    },
    {
      type: "worked-example",
      id: "cq0-6-we2",
      title: "Worked example 2: shifting the roots",
      problem: "$\\alpha, \\beta$ are the roots of $x^2 - 5x + 6 = 0$. Form the equation with roots $\\alpha - 1$, $\\beta - 1$.",
      steps: [
        { text: "$x = \\alpha - 1$ means $\\alpha = x + 1$. *Why this step:* subtracting from the roots means **adding** inside $f$." },
        { latex: "(x + 1)^2 - 5(x + 1) + 6 = x^2 - 3x + 2" },
      ],
      answer: "$x^2 - 3x + 2 = 0$ (roots $1$ and $2$).",
    },
    {
      type: "worked-example",
      id: "cq0-6-we3",
      title: "Worked example 3: reciprocal roots",
      problem: "Form the equation whose roots are the reciprocals of the roots of $3x^2 - 7x + 2 = 0$.",
      steps: [
        { latex: "3\\left(\\tfrac1x\\right)^2 - 7\\left(\\tfrac1x\\right) + 2 = 0 \\xrightarrow{\\ \\times x^2\\ } 3 - 7x + 2x^2 = 0" },
        { text: "So the coefficients simply reverse. Check: old roots $2, \\tfrac13$, new roots $\\tfrac12, 3$." },
      ],
      answer: "$2x^2 - 7x + 3 = 0$.",
    },
    {
      type: "worked-example",
      id: "cq0-6-we4",
      title: "Worked example 4: squared roots",
      problem: "$\\alpha, \\beta$ are the roots of $x^2 - 3x + 1 = 0$. Form the equation with roots $\\alpha^2, \\beta^2$.",
      steps: [
        { text: "Replace $x$ by $\\sqrt x$: $x - 3\\sqrt x + 1 = 0$, so $x + 1 = 3\\sqrt x$." },
        { latex: "(x + 1)^2 = 9x \\Rightarrow x^2 - 7x + 1 = 0" },
        { text: "Cross-check with symmetric functions: $\\alpha^2 + \\beta^2 = 9 - 2 = 7$ and $\\alpha^2\\beta^2 = 1$." },
      ],
      answer: "$x^2 - 7x + 1 = 0$.",
    },
    {
      type: "worked-example",
      id: "cq0-6-we5",
      title: "Worked example 5: a fractional transformation",
      problem: "$\\alpha, \\beta$ are the roots of $x^2 - 3x + 1 = 0$. Form the equation with roots $\\frac1{1 - \\alpha}$ and $\\frac1{1 - \\beta}$.",
      steps: [
        { text: "Invert $y = \\frac{1}{1 - x}$: $1 - x = \\frac1y$, so $x = \\frac{y - 1}{y}$." },
        { latex: "\\left(\\frac{y - 1}{y}\\right)^2 - 3\\,\\frac{y - 1}{y} + 1 = 0 \\xrightarrow{\\ \\times y^2\\ } (y - 1)^2 - 3y(y - 1) + y^2 = 0" },
        { latex: "-y^2 + y + 1 = 0 \\Rightarrow y^2 - y - 1 = 0" },
      ],
      answer: "$x^2 - x - 1 = 0$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"roots α + 2 means replace x by x + 2\"",
      content:
        "Replacing $x$ by $x + 2$ gives $f(x + 2) = 0$, whose roots are $\\alpha - 2$ and $\\beta - 2$: if $f(\\alpha) = 0$, then $x = \\alpha - 2$ makes $x + 2 = \\alpha$. To **raise** the roots by 2, replace $x$ by $x - 2$. The rule is always \"apply the inverse\", which is why the sign looks backwards.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "cq0-6-q1",
      variant: "practice",
      question: "$\\alpha, \\beta$ are the roots of $x^2 - 2x + 5 = 0$. The equation with roots $3\\alpha, 3\\beta$ is",
      options: [
        { text: "$x^2 - 6x + 45 = 0$", correct: true, feedback: "$\\left(\\frac x3\\right)^2 - \\frac{2x}{3} + 5 = 0$, times $9$. Sum $3 \\times 2$, product $9 \\times 5$." },
        { text: "$x^2 - 6x + 15 = 0$", feedback: "The product of roots scales by $3^2 = 9$, not $3$." },
        { text: "$x^2 - 2x + 45 = 0$", feedback: "The sum of roots also triples: $6$." },
        { text: "$9x^2 - 6x + 5 = 0$", feedback: "That substitutes $3x$ for $x$, which divides the roots by $3$." },
      ],
      hint: "New root $x = 3\\alpha$ means $\\alpha = \\frac x3$.",
    },
    {
      type: "quiz",
      id: "cq0-6-q2",
      variant: "practice",
      question: "The equation whose roots are the reciprocals of the roots of $2x^2 - 5x + 7 = 0$ is",
      options: [
        { text: "$7x^2 - 5x + 2 = 0$", correct: true, feedback: "Replace $x$ by $\\frac1x$ and multiply by $x^2$: the coefficients reverse." },
        { text: "$2x^2 - 5x + 7 = 0$", feedback: "That is the original equation." },
        { text: "$7x^2 + 5x + 2 = 0$", feedback: "Reversing does not change the middle sign." },
        { text: "$2x^2 + 5x + 7 = 0$", feedback: "That gives roots $-\\alpha, -\\beta$." },
      ],
      hint: "Substitute $\\frac1x$ for $x$ and clear the fractions.",
    },
    {
      type: "numeric",
      id: "cq0-6-q3",
      variant: "practice",
      question: "$\\alpha, \\beta$ are the roots of $x^2 - 3x - 4 = 0$. The equation with roots $\\alpha + 2$, $\\beta + 2$ is $x^2 + bx + c = 0$. Find $c$.",
      answer: 6,
      hint: "Replace $x$ by $x - 2$, or find the new sum and product.",
      solution: "Old roots $4, -1$; new roots $6, 1$. Product $c = 6$. Equivalently $(x - 2)^2 - 3(x - 2) - 4 = x^2 - 7x + 6$.",
      commonMistakes: [
        { answer: -6, feedback: "That equation has roots $\\alpha - 2$, $\\beta - 2$ (you replaced $x$ by $x + 2$)." },
        { answer: -4, feedback: "That is the old product. The new product is $(\\alpha + 2)(\\beta + 2) = p + 2s + 4$." },
      ],
    },
    {
      type: "numeric",
      id: "cq0-6-q4",
      variant: "practice",
      question: "$\\alpha, \\beta$ are the roots of $x^2 - 4x + 2 = 0$. The monic equation with roots $\\alpha^2, \\beta^2$ is $x^2 + Bx + C = 0$. Find $B$.",
      answer: -12,
      hint: "$B = -(\\alpha^2 + \\beta^2)$.",
      solution: "$\\alpha^2 + \\beta^2 = 16 - 4 = 12$ and $\\alpha^2\\beta^2 = 4$, so the equation is $x^2 - 12x + 4 = 0$ and $B = -12$.",
      commonMistakes: [
        { answer: 12, feedback: "$B$ is minus the sum of the new roots." },
        { answer: -16, feedback: "$\\alpha^2 + \\beta^2 = s^2 - 2p = 16 - 4$." },
      ],
    },
    {
      type: "quiz",
      id: "cq0-6-q5",
      variant: "practice",
      question: "The equation whose roots are the negatives of the roots of $3x^2 + 2x - 7 = 0$ is",
      options: [
        { text: "$3x^2 - 2x - 7 = 0$", correct: true, feedback: "Replace $x$ by $-x$: only the odd-power term changes sign." },
        { text: "$-3x^2 - 2x + 7 = 0$", feedback: "That is the original equation multiplied by $-1$, with the same roots." },
        { text: "$3x^2 + 2x + 7 = 0$", feedback: "The constant term is unchanged by $x \\to -x$." },
        { text: "$7x^2 - 2x - 3 = 0$", feedback: "Reversing coefficients gives reciprocals, not negatives." },
      ],
      hint: "New root $x = -\\alpha$ means $\\alpha = -x$.",
    },
    {
      type: "quiz",
      id: "cq0-6-q6",
      variant: "concept",
      question: "$ax^2 + bx + c = 0$ ($a, c \\ne 0$) has roots $\\alpha, \\beta$. Which statements are correct? Select all that apply.",
      multiple: true,
      options: [
        { text: "$cx^2 + bx + a = 0$ has roots $\\frac1\\alpha, \\frac1\\beta$", correct: true, feedback: "Replace $x$ by $\\frac1x$ and multiply through by $x^2$." },
        { text: "$a(x - 1)^2 + b(x - 1) + c = 0$ has roots $\\alpha + 1, \\beta + 1$", correct: true, feedback: "Replacing $x$ by $x - 1$ raises each root by $1$." },
        { text: "$ax^2 - bx + c = 0$ has roots $-\\alpha, -\\beta$", correct: true, feedback: "Replacing $x$ by $-x$." },
        { text: "$ax^2 + 2bx + 4c = 0$ has roots $2\\alpha, 2\\beta$", correct: true, feedback: "$a\\left(\\frac x2\\right)^2 + b\\frac x2 + c = 0$, times $4$." },
        { text: "$ax^2 + bx + 4c = 0$ has roots $2\\alpha, 2\\beta$", feedback: "Doubling the roots doubles their sum too, so the middle coefficient must change." },
      ],
      hint: "For each option, apply the rule: to apply $g$ to the roots, substitute $g^{-1}(x)$.",
    },
    {
      type: "numeric",
      id: "cq0-6-q7",
      variant: "practice",
      question: "$\\alpha, \\beta$ are the roots of $x^2 - 3x + 1 = 0$. Find the product $\\dfrac{1}{1 - \\alpha} \\cdot \\dfrac{1}{1 - \\beta}$.",
      answer: -1,
      hint: "$(1 - \\alpha)(1 - \\beta) = 1 - s + p$. Or use Worked example 5.",
      solution: "$(1 - \\alpha)(1 - \\beta) = 1 - 3 + 1 = -1$, so the product is $\\frac{1}{-1} = -1$. This matches the constant term of $x^2 - x - 1 = 0$.",
      commonMistakes: [
        { answer: 1, feedback: "$(1 - \\alpha)(1 - \\beta) = 1 - s + p = -1$; the sign matters." },
        { answer: 0.2, tolerance: 0.001, feedback: "That uses $1 + s + p = 5$. Expanding $(1 - \\alpha)(1 - \\beta)$ gives $1 - (\\alpha + \\beta) + \\alpha\\beta$." },
      ],
    },
    {
      type: "quiz",
      id: "cq0-6-q8",
      variant: "practice",
      question: "$\\alpha, \\beta$ are the roots of $x^2 + px + q = 0$. The equation with roots $(\\alpha - \\beta)^2$ and $(\\alpha + \\beta)^2$ is",
      options: [
        { text: "$x^2 - 2(p^2 - 2q)x + p^2(p^2 - 4q) = 0$", correct: true, feedback: "New roots $p^2 - 4q$ and $p^2$: sum $2p^2 - 4q$, product $p^2(p^2 - 4q)$." },
        { text: "$x^2 - 2(p^2 - 2q)x + p^2(p^2 + 4q) = 0$", feedback: "$(\\alpha - \\beta)^2 = s^2 - 4p = p^2 - 4q$, with a minus." },
        { text: "$x^2 - (p^2 - 4q)x + p^2 = 0$", feedback: "Those are the new roots, not their sum and product." },
        { text: "$x^2 + 2(p^2 - 2q)x + p^2(p^2 - 4q) = 0$", feedback: "The $x$ coefficient is minus the sum of the roots." },
      ],
      hint: "Compute each new root from $s = -p$ and the product $q$, then use $x^2 - (\\text{sum})x + \\text{product}$.",
    },
    {
      type: "numeric",
      id: "cq0-6-q9",
      variant: "practice",
      question: "JEE Main. $\\alpha, \\beta$ are the roots of $3x^2 - 5x + 2 = 0$. The equation with roots $\\frac\\alpha\\beta$ and $\\frac\\beta\\alpha$, written with integer coefficients as $6x^2 + Bx + 6 = 0$, has $B = ?$",
      answer: -13,
      hint: "The new product is $1$; the new sum is $\\frac{s^2 - 2p}{p}$.",
      solution: "$s = \\frac53$, $p = \\frac23$: new sum $\\frac{\\frac{25}{9} - \\frac43}{\\frac23} = \\frac{13}{6}$, product $1$. So $x^2 - \\frac{13}{6}x + 1 = 0$, i.e. $6x^2 - 13x + 6 = 0$. Check: old roots $1, \\tfrac23$ give ratios $\\tfrac32, \\tfrac23$.",
      commonMistakes: [
        { answer: 13, feedback: "The coefficient of $x$ is minus the sum." },
        { answer: -25, feedback: "The numerator is $s^2 - 2p$, not $s^2$." },
      ],
    },
    {
      type: "quiz",
      id: "cq0-6-q10",
      variant: "mastery",
      question: "JEE Advanced. $\\alpha, \\beta$ are the roots of $x^2 - x - 1 = 0$. The quadratic with roots $\\alpha^3$ and $\\beta^3$ is",
      options: [
        { text: "$x^2 - 4x - 1 = 0$", correct: true, feedback: "$\\alpha^3 + \\beta^3 = s^3 - 3ps = 1 + 3 = 4$ and $\\alpha^3\\beta^3 = (-1)^3 = -1$." },
        { text: "$x^2 - 2x - 1 = 0$", feedback: "$s^3 - 3ps$ with $p = -1$ is $1 + 3 = 4$; watch the sign of $p$." },
        { text: "$x^2 - 4x + 1 = 0$", feedback: "$(\\alpha\\beta)^3 = (-1)^3 = -1$." },
        { text: "$x^2 - x - 1 = 0$", feedback: "Cubing changes the roots: $\\alpha^3 \\ne \\alpha$ unless $\\alpha \\in \\{0, \\pm 1\\}$." },
      ],
      hint: "New sum $s^3 - 3ps$, new product $p^3$, with $s = 1$ and $p = -1$.",
    },
  ]),
};

const lesson07: LessonSeed = {
  slug: "equations-reducible-to-quadratics",
  title: "0.7 · Equations Reducible to Quadratics",
  position: 7,
  blocks: blocks([
    {
      type: "text",
      content:
        "$x^4 - 5x^2 + 4 = 0$ is a fourth-degree equation, but look at it through the right lens: it is $(x^2)^2 - 5(x^2) + 4 = 0$, a quadratic in $x^2$. Many equations that look hard are quadratics in disguise. The method is always the same: spot the repeated block, call it $t$, solve the quadratic in $t$, then go back to $x$ and **check** every answer.",
    },
    { type: "heading", text: "Biquadratics: t = x²" },
    {
      type: "worked-example",
      id: "cq0-7-we1",
      title: "Worked example 1: a biquadratic",
      problem: "Solve $x^4 - 5x^2 + 4 = 0$, and then $x^4 + 3x^2 - 4 = 0$.",
      steps: [
        { text: "Put $t = x^2$: $t^2 - 5t + 4 = (t - 1)(t - 4) = 0$, so $t = 1$ or $t = 4$, giving $x = \\pm1, \\pm2$." },
        { text: "For the second, $t^2 + 3t - 4 = (t + 4)(t - 1) = 0$, so $t = 1$ or $t = -4$. *Why this step:* $t = x^2$ can never be negative for real $x$, so $t = -4$ gives no real root." },
      ],
      answer: "First equation: $x = \\pm 1, \\pm 2$. Second: $x = \\pm 1$ only (over the reals).",
    },
    {
      type: "text",
      content:
        "The quadratic in $t$ is a parabola like any other, and its roots must then be filtered by the condition $t \\ge 0$. Below is $y = t^2 - 5t + 4$, drawn with the explorer's $x$ playing the role of $t$.",
    },
    {
      type: "interactive",
      config: {
        component: "cq-quadratic-explorer",
        a: { min: -2, max: 2, step: 0.5, initial: 1 },
        b: { min: -6, max: 6, step: 0.5, initial: -5 },
        c: { min: -6, max: 6, step: 0.5, initial: 4 },
        readouts: ["roots", "discriminant"],
        showSign: true,
        caption:
          "Read the horizontal axis as $t = x^2$. Each positive root $t$ gives two real $x = \\pm\\sqrt t$, a root $t = 0$ gives one, and a negative root gives none. Set $b = 3$, $c = -4$ to see the second equation lose two of its roots.",
      },
    },
    { type: "heading", text: "Pairing four linear factors" },
    {
      type: "worked-example",
      id: "cq0-7-we2",
      title: "Worked example 2: pair so the x-terms match",
      problem: "Solve $(x + 1)(x + 2)(x + 3)(x + 4) = 24$ over the reals.",
      steps: [
        { text: "Pair the outer and inner factors: $(x + 1)(x + 4) = x^2 + 5x + 4$ and $(x + 2)(x + 3) = x^2 + 5x + 6$. *Why this step:* $1 + 4 = 2 + 3$, so both pairs share the block $x^2 + 5x$." },
        { text: "Put $t = x^2 + 5x$: $(t + 4)(t + 6) = 24$, so $t^2 + 10t = 0$, giving $t = 0$ or $t = -10$." },
        { text: "$x^2 + 5x = 0$ gives $x = 0, -5$. $x^2 + 5x + 10 = 0$ has $D = 25 - 40 < 0$: no real roots." },
      ],
      answer: "$x = 0$ or $x = -5$.",
    },
    { type: "heading", text: "Reciprocal equations: t = x + 1/x" },
    {
      type: "text",
      content:
        "An equation whose coefficients read the same forwards and backwards, like $2x^4 - 9x^3 + 14x^2 - 9x + 2 = 0$, is called **reciprocal**: if $\\alpha$ is a root, so is $\\frac1\\alpha$. Divide by $x^2$ and group the matching ends:",
    },
    {
      type: "math",
      latex: "2\\left(x^2 + \\frac1{x^2}\\right) - 9\\left(x + \\frac1x\\right) + 14 = 0, \\qquad x^2 + \\frac1{x^2} = \\left(x + \\frac1x\\right)^2 - 2",
    },
    {
      type: "worked-example",
      id: "cq0-7-we3",
      title: "Worked example 3: a reciprocal quartic",
      problem: "Solve $2x^4 - 9x^3 + 14x^2 - 9x + 2 = 0$.",
      steps: [
        { text: "$x = 0$ is not a root, so dividing by $x^2$ is safe. With $t = x + \\frac1x$ the equation becomes $2(t^2 - 2) - 9t + 14 = 0$." },
        { latex: "2t^2 - 9t + 10 = 0 \\Rightarrow (t - 2)(2t - 5) = 0 \\Rightarrow t = 2 \\text{ or } t = \\tfrac52" },
        { text: "$x + \\frac1x = 2$ gives $x^2 - 2x + 1 = 0$, a double root $x = 1$." },
        { text: "$x + \\frac1x = \\frac52$ gives $2x^2 - 5x + 2 = 0$, so $x = 2$ or $x = \\tfrac12$." },
      ],
      answer: "$x = 1$ (twice), $2$, $\\tfrac12$. Note the reciprocal pair $2, \\tfrac12$.",
    },
    { type: "heading", text: "Exponential equations: t = aˣ" },
    {
      type: "worked-example",
      id: "cq0-7-we4",
      title: "Worked example 4: powers of 2",
      problem: "Solve $4^x - 3 \\cdot 2^{x + 1} + 8 = 0$.",
      steps: [
        { text: "Write everything in powers of $2^x$: $4^x = (2^x)^2$ and $2^{x + 1} = 2 \\cdot 2^x$." },
        { text: "Put $t = 2^x$, remembering $t > 0$: $t^2 - 6t + 8 = 0$, so $t = 2$ or $t = 4$." },
        { text: "$2^x = 2$ gives $x = 1$, and $2^x = 4$ gives $x = 2$." },
      ],
      answer: "$x = 1$ or $x = 2$.",
    },
    { type: "heading", text: "Radical equations and extraneous roots" },
    {
      type: "text",
      content:
        "To clear a square root we square both sides. But squaring is not reversible: $a = b$ implies $a^2 = b^2$, while $a^2 = b^2$ only implies $a = \\pm b$. So squaring can **add** solutions that the original equation does not have. These are called **extraneous roots**, and the only defence is to substitute every candidate back into the original equation.",
    },
    {
      type: "worked-example",
      id: "cq0-7-we5",
      title: "Worked example 5: an extraneous root appears",
      problem: "Solve $\\sqrt{2x + 9} = x - 3$.",
      steps: [
        { text: "Square: $2x + 9 = x^2 - 6x + 9$, so $x^2 - 8x = 0$, giving $x = 0$ or $x = 8$." },
        { text: "Check $x = 0$: left side $\\sqrt9 = 3$, right side $-3$. Rejected. *Why this step:* a square root is never negative, so the right side must be $\\ge 0$, i.e. $x \\ge 3$." },
        { text: "Check $x = 8$: $\\sqrt{25} = 5$ and $8 - 3 = 5$. Accepted." },
      ],
      answer: "$x = 8$ only.",
    },
    {
      type: "worked-example",
      id: "cq0-7-we6",
      title: "Worked example 6: fractional powers",
      problem: "Solve $x^{2/3} - 5x^{1/3} + 6 = 0$.",
      steps: [
        { text: "Put $t = x^{1/3}$ (the real cube root, defined for every real $x$). Then $x^{2/3} = t^2$." },
        { text: "$t^2 - 5t + 6 = 0$ gives $t = 2$ or $t = 3$, so $x = t^3 = 8$ or $27$." },
      ],
      answer: "$x = 8$ or $x = 27$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"every root of the squared equation is a root\"",
      content:
        "In $\\sqrt{2x + 9} = x - 3$ the squared equation has roots $0$ and $8$, but $x = 0$ makes the right side negative while a square root is never negative. Always substitute back, or impose the sign condition (here $x - 3 \\ge 0$) before squaring. The same care applies to substitutions: $t = x^2$ and $t = 2^x$ must not be negative, and $t = x + \\frac1x$ satisfies $\\lvert t\\rvert \\ge 2$ for real $x$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "cq0-7-q1",
      variant: "practice",
      question: "How many real roots does $x^4 - 13x^2 + 36 = 0$ have?",
      answer: 4,
      hint: "Put $t = x^2$ and count the positive roots in $t$.",
      solution: "$t^2 - 13t + 36 = (t - 4)(t - 9) = 0$. Both $t$ are positive, so $x = \\pm2, \\pm3$: four real roots.",
      commonMistakes: [
        { answer: 2, feedback: "Each positive $t$ gives two values of $x$, namely $\\pm\\sqrt t$." },
      ],
    },
    {
      type: "numeric",
      id: "cq0-7-q2",
      variant: "practice",
      question: "How many real roots does $x^4 + x^2 - 6 = 0$ have?",
      answer: 2,
      hint: "Put $t = x^2$; a negative $t$ gives no real $x$.",
      solution: "$t^2 + t - 6 = (t + 3)(t - 2) = 0$. Only $t = 2$ is allowed, giving $x = \\pm\\sqrt2$.",
      commonMistakes: [
        { answer: 4, feedback: "$t = -3$ would need $x^2 = -3$, impossible for real $x$." },
        { answer: 1, feedback: "$x^2 = 2$ has two real solutions, $\\pm\\sqrt2$." },
      ],
    },
    {
      type: "quiz",
      id: "cq0-7-q3",
      variant: "practice",
      question: "The solutions of $9^x - 4 \\cdot 3^x + 3 = 0$ are",
      options: [
        { text: "$x = 0$ and $x = 1$", correct: true, feedback: "$t = 3^x$: $t^2 - 4t + 3 = 0$ gives $t = 1, 3$, so $x = 0, 1$." },
        { text: "$x = 1$ and $x = 3$", feedback: "Those are the values of $t = 3^x$, not of $x$." },
        { text: "$x = 1$ only", feedback: "$3^x = 1$ also gives $x = 0$." },
        { text: "No real solution", feedback: "$t = 1$ and $t = 3$ are both positive, so both give real $x$." },
      ],
      hint: "Write $9^x = (3^x)^2$ and put $t = 3^x$.",
    },
    {
      type: "numeric",
      id: "cq0-7-q4",
      variant: "practice",
      question: "Find the sum of all real solutions of $\\sqrt{x + 5} = x - 1$.",
      answer: 4,
      hint: "Square, solve, then substitute each candidate back.",
      solution: "$x + 5 = x^2 - 2x + 1 \\Rightarrow x^2 - 3x - 4 = 0 \\Rightarrow x = 4$ or $-1$. At $x = -1$ the right side is $-2 < 0$: rejected. Only $x = 4$ works ($\\sqrt9 = 3$), so the sum is $4$.",
      commonMistakes: [
        { answer: 3, feedback: "You kept the extraneous root $x = -1$. Check it in the original equation." },
        { answer: -1, feedback: "$x = -1$ gives $\\sqrt4 = 2$ on the left but $-2$ on the right." },
      ],
    },
    {
      type: "quiz",
      id: "cq0-7-q5",
      variant: "practice",
      question: "Which numbers satisfy $x^{2/3} + x^{1/3} - 2 = 0$ (real cube roots)? Select all that apply.",
      multiple: true,
      options: [
        { text: "$1$", correct: true, feedback: "$t = x^{1/3} = 1$ is a root of $t^2 + t - 2 = 0$." },
        { text: "$-8$", correct: true, feedback: "$t = -2$ is allowed because a cube root can be negative: $x = (-2)^3 = -8$." },
        { text: "$8$", feedback: "$8^{1/3} = 2$ gives $4 + 2 - 2 = 4 \\ne 0$." },
        { text: "$-2$", feedback: "$-2$ is a value of $t$, not of $x$: $x = t^3$." },
      ],
      hint: "Put $t = x^{1/3}$. Unlike $t = x^2$, here $t$ may be negative.",
    },
    {
      type: "numeric",
      id: "cq0-7-q6",
      variant: "practice",
      question: "Find the sum of the real roots of $(x - 1)(x - 2)(x - 3)(x - 4) = 15$.",
      answer: 5,
      hint: "Pair $(x - 1)(x - 4)$ and $(x - 2)(x - 3)$ and put $t = x^2 - 5x$.",
      solution: "$(t + 4)(t + 6) = 15 \\Rightarrow t^2 + 10t + 9 = 0 \\Rightarrow t = -1$ or $-9$. $x^2 - 5x + 1 = 0$ has $D = 21 > 0$ (two real roots, sum $5$). $x^2 - 5x + 9 = 0$ has $D = -11 < 0$. So the real roots sum to $5$.",
      commonMistakes: [
        { answer: 10, feedback: "That adds all four roots, but $x^2 - 5x + 9 = 0$ has no real roots." },
        { answer: 0, feedback: "Work it through: $t = -1$ gives two real roots." },
      ],
    },
    {
      type: "numeric",
      id: "cq0-7-q7",
      variant: "practice",
      question: "How many real roots does $x^4 - 4x^3 + 5x^2 - 4x + 1 = 0$ have?",
      answer: 2,
      hint: "It is reciprocal: divide by $x^2$ and put $t = x + \\frac1x$.",
      solution: "$t^2 - 2 - 4t + 5 = 0 \\Rightarrow t^2 - 4t + 3 = 0 \\Rightarrow t = 1$ or $3$. For real $x$, $\\lvert x + \\frac1x\\rvert \\ge 2$, so $t = 1$ gives nothing ($x^2 - x + 1 = 0$ has $D < 0$). $t = 3$ gives $x^2 - 3x + 1 = 0$, two real roots.",
      commonMistakes: [
        { answer: 4, feedback: "$x + \\frac1x = 1$ has no real solution: check $D$ of $x^2 - x + 1$." },
      ],
    },
    {
      type: "quiz",
      id: "cq0-7-q8",
      variant: "concept",
      question: "Squaring $\\sqrt{2x + 9} = x - 3$ gives the candidates $0$ and $8$. Why is $x = 0$ rejected?",
      options: [
        { text: "It solves $\\sqrt{2x + 9} = -(x - 3)$, the equation squaring merged with ours", correct: true, feedback: "Squaring merges $a = b$ and $a = -b$. At $x = 0$: $3 = -(-3)$, so it belongs to the other one." },
        { text: "$2x + 9$ is negative at $x = 0$", feedback: "$2(0) + 9 = 9 > 0$, so the root is defined." },
        { text: "Zero can never be a root of a radical equation", feedback: "Zero is a perfectly good root of, say, $\\sqrt{x + 4} = x + 2$." },
        { text: "Arithmetic error in the squaring", feedback: "The algebra is correct; the issue is that squaring is not reversible." },
      ],
      hint: "What equation does $x = 0$ actually satisfy? Compare the two sides' signs.",
    },
    {
      type: "numeric",
      id: "cq0-7-q9",
      variant: "practice",
      question: "JEE Main. Find the sum of all real $x$ satisfying $(x^2 - 5x + 5)^{x^2 + 4x - 60} = 1$.",
      answer: 3,
      hint: "A power equals 1 in three ways: exponent $0$ (base non-zero), base $1$, or base $-1$ with an even exponent.",
      solution: "Exponent $0$: $x^2 + 4x - 60 = 0$ gives $x = 6, -10$ (the base is non-zero at both).\n\nBase $1$: $x^2 - 5x + 4 = 0$ gives $x = 1, 4$.\n\nBase $-1$: $x^2 - 5x + 6 = 0$ gives $x = 2, 3$. The exponent is $-48$ at $x = 2$ (even, accepted) and $-39$ at $x = 3$ (odd, rejected).\n\nSum: $6 - 10 + 1 + 4 + 2 = 3$.",
      commonMistakes: [
        { answer: 6, feedback: "At $x = 3$ the base is $-1$ but the exponent $-39$ is odd, giving $-1$. Reject it." },
        { answer: 1, feedback: "You missed the base $-1$ case: $x = 2$ gives $(-1)^{-48} = 1$." },
        { answer: -4, feedback: "That is only the exponent-zero case. The base can also be $1$, or $-1$ with an even exponent." },
      ],
    },
    {
      type: "numeric",
      id: "cq0-7-q10",
      variant: "practice",
      question: "JEE Main. How many real $x$ satisfy $3^{2x^2 - 7x + 7} = 9$?",
      answer: 2,
      hint: "$9 = 3^2$, so compare exponents.",
      solution: "$2x^2 - 7x + 7 = 2 \\Rightarrow 2x^2 - 7x + 5 = 0 \\Rightarrow (x - 1)(2x - 5) = 0$, so $x = 1$ or $\\tfrac52$: two solutions.",
      commonMistakes: [
        { answer: 0, feedback: "Compare exponents: $2x^2 - 7x + 7 = 2$ has $D = 49 - 40 = 9 > 0$." },
        { answer: 1, feedback: "The quadratic $2x^2 - 7x + 5 = 0$ has two distinct roots." },
      ],
    },
    {
      type: "quiz",
      id: "cq0-7-q11",
      variant: "mastery",
      question: "JEE Advanced. The set of real solutions of $\\sqrt{x + 3 - 4\\sqrt{x - 1}} + \\sqrt{x + 8 - 6\\sqrt{x - 1}} = 1$ is",
      options: [
        { text: "every $x$ in $[5, 10]$", correct: true, feedback: "With $t = \\sqrt{x - 1}$: $x + 3 - 4t = (t - 2)^2$ and $x + 8 - 6t = (t - 3)^2$, so the equation is $\\lvert t - 2\\rvert + \\lvert t - 3\\rvert = 1$, true for $2 \\le t \\le 3$, i.e. $5 \\le x \\le 10$." },
        { text: "only $x = 5$ and $x = 10$", feedback: "Try $x = 7$: $t = \\sqrt6$ lies between 2 and 3, and the equation holds." },
        { text: "no real solution", feedback: "$x = 5$ gives $\\sqrt0 + \\sqrt1 = 1$." },
        { text: "only $x = 1$", feedback: "$x = 1$ gives $\\sqrt4 + \\sqrt9 = 5$." },
      ],
      hint: "Put $t = \\sqrt{x - 1}$, so $x = t^2 + 1$. Each expression under a root becomes a perfect square.",
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-0-mastery",
  title: "0.8 · Chapter 0 Mastery",
  position: 8,
  blocks: blocks([
    {
      type: "text",
      content:
        "This lesson has no formula sheet. Everything in Chapter 0 grows from two ideas: **completing the square** and **comparing coefficients** of $a(x - \\alpha)(x - \\beta)$. If you can rebuild the results below from those two, you own the chapter.",
    },
    { type: "heading", text: "Reconstruct it" },
    {
      type: "callout",
      variant: "tip",
      title: "Rebuild before you read on",
      content:
        "On paper, with nothing else in front of you:\n\n1. Complete the square on $ax^2 + bx + c = 0$ and derive the quadratic formula.\n2. From the formula, write the table: $D > 0$, $D = 0$, $D < 0$, and when the roots are rational.\n3. Expand $a(x - \\alpha)(x - \\beta)$ to get $\\alpha + \\beta$ and $\\alpha\\beta$.\n4. Express $\\alpha^3 + \\beta^3$ and $(\\alpha - \\beta)^2$ through them.\n5. State the rule for an equation whose roots are $g(\\alpha), g(\\beta)$.",
    },
    {
      type: "worked-example",
      id: "cq0-8-we1",
      title: "Worked example 1: the formula in four lines",
      problem: "Derive the roots of $ax^2 + bx + c = 0$, $a \\ne 0$.",
      steps: [
        { text: "Divide by $a$ and move the constant: $x^2 + \\frac bax = -\\frac ca$." },
        { text: "Add $\\left(\\frac{b}{2a}\\right)^2$ to both sides, the square of half the $x$ coefficient." },
        { latex: "\\left(x + \\frac b{2a}\\right)^2 = \\frac{b^2 - 4ac}{4a^2}" },
        { latex: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}" },
      ],
      answer: "$x = \\dfrac{-b \\pm \\sqrt{D}}{2a}$ with $D = b^2 - 4ac$, and the vertex form $a\\left(x + \\frac b{2a}\\right)^2 - \\frac{D}{4a}$ falls out on the way.",
    },
    {
      type: "table",
      headers: ["Idea", "One-line reason"],
      rows: [
        ["$D$ decides real / equal / non-real", "the vertex height is $-\\frac{D}{4a}$"],
        ["rational roots iff $D$ is a perfect square", "only $\\sqrt D$ can be irrational (rational $a, b, c$)"],
        ["$\\alpha + \\beta = -\\frac ba$, $\\alpha\\beta = \\frac ca$", "compare $a(x - \\alpha)(x - \\beta)$ with $ax^2 + bx + c$"],
        ["symmetric functions", "polynomials in $s$ and $p$"],
        ["$aS_n + bS_{n-1} + cS_{n-2} = 0$", "multiply $a\\alpha^2 + b\\alpha + c = 0$ by $\\alpha^{n-2}$"],
        ["roots $g(\\alpha)$", "substitute $g^{-1}(x)$ into the equation"],
        ["reducible equations", "substitute, solve, filter, check"],
      ],
    },
    { type: "heading", text: "Mastery problems" },
    {
      type: "numeric",
      id: "cq0-8-q1",
      variant: "mastery",
      question: "For $kx^2 + 2x + 3k = 0$ the sum of the roots equals their product. Find $k$.",
      answer: -0.6667,
      tolerance: 0.001,
      hint: "Sum $-\\frac{2}{k}$, product $\\frac{3k}{k} = 3$.",
      solution: "$-\\frac2k = 3 \\Rightarrow k = -\\frac23$.",
      commonMistakes: [
        { answer: 0.6667, tolerance: 0.001, feedback: "The sum is $-\\frac ba = -\\frac2k$; keep the minus sign." },
        { answer: 1.5, tolerance: 0.001, feedback: "Solve $-\\frac2k = 3$ for $k$: $k = -\\frac23$." },
      ],
    },
    {
      type: "quiz",
      id: "cq0-8-q2",
      variant: "mastery",
      question: "JEE Main (classic). $\\alpha, \\beta$ are the roots of $x^2 + px + q = 0$, and $\\alpha^4, \\beta^4$ are the roots of $x^2 - rx + s = 0$. The equation $x^2 - 4qx + 2q^2 - r = 0$ has",
      options: [
        { text: "two real roots, always", correct: true, feedback: "$r = \\alpha^4 + \\beta^4 = (p^2 - 2q)^2 - 2q^2$, so $D = 16q^2 - 4(2q^2 - r) = 8q^2 + 4r = 4(p^2 - 2q)^2 \\ge 0$." },
        { text: "two non-real roots, always", feedback: "Compute $D$: it simplifies to $4(p^2 - 2q)^2$, a square." },
        { text: "two negative roots, always", feedback: "The sum of its roots is $4q$, which can be positive." },
        { text: "one positive and one negative root, always", feedback: "The product $2q^2 - r = 4q^2 - (p^2 - 2q)^2$ can have either sign." },
      ],
      hint: "Write $r = \\alpha^4 + \\beta^4 = \\big((\\alpha + \\beta)^2 - 2\\alpha\\beta\\big)^2 - 2(\\alpha\\beta)^2$ with $\\alpha + \\beta = -p$ and $\\alpha\\beta = q$, then compute the discriminant.",
    },
    {
      type: "numeric",
      id: "cq0-8-q3",
      variant: "mastery",
      question: "$\\alpha, \\beta$ are the roots of $x^2 - 5x + 3 = 0$. Find $\\alpha^3 + \\beta^3$.",
      answer: 80,
      hint: "$\\alpha^3 + \\beta^3 = s^3 - 3ps$.",
      solution: "$125 - 3(3)(5) = 125 - 45 = 80$.",
      commonMistakes: [
        { answer: 116, feedback: "The correction is $3ps = 45$, not $3p = 9$." },
        { answer: 125, feedback: "Subtract the cross terms $3ps$." },
      ],
    },
    {
      type: "numeric",
      id: "cq0-8-q4",
      variant: "mastery",
      question: "$\\alpha, \\beta$ are the roots of $x^2 - 3x + 1 = 0$ and $S_n = \\alpha^n + \\beta^n$. Find $S_5$.",
      answer: 123,
      hint: "$S_n = 3S_{n-1} - S_{n-2}$ with $S_0 = 2$, $S_1 = 3$.",
      solution: "$S_2 = 7$, $S_3 = 18$, $S_4 = 47$, $S_5 = 3 \\times 47 - 18 = 123$.",
      commonMistakes: [
        { answer: 47, feedback: "That is $S_4$. One more step." },
        { answer: 159, feedback: "The recurrence subtracts $S_{n-2}$: $S_n = 3S_{n-1} - S_{n-2}$." },
      ],
    },
    {
      type: "quiz",
      id: "cq0-8-q5",
      variant: "mastery",
      question: "$\\alpha, \\beta$ are the roots of $x^2 - 3x + 2 = 0$. The equation with roots $2\\alpha + 1$ and $2\\beta + 1$ is",
      options: [
        { text: "$x^2 - 8x + 15 = 0$", correct: true, feedback: "Old roots $1, 2$; new roots $3, 5$. Or substitute $\\alpha = \\frac{x - 1}{2}$." },
        { text: "$x^2 - 7x + 10 = 0$", feedback: "That has roots $2, 5$. Apply $2\\alpha + 1$ to both roots." },
        { text: "$x^2 - 6x + 5 = 0$", feedback: "Doubling the roots doubles the sum to $6$, then adding $1$ to each root adds $2$ more." },
        { text: "$4x^2 - 8x + 3 = 0$", feedback: "That substitutes $2x - 1$ for $x$, giving roots $\\frac{\\alpha + 1}{2}$." },
      ],
      hint: "New root $x = 2\\alpha + 1$ means $\\alpha = \\frac{x - 1}{2}$.",
    },
    {
      type: "numeric",
      id: "cq0-8-q6",
      variant: "mastery",
      question: "Find the product of all real roots of $(x^2 + x)^2 - 8(x^2 + x) + 12 = 0$.",
      answer: 12,
      hint: "Put $t = x^2 + x$.",
      solution: "$t^2 - 8t + 12 = 0 \\Rightarrow t = 2$ or $6$. $x^2 + x - 2 = 0$ gives $1, -2$, and $x^2 + x - 6 = 0$ gives $2, -3$. Product $1 \\cdot (-2) \\cdot 2 \\cdot (-3) = 12$.",
      commonMistakes: [
        { answer: -12, feedback: "Recount the signs: two negative roots make the product positive." },
        { answer: 4, feedback: "Find all four roots: $t = 2$ and $t = 6$ each give two." },
      ],
    },
    {
      type: "quiz",
      id: "cq0-8-q7",
      variant: "mastery",
      question: "For $x^2 - 2(k - 1)x + k + 5 = 0$, which statements are true? Select all that apply.",
      multiple: true,
      options: [
        { text: "The roots are equal when $k = 4$", correct: true, feedback: "$\\frac D4 = (k - 1)^2 - (k + 5) = k^2 - 3k - 4 = (k - 4)(k + 1)$, which vanishes at $k = 4$." },
        { text: "The roots are equal when $k = -1$", correct: true, feedback: "$(k - 4)(k + 1) = 0$ at $k = -1$ too." },
        { text: "The roots are real and distinct when $k = 0$", feedback: "$\\frac D4 = (0 - 4)(0 + 1) = -4 < 0$." },
        { text: "There are no real roots when $k = 2$", correct: true, feedback: "$\\frac D4 = (-2)(3) = -6 < 0$." },
      ],
      hint: "Factorise $\\frac D4 = (k - 1)^2 - (k + 5)$ and test each value of $k$.",
    },
    {
      type: "numeric",
      id: "cq0-8-q8",
      variant: "mastery",
      question: "For how many integers $k$ with $1 \\le k \\le 10$ does $x^2 - 5x + k = 0$ have rational roots?",
      answer: 2,
      hint: "$D = 25 - 4k$ must be a non-negative perfect square.",
      solution: "$D = 25 - 4k \\ge 0$ needs $k \\le 6$. Checking $k = 1, \\dots, 6$: $D = 21, 17, 13, 9, 5, 1$. Perfect squares at $k = 4$ ($D = 9$) and $k = 6$ ($D = 1$): two values.",
      commonMistakes: [
        { answer: 6, feedback: "$D \\ge 0$ gives real roots for $k \\le 6$; rational needs a perfect square." },
        { answer: 1, feedback: "$D = 1$ (at $k = 6$) is also a perfect square." },
      ],
    },
    {
      type: "numeric",
      id: "cq0-8-q9",
      variant: "mastery",
      question: "JEE Main. $\\alpha, \\beta$ are the roots of $5x^2 + 6x - 2 = 0$ and $S_n = \\alpha^n + \\beta^n$. Find $5S_6 + 6S_5 - 2S_4$.",
      answer: 0,
      hint: "Multiply $5\\alpha^2 + 6\\alpha - 2 = 0$ by $\\alpha^4$.",
      solution: "$5\\alpha^6 + 6\\alpha^5 - 2\\alpha^4 = \\alpha^4(5\\alpha^2 + 6\\alpha - 2) = 0$, and likewise for $\\beta$. Adding gives $5S_6 + 6S_5 - 2S_4 = 0$.",
      commonMistakes: [
        { answer: 2, feedback: "Every term cancels exactly: this is Newton's recurrence with $n = 6$." },
      ],
    },
    {
      type: "quiz",
      id: "cq0-8-q10",
      variant: "mastery",
      question: "JEE Main. $p$ and $q$ are themselves the roots of $x^2 + px + q = 0$. Which pairs $(p, q)$ are possible? Select all that apply.",
      multiple: true,
      options: [
        { text: "$(1, -2)$", correct: true, feedback: "Sum: $1 + (-2) = -1 = -p$. Product: $1 \\cdot (-2) = -2 = q$." },
        { text: "$(0, 0)$", correct: true, feedback: "$x^2 = 0$ has the double root $0$, so $p = q = 0$ works." },
        { text: "$(-2, 1)$", feedback: "Sum $-1$ should equal $-p = 2$. It does not." },
        { text: "$(1, 1)$", feedback: "Product $1$ is fine, but the sum $2$ should equal $-p = -1$." },
      ],
      hint: "Vieta: $p + q = -p$ and $pq = q$. The second gives $q = 0$ or $p = 1$.",
    },
    {
      type: "numeric",
      id: "cq0-8-q11",
      variant: "mastery",
      question: "Find the sum of all real solutions of $\\sqrt{3x + 1} - \\sqrt{x - 1} = 2$.",
      answer: 6,
      hint: "Isolate one root, square, then put $u = \\sqrt{x - 1}$. Check each answer.",
      solution: "$\\sqrt{3x + 1} = 2 + \\sqrt{x - 1} \\Rightarrow 3x + 1 = x + 3 + 4\\sqrt{x - 1} \\Rightarrow x - 1 = 2\\sqrt{x - 1}$. With $u = \\sqrt{x - 1}$: $u^2 = 2u$, so $u = 0$ or $2$, i.e. $x = 1$ or $5$. Both check ($2 - 0 = 2$ and $4 - 2 = 2$). Sum $6$.",
      commonMistakes: [
        { answer: 5, feedback: "Dividing $u^2 = 2u$ by $u$ loses $u = 0$, i.e. $x = 1$, which does satisfy the equation." },
        { answer: 1, feedback: "$x = 5$ also works: $\\sqrt{16} - \\sqrt4 = 2$." },
      ],
    },
    {
      type: "quiz",
      id: "cq0-8-q12",
      variant: "mastery",
      question: "JEE Advanced. $\\alpha, \\beta$ are the roots of $ax^2 + bx + c = 0$ and $\\alpha + h, \\beta + h$ are the roots of $px^2 + qx + r = 0$. Then $h =$",
      options: [
        { text: "$\\dfrac12\\left(\\dfrac ba - \\dfrac qp\\right)$", correct: true, feedback: "Sums: $-\\frac qp = -\\frac ba + 2h$, so $h = \\frac12\\left(\\frac ba - \\frac qp\\right)$." },
        { text: "$\\dfrac12\\left(\\dfrac qp - \\dfrac ba\\right)$", feedback: "Sign check: shifting the roots up makes $-\\frac qp$ bigger than $-\\frac ba$." },
        { text: "$\\dfrac ba - \\dfrac qp$", feedback: "Both roots shift by $h$, so the sum shifts by $2h$." },
        { text: "$\\dfrac{c}{a} - \\dfrac rp$", feedback: "Products do not shift linearly: $(\\alpha + h)(\\beta + h) = \\alpha\\beta + hs + h^2$." },
      ],
      hint: "Compare the sums of roots of the two equations.",
    },
    {
      type: "numeric",
      id: "cq0-8-q13",
      variant: "mastery",
      question: "JEE Main. How many real roots does $e^{4x} + e^{3x} - 4e^{2x} + e^{x} + 1 = 0$ have?",
      answer: 1,
      hint: "Divide by $e^{2x}$ and put $t = e^x + e^{-x}$, noting $t \\ge 2$.",
      solution: "Dividing: $(e^{2x} + e^{-2x}) + (e^x + e^{-x}) - 4 = 0$, i.e. $t^2 - 2 + t - 4 = 0$, so $t^2 + t - 6 = 0$ and $t = 2$ or $-3$. Since $t \\ge 2$, only $t = 2$: $e^x + e^{-x} = 2$ forces $e^x = 1$, $x = 0$. Exactly one real root.",
      commonMistakes: [
        { answer: 2, feedback: "$t = -3$ is impossible because $e^x + e^{-x} \\ge 2$." },
        { answer: 4, feedback: "A quartic in $e^x$ can have up to four roots, but here $e^x = 1$ (a double root) is the only positive one." },
      ],
    },
    {
      type: "quiz",
      id: "cq0-8-q14",
      variant: "mastery",
      question: "JEE Main. $(a^2 - 5a + 6)x^2 + (a^2 - 3a + 2)x + (a^2 - 4) = 0$ is satisfied by more than two values of $x$. Then $a =$",
      options: [
        { text: "$2$", correct: true, feedback: "$(a - 2)(a - 3)$, $(a - 1)(a - 2)$ and $(a - 2)(a + 2)$ all vanish at $a = 2$: the equation becomes $0 = 0$." },
        { text: "$3$", feedback: "At $a = 3$ the middle coefficient is $2 \\ne 0$." },
        { text: "$1$", feedback: "At $a = 1$ the leading coefficient is $2 \\ne 0$." },
        { text: "$-2$", feedback: "At $a = -2$ the leading coefficient is $20$." },
      ],
      hint: "More than two roots forces an identity: every coefficient must be zero.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Where next",
      content:
        "So far we have solved quadratic **equations**. Chapter 1 studies the quadratic **expression** $ax^2 + bx + c$ as a function: its graph, its sign for every $x$, its least or greatest value, and exactly where its roots sit relative to given numbers. Those questions are the backbone of JEE parameter problems, and every one of them is answered by the parabola you have been drawing here.",
    },
  ]),
};

export const cqChapter0Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lesson07,
  lessonMastery,
];
