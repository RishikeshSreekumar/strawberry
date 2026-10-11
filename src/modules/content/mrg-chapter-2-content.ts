import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Mechanics II Chapter 2 — Rotational Kinematics and Moment of Inertia.
 * Rigid rotation about a fixed axis described by one angle: θ, ω, α and
 * their vector nature, v = ω × r and the two accelerations, the constant-α
 * equations, then the moment of inertia I = Σ m r² from rotational kinetic
 * energy, the standard bodies, the parallel and perpendicular axis
 * theorems, and composite, cut and hollowed bodies.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "rigid-bodies-and-rotation",
  title: "2.1 · Rigid Bodies and Rotation",
  position: 1,
  blocks: blocks([
    {
      type: "video",
      src: "/videos/mrg-2-rotational-kinematics-moment-of-inertia.mp4",
      poster: "/videos/mrg-2-rotational-kinematics-moment-of-inertia.jpg",
      title: "Chapter 2 overview video",
      caption:
        "A narrated walk through the whole chapter. Watch it now for the big picture, or come back to it as a recap.",
    },
    {
      type: "text",
      content:
        "Stand at the centre of a spinning merry-go-round and you barely move. Stand at the edge and the wind whips past you. Yet you and a friend at the centre go round in exactly the same time: every point of the platform turns through the same angle. That single fact is what makes rotation simple. One angle describes the motion of the whole body, however many particles it has.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Rigid body",
      content:
        "A **rigid body** is one in which the distance between every pair of particles stays fixed. Real bodies bend a little, but wheels, rods, discs and planets are rigid to an excellent approximation.\nIts motion can be **pure translation** (every point has the same velocity, the body does not turn), **pure rotation** about a fixed axis (every point moves in a circle centred on the axis), or a **combination** of the two (a rolling wheel, a thrown spanner).",
    },
    { type: "heading", text: "Angular variables" },
    {
      type: "text",
      content:
        "For rotation about a fixed axis, pick any reference line in the body, perpendicular to the axis, and let $\\theta$ be the angle it has turned through, in radians. Because the body is rigid, every other line turns through the same $\\theta$. Then define, exactly as in linear kinematics:",
    },
    {
      type: "math",
      latex: "\\omega = \\frac{d\\theta}{dt} \\ \\ (\\text{rad/s}), \\qquad \\alpha = \\frac{d\\omega}{dt} = \\frac{d^2\\theta}{dt^2} \\ \\ (\\text{rad/s}^2)",
    },
    {
      type: "text",
      content:
        "**Angular velocity is a vector along the axis.** A rotation has a size and a sense (clockwise or anticlockwise about an axis). Encode both in one arrow: curl the fingers of your right hand the way the body turns, and your thumb points along $\\vec\\omega$. A disc turning anticlockwise as seen from above has $\\vec\\omega$ pointing up. The arrow lies along the axis, not along any point's motion.",
    },
    { type: "heading", text: "From angle to speed" },
    {
      type: "text",
      content:
        "A particle at distance $r$ from the axis moves on a circle of radius $r$. When the body turns through $d\\theta$, the particle travels an arc $ds = r\\,d\\theta$. Dividing by $dt$:",
    },
    { type: "math", latex: "v = r\\,\\omega \\qquad\\text{and in vector form}\\qquad \\vec v = \\vec\\omega\\times\\vec r" },
    {
      type: "text",
      content:
        "(the cross product gives the right size, $\\omega r$ for $\\vec r$ measured perpendicular to the axis, and the right direction, tangent to the circle). Every point has the same $\\omega$, but its speed grows in proportion to its distance from the axis.",
    },
    { type: "heading", text: "Tangential and centripetal acceleration" },
    {
      type: "text",
      content:
        "**Two accelerations.** A point on a rotating body can speed up along its circle and must also turn. Differentiating $v = r\\omega$ gives the **tangential** acceleration, and circular motion (Mechanics I) gives the **centripetal** one:",
    },
    {
      type: "math",
      latex: "a_t = r\\,\\alpha, \\qquad a_c = \\frac{v^2}{r} = \\omega^2 r, \\qquad a = \\sqrt{a_t^2 + a_c^2} = r\\sqrt{\\alpha^2 + \\omega^4}",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Linking angular and linear quantities",
      content:
        "For a point at distance $r$ from the axis: $s = r\\theta$, $v = r\\omega$, $a_t = r\\alpha$ (along the path), $a_c = \\omega^2 r$ (towards the axis). The angles must be in **radians** for these to hold.",
    },
    {
      type: "text",
      content:
        "In the lab below, set $v_{cm} = 0$: the wheel then spins in place about its centre, as if on a fixed axle (ignore the readouts about the contact point for now; they matter in Chapter 4). The green arrows are the velocities of eight points on the rim.",
    },
    {
      type: "interactive",
      config: {
        component: "mrg-rolling-lab",
        mode: "velocities",
        v: { min: -4, max: 4, step: 0.5, initial: 0 },
        omega: { min: -12, max: 12, step: 0.5, initial: 4 },
        showParts: false,
        showEnergy: false,
        caption:
          "Pure rotation: v_cm = 0. Change ω and watch every rim arrow. Make ω negative to reverse the sense of rotation.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: every rim arrow is tangent to the rim and has the same length, $\\omega R = 4 \\times 0.5 = 2$ m/s, while the centre does not move at all. Doubling $\\omega$ doubles every arrow. A point halfway out would carry an arrow half as long: speed is proportional to distance from the axis.",
    },
    {
      type: "worked-example",
      id: "mrg2-1-we1",
      title: "Worked example 1: a ceiling fan, JEE Main",
      problem:
        "A fan's blades are 0.5 m long and it turns at 1200 rpm. Find the speed of a blade tip.",
      steps: [
        { text: "Convert: $\\omega = 1200 \\times \\dfrac{2\\pi}{60} = 40\\pi$ rad/s $\\approx 125.7$ rad/s. *Why this step:* $v = r\\omega$ needs radians per second; one revolution is $2\\pi$ rad and one minute is 60 s." },
        { text: "$v = r\\omega = 0.5 \\times 40\\pi = 20\\pi \\approx 62.8$ m/s, over 220 km/h." },
      ],
      answer: "$v = 20\\pi \\approx 62.8$ m/s.",
    },
    {
      type: "worked-example",
      id: "mrg2-1-we2",
      title: "Worked example 2: you are rotating",
      problem:
        "The Earth turns once in 24 h. Find your speed at the equator ($R = 6400$ km).",
      steps: [
        { text: "$\\omega = \\dfrac{2\\pi}{86\\,400} \\approx 7.27\\times10^{-5}$ rad/s." },
        { text: "$v = R\\omega \\approx 6.4\\times10^6 \\times 7.27\\times10^{-5} \\approx 465$ m/s. At the poles, on the axis, $v = 0$." },
      ],
      answer: "About 465 m/s.",
    },
    {
      type: "worked-example",
      id: "mrg2-1-we3",
      title: "Worked example 3: total acceleration",
      problem:
        "At some instant a disc of radius 0.2 m has $\\omega = 2$ rad/s and $\\alpha = 3$ rad/s². Find the acceleration of a point on the rim.",
      steps: [
        { text: "$a_t = r\\alpha = 0.2 \\times 3 = 0.6$ m/s², along the rim." },
        { text: "$a_c = \\omega^2 r = 4 \\times 0.2 = 0.8$ m/s², towards the centre." },
        { text: "They are perpendicular, so $a = \\sqrt{0.6^2 + 0.8^2} = 1.0$ m/s². *Why this step:* the two parts are always at right angles, so they combine by Pythagoras, never by adding." },
      ],
      answer: "$a = 1.0$ m/s² ($a_t = 0.6$, $a_c = 0.8$ m/s²).",
    },
    {
      type: "worked-example",
      id: "mrg2-1-we4",
      title: "Worked example 4: $\\vec v = \\vec\\omega\\times\\vec r$",
      problem:
        "A body rotates with $\\vec\\omega = 2\\hat k$ rad/s. Find the velocity of the particle at $\\vec r = 3\\hat i$ m.",
      steps: [
        { text: "$\\vec v = 2\\hat k\\times3\\hat i = 6(\\hat k\\times\\hat i) = 6\\hat j$ m/s." },
        { text: "Check with the picture: $\\vec\\omega$ up the $z$-axis means anticlockwise rotation seen from above, and a point on the $+x$ axis moving anticlockwise heads in the $+y$ direction. ✓" },
      ],
      answer: "$\\vec v = 6\\hat j$ m/s.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"every point of a rotating body has the same speed\"",
      content:
        "Every point has the same **angular** speed $\\omega$. The linear speed $v = r\\omega$ is zero on the axis and largest at the rim. That is why a fan's tips are a blur while its hub is sharp, and why the outer runner on a curved track has further to go in the same time.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "mrg2-1-q1",
      variant: "practice",
      question: "A wheel turns at 300 rpm. What is its angular speed? Give your answer in rad/s.",
      answer: 31.4159,
      relTolerance: 0.01,
      unit: "rad/s",
      hint: "One revolution is $2\\pi$ rad and one minute is 60 s.",
      solution: "$\\omega = 300 \\times \\dfrac{2\\pi}{60} = 10\\pi \\approx 31.4$ rad/s.",
      commonMistakes: [
        { answer: 5, feedback: "5 is the number of revolutions per second. Each revolution is $2\\pi$ rad." },
        { answer: 1885, tolerance: 2, feedback: "That is $600\\pi$: you forgot to divide by 60, since rpm is per minute." },
        { answer: 300, feedback: "Revolutions per minute are not radians per second. Multiply by $\\frac{2\\pi}{60}$." },
      ],
    },
    {
      type: "numeric",
      id: "mrg2-1-q2",
      variant: "practice",
      question: "A disc of radius 0.5 m has $\\omega = 2$ rad/s and $\\alpha = 3$ rad/s² at some instant. What is the magnitude of the acceleration of a rim point? Give your answer in m/s².",
      answer: 2.5,
      tolerance: 0.01,
      unit: "m/s²",
      hint: "Find the tangential and centripetal parts separately. How do two perpendicular vectors combine?",
      solution: "$a_t = r\\alpha = 0.5 \\times 3 = 1.5$ m/s² along the rim, and $a_c = \\omega^2 r = 4 \\times 0.5 = 2$ m/s² towards the centre. They are perpendicular, so $a = \\sqrt{1.5^2 + 2^2} = 2.5$ m/s².",
      commonMistakes: [
        { answer: 3.5, feedback: "You added the two parts. They are perpendicular, so combine them by Pythagoras." },
        { answer: 1.5, feedback: "That is only the tangential part. A rotating point also has centripetal acceleration $\\omega^2 r$." },
        { answer: 2, feedback: "That is only the centripetal part. The disc is also speeding up, so $a_t = r\\alpha$ adds." },
      ],
    },
    {
      type: "quiz",
      id: "mrg2-1-q3",
      variant: "concept",
      multiple: true,
      question: "A rigid body rotates about a fixed axis with increasing speed. Which quantities are the same for every particle of the body (off the axis)? Select all that apply.",
      options: [
        { text: "The angular velocity $\\omega$.", correct: true, feedback: "Rigidity forces every line in the body to turn through the same angle in the same time." },
        { text: "The angular acceleration $\\alpha$.", correct: true, feedback: "$\\alpha = \\frac{d\\omega}{dt}$, and $\\omega$ is shared by every particle, so its rate of change is too." },
        { text: "The angle turned through in a given time.", correct: true, feedback: "That is what makes the body rigid: one angle $\\theta$ describes every particle." },
        { text: "The linear speed $v$.", feedback: "$v = r\\omega$ grows with the distance from the axis." },
        { text: "The centripetal acceleration.", feedback: "$a_c = \\omega^2 r$ also grows with $r$, and is zero on the axis." },
      ],
      hint: "In a rigid body every particle turns through the same angle in the same time. For each quantity, ask whether its formula also involves the distance $r$ from the axis.",
    },
    {
      type: "quiz",
      id: "mrg2-1-q4",
      variant: "concept",
      question: "A turntable spins anticlockwise when viewed from above. In which direction does $\\vec\\omega$ point?",
      options: [
        { text: "Vertically up, along the axis.", correct: true, feedback: "Curl your right-hand fingers anticlockwise (from above); your thumb points up." },
        { text: "Vertically down, along the axis.", feedback: "That is clockwise-from-above rotation. Check with the right-hand rule." },
        { text: "Along the velocity of a point on the rim.", feedback: "$\\vec\\omega$ lies along the axis. Rim velocities point in every horizontal direction at once, so none could be singled out." },
      ],
      hint: "Use the right-hand rule: curl your fingers in the sense of rotation, and your thumb gives the direction of $\\vec\\omega$.",
    },
    {
      type: "quiz",
      id: "mrg2-1-q5",
      variant: "practice",
      question: "A point on a wheel is 0.3 m from the axle, and the wheel turns steadily at 10 rad/s. Find the point's speed and acceleration.",
      options: [
        { text: "3 m/s and 0, since $\\omega$ is constant", feedback: "Constant $\\omega$ kills the tangential part only. The velocity still turns, so $a_c = \\omega^2 r$." },
        { text: "3 m/s and 3 m/s² towards the axle", feedback: "That uses $\\omega r$ again. Centripetal acceleration is $\\omega^2 r = 100 \\times 0.3$." },
        { text: "3 m/s and 30 m/s² towards the axle", correct: true, feedback: "$v = r\\omega = 3$ m/s; steady rotation means only $a_c = \\omega^2 r = 30$ m/s²." },
        { text: "3 m/s and 30 m/s² along the rim", feedback: "The size is right but not the direction. With $\\omega$ constant there is no tangential part; $\\omega^2 r$ points towards the axle." },
      ],
      hint: "Use $v = r\\omega$. With $\\omega$ constant there is no tangential acceleration, but the centripetal acceleration $\\omega^2 r$ is still there.",
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "rotational-kinematics",
  title: "2.2 · Equations of Rotational Kinematics",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "A potter's wheel is switched off and coasts to a stop. A car engine revs up from idle. A drill bit spins up in a second. In each the angular acceleration is roughly constant, and the questions are the ones you asked about cars in Mechanics I: how fast, how far, how long. Since $\\theta$, $\\omega$, $\\alpha$ are defined exactly like $x$, $v$, $a$, the answers are the same equations with new letters.",
    },
    { type: "heading", text: "Equations for constant angular acceleration" },
    {
      type: "text",
      content:
        "**Derivation (constant $\\alpha$).** Integrate $\\frac{d\\omega}{dt} = \\alpha$ from time 0 (where $\\omega = \\omega_0$):",
    },
    { type: "math", latex: "\\omega = \\omega_0 + \\alpha t" },
    { type: "text", content: "Integrate $\\frac{d\\theta}{dt} = \\omega_0 + \\alpha t$, starting from $\\theta = 0$:" },
    { type: "math", latex: "\\theta = \\omega_0 t + \\tfrac12\\alpha t^2" },
    {
      type: "text",
      content:
        "For a relation without $t$, use the chain rule: $\\alpha = \\frac{d\\omega}{dt} = \\frac{d\\omega}{d\\theta}\\frac{d\\theta}{dt} = \\omega\\frac{d\\omega}{d\\theta}$. Separating, $\\omega\\,d\\omega = \\alpha\\,d\\theta$, and integrating:",
    },
    { type: "math", latex: "\\omega^2 = \\omega_0^2 + 2\\alpha\\theta" },
    {
      type: "table",
      headers: ["Linear (constant $a$)", "Rotational (constant $\\alpha$)"],
      rows: [
        ["$v = u + at$", "$\\omega = \\omega_0 + \\alpha t$"],
        ["$s = ut + \\tfrac12at^2$", "$\\theta = \\omega_0t + \\tfrac12\\alpha t^2$"],
        ["$v^2 = u^2 + 2as$", "$\\omega^2 = \\omega_0^2 + 2\\alpha\\theta$"],
        ["$s = \\tfrac{u + v}{2}\\,t$", "$\\theta = \\tfrac{\\omega_0 + \\omega}{2}\\,t$"],
        ["$s_n = u + a\\left(n - \\tfrac12\\right)$ in the $n$th second", "$\\theta_n = \\omega_0 + \\alpha\\left(n - \\tfrac12\\right)$ in the $n$th second"],
        ["$a = v\\,\\frac{dv}{dx}$", "$\\alpha = \\omega\\,\\frac{d\\omega}{d\\theta}$"],
      ],
    },
    {
      type: "callout",
      variant: "definition",
      title: "Revolutions and radians",
      content:
        "All the equations use **radians**. To count turns, divide by $2\\pi$: $n = \\dfrac{\\theta}{2\\pi}$. Convert speeds with $\\omega\\,(\\text{rad/s}) = \\text{rpm} \\times \\dfrac{2\\pi}{60}$ and $\\omega = 2\\pi f$ with $f$ in revolutions per second.",
    },
    { type: "heading", text: "Angle against time" },
    {
      type: "text",
      content:
        "The playground plots $\\theta(t)$. The reference line is steady rotation at 2 rad/s; the sliders $w$ and $a$ are $\\omega_0$ and $\\alpha$.",
    },
    {
      type: "interactive",
      config: {
        component: "transform-playground",
        baseExpr: "2*x",
        baseLatex: "\\theta = 2t",
        expr: "w*x + 0.5*a*x^2",
        exprLatex: "\\theta = \\omega_0 t + \\tfrac12\\alpha t^2",
        params: [
          { name: "w", min: 0, max: 5, step: 0.5, initial: 2 },
          { name: "a", min: -2, max: 2, step: 0.25, initial: 0.5 },
        ],
        window: { xmin: 0, xmax: 10, ymin: 0, ymax: 40 },
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: with $\\alpha > 0$ the curve bends upwards away from the straight line, because the body turns faster and faster. With $\\alpha < 0$ it bends over, reaches a peak where $\\omega = 0$ (the body stops), and would then come back down (the body would start turning the other way if the same $\\alpha$ kept acting, which a braking wheel does not). The slope at any point is $\\omega$.",
    },
    { type: "heading", text: "Coasting wheels and the $n$th second" },
    {
      type: "worked-example",
      id: "mrg2-2-we1",
      title: "Worked example 1: a wheel coasting to rest, JEE Main",
      problem:
        "A wheel turning at 600 rpm comes uniformly to rest in 10 s. Find $\\alpha$ and the number of revolutions it makes while stopping.",
      steps: [
        { text: "$\\omega_0 = 600 \\times \\dfrac{2\\pi}{60} = 20\\pi$ rad/s and $\\omega = 0$." },
        { text: "$\\alpha = \\dfrac{0 - 20\\pi}{10} = -2\\pi$ rad/s². *Why this step:* the minus sign says it is slowing down; keep it." },
        { text: "$\\theta = \\dfrac{\\omega_0 + \\omega}{2}t = 10\\pi \\times 10 = 100\\pi$ rad." },
        { text: "Revolutions: $\\dfrac{100\\pi}{2\\pi} = 50$. *Why this step:* the equations give radians; the question asks for turns." },
      ],
      answer: "$\\alpha = -2\\pi$ rad/s²; 50 revolutions.",
    },
    {
      type: "worked-example",
      id: "mrg2-2-we2",
      title: "Worked example 2: spinning up",
      problem:
        "A motor starts from rest with $\\alpha = 4$ rad/s². Find $\\omega$ after 5 s and the angle turned in that time.",
      steps: [
        { text: "After 5 s: $\\omega = 4 \\times 5 = 20$ rad/s." },
        { text: "Angle turned: $\\theta = \\frac12 \\times 4 \\times 25 = 50$ rad $\\approx 7.96$ revolutions." },
      ],
      answer: "$\\omega = 20$ rad/s; $\\theta = 50$ rad $\\approx 7.96$ revolutions.",
    },
    {
      type: "worked-example",
      id: "mrg2-2-we3",
      title: "Worked example 3: turns before stopping",
      problem:
        "A flywheel at 30 rad/s is braked at 3 rad/s². How many turns does it make before stopping?",
      steps: [
        { text: "$0 = 30^2 - 2(3)\\theta$, so $\\theta = 150$ rad. *Why this step:* no time is given or asked, so use the equation without $t$." },
        { text: "Turns: $\\dfrac{150}{2\\pi} \\approx 23.9$." },
      ],
      answer: "150 rad, about 23.9 turns.",
    },
    {
      type: "worked-example",
      id: "mrg2-2-we4",
      title: "Worked example 4: the $n$th second",
      problem:
        "A disc starts from rest with $\\alpha = 2$ rad/s². Through what angle does it turn during the 3rd second?",
      steps: [
        { text: "$\\theta_n = \\omega_0 + \\alpha\\left(n - \\frac12\\right) = 0 + 2(2.5) = 5$ rad." },
        { text: "Check: $\\theta(3) - \\theta(2) = \\frac12(2)(9) - \\frac12(2)(4) = 9 - 4 = 5$ rad. ✓" },
      ],
      answer: "5 rad.",
    },
    {
      type: "worked-example",
      id: "mrg2-2-we5",
      title: "Worked example 5: non-constant $\\alpha$, calculus",
      problem:
        "A wheel starts from rest with $\\alpha = 6t$ rad/s². Find $\\omega$ and $\\theta$ at $t = 2$ s.",
      steps: [
        { text: "$\\omega = \\int_0^t 6t\\,dt = 3t^2$ and $\\theta = \\int_0^t 3t^2\\,dt = t^3$." },
        { text: "At $t = 2$ s: $\\omega = 12$ rad/s and $\\theta = 8$ rad. *Why this step:* the constant-$\\alpha$ formulas would give $\\omega = 12 \\times 2 = 24$ rad/s, wrong by a factor of 2; with changing $\\alpha$ you must integrate." },
      ],
      answer: "$\\omega = 12$ rad/s and $\\theta = 8$ rad.",
    },
    {
      type: "worked-example",
      id: "mrg2-2-we6",
      title: "Worked example 6: $\\alpha = \\omega\\,\\frac{d\\omega}{d\\theta}$",
      problem:
        "A disc spinning at $\\omega_0$ is slowed by a drag with $\\alpha = -k\\omega$. How far does it turn before stopping?",
      steps: [
        { text: "$\\omega\\frac{d\\omega}{d\\theta} = -k\\omega \\Rightarrow \\frac{d\\omega}{d\\theta} = -k \\Rightarrow \\omega = \\omega_0 - k\\theta$." },
        { text: "It stops when $\\theta = \\dfrac{\\omega_0}{k}$: a finite angle, even though (you can check) it takes infinitely long to get there." },
      ],
      answer: "$\\theta = \\dfrac{\\omega_0}{k}$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"$\\theta$ from the equations is in revolutions\"",
      content:
        "Every equation here is in radians, because $s = r\\theta$ and $v = r\\omega$ only hold in radians. If you put $\\omega_0$ in rev/s, you must keep everything in revolutions consistently; mixing rpm with rad/s² is the most common slip. The safest habit: convert to rad and rad/s first, divide by $2\\pi$ at the very end.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "mrg2-2-q1",
      variant: "practice",
      question: "A wheel at 1200 rpm is brought uniformly to rest in 20 s. How many revolutions does it make while stopping?",
      answer: 200,
      unit: "revolutions",
      hint: "Convert to revolutions per second. Under uniform braking, what is the average angular speed?",
      solution: "1200 rpm is 20 rev/s. Uniform braking averages $\\frac{20 + 0}{2} = 10$ rev/s, and 10 rev/s for 20 s is 200 revolutions ($400\\pi$ rad).",
      commonMistakes: [
        { answer: 400, feedback: "That uses the initial speed (20 rev/s) for the whole 20 s. The average over uniform braking is half of it." },
        { answer: 1256.6, tolerance: 1, feedback: "$400\\pi \\approx 1257$ is the angle in radians. Divide by $2\\pi$ for revolutions." },
        { answer: 24000, feedback: "That multiplies rpm by seconds. Convert 1200 rpm to 20 rev/s first." },
        { answer: 12000, feedback: "That averages the speed (600 rpm) but then multiplies rpm by seconds. Convert to rev/s first: 10 rev/s for 20 s." },
      ],
    },
    {
      type: "numeric",
      id: "mrg2-2-q2",
      variant: "practice",
      question: "A wheel's angular speed rises uniformly from 10 rad/s to 20 rad/s while it turns through 30 rad. Find $\\alpha$. Give your answer in rad/s².",
      answer: 5,
      unit: "rad/s²",
      hint: "No time is given or asked: use the equation without $t$.",
      solution: "$\\omega^2 = \\omega_0^2 + 2\\alpha\\theta$, so $\\alpha = \\dfrac{\\omega^2 - \\omega_0^2}{2\\theta} = \\dfrac{400 - 100}{60} = 5$ rad/s².",
      commonMistakes: [
        { answer: 0.3333, tolerance: 0.005, feedback: "That is $\\frac{\\Delta\\omega}{\\theta}$, which has the wrong units. Use $\\omega^2 = \\omega_0^2 + 2\\alpha\\theta$." },
        { answer: 10, feedback: "You forgot the factor 2 in $2\\alpha\\theta$." },
        { answer: 3.3333, tolerance: 0.005, feedback: "That is $\\frac{(\\omega - \\omega_0)^2}{\\theta} = \\frac{100}{30}$. Use $\\omega^2 - \\omega_0^2 = 300$ and divide by $2\\theta = 60$." },
      ],
    },
    {
      type: "numeric",
      id: "mrg2-2-q3",
      variant: "practice",
      question: "A disc starts from rest with $\\alpha = 4$ rad/s². Through what angle does it turn during the 4th second? Give your answer in radians.",
      answer: 14,
      unit: "rad",
      hint: "Either use $\\theta_n = \\omega_0 + \\alpha\\left(n - \\frac12\\right)$, or subtract the angle after 3 s from the angle after 4 s.",
      solution: "$\\theta_4 = 0 + 4\\left(4 - \\tfrac12\\right) = 14$ rad. Check: $\\theta(4) - \\theta(3) = \\tfrac12(4)(16) - \\tfrac12(4)(9) = 32 - 18 = 14$ rad.",
      commonMistakes: [
        { answer: 32, feedback: "That is the total angle in the first 4 seconds." },
        { answer: 16, feedback: "That is $\\alpha \\times 4$. The formula is $\\alpha\\left(n - \\frac12\\right)$." },
        { answer: 18, feedback: "That is the total angle in the first 3 seconds." },
      ],
    },
    {
      type: "quiz",
      id: "mrg2-2-q4",
      variant: "concept",
      question: "You use $\\omega_0 = 300$ rpm and $\\alpha = 2$ rad/s² in $\\omega = \\omega_0 + \\alpha t$. What is wrong?",
      options: [
        { text: "Nothing: rpm and rad/s differ only by a label.", feedback: "They differ by a factor of $\\frac{2\\pi}{60} \\approx 0.105$." },
        { text: "The units are mixed: convert 300 rpm to $10\\pi$ rad/s first.", correct: true, feedback: "Every term must be in the same units, and radians are the natural choice." },
        { text: "The equation only works for linear motion.", feedback: "It works perfectly for constant $\\alpha$, provided the units agree." },
      ],
      hint: "The rotational equations need consistent units. What unit does $\\alpha$ carry, and what unit is $\\omega_0$ in? Recall $1$ rev $= 2\\pi$ rad.",
    },
    {
      type: "quiz",
      id: "mrg2-2-q5",
      variant: "practice",
      question: "A body rotates with $\\omega = 3t^2 - 2t$ rad/s. What is its angular acceleration at $t = 2$ s?",
      options: [
        { text: "8 rad/s²", feedback: "That is $\\omega(2) = 12 - 4$. Differentiate to get $\\alpha$." },
        { text: "4 rad/s²", feedback: "That is $\\frac{\\omega(2)}{2}$, an average from rest, not the instantaneous value." },
        { text: "10 rad/s²", correct: true, feedback: "$\\alpha = \\frac{d\\omega}{dt} = 6t - 2 = 10$ rad/s² at $t = 2$." },
        { text: "6 rad/s²", feedback: "Differentiate both terms: $\\frac{d}{dt}(3t^2 - 2t) = 6t - 2$." },
      ],
      hint: "Angular acceleration is $\\alpha = \\dfrac{d\\omega}{dt}$. Differentiate, then substitute $t = 2$ s.",
    },
    {
      type: "quiz",
      id: "mrg2-2-q6",
      variant: "practice",
      multiple: true,
      question: "A flywheel spinning at 30 rad/s is braked with a constant angular deceleration of 3 rad/s² until it stops. Select all the statements that are correct.",
      options: [
        { text: "It stops after 10 s.", correct: true, feedback: "$0 = 30 - 3t$ gives $t = 10$ s." },
        { text: "It turns through 150 rad while stopping.", correct: true, feedback: "$\\theta = \\frac{\\omega_0^2}{2\\alpha} = \\frac{900}{6} = 150$ rad." },
        { text: "It turns through 75 rad in the first 5 s, half the total.", feedback: "Half the time is not half the angle: it is faster early on. $\\theta(5) = 30(5) - \\frac12(3)(25) = 112.5$ rad." },
        { text: "It turns through 37.5 rad in the last 5 s.", correct: true, feedback: "$150 - 112.5 = 37.5$ rad: a quarter of the total, as for any uniform stop run backwards from rest." },
        { text: "Its angular speed has halved, to 15 rad/s, once it has turned 75 rad.", feedback: "$\\omega^2 = 900 - 2(3)(75) = 450$, so $\\omega \\approx 21.2$ rad/s. Speed halves at half the *time*, not half the angle." },
      ],
      hint: "Use the constant-$\\alpha$ equations: $\\omega = \\omega_0 - \\alpha t$ for the stopping time, $\\omega^2 = \\omega_0^2 - 2\\alpha\\theta$ for angles. The wheel turns more in the first half of the time than the second, since it is slowing down.",
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "moment-of-inertia",
  title: "2.3 · Moment of Inertia",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "Hold a metre rule at its centre and twist it back and forth: easy. Now tape a heavy stone to each end and try again: much harder, even though you are twisting about the same axis. Slide the stones in close to your hand and it becomes easy once more. For rotation, what matters is not just how much mass there is, but **how far it is from the axis**. This lesson finds the exact measure.",
    },
    { type: "heading", text: "Moment of inertia from kinetic energy" },
    {
      type: "text",
      content:
        "**Derivation from kinetic energy.** A rigid body rotates about a fixed axis with angular speed $\\omega$. Particle $i$, of mass $m_i$ at distance $r_i$ from the axis, moves at $v_i = r_i\\omega$. Add up the kinetic energies:",
    },
    {
      type: "math",
      latex: "K = \\sum \\tfrac12 m_i v_i^2 = \\sum \\tfrac12 m_i r_i^2\\omega^2 = \\tfrac12\\Big(\\sum m_i r_i^2\\Big)\\omega^2",
    },
    {
      type: "text",
      content:
        "Compare with $K = \\frac12Mv^2$ for translation. The bracket plays the role of mass: it is the body's resistance to being set spinning.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Moment of inertia",
      content:
        "The **moment of inertia** about a given axis is $I = \\sum m_i r_i^2$, where $r_i$ is the **perpendicular distance** of particle $i$ from the axis. Then $K_{\\text{rot}} = \\frac12I\\omega^2$. Units: kg m².\nThe **radius of gyration** $k$ is defined by $I = Mk^2$: the distance at which the whole mass, concentrated in a thin ring, would have the same $I$.",
    },
    { type: "heading", text: "Mass, spread and choice of axis" },
    {
      type: "text",
      content:
        "Three things set $I$: the total mass, how it is spread out, and **which axis** you choose. Because distances are squared, mass far from the axis counts heavily: doubling its distance quadruples its contribution.",
    },
    {
      type: "text",
      content:
        "The playground takes two point masses $m_1$ and $m_2$ at the ends of a light 4 m rod and plots $I$ about a perpendicular axis at position $x$ along the rod: $I(x) = m_1x^2 + m_2(4 - x)^2$. The reference curve has equal 1 kg masses.",
    },
    {
      type: "interactive",
      config: {
        component: "transform-playground",
        baseExpr: "x^2 + (4-x)^2",
        baseLatex: "m_1 = m_2 = 1",
        expr: "m1*x^2 + m2*(4-x)^2",
        exprLatex: "I = m_1x^2 + m_2(L-x)^2",
        params: [
          { name: "m1", min: 1, max: 5, step: 1, initial: 1 },
          { name: "m2", min: 1, max: 5, step: 1, initial: 3 },
        ],
        window: { xmin: 0, xmax: 4, ymin: 0, ymax: 50 },
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: $I$ changes a lot with the axis, from 48 kg m² at the 1 kg end to 16 kg m² at the 3 kg end. The curve has a single minimum, at $x = 3$ m, where $I = 1(9) + 3(1) = 12$ kg m². That is exactly the centre of mass ($\\frac{3 \\times 4}{4} = 3$ m from $m_1$). Setting $\\frac{dI}{dx} = 2m_1x - 2m_2(4 - x) = 0$ gives $x = \\frac{m_2 L}{m_1 + m_2}$, the COM formula of 0.1. Lesson 2.5 will show this is no accident.",
    },
    { type: "heading", text: "Dumbbells, squares and triangles" },
    {
      type: "worked-example",
      id: "mrg2-3-we1",
      title: "Worked example 1: a dumbbell about different axes",
      problem:
        "Masses of 1 kg and 3 kg sit at the ends of a light 4 m rod. Find $I$ about perpendicular axes through (a) the 1 kg mass, (b) the midpoint, (c) the COM.",
      steps: [
        { text: "(a) Only the 3 kg mass is off the axis: $I = 3 \\times 4^2 = 48$ kg m²." },
        { text: "(b) Both are 2 m away: $I = (1 + 3) \\times 2^2 = 16$ kg m²." },
        { text: "(c) The COM is 3 m from the 1 kg mass: $I = 1 \\times 3^2 + 3 \\times 1^2 = 12$ kg m², the smallest of all. *Why this step:* the same body gives three different answers; an $I$ without an axis is meaningless." },
      ],
      answer: "(a) 48 kg m², (b) 16 kg m², (c) 12 kg m².",
    },
    {
      type: "worked-example",
      id: "mrg2-3-we2",
      title: "Worked example 2: four masses on a square",
      problem:
        "Four 2 kg masses sit at the corners of a light square frame of side 1 m. Find $I$ about (a) one side, (b) a diagonal, (c) the axis through the centre perpendicular to the square, (d) the axis through one corner perpendicular to the square.",
      steps: [
        { text: "(a) Two masses lie on the axis; the other two are 1 m away: $I = 2(2)(1^2) = 4$ kg m²." },
        { text: "(b) Two masses lie on the diagonal; the other two are half a diagonal, $\\frac{\\sqrt2}{2}$ m, away: $I = 2(2)\\left(\\frac12\\right) = 2$ kg m². *Why this step:* $r$ is the perpendicular distance from the axis, not the distance from the centre along the frame." },
        { text: "(c) All four are $\\frac{\\sqrt2}{2}$ m from the centre: $I = 4(2)\\left(\\frac12\\right) = 4$ kg m²." },
        { text: "(d) Distances from one corner: $0$, $1$, $1$, $\\sqrt2$ m. $I = 2(0 + 1 + 1 + 2) = 8$ kg m²." },
      ],
      answer: "(a) 4, (b) 2, (c) 4, (d) 8 kg m².",
    },
    {
      type: "worked-example",
      id: "mrg2-3-we3",
      title: "Worked example 3: rotational kinetic energy",
      problem:
        "The square of Worked example 2 spins at 5 rad/s about the perpendicular axis through its centre. Find its rotational kinetic energy.",
      steps: [
        { text: "$K = \\frac12I\\omega^2 = \\frac12 \\times 4 \\times 25 = 50$ J." },
        { text: "Check particle by particle: each mass moves at $\\frac{\\sqrt2}{2} \\times 5 \\approx 3.54$ m/s, with $\\frac12(2)(12.5) = 12.5$ J; four of them give 50 J. ✓" },
      ],
      answer: "$K = 50$ J.",
    },
    {
      type: "worked-example",
      id: "mrg2-3-we4",
      title: "Worked example 4: radius of gyration",
      problem:
        "Find $k$ for the dumbbell of Worked example 1 about its COM.",
      steps: [
        { text: "$I = Mk^2 \\Rightarrow k = \\sqrt{\\dfrac{12}{4}} = \\sqrt3 \\approx 1.73$ m." },
      ],
      answer: "$k = \\sqrt3 \\approx 1.73$ m.",
    },
    {
      type: "worked-example",
      id: "mrg2-3-we5",
      title: "Worked example 5: three masses on a triangle, JEE Main",
      problem:
        "Three particles of mass $m$ sit at the vertices of an equilateral triangle of side $a$. Find $I$ about the axis through the centroid perpendicular to the plane, and about one side.",
      steps: [
        { text: "About the axis through the centroid perpendicular to the plane: each is $\\frac{a}{\\sqrt3}$ from the centroid, so $I = 3m\\frac{a^2}{3} = ma^2$." },
        { text: "About one side: two particles are on the axis; the third is the height $\\frac{\\sqrt3 a}{2}$ away. $I = m\\cdot\\frac{3a^2}{4} = \\frac34ma^2$." },
      ],
      answer: "$ma^2$ about the centroidal axis; $\\frac34ma^2$ about a side.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"moment of inertia is a fixed property of a body, like mass\"",
      content:
        "Mass is the same whichever way you push. Moment of inertia depends on the **axis**: the dumbbell above has 12, 16 or 48 kg m² depending on where it is pivoted. Every value of $I$ must come with its axis, and \"the $I$ of a rod\" is incomplete until you say \"about its centre\" or \"about its end\".",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "mrg2-3-q1",
      variant: "practice",
      question: "A 2 kg mass at 0.5 m and a 3 kg mass at 1 m are fixed to a light rod that rotates about a perpendicular axis at its end ($r = 0$). Find $I$. Give your answer in kg m².",
      answer: 3.5,
      tolerance: 0.01,
      unit: "kg m²",
      hint: "$I = \\sum m_i r_i^2$, with each $r$ measured from the axis.",
      solution: "$I = 2(0.5)^2 + 3(1)^2 = 0.5 + 3 = 3.5$ kg m².",
      commonMistakes: [
        { answer: 4, feedback: "That uses $r$ instead of $r^2$: $2(0.5) + 3(1)$." },
        { answer: 5, feedback: "That is the total mass, not the moment of inertia." },
        { answer: 1.75, feedback: "That is half the correct value, as if you had used $\\frac12 mr^2$ for point masses." },
      ],
    },
    {
      type: "quiz",
      id: "mrg2-3-q2",
      variant: "concept",
      question: "Two identical rods are set spinning at the same $\\omega$, one about its centre and one about its end. Which has more rotational kinetic energy?",
      options: [
        { text: "The one about its end: more of its mass is far from the axis, so its $I$ is larger.", correct: true, feedback: "$K = \\frac12I\\omega^2$ and $I$ depends on the axis." },
        { text: "Neither: identical rods have identical $I$.", feedback: "Identical bodies have different $I$ about different axes." },
        { text: "The one about its centre, because it is balanced.", feedback: "Being balanced does not increase $I$. About the centre, no particle is more than $\\frac L2$ from the axis." },
      ],
      hint: "Rotational KE is $\\tfrac12 I\\omega^2$, so at the same $\\omega$ compare the moments of inertia. Where is the mass relative to each axis?",
    },
    {
      type: "quiz",
      id: "mrg2-3-q3",
      variant: "practice",
      question: "Four particles of mass $m$ sit at the corners of a square of side $a$. What is $I$ about a diagonal?",
      options: [
        { text: "$2ma^2$", feedback: "That is about a side, or about the perpendicular axis through the centre." },
        { text: "$ma^2$", correct: true, feedback: "Two particles are on the axis; the other two are $\\frac{a}{\\sqrt2}$ away: $2m\\frac{a^2}{2} = ma^2$." },
        { text: "$4ma^2$", feedback: "That is about the perpendicular axis through a corner." },
        { text: "$2\\sqrt2\\,ma^2$", feedback: "Distances are squared: $\\left(\\frac{a}{\\sqrt2}\\right)^2 = \\frac{a^2}{2}$." },
      ],
      hint: "Sum $m r^2$, where $r$ is each particle's perpendicular distance from the diagonal. Two corners lie on the diagonal itself.",
    },
    {
      type: "numeric",
      id: "mrg2-3-q4",
      variant: "practice",
      question: "A 2 kg body has $I = 8$ kg m² about some axis. What is its radius of gyration about that axis? Give your answer in metres.",
      answer: 2,
      tolerance: 0.01,
      unit: "m",
      hint: "The radius of gyration is defined by $I = Mk^2$.",
      solution: "$k = \\sqrt{\\dfrac IM} = \\sqrt{\\dfrac82} = \\sqrt4 = 2$ m.",
      commonMistakes: [
        { answer: 4, feedback: "That is $k^2 = \\frac IM$. Take the square root." },
        { answer: 16, feedback: "That is $IM$. The definition is $I = Mk^2$." },
        { answer: 1.414, tolerance: 0.01, feedback: "That is $\\sqrt{I/(2M)}$, as if $I = 2Mk^2$. The definition is $I = Mk^2$, so $k = \\sqrt{8/2}$." },
      ],
    },
    {
      type: "quiz",
      id: "mrg2-3-q5",
      variant: "concept",
      question: "Masses of 1 kg and 4 kg are at the ends of a light 5 m rod. About which perpendicular axis along the rod is $I$ smallest?",
      options: [
        { text: "Through the centre of mass, 4 m from the 1 kg mass.", correct: true, feedback: "$\\frac{dI}{dx} = 0$ gives $x = \\frac{m_2L}{m_1 + m_2} = 4$ m, where $I = 16 + 4 = 20$ kg m²." },
        { text: "Through the midpoint of the rod.", feedback: "At the midpoint $I = 5(2.5)^2 = 31.25$ kg m², larger than at the COM." },
        { text: "Through the 4 kg mass.", feedback: "There $I = 1 \\times 25 = 25$ kg m², still more than at the COM (20 kg m²)." },
      ],
      hint: "Write $I$ about an axis a distance $x$ from the 1 kg mass, $I = x^2 + 4(5 - x)^2$, and find the $x$ that makes it smallest.",
    },
    {
      type: "numeric",
      id: "mrg2-3-q6",
      variant: "practice",
      question: "A flywheel has $I = 0.5$ kg m² and spins at 20 rad/s. What is its kinetic energy? Give your answer in joules.",
      answer: 100,
      unit: "J",
      hint: "$K_{\\text{rot}} = \\frac12 I\\omega^2$.",
      solution: "$K = \\tfrac12 I\\omega^2 = \\tfrac12 \\times 0.5 \\times 20^2 = 100$ J.",
      commonMistakes: [
        { answer: 5, feedback: "That uses $\\omega$ instead of $\\omega^2$." },
        { answer: 200, feedback: "You forgot the $\\frac12$." },
        { answer: 10, feedback: "That is $I\\omega$, which is angular momentum (Chapter 4), not energy." },
      ],
    },
    {
      type: "quiz",
      id: "mrg2-3-q7",
      variant: "practice",
      multiple: true,
      question: "Point masses of 1 kg and 2 kg are fixed at the ends of a light rod 3 m long. All axes below are perpendicular to the rod. Select all the statements that are correct.",
      options: [
        { text: "About the axis through the centre of mass, $I = 6$ kg m².", correct: true, feedback: "The COM is $\\frac{2 \\times 3}{3} = 2$ m from the 1 kg mass: $I = 1(2)^2 + 2(1)^2 = 6$ kg m²." },
        { text: "About the axis through the 2 kg mass, $I = 9$ kg m².", correct: true, feedback: "Only the 1 kg mass is off the axis, 3 m away: $1 \\times 9 = 9$ kg m²." },
        { text: "About the axis through the 1 kg mass, $I = 9$ kg m².", feedback: "Now the 2 kg mass is 3 m away: $I = 2 \\times 9 = 18$ kg m². Same distance, different mass." },
        { text: "About the midpoint of the rod, $I$ is smaller than about the COM.", feedback: "At the midpoint $I = 3(1.5)^2 = 6.75$ kg m², more than 6. The COM axis gives the least $I$." },
        { text: "The radius of gyration about the COM axis is $\\sqrt2$ m.", correct: true, feedback: "$k = \\sqrt{I/M} = \\sqrt{6/3} = \\sqrt2$ m." },
      ],
      hint: "Locate the COM first, then compute $\\sum m r^2$ about each axis. The radius of gyration satisfies $I = Mk^2$ with $M$ the total mass.",
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "moment-of-inertia-of-standard-bodies",
  title: "2.4 · Moments of Inertia of Standard Bodies",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "A ring and a disc of the same mass and radius look alike from the side. Roll them down a slope, though, and the disc wins every time (Chapter 4 explains why). The difference is in where their mass sits: all of the ring's mass is at the rim, while the disc's is spread down to the centre. To make that precise we need $I$ for continuous bodies, and, as with the centre of mass, the sum becomes an integral.",
    },
    {
      type: "math",
      latex: "I = \\sum m_i r_i^2 \\;\\longrightarrow\\; I = \\int r^2\\,dm, \\qquad r = \\text{perpendicular distance of } dm \\text{ from the axis}",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Strategy: slice so that the distance is known",
      content:
        "Choose elements whose every point is at the same distance from the axis (thin strips parallel to the axis, thin rings round it), or elements whose own $I$ you already know (discs stacked along the axis). Then the integral is one-dimensional.",
    },
    { type: "heading", text: "Deriving $I$ for standard shapes" },
    {
      type: "text",
      content:
        "**Thin rod, about its centre (perpendicular axis).** Put the rod along $x$ from $-\\frac L2$ to $\\frac L2$, with $dm = \\frac ML\\,dx$:",
    },
    {
      type: "math",
      latex: "I = \\int_{-L/2}^{L/2} x^2\\,\\frac ML\\,dx = \\frac ML\\cdot\\frac{2}{3}\\left(\\frac L2\\right)^3 = \\frac{ML^2}{12}",
    },
    {
      type: "text",
      content:
        "**About its end:** the same integral from $0$ to $L$ gives $\\frac ML\\cdot\\frac{L^3}{3} = \\frac{ML^2}{3}$, four times bigger, because much more of the rod is far from the axis.\n\n**Ring (about its central axis).** Every bit of mass is at distance $R$: $I = \\int R^2\\,dm = MR^2$. A thin **hollow cylinder** is a stack of rings, so it too has $MR^2$ about its axis.\n\n**Disc (about its central axis).** Slice into thin rings of radius $r$ and width $dr$, each of mass $dm = \\sigma\\,2\\pi r\\,dr$ with $\\sigma = \\frac{M}{\\pi R^2}$:",
    },
    {
      type: "math",
      latex: "I = \\int_0^R r^2\\,\\sigma\\,2\\pi r\\,dr = 2\\pi\\sigma\\frac{R^4}{4} = \\frac{M}{\\pi R^2}\\cdot\\frac{\\pi R^4}{2} = \\frac{MR^2}{2}",
    },
    {
      type: "text",
      content:
        "A **solid cylinder** is a stack of discs, so it has $\\frac12MR^2$ about its axis. A **rectangular plate** of sides $a$ and $b$, about an axis through its centre parallel to side $b$, is a row of strips parallel to the axis, which is exactly the rod integral in the $a$ direction: $I = \\frac{Ma^2}{12}$.\n\n**Solid sphere.** Stack discs perpendicular to the axis. The disc at height $z$ has radius$^2 = R^2 - z^2$, mass $dm = \\rho\\pi(R^2 - z^2)\\,dz$ and (from the disc result) moment $\\frac12\\,dm\\,(R^2 - z^2)$:",
    },
    {
      type: "math",
      latex: "I = \\frac{\\rho\\pi}{2}\\int_{-R}^{R}(R^2 - z^2)^2\\,dz = \\frac{\\rho\\pi}{2}\\cdot\\frac{16R^5}{15} = \\frac{8\\pi\\rho R^5}{15} = \\frac25MR^2 \\quad\\left(M = \\tfrac43\\pi R^3\\rho\\right)",
    },
    {
      type: "text",
      content:
        "**Hollow sphere (thin shell).** Slice into rings by angle $\\theta$ from the axis: the ring has radius $R\\sin\\theta$, width $R\\,d\\theta$, mass $dm = \\sigma\\,2\\pi R\\sin\\theta\\cdot R\\,d\\theta$:",
    },
    {
      type: "math",
      latex: "I = \\int_0^\\pi (R\\sin\\theta)^2\\,\\sigma\\,2\\pi R^2\\sin\\theta\\,d\\theta = 2\\pi\\sigma R^4\\int_0^\\pi\\sin^3\\theta\\,d\\theta = 2\\pi\\sigma R^4\\cdot\\frac43 = \\frac23MR^2 \\quad\\left(M = 4\\pi R^2\\sigma\\right)",
    },
    { type: "heading", text: "Standard results at a glance" },
    {
      type: "table",
      headers: ["Body (mass $M$)", "Axis", "$I$", "$k^2/R^2$ (or $k^2/L^2$)"],
      rows: [
        ["thin rod, length $L$", "through centre, $\\perp$ rod", "$\\frac{1}{12}ML^2$", "$\\frac{1}{12}$"],
        ["thin rod, length $L$", "through one end, $\\perp$ rod", "$\\frac13ML^2$", "$\\frac13$"],
        ["ring or hollow cylinder", "central axis", "$MR^2$", "$1$"],
        ["disc or solid cylinder", "central axis", "$\\frac12MR^2$", "$\\frac12$"],
        ["hollow sphere (shell)", "any diameter", "$\\frac23MR^2$", "$\\frac23$"],
        ["solid sphere", "any diameter", "$\\frac25MR^2$", "$\\frac25$"],
        ["rectangular plate $a \\times b$", "through centre, parallel to side $b$", "$\\frac{1}{12}Ma^2$", "–"],
      ],
    },
    {
      type: "text",
      content:
        "The ratios $\\frac{k^2}{R^2} = 1, \\frac23, \\frac12, \\frac25$ for ring, hollow sphere, disc and solid sphere are worth knowing by heart: in Chapter 4 they decide who wins every rolling race. The order makes sense: the more mass near the rim, the larger the number.",
    },
    {
      type: "worked-example",
      id: "mrg2-4-we1",
      title: "Worked example 1: a rod",
      problem:
        "A 0.5 kg metre-stick-like rod is 1.2 m long. Find its $I$ about a perpendicular axis through its centre and through one end.",
      steps: [
        { text: "About its centre: $\\frac{1}{12}(0.5)(1.44) = 0.06$ kg m²." },
        { text: "About one end: $\\frac13(0.5)(1.44) = 0.24$ kg m², four times as much." },
      ],
      answer: "0.06 kg m² about the centre, 0.24 kg m² about an end.",
    },
    {
      type: "worked-example",
      id: "mrg2-4-we2",
      title: "Worked example 2: a disc and a ring",
      problem:
        "A 2 kg disc and a 2 kg ring each have radius 0.1 m. Find the moment of inertia of each about its central axis.",
      steps: [
        { text: "Disc: $\\frac12(2)(0.01) = 0.01$ kg m². Ring: $2(0.01) = 0.02$ kg m²." },
        { text: "The ring has twice the disc's $I$: all of its mass is at the maximum distance. *Why this step:* same $M$, same $R$, different distribution; this is the comparison behind every rolling-race question." },
      ],
      answer: "Disc 0.01 kg m², ring 0.02 kg m².",
    },
    {
      type: "worked-example",
      id: "mrg2-4-we3",
      title: "Worked example 3: a solid sphere",
      problem:
        "A 5 kg bowling ball of radius 0.2 m, about a diameter. Find its moment of inertia and radius of gyration.",
      steps: [
        { text: "$I = \\frac25(5)(0.04) = 0.08$ kg m²." },
        { text: "Radius of gyration: $k = \\sqrt{\\frac25}\\,R \\approx 0.632 \\times 0.2 \\approx 0.126$ m." },
      ],
      answer: "$I = 0.08$ kg m² and $k \\approx 0.126$ m.",
    },
    {
      type: "worked-example",
      id: "mrg2-4-we4",
      title: "Worked example 4: a non-uniform rod, JEE Main",
      problem:
        "A rod of length $L$ has linear density $\\lambda = kx$, with $x$ measured from one end. Find $I$ about a perpendicular axis through that end, in terms of the rod's mass $M$.",
      steps: [
        { text: "Mass: $M = \\int_0^L kx\\,dx = \\frac{kL^2}{2}$. *Why this step:* the answer must be in terms of $M$, so find $M$ in terms of $k$ first." },
        { text: "$I = \\int_0^L x^2\\,kx\\,dx = \\frac{kL^4}{4}$." },
        { text: "Eliminate $k = \\frac{2M}{L^2}$: $I = \\frac{2M}{L^2}\\cdot\\frac{L^4}{4} = \\frac{ML^2}{2}$." },
        { text: "Check: larger than a uniform rod's $\\frac{ML^2}{3}$, as it should be, since the mass is concentrated at the far end." },
      ],
      answer: "$I = \\dfrac{ML^2}{2}$.",
    },
    {
      type: "worked-example",
      id: "mrg2-4-we5",
      title: "Worked example 5: a hollow sphere",
      problem:
        "A thin spherical shell of mass 3 kg and radius 0.2 m. Find its moment of inertia about a diameter.",
      steps: [
        { text: "$I = \\frac23(3)(0.04) = 0.08$ kg m², exactly the same as the 5 kg solid ball above: less mass, but all of it further out." },
      ],
      answer: "$I = 0.08$ kg m².",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a long cylinder has a bigger $I$ about its axis than a flat disc of the same mass and radius\"",
      content:
        "About the central axis, every slice of a cylinder is a disc of the same radius, and moving mass **along** the axis does not change its distance **from** the axis. A 1 m long solid cylinder and a 1 cm thin disc with the same $M$ and $R$ both have $\\frac12MR^2$. Length only matters for axes perpendicular to the cylinder's own axis.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "mrg2-4-q1",
      variant: "practice",
      question: "A uniform 2 kg rod is 3 m long. What is its moment of inertia about a perpendicular axis through its centre? Give your answer in kg m².",
      answer: 1.5,
      tolerance: 0.01,
      unit: "kg m²",
      hint: "Thin rod about its centre: $\\frac{1}{12}ML^2$.",
      solution: "$I = \\tfrac{1}{12}ML^2 = \\tfrac{1}{12}(2)(3^2) = 1.5$ kg m².",
      commonMistakes: [
        { answer: 6, feedback: "That is $\\frac13ML^2$, about an end." },
        { answer: 18, feedback: "That is $ML^2$, as if all the mass were at distance $L$." },
        { answer: 4.5, feedback: "That is $\\frac14ML^2$, as if all the mass were at the ends of a half-length arm. Integrate: $\\frac{1}{12}ML^2$." },
      ],
    },
    {
      type: "quiz",
      id: "mrg2-4-q2",
      variant: "concept",
      question: "A thin disc and a long solid cylinder have the same mass and radius. How do their moments of inertia about their central axes compare?",
      options: [
        { text: "The cylinder's is larger because it is longer.", feedback: "Extra length is along the axis, which adds nothing to $r$." },
        { text: "They are equal, $\\frac12MR^2$ each.", correct: true, feedback: "Length along the axis does not change any particle's distance from the axis." },
        { text: "The disc's is larger because its mass is more concentrated.", feedback: "Both have the same distribution of distance from the axis, so they have the same $I$." },
      ],
      hint: "Slice each body into thin discs stacked along the axis. Does a slice's distance from the axis depend on how long the cylinder is?",
    },
    {
      type: "quiz",
      id: "mrg2-4-q3",
      variant: "concept",
      question: "A ring, a disc, a solid sphere and a hollow sphere all have the same mass and radius. Rank their moments of inertia about a central axis (diameter for the spheres), largest first.",
      options: [
        { text: "solid sphere > disc > hollow sphere > ring", feedback: "That is reversed. The more mass near the rim, the larger $I$; the ring has all of it there." },
        { text: "ring > disc > hollow sphere > solid sphere", feedback: "The hollow sphere ($\\frac23$) beats the disc ($\\frac12$)." },
        { text: "They are all equal.", feedback: "Same $M$ and $R$, but different distributions of distance from the axis." },
        { text: "ring > hollow sphere > disc > solid sphere", correct: true, feedback: "$1 > \\frac23 > \\frac12 > \\frac25$ in units of $MR^2$." },
      ],
      hint: "Write each standard result as $kMR^2$ and compare the $k$ values. The more of the mass sits at distance $R$, the larger $k$.",
    },
    {
      type: "numeric",
      id: "mrg2-4-q4",
      variant: "practice",
      question: "What is the moment of inertia of a 10 kg solid sphere of radius 0.5 m about a diameter? Give your answer in kg m².",
      answer: 1,
      tolerance: 0.01,
      unit: "kg m²",
      hint: "Solid sphere about a diameter: $\\frac25MR^2$.",
      solution: "$I = \\tfrac25MR^2 = \\tfrac25(10)(0.5^2) = \\tfrac25 \\times 2.5 = 1$ kg m².",
      commonMistakes: [
        { answer: 1.25, feedback: "That is $\\frac12MR^2$, a disc's value." },
        { answer: 1.667, tolerance: 0.01, feedback: "That is $\\frac23MR^2$, the hollow sphere." },
        { answer: 2, feedback: "Square the radius: $0.5^2 = 0.25$, not 0.5." },
      ],
    },
    {
      type: "quiz",
      id: "mrg2-4-q5",
      variant: "practice",
      question: "A rod of mass $M$ and length $L$ has density $\\lambda \\propto x$ (measured from end A). What is its moment of inertia about a perpendicular axis through A?",
      options: [
        { text: "$\\dfrac{ML^2}{3}$", feedback: "That is a uniform rod. Here the mass is concentrated at the far end, which increases $I$." },
        { text: "$\\dfrac{ML^2}{2}$", correct: true, feedback: "$M = \\frac{kL^2}{2}$ and $I = \\frac{kL^4}{4} = \\frac{ML^2}{2}$." },
        { text: "$\\dfrac{ML^2}{4}$", feedback: "$\\frac{kL^4}{4}$ is right, but $k = \\frac{2M}{L^2}$, not $\\frac{M}{L^2}$." },
        { text: "$\\dfrac{ML^2}{6}$", feedback: "That would be the answer about the *heavy* end B, where most of the mass is close to the axis. About A it is $\\frac{ML^2}{2}$." },
      ],
      hint: "Write $\\lambda = cx$, fix $c$ from $\\int_0^L \\lambda\\,dx = M$, then compute $I = \\int_0^L x^2\\lambda\\,dx$.",
    },
    {
      type: "numeric",
      id: "mrg2-4-q6",
      variant: "practice",
      question: "A thin spherical shell has mass 3 kg and radius 0.2 m. What is its moment of inertia about a diameter? Give your answer in kg m².",
      answer: 0.08,
      tolerance: 0.001,
      unit: "kg m²",
      hint: "Thin spherical shell about a diameter: $\\frac23MR^2$.",
      solution: "$I = \\tfrac23MR^2 = \\tfrac23(3)(0.04) = 0.08$ kg m².",
      commonMistakes: [
        { answer: 0.048, feedback: "That is $\\frac25MR^2$, a *solid* sphere." },
        { answer: 0.12, feedback: "That is $MR^2$, a ring. A shell's mass is not all at distance $R$ from a diameter." },
        { answer: 0.06, feedback: "That is $\\frac12MR^2$. The shell's value is $\\frac23MR^2$." },
      ],
    },
    {
      type: "quiz",
      id: "mrg2-4-q7",
      variant: "practice",
      multiple: true,
      question: "Each body below has mass $M$ and radius $R$. For which of them is the moment of inertia about the stated axis $\\frac12MR^2$? Select all that apply.",
      options: [
        { text: "A thin uniform disc, about its central axis", correct: true, feedback: "Rings of radius 0 to $R$ integrate to $\\frac12MR^2$." },
        { text: "A long uniform solid cylinder, about its own axis", correct: true, feedback: "It is a stack of discs; length along the axis changes no particle's distance from it." },
        { text: "A thin-walled hollow cylinder, about its own axis", feedback: "It is a stack of rings: all of its mass is at $R$, so $I = MR^2$." },
        { text: "A uniform solid sphere, about a diameter", feedback: "That is $\\frac25MR^2$: much of the sphere's mass lies close to the axis." },
        { text: "A thin spherical shell, about a diameter", feedback: "That is $\\frac23MR^2$." },
      ],
      hint: "Recall the standard results table. For each body, ask whether slicing it along the stated axis gives a stack of discs of radius $R$.",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "parallel-and-perpendicular-axis-theorems",
  title: "2.5 · Parallel and Perpendicular Axis Theorems",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "A door turns about its hinges, not its middle. A disc may be pivoted at its rim. A ring might spin about a diameter. We could integrate from scratch for every new axis, but two theorems let us move from the few results of 2.4 to almost any axis in one line.",
    },
    { type: "heading", text: "Parallel axis theorem" },
    {
      type: "text",
      content:
        "Let an axis pass through the COM, and a parallel axis be a distance $d$ away. Measure positions in the plane perpendicular to the axes: particle $i$ is at $\\vec r_i$ from the COM axis, so it is at $\\vec r_i - \\vec d$ from the other axis (where $\\vec d$ points from the COM axis to the new one). Then",
    },
    {
      type: "math",
      latex: "I = \\sum m_i|\\vec r_i - \\vec d|^2 = \\sum m_ir_i^2 - 2\\vec d\\cdot\\Big(\\sum m_i\\vec r_i\\Big) + \\Big(\\sum m_i\\Big)d^2",
    },
    {
      type: "text",
      content:
        "The first sum is $I_{cm}$. The middle sum is $M$ times the position of the COM measured from the COM, which is zero. So the cross term vanishes:",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Parallel axis theorem",
      content:
        "$I = I_{cm} + Md^2$, where $I_{cm}$ is about an axis through the **centre of mass** and $d$ is the distance between the two parallel axes. Any body, any shape.\nConsequence: of all parallel axes, the one through the COM has the smallest $I$ (as the playground in 2.3 showed).",
    },
    { type: "heading", text: "Perpendicular axis theorem" },
    {
      type: "text",
      content:
        "For a **flat** body (a lamina) in the $xy$-plane, every particle has $z = 0$, so its squared distance from the $z$-axis is $x^2 + y^2$, while from the $x$-axis it is $y^2$ and from the $y$-axis it is $x^2$:",
    },
    { type: "math", latex: "I_z = \\sum m(x^2 + y^2) = \\sum my^2 + \\sum mx^2 = I_x + I_y" },
    {
      type: "callout",
      variant: "definition",
      title: "Perpendicular axis theorem",
      content:
        "For a lamina, $I_z = I_x + I_y$, where the $x$- and $y$-axes lie **in the plane** of the lamina and the $z$-axis is perpendicular to it, all three meeting at one point. It fails for bodies with thickness (spheres, cubes, cylinders), because then $z \\ne 0$.",
    },
    {
      type: "text",
      content:
        "The playground plots $\\frac IM = k_{cm}^2 + d^2$ against $d$ (in metres). The slider $k$ is $k_{cm}^2$ in m²; the reference curve is $d^2$ alone, a point mass.",
    },
    {
      type: "interactive",
      config: {
        component: "transform-playground",
        baseExpr: "x^2",
        baseLatex: "d^2",
        expr: "k + x^2",
        exprLatex: "\\frac{I}{M} = k_{cm}^2 + d^2",
        params: [{ name: "k", min: 0, max: 2, step: 0.25, initial: 0.5 }],
        window: { xmin: -2, xmax: 2, ymin: 0, ymax: 6 },
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: every curve is the same parabola, lifted by $k_{cm}^2$. The minimum is always at $d = 0$, the COM axis. Far from the COM ($d$ large) the lift hardly matters: every body starts to look like a point mass at distance $d$.",
    },
    { type: "heading", text: "Using the theorems on standard bodies" },
    {
      type: "text",
      content:
        "**Standard uses.**\n\n- **Rod about its end:** $\\frac{ML^2}{12} + M\\left(\\frac L2\\right)^2 = \\frac{ML^2}{3}$, agreeing with 2.4.\n- **Disc about a diameter:** by symmetry every diameter has the same $I_d$, and $I_x + I_y = I_z$ gives $2I_d = \\frac12MR^2$, so $I_d = \\frac14MR^2$.\n- **Disc about a tangent in its plane:** $\\frac14MR^2 + MR^2 = \\frac54MR^2$.\n- **Disc about a tangent perpendicular to its plane** (axis through a rim point, parallel to the central axis): $\\frac12MR^2 + MR^2 = \\frac32MR^2$.\n- **Ring about a diameter:** $2I_d = MR^2$, so $I_d = \\frac12MR^2$; about a tangent in its plane $\\frac32MR^2$; perpendicular to its plane $2MR^2$.\n- **Rectangular plate** ($a \\times b$) about the axis through its centre perpendicular to it: $I_z = \\frac{Ma^2}{12} + \\frac{Mb^2}{12} = \\frac{M(a^2 + b^2)}{12}$.\n- **Square plate about a diagonal:** $I_z = I_x + I_y = 2\\cdot\\frac{Ma^2}{12} = \\frac{Ma^2}{6}$ about the central perpendicular axis. The two diagonals are also perpendicular in-plane axes through the centre, and they are equivalent by symmetry, so each has $\\frac12 \\cdot \\frac{Ma^2}{6} = \\frac{Ma^2}{12}$.\n- **Solid sphere about a tangent:** $\\frac25MR^2 + MR^2 = \\frac75MR^2$ (parallel axis only; the perpendicular theorem does not apply to a sphere).",
    },
    {
      type: "worked-example",
      id: "mrg2-5-we1",
      title: "Worked example 1: a disc pivoted at its rim in its own plane",
      problem:
        "A 2 kg disc of radius 0.2 m swings about a tangent lying in its plane. Find its moment of inertia about that tangent.",
      steps: [
        { text: "$I_d = \\frac14MR^2$ about the parallel diameter. *Why this step:* the parallel axis theorem needs the COM axis that is **parallel** to the tangent, which is a diameter, not the central axis." },
        { text: "$I = \\frac14MR^2 + MR^2 = \\frac54(2)(0.04) = 0.1$ kg m²." },
      ],
      answer: "$I = 0.1$ kg m².",
    },
    {
      type: "worked-example",
      id: "mrg2-5-we2",
      title: "Worked example 2: a rod pivoted a quarter of the way along",
      problem:
        "A rod of mass $M$ and length $L$ turns about a perpendicular axis $\\frac L4$ from one end. Find its moment of inertia about that axis.",
      steps: [
        { text: "Distance from the centre: $d = \\frac L2 - \\frac L4 = \\frac L4$." },
        { text: "$I = \\frac{ML^2}{12} + \\frac{ML^2}{16} = \\frac{4ML^2 + 3ML^2}{48} = \\frac{7ML^2}{48}$." },
      ],
      answer: "$I = \\dfrac{7ML^2}{48}$.",
    },
    {
      type: "worked-example",
      id: "mrg2-5-we3",
      title: "Worked example 3: between two non-COM axes, the trap",
      problem:
        "A rod has $I = \\frac{ML^2}{3}$ about its end. Find $I$ about a parallel axis $\\frac L3$ from that end.",
      steps: [
        { text: "Wrong: $\\frac{ML^2}{3} + M\\left(\\frac L3\\right)^2 = \\frac{4ML^2}{9}$. The theorem was used from an axis that does not pass through the COM." },
        { text: "Right: go back to the COM first. $I_{cm} = \\frac{ML^2}{12}$, and the new axis is $\\frac L2 - \\frac L3 = \\frac L6$ from the centre: $I = \\frac{ML^2}{12} + \\frac{ML^2}{36} = \\frac{ML^2}{9}$. *Why this step:* the cross term only vanishes about the COM." },
      ],
      answer: "$I = \\dfrac{ML^2}{9}$ (not $\\frac{4ML^2}{9}$).",
    },
    {
      type: "worked-example",
      id: "mrg2-5-we4",
      title: "Worked example 4: a square plate about a diagonal",
      problem:
        "A square plate of side 0.3 m and mass 4 kg. Find its moment of inertia about a diagonal.",
      steps: [
        { text: "$I_{\\text{diag}} = \\frac{Ma^2}{12} = \\frac{4 \\times 0.09}{12} = 0.03$ kg m², the same as about the line through the centre parallel to a side." },
      ],
      answer: "$I_{\\text{diag}} = 0.03$ kg m².",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the parallel axis theorem works between any two parallel axes\"",
      content:
        "$I = I_{cm} + Md^2$ needs one of the axes to pass through the **centre of mass**. Between two other parallel axes, step through the COM: subtract $Md_1^2$ to get $I_{cm}$, then add $Md_2^2$. Skipping that step gave $\\frac49ML^2$ instead of $\\frac19ML^2$ in Worked example 3.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the perpendicular axis theorem works for a sphere\"",
      content:
        "It needs every particle to lie in the $xy$-plane. For a sphere, applying it would give $I_z = I_x + I_y = \\frac45MR^2$, but by symmetry $I_z = I_x = \\frac25MR^2$. Laminas only: discs, rings, plates, flat wire shapes.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "mrg2-5-q1",
      variant: "practice",
      question: "A disc of mass $M$ and radius $R$ rotates about an axis perpendicular to its plane through a point on its rim. What is $I$?",
      options: [
        { text: "$\\dfrac54MR^2$", feedback: "That is about a tangent *in* the plane, built on the diameter's $\\frac14MR^2$." },
        { text: "$MR^2$", feedback: "That is just the $Md^2$ term. Add $I_{cm} = \\frac12MR^2$." },
        { text: "$2MR^2$", feedback: "That is a *ring* about the same axis. A disc's $I_{cm}$ is $\\frac12MR^2$, not $MR^2$." },
        { text: "$\\dfrac32MR^2$", correct: true, feedback: "$\\frac12MR^2 + MR^2$, using the central perpendicular axis as $I_{cm}$." },
      ],
      hint: "Start from the disc's $I_{cm} = \\tfrac12 MR^2$ about its central perpendicular axis and shift it to the rim with the parallel axis theorem, $d = R$.",
    },
    {
      type: "quiz",
      id: "mrg2-5-q2",
      variant: "practice",
      question: "What is the moment of inertia of a thin ring of mass $M$ and radius $R$ about a diameter?",
      options: [
        { text: "$\\dfrac12MR^2$", correct: true, feedback: "$I_x + I_y = I_z = MR^2$ with $I_x = I_y$ by symmetry." },
        { text: "$MR^2$", feedback: "That is about the central perpendicular axis." },
        { text: "$\\dfrac14MR^2$", feedback: "That is a *disc* about a diameter." },
        { text: "$\\dfrac32MR^2$", feedback: "That is about a tangent in the plane of the ring." },
      ],
      hint: "Use the perpendicular axis theorem: the two diameters are equal by symmetry and add up to the ring's $I$ about its central perpendicular axis.",
    },
    {
      type: "quiz",
      id: "mrg2-5-q3",
      variant: "practice",
      question: "A rod of mass $M$ and length $L$ rotates about a perpendicular axis $\\frac L3$ from one end. What is $I$?",
      options: [
        { text: "$\\dfrac{4ML^2}{9}$", feedback: "That applies the theorem from the end axis, which does not pass through the COM." },
        { text: "$\\dfrac{ML^2}{9}$", correct: true, feedback: "$\\frac{ML^2}{12} + M\\left(\\frac L6\\right)^2 = \\frac{3ML^2 + ML^2}{36}$." },
        { text: "$\\dfrac{7ML^2}{36}$", feedback: "That uses $d = \\frac L3$ from the centre. The axis is $\\frac L3$ from the end, so $\\frac L6$ from the centre." },
        { text: "$\\dfrac{ML^2}{12}$", feedback: "That is about the centre. The axis is off-centre, so add $Md^2$." },
      ],
      hint: "Find the axis's distance from the centre of the rod, then use $I = \\frac{ML^2}{12} + Md^2$ (Worked example 2).",
    },
    {
      type: "quiz",
      id: "mrg2-5-q4",
      variant: "concept",
      question: "Why can't you get a solid sphere's $I$ about a diameter from $I_z = I_x + I_y$?",
      options: [
        { text: "Because a sphere has no centre of mass.", feedback: "It does, at its centre. The issue is the thickness in the $z$ direction." },
        { text: "It works, and gives $\\frac45MR^2$.", feedback: "By symmetry $I_z = I_x$ for a sphere, so $I_z = I_x + I_y$ is impossible unless $I = 0$." },
        { text: "The theorem only holds for flat bodies, where every particle has $z = 0$.", correct: true, feedback: "For a sphere $I_x + I_y = \\sum m(x^2 + y^2 + 2z^2) \\ne I_z$." },
      ],
      hint: "Look at the theorem's derivation: $I_x + I_y = \\sum m(y^2 + x^2) + \\ldots$. What assumption about each particle's $z$ coordinate makes it work?",
    },
    {
      type: "quiz",
      id: "mrg2-5-q5",
      variant: "practice",
      question: "What is the moment of inertia of a solid sphere about a tangent?",
      options: [
        { text: "$\\dfrac75MR^2$", correct: true, feedback: "$\\frac25MR^2 + MR^2$." },
        { text: "$\\dfrac25MR^2$", feedback: "That is about a diameter. The tangent is a distance $R$ away." },
        { text: "$\\dfrac53MR^2$", feedback: "That is the *hollow* sphere about a tangent." },
        { text: "$\\dfrac32MR^2$", feedback: "That is a disc about a perpendicular tangent." },
      ],
      hint: "Start from the sphere's $I$ about a diameter and apply the parallel axis theorem with $d = R$.",
    },
    {
      type: "quiz",
      id: "mrg2-5-q6",
      variant: "practice",
      question: "A uniform square plate has mass $M$ and side $a$. What is its moment of inertia about a diagonal?",
      options: [
        { text: "$\\dfrac{Ma^2}{6}$", feedback: "That is about the axis through the centre perpendicular to the plate." },
        { text: "$\\dfrac{Ma^2}{24}$", feedback: "That halves $\\frac{Ma^2}{12}$ again. $I_z$ is $\\frac{Ma^2}{6}$, and each diagonal gets half of it." },
        { text: "$\\dfrac{Ma^2}{3}$", feedback: "That is about one edge of the plate." },
        { text: "$\\dfrac{Ma^2}{12}$", correct: true, feedback: "The two diagonals are equivalent and perpendicular, so each has half of $I_z = \\frac{Ma^2}{6}$." },
      ],
      hint: "The two diagonals are equal by symmetry and both lie in the plate. Use the perpendicular axis theorem with the plate's $I$ about its central perpendicular axis.",
    },
    {
      type: "quiz",
      id: "mrg2-5-q7",
      variant: "practice",
      multiple: true,
      question: "A uniform disc has mass $M$ and radius $R$. Select all the statements that are correct.",
      options: [
        { text: "About any diameter, $I = \\frac14MR^2$.", correct: true, feedback: "All diameters are equivalent and $I_x + I_y = I_z = \\frac12MR^2$, so each is $\\frac14MR^2$." },
        { text: "About a tangent in its own plane, $I = \\frac54MR^2$.", correct: true, feedback: "Parallel axis from the diameter parallel to it: $\\frac14MR^2 + MR^2$." },
        { text: "About the axis through a rim point perpendicular to its plane, $I = \\frac32MR^2$.", correct: true, feedback: "Parallel axis from the central perpendicular axis: $\\frac12MR^2 + MR^2$." },
        { text: "About any diameter, $I = \\frac12MR^2$, the same as about the central axis.", feedback: "The perpendicular axis theorem splits the central value between two diameters: each gets half, $\\frac14MR^2$." },
      ],
      hint: "Get the diameter result from the perpendicular axis theorem, then use the parallel axis theorem (from the COM axis) for the tangent and the rim axis.",
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "composite-and-cut-bodies",
  title: "2.6 · Composite, Cut and Hollowed Bodies",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "A grandfather clock's pendulum is a rod with a heavy disc at the bottom. A flywheel is often a disc with a hole in the middle. An exam might hand you a disc with an off-centre hole and ask for its $I$ about the old centre. None of these need a new integral: $I = \\sum mr^2$ is a sum, so it can be split into pieces.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Adding and subtracting moments of inertia",
      content:
        "About **one fixed axis**, moments of inertia add: $I_{\\text{whole}} = I_1 + I_2 + \\dots$ for the pieces. A removed piece subtracts: $I_{\\text{rem}} = I_{\\text{full}} - I_{\\text{removed}}$, where both are about the **same** axis and the removed piece's mass is what it would have had.\nUse the parallel axis theorem to bring each piece's own $I_{cm}$ to the common axis first.",
    },
    { type: "heading", text: "Adding pieces: rod plus disc" },
    {
      type: "worked-example",
      id: "mrg2-6-we1",
      title: "Worked example 1: a pendulum: rod + disc",
      problem:
        "A uniform 1 kg rod, 1 m long, hangs from a pivot at its top end. A 2 kg disc of radius 0.1 m is fixed at the bottom, its centre 1.1 m below the pivot, and swings in its own plane. Find $I$ about the pivot.",
      steps: [
        { text: "Rod about its end: $\\frac13(1)(1)^2 \\approx 0.333$ kg m²." },
        { text: "Disc: about its own centre (perpendicular to its plane) $\\frac12(2)(0.1)^2 = 0.01$ kg m²; shifted 1.1 m: $0.01 + 2(1.1)^2 = 0.01 + 2.42 = 2.43$ kg m². *Why this step:* each piece needs its own parallel-axis shift before the pieces can be added." },
        { text: "Total: $I \\approx 0.333 + 2.43 = 2.763$ kg m². The disc's own spin term (0.01) is tiny next to its $Md^2$ term: from far away it is nearly a point mass." },
      ],
      answer: "$I \\approx 2.763$ kg m².",
    },
    {
      type: "worked-example",
      id: "mrg2-6-we2",
      title: "Worked example 2: a T-shape",
      problem:
        "Two identical uniform rods, each of mass $M$ and length $L$, form a T: one horizontal, the other hanging vertically from its midpoint. Find $I$ about the axis through the junction, perpendicular to the plane of the T.",
      steps: [
        { text: "Horizontal rod, about its centre: $\\frac{ML^2}{12}$." },
        { text: "Vertical rod, about its end: $\\frac{ML^2}{3}$." },
        { text: "$I = \\frac{ML^2}{12} + \\frac{4ML^2}{12} = \\frac{5ML^2}{12}$." },
      ],
      answer: "$I = \\dfrac{5ML^2}{12}$.",
    },
    {
      type: "worked-example",
      id: "mrg2-6-we3",
      title: "Worked example 3: a dumbbell of two spheres",
      problem:
        "Two solid spheres (1 kg, radius 0.1 m each) have centres 1 m apart on a light rod. Find $I$ about the perpendicular axis through the midpoint of the rod.",
      steps: [
        { text: "Each sphere: $\\frac25(1)(0.01) + 1(0.5)^2 = 0.004 + 0.25 = 0.254$ kg m²." },
        { text: "Two of them: $0.508$ kg m². Treating the spheres as points would give 0.5, an error under 2%." },
      ],
      answer: "$I = 0.508$ kg m².",
    },
    { type: "heading", text: "The annulus" },
    {
      type: "text",
      content:
        "**An annulus (disc with a concentric hole).** Integrate over rings from the inner radius $R_1$ to the outer $R_2$, with $\\sigma = \\frac{M}{\\pi(R_2^2 - R_1^2)}$:",
    },
    {
      type: "math",
      latex: "I = \\int_{R_1}^{R_2} r^2\\,\\sigma\\,2\\pi r\\,dr = \\frac{\\pi\\sigma}{2}(R_2^4 - R_1^4) = \\frac{\\pi\\sigma}{2}(R_2^2 - R_1^2)(R_2^2 + R_1^2) = \\frac12M(R_1^2 + R_2^2)",
    },
    {
      type: "text",
      content:
        "It sits between a disc ($R_1 = 0$ gives $\\frac12MR_2^2$) and a ring ($R_1 = R_2$ gives $MR^2$). Example: a 3 kg annulus with radii 0.1 m and 0.2 m has $I = \\frac12(3)(0.01 + 0.04) = 0.075$ kg m².",
    },
    {
      type: "worked-example",
      id: "mrg2-6-we4",
      title: "Worked example 4: an off-centre hole, JEE classic",
      problem:
        "From a uniform disc of mass $M$ and radius $R$, a disc of radius $\\frac R2$ is cut out, centred $\\frac R2$ from the centre $O$ (so the hole touches the rim). Find the $I$ of the remainder about the axis through $O$ perpendicular to the plane.",
      steps: [
        { text: "Full disc about $O$: $\\frac12MR^2$." },
        { text: "Removed piece: mass $\\frac M4$ (a quarter of the area). About its own centre: $\\frac12\\cdot\\frac M4\\cdot\\left(\\frac R2\\right)^2 = \\frac{MR^2}{32}$. Shifted to $O$: $\\frac{MR^2}{32} + \\frac M4\\left(\\frac R2\\right)^2 = \\frac{MR^2}{32} + \\frac{2MR^2}{32} = \\frac{3MR^2}{32}$. *Why this step:* the hole is not centred on the axis, so it needs the parallel axis theorem before it can be subtracted." },
        { text: "Remainder: $\\frac{16MR^2}{32} - \\frac{3MR^2}{32} = \\frac{13MR^2}{32}$, with $M$ the mass of the **original** disc. (In terms of the remaining mass $M' = \\frac34M$ this is $\\frac{13}{24}M'R^2$.)" },
      ],
      answer: "$\\dfrac{13MR^2}{32}$, with $M$ the mass of the original disc.",
    },
    { type: "heading", text: "Cut sectors" },
    {
      type: "text",
      content:
        "Cut a uniform disc of mass $4M$ into four quarters, each of mass $M$. By symmetry the four quarters contribute equally to the whole disc's $\\frac12(4M)R^2 = 2MR^2$ about the central perpendicular axis, so each quarter has $\\frac12MR^2$ about that axis, the same formula as a whole disc of mass $M$. *Why:* $I$ only cares about the distances of the mass from the axis, and a quarter disc has its mass spread from $r = 0$ to $r = R$ in exactly the same proportions as a full disc. The same argument gives $MR^2$ for a semicircular or quarter ring about its centre.\n\n**Square lamina.** For a square plate, every in-plane axis through the centre has the same $I = \\frac{Ma^2}{12}$ (we showed it for the diagonals in 2.5; the general case follows because $I$ about an in-plane line at angle $\\phi$ is $I_x\\cos^2\\phi + I_y\\sin^2\\phi$ for a symmetric body, and here $I_x = I_y$).",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a quarter disc of mass $M$ has $\\frac14\\cdot\\frac12MR^2$\"",
      content:
        "The factor $\\frac14$ is already in the mass. A quarter disc **of mass $M$** has $\\frac12MR^2$ about the original central axis, because its mass is spread over distances from 0 to $R$ exactly like a whole disc's. What is true is that a quarter *cut from* a disc of mass $M$ has mass $\\frac M4$, and hence $\\frac12\\cdot\\frac M4R^2$. Read which mass the question gives you.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "mrg2-6-q1",
      variant: "practice",
      question: "A thin wire of mass $M$ is bent into a semicircle of radius $R$. What is its moment of inertia about the axis through the centre of the circle, perpendicular to its plane?",
      options: [
        { text: "$\\dfrac12MR^2$", feedback: "That halves for the half-ring, but the mass $M$ already refers to the half. All of it is at distance $R$." },
        { text: "$\\dfrac14MR^2$", feedback: "That is a disc about a diameter, a different body and axis." },
        { text: "$MR^2$", correct: true, feedback: "Every bit of the wire is at distance $R$ from the axis." },
        { text: "$2MR^2$", feedback: "That is a ring about a perpendicular tangent. The axis here passes through the centre." },
      ],
      hint: "Every bit of the wire is at the same distance $R$ from that axis. Does it matter how the mass is spread around the circle?",
    },
    {
      type: "quiz",
      id: "mrg2-6-q2",
      variant: "practice",
      question: "An annular disc has mass $M$, inner radius $\\frac R2$ and outer radius $R$. What is its moment of inertia about its central perpendicular axis?",
      options: [
        { text: "$\\dfrac38MR^2$", feedback: "That is $\\frac12M(R_2^2 - R_1^2)$. The formula has a plus sign: $\\frac12M(R_1^2 + R_2^2)$." },
        { text: "$\\dfrac58MR^2$", correct: true, feedback: "$\\frac12M\\left(R^2 + \\frac{R^2}{4}\\right) = \\frac58MR^2$." },
        { text: "$\\dfrac12MR^2$", feedback: "That is a full disc of mass $M$. Removing the centre pushes the remaining mass outwards on average, raising $I/M$." },
        { text: "$MR^2$", feedback: "That is a ring with all mass at $R$. The annulus has mass from $\\frac R2$ to $R$." },
      ],
      hint: "Treat the annulus as a full disc minus a smaller disc, with masses in proportion to area. Find the full disc's mass first, from the annulus mass $M$.",
    },
    {
      type: "quiz",
      id: "mrg2-6-q3",
      variant: "practice",
      question: "A concentric hole of radius $\\frac R2$ is cut from a uniform disc of mass $M$ and radius $R$. In terms of $M$ (the mass of the original disc), what is the $I$ of the remainder about the central perpendicular axis?",
      options: [
        { text: "$\\dfrac{13}{32}MR^2$", feedback: "That is the *off-centre* hole, which needs a parallel-axis shift. A concentric hole needs none." },
        { text: "$\\dfrac38MR^2$", feedback: "That subtracts $\\frac18MR^2 = \\frac12M\\left(\\frac R2\\right)^2$, giving the removed disc the full mass $M$. Its mass is $\\frac M4$." },
        { text: "$\\dfrac{7}{16}MR^2$", feedback: "That subtracts $\\frac{1}{16}MR^2$: you used $\\frac M4 \\cdot \\frac{R^2}{4}$ without the $\\frac12$ of a disc." },
        { text: "$\\dfrac{15}{32}MR^2$", correct: true, feedback: "$\\frac12MR^2 - \\frac12\\cdot\\frac M4\\cdot\\frac{R^2}{4} = \\frac{16 - 1}{32}MR^2$." },
      ],
      hint: "Subtract: $I = I_{\\text{disc}} - I_{\\text{hole}}$. The removed disc's mass is set by its area fraction of the original disc.",
    },
    {
      type: "quiz",
      id: "mrg2-6-q4",
      variant: "practice",
      question: "Two identical rods (mass $M$, length $L$) form a T, the vertical rod hanging from the midpoint of the horizontal one. What is $I$ about the perpendicular axis through the junction?",
      options: [
        { text: "$\\dfrac{5}{12}ML^2$", correct: true, feedback: "$\\frac{ML^2}{12}$ (horizontal, about its centre) $+ \\frac{ML^2}{3}$ (vertical, about its end)." },
        { text: "$\\dfrac{2}{3}ML^2$", feedback: "That treats both rods as pivoted at an end. The horizontal rod turns about its centre." },
        { text: "$\\dfrac{1}{6}ML^2$", feedback: "That treats both rods as pivoted at their centres. The vertical rod turns about its end." },
        { text: "$\\dfrac{7}{12}ML^2$", feedback: "Recheck: $\\frac{1}{12} + \\frac{4}{12} = \\frac{5}{12}$." },
      ],
      hint: "Add the two rods' moments about the junction: one rotates about its own centre, the other about its end.",
    },
    {
      type: "quiz",
      id: "mrg2-6-q5",
      variant: "concept",
      question: "A quarter of a uniform disc has mass $m$ and radius $R$. What is its $I$ about the axis through the original disc's centre, perpendicular to its plane?",
      options: [
        { text: "$\\dfrac18mR^2$", feedback: "The quarter is already accounted for in $m$. Dividing by 4 again double-counts it." },
        { text: "$\\dfrac12mR^2$", correct: true, feedback: "Its mass is spread over distances $0$ to $R$ exactly as a full disc's, so it has the full-disc formula with its own mass." },
        { text: "$mR^2$", feedback: "That would need all of the mass at the rim." },
        { text: "It cannot be found without integrating over the sector.", feedback: "Symmetry does the integral for you: each quarter contributes equally to the whole disc." },
      ],
      hint: "Every element of the sector is at the same set of distances from the axis as in the full disc. Express the full disc's $I$ in terms of its mass, then scale to the sector's mass.",
    },
    {
      type: "numeric",
      id: "mrg2-6-q6",
      variant: "practice",
      question: "A uniform 3 kg rod, 1 m long, is pivoted at one end and carries a 1 kg point mass at the other. What is $I$ about the pivot? Give your answer in kg m².",
      answer: 2,
      tolerance: 0.01,
      unit: "kg m²",
      hint: "Add the rod about its end and the point mass about the same axis.",
      solution: "Rod about its end: $\\tfrac13(3)(1)^2 = 1$ kg m². Point mass: $1 \\times 1^2 = 1$ kg m². About one common axis they add: $I = 2$ kg m².",
      commonMistakes: [
        { answer: 1.25, feedback: "That uses $\\frac{1}{12}ML^2$ for the rod. It is pivoted at its end: $\\frac13ML^2$." },
        { answer: 4, feedback: "That treats the rod's mass as if it were all at the far end." },
        { answer: 1, feedback: "That is just one of the two contributions. Add them." },
      ],
    },
    {
      type: "numeric",
      id: "mrg2-6-q7",
      variant: "practice",
      question: "A uniform annular disc of mass 2 kg has inner radius 0.1 m and outer radius 0.3 m. What is its moment of inertia about its central perpendicular axis? Give your answer in kg m².",
      answer: 0.1,
      tolerance: 0.001,
      unit: "kg m²",
      hint: "For an annulus, $I = \\frac12M(R_1^2 + R_2^2)$, with $M$ the annulus's own mass.",
      solution: "$I = \\tfrac12M(R_1^2 + R_2^2) = \\tfrac12(2)(0.01 + 0.09) = 0.1$ kg m².",
      commonMistakes: [
        { answer: 0.08, feedback: "That is $\\frac12M(R_2^2 - R_1^2)$. The formula has a plus sign: $\\frac12M(R_1^2 + R_2^2)$." },
        { answer: 0.09, feedback: "That is a full disc of the same mass and outer radius. Removing the centre puts the mass further out on average." },
        { answer: 0.18, feedback: "That is a ring, with all of the mass at 0.3 m." },
      ],
    },
    {
      type: "quiz",
      id: "mrg2-6-q8",
      variant: "practice",
      multiple: true,
      question: "A concentric disc of radius $\\frac R2$ is cut from a uniform disc of mass $M$ and radius $R$, leaving a ring-shaped piece of mass $M'$. About the central perpendicular axis, select all the statements that are correct.",
      options: [
        { text: "The removed disc has mass $\\frac M4$.", correct: true, feedback: "Mass goes with area, and $\\left(\\frac12\\right)^2 = \\frac14$." },
        { text: "The remainder has $I = \\frac{15}{32}MR^2$.", correct: true, feedback: "$\\frac12MR^2 - \\frac12\\cdot\\frac M4\\cdot\\frac{R^2}{4} = \\frac{16 - 1}{32}MR^2$." },
        { text: "In terms of its own mass, the remainder has $I = \\frac58M'R^2$.", correct: true, feedback: "$M' = \\frac34M$, so $\\frac{15}{32}MR^2 = \\frac{15}{32}\\cdot\\frac43M'R^2 = \\frac58M'R^2$, matching the annulus formula $\\frac12M'\\left(\\frac{R^2}{4} + R^2\\right)$." },
        { text: "The remainder has $I = \\frac12M'R^2$, like a full disc of its mass.", feedback: "Removing the centre leaves the mass further out on average, so $I/M'R^2$ rises above $\\frac12$, to $\\frac58$." },
      ],
      hint: "Mass scales with area, so find the removed disc's mass first. Subtract moments of inertia, then rewrite the result using the remainder's own mass $M'$.",
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-2-mastery",
  title: "2.7 · Chapter 2 Mastery",
  position: 7,
  blocks: blocks([
    {
      type: "callout",
      variant: "info",
      title: "The chapter in six lines",
      content:
        "1. A rigid body about a fixed axis needs one angle: $\\omega = \\frac{d\\theta}{dt}$, $\\alpha = \\frac{d\\omega}{dt}$; $\\vec\\omega$ lies along the axis (right-hand rule).\n2. A point at distance $r$: $v = r\\omega$, $a_t = r\\alpha$, $a_c = \\omega^2r$, all in radians.\n3. Constant $\\alpha$: the three linear equations with $\\theta, \\omega, \\alpha$; otherwise integrate, using $\\alpha = \\omega\\frac{d\\omega}{d\\theta}$ when needed.\n4. $K = \\frac12I\\omega^2$ with $I = \\sum mr^2 = \\int r^2\\,dm$ about a stated axis; $I = Mk^2$.\n5. $I = I_{cm} + Md^2$ (any body, one axis through the COM); $I_z = I_x + I_y$ (laminas only).\n6. Pieces add about a common axis; holes subtract after shifting them to that axis.",
    },
    {
      type: "text",
      content:
        "No formula sheet: the standard results can all be rebuilt from $\\int r^2\\,dm$ and the two theorems. The last questions are JEE-Advanced flavoured.",
    },
    {
      type: "numeric",
      id: "mrg2-7-q1",
      variant: "mastery",
      question: "A grinding wheel of radius 0.2 m turns at 900 rpm. What is the speed of a point on its rim? Give your answer in m/s.",
      answer: 18.85,
      relTolerance: 0.01,
      unit: "m/s",
      hint: "Lesson 2.1: convert rpm to rad/s, then $v = r\\omega$.",
      solution: "$\\omega = 900 \\times \\dfrac{2\\pi}{60} = 30\\pi$ rad/s, and $v = r\\omega = 0.2 \\times 30\\pi = 6\\pi \\approx 18.8$ m/s.",
      commonMistakes: [
        { answer: 180, feedback: "That multiplies rpm by the radius. Convert to rad/s first." },
        { answer: 3, feedback: "That uses 15 rev/s as if it were rad/s. Multiply by $2\\pi$." },
        { answer: 188.5, feedback: "That is $60\\pi$. Recheck the radius: $v = r\\omega = 0.2 \\times 30\\pi$." },
      ],
    },
    {
      type: "numeric",
      id: "mrg2-7-q2",
      variant: "mastery",
      question: "A turbine at 3000 rpm is braked with a constant angular deceleration of $10\\pi$ rad/s². How many revolutions does it make before stopping?",
      answer: 250,
      unit: "revolutions",
      hint: "Rotational kinematics (lesson 2.2); mind the units.",
      solution: "$\\omega_0 = 3000 \\times \\dfrac{2\\pi}{60} = 100\\pi$ rad/s. Then $\\theta = \\dfrac{\\omega_0^2}{2\\alpha} = \\dfrac{10^4\\pi^2}{20\\pi} = 500\\pi$ rad, which is $\\dfrac{500\\pi}{2\\pi} = 250$ revolutions. (Check: it stops in 10 s, averaging 25 rev/s.)",
      commonMistakes: [
        { answer: 500, feedback: "$500\\pi$ rad is 250 revolutions: divide by $2\\pi$, not by $\\pi$." },
        { answer: 1570.8, tolerance: 1, feedback: "$500\\pi \\approx 1571$ is the angle in radians. Divide by $2\\pi$." },
        { answer: 25, feedback: "That is the average speed in rev/s. It takes 10 s to stop, so it makes 250 revolutions." },
      ],
    },
    {
      type: "numeric",
      id: "mrg2-7-q3",
      variant: "mastery",
      question: "A wheel starts from rest with constant $\\alpha = 4$ rad/s². After what time does the acceleration of a rim point make $45^\\circ$ with its velocity? Give your answer in seconds.",
      answer: 0.5,
      tolerance: 0.005,
      unit: "s",
      hint: "At $45^\\circ$ the tangential and centripetal parts are equal.",
      solution: "$45^\\circ$ needs $a_c = a_t$: $\\omega^2 r = \\alpha r$. With $\\omega = \\alpha t$, $(\\alpha t)^2 = \\alpha$, so $t = \\dfrac{1}{\\sqrt\\alpha} = \\dfrac12 = 0.5$ s. The radius cancels, so every point reaches $45^\\circ$ at the same moment.",
      commonMistakes: [
        { answer: 0.25, feedback: "That solves $\\alpha t = 1$. The condition is $\\omega^2 = \\alpha$, that is, $\\alpha^2t^2 = \\alpha$." },
        { answer: 2, feedback: "That is $\\sqrt\\alpha$. The time is $\\frac{1}{\\sqrt\\alpha}$." },
      ],
    },
    {
      type: "quiz",
      id: "mrg2-7-q4",
      variant: "mastery",
      question: "Three particles of mass $m$ sit at the vertices of an equilateral triangle of side $a$. What is $I$ about an axis along one side?",
      options: [
        { text: "$ma^2$", feedback: "That is about the perpendicular axis through the centroid." },
        { text: "$\\dfrac32ma^2$", feedback: "The two particles on the side lie on the axis and contribute nothing." },
        { text: "$\\dfrac34ma^2$", correct: true, feedback: "Only the opposite vertex is off the axis, at the height $\\frac{\\sqrt3a}{2}$: $m\\cdot\\frac{3a^2}{4}$." },
        { text: "$\\dfrac{\\sqrt3}{2}ma^2$", feedback: "Square the distance: $\\left(\\frac{\\sqrt3a}{2}\\right)^2 = \\frac{3a^2}{4}$." },
      ],
      hint: "Moment of inertia of point masses (lesson 2.3).",
    },
    {
      type: "quiz",
      id: "mrg2-7-q5",
      variant: "mastery",
      question: "What is the radius of gyration of a uniform disc of radius $R$ about a tangent in its own plane?",
      options: [
        { text: "$\\dfrac{\\sqrt5}{2}R$", correct: true, feedback: "$I = \\frac14MR^2 + MR^2 = \\frac54MR^2$, so $k = \\sqrt{\\frac54}R$." },
        { text: "$\\sqrt{\\frac32}\\,R$", feedback: "That is the tangent *perpendicular* to the plane, built on $\\frac12MR^2$." },
        { text: "$\\dfrac54R$", feedback: "That is $k^2/R$. Take the square root of $\\frac54$." },
        { text: "$\\dfrac{R}{2}$", feedback: "That is about a diameter. The tangent is a further $R$ away." },
      ],
      hint: "The parallel and perpendicular axis theorems (lesson 2.5).",
    },
    {
      type: "quiz",
      id: "mrg2-7-q6",
      variant: "mastery",
      question: "A ring and a disc have the same mass and radius. Find the ratio of the ring's $I$ about a tangent in its plane to the disc's $I$ about a tangent perpendicular to its plane.",
      options: [
        { text: "$2 : 1$", feedback: "That compares their central-axis values. Here different axes happen to give equal answers." },
        { text: "$6 : 5$", feedback: "That is the ring's in-plane tangent against the disc's in-plane tangent, $\\frac32 : \\frac54$." },
        { text: "$4 : 3$", feedback: "That is the ring's perpendicular tangent ($2MR^2$) against the disc's ($\\frac32MR^2$)." },
        { text: "$1 : 1$", correct: true, feedback: "Ring: $\\frac12MR^2 + MR^2 = \\frac32MR^2$. Disc: $\\frac12MR^2 + MR^2 = \\frac32MR^2$." },
      ],
      hint: "Lesson 2.5: use both theorems on the standard results for a ring and a disc.",
    },
    {
      type: "quiz",
      id: "mrg2-7-q7",
      variant: "mastery",
      question: "A disc of radius $\\frac R2$ is cut from a uniform disc of radius $R$, touching its rim. The **remaining** piece has mass $M'$. What is its $I$ about the original centre, perpendicular to the plane?",
      options: [
        { text: "$\\dfrac{13}{32}M'R^2$", feedback: "$\\frac{13}{32}$ multiplies the *original* disc's mass. Convert: $M = \\frac43M'$." },
        { text: "$\\dfrac{15}{32}M'R^2$", feedback: "That is the concentric hole in terms of the original mass. This hole is off-centre, and the mass given is the remainder." },
        { text: "$\\dfrac{13}{24}M'R^2$", correct: true, feedback: "With the original mass $M = \\frac43M'$, $I = \\frac{13}{32}MR^2 = \\frac{13}{32}\\cdot\\frac43M'R^2$." },
        { text: "$\\dfrac12M'R^2$", feedback: "Removing the off-centre piece does not leave a full-disc distribution." },
      ],
      hint: "First find the answer in terms of the original disc's mass, then relate the two masses.",
    },
    {
      type: "quiz",
      id: "mrg2-7-q8",
      variant: "mastery",
      question: "Point masses of 2 kg and 6 kg are joined by a light rod 2 m long. What is the least moment of inertia about any axis perpendicular to the rod?",
      options: [
        { text: "8 kg m², about the midpoint", feedback: "At the midpoint $I = 8 \\times 1^2 = 8$ kg m², larger than at the COM." },
        { text: "6 kg m², about the COM 1.5 m from the 2 kg mass", correct: true, feedback: "$I = 2(1.5)^2 + 6(0.5)^2 = 4.5 + 1.5 = 6$ kg m², which is $\\mu L^2$ with $\\mu = \\frac{12}{8}$ kg." },
        { text: "8 kg m², about the 6 kg mass", feedback: "About the 6 kg mass, $I = 2 \\times 4 = 8$ kg m². The COM axis does better." },
        { text: "0, about an axis through both masses", feedback: "An axis *along* the rod is not perpendicular to it." },
      ],
      hint: "Lesson 2.3: write $I$ for an axis a distance $x$ from one mass and minimise it.",
    },
    {
      type: "quiz",
      id: "mrg2-7-q9",
      variant: "mastery",
      question: "A uniform rod of mass $M$ and length $L$ rotates about a perpendicular axis $\\frac L5$ from one end. What is $I$?",
      options: [
        { text: "$\\dfrac{28}{75}ML^2$", feedback: "That adds $M\\left(\\frac L5\\right)^2$ to the end-axis value $\\frac{ML^2}{3}$, which is not about the COM." },
        { text: "$\\dfrac{9}{100}ML^2$", feedback: "That is only the $Md^2$ term." },
        { text: "$\\dfrac{37}{300}ML^2$", feedback: "That takes $d = \\frac L5$. The axis is $\\frac L5$ from the end, so it is $\\frac L2 - \\frac L5 = \\frac{3L}{10}$ from the centre." },
        { text: "$\\dfrac{13}{75}ML^2$", correct: true, feedback: "$d = \\frac{3L}{10}$, so $I = \\frac{ML^2}{12} + \\frac{9ML^2}{100} = \\frac{25 + 27}{300}ML^2 = \\frac{13}{75}ML^2$." },
      ],
      hint: "Lesson 2.5: the parallel axis theorem, shifting from the rod's centre.",
    },
    {
      type: "quiz",
      id: "mrg2-7-q10",
      variant: "mastery",
      question: "A uniform square plate of mass $M$ and side $a$ rotates about an axis through one corner, perpendicular to the plate. What is $I$?",
      options: [
        { text: "$\\dfrac23Ma^2$", correct: true, feedback: "$I_{cm} = \\frac{Ma^2}{6}$ (perpendicular axis theorem) and the corner is $\\frac{a}{\\sqrt2}$ away: $\\frac{Ma^2}{6} + \\frac{Ma^2}{2}$." },
        { text: "$\\dfrac{Ma^2}{3}$", feedback: "That is about an *edge* of the plate, in its plane." },
        { text: "$\\dfrac76Ma^2$", feedback: "That uses $d = a$. The corner is half a diagonal, $\\frac{a}{\\sqrt2}$, from the centre." },
        { text: "$\\dfrac{7}{12}Ma^2$", feedback: "That starts from $\\frac{Ma^2}{12}$, an in-plane axis. The axis here is perpendicular to the plate, so $I_{cm} = \\frac{Ma^2}{6}$." },
      ],
      hint: "The parallel and perpendicular axis theorems (lesson 2.5).",
    },
    {
      type: "quiz",
      id: "mrg2-7-q11",
      variant: "mastery",
      question: "A uniform solid cylinder has mass $M$, radius $R$ and length $L$. What is its moment of inertia about an axis through its centre, perpendicular to its own axis?",
      options: [
        { text: "$\\dfrac12MR^2$", feedback: "That is about the cylinder's own axis." },
        { text: "$M\\left(\\dfrac{R^2}{4} + \\dfrac{L^2}{12}\\right)$", correct: true, feedback: "Stack discs: each has $\\frac14dm\\,R^2$ about its own diameter plus $dm\\,z^2$ (parallel axis). $\\int z^2\\,dm = \\frac{ML^2}{12}$, as for a rod." },
        { text: "$\\dfrac{ML^2}{12}$", feedback: "That treats the cylinder as a thin rod. It has thickness, which adds $\\frac{MR^2}{4}$." },
        { text: "$M\\left(\\dfrac{R^2}{2} + \\dfrac{L^2}{12}\\right)$", feedback: "Each disc turns about its *diameter* here, for which $I = \\frac14 dm\\,R^2$, not $\\frac12$." },
      ],
      hint: "Slice into thin discs perpendicular to the cylinder's axis; each turns about one of its own diameters, shifted a distance $z$.",
    },
    {
      type: "numeric",
      id: "mrg2-7-q12",
      variant: "mastery",
      question: "A body turns through $\\theta = 2t^3 - 6t^2$ rad ($t$ in s). What is its angular acceleration at the instant it is momentarily at rest (for $t > 0$)? Give your answer in rad/s².",
      answer: 12,
      unit: "rad/s²",
      hint: "Find when $\\omega = \\frac{d\\theta}{dt}$ is zero, then evaluate $\\alpha = \\frac{d\\omega}{dt}$ there.",
      solution: "$\\omega = 6t^2 - 12t = 6t(t - 2)$, which is zero at $t = 2$ s (for $t > 0$). $\\alpha = 12t - 12 = 12$ rad/s² there: the body is reversing.",
      commonMistakes: [
        { answer: 0, feedback: "Zero angular *velocity* does not mean zero angular acceleration: it is reversing." },
        { answer: -12, feedback: "That is $\\alpha$ at $t = 0$. The body is at rest again at $t = 2$ s." },
        { answer: 24, feedback: "That is $12t$ alone at $t = 2$. Include the $-12$." },
      ],
    },
    {
      type: "quiz",
      id: "mrg2-7-q13",
      variant: "mastery",
      multiple: true,
      question: "JEE Advanced. Select all the statements about the parallel and perpendicular axis theorems that are correct.",
      options: [
        { text: "Of all axes parallel to a given direction, the one through the centre of mass gives the least moment of inertia.", correct: true, feedback: "$I = I_{cm} + Md^2$ and $Md^2 \\ge 0$, with equality only at $d = 0$." },
        { text: "$I = I_{cm} + Md^2$ may be used directly between any two parallel axes a distance $d$ apart.", feedback: "One axis must pass through the COM; otherwise the cross term does not vanish. Step through the COM ($\\frac49$ vs $\\frac19ML^2$ for the rod)." },
        { text: "The perpendicular axis theorem applies to a thin square plate but not to a cube.", correct: true, feedback: "It needs every particle to have $z = 0$: true for a lamina, false for a body with thickness." },
        { text: "For a thin ring, $I$ about a diameter is half of $I$ about the central perpendicular axis.", correct: true, feedback: "$I_x + I_y = I_z$ with $I_x = I_y$ by symmetry: $\\frac12MR^2$ against $MR^2$." },
        { text: "For a solid sphere, $I_x + I_y = I_z$ for three mutually perpendicular diameters.", feedback: "By symmetry all three are $\\frac25MR^2$, so $I_x + I_y = \\frac45MR^2 \\ne I_z$. The sphere is not a lamina." },
      ],
      hint: "Lesson 2.5: recall what each theorem assumes about the axis and the body.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "We can now describe a rotation and say how hard a body is to spin. Chapter 3 asks what *causes* the spin: torque, $\\vec\\tau = \\vec r\\times\\vec F$, and the rotational second law $\\tau = I\\alpha$ that joins it to the moment of inertia you have just built.",
    },
  ]),
};

export const mrgChapter2Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lessonMastery,
];
