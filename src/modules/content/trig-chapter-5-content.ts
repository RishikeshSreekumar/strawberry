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
      type: "text",
      content:
        "Everything so far that involved a triangle involved a *right* triangle. Most triangles in the world are not right-angled: a surveyor's sightlines between three hilltops, the two legs of a sailing course, the three struts of a roof truss.\n\nThere is a standard labelling that makes the results readable. Vertices $A$, $B$, $C$; the side opposite each vertex takes the matching lower-case letter, so side $a$ is opposite angle $A$.",
    },
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
    {
      type: "text",
      content:
        "**Worked example.** A surveyor sights a rock across a river. From point $A$ the angle to the rock is $63^\\circ$; from point $B$, 120 m further along the bank, it is $41^\\circ$. How far is the rock from $A$?\n\nThe third angle is $180^\\circ - 63^\\circ - 41^\\circ = 76^\\circ$, and it sits opposite the known 120 m baseline. The distance sought is opposite the $41^\\circ$ angle:",
    },
    {
      type: "math",
      latex:
        "\\frac{d}{\\sin 41^\\circ} = \\frac{120}{\\sin 76^\\circ} \\quad\\Longrightarrow\\quad d = \\frac{120\\sin 41^\\circ}{\\sin 76^\\circ} \\approx 81.1\\text{ m}",
    },
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
    {
      type: "callout",
      variant: "definition",
      title: "The four outcomes (for acute $A$)",
      content:
        "Let $h = b\\sin A$ be the altitude from $C$ — the shortest reach that touches the base.\n$a < h$: **no triangle** — too short to reach.\n$a = h$: **one** right triangle, exactly touching.\n$h < a < b$: **two triangles** — the swing crosses the base twice.\n$a \\ge b$: **one triangle** — the far crossing lands behind $A$ and is not a triangle.",
    },
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
      type: "text",
      content:
        "**Worked example.** $A = 30^\\circ$, $a = 8$, $b = 12$. Then $\\sin B = \\frac{12\\sin 30^\\circ}{8} = 0.75$, so $B \\approx 48.6^\\circ$ or $B' \\approx 131.4^\\circ$.\n\nCheck both: $30 + 48.6 = 78.6 < 180$, and $30 + 131.4 = 161.4 < 180$. Both survive — this SSA has **two** solutions, with third angles $101.4^\\circ$ and $18.6^\\circ$.",
    },
    {
      type: "text",
      content:
        "If instead $A$ is obtuse, the ambiguity disappears: a triangle can hold only one obtuse angle, so $B$ must be acute and only one candidate ever survives.",
    },
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
      type: "quiz",
      id: "t5-3-q1",
      variant: "practice",
      question: "Sides $b = 5$, $c = 7$, included angle $A = 60^\\circ$. Find $a$.",
      options: [
        { text: "$\\sqrt{39} \\approx 6.24$", correct: true, feedback: "$25 + 49 - 2(5)(7)(0.5) = 74 - 35 = 39$." },
        { text: "$\\sqrt{74} \\approx 8.60$", feedback: "That is the Pythagorean value — you dropped the correction term." },
        { text: "$\\sqrt{109} \\approx 10.44$", feedback: "You added the correction instead of subtracting it; that is the obtuse case." },
      ],
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
    {
      type: "text",
      content:
        "**A navigation example.** A ship sails 40 km on a bearing of $050^\\circ$, then 25 km on a bearing of $140^\\circ$. How far is it from port?\n\nThe two bearings differ by $90^\\circ$, so the interior angle at the turning point is $180^\\circ - 90^\\circ = 90^\\circ$. The law of cosines with $\\cos 90^\\circ = 0$ collapses to Pythagoras: $\\sqrt{40^2 + 25^2} \\approx 47.2$ km. The general method handles the special case without any extra thought.",
    },
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
    {
      type: "quiz",
      id: "t5-5-q1",
      variant: "practice",
      question: "Estimate $\\sin(0.02)$ without a calculator.",
      options: [
        { text: "About $0.02$", correct: true, feedback: "The small-angle approximation, accurate here to about one part in $10^{5}$." },
        { text: "About $0.0003$", feedback: "That is roughly $\\theta^2$; the approximation is linear." },
        { text: "About $1$", feedback: "Sine is near 1 for angles near $\\frac{\\pi}{2}$, not near 0." },
      ],
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
        "One question per chapter, plus the closing idea. Each should be answerable by derivation — if any of them requires a remembered table, that is the chapter to revisit.",
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
