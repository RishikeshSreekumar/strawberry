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
        "So $\\sin 400^\\circ = \\sin 40^\\circ$ — 400° is one full turn plus 40°, and the extra turn changed nothing. Likewise $\\cos(-30^\\circ) = \\cos 330^\\circ$.\n\nTo reduce an angle, subtract or add 360° until you land in $[0^\\circ, 360^\\circ)$:",
    },
    {
      type: "math",
      latex: "1110^\\circ - 3(360^\\circ) = 1110^\\circ - 1080^\\circ = 30^\\circ",
    },
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
      type: "quiz",
      id: "t1-2-q1",
      variant: "practice",
      question: "Which angle is coterminal with $-100^\\circ$?",
      options: [
        { text: "$260^\\circ$", correct: true, feedback: "$-100 + 360 = 260$. Same terminal point, third quadrant." },
        { text: "$100^\\circ$", feedback: "That is the reflection, not the same point. $100^\\circ$ is in quadrant II; $-100^\\circ$ is in quadrant III." },
        { text: "$-260^\\circ$", feedback: "$-260$ and $-100$ differ by 160°, not a whole turn." },
      ],
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
    {
      type: "callout",
      variant: "definition",
      title: "Reference angle",
      content:
        "The **reference angle** of $\\theta$ is the acute angle between its terminal side and the x-axis (never the y-axis). For $\\theta$ in $[0^\\circ, 360^\\circ)$:\nQ I: $\\theta$  ·  Q II: $180^\\circ - \\theta$  ·  Q III: $\\theta - 180^\\circ$  ·  Q IV: $360^\\circ - \\theta$.",
    },
    {
      type: "text",
      content:
        "Worked example: $\\cos 210^\\circ$.\n\nStep 1 — quadrant III, so $x$ is negative: the answer is negative.\nStep 2 — reference angle is $210^\\circ - 180^\\circ = 30^\\circ$.\nStep 3 — the size is $\\cos 30^\\circ = \\frac{\\sqrt3}{2}$, which you re-derive from the half-equilateral triangle if needed.",
    },
    { type: "math", latex: "\\cos 210^\\circ = -\\frac{\\sqrt{3}}{2}" },
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
    {
      type: "text",
      content:
        "Try a second one without looking: $\\sin 315^\\circ$. Quadrant IV means $y < 0$, so negative. Reference angle $360^\\circ - 315^\\circ = 45^\\circ$, whose sine is $\\frac{\\sqrt2}{2}$. Therefore $\\sin 315^\\circ = -\\frac{\\sqrt{2}}{2}$.\n\nThat is the whole method, and it works for every angle in the course.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "The two classic errors",
      content:
        "**Measuring to the y-axis.** The reference angle is always to the *horizontal* axis. For $120^\\circ$ it is $60^\\circ$, not $30^\\circ$.\n**Getting the size right and the sign wrong.** Do the quadrant check first, before the arithmetic, and write the sign down before you compute anything.",
    },
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
    {
      type: "text",
      content:
        "The identity earns its keep as a **converter**: given one of sine and cosine, it produces the other, up to a sign you settle with the quadrant.\n\nExample: $\\sin\\theta = \\frac{3}{5}$ and $\\theta$ is in quadrant II. Find $\\cos\\theta$.",
    },
    {
      type: "math",
      latex:
        "\\cos^2\\theta = 1 - \\left(\\tfrac{3}{5}\\right)^2 = 1 - \\tfrac{9}{25} = \\tfrac{16}{25} \\quad\\Longrightarrow\\quad \\cos\\theta = \\pm\\tfrac{4}{5}",
    },
    {
      type: "text",
      content:
        "The algebra hands you both signs; the geometry picks one. Quadrant II has $x < 0$, so $\\cos\\theta = -\\frac{4}{5}$.",
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
    {
      type: "text",
      content:
        "Run the drill. Take $\\theta = 150^\\circ$:\n\nQuadrant II → $x$ negative, $y$ positive. Reference angle $180^\\circ - 150^\\circ = 30^\\circ$. Sizes from the half-equilateral triangle: $\\cos 30^\\circ = \\frac{\\sqrt3}{2}$, $\\sin 30^\\circ = \\frac12$. Attach the signs:",
    },
    {
      type: "math",
      latex:
        "\\left(\\cos 150^\\circ,\\ \\sin 150^\\circ\\right) = \\left(-\\tfrac{\\sqrt{3}}{2},\\ \\tfrac{1}{2}\\right)",
    },
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
