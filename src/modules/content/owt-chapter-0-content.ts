import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Oscillations, Waves and Thermal Physics Chapter 0 — Simple Harmonic Motion.
 * One test for SHM (a = −ω²x), the motion as the shadow of a turning arrow,
 * speed and energy, springs in every arrangement, pendulums, adding SHMs and
 * spotting hidden ones, then damping, driving and resonance.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "restoring-forces",
  title: "0.1 · What Makes Something Oscillate",
  position: 1,
  blocks: blocks([
    {
      type: "text",
      content:
        "Hold one end of a steel ruler flat on a desk, bend the free end down and let go. It flicks up, overshoots, comes back, overshoots again, and buzzes for a second or two. A child on a swing, a boat bobbing after a wave passes, a guitar string, the air inside a flute: all of them are pushed away from a resting position, come back, and cannot stop exactly there.",
    },
    {
      type: "text",
      content:
        "Two ingredients make this happen. First, a **stable equilibrium**: a position where the net force is zero and, if you nudge the object, the force pushes it back. Second, **inertia**: the object arrives back at equilibrium moving, so it sails past and has to be pulled back from the other side. Restoring force plus inertia gives oscillation. This chapter is about the simplest and most important version of it.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Periodic, oscillatory, simple harmonic",
      content:
        "**Periodic motion** repeats itself after a fixed time $T$, the **period** (the Earth round the Sun, a ceiling fan).\n**Oscillatory motion** is periodic motion to and fro about an equilibrium position (a swing, a ruler).\n**Simple harmonic motion (SHM)** is the special oscillation in which the restoring force is proportional to the displacement from equilibrium and opposite to it: $F = -kx$.\nEvery oscillation is periodic, but not every periodic motion is an oscillation, and not every oscillation is SHM.",
    },
    {
      type: "text",
      content:
        "**Why F = −kx is everywhere.** Recall the potential-energy curves from Mechanics I: the force is $F = -\\dfrac{dU}{dx}$, and a stable equilibrium sits at the bottom of a valley in $U(x)$. Zoom in on the bottom of *any* smooth valley at $x = 0$ and it looks like a parabola. Expanding $U$ about the minimum (Taylor series):",
    },
    {
      type: "math",
      latex:
        "U(x) \\approx U(0) + \\underbrace{U'(0)}_{=\\,0}\\,x + \\tfrac12 U''(0)\\,x^2 = U(0) + \\tfrac12 k x^2, \\qquad k = U''(0) > 0",
    },
    {
      type: "text",
      content:
        "The linear term vanishes because the slope is zero at the bottom, and $U''(0) > 0$ because it is a minimum. Then $F = -dU/dx = -kx$. So **every small oscillation about a stable equilibrium is SHM**, whatever the physics behind the valley: a spring, gravity on a pendulum, the electric force between atoms. That is why this one chapter pays off across the whole course.",
    },
    {
      type: "text",
      content:
        "**From force to the SHM condition.** Put $F = -kx$ into Newton's second law for a mass $m$:",
    },
    {
      type: "math",
      latex: "m\\frac{d^2x}{dt^2} = -kx \\quad\\Longrightarrow\\quad \\frac{d^2x}{dt^2} = -\\frac{k}{m}\\,x = -\\omega^2 x, \\qquad \\omega = \\sqrt{\\frac{k}{m}}",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The SHM test",
      content:
        "A motion is simple harmonic if and only if its acceleration is proportional to the displacement from a fixed point and directed towards that point: $a = -\\omega^2 x$.\nThe constant $\\omega$ (rad/s) is the **angular frequency**. It fixes the period, $T = \\dfrac{2\\pi}{\\omega}$, as 0.2 will show. For a spring-block system $\\omega = \\sqrt{k/m}$.",
    },
    {
      type: "text",
      content:
        "Watch the acceleration in the lab below. Press Play and compare the $x$–$t$ and $a$–$t$ strips.",
    },
    {
      type: "interactive",
      config: {
        component: "owt-wave-lab",
        mode: "shm",
        oscillator: "spring",
        amplitude: 0.1,
        omega: 6.28,
        graphs: ["x", "a"],
        sliders: ["amplitude", "omega"],
        caption:
          "A block on a smooth floor tied to a spring. The acceleration graph is the displacement graph flipped upside down and stretched by ω². Raise ω and watch the acceleration grow much faster than the motion.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: whenever the block is to the right of centre, $a$ is negative (pointing left), and whenever it is to the left, $a$ is positive. The acceleration is zero as the block passes through the middle and largest at the two ends, where the spring is most stretched or squashed. Doubling $\\omega$ multiplies the peak acceleration by four, because $a = -\\omega^2x$.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (which forces give SHM?).** A particle of mass 1 kg moves along the $x$-axis under each force below ($F$ in N, $x$ in m). Which motions are SHM, and what is $\\omega$?\n\n1. $F = -4x$: of the form $-kx$ with $k = 4$ N/m. SHM about $x = 0$ with $\\omega = \\sqrt{4/1} = 2$ rad/s.\n2. $F = -4x^3$: the force does point back towards $x = 0$, so the particle oscillates, but $F$ is not proportional to $x$. *Why this step:* the SHM test asks for $a \\propto -x$, not merely \"a force pointing back\". Oscillatory, **not** SHM.\n3. $F = -4(x - 2)$: put $X = x - 2$. Then $F = -4X$, so this is SHM about the point $x = 2$ with $\\omega = 2$ rad/s. *Why this step:* the equilibrium need not be at the origin; measure displacement from wherever the force vanishes.\n4. $F = +4x$: the force pushes the particle *away* from $x = 0$. The equilibrium is unstable and the particle runs off. No oscillation at all.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (JEE Main style).** A 0.5 kg block on a smooth horizontal surface is attached to a spring of stiffness $k = 200$ N/m. Find its angular frequency, frequency and period.\n\n1. $\\omega = \\sqrt{k/m} = \\sqrt{200/0.5} = \\sqrt{400} = 20$ rad/s. *Why this step:* the SHM condition gives $\\omega$ directly from the two things that matter, stiffness and inertia.\n2. $f = \\omega/2\\pi = 20/6.283 \\approx 3.18$ Hz.\n3. $T = 1/f = 2\\pi/20 = \\pi/10 \\approx 0.314$ s.\n\nNo gravity is involved here; if a later example needs $g$, we take $g = 10$ m/s² (the JEE convention) and say so.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (from a potential-energy curve).** A 2 kg particle moves in the potential $U(x) = x^4 - 2x^2$ (J, with $x$ in m). Find the equilibrium points and the period of small oscillations about the stable one.\n\n1. Equilibrium where $U'(x) = 4x^3 - 4x = 4x(x^2 - 1) = 0$: $x = 0$ or $x = \\pm1$. *Why this step:* equilibrium means zero force, and $F = -U'$.\n2. Curvature: $U''(x) = 12x^2 - 4$. At $x = 0$, $U'' = -4 < 0$ (a hilltop, unstable). At $x = \\pm1$, $U'' = 8 > 0$ (valleys, stable).\n3. Near $x = 1$ the valley behaves like a spring with $k = U''(1) = 8$ N/m. *Why this step:* this is exactly the Taylor argument above, $U \\approx U_{\\min} + \\tfrac12 k (x - 1)^2$.\n4. $\\omega = \\sqrt{8/2} = 2$ rad/s and $T = 2\\pi/2 = \\pi \\approx 3.14$ s.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (reading ω from an acceleration law).** A particle's acceleration is $a = -16x$ (SI). Find the period.\n\n1. Compare with $a = -\\omega^2 x$: $\\omega^2 = 16$, so $\\omega = 4$ rad/s.\n2. $T = 2\\pi/\\omega = \\pi/2 \\approx 1.57$ s. *Why this step:* once the motion passes the SHM test, the coefficient of $-x$ is all you need; mass and force constant never appear separately.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"any oscillation is SHM\"",
      content:
        "A particle under $F = -4x^3$ oscillates about $x = 0$, but it is not SHM. Near the centre the force is very weak (try $x = 0.1$: $F = -0.004$ N), so a small-amplitude oscillation is slow; a large one feels much stronger forces and is quicker. Its period **depends on amplitude**. The hallmark of true SHM is the opposite: the period is the same whatever the amplitude. A ball rolling in a V-shaped trough and a bouncing ball are also periodic but not SHM.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "The method in one line",
      content:
        "Displace by $x$ from equilibrium, write the net force (or torque), simplify to $-(\\text{something})\\,x$, and read off $\\omega^2 = \\text{something}/m$. You will use this for every oscillator in the chapter.",
    },
    {
      type: "quiz",
      id: "owt0-1-q1",
      variant: "concept",
      question: "Which force law produces simple harmonic motion?",
      options: [
        { text: "$F = -5x^2$", feedback: "This force points the same way (negative) on both sides of $x = 0$, so it cannot even restore from the negative side. It is not proportional to $x$ either." },
        { text: "$F = -5(x + 3)$", correct: true, feedback: "With $X = x + 3$ this is $F = -5X$: SHM about $x = -3$." },
        { text: "$F = 5x$", feedback: "The force points away from equilibrium, so the particle runs away. Unstable, no oscillation." },
        { text: "$F = -5x^3$", feedback: "It restores, so there is oscillation, but $F$ is not proportional to $x$. The period would depend on amplitude." },
      ],
    },
    {
      type: "quiz",
      id: "owt0-1-q2",
      variant: "practice",
      question: "A 2 kg block is attached to a spring of stiffness 800 N/m on a smooth floor. What is its period?",
      options: [
        { text: "$\\dfrac{\\pi}{10}$ s $\\approx 0.314$ s", correct: true, feedback: "$\\omega = \\sqrt{800/2} = 20$ rad/s, so $T = 2\\pi/20 = \\pi/10$ s." },
        { text: "$20$ s", feedback: "20 is $\\omega$ in rad/s. The period is $2\\pi/\\omega$." },
        { text: "$\\dfrac{\\pi}{200}$ s", feedback: "You used $\\omega = k/m = 400$ without the square root. $\\omega = \\sqrt{k/m}$." },
        { text: "$\\dfrac{1}{20}$ s", feedback: "That is $1/\\omega$. The period needs the $2\\pi$: $T = 2\\pi/\\omega$." },
      ],
      hint: "$\\omega = \\sqrt{k/m}$, then $T = 2\\pi/\\omega$.",
    },
    {
      type: "quiz",
      id: "owt0-1-q3",
      variant: "concept",
      question: "In SHM, where is the magnitude of the acceleration largest?",
      options: [
        { text: "At the extreme positions, where the displacement is largest.", correct: true, feedback: "$|a| = \\omega^2|x|$ is largest where $|x|$ is largest, at $x = \\pm A$." },
        { text: "It is the same everywhere, because $\\omega$ is constant.", feedback: "$\\omega$ is constant but $a = -\\omega^2 x$ still changes with $x$." },
        { text: "At the equilibrium position, where the speed is largest.", feedback: "At equilibrium the restoring force is zero, so the acceleration is zero there." },
      ],
    },
    {
      type: "quiz",
      id: "owt0-1-q4",
      variant: "practice",
      question: "A 0.5 kg particle moves in the potential $U = 9x^2$ J ($x$ in m). What is the angular frequency of its oscillation?",
      options: [
        { text: "$3$ rad/s", feedback: "Check $k$: $U = \\tfrac12 kx^2 = 9x^2$ means $k = 18$, and $\\sqrt{18/0.5} = 6$." },
        { text: "$3\\sqrt2$ rad/s", feedback: "That uses $k = 9$. Compare $U = 9x^2$ with $\\tfrac12 kx^2$: $k = 18$ N/m." },
        { text: "$6$ rad/s", correct: true, feedback: "$\\tfrac12 k = 9$ gives $k = 18$ N/m, so $\\omega = \\sqrt{18/0.5} = \\sqrt{36} = 6$ rad/s." },
        { text: "$36$ rad/s", feedback: "$36$ is $\\omega^2$. Take the square root." },
      ],
      hint: "Match $U = 9x^2$ with $U = \\tfrac12 kx^2$ first.",
    },
    {
      type: "quiz",
      id: "owt0-1-q5",
      variant: "concept",
      question: "Why is the period of true SHM independent of its amplitude?",
      options: [
        { text: "Because the particle moves at constant speed.", feedback: "The speed changes all the time: zero at the ends, largest at the centre." },
        { text: "It isn't: a larger swing always takes longer.", feedback: "That is true for forces like $-kx^3$ (or a pendulum at large angles), but not for $F = -kx$." },
        { text: "Because a larger amplitude means a proportionally larger restoring force, so the particle covers the longer path proportionally faster.", correct: true, feedback: "Double $A$ and every force, acceleration and speed doubles too; the extra distance is covered at double speed, so the time is unchanged." },
      ],
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "the-shm-equation",
  title: "0.2 · Shadow of a Turning Arrow",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "Put a peg on the rim of a turntable spinning at a steady rate and shine a lamp at it from the side, so the peg's shadow falls on a wall. The peg goes round a circle at constant speed; its shadow slides back and forth along a straight line, slow at the ends and fast in the middle. Now hang a block on a spring next to the shadow, pulled to the same amplitude, and tune the turntable: the two move in perfect step. SHM *is* the shadow of uniform circular motion.",
    },
    {
      type: "text",
      content:
        "Why? A peg moving round a circle of radius $A$ with angular speed $\\omega$ has a centripetal acceleration $\\omega^2 A$ pointing at the centre. Project that onto the horizontal axis: when the peg's shadow is at $x$, the horizontal part of the centripetal acceleration is $-\\omega^2 x$. That is exactly the SHM condition from 0.1. The shadow and the block obey the same equation, so they move identically.",
    },
    {
      type: "interactive",
      config: {
        component: "circle-to-wave",
        fn: "cos",
        maxRadians: 12.566,
        initialAngle: 0,
        caption:
          "The shadow of the turning arrow is x = A cos(ωt). The angle swept, ωt, runs along the horizontal axis of the graph.",
      },
    },
    {
      type: "text",
      content:
        "If the arrow starts at angle $\\phi$ and turns at $\\omega$, at time $t$ it points at angle $\\omega t + \\phi$ and its shadow is at",
    },
    { type: "math", latex: "x(t) = A\\cos(\\omega t + \\phi)" },
    {
      type: "callout",
      variant: "definition",
      title: "The language of SHM",
      content:
        "**Amplitude** $A$: the largest displacement (the radius of the reference circle).\n**Phase** $\\omega t + \\phi$: the angle of the reference arrow at time $t$. It tells you *where in the cycle* the particle is and which way it is moving.\n**Initial phase** (epoch) $\\phi$: the phase at $t = 0$.\n**Period** $T = \\dfrac{2\\pi}{\\omega}$: time for the arrow to turn once. **Frequency** $f = \\dfrac1T = \\dfrac{\\omega}{2\\pi}$ (Hz).",
    },
    {
      type: "text",
      content:
        "**Velocity and acceleration, two ways.** Differentiating $x = A\\cos(\\omega t + \\phi)$:",
    },
    {
      type: "math",
      latex:
        "v = \\frac{dx}{dt} = -A\\omega\\sin(\\omega t + \\phi), \\qquad a = \\frac{dv}{dt} = -A\\omega^2\\cos(\\omega t + \\phi) = -\\omega^2 x",
    },
    {
      type: "text",
      content:
        "The circle gives the same thing without calculus. The peg's velocity has size $A\\omega$ and is tangent to the circle; its horizontal part is $-A\\omega\\sin(\\omega t + \\phi)$. The peg's acceleration has size $A\\omega^2$ and points at the centre; its horizontal part is $-A\\omega^2\\cos(\\omega t + \\phi)$. And $a = -\\omega^2 x$ confirms that $A\\cos(\\omega t + \\phi)$ really does solve the SHM equation, for **any** $A$ and $\\phi$. Those two constants are fixed by how you start the motion.",
    },
    {
      type: "interactive",
      config: {
        component: "owt-wave-lab",
        mode: "shm",
        amplitude: 0.1,
        omega: 3.14,
        showReferenceCircle: true,
        graphs: ["x"],
        sliders: ["amplitude", "omega", "phase"],
        caption:
          "The reference arrow turns at ω; the block is its shadow. Change φ and the whole x–t curve slides sideways without changing shape.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the block always sits directly under the tip of the arrow. Changing $\\phi$ rotates where the arrow *starts*, which shifts the graph left or right in time; it does not move anything in space. Changing $\\omega$ spins the arrow faster and squeezes the graph. Changing $A$ enlarges the circle and stretches the graph vertically.",
    },
    {
      type: "text",
      content:
        "**Finding A and φ from how the motion starts.** At $t = 0$: $x_0 = A\\cos\\phi$ and $v_0 = -A\\omega\\sin\\phi$. Square and add (using $\\sin^2 + \\cos^2 = 1$):",
    },
    {
      type: "math",
      latex: "A = \\sqrt{x_0^2 + \\left(\\frac{v_0}{\\omega}\\right)^2}, \\qquad \\cos\\phi = \\frac{x_0}{A}, \\quad \\sin\\phi = -\\frac{v_0}{A\\omega}",
    },
    {
      type: "text",
      content:
        "Use both $\\cos\\phi$ and $\\sin\\phi$ to pick the right quadrant; $\\tan\\phi$ alone cannot tell $\\phi$ from $\\phi + \\pi$. Try matching a target motion by eye first:",
    },
    {
      type: "interactive",
      config: {
        component: "sinusoid-playground",
        fn: "cos",
        initialA: 1,
        initialB: 1,
        initialC: 0,
        initialD: 0,
        window: { xmin: -1, xmax: 7, ymin: -3, ymax: 3 },
        target: { a: 2, b: 1, c: 0.5, d: 0 },
        caption:
          "Match this motion: the target is x = 2 cos(t − 0.5). Here a is the amplitude, b is ω, and a shift c to the right means an initial phase φ = −bc.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the target needs $a = 2$ (amplitude 2), $b = 1$ ($\\omega = 1$ rad/s) and a shift of 0.5 to the right. In SHM language, $x = 2\\cos(t - 0.5)$ has $\\phi = -0.5$ rad: it reaches its maximum 0.5 s *later* than a motion with $\\phi = 0$. A negative initial phase is a delay.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (from the end to half-way).** How long does a particle in SHM take to go from $x = A$ to $x = A/2$?\n\n1. Start the clock at $x = A$, so $x = A\\cos\\omega t$. *Why this step:* choosing $t = 0$ at a known point makes $\\phi = 0$.\n2. Set $A\\cos\\omega t = A/2$: $\\cos\\omega t = \\tfrac12$, so $\\omega t = \\pi/3$.\n3. $t = \\dfrac{\\pi/3}{2\\pi/T} = \\dfrac{T}{6}$.\n\nOn the reference circle the arrow turns through $60^\\circ$ out of $360^\\circ$, which is one sixth of a turn.\n\n**Worked example 2 (from the middle to half-way).** From $x = 0$ to $x = A/2$.\n\n1. Start at the centre: $x = A\\sin\\omega t$.\n2. $\\sin\\omega t = \\tfrac12 \\Rightarrow \\omega t = \\pi/6$, so $t = T/12$.\n3. Check: the two halves of the quarter-period must add to $T/4$, and $T/12 + T/6 = 3T/12 = T/4$. ✓ *Why this step:* the particle is fast near the middle, so the first half of the distance takes half as long as the second.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (phase difference between two particles).** Two particles perform identical SHMs of amplitude $A$ along the same line. At some instant P is at $x = +A/2$ and Q is at $x = -A/2$, and both are moving in the $+x$ direction. Find their phase difference.\n\n1. Write each phase $\\theta$ from $x = A\\cos\\theta$ and $v = -A\\omega\\sin\\theta$. Moving in $+x$ means $v > 0$, so $\\sin\\theta < 0$. *Why this step:* the position gives $\\cos\\theta$, and only the direction of motion settles which of the two angles with that cosine is correct.\n2. P: $\\cos\\theta_P = \\tfrac12$ and $\\sin\\theta_P < 0$, so $\\theta_P = -\\pi/3$.\n3. Q: $\\cos\\theta_Q = -\\tfrac12$ and $\\sin\\theta_Q < 0$, so $\\theta_Q = -2\\pi/3$.\n4. Phase difference $= \\theta_P - \\theta_Q = -\\pi/3 + 2\\pi/3 = \\pi/3$. P leads Q by $60^\\circ$ even though they are a whole amplitude apart in space.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (initial conditions, JEE Main style).** A particle performs SHM with $\\omega = 2$ rad/s. At $t = 0$ it is at $x_0 = 0.03$ m moving with $v_0 = -0.08$ m/s. Write its equation of motion.\n\n1. Amplitude: $A = \\sqrt{0.03^2 + (0.08/2)^2} = \\sqrt{0.0009 + 0.0016} = \\sqrt{0.0025} = 0.05$ m.\n2. $\\cos\\phi = 0.03/0.05 = 0.6$ and $\\sin\\phi = -v_0/(A\\omega) = 0.08/0.1 = 0.8$. *Why this step:* both signs are positive, so $\\phi$ is in the first quadrant.\n3. $\\phi = \\arctan(4/3) \\approx 0.927$ rad $(53^\\circ)$.\n4. $x = 0.05\\cos(2t + 0.927)$ m. Check: $v(0) = -0.05 \\times 2 \\times 0.8 = -0.08$ m/s. ✓",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"half the amplitude takes a quarter of a quarter period, wherever it is\"",
      content:
        "SHM is not uniform motion. The particle takes $T/4$ to cover the full distance $A$ from centre to end, but the half near the centre takes $T/12$ and the half near the end takes $T/6$. Always go back to the reference circle: equal **angles** take equal times, equal distances do not.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"phase is an angle in space\"",
      content:
        "The pendulum bob may swing through $10^\\circ$, and the block on a spring does not turn at all, yet both have a phase. Phase is the angle of the **imaginary reference arrow**: a measure of time within the cycle. A phase difference of $\\pi/3$ means one motion is one sixth of a period ahead of the other, nothing about where they are.",
    },
    {
      type: "quiz",
      id: "owt0-2-q1",
      variant: "practice",
      question: "A particle moves as $x = 5\\cos(\\pi t + \\pi/3)$ cm ($t$ in s). Which set is correct?",
      options: [
        { text: "$A = 5$ cm, $T = 2$ s, $x(0) = 2.5$ cm", correct: true, feedback: "$\\omega = \\pi$ gives $T = 2\\pi/\\pi = 2$ s, and $x(0) = 5\\cos(\\pi/3) = 2.5$ cm." },
        { text: "$A = 5$ cm, $T = \\pi$ s, $x(0) = 2.5$ cm", feedback: "$\\pi$ is $\\omega$, not $T$. $T = 2\\pi/\\omega = 2$ s." },
        { text: "$A = 5$ cm, $T = 2$ s, $x(0) = 5$ cm", feedback: "$x(0) = 5\\cos(\\pi/3)$, not $5\\cos 0$." },
        { text: "$A = 10$ cm, $T = 2$ s, $x(0) = 2.5$ cm", feedback: "The amplitude is the coefficient, 5 cm; the path length from end to end is 10 cm." },
      ],
    },
    {
      type: "quiz",
      id: "owt0-2-q2",
      variant: "practice",
      question: "A particle in SHM with period $T$ starts at $x = +A$. How long does it take to first reach $x = -A/2$?",
      options: [
        { text: "$\\dfrac{3T}{8}$", feedback: "That treats the motion as uniform over the distance $1.5A$. Use the reference circle: equal angles, not equal distances, take equal times." },
        { text: "$\\dfrac{T}{6}$", feedback: "$T/6$ gets you to $+A/2$. You need to go on through the centre to $-A/2$." },
        { text: "$\\dfrac{5T}{12}$", feedback: "That is $T/4 + T/6$. From the centre to $-A/2$ takes only $T/12$, so the total is $T/4 + T/12 = T/3$." },
        { text: "$\\dfrac{T}{3}$", correct: true, feedback: "$\\cos\\omega t = -\\tfrac12$ first at $\\omega t = 2\\pi/3$, which is a third of a turn." },
      ],
      hint: "Solve $\\cos\\omega t = -\\tfrac12$ for the smallest positive $\\omega t$.",
    },
    {
      type: "quiz",
      id: "owt0-2-q3",
      variant: "concept",
      question: "Two SHMs are $x_1 = A\\cos\\omega t$ and $x_2 = A\\cos(\\omega t - \\pi/2)$. Which statement is true?",
      options: [
        { text: "$x_2$ reaches each maximum a quarter period before $x_1$.", feedback: "A negative initial phase is a lag: $x_2$ reaches its maximum when $\\omega t = \\pi/2$, later than $x_1$." },
        { text: "They are in phase, because they have the same $A$ and $\\omega$.", feedback: "Same amplitude and frequency, but the phases differ by $\\pi/2$." },
        { text: "$x_2$ reaches each maximum a quarter period after $x_1$.", correct: true, feedback: "A phase of $-\\pi/2$ is a delay of $\\frac{\\pi/2}{2\\pi}T = T/4$." },
        { text: "$x_2$ is displaced by $\\pi/2$ metres from $x_1$.", feedback: "Phase is not a distance. It measures where in the cycle each particle is." },
      ],
    },
    {
      type: "quiz",
      id: "owt0-2-q4",
      variant: "practice",
      question: "A particle in SHM has $\\omega = 4$ rad/s. At $t = 0$ it is at $x = 3$ cm moving with speed 16 cm/s. What is its amplitude?",
      options: [
        { text: "$3$ cm", feedback: "It is moving at $x = 3$ cm, so it will go further out; 3 cm cannot be the amplitude." },
        { text: "$5$ cm", correct: true, feedback: "$A = \\sqrt{3^2 + (16/4)^2} = \\sqrt{9 + 16} = 5$ cm." },
        { text: "$7$ cm", feedback: "You added $3 + 4$. Displacement and $v/\\omega$ are perpendicular sides of the reference triangle; combine them with Pythagoras." },
        { text: "$\\sqrt{265}$ cm", feedback: "You used $v_0 = 16$ without dividing by $\\omega$. The term is $(v_0/\\omega)^2 = 16$." },
      ],
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "velocity-acceleration-energy",
  title: "0.3 · Speed, Acceleration and Energy in SHM",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "A child on a swing is momentarily still at the top of each arc and moving fastest at the bottom. The swing's energy has not gone anywhere: at the top it is all stored (height, or for a spring, stretch), at the bottom it is all motion. This lesson turns that trade into formulas you can use at any point of the cycle.",
    },
    {
      type: "text",
      content:
        "**Speed as a function of position, route 1 (trigonometry).** From 0.2, $x = A\\cos\\theta$ and $v = -A\\omega\\sin\\theta$ with $\\theta = \\omega t + \\phi$. Eliminate $\\theta$ using $\\sin^2\\theta = 1 - \\cos^2\\theta$:",
    },
    {
      type: "math",
      latex: "v^2 = A^2\\omega^2\\sin^2\\theta = \\omega^2\\left(A^2 - A^2\\cos^2\\theta\\right) = \\omega^2(A^2 - x^2) \\quad\\Longrightarrow\\quad |v| = \\omega\\sqrt{A^2 - x^2}",
    },
    {
      type: "text",
      content:
        "**Route 2 (energy).** A spring stores $U = \\tfrac12 kx^2$. At the end points the block is at rest, so the total energy is $E = \\tfrac12 kA^2$. With no friction, $E$ is constant:",
    },
    {
      type: "math",
      latex: "\\tfrac12 mv^2 + \\tfrac12 kx^2 = \\tfrac12 kA^2 \\quad\\Longrightarrow\\quad v^2 = \\frac{k}{m}(A^2 - x^2) = \\omega^2(A^2 - x^2)",
    },
    {
      type: "callout",
      variant: "definition",
      title: "SHM at a glance",
      content:
        "Speed at displacement $x$: $|v| = \\omega\\sqrt{A^2 - x^2}$, largest at the centre, $v_{\\max} = A\\omega$.\nAcceleration: $a = -\\omega^2 x$, largest at the ends, $a_{\\max} = A\\omega^2$.\nEnergy: $KE = \\tfrac12 m\\omega^2(A^2 - x^2)$, $PE = \\tfrac12 m\\omega^2 x^2$, total $E = \\tfrac12 kA^2 = \\tfrac12 m\\omega^2A^2$, constant.",
    },
    {
      type: "interactive",
      config: {
        component: "owt-wave-lab",
        mode: "shm",
        amplitude: 0.1,
        omega: 3.14,
        graphs: ["x", "v", "a"],
        showEnergy: true,
        sliders: ["amplitude", "omega"],
        caption:
          "Step the time slider a quarter period at a time. Watch which graph peaks first, and how the KE and PE bars swap while the total stays level.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: $v$ peaks a quarter period *before* $x$ does, so velocity **leads** displacement by $\\pi/2$. The acceleration graph is the displacement graph upside down: $a$ and $x$ are $\\pi$ out of phase. When $x$ is at an end, $v = 0$ and $|a|$ is largest; at the centre, $|v|$ is largest and $a = 0$. The KE bar fills and empties **twice** per period, as does the PE bar, while the total bar never moves.",
    },
    {
      type: "text",
      content:
        "**Why energy oscillates at 2ω.** $KE = \\tfrac12 m A^2\\omega^2\\sin^2(\\omega t + \\phi) = \\tfrac14 m A^2\\omega^2\\big[1 - \\cos(2\\omega t + 2\\phi)\\big]$. The $\\cos 2\\theta$ identity doubles the frequency: KE is largest every time the block passes the centre, which happens twice per cycle (once each way). The same identity shows the average of $\\sin^2$ over a cycle is $\\tfrac12$, so the average KE and the average PE are both $E/2$.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (maxima from A and T).** A particle performs SHM with amplitude 4 cm and period $\\pi/5$ s. Find its maximum speed and maximum acceleration.\n\n1. $\\omega = 2\\pi/T = 2\\pi/(\\pi/5) = 10$ rad/s. *Why this step:* every SHM formula is written in $\\omega$, so convert the period first.\n2. $v_{\\max} = A\\omega = 0.04 \\times 10 = 0.4$ m/s.\n3. $a_{\\max} = A\\omega^2 = 0.04 \\times 100 = 4$ m/s².\n\n**Worked example 2 (speed at a point).** Amplitude 10 cm, $\\omega = 4$ rad/s. Find the speed at $x = 6$ cm.\n\n1. $|v| = \\omega\\sqrt{A^2 - x^2} = 4\\sqrt{100 - 36} = 4 \\times 8 = 32$ cm/s.\n2. Compare with $v_{\\max} = 40$ cm/s: at 60% of the amplitude the particle still has 80% of its top speed. *Why this step:* a quick sense check; SHM is fast over most of its path and brakes hard near the ends.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (where is KE = PE?).**\n\n1. Set $\\tfrac12 k(A^2 - x^2) = \\tfrac12 kx^2$.\n2. $A^2 = 2x^2$, so $x = \\pm A/\\sqrt2 \\approx \\pm 0.707A$. *Why this step:* each form of energy then holds exactly half of the fixed total $E$.\n3. Not at $A/2$: at $x = A/2$ the PE is $\\tfrac12 k(A/2)^2 = E/4$, only a quarter, and the KE is $3E/4$.\n\n**Worked example 4 (energy numbers, JEE Main style).** A 0.2 kg block on a spring of $k = 20$ N/m oscillates with amplitude 10 cm. Find the total energy and the kinetic energy at $x = 5$ cm.\n\n1. $E = \\tfrac12 kA^2 = \\tfrac12 \\times 20 \\times 0.01 = 0.1$ J.\n2. $PE$ at 5 cm $= \\tfrac12 \\times 20 \\times 0.0025 = 0.025$ J.\n3. $KE = 0.1 - 0.025 = 0.075$ J, which is $\\tfrac34 E$, as Worked example 3 predicted for $x = A/2$.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (two snapshots fix the motion).** A particle in SHM has speed 8 cm/s at $x = 3$ cm and 6 cm/s at $x = 4$ cm. Find $\\omega$ and $A$.\n\n1. Write $v^2 = \\omega^2(A^2 - x^2)$ twice: $64 = \\omega^2(A^2 - 9)$ and $36 = \\omega^2(A^2 - 16)$.\n2. Subtract to eliminate $A$: $28 = \\omega^2 \\times 7$, so $\\omega = 2$ rad/s. *Why this step:* two equations, two unknowns; subtraction kills $A^2$ in one move.\n3. Back-substitute: $A^2 = 9 + 64/4 = 25$, so $A = 5$ cm.\n4. Check the second point: $2\\sqrt{25 - 16} = 6$ cm/s. ✓",
    },
    {
      type: "table",
      headers: ["Position", "Speed", "Acceleration", "KE", "PE"],
      rows: [
        ["$x = 0$", "$A\\omega$ (max)", "$0$", "$E$", "$0$"],
        ["$x = \\pm A/2$", "$\\frac{\\sqrt3}{2}A\\omega$", "$\\mp\\frac12 A\\omega^2$", "$\\frac34 E$", "$\\frac14 E$"],
        ["$x = \\pm A/\\sqrt2$", "$\\frac{1}{\\sqrt2}A\\omega$", "$\\mp\\frac{1}{\\sqrt2}A\\omega^2$", "$\\frac12 E$", "$\\frac12 E$"],
        ["$x = \\pm A$", "$0$", "$\\mp A\\omega^2$ (max)", "$0$", "$E$"],
      ],
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"velocity and acceleration are maximum together\"",
      content:
        "They are a quarter cycle apart. Speed is largest at the centre, where the spring is relaxed and the force (hence acceleration) is zero. Acceleration is largest at the ends, where the block is momentarily at rest. Large acceleration means the velocity is *changing* fast, not that it is large.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"KE oscillates with the same frequency as x\"",
      content:
        "KE depends on $v^2$, and $v^2$ does not care about direction. It peaks at every pass through the centre, twice per period, so KE (and PE) oscillate at $2\\omega$, with period $T/2$. If $x$ has frequency 5 Hz, KE has frequency 10 Hz.",
    },
    {
      type: "quiz",
      id: "owt0-3-q1",
      variant: "practice",
      question: "A particle in SHM has amplitude 5 cm and period $0.2\\pi$ s. What is its maximum acceleration?",
      options: [
        { text: "$5$ m/s²", correct: true, feedback: "$\\omega = 2\\pi/(0.2\\pi) = 10$ rad/s and $a_{\\max} = 0.05 \\times 100 = 5$ m/s²." },
        { text: "$50$ m/s²", feedback: "Check the units: 5 cm is 0.05 m, not 0.5 m." },
        { text: "$0.05$ m/s²", feedback: "That is just the amplitude. Multiply by $\\omega^2 = 100$." },
        { text: "$0.5$ m/s²", feedback: "That is $v_{\\max} = A\\omega$. Acceleration needs $\\omega^2$." },
      ],
    },
    {
      type: "quiz",
      id: "owt0-3-q2",
      variant: "practice",
      question: "At what displacement is the kinetic energy of a particle in SHM three times its potential energy?",
      options: [
        { text: "$x = \\pm A/3$", feedback: "Energy goes as $x^2$, not $x$: at $A/3$, PE is $E/9$ and KE is $8E/9$, a ratio of 8." },
        { text: "$x = \\pm A/\\sqrt3$", feedback: "At $A/\\sqrt3$, $PE = E/3$ and $KE = 2E/3$: a ratio of 2, not 3." },
        { text: "$x = \\pm \\sqrt3 A/2$", feedback: "That is where PE is three times KE. Swap the roles." },
        { text: "$x = \\pm A/2$", correct: true, feedback: "$PE = E/4$ needs $x^2 = A^2/4$. Then $KE = 3E/4 = 3\\,PE$." },
      ],
      hint: "If KE $= 3$ PE, then PE is what fraction of $E$?",
    },
    {
      type: "quiz",
      id: "owt0-3-q3",
      variant: "concept",
      question: "The displacement of a particle has frequency 4 Hz. What is the frequency of its kinetic energy?",
      options: [
        { text: "4 Hz", feedback: "KE goes as $\\sin^2$, which repeats twice as often as $\\sin$." },
        { text: "2 Hz", feedback: "The energy oscillates faster, not slower: two KE peaks per cycle." },
        { text: "8 Hz", correct: true, feedback: "KE peaks at every pass through the centre, twice per period, so its frequency is $2f$." },
        { text: "KE does not oscillate; it is constant.", feedback: "The *total* energy is constant. KE and PE trade back and forth." },
      ],
    },
    {
      type: "quiz",
      id: "owt0-3-q4",
      variant: "practice",
      question: "A 0.5 kg block on a spring oscillates with amplitude 0.2 m and total energy 1 J. What is its maximum speed?",
      options: [
        { text: "$0.4$ m/s", feedback: "The amplitude is not needed here; set all of $E$ equal to KE at the centre." },
        { text: "$2$ m/s", correct: true, feedback: "At the centre all the energy is kinetic: $\\tfrac12 \\times 0.5 \\times v^2 = 1$, so $v = 2$ m/s." },
        { text: "$4$ m/s", feedback: "$\\tfrac12 m v^2 = 1$ gives $v^2 = 4$, so $v = 2$, not 4." },
        { text: "$\\sqrt2$ m/s", feedback: "You dropped the $\\tfrac12$: $mv^2 = 1$ would give $\\sqrt2$. Use $\\tfrac12 mv^2 = 1$." },
      ],
    },
    {
      type: "quiz",
      id: "owt0-3-q5",
      variant: "concept",
      question: "In SHM, what is the phase relation between velocity and displacement?",
      options: [
        { text: "Velocity leads displacement by $\\pi/2$", correct: true, feedback: "$v = -A\\omega\\sin\\theta = A\\omega\\cos(\\theta + \\pi/2)$: the velocity reaches each peak a quarter period earlier." },
        { text: "Velocity lags displacement by $\\pi/2$", feedback: "Differentiate: $-\\sin\\theta = \\cos(\\theta + \\pi/2)$, a lead, not a lag." },
        { text: "Out of phase by $\\pi$", feedback: "That is the relation between acceleration and displacement." },
        { text: "In phase", feedback: "At maximum displacement the velocity is zero, so they cannot peak together." },
      ],
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "spring-systems",
  title: "0.4 · Springs in Every Arrangement",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "Car suspensions put springs side by side; a long spring can be thought of as two short ones end to end; a toy on a bungee hangs vertically. Every such system still gives $T = 2\\pi\\sqrt{m/k}$. The whole skill is finding the right $k$, the **effective spring constant**, and this lesson builds it from two ideas: \"same force\" and \"same extension\".",
    },
    {
      type: "text",
      content:
        "**A vertical spring.** Hang mass $m$ on a spring. At equilibrium the spring is stretched by $x_0$ with $kx_0 = mg$. Now measure displacement $y$ downward from that *new* equilibrium. The net force is",
    },
    { type: "math", latex: "F = mg - k(x_0 + y) = \\underbrace{mg - kx_0}_{=\\,0} - ky = -ky" },
    {
      type: "text",
      content:
        "Gravity has only moved the centre of the oscillation; the restoring force about that centre is still $-ky$, so $T = 2\\pi\\sqrt{m/k}$ exactly as on a table. A neat corollary: since $m/k = x_0/g$, the period is $T = 2\\pi\\sqrt{x_0/g}$, readable from the static stretch alone.",
    },
    {
      type: "text",
      content:
        "**Springs in parallel.** Two springs $k_1$, $k_2$ side by side, both attached to the block. Displace it by $x$: both stretch by the **same** $x$, and their forces add, $F = -(k_1 + k_2)x$. So $k_{\\text{eff}} = k_1 + k_2$. A block on a table *between* two springs, one on each side, is also a parallel arrangement: a displacement $x$ stretches one and compresses the other by $x$, and both push the block back.",
    },
    {
      type: "text",
      content:
        "**Springs in series.** End to end, the **same** force $F$ passes through both (a massless spring transmits its tension). Their extensions $F/k_1$ and $F/k_2$ add:",
    },
    {
      type: "math",
      latex: "x = \\frac{F}{k_1} + \\frac{F}{k_2} = \\frac{F}{k_{\\text{eff}}} \\quad\\Longrightarrow\\quad \\frac{1}{k_{\\text{eff}}} = \\frac{1}{k_1} + \\frac{1}{k_2}, \\qquad k_{\\text{eff}} = \\frac{k_1k_2}{k_1 + k_2}",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Effective spring constants",
      content:
        "**Parallel** (same extension, forces add): $k_{\\text{eff}} = k_1 + k_2$. Stiffer than either.\n**Series** (same force, extensions add): $\\dfrac{1}{k_{\\text{eff}}} = \\dfrac{1}{k_1} + \\dfrac{1}{k_2}$. Softer than either.\n**Cut spring:** $k\\ell$ is constant for a uniform spring, so a piece of length $\\ell/n$ has stiffness $nk$.",
    },
    {
      type: "text",
      content:
        "**Why cutting stiffens.** Think of a spring of length $\\ell$ as two halves in series. The same force stretches each half by half the total, so each half has twice the stiffness: $k_{\\text{half}} = 2k$ (check: two $2k$ springs in series give $k$). In general $k \\propto 1/\\ell$.",
    },
    {
      type: "text",
      content:
        "**Two bodies on one spring (JEE Advanced).** Masses $m_1$ and $m_2$ joined by a spring $k$ on a smooth floor, pulled apart and released. No external horizontal force acts, so the centre of mass stays put and the two masses oscillate in opposite directions. Writing Newton's law for each and subtracting gives the equation for the stretch $x$:",
    },
    {
      type: "math",
      latex: "\\ddot x = -k\\left(\\frac{1}{m_1} + \\frac{1}{m_2}\\right)x = -\\frac{k}{\\mu}x, \\qquad \\mu = \\frac{m_1m_2}{m_1 + m_2}, \\qquad T = 2\\pi\\sqrt{\\frac{\\mu}{k}}",
    },
    {
      type: "interactive",
      config: {
        component: "owt-wave-lab",
        mode: "shm",
        amplitude: 0.1,
        omega: 6.28,
        mass: 1,
        graphs: ["x"],
        sliders: ["mass", "omega", "amplitude"],
        caption:
          "The mass slider changes the inertia; ω encodes √(k/m). Change the amplitude and check the period readout: it never moves.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: however far you pull the block, the period stays the same. With $\\omega$ held fixed, changing the mass changes the stored energy (since $k = m\\omega^2$ changes) but not the timing. The period is set by $m$ and $k$ alone, never by $A$.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (vertical spring, JEE Main).** A block hung from a spring stretches it by 5 cm at equilibrium. It is pulled down a little and released. Find the period. Take $g = 10$ m/s².\n\n1. At equilibrium $kx_0 = mg$, so $m/k = x_0/g = 0.05/10 = 0.005$ s². *Why this step:* neither $m$ nor $k$ is given, but only their ratio matters.\n2. $T = 2\\pi\\sqrt{0.005} = 2\\pi \\times 0.0707 \\approx 0.444$ s.\n\n**Worked example 2 (series and parallel).** Springs of 200 N/m and 300 N/m carry a 2 kg block. Find the period (a) in parallel, (b) in series.\n\n1. Parallel: $k = 500$ N/m, $T = 2\\pi\\sqrt{2/500} = 2\\pi \\times 0.0632 \\approx 0.397$ s.\n2. Series: $k = \\dfrac{200 \\times 300}{500} = 120$ N/m, $T = 2\\pi\\sqrt{2/120} = 2\\pi \\times 0.129 \\approx 0.811$ s.\n3. Ratio of periods $\\sqrt{500/120} \\approx 2.04$. *Why this step:* the series pair is softer, so it must be slower; a check on which formula went where.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (block between two springs).** A 0.5 kg block on a smooth table is attached to two walls by springs of 100 N/m each, one on either side. Find $T$.\n\n1. Push the block right by $x$: the left spring stretches by $x$ and pulls left with $100x$; the right spring compresses by $x$ and pushes left with $100x$.\n2. Net force $-200x$, so $k_{\\text{eff}} = 200$ N/m. *Why this step:* both springs share the same displacement, the signature of a parallel arrangement, even though they sit on opposite sides.\n3. $\\omega = \\sqrt{200/0.5} = 20$ rad/s and $T = 2\\pi/20 \\approx 0.314$ s.\n\n**Worked example 4 (spring cut in the ratio 1:2).** A spring of stiffness 90 N/m is cut into two pieces with lengths in the ratio 1:2. Find their stiffnesses, and the stiffness when the pieces are used in parallel.\n\n1. Lengths $\\ell/3$ and $2\\ell/3$. With $k\\ell$ constant: $k_1 = 3 \\times 90 = 270$ N/m and $k_2 = \\tfrac32 \\times 90 = 135$ N/m.\n2. Check: in series, $\\dfrac{270 \\times 135}{405} = 90$ N/m, the original. ✓\n3. In parallel: $270 + 135 = 405$ N/m, $4.5$ times the original.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (two blocks, JEE Advanced).** Blocks of 1 kg and 2 kg on a smooth floor are joined by a spring of 300 N/m, pulled apart and released. Find the period.\n\n1. Reduced mass $\\mu = \\dfrac{1 \\times 2}{1 + 2} = \\dfrac23$ kg. *Why this step:* each block feels the same spring force, and the stretch changes at the rate set by both inertias together.\n2. $\\omega = \\sqrt{300/(2/3)} = \\sqrt{450} \\approx 21.2$ rad/s.\n3. $T = 2\\pi/21.2 \\approx 0.296$ s. Sanity check: if the 2 kg block were bolted down ($m_2 \\to \\infty$), $\\mu \\to 1$ kg and $T = 2\\pi\\sqrt{1/300} = 0.363$ s, slower, as expected.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a vertical spring oscillates with a different period because of gravity\"",
      content:
        "Gravity is a constant force. A constant force shifts the equilibrium (by $mg/k$) but adds nothing proportional to the displacement, so it cannot change $k$ and cannot change $T$. The same is true on a smooth incline: the block oscillates about a shifted point with the same $T = 2\\pi\\sqrt{m/k}$, whatever the angle.",
    },
    {
      type: "quiz",
      id: "owt0-4-q1",
      variant: "practice",
      question: "Two identical springs of stiffness $k$ support a mass $m$. What is the ratio $T_{\\text{series}} : T_{\\text{parallel}}$?",
      options: [
        { text: "$4 : 1$", feedback: "That is the ratio of stiffnesses. The period goes as $1/\\sqrt k$." },
        { text: "$1 : 2$", feedback: "The series pair is softer, so it is slower: its period is the larger one." },
        { text: "$\\sqrt2 : 1$", feedback: "Each arrangement differs from a single spring by $\\sqrt2$ in period, so they differ from each other by 2." },
        { text: "$2 : 1$", correct: true, feedback: "Series gives $k/2$, parallel gives $2k$. $T \\propto 1/\\sqrt{k}$, so the ratio is $\\sqrt{2k/(k/2)} = \\sqrt4 = 2$." },
      ],
    },
    {
      type: "quiz",
      id: "owt0-4-q2",
      variant: "practice",
      question: "A spring of stiffness $k$ is cut into three equal pieces. Two of them are joined in parallel. What is the stiffness of the combination?",
      options: [
        { text: "$\\tfrac32 k$", feedback: "That is two $3k$ pieces in series. The question joins them in parallel." },
        { text: "$2k$", feedback: "You forgot that cutting changes the stiffness. Each third has $3k$." },
        { text: "$6k$", correct: true, feedback: "Each piece has $3k$; in parallel, $3k + 3k = 6k$." },
        { text: "$\\tfrac23 k$", feedback: "That treats each piece as having $k/3$. Shorter springs are *stiffer*: $k\\ell$ is constant." },
      ],
    },
    {
      type: "quiz",
      id: "owt0-4-q3",
      variant: "concept",
      question: "A block on a vertical spring has period 0.5 s on Earth. The set-up is taken to the Moon, where $g$ is about one sixth. What is the new period?",
      options: [
        { text: "$0.5\\sqrt6$ s", feedback: "That would be right for a simple pendulum, whose restoring force comes from gravity. A spring's comes from its stiffness." },
        { text: "$0.5/\\sqrt6$ s", feedback: "Gravity sets only the equilibrium position of a spring, not its period." },
        { text: "0.5 s", correct: true, feedback: "$T = 2\\pi\\sqrt{m/k}$ has no $g$ in it. The equilibrium stretch is smaller on the Moon, but the period is unchanged." },
      ],
    },
    {
      type: "quiz",
      id: "owt0-4-q4",
      variant: "practice",
      question: "Hanging a mass on a spring stretches it by 10 cm. What is the period of vertical oscillations? ($g = 10$ m/s²)",
      options: [
        { text: "$\\dfrac{\\pi}{5}$ s $\\approx 0.63$ s", correct: true, feedback: "$T = 2\\pi\\sqrt{x_0/g} = 2\\pi\\sqrt{0.01} = 2\\pi \\times 0.1 = \\pi/5$ s." },
        { text: "$2\\pi$ s", feedback: "Convert 10 cm to 0.1 m: $\\sqrt{0.1/10} = 0.1$." },
        { text: "$0.1$ s", feedback: "$\\sqrt{x_0/g} = 0.1$ s is only part of it; multiply by $2\\pi$." },
        { text: "It cannot be found without the mass.", feedback: "$m/k = x_0/g$, so the stretch alone fixes the period." },
      ],
    },
    {
      type: "quiz",
      id: "owt0-4-q5",
      variant: "practice",
      question: "Two 1 kg blocks on a smooth floor are joined by a spring of stiffness 200 N/m. What is the angular frequency of their oscillation?",
      options: [
        { text: "$10$ rad/s", feedback: "That uses $m = 2$ kg, the total mass. The right inertia is the reduced mass, 0.5 kg." },
        { text: "$\\sqrt{200} \\approx 14.1$ rad/s", feedback: "That treats one block as fixed. When both move, the effective mass is $\\mu = 0.5$ kg." },
        { text: "$400$ rad/s", feedback: "$400$ is $\\omega^2$. Take the square root." },
        { text: "$20$ rad/s", correct: true, feedback: "$\\mu = \\tfrac{1 \\times 1}{2} = 0.5$ kg and $\\omega = \\sqrt{200/0.5} = 20$ rad/s." },
      ],
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "pendulums",
  title: "0.5 · The Simple Pendulum and Its Cousins",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "Galileo is said to have timed a swinging chandelier in Pisa cathedral against his pulse and found that big swings and small swings took the same time. Grandfather clocks rely on it. But a pendulum has no spring, so where does its $k$ come from? From gravity, and only for small swings, which is exactly the Taylor argument of 0.1 in a new setting.",
    },
    {
      type: "text",
      content:
        "**The derivation.** A bob of mass $m$ hangs on a light string of length $L$. When the string makes angle $\\theta$ with the vertical, the tension is along the string and does no restoring; gravity's component along the arc is $-mg\\sin\\theta$ (pointing back towards the bottom). The bob's position along the arc is $s = L\\theta$, so Newton's law along the arc reads",
    },
    { type: "math", latex: "mL\\ddot\\theta = -mg\\sin\\theta \\quad\\xrightarrow{\\ \\sin\\theta\\,\\approx\\,\\theta\\ }\\quad \\ddot\\theta = -\\frac{g}{L}\\,\\theta" },
    {
      type: "text",
      content:
        "That is the SHM test with $\\omega^2 = g/L$. Equivalently, in torque form about the pivot, $\\tau = -mgL\\sin\\theta \\approx -mgL\\theta$ and $I = mL^2$, giving the same $\\omega$. Notice that $m$ cancels: gravity's pull and the bob's inertia both scale with mass.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Simple pendulum (small angles)",
      content:
        "$T = 2\\pi\\sqrt{\\dfrac{L}{g}}$, independent of the mass and (for small angles) of the amplitude.\nA **seconds pendulum** has $T = 2$ s (one second per swing): $L = gT^2/4\\pi^2 \\approx 0.99$ m with $g = 9.8$ m/s², about a metre.",
    },
    {
      type: "text",
      content:
        "**How small is small?** The approximation replaces $\\sin\\theta$ by $\\theta$ (in radians). The table shows how good that is.",
    },
    {
      type: "table",
      headers: ["$\\theta$ (degrees)", "$\\theta$ (rad)", "$\\sin\\theta$", "Error in using $\\theta$"],
      rows: [
        ["$5^\\circ$", "$0.0873$", "$0.0872$", "$0.13\\%$"],
        ["$10^\\circ$", "$0.1745$", "$0.1736$", "$0.51\\%$"],
        ["$15^\\circ$", "$0.2618$", "$0.2588$", "$1.2\\%$"],
        ["$20^\\circ$", "$0.3491$", "$0.3420$", "$2.1\\%$"],
      ],
    },
    {
      type: "text",
      content:
        "Below about $10^\\circ$ the error is under one percent, and the period changes by even less. At large angles the restoring force $mg\\sin\\theta$ is *weaker* than $mg\\theta$, so a big swing takes slightly longer.",
    },
    {
      type: "interactive",
      config: {
        component: "owt-wave-lab",
        mode: "shm",
        oscillator: "pendulum",
        length: 1,
        angleAmplitude: 10,
        mass: 1,
        graphs: ["x"],
        sliders: ["length", "angleAmplitude", "mass"],
        caption:
          "A simple pendulum with g = 10 m/s². Try each slider in turn and watch the period readout.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the mass slider changes the energy readouts but not the period. The amplitude slider does not change it either: the lab uses the small-angle model, and in a real pendulum a $10^\\circ$ or $20^\\circ$ swing is slower by well under 1%. Only the length does, and quadrupling $L$ doubles $T$.",
    },
    {
      type: "text",
      content:
        "**Effective gravity.** The pendulum's restoring force comes from whatever steady force would make it hang still. In an accelerating frame add the pseudo-force $-m\\vec a$ to gravity and use $g_{\\text{eff}} = |\\vec g - \\vec a|$, where the bob hangs along $\\vec g_{\\text{eff}}$:",
    },
    {
      type: "table",
      headers: ["Situation", "$g_{\\text{eff}}$", "Effect on $T$"],
      rows: [
        ["Lift accelerating up at $a$", "$g + a$", "shorter"],
        ["Lift accelerating down at $a$", "$g - a$", "longer (infinite in free fall)"],
        ["Car accelerating horizontally at $a$", "$\\sqrt{g^2 + a^2}$, hangs tilted at $\\tan^{-1}(a/g)$", "shorter"],
        ["Bob of density $\\rho$ in a liquid of density $\\sigma$", "$g\\left(1 - \\sigma/\\rho\\right)$ (buoyancy)", "longer"],
      ],
    },
    {
      type: "text",
      content:
        "**The physical pendulum.** A rigid body swinging about a pivot at distance $d$ from its centre of mass feels torque $-mgd\\sin\\theta \\approx -mgd\\,\\theta$. With moment of inertia $I$ about the pivot, $I\\ddot\\theta = -mgd\\,\\theta$, so",
    },
    { type: "math", latex: "T = 2\\pi\\sqrt{\\frac{I}{mgd}}" },
    {
      type: "text",
      content:
        "For a simple pendulum $I = mL^2$, $d = L$, and this reduces to $2\\pi\\sqrt{L/g}$. ✓ (Moments of inertia are Mechanics II material; here you only need the result for a uniform rod about one end, $I = \\tfrac13 mL^2$.)",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (basic period).** Find the period of a 1 m pendulum. Take $g = 10$ m/s².\n\n1. $T = 2\\pi\\sqrt{1/10} = 2\\pi \\times 0.316 \\approx 1.99$ s. Very nearly a seconds pendulum.\n\n**Worked example 2 (pendulum in a lift, JEE Main).** The same pendulum is in a lift accelerating upward at 2 m/s². Find the new period.\n\n1. In the lift frame the bob feels $mg$ down and a pseudo-force $ma$ down, so $g_{\\text{eff}} = 10 + 2 = 12$ m/s². *Why this step:* the tension at rest must now balance $m(g + a)$, so gravity is effectively stronger.\n2. $T' = 2\\pi\\sqrt{1/12} \\approx 1.81$ s.\n3. Ratio $T'/T = \\sqrt{10/12} \\approx 0.913$: the clock runs fast.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (accelerating car).** A 1 m pendulum hangs in a car accelerating at 7.5 m/s² on a level road. Find the tilt of the string at rest and the period ($g = 10$ m/s²).\n\n1. In the car frame: $g$ down and $a = 7.5$ backward. $g_{\\text{eff}} = \\sqrt{10^2 + 7.5^2} = \\sqrt{156.25} = 12.5$ m/s².\n2. The string hangs along $\\vec g_{\\text{eff}}$, tilted back at $\\tan^{-1}(7.5/10) \\approx 37^\\circ$ from the vertical.\n3. $T = 2\\pi\\sqrt{1/12.5} = 2\\pi \\times 0.283 \\approx 1.78$ s. *Why this step:* small oscillations happen about the tilted equilibrium, with $g_{\\text{eff}}$ playing the role of $g$.\n\n**Worked example 4 (bob in water).** A pendulum with a bob of density 8000 kg/m³ swings in water (1000 kg/m³). By what factor does its period change? (Ignore drag.)\n\n1. Buoyancy reduces the net downward force to $mg(1 - 1000/8000) = \\tfrac78 mg$, but the inertia is still $m$. So $g_{\\text{eff}} = \\tfrac78 g$.\n2. $T'/T = \\sqrt{g/g_{\\text{eff}}} = \\sqrt{8/7} \\approx 1.069$: about 7% slower.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (rod pivoted at one end).** A uniform rod of length 1.5 m swings about one end. Find its period ($g = 10$ m/s²).\n\n1. $I = \\tfrac13 mL^2$, $d = L/2$. *Why this step:* gravity acts at the centre of mass, half-way down the rod.\n2. $T = 2\\pi\\sqrt{\\dfrac{mL^2/3}{mgL/2}} = 2\\pi\\sqrt{\\dfrac{2L}{3g}} = 2\\pi\\sqrt{\\dfrac{3}{30}} = 2\\pi\\sqrt{0.1} \\approx 1.99$ s.\n3. The rod behaves like a simple pendulum of length $2L/3 = 1$ m, *not* $L/2$: mass near the pivot adds little inertia.\n\n**Worked example 6 (clock in summer, link to 4.2).** A pendulum clock keeps correct time at 15 °C. Its brass rod has linear expansion coefficient $\\alpha = 1.2 \\times 10^{-5}$ /°C. How many seconds does it lose per day at 35 °C?\n\n1. $L' = L(1 + \\alpha\\Delta\\theta)$, and $T \\propto \\sqrt L$, so $T' \\approx T(1 + \\tfrac12\\alpha\\Delta\\theta)$. *Why this step:* $\\sqrt{1 + \\epsilon} \\approx 1 + \\epsilon/2$ for small $\\epsilon$.\n2. Fractional change $\\tfrac12 \\times 1.2 \\times 10^{-5} \\times 20 = 1.2 \\times 10^{-4}$.\n3. Each tick takes longer, so the clock is slow by $86400 \\times 1.2 \\times 10^{-4} \\approx 10.4$ s per day.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a heavier bob swings faster\"",
      content:
        "A heavier bob is pulled harder by gravity, but it is harder to accelerate in exactly the same proportion; $m$ cancels from $mL\\ddot\\theta = -mg\\theta$. A lead bob and a wooden bob on equal strings keep step (until air drag, which matters more for the light one, spoils it).",
    },
    {
      type: "quiz",
      id: "owt0-5-q1",
      variant: "practice",
      question: "A pendulum has period 2 s. Its length is made four times as long. What is the new period?",
      options: [
        { text: "$2\\sqrt2$ s", feedback: "That would be for doubling the length. Four times the length doubles the period." },
        { text: "8 s", feedback: "$T \\propto \\sqrt L$, not $L$." },
        { text: "4 s", correct: true, feedback: "$T \\propto \\sqrt L$, so $\\times 4$ in length gives $\\times 2$ in period." },
        { text: "1 s", feedback: "A longer pendulum is slower, not faster." },
      ],
    },
    {
      type: "quiz",
      id: "owt0-5-q2",
      variant: "practice",
      question: "A pendulum of period $T$ is in a lift that accelerates downward at $g/2$. What is its period now?",
      options: [
        { text: "$T$, because the length has not changed", feedback: "The period depends on $g_{\\text{eff}}$, and that has halved." },
        { text: "$T\\sqrt2$", correct: true, feedback: "$g_{\\text{eff}} = g - g/2 = g/2$, so $T' = T\\sqrt{g/(g/2)} = \\sqrt2\\,T$." },
        { text: "$T/\\sqrt2$", feedback: "Accelerating *down* makes gravity feel weaker, so the pendulum slows." },
        { text: "$T\\sqrt{2/3}$", feedback: "That uses $g + g/2$. Downward acceleration subtracts." },
      ],
    },
    {
      type: "quiz",
      id: "owt0-5-q3",
      variant: "concept",
      question: "Two pendulums have the same length. One has a 1 kg iron bob, the other a 100 g wooden bob of the same size. In vacuum, which has the shorter period?",
      options: [
        { text: "The wooden one, because it is lighter and easier to move", feedback: "It is easier to move, but gravity pulls it less, in the same ratio." },
        { text: "Neither: the periods are equal", correct: true, feedback: "$T = 2\\pi\\sqrt{L/g}$ has no mass in it." },
        { text: "The iron one, because gravity pulls it harder", feedback: "Gravity pulls it ten times harder, but it has ten times the inertia too." },
      ],
    },
    {
      type: "quiz",
      id: "owt0-5-q4",
      variant: "practice",
      question: "A uniform rod of length 0.6 m swings about a pivot at one end. What is its period? ($g = 10$ m/s²)",
      options: [
        { text: "$2\\pi\\sqrt{0.06}$ s $\\approx 1.54$ s", feedback: "That treats it as a simple pendulum of length 0.6 m. The equivalent length is $2L/3 = 0.4$ m." },
        { text: "$2\\pi\\sqrt{0.03}$ s $\\approx 1.09$ s", feedback: "That puts all the mass at the centre ($L/2$). The rod's inertia about the end is $\\tfrac13 mL^2$, not $m(L/2)^2$." },
        { text: "$0.2\\pi$ s", feedback: "Recheck: $\\sqrt{0.04} = 0.2$, and $T = 2\\pi \\times 0.2 = 0.4\\pi$." },
        { text: "$0.4\\pi$ s $\\approx 1.26$ s", correct: true, feedback: "$T = 2\\pi\\sqrt{2L/3g} = 2\\pi\\sqrt{0.4/10} = 2\\pi \\times 0.2$." },
      ],
    },
    {
      type: "quiz",
      id: "owt0-5-q5",
      variant: "practice",
      question: "A pendulum hangs in a truck accelerating horizontally at $g$. Its period at rest was $T$. What is it now?",
      options: [
        { text: "$T$", feedback: "The horizontal acceleration adds a pseudo-force, which makes the effective gravity stronger." },
        { text: "$T\\cdot 2^{1/4}$", feedback: "Stronger effective gravity makes the pendulum faster, not slower." },
        { text: "$T/2^{1/4}$", correct: true, feedback: "$g_{\\text{eff}} = \\sqrt{g^2 + g^2} = \\sqrt2\\,g$, and $T \\propto g_{\\text{eff}}^{-1/2}$, so $T' = T/2^{1/4} \\approx 0.84T$." },
        { text: "$T/\\sqrt2$", feedback: "That uses $g_{\\text{eff}} = 2g$. The two accelerations are perpendicular, so they add as $\\sqrt{g^2 + g^2}$." },
      ],
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "combining-shms",
  title: "0.6 · Adding SHMs and Spotting Hidden Ones",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "A loudspeaker cone driven by two signals of the same frequency moves with a single combined motion. What is its amplitude? And away from springs and pendulums, how do you recognise SHM hiding in a U-tube of water, a floating log, or a ball dropped down a tunnel through the Earth? The reference circle answers the first question; the method of 0.1 answers the second.",
    },
    {
      type: "text",
      content:
        "**Adding two SHMs of the same ω along one line.** Let $x_1 = A_1\\cos(\\omega t)$ and $x_2 = A_2\\cos(\\omega t + \\delta)$. Each is the shadow of an arrow turning at $\\omega$. The two arrows turn together, keeping the angle $\\delta$ between them, so their **vector sum** is a single arrow of fixed length turning at the same $\\omega$. The shadow of a sum is the sum of shadows, so $x_1 + x_2$ is itself SHM, with amplitude given by the law of cosines (the parallelogram law from vectors):",
    },
    {
      type: "math",
      latex: "A = \\sqrt{A_1^2 + A_2^2 + 2A_1A_2\\cos\\delta}, \\qquad \\tan\\alpha = \\frac{A_2\\sin\\delta}{A_1 + A_2\\cos\\delta}",
    },
    {
      type: "text",
      content:
        "Here $\\alpha$ is the initial phase of the resultant, measured from the first arrow. Special cases: $\\delta = 0$ gives $A_1 + A_2$ (arrows aligned); $\\delta = \\pi$ gives $|A_1 - A_2|$ (arrows opposed); $\\delta = \\pi/2$ gives $\\sqrt{A_1^2 + A_2^2}$.",
    },
    {
      type: "interactive",
      config: {
        component: "owt-wave-lab",
        mode: "superposition",
        amplitude: 0.15,
        amplitude2: 0.15,
        wavelength: 1,
        frequency: 1,
        phase2: 0,
        sliders: ["phase2", "amplitude2"],
        caption:
          "A preview of Chapter 1: two waves and their sum. Every point on the string performs two SHMs at once, so the resultant amplitude readout is exactly the phasor sum above.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: with $\\phi_2 = 0$ the resultant amplitude is the sum, 0.30 m. Slide $\\phi_2$ to $\\pi$ and it collapses to $|A_1 - A_2|$, zero when the amplitudes are equal. At $\\phi_2 = \\pi/2$ it is $\\sqrt{0.15^2 + 0.15^2} \\approx 0.21$ m, not 0.30 m.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (one SHM in disguise).** Write $x = 3\\sin\\omega t + 4\\cos\\omega t$ as a single SHM.\n\n1. $4\\cos\\omega t = 4\\sin(\\omega t + \\pi/2)$: the two terms are SHMs with $\\delta = \\pi/2$. *Why this step:* both terms must be in the same form before the phase difference can be read off.\n2. $A = \\sqrt{9 + 16 + 0} = 5$.\n3. $\\tan\\alpha = 4/3$, so $\\alpha \\approx 53^\\circ$: $x = 5\\sin(\\omega t + 53^\\circ)$.\n\n**Worked example 2.** Two SHMs of amplitudes 3 cm and 4 cm have a phase difference of $\\pi/3$. Find the resultant amplitude.\n\n1. $A^2 = 9 + 16 + 2(3)(4)\\cos 60^\\circ = 25 + 12 = 37$.\n2. $A = \\sqrt{37} \\approx 6.08$ cm, between $4 - 3 = 1$ and $4 + 3 = 7$, as it must be.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Method: finding a hidden SHM",
      content:
        "1. Find the equilibrium (net force zero).\n2. Displace by a small $x$ and write the **net** restoring force (or torque), keeping only first-order terms in $x$.\n3. Simplify to $F = -k_{\\text{eff}}\\,x$.\n4. Identify the **total mass that moves**, $m$, then $\\omega = \\sqrt{k_{\\text{eff}}/m}$.",
    },
    {
      type: "text",
      content:
        "**Liquid in a U-tube.** A column of liquid of total length $L$, density $\\rho$, cross-section $A$. Push one side down by $x$: the other rises by $x$, so the level difference is $2x$, and the unbalanced column weighs $\\rho A(2x)g$. The moving mass is the whole column, $\\rho AL$. So $\\rho AL\\,\\ddot x = -2\\rho Ag\\,x$ and",
    },
    { type: "math", latex: "\\omega^2 = \\frac{2g}{L}, \\qquad T = 2\\pi\\sqrt{\\frac{L}{2g}}" },
    {
      type: "text",
      content:
        "**A floating body.** A cylinder floats upright with depth $h$ submerged, so its weight equals $\\rho_\\ell A h g$. Push it down a further $y$: the extra buoyancy $\\rho_\\ell A g y$ pushes it back. Its mass is $m = \\rho_\\ell A h$ (that is what floating means), so $\\omega^2 = \\dfrac{\\rho_\\ell A g}{\\rho_\\ell A h} = \\dfrac{g}{h}$ and $T = 2\\pi\\sqrt{h/g}$. The densities cancel: only the submerged depth matters.",
    },
    {
      type: "text",
      content:
        "**A tunnel through the Earth.** Inside a uniform Earth, gravity at distance $r$ from the centre is $g\\,r/R$ (only the mass inside $r$ pulls, a Mechanics II result). A ball in a straight smooth tunnel through the centre feels $F = -\\dfrac{mg}{R}x$. So $\\omega^2 = g/R$ and",
    },
    {
      type: "math",
      latex: "T = 2\\pi\\sqrt{\\frac{R}{g}} = 2\\pi\\sqrt{\\frac{6.4\\times10^6}{10}} = 2\\pi \\times 800 \\approx 5030 \\text{ s} \\approx 84 \\text{ min}",
    },
    {
      type: "text",
      content:
        "the same as the period of a satellite skimming the surface. **A charge between two charges.** A charge $q$ sits at the midpoint of two fixed equal charges $Q$ (same sign) a distance $2d$ apart, and is constrained to move along the line. Displaced by $x$, the nearer charge pushes harder: $F = \\dfrac{kQq}{(d + x)^2} - \\dfrac{kQq}{(d - x)^2} \\approx -\\dfrac{4kQq}{d^3}\\,x$ (using $(1 \\pm x/d)^{-2} \\approx 1 \\mp 2x/d$). Again $F \\propto -x$.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (U-tube, JEE Main).** A U-tube holds a liquid column of total length 40 cm. Find the period of small oscillations ($g = 10$ m/s²).\n\n1. $T = 2\\pi\\sqrt{L/2g} = 2\\pi\\sqrt{0.4/20} = 2\\pi\\sqrt{0.02}$. *Why this step:* the restoring weight comes from a height difference of $2x$, which is why $2g$ appears.\n2. $\\sqrt{0.02} \\approx 0.1414$, so $T \\approx 0.889$ s. The liquid and the tube's width do not matter.\n\n**Worked example 4 (floating block).** A wooden cube of side 10 cm and density 600 kg/m³ floats in water. Find the period of small vertical oscillations ($g = 10$ m/s²).\n\n1. Fraction submerged $= 600/1000 = 0.6$, so $h = 6$ cm. *Why this step:* floating fixes the submerged depth, and only $h$ enters the period.\n2. $T = 2\\pi\\sqrt{0.06/10} = 2\\pi \\times 0.0775 \\approx 0.487$ s.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"adding SHMs of amplitude 3 and 4 gives amplitude 7\"",
      content:
        "Only if they are exactly in phase. Amplitudes add like **vectors**, with the phase difference as the angle between the arrows. At $\\delta = \\pi/2$ the answer is 5; at $\\delta = \\pi$ it is 1. Anything from 1 to 7 is possible.",
    },
    {
      type: "quiz",
      id: "owt0-6-q1",
      variant: "practice",
      question: "What is the amplitude of $x = 6\\sin\\omega t + 8\\cos\\omega t$?",
      options: [
        { text: "$14$", feedback: "The two terms are $\\pi/2$ out of phase, so they add like perpendicular vectors." },
        { text: "$10$", correct: true, feedback: "$\\sqrt{36 + 64} = 10$." },
        { text: "$2$", feedback: "That would be for opposite phases. Here $\\delta = \\pi/2$." },
        { text: "$7$", feedback: "Averaging is not how amplitudes combine. Use $\\sqrt{A_1^2 + A_2^2}$ for $\\delta = \\pi/2$." },
      ],
    },
    {
      type: "quiz",
      id: "owt0-6-q2",
      variant: "practice",
      question: "Two SHMs of equal amplitude $A$ and the same frequency have a phase difference of $2\\pi/3$. What is the amplitude of their sum?",
      options: [
        { text: "$A$", correct: true, feedback: "$A_R^2 = A^2 + A^2 + 2A^2\\cos 120^\\circ = 2A^2 - A^2 = A^2$." },
        { text: "$2A$", feedback: "That needs $\\delta = 0$." },
        { text: "$\\sqrt3\\,A$", feedback: "That is the answer for $\\delta = \\pi/3$. At $2\\pi/3$ the cosine is negative." },
        { text: "$0$", feedback: "Complete cancellation needs $\\delta = \\pi$." },
      ],
    },
    {
      type: "quiz",
      id: "owt0-6-q3",
      variant: "practice",
      question: "A liquid column of total length 20 cm oscillates in a U-tube. What is its period? ($g = 10$ m/s²)",
      options: [
        { text: "$2\\pi\\sqrt{0.02}$ s $\\approx 0.89$ s", feedback: "That uses $g$ instead of $2g$. Pushing one side down by $x$ gives a level difference of $2x$." },
        { text: "$0.1\\pi$ s", feedback: "$\\sqrt{0.01} = 0.1$ and $T = 2\\pi \\times 0.1 = 0.2\\pi$ s." },
        { text: "It depends on the density of the liquid.", feedback: "Density multiplies both the restoring force and the moving mass, so it cancels." },
        { text: "$0.2\\pi$ s $\\approx 0.63$ s", correct: true, feedback: "$T = 2\\pi\\sqrt{0.2/20} = 2\\pi \\times 0.1$." },
      ],
    },
    {
      type: "quiz",
      id: "owt0-6-q4",
      variant: "concept",
      question: "A ball is dropped into a smooth straight tunnel along a *chord* of the Earth (not through the centre). Compared with a tunnel through the centre, its period of oscillation is:",
      options: [
        { text: "longer, because only part of gravity acts along the tunnel", feedback: "Only part acts, but that part is still exactly $\\frac{mg}{R}$ times the distance from the midpoint." },
        { text: "the same, about 84 minutes", correct: true, feedback: "Along the chord, the component of $-\\frac{mg}{R}\\vec r$ is $-\\frac{mg}{R}x$ with $x$ measured from the chord's midpoint, so $\\omega^2 = g/R$ again." },
        { text: "shorter, because the tunnel is shorter", feedback: "The amplitude is smaller, but SHM periods do not depend on amplitude." },
      ],
    },
    {
      type: "quiz",
      id: "owt0-6-q5",
      variant: "practice",
      question: "A cylinder floats upright in water with 25 cm of its length submerged. It is pushed down slightly and released. What is its period? ($g = 10$ m/s²)",
      options: [
        { text: "It needs the density of the cylinder.", feedback: "The density only fixes how deep it floats, and that is given." },
        { text: "$\\pi/\\sqrt{10}$ s $\\approx 0.99$ s", correct: true, feedback: "$T = 2\\pi\\sqrt{h/g} = 2\\pi\\sqrt{0.025} = 2\\pi \\times 0.158 \\approx 0.99$ s." },
        { text: "$2\\pi\\sqrt{0.25}$ s $= \\pi$ s", feedback: "Divide by $g$: $h/g = 0.025$ s²." },
        { text: "$2\\pi\\sqrt{0.0125}$ s", feedback: "That is the U-tube formula. A floating body gives $\\omega^2 = g/h$, with no factor 2." },
      ],
    },
  ]),
};

const lesson07: LessonSeed = {
  slug: "damped-and-forced-oscillations",
  title: "0.7 · Damping, Driving and Resonance",
  position: 7,
  blocks: blocks([
    {
      type: "text",
      content:
        "A real swing stops if nobody pushes it. Push it at the right moments, though, and a small child can build up a huge swing with tiny shoves. The first fact is **damping**: friction drains the energy. The second is **resonance**: a periodic push timed to the natural rhythm pumps energy in. Together they explain car shock absorbers, radio tuning, and bridges that shake themselves apart.",
    },
    {
      type: "text",
      content:
        "**Damped oscillations.** In air or oil the drag on a slow object is roughly proportional to its velocity, $-bv$. Newton's second law becomes",
    },
    { type: "math", latex: "m\\ddot x = -kx - b\\dot x" },
    {
      type: "text",
      content:
        "For light damping, the solution (which you can check by substituting) is a cosine whose amplitude shrinks exponentially:",
    },
    {
      type: "math",
      latex: "x = A e^{-\\gamma t}\\cos(\\omega' t + \\phi), \\qquad \\gamma = \\frac{b}{2m}, \\qquad \\omega' = \\sqrt{\\omega^2 - \\gamma^2}",
    },
    {
      type: "text",
      content:
        "Why exponential? The energy lost per cycle is proportional to the energy present (drag is bigger when the motion is bigger), so the amplitude falls by the **same factor** every cycle, exactly like radioactive decay or compound interest in reverse. The damped frequency $\\omega'$ is slightly less than the natural $\\omega$: drag slows each swing a little. Since $E \\propto A^2$, the energy decays as $e^{-2\\gamma t}$, twice as fast as the amplitude.",
    },
    {
      type: "interactive",
      config: {
        component: "owt-wave-lab",
        mode: "shm",
        amplitude: 0.2,
        omega: 6.28,
        damping: 0.3,
        graphs: ["x"],
        periodsShown: 6,
        showEnergy: true,
        sliders: ["damping", "omega"],
        caption:
          "A damped spring-block with γ = 0.3 s⁻¹. Press Play and watch the peaks shrink by the same ratio each cycle while the energy bars drain.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the peaks sit on a smooth exponential envelope $Ae^{-\\gamma t}$. Increase the damping and the envelope falls faster; the oscillation also becomes very slightly slower, though at these values $\\omega'$ is barely different from $\\omega$. The total-energy bar is no longer level: it steps down, fastest when the block is moving fastest (where drag does most work).",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Free, damped and forced",
      content:
        "**Free oscillation:** the system oscillates at its own **natural frequency** $\\omega_0 = \\sqrt{k/m}$ after one disturbance.\n**Damped oscillation:** amplitude decays as $e^{-\\gamma t}$ because of dissipative forces.\n**Forced (driven) oscillation:** a periodic external force $F_0\\cos\\omega t$ keeps it going; after the start-up dies away, the system oscillates at the **driving** frequency $\\omega$, not its own.\n**Resonance:** the steady amplitude is largest when $\\omega$ is close to $\\omega_0$.",
    },
    {
      type: "text",
      content:
        "**Forced oscillations.** Add a driving force: $m\\ddot x = -kx - b\\dot x + F_0\\cos\\omega t$. After the natural motion has decayed, the solution is $x = A(\\omega)\\cos(\\omega t - \\delta)$ with",
    },
    {
      type: "math",
      latex: "A(\\omega) = \\frac{F_0/m}{\\sqrt{(\\omega_0^2 - \\omega^2)^2 + (2\\gamma\\omega)^2}}",
    },
    {
      type: "text",
      content:
        "Far below $\\omega_0$ the spring dominates and the response is small and in step with the force. Far above $\\omega_0$ the inertia cannot keep up and the response is tiny. Near $\\omega_0$ the spring and inertia terms cancel and only damping limits the amplitude, which becomes roughly $\\dfrac{F_0}{2m\\gamma\\omega_0}$: **the lighter the damping, the taller and sharper the peak**.",
    },
    {
      type: "interactive",
      config: {
        component: "transform-playground",
        baseExpr: "1/sqrt((2^2 - x^2)^2 + (2*1*x)^2)",
        baseLatex: "\\gamma = 1,\\ \\omega_0 = 2",
        expr: "1/sqrt((w0^2 - x^2)^2 + (2*g*x)^2)",
        exprLatex: "A(\\omega) = \\frac{F_0/m}{\\sqrt{(\\omega_0^2 - \\omega^2)^2 + (2\\gamma\\omega)^2}}",
        params: [
          { name: "w0", min: 0.5, max: 3, step: 0.1, initial: 2 },
          { name: "g", min: 0.05, max: 1, step: 0.05, initial: 0.2 },
        ],
        window: { xmin: 0, xmax: 4, ymin: 0, ymax: 5 },
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the horizontal axis is the driving frequency $\\omega$ and the curve is the steady amplitude (with $F_0/m = 1$). Moving $w_0$ slides the peak so that it always sits near $\\omega = \\omega_0$. Reducing $g$ (the damping $\\gamma$) makes the peak shoot up and narrow; with heavy damping ($g = 1$, the grey base curve) resonance is barely noticeable.",
    },
    {
      type: "text",
      content:
        "**Where you meet it.** Soldiers break step when crossing a bridge so that their marching rhythm cannot match a natural frequency of the bridge. The Tacoma Narrows bridge (1940) was destroyed by wind-driven oscillations that grew because the energy fed in exceeded what damping could remove. A radio tuner is a driven electrical oscillator whose natural frequency you adjust until it matches one station, which then dominates. Car shock absorbers do the opposite: they add heavy damping so that a bump does not set the car bouncing.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (exponential decay, JEE Main).** The amplitude of a damped oscillator falls to half its initial value in 10 s. How long until it is one eighth?\n\n1. Exponential decay multiplies by the same factor in equal times: every 10 s, the amplitude halves. *Why this step:* $e^{-\\gamma(t + 10)} = e^{-\\gamma t} \\cdot e^{-10\\gamma}$, and $e^{-10\\gamma} = \\tfrac12$ is fixed.\n2. $\\tfrac18 = \\left(\\tfrac12\\right)^3$, so three halvings: $t = 30$ s.\n3. The damping constant is $\\gamma = \\dfrac{\\ln 2}{10} \\approx 0.069$ s⁻¹.\n\n**Worked example 2 (energy decays faster).** For the same oscillator, when has the energy fallen to half?\n\n1. $E \\propto A^2 \\propto e^{-2\\gamma t}$. *Why this step:* energy follows the square of the amplitude.\n2. $e^{-2\\gamma t} = \\tfrac12 \\Rightarrow t = \\dfrac{\\ln 2}{2\\gamma} = 5$ s. At that moment the amplitude is $1/\\sqrt2 \\approx 71\\%$ of its start.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (a resonance estimate).** A 0.1 kg mass on a spring has natural frequency $\\omega_0 = 20$ rad/s and damping $\\gamma = 0.5$ s⁻¹. A force of amplitude 0.2 N drives it at $\\omega = 20$ rad/s. Estimate the steady amplitude, and compare with a static push of 0.2 N.\n\n1. At resonance $A \\approx \\dfrac{F_0}{2m\\gamma\\omega_0} = \\dfrac{0.2}{2 \\times 0.1 \\times 0.5 \\times 20} = \\dfrac{0.2}{2} = 0.1$ m.\n2. Static stretch: $k = m\\omega_0^2 = 0.1 \\times 400 = 40$ N/m, so $F_0/k = 0.2/40 = 0.005$ m.\n3. Resonance multiplies the response by $0.1/0.005 = 20$. *Why this step:* the ratio $\\omega_0/2\\gamma = 20$ measures how sharp the resonance is (the quality factor); lighter damping would make it larger still.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"resonance means the driving force is large\"",
      content:
        "Resonance is about **timing**, not strength. A tiny force pushed at the natural frequency does positive work on every cycle and builds a large amplitude, limited only by damping; a large force at the wrong frequency spends half its time fighting the motion. Worked example 3 shows a 0.2 N force producing twenty times its static effect purely through matched frequency.",
    },
    {
      type: "quiz",
      id: "owt0-7-q1",
      variant: "practice",
      question: "A damped oscillator's amplitude falls from 8 cm to 4 cm in 5 s. What is it after a further 10 s?",
      options: [
        { text: "$1$ cm", correct: true, feedback: "It halves every 5 s: 4 → 2 → 1 cm in the next 10 s." },
        { text: "$0$ cm", feedback: "That assumes a linear fall of 4 cm per 5 s. Exponential decay halves each time; it never quite reaches zero." },
        { text: "$2$ cm", feedback: "That is after 5 more seconds. Ten more seconds is two halvings." },
        { text: "$1.33$ cm", feedback: "Exponential decay multiplies by $\\tfrac12$ each 5 s; it does not divide by the elapsed time." },
      ],
    },
    {
      type: "quiz",
      id: "owt0-7-q2",
      variant: "practice",
      question: "In a lightly damped oscillator the amplitude halves every 10 s. How long does the energy take to fall to one quarter of its initial value?",
      options: [
        { text: "$20$ s", feedback: "After 20 s the amplitude is $\\tfrac14$, so the energy is $\\tfrac1{16}$." },
        { text: "$5$ s", feedback: "After 5 s the energy has halved, not quartered." },
        { text: "$40$ s", feedback: "Energy falls faster than amplitude, not slower." },
        { text: "$10$ s", correct: true, feedback: "$E \\propto A^2$. When $A$ has halved (10 s), $E$ is $\\tfrac14$." },
      ],
    },
    {
      type: "quiz",
      id: "owt0-7-q3",
      variant: "concept",
      question: "A driven oscillator has natural frequency 5 Hz and is driven at 3 Hz. Once the steady state is reached, at what frequency does it oscillate?",
      options: [
        { text: "4 Hz, the average", feedback: "There is no averaging: the steady motion is at the driving frequency." },
        { text: "2 Hz, the difference", feedback: "Differences of frequencies appear in beats (Chapter 2), not here." },
        { text: "3 Hz", correct: true, feedback: "In the steady state a forced oscillator follows the driver; its natural motion has died away." },
        { text: "5 Hz", feedback: "The natural frequency only appears in the transient at the start and in *how large* the response is." },
      ],
    },
    {
      type: "quiz",
      id: "owt0-7-q4",
      variant: "concept",
      question: "Why do soldiers break step when marching across a bridge?",
      options: [
        { text: "So that their periodic footfalls cannot drive the bridge at one of its natural frequencies and cause resonance.", correct: true, feedback: "Random footfalls feed energy in incoherently; a steady rhythm matched to the bridge could build a dangerous amplitude." },
        { text: "Because their combined weight in step would exceed what the bridge can hold.", feedback: "The total weight is the same in or out of step. The danger is timing, not load." },
        { text: "To increase the damping of the bridge.", feedback: "Walking out of step does not change the bridge's damping; it avoids a periodic driving force." },
      ],
    },
    {
      type: "quiz",
      id: "owt0-7-q5",
      variant: "concept",
      question: "Compared with the undamped natural frequency $\\omega_0$, the frequency of a lightly damped free oscillation is:",
      options: [
        { text: "slightly lower, $\\sqrt{\\omega_0^2 - \\gamma^2}$", correct: true, feedback: "Drag slows each swing a little; for light damping the change is tiny." },
        { text: "slightly higher", feedback: "Damping removes energy and slows the motion; it never speeds up the oscillation." },
        { text: "exactly the same, since only the amplitude decays", feedback: "Close, but not exact: $\\omega' = \\sqrt{\\omega_0^2 - \\gamma^2} < \\omega_0$." },
        { text: "zero, because the oscillation stops", feedback: "A lightly damped oscillator keeps oscillating while its amplitude decays." },
      ],
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-0-mastery",
  title: "0.8 · Chapter 0 Mastery",
  position: 8,
  blocks: blocks([
    {
      type: "text",
      content:
        "No formula sheet. Every question below can be rebuilt from one idea: a restoring force proportional to displacement makes the shadow of a turning arrow.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Chapter 0 in 8 lines",
      content:
        "1. SHM test: $a = -\\omega^2 x$ about some fixed point; every small oscillation about a stable minimum of $U$ passes it, with $k = U''$.\n2. $x = A\\cos(\\omega t + \\phi)$ is the shadow of an arrow of length $A$ turning at $\\omega$; $T = 2\\pi/\\omega$.\n3. Equal angles on the reference circle take equal times; equal distances do not.\n4. $|v| = \\omega\\sqrt{A^2 - x^2}$, $a = -\\omega^2 x$; $E = \\tfrac12 kA^2$ is constant, KE and PE oscillate at $2\\omega$.\n5. Springs: parallel add, series add reciprocals, $k\\ell$ is constant; gravity shifts the centre, not $T$.\n6. Pendulum $T = 2\\pi\\sqrt{L/g_{\\text{eff}}}$; physical pendulum $2\\pi\\sqrt{I/mgd}$.\n7. Same-frequency SHMs add like vectors: $A^2 = A_1^2 + A_2^2 + 2A_1A_2\\cos\\delta$. Hidden SHM: displace, find $-k_{\\text{eff}}x$, divide by the moving mass.\n8. Damping: $A \\propto e^{-\\gamma t}$, $E \\propto e^{-2\\gamma t}$; driving: steady motion at the driver's frequency, largest near $\\omega_0$.",
    },
    {
      type: "quiz",
      id: "owt0-8-q1",
      variant: "mastery",
      question: "A 1 kg particle moves in the potential $U(x) = 2(x - 3)^2 + 5$ J ($x$ in m). Its motion is:",
      options: [
        { text: "SHM about $x = 0$ with period $\\pi$ s", feedback: "The minimum of $U$ is at $x = 3$, so that is the centre of the motion." },
        { text: "SHM about $x = 3$ with period $\\pi/\\sqrt2$ s", feedback: "That corresponds to $\\omega^2 = 8$. Matching $2(x-3)^2$ with $\\tfrac12 k(x-3)^2$ gives $k = 4$ N/m, so $\\omega = 2$ rad/s and $T = \\pi$ s." },
        { text: "Not SHM, because of the constant 5 J", feedback: "A constant in $U$ gives no force; only the slope of $U$ matters." },
        { text: "SHM about $x = 3$ with period $\\pi$ s", correct: true, feedback: "$U = \\tfrac12 k(x - 3)^2 + 5$ with $k = 4$ N/m, so $\\omega = 2$ rad/s and $T = \\pi$ s. The constant 5 J does not affect the force." },
      ],
    },
    {
      type: "quiz",
      id: "owt0-8-q2",
      variant: "mastery",
      question: "A particle in SHM has period 1.2 s. What is the shortest time to go from $x = +A/2$ to $x = -A/2$?",
      options: [
        { text: "$0.4$ s", feedback: "That is $T/3$, the time from $+A$ to $-A/2$." },
        { text: "$0.1$ s", feedback: "$0.1$ s is $T/12$: only half the journey." },
        { text: "$0.2$ s", correct: true, feedback: "From $+A/2$ to the centre is $T/12$ and on to $-A/2$ is another $T/12$: $T/6 = 0.2$ s." },
        { text: "$0.3$ s", feedback: "That is $T/4$, which assumes uniform motion over a distance $A$. The central region is covered fastest." },
      ],
    },
    {
      type: "quiz",
      id: "owt0-8-q3",
      variant: "mastery",
      question: "A particle performs SHM with amplitude 13 cm and $\\omega = 2$ rad/s. What is its speed at $x = 5$ cm?",
      options: [
        { text: "$288$ cm/s", feedback: "You forgot the square root: $\\sqrt{144} = 12$." },
        { text: "$24$ cm/s", correct: true, feedback: "$2\\sqrt{169 - 25} = 2 \\times 12 = 24$ cm/s." },
        { text: "$16$ cm/s", feedback: "That is $\\omega(A - x)$. Speed uses $\\sqrt{A^2 - x^2}$." },
        { text: "$26$ cm/s", feedback: "That is $v_{\\max} = A\\omega$, the speed at the centre." },
      ],
    },
    {
      type: "quiz",
      id: "owt0-8-q4",
      variant: "mastery",
      question: "At $x = 0.6A$, what fraction of the total energy of an SHM is kinetic?",
      options: [
        { text: "$0.64$", correct: true, feedback: "$PE/E = (0.6)^2 = 0.36$, so $KE/E = 0.64$." },
        { text: "$0.4$", feedback: "Energy goes as $x^2$, not $x$." },
        { text: "$0.36$", feedback: "That is the potential-energy fraction." },
        { text: "$0.8$", feedback: "0.8 is the fraction of the maximum *speed*: $\\sqrt{1 - 0.36}$. Energy goes as the square of speed." },
      ],
    },
    {
      type: "quiz",
      id: "owt0-8-q5",
      variant: "mastery",
      question: "Three identical springs of stiffness $k$: two are joined in parallel, and that pair is joined in series with the third. A mass $m$ hangs from the combination. What is the period?",
      options: [
        { text: "$2\\pi\\sqrt{\\dfrac{m}{3k}}$", feedback: "That puts all three in parallel." },
        { text: "$2\\pi\\sqrt{\\dfrac{2m}{3k}}$", feedback: "You inverted $k_{\\text{eff}}$. $k_{\\text{eff}} = 2k/3$, so $m/k_{\\text{eff}} = 3m/2k$." },
        { text: "$2\\pi\\sqrt{\\dfrac{3m}{k}}$", feedback: "That puts all three in series." },
        { text: "$2\\pi\\sqrt{\\dfrac{3m}{2k}}$", correct: true, feedback: "Parallel pair: $2k$. In series with $k$: $\\frac{2k \\cdot k}{3k} = \\frac{2k}{3}$. So $T = 2\\pi\\sqrt{3m/2k}$." },
      ],
    },
    {
      type: "quiz",
      id: "owt0-8-q6",
      variant: "mastery",
      question: "A block on a spring has period $T$. The spring is cut in half and the same block hung from one half. The new period is:",
      options: [
        { text: "$\\sqrt2\\,T$", feedback: "A shorter spring is stiffer, so the period decreases." },
        { text: "$T$", feedback: "Cutting a spring changes its stiffness: $k\\ell$ is constant." },
        { text: "$T/\\sqrt2$", correct: true, feedback: "Half the length means twice the stiffness, and $T \\propto 1/\\sqrt k$." },
        { text: "$T/2$", feedback: "Stiffness doubles, but the period goes as $1/\\sqrt k$, not $1/k$." },
      ],
    },
    {
      type: "quiz",
      id: "owt0-8-q7",
      variant: "mastery",
      question: "A pendulum clock with period 2 s on the ground is put in a lift accelerating upward at $g/3$. What is its period in the lift?",
      options: [
        { text: "$2$ s", feedback: "In an accelerating frame the effective gravity changes, and so does the period." },
        { text: "$\\sqrt3$ s $\\approx 1.73$ s", correct: true, feedback: "$g_{\\text{eff}} = \\tfrac43 g$, so $T' = 2\\sqrt{3/4} = \\sqrt3$ s." },
        { text: "$1.5$ s", feedback: "That scales $T$ by $3/4$. The period goes as $1/\\sqrt{g_{\\text{eff}}}$." },
        { text: "$2\\sqrt{3/2}$ s $\\approx 2.45$ s", feedback: "That uses $g - g/3$. Upward acceleration adds to $g$." },
      ],
    },
    {
      type: "quiz",
      id: "owt0-8-q8",
      variant: "mastery",
      question: "A uniform cylinder of height 50 cm floats upright in a liquid with 40 cm submerged. It is pushed down slightly and released. What is the period? ($g = 10$ m/s²)",
      options: [
        { text: "$0.4\\pi$ s $\\approx 1.26$ s", correct: true, feedback: "$T = 2\\pi\\sqrt{h/g}$ with the submerged depth $h = 0.4$ m: $2\\pi \\times 0.2$." },
        { text: "$2\\pi\\sqrt{0.05}$ s $\\approx 1.40$ s", feedback: "That uses the full height 0.5 m. The period depends on the submerged depth." },
        { text: "$2\\pi\\sqrt{0.02}$ s", feedback: "That is the U-tube formula with $2g$. For a floating body $\\omega^2 = g/h$." },
        { text: "It depends on the liquid's density.", feedback: "Density cancels between the extra buoyancy and the mass of a floating body." },
      ],
    },
    {
      type: "quiz",
      id: "owt0-8-q9",
      variant: "mastery",
      question: "Find the amplitude of $x = 4\\sin\\omega t + 4\\sin(\\omega t + \\pi/3)$.",
      options: [
        { text: "$8$", feedback: "That needs the two SHMs in phase; here $\\delta = \\pi/3$." },
        { text: "$4$", feedback: "That is the result for $\\delta = 2\\pi/3$." },
        { text: "$4\\sqrt2$", feedback: "That is for $\\delta = \\pi/2$." },
        { text: "$4\\sqrt3 \\approx 6.93$", correct: true, feedback: "$A^2 = 16 + 16 + 32\\cos 60^\\circ = 48$, so $A = 4\\sqrt3$." },
      ],
    },
    {
      type: "quiz",
      id: "owt0-8-q10",
      variant: "mastery",
      question: "A damped oscillator loses 10% of its amplitude in each cycle (the same fraction every cycle). What percentage of its initial energy remains after 2 cycles?",
      options: [
        { text: "80%", feedback: "Losses compound: $0.9 \\times 0.9$, not $1 - 2 \\times 0.1$. And energy needs squaring too." },
        { text: "64%", feedback: "That is $(1 - 0.2)^2$, which treats two 10% losses as one 20% loss. Compound them: $0.9^4 \\approx 0.656$." },
        { text: "about 66%", correct: true, feedback: "Amplitude after 2 cycles: $0.9^2 = 0.81$. Energy $\\propto A^2$: $0.81^2 \\approx 0.656$." },
        { text: "81%", feedback: "That is the amplitude fraction. Energy goes as its square." },
      ],
    },
    {
      type: "quiz",
      id: "owt0-8-q11",
      variant: "mastery",
      question: "A 0.99 kg block rests on a smooth floor attached to a spring of stiffness 100 N/m. A 10 g bullet moving at 100 m/s along the spring's axis embeds in it. Find the amplitude of the resulting SHM and its equation (with $x$ from the equilibrium point, positive in the bullet's direction, $t = 0$ at impact).",
      options: [
        { text: "$A = 1$ m, $x = \\sin 10t$", feedback: "That conserves the bullet's kinetic energy through the impact: $\\tfrac12(0.01)(100)^2 = 50$ J $= \\tfrac12(100)A^2$ gives $A = 1$ m. A sticking collision loses KE; only momentum is conserved during it." },
        { text: "$A = 0.1$ m, $x = 0.1\\sin 10t$", correct: true, feedback: "Momentum: $0.01 \\times 100 = 1 \\times v$, so $v = 1$ m/s. $\\omega = \\sqrt{100/1} = 10$ rad/s. Starting at the centre with speed 1 m/s: $A = v/\\omega = 0.1$ m, and $x$ starts at 0 increasing, so a sine." },
        { text: "$A = 0.01$ m, $x = 0.01\\sin 10t$", feedback: "That divides the speed by $k/m = 100$ instead of by $\\omega = \\sqrt{k/m} = 10$. $A = v/\\omega = 1/10 = 0.1$ m." },
        { text: "$A = 0.1$ m, $x = 0.1\\cos 10t$", feedback: "The amplitude is right, but at $t = 0$ the block is at the centre, not at an extreme. A cosine starts at $x = A$." },
      ],
      hint: "The collision is instantaneous: conserve momentum first, then use energy (or $A = v/\\omega$) for the oscillation.",
    },
    {
      type: "quiz",
      id: "owt0-8-q12",
      variant: "mastery",
      question: "A 2 kg block rests on a smooth incline at $30^\\circ$, held by a spring of stiffness 200 N/m attached at the top of the incline. Find the equilibrium extension and the period of oscillation along the incline. ($g = 10$ m/s²)",
      options: [
        { text: "$5$ cm, $\\pi/5$ s $\\approx 0.63$ s", correct: true, feedback: "$kx_0 = mg\\sin 30^\\circ = 10$ N gives $x_0 = 0.05$ m. The constant gravity component only shifts the centre, so $T = 2\\pi\\sqrt{2/200} = 2\\pi/10$." },
        { text: "$10$ cm, $\\pi/5$ s", feedback: "That uses the full weight $mg$. Only $mg\\sin\\theta$ acts along the incline." },
        { text: "$5$ cm, $\\pi/5 \\times \\sqrt{2}$ s", feedback: "The incline does not change the period; there is no $\\sin\\theta$ in $T = 2\\pi\\sqrt{m/k}$." },
        { text: "$5\\sqrt3$ cm, $\\pi/5$ s", feedback: "That uses $\\cos 30^\\circ$. The component along the slope is $mg\\sin\\theta$." },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "Chapter 1 hands this SHM from particle to particle along a string. Each bead of the string oscillates exactly as in this chapter, each a little behind its neighbour, and the result is a travelling wave.",
    },
  ]),
};

export const owtChapter0Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lesson07,
  lessonMastery,
];
