import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Mechanics II Chapter 0 — Centre of Mass.
 * One point that moves as if the whole mass and every external force were
 * concentrated there: the two-body weighted average, particle systems,
 * continuous bodies by integration, composite bodies and cavities, and the
 * dynamical payoff M a_cm = F_ext (explosions, boats, wedges).
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "why-a-centre-of-mass",
  title: "0.1 · Why a Centre of Mass?",
  position: 1,
  blocks: blocks([
    {
      type: "text",
      content:
        "Slide a spanner across a smooth ice rink with a flick of the wrist. It spins and wobbles, the jaw end and the handle end chase each other round and round, and no single point on the handle seems to follow a simple path. Yet if you film it from above and mark one particular point, somewhere between the middle and the heavy jaw, that point glides in a perfectly straight line at a steady speed. Throw the same spanner through the air and that point traces a clean parabola, exactly like a small stone would.",
    },
    {
      type: "text",
      content:
        "That special point is the **centre of mass** (COM). This chapter finds where it is and proves why it behaves so simply. The whole of Mechanics II rests on it: once you know how the COM moves, a tumbling body becomes a single particle plus a spin about that particle.",
    },
    {
      type: "text",
      content:
        "**Start with two masses on a light rod.** Put $m_1$ at position $x_1$ and $m_2$ at $x_2$ on a light (massless) rod, and ask: where must you hold the rod so that it balances? Gravity pulls each mass down. The rod balances at the point $x_c$ where the turning effect of $m_1g$ on one side cancels that of $m_2g$ on the other, and each turning effect is weight times distance from the support (the seesaw rule you already know):",
    },
    { type: "math", latex: "m_1g\\,(x_c - x_1) = m_2g\\,(x_2 - x_c)" },
    {
      type: "text",
      content: "Cancel $g$ and solve for $x_c$:",
    },
    { type: "math", latex: "x_{cm} = \\frac{m_1x_1 + m_2x_2}{m_1 + m_2}" },
    {
      type: "text",
      content:
        "This is a **weighted average** of the two positions, each position weighted by its mass. With equal masses it is the ordinary average, the midpoint. Make $m_2$ bigger and the average is pulled towards $x_2$. In 0.5 we will see that this same formula is exactly the point that obeys $\\vec F = m\\vec a$ for the whole body, so the balance point and the \"point that moves simply\" are one and the same.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Centre of mass of two particles",
      content:
        "For masses $m_1$ at $x_1$ and $m_2$ at $x_2$: $x_{cm} = \\dfrac{m_1x_1 + m_2x_2}{m_1 + m_2}$.\nIt lies on the segment joining them, and its distances $r_1$, $r_2$ from $m_1$ and $m_2$ are in the **inverse** ratio of the masses: $r_1 : r_2 = m_2 : m_1$, so $m_1r_1 = m_2r_2$.",
    },
    {
      type: "text",
      content:
        "**Why the inverse ratio.** Put the origin at $m_1$ and let the separation be $d$, so $x_1 = 0$ and $x_2 = d$. Then",
    },
    {
      type: "math",
      latex: "r_1 = x_{cm} = \\frac{m_2 d}{m_1 + m_2}, \\qquad r_2 = d - r_1 = \\frac{m_1 d}{m_1 + m_2}, \\qquad \\frac{r_1}{r_2} = \\frac{m_2}{m_1}",
    },
    {
      type: "text",
      content:
        "The heavier mass is *nearer* the centre of mass. That is the seesaw again: a heavy child sits close to the pivot to balance a light child far out.",
    },
    {
      type: "text",
      content:
        "The canvas below uses the section-formula picture from Vector Algebra. $A$ and $B$ are the two particles. The slider $n$ is the mass at $A$ and the slider $m$ is the mass at $B$; the point $P$ is their centre of mass, and it divides $AB$ in the ratio $AP : PB = m : n = m_B : m_A$.",
    },
    {
      type: "interactive",
      config: {
        component: "vec-canvas-2d",
        mode: "section",
        a: [-4, 0],
        b: [4, 0],
        window: { xmin: -6, xmax: 6, ymin: -3, ymax: 3 },
        ratio: {
          m: { min: 1, max: 5, step: 1, initial: 1 },
          n: { min: 1, max: 5, step: 1, initial: 3 },
          allowExternal: false,
        },
        labels: { a: "A", b: "B" },
        readouts: ["ratio"],
        caption:
          "n is the mass at A, m is the mass at B. Start with 3 kg at A and 1 kg at B, then make the masses equal, then put the heavy one at B. P always sits nearer the heavier particle.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: with 3 kg at $A$ and 1 kg at $B$, $P$ sits at $x = -2$, a quarter of the way from $A$ ($AP : PB = 1 : 3$). Equal masses put $P$ at the midpoint. Swap the masses and $P$ jumps to the mirror position near $B$. The ratio of the *distances* is always the ratio of the *masses* upside down.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (the Earth–Moon barycentre).** The Earth is 81 times as massive as the Moon and their centres are $3.84\\times10^5$ km apart. Where is their centre of mass?\n\n1. Put the origin at the Earth's centre and the Moon at $d = 3.84\\times10^5$ km. *Why this step:* placing the origin on one mass kills its term in the numerator.\n2. With $M_E = 81m$ and $M_m = m$: $r_E = \\dfrac{m\\,d}{81m + m} = \\dfrac{d}{82}$.\n3. $r_E = \\dfrac{3.84\\times10^5}{82} \\approx 4.68\\times10^3$ km, about 4700 km from the Earth's centre.\n4. The Earth's radius is 6400 km, so the barycentre is *inside* the Earth, about 1700 km below the surface. *Why this step:* comparing with a known length is how you check a number makes sense. The Earth and Moon both circle this point once a month, which is why the Earth wobbles slightly.\n\n**Worked example 2 (a dumbbell).** A 2 kg mass and a 3 kg mass sit at the ends of a light rod 1 m long. Find the centre of mass.\n\n1. Origin at the 2 kg mass, positive direction towards the 3 kg mass.\n2. $x_{cm} = \\dfrac{2(0) + 3(1)}{2 + 3} = 0.6$ m from the 2 kg mass.\n3. So it is 0.4 m from the 3 kg mass. Check the inverse ratio: $0.6 : 0.4 = 3 : 2 = m_2 : m_1$. ✓",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (the origin does not matter).** A 4 kg particle sits at $x = -2$ m and a 1 kg particle at $x = 3$ m.\n\n1. $x_{cm} = \\dfrac{4(-2) + 1(3)}{4 + 1} = \\dfrac{-5}{5} = -1$ m.\n2. Redo it with the origin at the 4 kg particle: the 1 kg particle is now at $+5$ m, and $x_{cm} = \\dfrac{0 + 1(5)}{5} = 1$ m from the 4 kg particle, which is $-2 + 1 = -1$ m in the old coordinates. ✓ *Why this step:* the COM is a physical point; moving the origin changes its coordinate but never its place among the masses.\n\n**Worked example 4 (keeping the COM fixed, NCERT/JEE Main).** Particles of 1 kg and 3 kg are 8 cm apart. (a) How far is the COM from the 1 kg particle? (b) The 1 kg particle is moved 3 cm towards the COM. How must the 3 kg particle move so the COM stays put?\n\n1. (a) $r_1 = \\dfrac{3 \\times 8}{1 + 3} = 6$ cm.\n2. (b) Take $+x$ from the 1 kg particle towards the 3 kg particle. If the COM does not move, $\\Delta x_{cm} = \\dfrac{m_1\\Delta x_1 + m_2\\Delta x_2}{m_1 + m_2} = 0$. *Why this step:* the COM formula is linear, so it applies to changes in position just as well as to positions.\n3. $1(+3) + 3\\,\\Delta x_2 = 0 \\Rightarrow \\Delta x_2 = -1$ cm.\n4. The minus sign means the 3 kg particle moves 1 cm in the $-x$ direction, that is, 1 cm *towards* the COM. Both close in on it, the heavy one by less.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Centre of mass and centre of gravity",
      content:
        "The balance point is really the *centre of gravity*, the point where the total weight effectively acts. In a uniform field ($g$ the same everywhere on the body) it coincides with the centre of mass, which is the case in every JEE problem except those about very tall bodies in the Earth's non-uniform field. We use the two interchangeably.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the COM is closer to the lighter mass\"",
      content:
        "Students sometimes weight the wrong way round and put the COM of 1 kg and 3 kg a quarter of the way from the 3 kg mass. It is the other way: the COM is **nearer the heavier mass**, because $m_1r_1 = m_2r_2$ makes the big mass's lever arm small. Always sanity-check with the extreme case: if one mass were enormous, the COM would sit on top of it.",
    },
    {
      type: "quiz",
      id: "mrg0-1-q1",
      variant: "practice",
      question: "A 2 kg particle is at $x = 0$ and a 6 kg particle at $x = 4$ m. Where is the centre of mass?",
      options: [
        { text: "$x = 1$ m", feedback: "That puts the COM nearer the 2 kg particle. You have used the inverse ratio the wrong way round: $r_{2\\text{ kg}} = \\frac{6 \\times 4}{8}$." },
        { text: "$x = 3$ m", correct: true, feedback: "$\\frac{2(0) + 6(4)}{8} = 3$ m, three times as far from the light particle as from the heavy one." },
        { text: "$x = 2$ m", feedback: "That is the midpoint, which is only right for equal masses." },
        { text: "$x = 24$ m", feedback: "You forgot to divide by the total mass, 8 kg. The COM must lie between the two particles." },
      ],
    },
    {
      type: "quiz",
      id: "mrg0-1-q2",
      variant: "concept",
      question: "Particles of 1 kg and 4 kg are joined by a light rod. What is the ratio (distance of COM from the 1 kg) : (distance of COM from the 4 kg)?",
      options: [
        { text: "$1 : 4$", feedback: "That would put the COM nearer the light particle. The heavier mass gets the shorter lever arm." },
        { text: "$1 : 1$", feedback: "Equal distances need equal masses." },
        { text: "$4 : 1$", correct: true, feedback: "$m_1r_1 = m_2r_2$ gives $r_1 : r_2 = m_2 : m_1 = 4 : 1$." },
        { text: "$1 : 16$", feedback: "Masses enter linearly, not squared. The ratio is simply $m_2 : m_1$." },
      ],
    },
    {
      type: "quiz",
      id: "mrg0-1-q3",
      variant: "practice",
      question: "Two stars of masses $3M$ and $M$ are a distance $d$ apart. How far is their centre of mass from the heavier star?",
      options: [
        { text: "$\\dfrac{d}{4}$", correct: true, feedback: "$r = \\frac{M d}{3M + M} = \\frac d4$. Both stars orbit this point." },
        { text: "$\\dfrac{3d}{4}$", feedback: "That is the distance from the *lighter* star." },
        { text: "$\\dfrac{d}{3}$", feedback: "Divide by the total mass $4M$, not by $3M$." },
        { text: "$\\dfrac{d}{2}$", feedback: "The midpoint is only for equal masses." },
      ],
    },
    {
      type: "quiz",
      id: "mrg0-1-q4",
      variant: "practice",
      question: "Particles of 2 kg and 5 kg lie on a line. The 2 kg particle is moved 5 cm towards their centre of mass. How must the 5 kg particle move to keep the centre of mass where it was?",
      options: [
        { text: "2 cm away from the centre of mass", feedback: "If it moved away, both changes would push the COM the same way. They must cancel: $m_1\\Delta x_1 + m_2\\Delta x_2 = 0$." },
        { text: "5 cm towards the centre of mass", feedback: "Equal displacements only keep the COM fixed for equal masses. The heavier particle moves less." },
        { text: "12.5 cm towards the centre of mass", feedback: "You inverted the mass ratio: $\\Delta x_2 = \\frac{m_1}{m_2}\\Delta x_1 = \\frac25 \\times 5$ cm." },
        { text: "2 cm towards the centre of mass", correct: true, feedback: "$2(5) + 5\\,\\Delta x = 0$ with the signs chosen towards the COM, so the 5 kg particle must also close in, by $\\frac{10}{5} = 2$ cm." },
      ],
      hint: "Use $m_1\\Delta x_1 + m_2\\Delta x_2 = 0$ along the line.",
    },
    {
      type: "quiz",
      id: "mrg0-1-q5",
      variant: "concept",
      question: "You compute the COM of two particles with the origin at one particle, then again with the origin 10 m away. What changes?",
      options: [
        { text: "Nothing at all, not even the coordinate.", feedback: "The coordinate of any point depends on where the origin is. Only its position relative to the masses is fixed." },
        { text: "The COM moves to a different point between the masses.", feedback: "The weighted average is origin-independent as a point: $\\frac{m_1(x_1 + s) + m_2(x_2 + s)}{m_1 + m_2} = x_{cm} + s$." },
        { text: "The coordinate $x_{cm}$ changes, but the COM is the same physical point.", correct: true, feedback: "Shifting the origin by $s$ shifts every coordinate, including $x_{cm}$, by $s$. The point among the masses stays put." },
      ],
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "com-of-particle-systems",
  title: "0.2 · Centre of Mass of a System of Particles",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "Real bodies are made of many particles, not two, and they live in the plane or in space, not on a line. We need the weighted average of many *position vectors*. The nice thing is that we do not need a new idea, only the two-particle formula used over and over.",
    },
    {
      type: "text",
      content:
        "**Grouping builds the general formula.** Take three particles. First replace $m_1$ and $m_2$ by a single particle of mass $m_1 + m_2$ at their COM, $\\vec r_{12} = \\frac{m_1\\vec r_1 + m_2\\vec r_2}{m_1 + m_2}$. Then find the COM of that particle and $m_3$:",
    },
    {
      type: "math",
      latex: "\\vec r_{cm} = \\frac{(m_1 + m_2)\\vec r_{12} + m_3\\vec r_3}{m_1 + m_2 + m_3} = \\frac{m_1\\vec r_1 + m_2\\vec r_2 + m_3\\vec r_3}{m_1 + m_2 + m_3}",
    },
    {
      type: "text",
      content:
        "The bracket $(m_1 + m_2)\\vec r_{12}$ is just $m_1\\vec r_1 + m_2\\vec r_2$, so the grouping disappears and each particle appears once, weighted by its mass. Repeating the step for $n$ particles gives the general definition.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Centre of mass of a system of particles",
      content:
        "For masses $m_i$ at position vectors $\\vec r_i$, with total mass $M = \\sum m_i$:\n$\\vec r_{cm} = \\dfrac{\\sum m_i\\vec r_i}{M}$, that is, $x_{cm} = \\dfrac{\\sum m_ix_i}{M}$, $y_{cm} = \\dfrac{\\sum m_iy_i}{M}$, $z_{cm} = \\dfrac{\\sum m_iz_i}{M}$.\nEach coordinate is computed on its own.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Grouping works both ways",
      content:
        "Any sub-system can be replaced by its total mass placed at its own COM, and the answer for the whole is unchanged. This is the single most useful trick in the chapter: a table with four legs and a lamp on it is \"table at its COM\" plus \"lamp at its COM\".",
    },
    {
      type: "text",
      content:
        "**Three equal masses.** With $m_1 = m_2 = m_3 = m$ the formula becomes $\\vec r_{cm} = \\frac{\\vec r_1 + \\vec r_2 + \\vec r_3}{3}$, the centroid of the triangle. Drag the vertices below: the point $G$ is where three equal masses would balance, and it always divides each median $2 : 1$ from the vertex.",
    },
    {
      type: "interactive",
      config: {
        component: "vec-canvas-2d",
        mode: "triangle",
        a: [-3, -2],
        b: [3, -2],
        c: [0, 3],
        caption:
          "Equal masses at A, B and C. G is their centre of mass, the average of the three position vectors. Drag C far to one side: G follows, but only a third as far.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: $G$ starts at $(0, -\\tfrac13)$, the average of $(-3,-2)$, $(3,-2)$ and $(0,3)$. Moving one vertex by some displacement moves $G$ by a third of it, because that vertex carries a third of the total mass.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (masses on a square).** Masses of 1, 2, 3 and 4 kg sit at the corners $(0,0)$, $(1,0)$, $(1,1)$ and $(0,1)$ of a square of side 1 m. Find the COM.\n\n1. Total mass $M = 10$ kg.\n2. $x_{cm} = \\dfrac{1(0) + 2(1) + 3(1) + 4(0)}{10} = \\dfrac{5}{10} = 0.5$ m. *Why this step:* each coordinate is a separate weighted average; do not mix $x$ and $y$.\n3. $y_{cm} = \\dfrac{1(0) + 2(0) + 3(1) + 4(1)}{10} = \\dfrac{7}{10} = 0.7$ m.\n4. COM $= (0.5, 0.7)$ m. Sanity check: the top edge carries $3 + 4 = 7$ kg against 3 kg on the bottom, so the COM should be above the middle, and it is. The left and right edges carry 5 kg each, so $x_{cm}$ is exactly central.\n\n**Worked example 2 (grouping).** 2 kg at $(0,0)$, 2 kg at $(2,0)$ and 4 kg at $(1,3)$, in metres.\n\n1. The two 2 kg masses group into 4 kg at their midpoint $(1,0)$. *Why this step:* equal masses group at the midpoint with no arithmetic.\n2. Now 4 kg at $(1,0)$ and 4 kg at $(1,3)$: again equal, so the COM is the midpoint, $(1, 1.5)$ m.\n3. Check directly: $x_{cm} = \\frac{0 + 4 + 4}{8} = 1$, $y_{cm} = \\frac{0 + 0 + 12}{8} = 1.5$. ✓",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (the water molecule, NCERT).** In $\\text{H}_2\\text{O}$ each O–H bond is 0.96 Å long and the angle between the bonds is $104.5^\\circ$. Taking the masses as 16 u for oxygen and 1 u for each hydrogen, locate the COM.\n\n1. Put O at the origin with the $x$-axis along the bisector of the H–O–H angle. *Why this step:* the molecule is symmetric about the bisector, so the COM must lie on it and $y_{cm} = 0$ with no calculation.\n2. Each H is at angle $52.25^\\circ$ from the axis, so its $x$-coordinate is $0.96\\cos 52.25^\\circ \\approx 0.96 \\times 0.612 = 0.588$ Å.\n3. $x_{cm} = \\dfrac{16(0) + 1(0.588) + 1(0.588)}{18} \\approx \\dfrac{1.176}{18} \\approx 0.065$ Å.\n4. The COM sits 0.065 Å from the O nucleus along the bisector, deep inside the oxygen atom, because oxygen carries $\\frac{16}{18}$ of the mass. The two $y$-coordinates $\\pm 0.96\\sin 52.25^\\circ$ cancel, as step 1 promised.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (unequal masses on a triangle, JEE Main).** Masses $m$, $2m$ and $3m$ sit at the vertices of an equilateral triangle of side $a$. Find the COM relative to the vertex holding $m$.\n\n1. Place $m$ at $(0,0)$, $2m$ at $(a, 0)$ and $3m$ at $\\left(\\frac a2, \\frac{\\sqrt3 a}{2}\\right)$. *Why this step:* putting the lightest mass at the origin and one side on the $x$-axis zeroes as many terms as possible.\n2. $x_{cm} = \\dfrac{0 + 2m(a) + 3m\\left(\\frac a2\\right)}{6m} = \\dfrac{3.5a}{6} = \\dfrac{7a}{12}$.\n3. $y_{cm} = \\dfrac{0 + 0 + 3m\\left(\\frac{\\sqrt3a}{2}\\right)}{6m} = \\dfrac{\\sqrt3a}{4}$.\n4. COM $= \\left(\\frac{7a}{12}, \\frac{\\sqrt3 a}{4}\\right)$. Compare the centroid $\\left(\\frac a2, \\frac{\\sqrt3a}{6}\\right)$: the COM has moved right and up, towards the $2m$ and $3m$ corners, as it should.\n\n**Worked example 5 (a bent wire).** Two identical uniform rods, each of length $L$ and mass $M$, are joined at one end to form an L. Find the COM.\n\n1. Replace each rod by its mass at its midpoint: $(\\frac L2, 0)$ and $(0, \\frac L2)$ with the corner at the origin. *Why this step:* a uniform rod's COM is its midpoint (0.3 proves it), and grouping lets us treat each rod as one particle.\n2. Equal masses, so the COM is the midpoint: $\\left(\\frac L4, \\frac L4\\right)$.\n3. That point lies in the empty space inside the corner of the L, not on either rod.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the COM must lie inside the material\"",
      content:
        "The COM is a weighted average of positions, and an average can land where there is no material. The COM of a ring is its centre, the COM of an L-shaped wire is in the gap inside the corner, and a boomerang's COM lies in the air between its arms. That is why a boomerang seems to rotate about an empty point as it flies.",
    },
    {
      type: "quiz",
      id: "mrg0-2-q1",
      variant: "practice",
      question: "Masses of 1 kg, 1 kg and 2 kg sit at $(0,0)$, $(2,0)$ and $(0,2)$ (metres). Find the centre of mass.",
      options: [
        { text: "$\\left(\\frac23, \\frac23\\right)$", feedback: "That is the centroid, which assumes equal masses. The 2 kg mass pulls the COM towards $(0,2)$." },
        { text: "$(0.5, 1)$", correct: true, feedback: "$x_{cm} = \\frac{0 + 2 + 0}{4} = 0.5$ and $y_{cm} = \\frac{0 + 0 + 4}{4} = 1$." },
        { text: "$(1, 0.5)$", feedback: "You have swapped the coordinates. The heavy mass is on the $y$-axis, so $y_{cm}$ is the larger one." },
        { text: "$(0.5, 0.5)$", feedback: "Weight each $y$-coordinate by its mass: $2 \\times 2 = 4$, and $4 / 4 = 1$." },
      ],
    },
    {
      type: "quiz",
      id: "mrg0-2-q2",
      variant: "practice",
      question: "A system of total mass 3 kg has its COM at $(1, 2)$ m. A 1 kg particle is added at $(5, 6)$ m. Where is the new COM?",
      options: [
        { text: "$(3, 4)$", feedback: "That is the midpoint, treating the 3 kg system and the 1 kg particle as equal." },
        { text: "$(1.5, 2.5)$", feedback: "Recompute: $\\frac{3(1) + 1(5)}{4} = 2$, not $1.5$." },
        { text: "$(4, 5)$", feedback: "That puts the COM nearer the 1 kg particle. The 3 kg system should have the bigger pull." },
        { text: "$(2, 3)$", correct: true, feedback: "Group the system as 3 kg at $(1,2)$: $x = \\frac{3 + 5}{4} = 2$, $y = \\frac{6 + 6}{4} = 3$." },
      ],
    },
    {
      type: "quiz",
      id: "mrg0-2-q3",
      variant: "concept",
      question: "Where is the centre of mass of a thin uniform ring?",
      options: [
        { text: "At its centre, where there is no material.", correct: true, feedback: "Each bit of the ring is balanced by the bit diametrically opposite, so the average position is the centre." },
        { text: "Somewhere on the ring itself, since the mass is all there.", feedback: "The COM is an average position. The average of points spread round a circle is its centre." },
        { text: "Undefined, since there is no mass at the centre.", feedback: "The COM never needs mass at its own location. It is a weighted average, not a lump of material." },
      ],
    },
    {
      type: "quiz",
      id: "mrg0-2-q4",
      variant: "practice",
      question: "Masses $m$, $2m$ and $3m$ are placed at the vertices of an equilateral triangle of side $a$, with $m$ at the origin and $2m$ at $(a, 0)$. Find the COM.",
      options: [
        { text: "$\\left(\\frac a2, \\frac{\\sqrt3 a}{6}\\right)$", feedback: "That is the centroid, correct only if all three masses were equal." },
        { text: "$\\left(\\frac{7a}{12}, \\frac{\\sqrt3 a}{4}\\right)$", correct: true, feedback: "$x = \\frac{2a + 1.5a}{6} = \\frac{7a}{12}$ and $y = \\frac{3 \\cdot \\frac{\\sqrt3a}{2}}{6} = \\frac{\\sqrt3a}{4}$." },
        { text: "$\\left(\\frac{7a}{6}, \\frac{\\sqrt3 a}{2}\\right)$", feedback: "You divided by $3m$ (the number of particles times $m$) instead of the total mass $6m$." },
        { text: "$\\left(\\frac{5a}{12}, \\frac{\\sqrt3 a}{4}\\right)$", feedback: "The $x$-coordinate should lean towards the $2m$ and $3m$ corners, so it exceeds $\\frac a2$: $\\frac{2a + 1.5a}{6} = \\frac{7a}{12}$." },
      ],
      hint: "The third vertex is at $\\left(\\frac a2, \\frac{\\sqrt3a}{2}\\right)$.",
    },
    {
      type: "quiz",
      id: "mrg0-2-q5",
      variant: "practice",
      question: "1 kg at $(1,0,0)$, 2 kg at $(0,1,0)$ and 3 kg at $(0,0,1)$ (metres). Find the COM.",
      options: [
        { text: "$\\left(\\frac13, \\frac13, \\frac13\\right)$", feedback: "That is the plain average. Weight each coordinate by its mass and divide by 6." },
        { text: "$(1, 2, 3)$", feedback: "Those are the weighted sums. Divide by the total mass, 6 kg." },
        { text: "$\\left(\\frac16, \\frac13, \\frac12\\right)$", correct: true, feedback: "$x = \\frac16$, $y = \\frac26$, $z = \\frac36$." },
        { text: "$\\left(\\frac12, \\frac13, \\frac16\\right)$", feedback: "Reversed: the 3 kg mass is on the $z$-axis, so $z_{cm}$ is the largest." },
      ],
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "com-of-continuous-bodies",
  title: "0.3 · Continuous Bodies: Integration",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "A metre rule, a steel plate or a cricket ball is not a handful of particles. Its mass is smeared continuously through its volume. The recipe does not change, though: chop the body into tiny pieces, treat each piece as a particle, and add up. In the limit of infinitely many tiny pieces, the sum becomes an integral.",
    },
    {
      type: "math",
      latex: "x_{cm} = \\frac{\\sum m_ix_i}{\\sum m_i} \\;\\longrightarrow\\; x_{cm} = \\frac{\\int x\\,dm}{\\int dm} = \\frac{1}{M}\\int x\\,dm",
    },
    {
      type: "text",
      content:
        "The only work is writing $dm$ in terms of a coordinate you can integrate over. That needs a density:",
    },
    {
      type: "table",
      headers: ["Body", "Density", "Mass element"],
      rows: [
        ["rod or wire (1D)", "linear, $\\lambda$ (kg/m)", "$dm = \\lambda\\,dx$ or $\\lambda R\\,d\\theta$ on an arc"],
        ["plate or lamina (2D)", "surface, $\\sigma$ (kg/m²)", "$dm = \\sigma\\,dA$"],
        ["solid (3D)", "volume, $\\rho$ (kg/m³)", "$dm = \\rho\\,dV$"],
      ],
    },
    {
      type: "callout",
      variant: "definition",
      title: "Centre of mass of a continuous body",
      content:
        "$\\vec r_{cm} = \\dfrac{1}{M}\\displaystyle\\int \\vec r\\,dm$, with $M = \\displaystyle\\int dm$. Component by component: $x_{cm} = \\frac1M\\int x\\,dm$, and similarly for $y$ and $z$. Symmetry comes first: if the body is symmetric about a line or plane, the COM lies on it.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Strategy: choose the element cleverly",
      content:
        "Pick an element whose every point is the same distance along the axis you care about, or whose own COM you already know. For a rod: short slices $dx$. For a semicircular ring: small arcs $R\\,d\\theta$. For a semicircular disc: thin semicircular rings. For a cone or hemisphere: thin discs stacked along the axis. Then the integral is one-dimensional.",
    },
    {
      type: "text",
      content:
        "**Derivation 1 (uniform rod).** Length $L$ along the $x$-axis from $0$ to $L$, constant $\\lambda = M/L$:",
    },
    { type: "math", latex: "x_{cm} = \\frac{\\int_0^L x\\,\\lambda\\,dx}{\\int_0^L \\lambda\\,dx} = \\frac{\\lambda L^2/2}{\\lambda L} = \\frac L2" },
    {
      type: "text",
      content:
        "The middle, as symmetry promised. The formula earns its keep when the density is *not* uniform.\n\n**Derivation 2 (a rod getting heavier along its length, $\\lambda = kx$).**",
    },
    { type: "math", latex: "x_{cm} = \\frac{\\int_0^L x(kx)\\,dx}{\\int_0^L kx\\,dx} = \\frac{kL^3/3}{kL^2/2} = \\frac{2L}{3}" },
    {
      type: "text",
      content:
        "The COM moves towards the heavy end. The playground below does the general case $\\lambda \\propto x^n$, scaled so that the total mass is the same for every $n$ (rod length 1 m). The flat reference line is a uniform rod; raise $n$ and the mass piles up at the far end. Guess where the balance point goes before reading on.",
    },
    {
      type: "interactive",
      config: {
        component: "transform-playground",
        baseExpr: "1",
        baseLatex: "\\lambda_0",
        expr: "(n+1)*x^n",
        exprLatex: "\\lambda = (n+1)\\lambda_0 x^n",
        params: [{ name: "n", min: 0, max: 4, step: 1, initial: 1 }],
        window: { xmin: 0, xmax: 1, ymin: 0, ymax: 5 },
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: at $n = 0$ the density is flat and the COM is at $\\frac12$. At $n = 1$ the density is a ramp and the COM is at $\\frac23$. In general $x_{cm} = \\dfrac{\\int_0^1 x\\cdot x^n\\,dx}{\\int_0^1 x^n\\,dx} = \\dfrac{1/(n+2)}{1/(n+1)} = \\dfrac{n+1}{n+2}L$: $\\frac34$ at $n = 2$, $\\frac45$ at $n = 3$, creeping towards the heavy end but never reaching it.",
    },
    {
      type: "text",
      content:
        "**Derivation 3 (semicircular ring, radius $R$).** Put the centre at the origin with the ring above the $x$-axis. By symmetry $x_{cm} = 0$. A small arc at angle $\\theta$ has length $R\\,d\\theta$, mass $dm = \\lambda R\\,d\\theta$ and height $y = R\\sin\\theta$:",
    },
    {
      type: "math",
      latex: "y_{cm} = \\frac{\\int_0^\\pi R\\sin\\theta\\,\\lambda R\\,d\\theta}{\\lambda\\pi R} = \\frac{\\lambda R^2\\,[-\\cos\\theta]_0^\\pi}{\\lambda\\pi R} = \\frac{2\\lambda R^2}{\\lambda\\pi R} = \\frac{2R}{\\pi}",
    },
    {
      type: "text",
      content:
        "**Derivation 4 (semicircular disc).** Slice the disc into thin semicircular rings of radius $r$ and width $dr$. Each is a semicircular ring, so by Derivation 3 its COM is at height $\\frac{2r}{\\pi}$, and its mass is $dm = \\sigma\\,(\\pi r)\\,dr$. *Why this element:* we reuse a result instead of doing a double integral.",
    },
    {
      type: "math",
      latex: "y_{cm} = \\frac{\\int_0^R \\frac{2r}{\\pi}\\,\\sigma\\pi r\\,dr}{\\sigma\\pi R^2/2} = \\frac{2\\sigma R^3/3}{\\sigma\\pi R^2/2} = \\frac{4R}{3\\pi}",
    },
    {
      type: "text",
      content:
        "**Derivation 5 (solid hemisphere).** Stack thin discs parallel to the flat face. The disc at height $y$ has radius $\\sqrt{R^2 - y^2}$, so $dm = \\rho\\pi(R^2 - y^2)\\,dy$:",
    },
    {
      type: "math",
      latex: "y_{cm} = \\frac{\\int_0^R y(R^2 - y^2)\\,dy}{\\int_0^R (R^2 - y^2)\\,dy} = \\frac{R^4/2 - R^4/4}{R^3 - R^3/3} = \\frac{R^4/4}{2R^3/3} = \\frac{3R}{8}",
    },
    {
      type: "text",
      content:
        "**Derivation 6 (solid cone, height $h$).** Measure $y$ down from the apex. The disc at depth $y$ has radius $\\frac{R}{h}y$, so $dm \\propto y^2\\,dy$ and $y_{cm} = \\frac{\\int_0^h y^3\\,dy}{\\int_0^h y^2\\,dy} = \\frac{h^4/4}{h^3/3} = \\frac{3h}{4}$ from the apex, that is, $\\frac h4$ above the base.\n\n**Two quick ones.** A *hollow* hemisphere (a thin bowl) is cut into rings by equally spaced planes; a sphere's surface has the lovely property (Archimedes) that equal slabs cut equal areas, so the mass is uniform in height and $y_{cm} = \\frac R2$. A uniform triangular plate is sliced into strips parallel to one side; each strip's midpoint lies on the median, so the COM is on every median: the centroid, $\\frac13$ of each height above the corresponding base.",
    },
    {
      type: "table",
      headers: ["Uniform body", "Centre of mass", "Measured from"],
      rows: [
        ["rod of length $L$", "$L/2$", "either end"],
        ["rod with $\\lambda = kx$", "$2L/3$", "the light end ($x = 0$)"],
        ["semicircular ring (wire)", "$2R/\\pi \\approx 0.64R$", "the centre, along the symmetry axis"],
        ["semicircular disc", "$4R/3\\pi \\approx 0.42R$", "the centre, along the symmetry axis"],
        ["hollow hemisphere (shell)", "$R/2$", "the centre of the rim"],
        ["solid hemisphere", "$3R/8$", "the centre of the flat face"],
        ["solid cone of height $h$", "$h/4$", "the base (so $3h/4$ from the apex)"],
        ["triangular plate", "centroid, $h/3$", "any base, along its height"],
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 1 (a non-uniform rod, JEE Main).** A rod of length $L$ has linear density $\\lambda = \\lambda_0\\left(1 + \\frac xL\\right)$, where $x$ is measured from one end. Find its COM.\n\n1. Mass: $M = \\int_0^L \\lambda_0\\left(1 + \\frac xL\\right)dx = \\lambda_0\\left(L + \\frac L2\\right) = \\frac{3\\lambda_0 L}{2}$. *Why this step:* the denominator is the total mass, which is not $\\lambda_0L$ once the density varies.\n2. Moment: $\\int_0^L x\\,\\lambda_0\\left(1 + \\frac xL\\right)dx = \\lambda_0\\left(\\frac{L^2}{2} + \\frac{L^2}{3}\\right) = \\frac{5\\lambda_0L^2}{6}$.\n3. $x_{cm} = \\dfrac{5\\lambda_0L^2/6}{3\\lambda_0L/2} = \\dfrac{5L}{9}$.\n4. Check: the density doubles from one end to the other, so the COM should be a little past the middle ($\\frac{5}{9} \\approx 0.56$), but short of the $\\frac23$ for $\\lambda \\propto x$, which starts from zero. ✓\n\n**Worked example 2 (numbers with $\\pi = 22/7$).** A thin wire of radius $R = 11$ cm is bent into a semicircle, and a uniform semicircular plate of the same radius is cut from sheet metal.\n\n1. Wire: $\\frac{2R}{\\pi} = \\frac{2 \\times 11 \\times 7}{22} = 7$ cm from the centre.\n2. Plate: $\\frac{4R}{3\\pi} = \\frac{4 \\times 11 \\times 7}{3 \\times 22} = \\frac{14}{3} \\approx 4.67$ cm from the centre.\n3. The wire's COM is further out, because all of its mass is at distance $R$ while the plate has mass right down to the centre. *Why this step:* this comparison is exactly the misconception below, settled with numbers.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (a solid hemisphere and a cone).** A solid hemisphere of radius 8 cm and a solid cone of height 12 cm stand on their flat faces.\n\n1. Hemisphere: $\\frac{3R}{8} = \\frac{3 \\times 8}{8} = 3$ cm above the table.\n2. Cone: $\\frac h4 = 3$ cm above the table as well, even though it is 12 cm tall. *Why this step:* most of a cone's volume is near its base, so its COM is low; the numbers make that visible.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a semicircular ring and a semicircular disc have the same COM\"",
      content:
        "They share an outline, not a mass distribution. The ring has every bit of mass at distance $R$, so its COM is at $\\frac{2R}{\\pi} \\approx 0.64R$. The disc has mass spread from the centre outwards, which drags the COM in to $\\frac{4R}{3\\pi} \\approx 0.42R$. The same trap exists for hollow ($\\frac R2$) versus solid ($\\frac{3R}{8}$) hemispheres.",
    },
    {
      type: "quiz",
      id: "mrg0-3-q1",
      variant: "practice",
      question: "A rod of length $L$ has linear density $\\lambda = kx^2$, with $x$ measured from one end. Where is its centre of mass?",
      options: [
        { text: "$\\dfrac{L}{2}$", feedback: "That is the uniform rod. Here the density grows with $x$, so the COM shifts towards $x = L$." },
        { text: "$\\dfrac{2L}{3}$", feedback: "That is $\\lambda \\propto x$. With $x^2$ the mass is even more concentrated at the far end." },
        { text: "$\\dfrac{L}{3}$", feedback: "That is on the light side. You may have inverted the fraction: it is $\\frac{L^4/4}{L^3/3}$." },
        { text: "$\\dfrac{3L}{4}$", correct: true, feedback: "$\\frac{\\int x\\cdot x^2\\,dx}{\\int x^2\\,dx} = \\frac{L^4/4}{L^3/3} = \\frac{3L}{4}$, the $\\frac{n+1}{n+2}L$ rule with $n = 2$." },
      ],
    },
    {
      type: "quiz",
      id: "mrg0-3-q2",
      variant: "concept",
      question: "A thin semicircular wire and a uniform semicircular plate have the same radius. Which has its COM further from the centre of the circle?",
      options: [
        { text: "The wire, at $\\frac{2R}{\\pi}$, because all of its mass is at distance $R$.", correct: true, feedback: "The plate has mass close to the centre as well, which pulls its COM in to $\\frac{4R}{3\\pi}$." },
        { text: "The plate, at $\\frac{4R}{3\\pi}$, because it has more material.", feedback: "Compare the numbers: $\\frac{4}{3\\pi} \\approx 0.42$ and $\\frac{2}{\\pi} \\approx 0.64$. The plate's COM is nearer the centre." },
        { text: "Neither: the same outline means the same COM.", feedback: "The COM depends on how the mass is distributed, not only on the outline." },
      ],
    },
    {
      type: "quiz",
      id: "mrg0-3-q3",
      variant: "practice",
      question: "How far above its flat face is the centre of mass of a uniform solid hemisphere of radius 8 cm?",
      options: [
        { text: "4 cm", feedback: "$\\frac R2 = 4$ cm is the *hollow* hemisphere. A solid one has more mass near the flat face." },
        { text: "3 cm", correct: true, feedback: "$\\frac{3R}{8} = 3$ cm." },
        { text: "$\\frac{32}{3\\pi} \\approx 3.4$ cm", feedback: "$\\frac{4R}{3\\pi}$ is the semicircular *plate*, a 2D body. The hemisphere is solid, giving $\\frac{3R}{8}$." },
        { text: "6 cm", feedback: "That is $\\frac{3R}{4}$, which would put the COM above the middle of the height. Most of the volume is near the base." },
      ],
    },
    {
      type: "quiz",
      id: "mrg0-3-q4",
      variant: "practice",
      question: "A uniform solid cone is 12 cm tall. How far from its apex is its centre of mass?",
      options: [
        { text: "3 cm", feedback: "3 cm is the distance from the *base*, $\\frac h4$." },
        { text: "4 cm", feedback: "$\\frac h3$ is the centroid of a triangular *plate*. A solid cone has even more of its volume near the base." },
        { text: "9 cm", correct: true, feedback: "$\\frac{3h}{4} = 9$ cm from the apex, 3 cm above the base." },
        { text: "6 cm", feedback: "The midpoint would need the mass spread evenly along the height, but the cone widens towards its base." },
      ],
    },
    {
      type: "quiz",
      id: "mrg0-3-q5",
      variant: "concept",
      question: "In the playground, the density is $\\lambda \\propto x^n$ on a rod of length $L$. What happens to $x_{cm} = \\frac{n+1}{n+2}L$ as $n$ becomes very large?",
      options: [
        { text: "It approaches $L$, the heavy end, but never reaches it.", correct: true, feedback: "$\\frac{n+1}{n+2} \\to 1$: the mass crowds ever closer to the far end." },
        { text: "It approaches $\\frac L2$.", feedback: "$\\frac L2$ is $n = 0$, the uniform rod. Larger $n$ moves the COM away from the middle." },
        { text: "It goes past $L$ for $n > 4$.", feedback: "A COM is a weighted average of points on the rod, so it can never leave the rod." },
      ],
    },
    {
      type: "quiz",
      id: "mrg0-3-q6",
      variant: "practice",
      question: "A 1 m rod has linear density $\\lambda = (2 + 3x)$ kg/m, with $x$ in metres from one end. Find its COM.",
      options: [
        { text: "$\\dfrac12$ m", feedback: "That ignores the $3x$ term. The density increases along the rod, so the COM is past the middle." },
        { text: "$\\dfrac23$ m", feedback: "That would be a density proportional to $x$, starting at zero. Here it starts at 2 kg/m, which keeps the COM nearer the middle." },
        { text: "$\\dfrac{2}{5}$ m", feedback: "That divides the moment 2 by $5 = 2 + 3$, the density at the far end. Divide by the total mass $\\int_0^1(2 + 3x)\\,dx = 3.5$ kg." },
        { text: "$\\dfrac47$ m", correct: true, feedback: "$M = 2 + 1.5 = 3.5$ kg and $\\int_0^1 x(2 + 3x)\\,dx = 1 + 1 = 2$, so $x_{cm} = \\frac{2}{3.5} = \\frac47$ m." },
      ],
      hint: "Compute $M = \\int_0^1 \\lambda\\,dx$ and $\\int_0^1 x\\lambda\\,dx$ separately.",
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "composite-bodies-and-cavities",
  title: "0.4 · Composite Bodies and Cavities",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "A spade is a blade plus a handle. A washer is a disc with a hole. A cricket bat is a blade plus a handle plus a grip. Nobody integrates these from scratch; you break them into pieces whose COMs you already know and use grouping. The one new idea is how to handle a *hole*.",
    },
    {
      type: "text",
      content:
        "**Adding pieces.** Replace each piece by its mass at its own COM, then take the weighted average of those few particles. That is 0.2's grouping rule, nothing more.",
    },
    {
      type: "text",
      content:
        "**Removing a piece.** Think of the original complete body as \"what remains\" plus \"what was removed\". Grouping applies to the whole:",
    },
    { type: "math", latex: "M\\,\\vec r_{\\text{whole}} = (M - m)\\,\\vec r_{\\text{rem}} + m\\,\\vec r_{\\text{hole}}" },
    { type: "text", content: "Solve for the remaining body:" },
    { type: "math", latex: "\\vec r_{\\text{rem}} = \\frac{M\\,\\vec r_{\\text{whole}} - m\\,\\vec r_{\\text{hole}}}{M - m}" },
    {
      type: "callout",
      variant: "definition",
      title: "A hole is a negative mass",
      content:
        "The COM of a body with a piece cut out is the COM of the complete body (mass $M$) together with a **negative** mass $-m$ placed at the centre of the removed piece. Here $m$ is the mass the piece *would* have had, found from its share of the area or volume.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (disc with a hole touching the rim).** A uniform disc of radius $R$ has a circular hole of radius $\\frac R2$ cut from it, the hole touching the rim. Where is the COM of what is left?\n\n1. Origin at the centre $O$ of the full disc, $x$-axis through the centre of the hole, which is at $x = \\frac R2$. *Why this step:* the whole disc's COM is then at the origin and drops out of the numerator.\n2. The hole's area is $\\pi\\left(\\frac R2\\right)^2 = \\frac14\\pi R^2$, so its mass would be $m = \\frac M4$. *Why this step:* for a uniform plate, mass is proportional to area.\n3. $x_{\\text{rem}} = \\dfrac{M(0) - \\frac M4\\cdot\\frac R2}{M - \\frac M4} = \\dfrac{-MR/8}{3M/4} = -\\dfrac R6$.\n4. The remaining body's COM is $\\frac R6$ from the centre, on the side *opposite* the hole.",
    },
    {
      type: "text",
      content:
        "Here is the same calculation as a section-formula picture. $H$ is the centre of the hole and $O$ the centre of the full disc (a disc of radius 4 grid units, so $H$ is at $(2, 0)$). The remaining body's COM $P$ divides $HO$ **externally** in the ratio $M : m = 4 : 1$.",
    },
    {
      type: "interactive",
      config: {
        component: "vec-canvas-2d",
        mode: "section",
        a: [2, 0],
        b: [0, 0],
        window: { xmin: -5, xmax: 5, ymin: -3, ymax: 3 },
        ratio: {
          m: { min: 1, max: 9, step: 1, initial: 4 },
          n: { min: 1, max: 9, step: 1, initial: 1 },
          allowExternal: true,
          external: true,
        },
        labels: { a: "H", b: "O" },
        readouts: ["ratio"],
        caption:
          "m : n is (mass of the full disc) : (mass removed); a hole of radius R/2 removes a quarter, so 4 : 1. External division puts P beyond O, away from the hole. Try m : n = 9 : 1 for a smaller hole, and switch to internal division to see the wrong answer.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: with $4 : 1$ the point $P$ sits at $x = -\\frac23$, which is $-\\frac R6$ for $R = 4$. A smaller hole ($9 : 1$, the hole of radius $\\frac R3$ has mass $\\frac M9$) pulls $P$ closer to $O$. Internal division would put $P$ between $O$ and the hole, which is the misconception below. $P$ is always on the far side of $O$ from $H$.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (a square plate with a quarter removed).** A uniform square plate of side $2a$ is centred at the origin. The $a \\times a$ square in the first quadrant is cut away.\n\n1. The removed square has a quarter of the area, so mass $\\frac M4$, centred at $\\left(\\frac a2, \\frac a2\\right)$.\n2. $x_{\\text{rem}} = \\dfrac{0 - \\frac M4\\cdot\\frac a2}{\\frac{3M}{4}} = -\\dfrac a6$, and by the same arithmetic $y_{\\text{rem}} = -\\dfrac a6$.\n3. The COM is at $\\left(-\\frac a6, -\\frac a6\\right)$, a distance $\\frac{\\sqrt2 a}{6}$ from the centre along the diagonal, away from the missing corner. In terms of the side $L = 2a$ that is $\\frac{\\sqrt2 L}{12}$.\n\nThe remaining piece is an L-shape of three $a \\times a$ squares. Check by *adding* instead: the squares are centred at $\\left(-\\frac a2, \\frac a2\\right)$, $\\left(-\\frac a2, -\\frac a2\\right)$, $\\left(\\frac a2, -\\frac a2\\right)$, whose average is $\\left(-\\frac a6, -\\frac a6\\right)$. ✓ *Why this step:* subtracting and adding are two independent routes, and agreement is your proof.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (a T-shaped lamina).** A uniform T is made of a top bar 8 cm × 2 cm lying on a stem 2 cm wide and 6 cm tall. Find the height of the COM above the foot of the stem.\n\n1. By symmetry the COM is on the vertical centre line; only its height is unknown.\n2. Stem: area 12 cm², centre 3 cm up. Bar: area 16 cm², centre $6 + 1 = 7$ cm up. *Why this step:* for a uniform lamina the areas stand in for the masses.\n3. $y_{cm} = \\dfrac{12(3) + 16(7)}{12 + 16} = \\dfrac{36 + 112}{28} = \\dfrac{148}{28} = \\dfrac{37}{7} \\approx 5.29$ cm.\n\n**Worked example 4 (a rod carrying a sphere).** A uniform 1 kg rod 1 m long has a 2 kg solid sphere of radius 0.1 m fixed to one end, so the sphere's centre is 1.1 m from the free end of the rod.\n\n1. Origin at the free end of the rod. Rod: 1 kg at 0.5 m. Sphere: 2 kg at 1.1 m (the COM of a uniform sphere is its centre).\n2. $x_{cm} = \\dfrac{1(0.5) + 2(1.1)}{3} = \\dfrac{2.7}{3} = 0.9$ m from the free end.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (a sphere with a cavity, JEE Main).** A uniform solid sphere of radius $R$ has a spherical cavity of radius $\\frac R2$ that touches its surface. Locate the COM.\n\n1. Volume scales as radius cubed, so the cavity would have held $\\left(\\frac12\\right)^3 = \\frac18$ of the mass: $m = \\frac M8$, centred $\\frac R2$ from $O$. *Why this step:* in 3D the mass ratio is the cube of the radius ratio, not the square; this is where most slips happen.\n2. $x_{\\text{rem}} = \\dfrac{0 - \\frac M8\\cdot\\frac R2}{\\frac{7M}{8}} = -\\dfrac{R}{14}$.\n3. The COM is $\\frac{R}{14}$ from the centre, on the side away from the cavity. Compare the disc: the same geometry in 2D gave $\\frac R6$, a much bigger shift, because a circle of half the radius removes a quarter of a disc but only an eighth of a sphere.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"removing a piece moves the COM towards the hole\"",
      content:
        "Removing mass from one side leaves the *other* side heavier, so the balance point moves **away** from the hole. In the formula, the hole enters with a minus sign, which is why the answer is an external division point beyond the original centre.",
    },
    {
      type: "quiz",
      id: "mrg0-4-q1",
      variant: "practice",
      question: "A uniform solid sphere of radius $R$ has a spherical cavity of radius $\\frac R2$ touching its surface. How far from the sphere's centre is the COM of the remaining body?",
      options: [
        { text: "$\\dfrac{R}{6}$", feedback: "That is the 2D answer for a disc. In 3D the cavity's mass is $\\frac18$ of the whole, not $\\frac14$." },
        { text: "$\\dfrac{R}{16}$", feedback: "You divided by $M$ instead of the remaining mass $\\frac{7M}{8}$." },
        { text: "$\\dfrac{R}{14}$", correct: true, feedback: "$\\frac{(M/8)(R/2)}{7M/8} = \\frac{R}{14}$, away from the cavity." },
        { text: "$\\dfrac{R}{2}$", feedback: "That is where the cavity's centre is. The remaining COM lies on the opposite side, much closer to $O$." },
      ],
    },
    {
      type: "quiz",
      id: "mrg0-4-q2",
      variant: "concept",
      question: "A hole is drilled in a uniform plate to the right of its centre. Which way does the COM move?",
      options: [
        { text: "To the right, towards the hole.", feedback: "That would happen if mass were *added* on the right. Removing mass there leaves the left side heavier." },
        { text: "To the left, away from the hole.", correct: true, feedback: "The hole acts as a negative mass on the right, so the balance point shifts left." },
        { text: "It does not move, because the hole is small.", feedback: "Any off-centre hole shifts the COM, however little." },
      ],
    },
    {
      type: "quiz",
      id: "mrg0-4-q3",
      variant: "practice",
      question: "From a uniform disc of radius $R$, a circular hole of radius $\\frac R3$ is cut, touching the rim (hole centre $\\frac{2R}{3}$ from the disc's centre). How far does the COM shift?",
      options: [
        { text: "$\\dfrac{2R}{27}$", feedback: "You divided by $M$ rather than the remaining mass $\\frac{8M}{9}$." },
        { text: "$\\dfrac{R}{6}$", feedback: "That is the hole of radius $\\frac R2$. This hole is smaller, with mass $\\frac M9$." },
        { text: "$\\dfrac{R}{3}$", feedback: "That takes the hole's mass as $\\frac M3$. Area goes as radius squared, so it is $\\left(\\frac13\\right)^2 = \\frac19$ of the disc." },
        { text: "$\\dfrac{R}{12}$", correct: true, feedback: "Hole mass $\\frac M9$ at $\\frac{2R}{3}$: shift $= \\frac{(M/9)(2R/3)}{8M/9} = \\frac{2R/27}{8/9} = \\frac{R}{12}$, away from the hole." },
      ],
    },
    {
      type: "quiz",
      id: "mrg0-4-q4",
      variant: "practice",
      question: "A uniform square plate of side 12 cm has a 6 cm × 6 cm square cut from one corner. How far is the COM of the remaining L-shape from the centre of the original square?",
      options: [
        { text: "$\\sqrt2$ cm", correct: true, feedback: "Each coordinate shifts by $\\frac{(M/4)(3)}{3M/4} = 1$ cm away from the missing corner, so the distance is $\\sqrt{1^2 + 1^2} = \\sqrt2$ cm." },
        { text: "1 cm", feedback: "That is the shift in one coordinate. It shifts by 1 cm in both $x$ and $y$, along the diagonal." },
        { text: "$\\frac34\\sqrt2$ cm", feedback: "You divided by $M$ instead of $\\frac{3M}{4}$." },
        { text: "$3\\sqrt2$ cm", feedback: "That is the distance to the centre of the *removed* square. The remaining COM moves only a third as far, the other way." },
      ],
      hint: "The removed square has a quarter of the mass and its centre is at $(3, 3)$ cm from the plate's centre.",
    },
    {
      type: "quiz",
      id: "mrg0-4-q5",
      variant: "practice",
      question: "A uniform 2 kg rod of length 1.2 m has a 1 kg point mass attached at one end. How far from the other (free) end is the COM?",
      options: [
        { text: "0.6 m", feedback: "That is the rod alone. The attached mass drags the COM towards its end." },
        { text: "0.8 m", correct: true, feedback: "$\\frac{2(0.6) + 1(1.2)}{3} = \\frac{2.4}{3} = 0.8$ m." },
        { text: "0.9 m", feedback: "Weight the rod's midpoint by the rod's mass: $2 \\times 0.6 = 1.2$, not $1 \\times 0.6$." },
        { text: "0.4 m", feedback: "That is measured from the wrong end: 0.4 m from the point mass is 0.8 m from the free end." },
      ],
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "motion-of-the-com",
  title: "0.5 · Motion of the Centre of Mass",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "At Diwali, a rocket shell climbs, bursts at the top of its arc, and showers sparks in every direction. Each spark follows its own parabola. Yet if you could weigh every spark and average their positions at each instant, that average would carry on along the very parabola the unexploded shell was following, as if nothing had happened. This lesson proves it, and the proof is only three lines long.",
    },
    {
      type: "text",
      content:
        "**Step 1: velocity.** Multiply the definition of the COM by the total mass $M$ and differentiate with respect to time. The masses are constant, so",
    },
    {
      type: "math",
      latex: "M\\vec r_{cm} = \\sum m_i\\vec r_i \\;\\Rightarrow\\; M\\vec v_{cm} = \\sum m_i\\vec v_i = \\vec P",
    },
    {
      type: "text",
      content:
        "The total momentum of the system is the total mass times the velocity of the COM. **Step 2: acceleration.** Differentiate again:",
    },
    { type: "math", latex: "M\\vec a_{cm} = \\sum m_i\\vec a_i = \\sum \\vec F_i" },
    {
      type: "text",
      content:
        "where $\\vec F_i$ is the net force on particle $i$ (Newton's second law for each particle). **Step 3: split the forces.** Each $\\vec F_i$ is part external (gravity, the floor, your hand) and part internal (pushes and pulls from the other particles of the system). By Newton's third law, every internal force $\\vec F_{ij}$ on $i$ due to $j$ comes with a partner $\\vec F_{ji} = -\\vec F_{ij}$ on $j$ due to $i$. In the sum over all particles they cancel in pairs:",
    },
    { type: "math", latex: "\\sum \\vec F_i = \\vec F_{\\text{ext}} + \\underbrace{\\sum_{i \\ne j}\\vec F_{ij}}_{=\\,\\vec 0} \\quad\\Rightarrow\\quad M\\vec a_{cm} = \\vec F_{\\text{ext}}" },
    {
      type: "callout",
      variant: "definition",
      title: "Newton's second law for a system",
      content:
        "$\\vec P = M\\vec v_{cm}$ and $M\\vec a_{cm} = \\vec F_{\\text{ext}}$.\nThe COM moves like a single particle of mass $M$ acted on by the **external** forces alone. Internal forces, however large (a spring, an explosion, muscles), cannot change the motion of the COM.",
    },
    {
      type: "text",
      content:
        "In the lab below two carts start locked together, rolling at $v_0$, with a compressed spring between them. Press Play: the spring releases its energy and shoves the carts apart. Watch the COM marker and the momentum graph.",
    },
    {
      type: "interactive",
      config: {
        component: "mrg-collision-lab",
        mode: "explosion",
        v0: { min: -3, max: 3, step: 0.5, initial: 1 },
        showCom: true,
        graph: "momentum",
        caption:
          "The spring is internal to the two-cart system. Change the masses and the spring energy: the carts fly apart differently each time, but the COM marker glides on at the same steady speed, never jerking at the release.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: before and after the release the COM moves at the same $v_0$. The two momentum curves swing in opposite directions by equal amounts, so their sum (the total) is a flat line. Set $v_0 = 0$ and the COM stays at rest while the carts race apart.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (velocity of the COM).** A 2 kg ball moves at 3 m/s to the right and a 3 kg ball at 2 m/s to the left. Take right as positive.\n\n1. $P = 2(3) + 3(-2) = 0$.\n2. $v_{cm} = \\dfrac{P}{M} = 0$. The COM is at rest, even though both balls are moving. *Why this step:* $\\vec P = M\\vec v_{cm}$ turns a statement about momentum into one about the COM.\n\n**Worked example 2 (acceleration of the COM).** On a smooth floor, a 4 N force pushes a 2 kg block to the right while a 1 N force pushes a separate 3 kg block to the left. The two blocks are joined by a spring.\n\n1. The spring force is internal, so ignore it. External forces: $+4 - 1 = 3$ N (weights and normal forces cancel vertically).\n2. $a_{cm} = \\dfrac{3}{5} = 0.6$ m/s² to the right, whatever the spring is doing. *Why this step:* you cannot find each block's acceleration without knowing the spring's extension, but you never need it for the COM.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (the exploding shell, JEE classic).** A shell is fired with range $R$ on level ground. At the top of its flight it explodes into two equal fragments. One falls vertically down (it is momentarily at rest after the explosion). Where does the other land? Ignore air resistance.\n\n1. The explosion is internal, and the only external force is gravity. So the COM continues on the original parabola and lands at $R$. *Why this step:* $M\\vec a_{cm} = M\\vec g$ both before and after the explosion.\n2. Both fragments start from the top with zero vertical velocity, so they fall for the same time and land together. *Why this step:* the COM rule only holds until the first fragment hits the ground (then the ground's push is an extra external force), so we need them to land at the same moment.\n3. The first fragment lands directly below the top, at $\\frac R2$. Landing positions must average to $R$: $\\frac{m}{2}\\cdot\\frac R2 + \\frac m2\\,x = mR$.\n4. $x = 2R - \\frac R2 = \\dfrac{3R}{2}$.\n\n**Worked example 4 (the same, with numbers and a check).** A shell is fired at $20\\sqrt2$ m/s at $45^\\circ$ ($g = 10$ m/s²). At the top it splits into two equal halves, and one half retraces its path back to the gun. Where does the other land?\n\n1. Range $R = \\dfrac{u^2\\sin 2\\theta}{g} = \\dfrac{800 \\times 1}{10} = 80$ m, and the top is at $x = 40$ m.\n2. One half lands at the gun, $x = 0$. The COM lands at 80 m: $\\frac m2(0) + \\frac m2\\,x = m(80)$, so $x = 160$ m.\n3. Check with momentum. At the top the shell moves horizontally at $u\\cos45^\\circ = 20$ m/s. Horizontal momentum: $m(20) = \\frac m2(-20) + \\frac m2 v$, so $v = 60$ m/s. The fall from the top takes $\\frac{u\\sin45^\\circ}{g} = 2$ s, so $x = 40 + 60 \\times 2 = 160$ m. ✓ *Why this step:* the COM route and the momentum route are really the same law, so they must agree.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (two bodies that attract each other).** A 1 kg and a 4 kg particle are released from rest 10 m apart in deep space and attract each other gravitationally. Where do they meet?\n\n1. Their mutual attraction is internal and there are no external forces, so the COM stays at rest where it started. *Why this step:* $\\vec F_{\\text{ext}} = 0$ and $\\vec v_{cm} = 0$ initially.\n2. They meet at the COM: $\\dfrac{4 \\times 10}{5} = 8$ m from the 1 kg particle's starting point.\n3. The light particle covers 8 m and the heavy one 2 m, in the ratio $4 : 1$, which is also the ratio of their speeds at every instant.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"an explosion changes the path of the COM\"",
      content:
        "The fragments scatter, but the forces that scatter them are internal and cancel in pairs. The COM keeps the parabola it was on. What *does* change the COM's motion is any new external force: air drag, or the ground stopping the first fragment to land. That is why JEE problems arrange for the fragments to land at the same time.",
    },
    {
      type: "quiz",
      id: "mrg0-5-q1",
      variant: "practice",
      question: "A 2 kg particle has velocity $3\\hat i$ m/s and a 1 kg particle has velocity $(-3\\hat i + 6\\hat j)$ m/s. Find the velocity of their COM.",
      options: [
        { text: "$(3\\hat i + 6\\hat j)$ m/s", feedback: "That is the total momentum in kg m/s. Divide by the total mass." },
        { text: "$3\\hat j$ m/s", feedback: "That is the plain average of the two velocities. Weight each by its mass." },
        { text: "$(\\hat i + 2\\hat j)$ m/s", correct: true, feedback: "$\\vec P = 6\\hat i + (-3\\hat i + 6\\hat j) = 3\\hat i + 6\\hat j$, and dividing by 3 kg gives $\\hat i + 2\\hat j$." },
        { text: "$\\vec 0$", feedback: "The $x$-momenta are $6$ and $-3$ kg m/s, which do not cancel." },
      ],
    },
    {
      type: "quiz",
      id: "mrg0-5-q2",
      variant: "concept",
      question: "Two astronauts float at rest in space, holding the ends of a rope. They pull themselves together hand over hand. Where do they meet?",
      options: [
        { text: "At their initial centre of mass.", correct: true, feedback: "The rope's tension is internal. With no external force the COM, initially at rest, stays put." },
        { text: "At the midpoint of the rope.", feedback: "Only if they have equal masses. The lighter astronaut moves further." },
        { text: "Where the stronger astronaut started.", feedback: "Pulling harder does not help: the rope pulls both of them with the same tension, and only the COM matters." },
      ],
    },
    {
      type: "quiz",
      id: "mrg0-5-q3",
      variant: "practice",
      question: "A shell with range 120 m explodes at the top of its path into two equal fragments. One falls vertically. Where does the other land? (Ignore air.)",
      options: [
        { text: "180 m", correct: true, feedback: "$\\frac{60 + x}{2} = 120$, so $x = 180$ m, that is, $1.5R$." },
        { text: "120 m", feedback: "The *COM* lands at 120 m. The fragment that fell vertically landed at 60 m, so the other must be beyond 120 m." },
        { text: "240 m", feedback: "That would need the first fragment to land at the gun. It fell vertically from the top, at 60 m." },
        { text: "150 m", feedback: "That averages the fragment positions incorrectly. Solve $\\frac m2(60) + \\frac m2 x = m(120)$." },
      ],
    },
    {
      type: "quiz",
      id: "mrg0-5-q4",
      variant: "practice",
      question: "A shell of mass $3m$ has range 80 m. At the top it splits into pieces of mass $m$ and $2m$; the piece of mass $m$ falls vertically. Where does the $2m$ piece land?",
      options: [
        { text: "120 m", feedback: "That is the equal-mass answer $1.5R$. Here the heavier piece carries more of the COM, so it lands closer." },
        { text: "100 m", correct: true, feedback: "$m(40) + 2m\\,x = 3m(80)$ gives $x = 100$ m." },
        { text: "160 m", feedback: "That is the equal-halves answer when one half retraces its path to the gun, $\\frac m2(0) + \\frac m2 x = m(80)$. Here the pieces are unequal and the $m$ piece lands below the top, at 40 m." },
        { text: "90 m", feedback: "Check: $m(40) + 2m(90) = 220m$, but the COM needs $3m(80) = 240m$." },
      ],
    },
    {
      type: "quiz",
      id: "mrg0-5-q5",
      variant: "concept",
      question: "A shell bursts in mid-air into two pieces that land at *different* times. After the first piece hits the ground, does the COM of the two pieces still follow the original parabola?",
      options: [
        { text: "Yes: the explosion was internal, so nothing can change the COM's path.", feedback: "The explosion was internal, but the ground's normal force on the landed piece is external." },
        { text: "Yes, as long as there is no air resistance.", feedback: "Air resistance is one extra external force, but the ground is another." },
        { text: "No: once a piece is on the ground, the ground pushes on it, an extra external force.", correct: true, feedback: "$M\\vec a_{cm} = \\vec F_{\\text{ext}}$ still holds, but $\\vec F_{\\text{ext}}$ is no longer just the weight." },
      ],
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "when-the-com-stays-put",
  title: "0.6 · When the Centre of Mass Stays Put",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "Step from a small boat onto the jetty and the boat slides away from under you. Walk forward in a rowing boat and the boat creeps backwards. Nobody pushed the boat from outside, so how did it move? The answer is the most useful special case of $M\\vec a_{cm} = \\vec F_{\\text{ext}}$.",
    },
    {
      type: "text",
      content:
        "If the external force along some direction, say $x$, is zero, then $a_{cm,x} = 0$ and $v_{cm,x}$ is constant. If in addition the system starts at rest, $v_{cm,x}$ stays zero and the COM does not move along $x$ at all:",
    },
    { type: "math", latex: "\\Delta x_{cm} = 0 \\quad\\Rightarrow\\quad m_1\\,\\Delta x_1 + m_2\\,\\Delta x_2 + \\dots = 0" },
    {
      type: "callout",
      variant: "definition",
      title: "The fixed-COM condition",
      content:
        "If $F_{\\text{ext},x} = 0$ and the system starts at rest, then $\\sum m_i\\,\\Delta x_i = 0$, where each $\\Delta x_i$ is a displacement **relative to the ground**. The same holds along any other direction free of external force. Water resistance, friction with the floor or a push from a wall break the condition along their direction.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Choose ground displacements, not relative ones",
      content:
        "Problems usually give you a *relative* displacement (\"the man walks 5 m along the boat\", \"the block slides down the wedge\"). Write every body's displacement relative to the ground in terms of one unknown, then impose $\\sum m\\,\\Delta x = 0$. If the boat moves $d$ backwards, a man who walks $L$ along it moves $L - d$ forwards over the ground.",
    },
    {
      type: "text",
      content:
        "**Derivation (man on a boat).** A man of mass $m$ stands on a boat of mass $M$ floating at rest (ignore water resistance). He walks a distance $L$ **relative to the boat**. Let the boat move a distance $d$ backwards. Taking forwards as positive, the man's ground displacement is $L - d$ and the boat's is $-d$:",
    },
    { type: "math", latex: "m(L - d) + M(-d) = 0 \\quad\\Rightarrow\\quad d = \\frac{mL}{m + M}" },
    {
      type: "text",
      content:
        "The lab below starts with both carts at rest. Treat the explosion as the man's push on the boat: an internal push between two bodies. Play it, then pause at any moment and compare the two displacements from the start.",
    },
    {
      type: "interactive",
      config: {
        component: "mrg-collision-lab",
        mode: "explosion",
        controls: ["m1", "m2", "energy"],
        frame: "ground",
        v0: { min: -3, max: 3, step: 0.5, initial: 0 },
        caption:
          "Both carts start at rest. Whatever the masses and the spring energy, the COM marker never moves. Make one cart five times heavier than the other and compare how far each travels.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the COM marker stays fixed while the carts separate. At every instant the displacements satisfy $m_1\\Delta x_1 = -m_2\\Delta x_2$: the heavy cart moves a short distance, the light one a long distance, in opposite directions. The spring energy only changes *how fast* this happens, not the ratio.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (the boat, JEE Main).** A 60 kg man stands at one end of a 140 kg boat at rest in still water. He walks 5 m along the boat. How far do he and the boat move relative to the shore?\n\n1. Forwards is positive; boat displacement $-d$, man's $5 - d$. *Why this step:* the 5 m is relative to the boat, so it must be corrected by the boat's own motion.\n2. $60(5 - d) - 140d = 0 \\Rightarrow 300 = 200d \\Rightarrow d = 1.5$ m.\n3. The boat moves 1.5 m back, and the man moves $5 - 1.5 = 3.5$ m forwards over the ground. Check: $60 \\times 3.5 = 210 = 140 \\times 1.5$. ✓\n\n**Worked example 2 (a dog on a boat).** A 5 kg dog stands on a 20 kg flat boat, 10 m from the shore, facing it. It walks 4 m towards the shore along the boat. How far is it from the shore now?\n\n1. Take towards the shore as positive. Boat: $-d$. Dog: $4 - d$.\n2. $5(4 - d) - 20d = 0 \\Rightarrow 20 = 25d \\Rightarrow d = 0.8$ m.\n3. The dog has moved $4 - 0.8 = 3.2$ m towards the shore, so it is $10 - 3.2 = 6.8$ m from the shore. *Why this step:* the tempting answer 6 m forgets that the boat slid away from the shore.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (block on a smooth wedge).** A small block of mass $m = 1$ kg slides from the top to the bottom of a smooth wedge of mass $M = 4$ kg resting on a smooth floor. The wedge's sloping face spans a horizontal distance $b = 1$ m. How far does the wedge move?\n\n1. Horizontally there is no external force (the floor is smooth and gravity is vertical), and everything starts at rest. Vertically the floor pushes, so only the horizontal COM is fixed. *Why this step:* the fixed-COM rule is used one direction at a time.\n2. Relative to the wedge, the block moves $b = 1$ m horizontally, say forwards. The wedge moves $d$ backwards, so the block's ground displacement is $1 - d$.\n3. $1(1 - d) - 4d = 0 \\Rightarrow d = \\dfrac{mb}{m + M} = \\dfrac{1}{5} = 0.2$ m.\n\n**Worked example 4 (two skaters and a rope).** Skaters of 40 kg and 60 kg stand 10 m apart on smooth ice, holding a light rope. The 40 kg skater pulls. Where do they meet?\n\n1. Ice is smooth, so the only horizontal forces are the rope's, which are internal.\n2. They meet at the COM, which is $\\frac{60 \\times 10}{100} = 6$ m from the 40 kg skater. It does not matter who pulls.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (a balloon with a climbing man).** A balloon of mass $M$ hovers at rest with a rope ladder hanging from it, and a man of mass $m$ on the ladder. He climbs a length $L$ up the ladder. How far does the balloon move?\n\n1. The balloon hovers, so buoyancy balances the total weight and the net external force is zero. *Why this step:* the man's climbing force is internal; he pulls the ladder down as it pushes him up.\n2. Upwards is positive. Balloon: $-d$. Man: $L - d$. So $m(L - d) - Md = 0$ and $d = \\dfrac{mL}{m + M}$ downwards.\n3. With $m = 80$ kg, $M = 320$ kg and $L = 10$ m: $d = \\frac{800}{400} = 2$ m down, and the man rises $10 - 2 = 8$ m relative to the ground.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the man walks $L$ relative to the ground\"",
      content:
        "The length of the boat (or the distance walked on it) is measured on the boat, and the boat is moving. Relative to the ground the man covers $L - d = \\frac{ML}{m + M}$, which is less than $L$. Plugging $L$ in as a ground displacement gives $mL = Md$ and the wrong $d = \\frac{mL}{M}$.",
    },
    {
      type: "quiz",
      id: "mrg0-6-q1",
      variant: "practice",
      question: "A 50 kg girl stands on a 150 kg boat at rest. She walks 8 m along the boat. How far does the boat move relative to the water? (Ignore water resistance.)",
      options: [
        { text: "2 m", correct: true, feedback: "$d = \\frac{mL}{m + M} = \\frac{50 \\times 8}{200} = 2$ m, opposite to her walk." },
        { text: "2.67 m", feedback: "That is $\\frac{mL}{M}$, which treats her 8 m as a ground displacement." },
        { text: "6 m", feedback: "6 m is how far *she* moves relative to the water, $8 - 2$." },
        { text: "8 m", feedback: "The boat is three times heavier than she is, so it moves much less than she does." },
      ],
    },
    {
      type: "quiz",
      id: "mrg0-6-q2",
      variant: "concept",
      question: "In $\\sum m_i\\,\\Delta x_i = 0$, what must each $\\Delta x_i$ be?",
      options: [
        { text: "The displacement of body $i$ relative to the ground.", correct: true, feedback: "The COM is fixed in the ground frame, so the displacements must be measured in that frame." },
        { text: "The displacement of body $i$ relative to the other body.", feedback: "Relative displacements are what problems give you, but they must be converted before being used." },
        { text: "Either: it makes no difference.", feedback: "It does: using a relative displacement is exactly the mistake that gives $\\frac{mL}{M}$ instead of $\\frac{mL}{m + M}$." },
      ],
    },
    {
      type: "quiz",
      id: "mrg0-6-q3",
      variant: "practice",
      question: "Skaters of 30 kg and 70 kg stand 20 m apart on smooth ice and pull on a rope until they meet. How far does the 30 kg skater travel?",
      options: [
        { text: "6 m", feedback: "That is how far the heavier skater travels." },
        { text: "10 m", feedback: "The midpoint is only right for equal masses." },
        { text: "14 m", correct: true, feedback: "They meet at the COM, $\\frac{70 \\times 20}{100} = 14$ m from the lighter skater." },
        { text: "It depends on who pulls harder.", feedback: "The rope pulls both with the same tension. Only the masses matter." },
      ],
    },
    {
      type: "quiz",
      id: "mrg0-6-q4",
      variant: "practice",
      question: "A 2 kg block slides down the smooth face of an 8 kg wedge on a smooth floor. The face spans 50 cm horizontally. How far does the wedge move by the time the block reaches the bottom?",
      options: [
        { text: "12.5 cm", feedback: "That is $\\frac{mb}{M}$, treating 50 cm as the block's ground displacement." },
        { text: "10 cm", correct: true, feedback: "$d = \\frac{mb}{m + M} = \\frac{2 \\times 50}{10} = 10$ cm." },
        { text: "40 cm", feedback: "40 cm is the block's horizontal displacement relative to the ground." },
        { text: "0 cm: the floor holds it.", feedback: "A smooth floor cannot push horizontally, so the block's horizontal push on the wedge moves it." },
      ],
    },
    {
      type: "quiz",
      id: "mrg0-6-q5",
      variant: "practice",
      question: "A man of 80 kg hangs from a rope ladder beneath a hovering balloon of mass 320 kg. He climbs 10 m up the ladder. How far does he rise relative to the ground?",
      options: [
        { text: "10 m", feedback: "10 m is relative to the ladder, which moves down as he climbs." },
        { text: "2 m", feedback: "2 m is how far the balloon descends." },
        { text: "7.5 m", feedback: "That uses $\\frac{mL}{M} = 2.5$ m for the balloon, treating the 10 m as a ground displacement." },
        { text: "8 m", correct: true, feedback: "The balloon drops $\\frac{80 \\times 10}{400} = 2$ m, so he rises $10 - 2 = 8$ m." },
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
      type: "callout",
      variant: "info",
      title: "The chapter in six lines",
      content:
        "1. The COM is the mass-weighted average position, $\\vec r_{cm} = \\frac{1}{M}\\sum m_i\\vec r_i$, computed one coordinate at a time.\n2. For two masses it sits nearer the heavier one, with distances in the inverse ratio of the masses.\n3. Continuous bodies: $\\vec r_{cm} = \\frac1M\\int\\vec r\\,dm$, with an element chosen so the integral is one-dimensional; use symmetry first.\n4. Composite bodies group into particles at their own COMs; a hole is a negative mass at its centre.\n5. $M\\vec v_{cm} = \\vec P$ and $M\\vec a_{cm} = \\vec F_{\\text{ext}}$: internal forces never move the COM.\n6. With no external force along $x$ and the system at rest, $\\sum m_i\\,\\Delta x_i = 0$, using ground displacements.",
    },
    {
      type: "text",
      content:
        "No formula sheet here. Each question can be rebuilt from the definition of the COM or from $M\\vec a_{cm} = \\vec F_{\\text{ext}}$. The last few are JEE-Advanced flavoured and need two ideas in a row. Take $g = 10$ m/s² where it appears.",
    },
    {
      type: "quiz",
      id: "mrg0-7-q1",
      variant: "mastery",
      question: "Masses of 1 kg, 2 kg and 3 kg are at $(1, 0)$, $(0, 2)$ and $(-1, -1)$ (metres). Find their centre of mass.",
      options: [
        { text: "$\\left(-\\frac13, \\frac16\\right)$", correct: true, feedback: "$x = \\frac{1 + 0 - 3}{6} = -\\frac13$ and $y = \\frac{0 + 4 - 3}{6} = \\frac16$." },
        { text: "$\\left(0, \\frac13\\right)$", feedback: "That is the unweighted average of the three points." },
        { text: "$(-2, 1)$", feedback: "Those are the weighted sums. Divide by the total mass, 6 kg." },
        { text: "$\\left(\\frac13, \\frac16\\right)$", feedback: "Sign slip in $x$: $1(1) + 3(-1) = -2$, so $x_{cm}$ is negative." },
      ],
    },
    {
      type: "quiz",
      id: "mrg0-7-q2",
      variant: "mastery",
      question: "A rod of length 2 m has linear density $\\lambda = (1 + 2x)$ kg/m, with $x$ in metres from one end. Where is its centre of mass?",
      options: [
        { text: "1 m from the light end", feedback: "That is the midpoint, correct only for a uniform rod." },
        { text: "$\\dfrac{11}{9}$ m from the light end", correct: true, feedback: "$M = \\int_0^2(1 + 2x)\\,dx = 6$ kg and $\\int_0^2 x(1 + 2x)\\,dx = 2 + \\frac{16}{3} = \\frac{22}{3}$, so $x_{cm} = \\frac{22}{18} = \\frac{11}{9}$ m." },
        { text: "$\\dfrac43$ m from the light end", feedback: "That is $\\frac{2L}{3}$ for $\\lambda \\propto x$. The constant 1 in the density pulls the COM back towards the middle." },
        { text: "$\\dfrac{22}{3}$ m from the light end", feedback: "That is the moment $\\int x\\,dm$. Divide by the mass, 6 kg." },
      ],
    },
    {
      type: "quiz",
      id: "mrg0-7-q3",
      variant: "mastery",
      question: "A thin semicircular wire and a uniform semicircular plate have the same radius $R$ and the same centre. How far apart are their centres of mass?",
      options: [
        { text: "0", feedback: "Same outline, different mass distribution: the wire's COM is at $\\frac{2R}{\\pi}$, the plate's at $\\frac{4R}{3\\pi}$." },
        { text: "$\\dfrac{R}{\\pi}$", feedback: "Recompute the plate's COM: it is $\\frac{4R}{3\\pi}$, not $\\frac{R}{\\pi}$." },
        { text: "$\\dfrac{2R}{3\\pi}$", correct: true, feedback: "$\\frac{2R}{\\pi} - \\frac{4R}{3\\pi} = \\frac{6R - 4R}{3\\pi} = \\frac{2R}{3\\pi}$." },
        { text: "$\\dfrac{2R}{\\pi}$", feedback: "That is the wire's distance from the centre, not the gap between the two COMs." },
      ],
    },
    {
      type: "quiz",
      id: "mrg0-7-q4",
      variant: "mastery",
      question: "A circular hole of radius 6 cm is cut from a uniform disc of radius 12 cm, the hole touching the rim. How far from the disc's original centre is the COM of the remainder?",
      options: [
        { text: "2 cm, on the side of the hole", feedback: "The size is right but the direction is not. Removing mass makes the far side relatively heavier." },
        { text: "1.5 cm, away from the hole", feedback: "You divided by $M$ instead of the remaining mass $\\frac{3M}{4}$." },
        { text: "0.86 cm, away from the hole", feedback: "That uses the 3D mass fraction $\\frac18$ (it is $\\frac{6}{7}$ cm). A disc is 2D: the fraction is $\\left(\\frac12\\right)^2 = \\frac14$." },
        { text: "2 cm, on the side away from the hole", correct: true, feedback: "The hole has mass $\\frac M4$ at 6 cm: shift $= \\frac{(M/4)(6)}{3M/4} = 2$ cm, away from the hole." },
      ],
    },
    {
      type: "quiz",
      id: "mrg0-7-q5",
      variant: "mastery",
      question: "Uniform rod $AB$ (2 kg, 2 m) lies along the $x$-axis from $A(0,0)$ to $B(2,0)$. Uniform rod $BC$ (1 kg, 1 m) is welded at $B$, pointing straight up. Find the COM of the bent rod.",
      options: [
        { text: "$\\left(\\frac43, \\frac16\\right)$ m", correct: true, feedback: "Group: 2 kg at $(1, 0)$ and 1 kg at $(2, 0.5)$. $x = \\frac{2 + 2}{3}$, $y = \\frac{0.5}{3}$." },
        { text: "$\\left(\\frac32, \\frac14\\right)$ m", feedback: "That is the midpoint of the two rod centres, treating the rods as equal masses." },
        { text: "$\\left(\\frac43, \\frac13\\right)$ m", feedback: "The vertical rod's COM is at height 0.5 m, not 1 m: $y = \\frac{1 \\times 0.5}{3} = \\frac16$." },
        { text: "$\\left(1, \\frac16\\right)$ m", feedback: "The vertical rod sits at $x = 2$, which pulls $x_{cm}$ beyond 1: $\\frac{2(1) + 1(2)}{3} = \\frac43$." },
      ],
    },
    {
      type: "quiz",
      id: "mrg0-7-q6",
      variant: "mastery",
      question: "A projectile of mass $3m$ would have a range of 100 m. At the top of its flight it splits into pieces of mass $m$ and $2m$. The smaller piece retraces its path exactly and lands at the launch point. Where does the larger piece land?",
      options: [
        { text: "200 m", feedback: "That is the answer for two *equal* halves. The larger piece carries two-thirds of the mass, so it lands closer." },
        { text: "150 m", correct: true, feedback: "The pieces land together (both start with zero vertical velocity), so $m(0) + 2m\\,x = 3m(100)$ and $x = 150$ m." },
        { text: "125 m", feedback: "Check: $m(0) + 2m(125) = 250m$, but the COM needs $3m(100) = 300m$." },
        { text: "300 m", feedback: "You forgot to divide by the $2m$ of the larger piece." },
      ],
      hint: "Where does the COM land, and where does the small piece land?",
    },
    {
      type: "quiz",
      id: "mrg0-7-q7",
      variant: "mastery",
      question: "A 70 kg man stands at one end of a 3 m long, 140 kg boat at rest in still water. He walks to the other end. How far does he move relative to the shore?",
      options: [
        { text: "3 m", feedback: "3 m is relative to the boat, which slides back as he walks." },
        { text: "1 m", feedback: "1 m is the boat's displacement, in the opposite direction." },
        { text: "2 m", correct: true, feedback: "The boat moves back $\\frac{70 \\times 3}{210} = 1$ m, so he moves $3 - 1 = 2$ m over the ground." },
        { text: "1.5 m", feedback: "That comes from treating 3 m as his ground displacement: $\\frac{70 \\times 3}{140}$ for the boat, which is wrong." },
      ],
    },
    {
      type: "quiz",
      id: "mrg0-7-q8",
      variant: "mastery",
      question: "A 1 kg block is released from the top of a smooth $30^\\circ$ wedge of mass 3 kg on a smooth floor. The top of the slope is 0.5 m above the floor. How far has the wedge moved when the block reaches the floor?",
      options: [
        { text: "$\\dfrac{\\sqrt3}{8}$ m $\\approx 0.22$ m", correct: true, feedback: "Horizontal span of the slope $b = 0.5\\cot30^\\circ = \\frac{\\sqrt3}{2}$ m, and $d = \\frac{mb}{m + M} = \\frac{\\sqrt3/2}{4}$." },
        { text: "$\\dfrac{\\sqrt3}{6}$ m $\\approx 0.29$ m", feedback: "That is $\\frac{mb}{M}$: the relative span was treated as the block's ground displacement." },
        { text: "$\\dfrac18$ m", feedback: "You used the height, but the fixed-COM rule applies horizontally. The horizontal span is $0.5\\cot30^\\circ$." },
        { text: "$\\dfrac{3\\sqrt3}{8}$ m $\\approx 0.65$ m", feedback: "That is the block's horizontal displacement over the ground, $b - d$." },
      ],
    },
    {
      type: "quiz",
      id: "mrg0-7-q9",
      variant: "mastery",
      question: "A 1 kg particle moves at $(2\\hat i + 3\\hat j)$ m/s and a 2 kg particle at $(-\\hat i + \\hat j)$ m/s. What is the velocity of their COM?",
      options: [
        { text: "$\\left(\\frac12\\hat i + 2\\hat j\\right)$ m/s", feedback: "That is the plain average of the velocities. Weight each by its mass." },
        { text: "$5\\hat j$ m/s", feedback: "That is the total momentum. Divide by the total mass, 3 kg." },
        { text: "$\\left(\\frac43\\hat i + \\frac53\\hat j\\right)$ m/s", feedback: "The $x$-momenta are $+2$ and $-2$ kg m/s: they cancel." },
        { text: "$\\dfrac53\\hat j$ m/s", correct: true, feedback: "$\\vec P = (2 - 2)\\hat i + (3 + 2)\\hat j = 5\\hat j$ kg m/s; divide by 3 kg." },
      ],
    },
    {
      type: "quiz",
      id: "mrg0-7-q10",
      variant: "mastery",
      question: "Particles of 2 kg and 3 kg are released from rest 1 m apart in free space and move towards each other under their mutual attraction. Where do they collide?",
      options: [
        { text: "0.4 m from the 2 kg particle's starting point", feedback: "That is the distance from the 3 kg particle. The lighter particle travels further." },
        { text: "0.5 m from each", feedback: "The midpoint needs equal masses." },
        { text: "0.6 m from the 2 kg particle's starting point", correct: true, feedback: "The COM stays at rest; it is $\\frac{3 \\times 1}{5} = 0.6$ m from the 2 kg particle." },
        { text: "It depends on the strength of the attraction.", feedback: "The attraction is internal. It sets *when* they meet, not *where*." },
      ],
    },
    {
      type: "quiz",
      id: "mrg0-7-q11",
      variant: "mastery",
      question: "A block of mass $4m$ with a smooth hemispherical groove of radius $R$ rests on a smooth floor. A small ball of mass $m$ is released from rest at one rim of the groove. How far has the block moved when the ball first reaches the bottom of the groove?",
      options: [
        { text: "$\\dfrac R4$", feedback: "That is $\\frac{mR}{M}$, with the ball's relative displacement used as a ground displacement." },
        { text: "$\\dfrac R5$", correct: true, feedback: "Relative to the block the ball moves $R$ horizontally; the horizontal COM is fixed, so the block moves $\\frac{mR}{m + 4m} = \\frac R5$." },
        { text: "$\\dfrac{2R}{5}$", feedback: "That is the block's displacement when the ball reaches the *opposite rim*, a relative displacement of $2R$." },
        { text: "$\\dfrac{4R}{5}$", feedback: "That is the ball's own horizontal displacement over the ground." },
      ],
      hint: "Only the horizontal direction is free of external force.",
    },
    {
      type: "quiz",
      id: "mrg0-7-q12",
      variant: "mastery",
      question: "A toy is a uniform solid cone of height $h$ glued flat-face to flat-face onto a uniform solid hemisphere of the same radius $R$ and density. For which $h$ is the toy's COM exactly at the common circular face (so the toy balances in any tilted position)?",
      options: [
        { text: "$h = 2R$", feedback: "That uses $\\frac R2$ for the hemisphere, which is the *hollow* hemisphere's COM. A solid one has its COM at $\\frac{3R}{8}$." },
        { text: "$h = \\frac32 R$", feedback: "That puts the cone's COM at $\\frac h3$ from the base, the triangle's centroid. A solid cone's COM is at $\\frac h4$." },
        { text: "$h = R$", feedback: "Check the moments: with $h = R$ the cone gives $\\frac{R^4}{12}$ against the hemisphere's $\\frac{R^4}{4}$, so the COM would be inside the hemisphere." },
        { text: "$h = \\sqrt3\\,R$", correct: true, feedback: "Cone: mass $\\propto \\frac13R^2h$ at $\\frac h4$ above the face. Hemisphere: $\\propto \\frac23R^3$ at $\\frac{3R}{8}$ below. Equal moments: $\\frac{R^2h^2}{12} = \\frac{R^4}{4}$, so $h^2 = 3R^2$." },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "$\\vec P = M\\vec v_{cm}$ says that when no external force acts, the total momentum is constant. Chapter 1 takes that sentence seriously: recoil, impulses, rockets and every kind of collision all follow from it.",
    },
  ]),
};

export const mrgChapter0Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lessonMastery,
];
