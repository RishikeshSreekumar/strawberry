import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Trigonometry Chapter 1 — The Unit Circle.
 * Picks up the 90° ceiling left by Chapter 0: the ratios become
 * coordinates, and every angle at all gets a sine and a cosine.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "lifting-the-triangle-onto-a-circle",
  title: "1.1 · Lifting the Triangle onto a Circle",
  position: 1,
  blocks: blocks([
    {
      type: "video",
      src: "/videos/trig-1-unit-circle.mp4",
      poster: "/videos/trig-1-unit-circle.jpg",
      title: "Chapter 1 overview video",
      caption:
        "A narrated walk through the whole chapter. Watch it now for the big picture, or come back to it as a recap.",
    },
    {
      type: "text",
      content:
        "Chapter 0 ended with a ceiling. Every angle lived inside a right triangle, so every angle was between 0° and 90°. But a Ferris wheel turns through 200°, a crankshaft passes 360° every revolution, and a pendulum swings to −15°. None of those fit in a right triangle.\n\nThe fix is small and changes everything: stop drawing the triangle on its own, and draw it inside a circle.",
    },
    { type: "heading", text: "The unit circle definition" },
    {
      type: "text",
      content:
        "Put a circle of radius 1 at the origin — the **unit circle**. Start at the point $(1, 0)$ and rotate anticlockwise by $\\theta$. Drop a vertical line from where you land down to the x-axis. You now have a right triangle whose hypotenuse is the radius, so it has length 1.\n\nApply the Chapter 0 definitions to that triangle:",
    },
    {
      type: "math",
      latex:
        "\\cos\\theta = \\frac{\\text{adjacent}}{\\text{hypotenuse}} = \\frac{x}{1} = x, \\qquad \\sin\\theta = \\frac{\\text{opposite}}{\\text{hypotenuse}} = \\frac{y}{1} = y",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The definition the rest of the course runs on",
      content:
        "On the unit circle, the point reached by rotating through $\\theta$ has coordinates $(\\cos\\theta,\\ \\sin\\theta)$. Cosine is the horizontal coordinate; sine is the vertical one.",
    },
    {
      type: "text",
      content:
        "Nothing was overturned. For an acute angle this is exactly the Chapter 0 ratio, because dividing by a hypotenuse of 1 changes nothing. What has changed is that the *definition no longer mentions a triangle* — it mentions a rotation and a coordinate. And a rotation can be anything at all.",
    },
    {
      type: "interactive",
      config: {
        component: "unit-circle",
        initialAngle: 40,
        minAngle: 0,
        maxAngle: 90,
        step: 1,
        showTriangle: true,
        showCoordinates: true,
        showRadians: false,
        caption:
          "Still Chapter 0 territory: 0° to 90°. Check a value you derived by hand — at 30°, the y-coordinate reads 0.5, exactly $\\sin 30^\\circ$.",
      },
    },
    { type: "heading", text: "What the circle gives for free" },
    {
      type: "text",
      content:
        "Two facts come free from the picture, which took work to state before:\n\n**At 0°** you are at $(1, 0)$, so $\\cos 0^\\circ = 1$ and $\\sin 0^\\circ = 0$.\n**At 90°** you are at $(0, 1)$, so $\\cos 90^\\circ = 0$ and $\\sin 90^\\circ = 1$.\n\nAs a triangle, 0° and 90° were degenerate — a triangle with no thickness. As points on a circle they are ordinary.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Why sine and cosine are capped at 1",
      content:
        "The point sits on a circle of radius 1, so neither coordinate can exceed 1 in size. The Chapter 0 argument (\"the hypotenuse is the longest side\") and this one are the same argument seen from two angles.",
    },
    { type: "heading", text: "Circles of any radius" },
    {
      type: "text",
      content:
        "Real circles are rarely of radius 1. Scale the unit circle by $r$ and every point scales with it, so the point at angle $\\theta$ on a circle of radius $r$ centred at the origin is $(r\\cos\\theta,\\ r\\sin\\theta)$. Read the other way: $\\cos\\theta = \\frac{x}{r}$ and $\\sin\\theta = \\frac{y}{r}$, which is the Chapter 0 ratio again.",
    },
    {
      type: "worked-example",
      id: "t1-1-we1",
      title: "Worked example 1: reading ratios off a bigger circle",
      problem:
        "The point $(5, 12)$ lies on a circle centred at the origin, at angle $\\theta$ from the positive x-axis. Find $\\sin\\theta$, $\\cos\\theta$ and $\\tan\\theta$.",
      steps: [
        {
          text: "The radius is the distance from the origin:",
          latex: "r = \\sqrt{5^2 + 12^2} = \\sqrt{169} = 13",
        },
        {
          text: "Divide each coordinate by the radius to land on the unit circle:",
          latex: "\\cos\\theta = \\frac{5}{13}, \\qquad \\sin\\theta = \\frac{12}{13}",
        },
        {
          text: "Tangent is the ratio of the coordinates, and the radius cancels:",
          latex: "\\tan\\theta = \\frac{12}{5}",
        },
      ],
      answer: "$\\sin\\theta = \\tfrac{12}{13}$, $\\cos\\theta = \\tfrac{5}{13}$, $\\tan\\theta = \\tfrac{12}{5}$.",
    },
    {
      type: "worked-example",
      id: "t1-1-we2",
      title: "Worked example 2: the Ferris wheel seat",
      problem:
        "A Ferris wheel has radius 20 m and its centre is 25 m above the ground. A seat starts level with the centre, on the right (the 3 o'clock position), and the wheel turns anticlockwise through $50^\\circ$. How high is the seat now?",
      steps: [
        {
          text: "Put the origin at the centre of the wheel. The seat is a point on a circle of radius 20 at angle $50^\\circ$, so its height above the centre is the $y$-coordinate:",
          latex: "y = 20\\sin 50^\\circ \\approx 20 \\times 0.766 = 15.32 \\text{ m}",
        },
        {
          text: "Add the height of the centre above the ground:",
          latex: "h = 25 + 15.32 = 40.32 \\text{ m}",
        },
      ],
      answer: "The seat is about 40.32 m above the ground.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "t1-1-q1",
      variant: "concept",
      question:
        "On the unit circle, the point for angle $\\theta$ is $(0.28, 0.96)$. What is $\\sin\\theta$?",
      options: [
        { text: "$0.96$", correct: true, feedback: "Sine is the y-coordinate — the height above the axis." },
        { text: "$0.28$", feedback: "That is $\\cos\\theta$, the horizontal coordinate." },
        { text: "$0.96 / 0.28$", feedback: "That is $\\tan\\theta$. Dividing is only needed when the radius is not 1 — here it is." },
      ],
      hint: "Which coordinate measures height above the x-axis?",
    },
    {
      type: "quiz",
      id: "t1-1-q2",
      variant: "concept",
      question:
        "A circle of radius 5 is used instead of the unit circle, and the point at angle $\\theta$ is $(3, 4)$. What is $\\cos\\theta$?",
      options: [
        { text: "$\\dfrac{3}{5}$", correct: true, feedback: "Back to the ratio: adjacent over hypotenuse, i.e. $x/r$. Radius 1 is what lets you skip the division." },
        { text: "$3$", feedback: "Cosine cannot exceed 1. On a non-unit circle you must divide by the radius." },
        { text: "$\\dfrac{4}{5}$", feedback: "That is $\\sin\\theta = y/r$." },
      ],
      hint: "Why is the unit circle convenient? Undo that convenience.",
    },
    {
      type: "numeric",
      id: "t1-1-q3",
      variant: "practice",
      question:
        "The point at angle $\\theta$ on the unit circle is in the first quadrant and has y-coordinate $0.6$. What is $\\cos\\theta$?",
      answer: 0.8,
      tolerance: 0.001,
      hint: "The point lies on $x^2 + y^2 = 1$. Which coordinate is cosine?",
      solution: "$x^2 = 1 - 0.6^2 = 0.64$, and $x > 0$ in the first quadrant, so $\\cos\\theta = x = 0.8$.",
      commonMistakes: [
        { answer: 0.4, feedback: "You computed $1 - 0.6$. The point is on a circle, so the *squares* add to 1." },
        { answer: 0.6, feedback: "That is $\\sin\\theta$, the y-coordinate you were given." },
      ],
    },
    {
      type: "numeric",
      id: "t1-1-q4",
      variant: "practice",
      question:
        "A Ferris wheel has radius 15 m and its centre is 18 m above the ground. A seat starts at the 3 o'clock position and the wheel turns anticlockwise through $35^\\circ$. How high is the seat above the ground? Give your answer to 2 decimal places.",
      answer: 26.604,
      tolerance: 0.01,
      unit: "m",
      hint: "Measure from the centre first: the seat's height above the centre is the y-coordinate on a circle of radius 15.",
      solution:
        "Height above the centre $= 15\\sin 35^\\circ \\approx 15 \\times 0.5736 = 8.60$ m. Height above the ground $= 18 + 8.60 = 26.60$ m.",
      commonMistakes: [
        { answer: 8.6, tolerance: 0.01, feedback: "That is the height above the *centre* of the wheel. Add the 18 m to the ground." },
        { answer: 30.29, tolerance: 0.01, feedback: "You used $15\\cos 35^\\circ$, which is the horizontal distance from the centre, not the height." },
      ],
    },
    {
      type: "quiz",
      id: "t1-1-q5",
      variant: "concept",
      multiple: true,
      question:
        "Select every point that could be $(\\cos\\theta, \\sin\\theta)$ for some angle $\\theta$.",
      options: [
        { text: "$(0.6,\\ 0.8)$", correct: true, feedback: "$0.36 + 0.64 = 1$, so it is on the unit circle." },
        { text: "$\\left(\\tfrac12,\\ \\tfrac{\\sqrt3}{2}\\right)$", correct: true, feedback: "$\\tfrac14 + \\tfrac34 = 1$. This is the $60^\\circ$ point." },
        { text: "$\\left(\\tfrac{\\sqrt2}{2},\\ \\tfrac{\\sqrt2}{2}\\right)$", correct: true, feedback: "$\\tfrac12 + \\tfrac12 = 1$. This is the $45^\\circ$ point." },
        { text: "$(0.5,\\ 0.5)$", feedback: "$0.25 + 0.25 = 0.5$: the point is inside the circle. Equal coordinates on the circle need $\\tfrac{\\sqrt2}{2} \\approx 0.707$ each." },
        { text: "$(1,\\ 1)$", feedback: "Each coordinate is allowed to be 1, but not at the same time: $1 + 1 = 2$, so the point is outside the circle." },
      ],
      hint: "A point of the form $(\\cos\\theta, \\sin\\theta)$ is on the unit circle. Test $x^2 + y^2$.",
    },
    {
      type: "numeric",
      id: "t1-1-q6",
      variant: "practice",
      question:
        "The point at angle $\\theta$ on the unit circle is in the first quadrant, and its x-coordinate is twice its y-coordinate. Find $\\sin\\theta$ to 3 decimal places.",
      answer: 0.447,
      tolerance: 0.001,
      hint: "Write the point as $(2y, y)$ and put it on the circle.",
      solution:
        "$(2y)^2 + y^2 = 1$ gives $5y^2 = 1$, so $y = \\dfrac{1}{\\sqrt5} \\approx 0.447$ (positive in the first quadrant). Then $\\sin\\theta = y \\approx 0.447$.",
      commonMistakes: [
        { answer: 0.894, tolerance: 0.001, feedback: "That is the x-coordinate, $\\cos\\theta = \\tfrac{2}{\\sqrt5}$. Sine is the smaller, vertical one." },
        { answer: 0.333, tolerance: 0.001, feedback: "You solved $2y + y = 1$. The point is on a circle, so the *squares* add to 1." },
      ],
    },
    {
      type: "quiz",
      id: "t1-1-q7",
      variant: "concept",
      question: "As $\\theta$ increases from $0^\\circ$ to $90^\\circ$, what happens to the point $(\\cos\\theta, \\sin\\theta)$?",
      options: [
        {
          text: "$\\cos\\theta$ falls from 1 to 0 while $\\sin\\theta$ rises from 0 to 1.",
          correct: true,
          feedback: "The point slides from $(1, 0)$ up to $(0, 1)$: it moves left and up.",
        },
        {
          text: "Both coordinates rise from 0 to 1.",
          feedback: "The start is $(1, 0)$, not $(0, 0)$. The origin is the centre, not a point on the circle.",
        },
        {
          text: "$\\cos\\theta$ rises from 0 to 1 while $\\sin\\theta$ falls from 1 to 0.",
          feedback: "That is the motion from $90^\\circ$ back down to $0^\\circ$. At $0^\\circ$ the point is $(1, 0)$, so cosine starts at 1.",
        },
      ],
      hint: "Where is the point at $0^\\circ$, and where is it at $90^\\circ$?",
    },
    {
      type: "numeric",
      id: "t1-1-q8",
      variant: "practice",
      question:
        "Two seats on a wheel of radius 10 m are $120^\\circ$ apart (measured at the centre). What is the straight-line distance between them? Give your answer to 2 decimal places.",
      answer: 10 * Math.sqrt(3),
      tolerance: 0.01,
      unit: "m",
      hint: "Put the centre at the origin and one seat at angle $0^\\circ$. Write both seats as $(r\\cos\\theta, r\\sin\\theta)$, then use the distance formula.",
      solution:
        "The seats are at $(10, 0)$ and $(10\\cos 120^\\circ, 10\\sin 120^\\circ) = (-5, 5\\sqrt3)$. The distance is $\\sqrt{(10 + 5)^2 + (5\\sqrt3)^2} = \\sqrt{225 + 75} = \\sqrt{300} = 10\\sqrt3 \\approx 17.32$ m.",
      commonMistakes: [
        { answer: 20.94, tolerance: 0.01, feedback: "That is the *arc* length around the rim, $10 \\times \\frac{2\\pi}{3}$. The question asks for the straight-line chord." },
        { answer: 10, feedback: "That would be true for seats $60^\\circ$ apart (an equilateral triangle with the centre). At $120^\\circ$ the chord is longer." },
        { answer: 20, feedback: "That is the diameter, for seats $180^\\circ$ apart." },
      ],
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "angles-beyond-the-triangle",
  title: "1.2 · Angles Beyond the Triangle",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "Now cash in the new definition. Rotating by 150° puts the point in the second quadrant — no right triangle contains a 150° angle, but the rotation is perfectly ordinary, and the point has coordinates like any other. So $\\cos 150^\\circ$ and $\\sin 150^\\circ$ exist.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "The misconception to kill now",
      content:
        "\"Sine only makes sense for acute angles.\" It was *first defined* for acute angles, in a triangle. Once the definition moved to the circle, every angle got a sine — including 150°, 400°, and −30°.",
    },
    { type: "heading", text: "Three conventions for rotation" },
    {
      type: "text",
      content:
        "Three conventions make the extension unambiguous:\n\n**Start at the positive x-axis.** That is 0°.\n**Anticlockwise is positive**, clockwise is negative. A −90° rotation lands at $(0,-1)$.\n**Nothing stops at 360°.** Keep turning and you pass points you have already visited.",
    },
    {
      type: "interactive",
      config: {
        component: "unit-circle",
        initialAngle: 150,
        minAngle: -360,
        maxAngle: 720,
        step: 5,
        showTriangle: true,
        showCoordinates: true,
        showRadians: true,
        caption:
          "Drag well past 360° and watch the coordinates repeat exactly. Then go negative and watch the point mirror across the x-axis.",
      },
    },
    { type: "heading", text: "Coterminal angles" },
    {
      type: "callout",
      variant: "definition",
      title: "Coterminal angles",
      content:
        "Two angles are **coterminal** when their rotations end at the same point — they differ by a whole number of full turns. Since a full turn is 360° (or $2\\pi$), the angles coterminal with $\\theta$ are $\\theta + 360^\\circ n$ for any integer $n$. Coterminal angles have identical sine, cosine and tangent, because they *are* the same point.",
    },
    {
      type: "text",
      content:
        "So $\\sin 400^\\circ = \\sin 40^\\circ$ — 400° is one full turn plus 40°, and the extra turn changed nothing. Likewise $\\cos(-30^\\circ) = \\cos 330^\\circ$.",
    },
    {
      type: "worked-example",
      id: "t1-2-we1",
      title: "Worked example 1: reducing a large angle",
      problem: "Reduce $1110^\\circ$ to the coterminal angle in $[0^\\circ, 360^\\circ)$.",
      steps: [
        {
          text: "To reduce an angle, subtract or add 360° until you land in $[0^\\circ, 360^\\circ)$. Here $1110 \\div 360$ is a little over 3, so remove three full turns:",
          latex: "1110^\\circ - 3(360^\\circ) = 1110^\\circ - 1080^\\circ = 30^\\circ",
        },
      ],
      answer: "$1110^\\circ$ is coterminal with $30^\\circ$, so every trig function has the same value at both.",
      tryFirst: false,
    },
    { type: "heading", text: "Negative angles mirror across the x-axis" },
    {
      type: "text",
      content:
        "Going negative produces a symmetry worth naming now, since Chapter 3 leans on it. Rotating by $-\\theta$ lands at the mirror image of the $\\theta$ point across the x-axis: same $x$, opposite $y$.",
    },
    {
      type: "math",
      latex: "\\cos(-\\theta) = \\cos\\theta, \\qquad \\sin(-\\theta) = -\\sin\\theta",
    },
    {
      type: "worked-example",
      id: "t1-2-we2",
      title: "Worked example 2: a negative angle past a full turn",
      problem: "Evaluate $\\sin(-750^\\circ)$ exactly.",
      steps: [
        {
          text: "Use the mirror first to get rid of the minus sign: sine flips sign when the angle does.",
          latex: "\\sin(-750^\\circ) = -\\sin 750^\\circ",
        },
        {
          text: "Reduce $750^\\circ$ by whole turns:",
          latex: "750^\\circ - 2(360^\\circ) = 30^\\circ \\;\\Rightarrow\\; \\sin 750^\\circ = \\sin 30^\\circ = \\tfrac12",
        },
        {
          text: "Put the sign back. Check another way: $-750^\\circ + 720^\\circ = -30^\\circ$, a small clockwise turn that lands just below the x-axis, so the sine should be negative.",
          latex: "\\sin(-750^\\circ) = -\\tfrac12",
        },
      ],
      answer: "$\\sin(-750^\\circ) = -\\tfrac12$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "t1-2-q1",
      variant: "practice",
      question: "Which angle is coterminal with $-100^\\circ$?",
      options: [
        { text: "$260^\\circ$", correct: true, feedback: "$-100 + 360 = 260$. Same terminal point, third quadrant." },
        { text: "$100^\\circ$", feedback: "That is the reflection, not the same point. $100^\\circ$ is in quadrant II; $-100^\\circ$ is in quadrant III." },
        { text: "$-260^\\circ$", feedback: "$-260$ and $-100$ differ by 160°, not a whole turn." },
      ],
      hint: "Coterminal angles differ by a whole number of full turns. Add one turn.",
    },
    {
      type: "quiz",
      id: "t1-2-q2",
      variant: "concept",
      question: "Why is $\\sin 750^\\circ = \\sin 30^\\circ$?",
      options: [
        {
          text: "$750^\\circ$ is two full turns plus $30^\\circ$, so both rotations end at the same point.",
          correct: true,
          feedback: "$750 - 720 = 30$. Sine reads a coordinate, and the coordinate is the same.",
        },
        { text: "Because $750$ and $30$ both end in a zero.", feedback: "Coincidence. Test it on $760^\\circ$, which reduces to $40^\\circ$, not $60^\\circ$." },
        { text: "Because sine repeats every $180^\\circ$.", feedback: "That is tangent's period. Sine repeats every $360^\\circ$; $\\sin 210^\\circ = -\\frac12$, not $+\\frac12$." },
      ],
      hint: "How many full turns fit inside $750^\\circ$, and what is left over?",
    },
    {
      type: "quiz",
      id: "t1-2-q3",
      variant: "concept",
      question: "A wheel turns clockwise through a quarter turn from the start position. What are the coordinates of the marked point?",
      options: [
        { text: "$(0, -1)$", correct: true, feedback: "Clockwise is negative, so this is $-90^\\circ$: $\\cos(-90^\\circ) = 0$, $\\sin(-90^\\circ) = -1$." },
        { text: "$(0, 1)$", feedback: "That is $+90^\\circ$, an anticlockwise quarter turn." },
        { text: "$(-1, 0)$", feedback: "That is a half turn, $180^\\circ$." },
      ],
      hint: "The start position is $(1, 0)$. Which way does clockwise move a point at 3 o'clock?",
    },
    {
      type: "numeric",
      id: "t1-2-q4",
      variant: "practice",
      question: "Find the angle in $[0^\\circ, 360^\\circ)$ that is coterminal with $-1000^\\circ$.",
      answer: 80,
      unit: "degrees",
      hint: "Keep adding $360^\\circ$ until the angle is no longer negative.",
      solution: "$-1000^\\circ + 3(360^\\circ) = -1000^\\circ + 1080^\\circ = 80^\\circ$.",
      commonMistakes: [
        { answer: 280, feedback: "That is coterminal with $+1000^\\circ$ ($1000 - 720$). The minus sign matters: you must *add* turns to $-1000^\\circ$." },
        { answer: -280, feedback: "Still negative. One more full turn: $-280^\\circ + 360^\\circ$." },
      ],
    },
    {
      type: "numeric",
      id: "t1-2-q5",
      variant: "practice",
      question:
        "Find the angle in $[0, 2\\pi)$ coterminal with $\\dfrac{29\\pi}{6}$. Give your answer in degrees.",
      answer: 150,
      unit: "degrees",
      hint: "A full turn is $2\\pi = \\frac{12\\pi}{6}$. Remove as many as you can.",
      solution:
        "$\\dfrac{29\\pi}{6} - 2(2\\pi) = \\dfrac{29\\pi - 24\\pi}{6} = \\dfrac{5\\pi}{6}$, which is $150^\\circ$.",
      commonMistakes: [
        { answer: 510, feedback: "That is $\\frac{17\\pi}{6}$: you removed only one full turn. It is still past $360^\\circ$, so remove another." },
        { answer: 870, feedback: "That is $\\frac{29\\pi}{6}$ converted to degrees but not reduced. Subtract $720^\\circ$." },
      ],
    },
    {
      type: "quiz",
      id: "t1-2-q6",
      variant: "practice",
      multiple: true,
      question: "Select every expression equal to $\\sin 40^\\circ$.",
      options: [
        { text: "$\\sin 400^\\circ$", correct: true, feedback: "$400^\\circ - 360^\\circ = 40^\\circ$: the same point." },
        { text: "$\\sin(-320^\\circ)$", correct: true, feedback: "$-320^\\circ + 360^\\circ = 40^\\circ$: a clockwise turn that ends at the same point." },
        { text: "$\\sin 760^\\circ$", correct: true, feedback: "$760^\\circ - 720^\\circ = 40^\\circ$." },
        { text: "$\\sin(-40^\\circ)$", feedback: "Negating the angle mirrors the point across the x-axis: $\\sin(-40^\\circ) = -\\sin 40^\\circ$." },
        { text: "$\\sin 320^\\circ$", feedback: "$320^\\circ$ is coterminal with $-40^\\circ$, not $40^\\circ$, so its sine is $-\\sin 40^\\circ$." },
      ],
      hint: "Reduce each angle by whole turns. Watch the sign of the negative ones.",
    },
    {
      type: "numeric",
      id: "t1-2-q7",
      variant: "practice",
      question: "Evaluate $\\cos(-1050^\\circ)$ to 3 decimal places.",
      answer: 0.866,
      tolerance: 0.001,
      hint: "Cosine ignores the sign of the angle. Then reduce by whole turns.",
      solution:
        "$\\cos(-1050^\\circ) = \\cos 1050^\\circ$, and $1050^\\circ - 720^\\circ = 330^\\circ$, which is coterminal with $-30^\\circ$. So the value is $\\cos(-30^\\circ) = \\cos 30^\\circ = \\tfrac{\\sqrt3}{2} \\approx 0.866$.",
      commonMistakes: [
        { answer: -0.866, tolerance: 0.001, feedback: "Cosine does not flip sign when the angle does: $\\cos(-\\theta) = \\cos\\theta$." },
        { answer: 0.5, tolerance: 0.001, feedback: "That is the sine size for a $30^\\circ$ reference. The question asks for cosine." },
      ],
    },
    {
      type: "quiz",
      id: "t1-2-q8",
      variant: "concept",
      question: "Using $\\cos(-\\theta) = \\cos\\theta$ and $\\sin(-\\theta) = -\\sin\\theta$, what is $\\tan(-\\theta)$?",
      options: [
        { text: "$-\\tan\\theta$", correct: true, feedback: "$\\dfrac{\\sin(-\\theta)}{\\cos(-\\theta)} = \\dfrac{-\\sin\\theta}{\\cos\\theta} = -\\tan\\theta$." },
        { text: "$\\tan\\theta$", feedback: "Only one of the two parts flips sign, so the quotient flips." },
        { text: "$\\dfrac{1}{\\tan\\theta}$", feedback: "A reflection does not swap sine and cosine; it only changes the sign of the y-coordinate." },
      ],
      hint: "Write tangent as sine over cosine and apply each mirror rule.",
    },
    {
      type: "numeric",
      id: "t1-2-q9",
      variant: "practice",
      question: "How many angles in the interval $[-720^\\circ, 720^\\circ]$ are coterminal with $45^\\circ$ (including $45^\\circ$ itself)?",
      answer: 4,
      hint: "List $45^\\circ + 360^\\circ n$ for $n = \\ldots, -2, -1, 0, 1, 2, \\ldots$ and keep the ones inside the interval.",
      solution:
        "The candidates are $45^\\circ + 360^\\circ n$: $-675^\\circ, -315^\\circ, 45^\\circ, 405^\\circ$ lie in the interval, while $765^\\circ$ and $-1035^\\circ$ do not. That is 4 angles.",
      commonMistakes: [
        { answer: 5, feedback: "Check the ends: $45^\\circ + 720^\\circ = 765^\\circ$ is past $720^\\circ$." },
        { answer: 3, feedback: "Don't forget the negative ones: $-315^\\circ$ *and* $-675^\\circ$ both qualify." },
      ],
    },
    {
      type: "numeric",
      id: "t1-2-q10",
      variant: "practice",
      question: "How many integers $n$ in $[-1000, 1000]$ make $75n^\\circ$ coterminal with $0^\\circ$?",
      answer: 83,
      hint: "Coterminal with $0^\\circ$ means a whole number of full turns. When is $75n$ a multiple of 360? Cancel the common factor first.",
      solution:
        "$75n = 360k$ means $\\frac{75n}{360} = \\frac{5n}{24}$ is an integer. Since 5 and 24 share no factor, $n$ must be a multiple of 24.\n\nMultiples of 24 in $[-1000, 1000]$: from $-984 = -41 \\times 24$ to $984 = 41 \\times 24$, which is $41 + 41 + 1 = 83$ integers (counting $n = 0$).",
      commonMistakes: [
        { answer: 82, feedback: "Don't forget $n = 0$: $0^\\circ$ is coterminal with itself." },
        { answer: 41, feedback: "That counts only the positive multiples of 24. The interval includes negative $n$ and $0$ too." },
        { answer: 167, feedback: "You required $n$ to be a multiple of 12. Cancel fully: $\\frac{75}{360} = \\frac{5}{24}$, so $n$ must be a multiple of 24." },
      ],
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "signs-and-reference-angles",
  title: "1.3 · Signs and Reference Angles",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "This is the lesson that replaces the memorized unit-circle chart. The claim: **every angle reduces to a first-quadrant angle plus a sign.** Two questions, asked in order, produce any value you need.",
    },
    {
      type: "callout",
      variant: "info",
      title: "The two-question method",
      content:
        "1. **How far from the x-axis?** That acute angle is the *reference angle*, and it gives the size of the value.\n2. **Which quadrant?** The quadrant gives the sign, because it says whether $x$ and $y$ are positive or negative.",
    },
    { type: "heading", text: "Signs come from the quadrant" },
    {
      type: "text",
      content:
        "The signs are not a table to learn — they are just which half of the plane you are in. In quadrant II, $x < 0$ and $y > 0$; since $\\cos = x$ and $\\sin = y$, cosine is negative there and sine is positive. That is the entire derivation:",
    },
    {
      type: "table",
      headers: ["Quadrant", "$x = \\cos$", "$y = \\sin$", "$\\tan = y/x$"],
      rows: [
        ["I ($0^\\circ$–$90^\\circ$)", "$+$", "$+$", "$+$"],
        ["II ($90^\\circ$–$180^\\circ$)", "$-$", "$+$", "$-$"],
        ["III ($180^\\circ$–$270^\\circ$)", "$-$", "$-$", "$+$"],
        ["IV ($270^\\circ$–$360^\\circ$)", "$+$", "$-$", "$-$"],
      ],
    },
    { type: "heading", text: "Size comes from the reference angle" },
    {
      type: "callout",
      variant: "definition",
      title: "Reference angle",
      content:
        "The **reference angle** of $\\theta$ is the acute angle between its terminal side and the x-axis (never the y-axis). For $\\theta$ in $[0^\\circ, 360^\\circ)$:\nQ I: $\\theta$  ·  Q II: $180^\\circ - \\theta$  ·  Q III: $\\theta - 180^\\circ$  ·  Q IV: $360^\\circ - \\theta$.",
    },
    {
      type: "worked-example",
      id: "t1-3-we1",
      title: "Worked example 1: $\\cos 210^\\circ$",
      problem: "Evaluate $\\cos 210^\\circ$ exactly.",
      steps: [
        { text: "Step 1 — quadrant III, so $x$ is negative: the answer is negative." },
        { text: "Step 2 — reference angle is $210^\\circ - 180^\\circ = 30^\\circ$." },
        {
          text: "Step 3 — the size is $\\cos 30^\\circ = \\frac{\\sqrt3}{2}$, which you re-derive from the half-equilateral triangle if needed.",
          latex: "\\cos 210^\\circ = -\\frac{\\sqrt{3}}{2}",
        },
      ],
      answer: "$\\cos 210^\\circ = -\\tfrac{\\sqrt3}{2}$.",
      tryFirst: false,
    },
    {
      type: "interactive",
      config: {
        component: "unit-circle",
        initialAngle: 210,
        minAngle: 0,
        maxAngle: 360,
        step: 5,
        showTriangle: true,
        showCoordinates: true,
        showReferenceAngle: true,
        showRadians: true,
        caption:
          "The purple arc is the reference angle. Sweep the slider and notice the readouts change sign exactly when the point crosses an axis — never anywhere else.",
      },
    },
    { type: "heading", text: "The two-question method in action" },
    {
      type: "worked-example",
      id: "t1-3-we2",
      title: "Worked example 2: $\\sin 315^\\circ$",
      problem: "Try a second one without looking: evaluate $\\sin 315^\\circ$.",
      steps: [
        { text: "Quadrant IV means $y < 0$, so negative." },
        {
          text: "Reference angle $360^\\circ - 315^\\circ = 45^\\circ$, whose sine is $\\frac{\\sqrt2}{2}$. Therefore:",
          latex: "\\sin 315^\\circ = -\\frac{\\sqrt{2}}{2}",
        },
      ],
      answer: "$\\sin 315^\\circ = -\\tfrac{\\sqrt2}{2}$.",
    },
    {
      type: "text",
      content: "That is the whole method, and it works for every angle in the course.",
    },
    {
      type: "worked-example",
      id: "t1-3-we3",
      title: "Worked example 3: a negative angle beyond a full turn",
      problem: "Evaluate $\\tan(-480^\\circ)$ exactly.",
      steps: [
        {
          text: "First bring the angle into $[0^\\circ, 360^\\circ)$ by adding whole turns:",
          latex: "-480^\\circ + 2(360^\\circ) = 240^\\circ",
        },
        {
          text: "Quadrant question: $240^\\circ$ is in quadrant III, where $x < 0$ and $y < 0$, so $\\tan = y/x$ is positive.",
        },
        {
          text: "Size question: the reference angle is $240^\\circ - 180^\\circ = 60^\\circ$, and $\\tan 60^\\circ = \\sqrt3$.",
          latex: "\\tan(-480^\\circ) = \\tan 240^\\circ = +\\sqrt{3}",
        },
        {
          text: "Cross-check with $\\tan(-\\theta) = -\\tan\\theta$: $-\\tan 480^\\circ = -\\tan 120^\\circ = -(-\\sqrt3) = \\sqrt3$. The two routes agree.",
        },
      ],
      answer: "$\\tan(-480^\\circ) = \\sqrt3$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "The two classic errors",
      content:
        "**Measuring to the y-axis.** The reference angle is always to the *horizontal* axis. For $120^\\circ$ it is $60^\\circ$, not $30^\\circ$.\n**Getting the size right and the sign wrong.** Do the quadrant check first, before the arithmetic, and write the sign down before you compute anything.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "t1-3-q1",
      variant: "practice",
      question: "What is the reference angle for $200^\\circ$?",
      options: [
        { text: "$20^\\circ$", correct: true, feedback: "Quadrant III: $200^\\circ - 180^\\circ = 20^\\circ$." },
        { text: "$160^\\circ$", feedback: "You used $180^\\circ - \\theta$, the quadrant II rule. Also, a reference angle must be acute." },
        { text: "$70^\\circ$", feedback: "That is the angle to the y-axis. Reference angles are measured to the x-axis." },
      ],
      hint: "Which quadrant is $200^\\circ$ in? Measure the gap to the nearest half of the x-axis.",
    },
    {
      type: "quiz",
      id: "t1-3-q2",
      variant: "practice",
      question: "Evaluate $\\sin 240^\\circ$ exactly.",
      options: [
        { text: "$-\\dfrac{\\sqrt{3}}{2}$", correct: true, feedback: "Quadrant III so $y < 0$; reference angle $60^\\circ$, and $\\sin 60^\\circ = \\frac{\\sqrt3}{2}$." },
        { text: "$\\dfrac{\\sqrt{3}}{2}$", feedback: "Right size, wrong sign — in quadrant III the height is below the axis." },
        { text: "$-\\dfrac{1}{2}$", feedback: "That is $\\sin 210^\\circ$. Your reference angle should be $60^\\circ$, not $30^\\circ$." },
      ],
      hint: "Sign first (which quadrant?), then size (which reference angle?).",
    },
    {
      type: "quiz",
      id: "t1-3-q3",
      variant: "practice",
      question: "Evaluate $\\cos 135^\\circ$ exactly.",
      options: [
        { text: "$-\\dfrac{\\sqrt{2}}{2}$", correct: true, feedback: "Quadrant II so $x < 0$; reference angle $45^\\circ$." },
        { text: "$\\dfrac{\\sqrt{2}}{2}$", feedback: "Size right, sign wrong. Left of the y-axis means a negative x-coordinate." },
        { text: "$-\\dfrac{1}{2}$", feedback: "That would need a reference angle of $60^\\circ$; $180^\\circ - 135^\\circ = 45^\\circ$." },
      ],
      hint: "Is the point for $135^\\circ$ left or right of the y-axis? How far is it from the x-axis?",
    },
    {
      type: "quiz",
      id: "t1-3-q4",
      variant: "concept",
      question:
        "$\\theta$ is in quadrant III. Which of $\\sin\\theta$, $\\cos\\theta$, $\\tan\\theta$ is positive?",
      options: [
        { text: "Only $\\tan\\theta$.", correct: true, feedback: "$x<0$ and $y<0$, so both sine and cosine are negative — and their quotient is positive." },
        { text: "Only $\\sin\\theta$.", feedback: "That is quadrant II. In III the point is below the axis." },
        { text: "All three.", feedback: "That is quadrant I only." },
      ],
      hint: "Write down the signs of $x$ and $y$ there, then divide them.",
    },
    {
      type: "quiz",
      id: "t1-3-q5",
      variant: "practice",
      question: "Evaluate $\\tan 300^\\circ$ exactly.",
      options: [
        { text: "$-\\sqrt{3}$", correct: true, feedback: "Quadrant IV makes tangent negative; reference angle $60^\\circ$ gives size $\\sqrt3$." },
        { text: "$\\sqrt{3}$", feedback: "In quadrant IV, $y<0$ and $x>0$, so the quotient is negative." },
        { text: "$-\\dfrac{1}{\\sqrt{3}}$", feedback: "That is $\\tan 330^\\circ$ — reference angle $30^\\circ$ rather than $60^\\circ$." },
      ],
      hint: "In quadrant IV, what are the signs of $x$ and $y$? Their quotient is tangent.",
    },
    {
      type: "numeric",
      id: "t1-3-q6",
      variant: "practice",
      question: "Evaluate $\\sin 330^\\circ + \\cos 240^\\circ$.",
      answer: -1,
      hint: "Each term has a reference angle of $30^\\circ$ or $60^\\circ$, and each sits in a quadrant with its own sign.",
      solution:
        "$\\sin 330^\\circ$: quadrant IV, reference $30^\\circ$, so $-\\tfrac12$. $\\cos 240^\\circ$: quadrant III, reference $60^\\circ$, so $-\\tfrac12$. The sum is $-1$.",
      commonMistakes: [
        { answer: 0, feedback: "One of the signs is off. Both $330^\\circ$ (below the axis) and $240^\\circ$ (left of the axis) give negative values here." },
        { answer: 1, feedback: "Right sizes, wrong signs: $\\sin$ is negative in quadrant IV and $\\cos$ is negative in quadrant III." },
      ],
    },
    {
      type: "numeric",
      id: "t1-3-q7",
      variant: "practice",
      question:
        "Evaluate $\\cos 210^\\circ + \\sin 300^\\circ + \\tan 135^\\circ$ to 3 decimal places.",
      answer: -1 - Math.sqrt(3),
      tolerance: 0.001,
      hint: "Find the sign and the size of each term separately before adding.",
      solution:
        "$\\cos 210^\\circ = -\\tfrac{\\sqrt3}{2}$ (QIII, ref $30^\\circ$), $\\sin 300^\\circ = -\\tfrac{\\sqrt3}{2}$ (QIV, ref $60^\\circ$), $\\tan 135^\\circ = -1$ (QII, ref $45^\\circ$).\n\nSum: $-\\sqrt3 - 1 \\approx -2.732$.",
      commonMistakes: [
        { answer: 1 - Math.sqrt(3), tolerance: 0.001, feedback: "Check $\\tan 135^\\circ$: in quadrant II, $y > 0$ and $x < 0$, so tangent is negative." },
        { answer: -1, tolerance: 0.001, feedback: "The two $\\tfrac{\\sqrt3}{2}$ terms do not cancel: both are negative here, so they add to $-\\sqrt3$." },
      ],
    },
    {
      type: "quiz",
      id: "t1-3-q8",
      variant: "concept",
      multiple: true,
      question: "$\\sin\\theta\\cos\\theta < 0$. Select every quadrant $\\theta$ could be in.",
      options: [
        { text: "Quadrant I", feedback: "Both are positive there, so the product is positive." },
        { text: "Quadrant II", correct: true, feedback: "$\\sin > 0$, $\\cos < 0$: the product is negative." },
        { text: "Quadrant III", feedback: "Both are negative, and a negative times a negative is positive." },
        { text: "Quadrant IV", correct: true, feedback: "$\\sin < 0$, $\\cos > 0$: the product is negative." },
      ],
      hint: "A product is negative exactly when its two factors have opposite signs.",
    },
    {
      type: "quiz",
      id: "t1-3-q9",
      variant: "concept",
      question:
        "Angles in radians, no calculator: what is the sign of $\\sin 2 \\cdot \\cos 3 \\cdot \\tan 4$?",
      options: [
        {
          text: "Negative",
          correct: true,
          feedback:
            "$2$ rad $\\approx 115^\\circ$ (QII, $\\sin > 0$), $3$ rad $\\approx 172^\\circ$ (QII, $\\cos < 0$), $4$ rad $\\approx 229^\\circ$ (QIII, $\\tan > 0$). Positive × negative × positive is negative.",
        },
        {
          text: "Positive",
          feedback: "Locate each angle using $\\frac{\\pi}{2} \\approx 1.57$, $\\pi \\approx 3.14$, $\\frac{3\\pi}{2} \\approx 4.71$. The $\\cos 3$ factor is negative, since 3 is just short of $\\pi$.",
        },
        {
          text: "It cannot be decided without a calculator.",
          feedback: "Only the signs matter, and those come from the quadrants. Compare 2, 3 and 4 with $1.57$, $3.14$ and $4.71$.",
        },
        {
          text: "Positive, because 2, 3 and 4 are all positive angles.",
          feedback: "A positive angle can have a negative cosine. Here these are radians, so 3 is nearly a half turn.",
        },
      ],
      hint: "These are radians: compare each number with $\\frac{\\pi}{2} \\approx 1.57$, $\\pi \\approx 3.14$ and $\\frac{3\\pi}{2} \\approx 4.71$.",
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "pythagoras-in-disguise",
  title: "1.4 · Pythagoras in Disguise",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "The most-used identity in all of trigonometry is a restatement of a fact you have known for years. The equation of a circle of radius 1, centred at the origin, is:",
    },
    { type: "math", latex: "x^2 + y^2 = 1" },
    {
      type: "text",
      content:
        "And on the unit circle, $x = \\cos\\theta$ and $y = \\sin\\theta$. Substitute:",
    },
    { type: "math", latex: "\\cos^2\\theta + \\sin^2\\theta = 1" },
    {
      type: "callout",
      variant: "definition",
      title: "The Pythagorean identity",
      content:
        "$\\sin^2\\theta + \\cos^2\\theta = 1$ for **every** angle $\\theta$. The notation $\\sin^2\\theta$ means $(\\sin\\theta)^2$ — square the value, not the angle.",
    },
    { type: "heading", text: "Why it holds in every quadrant" },
    {
      type: "text",
      content:
        "It is Pythagoras, wearing a disguise. The triangle under the point has legs $|\\cos\\theta|$ and $|\\sin\\theta|$ and hypotenuse 1, so $a^2 + b^2 = c^2$ reads exactly as above. The squares are why the negative signs of quadrants II, III and IV cause no trouble: squaring erases them, which is why the identity holds everywhere and not just in the first quadrant.",
    },
    {
      type: "interactive",
      config: {
        component: "unit-circle",
        initialAngle: 125,
        minAngle: 0,
        maxAngle: 360,
        step: 5,
        showTriangle: true,
        showCoordinates: true,
        showRadians: false,
        caption:
          "Pick any angle, square the two readouts, add them. You will get 1 every time — in every quadrant.",
      },
    },
    { type: "heading", text: "The identity as a converter" },
    {
      type: "text",
      content:
        "The identity earns its keep as a **converter**: given one of sine and cosine, it produces the other, up to a sign you settle with the quadrant.",
    },
    {
      type: "worked-example",
      id: "t1-4-we1",
      title: "Example: from sine to cosine",
      problem: "$\\sin\\theta = \\frac{3}{5}$ and $\\theta$ is in quadrant II. Find $\\cos\\theta$.",
      steps: [
        {
          text: "Rearrange the identity and substitute:",
          latex:
            "\\cos^2\\theta = 1 - \\left(\\tfrac{3}{5}\\right)^2 = 1 - \\tfrac{9}{25} = \\tfrac{16}{25} \\quad\\Longrightarrow\\quad \\cos\\theta = \\pm\\tfrac{4}{5}",
        },
        {
          text: "The algebra hands you both signs; the geometry picks one. Quadrant II has $x < 0$, so $\\cos\\theta = -\\frac{4}{5}$.",
        },
      ],
      answer: "$\\cos\\theta = -\\tfrac45$.",
      tryFirst: false,
    },
    {
      type: "callout",
      variant: "warning",
      title: "Never skip the quadrant step",
      content:
        "A square root always offers two answers. The identity alone cannot choose between them — only the quadrant can. Answering $+\\frac45$ here is the single most common error in the chapter.",
    },
    {
      type: "text",
      content:
        "One more consequence, used constantly in Chapter 3: the identity rearranges into whichever form the problem wants.",
    },
    {
      type: "math",
      latex:
        "\\sin^2\\theta = 1 - \\cos^2\\theta, \\qquad \\cos^2\\theta = 1 - \\sin^2\\theta",
    },
    {
      type: "worked-example",
      id: "t1-4-we2",
      title: "Worked example: squaring a sum",
      problem:
        "$\\sin\\theta + \\cos\\theta = \\dfrac{7}{5}$. Find $\\sin\\theta\\cos\\theta$, and then the possible values of $\\sin\\theta - \\cos\\theta$.",
      steps: [
        {
          text: "Squaring the sum produces both squares, which the identity collapses to 1, plus a cross term:",
          latex: "(\\sin\\theta + \\cos\\theta)^2 = \\sin^2\\theta + \\cos^2\\theta + 2\\sin\\theta\\cos\\theta = 1 + 2\\sin\\theta\\cos\\theta",
        },
        {
          text: "Set it equal to $\\left(\\tfrac75\\right)^2 = \\tfrac{49}{25}$ and solve for the product:",
          latex: "1 + 2\\sin\\theta\\cos\\theta = \\tfrac{49}{25} \\;\\Rightarrow\\; \\sin\\theta\\cos\\theta = \\tfrac{12}{25}",
        },
        {
          text: "Squaring the *difference* gives the same squares with the opposite cross term:",
          latex: "(\\sin\\theta - \\cos\\theta)^2 = 1 - 2\\sin\\theta\\cos\\theta = 1 - \\tfrac{24}{25} = \\tfrac{1}{25}",
        },
        {
          text: "A square root brings back both signs, and here both really occur: $\\sin\\theta = \\tfrac45, \\cos\\theta = \\tfrac35$ gives $+\\tfrac15$, while $\\sin\\theta = \\tfrac35, \\cos\\theta = \\tfrac45$ gives $-\\tfrac15$.",
          latex: "\\sin\\theta - \\cos\\theta = \\pm\\tfrac{1}{5}",
        },
      ],
      answer: "$\\sin\\theta\\cos\\theta = \\tfrac{12}{25}$ and $\\sin\\theta - \\cos\\theta = \\pm\\tfrac15$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "t1-4-q1",
      variant: "practice",
      question:
        "$\\cos\\theta = -\\dfrac{5}{13}$ and $\\theta$ is in quadrant III. What is $\\sin\\theta$?",
      options: [
        { text: "$-\\dfrac{12}{13}$", correct: true, feedback: "$\\sin^2 = 1 - \\frac{25}{169} = \\frac{144}{169}$, so the size is $\\frac{12}{13}$; quadrant III makes it negative." },
        { text: "$\\dfrac{12}{13}$", feedback: "Correct size, wrong sign — quadrant III is below the x-axis." },
        { text: "$\\dfrac{8}{13}$", feedback: "You subtracted $5$ from $13$. The identity squares the values before subtracting." },
      ],
      hint: "Get the size from the identity, then let the quadrant choose the sign.",
    },
    {
      type: "quiz",
      id: "t1-4-q2",
      variant: "concept",
      question: "Why can $\\sin^2\\theta + \\cos^2\\theta = 1$ never fail, in any quadrant?",
      options: [
        {
          text: "It is $x^2 + y^2 = 1$ for a point on the unit circle, and squaring removes the signs the quadrants introduce.",
          correct: true,
          feedback: "Every point of the circle satisfies it, so every angle does.",
        },
        { text: "Because sine and cosine are always positive.", feedback: "They are not — outside quadrant I at least one is negative. The squares are what rescue the identity." },
        { text: "Because it only applies to acute angles.", feedback: "It applies to all angles, which is exactly its value." },
      ],
      hint: "Where does the identity come from, and what does squaring do to a negative number?",
    },
    {
      type: "quiz",
      id: "t1-4-q3",
      variant: "concept",
      question: "Someone reports $\\sin\\theta = 0.6$ and $\\cos\\theta = 0.9$ for the same angle. What is wrong?",
      options: [
        {
          text: "$0.6^2 + 0.9^2 = 1.17 \\ne 1$, so no single angle has both values.",
          correct: true,
          feedback: "The identity doubles as an error check on any pair of values.",
        },
        { text: "Nothing — both are between $-1$ and 1.", feedback: "Being in range is necessary but not sufficient; the pair must also sit on the circle." },
        { text: "Cosine cannot be larger than sine.", feedback: "It certainly can — at $\\theta = 20^\\circ$, for instance." },
      ],
      hint: "Test the pair against the identity.",
    },
    {
      type: "numeric",
      id: "t1-4-q4",
      variant: "practice",
      question: "$\\sin\\theta = -0.28$ and $\\theta$ is in quadrant IV. Find $\\cos\\theta$.",
      answer: 0.96,
      tolerance: 0.001,
      hint: "Use $\\cos^2\\theta = 1 - \\sin^2\\theta$, then decide the sign from the quadrant.",
      solution: "$\\cos^2\\theta = 1 - 0.0784 = 0.9216$, so $\\cos\\theta = \\pm 0.96$. Quadrant IV has $x > 0$: $\\cos\\theta = 0.96$.",
      commonMistakes: [
        { answer: -0.96, tolerance: 0.001, feedback: "Right size, wrong sign. Quadrant IV is to the *right* of the y-axis, so $x = \\cos\\theta$ is positive." },
        { answer: 0.72, tolerance: 0.001, feedback: "You computed $1 - 0.28$. The identity works with squares: $1 - 0.28^2$." },
      ],
    },
    {
      type: "numeric",
      id: "t1-4-q5",
      variant: "practice",
      question: "$\\sin\\theta + \\cos\\theta = 1.2$. Find $\\sin\\theta\\cos\\theta$.",
      answer: 0.22,
      tolerance: 0.001,
      hint: "Square both sides and use the identity on the squares.",
      solution:
        "$(\\sin\\theta + \\cos\\theta)^2 = 1 + 2\\sin\\theta\\cos\\theta = 1.44$, so $2\\sin\\theta\\cos\\theta = 0.44$ and $\\sin\\theta\\cos\\theta = 0.22$.",
      commonMistakes: [
        { answer: 0.44, tolerance: 0.001, feedback: "That is $2\\sin\\theta\\cos\\theta$. Halve it." },
        { answer: 0.72, tolerance: 0.001, feedback: "You halved $1.44$ directly. First subtract the $\\sin^2\\theta + \\cos^2\\theta = 1$ hiding inside the square." },
      ],
    },
    {
      type: "numeric",
      id: "t1-4-q6",
      variant: "practice",
      question: "$\\sin\\theta = 0.6$. Find $\\sin^4\\theta - \\cos^4\\theta$. (It does not matter which quadrant $\\theta$ is in.)",
      answer: -0.28,
      tolerance: 0.001,
      hint: "Factor it as a difference of two squares. One factor is something you know very well.",
      solution:
        "$\\sin^4\\theta - \\cos^4\\theta = (\\sin^2\\theta - \\cos^2\\theta)(\\sin^2\\theta + \\cos^2\\theta) = \\sin^2\\theta - \\cos^2\\theta$.\n\nWith $\\sin^2\\theta = 0.36$ and $\\cos^2\\theta = 0.64$: $0.36 - 0.64 = -0.28$. Only squares appear, which is why the quadrant does not matter.",
      commonMistakes: [
        { answer: 0.28, tolerance: 0.001, feedback: "Sign slip: $\\sin^2\\theta = 0.36$ is the *smaller* square, so the difference is negative." },
        { answer: -0.2, tolerance: 0.001, feedback: "That is $\\sin\\theta - \\cos\\theta$. The fourth powers factor into $(\\sin^2\\theta - \\cos^2\\theta) \\times 1$." },
      ],
    },
    {
      type: "quiz",
      id: "t1-4-q7",
      variant: "concept",
      multiple: true,
      question: "Select every expression that equals 1 for **every** angle $\\theta$.",
      options: [
        { text: "$\\sin^2\\theta + \\cos^2\\theta$", correct: true, feedback: "The identity itself." },
        {
          text: "$\\sin^2 2\\theta + \\cos^2 2\\theta$",
          correct: true,
          feedback: "The identity holds for *any* angle, including $2\\theta$, as long as both functions have the same angle.",
        },
        {
          text: "$(\\sin\\theta + \\cos\\theta)^2 - 2\\sin\\theta\\cos\\theta$",
          correct: true,
          feedback: "Expanding gives $\\sin^2\\theta + \\cos^2\\theta + 2\\sin\\theta\\cos\\theta - 2\\sin\\theta\\cos\\theta = 1$.",
        },
        { text: "$\\sin^2\\theta + \\cos^2 2\\theta$", feedback: "The angles do not match, so the identity does not apply. At $\\theta = 90^\\circ$ it is $1 + 1 = 2$." },
        { text: "$\\sin\\theta + \\cos\\theta$", feedback: "Without the squares it fails: at $45^\\circ$ it is $\\sqrt2 \\approx 1.41$." },
      ],
      hint: "The identity needs squares of sine and cosine of the *same* angle. Test any doubtful one at $90^\\circ$ or $45^\\circ$.",
    },
    {
      type: "numeric",
      id: "t1-4-q8",
      variant: "practice",
      question: "Without a calculator, evaluate $\\sin^2 10^\\circ + \\sin^2 80^\\circ$.",
      answer: 1,
      hint: "$10^\\circ$ and $80^\\circ$ are the two acute angles of one right triangle. How is $\\sin 80^\\circ$ related to $10^\\circ$?",
      solution:
        "$\\sin 80^\\circ = \\cos 10^\\circ$ (the co-function fact from lesson 0.3). So the sum is $\\sin^2 10^\\circ + \\cos^2 10^\\circ = 1$.",
      commonMistakes: [
        { answer: 0, feedback: "Squares of real numbers cannot add to zero unless both are zero, and $\\sin 10^\\circ \\ne 0$." },
      ],
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "the-other-four",
  title: "1.5 · The Other Four",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "Six ratios can be formed from the sides of a right triangle. You have met three. The other three are simply the reciprocals — no new geometry, just names.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The remaining functions",
      content:
        "$\\tan\\theta = \\dfrac{\\sin\\theta}{\\cos\\theta} = \\dfrac{y}{x}$,  $\\cot\\theta = \\dfrac{1}{\\tan\\theta} = \\dfrac{x}{y}$,  $\\sec\\theta = \\dfrac{1}{\\cos\\theta} = \\dfrac{1}{x}$,  $\\csc\\theta = \\dfrac{1}{\\sin\\theta} = \\dfrac{1}{y}$.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "The pairing trap",
      content:
        "**Se**cant pairs with **co**sine, and **co**secant pairs with **sine** — the prefixes are crossed relative to what you would guess. Check the third letter: se**c** goes with **c**osine, cs**c** goes with **s**ine.",
    },
    { type: "heading", text: "Tangent as the slope of the radius" },
    {
      type: "text",
      content:
        "Tangent has a picture worth carrying. The point on the circle is $(x, y)$ and the radius runs to it from the origin, so the slope of that radius is $\\frac{\\text{rise}}{\\text{run}} = \\frac{y}{x} = \\tan\\theta$.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Tangent is a slope",
      content:
        "$\\tan\\theta$ is the slope of the terminal side. This is why a 45° line has slope 1, why tangent is positive in quadrants I and III (where the radius points up-right or down-left, both slopes positive), and why tangent repeats every 180° rather than every 360°: a line through the origin looks identical after a half turn.",
    },
    {
      type: "interactive",
      config: {
        component: "unit-circle",
        initialAngle: 60,
        minAngle: 0,
        maxAngle: 360,
        step: 5,
        showTriangle: true,
        showCoordinates: true,
        showTangent: true,
        showRadians: false,
        caption:
          "Slide toward 90°: the x-coordinate shrinks to 0 and the tangent readout runs away. At exactly 90° it reads undefined — the radius is vertical, and a vertical line has no slope.",
      },
    },
    { type: "heading", text: "Where the functions are undefined" },
    {
      type: "text",
      content:
        "Because four of these six functions are fractions with $x$ or $y$ underneath, they are undefined wherever that coordinate is zero. Nothing needs to be remembered here — just ask which coordinate is in the denominator, and where it vanishes.",
    },
    {
      type: "table",
      headers: ["Function", "Denominator", "Undefined at", "Because"],
      rows: [
        ["$\\tan\\theta$", "$x$", "$90^\\circ, 270^\\circ, \\ldots$", "the point is on the y-axis, $x = 0$"],
        ["$\\sec\\theta$", "$x$", "$90^\\circ, 270^\\circ, \\ldots$", "same zero as tangent"],
        ["$\\cot\\theta$", "$y$", "$0^\\circ, 180^\\circ, \\ldots$", "the point is on the x-axis, $y = 0$"],
        ["$\\csc\\theta$", "$y$", "$0^\\circ, 180^\\circ, \\ldots$", "same zero as cotangent"],
      ],
    },
    {
      type: "text",
      content:
        "Sine and cosine, by contrast, are defined for every angle — they are coordinates, and a point always has both. That is why they are the two functions Chapter 2 graphs first, and the two calculus mostly cares about.",
    },
    { type: "heading", text: "All six from one" },
    {
      type: "worked-example",
      id: "t1-5-we1",
      title: "Worked example 1: one value, one quadrant, six functions",
      problem:
        "$\\tan\\theta = -\\dfrac{5}{12}$ and $\\theta$ is in quadrant II. Find the other five trigonometric functions of $\\theta$.",
      steps: [
        {
          text: "Quadrant II: $x < 0$, $y > 0$. Since $\\tan\\theta = \\frac{y}{x} = -\\frac{5}{12}$, take $y = 5$ and $x = -12$ on a circle of radius $r = \\sqrt{12^2 + 5^2} = 13$.",
        },
        {
          text: "Divide by the radius for sine and cosine:",
          latex: "\\sin\\theta = \\frac{5}{13}, \\qquad \\cos\\theta = -\\frac{12}{13}",
        },
        {
          text: "Flip each for the reciprocals:",
          latex: "\\csc\\theta = \\frac{13}{5}, \\qquad \\sec\\theta = -\\frac{13}{12}, \\qquad \\cot\\theta = -\\frac{12}{5}",
        },
        {
          text: "Check the signs: in quadrant II only sine (and its reciprocal, cosecant) is positive. Two positive, four negative counting tangent. Consistent.",
        },
      ],
      answer:
        "$\\sin\\theta = \\tfrac{5}{13}$, $\\cos\\theta = -\\tfrac{12}{13}$, $\\csc\\theta = \\tfrac{13}{5}$, $\\sec\\theta = -\\tfrac{13}{12}$, $\\cot\\theta = -\\tfrac{12}{5}$.",
    },
    {
      type: "text",
      content:
        "Divide $\\sin^2\\theta + \\cos^2\\theta = 1$ through by $\\cos^2\\theta$ and you get a Pythagorean identity for the other functions: $\\tan^2\\theta + 1 = \\sec^2\\theta$. (Dividing by $\\sin^2\\theta$ instead gives $1 + \\cot^2\\theta = \\csc^2\\theta$; Chapter 3 collects the family.) JEE problems love the first one in factored form, $(\\sec\\theta - \\tan\\theta)(\\sec\\theta + \\tan\\theta) = 1$.",
    },
    {
      type: "worked-example",
      id: "t1-5-we2",
      title: "Worked example 2: secant plus tangent",
      problem: "$\\sec\\theta + \\tan\\theta = 3$. Find $\\sec\\theta$, $\\tan\\theta$ and $\\sin\\theta$.",
      steps: [
        {
          text: "The factored identity says the two brackets multiply to 1, so:",
          latex: "\\sec\\theta - \\tan\\theta = \\frac{1}{\\sec\\theta + \\tan\\theta} = \\frac{1}{3}",
        },
        {
          text: "Add and subtract the two equations:",
          latex: "2\\sec\\theta = 3 + \\tfrac13 = \\tfrac{10}{3} \\Rightarrow \\sec\\theta = \\tfrac{5}{3}, \\qquad 2\\tan\\theta = 3 - \\tfrac13 = \\tfrac83 \\Rightarrow \\tan\\theta = \\tfrac43",
        },
        {
          text: "Sine is tangent times cosine, i.e. tangent divided by secant:",
          latex: "\\sin\\theta = \\frac{\\tan\\theta}{\\sec\\theta} = \\frac{4/3}{5/3} = \\frac{4}{5}",
        },
      ],
      answer: "$\\sec\\theta = \\tfrac53$, $\\tan\\theta = \\tfrac43$, $\\sin\\theta = \\tfrac45$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "t1-5-q1",
      variant: "practice",
      question: "$\\cos\\theta = \\dfrac{2}{3}$. What is $\\sec\\theta$?",
      options: [
        { text: "$\\dfrac{3}{2}$", correct: true, feedback: "Secant is the reciprocal of cosine." },
        { text: "$\\dfrac{2}{3}$", feedback: "That is cosine itself. Secant flips it." },
        { text: "$\\dfrac{\\sqrt{5}}{3}$", feedback: "That is $\\sin\\theta$ via the Pythagorean identity — a different question." },
      ],
      hint: "Third letter: se**c** pairs with **c**osine. What does pairing mean here?",
    },
    {
      type: "quiz",
      id: "t1-5-q2",
      variant: "concept",
      question: "Why is $\\tan 90^\\circ$ undefined?",
      options: [
        {
          text: "At $90^\\circ$ the point is $(0,1)$, so $\\tan = y/x$ divides by zero — the terminal side is vertical and has no slope.",
          correct: true,
          feedback: "Both statements are the same fact: vertical lines have undefined slope.",
        },
        { text: "Because $\\sin 90^\\circ = 1$ is the maximum.", feedback: "The numerator being 1 causes no problem; the zero denominator does." },
        { text: "Because $90^\\circ$ is not in any quadrant.", feedback: "True that it sits on an axis, but cotangent is perfectly fine at $90^\\circ$ — it equals 0." },
      ],
      hint: "Write down the point at $90^\\circ$ and divide its coordinates.",
    },
    {
      type: "quiz",
      id: "t1-5-q3",
      variant: "concept",
      question: "For which angles is $\\csc\\theta$ undefined?",
      options: [
        { text: "$0^\\circ, 180^\\circ, 360^\\circ, \\ldots$ — wherever $\\sin\\theta = 0$.", correct: true, feedback: "Cosecant is $1/y$, and $y = 0$ exactly on the x-axis." },
        { text: "$90^\\circ$ and $270^\\circ$.", feedback: "Those are where $x = 0$, which breaks secant and tangent instead." },
        { text: "Nowhere; cosecant is defined everywhere.", feedback: "It inherits sine's zeros as its own undefined points." },
      ],
      hint: "Which coordinate ends up in the denominator?",
    },
    {
      type: "numeric",
      id: "t1-5-q4",
      variant: "practice",
      question: "$\\sin\\theta = -0.6$ and $\\theta$ is in quadrant III. Find $\\sec\\theta$.",
      answer: -1.25,
      tolerance: 0.001,
      hint: "Find $\\cos\\theta$ first (identity plus quadrant), then take its reciprocal.",
      solution: "$\\cos^2\\theta = 1 - 0.36 = 0.64$ and quadrant III makes it negative: $\\cos\\theta = -0.8$. So $\\sec\\theta = \\dfrac{1}{-0.8} = -1.25$.",
      commonMistakes: [
        { answer: 1.25, tolerance: 0.001, feedback: "Size right, sign wrong: cosine is negative in quadrant III, and so is its reciprocal." },
        { answer: -1.667, tolerance: 0.001, feedback: "That is $\\csc\\theta = \\frac{1}{\\sin\\theta}$. Secant is the reciprocal of *cosine*." },
      ],
    },
    {
      type: "quiz",
      id: "t1-5-q5",
      variant: "concept",
      question: "Which of these values is impossible for $\\sec\\theta$?",
      options: [
        {
          text: "$0.5$",
          correct: true,
          feedback: "$\\sec\\theta = 0.5$ would need $\\cos\\theta = 2$. Since $|\\cos\\theta| \\le 1$, its reciprocal always has $|\\sec\\theta| \\ge 1$.",
        },
        { text: "$-1$", feedback: "Possible: $\\sec 180^\\circ = \\frac{1}{-1} = -1$." },
        { text: "$2.5$", feedback: "Possible: it needs $\\cos\\theta = 0.4$, which is fine." },
        { text: "$-3$", feedback: "Possible: it needs $\\cos\\theta = -\\tfrac13$, an angle in quadrant II or III." },
      ],
      hint: "Turn each candidate back into a cosine. Which cosine could never happen?",
    },
    {
      type: "quiz",
      id: "t1-5-q6",
      variant: "practice",
      multiple: true,
      question: "Select every expression that is undefined.",
      options: [
        { text: "$\\sec 90^\\circ$", correct: true, feedback: "$\\frac{1}{x}$ with $x = 0$ at $(0, 1)$." },
        { text: "$\\cot 0^\\circ$", correct: true, feedback: "$\\frac{x}{y}$ with $y = 0$ at $(1, 0)$." },
        { text: "$\\csc 180^\\circ$", correct: true, feedback: "$\\frac{1}{y}$ with $y = 0$ at $(-1, 0)$." },
        { text: "$\\csc 270^\\circ$", feedback: "At $(0, -1)$, $y = -1$, so $\\csc 270^\\circ = -1$. Defined." },
        { text: "$\\cot 90^\\circ$", feedback: "$\\frac{x}{y} = \\frac{0}{1} = 0$. A zero *numerator* is harmless." },
        { text: "$\\tan 180^\\circ$", feedback: "$\\frac{y}{x} = \\frac{0}{-1} = 0$. Defined." },
      ],
      hint: "Write each axis point, then check whether the function puts a 0 in its denominator.",
    },
    {
      type: "numeric",
      id: "t1-5-q7",
      variant: "practice",
      question: "$\\sec\\theta + \\tan\\theta = 2$. Find $\\sin\\theta$.",
      answer: 0.6,
      tolerance: 0.001,
      hint: "Use $(\\sec\\theta - \\tan\\theta)(\\sec\\theta + \\tan\\theta) = 1$ to get a second equation, as in worked example 2.",
      solution:
        "$\\sec\\theta - \\tan\\theta = \\tfrac12$. Adding and subtracting: $\\sec\\theta = \\tfrac54$ and $\\tan\\theta = \\tfrac34$. Then $\\sin\\theta = \\dfrac{\\tan\\theta}{\\sec\\theta} = \\dfrac{3/4}{5/4} = \\dfrac35 = 0.6$.",
      commonMistakes: [
        { answer: 0.75, tolerance: 0.001, feedback: "That is $\\tan\\theta$. Divide by $\\sec\\theta$ to get $\\sin\\theta$." },
        { answer: 0.8, tolerance: 0.001, feedback: "That is $\\cos\\theta = \\frac{1}{\\sec\\theta}$." },
      ],
    },
    {
      type: "numeric",
      id: "t1-5-q8",
      variant: "practice",
      question: "$\\csc\\theta - \\cot\\theta = \\dfrac13$. Find $\\cos\\theta$.",
      answer: 0.8,
      tolerance: 0.001,
      hint: "The cosecant–cotangent identity factors too: $(\\csc\\theta - \\cot\\theta)(\\csc\\theta + \\cot\\theta) = 1$.",
      solution:
        "$\\csc\\theta + \\cot\\theta = 3$. Adding: $2\\csc\\theta = \\tfrac{10}{3}$, so $\\csc\\theta = \\tfrac53$. Subtracting: $2\\cot\\theta = \\tfrac83$, so $\\cot\\theta = \\tfrac43$.\n\n$\\cos\\theta = \\cot\\theta \\cdot \\sin\\theta = \\dfrac{\\cot\\theta}{\\csc\\theta} = \\dfrac{4/3}{5/3} = 0.8$.",
      commonMistakes: [
        { answer: 0.6, tolerance: 0.001, feedback: "That is $\\sin\\theta = \\frac{1}{\\csc\\theta}$. Cosine is $\\frac{\\cot\\theta}{\\csc\\theta}$." },
        { answer: 1.333, tolerance: 0.001, feedback: "That is $\\cot\\theta$." },
      ],
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "rebuild-the-whole-circle",
  title: "1.6 · Rebuild the Whole Circle",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "Time to prove the chapter's thesis to yourself: you do not need the chart. Every standard value on the unit circle can be regenerated from three facts, none of which is a list of values.",
    },
    {
      type: "callout",
      variant: "info",
      title: "The three facts",
      content:
        "1. **The axis points.** $0^\\circ \\to (1,0)$, $90^\\circ \\to (0,1)$, $180^\\circ \\to (-1,0)$, $270^\\circ \\to (0,-1)$ — read straight off the picture.\n2. **The two triangles.** Half an equilateral gives $30^\\circ$/$60^\\circ$; half a square gives $45^\\circ$. Sizes: $\\frac12$, $\\frac{\\sqrt2}{2}$, $\\frac{\\sqrt3}{2}$.\n3. **Quadrant plus reference angle.** Signs from the quadrant, size from the reference angle.",
    },
    { type: "heading", text: "The drill on one angle" },
    {
      type: "worked-example",
      id: "t1-6-we1",
      title: "Run the drill: $150^\\circ$",
      problem: "Run the drill. Take $\\theta = 150^\\circ$ and find the point $(\\cos\\theta, \\sin\\theta)$.",
      steps: [
        { text: "Quadrant II → $x$ negative, $y$ positive." },
        { text: "Reference angle $180^\\circ - 150^\\circ = 30^\\circ$." },
        {
          text: "Sizes from the half-equilateral triangle: $\\cos 30^\\circ = \\frac{\\sqrt3}{2}$, $\\sin 30^\\circ = \\frac12$. Attach the signs:",
          latex: "\\left(\\cos 150^\\circ,\\ \\sin 150^\\circ\\right) = \\left(-\\tfrac{\\sqrt{3}}{2},\\ \\tfrac{1}{2}\\right)",
        },
      ],
      answer: "$\\left(-\\tfrac{\\sqrt3}{2}, \\tfrac12\\right)$.",
    },
    { type: "heading", text: "Three sizes, four sign patterns" },
    {
      type: "text",
      content:
        "Roughly fifteen seconds, no chart. Now notice the structure that makes the whole circle cheap: **the twelve standard angles are only three distinct sizes, arranged with four sign patterns.** Every value in quadrants II, III and IV is a first-quadrant value wearing a minus sign.",
    },
    {
      type: "table",
      headers: ["Reference", "$\\left|\\cos\\right|$", "$\\left|\\sin\\right|$", "Angles that use it"],
      rows: [
        ["$30^\\circ$", "$\\frac{\\sqrt{3}}{2}$", "$\\frac{1}{2}$", "$30^\\circ, 150^\\circ, 210^\\circ, 330^\\circ$"],
        ["$45^\\circ$", "$\\frac{\\sqrt{2}}{2}$", "$\\frac{\\sqrt{2}}{2}$", "$45^\\circ, 135^\\circ, 225^\\circ, 315^\\circ$"],
        ["$60^\\circ$", "$\\frac{1}{2}$", "$\\frac{\\sqrt{3}}{2}$", "$60^\\circ, 120^\\circ, 240^\\circ, 300^\\circ$"],
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "A memory hook that is not memorization",
      content:
        "Going $30^\\circ, 45^\\circ, 60^\\circ$, the sines are $\\frac{\\sqrt1}{2}, \\frac{\\sqrt2}{2}, \\frac{\\sqrt3}{2}$ and the cosines run the same list backwards. Pleasant, and it agrees with the triangles — but if you ever doubt it, redraw the triangle rather than trusting the pattern.",
    },
    {
      type: "text",
      content:
        "Use the explorer below as a *checker*, not a source: derive the value on paper first, then move the slider to confirm it. Cover the readouts if you can.",
    },
    {
      type: "interactive",
      config: {
        component: "unit-circle",
        initialAngle: 240,
        minAngle: 0,
        maxAngle: 360,
        step: 15,
        showTriangle: true,
        showCoordinates: true,
        showReferenceAngle: true,
        showTangent: true,
        showRadians: true,
        caption:
          "Stepping by 15° walks you through every standard angle. For each stop: quadrant, reference angle, sizes, signs — then check.",
      },
    },
    { type: "heading", text: "Radians and the drill in reverse" },
    {
      type: "worked-example",
      id: "t1-6-we2",
      title: "Worked example: a negative radian angle",
      problem: "Evaluate $\\sin\\left(-\\dfrac{5\\pi}{4}\\right)$ exactly.",
      steps: [
        {
          text: "Convert to degrees if that is quicker: $\\frac{5\\pi}{4} = 225^\\circ$, so the angle is $-225^\\circ$. Add a full turn to get a coterminal angle in $[0^\\circ, 360^\\circ)$:",
          latex: "-225^\\circ + 360^\\circ = 135^\\circ",
        },
        { text: "Quadrant II, so $y > 0$: the sine is positive. Reference angle $180^\\circ - 135^\\circ = 45^\\circ$." },
        {
          text: "Size from the half-square:",
          latex: "\\sin\\left(-\\tfrac{5\\pi}{4}\\right) = \\sin 135^\\circ = \\tfrac{\\sqrt2}{2}",
        },
      ],
      answer: "$\\sin\\left(-\\tfrac{5\\pi}{4}\\right) = \\tfrac{\\sqrt2}{2}$.",
    },
    {
      type: "worked-example",
      id: "t1-6-we3",
      title: "Worked example: running the drill backwards",
      problem: "Find every $\\theta$ in $[0, 2\\pi)$ with $\\cos\\theta = -\\dfrac12$.",
      steps: [
        { text: "Size first: $\\cos = \\frac12$ belongs to the reference angle $60^\\circ = \\frac{\\pi}{3}$." },
        { text: "Sign next: cosine is the x-coordinate, which is negative in quadrants II and III. So there is one answer in each." },
        {
          text: "Place the reference angle in each quadrant: quadrant II is $\\pi - \\frac{\\pi}{3}$ and quadrant III is $\\pi + \\frac{\\pi}{3}$.",
          latex: "\\theta = \\frac{2\\pi}{3} \\quad\\text{or}\\quad \\theta = \\frac{4\\pi}{3}",
        },
      ],
      answer: "$\\theta = \\tfrac{2\\pi}{3}$ or $\\tfrac{4\\pi}{3}$ (that is, $120^\\circ$ or $240^\\circ$).",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "t1-6-q1",
      variant: "practice",
      question: "Derive the coordinates of the point at $225^\\circ$.",
      options: [
        { text: "$\\left(-\\frac{\\sqrt2}{2}, -\\frac{\\sqrt2}{2}\\right)$", correct: true, feedback: "Quadrant III (both negative), reference angle $45^\\circ$ (both sizes equal)." },
        { text: "$\\left(-\\frac{\\sqrt3}{2}, -\\frac12\\right)$", feedback: "That is $210^\\circ$ — reference angle $30^\\circ$, not $45^\\circ$." },
        { text: "$\\left(\\frac{\\sqrt2}{2}, -\\frac{\\sqrt2}{2}\\right)$", feedback: "That is $315^\\circ$, in quadrant IV where $x$ is positive." },
      ],
      hint: "Quadrant first, then the reference angle.",
    },
    {
      type: "quiz",
      id: "t1-6-q2",
      variant: "practice",
      question: "Evaluate $\\cos\\dfrac{2\\pi}{3}$.",
      options: [
        { text: "$-\\dfrac{1}{2}$", correct: true, feedback: "$\\frac{2\\pi}{3} = 120^\\circ$: quadrant II, reference $60^\\circ$, $\\cos 60^\\circ = \\frac12$, sign negative." },
        { text: "$\\dfrac{1}{2}$", feedback: "Right size, but quadrant II has a negative x-coordinate." },
        { text: "$-\\dfrac{\\sqrt3}{2}$", feedback: "That is $\\cos 150^\\circ$; check the conversion — $\\frac{2\\pi}{3}$ is $120^\\circ$." },
      ],
      hint: "Convert to degrees first if that is faster for you.",
    },
    {
      type: "quiz",
      id: "t1-6-q3",
      variant: "concept",
      question:
        "How many angles in $[0^\\circ, 360^\\circ)$ have $\\left|\\sin\\theta\\right| = \\dfrac{1}{2}$?",
      options: [
        { text: "Four: $30^\\circ, 150^\\circ, 210^\\circ, 330^\\circ$.", correct: true, feedback: "One per quadrant — every reference angle appears four times around the circle." },
        { text: "Two: $30^\\circ$ and $150^\\circ$.", feedback: "Those are the two with $\\sin = +\\frac12$. The absolute value also admits the negative pair." },
        { text: "One: $30^\\circ$.", feedback: "Only if you stop at the first quadrant — the point of this chapter is that you do not." },
      ],
      hint: "Find the reference angle first, then ask which quadrants qualify once the sign no longer matters.",
    },
    {
      type: "quiz",
      id: "t1-6-q4",
      variant: "practice",
      question: "Evaluate $\\tan 135^\\circ$.",
      options: [
        { text: "$-1$", correct: true, feedback: "Reference angle $45^\\circ$ gives size 1; quadrant II makes tangent negative. Also visible as the slope of a line falling to the left." },
        { text: "$1$", feedback: "That is $\\tan 45^\\circ$ and $\\tan 225^\\circ$. In quadrant II the slope is negative." },
        { text: "undefined", feedback: "Tangent is undefined only at $90^\\circ$ and $270^\\circ$, where $x = 0$." },
      ],
      hint: "Think of tangent as the slope of the radius. Which way does the $135^\\circ$ radius lean?",
    },
    {
      type: "numeric",
      id: "t1-6-q5",
      variant: "practice",
      question: "Evaluate $\\cos\\dfrac{11\\pi}{6}$ to 3 decimal places.",
      answer: Math.sqrt(3) / 2,
      tolerance: 0.001,
      hint: "Convert $\\frac{11\\pi}{6}$ to degrees, then run the drill.",
      solution: "$\\frac{11\\pi}{6} = 330^\\circ$: quadrant IV ($x > 0$), reference angle $30^\\circ$. So $\\cos\\frac{11\\pi}{6} = \\frac{\\sqrt3}{2} \\approx 0.866$.",
      commonMistakes: [
        { answer: -Math.sqrt(3) / 2, tolerance: 0.001, feedback: "In quadrant IV the point is to the right of the y-axis, so cosine is positive." },
        { answer: -0.5, tolerance: 0.001, feedback: "That is $\\sin\\frac{11\\pi}{6}$." },
      ],
    },
    {
      type: "quiz",
      id: "t1-6-q6",
      variant: "practice",
      multiple: true,
      question: "Select every $\\theta$ in $[0, 2\\pi)$ with $\\cos\\theta = -\\dfrac12$.",
      options: [
        { text: "$\\dfrac{2\\pi}{3}$", correct: true, feedback: "$120^\\circ$: quadrant II, reference $60^\\circ$, cosine $-\\frac12$." },
        { text: "$\\dfrac{4\\pi}{3}$", correct: true, feedback: "$240^\\circ$: quadrant III, reference $60^\\circ$, cosine $-\\frac12$." },
        { text: "$\\dfrac{\\pi}{3}$", feedback: "$\\cos\\frac{\\pi}{3} = +\\frac12$. The reference angle is right but the quadrant is not." },
        { text: "$\\dfrac{5\\pi}{3}$", feedback: "$300^\\circ$ is in quadrant IV, where cosine is positive." },
        { text: "$\\dfrac{5\\pi}{6}$", feedback: "Right quadrant, wrong reference angle: $\\cos\\frac{5\\pi}{6} = -\\frac{\\sqrt3}{2}$." },
      ],
      hint: "Which reference angle has cosine $\\frac12$, and in which quadrants is cosine negative?",
    },
    {
      type: "numeric",
      id: "t1-6-q7",
      variant: "practice",
      question: "Evaluate $4\\sin 240^\\circ \\cos 330^\\circ$.",
      answer: -3,
      hint: "Run the drill on each factor separately: sign, then size.",
      solution:
        "$\\sin 240^\\circ = -\\frac{\\sqrt3}{2}$ (QIII, ref $60^\\circ$) and $\\cos 330^\\circ = \\frac{\\sqrt3}{2}$ (QIV, ref $30^\\circ$). So $4 \\times \\left(-\\frac{\\sqrt3}{2}\\right) \\times \\frac{\\sqrt3}{2} = -3$.",
      commonMistakes: [
        { answer: 3, feedback: "Only one of the two factors is negative here: cosine is positive in quadrant IV." },
        { answer: -1, feedback: "Check the sizes: both factors have size $\\frac{\\sqrt3}{2}$, not $\\frac12$." },
      ],
    },
    {
      type: "numeric",
      id: "t1-6-q8",
      variant: "practice",
      question: "Evaluate $\\cos 1^\\circ + \\cos 2^\\circ + \\cos 3^\\circ + \\cdots + \\cos 179^\\circ$.",
      answer: 0,
      hint: "Pair $\\cos\\theta$ with $\\cos(180^\\circ - \\theta)$. What do their reference angles and quadrants say?",
      solution:
        "$\\cos(180^\\circ - \\theta)$ is in quadrant II with reference angle $\\theta$, so it equals $-\\cos\\theta$. The terms pair off: $\\cos 1^\\circ + \\cos 179^\\circ = 0$, $\\cos 2^\\circ + \\cos 178^\\circ = 0$, and so on up to $\\cos 89^\\circ + \\cos 91^\\circ = 0$. The unpaired middle term is $\\cos 90^\\circ = 0$. Total: $0$.",
      commonMistakes: [
        { answer: 1, feedback: "Every pair cancels, and the leftover middle term is $\\cos 90^\\circ = 0$, not 1." },
      ],
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "trig-chapter-1-mastery",
  title: "1.7 · Chapter 1 Mastery",
  position: 7,
  blocks: blocks([
    {
      type: "text",
      content:
        "Any angle, any function, any sign — from scratch. Work each of these on paper before choosing, and check that you can state which of the three facts you used.",
    },
    {
      type: "callout",
      variant: "info",
      title: "The chapter in four lines",
      content:
        "1. On the unit circle, $(\\cos\\theta, \\sin\\theta)$ *is* the point — the definition no longer needs a triangle.\n2. Rotation continues past $90^\\circ$, below $0^\\circ$, and beyond $360^\\circ$; coterminal angles share every value.\n3. Quadrant gives the sign, reference angle gives the size.\n4. $\\sin^2\\theta + \\cos^2\\theta = 1$ is the circle's own equation.",
    },
    {
      type: "quiz",
      id: "t1-m-q1",
      variant: "mastery",
      question: "Evaluate $\\sin\\dfrac{7\\pi}{6}$ exactly.",
      options: [
        { text: "$-\\dfrac{1}{2}$", correct: true, feedback: "$210^\\circ$: quadrant III, reference $30^\\circ$, size $\\frac12$, sign negative." },
        { text: "$\\dfrac{1}{2}$", feedback: "Quadrant III sits below the x-axis, so the y-coordinate is negative." },
        { text: "$-\\dfrac{\\sqrt3}{2}$", feedback: "That is $\\sin\\frac{4\\pi}{3}$ ($240^\\circ$), whose reference angle is $60^\\circ$." },
      ],
    },
    {
      type: "quiz",
      id: "t1-m-q2",
      variant: "mastery",
      question:
        "$\\tan\\theta = -\\dfrac{3}{4}$ and $\\theta$ is in quadrant IV. What is $\\sin\\theta$?",
      options: [
        { text: "$-\\dfrac{3}{5}$", correct: true, feedback: "Legs 3 and 4 give hypotenuse 5; quadrant IV makes $y$ negative and $x$ positive, so $\\sin\\theta = -\\frac35$." },
        { text: "$\\dfrac{3}{5}$", feedback: "Quadrant IV is below the axis — sine is negative there." },
        { text: "$-\\dfrac{4}{5}$", feedback: "That is $\\cos\\theta$'s size; but in quadrant IV cosine is positive, so $\\cos\\theta = \\frac45$." },
      ],
      hint: "Build the reference triangle from 3 and 4 first, then attach the quadrant's signs.",
    },
    {
      type: "quiz",
      id: "t1-m-q3",
      variant: "mastery",
      question: "Which expression equals $\\cos(-\\theta)$ for every $\\theta$?",
      options: [
        { text: "$\\cos\\theta$", correct: true, feedback: "Negating the angle mirrors the point across the x-axis: $x$ survives, $y$ flips." },
        { text: "$-\\cos\\theta$", feedback: "That is the effect on *sine*, not cosine." },
        { text: "$\\sin\\theta$", feedback: "A rotation of $90^\\circ$ relates them; a reflection does not." },
      ],
    },
    {
      type: "quiz",
      id: "t1-m-q4",
      variant: "mastery",
      question:
        "$\\sin\\theta = 0.8$ and $\\tan\\theta < 0$. In which quadrant is $\\theta$, and what is $\\cos\\theta$?",
      options: [
        { text: "Quadrant II, $\\cos\\theta = -0.6$", correct: true, feedback: "Positive sine and negative tangent force a negative cosine; the identity supplies the size $0.6$." },
        { text: "Quadrant I, $\\cos\\theta = 0.6$", feedback: "In quadrant I every function is positive, so tangent could not be negative." },
        { text: "Quadrant IV, $\\cos\\theta = 0.6$", feedback: "Quadrant IV has negative sine, contradicting $\\sin\\theta = 0.8$." },
      ],
    },
    {
      type: "quiz",
      id: "t1-m-q5",
      variant: "mastery",
      question: "Which of these is undefined?",
      options: [
        { text: "$\\cot 180^\\circ$", correct: true, feedback: "$\\cot = x/y$ and at $180^\\circ$ the point is $(-1, 0)$, so $y = 0$." },
        { text: "$\\tan 180^\\circ$", feedback: "$= y/x = 0/(-1) = 0$. Perfectly defined." },
        { text: "$\\sec 180^\\circ$", feedback: "$= 1/x = 1/(-1) = -1$." },
      ],
    },
    {
      type: "quiz",
      id: "t1-m-q6",
      variant: "mastery",
      question:
        "How many angles $\\theta$ in $[0^\\circ, 720^\\circ)$ satisfy $\\cos\\theta = \\dfrac{\\sqrt2}{2}$?",
      options: [
        { text: "Four", correct: true, feedback: "$45^\\circ$ and $315^\\circ$ in the first revolution, then both again a full turn later." },
        { text: "Two", feedback: "That is the count in one revolution; the interval given covers two." },
        { text: "Infinitely many", feedback: "True over all real angles, but the interval here is bounded." },
      ],
      hint: "Solve it in $[0^\\circ, 360^\\circ)$ first, then account for the extra turn.",
    },
    {
      type: "numeric",
      id: "t1-m-q7",
      variant: "mastery",
      question: "$\\cos\\theta = -0.6$ and $\\theta$ is in quadrant III. Find $\\tan\\theta$ to 3 decimal places.",
      answer: 4 / 3,
      tolerance: 0.001,
      solution:
        "$\\sin^2\\theta = 1 - 0.36 = 0.64$ and quadrant III makes sine negative: $\\sin\\theta = -0.8$. Then $\\tan\\theta = \\dfrac{-0.8}{-0.6} = \\dfrac43 \\approx 1.333$.",
      commonMistakes: [
        { answer: -4 / 3, tolerance: 0.001, feedback: "In quadrant III both coordinates are negative, so their quotient is positive." },
        { answer: 0.75, tolerance: 0.001, feedback: "That is $\\cot\\theta = \\frac{x}{y}$. Tangent is $\\frac{y}{x}$." },
      ],
    },
    {
      type: "quiz",
      id: "t1-m-q8",
      variant: "mastery",
      multiple: true,
      question: "Select every expression equal to $-\\sin 20^\\circ$.",
      options: [
        { text: "$\\sin(-20^\\circ)$", correct: true, feedback: "Negating the angle mirrors the point across the x-axis and flips the sine." },
        { text: "$\\sin 200^\\circ$", correct: true, feedback: "Quadrant III (negative), reference angle $20^\\circ$." },
        { text: "$\\sin 340^\\circ$", correct: true, feedback: "Quadrant IV (negative), reference angle $20^\\circ$." },
        {
          text: "$\\cos 110^\\circ$",
          correct: true,
          feedback: "Quadrant II (cosine negative), reference angle $70^\\circ$, and $\\cos 70^\\circ = \\sin 20^\\circ$ by the co-function fact.",
        },
        { text: "$\\sin 160^\\circ$", feedback: "Quadrant II has positive sine: $\\sin 160^\\circ = +\\sin 20^\\circ$." },
        { text: "$\\cos 70^\\circ$", feedback: "$\\cos 70^\\circ = \\sin 20^\\circ$, but with a plus sign: $70^\\circ$ is in quadrant I." },
      ],
    },
    {
      type: "numeric",
      id: "t1-m-q9",
      variant: "mastery",
      question: "$\\sin\\theta\\cos\\theta = 0.4$. Find $\\tan\\theta + \\cot\\theta$.",
      answer: 2.5,
      tolerance: 0.001,
      solution:
        "$\\tan\\theta + \\cot\\theta = \\dfrac{\\sin\\theta}{\\cos\\theta} + \\dfrac{\\cos\\theta}{\\sin\\theta} = \\dfrac{\\sin^2\\theta + \\cos^2\\theta}{\\sin\\theta\\cos\\theta} = \\dfrac{1}{0.4} = 2.5$.",
      commonMistakes: [
        { answer: 0.4, tolerance: 0.001, feedback: "The common denominator is $\\sin\\theta\\cos\\theta$, so the product ends up *underneath*: $\\frac{1}{0.4}$." },
      ],
    },
    {
      type: "numeric",
      id: "t1-m-q10",
      variant: "mastery",
      question: "Evaluate $\\sin(-1110^\\circ) + \\cos 1110^\\circ$ to 3 decimal places.",
      answer: (Math.sqrt(3) - 1) / 2,
      tolerance: 0.001,
      solution:
        "$1110^\\circ$ is coterminal with $30^\\circ$. So $\\sin(-1110^\\circ) = -\\sin 30^\\circ = -\\tfrac12$ and $\\cos 1110^\\circ = \\cos 30^\\circ = \\tfrac{\\sqrt3}{2}$. Sum: $\\frac{\\sqrt3 - 1}{2} \\approx 0.366$.",
      commonMistakes: [
        { answer: (Math.sqrt(3) + 1) / 2, tolerance: 0.001, feedback: "Sine flips sign with the angle: $\\sin(-1110^\\circ) = -\\sin 1110^\\circ$." },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "You can now find the value at any angle. Chapter 2 asks a different question: what does the *whole collection* of those values look like when you plot them against the angle? The circle unwraps into a wave — and that is the form calculus consumes.",
    },
  ]),
};

export const trigChapter1Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lessonMastery,
];
