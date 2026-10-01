import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Mechanics I Chapter 5 — Work, Energy and Power.
 * The second great tool after Newton's laws: work by constant and variable
 * forces, the work-energy theorem derived from F = mv dv/dx, conservative
 * forces and potential energy, potential-energy curves and equilibrium,
 * and power.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "work-done-by-a-constant-force",
  title: "5.1 · Work Done by a Constant Force",
  position: 1,
  blocks: blocks([
    {
      type: "text",
      content:
        "Carry a heavy school bag across a level corridor at a steady pace. You arrive tired, yet physics says you did **no work on the bag**. That sounds like a technicality, but it is the key to the whole chapter: in physics, *work* is not effort. It measures how much a force actually contributes to a body's motion, and a force at right angles to the motion contributes nothing.",
    },
    {
      type: "text",
      content:
        "Push a trolley with force $\\vec F$ while it moves through a displacement $\\vec s$. Split the force into a part along the displacement, $F\\cos\\theta$, and a part across it, $F\\sin\\theta$. Only the part along the path speeds the trolley up or slows it down; the part across it just presses sideways. So the useful measure is (part of the force along the path) × (distance):",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Work done by a constant force",
      content:
        "$W = \\vec F\\cdot\\vec s = Fs\\cos\\theta$, where $\\theta$ is the angle between $\\vec F$ and the displacement $\\vec s$ of the point where the force acts.\nWork is a **scalar**. SI unit: the joule, $1\\text{ J} = 1\\text{ N m}$.\nIn components: $W = F_x s_x + F_y s_y + F_z s_z$.",
    },
    {
      type: "text",
      content:
        "The sign carries meaning. $\\theta < 90^\\circ$: the force helps the motion, $W > 0$. $\\theta = 90^\\circ$: it neither helps nor hinders, $W = 0$. $\\theta > 90^\\circ$: it opposes the motion, $W < 0$. In the canvas, $\\vec s$ is the displacement and $\\vec F$ the force; drag $\\vec F$ around and watch the dot product.",
    },
    {
      type: "interactive",
      config: {
        component: "vec-canvas-2d",
        mode: "dot",
        a: [4, 0],
        b: [3, 2],
        labels: { a: "\\vec s", b: "\\vec F" },
        readouts: ["dot", "angle", "projection"],
        caption:
          "The shadow of F on s is the part of the force along the path. Swing F past 90° and the work changes sign.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: with $\\vec s = (4, 0)$ and $\\vec F = (3, 2)$, $W = 12$. Only the horizontal part of $\\vec F$ counts. At exactly $90^\\circ$ the work is zero however large the force is, and beyond $90^\\circ$ it is negative: the force is taking energy away.",
    },
    {
      type: "table",
      headers: ["Force", "Typical situation", "Sign of work"],
      rows: [
        ["Gravity", "body moving down / up", "positive / negative"],
        ["Normal force", "block sliding on a fixed surface", "zero ($\\perp$ to motion)"],
        ["Kinetic friction", "block sliding on a fixed floor", "negative"],
        ["Static friction", "box carried on an accelerating truck", "positive (!)"],
        ["Tension", "string pulling a block along its motion", "positive"],
        ["Centripetal force", "uniform circular motion", "zero (always $\\perp$ to velocity)"],
      ],
    },
    {
      type: "text",
      content:
        "**Total work.** If several forces act on a body, each does its own work. Since the dot product distributes, $\\sum(\\vec F_i\\cdot\\vec s) = \\big(\\sum\\vec F_i\\big)\\cdot\\vec s$: the total work of all the forces equals the work done by the **net** force. That fact becomes the work-energy theorem in Lesson 5.3.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (every force on a block).** A 2 kg block is pulled 5 m up a rough $37^\\circ$ incline ($\\sin 37^\\circ = 0.6$) by a rope parallel to the slope with tension 25 N; $\\mu_k = 0.25$. Find the work done by each force and the total.\n\n1. Tension, along the motion: $W_T = 25 \\times 5 = 125$ J.\n2. Gravity: the component along the slope is $mg\\sin 37^\\circ = 12$ N **down** the slope, opposite to the motion: $W_g = -12 \\times 5 = -60$ J. *Why this step:* equivalently the block rises $5 \\times 0.6 = 3$ m, and $-mgh = -60$ J.\n3. Normal force: perpendicular to the slope, so $W_N = 0$.\n4. Friction: $N = mg\\cos 37^\\circ = 16$ N, $f = 0.25 \\times 16 = 4$ N down the slope: $W_f = -20$ J.\n5. Total: $125 - 60 + 0 - 20 = 45$ J. Check with the net force: $25 - 12 - 4 = 9$ N up the slope, and $9 \\times 5 = 45$ J. ✓",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (vector form).** A force $\\vec F = 3\\hat i + 4\\hat j$ N moves a particle through $\\vec s = 2\\hat i - \\hat j$ m. Find the work.\n\n$W = (3)(2) + (4)(-1) = 6 - 4 = 2$ J. *Why this step:* the component formula needs no angle; the sign of each product tells you which parts of the force helped and which hindered.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (friction doing positive work).** A 20 kg box rides without slipping on the flat bed of a truck that accelerates from rest at 2 m/s² for 5 s. Find the work done by friction on the box (ground frame).\n\n1. The box accelerates at 2 m/s², and friction is the only horizontal force: $f = 20 \\times 2 = 40$ N **forward**.\n2. Displacement of the box in 5 s: $s = \\tfrac12 \\times 2 \\times 25 = 25$ m forward.\n3. $W_f = 40 \\times 25 = +1000$ J. *Why this step:* friction and displacement point the same way, so the work is positive. The box's kinetic energy at the end is $\\tfrac12 \\times 20 \\times 10^2 = 1000$ J, which is no coincidence (Lesson 5.3).",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (work depends on the frame).** In Worked example 3, a passenger in the truck sees the box sitting still. In the truck's frame the box's displacement is zero, so the work done by friction on it is zero. Work (and kinetic energy) depend on the frame; what stays true in every inertial frame is the *relation* between them. Always state the frame, and use the ground unless told otherwise.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (up and down).** A 0.2 kg ball is thrown straight up, rises 5 m and falls back to the thrower's hand. Find the work done by gravity on the way up, on the way down, and in total.\n\n1. Up: force $mg = 2$ N down, displacement 5 m up: $W = -10$ J.\n2. Down: both down: $W = +10$ J.\n3. Total: $0$. *Why this step:* the overall displacement is zero, and gravity is a constant force, so $\\vec F\\cdot\\vec s = 0$. (Air drag would do negative work on **both** legs; Lesson 5.4 explains why that difference matters.)",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"work by friction is always negative\"",
      content:
        "Kinetic friction on a body sliding over a **fixed** surface does negative work. But friction can drive motion: static friction on the box in the accelerating truck does $+1000$ J. Always compare the direction of the friction force with the displacement of the body it acts on.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"no motion ⇒ no work done by anything\"",
      content:
        "Work is done by a *force* on a *body*, using that body's displacement. If a wall does not move, your push does no work on it. But in the truck example the box moves in the ground frame, so friction on it does work even though the box is at rest *relative to the truck*. Check each force against the displacement of the body it acts on, in the stated frame.",
    },
    {
      type: "quiz",
      id: "mfe5-1-q1",
      variant: "practice",
      question: "A force $\\vec F = 2\\hat i + 3\\hat j - \\hat k$ N acts on a particle that moves through $\\vec s = \\hat i - \\hat j + 4\\hat k$ m. What work does it do?",
      options: [
        { text: "$9$ J", feedback: "That adds absolute values. Keep the signs: $2 + (-3) + (-4)$." },
        { text: "$(2, -3, -4)$ J", feedback: "Work is a scalar: add the products." },
        { text: "$-5$ J", correct: true, feedback: "$2 - 3 - 4 = -5$ J. The force opposes the motion overall." },
        { text: "$5$ J", feedback: "Check the signs: $(3)(-1) = -3$ and $(-1)(4) = -4$." },
      ],
    },
    {
      type: "quiz",
      id: "mfe5-1-q2",
      variant: "practice",
      question: "A 20 N force at $60^\\circ$ above the horizontal drags a sledge 10 m along level ground. What work does the force do?",
      options: [
        { text: "$100$ J", correct: true, feedback: "$20 \\times 10 \\times \\cos 60^\\circ = 100$ J." },
        { text: "$200$ J", feedback: "That treats the whole force as along the path. Only $20\\cos 60^\\circ$ is." },
        { text: "$100\\sqrt3$ J", feedback: "That uses $\\sin 60^\\circ$, the lifting part of the force." },
      ],
    },
    {
      type: "quiz",
      id: "mfe5-1-q3",
      variant: "concept",
      question: "A block slides down a fixed rough incline. Which force does zero work on it?",
      options: [
        { text: "Gravity", feedback: "The block moves down, so gravity does positive work." },
        { text: "Friction", feedback: "Friction opposes the sliding, so it does negative work." },
        { text: "The normal force", correct: true, feedback: "It is perpendicular to the surface, and the block moves along the surface." },
      ],
    },
    {
      type: "quiz",
      id: "mfe5-1-q4",
      variant: "practice",
      question: "A 3 kg block slides 5 m down a $37^\\circ$ incline ($\\sin 37^\\circ = 0.6$). How much work does gravity do?",
      options: [
        { text: "$150$ J", feedback: "That uses the full 5 m as a vertical drop. The block drops only $5\\sin 37^\\circ = 3$ m." },
        { text: "$90$ J", correct: true, feedback: "$mgh = 30 \\times 3 = 90$ J, or $mg\\sin 37^\\circ \\times 5$." },
        { text: "$120$ J", feedback: "That uses $\\cos 37^\\circ$. The component of gravity along the slope is $mg\\sin\\theta$." },
        { text: "$-90$ J", feedback: "The block moves down, with gravity: the work is positive." },
      ],
    },
    {
      type: "quiz",
      id: "mfe5-1-q5",
      variant: "concept",
      question: "You pull a box across a rough floor at constant velocity. What is the total work done on the box by all forces?",
      options: [
        { text: "Zero", correct: true, feedback: "Constant velocity means zero net force, and the total work equals the work of the net force." },
        { text: "Positive, equal to the work you do", feedback: "Friction does an equal amount of negative work." },
        { text: "Negative, because friction wins", feedback: "If friction won the box would slow down." },
      ],
    },
    {
      type: "quiz",
      id: "mfe5-1-q6",
      variant: "concept",
      question: "A stone moves in a horizontal circle at constant speed on a string. How much work does the tension do in one full revolution?",
      options: [
        { text: "$T \\times 2\\pi r$", feedback: "That would be true if the tension pointed along the motion. It points to the centre, at $90^\\circ$ to the velocity." },
        { text: "$\\frac{mv^2}{r} \\times 2r$", feedback: "The displacement across a diameter is not the relevant path; at every moment the force is perpendicular to the motion." },
        { text: "Zero", correct: true, feedback: "The tension is perpendicular to the velocity at every instant, so every small bit of work is zero." },
      ],
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "work-done-by-a-variable-force",
  title: "5.2 · Work Done by a Variable Force",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "Stretch a spring. The first centimetre is easy; each further centimetre is harder, because the force you need grows with the stretch. \"Force × distance\" no longer makes sense when the force keeps changing. The fix is the same one calculus always uses: chop the path into pieces so small that the force is nearly constant on each.",
    },
    {
      type: "text",
      content:
        "Let a force $F(x)$ act along the $x$-axis as a body moves from $x_1$ to $x_2$. Split the path into small steps $\\Delta x$. On each, the force is roughly constant and does work $F(x)\\,\\Delta x$, the area of a thin strip under the $F$-$x$ graph. Adding the strips and letting $\\Delta x \\to 0$:",
    },
    {
      type: "math",
      latex: "W = \\lim_{\\Delta x \\to 0}\\sum F(x)\\,\\Delta x = \\int_{x_1}^{x_2} F(x)\\,dx",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Work by a variable force",
      content:
        "$W = \\displaystyle\\int \\vec F\\cdot d\\vec s$; along a line, $W = \\displaystyle\\int_{x_1}^{x_2} F(x)\\,dx$ = the **signed area under the $F$-$x$ graph**.\nArea above the axis (force along $+x$, motion along $+x$) counts positive; area below counts negative.",
    },
    {
      type: "text",
      content:
        "**The spring.** An ideal spring stretched or compressed by $x$ from its natural length pulls back with $F = -kx$ (Hooke's law; $k$ is the spring constant in N/m). Its $F$-$x$ graph is a straight line through the origin, so the area is a triangle. As the spring relaxes from compression $x_0$ to its natural length, it pushes the block the way it moves, and does work $\\tfrac12 kx_0^2$. The lab below shows that triangle growing as the block moves.",
    },
    {
      type: "interactive",
      config: {
        component: "mfe-force-lab",
        mode: "spring",
        sliders: { mu: { min: 0, max: 0, step: 0.05, initial: 0 } },
        showGraph: true,
        caption:
          "A smooth floor (μ pinned at 0). Move the block from its release point towards the natural length and watch the shaded area under the F-x line: that is the spring's work.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: with $k = 100$ N/m and $x_0 = 0.5$ m, the full triangle has area $\\tfrac12 \\times 0.5 \\times 50 = 12.5$ J. Half of the distance does *not* give half of the work: the first half of the relaxation (from 0.5 m to 0.25 m) is where the force is largest, and it delivers $\\tfrac34$ of the total.",
    },
    {
      type: "text",
      content:
        "In general, the work done **by the spring** as its deformation changes from $x_1$ to $x_2$ is",
    },
    {
      type: "math",
      latex: "W_{\\text{spring}} = \\int_{x_1}^{x_2}(-kx)\\,dx = \\tfrac12 kx_1^2 - \\tfrac12 kx_2^2",
    },
    {
      type: "text",
      content:
        "It is positive when the spring relaxes ($|x_2| < |x_1|$) and negative when it is further deformed. The work *you* do to deform it slowly is the negative of this.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (a polynomial force).** A force $F = (3x^2 + 2)$ N acts along $x$. Find the work as the particle moves from $x = 1$ m to $x = 2$ m.\n\n1. $W = \\displaystyle\\int_1^2 (3x^2 + 2)\\,dx = \\big[x^3 + 2x\\big]_1^2$. *Why this step:* the force changes along the path, so integrate instead of multiplying.\n2. $= (8 + 4) - (1 + 2) = 9$ J.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (reading a graph).** A force along $x$ rises linearly from 0 to 10 N between $x = 0$ and 2 m, stays at 10 N until $x = 4$ m, then falls linearly to $-10$ N at $x = 8$ m. Find the work from $x = 0$ to $x = 8$ m.\n\n1. 0 to 2 m: triangle, $\\tfrac12 \\times 2 \\times 10 = 10$ J.\n2. 2 to 4 m: rectangle, $2 \\times 10 = 20$ J.\n3. 4 to 6 m: the force falls from 10 N to 0: triangle above the axis, $+10$ J.\n4. 6 to 8 m: the force goes from 0 to $-10$ N: triangle below the axis, $-10$ J. *Why this step:* below the axis the force opposes the $+x$ motion, so this area is negative work.\n5. Total: $10 + 20 + 10 - 10 = 30$ J.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (the second stretch costs more).** A spring has $k = 500$ N/m. Compare the work needed to stretch it from 0 to 2 cm with that from 2 cm to 4 cm.\n\n1. 0 to 2 cm: $\\tfrac12 \\times 500 \\times (0.02)^2 = 0.1$ J.\n2. 2 to 4 cm: $\\tfrac12 \\times 500 \\times (0.04^2 - 0.02^2) = 250 \\times 0.0012 = 0.3$ J. *Why this step:* the work is the difference of the two $\\tfrac12 kx^2$ values, not $\\tfrac12 k(\\Delta x)^2$.\n3. The second 2 cm takes **three times** as much work: on the graph, the second strip is a trapezium with three times the triangle's area.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (cutting a spring).** A spring of $k = 200$ N/m is cut into two equal halves. How much work is needed to stretch one half by 5 cm?\n\n1. The same tension now stretches a half-spring only half as much (each half of the original spring carried the full tension and provided half the stretch), so $k_{\\text{half}} = 2k = 400$ N/m. *Why this step:* $k$ measures force per unit stretch, and a shorter spring stretches less under the same force.\n2. $W = \\tfrac12 \\times 400 \\times 0.05^2 = 0.5$ J (twice what the whole spring would need for the same 5 cm).",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"work by a spring is $kx \\cdot x$\"",
      content:
        "$kx$ is the force only at the *final* deformation. The force grows from zero, so its average over the stretch is $\\tfrac12 kx$, and the work is $\\tfrac12 kx^2$, the triangle, not the rectangle $kx^2$.",
    },
    {
      type: "quiz",
      id: "mfe5-2-q1",
      variant: "practice",
      question: "A force $F = 6x$ N acts along $x$. How much work does it do as the particle moves from $x = 0$ to $x = 2$ m?",
      options: [
        { text: "$24$ J", feedback: "That is $F(2) \\times 2 = 12 \\times 2$, a rectangle. The force grows from zero." },
        { text: "$12$ J", correct: true, feedback: "$\\int_0^2 6x\\,dx = [3x^2]_0^2 = 12$ J." },
        { text: "$6$ J", feedback: "Check the integral: $\\int 6x\\,dx = 3x^2$." },
      ],
    },
    {
      type: "quiz",
      id: "mfe5-2-q2",
      variant: "practice",
      question: "A spring ($k = 200$ N/m) is slowly stretched from 10 cm to 20 cm extension. How much work is done by the stretching agent?",
      options: [
        { text: "$1$ J", feedback: "That is $\\tfrac12 k(\\Delta x)^2$ with $\\Delta x = 0.1$ m. Use the difference of $\\tfrac12 kx^2$ values." },
        { text: "$4$ J", feedback: "That is the work from 0 to 20 cm. The spring started already stretched by 10 cm." },
        { text: "$-3$ J", feedback: "That is the work done *by the spring*. The agent pulls along the stretch, doing positive work." },
        { text: "$3$ J", correct: true, feedback: "$\\tfrac12 \\times 200 \\times (0.04 - 0.01) = 3$ J." },
      ],
    },
    {
      type: "quiz",
      id: "mfe5-2-q3",
      variant: "practice",
      question: "The force on a particle rises linearly from 0 at $x = 0$ to 20 N at $x = 4$ m. What work does it do over this interval?",
      options: [
        { text: "$80$ J", feedback: "That is the rectangle $20 \\times 4$. The graph is a triangle." },
        { text: "$40$ J", correct: true, feedback: "Area $= \\tfrac12 \\times 4 \\times 20 = 40$ J." },
        { text: "$20$ J", feedback: "That halves one time too many." },
      ],
    },
    {
      type: "quiz",
      id: "mfe5-2-q4",
      variant: "concept",
      question: "A block attached to a spring moves from compression 3 cm to extension 3 cm. What is the total work done by the spring?",
      options: [
        { text: "$\\tfrac12 k(0.06)^2$", feedback: "The spring helps on the first half and resists on the second." },
        { text: "$-\\tfrac12 k(0.06)^2$", feedback: "Only the start and end deformations matter, and they are equal in size." },
        { text: "Zero", correct: true, feedback: "$\\tfrac12 k(0.03)^2 - \\tfrac12 k(0.03)^2 = 0$: positive work while relaxing, equal negative work while stretching." },
      ],
    },
    {
      type: "quiz",
      id: "mfe5-2-q5",
      variant: "practice",
      question: "Stretching a spring from 0 to 1 cm takes 0.2 J. How much work is needed to stretch it further, from 1 cm to 3 cm?",
      options: [
        { text: "$1.6$ J", correct: true, feedback: "0 to 3 cm takes $0.2 \\times 9 = 1.8$ J; subtract the first 0.2 J." },
        { text: "$0.4$ J", feedback: "That scales with the distance. Work goes as $x^2$." },
        { text: "$1.8$ J", feedback: "That is from 0 to 3 cm. The first 0.2 J is already done." },
        { text: "$0.8$ J", feedback: "That is $0.2 \\times 2^2$, treating the 2 cm stretch as if it started from zero." },
      ],
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "the-work-energy-theorem",
  title: "5.3 · The Work–Energy Theorem",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "In Chapter 1 you learnt to find a stopping distance by choosing the right kinematics equation. In Chapter 4 you found the speed of a bob in a vertical circle by integrating $v\\,dv$. Both were the same calculation in disguise, and this lesson packages it once and for all.",
    },
    {
      type: "text",
      content:
        "**Derivation.** Let the net force $F$ act on a body of mass $m$ moving along $x$. Write the acceleration with the chain rule, $a = \\frac{dv}{dt} = \\frac{dv}{dx}\\frac{dx}{dt} = v\\frac{dv}{dx}$, so Newton's second law reads $F = mv\\frac{dv}{dx}$. Multiply by $dx$ and integrate from the start (speed $u$) to the end (speed $v$):",
    },
    {
      type: "math",
      latex: "\\int_{x_1}^{x_2} F\\,dx = \\int_u^v mv\\,dv = \\tfrac12 mv^2 - \\tfrac12 mu^2",
    },
    {
      type: "text",
      content:
        "The left side is the work done by the net force, which is the total work of all the forces (Lesson 5.1). The right side is the change of a quantity that depends only on the mass and the speed.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Kinetic energy and the work-energy theorem",
      content:
        "The kinetic energy of a body is $K = \\tfrac12 mv^2 = \\dfrac{p^2}{2m}$ (a scalar, never negative).\n**Work-energy theorem:** the total work done by all forces on a body equals the change in its kinetic energy:\n$W_{\\text{all}} = K_f - K_i = \\Delta K$.",
    },
    {
      type: "text",
      content:
        "Why it is powerful: it needs only the start and end, not the time, and it works for any force, however it varies, because the integral took care of that. When a problem gives distances and speeds but not times, think energy first.",
    },
    {
      type: "text",
      content:
        "**Spring and friction together.** A block is pushed against a spring, compressing it by $x_0$, and released on a rough floor. The spring does positive work, friction does negative work, and the kinetic energy is what is left:",
    },
    {
      type: "interactive",
      config: {
        component: "mfe-force-lab",
        mode: "spring",
        showGraph: true,
        caption:
          "m = 1 kg, k = 100 N/m, x₀ = 0.5 m, μ = 0.1. Slide the block through its first pass and watch the energy bars: spring energy becomes kinetic energy and heat.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the kinetic energy peaks **before** the natural length, at the point where the spring force $kx$ has fallen to the friction force $\\mu mg = 1$ N, i.e. at $x = 0.01$ m of compression. Past that, friction beats the spring and the block slows. The pass ends at $0.48$ m of *extension*, not $0.5$ m: each pass loses $2\\mu mg/k = 0.02$ m of amplitude.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (the spring block, numbers).** Using the lab's values, find the greatest speed and where the block first stops.\n\n1. Speed is greatest where the net force is zero: $kx = \\mu mg$, so $x = \\dfrac{1}{100} = 0.01$ m (still compressed). *Why this step:* $K$ stops growing exactly when the net force, and so the work per step, changes sign.\n2. Work-energy from $x_0 = 0.5$ to $x = 0.01$: spring work $\\tfrac12 \\times 100 \\times (0.25 - 0.0001) = 12.495$ J; friction work $-1 \\times 0.49 = -0.49$ J. So $\\tfrac12 v^2 = 12.005$, $v^2 = 24.01$ and $v_{\\max} = 4.9$ m/s.\n3. First stop at extension $x_1$: $\\tfrac12 k x_0^2 - \\tfrac12 k x_1^2 = \\mu mg(x_0 + x_1)$. Dividing by $(x_0 + x_1)$: $\\tfrac12 k(x_0 - x_1) = \\mu mg$, so $x_1 = x_0 - \\dfrac{2\\mu mg}{k} = 0.5 - 0.02 = 0.48$ m.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (stopping distance in one line).** A car moving at 20 m/s brakes with its wheels locked on a road with $\\mu_k = 0.5$. How far does it skid?\n\n1. Only friction does work (gravity and $N$ are perpendicular to the motion): $-\\mu mg\\,d = 0 - \\tfrac12 mv^2$.\n2. $d = \\dfrac{v^2}{2\\mu g} = \\dfrac{400}{10} = 40$ m. *Why this step:* the mass cancels and $d \\propto v^2$; at 40 m/s the skid is 160 m, four times as long.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (bullet in a block).** A bullet loses half its speed after penetrating 3 cm into a wooden block. How much further does it go (assume a constant resistive force)?\n\n1. Losing half the speed means the KE falls from $K$ to $\\tfrac14 K$: the first 3 cm removed $\\tfrac34 K$. *Why this step:* KE goes as $v^2$, so half the speed is a quarter of the energy.\n2. A constant force removes KE in proportion to distance: $\\tfrac34 K$ per 3 cm, so $\\tfrac14 K$ per 1 cm.\n3. The remaining $\\tfrac14 K$ lasts exactly 1 cm more.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (work by friction from $\\Delta K$).** A 1 kg block is released from rest at the top of a rough curved track 5 m high and reaches the bottom at 8 m/s. How much work did friction do?\n\n1. Work-energy: $W_g + W_N + W_f = \\Delta K$. Gravity: $mgh = 50$ J. Normal force: zero (always perpendicular to the track).\n2. $\\Delta K = \\tfrac12 \\times 1 \\times 64 = 32$ J.\n3. $W_f = 32 - 50 = -18$ J. *Why this step:* friction's force varies round the curve and would be hopeless to integrate directly; the theorem sidesteps it.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (chain on a table).** A uniform 3 kg chain, 1.8 m long, lies on a smooth table with one third of its length hanging over the edge. How much work is needed to pull the hanging part slowly back onto the table?\n\n1. The hanging part has mass 1 kg and length 0.6 m; its centre of mass is 0.3 m below the table top.\n2. Pulling slowly, $\\Delta K = 0$, so $W_{\\text{you}} + W_g = 0$.\n3. Gravity does $W_g = -(1)(10)(0.3) = -3$ J as that part rises 0.3 m. *Why this step:* for an extended body, gravity's work depends on how far its centre of mass rises.\n4. $W_{\\text{you}} = 3$ J. In general $\\dfrac{MgL}{2n^2}$ for a fraction $\\frac1n$ hanging: here $\\frac{3 \\times 10 \\times 1.8}{18} = 3$ J.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "$K = \\frac{p^2}{2m}$",
      content:
        "Two bodies with the **same momentum**: the lighter one has more kinetic energy. Two bodies with the **same kinetic energy**: the heavier one has more momentum, $p = \\sqrt{2mK}$. Both facts turn up in collision problems.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the work-energy theorem only works for constant forces\"",
      content:
        "It is the integral of Newton's second law along the path, so it holds for **any** force: springs, friction on a curved track, gravity far from the Earth. Constant forces were only the case where the integral is a simple product.",
    },
    {
      type: "quiz",
      id: "mfe5-3-q1",
      variant: "practice",
      question: "A car skids 20 m to rest from 36 km/h. How far would it skid from 72 km/h on the same road?",
      options: [
        { text: "$40$ m", feedback: "Stopping distance goes as $v^2$, not $v$." },
        { text: "$20\\sqrt2$ m", feedback: "That scales with $\\sqrt v$. The work-energy theorem gives $d \\propto v^2$." },
        { text: "$80$ m", correct: true, feedback: "Doubling the speed quadruples the KE, and the same friction needs four times the distance." },
      ],
    },
    {
      type: "quiz",
      id: "mfe5-3-q2",
      variant: "practice",
      question: "A 2 kg block slides from rest down a rough ramp that drops 4 m and arrives at the bottom at 6 m/s. What work did friction do?",
      options: [
        { text: "$-36$ J", feedback: "36 J is the final KE, not the loss." },
        { text: "$44$ J", feedback: "Friction took energy away; its work is negative." },
        { text: "$-44$ J", correct: true, feedback: "$W_f = \\Delta K - W_g = 36 - 80 = -44$ J." },
        { text: "$-80$ J", feedback: "That would leave the block with no KE at all." },
      ],
    },
    {
      type: "quiz",
      id: "mfe5-3-q3",
      variant: "concept",
      question: "A proton and an alpha particle (4 times the mass) have the same kinetic energy. What is the ratio of their momenta $p_{\\text{proton}} : p_{\\alpha}$?",
      options: [
        { text: "$1 : 2$", correct: true, feedback: "$p = \\sqrt{2mK}$, so $p \\propto \\sqrt m$: $\\sqrt1 : \\sqrt4$." },
        { text: "$1 : 4$", feedback: "Momentum goes as $\\sqrt m$ at fixed KE, not as $m$." },
        { text: "$2 : 1$", feedback: "The heavier particle has the larger momentum at the same KE." },
        { text: "$1 : 1$", feedback: "Equal KE does not mean equal momentum unless the masses are equal." },
      ],
    },
    {
      type: "quiz",
      id: "mfe5-3-q4",
      variant: "practice",
      question: "A bullet moving at 200 m/s emerges from a plank at 100 m/s. How many more identical planks can it pass through completely (same resistance)?",
      options: [
        { text: "One more", feedback: "A plank removes KE, not speed, in equal amounts. The next 100 m/s would need three quarters of the original KE, but only a quarter is left." },
        { text: "Three more", feedback: "The remaining KE is a third of *one* plank's worth, not three planks' worth." },
        { text: "None: it stops inside the second plank.", correct: true, feedback: "One plank removes $\\tfrac34$ of the initial KE; only $\\tfrac14$ is left, a third of what a plank takes." },
      ],
      hint: "Compare $\\frac12 m(200^2 - 100^2)$ with $\\frac12 m(100^2)$.",
    },
    {
      type: "quiz",
      id: "mfe5-3-q5",
      variant: "practice",
      question: "A 2 kg block is released from a spring ($k = 200$ N/m) compressed by 0.2 m on a floor with $\\mu = 0.2$. At what compression is its speed greatest?",
      options: [
        { text: "At the natural length, $x = 0$", feedback: "At $x = 0$ the spring force is zero and friction is already decelerating the block." },
        { text: "$x = 0.02$ m", correct: true, feedback: "Where $kx = \\mu mg$: $x = \\frac{0.2 \\times 20}{200} = 0.02$ m." },
        { text: "$x = 0.04$ m", feedback: "That is $\\frac{2\\mu mg}{k}$, the amplitude lost per pass, not the point of maximum speed." },
        { text: "$x = 0.1$ m", feedback: "Halfway is not special. The speed is greatest where the net force is zero." },
      ],
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "conservative-forces-and-mechanical-energy",
  title: "5.4 · Conservative Forces and Conservation of Mechanical Energy",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "Lift a 1 kg book from the floor to a shelf 2 m up. Straight up, or up a zig-zag staircase, or round the room first: gravity does $-20$ J of work on the book every time. Now drag the same book 2 m across a rough floor, then drag it 2 m by a winding route that is 10 m long. Friction's work is five times bigger on the long route. Gravity cares only about where you start and finish; friction cares about the whole journey. That difference splits all forces into two kinds.",
    },
    {
      type: "text",
      content:
        "**Why gravity is path-independent.** Near the Earth gravity is the constant vector $-mg\\,\\hat j$. On any path from A to B, $W = \\vec F\\cdot\\vec s_{\\text{total}}$ summed over little steps, and only the vertical part of each step counts. The vertical steps add up to the total change in height, whatever the path does in between: $W_g = -mg(h_B - h_A)$. Friction, by contrast, always opposes the motion, so every step adds more negative work, and a longer path means more of it.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Conservative force and potential energy",
      content:
        "A force is **conservative** if the work it does between two points is the same for every path (equivalently, zero round any closed path). Gravity and the spring force are conservative; friction and air drag are not.\nFor a conservative force we define a **potential energy** $U$ by\n$\\Delta U = U_B - U_A = -W_{\\text{cons}}(A \\to B)$.\nAlong a line, $F = -\\dfrac{dU}{dx}$.",
    },
    {
      type: "text",
      content:
        "The minus sign means: when the force does positive work, the potential energy falls, so energy is being handed from $U$ to something else. Two potential energies cover this course:",
    },
    {
      type: "table",
      headers: ["Force", "Work from A to B", "Potential energy", "Check: $-dU/dx$"],
      rows: [
        ["Gravity near the Earth", "$-mg(h_B - h_A)$", "$U = mgh$", "$-mg$ (downward, along $-h$)"],
        ["Spring $F = -kx$", "$\\tfrac12 kx_A^2 - \\tfrac12 kx_B^2$", "$U = \\tfrac12 kx^2$", "$-kx$ ✓"],
      ],
    },
    {
      type: "text",
      content:
        "**Conservation of mechanical energy.** Split the total work into conservative and non-conservative parts. The work-energy theorem gives $W_{\\text{cons}} + W_{\\text{nc}} = \\Delta K$, and $W_{\\text{cons}} = -\\Delta U$. Rearranging:",
    },
    {
      type: "math",
      latex: "W_{\\text{nc}} = \\Delta K + \\Delta U = \\Delta(K + U)",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Mechanical energy",
      content:
        "$E = K + U$. If only conservative forces do work ($W_{\\text{nc}} = 0$), then $E$ is constant:\n$K_i + U_i = K_f + U_f$.\nForces that do no work (like the normal force on a fixed surface, or a string's tension on a pendulum bob) do not spoil conservation.",
    },
    {
      type: "text",
      content:
        "Now the vertical circle of Chapter 4 takes one line. Between the bottom and angle $\\theta$ the bob rises $R(1 - \\cos\\theta)$, and the tension does no work:",
    },
    {
      type: "math",
      latex: "\\tfrac12 mu^2 = \\tfrac12 mv^2 + mgR(1 - \\cos\\theta) \\quad\\Rightarrow\\quad v^2 = u^2 - 2gR(1 - \\cos\\theta)",
    },
    {
      type: "interactive",
      config: {
        component: "mfe-force-lab",
        mode: "vertical-circle",
        showGraph: true,
        caption:
          "Slide θ round the loop and watch the energy bars. Kinetic and potential energy trade off, and their sum stays fixed.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: with $m = 1$ kg, $R = 1$ m and $u = 8$ m/s, the total is always $\\tfrac12 \\times 64 = 32$ J. At the top the potential energy is $mg(2R) = 20$ J and the kinetic energy has fallen to 12 J. The string tension never changes the total, because it is always perpendicular to the motion.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (loop-the-loop).** A small ball is released from rest at height $h$ on a smooth track that runs into a vertical loop of radius $R$. Find the least $h$ for the ball to go round the loop.\n\n1. At the top of the loop, contact needs $N \\ge 0$: $N + mg = \\frac{mv_{\\text{top}}^2}{R}$, so $v_{\\text{top}}^2 \\ge gR$. *Why this step:* Newton's law at one point sets the condition; energy then links that point to the start.\n2. Energy from release to the top of the loop (height $2R$): $mgh = mg(2R) + \\tfrac12 mv_{\\text{top}}^2 \\ge 2mgR + \\tfrac12 mgR$.\n3. $h \\ge \\tfrac52 R$. For $R = 0.4$ m, the least release height is 1 m.\n4. Bonus: at the bottom of the loop, $v^2 = 2gh = 5gR$, so $N = mg + \\frac{m \\cdot 5gR}{R} = 6mg$.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (ramp into a spring).** A 2 kg block slides from rest down a smooth ramp of height 0.8 m and then along a smooth floor into a spring of $k = 800$ N/m. Find the maximum compression.\n\n1. At maximum compression the block is momentarily at rest: all the initial PE is now spring PE. *Why this step:* choose the two instants where $K = 0$, and the kinetic terms disappear.\n2. $mgh = \\tfrac12 kx^2$: $2 \\times 10 \\times 0.8 = 400x^2$, so $x^2 = 0.04$ and $x = 0.2$ m.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (pendulum).** A bob on a 2.5 m string is released from rest with the string at $60^\\circ$ to the vertical. Find its speed at the bottom and the tension there, per unit of $mg$.\n\n1. Drop in height: $l(1 - \\cos 60^\\circ) = 1.25$ m.\n2. $v^2 = 2g \\times 1.25 = 25$, so $v = 5$ m/s.\n3. At the bottom: $T - mg = \\frac{mv^2}{l} = m \\times 10$, so $T = 2mg$.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (bead on a wire).** A bead slides without friction along a twisting wire, starting from rest at a height of 5 m. How fast is it moving where the wire is 1.8 m high?\n\n1. The wire's normal force is always perpendicular to the bead's motion, so it does no work. *Why this step:* the wire's shape is irrelevant; only the heights matter.\n2. $\\tfrac12 v^2 = g(5 - 1.8) = 32$, so $v = 8$ m/s.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (where did the energy go?).** A 2 kg block slides from rest down a rough slope of height 5 m and reaches the bottom at 6 m/s. How much mechanical energy was lost?\n\n1. $E_i = mgh = 100$ J (taking $U = 0$ at the bottom). $E_f = \\tfrac12 \\times 2 \\times 36 = 36$ J.\n2. $W_{\\text{nc}} = E_f - E_i = -64$ J: friction turned 64 J into heat in the block and the slope.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"potential energy belongs to the body alone\"",
      content:
        "Gravitational PE belongs to the **body–Earth system**, spring PE to the **spring** (with whatever it is attached to). And its zero is a free choice: measure $h$ from the floor or from the table and every $U$ shifts by the same constant. Only **differences** in $U$ are physical, which is why $\\Delta U$, not $U$, appears in every equation.",
    },
    {
      type: "quiz",
      id: "mfe5-4-q1",
      variant: "practice",
      question: "A ball is released from rest on a smooth track and must loop a vertical circle of radius 0.6 m. What is the least release height above the bottom of the loop?",
      options: [
        { text: "$1.5$ m", correct: true, feedback: "$h = \\frac52 R = 1.5$ m." },
        { text: "$1.2$ m", feedback: "That only reaches the top of the loop with zero speed, but the ball would fall off before getting there." },
        { text: "$3$ m", feedback: "That is $5R$. Energy gives $v^2 = 2gh$, and the loop needs $v^2 = 5gR$ at the bottom, so $h = \\frac52 R$." },
        { text: "$0.6$ m", feedback: "That would reach only the level of the loop's centre." },
      ],
    },
    {
      type: "quiz",
      id: "mfe5-4-q2",
      variant: "practice",
      question: "A 0.5 kg block slides from rest down a smooth 0.9 m high ramp into a spring of $k = 900$ N/m. What is the maximum compression?",
      options: [
        { text: "$0.01$ m", feedback: "That is $x^2$." },
        { text: "$\\sqrt{0.005} \\approx 0.07$ m", feedback: "That forgets the $\\tfrac12$ in the spring's PE." },
        { text: "$0.1$ m", correct: true, feedback: "$0.5 \\times 10 \\times 0.9 = \\tfrac12 \\times 900 \\times x^2$, so $x^2 = 0.01$." },
      ],
    },
    {
      type: "quiz",
      id: "mfe5-4-q3",
      variant: "concept",
      question: "Which of these forces is non-conservative?",
      options: [
        { text: "The gravitational force of the Earth", feedback: "Gravity's work depends only on the change of height." },
        { text: "Air resistance on a moving ball", correct: true, feedback: "It always opposes motion, so it does negative work on every leg and more on longer paths." },
        { text: "The force of an ideal spring", feedback: "Its work depends only on the initial and final extensions." },
      ],
    },
    {
      type: "quiz",
      id: "mfe5-4-q4",
      variant: "practice",
      question: "The potential energy of a particle is $U = 5x^2 - 3x$ J ($x$ in m). What force acts on it at $x = 1$ m?",
      options: [
        { text: "$7$ N (along $+x$)", feedback: "$dU/dx = 7$, but the force is **minus** the slope." },
        { text: "$2$ N", feedback: "That is $U(1)$. The force comes from the slope of $U$, not its value." },
        { text: "$-10$ N", feedback: "You dropped the $-3$ from the derivative." },
        { text: "$-7$ N (along $-x$)", correct: true, feedback: "$F = -\\frac{dU}{dx} = -(10x - 3) = -7$ N." },
      ],
    },
    {
      type: "quiz",
      id: "mfe5-4-q5",
      variant: "practice",
      question: "A bob on a 0.8 m string is released from rest with the string horizontal. What is its speed at the lowest point?",
      options: [
        { text: "$\\sqrt8 \\approx 2.8$ m/s", feedback: "That uses $v^2 = gh$; energy gives $v^2 = 2gh$." },
        { text: "$4$ m/s", correct: true, feedback: "It drops 0.8 m: $v = \\sqrt{2 \\times 10 \\times 0.8} = 4$ m/s." },
        { text: "$16$ m/s", feedback: "That is $v^2$." },
      ],
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "potential-energy-curves-and-equilibrium",
  title: "5.5 · Potential Energy Curves and Equilibrium",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "A roller coaster car coasting without an engine is a perfect picture of energy conservation: where the track is low it is fast, where the track is high it is slow, and it can never climb above the height at which its kinetic energy would run out. Every one-dimensional motion under a conservative force is that roller coaster, with the **graph of $U(x)$** as the track.",
    },
    {
      type: "text",
      content:
        "**Reading the graph.** Draw a horizontal line at the total energy $E$. At any $x$, the kinetic energy is the gap between the line and the curve, $K = E - U(x)$. Since $K \\ge 0$, the particle can only be where $U(x) \\le E$. Where the line meets the curve, $K = 0$: these are the **turning points**, where the particle stops and reverses.",
    },
    {
      type: "text",
      content:
        "**The force is minus the slope.** From $F = -\\frac{dU}{dx}$: where the curve slopes down to the right, $F > 0$ and the particle is pushed to the right; where it slopes up, $F < 0$. The force always points **downhill** on the $U$ graph, like gravity on a real track. Explore the double well $U(x) = x^4 - 4x^2$ (with $x$ as the position in metres and $U$ in joules):",
    },
    {
      type: "interactive",
      config: {
        component: "graph-explorer",
        expr: "x^4 - 4*x^2",
        exprLatex: "x^4 - 4x^2",
        window: { xmin: -2.5, xmax: 2.5, ymin: -5, ymax: 5 },
        initial: 1,
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: two valleys at $x = \\pm\\sqrt2 \\approx \\pm1.41$, where $U = 4 - 8 = -4$ J, separated by a hump at $x = 0$ with $U = 0$. A particle with $E = -2$ J is trapped in one valley or the other; one with $E = +1$ J can roll over the hump and visit both. Now look at the slope, which is the force with its sign flipped:",
    },
    {
      type: "interactive",
      config: {
        component: "secant-explorer",
        expr: "x^4 - 4*x^2",
        exprLatex: "x^4 - 4x^2",
        x1: 1,
        min: 1.05,
        max: 2.2,
        step: 0.05,
        initial: 2,
        window: { xmin: -2.5, xmax: 2.5, ymin: -5, ymax: 5 },
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: as the second point slides towards $x = 1$, the secant slope settles on the tangent slope $U'(1) = 4 - 8 = -4$ J/m. So the force at $x = 1$ is $F = +4$ N, pushing the particle to the right, towards the bottom of the valley at $\\sqrt2$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Equilibrium and its nature",
      content:
        "A particle is in **equilibrium** where $F = -\\frac{dU}{dx} = 0$: a flat point of the curve.\n- **Stable** at a minimum of $U$ ($\\frac{d^2U}{dx^2} > 0$): a small displacement produces a force back towards equilibrium.\n- **Unstable** at a maximum ($\\frac{d^2U}{dx^2} < 0$): a small displacement produces a force pushing it further away.\n- **Neutral** where $U$ is constant nearby: displaced, it stays put.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (the double well).** For $U = x^4 - 4x^2$, find the equilibria and their nature.\n\n1. $\\frac{dU}{dx} = 4x^3 - 8x = 4x(x^2 - 2) = 0$: $x = 0$ or $x = \\pm\\sqrt2$.\n2. $\\frac{d^2U}{dx^2} = 12x^2 - 8$. At $x = 0$: $-8 < 0$, **unstable**. At $x = \\pm\\sqrt2$: $24 - 8 = 16 > 0$, **stable**. *Why this step:* the second derivative says whether the flat point is a valley or a hilltop.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (allowed region).** A 1 kg particle moves in this potential with total energy $E = -2$ J. Where can it be, and what is its greatest speed?\n\n1. Allowed: $x^4 - 4x^2 \\le -2$. Put $u = x^2$: $u^2 - 4u + 2 \\le 0$, so $2 - \\sqrt2 \\le u \\le 2 + \\sqrt2$.\n2. So $0.765 \\lesssim |x| \\lesssim 1.848$: two separate intervals. The particle stays in whichever valley it starts in. *Why this step:* the hump at $x = 0$ has $U = 0 > E$, a wall it cannot cross.\n3. Greatest speed at the bottom, $U = -4$ J: $K = -2 - (-4) = 2$ J, so $v = \\sqrt{2K/m} = 2$ m/s.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (molecules: the Lennard-Jones potential).** The energy of two atoms a distance $x$ apart is modelled by $U = \\dfrac{a}{x^{12}} - \\dfrac{b}{x^6}$ ($a, b > 0$). Find the equilibrium separation and its nature.\n\n1. $\\dfrac{dU}{dx} = -\\dfrac{12a}{x^{13}} + \\dfrac{6b}{x^7} = 0 \\Rightarrow x^6 = \\dfrac{2a}{b}$, so $x_0 = \\left(\\dfrac{2a}{b}\\right)^{1/6}$.\n2. Closer than $x_0$ the steep $\\frac{a}{x^{12}}$ term wins and $U$ shoots up (repulsion); further away $U$ rises towards 0 (attraction). So $x_0$ is a minimum: **stable**. This is the bond length.\n3. At $x_0$, $U = \\dfrac{a}{(2a/b)^2} - \\dfrac{b}{2a/b} = \\dfrac{b^2}{4a} - \\dfrac{b^2}{2a} = -\\dfrac{b^2}{4a}$: the energy needed to pull the atoms apart is $\\dfrac{b^2}{4a}$.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (force and equilibria from a cubic).** $U = 3x^2 - 2x^3$ J. Find the force at $x = 2$ m and classify the equilibria.\n\n1. $F = -\\dfrac{dU}{dx} = -(6x - 6x^2) = 6x^2 - 6x$. At $x = 2$: $F = 24 - 12 = 12$ N, along $+x$.\n2. Equilibria: $6x(1 - x) = 0$ at $x = 0$ and $x = 1$.\n3. $U'' = 6 - 12x$: $+6$ at $x = 0$ (stable), $-6$ at $x = 1$ (unstable).",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"at a point where $U$ is zero the force is zero\"",
      content:
        "The force depends on the **slope** of $U$, not its value. For $U = x^4 - 4x^2$, $U = 0$ at $x = 2$, but the slope there is $32 - 16 = 16$, so $F = -16$ N. And $U = -4$ J (not zero) at $x = \\sqrt2$, where the force *is* zero. Shifting the zero of $U$ changes every value but no slope, which is exactly why only the slope can be physical.",
    },
    {
      type: "quiz",
      id: "mfe5-5-q1",
      variant: "practice",
      question: "For $U = x^4 - 4x^2$ (SI units), what is the force at $x = 1$ m?",
      options: [
        { text: "$-3$ N", feedback: "That is $U(1)$. The force is minus the slope." },
        { text: "$-4$ N", feedback: "That is the slope $U'(1)$. The force is its negative." },
        { text: "$+4$ N", correct: true, feedback: "$U'(1) = 4 - 8 = -4$, so $F = +4$ N, towards the valley at $\\sqrt2$." },
        { text: "$0$", feedback: "The flat points are at $0$ and $\\pm\\sqrt2$, not at 1." },
      ],
    },
    {
      type: "quiz",
      id: "mfe5-5-q2",
      variant: "concept",
      question: "At a point where $\\frac{dU}{dx} = 0$ and $\\frac{d^2U}{dx^2} < 0$, the particle is in",
      options: [
        { text: "unstable equilibrium", correct: true, feedback: "A maximum: nudge it and the force pushes it further downhill." },
        { text: "stable equilibrium", feedback: "Stable needs a minimum of $U$, i.e. $U'' > 0$." },
        { text: "neutral equilibrium", feedback: "Neutral needs $U$ flat over a region, not a curved peak." },
        { text: "no equilibrium, since $U'' \\ne 0$", feedback: "$U' = 0$ already means zero force: it is an equilibrium." },
      ],
    },
    {
      type: "quiz",
      id: "mfe5-5-q3",
      variant: "practice",
      question: "For $U = \\dfrac{a}{x^{12}} - \\dfrac{b}{x^6}$, what is the equilibrium separation?",
      options: [
        { text: "$\\left(\\dfrac{a}{b}\\right)^{1/6}$", feedback: "That is where $U = 0$, not where its slope is zero." },
        { text: "$\\left(\\dfrac{b}{2a}\\right)^{1/6}$", feedback: "The fraction is upside down: $x^6 = \\frac{12a}{6b}$." },
        { text: "$\\left(\\dfrac{2a}{b}\\right)^{1/6}$", correct: true, feedback: "$-\\frac{12a}{x^{13}} + \\frac{6b}{x^7} = 0$ gives $x^6 = \\frac{2a}{b}$." },
      ],
    },
    {
      type: "quiz",
      id: "mfe5-5-q4",
      variant: "practice",
      question: "A 2 kg particle moves in $U = x^4 - 4x^2$ J with total energy $E = 0$. What is its greatest speed?",
      options: [
        { text: "$2\\sqrt2$ m/s", feedback: "That is the speed for a 1 kg particle. Here $m = 2$ kg." },
        { text: "$0$", feedback: "$E = 0$ is the energy, not the kinetic energy; $K = E - U$ is largest where $U$ is lowest." },
        { text: "$2$ m/s", correct: true, feedback: "At the bottom $U = -4$ J, so $K = 4$ J and $v = \\sqrt{2 \\times 4/2} = 2$ m/s." },
        { text: "$4$ m/s", feedback: "That is $\\sqrt{2 \\cdot 4 \\cdot 2}$: multiply by $\\frac{2}{m}$, not by $2m$." },
      ],
    },
    {
      type: "quiz",
      id: "mfe5-5-q5",
      variant: "concept",
      question: "For $U = 3x^2 - 2x^3$, which statement is true?",
      options: [
        { text: "$x = 0$ is stable and $x = 1$ is unstable.", correct: true, feedback: "$U'' = 6 - 12x$: positive at 0, negative at 1." },
        { text: "$x = 0$ is unstable and $x = 1$ is stable.", feedback: "Check the sign of $U'' = 6 - 12x$ at each point." },
        { text: "Both are stable.", feedback: "Between two equilibria of a smooth curve with a valley, the other must be a peak." },
      ],
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "power",
  title: "5.6 · Power",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "You and a lift both raise you to the tenth floor. The work against gravity is the same, about $60 \\times 10 \\times 30 = 18\\,000$ J. The lift does it in 30 seconds; you take five minutes of stairs. What differs is the **rate** of doing work, and that rate, not the work itself, is what engines, motors and electricity bills are rated in.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Power",
      content:
        "Average power: $P_{\\text{avg}} = \\dfrac{W}{t}$. Instantaneous power: $P = \\dfrac{dW}{dt}$.\nSI unit: the watt, $1\\text{ W} = 1\\text{ J/s}$. Also: $1\\text{ hp} \\approx 746$ W, and the **kilowatt-hour**, $1\\text{ kWh} = 1000 \\times 3600 = 3.6 \\times 10^6$ J, is a unit of **energy**, not power.",
    },
    {
      type: "text",
      content:
        "**Power in terms of force and velocity.** In a small time $dt$ the point where the force acts moves $d\\vec s$, and the force does $dW = \\vec F\\cdot d\\vec s$. Divide by $dt$:",
    },
    {
      type: "math",
      latex: "P = \\frac{dW}{dt} = \\vec F\\cdot\\frac{d\\vec s}{dt} = \\vec F\\cdot\\vec v",
    },
    {
      type: "text",
      content:
        "**Constant power.** An engine at full throttle delivers roughly constant power. Then the driving force is $F = \\frac{P}{v}$: large at low speed, small at high speed. The graph shows $F = \\frac{2000}{v}$ for a 2 kW motor, with $x$ standing for the speed $v$ in m/s and the curve giving the force in newtons.",
    },
    {
      type: "interactive",
      config: {
        component: "graph-explorer",
        expr: "2000/x",
        exprLatex: "\\frac{2000}{x}",
        window: { xmin: 0, xmax: 40, ymin: 0, ymax: 1000 },
        initial: 10,
        excluded: [0],
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: at 10 m/s the force is 200 N; at 5 m/s it is 400 N; at 20 m/s only 100 N. The same power buys a big push at low speed and a small push at high speed. That is why a vehicle's acceleration fades as it speeds up, and why its top speed is where $\\frac{P}{v}$ has fallen to match the resistance: if the resistance is 100 N, this motor tops out at 20 m/s.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (cruising car).** A 1000 kg car cruises at a steady 20 m/s against a total resistance of 500 N. What power does the engine deliver to the wheels?\n\n1. Steady speed: driving force = resistance = 500 N. *Why this step:* at constant velocity the net force is zero, so the drive only has to cancel resistance; the mass is irrelevant.\n2. $P = Fv = 500 \\times 20 = 10\\,000$ W $= 10$ kW.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (motor lifting a load).** A motor raises a 50 kg load through 10 m at steady speed in 20 s. Find its power output.\n\n$W = mgh = 5000$ J, so $P = \\frac{5000}{20} = 250$ W. (Or: $F = 500$ N at $v = 0.5$ m/s, $P = 250$ W.)",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (pump and efficiency).** A pump lifts 1000 kg of water from a well 10 m deep in 5 minutes. Its efficiency is 60%. Find the useful power and the electrical input.\n\n1. Useful work: $mgh = 1000 \\times 10 \\times 10 = 10^5$ J in 300 s: $P_{\\text{out}} = \\frac{10^5}{300} \\approx 333$ W.\n2. Efficiency $= \\frac{P_{\\text{out}}}{P_{\\text{in}}}$, so $P_{\\text{in}} = \\frac{333}{0.6} \\approx 556$ W. *Why this step:* efficiency is always output over input, so the input is larger.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (top speed up a hill, JEE Main).** A 1000 kg car with an engine of maximum power 30 kW climbs a slope of 1 in 20 ($\\sin\\theta = \\frac{1}{20}$) against a resistance of 500 N. Find its top speed.\n\n1. At top speed the acceleration is zero, so the driving force equals the total opposition: $mg\\sin\\theta + f = 1000 \\times 10 \\times \\frac{1}{20} + 500 = 1000$ N. *Why this step:* on a slope, the weight's down-slope part is extra resistance.\n2. $v_{\\max} = \\dfrac{P}{F} = \\dfrac{30\\,000}{1000} = 30$ m/s.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (power of a variable force).** A force $F = 2t$ N acts on a 1 kg body initially at rest. Find the power at $t = 2$ s and the average power over the first 2 s.\n\n1. $a = 2t$, so $v = t^2$. *Why this step:* power needs the velocity at that instant, so integrate the acceleration first.\n2. $P = Fv = 2t \\cdot t^2 = 2t^3$; at $t = 2$: $P = 16$ W.\n3. Average: $W = \\Delta K = \\tfrac12 \\times 1 \\times (4)^2 = 8$ J in 2 s: $P_{\\text{avg}} = 4$ W. (Check: $\\frac{1}{2}\\int_0^2 2t^3\\,dt = \\frac12 \\times 8 = 4$ W.)",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"more power means more force\"",
      content:
        "Power is force **times speed**. A 100 kW sports car at 50 m/s pushes with only 2000 N; a 50 kW tractor crawling at 2 m/s pushes with 25 000 N. Gears exist precisely to trade speed for force at fixed engine power.",
    },
    {
      type: "quiz",
      id: "mfe5-6-q1",
      variant: "practice",
      question: "A truck moves at a steady 15 m/s against a resistance of 2000 N. What power does its engine deliver?",
      options: [
        { text: "$133$ W", feedback: "That is $F/v$. Power is force times velocity." },
        { text: "$0$, because the truck is not accelerating", feedback: "The net force is zero, but the engine's force is not, and it moves." },
        { text: "$30$ kW", correct: true, feedback: "$P = Fv = 2000 \\times 15 = 30\\,000$ W." },
      ],
    },
    {
      type: "quiz",
      id: "mfe5-6-q2",
      variant: "concept",
      question: "A household uses 90 kWh in a month. What is that in joules?",
      options: [
        { text: "$90\\,000$ J", feedback: "That treats kWh as kilojoules. 1 kWh is 1000 W for 3600 s." },
        { text: "$3.24 \\times 10^8$ J", correct: true, feedback: "$90 \\times 3.6 \\times 10^6 = 3.24 \\times 10^8$ J." },
        { text: "$90\\,000$ W", feedback: "kWh measures energy, so the answer is in joules, not watts." },
        { text: "$5.4 \\times 10^6$ J", feedback: "That uses 60 s in an hour. An hour is 3600 s." },
      ],
    },
    {
      type: "quiz",
      id: "mfe5-6-q3",
      variant: "practice",
      question: "A 2000 kg truck with a maximum power of 60 kW climbs a slope with $\\sin\\theta = 0.1$ against a resistance of 1000 N. What is its top speed?",
      options: [
        { text: "$20$ m/s", correct: true, feedback: "$F = 2000 + 1000 = 3000$ N; $v = \\frac{60\\,000}{3000} = 20$ m/s." },
        { text: "$60$ m/s", feedback: "That ignores the slope; the weight adds $2000 \\times 10 \\times 0.1 = 2000$ N of opposition." },
        { text: "$30$ m/s", feedback: "That uses only the slope's 2000 N and forgets the 1000 N resistance." },
        { text: "$3$ m/s", feedback: "That divides by the full weight, 20 000 N. Only the down-slope part $mg\\sin\\theta$ opposes the motion." },
      ],
    },
    {
      type: "quiz",
      id: "mfe5-6-q4",
      variant: "concept",
      question: "A car's engine delivers constant power. As its speed doubles (ignoring resistance), its acceleration",
      options: [
        { text: "doubles", feedback: "Power is fixed, so the force falls as speed rises." },
        { text: "stays the same", feedback: "Constant force, not constant power, gives constant acceleration." },
        { text: "halves", correct: true, feedback: "$F = \\frac{P}{v}$, so $a = \\frac{P}{mv}$: doubling $v$ halves $a$." },
      ],
    },
    {
      type: "quiz",
      id: "mfe5-6-q5",
      variant: "practice",
      question: "A crane lifts a 200 kg load at a steady 0.5 m/s. What power does it deliver to the load?",
      options: [
        { text: "$100$ W", feedback: "That uses the mass instead of the weight." },
        { text: "$1000$ W", correct: true, feedback: "$F = mg = 2000$ N at $0.5$ m/s: $P = 1000$ W." },
        { text: "$25$ W", feedback: "That is $\\tfrac12 mv^2$, a kinetic energy, not a power." },
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
      type: "text",
      content:
        "No formula sheet. This set closes the course, so it mixes energy with Newton's laws, circles and friction from earlier chapters. For each question ask: start and end states known, times not needed? Then energy. ($g = 10$ m/s² throughout.)",
    },
    {
      type: "callout",
      variant: "info",
      title: "Chapter 5 in six lines",
      content:
        "1. $W = \\vec F\\cdot\\vec s$; for a variable force $W = \\int F\\,dx$ = area under $F$-$x$.\n2. Spring: $W_{\\text{spring}} = \\tfrac12 kx_1^2 - \\tfrac12 kx_2^2$.\n3. $W_{\\text{all}} = \\Delta K$ with $K = \\tfrac12 mv^2 = \\frac{p^2}{2m}$ (the integral of $F = mv\\frac{dv}{dx}$).\n4. Conservative force: $\\Delta U = -W$, $F = -\\frac{dU}{dx}$; then $W_{\\text{nc}} = \\Delta(K + U)$.\n5. $U(x)$ graph: motion only where $U \\le E$; minima stable, maxima unstable.\n6. $P = \\frac{dW}{dt} = \\vec F\\cdot\\vec v$; at top speed, $P = F_{\\text{resist}}\\,v$.",
    },
    {
      type: "quiz",
      id: "mfe5-7-q1",
      variant: "mastery",
      question: "A box is lifted vertically at constant velocity by a rope. Which statement about the work done on it is correct?",
      options: [
        { text: "Only tension does work, since gravity is balanced.", feedback: "Balanced forces still each do work; they just cancel in the total." },
        { text: "Tension does positive work, gravity does equal negative work, total zero.", correct: true, feedback: "Constant velocity: $\\Delta K = 0$, so the works cancel." },
        { text: "Total work is positive, since the box gains height.", feedback: "Gaining height increases potential energy, but the *total* work equals $\\Delta K = 0$." },
      ],
    },
    {
      type: "quiz",
      id: "mfe5-7-q2",
      variant: "mastery",
      question: "A spring ($k = 400$ N/m) is already stretched by 5 cm. How much more work is needed to stretch it to 10 cm?",
      options: [
        { text: "$0.5$ J", feedback: "That is $\\tfrac12 k(0.05)^2$, the work for the *first* 5 cm." },
        { text: "$1.5$ J", correct: true, feedback: "$\\tfrac12 \\times 400 \\times (0.01 - 0.0025) = 1.5$ J." },
        { text: "$2$ J", feedback: "That is from 0 to 10 cm." },
        { text: "$1$ J", feedback: "That is $k \\times 0.05 \\times 0.05$, a rectangle. The force grows linearly from 20 N to 40 N, so average it: 30 N × 0.05 m." },
      ],
    },
    {
      type: "quiz",
      id: "mfe5-7-q3",
      variant: "mastery",
      question: "The force on a particle along $x$ is 4 N from $x = 0$ to 3 m, then falls linearly to $-4$ N at $x = 7$ m. What is the total work from 0 to 7 m?",
      options: [
        { text: "$20$ J", feedback: "That adds the negative triangle (from 5 to 7 m) instead of subtracting it." },
        { text: "$16$ J", feedback: "That stops at $x = 5$ m. The last 2 m, with the force reversed, take 4 J back." },
        { text: "$12$ J", correct: true, feedback: "Rectangle $12$ J, triangle from 3 to 5 m $+4$ J, triangle from 5 to 7 m $-4$ J." },
        { text: "$28$ J", feedback: "That is $4 \\times 7$, assuming the force stays at 4 N." },
      ],
    },
    {
      type: "quiz",
      id: "mfe5-7-q4",
      variant: "mastery",
      question: "A cyclist at 15 m/s brakes hard, locking the wheels ($\\mu_k = 0.45$). How far does the bike skid?",
      options: [
        { text: "$25$ m", correct: true, feedback: "$d = \\frac{v^2}{2\\mu g} = \\frac{225}{9} = 25$ m." },
        { text: "$50$ m", feedback: "That is $\\frac{v^2}{\\mu g}$: the $\\tfrac12$ in the kinetic energy is missing." },
        { text: "$3.3$ m", feedback: "That is $\\frac{v}{\\mu g}$, the stopping *time* in seconds." },
      ],
    },
    {
      type: "quiz",
      id: "mfe5-7-q5",
      variant: "mastery",
      question: "A ball released from the least possible height just loops a smooth vertical loop. What is the normal force at the bottom of the loop, in units of $mg$?",
      options: [
        { text: "$5mg$", feedback: "$\\frac{mv^2}{R} = 5mg$ is the centripetal part; the normal force must also cancel the weight." },
        { text: "$mg$", feedback: "At the bottom the ball is accelerating upward (towards the centre), so $N > mg$." },
        { text: "$2.5mg$", feedback: "2.5 is the release height in units of $R$, not the force." },
        { text: "$6mg$", correct: true, feedback: "$v^2 = 5gR$ at the bottom, so $N = mg + 5mg = 6mg$." },
      ],
    },
    {
      type: "quiz",
      id: "mfe5-7-q6",
      variant: "mastery",
      question: "The potential energy of a particle is $U = 2x^3 - 3x^2$. Which describes its equilibrium points?",
      options: [
        { text: "$x = 0$ stable, $x = 1$ unstable", feedback: "Check $U'' = 12x - 6$: negative at $x = 0$." },
        { text: "$x = 0$ and $x = 1.5$", feedback: "$x = 1.5$ is where $U = 0$. Equilibria are where the *slope* is zero." },
        { text: "$x = 0$ unstable, $x = 1$ stable", correct: true, feedback: "$U' = 6x^2 - 6x = 0$ at 0 and 1; $U'' = 12x - 6$ is $-6$ at 0 and $+6$ at 1." },
      ],
    },
    {
      type: "quiz",
      id: "mfe5-7-q7",
      variant: "mastery",
      question: "A 2000 kg truck climbs a 1-in-10 slope at a steady 10 m/s against 1000 N of resistance. What power does its engine deliver?",
      options: [
        { text: "$30$ kW", correct: true, feedback: "$F = mg\\sin\\theta + f = 2000 + 1000 = 3000$ N, $P = 30$ kW." },
        { text: "$10$ kW", feedback: "That covers only the resistance. Lifting the truck up the slope takes $2000$ N more." },
        { text: "$20$ kW", feedback: "That covers only the slope, not the 1000 N of resistance." },
        { text: "$210$ kW", feedback: "That uses the full weight, 20 000 N, instead of its down-slope part." },
      ],
    },
    {
      type: "quiz",
      id: "mfe5-7-q8",
      variant: "mastery",
      question: "A bob on a 0.8 m string is released with the string horizontal. What is the tension at the lowest point, in units of $mg$?",
      options: [
        { text: "$mg$", feedback: "At the bottom the bob moves in a circle, so the tension must exceed $mg$." },
        { text: "$2mg$", feedback: "$\\frac{mv^2}{l} = \\frac{m \\cdot 2gl}{l} = 2mg$ is the centripetal part; add $mg$." },
        { text: "$3mg$", correct: true, feedback: "$v^2 = 2gl$, so $T = mg + 2mg = 3mg$, whatever the length." },
      ],
    },
    {
      type: "quiz",
      id: "mfe5-7-q9",
      variant: "mastery",
      question: "A 1000 kg car with a 40 kW engine starts from rest on a level road. Ignoring resistance and assuming constant power, how long does it take to reach 20 m/s?",
      options: [
        { text: "$10$ s", feedback: "That uses $mv^2$ without the half." },
        { text: "$5$ s", correct: true, feedback: "$Pt = \\tfrac12 mv^2 = 200\\,000$ J, so $t = 5$ s." },
        { text: "$0.5$ s", feedback: "That divides momentum by power, which does not give a time." },
      ],
    },
    {
      type: "quiz",
      id: "mfe5-7-q10",
      variant: "mastery",
      question: "JEE Advanced. A 1 kg block on a rough floor ($\\mu_s = \\mu_k = 0.1$) is pushed against a spring ($k = 100$ N/m), compressing it by 0.5 m, and released. Where does it first come to rest?",
      options: [
        { text: "At 0.48 m extension", correct: true, feedback: "$\\tfrac12 k(x_0^2 - x_1^2) = \\mu mg(x_0 + x_1)$ gives $x_1 = x_0 - \\frac{2\\mu mg}{k} = 0.5 - 0.02$." },
        { text: "At 0.5 m extension", feedback: "That is the frictionless answer. Friction removes energy on the way." },
        { text: "At 0.49 m extension", feedback: "That subtracts only $\\frac{\\mu mg}{k}$. The spring energy lost to friction covers the whole path $x_0 + x_1$." },
        { text: "At the natural length", feedback: "At the natural length the block is still moving fast; only 0.5 J of the 12.5 J has gone to friction by then." },
      ],
    },
    {
      type: "quiz",
      id: "mfe5-7-q11",
      variant: "mastery",
      question: "JEE Advanced. The same block (1 kg, $k = 100$ N/m, $\\mu = 0.1$, released from 0.5 m compression) oscillates back and forth until it stops for good. What total distance does it slide?",
      options: [
        { text: "$1$ m", feedback: "That is one pass there and back. The block makes many passes before stopping." },
        { text: "$25$ m", feedback: "That counts 25 passes of 1 m each. The passes get shorter by 0.04 m each time." },
        { text: "$12.5$ m", correct: true, feedback: "Each pass loses 0.02 m of amplitude; after 25 passes it stops exactly at the natural length. All 12.5 J went to friction: $\\mu mg\\,d = 12.5$, so $d = 12.5$ m." },
        { text: "$6.25$ m", feedback: "That uses $\\frac{\\frac12 kx_0^2}{2\\mu mg}$. The friction force is $\\mu mg = 1$ N, and the whole 12.5 J goes to it." },
      ],
      hint: "Check where it ends: does it stop at $x = 0$, where the spring stores no energy?",
    },
    {
      type: "quiz",
      id: "mfe5-7-q12",
      variant: "mastery",
      question: "JEE Advanced. A 1 kg particle moves in $U(x) = x^4 - 4x^2$ J with total energy $-2$ J, starting near $x = 1.4$ m. What are its turning points and greatest speed?",
      options: [
        { text: "About $-1.85$ m and $+1.85$ m; $v_{\\max} = 2$ m/s", feedback: "The hump at $x = 0$ has $U = 0 > E$; the particle cannot cross to negative $x$." },
        { text: "$x = \\sqrt{2 \\mp \\sqrt2}$, i.e. about 0.77 m and 1.85 m; $v_{\\max} = 2$ m/s", correct: true, feedback: "$x^4 - 4x^2 = -2$ gives $x^2 = 2 \\pm \\sqrt2$. At the valley floor $U = -4$ J, $K = 2$ J, $v = 2$ m/s." },
        { text: "About 0.77 m and 1.85 m; $v_{\\max} = \\sqrt2$ m/s", feedback: "$K = 2$ J gives $v = \\sqrt{2K/m} = 2$ m/s, not $\\sqrt2$." },
        { text: "$0$ and $2$ m; $v_{\\max} = 2\\sqrt2$ m/s", feedback: "Those are where $U = 0$, the turning points for $E = 0$, not $E = -2$ J." },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Where next",
      content:
        "You now have both great tools of mechanics: Newton's laws for *how* a body moves, energy for *how fast* it ends up. Mechanics II adds the third, momentum conservation for systems of bodies, and then carries all three into rotation and gravitation.",
    },
  ]),
};

export const mfeChapter5Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lessonMastery,
];
