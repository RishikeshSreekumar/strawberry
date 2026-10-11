import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Trigonometry Chapter 2 — Trig Functions as Functions.
 * The circle unwraps into a wave: graphs, transformations, tangent's
 * asymptotes, modelling, and the restricted domains inverses need.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const WAVE_WINDOW = { xmin: -6.5, xmax: 6.5, ymin: -3.5, ymax: 3.5 };

const lesson01: LessonSeed = {
  slug: "unwrapping-the-circle",
  title: "2.1 · Unwrapping the Circle",
  position: 1,
  blocks: blocks([
    {
      type: "video",
      src: "/videos/trig-2-trig-functions.mp4",
      poster: "/videos/trig-2-trig-functions.jpg",
      title: "Chapter 2 overview video",
      caption:
        "A narrated walk through the whole chapter. Watch it now for the big picture, or come back to it as a recap.",
    },
    {
      type: "text",
      content:
        "So far $\\sin\\theta$ has been a *lookup*: give me an angle, I give you a number. That is exactly what a function is. So plot it — angle along the horizontal axis, value up the vertical axis — and see what shape the whole collection of values makes.",
    },
    { type: "heading", text: "Sine: the height, unrolled" },
    {
      type: "text",
      content:
        "Picture a point walking anticlockwise around the unit circle while its height is recorded on a strip of paper being pulled steadily to the right. The circular motion gets unrolled into a curve.",
    },
    {
      type: "interactive",
      config: {
        component: "circle-to-wave",
        fn: "sin",
        maxRadians: 6.283,
        initialAngle: 2.1,
        caption:
          "The green segment is the height on the circle; the graph records that height against the angle. One full lap of the circle draws one full wave.",
      },
    },
    {
      type: "callout",
      variant: "definition",
      title: "The sine curve",
      content:
        "$y = \\sin x$, where $x$ is now an angle in radians treated as an ordinary real number. Starting at 0, it rises to 1 at $\\frac{\\pi}{2}$, returns to 0 at $\\pi$, falls to $-1$ at $\\frac{3\\pi}{2}$, and closes at 0 at $2\\pi$ — then repeats forever.",
    },
    {
      type: "text",
      content:
        "Two habits change at this point, and both matter:\n\n**Radians become the default.** The horizontal axis now carries real numbers, and $\\pi$, $2\\pi$, $\\frac{\\pi}{2}$ are just positions on it. Degrees would work but would make the axis run to 360 and every calculus formula messy.\n\n**The variable is called $x$.** Not because it stopped being an angle, but because sine is now being treated like any other function you can graph, transform and differentiate.",
    },
    { type: "heading", text: "Cosine: the horizontal coordinate, unrolled" },
    {
      type: "text",
      content:
        "Do the same with the *horizontal* coordinate instead and you get the cosine curve. Same shape, started at its peak instead of at zero — because at angle 0 the point is at $(1, 0)$, so cosine begins at 1.",
    },
    {
      type: "interactive",
      config: {
        component: "circle-to-wave",
        fn: "cos",
        maxRadians: 6.283,
        initialAngle: 1.2,
        caption:
          "Cosine records the horizontal coordinate. It starts at its maximum, and it is the same wave shifted.",
      },
    },
    {
      type: "callout",
      variant: "tip",
      title: "The repetition is not a coincidence",
      content:
        "The wave repeats every $2\\pi$ because the circle closes after a full turn: $\\theta$ and $\\theta + 2\\pi$ are coterminal, so they must give the same height. Periodicity is coterminal angles, drawn.",
    },
    { type: "heading", text: "Reading values off the wave" },
    {
      type: "worked-example",
      id: "t2-1-we1",
      title: "Worked example: ordering $\\sin 1$, $\\sin 2$, $\\sin 3$",
      problem:
        "Without a calculator, put $\\sin 1$, $\\sin 2$ and $\\sin 3$ in increasing order. (The angles are in radians.)",
      steps: [
        {
          text: "Locate the inputs on the axis using $\\frac{\\pi}{2} \\approx 1.57$ and $\\pi \\approx 3.14$. So 1 is on the rising stretch, while 2 and 3 are past the peak, on the falling stretch from $\\frac{\\pi}{2}$ to $\\pi$.",
        },
        {
          text: "The curve on $[0, \\pi]$ is symmetric about the peak at $\\frac{\\pi}{2}$: the height at $x$ equals the height at $\\pi - x$ (quadrant II mirrors quadrant I). Move 2 and 3 back onto the rising stretch:",
          latex: "\\sin 2 = \\sin(\\pi - 2) \\approx \\sin 1.14, \\qquad \\sin 3 = \\sin(\\pi - 3) \\approx \\sin 0.14",
        },
        {
          text: "On $\\left[0, \\frac{\\pi}{2}\\right]$ sine increases, so a bigger input gives a bigger value. Compare $0.14 < 1 < 1.14$:",
          latex: "\\sin 3 < \\sin 1 < \\sin 2",
        },
      ],
      answer: "$\\sin 3 < \\sin 1 < \\sin 2$ (about $0.14 < 0.84 < 0.91$).",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "t2-1-q1",
      variant: "concept",
      question: "Why does $y = \\sin x$ repeat every $2\\pi$?",
      options: [
        {
          text: "$x$ and $x + 2\\pi$ are coterminal — a full turn returns to the same point, so the height is the same.",
          correct: true,
          feedback: "Periodicity is inherited straight from the circle closing.",
        },
        { text: "Because $\\pi \\approx 3.14$ and the graph is drawn to that scale.", feedback: "The value of $\\pi$ sets the scale of the axis, not the repetition." },
        { text: "Because sine is always between $-1$ and 1.", feedback: "That is the range, a different property. A bounded function need not repeat." },
      ],
      hint: "Where is the point on the circle after an extra full turn?",
    },
    {
      type: "quiz",
      id: "t2-1-q2",
      variant: "practice",
      question: "At which $x$ in $[0, 2\\pi]$ does $y = \\sin x$ reach its minimum?",
      options: [
        { text: "$x = \\dfrac{3\\pi}{2}$", correct: true, feedback: "That is $270^\\circ$, where the circle's point is at $(0,-1)$ — the lowest height." },
        { text: "$x = \\pi$", feedback: "There the height is 0 — the curve is crossing the axis, not bottoming out." },
        { text: "$x = 2\\pi$", feedback: "That closes the lap back at height 0." },
      ],
      hint: "Sine is the height of the point. Where on the circle is the point lowest?",
    },
    {
      type: "numeric",
      id: "t2-1-q3",
      variant: "practice",
      question: "How many times does the graph of $y = \\sin x$ cross the line $y = 0.3$ for $x$ in $[0, 4\\pi]$?",
      answer: 4,
      hint: "Count the crossings in one period first, then count the periods.",
      solution:
        "In each period the curve rises through $0.3$ once and falls through it once (both in the positive half of the wave). $[0, 4\\pi]$ is two full periods, so there are $2 \\times 2 = 4$ crossings.",
      commonMistakes: [
        { answer: 2, feedback: "That is one period's worth. The interval $[0, 4\\pi]$ holds two full periods." },
        { answer: 8, feedback: "The line $y = 0.3$ is only met in the *upper* half of each wave: twice per period, not four times." },
      ],
    },
    {
      type: "quiz",
      id: "t2-1-q4",
      variant: "concept",
      multiple: true,
      question: "Select every true statement about $y = \\cos x$ on $[0, 2\\pi]$.",
      options: [
        { text: "It has its maximum value 1 at $x = 0$ and $x = 2\\pi$.", correct: true, feedback: "At angle 0 (and a full turn later) the point is at $(1, 0)$." },
        { text: "It has its minimum value $-1$ at $x = \\pi$.", correct: true, feedback: "At a half turn the point is at $(-1, 0)$." },
        { text: "It is zero at $x = \\frac{\\pi}{2}$ and $x = \\frac{3\\pi}{2}$.", correct: true, feedback: "The point is on the y-axis there, so its x-coordinate is 0." },
        { text: "It increases on $(0, \\pi)$.", feedback: "It *decreases* there: the point moves left from $(1, 0)$ to $(-1, 0)$." },
        { text: "$\\cos\\frac{3\\pi}{2} = -1$.", feedback: "At $\\frac{3\\pi}{2}$ the point is $(0, -1)$: it is the *sine* that equals $-1$ there." },
      ],
      hint: "Track the x-coordinate of the point as it travels once around the circle.",
    },
    {
      type: "quiz",
      id: "t2-1-q5",
      variant: "practice",
      question: "Without a calculator, order $\\cos 1$, $\\cos 2$ and $\\cos 3$ (radians) from smallest to largest.",
      options: [
        {
          text: "$\\cos 3 < \\cos 2 < \\cos 1$",
          correct: true,
          feedback: "1, 2 and 3 all lie in $[0, \\pi]$, where cosine falls steadily from 1 to $-1$. A bigger input gives a smaller value.",
        },
        {
          text: "$\\cos 1 < \\cos 2 < \\cos 3$",
          feedback: "That would need cosine to increase on $[0, \\pi]$. It decreases there: the point slides from $(1, 0)$ to $(-1, 0)$.",
        },
        {
          text: "$\\cos 2 < \\cos 3 < \\cos 1$",
          feedback: "There is no turning point between 2 and 3: cosine's minimum is at $\\pi \\approx 3.14$, so it is still falling at 3.",
        },
      ],
      hint: "Are 1, 2 and 3 all on the same rising or falling stretch of the cosine curve?",
    },
    {
      type: "numeric",
      id: "t2-1-q6",
      variant: "practice",
      question: "At how many points in $[0, 2\\pi]$ do the graphs of $y = \\sin x$ and $y = \\cos x$ meet?",
      answer: 2,
      hint: "Where on the unit circle are the two coordinates equal?",
      solution:
        "Equal coordinates means the point lies on the line $y = x$, which meets the unit circle twice: at $\\frac{\\pi}{4}$ (both $\\frac{\\sqrt2}{2}$) and at $\\frac{5\\pi}{4}$ (both $-\\frac{\\sqrt2}{2}$).",
      commonMistakes: [
        { answer: 1, feedback: "You found $\\frac{\\pi}{4}$. There is a second meeting in quadrant III, where both values are negative." },
        { answer: 4, feedback: "You may be counting points where $|\\sin x| = |\\cos x|$. Equal *values* needs equal signs too." },
      ],
    },
    {
      type: "numeric",
      id: "t2-1-q7",
      variant: "practice",
      question:
        "Find the $x$ in $[0, 2\\pi]$ at which $\\sin x = \\cos x$ and both are negative. Give your answer in degrees.",
      answer: 225,
      unit: "degrees",
      hint: "Both coordinates negative puts the point in one particular quadrant.",
      solution: "Equal and negative coordinates: quadrant III, on the line $y = x$. That is $180^\\circ + 45^\\circ = 225^\\circ$ ($\\frac{5\\pi}{4}$).",
      commonMistakes: [
        { answer: 45, feedback: "At $45^\\circ$ the values are equal but positive." },
        { answer: 135, feedback: "At $135^\\circ$ sine is positive and cosine negative, so they are not equal." },
      ],
    },
    {
      type: "numeric",
      id: "t2-1-q8",
      variant: "practice",
      question: "How many real solutions does $\\sin x = \\dfrac{x}{10}$ have? ($x$ in radians.)",
      answer: 7,
      hint: "Sketch both graphs. The line can only meet the wave where $\\left|\\frac{x}{10}\\right| \\le 1$. Then count crossings on the positive side and use symmetry.",
      solution:
        "Since $|\\sin x| \\le 1$, any solution has $|x| \\le 10$. Both sides are odd functions, so solutions come in $\\pm$ pairs plus $x = 0$.\n\nFor $x > 0$: the line $y = \\frac{x}{10}$ is below 1 until $x = 10$. On $(0, \\pi)$ the line starts below the wave (slope $\\frac{1}{10} < 1$) and meets it once as the wave comes down. On $(\\pi, 2\\pi)$ the wave is negative, so no crossing. On $(2\\pi, 3\\pi) \\approx (6.28, 9.42)$ the wave rises above the line and falls back: two crossings. Beyond $3\\pi$ the wave is negative until $4\\pi > 10$. That is 3 positive solutions.\n\nTotal: $3 + 3 + 1 = 7$.",
      commonMistakes: [
        { answer: 6, feedback: "Don't forget $x = 0$: $\\sin 0 = 0 = \\frac{0}{10}$." },
        { answer: 3, feedback: "Count the negative side too: both sides are odd, so every positive solution has a negative partner." },
        { answer: 5, feedback: "On $(2\\pi, 3\\pi)$ the positive half-wave rises above the line and comes back down, crossing it *twice*." },
      ],
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "reading-the-wave",
  title: "2.2 · Reading the Wave",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "Every property of the sine and cosine graphs can be read off the circle rather than memorized from the picture. Here is the full inventory, each one derived.",
    },
    { type: "heading", text: "Domain, range, period and zeros" },
    {
      type: "text",
      content:
        "**Domain: all real numbers.** You can rotate by any amount, so every input has an output.\n\n**Range: $[-1, 1]$.** The coordinates of a point on a unit circle never leave that interval.\n\n**Period: $2\\pi$.** A full turn returns you to the same point.\n\n**Zeros.** $\\sin x = 0$ when the height is zero, i.e. on the x-axis: $x = 0, \\pi, 2\\pi, \\ldots$, or $x = n\\pi$. $\\cos x = 0$ on the y-axis: $x = \\frac{\\pi}{2} + n\\pi$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Amplitude, midline, period",
      content:
        "**Midline** — the horizontal line the wave oscillates about ($y = 0$ for the plain curves).\n**Amplitude** — the distance from the midline to a peak (1 here). It is a distance, so it is never negative.\n**Period** — the horizontal length of one complete cycle ($2\\pi$ here).",
    },
    { type: "heading", text: "Even and odd" },
    {
      type: "text",
      content:
        "Now the two symmetries, derived from the reflection facts of Chapter 1.2. Negating the angle mirrors the point across the x-axis, keeping $x$ and flipping $y$:",
    },
    {
      type: "math",
      latex:
        "\\cos(-x) = \\cos x \\quad (\\text{even}), \\qquad \\sin(-x) = -\\sin x \\quad (\\text{odd})",
    },
    {
      type: "text",
      content:
        "On the graphs this is visible immediately: cosine is symmetric about the y-axis (fold the page along it and the halves match), while sine has half-turn symmetry about the origin.",
    },
    {
      type: "interactive",
      config: {
        component: "family-gallery",
        families: [
          { label: "sin x", expr: "sin(x)", latex: "\\sin x", excluded: [] },
          { label: "cos x", expr: "cos(x)", latex: "\\cos x", excluded: [] },
          { label: "sin(x + π/2)", expr: "sin(x + pi/2)", latex: "\\sin\\left(x + \\tfrac{\\pi}{2}\\right)", excluded: [] },
        ],
        window: WAVE_WINDOW,
      },
    },
    { type: "heading", text: "Cosine is a shifted sine" },
    {
      type: "text",
      content:
        "Flip between the first and third and you will see they are the same curve. That is not a coincidence to be memorized either — it says cosine *is* sine, shifted left by a quarter turn:",
    },
    { type: "math", latex: "\\cos x = \\sin\\!\\left(x + \\frac{\\pi}{2}\\right)" },
    {
      type: "text",
      content:
        "The reason is the same one from Chapter 0.3: in a right triangle, the sine of one acute angle is the cosine of the other, and the two acute angles add to $\\frac{\\pi}{2}$. On the circle, rotating your reference by a quarter turn swaps the roles of the two coordinates.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Where the wave is steepest",
      content:
        "Not at the peaks. At a peak the curve is momentarily flat — the height has stopped increasing and is about to decrease. The fastest change happens at the *zeros*. Hold on to that: in the calculus course it becomes the statement that the derivative of $\\sin$ is $\\cos$.",
    },
    { type: "heading", text: "Using the properties" },
    {
      type: "worked-example",
      id: "t2-2-we1",
      title: "Worked example 1: testing a combination for symmetry",
      problem: "Is $f(x) = x\\sin x + \\cos x$ even, odd, or neither?",
      steps: [
        {
          text: "Replace $x$ by $-x$ everywhere, and use $\\sin(-x) = -\\sin x$ and $\\cos(-x) = \\cos x$:",
          latex: "f(-x) = (-x)\\sin(-x) + \\cos(-x) = (-x)(-\\sin x) + \\cos x = x\\sin x + \\cos x",
        },
        {
          text: "That is $f(x)$ exactly, so $f$ is even. Notice $x\\sin x$ is even even though both factors are odd: odd × odd = even, just like $(-1)(-1) = 1$.",
        },
      ],
      answer: "$f$ is even: $f(-x) = f(x)$.",
    },
    {
      type: "worked-example",
      id: "t2-2-we2",
      title: "Worked example 2: range on a restricted interval",
      problem: "Find the range of $\\sin x$ for $x$ in $\\left[\\dfrac{\\pi}{6}, \\dfrac{4\\pi}{3}\\right]$.",
      steps: [
        {
          text: "On a restricted interval, the extremes happen either at a turning point inside the interval or at an endpoint. List the candidates.",
        },
        {
          text: "The peak $x = \\frac{\\pi}{2}$ is inside the interval, giving the value 1. The trough $\\frac{3\\pi}{2}$ is *not* inside ($\\frac{4\\pi}{3} < \\frac{3\\pi}{2}$), so the curve is still falling at the right end.",
        },
        {
          text: "Endpoints:",
          latex: "\\sin\\frac{\\pi}{6} = \\frac12, \\qquad \\sin\\frac{4\\pi}{3} = -\\frac{\\sqrt3}{2}",
        },
        {
          text: "The largest candidate is 1 and the smallest is $-\\frac{\\sqrt3}{2}$; the curve is continuous, so it takes every value in between.",
        },
      ],
      answer: "The range is $\\left[-\\tfrac{\\sqrt3}{2},\\ 1\\right]$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "t2-2-q1",
      variant: "concept",
      question: "$\\cos(-1.2)$ equals which of these?",
      options: [
        { text: "$\\cos(1.2)$", correct: true, feedback: "Cosine is even: reflecting the angle keeps the x-coordinate." },
        { text: "$-\\cos(1.2)$", feedback: "That is how *sine* behaves under a sign flip." },
        { text: "$\\cos(1.2) - \\pi$", feedback: "Angles shift by $\\pi$; values do not." },
      ],
      hint: "Mirror the point across the x-axis. Which coordinate survives unchanged?",
    },
    {
      type: "quiz",
      id: "t2-2-q2",
      variant: "practice",
      question: "How many solutions does $\\sin x = 0$ have in $[0, 4\\pi]$?",
      options: [
        { text: "Five: $0, \\pi, 2\\pi, 3\\pi, 4\\pi$.", correct: true, feedback: "Zeros occur every $\\pi$, and both endpoints are included." },
        { text: "Three.", feedback: "That counts one period plus an endpoint; the interval spans two full periods." },
        { text: "Infinitely many.", feedback: "True on the whole line, but this interval is bounded." },
      ],
      hint: "Sine is zero at every multiple of $\\pi$. List them, and check whether the endpoints count.",
    },
    {
      type: "quiz",
      id: "t2-2-q3",
      variant: "concept",
      question: "Which statement about $y = \\cos x$ is false?",
      options: [
        { text: "It is an odd function.", correct: true, feedback: "It is even: $\\cos(-x) = \\cos x$, with y-axis symmetry. Sine is the odd one." },
        { text: "Its range is $[-1, 1]$.", feedback: "True — coordinates on the unit circle stay within that." },
        { text: "It equals $\\sin\\left(x + \\frac{\\pi}{2}\\right)$.", feedback: "True — the quarter-turn shift derived above." },
      ],
      hint: "Test each claim against the circle. What happens to the x-coordinate when the angle is negated?",
    },
    {
      type: "quiz",
      id: "t2-2-q4",
      variant: "concept",
      multiple: true,
      question: "Select every odd function.",
      options: [
        { text: "$\\sin x$", correct: true, feedback: "$\\sin(-x) = -\\sin x$." },
        { text: "$x\\cos x$", correct: true, feedback: "Odd × even: $(-x)\\cos(-x) = -x\\cos x$." },
        { text: "$\\sin x\\cos x$", correct: true, feedback: "Odd × even is odd: $\\sin(-x)\\cos(-x) = -\\sin x\\cos x$." },
        { text: "$x\\sin x$", feedback: "Odd × odd is even: the two minus signs cancel." },
        { text: "$\\cos x + \\sin^2 x$", feedback: "Both parts are even ($\\sin^2$ squares away the sign), so the sum is even." },
        { text: "$\\sin x + \\cos x$", feedback: "Odd plus even is neither: $f(-x) = -\\sin x + \\cos x$, which matches neither $f(x)$ nor $-f(x)$." },
      ],
      hint: "Replace $x$ by $-x$ in each. Odd × even is odd; odd × odd is even.",
    },
    {
      type: "numeric",
      id: "t2-2-q5",
      variant: "practice",
      question: "How many zeros does $y = \\cos x$ have in the interval $[0, 10]$ (radians)?",
      answer: 3,
      hint: "The zeros are at $\\frac{\\pi}{2} + n\\pi$. Use $\\pi \\approx 3.14$ to list them until you pass 10.",
      solution: "$\\frac{\\pi}{2} \\approx 1.57$, $\\frac{3\\pi}{2} \\approx 4.71$, $\\frac{5\\pi}{2} \\approx 7.85$; the next, $\\frac{7\\pi}{2} \\approx 11.0$, is past 10. Three zeros.",
      commonMistakes: [
        { answer: 4, feedback: "Check the last one: $\\frac{7\\pi}{2} \\approx 11.0$ is outside $[0, 10]$." },
        { answer: 7, feedback: "Those are zeros of $\\sin x$ *and* $\\cos x$ together. Cosine's zeros are at odd multiples of $\\frac{\\pi}{2}$ only." },
      ],
    },
    {
      type: "numeric",
      id: "t2-2-q6",
      variant: "practice",
      question: "Find the minimum value of $\\sin x$ for $x$ in $\\left[\\dfrac{\\pi}{4}, \\dfrac{7\\pi}{6}\\right]$.",
      answer: -0.5,
      tolerance: 0.001,
      hint: "Is the trough of the sine wave inside this interval? If not, check the endpoints.",
      solution:
        "The trough at $\\frac{3\\pi}{2}$ is outside the interval, and the only turning point inside is the peak at $\\frac{\\pi}{2}$. So the minimum is at an endpoint: $\\sin\\frac{\\pi}{4} \\approx 0.707$ and $\\sin\\frac{7\\pi}{6} = -\\frac12$. The minimum is $-0.5$.",
      commonMistakes: [
        { answer: -1, feedback: "$-1$ needs $x = \\frac{3\\pi}{2}$, which is past the right end $\\frac{7\\pi}{6}$." },
        { answer: 0.707, tolerance: 0.001, feedback: "That is the value at the left end. The curve keeps falling after $\\pi$, so the right end is lower." },
      ],
    },
    {
      type: "quiz",
      id: "t2-2-q7",
      variant: "concept",
      question: "The graph of $y = \\sin(-x)$ is the same curve as",
      options: [
        { text: "$y = -\\sin x$", correct: true, feedback: "Sine is odd, so $\\sin(-x) = -\\sin x$: reflecting in the y-axis looks the same as reflecting in the x-axis." },
        { text: "$y = \\sin x$", feedback: "That would make sine even. At $x = \\frac{\\pi}{2}$, $\\sin(-x) = -1$ but $\\sin x = 1$." },
        { text: "$y = \\cos x$", feedback: "Cosine is a *shift* of sine, not a reflection. At $x = 0$, $\\sin(-0) = 0$ but $\\cos 0 = 1$." },
      ],
      hint: "Test one point, such as $x = \\frac{\\pi}{2}$.",
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "transforming-sinusoids",
  title: "2.3 · Transforming Sinusoids",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "Real oscillations are rarely a bare $\\sin x$. A tide swings 2 m about a mean depth of 5 m and repeats every 12 hours. That is still a sine wave — stretched, lifted and shifted. The general form packs all four adjustments into one expression:",
    },
    { type: "math", latex: "y = a\\,\\sin\\bigl(b(x - c)\\bigr) + d" },
    { type: "heading", text: "Four parameters, one job each" },
    {
      type: "callout",
      variant: "definition",
      title: "One job each",
      content:
        "$|a|$ — **amplitude**: vertical stretch. Negative $a$ also flips the wave upside down.\n$b$ — **frequency**: horizontal squeeze. The **period is $\\frac{2\\pi}{b}$**.\n$c$ — **phase shift**: slides the wave right by $c$ (left if $c$ is negative).\n$d$ — **vertical shift**: raises the midline to $y = d$.",
    },
    {
      type: "interactive",
      config: {
        component: "sinusoid-playground",
        fn: "sin",
        initialA: 1,
        initialB: 1,
        initialC: 0,
        initialD: 0,
        window: WAVE_WINDOW,
        caption:
          "Move one slider at a time and say out loud what it did before moving the next. The dashed curve stays as the reference.",
      },
    },
    { type: "heading", text: "Two traps in reading the form" },
    {
      type: "text",
      content:
        "Two traps account for nearly every mistake with this form.\n\n**Trap 1: $b$ is not the period.** Larger $b$ means *more* cycles in the same space, so the period *shrinks*: $\\text{period} = \\frac{2\\pi}{b}$. With $b = 2$ the wave finishes in $\\pi$, twice as fast.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Trap 2: factor before you read the shift",
      content:
        "In $\\sin(2x - \\pi)$ the shift is **not** $\\pi$. Factor the $b$ out first:\n$\\sin(2x - \\pi) = \\sin\\!\\bigl(2(x - \\tfrac{\\pi}{2})\\bigr)$, so the shift is $\\frac{\\pi}{2}$. Read $c$ only from the fully factored form.",
    },
    {
      type: "worked-example",
      id: "t2-3-we1",
      title: "Worked example 1: reading every parameter",
      problem:
        "For $y = -2\\sin\\left(3x - \\dfrac{\\pi}{2}\\right) + 1$, find the amplitude, period, phase shift, midline and range.",
      steps: [
        {
          text: "Factor the $b$ out of the bracket first (Trap 2):",
          latex: "y = -2\\sin\\left(3\\left(x - \\tfrac{\\pi}{6}\\right)\\right) + 1",
        },
        {
          text: "Now read: $a = -2$, so the amplitude is $|a| = 2$ and the wave is flipped. $b = 3$, so the period is $\\frac{2\\pi}{3}$ (Trap 1). $c = \\frac{\\pi}{6}$: shift right by $\\frac{\\pi}{6}$. $d = 1$: midline $y = 1$.",
        },
        {
          text: "The range is the midline plus or minus the amplitude. The flip does not change it:",
          latex: "[1 - 2,\\ 1 + 2] = [-1,\\ 3]",
        },
      ],
      answer: "Amplitude 2 (flipped), period $\\tfrac{2\\pi}{3}$, shift $\\tfrac{\\pi}{6}$ right, midline $y = 1$, range $[-1, 3]$.",
    },
    {
      type: "text",
      content:
        "The same four moves — stretch, squeeze, shift, lift — are the ones from the transformations lesson of the calculus course, applied to a new base curve. Nothing about them is trigonometry-specific; only the base function changed.",
    },
    { type: "heading", text: "From graph to formula" },
    {
      type: "text",
      content:
        "Working the other way is the skill exams actually test. Given a graph: read the midline for $d$, half the peak-to-trough distance for $a$, the cycle length for the period (then $b = \\frac{2\\pi}{\\text{period}}$), and the horizontal offset of the starting point for $c$.",
    },
    {
      type: "interactive",
      config: {
        component: "sinusoid-playground",
        fn: "sin",
        initialA: 1,
        initialB: 1,
        initialC: 0,
        initialD: 0,
        window: WAVE_WINDOW,
        target: { a: 2, b: 2, c: 0.5, d: -1 },
        caption: "Match the purple target curve.",
      },
    },
    {
      type: "worked-example",
      id: "t2-3-we2",
      title: "Worked example 2: building the formula from two points",
      problem:
        "A sinusoid has a maximum of 7 at $x = \\dfrac{\\pi}{4}$, and the next minimum is $-1$ at $x = \\dfrac{3\\pi}{4}$. Write it in the form $y = a\\cos\\bigl(b(x - c)\\bigr) + d$.",
      steps: [
        {
          text: "Extremes give the midline and amplitude:",
          latex: "d = \\frac{7 + (-1)}{2} = 3, \\qquad a = \\frac{7 - (-1)}{2} = 4",
        },
        {
          text: "From a maximum to the next minimum is half a cycle, so the period is twice that gap:",
          latex: "\\text{period} = 2\\left(\\tfrac{3\\pi}{4} - \\tfrac{\\pi}{4}\\right) = \\pi \\;\\Rightarrow\\; b = \\frac{2\\pi}{\\pi} = 2",
        },
        {
          text: "Cosine starts at a maximum, so slide it until its maximum sits at $x = \\frac{\\pi}{4}$: $c = \\frac{\\pi}{4}$.",
          latex: "y = 4\\cos\\left(2\\left(x - \\tfrac{\\pi}{4}\\right)\\right) + 3",
        },
        {
          text: "Check: at $x = \\frac{3\\pi}{4}$ the bracket is $2 \\cdot \\frac{\\pi}{2} = \\pi$, and $4\\cos\\pi + 3 = -1$. ✓",
        },
      ],
      answer: "$y = 4\\cos\\left(2\\left(x - \\tfrac{\\pi}{4}\\right)\\right) + 3$.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Periods of combinations (JEE favourite)",
      content:
        "A sum of periodic pieces repeats when *every* piece has completed a whole number of cycles: the LCM of the pieces' periods is always *a* period and usually the smallest, but not always: $|\\sin x| + |\\cos x|$ repeats after $\\frac{\\pi}{2}$ (see the last question). $\\sin 3x + \\cos 2x$ has pieces of period $\\frac{2\\pi}{3}$ and $\\pi$, and the first time both finish together is $2\\pi$.\n\nAbsolute values and squares can halve a period: $|\\sin x|$ and $\\sin^2 x$ fold the negative half-wave up onto the positive one, so they repeat every $\\pi$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "t2-3-q1",
      variant: "practice",
      question: "What is the period of $y = 3\\sin(4x)$?",
      options: [
        { text: "$\\dfrac{\\pi}{2}$", correct: true, feedback: "$\\frac{2\\pi}{b} = \\frac{2\\pi}{4}$. The amplitude 3 has no effect on the period." },
        { text: "$8\\pi$", feedback: "You multiplied by $b$ instead of dividing. A bigger $b$ means a faster wave." },
        { text: "$6\\pi$", feedback: "That uses the amplitude. Only $b$ controls the period." },
      ],
      hint: "Which parameter squeezes the wave horizontally, and does squeezing make the period longer or shorter?",
    },
    {
      type: "quiz",
      id: "t2-3-q2",
      variant: "concept",
      question: "What is the phase shift of $y = \\cos(3x + \\pi)$?",
      options: [
        { text: "$\\dfrac{\\pi}{3}$ to the left", correct: true, feedback: "Factor: $\\cos\\left(3\\left(x + \\frac{\\pi}{3}\\right)\\right)$. Adding inside shifts left." },
        { text: "$\\pi$ to the left", feedback: "That is the unfactored constant. You must divide it by $b = 3$ first." },
        { text: "$\\dfrac{\\pi}{3}$ to the right", feedback: "Right shift needs $x - c$; here the sign is a plus." },
      ],
      hint: "Rewrite it as $b(x - c)$ before reading anything off.",
    },
    {
      type: "quiz",
      id: "t2-3-q3",
      variant: "practice",
      question:
        "A wave oscillates between $y = 1$ and $y = 9$. What are its amplitude and midline?",
      options: [
        { text: "Amplitude 4, midline $y = 5$", correct: true, feedback: "Half the peak-to-trough gap is $\\frac{9-1}{2}=4$; the midline is the average, $\\frac{9+1}{2}=5$." },
        { text: "Amplitude 8, midline $y = 5$", feedback: "8 is the full swing; the amplitude is measured from the midline, so it is half of that." },
        { text: "Amplitude 4, midline $y = 4$", feedback: "The midline is the average of the extremes, not the amplitude." },
      ],
      hint: "The midline sits halfway between the extremes; the amplitude is the distance from it to either one.",
    },
    {
      type: "numeric",
      id: "t2-3-q4",
      variant: "practice",
      question: "What is the period of $y = 5\\cos\\left(\\dfrac{\\pi x}{3}\\right) - 2$?",
      answer: 6,
      hint: "Identify $b$, the coefficient of $x$ inside the cosine. The amplitude and shift don't matter.",
      solution: "$\\text{period} = \\dfrac{2\\pi}{\\pi/3} = 6$.",
      commonMistakes: [
        { answer: 1.047, tolerance: 0.001, feedback: "That is $b = \\frac{\\pi}{3}$ itself. The period is $\\frac{2\\pi}{b}$." },
        { answer: 3, feedback: "You divided $\\pi$ (not $2\\pi$) by $b$. Sine and cosine have base period $2\\pi$." },
      ],
    },
    {
      type: "numeric",
      id: "t2-3-q5",
      variant: "practice",
      question:
        "The period of $y = \\sin 3x + \\cos 2x$ is $k\\pi$. Enter $k$.",
      answer: 2,
      hint: "Find each piece's period, then the smallest length that is a whole number of both.",
      solution:
        "$\\sin 3x$ has period $\\frac{2\\pi}{3}$ and $\\cos 2x$ has period $\\pi$. Multiples of $\\frac{2\\pi}{3}$: $\\frac{2\\pi}{3}, \\frac{4\\pi}{3}, 2\\pi, \\ldots$; multiples of $\\pi$: $\\pi, 2\\pi, \\ldots$. The first common one is $2\\pi$, so $k = 2$.",
      commonMistakes: [
        { answer: 1, feedback: "After $\\pi$ the $\\cos 2x$ piece has finished, but $\\sin 3x$ has done $1\\frac12$ cycles. Both must finish together." },
        { answer: 0.667, tolerance: 0.001, feedback: "That is the period of $\\sin 3x$ alone. The sum repeats only when *both* pieces do." },
      ],
    },
    {
      type: "quiz",
      id: "t2-3-q6",
      variant: "concept",
      multiple: true,
      question: "Select every function whose period is $\\pi$.",
      options: [
        { text: "$\\sin 2x$", correct: true, feedback: "$\\frac{2\\pi}{2} = \\pi$." },
        { text: "$|\\sin x|$", correct: true, feedback: "The absolute value flips the negative half-wave up, so the shape repeats after half the original period." },
        { text: "$\\sin^2 x$", correct: true, feedback: "Squaring also makes the negative half-wave positive, matching the positive half: period $\\pi$." },
        { text: "$\\cos\\dfrac{x}{2}$", feedback: "$b = \\frac12$ stretches the wave: period $\\frac{2\\pi}{1/2} = 4\\pi$." },
        { text: "$\\sin x + \\cos 2x$", feedback: "$\\cos 2x$ repeats every $\\pi$ but $\\sin x$ needs $2\\pi$, so the sum needs $2\\pi$." },
      ],
      hint: "For each, ask: after a shift of $\\pi$, is every value exactly the same?",
    },
    {
      type: "numeric",
      id: "t2-3-q7",
      variant: "practice",
      question:
        "$y = a\\sin(bx) + d$, with $a > 0$ and $b > 0$, has a maximum of 7, a minimum of $-3$ and period $4\\pi$. Find $a + b + d$.",
      answer: 7.5,
      tolerance: 0.001,
      hint: "Get $d$ and $a$ from the extremes, and $b$ from the period.",
      solution:
        "$d = \\frac{7 + (-3)}{2} = 2$, $a = \\frac{7 - (-3)}{2} = 5$, and $b = \\frac{2\\pi}{4\\pi} = \\frac12$. So $a + b + d = 5 + 0.5 + 2 = 7.5$.",
      commonMistakes: [
        { answer: 11, feedback: "You used $b = 4$. The period is $4\\pi$, so $b = \\frac{2\\pi}{4\\pi} = \\frac12$." },
        { answer: 12.5, feedback: "You used the full swing 10 as the amplitude. The amplitude is half of it." },
      ],
    },
    {
      type: "numeric",
      id: "t2-3-q8",
      variant: "practice",
      question: "The period of $y = |\\sin x| + |\\cos x|$ is $k\\pi$. Enter $k$ (a fraction or a decimal).",
      answer: 0.5,
      tolerance: 0.001,
      hint: "Each piece has period $\\pi$, but try a smaller shift: what do $|\\sin|$ and $|\\cos|$ become after a quarter turn?",
      solution:
        "Shifting by $\\frac{\\pi}{2}$ turns $|\\sin x|$ into $|\\sin(x + \\frac{\\pi}{2})| = |\\cos x|$ and $|\\cos x|$ into $|\\cos(x + \\frac{\\pi}{2})| = |\\sin x|$. The two pieces swap, so the sum is unchanged. No smaller shift works (the sum is 1 at $x = 0$ and only returns to 1 at $\\frac{\\pi}{2}$), so the period is $\\frac{\\pi}{2}$ and $k = \\frac12$.",
      commonMistakes: [
        { answer: 1, feedback: "Each piece has period $\\pi$, but the sum repeats sooner: after $\\frac{\\pi}{2}$ the two pieces trade places." },
        { answer: 2, feedback: "The absolute values already halve the period of $\\sin$ and $\\cos$. Then the swap halves it again." },
      ],
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "tangent-and-the-asymptotes",
  title: "2.4 · Tangent and the Asymptotes",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "Sine and cosine are tame: bounded, continuous, repeating every $2\\pi$. Tangent is none of those things, and every one of its oddities follows from its definition.",
    },
    { type: "math", latex: "\\tan x = \\frac{\\sin x}{\\cos x}" },
    { type: "heading", text: "Asymptotes, zeros and range" },
    {
      type: "text",
      content:
        "**It blows up where $\\cos x = 0$.** That is at $x = \\frac{\\pi}{2}, \\frac{3\\pi}{2}, \\ldots$, i.e. $x = \\frac{\\pi}{2} + n\\pi$. Near those points the numerator is close to $\\pm 1$ while the denominator shrinks to nothing, so the quotient runs off to infinity. The graph has a **vertical asymptote** at each of them.\n\n**It is zero where $\\sin x = 0$**, at $x = n\\pi$ — a zero numerator over a nonzero denominator.\n\n**Its range is all real numbers.** As a slope, it can be anything.",
    },
    {
      type: "interactive",
      config: {
        component: "graph-explorer",
        expr: "tan(x)",
        exprLatex: "\\tan x",
        window: { xmin: -4.7, xmax: 4.7, ymin: -6, ymax: 6 },
        initial: 0.8,
        excluded: [-4.712, -1.571, 1.571, 4.712],
      },
    },
    { type: "heading", text: "Why the period is half as long" },
    {
      type: "callout",
      variant: "info",
      title: "Period $\\pi$, not $2\\pi$",
      content:
        "Tangent is the slope of the terminal side (Chapter 1.5), and a line through the origin is unchanged by a half turn. So the tangent graph repeats after $\\pi$ — one branch between consecutive asymptotes, repeated forever. Its transformed period is $\\frac{\\pi}{b}$, not $\\frac{2\\pi}{b}$.",
    },
    {
      type: "text",
      content:
        "Watching it grow on the circle makes the escape concrete: as the angle approaches a quarter turn, the point climbs toward the top of the circle, the horizontal coordinate collapses, and the ratio runs away.",
    },
    {
      type: "interactive",
      config: {
        component: "circle-to-wave",
        fn: "tan",
        maxRadians: 3.0,
        initialAngle: 1.2,
        caption:
          "Push toward 1.57 rad ($90^\\circ$) and the trace leaves the top of the picture. There is no value at the asymptote itself — cosine is exactly zero there.",
      },
    },
    { type: "heading", text: "Locating asymptotes of a transformed tangent" },
    {
      type: "worked-example",
      id: "t2-4-we1",
      title: "Worked example: asymptotes in an interval",
      problem: "Find every vertical asymptote of $y = \\tan\\left(2x - \\dfrac{\\pi}{3}\\right)$ in $[0, \\pi]$.",
      steps: [
        {
          text: "Tangent blows up when its *whole input* is an odd multiple of $\\frac{\\pi}{2}$. Set the bracket equal to that:",
          latex: "2x - \\frac{\\pi}{3} = \\frac{\\pi}{2} + n\\pi",
        },
        {
          text: "Solve for $x$:",
          latex: "2x = \\frac{5\\pi}{6} + n\\pi \\;\\Rightarrow\\; x = \\frac{5\\pi}{12} + \\frac{n\\pi}{2}",
        },
        {
          text: "The asymptotes are spaced $\\frac{\\pi}{2}$ apart, which is the period $\\frac{\\pi}{b}$, as it should be. Try $n = 0, 1, \\ldots$ and keep those in $[0, \\pi]$: $n = 0$ gives $\\frac{5\\pi}{12}$, $n = 1$ gives $\\frac{11\\pi}{12}$, $n = 2$ gives $\\frac{17\\pi}{12} > \\pi$, and $n = -1$ gives a negative value.",
        },
      ],
      answer: "Two asymptotes: $x = \\tfrac{5\\pi}{12}$ and $x = \\tfrac{11\\pi}{12}$.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Cotangent, the mirror image",
      content:
        "$\\cot x = \\frac{\\cos x}{\\sin x}$ swaps the roles: asymptotes where $\\sin x = 0$ (at $x = n\\pi$), zeros where $\\cos x = 0$, also period $\\pi$, and it *falls* across each branch where tangent rises.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "t2-4-q1",
      variant: "concept",
      question: "Where does $y = \\tan x$ have vertical asymptotes?",
      options: [
        { text: "Where $\\cos x = 0$: $x = \\frac{\\pi}{2} + n\\pi$.", correct: true, feedback: "A zero denominator with a nonzero numerator — the definition of the blow-up." },
        { text: "Where $\\sin x = 0$: $x = n\\pi$.", feedback: "Those are its *zeros*: numerator zero, denominator fine." },
        { text: "Where $\\sin x = \\cos x$.", feedback: "There tangent equals 1 — perfectly finite." },
      ],
      hint: "Write tangent as a fraction. What makes a fraction blow up?",
    },
    {
      type: "quiz",
      id: "t2-4-q2",
      variant: "practice",
      question: "What is the period of $y = \\tan(2x)$?",
      options: [
        { text: "$\\dfrac{\\pi}{2}$", correct: true, feedback: "Tangent's base period is $\\pi$, so it becomes $\\frac{\\pi}{b} = \\frac{\\pi}{2}$." },
        { text: "$\\pi$", feedback: "That is the period of plain $\\tan x$; the factor of 2 squeezes it further." },
        { text: "$2\\pi$", feedback: "That is sine and cosine's base period. Tangent repeats twice as often." },
      ],
      hint: "Start from tangent's own period, not sine's, then divide by $b$.",
    },
    {
      type: "quiz",
      id: "t2-4-q3",
      variant: "concept",
      question: "Why is tangent's range all of $\\mathbb{R}$, while sine's is only $[-1,1]$?",
      options: [
        {
          text: "Tangent is a ratio of two coordinates, and the denominator can be arbitrarily small; sine is a single coordinate, capped by the radius.",
          correct: true,
          feedback: "Dividing by something tiny is what produces unbounded output.",
        },
        { text: "Because tangent is not periodic.", feedback: "It is periodic, with period $\\pi$. Periodicity and boundedness are separate properties." },
        { text: "Because tangent is undefined at some points.", feedback: "The undefined points are a symptom of the same cause, not the reason for the range." },
      ],
      hint: "Compare what each function *is*: a single coordinate, or a ratio of two.",
    },
    {
      type: "numeric",
      id: "t2-4-q4",
      variant: "practice",
      question: "How many vertical asymptotes does $y = \\tan 3x$ have in the open interval $(0, \\pi)$?",
      answer: 3,
      hint: "Solve $3x = \\frac{\\pi}{2} + n\\pi$ and count the solutions between 0 and $\\pi$.",
      solution: "$x = \\frac{\\pi}{6} + \\frac{n\\pi}{3}$: that gives $\\frac{\\pi}{6}, \\frac{\\pi}{2}, \\frac{5\\pi}{6}$ inside $(0, \\pi)$, and the next one, $\\frac{7\\pi}{6}$, is outside. Three asymptotes.",
      commonMistakes: [
        { answer: 1, feedback: "That is the count for plain $\\tan x$. Tripling $b$ squeezes three branches into the same space." },
        { answer: 2, feedback: "List them carefully: $\\frac{\\pi}{6}$, $\\frac{3\\pi}{6}$ and $\\frac{5\\pi}{6}$ are all less than $\\pi$." },
      ],
    },
    {
      type: "numeric",
      id: "t2-4-q5",
      variant: "practice",
      question: "What is the period of $y = \\tan\\left(\\dfrac{\\pi x}{4}\\right)$?",
      answer: 4,
      hint: "Start from tangent's own base period (not sine's), and identify $b$.",
      solution: "$\\dfrac{\\pi}{\\pi/4} = 4$.",
      commonMistakes: [
        { answer: 8, feedback: "You used $\\frac{2\\pi}{b}$, sine's formula. Tangent's base period is $\\pi$." },
      ],
    },
    {
      type: "quiz",
      id: "t2-4-q6",
      variant: "concept",
      multiple: true,
      question: "Select every true statement about $y = \\tan x$.",
      options: [
        { text: "It is an odd function.", correct: true, feedback: "Odd over even: $\\frac{\\sin(-x)}{\\cos(-x)} = -\\tan x$." },
        { text: "It is increasing on $\\left(-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right)$.", correct: true, feedback: "The slope of the radius steepens all the way from $-\\infty$ to $+\\infty$ across one branch." },
        { text: "$\\tan(x + \\pi) = \\tan x$ wherever it is defined.", correct: true, feedback: "A half turn keeps the line through the origin, so the slope repeats." },
        { text: "It is bounded.", feedback: "Its range is all real numbers; near each asymptote it grows without limit." },
        { text: "It is increasing on its whole domain.", feedback: "Each branch rises, but $\\tan\\frac{\\pi}{4} = 1 > \\tan\\frac{3\\pi}{4} = -1$: across an asymptote the values jump back down." },
      ],
      hint: "Picture one branch between two asymptotes, then think about how the branches connect (or don't).",
    },
    {
      type: "numeric",
      id: "t2-4-q7",
      variant: "practice",
      question: "How many solutions does $\\tan x = 1$ have in $[-2\\pi, 2\\pi]$?",
      answer: 4,
      hint: "Tangent repeats every $\\pi$, so solutions are spaced $\\pi$ apart from $x = \\frac{\\pi}{4}$.",
      solution: "$x = \\frac{\\pi}{4} + n\\pi$: $-\\frac{7\\pi}{4}, -\\frac{3\\pi}{4}, \\frac{\\pi}{4}, \\frac{5\\pi}{4}$ lie in the interval; $\\frac{9\\pi}{4}$ and $-\\frac{11\\pi}{4}$ do not. Four solutions.",
      commonMistakes: [
        { answer: 2, feedback: "Solutions repeat every $\\pi$, not every $2\\pi$. A length of $4\\pi$ holds four of them." },
        { answer: 8, feedback: "Only one solution per branch of length $\\pi$, since each branch rises through every value exactly once." },
      ],
    },
    {
      type: "quiz",
      id: "t2-4-q8",
      variant: "concept",
      question: "Where does $y = \\cot x$ have vertical asymptotes?",
      options: [
        { text: "At $x = n\\pi$, where $\\sin x = 0$.", correct: true, feedback: "$\\cot x = \\frac{\\cos x}{\\sin x}$, so the denominator vanishes on the x-axis points of the circle." },
        { text: "At $x = \\frac{\\pi}{2} + n\\pi$, like tangent.", feedback: "Those are cotangent's *zeros*: there $\\cos x = 0$ is in the numerator." },
        { text: "Nowhere: cotangent is $\\frac{1}{\\tan x}$, which is always defined.", feedback: "Where $\\tan x = 0$ the reciprocal divides by zero, so cotangent blows up there." },
      ],
      hint: "Write cotangent as a fraction of cosine and sine.",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "modelling-with-waves",
  title: "2.5 · Modelling with Waves",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "Anything that cycles — tides, daylight, a Ferris wheel, an alternating current, a heartbeat — is a candidate for a sinusoid. Modelling means turning a description into $a$, $b$, $c$, $d$.",
    },
    {
      type: "callout",
      variant: "info",
      title: "The four questions, in order",
      content:
        "1. **What are the extremes?** Midline $d = \\frac{\\max + \\min}{2}$, amplitude $a = \\frac{\\max - \\min}{2}$.\n2. **How long is one cycle?** That is the period, and $b = \\frac{2\\pi}{\\text{period}}$.\n3. **Where does it start?** At the midline going up, use $\\sin$; at a maximum, use $\\cos$; anywhere else, use the shift $c$.\n4. **Sanity check one known value.**",
    },
    { type: "heading", text: "The Ferris wheel, modelled" },
    {
      type: "worked-example",
      id: "t2-5-we1",
      title: "Worked example — the Ferris wheel",
      problem:
        "A wheel of radius 20 m has its centre 25 m above the ground and completes a revolution every 4 minutes. You board at the lowest point at $t = 0$. Find your height $h(t)$ in metres.",
      steps: [
        { text: "Extremes: 5 m and 45 m, so $d = 25$ and $a = 20$." },
        { text: "Period 4 minutes, so $b = \\frac{2\\pi}{4} = \\frac{\\pi}{2}$." },
        {
          text: "You start at the *minimum*, which is an upside-down cosine:",
          latex: "h(t) = -20\\cos\\!\\left(\\frac{\\pi}{2}t\\right) + 25",
        },
        {
          text: "Check: at $t = 0$, $h = -20(1) + 25 = 5$ m — the boarding platform. At $t = 2$ (half a revolution), $h = -20(-1) + 25 = 45$ m — the top. The model behaves.",
        },
      ],
      answer: "$h(t) = -20\\cos\\!\\left(\\tfrac{\\pi}{2}t\\right) + 25$, with $t$ in minutes.",
    },
    {
      type: "interactive",
      config: {
        component: "sinusoid-playground",
        fn: "cos",
        initialA: 1,
        initialB: 1,
        initialC: 0,
        initialD: 0,
        window: { xmin: -6.5, xmax: 6.5, ymin: -3.5, ymax: 3.5 },
        target: { a: -2, b: 1.5, c: 0, d: 1 },
        caption:
          "Reverse-engineer this one: read the midline and the extremes off the purple curve first, then its cycle length.",
      },
    },
    { type: "heading", text: "Daylight, tides and units" },
    {
      type: "text",
      content:
        "**Daylight hours.** In a city where daylight runs from 9 h at the winter solstice to 15 h at the summer solstice, on a 365-day cycle: $d = 12$, $a = 3$, $b = \\frac{2\\pi}{365}$, and $c$ is whichever day of the year sits at the midline heading upward (roughly the spring equinox).\n\n**Tides.** Two highs a day makes the period about 12.4 hours; the mean depth is the midline, and half the range is the amplitude.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Units live inside $b$",
      content:
        "If $t$ is measured in minutes, $b$ carries \"radians per minute\". Swapping to hours without changing $b$ is the most common modelling error. Write the period down with its unit before computing $b$.",
    },
    {
      type: "worked-example",
      id: "t2-5-we2",
      title: "Worked example: when is the water deep enough?",
      problem:
        "At a harbour the depth is 9 m at high tide (midnight, $t = 0$) and 3 m at the next low tide, 6 hours later. A boat needs at least 7.5 m of water. Model the depth, and find the first time after midnight when the depth falls to 7.5 m.",
      steps: [
        {
          text: "Midline $d = \\frac{9 + 3}{2} = 6$, amplitude $a = \\frac{9 - 3}{2} = 3$. High to low is half a cycle, so the period is 12 hours and $b = \\frac{2\\pi}{12} = \\frac{\\pi}{6}$. The clock starts at a maximum, so use cosine:",
          latex: "D(t) = 3\\cos\\!\\left(\\frac{\\pi}{6}t\\right) + 6",
        },
        {
          text: "Set the depth equal to 7.5 and isolate the cosine:",
          latex: "3\\cos\\!\\left(\\frac{\\pi}{6}t\\right) + 6 = 7.5 \\;\\Rightarrow\\; \\cos\\!\\left(\\frac{\\pi}{6}t\\right) = \\frac12",
        },
        {
          text: "The first time the cosine falls to $\\frac12$ is when its input reaches $\\frac{\\pi}{3}$:",
          latex: "\\frac{\\pi}{6}t = \\frac{\\pi}{3} \\;\\Rightarrow\\; t = 2",
        },
        {
          text: "Check: $D(2) = 3\\cos\\frac{\\pi}{3} + 6 = 1.5 + 6 = 7.5$. ✓ By symmetry the depth climbs back past 7.5 m at $t = 10$, two hours before the next high tide.",
        },
      ],
      answer: "$D(t) = 3\\cos\\!\\left(\\tfrac{\\pi}{6}t\\right) + 6$; the depth first drops to 7.5 m at 2 am.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "t2-5-q1",
      variant: "practice",
      question:
        "A buoy rises and falls between 1 m and 3 m every 8 seconds, starting at its highest point. Which model fits?",
      options: [
        { text: "$y = \\cos\\!\\left(\\frac{\\pi}{4}t\\right) + 2$", correct: true, feedback: "Amplitude 1, midline 2, period $\\frac{2\\pi}{\\pi/4} = 8$, and cosine starts at a maximum." },
        { text: "$y = 2\\cos\\!\\left(\\frac{\\pi}{4}t\\right) + 1$", feedback: "That swings between $-1$ and 3. Amplitude is half the range, which is 1 here, not 2." },
        { text: "$y = \\sin\\!\\left(\\frac{\\pi}{4}t\\right) + 2$", feedback: "Right shape and period, but sine starts at the midline, not at the peak." },
      ],
      hint: "Run the four questions: extremes, cycle length, starting point.",
    },
    {
      type: "quiz",
      id: "t2-5-q2",
      variant: "practice",
      question:
        "A wheel turns once every 90 seconds. If $t$ is in seconds, what is $b$?",
      options: [
        { text: "$\\dfrac{\\pi}{45}$", correct: true, feedback: "$b = \\frac{2\\pi}{90} = \\frac{\\pi}{45}$ radians per second." },
        { text: "$90$", feedback: "That is the period itself. $b$ is $2\\pi$ divided by it." },
        { text: "$\\dfrac{2\\pi}{1.5}$", feedback: "That converts to minutes while $t$ stays in seconds — the units trap." },
      ],
      hint: "$b = \\frac{2\\pi}{\\text{period}}$, with the period in the same unit as $t$.",
    },
    {
      type: "quiz",
      id: "t2-5-q3",
      variant: "concept",
      question:
        "Two models of the same tide are written, one with sine and one with cosine. Can both be correct?",
      options: [
        {
          text: "Yes — cosine is sine shifted by a quarter period, so a different $c$ makes them identical curves.",
          correct: true,
          feedback: "Which one is 'natural' depends only on where you start the clock.",
        },
        { text: "No — a given situation has exactly one correct model.", feedback: "The curve is unique; the way of writing it is not." },
        { text: "Only if the amplitude is 1.", feedback: "The shift relationship holds at any amplitude." },
      ],
      hint: "Recall lesson 2.2: how are the sine and cosine curves related?",
    },
    {
      type: "numeric",
      id: "t2-5-q4",
      variant: "practice",
      question:
        "Using the Ferris wheel model $h(t) = -20\\cos\\!\\left(\\frac{\\pi}{2}t\\right) + 25$ ($t$ in minutes), how high are you 30 seconds after boarding? Give your answer to 2 decimal places.",
      answer: 10.86,
      tolerance: 0.01,
      unit: "m",
      hint: "Convert 30 seconds into the model's unit before substituting.",
      solution: "$t = 0.5$ min, so $h = -20\\cos\\frac{\\pi}{4} + 25 = 25 - 10\\sqrt2 \\approx 10.86$ m.",
      commonMistakes: [
        { answer: 25, feedback: "That is $t = 1$ minute, a quarter turn. 30 seconds is $t = 0.5$." },
        { answer: 39.14, tolerance: 0.01, feedback: "You dropped the minus sign: you board at the bottom, so the height starts low and rises." },
      ],
    },
    {
      type: "numeric",
      id: "t2-5-q5",
      variant: "practice",
      question:
        "A daylight model is $L(t) = 3\\sin\\!\\left(\\dfrac{2\\pi}{365}(t - 80)\\right) + 12$ hours, with $t$ the day of the year. How many hours of daylight does it predict on day 172? Give your answer to 2 decimal places.",
      answer: 15,
      tolerance: 0.01,
      unit: "hours",
      hint: "Work out the bracket first: what fraction of the year is $172 - 80$ days?",
      solution:
        "$172 - 80 = 92$ days, and $\\frac{2\\pi}{365} \\times 92 \\approx 1.584$ rad, almost exactly $\\frac{\\pi}{2}$ (a quarter year after the equinox: the solstice). $\\sin(1.584) \\approx 1.000$, so $L \\approx 3 + 12 = 15.00$ hours.",
      commonMistakes: [
        { answer: 12, feedback: "That is the midline, the equinox value. Day 172 is a quarter-year later, near the peak." },
        { answer: 12.08, tolerance: 0.01, feedback: "Your calculator is in degree mode. The bracket is in radians." },
      ],
    },
    {
      type: "numeric",
      id: "t2-5-q6",
      variant: "practice",
      question:
        "Mains voltage is modelled as $V(t) = 325\\sin(100\\pi t)$ with $t$ in seconds. How many complete cycles happen each second?",
      answer: 50,
      unit: "cycles per second",
      hint: "Find the period from $b = 100\\pi$, then ask how many periods fit in one second.",
      solution: "Period $= \\dfrac{2\\pi}{100\\pi} = \\dfrac{1}{50}$ s, so there are $50$ cycles per second (50 Hz).",
      commonMistakes: [
        { answer: 100, feedback: "That counts half-cycles. The period is $\\frac{2\\pi}{100\\pi}$, not $\\frac{\\pi}{100\\pi}$." },
        { answer: 0.02, tolerance: 0.001, feedback: "That is the period in seconds. The question asks for cycles per second, its reciprocal." },
      ],
    },
    {
      type: "numeric",
      id: "t2-5-q7",
      variant: "practice",
      question:
        "Using the harbour model $D(t) = 3\\cos\\!\\left(\\frac{\\pi}{6}t\\right) + 6$ from the worked example, for how many hours in each 12-hour cycle is the depth above 7.5 m?",
      answer: 4,
      unit: "hours",
      hint: "You found that the depth drops to 7.5 m at $t = 2$. Use the symmetry of the wave about the high tide at $t = 0$ (and $t = 12$).",
      solution:
        "$D(t) > 7.5$ means $\\cos\\!\\left(\\frac{\\pi}{6}t\\right) > \\frac12$, which holds within $\\frac{\\pi}{3}$ of each peak: from $t = -2$ to $t = 2$ around each high tide. That is a window of 4 hours per cycle (in $[0, 12]$: $[0, 2)$ and $(10, 12]$).",
      commonMistakes: [
        { answer: 2, feedback: "That counts only the time after the high tide. The depth is also above 7.5 m for the 2 hours *before* each high tide." },
        { answer: 8, feedback: "That is the time *below* 7.5 m." },
      ],
    },
    {
      type: "quiz",
      id: "t2-5-q8",
      variant: "concept",
      question:
        "A mass on a spring has height $y = -5\\cos(2t) + 10$ cm. Where is it at $t = 0$?",
      options: [
        { text: "At its lowest point, 5 cm.", correct: true, feedback: "$-5\\cos 0 + 10 = 5$, and the negative $a$ means the wave starts at a minimum." },
        { text: "At its highest point, 15 cm.", feedback: "That would be $+5\\cos(2t) + 10$. The minus sign flips the cosine to start at the bottom." },
        { text: "At the midline, 10 cm, moving up.", feedback: "That is how a *sine* model starts. Cosine starts at an extreme." },
      ],
      hint: "Substitute $t = 0$, and remember what a negative $a$ does to a cosine.",
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "inverse-trig-functions",
  title: "2.6 · Inverse Trig Functions",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "Chapter 0 used $\\sin^{-1}$ casually: ratio in, angle out. Now that you have seen the graph, there is a problem to face. The horizontal line $y = 0.5$ crosses $y = \\sin x$ infinitely often. So \"the angle whose sine is 0.5\" names infinitely many angles, and a function is only allowed to return one.",
    },
    { type: "heading", text: "Restricting the domain" },
    {
      type: "callout",
      variant: "info",
      title: "The fix: restrict the domain",
      content:
        "Chop the sine curve down to a stretch where it rises just once, from $-1$ to 1, and invert only that piece. The conventional choice for sine is $\\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]$ — the right half of the circle, where every value in $[-1,1]$ occurs exactly once.",
    },
    {
      type: "table",
      headers: ["Inverse", "Domain (inputs)", "Range (outputs)", "Which piece of the circle"],
      rows: [
        ["$\\arcsin x$", "$[-1, 1]$", "$\\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]$", "right half — quadrants IV and I"],
        ["$\\arccos x$", "$[-1, 1]$", "$[0, \\pi]$", "top half — quadrants I and II"],
        ["$\\arctan x$", "all reals", "$\\left(-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right)$", "right half, endpoints excluded"],
      ],
    },
    {
      type: "text",
      content:
        "Why do arcsin and arccos get different ranges? Because sine and cosine rise and fall in different places. Sine covers $[-1,1]$ once on $\\left[-\\frac{\\pi}{2},\\frac{\\pi}{2}\\right]$; cosine covers it once on $[0,\\pi]$. The choice in each case is the shortest interval next to zero that does the job.",
    },
    {
      type: "interactive",
      config: {
        component: "family-gallery",
        families: [
          { label: "arcsin x", expr: "asin(x)", latex: "\\arcsin x", excluded: [] },
          { label: "arccos x", expr: "acos(x)", latex: "\\arccos x", excluded: [] },
          { label: "arctan x", expr: "atan(x)", latex: "\\arctan x", excluded: [] },
        ],
        window: { xmin: -4, xmax: 4, ymin: -3, ymax: 3.4 },
      },
    },
    {
      type: "text",
      content:
        "Notice arcsin and arccos simply stop at $x = \\pm 1$: there is no angle whose sine is 2. Arctan, by contrast, accepts every real input and flattens toward $\\pm\\frac{\\pi}{2}$ without ever reaching it — those are horizontal asymptotes, mirroring tangent's vertical ones.",
    },
    { type: "heading", text: "Out and back, back and out" },
    {
      type: "callout",
      variant: "warning",
      title: "The classic trap",
      content:
        "$\\sin(\\arcsin x) = x$ for every $x$ in $[-1,1]$ — going out and back returns where you started.\nBut $\\arcsin(\\sin x) = x$ **only when $x$ is already in $\\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]$.** Otherwise you get the angle in that range with the same sine. For example $\\arcsin(\\sin \\frac{3\\pi}{4}) = \\frac{\\pi}{4}$, not $\\frac{3\\pi}{4}$.",
    },
    {
      type: "text",
      content:
        "This is the same phenomenon Chapter 4 will build on: a calculator hands you one angle, and the equation has many. Knowing *which* one you were handed is what lets you recover the rest.",
    },
    {
      type: "worked-example",
      id: "t2-6-we1",
      title: "Worked example 1: $\\arcsin(\\sin 3)$",
      problem: "Evaluate $\\arcsin(\\sin 3)$, where 3 is in radians.",
      steps: [
        {
          text: "The trap answer is 3. But $3 > \\frac{\\pi}{2} \\approx 1.57$, so 3 is outside arcsin's range and cannot be the output.",
        },
        {
          text: "Find the angle in $\\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]$ with the same sine. Sine is symmetric about $\\frac{\\pi}{2}$ on $[0, \\pi]$, so $\\sin 3 = \\sin(\\pi - 3)$:",
          latex: "\\sin 3 = \\sin(\\pi - 3), \\qquad \\pi - 3 \\approx 0.1416",
        },
        {
          text: "$\\pi - 3$ lies in $\\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]$, so it is the value arcsin returns:",
          latex: "\\arcsin(\\sin 3) = \\pi - 3",
        },
      ],
      answer: "$\\arcsin(\\sin 3) = \\pi - 3 \\approx 0.142$.",
    },
    {
      type: "worked-example",
      id: "t2-6-we2",
      title: "Worked example 2: a trig function of an inverse",
      problem: "Evaluate $\\cos\\left(\\arcsin\\dfrac{3}{5}\\right)$ exactly.",
      steps: [
        {
          text: "Name the inner angle: $\\theta = \\arcsin\\frac35$. So $\\sin\\theta = \\frac35$ and, because arcsin's range is $\\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]$, $\\theta$ is in quadrant I or IV, where cosine is never negative.",
        },
        {
          text: "Use the Pythagorean identity for the size, and the range for the sign:",
          latex: "\\cos\\theta = +\\sqrt{1 - \\tfrac{9}{25}} = \\tfrac{4}{5}",
        },
        {
          text: "Or draw it: a right triangle with opposite 3 and hypotenuse 5 has adjacent side 4.",
        },
      ],
      answer: "$\\cos\\left(\\arcsin\\tfrac35\\right) = \\tfrac45$.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Three relations worth deriving once",
      content:
        "- $\\arcsin(-x) = -\\arcsin x$ and $\\arctan(-x) = -\\arctan x$: their ranges are symmetric about 0.\n- $\\arccos(-x) = \\pi - \\arccos x$: arccos lives on $[0, \\pi]$, so a negative input lands in quadrant II.\n- $\\arcsin x + \\arccos x = \\frac{\\pi}{2}$ for $x$ in $[-1, 1]$: the co-function fact $\\sin\\theta = \\cos(\\frac{\\pi}{2} - \\theta)$, read backwards.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "t2-6-q1",
      variant: "practice",
      question: "What is $\\arccos\\!\\left(-\\dfrac{1}{2}\\right)$?",
      options: [
        { text: "$\\dfrac{2\\pi}{3}$", correct: true, feedback: "Arccos returns values in $[0,\\pi]$; $120^\\circ$ is the one with cosine $-\\frac12$." },
        { text: "$\\dfrac{4\\pi}{3}$", feedback: "Also has cosine $-\\frac12$, but it lies outside arccos's range." },
        { text: "$-\\dfrac{\\pi}{3}$", feedback: "Arccos never returns a negative angle, and $\\cos(-\\frac{\\pi}{3}) = +\\frac12$ anyway." },
      ],
      hint: "Which half of the circle does arccos return angles from? Find the one there with cosine $-\\frac12$.",
    },
    {
      type: "quiz",
      id: "t2-6-q2",
      variant: "concept",
      question: "Evaluate $\\arcsin\\!\\left(\\sin\\dfrac{5\\pi}{6}\\right)$.",
      options: [
        { text: "$\\dfrac{\\pi}{6}$", correct: true, feedback: "$\\sin\\frac{5\\pi}{6} = \\frac12$, and the angle in $\\left[-\\frac{\\pi}{2},\\frac{\\pi}{2}\\right]$ with that sine is $\\frac{\\pi}{6}$." },
        { text: "$\\dfrac{5\\pi}{6}$", feedback: "The trap. $\\frac{5\\pi}{6}$ is outside arcsin's range, so it cannot be the output." },
        { text: "$-\\dfrac{\\pi}{6}$", feedback: "That has sine $-\\frac12$; the sign is wrong." },
      ],
      hint: "Evaluate the inside first, then ask which angle arcsin is allowed to return.",
    },
    {
      type: "quiz",
      id: "t2-6-q3",
      variant: "concept",
      question: "Why does $\\arcsin$ need a restricted domain at all?",
      options: [
        {
          text: "Sine takes each value infinitely often, so without a restriction the inverse would not be a function.",
          correct: true,
          feedback: "A function returns one output; the restriction is what makes that possible.",
        },
        { text: "Because sine is undefined at some angles.", feedback: "Sine is defined everywhere — that is not the obstacle." },
        { text: "Because calculators can only store one value.", feedback: "The restriction is a mathematical requirement, not a hardware limit." },
      ],
      hint: "How many times does the line $y = 0.5$ cross the full sine curve?",
    },
    {
      type: "numeric",
      id: "t2-6-q4",
      variant: "practice",
      question: "Evaluate $\\arcsin(\\sin 2)$ (radians). Give your answer to 3 decimal places.",
      answer: Math.PI - 2,
      tolerance: 0.001,
      unit: "rad",
      hint: "2 is outside $\\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]$. Which angle in that range has the same sine?",
      solution: "$\\sin 2 = \\sin(\\pi - 2)$, and $\\pi - 2 \\approx 1.142$ lies in $\\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]$. So $\\arcsin(\\sin 2) = \\pi - 2 \\approx 1.142$.",
      commonMistakes: [
        { answer: 2, feedback: "The trap: 2 is bigger than $\\frac{\\pi}{2} \\approx 1.571$, so arcsin cannot return it." },
        { answer: 2 - Math.PI, tolerance: 0.001, feedback: "Right size, wrong sign: $\\sin 2 > 0$, so arcsin returns a positive angle." },
      ],
    },
    {
      type: "numeric",
      id: "t2-6-q5",
      variant: "practice",
      question: "Evaluate $\\cos\\left(\\arctan\\dfrac34\\right)$.",
      answer: 0.8,
      tolerance: 0.001,
      hint: "Draw a right triangle whose tangent is $\\frac34$. Is the angle's cosine positive?",
      solution:
        "Let $\\theta = \\arctan\\frac34$, an angle in $\\left(-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right)$ with positive tangent, so it is in quadrant I. Opposite 3, adjacent 4, hypotenuse 5: $\\cos\\theta = \\frac45 = 0.8$.",
      commonMistakes: [
        { answer: 0.6, tolerance: 0.001, feedback: "That is $\\sin\\theta$: opposite over hypotenuse." },
        { answer: 0.75, tolerance: 0.001, feedback: "That is $\\tan\\theta$ itself. The question asks for the cosine of that angle." },
      ],
    },
    {
      type: "numeric",
      id: "t2-6-q6",
      variant: "practice",
      question: "Evaluate $\\arcsin(\\sin 10)$ (radians). Give your answer to 3 decimal places.",
      answer: 3 * Math.PI - 10,
      tolerance: 0.001,
      unit: "rad",
      hint: "First subtract whole turns of $2\\pi$ to bring 10 near the origin, then find the angle in $\\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]$ with the same sine.",
      solution:
        "$10 - 2\\pi \\approx 3.717$, which is in quadrant III (between $\\pi$ and $\\frac{3\\pi}{2}$), so $\\sin 10 < 0$. In quadrant III, $\\sin x = \\sin(\\pi - x)$ still holds: $\\pi - 3.717 \\approx -0.575$, which lies in $\\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]$.\n\nSo $\\arcsin(\\sin 10) = \\pi - (10 - 2\\pi) = 3\\pi - 10 \\approx -0.575$.",
      commonMistakes: [
        { answer: 10 - 3 * Math.PI, tolerance: 0.001, feedback: "Right size, wrong sign. $10 - 2\\pi \\approx 3.72$ is in quadrant III, where sine is negative." },
        { answer: 10 - 2 * Math.PI, tolerance: 0.001, feedback: "$3.717$ is still outside $\\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]$. One more step: use $\\sin x = \\sin(\\pi - x)$." },
      ],
    },
    {
      type: "quiz",
      id: "t2-6-q7",
      variant: "concept",
      multiple: true,
      question: "Select every statement that is true for **all** $x$ in $[-1, 1]$.",
      options: [
        { text: "$\\sin(\\arcsin x) = x$", correct: true, feedback: "Out to an angle and back again always returns the input." },
        { text: "$\\arcsin x + \\arccos x = \\dfrac{\\pi}{2}$", correct: true, feedback: "If $\\sin\\theta = x$ then $\\cos(\\frac{\\pi}{2} - \\theta) = x$, and both angles land in the right ranges." },
        { text: "$\\arcsin(-x) = -\\arcsin x$", correct: true, feedback: "Arcsin's range is symmetric about 0, so it inherits sine's oddness." },
        { text: "$\\arccos(-x) = \\pi - \\arccos x$", correct: true, feedback: "Negating the x-coordinate reflects the point across the y-axis, which turns $\\theta$ into $\\pi - \\theta$ within $[0, \\pi]$." },
        { text: "$\\arccos(-x) = -\\arccos x$", feedback: "Arccos never returns a negative angle, so the left side is $\\ge 0$ while the right side is $\\le 0$. At $x = \\frac12$: $\\frac{2\\pi}{3}$ versus $-\\frac{\\pi}{3}$. The correct relation is $\\pi - \\arccos x$." },
      ],
      hint: "Test doubtful ones at $x = \\frac12$: you know $\\arcsin\\frac12$ and $\\arccos\\frac12$ exactly.",
    },
    {
      type: "numeric",
      id: "t2-6-q8",
      variant: "practice",
      question: "Evaluate $\\tan\\left(\\arccos(-0.6)\\right)$. Enter a fraction or a decimal to 3 decimal places.",
      answer: -4 / 3,
      tolerance: 0.001,
      hint: "$\\arccos(-0.6)$ lies in $[0, \\pi]$ with a negative cosine. Which quadrant is that, and what is its sine?",
      solution:
        "$\\theta = \\arccos(-0.6)$ is in quadrant II, so $\\sin\\theta = +\\sqrt{1 - 0.36} = 0.8$. Then $\\tan\\theta = \\dfrac{0.8}{-0.6} = -\\dfrac43 \\approx -1.333$.",
      commonMistakes: [
        { answer: 4 / 3, tolerance: 0.001, feedback: "Arccos of a negative number is in quadrant II, where tangent is negative." },
        { answer: -0.75, tolerance: 0.001, feedback: "That is $\\frac{\\cos\\theta}{\\sin\\theta}$, the cotangent." },
      ],
    },
    {
      type: "quiz",
      id: "t2-6-q9",
      variant: "concept",
      question: "What is the domain of $f(x) = \\arcsin(2x - 1)$?",
      options: [
        { text: "$[0, 1]$", correct: true, feedback: "The input must satisfy $-1 \\le 2x - 1 \\le 1$, i.e. $0 \\le 2x \\le 2$." },
        { text: "$[-1, 1]$", feedback: "That is where $2x - 1$ may live, not $x$ itself. Solve $-1 \\le 2x - 1 \\le 1$ for $x$." },
        { text: "$\\left[-\\dfrac{\\pi}{2}, \\dfrac{\\pi}{2}\\right]$", feedback: "That is arcsin's *range* (its outputs), not a restriction on its input." },
        { text: "$[-1, 0]$", feedback: "Check $x = 1$: $2(1) - 1 = 1$ is allowed, so 1 is in the domain." },
      ],
      hint: "Whatever arcsin is applied to must lie in $[-1, 1]$.",
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "trig-chapter-2-mastery",
  title: "2.7 · Chapter 2 Mastery",
  position: 7,
  blocks: blocks([
    {
      type: "text",
      content:
        "Graph ↔ formula ↔ situation, in any direction. Most questions travel between two of those three representations.",
    },
    {
      type: "callout",
      variant: "info",
      title: "The chapter in four lines",
      content:
        "1. Plotting a circle coordinate against the angle unwraps it into a wave; the period is $2\\pi$ because the circle closes.\n2. Amplitude, midline, period, zeros and symmetry are all read off the circle.\n3. In $a\\sin(b(x-c)) + d$: period $\\frac{2\\pi}{b}$, and factor before reading $c$.\n4. Tangent has period $\\pi$ and asymptotes where $\\cos x = 0$; inverting anything needs a restricted domain.",
    },
    {
      type: "quiz",
      id: "t2-m-q1",
      variant: "mastery",
      question:
        "A curve has amplitude 3, period $\\pi$, midline $y = -1$, and starts at its midline heading upward at $x = 0$. Which formula fits?",
      options: [
        { text: "$y = 3\\sin(2x) - 1$", correct: true, feedback: "Period $\\pi$ gives $b = \\frac{2\\pi}{\\pi} = 2$; sine starts at the midline going up, so $c = 0$." },
        { text: "$y = 3\\sin\\!\\left(\\frac{x}{2}\\right) - 1$", feedback: "That has period $4\\pi$ — you divided where you should have multiplied." },
        { text: "$y = 3\\cos(2x) - 1$", feedback: "Cosine starts at a maximum, not at the midline." },
      ],
    },
    {
      type: "quiz",
      id: "t2-m-q2",
      variant: "mastery",
      question: "What is the range of $y = -4\\cos(x) + 3$?",
      options: [
        { text: "$[-1, 7]$", correct: true, feedback: "Amplitude 4 about the midline 3 gives $3 \\pm 4$. The minus sign flips the curve but not the range." },
        { text: "$[-4, 4]$", feedback: "That ignores the vertical shift of 3." },
        { text: "$[3, 7]$", feedback: "The wave goes below the midline as well as above." },
      ],
    },
    {
      type: "quiz",
      id: "t2-m-q3",
      variant: "mastery",
      question: "Which is the correct phase shift of $y = \\sin(3x - \\pi)$?",
      options: [
        { text: "$\\dfrac{\\pi}{3}$ to the right", correct: true, feedback: "$\\sin\\left(3\\left(x - \\frac{\\pi}{3}\\right)\\right)$ once factored." },
        { text: "$\\pi$ to the right", feedback: "Unfactored. Divide the constant by $b$." },
        { text: "$3\\pi$ to the right", feedback: "You multiplied by $b$ instead of dividing." },
      ],
    },
    {
      type: "quiz",
      id: "t2-m-q4",
      variant: "mastery",
      question:
        "A tidal depth model $D(t) = 2\\sin\\!\\left(\\frac{\\pi}{6}t\\right) + 7$ has $t$ in hours. How long between successive high tides?",
      options: [
        { text: "12 hours", correct: true, feedback: "Period $= \\frac{2\\pi}{\\pi/6} = 12$, and highs repeat once per period." },
        { text: "6 hours", feedback: "That is the gap between a high and the next *low* — half a period." },
        { text: "2 hours", feedback: "2 is the amplitude, in metres, not a time." },
      ],
    },
    {
      type: "quiz",
      id: "t2-m-q5",
      variant: "mastery",
      question: "Evaluate $\\tan\\!\\left(\\arctan(5)\\right)$ and $\\arctan\\!\\left(\\tan\\frac{3\\pi}{4}\\right)$.",
      options: [
        { text: "$5$ and $-\\dfrac{\\pi}{4}$", correct: true, feedback: "Out-and-back always returns the input; back-and-out lands in arctan's range, and $\\tan\\frac{3\\pi}{4} = -1$." },
        { text: "$5$ and $\\dfrac{3\\pi}{4}$", feedback: "$\\frac{3\\pi}{4}$ is outside $\\left(-\\frac{\\pi}{2},\\frac{\\pi}{2}\\right)$, so arctan cannot return it." },
        { text: "Both are undefined.", feedback: "Arctan accepts every real number, and tangent is fine at $\\frac{3\\pi}{4}$." },
      ],
    },
    {
      type: "numeric",
      id: "t2-m-q7",
      variant: "mastery",
      question: "The period of $y = |\\sin 2x|$ is $k\\pi$. Enter $k$ (a fraction or a decimal).",
      answer: 0.5,
      tolerance: 0.001,
      solution:
        "$\\sin 2x$ has period $\\pi$. The absolute value folds the negative half-wave up onto the positive one, halving the period again: $\\frac{\\pi}{2}$, so $k = \\frac12$.",
      commonMistakes: [
        { answer: 1, feedback: "That is the period of $\\sin 2x$. The absolute value halves it." },
      ],
    },
    {
      type: "quiz",
      id: "t2-m-q8",
      variant: "mastery",
      multiple: true,
      question: "Select every even function.",
      options: [
        { text: "$\\cos 3x$", correct: true, feedback: "$\\cos(-3x) = \\cos 3x$." },
        { text: "$x\\sin x$", correct: true, feedback: "Odd × odd is even." },
        { text: "$|\\sin x|$", correct: true, feedback: "$|\\sin(-x)| = |-\\sin x| = |\\sin x|$." },
        { text: "$\\sin(x^2)$", correct: true, feedback: "The input $x^2$ is already unchanged by $x \\to -x$." },
        { text: "$\\tan x$", feedback: "Tangent is odd: odd over even." },
        { text: "$x + \\cos x$", feedback: "Odd plus even is neither: at $x = \\pi$ it is $\\pi - 1$, at $x = -\\pi$ it is $-\\pi - 1$." },
      ],
    },
    {
      type: "numeric",
      id: "t2-m-q9",
      variant: "mastery",
      question: "Evaluate $\\arccos\\left(\\cos\\dfrac{5\\pi}{3}\\right)$. Give your answer in degrees.",
      answer: 60,
      unit: "degrees",
      solution:
        "$\\cos\\frac{5\\pi}{3} = \\cos 300^\\circ = \\frac12$. Arccos returns the angle in $[0^\\circ, 180^\\circ]$ with cosine $\\frac12$, which is $60^\\circ$.",
      commonMistakes: [
        { answer: 300, feedback: "$300^\\circ$ is outside arccos's range $[0^\\circ, 180^\\circ]$." },
        { answer: -60, feedback: "Arccos never returns a negative angle. $\\cos(-60^\\circ) = \\cos 60^\\circ$, so use $60^\\circ$." },
      ],
    },
    {
      type: "numeric",
      id: "t2-m-q10",
      variant: "mastery",
      question: "Find the minimum value of $y = 4 - 3\\sin(2x - 1)$.",
      answer: 1,
      solution: "$\\sin(2x - 1)$ ranges over $[-1, 1]$, so $y$ ranges over $[4 - 3, 4 + 3] = [1, 7]$. The minimum, 1, happens when $\\sin(2x - 1) = 1$.",
      commonMistakes: [
        { answer: 7, feedback: "That is the maximum, when the sine is $-1$. The minus sign means the biggest sine gives the smallest $y$." },
        { answer: -3, feedback: "Don't forget the vertical shift of 4." },
      ],
    },
    {
      type: "numeric",
      id: "t2-m-q11",
      variant: "mastery",
      question: "How many solutions does $\\sin x = 0.4$ have in $[0, 5\\pi]$?",
      answer: 6,
      solution:
        "$\\sin x = 0.4$ needs the positive half-waves: $(0, \\pi)$, $(2\\pi, 3\\pi)$ and $(4\\pi, 5\\pi)$. Each contains two solutions (one rising, one falling). $3 \\times 2 = 6$.",
      commonMistakes: [
        { answer: 5, feedback: "Count half-waves, not periods: $[0, 5\\pi]$ contains three positive half-waves, each with two crossings." },
        { answer: 4, feedback: "You missed the last positive half-wave, $(4\\pi, 5\\pi)$." },
      ],
    },
    {
      type: "quiz",
      id: "t2-m-q6",
      variant: "mastery",
      question:
        "On $[0, 2\\pi]$, where is $y = \\sin x$ changing fastest?",
      options: [
        { text: "At $x = 0$, $\\pi$ and $2\\pi$ — the zeros.", correct: true, feedback: "At the peaks the curve is momentarily flat; the steepest slopes are at the crossings. Calculus will call this $\\frac{d}{dx}\\sin x = \\cos x$." },
        { text: "At $x = \\frac{\\pi}{2}$ and $\\frac{3\\pi}{2}$ — the peaks.", feedback: "Those are where it is changing *slowest* — the turning points." },
        { text: "It changes at a constant rate throughout.", feedback: "Then the graph would be a zig-zag of straight lines, not a smooth wave." },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "You can now evaluate, graph, transform and model. Chapter 3 goes after the relationships *between* these functions — and does it by derivation, so you never have to carry an identity sheet.",
    },
  ]),
};

export const trigChapter2Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lessonMastery,
];
