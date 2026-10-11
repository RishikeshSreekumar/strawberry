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
    { type: "heading", text: "Sun, shadow and tree as a right triangle" },
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
    { type: "heading", text: "Turning a ratio into a height" },
    {
      type: "worked-example",
      id: "t0-1-we1",
      title: "Worked example 1: the tree",
      problem:
        "A shadow 12 m long, and a sun angle of 40°, gives a ratio of about 0.839. How tall is the tree?",
      steps: [
        {
          text: "The ratio is height divided by shadow, and it is fixed by the 40° sun angle alone. So height is shadow times that ratio:",
          latex: "\\text{height} = 12 \\times 0.839 \\approx 10.1 \\text{ m}",
        },
      ],
      answer: "The tree is about 10.1 m tall.",
      tryFirst: false,
    },
    {
      type: "text",
      content:
        "You do not even need to know the sun's angle in degrees. Any object of known height standing in the same sunlight hands you the ratio directly, because the sun's angle is the same for everything nearby at that moment.",
    },
    {
      type: "worked-example",
      id: "t0-1-we2",
      title: "Worked example 2: borrowing the ratio from a stick",
      problem:
        "A 2 m vertical pole casts a shadow 1.5 m long. At the same moment a building casts a shadow 24 m long. How tall is the building?",
      steps: [
        {
          text: "Same sun, same angle, so the pole and the building share one height-to-shadow ratio. Read it off the pole:",
          latex: "\\frac{\\text{height}}{\\text{shadow}} = \\frac{2}{1.5} = \\frac{4}{3}",
        },
        {
          text: "Apply the same ratio to the building's shadow:",
          latex: "\\text{height} = 24 \\times \\frac{4}{3} = 32 \\text{ m}",
        },
        {
          text: "Sanity check: the pole is taller than its shadow, so the building must be taller than its 24 m shadow too. 32 m is.",
        },
      ],
      answer: "The building is 32 m tall.",
    },
    { type: "heading", text: "Check your understanding" },
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
      type: "numeric",
      id: "t0-1-q2",
      variant: "practice",
      question:
        "At a certain moment the height-to-shadow ratio for every object nearby is $0.75$. A flagpole's shadow is 12 m long. How tall is the flagpole?",
      answer: 9,
      unit: "m",
      hint: "The ratio is height over shadow. Which of the two do you know?",
      solution: "$\\text{height} = 0.75 \\times 12 = 9$ m.",
      commonMistakes: [
        { answer: 16, feedback: "You divided the shadow by the ratio. The ratio is height ÷ shadow, so height = ratio × shadow." },
      ],
    },
    {
      type: "quiz",
      id: "t0-1-q3",
      variant: "concept",
      question:
        "You want the height of a tree you cannot climb. Which pair of measurements, both taken from the ground, is enough?",
      options: [
        {
          text: "The length of its shadow and the angle from the shadow's tip up to the treetop.",
          correct: true,
          feedback: "The angle fixes the height-to-shadow ratio, and the shadow supplies the scale. Together they pin the height down.",
        },
        {
          text: "The angle from the shadow's tip to the treetop, measured twice to be sure.",
          feedback: "An angle alone fixes only the shape of the triangle, never its size. You need at least one length.",
        },
        {
          text: "The length of its shadow and the time of day.",
          feedback: "The time of day hints at the sun's angle but does not measure it (it depends on date and latitude too). Measure the angle itself.",
        },
        {
          text: "The length of its shadow and the length of your own shadow.",
          feedback: "Your shadow only helps if you also use your own height. Without a known height, two shadows give no ratio.",
        },
      ],
      hint: "A triangle needs a shape and a size. Which measurement gives each?",
    },
    {
      type: "quiz",
      id: "t0-1-q4",
      variant: "concept",
      multiple: true,
      question:
        "Select every change that alters the height-to-shadow ratio of a tree.",
      options: [
        {
          text: "The sun climbs higher in the sky.",
          correct: true,
          feedback: "A higher sun means a steeper angle, so shadows shrink relative to heights: the ratio grows.",
        },
        {
          text: "Evening comes and the sun sinks toward the horizon.",
          correct: true,
          feedback: "A lower sun is a shallower angle: shadows stretch and the ratio falls.",
        },
        {
          text: "The tree grows taller over the summer, at the same sun angle.",
          feedback: "Height and shadow grow together at a fixed angle. The ratio does not care about size.",
        },
        {
          text: "You measure in feet instead of metres.",
          feedback: "Both lengths change by the same conversion factor, which cancels in the ratio.",
        },
      ],
      hint: "Only one thing controls the ratio. Which options change it?",
    },
    {
      type: "numeric",
      id: "t0-1-q5",
      variant: "practice",
      question:
        "A 1.8 m tall person casts a shadow 2.4 m long. At the same moment, a tower's shadow is 40 m *longer* than the tower is tall. How tall is the tower?",
      answer: 120,
      unit: "m",
      hint: "Get the height-to-shadow ratio from the person, then write the tower's shadow in terms of its unknown height $h$.",
      solution:
        "The person gives $\\dfrac{\\text{height}}{\\text{shadow}} = \\dfrac{1.8}{2.4} = 0.75$, so every shadow is $\\dfrac{4}{3}$ of its height.\n\nFor the tower: shadow $= \\dfrac{4}{3}h$, and shadow $- h = 40$. So $\\dfrac{h}{3} = 40$ and $h = 120$ m.",
      commonMistakes: [
        { answer: 30, feedback: "You treated 40 m as the tower's whole shadow and multiplied by 0.75. Here 40 m is the *difference* between shadow and height." },
        { answer: 160, feedback: "That is the tower's shadow, not its height." },
      ],
    },
    {
      type: "numeric",
      id: "t0-1-q6",
      variant: "practice",
      question:
        "In the morning the height-to-shadow ratio is $\\dfrac{1}{\\sqrt3}$; at noon it is $\\sqrt3$. A tower's noon shadow is 40 m shorter than its morning shadow. How tall is the tower? Give your answer to 2 decimal places.",
      answer: 20 * Math.sqrt(3),
      tolerance: 0.01,
      unit: "m",
      hint: "Call the height $h$. Write each shadow as height divided by that moment's ratio, then use the 40 m difference.",
      solution:
        "Morning shadow $= \\dfrac{h}{1/\\sqrt3} = \\sqrt3\\,h$. Noon shadow $= \\dfrac{h}{\\sqrt3}$.\n\n$\\sqrt3\\,h - \\dfrac{h}{\\sqrt3} = 40 \\;\\Rightarrow\\; \\dfrac{2h}{\\sqrt3} = 40 \\;\\Rightarrow\\; h = 20\\sqrt3 \\approx 34.64$ m. (The shadows are 60 m and 20 m.)",
      commonMistakes: [
        { answer: 20, feedback: "That is the noon shadow, $\\frac{h}{\\sqrt3}$. The height is $\\sqrt3$ times that." },
        { answer: 60, feedback: "That is the morning shadow, $\\sqrt3\\,h$, not the height." },
        { answer: 40 * Math.sqrt(3), tolerance: 0.01, feedback: "You multiplied the 40 m difference by $\\sqrt3$. Set up both shadows in terms of $h$ and subtract them first." },
      ],
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
    { type: "heading", text: "Why one acute angle fixes the shape" },
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
    { type: "heading", text: "Similar triangles at work" },
    {
      type: "text",
      content:
        "Similar triangles do far more than justify the ratios. Whenever two triangles in a figure share their angles, you can set up a proportion and solve for a length you cannot measure. The skill is spotting the pair.",
    },
    {
      type: "worked-example",
      id: "t0-2-we1",
      title: "Worked example 1: the street-lamp shadow",
      problem:
        "A street lamp hangs 6 m above the ground. A person 1.5 m tall stands 4 m from the foot of the lamp post. How long is the person's shadow?",
      steps: [
        {
          text: "Draw it. The light ray from the lamp grazes the top of the person's head and hits the ground at the tip of the shadow. Let the shadow have length $s$.",
        },
        {
          text: "Two right triangles share the angle at the shadow's tip: the small one (person, shadow $s$) and the big one (lamp post, ground distance $s + 4$). Same angles, so they are similar and their height-to-base ratios match:",
          latex: "\\frac{1.5}{s} = \\frac{6}{s + 4}",
        },
        {
          text: "Cross-multiply and solve:",
          latex: "1.5(s + 4) = 6s \\;\\Longrightarrow\\; 6 = 4.5s \\;\\Longrightarrow\\; s = \\tfrac{4}{3} \\approx 1.33 \\text{ m}",
        },
      ],
      answer: "The shadow is $\\tfrac{4}{3} \\approx 1.33$ m long.",
    },
    {
      type: "worked-example",
      id: "t0-2-we2",
      title: "Worked example 2: the altitude to the hypotenuse",
      problem:
        "A right triangle has legs 3 and 4 and hypotenuse 5. Find the length of the altitude from the right angle to the hypotenuse, and the two pieces it cuts the hypotenuse into.",
      steps: [
        {
          text: "The altitude splits the big triangle into two smaller right triangles. Each shares one acute angle with the big triangle, so all three are similar.",
        },
        {
          text: "Compare the big triangle with the small one that contains the leg 3. In the big one, (shorter leg) / hypotenuse $= 3/5$. In the small one, the hypotenuse is 3 and the piece of the hypotenuse next to it plays the shorter leg $p$:",
          latex: "\\frac{p}{3} = \\frac{3}{5} \\;\\Longrightarrow\\; p = \\frac{9}{5} = 1.8",
        },
        {
          text: "The other piece is $5 - 1.8 = 3.2$. For the altitude $h$, compare (longer leg) / hypotenuse in the small triangle with the big one:",
          latex: "\\frac{h}{3} = \\frac{4}{5} \\;\\Longrightarrow\\; h = \\frac{12}{5} = 2.4",
        },
        {
          text: "Check with area: $\\tfrac12 \\times 3 \\times 4 = 6$ and $\\tfrac12 \\times 5 \\times 2.4 = 6$. Both pieces also satisfy $h^2 = 1.8 \\times 3.2 = 5.76$.",
        },
      ],
      answer: "Altitude $2.4$; the hypotenuse is cut into $1.8$ and $3.2$.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "A shortcut from the same figure",
      content:
        "The altitude to the hypotenuse is the geometric mean of the two pieces it creates: $h^2 = p \\cdot q$. It also equals (leg × leg) / hypotenuse: twice the area is both leg × leg and hypotenuse × altitude.",
    },
    { type: "heading", text: "Check your understanding" },
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
      hint: "When every side triples, what happens to a fraction made of two of them?",
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
      type: "quiz",
      id: "t0-2-q3",
      variant: "concept",
      question:
        "Triangle P is right-angled with one angle of 30°. Triangle Q is right-angled with one angle of 60°. Are they similar?",
      options: [
        {
          text: "Yes: P's third angle is 60° and Q's is 30°, so both have angles 30°, 60°, 90°.",
          correct: true,
          feedback: "Right. The *named* angle differs, but the full set of angles is the same, and that is what similarity needs.",
        },
        {
          text: "No: one has a 30° angle and the other a 60° angle.",
          feedback: "Work out the third angle of each. A right triangle with a 30° angle must also contain a 60° angle.",
        },
        {
          text: "Only if their hypotenuses are equal.",
          feedback: "Equal hypotenuses would make them congruent. Similarity needs matching angles only, at any size.",
        },
      ],
      hint: "Find all three angles of each triangle before comparing.",
    },
    {
      type: "quiz",
      id: "t0-2-q4",
      variant: "concept",
      multiple: true,
      question:
        "Two right triangles are given. Select every piece of information that *guarantees* they are similar.",
      options: [
        {
          text: "Each has an acute angle of 35°.",
          correct: true,
          feedback: "One matching acute angle plus the right angle forces the third angle to match too.",
        },
        {
          text: "In each, the two legs are in the ratio 1 : 2.",
          correct: true,
          feedback: "The legs enclose the right angle, so two proportional sides around an equal angle make the triangles similar.",
        },
        {
          text: "In each, the hypotenuse is twice one of the legs.",
          correct: true,
          feedback: "Pythagoras then fixes the other leg in the same proportion ($\\sqrt{3}$ times the first), so all three sides are in ratio $1 : \\sqrt3 : 2$.",
        },
        {
          text: "Each has a leg of length 5.",
          feedback: "A shared length says nothing about shape. A 5-12-13 and a 5-5-$5\\sqrt2$ triangle both have a leg of 5.",
        },
        {
          text: "They have equal hypotenuses.",
          feedback: "Equal size is not equal shape: a long thin triangle and an isosceles one can share a hypotenuse.",
        },
      ],
      hint: "Similarity is about shape. Which statements fix the angles (or all the side ratios)?",
    },
    {
      type: "numeric",
      id: "t0-2-q5",
      variant: "practice",
      question:
        "A street lamp is 5 m above the ground. A person 1.6 m tall stands 3 m from the foot of the lamp post. How long is the person's shadow? Give your answer to 2 decimal places.",
      answer: 1.41,
      tolerance: 0.01,
      unit: "m",
      hint: "The small triangle (person and shadow) and the big triangle (lamp post and the ground out to the shadow tip) share an angle.",
      solution:
        "Let the shadow be $s$. Similar triangles give $\\dfrac{1.6}{s} = \\dfrac{5}{s+3}$, so $1.6s + 4.8 = 5s$, $3.4s = 4.8$ and $s = \\dfrac{4.8}{3.4} \\approx 1.41$ m.",
      commonMistakes: [
        { answer: 0.96, tolerance: 0.01, feedback: "You used $\\dfrac{1.6}{5} \\times 3$, which matches the person's height to the lamp with the 3 m gap as the base. The big triangle's base is $s + 3$, not 3." },
      ],
    },
    {
      type: "numeric",
      id: "t0-2-q6",
      variant: "practice",
      question:
        "A right triangle has legs 6 and 8. How long is the altitude from the right angle to the hypotenuse?",
      answer: 4.8,
      tolerance: 0.001,
      hint: "Find the hypotenuse, then compare two of the three similar triangles (or use the area twice).",
      solution:
        "The hypotenuse is 10. Twice the area is $6 \\times 8 = 48$, and it is also $10 \\times h$. So $h = 4.8$.",
      commonMistakes: [
        { answer: 5, feedback: "That is half the hypotenuse (the distance to its midpoint), not the perpendicular distance to it." },
      ],
    },
    {
      type: "numeric",
      id: "t0-2-q7",
      variant: "practice",
      question:
        "The altitude from the right angle of a right triangle cuts the hypotenuse into pieces of length 4 and 9. How long is the altitude?",
      answer: 6,
      hint: "The two small triangles on either side of the altitude are similar to each other. Match the altitude against both pieces.",
      solution:
        "In the two small triangles, $\\dfrac{h}{4} = \\dfrac{9}{h}$ (the altitude is the long leg of one and the short leg of the other). So $h^2 = 36$ and $h = 6$.",
      commonMistakes: [
        { answer: 6.5, feedback: "That is the average of 4 and 9. Similar triangles give the *geometric* mean, $\\sqrt{4 \\times 9}$." },
        { answer: 13, feedback: "That is the whole hypotenuse." },
      ],
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
    { type: "heading", text: "Sine, cosine and tangent" },
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
    { type: "heading", text: "Tangent is sine over cosine" },
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
    { type: "heading", text: "From one ratio to all three" },
    {
      type: "text",
      content:
        "A favourite exam move: you are handed *one* ratio of an acute angle and asked for the others. You never need the angle itself. A ratio is a fraction of two sides, so build a triangle with exactly those sides, finish it with Pythagoras, and read off everything else.",
    },
    {
      type: "worked-example",
      id: "t0-3-we1",
      title: "Worked example 1: from sine to the rest",
      problem:
        "$\\theta$ is acute and $\\sin\\theta = \\dfrac{3}{5}$. Find $\\cos\\theta$ and $\\tan\\theta$.",
      steps: [
        {
          text: "Sine is opposite over hypotenuse, so draw a right triangle with opposite side 3 and hypotenuse 5. (Any multiple would do; the ratios would not change.)",
        },
        {
          text: "Pythagoras gives the adjacent side:",
          latex: "\\text{adj} = \\sqrt{5^2 - 3^2} = \\sqrt{16} = 4",
        },
        {
          text: "Read the other two ratios off the triangle:",
          latex: "\\cos\\theta = \\frac{4}{5}, \\qquad \\tan\\theta = \\frac{3}{4}",
        },
      ],
      answer: "$\\cos\\theta = \\tfrac{4}{5}$ and $\\tan\\theta = \\tfrac{3}{4}$.",
    },
    {
      type: "worked-example",
      id: "t0-3-we2",
      title: "Worked example 2: dividing through by cosine",
      problem:
        "$\\theta$ is acute and $5\\tan\\theta = 4$. Find $\\dfrac{5\\sin\\theta - 3\\cos\\theta}{5\\sin\\theta + 2\\cos\\theta}$.",
      steps: [
        {
          text: "You could build the triangle (opposite 4, adjacent 5, hypotenuse $\\sqrt{41}$), but there is a faster route. Every term is a multiple of $\\sin\\theta$ or $\\cos\\theta$, so divide top and bottom by $\\cos\\theta$ and use $\\frac{\\sin\\theta}{\\cos\\theta} = \\tan\\theta$:",
          latex: "\\frac{5\\sin\\theta - 3\\cos\\theta}{5\\sin\\theta + 2\\cos\\theta} = \\frac{5\\tan\\theta - 3}{5\\tan\\theta + 2}",
        },
        {
          text: "Substitute $5\\tan\\theta = 4$:",
          latex: "\\frac{4 - 3}{4 + 2} = \\frac{1}{6}",
        },
        {
          text: "The $\\sqrt{41}$ never appears: dividing by $\\cos\\theta$ cancels the hypotenuse along with it.",
        },
      ],
      answer: "The expression equals $\\tfrac{1}{6}$.",
    },
    { type: "heading", text: "Check your understanding" },
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
      hint: "Cosine uses the side that touches $\\theta$ and the side opposite the right angle.",
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
      hint: "Which side of a right triangle is always the longest, and where does it sit in the sine ratio?",
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
    {
      type: "numeric",
      id: "t0-3-q4",
      variant: "practice",
      question:
        "$\\theta$ is acute and $\\sin\\theta = \\dfrac{8}{17}$. Find $\\tan\\theta$. Enter a fraction or a decimal to 3 decimal places.",
      answer: 8 / 15,
      tolerance: 0.001,
      hint: "Build the triangle with opposite 8 and hypotenuse 17, then find the missing side.",
      solution:
        "Adjacent $= \\sqrt{17^2 - 8^2} = \\sqrt{225} = 15$, so $\\tan\\theta = \\dfrac{8}{15} \\approx 0.533$.",
      commonMistakes: [
        { answer: 8 / 17, feedback: "That is $\\sin\\theta$ itself. Tangent compares the two legs, so you need the third side first." },
        { answer: 15 / 17, feedback: "That is $\\cos\\theta$: adjacent over hypotenuse." },
        { answer: 15 / 8, feedback: "That is $\\dfrac{\\text{adj}}{\\text{opp}}$, the reciprocal of tangent." },
      ],
    },
    {
      type: "numeric",
      id: "t0-3-q5",
      variant: "practice",
      question:
        "$\\theta$ is acute and $\\tan\\theta = \\dfrac{12}{5}$. Find $\\sin\\theta + \\cos\\theta$. Enter a fraction or a decimal to 3 decimal places.",
      answer: 17 / 13,
      tolerance: 0.001,
      hint: "Tangent gives you both legs. What is the hypotenuse?",
      solution:
        "Legs 12 (opposite) and 5 (adjacent) give hypotenuse $\\sqrt{144 + 25} = 13$. So $\\sin\\theta + \\cos\\theta = \\dfrac{12}{13} + \\dfrac{5}{13} = \\dfrac{17}{13} \\approx 1.308$.",
      commonMistakes: [
        { answer: 1, feedback: "$\\sin\\theta + \\cos\\theta$ is not 1. It is $\\sin^2\\theta + \\cos^2\\theta$ that equals 1 (lesson 1.4)." },
        { answer: 17 / 12, feedback: "You divided by the opposite side instead of the hypotenuse." },
      ],
    },
    {
      type: "numeric",
      id: "t0-3-q6",
      variant: "practice",
      question:
        "$\\theta$ is acute and $3\\tan\\theta = 4$. Find $\\dfrac{2\\sin\\theta + \\cos\\theta}{\\sin\\theta - \\cos\\theta}$.",
      answer: 11,
      hint: "Divide numerator and denominator by $\\cos\\theta$, as in worked example 2.",
      solution:
        "Dividing by $\\cos\\theta$: $\\dfrac{2\\tan\\theta + 1}{\\tan\\theta - 1} = \\dfrac{8/3 + 1}{4/3 - 1} = \\dfrac{11/3}{1/3} = 11$.",
      commonMistakes: [
        { answer: -11, feedback: "Check the sign of the denominator: $\\tan\\theta = \\tfrac43 > 1$, so $\\tan\\theta - 1$ is positive." },
      ],
    },
    {
      type: "quiz",
      id: "t0-3-q7",
      variant: "concept",
      multiple: true,
      question:
        "$\\theta$ is an acute angle of a right triangle. Select every statement that is *always* true.",
      options: [
        {
          text: "$0 < \\sin\\theta < 1$",
          correct: true,
          feedback: "A leg over the hypotenuse: positive, and less than 1 because the hypotenuse is the longest side.",
        },
        {
          text: "$\\sin\\theta < \\tan\\theta$",
          correct: true,
          feedback: "$\\tan\\theta = \\dfrac{\\sin\\theta}{\\cos\\theta}$ and $0 < \\cos\\theta < 1$, so dividing by it makes the number bigger. (Or: same numerator, and the adjacent leg is shorter than the hypotenuse.)",
        },
        {
          text: "$\\tan\\theta < 1$",
          feedback: "Only for $\\theta < 45^\\circ$. Past 45° the opposite leg is the longer one and tangent exceeds 1.",
        },
        {
          text: "$\\cos\\theta < \\sin\\theta$",
          feedback: "True only for $\\theta > 45^\\circ$. At $30^\\circ$, $\\cos\\theta \\approx 0.87$ beats $\\sin\\theta = 0.5$.",
        },
        {
          text: "$\\tan\\theta \\cdot \\dfrac{\\text{adj}}{\\text{opp}} = 1$",
          correct: true,
          feedback: "$\\dfrac{\\text{opp}}{\\text{adj}} \\times \\dfrac{\\text{adj}}{\\text{opp}} = 1$ for any acute angle.",
        },
      ],
      hint: "Test a small angle like 10° and a large one like 80° against each claim.",
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
    { type: "heading", text: "Three patterns for solving" },
    {
      type: "worked-example",
      id: "t0-4-we1",
      title: "Pattern 1 — angle and a side, find another side",
      problem:
        "A ladder leans against a wall at 65° to the ground, and the ladder is 4 m long. How far up the wall does it reach?",
      steps: [
        {
          text: "The ladder is the hypotenuse. The height is opposite the 65° angle. Opposite and hypotenuse means sine:",
          latex: "\\sin 65^\\circ = \\frac{h}{4} \\quad\\Longrightarrow\\quad h = 4\\sin 65^\\circ \\approx 3.63\\text{ m}",
        },
      ],
      answer: "The ladder reaches about 3.63 m up the wall.",
      tryFirst: false,
    },
    {
      type: "worked-example",
      id: "t0-4-we2",
      title: "Pattern 2 — the unknown is underneath",
      problem:
        "The same ladder makes a 65° angle, and its foot is 1.7 m from the wall. How long is the ladder?",
      steps: [
        {
          text: "Now 1.7 m is the adjacent side and the ladder is still the hypotenuse, so use cosine — but the unknown sits in the denominator:",
          latex: "\\cos 65^\\circ = \\frac{1.7}{L} \\quad\\Longrightarrow\\quad L = \\frac{1.7}{\\cos 65^\\circ} \\approx 4.02\\text{ m}",
        },
      ],
      answer: "The ladder is about 4.02 m long.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Where people lose marks",
      content:
        "When the unknown is in the denominator, you divide by the ratio; when it is in the numerator, you multiply. Deciding which one *before* reaching for the calculator prevents almost every arithmetic slip in this chapter.",
    },
    {
      type: "worked-example",
      id: "t0-4-we3",
      title: "Pattern 3 — two sides, find the angle",
      problem:
        "A ramp rises 0.8 m over a horizontal run of 5 m. What angle does it make with the ground?",
      steps: [
        {
          text: "Opposite over adjacent is tangent, so you need the angle whose tangent is $0.8/5 = 0.16$. That question — *which angle produced this ratio?* — is what the inverse functions answer:",
          latex: "\\theta = \\tan^{-1}(0.16) \\approx 9.1^\\circ",
        },
      ],
      answer: "The ramp makes an angle of about $9.1^\\circ$ with the ground.",
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
    { type: "heading", text: "Angles of elevation and depression" },
    {
      type: "text",
      content:
        "Two words that show up in every exam version of these problems:\n\n**Angle of elevation** — measured *up* from the horizontal, from you to the object.\n**Angle of depression** — measured *down* from the horizontal, from you to the object.\n\nThey are always measured from a horizontal line, never from a vertical one. A cliff-top observer looking down at a boat with a 20° angle of depression sees the boat looking up at 20° elevation: the two horizontals are parallel, so the angles are alternate angles and equal.",
    },
    {
      type: "worked-example",
      id: "t0-4-we4",
      title: "Worked example: two sightings, one tower",
      problem:
        "From a point on level ground, the angle of elevation of the top of a tower is 30°. After walking 20 m straight towards the tower, the angle of elevation is 60°. How tall is the tower?",
      steps: [
        {
          text: "Neither sighting alone is enough: each gives one right triangle with only an angle known. Name the unknowns: height $h$, and distance $x$ from the second point to the foot of the tower. The first point is then $x + 20$ away.",
        },
        {
          text: "Each sighting gives a tangent equation (height opposite, ground distance adjacent):",
          latex: "\\tan 60^\\circ = \\frac{h}{x} \\;\\Rightarrow\\; h = \\sqrt{3}\\,x, \\qquad \\tan 30^\\circ = \\frac{h}{x + 20} \\;\\Rightarrow\\; h = \\frac{x + 20}{\\sqrt{3}}",
        },
        {
          text: "Set the two expressions for $h$ equal and solve for $x$:",
          latex: "\\sqrt{3}\\,x = \\frac{x + 20}{\\sqrt{3}} \\;\\Rightarrow\\; 3x = x + 20 \\;\\Rightarrow\\; x = 10",
        },
        {
          text: "Then the height:",
          latex: "h = \\sqrt{3} \\times 10 = 10\\sqrt{3} \\approx 17.32 \\text{ m}",
        },
        {
          text: "Check: the triangle from the first point has legs $10\\sqrt3$ and $30$, and $\\tan^{-1}\\!\\left(\\frac{10\\sqrt3}{30}\\right) = \\tan^{-1}\\!\\left(\\frac{1}{\\sqrt3}\\right) = 30^\\circ$.",
        },
      ],
      answer: "The tower is $10\\sqrt{3} \\approx 17.32$ m tall.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "The two-sighting recipe",
      content:
        "With two angles of elevation from points in line with the object, write one tangent equation per sighting, both in terms of the same unknown height. Eliminate the unknown distance. This is the most common heights-and-distances problem in JEE Main.",
    },
    { type: "heading", text: "Check your understanding" },
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
      hint: "Which side of the triangle is the string, and which side is the height relative to the 50° angle?",
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
      hint: "Is the leg of length 6 opposite the angle you want, or does it touch it?",
    },
    {
      type: "numeric",
      id: "t0-4-q4",
      variant: "practice",
      question:
        "A 5 m ladder reaches 4.6 m up a vertical wall. What angle does it make with the ground? Give your answer in degrees to 1 decimal place.",
      answer: 66.9,
      tolerance: 0.05,
      unit: "degrees",
      hint: "The height up the wall is opposite the angle with the ground. What is the ladder?",
      solution:
        "$\\sin\\theta = \\dfrac{4.6}{5} = 0.92$, so $\\theta = \\sin^{-1}(0.92) \\approx 66.9^\\circ$.",
      commonMistakes: [
        { answer: 23.1, tolerance: 0.05, feedback: "That is $\\cos^{-1}(0.92)$, the angle between the ladder and the *wall*." },
        { answer: 42.6, tolerance: 0.05, feedback: "That is $\\tan^{-1}(0.92)$. Tangent needs both legs, but 5 m is the hypotenuse." },
      ],
    },
    {
      type: "numeric",
      id: "t0-4-q5",
      variant: "practice",
      question:
        "The angle of elevation of the top of a 50 m tower, seen from a point on level ground, is 35°. How far is the point from the foot of the tower? Give your answer to 1 decimal place.",
      answer: 71.4,
      tolerance: 0.05,
      unit: "m",
      hint: "The unknown distance is adjacent to the 35° angle. Is it in the numerator or the denominator of your ratio?",
      solution:
        "$\\tan 35^\\circ = \\dfrac{50}{d}$, so $d = \\dfrac{50}{\\tan 35^\\circ} \\approx \\dfrac{50}{0.7002} \\approx 71.4$ m.",
      commonMistakes: [
        { answer: 35.0, tolerance: 0.05, feedback: "You multiplied: $50\\tan 35^\\circ$. The distance is in the denominator, so divide." },
      ],
    },
    {
      type: "numeric",
      id: "t0-4-q6",
      variant: "practice",
      question:
        "From the top of a 60 m cliff, the angles of depression of the top and the bottom of a tower standing on the same level ground are 30° and 60°. How tall is the tower?",
      answer: 40,
      unit: "m",
      hint: "Use the 60° sighting to find how far the tower is from the cliff, then the 30° sighting to find how far below the cliff top the tower's top is.",
      solution:
        "Bottom of the tower: $\\tan 60^\\circ = \\dfrac{60}{d}$, so $d = \\dfrac{60}{\\sqrt3} = 20\\sqrt3$ m.\n\nTop of the tower: the drop from the cliff top is $d\\tan 30^\\circ = 20\\sqrt3 \\times \\dfrac{1}{\\sqrt3} = 20$ m.\n\nTower $= 60 - 20 = 40$ m.",
      commonMistakes: [
        { answer: 20, feedback: "20 m is how far the tower's top is *below the cliff top*. Subtract it from the cliff's height." },
      ],
    },
    {
      type: "numeric",
      id: "t0-4-q7",
      variant: "practice",
      question:
        "From a point $A$ on level ground the angle of elevation of the top of a tower is 45°. From a point $B$, 30 m closer to the tower along the same line, it is 60°. How tall is the tower? Give your answer to 2 decimal places.",
      answer: 70.98,
      tolerance: 0.01,
      unit: "m",
      hint: "Let $x$ be the distance from $B$ to the tower. Write $h$ two ways and equate.",
      solution:
        "From $B$: $h = x\\tan 60^\\circ = \\sqrt3\\,x$. From $A$: $h = (x + 30)\\tan 45^\\circ = x + 30$.\n\nSo $\\sqrt3\\,x = x + 30$, giving $x = \\dfrac{30}{\\sqrt3 - 1} = 15(\\sqrt3 + 1) \\approx 40.98$ m, and $h = x + 30 = 15(3 + \\sqrt3) \\approx 70.98$ m.",
      commonMistakes: [
        { answer: 40.98, tolerance: 0.01, feedback: "That is the distance from $B$ to the tower, not the height. One more step: $h = x + 30$." },
      ],
    },
    {
      type: "quiz",
      id: "t0-4-q8",
      variant: "concept",
      multiple: true,
      question:
        "Select every set of information that is enough to solve a right triangle completely (all sides and angles).",
      options: [
        {
          text: "The two legs.",
          correct: true,
          feedback: "Pythagoras gives the hypotenuse and $\\tan^{-1}$ of their ratio gives an angle.",
        },
        {
          text: "The hypotenuse and one acute angle.",
          correct: true,
          feedback: "Sine and cosine of the angle, times the hypotenuse, give both legs.",
        },
        {
          text: "One leg and the acute angle opposite it.",
          correct: true,
          feedback: "The other angle is $90^\\circ$ minus it, and dividing the leg by the sine gives the hypotenuse.",
        },
        {
          text: "The two acute angles.",
          feedback: "Angles fix the shape but never the size. Infinitely many similar triangles fit.",
        },
        {
          text: "The hypotenuse alone.",
          feedback: "Every right triangle inscribed in a semicircle on that hypotenuse fits. You need one more fact.",
        },
      ],
      hint: "The right angle is already known. Two more facts suffice, but only if at least one of them is a length.",
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
    { type: "heading", text: "Half an equilateral triangle: 30° and 60°" },
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
    { type: "heading", text: "Half a square: 45°" },
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
    { type: "heading", text: "Computing with exact values" },
    {
      type: "worked-example",
      id: "t0-5-we1",
      title: "Worked example 1: an exact evaluation",
      problem:
        "Without a calculator, evaluate $\\dfrac{\\sin 30^\\circ + \\tan 45^\\circ - \\cos 60^\\circ}{\\sin 60^\\circ \\cdot \\tan 30^\\circ}$.",
      steps: [
        {
          text: "Read each value off the two triangles: $\\sin 30^\\circ = \\tfrac12$, $\\tan 45^\\circ = 1$, $\\cos 60^\\circ = \\tfrac12$, $\\sin 60^\\circ = \\tfrac{\\sqrt3}{2}$, $\\tan 30^\\circ = \\tfrac{1}{\\sqrt3}$.",
        },
        {
          text: "The numerator: the two halves cancel.",
          latex: "\\tfrac12 + 1 - \\tfrac12 = 1",
        },
        {
          text: "The denominator: the $\\sqrt3$s cancel.",
          latex: "\\frac{\\sqrt3}{2} \\cdot \\frac{1}{\\sqrt3} = \\frac12",
        },
        {
          text: "Divide:",
          latex: "\\frac{1}{1/2} = 2",
        },
      ],
      answer: "The expression equals $2$.",
    },
    {
      type: "worked-example",
      id: "t0-5-we2",
      title: "Worked example 2: running the table backwards",
      problem:
        "$A$ and $B$ are acute angles with $A > B$, $\\sin(A + B) = 1$ and $\\cos(A - B) = \\dfrac{\\sqrt3}{2}$. Find $A$ and $B$.",
      steps: [
        {
          text: "Sine reaches 1 only at $90^\\circ$ (the opposite side has grown into the hypotenuse), and $A + B$ lies between $0^\\circ$ and $180^\\circ$. So:",
          latex: "A + B = 90^\\circ",
        },
        {
          text: "$\\dfrac{\\sqrt3}{2}$ is the cosine of $30^\\circ$, read from the half-equilateral triangle. Since $A > B$, $A - B$ is acute and positive:",
          latex: "A - B = 30^\\circ",
        },
        {
          text: "Add and subtract the two equations:",
          latex: "2A = 120^\\circ \\Rightarrow A = 60^\\circ, \\qquad 2B = 60^\\circ \\Rightarrow B = 30^\\circ",
        },
      ],
      answer: "$A = 60^\\circ$ and $B = 30^\\circ$.",
    },
    { type: "heading", text: "Check your understanding" },
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
      hint: "Sketch the 1, $\\sqrt3$, 2 triangle and stand in the 60° corner. Which leg touches you?",
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
      hint: "Which two sides does tangent compare, and how long are they in the half-square?",
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
      hint: "Opposite over hypotenuse is a sine. What is $\\sin 30^\\circ$?",
    },
    {
      type: "numeric",
      id: "t0-5-q4",
      variant: "practice",
      question:
        "Without a calculator, evaluate $4\\sin^2 60^\\circ + 3\\tan^2 30^\\circ - 8\\sin 45^\\circ \\cos 45^\\circ$.",
      answer: 0,
      hint: "Square the exact values carefully: $\\sin^2 60^\\circ$ means $(\\sin 60^\\circ)^2$.",
      solution:
        "$4 \\cdot \\dfrac34 + 3 \\cdot \\dfrac13 - 8 \\cdot \\dfrac{\\sqrt2}{2} \\cdot \\dfrac{\\sqrt2}{2} = 3 + 1 - 4 = 0$.",
      commonMistakes: [
        { answer: 8, feedback: "You added the last term instead of subtracting it: $3 + 1 + 4$." },
        { answer: -2, feedback: "You used $\\sin 60^\\circ = \\tfrac12$, which is $\\sin 30^\\circ$. From the 60° corner, $\\sin 60^\\circ = \\tfrac{\\sqrt3}{2}$, so $4\\sin^2 60^\\circ = 3$." },
      ],
    },
    {
      type: "quiz",
      id: "t0-5-q5",
      variant: "practice",
      multiple: true,
      question: "Select every expression whose exact value is $\\dfrac12$.",
      options: [
        { text: "$\\sin 30^\\circ$", correct: true, feedback: "Opposite 1 over hypotenuse 2 in the half-equilateral triangle." },
        { text: "$\\cos 60^\\circ$", correct: true, feedback: "The same side and hypotenuse, seen from the other corner." },
        {
          text: "$\\sin 45^\\circ \\cos 45^\\circ$",
          correct: true,
          feedback: "$\\dfrac{\\sqrt2}{2} \\cdot \\dfrac{\\sqrt2}{2} = \\dfrac{2}{4} = \\dfrac12$.",
        },
        { text: "$\\tan 30^\\circ$", feedback: "$\\tan 30^\\circ = \\dfrac{1}{\\sqrt3} \\approx 0.577$: leg over leg, not leg over hypotenuse." },
        { text: "$\\sin 15^\\circ$", feedback: "Halving the angle does not halve the sine. $\\sin 15^\\circ \\approx 0.259$, while $\\tfrac12$ belongs to $30^\\circ$." },
      ],
      hint: "Evaluate each one from the two triangles. Beware of halving angles.",
    },
    {
      type: "numeric",
      id: "t0-5-q6",
      variant: "practice",
      question:
        "$\\theta$ is acute and $\\tan(2\\theta - 30^\\circ) = \\sqrt3$. Find $\\theta$ in degrees.",
      answer: 45,
      unit: "degrees",
      hint: "Which angle has tangent $\\sqrt3$? Set $2\\theta - 30^\\circ$ equal to it.",
      solution:
        "$\\tan 60^\\circ = \\sqrt3$, so $2\\theta - 30^\\circ = 60^\\circ$ and $\\theta = 45^\\circ$.",
      commonMistakes: [
        { answer: 30, feedback: "You set $2\\theta - 30^\\circ = 30^\\circ$, but $\\tan 30^\\circ = \\tfrac{1}{\\sqrt3}$, not $\\sqrt3$." },
        { answer: 15, feedback: "You solved $2\\theta = 30^\\circ$, dropping the $-30^\\circ$ shift and the $60^\\circ$." },
      ],
    },
    {
      type: "numeric",
      id: "t0-5-q7",
      variant: "practice",
      question:
        "$A$ and $B$ are acute with $A > B$, $\\tan(A + B) = \\sqrt3$ and $\\tan(A - B) = \\dfrac{1}{\\sqrt3}$. Find $A$ in degrees.",
      answer: 45,
      unit: "degrees",
      hint: "Turn each tangent value into an angle first, then you have two simple equations in $A$ and $B$.",
      solution:
        "$A + B = 60^\\circ$ and $A - B = 30^\\circ$. Adding: $2A = 90^\\circ$, so $A = 45^\\circ$ (and $B = 15^\\circ$).",
      commonMistakes: [
        { answer: 15, feedback: "That is $B$. Adding the equations isolates $A$." },
        { answer: 60, feedback: "That is $A + B$, not $A$." },
      ],
    },
    {
      type: "quiz",
      id: "t0-5-q8",
      variant: "concept",
      question: "Without a calculator, which is larger: $\\sin 50^\\circ$ or $\\cos 50^\\circ$?",
      options: [
        {
          text: "$\\sin 50^\\circ$",
          correct: true,
          feedback: "$\\cos 50^\\circ = \\sin 40^\\circ$ (lesson 0.3's co-function fact), and sine grows with the angle, so $\\sin 50^\\circ > \\sin 40^\\circ$.",
        },
        {
          text: "$\\cos 50^\\circ$",
          feedback: "Past $45^\\circ$ the opposite leg is longer than the adjacent leg, so sine wins.",
        },
        {
          text: "They are equal.",
          feedback: "They are equal only at $45^\\circ$, where the two legs match.",
        },
      ],
      hint: "Where do sine and cosine cross? Is $50^\\circ$ before or after that?",
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
    { type: "heading", text: "An angle measured by its arc" },
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
    { type: "heading", text: "Converting between degrees and radians" },
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
      type: "worked-example",
      id: "t0-6-we1",
      title: "Worked example 1: converting both ways",
      problem: "Convert $\\dfrac{5\\pi}{12}$ radians to degrees, and $1.2$ radians to degrees.",
      steps: [
        {
          text: "Radians to degrees: multiply by $\\frac{180}{\\pi}$, so that the $\\pi$ cancels.",
          latex: "\\frac{5\\pi}{12} \\times \\frac{180^\\circ}{\\pi} = \\frac{5 \\times 180^\\circ}{12} = 75^\\circ",
        },
        {
          text: "The same factor works when there is no $\\pi$ to cancel; the answer is then a decimal:",
          latex: "1.2 \\times \\frac{180^\\circ}{\\pi} \\approx 1.2 \\times 57.296^\\circ \\approx 68.75^\\circ",
        },
        {
          text: "Sanity check: 1.2 radians is a little more than 1 radian ($\\approx 57.3^\\circ$), and $68.75^\\circ$ is a little more than $57.3^\\circ$.",
        },
      ],
      answer: "$\\dfrac{5\\pi}{12} = 75^\\circ$ and $1.2 \\text{ rad} \\approx 68.75^\\circ$.",
    },
    { type: "heading", text: "Arc length and sector area" },
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
      type: "worked-example",
      id: "t0-6-we2",
      title: "Worked example 2: a sector from its perimeter",
      problem:
        "A sector of a circle of radius 10 cm has a perimeter of 30 cm (two radii plus the arc). Find the angle of the sector and its area.",
      steps: [
        {
          text: "The perimeter is two radii plus the arc, and the arc is $r\\theta$ with $\\theta$ in radians:",
          latex: "2r + r\\theta = 30 \\;\\Rightarrow\\; 20 + 10\\theta = 30 \\;\\Rightarrow\\; \\theta = 1 \\text{ radian}",
        },
        {
          text: "The arc equals the radius, which is the definition of one radian. In degrees that is about $57.3^\\circ$.",
        },
        {
          text: "Area, again with $\\theta$ in radians:",
          latex: "A = \\tfrac12 r^2\\theta = \\tfrac12 \\times 100 \\times 1 = 50 \\text{ cm}^2",
        },
      ],
      answer: "The angle is 1 radian (about $57.3^\\circ$) and the area is $50 \\text{ cm}^2$.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Foreshadowing (Chapter 5.6)",
      content:
        "In radians, $\\sin\\theta \\approx \\theta$ for small angles, and the derivative of $\\sin$ is exactly $\\cos$. In degrees, a factor of $\\frac{\\pi}{180}$ appears and never leaves — it rides along through every derivative you will ever take. Radians are not a harder unit; they are the unit that makes calculus stop bleeding constants.",
    },
    { type: "heading", text: "Check your understanding" },
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
      hint: "What fraction of $180^\\circ$ is $135^\\circ$? The answer is that fraction of $\\pi$.",
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
      hint: "The angle is already in radians, so $s = r\\theta$ applies directly.",
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
      hint: "Look at the definition $\\theta = s/r$. What are the units of $s$ and of $r$?",
    },
    {
      type: "numeric",
      id: "t0-6-q4",
      variant: "practice",
      question: "Convert $2.5$ radians to degrees. Give your answer to 1 decimal place.",
      answer: 143.2,
      tolerance: 0.05,
      unit: "degrees",
      hint: "Multiply by the factor that cancels radians: $\\frac{180}{\\pi}$ or $\\frac{\\pi}{180}$?",
      solution: "$2.5 \\times \\dfrac{180}{\\pi} = \\dfrac{450}{\\pi} \\approx 143.2^\\circ$.",
      commonMistakes: [
        { answer: 0.04, tolerance: 0.01, feedback: "You multiplied by $\\frac{\\pi}{180}$, which converts degrees to radians. Here you start in radians." },
        { answer: 450, feedback: "You multiplied by 180 but forgot to divide by $\\pi$." },
      ],
    },
    {
      type: "numeric",
      id: "t0-6-q5",
      variant: "practice",
      question:
        "Find the area of a sector of radius 8 cm with central angle $45^\\circ$. Give your answer to 2 decimal places.",
      answer: 25.13,
      tolerance: 0.01,
      unit: "$\\text{cm}^2$",
      hint: "$A = \\tfrac12 r^2\\theta$ only works with $\\theta$ in radians. Convert $45^\\circ$ first.",
      solution:
        "$45^\\circ = \\dfrac{\\pi}{4}$, so $A = \\dfrac12 \\times 64 \\times \\dfrac{\\pi}{4} = 8\\pi \\approx 25.13 \\text{ cm}^2$.",
      commonMistakes: [
        { answer: 1440, feedback: "You put $45$ (degrees) straight into $\\tfrac12 r^2\\theta$. The formula needs radians." },
        { answer: 6.28, tolerance: 0.01, feedback: "That is the arc length $r\\theta = 2\\pi$, not the area." },
      ],
    },
    {
      type: "numeric",
      id: "t0-6-q6",
      variant: "practice",
      question:
        "A sector is cut from a circle using a wire of total length 20 cm for its boundary (two radii plus the arc). What is the largest area the sector can have?",
      answer: 25,
      unit: "$\\text{cm}^2$",
      hint: "Use the perimeter to write $r\\theta$ in terms of $r$, then the area becomes a quadratic in $r$.",
      solution:
        "$2r + r\\theta = 20$, so $r\\theta = 20 - 2r$. The area is $A = \\tfrac12 r^2\\theta = \\tfrac12 r(20 - 2r) = 10r - r^2 = 25 - (r - 5)^2$.\n\nThe maximum is $25 \\text{ cm}^2$, at $r = 5$ cm (and then $\\theta = 2$ radians).",
      commonMistakes: [
        { answer: 31.83, tolerance: 0.01, feedback: "That is the area of a full circle with circumference 20. The boundary must also include the two radii." },
        { answer: 5, feedback: "That is the best radius, not the area." },
      ],
    },
    {
      type: "numeric",
      id: "t0-6-q7",
      variant: "practice",
      question:
        "What is the angle between the hour hand and the minute hand of a clock at 2:20? Give your answer in radians to 3 decimal places.",
      answer: 0.873,
      tolerance: 0.001,
      unit: "rad",
      hint: "The hour hand does not sit on the 2 at 2:20: it has moved a third of the way to the 3.",
      solution:
        "The minute hand is at $20 \\times 6^\\circ = 120^\\circ$ from 12. The hour hand moves $0.5^\\circ$ per minute, so it is at $2 \\times 30^\\circ + 20 \\times 0.5^\\circ = 70^\\circ$.\n\nThe angle between them is $50^\\circ = \\dfrac{5\\pi}{18} \\approx 0.873$ radians.",
      commonMistakes: [
        { answer: 1.047, tolerance: 0.001, feedback: "That is $60^\\circ$: you placed the hour hand exactly on the 2. In 20 minutes it moves $10^\\circ$ further." },
        { answer: 50, feedback: "Right angle, wrong unit. Convert $50^\\circ$ to radians." },
      ],
    },
    {
      type: "quiz",
      id: "t0-6-q8",
      variant: "concept",
      multiple: true,
      question: "Select every angle equal to $\\dfrac{\\pi}{3}$ radians.",
      options: [
        { text: "$60^\\circ$", correct: true, feedback: "$\\frac{\\pi}{3} \\times \\frac{180^\\circ}{\\pi} = 60^\\circ$." },
        { text: "One sixth of a full turn.", correct: true, feedback: "A full turn is $2\\pi$, and $\\frac{2\\pi}{6} = \\frac{\\pi}{3}$." },
        {
          text: "The angle that cuts off an arc of length $\\pi$ cm on a circle of radius 3 cm.",
          correct: true,
          feedback: "$\\theta = \\frac{s}{r} = \\frac{\\pi}{3}$.",
        },
        { text: "The angle whose arc equals the radius.", feedback: "That is exactly 1 radian, about $57.3^\\circ$, a little less than $\\frac{\\pi}{3} \\approx 1.047$." },
        { text: "$3^\\circ$", feedback: "Dropping $\\pi$ does not turn radians into degrees. Multiply by $\\frac{180}{\\pi}$ instead." },
      ],
      hint: "Convert each description into radians (or into degrees) and compare.",
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
        "Eleven questions across every idea in the chapter: six quick checks, then five more of the kind JEE sets. The standard to hold yourself to: you should be able to answer every one of these from a *drawing*, without a memorized table, and explain in a sentence why the answer is what it is.",
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
      type: "numeric",
      id: "t0-m-q7",
      variant: "mastery",
      question:
        "An observer whose eyes are 1.5 m above the ground stands 20 m from the foot of a tower and sees its top at an angle of elevation of $60^\\circ$. How tall is the tower? Give your answer to 2 decimal places.",
      answer: 36.14,
      tolerance: 0.01,
      unit: "m",
      solution:
        "The right triangle starts at eye level: the height above the eyes is $20\\tan 60^\\circ = 20\\sqrt3 \\approx 34.64$ m. Add the eye height: $34.64 + 1.5 = 36.14$ m.",
      commonMistakes: [
        { answer: 34.64, tolerance: 0.01, feedback: "That is the height above the observer's eyes. The horizontal line of sight starts 1.5 m up, so add that back." },
        { answer: 11.55, tolerance: 0.01, feedback: "You divided by $\\tan 60^\\circ$. The height is opposite the angle and the 20 m is adjacent, so multiply." },
      ],
    },
    {
      type: "numeric",
      id: "t0-m-q8",
      variant: "mastery",
      question:
        "$\\theta$ is acute and $\\sin\\theta = 0.6$. Find $\\tan\\theta + \\cos\\theta$.",
      answer: 1.55,
      tolerance: 0.001,
      solution:
        "$\\sin\\theta = \\dfrac{3}{5}$, so the triangle is 3-4-5: $\\cos\\theta = \\dfrac45 = 0.8$ and $\\tan\\theta = \\dfrac34 = 0.75$. The sum is $1.55$.",
      commonMistakes: [
        { answer: 2.133, tolerance: 0.001, feedback: "You used $\\tan\\theta = \\dfrac{4}{3}$, which is adjacent over opposite. Tangent is opposite over adjacent: $\\dfrac34$." },
      ],
    },
    {
      type: "numeric",
      id: "t0-m-q11",
      variant: "mastery",
      question:
        "A 10 m flagpole stands on top of a building. From a point on level ground, the angles of elevation of the bottom and the top of the flagpole are $45^\\circ$ and $60^\\circ$. How tall is the building? Give your answer to 2 decimal places.",
      answer: 13.66,
      tolerance: 0.01,
      unit: "m",
      solution:
        "Let the building be $b$ m tall and the point $x$ m from its foot.\n\nBottom of the pole: $\\tan 45^\\circ = \\dfrac{b}{x}$, so $b = x$. Top of the pole: $\\tan 60^\\circ = \\dfrac{b + 10}{x}$, so $b + 10 = \\sqrt3\\,x$.\n\nSubstituting $x = b$: $b(\\sqrt3 - 1) = 10$, so $b = \\dfrac{10}{\\sqrt3 - 1} = 5(\\sqrt3 + 1) \\approx 13.66$ m.",
      commonMistakes: [
        { answer: 23.66, tolerance: 0.01, feedback: "That is the height of the top of the flagpole. The building alone is 10 m less." },
      ],
    },
    {
      type: "quiz",
      id: "t0-m-q9",
      variant: "mastery",
      multiple: true,
      question: "Select every true statement.",
      options: [
        { text: "$\\sin 30^\\circ = \\cos 60^\\circ$", correct: true, feedback: "The same side over the same hypotenuse, seen from the two acute corners." },
        { text: "$\\dfrac{\\pi}{4}$ radians $= 45^\\circ$", correct: true, feedback: "$\\frac{\\pi}{4} \\times \\frac{180^\\circ}{\\pi} = 45^\\circ$." },
        {
          text: "$\\sin 60^\\circ = 2\\sin 30^\\circ$",
          feedback: "$2\\sin 30^\\circ = 1$, but $\\sin 60^\\circ = \\frac{\\sqrt3}{2} \\approx 0.866$. Doubling the angle does not double the sine.",
        },
        { text: "1 radian is more than $60^\\circ$.", feedback: "1 radian $\\approx 57.3^\\circ$, a little *less* than $60^\\circ$." },
        {
          text: "In any right triangle, $\\tan\\theta = \\dfrac{\\sin\\theta}{\\cos\\theta}$ for each acute angle.",
          correct: true,
          feedback: "The hypotenuse cancels: $\\frac{\\text{opp}/\\text{hyp}}{\\text{adj}/\\text{hyp}} = \\frac{\\text{opp}}{\\text{adj}}$.",
        },
      ],
    },
    {
      type: "numeric",
      id: "t0-m-q10",
      variant: "mastery",
      question:
        "A wheel turns at 360 revolutions per minute. Through how many radians does it turn each second? Give your answer to 2 decimal places.",
      answer: 37.7,
      tolerance: 0.01,
      unit: "rad/s",
      solution:
        "360 revolutions per minute is 6 revolutions per second, and each revolution is $2\\pi$ radians: $6 \\times 2\\pi = 12\\pi \\approx 37.70$ rad/s.",
      commonMistakes: [
        { answer: 2160, feedback: "That is degrees per second ($6 \\times 360^\\circ$). Each revolution is $2\\pi$ radians." },
        { answer: 6, feedback: "That is revolutions per second. Convert each revolution to radians." },
        { answer: 18.85, tolerance: 0.01, feedback: "That is $6\\pi$: a full revolution is $2\\pi$ radians, not $\\pi$." },
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
