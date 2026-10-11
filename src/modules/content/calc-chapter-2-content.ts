import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Calculus Chapter 2 — Standard Limits and the Derivative.
 * Proves the JEE standard limits (trig by the squeeze theorem, exponential
 * and logarithmic through e, the power limit, the 1^∞ form) with series
 * intuition, then defines the derivative, separates differentiability from
 * continuity and derives the derivatives of the basic functions.
 * Picks up from chapter-1-content.ts (lesson 1.10 ends on the definition).
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "squeeze-and-trig-limits",
  title: "2.1 · The Squeeze Theorem and Trig Limits",
  position: 1,
  blocks: blocks([
    {
      type: "text",
      content:
        "In Chapter 1 you *estimated* $\\lim_{x \\to 0} \\frac{\\sin x}{x}$ from a table and got 1. A table is evidence, not proof: it cannot tell 1 from 0.99999. And JEE will not ask for $\\frac{\\sin x}{x}$ itself. It will ask for $\\frac{\\sin 3x}{\\tan 5x}$, $\\frac{1 - \\cos 4x}{x^2}$, or $\\frac{\\tan x - \\sin x}{x^3}$. This chapter proves a short list of **standard limits** once, then reduces everything else to them.",
    },
    { type: "heading", text: "The squeeze theorem" },
    {
      type: "text",
      content:
        "Picture two walls closing in on a point. If a function is trapped between them, it has nowhere to go but the point where the walls meet. That is the whole theorem.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Squeeze (sandwich) theorem",
      content:
        "If $g(x) \\le f(x) \\le h(x)$ for all $x$ near $a$ (except possibly at $a$), and $\\lim_{x \\to a} g(x) = \\lim_{x \\to a} h(x) = L$, then $\\lim_{x \\to a} f(x) = L$.",
    },
    {
      type: "worked-example",
      id: "calc2-1-we1",
      title: "Worked example 1: crushing an oscillation",
      problem: "Find $\\lim_{x \\to 0} x^2 \\sin\\dfrac{1}{x}$.",
      steps: [
        {
          text: "$\\sin\\frac1x$ alone has no limit at 0 (Chapter 1: it oscillates). But it is trapped: $-1 \\le \\sin\\frac1x \\le 1$.",
        },
        {
          text: "Multiply through by $x^2 \\ge 0$ (which keeps the inequalities pointing the same way). *Why this step:* we want walls that both go to the same value.",
          latex: "-x^2 \\le x^2\\sin\\frac{1}{x} \\le x^2",
        },
        { text: "Both walls tend to 0 as $x \\to 0$, so the function in the middle does too." },
      ],
      answer: "$\\lim_{x \\to 0} x^2\\sin\\frac1x = 0$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"an oscillating factor kills the limit\"",
      content:
        "$\\sin\\frac1x$ oscillates, but it is **bounded**. A bounded factor times something that goes to 0 goes to 0. The oscillation is still there; it just gets flattened to nothing.",
    },
    { type: "heading", text: "Why sin x over x tends to 1" },
    {
      type: "text",
      content:
        "Draw the unit circle with centre $O$, the point $A = (1, 0)$, and the point $P$ at angle $x$ radians, $0 < x < \\frac{\\pi}{2}$. Extend $OP$ until it meets the vertical tangent line at $A$, at the point $T$. Three regions are nested, each inside the next:\n\n1. triangle $OAP$, of area $\\frac12 \\cdot 1 \\cdot \\sin x$;\n2. the circular sector $OAP$, of area $\\frac12 \\cdot 1^2 \\cdot x$ (this is where radians matter);\n3. triangle $OAT$, of area $\\frac12 \\cdot 1 \\cdot \\tan x$.",
    },
    { type: "math", latex: "\\tfrac12\\sin x < \\tfrac12 x < \\tfrac12\\tan x \\quad\\Longrightarrow\\quad \\sin x < x < \\tan x \\qquad \\left(0 < x < \\tfrac{\\pi}{2}\\right)" },
    {
      type: "text",
      content:
        "Divide by $\\sin x > 0$: $1 < \\frac{x}{\\sin x} < \\frac{1}{\\cos x}$. Flip all three (they are positive): $\\cos x < \\frac{\\sin x}{x} < 1$. As $x \\to 0^+$, the left wall $\\cos x \\to 1$ and the right wall is 1. Squeezed. For $x < 0$, $\\frac{\\sin x}{x}$ is an even function, so the left-hand limit is the same.",
    },
    { type: "math", latex: "\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1" },
    {
      type: "interactive",
      config: {
        component: "limit-explorer",
        expr: "sin(x)/x",
        exprLatex: "\\frac{\\sin x}{x}",
        target: 0,
        hole: true,
        window: { xmin: -7, xmax: 7, ymin: -0.5, ymax: 1.4 },
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the curve is perfectly smooth through $x = 0$ apart from the single missing point at height 1. Near 0 the graph of $\\sin x$ and the line $y = x$ are almost the same curve, which is what the limit says.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"degrees work too\"",
      content:
        "The sector area $\\frac12 x$ needs $x$ in **radians**. With degrees, $\\sin x° = \\sin\\frac{\\pi x}{180}$, so $\\frac{\\sin x°}{x} \\to \\frac{\\pi}{180}$, not 1. Every calculus formula in this course assumes radians.",
    },
    { type: "heading", text: "The family of trig limits" },
    {
      type: "text",
      content:
        "Everything else follows from the one limit above with a little algebra. The key habit is the **matching rule**: $\\frac{\\sin \\square}{\\square} \\to 1$ whenever $\\square \\to 0$, but only if the *same* thing sits inside the sine and in the denominator. So $\\frac{\\sin 5x}{x} = 5 \\cdot \\frac{\\sin 5x}{5x} \\to 5$.",
    },
    {
      type: "table",
      headers: ["Limit as $x \\to 0$", "Value", "Why"],
      rows: [
        ["$\\dfrac{\\sin x}{x}$", "$1$", "area squeeze"],
        ["$\\dfrac{\\tan x}{x}$", "$1$", "$\\frac{\\sin x}{x} \\cdot \\frac{1}{\\cos x}$"],
        ["$\\dfrac{1 - \\cos x}{x^2}$", "$\\dfrac12$", "$1 - \\cos x = 2\\sin^2\\frac x2$"],
        ["$\\dfrac{\\sin^{-1} x}{x}$", "$1$", "put $x = \\sin t$"],
        ["$\\dfrac{\\tan^{-1} x}{x}$", "$1$", "put $x = \\tan t$"],
        ["$\\dfrac{\\sin ax}{bx}$", "$\\dfrac ab$", "matching rule"],
      ],
    },
    {
      type: "text",
      content:
        "The cosine limit deserves its derivation, because it is the one students misremember: $\\frac{1 - \\cos x}{x^2} = \\frac{2\\sin^2(x/2)}{x^2} = \\frac12\\left(\\frac{\\sin(x/2)}{x/2}\\right)^2 \\to \\frac12$. So near 0, $1 - \\cos x$ behaves like $\\frac{x^2}{2}$: it vanishes **twice as fast** as $x$ does.",
    },
    { type: "heading", text: "Worked examples" },
    {
      type: "worked-example",
      id: "calc2-1-we2",
      title: "Worked example 2: matching inside and outside",
      problem: "Find $\\lim_{x \\to 0} \\dfrac{\\sin 3x}{\\tan 5x}$.",
      steps: [
        {
          text: "Build a standard form for each piece by multiplying and dividing by the matching argument. *Why this step:* $\\frac{\\sin 3x}{3x}$ and $\\frac{\\tan 5x}{5x}$ each tend to 1.",
          latex: "\\frac{\\sin 3x}{\\tan 5x} = \\frac{\\sin 3x}{3x}\\cdot\\frac{5x}{\\tan 5x}\\cdot\\frac{3x}{5x}",
        },
        { text: "The first two factors tend to 1; the last is the constant $\\frac35$." },
      ],
      answer: "$\\dfrac{3}{5}$",
    },
    {
      type: "worked-example",
      id: "calc2-1-we3",
      title: "Worked example 3: the cosine limit, rescaled",
      problem: "Find $\\lim_{x \\to 0} \\dfrac{1 - \\cos 4x}{x^2}$.",
      steps: [
        {
          text: "Match the argument: the standard form needs $(4x)^2$ underneath.",
          latex: "\\frac{1 - \\cos 4x}{x^2} = 16 \\cdot \\frac{1 - \\cos 4x}{(4x)^2}",
        },
        { text: "The fraction tends to $\\frac12$, so the limit is $16 \\cdot \\frac12$." },
      ],
      answer: "$8$",
    },
    {
      type: "worked-example",
      id: "calc2-1-we4",
      title: "Worked example 4: factor before you split",
      problem: "Find $\\lim_{x \\to 0} \\dfrac{\\tan x - \\sin x}{x^3}$.",
      steps: [
        {
          text: "Splitting into $\\frac{\\tan x}{x^3} - \\frac{\\sin x}{x^3}$ gives $\\infty - \\infty$: useless. Factor instead. *Why this step:* we want a product of standard forms.",
          latex: "\\tan x - \\sin x = \\tan x\\,(1 - \\cos x)",
        },
        {
          text: "Now distribute the $x^3$ as $x \\cdot x^2$:",
          latex: "\\frac{\\tan x - \\sin x}{x^3} = \\frac{\\tan x}{x} \\cdot \\frac{1 - \\cos x}{x^2} \\to 1 \\cdot \\frac12",
        },
      ],
      answer: "$\\dfrac12$",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"sin x over x tends to 1 everywhere\"",
      content:
        "Only as $x \\to 0$. As $x \\to \\infty$, $\\frac{\\sin x}{x}$ is a bounded numerator over a growing denominator, so it tends to **0** (squeeze it between $-\\frac1x$ and $\\frac1x$).",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "calc2-1-q1",
      variant: "practice",
      question: "$\\lim_{x \\to 0} \\dfrac{\\sin 5x}{x} = $",
      options: [
        { text: "$5$", correct: true, feedback: "$\\frac{\\sin 5x}{x} = 5\\cdot\\frac{\\sin 5x}{5x} \\to 5$." },
        { text: "$1$", feedback: "The argument $5x$ does not match the denominator $x$. Rescale first." },
        { text: "$\\frac15$", feedback: "Inverted. The 5 is inside the sine, so it comes out on top." },
        { text: "$0$", feedback: "Both top and bottom go to 0: that is $\\frac00$, not 0." },
      ],
      hint: "Multiply and divide by $5x$ so the sine's argument matches the denominator.",
    },
    {
      type: "numeric",
      id: "calc2-1-q2",
      variant: "practice",
      question: "Find $\\lim_{x \\to 0} \\dfrac{1 - \\cos 6x}{x^2}$.",
      answer: 18,
      hint: "Rescale to the standard form $\\frac{1 - \\cos u}{u^2} \\to \\frac12$ with $u = 6x$.",
      solution: "$\\frac{1 - \\cos 6x}{x^2} = 36\\cdot\\frac{1 - \\cos 6x}{(6x)^2} \\to 36\\cdot\\frac12 = 18$.",
      commonMistakes: [
        { answer: 3, feedback: "You scaled by 6 instead of $6^2 = 36$. The denominator is squared." },
        { answer: 36, feedback: "You forgot the $\\frac12$ in the standard limit $\\frac{1 - \\cos u}{u^2} \\to \\frac12$." },
      ],
    },
    {
      type: "quiz",
      id: "calc2-1-q3",
      variant: "concept",
      question: "In the proof of $\\lim_{x \\to 0}\\frac{\\sin x}{x} = 1$, where exactly does the use of radians enter?",
      options: [
        { text: "The sector of angle $x$ in a unit circle has area $\\frac12 x$.", correct: true, feedback: "That formula is true only for $x$ in radians. In degrees the sector area is $\\frac{\\pi x}{360}$." },
        { text: "In $\\sin x < \\tan x$.", feedback: "That inequality holds in any angle unit; it compares two lengths, not an angle measure." },
        { text: "In $\\cos x \\to 1$ as $x \\to 0$.", feedback: "That is true in any unit." },
        { text: "Nowhere: the limit is 1 in degrees too.", feedback: "In degrees the limit is $\\frac{\\pi}{180}$." },
      ],
      hint: "Which of the three areas involves the angle itself rather than a sine or tangent?",
    },
    {
      type: "quiz",
      id: "calc2-1-q4",
      variant: "practice",
      question: "$\\lim_{x \\to \\infty} \\dfrac{\\sin x}{x} = $",
      options: [
        { text: "$0$", correct: true, feedback: "$-\\frac1x \\le \\frac{\\sin x}{x} \\le \\frac1x$, and both walls go to 0." },
        { text: "$1$", feedback: "That standard limit is for $x \\to 0$ only." },
        { text: "Does not exist, because $\\sin x$ oscillates", feedback: "The oscillation is bounded, and dividing by a growing $x$ flattens it." },
        { text: "$\\infty$", feedback: "The numerator never exceeds 1 in size." },
      ],
      hint: "Squeeze: $\\lvert \\sin x \\rvert \\le 1$.",
    },
    {
      type: "numeric",
      id: "calc2-1-q5",
      variant: "concept",
      question: "If $x$ is measured in **degrees**, what is $\\lim_{x \\to 0} \\dfrac{\\sin x°}{x}$? Give a decimal to 4 significant figures.",
      answer: Math.PI / 180,
      relTolerance: 0.01,
      hint: "Convert: $x° = \\frac{\\pi x}{180}$ radians, then use the matching rule.",
      solution: "$\\frac{\\sin(\\pi x/180)}{x} = \\frac{\\pi}{180}\\cdot\\frac{\\sin(\\pi x/180)}{\\pi x/180} \\to \\frac{\\pi}{180} \\approx 0.01745$.",
      commonMistakes: [{ answer: 1, feedback: "1 is the radian answer. In degrees there is a conversion factor $\\frac{\\pi}{180}$." }],
    },
    {
      type: "quiz",
      id: "calc2-1-q6",
      variant: "practice",
      multiple: true,
      question: "Select **all** the limits whose value is 1.",
      options: [
        { text: "$\\lim_{x \\to 0}\\dfrac{\\tan 2x}{\\sin 2x}$", correct: true, feedback: "$\\frac{\\tan 2x}{\\sin 2x} = \\frac{1}{\\cos 2x} \\to 1$." },
        { text: "$\\lim_{x \\to 0}\\dfrac{\\sin (x^2)}{x}$", feedback: "$\\frac{\\sin x^2}{x^2}\\cdot x \\to 1 \\cdot 0 = 0$." },
        { text: "$\\lim_{x \\to 0}\\dfrac{\\sin^{-1} x}{x}$", correct: true, feedback: "Put $x = \\sin t$: $\\frac{t}{\\sin t} \\to 1$." },
        { text: "$\\lim_{x \\to \\infty} x\\sin\\dfrac1x$", correct: true, feedback: "Put $u = \\frac1x \\to 0$: $\\frac{\\sin u}{u} \\to 1$." },
        { text: "$\\lim_{x \\to 0}\\dfrac{1 - \\cos x}{x}$", feedback: "$\\frac{1 - \\cos x}{x^2}\\cdot x \\to \\frac12 \\cdot 0 = 0$." },
      ],
      hint: "Reduce each to a standard form; watch for a leftover factor of $x$.",
    },
    {
      type: "numeric",
      id: "calc2-1-q7",
      variant: "practice",
      question: "Find $\\lim_{x \\to 0} \\dfrac{1 - \\cos x\\cos 2x}{x^2}$.",
      answer: 2.5,
      hint: "Write $1 - \\cos x\\cos 2x = (1 - \\cos x) + \\cos x\\,(1 - \\cos 2x)$.",
      solution:
        "$\\frac{1 - \\cos x}{x^2} + \\cos x\\cdot\\frac{1 - \\cos 2x}{x^2} \\to \\frac12 + 1\\cdot 4\\cdot\\frac12 = \\frac12 + 2 = \\frac52$.",
      commonMistakes: [
        { answer: 1, feedback: "You treated both pieces as $\\frac12$. The $\\cos 2x$ piece is $\\frac{(2x)^2}{2} = 2x^2$ near 0." },
        { answer: 1.5, feedback: "Check the second piece: $\\frac{1 - \\cos 2x}{x^2} \\to 4 \\cdot \\frac12 = 2$." },
      ],
    },
    {
      type: "quiz",
      id: "calc2-1-q8",
      variant: "practice",
      question: "Find $\\lim_{x \\to 0}\\dfrac{\\sin(\\pi\\cos^2 x)}{x^2}$.",
      options: [
        { text: "$\\pi$", correct: true, feedback: "$\\sin(\\pi\\cos^2 x) = \\sin(\\pi - \\pi\\sin^2 x) = \\sin(\\pi\\sin^2 x)$, and $\\frac{\\sin(\\pi\\sin^2x)}{\\pi\\sin^2 x}\\cdot\\frac{\\pi\\sin^2 x}{x^2} \\to \\pi$." },
        { text: "$1$", feedback: "The argument $\\pi\\cos^2 x$ tends to $\\pi$, not 0, so the matching rule does not apply until you rewrite it." },
        { text: "$-\\pi$", feedback: "Sign slip: $\\sin(\\pi - \\theta) = +\\sin\\theta$." },
        { text: "$0$", feedback: "Top and bottom both vanish; this is $\\frac00$." },
      ],
      hint: "Use $\\cos^2 x = 1 - \\sin^2 x$ and $\\sin(\\pi - \\theta) = \\sin\\theta$ to get an argument that tends to 0.",
    },
    {
      type: "quiz",
      id: "calc2-1-q9",
      variant: "practice",
      question: "Find $\\lim_{x \\to \\infty}\\dfrac{x + \\sin x}{x}$.",
      options: [
        { text: "$1$", correct: true, feedback: "$1 - \\frac1x \\le \\frac{x + \\sin x}{x} \\le 1 + \\frac1x$, and both walls tend to 1." },
        { text: "Does not exist, since $\\sin x$ oscillates", feedback: "The oscillation is divided by $x$ and dies out." },
        { text: "$0$", feedback: "$\\frac{x}{x} = 1$ is the main part; only the $\\frac{\\sin x}{x}$ part goes to 0." },
        { text: "$2$", feedback: "$\\frac{\\sin x}{x} \\to 0$ as $x \\to \\infty$, not 1." },
      ],
      hint: "Split as $1 + \\frac{\\sin x}{x}$ and squeeze the second part.",
    },
    {
      type: "numeric",
      id: "calc2-1-q10",
      variant: "mastery",
      question: "Find $\\lim_{x \\to 0}\\dfrac{\\sqrt2 - \\sqrt{1 + \\cos x}}{\\sin^2 x}$. Give a decimal to 3 significant figures.",
      answer: 1 / (4 * Math.SQRT2),
      relTolerance: 0.01,
      hint: "Rationalise the numerator first, then use $1 - \\cos x \\approx \\frac{x^2}{2}$ and $\\sin^2 x \\approx x^2$.",
      solution:
        "Multiply by $\\sqrt2 + \\sqrt{1 + \\cos x}$: the numerator becomes $2 - (1 + \\cos x) = 1 - \\cos x$. So the expression is $\\frac{1 - \\cos x}{\\sin^2 x}\\cdot\\frac{1}{\\sqrt2 + \\sqrt{1 + \\cos x}} \\to \\frac12\\cdot\\frac{1}{2\\sqrt2} = \\frac{1}{4\\sqrt2} \\approx 0.177$.",
      commonMistakes: [
        { answer: 0.5, feedback: "You dropped the conjugate factor $\\frac{1}{\\sqrt2 + \\sqrt{1 + \\cos x}} \\to \\frac{1}{2\\sqrt2}$." },
        { answer: 0.3536, tolerance: 0.002, feedback: "That is $\\frac{1}{2\\sqrt2}$: you lost the $\\frac12$ from $\\frac{1 - \\cos x}{\\sin^2 x} \\to \\frac12$." },
      ],
    },
    {
      type: "quiz",
      id: "calc2-1-q11",
      variant: "mastery",
      question: "Using $[\\,\\cdot\\,]$ for the greatest integer function, find $\\lim_{x \\to 0} x\\left[\\dfrac1x\\right]$.",
      options: [
        { text: "$1$", correct: true, feedback: "$\\frac1x - 1 < [\\frac1x] \\le \\frac1x$. For $x > 0$: $1 - x < x[\\frac1x] \\le 1$; for $x < 0$ the inequalities flip to $1 \\le x[\\frac1x] < 1 - x$. Both squeeze to 1." },
        { text: "$0$", feedback: "$[\\frac1x]$ grows like $\\frac1x$, so the product does not collapse to 0." },
        { text: "Does not exist, because $[\\,\\cdot\\,]$ jumps", feedback: "The jumps are of size at most 1, and multiplying by $x$ shrinks them to nothing." },
        { text: "$-1$", feedback: "Check $x = -0.1$: $[\\,-10\\,] = -10$, and $(-0.1)(-10) = 1$." },
      ],
      hint: "Use $y - 1 < [y] \\le y$ with $y = \\frac1x$, multiply by $x$, and treat $x > 0$ and $x < 0$ separately.",
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "exponential-and-log-limits",
  title: "2.2 · Exponential, Logarithmic and Power Limits",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "A bank offers 100% interest a year on ₹1. Paid once, you end with ₹2. Paid half-yearly, you get $1.5^2 = 2.25$. Monthly, quarterly, daily, every second: the more often interest is compounded, the more you get. But not without limit:",
    },
    {
      type: "table",
      headers: ["Compoundings per year $n$", "$\\left(1 + \\frac1n\\right)^n$"],
      rows: [
        ["$1$", "$2$"],
        ["$2$", "$2.25$"],
        ["$12$", "$2.6130$"],
        ["$365$", "$2.7146$"],
        ["$10^6$", "$2.718280$"],
      ],
    },
    { type: "heading", text: "The number e" },
    {
      type: "callout",
      variant: "definition",
      title: "The number $e$",
      content:
        "$e = \\lim_{n \\to \\infty}\\left(1 + \\frac1n\\right)^n = \\lim_{x \\to 0}(1 + x)^{1/x} \\approx 2.71828$.\nThe natural logarithm $\\ln$ is $\\log_e$. Every exponential can be rewritten in base $e$: $a^x = e^{x\\ln a}$.",
    },
    {
      type: "text",
      content:
        "Why is $e$ the natural base for calculus? Because it is the one base whose exponential has slope exactly 1 where it crosses the $y$-axis. That is the content of the next two limits, which are really one fact seen from two sides.",
    },
    { type: "heading", text: "The two twin limits" },
    {
      type: "text",
      content:
        "**Logarithm first.** Since $\\ln$ is continuous, we can move the limit inside it:\n\n$$\\frac{\\ln(1 + x)}{x} = \\ln\\left[(1 + x)^{1/x}\\right] \\to \\ln e = 1.$$\n\n**Then the exponential.** Put $t = e^x - 1$, so $x = \\ln(1 + t)$ and $t \\to 0$ as $x \\to 0$:\n\n$$\\frac{e^x - 1}{x} = \\frac{t}{\\ln(1 + t)} \\to \\frac11 = 1.$$",
    },
    {
      type: "math",
      latex: "\\lim_{x \\to 0}\\frac{e^x - 1}{x} = 1 \\qquad \\lim_{x \\to 0}\\frac{\\ln(1 + x)}{x} = 1 \\qquad \\lim_{x \\to 0}\\frac{a^x - 1}{x} = \\ln a",
    },
    {
      type: "text",
      content:
        "The third limit is the first one in disguise: $\\frac{a^x - 1}{x} = \\frac{e^{x\\ln a} - 1}{x\\ln a}\\cdot\\ln a \\to \\ln a$ (for $a > 0$). Watch the base-2 version settle on $\\ln 2 \\approx 0.693$, not on 2:",
    },
    {
      type: "interactive",
      config: {
        component: "limit-explorer",
        expr: "(2^x - 1)/x",
        exprLatex: "\\frac{2^x - 1}{x}",
        target: 0,
        hole: true,
        window: { xmin: -3, xmax: 3, ymin: 0, ymax: 2.5 },
      },
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"$\\frac{a^x - 1}{x}$ tends to $a$\"",
      content:
        "It tends to $\\ln a$. Only for $a = e$ is the answer 1, which is exactly why $e$ is special. For $a = 2$ the limit is $0.693$; for $a = 10$ it is $2.303$.",
    },
    { type: "heading", text: "The power limit" },
    {
      type: "math",
      latex: "\\lim_{x \\to a}\\frac{x^n - a^n}{x - a} = n\\,a^{n - 1}",
    },
    {
      type: "text",
      content:
        "For a positive integer $n$ this is pure algebra: $x^n - a^n = (x - a)(x^{n-1} + x^{n-2}a + \\cdots + a^{n-1})$. Cancel $x - a$; what remains is $n$ terms, each tending to $a^{n-1}$. The result also holds for every rational (indeed real) $n$ when $a > 0$, as you will see in lesson 2.6: it is the slope of $x^n$ at $x = a$.",
    },
    { type: "heading", text: "Reducing to a standard form" },
    {
      type: "worked-example",
      id: "calc2-2-we1",
      title: "Worked example 1: the power limit",
      problem: "Find $\\lim_{x \\to 2}\\dfrac{x^{10} - 1024}{x - 2}$.",
      steps: [
        { text: "Recognise $1024 = 2^{10}$, so this is the power limit with $n = 10$, $a = 2$." },
        { text: "$n a^{n-1} = 10 \\cdot 2^9$.", latex: "10 \\cdot 512 = 5120" },
      ],
      answer: "$5120$",
    },
    {
      type: "worked-example",
      id: "calc2-2-we2",
      title: "Worked example 2: two power limits at once",
      problem: "Find $\\lim_{x \\to 1}\\dfrac{x^{1/3} - 1}{x^{1/2} - 1}$.",
      steps: [
        {
          text: "Divide top and bottom by $x - 1$. *Why this step:* each becomes a power limit at $a = 1$.",
          latex: "\\frac{x^{1/3} - 1}{x^{1/2} - 1} = \\frac{\\dfrac{x^{1/3} - 1^{1/3}}{x - 1}}{\\dfrac{x^{1/2} - 1^{1/2}}{x - 1}} \\to \\frac{\\tfrac13}{\\tfrac12}",
        },
      ],
      answer: "$\\dfrac23$",
    },
    {
      type: "worked-example",
      id: "calc2-2-we3",
      title: "Worked example 3: matching rule for exponentials and logs",
      problem: "Find $\\lim_{x \\to 0}\\dfrac{e^{3x} - 1}{\\ln(1 + 2x)}$.",
      steps: [
        {
          text: "Match each argument, exactly as with sines.",
          latex: "\\frac{e^{3x} - 1}{3x}\\cdot\\frac{2x}{\\ln(1 + 2x)}\\cdot\\frac{3x}{2x}",
        },
        { text: "The first two factors tend to 1; the last is $\\frac32$." },
      ],
      answer: "$\\dfrac32$",
    },
    {
      type: "worked-example",
      id: "calc2-2-we4",
      title: "Worked example 4: subtract and add 1",
      problem: "Find $\\lim_{x \\to 0}\\dfrac{a^x - b^x}{x}$ for $a, b > 0$.",
      steps: [
        {
          text: "Insert $-1 + 1$. *Why this step:* neither $a^x$ nor $b^x$ is a standard form alone, but $a^x - 1$ and $b^x - 1$ are.",
          latex: "\\frac{a^x - b^x}{x} = \\frac{a^x - 1}{x} - \\frac{b^x - 1}{x} \\to \\ln a - \\ln b",
        },
      ],
      answer: "$\\ln\\dfrac ab$",
    },
    {
      type: "callout",
      variant: "tip",
      title: "The standard forms, all in one place",
      content:
        "As $\\square \\to 0$: $\\frac{\\sin\\square}{\\square},\\ \\frac{\\tan\\square}{\\square},\\ \\frac{e^\\square - 1}{\\square},\\ \\frac{\\ln(1 + \\square)}{\\square} \\to 1$; $\\frac{1 - \\cos\\square}{\\square^2} \\to \\frac12$; $\\frac{a^\\square - 1}{\\square} \\to \\ln a$; $(1 + \\square)^{1/\\square} \\to e$. As $x \\to a$: $\\frac{x^n - a^n}{x - a} \\to na^{n-1}$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "calc2-2-q1",
      variant: "practice",
      question: "$\\lim_{x \\to 0}\\dfrac{e^{5x} - 1}{x} = $",
      options: [
        { text: "$5$", correct: true, feedback: "$5\\cdot\\frac{e^{5x} - 1}{5x} \\to 5$." },
        { text: "$1$", feedback: "The exponent $5x$ does not match the denominator $x$." },
        { text: "$e^5$", feedback: "The limit is about how fast $e^{5x}$ leaves 1, not about $e^5$." },
        { text: "$\\ln 5$", feedback: "That would be $\\frac{5^x - 1}{x}$." },
      ],
      hint: "Match the exponent with the denominator.",
    },
    {
      type: "numeric",
      id: "calc2-2-q2",
      variant: "practice",
      question: "Find $\\lim_{x \\to 0}\\dfrac{3^x - 1}{x}$ to 3 decimal places.",
      answer: Math.log(3),
      tolerance: 0.002,
      hint: "Write $3^x = e^{x\\ln 3}$.",
      solution: "$\\frac{3^x - 1}{x} \\to \\ln 3 \\approx 1.099$.",
      commonMistakes: [{ answer: 3, feedback: "The limit is $\\ln 3$, not 3: the base comes out through a logarithm. (Only for base $e$ is the answer 1.)" }],
    },
    {
      type: "numeric",
      id: "calc2-2-q3",
      variant: "practice",
      question: "Find $\\lim_{x \\to 3}\\dfrac{x^4 - 81}{x - 3}$.",
      answer: 108,
      hint: "Power limit with $n = 4$, $a = 3$.",
      solution: "$4\\cdot 3^3 = 108$. (Or factor: $(x - 3)(x + 3)(x^2 + 9)$, giving $6 \\cdot 18$.)",
      commonMistakes: [
        { answer: 27, feedback: "You found $a^{n-1}$ but forgot the factor $n = 4$." },
        { answer: 324, feedback: "Use $a^{n-1} = 3^3$, not $3^4$." },
      ],
    },
    {
      type: "quiz",
      id: "calc2-2-q4",
      variant: "practice",
      question: "$\\lim_{x \\to 0}\\dfrac{\\log_{10}(1 + x)}{x} = $",
      options: [
        { text: "$\\log_{10} e$", correct: true, feedback: "$\\log_{10}(1 + x) = \\frac{\\ln(1 + x)}{\\ln 10}$, so the limit is $\\frac{1}{\\ln 10} = \\log_{10} e \\approx 0.434$." },
        { text: "$1$", feedback: "That is the natural-log version. Change base first." },
        { text: "$\\ln 10$", feedback: "Inverted: you divide by $\\ln 10$." },
        { text: "$10$", feedback: "Change the base of the logarithm to $e$ and use the standard limit." },
      ],
      hint: "Change of base: $\\log_{10} y = \\dfrac{\\ln y}{\\ln 10}$.",
    },
    {
      type: "quiz",
      id: "calc2-2-q5",
      variant: "concept",
      question: "Since $1 + \\frac1n \\to 1$, why isn't $\\lim_{n \\to \\infty}\\left(1 + \\frac1n\\right)^n$ simply $1$?",
      options: [
        { text: "The base tends to 1 while the exponent tends to $\\infty$; these effects compete, so $1^\\infty$ is not a value but an indeterminate form.", correct: true, feedback: "A number slightly above 1 raised to a huge power can land anywhere; here it lands on $e$." },
        { text: "Because $1^\\infty$ is $\\infty$.", feedback: "$1^\\infty$ is not $\\infty$ either. $(1 + \\frac1{n^2})^n \\to 1$, while $(1 + \\frac1n)^{n^2} \\to \\infty$." },
        { text: "It is 1; the table is wrong.", feedback: "The table is right: the values climb to 2.71828..." },
        { text: "Because limits cannot be taken inside powers.", feedback: "They can, when the result is not an indeterminate form. Here it is." },
      ],
      hint: "What happens to a number just above 1 when it is raised to a very large power?",
    },
    {
      type: "numeric",
      id: "calc2-2-q6",
      variant: "practice",
      question: "Find $\\lim_{x \\to 0}\\dfrac{e^{x^2} - \\cos x}{x^2}$.",
      answer: 1.5,
      hint: "Split as $\\frac{e^{x^2} - 1}{x^2} + \\frac{1 - \\cos x}{x^2}$.",
      solution: "$\\frac{e^{x^2} - 1}{x^2} \\to 1$ and $\\frac{1 - \\cos x}{x^2} \\to \\frac12$, total $\\frac32$.",
      commonMistakes: [
        { answer: 0.5, feedback: "You missed the first piece, $\\frac{e^{x^2} - 1}{x^2} \\to 1$." },
        { answer: 0, feedback: "Splitting as $(e^{x^2} - 1) - (\\cos x - 1)$ has the right idea, but $-(\\cos x - 1) = 1 - \\cos x$ adds, it does not cancel." },
      ],
    },
    {
      type: "quiz",
      id: "calc2-2-q7",
      variant: "practice",
      multiple: true,
      question: "Select **all** the limits equal to $\\ln 2$.",
      options: [
        { text: "$\\lim_{x \\to 0}\\dfrac{2^x - 1}{x}$", correct: true, feedback: "Standard form with $a = 2$." },
        { text: "$\\lim_{x \\to 0}\\dfrac{4^x - 2^x}{x}$", correct: true, feedback: "$\\ln 4 - \\ln 2 = \\ln 2$." },
        { text: "$\\lim_{x \\to 0}\\dfrac{\\ln(1 + 2x)}{x}$", feedback: "That is 2: match the argument." },
        { text: "$\\lim_{n \\to \\infty} n\\left(2^{1/n} - 1\\right)$", correct: true, feedback: "Put $x = \\frac1n \\to 0$: $\\frac{2^x - 1}{x} \\to \\ln 2$." },
        { text: "$\\lim_{x \\to 0}\\dfrac{e^{2x} - 1}{x}$", feedback: "That is 2, not $\\ln 2$." },
      ],
      hint: "Reduce each to $\\frac{a^\\square - 1}{\\square}$ or $\\frac{\\ln(1 + \\square)}{\\square}$.",
    },
    {
      type: "numeric",
      id: "calc2-2-q8",
      variant: "practice",
      question: "Find $\\lim_{x \\to 4}\\dfrac{x^{5/2} - 32}{x - 4}$.",
      answer: 20,
      hint: "$32 = 4^{5/2}$. Use the power limit with a fractional $n$.",
      solution: "$n a^{n-1} = \\frac52\\cdot 4^{3/2} = \\frac52\\cdot 8 = 20$.",
      commonMistakes: [
        { answer: 8, feedback: "That is $a^{n-1}$ alone; multiply by $n = \\frac52$." },
        { answer: 80, feedback: "$4^{3/2} = 8$, not 32: $a^{n-1}$ uses $n - 1 = \\frac32$." },
      ],
    },
    {
      type: "quiz",
      id: "calc2-2-q9",
      variant: "mastery",
      question: "Find $\\lim_{x \\to 0}\\dfrac{e^{\\tan x} - e^{x}}{\\tan x - x}$.",
      options: [
        { text: "$1$", correct: true, feedback: "$e^{\\tan x} - e^x = e^x\\left(e^{\\tan x - x} - 1\\right)$, and $\\frac{e^{u} - 1}{u} \\to 1$ with $u = \\tan x - x \\to 0$. Times $e^0 = 1$." },
        { text: "$0$", feedback: "Top and bottom both vanish: $\\frac00$." },
        { text: "$e$", feedback: "The factor in front is $e^x \\to e^0 = 1$, not $e$." },
        { text: "Does not exist", feedback: "Factor out $e^x$ and match the exponent." },
      ],
      hint: "Factor out $e^x$; the rest is $\\frac{e^u - 1}{u}$ with $u = \\tan x - x$.",
    },
    {
      type: "numeric",
      id: "calc2-2-q10",
      variant: "mastery",
      question:
        "Find $\\lim_{x \\to 0}\\dfrac{27^x - 9^x - 3^x + 1}{\\sqrt2 - \\sqrt{1 + \\cos x}}$ to 2 decimal places.",
      answer: 8 * Math.SQRT2 * Math.log(3) ** 2,
      relTolerance: 0.01,
      hint: "Factor the numerator as $(9^x - 1)(3^x - 1)$; you already met the denominator in lesson 2.1.",
      solution:
        "Numerator: $27^x - 9^x - 3^x + 1 = 9^x(3^x - 1) - (3^x - 1) = (9^x - 1)(3^x - 1) \\approx (2x\\ln 3)(x\\ln 3) = 2x^2(\\ln 3)^2$.\n\nDenominator: from lesson 2.1, $\\sqrt2 - \\sqrt{1 + \\cos x} \\approx \\frac{x^2}{4\\sqrt2}$.\n\nRatio: $2(\\ln 3)^2 \\cdot 4\\sqrt2 = 8\\sqrt2(\\ln 3)^2 \\approx 13.66$.",
      commonMistakes: [
        { answer: 4 * Math.SQRT2 * Math.log(3) ** 2, tolerance: 0.1, feedback: "$9^x - 1 \\approx x\\ln 9 = 2x\\ln 3$: you lost the factor 2." },
      ],
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "one-to-the-infinity-and-series",
  title: "2.3 · The One-to-the-Infinity Form and Series Intuition",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "$\\left(1 + \\frac1n\\right)^n$ creeps up to $e$: not 1, not $\\infty$. The base, tending to 1, pulls the power towards 1; the exponent, tending to $\\infty$, amplifies any excess over 1. Who wins depends on **how fast** each happens. That is what makes $1^\\infty$ an indeterminate form, together with its six relatives:",
    },
    {
      type: "math",
      latex: "\\frac00, \\quad \\frac{\\infty}{\\infty}, \\quad 0\\cdot\\infty, \\quad \\infty - \\infty, \\quad 1^\\infty, \\quad 0^0, \\quad \\infty^0",
    },
    { type: "heading", text: "The e-shortcut for the one-to-the-infinity form" },
    {
      type: "text",
      content:
        "Suppose $f(x) \\to 1$ and $g(x) \\to \\infty$. Write $f = 1 + (f - 1)$, where $f - 1 \\to 0$, and force the shape $(1 + \\square)^{1/\\square}$:",
    },
    {
      type: "math",
      latex: "f^{\\,g} = \\Big[\\big(1 + (f - 1)\\big)^{\\frac{1}{f - 1}}\\Big]^{\\,g\\,(f - 1)} \\;\\longrightarrow\\; e^{\\,\\lim g\\,(f - 1)}",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The one-to-the-infinity rule",
      content:
        "If $f(x) \\to 1$ and $g(x) \\to \\infty$ (both as $x \\to a$, or as $x \\to \\infty$), then\n$$\\lim f(x)^{g(x)} = e^{\\lim g(x)\\,(f(x) - 1)}.$$\nThe whole problem shrinks to one ordinary limit: (exponent) × (base − 1).",
    },
    {
      type: "worked-example",
      id: "calc2-3-we1",
      title: "Worked example 1",
      problem: "Find $\\lim_{x \\to \\infty}\\left(1 + \\dfrac3x\\right)^{x}$.",
      steps: [
        { text: "Check the form: base $\\to 1$, exponent $\\to \\infty$. *Why this step:* the rule only applies to a genuine $1^\\infty$." },
        { text: "Exponent × (base − 1):", latex: "x\\cdot\\frac{3}{x} = 3" },
      ],
      answer: "$e^3$",
    },
    {
      type: "worked-example",
      id: "calc2-3-we2",
      title: "Worked example 2: a trig base",
      problem: "Find $\\lim_{x \\to 0}(\\cos x)^{1/x^2}$.",
      steps: [
        { text: "Form: $\\cos x \\to 1$, $\\frac{1}{x^2} \\to \\infty$." },
        {
          text: "Exponent × (base − 1), using the standard cosine limit:",
          latex: "\\frac{1}{x^2}(\\cos x - 1) = -\\frac{1 - \\cos x}{x^2} \\to -\\frac12",
        },
      ],
      answer: "$e^{-1/2} = \\dfrac{1}{\\sqrt e}$",
    },
    {
      type: "worked-example",
      id: "calc2-3-we3",
      title: "Worked example 3: a rational base",
      problem: "Find $\\lim_{x \\to \\infty}\\left(\\dfrac{x + 3}{x - 1}\\right)^{x}$.",
      steps: [
        { text: "Base $\\to 1$, exponent $\\to\\infty$. Base − 1:", latex: "\\frac{x + 3}{x - 1} - 1 = \\frac{4}{x - 1}" },
        { text: "Exponent × (base − 1):", latex: "\\frac{4x}{x - 1} \\to 4" },
      ],
      answer: "$e^4$",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"$1^\\infty = 1$\"",
      content:
        "A base that is *exactly* 1 stays 1 under any power. A base that only *tends* to 1 may still be a little above or below it, and a huge exponent magnifies that. Also check the form before using the rule: $\\left(2 + \\frac1x\\right)^x \\to \\infty$ is $2^\\infty$, not $1^\\infty$.",
    },
    { type: "heading", text: "Series intuition: what functions look like near zero" },
    {
      type: "text",
      content:
        "Zoom in on any standard function near $x = 0$ and it looks like a polynomial. The leading term is the standard limit; the next terms tell you what is left when the leading terms cancel. These expansions come from Taylor series (which you will meet properly later); JEE uses them freely, and so will we.",
    },
    {
      type: "table",
      headers: ["Function", "Near $x = 0$", "Standard limit hiding in it"],
      rows: [
        ["$\\sin x$", "$x - \\dfrac{x^3}{6} + \\cdots$", "$\\frac{\\sin x}{x} \\to 1$"],
        ["$\\cos x$", "$1 - \\dfrac{x^2}{2} + \\dfrac{x^4}{24} - \\cdots$", "$\\frac{1 - \\cos x}{x^2} \\to \\frac12$"],
        ["$\\tan x$", "$x + \\dfrac{x^3}{3} + \\cdots$", "$\\frac{\\tan x}{x} \\to 1$"],
        ["$e^x$", "$1 + x + \\dfrac{x^2}{2} + \\dfrac{x^3}{6} + \\cdots$", "$\\frac{e^x - 1}{x} \\to 1$"],
        ["$\\ln(1 + x)$", "$x - \\dfrac{x^2}{2} + \\dfrac{x^3}{3} - \\cdots$", "$\\frac{\\ln(1 + x)}{x} \\to 1$"],
        ["$(1 + x)^n$", "$1 + nx + \\dfrac{n(n-1)}{2}x^2 + \\cdots$", "$\\frac{(1 + x)^n - 1}{x} \\to n$"],
        ["$\\sin^{-1}x$, $\\tan^{-1}x$", "$x + \\dfrac{x^3}{6}$, $\\ x - \\dfrac{x^3}{3}$", "both $\\to 1$ over $x$"],
      ],
    },
    {
      type: "text",
      content:
        "See it happen. The slider $k$ switches on the cubic correction to the straight-line approximation $\\sin x \\approx x$:",
    },
    {
      type: "interactive",
      config: {
        component: "transform-playground",
        baseExpr: "sin(x)",
        baseLatex: "\\sin x",
        expr: "x - k*x^3/6",
        exprLatex: "x - k\\,\\frac{x^3}{6}",
        params: [{ name: "k", min: 0, max: 1, step: 0.25, initial: 0 }],
        window: { xmin: -4, xmax: 4, ymin: -2, ymax: 2 },
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: at $k = 0$ the line $y = x$ hugs $\\sin x$ only for $\\lvert x\\rvert$ up to about $0.5$. At $k = 1$ the cubic $x - \\frac{x^3}{6}$ stays on the sine curve out to about $\\lvert x\\rvert = 1.5$. The gap $x - \\sin x$ is therefore about $\\frac{x^3}{6}$, which is the next worked example.",
    },
    {
      type: "worked-example",
      id: "calc2-3-we4",
      title: "Worked example 4: when the leading terms cancel",
      problem: "Find $\\lim_{x \\to 0}\\dfrac{x - \\sin x}{x^3}$.",
      steps: [
        { text: "The standard limit alone fails: $x - \\sin x$ is \"$x - x$\" to first order. *Why this step:* we need the next term to see what is left." },
        { text: "Expand:", latex: "x - \\left(x - \\frac{x^3}{6} + \\cdots\\right) = \\frac{x^3}{6} - \\cdots" },
        { text: "Divide by $x^3$ and let $x \\to 0$." },
      ],
      answer: "$\\dfrac16$",
    },
    {
      type: "worked-example",
      id: "calc2-3-we5",
      title: "Worked example 5: choose constants so the limit exists",
      problem: "Find $a$ and $b$ such that $\\lim_{x \\to 0}\\dfrac{x(1 + a\\cos x) - b\\sin x}{x^3} = 1$.",
      steps: [
        {
          text: "Expand the numerator up to $x^3$:",
          latex: "x + ax\\left(1 - \\frac{x^2}{2}\\right) - b\\left(x - \\frac{x^3}{6}\\right) = (1 + a - b)\\,x + \\left(-\\frac a2 + \\frac b6\\right)x^3 + \\cdots",
        },
        { text: "Divided by $x^3$, the $x$ term would blow up, so its coefficient must vanish: $1 + a - b = 0$. *Why this step:* a finite limit forbids any lower power than $x^3$." },
        { text: "The $x^3$ coefficient is the limit: $-\\frac a2 + \\frac b6 = 1$." },
        { text: "Substitute $b = 1 + a$: $-3a + 1 + a = 6$, so $a = -\\frac52$, $b = -\\frac32$." },
      ],
      answer: "$a = -\\dfrac52$, $b = -\\dfrac32$",
    },
    {
      type: "callout",
      variant: "tip",
      title: "When to reach for series",
      content:
        "Use the standard limits when the expression factors into standard forms. Use series when **leading terms cancel** ($x - \\sin x$, $e^x - 1 - x$, $\\tan x - \\sin x$ split as a difference) or when a question asks for constants that make a limit finite.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "calc2-3-q1",
      variant: "practice",
      question: "$\\lim_{x \\to \\infty}\\left(1 + \\dfrac2x\\right)^{3x} = $",
      options: [
        { text: "$e^6$", correct: true, feedback: "Exponent × (base − 1) $= 3x\\cdot\\frac2x = 6$." },
        { text: "$e^{2/3}$", feedback: "Multiply, don't divide: $3x \\cdot \\frac{2}{x}$." },
        { text: "$1$", feedback: "$1^\\infty$ is indeterminate, not 1." },
        { text: "$e^5$", feedback: "The exponent and the excess multiply: $3 \\times 2$, not $3 + 2$." },
      ],
      hint: "Use $e^{\\lim g(f - 1)}$.",
    },
    {
      type: "numeric",
      id: "calc2-3-q2",
      variant: "practice",
      question: "Find $\\lim_{x \\to 0}(1 + \\sin x)^{2/x}$ to 2 decimal places.",
      answer: Math.E ** 2,
      relTolerance: 0.01,
      hint: "Form $1^\\infty$: compute $\\lim \\frac2x\\sin x$.",
      solution: "$\\frac{2}{x}\\cdot\\sin x \\to 2$, so the limit is $e^2 \\approx 7.39$.",
      commonMistakes: [
        { answer: 1, feedback: "$1^\\infty$ is not 1. Use the $e$-shortcut." },
        { answer: 2, feedback: "2 is the exponent of $e$, not the answer: $e^2 \\approx 7.39$." },
      ],
    },
    {
      type: "quiz",
      id: "calc2-3-q3",
      variant: "concept",
      question: "What is $\\lim_{x \\to \\infty}\\left(2 + \\dfrac1x\\right)^{x}$?",
      options: [
        { text: "$\\infty$: the base tends to 2, so this is not a $1^\\infty$ form.", correct: true, feedback: "Always check the form. A base above $1$ by a fixed amount, raised to a growing power, blows up." },
        { text: "$e$", feedback: "That would need a base tending to 1." },
        { text: "$e^2$", feedback: "The $e$-shortcut needs base $\\to 1$; here base $\\to 2$." },
        { text: "$2$", feedback: "$2^x \\to \\infty$." },
      ],
      hint: "What does the base tend to?",
    },
    {
      type: "numeric",
      id: "calc2-3-q4",
      variant: "practice",
      question: "Find $\\lim_{x \\to 0}\\dfrac{e^x - 1 - x}{x^2}$.",
      answer: 0.5,
      hint: "Expand $e^x$ to the $x^2$ term.",
      solution: "$e^x - 1 - x = \\frac{x^2}{2} + \\frac{x^3}{6} + \\cdots$, so the ratio tends to $\\frac12$.",
      commonMistakes: [{ answer: 1, feedback: "The $x^2$ coefficient of $e^x$ is $\\frac{1}{2!} = \\frac12$." }],
    },
    {
      type: "quiz",
      id: "calc2-3-q5",
      variant: "practice",
      question: "$\\lim_{x \\to 0}\\dfrac{\\tan x - x}{x^3} = $",
      options: [
        { text: "$\\dfrac13$", correct: true, feedback: "$\\tan x = x + \\frac{x^3}{3} + \\cdots$." },
        { text: "$\\dfrac16$", feedback: "That is $\\frac{x - \\sin x}{x^3}$. The tangent's cubic coefficient is $\\frac13$." },
        { text: "$-\\dfrac13$", feedback: "$\\tan x$ is *above* $x$ for small positive $x$, so the numerator is positive." },
        { text: "$0$", feedback: "The numerator is of order $x^3$, the same as the denominator." },
      ],
      hint: "Use the series for $\\tan x$ to the $x^3$ term.",
    },
    {
      type: "numeric",
      id: "calc2-3-q6",
      variant: "mastery",
      question: "Find $\\lim_{x \\to 0}\\dfrac{(1 + x)^{1/x} - e}{x}$ to 2 decimal places.",
      answer: -Math.E / 2,
      tolerance: 0.01,
      hint: "Write $(1 + x)^{1/x} = e^{\\ln(1 + x)/x}$ and expand $\\frac{\\ln(1 + x)}{x}$.",
      solution:
        "$\\frac{\\ln(1 + x)}{x} = 1 - \\frac x2 + \\cdots$, so $(1 + x)^{1/x} = e\\cdot e^{-x/2 + \\cdots} = e\\left(1 - \\frac x2 + \\cdots\\right)$. Then $\\frac{(1 + x)^{1/x} - e}{x} \\to -\\frac e2 \\approx -1.36$.",
      commonMistakes: [
        { answer: 0, tolerance: 0.01, feedback: "The numerator tends to 0, but so does the denominator. Find the rate." },
        { answer: Math.E / 2, tolerance: 0.01, feedback: "Sign: $\\frac{\\ln(1 + x)}{x} = 1 - \\frac{x}{2} + \\cdots$ is *less* than 1 for small $x > 0$." },
      ],
    },
    {
      type: "quiz",
      id: "calc2-3-q7",
      variant: "concept",
      multiple: true,
      question: "Select **all** the indeterminate forms.",
      options: [
        { text: "$1^\\infty$", correct: true, feedback: "Base and exponent compete." },
        { text: "$0^0$", correct: true, feedback: "$x^x \\to 1$ but $0^{1/\\ln x}$-type expressions can give other values." },
        { text: "$\\infty^0$", correct: true, feedback: "$x^{1/x} \\to 1$, $\\left(e^x\\right)^{1/x} = e$: different answers." },
        { text: "$0^\\infty$", feedback: "A base near 0 raised to a huge power is always tiny: this is just 0." },
        { text: "$\\infty \\cdot \\infty$", feedback: "Two huge things multiply to something huge: $\\infty$." },
        { text: "$\\infty - \\infty$", correct: true, feedback: "$x - x = 0$ but $(x + 1) - x = 1$." },
      ],
      hint: "A form is indeterminate when two effects compete and the result depends on their rates.",
    },
    {
      type: "numeric",
      id: "calc2-3-q8",
      variant: "practice",
      question: "Find $\\lim_{x \\to 0}(\\cos 2x)^{1/x^2}$ to 3 decimal places.",
      answer: Math.exp(-2),
      tolerance: 0.002,
      hint: "Exponent × (base − 1) $= -\\frac{1 - \\cos 2x}{x^2}$.",
      solution: "$-\\frac{1 - \\cos 2x}{x^2} \\to -4\\cdot\\frac12 = -2$, so the limit is $e^{-2} \\approx 0.135$.",
      commonMistakes: [
        { answer: Math.exp(-0.5), tolerance: 0.002, feedback: "Rescale: $\\frac{1 - \\cos 2x}{x^2} \\to 2$, not $\\frac12$." },
        { answer: 1, feedback: "$1^\\infty$ is not 1." },
      ],
    },
    {
      type: "quiz",
      id: "calc2-3-q9",
      variant: "practice",
      question: "If $\\lim_{x \\to 0}\\left(1 + ax + bx^2\\right)^{2/x} = e^3$, then",
      options: [
        { text: "$a = \\frac32$ and $b$ can be any real number", correct: true, feedback: "$\\frac2x(ax + bx^2) = 2a + 2bx \\to 2a$, so $2a = 3$. $b$ drops out." },
        { text: "$a = \\frac32$, $b = 0$ only", feedback: "The $bx^2$ term contributes $2bx \\to 0$ whatever $b$ is." },
        { text: "$a = 3$, $b$ any real number", feedback: "The exponent is $\\frac2x$, which doubles $a$." },
        { text: "$a = \\frac32$, $b = \\frac32$", feedback: "Nothing pins $b$ down." },
      ],
      hint: "Compute $\\lim \\frac2x(ax + bx^2)$ and set it equal to 3.",
    },
    {
      type: "numeric",
      id: "calc2-3-q10",
      variant: "mastery",
      question:
        "For a certain constant $a$, the limit $L = \\lim_{x \\to 0}\\dfrac{a\\sin x - \\sin 2x}{\\tan^3 x}$ is finite. Find $L$.",
      answer: 1,
      hint: "Expand the numerator to $x^3$; the coefficient of $x$ must vanish. $\\tan^3 x \\approx x^3$.",
      solution:
        "$a\\left(x - \\frac{x^3}{6}\\right) - \\left(2x - \\frac{8x^3}{6}\\right) = (a - 2)x + \\left(\\frac{8 - a}{6}\\right)x^3$. Finite needs $a = 2$; then $L = \\frac{6}{6} = 1$.",
      commonMistakes: [
        { answer: 2, feedback: "2 is the value of $a$. The question asks for the limit." },
        { answer: 1.3333, tolerance: 0.01, feedback: "You used $a = 0$. First force the $x$ coefficient $(a - 2)$ to vanish." },
      ],
    },
    {
      type: "quiz",
      id: "calc2-3-q11",
      variant: "mastery",
      question: "$\\lim_{x \\to 0}\\left(\\dfrac{\\sin x}{x}\\right)^{1/x^2} = $",
      options: [
        { text: "$e^{-1/6}$", correct: true, feedback: "$\\frac{\\sin x}{x} - 1 \\approx -\\frac{x^2}{6}$, times $\\frac1{x^2}$ gives $-\\frac16$." },
        { text: "$1$", feedback: "Base $\\to 1$, exponent $\\to\\infty$: indeterminate, not 1." },
        { text: "$e^{1/6}$", feedback: "$\\frac{\\sin x}{x} < 1$ near 0, so base − 1 is negative." },
        { text: "$e^{-1/3}$", feedback: "The cubic term of $\\sin x$ is $\\frac{x^3}{6}$; after dividing by $x$ it is $\\frac{x^2}{6}$." },
      ],
      hint: "Use the series for $\\sin x$ to find base − 1.",
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "the-derivative",
  title: "2.4 · The Derivative: Slope, Rate and First Principles",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "Lesson 1.10 ended with a promise. The slope of $y = x^2$ at $x = 2$ came out as exactly 4, from a limit of secant slopes, and that limit got a name: the **derivative**. Now we make it official, learn to read it in two ways, and compute it for whole families of functions.",
    },
    { type: "heading", text: "Two pictures of one number" },
    {
      type: "text",
      content:
        "**The slope picture.** Through the point $(a, f(a))$ and a nearby point $(a + h, f(a + h))$ draw the secant. As $h \\to 0$ the second point slides into the first and the secant swings into a limiting position: the **tangent**. Its slope is the derivative.\n\n**The rate picture.** If $s(t)$ is the position of a car, $\\frac{s(t + h) - s(t)}{h}$ is the average velocity over the next $h$ seconds. As $h \\to 0$ it becomes the reading on the speedometer: the instantaneous velocity. Same limit, different story.",
    },
    {
      type: "interactive",
      config: {
        component: "calc-tangent-explorer",
        expr: "x^2",
        exprLatex: "x^2",
        derivExpr: "2*x",
        derivLatex: "2x",
        showDerivative: true,
        window: { xmin: -2.5, xmax: 2.5, ymin: -1, ymax: 5 },
        derivWindow: { ymin: -5, ymax: 5 },
        x0: { min: -2, max: 2, step: 0.1, initial: 1 },
        secant: { min: -1, max: 1, step: 0.05, initial: 0.8 },
        caption:
          "Shrink $h$ towards 0: the orange secant swings onto the green tangent and its slope settles on $f'(x_0)$. Then move $x_0$: the lower graph collects every tangent slope into one new function, $f'(x) = 2x$.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: at $x_0 = 1$, $h = 0.8$ gives a secant slope of $2.8$; $h = 0.1$ gives $2.1$; $h = -0.1$ gives $1.9$. From both sides the slopes close in on 2, the slope of the tangent $y = 2x - 1$. Moving $x_0$ to $-1$ gives slope $-2$: the curve is falling there.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The derivative",
      content:
        "The derivative of $f$ at $a$ is\n$$f'(a) = \\lim_{h \\to 0}\\frac{f(a + h) - f(a)}{h} = \\lim_{x \\to a}\\frac{f(x) - f(a)}{x - a},$$\nprovided this limit exists and is finite. Then $f$ is **differentiable** at $a$. Letting $a$ vary gives the derived function $f'(x)$, also written $\\frac{dy}{dx}$, $\\frac{d}{dx}f(x)$, $y'$ or $Df$; a derivative with respect to time is often written $\\dot s$.",
    },
    {
      type: "callout",
      variant: "tip",
      content:
        "Read $\\frac{dy}{dx}$ as \"the limit of $\\frac{\\Delta y}{\\Delta x}$\": a small change in $y$ per small change in $x$. It is not yet a fraction you can split, but it behaves like one so often (Chapter 3) that the notation is worth its weight in gold.",
    },
    { type: "heading", text: "First principles in three moves" },
    {
      type: "text",
      content:
        "Differentiating \"from first principles\" means computing the defining limit directly:\n\n1. Write the difference quotient $\\frac{f(x + h) - f(x)}{h}$.\n2. Simplify until the $h$ in the denominator cancels: expand, rationalise, take a common denominator or use a trig identity.\n3. Let $h \\to 0$.",
    },
    {
      type: "worked-example",
      id: "calc2-4-we1",
      title: "Worked example 1: a reciprocal",
      problem: "Differentiate $f(x) = \\dfrac1x$ from first principles.",
      steps: [
        {
          text: "Common denominator. *Why this step:* the subtraction of fractions is what hides the factor $h$.",
          latex: "\\frac{1}{h}\\left(\\frac{1}{x + h} - \\frac1x\\right) = \\frac1h\\cdot\\frac{x - (x + h)}{x(x + h)} = \\frac{-1}{x(x + h)}",
        },
        { text: "Let $h \\to 0$:", latex: "f'(x) = -\\frac{1}{x^2}" },
      ],
      answer: "$\\dfrac{d}{dx}\\dfrac1x = -\\dfrac{1}{x^2}$ for $x \\ne 0$.",
    },
    {
      type: "worked-example",
      id: "calc2-4-we2",
      title: "Worked example 2: a square root",
      problem: "Differentiate $f(x) = \\sqrt x$ from first principles ($x > 0$).",
      steps: [
        {
          text: "Rationalise with the conjugate (Chapter 1's trick). *Why this step:* $(\\sqrt a - \\sqrt b)(\\sqrt a + \\sqrt b) = a - b$ releases the $h$.",
          latex: "\\frac{\\sqrt{x + h} - \\sqrt x}{h}\\cdot\\frac{\\sqrt{x + h} + \\sqrt x}{\\sqrt{x + h} + \\sqrt x} = \\frac{h}{h\\left(\\sqrt{x + h} + \\sqrt x\\right)}",
        },
        { text: "Cancel $h$ and let $h \\to 0$:", latex: "f'(x) = \\frac{1}{2\\sqrt x}" },
      ],
      answer: "$\\dfrac{d}{dx}\\sqrt x = \\dfrac{1}{2\\sqrt x}$ for $x > 0$.",
    },
    {
      type: "worked-example",
      id: "calc2-4-we3",
      title: "Worked example 3: a cube",
      problem: "Differentiate $f(x) = x^3$ from first principles.",
      steps: [
        { text: "Expand $(x + h)^3 = x^3 + 3x^2h + 3xh^2 + h^3$." },
        { text: "Subtract $x^3$ and divide by $h$:", latex: "\\frac{3x^2h + 3xh^2 + h^3}{h} = 3x^2 + 3xh + h^2" },
        { text: "Every term but the first carries an $h$, so they vanish." },
      ],
      answer: "$\\dfrac{d}{dx}x^3 = 3x^2$",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a tangent touches the curve at only one point\"",
      content:
        "That is true for circles, not for curves in general. The tangent to $y = x^3$ at $(1, 1)$ is $y = 3x - 2$, which meets the curve again at $(-2, -8)$, since $x^3 - 3x + 2 = (x - 1)^2(x + 2)$. A tangent is about **matching the direction** of the curve at one point, not about touching it once.",
    },
    { type: "heading", text: "Derivatives in disguise" },
    {
      type: "text",
      content:
        "JEE likes limits that are really derivatives wearing a costume. The skill is to split them into pieces that look exactly like $\\frac{f(a + \\square) - f(a)}{\\square}$.",
    },
    {
      type: "worked-example",
      id: "calc2-4-we4",
      title: "Worked example 4: two different steps",
      problem: "$f$ is differentiable and $f'(2) = 5$. Find $\\lim_{h \\to 0}\\dfrac{f(2 + 3h) - f(2 - h)}{h}$.",
      steps: [
        {
          text: "Add and subtract $f(2)$. *Why this step:* each half then compares $f$ with its value at 2.",
          latex: "\\frac{f(2 + 3h) - f(2)}{h} + \\frac{f(2) - f(2 - h)}{h}",
        },
        {
          text: "Match the step in each denominator:",
          latex: "3\\cdot\\frac{f(2 + 3h) - f(2)}{3h} + \\frac{f(2 - h) - f(2)}{-h} \\to 3f'(2) + f'(2)",
        },
        { text: "So the limit is $4f'(2) = 20$." },
      ],
      answer: "$20$",
    },
    {
      type: "worked-example",
      id: "calc2-4-we5",
      title: "Worked example 5: the cross-multiplied form",
      problem: "Show that $\\lim_{x \\to a}\\dfrac{x f(a) - a f(x)}{x - a} = f(a) - a f'(a)$.",
      steps: [
        {
          text: "Subtract and add $a f(a)$ in the numerator:",
          latex: "x f(a) - a f(a) + a f(a) - a f(x) = (x - a)f(a) - a\\big(f(x) - f(a)\\big)",
        },
        {
          text: "Divide by $x - a$:",
          latex: "f(a) - a\\cdot\\frac{f(x) - f(a)}{x - a} \\to f(a) - a f'(a)",
        },
      ],
      answer: "$f(a) - a f'(a)$",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "calc2-4-q1",
      variant: "practice",
      question: "Which expression **is** $f'(3)$?",
      options: [
        { text: "$\\lim_{h \\to 0}\\dfrac{f(3 + h) - f(3)}{h}$", correct: true, feedback: "The defining limit at $a = 3$." },
        { text: "$\\dfrac{f(3.001) - f(3)}{0.001}$", feedback: "A very good approximation, but an approximation: the derivative is the limit." },
        { text: "$\\lim_{x \\to 3}\\dfrac{f(x) - f(3)}{x + 3}$", feedback: "The denominator must be the change in $x$: $x - 3$." },
        { text: "$\\dfrac{f(3)}{3}$", feedback: "That is the slope of the line from the origin to the point, not the tangent slope." },
      ],
      hint: "Change in output over change in input, with the change shrinking to 0.",
    },
    {
      type: "numeric",
      id: "calc2-4-q2",
      variant: "practice",
      question: "Using first principles (or the pattern from them), find $f'(2)$ for $f(x) = 3x^2 - 5x$.",
      answer: 7,
      hint: "$\\frac{f(x + h) - f(x)}{h} = 6x + 3h - 5$.",
      solution: "$f(x + h) - f(x) = 6xh + 3h^2 - 5h$, so the quotient is $6x - 5 + 3h \\to 6x - 5$. At $x = 2$: $7$.",
      commonMistakes: [
        { answer: 2, feedback: "That is $f(2) = 12 - 10$, the height, not the slope." },
        { answer: 12, feedback: "Don't forget the $-5x$ term: its slope is $-5$." },
      ],
    },
    {
      type: "quiz",
      id: "calc2-4-q3",
      variant: "practice",
      question: "From first principles, $\\dfrac{d}{dx}\\dfrac{1}{x^2} = $",
      options: [
        { text: "$-\\dfrac{2}{x^3}$", correct: true, feedback: "$\\frac{x^2 - (x + h)^2}{h\\,x^2(x + h)^2} = \\frac{-2x - h}{x^2(x + h)^2} \\to -\\frac{2x}{x^4}$." },
        { text: "$\\dfrac{2}{x^3}$", feedback: "$\\frac{1}{x^2}$ is decreasing for $x > 0$, so the slope must be negative there." },
        { text: "$-\\dfrac{1}{x^2}$", feedback: "That is the derivative of $\\frac1x$." },
        { text: "$\\dfrac{1}{2x}$", feedback: "You cannot differentiate the denominator on its own." },
      ],
      hint: "Common denominator $x^2(x + h)^2$, then factor $h$ out of $x^2 - (x + h)^2$.",
    },
    {
      type: "numeric",
      id: "calc2-4-q4",
      variant: "practice",
      question: "A particle's position is $s(t) = 5t^2 + 2t$ metres after $t$ seconds. Find its velocity at $t = 3$ s.",
      answer: 32,
      unit: "m/s",
      hint: "Velocity is $\\dot s(t) = \\lim_{h \\to 0}\\frac{s(t + h) - s(t)}{h}$.",
      solution: "$\\frac{s(t + h) - s(t)}{h} = 10t + 5h + 2 \\to 10t + 2$. At $t = 3$: $32$ m/s.",
      commonMistakes: [
        { answer: 51, feedback: "That is the position $s(3)$ in metres, not the velocity." },
        { answer: 17, feedback: "That is the average velocity over the first 3 s, $\\frac{51}{3}$." },
      ],
    },
    {
      type: "numeric",
      id: "calc2-4-q5",
      variant: "practice",
      question: "$f$ is differentiable with $f'(1) = 4$. Find $\\lim_{h \\to 0}\\dfrac{f(1 + 2h) - f(1)}{h}$.",
      answer: 8,
      hint: "Multiply and divide by 2 so the denominator matches the step $2h$.",
      solution: "$2\\cdot\\frac{f(1 + 2h) - f(1)}{2h} \\to 2f'(1) = 8$.",
      commonMistakes: [
        { answer: 4, feedback: "The step is $2h$ but the denominator is $h$: there is an extra factor 2." },
        { answer: 2, feedback: "Multiply by 2, don't divide." },
      ],
    },
    {
      type: "quiz",
      id: "calc2-4-q6",
      variant: "concept",
      question: "The tangent to $y = x^3$ at $(1, 1)$ meets the curve again at",
      options: [
        { text: "$(-2, -8)$", correct: true, feedback: "Tangent $y = 3x - 2$; $x^3 - 3x + 2 = (x - 1)^2(x + 2)$." },
        { text: "nowhere: a tangent meets a curve only once", feedback: "That is a circle fact, not a general one." },
        { text: "$(0, 0)$", feedback: "$y = 3x - 2$ passes through $(0, -2)$, not the origin." },
        { text: "$(-1, -1)$", feedback: "At $x = -1$ the tangent has height $-5$." },
      ],
      hint: "Find the tangent with slope $3x^2 = 3$, then solve $x^3 = 3x - 2$; $x = 1$ is a double root.",
    },
    {
      type: "numeric",
      id: "calc2-4-q7",
      variant: "practice",
      question: "$f(2) = 3$ and $f'(2) = 4$. Find $\\lim_{x \\to 2}\\dfrac{x f(2) - 2 f(x)}{x - 2}$.",
      answer: -5,
      hint: "Worked example 5: the answer is $f(a) - a f'(a)$.",
      solution: "$f(2) - 2f'(2) = 3 - 8 = -5$.",
      commonMistakes: [
        { answer: 11, feedback: "Sign: the result is $f(a) - af'(a)$, not $f(a) + af'(a)$." },
        { answer: -1, feedback: "Multiply $f'(2)$ by $a = 2$: $3 - 2\\cdot 4$." },
      ],
    },
    {
      type: "quiz",
      id: "calc2-4-q8",
      variant: "practice",
      multiple: true,
      question: "$f$ is differentiable at $a$. Select **all** the limits that equal $f'(a)$.",
      options: [
        { text: "$\\lim_{h \\to 0}\\dfrac{f(a + h) - f(a - h)}{2h}$", correct: true, feedback: "Split around $f(a)$: $\\frac12 f'(a) + \\frac12 f'(a)$." },
        { text: "$\\lim_{h \\to 0}\\dfrac{f(a) - f(a - h)}{h}$", correct: true, feedback: "The left-hand version of the definition; for a differentiable $f$ it gives $f'(a)$." },
        { text: "$\\lim_{h \\to 0}\\dfrac{f(a + h^2) - f(a)}{h}$", feedback: "$= h\\cdot\\frac{f(a + h^2) - f(a)}{h^2} \\to 0\\cdot f'(a) = 0$." },
        { text: "$\\lim_{x \\to a}\\dfrac{f(x) - f(a)}{x - a}$", correct: true, feedback: "The second form of the definition." },
        { text: "$\\lim_{h \\to 0}\\dfrac{f(a + 2h) - f(a)}{h}$", feedback: "That is $2f'(a)$." },
      ],
      hint: "Rewrite each as a multiple of $\\frac{f(a + \\square) - f(a)}{\\square}$.",
    },
    {
      type: "quiz",
      id: "calc2-4-q9",
      variant: "mastery",
      question:
        "$f$ satisfies $f(x + y) = f(x)f(y)$ for all real $x, y$, with $f(0) \\ne 0$ and $f'(0) = 2$. Then $f'(x) = $",
      options: [
        { text: "$2f(x)$", correct: true, feedback: "$f(0) = f(0)^2$ gives $f(0) = 1$. Then $\\frac{f(x + h) - f(x)}{h} = f(x)\\frac{f(h) - f(0)}{h} \\to f(x)f'(0)$." },
        { text: "$2$", feedback: "That is only $f'(0)$. At other points the slope scales with $f(x)$." },
        { text: "$f(x) + 2$", feedback: "The functional equation multiplies, so the derivative picks up a factor, not a sum." },
        { text: "$2x$", feedback: "Try the definition with $f(x + h) = f(x)f(h)$." },
      ],
      hint: "Put $x = y = 0$ to find $f(0)$, then write $f(x + h) = f(x)f(h)$ in the difference quotient.",
    },
    {
      type: "numeric",
      id: "calc2-4-q10",
      variant: "mastery",
      question:
        "$f(x + y) = f(x) + f(y) + xy$ for all real $x, y$, and $\\lim_{h \\to 0}\\dfrac{f(h)}{h} = 3$. Find $f'(2)$.",
      answer: 5,
      hint: "Put $x = y = 0$ to get $f(0)$; then $f(x + h) - f(x) = f(h) + xh$.",
      solution: "$f(0) = 2f(0)$ so $f(0) = 0$. Then $\\frac{f(x + h) - f(x)}{h} = \\frac{f(h)}{h} + x \\to 3 + x$. At $x = 2$: $5$.",
      commonMistakes: [
        { answer: 3, feedback: "You dropped the $xy$ term: it adds $x$ to the slope." },
        { answer: 7, feedback: "The extra term is $\\frac{xh}{h} = x = 2$, not $2x$." },
      ],
    },
    {
      type: "quiz",
      id: "calc2-4-q11",
      variant: "concept",
      question: "What is the derivative of $f(x) = \\sqrt x$ at $x = 0$ (as a right-hand derivative)?",
      options: [
        { text: "It does not exist: $\\frac{\\sqrt h}{h} = \\frac{1}{\\sqrt h} \\to \\infty$, a vertical tangent.", correct: true, feedback: "The derivative must be a finite limit. The graph leaves the origin straight up." },
        { text: "$0$", feedback: "The curve is steepest at the origin, not flat." },
        { text: "$\\frac12$", feedback: "$\\frac{1}{2\\sqrt x}$ is undefined at $x = 0$." },
        { text: "It equals $\\infty$, which is a valid derivative.", feedback: "A derivative is a finite number. An infinite limit means a vertical tangent and no derivative." },
      ],
      hint: "Compute $\\frac{f(0 + h) - f(0)}{h}$ for small $h > 0$.",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "differentiability-and-continuity",
  title: "2.5 · Differentiability and Continuity",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "Drive along a road that turns a sharp corner. Your car never leaves the road (the path is **continuous**), but at the corner the steering wheel has to snap from one direction to another: at that point the road has no single direction. In calculus language, the path is continuous there but not **differentiable**. This lesson is about telling these apart.",
    },
    { type: "heading", text: "Left and right derivatives" },
    {
      type: "callout",
      variant: "definition",
      title: "One-sided derivatives",
      content:
        "Left-hand derivative (LHD): $f'(a^-) = \\lim_{h \\to 0^-}\\dfrac{f(a + h) - f(a)}{h}$.\nRight-hand derivative (RHD): $f'(a^+) = \\lim_{h \\to 0^+}\\dfrac{f(a + h) - f(a)}{h}$.\n$f$ is differentiable at $a$ exactly when both exist, are finite, and are **equal**.",
    },
    {
      type: "interactive",
      config: {
        component: "calc-tangent-explorer",
        expr: "abs(x)",
        exprLatex: "\\lvert x \\rvert",
        window: { xmin: -3, xmax: 3, ymin: -1, ymax: 3 },
        x0: { min: -2, max: 2, step: 0.1, initial: 0.5 },
        caption:
          "Slide $x_0$ to exactly 0. Everywhere else one tangent fits; at the corner the explorer draws two half-tangents, of slopes $-1$ and $+1$.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: for $x_0 > 0$ the tangent is the curve itself, slope 1; for $x_0 < 0$ slope $-1$. At $x_0 = 0$: LHD $= \\lim_{h \\to 0^-}\\frac{\\lvert h\\rvert}{h} = -1$ and RHD $= +1$. They disagree, so $\\lvert x\\rvert$ is **not differentiable at 0**, although it is perfectly continuous there.",
    },
    { type: "heading", text: "Differentiable implies continuous" },
    {
      type: "text",
      content:
        "The implication goes one way only, and the proof is one line. If $f'(a)$ exists, then as $h \\to 0$,",
    },
    {
      type: "math",
      latex: "f(a + h) - f(a) = \\frac{f(a + h) - f(a)}{h}\\cdot h \\;\\longrightarrow\\; f'(a)\\cdot 0 = 0",
    },
    {
      type: "text",
      content:
        "so $f(a + h) \\to f(a)$: $f$ is continuous at $a$. The converse is false, and $\\lvert x\\rvert$ is the standard counterexample. The useful contrapositive: **a discontinuous function cannot be differentiable** there. So check continuity first; if it fails you are done.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"continuous means differentiable\"",
      content:
        "Continuity says the graph has no breaks. Differentiability asks more: the graph must look like a straight line when you zoom in. Corners, cusps and vertical tangents are all continuous yet fail the zoom test.",
    },
    { type: "heading", text: "Ways to fail" },
    {
      type: "table",
      headers: ["Failure", "Example at $x = 0$", "LHD, RHD", "Picture"],
      rows: [
        ["Corner", "$\\lvert x \\rvert$", "$-1$, $+1$", "two different finite slopes"],
        ["Cusp", "$\\lvert x\\rvert^{2/3}$", "$-\\infty$, $+\\infty$", "sharp point, both sides vertical"],
        ["Vertical tangent", "$x^{1/3}$", "$+\\infty$, $+\\infty$", "smooth, but the tangent is vertical"],
        ["Oscillation", "$x\\sin\\frac1x$, $f(0) = 0$", "neither exists", "the secant keeps swinging"],
        ["Discontinuity", "$[x]$ at an integer", "not even continuous", "a jump"],
      ],
    },
    {
      type: "interactive",
      config: {
        component: "calc-tangent-explorer",
        expr: "abs(x)^(2/3)",
        exprLatex: "\\lvert x\\rvert^{2/3}",
        window: { xmin: -3, xmax: 3, ymin: -1, ymax: 3 },
        x0: { min: -2, max: 2, step: 0.1, initial: 1 },
        caption:
          "A cusp. Away from 0 the tangent behaves; as $x_0 \\to 0$ the tangent turns vertical from both sides, and at 0 the difference quotients blow up.",
      },
    },
    {
      type: "worked-example",
      id: "calc2-5-we1",
      title: "Worked example 1: one power of x makes all the difference",
      problem:
        "With $f(0) = g(0) = 0$, let $f(x) = x\\sin\\frac1x$ and $g(x) = x^2\\sin\\frac1x$ for $x \\ne 0$. Which is differentiable at 0?",
      steps: [
        { text: "Both are continuous at 0 by the squeeze theorem ($\\lvert f\\rvert \\le \\lvert x\\rvert$, $\\lvert g\\rvert \\le x^2$)." },
        { text: "For $f$: $\\frac{f(h) - f(0)}{h} = \\sin\\frac1h$, which oscillates between $-1$ and 1 forever. No limit, so **not differentiable**." },
        { text: "For $g$: $\\frac{g(h) - g(0)}{h} = h\\sin\\frac1h \\to 0$ by the squeeze theorem. So $g'(0) = 0$. *Why this step:* the extra factor of $h$ is exactly what crushes the oscillation." },
      ],
      answer: "$g$ is differentiable at 0 with $g'(0) = 0$; $f$ is continuous but not differentiable.",
    },
    { type: "heading", text: "Piecewise functions: matching value and slope" },
    {
      type: "text",
      content:
        "For a function glued from two smooth pieces at $x = a$, differentiability at the joint needs **two** matching conditions: the pieces must meet (continuity) and arrive with the same slope (LHD = RHD). Two conditions usually pin down two unknown constants.",
    },
    {
      type: "worked-example",
      id: "calc2-5-we2",
      title: "Worked example 2",
      problem:
        "$f(x) = x^2$ for $x \\le 1$ and $f(x) = ax + b$ for $x > 1$. Find $a$ and $b$ so that $f$ is differentiable at $x = 1$.",
      steps: [
        { text: "Continuity at 1: the left value $1^2 = 1$ must equal the right limit $a + b$. So $a + b = 1$." },
        { text: "Slopes: LHD $= 2x\\big|_{x=1} = 2$; RHD $= a$. So $a = 2$. *Why this step:* each one-sided derivative is the slope of its own piece at the joint, once continuity holds." },
        { text: "Hence $b = 1 - a = -1$: the line is the tangent $y = 2x - 1$ to the parabola at $(1, 1)$." },
      ],
      answer: "$a = 2$, $b = -1$",
    },
    {
      type: "worked-example",
      id: "calc2-5-we3",
      title: "Worked example 3: sums of absolute values",
      problem: "Where is $f(x) = \\lvert x - 2\\rvert + \\lvert x - 5\\rvert$ not differentiable? Find the LHD and RHD there.",
      steps: [
        { text: "Remove the bars interval by interval: for $x < 2$, $f = 7 - 2x$; for $2 \\le x \\le 5$, $f = 3$; for $x > 5$, $f = 2x - 7$." },
        { text: "At $x = 2$: LHD $= -2$, RHD $= 0$. At $x = 5$: LHD $= 0$, RHD $= 2$. *Why this step:* each one-sided derivative is just the slope of the adjacent piece." },
      ],
      answer: "Not differentiable at $x = 2$ and $x = 5$ (corners); differentiable everywhere else.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "calc2-5-q1",
      variant: "practice",
      question: "For $f(x) = \\lvert x - 3\\rvert$ at $x = 3$:",
      options: [
        { text: "LHD $= -1$, RHD $= 1$; not differentiable", correct: true, feedback: "A corner: the slopes of the two pieces differ." },
        { text: "LHD $=$ RHD $= 0$; differentiable", feedback: "The graph is a V, not flat, at 3." },
        { text: "Not continuous, hence not differentiable", feedback: "$\\lvert x - 3\\rvert$ is continuous everywhere; the failure is a corner." },
        { text: "LHD $= 1$, RHD $= -1$", feedback: "Left of 3 the graph falls (slope $-1$), right of 3 it rises." },
      ],
      hint: "Write $f$ without bars on each side of 3.",
    },
    {
      type: "quiz",
      id: "calc2-5-q2",
      variant: "concept",
      question: "Which statement is always true?",
      options: [
        { text: "If $f$ is differentiable at $a$, then $f$ is continuous at $a$.", correct: true, feedback: "$f(a + h) - f(a) = \\frac{f(a + h) - f(a)}{h}\\cdot h \\to f'(a)\\cdot 0$." },
        { text: "If $f$ is continuous at $a$, then $f$ is differentiable at $a$.", feedback: "$\\lvert x\\rvert$ at 0 is the counterexample." },
        { text: "If $f$ is not differentiable at $a$, then $f$ is not continuous at $a$.", feedback: "That is the converse in disguise; $\\lvert x\\rvert$ again." },
        { text: "If LHD and RHD both exist at $a$, then $f$ is differentiable at $a$.", feedback: "They must also be equal." },
      ],
      hint: "Only one direction of the implication holds. Which?",
    },
    {
      type: "numeric",
      id: "calc2-5-q3",
      variant: "practice",
      question: "$f(x) = x^2$ for $x \\le 2$ and $f(x) = kx - 4$ for $x > 2$. Find the value of $k$ that makes $f$ continuous at $x = 2$.",
      answer: 4,
      hint: "Match the two pieces at $x = 2$.",
      solution: "$2^2 = 2k - 4$, so $k = 4$.",
      commonMistakes: [{ answer: 2, feedback: "Solve $4 = 2k - 4$: $2k = 8$." }],
    },
    {
      type: "quiz",
      id: "calc2-5-q4",
      variant: "practice",
      question: "With that value of $k$, is the function of the previous question differentiable at $x = 2$?",
      options: [
        { text: "Yes: LHD $= 2\\cdot 2 = 4$ and RHD $= k = 4$.", correct: true, feedback: "The line $y = 4x - 4$ is exactly the tangent to $y = x^2$ at $(2, 4)$." },
        { text: "No: a piecewise function always has a corner at the joint.", feedback: "Not if the pieces arrive with the same slope." },
        { text: "No: LHD $= 2$, RHD $= 4$.", feedback: "The slope of $x^2$ at 2 is $2x = 4$, not 2." },
        { text: "Cannot tell without a graph.", feedback: "Compute the slopes of the two pieces at 2." },
      ],
      hint: "Compare the slope of $x^2$ at $x = 2$ with the slope of the line.",
    },
    {
      type: "quiz",
      id: "calc2-5-q5",
      variant: "practice",
      multiple: true,
      question: "Select **all** the functions that are continuous at $x = 0$ but **not** differentiable there (take the value at 0 to be 0 where needed).",
      options: [
        { text: "$\\lvert x\\rvert$", correct: true, feedback: "Corner." },
        { text: "$x\\lvert x\\rvert$", feedback: "$\\frac{h\\lvert h\\rvert}{h} = \\lvert h\\rvert \\to 0$: differentiable with derivative 0." },
        { text: "$\\lvert x\\rvert^{2/3}$", correct: true, feedback: "Cusp: the quotients blow up." },
        { text: "$x\\sin\\frac1x$", correct: true, feedback: "The quotient $\\sin\\frac1h$ oscillates." },
        { text: "$x^2\\sin\\frac1x$", feedback: "The quotient $h\\sin\\frac1h \\to 0$: differentiable." },
        { text: "$\\sin\\lvert x\\rvert$", correct: true, feedback: "LHD $= -1$, RHD $= 1$: a corner." },
      ],
      hint: "For each, compute $\\frac{f(h) - f(0)}{h}$ for small positive and negative $h$.",
    },
    {
      type: "numeric",
      id: "calc2-5-q6",
      variant: "practice",
      question: "At how many points is $f(x) = \\lvert x^2 - 4x + 3\\rvert$ not differentiable?",
      answer: 2,
      hint: "Corners appear where the inside changes sign with a non-zero slope.",
      solution: "$x^2 - 4x + 3 = (x - 1)(x - 3)$ changes sign at $x = 1$ and $x = 3$, with slopes $-2$ and $2$ there, so $\\lvert\\cdot\\rvert$ creates a corner at each.",
      commonMistakes: [{ answer: 1, feedback: "Both roots, 1 and 3, are simple zeros, and each one creates a corner." }],
    },
    {
      type: "numeric",
      id: "calc2-5-q7",
      variant: "practice",
      question:
        "$f(x) = ax^2 + 1$ for $x \\le 1$ and $f(x) = x^2 + ax + b$ for $x > 1$. If $f$ is differentiable at $x = 1$, find $a + b$.",
      answer: 2,
      hint: "Continuity gives one equation, equal slopes another.",
      solution: "Continuity: $a + 1 = 1 + a + b$, so $b = 0$. Slopes: $2a = 2 + a$, so $a = 2$. Hence $a + b = 2$.",
      commonMistakes: [
        { answer: 1, feedback: "Slopes: left $2a$, right $2 + a$. Equal when $a = 2$." },
        { answer: 4, feedback: "Continuity forces $b = 0$." },
      ],
    },
    {
      type: "quiz",
      id: "calc2-5-q8",
      variant: "practice",
      question: "For $f(x) = x^{1/3}$ (the real cube root) at $x = 0$:",
      options: [
        { text: "$f$ is continuous; $\\frac{h^{1/3}}{h} = h^{-2/3} \\to +\\infty$, so the tangent is vertical and $f'(0)$ does not exist.", correct: true, feedback: "Smooth-looking curve, vertical tangent: continuity without differentiability." },
        { text: "$f'(0) = 0$", feedback: "The graph is at its steepest at the origin." },
        { text: "$f$ is not continuous at 0", feedback: "The cube root is continuous everywhere." },
        { text: "LHD $= -\\infty$, RHD $= +\\infty$, a cusp", feedback: "$h^{-2/3}$ is positive for both signs of $h$: both sides go to $+\\infty$. That is a vertical tangent, not a cusp." },
      ],
      hint: "Simplify $\\frac{f(h) - f(0)}{h}$ to a power of $h$ and check its sign for $h < 0$.",
    },
    {
      type: "quiz",
      id: "calc2-5-q9",
      variant: "practice",
      question: "Is the greatest integer function $f(x) = [x]$ differentiable at $x = 2$?",
      options: [
        { text: "No: it is not even continuous at 2 (it jumps from 1 to 2).", correct: true, feedback: "Discontinuous implies not differentiable. (The LHD is $\\frac{1 - 2}{h} = -\\frac1h \\to +\\infty$.)" },
        { text: "Yes: it is flat on both sides, so the derivative is 0.", feedback: "Flat pieces, but they don't meet: the jump ruins the difference quotient from the left." },
        { text: "Only from the right.", feedback: "A one-sided derivative existing is not differentiability." },
        { text: "Yes, with derivative 1.", feedback: "$[x]$ never has slope 1 anywhere." },
      ],
      hint: "Check continuity first.",
    },
    {
      type: "numeric",
      id: "calc2-5-q10",
      variant: "mastery",
      question: "Let $f(x) = x^2\\sin\\frac1x$ for $x \\ne 0$ and $f(0) = 0$. Find $f'(0)$.",
      answer: 0,
      hint: "Write the difference quotient at 0 and squeeze it.",
      solution: "$\\frac{f(h) - f(0)}{h} = h\\sin\\frac1h$, and $-\\lvert h\\rvert \\le h\\sin\\frac1h \\le \\lvert h\\rvert$, so $f'(0) = 0$.",
      commonMistakes: [{ answer: 1, feedback: "There is no $\\frac{\\sin u}{u}$ here: $\\frac1h$ does not tend to 0." }],
    },
    {
      type: "quiz",
      id: "calc2-5-q11",
      variant: "mastery",
      multiple: true,
      question: "$f$ is differentiable at $x = a$. Select **all** the statements that must be true.",
      options: [
        { text: "$f$ is continuous at $a$.", correct: true, feedback: "Differentiable implies continuous." },
        { text: "$\\lim_{h \\to 0}\\frac{f(a + h) - f(a - h)}{2h}$ exists.", correct: true, feedback: "It equals $f'(a)$." },
        { text: "$f'$ is continuous at $a$.", feedback: "$x^2\\sin\\frac1x$ is differentiable at 0, but its derivative oscillates near 0." },
        { text: "$\\lvert f\\rvert$ is differentiable at $a$.", feedback: "$f(x) = x$ at 0: $\\lvert f\\rvert = \\lvert x\\rvert$ has a corner." },
      ],
      hint: "Look for counterexamples among $x$, $\\lvert x\\rvert$ and $x^2\\sin\\frac1x$.",
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "derivatives-of-basic-functions",
  title: "2.6 · Derivatives of the Basic Functions",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "Working from first principles every time would be like re-deriving the multiplication table before every sum. Instead we compute the derivative of each basic function **once**, using the standard limits of lessons 2.1–2.2, and keep the results in a table.",
    },
    { type: "heading", text: "Powers: the power rule" },
    {
      type: "text",
      content:
        "For a positive integer $n$, expand with the binomial theorem:\n\n$$(x + h)^n = x^n + n x^{n-1}h + \\binom n2 x^{n-2}h^2 + \\cdots + h^n.$$\n\nSubtract $x^n$, divide by $h$: every term after $nx^{n-1}$ still carries a factor of $h$ and vanishes. Alternatively, the power limit of lesson 2.2 says $\\frac{x^n - a^n}{x - a} \\to na^{n-1}$, which is exactly $f'(a)$ for $f(x) = x^n$, and holds for every real $n$ with $a > 0$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Power rule and linearity",
      content:
        "$\\dfrac{d}{dx}x^n = nx^{n-1}$ for every real $n$ (wherever $x^n$ is defined), and $\\dfrac{d}{dx}c = 0$.\nLinearity: $(af + bg)' = af' + bg'$ for constants $a, b$, straight from the limit laws.",
    },
    {
      type: "worked-example",
      id: "calc2-6-we1",
      title: "Worked example 1: rewrite as powers first",
      problem: "Differentiate $y = 4x^5 - 3\\sqrt x + \\dfrac{2}{x^2}$.",
      steps: [
        { text: "Rewrite every term as a power. *Why this step:* the power rule needs $x^n$ form.", latex: "y = 4x^5 - 3x^{1/2} + 2x^{-2}" },
        { text: "Differentiate term by term (linearity):", latex: "y' = 20x^4 - \\tfrac32 x^{-1/2} - 4x^{-3}" },
      ],
      answer: "$y' = 20x^4 - \\dfrac{3}{2\\sqrt x} - \\dfrac{4}{x^3}$",
    },
    { type: "heading", text: "Sine and cosine" },
    {
      type: "text",
      content:
        "Use $\\sin A - \\sin B = 2\\cos\\frac{A + B}{2}\\sin\\frac{A - B}{2}$ with $A = x + h$, $B = x$:",
    },
    {
      type: "math",
      latex: "\\frac{\\sin(x + h) - \\sin x}{h} = \\cos\\!\\left(x + \\tfrac h2\\right)\\cdot\\frac{\\sin(h/2)}{h/2} \\;\\longrightarrow\\; \\cos x",
    },
    {
      type: "text",
      content:
        "The same move with $\\cos A - \\cos B = -2\\sin\\frac{A + B}{2}\\sin\\frac{A - B}{2}$ gives $\\frac{d}{dx}\\cos x = -\\sin x$. Both rest on $\\frac{\\sin u}{u} \\to 1$, which is why the angle must be in radians. Watch the tangent slopes of $\\sin x$ trace out $\\cos x$:",
    },
    {
      type: "interactive",
      config: {
        component: "calc-tangent-explorer",
        expr: "sin(x)",
        exprLatex: "\\sin x",
        derivExpr: "cos(x)",
        derivLatex: "\\cos x",
        showDerivative: true,
        window: { xmin: -6.5, xmax: 6.5, ymin: -1.6, ymax: 1.6 },
        derivWindow: { ymin: -1.6, ymax: 1.6 },
        x0: { min: -6, max: 6, step: 0.1, initial: 0 },
        caption:
          "Slope 1 at $x = 0$, slope 0 at the peak near $x = 1.6$, slope $-1$ at $x \\approx 3.1$: the lower graph of slopes is $\\cos x$.",
      },
    },
    { type: "heading", text: "Exponentials and logarithms" },
    {
      type: "text",
      content:
        "**Exponential.** $\\frac{e^{x + h} - e^x}{h} = e^x\\cdot\\frac{e^h - 1}{h} \\to e^x$. The function $e^x$ is its own derivative: its slope everywhere equals its height. For another base, $a^x = e^{x\\ln a}$ gives $\\frac{d}{dx}a^x = a^x\\ln a$ (same factoring, with $\\frac{a^h - 1}{h} \\to \\ln a$).\n\n**Logarithm.** $\\frac{\\ln(x + h) - \\ln x}{h} = \\frac1x\\cdot\\frac{\\ln(1 + h/x)}{h/x} \\to \\frac1x$ for $x > 0$. For another base, $\\log_a x = \\frac{\\ln x}{\\ln a}$, so its derivative is $\\frac{1}{x\\ln a}$.",
    },
    {
      type: "table",
      headers: ["$f(x)$", "$f'(x)$", "Comes from"],
      rows: [
        ["$x^n$", "$nx^{n-1}$", "binomial / power limit"],
        ["$\\sin x$", "$\\cos x$", "$\\frac{\\sin u}{u} \\to 1$"],
        ["$\\cos x$", "$-\\sin x$", "$\\frac{\\sin u}{u} \\to 1$"],
        ["$e^x$", "$e^x$", "$\\frac{e^h - 1}{h} \\to 1$"],
        ["$a^x$", "$a^x\\ln a$", "$\\frac{a^h - 1}{h} \\to \\ln a$"],
        ["$\\ln x$", "$\\dfrac1x$", "$\\frac{\\ln(1 + u)}{u} \\to 1$"],
        ["$\\log_a x$", "$\\dfrac{1}{x\\ln a}$", "change of base"],
      ],
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"$\\frac{d}{dx}e^x = xe^{x-1}$\"",
      content:
        "The power rule is for a **variable base and constant exponent** ($x^5$, $x^e$, $x^\\pi$). An exponential has a **constant base and variable exponent** ($e^x$, $2^x$, $\\pi^x$). So $\\frac{d}{dx}x^e = ex^{e-1}$ but $\\frac{d}{dx}e^x = e^x$, and $\\frac{d}{dx}2^x = 2^x\\ln 2$. Ask first: which part is varying?",
    },
    {
      type: "worked-example",
      id: "calc2-6-we2",
      title: "Worked example 2: tangent lines from the table",
      problem: "Find the tangent lines to $y = e^x$ at $x = 0$ and to $y = \\ln x$ at $x = 1$.",
      steps: [
        { text: "At $x = 0$: point $(0, 1)$, slope $e^0 = 1$. Tangent: $y - 1 = 1(x - 0)$, i.e. $y = x + 1$." },
        { text: "At $x = 1$: point $(1, 0)$, slope $\\frac11 = 1$. Tangent: $y = x - 1$. *Why this step:* the graphs of $e^x$ and $\\ln x$ are mirror images in $y = x$, and so are these two tangents." },
      ],
      answer: "$y = x + 1$ and $y = x - 1$.",
    },
    {
      type: "worked-example",
      id: "calc2-6-we3",
      title: "Worked example 3: three bases at once",
      problem: "Find $f'(1)$ for $f(x) = 2^x + x^2 + \\log_2 x$.",
      steps: [
        { text: "Term by term: $f'(x) = 2^x\\ln 2 + 2x + \\dfrac{1}{x\\ln 2}$." },
        { text: "At $x = 1$:", latex: "f'(1) = 2\\ln 2 + 2 + \\frac{1}{\\ln 2} \\approx 1.386 + 2 + 1.443" },
      ],
      answer: "$f'(1) = 2\\ln 2 + 2 + \\dfrac{1}{\\ln 2} \\approx 4.83$",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "calc2-6-q1",
      variant: "practice",
      question: "$\\dfrac{d}{dx}x^{3/2} = $",
      options: [
        { text: "$\\dfrac32 x^{1/2}$", correct: true, feedback: "Power rule with $n = \\frac32$." },
        { text: "$\\dfrac32 x^{5/2}$", feedback: "Subtract 1 from the exponent, don't add." },
        { text: "$\\dfrac23 x^{1/2}$", feedback: "The exponent comes down as it is: $\\frac32$." },
        { text: "$x^{1/2}$", feedback: "Don't forget the factor $n = \\frac32$." },
      ],
      hint: "$\\frac{d}{dx}x^n = nx^{n-1}$ for any real $n$.",
    },
    {
      type: "numeric",
      id: "calc2-6-q2",
      variant: "practice",
      question: "For $y = x^4 - 6\\sqrt x$, find $y'$ at $x = 4$.",
      answer: 254.5,
      hint: "$y' = 4x^3 - \\frac{3}{\\sqrt x}$.",
      solution: "$4\\cdot 64 - \\frac{3}{2} = 256 - 1.5 = 254.5$.",
      commonMistakes: [
        { answer: 253, feedback: "$\\frac{d}{dx}6\\sqrt x = \\frac{6}{2\\sqrt x} = \\frac{3}{\\sqrt x}$, which is 1.5 at $x = 4$, not 3." },
        { answer: 256, feedback: "You dropped the $-6\\sqrt x$ term." },
      ],
    },
    {
      type: "quiz",
      id: "calc2-6-q3",
      variant: "practice",
      question: "$\\dfrac{d}{dx}5^x = $",
      options: [
        { text: "$5^x\\ln 5$", correct: true, feedback: "$5^x = e^{x\\ln 5}$." },
        { text: "$x\\,5^{x-1}$", feedback: "That is the power rule applied to an exponential: the base is constant here." },
        { text: "$5^x$", feedback: "Only base $e$ is its own derivative." },
        { text: "$\\dfrac{5^x}{\\ln 5}$", feedback: "Multiply by $\\ln 5$, don't divide." },
      ],
      hint: "Constant base, variable exponent.",
    },
    {
      type: "quiz",
      id: "calc2-6-q4",
      variant: "concept",
      question: "$\\dfrac{d}{dx}x^{\\pi} = $",
      options: [
        { text: "$\\pi x^{\\pi - 1}$", correct: true, feedback: "Variable base, constant exponent: the power rule." },
        { text: "$\\pi^x\\ln\\pi$", feedback: "That is the derivative of $\\pi^x$." },
        { text: "$x^\\pi\\ln x$", feedback: "That would be the derivative with respect to the exponent." },
        { text: "$0$, because $\\pi$ is a constant", feedback: "$x^\\pi$ is not a constant: $x$ varies." },
      ],
      hint: "Which part varies: the base or the exponent?",
    },
    {
      type: "numeric",
      id: "calc2-6-q5",
      variant: "practice",
      question: "Find the slope of $y = \\ln x$ at $x = 4$.",
      answer: 0.25,
      hint: "$\\frac{d}{dx}\\ln x = \\frac1x$.",
      solution: "$\\frac14 = 0.25$.",
      commonMistakes: [{ answer: 1.386, tolerance: 0.01, feedback: "That is $\\ln 4$, the height." }],
    },
    {
      type: "numeric",
      id: "calc2-6-q6",
      variant: "practice",
      question: "$f(x) = 3\\sin x + 4\\cos x$. Find $f'\\!\\left(\\frac{\\pi}{2}\\right)$.",
      answer: -4,
      hint: "$f'(x) = 3\\cos x - 4\\sin x$.",
      solution: "$3\\cos\\frac\\pi2 - 4\\sin\\frac\\pi2 = 0 - 4 = -4$.",
      commonMistakes: [{ answer: 4, feedback: "$\\frac{d}{dx}\\cos x = -\\sin x$: watch the sign." }],
    },
    {
      type: "quiz",
      id: "calc2-6-q7",
      variant: "practice",
      multiple: true,
      question: "Select **all** the functions with $f'(x) = f(x)$ for every $x$.",
      options: [
        { text: "$e^x$", correct: true, feedback: "Its own derivative." },
        { text: "$0$", correct: true, feedback: "The zero function trivially works." },
        { text: "$5e^x$", correct: true, feedback: "Constant multiples pass through the derivative." },
        { text: "$e^{x + 2}$", correct: true, feedback: "$e^{x + 2} = e^2\\cdot e^x$, a constant multiple of $e^x$." },
        { text: "$2^x$", feedback: "$\\frac{d}{dx}2^x = 2^x\\ln 2 \\ne 2^x$." },
        { text: "$e^x + 1$", feedback: "Its derivative is $e^x$, which misses the $+1$." },
      ],
      hint: "Use linearity and $\\frac{d}{dx}e^x = e^x$.",
    },
    {
      type: "numeric",
      id: "calc2-6-q8",
      variant: "practice",
      question: "A tangent to $y = e^x$ passes through the origin. Find the $x$-coordinate of its point of contact.",
      answer: 1,
      hint: "The tangent at $x = a$ is $y = e^a(x - a) + e^a$. Make it pass through $(0, 0)$.",
      solution: "$0 = e^a(0 - a) + e^a = e^a(1 - a)$, so $a = 1$. The tangent is $y = ex$.",
      commonMistakes: [{ answer: 0, feedback: "The tangent at $x = 0$ is $y = x + 1$, which misses the origin." }],
    },
    {
      type: "quiz",
      id: "calc2-6-q9",
      variant: "practice",
      question: "$\\dfrac{d}{dx}\\log_{10} x = $",
      options: [
        { text: "$\\dfrac{1}{x\\ln 10}$", correct: true, feedback: "$\\log_{10} x = \\frac{\\ln x}{\\ln 10}$." },
        { text: "$\\dfrac1x$", feedback: "That is for $\\ln x$ only." },
        { text: "$\\dfrac{\\ln 10}{x}$", feedback: "Divide by $\\ln 10$, don't multiply." },
        { text: "$\\dfrac{1}{10x}$", feedback: "The base enters through $\\ln 10$, not 10." },
      ],
      hint: "Change base to $e$ first.",
    },
    {
      type: "numeric",
      id: "calc2-6-q10",
      variant: "mastery",
      question: "$f(x) = x + \\dfrac{x^2}{2} + \\dfrac{x^3}{3} + \\cdots + \\dfrac{x^{100}}{100}$. Find $f'(1)$.",
      answer: 100,
      hint: "Differentiate term by term: $\\frac{d}{dx}\\frac{x^k}{k} = x^{k-1}$.",
      solution: "$f'(x) = 1 + x + x^2 + \\cdots + x^{99}$, a sum of 100 terms, each equal to 1 at $x = 1$.",
      commonMistakes: [{ answer: 99, feedback: "Count the terms: $x^0$ through $x^{99}$ is 100 terms." }],
    },
    {
      type: "quiz",
      id: "calc2-6-q11",
      variant: "concept",
      question: "If $x$ is measured in **degrees**, then $\\dfrac{d}{dx}\\sin x°$ equals",
      options: [
        { text: "$\\dfrac{\\pi}{180}\\cos x°$", correct: true, feedback: "$\\sin x° = \\sin\\frac{\\pi x}{180}$; the difference quotient picks up $\\frac{\\sin u}{u}$ scaled by $\\frac{\\pi}{180}$." },
        { text: "$\\cos x°$", feedback: "True only in radians. The standard limit behind it changes to $\\frac{\\pi}{180}$ in degrees." },
        { text: "$\\dfrac{180}{\\pi}\\cos x°$", feedback: "Inverted: a degree is a small angle, so the slope is smaller." },
        { text: "$-\\cos x°$", feedback: "No sign change: sine still increases near 0." },
      ],
      hint: "Lesson 2.1: $\\frac{\\sin x°}{x} \\to \\frac{\\pi}{180}$.",
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
        "No formula sheet. Every question below reduces to a handful of facts you can rebuild in a minute: one area squeeze, one definition of $e$, one $1^\\infty$ rule, a few series, and one limit called the derivative. Rebuild, then answer.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Chapter 2 in seven lines",
      content:
        "1. Squeeze: trapped between two functions with the same limit means the same limit.\n2. $\\frac{\\sin x}{x} \\to 1$ (radians, area squeeze); $\\frac{1 - \\cos x}{x^2} \\to \\frac12$; match the argument.\n3. $\\frac{e^x - 1}{x},\\ \\frac{\\ln(1 + x)}{x} \\to 1$; $\\frac{a^x - 1}{x} \\to \\ln a$; $\\frac{x^n - a^n}{x - a} \\to na^{n-1}$.\n4. $1^\\infty$: $\\lim f^g = e^{\\lim g(f - 1)}$.\n5. Series near 0 when leading terms cancel: $\\sin x \\approx x - \\frac{x^3}{6}$, $e^x \\approx 1 + x + \\frac{x^2}{2}$, ...\n6. $f'(a) = \\lim_{h \\to 0}\\frac{f(a + h) - f(a)}{h}$: slope and rate. Differentiable ⇒ continuous, not conversely (LHD = RHD needed).\n7. $(x^n)' = nx^{n-1}$, $(\\sin x)' = \\cos x$, $(\\cos x)' = -\\sin x$, $(e^x)' = e^x$, $(a^x)' = a^x\\ln a$, $(\\ln x)' = \\frac1x$.",
    },
    { type: "heading", text: "Limits" },
    {
      type: "numeric",
      id: "calc2-7-q1",
      variant: "mastery",
      question: "Find $\\lim_{x \\to 0}\\dfrac{(1 - \\cos 2x)(3 + \\cos x)}{x\\tan 4x}$.",
      answer: 2,
      hint: "Lesson 2.1: $1 - \\cos 2x \\approx 2x^2$ and $x\\tan 4x \\approx 4x^2$.",
      solution: "$\\frac{1 - \\cos 2x}{x^2} \\to 2$, $3 + \\cos x \\to 4$, $\\frac{x\\tan 4x}{x^2} \\to 4$. So the limit is $\\frac{2\\cdot 4}{4} = 2$.",
      commonMistakes: [
        { answer: 1, feedback: "$1 - \\cos 2x \\approx \\frac{(2x)^2}{2} = 2x^2$, not $x^2$." },
        { answer: 0.5, feedback: "Check the factor $3 + \\cos x \\to 4$." },
      ],
    },
    {
      type: "quiz",
      id: "calc2-7-q2",
      variant: "mastery",
      question: "$\\lim_{x \\to \\pi/2}\\dfrac{\\cot x - \\cos x}{(\\pi - 2x)^3} = $",
      options: [
        { text: "$\\dfrac{1}{16}$", correct: true, feedback: "Put $x = \\frac\\pi2 - t$: $\\frac{\\tan t - \\sin t}{8t^3} \\to \\frac{1/2}{8}$." },
        { text: "$\\dfrac18$", feedback: "$(\\pi - 2x)^3 = (2t)^3 = 8t^3$, and $\\frac{\\tan t - \\sin t}{t^3} \\to \\frac12$, not 1." },
        { text: "$\\dfrac14$", feedback: "Don't forget the cube on $2t$." },
        { text: "$\\dfrac{1}{24}$", feedback: "$\\frac{\\tan t - \\sin t}{t^3} \\to \\frac12$ (lesson 2.1, worked example 4)." },
      ],
      hint: "Lesson 2.1: shift to $t = \\frac\\pi2 - x \\to 0$; then $\\cot x = \\tan t$ and $\\cos x = \\sin t$.",
    },
    {
      type: "numeric",
      id: "calc2-7-q3",
      variant: "mastery",
      question: "Find $\\lim_{x \\to 0}\\dfrac{2^x - 1}{\\sqrt{1 + x} - 1}$ to 3 decimal places.",
      answer: 2 * Math.log(2),
      tolerance: 0.002,
      hint: "Lesson 2.2: $2^x - 1 \\approx x\\ln 2$; $\\sqrt{1 + x} - 1 \\approx \\frac x2$.",
      solution: "$\\frac{2^x - 1}{x}\\cdot\\frac{x}{\\sqrt{1 + x} - 1} \\to \\ln 2\\cdot 2 = 2\\ln 2 \\approx 1.386$.",
      commonMistakes: [{ answer: Math.log(2), tolerance: 0.002, feedback: "The denominator behaves like $\\frac x2$, which doubles the answer." }],
    },
    {
      type: "quiz",
      id: "calc2-7-q4",
      variant: "mastery",
      question: "$\\lim_{x \\to \\infty}\\left(\\dfrac{x + 6}{x + 1}\\right)^{x + 4} = $",
      options: [
        { text: "$e^5$", correct: true, feedback: "Base − 1 $= \\frac{5}{x + 1}$; times $x + 4$ tends to 5." },
        { text: "$e^6$", feedback: "Base − 1 is $\\frac{(x + 6) - (x + 1)}{x + 1}$." },
        { text: "$1$", feedback: "$1^\\infty$ is indeterminate." },
        { text: "$e^{4}$", feedback: "The $+4$ in the exponent does not survive the limit; the 5 from the base does." },
      ],
      hint: "Lesson 2.3: $e^{\\lim g(f - 1)}$.",
    },
    {
      type: "numeric",
      id: "calc2-7-q5",
      variant: "mastery",
      question: "Find $\\lim_{x \\to 0}\\left(\\dfrac{1 + \\tan x}{1 + \\sin x}\\right)^{1/\\sin^3 x}$ to 3 decimal places.",
      answer: Math.sqrt(Math.E),
      tolerance: 0.002,
      hint: "Lesson 2.3: base − 1 $= \\frac{\\tan x - \\sin x}{1 + \\sin x}$.",
      solution: "$\\frac{\\tan x - \\sin x}{(1 + \\sin x)\\sin^3 x} \\to \\frac{x^3/2}{x^3} = \\frac12$, so the limit is $e^{1/2} = \\sqrt e \\approx 1.649$.",
      commonMistakes: [
        { answer: 1, feedback: "$1^\\infty$ is not 1." },
        { answer: 0.5, feedback: "$\\frac12$ is the exponent; the limit is $e^{1/2}$." },
      ],
    },
    {
      type: "numeric",
      id: "calc2-7-q6",
      variant: "mastery",
      question: "Constants $a, b, c$ satisfy $\\lim_{x \\to 0}\\dfrac{ae^x - b\\cos x + ce^{-x}}{x\\sin x} = 2$. Find $a + b + c$.",
      answer: 4,
      hint: "Lesson 2.3: expand each term to $x^2$; the constant and $x$ coefficients must vanish.",
      solution:
        "Numerator $= (a - b + c) + (a - c)x + \\frac{a + b + c}{2}x^2 + \\cdots$ and $x\\sin x \\approx x^2$. So $a - b + c = 0$, $a - c = 0$ and $\\frac{a + b + c}{2} = 2$, giving $a + b + c = 4$ (with $a = c = 1$, $b = 2$).",
      commonMistakes: [{ answer: 2, feedback: "The $x^2$ coefficient is $\\frac{a + b + c}{2}$; set that equal to 2." }],
    },
    {
      type: "numeric",
      id: "calc2-7-q7",
      variant: "mastery",
      question: "Find $\\lim_{x \\to 0}\\dfrac{x - \\sin x}{x - \\tan x}$.",
      answer: -0.5,
      hint: "Lesson 2.3: $x - \\sin x \\approx \\frac{x^3}{6}$ and $x - \\tan x \\approx -\\frac{x^3}{3}$.",
      solution: "$\\frac{x^3/6}{-x^3/3} = -\\frac12$.",
      commonMistakes: [
        { answer: 0.5, feedback: "$x - \\tan x$ is negative for small $x > 0$." },
        { answer: -2, feedback: "Inverted: $\\frac{1/6}{-1/3} = -\\frac12$." },
      ],
    },
    {
      type: "quiz",
      id: "calc2-7-q8",
      variant: "mastery",
      question: "Which of these limits is **not** equal to 1?",
      options: [
        { text: "$\\lim_{x \\to 0}(1 + x)^{1/x}$", correct: true, feedback: "That is $e$." },
        { text: "$\\lim_{x \\to 0}\\dfrac{\\sin^{-1}x}{x}$", feedback: "That is 1." },
        { text: "$\\lim_{x \\to 0}\\dfrac{\\ln(1 + x)}{x}$", feedback: "That is 1." },
        { text: "$\\lim_{x \\to \\infty}x\\sin\\dfrac1x$", feedback: "Put $u = \\frac1x$: that is 1." },
      ],
      hint: "Lessons 2.1–2.3: which one defines $e$?",
    },
    { type: "heading", text: "Derivatives" },
    {
      type: "numeric",
      id: "calc2-7-q9",
      variant: "mastery",
      question: "$f$ is differentiable with $f'(3) = 2$. Find $\\lim_{h \\to 0}\\dfrac{f(3 + h^2) - f(3 - h^2)}{2h^2}$.",
      answer: 2,
      hint: "Lesson 2.4: add and subtract $f(3)$ and match each step.",
      solution: "$\\frac12\\left[\\frac{f(3 + h^2) - f(3)}{h^2} + \\frac{f(3 - h^2) - f(3)}{-h^2}\\right] \\to \\frac12(2 + 2) = 2$.",
      commonMistakes: [
        { answer: 4, feedback: "Don't forget the $\\frac12$ from the $2h^2$ in the denominator." },
        { answer: 0, feedback: "Both pieces have step $h^2$ and denominator $h^2$: they don't vanish." },
      ],
    },
    {
      type: "quiz",
      id: "calc2-7-q10",
      variant: "mastery",
      multiple: true,
      question: "Select **all** the functions that are **not** differentiable at $x = 0$.",
      options: [
        { text: "$\\lvert\\sin x\\rvert$", correct: true, feedback: "LHD $-1$, RHD $1$: a corner." },
        { text: "$x\\lvert x\\rvert$", feedback: "Differentiable, with derivative 0." },
        { text: "$\\lvert x\\rvert^3$", feedback: "$\\frac{\\lvert h\\rvert^3}{h} \\to 0$: differentiable." },
        { text: "$\\cos\\lvert x\\rvert$", feedback: "$\\cos\\lvert x\\rvert = \\cos x$ since cosine is even: smooth." },
        { text: "$\\sqrt{\\lvert x\\rvert}$", correct: true, feedback: "A cusp: quotients $\\pm\\frac{1}{\\sqrt{\\lvert h\\rvert}}$ blow up." },
        { text: "$x^{1/3}$", correct: true, feedback: "Vertical tangent." },
      ],
      hint: "Lesson 2.5: compute LHD and RHD, or spot even functions that are secretly smooth.",
    },
    {
      type: "numeric",
      id: "calc2-7-q11",
      variant: "mastery",
      question: "At how many points is $f(x) = \\lvert x^2 - 1\\rvert + \\lvert x - 3\\rvert$ not differentiable?",
      answer: 3,
      hint: "Lesson 2.5: list where each absolute value's inside changes sign.",
      solution: "$x^2 - 1$ changes sign at $\\pm1$ and $x - 3$ at 3. At each, exactly one term has a corner and the other is smooth, so the corners survive: 3 points.",
      commonMistakes: [{ answer: 2, feedback: "$x^2 - 1$ vanishes at both $x = 1$ and $x = -1$." }],
    },
    {
      type: "quiz",
      id: "calc2-7-q12",
      variant: "mastery",
      question: "$f(x) = \\sin x$ for $x < 0$ and $f(x) = ax + b$ for $x \\ge 0$. For $f$ to be differentiable at 0,",
      options: [
        { text: "$a = 1$, $b = 0$", correct: true, feedback: "Continuity: $b = \\sin 0 = 0$. Slopes: $a = \\cos 0 = 1$." },
        { text: "$a = 0$, $b = 1$", feedback: "The pieces must meet at height $\\sin 0 = 0$." },
        { text: "$a = 1$, $b$ any real number", feedback: "Without $b = 0$ the function jumps, and a jump kills differentiability." },
        { text: "$a = 0$, $b = 0$", feedback: "The slope of $\\sin x$ at 0 is $\\cos 0 = 1$." },
      ],
      hint: "Lesson 2.5: continuity first, then equal one-sided slopes.",
    },
    {
      type: "numeric",
      id: "calc2-7-q13",
      variant: "mastery",
      question: "Find $f'(1)$ for $f(x) = x^5 + 5^x + \\log_5 x$, to 2 decimal places.",
      answer: 5 + 5 * Math.log(5) + 1 / Math.log(5),
      tolerance: 0.01,
      hint: "Lesson 2.6: power rule, $a^x\\ln a$, $\\frac{1}{x\\ln a}$.",
      solution: "$f'(x) = 5x^4 + 5^x\\ln 5 + \\frac{1}{x\\ln 5}$; at 1: $5 + 5\\ln 5 + \\frac{1}{\\ln 5} \\approx 5 + 8.047 + 0.621 = 13.67$.",
      commonMistakes: [
        { answer: 15, feedback: "$\\frac{d}{dx}5^x = 5^x\\ln 5$, not $x\\,5^{x-1}$, and $\\log_5 x$ has derivative $\\frac{1}{x\\ln 5}$." },
      ],
    },
    {
      type: "quiz",
      id: "calc2-7-q14",
      variant: "mastery",
      question: "$f(x + y) = f(x) + f(y)$ for all real $x, y$, and $f'(0) = 3$. Then",
      options: [
        { text: "$f(x) = 3x$ for all $x$", correct: true, feedback: "$f(0) = 0$; the quotient $\\frac{f(x + h) - f(x)}{h} = \\frac{f(h)}{h} \\to 3$, so $f' \\equiv 3$ and $f(x) = 3x + f(0) = 3x$." },
        { text: "$f(x) = 3x + c$ for some non-zero $c$", feedback: "Put $x = y = 0$: $f(0) = 2f(0)$, so $f(0) = 0$." },
        { text: "$f(x) = 3x^2$", feedback: "$3(x + y)^2 \\ne 3x^2 + 3y^2$." },
        { text: "$f(x) = e^{3x}$", feedback: "That satisfies $f(x + y) = f(x)f(y)$, the multiplicative version." },
      ],
      hint: "Lesson 2.4: find $f(0)$, then use the definition at a general $x$.",
    },
    {
      type: "callout",
      variant: "info",
      content:
        "All solid? Then you can compute any limit JEE throws at you and the derivative of every basic function. Chapter 3 combines them: products, quotients, compositions, inverses, implicit curves and parameters.",
    },
  ]),
};

export const calcChapter2Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lessonMastery,
];
