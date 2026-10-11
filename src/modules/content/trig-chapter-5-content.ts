import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Trigonometry Chapter 5 — Any Triangle, and the Bridge to Calculus.
 * The two laws for non-right triangles, then the small-angle result that
 * hands the course over to the calculus limits chapter.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "law-of-sines",
  title: "5.1 · Law of Sines",
  position: 1,
  blocks: blocks([
    {
      type: "video",
      src: "/videos/trig-5-any-triangle.mp4",
      poster: "/videos/trig-5-any-triangle.jpg",
      title: "Chapter 5 overview video",
      caption:
        "A narrated walk through the whole chapter. Watch it now for the big picture, or come back to it as a recap.",
    },
    {
      type: "text",
      content:
        "Everything so far that involved a triangle involved a *right* triangle. Most triangles in the world are not right-angled: a surveyor's sightlines between three hilltops, the two legs of a sailing course, the three struts of a roof truss.\n\nThere is a standard labelling that makes the results readable. Vertices $A$, $B$, $C$; the side opposite each vertex takes the matching lower-case letter, so side $a$ is opposite angle $A$.",
    },
    { type: "heading", text: "One altitude, two right triangles" },
    {
      type: "text",
      content:
        "**The derivation is one line of construction.** Drop the altitude $h$ from vertex $C$ to the side $AB$. That splits the triangle into two right triangles, and $h$ belongs to both:",
    },
    { type: "math", latex: "h = b\\sin A \\qquad\\text{and}\\qquad h = a\\sin B" },
    {
      type: "text",
      content:
        "Set them equal — the same segment, measured two ways — and divide by $\\sin A\\sin B$:",
    },
    {
      type: "math",
      latex: "b\\sin A = a\\sin B \\quad\\Longrightarrow\\quad \\frac{a}{\\sin A} = \\frac{b}{\\sin B}",
    },
    {
      type: "text",
      content:
        "Dropping the altitude from a different vertex brings in $c$ and $C$ the same way, so all three ratios agree.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Law of Sines",
      content:
        "In any triangle, $\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C}$.\nRead it as: **a side and its opposite angle travel together.** The bigger the angle, the longer the side across from it.",
    },
    {
      type: "callout",
      variant: "info",
      title: "When to reach for it",
      content:
        "The law of sines needs a **matched pair** — a side and the angle opposite it. That makes it the tool for:\n**AAS / ASA** — two angles and any side (find the third angle by subtraction, then two applications).\n**SSA** — two sides and a non-included angle. This case is treacherous, and lesson 5.2 is devoted to it.",
    },
    {
      type: "interactive",
      config: {
        component: "triangle-solver",
        mode: "sas",
        initialB: 6,
        initialC: 8,
        initialAngle: 40,
        showLawOfSines: true,
        caption:
          "Move any slider: the two ratio readouts stay equal, whatever the triangle looks like. That equality is the law.",
      },
    },
    { type: "heading", text: "Solving with the law of sines" },
    {
      type: "worked-example",
      id: "t5-1-we1",
      title: "Worked example 1: the rock across the river",
      problem:
        "A surveyor sights a rock across a river. From point $A$ the angle to the rock is $63^\\circ$; from point $B$, 120 m further along the bank, it is $41^\\circ$. How far is the rock from $A$?",
      steps: [
        {
          text: "The third angle is $180^\\circ - 63^\\circ - 41^\\circ = 76^\\circ$, and it sits opposite the known 120 m baseline. The distance sought is opposite the $41^\\circ$ angle:",
          latex:
            "\\frac{d}{\\sin 41^\\circ} = \\frac{120}{\\sin 76^\\circ} \\quad\\Longrightarrow\\quad d = \\frac{120\\sin 41^\\circ}{\\sin 76^\\circ} \\approx 81.1\\text{ m}",
        },
      ],
      answer: "The rock is about 81.1 m from $A$.",
      tryFirst: false,
    },
    {
      type: "worked-example",
      id: "t5-1-we2",
      title: "Worked example 2: solving an ASA triangle completely",
      problem: "In triangle $ABC$, $A = 50^\\circ$, $B = 60^\\circ$ and $c = 20$. Find $a$ and $b$.",
      steps: [
        {
          text: "No side is matched with its angle yet, so get the third angle first:",
          latex: "C = 180^\\circ - 50^\\circ - 60^\\circ = 70^\\circ",
        },
        {
          text: "Now $c$ and $C$ form a matched pair. Use it for each unknown side:",
          latex: "a = \\frac{20\\sin 50^\\circ}{\\sin 70^\\circ} \\approx 16.30, \\qquad b = \\frac{20\\sin 60^\\circ}{\\sin 70^\\circ} \\approx 18.43",
        },
        {
          text: "Sanity check: the angles order as $A < B < C$, and the sides order as $a < b < c$ ($16.30 < 18.43 < 20$). Bigger angle, longer side. ✓",
        },
      ],
      answer: "$a \\approx 16.30$, $b \\approx 18.43$ (and $C = 70^\\circ$).",
    },
    {
      type: "callout",
      variant: "info",
      title: "The common ratio has a meaning: $2R$",
      content:
        "The shared value of $\\frac{a}{\\sin A}$ is the diameter of the triangle's circumcircle: $\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C} = 2R$. (Draw the diameter through $B$; the inscribed angle it makes at the far end equals $A$, and that triangle is right-angled.) JEE uses this form constantly.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "t5-1-q1",
      variant: "practice",
      question:
        "In a triangle, $A = 35^\\circ$, $a = 10$, and $B = 80^\\circ$. What is $b$?",
      options: [
        { text: "$\\dfrac{10\\sin 80^\\circ}{\\sin 35^\\circ} \\approx 17.2$", correct: true, feedback: "Matched pairs on both sides of the equation; the larger angle gets the longer side, as it should." },
        { text: "$\\dfrac{10\\sin 35^\\circ}{\\sin 80^\\circ} \\approx 5.8$", feedback: "Upside down — that makes the side opposite the bigger angle shorter, which is impossible." },
        { text: "$10\\sin 80^\\circ \\approx 9.8$", feedback: "That is a right-triangle move; there is no right angle here." },
      ],
      hint: "Write $\\frac{b}{\\sin B} = \\frac{a}{\\sin A}$ and solve for $b$. Should $b$ be longer or shorter than $a$?",
    },
    {
      type: "quiz",
      id: "t5-1-q2",
      variant: "concept",
      question: "Which set of information cannot be started with the law of sines?",
      options: [
        { text: "Three sides (SSS)", correct: true, feedback: "No angle is known, so no matched pair exists. That is the law of cosines' job (5.3)." },
        { text: "Two angles and a side (AAS)", feedback: "The third angle follows by subtraction, giving a matched pair." },
        { text: "Two sides and a non-included angle (SSA)", feedback: "It works — with the ambiguity of lesson 5.2 to watch for." },
      ],
      hint: "The law needs at least one side together with its opposite angle.",
    },
    {
      type: "quiz",
      id: "t5-1-q3",
      variant: "concept",
      question: "Why does dropping an altitude prove the law of sines?",
      options: [
        {
          text: "The same altitude can be written as $b\\sin A$ and as $a\\sin B$; equating the two expressions gives the ratio.",
          correct: true,
          feedback: "One segment, two right triangles, two ways of measuring it.",
        },
        { text: "Because the altitude bisects the opposite side.", feedback: "It does not, except in special triangles." },
        { text: "Because the two halves are congruent.", feedback: "They are generally not congruent — only the shared altitude matters." },
      ],
      hint: "The altitude belongs to two right triangles at once.",
    },
    {
      type: "numeric",
      id: "t5-1-q4",
      variant: "practice",
      question: "In triangle $ABC$, $A = 45^\\circ$, $B = 75^\\circ$ and $a = 10$. Find $c$ to 2 decimal places.",
      answer: 12.25,
      tolerance: 0.01,
      hint: "Find $C$ first, then pair it with $c$.",
      solution: "$C = 180^\\circ - 45^\\circ - 75^\\circ = 60^\\circ$, so $c = \\dfrac{10\\sin 60^\\circ}{\\sin 45^\\circ} = 5\\sqrt6 \\approx 12.25$.",
      commonMistakes: [
        { answer: 13.66, tolerance: 0.01, feedback: "That is $b$, opposite the $75^\\circ$ angle. Side $c$ is opposite $C = 60^\\circ$." },
        { answer: 8.16, tolerance: 0.01, feedback: "The ratio is upside down: $c = \\frac{a\\sin C}{\\sin A}$, not $\\frac{a\\sin A}{\\sin C}$." },
      ],
    },
    {
      type: "numeric",
      id: "t5-1-q5",
      variant: "practice",
      question: "In triangle $ABC$, $a = 6$ and $A = 30^\\circ$. What is the radius $R$ of its circumcircle?",
      answer: 6,
      hint: "Earlier in this lesson the common ratio $\\frac{a}{\\sin A}$ was given a geometric meaning involving the circumcircle.",
      solution: "$2R = \\dfrac{6}{\\sin 30^\\circ} = 12$, so $R = 6$.",
      commonMistakes: [
        { answer: 12, feedback: "That is $2R$, the diameter. Halve it." },
        { answer: 3, feedback: "You multiplied by $\\sin 30^\\circ$ instead of dividing." },
      ],
    },
    {
      type: "quiz",
      id: "t5-1-q6",
      variant: "concept",
      multiple: true,
      question: "Triangle $ABC$ has $A = 70^\\circ$, $B = 50^\\circ$, $C = 60^\\circ$. Select every true statement.",
      options: [
        { text: "$a$ is the longest side.", correct: true, feedback: "It is opposite the largest angle." },
        { text: "$b$ is the shortest side.", correct: true, feedback: "It is opposite the smallest angle." },
        { text: "$\\dfrac{a}{b} = \\dfrac{\\sin 70^\\circ}{\\sin 50^\\circ}$", correct: true, feedback: "Straight from the law of sines." },
        { text: "$\\dfrac{a}{b} = \\dfrac{70}{50}$", feedback: "Sides are proportional to the *sines* of the angles, not the angles: $\\frac{\\sin 70^\\circ}{\\sin 50^\\circ} \\approx 1.23$, not 1.4." },
        { text: "$c > a$", feedback: "$C = 60^\\circ < A = 70^\\circ$, so $c < a$." },
      ],
      hint: "A side and its opposite angle travel together, through their sines.",
    },
    {
      type: "numeric",
      id: "t5-1-q7",
      variant: "practice",
      question:
        "The angles of a triangle are in the ratio $1 : 2 : 3$, and its shortest side is 5. How long is its longest side?",
      answer: 10,
      hint: "Find the actual angles first. Then use the law of sines between the smallest and largest.",
      solution:
        "The angles are $30^\\circ, 60^\\circ, 90^\\circ$. The sides are in the ratio $\\sin 30^\\circ : \\sin 60^\\circ : \\sin 90^\\circ = 1 : \\sqrt3 : 2$, so the longest is $2 \\times 5 = 10$.",
      commonMistakes: [
        { answer: 15, feedback: "Sides are not in the ratio of the angles ($1:2:3$). They are in the ratio of the sines." },
        { answer: 8.66, tolerance: 0.01, feedback: "That is the middle side, opposite $60^\\circ$." },
      ],
    },
    {
      type: "numeric",
      id: "t5-1-q8",
      variant: "practice",
      question: "In triangle $ABC$, $a = 7$, $b = 5$ and $A = 60^\\circ$. Find $\\sin B$ to 3 decimal places.",
      answer: 0.619,
      tolerance: 0.001,
      hint: "Here $a$ and $A$ are the matched pair.",
      solution: "$\\sin B = \\dfrac{b\\sin A}{a} = \\dfrac{5 \\times 0.8660}{7} \\approx 0.619$.",
      commonMistakes: [
        { answer: 1.212, tolerance: 0.001, feedback: "Upside down: $\\frac{a\\sin A}{b}$. A sine above 1 is the warning sign." },
      ],
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "the-ambiguous-case",
  title: "5.2 · The Ambiguous Case",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "Two sides and a non-included angle — SSA — is the one configuration that does not pin down a triangle. Given $A$, $b$, and the side $a$ opposite $A$, you can hinge $a$ at vertex $C$ and swing it down toward the base. Depending on how long $a$ is, it may miss the base entirely, touch it once, or cross it twice.",
    },
    {
      type: "interactive",
      config: {
        component: "triangle-solver",
        mode: "ssa",
        initialB: 6,
        initialA: 5,
        initialAngle: 40,
        caption:
          "Shrink a below the dashed altitude and no triangle exists. Between the altitude and b, two triangles fit. Past b, only one.",
      },
    },
    { type: "heading", text: "Zero, one or two triangles" },
    {
      type: "callout",
      variant: "definition",
      title: "The four outcomes (for acute $A$)",
      content:
        "Let $h = b\\sin A$ be the altitude from $C$ — the shortest reach that touches the base.\n$a < h$: **no triangle** — too short to reach.\n$a = h$: **one** right triangle, exactly touching.\n$h < a < b$: **two triangles** — the swing crosses the base twice.\n$a \\ge b$: **one triangle** — the far crossing lands behind $A$ and is not a triangle.",
    },
    { type: "heading", text: "The algebra of the second candidate" },
    {
      type: "text",
      content:
        "The algebra tells the same story. Solving $\\sin B = \\frac{b\\sin A}{a}$ can give a value greater than 1 (no triangle), exactly 1 (one), or less than 1 — in which case *two* angles in $(0^\\circ, 180^\\circ)$ have that sine: $B$ and $180^\\circ - B$. This is Chapter 4.1's \"the calculator gives you one of them\", now with geometric consequences.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "The check that resolves it",
      content:
        "For the second candidate $B' = 180^\\circ - B$, compute $A + B'$. If it is $180^\\circ$ or more, there is no room left for the third angle and that candidate is dead. If it is less, the second triangle is genuine and you must report both.",
    },
    {
      type: "worked-example",
      id: "t5-2-we1",
      title: "Worked example 1: two triangles",
      problem: "$A = 30^\\circ$, $a = 8$, $b = 12$. How many triangles fit, and what are their angles?",
      steps: [
        {
          text: "By the law of sines, $\\sin B = \\frac{12\\sin 30^\\circ}{8} = 0.75$, so $B \\approx 48.6^\\circ$ or $B' \\approx 131.4^\\circ$.",
        },
        {
          text: "Check both: $30 + 48.6 = 78.6 < 180$, and $30 + 131.4 = 161.4 < 180$. Both survive — this SSA has **two** solutions, with third angles $101.4^\\circ$ and $18.6^\\circ$.",
        },
      ],
      answer: "Two triangles: $(B, C) \\approx (48.6^\\circ, 101.4^\\circ)$ or $(131.4^\\circ, 18.6^\\circ)$.",
      tryFirst: false,
    },
    {
      type: "text",
      content:
        "If instead $A$ is obtuse, the ambiguity disappears: a triangle can hold only one obtuse angle, so $B$ must be acute and only one candidate ever survives.",
    },
    {
      type: "worked-example",
      id: "t5-2-we2",
      title: "Worked example 2: solving both triangles to the end",
      problem: "$A = 40^\\circ$, $b = 10$, $a = 8$. Find every possible length of the third side $c$.",
      steps: [
        {
          text: "Classify first: $h = b\\sin A = 10\\sin 40^\\circ \\approx 6.43$, and $6.43 < 8 < 10$, so expect two triangles.",
        },
        {
          text: "Law of sines for $B$:",
          latex: "\\sin B = \\frac{10\\sin 40^\\circ}{8} \\approx 0.8035 \\;\\Rightarrow\\; B \\approx 53.46^\\circ \\text{ or } B' \\approx 126.54^\\circ",
        },
        {
          text: "Third angles: $C = 180^\\circ - 40^\\circ - 53.46^\\circ = 86.54^\\circ$ and $C' = 13.46^\\circ$. Then each $c$ from the matched pair $a$, $A$:",
          latex: "c = \\frac{8\\sin 86.54^\\circ}{\\sin 40^\\circ} \\approx 12.42, \\qquad c' = \\frac{8\\sin 13.46^\\circ}{\\sin 40^\\circ} \\approx 2.90",
        },
        {
          text: "A neat check: the law of cosines $a^2 = b^2 + c^2 - 2bc\\cos A$ is a quadratic in $c$, and the sum of its roots is $2b\\cos A = 20\\cos 40^\\circ \\approx 15.32$. Indeed $12.42 + 2.90 = 15.32$.",
        },
      ],
      answer: "$c \\approx 12.42$ or $c \\approx 2.90$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "t5-2-q1",
      variant: "practice",
      question: "$A = 40^\\circ$, $b = 10$, $a = 4$. How many triangles fit?",
      options: [
        { text: "None — $a$ is shorter than the altitude $h = 10\\sin 40^\\circ \\approx 6.43$.", correct: true, feedback: "The swung side cannot reach the base, so no triangle closes." },
        { text: "One.", feedback: "That would need $a \\ge h$, and here it falls short." },
        { text: "Two.", feedback: "Two requires $h < a < b$; $a = 4$ is below $h$." },
      ],
      hint: "Compute the altitude first and compare.",
    },
    {
      type: "quiz",
      id: "t5-2-q2",
      variant: "concept",
      question: "Why can SSA give two triangles while SAS never does?",
      options: [
        {
          text: "In SAS the angle sits between the two known sides, closing the triangle rigidly; in SSA the known side hinges and can reach the base at two points.",
          correct: true,
          feedback: "Included versus non-included is the whole difference.",
        },
        { text: "Because SSA uses the law of sines and SAS uses the law of cosines.", feedback: "Which tool you use is a consequence, not the cause." },
        { text: "Because SSA always involves an obtuse angle.", feedback: "The ambiguity happens with an acute given angle; an obtuse one removes it." },
      ],
      hint: "Where does the known angle sit relative to the two known sides in each case?",
    },
    {
      type: "quiz",
      id: "t5-2-q3",
      variant: "practice",
      question:
        "You find $\\sin B = 0.9$ with $A = 70^\\circ$. Which candidates for $B$ survive?",
      options: [
        { text: "Only $B \\approx 64.2^\\circ$ — the obtuse candidate $115.8^\\circ$ would make $A + B$ exceed $180^\\circ$.", correct: true, feedback: "$70 + 115.8 = 185.8$, leaving no room for the third angle." },
        { text: "Both $64.2^\\circ$ and $115.8^\\circ$.", feedback: "Always run the angle-sum check before accepting the second one." },
        { text: "Neither, since $\\sin B < 1$ means no triangle.", feedback: "A sine below 1 is exactly what makes a triangle possible; above 1 is the impossible case." },
      ],
      hint: "Find both angles with sine 0.9, then add each to $A$.",
    },
    {
      type: "numeric",
      id: "t5-2-q4",
      variant: "practice",
      question: "$A = 30^\\circ$, $b = 10$, $a = 6$. How many triangles fit?",
      answer: 2,
      hint: "Compare $a$ with the altitude $h = b\\sin A$ and with $b$.",
      solution: "$h = 10\\sin 30^\\circ = 5$. Since $5 < 6 < 10$, the swinging side crosses the base twice: two triangles.",
      commonMistakes: [
        { answer: 1, feedback: "One triangle needs $a = h$ or $a \\ge b$. Here $h < a < b$." },
        { answer: 0, feedback: "$a = 6$ is longer than the altitude 5, so it does reach the base." },
      ],
    },
    {
      type: "quiz",
      id: "t5-2-q5",
      variant: "practice",
      multiple: true,
      question: "$A = 30^\\circ$ and $b = 12$. Select every value of $a$ for which **exactly one** triangle exists.",
      options: [
        { text: "$a = 6$", correct: true, feedback: "$a = h = 12\\sin 30^\\circ$: the side just touches the base, giving one right triangle." },
        { text: "$a = 15$", correct: true, feedback: "$a > b$: the second crossing falls behind $A$, so only one triangle." },
        { text: "$a = 12$", correct: true, feedback: "$a = b$: the second crossing lands exactly on $A$ and collapses, leaving one (isosceles) triangle." },
        { text: "$a = 9$", feedback: "$6 < 9 < 12$: two triangles." },
        { text: "$a = 4$", feedback: "$4 < h = 6$: the side cannot reach the base, so none." },
      ],
      hint: "Compute $h = b\\sin A$ first, then sort each $a$ into one of the four outcomes.",
    },
    {
      type: "numeric",
      id: "t5-2-q6",
      variant: "practice",
      question:
        "In worked example 1 ($A = 30^\\circ$, $a = 8$, $b = 12$), find the third side $c$ of the triangle with the **obtuse** angle $B$. Give it to 2 decimal places.",
      answer: 5.1,
      tolerance: 0.01,
      hint: "In that triangle $C \\approx 18.59^\\circ$. Pair it with $a$ and $A$.",
      solution: "$c' = \\dfrac{8\\sin 18.59^\\circ}{\\sin 30^\\circ} \\approx \\dfrac{8 \\times 0.3188}{0.5} \\approx 5.10$.",
      commonMistakes: [
        { answer: 15.68, tolerance: 0.01, feedback: "That is $c$ in the *other* triangle, where $B$ is acute and $C \\approx 101.4^\\circ$." },
      ],
    },
    {
      type: "numeric",
      id: "t5-2-q7",
      variant: "practice",
      question:
        "$A = 35^\\circ$, $b = 12$, $a = 9$. Check that two triangles fit, then, without solving either one, find the **sum** of the two possible values of $c$, to 2 decimal places.",
      answer: 24 * Math.cos((35 * Math.PI) / 180),
      tolerance: 0.01,
      hint: "The law of cosines for side $a$ is a quadratic in the unknown $c$. What do you know about the sum of a quadratic's roots?",
      solution:
        "Two triangles: $h = 12\\sin 35^\\circ \\approx 6.88$ and $6.88 < 9 < 12$.\n\n$81 = 144 + c^2 - 24c\\cos 35^\\circ$, i.e. $c^2 - (24\\cos 35^\\circ)c + 63 = 0$. Both roots are the two possible $c$, and their sum is $24\\cos 35^\\circ \\approx 19.66$. (Solving fully gives $c \\approx 15.63$ and $4.03$.)",
      commonMistakes: [
        { answer: 63, feedback: "That is the *product* of the roots, $b^2 - a^2$. The sum is the negative of the middle coefficient." },
        { answer: 12 * Math.cos((35 * Math.PI) / 180), tolerance: 0.01, feedback: "The middle coefficient is $-2bc\\cos A$ with $b = 12$, so the sum is $2b\\cos A = 24\\cos 35^\\circ$." },
      ],
    },
    {
      type: "quiz",
      id: "t5-2-q8",
      variant: "concept",
      question: "$A = 110^\\circ$, $a = 8$, $b = 10$. How many triangles fit?",
      options: [
        {
          text: "None: the side opposite the obtuse angle must be the longest, but $a < b$.",
          correct: true,
          feedback: "An obtuse angle is the largest angle, so its opposite side must be the longest. $\\sin B = \\frac{10\\sin 110^\\circ}{8} > 1$ confirms it.",
        },
        { text: "One, since an obtuse $A$ removes the ambiguity.", feedback: "It removes the *two*-triangle case, but here no triangle fits at all." },
        { text: "Two, since $\\sin B < 1$.", feedback: "Compute it: $\\frac{10 \\times 0.94}{8} \\approx 1.17 > 1$." },
      ],
      hint: "Which side must be the longest in a triangle with an obtuse angle?",
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "law-of-cosines",
  title: "5.3 · Law of Cosines",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "The law of sines needs a matched side-angle pair. Two common situations offer none: **SAS** (two sides and the angle between them) and **SSS** (all three sides). For those, the law of cosines.",
    },
    { type: "heading", text: "Derivation from coordinates" },
    {
      type: "text",
      content:
        "**The derivation.** Place vertex $A$ at the origin with side $c$ along the x-axis, so $B = (c, 0)$. Vertex $C$ is at distance $b$ along a ray at angle $A$, so its coordinates are $(b\\cos A,\\ b\\sin A)$ — which is exactly the Chapter 1 definition doing its work.\n\nNow compute $a$, the distance from $B$ to $C$:",
    },
    {
      type: "math",
      latex: "a^2 = (b\\cos A - c)^2 + (b\\sin A)^2",
    },
    {
      type: "text",
      content: "Expand, and collect the $b^2$ terms:",
    },
    {
      type: "math",
      latex:
        "a^2 = b^2\\cos^2 A - 2bc\\cos A + c^2 + b^2\\sin^2 A = b^2(\\cos^2 A + \\sin^2 A) + c^2 - 2bc\\cos A",
    },
    {
      type: "text",
      content: "The bracket is 1, by the Pythagorean identity. What remains is the law:",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Law of Cosines",
      content:
        "$a^2 = b^2 + c^2 - 2bc\\cos A$, and likewise for the other two vertices.\nIt is Pythagoras plus a correction term that measures how far the angle is from square.",
    },
    { type: "heading", text: "Pythagoras as a special case" },
    {
      type: "text",
      content:
        "Check the claim: set $A = 90^\\circ$. Then $\\cos A = 0$, the correction vanishes, and the statement collapses to $a^2 = b^2 + c^2$. Pythagoras is the special case, and the law of cosines is its generalisation to any angle.\n\nThe correction's sign is also readable. For an acute $A$, $\\cos A > 0$ and the opposite side comes out *shorter* than Pythagoras would give; for an obtuse $A$, $\\cos A < 0$ and the side is *longer*.",
    },
    {
      type: "interactive",
      config: {
        component: "triangle-solver",
        mode: "sas",
        initialB: 5,
        initialC: 7,
        initialAngle: 90,
        showLawOfSines: false,
        caption:
          "Park the angle at 90° and check $a$ against $\\sqrt{b^2+c^2}$. Then open the angle past 90° and watch the opposite side grow.",
      },
    },
    { type: "heading", text: "Solving SAS and SSS triangles" },
    {
      type: "text",
      content:
        "**Rearranged for SSS.** Knowing all three sides, solve for the angle instead:",
    },
    { type: "math", latex: "\\cos A = \\frac{b^2 + c^2 - a^2}{2bc}" },
    {
      type: "callout",
      variant: "tip",
      title: "A free classification test",
      content:
        "The sign of that numerator tells you the shape without computing the angle. $b^2 + c^2 > a^2$ means $A$ is acute; equal means right; less means obtuse. Cheap and often all you need.",
    },
    {
      type: "worked-example",
      id: "t5-3-we1",
      title: "Worked example 1: the largest angle from three sides",
      problem: "A triangle has sides 7, 8 and 13. Find its largest angle.",
      steps: [
        { text: "The largest angle is opposite the longest side, 13. Call it $C$, with $a = 7$, $b = 8$, $c = 13$." },
        {
          text: "Law of cosines, rearranged for the angle:",
          latex: "\\cos C = \\frac{a^2 + b^2 - c^2}{2ab} = \\frac{49 + 64 - 169}{2 \\cdot 7 \\cdot 8} = \\frac{-56}{112} = -\\frac12",
        },
        {
          text: "A negative cosine means obtuse (the free test agrees: $49 + 64 < 169$). The angle in $(0^\\circ, 180^\\circ)$ with cosine $-\\frac12$ is unique:",
          latex: "C = 120^\\circ",
        },
      ],
      answer: "The largest angle is $120^\\circ$.",
    },
    {
      type: "worked-example",
      id: "t5-3-we2",
      title: "Worked example 2: two ships",
      problem:
        "Two ships leave port at the same time on straight courses $60^\\circ$ apart, one at 20 km/h and the other at 30 km/h. How far apart are they after 2 hours?",
      steps: [
        {
          text: "After 2 hours they are 40 km and 60 km from port, and the angle between their courses at the port is $60^\\circ$: an SAS triangle.",
        },
        {
          text: "Law of cosines for the side opposite the $60^\\circ$:",
          latex: "d^2 = 40^2 + 60^2 - 2(40)(60)\\cos 60^\\circ = 1600 + 3600 - 2400 = 2800",
        },
        {
          text: "Take the root:",
          latex: "d = \\sqrt{2800} = 20\\sqrt7 \\approx 52.92 \\text{ km}",
        },
      ],
      answer: "About 52.92 km apart.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "The projection formula (JEE)",
      content:
        "Drop the altitude from $A$ onto side $a$: the two pieces of $a$ are $b\\cos C$ and $c\\cos B$. So in any triangle $a = b\\cos C + c\\cos B$ (and similarly for $b$ and $c$). Many 'evaluate this expression' questions collapse to a single side once you spot it.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "t5-3-q1",
      variant: "practice",
      question: "Sides $b = 5$, $c = 7$, included angle $A = 60^\\circ$. Find $a$.",
      options: [
        { text: "$\\sqrt{39} \\approx 6.24$", correct: true, feedback: "$25 + 49 - 2(5)(7)(0.5) = 74 - 35 = 39$." },
        { text: "$\\sqrt{74} \\approx 8.60$", feedback: "That is the Pythagorean value — you dropped the correction term." },
        { text: "$\\sqrt{109} \\approx 10.44$", feedback: "You added the correction instead of subtracting it; that is the obtuse case." },
      ],
      hint: "$a^2 = b^2 + c^2 - 2bc\\cos A$, and $\\cos 60^\\circ = \\frac12$.",
    },
    {
      type: "quiz",
      id: "t5-3-q2",
      variant: "concept",
      question: "A triangle has sides 4, 6, 9. What kind of triangle is it?",
      options: [
        { text: "Obtuse — $4^2 + 6^2 = 52 < 81 = 9^2$.", correct: true, feedback: "The numerator $b^2 + c^2 - a^2$ is negative, so the cosine of the largest angle is negative." },
        { text: "Right.", feedback: "That needs equality, and $52 \\ne 81$." },
        { text: "Acute.", feedback: "Acute needs $b^2 + c^2 > a^2$ for the *largest* side; here it is smaller." },
      ],
      hint: "Only the largest angle can be obtuse. Compare the square of the longest side with the sum of the other two squares.",
    },
    {
      type: "quiz",
      id: "t5-3-q3",
      variant: "concept",
      question: "Which law should you start with given SSS?",
      options: [
        { text: "Law of cosines, rearranged for an angle.", correct: true, feedback: "No angle is known, so there is no matched pair for the law of sines to use." },
        { text: "Law of sines.", feedback: "It needs a side together with its opposite angle; SSS supplies no angle at all." },
        { text: "Either works equally well.", feedback: "Only after the law of cosines has produced the first angle does the law of sines become usable." },
      ],
      hint: "Does SSS give you any matched side-angle pair?",
    },
    {
      type: "numeric",
      id: "t5-3-q4",
      variant: "practice",
      question: "A triangle has sides 5, 7 and 8. Find the angle opposite the side of length 7, in degrees.",
      answer: 60,
      unit: "degrees",
      hint: "Put the side opposite the angle you want on its own: $\\cos B = \\frac{a^2 + c^2 - b^2}{2ac}$.",
      solution: "$\\cos B = \\dfrac{25 + 64 - 49}{2 \\cdot 5 \\cdot 8} = \\dfrac{40}{80} = \\dfrac12$, so $B = 60^\\circ$.",
      commonMistakes: [
        { answer: 81.79, tolerance: 0.01, feedback: "That is the angle opposite the side 8. The side opposite your angle is the one subtracted in the numerator." },
        { answer: 38.21, tolerance: 0.01, feedback: "That is the angle opposite the side 5." },
      ],
    },
    {
      type: "numeric",
      id: "t5-3-q5",
      variant: "practice",
      question: "Sides $b = 8$ and $c = 5$ enclose the angle $A = 120^\\circ$. Find $a$ to 2 decimal places.",
      answer: Math.sqrt(129),
      tolerance: 0.01,
      hint: "$\\cos 120^\\circ$ is negative, so the correction term *adds*.",
      solution: "$a^2 = 64 + 25 - 2(8)(5)\\left(-\\frac12\\right) = 89 + 40 = 129$, so $a = \\sqrt{129} \\approx 11.36$.",
      commonMistakes: [
        { answer: 7, feedback: "You used $\\cos 120^\\circ = +\\frac12$: $\\sqrt{89 - 40} = 7$. The cosine of an obtuse angle is negative." },
        { answer: 9.43, tolerance: 0.01, feedback: "That is $\\sqrt{89}$: you dropped the correction term." },
      ],
    },
    {
      type: "numeric",
      id: "t5-3-q6",
      variant: "practice",
      question: "In triangle $ABC$, $(a + b + c)(a + b - c) = 3ab$. Find angle $C$ in degrees.",
      answer: 60,
      unit: "degrees",
      hint: "Expand the left side as a difference of two squares, then compare with the law of cosines for $c$.",
      solution:
        "$(a + b)^2 - c^2 = 3ab$, so $a^2 + 2ab + b^2 - c^2 = 3ab$, i.e. $a^2 + b^2 - c^2 = ab$.\n\nThen $\\cos C = \\dfrac{a^2 + b^2 - c^2}{2ab} = \\dfrac{ab}{2ab} = \\dfrac12$, so $C = 60^\\circ$.",
      commonMistakes: [
        { answer: 120, feedback: "Sign slip: moving $2ab$ across gives $a^2 + b^2 - c^2 = +ab$, so $\\cos C = +\\frac12$." },
        { answer: 30, feedback: "$\\cos C = \\frac12$ belongs to $60^\\circ$; $30^\\circ$ has *sine* $\\frac12$." },
      ],
    },
    {
      type: "quiz",
      id: "t5-3-q7",
      variant: "practice",
      multiple: true,
      question: "Select every set of side lengths that forms an **obtuse** triangle.",
      options: [
        { text: "2, 3, 4", correct: true, feedback: "$4 + 9 = 13 < 16$." },
        { text: "3, 5, 7", correct: true, feedback: "$9 + 25 = 34 < 49$ (the largest angle is $120^\\circ$)." },
        { text: "6, 8, 10", feedback: "$36 + 64 = 100$ exactly: a right triangle." },
        { text: "5, 6, 7", feedback: "$25 + 36 = 61 > 49$: acute." },
        { text: "4, 5, 6", feedback: "$16 + 25 = 41 > 36$: acute." },
      ],
      hint: "For each, compare the square of the longest side with the sum of the squares of the other two.",
    },
    {
      type: "numeric",
      id: "t5-3-q8",
      variant: "practice",
      question:
        "Two boats leave a harbour on courses $120^\\circ$ apart, at 12 km/h and 16 km/h. How far apart are they after 1.5 hours? Give your answer to 2 decimal places.",
      answer: Math.sqrt(1332),
      tolerance: 0.01,
      unit: "km",
      hint: "Find the two distances from the harbour first, then use the law of cosines with the $120^\\circ$ angle.",
      solution:
        "The distances are 18 km and 24 km. $d^2 = 18^2 + 24^2 - 2(18)(24)\\cos 120^\\circ = 324 + 576 + 432 = 1332$, so $d \\approx 36.50$ km.",
      commonMistakes: [
        { answer: 30, feedback: "That is $\\sqrt{18^2 + 24^2}$, the right-angle answer. The angle here is $120^\\circ$." },
        { answer: 21.63, tolerance: 0.01, feedback: "You used $\\cos 120^\\circ = +\\frac12$. The correction must add for an obtuse angle." },
      ],
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "areas-and-applications",
  title: "5.4 · Areas and Applications",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "The school formula for the area of a triangle is $\\frac12 \\times \\text{base} \\times \\text{height}$, which is useless when nobody tells you the height. Trigonometry supplies it.\n\nWith sides $a$ and $b$ meeting at angle $C$, the height above the base $a$ is $b\\sin C$. So:",
    },
    { type: "math", latex: "\\text{Area} = \\tfrac{1}{2}ab\\sin C" },
    {
      type: "callout",
      variant: "definition",
      title: "Two sides and the angle between them",
      content:
        "The formula needs the **included** angle — the one where the two sides meet. Any other angle gives the wrong height. As a check, $C = 90^\\circ$ makes $\\sin C = 1$ and recovers $\\frac12 \\times$ base $\\times$ height.",
    },
    {
      type: "interactive",
      config: {
        component: "triangle-solver",
        mode: "sas",
        initialB: 6,
        initialC: 8,
        initialAngle: 50,
        showLawOfSines: false,
        caption:
          "Hold the two sides fixed and sweep the angle. The area peaks at exactly 90°, where $\\sin C = 1$ — the most area two sides of fixed length can enclose.",
      },
    },
    { type: "heading", text: "Heron's formula" },
    {
      type: "text",
      content:
        "**Heron's formula is a consequence, not a separate idea.** Given three sides and no angle, use the law of cosines to get $\\cos C$, convert to $\\sin C$ with the Pythagorean identity, substitute into $\\frac12 ab\\sin C$, and grind the algebra. What falls out is:",
    },
    {
      type: "math",
      latex: "\\text{Area} = \\sqrt{s(s-a)(s-b)(s-c)}, \\qquad s = \\frac{a+b+c}{2}",
    },
    {
      type: "text",
      content:
        "You are not expected to reproduce that derivation under time. You *are* expected to know that Heron's formula is downstream of the law of cosines rather than a fact from nowhere.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Choosing a tool, in one line each",
      content:
        "**Right triangle?** SOH-CAH-TOA and Pythagoras.\n**A matched side and opposite angle?** Law of sines (check SSA for ambiguity).\n**Two sides and the included angle, or all three sides?** Law of cosines.\n**Area with two sides and their included angle?** $\\frac12 ab\\sin C$. **Three sides?** Heron.",
    },
    { type: "heading", text: "Applications" },
    {
      type: "worked-example",
      id: "t5-4-we1",
      title: "A navigation example",
      problem:
        "A ship sails 40 km on a bearing of $050^\\circ$, then 25 km on a bearing of $140^\\circ$. How far is it from port?",
      steps: [
        {
          text: "The two bearings differ by $90^\\circ$, so the interior angle at the turning point is $180^\\circ - 90^\\circ = 90^\\circ$.",
        },
        {
          text: "The law of cosines with $\\cos 90^\\circ = 0$ collapses to Pythagoras:",
          latex: "d = \\sqrt{40^2 + 25^2} \\approx 47.2 \\text{ km}",
        },
        { text: "The general method handles the special case without any extra thought." },
      ],
      answer: "About 47.2 km from port.",
      tryFirst: false,
    },
    {
      type: "worked-example",
      id: "t5-4-we2",
      title: "Worked example: the 13-14-15 triangle",
      problem:
        "A triangle has sides 13, 14 and 15. Find its area, its inradius $r$ (the radius of the inscribed circle) and its circumradius $R$.",
      steps: [
        {
          text: "Heron: the semi-perimeter is $s = \\frac{13 + 14 + 15}{2} = 21$.",
          latex: "\\Delta = \\sqrt{21 \\cdot 8 \\cdot 7 \\cdot 6} = \\sqrt{7056} = 84",
        },
        {
          text: "The incircle splits the triangle into three triangles of height $r$ on the three sides, so $\\Delta = \\frac12 r(a + b + c) = rs$:",
          latex: "r = \\frac{\\Delta}{s} = \\frac{84}{21} = 4",
        },
        {
          text: "Combine $\\Delta = \\frac12 ab\\sin C$ with $\\sin C = \\frac{c}{2R}$ (lesson 5.1) to get $\\Delta = \\frac{abc}{4R}$:",
          latex: "R = \\frac{abc}{4\\Delta} = \\frac{13 \\cdot 14 \\cdot 15}{336} = \\frac{2730}{336} = 8.125",
        },
      ],
      answer: "Area $84$, inradius $4$, circumradius $8.125$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Three area formulas, one triangle",
      content:
        "$\\Delta = \\tfrac12 ab\\sin C = \\sqrt{s(s-a)(s-b)(s-c)} = rs = \\dfrac{abc}{4R}$. JEE questions on 'properties of triangles' are mostly about moving between these.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "t5-4-q1",
      variant: "practice",
      question: "Two sides of length 9 and 12 meet at $30^\\circ$. What is the area?",
      options: [
        { text: "$27$", correct: true, feedback: "$\\frac12(9)(12)\\sin 30^\\circ = 54 \\times \\frac12$." },
        { text: "$54$", feedback: "That is $\\frac12 ab$ without the sine factor — it would need a right angle." },
        { text: "$108$", feedback: "That is $ab$; the formula halves it and scales by $\\sin C$." },
      ],
      hint: "$\\frac12 ab\\sin C$, with the angle between the two sides.",
    },
    {
      type: "quiz",
      id: "t5-4-q2",
      variant: "concept",
      question:
        "Two sides have fixed lengths. Which included angle encloses the greatest area?",
      options: [
        { text: "$90^\\circ$", correct: true, feedback: "The area is proportional to $\\sin C$, which peaks at 1 when $C = 90^\\circ$." },
        { text: "$60^\\circ$", feedback: "$\\sin 60^\\circ \\approx 0.87$, less than 1." },
        { text: "$180^\\circ$", feedback: "Then the triangle flattens to a line, with zero area." },
      ],
      hint: "With $a$ and $b$ fixed, the area is proportional to one trig function of $C$. Where is it largest?",
    },
    {
      type: "quiz",
      id: "t5-4-q3",
      variant: "practice",
      question:
        "A triangular plot has sides 13, 14, 15 m. Which method gives its area most directly?",
      options: [
        { text: "Heron's formula, with $s = 21$.", correct: true, feedback: "Three sides and no angle is precisely Heron's case; the area is 84 m²." },
        { text: "$\\frac12 ab\\sin C$ straight away.", feedback: "No angle is given, so you would have to find one first — a longer road." },
        { text: "$\\frac12 \\times$ base $\\times$ height.", feedback: "No height is given either." },
      ],
      hint: "What is given: sides, angles, or a height?",
    },
    {
      type: "numeric",
      id: "t5-4-q4",
      variant: "practice",
      question: "Find the area of a triangle with sides 5, 6 and 7, to 2 decimal places.",
      answer: Math.sqrt(216),
      tolerance: 0.01,
      hint: "Heron: start with the semi-perimeter.",
      solution: "$s = 9$, so $\\Delta = \\sqrt{9 \\cdot 4 \\cdot 3 \\cdot 2} = \\sqrt{216} = 6\\sqrt6 \\approx 14.70$.",
      commonMistakes: [
        { answer: Math.sqrt(18 * 13 * 12 * 11), tolerance: 0.01, feedback: "You used the full perimeter 18 instead of the semi-perimeter $s = 9$." },
      ],
    },
    {
      type: "numeric",
      id: "t5-4-q5",
      variant: "practice",
      question: "Find the inradius of the right triangle with sides 5, 12 and 13.",
      answer: 2,
      hint: "Area $= rs$. The area of a right triangle is easy.",
      solution: "$\\Delta = \\frac12 \\cdot 5 \\cdot 12 = 30$ and $s = 15$, so $r = \\frac{30}{15} = 2$.",
      commonMistakes: [
        { answer: 1, feedback: "You divided by the full perimeter 30. The formula uses the semi-perimeter." },
        { answer: 6.5, feedback: "That is the circumradius (half the hypotenuse), not the inradius." },
      ],
    },
    {
      type: "numeric",
      id: "t5-4-q6",
      variant: "practice",
      question: "Find the circumradius of the triangle with sides 5, 12 and 13.",
      answer: 6.5,
      tolerance: 0.001,
      hint: "Use $R = \\frac{abc}{4\\Delta}$, or think about where the right angle is.",
      solution: "$R = \\dfrac{5 \\cdot 12 \\cdot 13}{4 \\cdot 30} = \\dfrac{780}{120} = 6.5$: half the hypotenuse, since the hypotenuse of a right triangle is a diameter of its circumcircle.",
      commonMistakes: [
        { answer: 13, feedback: "That is the diameter $2R$. Halve it." },
        { answer: 2, feedback: "That is the inradius." },
      ],
    },
    {
      type: "numeric",
      id: "t5-4-q7",
      variant: "practice",
      question: "Find the area of a triangle with $a = 10$, $b = 14$ and included angle $C = 150^\\circ$.",
      answer: 35,
      hint: "$\\sin 150^\\circ$ equals the sine of its reference angle.",
      solution: "$\\Delta = \\frac12 \\cdot 10 \\cdot 14 \\cdot \\sin 150^\\circ = 70 \\cdot \\frac12 = 35$.",
      commonMistakes: [
        { answer: -60.62, tolerance: 0.01, feedback: "You used $\\cos 150^\\circ$. The area uses the sine of the included angle." },
        { answer: 70, feedback: "You forgot the $\\sin 150^\\circ = \\frac12$ factor." },
      ],
    },
    {
      type: "numeric",
      id: "t5-4-q8",
      variant: "practice",
      question:
        "A ship sails 30 km on a bearing of $040^\\circ$, then 50 km on a bearing of $100^\\circ$. How far is it from port?",
      answer: 70,
      unit: "km",
      hint: "The course turns through $60^\\circ$. What is the interior angle of the triangle at the turning point?",
      solution:
        "The interior angle at the turn is $180^\\circ - 60^\\circ = 120^\\circ$. So $d^2 = 30^2 + 50^2 - 2(30)(50)\\cos 120^\\circ = 900 + 2500 + 1500 = 4900$ and $d = 70$ km.",
      commonMistakes: [
        { answer: 43.59, tolerance: 0.01, feedback: "You used $60^\\circ$ as the interior angle. The change of bearing is $60^\\circ$, so the interior angle is $180^\\circ - 60^\\circ$." },
        { answer: 58.31, tolerance: 0.01, feedback: "That assumes a right angle at the turn. The bearings differ by $60^\\circ$, not $90^\\circ$." },
      ],
    },
    {
      type: "quiz",
      id: "t5-4-q9",
      variant: "concept",
      multiple: true,
      question: "Select every set of information that gives a triangle's area **directly**, by one formula.",
      options: [
        { text: "Two sides and the angle between them.", correct: true, feedback: "$\\frac12 ab\\sin C$." },
        { text: "All three sides.", correct: true, feedback: "Heron's formula." },
        { text: "A side and the height onto it.", correct: true, feedback: "$\\frac12 \\times$ base $\\times$ height." },
        { text: "Two sides and an angle that is not between them.", feedback: "SSA: first solve for the included angle (possibly two answers), so not direct." },
        { text: "All three angles.", feedback: "Angles fix the shape but not the size, so the area is not determined at all." },
      ],
      hint: "For each, ask whether a single formula applies, and whether the area is even determined.",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "the-small-angle-surprise",
  title: "5.5 · The Small-Angle Surprise",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "Take a small angle, in radians, and compare it with its own sine.",
    },
    {
      type: "table",
      headers: ["$\\theta$ (rad)", "$\\sin\\theta$", "$\\dfrac{\\sin\\theta}{\\theta}$"],
      rows: [
        ["$1$", "$0.84147$", "$0.84147$"],
        ["$0.5$", "$0.47943$", "$0.95885$"],
        ["$0.1$", "$0.09983$", "$0.99833$"],
        ["$0.01$", "$0.0099998$", "$0.99998$"],
        ["$0.001$", "$0.00099999983$", "$0.9999998$"],
      ],
    },
    {
      type: "text",
      content:
        "The ratio is closing in on 1. Which is to say: for small $\\theta$ measured in radians, $\\sin\\theta$ and $\\theta$ are nearly the same number.",
    },
    { type: "math", latex: "\\sin\\theta \\approx \\theta \\quad\\text{for small }\\theta\\text{ (in radians)}" },
    { type: "heading", text: "Arc versus height" },
    {
      type: "callout",
      variant: "info",
      title: "Why, geometrically",
      content:
        "On the unit circle, $\\theta$ is the length of the **arc** (that is the definition of a radian, from Chapter 0.6) while $\\sin\\theta$ is the **vertical height** of its endpoint. For a small arc, the arc and the straight-line height are almost indistinguishable — a short piece of a circle is nearly straight.",
    },
    {
      type: "text",
      content:
        "Zoom in on the two curves $y = \\sin x$ and $y = x$ near the origin and they become impossible to tell apart:",
    },
    {
      type: "interactive",
      config: {
        component: "family-gallery",
        families: [
          { label: "sin x", expr: "sin(x)", latex: "\\sin x", excluded: [] },
          { label: "x", expr: "x", latex: "x", excluded: [] },
          { label: "sin x − x", expr: "sin(x) - x", latex: "\\sin x - x", excluded: [] },
        ],
        window: { xmin: -1, xmax: 1, ymin: -1, ymax: 1 },
      },
    },
    {
      type: "text",
      content:
        "The third curve is the *error*, and near zero it is flat against the axis — the difference dies away far faster than the values themselves.",
    },
    { type: "heading", text: "Why degrees break it" },
    {
      type: "callout",
      variant: "warning",
      title: "Radians only",
      content:
        "In degrees this is flatly false. $\\sin 1^\\circ \\approx 0.01745$, not 1. The approximation is a statement about the radian measure, because only radians make the arc length and the angle the same number.",
    },
    {
      type: "text",
      content:
        "Physics runs on this. The pendulum equation is only solvable because $\\sin\\theta$ is replaced by $\\theta$ for small swings; optics uses it for paraxial rays; a surveyor's small-angle corrections are the same substitution. In each case the price is an error of order $\\theta^3$, which for a small $\\theta$ is nothing.",
    },
    { type: "heading", text: "Using the approximations" },
    {
      type: "text",
      content:
        "Two companions come from the same picture. Tangent is sine over cosine, and cosine is nearly 1 for a small angle, so $\\tan\\theta \\approx \\theta$ too. For cosine itself, use the half-angle identity from Chapter 3.4: $1 - \\cos\\theta = 2\\sin^2\\frac{\\theta}{2} \\approx 2\\left(\\frac{\\theta}{2}\\right)^2$, so\n$$\\cos\\theta \\approx 1 - \\frac{\\theta^2}{2}.$$",
    },
    {
      type: "worked-example",
      id: "t5-5-we1",
      title: "Worked example 1: how good is the approximation?",
      problem: "Estimate $\\sin 0.05$ with $\\sin\\theta \\approx \\theta$, and estimate the size of the error.",
      steps: [
        { text: "The approximation gives $\\sin 0.05 \\approx 0.05$." },
        {
          text: "The error is of order $\\theta^3$; more precisely, about $\\frac{\\theta^3}{6}$ (calculus will explain the 6):",
          latex: "\\frac{(0.05)^3}{6} = \\frac{0.000125}{6} \\approx 0.0000208",
        },
        {
          text: "A calculator gives $\\sin 0.05 = 0.0499792$, which is $0.05 - 0.0000208$. The estimate was off by about 0.04%.",
        },
      ],
      answer: "$\\sin 0.05 \\approx 0.05$, too large by about $2 \\times 10^{-5}$.",
    },
    {
      type: "worked-example",
      id: "t5-5-we2",
      title: "Worked example 2: how far away is the Moon?",
      problem:
        "The Moon's diameter is about 3474 km, and from Earth it spans an angle of about $0.52^\\circ$. Estimate its distance.",
      steps: [
        {
          text: "Convert the angle to radians, because the approximation only holds there:",
          latex: "0.52^\\circ \\times \\frac{\\pi}{180} \\approx 0.009076 \\text{ rad}",
        },
        {
          text: "For such a small angle, the Moon's diameter is essentially an arc of a circle centred on your eye, so arc $=$ radius $\\times$ angle:",
          latex: "D \\approx \\frac{3474}{0.009076} \\approx 383\\,000 \\text{ km}",
        },
      ],
      answer: "About $383\\,000$ km (the true average is about $384\\,400$ km).",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "t5-5-q1",
      variant: "practice",
      question: "Estimate $\\sin(0.02)$ without a calculator.",
      options: [
        { text: "About $0.02$", correct: true, feedback: "The small-angle approximation, accurate here to better than 0.01%." },
        { text: "About $0.0003$", feedback: "That is roughly $\\theta^2$; the approximation is linear." },
        { text: "About $1$", feedback: "Sine is near 1 for angles near $\\frac{\\pi}{2}$, not near 0." },
      ],
      hint: "Is 0.02 a small angle in radians? Then what is its sine close to?",
    },
    {
      type: "quiz",
      id: "t5-5-q2",
      variant: "concept",
      question: "Why does $\\sin\\theta \\approx \\theta$ fail in degrees?",
      options: [
        {
          text: "Only in radians is the angle numerically equal to the arc length on a unit circle; degrees carry an arbitrary scale factor of $\\frac{\\pi}{180}$.",
          correct: true,
          feedback: "In degrees the correct statement is $\\sin\\theta^\\circ \\approx \\frac{\\pi}{180}\\theta$ — the constant never leaves.",
        },
        { text: "Because degrees are only defined for whole numbers.", feedback: "Fractional degrees are perfectly ordinary." },
        { text: "Because sine behaves differently in degrees.", feedback: "The function is the same; the unit on the input is what changed." },
      ],
      hint: "Which unit makes the angle equal to the arc length on a unit circle?",
    },
    {
      type: "numeric",
      id: "t5-5-q3",
      variant: "practice",
      question: "Use the small-angle approximation to estimate $\\sin 3^\\circ$, to 4 decimal places.",
      answer: 0.0524,
      tolerance: 0.0001,
      hint: "Convert $3^\\circ$ to radians first.",
      solution: "$3^\\circ = \\frac{3\\pi}{180} = \\frac{\\pi}{60} \\approx 0.0524$, so $\\sin 3^\\circ \\approx 0.0524$. (The true value is $0.05234$.)",
      commonMistakes: [
        { answer: 3, feedback: "The approximation only works in radians; $\\sin 3^\\circ$ cannot be 3." },
        { answer: 0.1411, tolerance: 0.0001, feedback: "That is $\\sin 3$ with 3 in radians. Convert $3^\\circ$ first." },
      ],
    },
    {
      type: "numeric",
      id: "t5-5-q4",
      variant: "practice",
      question: "Use $\\cos\\theta \\approx 1 - \\dfrac{\\theta^2}{2}$ to estimate $\\cos 0.1$.",
      answer: 0.995,
      tolerance: 0.0005,
      hint: "Square the angle, halve it, subtract from 1.",
      solution: "$1 - \\frac{0.01}{2} = 0.995$. (The true value is $0.99500$.)",
      commonMistakes: [
        { answer: 0.9, tolerance: 0.0005, feedback: "You used $1 - \\theta$. The correction is quadratic: $\\frac{\\theta^2}{2}$." },
        { answer: 0.99, tolerance: 0.0005, feedback: "You forgot to halve: $1 - \\theta^2$." },
      ],
    },
    {
      type: "numeric",
      id: "t5-5-q5",
      variant: "practice",
      question: "A 2 m tall signpost subtends an angle of 0.004 radians at your eye. Roughly how far away is it?",
      answer: 500,
      unit: "m",
      hint: "For a small angle, height $\\approx$ distance $\\times$ angle (in radians).",
      solution: "$d \\approx \\dfrac{2}{0.004} = 500$ m.",
      commonMistakes: [
        { answer: 0.008, tolerance: 0.001, feedback: "You multiplied. The height is distance × angle, so divide the height by the angle." },
      ],
    },
    {
      type: "quiz",
      id: "t5-5-q6",
      variant: "concept",
      multiple: true,
      question: "For a small angle $\\theta$ **in radians**, select every good approximation.",
      options: [
        { text: "$\\sin\\theta \\approx \\theta$", correct: true, feedback: "Arc and height nearly coincide." },
        { text: "$\\tan\\theta \\approx \\theta$", correct: true, feedback: "$\\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta}$ and $\\cos\\theta \\approx 1$." },
        { text: "$\\cos\\theta \\approx 1 - \\dfrac{\\theta^2}{2}$", correct: true, feedback: "From $1 - \\cos\\theta = 2\\sin^2\\frac{\\theta}{2}$." },
        { text: "$\\cos\\theta \\approx \\theta$", feedback: "Cosine is near 1 for small angles, not near 0." },
        { text: "$\\sin\\theta^\\circ \\approx \\theta$", feedback: "In degrees you need the factor: $\\sin\\theta^\\circ \\approx \\frac{\\pi}{180}\\theta$." },
      ],
      hint: "Picture the point on the unit circle just above $(1, 0)$: what are its coordinates roughly?",
    },
    {
      type: "numeric",
      id: "t5-5-q7",
      variant: "practice",
      question:
        "Approximating $\\sin 0.1$ by $0.1$ overestimates it. By what percentage, to 2 decimal places? (Use $\\sin 0.1 \\approx 0.0998334$.)",
      answer: 0.17,
      tolerance: 0.01,
      unit: "%",
      hint: "Percentage error $= \\dfrac{\\text{estimate} - \\text{true}}{\\text{true}} \\times 100$.",
      solution: "$\\dfrac{0.1 - 0.0998334}{0.0998334} \\times 100 \\approx 0.167\\%$, about $0.17\\%$. It matches $\\frac{\\theta^2}{6} = \\frac{0.01}{6} \\approx 0.0017$.",
      commonMistakes: [
        { answer: 0.0002, tolerance: 0.0001, feedback: "That is the absolute error ($0.000167$). Divide by the true value and multiply by 100 for a percentage." },
        { answer: 0.00167, tolerance: 0.0001, feedback: "That is the fractional error. Multiply by 100 for a percentage." },
      ],
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "bridge-to-calculus",
  title: "5.6 · Bridge to Calculus",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "Lesson 5.5 said the ratio $\\frac{\\sin\\theta}{\\theta}$ *approaches* 1. That word — approaches — is the whole subject of the calculus course's Chapter 1. The quantity is undefined at $\\theta = 0$, since it reads $\\frac{0}{0}$, and yet it has a perfectly definite value everywhere nearby.",
    },
    { type: "math", latex: "\\lim_{\\theta \\to 0} \\frac{\\sin\\theta}{\\theta} = 1" },
    { type: "heading", text: "Approaching zero from both sides" },
    {
      type: "text",
      content:
        "Sneak up on zero from both sides and watch the outputs settle, exactly as the limits chapter does with $\\frac{x^2-4}{x-2}$:",
    },
    {
      type: "interactive",
      config: {
        component: "limit-explorer",
        expr: "sin(x)/x",
        exprLatex: "\\frac{\\sin x}{x}",
        target: 0,
        hole: true,
        window: { xmin: -6.5, xmax: 6.5, ymin: -0.5, ymax: 1.5 },
      },
    },
    {
      type: "text",
      content:
        "There is a hole in the graph at the origin and no value there — but the curve arrives at height 1 from both directions. That is a limit, and it is the single fact that makes calculus with trigonometric functions work.",
    },
    { type: "heading", text: "From the limit to the derivative" },
    {
      type: "callout",
      variant: "info",
      title: "What it buys you",
      content:
        "The derivative of sine is built directly on this limit. Working from the definition of a derivative and the angle-sum formula of Chapter 3.3, the difference quotient for $\\sin x$ separates into two pieces — one is $\\frac{\\sin h}{h} \\to 1$, the other $\\frac{\\cos h - 1}{h} \\to 0$. What survives is:\n$\\dfrac{d}{dx}\\sin x = \\cos x$",
    },
    {
      type: "text",
      content:
        "Clean. No stray constants. And you already saw it coming in Chapter 2.2: the sine wave is steepest exactly where cosine peaks, and flat exactly where cosine is zero. The graph was telling you the derivative before you had the word for it.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Why radians win — the punchline of the course",
      content:
        "In degrees, $\\lim_{\\theta\\to 0}\\frac{\\sin\\theta^\\circ}{\\theta} = \\frac{\\pi}{180} \\approx 0.01745$, not 1. So in degrees the derivative would be $\\frac{d}{dx}\\sin x = \\frac{\\pi}{180}\\cos x$, and that factor would be dragged through every subsequent derivative, every integral, every series expansion — forever. Radians are not a harder convention. They are the one that makes the constant equal to 1 and then disappear.",
    },
    {
      type: "text",
      content:
        "That was the promise made back in Chapter 0.6, and this is it collected.\n\nYou now have the full chain the course set out to build:",
    },
    {
      type: "math",
      latex:
        "\\text{similar triangles} \\to \\text{unit circle} \\to \\text{rotation} \\to \\text{wave} \\to \\text{limit}",
    },
    {
      type: "text",
      content:
        "Each link was derived from the one before it, and none of it required a memorized table. From here the calculus course takes over: limits make the approximation exact, derivatives turn the wave into its own rate of change, and integrals run the process backwards.",
    },
    { type: "heading", text: "Evaluating trig limits" },
    {
      type: "text",
      content:
        "JEE limit questions mostly reduce to $\\lim_{u \\to 0}\\frac{\\sin u}{u} = 1$ with a disguised $u$. The move is always the same: make the angle inside the sine match the denominator exactly, compensating with a constant outside.",
    },
    {
      type: "worked-example",
      id: "t5-6-we1",
      title: "Worked example 1: matching the angle",
      problem: "Evaluate $\\displaystyle\\lim_{x \\to 0}\\frac{\\sin 3x}{x}$.",
      steps: [
        {
          text: "The sine's angle is $3x$ but the denominator is $x$. Multiply and divide by 3 so they match:",
          latex: "\\frac{\\sin 3x}{x} = 3 \\cdot \\frac{\\sin 3x}{3x}",
        },
        {
          text: "As $x \\to 0$, $u = 3x \\to 0$ too, so the fraction tends to 1:",
          latex: "\\lim_{x \\to 0} 3 \\cdot \\frac{\\sin 3x}{3x} = 3 \\cdot 1 = 3",
        },
      ],
      answer: "The limit is $3$.",
    },
    {
      type: "worked-example",
      id: "t5-6-we2",
      title: "Worked example 2: a cosine limit via the half angle",
      problem: "Evaluate $\\displaystyle\\lim_{x \\to 0}\\frac{1 - \\cos x}{x^2}$.",
      steps: [
        {
          text: "Substituting gives $\\frac00$. Turn the numerator into a sine with the half-angle identity (Chapter 3.4):",
          latex: "1 - \\cos x = 2\\sin^2\\frac{x}{2}",
        },
        {
          text: "Match each $\\sin\\frac{x}{2}$ with an $\\frac{x}{2}$ underneath:",
          latex: "\\frac{2\\sin^2\\frac{x}{2}}{x^2} = \\frac{2}{4}\\left(\\frac{\\sin\\frac{x}{2}}{\\frac{x}{2}}\\right)^2",
        },
        {
          text: "The bracket tends to 1:",
          latex: "\\lim_{x \\to 0}\\frac{1 - \\cos x}{x^2} = \\frac12",
        },
      ],
      answer: "The limit is $\\tfrac12$, which is the $\\cos\\theta \\approx 1 - \\frac{\\theta^2}{2}$ of lesson 5.5 made exact.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "t5-6-q1",
      variant: "concept",
      question: "What does $\\lim_{\\theta\\to 0}\\frac{\\sin\\theta}{\\theta} = 1$ actually assert?",
      options: [
        {
          text: "The ratio can be made as close to 1 as you like by taking $\\theta$ close enough to 0 — even though the ratio is undefined at 0 itself.",
          correct: true,
          feedback: "A limit describes the approach, not the value at the point.",
        },
        { text: "That $\\frac{\\sin 0}{0} = 1$.", feedback: "That expression is $\\frac00$ and has no value. The limit exists precisely because the point does not have to." },
        { text: "That $\\sin\\theta = \\theta$ exactly for small $\\theta$.", feedback: "They are close, not equal — the error is of order $\\theta^3$." },
      ],
      hint: "Is the ratio defined at $\\theta = 0$? What does a limit describe instead?",
    },
    {
      type: "quiz",
      id: "t5-6-q2",
      variant: "concept",
      question: "If angles were measured in degrees, what would $\\frac{d}{dx}\\sin x$ be?",
      options: [
        { text: "$\\frac{\\pi}{180}\\cos x$", correct: true, feedback: "The limit becomes $\\frac{\\pi}{180}$ instead of 1, and that constant then rides through everything downstream." },
        { text: "$\\cos x$, unchanged.", feedback: "That is exactly the property radians give and degrees do not." },
        { text: "$180\\cos x$", feedback: "The factor is $\\frac{\\pi}{180}$, the degrees-to-radians conversion, not its reciprocal." },
      ],
      hint: "In degrees, what does $\\frac{\\sin\\theta}{\\theta}$ tend to as $\\theta \\to 0$?",
    },
    {
      type: "numeric",
      id: "t5-6-q3",
      variant: "practice",
      question: "Evaluate $\\displaystyle\\lim_{x \\to 0}\\frac{\\sin 5x}{x}$.",
      answer: 5,
      hint: "Make the denominator match the angle inside the sine.",
      solution: "$\\dfrac{\\sin 5x}{x} = 5 \\cdot \\dfrac{\\sin 5x}{5x} \\to 5 \\cdot 1 = 5$.",
      commonMistakes: [
        { answer: 1, feedback: "The standard limit needs the *same* quantity inside the sine and underneath. Here they differ by a factor of 5." },
        { answer: 0.2, tolerance: 0.001, feedback: "Upside down: multiply and divide by 5, and the 5 ends up in front, not underneath." },
      ],
    },
    {
      type: "numeric",
      id: "t5-6-q4",
      variant: "practice",
      question: "Evaluate $\\displaystyle\\lim_{x \\to 0}\\frac{\\sin 4x}{\\sin 7x}$. Enter a fraction or a decimal to 3 decimal places.",
      answer: 4 / 7,
      tolerance: 0.001,
      hint: "Divide top and bottom by $x$, then treat each as a standard limit.",
      solution: "$\\dfrac{\\sin 4x}{\\sin 7x} = \\dfrac{4 \\cdot \\frac{\\sin 4x}{4x}}{7 \\cdot \\frac{\\sin 7x}{7x}} \\to \\dfrac{4}{7} \\approx 0.571$.",
      commonMistakes: [
        { answer: 1, feedback: "Both sines tend to 0, but at different rates: $\\sin 4x \\approx 4x$ and $\\sin 7x \\approx 7x$." },
        { answer: 7 / 4, tolerance: 0.001, feedback: "Upside down: the numerator is $\\sin 4x \\approx 4x$." },
      ],
    },
    {
      type: "numeric",
      id: "t5-6-q5",
      variant: "practice",
      question: "Evaluate $\\displaystyle\\lim_{x \\to 0}\\frac{1 - \\cos 2x}{x^2}$.",
      answer: 2,
      hint: "Use $1 - \\cos 2x = 2\\sin^2 x$.",
      solution: "$\\dfrac{1 - \\cos 2x}{x^2} = 2\\left(\\dfrac{\\sin x}{x}\\right)^2 \\to 2$.",
      commonMistakes: [
        { answer: 0.5, tolerance: 0.001, feedback: "That is the limit for $1 - \\cos x$. With $2x$ inside, the numerator is $2\\sin^2 x$." },
        { answer: 4, feedback: "With $1 - \\cos 2x = 2\\sin^2 x$ there is no extra factor: $2 \\cdot 1^2 = 2$." },
      ],
    },
    {
      type: "numeric",
      id: "t5-6-q6",
      variant: "practice",
      question:
        "If $x$ is measured in degrees, what is $\\displaystyle\\lim_{x \\to 0}\\frac{\\sin x^\\circ}{x}$? Give your answer to 4 decimal places.",
      answer: Math.PI / 180,
      tolerance: 0.0001,
      hint: "Rewrite $x^\\circ$ in radians, then use the standard limit.",
      solution: "$x^\\circ = \\frac{\\pi x}{180}$ radians, so $\\dfrac{\\sin x^\\circ}{x} = \\dfrac{\\pi}{180}\\cdot\\dfrac{\\sin\\frac{\\pi x}{180}}{\\frac{\\pi x}{180}} \\to \\dfrac{\\pi}{180} \\approx 0.0175$.",
      commonMistakes: [
        { answer: 1, feedback: "That is the radian result. Degrees bring in the conversion factor $\\frac{\\pi}{180}$." },
        { answer: 57.2958, tolerance: 0.001, feedback: "That is $\\frac{180}{\\pi}$, the reciprocal. Converting degrees to radians multiplies by $\\frac{\\pi}{180}$." },
      ],
    },
    {
      type: "quiz",
      id: "t5-6-q7",
      variant: "concept",
      multiple: true,
      question: "Select every limit (as $x \\to 0$) that equals 1.",
      options: [
        { text: "$\\dfrac{\\sin x}{x}$", correct: true, feedback: "The standard limit." },
        { text: "$\\dfrac{\\tan x}{x}$", correct: true, feedback: "$\\frac{\\sin x}{x}\\cdot\\frac{1}{\\cos x} \\to 1 \\cdot 1$." },
        { text: "$\\dfrac{x}{\\sin x}$", correct: true, feedback: "The reciprocal of something tending to 1 also tends to 1." },
        { text: "$\\dfrac{\\sin 2x}{x}$", feedback: "$2\\cdot\\frac{\\sin 2x}{2x} \\to 2$." },
        { text: "$\\dfrac{1 - \\cos x}{x}$", feedback: "$\\frac{1 - \\cos x}{x^2}\\cdot x \\to \\frac12 \\cdot 0 = 0$." },
      ],
      hint: "Rewrite each in terms of $\\frac{\\sin u}{u}$ with a matching $u$.",
    },
    {
      type: "numeric",
      id: "t5-6-q8",
      variant: "practice",
      question: "Evaluate $\\displaystyle\\lim_{x \\to \\pi}\\frac{\\sin x}{\\pi - x}$.",
      answer: 1,
      hint: "Substitute $h = \\pi - x$, so $h \\to 0$. What is $\\sin(\\pi - h)$?",
      solution: "With $h = \\pi - x$: $\\sin x = \\sin(\\pi - h) = \\sin h$, so the expression is $\\frac{\\sin h}{h} \\to 1$.",
      commonMistakes: [
        { answer: -1, feedback: "Check the sign: $\\sin(\\pi - h) = +\\sin h$ (quadrant II mirror), and the denominator is $+h$." },
        { answer: 0, feedback: "Both top and bottom tend to 0; the limit compares their rates, which are equal." },
      ],
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "trig-chapter-5-mastery",
  title: "5.7 · Full-Course Diagnostic",
  position: 7,
  blocks: blocks([
    {
      type: "text",
      content:
        "One question per chapter and one on the closing idea, then four more on Chapter 5's triangle laws, areas and limits. Each should be answerable by derivation — if any of them requires a remembered table, that is the chapter to revisit.",
    },
    {
      type: "callout",
      variant: "info",
      title: "The whole course in six lines",
      content:
        "**Ch 0** — Similar triangles make side ratios depend on the angle alone.\n**Ch 1** — On the unit circle those ratios become coordinates, so every angle has a sine and cosine.\n**Ch 2** — Plotting a coordinate against the angle unwraps the circle into a wave.\n**Ch 3** — Pythagoras and the angle-sum formula generate every identity.\n**Ch 4** — Solving runs the machinery backwards; solutions repeat with the period.\n**Ch 5** — Both triangle laws are derived, and $\\frac{\\sin\\theta}{\\theta} \\to 1$ hands the subject to calculus.",
    },
    {
      type: "quiz",
      id: "t5-m-q1",
      variant: "mastery",
      question:
        "A ramp rises 1.2 m over a slanted length of 7 m. What angle does it make with the horizontal?",
      options: [
        { text: "$\\sin^{-1}\\!\\left(\\frac{1.2}{7}\\right) \\approx 9.9^\\circ$", correct: true, feedback: "The rise is opposite the angle, the ramp itself is the hypotenuse." },
        { text: "$\\tan^{-1}\\!\\left(\\frac{1.2}{7}\\right) \\approx 9.7^\\circ$", feedback: "Tangent needs the horizontal run, which is not what 7 m measures." },
        { text: "$\\cos^{-1}\\!\\left(\\frac{1.2}{7}\\right) \\approx 80.1^\\circ$", feedback: "That treats the rise as adjacent — it would give the angle at the top." },
      ],
    },
    {
      type: "quiz",
      id: "t5-m-q2",
      variant: "mastery",
      question: "Derive $\\cos\\dfrac{5\\pi}{6}$ exactly.",
      options: [
        { text: "$-\\dfrac{\\sqrt3}{2}$", correct: true, feedback: "$150^\\circ$: quadrant II so $x < 0$; reference angle $30^\\circ$ with $\\cos 30^\\circ = \\frac{\\sqrt3}{2}$." },
        { text: "$-\\dfrac{1}{2}$", feedback: "That would need a reference angle of $60^\\circ$; $180^\\circ - 150^\\circ = 30^\\circ$." },
        { text: "$\\dfrac{\\sqrt3}{2}$", feedback: "Correct size, but quadrant II has a negative x-coordinate." },
      ],
    },
    {
      type: "quiz",
      id: "t5-m-q3",
      variant: "mastery",
      question:
        "A Ferris wheel of radius 15 m has its centre 18 m up and turns once every 3 minutes, boarding at the bottom. Which model gives the height?",
      options: [
        { text: "$h(t) = -15\\cos\\!\\left(\\frac{2\\pi}{3}t\\right) + 18$", correct: true, feedback: "Amplitude 15, midline 18, period 3, and starting at the minimum makes it an inverted cosine." },
        { text: "$h(t) = 15\\cos\\!\\left(\\frac{2\\pi}{3}t\\right) + 18$", feedback: "That starts at the *top*, 33 m up — not a boarding platform." },
        { text: "$h(t) = 15\\sin\\!\\left(\\frac{2\\pi}{3}t\\right) + 18$", feedback: "Sine starts at the midline, halfway up." },
      ],
    },
    {
      type: "quiz",
      id: "t5-m-q4",
      variant: "mastery",
      question: "Simplify $\\dfrac{\\sin 2\\theta}{2\\sin\\theta}$.",
      options: [
        { text: "$\\cos\\theta$", correct: true, feedback: "$\\sin 2\\theta = 2\\sin\\theta\\cos\\theta$, and the $2\\sin\\theta$ cancels." },
        { text: "$1$", feedback: "That would require $\\sin 2\\theta = 2\\sin\\theta$, which fails at $\\theta = \\frac{\\pi}{2}$." },
        { text: "$\\tan\\theta$", feedback: "No cosine ends up in a denominator here." },
      ],
    },
    {
      type: "quiz",
      id: "t5-m-q5",
      variant: "mastery",
      question: "How many solutions does $\\cos 2x = \\dfrac{1}{2}$ have in $[0, 2\\pi)$?",
      options: [
        { text: "Four", correct: true, feedback: "$2x$ runs over $[0, 4\\pi)$ — two revolutions, each with two solutions." },
        { text: "Two", feedback: "The single-revolution count; the inner angle doubles the interval." },
        { text: "Eight", feedback: "That would be $\\cos 4x$." },
      ],
    },
    {
      type: "quiz",
      id: "t5-m-q6",
      variant: "mastery",
      question:
        "A triangle has $b = 7$, $c = 9$, and included angle $A = 110^\\circ$. Which fact is true?",
      options: [
        { text: "$a > \\sqrt{7^2 + 9^2}$, because $\\cos 110^\\circ$ is negative and the correction term adds.", correct: true, feedback: "An obtuse included angle pushes the opposite side beyond the Pythagorean length." },
        { text: "$a < \\sqrt{7^2 + 9^2}$.", feedback: "That is the acute case, where $\\cos A > 0$ subtracts." },
        { text: "$a = \\sqrt{7^2+9^2}$.", feedback: "Only when $A = 90^\\circ$ exactly." },
      ],
    },
    {
      type: "quiz",
      id: "t5-m-q7",
      variant: "mastery",
      question:
        "Which statement best captures why radians are the right unit for calculus?",
      options: [
        {
          text: "They make $\\lim_{\\theta\\to0}\\frac{\\sin\\theta}{\\theta} = 1$, so no conversion constant appears in the derivative of sine or anything built on it.",
          correct: true,
          feedback: "Degrees would attach $\\frac{\\pi}{180}$ to every derivative from then on.",
        },
        { text: "They are smaller numbers, so calculations are easier.", feedback: "Convenience of size has nothing to do with it — and $2\\pi$ is not obviously simpler than 360." },
        { text: "They avoid decimals.", feedback: "Radians are usually irrational multiples of $\\pi$; that is not the merit." },
      ],
    },
    {
      type: "numeric",
      id: "t5-m-q8",
      variant: "mastery",
      question: "In triangle $ABC$, $a = 5$, $b = 6$ and $C = 60^\\circ$. Find $c$ to 2 decimal places.",
      answer: Math.sqrt(31),
      tolerance: 0.01,
      solution: "$c^2 = 25 + 36 - 2(5)(6)\\cos 60^\\circ = 61 - 30 = 31$, so $c = \\sqrt{31} \\approx 5.57$.",
      commonMistakes: [
        { answer: 7.81, tolerance: 0.01, feedback: "That is $\\sqrt{61}$: the correction term $-2ab\\cos C$ was dropped." },
      ],
    },
    {
      type: "numeric",
      id: "t5-m-q9",
      variant: "mastery",
      question: "Evaluate $\\displaystyle\\lim_{x \\to 0}\\frac{\\sin 6x}{2x}$.",
      answer: 3,
      solution: "$\\dfrac{\\sin 6x}{2x} = 3 \\cdot \\dfrac{\\sin 6x}{6x} \\to 3$.",
      commonMistakes: [
        { answer: 6, feedback: "The denominator is $2x$, not $x$: $\\frac{6}{2} = 3$." },
      ],
    },
    {
      type: "quiz",
      id: "t5-m-q10",
      variant: "mastery",
      multiple: true,
      question: "$A = 30^\\circ$ and $b = 10$. Select every length $a$ (opposite $A$) that gives **two** different triangles.",
      options: [
        { text: "$a = 6$", correct: true, feedback: "$h = 10\\sin 30^\\circ = 5$, and $5 < 6 < 10$." },
        { text: "$a = 8$", correct: true, feedback: "$5 < 8 < 10$: the swinging side crosses the base twice." },
        { text: "$a = 5$", feedback: "$a = h$: it just touches, giving one right triangle." },
        { text: "$a = 12$", feedback: "$a > b$: only one triangle." },
        { text: "$a = 4$", feedback: "$a < h$: no triangle at all." },
      ],
    },
    {
      type: "numeric",
      id: "t5-m-q11",
      variant: "mastery",
      question: "Find the area of a triangle with sides 7, 8 and 9, to 2 decimal places.",
      answer: Math.sqrt(720),
      tolerance: 0.01,
      solution: "$s = 12$, so $\\Delta = \\sqrt{12 \\cdot 5 \\cdot 4 \\cdot 3} = \\sqrt{720} = 12\\sqrt5 \\approx 26.83$.",
      commonMistakes: [
        { answer: 28, feedback: "That is $\\frac12 \\cdot 7 \\cdot 8$, treating the triangle as right-angled. It is not: $49 + 64 \\ne 81$." },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Course complete",
      content:
        "You can derive every value, every identity, and every formula in this course from similar triangles, a circle of radius 1, and the angle-sum construction. The calculus course picks up exactly where 5.6 stopped — with a limit.",
    },
  ]),
};

export const trigChapter5Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lessonMastery,
];
