import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Mechanics II Chapter 5 — Gravitation.
 * One inverse-square law and the shell theorem, grown into g at height,
 * depth and latitude; gravitational field and potential of standard bodies;
 * potential energy and escape; satellite orbits; and Kepler's laws from
 * angular momentum and energy conservation.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "newtons-law-of-gravitation",
  title: "5.1 · Newton's Law of Gravitation",
  position: 1,
  blocks: blocks([
    {
      type: "video",
      src: "/videos/mrg-5-gravitation.mp4",
      poster: "/videos/mrg-5-gravitation.jpg",
      title: "Chapter 5 overview video",
      caption:
        "A narrated walk through the whole chapter. Watch it now for the big picture, or come back to it as a recap.",
    },
    {
      type: "text",
      content:
        "An apple falls because the Earth pulls it. The Moon does not fall onto the Earth, so for centuries people assumed the heavens followed different rules. Newton's leap was to say the Moon **is** falling: it moves sideways so fast that as it falls towards the Earth it keeps missing. If one force explains both, the pull at the Moon's distance must be weaker by exactly the right amount. He checked.",
    },
    { type: "heading", text: "Newton's Moon test" },
    {
      type: "text",
      content:
        "The Moon orbits at $r = 3.84\\times10^8$ m, about 60 Earth radii, with period $T = 27.3$ days $= 2.36\\times10^6$ s. Its centripetal acceleration is",
    },
    {
      type: "math",
      latex: "a_{\\text{Moon}} = \\frac{4\\pi^2 r}{T^2} = \\frac{39.5 \\times 3.84\\times10^8}{(2.36\\times10^6)^2} \\approx 2.72\\times10^{-3}\\ \\text{m/s}^2",
    },
    {
      type: "text",
      content:
        "And with the measured $g = 9.8$ m/s² at the surface, $g/60^2 = 9.8/3600 = 2.72\\times10^{-3}$ m/s². The two agree. Sixty times farther, $3600$ times weaker: the pull falls off as the **inverse square** of distance. One way to see why: anything that spreads out evenly from a point in all directions (light, or the lines of a field) is shared over a sphere of area $4\\pi r^2$, so its strength falls as $1/r^2$.",
    },
    { type: "heading", text: "Gravitation and the shell theorem" },
    {
      type: "callout",
      variant: "definition",
      title: "Newton's law of gravitation",
      content:
        "Every pair of point masses $m_1$ and $m_2$ attract each other with a force along the line joining them, of size\n$F = \\dfrac{G m_1 m_2}{r^2}$, with $G = 6.67\\times10^{-11}$ N m²/kg².\nThe forces on the two bodies are equal and opposite (Newton's third law). Forces from several masses add as vectors (**superposition**).",
    },
    {
      type: "text",
      content:
        "$G$ is tiny, which is why you don't feel the pull of the person next to you. It was first measured by Cavendish (1798) with a torsion balance: lead spheres on a thin wire twisted it by a minute angle. Because the pull depends on $m$, and $F = ma$ divides by $m$, every body at the same place falls with the same acceleration.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The shell theorem",
      content:
        "For a uniform thin spherical shell of mass $M$:\n1. At any point **outside** it, the shell attracts as if all of its mass were at its centre.\n2. At any point **inside** it, the net gravitational force from the shell is **zero**.\nA solid sphere (or any sphere whose density depends only on $r$) is a stack of shells, so outside it acts as a point mass $M$ at its centre. That is what lets us treat the Earth as a point.",
    },
    {
      type: "text",
      content:
        "Drag the point along the curve. The graph shows how the force (relative to its value at $r = 1$) falls with distance.",
    },
    {
      type: "interactive",
      config: {
        component: "graph-explorer",
        expr: "1/x^2",
        exprLatex: "\\frac{F}{F_0} = \\frac{1}{r^2}",
        window: { xmin: 0, xmax: 5, ymin: 0, ymax: 3 },
        initial: 1,
        excluded: [0],
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: doubling $r$ quarters the force, tripling it cuts it to a ninth, and at $r = 5$ only $\\tfrac{1}{25}$ is left. Close in, the curve shoots up; that is the regime of planets skimming their stars, and of the point masses the formula describes. (Inside a real body the shell theorem takes over and the force does not blow up; see Lesson 5.2.)",
    },
    {
      type: "worked-example",
      id: "mrg5-1-we1",
      title: "Worked example 1: people are not planets",
      problem:
        "Two 50 kg students sit 1 m apart. Find the gravitational force between them and compare it with their weights.",
      steps: [
        { text: "$F = \\dfrac{6.67\\times10^{-11}\\times 50\\times 50}{1^2} = 1.67\\times10^{-7}$ N." },
        { text: "Each student's weight is about 500 N, some three billion times larger. *Why this step:* comparing with a familiar force shows why gravity between everyday objects never matters in Mechanics I problems." },
      ],
      answer: "$F = 1.67\\times10^{-7}$ N, some three billion times less than each student's weight.",
    },
    { type: "heading", text: "Forces between several masses" },
    {
      type: "worked-example",
      id: "mrg5-1-we2",
      title: "Worked example 2: the neutral point between Earth and Moon",
      problem:
        "$M_E = 81M_m$ and the centres are $d = 3.84\\times10^5$ km apart. Where does a spacecraft feel no net pull?",
      steps: [
        { text: "At distance $x$ from the Earth the pulls balance: $\\dfrac{GM_Em}{x^2} = \\dfrac{GM_mm}{(d-x)^2}$." },
        { text: "Take square roots: $\\dfrac{x}{d - x} = \\sqrt{81} = 9$. *Why this step:* both sides are positive, so the square root keeps the point *between* the bodies." },
        { text: "$x = 0.9d = 3.46\\times10^5$ km from the Earth's centre." },
      ],
      answer: "$x = 0.9d = 3.46\\times10^5$ km from the Earth's centre.",
    },
    {
      type: "worked-example",
      id: "mrg5-1-we3",
      title: "Worked example 3: three masses on a triangle",
      problem:
        "Three equal masses $m$ sit at the corners of an equilateral triangle of side $a$. Find the net force on one of them.",
      steps: [
        { text: "Each of the other two pulls it with $F = Gm^2/a^2$, along the two sides that meet at its corner. The angle between these pulls is $60^\\circ$." },
        { text: "Resultant of two equal forces at $60^\\circ$: $2F\\cos 30^\\circ = \\sqrt3 F$, directed along the bisector towards the centre. *Why this step:* by symmetry the sideways parts cancel and only the parts along the bisector add." },
        { text: "Net force $= \\sqrt3\\,\\dfrac{Gm^2}{a^2}$. A fourth mass placed at the centre would feel **zero** net force: three equal pulls at $120^\\circ$ cancel." },
      ],
      answer: "$\\sqrt3\\,\\dfrac{Gm^2}{a^2}$, along the bisector towards the centre.",
    },
    {
      type: "worked-example",
      id: "mrg5-1-we4",
      title: "Worked example 4: unbalancing a square",
      problem:
        "Masses $m$, $m$, $m$ and $2m$ sit at the corners of a square of side $a$; a mass $m_0$ is at the centre. Find the net gravitational force on $m_0$.",
      steps: [
        { text: "Think of the $2m$ corner as $m + m$. Four equal masses $m$ give zero at the centre (opposite pairs cancel)." },
        { text: "What is left is the extra $m$ at one corner, a distance $a/\\sqrt2$ from the centre." },
        { text: "$F = \\dfrac{Gmm_0}{a^2/2} = \\dfrac{2Gmm_0}{a^2}$, towards the $2m$ corner. *Why this step:* superposition lets you add and subtract masses to exploit symmetry, the same trick as the cavities of Chapter 0." },
      ],
      answer: "$F = \\dfrac{2Gmm_0}{a^2}$, towards the $2m$ corner.",
    },
    {
      type: "text",
      content:
        "The canvas adds two gravitational pulls $\\vec F_1$ and $\\vec F_2$ on the same body. Drag them to see the resultant.",
    },
    {
      type: "interactive",
      config: {
        component: "vec-canvas-2d",
        mode: "add",
        a: [3, 1],
        b: [-1, 3],
        showParallelogram: true,
        labels: { a: "\\vec F_1", b: "\\vec F_2" },
        readouts: ["magnitude", "sum"],
        caption: "Two pulls on one body, added as vectors. The net force is the diagonal, not the sum of the magnitudes.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the net pull is shortest when the two bodies pull in nearly opposite directions (the neutral point of example 2 is the extreme case) and longest when they pull the same way. Gravitational forces are vectors; never add their sizes.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"heavier bodies fall faster because gravity pulls them harder\"",
      content:
        "Gravity does pull a heavier body harder: $F = GMm/r^2 \\propto m$. But a heavier body is also harder to accelerate, by exactly the same factor: $a = F/m = GM/r^2$. The mass of the falling body cancels. Without air, a hammer and a feather fall together (Apollo 15 did it on the Moon).",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "mrg5-1-q1",
      variant: "practice",
      question: "The distance between two point masses is doubled. What happens to the gravitational force between them?",
      options: [
        { text: "It halves", feedback: "That would be an inverse (not inverse-square) law." },
        { text: "It doubles", feedback: "Gravity weakens with distance." },
        { text: "It becomes a quarter", correct: true, feedback: "$F \\propto 1/r^2$, and $(1/2)^2 = 1/4$." },
        { text: "It is unchanged, since the masses are the same", feedback: "The force depends on distance as well as on the masses." },
      ],
      hint: "Newton's law of gravitation: how does the force depend on the separation?",
    },
    {
      type: "numeric",
      id: "mrg5-1-q2",
      variant: "practice",
      question: "Point masses of 2 kg and 8 kg are 1.2 m apart. At what distance from the 2 kg mass, on the line between them, is the net gravitational force on a third mass zero? Give your answer in metres.",
      answer: 0.4,
      tolerance: 0.01,
      unit: "m",
      hint: "Equate the two pulls on the third mass and take square roots, as in Worked example 2.",
      solution: "At distance $x$ from the 2 kg mass: $\\dfrac{G(2)m}{x^2} = \\dfrac{G(8)m}{(1.2 - x)^2}$. Square roots: $\\dfrac{x}{1.2 - x} = \\sqrt{\\dfrac28} = \\dfrac12$, so $2x = 1.2 - x$ and $x = 0.4$ m, nearer the lighter mass.",
      commonMistakes: [
        { answer: 0.24, feedback: "That uses the mass ratio $1:4$ directly. Distances go as the square root of the masses." },
        { answer: 0.6, feedback: "The midpoint only works for equal masses. The neutral point is nearer the lighter one." },
        { answer: 0.8, feedback: "That is the distance from the 8 kg mass. The point is closer to the lighter mass." },
      ],
    },
    {
      type: "quiz",
      id: "mrg5-1-q3",
      variant: "practice",
      question: "Three equal masses $m$ are at the corners of an equilateral triangle of side $a$. What is the magnitude of the net gravitational force on any one of them?",
      options: [
        { text: "$\\dfrac{2Gm^2}{a^2}$", feedback: "That adds the magnitudes. The two pulls are $60^\\circ$ apart." },
        { text: "$\\dfrac{Gm^2}{a^2}$", feedback: "That is the pull of one neighbour only (or the resultant at $120^\\circ$). The angle between the pulls here is $60^\\circ$." },
        { text: "zero, by symmetry", feedback: "Zero is the force on a mass at the **centre**. A corner mass is pulled towards the other two." },
        { text: "$\\sqrt3\\,\\dfrac{Gm^2}{a^2}$", correct: true, feedback: "Two pulls of $Gm^2/a^2$ at $60^\\circ$: $2F\\cos 30^\\circ = \\sqrt3F$." },
      ],
      hint: "Each of the other two masses pulls with $\\dfrac{Gm^2}{a^2}$, and the two pulls are $60^\\circ$ apart. Add them as vectors.",
    },
    {
      type: "quiz",
      id: "mrg5-1-q4",
      variant: "concept",
      question: "A 5 kg ball and a 1 kg ball are dropped together from the same height in a vacuum. Which is true?",
      options: [
        { text: "The 5 kg ball feels 5 times the force but has 5 times the inertia, so both fall with the same acceleration", correct: true, feedback: "$a = F/m = GM/r^2$, independent of the falling body's mass." },
        { text: "The 5 kg ball lands first because gravity pulls it 5 times harder", feedback: "The larger force is exactly cancelled by the larger mass in $a = F/m$." },
        { text: "Both feel the same force, so both fall at the same rate", feedback: "Right conclusion, wrong reason: the forces are different (5:1)." },
      ],
      hint: "Compare the force on each ball, $F = GMm/R^2$, with its inertia. What is $a = F/m$ for each?",
    },
    {
      type: "quiz",
      id: "mrg5-1-q5",
      variant: "concept",
      question: "What does the shell theorem say about the gravitational force on a particle placed anywhere inside a uniform hollow spherical shell?",
      options: [
        { text: "It points towards the nearest part of the shell", feedback: "The near part pulls harder per unit mass, but there is more mass on the far side. For $1/r^2$ the two balance exactly." },
        { text: "It is zero everywhere inside", correct: true, feedback: "The nearer, smaller patch of shell and the farther, larger patch cancel exactly for an inverse-square force." },
        { text: "It is as if all the mass were at the centre", feedback: "That is the rule for points **outside** the shell." },
      ],
      hint: "Recall the second half of the shell theorem: what it says about points outside the shell, and separately about points inside it.",
    },
    {
      type: "quiz",
      id: "mrg5-1-q6",
      variant: "practice",
      multiple: true,
      question: "Two isolated point masses $m$ and $4m$ are a distance $d$ apart, with nothing else nearby. Select all the statements that are correct.",
      options: [
        { text: "The force on $m$ has the same size as the force on $4m$.", correct: true, feedback: "Newton's third law: the pair of gravitational forces is equal and opposite." },
        { text: "The acceleration of $m$ is four times that of $4m$.", correct: true, feedback: "Equal forces, so $a = F/m$ is four times larger for the mass four times smaller." },
        { text: "A third mass feels no net pull at a distance $d/3$ from $m$, between them.", correct: true, feedback: "$\\dfrac{x}{d - x} = \\sqrt{\\dfrac{m}{4m}} = \\dfrac12$ gives $x = d/3$." },
        { text: "The neutral point is at the midpoint, $d/2$ from each.", feedback: "Only for equal masses. The neutral point sits nearer the lighter mass." },
        { text: "A third mass at the neutral point is in stable equilibrium for small displacements along the line.", feedback: "Nudge it towards $m$: the pull of $m$ grows and that of $4m$ weakens, so it is pushed further. Along the line the equilibrium is unstable." },
      ],
      hint: "The two forces form a third-law pair; divide by each mass for the accelerations. For the neutral point, set $\\dfrac{Gm}{x^2} = \\dfrac{G(4m)}{(d - x)^2}$, then ask what happens to a mass nudged towards one side.",
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "acceleration-due-to-gravity",
  title: "5.2 · Acceleration Due to Gravity and Its Variation",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "A weighing scale that reads 60.00 kg in Mumbai would read a little less on top of Everest, a little more at the North Pole, and (if you could get there) less at the bottom of a deep mine. The mass is the same everywhere; what changes is $g$. Newton's law tells us exactly how.",
    },
    {
      type: "text",
      content:
        "**At the surface.** A mass $m$ on the surface of a spherical Earth (mass $M$, radius $R$) is pulled with $GMm/R^2$ (shell theorem: the Earth acts as a point at its centre). So",
    },
    {
      type: "math",
      latex: "g = \\frac{GM}{R^2} = \\frac{6.67\\times10^{-11}\\times 6\\times10^{24}}{(6.4\\times10^6)^2} \\approx 9.8\\ \\text{m/s}^2",
    },
    {
      type: "text",
      content:
        "A useful rearrangement: $GM = gR^2$. It lets you replace the awkward $G$ and $M$ by $g$ and $R$ in every Earth problem. We use $g = 10$ m/s² and $R = 6400$ km in this chapter unless stated.",
    },
    { type: "heading", text: "Above the surface" },
    {
      type: "text",
      content:
        "At height $h$ the distance to the centre is $R + h$:",
    },
    {
      type: "math",
      latex: "g(h) = \\frac{GM}{(R+h)^2} = g\\,\\frac{R^2}{(R+h)^2} \\approx g\\left(1 - \\frac{2h}{R}\\right)\\quad(h \\ll R)",
    },
    {
      type: "text",
      content:
        "The approximation comes from the binomial expansion $(1 + h/R)^{-2} \\approx 1 - 2h/R$. It is good to about 1% only for $h$ up to roughly 50 km; for anything like $h \\sim R$ use the exact form.",
    },
    { type: "heading", text: "Below the surface" },
    {
      type: "text",
      content:
        "At depth $d$ you are at $r = R - d$ from the centre. By the shell theorem, the shell of rock *outside* radius $r$ pulls with zero net force. Only the inner sphere of radius $r$ counts, and for uniform density its mass is $M\\frac{r^3}{R^3}$:",
    },
    {
      type: "math",
      latex: "g(r) = \\frac{G\\,M r^3/R^3}{r^2} = \\frac{GM}{R^3}\\,r = g\\,\\frac{r}{R} = g\\left(1 - \\frac dR\\right)",
    },
    {
      type: "text",
      content:
        "So $g$ falls **linearly** to zero at the centre. Plot $g$ against $r$ and you get a straight line rising to the surface, then an inverse-square tail outside. Drag the point across $r = R$.",
    },
    {
      type: "interactive",
      config: {
        component: "piecewise-explorer",
        breakpoint: 1,
        breakBelongsTo: "left",
        leftExpr: "x",
        leftLatex: "\\frac{r}{R}",
        rightExpr: "1/x^2",
        rightLatex: "\\frac{R^2}{r^2}",
        window: { xmin: 0, xmax: 4, ymin: 0, ymax: 1.2 },
        initial: 0.5,
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: $g/g_s$ (the vertical axis) is largest exactly at the surface, $r/R = 1$, where the two pieces meet. Halfway to the centre it is $0.5$; at one Earth radius up ($r = 2R$) it is $0.25$. Going down loses $g$ linearly, going up loses it as an inverse square, and for small distances going *up* loses it twice as fast.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Variation of g",
      content:
        "Height $h$: $g_h = g\\dfrac{R^2}{(R+h)^2} \\approx g\\left(1 - \\dfrac{2h}{R}\\right)$ for $h \\ll R$.\nDepth $d$: $g_d = g\\left(1 - \\dfrac dR\\right)$ (uniform Earth), zero at the centre.\nLatitude $\\lambda$: $g_\\lambda = g - \\omega^2R\\cos^2\\lambda$, least at the equator, equal to $g$ at the poles.",
    },
    { type: "heading", text: "Rotation and latitude" },
    {
      type: "text",
      content:
        "The Earth spins with $\\omega = \\frac{2\\pi}{86\\,400\\text{ s}} = 7.27\\times10^{-5}$ rad/s. A body at latitude $\\lambda$ moves on a circle of radius $R\\cos\\lambda$, which needs a centripetal force $m\\omega^2R\\cos\\lambda$. Part of the gravitational pull is used up providing it, so the scale reads less. The component of this along the vertical is $m\\omega^2R\\cos\\lambda\\cdot\\cos\\lambda$, giving $g_\\lambda \\approx g - \\omega^2R\\cos^2\\lambda$. At the equator $\\omega^2R = (7.27\\times10^{-5})^2\\times 6.4\\times10^6 \\approx 0.034$ m/s²: small, but measurable.",
    },
    { type: "heading", text: "Comparing heights, depths and spin rates" },
    {
      type: "text",
      content:
        "Take $g = 10$ m/s², $R = 6400$ km.",
    },
    {
      type: "worked-example",
      id: "mrg5-2-we1",
      title: "Worked example 1: g halves",
      problem:
        "At what height is $g$ half its surface value?",
      steps: [
        { text: "$\\dfrac{R^2}{(R+h)^2} = \\dfrac12 \\Rightarrow \\dfrac{R+h}{R} = \\sqrt2$." },
        { text: "$h = (\\sqrt2 - 1)R \\approx 0.414 \\times 6400 = 2650$ km. *Why this step:* $h$ is not small here, so the $1 - 2h/R$ approximation (which would give $R/4 = 1600$ km) is badly wrong." },
      ],
      answer: "$h = (\\sqrt2 - 1)R \\approx 2650$ km.",
    },
    {
      type: "worked-example",
      id: "mrg5-2-we2",
      title: "Worked example 2: height vs depth",
      problem:
        "Near the surface, a given fall in $g$ happens at depth $d$ and at height $h$. How are $d$ and $h$ related?",
      steps: [
        { text: "Height: fractional loss $\\approx 2h/R$. Depth: fractional loss $= d/R$." },
        { text: "Equal losses: $d = 2h$. At 32 km up, $g$ is 1% less (9.9 m/s²); you would need to go 64 km **down** to lose the same 1%." },
      ],
      answer: "$d = 2h$ (1% loss at 32 km up or 64 km down).",
    },
    {
      type: "worked-example",
      id: "mrg5-2-we3",
      title: "Worked example 3",
      problem:
        "Compare $g$ at height $R/2$ above the surface with $g$ at depth $R/2$.",
      steps: [
        { text: "Height $R/2$: $g\\frac{R^2}{(1.5R)^2} = \\frac49 g \\approx 4.44$ m/s²." },
        { text: "Depth $R/2$: $g(1 - \\frac12) = 5$ m/s²." },
        { text: "Going $R/2$ up costs more $g$ than going $R/2$ down. *Why this step:* on the graph, the outside curve leaves the surface with slope $-2$ (in units of $g/R$) while the inside line arrives with slope $+1$, so moving away from the surface in either direction loses $g$, but faster upwards." },
      ],
      answer: "$\\frac49 g \\approx 4.44$ m/s² at height $R/2$ against 5 m/s² at depth $R/2$.",
    },
    {
      type: "worked-example",
      id: "mrg5-2-we4",
      title: "Worked example 4: a day short enough to float",
      problem:
        "How short would a day have to be for objects at the equator to feel weightless?",
      steps: [
        { text: "Weightless means all of gravity goes into the centripetal force: $\\omega^2R = g$. *Why this step:* the scale reading is $m(g - \\omega^2R)$ at the equator; set it to zero." },
        { text: "$\\omega = \\sqrt{g/R} = \\sqrt{10/6.4\\times10^6} = 1.25\\times10^{-3}$ rad/s." },
        { text: "$T = 2\\pi/\\omega \\approx 5030$ s $\\approx 84$ min $\\approx 1.4$ h, about 17 times faster than now. This is also the period of a satellite skimming the surface (Lesson 5.5)." },
      ],
      answer: "$T \\approx 5030$ s $\\approx 84$ min.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"$g$ is greatest at the centre of the Earth\"",
      content:
        "At the centre you are pulled equally in every direction by the surrounding rock, so $g = 0$. The largest value is at the surface, where all of the Earth is \"below\" you and you are as close to it as possible. (The real Earth is denser in the core, so $g$ actually rises slightly for the first part of the way down; for a uniform Earth, which is what JEE assumes, it falls linearly.)",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "mrg5-2-q1",
      variant: "practice",
      question: "What is $g$ at a height equal to the Earth's radius above the surface? Take $g = 10$ m/s² at the surface. Give your answer in m/s².",
      answer: 2.5,
      tolerance: 0.01,
      unit: "m/s²",
      hint: "How far from the Earth's centre is that point? Use the exact inverse-square form.",
      solution: "At height $R$ the distance from the centre is $2R$, so $g_h = g\\dfrac{R^2}{(2R)^2} = \\dfrac g4 = 2.5$ m/s².",
      commonMistakes: [
        { answer: 5, feedback: "That halves $g$ for twice the distance. The law is inverse **square**." },
        { answer: 0, feedback: "$g$ is zero at the centre, not one radius up. Gravity only fades gradually outside." },
        { answer: -10, feedback: "The approximation $1 - 2h/R$ fails for $h = R$. Use the exact form." },
      ],
    },
    {
      type: "numeric",
      id: "mrg5-2-q2",
      variant: "practice",
      question: "At what height above the Earth's surface is $g$ equal to 64% of its surface value? Take $R = 6400$ km and give your answer in km.",
      answer: 1600,
      unit: "km",
      hint: "This is not a small height: use $g_h = g\\dfrac{R^2}{(R+h)^2}$ exactly.",
      solution: "$\\dfrac{R^2}{(R+h)^2} = 0.64$, so $\\dfrac{R}{R+h} = 0.8$ and $R + h = 1.25R$. Then $h = 0.25R = 0.25 \\times 6400 = 1600$ km.",
      commonMistakes: [
        { answer: 1152, feedback: "That uses $1 - 2h/R = 0.64$. The approximation is not valid for such a large change." },
        { answer: 2304, feedback: "That uses $1 - h/R = 0.64$, which is the depth formula." },
        { answer: 3600, feedback: "That sets $\\frac{R}{R+h} = 0.64$. The 0.64 is the ratio of the *squares*: take the square root first, $\\frac{R}{R+h} = 0.8$." },
      ],
    },
    {
      type: "quiz",
      id: "mrg5-2-q3",
      variant: "practice",
      question: "The value of $g$ at a depth of 10 km is the same as at a height $h$ above the surface. Find $h$ (both small compared with $R$).",
      options: [
        { text: "$5$ km", correct: true, feedback: "$1 - \\frac dR = 1 - \\frac{2h}{R}$, so $h = d/2$." },
        { text: "$10$ km", feedback: "Height and depth lose $g$ at different rates: $2h/R$ against $d/R$." },
        { text: "$20$ km", feedback: "Reversed: height loses $g$ twice as fast, so the height is the *smaller* distance." },
      ],
      hint: "For small heights and depths use $g_h \\approx g\\left(1 - \\dfrac{2h}{R}\\right)$ and $g_d = g\\left(1 - \\dfrac{d}{R}\\right)$, and set them equal (Worked example 2).",
    },
    {
      type: "quiz",
      id: "mrg5-2-q4",
      variant: "concept",
      question: "Where is $g$ largest for a uniform spherical Earth?",
      options: [
        { text: "At the centre", feedback: "At the centre the pulls from all sides cancel: $g = 0$." },
        { text: "Halfway to the centre", feedback: "There $g = g_s/2$. Inside, $g$ grows steadily as you go outwards to the surface." },
        { text: "At the surface", correct: true, feedback: "$g \\propto r$ inside and $\\propto 1/r^2$ outside; the peak is where they meet." },
        { text: "Far away in space", feedback: "Outside, $g$ falls as $1/r^2$." },
      ],
      hint: "Outside the Earth $g \\propto 1/r^2$, falling as you go up; inside a uniform sphere $g \\propto r$, falling as you go down. Where do the two branches meet?",
    },
    {
      type: "quiz",
      id: "mrg5-2-q5",
      variant: "practice",
      question: "Roughly how long would a day have to be for objects on the equator to be weightless? Take $g = 10$ m/s², $R = 6400$ km.",
      options: [
        { text: "About 12 hours", feedback: "Halving the day only quadruples $\\omega^2R$ to about 0.14 m/s², nowhere near $g$." },
        { text: "About 1.4 hours", correct: true, feedback: "$\\omega = \\sqrt{g/R} = 1.25\\times10^{-3}$ rad/s and $T = 2\\pi/\\omega \\approx 5030$ s." },
        { text: "About 13 minutes", feedback: "That is $\\sqrt{R/g}$ in seconds without the $2\\pi$ ($800$ s). The period is $2\\pi\\sqrt{R/g}$." },
      ],
      hint: "Weightless on the equator means the needed centripetal acceleration equals $g$: $\\omega^2 R = g$. Find $\\omega$, then the day length $2\\pi/\\omega$.",
    },
    {
      type: "quiz",
      id: "mrg5-2-q6",
      variant: "concept",
      question: "Where on the Earth's surface does the Earth's rotation have **no** effect on the measured value of $g$?",
      options: [
        { text: "At the poles", correct: true, feedback: "There $\\cos\\lambda = 0$: a body at the pole just turns on the spot and needs no centripetal force." },
        { text: "At the equator", feedback: "The equator is where the effect is largest, $\\omega^2R \\approx 0.034$ m/s²." },
        { text: "At latitude $45^\\circ$", feedback: "There the reduction is $\\omega^2R\\cos^2 45^\\circ = \\tfrac12\\omega^2R$, not zero." },
      ],
      hint: "The rotation reduces $g$ by $\\omega^2 R\\cos^2\\lambda$, where $\\lambda$ is the latitude. Where on the surface is this term smallest?",
    },
    {
      type: "quiz",
      id: "mrg5-2-q7",
      variant: "practice",
      multiple: true,
      question: "Treat the Earth as a uniform sphere of radius $R$ with surface value $g$. Select all the statements that are correct.",
      options: [
        { text: "At a depth $R/2$, the value is $g/2$.", correct: true, feedback: "$g_d = g(1 - d/R) = g/2$: inside, $g$ falls linearly with depth." },
        { text: "At a height $R/2$, the value is $g/2$.", feedback: "$g\\dfrac{R^2}{(1.5R)^2} = \\dfrac49 g$, less than $g/2$. Going up loses $g$ faster than going down." },
        { text: "For small $h$, the value at height $h$ equals the value at depth $2h$.", correct: true, feedback: "$1 - \\dfrac{2h}{R} = 1 - \\dfrac dR$ gives $d = 2h$." },
        { text: "The Earth's rotation does not change the measured $g$ at the poles.", correct: true, feedback: "$g_\\lambda = g - \\omega^2R\\cos^2\\lambda$, and $\\cos 90^\\circ = 0$." },
        { text: "$g$ is largest at the centre, where all the mass surrounds you.", feedback: "At the centre the pulls from all sides cancel: $g = 0$. The largest value is at the surface." },
      ],
      hint: "Test each statement with the three formulas: $g_d = g(1 - d/R)$ inside, $g_h = g\\,\\dfrac{R^2}{(R + h)^2}$ outside (and its small-$h$ form), and the rotation term $\\omega^2R\\cos^2\\lambda$.",
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "gravitational-field-and-potential",
  title: "5.3 · Gravitational Field and Potential",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "A mass does not have to touch anything to be pulled. It is useful to imagine that every mass fills the space around it with a **field**, a property of each point that says what force any test mass placed there would feel. And just as $mgh$ tells you the energy cost of lifting without tracking every force, a **potential** at each point tells you the energy cost of bringing a mass there.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Gravitational field and potential",
      content:
        "**Field** (intensity): the force per unit mass on a small test mass, $\\vec E = \\vec F/m$ (N/kg, the same as m/s²). Near the Earth, $|\\vec E| = g$.\n**Potential**: the potential energy per unit mass, $V = U/m$ (J/kg), with $V = 0$ at infinity. Equivalently, $V$ at a point is minus the work done by gravity per unit mass as a test mass is brought there from infinity.\nThey are linked by $E_r = -\\dfrac{dV}{dr}$ and $V(r) = -\\displaystyle\\int_\\infty^r E_r\\,dr$.",
    },
    { type: "heading", text: "Point masses and rings" },
    {
      type: "text",
      content:
        "**Point mass.** The field points inwards with size $GM/r^2$, so $E_r = -GM/r^2$ and",
    },
    {
      type: "math",
      latex: "V(r) = -\\int_\\infty^r\\left(-\\frac{GM}{r'^2}\\right)dr' = -\\frac{GM}{r}",
    },
    {
      type: "text",
      content:
        "Potential is negative everywhere and rises towards zero far away. Because $V$ is a scalar, potentials from several masses simply **add as numbers**. That usually makes $V$ easier to find than $\\vec E$; you can then get $\\vec E$ by differentiating.",
    },
    {
      type: "text",
      content:
        "**Ring on its axis.** A thin ring of mass $M$ and radius $R$; a point $P$ on its axis at distance $x$ from the centre. Every bit of the ring is the same distance $\\sqrt{R^2 + x^2}$ from $P$, so the potentials add at once:",
    },
    {
      type: "math",
      latex: "V(x) = -\\frac{GM}{\\sqrt{R^2 + x^2}}, \\qquad E_x = -\\frac{dV}{dx} = -\\frac{GMx}{(R^2 + x^2)^{3/2}}",
    },
    {
      type: "text",
      content:
        "(The minus sign means the field points back towards the ring's centre; the sideways parts from opposite bits of ring cancel.) At the centre, $x = 0$: $E = 0$ but $V = -GM/R$. Far away, $E \\to GM/x^2$, a point mass again. In between the field has a maximum: setting $\\frac{d}{dx}\\frac{x}{(R^2+x^2)^{3/2}} = 0$ gives $R^2 + x^2 = 3x^2$, so $x = R/\\sqrt2$.",
    },
    {
      type: "interactive",
      config: {
        component: "graph-explorer",
        expr: "x/(1+x^2)^(3/2)",
        exprLatex: "\\frac{E R^2}{GM} = \\frac{x}{(1+x^2)^{3/2}}\\quad(x \\text{ in units of } R)",
        window: { xmin: -4, xmax: 4, ymin: -0.5, ymax: 0.5 },
        initial: 0.7,
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the field strength is zero at the centre, peaks at $x \\approx 0.707R$ with value $\\frac{2}{3\\sqrt3}\\frac{GM}{R^2} \\approx 0.385\\frac{GM}{R^2}$, then fades like $1/x^2$. The sign flips on the other side: the field always points back towards the ring.",
    },
    { type: "heading", text: "Shells and solid spheres" },
    {
      type: "text",
      content:
        "**Thin spherical shell.** Outside, it acts as a point mass: $V = -GM/r$. Inside, the field is zero (shell theorem), so $V$ does not change as you move around inside; it keeps the value it has at the surface, $V = -GM/R$ everywhere inside.",
    },
    {
      type: "text",
      content:
        "**Uniform solid sphere.** Outside: point mass. Inside, only the mass within radius $r$ pulls (Lesson 5.2), giving $E_r = -\\frac{GMr}{R^3}$. Integrate inwards from the surface, where $V = -GM/R$:",
    },
    {
      type: "math",
      latex: "V(r) = -\\frac{GM}{R} + \\int_r^R\\left(-\\frac{GMr'}{R^3}\\right)dr' = -\\frac{GM}{2R^3}\\left(3R^2 - r^2\\right)\\quad(r \\le R)",
    },
    {
      type: "text",
      content:
        "At the centre $V = -\\frac{3GM}{2R} = 1.5\\,V_{\\text{surface}}$: the centre is the bottom of the potential well. The graph below shows $V$ in units of $GM/R$ against $r/R$.",
    },
    {
      type: "interactive",
      config: {
        component: "piecewise-explorer",
        breakpoint: 1,
        breakBelongsTo: "left",
        leftExpr: "-(3 - x^2)/2",
        leftLatex: "-\\frac{3 - (r/R)^2}{2}",
        rightExpr: "-1/x",
        rightLatex: "-\\frac{R}{r}",
        window: { xmin: 0, xmax: 4, ymin: -1.6, ymax: 0.2 },
        initial: 0.5,
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the potential is lowest ($-1.5$) at the centre, rises smoothly as a parabola to $-1$ at the surface, and then climbs towards 0 as $-1/r$ outside. There is no kink at $r = R$: the slope, which is the field strength, is continuous there. The potential never reaches zero at any finite distance.",
    },
    {
      type: "table",
      headers: ["Body", "Field $|E|$", "Potential $V$"],
      rows: [
        ["point mass, distance $r$", "$GM/r^2$", "$-GM/r$"],
        ["ring, on axis at $x$", "$\\dfrac{GMx}{(R^2+x^2)^{3/2}}$", "$-\\dfrac{GM}{\\sqrt{R^2+x^2}}$"],
        ["thin shell, inside", "$0$", "$-GM/R$"],
        ["thin shell or solid sphere, outside", "$GM/r^2$", "$-GM/r$"],
        ["solid sphere, inside", "$GMr/R^3$", "$-\\dfrac{GM(3R^2 - r^2)}{2R^3}$"],
      ],
    },
    { type: "heading", text: "Working with potentials" },
    {
      type: "text",
      content:
        "**Work and potential.** The work an external agent must do to move a mass $m$ slowly from $A$ to $B$ is $W = m(V_B - V_A)$.",
    },
    {
      type: "worked-example",
      id: "mrg5-3-we1",
      title: "Worked example 1: ring",
      problem:
        "A ring of radius 3 m and mass $M$; point $P$ on the axis 4 m from the centre. Find the potential and the field at $P$, and the work needed to bring a unit mass from $P$ to the centre of the ring.",
      steps: [
        { text: "Distance from $P$ to every bit of the ring: $\\sqrt{9 + 16} = 5$ m. So $V_P = -GM/5$." },
        { text: "$|E_P| = \\dfrac{GM\\cdot 4}{5^3} = \\dfrac{4GM}{125}$, pointing towards the centre of the ring." },
        { text: "Work to bring a unit mass from $P$ to the centre: $V_O - V_P = -\\frac{GM}{3} + \\frac{GM}{5} = -\\frac{2GM}{15}$. Negative: gravity does the work, and the agent must hold the mass back." },
      ],
      answer: "$V_P = -\\dfrac{GM}{5}$, $|E_P| = \\dfrac{4GM}{125}$ towards the centre, work $-\\dfrac{2GM}{15}$ per unit mass.",
    },
    {
      type: "worked-example",
      id: "mrg5-3-we2",
      title: "Worked example 2: centre of the Earth to the surface",
      problem:
        "How much work is needed to lift 1 kg from the centre of a uniform Earth to its surface? Take $g = 10$ m/s², $R = 6400$ km.",
      steps: [
        { text: "$V_{\\text{surface}} - V_{\\text{centre}} = -\\frac{GM}{R} + \\frac{3GM}{2R} = \\frac{GM}{2R}$." },
        { text: "With $GM = gR^2$: $\\frac{gR}{2} = \\frac{10 \\times 6.4\\times10^6}{2} = 3.2\\times10^7$ J. *Why this step:* using $GM = gR^2$ avoids ever needing $G$ or $M$ separately." },
        { text: "Compare: lifting the same kilogram from the surface to infinity costs $gR = 6.4\\times10^7$ J, only twice as much." },
      ],
      answer: "$\\dfrac{gR}{2} = 3.2\\times10^7$ J.",
    },
    {
      type: "worked-example",
      id: "mrg5-3-we3",
      title: "Worked example 3: field from potential",
      problem:
        "In some region the potential is $V(x) = 3x^2 - 2x$ J/kg (with $x$ in m). Find the field at $x = 1$ m.",
      steps: [
        { text: "$E_x = -\\dfrac{dV}{dx} = -(6x - 2)$." },
        { text: "At $x = 1$: $E_x = -4$ N/kg, i.e. 4 N/kg in the $-x$ direction. *Why this step:* the field points \"downhill\" in potential, towards lower $V$." },
      ],
      answer: "$E_x = -4$ N/kg: 4 N/kg in the $-x$ direction.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"where the field is zero, the potential is zero\"",
      content:
        "Inside a hollow shell $E = 0$ but $V = -GM/R$. At the centre of a ring $E = 0$ but $V = -GM/R$. Zero field only means the potential is **not changing** there (it is flat), just as a flat stretch of road can be high on a mountain. Conversely, far from everything $V \\to 0$, and at that same place $E \\to 0$ too, but for a different reason.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "mrg5-3-q1",
      variant: "concept",
      multiple: true,
      question: "A uniform ring has mass $M$ and radius $R$. Select all the statements that are true at its centre.",
      options: [
        { text: "The gravitational field is zero.", correct: true, feedback: "Opposite bits of the ring pull equally in opposite directions, so the vector sum is zero." },
        { text: "The gravitational potential is $-\\dfrac{GM}{R}$.", correct: true, feedback: "Potentials are scalars: every bit $dm$ is a distance $R$ away and contributes $-G\\,dm/R$, and they all add." },
        { text: "The gravitational potential is zero, because the field is zero.", feedback: "Zero field does not mean zero potential. Every bit of ring is a distance $R$ away and contributes $-G\\,dm/R$." },
        { text: "The gravitational field is $\\dfrac{GM}{R^2}$.", feedback: "That adds the sizes of the pulls. The pulls from opposite sides of the ring cancel at the centre." },
      ],
      hint: "Field is a vector and potential is a scalar. How do the contributions from diametrically opposite bits of the ring combine in each case?",
    },
    {
      type: "quiz",
      id: "mrg5-3-q2",
      variant: "practice",
      question: "For a uniform solid sphere, what is the ratio of the gravitational potential at its centre to that at its surface?",
      options: [
        { text: "$1$", feedback: "That would be true for a hollow shell, where the field inside is zero. Inside a solid sphere there is a field, so $V$ changes." },
        { text: "$0$", feedback: "The field at the centre is zero, but the potential is the deepest value." },
        { text: "$\\frac32$", correct: true, feedback: "$V_c = -\\frac{3GM}{2R}$ and $V_s = -\\frac{GM}{R}$." },
        { text: "$\\frac23$", feedback: "Inverted: the centre is lower (more negative) than the surface." },
      ],
      hint: "Write the potential at the surface and at the centre of a uniform solid sphere, then divide.",
    },
    {
      type: "quiz",
      id: "mrg5-3-q3",
      variant: "concept",
      question: "A small mass is released from rest at a point inside a uniform hollow spherical shell (away from the centre). What happens?",
      options: [
        { text: "It moves to the centre", feedback: "There is no restoring force towards the centre; $V$ is the same at every inside point." },
        { text: "It stays where it is", correct: true, feedback: "The field inside a shell is zero, so there is no net force." },
        { text: "It moves to the nearest point of the shell", feedback: "The pull of the nearer part is exactly balanced by the larger far part." },
      ],
      hint: "Use the shell theorem: what is the net force on a particle inside a uniform shell, and what does Newton's first law then say?",
    },
    {
      type: "numeric",
      id: "mrg5-3-q4",
      variant: "practice",
      question: "A ring has radius 1 m. At what distance from its centre, along its axis, is the gravitational field strongest? Give your answer in metres, to two decimal places.",
      answer: 0.7071,
      tolerance: 0.01,
      unit: "m",
      hint: "On the axis, $E \\propto \\dfrac{x}{(R^2 + x^2)^{3/2}}$. Set its derivative to zero.",
      solution: "$\\dfrac{d}{dx}\\dfrac{x}{(R^2+x^2)^{3/2}} = \\dfrac{(R^2 + x^2) - 3x^2}{(R^2+x^2)^{5/2}} = 0$ gives $R^2 = 2x^2$, so $x = \\dfrac{R}{\\sqrt2} = \\dfrac{1}{\\sqrt2} \\approx 0.71$ m.",
      commonMistakes: [
        { answer: 0, feedback: "At the centre the field is zero: the pulls cancel." },
        { answer: 1, feedback: "Differentiate $\\frac{x}{(1 + x^2)^{3/2}}$: the maximum is at $1 + x^2 = 3x^2$." },
        { answer: 1.414, tolerance: 0.01, feedback: "That comes from $x^2 = 2R^2$. The condition is $R^2 + x^2 = 3x^2$, so $x^2 = R^2/2$." },
      ],
    },
    {
      type: "numeric",
      id: "mrg5-3-q5",
      variant: "practice",
      question: "The gravitational potential along the $x$-axis is $V = 3x^2 - 2x$ J/kg. What is the field at $x = 1$ m? Give its $x$-component in N/kg (negative means along $-x$).",
      answer: -4,
      unit: "N/kg",
      hint: "The field is minus the slope of the potential: $E_x = -\\dfrac{dV}{dx}$.",
      solution: "$\\dfrac{dV}{dx} = 6x - 2 = 4$ at $x = 1$, so $E_x = -4$ N/kg: 4 N/kg along $-x$, towards lower potential.",
      commonMistakes: [
        { answer: 4, feedback: "You forgot the minus sign in $E = -dV/dx$. The field points towards lower potential." },
        { answer: 1, feedback: "That is $V(1)$, the potential, not the field." },
        { answer: -6, feedback: "Differentiate the $-2x$ term too: $dV/dx = 6x - 2$." },
      ],
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "potential-energy-and-escape-speed",
  title: "5.4 · Gravitational Potential Energy and Escape Speed",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "Throw a ball up and it comes back. Throw it harder and it goes higher. Is there a speed so large that it never comes back at all? With $mgh$ the answer would be no, since $mgh$ grows without limit. But $g$ weakens with height, so the total energy needed to climb out of the Earth's pull is finite. To find it, we need the correct potential energy.",
    },
    { type: "heading", text: "Potential energy with zero at infinity" },
    {
      type: "text",
      content:
        "**Deriving $U$.** Take zero potential energy at infinity. Bring a mass $m$ from infinity to distance $r$ from the centre of a mass $M$. Gravity pulls inwards, along the motion, so it does positive work $\\int_r^\\infty \\frac{GMm}{r'^2}dr' = \\frac{GMm}{r}$. Potential energy falls by that amount:",
    },
    { type: "math", latex: "U(r) = -\\frac{GMm}{r}" },
    {
      type: "text",
      content:
        "**Why negative?** Because we chose zero at infinity, and bringing a mass closer releases energy. A negative $U$ means \"bound\": you must supply energy to separate the masses. Only differences in $U$ are physical; the zero is our choice.",
    },
    { type: "heading", text: "Recovering $mgh$" },
    {
      type: "text",
      content:
        "Raise $m$ from the surface ($r = R$) to height $h$:",
    },
    {
      type: "math",
      latex: "\\Delta U = GMm\\left(\\frac1R - \\frac{1}{R+h}\\right) = \\frac{GMm\\,h}{R(R+h)} = \\frac{mgh}{1 + h/R}",
    },
    {
      type: "text",
      content:
        "using $GM = gR^2$. For $h \\ll R$ this is $mgh$, the Mechanics I result. For $h = R$ it is $\\frac12 mgR$, half of what $mgh$ would say.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Potential energy of a system of particles",
      content:
        "For several point masses, add $-\\dfrac{Gm_im_j}{r_{ij}}$ over **every pair** once. Three equal masses $m$ on a triangle of side $a$: three pairs, $U = -\\dfrac{3Gm^2}{a}$. Four on a square of side $a$: four sides and two diagonals, $U = -\\dfrac{Gm^2}{a}\\left(4 + \\sqrt2\\right)$. The work needed to pull the system apart to infinity is $-U$.",
    },
    { type: "heading", text: "Escape speed" },
    {
      type: "text",
      content:
        "A body launched from the surface with speed $v$ escapes if it can reach infinity with $K \\ge 0$. There $U = 0$, so energy conservation demands $K + U \\ge 0$ at launch:",
    },
    {
      type: "math",
      latex: "\\tfrac12 mv_e^2 - \\frac{GMm}{R} = 0 \\;\\Rightarrow\\; v_e = \\sqrt{\\frac{2GM}{R}} = \\sqrt{2gR}",
    },
    {
      type: "text",
      content:
        "For the Earth, $\\sqrt{2 \\times 10 \\times 6.4\\times10^6} = \\sqrt{1.28\\times10^8} \\approx 11.3$ km/s (11.2 km/s with $g = 9.8$). The mass $m$ cancelled, and so did every mention of direction: energy is a scalar. (Real launches go eastwards and at an angle for other reasons: to borrow the Earth's spin and to get out of the air quickly.)",
    },
    {
      type: "interactive",
      config: {
        component: "function-machine",
        expr: "sqrt(20*x*1000)/1000",
        exprLatex: "v_e = \\sqrt{2gR}\\quad(g = 10\\text{ m/s}^2)",
        min: 1000,
        max: 10000,
        step: 100,
        initial: 6400,
        inputLabel: "Radius R",
        inputUnit: "km",
        outputLabel: "Escape speed (km/s)",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: at $R = 6400$ km the output is about 11.3 km/s. Quadruple the radius (at the same surface $g$) and the escape speed only doubles. The machine holds $g$ fixed; if instead the density is fixed, $M \\propto R^3$ and $v_e = R\\sqrt{\\tfrac83\\pi G\\rho}$ grows in direct proportion to $R$.",
    },
    { type: "heading", text: "Lifting, launching and separating masses" },
    {
      type: "text",
      content:
        "Take $g = 10$ m/s², $R = 6400$ km.",
    },
    {
      type: "worked-example",
      id: "mrg5-4-we1",
      title: "Worked example 1: lifting a satellite",
      problem:
        "How much energy is needed to raise a 100 kg payload from the surface to a height $R$?",
      steps: [
        { text: "$\\Delta U = \\dfrac{mgh}{1 + h/R}$ with $h = R$: $\\tfrac12 mgR = \\tfrac12 \\times 100 \\times 10 \\times 6.4\\times10^6 = 3.2\\times10^9$ J." },
        { text: "The naive $mgh$ gives $6.4\\times10^9$ J, twice too much. *Why this step:* $g$ has dropped to a quarter by the top, so the average pull is much less than at the surface." },
      ],
      answer: "$\\tfrac12 mgR = 3.2\\times10^9$ J.",
    },
    {
      type: "worked-example",
      id: "mrg5-4-we2",
      title: "Worked example 2: not quite escaping, JEE Main",
      problem:
        "A body is fired straight up at half the escape speed. How high does it go?",
      steps: [
        { text: "Energy: $\\tfrac12 mv^2 - \\dfrac{GMm}{R} = -\\dfrac{GMm}{R + h}$." },
        { text: "Divide by $m$ and use $GM = gR^2$: $\\tfrac12 v^2 = gR^2\\left(\\frac1R - \\frac{1}{R+h}\\right) = \\frac{gRh}{R+h}$." },
        { text: "Solve for $h$: $h = \\dfrac{Rv^2}{2gR - v^2}$. *Why this step:* this general result is worth deriving once and remembering the method, not the formula." },
        { text: "With $v = v_e/2$, $v^2 = \\frac{2gR}{4} = \\frac{gR}{2}$: $h = \\dfrac{R\\cdot gR/2}{2gR - gR/2} = \\dfrac R3 \\approx 2130$ km. The constant-$g$ answer $\\frac{v^2}{2g} = \\frac R4 = 1600$ km is too low." },
      ],
      answer: "$h = \\dfrac R3 \\approx 2130$ km.",
    },
    {
      type: "worked-example",
      id: "mrg5-4-we3",
      title: "Worked example 3: escape speed and density",
      problem:
        "A planet has twice the Earth's radius and the same average density. What is its escape speed?",
      steps: [
        { text: "$M = \\frac43\\pi R^3\\rho$, so $v_e = \\sqrt{\\frac{2G}{R}\\cdot\\frac43\\pi R^3\\rho} = R\\sqrt{\\frac{8\\pi G\\rho}{3}}$." },
        { text: "Same $\\rho$, twice $R$: twice $v_e$, about 22.6 km/s. *Why this step:* with density fixed, mass goes as $R^3$, which beats the $1/R$ in $2GM/R$." },
      ],
      answer: "Twice the Earth's, about 22.6 km/s.",
    },
    {
      type: "worked-example",
      id: "mrg5-4-we4",
      title: "Worked example 4: three masses",
      problem:
        "Three 1 kg masses sit at the corners of an equilateral triangle of side 1 m. How much work is needed to double the side?",
      steps: [
        { text: "$U_1 = -\\dfrac{3G(1)(1)}{1} = -3G$; $U_2 = -\\dfrac{3G}{2}$." },
        { text: "$W = U_2 - U_1 = \\dfrac{3G}{2} = 1.0\\times10^{-10}$ J." },
      ],
      answer: "$W = \\dfrac{3G}{2} = 1.0\\times10^{-10}$ J.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"escape speed depends on the direction of launch\"",
      content:
        "Escape is decided by energy, $\\tfrac12 mv^2 - \\frac{GMm}{R} \\ge 0$, and kinetic energy depends only on the speed. Fire at 11.3 km/s vertically, horizontally or at any angle (ignoring air and the ground in the way) and the body escapes; only its path differs.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"escape speed depends on the mass being launched\"",
      content:
        "A heavier body needs more escape **energy**, $\\frac{GMm}{R}$, but it also has more kinetic energy at a given speed. The $m$ cancels, and every body, from a molecule to a space station, has the same escape speed from a given place.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "mrg5-4-q1",
      variant: "practice",
      question: "How much work is needed to lift a 10 kg body slowly from the Earth's surface to a height equal to the Earth's radius? Take $g = 10$ m/s², $R = 6400$ km. Give your answer in joules (e.g. 1.5e8).",
      answer: 3.2e8,
      relTolerance: 0.01,
      unit: "J",
      hint: "$g$ is not constant over such a height. Use $U = -\\dfrac{GMm}{r}$ with $GM = gR^2$.",
      solution: "$W = \\Delta U = GMm\\left(\\dfrac1R - \\dfrac{1}{2R}\\right) = \\dfrac{GMm}{2R} = \\tfrac12 mgR$, using $GM = gR^2$. So $W = \\tfrac12 \\times 10 \\times 10 \\times 6.4\\times10^6 = 3.2\\times10^8$ J.",
      commonMistakes: [
        { answer: 6.4e8, feedback: "That is $mgh$ with surface $g$ all the way up. $g$ falls with height, so less work is needed." },
        { answer: 1.6e8, feedback: "That uses $g/4$ (the value at the top) throughout. The pull falls gradually, not all at once." },
      ],
    },
    {
      type: "numeric",
      id: "mrg5-4-q2",
      variant: "practice",
      question: "A planet has twice the Earth's radius and the same average density. If the Earth's escape speed is 11.2 km/s, what is the planet's? Give your answer in km/s.",
      answer: 22.4,
      relTolerance: 0.01,
      unit: "km/s",
      hint: "Write $M = \\tfrac43\\pi R^3\\rho$ inside $v_e = \\sqrt{2GM/R}$. How does $v_e$ scale with $R$ at fixed $\\rho$?",
      solution: "$v_e = \\sqrt{\\dfrac{2G}{R}\\cdot\\dfrac43\\pi R^3\\rho} = R\\sqrt{\\dfrac{8\\pi G\\rho}{3}} \\propto R$ at fixed density. Doubling $R$ doubles $v_e$: $2 \\times 11.2 = 22.4$ km/s.",
      commonMistakes: [
        { answer: 15.84, tolerance: 0.2, feedback: "That is $\\sqrt2 \\times 11.2$, which assumes the same surface $g$. Same density means $M$ is 8 times larger." },
        { answer: 7.92, tolerance: 0.1, feedback: "That treats $M$ as fixed, giving $v_e \\propto 1/\\sqrt R$. With fixed density the mass grows as $R^3$." },
        { answer: 44.8, feedback: "$v_e \\propto R$, not $R^2$, at fixed density." },
      ],
    },
    {
      type: "quiz",
      id: "mrg5-4-q3",
      variant: "concept",
      question: "Two identical probes leave the Earth's surface at 11.3 km/s, one vertically and one horizontally (ignore air and assume nothing is in the way). Which escapes?",
      options: [
        { text: "Both", correct: true, feedback: "Escape depends on $K + U \\ge 0$; both have the same $K$ and the same $U$." },
        { text: "Only the vertical one", feedback: "Direction changes the path, not the energy. The horizontal one escapes along a different curve." },
        { text: "Only the horizontal one, since it doesn't fight gravity head-on", feedback: "Energy is a scalar, so the direction of launch cannot matter." },
      ],
      hint: "Escape is an energy condition: $\\tfrac12 mv^2 \\ge \\dfrac{GMm}{R}$. Does kinetic energy depend on the direction of the velocity?",
    },
    {
      type: "quiz",
      id: "mrg5-4-q4",
      variant: "concept",
      question: "What is the escape speed of a 2000 kg rocket compared with that of a 1 kg stone, both from the Earth's surface?",
      options: [
        { text: "The same", correct: true, feedback: "$v_e = \\sqrt{2GM/R}$; the launched mass cancels." },
        { text: "$\\sqrt{2000}$ times smaller", feedback: "The rocket needs 2000 times more energy, but $\\tfrac12 mv^2$ also scales with $m$." },
        { text: "2000 times larger", feedback: "Escape energy grows with $m$; escape **speed** does not." },
      ],
      hint: "Set $\\tfrac12 mv_e^2 = \\dfrac{GMm}{R}$ and solve for $v_e$. Which quantities does the result depend on?",
    },
    {
      type: "quiz",
      id: "mrg5-4-q5",
      variant: "practice",
      question: "A body is projected vertically upwards from the Earth's surface with speed $v_e/\\sqrt2$, where $v_e$ is the escape speed. How high does it rise?",
      options: [
        { text: "$R/2$", feedback: "That is $\\frac{v^2}{2g}$, which uses constant $g$. $g$ weakens on the way up, so it goes higher." },
        { text: "$2R$", feedback: "Recheck: $\\frac{Rv^2}{2gR - v^2}$ with $v^2 = gR$ gives $R$." },
        { text: "$R$", correct: true, feedback: "$v^2 = gR$, and $h = \\frac{Rv^2}{2gR - v^2} = \\frac{R\\cdot gR}{gR} = R$." },
        { text: "It escapes", feedback: "It has only half the kinetic energy needed to escape." },
      ],
      hint: "Use energy conservation with $U = -\\dfrac{GMm}{r}$, not $mgh$, since the height is not small. Write $v_e^2 = 2GM/R$ and find the $r$ where the speed reaches zero (Worked example 2).",
    },
    {
      type: "quiz",
      id: "mrg5-4-q6",
      variant: "practice",
      question: "Four equal masses $m$ sit at the corners of a square of side $a$. What is the gravitational potential energy of the system?",
      options: [
        { text: "$-\\dfrac{4Gm^2}{a}$", feedback: "That counts only the four sides. The two diagonal pairs also attract." },
        { text: "$-\\dfrac{Gm^2}{a}\\left(4 + \\sqrt2\\right)$", correct: true, feedback: "Six pairs: four sides ($-Gm^2/a$ each) and two diagonals ($-Gm^2/(\\sqrt2 a)$ each, total $-\\sqrt2 Gm^2/a$)." },
        { text: "$-\\dfrac{6Gm^2}{a}$", feedback: "There are six pairs, but the diagonal pairs are $\\sqrt2 a$ apart, not $a$." },
        { text: "$-\\dfrac{Gm^2}{a}\\left(8 + 2\\sqrt2\\right)$", feedback: "That counts every pair twice (once from each end)." },
      ],
      hint: "Add $-\\dfrac{Gm^2}{r}$ for every **pair** of masses. Count how many pairs are sides of the square and how many are diagonals (Worked example 4).",
    },
    {
      type: "quiz",
      id: "mrg5-4-q7",
      variant: "practice",
      multiple: true,
      question: "Ignoring air resistance and the planet's rotation, the escape speed from the surface of a planet depends on which of these? Select all that apply.",
      options: [
        { text: "The mass of the planet", correct: true, feedback: "$v_e = \\sqrt{2GM/R}$: a heavier planet holds on harder." },
        { text: "The radius of the planet", correct: true, feedback: "$v_e = \\sqrt{2GM/R}$: starting farther from the centre, the body sits higher in the potential well." },
        { text: "The mass of the body being launched", feedback: "Both the needed energy $\\frac{GMm}{R}$ and the kinetic energy $\\tfrac12 mv^2$ scale with $m$, so $m$ cancels." },
        { text: "The direction of launch", feedback: "Escape is an energy condition, $K + U \\ge 0$, and both terms are scalars. Any direction that clears the ground will do." },
      ],
      hint: "Start from $\\tfrac12 mv_e^2 = \\dfrac{GMm}{R}$ and see which quantities survive in $v_e$.",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "orbits-and-satellites",
  title: "5.5 · Satellites and Orbits",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "Newton imagined a cannon on a very tall mountain firing horizontally. A slow shot curves down and hits the ground nearby. A faster one lands farther away. Fire fast enough and the ground curves away beneath the ball as fast as the ball falls towards it: the ball falls forever without landing. It is in **orbit**. A satellite is simply a projectile that keeps missing the Earth.",
    },
    { type: "heading", text: "Orbital speed" },
    {
      type: "text",
      content:
        "For a circular orbit of radius $r$ around a mass $M$, gravity supplies exactly the centripetal force:",
    },
    {
      type: "math",
      latex: "\\frac{GMm}{r^2} = \\frac{mv_o^2}{r} \\;\\Rightarrow\\; v_o = \\sqrt{\\frac{GM}{r}}, \\qquad T = \\frac{2\\pi r}{v_o} = 2\\pi\\sqrt{\\frac{r^3}{GM}}",
    },
    {
      type: "text",
      content:
        "The satellite's mass cancels, so a spanner dropped by an astronaut stays in the same orbit alongside her. Farther orbits are **slower** ($v_o \\propto r^{-1/2}$) and take much longer ($T \\propto r^{3/2}$).",
    },
    { type: "heading", text: "Energy of a circular orbit" },
    {
      type: "text",
      content:
        "**Energies.** Kinetic energy $K = \\tfrac12 mv_o^2 = \\frac{GMm}{2r}$; potential energy $U = -\\frac{GMm}{r}$. So",
    },
    {
      type: "math",
      latex: "E = K + U = -\\frac{GMm}{2r}, \\qquad K = -E, \\qquad U = 2E",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Circular orbits",
      content:
        "$v_o = \\sqrt{\\dfrac{GM}{r}}$, $\\quad T = 2\\pi\\sqrt{\\dfrac{r^3}{GM}}$, $\\quad E = -\\dfrac{GMm}{2r} = -K = \\dfrac U2$.\nNear the Earth's surface ($r \\approx R$): $v_o = \\sqrt{gR} \\approx 8$ km/s, $T = 2\\pi\\sqrt{R/g} \\approx 84$ min, and $v_e = \\sqrt2\\,v_o$.",
    },
    {
      type: "text",
      content:
        "A strange consequence of $E = -K$: to move to a **higher** orbit you must add energy, yet the satellite ends up **slower**. The added energy (and some of the kinetic energy) goes into potential energy. Conversely, air drag removes energy, the orbit shrinks, and the satellite speeds up.",
    },
    { type: "heading", text: "Periods and the 24-hour orbit" },
    {
      type: "text",
      content:
        "The machine below computes the period for a circular orbit of radius $r$ (in Earth radii), using $GM = gR^2$ with $g = 10$ m/s² and $R = 6400$ km.",
    },
    {
      type: "interactive",
      config: {
        component: "function-machine",
        expr: "2*pi*sqrt(640000*x^3)/3600",
        exprLatex: "T = 2\\pi\\sqrt{\\frac{r^3}{gR^2}}",
        min: 1,
        max: 10,
        step: 0.1,
        initial: 1,
        inputLabel: "Orbit radius r",
        inputUnit: "Earth radii",
        outputLabel: "Period (hours)",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: at $r = 1$ the period is about 1.4 h (84 min); at $r = 4$ it is $8\\times$ that, about 11.2 h; and somewhere near $r = 6.6$ it reaches 24 h. That last orbit is special.",
    },
    { type: "heading", text: "Low, geostationary and space-station orbits" },
    {
      type: "text",
      content:
        "Take $g = 10$ m/s², $R = 6400$ km, so $GM = gR^2 = 4.1\\times10^{14}$ m³/s².",
    },
    {
      type: "worked-example",
      id: "mrg5-5-we1",
      title: "Worked example 1",
      problem:
        "A satellite orbits just above the Earth's surface. Find its orbital speed, its period and the escape speed from the same place.",
      steps: [
        { text: "$v_o = \\sqrt{gR} = \\sqrt{6.4\\times10^7} = 8000$ m/s." },
        { text: "$T = \\frac{2\\pi R}{v_o} = \\frac{2\\pi\\times 6.4\\times10^6}{8000} \\approx 5030$ s $\\approx 84$ min." },
        { text: "Escape speed from the same place: $\\sqrt{2gR} = \\sqrt2 \\times 8 \\approx 11.3$ km/s. *Why this step:* from $v_e^2 = 2GM/R$ and $v_o^2 = GM/R$, escape always needs exactly $\\sqrt2$ times the circular speed at the same radius." },
      ],
      answer: "$v_o = 8$ km/s, $T \\approx 5030$ s $\\approx 84$ min, escape speed $\\approx 11.3$ km/s.",
    },
    {
      type: "worked-example",
      id: "mrg5-5-we2",
      title: "Worked example 2: geostationary orbit",
      problem:
        "A geostationary satellite orbits above the equator with a period of one day, eastwards, so it hovers over one spot. Find its radius.",
      steps: [
        { text: "$r^3 = \\dfrac{GMT^2}{4\\pi^2} = \\dfrac{4.1\\times10^{14}\\times(86\\,400)^2}{39.5} \\approx 7.7\\times10^{22}$ m³." },
        { text: "$r \\approx 4.26\\times10^7$ m $\\approx 42\\,600$ km $\\approx 6.6R$. Its height above the surface is about 36 000 km. *Why this step:* the period fixes $r$ completely, so every geostationary satellite shares one orbit." },
        { text: "Faster route with ratios: $T \\propto r^{3/2}$ and the surface orbit takes 1.4 h, so $\\frac rR = \\left(\\frac{24}{1.4}\\right)^{2/3} \\approx 6.6$." },
      ],
      answer: "$r \\approx 4.26\\times10^7$ m $\\approx 6.6R$, about 36 000 km above the surface.",
    },
    {
      type: "worked-example",
      id: "mrg5-5-we3",
      title: "Worked example 3: energies of an orbit",
      problem:
        "A 1000 kg satellite orbits at $r = 2R$. Find its kinetic, potential and total energy, the energy needed to move it out to $r = 4R$, and the energy needed to put it into this orbit from rest on the surface.",
      steps: [
        { text: "$K = \\frac{GMm}{2r} = \\frac{gR^2m}{4R} = \\frac{mgR}{4} = \\frac{1000\\times10\\times6.4\\times10^6}{4} = 1.6\\times10^{10}$ J." },
        { text: "$U = -2K = -3.2\\times10^{10}$ J and $E = -K = -1.6\\times10^{10}$ J." },
        { text: "Energy to move it out to $r = 4R$: $\\Delta E = \\frac{GMm}{2}\\left(\\frac{1}{2R} - \\frac{1}{4R}\\right) = \\frac{mgR}{8} = 8\\times10^9$ J. Its kinetic energy **falls** by the same $8\\times10^9$ J, and its potential energy rises by $1.6\\times10^{10}$ J." },
        { text: "Energy to put it into the $2R$ orbit starting at rest on the surface (ignoring the Earth's spin): $E_{\\text{orbit}} - U_{\\text{surface}} = -\\frac{mgR}{4} + mgR = \\frac34 mgR = 4.8\\times10^{10}$ J." },
      ],
      answer: "$K = 1.6\\times10^{10}$ J, $U = -3.2\\times10^{10}$ J, $E = -1.6\\times10^{10}$ J; $8\\times10^9$ J to reach $4R$; $4.8\\times10^{10}$ J from the surface.",
    },
    {
      type: "worked-example",
      id: "mrg5-5-we4",
      title: "Worked example 4: is there gravity on the space station?",
      problem:
        "The ISS orbits about 400 km up. How strong is gravity there compared with the surface, and why do the astronauts float?",
      steps: [
        { text: "$\\frac{g_h}{g} = \\left(\\frac{6400}{6800}\\right)^2 \\approx 0.886$." },
        { text: "So gravity there is still about 89% of its surface value. The astronauts float because they and the station are **falling together** with acceleration $g_h$, so the floor pushes on nobody. *Why this step:* apparent weight is the normal force, and in free fall it is zero whatever the local $g$." },
      ],
      answer: "$g_h \\approx 0.886g$ (about 89%); they float because they and the station fall together.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Polar and other satellites",
      content:
        "Geostationary orbits must be equatorial and eastward. Low-orbit **polar** satellites (heights of a few hundred km, periods near 100 min) pass over the poles, and the Earth turns beneath them, so they scan the whole surface strip by strip: ideal for mapping and weather.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"astronauts in orbit are weightless because there is no gravity there\"",
      content:
        "At 400 km, $g$ is about $8.9$ m/s². Gravity is exactly what keeps the station on its curved path; without it the station would fly off in a straight line. Weightlessness means free fall: the body and its surroundings accelerate together, so nothing presses on anything.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "mrg5-5-q1",
      variant: "practice",
      question: "Satellite B orbits at four times the radius of satellite A (both circular, same planet). What is $v_B/v_A$?",
      options: [
        { text: "$\\frac12$", correct: true, feedback: "$v_o \\propto 1/\\sqrt r$, so $\\sqrt{1/4} = \\frac12$." },
        { text: "$\\frac14$", feedback: "That uses $v \\propto 1/r$. The orbital speed goes as $1/\\sqrt r$." },
        { text: "$2$", feedback: "Farther orbits are slower, not faster." },
        { text: "$\\frac18$", feedback: "$\\frac18$ is the ratio of the periods, inverted. Speed goes as $r^{-1/2}$." },
      ],
      hint: "How does orbital speed depend on the orbit radius? Write $v$ from gravity supplying the centripetal force.",
    },
    {
      type: "numeric",
      id: "mrg5-5-q2",
      variant: "practice",
      question: "A satellite close to the Earth's surface has a period of about 84 min. What is the period of a satellite in a circular orbit of radius $4R$? Give your answer in hours.",
      answer: 11.2,
      relTolerance: 0.01,
      unit: "h",
      hint: "Kepler's third law: $T \\propto r^{3/2}$.",
      solution: "$T \\propto r^{3/2}$, so the period grows by $4^{3/2} = 8$: $8 \\times 84$ min $= 672$ min $= 11.2$ h.",
      commonMistakes: [
        { answer: 5.6, feedback: "That uses $T \\propto r$. Kepler's third law gives $r^{3/2}$." },
        { answer: 22.4, feedback: "That uses $T \\propto r^2$. The exponent is $\\tfrac32$." },
        { answer: 2.8, feedback: "That uses $T \\propto \\sqrt r$, which is the scaling of $1/v$ alone. The path is also 4 times longer." },
        { answer: 672, feedback: "That is the period in minutes. Convert to hours: $672/60$." },
      ],
    },
    {
      type: "quiz",
      id: "mrg5-5-q3",
      variant: "practice",
      multiple: true,
      question: "A satellite in a circular orbit has kinetic energy $5\\times10^9$ J. Select all the statements that are correct.",
      options: [
        { text: "Its total energy is $-5\\times10^9$ J.", correct: true, feedback: "For a circular orbit $E = -\\frac{GMm}{2r} = -K$." },
        { text: "Its potential energy is $-1\\times10^{10}$ J.", correct: true, feedback: "$U = -\\frac{GMm}{r} = -2K$." },
        { text: "Its total energy is zero.", feedback: "$E = 0$ is the escape condition, not a circular orbit. A bound orbit has $E < 0$." },
        { text: "Its potential energy is $-7.5\\times10^9$ J.", feedback: "Use $K = \\frac{GMm}{2r}$ and $U = -\\frac{GMm}{r}$: $U = -2K$, not $-1.5K$." },
        { text: "The least extra energy it needs to escape is $5\\times10^9$ J.", correct: true, feedback: "Escape needs $E \\ge 0$; it is at $-5\\times10^9$ J, so it needs exactly $5\\times10^9$ J more." },
      ],
      hint: "Recall how $K$, $U$ and $E$ are related for a circular orbit in this lesson, and what total energy a body needs to just escape.",
    },
    {
      type: "quiz",
      id: "mrg5-5-q4",
      variant: "practice",
      question: "What minimum energy is needed to put a satellite of mass $m$, initially at rest on the surface, into a circular orbit of radius $2R$? (Ignore the Earth's rotation.)",
      options: [
        { text: "$\\frac12 mgR$", feedback: "That only lifts it to height $R$; it would then fall back. It also needs orbital kinetic energy $\\frac14 mgR$." },
        { text: "$\\frac34 mgR$", correct: true, feedback: "$E_{\\text{orbit}} - U_{\\text{surface}} = -\\frac{GMm}{4R} + \\frac{GMm}{R} = \\frac34\\frac{GMm}{R} = \\frac34 mgR$." },
        { text: "$\\frac14 mgR$", feedback: "That is the orbital kinetic energy alone." },
        { text: "$mgR$", feedback: "That is the energy to escape completely." },
      ],
      hint: "The energy needed is $E_{\\text{orbit}} - E_{\\text{surface}}$, with $E_{\\text{orbit}} = -\\dfrac{GMm}{2r}$ and $E_{\\text{surface}} = -\\dfrac{GMm}{R}$. Write $GM = gR^2$.",
    },
    {
      type: "quiz",
      id: "mrg5-5-q5",
      variant: "concept",
      question: "Why does an astronaut float inside a space station orbiting 400 km above the Earth?",
      options: [
        { text: "She and the station are both in free fall with the same acceleration, so the floor exerts no force on her", correct: true, feedback: "Gravity there is about 89% of surface $g$; it is the contact force that vanishes." },
        { text: "Gravity is zero at that height", feedback: "$g$ at 400 km is still about 8.9 m/s²." },
        { text: "The centrifugal force exactly cancels gravity, so no net force acts", feedback: "In the ground frame there is a net force, gravity, providing the centripetal acceleration. She is accelerating, not in equilibrium." },
      ],
      hint: "At 400 km, $g$ is still about 90% of its surface value. What are the astronaut and the station both doing under gravity?",
    },
    {
      type: "numeric",
      id: "mrg5-5-q6",
      variant: "practice",
      question: "The escape speed from a planet's surface is 11.2 km/s. What is the speed of a satellite in a circular orbit just above its surface? Give your answer in km/s.",
      answer: 7.92,
      relTolerance: 0.01,
      unit: "km/s",
      hint: "Compare $v_e^2 = 2GM/R$ with $v_o^2 = GM/R$.",
      solution: "$v_o^2 = \\dfrac{GM}{R} = \\tfrac12 v_e^2$, so $v_o = \\dfrac{v_e}{\\sqrt2} = \\dfrac{11.2}{1.414} \\approx 7.9$ km/s.",
      commonMistakes: [
        { answer: 5.6, feedback: "That halves $v_e$. The ratio is $\\sqrt2$, from $v_e^2 = 2GM/R$ against $v_o^2 = GM/R$." },
        { answer: 15.84, tolerance: 0.2, feedback: "Orbiting needs less speed than escaping, not more." },
      ],
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "keplers-laws",
  title: "5.6 · Kepler's Laws and Motion in a Central Force",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "Decades before Newton, Johannes Kepler spent years fitting Tycho Brahe's naked-eye measurements of Mars. He found three rules that the planets obey, with no idea why. Newton's law of gravitation, together with conservation of angular momentum and energy, explains all three. That explanation was the moment physics became a single subject from apples to planets.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Kepler's three laws",
      content:
        "1. **Law of orbits:** each planet moves on an ellipse with the Sun at one focus.\n2. **Law of areas:** the line from the Sun to a planet sweeps out equal areas in equal times.\n3. **Law of periods:** $T^2 \\propto a^3$, where $a$ is the semi-major axis (half the longest diameter) of the ellipse.",
    },
    { type: "heading", text: "The second law is angular momentum conservation" },
    {
      type: "text",
      content:
        "Gravity on a planet points straight at the Sun, so its torque about the Sun is $\\vec r\\times\\vec F = \\vec 0$. Such a **central force** conserves $\\vec L$ about the centre. Now in a short time $dt$ the radius line turns through $d\\theta$ and sweeps a thin triangle of area $dA = \\tfrac12 r\\cdot r\\,d\\theta$. So",
    },
    {
      type: "math",
      latex: "\\frac{dA}{dt} = \\frac12 r^2\\frac{d\\theta}{dt} = \\frac{r\\,(m r\\omega)}{2m} = \\frac{L}{2m} = \\text{constant}",
    },
    {
      type: "text",
      content:
        "This works for **any** central force, not just gravity. And because $\\vec L$ is fixed in direction too, the orbit stays in one plane. At the nearest point (perihelion, $r_p$) and the farthest (aphelion, $r_a$) the velocity is perpendicular to the radius, so $L = mv_pr_p = mv_ar_a$:",
    },
    { type: "math", latex: "v_p r_p = v_a r_a" },
    { type: "heading", text: "The third law for circular orbits" },
    {
      type: "text",
      content:
        "From Lesson 5.5, $T = 2\\pi\\sqrt{r^3/GM}$, i.e. $T^2 = \\frac{4\\pi^2}{GM}r^3$. The constant depends only on the central mass, so it is the same for every planet of the Sun. For ellipses the same formula holds with $r$ replaced by the semi-major axis $a$ (we quote this). In solar-system units (years and AU), $T^2 = a^3$ exactly for the Earth, so it holds for every planet in those units.",
    },
    { type: "heading", text: "Energy of an elliptical orbit" },
    {
      type: "text",
      content:
        "Combine the two conservation laws at perihelion and aphelion (per unit mass): $v_pr_p = v_ar_a$ and $\\tfrac12 v_p^2 - \\frac{GM}{r_p} = \\tfrac12 v_a^2 - \\frac{GM}{r_a}$. Eliminating $v_a$ gives $v_p^2 = \\dfrac{2GMr_a}{r_p(r_p + r_a)}$, and then",
    },
    {
      type: "math",
      latex: "E = \\tfrac12 mv_p^2 - \\frac{GMm}{r_p} = -\\frac{GMm}{r_p + r_a} = -\\frac{GMm}{2a}",
    },
    {
      type: "text",
      content:
        "The same as a circle of radius $a$. The energy depends only on the size of the orbit, not on its shape.",
    },
    { type: "heading", text: "Effective potential" },
    {
      type: "text",
      content:
        "Split the kinetic energy into radial and sideways parts, $\\tfrac12 m\\dot r^2 + \\tfrac12 m(r\\omega)^2$, and write the sideways part with $L$: $\\frac{L^2}{2mr^2}$. Then",
    },
    {
      type: "math",
      latex: "E = \\tfrac12 m\\dot r^2 + \\underbrace{\\left(-\\frac{GMm}{r} + \\frac{L^2}{2mr^2}\\right)}_{U_{\\text{eff}}(r)}",
    },
    {
      type: "text",
      content:
        "The radial motion behaves like a particle in the one-dimensional potential $U_{\\text{eff}}$. The $L^2$ term is a \"centrifugal barrier\" that stops the planet falling in. The graph uses units with $GMm = 1$ and $m = 1$; the slider is $L$.",
    },
    {
      type: "interactive",
      config: {
        component: "transform-playground",
        baseExpr: "-1/x",
        baseLatex: "-\\frac1r",
        expr: "-1/x + L^2/(2*x^2)",
        exprLatex: "U_{\\text{eff}} = -\\frac1r + \\frac{L^2}{2r^2}",
        params: [{ name: "L", min: 0.2, max: 1.6, step: 0.1, initial: 1 }],
        window: { xmin: 0, xmax: 6, ymin: -1.5, ymax: 1 },
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: every curve has a well with its bottom at $r = L^2$ (depth $-\\frac{1}{2L^2}$). A planet with energy exactly at the bottom stays at one radius: a **circle**. With a little more energy (still negative) it rocks between two turning points $r_p$ and $r_a$: an **ellipse**. With $E = 0$ it just reaches infinity (a **parabola**), and with $E > 0$ it escapes with speed to spare (a **hyperbola**). Larger $L$ pushes the well outwards and makes it shallower.",
    },
    {
      type: "worked-example",
      id: "mrg5-6-we1",
      title: "Worked example 1: law of periods",
      problem:
        "An asteroid has semi-major axis 4 AU. Find its period.",
      steps: [
        { text: "In years and AU, $T^2 = a^3$. *Why this step:* using the Earth ($a = 1$ AU, $T = 1$ y) as the reference removes $G$ and $M_\\odot$." },
        { text: "$T = 4^{3/2} = 8$ years." },
        { text: "Mars, at $a = 1.52$ AU: $T = 1.52^{1.5} \\approx 1.87$ years (measured: 1.88)." },
      ],
      answer: "$T = 8$ years.",
    },
    {
      type: "worked-example",
      id: "mrg5-6-we2",
      title: "Worked example 2: a comet, JEE Main",
      problem:
        "A comet's closest distance from the Sun is 1 AU and its farthest is 7 AU. Find the ratio of its speeds at the closest and farthest points, its semi-major axis and its period.",
      steps: [
        { text: "Speeds: $v_pr_p = v_ar_a$, so $v_p : v_a = 7 : 1$. *Why this step:* at the extreme points the velocity is perpendicular to $\\vec r$, so $L = mvr$ exactly." },
        { text: "Semi-major axis: $a = \\frac{r_p + r_a}{2} = 4$ AU." },
        { text: "Period: $4^{3/2} = 8$ years, the same as the asteroid on a nearly circular 4 AU orbit." },
      ],
      answer: "$v_p : v_a = 7 : 1$, $a = 4$ AU, $T = 8$ years.",
    },
    {
      type: "worked-example",
      id: "mrg5-6-we3",
      title: "Worked example 3: a tangential boost, JEE Advanced",
      problem:
        "A satellite in a circular orbit of radius $r$ fires its engine briefly, increasing its speed along its direction of motion from $v_o$ to $\\sqrt{1.5}\\,v_o$. Find its new farthest distance.",
      steps: [
        { text: "The boost point becomes the perigee ($r_p = r$), since the velocity there is still perpendicular to the radius and the speed is now more than circular." },
        { text: "Energy: $E = \\tfrac12 m(1.5)\\frac{GM}{r} - \\frac{GMm}{r} = -\\frac{GMm}{4r}$. *Why this step:* $v_o^2 = GM/r$ at radius $r$." },
        { text: "$E = -\\frac{GMm}{2a}$ gives $a = 2r$, so $r_a = 2a - r_p = 3r$." },
        { text: "Speed at apogee: $v_a = v_p\\frac{r_p}{r_a} = \\frac{\\sqrt{1.5}}{3}v_o \\approx 0.41\\,v_o$. A boost to $\\sqrt2\\,v_o$ would give $E = 0$ and escape." },
      ],
      answer: "$r_a = 3r$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a planet moves at constant speed along its orbit\"",
      content:
        "Only on a circular orbit. On an ellipse, $v_pr_p = v_ar_a$ means it moves fastest at perihelion and slowest at aphelion. The Earth is about 3% closer to the Sun in early January than in early July, and moves correspondingly faster then, which is one reason the northern winter is a few days shorter than the northern summer.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "mrg5-6-q1",
      variant: "practice",
      question: "A planet orbits the Sun with semi-major axis 9 AU. What is its period? Give your answer in Earth years.",
      answer: 27,
      unit: "years",
      hint: "In years and AU, Kepler's third law for the Sun reads $T^2 = a^3$.",
      solution: "$T^2 = a^3 = 9^3 = 729$, so $T = \\sqrt{729} = 27$ years. Equivalently $T = a^{3/2} = (\\sqrt9)^3 = 27$.",
      commonMistakes: [
        { answer: 81, feedback: "That is $a^2$. Kepler's third law says $T^2 = a^3$." },
        { answer: 9, feedback: "$T$ is not proportional to $a$; it grows as $a^{3/2}$." },
        { answer: 729, feedback: "That is $a^3$, which equals $T^2$. Take the square root." },
      ],
    },
    {
      type: "numeric",
      id: "mrg5-6-q2",
      variant: "practice",
      question: "A comet's perihelion distance is 2 AU and its aphelion distance is 6 AU. What is the ratio of its speed at perihelion to its speed at aphelion, $v_p/v_a$?",
      answer: 3,
      hint: "At perihelion and aphelion the velocity is perpendicular to the radius, so $L = mvr$ there.",
      solution: "Angular momentum is conserved and $\\vec v \\perp \\vec r$ at both ends: $v_pr_p = v_ar_a$, so $\\dfrac{v_p}{v_a} = \\dfrac{r_a}{r_p} = \\dfrac62 = 3$.",
      commonMistakes: [
        { answer: 0.3333, tolerance: 0.01, feedback: "Inverted: the comet is fastest when closest." },
        { answer: 9, feedback: "That is the ratio of $r^2$. Angular momentum gives $v \\propto 1/r$ at these two points." },
        { answer: 1.732, tolerance: 0.01, feedback: "That would come from $v \\propto 1/\\sqrt r$, the circular-orbit scaling. Here use conservation of $L$." },
      ],
    },
    {
      type: "quiz",
      id: "mrg5-6-q3",
      variant: "concept",
      question: "Kepler's law of equal areas holds because...",
      options: [
        { text: "the gravitational force is central, so it exerts no torque about the Sun and angular momentum is conserved", correct: true, feedback: "$dA/dt = L/2m$, constant whenever $L$ is." },
        { text: "gravity follows an inverse-square law", feedback: "The inverse square matters for ellipses and the third law. Equal areas holds for any central force." },
        { text: "the planet's kinetic energy is constant", feedback: "Its kinetic energy changes: it is fastest at perihelion." },
      ],
      hint: "Area swept per unit time is $\\dfrac{dA}{dt} = \\dfrac{L}{2m}$. What property of the gravitational force keeps $L$ constant?",
    },
    {
      type: "quiz",
      id: "mrg5-6-q4",
      variant: "concept",
      question: "A body moves under the Sun's gravity with total energy $E > 0$. What kind of path does it follow?",
      options: [
        { text: "An ellipse", feedback: "Bound (elliptical) orbits need $E < 0$." },
        { text: "A circle", feedback: "A circle has $E = -\\frac{GMm}{2r} < 0$." },
        { text: "A parabola", feedback: "A parabola is the borderline case $E = 0$ exactly." },
        { text: "A hyperbola: it escapes with speed to spare", correct: true, feedback: "Positive energy means it still has kinetic energy at infinity." },
      ],
      hint: "The sign of the total energy decides whether the orbit is bound. With $E > 0$, does the body still have kinetic energy left when it is very far away?",
    },
    {
      type: "quiz",
      id: "mrg5-6-q5",
      variant: "practice",
      question: "A satellite in a circular orbit of radius $r$ is given a quick forward boost to $\\sqrt{1.5}$ times its orbital speed. What is the farthest distance it then reaches from the planet's centre?",
      options: [
        { text: "$2r$", feedback: "That is the semi-major axis $a$. The farthest distance is $2a - r_p$." },
        { text: "$1.5r$", feedback: "Distances do not scale with the speed factor. Use energy to find $a$." },
        { text: "$3r$", correct: true, feedback: "$E = -\\frac{GMm}{4r} = -\\frac{GMm}{2a}$ gives $a = 2r$, so $r_a = 2a - r = 3r$." },
        { text: "It escapes", feedback: "Escape needs $\\sqrt2\\,v_o$; $\\sqrt{1.5} < \\sqrt2$." },
      ],
      hint: "After the boost, conserve both angular momentum ($v_1 r = v_2 r_2$ at the two ends of the ellipse) and energy, then solve for the far point $r_2$.",
    },
    {
      type: "quiz",
      id: "mrg5-6-q6",
      variant: "practice",
      multiple: true,
      question: "A planet moves round the Sun on an elliptical orbit (consider only the Sun's gravity). Select all the statements that are correct.",
      options: [
        { text: "Its angular momentum about the Sun is constant.", correct: true, feedback: "Gravity is central, so it exerts no torque about the Sun." },
        { text: "Its speed is greatest at perihelion.", correct: true, feedback: "$L = mv r$ at the ends of the ellipse, so $v$ is largest where $r$ is smallest." },
        { text: "Its total mechanical energy is constant.", correct: true, feedback: "Gravity is conservative and does all the work: $K + U$ stays fixed, with $K$ and $U$ trading off." },
        { text: "Its kinetic energy is constant.", feedback: "Its speed changes round the orbit, so its kinetic energy does too; only $K + U$ is fixed." },
        { text: "Its linear momentum is constant.", feedback: "A net force (the Sun's pull) acts on it at every instant, so its momentum keeps changing direction and size." },
      ],
      hint: "Gravity from the Sun is central and conservative. Ask which quantities that protects, and which change as the distance from the Sun changes.",
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-5-mastery",
  title: "5.7 · Chapter 5 Mastery",
  position: 7,
  blocks: blocks([
    {
      type: "callout",
      variant: "info",
      title: "The chapter in seven lines",
      content:
        "1. $F = \\frac{Gm_1m_2}{r^2}$, superposed as vectors; a uniform shell acts as a point outside and exerts nothing inside.\n2. $g = GM/R^2$; above, $g\\frac{R^2}{(R+h)^2} \\approx g(1 - \\frac{2h}{R})$; below, $g(1 - \\frac dR)$; rotation subtracts $\\omega^2R\\cos^2\\lambda$.\n3. $\\vec E = \\vec F/m$, $V = U/m$, $E_r = -dV/dr$; potentials add as scalars.\n4. $U = -\\frac{GMm}{r}$; escape needs $K + U \\ge 0$, so $v_e = \\sqrt{2GM/R} = \\sqrt{2gR}$.\n5. Circular orbit: $v_o = \\sqrt{GM/r}$, $T = 2\\pi\\sqrt{r^3/GM}$, $E = -\\frac{GMm}{2r} = -K$.\n6. Central force ⇒ $L$ conserved ⇒ equal areas and $v_pr_p = v_ar_a$.\n7. $T^2 \\propto a^3$ and $E = -\\frac{GMm}{2a}$ for any ellipse.",
    },
    {
      type: "text",
      content:
        "No formula sheet: rebuild each result from Newton's law, the shell theorem and the two conservation laws. Take $g = 10$ m/s², $R = 6400$ km unless stated.",
    },
    {
      type: "quiz",
      id: "mrg5-7-q1",
      variant: "mastery",
      question: "Masses $m$, $m$, $m$ and $3m$ are at the corners of a square of side $a$. What is the net gravitational force on a mass $m_0$ at the centre?",
      options: [
        { text: "$\\dfrac{2Gmm_0}{a^2}$ towards the $3m$ corner", feedback: "That uses distance $a$ instead of the half-diagonal $a/\\sqrt2$, or an excess of $m$ instead of $2m$." },
        { text: "$\\dfrac{4Gmm_0}{a^2}$ towards the $3m$ corner", correct: true, feedback: "Write $3m = m + 2m$: four equal $m$'s cancel, leaving $2m$ at distance $a/\\sqrt2$: $\\frac{G(2m)m_0}{a^2/2}$." },
        { text: "$\\dfrac{6Gmm_0}{a^2}$ towards the $3m$ corner", feedback: "The opposite corner's $m$ cancels part of the $3m$'s pull. Only the excess $2m$ counts." },
        { text: "zero, by symmetry", feedback: "The symmetry is broken by the heavier corner." },
      ],
      hint: "Forces between several masses (lesson 5.1): look for pairs that cancel by symmetry.",
    },
    {
      type: "numeric",
      id: "mrg5-7-q2",
      variant: "mastery",
      question: "The value of $g$ at a depth of 48 km below the surface equals its value at what height above the surface? Give your answer in km.",
      answer: 24,
      unit: "km",
      hint: "Lesson 5.2: compare the small-height and small-depth forms of $g$.",
      solution: "Both distances are small compared with $R$: $1 - \\dfrac{2h}{R} = 1 - \\dfrac dR$ gives $h = \\dfrac d2 = 24$ km.",
      commonMistakes: [
        { answer: 48, feedback: "Near the surface, height reduces $g$ twice as fast as depth, so a smaller height does the same job." },
        { answer: 96, feedback: "Reversed: height is the faster way to lose $g$, so the height must be smaller than the depth." },
      ],
    },
    {
      type: "numeric",
      id: "mrg5-7-q3",
      variant: "mastery",
      question: "At what latitude is the reduction in effective $g$ caused by the Earth's rotation one quarter of its value at the equator? Give your answer in degrees.",
      answer: 60,
      tolerance: 0.5,
      unit: "°",
      hint: "Effect of the Earth's rotation on $g$ (lesson 5.2).",
      solution: "The reduction is $\\omega^2R\\cos^2\\lambda$, and at the equator it is $\\omega^2R$. So $\\cos^2\\lambda = \\tfrac14$, $\\cos\\lambda = \\tfrac12$ and $\\lambda = 60^\\circ$.",
      commonMistakes: [
        { answer: 75.5, tolerance: 0.5, feedback: "That solves $\\cos\\lambda = \\tfrac14$. The reduction goes as $\\cos^2\\lambda$." },
        { answer: 45, feedback: "At $45^\\circ$, $\\cos^2\\lambda = \\tfrac12$: half the equatorial reduction." },
        { answer: 30, feedback: "At $30^\\circ$, $\\cos^2\\lambda = \\tfrac34$. Latitude is measured from the equator, so a quarter of the effect needs the higher latitude." },
      ],
    },
    {
      type: "quiz",
      id: "mrg5-7-q4",
      variant: "mastery",
      question: "Three particles, each of mass $m$, sit at the corners of an equilateral triangle of side $a$. How much work must be done to increase the side to $2a$?",
      options: [
        { text: "$\\dfrac{3Gm^2}{a}$", feedback: "That is the work to separate them completely (to infinity)." },
        { text: "$\\dfrac{Gm^2}{2a}$", feedback: "That counts one pair. There are three pairs." },
        { text: "$\\dfrac{3Gm^2}{2a}$", correct: true, feedback: "$U$ goes from $-\\frac{3Gm^2}{a}$ to $-\\frac{3Gm^2}{2a}$." },
        { text: "$\\dfrac{9Gm^2}{4a}$", feedback: "Potential energy goes as $1/r$, not $1/r^2$: $U_2 = \\tfrac12 U_1$." },
      ],
      hint: "Lesson 5.4: work done equals the change in the system's potential energy, summed over pairs.",
    },
    {
      type: "quiz",
      id: "mrg5-7-q5",
      variant: "mastery",
      question: "A planet has half the Earth's radius and twice its average density. If the Earth's escape speed is 11.2 km/s, what is the planet's?",
      options: [
        { text: "11.2 km/s", feedback: "Halving $R$ and doubling $\\rho$ do not cancel: $v_e \\propto R\\sqrt\\rho$." },
        { text: "about 7.9 km/s", correct: true, feedback: "$v_e = R\\sqrt{8\\pi G\\rho/3} \\propto R\\sqrt\\rho$: $\\tfrac12\\sqrt2 = \\frac{1}{\\sqrt2}$, and $\\frac{11.2}{\\sqrt2} \\approx 7.9$." },
        { text: "5.6 km/s", feedback: "That ignores the density change." },
        { text: "15.8 km/s", feedback: "That is $\\sqrt2 \\times 11.2$. Smaller $R$ reduces $v_e$ more than the density raises it." },
      ],
      hint: "Escape speed in terms of density and radius (lesson 5.4).",
    },
    {
      type: "quiz",
      id: "mrg5-7-q6",
      variant: "mastery",
      question: "Satellites A and B orbit the Earth at heights $R$ and $3R$ above the surface. Find $v_A/v_B$ and $T_A/T_B$.",
      options: [
        { text: "$v_A/v_B = \\sqrt3$, $T_A/T_B = \\frac{1}{3\\sqrt3}$", feedback: "Heights are $R$ and $3R$, but orbital radii are measured from the centre: $2R$ and $4R$." },
        { text: "$v_A/v_B = 2$, $T_A/T_B = \\frac18$", feedback: "That uses $r = R$ and $4R$ with the wrong exponents too. Radii are $2R$ and $4R$." },
        { text: "$v_A/v_B = \\frac{1}{\\sqrt2}$, $T_A/T_B = 2\\sqrt2$", feedback: "Inverted: the lower satellite is faster and has the shorter period." },
        { text: "$v_A/v_B = \\sqrt2$, $T_A/T_B = \\frac{1}{2\\sqrt2}$", correct: true, feedback: "Orbit radii are $2R$ and $4R$: $v \\propto r^{-1/2}$ gives $\\sqrt2$; $T \\propto r^{3/2}$ gives $(1/2)^{3/2}$." },
      ],
      hint: "Orbital speed and period (lesson 5.5): measure orbit radii from the Earth's centre.",
    },
    {
      type: "quiz",
      id: "mrg5-7-q7",
      variant: "mastery",
      question: "How much energy is needed to move a satellite of mass $m$ from a circular orbit of radius $2R$ to one of radius $3R$?",
      options: [
        { text: "$\\dfrac{mgR}{12}$", correct: true, feedback: "$\\Delta E = \\frac{GMm}{2}\\left(\\frac{1}{2R} - \\frac{1}{3R}\\right) = \\frac{GMm}{12R} = \\frac{mgR}{12}$." },
        { text: "$\\dfrac{mgR}{6}$", feedback: "That is the change in potential energy alone. The kinetic energy falls by half that amount." },
        { text: "$\\dfrac{mgR}{3}$", feedback: "Check the fractions: $\\frac{1}{2R} - \\frac{1}{3R} = \\frac{1}{6R}$, then multiply by $\\frac{GMm}{2}$." },
        { text: "$mgR$", feedback: "That is $mg\\Delta r$ with surface $g$. Use orbital energies $-\\frac{GMm}{2r}$." },
      ],
      hint: "Orbital energy (lesson 5.5).",
    },
    {
      type: "quiz",
      id: "mrg5-7-q8",
      variant: "mastery",
      question: "A satellite skimming the Earth's surface has a period of about 1.4 h. Approximately how far from the Earth's centre is a satellite with a period of 24 h?",
      options: [
        { text: "about $17R$", feedback: "That uses $r \\propto T$. Kepler's third law gives $r \\propto T^{2/3}$." },
        { text: "about $6.6R$", correct: true, feedback: "$r \\propto T^{2/3}$: $\\left(\\frac{24}{1.4}\\right)^{2/3} = 17.1^{2/3} \\approx 6.6$." },
        { text: "about $4.1R$", feedback: "That uses $r \\propto T^{1/2}$. The exponent is $\\tfrac23$." },
        { text: "about $5.6R$", feedback: "$5.6R$ is roughly the geostationary *height*; the question asks for the distance from the centre, and $(24/1.4)^{2/3} \\approx 6.6$." },
      ],
      hint: "Kepler's third law (lesson 5.6).",
    },
    {
      type: "numeric",
      id: "mrg5-7-q9",
      variant: "mastery",
      question: "A planet orbits a star at 9 times the Earth's distance from the Sun; the star has the same mass as the Sun. How long is the planet's year? Give your answer in Earth years.",
      answer: 27,
      unit: "years",
      hint: "Lesson 5.6: Kepler's third law, with the Earth's orbit as reference.",
      solution: "Same central mass, so Kepler's third law $T^2 \\propto a^3$ applies with the Earth as reference: $T = 9^{3/2} = 27$ Earth years.",
      commonMistakes: [
        { answer: 81, feedback: "That uses $T \\propto a^2$." },
        { answer: 9, feedback: "That uses $T \\propto a$." },
        { answer: 3, feedback: "That uses $T \\propto \\sqrt a$." },
      ],
    },
    {
      type: "numeric",
      id: "mrg5-7-q10",
      variant: "mastery",
      question: "A comet moves at 60 km/s at perihelion, 0.5 AU from the Sun. Its aphelion is 5 AU from the Sun. How fast is it moving at aphelion? Give your answer in km/s.",
      answer: 6,
      unit: "km/s",
      hint: "Kepler's second law as conservation of angular momentum (lesson 5.6).",
      solution: "At both ends of the ellipse $\\vec v \\perp \\vec r$, so conservation of angular momentum gives $v_pr_p = v_ar_a$: $v_a = 60 \\times \\dfrac{0.5}{5} = 6$ km/s.",
      commonMistakes: [
        { answer: 600, feedback: "Inverted. The comet is slowest when farthest." },
        { answer: 19, tolerance: 0.1, feedback: "That uses $v \\propto 1/\\sqrt r$, the circular-orbit rule. At the ends of an ellipse, angular momentum gives $v \\propto 1/r$." },
        { answer: 0.6, feedback: "That is $60 \\times 0.1^2$, as if $v \\propto 1/r^2$. Angular momentum gives $v \\propto 1/r$." },
      ],
    },
    {
      type: "quiz",
      id: "mrg5-7-q11",
      variant: "mastery",
      question: "A satellite in a circular orbit of radius $r$ briefly fires its engine forwards, raising its speed to $\\sqrt{4/3}$ times the circular speed. What is its farthest distance from the planet's centre in the new orbit?",
      options: [
        { text: "$1.5r$", feedback: "That is the semi-major axis. The far point is at $2a - r_p$." },
        { text: "$\\frac43 r$", feedback: "Distances do not scale with the speed factor. Find $a$ from the energy." },
        { text: "$3r$", feedback: "That is the result for a boost to $\\sqrt{1.5}\\,v_o$." },
        { text: "$2r$", correct: true, feedback: "$E = \\tfrac12 m\\cdot\\tfrac43\\frac{GM}{r} - \\frac{GMm}{r} = -\\frac{GMm}{3r} = -\\frac{GMm}{2a}$, so $a = 1.5r$ and $r_a = 2a - r = 2r$." },
      ],
      hint: "The boost point is the perigee. Find $E$, then $a$ from $E = -GMm/2a$.",
    },
    {
      type: "quiz",
      id: "mrg5-7-q12",
      variant: "mastery",
      question: "A body is released from rest at a height $R$ above the Earth's surface (ignore air). With what speed does it hit the ground?",
      options: [
        { text: "$\\sqrt{2gR} \\approx 11.3$ km/s", feedback: "That is $\\sqrt{2gh}$ with constant $g$. The pull is weaker higher up, so the body gains less speed." },
        { text: "$\\sqrt{gR/2} \\approx 5.7$ km/s", feedback: "That uses $g/4$ (the value at the start) all the way down." },
        { text: "$\\sqrt{gR} \\approx 8$ km/s", correct: true, feedback: "$\\tfrac12 v^2 = GM\\left(\\frac1R - \\frac{1}{2R}\\right) = \\frac{gR}{2}$, so $v = \\sqrt{gR}$." },
        { text: "$11.2$ km/s, the escape speed", feedback: "Falling from infinity would give the escape speed. From height $R$ it is less." },
      ],
      hint: "Energy conservation over a large height (lesson 5.4).",
    },
    {
      type: "quiz",
      id: "mrg5-7-q13",
      variant: "mastery",
      multiple: true,
      question: "Two satellites A and B of **equal mass** move in circular orbits round the Earth, with orbit radius $r_A < r_B$. Select all the statements that are correct.",
      options: [
        { text: "A moves faster than B.", correct: true, feedback: "$v_o = \\sqrt{GM/r}$ falls with $r$." },
        { text: "A has the shorter period.", correct: true, feedback: "$T \\propto r^{3/2}$: the inner orbit is both shorter and faster." },
        { text: "A has the lower (more negative) total energy.", correct: true, feedback: "$E = -\\dfrac{GMm}{2r}$ is more negative for smaller $r$; moving A out to B's orbit needs energy." },
        { text: "A has the larger angular momentum about the Earth's centre.", feedback: "$L = mv_or = m\\sqrt{GMr}$ grows with $r$: the faster inner satellite still has less angular momentum." },
        { text: "A has the larger total energy, since it has more kinetic energy.", feedback: "$K$ is larger for A, but $U = -2K$ falls by twice as much: $E = -K$ is lower for A." },
      ],
      hint: "Circular orbits (lesson 5.5) and angular momentum $L = mvr$ (lesson 5.6): compare each quantity as a function of $r$.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Where this leaves you",
      content:
        "One inverse-square law, two conservation laws and the shell theorem produce everything in this chapter. The same mathematics returns in electrostatics, where Coulomb's law is another $1/r^2$ force and field, potential and Gauss's law (the electric shell theorem) play exactly the roles they played here.",
    },
  ]),
};

export const mrgChapter5Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lessonMastery,
];
