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
      type: "video",
      src: "/videos/mfe-5-work-energy-and-power.mp4",
      poster: "/videos/mfe-5-work-energy-and-power.jpg",
      title: "Chapter 5 overview video",
      caption:
        "A narrated walk through the whole chapter. Watch it now for the big picture, or come back to it as a recap.",
    },
    {
      type: "text",
      content:
        "Carry a heavy school bag across a level corridor at a steady pace. You arrive tired, yet physics says you did **no work on the bag**. That sounds like a technicality, but it is the key to the whole chapter: in physics, *work* is not effort. It measures how much a force actually contributes to a body's motion, and a force at right angles to the motion contributes nothing.",
    },
    { type: "heading", text: "Only the force along the motion counts" },
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
    { type: "heading", text: "Positive, negative and zero work" },
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
    { type: "heading", text: "Total work" },
    {
      type: "text",
      content:
        "If several forces act on a body, each does its own work. Since the dot product distributes, $\\sum(\\vec F_i\\cdot\\vec s) = \\big(\\sum\\vec F_i\\big)\\cdot\\vec s$: the total work of all the forces equals the work done by the **net** force. That fact becomes the work-energy theorem in Lesson 5.3.",
    },
    {
      type: "worked-example",
      id: "mfe5-1-we1",
      title: "Worked example 1: every force on a block",
      problem:
        "A 2 kg block is pulled 5 m up a rough $37^\\circ$ incline ($\\sin 37^\\circ = 0.6$) by a rope parallel to the slope with tension 25 N; $\\mu_k = 0.25$. Find the work done by each force and the total.",
      steps: [
        { text: "Tension, along the motion: $W_T = 25 \\times 5 = 125$ J." },
        { text: "Gravity: the component along the slope is $mg\\sin 37^\\circ = 12$ N **down** the slope, opposite to the motion: $W_g = -12 \\times 5 = -60$ J. *Why this step:* equivalently the block rises $5 \\times 0.6 = 3$ m, and $-mgh = -60$ J." },
        { text: "Normal force: perpendicular to the slope, so $W_N = 0$." },
        { text: "Friction: $N = mg\\cos 37^\\circ = 16$ N, $f = 0.25 \\times 16 = 4$ N down the slope: $W_f = -20$ J." },
        { text: "Total: $125 - 60 + 0 - 20 = 45$ J. Check with the net force: $25 - 12 - 4 = 9$ N up the slope, and $9 \\times 5 = 45$ J. ✓" },
      ],
      answer: "$W_T = 125$ J, $W_g = -60$ J, $W_N = 0$, $W_f = -20$ J; total 45 J.",
    },
    {
      type: "worked-example",
      id: "mfe5-1-we2",
      title: "Worked example 2: vector form",
      problem:
        "A force $\\vec F = 3\\hat i + 4\\hat j$ N moves a particle through $\\vec s = 2\\hat i - \\hat j$ m. Find the work.",
      steps: [
        { text: "$W = (3)(2) + (4)(-1) = 6 - 4 = 2$ J. *Why this step:* the component formula needs no angle; the sign of each product tells you which parts of the force helped and which hindered." },
      ],
      answer: "$W = 2$ J.",
    },
    {
      type: "worked-example",
      id: "mfe5-1-we3",
      title: "Worked example 3: friction on a box in a truck",
      problem:
        "A 20 kg box rides without slipping on the flat bed of a truck that accelerates from rest at 2 m/s² for 5 s. Find the work done by friction on the box (ground frame).",
      steps: [
        { text: "The box accelerates at 2 m/s², and friction is the only horizontal force: $f = 20 \\times 2 = 40$ N **forward**." },
        { text: "Displacement of the box in 5 s: $s = \\tfrac12 \\times 2 \\times 25 = 25$ m forward." },
        { text: "$W_f = 40 \\times 25 = +1000$ J. *Why this step:* friction and displacement point the same way, so the work is positive. The box's kinetic energy at the end is $\\tfrac12 \\times 20 \\times 10^2 = 1000$ J, which is no coincidence (Lesson 5.3)." },
      ],
      answer: "$W_f = +1000$ J.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (work depends on the frame).** In Worked example 3, a passenger in the truck sees the box sitting still. In the truck's frame the box's displacement is zero, so the work done by friction on it is zero. Work (and kinetic energy) depend on the frame; what stays true in every inertial frame is the *relation* between them. Always state the frame, and use the ground unless told otherwise.",
    },
    {
      type: "worked-example",
      id: "mfe5-1-we5",
      title: "Worked example 5: up and down",
      problem:
        "A 0.2 kg ball is thrown straight up, rises 5 m and falls back to the thrower's hand. Find the work done by gravity on the way up, on the way down, and in total.",
      steps: [
        { text: "Up: force $mg = 2$ N down, displacement 5 m up: $W = -10$ J." },
        { text: "Down: both down: $W = +10$ J." },
        { text: "Total: $0$. *Why this step:* the overall displacement is zero, and gravity is a constant force, so $\\vec F\\cdot\\vec s = 0$. (Air drag would do negative work on **both** legs; Lesson 5.4 explains why that difference matters.)" },
      ],
      answer: "$-10$ J up, $+10$ J down, 0 in total.",
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
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "mfe5-1-q1",
      variant: "practice",
      question: "A force $\\vec F = 2\\hat i + 3\\hat j - \\hat k$ N acts on a particle that moves through $\\vec s = \\hat i - \\hat j + 4\\hat k$ m. What work does it do? Give your answer in joules (it may be negative).",
      answer: -5,
      unit: "J",
      hint: "Multiply matching components and add, keeping every sign.",
      solution: "$W = F_x s_x + F_y s_y + F_z s_z = (2)(1) + (3)(-1) + (-1)(4) = 2 - 3 - 4 = -5$ J. Work is a scalar, and the negative sign says the force opposes the motion overall.",
      commonMistakes: [
        { answer: 9, feedback: "That adds absolute values. Keep the signs: $2 + (-3) + (-4)$." },
        { answer: 5, feedback: "Check the signs: $(3)(-1) = -3$ and $(-1)(4) = -4$, so the total is negative." },
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
      hint: "Only the component of the force along the displacement does work: $W = Fs\\cos\\theta$, with $\\theta$ the angle between the force and the ground.",
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
      hint: "Work is $\\vec F \\cdot \\vec s$. For each force, find the angle between it and the block's displacement along the incline.",
    },
    {
      type: "numeric",
      id: "mfe5-1-q4",
      variant: "practice",
      question: "A 3 kg block slides 5 m down a $37^\\circ$ incline ($\\sin 37^\\circ = 0.6$, $g = 10$ m/s²). How much work does gravity do on it? Give your answer in joules.",
      answer: 90,
      unit: "J",
      hint: "How far does the block actually drop vertically?",
      solution: "The block drops $5\\sin 37^\\circ = 3$ m, so $W_g = mgh = 3 \\times 10 \\times 3 = 90$ J. Equivalently, the component of gravity along the slope is $mg\\sin 37^\\circ = 18$ N, and $18 \\times 5 = 90$ J.",
      commonMistakes: [
        { answer: 150, feedback: "That uses the full 5 m as a vertical drop. The block drops only $5\\sin 37^\\circ = 3$ m." },
        { answer: 120, feedback: "That uses $\\cos 37^\\circ$. The component of gravity along the slope is $mg\\sin\\theta$." },
        { answer: -90, feedback: "The block moves down, with gravity: the work is positive." },
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
      hint: "Use the work-energy theorem: total work equals the change in kinetic energy. What happens to the kinetic energy at constant velocity?",
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
      hint: "At every instant, compare the direction of the tension with the direction of the velocity. What is $\\vec T \\cdot d\\vec s$?",
    },
    {
      type: "quiz",
      id: "mfe5-1-q7",
      variant: "practice",
      multiple: true,
      question: "A block is pulled up a fixed rough incline at **constant speed** by a rope parallel to the slope. Select all the statements that are correct (ground frame).",
      options: [
        { text: "The tension does positive work on the block.", correct: true, feedback: "The rope pulls up the slope, the way the block moves." },
        { text: "Kinetic friction does negative work on the block.", correct: true, feedback: "The block slides up over a fixed surface, so friction points down the slope, against the motion." },
        { text: "The normal force does zero work on the block.", correct: true, feedback: "It is perpendicular to the surface, and the block moves along the surface." },
        { text: "Gravity does positive work, since it keeps acting throughout.", feedback: "The block rises, against gravity, so gravity's work is $-mgh$, negative." },
        { text: "The total work done on the block is positive.", feedback: "Constant speed means zero net force, so the total work (the work of the net force) is zero." },
      ],
      hint: "For each force, find the angle between it and the up-slope displacement. For the total, use the work-energy theorem with constant speed.",
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
    { type: "heading", text: "Work as area under the $F$-$x$ graph" },
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
    { type: "heading", text: "Work done by a spring" },
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
    { type: "heading", text: "Integrals, graphs and spring problems" },
    {
      type: "worked-example",
      id: "mfe5-2-we1",
      title: "Worked example 1: a polynomial force",
      problem:
        "A force $F = (3x^2 + 2)$ N acts along $x$. Find the work as the particle moves from $x = 1$ m to $x = 2$ m.",
      steps: [
        { text: "$W = \\displaystyle\\int_1^2 (3x^2 + 2)\\,dx = \\big[x^3 + 2x\\big]_1^2$. *Why this step:* the force changes along the path, so integrate instead of multiplying." },
        { text: "$= (8 + 4) - (1 + 2) = 9$ J." },
      ],
      answer: "$W = 9$ J.",
    },
    {
      type: "worked-example",
      id: "mfe5-2-we2",
      title: "Worked example 2: reading a graph",
      problem:
        "A force along $x$ rises linearly from 0 to 10 N between $x = 0$ and 2 m, stays at 10 N until $x = 4$ m, then falls linearly to $-10$ N at $x = 8$ m. Find the work from $x = 0$ to $x = 8$ m.",
      steps: [
        { text: "0 to 2 m: triangle, $\\tfrac12 \\times 2 \\times 10 = 10$ J." },
        { text: "2 to 4 m: rectangle, $2 \\times 10 = 20$ J." },
        { text: "4 to 6 m: the force falls from 10 N to 0: triangle above the axis, $+10$ J." },
        { text: "6 to 8 m: the force goes from 0 to $-10$ N: triangle below the axis, $-10$ J. *Why this step:* below the axis the force opposes the $+x$ motion, so this area is negative work." },
        { text: "Total: $10 + 20 + 10 - 10 = 30$ J." },
      ],
      answer: "$W = 30$ J.",
    },
    {
      type: "worked-example",
      id: "mfe5-2-we3",
      title: "Worked example 3: two equal stretches",
      problem:
        "A spring has $k = 500$ N/m. Compare the work needed to stretch it from 0 to 2 cm with that from 2 cm to 4 cm.",
      steps: [
        { text: "0 to 2 cm: $\\tfrac12 \\times 500 \\times (0.02)^2 = 0.1$ J." },
        { text: "2 to 4 cm: $\\tfrac12 \\times 500 \\times (0.04^2 - 0.02^2) = 250 \\times 0.0012 = 0.3$ J. *Why this step:* the work is the difference of the two $\\tfrac12 kx^2$ values, not $\\tfrac12 k(\\Delta x)^2$." },
        { text: "The second 2 cm takes **three times** as much work: on the graph, the second strip is a trapezium with three times the triangle's area." },
      ],
      answer: "0.1 J for 0 to 2 cm and 0.3 J for 2 to 4 cm: three times as much.",
    },
    {
      type: "worked-example",
      id: "mfe5-2-we4",
      title: "Worked example 4: cutting a spring",
      problem:
        "A spring of $k = 200$ N/m is cut into two equal halves. How much work is needed to stretch one half by 5 cm?",
      steps: [
        { text: "The same tension now stretches a half-spring only half as much (each half of the original spring carried the full tension and provided half the stretch), so $k_{\\text{half}} = 2k = 400$ N/m. *Why this step:* $k$ measures force per unit stretch, and a shorter spring stretches less under the same force." },
        { text: "$W = \\tfrac12 \\times 400 \\times 0.05^2 = 0.5$ J (twice what the whole spring would need for the same 5 cm)." },
      ],
      answer: "$W = 0.5$ J (the half has $k = 400$ N/m).",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"work by a spring is $kx \\cdot x$\"",
      content:
        "$kx$ is the force only at the *final* deformation. The force grows from zero, so its average over the stretch is $\\tfrac12 kx$, and the work is $\\tfrac12 kx^2$, the triangle, not the rectangle $kx^2$.",
    },
    { type: "heading", text: "Check your understanding" },
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
      hint: "The force varies with $x$, so integrate: $W = \\int_0^2 F\\,dx$, or find the triangular area under the $F$-$x$ graph.",
    },
    {
      type: "numeric",
      id: "mfe5-2-q2",
      variant: "practice",
      question: "A spring ($k = 200$ N/m) is slowly stretched from 10 cm to 20 cm extension. How much work is done by the stretching agent? Give your answer in joules.",
      answer: 3,
      tolerance: 0.01,
      unit: "J",
      hint: "Use the difference of two $\\tfrac12 kx^2$ values, with $x$ in metres.",
      solution: "$W = \\tfrac12 k(x_2^2 - x_1^2) = \\tfrac12 \\times 200 \\times (0.2^2 - 0.1^2) = 100 \\times 0.03 = 3$ J.",
      commonMistakes: [
        { answer: 1, feedback: "That is $\\tfrac12 k(\\Delta x)^2$ with $\\Delta x = 0.1$ m. Use the difference of $\\tfrac12 kx^2$ values." },
        { answer: 4, feedback: "That is the work from 0 to 20 cm. The spring started already stretched by 10 cm." },
        { answer: -3, feedback: "That is the work done *by the spring*. The agent pulls along the stretch, doing positive work." },
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
      hint: "Work is the area under the $F$-$x$ graph. A force rising linearly from zero makes a triangle.",
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
      hint: "The spring's work is $-\\Delta U = \\tfrac12 k x_i^2 - \\tfrac12 k x_f^2$. Compare the stored energy at the start and end positions.",
    },
    {
      type: "numeric",
      id: "mfe5-2-q5",
      variant: "practice",
      question: "Stretching a spring from 0 to 1 cm takes 0.2 J. How much work is needed to stretch it further, from 1 cm to 3 cm? Give your answer in joules.",
      answer: 1.6,
      tolerance: 0.01,
      unit: "J",
      hint: "The work from zero goes as $x^2$. Find the work from 0 to 3 cm first.",
      solution: "Work from zero is $\\tfrac12 kx^2 \\propto x^2$. Tripling the stretch multiplies it by 9: 0 to 3 cm takes $0.2 \\times 9 = 1.8$ J. Subtract the first 0.2 J: $1.8 - 0.2 = 1.6$ J.",
      commonMistakes: [
        { answer: 0.4, feedback: "That scales with the distance. Work goes as $x^2$." },
        { answer: 1.8, feedback: "That is from 0 to 3 cm. The first 0.2 J is already done." },
        { answer: 0.8, feedback: "That is $0.2 \\times 2^2$, treating the 2 cm stretch as if it started from zero." },
      ],
    },
    {
      type: "quiz",
      id: "mfe5-2-q6",
      variant: "practice",
      multiple: true,
      question: "An ideal spring of constant $k$ is stretched **slowly** from its natural length to an extension $x$. Select all the statements that are correct.",
      options: [
        { text: "The work done by the stretching agent is $\\tfrac12 kx^2$.", correct: true, feedback: "The area of the triangle under the $F$-$x$ line, from 0 to $x$." },
        { text: "The work done by the spring is $-\\tfrac12 kx^2$.", correct: true, feedback: "The spring pulls back against the stretch: $W_{\\text{spring}} = \\tfrac12 k(0)^2 - \\tfrac12 kx^2$." },
        { text: "The agent's force, averaged over the displacement, is $\\tfrac12 kx$.", correct: true, feedback: "It grows linearly from 0 to $kx$, so its average over the distance is half the final value: $\\tfrac12 kx \\times x = \\tfrac12 kx^2$." },
        { text: "Stretching it further from $x$ to $2x$ takes the same work again, $\\tfrac12 kx^2$.", feedback: "From $x$ to $2x$ takes $\\tfrac12 k(4x^2 - x^2) = \\tfrac32 kx^2$, three times as much." },
        { text: "The work done by the agent is $kx^2$, force times distance.", feedback: "$kx$ is the force only at the end. The force grows from zero, so the work is the triangle, not the rectangle." },
      ],
      hint: "Slowly means the agent's force always equals $kx$. Use the area under the $F$–$x$ graph for the agent's work, remember the spring pulls the other way, and for the further stretch find the area between $x$ and $2x$.",
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
    { type: "heading", text: "Deriving the work-energy theorem" },
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
    { type: "heading", text: "Spring and friction together" },
    {
      type: "text",
      content:
        "A block is pushed against a spring, compressing it by $x_0$, and released on a rough floor. The spring does positive work, friction does negative work, and the kinetic energy is what is left:",
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
      type: "worked-example",
      id: "mfe5-3-we1",
      title: "Worked example 1: the spring block, numbers",
      problem:
        "Using the lab's values, find the greatest speed and where the block first stops.",
      steps: [
        { text: "Speed is greatest where the net force is zero: $kx = \\mu mg$, so $x = \\dfrac{1}{100} = 0.01$ m (still compressed). *Why this step:* $K$ stops growing exactly when the net force, and so the work per step, changes sign." },
        { text: "Work-energy from $x_0 = 0.5$ to $x = 0.01$: spring work $\\tfrac12 \\times 100 \\times (0.25 - 0.0001) = 12.495$ J; friction work $-1 \\times 0.49 = -0.49$ J. So $\\tfrac12 v^2 = 12.005$, $v^2 = 24.01$ and $v_{\\max} = 4.9$ m/s." },
        { text: "First stop at extension $x_1$: $\\tfrac12 k x_0^2 - \\tfrac12 k x_1^2 = \\mu mg(x_0 + x_1)$. Dividing by $(x_0 + x_1)$: $\\tfrac12 k(x_0 - x_1) = \\mu mg$, so $x_1 = x_0 - \\dfrac{2\\mu mg}{k} = 0.5 - 0.02 = 0.48$ m." },
      ],
      answer: "$v_{\\max} = 4.9$ m/s at 0.01 m compression; first stop at extension 0.48 m.",
      tryFirst: false,
    },
    { type: "heading", text: "Skids, bullets and chains" },
    {
      type: "worked-example",
      id: "mfe5-3-we2",
      title: "Worked example 2: stopping distance in one line",
      problem:
        "A car moving at 20 m/s brakes with its wheels locked on a road with $\\mu_k = 0.5$. How far does it skid?",
      steps: [
        { text: "Only friction does work (gravity and $N$ are perpendicular to the motion): $-\\mu mg\\,d = 0 - \\tfrac12 mv^2$." },
        { text: "$d = \\dfrac{v^2}{2\\mu g} = \\dfrac{400}{10} = 40$ m. *Why this step:* the mass cancels and $d \\propto v^2$; at 40 m/s the skid is 160 m, four times as long." },
      ],
      answer: "$d = 40$ m.",
    },
    {
      type: "worked-example",
      id: "mfe5-3-we3",
      title: "Worked example 3: bullet in a block",
      problem:
        "A bullet loses half its speed after penetrating 3 cm into a wooden block. How much further does it go (assume a constant resistive force)?",
      steps: [
        { text: "Losing half the speed means the KE falls from $K$ to $\\tfrac14 K$: the first 3 cm removed $\\tfrac34 K$. *Why this step:* KE goes as $v^2$, so half the speed is a quarter of the energy." },
        { text: "A constant force removes KE in proportion to distance: $\\tfrac34 K$ per 3 cm, so $\\tfrac14 K$ per 1 cm." },
        { text: "The remaining $\\tfrac14 K$ lasts exactly 1 cm more." },
      ],
      answer: "1 cm further.",
    },
    {
      type: "worked-example",
      id: "mfe5-3-we4",
      title: "Worked example 4: work by friction from $\\Delta K$",
      problem:
        "A 1 kg block is released from rest at the top of a rough curved track 5 m high and reaches the bottom at 8 m/s. How much work did friction do?",
      steps: [
        { text: "Work-energy: $W_g + W_N + W_f = \\Delta K$. Gravity: $mgh = 50$ J. Normal force: zero (always perpendicular to the track)." },
        { text: "$\\Delta K = \\tfrac12 \\times 1 \\times 64 = 32$ J." },
        { text: "$W_f = 32 - 50 = -18$ J. *Why this step:* friction's force varies round the curve and would be hopeless to integrate directly; the theorem sidesteps it." },
      ],
      answer: "$W_f = -18$ J.",
    },
    {
      type: "worked-example",
      id: "mfe5-3-we5",
      title: "Worked example 5: chain on a table",
      problem:
        "A uniform 3 kg chain, 1.8 m long, lies on a smooth table with one third of its length hanging over the edge. How much work is needed to pull the hanging part slowly back onto the table?",
      steps: [
        { text: "The hanging part has mass 1 kg and length 0.6 m; its centre of mass is 0.3 m below the table top." },
        { text: "Pulling slowly, $\\Delta K = 0$, so $W_{\\text{you}} + W_g = 0$." },
        { text: "Gravity does $W_g = -(1)(10)(0.3) = -3$ J as that part rises 0.3 m. *Why this step:* for an extended body, gravity's work depends on how far its centre of mass rises." },
        { text: "$W_{\\text{you}} = 3$ J. In general $\\dfrac{MgL}{2n^2}$ for a fraction $\\frac1n$ hanging: here $\\frac{3 \\times 10 \\times 1.8}{18} = 3$ J." },
      ],
      answer: "$W = 3$ J.",
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
    { type: "heading", text: "Check your understanding" },
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
      hint: "Same road means the same friction force. By the work-energy theorem, $f d = \\tfrac12 m u^2$, so how does $d$ scale with $u$?",
    },
    {
      type: "numeric",
      id: "mfe5-3-q2",
      variant: "practice",
      question: "A 2 kg block slides from rest down a rough ramp that drops 4 m and arrives at the bottom at 6 m/s. What work did friction do on it? Take $g = 10$ m/s² and give your answer in joules (with its sign).",
      answer: -44,
      unit: "J",
      hint: "Work-energy: $W_g + W_N + W_f = \\Delta K$, and the normal force does no work.",
      solution: "$W_g = mgh = 2 \\times 10 \\times 4 = 80$ J and $\\Delta K = \\tfrac12 \\times 2 \\times 6^2 = 36$ J. So $W_f = \\Delta K - W_g = 36 - 80 = -44$ J.",
      commonMistakes: [
        { answer: -36, feedback: "36 J is the final KE, not the loss." },
        { answer: 44, feedback: "Friction took energy away; its work is negative." },
        { answer: -80, feedback: "That would leave the block with no KE at all." },
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
      hint: "Use $K = \\dfrac{p^2}{2m}$: at equal $K$, how does $p$ depend on $m$?",
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
      type: "numeric",
      id: "mfe5-3-q5",
      variant: "practice",
      question: "A 2 kg block is released from a spring ($k = 200$ N/m) compressed by 20 cm on a floor with $\\mu = 0.2$ ($g = 10$ m/s²). At what compression is its speed greatest? Give your answer in centimetres.",
      answer: 2,
      unit: "cm",
      hint: "The kinetic energy stops growing where the net force on the block changes sign.",
      solution: "Speed is greatest where the net force is zero, $kx = \\mu mg$: $x = \\dfrac{0.2 \\times 2 \\times 10}{200} = 0.02$ m $= 2$ cm, still on the compressed side.",
      commonMistakes: [
        { answer: 0, feedback: "At $x = 0$ the spring force is zero and friction is already decelerating the block." },
        { answer: 4, feedback: "That is $\\frac{2\\mu mg}{k}$, the amplitude lost per pass, not the point of maximum speed." },
        { answer: 10, feedback: "Halfway is not special. The speed is greatest where the net force is zero." },
      ],
    },
    {
      type: "quiz",
      id: "mfe5-3-q6",
      variant: "practice",
      multiple: true,
      question: "Body A (1 kg) and body B (4 kg) have the **same kinetic energy**. Select all the statements that are correct.",
      options: [
        { text: "B has twice the momentum of A.", correct: true, feedback: "$p = \\sqrt{2mK}$, so $p \\propto \\sqrt m$ at fixed $K$: $\\sqrt4 = 2$." },
        { text: "A moves twice as fast as B.", correct: true, feedback: "$v = \\sqrt{2K/m}$, so $v \\propto 1/\\sqrt m$: A is twice as fast." },
        { text: "Equal constant retarding forces stop them in equal distances.", correct: true, feedback: "Work-energy: $Fd = K$, and $K$ is the same, so $d$ is the same." },
        { text: "Equal constant retarding forces stop them in equal times.", feedback: "The stopping time is $t = p/F$ (impulse equals momentum), and B has twice the momentum, so B takes twice as long." },
      ],
      hint: "Use $K = \\frac12 mv^2 = \\frac{p^2}{2m}$ at equal $K$ for the speeds and momenta. For stopping, the work-energy theorem gives distance ($Fd = K$) and the impulse-momentum theorem gives time ($Ft = p$).",
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
    { type: "heading", text: "Why gravity is path-independent" },
    {
      type: "text",
      content:
        "Near the Earth gravity is the constant vector $-mg\\,\\hat j$. On any path from A to B, $W = \\vec F\\cdot\\vec s_{\\text{total}}$ summed over little steps, and only the vertical part of each step counts. The vertical steps add up to the total change in height, whatever the path does in between: $W_g = -mg(h_B - h_A)$. Friction, by contrast, always opposes the motion, so every step adds more negative work, and a longer path means more of it.",
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
    { type: "heading", text: "Conservation of mechanical energy" },
    {
      type: "text",
      content:
        "Split the total work into conservative and non-conservative parts. The work-energy theorem gives $W_{\\text{cons}} + W_{\\text{nc}} = \\Delta K$, and $W_{\\text{cons}} = -\\Delta U$. Rearranging:",
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
    { type: "heading", text: "The vertical circle revisited" },
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
    { type: "heading", text: "Loops, springs, pendulums and friction losses" },
    {
      type: "worked-example",
      id: "mfe5-4-we1",
      title: "Worked example 1: loop-the-loop",
      problem:
        "A small ball is released from rest at height $h$ on a smooth track that runs into a vertical loop of radius $R$. Find the least $h$ for the ball to go round the loop, and the normal force at the bottom of the loop for that release height.",
      steps: [
        { text: "At the top of the loop, contact needs $N \\ge 0$: $N + mg = \\frac{mv_{\\text{top}}^2}{R}$, so $v_{\\text{top}}^2 \\ge gR$. *Why this step:* Newton's law at one point sets the condition; energy then links that point to the start." },
        { text: "Energy from release to the top of the loop (height $2R$): $mgh = mg(2R) + \\tfrac12 mv_{\\text{top}}^2 \\ge 2mgR + \\tfrac12 mgR$." },
        { text: "$h \\ge \\tfrac52 R$. For $R = 0.4$ m, the least release height is 1 m." },
        { text: "At the bottom of the loop, $v^2 = 2gh = 5gR$, so $N = mg + \\frac{m \\cdot 5gR}{R} = 6mg$." },
      ],
      answer: "$h_{\\min} = \\tfrac52 R$ (1 m for $R = 0.4$ m); then $N = 6mg$ at the bottom.",
    },
    {
      type: "worked-example",
      id: "mfe5-4-we2",
      title: "Worked example 2: ramp into a spring",
      problem:
        "A 2 kg block slides from rest down a smooth ramp of height 0.8 m and then along a smooth floor into a spring of $k = 800$ N/m. Find the maximum compression.",
      steps: [
        { text: "At maximum compression the block is momentarily at rest: all the initial PE is now spring PE. *Why this step:* choose the two instants where $K = 0$, and the kinetic terms disappear." },
        { text: "$mgh = \\tfrac12 kx^2$: $2 \\times 10 \\times 0.8 = 400x^2$, so $x^2 = 0.04$ and $x = 0.2$ m." },
      ],
      answer: "$x = 0.2$ m.",
    },
    {
      type: "worked-example",
      id: "mfe5-4-we3",
      title: "Worked example 3: pendulum",
      problem:
        "A bob on a 2.5 m string is released from rest with the string at $60^\\circ$ to the vertical. Find its speed at the bottom and the tension there, per unit of $mg$.",
      steps: [
        { text: "Drop in height: $l(1 - \\cos 60^\\circ) = 1.25$ m." },
        { text: "$v^2 = 2g \\times 1.25 = 25$, so $v = 5$ m/s." },
        { text: "At the bottom: $T - mg = \\frac{mv^2}{l} = m \\times 10$, so $T = 2mg$." },
      ],
      answer: "$v = 5$ m/s and $T = 2mg$.",
    },
    {
      type: "worked-example",
      id: "mfe5-4-we4",
      title: "Worked example 4: bead on a wire",
      problem:
        "A bead slides without friction along a twisting wire, starting from rest at a height of 5 m. How fast is it moving where the wire is 1.8 m high?",
      steps: [
        { text: "The wire's normal force is always perpendicular to the bead's motion, so it does no work. *Why this step:* the wire's shape is irrelevant; only the heights matter." },
        { text: "$\\tfrac12 v^2 = g(5 - 1.8) = 32$, so $v = 8$ m/s." },
      ],
      answer: "$v = 8$ m/s.",
    },
    {
      type: "worked-example",
      id: "mfe5-4-we5",
      title: "Worked example 5: where did the energy go?",
      problem:
        "A 2 kg block slides from rest down a rough slope of height 5 m and reaches the bottom at 6 m/s. How much mechanical energy was lost?",
      steps: [
        { text: "$E_i = mgh = 100$ J (taking $U = 0$ at the bottom). $E_f = \\tfrac12 \\times 2 \\times 36 = 36$ J." },
        { text: "$W_{\\text{nc}} = E_f - E_i = -64$ J: friction turned 64 J into heat in the block and the slope." },
      ],
      answer: "64 J of mechanical energy lost to heat.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"potential energy belongs to the body alone\"",
      content:
        "Gravitational PE belongs to the **body–Earth system**, spring PE to the **spring** (with whatever it is attached to). And its zero is a free choice: measure $h$ from the floor or from the table and every $U$ shifts by the same constant. Only **differences** in $U$ are physical, which is why $\\Delta U$, not $U$, appears in every equation.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "mfe5-4-q1",
      variant: "practice",
      question: "A ball is released from rest on a smooth track and must loop a vertical circle of radius 0.6 m. What is the least release height above the bottom of the loop? Give your answer in metres.",
      answer: 1.5,
      tolerance: 0.01,
      unit: "m",
      hint: "At the top of the loop contact needs $v_{\\text{top}}^2 \\ge gR$. Link that point to the release point with energy.",
      solution: "At the top, $N \\ge 0$ needs $v_{\\text{top}}^2 \\ge gR$. Energy from release to the top (height $2R$): $mgh = 2mgR + \\tfrac12 mv_{\\text{top}}^2 \\ge \\tfrac52 mgR$. So $h_{\\min} = \\tfrac52 R = 2.5 \\times 0.6 = 1.5$ m.",
      commonMistakes: [
        { answer: 1.2, feedback: "That only reaches the top of the loop with zero speed, but the ball would fall off before getting there." },
        { answer: 3, feedback: "That is $5R$. Energy gives $v^2 = 2gh$, and the loop needs $v^2 = 5gR$ at the bottom, so $h = \\frac52 R$." },
        { answer: 0.6, feedback: "That would reach only the level of the loop's centre." },
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
      hint: "With a smooth ramp, mechanical energy is conserved. Which energy does the block have at the top, and which at maximum compression?",
    },
    {
      type: "quiz",
      id: "mfe5-4-q3",
      variant: "concept",
      multiple: true,
      question: "Which of these forces are non-conservative? Select all that apply.",
      options: [
        { text: "The gravitational force of the Earth", feedback: "Gravity's work depends only on the change of height, so it is conservative." },
        { text: "Air resistance on a moving ball", correct: true, feedback: "It always opposes motion, so it does negative work on every leg and more on longer paths." },
        { text: "The force of an ideal spring", feedback: "Its work depends only on the initial and final extensions, so it is conservative." },
        { text: "Kinetic friction on a block sliding over a fixed floor", correct: true, feedback: "Like air drag it always opposes the sliding, so a round trip leaves negative work, not zero." },
      ],
      hint: "A force is conservative if its work around any closed path is zero. For each, ask whether going out and coming back always returns the energy.",
    },
    {
      type: "numeric",
      id: "mfe5-4-q4",
      variant: "practice",
      question: "The potential energy of a particle is $U = 5x^2 - 3x$ J ($x$ in m). What force acts on it at $x = 1$ m? Give the $x$-component in newtons (negative means along $-x$).",
      answer: -7,
      unit: "N",
      hint: "The force is minus the slope of $U$: $F = -\\dfrac{dU}{dx}$.",
      solution: "$\\dfrac{dU}{dx} = 10x - 3 = 7$ at $x = 1$, so $F = -7$ N: 7 N along $-x$.",
      commonMistakes: [
        { answer: 7, feedback: "$dU/dx = 7$, but the force is **minus** the slope." },
        { answer: 2, feedback: "That is $U(1)$. The force comes from the slope of $U$, not its value." },
        { answer: -10, feedback: "You dropped the $-3$ from the derivative." },
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
      hint: "Which quantity is conserved between release and the lowest point, and how far does the bob fall?",
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
    { type: "heading", text: "Reading a potential energy curve" },
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
    { type: "heading", text: "Stable, unstable and neutral equilibrium" },
    {
      type: "callout",
      variant: "definition",
      title: "Equilibrium and its nature",
      content:
        "A particle is in **equilibrium** where $F = -\\frac{dU}{dx} = 0$: a flat point of the curve.\n- **Stable** at a minimum of $U$ ($\\frac{d^2U}{dx^2} > 0$): a small displacement produces a force back towards equilibrium.\n- **Unstable** at a maximum ($\\frac{d^2U}{dx^2} < 0$): a small displacement produces a force pushing it further away.\n- **Neutral** where $U$ is constant nearby: displaced, it stays put.",
    },
    {
      type: "worked-example",
      id: "mfe5-5-we1",
      title: "Worked example 1: the double well",
      problem:
        "For $U = x^4 - 4x^2$, find the equilibria and their nature.",
      steps: [
        { text: "$\\frac{dU}{dx} = 4x^3 - 8x = 4x(x^2 - 2) = 0$: $x = 0$ or $x = \\pm\\sqrt2$." },
        { text: "$\\frac{d^2U}{dx^2} = 12x^2 - 8$. At $x = 0$: $-8 < 0$, **unstable**. At $x = \\pm\\sqrt2$: $24 - 8 = 16 > 0$, **stable**. *Why this step:* the second derivative says whether the flat point is a valley or a hilltop." },
      ],
      answer: "$x = 0$ unstable; $x = \\pm\\sqrt2$ stable.",
    },
    {
      type: "worked-example",
      id: "mfe5-5-we2",
      title: "Worked example 2: allowed region",
      problem:
        "A 1 kg particle moves in this potential with total energy $E = -2$ J. Where can it be, and what is its greatest speed?",
      steps: [
        { text: "Allowed: $x^4 - 4x^2 \\le -2$. Put $u = x^2$: $u^2 - 4u + 2 \\le 0$, so $2 - \\sqrt2 \\le u \\le 2 + \\sqrt2$." },
        { text: "So $0.765 \\lesssim |x| \\lesssim 1.848$: two separate intervals. The particle stays in whichever valley it starts in. *Why this step:* the hump at $x = 0$ has $U = 0 > E$, a wall it cannot cross." },
        { text: "Greatest speed at the bottom, $U = -4$ J: $K = -2 - (-4) = 2$ J, so $v = \\sqrt{2K/m} = 2$ m/s." },
      ],
      answer: "$0.765 \\lesssim |x| \\lesssim 1.848$ (one valley); greatest speed 2 m/s.",
    },
    {
      type: "worked-example",
      id: "mfe5-5-we3",
      title: "Worked example 3: molecules: the Lennard-Jones potential",
      problem:
        "The energy of two atoms a distance $x$ apart is modelled by $U = \\dfrac{a}{x^{12}} - \\dfrac{b}{x^6}$ ($a, b > 0$). Find the equilibrium separation and its nature.",
      steps: [
        { text: "$\\dfrac{dU}{dx} = -\\dfrac{12a}{x^{13}} + \\dfrac{6b}{x^7} = 0 \\Rightarrow x^6 = \\dfrac{2a}{b}$, so $x_0 = \\left(\\dfrac{2a}{b}\\right)^{1/6}$." },
        { text: "Closer than $x_0$ the steep $\\frac{a}{x^{12}}$ term wins and $U$ shoots up (repulsion); further away $U$ rises towards 0 (attraction). So $x_0$ is a minimum: **stable**. This is the bond length." },
        { text: "At $x_0$, $U = \\dfrac{a}{(2a/b)^2} - \\dfrac{b}{2a/b} = \\dfrac{b^2}{4a} - \\dfrac{b^2}{2a} = -\\dfrac{b^2}{4a}$: the energy needed to pull the atoms apart is $\\dfrac{b^2}{4a}$." },
      ],
      answer: "$x_0 = (2a/b)^{1/6}$, a stable equilibrium (with $U = -\\dfrac{b^2}{4a}$ there).",
    },
    {
      type: "worked-example",
      id: "mfe5-5-we4",
      title: "Worked example 4: force and equilibria from a cubic",
      problem:
        "$U = 3x^2 - 2x^3$ J. Find the force at $x = 2$ m and classify the equilibria.",
      steps: [
        { text: "$F = -\\dfrac{dU}{dx} = -(6x - 6x^2) = 6x^2 - 6x$. At $x = 2$: $F = 24 - 12 = 12$ N, along $+x$." },
        { text: "Equilibria: $6x(1 - x) = 0$ at $x = 0$ and $x = 1$." },
        { text: "$U'' = 6 - 12x$: $+6$ at $x = 0$ (stable), $-6$ at $x = 1$ (unstable)." },
      ],
      answer: "$F = 12$ N along $+x$; $x = 0$ stable, $x = 1$ unstable.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"at a point where $U$ is zero the force is zero\"",
      content:
        "The force depends on the **slope** of $U$, not its value. For $U = x^4 - 4x^2$, $U = 0$ at $x = 2$, but the slope there is $32 - 16 = 16$, so $F = -16$ N. And $U = -4$ J (not zero) at $x = \\sqrt2$, where the force *is* zero. Shifting the zero of $U$ changes every value but no slope, which is exactly why only the slope can be physical.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "mfe5-5-q1",
      variant: "practice",
      question: "For $U = x^4 - 4x^2$ (SI units), what is the force at $x = 1$ m? Give the $x$-component in newtons (negative means along $-x$).",
      answer: 4,
      unit: "N",
      hint: "Differentiate $U$, evaluate at $x = 1$, then flip the sign.",
      solution: "$U'(x) = 4x^3 - 8x$, so $U'(1) = 4 - 8 = -4$ J/m and $F = -U'(1) = +4$ N, pushing the particle towards the valley at $x = \\sqrt2$.",
      commonMistakes: [
        { answer: -3, feedback: "That is $U(1)$. The force is minus the slope." },
        { answer: -4, feedback: "That is the slope $U'(1)$. The force is its negative." },
        { answer: 0, feedback: "The flat points are at $0$ and $\\pm\\sqrt2$, not at 1." },
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
      hint: "The second derivative tells you the shape of $U$ there. Is the curve at the top of a hill or the bottom of a valley, and what happens after a small push?",
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
      hint: "Equilibrium is where $F = -\\dfrac{dU}{dx} = 0$. Differentiate both terms and solve for $x$.",
    },
    {
      type: "numeric",
      id: "mfe5-5-q4",
      variant: "practice",
      question: "A 2 kg particle moves in $U = x^4 - 4x^2$ J ($x$ in m) with total energy $E = 0$. What is its greatest speed? Give your answer in m/s.",
      answer: 2,
      tolerance: 0.01,
      unit: "m/s",
      hint: "$K = E - U$ is largest where $U$ is lowest. Where are the valley floors, and how deep are they?",
      solution: "The minima are at $x = \\pm\\sqrt2$, where $U = 4 - 8 = -4$ J. There $K = E - U = 0 - (-4) = 4$ J, so $v = \\sqrt{2K/m} = \\sqrt{2 \\times 4/2} = 2$ m/s.",
      commonMistakes: [
        { answer: 2.83, tolerance: 0.02, feedback: "That is the speed for a 1 kg particle. Here $m = 2$ kg." },
        { answer: 0, feedback: "$E = 0$ is the energy, not the kinetic energy; $K = E - U$ is largest where $U$ is lowest." },
        { answer: 4, feedback: "That is $\\sqrt{2 \\cdot 4 \\cdot 2}$: multiply by $\\frac{2}{m}$, not by $2m$." },
      ],
    },
    {
      type: "quiz",
      id: "mfe5-5-q5",
      variant: "concept",
      multiple: true,
      question: "A particle moves along $x$ with $U = 3x^2 - 2x^3$ (SI units). Select all the statements that are true.",
      options: [
        { text: "$x = 0$ is a point of stable equilibrium.", correct: true, feedback: "$U'(0) = 0$ and $U'' = 6 - 12x$ is $+6$ there: a valley." },
        { text: "$x = 1$ is a point of unstable equilibrium.", correct: true, feedback: "$U'(1) = 6 - 6 = 0$ and $U''(1) = -6 < 0$: a hilltop." },
        { text: "$x = 1$ is a point of stable equilibrium.", feedback: "Check the sign of $U'' = 6 - 12x$ at $x = 1$: it is negative, a maximum." },
        { text: "The force at $x = 2$ m is 12 N along $+x$.", correct: true, feedback: "$F = -(6x - 6x^2) = 6x^2 - 6x = 24 - 12 = 12$ N, positive." },
        { text: "A particle placed at rest at $x = 0.5$ m stays at rest.", feedback: "$U'(0.5) = 3 - 1.5 = 1.5 \\ne 0$, so a force of $-1.5$ N acts there: it is not an equilibrium." },
      ],
      hint: "Find the equilibria from $U'(x) = 0$, classify each with the sign of $U''$, and get the force anywhere from $F = -U'(x)$, being careful with its sign.",
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
    { type: "heading", text: "Power in terms of force and velocity" },
    {
      type: "text",
      content:
        "In a small time $dt$ the point where the force acts moves $d\\vec s$, and the force does $dW = \\vec F\\cdot d\\vec s$. Divide by $dt$:",
    },
    {
      type: "math",
      latex: "P = \\frac{dW}{dt} = \\vec F\\cdot\\frac{d\\vec s}{dt} = \\vec F\\cdot\\vec v",
    },
    { type: "heading", text: "Constant power" },
    {
      type: "text",
      content:
        "An engine at full throttle delivers roughly constant power. Then the driving force is $F = \\frac{P}{v}$: large at low speed, small at high speed. The graph shows $F = \\frac{2000}{v}$ for a 2 kW motor, with $x$ standing for the speed $v$ in m/s and the curve giving the force in newtons.",
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
    { type: "heading", text: "Cars, motors and pumps" },
    {
      type: "worked-example",
      id: "mfe5-6-we1",
      title: "Worked example 1: cruising car",
      problem:
        "A 1000 kg car cruises at a steady 20 m/s against a total resistance of 500 N. What power does the engine deliver to the wheels?",
      steps: [
        { text: "Steady speed: driving force = resistance = 500 N. *Why this step:* at constant velocity the net force is zero, so the drive only has to cancel resistance; the mass is irrelevant." },
        { text: "$P = Fv = 500 \\times 20 = 10\\,000$ W $= 10$ kW." },
      ],
      answer: "$P = 10$ kW.",
    },
    {
      type: "worked-example",
      id: "mfe5-6-we2",
      title: "Worked example 2: motor lifting a load",
      problem:
        "A motor raises a 50 kg load through 10 m at steady speed in 20 s. Find its power output.",
      steps: [
        { text: "$W = mgh = 5000$ J, so $P = \\frac{5000}{20} = 250$ W. (Or: $F = 500$ N at $v = 0.5$ m/s, $P = 250$ W.)" },
      ],
      answer: "$P = 250$ W.",
    },
    {
      type: "worked-example",
      id: "mfe5-6-we3",
      title: "Worked example 3: pump and efficiency",
      problem:
        "A pump lifts 1000 kg of water from a well 10 m deep in 5 minutes. Its efficiency is 60%. Find the useful power and the electrical input.",
      steps: [
        { text: "Useful work: $mgh = 1000 \\times 10 \\times 10 = 10^5$ J in 300 s: $P_{\\text{out}} = \\frac{10^5}{300} \\approx 333$ W." },
        { text: "Efficiency $= \\frac{P_{\\text{out}}}{P_{\\text{in}}}$, so $P_{\\text{in}} = \\frac{333}{0.6} \\approx 556$ W. *Why this step:* efficiency is always output over input, so the input is larger." },
      ],
      answer: "Useful power $\\approx 333$ W; electrical input $\\approx 556$ W.",
    },
    {
      type: "worked-example",
      id: "mfe5-6-we4",
      title: "Worked example 4: top speed up a hill, JEE Main",
      problem:
        "A 1000 kg car with an engine of maximum power 30 kW climbs a slope of 1 in 20 ($\\sin\\theta = \\frac{1}{20}$) against a resistance of 500 N. Find its top speed.",
      steps: [
        { text: "At top speed the acceleration is zero, so the driving force equals the total opposition: $mg\\sin\\theta + f = 1000 \\times 10 \\times \\frac{1}{20} + 500 = 1000$ N. *Why this step:* on a slope, the weight's down-slope part is extra resistance." },
        { text: "$v_{\\max} = \\dfrac{P}{F} = \\dfrac{30\\,000}{1000} = 30$ m/s." },
      ],
      answer: "$v_{\\max} = 30$ m/s.",
    },
    {
      type: "worked-example",
      id: "mfe5-6-we5",
      title: "Worked example 5: power of a variable force",
      problem:
        "A force $F = 2t$ N acts on a 1 kg body initially at rest. Find the power at $t = 2$ s and the average power over the first 2 s.",
      steps: [
        { text: "$a = 2t$, so $v = t^2$. *Why this step:* power needs the velocity at that instant, so integrate the acceleration first." },
        { text: "$P = Fv = 2t \\cdot t^2 = 2t^3$; at $t = 2$: $P = 16$ W." },
        { text: "Average: $W = \\Delta K = \\tfrac12 \\times 1 \\times (4)^2 = 8$ J in 2 s: $P_{\\text{avg}} = 4$ W. (Check: $\\frac{1}{2}\\int_0^2 2t^3\\,dt = \\frac12 \\times 8 = 4$ W.)" },
      ],
      answer: "$P = 16$ W at $t = 2$ s; average 4 W.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"more power means more force\"",
      content:
        "Power is force **times speed**. A 100 kW sports car at 50 m/s pushes with only 2000 N; a 50 kW tractor crawling at 2 m/s pushes with 25 000 N. Gears exist precisely to trade speed for force at fixed engine power.",
    },
    { type: "heading", text: "Check your understanding" },
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
      hint: "At steady speed, how does the engine's force compare with the resistance? Then relate force, speed and power.",
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
      hint: "A kWh is a power multiplied by a time. Convert both to SI units.",
    },
    {
      type: "numeric",
      id: "mfe5-6-q3",
      variant: "practice",
      question: "A 2000 kg truck with a maximum power of 60 kW climbs a slope with $\\sin\\theta = 0.1$ against a resistance of 1000 N. Taking $g = 10$ m/s², what is its top speed? Give your answer in m/s.",
      answer: 20,
      unit: "m/s",
      hint: "At top speed the acceleration is zero: the driving force equals the down-slope part of the weight plus the resistance.",
      solution: "Opposition: $mg\\sin\\theta + f = 2000 \\times 10 \\times 0.1 + 1000 = 3000$ N. At top speed the driving force equals this, so $v = \\dfrac{P}{F} = \\dfrac{60\\,000}{3000} = 20$ m/s.",
      commonMistakes: [
        { answer: 60, feedback: "That ignores the slope; the weight adds $2000 \\times 10 \\times 0.1 = 2000$ N of opposition." },
        { answer: 30, feedback: "That uses only the slope's 2000 N and forgets the 1000 N resistance." },
        { answer: 3, feedback: "That divides by the full weight, 20 000 N. Only the down-slope part $mg\\sin\\theta$ opposes the motion." },
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
      hint: "With constant power, $F = P/v$. How does the driving force, and hence $a = F/m$, change when $v$ doubles?",
    },
    {
      type: "numeric",
      id: "mfe5-6-q5",
      variant: "practice",
      question: "A crane lifts a 200 kg load at a steady 0.5 m/s. Taking $g = 10$ m/s², what power does it deliver to the load? Give your answer in watts.",
      answer: 1000,
      unit: "W",
      hint: "Steady speed: the crane's pull equals the weight. Then $P = Fv$.",
      solution: "At steady speed the pull is $F = mg = 200 \\times 10 = 2000$ N, so $P = Fv = 2000 \\times 0.5 = 1000$ W.",
      commonMistakes: [
        { answer: 100, feedback: "That uses the mass instead of the weight." },
        { answer: 25, feedback: "That is $\\tfrac12 mv^2$, a kinetic energy, not a power." },
      ],
    },
    {
      type: "quiz",
      id: "mfe5-6-q6",
      variant: "practice",
      multiple: true,
      question: "A car starts from rest on a level road and its engine delivers **constant power** $P$. Ignoring all resistance, select all the statements that are correct.",
      options: [
        { text: "The driving force is inversely proportional to the speed.", correct: true, feedback: "$P = Fv$ with $P$ fixed, so $F = P/v$." },
        { text: "The kinetic energy increases linearly with time.", correct: true, feedback: "All the engine's work goes into KE: $\\tfrac12 mv^2 = Pt$." },
        { text: "The speed increases linearly with time.", feedback: "That needs a constant force. Here $\\tfrac12 mv^2 = Pt$ gives $v = \\sqrt{2Pt/m} \\propto \\sqrt t$." },
        { text: "The distance covered is proportional to $t^{3/2}$.", correct: true, feedback: "$v = \\sqrt{2P/m}\\,t^{1/2}$; integrating, $x = \\tfrac23\\sqrt{2P/m}\\,t^{3/2}$." },
        { text: "The acceleration stays constant.", feedback: "$a = \\dfrac{P}{mv}$ falls as the car speeds up." },
      ],
      hint: "With constant $P$, the work done is $Pt$, which equals the kinetic energy. Get $v(t)$ from that, then $F = P/v$, $a = dv/dt$ and $x = \\int v\\,dt$, and test each statement.",
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
      multiple: true,
      question: "A box is lifted vertically at constant velocity by a rope. Select all the statements about the work done on it that are correct.",
      options: [
        { text: "Only tension does work, since gravity is balanced.", feedback: "Balanced forces still each do work; they just cancel in the total." },
        { text: "Tension does positive work on the box.", correct: true, feedback: "The rope pulls up and the box moves up." },
        { text: "Gravity does negative work, equal in size to the work done by tension.", correct: true, feedback: "Constant velocity: $\\Delta K = 0$, so $W_T + W_g = 0$." },
        { text: "Total work is positive, since the box gains height.", feedback: "Gaining height increases potential energy, but the *total* work equals $\\Delta K = 0$." },
        { text: "The box–Earth system's gravitational PE rises by exactly the work done by tension.", correct: true, feedback: "$\\Delta U = -W_g = W_T$: here the rope's work all ends up as potential energy." },
      ],
      hint: "Lessons 5.1 and 5.3: find each force's work from its angle to the motion, and the total from $\\Delta K$.",
    },
    {
      type: "numeric",
      id: "mfe5-7-q2",
      variant: "mastery",
      question: "A spring ($k = 400$ N/m) is already stretched by 5 cm. How much more work is needed to stretch it to 10 cm? Give your answer in joules.",
      answer: 1.5,
      tolerance: 0.01,
      unit: "J",
      hint: "Work done on a spring (lesson 5.2), with extensions in metres.",
      solution: "$W = \\tfrac12 k(x_2^2 - x_1^2) = \\tfrac12 \\times 400 \\times (0.1^2 - 0.05^2) = 200 \\times 0.0075 = 1.5$ J. Check with the average force: it grows from 20 N to 40 N, averaging 30 N over 0.05 m, which is 1.5 J.",
      commonMistakes: [
        { answer: 0.5, feedback: "That is $\\tfrac12 k(0.05)^2$, the work for the *first* 5 cm." },
        { answer: 2, feedback: "That is from 0 to 10 cm." },
        { answer: 1, feedback: "That is $k \\times 0.05 \\times 0.05$, a rectangle. The force grows linearly from 20 N to 40 N, so average it: 30 N × 0.05 m." },
      ],
    },
    {
      type: "numeric",
      id: "mfe5-7-q3",
      variant: "mastery",
      question: "The force on a particle along $x$ is 4 N from $x = 0$ to 3 m, then falls linearly to $-4$ N at $x = 7$ m. What is the total work from 0 to 7 m? Give your answer in joules.",
      answer: 12,
      unit: "J",
      hint: "Find where the force crosses zero, then add signed areas.",
      solution: "The force falls by 8 N over 4 m, so it crosses zero at $x = 5$ m. Rectangle 0 to 3 m: $4 \\times 3 = 12$ J. Triangle 3 to 5 m (above the axis): $+\\tfrac12 \\times 2 \\times 4 = +4$ J. Triangle 5 to 7 m (below the axis): $-4$ J. Total: $12 + 4 - 4 = 12$ J.",
      commonMistakes: [
        { answer: 20, feedback: "That adds the negative triangle (from 5 to 7 m) instead of subtracting it." },
        { answer: 16, feedback: "That stops at $x = 5$ m. The last 2 m, with the force reversed, take 4 J back." },
        { answer: 28, feedback: "That is $4 \\times 7$, assuming the force stays at 4 N." },
      ],
    },
    {
      type: "numeric",
      id: "mfe5-7-q4",
      variant: "mastery",
      question: "A cyclist at 15 m/s brakes hard, locking the wheels ($\\mu_k = 0.45$, $g = 10$ m/s²). How far does the bike skid? Give your answer in metres.",
      answer: 25,
      unit: "m",
      hint: "The work–energy theorem with friction (lesson 5.3).",
      solution: "Only friction does work: $-\\mu mg\\,d = 0 - \\tfrac12 mv^2$, so $d = \\dfrac{v^2}{2\\mu g} = \\dfrac{225}{2 \\times 0.45 \\times 10} = \\dfrac{225}{9} = 25$ m.",
      commonMistakes: [
        { answer: 50, feedback: "That is $\\frac{v^2}{\\mu g}$: the $\\tfrac12$ in the kinetic energy is missing." },
        { answer: 3.33, tolerance: 0.05, feedback: "That is $\\frac{v}{\\mu g}$, the stopping *time* in seconds." },
      ],
    },
    {
      type: "quiz",
      id: "mfe5-7-q5",
      variant: "mastery",
      question: "A ball released from the least possible height just loops a smooth vertical loop of radius $R$. What is the normal force on it when it is level with the centre of the loop, in units of $mg$?",
      options: [
        { text: "$4mg$", feedback: "You added the weight. Level with the centre, the weight is tangential and does not enter the radial equation." },
        { text: "$2mg$", feedback: "That uses $v^2 = 2gR$, a fall of only $R$. The release point is $2.5R$ up, so at height $R$ the ball has fallen $1.5R$." },
        { text: "$6mg$", feedback: "That is the normal force at the bottom of the loop, not at the side." },
        { text: "$3mg$", correct: true, feedback: "Released from $2.5R$, it has fallen $1.5R$ at the side, so $v^2 = 3gR$. The normal force is horizontal there and alone supplies $\\frac{mv^2}{R} = 3mg$." },
      ],
      hint: "Lesson 5.4: energy conservation for $v^2$ at that point, then the radial equation there.",
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
      hint: "Lesson 5.5: $U' = 0$ for the equilibria, and the sign of $U''$ for their nature.",
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
      hint: "Power on a slope (lesson 5.6).",
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
      hint: "Energy conservation in a pendulum, then the radial equation (lesson 5.4).",
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
      hint: "Constant-power motion (lesson 5.6).",
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
      hint: "The work–energy theorem with a spring and friction (lesson 5.3).",
    },
    {
      type: "numeric",
      id: "mfe5-7-q11",
      variant: "mastery",
      question: "JEE Advanced. The same block (1 kg, $k = 100$ N/m, $\\mu = 0.1$, released from 0.5 m compression, $g = 10$ m/s²) oscillates back and forth until it stops for good. What total distance does it slide? Give your answer in metres.",
      answer: 12.5,
      tolerance: 0.01,
      unit: "m",
      hint: "Check where it ends: does it stop at $x = 0$, where the spring stores no energy?",
      solution: "Each pass loses $\\dfrac{2\\mu mg}{k} = 0.02$ m of amplitude: 0.5, 0.48, …, 0.02, 0. At every turning point before the last, $kA \\ge 2$ N exceeds the 1 N of static friction, so it moves on; after 25 passes it stops exactly at the natural length, with no spring energy left.\n\nSo all of $\\tfrac12 kx_0^2 = \\tfrac12 \\times 100 \\times 0.25 = 12.5$ J went to friction: $\\mu mg\\,d = 12.5$, and with $\\mu mg = 1$ N, $d = 12.5$ m.",
      commonMistakes: [
        { answer: 1, feedback: "That is one pass there and back. The block makes many passes before stopping." },
        { answer: 25, feedback: "That counts 25 passes of 1 m each. The passes get shorter by 0.04 m each time." },
        { answer: 6.25, feedback: "That uses $\\frac{\\frac12 kx_0^2}{2\\mu mg}$. The friction force is $\\mu mg = 1$ N, and the whole 12.5 J goes to it." },
      ],
    },
    {
      type: "quiz",
      id: "mfe5-7-q12",
      variant: "mastery",
      question: "JEE Advanced. A 1 kg particle moves in $U(x) = x^4 - 8x^2$ J with total energy $-12$ J, starting near $x = 2$ m. What are its turning points and greatest speed?",
      options: [
        { text: "About $-2.45$ m and $+2.45$ m; $v_{\\max} = 2\\sqrt2$ m/s", feedback: "The hump at $x = 0$ has $U = 0 > E$; the particle cannot cross to negative $x$." },
        { text: "$x = \\sqrt2$ and $\\sqrt6$, i.e. about 1.41 m and 2.45 m; $v_{\\max} = 2\\sqrt2 \\approx 2.83$ m/s", correct: true, feedback: "$x^4 - 8x^2 = -12$ gives $x^2 = 2$ or $6$. At the valley floor ($x = 2$) $U = -16$ J, so $K = 4$ J and $v = \\sqrt{2K/m} = 2\\sqrt2$ m/s." },
        { text: "About 1.41 m and 2.45 m; $v_{\\max} = 2$ m/s", feedback: "$K = 4$ J gives $v = \\sqrt{2K/m} = 2\\sqrt2$ m/s; $2$ m/s would need $K = 2$ J." },
        { text: "$0$ and $2\\sqrt2$ m; $v_{\\max} = 4\\sqrt2$ m/s", feedback: "Those are where $U = 0$, the turning points for $E = 0$, not $E = -12$ J." },
      ],
      hint: "Lesson 5.5: turning points are where $U = E$; the speed is greatest where $U$ is least.",
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
