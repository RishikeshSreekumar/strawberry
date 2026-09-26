import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Trigonometry Chapter 0 — Angles and Ratios: Why Trigonometry Exists.
 * Establishes sin/cos/tan as ratios fixed by the angle alone; everything
 * later in the course (unit circle, waves, identities) is built on this.
 * Consumed by scripts/seed-trigonometry.ts and the rendering smoke test.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "the-unreachable-measurement",
  title: "0.1 · The Unreachable Measurement",
  position: 1,
  blocks: blocks([
    {
      type: "video",
      src: "/videos/trig-0-angles-and-ratios.mp4",
      poster: "/videos/trig-0-angles-and-ratios.jpg",
      title: "Chapter 0 overview video",
      caption:
        "A narrated walk through the whole chapter. Watch it now for the big picture, or come back to it as a recap.",
    },
    {
      type: "text",
      content:
        "There is a tree in front of you. How tall is it?\n\nYou could climb it with a tape measure. You could cut it down and lay it flat. Both work; neither is a method. And neither one helps at all with the distance to a ship on the horizon, the height of a mountain, or the radius of the Earth — none of which you can reach.\n\nBut here is something you *can* do standing on the ground: measure the tree's **shadow**, and measure the **angle** from the tip of the shadow up to the top of the tree.",
    },
    {
      type: "callout",
      variant: "info",
      title: "The trade this whole subject is built on",
      content:
        "Lengths that are out of reach are hard. Angles are easy — you only need to stand in one place and sight along a line. Trigonometry is the machinery that turns an angle you *can* measure into a length you *cannot*.",
    },
    {
      type: "text",
      content:
        "Sun angle, shadow, and tree form a right triangle. The shadow lies along the ground, the tree stands vertical, and the sunbeam grazing the treetop is the slanted side. Drag the sun angle below and watch the triangle respond.",
    },
    {
      type: "interactive",
      config: {
        component: "right-triangle-explorer",
        initialAngle: 40,
        minAngle: 15,
        maxAngle: 75,
        initialScale: 6,
        minScale: 3,
        maxScale: 10,
        ratios: ["tan"],
        angleLabel: "\\theta",
        unit: "m",
        caption:
          "The angle to the treetop and the shadow on the ground are both measurable. The height is not — but it is pinned down completely by those two.",
      },
    },
    {
      type: "text",
      content:
        "Notice what happened when you moved only the *size* slider: the shadow got longer, the tree got taller, and the number at the bottom — the ratio of height to shadow — did not budge. That number depends on the angle and nothing else.\n\nThat is the entire trick. If you know the angle, you know the ratio. If you know the ratio and one side, you know the other side.",
    },
    {
      type: "math",
      latex:
        "\\text{height} = \\text{shadow} \\times \\underbrace{(\\text{a number fixed by the sun's angle})}_{\\text{this is what we will learn to name}}",
    },
    {
      type: "text",
      content:
        "A shadow 12 m long, and a sun angle of 40°, gives a ratio of about 0.839:",
    },
    { type: "math", latex: "\\text{height} = 12 \\times 0.839 \\approx 10.1 \\text{ m}" },
    {
      type: "quiz",
      id: "t0-1-q1",
      variant: "concept",
      question:
        "Two trees stand side by side at the same moment. One is twice as tall as the other. What is true of their shadows?",
      options: [
        {
          text: "The taller tree's shadow is twice as long, and both trees give the same height-to-shadow ratio.",
          correct: true,
          feedback:
            "Same sun, same angle, same ratio. The sizes differ; the ratio does not.",
        },
        {
          text: "The taller tree's shadow is twice as long, so its ratio is twice as large.",
          feedback:
            "Height doubled *and* shadow doubled. Doubling top and bottom of a fraction leaves it unchanged.",
        },
        {
          text: "Both shadows are the same length, since the sun is the same.",
          feedback:
            "The sun's angle is the same, but a taller object casts a longer shadow at that angle.",
        },
      ],
      hint: "Write both fractions out and compare them.",
    },
    {
      type: "text",
      content:
        "The rest of Chapter 0 is about that ratio: proving it really is fixed by the angle (0.2), giving the three useful versions of it names (0.3), and using them to finish off any right triangle you are handed (0.4).",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Keep this picture",
      content:
        "Angle in, ratio out. Every formula in this course — even the wave graphs of Chapter 2 — is a descendant of that one sentence.",
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "similar-triangles-the-one-fact",
  title: "0.2 · Similar Triangles: The One Fact",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "Lesson 0.1 leaned on a claim that was never proved: *the ratio depends only on the angle*. It comes from a single fact of geometry, and it is worth being able to state exactly.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Similar triangles",
      content:
        "Two triangles are **similar** when their angles match. Similar triangles are the same shape at different sizes: every side of the second is the same multiple $k$ of the matching side of the first.",
    },
    {
      type: "text",
      content:
        "Now take a right triangle with an acute angle $\\theta$. Any other right triangle with that same angle $\\theta$ is automatically similar to it — the third angle has no choice, since the three angles must total 180°:",
    },
    { type: "math", latex: "90^\\circ + \\theta + (\\text{third angle}) = 180^\\circ" },
    {
      type: "text",
      content:
        "So fixing one acute angle in a right triangle fixes the shape entirely. Only the size is left free. And now watch what happens to a ratio of two sides when the size changes by a factor $k$:",
    },
    {
      type: "math",
      latex:
        "\\frac{k \\cdot \\text{opposite}}{k \\cdot \\text{hypotenuse}} = \\frac{\\text{opposite}}{\\text{hypotenuse}}",
    },
    {
      type: "text",
      content:
        "The $k$ cancels. The lengths scaled; the ratio did not. That cancellation is the whole foundation of trigonometry — everything else in this course is bookkeeping on top of it.",
    },
    {
      type: "interactive",
      config: {
        component: "right-triangle-explorer",
        initialAngle: 35,
        minAngle: 10,
        maxAngle: 80,
        initialScale: 4,
        minScale: 2,
        maxScale: 10,
        ratios: ["sin", "cos", "tan"],
        caption:
          "Size slider: all three lengths change, all three ratios freeze. Angle slider: the ratios finally move. Try to make a ratio change using only the size slider — you cannot.",
      },
    },
    {
      type: "callout",
      variant: "warning",
      title: "The misconception to kill now",
      content:
        "\"A bigger triangle has a bigger sine.\" No. $\\sin 30^\\circ$ is $0.5$ in a triangle the size of this page and $0.5$ in a triangle the size of a continent. The ratio has no memory of the size, because the scale factor cancels top and bottom.",
    },
    {
      type: "table",
      headers: ["Triangle", "Opposite", "Hypotenuse", "opposite / hypotenuse"],
      rows: [
        ["A", "3", "6", "0.5"],
        ["B (twice A)", "6", "12", "0.5"],
        ["C (ten times A)", "30", "60", "0.5"],
      ],
    },
    {
      type: "quiz",
      id: "t0-2-q1",
      variant: "concept",
      question:
        "In a right triangle, the acute angle $\\theta$ satisfies $\\dfrac{\\text{opposite}}{\\text{hypotenuse}} = 0.6$. A second right triangle has the same angle $\\theta$ but sides three times as long. What is its opposite-over-hypotenuse ratio?",
      options: [
        { text: "$0.6$", correct: true, feedback: "Same angle, same shape, same ratio. Scaling cancels." },
        { text: "$1.8$", feedback: "You scaled the numerator only. The hypotenuse tripled too." },
        { text: "$0.2$", feedback: "You divided by 3 instead. Both sides scale together, so nothing changes." },
        { text: "It cannot be found without the actual side lengths.", feedback: "The angle alone is enough — that is the point of this lesson." },
      ],
    },
    {
      type: "quiz",
      id: "t0-2-q2",
      variant: "practice",
      question:
        "A right triangle has legs 3 and 4 and hypotenuse 5. A similar triangle has hypotenuse 15. What is its shorter leg?",
      options: [
        { text: "$9$", correct: true, feedback: "The scale factor is $15/5 = 3$, so $3 \\times 3 = 9$." },
        { text: "$13$", feedback: "You added 10 to the leg. Similar triangles scale by multiplication, not addition." },
        { text: "$5$", feedback: "That would be $3 + 2$; check the scale factor $15 \\div 5$." },
      ],
      hint: "Find the scale factor from the hypotenuses first.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "What you now own",
      content:
        "Each acute angle names one shape of right triangle, and each shape has fixed side ratios. Those ratios deserve names — that is lesson 0.3.",
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "naming-the-ratios",
  title: "0.3 · Naming the Ratios",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "A right triangle has three sides, so there are six ratios you could form from pairs of them. Three of the six carry the load; the other three are just their reciprocals (Chapter 1 picks those up).\n\nFirst, the naming. Fix an acute angle $\\theta$. Relative to *that angle*:",
    },
    {
      type: "table",
      headers: ["Side", "Which one it is"],
      rows: [
        ["hypotenuse", "The long side, opposite the right angle. It never changes role."],
        ["opposite", "The side across the triangle from $\\theta$ — it does not touch $\\theta$."],
        ["adjacent", "The remaining side, running from $\\theta$ to the right angle."],
      ],
    },
    {
      type: "callout",
      variant: "warning",
      title: "Opposite and adjacent are relative",
      content:
        "Swap your attention to the *other* acute angle and the two legs swap names. The hypotenuse is the only side with a permanent identity. Always name the sides after picking your angle.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The three ratios",
      content:
        "For an acute angle $\\theta$ in a right triangle:\n$\\sin \\theta = \\dfrac{\\text{opposite}}{\\text{hypotenuse}}$,  $\\cos \\theta = \\dfrac{\\text{adjacent}}{\\text{hypotenuse}}$,  $\\tan \\theta = \\dfrac{\\text{opposite}}{\\text{adjacent}}$.",
    },
    {
      type: "text",
      content:
        "The names are abbreviations of *sine*, *cosine* and *tangent*. They are labels stuck on ratios that already existed — lesson 0.2 proved the ratios are well defined before anyone named them.",
    },
    {
      type: "interactive",
      config: {
        component: "right-triangle-explorer",
        initialAngle: 30,
        minAngle: 5,
        maxAngle: 85,
        initialScale: 5,
        minScale: 2,
        maxScale: 10,
        showScale: true,
        ratios: ["sin", "cos", "tan"],
        caption:
          "Push the angle toward 0°: the opposite side collapses, so sine goes to 0 and cosine goes to 1. Push it toward 90° and they trade places, while tangent runs away.",
      },
    },
    {
      type: "text",
      content:
        "Two things you can read straight off that slider, without memorizing anything:\n\n**Sine and cosine never exceed 1.** They each divide a leg by the hypotenuse, and the hypotenuse is the longest side. A fraction with the biggest number underneath cannot reach 1.\n\n**Tangent has no ceiling.** It divides one leg by the other. As $\\theta$ approaches 90° the adjacent side shrinks toward zero, and the ratio blows up.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "SOH-CAH-TOA",
      content:
        "The usual mnemonic: **S**ine = **O**pposite/**H**ypotenuse, **C**osine = **A**djacent/**H**ypotenuse, **T**angent = **O**pposite/**A**djacent. Treat it as a *label* for something you can re-derive from a drawing — not as the reason the ratios exist. Anyone who only has the mnemonic is stuck the moment the triangle is drawn sideways.",
    },
    {
      type: "text",
      content:
        "There is also a relationship worth spotting early. Divide sine by cosine:",
    },
    {
      type: "math",
      latex:
        "\\frac{\\sin\\theta}{\\cos\\theta} = \\frac{\\text{opp}/\\text{hyp}}{\\text{adj}/\\text{hyp}} = \\frac{\\text{opp}}{\\text{adj}} = \\tan\\theta",
    },
    {
      type: "text",
      content:
        "So tangent is not a third independent idea — it is sine over cosine. That is your first identity, and you derived it rather than memorized it.",
    },
    {
      type: "quiz",
      id: "t0-3-q1",
      variant: "practice",
      question:
        "A right triangle has legs 5 (opposite $\\theta$) and 12 (adjacent to $\\theta$), and hypotenuse 13. What is $\\cos\\theta$?",
      options: [
        { text: "$\\dfrac{12}{13}$", correct: true, feedback: "Adjacent over hypotenuse." },
        { text: "$\\dfrac{5}{13}$", feedback: "That is $\\sin\\theta$ — the opposite side over the hypotenuse." },
        { text: "$\\dfrac{12}{5}$", feedback: "That is $\\dfrac{1}{\\tan\\theta}$: leg over leg, no hypotenuse involved." },
      ],
    },
    {
      type: "quiz",
      id: "t0-3-q2",
      variant: "concept",
      question:
        "Someone claims a right triangle has an acute angle with $\\sin\\theta = 1.4$. What is wrong?",
      options: [
        {
          text: "Sine is a leg divided by the hypotenuse, and the hypotenuse is the longest side, so sine cannot exceed 1.",
          correct: true,
          feedback:
            "Exactly. The value $1.4$ would need a leg longer than the hypotenuse.",
        },
        {
          text: "Nothing is wrong; sine can be any positive number.",
          feedback: "That describes tangent, which has no upper bound. Sine is capped at 1.",
        },
        {
          text: "Sine is only defined for angles above 45°.",
          feedback: "Sine is defined for every acute angle here, and in Chapter 1 for every angle at all.",
        },
      ],
    },
    {
      type: "quiz",
      id: "t0-3-q3",
      variant: "concept",
      question:
        "In the same triangle, $\\alpha$ and $\\beta$ are the two acute angles. What is the relationship between $\\sin\\alpha$ and $\\cos\\beta$?",
      options: [
        {
          text: "They are equal — the side opposite $\\alpha$ is the side adjacent to $\\beta$.",
          correct: true,
          feedback:
            "This is the co- in cosine: $\\cos\\beta = \\sin(90^\\circ - \\beta) = \\sin\\alpha$.",
        },
        { text: "They are reciprocals.", feedback: "Both are a leg over the same hypotenuse, so neither flips." },
        { text: "They add to 1.", feedback: "The *angles* add to 90°; the ratios are simply equal." },
      ],
      hint: "Draw one triangle and label the sides twice — once from each acute angle.",
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "solving-right-triangles",
  title: "0.4 · Solving Right Triangles",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "To **solve** a triangle is to find every side and every angle. In a right triangle you already know one angle (90°), so two more facts are enough — as long as at least one of them is a side.",
    },
    {
      type: "callout",
      variant: "info",
      title: "The procedure, once and for all",
      content:
        "1. Draw it and mark what you know.\n2. Pick the acute angle you are working from, and label the sides opposite / adjacent / hypotenuse *relative to it*.\n3. Choose the ratio that connects the side you know to the side you want.\n4. Solve. Then mop up: the third angle is $90^\\circ$ minus the one you have, and Pythagoras checks the last side.",
    },
    {
      type: "text",
      content:
        "**Pattern 1 — angle and a side, find another side.** A ladder leans against a wall at 65° to the ground, and the ladder is 4 m long. How far up the wall does it reach?\n\nThe ladder is the hypotenuse. The height is opposite the 65° angle. Opposite and hypotenuse means sine:",
    },
    { type: "math", latex: "\\sin 65^\\circ = \\frac{h}{4} \\quad\\Longrightarrow\\quad h = 4\\sin 65^\\circ \\approx 3.63\\text{ m}" },
    {
      type: "text",
      content:
        "**Pattern 2 — the unknown is underneath.** The same ladder makes a 65° angle, and its foot is 1.7 m from the wall. How long is the ladder?\n\nNow 1.7 m is the adjacent side and the ladder is still the hypotenuse, so use cosine — but the unknown sits in the denominator:",
    },
    {
      type: "math",
      latex:
        "\\cos 65^\\circ = \\frac{1.7}{L} \\quad\\Longrightarrow\\quad L = \\frac{1.7}{\\cos 65^\\circ} \\approx 4.02\\text{ m}",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Where people lose marks",
      content:
        "When the unknown is in the denominator, you divide by the ratio; when it is in the numerator, you multiply. Deciding which one *before* reaching for the calculator prevents almost every arithmetic slip in this chapter.",
    },
    {
      type: "text",
      content:
        "**Pattern 3 — two sides, find the angle.** A ramp rises 0.8 m over a horizontal run of 5 m. What angle does it make with the ground?\n\nOpposite over adjacent is tangent, so you need the angle whose tangent is $0.8/5 = 0.16$. That question — *which angle produced this ratio?* — is what the inverse functions answer:",
    },
    {
      type: "math",
      latex: "\\theta = \\tan^{-1}(0.16) \\approx 9.1^\\circ",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Inverse trig, for now",
      content:
        "$\\sin^{-1}$, $\\cos^{-1}$ and $\\tan^{-1}$ (also written $\\arcsin$, $\\arccos$, $\\arctan$) run the machine backwards: ratio in, angle out. The $-1$ is not a reciprocal — $\\sin^{-1} x$ is *not* $1/\\sin x$. For acute angles this is unambiguous; Chapter 2 revisits it, because past 90° a ratio no longer names a single angle.",
    },
    {
      type: "interactive",
      config: {
        component: "right-triangle-explorer",
        initialAngle: 65,
        minAngle: 20,
        maxAngle: 85,
        initialScale: 4,
        minScale: 2,
        maxScale: 8,
        showScale: true,
        ratios: ["sin", "cos", "tan"],
        unit: "m",
        caption:
          "The ladder problem, live. Set the angle to 65° and the size to 4 m: the vertical reading is the height up the wall, and it agrees with $4\\sin 65^\\circ$.",
      },
    },
    {
      type: "text",
      content:
        "Two words that show up in every exam version of these problems:\n\n**Angle of elevation** — measured *up* from the horizontal, from you to the object.\n**Angle of depression** — measured *down* from the horizontal, from you to the object.\n\nThey are always measured from a horizontal line, never from a vertical one. A cliff-top observer looking down at a boat with a 20° angle of depression sees the boat looking up at 20° elevation: the two horizontals are parallel, so the angles are alternate angles and equal.",
    },
    {
      type: "quiz",
      id: "t0-4-q1",
      variant: "practice",
      question:
        "A kite string 30 m long makes a 50° angle with the ground. Ignoring sag, how high is the kite?",
      options: [
        { text: "$30\\sin 50^\\circ \\approx 23.0$ m", correct: true, feedback: "Height is opposite the angle, the string is the hypotenuse: sine." },
        { text: "$30\\cos 50^\\circ \\approx 19.3$ m", feedback: "That is the horizontal distance from you to the point below the kite." },
        { text: "$30\\tan 50^\\circ \\approx 35.8$ m", feedback: "Tangent needs the ground distance, not the string. Also: the kite cannot be higher than the string is long." },
      ],
    },
    {
      type: "quiz",
      id: "t0-4-q2",
      variant: "practice",
      question:
        "From a lighthouse 40 m tall, a boat has an angle of depression of 12°. How far is the boat from the base of the lighthouse?",
      options: [
        { text: "$\\dfrac{40}{\\tan 12^\\circ} \\approx 188$ m", correct: true, feedback: "In the triangle the 40 m is opposite the 12° angle and the distance is adjacent, so $\\tan 12^\\circ = 40/d$." },
        { text: "$40\\tan 12^\\circ \\approx 8.5$ m", feedback: "You multiplied instead of divided — and a shallow 12° sighting must mean the boat is far away, not close." },
        { text: "$40\\sin 12^\\circ \\approx 8.3$ m", feedback: "Sine involves the hypotenuse (the line of sight), which is not what was asked." },
      ],
      hint: "The angle of depression at the top equals the angle of elevation at the boat. Which sides does it sit between?",
    },
    {
      type: "quiz",
      id: "t0-4-q3",
      variant: "concept",
      question:
        "A right triangle has hypotenuse 10 and one leg 6. Which computation gives the angle between that leg and the hypotenuse?",
      options: [
        { text: "$\\cos^{-1}(0.6)$", correct: true, feedback: "That leg is adjacent to the angle, over the hypotenuse: cosine, then inverted." },
        { text: "$\\sin^{-1}(0.6)$", feedback: "That gives the *other* acute angle — the one the leg is opposite." },
        { text: "$\\tan^{-1}(0.6)$", feedback: "Tangent compares the two legs; here one of your lengths is the hypotenuse." },
      ],
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "special-angles-derived",
  title: "0.5 · Special Angles, Derived",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "Most trig values are irrational decimals you take from a calculator. A handful are exact, and they appear so often that people memorize a table of them — badly, and then forget it before the exam.\n\nDon't. There are two triangles you can draw from memory in ten seconds, and every one of those values falls out of them.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "The rule for this lesson",
      content:
        "Do not memorize the table. Redraw the triangle. If you can draw an equilateral triangle and a square, you can regenerate every exact value on demand — including the ones you thought you had forgotten.",
    },
    {
      type: "text",
      content:
        "**Triangle 1: half an equilateral triangle, for 30° and 60°.**\n\nStart with an equilateral triangle of side 2 — all angles 60°. Cut it down the middle. The cut halves the top angle into 30° and lands perpendicular on the base, halving it to 1. Pythagoras gives the height:",
    },
    { type: "math", latex: "h = \\sqrt{2^2 - 1^2} = \\sqrt{3}" },
    {
      type: "text",
      content:
        "So you have a right triangle with angles 30°, 60°, 90° and sides $1$, $\\sqrt{3}$, $2$. Read the ratios off it, from the 30° corner (opposite $= 1$, adjacent $= \\sqrt{3}$, hypotenuse $= 2$):",
    },
    {
      type: "math",
      latex:
        "\\sin 30^\\circ = \\tfrac{1}{2}, \\quad \\cos 30^\\circ = \\tfrac{\\sqrt{3}}{2}, \\quad \\tan 30^\\circ = \\tfrac{1}{\\sqrt{3}}",
    },
    {
      type: "text",
      content:
        "Then look at the *same drawing* from the 60° corner — opposite and adjacent swap:",
    },
    {
      type: "math",
      latex:
        "\\sin 60^\\circ = \\tfrac{\\sqrt{3}}{2}, \\quad \\cos 60^\\circ = \\tfrac{1}{2}, \\quad \\tan 60^\\circ = \\sqrt{3}",
    },
    {
      type: "text",
      content:
        "**Triangle 2: half a square, for 45°.**\n\nTake a square of side 1 and cut along the diagonal. The two acute angles are both 45°, the legs are both 1, and the diagonal is $\\sqrt{1^2 + 1^2} = \\sqrt{2}$:",
    },
    {
      type: "math",
      latex:
        "\\sin 45^\\circ = \\cos 45^\\circ = \\tfrac{1}{\\sqrt{2}} = \\tfrac{\\sqrt{2}}{2}, \\quad \\tan 45^\\circ = 1",
    },
    {
      type: "text",
      content:
        "That is the whole table — generated, not recalled. Here it is assembled, purely so you can check your own derivation:",
    },
    {
      type: "table",
      headers: ["$\\theta$", "$\\sin\\theta$", "$\\cos\\theta$", "$\\tan\\theta$", "Comes from"],
      rows: [
        ["$30^\\circ$", "$\\frac{1}{2}$", "$\\frac{\\sqrt{3}}{2}$", "$\\frac{1}{\\sqrt{3}}$", "half equilateral"],
        ["$45^\\circ$", "$\\frac{\\sqrt{2}}{2}$", "$\\frac{\\sqrt{2}}{2}$", "$1$", "half square"],
        ["$60^\\circ$", "$\\frac{\\sqrt{3}}{2}$", "$\\frac{1}{2}$", "$\\sqrt{3}$", "half equilateral, other corner"],
      ],
    },
    {
      type: "interactive",
      config: {
        component: "right-triangle-explorer",
        initialAngle: 45,
        minAngle: 30,
        maxAngle: 60,
        initialScale: 6,
        minScale: 3,
        maxScale: 9,
        showScale: false,
        ratios: ["sin", "cos", "tan"],
        caption:
          "Park the slider on 30°, 45° and 60° and check the decimals against your derived exact values: 0.5, 0.707, 0.866, 1.732.",
      },
    },
    {
      type: "callout",
      variant: "warning",
      title: "A sanity check that costs nothing",
      content:
        "Sine grows as the angle grows; cosine shrinks. So $\\sin 30^\\circ < \\sin 45^\\circ < \\sin 60^\\circ$. If your recalled value has $\\sin 60^\\circ$ smaller than $\\sin 30^\\circ$, you have swapped sine and cosine — and the drawing will say so immediately.",
    },
    {
      type: "quiz",
      id: "t0-5-q1",
      variant: "practice",
      question: "Without a calculator: $\\cos 60^\\circ$ equals",
      options: [
        { text: "$\\dfrac{1}{2}$", correct: true, feedback: "From the 60° corner of the half-equilateral triangle, adjacent $= 1$ over hypotenuse $= 2$." },
        { text: "$\\dfrac{\\sqrt{3}}{2}$", feedback: "That is $\\cos 30^\\circ$ (and $\\sin 60^\\circ$). Check which corner you are standing in." },
        { text: "$\\sqrt{3}$", feedback: "That is $\\tan 60^\\circ$ — and no cosine can exceed 1." },
      ],
    },
    {
      type: "quiz",
      id: "t0-5-q2",
      variant: "concept",
      question:
        "Why is $\\tan 45^\\circ$ exactly 1, with no square roots anywhere?",
      options: [
        {
          text: "At 45° the two legs are equal, and tangent is one leg divided by the other.",
          correct: true,
          feedback: "The $\\sqrt{2}$ lives in the hypotenuse, and tangent never touches the hypotenuse.",
        },
        { text: "Because $45$ is half of $90$.", feedback: "True but irrelevant — the ratio comes from the equal legs, not the arithmetic of the angle." },
        { text: "Because $\\sin 45^\\circ = \\cos 45^\\circ = 1$.", feedback: "Both equal $\\frac{\\sqrt{2}}{2} \\approx 0.707$, not 1. Their *ratio* is 1." },
      ],
    },
    {
      type: "quiz",
      id: "t0-5-q3",
      variant: "practice",
      question:
        "A right triangle has a 30° angle and a hypotenuse of 8. How long is the side opposite the 30° angle?",
      options: [
        { text: "$4$", correct: true, feedback: "$8\\sin 30^\\circ = 8 \\times \\frac12 = 4$ — the side opposite 30° is always half the hypotenuse." },
        { text: "$4\\sqrt{3} \\approx 6.93$", feedback: "That is the side opposite the 60° angle." },
        { text: "$8\\sqrt{3}$", feedback: "Longer than the hypotenuse — impossible in a right triangle." },
      ],
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "degrees-and-radians",
  title: "0.6 · Degrees and Radians",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "Why are there 360 degrees in a full turn? Because Babylonian astronomers counted in sixties and a year is roughly 360 days. It is a convention — a good one for splitting circles into whole-number pieces, and an arbitrary one for everything else.\n\nThere is a second unit with nothing arbitrary in it, built out of the circle itself.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Radian",
      content:
        "Take a circle of radius $r$ and lay an arc of length $r$ along its edge. The angle at the centre that this arc subtends is **one radian**. In general, an angle in radians is arc length divided by radius:\n$\\theta = \\dfrac{s}{r}$",
    },
    {
      type: "text",
      content:
        "That definition has a consequence worth pausing on: a length divided by a length has no units. A radian is a pure number. That is precisely why the calculus formulas of Chapter 5 come out clean in radians and messy in degrees.\n\nHow many radians in a full turn? The arc of a full turn is the circumference, $2\\pi r$, so:",
    },
    { type: "math", latex: "\\theta_{\\text{full turn}} = \\frac{2\\pi r}{r} = 2\\pi" },
    {
      type: "text",
      content:
        "A full turn is $2\\pi$ radians and also 360°, which gives the one conversion fact you need. Everything else is proportion:",
    },
    { type: "math", latex: "180^\\circ = \\pi \\text{ radians}" },
    {
      type: "table",
      headers: ["Degrees", "Radians", "Fraction of a turn"],
      rows: [
        ["$30^\\circ$", "$\\frac{\\pi}{6}$", "1/12"],
        ["$45^\\circ$", "$\\frac{\\pi}{4}$", "1/8"],
        ["$60^\\circ$", "$\\frac{\\pi}{3}$", "1/6"],
        ["$90^\\circ$", "$\\frac{\\pi}{2}$", "1/4"],
        ["$180^\\circ$", "$\\pi$", "1/2"],
        ["$360^\\circ$", "$2\\pi$", "1"],
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Convert without memorizing the table",
      content:
        "Degrees to radians: multiply by $\\frac{\\pi}{180}$. Radians to degrees: multiply by $\\frac{180}{\\pi}$. Pick the direction by asking which one cancels the unit you have. And keep the scale in your head: 1 radian $\\approx 57.3^\\circ$, so $\\pi \\approx 3.14$ radians really is about $180^\\circ$.",
    },
    {
      type: "text",
      content:
        "Radians also make arc length and sector area trivial. Rearranging the definition:",
    },
    { type: "math", latex: "s = r\\theta, \\qquad A_{\\text{sector}} = \\tfrac{1}{2} r^2 \\theta" },
    {
      type: "text",
      content:
        "Both formulas are only valid with $\\theta$ in radians. In degrees each one drags a conversion factor along — the first hint of the pattern that ends this course.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Foreshadowing (Chapter 5.6)",
      content:
        "In radians, $\\sin\\theta \\approx \\theta$ for small angles, and the derivative of $\\sin$ is exactly $\\cos$. In degrees, a factor of $\\frac{\\pi}{180}$ appears and never leaves — it rides along through every derivative you will ever take. Radians are not a harder unit; they are the unit that makes calculus stop bleeding constants.",
    },
    {
      type: "quiz",
      id: "t0-6-q1",
      variant: "practice",
      question: "Convert $135^\\circ$ to radians.",
      options: [
        { text: "$\\dfrac{3\\pi}{4}$", correct: true, feedback: "$135 \\times \\frac{\\pi}{180} = \\frac{135\\pi}{180} = \\frac{3\\pi}{4}$." },
        { text: "$\\dfrac{4\\pi}{3}$", feedback: "That is 240°. You flipped the fraction." },
        { text: "$\\dfrac{2\\pi}{3}$", feedback: "That is 120°. Reduce $\\frac{135}{180}$ again: it is $\\frac{3}{4}$, not $\\frac{2}{3}$." },
      ],
    },
    {
      type: "quiz",
      id: "t0-6-q2",
      variant: "practice",
      question:
        "A circle has radius 6 cm. What arc length does a central angle of $\\frac{\\pi}{3}$ cut off?",
      options: [
        { text: "$2\\pi \\approx 6.28$ cm", correct: true, feedback: "$s = r\\theta = 6 \\times \\frac{\\pi}{3} = 2\\pi$." },
        { text: "$360$ cm", feedback: "You converted to degrees and multiplied. $s = r\\theta$ needs radians, and mixing units gives a nonsensical size." },
        { text: "$\\dfrac{\\pi}{18}$ cm", feedback: "You divided by the radius instead of multiplying." },
      ],
    },
    {
      type: "quiz",
      id: "t0-6-q3",
      variant: "concept",
      question: "Why is a radian said to have no units?",
      options: [
        {
          text: "It is defined as arc length divided by radius — a length over a length, so the units cancel.",
          correct: true,
          feedback: "Which is exactly why it slots cleanly into formulas like $s = r\\theta$ and the calculus to come.",
        },
        { text: "Because $\\pi$ is irrational.", feedback: "Irrationality is about the number's decimal expansion, not its units." },
        { text: "Because radians are always written as multiples of $\\pi$.", feedback: "A notation habit, not a reason. 1 radian is a perfectly good angle with no $\\pi$ in it." },
      ],
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-0-mastery",
  title: "0.7 · Chapter 0 Mastery",
  position: 7,
  blocks: blocks([
    {
      type: "text",
      content:
        "One question per idea in the chapter. The standard to hold yourself to: you should be able to answer every one of these from a *drawing*, without a memorized table, and explain in a sentence why the answer is what it is.",
    },
    {
      type: "callout",
      variant: "info",
      title: "The chapter in four lines",
      content:
        "1. Fixing one acute angle of a right triangle fixes its shape; only the size is free.\n2. Scaling cancels in a ratio, so side ratios depend on the angle alone.\n3. Those ratios are named sine, cosine and tangent, and $\\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta}$.\n4. An angle is honestly measured as arc length per radius — the radian.",
    },
    {
      type: "quiz",
      id: "t0-m-q1",
      variant: "mastery",
      question:
        "A right triangle is drawn with the right angle at the *top* and the hypotenuse running down to the left. For the marked acute angle $\\theta$ at the bottom, which side is the hypotenuse?",
      options: [
        {
          text: "The side opposite the right angle, wherever it happens to be drawn.",
          correct: true,
          feedback:
            "Orientation is irrelevant. The hypotenuse is defined by its position relative to the right angle, not by being at the bottom or on the slant.",
        },
        { text: "The longest horizontal side.", feedback: "Nothing in the definition mentions horizontal. Rotate the page and this rule breaks." },
        { text: "The side sloping down to the left.", feedback: "It happens to be true in *this* drawing, which is exactly why it is a bad rule." },
      ],
    },
    {
      type: "quiz",
      id: "t0-m-q2",
      variant: "mastery",
      question:
        "Triangle A has angles 90°, 40°, 50° with hypotenuse 10. Triangle B has the same angles with hypotenuse 25. What is $\\dfrac{\\sin 40^\\circ \\text{ in A}}{\\sin 40^\\circ \\text{ in B}}$?",
      options: [
        { text: "$1$", correct: true, feedback: "Same angle means the same ratio, whatever the size. The quotient of two equal numbers is 1." },
        { text: "$\\dfrac{10}{25} = 0.4$", feedback: "That is the scale factor between the triangles — it cancels inside each ratio and never reaches the sine." },
        { text: "$2.5$", feedback: "The inverted scale factor. Sine has no memory of size." },
      ],
    },
    {
      type: "quiz",
      id: "t0-m-q3",
      variant: "mastery",
      question:
        "A slide drops 2.5 m over a slanted length of 6 m. What angle does it make with the horizontal?",
      options: [
        { text: "$\\sin^{-1}\\!\\left(\\dfrac{2.5}{6}\\right) \\approx 24.6^\\circ$", correct: true, feedback: "The drop is opposite the angle and the slide itself is the hypotenuse: sine, then inverted." },
        { text: "$\\tan^{-1}\\!\\left(\\dfrac{2.5}{6}\\right) \\approx 22.6^\\circ$", feedback: "Tangent needs the horizontal run, not the slanted length. 6 m is the hypotenuse here." },
        { text: "$\\cos^{-1}\\!\\left(\\dfrac{2.5}{6}\\right) \\approx 65.4^\\circ$", feedback: "That treats 2.5 as adjacent, which would give the angle at the top of the slide instead." },
      ],
      hint: "Which of the three given lengths touches the right angle at both ends?",
    },
    {
      type: "quiz",
      id: "t0-m-q4",
      variant: "mastery",
      question:
        "Give $\\sin 60^\\circ + \\cos 60^\\circ$ exactly, deriving rather than recalling.",
      options: [
        { text: "$\\dfrac{\\sqrt{3}+1}{2}$", correct: true, feedback: "$\\frac{\\sqrt3}{2} + \\frac12$. Both come off the half-equilateral triangle with sides $1, \\sqrt3, 2$." },
        { text: "$1$", feedback: "Tempting, but that would need $\\sin^2 + \\cos^2$, not $\\sin + \\cos$. Chapter 1.4 handles that one." },
        { text: "$\\dfrac{1+\\sqrt{2}}{2}$", feedback: "The $\\sqrt2$ comes from the half-square (45°), not the half-equilateral." },
      ],
    },
    {
      type: "quiz",
      id: "t0-m-q5",
      variant: "mastery",
      question:
        "A wheel of radius 0.4 m rolls without slipping through 3 m. Through what angle has it turned?",
      options: [
        { text: "$7.5$ radians", correct: true, feedback: "Rolling without slipping means the arc travelled equals the ground distance: $\\theta = s/r = 3/0.4$." },
        { text: "$1.2$ radians", feedback: "You multiplied $r\\theta$ with the wrong unknown. Here $s$ is known and $\\theta$ is not." },
        { text: "$7.5^\\circ$", feedback: "Right number, wrong unit. $s/r$ is radians by definition — about 430°, just over one full turn." },
      ],
      hint: "The definition of a radian is arc over radius. What is playing the role of the arc?",
    },
    {
      type: "quiz",
      id: "t0-m-q6",
      variant: "mastery",
      question:
        "Which single statement best explains why trigonometry works at all?",
      options: [
        {
          text: "In similar triangles the scale factor cancels out of any ratio of sides, so each angle determines its ratios.",
          correct: true,
          feedback:
            "Everything in this course descends from that cancellation — including the circle of Chapter 1 and the waves of Chapter 2.",
        },
        { text: "SOH-CAH-TOA lets you remember which ratio to use.", feedback: "A memory aid for a result. It explains nothing about why the ratios are well defined." },
        { text: "Every triangle's angles add to 180°.", feedback: "True, and it is used along the way — but it does not by itself pin the *ratios* down." },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "Everything so far has lived inside a right triangle, so every angle has been between 0° and 90°. But a wheel turns past 90° without difficulty, and a pendulum swings to negative angles. Chapter 1 lifts the triangle onto a circle, where the ratios become coordinates and the 90° ceiling disappears.",
    },
  ]),
};

export const trigChapter0Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lessonMastery,
];
