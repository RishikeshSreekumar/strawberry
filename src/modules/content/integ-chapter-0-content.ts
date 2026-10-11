import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Integral Calculus Chapter 0 — Antiderivatives.
 * Integration as differentiation run backwards: antiderivatives and the
 * constant of integration (a family of curves), the standard integrals
 * table read off the derivative table, linearity and algebraic rewriting,
 * trigonometric rewriting with identities, and initial value problems
 * that pin down one member of the family. Seeded by
 * scripts/seed-integral-calculus.ts; outline in integ_course.md.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "undoing-the-derivative",
  title: "0.1 · Undoing the Derivative",
  position: 1,
  blocks: blocks([
    {
      type: "text",
      content:
        "A car's speedometer is recorded every instant of a trip, but the odometer is broken. The record says the speed was $v(t) = 2t$ metres per second. How far has the car gone after $t$ seconds?\n\nDifferential calculus answers the opposite question: given the position $s(t)$, find the speed $s'(t)$. Here we know the speed and want the position. We need a function whose derivative is $2t$. A moment's thought gives $s(t) = t^2$, because $\\frac{d}{dt}t^2 = 2t$. That reverse question, \"what was differentiated to give this?\", is the whole of this chapter.",
    },
    { type: "heading", text: "Running differentiation backwards" },
    {
      type: "text",
      content:
        "Every derivative fact can be read in reverse. Since $\\frac{d}{dx}x^3 = 3x^2$, the function $x^3$ is something whose derivative is $3x^2$. Since $\\frac{d}{dx}\\sin x = \\cos x$, the function $\\sin x$ is something whose derivative is $\\cos x$. We give the reversed function a name.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Antiderivative",
      content:
        "A function $F$ is an **antiderivative** (or primitive) of $f$ on an interval $I$ if $F'(x) = f(x)$ for every $x$ in $I$.\nExample: $x^3$ is an antiderivative of $3x^2$ on $\\mathbb{R}$; $\\sin x$ is an antiderivative of $\\cos x$.",
    },
    { type: "heading", text: "Why there is always a plus C" },
    {
      type: "text",
      content:
        "Back to the car. $s(t) = t^2$ works, but so does $s(t) = t^2 + 5$: a car that started 5 m down the road has the same speedometer record. The derivative of a constant is $0$, so adding any constant to an antiderivative gives another antiderivative.\n\nThe converse is the important half: on an interval, these are the **only** antiderivatives. If $F' = f$ and $G' = f$, then $(G - F)' = 0$ everywhere on the interval, and by the mean value theorem a function with zero derivative on an interval is constant. So $G = F + C$ for some constant $C$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the antiderivative is unique\"",
      content:
        "A function has infinitely many antiderivatives, one for each value of the constant. $x^2$, $x^2 + 1$ and $x^2 - \\pi$ are all antiderivatives of $2x$. Writing \"the antiderivative of $2x$ is $x^2$\" loses information: the answer is the whole family $x^2 + C$. Two antiderivatives can look completely different and still differ only by a constant: $\\sin^2 x$ and $-\\cos^2 x$ are both antiderivatives of $\\sin 2x$, and $\\sin^2 x - (-\\cos^2 x) = 1$.",
    },
    { type: "heading", text: "The integral sign" },
    {
      type: "text",
      content:
        "The family of all antiderivatives of $f$ is written with an elongated S, the **integral sign**:",
    },
    { type: "math", latex: "\\int f(x)\\,dx = F(x) + C \\quad\\text{means}\\quad F'(x) = f(x)" },
    {
      type: "text",
      content:
        "The function $f(x)$ is the **integrand**, $dx$ says that $x$ is the variable, and $C$ is the **constant of integration**. The object $\\int f(x)\\,dx$ is called the **indefinite integral** of $f$.\n\nThe definition gives a built-in check that you should use every time: **differentiate your answer**. If you get the integrand back, the answer is right. Integration is guesswork made systematic; differentiation is how you check the guess.",
    },
    {
      type: "math",
      latex: "\\frac{d}{dx}\\int f(x)\\,dx = f(x) \\qquad\\qquad \\int f'(x)\\,dx = f(x) + C",
    },
    { type: "heading", text: "A family of curves" },
    {
      type: "text",
      content:
        "Geometrically, $\\int 2x\\,dx = x^2 + C$ is not one curve but a stack of parabolas, each a vertical shift of the next. At any fixed $x$, every member of the stack has the same slope $2x$, so their tangents are parallel. The slope field below draws a short dash of slope $2x$ at each point; every antiderivative is a curve that follows the dashes.",
    },
    {
      type: "interactive",
      config: {
        component: "integ-slope-field",
        expr: "2*x",
        exprLatex: "2x",
        window: { xmin: -3, xmax: 3, ymin: -4, ymax: 6 },
        x0: { min: -2.5, max: 2.5, step: 0.1, initial: 1 },
        y0: { min: -3, max: 5, step: 0.1, initial: 2 },
        curves: [
          { x: 0, y: -2 },
          { x: 0, y: 0 },
          { x: 0, y: 2 },
        ],
        caption:
          "Every dash in a vertical column has the same slope, because $\\frac{dy}{dx} = 2x$ ignores $y$. So every solution curve is the parabola $y = x^2$ shifted up or down: the $+C$. Drag the start point and watch which member of the family you get.",
      },
    },
    {
      type: "callout",
      variant: "tip",
      content:
        "Choosing a point on the curve picks out one member of the family. The parabola through $(1, 2)$ is $y = x^2 + 1$; the one through $(0, -2)$ is $y = x^2 - 2$. Lesson 0.5 turns this into a method.",
    },
    { type: "heading", text: "Worked examples" },
    {
      type: "worked-example",
      id: "integ0-1-we1",
      title: "Worked example 1: guess and check",
      problem: "Find $\\displaystyle\\int 3x^2\\,dx$.",
      steps: [
        { text: "Ask: what did I differentiate to get $3x^2$? Differentiating $x^3$ gives $3x^2$. *Why this step:* every integral starts as a question about derivatives." },
        { text: "Check by differentiating the guess plus a constant:", latex: "\\frac{d}{dx}\\left(x^3 + C\\right) = 3x^2 \\;\\checkmark" },
      ],
      answer: "$\\displaystyle\\int 3x^2\\,dx = x^3 + C$",
    },
    {
      type: "worked-example",
      id: "integ0-1-we2",
      title: "Worked example 2: two answers that look different",
      problem: "Show that $F(x) = \\sin^2 x$ and $G(x) = -\\cos^2 x$ are both antiderivatives of $\\sin 2x$, and find $F - G$.",
      steps: [
        { text: "Differentiate $F$ with the chain rule:", latex: "F'(x) = 2\\sin x\\cos x = \\sin 2x" },
        { text: "Differentiate $G$:", latex: "G'(x) = -2\\cos x\\cdot(-\\sin x) = 2\\sin x\\cos x = \\sin 2x" },
        { text: "So both are antiderivatives, and they must differ by a constant:", latex: "F(x) - G(x) = \\sin^2 x + \\cos^2 x = 1" },
        { text: "*Why this step:* when your answer disagrees with the book, check whether the difference is a constant before assuming you are wrong." },
      ],
      answer: "Both work; $F - G = 1$, a constant.",
    },
    {
      type: "worked-example",
      id: "integ0-1-we3",
      title: "Worked example 3: one member of the family",
      problem: "Among the antiderivatives of $2x$, find the one whose graph passes through $(1, 5)$.",
      steps: [
        { text: "General antiderivative: $F(x) = x^2 + C$." },
        { text: "Use the point: $F(1) = 1 + C = 5$, so $C = 4$. *Why this step:* the point is one equation, enough to fix one unknown constant." },
      ],
      answer: "$F(x) = x^2 + 4$",
    },
    {
      type: "worked-example",
      id: "integ0-1-we4",
      title: "Worked example 4: checking a book answer",
      problem: "A table claims $\\displaystyle\\int x\\cos x\\,dx = x\\sin x + \\cos x + C$. Verify it.",
      steps: [
        { text: "Differentiate the right-hand side with the product rule:", latex: "\\frac{d}{dx}\\left(x\\sin x + \\cos x\\right) = \\sin x + x\\cos x - \\sin x" },
        { text: "The $\\sin x$ terms cancel, leaving $x\\cos x$. *Why this step:* you cannot yet find this integral (it needs integration by parts, Chapter 2), but you can already check it." },
      ],
      answer: "Correct: the derivative is $x\\cos x$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "integ0-1-q1",
      variant: "practice",
      question: "Which of these is an antiderivative of $4x^3$?",
      options: [
        { text: "$x^4 + 7$", correct: true, feedback: "$\\frac{d}{dx}(x^4 + 7) = 4x^3$. The $7$ is a perfectly good value of $C$." },
        { text: "$12x^2$", feedback: "That is the derivative of $4x^3$. We want the function whose derivative is $4x^3$." },
        { text: "$\\dfrac{x^4}{4}$", feedback: "Its derivative is $x^3$, not $4x^3$." },
        { text: "$4x^4$", feedback: "Its derivative is $16x^3$." },
      ],
      hint: "Differentiate each option and see which gives $4x^3$.",
    },
    {
      type: "numeric",
      id: "integ0-1-q2",
      variant: "practice",
      question: "$F$ is an antiderivative of $f(x) = 2x$ with $F(0) = 3$. Find $F(2)$.",
      answer: 7,
      hint: "Write $F(x) = x^2 + C$ and use $F(0) = 3$.",
      solution: "$F(x) = x^2 + C$ and $F(0) = C = 3$, so $F(x) = x^2 + 3$ and $F(2) = 7$.",
      commonMistakes: [{ answer: 4, feedback: "You dropped the constant. $F(0) = 3$ forces $C = 3$." }],
    },
    {
      type: "quiz",
      id: "integ0-1-q3",
      variant: "concept",
      question: "$F$ and $G$ are both antiderivatives of the same function $f$ on an interval. What can you say about $F - G$?",
      options: [
        { text: "It is a constant", correct: true, feedback: "$(F - G)' = f - f = 0$ on the interval, so $F - G$ is constant (mean value theorem)." },
        { text: "It is always $0$", feedback: "$x^2$ and $x^2 + 1$ are both antiderivatives of $2x$; their difference is $1$." },
        { text: "It equals $f$", feedback: "Differentiate $F - G$: you get $f - f = 0$, not $f$." },
        { text: "It can be any function", feedback: "Its derivative is zero on an interval, which pins it down to a constant." },
      ],
      hint: "Differentiate $F - G$.",
    },
    {
      type: "quiz",
      id: "integ0-1-q4",
      variant: "practice",
      multiple: true,
      question: "Select **all** the antiderivatives of $\\sin 2x$.",
      options: [
        { text: "$\\sin^2 x$", correct: true, feedback: "$2\\sin x\\cos x = \\sin 2x$." },
        { text: "$-\\cos^2 x$", correct: true, feedback: "$-2\\cos x(-\\sin x) = \\sin 2x$." },
        { text: "$-\\tfrac12\\cos 2x$", correct: true, feedback: "$-\\tfrac12\\cdot(-2\\sin 2x) = \\sin 2x$." },
        { text: "$\\tfrac12\\cos 2x$", feedback: "Its derivative is $-\\sin 2x$: wrong sign." },
        { text: "$-2\\cos 2x$", feedback: "Its derivative is $4\\sin 2x$: the chain-rule factor goes the other way." },
      ],
      hint: "Differentiate each option. Different-looking answers can differ by a constant.",
    },
    {
      type: "quiz",
      id: "integ0-1-q5",
      variant: "concept",
      question: "$\\dfrac{d}{dx}\\displaystyle\\int f(x)\\,dx = $",
      options: [
        { text: "$f(x)$", correct: true, feedback: "The integral is a function whose derivative is $f$; differentiating it gives $f$ back, and the constant disappears." },
        { text: "$f(x) + C$", feedback: "The derivative of $F(x) + C$ is $f(x)$; the constant differentiates to $0$." },
        { text: "$f'(x)$", feedback: "Integration and differentiation undo each other; you end with $f$, not $f'$." },
        { text: "$F(x)$", feedback: "$F$ is the antiderivative; its derivative is $f$." },
      ],
      hint: "By definition, $\\int f\\,dx$ is a function whose derivative is $f$.",
    },
    {
      type: "numeric",
      id: "integ0-1-q6",
      variant: "practice",
      question: "$F$ is an antiderivative of $6x^2 + 2$ whose graph passes through $(1, 4)$. Find $F(2)$.",
      answer: 20,
      hint: "$F(x) = 2x^3 + 2x + C$. Use $F(1) = 4$.",
      solution: "$F(1) = 2 + 2 + C = 4$ gives $C = 0$, so $F(x) = 2x^3 + 2x$ and $F(2) = 16 + 4 = 20$.",
      commonMistakes: [{ answer: 26, feedback: "That is the integrand at $x = 2$, $6(4) + 2$. Integrate first." }],
    },
    {
      type: "quiz",
      id: "integ0-1-q7",
      variant: "concept",
      question: "$\\displaystyle\\int f'(x)\\,dx = $",
      options: [
        { text: "$f(x) + C$", correct: true, feedback: "$f$ is a function whose derivative is $f'$, and so is $f + C$." },
        { text: "$f(x)$", feedback: "Close, but an indefinite integral is a family: you need the $+C$." },
        { text: "$f''(x) + C$", feedback: "Integrating undoes a derivative; it does not add one." },
        { text: "$f'(x) + C$", feedback: "The derivative of $f'(x) + C$ is $f''(x)$, not $f'(x)$." },
      ],
      hint: "What function has derivative $f'$?",
    },
    {
      type: "quiz",
      id: "integ0-1-q8",
      variant: "practice",
      question: "If $\\displaystyle\\int f(x)\\,dx = xe^x - e^x + C$, then $f(x) = $",
      options: [
        { text: "$xe^x$", correct: true, feedback: "$\\frac{d}{dx}(xe^x - e^x) = e^x + xe^x - e^x = xe^x$." },
        { text: "$e^x$", feedback: "Differentiate carefully: the product rule on $xe^x$ gives two terms." },
        { text: "$xe^x - e^x$", feedback: "That is the antiderivative itself; $f$ is its derivative." },
        { text: "$(x + 1)e^x$", feedback: "That is the derivative of $xe^x$ alone; you forgot to differentiate $-e^x$." },
      ],
      hint: "$f$ is the derivative of the right-hand side.",
    },
    {
      type: "numeric",
      id: "integ0-1-q9",
      variant: "practice",
      question: "The curve $y = F(x)$, where $F'(x) = 2x + 3$, passes through $(1, 2)$. Find $F(0)$.",
      answer: -2,
      hint: "$F(x) = x^2 + 3x + C$; use the point to find $C$.",
      solution: "$F(1) = 1 + 3 + C = 2$ gives $C = -2$, so $F(0) = -2$.",
      commonMistakes: [{ answer: 2, feedback: "Check the sign of $C$: $4 + C = 2$ means $C = -2$." }],
    },
    {
      type: "quiz",
      id: "integ0-1-q10",
      variant: "practice",
      multiple: true,
      question:
        "$F$ and $G$ are antiderivatives of $f(x) = 3x^2$ on $\\mathbb{R}$ with $F(0) = 1$ and $G(1) = 3$. Select **all** the true statements.",
      options: [
        { text: "$F(1) = 2$", correct: true, feedback: "$F(x) = x^3 + 1$." },
        { text: "$G(x) - F(x) = 1$ for every $x$", correct: true, feedback: "$G(x) = x^3 + 2$, so $G - F = 1$." },
        { text: "$G(0) = 2$", correct: true, feedback: "$G(0) = 0 + 2$." },
        { text: "$F(2) = 8$", feedback: "$F(2) = 8 + 1 = 9$. Keep the constant." },
        { text: "The graphs of $F$ and $G$ cross somewhere", feedback: "They are vertical shifts of each other by 1, so they never meet." },
      ],
      hint: "Write $F = x^3 + C_1$, $G = x^3 + C_2$ and fix each constant.",
    },
    {
      type: "numeric",
      id: "integ0-1-q11",
      variant: "practice",
      question:
        "A curve $y = F(x)$ has $F'(x) = 2x - 4$, and the least value of $F$ is $3$. Find $F(0)$.",
      answer: 7,
      hint: "$F(x) = x^2 - 4x + C$. Where is its minimum?",
      solution: "$F(x) = x^2 - 4x + C$ is least where $F'(x) = 0$, at $x = 2$: $F(2) = 4 - 8 + C = C - 4 = 3$, so $C = 7$ and $F(0) = 7$.",
      commonMistakes: [{ answer: 3, feedback: "$3$ is the least value, reached at $x = 2$, not at $x = 0$." }],
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "standard-integrals",
  title: "0.2 · The Standard Integrals Table",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "You already own an integral table: it is the derivative table, read from right to left. Every time you learned \"the derivative of $\\sin x$ is $\\cos x$\" you also learned \"an antiderivative of $\\cos x$ is $\\sin x$\". This lesson turns the derivative table around, fixes the constants so each row reads cleanly, and deals with the two rows that need care: the power rule at $n = -1$, and the logarithm.",
    },
    { type: "heading", text: "The power rule backwards" },
    {
      type: "text",
      content:
        "Differentiating $x^{n+1}$ gives $(n+1)x^n$. That is $x^n$ with an unwanted factor $n + 1$, so divide it out: $\\frac{d}{dx}\\frac{x^{n+1}}{n+1} = x^n$. In words: **raise the power by one, then divide by the new power.**",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Power rule for integrals",
      content:
        "$\\displaystyle\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C$ for every real $n \\ne -1$.\nIt covers roots and reciprocals: $\\int\\sqrt x\\,dx = \\frac23x^{3/2} + C$, $\\int\\frac{dx}{x^2} = -\\frac1x + C$.",
    },
    { type: "heading", text: "The gap at n = -1: the logarithm" },
    {
      type: "text",
      content:
        "At $n = -1$ the formula asks you to divide by $0$: it fails. Yet $\\frac1x$ certainly has an antiderivative, since $\\frac{d}{dx}\\ln x = \\frac1x$. The logarithm fills exactly the gap the power rule leaves.\n\nOne more detail. $\\ln x$ only exists for $x > 0$, but $\\frac1x$ lives on $x < 0$ too. For $x < 0$ try $\\ln(-x)$: by the chain rule its derivative is $\\frac{1}{-x}\\cdot(-1) = \\frac1x$. Both cases are captured by one formula with a modulus.",
    },
    { type: "math", latex: "\\int\\frac{dx}{x} = \\ln\\lvert x\\rvert + C \\qquad (x \\ne 0)" },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"$\\int x^{-1}\\,dx = \\frac{x^0}{0}$\"",
      content:
        "The power rule needs $n \\ne -1$. At $n = -1$ it divides by zero, and the true answer is $\\ln\\lvert x\\rvert + C$, not a power at all. Also keep the modulus: $\\ln x$ alone is undefined for the negative half of the domain of $\\frac1x$.",
    },
    { type: "heading", text: "The full table" },
    {
      type: "text",
      content:
        "Each row below is one row of the derivative table reversed. Cover the middle column and rebuild it from the derivatives you know; that is the only way to remember it under exam pressure.",
    },
    {
      type: "table",
      headers: ["Derivative fact", "Integral", "Notes"],
      rows: [
        ["$\\frac{d}{dx}\\frac{x^{n+1}}{n+1} = x^n$", "$\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C$", "$n \\ne -1$"],
        ["$\\frac{d}{dx}\\ln\\lvert x\\rvert = \\frac1x$", "$\\int\\frac{dx}{x} = \\ln\\lvert x\\rvert + C$", "$x \\ne 0$"],
        ["$\\frac{d}{dx}e^x = e^x$", "$\\int e^x\\,dx = e^x + C$", ""],
        ["$\\frac{d}{dx}a^x = a^x\\ln a$", "$\\int a^x\\,dx = \\frac{a^x}{\\ln a} + C$", "$a > 0$, $a \\ne 1$"],
        ["$\\frac{d}{dx}\\sin x = \\cos x$", "$\\int\\cos x\\,dx = \\sin x + C$", ""],
        ["$\\frac{d}{dx}\\cos x = -\\sin x$", "$\\int\\sin x\\,dx = -\\cos x + C$", "minus sign"],
        ["$\\frac{d}{dx}\\tan x = \\sec^2 x$", "$\\int\\sec^2 x\\,dx = \\tan x + C$", ""],
        ["$\\frac{d}{dx}\\cot x = -\\csc^2 x$", "$\\int\\csc^2 x\\,dx = -\\cot x + C$", "minus sign"],
        ["$\\frac{d}{dx}\\sec x = \\sec x\\tan x$", "$\\int\\sec x\\tan x\\,dx = \\sec x + C$", ""],
        ["$\\frac{d}{dx}\\csc x = -\\csc x\\cot x$", "$\\int\\csc x\\cot x\\,dx = -\\csc x + C$", "minus sign"],
        ["$\\frac{d}{dx}\\sin^{-1}x = \\frac{1}{\\sqrt{1 - x^2}}$", "$\\int\\frac{dx}{\\sqrt{1 - x^2}} = \\sin^{-1}x + C$", "$\\lvert x\\rvert < 1$"],
        ["$\\frac{d}{dx}\\tan^{-1}x = \\frac{1}{1 + x^2}$", "$\\int\\frac{dx}{1 + x^2} = \\tan^{-1}x + C$", ""],
        ["$\\frac{d}{dx}\\sec^{-1}x = \\frac{1}{x\\sqrt{x^2 - 1}}$", "$\\int\\frac{dx}{x\\sqrt{x^2 - 1}} = \\sec^{-1}x + C$", "$x > 1$"],
      ],
    },
    {
      type: "callout",
      variant: "tip",
      content:
        "The co-functions carry the minus signs, exactly as in the derivative table. Since $\\frac{d}{dx}\\cos^{-1}x = -\\frac{1}{\\sqrt{1 - x^2}}$, the answer $-\\cos^{-1}x + C$ is just as correct as $\\sin^{-1}x + C$: the two differ by the constant $\\frac\\pi2$.",
    },
    { type: "heading", text: "A linear inside: f(ax + b)" },
    {
      type: "text",
      content:
        "If $\\int f(x)\\,dx = F(x) + C$, what is $\\int f(3x + 1)\\,dx$? Guess $F(3x + 1)$ and differentiate: the chain rule gives $3f(3x + 1)$, three times too big. So divide by $3$. In general:",
    },
    { type: "math", latex: "\\int f(ax + b)\\,dx = \\frac1a F(ax + b) + C \\qquad (a \\ne 0)" },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"$\\int e^{2x}\\,dx = e^{2x} + C$\"",
      content:
        "Differentiate $e^{2x}$: you get $2e^{2x}$, twice the integrand. The chain rule multiplies by the inner derivative, so integration must **divide** by it: $\\int e^{2x}\\,dx = \\frac12e^{2x} + C$. This only works when the inside is linear; $\\int e^{x^2}\\,dx$ is a different story.",
    },
    { type: "heading", text: "Worked examples" },
    {
      type: "worked-example",
      id: "integ0-2-we1",
      title: "Worked example 1: powers in disguise",
      problem: "Find $\\displaystyle\\int\\frac{dx}{x^3}$ and $\\displaystyle\\int\\sqrt{x}\\,dx$.",
      steps: [
        { text: "Write each as a power of $x$: $\\frac{1}{x^3} = x^{-3}$ and $\\sqrt x = x^{1/2}$. *Why this step:* the power rule only sees exponents." },
        { text: "Raise the power by one and divide by the new power:", latex: "\\int x^{-3}\\,dx = \\frac{x^{-2}}{-2} + C = -\\frac{1}{2x^2} + C" },
        { latex: "\\int x^{1/2}\\,dx = \\frac{x^{3/2}}{3/2} + C = \\frac23x^{3/2} + C" },
      ],
      answer: "$-\\dfrac{1}{2x^2} + C$ and $\\dfrac23x^{3/2} + C$",
    },
    {
      type: "worked-example",
      id: "integ0-2-we2",
      title: "Worked example 2: the logarithm on the negative side",
      problem: "$F$ is an antiderivative of $\\frac1x$ on $x < 0$ with $F(-1) = 0$. Find $F(-e)$.",
      steps: [
        { text: "On $x < 0$, $F(x) = \\ln\\lvert x\\rvert + C = \\ln(-x) + C$. *Why this step:* the modulus formula is the one valid for negative $x$." },
        { text: "$F(-1) = \\ln 1 + C = C = 0$." },
        { text: "So $F(-e) = \\ln e = 1$." },
      ],
      answer: "$F(-e) = 1$",
    },
    {
      type: "worked-example",
      id: "integ0-2-we3",
      title: "Worked example 3: linear insides",
      problem: "Find $\\displaystyle\\int e^{3x + 1}\\,dx$ and $\\displaystyle\\int\\cos(2x - 1)\\,dx$.",
      steps: [
        { text: "Integrate the outer function as if the inside were $x$, then divide by the coefficient of $x$:", latex: "\\int e^{3x + 1}\\,dx = \\frac13e^{3x + 1} + C" },
        { latex: "\\int\\cos(2x - 1)\\,dx = \\frac12\\sin(2x - 1) + C" },
        { text: "Check the second: $\\frac{d}{dx}\\frac12\\sin(2x - 1) = \\frac12\\cdot2\\cos(2x - 1)$. *Why this step:* the chain-rule factor $2$ cancels the $\\frac12$, which is the whole point of dividing." },
      ],
      answer: "$\\frac13e^{3x + 1} + C$ and $\\frac12\\sin(2x - 1) + C$",
    },
    {
      type: "worked-example",
      id: "integ0-2-we4",
      title: "Worked example 4: an exponential with another base",
      problem: "Find $\\displaystyle\\int 2^x\\,dx$.",
      steps: [
        { text: "From $\\frac{d}{dx}2^x = 2^x\\ln 2$, the function $2^x$ differentiates to $\\ln 2$ times itself. *Why this step:* reverse the derivative fact and divide out the unwanted constant." },
        { latex: "\\int 2^x\\,dx = \\frac{2^x}{\\ln 2} + C" },
      ],
      answer: "$\\dfrac{2^x}{\\ln 2} + C$",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "integ0-2-q1",
      variant: "practice",
      question: "$\\displaystyle\\int x^5\\,dx = $",
      options: [
        { text: "$\\dfrac{x^6}{6} + C$", correct: true, feedback: "Raise the power to 6, divide by 6." },
        { text: "$5x^4 + C$", feedback: "That is the derivative of $x^5$." },
        { text: "$x^6 + C$", feedback: "Its derivative is $6x^5$; divide by the new power." },
        { text: "$\\dfrac{x^6}{5} + C$", feedback: "Divide by the new power, $6$, not the old one." },
      ],
      hint: "Raise the power by one, divide by the new power.",
    },
    {
      type: "quiz",
      id: "integ0-2-q2",
      variant: "concept",
      question: "Which is the correct antiderivative of $\\frac1x$ on its whole domain $x \\ne 0$?",
      options: [
        { text: "$\\ln\\lvert x\\rvert + C$", correct: true, feedback: "For $x > 0$ it is $\\ln x$; for $x < 0$ it is $\\ln(-x)$, whose derivative is also $\\frac1x$." },
        { text: "$\\ln x + C$", feedback: "Only valid for $x > 0$; $\\ln x$ does not exist for negative $x$." },
        { text: "$\\dfrac{x^0}{0} + C$", feedback: "The power rule fails at $n = -1$: it divides by zero." },
        { text: "$-\\dfrac{1}{x^2} + C$", feedback: "That is the derivative of $\\frac1x$, not its antiderivative." },
      ],
      hint: "Differentiate $\\ln(-x)$ for $x < 0$.",
    },
    {
      type: "numeric",
      id: "integ0-2-q3",
      variant: "practice",
      question: "If $\\displaystyle\\int\\frac{dx}{\\sqrt x} = k\\sqrt x + C$, find $k$.",
      answer: 2,
      hint: "$\\frac{1}{\\sqrt x} = x^{-1/2}$.",
      solution: "$\\int x^{-1/2}\\,dx = \\frac{x^{1/2}}{1/2} = 2\\sqrt x$, so $k = 2$.",
      commonMistakes: [{ answer: 0.5, feedback: "Dividing by $\\frac12$ doubles: $\\frac{x^{1/2}}{1/2} = 2x^{1/2}$." }],
    },
    {
      type: "quiz",
      id: "integ0-2-q4",
      variant: "practice",
      question: "$\\displaystyle\\int e^{2x}\\,dx = $",
      options: [
        { text: "$\\tfrac12e^{2x} + C$", correct: true, feedback: "Divide by the inner coefficient $2$." },
        { text: "$e^{2x} + C$", feedback: "Its derivative is $2e^{2x}$." },
        { text: "$2e^{2x} + C$", feedback: "Its derivative is $4e^{2x}$: you multiplied where you should divide." },
        { text: "$\\dfrac{e^{2x + 1}}{2x + 1} + C$", feedback: "The power rule applies to $x^n$, not to $e^{\\text{something}}$." },
      ],
      hint: "Use $\\int f(ax + b)\\,dx = \\frac1aF(ax + b)$.",
    },
    {
      type: "quiz",
      id: "integ0-2-q5",
      variant: "practice",
      question: "$\\displaystyle\\int\\sec x\\tan x\\,dx = $",
      options: [
        { text: "$\\sec x + C$", correct: true, feedback: "$\\frac{d}{dx}\\sec x = \\sec x\\tan x$." },
        { text: "$\\tan x + C$", feedback: "The derivative of $\\tan x$ is $\\sec^2 x$." },
        { text: "$\\dfrac{\\sec^2 x}{2} + C$", feedback: "Its derivative is $\\sec^2 x\\tan x$." },
        { text: "$-\\csc x + C$", feedback: "That integrates $\\csc x\\cot x$." },
      ],
      hint: "Which function has derivative $\\sec x\\tan x$?",
    },
    {
      type: "quiz",
      id: "integ0-2-q6",
      variant: "practice",
      multiple: true,
      question: "Select **all** the correct statements.",
      options: [
        { text: "$\\int\\csc^2 x\\,dx = -\\cot x + C$", correct: true, feedback: "$\\frac{d}{dx}(-\\cot x) = \\csc^2 x$." },
        { text: "$\\int\\frac{dx}{1 + x^2} = \\tan^{-1}x + C$", correct: true, feedback: "Straight from $\\frac{d}{dx}\\tan^{-1}x$." },
        { text: "$\\int\\frac{dx}{\\sqrt{1 - x^2}} = -\\cos^{-1}x + C$", correct: true, feedback: "$\\frac{d}{dx}(-\\cos^{-1}x) = \\frac{1}{\\sqrt{1 - x^2}}$. It differs from $\\sin^{-1}x$ by the constant $\\frac\\pi2$." },
        { text: "$\\int 3^x\\,dx = 3^x\\ln 3 + C$", feedback: "That is the derivative of $3^x$. The integral divides by $\\ln 3$." },
        { text: "$\\int\\sin x\\,dx = \\cos x + C$", feedback: "$\\frac{d}{dx}\\cos x = -\\sin x$, so the answer is $-\\cos x + C$." },
      ],
      hint: "Differentiate each right-hand side.",
    },
    {
      type: "numeric",
      id: "integ0-2-q7",
      variant: "practice",
      question: "If $\\displaystyle\\int\\sin\\frac x2\\,dx = A\\cos\\frac x2 + C$, find $A$.",
      answer: -2,
      hint: "$\\int\\sin x\\,dx = -\\cos x$; then divide by the inner coefficient $\\frac12$.",
      solution: "$\\int\\sin\\frac x2\\,dx = \\frac{1}{1/2}\\left(-\\cos\\frac x2\\right) = -2\\cos\\frac x2$, so $A = -2$.",
      commonMistakes: [
        { answer: 2, feedback: "The integral of $\\sin$ is $-\\cos$: keep the minus sign." },
        { answer: -0.5, feedback: "Divide by the inner coefficient $\\frac12$, which multiplies by $2$." },
      ],
    },
    {
      type: "numeric",
      id: "integ0-2-q8",
      variant: "practice",
      question: "$F$ is an antiderivative of $\\dfrac{1}{2x + 1}$ on $x > -\\frac12$ with $F(0) = 0$. Find $F\\!\\left(\\dfrac{e^2 - 1}{2}\\right)$.",
      answer: 1,
      hint: "$\\int\\frac{dx}{2x + 1} = \\frac12\\ln\\lvert 2x + 1\\rvert + C$.",
      solution: "$F(x) = \\frac12\\ln(2x + 1) + C$ and $F(0) = 0$ gives $C = 0$. At $x = \\frac{e^2 - 1}{2}$, $2x + 1 = e^2$, so $F = \\frac12\\cdot2 = 1$.",
      commonMistakes: [{ answer: 2, feedback: "You forgot the factor $\\frac12$ from the linear inside $2x + 1$." }],
    },
    {
      type: "quiz",
      id: "integ0-2-q9",
      variant: "practice",
      question: "For $a > 0$, $a \\ne 1$: $\\displaystyle\\int a^x\\,dx = $",
      options: [
        { text: "$\\dfrac{a^x}{\\ln a} + C$", correct: true, feedback: "Because $\\frac{d}{dx}a^x = a^x\\ln a$." },
        { text: "$\\dfrac{a^{x + 1}}{x + 1} + C$", feedback: "The power rule is for $x^n$ (variable base, fixed power), not $a^x$." },
        { text: "$a^x\\ln a + C$", feedback: "That is the derivative of $a^x$." },
        { text: "$xa^{x - 1} + C$", feedback: "That mixes up $a^x$ with $x^a$." },
      ],
      hint: "Start from the derivative of $a^x$.",
    },
    {
      type: "quiz",
      id: "integ0-2-q10",
      variant: "practice",
      question: "$\\displaystyle\\int\\frac{dx}{1 + 4x^2} = $",
      options: [
        { text: "$\\tfrac12\\tan^{-1}(2x) + C$", correct: true, feedback: "$\\frac{1}{1 + (2x)^2}$ is $\\frac{1}{1 + u^2}$ with $u = 2x$; divide by the inner coefficient $2$." },
        { text: "$\\tan^{-1}(2x) + C$", feedback: "Its derivative is $\\frac{2}{1 + 4x^2}$: divide by $2$." },
        { text: "$\\tfrac14\\tan^{-1}x + C$", feedback: "$1 + 4x^2$ is not $4(1 + x^2)$." },
        { text: "$\\ln(1 + 4x^2) + C$", feedback: "Its derivative is $\\frac{8x}{1 + 4x^2}$: the numerator would need an $x$." },
      ],
      hint: "Write $4x^2 = (2x)^2$ and use the linear-inside rule.",
    },
    {
      type: "numeric",
      id: "integ0-2-q11",
      variant: "practice",
      question:
        "For $x > 1$, $F$ is the antiderivative of $\\dfrac{1}{x\\sqrt{x^2 - 1}}$ with $F(\\sqrt2) = 0$. Find $\\dfrac{12}{\\pi}F(2)$.",
      answer: 1,
      hint: "$F(x) = \\sec^{-1}x + C$. You need $\\sec^{-1}\\sqrt2$ and $\\sec^{-1}2$.",
      solution: "$F(x) = \\sec^{-1}x - \\sec^{-1}\\sqrt2 = \\sec^{-1}x - \\frac\\pi4$. Then $F(2) = \\frac\\pi3 - \\frac\\pi4 = \\frac{\\pi}{12}$, so $\\frac{12}{\\pi}F(2) = 1$.",
      commonMistakes: [{ answer: 4, feedback: "You used $\\sec^{-1}2 = \\frac\\pi3$ but forgot to subtract $\\sec^{-1}\\sqrt2 = \\frac\\pi4$." }],
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "linearity-and-rewriting",
  title: "0.3 · Linearity and Algebraic Rewriting",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "The table from Lesson 0.2 handles single, clean functions. Real integrands arrive as sums, products and fractions: $\\frac{x^2 + 1}{\\sqrt x}$, $\\frac{x^2}{x + 1}$, $\\frac{2^x + 3^x}{6^x}$. None of these is in the table. Every one of them becomes a sum of table entries after a line of algebra.\n\nThis lesson has one rule and many rewrites. The rule: integrals split over sums. The rewrites: whatever algebra turns a product or quotient into a sum.",
    },
    { type: "heading", text: "The rule: integrals split over sums" },
    {
      type: "text",
      content:
        "Derivatives split over sums and pull out constants: $(aF + bG)' = aF' + bG'$. Read backwards, if $F$ is an antiderivative of $f$ and $G$ of $g$, then $aF + bG$ is an antiderivative of $af + bg$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Linearity",
      content:
        "$\\displaystyle\\int\\left[a f(x) + b g(x)\\right]dx = a\\int f(x)\\,dx + b\\int g(x)\\,dx$ for constants $a, b$.\nIntegrate term by term, pull constants out, and add one $+C$ at the end (the separate constants merge into one).",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"$\\int fg\\,dx = \\int f\\,dx\\cdot\\int g\\,dx$\"",
      content:
        "Linearity is about **sums**, not products. Test on $x\\cdot x$: the true answer is $\\int x^2\\,dx = \\frac{x^3}{3} + C$, but $\\left(\\int x\\,dx\\right)^2 = \\frac{x^4}{4}$, whose derivative is $x^3$, not $x^2$. There is no product rule that works this simply for integrals. The cure: **multiply out first**, so the product becomes a sum.",
    },
    { type: "heading", text: "Five rewrites that turn products and quotients into sums" },
    {
      type: "text",
      content:
        "Before integrating, ask: can I make this a sum of powers, exponentials and table functions? The common moves:\n\n1. **Expand** brackets: $(x + 1)^2 = x^2 + 2x + 1$.\n2. **Split a fraction** over a single-term denominator: $\\frac{x^2 + 1}{\\sqrt x} = x^{3/2} + x^{-1/2}$.\n3. **Divide polynomials** when the top has degree at least the bottom: $\\frac{x^2}{x + 1} = x - 1 + \\frac{1}{x + 1}$.\n4. **Rationalise** a difference of square roots: $\\frac{1}{\\sqrt{x + 1} - \\sqrt x} = \\sqrt{x + 1} + \\sqrt x$.\n5. **Rewrite exponentials and logs**: $\\frac{2^x}{6^x} = \\left(\\frac13\\right)^x$, $e^{2\\ln x} = x^2$.",
    },
    {
      type: "callout",
      variant: "tip",
      content:
        "A useful division trick: add and subtract to make the numerator contain the denominator. $\\frac{x^4}{1 + x^2} = \\frac{(x^4 - 1) + 1}{1 + x^2} = x^2 - 1 + \\frac{1}{1 + x^2}$, because $x^4 - 1 = (x^2 - 1)(x^2 + 1)$.",
    },
    { type: "heading", text: "Worked examples" },
    {
      type: "worked-example",
      id: "integ0-3-we1",
      title: "Worked example 1: split the fraction",
      problem: "Find $\\displaystyle\\int\\frac{x^2 + 1}{\\sqrt x}\\,dx$.",
      steps: [
        { text: "Divide each term of the numerator by $x^{1/2}$:", latex: "\\frac{x^2 + 1}{\\sqrt x} = x^{3/2} + x^{-1/2}" },
        { text: "Power rule on each term. *Why this step:* linearity lets each term be integrated on its own.", latex: "\\int\\left(x^{3/2} + x^{-1/2}\\right)dx = \\frac25x^{5/2} + 2x^{1/2} + C" },
      ],
      answer: "$\\dfrac25x^{5/2} + 2\\sqrt x + C$",
    },
    {
      type: "worked-example",
      id: "integ0-3-we2",
      title: "Worked example 2: divide first",
      problem: "Find $\\displaystyle\\int\\frac{x^2}{x + 1}\\,dx$.",
      steps: [
        { text: "The top has degree 2, the bottom degree 1, so divide. Write $x^2 = (x + 1)(x - 1) + 1$:", latex: "\\frac{x^2}{x + 1} = x - 1 + \\frac{1}{x + 1}" },
        { text: "*Why this step:* after division the leftover fraction has a constant on top, and $\\int\\frac{dx}{x + 1}$ is a table entry with a linear inside." },
        { latex: "\\int\\frac{x^2}{x + 1}\\,dx = \\frac{x^2}{2} - x + \\ln\\lvert x + 1\\rvert + C" },
      ],
      answer: "$\\dfrac{x^2}{2} - x + \\ln\\lvert x + 1\\rvert + C$",
    },
    {
      type: "worked-example",
      id: "integ0-3-we3",
      title: "Worked example 3: rationalise",
      problem: "Find $\\displaystyle\\int\\frac{dx}{\\sqrt{x + 1} - \\sqrt x}$.",
      steps: [
        { text: "Multiply top and bottom by the conjugate $\\sqrt{x + 1} + \\sqrt x$. The bottom becomes $(x + 1) - x = 1$. *Why this step:* a difference of square roots is the one shape where the conjugate clears the denominator completely." },
        { latex: "\\frac{1}{\\sqrt{x + 1} - \\sqrt x} = \\sqrt{x + 1} + \\sqrt x" },
        { text: "Integrate each root:", latex: "\\int\\left[(x + 1)^{1/2} + x^{1/2}\\right]dx = \\frac23(x + 1)^{3/2} + \\frac23x^{3/2} + C" },
      ],
      answer: "$\\dfrac23\\left[(x + 1)^{3/2} + x^{3/2}\\right] + C$",
    },
    {
      type: "worked-example",
      id: "integ0-3-we4",
      title: "Worked example 4: add and subtract",
      problem: "Find $\\displaystyle\\int\\frac{x^4}{1 + x^2}\\,dx$.",
      steps: [
        { text: "Write $x^4 = (x^4 - 1) + 1 = (x^2 - 1)(x^2 + 1) + 1$:", latex: "\\frac{x^4}{1 + x^2} = x^2 - 1 + \\frac{1}{1 + x^2}" },
        { text: "Each piece is a table entry. *Why this step:* the leftover $\\frac{1}{1 + x^2}$ is exactly the derivative of $\\tan^{-1}x$.", latex: "\\int\\frac{x^4}{1 + x^2}\\,dx = \\frac{x^3}{3} - x + \\tan^{-1}x + C" },
      ],
      answer: "$\\dfrac{x^3}{3} - x + \\tan^{-1}x + C$",
    },
    {
      type: "worked-example",
      id: "integ0-3-we5",
      title: "Worked example 5: exponentials with different bases",
      problem: "Find $\\displaystyle\\int\\frac{2^x + 3^x}{6^x}\\,dx$.",
      steps: [
        { text: "Split and simplify each ratio: $\\frac{2^x}{6^x} = \\left(\\frac13\\right)^x = 3^{-x}$ and $\\frac{3^x}{6^x} = 2^{-x}$." },
        { text: "Use $\\int a^x\\,dx = \\frac{a^x}{\\ln a}$ with $a = \\frac13$ and $a = \\frac12$, noting $\\ln\\frac13 = -\\ln 3$. *Why this step:* a negative $\\ln a$ just flips the sign." },
        { latex: "\\int\\left(3^{-x} + 2^{-x}\\right)dx = -\\frac{3^{-x}}{\\ln 3} - \\frac{2^{-x}}{\\ln 2} + C" },
      ],
      answer: "$-\\dfrac{3^{-x}}{\\ln 3} - \\dfrac{2^{-x}}{\\ln 2} + C$",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "integ0-3-q1",
      variant: "practice",
      question: "$\\displaystyle\\int\\left(3x^2 - 4x + 5\\right)dx = $",
      options: [
        { text: "$x^3 - 2x^2 + 5x + C$", correct: true, feedback: "Term by term: $x^3$, $-2x^2$, $5x$." },
        { text: "$6x - 4 + C$", feedback: "That is the derivative." },
        { text: "$x^3 - 2x^2 + 5 + C$", feedback: "The constant $5$ integrates to $5x$." },
        { text: "$3x^3 - 4x^2 + 5x + C$", feedback: "Divide each new power: $\\frac{3x^3}{3} = x^3$." },
      ],
      hint: "Use linearity, then the power rule on each term.",
    },
    {
      type: "quiz",
      id: "integ0-3-q2",
      variant: "concept",
      question: "A student writes $\\displaystyle\\int x\\cdot x\\,dx = \\int x\\,dx\\cdot\\int x\\,dx = \\frac{x^4}{4} + C$. What is the correct answer?",
      options: [
        { text: "$\\dfrac{x^3}{3} + C$", correct: true, feedback: "Multiply out first: $x\\cdot x = x^2$. Integrals do not split over products." },
        { text: "$\\dfrac{x^4}{4} + C$", feedback: "Differentiate it: $x^3 \\ne x^2$." },
        { text: "$\\dfrac{x^2}{2}\\cdot x + C$", feedback: "Its derivative is $\\frac32x^2$." },
        { text: "$x^2 + C$", feedback: "Its derivative is $2x$, not $x^2$." },
      ],
      hint: "Simplify the integrand to a single power before integrating.",
    },
    {
      type: "numeric",
      id: "integ0-3-q3",
      variant: "practice",
      question: "$F$ is the antiderivative of $(x + 1)^2$ with $F(0) = 0$. Find $F(3)$.",
      answer: 21,
      hint: "Expand $(x + 1)^2$ or use the linear-inside rule; either way fix $C$ from $F(0) = 0$.",
      solution: "$F(x) = \\frac{x^3}{3} + x^2 + x$ (no constant, since $F(0) = 0$). $F(3) = 9 + 9 + 3 = 21$. (Or $F(x) = \\frac{(x + 1)^3 - 1}{3}$, giving $\\frac{64 - 1}{3} = 21$.)",
      commonMistakes: [{ answer: 21.333, tolerance: 0.01, feedback: "$\\frac{(x + 1)^3}{3}$ is an antiderivative, but at $x = 0$ it equals $\\frac13$, not $0$: subtract $\\frac13$." }],
    },
    {
      type: "quiz",
      id: "integ0-3-q4",
      variant: "practice",
      question: "$\\displaystyle\\int\\frac{x^3 + 1}{x^2}\\,dx = $",
      options: [
        { text: "$\\dfrac{x^2}{2} - \\dfrac1x + C$", correct: true, feedback: "$\\frac{x^3 + 1}{x^2} = x + x^{-2}$." },
        { text: "$\\dfrac{x^2}{2} + \\dfrac1x + C$", feedback: "$\\int x^{-2}\\,dx = \\frac{x^{-1}}{-1} = -\\frac1x$." },
        { text: "$\\dfrac{x^4/4 + x}{x^3/3} + C$", feedback: "You integrated top and bottom separately; integrals do not split over quotients." },
        { text: "$\\dfrac{x^2}{2} + \\ln x^2 + C$", feedback: "$x^{-2}$ is a power with $n = -2$, not $\\frac1x$." },
      ],
      hint: "Split the fraction into $x + x^{-2}$.",
    },
    {
      type: "numeric",
      id: "integ0-3-q5",
      variant: "practice",
      question: "On $x > -1$, $F$ is the antiderivative of $\\dfrac{x^2 - 1}{x + 1}$ with $F(0) = 0$. Find $F(4)$.",
      answer: 4,
      hint: "Factor the top: $x^2 - 1 = (x - 1)(x + 1)$.",
      solution: "On $x > -1$ the integrand is $x - 1$, so $F(x) = \\frac{x^2}{2} - x$ (no constant, since $F(0) = 0$). $F(4) = 8 - 4 = 4$.",
      commonMistakes: [{ answer: 3, feedback: "That is the integrand $x - 1$ at $x = 4$, not its antiderivative." }],
    },
    {
      type: "quiz",
      id: "integ0-3-q6",
      variant: "practice",
      multiple: true,
      question: "For $x > 0$, select **all** the expressions that are antiderivatives of $\\dfrac{(1 + x)^2}{x}$.",
      options: [
        { text: "$\\ln x + 2x + \\dfrac{x^2}{2}$", correct: true, feedback: "$\\frac{1 + 2x + x^2}{x} = \\frac1x + 2 + x$." },
        { text: "$\\ln x + \\dfrac{(x + 2)^2}{2}$", correct: true, feedback: "$\\frac{(x + 2)^2}{2} = \\frac{x^2}{2} + 2x + 2$: the same answer plus the constant $2$." },
        { text: "$\\ln\\left(xe^{2x}\\right) + \\dfrac{x^2}{2}$", correct: true, feedback: "$\\ln(xe^{2x}) = \\ln x + 2x$." },
        { text: "$\\ln x + \\dfrac{(x + 1)^2}{2}$", feedback: "$\\frac{(x + 1)^2}{2} = \\frac{x^2}{2} + x + \\frac12$: its derivative has $x + 1$, not $x + 2$." },
        { text: "$\\dfrac{(1 + x)^3}{3}\\cdot\\ln x$", feedback: "That integrates the top and bottom separately and multiplies: not allowed." },
      ],
      hint: "Expand $(1 + x)^2$ and split. Then check whether each option differs from your answer by a constant.",
    },
    {
      type: "quiz",
      id: "integ0-3-q7",
      variant: "practice",
      question: "$\\displaystyle\\int\\frac{x^4}{1 + x^2}\\,dx = $",
      options: [
        { text: "$\\dfrac{x^3}{3} - x + \\tan^{-1}x + C$", correct: true, feedback: "$\\frac{x^4}{1 + x^2} = x^2 - 1 + \\frac{1}{1 + x^2}$." },
        { text: "$\\dfrac{x^3}{3} + x - \\tan^{-1}x + C$", feedback: "Check the division: $(x^2 - 1)(x^2 + 1) = x^4 - 1$, so the quotient is $x^2 - 1$ and the remainder is $+1$." },
        { text: "$\\dfrac{x^5/5}{x + x^3/3} + C$", feedback: "Integrals do not split over quotients." },
        { text: "$\\dfrac{x^3}{3} + C$", feedback: "$\\frac{x^4}{1 + x^2}$ is not $x^2$; divide properly." },
      ],
      hint: "Write $x^4 = (x^4 - 1) + 1$.",
    },
    {
      type: "numeric",
      id: "integ0-3-q8",
      variant: "practice",
      question: "If $\\displaystyle\\int e^{2\\ln x}\\,dx = kx^3 + C$ (for $x > 0$), find $\\dfrac1k$.",
      answer: 3,
      hint: "$e^{2\\ln x} = e^{\\ln x^2}$.",
      solution: "$e^{2\\ln x} = x^2$, and $\\int x^2\\,dx = \\frac{x^3}{3}$, so $k = \\frac13$ and $\\frac1k = 3$.",
      commonMistakes: [{ answer: 2, feedback: "$e^{2\\ln x}$ is $x^2$, not $e^{2\\ln x}$ times something: simplify first, then integrate." }],
    },
    {
      type: "quiz",
      id: "integ0-3-q9",
      variant: "practice",
      question: "$\\displaystyle\\int\\frac{dx}{\\sqrt{x + 2} - \\sqrt x} = $",
      options: [
        { text: "$\\tfrac13\\left[(x + 2)^{3/2} + x^{3/2}\\right] + C$", correct: true, feedback: "Rationalising gives $\\frac{\\sqrt{x + 2} + \\sqrt x}{2}$; integrate each root and halve." },
        { text: "$\\tfrac23\\left[(x + 2)^{3/2} + x^{3/2}\\right] + C$", feedback: "After rationalising the denominator is $(x + 2) - x = 2$, not $1$." },
        { text: "$\\tfrac13\\left[(x + 2)^{3/2} - x^{3/2}\\right] + C$", feedback: "The conjugate turns the minus into a plus." },
        { text: "$\\ln\\left\\lvert\\sqrt{x + 2} - \\sqrt x\\right\\rvert + C$", feedback: "$\\int\\frac{dx}{u} = \\ln\\lvert u\\rvert$ needs $du = dx$, which fails here." },
      ],
      hint: "Multiply by the conjugate; the denominator becomes $(x + 2) - x$.",
    },
    {
      type: "numeric",
      id: "integ0-3-q10",
      variant: "practice",
      question: "$F$ is the polynomial antiderivative of $\\dfrac{x^6 - 1}{x^2 - 1}$ (simplify the integrand first) with $F(0) = 0$. Find $15F(1)$.",
      answer: 23,
      hint: "$x^6 - 1 = (x^2 - 1)(x^4 + x^2 + 1)$.",
      solution: "The integrand is $x^4 + x^2 + 1$, so $F(x) = \\frac{x^5}{5} + \\frac{x^3}{3} + x$. $F(1) = \\frac15 + \\frac13 + 1 = \\frac{23}{15}$, so $15F(1) = 23$.",
      commonMistakes: [{ answer: 45, feedback: "That is $15$ times the integrand at $x = 1$. Integrate first." }],
    },
    {
      type: "quiz",
      id: "integ0-3-q11",
      variant: "practice",
      question:
        "(JEE Main style) For $x > 0$, $\\displaystyle\\int\\frac{e^{5\\ln x} - e^{4\\ln x}}{e^{3\\ln x} - e^{2\\ln x}}\\,dx = $",
      options: [
        { text: "$\\dfrac{x^3}{3} + C$", correct: true, feedback: "$\\frac{x^5 - x^4}{x^3 - x^2} = \\frac{x^4(x - 1)}{x^2(x - 1)} = x^2$." },
        { text: "$\\dfrac{x^2}{2} + C$", feedback: "The integrand simplifies to $x^2$, not $x$." },
        { text: "$x\\ln x + C$", feedback: "Simplify $e^{k\\ln x} = x^k$ first; no logarithm survives." },
        { text: "$e^{2\\ln x} + C$", feedback: "That is $x^2$, the integrand, not its antiderivative." },
      ],
      hint: "Use $e^{k\\ln x} = x^k$, then factor top and bottom.",
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "trig-rewriting",
  title: "0.4 · Trigonometric Rewriting",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "The table integrates $\\sin x$, $\\cos x$, $\\sec^2 x$ and a few others. It does not integrate $\\sin^2 x$, $\\tan^2 x$ or $\\sin 3x\\cos 2x$. But trigonometry is full of identities that turn powers and products into sums, and sums of table entries are easy. The strategy of Lesson 0.3 (rewrite until every term is in the table) works for trig functions too; the rewriting tools are just the identities you already know.",
    },
    { type: "heading", text: "Squares: halve the angle away" },
    {
      type: "text",
      content:
        "The double-angle formula $\\cos 2x = 1 - 2\\sin^2 x = 2\\cos^2 x - 1$ can be solved for the squares. That trades a square for a first power of a double angle, which the linear-inside rule handles.",
    },
    {
      type: "math",
      latex: "\\sin^2 x = \\frac{1 - \\cos 2x}{2} \\qquad \\cos^2 x = \\frac{1 + \\cos 2x}{2}",
    },
    {
      type: "text",
      content:
        "For $\\tan^2$ and $\\cot^2$ use the Pythagorean identities instead, because $\\sec^2$ and $\\csc^2$ are table entries:",
    },
    {
      type: "math",
      latex: "\\tan^2 x = \\sec^2 x - 1 \\qquad \\cot^2 x = \\csc^2 x - 1",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"$\\int\\sin^2 x\\,dx = \\frac{\\sin^3 x}{3}$\"",
      content:
        "The power rule is for $x^n$, where the base is the variable itself. Differentiate $\\frac{\\sin^3 x}{3}$: the chain rule gives $\\sin^2 x\\cos x$, not $\\sin^2 x$. The extra $\\cos x$ is the derivative of the inside, and it is missing from the integrand. The right move is the half-angle identity: $\\int\\sin^2 x\\,dx = \\frac x2 - \\frac{\\sin 2x}{4} + C$.",
    },
    { type: "heading", text: "Products: product-to-sum" },
    {
      type: "text",
      content:
        "A product of sines and cosines of different angles becomes a sum through the product-to-sum formulas (add or subtract the compound-angle formulas):",
    },
    {
      type: "math",
      latex:
        "\\begin{aligned} 2\\sin A\\cos B &= \\sin(A + B) + \\sin(A - B) \\\\ 2\\cos A\\cos B &= \\cos(A + B) + \\cos(A - B) \\\\ 2\\sin A\\sin B &= \\cos(A - B) - \\cos(A + B) \\end{aligned}",
    },
    { type: "heading", text: "Cubes, conjugates and other disguises" },
    {
      type: "text",
      content:
        "A few more rewrites come up again and again:\n\n- **Cubes** via the triple-angle formulas: $\\sin^3 x = \\frac{3\\sin x - \\sin 3x}{4}$, $\\cos^3 x = \\frac{3\\cos x + \\cos 3x}{4}$.\n- **Conjugates**: $\\frac{1}{1 + \\sin x} = \\frac{1 - \\sin x}{1 - \\sin^2 x} = \\frac{1 - \\sin x}{\\cos^2 x} = \\sec^2 x - \\sec x\\tan x$.\n- **Splitting 1**: $\\frac{1}{\\sin^2 x\\cos^2 x} = \\frac{\\sin^2 x + \\cos^2 x}{\\sin^2 x\\cos^2 x} = \\sec^2 x + \\csc^2 x$.\n- **Factoring**: $\\frac{\\cos 2x}{\\cos x - \\sin x} = \\frac{(\\cos x - \\sin x)(\\cos x + \\sin x)}{\\cos x - \\sin x} = \\cos x + \\sin x$.\n- **Perfect squares under roots**: $1 + \\sin 2x = (\\sin x + \\cos x)^2$, so $\\sqrt{1 + \\sin 2x} = \\lvert\\sin x + \\cos x\\rvert$.",
    },
    {
      type: "callout",
      variant: "tip",
      content:
        "When a square root of a perfect square appears, keep the modulus until you know the sign. On $\\left(0, \\frac\\pi2\\right)$ both $\\sin x$ and $\\cos x$ are positive, so $\\sqrt{1 + \\sin 2x} = \\sin x + \\cos x$ there.",
    },
    { type: "heading", text: "Worked examples" },
    {
      type: "worked-example",
      id: "integ0-4-we1",
      title: "Worked example 1: a square",
      problem: "Find $\\displaystyle\\int\\sin^2 x\\,dx$.",
      steps: [
        { text: "Half-angle identity: $\\sin^2 x = \\frac12 - \\frac12\\cos 2x$. *Why this step:* it swaps a square (not in the table) for a first power of $\\cos 2x$ (table plus linear inside)." },
        { latex: "\\int\\sin^2 x\\,dx = \\frac x2 - \\frac12\\cdot\\frac{\\sin 2x}{2} + C = \\frac x2 - \\frac{\\sin 2x}{4} + C" },
      ],
      answer: "$\\dfrac x2 - \\dfrac{\\sin 2x}{4} + C$",
    },
    {
      type: "worked-example",
      id: "integ0-4-we2",
      title: "Worked example 2: a product of different angles",
      problem: "Find $\\displaystyle\\int\\sin 3x\\cos 2x\\,dx$.",
      steps: [
        { text: "Product-to-sum with $A = 3x$, $B = 2x$:", latex: "\\sin 3x\\cos 2x = \\frac12\\left(\\sin 5x + \\sin x\\right)" },
        { text: "Integrate each sine, dividing by the inner coefficient. *Why this step:* each term is now $\\sin(ax)$, a table entry with a linear inside.", latex: "\\int = \\frac12\\left(-\\frac{\\cos 5x}{5} - \\cos x\\right) + C = -\\frac{\\cos 5x}{10} - \\frac{\\cos x}{2} + C" },
      ],
      answer: "$-\\dfrac{\\cos 5x}{10} - \\dfrac{\\cos x}{2} + C$",
    },
    {
      type: "worked-example",
      id: "integ0-4-we3",
      title: "Worked example 3: the conjugate",
      problem: "Find $\\displaystyle\\int\\frac{dx}{1 + \\sin x}$.",
      steps: [
        { text: "Multiply top and bottom by $1 - \\sin x$; the bottom becomes $1 - \\sin^2 x = \\cos^2 x$. *Why this step:* the same conjugate trick as for square roots, with $\\sin^2 + \\cos^2 = 1$ doing the clearing." },
        { latex: "\\frac{1 - \\sin x}{\\cos^2 x} = \\sec^2 x - \\sec x\\tan x" },
        { text: "Both are table entries:", latex: "\\int\\frac{dx}{1 + \\sin x} = \\tan x - \\sec x + C" },
      ],
      answer: "$\\tan x - \\sec x + C$",
    },
    {
      type: "worked-example",
      id: "integ0-4-we4",
      title: "Worked example 4: splitting the 1",
      problem: "Find $\\displaystyle\\int\\frac{dx}{\\sin^2 x\\cos^2 x}$.",
      steps: [
        { text: "Replace the $1$ on top by $\\sin^2 x + \\cos^2 x$ and split:", latex: "\\frac{\\sin^2 x + \\cos^2 x}{\\sin^2 x\\cos^2 x} = \\frac{1}{\\cos^2 x} + \\frac{1}{\\sin^2 x} = \\sec^2 x + \\csc^2 x" },
        { text: "*Why this step:* writing $1 = \\sin^2 + \\cos^2$ is the trig version of splitting a fraction." },
        { latex: "\\int\\left(\\sec^2 x + \\csc^2 x\\right)dx = \\tan x - \\cot x + C" },
      ],
      answer: "$\\tan x - \\cot x + C$",
    },
    {
      type: "worked-example",
      id: "integ0-4-we5",
      title: "Worked example 5: a cube",
      problem: "Find $\\displaystyle\\int\\sin^3 x\\,dx$.",
      steps: [
        { text: "From $\\sin 3x = 3\\sin x - 4\\sin^3 x$: $\\sin^3 x = \\frac{3\\sin x - \\sin 3x}{4}$." },
        { latex: "\\int\\sin^3 x\\,dx = \\frac34(-\\cos x) - \\frac14\\left(-\\frac{\\cos 3x}{3}\\right) + C = -\\frac34\\cos x + \\frac{\\cos 3x}{12} + C" },
        { text: "*Why this step:* the triple-angle formula is the cube's version of the half-angle formula. (Chapter 1 gives a faster route: peel off one $\\sin x$ and substitute $u = \\cos x$.)" },
      ],
      answer: "$-\\dfrac34\\cos x + \\dfrac{\\cos 3x}{12} + C$",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "integ0-4-q1",
      variant: "practice",
      question: "$\\displaystyle\\int\\cos^2 x\\,dx = $",
      options: [
        { text: "$\\dfrac x2 + \\dfrac{\\sin 2x}{4} + C$", correct: true, feedback: "$\\cos^2 x = \\frac{1 + \\cos 2x}{2}$." },
        { text: "$\\dfrac{\\cos^3 x}{3} + C$", feedback: "The power rule does not apply to $\\cos^2 x$: differentiate it and an extra $-\\sin x$ appears." },
        { text: "$\\dfrac x2 - \\dfrac{\\sin 2x}{4} + C$", feedback: "That is $\\int\\sin^2 x\\,dx$. For $\\cos^2$ the sign is $+$." },
        { text: "$\\dfrac x2 + \\dfrac{\\sin 2x}{2} + C$", feedback: "$\\int\\frac{\\cos 2x}{2}\\,dx = \\frac{\\sin 2x}{4}$: divide by the inner $2$ as well." },
      ],
      hint: "Use $\\cos^2 x = \\frac{1 + \\cos 2x}{2}$.",
    },
    {
      type: "quiz",
      id: "integ0-4-q2",
      variant: "practice",
      question: "$\\displaystyle\\int\\tan^2 x\\,dx = $",
      options: [
        { text: "$\\tan x - x + C$", correct: true, feedback: "$\\tan^2 x = \\sec^2 x - 1$." },
        { text: "$\\dfrac{\\tan^3 x}{3} + C$", feedback: "Its derivative is $\\tan^2 x\\sec^2 x$." },
        { text: "$\\tan x + x + C$", feedback: "$\\tan^2 x = \\sec^2 x - 1$, so the $x$ term is subtracted." },
        { text: "$\\sec^2 x - 1 + C$", feedback: "That is the integrand rewritten, not integrated." },
      ],
      hint: "Rewrite with $1 + \\tan^2 x = \\sec^2 x$.",
    },
    {
      type: "numeric",
      id: "integ0-4-q3",
      variant: "practice",
      question: "$F$ is the antiderivative of $\\sin^2 x$ with $F(0) = 0$. Find $\\dfrac{F(\\pi)}{\\pi}$.",
      answer: 0.5,
      hint: "$F(x) = \\frac x2 - \\frac{\\sin 2x}{4} + C$.",
      solution: "$F(0) = 0$ gives $C = 0$. $F(\\pi) = \\frac\\pi2 - \\frac{\\sin 2\\pi}{4} = \\frac\\pi2$, so $\\frac{F(\\pi)}{\\pi} = \\frac12$.",
      commonMistakes: [{ answer: 0, feedback: "$\\frac{\\sin^3 x}{3}$ is not an antiderivative of $\\sin^2 x$; use the half-angle identity." }],
    },
    {
      type: "quiz",
      id: "integ0-4-q4",
      variant: "practice",
      multiple: true,
      question: "Select **all** the antiderivatives of $2\\sin x\\cos x$.",
      options: [
        { text: "$\\sin^2 x$", correct: true, feedback: "Derivative $2\\sin x\\cos x$." },
        { text: "$-\\cos^2 x$", correct: true, feedback: "Derivative $2\\cos x\\sin x$; it differs from $\\sin^2 x$ by $1$." },
        { text: "$-\\tfrac12\\cos 2x$", correct: true, feedback: "$2\\sin x\\cos x = \\sin 2x$, and $\\int\\sin 2x\\,dx = -\\frac12\\cos 2x$." },
        { text: "$\\sin 2x$", feedback: "That is the integrand itself." },
        { text: "$\\cos^2 x$", feedback: "Its derivative is $-2\\sin x\\cos x$: wrong sign." },
      ],
      hint: "Three different-looking answers can all be right if they differ by constants.",
    },
    {
      type: "quiz",
      id: "integ0-4-q5",
      variant: "practice",
      question: "$\\displaystyle\\int\\cos 3x\\cos x\\,dx = $",
      options: [
        { text: "$\\dfrac{\\sin 4x}{8} + \\dfrac{\\sin 2x}{4} + C$", correct: true, feedback: "$\\cos 3x\\cos x = \\frac12(\\cos 4x + \\cos 2x)$." },
        { text: "$\\dfrac{\\sin 3x\\sin x}{3} + C$", feedback: "Integrals do not split over products." },
        { text: "$\\dfrac{\\sin 4x}{4} + \\dfrac{\\sin 2x}{2} + C$", feedback: "You forgot the $\\frac12$ from the product-to-sum formula." },
        { text: "$\\dfrac{\\sin 4x}{8} - \\dfrac{\\sin 2x}{4} + C$", feedback: "$2\\cos A\\cos B = \\cos(A + B) + \\cos(A - B)$: both terms are added." },
      ],
      hint: "Use $2\\cos A\\cos B = \\cos(A + B) + \\cos(A - B)$.",
    },
    {
      type: "quiz",
      id: "integ0-4-q6",
      variant: "practice",
      question: "$\\displaystyle\\int\\cot^2 x\\,dx = $",
      options: [
        { text: "$-\\cot x - x + C$", correct: true, feedback: "$\\cot^2 x = \\csc^2 x - 1$ and $\\int\\csc^2 x\\,dx = -\\cot x$." },
        { text: "$\\cot x - x + C$", feedback: "$\\int\\csc^2 x\\,dx = -\\cot x$: co-functions bring a minus sign." },
        { text: "$-\\cot x + x + C$", feedback: "The $1$ is subtracted: $\\cot^2 = \\csc^2 - 1$." },
        { text: "$\\dfrac{\\cot^3 x}{3} + C$", feedback: "The power rule needs the variable itself as the base." },
      ],
      hint: "$1 + \\cot^2 x = \\csc^2 x$.",
    },
    {
      type: "numeric",
      id: "integ0-4-q7",
      variant: "practice",
      question: "If $\\displaystyle\\int\\cos^3 x\\,dx = A\\sin x + B\\sin 3x + C$, find $\\dfrac AB$.",
      answer: 9,
      hint: "$\\cos 3x = 4\\cos^3 x - 3\\cos x$.",
      solution: "$\\cos^3 x = \\frac{3\\cos x + \\cos 3x}{4}$, so $\\int\\cos^3 x\\,dx = \\frac34\\sin x + \\frac{1}{12}\\sin 3x + C$. $A = \\frac34$, $B = \\frac{1}{12}$, $\\frac AB = 9$.",
      commonMistakes: [{ answer: 3, feedback: "You forgot to divide $\\int\\cos 3x\\,dx$ by the inner coefficient $3$." }],
    },
    {
      type: "quiz",
      id: "integ0-4-q8",
      variant: "practice",
      question: "$\\displaystyle\\int\\frac{\\cos 2x}{\\cos x - \\sin x}\\,dx = $",
      options: [
        { text: "$\\sin x - \\cos x + C$", correct: true, feedback: "The integrand is $\\cos x + \\sin x$." },
        { text: "$\\sin x + \\cos x + C$", feedback: "That is the integrand. Integrate it: $\\int\\sin x\\,dx = -\\cos x$." },
        { text: "$\\cos x - \\sin x + C$", feedback: "Differentiate it: you get $-\\sin x - \\cos x$, the negative of the integrand." },
        { text: "$\\ln\\lvert\\cos x - \\sin x\\rvert + C$", feedback: "The numerator is not the derivative of the denominator here; factor $\\cos 2x$ instead." },
      ],
      hint: "$\\cos 2x = \\cos^2 x - \\sin^2 x$ factors.",
    },
    {
      type: "quiz",
      id: "integ0-4-q9",
      variant: "practice",
      multiple: true,
      question: "On $(0, \\pi)$, select **all** the antiderivatives of $\\dfrac{1}{1 - \\cos x}$.",
      options: [
        { text: "$-\\cot x - \\csc x$", correct: true, feedback: "$\\frac{1}{1 - \\cos x} = \\frac{1 + \\cos x}{\\sin^2 x} = \\csc^2 x + \\csc x\\cot x$." },
        { text: "$-\\cot\\dfrac x2$", correct: true, feedback: "$1 - \\cos x = 2\\sin^2\\frac x2$, so the integrand is $\\frac12\\csc^2\\frac x2$, whose antiderivative is $-\\cot\\frac x2$. It equals $-\\cot x - \\csc x$." },
        { text: "$\\tan\\dfrac x2$", feedback: "That integrates $\\frac{1}{1 + \\cos x} = \\frac12\\sec^2\\frac x2$." },
        { text: "$x - \\sin x$", feedback: "That integrates $1 - \\cos x$, not its reciprocal." },
        { text: "$\\cot x + \\csc x$", feedback: "Sign error: $\\int\\csc^2 x\\,dx = -\\cot x$ and $\\int\\csc x\\cot x\\,dx = -\\csc x$." },
      ],
      hint: "Either multiply by the conjugate $1 + \\cos x$, or use $1 - \\cos x = 2\\sin^2\\frac x2$.",
    },
    {
      type: "numeric",
      id: "integ0-4-q10",
      variant: "practice",
      question:
        "(JEE Main style) If $\\displaystyle\\int\\left(\\sin^6 x + \\cos^6 x\\right)dx = Ax + B\\sin 4x + C$, find $32(A + B)$.",
      answer: 23,
      hint: "$\\sin^6 + \\cos^6 = (\\sin^2 + \\cos^2)^3 - 3\\sin^2 x\\cos^2 x(\\sin^2 + \\cos^2)$.",
      solution:
        "$\\sin^6 x + \\cos^6 x = 1 - 3\\sin^2 x\\cos^2 x = 1 - \\frac34\\sin^2 2x = 1 - \\frac38(1 - \\cos 4x) = \\frac58 + \\frac38\\cos 4x$. Integrating: $\\frac58x + \\frac{3}{32}\\sin 4x$. So $A = \\frac58$, $B = \\frac{3}{32}$, and $32(A + B) = 20 + 3 = 23$.",
      commonMistakes: [{ answer: 32, feedback: "You treated $\\sin^6 + \\cos^6$ as $1$. Only $\\sin^2 + \\cos^2 = 1$." }],
    },
    {
      type: "quiz",
      id: "integ0-4-q11",
      variant: "practice",
      question: "For $0 < x < \\frac\\pi2$, $\\displaystyle\\int\\sqrt{1 + \\sin 2x}\\,dx = $",
      options: [
        { text: "$\\sin x - \\cos x + C$", correct: true, feedback: "$\\sqrt{1 + \\sin 2x} = \\sin x + \\cos x$ here; integrate to $-\\cos x + \\sin x$." },
        { text: "$\\sin x + \\cos x + C$", feedback: "That is the simplified integrand, not its antiderivative." },
        { text: "$\\dfrac23(1 + \\sin 2x)^{3/2} + C$", feedback: "The power rule needs the derivative of the inside present; it is not." },
        { text: "$\\cos x - \\sin x + C$", feedback: "Its derivative is $-\\sin x - \\cos x$: wrong sign." },
      ],
      hint: "$1 + \\sin 2x = \\sin^2 x + \\cos^2 x + 2\\sin x\\cos x$.",
    },
    {
      type: "quiz",
      id: "integ0-4-q12",
      variant: "practice",
      question:
        "(JEE Main style) For a constant $\\alpha$, $\\displaystyle\\int\\frac{\\cos 2x - \\cos 2\\alpha}{\\cos x - \\cos\\alpha}\\,dx = $",
      options: [
        { text: "$2(\\sin x + x\\cos\\alpha) + C$", correct: true, feedback: "$\\cos 2x - \\cos 2\\alpha = 2(\\cos^2 x - \\cos^2\\alpha)$, so the integrand is $2(\\cos x + \\cos\\alpha)$." },
        { text: "$2(\\sin x - x\\cos\\alpha) + C$", feedback: "$\\cos^2 x - \\cos^2\\alpha = (\\cos x - \\cos\\alpha)(\\cos x + \\cos\\alpha)$: the leftover factor has a plus." },
        { text: "$\\sin x + x\\cos\\alpha + C$", feedback: "$\\cos 2\\theta = 2\\cos^2\\theta - 1$ brings a factor of $2$." },
        { text: "$2(\\sin x + \\sin\\alpha) + C$", feedback: "$\\cos\\alpha$ is a constant, so $\\int\\cos\\alpha\\,dx = x\\cos\\alpha$." },
      ],
      hint: "Write both double angles with $2\\cos^2\\theta - 1$ and factor a difference of squares.",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "initial-value-problems",
  title: "0.5 · Initial Value Problems and Families of Curves",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "An indefinite integral answers \"which functions have this derivative?\" with a whole family, $F(x) + C$. Usually we want just one member: the car's actual position, not every position consistent with its speedometer. One extra piece of information, such as where the car was at $t = 0$, picks it out. A derivative plus a starting value is called an **initial value problem**.",
    },
    { type: "heading", text: "One condition fixes one constant" },
    {
      type: "callout",
      variant: "definition",
      title: "Initial value problem",
      content:
        "Given $f'(x) = g(x)$ and a value $f(x_0) = y_0$:\n1. Integrate: $f(x) = G(x) + C$, where $G$ is any antiderivative of $g$.\n2. Substitute $x = x_0$: $G(x_0) + C = y_0$, so $C = y_0 - G(x_0)$.\nGeometrically: of all the curves in the family, keep the one through the point $(x_0, y_0)$.",
    },
    {
      type: "interactive",
      config: {
        component: "integ-slope-field",
        expr: "cos(x)",
        exprLatex: "\\cos x",
        window: { xmin: -6.5, xmax: 6.5, ymin: -3, ymax: 3 },
        x0: { min: -6, max: 6, step: 0.1, initial: 0 },
        y0: { min: -2.5, max: 2.5, step: 0.1, initial: 0 },
        curves: [
          { x: 0, y: 1.5 },
          { x: 0, y: -1.5 },
        ],
        caption:
          "The family $y = \\sin x + C$. Drag the start point $(x_0, y_0)$: exactly one wave passes through it. The initial condition is that point, and $C = y_0 - \\sin x_0$ is how far the wave is lifted.",
      },
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"find $C$ first\" or \"$C$ is always 0\"",
      content:
        "You cannot find $C$ before integrating: the condition is about $f$, and until you have $f(x) = G(x) + C$ there is nothing to substitute into. Plugging $x_0$ into $f'$ tells you a slope, not a height. And $C$ is $0$ only when the chosen antiderivative already passes through the given point; with $f' = 2x$ and $f(0) = 3$, $C = 3$.",
    },
    { type: "heading", text: "Second derivatives need two conditions" },
    {
      type: "text",
      content:
        "If you know $f''$, integrating once gives $f' = (\\ldots) + C_1$ and integrating again gives $f = (\\ldots) + C_1x + C_2$. Two integrations, two constants, so you need **two** conditions: typically a value and a slope ($f(0)$ and $f'(0)$), or two values ($f(0)$ and $f(1)$).\n\nPhysics is the classic case. Acceleration $a(t) = v'(t)$ and velocity $v(t) = s'(t)$, so acceleration determines position only once the initial velocity and initial position are given.",
    },
    {
      type: "math",
      latex: "a(t) \\xrightarrow{\\;\\int\\;} v(t) = \\int a\\,dt + C_1 \\xrightarrow{\\;\\int\\;} s(t) = \\int v\\,dt + C_2",
    },
    {
      type: "callout",
      variant: "tip",
      content:
        "Distance travelled is not the same as displacement. Displacement is $s(t_2) - s(t_1)$. Distance adds up the absolute lengths of every leg, so find where $v = 0$ (the particle turns round) and add the lengths of the legs separately.",
    },
    { type: "heading", text: "Worked examples" },
    {
      type: "worked-example",
      id: "integ0-5-we1",
      title: "Worked example 1: a first-order condition",
      problem: "Find $f$ given $f'(x) = 3x^2 - 2$ and $f(1) = 4$. Then find $f(2)$.",
      steps: [
        { text: "Integrate: $f(x) = x^3 - 2x + C$." },
        { text: "Use the condition: $f(1) = 1 - 2 + C = 4$, so $C = 5$. *Why this step:* substitute only after integrating." },
        { text: "So $f(x) = x^3 - 2x + 5$ and $f(2) = 8 - 4 + 5 = 9$." },
      ],
      answer: "$f(x) = x^3 - 2x + 5$, $f(2) = 9$",
    },
    {
      type: "worked-example",
      id: "integ0-5-we2",
      title: "Worked example 2: from the second derivative",
      problem: "Find $f$ given $f''(x) = 6x + 2$, $f'(1) = 4$ and $f(0) = 1$.",
      steps: [
        { text: "First integration: $f'(x) = 3x^2 + 2x + C_1$. Use $f'(1) = 4$: $5 + C_1 = 4$, so $C_1 = -1$. *Why this step:* fix each constant as soon as you have the function it belongs to." },
        { text: "Second integration: $f(x) = x^3 + x^2 - x + C_2$. Use $f(0) = 1$: $C_2 = 1$." },
      ],
      answer: "$f(x) = x^3 + x^2 - x + 1$",
    },
    {
      type: "worked-example",
      id: "integ0-5-we3",
      title: "Worked example 3: a particle",
      problem: "A particle moves on a line with acceleration $a(t) = 6t - 4$ m/s². At $t = 0$ its velocity is $3$ m/s and its position is $0$. Find its position at $t = 2$ s.",
      steps: [
        { text: "$v(t) = 3t^2 - 4t + C_1$ and $v(0) = 3$ give $C_1 = 3$." },
        { text: "$s(t) = t^3 - 2t^2 + 3t + C_2$ and $s(0) = 0$ give $C_2 = 0$." },
        { text: "$s(2) = 8 - 8 + 6 = 6$. *Why this step:* $v(t) = 3t^2 - 4t + 3$ has negative discriminant, so the particle never turns round and the distance travelled is also $6$ m." },
      ],
      answer: "$s(2) = 6$ m",
    },
    {
      type: "worked-example",
      id: "integ0-5-we4",
      title: "Worked example 4: a curve with a given slope",
      problem: "The slope of a curve at each point $(x, y)$ is $e^x + 2x$, and the curve passes through $(0, 1)$. Find its equation.",
      steps: [
        { text: "$\\frac{dy}{dx} = e^x + 2x$, so $y = e^x + x^2 + C$." },
        { text: "At $(0, 1)$: $1 = 1 + 0 + C$, so $C = 0$. *Why this step:* note $e^0 = 1$, not $0$; this is exactly where careless $C = 1$ answers come from." },
      ],
      answer: "$y = e^x + x^2$",
    },
    {
      type: "worked-example",
      id: "integ0-5-we5",
      title: "Worked example 5: marginal cost",
      problem: "The marginal cost of making $x$ units is $C'(x) = 2x + 50$ rupees per unit, and the fixed cost is ₹1000. Find the cost of making 10 units.",
      steps: [
        { text: "Integrate: $C(x) = x^2 + 50x + K$. The fixed cost is the cost of making nothing: $C(0) = K = 1000$. *Why this step:* the initial condition is hidden in the words \"fixed cost\"." },
        { text: "$C(10) = 100 + 500 + 1000 = 1600$." },
      ],
      answer: "₹1600",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "integ0-5-q1",
      variant: "practice",
      question: "$f'(x) = 4x^3$ and $f(1) = 3$. Find $f(2)$.",
      answer: 18,
      hint: "$f(x) = x^4 + C$.",
      solution: "$f(1) = 1 + C = 3$, so $C = 2$ and $f(2) = 16 + 2 = 18$.",
      commonMistakes: [{ answer: 16, feedback: "You took $C = 0$. Use $f(1) = 3$." }],
    },
    {
      type: "numeric",
      id: "integ0-5-q2",
      variant: "practice",
      question: "$f'(x) = \\cos x$ and $f(0) = 2$. Find $f\\!\\left(\\dfrac\\pi2\\right)$.",
      answer: 3,
      hint: "$f(x) = \\sin x + C$.",
      solution: "$f(0) = 0 + C = 2$, so $f(x) = \\sin x + 2$ and $f\\left(\\frac\\pi2\\right) = 3$.",
      commonMistakes: [{ answer: 2, feedback: "$\\sin\\frac\\pi2 = 1$, so the value is $1 + 2$." }],
    },
    {
      type: "quiz",
      id: "integ0-5-q3",
      variant: "concept",
      question: "To solve $f'(x) = 2x$, $f(1) = 5$, a student substitutes $x = 1$ into $f'(x)$ and gets $C = 3$. What went wrong?",
      options: [
        { text: "The condition is on $f$, so you must integrate first and then substitute into $f(x) = x^2 + C$", correct: true, feedback: "$f(1) = 1 + C = 5$ gives $C = 4$." },
        { text: "Nothing; $C = 3$ is right", feedback: "$f(x) = x^2 + 3$ gives $f(1) = 4 \\ne 5$." },
        { text: "The constant should always be $0$", feedback: "Then $f(1) = 1$, not $5$." },
        { text: "The student should have differentiated $f'$ again", feedback: "Going further from $f$ does not help; we need to go back to $f$." },
      ],
      hint: "Which function does the condition $f(1) = 5$ talk about?",
    },
    {
      type: "numeric",
      id: "integ0-5-q4",
      variant: "practice",
      question: "$f''(x) = 12x^2$, $f'(0) = 2$ and $f(0) = 1$. Find $f(1)$.",
      answer: 4,
      hint: "Integrate twice, fixing a constant each time.",
      solution: "$f'(x) = 4x^3 + 2$ and $f(x) = x^4 + 2x + 1$. So $f(1) = 4$.",
      commonMistakes: [{ answer: 2, feedback: "You dropped the $C_1x$ term: $f'(0) = 2$ contributes $2x$ to $f$." }],
    },
    {
      type: "numeric",
      id: "integ0-5-q5",
      variant: "practice",
      question: "A particle has velocity $v(t) = 3t^2 - 6t$ m/s and is at $s = 2$ m when $t = 0$. Find its position at $t = 3$ s.",
      answer: 2,
      unit: "m",
      hint: "$s(t) = t^3 - 3t^2 + C$.",
      solution: "$s(t) = t^3 - 3t^2 + 2$, so $s(3) = 27 - 27 + 2 = 2$ m. (It went backwards and came back.)",
      commonMistakes: [{ answer: 0, feedback: "That is the displacement $s(3) - s(0)$. The question asks for the position, which includes the starting value $2$." }],
    },
    {
      type: "numeric",
      id: "integ0-5-q6",
      variant: "practice",
      question: "For the same particle ($v = 3t^2 - 6t$, $s(0) = 2$), find the total **distance** travelled from $t = 0$ to $t = 3$.",
      answer: 8,
      unit: "m",
      hint: "Find when $v = 0$; add the lengths of the two legs.",
      solution: "$v = 3t(t - 2)$ is negative on $(0, 2)$ and positive on $(2, 3)$. $s(0) = 2$, $s(2) = 8 - 12 + 2 = -2$, $s(3) = 2$. Distance $= \\lvert -2 - 2\\rvert + \\lvert 2 - (-2)\\rvert = 4 + 4 = 8$ m.",
      commonMistakes: [{ answer: 0, feedback: "That is the displacement. Distance counts the backward leg too." }],
    },
    {
      type: "quiz",
      id: "integ0-5-q7",
      variant: "practice",
      multiple: true,
      question: "$f'(x) = \\dfrac1x$ for $x > 0$ and $f(1) = 0$. Select **all** the true statements.",
      options: [
        { text: "$f(x) = \\ln x$", correct: true, feedback: "$\\ln x + C$ with $\\ln 1 + C = 0$, so $C = 0$." },
        { text: "$f(e) = 1$", correct: true, feedback: "$\\ln e = 1$." },
        { text: "$f(e^2) = 2$", correct: true, feedback: "$\\ln e^2 = 2$." },
        { text: "$f$ is increasing on $(0, \\infty)$", correct: true, feedback: "$f'(x) = \\frac1x > 0$." },
        { text: "$f\\!\\left(\\tfrac1e\\right) = 1$", feedback: "$\\ln\\frac1e = -1$." },
      ],
      hint: "Integrate, then use $\\ln 1 = 0$.",
    },
    {
      type: "quiz",
      id: "integ0-5-q8",
      variant: "practice",
      question: "A curve passes through $(1, 2)$ and its slope at every point $(x, y)$ is $2x$. Its equation is",
      options: [
        { text: "$y = x^2 + 1$", correct: true, feedback: "$y = x^2 + C$ and $2 = 1 + C$." },
        { text: "$y = x^2 + 2$", feedback: "At $x = 1$ this gives $3$, not $2$." },
        { text: "$y = 2x$", feedback: "That is the slope, not the curve." },
        { text: "$y = x^2$", feedback: "This passes through $(1, 1)$." },
      ],
      hint: "Integrate the slope, then fit the point.",
    },
    {
      type: "numeric",
      id: "integ0-5-q9",
      variant: "practice",
      question: "The marginal revenue from selling $x$ units is $R'(x) = 100 - 2x$, and $R(0) = 0$. Find $R(10)$.",
      answer: 900,
      hint: "$R(x) = 100x - x^2 + C$.",
      solution: "$R(x) = 100x - x^2$ (since $R(0) = 0$), so $R(10) = 1000 - 100 = 900$.",
      commonMistakes: [{ answer: 80, feedback: "That is the marginal revenue at $x = 10$, not the revenue." }],
    },
    {
      type: "numeric",
      id: "integ0-5-q10",
      variant: "practice",
      question: "A curve $y = f(x)$ passes through $(0, 1)$ and $(1, 2)$, and $f''(x) = 6x$. Find $f(2)$.",
      answer: 9,
      hint: "$f(x) = x^3 + C_1x + C_2$; two points give two equations.",
      solution: "$f(0) = C_2 = 1$; $f(1) = 1 + C_1 + 1 = 2$, so $C_1 = 0$. Then $f(x) = x^3 + 1$ and $f(2) = 9$.",
      commonMistakes: [{ answer: 8, feedback: "You lost $C_2 = 1$ from the point $(0, 1)$." }],
    },
    {
      type: "numeric",
      id: "integ0-5-q11",
      variant: "practice",
      question:
        "(JEE Main style) The slope of the tangent to a curve at $(x, y)$ is $3x^2 + 4x - 1$, and the curve passes through $(1, 3)$. Find the $y$-intercept of the curve.",
      answer: 1,
      hint: "$y = x^3 + 2x^2 - x + C$; the $y$-intercept is $y$ at $x = 0$.",
      solution: "At $(1, 3)$: $1 + 2 - 1 + C = 3$, so $C = 1$. The $y$-intercept is $y(0) = C = 1$.",
      commonMistakes: [{ answer: -1, feedback: "That is the slope at $x = 0$, not the height." }],
    },
    {
      type: "quiz",
      id: "integ0-5-q12",
      variant: "concept",
      question:
        "Two particles start from the same point with the same acceleration $a(t)$ but initial velocities $u_1$ and $u_2$. At time $t$, the distance between them is",
      options: [
        { text: "$\\lvert u_1 - u_2\\rvert t$", correct: true, feedback: "$v_1 - v_2 = u_1 - u_2$ (same $\\int a$), and integrating again with equal starting positions gives $(u_1 - u_2)t$." },
        { text: "$\\lvert u_1 - u_2\\rvert$", feedback: "That is the difference in velocities, which stays constant; the gap grows with $t$." },
        { text: "$0$", feedback: "Same acceleration does not mean same motion; the constants $C_1$ differ." },
        { text: "$\\tfrac12\\lvert u_1 - u_2\\rvert t^2$", feedback: "The difference of velocities is constant, not growing; integrate once more to get a term linear in $t$." },
      ],
      hint: "Subtract the two velocity functions first: the $\\int a\\,dt$ parts cancel.",
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "chapter-0-mastery",
  title: "0.6 · Chapter 0 Mastery",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "This lesson hides the formula sheet. Every question below is a table entry in disguise: rewrite it with algebra or an identity, integrate term by term, check by differentiating, and use any given value to fix the constant. If a formula slips your mind, rebuild it from the derivative it reverses.",
    },
    { type: "heading", text: "Reconstruct it" },
    {
      type: "table",
      headers: ["If you forget…", "…rebuild it from"],
      rows: [
        ["$\\int x^n\\,dx$", "$\\frac{d}{dx}x^{n+1} = (n+1)x^n$, so divide by $n + 1$ (fails only at $n = -1$)"],
        ["$\\int\\frac{dx}{x}$", "$\\frac{d}{dx}\\ln\\lvert x\\rvert = \\frac1x$ on both sides of $0$"],
        ["$\\int a^x\\,dx$", "$\\frac{d}{dx}a^x = a^x\\ln a$, so divide by $\\ln a$"],
        ["$\\int f(ax + b)\\,dx$", "the chain rule multiplies by $a$, so integration divides by $a$"],
        ["$\\int\\sin^2 x$, $\\int\\cos^2 x$", "$\\cos 2x = 1 - 2\\sin^2 x = 2\\cos^2 x - 1$"],
        ["$\\int\\tan^2 x$, $\\int\\cot^2 x$", "$\\sec^2 = 1 + \\tan^2$, $\\csc^2 = 1 + \\cot^2$"],
        ["the constant $C$", "one condition per integration: substitute after integrating"],
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "The universal check",
      content:
        "Differentiate your answer. If you get the integrand back, you are right, even if your answer looks different from the options: two correct answers differ by a constant.",
    },
    { type: "heading", text: "Mastery questions" },
    {
      type: "quiz",
      id: "integ0-6-q1",
      variant: "mastery",
      question: "$\\displaystyle\\int\\left(\\frac1x + e^{-x}\\right)dx = $",
      options: [
        { text: "$\\ln\\lvert x\\rvert - e^{-x} + C$", correct: true, feedback: "$\\int e^{-x}\\,dx = \\frac{e^{-x}}{-1}$." },
        { text: "$\\ln\\lvert x\\rvert + e^{-x} + C$", feedback: "Differentiate $e^{-x}$: you get $-e^{-x}$. Divide by the inner coefficient $-1$." },
        { text: "$-\\dfrac{1}{x^2} - e^{-x} + C$", feedback: "$-\\frac{1}{x^2}$ is the derivative of $\\frac1x$, not its integral." },
        { text: "$\\ln\\lvert x\\rvert - \\dfrac{e^{-x+1}}{-x+1} + C$", feedback: "The power rule does not apply to exponentials." },
      ],
      hint: "Linear inside $-x$: divide by $-1$.",
    },
    {
      type: "numeric",
      id: "integ0-6-q2",
      variant: "mastery",
      question: "If $\\displaystyle\\int(3x + 2)^4\\,dx = k(3x + 2)^5 + C$, find $\\dfrac1k$.",
      answer: 15,
      hint: "Power rule on the outside, then divide by the inner coefficient.",
      solution: "$\\int(3x + 2)^4\\,dx = \\frac{(3x + 2)^5}{5\\cdot3} + C$, so $k = \\frac{1}{15}$.",
      commonMistakes: [{ answer: 5, feedback: "You forgot to divide by the inner coefficient $3$." }],
    },
    {
      type: "quiz",
      id: "integ0-6-q3",
      variant: "mastery",
      question: "$\\displaystyle\\int\\left(\\tan^2 x + \\cot^2 x\\right)dx = $",
      options: [
        { text: "$\\tan x - \\cot x - 2x + C$", correct: true, feedback: "$(\\sec^2 x - 1) + (\\csc^2 x - 1)$." },
        { text: "$\\tan x + \\cot x - 2x + C$", feedback: "$\\int\\csc^2 x\\,dx = -\\cot x$." },
        { text: "$\\tan x - \\cot x + C$", feedback: "Each identity leaves a $-1$; together they give $-2x$." },
        { text: "$\\dfrac{\\tan^3 x + \\cot^3 x}{3} + C$", feedback: "The power rule does not apply to trig functions." },
      ],
      hint: "$\\tan^2 = \\sec^2 - 1$ and $\\cot^2 = \\csc^2 - 1$.",
    },
    {
      type: "quiz",
      id: "integ0-6-q4",
      variant: "mastery",
      multiple: true,
      question: "Select **all** the correct statements.",
      options: [
        { text: "$\\int\\sec^2 2x\\,dx = \\tfrac12\\tan 2x + C$", correct: true, feedback: "Linear inside $2x$: divide by $2$." },
        { text: "$\\int e^{x\\ln 5}\\,dx = \\dfrac{5^x}{\\ln 5} + C$", correct: true, feedback: "$e^{x\\ln 5} = 5^x$." },
        { text: "$\\int\\frac{dx}{\\sqrt{1 - x^2}} = \\sin^{-1}x + C$", correct: true, feedback: "Reverse of $\\frac{d}{dx}\\sin^{-1}x$." },
        { text: "$\\int\\frac{dx}{x^2} = \\ln x^2 + C$", feedback: "$\\frac{1}{x^2} = x^{-2}$, a power with $n = -2$: the answer is $-\\frac1x + C$." },
        { text: "$\\int\\cos 5x\\,dx = 5\\sin 5x + C$", feedback: "Divide by $5$, do not multiply: $\\frac15\\sin 5x + C$." },
      ],
      hint: "Differentiate each right-hand side.",
    },
    {
      type: "numeric",
      id: "integ0-6-q5",
      variant: "mastery",
      question: "$f'(x) = 6x - 2$ and $f(1) = 3$. Find $f(2)$.",
      answer: 10,
      hint: "$f(x) = 3x^2 - 2x + C$.",
      solution: "$f(1) = 3 - 2 + C = 3$, so $C = 2$ and $f(2) = 12 - 4 + 2 = 10$.",
      commonMistakes: [{ answer: 8, feedback: "You took $C = 0$." }],
    },
    {
      type: "quiz",
      id: "integ0-6-q6",
      variant: "mastery",
      question: "$\\displaystyle\\int\\frac{x^3 - 8}{x - 2}\\,dx = $",
      options: [
        { text: "$\\dfrac{x^3}{3} + x^2 + 4x + C$", correct: true, feedback: "$x^3 - 8 = (x - 2)(x^2 + 2x + 4)$." },
        { text: "$\\dfrac{x^3}{3} - x^2 + 4x + C$", feedback: "The factor is $x^2 + 2x + 4$ (all plus signs)." },
        { text: "$\\dfrac{x^4/4 - 8x}{x^2/2 - 2x} + C$", feedback: "Integrals do not split over quotients." },
        { text: "$x^2 + 2x + 4 + C$", feedback: "That is the simplified integrand." },
      ],
      hint: "Factor the difference of cubes.",
    },
    {
      type: "numeric",
      id: "integ0-6-q7",
      variant: "mastery",
      question: "If $\\displaystyle\\int\\sin^2\\frac x2\\,dx = Ax + B\\sin x + C$, find $A - B$.",
      answer: 1,
      hint: "$\\sin^2\\frac x2 = \\frac{1 - \\cos x}{2}$.",
      solution: "$\\int\\frac{1 - \\cos x}{2}\\,dx = \\frac x2 - \\frac{\\sin x}{2}$, so $A = \\frac12$, $B = -\\frac12$ and $A - B = 1$.",
      commonMistakes: [{ answer: 0, feedback: "Check the sign of $B$: it is $-\\frac12$." }],
    },
    {
      type: "quiz",
      id: "integ0-6-q8",
      variant: "mastery",
      question: "$\\displaystyle\\int\\frac{dx}{1 + \\cos 2x} = $",
      options: [
        { text: "$\\tfrac12\\tan x + C$", correct: true, feedback: "$1 + \\cos 2x = 2\\cos^2 x$, so the integrand is $\\frac12\\sec^2 x$." },
        { text: "$\\tan x + C$", feedback: "$1 + \\cos 2x = 2\\cos^2 x$: keep the factor $\\frac12$." },
        { text: "$\\ln\\lvert 1 + \\cos 2x\\rvert + C$", feedback: "The numerator is not the derivative of the denominator." },
        { text: "$x + \\tfrac12\\sin 2x + C$", feedback: "That integrates $1 + \\cos 2x$, not its reciprocal." },
      ],
      hint: "Use $1 + \\cos 2x = 2\\cos^2 x$.",
    },
    {
      type: "numeric",
      id: "integ0-6-q9",
      variant: "mastery",
      question: "$f''(x) = e^x$, $f'(0) = 3$ and $f(0) = 2$. Find $f(1)$, correct to 2 decimal places.",
      answer: 5.718,
      tolerance: 0.01,
      hint: "$f'(x) = e^x + C_1$, then $f(x) = e^x + C_1x + C_2$. Remember $e^0 = 1$.",
      solution: "$f'(0) = 1 + C_1 = 3$, so $C_1 = 2$. $f(0) = 1 + C_2 = 2$, so $C_2 = 1$. $f(x) = e^x + 2x + 1$ and $f(1) = e + 3 \\approx 5.72$.",
      commonMistakes: [{ answer: 7.718, tolerance: 0.01, feedback: "You used $e^0 = 0$ when fixing the constants: both $C_1$ and $C_2$ come out one too big." }],
    },
    {
      type: "quiz",
      id: "integ0-6-q10",
      variant: "mastery",
      question: "$\\displaystyle\\int(\\sin x + \\cos x)^2\\,dx = $",
      options: [
        { text: "$x - \\tfrac12\\cos 2x + C$", correct: true, feedback: "$(\\sin x + \\cos x)^2 = 1 + \\sin 2x$." },
        { text: "$\\dfrac{(\\sin x + \\cos x)^3}{3} + C$", feedback: "The power rule needs the derivative of the inside to be present." },
        { text: "$x + \\tfrac12\\cos 2x + C$", feedback: "$\\int\\sin 2x\\,dx = -\\frac12\\cos 2x$." },
        { text: "$x - 2\\cos 2x + C$", feedback: "Divide by the inner coefficient $2$; do not multiply." },
      ],
      hint: "Expand the square and use $2\\sin x\\cos x = \\sin 2x$.",
    },
    {
      type: "quiz",
      id: "integ0-6-q11",
      variant: "mastery",
      multiple: true,
      question: "Select **all** the functions that are antiderivatives of $\\lvert x\\rvert$ on the whole real line.",
      options: [
        { text: "$\\dfrac{x\\lvert x\\rvert}{2}$", correct: true, feedback: "For $x \\ge 0$ it is $\\frac{x^2}{2}$ (derivative $x$); for $x < 0$ it is $-\\frac{x^2}{2}$ (derivative $-x = \\lvert x\\rvert$)." },
        { text: "$\\dfrac{x\\lvert x\\rvert + 4}{2}$", correct: true, feedback: "The previous answer plus the constant $2$." },
        { text: "$\\dfrac{x^2}{2}$", feedback: "Its derivative is $x$, which is negative for $x < 0$, but $\\lvert x\\rvert$ is not." },
        { text: "$\\dfrac{\\lvert x\\rvert^2}{2}$", feedback: "$\\lvert x\\rvert^2 = x^2$; same problem as $\\frac{x^2}{2}$." },
        { text: "$-\\dfrac{x^2}{2}$", feedback: "Its derivative is $-x$, which is wrong for $x > 0$." },
      ],
      hint: "Split into $x \\ge 0$ and $x < 0$, and check the derivative on each side.",
    },
    {
      type: "numeric",
      id: "integ0-6-q12",
      variant: "mastery",
      question: "$F$ is the antiderivative of $\\dfrac{x^2 + 2}{x^2 + 1}$ with $F(0) = 0$. Find $F(1)$, correct to 2 decimal places.",
      answer: 1.785,
      tolerance: 0.01,
      hint: "$\\frac{x^2 + 2}{x^2 + 1} = 1 + \\frac{1}{x^2 + 1}$.",
      solution: "$F(x) = x + \\tan^{-1}x$, so $F(1) = 1 + \\frac\\pi4 \\approx 1.785$.",
      commonMistakes: [{ answer: 1, feedback: "You dropped the $\\tan^{-1}x$ term from the remainder $\\frac{1}{x^2 + 1}$." }],
    },
    {
      type: "quiz",
      id: "integ0-6-q13",
      variant: "mastery",
      question: "(JEE Main style) $\\displaystyle\\int\\frac{\\sin^8 x - \\cos^8 x}{1 - 2\\sin^2 x\\cos^2 x}\\,dx = $",
      options: [
        { text: "$-\\tfrac12\\sin 2x + C$", correct: true, feedback: "$\\sin^8 - \\cos^8 = (\\sin^2 - \\cos^2)(\\sin^4 + \\cos^4)$ and $\\sin^4 + \\cos^4 = 1 - 2\\sin^2\\cos^2$. The integrand is $-\\cos 2x$." },
        { text: "$\\tfrac12\\sin 2x + C$", feedback: "$\\sin^2 x - \\cos^2 x = -\\cos 2x$: watch the sign." },
        { text: "$-\\sin 2x + C$", feedback: "Divide by the inner coefficient $2$." },
        { text: "$\\tfrac12\\cos 2x + C$", feedback: "The integrand simplifies to $-\\cos 2x$, whose antiderivative involves $\\sin 2x$." },
      ],
      hint: "Factor $a^8 - b^8$ as a difference of squares twice, and note $\\sin^4 x + \\cos^4 x = 1 - 2\\sin^2 x\\cos^2 x$.",
    },
    {
      type: "numeric",
      id: "integ0-6-q14",
      variant: "mastery",
      question:
        "A particle starts at the origin with velocity $-3$ m/s and has acceleration $a(t) = 6t$ m/s². Find the total distance it travels from $t = 0$ to $t = 2$ s.",
      answer: 6,
      unit: "m",
      hint: "$v(t) = 3t^2 - 3$ changes sign at $t = 1$.",
      solution: "$v(t) = 3t^2 - 3$, $s(t) = t^3 - 3t$. $s(0) = 0$, $s(1) = -2$, $s(2) = 2$. Distance $= 2 + 4 = 6$ m.",
      commonMistakes: [{ answer: 2, feedback: "That is the displacement $s(2) - s(0)$. The particle turns round at $t = 1$." }],
    },
    {
      type: "quiz",
      id: "integ0-6-q15",
      variant: "mastery",
      question: "If $\\displaystyle\\int f(x)\\,dx = g(x) + C$, then $\\displaystyle\\int f(3x)\\,dx = $",
      options: [
        { text: "$\\tfrac13g(3x) + C$", correct: true, feedback: "$\\frac{d}{dx}\\frac13g(3x) = \\frac13\\cdot3g'(3x) = f(3x)$." },
        { text: "$g(3x) + C$", feedback: "Its derivative is $3f(3x)$." },
        { text: "$3g(3x) + C$", feedback: "Its derivative is $9f(3x)$." },
        { text: "$\\tfrac13g(x) + C$", feedback: "Its derivative is $\\frac13f(x)$, which is not $f(3x)$." },
      ],
      hint: "Differentiate each option with the chain rule.",
    },
  ]),
};

export const integChapter0Lessons: LessonSeed[] = [lesson01, lesson02, lesson03, lesson04, lesson05, lesson06];
