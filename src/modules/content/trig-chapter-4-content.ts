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
    {
      type: "callout",
      variant: "info",
      title: "The two-step recipe",
      content:
        "1. **Find the reference angle** from the size of the value (ignore signs for a moment): $x_{\\text{ref}} = \\sin^{-1}|v|$.\n2. **Place it in every quadrant the sign allows**, then add whole periods.",
    },
    {
      type: "text",
      content:
        "For $\\sin x = \\frac12$: the reference angle is $\\frac{\\pi}{6}$, and sine is positive in quadrants I and II. So within one revolution:",
    },
    { type: "math", latex: "x = \\frac{\\pi}{6} \\quad\\text{or}\\quad x = \\pi - \\frac{\\pi}{6} = \\frac{5\\pi}{6}" },
    {
      type: "text",
      content:
        "Then every coterminal angle works too, because sine repeats every $2\\pi$. That gives the **general solution**:",
    },
    {
      type: "math",
      latex: "x = \\frac{\\pi}{6} + 2\\pi n \\quad\\text{or}\\quad x = \\frac{5\\pi}{6} + 2\\pi n, \\qquad n \\in \\mathbb{Z}",
    },
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
      type: "quiz",
      id: "t4-1-q1",
      variant: "practice",
      question: "How many solutions does $\\cos x = -\\dfrac{\\sqrt2}{2}$ have in $[0, 2\\pi)$?",
      options: [
        { text: "Two: $\\frac{3\\pi}{4}$ and $\\frac{5\\pi}{4}$.", correct: true, feedback: "Reference angle $\\frac{\\pi}{4}$, and cosine is negative in quadrants II and III." },
        { text: "One: $\\frac{3\\pi}{4}$.", feedback: "That is the quadrant II answer only; quadrant III also has a negative cosine." },
        { text: "Four.", feedback: "Four is the count of angles with a given *absolute* value; fixing the sign halves it." },
      ],
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
    {
      type: "text",
      content:
        "**Pattern 1 — factor out a common factor.** Solve $2\\sin x\\cos x = \\sin x$ on $[0, 2\\pi)$.\n\nMove everything to one side and factor. Do *not* divide by $\\sin x$ — that throws away every solution where $\\sin x = 0$:",
    },
    {
      type: "math",
      latex: "2\\sin x\\cos x - \\sin x = 0 \\quad\\Longrightarrow\\quad \\sin x\\,(2\\cos x - 1) = 0",
    },
    {
      type: "text",
      content:
        "A product is zero when a factor is zero, so $\\sin x = 0$ (giving $x = 0, \\pi$) or $\\cos x = \\frac12$ (giving $x = \\frac{\\pi}{3}, \\frac{5\\pi}{3}$). Four solutions; dividing through would have found two.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Never divide by something that can be zero",
      content:
        "Dividing by $\\sin x$, $\\cos x$ or any expression containing them silently deletes solutions. Factor instead — it keeps every branch.",
    },
    {
      type: "text",
      content:
        "**Pattern 2 — quadratic in one function.** Solve $2\\cos^2 x + \\cos x - 1 = 0$.\n\nThis is $2u^2 + u - 1 = 0$ with $u = \\cos x$. Factor: $(2u - 1)(u + 1) = 0$, so $\\cos x = \\frac12$ or $\\cos x = -1$:",
    },
    { type: "math", latex: "x = \\frac{\\pi}{3},\\ \\frac{5\\pi}{3}, \\ \\pi" },
    {
      type: "text",
      content:
        "**Pattern 3 — mixed functions, fixed by an identity.** Solve $2\\sin^2 x + 3\\cos x = 3$.\n\nTwo different functions, but the sine appears squared — so the Pythagorean identity converts it. Substitute $\\sin^2 x = 1 - \\cos^2 x$:",
    },
    {
      type: "math",
      latex:
        "2(1 - \\cos^2 x) + 3\\cos x = 3 \\quad\\Longrightarrow\\quad 2\\cos^2 x - 3\\cos x + 1 = 0",
    },
    {
      type: "text",
      content:
        "Which factors as $(2\\cos x - 1)(\\cos x - 1) = 0$, giving $\\cos x = \\frac12$ or $\\cos x = 1$, hence $x = \\frac{\\pi}{3}, \\frac{5\\pi}{3}, 0$.\n\nThe identity was chosen because it could replace the squared function. That is the usual signal: **a square is a Pythagorean invitation.**",
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
    {
      type: "callout",
      variant: "info",
      title: "Widen the interval before you solve",
      content:
        "If $x$ ranges over $[0, 2\\pi)$, then $2x$ ranges over $[0, 4\\pi)$ — twice as long, so it contains twice as many solutions. Solve for the *inner* angle across the widened interval, and only then divide.",
    },
    {
      type: "text",
      content:
        "Let $u = 2x$, with $u \\in [0, 4\\pi)$. Reference angle $\\frac{\\pi}{3}$, sine positive in quadrants I and II, then add a full turn to each because the interval covers two revolutions:",
    },
    {
      type: "math",
      latex:
        "u = \\frac{\\pi}{3},\\ \\frac{2\\pi}{3},\\ \\frac{\\pi}{3} + 2\\pi = \\frac{7\\pi}{3},\\ \\frac{2\\pi}{3} + 2\\pi = \\frac{8\\pi}{3}",
    },
    { type: "math", latex: "x = \\frac{u}{2} = \\frac{\\pi}{6},\\ \\frac{\\pi}{3},\\ \\frac{7\\pi}{6},\\ \\frac{4\\pi}{3}" },
    {
      type: "text",
      content:
        "Four solutions, as the graph confirms — $\\sin 2x$ completes two cycles in $[0, 2\\pi)$, so it meets a horizontal line twice as often.",
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
        "In $[0, 2\\pi)$, an equation in $\\sin bx$ or $\\cos bx$ typically has $2b$ solutions, and one in $\\tan bx$ has $b$. Fractional $b$ works the same way in reverse: $\\sin\\frac{x}{2}$ completes only half a cycle, so most values give a single solution — or none.",
    },
    {
      type: "text",
      content:
        "**The fractional case.** Solve $\\cos\\frac{x}{2} = \\frac12$ on $[0, 2\\pi)$. Here $u = \\frac{x}{2}$ ranges over $[0, \\pi)$ — a *narrower* interval. Within it, $\\cos u = \\frac12$ only at $u = \\frac{\\pi}{3}$, so $x = \\frac{2\\pi}{3}$ is the only solution. The usual second answer, $u = \\frac{5\\pi}{3}$, lies outside the range $u$ can reach.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "The order that saves you",
      content:
        "**Substitute → widen (or narrow) the interval → solve fully → convert back.** Halving at the wrong moment is the single most common lost-marks error in this chapter, because the answer *looks* complete.",
    },
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
      type: "text",
      content:
        "**The other direction: extraneous solutions.** Squaring both sides of an equation creates answers that solve the squared version but not the original. Solve $\\sin x = \\cos x - 1$ on $[0, 2\\pi)$ by squaring:",
    },
    {
      type: "math",
      latex:
        "\\sin^2 x = \\cos^2 x - 2\\cos x + 1 \\quad\\Longrightarrow\\quad 1 - \\cos^2 x = \\cos^2 x - 2\\cos x + 1",
    },
    {
      type: "text",
      content:
        "Which tidies to $2\\cos^2 x - 2\\cos x = 0$, i.e. $2\\cos x(\\cos x - 1) = 0$, giving candidates $x = \\frac{\\pi}{2}, \\frac{3\\pi}{2}, 0$.\n\nNow **test each one in the original equation**:",
    },
    {
      type: "table",
      headers: ["Candidate", "$\\sin x$", "$\\cos x - 1$", "Verdict"],
      rows: [
        ["$0$", "$0$", "$0$", "valid"],
        ["$\\frac{\\pi}{2}$", "$1$", "$-1$", "extraneous"],
        ["$\\frac{3\\pi}{2}$", "$-1$", "$-1$", "valid"],
      ],
    },
    {
      type: "callout",
      variant: "info",
      title: "Why squaring does this",
      content:
        "Squaring erases signs: $a = b$ and $a = -b$ both become $a^2 = b^2$. So the squared equation is the union of two problems, and the solutions to the wrong one come along for the ride. **Any time you square, checking is part of the method — not optional tidiness.**",
    },
    {
      type: "text",
      content:
        "Domain checks matter too. If an equation contains $\\tan x$ or $\\sec x$, any candidate with $\\cos x = 0$ must be discarded — the original expression does not exist there, whatever the algebra says.",
    },
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
