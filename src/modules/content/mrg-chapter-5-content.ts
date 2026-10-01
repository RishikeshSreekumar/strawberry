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
      type: "text",
      content:
        "An apple falls because the Earth pulls it. The Moon does not fall onto the Earth, so for centuries people assumed the heavens followed different rules. Newton's leap was to say the Moon **is** falling: it moves sideways so fast that as it falls towards the Earth it keeps missing. If one force explains both, the pull at the Moon's distance must be weaker by exactly the right amount. He checked.",
    },
    {
      type: "text",
      content:
        "**Newton's Moon test.** The Moon orbits at $r = 3.84\\times10^8$ m, about 60 Earth radii, with period $T = 27.3$ days $= 2.36\\times10^6$ s. Its centripetal acceleration is",
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
      type: "text",
      content:
        "**Worked example 1 (people are not planets).** Two 50 kg students sit 1 m apart.\n\n1. $F = \\dfrac{6.67\\times10^{-11}\\times 50\\times 50}{1^2} = 1.67\\times10^{-7}$ N.\n2. Each student's weight is about 500 N, some three billion times larger. *Why this step:* comparing with a familiar force shows why gravity between everyday objects never matters in Mechanics I problems.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (the neutral point between Earth and Moon).** $M_E = 81M_m$ and the centres are $d = 3.84\\times10^5$ km apart. Where does a spacecraft feel no net pull?\n\n1. At distance $x$ from the Earth the pulls balance: $\\dfrac{GM_Em}{x^2} = \\dfrac{GM_mm}{(d-x)^2}$.\n2. Take square roots: $\\dfrac{x}{d - x} = \\sqrt{81} = 9$. *Why this step:* both sides are positive, so the square root keeps the point *between* the bodies.\n3. $x = 0.9d = 3.46\\times10^5$ km from the Earth's centre.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (three masses on a triangle).** Three equal masses $m$ sit at the corners of an equilateral triangle of side $a$. Find the net force on one of them.\n\n1. Each of the other two pulls it with $F = Gm^2/a^2$, along the two sides that meet at its corner. The angle between these pulls is $60^\\circ$.\n2. Resultant of two equal forces at $60^\\circ$: $2F\\cos 30^\\circ = \\sqrt3 F$, directed along the bisector towards the centre. *Why this step:* by symmetry the sideways parts cancel and only the parts along the bisector add.\n3. Net force $= \\sqrt3\\,\\dfrac{Gm^2}{a^2}$. A fourth mass placed at the centre would feel **zero** net force: three equal pulls at $120^\\circ$ cancel.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (unbalancing a square).** Masses $m$, $m$, $m$ and $2m$ sit at the corners of a square of side $a$; a mass $m_0$ is at the centre.\n\n1. Think of the $2m$ corner as $m + m$. Four equal masses $m$ give zero at the centre (opposite pairs cancel).\n2. What is left is the extra $m$ at one corner, a distance $a/\\sqrt2$ from the centre.\n3. $F = \\dfrac{Gmm_0}{a^2/2} = \\dfrac{2Gmm_0}{a^2}$, towards the $2m$ corner. *Why this step:* superposition lets you add and subtract masses to exploit symmetry, the same trick as the cavities of Chapter 0.",
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
    },
    {
      type: "quiz",
      id: "mrg5-1-q2",
      variant: "practice",
      question: "Point masses of 2 kg and 8 kg are 1.2 m apart. At what distance from the 2 kg mass, on the line between them, is the net gravitational force on a third mass zero?",
      options: [
        { text: "$0.24$ m", feedback: "That uses the mass ratio $1:4$ directly. Distances go as the square root of the masses." },
        { text: "$0.4$ m", correct: true, feedback: "$\\frac{x}{1.2 - x} = \\sqrt{\\frac28} = \\frac12$, so $x = 0.4$ m." },
        { text: "$0.6$ m", feedback: "The midpoint only works for equal masses. The neutral point is nearer the lighter one." },
        { text: "$0.8$ m", feedback: "That is the distance from the 8 kg mass. The point is closer to the lighter mass." },
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
    {
      type: "text",
      content:
        "**Above the surface.** At height $h$ the distance to the centre is $R + h$:",
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
    {
      type: "text",
      content:
        "**Below the surface.** At depth $d$ you are at $r = R - d$ from the centre. By the shell theorem, the shell of rock *outside* radius $r$ pulls with zero net force. Only the inner sphere of radius $r$ counts, and for uniform density its mass is $M\\frac{r^3}{R^3}$:",
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
    {
      type: "text",
      content:
        "**Rotation and latitude.** The Earth spins with $\\omega = \\frac{2\\pi}{86\\,400\\text{ s}} = 7.27\\times10^{-5}$ rad/s. A body at latitude $\\lambda$ moves on a circle of radius $R\\cos\\lambda$, which needs a centripetal force $m\\omega^2R\\cos\\lambda$. Part of the gravitational pull is used up providing it, so the scale reads less. The component of this along the vertical is $m\\omega^2R\\cos\\lambda\\cdot\\cos\\lambda$, giving $g_\\lambda \\approx g - \\omega^2R\\cos^2\\lambda$. At the equator $\\omega^2R = (7.27\\times10^{-5})^2\\times 6.4\\times10^6 \\approx 0.034$ m/s²: small, but measurable.",
    },
    {
      type: "text",
      content:
        "Take $g = 10$ m/s², $R = 6400$ km.\n\n**Worked example 1 (g halves).** At what height is $g$ half its surface value?\n\n1. $\\dfrac{R^2}{(R+h)^2} = \\dfrac12 \\Rightarrow \\dfrac{R+h}{R} = \\sqrt2$.\n2. $h = (\\sqrt2 - 1)R \\approx 0.414 \\times 6400 = 2650$ km. *Why this step:* $h$ is not small here, so the $1 - 2h/R$ approximation (which would give $R/4 = 1600$ km) is badly wrong.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (height vs depth).** Near the surface, a given fall in $g$ happens at depth $d$ and at height $h$. How are $d$ and $h$ related?\n\n1. Height: fractional loss $\\approx 2h/R$. Depth: fractional loss $= d/R$.\n2. Equal losses: $d = 2h$. At 32 km up, $g$ is 1% less (9.9 m/s²); you would need to go 64 km **down** to lose the same 1%.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (height $R/2$ against depth $R/2$).**\n\n1. Height $R/2$: $g\\frac{R^2}{(1.5R)^2} = \\frac49 g \\approx 4.44$ m/s².\n2. Depth $R/2$: $g(1 - \\frac12) = 5$ m/s².\n3. Going $R/2$ up costs more $g$ than going $R/2$ down. *Why this step:* on the graph, the outside curve leaves the surface with slope $-2$ (in units of $g/R$) while the inside line arrives with slope $+1$, so moving away from the surface in either direction loses $g$, but faster upwards.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (a day short enough to float).** How short would a day have to be for objects at the equator to feel weightless?\n\n1. Weightless means all of gravity goes into the centripetal force: $\\omega^2R = g$. *Why this step:* the scale reading is $m(g - \\omega^2R)$ at the equator; set it to zero.\n2. $\\omega = \\sqrt{g/R} = \\sqrt{10/6.4\\times10^6} = 1.25\\times10^{-3}$ rad/s.\n3. $T = 2\\pi/\\omega \\approx 5030$ s $\\approx 84$ min $\\approx 1.4$ h, about 17 times faster than now. This is also the period of a satellite skimming the surface (Lesson 5.5).",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"$g$ is greatest at the centre of the Earth\"",
      content:
        "At the centre you are pulled equally in every direction by the surrounding rock, so $g = 0$. The largest value is at the surface, where all of the Earth is \"below\" you and you are as close to it as possible. (The real Earth is denser in the core, so $g$ actually rises slightly for the first part of the way down; for a uniform Earth, which is what JEE assumes, it falls linearly.)",
    },
    {
      type: "quiz",
      id: "mrg5-2-q1",
      variant: "practice",
      question: "What is $g$ at a height equal to the Earth's radius above the surface? Take $g = 10$ m/s² at the surface.",
      options: [
        { text: "$5$ m/s²", feedback: "That halves $g$ for twice the distance. The law is inverse **square**." },
        { text: "$0$", feedback: "$g$ is zero at the centre, not one radius up. Gravity only fades gradually outside." },
        { text: "$2.5$ m/s²", correct: true, feedback: "$g\\frac{R^2}{(2R)^2} = \\frac g4$." },
        { text: "$-10$ m/s²", feedback: "The approximation $1 - 2h/R$ fails for $h = R$. Use the exact form." },
      ],
    },
    {
      type: "quiz",
      id: "mrg5-2-q2",
      variant: "practice",
      question: "At what height above the Earth's surface is $g$ equal to 64% of its surface value? Take $R = 6400$ km.",
      options: [
        { text: "$1600$ km", correct: true, feedback: "$\\frac{R}{R+h} = \\sqrt{0.64} = 0.8$, so $R + h = 1.25R$ and $h = R/4$." },
        { text: "$1152$ km", feedback: "That uses $1 - 2h/R = 0.64$. The approximation is not valid for such a large change." },
        { text: "$2304$ km", feedback: "That uses $1 - h/R = 0.64$, which is the depth formula." },
        { text: "$4000$ km", feedback: "Take the square root: $R/(R+h) = 0.8$." },
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
    {
      type: "text",
      content:
        "**Work and potential.** The work an external agent must do to move a mass $m$ slowly from $A$ to $B$ is $W = m(V_B - V_A)$.\n\n**Worked example 1 (ring).** A ring of radius 3 m and mass $M$; point $P$ on the axis 4 m from the centre.\n\n1. Distance from $P$ to every bit of the ring: $\\sqrt{9 + 16} = 5$ m. So $V_P = -GM/5$.\n2. $|E_P| = \\dfrac{GM\\cdot 4}{5^3} = \\dfrac{4GM}{125}$, pointing towards the centre of the ring.\n3. Work to bring a unit mass from $P$ to the centre: $V_O - V_P = -\\frac{GM}{3} + \\frac{GM}{5} = -\\frac{2GM}{15}$. Negative: gravity does the work, and the agent must hold the mass back.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (centre of the Earth to the surface).** How much work is needed to lift 1 kg from the centre of a uniform Earth to its surface? Take $g = 10$ m/s², $R = 6400$ km.\n\n1. $V_{\\text{surface}} - V_{\\text{centre}} = -\\frac{GM}{R} + \\frac{3GM}{2R} = \\frac{GM}{2R}$.\n2. With $GM = gR^2$: $\\frac{gR}{2} = \\frac{10 \\times 6.4\\times10^6}{2} = 3.2\\times10^7$ J. *Why this step:* using $GM = gR^2$ avoids ever needing $G$ or $M$ separately.\n3. Compare: lifting the same kilogram from the surface to infinity costs $gR = 6.4\\times10^7$ J, only twice as much.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (field from potential).** In some region the potential is $V(x) = 3x^2 - 2x$ J/kg (with $x$ in m). Find the field at $x = 1$ m.\n\n1. $E_x = -\\dfrac{dV}{dx} = -(6x - 2)$.\n2. At $x = 1$: $E_x = -4$ N/kg, i.e. 4 N/kg in the $-x$ direction. *Why this step:* the field points \"downhill\" in potential, towards lower $V$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"where the field is zero, the potential is zero\"",
      content:
        "Inside a hollow shell $E = 0$ but $V = -GM/R$. At the centre of a ring $E = 0$ but $V = -GM/R$. Zero field only means the potential is **not changing** there (it is flat), just as a flat stretch of road can be high on a mountain. Conversely, far from everything $V \\to 0$, and at that same place $E \\to 0$ too, but for a different reason.",
    },
    {
      type: "quiz",
      id: "mrg5-3-q1",
      variant: "concept",
      question: "What are the gravitational field and potential at the centre of a uniform ring of mass $M$ and radius $R$?",
      options: [
        { text: "$E = 0$, $V = -\\dfrac{GM}{R}$", correct: true, feedback: "Opposite bits of the ring pull equally in opposite directions, but potentials are scalars and all add up." },
        { text: "$E = 0$, $V = 0$", feedback: "Zero field does not mean zero potential. Every bit of ring is a distance $R$ away and contributes $-Gdm/R$." },
        { text: "$E = \\dfrac{GM}{R^2}$, $V = -\\dfrac{GM}{R}$", feedback: "The pulls from opposite sides of the ring cancel at the centre." },
      ],
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
    },
    {
      type: "quiz",
      id: "mrg5-3-q4",
      variant: "practice",
      question: "A ring has radius 1 m. At what distance from its centre, along its axis, is the gravitational field strongest?",
      options: [
        { text: "At the centre", feedback: "At the centre the field is zero: the pulls cancel." },
        { text: "$1$ m", feedback: "Differentiate $\\frac{x}{(1 + x^2)^{3/2}}$: the maximum is at $1 + x^2 = 3x^2$." },
        { text: "$\\sqrt2$ m", feedback: "That comes from $x^2 = 2R^2$. The condition is $R^2 + x^2 = 3x^2$, so $x^2 = R^2/2$." },
        { text: "$\\frac{1}{\\sqrt2} \\approx 0.71$ m", correct: true, feedback: "$\\frac{d}{dx}\\frac{x}{(R^2+x^2)^{3/2}} = 0$ gives $x = R/\\sqrt2$." },
      ],
    },
    {
      type: "quiz",
      id: "mrg5-3-q5",
      variant: "practice",
      question: "The gravitational potential along the $x$-axis is $V = 3x^2 - 2x$ J/kg. What is the field at $x = 1$ m?",
      options: [
        { text: "$4$ N/kg in the $-x$ direction", correct: true, feedback: "$E_x = -dV/dx = -(6x - 2) = -4$ N/kg." },
        { text: "$4$ N/kg in the $+x$ direction", feedback: "You forgot the minus sign in $E = -dV/dx$. The field points towards lower potential." },
        { text: "$1$ N/kg", feedback: "That is $V(1)$, the potential, not the field." },
        { text: "$6$ N/kg in the $-x$ direction", feedback: "Differentiate the $-2x$ term too: $dV/dx = 6x - 2$." },
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
    {
      type: "text",
      content:
        "**Recovering $mgh$.** Raise $m$ from the surface ($r = R$) to height $h$:",
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
    {
      type: "text",
      content:
        "**Escape speed.** A body launched from the surface with speed $v$ escapes if it can reach infinity with $K \\ge 0$. There $U = 0$, so energy conservation demands $K + U \\ge 0$ at launch:",
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
    {
      type: "text",
      content:
        "Take $g = 10$ m/s², $R = 6400$ km.\n\n**Worked example 1 (lifting a satellite).** How much energy is needed to raise a 100 kg payload from the surface to a height $R$?\n\n1. $\\Delta U = \\dfrac{mgh}{1 + h/R}$ with $h = R$: $\\tfrac12 mgR = \\tfrac12 \\times 100 \\times 10 \\times 6.4\\times10^6 = 3.2\\times10^9$ J.\n2. The naive $mgh$ gives $6.4\\times10^9$ J, twice too much. *Why this step:* $g$ has dropped to a quarter by the top, so the average pull is much less than at the surface.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (not quite escaping, JEE Main).** A body is fired straight up at half the escape speed. How high does it go?\n\n1. Energy: $\\tfrac12 mv^2 - \\dfrac{GMm}{R} = -\\dfrac{GMm}{R + h}$.\n2. Divide by $m$ and use $GM = gR^2$: $\\tfrac12 v^2 = gR^2\\left(\\frac1R - \\frac{1}{R+h}\\right) = \\frac{gRh}{R+h}$.\n3. Solve for $h$: $h = \\dfrac{Rv^2}{2gR - v^2}$. *Why this step:* this general result is worth deriving once and remembering the method, not the formula.\n4. With $v = v_e/2$, $v^2 = \\frac{2gR}{4} = \\frac{gR}{2}$: $h = \\dfrac{R\\cdot gR/2}{2gR - gR/2} = \\dfrac R3 \\approx 2130$ km. The constant-$g$ answer $\\frac{v^2}{2g} = \\frac R4 = 1600$ km is too low.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (escape speed and density).** A planet has twice the Earth's radius and the same average density. What is its escape speed?\n\n1. $M = \\frac43\\pi R^3\\rho$, so $v_e = \\sqrt{\\frac{2G}{R}\\cdot\\frac43\\pi R^3\\rho} = R\\sqrt{\\frac{8\\pi G\\rho}{3}}$.\n2. Same $\\rho$, twice $R$: twice $v_e$, about 22.6 km/s. *Why this step:* with density fixed, mass goes as $R^3$, which beats the $1/R$ in $2GM/R$.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (three masses).** Three 1 kg masses sit at the corners of an equilateral triangle of side 1 m. How much work is needed to double the side?\n\n1. $U_1 = -\\dfrac{3G(1)(1)}{1} = -3G$; $U_2 = -\\dfrac{3G}{2}$.\n2. $W = U_2 - U_1 = \\dfrac{3G}{2} = 1.0\\times10^{-10}$ J.",
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
    {
      type: "quiz",
      id: "mrg5-4-q1",
      variant: "practice",
      question: "How much work is needed to lift a 10 kg body from the Earth's surface to a height equal to the Earth's radius? Take $g = 10$ m/s², $R = 6400$ km.",
      options: [
        { text: "$6.4\\times10^8$ J", feedback: "That is $mgh$ with surface $g$ all the way up. $g$ falls with height, so less work is needed." },
        { text: "$3.2\\times10^8$ J", correct: true, feedback: "$\\Delta U = \\frac{mgh}{1 + h/R} = \\tfrac12 mgR = 3.2\\times10^8$ J." },
        { text: "$1.6\\times10^8$ J", feedback: "That uses $g/4$ (the value at the top) throughout. The pull falls gradually, not all at once." },
      ],
    },
    {
      type: "quiz",
      id: "mrg5-4-q2",
      variant: "practice",
      question: "A planet has twice the Earth's radius and the same average density. If the Earth's escape speed is 11.2 km/s, what is the planet's?",
      options: [
        { text: "$15.8$ km/s", feedback: "That is $\\sqrt2 \\times 11.2$, which assumes the same surface $g$. Same density means $M$ is 8 times larger." },
        { text: "$7.9$ km/s", feedback: "That treats $M$ as fixed, giving $v_e \\propto 1/\\sqrt R$. With fixed density the mass grows as $R^3$." },
        { text: "$22.4$ km/s", correct: true, feedback: "$v_e = R\\sqrt{8\\pi G\\rho/3} \\propto R$ at fixed density." },
        { text: "$44.8$ km/s", feedback: "$v_e \\propto R$, not $R^2$, at fixed density." },
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
    {
      type: "text",
      content:
        "**Orbital speed.** For a circular orbit of radius $r$ around a mass $M$, gravity supplies exactly the centripetal force:",
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
    {
      type: "text",
      content:
        "Take $g = 10$ m/s², $R = 6400$ km, so $GM = gR^2 = 4.1\\times10^{14}$ m³/s².\n\n**Worked example 1 (skimming the surface).**\n\n1. $v_o = \\sqrt{gR} = \\sqrt{6.4\\times10^7} = 8000$ m/s.\n2. $T = \\frac{2\\pi R}{v_o} = \\frac{2\\pi\\times 6.4\\times10^6}{8000} \\approx 5030$ s $\\approx 84$ min.\n3. Escape speed from the same place: $\\sqrt{2gR} = \\sqrt2 \\times 8 \\approx 11.3$ km/s. *Why this step:* from $v_e^2 = 2GM/R$ and $v_o^2 = GM/R$, escape always needs exactly $\\sqrt2$ times the circular speed at the same radius.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (geostationary orbit).** A geostationary satellite orbits above the equator with a period of one day, eastwards, so it hovers over one spot. Find its radius.\n\n1. $r^3 = \\dfrac{GMT^2}{4\\pi^2} = \\dfrac{4.1\\times10^{14}\\times(86\\,400)^2}{39.5} \\approx 7.7\\times10^{22}$ m³.\n2. $r \\approx 4.26\\times10^7$ m $\\approx 42\\,600$ km $\\approx 6.6R$. Its height above the surface is about 36 000 km. *Why this step:* the period fixes $r$ completely, so every geostationary satellite shares one orbit.\n3. Faster route with ratios: $T \\propto r^{3/2}$ and the surface orbit takes 1.4 h, so $\\frac rR = \\left(\\frac{24}{1.4}\\right)^{2/3} \\approx 6.6$.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (energies of an orbit).** A 1000 kg satellite orbits at $r = 2R$.\n\n1. $K = \\frac{GMm}{2r} = \\frac{gR^2m}{4R} = \\frac{mgR}{4} = \\frac{1000\\times10\\times6.4\\times10^6}{4} = 1.6\\times10^{10}$ J.\n2. $U = -2K = -3.2\\times10^{10}$ J and $E = -K = -1.6\\times10^{10}$ J.\n3. Energy to move it out to $r = 4R$: $\\Delta E = \\frac{GMm}{2}\\left(\\frac{1}{2R} - \\frac{1}{4R}\\right) = \\frac{mgR}{8} = 8\\times10^9$ J. Its kinetic energy **falls** by the same $8\\times10^9$ J, and its potential energy rises by $1.6\\times10^{10}$ J.\n4. Energy to put it into the $2R$ orbit starting at rest on the surface (ignoring the Earth's spin): $E_{\\text{orbit}} - U_{\\text{surface}} = -\\frac{mgR}{4} + mgR = \\frac34 mgR = 4.8\\times10^{10}$ J.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (is there gravity on the space station?).** The ISS orbits about 400 km up.\n\n1. $\\frac{g_h}{g} = \\left(\\frac{6400}{6800}\\right)^2 \\approx 0.886$.\n2. So gravity there is still about 89% of its surface value. The astronauts float because they and the station are **falling together** with acceleration $g_h$, so the floor pushes on nobody. *Why this step:* apparent weight is the normal force, and in free fall it is zero whatever the local $g$.",
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
    },
    {
      type: "quiz",
      id: "mrg5-5-q2",
      variant: "practice",
      question: "A satellite close to the Earth's surface has a period of about 84 min. What is the period of a satellite in a circular orbit of radius $4R$?",
      options: [
        { text: "about 5.6 h", feedback: "That uses $T \\propto r$. Kepler's third law gives $r^{3/2}$." },
        { text: "about 22.4 h", feedback: "That uses $T \\propto r^2$. The exponent is $\\tfrac32$." },
        { text: "about 2.8 h", feedback: "That uses $T \\propto \\sqrt r$, which is the scaling of $1/v$ alone. The path is also 4 times longer." },
        { text: "about 11.2 h", correct: true, feedback: "$T \\propto r^{3/2}$: $4^{3/2} = 8$, and $8 \\times 84$ min $= 672$ min." },
      ],
    },
    {
      type: "quiz",
      id: "mrg5-5-q3",
      variant: "practice",
      question: "A satellite in a circular orbit has kinetic energy $5\\times10^9$ J. What are its total energy and potential energy?",
      options: [
        { text: "$E = 5\\times10^9$ J, $U = 0$", feedback: "A bound orbit has negative total energy, and $U$ is never zero at a finite distance." },
        { text: "$E = 0$, $U = -5\\times10^9$ J", feedback: "$E = 0$ is the escape condition, not a circular orbit." },
        { text: "$E = -5\\times10^9$ J, $U = -1\\times10^{10}$ J", correct: true, feedback: "$E = -K$ and $U = 2E = -2K$ for a circular orbit." },
        { text: "$E = -2.5\\times10^9$ J, $U = -7.5\\times10^9$ J", feedback: "Use $K = \\frac{GMm}{2r}$ and $U = -\\frac{GMm}{r}$: $U = -2K$." },
      ],
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
    },
    {
      type: "quiz",
      id: "mrg5-5-q6",
      variant: "practice",
      question: "The escape speed from a planet's surface is 11.2 km/s. What is the speed of a satellite in a circular orbit just above its surface?",
      options: [
        { text: "about 7.9 km/s", correct: true, feedback: "$v_o = v_e/\\sqrt2 = 11.2/1.414 \\approx 7.9$ km/s." },
        { text: "5.6 km/s", feedback: "That halves $v_e$. The ratio is $\\sqrt2$, from $v_e^2 = 2GM/R$ against $v_o^2 = GM/R$." },
        { text: "15.8 km/s", feedback: "Orbiting needs less speed than escaping, not more." },
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
    {
      type: "text",
      content:
        "**The second law is angular momentum conservation.** Gravity on a planet points straight at the Sun, so its torque about the Sun is $\\vec r\\times\\vec F = \\vec 0$. Such a **central force** conserves $\\vec L$ about the centre. Now in a short time $dt$ the radius line turns through $d\\theta$ and sweeps a thin triangle of area $dA = \\tfrac12 r\\cdot r\\,d\\theta$. So",
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
    {
      type: "text",
      content:
        "**The third law for circular orbits.** From Lesson 5.5, $T = 2\\pi\\sqrt{r^3/GM}$, i.e. $T^2 = \\frac{4\\pi^2}{GM}r^3$. The constant depends only on the central mass, so it is the same for every planet of the Sun. For ellipses the same formula holds with $r$ replaced by the semi-major axis $a$ (we quote this). In solar-system units (years and AU), $T^2 = a^3$ exactly for the Earth, so it holds for every planet in those units.",
    },
    {
      type: "text",
      content:
        "**Energy of an elliptical orbit.** Combine the two conservation laws at perihelion and aphelion (per unit mass): $v_pr_p = v_ar_a$ and $\\tfrac12 v_p^2 - \\frac{GM}{r_p} = \\tfrac12 v_a^2 - \\frac{GM}{r_a}$. Eliminating $v_a$ gives $v_p^2 = \\dfrac{2GMr_a}{r_p(r_p + r_a)}$, and then",
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
    {
      type: "text",
      content:
        "**Effective potential.** Split the kinetic energy into radial and sideways parts, $\\tfrac12 m\\dot r^2 + \\tfrac12 m(r\\omega)^2$, and write the sideways part with $L$: $\\frac{L^2}{2mr^2}$. Then",
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
      type: "text",
      content:
        "**Worked example 1 (law of periods).** An asteroid has semi-major axis 4 AU. Find its period.\n\n1. In years and AU, $T^2 = a^3$. *Why this step:* using the Earth ($a = 1$ AU, $T = 1$ y) as the reference removes $G$ and $M_\\odot$.\n2. $T = 4^{3/2} = 8$ years.\n3. Mars, at $a = 1.52$ AU: $T = 1.52^{1.5} \\approx 1.87$ years (measured: 1.88).",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (a comet, JEE Main).** A comet's closest distance from the Sun is 1 AU and its farthest is 7 AU.\n\n1. Speeds: $v_pr_p = v_ar_a$, so $v_p : v_a = 7 : 1$. *Why this step:* at the extreme points the velocity is perpendicular to $\\vec r$, so $L = mvr$ exactly.\n2. Semi-major axis: $a = \\frac{r_p + r_a}{2} = 4$ AU.\n3. Period: $4^{3/2} = 8$ years, the same as the asteroid on a nearly circular 4 AU orbit.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (a tangential boost, JEE Advanced).** A satellite in a circular orbit of radius $r$ fires its engine briefly, increasing its speed along its direction of motion from $v_o$ to $\\sqrt{1.5}\\,v_o$. Find its new farthest distance.\n\n1. The boost point becomes the perigee ($r_p = r$), since the velocity there is still perpendicular to the radius and the speed is now more than circular.\n2. Energy: $E = \\tfrac12 m(1.5)\\frac{GM}{r} - \\frac{GMm}{r} = -\\frac{GMm}{4r}$. *Why this step:* $v_o^2 = GM/r$ at radius $r$.\n3. $E = -\\frac{GMm}{2a}$ gives $a = 2r$, so $r_a = 2a - r_p = 3r$.\n4. Speed at apogee: $v_a = v_p\\frac{r_p}{r_a} = \\frac{\\sqrt{1.5}}{3}v_o \\approx 0.41\\,v_o$. A boost to $\\sqrt2\\,v_o$ would give $E = 0$ and escape.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a planet moves at constant speed along its orbit\"",
      content:
        "Only on a circular orbit. On an ellipse, $v_pr_p = v_ar_a$ means it moves fastest at perihelion and slowest at aphelion. The Earth is about 3% closer to the Sun in early January than in early July, and moves correspondingly faster then, which is one reason the northern winter is a few days shorter than the northern summer.",
    },
    {
      type: "quiz",
      id: "mrg5-6-q1",
      variant: "practice",
      question: "A planet orbits the Sun with semi-major axis 9 AU. What is its period?",
      options: [
        { text: "81 years", feedback: "That is $a^2$. Kepler's third law says $T^2 = a^3$." },
        { text: "27 years", correct: true, feedback: "$T = a^{3/2} = 9^{3/2} = 27$ years." },
        { text: "9 years", feedback: "$T$ is not proportional to $a$; it grows as $a^{3/2}$." },
        { text: "729 years", feedback: "That is $a^3$, which equals $T^2$. Take the square root." },
      ],
    },
    {
      type: "quiz",
      id: "mrg5-6-q2",
      variant: "practice",
      question: "A comet's perihelion distance is 2 AU and its aphelion distance is 6 AU. What is the ratio of its speed at perihelion to its speed at aphelion?",
      options: [
        { text: "$\\frac13$", feedback: "Inverted: the comet is fastest when closest." },
        { text: "$9$", feedback: "That is the ratio of $r^2$. Angular momentum gives $v \\propto 1/r$ at these two points." },
        { text: "$3$", correct: true, feedback: "$v_pr_p = v_ar_a$, so $v_p/v_a = r_a/r_p = 3$." },
        { text: "$\\sqrt3$", feedback: "That would come from $v \\propto 1/\\sqrt r$, the circular-orbit scaling. Here use conservation of $L$." },
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
    },
    {
      type: "quiz",
      id: "mrg5-7-q2",
      variant: "mastery",
      question: "The value of $g$ at a height of 32 km above the surface equals its value at what depth below the surface?",
      options: [
        { text: "$64$ km", correct: true, feedback: "$1 - \\frac{2h}{R} = 1 - \\frac dR$ gives $d = 2h$." },
        { text: "$32$ km", feedback: "Near the surface, height reduces $g$ twice as fast as depth." },
        { text: "$16$ km", feedback: "Reversed: depth is the slower way to lose $g$, so the depth must be larger." },
      ],
    },
    {
      type: "quiz",
      id: "mrg5-7-q3",
      variant: "mastery",
      question: "At what latitude is the reduction in effective $g$ caused by the Earth's rotation one quarter of its value at the equator?",
      options: [
        { text: "$75.5^\\circ$", feedback: "That solves $\\cos\\lambda = \\tfrac14$. The reduction goes as $\\cos^2\\lambda$." },
        { text: "$45^\\circ$", feedback: "At $45^\\circ$, $\\cos^2\\lambda = \\tfrac12$: half the equatorial reduction." },
        { text: "$30^\\circ$", feedback: "At $30^\\circ$, $\\cos^2\\lambda = \\tfrac34$." },
        { text: "$60^\\circ$", correct: true, feedback: "The reduction is $\\omega^2R\\cos^2\\lambda$; $\\cos^2\\lambda = \\tfrac14$ gives $\\lambda = 60^\\circ$." },
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
    },
    {
      type: "quiz",
      id: "mrg5-7-q9",
      variant: "mastery",
      question: "A planet orbits a star at 4 times the Earth's distance from the Sun; the star has the same mass as the Sun. How long is the planet's year?",
      options: [
        { text: "16 Earth years", feedback: "That uses $T \\propto a^2$." },
        { text: "4 Earth years", feedback: "That uses $T \\propto a$." },
        { text: "8 Earth years", correct: true, feedback: "$T \\propto a^{3/2}$: $4^{3/2} = 8$." },
        { text: "2 Earth years", feedback: "That uses $T \\propto \\sqrt a$." },
      ],
    },
    {
      type: "quiz",
      id: "mrg5-7-q10",
      variant: "mastery",
      question: "A comet moves at 60 km/s at perihelion, 0.5 AU from the Sun. Its aphelion is 5 AU from the Sun. How fast is it moving at aphelion?",
      options: [
        { text: "$6$ km/s", correct: true, feedback: "$v_a = v_p\\frac{r_p}{r_a} = 60 \\times \\frac{0.5}{5} = 6$ km/s." },
        { text: "$600$ km/s", feedback: "Inverted. The comet is slowest when farthest." },
        { text: "$19$ km/s", feedback: "That uses $v \\propto 1/\\sqrt r$, the circular-orbit rule. At the ends of an ellipse, angular momentum gives $v \\propto 1/r$." },
        { text: "$0.6$ km/s", feedback: "Check the ratio: $r_p/r_a = 0.1$." },
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
