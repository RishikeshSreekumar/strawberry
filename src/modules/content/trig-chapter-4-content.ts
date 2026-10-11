import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Trigonometry Chapter 4 — Solving Trigonometric Equations.
 * Backwards from a value to every angle producing it: periodicity,
 * reduction by identity, inner angles, and the solutions inverses hide.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const WAVE_WINDOW = { xmin: -0.5, xmax: 6.8, ymin: -1.6, ymax: 1.6 };

const lesson01: LessonSeed = {
  slug: "infinitely-many-answers",
  title: "4.1 · Infinitely Many Answers",
  position: 1,
  blocks: blocks([
    {
      type: "video",
      src: "/videos/trig-4-solving-equations.mp4",
      poster: "/videos/trig-4-solving-equations.jpg",
      title: "Chapter 4 overview video",
      caption:
        "A narrated walk through the whole chapter. Watch it now for the big picture, or come back to it as a recap.",
    },
    {
      type: "text",
      content:
        "Solve $\\sin x = \\frac{1}{2}$.\n\nA calculator answers $30^\\circ$, or $\\frac{\\pi}{6}$. That is one solution. It is not *the* solution, and treating it as such is the defining error of this chapter.",
    },
    {
      type: "text",
      content:
        "Draw the line $y = \\frac12$ across the sine wave. Every crossing is a solution, and there are infinitely many of them.",
    },
    {
      type: "interactive",
      config: {
        component: "equation-solution-viewer",
        expr: "sin(x)",
        exprLatex: "\\sin x",
        initialLevel: 0.5,
        minLevel: -1.2,
        maxLevel: 1.2,
        levelStep: 0.1,
        intervalMin: 0,
        intervalMax: 6.283,
        window: WAVE_WINDOW,
        caption:
          "Drag the line to 1: the two solutions merge into one. Push past 1 and they vanish — no angle has a sine above 1.",
      },
    },
    { type: "heading", text: "Reference angle, then every quadrant" },
    {
      type: "callout",
      variant: "info",
      title: "The two-step recipe",
      content:
        "1. **Find the reference angle** from the size of the value (ignore signs for a moment): $x_{\\text{ref}} = \\sin^{-1}|v|$.\n2. **Place it in every quadrant the sign allows**, then add whole periods.",
    },
    {
      type: "worked-example",
      id: "t4-1-we1",
      title: "Worked example 1: $\\sin x = \\frac12$",
      problem: "Solve $\\sin x = \\frac12$: first within one revolution, then in general.",
      steps: [
        {
          text: "For $\\sin x = \\frac12$: the reference angle is $\\frac{\\pi}{6}$, and sine is positive in quadrants I and II. So within one revolution:",
          latex: "x = \\frac{\\pi}{6} \\quad\\text{or}\\quad x = \\pi - \\frac{\\pi}{6} = \\frac{5\\pi}{6}",
        },
        {
          text: "Then every coterminal angle works too, because sine repeats every $2\\pi$. That gives the **general solution**:",
          latex: "x = \\frac{\\pi}{6} + 2\\pi n \\quad\\text{or}\\quad x = \\frac{5\\pi}{6} + 2\\pi n, \\qquad n \\in \\mathbb{Z}",
        },
      ],
      answer: "$x = \\frac{\\pi}{6} + 2\\pi n$ or $x = \\frac{5\\pi}{6} + 2\\pi n$.",
      tryFirst: false,
    },
    { type: "heading", text: "Interval and general solutions" },
    {
      type: "callout",
      variant: "definition",
      title: "Interval solution vs general solution",
      content:
        "An **interval solution** lists the answers inside a stated range, usually $[0, 2\\pi)$ — a finite list. The **general solution** describes all of them at once with a $+2\\pi n$ (or $+\\pi n$ for tangent). Read the question: \"solve for $0 \\le x < 2\\pi$\" wants the list, \"solve\" alone wants the general form.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Where the second solution lives",
      content:
        "For $\\sin x = v$: the partner is $\\pi - x$ (reflect across the vertical axis).\nFor $\\cos x = v$: the partner is $-x$, or $2\\pi - x$ (reflect across the horizontal axis).\nFor $\\tan x = v$: there is only one per period, and the period is $\\pi$, so $x + \\pi n$ covers everything.",
    },
    {
      type: "worked-example",
      id: "t4-1-we2",
      title: "Worked example 2: a negative cosine",
      problem: "Solve $\\cos x = -\\dfrac{\\sqrt3}{2}$, both on $[0, 2\\pi)$ and in general.",
      steps: [
        { text: "Reference angle from the size: $\\cos^{-1}\\frac{\\sqrt3}{2} = \\frac{\\pi}{6}$." },
        {
          text: "Cosine is negative in quadrants II and III. Place the reference angle there:",
          latex: "x = \\pi - \\frac{\\pi}{6} = \\frac{5\\pi}{6} \\quad\\text{or}\\quad x = \\pi + \\frac{\\pi}{6} = \\frac{7\\pi}{6}",
        },
        {
          text: "The two are mirror images across the x-axis ($\\frac{7\\pi}{6}$ is coterminal with $-\\frac{5\\pi}{6}$), so the general solution packs into one line:",
          latex: "x = \\pm\\frac{5\\pi}{6} + 2\\pi n, \\qquad n \\in \\mathbb{Z}",
        },
      ],
      answer: "On $[0, 2\\pi)$: $x = \\frac{5\\pi}{6}, \\frac{7\\pi}{6}$. In general: $x = \\pm\\frac{5\\pi}{6} + 2\\pi n$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The standard general-solution forms (JEE notation)",
      content:
        "If $\\alpha$ is any one solution:\n- $\\sin x = \\sin\\alpha \\iff x = n\\pi + (-1)^n\\alpha$\n- $\\cos x = \\cos\\alpha \\iff x = 2n\\pi \\pm \\alpha$\n- $\\tan x = \\tan\\alpha \\iff x = n\\pi + \\alpha$\n\nThe sine form is the two families $\\alpha + 2\\pi n$ and $\\pi - \\alpha + 2\\pi n$ written as one: even $n$ gives the first, odd $n$ the second.",
    },
    {
      type: "worked-example",
      id: "t4-1-we3",
      title: "Worked example 3: tangent in general form",
      problem: "Find the general solution of $\\tan x = -\\sqrt3$, and list the solutions in $[0, 2\\pi)$.",
      steps: [
        {
          text: "Reference angle $\\frac{\\pi}{3}$; tangent is negative in quadrants II and IV. One convenient solution is $\\alpha = -\\frac{\\pi}{3}$ (the one a calculator returns).",
        },
        {
          text: "Tangent repeats every $\\pi$, so one solution per period:",
          latex: "x = n\\pi - \\frac{\\pi}{3}, \\qquad n \\in \\mathbb{Z}",
        },
        {
          text: "In $[0, 2\\pi)$ take $n = 1$ and $n = 2$:",
          latex: "x = \\frac{2\\pi}{3}, \\quad x = \\frac{5\\pi}{3}",
        },
      ],
      answer: "$x = n\\pi - \\frac{\\pi}{3}$; on $[0, 2\\pi)$, $x = \\frac{2\\pi}{3}$ and $\\frac{5\\pi}{3}$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "t4-1-q1",
      variant: "practice",
      question: "How many solutions does $\\cos x = -\\dfrac{\\sqrt2}{2}$ have in $[0, 2\\pi)$?",
      options: [
        { text: "Two: $\\frac{3\\pi}{4}$ and $\\frac{5\\pi}{4}$.", correct: true, feedback: "Reference angle $\\frac{\\pi}{4}$, and cosine is negative in quadrants II and III." },
        { text: "One: $\\frac{3\\pi}{4}$.", feedback: "That is the quadrant II answer only; quadrant III also has a negative cosine." },
        { text: "Four.", feedback: "Four is the count of angles with a given *absolute* value; fixing the sign halves it." },
      ],
      hint: "In which quadrants is the x-coordinate negative?",
    },
    {
      type: "quiz",
      id: "t4-1-q2",
      variant: "concept",
      question: "What is the general solution of $\\tan x = 1$?",
      options: [
        { text: "$x = \\dfrac{\\pi}{4} + \\pi n$", correct: true, feedback: "Tangent's period is $\\pi$, so one solution per period covers everything." },
        { text: "$x = \\dfrac{\\pi}{4} + 2\\pi n$", feedback: "That misses $\\frac{5\\pi}{4}$, which also has tangent 1." },
        { text: "$x = \\dfrac{\\pi}{4}$ only", feedback: "One answer from a calculator, not the full set." },
      ],
      hint: "How often does tangent repeat?",
    },
    {
      type: "quiz",
      id: "t4-1-q3",
      variant: "concept",
      question: "Why does $\\sin x = 1$ have only one solution in $[0, 2\\pi)$ while $\\sin x = 0.9$ has two?",
      options: [
        {
          text: "At the maximum the line touches the curve at its peak; below the maximum it cuts through twice.",
          correct: true,
          feedback: "Exactly what the slider shows as the line approaches 1 — the two crossings slide together and merge.",
        },
        { text: "Because 1 is not a valid sine value.", feedback: "It is: $\\sin\\frac{\\pi}{2} = 1$ exactly." },
        { text: "Because $\\sin x = 0.9$ has no exact answer.", feedback: "The exactness of the answer has nothing to do with how many there are." },
      ],
      hint: "Drag the line in the viewer up to 1 and watch the two crossings.",
    },
    {
      type: "quiz",
      id: "t4-1-q4",
      variant: "practice",
      multiple: true,
      question: "Select every solution of $\\sin x = -\\dfrac12$ in $[0, 2\\pi)$.",
      options: [
        { text: "$\\dfrac{7\\pi}{6}$", correct: true, feedback: "Quadrant III, reference angle $\\frac{\\pi}{6}$: sine is $-\\frac12$." },
        { text: "$\\dfrac{11\\pi}{6}$", correct: true, feedback: "Quadrant IV, reference angle $\\frac{\\pi}{6}$: sine is $-\\frac12$." },
        { text: "$\\dfrac{\\pi}{6}$", feedback: "Right reference angle, wrong quadrant: $\\sin\\frac{\\pi}{6} = +\\frac12$." },
        { text: "$\\dfrac{5\\pi}{6}$", feedback: "Quadrant II has positive sine." },
        { text: "$\\dfrac{4\\pi}{3}$", feedback: "Right quadrant, wrong reference angle: $\\sin\\frac{4\\pi}{3} = -\\frac{\\sqrt3}{2}$." },
      ],
      hint: "Reference angle first, then the quadrants where sine is negative.",
    },
    {
      type: "numeric",
      id: "t4-1-q5",
      variant: "practice",
      question: "Find the smallest positive solution of $\\cos x = -\\dfrac12$. Give your answer in degrees.",
      answer: 120,
      unit: "degrees",
      hint: "Reference angle $60^\\circ$. Which quadrant with negative cosine do you reach first going anticlockwise?",
      solution: "Cosine is negative in quadrants II and III. The first one reached is quadrant II: $180^\\circ - 60^\\circ = 120^\\circ$.",
      commonMistakes: [
        { answer: 60, feedback: "$\\cos 60^\\circ = +\\frac12$. You need the sign to be negative." },
        { answer: 240, feedback: "That is a solution, but not the smallest positive one: $120^\\circ$ comes first." },
      ],
    },
    {
      type: "numeric",
      id: "t4-1-q6",
      variant: "practice",
      question:
        "The sum of all solutions of $\\tan x = \\sqrt3$ in $[0, 4\\pi]$ is $k\\pi$. Find $k$ (a fraction or a decimal).",
      answer: 22 / 3,
      tolerance: 0.001,
      hint: "List the solutions $\\frac{\\pi}{3} + n\\pi$ that lie in $[0, 4\\pi]$, then add.",
      solution:
        "The solutions are $\\frac{\\pi}{3}, \\frac{4\\pi}{3}, \\frac{7\\pi}{3}, \\frac{10\\pi}{3}$ (the next, $\\frac{13\\pi}{3}$, exceeds $4\\pi$). Sum: $\\frac{22\\pi}{3}$, so $k = \\frac{22}{3} \\approx 7.333$.",
      commonMistakes: [
        { answer: 8 / 3, tolerance: 0.001, feedback: "You used a period of $2\\pi$ and found only $\\frac{\\pi}{3}$ and $\\frac{7\\pi}{3}$. Tangent repeats every $\\pi$." },
        { answer: 35 / 3, tolerance: 0.001, feedback: "You included $\\frac{13\\pi}{3}$, which is past $4\\pi = \\frac{12\\pi}{3}$." },
      ],
    },
    {
      type: "quiz",
      id: "t4-1-q7",
      variant: "concept",
      question: "Which formula gives *every* solution of $\\sin x = \\sin\\alpha$?",
      options: [
        { text: "$x = n\\pi + (-1)^n\\alpha$", correct: true, feedback: "Even $n$ gives $\\alpha + 2k\\pi$; odd $n$ gives $\\pi - \\alpha + 2k\\pi$, the quadrant II partner." },
        { text: "$x = 2n\\pi \\pm \\alpha$", feedback: "That is the cosine form. For sine it gives $-\\alpha$, whose sine is $-\\sin\\alpha$." },
        { text: "$x = n\\pi + \\alpha$", feedback: "That is the tangent form. For sine, $\\alpha + \\pi$ has the opposite sign of sine." },
        { text: "$x = 2n\\pi + \\alpha$", feedback: "That misses the partner family $\\pi - \\alpha + 2n\\pi$." },
      ],
      hint: "Test $n = 1$ in each: the result must be $\\pi - \\alpha$ (or coterminal with it).",
    },
    {
      type: "numeric",
      id: "t4-1-q8",
      variant: "practice",
      question: "How many solutions does $\\cos x = 0.2$ have in $[-\\pi, 3\\pi]$?",
      answer: 4,
      hint: "The interval is two full revolutions long. How many solutions per revolution?",
      solution:
        "With $\\alpha = \\cos^{-1}0.2 \\approx 1.369$, the solutions are $\\pm\\alpha + 2\\pi n$: $-1.369, 1.369, 4.914, 7.652$ are in $[-3.142, 9.425]$; the next ones ($-4.914$, $11.20$) are not. Four solutions.",
      commonMistakes: [
        { answer: 2, feedback: "That is one revolution's worth. $[-\\pi, 3\\pi]$ is $4\\pi$ long: two revolutions." },
        { answer: 3, feedback: "Don't forget the negative solution $-\\cos^{-1}0.2 \\approx -1.369$, which lies in the interval." },
      ],
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "reduce-to-one-function",
  title: "4.2 · Reduce to One Function",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "Lesson 4.1 solved equations already in the form *function = number*. Real equations arrive mixed: two different functions, or squares, or products. The strategy is always the same.",
    },
    {
      type: "callout",
      variant: "info",
      title: "The strategy",
      content:
        "Use identities and algebra to reach **one trig function, of one angle**. Then it is a 4.1 problem.",
    },
    { type: "heading", text: "Three patterns" },
    {
      type: "worked-example",
      id: "t4-2-we1",
      title: "Pattern 1 — factor out a common factor",
      problem: "Solve $2\\sin x\\cos x = \\sin x$ on $[0, 2\\pi)$.",
      steps: [
        {
          text: "Move everything to one side and factor. Do *not* divide by $\\sin x$ — that throws away every solution where $\\sin x = 0$:",
          latex: "2\\sin x\\cos x - \\sin x = 0 \\quad\\Longrightarrow\\quad \\sin x\\,(2\\cos x - 1) = 0",
        },
        {
          text: "A product is zero when a factor is zero, so $\\sin x = 0$ (giving $x = 0, \\pi$) or $\\cos x = \\frac12$ (giving $x = \\frac{\\pi}{3}, \\frac{5\\pi}{3}$). Four solutions; dividing through would have found two.",
        },
      ],
      answer: "$x = 0, \\frac{\\pi}{3}, \\pi, \\frac{5\\pi}{3}$.",
      tryFirst: false,
    },
    {
      type: "callout",
      variant: "warning",
      title: "Never divide by something that can be zero",
      content:
        "Dividing by $\\sin x$, $\\cos x$ or any expression containing them silently deletes solutions. Factor instead — it keeps every branch.",
    },
    {
      type: "worked-example",
      id: "t4-2-we2",
      title: "Pattern 2 — quadratic in one function",
      problem: "Solve $2\\cos^2 x + \\cos x - 1 = 0$ on $[0, 2\\pi)$.",
      steps: [
        {
          text: "This is $2u^2 + u - 1 = 0$ with $u = \\cos x$. Factor: $(2u - 1)(u + 1) = 0$, so $\\cos x = \\frac12$ or $\\cos x = -1$:",
          latex: "x = \\frac{\\pi}{3},\\ \\frac{5\\pi}{3}, \\ \\pi",
        },
      ],
      answer: "$x = \\frac{\\pi}{3}, \\pi, \\frac{5\\pi}{3}$.",
    },
    {
      type: "worked-example",
      id: "t4-2-we3",
      title: "Pattern 3 — mixed functions, fixed by an identity",
      problem: "Solve $2\\sin^2 x + 3\\cos x = 3$ on $[0, 2\\pi)$.",
      steps: [
        {
          text: "Two different functions, but the sine appears squared — so the Pythagorean identity converts it. Substitute $\\sin^2 x = 1 - \\cos^2 x$:",
          latex: "2(1 - \\cos^2 x) + 3\\cos x = 3 \\quad\\Longrightarrow\\quad 2\\cos^2 x - 3\\cos x + 1 = 0",
        },
        {
          text: "Which factors as $(2\\cos x - 1)(\\cos x - 1) = 0$, giving $\\cos x = \\frac12$ or $\\cos x = 1$, hence $x = \\frac{\\pi}{3}, \\frac{5\\pi}{3}, 0$.",
        },
        {
          text: "The identity was chosen because it could replace the squared function. That is the usual signal: **a square is a Pythagorean invitation.**",
        },
      ],
      answer: "$x = 0, \\frac{\\pi}{3}, \\frac{5\\pi}{3}$.",
    },
    {
      type: "interactive",
      config: {
        component: "equation-solution-viewer",
        expr: "2*cos(x)^2 + cos(x) - 1",
        exprLatex: "2\\cos^2 x + \\cos x - 1",
        initialLevel: 0,
        minLevel: -1.5,
        maxLevel: 1.5,
        levelStep: 0.25,
        intervalMin: 0,
        intervalMax: 6.283,
        window: { xmin: -0.5, xmax: 6.8, ymin: -1.6, ymax: 2.4 },
        caption:
          "The quadratic in cosine, plotted. At level 0 the marked crossings are exactly the three solutions found by factoring.",
      },
    },
    { type: "heading", text: "Linear combinations: a cos x + b sin x = c" },
    {
      type: "text",
      content:
        "One more shape appears constantly in JEE: a cosine and a sine of the *same* angle, added. No Pythagorean swap helps, because neither is squared. Instead, run the angle-sum formula backwards to merge them into a single cosine: $a\\cos x + b\\sin x = R\\cos(x - \\phi)$, where $R = \\sqrt{a^2 + b^2}$, $\\cos\\phi = \\frac{a}{R}$ and $\\sin\\phi = \\frac{b}{R}$. Since a cosine lies in $[-1, 1]$, the equation $a\\cos x + b\\sin x = c$ has solutions exactly when $|c| \\le \\sqrt{a^2 + b^2}$.",
    },
    {
      type: "worked-example",
      id: "t4-2-we4",
      title: "Worked example: $\\sqrt3\\cos x + \\sin x = 1$",
      problem: "Solve $\\sqrt3\\cos x + \\sin x = 1$ on $[0, 2\\pi)$.",
      steps: [
        {
          text: "Here $a = \\sqrt3$, $b = 1$, so $R = \\sqrt{3 + 1} = 2$. Divide through by 2 and recognise exact values:",
          latex: "\\tfrac{\\sqrt3}{2}\\cos x + \\tfrac12\\sin x = \\tfrac12 \\;\\Longrightarrow\\; \\cos x\\cos\\tfrac{\\pi}{6} + \\sin x\\sin\\tfrac{\\pi}{6} = \\tfrac12",
        },
        {
          text: "The left side is the cosine difference formula read backwards:",
          latex: "\\cos\\left(x - \\tfrac{\\pi}{6}\\right) = \\tfrac12",
        },
        {
          text: "Now it is a 4.1 problem in the inner angle $u = x - \\frac{\\pi}{6}$, which runs over $\\left[-\\frac{\\pi}{6}, \\frac{11\\pi}{6}\\right)$. There $\\cos u = \\frac12$ at $u = \\frac{\\pi}{3}$ and $u = \\frac{5\\pi}{3}$:",
          latex: "x = \\frac{\\pi}{3} + \\frac{\\pi}{6} = \\frac{\\pi}{2}, \\qquad x = \\frac{5\\pi}{3} + \\frac{\\pi}{6} = \\frac{11\\pi}{6}",
        },
        {
          text: "Check: at $\\frac{\\pi}{2}$, $0 + 1 = 1$ ✓. At $\\frac{11\\pi}{6}$, $\\sqrt3 \\cdot \\frac{\\sqrt3}{2} - \\frac12 = 1$ ✓.",
        },
      ],
      answer: "$x = \\frac{\\pi}{2}$ and $x = \\frac{11\\pi}{6}$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "t4-2-q1",
      variant: "concept",
      question: "Solving $\\sin x\\tan x = \\sin x$, what goes wrong if you divide both sides by $\\sin x$?",
      options: [
        { text: "You lose the solutions where $\\sin x = 0$, namely $x = 0$ and $x = \\pi$.", correct: true, feedback: "Factoring to $\\sin x(\\tan x - 1) = 0$ keeps them." },
        { text: "Nothing — dividing is always valid.", feedback: "Only when the divisor cannot be zero, which is precisely not the case here." },
        { text: "You gain extra false solutions.", feedback: "Dividing loses solutions; squaring is the move that adds false ones." },
      ],
      hint: "What happens at the angles where the thing you divided by equals zero?",
    },
    {
      type: "quiz",
      id: "t4-2-q2",
      variant: "practice",
      question: "Which substitution turns $2\\cos^2 x - \\sin x - 1 = 0$ into a single-function equation?",
      options: [
        { text: "$\\cos^2 x = 1 - \\sin^2 x$", correct: true, feedback: "Giving $-2\\sin^2 x - \\sin x + 1 = 0$, a quadratic in $\\sin x$." },
        { text: "$\\sin x = 1 - \\cos x$", feedback: "Not an identity — test it at $x = \\frac{\\pi}{2}$." },
        { text: "$\\cos 2x = 2\\cos^2 x - 1$", feedback: "Valid, but it leaves both $\\cos 2x$ and $\\sin x$ — two functions *and* two angles." },
      ],
      hint: "Which term is squared? Replace that one.",
    },
    {
      type: "quiz",
      id: "t4-2-q3",
      variant: "practice",
      question: "How many solutions does $\\sin x(2\\sin x - 1) = 0$ have in $[0, 2\\pi)$?",
      options: [
        { text: "Four: $0, \\pi, \\frac{\\pi}{6}, \\frac{5\\pi}{6}$.", correct: true, feedback: "Two from each factor — count both branches every time." },
        { text: "Two: $\\frac{\\pi}{6}$ and $\\frac{5\\pi}{6}$.", feedback: "That is the second factor alone; $\\sin x = 0$ also solves it." },
        { text: "Three.", feedback: "Both $x = 0$ and $x = \\pi$ satisfy $\\sin x = 0$ within the interval." },
      ],
      hint: "Solve each factor separately, and count the solutions of each in $[0, 2\\pi)$.",
    },
    {
      type: "numeric",
      id: "t4-2-q4",
      variant: "practice",
      question: "How many solutions does $2\\sin^2 x + 3\\cos x = 0$ have in $[0, 2\\pi]$?",
      answer: 2,
      hint: "A square is a Pythagorean invitation: turn it into a quadratic in $\\cos x$.",
      solution:
        "$2(1 - \\cos^2 x) + 3\\cos x = 0$ gives $2\\cos^2 x - 3\\cos x - 2 = 0$, i.e. $(2\\cos x + 1)(\\cos x - 2) = 0$. $\\cos x = 2$ is impossible, so $\\cos x = -\\frac12$: $x = \\frac{2\\pi}{3}, \\frac{4\\pi}{3}$. Two solutions.",
      commonMistakes: [
        { answer: 4, feedback: "The root $\\cos x = 2$ gives nothing: cosine never exceeds 1." },
        { answer: 3, feedback: "Check $\\cos x = -\\frac12$ again: it gives exactly two angles in one revolution, and $\\cos x = 2$ gives none." },
      ],
    },
    {
      type: "quiz",
      id: "t4-2-q5",
      variant: "practice",
      multiple: true,
      question: "Select every solution of $\\sin 2x = \\cos x$ in $[0, 2\\pi)$.",
      options: [
        { text: "$\\dfrac{\\pi}{6}$", correct: true, feedback: "From the factor $2\\sin x - 1 = 0$." },
        { text: "$\\dfrac{\\pi}{2}$", correct: true, feedback: "From the factor $\\cos x = 0$: both sides are 0 there." },
        { text: "$\\dfrac{5\\pi}{6}$", correct: true, feedback: "The quadrant II partner of $\\frac{\\pi}{6}$." },
        { text: "$\\dfrac{3\\pi}{2}$", correct: true, feedback: "The other zero of $\\cos x$. Dividing by $\\cos x$ would have lost it." },
        { text: "$\\dfrac{7\\pi}{6}$", feedback: "There $\\sin x = -\\frac12$, but the factor needs $\\sin x = +\\frac12$." },
        { text: "$\\dfrac{\\pi}{3}$", feedback: "$\\sin\\frac{2\\pi}{3} = \\frac{\\sqrt3}{2}$ but $\\cos\\frac{\\pi}{3} = \\frac12$: not equal." },
      ],
      hint: "Expand $\\sin 2x$, bring everything to one side and factor out $\\cos x$.",
    },
    {
      type: "numeric",
      id: "t4-2-q6",
      variant: "practice",
      question: "How many solutions does $\\sin^4 x + \\cos^4 x = \\sin x\\cos x$ have in $[0, 2\\pi]$?",
      answer: 2,
      hint: "Rewrite the left side using $(\\sin^2 x + \\cos^2 x)^2$, then treat $p = \\sin x\\cos x$ as the single unknown.",
      solution:
        "$\\sin^4 x + \\cos^4 x = (\\sin^2 x + \\cos^2 x)^2 - 2\\sin^2 x\\cos^2 x = 1 - 2p^2$ with $p = \\sin x\\cos x$. So $1 - 2p^2 = p$, i.e. $2p^2 + p - 1 = 0$, giving $p = \\frac12$ or $p = -1$.\n\n$p = \\frac12\\sin 2x$ lies in $\\left[-\\frac12, \\frac12\\right]$, so $p = -1$ is impossible. $p = \\frac12$ needs $\\sin 2x = 1$: $x = \\frac{\\pi}{4}, \\frac{5\\pi}{4}$. Two solutions.",
      commonMistakes: [
        { answer: 4, feedback: "The root $p = -1$ gives nothing: $\\sin x\\cos x = \\frac12\\sin 2x$ can never be below $-\\frac12$." },
        { answer: 1, feedback: "$\\sin 2x = 1$ has two solutions for $x$ in $[0, 2\\pi]$, because $2x$ runs over two revolutions." },
      ],
    },
    {
      type: "quiz",
      id: "t4-2-q7",
      variant: "concept",
      question: "For which values of $c$ does $\\sqrt3\\cos x + \\sin x = c$ have a solution?",
      options: [
        { text: "$-2 \\le c \\le 2$", correct: true, feedback: "The left side is $2\\cos\\left(x - \\frac{\\pi}{6}\\right)$, which takes every value in $[-2, 2]$." },
        { text: "$-1 \\le c \\le 1$", feedback: "Each term alone is bounded by its coefficient, but together they reach $\\sqrt{a^2 + b^2} = 2$." },
        { text: "$-(1 + \\sqrt3) \\le c \\le 1 + \\sqrt3$", feedback: "That assumes both terms can be at their maximum at the same $x$. They cannot: the true maximum is $\\sqrt{3 + 1} = 2$." },
        { text: "Every real $c$.", feedback: "Both terms are bounded, so their sum is too." },
      ],
      hint: "Rewrite the left side as $R\\cos(x - \\phi)$. What range does that have?",
    },
    {
      type: "numeric",
      id: "t4-2-q8",
      variant: "practice",
      question: "How many solutions does $\\sin x + \\sin 3x = 0$ have in $[0, 2\\pi]$?",
      answer: 5,
      hint: "Use sum-to-product (lesson 3.5) to turn the sum into a product, then solve each factor. Watch for repeats.",
      solution:
        "$\\sin 3x + \\sin x = 2\\sin 2x\\cos x = 0$. From $\\sin 2x = 0$: $x = 0, \\frac{\\pi}{2}, \\pi, \\frac{3\\pi}{2}, 2\\pi$. From $\\cos x = 0$: $x = \\frac{\\pi}{2}, \\frac{3\\pi}{2}$, which are already listed. Five distinct solutions.",
      commonMistakes: [
        { answer: 7, feedback: "You counted $\\frac{\\pi}{2}$ and $\\frac{3\\pi}{2}$ twice. Each factor's solutions overlap." },
        { answer: 4, feedback: "The interval is closed: $2\\pi$ is included and $\\sin 2\\pi + \\sin 6\\pi = 0$." },
      ],
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "multiple-and-fractional-angles",
  title: "4.3 · Multiple and Fractional Angles",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "Solve $\\sin 2x = \\frac{\\sqrt3}{2}$ on $[0, 2\\pi)$.\n\nThe trap is to solve for $2x$, get two answers, halve them, and stop. That finds two of the four solutions. Here is why.",
    },
    { type: "heading", text: "Multiple angles: widen first" },
    {
      type: "callout",
      variant: "info",
      title: "Widen the interval before you solve",
      content:
        "If $x$ ranges over $[0, 2\\pi)$, then $2x$ ranges over $[0, 4\\pi)$ — twice as long, so it contains twice as many solutions. Solve for the *inner* angle across the widened interval, and only then divide.",
    },
    {
      type: "worked-example",
      id: "t4-3-we1",
      title: "Worked example 1: $\\sin 2x = \\frac{\\sqrt3}{2}$",
      problem: "Solve $\\sin 2x = \\frac{\\sqrt3}{2}$ on $[0, 2\\pi)$.",
      steps: [
        {
          text: "Let $u = 2x$, with $u \\in [0, 4\\pi)$. Reference angle $\\frac{\\pi}{3}$, sine positive in quadrants I and II, then add a full turn to each because the interval covers two revolutions:",
          latex: "u = \\frac{\\pi}{3},\\ \\frac{2\\pi}{3},\\ \\frac{\\pi}{3} + 2\\pi = \\frac{7\\pi}{3},\\ \\frac{2\\pi}{3} + 2\\pi = \\frac{8\\pi}{3}",
        },
        {
          text: "Only now convert back:",
          latex: "x = \\frac{u}{2} = \\frac{\\pi}{6},\\ \\frac{\\pi}{3},\\ \\frac{7\\pi}{6},\\ \\frac{4\\pi}{3}",
        },
        {
          text: "Four solutions, as the graph confirms — $\\sin 2x$ completes two cycles in $[0, 2\\pi)$, so it meets a horizontal line twice as often.",
        },
      ],
      answer: "$x = \\frac{\\pi}{6}, \\frac{\\pi}{3}, \\frac{7\\pi}{6}, \\frac{4\\pi}{3}$.",
      tryFirst: false,
    },
    {
      type: "interactive",
      config: {
        component: "equation-solution-viewer",
        expr: "sin(2*x)",
        exprLatex: "\\sin 2x",
        initialLevel: 0.866,
        minLevel: -1.2,
        maxLevel: 1.2,
        levelStep: 0.1,
        intervalMin: 0,
        intervalMax: 6.283,
        window: WAVE_WINDOW,
        caption:
          "Two full cycles in the same interval means twice as many crossings. Compare with the single-cycle picture in 4.1.",
      },
    },
    {
      type: "callout",
      variant: "tip",
      title: "The counting rule",
      content:
        "In $[0, 2\\pi)$, an equation in $\\sin bx$ or $\\cos bx$ typically has $2b$ solutions, and one in $\\tan bx$ also has $2b$ (one per period of length $\\frac{\\pi}{b}$). Fractional $b$ works the same way in reverse: $\\sin\\frac{x}{2}$ completes only half a cycle, so most values give a single solution — or none.",
    },
    { type: "heading", text: "Fractional and shifted angles" },
    {
      type: "worked-example",
      id: "t4-3-we2",
      title: "The fractional case",
      problem: "Solve $\\cos\\frac{x}{2} = \\frac12$ on $[0, 2\\pi)$.",
      steps: [
        { text: "Here $u = \\frac{x}{2}$ ranges over $[0, \\pi)$ — a *narrower* interval." },
        {
          text: "Within it, $\\cos u = \\frac12$ only at $u = \\frac{\\pi}{3}$, so $x = \\frac{2\\pi}{3}$ is the only solution. The usual second answer, $u = \\frac{5\\pi}{3}$, lies outside the range $u$ can reach.",
          latex: "u = \\frac{\\pi}{3} \\;\\Longrightarrow\\; x = \\frac{2\\pi}{3}",
        },
      ],
      answer: "One solution: $x = \\frac{2\\pi}{3}$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "The order that saves you",
      content:
        "**Substitute → widen (or narrow) the interval → solve fully → convert back.** Halving at the wrong moment is the single most common lost-marks error in this chapter, because the answer *looks* complete.",
    },
    {
      type: "worked-example",
      id: "t4-3-we3",
      title: "Worked example: a shifted inner angle",
      problem: "Solve $2\\cos\\left(2x - \\dfrac{\\pi}{3}\\right) = 1$ on $[0, \\pi]$.",
      steps: [
        {
          text: "Substitute $u = 2x - \\frac{\\pi}{3}$ and transform the interval: at $x = 0$, $u = -\\frac{\\pi}{3}$; at $x = \\pi$, $u = \\frac{5\\pi}{3}$. Both ends are included.",
          latex: "\\cos u = \\tfrac12, \\qquad u \\in \\left[-\\tfrac{\\pi}{3},\\ \\tfrac{5\\pi}{3}\\right]",
        },
        {
          text: "Cosine is $\\frac12$ at $\\pm\\frac{\\pi}{3} + 2\\pi n$. Inside the $u$-interval that is $u = -\\frac{\\pi}{3}$, $\\frac{\\pi}{3}$ and $\\frac{5\\pi}{3}$ (two of them are the endpoints).",
        },
        {
          text: "Convert back with $x = \\frac{u + \\pi/3}{2}$:",
          latex: "x = 0, \\quad x = \\frac{\\pi}{3}, \\quad x = \\pi",
        },
      ],
      answer: "Three solutions: $x = 0, \\frac{\\pi}{3}, \\pi$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "t4-3-q1",
      variant: "concept",
      question: "Solving $\\cos 3x = 0.4$ for $x \\in [0, 2\\pi)$, what interval must $3x$ be solved over?",
      options: [
        { text: "$[0, 6\\pi)$", correct: true, feedback: "Tripling $x$ triples the interval, which is where the extra solutions live." },
        { text: "$[0, 2\\pi)$", feedback: "That is the range of $x$, not of $3x$ — this is exactly the trap." },
        { text: "$\\left[0, \\frac{2\\pi}{3}\\right)$", feedback: "Dividing rather than multiplying; that would narrow the search." },
      ],
      hint: "If $x$ runs from 0 to $2\\pi$, where does $3x$ run?",
    },
    {
      type: "quiz",
      id: "t4-3-q2",
      variant: "practice",
      question: "How many solutions does $\\cos 4x = 0.3$ have in $[0, 2\\pi)$?",
      options: [
        { text: "Eight", correct: true, feedback: "Four full cycles, each crossing a horizontal line twice." },
        { text: "Two", feedback: "That is the count for a single cycle; $b = 4$ packs in four." },
        { text: "Four", feedback: "Four is the number of cycles, not crossings — each cycle contributes two." },
      ],
      hint: "How many full cycles does $\\cos 4x$ complete in $[0, 2\\pi)$, and how many crossings per cycle?",
    },
    {
      type: "quiz",
      id: "t4-3-q3",
      variant: "practice",
      question: "Solve $\\tan 2x = 1$ on $[0, \\pi)$.",
      options: [
        { text: "$x = \\dfrac{\\pi}{8}$ and $x = \\dfrac{5\\pi}{8}$", correct: true, feedback: "$2x \\in [0, 2\\pi)$ gives $2x = \\frac{\\pi}{4}, \\frac{5\\pi}{4}$; halve each." },
        { text: "$x = \\dfrac{\\pi}{8}$ only", feedback: "The widened interval $[0, 2\\pi)$ holds two solutions for $2x$, since tangent's period is $\\pi$." },
        { text: "$x = \\dfrac{\\pi}{4}$", feedback: "That is the solution for $2x$, not yet halved." },
      ],
      hint: "Widen the interval for $2x$ first, then remember tangent repeats every $\\pi$.",
    },
    {
      type: "numeric",
      id: "t4-3-q4",
      variant: "practice",
      question: "How many solutions does $\\sin 3x = -\\dfrac12$ have in $[0, 2\\pi)$?",
      answer: 6,
      hint: "$3x$ runs over $[0, 6\\pi)$: three revolutions.",
      solution: "Each revolution of $u = 3x$ gives two solutions of $\\sin u = -\\frac12$ (quadrants III and IV), and $u$ covers three revolutions: $3 \\times 2 = 6$.",
      commonMistakes: [
        { answer: 2, feedback: "That is the count for $\\sin x$. The inner angle covers three revolutions." },
        { answer: 3, feedback: "Three is the number of cycles; each cycle contributes two crossings." },
      ],
    },
    {
      type: "numeric",
      id: "t4-3-q5",
      variant: "practice",
      question: "Find the smallest positive solution of $\\tan\\dfrac{x}{2} = \\sqrt3$. Give your answer in degrees.",
      answer: 120,
      unit: "degrees",
      hint: "Solve for the inner angle $\\frac{x}{2}$ first, then convert back.",
      solution: "$\\frac{x}{2} = 60^\\circ + 180^\\circ n$, so $x = 120^\\circ + 360^\\circ n$. The smallest positive is $120^\\circ$.",
      commonMistakes: [
        { answer: 60, feedback: "That is the value of $\\frac{x}{2}$. Double it to get $x$." },
        { answer: 30, feedback: "You halved instead of doubling. If $\\frac{x}{2} = 60^\\circ$, then $x = 120^\\circ$." },
      ],
    },
    {
      type: "quiz",
      id: "t4-3-q6",
      variant: "practice",
      multiple: true,
      question: "Select every solution of $\\cos 2x = \\dfrac12$ in $[0, \\pi]$.",
      options: [
        { text: "$\\dfrac{\\pi}{6}$", correct: true, feedback: "$2x = \\frac{\\pi}{3}$, and $\\cos\\frac{\\pi}{3} = \\frac12$." },
        { text: "$\\dfrac{5\\pi}{6}$", correct: true, feedback: "$2x = \\frac{5\\pi}{3}$, the quadrant IV partner, still inside $[0, 2\\pi]$." },
        { text: "$\\dfrac{\\pi}{3}$", feedback: "That is the solution for $2x$, not yet halved. $\\cos\\frac{2\\pi}{3} = -\\frac12$." },
        { text: "$\\dfrac{7\\pi}{6}$", feedback: "It satisfies the equation but lies outside $[0, \\pi]$." },
        { text: "$-\\dfrac{\\pi}{6}$", feedback: "It satisfies the equation but is negative, so outside the interval." },
      ],
      hint: "Solve $\\cos u = \\frac12$ for $u = 2x$ in $[0, 2\\pi]$, then halve.",
    },
    {
      type: "numeric",
      id: "t4-3-q7",
      variant: "practice",
      question: "How many solutions does $\\sin 2x + \\cos 4x = 2$ have in $[0, 2\\pi]$?",
      answer: 0,
      hint: "Each term is at most 1. What must be true of each term for the sum to reach 2?",
      solution:
        "The sum can equal 2 only if $\\sin 2x = 1$ and $\\cos 4x = 1$ at the same $x$. $\\sin 2x = 1$ needs $2x = \\frac{\\pi}{2} + 2\\pi n$, i.e. $x = \\frac{\\pi}{4}, \\frac{5\\pi}{4}$. There $4x = \\pi$ or $5\\pi$, so $\\cos 4x = -1$, not 1. The two maxima never coincide: no solutions.",
      commonMistakes: [
        { answer: 2, feedback: "You found where $\\sin 2x = 1$ but did not check $\\cos 4x$ there. At $x = \\frac{\\pi}{4}$, $\\cos 4x = \\cos\\pi = -1$." },
        { answer: 8, feedback: "Counting where each term separately equals 1 is not enough: both must equal 1 at the same $x$." },
      ],
    },
    {
      type: "numeric",
      id: "t4-3-q8",
      variant: "practice",
      question: "How many solutions does $2\\cos\\left(2x - \\dfrac{\\pi}{3}\\right) = 1$ have in $[0, 2\\pi]$?",
      answer: 5,
      hint: "Transform the interval for $u = 2x - \\frac{\\pi}{3}$ and check both endpoints carefully.",
      solution:
        "$u$ runs over $\\left[-\\frac{\\pi}{3}, \\frac{11\\pi}{3}\\right]$. $\\cos u = \\frac12$ at $u = -\\frac{\\pi}{3}, \\frac{\\pi}{3}, \\frac{5\\pi}{3}, \\frac{7\\pi}{3}, \\frac{11\\pi}{3}$, both endpoints included. That gives $x = 0, \\frac{\\pi}{3}, \\pi, \\frac{4\\pi}{3}, 2\\pi$: five solutions.",
      commonMistakes: [
        { answer: 4, feedback: "The counting rule gives about 4, but both endpoints are solutions here ($x = 0$ and $x = 2\\pi$). Check them." },
        { answer: 3, feedback: "That is the count on $[0, \\pi]$ from the worked example. The interval is now twice as long." },
      ],
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "inverses-and-lost-solutions",
  title: "4.4 · Inverses and Lost Solutions",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "The calculator's $\\sin^{-1}$ is honest but narrow: by design (Chapter 2.6) it returns one angle from a restricted range. Everything else you must supply.",
    },
    { type: "heading", text: "Completing the calculator's answer" },
    {
      type: "table",
      headers: ["Equation", "Calculator returns", "What it omits"],
      rows: [
        ["$\\sin x = 0.6$", "$0.6435$ (Q I)", "the quadrant II partner $\\pi - 0.6435$, and all $+2\\pi n$"],
        ["$\\sin x = -0.6$", "$-0.6435$ (Q IV)", "the quadrant III partner $\\pi + 0.6435$"],
        ["$\\cos x = -0.5$", "$2.0944$ (Q II)", "the quadrant III partner $2\\pi - 2.0944$"],
        ["$\\tan x = -2$", "$-1.107$ (Q IV)", "every $+\\pi n$ repeat"],
      ],
    },
    {
      type: "callout",
      variant: "warning",
      title: "Negative values are where people slip",
      content:
        "For $\\sin x = -0.6$, the calculator hands back a *negative* angle. Its partner is **not** $\\pi - (-0.6435)$ read carelessly as a quadrant I angle — take the reference angle $0.6435$, then place it in the two quadrants where sine is negative (III and IV).",
    },
    {
      type: "worked-example",
      id: "t4-4-we1",
      title: "Worked example 1: a negative sine, to three decimals",
      problem: "Solve $\\sin x = -0.6$ on $[0, 2\\pi)$, giving answers to 3 decimal places.",
      steps: [
        {
          text: "Take the reference angle from the *size* of the value, ignoring the sign:",
          latex: "x_{\\text{ref}} = \\sin^{-1}0.6 \\approx 0.6435",
        },
        {
          text: "Sine is negative in quadrants III and IV. Place the reference angle there:",
          latex: "x = \\pi + 0.6435 \\approx 3.785, \\qquad x = 2\\pi - 0.6435 \\approx 5.640",
        },
        {
          text: "Check against the calculator: it returned $-0.6435$, which is coterminal with $5.640$. The quadrant III answer is the one it never shows you.",
        },
      ],
      answer: "$x \\approx 3.785$ and $x \\approx 5.640$.",
    },
    { type: "heading", text: "Extraneous solutions from squaring" },
    {
      type: "text",
      content:
        "**The other direction: extraneous solutions.** Squaring both sides of an equation creates answers that solve the squared version but not the original.",
    },
    {
      type: "worked-example",
      id: "t4-4-we2",
      title: "Worked example 2: squaring, then checking",
      problem: "Solve $\\sin x = \\cos x - 1$ on $[0, 2\\pi)$ by squaring.",
      steps: [
        {
          text: "Square both sides and replace $\\sin^2 x$:",
          latex: "\\sin^2 x = \\cos^2 x - 2\\cos x + 1 \\quad\\Longrightarrow\\quad 1 - \\cos^2 x = \\cos^2 x - 2\\cos x + 1",
        },
        {
          text: "Which tidies to $2\\cos^2 x - 2\\cos x = 0$, i.e. $2\\cos x(\\cos x - 1) = 0$, giving candidates $x = \\frac{\\pi}{2}, \\frac{3\\pi}{2}, 0$.",
        },
        {
          text: "Now **test each one in the original equation** (compare $\\sin x$ with $\\cos x - 1$):\n- $x = 0$: $0$ and $0$ — valid.\n- $x = \\frac{\\pi}{2}$: $1$ and $-1$ — extraneous.\n- $x = \\frac{3\\pi}{2}$: $-1$ and $-1$ — valid.",
        },
      ],
      answer: "$x = 0$ and $x = \\frac{3\\pi}{2}$; the candidate $\\frac{\\pi}{2}$ is extraneous.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Why squaring does this",
      content:
        "Squaring erases signs: $a = b$ and $a = -b$ both become $a^2 = b^2$. So the squared equation is the union of two problems, and the solutions to the wrong one come along for the ride. **Any time you square, checking is part of the method — not optional tidiness.**",
    },
    { type: "heading", text: "Domain checks" },
    {
      type: "text",
      content:
        "Domain checks matter too. If an equation contains $\\tan x$ or $\\sec x$, any candidate with $\\cos x = 0$ must be discarded — the original expression does not exist there, whatever the algebra says.",
    },
    {
      type: "worked-example",
      id: "t4-4-we3",
      title: "Worked example 3: a candidate outside the domain",
      problem: "Solve $\\sec x + \\tan x = 1$ on $[0, 2\\pi)$.",
      steps: [
        {
          text: "Write everything over $\\cos x$, noting that the original needs $\\cos x \\ne 0$:",
          latex: "\\frac{1 + \\sin x}{\\cos x} = 1 \\;\\Longrightarrow\\; 1 + \\sin x = \\cos x",
        },
        {
          text: "Rearrange to $\\cos x - \\sin x = 1$ and merge with the method of 4.2 ($R = \\sqrt2$):",
          latex: "\\sqrt2\\cos\\left(x + \\tfrac{\\pi}{4}\\right) = 1 \\;\\Longrightarrow\\; x + \\tfrac{\\pi}{4} = \\pm\\tfrac{\\pi}{4} + 2\\pi n",
        },
        {
          text: "In $[0, 2\\pi)$ the candidates are $x = 0$ and $x = \\frac{3\\pi}{2}$ (from $-\\frac{\\pi}{2} + 2\\pi$).",
        },
        {
          text: "Domain check: at $x = \\frac{3\\pi}{2}$, $\\cos x = 0$, so $\\sec x$ and $\\tan x$ do not exist there. It solves the cleared equation $1 + \\sin x = \\cos x$ ($0 = 0$) but not the original. Discard it. At $x = 0$: $1 + 0 = 1$ ✓.",
        },
      ],
      answer: "Only $x = 0$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "t4-4-q1",
      variant: "practice",
      question:
        "A calculator gives $\\sin^{-1}(0.8) \\approx 0.927$. What is the other solution in $[0, 2\\pi)$?",
      options: [
        { text: "$\\pi - 0.927 \\approx 2.214$", correct: true, feedback: "Sine is positive in quadrants I and II, and the quadrant II partner is $\\pi$ minus the reference angle." },
        { text: "$2\\pi - 0.927 \\approx 5.356$", feedback: "That is the *cosine* rule for partners; there sine would be negative." },
        { text: "$0.927 + \\pi \\approx 4.069$", feedback: "That is the tangent rule; it lands in quadrant III, where sine is negative." },
      ],
      hint: "In which other quadrant is sine positive, and how do you place a reference angle there?",
    },
    {
      type: "quiz",
      id: "t4-4-q2",
      variant: "concept",
      question: "Why must candidates be checked after squaring both sides?",
      options: [
        {
          text: "Squaring destroys sign information, so solutions of $a = -b$ appear alongside those of $a = b$.",
          correct: true,
          feedback: "Only substitution back into the original can tell the two apart.",
        },
        { text: "Because squaring can lose solutions.", feedback: "Squaring *adds* candidates; dividing is what loses them." },
        { text: "Because calculators round.", feedback: "Rounding is a separate concern; extraneous roots are exact and still wrong." },
      ],
      hint: "What do $a = b$ and $a = -b$ have in common after squaring?",
    },
    {
      type: "quiz",
      id: "t4-4-q3",
      variant: "practice",
      question:
        "Solving $\\sec x = 2\\tan x$ you obtain the candidate $x = \\frac{\\pi}{2}$. Keep it or drop it?",
      options: [
        { text: "Drop it — both $\\sec x$ and $\\tan x$ are undefined where $\\cos x = 0$.", correct: true, feedback: "A value outside the original domain can never be a solution, however it arose." },
        { text: "Keep it — it satisfies the rearranged equation.", feedback: "The rearranged equation may have a wider domain than the original." },
        { text: "Keep it only if the interval includes $\\frac{\\pi}{2}$.", feedback: "The interval is irrelevant when the expression does not exist there." },
      ],
      hint: "Do the functions in the *original* equation exist at $\\frac{\\pi}{2}$?",
    },
    {
      type: "numeric",
      id: "t4-4-q4",
      variant: "practice",
      question:
        "Solve $\\cos x = -0.3$ on $[0, 2\\pi)$. Enter the larger solution, to 3 decimal places.",
      answer: 4.408,
      tolerance: 0.001,
      unit: "rad",
      hint: "The calculator gives $\\cos^{-1}(-0.3)$ in quadrant II. Where is cosine's partner?",
      solution:
        "$\\cos^{-1}(-0.3) \\approx 1.875$ (quadrant II). Cosine's partner is the reflection $2\\pi - x$: $2\\pi - 1.875 \\approx 4.408$ (quadrant III).",
      commonMistakes: [
        { answer: 1.875, tolerance: 0.001, feedback: "That is the calculator's answer, the smaller one. Find its partner." },
        { answer: 5.017, tolerance: 0.001, feedback: "You used $\\pi + 1.875$ (the tangent rule). Cosine's partner is $2\\pi - x$." },
      ],
    },
    {
      type: "numeric",
      id: "t4-4-q5",
      variant: "practice",
      question: "Find the sum of the solutions of $\\tan x = -2$ in $[0, 2\\pi)$, to 3 decimal places.",
      answer: 3 * Math.PI - 2 * Math.atan(2),
      tolerance: 0.001,
      unit: "rad",
      hint: "The calculator returns $-1.107$, outside the interval. Add $\\pi$ to it, then add $\\pi$ again.",
      solution:
        "$\\tan^{-1}(-2) \\approx -1.107$. The solutions in $[0, 2\\pi)$ are $\\pi - 1.107 \\approx 2.034$ and $2\\pi - 1.107 \\approx 5.176$. Their sum is $3\\pi - 2.214 \\approx 7.210$.",
      commonMistakes: [
        { answer: Math.PI - 2 * Math.atan(2), tolerance: 0.001, feedback: "You kept the calculator's $-1.107$, which is outside $[0, 2\\pi)$. Its coterminal angle in the interval is $2\\pi - 1.107$." },
        { answer: 3 * Math.PI + 2 * Math.atan(2), tolerance: 0.001, feedback: "You added $1.107$ instead of subtracting: tangent is negative in quadrants II and IV, so the angles are $\\pi - 1.107$ and $2\\pi - 1.107$." },
      ],
    },
    {
      type: "quiz",
      id: "t4-4-q6",
      variant: "practice",
      multiple: true,
      question:
        "Squaring $\\sin x + \\cos x = 1$ gives $2\\sin x\\cos x = 0$, with candidates $0, \\frac{\\pi}{2}, \\pi, \\frac{3\\pi}{2}$ in $[0, 2\\pi)$. Select every candidate that solves the *original* equation.",
      options: [
        { text: "$0$", correct: true, feedback: "$0 + 1 = 1$ ✓." },
        { text: "$\\dfrac{\\pi}{2}$", correct: true, feedback: "$1 + 0 = 1$ ✓." },
        { text: "$\\pi$", feedback: "$0 + (-1) = -1$: this solves $\\sin x + \\cos x = -1$, the equation squaring merged in." },
        { text: "$\\dfrac{3\\pi}{2}$", feedback: "$-1 + 0 = -1$: extraneous, introduced by squaring." },
      ],
      hint: "Substitute each candidate into $\\sin x + \\cos x$ and see whether you get $+1$.",
    },
    {
      type: "numeric",
      id: "t4-4-q7",
      variant: "practice",
      question: "How many solutions does $\\tan 2x = \\tan x$ have in $[0, 2\\pi)$?",
      answer: 2,
      hint: "Tangents are equal when the angles differ by a multiple of $\\pi$. Then check that both sides exist at each candidate.",
      solution:
        "$2x = x + n\\pi$ gives $x = n\\pi$: in $[0, 2\\pi)$ that is $x = 0$ and $x = \\pi$. At both, $\\cos x \\ne 0$ and $\\cos 2x \\ne 0$, so both tangents exist. Two solutions.",
      commonMistakes: [
        { answer: 4, feedback: "Writing $\\tan 2x = \\frac{2\\tan x}{1 - \\tan^2 x}$ can suggest $\\frac{\\pi}{2}$ and $\\frac{3\\pi}{2}$, but $\\tan x$ does not exist there." },
        { answer: 1, feedback: "Don't forget $x = \\pi$: $\\tan 2\\pi = 0 = \\tan\\pi$." },
      ],
    },
    {
      type: "quiz",
      id: "t4-4-q8",
      variant: "concept",
      question:
        "To solve $\\sin x = -\\cos x$ a student divides by $\\cos x$ to get $\\tan x = -1$. Is any solution lost?",
      options: [
        {
          text: "No: if $\\cos x = 0$ then $\\sin x = \\pm1$, so such $x$ never satisfy the original. Dividing was safe here.",
          correct: true,
          feedback: "Division only loses solutions where the divisor is zero *and* the equation holds. Here those two never happen together.",
        },
        {
          text: "Yes: the solutions where $\\cos x = 0$ are lost.",
          feedback: "Test one: at $x = \\frac{\\pi}{2}$, $\\sin x = 1$ but $-\\cos x = 0$. It was never a solution.",
        },
        {
          text: "Yes: dividing by a trig function always loses solutions.",
          feedback: "Only when a zero of the divisor also solves the equation. Check it rather than assuming.",
        },
      ],
      hint: "Could an angle with $\\cos x = 0$ satisfy $\\sin x = -\\cos x$?",
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "trig-chapter-4-mastery",
  title: "4.5 · Chapter 4 Mastery",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "A mixed set with interval constraints. For each, decide first: how many solutions should I expect, and over what interval am I solving?",
    },
    {
      type: "callout",
      variant: "info",
      title: "The chapter in four lines",
      content:
        "1. Solutions repeat: reference angle, then every quadrant the sign allows, then $+$ whole periods.\n2. Reduce to one function of one angle before solving — factor, never divide.\n3. For an inner angle $bx$, widen the interval by the factor $b$ *before* solving.\n4. Inverses return one angle; squaring invents extra ones. Check.",
    },
    {
      type: "quiz",
      id: "t4-m-q1",
      variant: "mastery",
      question: "Solve $2\\sin x + \\sqrt{3} = 0$ on $[0, 2\\pi)$.",
      options: [
        { text: "$x = \\dfrac{4\\pi}{3}, \\dfrac{5\\pi}{3}$", correct: true, feedback: "$\\sin x = -\\frac{\\sqrt3}{2}$: reference angle $\\frac{\\pi}{3}$, negative sine in quadrants III and IV." },
        { text: "$x = \\dfrac{\\pi}{3}, \\dfrac{2\\pi}{3}$", feedback: "Those are the solutions for $+\\frac{\\sqrt3}{2}$ — the sign was dropped." },
        { text: "$x = \\dfrac{5\\pi}{6}, \\dfrac{7\\pi}{6}$", feedback: "That uses a reference angle of $\\frac{\\pi}{6}$, which belongs to the value $\\frac12$." },
      ],
    },
    {
      type: "quiz",
      id: "t4-m-q2",
      variant: "mastery",
      question: "Solve $2\\sin^2 x = \\sin x$ on $[0, 2\\pi)$.",
      options: [
        { text: "$x = 0, \\pi, \\dfrac{\\pi}{6}, \\dfrac{5\\pi}{6}$", correct: true, feedback: "Factor to $\\sin x(2\\sin x - 1) = 0$ and take both branches." },
        { text: "$x = \\dfrac{\\pi}{6}, \\dfrac{5\\pi}{6}$", feedback: "The result of dividing by $\\sin x$ — the two solutions where sine is zero are lost." },
        { text: "$x = 0, \\pi$", feedback: "Only the first factor; the second gives $\\sin x = \\frac12$ as well." },
      ],
    },
    {
      type: "quiz",
      id: "t4-m-q3",
      variant: "mastery",
      question: "How many solutions does $\\sin 3x = \\dfrac{1}{2}$ have in $[0, 2\\pi)$?",
      options: [
        { text: "Six", correct: true, feedback: "$3x$ runs over $[0, 6\\pi)$ — three revolutions, each contributing two solutions." },
        { text: "Two", feedback: "That is the single-revolution count; the inner angle covers three." },
        { text: "Three", feedback: "Three is the number of cycles; each one crosses the line twice." },
      ],
    },
    {
      type: "quiz",
      id: "t4-m-q4",
      variant: "mastery",
      question: "Solve $\\cos^2 x - \\cos x - 2 = 0$ on $[0, 2\\pi)$.",
      options: [
        { text: "$x = \\pi$", correct: true, feedback: "Factors as $(\\cos x - 2)(\\cos x + 1) = 0$; $\\cos x = 2$ is impossible, leaving $\\cos x = -1$." },
        { text: "$x = 0, \\pi$", feedback: "$\\cos 0 = 1$ does not satisfy the equation; only $\\cos x = -1$ does." },
        { text: "No solutions.", feedback: "The branch $\\cos x = 2$ has none, but the other branch works." },
      ],
      hint: "Solve the quadratic first, then discard any root outside $[-1, 1]$.",
    },
    {
      type: "quiz",
      id: "t4-m-q5",
      variant: "mastery",
      question:
        "What is the general solution of $\\cos x = \\dfrac{\\sqrt3}{2}$?",
      options: [
        { text: "$x = \\pm\\dfrac{\\pi}{6} + 2\\pi n$", correct: true, feedback: "Cosine's partner is the reflection $-x$, and the period is $2\\pi$." },
        { text: "$x = \\dfrac{\\pi}{6} + \\pi n$", feedback: "A $\\pi$ period belongs to tangent; here $x = \\frac{7\\pi}{6}$ would give a negative cosine." },
        { text: "$x = \\dfrac{\\pi}{6} + 2\\pi n$ only", feedback: "That misses the quadrant IV family, $-\\frac{\\pi}{6} + 2\\pi n$." },
      ],
    },
    {
      type: "numeric",
      id: "t4-m-q6",
      variant: "mastery",
      question: "The sum of all solutions of $2\\cos^2 x - 3\\cos x + 1 = 0$ in $[0, 2\\pi)$ is $k\\pi$. Find $k$.",
      answer: 2,
      solution:
        "$(2\\cos x - 1)(\\cos x - 1) = 0$ gives $\\cos x = \\frac12$ ($x = \\frac{\\pi}{3}, \\frac{5\\pi}{3}$) or $\\cos x = 1$ ($x = 0$; $2\\pi$ is excluded). Sum: $0 + \\frac{\\pi}{3} + \\frac{5\\pi}{3} = 2\\pi$, so $k = 2$.",
      commonMistakes: [
        { answer: 4, feedback: "$2\\pi$ is not in $[0, 2\\pi)$: the right end is open." },
      ],
    },
    {
      type: "quiz",
      id: "t4-m-q7",
      variant: "mastery",
      multiple: true,
      question: "Select every solution of $\\tan^2 x = 3$ in $[0, \\pi)$.",
      options: [
        { text: "$\\dfrac{\\pi}{3}$", correct: true, feedback: "$\\tan x = \\sqrt3$." },
        { text: "$\\dfrac{2\\pi}{3}$", correct: true, feedback: "$\\tan x = -\\sqrt3$: the square root offers both signs." },
        { text: "$\\dfrac{\\pi}{6}$", feedback: "$\\tan^2\\frac{\\pi}{6} = \\frac13$, the reciprocal of what is needed." },
        { text: "$\\dfrac{4\\pi}{3}$", feedback: "It satisfies the equation but lies outside $[0, \\pi)$." },
        { text: "$\\dfrac{5\\pi}{6}$", feedback: "$\\tan^2\\frac{5\\pi}{6} = \\frac13$, not 3." },
      ],
    },
    {
      type: "numeric",
      id: "t4-m-q8",
      variant: "mastery",
      question: "How many solutions does $\\cos 2x = \\cos x$ have in $[0, 2\\pi)$?",
      answer: 3,
      solution:
        "$2\\cos^2 x - 1 = \\cos x$ gives $2\\cos^2 x - \\cos x - 1 = 0$, i.e. $(2\\cos x + 1)(\\cos x - 1) = 0$. $\\cos x = 1$: $x = 0$. $\\cos x = -\\frac12$: $x = \\frac{2\\pi}{3}, \\frac{4\\pi}{3}$. Three solutions.",
      commonMistakes: [
        { answer: 4, feedback: "$\\cos x = 1$ has only one solution in $[0, 2\\pi)$: $2\\pi$ is excluded." },
        { answer: 2, feedback: "Don't drop the branch $\\cos x = 1$, which gives $x = 0$." },
      ],
    },
    {
      type: "numeric",
      id: "t4-m-q9",
      variant: "mastery",
      question: "Find the smallest positive solution of $\\sin 2x = \\cos 3x$. Give your answer in degrees.",
      answer: 18,
      unit: "degrees",
      solution:
        "Write $\\sin 2x = \\cos(90^\\circ - 2x)$. Then $\\cos 3x = \\cos(90^\\circ - 2x)$, so $3x = 360^\\circ n \\pm (90^\\circ - 2x)$.\n\nWith $+$: $5x = 90^\\circ + 360^\\circ n$, so $x = 18^\\circ + 72^\\circ n$. With $-$: $x = -90^\\circ + 360^\\circ n$, whose smallest positive value is $270^\\circ$. The smallest positive solution is $18^\\circ$.",
      commonMistakes: [
        { answer: 90, feedback: "$90^\\circ$ is a solution ($18^\\circ + 72^\\circ$), but not the smallest. Try $x = 18^\\circ$: $\\sin 36^\\circ = \\cos 54^\\circ$." },
        { answer: 270, feedback: "That is the smallest positive value of the second family. The first family, $18^\\circ + 72^\\circ n$, starts lower." },
      ],
    },
    {
      type: "numeric",
      id: "t4-m-q10",
      variant: "mastery",
      question: "How many solutions does $4\\sin^2 x - 1 = 0$ have in $[-\\pi, \\pi]$?",
      answer: 4,
      solution:
        "$\\sin x = \\pm\\frac12$: $x = \\frac{\\pi}{6}, \\frac{5\\pi}{6}$ (positive sine) and $x = -\\frac{\\pi}{6}, -\\frac{5\\pi}{6}$ (negative sine). Four solutions.",
      commonMistakes: [
        { answer: 2, feedback: "The square root gives $\\sin x = \\pm\\frac12$: both signs count." },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "Chapter 5 returns to triangles — this time without a right angle — and then hands the course over to calculus with a limit that only works because you measured in radians.",
    },
  ]),
};

export const trigChapter4Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lessonMastery,
];
