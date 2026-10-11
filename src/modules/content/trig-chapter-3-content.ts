import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Trigonometry Chapter 3 — Identities: The Derivation Toolkit.
 * A small core (Pythagoras + angle sum + circle symmetry) and the moves
 * that generate everything else from it.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const WAVE_WINDOW = { xmin: -6.5, xmax: 6.5, ymin: -3.5, ymax: 3.5 };

const lesson01: LessonSeed = {
  slug: "what-an-identity-is",
  title: "3.1 · What an Identity Is",
  position: 1,
  blocks: blocks([
    {
      type: "video",
      src: "/videos/trig-3-identities.mp4",
      poster: "/videos/trig-3-identities.jpg",
      title: "Chapter 3 overview video",
      caption:
        "A narrated walk through the whole chapter. Watch it now for the big picture, or come back to it as a recap.",
    },
    {
      type: "text",
      content:
        "Two equations that look alike but behave nothing alike:",
    },
    { type: "math", latex: "\\sin x = \\tfrac{1}{2} \\qquad\\text{versus}\\qquad \\sin^2 x + \\cos^2 x = 1" },
    {
      type: "text",
      content:
        "The first is a **question**: which $x$ make this true? (Some do, most do not — Chapter 4 is about answering it.) The second is a **statement**: it is true for every $x$ whatsoever. There is nothing to solve.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Identity",
      content:
        "An **identity** is an equation true for every value of the variable for which both sides are defined. An **equation** is a constraint that singles out particular values. Same notation, opposite jobs.",
    },
    {
      type: "text",
      content:
        "The \"where both sides are defined\" clause does real work. $\\tan x = \\frac{\\sin x}{\\cos x}$ is an identity, but neither side exists at $x = \\frac{\\pi}{2}$. Excluded points do not spoil an identity; they just come with it.",
    },
    { type: "heading", text: "How to prove an identity" },
    {
      type: "text",
      content:
        "**How to prove one.** The rules are narrow, and following them is most of the skill:",
    },
    {
      type: "callout",
      variant: "info",
      title: "The rules of the game",
      content:
        "1. **Work on one side only**, and transform it until it becomes the other. Do not move terms across the equals sign — you are not solving, you are rewriting.\n2. **Start from the messier side.** There is more to simplify there.\n3. **Convert to sine and cosine** when stuck. Nearly every identity collapses once everything is in those two.\n4. **Look for a Pythagorean pattern.** A $1 - \\sin^2$ or a $1 + \\tan^2$ is almost always the intended move.",
    },
    {
      type: "worked-example",
      id: "t3-1-we1",
      title: "Worked example 1: a common denominator",
      problem: "Show $\\dfrac{\\sin x}{\\cos x} + \\dfrac{\\cos x}{\\sin x} = \\dfrac{1}{\\sin x\\cos x}$.",
      steps: [
        {
          text: "Start on the left, which is messier. Common denominator:",
          latex: "\\frac{\\sin x}{\\cos x} + \\frac{\\cos x}{\\sin x} = \\frac{\\sin^2 x + \\cos^2 x}{\\sin x\\cos x} = \\frac{1}{\\sin x\\cos x}",
        },
        {
          text: "One Pythagorean substitution and it is done. Notice what was *not* done: nothing was multiplied across, nothing was moved to the other side.",
        },
      ],
      answer: "The left side rewrites to the right side, so the identity holds wherever $\\sin x\\cos x \\ne 0$.",
      tryFirst: false,
    },
    {
      type: "worked-example",
      id: "t3-1-we2",
      title: "Worked example 2: multiplying by the conjugate",
      problem: "Prove $\\dfrac{\\cos x}{1 - \\sin x} = \\dfrac{1 + \\sin x}{\\cos x}$.",
      steps: [
        {
          text: "Neither side is obviously messier, so pick the left and aim for its denominator to become $\\cos x$. A $1 - \\sin x$ wants its partner $1 + \\sin x$, because together they make a Pythagorean pattern. Multiply top and bottom by it (this multiplies by 1, so it is allowed):",
          latex: "\\frac{\\cos x}{1 - \\sin x} \\cdot \\frac{1 + \\sin x}{1 + \\sin x} = \\frac{\\cos x(1 + \\sin x)}{1 - \\sin^2 x}",
        },
        {
          text: "Swap $1 - \\sin^2 x$ for $\\cos^2 x$:",
          latex: "= \\frac{\\cos x(1 + \\sin x)}{\\cos^2 x}",
        },
        {
          text: "Cancel one $\\cos x$:",
          latex: "= \\frac{1 + \\sin x}{\\cos x}",
        },
      ],
      answer: "The left side becomes the right side: proved (wherever $\\cos x \\ne 0$ and $\\sin x \\ne 1$).",
    },
    { type: "heading", text: "Checking a claim with numbers and graphs" },
    {
      type: "worked-example",
      id: "t3-1-we3",
      title: "Worked example 3: one counterexample is enough",
      problem: "Is $\\sin x + \\cos x = 1$ an identity?",
      steps: [
        {
          text: "It holds at $x = 0$ ($0 + 1 = 1$) and at $x = \\frac{\\pi}{2}$ ($1 + 0 = 1$). Agreement at a few points proves nothing. Try a point that is not on an axis:",
          latex: "x = \\frac{\\pi}{4}: \\quad \\frac{\\sqrt2}{2} + \\frac{\\sqrt2}{2} = \\sqrt2 \\ne 1",
        },
        {
          text: "A single value where the two sides differ refutes an identity. (Proving one takes an argument that covers every $x$ at once.)",
        },
      ],
      answer: "No. It is an equation with particular solutions, not an identity: it fails at $x = \\frac{\\pi}{4}$.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Graphs as a check, not a proof",
      content:
        "Plotting both sides is a fast way to catch a false claim — if the curves differ anywhere, it is not an identity. Agreement on a screen is strong evidence but not a proof; two curves can agree on a window and part company elsewhere.",
    },
    {
      type: "interactive",
      config: {
        component: "family-gallery",
        families: [
          { label: "sin²x + cos²x", expr: "sin(x)^2 + cos(x)^2", latex: "\\sin^2 x + \\cos^2 x", excluded: [] },
          { label: "sin(2x)", expr: "sin(2*x)", latex: "\\sin 2x", excluded: [] },
          { label: "2 sin x cos x", expr: "2*sin(x)*cos(x)", latex: "2\\sin x\\cos x", excluded: [] },
        ],
        window: WAVE_WINDOW,
      },
    },
    {
      type: "text",
      content:
        "The first is the flat line $y = 1$ — the identity, visible. The second and third are indistinguishable, which is a preview of lesson 3.4.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "t3-1-q1",
      variant: "concept",
      question: "Which of these is an identity rather than an equation to solve?",
      options: [
        { text: "$\\tan x \\cos x = \\sin x$", correct: true, feedback: "Substitute $\\tan x = \\frac{\\sin x}{\\cos x}$ and the cosines cancel — true wherever both sides are defined." },
        { text: "$\\cos x = 0$", feedback: "Only true at particular angles; that is a question, not a statement." },
        { text: "$2\\sin x = 1$", feedback: "Same — it constrains $x$ rather than describing every $x$." },
      ],
      hint: "Which one stays true no matter what $x$ you substitute?",
    },
    {
      type: "quiz",
      id: "t3-1-q2",
      variant: "concept",
      question: "Why is it bad practice to prove an identity by cross-multiplying across the equals sign?",
      options: [
        {
          text: "It assumes the statement you are trying to prove, so the argument is circular.",
          correct: true,
          feedback: "Transforming one side alone never assumes the result — that is why the rule exists.",
        },
        { text: "It gives the wrong answer.", feedback: "It often reaches a true statement; the trouble is the logic, not the arithmetic." },
        { text: "It takes longer.", feedback: "Sometimes shorter, in fact — and still not a proof." },
      ],
      hint: "Cross-multiplying starts from the equation itself. Do you know it is true yet?",
    },
    {
      type: "quiz",
      id: "t3-1-q3",
      variant: "practice",
      multiple: true,
      question: "Select every identity (true wherever both sides are defined).",
      options: [
        { text: "$\\sec x\\cos x = 1$", correct: true, feedback: "Secant is $\\frac{1}{\\cos x}$, so the product is 1 wherever $\\cos x \\ne 0$." },
        { text: "$(1 + \\tan^2 x)\\cos^2 x = 1$", correct: true, feedback: "$1 + \\tan^2 x = \\frac{\\cos^2 x + \\sin^2 x}{\\cos^2 x} = \\frac{1}{\\cos^2 x}$, and the $\\cos^2 x$ cancels." },
        { text: "$\\tan x\\cot x = 1$", correct: true, feedback: "Reciprocals multiply to 1 wherever both exist." },
        { text: "$\\sin x + \\cos x = 1$", feedback: "Refuted at $x = \\frac{\\pi}{4}$, where the left side is $\\sqrt2$." },
        { text: "$\\sin 2x = 2\\sin x$", feedback: "Refuted at $x = \\frac{\\pi}{2}$: the left is 0, the right is 2." },
      ],
      hint: "Convert each to sine and cosine. For any that look doubtful, test $x = \\frac{\\pi}{4}$ or $\\frac{\\pi}{2}$.",
    },
    {
      type: "quiz",
      id: "t3-1-q4",
      variant: "concept",
      question:
        "The graphs of $f(x)$ and $g(x)$ coincide everywhere on the screen for $-2 \\le x \\le 2$. What can you conclude?",
      options: [
        {
          text: "Only that $f = g$ is plausible; it still needs a proof, since the curves could separate outside the window.",
          correct: true,
          feedback: "Graphs are evidence. A proof has to cover every $x$, not just the ones on screen.",
        },
        { text: "$f(x) = g(x)$ is an identity.", feedback: "Agreement on a window is not agreement everywhere. A function can be built to match another on $[-2, 2]$ and differ beyond it." },
        { text: "Nothing at all: graphs are useless for identities.", feedback: "Graphs are excellent for *refuting* a claim, and good evidence for one. They just are not a proof." },
      ],
      hint: "What does a screen show you, and what does it leave out?",
    },
    {
      type: "quiz",
      id: "t3-1-q5",
      variant: "concept",
      question: "You are proving $\\dfrac{\\cos x}{1 - \\sin x} = \\dfrac{1 + \\sin x}{\\cos x}$. Which move breaks the rules?",
      options: [
        {
          text: "Multiplying both sides by $\\cos x(1 - \\sin x)$ to clear the fractions.",
          correct: true,
          feedback: "That treats the identity as already true, which is what you are trying to show. Work on one side only.",
        },
        { text: "Multiplying the top and bottom of the left side by $1 + \\sin x$.", feedback: "Allowed: it multiplies one side by 1. It is exactly the move in worked example 2." },
        { text: "Replacing $1 - \\sin^2 x$ by $\\cos^2 x$.", feedback: "Allowed: substituting a known identity rewrites a side without changing its value." },
        { text: "Starting from the right side instead of the left.", feedback: "Allowed: either side can be the starting point. Pick the one with more to simplify." },
      ],
      hint: "The legal moves rewrite one side without assuming the equation is true.",
    },
    {
      type: "numeric",
      id: "t3-1-q6",
      variant: "practice",
      question: "Simplify $\\dfrac{\\tan x + \\cot x}{\\sec x\\csc x}$ to a single number.",
      answer: 1,
      hint: "Convert everything to sine and cosine. Worked example 1 already simplified the numerator.",
      solution:
        "The numerator is $\\dfrac{1}{\\sin x\\cos x}$ (worked example 1). The denominator is $\\dfrac{1}{\\cos x}\\cdot\\dfrac{1}{\\sin x} = \\dfrac{1}{\\sin x\\cos x}$. Their quotient is 1.",
      commonMistakes: [
        { answer: 2, feedback: "$\\tan x + \\cot x$ is not 2 in general. Combine it over a common denominator first." },
      ],
    },
    {
      type: "numeric",
      id: "t3-1-q7",
      variant: "practice",
      question: "If $\\sin x + \\sin^2 x = 1$, find the value of $\\cos^2 x + \\cos^4 x$.",
      answer: 1,
      hint: "Rearrange the given equation to see that $\\sin x$ equals something you know in terms of cosine.",
      solution:
        "From $\\sin x = 1 - \\sin^2 x = \\cos^2 x$. Then $\\cos^4 x = (\\cos^2 x)^2 = \\sin^2 x$. So $\\cos^2 x + \\cos^4 x = \\sin x + \\sin^2 x = 1$.",
      commonMistakes: [
        { answer: 0, feedback: "Both terms are squares of real numbers, and $\\cos x \\ne 0$ here (otherwise $\\sin x = \\pm1$ would break the equation)." },
        { answer: 2, feedback: "Substitute carefully: $\\cos^2 x = \\sin x$ and $\\cos^4 x = \\sin^2 x$, so the sum is the original left side." },
      ],
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "the-pythagorean-family",
  title: "3.2 · The Pythagorean Family",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "Textbooks list three Pythagorean identities. There is only one, plus a division you can do in your head.",
    },
    { type: "math", latex: "\\sin^2\\theta + \\cos^2\\theta = 1" },
    { type: "heading", text: "One identity, two divisions" },
    {
      type: "text",
      content:
        "**Divide every term by $\\cos^2\\theta$.** (Legal wherever $\\cos\\theta \\ne 0$.)",
    },
    {
      type: "math",
      latex:
        "\\frac{\\sin^2\\theta}{\\cos^2\\theta} + \\frac{\\cos^2\\theta}{\\cos^2\\theta} = \\frac{1}{\\cos^2\\theta} \\quad\\Longrightarrow\\quad \\tan^2\\theta + 1 = \\sec^2\\theta",
    },
    {
      type: "text",
      content:
        "**Now divide the original by $\\sin^2\\theta$ instead:**",
    },
    {
      type: "math",
      latex:
        "\\frac{\\sin^2\\theta}{\\sin^2\\theta} + \\frac{\\cos^2\\theta}{\\sin^2\\theta} = \\frac{1}{\\sin^2\\theta} \\quad\\Longrightarrow\\quad 1 + \\cot^2\\theta = \\csc^2\\theta",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Three identities, one fact, two divisions",
      content:
        "Do not memorize the second and third. If you need $1 + \\tan^2 = \\sec^2$, write $\\sin^2 + \\cos^2 = 1$ and divide by $\\cos^2$ — ten seconds, and you cannot misremember which is which. A useful check: the function that ends up alone on the right is the reciprocal of whatever you divided by.",
    },
    { type: "heading", text: "Swapping squares and killing radicals" },
    {
      type: "text",
      content:
        "These earn their keep in two situations.\n\n**Swapping squares.** Any $\\sin^2$ can become $1 - \\cos^2$ and vice versa. That is how a mixed expression is reduced to a single function — the central move of Chapter 4.2.\n\n**Killing radicals.** Expressions like $\\sqrt{1 - \\sin^2\\theta}$ collapse to $|\\cos\\theta|$, which is why these identities reappear all over integral calculus.",
    },
    {
      type: "worked-example",
      id: "t3-2-we1",
      title: "Worked example 1: simplifying with the secant form",
      problem: "Simplify $\\dfrac{\\sec^2\\theta - 1}{\\sec^2\\theta}$.",
      steps: [
        {
          text: "The numerator is $\\tan^2\\theta$ by the first division. So the fraction is $\\frac{\\tan^2\\theta}{\\sec^2\\theta}$. Convert to sine and cosine:",
          latex: "\\frac{\\tan^2\\theta}{\\sec^2\\theta} = \\frac{\\sin^2\\theta/\\cos^2\\theta}{1/\\cos^2\\theta} = \\sin^2\\theta",
        },
      ],
      answer: "$\\dfrac{\\sec^2\\theta - 1}{\\sec^2\\theta} = \\sin^2\\theta$.",
      tryFirst: false,
    },
    {
      type: "worked-example",
      id: "t3-2-we2",
      title: "Worked example 2: eliminating the angle",
      problem: "A point moves so that $x = 3\\sec\\theta$ and $y = 4\\tan\\theta$. Find an equation linking $x$ and $y$ with no $\\theta$ in it.",
      steps: [
        {
          text: "Isolate the two functions:",
          latex: "\\sec\\theta = \\frac{x}{3}, \\qquad \\tan\\theta = \\frac{y}{4}",
        },
        {
          text: "Secant and tangent are linked by $\\sec^2\\theta - \\tan^2\\theta = 1$ (the first division, rearranged). Substitute:",
          latex: "\\frac{x^2}{9} - \\frac{y^2}{16} = 1",
        },
      ],
      answer: "$\\dfrac{x^2}{9} - \\dfrac{y^2}{16} = 1$, a hyperbola.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Elimination recipe",
      content:
        "To remove $\\theta$ from a pair of equations, solve each for a trig function, then find the Pythagorean identity that links those two functions. $\\sin$ and $\\cos$ use the original; $\\sec$ and $\\tan$ use the $\\cos^2$ division; $\\csc$ and $\\cot$ use the $\\sin^2$ division.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "t3-2-q1",
      variant: "practice",
      question: "Simplify $(1 - \\cos^2\\theta)\\csc^2\\theta$.",
      options: [
        { text: "$1$", correct: true, feedback: "$1 - \\cos^2\\theta = \\sin^2\\theta$, and $\\csc^2\\theta = \\frac{1}{\\sin^2\\theta}$ — they cancel." },
        { text: "$\\sin^2\\theta$", feedback: "You applied the Pythagorean swap but dropped the cosecant factor." },
        { text: "$\\cot^2\\theta$", feedback: "That would need $\\cos^2\\theta \\cdot \\csc^2\\theta$ instead." },
      ],
      hint: "Swap the bracket for a single square first.",
    },
    {
      type: "quiz",
      id: "t3-2-q2",
      variant: "concept",
      question:
        "You need an identity linking $\\cot$ and $\\csc$ but cannot recall it. What is the fastest safe route?",
      options: [
        {
          text: "Write $\\sin^2 + \\cos^2 = 1$ and divide every term by $\\sin^2\\theta$.",
          correct: true,
          feedback: "Dividing by $\\sin^2$ produces cotangent and cosecant, by construction.",
        },
        { text: "Divide by $\\cos^2\\theta$.", feedback: "That produces the tangent/secant version instead." },
        { text: "Guess $1 + \\csc^2 = \\cot^2$ and check a value.", feedback: "It is backwards — cosecant is the larger one — and guessing is what this method exists to avoid." },
      ],
      hint: "Which division turns $\\cos^2\\theta$ into $\\cot^2\\theta$?",
    },
    {
      type: "quiz",
      id: "t3-2-q3",
      variant: "practice",
      question: "Rewrite $\\tan^2\\theta - \\sec^2\\theta$ as a constant.",
      options: [
        { text: "$-1$", correct: true, feedback: "From $\\tan^2 + 1 = \\sec^2$, subtracting gives $\\tan^2 - \\sec^2 = -1$." },
        { text: "$1$", feedback: "Sign flipped — secant is the bigger of the two, so the difference is negative." },
        { text: "$0$", feedback: "They differ by exactly 1, never by 0." },
      ],
      hint: "Start from $\\tan^2\\theta + 1 = \\sec^2\\theta$ and move one term.",
    },
    {
      type: "numeric",
      id: "t3-2-q4",
      variant: "practice",
      question: "$\\tan\\theta = 2.4$ and $\\theta$ is in quadrant III. Find $\\sec\\theta$.",
      answer: -2.6,
      tolerance: 0.001,
      hint: "Use $\\sec^2\\theta = 1 + \\tan^2\\theta$, then let the quadrant pick the sign.",
      solution: "$\\sec^2\\theta = 1 + 5.76 = 6.76$, so $\\sec\\theta = \\pm 2.6$. In quadrant III cosine is negative, and so is its reciprocal: $\\sec\\theta = -2.6$.",
      commonMistakes: [
        { answer: 2.6, tolerance: 0.001, feedback: "Right size, wrong sign: secant has the sign of cosine, which is negative in quadrant III." },
        { answer: 1.844, tolerance: 0.001, feedback: "You took $\\sqrt{1 + 2.4}$. Square the tangent first: $1 + 2.4^2$." },
      ],
    },
    {
      type: "quiz",
      id: "t3-2-q5",
      variant: "practice",
      multiple: true,
      question: "Select every identity (true wherever both sides are defined).",
      options: [
        { text: "$\\sec^2\\theta - \\tan^2\\theta = 1$", correct: true, feedback: "The $\\cos^2$ division, rearranged." },
        { text: "$\\csc^2\\theta - \\cot^2\\theta = 1$", correct: true, feedback: "The $\\sin^2$ division, rearranged." },
        {
          text: "$\\sec^2\\theta + \\csc^2\\theta = \\sec^2\\theta\\csc^2\\theta$",
          correct: true,
          feedback: "$\\frac{1}{\\cos^2} + \\frac{1}{\\sin^2} = \\frac{\\sin^2 + \\cos^2}{\\sin^2\\cos^2} = \\frac{1}{\\sin^2\\cos^2}$.",
        },
        {
          text: "$\\tan^2\\theta - \\sin^2\\theta = \\tan^2\\theta\\sin^2\\theta$",
          correct: true,
          feedback: "$\\tan^2\\theta - \\sin^2\\theta = \\sin^2\\theta\\left(\\frac{1}{\\cos^2\\theta} - 1\\right) = \\sin^2\\theta\\tan^2\\theta$.",
        },
        { text: "$1 + \\sec^2\\theta = \\tan^2\\theta$", feedback: "Backwards: secant is the bigger one. It is $1 + \\tan^2\\theta = \\sec^2\\theta$." },
        { text: "$\\cot^2\\theta - \\csc^2\\theta = 1$", feedback: "Sign flipped: $\\cot^2\\theta - \\csc^2\\theta = -1$." },
      ],
      hint: "Convert each side to sine and cosine, or test $\\theta = \\frac{\\pi}{4}$, where every function has a simple value.",
    },
    {
      type: "numeric",
      id: "t3-2-q6",
      variant: "practice",
      question: "$\\theta$ is acute and $\\cot\\theta = 0.75$. Find $\\csc\\theta$.",
      answer: 1.25,
      tolerance: 0.001,
      hint: "Which Pythagorean identity links cotangent and cosecant?",
      solution: "$\\csc^2\\theta = 1 + \\cot^2\\theta = 1 + 0.5625 = 1.5625$, so $\\csc\\theta = 1.25$ (positive for an acute angle).",
      commonMistakes: [
        { answer: 1.333, tolerance: 0.001, feedback: "That is $\\tan\\theta = \\frac{1}{\\cot\\theta}$, not the cosecant." },
        { answer: 1.667, tolerance: 0.001, feedback: "That is $\\sec\\theta$. Cosecant pairs with cotangent in $1 + \\cot^2 = \\csc^2$." },
      ],
    },
    {
      type: "numeric",
      id: "t3-2-q7",
      variant: "practice",
      question: "Find the minimum value of $9\\tan^2\\theta + 4\\cot^2\\theta$ (for $\\theta$ where both are defined).",
      answer: 12,
      hint: "Write it as a perfect square plus a constant. Note $\\tan\\theta\\cot\\theta = 1$.",
      solution:
        "$9\\tan^2\\theta + 4\\cot^2\\theta = (3\\tan\\theta - 2\\cot\\theta)^2 + 12\\tan\\theta\\cot\\theta = (3\\tan\\theta - 2\\cot\\theta)^2 + 12$.\n\nA square is never negative, so the minimum is 12, reached when $3\\tan\\theta = 2\\cot\\theta$, i.e. $\\tan^2\\theta = \\frac23$.",
      commonMistakes: [
        { answer: 13, feedback: "That is the value at $\\theta = \\frac{\\pi}{4}$ ($9 + 4$). The minimum is lower, where $\\tan^2\\theta = \\frac23$." },
        { answer: 0, feedback: "Both terms are squares, but they can never both be zero: if $\\tan\\theta$ is small, $\\cot\\theta$ is large." },
      ],
    },
    {
      type: "numeric",
      id: "t3-2-q8",
      variant: "practice",
      question: "Simplify $\\sin^6\\theta + \\cos^6\\theta + 3\\sin^2\\theta\\cos^2\\theta$ to a single number.",
      answer: 1,
      hint: "Let $a = \\sin^2\\theta$ and $b = \\cos^2\\theta$. You know $a + b$. What is $(a + b)^3$?",
      solution:
        "With $a + b = 1$: $a^3 + b^3 = (a + b)^3 - 3ab(a + b) = 1 - 3ab$. So $\\sin^6\\theta + \\cos^6\\theta + 3\\sin^2\\theta\\cos^2\\theta = 1 - 3ab + 3ab = 1$.",
      commonMistakes: [
        { answer: 4, feedback: "Do not replace $\\sin^6 + \\cos^6$ by 1: only the *squares* add to 1. Use $a^3 + b^3 = (a+b)^3 - 3ab(a+b)$." },
      ],
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "angle-sum-and-difference",
  title: "3.3 · Angle Sum and Difference",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "This is the one identity worth deriving slowly, because almost everything in the rest of the chapter is a special case of it.\n\nFirst, kill the tempting wrong answer. Is $\\sin(\\alpha + \\beta) = \\sin\\alpha + \\sin\\beta$? Test it with $\\alpha = \\beta = \\frac{\\pi}{2}$: the left is $\\sin\\pi = 0$, the right is $1 + 1 = 2$. Sine is not linear, and no trig function distributes over addition.",
    },
    { type: "heading", text: "The construction" },
    {
      type: "text",
      content:
        "The real formula comes from a construction. Stack two right triangles: rotate through $\\alpha$, then a further $\\beta$, and land on a point $P$ at distance 1 from the origin.\n\nIn the inner triangle, $OQ = \\cos\\beta$ and $QP = \\sin\\beta$. Project each of those onto the axes using the angle $\\alpha$, and every segment of the picture becomes a *product* of two ratios.",
    },
    {
      type: "interactive",
      config: {
        component: "identity-diagram",
        initialAlpha: 30,
        initialBeta: 25,
        highlight: "both",
        caption:
          "Height of P = QR + PT = sinα·cosβ + cosα·sinβ. Horizontal position of P = OR − QT = cosα·cosβ − sinα·sinβ. Move the sliders: the numbers keep agreeing.",
      },
    },
    {
      type: "callout",
      variant: "definition",
      title: "Angle sum formulas",
      content:
        "$\\sin(\\alpha + \\beta) = \\sin\\alpha\\cos\\beta + \\cos\\alpha\\sin\\beta$\n$\\cos(\\alpha + \\beta) = \\cos\\alpha\\cos\\beta - \\sin\\alpha\\sin\\beta$",
    },
    {
      type: "text",
      content:
        "Two features are worth burning in, because they are what people get wrong:\n\n**Sine mixes, cosine matches.** The sine formula pairs sine with cosine in both terms; the cosine formula pairs like with like.\n**Cosine flips the sign.** A plus inside becomes a minus in the middle. It comes from the subtraction in the construction — the horizontal position of $P$ is reduced by the width $QT$.",
    },
    { type: "heading", text: "Differences and tangent come free" },
    {
      type: "text",
      content:
        "**The difference formulas come free.** Replace $\\beta$ by $-\\beta$ and use the symmetry facts of Chapter 1.2, $\\cos(-\\beta) = \\cos\\beta$ and $\\sin(-\\beta) = -\\sin\\beta$:",
    },
    {
      type: "math",
      latex:
        "\\sin(\\alpha - \\beta) = \\sin\\alpha\\cos\\beta - \\cos\\alpha\\sin\\beta, \\qquad \\cos(\\alpha - \\beta) = \\cos\\alpha\\cos\\beta + \\sin\\alpha\\sin\\beta",
    },
    {
      type: "text",
      content:
        "So there are not four formulas to hold — there are two, plus the rule that swapping to a difference flips both middle signs.\n\nTangent's version follows by dividing the sine formula by the cosine formula and then dividing top and bottom by $\\cos\\alpha\\cos\\beta$:",
    },
    {
      type: "math",
      latex:
        "\\tan(\\alpha + \\beta) = \\frac{\\tan\\alpha + \\tan\\beta}{1 - \\tan\\alpha\\tan\\beta}",
    },
    { type: "heading", text: "Exact values and classic results" },
    {
      type: "worked-example",
      id: "t3-3-we1",
      title: "Immediate payoff: $\\sin 75^\\circ$",
      problem: "Exact values for angles that are not on the standard list. For instance, find $\\sin 75^\\circ$ exactly, using $75^\\circ = 45^\\circ + 30^\\circ$.",
      steps: [
        {
          text: "Apply the sine sum formula with $\\alpha = 45^\\circ$ and $\\beta = 30^\\circ$, then substitute the exact values:",
          latex:
            "\\sin 75^\\circ = \\sin 45^\\circ\\cos 30^\\circ + \\cos 45^\\circ\\sin 30^\\circ = \\frac{\\sqrt2}{2}\\cdot\\frac{\\sqrt3}{2} + \\frac{\\sqrt2}{2}\\cdot\\frac12 = \\frac{\\sqrt6 + \\sqrt2}{4}",
        },
      ],
      answer: "$\\sin 75^\\circ = \\dfrac{\\sqrt6 + \\sqrt2}{4} \\approx 0.966$.",
      tryFirst: false,
    },
    {
      type: "worked-example",
      id: "t3-3-we2",
      title: "Worked example: $\\tan 15^\\circ$",
      problem: "Find $\\tan 15^\\circ$ exactly, in the simplest form.",
      steps: [
        {
          text: "Write $15^\\circ = 45^\\circ - 30^\\circ$. The tangent difference formula flips both signs of the sum formula:",
          latex: "\\tan(45^\\circ - 30^\\circ) = \\frac{\\tan 45^\\circ - \\tan 30^\\circ}{1 + \\tan 45^\\circ\\tan 30^\\circ} = \\frac{1 - \\frac{1}{\\sqrt3}}{1 + \\frac{1}{\\sqrt3}}",
        },
        {
          text: "Multiply top and bottom by $\\sqrt3$:",
          latex: "= \\frac{\\sqrt3 - 1}{\\sqrt3 + 1}",
        },
        {
          text: "Rationalise by multiplying top and bottom by $\\sqrt3 - 1$:",
          latex: "= \\frac{(\\sqrt3 - 1)^2}{3 - 1} = \\frac{4 - 2\\sqrt3}{2} = 2 - \\sqrt3",
        },
      ],
      answer: "$\\tan 15^\\circ = 2 - \\sqrt3 \\approx 0.268$.",
    },
    {
      type: "worked-example",
      id: "t3-3-we3",
      title: "Worked example: when $A + B = 45^\\circ$ (JEE classic)",
      problem: "Show that if $A + B = 45^\\circ$, then $(1 + \\tan A)(1 + \\tan B) = 2$.",
      steps: [
        {
          text: "The condition gives a value for the tangent of the sum:",
          latex: "\\tan(A + B) = \\tan 45^\\circ = 1 \\;\\Rightarrow\\; \\frac{\\tan A + \\tan B}{1 - \\tan A\\tan B} = 1",
        },
        {
          text: "Clear the fraction and collect:",
          latex: "\\tan A + \\tan B + \\tan A\\tan B = 1",
        },
        {
          text: "Now expand the target product and use that line:",
          latex: "(1 + \\tan A)(1 + \\tan B) = 1 + (\\tan A + \\tan B + \\tan A\\tan B) = 1 + 1 = 2",
        },
      ],
      answer: "$(1 + \\tan A)(1 + \\tan B) = 2$ whenever $A + B = 45^\\circ$ (both tangents defined). For example, $(1 + \\tan 20^\\circ)(1 + \\tan 25^\\circ) = 2$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "t3-3-q1",
      variant: "concept",
      question: "Expand $\\cos(x - y)$.",
      options: [
        { text: "$\\cos x\\cos y + \\sin x\\sin y$", correct: true, feedback: "Cosine matches like with like, and the difference version carries a plus in the middle." },
        { text: "$\\cos x\\cos y - \\sin x\\sin y$", feedback: "That is $\\cos(x + y)$. The difference flips that middle sign." },
        { text: "$\\cos x - \\cos y$", feedback: "The distributive error — test it at $x = \\pi$, $y = \\pi$." },
      ],
      hint: "Cosine matches like with like. What happens to the middle sign for a difference?",
    },
    {
      type: "quiz",
      id: "t3-3-q2",
      variant: "practice",
      question: "Which computation gives the exact value of $\\cos 15^\\circ$?",
      options: [
        { text: "$\\cos(45^\\circ - 30^\\circ) = \\cos45^\\circ\\cos30^\\circ + \\sin45^\\circ\\sin30^\\circ$", correct: true, feedback: "Yielding $\\frac{\\sqrt6+\\sqrt2}{4}$ — and $60^\\circ - 45^\\circ$ works just as well." },
        { text: "$\\cos 45^\\circ - \\cos 30^\\circ$", feedback: "Cosine does not distribute; this even comes out negative, while $\\cos15^\\circ$ is close to 1." },
        { text: "$\\frac{1}{2}\\cos 30^\\circ$", feedback: "Halving the angle is not halving the value — that is what 3.4 exists to fix." },
      ],
      hint: "Write $15^\\circ$ as a difference of two standard angles.",
    },
    {
      type: "quiz",
      id: "t3-3-q3",
      variant: "concept",
      question:
        "Using the sum formula, simplify $\\sin\\left(x + \\frac{\\pi}{2}\\right)$.",
      options: [
        { text: "$\\cos x$", correct: true, feedback: "$\\sin x\\cos\\frac{\\pi}{2} + \\cos x\\sin\\frac{\\pi}{2} = 0 + \\cos x$ — the shift relationship from 2.2, now proved." },
        { text: "$-\\cos x$", feedback: "That is $\\sin\\left(x - \\frac{\\pi}{2}\\right)$." },
        { text: "$\\sin x + 1$", feedback: "The distributive error again." },
      ],
      hint: "Substitute the exact values of $\\sin\\frac{\\pi}{2}$ and $\\cos\\frac{\\pi}{2}$ and watch a term vanish.",
    },
    {
      type: "numeric",
      id: "t3-3-q4",
      variant: "practice",
      question: "Find $\\tan 75^\\circ$ exactly, and enter it as a decimal to 3 decimal places.",
      answer: 2 + Math.sqrt(3),
      tolerance: 0.001,
      hint: "$75^\\circ = 45^\\circ + 30^\\circ$. Use the tangent sum formula with $\\tan 45^\\circ = 1$.",
      solution:
        "$\\tan 75^\\circ = \\dfrac{1 + \\frac{1}{\\sqrt3}}{1 - \\frac{1}{\\sqrt3}} = \\dfrac{\\sqrt3 + 1}{\\sqrt3 - 1} = \\dfrac{(\\sqrt3 + 1)^2}{2} = 2 + \\sqrt3 \\approx 3.732$.",
      commonMistakes: [
        { answer: 1 + 1 / Math.sqrt(3), tolerance: 0.001, feedback: "That is $\\tan 45^\\circ + \\tan 30^\\circ$: tangent does not distribute over a sum." },
        { answer: 2 - Math.sqrt(3), tolerance: 0.001, feedback: "That is $\\tan 15^\\circ$. For a sum, the denominator has a minus: $1 - \\tan\\alpha\\tan\\beta$." },
      ],
    },
    {
      type: "numeric",
      id: "t3-3-q5",
      variant: "practice",
      question:
        "$\\alpha$ and $\\beta$ are acute, with $\\sin\\alpha = \\dfrac35$ and $\\cos\\beta = \\dfrac{5}{13}$. Find $\\sin(\\alpha + \\beta)$. Enter a fraction or a decimal to 3 decimal places.",
      answer: 63 / 65,
      tolerance: 0.001,
      hint: "You need all four values $\\sin\\alpha, \\cos\\alpha, \\sin\\beta, \\cos\\beta$. Get the missing two from 3-4-5 and 5-12-13 triangles.",
      solution:
        "$\\cos\\alpha = \\frac45$ and $\\sin\\beta = \\frac{12}{13}$. So $\\sin(\\alpha + \\beta) = \\frac35\\cdot\\frac{5}{13} + \\frac45\\cdot\\frac{12}{13} = \\frac{15 + 48}{65} = \\frac{63}{65} \\approx 0.969$.",
      commonMistakes: [
        { answer: 33 / 65, tolerance: 0.001, feedback: "That is $\\sin(\\beta - \\alpha)$: you subtracted the products. The sum formula adds them." },
        { answer: 99 / 65, tolerance: 0.001, feedback: "That is $\\sin\\alpha + \\sin\\beta$. Sine does not distribute: use $\\sin\\alpha\\cos\\beta + \\cos\\alpha\\sin\\beta$." },
      ],
    },
    {
      type: "numeric",
      id: "t3-3-q6",
      variant: "practice",
      question: "Evaluate $\\sin 70^\\circ\\cos 10^\\circ - \\cos 70^\\circ\\sin 10^\\circ$ to 3 decimal places.",
      answer: Math.sqrt(3) / 2,
      tolerance: 0.001,
      hint: "Read the formula backwards: which compound angle expands to exactly this?",
      solution: "It is $\\sin(70^\\circ - 10^\\circ) = \\sin 60^\\circ = \\frac{\\sqrt3}{2} \\approx 0.866$.",
      commonMistakes: [
        { answer: 0.985, tolerance: 0.001, feedback: "That is $\\sin 80^\\circ$. With a minus in the middle, the sine formula gives the *difference* of the angles." },
        { answer: 0.5, tolerance: 0.001, feedback: "That is $\\cos 60^\\circ$. The pattern sine-cosine minus cosine-sine is a *sine* of a difference." },
      ],
    },
    {
      type: "numeric",
      id: "t3-3-q7",
      variant: "practice",
      question:
        "If $(1 + \\tan 1^\\circ)(1 + \\tan 2^\\circ)(1 + \\tan 3^\\circ)\\cdots(1 + \\tan 45^\\circ) = 2^n$, find $n$.",
      answer: 23,
      hint: "Look for pairs of factors whose angles add to a special value. Is any factor left without a partner?",
      solution:
        "By the last worked example, $(1 + \\tan A)(1 + \\tan B) = 2$ whenever $A + B = 45^\\circ$. Pair $1^\\circ$ with $44^\\circ$, $2^\\circ$ with $43^\\circ$, …, $22^\\circ$ with $23^\\circ$: 22 pairs, each giving 2.\n\nThe last factor is unpaired: $1 + \\tan 45^\\circ = 2$. So the product is $2^{22} \\cdot 2 = 2^{23}$, and $n = 23$.",
      commonMistakes: [
        { answer: 22, feedback: "You counted the 22 pairs but forgot the unpaired factor $1 + \\tan 45^\\circ = 2$." },
        { answer: 45, feedback: "There are 45 factors, but they pair up: each *pair* contributes one factor of 2, not each factor." },
      ],
    },
    {
      type: "quiz",
      id: "t3-3-q8",
      variant: "practice",
      multiple: true,
      question: "Select every expression equal to $\\sin 15^\\circ$.",
      options: [
        { text: "$\\dfrac{\\sqrt6 - \\sqrt2}{4}$", correct: true, feedback: "$\\sin(45^\\circ - 30^\\circ) = \\frac{\\sqrt2}{2}\\cdot\\frac{\\sqrt3}{2} - \\frac{\\sqrt2}{2}\\cdot\\frac12$." },
        { text: "$\\cos 75^\\circ$", correct: true, feedback: "Co-function: $15^\\circ$ and $75^\\circ$ add to $90^\\circ$." },
        { text: "$\\sin 45^\\circ\\cos 30^\\circ - \\cos 45^\\circ\\sin 30^\\circ$", correct: true, feedback: "The difference formula for $\\sin(45^\\circ - 30^\\circ)$, unexpanded." },
        { text: "$\\sin 45^\\circ - \\sin 30^\\circ$", feedback: "Sine does not distribute over differences: this is about $0.207$, while $\\sin 15^\\circ \\approx 0.259$." },
        { text: "$\\tfrac12\\sin 30^\\circ$", feedback: "Halving an angle does not halve its sine: this is $0.25$, slightly too small." },
      ],
      hint: "Write $15^\\circ = 45^\\circ - 30^\\circ$ and expand properly; then look for disguised versions of the same thing.",
    },
    {
      type: "numeric",
      id: "t3-3-q9",
      variant: "practice",
      question:
        "$A$ and $B$ are acute with $\\tan A = \\dfrac12$ and $\\tan B = \\dfrac13$. Find $A + B$ in degrees.",
      answer: 45,
      unit: "degrees",
      hint: "Compute $\\tan(A + B)$ with the formula, then recognise the angle. $A + B$ is between $0^\\circ$ and $180^\\circ$.",
      solution:
        "$\\tan(A + B) = \\dfrac{\\frac12 + \\frac13}{1 - \\frac16} = \\dfrac{5/6}{5/6} = 1$. Both angles are acute and their tangents are below 1, so each is under $45^\\circ$ and $A + B < 90^\\circ$. Hence $A + B = 45^\\circ$.",
      commonMistakes: [
        { answer: 225, feedback: "$\\tan 225^\\circ = 1$ too, but two acute angles with tangents below 1 sum to less than $90^\\circ$." },
      ],
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "double-and-half-angle",
  title: "3.4 · Double and Half Angle",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "There is nothing new in this lesson. Every formula in it is the angle-sum formula with $\\beta$ set equal to $\\alpha$ — which is exactly how you should reconstruct them when your memory fails.",
    },
    { type: "math", latex: "\\sin 2\\theta = \\sin(\\theta + \\theta) = \\sin\\theta\\cos\\theta + \\cos\\theta\\sin\\theta = 2\\sin\\theta\\cos\\theta" },
    { type: "math", latex: "\\cos 2\\theta = \\cos(\\theta + \\theta) = \\cos^2\\theta - \\sin^2\\theta" },
    { type: "heading", text: "Three faces of cos 2θ" },
    {
      type: "text",
      content:
        "The cosine version has three faces, and which one you want depends on what you are trying to eliminate. Feed the Pythagorean identity into it:",
    },
    {
      type: "math",
      latex:
        "\\cos 2\\theta = \\cos^2\\theta - \\sin^2\\theta = 1 - 2\\sin^2\\theta = 2\\cos^2\\theta - 1",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Which form to reach for",
      content:
        "Need everything in **sine**? Use $1 - 2\\sin^2\\theta$. Everything in **cosine**? Use $2\\cos^2\\theta - 1$. All three are the same statement — derived by substituting $\\sin^2 = 1 - \\cos^2$ (or the reverse) into the first one.",
    },
    {
      type: "interactive",
      config: {
        component: "family-gallery",
        families: [
          { label: "cos 2x", expr: "cos(2*x)", latex: "\\cos 2x", excluded: [] },
          { label: "1 − 2sin²x", expr: "1 - 2*sin(x)^2", latex: "1 - 2\\sin^2 x", excluded: [] },
          { label: "2cos²x − 1", expr: "2*cos(x)^2 - 1", latex: "2\\cos^2 x - 1", excluded: [] },
        ],
        window: { xmin: -6.5, xmax: 6.5, ymin: -3.5, ymax: 3.5 },
      },
    },
    {
      type: "text",
      content:
        "Three labels, one curve. Flip between them and nothing moves.\n\n**Half-angle by rearrangement.** Take $\\cos 2\\theta = 1 - 2\\sin^2\\theta$ and solve for $\\sin^2\\theta$:",
    },
    { type: "math", latex: "\\sin^2\\theta = \\frac{1 - \\cos 2\\theta}{2}, \\qquad \\cos^2\\theta = \\frac{1 + \\cos 2\\theta}{2}" },
    {
      type: "text",
      content:
        "Now substitute $\\theta = \\frac{x}{2}$, so $2\\theta = x$:",
    },
    {
      type: "math",
      latex:
        "\\sin\\frac{x}{2} = \\pm\\sqrt{\\frac{1 - \\cos x}{2}}, \\qquad \\cos\\frac{x}{2} = \\pm\\sqrt{\\frac{1 + \\cos x}{2}}",
    },
    {
      type: "callout",
      variant: "warning",
      title: "The $\\pm$ is not decoration",
      content:
        "The square root cannot know which sign you want — only the quadrant of $\\frac{x}{2}$ can decide. Exactly the situation from Chapter 1.4: algebra offers both, geometry picks one.",
    },
    {
      type: "text",
      content:
        "The half-angle forms without the root — $\\sin^2\\theta = \\frac{1 - \\cos 2\\theta}{2}$ — have a second life in calculus, where they are the standard trick for integrating $\\sin^2$ and $\\cos^2$. Squares are hard to integrate; a plain cosine is easy.",
    },
    { type: "heading", text: "Using double and half angles" },
    {
      type: "worked-example",
      id: "t3-4-we1",
      title: "Worked example 1: an exact half angle",
      problem: "Find $\\sin 22.5^\\circ$ exactly.",
      steps: [
        {
          text: "$22.5^\\circ$ is half of $45^\\circ$, whose cosine is known. Use the half-angle form with $x = 45^\\circ$:",
          latex: "\\sin^2 22.5^\\circ = \\frac{1 - \\cos 45^\\circ}{2} = \\frac{1 - \\frac{\\sqrt2}{2}}{2} = \\frac{2 - \\sqrt2}{4}",
        },
        {
          text: "Settle the $\\pm$: $22.5^\\circ$ is in quadrant I, so the sine is positive.",
          latex: "\\sin 22.5^\\circ = \\frac{\\sqrt{2 - \\sqrt2}}{2}",
        },
      ],
      answer: "$\\sin 22.5^\\circ = \\dfrac{\\sqrt{2 - \\sqrt2}}{2} \\approx 0.383$.",
    },
    {
      type: "worked-example",
      id: "t3-4-we2",
      title: "Worked example 2: a telescoping product (JEE classic)",
      problem: "Evaluate $\\cos 20^\\circ\\cos 40^\\circ\\cos 80^\\circ$ without a calculator.",
      steps: [
        {
          text: "The angles double each time, which is the signature of $\\sin 2\\theta = 2\\sin\\theta\\cos\\theta$. Multiply and divide by $\\sin 20^\\circ$ to start a chain. Call the product $P$:",
          latex: "P \\sin 20^\\circ = \\sin 20^\\circ\\cos 20^\\circ\\cos 40^\\circ\\cos 80^\\circ",
        },
        {
          text: "Each $\\sin\\theta\\cos\\theta$ is $\\frac12\\sin 2\\theta$. Collapse the chain one link at a time:",
          latex: "= \\tfrac12\\sin 40^\\circ\\cos 40^\\circ\\cos 80^\\circ = \\tfrac14\\sin 80^\\circ\\cos 80^\\circ = \\tfrac18\\sin 160^\\circ",
        },
        {
          text: "$\\sin 160^\\circ = \\sin(180^\\circ - 20^\\circ) = \\sin 20^\\circ$ (quadrant II, reference angle $20^\\circ$). So the $\\sin 20^\\circ$ cancels:",
          latex: "P\\sin 20^\\circ = \\tfrac18\\sin 20^\\circ \\;\\Rightarrow\\; P = \\tfrac18",
        },
      ],
      answer: "$\\cos 20^\\circ\\cos 40^\\circ\\cos 80^\\circ = \\tfrac18$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "t3-4-q1",
      variant: "practice",
      question: "If $\\sin\\theta = \\dfrac{3}{5}$ and $\\theta$ is in quadrant I, what is $\\sin 2\\theta$?",
      options: [
        { text: "$\\dfrac{24}{25}$", correct: true, feedback: "$\\cos\\theta = \\frac45$, so $2\\sin\\theta\\cos\\theta = 2\\cdot\\frac35\\cdot\\frac45$." },
        { text: "$\\dfrac{6}{5}$", feedback: "That is $2\\sin\\theta$ — doubling the angle is not doubling the value, and no sine exceeds 1." },
        { text: "$\\dfrac{7}{25}$", feedback: "That is $\\cos 2\\theta = 1 - 2\\left(\\frac35\\right)^2$." },
      ],
      hint: "$\\sin 2\\theta$ needs both $\\sin\\theta$ and $\\cos\\theta$. Find the cosine first.",
    },
    {
      type: "quiz",
      id: "t3-4-q2",
      variant: "concept",
      question: "Which is *not* equal to $\\cos 2\\theta$?",
      options: [
        { text: "$2\\sin^2\\theta - 1$", correct: true, feedback: "Sign error: the sine version is $1 - 2\\sin^2\\theta$. This one is its negative." },
        { text: "$\\cos^2\\theta - \\sin^2\\theta$", feedback: "The direct expansion from the sum formula." },
        { text: "$2\\cos^2\\theta - 1$", feedback: "Obtained by substituting $\\sin^2 = 1 - \\cos^2$." },
      ],
      hint: "Test each at $\\theta = 0$, where $\\cos 2\\theta = 1$.",
    },
    {
      type: "quiz",
      id: "t3-4-q3",
      variant: "concept",
      question:
        "You have forgotten the double-angle formula for sine. What is the fastest reconstruction?",
      options: [
        {
          text: "Write $\\sin(\\theta + \\theta)$ and expand with the angle-sum formula.",
          correct: true,
          feedback: "The two terms are identical, so they add to $2\\sin\\theta\\cos\\theta$.",
        },
        { text: "Assume $\\sin 2\\theta = 2\\sin\\theta$ and check later.", feedback: "It fails at $\\theta = \\frac{\\pi}{2}$: the left is 0, the right is 2." },
        { text: "Look up the half-angle formula and invert it.", feedback: "Possible but a detour; the sum formula is the parent of both." },
      ],
      hint: "Every formula in this lesson is a special case of one parent formula.",
    },
    {
      type: "numeric",
      id: "t3-4-q4",
      variant: "practice",
      question: "$\\cos\\theta = -0.6$ and $\\theta$ is in quadrant II. Find $\\sin 2\\theta$.",
      answer: -0.96,
      tolerance: 0.001,
      hint: "Find $\\sin\\theta$ with its sign first, then use $2\\sin\\theta\\cos\\theta$.",
      solution: "In quadrant II, $\\sin\\theta = +0.8$. So $\\sin 2\\theta = 2(0.8)(-0.6) = -0.96$.",
      commonMistakes: [
        { answer: 0.96, tolerance: 0.001, feedback: "Sign slip: one factor is negative ($\\cos\\theta$) and one positive ($\\sin\\theta$)." },
        { answer: -0.28, tolerance: 0.001, feedback: "That is $\\cos 2\\theta = 2(0.36) - 1$. The question asks for $\\sin 2\\theta$." },
      ],
    },
    {
      type: "numeric",
      id: "t3-4-q5",
      variant: "practice",
      question: "$\\tan\\theta = \\dfrac12$. Find $\\tan 2\\theta$. Enter a fraction or a decimal to 3 decimal places.",
      answer: 4 / 3,
      tolerance: 0.001,
      hint: "Set $\\beta = \\alpha$ in the tangent sum formula.",
      solution: "$\\tan 2\\theta = \\dfrac{2\\tan\\theta}{1 - \\tan^2\\theta} = \\dfrac{1}{1 - \\frac14} = \\dfrac43$.",
      commonMistakes: [
        { answer: 1, feedback: "That is $2\\tan\\theta$. Doubling the angle does not double the tangent." },
        { answer: 0.8, tolerance: 0.001, feedback: "You used $1 + \\tan^2\\theta$ in the denominator; the sum formula has a minus: $1 - \\tan\\alpha\\tan\\beta$." },
      ],
    },
    {
      type: "numeric",
      id: "t3-4-q6",
      variant: "practice",
      question: "Evaluate $\\sin 10^\\circ\\sin 50^\\circ\\sin 70^\\circ$ without a calculator. Enter a fraction or a decimal.",
      answer: 0.125,
      tolerance: 0.0001,
      hint: "Convert each sine to the cosine of its complement. Do the new angles look familiar?",
      solution:
        "$\\sin 10^\\circ = \\cos 80^\\circ$, $\\sin 50^\\circ = \\cos 40^\\circ$, $\\sin 70^\\circ = \\cos 20^\\circ$. The product is $\\cos 20^\\circ\\cos 40^\\circ\\cos 80^\\circ = \\frac18$ by worked example 2.",
      commonMistakes: [
        { answer: 0.25, tolerance: 0.0001, feedback: "Count the halvings: three links of $\\sin\\theta\\cos\\theta = \\frac12\\sin2\\theta$ give $\\frac18$, not $\\frac14$." },
      ],
    },
    {
      type: "numeric",
      id: "t3-4-q7",
      variant: "practice",
      question: "Evaluate $\\sin 22.5^\\circ\\cos 22.5^\\circ$ to 3 decimal places.",
      answer: Math.SQRT2 / 4,
      tolerance: 0.001,
      hint: "This is half of a double-angle sine.",
      solution: "$\\sin 22.5^\\circ\\cos 22.5^\\circ = \\frac12\\sin 45^\\circ = \\frac{\\sqrt2}{4} \\approx 0.354$.",
      commonMistakes: [
        { answer: Math.SQRT2 / 2, tolerance: 0.001, feedback: "That is $\\sin 45^\\circ = 2\\sin 22.5^\\circ\\cos 22.5^\\circ$. You need half of it." },
      ],
    },
    {
      type: "quiz",
      id: "t3-4-q8",
      variant: "practice",
      multiple: true,
      question: "Select every expression identically equal to $\\sin^2\\theta$ (where defined).",
      options: [
        { text: "$\\dfrac{1 - \\cos 2\\theta}{2}$", correct: true, feedback: "The half-angle form, from $\\cos 2\\theta = 1 - 2\\sin^2\\theta$." },
        { text: "$1 - \\cos^2\\theta$", correct: true, feedback: "Pythagoras." },
        { text: "$\\cos^2\\theta - \\cos 2\\theta$", correct: true, feedback: "$\\cos^2\\theta - (\\cos^2\\theta - \\sin^2\\theta) = \\sin^2\\theta$." },
        { text: "$\\dfrac{\\sin 2\\theta}{2\\cot\\theta}$", correct: true, feedback: "$\\dfrac{2\\sin\\theta\\cos\\theta}{2\\cos\\theta/\\sin\\theta} = \\sin^2\\theta$." },
        { text: "$1 - \\cos 2\\theta$", feedback: "Missing the $\\frac12$: $1 - \\cos 2\\theta = 2\\sin^2\\theta$." },
        { text: "$\\dfrac{1 + \\cos 2\\theta}{2}$", feedback: "That is $\\cos^2\\theta$; the plus sign belongs to cosine." },
      ],
      hint: "Test each at $\\theta = 0$ (where $\\sin^2\\theta = 0$) and $\\theta = \\frac{\\pi}{2}$ (where it is 1).",
    },
    {
      type: "numeric",
      id: "t3-4-q9",
      variant: "practice",
      question: "Find the minimum value of $\\sin^4 x + \\cos^4 x$.",
      answer: 0.5,
      tolerance: 0.001,
      hint: "Complete the square: $a^2 + b^2 = (a + b)^2 - 2ab$ with $a = \\sin^2 x$, $b = \\cos^2 x$.",
      solution:
        "$\\sin^4 x + \\cos^4 x = (\\sin^2 x + \\cos^2 x)^2 - 2\\sin^2 x\\cos^2 x = 1 - \\frac12\\sin^2 2x$.\n\n$\\sin^2 2x$ is at most 1, so the minimum is $1 - \\frac12 = \\frac12$ (at $x = \\frac{\\pi}{4}$).",
      commonMistakes: [
        { answer: 0, feedback: "The two terms cannot both vanish: when one is small, the other is near 1." },
        { answer: 1, feedback: "1 is the *maximum* (at $x = 0$). The minimum comes where $\\sin^2 2x = 1$." },
      ],
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "rewriting-products-and-sums",
  title: "3.5 · Rewriting Products and Sums",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "A short lesson, and a consequence rather than a new idea. Write the sum and difference formulas for cosine one above the other:",
    },
    {
      type: "math",
      latex:
        "\\begin{aligned}\\cos(\\alpha - \\beta) &= \\cos\\alpha\\cos\\beta + \\sin\\alpha\\sin\\beta\\\\ \\cos(\\alpha + \\beta) &= \\cos\\alpha\\cos\\beta - \\sin\\alpha\\sin\\beta\\end{aligned}",
    },
    {
      type: "text",
      content:
        "**Add them** and the sine terms cancel. **Subtract them** and the cosine terms cancel. Either way, a product becomes a sum:",
    },
    {
      type: "math",
      latex:
        "\\cos\\alpha\\cos\\beta = \\tfrac{1}{2}\\bigl[\\cos(\\alpha-\\beta) + \\cos(\\alpha+\\beta)\\bigr], \\qquad \\sin\\alpha\\sin\\beta = \\tfrac{1}{2}\\bigl[\\cos(\\alpha-\\beta) - \\cos(\\alpha+\\beta)\\bigr]"
    },
    {
      type: "text",
      content:
        "Doing the same with the two sine formulas gives the mixed case:",
    },
    {
      type: "math",
      latex:
        "\\sin\\alpha\\cos\\beta = \\tfrac{1}{2}\\bigl[\\sin(\\alpha+\\beta) + \\sin(\\alpha-\\beta)\\bigr]",
    },
    {
      type: "callout",
      variant: "info",
      title: "Why anyone cares: beats",
      content:
        "Two tuning forks at 440 Hz and 444 Hz sound together. The combined pressure is a sum of two sines, and the sum-to-product identity rewrites it as a single 442 Hz tone multiplied by a slow $2$ Hz envelope. You hear one note pulsing four times a second — the **beat frequency**, which is the *difference* of the two frequencies. That is why piano tuners listen for the beats to disappear.",
    },
    { type: "heading", text: "Sums into products" },
    {
      type: "text",
      content:
        "Read backwards, the same identities turn sums into products:",
    },
    {
      type: "math",
      latex:
        "\\sin A + \\sin B = 2\\sin\\!\\left(\\frac{A+B}{2}\\right)\\cos\\!\\left(\\frac{A-B}{2}\\right)",
    },
    {
      type: "text",
      content:
        "The half-sum and half-difference in there are the average frequency and the beat envelope, in exactly the acoustic sense above. And this direction is what makes such sums solvable in Chapter 4 — a product equals zero when one factor does, whereas a sum offers no such handle.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Do not memorize these",
      content:
        "Six formulas, all obtainable in one line by adding or subtracting two you already have. When you meet one in the wild, ask which pair of sum/difference formulas produces the terms you see, and add or subtract them.",
    },
    {
      type: "text",
      content:
        "The cosine sum-to-product forms come the same way, from the two cosine product formulas read backwards:\n$\\cos A + \\cos B = 2\\cos\\frac{A+B}{2}\\cos\\frac{A-B}{2}$ and $\\cos A - \\cos B = -2\\sin\\frac{A+B}{2}\\sin\\frac{A-B}{2}$.\nWatch the minus sign in the second one: it is the most common slip in this lesson.",
    },
    { type: "heading", text: "Using the conversions" },
    {
      type: "worked-example",
      id: "t3-5-we1",
      title: "Worked example 1: a product of non-standard angles",
      problem: "Evaluate $\\sin 75^\\circ\\cos 15^\\circ$ exactly.",
      steps: [
        {
          text: "Neither factor is a standard value, but their sum and difference are. Use the mixed product formula with $\\alpha = 75^\\circ$, $\\beta = 15^\\circ$:",
          latex: "\\sin 75^\\circ\\cos 15^\\circ = \\tfrac12\\bigl[\\sin 90^\\circ + \\sin 60^\\circ\\bigr]",
        },
        {
          text: "Substitute:",
          latex: "= \\tfrac12\\left(1 + \\tfrac{\\sqrt3}{2}\\right) = \\frac{2 + \\sqrt3}{4}",
        },
      ],
      answer: "$\\sin 75^\\circ\\cos 15^\\circ = \\dfrac{2 + \\sqrt3}{4} \\approx 0.933$.",
    },
    {
      type: "worked-example",
      id: "t3-5-we2",
      title: "Worked example 2: a sum that vanishes",
      problem: "Show that $\\cos 20^\\circ + \\cos 100^\\circ + \\cos 140^\\circ = 0$.",
      steps: [
        {
          text: "Pair the two larger angles and convert their sum to a product:",
          latex: "\\cos 100^\\circ + \\cos 140^\\circ = 2\\cos\\frac{100^\\circ + 140^\\circ}{2}\\cos\\frac{100^\\circ - 140^\\circ}{2} = 2\\cos 120^\\circ\\cos(-20^\\circ)",
        },
        {
          text: "$\\cos 120^\\circ = -\\frac12$ and cosine is even, so:",
          latex: "2\\left(-\\tfrac12\\right)\\cos 20^\\circ = -\\cos 20^\\circ",
        },
        {
          text: "That cancels the first term exactly.",
          latex: "\\cos 20^\\circ + (-\\cos 20^\\circ) = 0",
        },
      ],
      answer: "The sum is $0$.",
    },
    {
      type: "worked-example",
      id: "t3-5-we3",
      title: "Worked example 3: simplifying a ratio of sums",
      problem: "Simplify $\\dfrac{\\sin 3x + \\sin x}{\\cos 3x + \\cos x}$.",
      steps: [
        {
          text: "Convert the top and the bottom separately. Both have half-sum $2x$ and half-difference $x$:",
          latex: "\\frac{2\\sin 2x\\cos x}{2\\cos 2x\\cos x}",
        },
        {
          text: "The common factor $2\\cos x$ cancels:",
          latex: "= \\frac{\\sin 2x}{\\cos 2x} = \\tan 2x",
        },
      ],
      answer: "$\\dfrac{\\sin 3x + \\sin x}{\\cos 3x + \\cos x} = \\tan 2x$ (where defined).",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "t3-5-q1",
      variant: "concept",
      question:
        "Adding the sum and difference formulas for cosine eliminates which terms?",
      options: [
        { text: "The $\\sin\\alpha\\sin\\beta$ terms, since they carry opposite signs.", correct: true, feedback: "Leaving $2\\cos\\alpha\\cos\\beta$, which gives the product-to-sum formula." },
        { text: "The $\\cos\\alpha\\cos\\beta$ terms.", feedback: "Those have the same sign in both, so adding doubles them." },
        { text: "Nothing cancels; you must subtract.", feedback: "Subtracting cancels the *cosine* products instead — both operations are useful." },
      ],
      hint: "Write the two formulas one above the other and compare the signs of each term.",
    },
    {
      type: "quiz",
      id: "t3-5-q2",
      variant: "practice",
      question: "Two notes at 300 Hz and 306 Hz are played together. How many beats per second are heard?",
      options: [
        { text: "6", correct: true, feedback: "The beat rate is the difference of the frequencies, which the sum-to-product form makes explicit." },
        { text: "303", feedback: "That is the average — the pitch you hear, not the pulsing rate." },
        { text: "3", feedback: "Half the difference appears inside the envelope, but the envelope's magnitude peaks twice per cycle, giving 6 beats." },
      ],
      hint: "The beat rate is set by how far apart the two frequencies are.",
    },
    {
      type: "numeric",
      id: "t3-5-q3",
      variant: "practice",
      question: "Evaluate $2\\sin 75^\\circ\\sin 15^\\circ$ exactly. Enter a fraction or a decimal.",
      answer: 0.5,
      tolerance: 0.001,
      hint: "Use $2\\sin\\alpha\\sin\\beta = \\cos(\\alpha - \\beta) - \\cos(\\alpha + \\beta)$.",
      solution: "$2\\sin 75^\\circ\\sin 15^\\circ = \\cos 60^\\circ - \\cos 90^\\circ = \\frac12 - 0 = \\frac12$.",
      commonMistakes: [
        { answer: -0.5, tolerance: 0.001, feedback: "Order matters: it is $\\cos(\\alpha - \\beta) - \\cos(\\alpha + \\beta)$, so $\\cos 60^\\circ$ comes first." },
        { answer: 0.25, tolerance: 0.001, feedback: "The factor 2 in front already cancels the $\\frac12$ in the formula." },
      ],
    },
    {
      type: "numeric",
      id: "t3-5-q4",
      variant: "practice",
      question: "Evaluate $\\sin 15^\\circ\\cos 75^\\circ$ to 3 decimal places.",
      answer: (1 - Math.sqrt(3) / 2) / 2,
      tolerance: 0.001,
      hint: "Use the mixed formula with $\\alpha = 15^\\circ$ and $\\beta = 75^\\circ$. Watch the sign of $\\alpha - \\beta$.",
      solution:
        "$\\sin 15^\\circ\\cos 75^\\circ = \\tfrac12[\\sin 90^\\circ + \\sin(-60^\\circ)] = \\tfrac12\\left(1 - \\tfrac{\\sqrt3}{2}\\right) = \\frac{2 - \\sqrt3}{4} \\approx 0.067$.",
      commonMistakes: [
        { answer: (2 + Math.sqrt(3)) / 4, tolerance: 0.001, feedback: "That treats $\\sin(15^\\circ - 75^\\circ)$ as $+\\sin 60^\\circ$. It is $\\sin(-60^\\circ) = -\\sin 60^\\circ$." },
      ],
    },
    {
      type: "quiz",
      id: "t3-5-q5",
      variant: "practice",
      multiple: true,
      question: "Select every correct conversion.",
      options: [
        { text: "$\\sin 5x + \\sin 3x = 2\\sin 4x\\cos x$", correct: true, feedback: "Half-sum $4x$, half-difference $x$." },
        { text: "$\\cos 5x + \\cos 3x = 2\\cos 4x\\cos x$", correct: true, feedback: "Same half-sum and half-difference, cosines throughout." },
        { text: "$\\cos 5x - \\cos 3x = -2\\sin 4x\\sin x$", correct: true, feedback: "The cosine difference carries the minus sign." },
        { text: "$\\sin 5x - \\sin 3x = 2\\sin 4x\\sin x$", feedback: "A sine difference gives cosine × sine: $2\\cos 4x\\sin x$." },
        { text: "$\\cos 5x - \\cos 3x = 2\\sin 4x\\sin x$", feedback: "Missing the minus sign. At small positive $x$, $\\cos 5x < \\cos 3x$, so the left side is negative while this right side is positive." },
      ],
      hint: "Each conversion uses the half-sum $4x$ and half-difference $x$. Check which functions appear and the sign.",
    },
    {
      type: "numeric",
      id: "t3-5-q6",
      variant: "practice",
      question:
        "Without a calculator, evaluate $\\sin 20^\\circ\\sin 40^\\circ\\sin 60^\\circ\\sin 80^\\circ$. Enter a fraction or a decimal.",
      answer: 3 / 16,
      tolerance: 0.0001,
      hint: "Set $\\sin 60^\\circ$ aside. Convert $\\sin 20^\\circ\\sin 40^\\circ$ to a sum first, then multiply by $\\sin 80^\\circ$ and convert again.",
      solution:
        "$\\sin 20^\\circ\\sin 40^\\circ = \\tfrac12(\\cos 20^\\circ - \\cos 60^\\circ) = \\tfrac12\\cos 20^\\circ - \\tfrac14$.\n\nMultiply by $\\sin 80^\\circ$: $\\tfrac12\\cos 20^\\circ\\sin 80^\\circ - \\tfrac14\\sin 80^\\circ = \\tfrac14(\\sin 100^\\circ + \\sin 60^\\circ) - \\tfrac14\\sin 80^\\circ$. Since $\\sin 100^\\circ = \\sin 80^\\circ$, this leaves $\\tfrac14\\sin 60^\\circ = \\tfrac{\\sqrt3}{8}$.\n\nFinally multiply by $\\sin 60^\\circ = \\tfrac{\\sqrt3}{2}$: $\\tfrac{\\sqrt3}{8}\\cdot\\tfrac{\\sqrt3}{2} = \\tfrac{3}{16}$.",
      commonMistakes: [
        { answer: Math.sqrt(3) / 8, tolerance: 0.0001, feedback: "That is $\\sin 20^\\circ\\sin 40^\\circ\\sin 80^\\circ$. Don't forget the factor $\\sin 60^\\circ$." },
        { answer: 0.125, tolerance: 0.0001, feedback: "That is the cosine product $\\cos 20^\\circ\\cos 40^\\circ\\cos 80^\\circ$. The sine version comes out differently." },
      ],
    },
    {
      type: "numeric",
      id: "t3-5-q7",
      variant: "practice",
      question: "Two tuning forks at 440 Hz and 443.5 Hz sound together. How many beats are heard in 10 seconds?",
      answer: 35,
      hint: "Find the beat frequency first: the difference of the two frequencies.",
      solution: "Beat frequency $= 443.5 - 440 = 3.5$ Hz, so in 10 s there are $3.5 \\times 10 = 35$ beats.",
      commonMistakes: [
        { answer: 17.5, tolerance: 0.01, feedback: "That uses half the difference, the envelope's frequency. The loudness peaks twice per envelope cycle." },
        { answer: 3.5, tolerance: 0.01, feedback: "That is beats per *second*. Multiply by 10 seconds." },
      ],
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "the-derivation-game",
  title: "3.6 · The Derivation Game",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "Everything in this chapter came from a handful of facts. Here is the complete list — the only things worth committing to memory in all of trigonometry.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The core set",
      content:
        "1. **Pythagoras:** $\\sin^2\\theta + \\cos^2\\theta = 1$ (the circle's own equation).\n2. **Angle sum:** $\\sin(\\alpha+\\beta) = \\sin\\alpha\\cos\\beta + \\cos\\alpha\\sin\\beta$ and $\\cos(\\alpha+\\beta) = \\cos\\alpha\\cos\\beta - \\sin\\alpha\\sin\\beta$.\n3. **Circle symmetry:** $\\sin(-\\theta) = -\\sin\\theta$, $\\cos(-\\theta) = \\cos\\theta$, and $\\cos\\theta = \\sin\\left(\\theta + \\frac{\\pi}{2}\\right)$.\n\nPlus two definitions: $\\tan = \\frac{\\sin}{\\cos}$, and the reciprocals $\\sec, \\csc, \\cot$.",
    },
    { type: "heading", text: "Paths from the core" },
    {
      type: "text",
      content:
        "Everything else is a *path* from that core. The game is to name the path before doing any algebra.",
    },
    {
      type: "table",
      headers: ["Target", "Path from the core"],
      rows: [
        ["$1 + \\tan^2 = \\sec^2$", "Pythagoras, divided by $\\cos^2$"],
        ["$1 + \\cot^2 = \\csc^2$", "Pythagoras, divided by $\\sin^2$"],
        ["$\\sin(\\alpha - \\beta)$", "Angle sum with $\\beta \\to -\\beta$, then symmetry"],
        ["$\\sin 2\\theta$", "Angle sum with $\\beta = \\alpha$"],
        ["$\\cos 2\\theta$ (three forms)", "Angle sum with $\\beta = \\alpha$, then Pythagoras twice"],
        ["Half angle", "Rearrange $\\cos 2\\theta$, then substitute $\\theta \\to \\frac{x}{2}$"],
        ["Product to sum", "Add or subtract two angle-sum formulas"],
        ["$\\tan(\\alpha+\\beta)$", "Divide the two sum formulas, then divide through by $\\cos\\alpha\\cos\\beta$"],
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "The three questions to ask when stuck",
      content:
        "1. **Can I write everything in sine and cosine?** Usually yes, and usually it helps.\n2. **Is there a hidden $\\sin^2 + \\cos^2$?** Look for a $1$ that wants to be split, or a pair that wants to be joined.\n3. **Is a double or half angle in sight?** If the two sides use different angles ($2x$ and $x$, say), the sum formula is the bridge.",
    },
    { type: "heading", text: "Proofs under the rules" },
    {
      type: "worked-example",
      id: "t3-6-we1",
      title: "Try one under the rules",
      problem: "Prove $\\dfrac{\\sin 2\\theta}{1 + \\cos 2\\theta} = \\tan\\theta$.",
      steps: [
        {
          text: "Start on the left (messier). Use the double-angle forms — $\\sin 2\\theta = 2\\sin\\theta\\cos\\theta$, and choose the cosine version that makes the denominator collapse, $\\cos 2\\theta = 2\\cos^2\\theta - 1$:",
          latex: "\\frac{2\\sin\\theta\\cos\\theta}{1 + 2\\cos^2\\theta - 1} = \\frac{2\\sin\\theta\\cos\\theta}{2\\cos^2\\theta} = \\frac{\\sin\\theta}{\\cos\\theta} = \\tan\\theta",
        },
        {
          text: "The whole proof hinged on picking the *right* face of $\\cos 2\\theta$ — the one whose $-1$ cancels the $+1$. That choice is the skill; the algebra afterwards is routine.",
        },
      ],
      answer: "The left side reduces to $\\tan\\theta$: proved (wherever $\\cos 2\\theta \\ne -1$).",
    },
    {
      type: "worked-example",
      id: "t3-6-we2",
      title: "Worked example: choosing two faces at once",
      problem: "Prove $\\dfrac{1 + \\sin 2\\theta + \\cos 2\\theta}{1 + \\sin 2\\theta - \\cos 2\\theta} = \\cot\\theta$.",
      steps: [
        {
          text: "The numerator has $1 + \\cos 2\\theta$, which wants the cosine face $2\\cos^2\\theta - 1$. The denominator has $1 - \\cos 2\\theta$, which wants the sine face $1 - 2\\sin^2\\theta$. Use each where it kills the 1:",
          latex: "\\frac{2\\sin\\theta\\cos\\theta + 2\\cos^2\\theta}{2\\sin\\theta\\cos\\theta + 2\\sin^2\\theta}",
        },
        {
          text: "Factor the top and the bottom:",
          latex: "= \\frac{2\\cos\\theta(\\sin\\theta + \\cos\\theta)}{2\\sin\\theta(\\cos\\theta + \\sin\\theta)}",
        },
        {
          text: "Cancel the common bracket:",
          latex: "= \\frac{\\cos\\theta}{\\sin\\theta} = \\cot\\theta",
        },
      ],
      answer: "The left side reduces to $\\cot\\theta$: proved (wherever both sides are defined).",
    },
    { type: "heading", text: "Conditional identities: angles of a triangle" },
    {
      type: "text",
      content:
        "JEE has a favourite twist: an identity that holds only under a *condition*, such as $A + B + C = \\pi$ (the angles of a triangle). The condition becomes one more fact you are allowed to use, usually by writing one angle in terms of the others.",
    },
    {
      type: "worked-example",
      id: "t3-6-we3",
      title: "Worked example: the tangent rule for a triangle",
      problem: "If $A + B + C = \\pi$ (no angle a right angle), prove $\\tan A + \\tan B + \\tan C = \\tan A\\tan B\\tan C$.",
      steps: [
        {
          text: "Use the condition to remove $C$: $A + B = \\pi - C$, so the tangents of the two sides agree. Tangent has period $\\pi$ and is odd, so $\\tan(\\pi - C) = -\\tan C$:",
          latex: "\\tan(A + B) = -\\tan C",
        },
        {
          text: "Expand the left with the sum formula:",
          latex: "\\frac{\\tan A + \\tan B}{1 - \\tan A\\tan B} = -\\tan C",
        },
        {
          text: "Multiply out and rearrange:",
          latex: "\\tan A + \\tan B = -\\tan C + \\tan A\\tan B\\tan C \\;\\Rightarrow\\; \\tan A + \\tan B + \\tan C = \\tan A\\tan B\\tan C",
        },
      ],
      answer: "In any triangle with no right angle, $\\tan A + \\tan B + \\tan C = \\tan A\\tan B\\tan C$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "t3-6-q1",
      variant: "concept",
      question:
        "To prove $\\dfrac{1 - \\cos 2\\theta}{\\sin 2\\theta} = \\tan\\theta$, which form of $\\cos 2\\theta$ should you choose?",
      options: [
        { text: "$1 - 2\\sin^2\\theta$", correct: true, feedback: "Then the numerator becomes $2\\sin^2\\theta$, and the $\\cos\\theta$ in the denominator survives to make a tangent." },
        { text: "$2\\cos^2\\theta - 1$", feedback: "That leaves $2 - 2\\cos^2\\theta$ — recoverable, but a longer road." },
        { text: "$\\cos^2\\theta - \\sin^2\\theta$", feedback: "Nothing cancels against the 1; you would still have to convert." },
      ],
      hint: "You want the $1$ in the numerator to disappear.",
    },
    {
      type: "quiz",
      id: "t3-6-q2",
      variant: "concept",
      question:
        "Which of these is *not* in the core set — i.e. must be derived rather than remembered?",
      options: [
        { text: "$\\sin\\alpha\\cos\\beta = \\frac12[\\sin(\\alpha+\\beta) + \\sin(\\alpha-\\beta)]$", correct: true, feedback: "A product-to-sum formula: obtained by adding two angle-sum formulas." },
        { text: "$\\sin^2\\theta + \\cos^2\\theta = 1$", feedback: "Core — it is the circle's equation." },
        { text: "$\\cos(\\alpha+\\beta) = \\cos\\alpha\\cos\\beta - \\sin\\alpha\\sin\\beta$", feedback: "Core — the angle-sum construction from 3.3." },
      ],
      hint: "Look back at the callout listing the core set. Which of these can be produced from two others?",
    },
    {
      type: "quiz",
      id: "t3-6-q3",
      variant: "practice",
      question: "Simplify $\\dfrac{\\cos^2\\theta - \\sin^2\\theta}{\\cos\\theta + \\sin\\theta}$.",
      options: [
        { text: "$\\cos\\theta - \\sin\\theta$", correct: true, feedback: "The numerator is a difference of squares, $(\\cos + \\sin)(\\cos - \\sin)$; the common factor cancels." },
        { text: "$\\cos 2\\theta$", feedback: "The numerator alone is $\\cos 2\\theta$ — but the denominator is still there." },
        { text: "$1$", feedback: "That would need the numerator to be $\\cos^2 + \\sin^2$, with a plus." },
      ],
      hint: "Before reaching for an identity, check whether it factors.",
    },
    {
      type: "numeric",
      id: "t3-6-q4",
      variant: "practice",
      question: "In a triangle $ABC$, $\\tan A = 1$ and $\\tan B = 2$. Find $\\tan C$.",
      answer: 3,
      hint: "Use $C = \\pi - (A + B)$, so $\\tan C = -\\tan(A + B)$.",
      solution:
        "$\\tan(A + B) = \\dfrac{1 + 2}{1 - 2} = -3$, so $\\tan C = 3$. Check with the triangle rule: $1 + 2 + 3 = 6 = 1 \\times 2 \\times 3$. ✓",
      commonMistakes: [
        { answer: -3, feedback: "That is $\\tan(A + B)$. Since $C = \\pi - (A + B)$, $\\tan C$ is its negative." },
      ],
    },
    {
      type: "numeric",
      id: "t3-6-q5",
      variant: "practice",
      question: "Without a calculator, evaluate $\\dfrac{\\tan 70^\\circ - \\tan 20^\\circ}{\\tan 50^\\circ}$.",
      answer: 2,
      hint: "$50^\\circ = 70^\\circ - 20^\\circ$. Expand $\\tan 50^\\circ$ with the difference formula, and note that $\\tan 70^\\circ\\tan 20^\\circ = 1$ (complementary angles).",
      solution:
        "$\\tan 50^\\circ = \\dfrac{\\tan 70^\\circ - \\tan 20^\\circ}{1 + \\tan 70^\\circ\\tan 20^\\circ}$. Since $\\tan 70^\\circ = \\cot 20^\\circ$, the product $\\tan 70^\\circ\\tan 20^\\circ = 1$, so $\\tan 50^\\circ = \\dfrac{\\tan 70^\\circ - \\tan 20^\\circ}{2}$. The ratio is 2.",
      commonMistakes: [
        { answer: 1, feedback: "The denominator of the difference formula is $1 + \\tan 70^\\circ\\tan 20^\\circ = 1 + 1 = 2$, not 1." },
      ],
    },
    {
      type: "quiz",
      id: "t3-6-q6",
      variant: "practice",
      multiple: true,
      question: "Select every identity (true wherever both sides are defined).",
      options: [
        { text: "$(\\sin\\theta + \\cos\\theta)^2 = 1 + \\sin 2\\theta$", correct: true, feedback: "Expand: $\\sin^2 + \\cos^2 + 2\\sin\\theta\\cos\\theta = 1 + \\sin 2\\theta$." },
        { text: "$\\tan\\theta + \\cot\\theta = 2\\csc 2\\theta$", correct: true, feedback: "$\\frac{1}{\\sin\\theta\\cos\\theta} = \\frac{2}{\\sin 2\\theta}$." },
        { text: "$\\sin 3\\theta = 3\\sin\\theta - 4\\sin^3\\theta$", correct: true, feedback: "$\\sin(2\\theta + \\theta)$, then replace $\\cos^2\\theta$ by $1 - \\sin^2\\theta$." },
        { text: "$\\cos 3\\theta = 3\\cos\\theta - 4\\cos^3\\theta$", feedback: "The signs are reversed: $\\cos 3\\theta = 4\\cos^3\\theta - 3\\cos\\theta$. At $\\theta = 0$ the left is 1 but this right side is $-1$." },
        { text: "$1 - \\cos\\theta = 2\\sin^2\\theta$", feedback: "The angle must halve: $1 - \\cos\\theta = 2\\sin^2\\frac{\\theta}{2}$. At $\\theta = \\frac{\\pi}{2}$ this version gives $1 = 2$." },
      ],
      hint: "Name a path from the core for each. If you cannot, test $\\theta = 0$ or $\\frac{\\pi}{2}$.",
    },
    {
      type: "numeric",
      id: "t3-6-q7",
      variant: "practice",
      question: "Without a calculator, evaluate $3\\sin 10^\\circ - 4\\sin^3 10^\\circ$.",
      answer: 0.5,
      tolerance: 0.001,
      hint: "This is one side of a triple-angle identity.",
      solution: "$3\\sin\\theta - 4\\sin^3\\theta = \\sin 3\\theta$, so the value is $\\sin 30^\\circ = \\frac12$.",
      commonMistakes: [
        { answer: 0.866, tolerance: 0.001, feedback: "That is $\\cos 30^\\circ$. The expression is $\\sin 3\\theta$ with $\\theta = 10^\\circ$." },
      ],
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "trig-chapter-3-mastery",
  title: "3.7 · Chapter 3 Mastery",
  position: 7,
  blocks: blocks([
    {
      type: "text",
      content:
        "Unseen identities, under time. For each one, decide the *path* first — which core fact, and in which direction — and only then compute or check the options.",
    },
    {
      type: "callout",
      variant: "info",
      title: "The chapter in three lines",
      content:
        "1. An identity is true for all valid inputs; prove it by transforming one side.\n2. The core set is Pythagoras, angle sum, and circle symmetry. Everything else is a derivation.\n3. When stuck: convert to sine and cosine, hunt for a hidden Pythagoras, or bridge different angles with the sum formula.",
    },
    {
      type: "quiz",
      id: "t3-m-q1",
      variant: "mastery",
      question: "Simplify $\\cos^4\\theta - \\sin^4\\theta$.",
      options: [
        { text: "$\\cos 2\\theta$", correct: true, feedback: "Difference of squares gives $(\\cos^2+\\sin^2)(\\cos^2-\\sin^2) = 1 \\cdot \\cos 2\\theta$." },
        { text: "$1$", feedback: "That is $\\left(\\cos^2 + \\sin^2\\right)^2$'s first factor only; the second factor is not 1." },
        { text: "$\\cos 4\\theta$", feedback: "Fourth powers are not quadruple angles — factor rather than guess." },
      ],
    },
    {
      type: "quiz",
      id: "t3-m-q2",
      variant: "mastery",
      question: "Express $\\sin 3\\theta$ using the core set.",
      options: [
        {
          text: "$\\sin(2\\theta + \\theta) = \\sin2\\theta\\cos\\theta + \\cos2\\theta\\sin\\theta$",
          correct: true,
          feedback: "Split the angle, apply the sum formula, then expand the double angles if a fully expanded form is wanted.",
        },
        { text: "$3\\sin\\theta$", feedback: "Fails at $\\theta = \\frac{\\pi}{2}$: the left is $-1$, the right is 3." },
        { text: "$\\sin\\theta\\cdot\\sin2\\theta$", feedback: "No identity turns a sum of angles into a product of sines." },
      ],
    },
    {
      type: "quiz",
      id: "t3-m-q3",
      variant: "mastery",
      question: "Which is equivalent to $\\dfrac{1}{1 - \\sin\\theta} + \\dfrac{1}{1 + \\sin\\theta}$?",
      options: [
        { text: "$2\\sec^2\\theta$", correct: true, feedback: "Common denominator gives $\\frac{2}{1 - \\sin^2\\theta} = \\frac{2}{\\cos^2\\theta}$." },
        { text: "$2\\csc^2\\theta$", feedback: "That would need $\\sin^2$ underneath; the Pythagorean swap gives $\\cos^2$." },
        { text: "$\\dfrac{2}{\\sin^2\\theta}$", feedback: "Same slip — $1 - \\sin^2\\theta$ is $\\cos^2\\theta$, not $\\sin^2\\theta$." },
      ],
      hint: "Add the fractions first; the denominator becomes a difference of squares.",
    },
    {
      type: "quiz",
      id: "t3-m-q4",
      variant: "mastery",
      question: "If $\\cos\\theta = \\dfrac{1}{3}$, what is $\\cos 2\\theta$?",
      options: [
        { text: "$-\\dfrac{7}{9}$", correct: true, feedback: "$2\\cos^2\\theta - 1 = \\frac29 - 1$. The cosine form is the one that needs no extra information." },
        { text: "$\\dfrac{2}{3}$", feedback: "That doubles the value rather than the angle." },
        { text: "It cannot be found without the quadrant.", feedback: "This is the merit of the $2\\cos^2 - 1$ form: no sign ambiguity, so no quadrant needed." },
      ],
    },
    {
      type: "quiz",
      id: "t3-m-q5",
      variant: "mastery",
      question: "Prove or refute: $\\sec\\theta - \\cos\\theta = \\sin\\theta\\tan\\theta$.",
      options: [
        {
          text: "True — $\\frac{1}{\\cos\\theta} - \\cos\\theta = \\frac{1-\\cos^2\\theta}{\\cos\\theta} = \\frac{\\sin^2\\theta}{\\cos\\theta}$.",
          correct: true,
          feedback: "And $\\frac{\\sin^2\\theta}{\\cos\\theta} = \\sin\\theta \\cdot \\frac{\\sin\\theta}{\\cos\\theta} = \\sin\\theta\\tan\\theta$.",
        },
        { text: "False — the two sides differ at $\\theta = \\frac{\\pi}{4}$.", feedback: "Both give $\\sqrt2 - \\frac{\\sqrt2}{2} = \\frac{\\sqrt2}{2}$ there." },
        { text: "True, but only for acute $\\theta$.", feedback: "The derivation never assumed a quadrant — only that $\\cos\\theta \\ne 0$." },
      ],
    },
    {
      type: "numeric",
      id: "t3-m-q6",
      variant: "mastery",
      question: "Evaluate $\\sin 15^\\circ\\cos 15^\\circ$ exactly. Enter a fraction or a decimal.",
      answer: 0.25,
      tolerance: 0.0001,
      solution: "$\\sin 15^\\circ\\cos 15^\\circ = \\frac12\\sin 30^\\circ = \\frac14$.",
      commonMistakes: [
        { answer: 0.5, tolerance: 0.0001, feedback: "That is $\\sin 30^\\circ = 2\\sin 15^\\circ\\cos 15^\\circ$. You need half of it." },
      ],
    },
    {
      type: "numeric",
      id: "t3-m-q7",
      variant: "mastery",
      question: "$\\tan\\alpha = 3$ and $\\tan\\beta = 2$. Find $\\tan(\\alpha + \\beta)$.",
      answer: -1,
      solution: "$\\tan(\\alpha + \\beta) = \\dfrac{3 + 2}{1 - 3 \\cdot 2} = \\dfrac{5}{-5} = -1$.",
      commonMistakes: [
        { answer: 5, feedback: "That is $\\tan\\alpha + \\tan\\beta$, the numerator only. Tangent does not distribute." },
        { answer: 0.714, tolerance: 0.001, feedback: "You used $1 + \\tan\\alpha\\tan\\beta$ underneath. For a *sum* the denominator has a minus." },
      ],
    },
    {
      type: "quiz",
      id: "t3-m-q8",
      variant: "mastery",
      multiple: true,
      question: "Select every identity (true wherever both sides are defined).",
      options: [
        { text: "$\\sin 2x = \\dfrac{2\\tan x}{1 + \\tan^2 x}$", correct: true, feedback: "Divide $2\\sin x\\cos x$ by $\\cos^2 x + \\sin^2 x$, then divide top and bottom by $\\cos^2 x$." },
        { text: "$\\cos 2x = \\dfrac{1 - \\tan^2 x}{1 + \\tan^2 x}$", correct: true, feedback: "Same trick on $\\dfrac{\\cos^2 x - \\sin^2 x}{\\cos^2 x + \\sin^2 x}$." },
        { text: "$\\tan\\left(x + \\dfrac{\\pi}{4}\\right) = \\dfrac{1 + \\tan x}{1 - \\tan x}$", correct: true, feedback: "The tangent sum formula with $\\tan\\frac{\\pi}{4} = 1$." },
        { text: "$\\tan 2x = \\dfrac{2\\tan x}{1 + \\tan^2 x}$", feedback: "That is $\\sin 2x$. For $\\tan 2x$ the denominator is $1 - \\tan^2 x$." },
        { text: "$\\sin(x + y) = \\sin x + \\sin y$", feedback: "The distributive error: at $x = y = \\frac{\\pi}{2}$ the left is 0 and the right is 2." },
      ],
    },
    {
      type: "numeric",
      id: "t3-m-q9",
      variant: "mastery",
      question: "Given that $\\cos 36^\\circ = \\dfrac{1 + \\sqrt5}{4}$, find $\\cos 36^\\circ - \\cos 72^\\circ$. Enter a fraction or a decimal.",
      answer: 0.5,
      tolerance: 0.001,
      solution:
        "$\\cos 72^\\circ = 2\\cos^2 36^\\circ - 1 = 2 \\cdot \\dfrac{6 + 2\\sqrt5}{16} - 1 = \\dfrac{\\sqrt5 - 1}{4}$.\n\nSo $\\cos 36^\\circ - \\cos 72^\\circ = \\dfrac{(1 + \\sqrt5) - (\\sqrt5 - 1)}{4} = \\dfrac{2}{4} = \\dfrac12$.",
      commonMistakes: [
        { answer: 1.118, tolerance: 0.001, feedback: "You added the two cosines ($\\frac{\\sqrt5}{2}$). The question asks for the difference." },
      ],
    },
    {
      type: "numeric",
      id: "t3-m-q10",
      variant: "mastery",
      question:
        "Evaluate $\\cos^2\\dfrac{\\pi}{8} + \\cos^2\\dfrac{3\\pi}{8} + \\cos^2\\dfrac{5\\pi}{8} + \\cos^2\\dfrac{7\\pi}{8}$.",
      answer: 2,
      solution:
        "$\\cos\\frac{7\\pi}{8} = -\\cos\\frac{\\pi}{8}$ and $\\cos\\frac{5\\pi}{8} = -\\cos\\frac{3\\pi}{8}$, and squaring removes the signs. So the sum is $2\\left(\\cos^2\\frac{\\pi}{8} + \\cos^2\\frac{3\\pi}{8}\\right)$.\n\n$\\frac{3\\pi}{8} = \\frac{\\pi}{2} - \\frac{\\pi}{8}$, so $\\cos\\frac{3\\pi}{8} = \\sin\\frac{\\pi}{8}$, and the bracket is $\\cos^2\\frac{\\pi}{8} + \\sin^2\\frac{\\pi}{8} = 1$. Total: $2$.",
      commonMistakes: [
        { answer: 0, feedback: "The cosines cancel in pairs, but their *squares* do not: squares are never negative." },
        { answer: 1, feedback: "That is one pair. The four terms make two such pairs." },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "Identities rewrite; they do not solve. Chapter 4 turns the machinery backwards: given a value, find *every* angle that produces it — and identities become the tool that reduces a messy equation to one you can actually solve.",
    },
  ]),
};

export const trigChapter3Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lessonMastery,
];
