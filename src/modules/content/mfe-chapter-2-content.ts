import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Mechanics I Chapter 2 — Motion in a Plane.
 * Two-dimensional kinematics by splitting into two independent
 * straight-line motions: projectiles, relative velocity (trains,
 * river-boat, rain-man) and the kinematics of circular motion, with the
 * centripetal acceleration derived from a velocity triangle.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "position-velocity-acceleration-vectors",
  title: "2.1 · Position, Velocity and Acceleration as Vectors",
  position: 1,
  blocks: blocks([
    {
      type: "text",
      content:
        "Stand on a balcony and do two things at the same instant: drop one ball, and flick another ball sideways off the edge. The flicked ball travels out in a curve, the dropped one falls straight down. Which lands first? They land **together**. The sideways motion does nothing at all to the falling. That experiment is the whole of this chapter in one picture: motion in a plane is two straight-line motions happening at once, linked only by the clock.",
    },
    {
      type: "text",
      content:
        "In a plane, the position of a particle is a vector from the origin, and each component is just a Chapter 1 position:",
    },
    { type: "math", latex: "\\vec r(t) = x(t)\\,\\hat i + y(t)\\,\\hat j" },
    {
      type: "callout",
      variant: "definition",
      title: "Velocity and acceleration vectors",
      content:
        "$\\vec v = \\dfrac{d\\vec r}{dt} = \\dfrac{dx}{dt}\\hat i + \\dfrac{dy}{dt}\\hat j = v_x\\hat i + v_y\\hat j$ and $\\vec a = \\dfrac{d\\vec v}{dt} = a_x\\hat i + a_y\\hat j$.\nDifferentiate **component by component**. The unit vectors $\\hat i, \\hat j$ are fixed, so they pass straight through the derivative.",
    },
    {
      type: "text",
      content:
        "**Where does the velocity point?** Over a short time $\\Delta t$ the displacement $\\Delta\\vec r$ is a small chord of the path. As $\\Delta t \\to 0$ the chord lines up with the tangent, so $\\vec v$ is always **along the tangent to the path**, in the direction of motion. Its length is the speed.\n\n**Where does the acceleration point?** Not necessarily along $\\vec v$. The acceleration is the rate of change of velocity, and velocity can change in size, in direction, or both. When a path curves, the velocity turns, and $\\Delta\\vec v$ points towards the **inside** of the curve.",
    },
    {
      type: "interactive",
      config: {
        component: "vec-canvas-2d",
        mode: "subtract",
        a: [3, -4],
        b: [3, 4],
        labels: { a: "\\vec v_2", b: "\\vec v_1" },
        caption:
          "v₁ is a thrown ball's velocity at launch, v₂ its velocity 0.8 s later. The difference Δv = v₂ − v₁ points straight down, towards the inside of the curved path.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: $\\Delta\\vec v = (0, -8)$, pointing straight down although neither velocity does. The horizontal part of the velocity never changed; only the vertical part did. Drag $\\vec v_2$ and watch $\\Delta\\vec v$ follow: for a real curved path, with $\\vec v_2$ a short time after $\\vec v_1$, the difference always points into the bend.",
    },
    {
      type: "text",
      content:
        "**Worked example 1.** A particle has $\\vec r = 3t\\,\\hat i + (4t - 5t^2)\\,\\hat j$ (metres, seconds). Find $\\vec v$, $\\vec a$, the equation of its path and its speed at $t = 1$ s.\n\n1. Differentiate each component: $\\vec v = 3\\,\\hat i + (4 - 10t)\\,\\hat j$.\n2. Again: $\\vec a = -10\\,\\hat j$, constant and straight down. *Why this step:* $x$ is linear in $t$ (uniform motion) and $y$ is quadratic (uniform acceleration): a projectile in disguise.\n3. Path: eliminate $t$. From $x = 3t$, $t = \\frac x3$, so $y = \\frac{4x}{3} - \\frac{5x^2}{9}$, a downward parabola. *Why this step:* $\\vec r(t)$ tells you where the particle is *when*; the path equation $y(x)$ throws the clock away and keeps only the shape.\n4. At $t = 1$: $\\vec v = 3\\hat i - 6\\hat j$, speed $\\sqrt{9 + 36} = \\sqrt{45} = 3\\sqrt5 \\approx 6.71$ m/s.\n5. Bonus: $v_y = 0$ at $t = 0.4$ s, the top of the path, at $(1.2, 0.8)$ m. There $\\vec v = 3\\hat i$ is horizontal while $\\vec a = -10\\hat j$ is vertical: perpendicular.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (average velocity vs average speed in 2D).** A runner goes halfway round a circular track of radius 10 m in 5 s.\n\n1. Displacement: the straight line across the circle, a diameter of 20 m. Average velocity $= \\frac{20}{5} = 4$ m/s, pointing across.\n2. Distance: half the circumference, $\\pi \\times 10 \\approx 31.4$ m. Average speed $= \\frac{10\\pi}{5} = 2\\pi \\approx 6.28$ m/s. *Why this step:* in 2D the gap between distance and displacement appears even without reversing, just from curving.\n\n**Worked example 3 (independence).** From a height of 5 m, ball A is dropped and ball B is fired horizontally at 8 m/s.\n\n1. Vertical motion is identical for both: $u_y = 0$, $a_y = -10$ m/s². So $5 = \\frac12(10)t^2$ gives $t = 1$ s for **both**.\n2. Horizontally, A goes nowhere and B goes $8 \\times 1 = 8$ m. *Why this step:* nothing acts horizontally, so $v_x$ stays 8 m/s and cannot affect the vertical fall.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"acceleration always points along the velocity\"",
      content:
        "Only for straight-line motion. At the top of a projectile's path, $\\vec v$ is horizontal and $\\vec a = \\vec g$ is vertical. On a circle at steady speed, $\\vec v$ is tangential and $\\vec a$ points to the centre. Velocity tells you where the particle is going; acceleration tells you how that is changing.",
    },
    {
      type: "quiz",
      id: "mfe2-1-q1",
      variant: "practice",
      question: "A particle has $\\vec r = 2t^2\\,\\hat i + 3t\\,\\hat j$ (SI). What is its speed at $t = 1$ s?",
      options: [
        { text: "$7$ m/s", feedback: "Speed is the length $\\sqrt{v_x^2 + v_y^2}$, not the sum of components." },
        { text: "$5$ m/s", correct: true, feedback: "$\\vec v = 4t\\,\\hat i + 3\\,\\hat j = 4\\hat i + 3\\hat j$ at $t = 1$, of length 5." },
        { text: "$\\sqrt{13}$ m/s", feedback: "That is the length of $\\vec r(1) = 2\\hat i + 3\\hat j$, the position. Differentiate first." },
        { text: "$4$ m/s", feedback: "That is only $v_x$. The particle also moves in $y$ at 3 m/s." },
      ],
    },
    {
      type: "quiz",
      id: "mfe2-1-q2",
      variant: "practice",
      question: "For $\\vec r = 2t^2\\,\\hat i + 3t\\,\\hat j$, the acceleration is",
      options: [
        { text: "$4\\,\\hat i + 3\\,\\hat j$", feedback: "That is the velocity at $t = 1$. Differentiate again: the constant $3\\hat j$ vanishes." },
        { text: "$4t\\,\\hat i$", feedback: "That is the $x$-component of velocity." },
        { text: "zero", feedback: "$v_x = 4t$ changes with time, so there is an acceleration." },
        { text: "$4\\,\\hat i$, constant", correct: true, feedback: "$\\vec v = 4t\\hat i + 3\\hat j$, so $\\vec a = 4\\hat i$. The $y$-motion is uniform." },
      ],
    },
    {
      type: "quiz",
      id: "mfe2-1-q3",
      variant: "concept",
      question: "At the highest point of a projectile's flight, the angle between its velocity and acceleration is",
      options: [
        { text: "$90^\\circ$", correct: true, feedback: "$\\vec v$ is horizontal ($v_y = 0$) and $\\vec a = \\vec g$ is vertical." },
        { text: "$0^\\circ$", feedback: "That would mean the acceleration is along the motion. At the top, the motion is horizontal and $\\vec g$ is vertical." },
        { text: "$180^\\circ$", feedback: "That would be a vertical throw on the way up." },
        { text: "Undefined, because $\\vec v = 0$ at the top", feedback: "Only $v_y$ is zero at the top; $v_x$ is not." },
      ],
    },
    {
      type: "quiz",
      id: "mfe2-1-q4",
      variant: "practice",
      question: "A particle moves along a semicircle from one end of a diameter to the other. What is the ratio of its average speed to the magnitude of its average velocity?",
      options: [
        { text: "$1$", feedback: "Along a curve, the path is longer than the straight-line displacement." },
        { text: "$\\pi$", feedback: "Displacement is the diameter $2R$, not the radius." },
        { text: "$\\dfrac{\\pi}{2}$", correct: true, feedback: "Distance $\\pi R$, displacement $2R$, same time: ratio $\\frac{\\pi R}{2R} = \\frac\\pi2$." },
        { text: "$\\dfrac{2}{\\pi}$", feedback: "Inverted: average speed is the larger one." },
      ],
    },
    {
      type: "quiz",
      id: "mfe2-1-q5",
      variant: "practice",
      question: "A particle moves with $x = 2t$ and $y = t^2$ (SI). What is the equation of its path?",
      options: [
        { text: "$y = 2x^2$", feedback: "Substitute $t = x/2$, not $t = 2x$." },
        { text: "$y = x^2$", feedback: "That forgets the factor 2 in $x = 2t$." },
        { text: "$y = \\dfrac{x^2}{4}$", correct: true, feedback: "$t = x/2$, so $y = x^2/4$: a parabola." },
        { text: "$y = \\dfrac x2$", feedback: "$y$ depends on $t^2$, so the path is curved, not a straight line." },
      ],
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "projectile-motion",
  title: "2.2 · Projectile Motion",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "A footballer kicks a ball, a fielder throws to the keeper, water arcs from a garden hose. Each follows the same curve, a parabola, for the same reason: once released, the only force is gravity, which acts straight down. So the horizontal motion has **no acceleration** and the vertical motion is **free fall**. Two Chapter 1 problems, sharing one clock.",
    },
    {
      type: "text",
      content:
        "Launch from the origin at speed $u$ and angle $\\theta$ above the horizontal ($g = 10$ m/s², up positive). Resolve the initial velocity: $u_x = u\\cos\\theta$, $u_y = u\\sin\\theta$. Then",
    },
    {
      type: "math",
      latex:
        "\\begin{aligned} &\\text{horizontal } (a_x = 0): & v_x &= u\\cos\\theta, & x &= (u\\cos\\theta)\\,t \\\\ &\\text{vertical } (a_y = -g): & v_y &= u\\sin\\theta - gt, & y &= (u\\sin\\theta)\\,t - \\tfrac12 gt^2 \\end{aligned}",
    },
    {
      type: "text",
      content:
        "Everything else follows from these four lines.\n\n*Time of flight:* the ball lands when $y = 0$: $t\\left(u\\sin\\theta - \\tfrac12 gt\\right) = 0$, so (ignoring $t = 0$) $T = \\dfrac{2u\\sin\\theta}{g}$.\n\n*Maximum height:* at the top $v_y = 0$, so $0 = u^2\\sin^2\\theta - 2gH$ and $H = \\dfrac{u^2\\sin^2\\theta}{2g}$.\n\n*Range:* horizontal distance in time $T$: $R = u\\cos\\theta \\cdot \\dfrac{2u\\sin\\theta}{g} = \\dfrac{u^2\\sin 2\\theta}{g}$.\n\n*Trajectory:* eliminate $t$ using $t = \\dfrac{x}{u\\cos\\theta}$:",
    },
    { type: "math", latex: "y = x\\tan\\theta - \\frac{g x^2}{2u^2\\cos^2\\theta}" },
    {
      type: "callout",
      variant: "definition",
      title: "Projectile on level ground",
      content:
        "$T = \\dfrac{2u\\sin\\theta}{g}$, $\\quad H = \\dfrac{u^2\\sin^2\\theta}{2g}$, $\\quad R = \\dfrac{u^2\\sin2\\theta}{g}$, $\\quad y = x\\tan\\theta - \\dfrac{gx^2}{2u^2\\cos^2\\theta}$.\nThe path is a parabola ($y$ is quadratic in $x$). Horizontal velocity never changes, so the speed at the top is $u\\cos\\theta$. Range is largest at $\\theta = 45^\\circ$, where $\\sin 2\\theta = 1$: $R_{\\max} = u^2/g$.",
    },
    {
      type: "interactive",
      config: {
        component: "mfe-motion-lab",
        mode: "projectile",
        sliders: {
          speed: { min: 5, max: 30, step: 1, initial: 20 },
          angle: { min: 5, max: 85, step: 1, initial: 45 },
          height: { min: 0, max: 0, step: 5, initial: 0 },
        },
        showVectors: true,
        caption:
          "Scrub t and watch the velocity components. The horizontal arrow never changes; the vertical one shrinks, vanishes at the top and grows downward.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: at 20 m/s and $45^\\circ$ the ball flies 40 m, rises 10 m and lands after $2\\sqrt2 \\approx 2.83$ s. $v_x \\approx 14.1$ m/s at every instant. $v_y$ falls by 10 m/s every second, passes through zero at the top and ends at $-14.1$ m/s: the landing speed equals the launch speed. Try other angles: the range grows up to $45^\\circ$ and then shrinks.",
    },
    {
      type: "text",
      content:
        "Now see the trajectory equation directly. Below, $k = \\tan\\theta$ and $u$ are sliders, and the curve is $y = x\\tan\\theta - \\frac{gx^2}{2u^2\\cos^2\\theta}$ with $\\frac{1}{\\cos^2\\theta} = 1 + \\tan^2\\theta$. The dashed curve is the $45^\\circ$, 20 m/s case for reference.",
    },
    {
      type: "interactive",
      config: {
        component: "transform-playground",
        baseExpr: "x - x^2/40",
        baseLatex: "x - \\tfrac{x^2}{40}",
        expr: "k*x - 10*x^2*(1 + k^2)/(2*u^2)",
        exprLatex: "x\\tan\\theta - \\dfrac{g x^2}{2u^2\\cos^2\\theta}",
        params: [
          { name: "k", min: 0.2, max: 3, step: 0.1, initial: 1 },
          { name: "u", min: 10, max: 30, step: 1, initial: 20 },
        ],
        window: { xmin: 0, xmax: 50, ymin: 0, ymax: 25 },
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: increasing $u$ stretches the parabola in both directions; increasing $k$ steepens the launch, raising the peak but, beyond $k = 1$, shortening the range. Every curve starts with slope $k = \\tan\\theta$ at the origin.",
    },
    {
      type: "text",
      content:
        "**Worked example 1.** A ball is kicked at 20 m/s at $30^\\circ$ to the ground. Find $T$, $H$, $R$ and the velocity at $t = 1.5$ s.\n\n1. Components: $u_x = 20\\cos 30^\\circ = 10\\sqrt3 \\approx 17.3$ m/s, $u_y = 20\\sin 30^\\circ = 10$ m/s. *Why this step:* every projectile problem starts by splitting the launch velocity; after that it is two 1D problems.\n2. $T = \\dfrac{2u_y}{g} = \\dfrac{20}{10} = 2$ s.\n3. $H = \\dfrac{u_y^2}{2g} = \\dfrac{100}{20} = 5$ m.\n4. $R = u_x T = 10\\sqrt3 \\times 2 = 20\\sqrt3 \\approx 34.6$ m. (Check: $\\frac{400\\sin 60^\\circ}{10} = 20\\sqrt3$. ✓)\n5. At $t = 1.5$ s: $v_x = 10\\sqrt3$, $v_y = 10 - 15 = -5$ m/s (already coming down). Speed $= \\sqrt{300 + 25} = \\sqrt{325} \\approx 18.0$ m/s, at $\\tan^{-1}\\frac{5}{10\\sqrt3} \\approx 16.1^\\circ$ **below** the horizontal.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (velocity perpendicular to launch).** A ball is thrown at 20 m/s at $60^\\circ$. When is its velocity perpendicular to the initial velocity?\n\n1. Perpendicular means $\\vec u \\cdot \\vec v = 0$. *Why this step:* a right angle between two vectors is a zero dot product (Chapter 0).\n2. $\\vec u\\cdot\\vec v = (u\\cos\\theta)^2 + (u\\sin\\theta)(u\\sin\\theta - gt) = u^2 - ugt\\sin\\theta$.\n3. Setting this to zero: $t = \\dfrac{u}{g\\sin\\theta} = \\dfrac{20}{10 \\times \\frac{\\sqrt3}{2}} = \\dfrac{4}{\\sqrt3} \\approx 2.31$ s.\n4. The flight lasts $T = \\frac{2 \\times 20 \\times \\frac{\\sqrt3}{2}}{10} = 2\\sqrt3 \\approx 3.46$ s, so this happens during flight. For a $30^\\circ$ launch, $\\frac{u}{g\\sin\\theta} = 4$ s exceeds $T = 2$ s: it never happens. In general it needs $\\sin^2\\theta \\ge \\frac12$, i.e. $\\theta \\ge 45^\\circ$.\n\n**Worked example 3** ($R = 4H\\cot\\theta$). Divide the formulas: $\\dfrac{R}{H} = \\dfrac{2\\sin\\theta\\cos\\theta/g}{\\sin^2\\theta/(2g)} = \\dfrac{4\\cos\\theta}{\\sin\\theta}$. So $R = 4H\\cot\\theta$. If the range equals the maximum height, $\\cot\\theta = \\frac14$, i.e. $\\tan\\theta = 4$ ($\\theta \\approx 76^\\circ$).",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"velocity at the top is zero\"",
      content:
        "Only the **vertical** component is zero at the top. The horizontal component $u\\cos\\theta$ is untouched all flight, so the speed at the top is $u\\cos\\theta$, the minimum speed of the flight but not zero (unless the throw was vertical).",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"acceleration at the top is zero\"",
      content:
        "The acceleration is $\\vec g$, straight down, at every point of the flight, including the top. It is what turns the rising velocity into a falling one.",
    },
    {
      type: "quiz",
      id: "mfe2-2-q1",
      variant: "practice",
      question: "A ball is thrown at 20 m/s at $45^\\circ$ over level ground. What is its range?",
      options: [
        { text: "$40$ m", correct: true, feedback: "$R = \\frac{u^2\\sin 90^\\circ}{g} = \\frac{400}{10} = 40$ m." },
        { text: "$28.3$ m", feedback: "You used $\\sin\\theta$ instead of $\\sin 2\\theta$: $400 \\times 0.707/10$. The range has $\\sin 2\\theta = \\sin 90^\\circ = 1$." },
        { text: "$10$ m", feedback: "That is the maximum height, $\\frac{400 \\times \\frac12}{20}$." },
        { text: "$80$ m", feedback: "The range formula has $g$, not $\\frac g2$, in the denominator." },
      ],
    },
    {
      type: "quiz",
      id: "mfe2-2-q2",
      variant: "practice",
      question: "A ball is thrown at 20 m/s at $60^\\circ$ above the horizontal. What is its speed at the highest point?",
      options: [
        { text: "$0$", feedback: "Only $v_y$ vanishes at the top. $v_x$ stays $u\\cos\\theta$." },
        { text: "$10\\sqrt3$ m/s", feedback: "That is $u\\sin 60^\\circ$, the vertical component, which is the part that becomes zero." },
        { text: "$20$ m/s", feedback: "The ball slows on the way up; the speed at the top is only the horizontal part." },
        { text: "$10$ m/s", correct: true, feedback: "$u\\cos 60^\\circ = 20 \\times \\frac12 = 10$ m/s." },
      ],
    },
    {
      type: "quiz",
      id: "mfe2-2-q3",
      variant: "practice",
      question: "What is the maximum height reached by a ball thrown at 30 m/s at $30^\\circ$?",
      options: [
        { text: "$45$ m", feedback: "That is $\\frac{u^2}{2g}$, the height for a vertical throw. Use only the vertical component." },
        { text: "$11.25$ m", correct: true, feedback: "$H = \\frac{(30 \\times \\frac12)^2}{20} = \\frac{225}{20} = 11.25$ m." },
        { text: "$22.5$ m", feedback: "You used $\\sin\\theta$ instead of $\\sin^2\\theta$: $\\frac{900 \\times 0.5}{20}$." },
        { text: "$33.75$ m", feedback: "That uses $\\cos^2 30^\\circ$. Height depends on the vertical component, $u\\sin\\theta$." },
      ],
    },
    {
      type: "quiz",
      id: "mfe2-2-q4",
      variant: "practice",
      question: "For a projectile on level ground, the range equals the maximum height. The angle of projection is",
      options: [
        { text: "$\\tan^{-1} 4$", correct: true, feedback: "$R = 4H\\cot\\theta$; $R = H$ needs $\\cot\\theta = \\frac14$." },
        { text: "$45^\\circ$", feedback: "At $45^\\circ$, $R = 4H$." },
        { text: "$\\tan^{-1}\\frac14$", feedback: "That makes $R = 16H$. Invert: $\\tan\\theta = 4$." },
        { text: "$\\tan^{-1} 2$", feedback: "With $\\tan\\theta = 2$, $R = 4H \\cdot \\frac12 = 2H$. You need $\\cot\\theta = \\frac14$." },
      ],
    },
    {
      type: "quiz",
      id: "mfe2-2-q5",
      variant: "practice",
      question: "A ball is launched at 50 m/s at $37^\\circ$ above the horizontal ($\\sin 37^\\circ = 0.6$, $\\cos 37^\\circ = 0.8$). What is its time of flight?",
      options: [
        { text: "$8$ s", feedback: "That uses $\\cos 37^\\circ$. Time of flight depends on the vertical component." },
        { text: "$3$ s", feedback: "That is the time to the top. The flight is twice as long." },
        { text: "$6$ s", correct: true, feedback: "$T = \\frac{2 \\times 50 \\times 0.6}{10} = 6$ s." },
        { text: "$10$ s", feedback: "That is $\\frac{2u}{g}$, for a vertical throw." },
      ],
    },
    {
      type: "quiz",
      id: "mfe2-2-q6",
      variant: "concept",
      question: "At the top of its flight, a projectile's acceleration is",
      options: [
        { text: "zero", feedback: "Gravity never switches off. Zero acceleration at the top would leave the ball moving horizontally forever." },
        { text: "$g$, straight down", correct: true, feedback: "The acceleration is $\\vec g$ throughout the flight." },
        { text: "$g\\cos\\theta$, along the path", feedback: "At the top the path is horizontal and $\\vec g$ is perpendicular to it." },
      ],
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "projectile-special-cases",
  title: "2.3 · Projectiles: Special Cases",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "A shot-putter releases the shot at about $40^\\circ$, not $45^\\circ$. A long-jumper takes off at around $20^\\circ$. Is everyone doing it wrong? No: the $45^\\circ$ rule is a result about launching from ground level onto the same level ground. Change the geometry (launch from a height, land on a slope) and the best angle changes too. This lesson collects the special cases JEE loves, each obtained from the same two component equations.",
    },
    {
      type: "text",
      content:
        "**Complementary angles.** Since $\\sin 2\\theta = \\sin(180^\\circ - 2\\theta) = \\sin 2(90^\\circ - \\theta)$, the angles $\\theta$ and $90^\\circ - \\theta$ give the **same range** at the same speed. The steeper throw goes higher and stays up longer. Compare $30^\\circ$ with its partner $60^\\circ$ below.",
    },
    {
      type: "interactive",
      config: {
        component: "mfe-motion-lab",
        mode: "projectile",
        sliders: {
          speed: { min: 5, max: 30, step: 1, initial: 20 },
          angle: { min: 5, max: 85, step: 1, initial: 30 },
          height: { min: 0, max: 0, step: 5, initial: 0 },
        },
        showComplementary: true,
        caption:
          "The second trace is the complementary angle 90° − θ at the same speed. Move θ towards 45° and watch the two paths merge.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: both paths land at $20\\sqrt3 \\approx 34.6$ m. The $30^\\circ$ path peaks at 5 m after 1 s and lands at 2 s; the $60^\\circ$ path peaks at 15 m and lands at $2\\sqrt3 \\approx 3.46$ s. At $45^\\circ$ the two traces coincide, and that shared range, $u^2/g = 40$ m, is the largest possible.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (complementary pair identities).** For the pair $\\theta$, $90^\\circ - \\theta$ at speed $u$:\n\n1. Times: $T_1 = \\dfrac{2u\\sin\\theta}{g}$, $T_2 = \\dfrac{2u\\cos\\theta}{g}$, so $T_1T_2 = \\dfrac{4u^2\\sin\\theta\\cos\\theta}{g^2} = \\dfrac{2}{g}\\cdot\\dfrac{u^2\\sin2\\theta}{g} = \\dfrac{2R}{g}$.\n2. Heights: $H_1 + H_2 = \\dfrac{u^2(\\sin^2\\theta + \\cos^2\\theta)}{2g} = \\dfrac{u^2}{2g}$, and $H_1H_2 = \\dfrac{u^4\\sin^2\\theta\\cos^2\\theta}{4g^2} = \\dfrac{R^2}{16}$, so $R = 4\\sqrt{H_1H_2}$.\n3. Check with 20 m/s at $30^\\circ$ and $60^\\circ$: $T_1T_2 = 2 \\times 2\\sqrt3 = 4\\sqrt3 \\approx 6.93$ and $\\frac{2R}{g} = \\frac{40\\sqrt3}{10} = 4\\sqrt3$. ✓ $H_1 + H_2 = 5 + 15 = 20 = \\frac{400}{20}$. ✓ *Why this step:* numerical checks on an identity catch algebra slips before an exam does.",
    },
    {
      type: "text",
      content:
        "**Horizontal launch from a height.** Throw horizontally at speed $u$ from height $h$. Now $u_y = 0$, so the fall takes exactly as long as a simple drop:",
    },
    { type: "math", latex: "T = \\sqrt{\\frac{2h}{g}}, \\qquad \\text{range } R = u\\sqrt{\\frac{2h}{g}}, \\qquad \\text{landing velocity } \\left(u,\\; -\\sqrt{2gh}\\right)" },
    {
      type: "interactive",
      config: {
        component: "mfe-motion-lab",
        mode: "projectile",
        sliders: {
          speed: { min: 0, max: 30, step: 1, initial: 10 },
          angle: { min: 0, max: 0, step: 1, initial: 0 },
          height: { min: 0, max: 50, step: 5, initial: 45 },
        },
        showVectors: true,
        caption:
          "Launched horizontally from a 45 m cliff. Change the speed: the landing point moves, the flight time does not.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the flight always takes $\\sqrt{90/10} = 3$ s, whatever the speed; at 10 m/s the stone lands 30 m out. Only changing the height changes the time. That is the dropped-ball-and-flicked-ball experiment of 2.1 again.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (horizontal launch).** A stone is thrown horizontally at 10 m/s from a 45 m cliff.\n\n1. Vertical: $45 = 5T^2 \\Rightarrow T = 3$ s.\n2. Horizontal: $R = 10 \\times 3 = 30$ m.\n3. Landing velocity: $v_x = 10$, $v_y = -30$ m/s; speed $\\sqrt{1000} \\approx 31.6$ m/s at $\\tan^{-1} 3 \\approx 71.6^\\circ$ below the horizontal. *Why this step:* the direction of impact comes from the ratio $v_y/v_x$, not from the ratio of distances $45/30$ (that gives the direction of the **displacement**, a different angle).\n\n**Worked example 3 (oblique launch from a cliff).** From a 40 m cliff a ball is thrown at 20 m/s at $30^\\circ$ **above** the horizontal. When and where does it land?\n\n1. Origin at the launch point, up positive; the sea is at $y = -40$ m. $u_y = 10$, $u_x = 10\\sqrt3$ m/s.\n2. $-40 = 10t - 5t^2 \\Rightarrow t^2 - 2t - 8 = 0 \\Rightarrow (t - 4)(t + 2) = 0$.\n3. $t = 4$ s (reject $-2$ s: it lies before the launch). *Why this step:* the quadratic describes the whole parabola, extended backwards in time; only roots with $t > 0$ belong to this flight.\n4. $x = 10\\sqrt3 \\times 4 = 40\\sqrt3 \\approx 69.3$ m from the foot of the cliff.",
    },
    {
      type: "text",
      content:
        "**JEE extension: a projectile on an inclined plane.** A ball is launched from the foot of a slope inclined at $\\alpha$, at angle $\\theta$ above the **horizontal** (so at $\\beta = \\theta - \\alpha$ to the slope). Tilt the axes: $x'$ along the slope, $y'$ perpendicular to it. Now gravity has two components, $-g\\sin\\alpha$ along $x'$ and $-g\\cos\\alpha$ along $y'$.",
    },
    {
      type: "math",
      latex:
        "\\begin{aligned} y' &= (u\\sin\\beta)t - \\tfrac12 (g\\cos\\alpha) t^2 = 0 &&\\Rightarrow\\; T = \\frac{2u\\sin\\beta}{g\\cos\\alpha} \\\\ R &= (u\\cos\\beta)T - \\tfrac12 (g\\sin\\alpha) T^2 &&= \\frac{2u^2\\sin(\\theta - \\alpha)\\cos\\theta}{g\\cos^2\\alpha} \\end{aligned}",
    },
    {
      type: "text",
      content:
        "(The last simplification uses $\\cos\\beta\\cos\\alpha - \\sin\\beta\\sin\\alpha = \\cos(\\alpha + \\beta) = \\cos\\theta$.) Using $2\\sin(\\theta - \\alpha)\\cos\\theta = \\sin(2\\theta - \\alpha) - \\sin\\alpha$, the range up the slope is largest when $2\\theta - \\alpha = 90^\\circ$, i.e. $\\theta = 45^\\circ + \\frac\\alpha2$: the launch direction bisects the angle between the slope and the vertical.\n\n**Hitting the slope perpendicularly:** the velocity along the slope must be zero at landing: $u\\cos\\beta = (g\\sin\\alpha)T = \\dfrac{2u\\sin\\beta\\sin\\alpha}{\\cos\\alpha}$, which gives $\\cot\\beta = 2\\tan\\alpha$.\n\n**Worked example 4.** Launch at 20 m/s at $60^\\circ$ to the horizontal up a $30^\\circ$ slope.\n\n1. $\\beta = 30^\\circ$. $T = \\dfrac{2 \\times 20 \\times \\frac12}{10 \\times \\frac{\\sqrt3}{2}} = \\dfrac{4}{\\sqrt3} \\approx 2.31$ s.\n2. $R = \\dfrac{2 \\times 400 \\times \\sin 30^\\circ \\cos 60^\\circ}{10 \\times \\frac34} = \\dfrac{200}{7.5} \\approx 26.7$ m.\n3. Check directly: $u\\cos\\beta\\,T = 10\\sqrt3 \\times \\frac{4}{\\sqrt3} = 40$ m, minus $\\frac12(5)\\left(\\frac{16}{3}\\right) = 13.3$ m, gives 26.7 m. ✓ *Why this step:* the tilted-axes route and the formula must agree; if they do not, one of the gravity components has the wrong sign.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"45° always gives the maximum range\"",
      content:
        "Only for launch and landing at the **same level**. From a height the best angle is less than $45^\\circ$ (the extra fall time rewards a flatter throw). Up an incline of angle $\\alpha$ it is $45^\\circ + \\frac\\alpha2$ from the horizontal; down an incline it is $45^\\circ - \\frac\\alpha2$.",
    },
    {
      type: "quiz",
      id: "mfe2-3-q1",
      variant: "concept",
      question: "Two balls are thrown at the same speed at $20^\\circ$ and $70^\\circ$ over level ground. Which statement is true?",
      options: [
        { text: "They have the same range; the $70^\\circ$ ball stays in the air longer.", correct: true, feedback: "$\\sin 40^\\circ = \\sin 140^\\circ$, so equal ranges; $T \\propto \\sin\\theta$ is larger at $70^\\circ$." },
        { text: "The $70^\\circ$ ball goes further because it is thrown higher.", feedback: "Higher, yes, but with a smaller horizontal speed. The two effects balance exactly." },
        { text: "They have the same range and the same time of flight.", feedback: "$T = \\frac{2u\\sin\\theta}{g}$ differs: $\\sin 70^\\circ > \\sin 20^\\circ$." },
      ],
    },
    {
      type: "quiz",
      id: "mfe2-3-q2",
      variant: "practice",
      question: "A ball rolls horizontally off the edge of a 20 m high rooftop at 5 m/s. How far from the foot of the building does it land?",
      options: [
        { text: "$20$ m", feedback: "That is the height, not the horizontal distance." },
        { text: "$10$ m", correct: true, feedback: "$T = \\sqrt{40/10} = 2$ s, so $x = 5 \\times 2 = 10$ m." },
        { text: "$5$ m", feedback: "That assumes a 1 s fall. From 20 m the fall takes 2 s." },
        { text: "$4$ m", feedback: "Recheck: $T^2 = 2h/g = 4$, so $T = 2$ s." },
      ],
    },
    {
      type: "quiz",
      id: "mfe2-3-q3",
      variant: "practice",
      question: "Two complementary launches at the same speed give the same range. One has time of flight 2 s and the other 4 s. What is the range? ($g = 10$ m/s²)",
      options: [
        { text: "$80$ m", feedback: "You used $T_1T_2 = \\frac{R}{g}$. The identity has a factor 2: $T_1T_2 = \\frac{2R}{g}$." },
        { text: "$20$ m", feedback: "Recheck: $R = \\frac{g T_1T_2}{2} = \\frac{10 \\times 8}{2}$." },
        { text: "$160$ m", feedback: "You multiplied by 2 instead of dividing: $R = \\frac{gT_1T_2}{2}$, not $2gT_1T_2$." },
        { text: "$40$ m", correct: true, feedback: "$T_1T_2 = \\frac{2R}{g} \\Rightarrow 8 = \\frac{2R}{10} \\Rightarrow R = 40$ m." },
      ],
    },
    {
      type: "quiz",
      id: "mfe2-3-q4",
      variant: "practice",
      question: "For maximum range **up** an incline of $30^\\circ$, at what angle to the **horizontal** should a ball be launched?",
      options: [
        { text: "$60^\\circ$", correct: true, feedback: "$45^\\circ + \\frac{30^\\circ}{2} = 60^\\circ$ from the horizontal ($30^\\circ$ from the slope)." },
        { text: "$45^\\circ$", feedback: "That is the level-ground answer. Up a slope the best angle is $45^\\circ + \\frac\\alpha2$." },
        { text: "$75^\\circ$", feedback: "That is $45^\\circ + \\alpha$. The correction is half the incline angle." },
        { text: "$30^\\circ$", feedback: "That is $45^\\circ - \\frac\\alpha2$, the answer for launching **down** the slope." },
      ],
    },
    {
      type: "quiz",
      id: "mfe2-3-q5",
      variant: "practice",
      question: "A stone is thrown horizontally at 20 m/s from an 80 m cliff. What is its speed when it hits the sea?",
      options: [
        { text: "$40$ m/s", feedback: "That is only the vertical component. Add the horizontal 20 m/s as a vector." },
        { text: "$60$ m/s", feedback: "Components add as vectors (Pythagoras), not as numbers." },
        { text: "$20\\sqrt5 \\approx 44.7$ m/s", correct: true, feedback: "$T = 4$ s, $v_y = -40$ m/s, $v_x = 20$: speed $\\sqrt{400 + 1600} = 20\\sqrt5$." },
        { text: "$20$ m/s", feedback: "The horizontal speed stays 20 m/s, but the stone also gains 40 m/s downward." },
      ],
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "relative-velocity",
  title: "2.4 · Relative Velocity",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "You sit in a train at a station. The train on the next track starts moving, and for a confusing second you are sure it is **your** train that moved. Motion is always measured *from* something. The same car does 60 km/h according to a pedestrian, 0 km/h according to its passenger, and 120 km/h according to a driver coming the other way.",
    },
    {
      type: "text",
      content:
        "In 0.6 we saw that the position of A as seen from B is $\\vec r_{AB} = \\vec r_A - \\vec r_B$. Differentiate with respect to time:",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Relative velocity",
      content:
        "$\\vec v_{AB} = \\vec v_A - \\vec v_B$ is the velocity of A as seen by B (\"A relative to B\"). Similarly $\\vec a_{AB} = \\vec a_A - \\vec a_B$. Note $\\vec v_{BA} = -\\vec v_{AB}$. Velocities here are measured from the ground unless stated otherwise.",
    },
    {
      type: "text",
      content:
        "**1D first.** Take one direction as positive. Two cars moving the same way at 60 and 40 km/h: the faster one sees the slower one drift back at $40 - 60 = -20$ km/h. Moving towards each other at 60 and $-40$ km/h: $60 - (-40) = 100$ km/h closing speed.\n\n**Worked example 1 (trains crossing).** Trains of length 100 m and 150 m run on parallel tracks at 20 m/s and 30 m/s. How long do they take to cross each other if moving (a) in opposite directions, (b) in the same direction?\n\n1. Sit on the slower train. Then it is at rest and the other train moves at the relative speed. *Why this step:* in the frame of one train, the problem becomes one train sliding past a stationary one, which only needs distance ÷ speed.\n2. To cross completely, the front of one must travel the combined length $100 + 150 = 250$ m relative to the other.\n3. (a) Relative speed $30 + 20 = 50$ m/s: $t = \\frac{250}{50} = 5$ s.\n4. (b) Relative speed $30 - 20 = 10$ m/s: $t = \\frac{250}{10} = 25$ s. Overtaking takes five times as long.\n\n**Worked example 2 (a moving walkway).** An airport walkway 50 m long moves at 1 m/s. A traveller walks on it at 1.5 m/s relative to the belt.\n\n1. Walking with the belt: ground speed $1.5 + 1 = 2.5$ m/s; time $\\frac{50}{2.5} = 20$ s.\n2. Walking against it (for fun): $1.5 - 1 = 0.5$ m/s; time 100 s. *Why this step:* \"relative to the belt\" plus \"belt relative to ground\" gives \"relative to ground\": $\\vec v_{\\text{man,ground}} = \\vec v_{\\text{man,belt}} + \\vec v_{\\text{belt,ground}}$.",
    },
    {
      type: "text",
      content:
        "**2D: subtract as vectors.** Car A drives north at 30 m/s; car B drives east at 40 m/s. How does A appear to B? $\\vec v_{AB} = \\vec v_A - \\vec v_B = -40\\,\\hat i + 30\\,\\hat j$: magnitude $\\sqrt{1600 + 900} = 50$ m/s, pointing north-west. Play with the subtraction below.",
    },
    {
      type: "interactive",
      config: {
        component: "vec-canvas-2d",
        mode: "subtract",
        a: [3, 1],
        b: [1, 3],
        labels: { a: "\\vec v_A", b: "\\vec v_B" },
        caption:
          "The difference arrow is v_A − v_B: how A's motion looks to an observer riding on B. Drag v_B until it equals v_A and the relative velocity vanishes.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the relative velocity is the arrow from the tip of $\\vec v_B$ to the tip of $\\vec v_A$. When the two velocities are equal the difference is zero: two cars side by side at the same velocity look parked to each other. When they point in opposite directions, the relative speed is the **sum** of the speeds.",
    },
    {
      type: "text",
      content:
        "**Two projectiles.** Both have acceleration $\\vec g$, so their relative acceleration is $\\vec g - \\vec g = \\vec 0$. Seen from one projectile, the other moves in a **straight line at constant velocity**. That settles the famous *monkey and hunter* puzzle: a hunter aims straight at a monkey hanging from a branch; the monkey lets go at the instant of the shot. Relative to the monkey, the bullet flies along the original line of sight at constant velocity, so it hits (provided it gets there before both reach the ground). Gravity pulls both down equally, and relative motion ignores it.\n\n**Worked example 3 (closest approach).** Ship A starts at the origin and sails east at 4 m/s. Ship B starts 300 m east of A and sails north at 3 m/s. How close do they come?\n\n1. Work in A's frame. B's relative velocity: $\\vec v_{BA} = 3\\hat j - 4\\hat i = (-4, 3)$ m/s, of size 5 m/s. B's relative position starts at $(300, 0)$. *Why this step:* in A's frame A is fixed at the origin, and B moves in a straight line (constant relative velocity).\n2. The minimum distance is the perpendicular distance from the origin to that line:",
    },
    { type: "math", latex: "d_{\\min} = \\frac{|x_0 v_y - y_0 v_x|}{|\\vec v_{BA}|} = \\frac{|300 \\times 3 - 0 \\times (-4)|}{5} = 180\\text{ m}" },
    {
      type: "text",
      content:
        "3. When: $t = \\dfrac{-\\vec r_0\\cdot\\vec v_{BA}}{|\\vec v_{BA}|^2} = \\dfrac{-(300)(-4)}{25} = 48$ s. Check: at 48 s, $\\vec r_{BA} = (300 - 192,\\ 144) = (108, 144)$, of length $\\sqrt{32400} = 180$ m. ✓",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"relative velocity is the difference of the speeds\"",
      content:
        "Only for motion along one line in the same direction. For cars at right angles at 30 and 40 m/s, the relative speed is 50 m/s, not 10. For head-on motion at 30 and 40, it is 70. Subtract **vectors**, then take the length.",
    },
    {
      type: "quiz",
      id: "mfe2-4-q1",
      variant: "practice",
      question: "Two trains, 100 m and 150 m long, move in opposite directions on parallel tracks at 20 m/s and 30 m/s. How long do they take to pass each other completely?",
      options: [
        { text: "$25$ s", feedback: "That uses the difference of speeds, correct only if they move the same way." },
        { text: "$2$ s", feedback: "They must pass their **combined** length, 250 m, not just 100 m." },
        { text: "$5$ s", correct: true, feedback: "Relative speed 50 m/s, combined length 250 m: $250/50 = 5$ s." },
        { text: "$3$ s", feedback: "That uses only the 150 m train's length." },
      ],
    },
    {
      type: "quiz",
      id: "mfe2-4-q2",
      variant: "practice",
      question: "Car A moves north at 30 m/s and car B east at 40 m/s. What is the speed of A relative to B?",
      options: [
        { text: "$50$ m/s", correct: true, feedback: "$\\vec v_{AB} = -40\\hat i + 30\\hat j$, of length 50 m/s." },
        { text: "$10$ m/s", feedback: "That subtracts the speeds as if they were along one line." },
        { text: "$70$ m/s", feedback: "That adds the speeds, correct only for head-on motion." },
        { text: "$35$ m/s", feedback: "Speeds do not average. Subtract the vectors and use Pythagoras." },
      ],
    },
    {
      type: "quiz",
      id: "mfe2-4-q3",
      variant: "practice",
      question: "A 50 m walkway moves at 1 m/s. How long does a person walking at 1.5 m/s relative to the belt, in the belt's direction, take to cover it?",
      options: [
        { text: "$33.3$ s", feedback: "That uses only the walking speed; the belt carries the walker too." },
        { text: "$100$ s", feedback: "That is walking against the belt ($0.5$ m/s)." },
        { text: "$50$ s", feedback: "That uses only the belt's speed." },
        { text: "$20$ s", correct: true, feedback: "Ground speed $1.5 + 1 = 2.5$ m/s: $50/2.5 = 20$ s." },
      ],
    },
    {
      type: "quiz",
      id: "mfe2-4-q4",
      variant: "concept",
      question: "Why does the hunter's bullet always hit the falling monkey (if it arrives before they reach the ground)?",
      options: [
        { text: "Because bullets are too fast for gravity to matter.", feedback: "The bullet does fall; it falls by exactly as much as the monkey does." },
        { text: "Both accelerate at $\\vec g$, so relative to the monkey the bullet moves in a straight line along the original aim.", correct: true, feedback: "Relative acceleration $\\vec g - \\vec g = \\vec 0$." },
        { text: "Because the monkey's fall is slower than the bullet's.", feedback: "Both fall with the same acceleration $g$, which is exactly why it works." },
      ],
    },
    {
      type: "quiz",
      id: "mfe2-4-q5",
      variant: "practice",
      question: "Ship B is 100 m due north of ship A. A sails north at 8 m/s and B sails east at 6 m/s. What is their closest distance?",
      options: [
        { text: "$60$ m", correct: true, feedback: "In A's frame B starts at $(0, 100)$ with $\\vec v_{BA} = (6, -8)$, speed 10. $d_{\\min} = \\frac{|0 \\times (-8) - 100 \\times 6|}{10} = 60$ m (at $t = 8$ s)." },
        { text: "$80$ m", feedback: "That is the perpendicular distance for the swapped components. Recheck with $\\vec v_{BA} = (6, -8)$." },
        { text: "$0$ m", feedback: "B moves sideways relative to A, so they never meet." },
        { text: "$100$ m", feedback: "They get closer at first, because A is heading towards where B was." },
      ],
      hint: "Work in A's frame: B moves in a straight line with velocity $\\vec v_B - \\vec v_A$.",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "river-boat-and-rain-problems",
  title: "2.5 · River–Boat and Rain–Umbrella Problems",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "A ferryman crosses the Ganga. If he points his boat straight at the opposite ghat, the current carries him downstream and he lands well below it. If he wants to land exactly opposite, he must point partly upstream. Pilots do the same in a crosswind, and you do it when you tilt your umbrella forward while walking in the rain. It is all one equation.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Motion through a moving medium",
      content:
        "$\\vec v_{\\text{ground}} = \\vec v_{\\text{rel. medium}} + \\vec v_{\\text{medium}}$. For a boat: $\\vec v_b = \\vec v_{bw} + \\vec v_w$ (boat relative to water plus water relative to ground). Heading is the direction of $\\vec v_{bw}$; the actual path is along $\\vec v_b$.",
    },
    {
      type: "text",
      content:
        "Set up a river of width $d$ flowing at $v_w$ along $+x$; the boat moves at $v_{bw}$ relative to the water, heading at angle $\\alpha$ **upstream** of straight across. Then",
    },
    {
      type: "math",
      latex:
        "v_{\\text{across}} = v_{bw}\\cos\\alpha, \\qquad v_{\\text{along}} = v_w - v_{bw}\\sin\\alpha, \\qquad t = \\frac{d}{v_{bw}\\cos\\alpha}, \\qquad \\text{drift} = (v_w - v_{bw}\\sin\\alpha)\\,t",
    },
    {
      type: "text",
      content:
        "**Least time:** $t$ is smallest when $\\cos\\alpha = 1$, i.e. head **straight across**: $t_{\\min} = \\dfrac{d}{v_{bw}}$, with drift $v_w\\dfrac{d}{v_{bw}}$. The current does not slow the crossing; it only carries you sideways.\n\n**Zero drift** (land directly opposite): need $v_w = v_{bw}\\sin\\alpha$, so $\\sin\\alpha = \\dfrac{v_w}{v_{bw}}$. Possible only if $v_{bw} > v_w$. The crossing time is then $\\dfrac{d}{\\sqrt{v_{bw}^2 - v_w^2}}$.\n\n**Least drift when the river is faster** ($v_w > v_{bw}$): minimise $\\dfrac{v_w - v_{bw}\\sin\\alpha}{\\cos\\alpha}$. Its derivative with respect to $\\alpha$ is $\\dfrac{v_w\\sin\\alpha - v_{bw}}{\\cos^2\\alpha}$, which vanishes when $\\sin\\alpha = \\dfrac{v_{bw}}{v_w}$. The boat's **resultant** velocity is then perpendicular to its heading.",
    },
    {
      type: "interactive",
      config: {
        component: "mfe-motion-lab",
        mode: "river-boat",
        sliders: {
          river: { min: 0, max: 8, step: 0.5, initial: 3 },
          boat: { min: 1, max: 8, step: 0.5, initial: 5 },
          heading: { min: -80, max: 80, step: 1, initial: 0 },
        },
        riverWidth: 100,
        caption:
          "Heading is measured from straight across (positive = upstream). Try 0° for least time, then find the heading that gives zero drift.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: at heading $0^\\circ$ the crossing takes $\\frac{100}{5} = 20$ s and the boat drifts $3 \\times 20 = 60$ m downstream. At about $37^\\circ$ upstream ($\\sin\\alpha = \\frac35$) the drift is zero, the speed across drops to 4 m/s and the crossing takes 25 s. Any other heading takes longer than 20 s. Set the river to 6 m/s: no heading reaches the opposite point, and the least drift comes at $\\sin\\alpha = \\frac56$.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (find the river from two crossings, JEE classic).** Heading straight across, a boat reaches the far bank in 10 min, landing 120 m downstream. Heading upstream at a suitable angle, it lands directly opposite in 12.5 min. Find the width, the boat's speed in still water and the river's speed.\n\n1. First crossing: drift $= v_w \\times 10 = 120$, so $v_w = 12$ m/min. Also $d = 10\\,v_{bw}$. *Why this step:* heading straight across separates the two effects cleanly: the time gives the boat speed, the drift gives the river speed.\n2. Second crossing: $d = 12.5\\sqrt{v_{bw}^2 - v_w^2}$.\n3. Equate: $10v_{bw} = 12.5\\sqrt{v_{bw}^2 - 144} \\Rightarrow 0.64\\,v_{bw}^2 = v_{bw}^2 - 144 \\Rightarrow v_{bw}^2 = 400$.\n4. $v_{bw} = 20$ m/min, $d = 200$ m, $v_w = 12$ m/min.\n\n**Worked example 2 (an aircraft in a crosswind).** A plane flies at 200 km/h relative to the air and must travel due north. A wind blows from west to east at 100 km/h.\n\n1. Same triangle as zero drift: head into the wind at $\\sin\\alpha = \\frac{100}{200} = \\frac12$, so $\\alpha = 30^\\circ$ west of north.\n2. Ground speed $= 200\\cos 30^\\circ = 100\\sqrt3 \\approx 173$ km/h.",
    },
    {
      type: "text",
      content:
        "**Rain and umbrellas.** Rain falls vertically at 10 m/s and you walk at 5 m/s. How does the rain appear to you? $\\vec v_{\\text{rain,man}} = \\vec v_{\\text{rain}} - \\vec v_{\\text{man}} = (0, -10) - (5, 0) = (-5, -10)$. It seems to come **towards you from the front**, at $\\tan^{-1}\\frac{5}{10} = \\tan^{-1}\\frac12 \\approx 26.6^\\circ$ from the vertical. So tilt the umbrella forward by that angle.",
    },
    {
      type: "interactive",
      config: {
        component: "mfe-motion-lab",
        mode: "rain-man",
        sliders: {
          rain: { min: 1, max: 20, step: 1, initial: 10 },
          wind: { min: -10, max: 10, step: 1, initial: 0 },
          man: { min: -10, max: 10, step: 1, initial: 5 },
        },
        caption:
          "The streaks show rain as the walker sees it. Walk faster and the rain slants more; now add a wind of +5 m/s (blowing the same way as the walker).",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: at 5 m/s with no wind the umbrella tilts forward about $27^\\circ$. With a wind of $+5$ m/s the rain itself moves forward at 5 m/s, exactly matching the walker: relative to the walker it falls vertically, and the umbrella should be held upright even though the rain is slanting for someone standing still.\n\n**Worked example 3 (true velocity of rain, JEE).** Walking at 3 km/h, a man finds the rain falling vertically. At 6 km/h it appears to fall at $45^\\circ$ to the vertical. Find the true velocity of the rain.\n\n1. Let the rain be $(v_x, -v_y)$ with walking along $+x$. *Why this step:* the rain may have a horizontal part too; two observations give two equations for the two unknowns.\n2. At 3 km/h: relative velocity $(v_x - 3, -v_y)$ is vertical, so $v_x = 3$ km/h.\n3. At 6 km/h: $(3 - 6, -v_y) = (-3, -v_y)$ at $45^\\circ$ means $v_y = 3$ km/h.\n4. True rain velocity: $(3, -3)$, speed $3\\sqrt2 \\approx 4.24$ km/h, at $45^\\circ$ to the vertical, slanting in the direction the man walks.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"to cross fastest, aim upstream\"",
      content:
        "Aiming upstream spends part of the boat's speed fighting the current, so less of it carries you across. The fastest crossing aims **straight across** and accepts the drift. Aim upstream only when you care about **where** you land, not how soon.",
    },
    {
      type: "quiz",
      id: "mfe2-5-q1",
      variant: "practice",
      question: "A river 150 m wide flows at 4 m/s. A boat moves at 5 m/s in still water. What is the least time to cross, and how far downstream does it land?",
      options: [
        { text: "$50$ s, no drift", feedback: "That is the zero-drift crossing ($150/3$), which is slower, not the fastest." },
        { text: "$16.7$ s, no drift", feedback: "That adds the river's 4 m/s to the boat's 5 m/s. The current is perpendicular to the crossing and cannot speed it up." },
        { text: "$30$ s, $120$ m downstream", correct: true, feedback: "Head straight across: $150/5 = 30$ s; drift $4 \\times 30 = 120$ m." },
        { text: "$30$ s, no drift", feedback: "Heading straight across, the current still carries the boat downstream." },
      ],
    },
    {
      type: "quiz",
      id: "mfe2-5-q2",
      variant: "practice",
      question: "A boat moves at 5 m/s in still water; the river flows at 3 m/s and is 100 m wide. At what angle to the straight-across direction must it head to land directly opposite, and how long does it take?",
      options: [
        { text: "$37^\\circ$ upstream, 20 s", feedback: "Heading upstream reduces the across speed to 4 m/s, so the crossing takes longer than 20 s." },
        { text: "$37^\\circ$ upstream, 25 s", correct: true, feedback: "$\\sin\\alpha = \\frac35$; across speed $\\sqrt{25 - 9} = 4$ m/s; $100/4 = 25$ s." },
        { text: "$53^\\circ$ upstream, 25 s", feedback: "$53^\\circ$ has $\\sin = 0.8$; zero drift needs $\\sin\\alpha = v_w/v_{bw} = 0.6$." },
        { text: "Straight across, 20 s", feedback: "Straight across gives the least time but 60 m of drift." },
      ],
    },
    {
      type: "quiz",
      id: "mfe2-5-q3",
      variant: "concept",
      question: "A river flows at 5 m/s and a boat can do 3 m/s in still water. Which is true?",
      options: [
        { text: "It cannot land directly opposite; its least drift comes with $\\sin\\alpha = \\frac35$ from straight across.", correct: true, feedback: "When $v_w > v_{bw}$, drift is minimised at $\\sin\\alpha = v_{bw}/v_w$." },
        { text: "The boat can land directly opposite by heading far enough upstream.", feedback: "That needs $\\sin\\alpha = v_w/v_{bw} = 5/3 > 1$: impossible." },
        { text: "It cannot cross the river at all.", feedback: "Any heading with a component across the river gets it across; it just drifts." },
      ],
    },
    {
      type: "quiz",
      id: "mfe2-5-q4",
      variant: "practice",
      question: "Rain falls vertically at 12 m/s. A cyclist rides at 5 m/s. At what speed does the rain hit the cyclist, and which way should she tilt her umbrella?",
      options: [
        { text: "$7$ m/s; forward", feedback: "Perpendicular velocities combine by Pythagoras, not subtraction." },
        { text: "$13$ m/s; forward, at $\\tan^{-1}\\frac{5}{12}$ to the vertical", correct: true, feedback: "$\\vec v_{\\text{rel}} = (-5, -12)$, length 13; it comes from the front." },
        { text: "$13$ m/s; backward", feedback: "Relative to her, the rain comes from the front (she runs into it), so tilt forward." },
        { text: "$17$ m/s; forward", feedback: "Perpendicular velocities do not simply add." },
      ],
    },
    {
      type: "quiz",
      id: "mfe2-5-q5",
      variant: "practice",
      question: "A plane with airspeed 200 km/h must fly due north while a 100 km/h wind blows from the west. What is its ground speed?",
      options: [
        { text: "$200$ km/h", feedback: "Part of the airspeed is used to cancel the wind." },
        { text: "$100\\sqrt5 \\approx 224$ km/h", feedback: "That adds the wind at right angles without correcting the heading; the plane would then drift east." },
        { text: "$100$ km/h", feedback: "That subtracts the wind directly, as if it blew from the north." },
        { text: "$100\\sqrt3 \\approx 173$ km/h", correct: true, feedback: "Heading $30^\\circ$ west of north cancels the wind; the north component is $200\\cos 30^\\circ$." },
      ],
    },
    {
      type: "quiz",
      id: "mfe2-5-q6",
      variant: "concept",
      question: "In a river, heading straight across instead of slightly upstream makes the crossing",
      options: [
        { text: "faster, but with more drift.", correct: true, feedback: "All of the boat's speed goes into crossing; the current adds drift but does not slow it." },
        { text: "slower, because the current pushes against it.", feedback: "The current is perpendicular to the crossing direction; it cannot slow the across-motion." },
        { text: "the same speed, with the same drift.", feedback: "Heading changes both the across speed and the drift." },
      ],
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "circular-motion-kinematics",
  title: "2.6 · Kinematics of Circular Motion",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "A car goes round a roundabout with the speedometer steady at 36 km/h. Is it accelerating? Your stomach says yes: you lean outward. The speedometer says the speed is not changing. Both are right, because velocity is a vector: its size is constant, but its **direction** turns all the time, and a turning velocity is an accelerating one.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Angular quantities",
      content:
        "Angular position $\\theta$ (radians); angular displacement $\\Delta\\theta$; angular velocity $\\omega = \\dfrac{d\\theta}{dt}$ (rad/s); angular acceleration $\\alpha = \\dfrac{d\\omega}{dt}$.\nOn a circle of radius $r$: arc $s = r\\theta$, speed $v = \\omega r$, period $T = \\dfrac{2\\pi}{\\omega}$, frequency $f = \\dfrac1T$, so $\\omega = 2\\pi f$.",
    },
    {
      type: "text",
      content:
        "**Deriving the centripetal acceleration from the velocity triangle.** In a short time $\\Delta t$ the particle turns through $\\Delta\\theta = \\omega\\Delta t$. Its velocity keeps its length $v$ but turns through the same angle $\\Delta\\theta$. Draw $\\vec v_1$ and $\\vec v_2$ tail to tail: an isosceles triangle with two sides $v$ and a small apex angle $\\Delta\\theta$. The third side is $\\Delta\\vec v$, and for a small angle it is an arc of radius $v$:",
    },
    { type: "math", latex: "|\\Delta\\vec v| \\approx v\\,\\Delta\\theta \\quad\\Rightarrow\\quad a = \\lim_{\\Delta t \\to 0}\\frac{|\\Delta\\vec v|}{\\Delta t} = v\\frac{d\\theta}{dt} = v\\omega = \\frac{v^2}{r} = \\omega^2 r" },
    {
      type: "text",
      content:
        "As $\\Delta t \\to 0$, $\\Delta\\vec v$ becomes perpendicular to $\\vec v$, pointing towards the centre. **Check with calculus:** $\\vec r = r(\\cos\\omega t\\,\\hat i + \\sin\\omega t\\,\\hat j)$ gives $\\vec v = r\\omega(-\\sin\\omega t\\,\\hat i + \\cos\\omega t\\,\\hat j)$, tangent to the circle, and $\\vec a = -r\\omega^2(\\cos\\omega t\\,\\hat i + \\sin\\omega t\\,\\hat j) = -\\omega^2\\vec r$: size $\\omega^2 r$, pointing from the particle to the centre. ✓",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Centripetal acceleration",
      content:
        "A particle moving on a circle of radius $r$ at speed $v$ has an acceleration $a_c = \\dfrac{v^2}{r} = \\omega^2 r$ directed **towards the centre**, even when its speed is constant.",
    },
    {
      type: "interactive",
      config: {
        component: "mfe-motion-lab",
        mode: "circular",
        sliders: {
          radius: { min: 1, max: 5, step: 0.5, initial: 2 },
          speed: { min: 1, max: 10, step: 1, initial: 4 },
          tangential: { min: 0, max: 0, step: 0.5, initial: 0 },
        },
        showVectors: true,
        caption:
          "Uniform circular motion: the velocity arrow is always tangent, the acceleration arrow always points to the centre. Compare the arc travelled with the chord (displacement).",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: with $r = 2$ m and $v = 4$ m/s, $\\omega = 2$ rad/s, $a_c = \\frac{16}{2} = 8$ m/s², and one revolution takes $\\frac{2\\pi}{2} = \\pi \\approx 3.14$ s. After a full lap the distance is $2\\pi r \\approx 12.6$ m but the displacement is zero. Doubling the speed quadruples $a_c$; doubling the radius at the same speed halves it.",
    },
    {
      type: "text",
      content:
        "**Non-uniform circular motion.** If the speed also changes, there is a **tangential** acceleration $a_t = \\dfrac{dv}{dt}$ along the velocity, in addition to $a_c = \\dfrac{v^2}{r}$ towards the centre. They are perpendicular, so",
    },
    { type: "math", latex: "a = \\sqrt{a_c^2 + a_t^2}, \\qquad \\alpha = \\frac{a_t}{r}, \\qquad \\omega = \\omega_0 + \\alpha t, \\quad \\theta = \\omega_0 t + \\tfrac12\\alpha t^2, \\quad \\omega^2 = \\omega_0^2 + 2\\alpha\\theta" },
    {
      type: "text",
      content:
        "The angular equations are the equations of 1.4 with $x \\to \\theta$, $v \\to \\omega$, $a \\to \\alpha$, valid when $\\alpha$ is constant.",
    },
    {
      type: "interactive",
      config: {
        component: "mfe-motion-lab",
        mode: "circular",
        sliders: {
          radius: { min: 1, max: 5, step: 0.5, initial: 2 },
          speed: { min: 1, max: 10, step: 1, initial: 4 },
          tangential: { min: -2, max: 2, step: 0.5, initial: 1 },
        },
        duration: 6,
        showVectors: true,
        caption:
          "Now the particle speeds up at 1 m/s². The net acceleration tilts forward from the centre, and the inward part grows as v² grows.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the net acceleration no longer points at the centre; it leans in the direction of motion when speeding up (and backwards when $a_t < 0$). As the speed grows, $v^2/r$ quickly dominates and the arrow swings back towards the centre.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (a clock hand).** The second hand of a clock is 10 cm long. Find the speed and acceleration of its tip.\n\n1. One revolution in 60 s: $\\omega = \\dfrac{2\\pi}{60} = \\dfrac{\\pi}{30} \\approx 0.105$ rad/s. *Why this step:* convert \"one turn per minute\" to radians per second before anything else; the formulas need SI radians.\n2. $v = \\omega r = 0.105 \\times 0.1 \\approx 1.05 \\times 10^{-2}$ m/s.\n3. $a_c = \\omega^2 r = (0.105)^2 \\times 0.1 \\approx 1.10 \\times 10^{-3}$ m/s², towards the centre of the dial.\n\n**Worked example 2 (a car speeding up on a curve).** A car on a curve of radius 50 m is moving at 10 m/s and speeding up at 2 m/s².\n\n1. $a_c = \\dfrac{v^2}{r} = \\dfrac{100}{50} = 2$ m/s² inward; $a_t = 2$ m/s² forward.\n2. $a = \\sqrt{4 + 4} = 2\\sqrt2 \\approx 2.83$ m/s², at $45^\\circ$ to the velocity. *Why this step:* the two parts are perpendicular, so they combine by Pythagoras, never by simple addition.\n\n**Worked example 3 (angular kinematics).** A ceiling fan starts from rest and reaches 20 rad/s in 5 s with constant angular acceleration.\n\n1. $\\alpha = \\dfrac{20 - 0}{5} = 4$ rad/s².\n2. Angle turned: $\\theta = \\tfrac12(4)(5)^2 = 50$ rad, i.e. $\\dfrac{50}{2\\pi} \\approx 7.96$ revolutions.\n3. A blade tip at $r = 0.6$ m has $a_t = \\alpha r = 2.4$ m/s² throughout, while at 5 s its $a_c = \\omega^2 r = 400 \\times 0.6 = 240$ m/s².",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"uniform circular motion has zero acceleration\"",
      content:
        "\"Uniform\" refers to constant **speed**. The velocity changes direction continuously, so there is an acceleration $v^2/r$ towards the centre. Only uniform motion in a **straight line** has zero acceleration.",
    },
    {
      type: "quiz",
      id: "mfe2-6-q1",
      variant: "practice",
      question: "A stone tied to a 0.5 m string is whirled in a horizontal circle at 2 revolutions per second. What is its centripetal acceleration?",
      options: [
        { text: "$2$ m/s²", feedback: "That uses $\\omega = 2$ rad/s. 2 rev/s is $4\\pi$ rad/s." },
        { text: "$2\\pi \\approx 6.3$ m/s²", feedback: "That is $\\omega r = v$, the speed, not the acceleration." },
        { text: "$8\\pi^2 \\approx 79$ m/s²", correct: true, feedback: "$\\omega = 2\\pi \\times 2 = 4\\pi$ rad/s; $a = \\omega^2 r = 16\\pi^2 \\times 0.5 = 8\\pi^2$." },
        { text: "$32\\pi^2$ m/s²", feedback: "You divided by $r$ instead of multiplying: $a = \\omega^2 r = 16\\pi^2 \\times 0.5$." },
      ],
    },
    {
      type: "quiz",
      id: "mfe2-6-q2",
      variant: "practice",
      question: "A particle moves on a circle of radius 2 m at a steady 4 m/s. What is its average velocity over half a revolution?",
      options: [
        { text: "$4$ m/s", feedback: "That is the average **speed**. Average velocity uses the 4 m displacement across the circle." },
        { text: "$0$", feedback: "Zero is the answer over a **full** revolution. After half, the particle is on the opposite side." },
        { text: "$\\dfrac{8}{\\pi} \\approx 2.55$ m/s", correct: true, feedback: "Displacement is the diameter, 4 m; time is $\\frac{\\pi r}{v} = \\frac{\\pi}{2}$ s; $\\frac{4}{\\pi/2} = \\frac8\\pi$." },
        { text: "$\\dfrac{4}{\\pi}$ m/s", feedback: "Half a revolution takes $\\frac{\\pi}{2}$ s, not $\\pi$ s." },
      ],
    },
    {
      type: "quiz",
      id: "mfe2-6-q3",
      variant: "practice",
      question: "A car moves at 10 m/s on a curve of radius 20 m and is speeding up at 3 m/s². What is the magnitude of its acceleration?",
      options: [
        { text: "$\\sqrt{34} \\approx 5.83$ m/s²", correct: true, feedback: "$a_c = 100/20 = 5$, $a_t = 3$: $\\sqrt{25 + 9} = \\sqrt{34}$." },
        { text: "$8$ m/s²", feedback: "The components are perpendicular; add them by Pythagoras." },
        { text: "$5$ m/s²", feedback: "That is only the centripetal part." },
        { text: "$3$ m/s²", feedback: "That is only the tangential part." },
      ],
    },
    {
      type: "quiz",
      id: "mfe2-6-q4",
      variant: "concept",
      question: "A particle moves in a circle at constant speed. Which is true?",
      options: [
        { text: "Its speed and the magnitude of its acceleration are constant, but both vectors keep turning.", correct: true, feedback: "$|\\vec v| = v$ and $|\\vec a| = v^2/r$ are fixed; the directions rotate." },
        { text: "Its velocity and acceleration are both constant.", feedback: "Both change direction continuously." },
        { text: "Its acceleration is zero because its speed is constant.", feedback: "Constant speed is not constant velocity on a curve." },
      ],
    },
    {
      type: "quiz",
      id: "mfe2-6-q5",
      variant: "practice",
      question: "A wheel spinning at 10 rad/s decelerates uniformly at 2 rad/s² until it stops. Through what angle does it turn while stopping?",
      options: [
        { text: "$50$ rad", feedback: "That is $\\omega_0 t$ as if it never slowed. Use $\\omega^2 = \\omega_0^2 + 2\\alpha\\theta$." },
        { text: "$25$ rad", correct: true, feedback: "$0 = 100 - 2(2)\\theta \\Rightarrow \\theta = 25$ rad (in 5 s)." },
        { text: "$5$ rad", feedback: "That is the stopping **time** in seconds." },
        { text: "$2.5$ rad", feedback: "Recheck: $\\theta = \\frac{\\omega_0^2}{2|\\alpha|} = \\frac{100}{4}$." },
      ],
    },
    {
      type: "quiz",
      id: "mfe2-6-q6",
      variant: "practice",
      question: "A particle moves on a circle at constant speed $v$. What is the magnitude of the change in its velocity after a quarter revolution?",
      options: [
        { text: "$v\\sqrt2$", correct: true, feedback: "$\\vec v_1 \\perp \\vec v_2$, each of length $v$: $|\\vec v_2 - \\vec v_1| = \\sqrt{v^2 + v^2}$." },
        { text: "$0$", feedback: "The speed is unchanged, but the direction has turned through $90^\\circ$." },
        { text: "$2v$", feedback: "That is after a **half** revolution, when the velocity has reversed." },
        { text: "$v$", feedback: "Equal-length vectors at $60^\\circ$ would give $v$. Here the angle is $90^\\circ$." },
      ],
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-2-mastery",
  title: "2.7 · Chapter 2 Mastery",
  position: 7,
  blocks: blocks([
    {
      type: "text",
      content:
        "No formula sheet. Three moves solve everything here: **split** the motion into perpendicular components, **subtract** velocities to change frame, and **rotate** to see that a turning velocity means an inward acceleration. $g = 10$ m/s² throughout.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Chapter 2 in six lines",
      content:
        "1. $\\vec v = \\frac{d\\vec r}{dt}$ is tangent to the path; $\\vec a$ points into the bend, not necessarily along $\\vec v$.\n2. Projectile: $x = (u\\cos\\theta)t$, $y = (u\\sin\\theta)t - \\frac12gt^2$; everything else ($T$, $H$, $R$, the parabola) follows.\n3. Complementary angles share a range; $45^\\circ$ is best only on level ground. On an incline, tilt the axes.\n4. $\\vec v_{AB} = \\vec v_A - \\vec v_B$; two projectiles have zero relative acceleration.\n5. Ground velocity $=$ velocity relative to medium $+$ velocity of medium (river, wind, rain).\n6. Circle: $v = \\omega r$, $a_c = \\frac{v^2}{r}$ inward, $a_t = \\frac{dv}{dt}$, $a = \\sqrt{a_c^2 + a_t^2}$.",
    },
    {
      type: "quiz",
      id: "mfe2-7-q1",
      variant: "mastery",
      question: "A particle has $\\vec r = 4t\\,\\hat i + (3t - 5t^2)\\,\\hat j$ (SI). What is the equation of its path?",
      options: [
        { text: "$y = \\dfrac{3x}{4} - \\dfrac{5x^2}{4}$", feedback: "$(x/4)^2 = x^2/16$, not $x^2/4$." },
        { text: "$y = 12x - 80x^2$", feedback: "You substituted $t = 4x$. From $x = 4t$, $t = x/4$." },
        { text: "$y = \\dfrac{3x}{4} - \\dfrac{5x^2}{16}$", correct: true, feedback: "$t = x/4$: $y = 3(x/4) - 5(x/4)^2$." },
        { text: "$y = 3x - 5x^2$", feedback: "That ignores the factor 4 in $x = 4t$." },
      ],
    },
    {
      type: "quiz",
      id: "mfe2-7-q2",
      variant: "mastery",
      question: "A ball is thrown at 40 m/s at $30^\\circ$ above level ground. Its time of flight, maximum height and range are",
      options: [
        { text: "$4$ s, $80$ m, $139$ m", feedback: "$H = \\frac{u_y^2}{2g} = \\frac{400}{20} = 20$ m; 80 m is $u^2/2g$ with the full speed." },
        { text: "$4$ s, $20$ m, $80\\sqrt3 \\approx 139$ m", correct: true, feedback: "$u_y = 20$, $u_x = 20\\sqrt3$: $T = 4$ s, $H = 400/20 = 20$ m, $R = 20\\sqrt3 \\times 4$." },
        { text: "$2$ s, $20$ m, $69$ m", feedback: "2 s is the time to the top. The full flight is twice that." },
        { text: "$6.9$ s, $60$ m, $139$ m", feedback: "Those are the $60^\\circ$ time and height. At $30^\\circ$ use $\\sin 30^\\circ = \\frac12$." },
      ],
    },
    {
      type: "quiz",
      id: "mfe2-7-q3",
      variant: "mastery",
      question: "Two balls are thrown at the same speed at $30^\\circ$ and $60^\\circ$. What is the ratio of their maximum heights?",
      options: [
        { text: "$1 : 2$", feedback: "That is $\\sin 30^\\circ : \\sin 90^\\circ$. Height goes as $\\sin^2\\theta$." },
        { text: "$1 : \\sqrt3$", feedback: "That is the ratio of times of flight, which go as $\\sin\\theta$." },
        { text: "$1 : 1$", feedback: "They share a **range**, not a height." },
        { text: "$1 : 3$", correct: true, feedback: "$H \\propto \\sin^2\\theta$: $\\frac{1/4}{3/4} = \\frac13$." },
      ],
    },
    {
      type: "quiz",
      id: "mfe2-7-q4",
      variant: "mastery",
      question: "A package is dropped from a plane flying horizontally at 15 m/s at a height of 125 m. How far ahead of the drop point does it land?",
      options: [
        { text: "$0$ m", feedback: "Dropped from a moving plane, the package shares the plane's horizontal velocity." },
        { text: "$75$ m", correct: true, feedback: "It keeps the plane's 15 m/s horizontally. $T = \\sqrt{250/10} = 5$ s, so $x = 75$ m." },
        { text: "$125$ m", feedback: "That is the height." },
        { text: "$37.5$ m", feedback: "Recheck: $125 = 5T^2$ gives $T = 5$ s, not 2.5 s." },
      ],
    },
    {
      type: "quiz",
      id: "mfe2-7-q5",
      variant: "mastery",
      question: "A 200 m train at 72 km/h overtakes a 100 m train at 36 km/h on a parallel track. How long does the overtaking take?",
      options: [
        { text: "$10$ s", feedback: "That uses the sum of speeds, for trains moving in opposite directions." },
        { text: "$20$ s", feedback: "It must cover both lengths, 300 m, relative to the slower train." },
        { text: "$8.3$ s", feedback: "Convert km/h to m/s: 72 km/h $= 20$ m/s, 36 km/h $= 10$ m/s." },
        { text: "$30$ s", correct: true, feedback: "Relative speed $20 - 10 = 10$ m/s; distance $200 + 100 = 300$ m." },
      ],
    },
    {
      type: "quiz",
      id: "mfe2-7-q6",
      variant: "mastery",
      question: "A river 120 m wide flows at 3 m/s; a boat does 5 m/s in still water. What are the least crossing time and the crossing time for zero drift?",
      options: [
        { text: "$24$ s and $30$ s", correct: true, feedback: "Least time: $120/5 = 24$ s. Zero drift: across speed $\\sqrt{25 - 9} = 4$ m/s, $120/4 = 30$ s." },
        { text: "$30$ s and $24$ s", feedback: "Swapped: aiming straight across is the fastest." },
        { text: "$24$ s and $24$ s", feedback: "Aiming upstream reduces the across component, so zero drift takes longer." },
        { text: "$15$ s and $30$ s", feedback: "The current cannot speed up the crossing; only the boat's across component counts." },
      ],
    },
    {
      type: "quiz",
      id: "mfe2-7-q7",
      variant: "mastery",
      question: "Walking at 3 km/h a man finds the rain falling vertically; at 6 km/h it appears at $45^\\circ$ to the vertical. The rain's true speed is",
      options: [
        { text: "$3$ km/h", feedback: "That is only the vertical part. The rain also moves horizontally at 3 km/h." },
        { text: "$6$ km/h", feedback: "At 6 km/h the relative horizontal part is $3 - 6 = -3$, not $-6$." },
        { text: "$3\\sqrt2$ km/h", correct: true, feedback: "Horizontal part 3 km/h (to look vertical at 3 km/h); relative $(-3, -v_y)$ at $45^\\circ$ gives $v_y = 3$. Speed $3\\sqrt2$." },
        { text: "$3\\sqrt5$ km/h", feedback: "That takes the vertical part as 6. At $45^\\circ$ the two relative components are equal: 3 and 3." },
      ],
    },
    {
      type: "quiz",
      id: "mfe2-7-q8",
      variant: "mastery",
      question: "A car on a curve of radius 100 m is at 20 m/s and braking at 3 m/s². What is the magnitude of its acceleration?",
      options: [
        { text: "$1$ m/s²", feedback: "Braking does not subtract from the centripetal part; the two are perpendicular." },
        { text: "$7$ m/s²", feedback: "Perpendicular components add by Pythagoras." },
        { text: "$5$ m/s²", correct: true, feedback: "$a_c = 400/100 = 4$, $a_t = 3$: $\\sqrt{16 + 9} = 5$ m/s²." },
        { text: "$4$ m/s²", feedback: "That is only the centripetal part." },
      ],
    },
    {
      type: "quiz",
      id: "mfe2-7-q9",
      variant: "mastery",
      question: "A ball is thrown at 20 m/s at $60^\\circ$ above the horizontal. After how long is its velocity perpendicular to its initial velocity?",
      options: [
        { text: "$\\dfrac{4}{\\sqrt3} \\approx 2.31$ s", correct: true, feedback: "$\\vec u\\cdot\\vec v = u^2 - ugt\\sin\\theta = 0 \\Rightarrow t = \\frac{u}{g\\sin\\theta} = \\frac{20}{5\\sqrt3}$; this is within $T = 2\\sqrt3$ s." },
        { text: "$\\sqrt3 \\approx 1.73$ s", feedback: "That is the time to the top, where $\\vec v$ is horizontal, not perpendicular to $\\vec u$." },
        { text: "$4$ s", feedback: "That uses $\\cos 60^\\circ$ in place of $\\sin 60^\\circ$, and the ball would already have landed." },
        { text: "Never", feedback: "It happens because $\\theta = 60^\\circ > 45^\\circ$." },
      ],
    },
    {
      type: "quiz",
      id: "mfe2-7-q10",
      variant: "mastery",
      question: "A ball is projected from the foot of a $45^\\circ$ incline and strikes the incline at right angles. If $\\beta$ is the angle of projection measured **from the incline**, then",
      options: [
        { text: "$\\tan\\beta = 2$", feedback: "Inverted: the condition is $\\cot\\beta = 2\\tan\\alpha$." },
        { text: "$\\beta = 45^\\circ$", feedback: "That would be a vertical throw, which lands back at the foot." },
        { text: "$\\tan\\beta = 1$", feedback: "With $\\tan\\beta = 1$ the ball still moves up the slope when it lands." },
        { text: "$\\tan\\beta = \\dfrac12$", correct: true, feedback: "Perpendicular impact needs zero velocity along the slope at landing: $\\cot\\beta = 2\\tan\\alpha = 2$, so $\\tan\\beta = \\frac12$." },
      ],
      hint: "Tilt the axes along and perpendicular to the slope. At landing, the component along the slope must be zero.",
    },
    {
      type: "quiz",
      id: "mfe2-7-q11",
      variant: "mastery",
      question: "Ball A is thrown from the ground with velocity $(20, 20)$ m/s. At the same instant ball B is released from rest at the point $(40, 40)$ m. When and where do they collide?",
      options: [
        { text: "At $t = 2$ s, at $(40, 40)$ m", feedback: "Both fall 20 m in those 2 s; they meet 20 m below B's release point." },
        { text: "At $t = 2$ s, at $(40, 20)$ m", correct: true, feedback: "Relative to B, A moves at constant $(20, 20)$ m/s straight at B's start: $t = 40/20 = 2$ s. B has fallen $\\frac12(10)(4) = 20$ m." },
        { text: "At $t = 2\\sqrt2$ s, at $(40, 0)$ m", feedback: "Relative to B, A covers the $40\\sqrt2$ m line of sight at $20\\sqrt2$ m/s, which takes 2 s, not $2\\sqrt2$ s." },
        { text: "They never meet, because A curves down.", feedback: "B falls equally: zero relative acceleration keeps A on the line to B." },
      ],
    },
    {
      type: "quiz",
      id: "mfe2-7-q12",
      variant: "mastery",
      question: "A ball is launched at 20 m/s at $60^\\circ$ to the horizontal from the foot of a $30^\\circ$ incline, up the slope. How far up the slope does it land?",
      options: [
        { text: "$\\dfrac{80}{3} \\approx 26.7$ m", correct: true, feedback: "$R = \\frac{2u^2\\sin(\\theta - \\alpha)\\cos\\theta}{g\\cos^2\\alpha} = \\frac{800 \\times \\frac12 \\times \\frac12}{7.5}$." },
        { text: "$20\\sqrt3 \\approx 34.6$ m", feedback: "That is the level-ground range at $60^\\circ$. The slope intercepts the ball early." },
        { text: "$40$ m", feedback: "That is $u\\cos\\beta\\,T$ alone; gravity's component down the slope takes back 13.3 m." },
        { text: "$53.3$ m", feedback: "The component of gravity along the slope opposes the motion up the slope; subtract it." },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "Chapters 1 and 2 described motion without asking what causes it. Chapter 3 answers that question with Newton's three laws: every acceleration you have computed here, from $g$ to $v^2/r$, must be supplied by a net force.",
    },
  ]),
};

export const mfeChapter2Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lessonMastery,
];
