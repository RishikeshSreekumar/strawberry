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
      type: "text",
      content:
        "So far $\\sin\\theta$ has been a *lookup*: give me an angle, I give you a number. That is exactly what a function is. So plot it — angle along the horizontal axis, value up the vertical axis — and see what shape the whole collection of values makes.",
    },
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
      type: "text",
      content:
        "The same four moves — stretch, squeeze, shift, lift — are the ones from the transformations lesson of the calculus course, applied to a new base curve. Nothing about them is trigonometry-specific; only the base function changed.",
    },
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
      type: "quiz",
      id: "t2-3-q1",
      variant: "practice",
      question: "What is the period of $y = 3\\sin(4x)$?",
      options: [
        { text: "$\\dfrac{\\pi}{2}$", correct: true, feedback: "$\\frac{2\\pi}{b} = \\frac{2\\pi}{4}$. The amplitude 3 has no effect on the period." },
        { text: "$8\\pi$", feedback: "You multiplied by $b$ instead of dividing. A bigger $b$ means a faster wave." },
        { text: "$6\\pi$", feedback: "That uses the amplitude. Only $b$ controls the period." },
      ],
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
    {
      type: "text",
      content:
        "**Worked example — the Ferris wheel.** A wheel of radius 20 m has its centre 25 m above the ground and completes a revolution every 4 minutes. You board at the lowest point at $t = 0$. Find your height $h(t)$ in metres.\n\nExtremes: 5 m and 45 m, so $d = 25$ and $a = 20$. Period 4 minutes, so $b = \\frac{2\\pi}{4} = \\frac{\\pi}{2}$. You start at the *minimum*, which is an upside-down cosine:",
    },
    { type: "math", latex: "h(t) = -20\\cos\\!\\left(\\frac{\\pi}{2}t\\right) + 25" },
    {
      type: "text",
      content:
        "Check: at $t = 0$, $h = -20(1) + 25 = 5$ m — the boarding platform. At $t = 2$ (half a revolution), $h = -20(-1) + 25 = 45$ m — the top. The model behaves.",
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
      type: "quiz",
      id: "t2-6-q1",
      variant: "practice",
      question: "What is $\\arccos\\!\\left(-\\dfrac{1}{2}\\right)$?",
      options: [
        { text: "$\\dfrac{2\\pi}{3}$", correct: true, feedback: "Arccos returns values in $[0,\\pi]$; $120^\\circ$ is the one with cosine $-\\frac12$." },
        { text: "$\\dfrac{4\\pi}{3}$", feedback: "Also has cosine $-\\frac12$, but it lies outside arccos's range." },
        { text: "$-\\dfrac{\\pi}{3}$", feedback: "Arccos never returns a negative angle, and $\\cos(-\\frac{\\pi}{3}) = +\\frac12$ anyway." },
      ],
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
        "Graph ↔ formula ↔ situation, in any direction. Each question travels between two of those three representations.",
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
