import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Oscillations, Waves and Thermal Physics Chapter 1 — Waves on a String.
 * A wave is SHM handed from particle to particle: the travelling-wave
 * equation, the speed √(T/μ) and the power carried, superposition and
 * interference, reflection at boundaries, and standing waves with harmonics.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "what-a-wave-carries",
  title: "1.1 · What a Wave Carries",
  position: 1,
  blocks: blocks([
    {
      type: "text",
      content:
        "At a cricket stadium the crowd starts a Mexican wave. A bulge of standing, arm-waving people races round the ground at perhaps 20 seats a second, yet nobody leaves their seat: each person just stands up and sits down as the bulge reaches them. Something travels all the way round, but it is not people. It is a *pattern of motion*, and with it, energy.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Wave",
      content:
        "A **wave** is a disturbance that travels through a medium while each part of the medium only oscillates about its own equilibrium position. A wave transports **energy and momentum**, not matter.\n**Transverse wave:** particles oscillate perpendicular to the direction of travel (a flicked rope, a guitar string).\n**Longitudinal wave:** particles oscillate along the direction of travel (a pushed slinky, sound in air).\n**Mechanical waves** need a medium with inertia and elasticity; **electromagnetic waves** (light, radio) need no medium.",
    },
    {
      type: "text",
      content:
        "Why does a disturbance travel at all? Tie one end of a rope to a wall and jerk the other end up once. The piece you moved pulls on its neighbour through the tension, which pulls on the next, and so on. Each piece copies the motion of the piece before it, a little later. Elasticity (the tension) passes the motion on; inertia (the rope's mass) makes each piece lag. Chapter 0's SHM, handed from particle to particle, is a wave.",
    },
    {
      type: "text",
      content:
        "**Describing a moving shape.** Suppose at $t = 0$ the rope has the shape $y = f(x)$, and the pulse moves to the right at speed $v$ without changing shape. At time $t$ the whole shape has shifted right by $vt$. The height now at position $x$ is the height that was at $x - vt$ at the start:",
    },
    { type: "math", latex: "y(x, t) = f(x - vt) \\quad\\text{(moving in } +x\\text{)}, \\qquad y(x, t) = f(x + vt) \\quad\\text{(moving in } -x\\text{)}" },
    {
      type: "text",
      content:
        "This is the same shift rule as for graphs in maths: replacing $x$ by $x - c$ moves a graph $c$ to the right. Here $c = vt$ grows steadily with time, so the graph slides. **Any** function of the single combination $x - vt$ is a wave moving right at speed $v$; any function of $x + vt$ moves left.",
    },
    {
      type: "interactive",
      config: {
        component: "owt-wave-lab",
        mode: "traveling",
        amplitude: 0.1,
        wavelength: 1,
        frequency: 1,
        showGhost: true,
        sliders: ["amplitude", "wavelength", "frequency"],
        caption:
          "A sinusoidal wave on a string. The faint ghost is the string at t = 0. Watch the probe particle P as you step the time.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the wave shape slides to the right, away from the ghost, but the probe particle P only moves straight up and down. It never drifts sideways. After one period it is back where it started, while the crest that was above it has moved on by one wavelength.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (reading a pulse).** Is $y = \\dfrac{2}{(x - 3t)^2 + 1}$ ($x, y$ in m, $t$ in s) a travelling wave? If so, which way and how fast?\n\n1. $x$ and $t$ appear only in the combination $x - 3t$, so $y = f(x - 3t)$ with $f(u) = \\dfrac{2}{u^2 + 1}$. *Why this step:* this is the test for a wave of fixed shape.\n2. The form $x - vt$ means motion in $+x$ with $v = 3$ m/s.\n3. The shape is a bump of height 2 m at $u = 0$: at time $t$ the peak is at $x = 3t$. At $t = 2$ s it is at $x = 6$ m.\n\n**Worked example 2 (watch the coefficients).** $y = \\dfrac{3}{4 + (2x + 8t)^2}$.\n\n1. Factor the coefficient of $x$: $2x + 8t = 2(x + 4t)$. *Why this step:* the speed is read from the form $x \\pm vt$, so the coefficient of $x$ must be 1 first.\n2. So $y = f(x + 4t)$: speed 4 m/s in the $-x$ direction, not 8 m/s.\n3. In general, $f(ax \\pm bt)$ moves at $v = b/a$.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (not every function is a wave).** Is $y = 0.1\\sin(2x)\\cos(5t)$ a travelling wave?\n\n1. Try to write it as a function of $x - vt$ or $x + vt$ alone. The factor $\\sin 2x$ fixes the shape in space and $\\cos 5t$ only scales it up and down. *Why this step:* a travelling wave's shape must move; here the zeros of $\\sin 2x$ stay at the same $x$ for all time.\n2. It is not a single travelling wave. It is a **standing wave**, the sum of two travelling waves going opposite ways, which you will build in 1.6.\n\n**Worked example 4 (a stadium wave, JEE Main flavour).** The Mexican wave moves at 20 seats per second and each spectator takes 1.5 s to stand and sit. How many seats wide is the wave?\n\n1. Each person's motion lasts 1.5 s, during which the disturbance moves on by $20 \\times 1.5 = 30$ seats. *Why this step:* width in space = speed × duration in time, the same relation as $\\lambda = vT$.\n2. About 30 people are up at any instant.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the string moves along with the wave\"",
      content:
        "A crest travels along the string, but the bits of string under it only move up and down. If the string itself travelled, a rope tied to a wall would pile up against the wall. What travels is the *shape*, together with the energy of the motion. Tie a ribbon to the string and it bobs in place as the waves pass under it.",
    },
    {
      type: "quiz",
      id: "owt1-1-q1",
      variant: "practice",
      question: "A pulse is $y = \\dfrac{5}{1 + (x + 2t)^2}$ (SI). Which describes it?",
      options: [
        { text: "Moves in $-x$ at 2 m/s", correct: true, feedback: "It is a function of $x + 2t$, so it moves in the negative direction at 2 m/s." },
        { text: "Moves in $+x$ at 2 m/s", feedback: "$x + vt$ moves left: the peak is where $x + 2t = 0$, i.e. at $x = -2t$." },
        { text: "Moves in $-x$ at 0.5 m/s", feedback: "The speed is the coefficient of $t$ divided by that of $x$: $2/1 = 2$ m/s." },
        { text: "It does not travel.", feedback: "Any function of $x + vt$ alone is a travelling pulse." },
      ],
    },
    {
      type: "quiz",
      id: "owt1-1-q2",
      variant: "practice",
      question: "What is the speed of the pulse $y = \\dfrac{1}{2 + (3x - 12t)^2}$ (SI)?",
      options: [
        { text: "12 m/s in $+x$", feedback: "Factor out the 3 first: $3(x - 4t)$." },
        { text: "36 m/s in $+x$", feedback: "Divide the coefficients, don't multiply: $v = 12/3$." },
        { text: "4 m/s in $-x$", feedback: "A minus sign between $x$ and $t$ means motion in $+x$." },
        { text: "4 m/s in $+x$", correct: true, feedback: "$3x - 12t = 3(x - 4t)$, so $v = 12/3 = 4$ m/s, moving in $+x$." },
      ],
    },
    {
      type: "quiz",
      id: "owt1-1-q3",
      variant: "concept",
      question: "A cork floats on a pond as ripples pass beneath it. Ignoring any wind or current, what does the cork do?",
      options: [
        { text: "It bobs up and down (roughly) in place.", correct: true, feedback: "The medium only oscillates; the wave's energy passes the cork by." },
        { text: "It is carried outward with the ripples.", feedback: "The ripples carry energy, not water. The cork goes up and down as each ripple passes." },
        { text: "It stays perfectly still.", feedback: "The water under it oscillates, so the cork moves too; it just does not travel with the wave." },
      ],
    },
    {
      type: "quiz",
      id: "owt1-1-q4",
      variant: "concept",
      question: "Which of these is a longitudinal wave?",
      options: [
        { text: "A ripple on a rope flicked up and down", feedback: "The rope moves up and down, perpendicular to the travel: transverse." },
        { text: "A slinky pushed and pulled along its length", correct: true, feedback: "The coils oscillate along the direction the compressions travel." },
        { text: "A wave on a plucked guitar string", feedback: "The string moves sideways while the wave runs along it: transverse." },
        { text: "Light from a bulb", feedback: "Light is an electromagnetic wave with transverse fields." },
      ],
    },
    {
      type: "quiz",
      id: "owt1-1-q5",
      variant: "concept",
      question: "Which expression is **not** a wave travelling with a fixed shape?",
      options: [
        { text: "$y = x^2 - t^2$", correct: true, feedback: "$x^2 - t^2 = (x - t)(x + t)$ mixes both combinations; it cannot be written as a function of $x - vt$ or $x + vt$ alone." },
        { text: "$y = (x - 4t)^2$", feedback: "This is a function of $x - 4t$ alone: a parabola sliding right at 4 m/s." },
        { text: "$y = e^{-(x + t)^2}$", feedback: "A function of $x + t$ alone: a bump moving left at 1 m/s." },
        { text: "$y = \\sin(2x - 6t)$", feedback: "$2x - 6t = 2(x - 3t)$: a sine wave moving right at 3 m/s." },
      ],
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "the-wave-equation",
  title: "1.2 · The Sinusoidal Travelling Wave",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "Hold the end of a long string and move your hand up and down in SHM, $y = A\\sin(\\omega t)$ (with a minus sign chosen below for convenience). Every point of the string repeats your motion, delayed by the time the disturbance takes to reach it. The result is the most important wave in physics: a sine wave marching along the string.",
    },
    {
      type: "text",
      content:
        "**Building it.** Let the end at $x = 0$ move as $y(0, t) = -A\\sin\\omega t = A\\sin(-\\omega t)$. A point at distance $x$ does the same thing a time $x/v$ later:",
    },
    {
      type: "math",
      latex:
        "y(x, t) = A\\sin\\!\\Big(-\\omega\\big(t - \\tfrac{x}{v}\\big)\\Big) = A\\sin\\!\\Big(\\tfrac{\\omega}{v}x - \\omega t\\Big) = A\\sin(kx - \\omega t), \\qquad k = \\frac{\\omega}{v}",
    },
    {
      type: "text",
      content:
        "Freeze time: the snapshot is a sine curve in $x$ that repeats when $kx$ grows by $2\\pi$, i.e. every $\\lambda = 2\\pi/k$. Freeze a point: it performs SHM in time with period $T = 2\\pi/\\omega$. In one period the wave moves on by one wavelength, so $v = \\lambda/T = f\\lambda$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The sinusoidal travelling wave",
      content:
        "$y = A\\sin(kx - \\omega t + \\phi)$ moves in $+x$; $y = A\\sin(kx + \\omega t + \\phi)$ moves in $-x$.\n**Angular wavenumber** $k = \\dfrac{2\\pi}{\\lambda}$ (rad/m). **Angular frequency** $\\omega = 2\\pi f$ (rad/s).\n**Wave speed** $v = \\dfrac{\\omega}{k} = f\\lambda$.\n**Phase difference** between two points $\\Delta x$ apart at the same instant: $\\Delta\\phi = k\\,\\Delta x = \\dfrac{2\\pi}{\\lambda}\\Delta x$.",
    },
    {
      type: "interactive",
      config: {
        component: "owt-wave-lab",
        mode: "traveling",
        amplitude: 0.1,
        wavelength: 1.5,
        frequency: 1,
        direction: "right",
        showGhost: true,
        sliders: ["amplitude", "wavelength", "frequency"],
        caption:
          "Change λ and f and watch the v = fλ readout. Flip the direction and see which sign appears in front of ωt.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: with $\\lambda$ fixed, raising $f$ speeds the wave up in proportion; the readout always satisfies $v = f\\lambda$. Flipping the direction changes $kx - \\omega t$ to $kx + \\omega t$. The probe's maximum speed readout $A\\omega$ has nothing to do with $v$: it grows with amplitude, while the wave speed does not.",
    },
    {
      type: "text",
      content:
        "**Particle velocity and the slope rule.** The velocity of the string element at $x$ is the time derivative at fixed $x$; the slope of the string is the space derivative at fixed $t$:",
    },
    {
      type: "math",
      latex:
        "v_p = \\frac{\\partial y}{\\partial t} = -A\\omega\\cos(kx - \\omega t), \\qquad \\frac{\\partial y}{\\partial x} = Ak\\cos(kx - \\omega t) \\quad\\Longrightarrow\\quad v_p = -v\\,\\frac{\\partial y}{\\partial x}",
    },
    {
      type: "text",
      content:
        "(For any right-moving shape $f(x - vt)$ the same relation holds, by the chain rule.) It says: for a wave moving right, wherever the string slopes *upward* to the right the particle is moving *down*, and vice versa. Picture the shape sliding right: the part on the front of a crest (sloping down) is about to be lifted. Finally, differentiating twice gives $\\dfrac{\\partial^2 y}{\\partial t^2} = v^2\\dfrac{\\partial^2 y}{\\partial x^2}$, the **wave equation**. Any function that satisfies it with some constant $v$ is a wave of speed $v$, a quick check you can apply to any proposed expression.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (read everything, JEE Main).** $y = 0.02\\sin(30x - 240t)$ (SI). Find $A$, $\\lambda$, $f$, $v$ and the direction.\n\n1. $A = 0.02$ m.\n2. $k = 30$ rad/m, so $\\lambda = 2\\pi/30 \\approx 0.209$ m.\n3. $\\omega = 240$ rad/s, so $f = 240/2\\pi \\approx 38.2$ Hz.\n4. $v = \\omega/k = 240/30 = 8$ m/s. *Why this step:* $\\omega/k$ avoids rounding $\\lambda$ and $f$ first.\n5. The signs of $kx$ and $\\omega t$ are opposite, so the wave moves in $+x$.\n\n**Worked example 2 (particle speed vs wave speed).** For the same wave, find the maximum particle speed.\n\n1. $v_{p,\\max} = A\\omega = 0.02 \\times 240 = 4.8$ m/s.\n2. Compare with $v = 8$ m/s. The ratio is $A\\omega/(\\omega/k) = Ak = 0.6$. *Why this step:* $Ak$ is the maximum slope of the string, so particles outrun the wave only for very steep (large-amplitude, short-wavelength) waves.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (phase difference).** A wave of frequency 200 Hz travels at 300 m/s. What is the phase difference between two points 25 cm apart along it?\n\n1. $\\lambda = v/f = 300/200 = 1.5$ m.\n2. $\\Delta\\phi = \\dfrac{2\\pi}{\\lambda}\\Delta x = \\dfrac{2\\pi}{1.5} \\times 0.25 = \\dfrac{\\pi}{3}$. *Why this step:* a full wavelength is a full cycle, $2\\pi$; 25 cm is one sixth of 1.5 m.\n\n**Worked example 4 (direction from slope).** A wave moves in $+x$ at 8 m/s. At some point the string's slope is $+0.1$. How is that element moving?\n\n1. $v_p = -v\\,\\partial y/\\partial x = -8 \\times 0.1 = -0.8$ m/s.\n2. It is moving **down** at 0.8 m/s. Picture it: the string rises to the right of this point, so as the shape slides right, lower string arrives from the left.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"particle speed equals wave speed\"",
      content:
        "The wave speed $v = \\sqrt{T/\\mu}$ (1.3) is set by the string and is the same everywhere along it at all times. The particle speed $-A\\omega\\cos(kx - \\omega t)$ changes from point to point and moment to moment, is perpendicular to the travel, and scales with the amplitude. Shake harder and the particles move faster; the wave does not.",
    },
    {
      type: "quiz",
      id: "owt1-2-q1",
      variant: "practice",
      question: "A wave is $y = 0.05\\sin(4\\pi x + 20\\pi t)$ (SI). Which is correct?",
      options: [
        { text: "$\\lambda = 0.5$ m, $f = 10$ Hz, $v = 5$ m/s in $+x$", feedback: "$kx + \\omega t$ moves in $-x$." },
        { text: "$\\lambda = 4\\pi$ m, $f = 20\\pi$ Hz, $v = 5$ m/s in $-x$", feedback: "$4\\pi$ and $20\\pi$ are $k$ and $\\omega$. $\\lambda = 2\\pi/k$ and $f = \\omega/2\\pi$." },
        { text: "$\\lambda = 2$ m, $f = 10$ Hz, $v = 20$ m/s in $-x$", feedback: "$\\lambda = 2\\pi/k = 2\\pi/4\\pi = 0.5$ m, not $4\\pi/2\\pi$." },
        { text: "$\\lambda = 0.5$ m, $f = 10$ Hz, $v = 5$ m/s in $-x$", correct: true, feedback: "$k = 4\\pi \\Rightarrow \\lambda = 0.5$ m; $\\omega = 20\\pi \\Rightarrow f = 10$ Hz; $v = 20\\pi/4\\pi = 5$ m/s. Same signs mean $-x$." },
      ],
    },
    {
      type: "quiz",
      id: "owt1-2-q2",
      variant: "practice",
      question: "For $y = 0.01\\sin(2x - 100t)$ (SI), what is the ratio of the maximum particle speed to the wave speed?",
      options: [
        { text: "$50$", feedback: "That is the inverse ratio, $v/(A\\omega)$." },
        { text: "$0.01$", feedback: "That is $A$ alone. The ratio is $Ak = 0.01 \\times 2$." },
        { text: "$0.02$", correct: true, feedback: "$A\\omega = 1$ m/s and $v = 100/2 = 50$ m/s, so the ratio is $0.02 = Ak$." },
        { text: "$1$", feedback: "They are not equal: $A\\omega = 1$ m/s but $v = \\omega/k = 50$ m/s." },
      ],
    },
    {
      type: "quiz",
      id: "owt1-2-q3",
      variant: "practice",
      question: "A 500 Hz wave travels at 360 m/s. What is the phase difference between two points 12 cm apart?",
      options: [
        { text: "$0.12$ rad", feedback: "Multiply the distance by $k = 2\\pi/\\lambda$, not by 1." },
        { text: "$\\pi/3$", correct: true, feedback: "$\\lambda = 0.72$ m; $\\Delta\\phi = 2\\pi \\times 0.12/0.72 = \\pi/3$." },
        { text: "$\\pi/6$", feedback: "0.12/0.72 is $1/6$ of a wavelength, and a wavelength is $2\\pi$: so $2\\pi/6 = \\pi/3$." },
        { text: "$2\\pi/3$", feedback: "Check $\\lambda = v/f = 0.72$ m, not 0.36 m." },
      ],
    },
    {
      type: "quiz",
      id: "owt1-2-q4",
      variant: "concept",
      question: "A wave travels to the left along a string. At point P the string slopes upward to the right. How is P moving?",
      options: [
        { text: "Upward", correct: true, feedback: "For a left-moving wave, $v_p = +v\\,\\partial y/\\partial x$. Positive slope, so P moves up: the higher string to its right is sliding towards it." },
        { text: "Downward", feedback: "That would be true for a wave moving right. For a left-moving wave the sign flips." },
        { text: "It is at rest.", feedback: "P is at rest only where the slope is zero, at a crest or trough." },
      ],
      hint: "Imagine the shape sliding left. What arrives at P a moment later?",
    },
    {
      type: "quiz",
      id: "owt1-2-q5",
      variant: "concept",
      question: "You double the amplitude of a wave on the same string at the same frequency. What happens?",
      options: [
        { text: "Both the particle speed and the wave speed double.", feedback: "The wave speed is set by tension and mass per length, not by amplitude." },
        { text: "The wave speed doubles; the particle speed is unchanged.", feedback: "The opposite: amplitude changes the particle motion, not the wave speed." },
        { text: "The wavelength doubles.", feedback: "$\\lambda = v/f$, and neither $v$ nor $f$ has changed." },
        { text: "The maximum particle speed doubles; the wave speed is unchanged.", correct: true, feedback: "$v_{p,\\max} = A\\omega$ scales with $A$; the wave speed depends only on the string." },
      ],
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "speed-of-a-wave-on-a-string",
  title: "1.3 · Why v = √(T/μ)",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "Tighten a guitar string and its note rises; the thick bass strings sound lower than the thin ones. Both effects come from the wave speed on the string. A tighter string snaps back harder, so disturbances pass faster; a heavier string is more sluggish, so they pass slower. We now find the exact formula.",
    },
    {
      type: "text",
      content:
        "**The derivation: ride with the pulse.** Move along with a pulse at speed $v$. In this frame the pulse shape is frozen and the string streams backwards through it at speed $v$. Look at a tiny arc at the top of the pulse, of radius $R$, subtending angle $2\\delta\\theta$ at the centre of curvature. Its length is $2R\\,\\delta\\theta$ and its mass is $\\mu \\cdot 2R\\,\\delta\\theta$, where $\\mu$ is the mass per unit length.",
    },
    {
      type: "text",
      content:
        "The tension $T$ pulls along the string at both ends of the arc, each end tilted by $\\delta\\theta$ below the horizontal. The horizontal parts cancel; the vertical parts add to $2T\\sin\\delta\\theta \\approx 2T\\,\\delta\\theta$, pointing towards the centre of curvature. This inward force keeps the string element moving round the arc at speed $v$, so it supplies the centripetal force:",
    },
    {
      type: "math",
      latex: "2T\\,\\delta\\theta = \\underbrace{\\mu\\,(2R\\,\\delta\\theta)}_{\\text{mass}}\\,\\frac{v^2}{R} \\quad\\Longrightarrow\\quad T = \\mu v^2 \\quad\\Longrightarrow\\quad v = \\sqrt{\\frac{T}{\\mu}}",
    },
    {
      type: "text",
      content:
        "Both $R$ and $\\delta\\theta$ cancel, so the result holds for any small pulse shape. (We assumed a small amplitude, so the tension stays $T$ and gravity is negligible.) **Dimensional check:** $T$ in N $=$ kg m s⁻², $\\mu$ in kg m⁻¹, so $T/\\mu$ has units m² s⁻² and $\\sqrt{T/\\mu}$ is a speed. ✓",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Wave speed on a stretched string",
      content:
        "$v = \\sqrt{\\dfrac{T}{\\mu}}$, with $T$ the tension (N) and $\\mu$ the mass per unit length (kg/m).\nFor a wire of density $\\rho$ and cross-section $A$: $\\mu = \\rho A$, so $v = \\sqrt{\\dfrac{T}{\\rho A}} = \\sqrt{\\dfrac{\\text{stress}}{\\rho}}$.\nThe speed is fixed by the string; the source fixes the frequency; the wavelength follows, $\\lambda = v/f$.",
    },
    {
      type: "interactive",
      config: {
        component: "function-machine",
        expr: "sqrt(x/0.01)",
        exprLatex: "v = \\sqrt{T/\\mu},\\ \\mu = 0.01\\ \\text{kg/m}",
        min: 1,
        max: 100,
        step: 1,
        initial: 25,
        inputLabel: "Tension",
        outputLabel: "Wave speed (m/s)",
        inputUnit: "N",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: at 25 N the speed is 50 m/s; at 100 N it is 100 m/s. Doubling the speed takes **four times** the tension, because the speed goes as the square root.",
    },
    {
      type: "text",
      content:
        "**Energy carried by the wave.** Each element of length $dx$ performs SHM of amplitude $A$, so it carries energy $\\tfrac12(\\mu\\,dx)\\omega^2A^2$ (its maximum KE, from 0.3). The energy per unit length is $\\tfrac12\\mu\\omega^2A^2$, and this energy moves along at speed $v$. So the power carried past any point is",
    },
    { type: "math", latex: "P = \\tfrac12\\,\\mu\\,\\omega^2 A^2\\, v" },
    {
      type: "text",
      content:
        "Power goes as the **square** of both amplitude and frequency. Intensity (power per area) matters for waves spreading in 3D, like sound in Chapter 2; for a string the power itself is the useful measure.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (JEE Main).** A 2 m wire of mass 20 g is held at a tension of 50 N. Find the speed of transverse waves on it.\n\n1. $\\mu = 0.020/2 = 0.01$ kg/m. *Why this step:* the formula needs mass **per length**, not total mass.\n2. $v = \\sqrt{50/0.01} = \\sqrt{5000} \\approx 70.7$ m/s.\n\n**Worked example 2 (two wires).** Two wires of the same material, under the same tension, have radii in the ratio 1:2. Find the ratio of wave speeds.\n\n1. $\\mu = \\rho\\pi r^2$, so $\\mu_1 : \\mu_2 = 1 : 4$.\n2. $v \\propto 1/\\sqrt\\mu \\propto 1/r$, so $v_1 : v_2 = 2 : 1$. *Why this step:* square-root dependence on $\\mu$ turns the $r^2$ into $r$.\n\n**Worked example 3 (power).** A string with $\\mu = 0.01$ kg/m and tension 100 N carries a 50 Hz wave of amplitude 1 cm. What power does it transmit?\n\n1. $v = \\sqrt{100/0.01} = 100$ m/s, $\\omega = 2\\pi \\times 50 = 100\\pi$ rad/s.\n2. $P = \\tfrac12 \\times 0.01 \\times (100\\pi)^2 \\times (0.01)^2 \\times 100 = \\tfrac12\\pi^2 \\approx 4.9$ W.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (hanging rope, JEE Advanced).** A uniform rope of length $L$ hangs from a ceiling. A pulse starts at the bottom. How long does it take to reach the top?\n\n1. At height $y$ above the free end, the tension supports the rope below: $T = \\mu g y$. *Why this step:* in a hanging rope the tension is not constant, so the speed varies along it.\n2. $v = \\sqrt{T/\\mu} = \\sqrt{gy}$, independent of $\\mu$.\n3. $dt = \\dfrac{dy}{\\sqrt{gy}}$, so $t = \\displaystyle\\int_0^L \\frac{dy}{\\sqrt{gy}} = \\frac{2\\sqrt L}{\\sqrt g} = 2\\sqrt{\\frac{L}{g}}$.\n4. For $L = 10$ m and $g = 10$ m/s²: $t = 2$ s. The pulse accelerates as it climbs into more tensioned rope.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a higher-frequency wave travels faster on the same string\"",
      content:
        "On a given string at a given tension, every frequency travels at the same $\\sqrt{T/\\mu}$. Shake faster and the waves come closer together ($\\lambda = v/f$ shrinks); they do not move faster. That is why the whole chord from a guitar string reaches your ear together.",
    },
    {
      type: "quiz",
      id: "owt1-3-q1",
      variant: "practice",
      question: "The tension in a string is increased from 40 N to 90 N. By what factor does the wave speed change?",
      options: [
        { text: "$0.67$", feedback: "More tension means a faster wave, not a slower one." },
        { text: "$1.25$", feedback: "Take the square root of the tension ratio: $\\sqrt{2.25} = 1.5$." },
        { text: "$1.5$", correct: true, feedback: "$v \\propto \\sqrt T$: $\\sqrt{90/40} = \\sqrt{2.25} = 1.5$." },
        { text: "$2.25$", feedback: "That is the ratio of tensions. Speed goes as the square root." },
      ],
    },
    {
      type: "quiz",
      id: "owt1-3-q2",
      variant: "practice",
      question: "A 50 cm string of mass 5 g is under a tension of 40 N. What is the wave speed on it?",
      options: [
        { text: "$4000$ m/s", feedback: "That is $T/\\mu$. Take the square root." },
        { text: "$\\sqrt{4000} \\approx 63.2$ m/s", correct: true, feedback: "$\\mu = 0.005/0.5 = 0.01$ kg/m; $v = \\sqrt{40/0.01}$." },
        { text: "$\\sqrt{8000} \\approx 89.4$ m/s", feedback: "You used $\\mu = 0.005$ kg/m, the total mass. Divide by the length 0.5 m." },
        { text: "$\\sqrt{80} \\approx 8.9$ m/s", feedback: "5 g is 0.005 kg, and $\\mu = 0.01$ kg/m." },
      ],
    },
    {
      type: "quiz",
      id: "owt1-3-q3",
      variant: "concept",
      question: "You shake the end of a stretched string twice as fast as before. What happens to the waves?",
      options: [
        { text: "Same speed, half the wavelength", correct: true, feedback: "Speed is set by $T$ and $\\mu$; with $f$ doubled, $\\lambda = v/f$ halves." },
        { text: "Double the speed, same wavelength", feedback: "The string, not the source, sets the speed." },
        { text: "Double the speed, double the wavelength", feedback: "Neither: the speed stays, and the wavelength shrinks." },
        { text: "Same speed, double the wavelength", feedback: "More waves per second at the same speed must be closer together." },
      ],
    },
    {
      type: "quiz",
      id: "owt1-3-q4",
      variant: "practice",
      question: "A steel wire (density 8000 kg/m³) is under a stress of $8 \\times 10^8$ Pa. What is the speed of transverse waves on it?",
      options: [
        { text: "$10^5$ m/s", feedback: "That is $\\text{stress}/\\rho$. Take the square root." },
        { text: "It cannot be found without the radius.", feedback: "$T/\\mu = (T/A)/(\\mu/A) = \\text{stress}/\\rho$: the area cancels." },
        { text: "about 3160 m/s", feedback: "$\\sqrt{10^5} \\approx 316$, not 3160." },
        { text: "about 316 m/s", correct: true, feedback: "$v = \\sqrt{\\text{stress}/\\rho} = \\sqrt{10^5} \\approx 316$ m/s. The cross-section cancels." },
      ],
    },
    {
      type: "quiz",
      id: "owt1-3-q5",
      variant: "practice",
      question: "On the same string, a wave's amplitude is doubled and its frequency halved. The power carried:",
      options: [
        { text: "halves", feedback: "Square both factors: $A^2$ goes up by 4 and $\\omega^2$ down by 4." },
        { text: "increases 4 times", feedback: "That counts only the amplitude. The frequency, squared, brings it back down by 4." },
        { text: "stays the same", correct: true, feedback: "$P \\propto \\omega^2A^2$: $(\\tfrac12)^2 \\times 2^2 = 1$." },
        { text: "doubles", feedback: "Both amplitude and frequency enter squared: $4 \\times \\tfrac14 = 1$." },
      ],
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "superposition-and-interference",
  title: "1.4 · Superposition and Interference",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "Send a pulse along a rope from each end: an upward bump from the left, an upward bump from the right. They meet in the middle, briefly make a bump twice as tall, then pass straight through each other and carry on as if nothing had happened. Send an upward bump against a downward one of the same shape and, for one instant, the rope is completely flat. Waves do not collide like balls; they add.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Principle of superposition",
      content:
        "When two or more waves overlap, the displacement at each point is the **sum** of the displacements each wave would cause on its own: $y = y_1 + y_2$. After overlapping, each wave continues unchanged.\nThis holds whenever the restoring force is proportional to displacement (small amplitudes), because then the wave equation is linear: the sum of two solutions is a solution.",
    },
    {
      type: "text",
      content:
        "**Same frequency, same direction.** Take $y_1 = A_1\\sin(kx - \\omega t)$ and $y_2 = A_2\\sin(kx - \\omega t + \\delta)$. At any fixed point both are SHMs of the same $\\omega$ with phase difference $\\delta$. By 0.6 they add, like arrows, to one SHM, and the same happens at every point. The result is a single travelling wave with amplitude",
    },
    { type: "math", latex: "A = \\sqrt{A_1^2 + A_2^2 + 2A_1A_2\\cos\\delta}" },
    {
      type: "table",
      headers: ["Phase difference $\\delta$", "Resultant amplitude", "Name"],
      rows: [
        ["$0, 2\\pi, 4\\pi, \\ldots$", "$A_1 + A_2$ (largest)", "constructive interference"],
        ["$\\pi, 3\\pi, 5\\pi, \\ldots$", "$|A_1 - A_2|$ (smallest)", "destructive interference"],
        ["$\\pi/2$", "$\\sqrt{A_1^2 + A_2^2}$", "neither: amplitudes add in quadrature"],
      ],
    },
    {
      type: "interactive",
      config: {
        component: "owt-wave-lab",
        mode: "superposition",
        amplitude: 0.12,
        amplitude2: 0.12,
        wavelength: 1,
        frequency: 1,
        phase2: 0,
        sliders: ["phase2", "amplitude2"],
        caption:
          "Wave 1, wave 2 and their sum (bold). Slide φ₂ from 0 to 2π and read the resultant amplitude and the interference label.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: at $\\phi_2 = 0$ the sum is twice as tall; at $\\phi_2 = \\pi$ with equal amplitudes it vanishes everywhere; in between it takes intermediate heights. Make $A_2$ different from $A_1$ and destructive interference no longer gives zero, only $|A_1 - A_2|$.",
    },
    {
      type: "text",
      content:
        "**Path difference becomes phase difference.** Two sources vibrating in phase send waves along different paths to a point. If one path is longer by $\\Delta x$, its wave arrives with extra phase $k\\,\\Delta x$:",
    },
    { type: "math", latex: "\\delta = \\frac{2\\pi}{\\lambda}\\,\\Delta x \\qquad\\Longrightarrow\\qquad \\text{constructive: } \\Delta x = n\\lambda, \\quad \\text{destructive: } \\Delta x = \\left(n + \\tfrac12\\right)\\lambda" },
    {
      type: "text",
      content:
        "**Intensity.** The power a wave carries goes as $A^2$ (1.3), so intensity $I \\propto A^2$. Squaring the amplitude formula gives $I = I_1 + I_2 + 2\\sqrt{I_1I_2}\\cos\\delta$, and the ratio of the brightest to the dimmest combination is",
    },
    { type: "math", latex: "\\frac{I_{\\max}}{I_{\\min}} = \\left(\\frac{A_1 + A_2}{A_1 - A_2}\\right)^2 = \\left(\\frac{\\sqrt{I_1} + \\sqrt{I_2}}{\\sqrt{I_1} - \\sqrt{I_2}}\\right)^2" },
    {
      type: "text",
      content:
        "**Unequal wavelengths.** If the two waves have different wavelengths (and so different frequencies on the same string), $\\delta$ changes from place to place and moment to moment. The sum is no longer a sine wave of fixed shape; it swells and shrinks as it moves. In time, at one point, this is the origin of **beats** (Chapter 2).",
    },
    {
      type: "interactive",
      config: {
        component: "owt-wave-lab",
        mode: "superposition",
        amplitude: 0.12,
        amplitude2: 0.12,
        wavelength: 1,
        wavelength2: 1.2,
        frequency: 1,
        sliders: ["wavelength2", "phase2"],
        caption:
          "Now λ₂ = 1.2 m while λ₁ = 1 m. The sum has regions of reinforcement and regions of near cancellation, and its shape changes as it travels.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: groups of large oscillation separated by near-flat stretches, where the two waves are out of step. Move $\\lambda_2$ back to 1 m and the pattern becomes a clean sine wave again.",
    },
    {
      type: "text",
      content:
        "**Worked example 1.** Two waves of amplitudes 3 mm and 4 mm, same frequency and direction, differ in phase by $\\pi/2$. Find the resultant amplitude.\n\n1. $A^2 = 9 + 16 + 2(3)(4)\\cos 90^\\circ = 25$.\n2. $A = 5$ mm. *Why this step:* at $\\delta = \\pi/2$ the reference arrows are perpendicular, so this is Pythagoras.\n\n**Worked example 2 (JEE Main favourite).** Two coherent waves have intensities in the ratio 9:1. Find $I_{\\max}/I_{\\min}$.\n\n1. Amplitudes go as $\\sqrt I$: $A_1 : A_2 = 3 : 1$. *Why this step:* the interference formula works with amplitudes; intensities must be square-rooted first.\n2. $\\dfrac{I_{\\max}}{I_{\\min}} = \\left(\\dfrac{3 + 1}{3 - 1}\\right)^2 = 4$, i.e. 4:1.\n\n**Worked example 3 (path difference).** Two sources in phase each send waves of amplitude $A$ and wavelength 0.4 m to a point P. The path difference is 0.3 m. Find the amplitude at P.\n\n1. $\\delta = \\dfrac{2\\pi}{0.4} \\times 0.3 = \\dfrac{3\\pi}{2}$.\n2. $A_R^2 = A^2 + A^2 + 2A^2\\cos\\dfrac{3\\pi}{2} = 2A^2$, so $A_R = \\sqrt2\\,A$.\n3. Intensity at P is $2I_0$, halfway between the maximum $4I_0$ and the minimum 0.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (working backwards).** Two waves of equal amplitude $A$ superpose to give a wave of amplitude $A$. What is their phase difference?\n\n1. $A^2 = 2A^2 + 2A^2\\cos\\delta$, so $\\cos\\delta = -\\tfrac12$.\n2. $\\delta = 2\\pi/3$ (or $4\\pi/3$). *Why this step:* the arrows of two equal SHMs and their sum form an equilateral triangle, which forces a $120^\\circ$ angle between the two arrows.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"when two waves cancel, their energy is destroyed\"",
      content:
        "At the instant two opposite pulses overlap and the rope is flat, the rope is still **moving**: all the energy is kinetic, and a moment later the pulses re-emerge. When interfering waves cancel in some places, they reinforce in others (at a maximum the intensity is $4I_0$, not $2I_0$), and the total energy is conserved. Interference redistributes energy; it never destroys it.",
    },
    {
      type: "quiz",
      id: "owt1-4-q1",
      variant: "practice",
      question: "Two waves of amplitudes 5 cm and 3 cm, same frequency and direction, superpose with phase difference $\\pi$. What is the resultant amplitude?",
      options: [
        { text: "$0$", feedback: "Complete cancellation needs equal amplitudes." },
        { text: "$2$ cm", correct: true, feedback: "Opposite phases: $|5 - 3| = 2$ cm." },
        { text: "$8$ cm", feedback: "That is the in-phase result, $\\delta = 0$." },
        { text: "$\\sqrt{34}$ cm", feedback: "That is for $\\delta = \\pi/2$." },
      ],
    },
    {
      type: "quiz",
      id: "owt1-4-q2",
      variant: "practice",
      question: "Two coherent waves have amplitudes in the ratio 2:1. What is $I_{\\max}/I_{\\min}$?",
      options: [
        { text: "$9$", correct: true, feedback: "$\\left(\\frac{2 + 1}{2 - 1}\\right)^2 = 9$." },
        { text: "$3$", feedback: "That is the ratio of amplitudes, $(2+1)/(2-1)$. Intensity goes as its square." },
        { text: "$4$", feedback: "4 is the ratio of the two separate intensities. Interference gives $(A_1 + A_2)^2 : (A_1 - A_2)^2$." },
        { text: "$\\infty$", feedback: "The minimum is zero only if the amplitudes are equal." },
      ],
    },
    {
      type: "quiz",
      id: "owt1-4-q3",
      variant: "practice",
      question: "Two in-phase sources emit waves of wavelength 0.5 m. At a point, the path difference is 1.25 m. What happens there?",
      options: [
        { text: "Destructive interference", correct: true, feedback: "$1.25/0.5 = 2.5$ wavelengths, an odd number of half-wavelengths: $\\delta = 5\\pi$." },
        { text: "Constructive interference", feedback: "Constructive needs a whole number of wavelengths; 2.5 is a half-integer." },
        { text: "Neither: the amplitude is $\\sqrt2 A$", feedback: "That needs a quarter-wavelength offset. Here it is exactly half a wavelength extra." },
      ],
    },
    {
      type: "quiz",
      id: "owt1-4-q4",
      variant: "concept",
      question: "An upward pulse and an equal downward pulse pass through each other on a rope. At the instant the rope is completely flat, where is the energy?",
      options: [
        { text: "All potential: the rope is under tension", feedback: "A flat rope is unstretched beyond its normal tension; the extra elastic energy of the pulses is zero at that instant." },
        { text: "It has been reflected back to the ends", feedback: "The pulses pass through each other and carry on; nothing is reflected at the crossing." },
        { text: "All kinetic: the rope is flat but moving", correct: true, feedback: "The two pulses' velocities add even as their displacements cancel. The pulses re-emerge a moment later." },
        { text: "It has been destroyed and will be recreated", feedback: "Energy is never destroyed. The flat rope is moving." },
      ],
    },
    {
      type: "quiz",
      id: "owt1-4-q5",
      variant: "practice",
      question: "Two waves of intensity $I_0$ each interfere with phase difference $\\pi/3$. What is the resultant intensity?",
      options: [
        { text: "$\\sqrt3\\,I_0$", feedback: "$\\sqrt3 A$ would be the amplitude; intensity is its square, $3I_0$." },
        { text: "$3I_0$", correct: true, feedback: "$I = I_0 + I_0 + 2I_0\\cos 60^\\circ = 3I_0$." },
        { text: "$2I_0$", feedback: "That ignores the interference term $2\\sqrt{I_1I_2}\\cos\\delta$, which is $I_0$ here." },
        { text: "$4I_0$", feedback: "That is the fully constructive maximum, at $\\delta = 0$." },
      ],
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "reflection-and-transmission",
  title: "1.5 · Reflection at Boundaries",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "Flick an upward pulse along a rope tied firmly to a wall, and it comes back **upside down**. Tie the rope instead to a light ring that slides freely on a smooth vertical pole, and the pulse comes back **upright**. Join a thin rope to a thick one and part of the pulse bounces back while part carries on. All three facts follow from one question: what must happen at the end?",
    },
    {
      type: "text",
      content:
        "**Fixed end: the image pulse.** At a wall the rope cannot move, so the displacement there must be zero at all times. Imagine the rope continued through the wall, with an invisible pulse approaching from the other side: the incident pulse's mirror image, turned **upside down**. As the two pass through the wall point, superposition gives up + down = 0 there at every instant. So the end stays fixed, and the invisible pulse emerges as the reflected pulse: inverted. In wave language, reflection at a fixed end adds a **phase change** of $\\pi$.",
    },
    {
      type: "text",
      content:
        "**Free end.** A massless ring on a smooth pole feels no vertical force except from the rope, so the rope must be horizontal at the end (zero slope), otherwise the ring would have infinite acceleration. The image pulse that keeps the slope zero is the mirror image **the right way up**. The reflected pulse is upright, with no phase change; the end itself swings to twice the height for an instant.",
    },
    {
      type: "text",
      content:
        "**A junction between two strings.** Now the pulse meets a second string of different $\\mu$ (same tension, so different speed: $v_1$ then $v_2$). Two conditions hold at the junction: the strings stay joined (same displacement) and the knot is massless (same slope, since the tensions must balance). Solving them for a sinusoidal wave gives the reflected and transmitted amplitudes:",
    },
    {
      type: "math",
      latex: "A_r = \\frac{v_2 - v_1}{v_1 + v_2}\\,A_i, \\qquad A_t = \\frac{2v_2}{v_1 + v_2}\\,A_i",
    },
    {
      type: "text",
      content:
        "A negative $A_r$ means an inverted reflection. Check the limits: $v_2 \\to 0$ (infinitely heavy second string, a wall) gives $A_r = -A_i$, $A_t = 0$, the fixed end. $v_2 \\to \\infty$ (massless second string, a free end) gives $A_r = +A_i$. The **frequency** is the same on both sides, because the junction is a single point that oscillates at one frequency and drives the second string at it. The speed changes, so the wavelength changes: $\\lambda_2/\\lambda_1 = v_2/v_1$.",
    },
    {
      type: "table",
      headers: ["Boundary", "Reflected wave", "Transmitted wave"],
      rows: [
        ["Fixed end (rigid wall)", "inverted, same amplitude (phase change $\\pi$)", "none"],
        ["Free end", "upright, same amplitude (no phase change)", "none"],
        ["Light to heavy ($v_2 < v_1$)", "inverted, smaller", "upright, smaller, shorter $\\lambda$"],
        ["Heavy to light ($v_2 > v_1$)", "upright, smaller", "upright, can be *larger* than $A_i$, longer $\\lambda$"],
      ],
    },
    {
      type: "callout",
      variant: "definition",
      title: "What changes at a boundary",
      content:
        "**Frequency never changes** when a wave crosses into a new medium; it is set by the source.\n**Speed** is set by the medium, so it changes, and the **wavelength** changes with it: $\\lambda = v/f$.\nReflection from a denser medium (slower waves) inverts the wave; reflection from a rarer medium does not.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (light to heavy, JEE Advanced).** A wave of amplitude $A$ travels on a string of mass per length $\\mu$ and meets a string of $4\\mu$ under the same tension. Find the reflected and transmitted amplitudes and wavelengths.\n\n1. $v \\propto 1/\\sqrt\\mu$, so $v_2 = v_1/2$. *Why this step:* the amplitude formulas need speeds, and equal tension makes the speed ratio a square root of the $\\mu$ ratio.\n2. $A_r = \\dfrac{v_1/2 - v_1}{v_1 + v_1/2}A = \\dfrac{-1/2}{3/2}A = -\\dfrac{A}{3}$: one third of the amplitude, inverted.\n3. $A_t = \\dfrac{2(v_1/2)}{3v_1/2}A = \\dfrac{2A}{3}$, upright.\n4. Wavelengths: reflected $\\lambda$ (same string), transmitted $\\lambda/2$ (half the speed, same frequency).\n5. Energy check: power $\\propto \\mu v A^2 = \\sqrt{T\\mu}\\,A^2$. Reflected fraction $(1/3)^2 = 1/9$; transmitted fraction $\\sqrt{4}\\times(2/3)^2 = 8/9$. Total 1. ✓ *Why this step:* a quick way to catch a slip in either formula.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (heavy to light).** Same wave, now going from $\\mu$ into $\\mu/4$.\n\n1. $v_2 = 2v_1$.\n2. $A_r = \\dfrac{2v_1 - v_1}{3v_1}A = +\\dfrac{A}{3}$, upright.\n3. $A_t = \\dfrac{4v_1}{3v_1}A = \\dfrac{4A}{3}$: the transmitted wave is *taller* than the incident one.\n4. Energy: $\\tfrac19 + \\tfrac12 \\times \\tfrac{16}{9} = \\tfrac19 + \\tfrac89 = 1$. ✓ The light string carries the same power with a bigger amplitude because it has less mass moving.\n\n**Worked example 3 (writing the reflected wave).** The wave $y_i = 0.05\\sin(10x - 200t)$ (SI) travels in $+x$ towards a rigid wall at $x = 0$ (the string occupies $x < 0$). Write the reflected wave.\n\n1. The reflected wave travels in $-x$ with the same $A$, $k$, $\\omega$: $y_r = A'\\sin(10x + 200t + \\phi)$.\n2. At the wall, $y_i + y_r = 0$ for all $t$: $-0.05\\sin 200t + A'\\sin(200t + \\phi) = 0$. *Why this step:* the fixed end is a condition on the total displacement, and it must hold at every instant.\n3. This needs $A' = 0.05$, $\\phi = 0$: $y_r = 0.05\\sin(10x + 200t)$.\n4. At the wall, $y_i = -0.05\\sin 200t$ and $y_r = +0.05\\sin 200t$: always opposite, which is the phase change of $\\pi$. The total is $0.1\\sin(10x)\\cos(200t)$, a standing wave with a node at the wall, the subject of 1.6.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"frequency changes when a wave enters a new medium\"",
      content:
        "The junction is one point, and one point can only oscillate at one frequency; it shakes the new string exactly as often as the old string shakes it. What changes is the speed (a property of each string), and so the wavelength. The same rule governs light entering glass and sound entering water.",
    },
    {
      type: "quiz",
      id: "owt1-5-q1",
      variant: "concept",
      question: "A wave passes from a thin string into a thick string under the same tension. Which quantity stays the same?",
      options: [
        { text: "Frequency", correct: true, feedback: "The junction oscillates at the incoming frequency and drives the second string at it." },
        { text: "Speed", feedback: "Speed is $\\sqrt{T/\\mu}$, and $\\mu$ changes." },
        { text: "Wavelength", feedback: "$\\lambda = v/f$; the speed changes, so the wavelength does too." },
        { text: "Amplitude", feedback: "Part of the wave reflects, so the transmitted amplitude differs." },
      ],
    },
    {
      type: "quiz",
      id: "owt1-5-q2",
      variant: "practice",
      question: "A wave on a string of mass per length $\\mu$ meets a string of $9\\mu$ under the same tension. What is the reflected amplitude as a fraction of the incident amplitude $A$?",
      options: [
        { text: "$+A/2$", feedback: "Going into a slower (heavier) string inverts the reflection." },
        { text: "$-4A/5$", feedback: "That uses the $\\mu$ ratio 9 in place of the speed ratio 3. Speeds go as $1/\\sqrt\\mu$." },
        { text: "$-A$", feedback: "Total reflection happens only at a rigid wall; some wave does get into the $9\\mu$ string." },
        { text: "$-A/2$ (inverted)", correct: true, feedback: "$v_2 = v_1/3$: $A_r = \\frac{1/3 - 1}{1 + 1/3}A = \\frac{-2/3}{4/3}A = -\\frac{A}{2}$." },
      ],
    },
    {
      type: "quiz",
      id: "owt1-5-q3",
      variant: "practice",
      question: "For the junction in the previous question ($\\mu$ into $9\\mu$), what is the wavelength of the transmitted wave if the incident wavelength is $\\lambda$?",
      options: [
        { text: "$3\\lambda$", feedback: "The heavier string is slower, so the waves bunch up." },
        { text: "$\\lambda$", feedback: "The frequency is unchanged, but the speed, and so the wavelength, is not." },
        { text: "$\\lambda/3$", correct: true, feedback: "Same frequency, one third the speed, so one third the wavelength." },
        { text: "$\\lambda/9$", feedback: "Wavelength follows speed, which goes as $1/\\sqrt\\mu$, not $1/\\mu$." },
      ],
    },
    {
      type: "quiz",
      id: "owt1-5-q4",
      variant: "practice",
      question: "The wave $y = 0.02\\sin(5x - 50t)$ (SI) on a string in $x < 0$ is reflected at a free end at $x = 0$. Which is the reflected wave?",
      options: [
        { text: "$y = -0.02\\sin(5x - 50t)$", feedback: "This also travels in $+x$. Reflected waves reverse direction." },
        { text: "$y = -0.02\\sin(5x + 50t)$", correct: true, feedback: "At $x = 0$ it gives $-0.02\\sin 50t$, identical to the incident $0.02\\sin(-50t)$: no phase change. The sum $-0.04\\cos 5x\\sin 50t$ has an antinode at the free end." },
        { text: "$y = 0.02\\sin(5x + 50t)$", feedback: "At $x = 0$ this is always opposite to the incident wave: that is the fixed-end (node) result." },
        { text: "$y = 0.02\\sin(5x - 50t)$", feedback: "That wave still travels in $+x$. A reflected wave must travel back, with $kx + \\omega t$." },
      ],
      hint: "Write the reflected wave with $kx + \\omega t$ and demand zero phase change at $x = 0$.",
    },
    {
      type: "quiz",
      id: "owt1-5-q5",
      variant: "concept",
      question: "A pulse on a heavy rope reaches a junction with a very light string. How does the reflected pulse look?",
      options: [
        { text: "Upright and smaller", correct: true, feedback: "Heavy to light is close to a free end: $A_r = \\frac{v_2 - v_1}{v_1 + v_2}A_i > 0$." },
        { text: "Inverted and smaller", feedback: "Inversion happens when reflecting from a *slower* (heavier) medium." },
        { text: "Inverted, same size", feedback: "That is a rigid wall." },
        { text: "There is no reflected pulse.", feedback: "Any change in speed causes some reflection." },
      ],
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "standing-waves-on-strings",
  title: "1.6 · Standing Waves and Harmonics",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "Pluck a guitar string and it does not show waves racing along it. It shimmers in a fixed blur, widest in the middle and still at the ends, and it sounds a definite note. That blur is a **standing wave**: the incident and reflected waves of 1.5 superposed, bouncing back and forth between the two fixed ends so fast that only their sum is visible.",
    },
    {
      type: "text",
      content:
        "**Building it.** Add two equal waves travelling in opposite directions and use the sum-to-product identity $\\sin P + \\sin Q = 2\\sin\\frac{P+Q}{2}\\cos\\frac{P-Q}{2}$:",
    },
    {
      type: "math",
      latex: "y = A\\sin(kx - \\omega t) + A\\sin(kx + \\omega t) = \\underbrace{2A\\sin kx}_{\\text{amplitude at } x}\\,\\cos\\omega t",
    },
    {
      type: "text",
      content:
        "Space and time have separated. Every point performs SHM, $\\cos\\omega t$, all in step, but with its own amplitude $2A|\\sin kx|$. Nothing travels: the shape just grows and shrinks in place.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Nodes and antinodes",
      content:
        "**Nodes**: points that never move, where $\\sin kx = 0$: $x = 0, \\frac{\\lambda}{2}, \\lambda, \\ldots$\n**Antinodes**: points of largest amplitude $2A$, where $|\\sin kx| = 1$: $x = \\frac{\\lambda}{4}, \\frac{3\\lambda}{4}, \\ldots$\nAdjacent nodes are $\\lambda/2$ apart; a node and the next antinode are $\\lambda/4$ apart. Each segment between two nodes is a **loop**.\nNo energy flows past a node (it never moves, so no work is done across it): the energy of a standing wave stays trapped in its loops.",
    },
    {
      type: "interactive",
      config: {
        component: "owt-wave-lab",
        mode: "standing",
        boundary: "fixed-fixed",
        stringLength: 1,
        waveSpeed: 100,
        harmonic: 1,
        maxHarmonic: 5,
        showComponents: true,
        sliders: ["harmonic"],
        caption:
          "A 1 m string fixed at both ends, v = 100 m/s. The faint curves are the two travelling waves; the bold curve is their sum. Step n from 1 to 5.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the two component waves slide through each other, but their sum never moves sideways. Harmonic $n$ fits exactly $n$ loops on the string, with nodes pinned at both ends. The frequency readout goes 50, 100, 150, ... Hz: whole-number multiples of the fundamental.",
    },
    {
      type: "text",
      content:
        "**Boundaries pick the wavelengths.** A string fixed at $x = 0$ and $x = L$ needs a node at both ends: $\\sin kL = 0$, so $kL = n\\pi$, i.e. $L = n\\dfrac{\\lambda}{2}$. Only a whole number of loops fits. With $v = \\sqrt{T/\\mu}$ fixed by the string:",
    },
    {
      type: "math",
      latex: "\\lambda_n = \\frac{2L}{n}, \\qquad f_n = \\frac{n v}{2L} = \\frac{n}{2L}\\sqrt{\\frac{T}{\\mu}}, \\qquad n = 1, 2, 3, \\ldots",
    },
    {
      type: "text",
      content:
        "**One end free.** If $x = 0$ is fixed and $x = L$ is free (a ring on a pole), the free end must be an antinode. From a node to an antinode is an odd number of quarter-wavelengths: $L = (2n - 1)\\dfrac{\\lambda}{4}$, giving $f = \\dfrac{(2n - 1)v}{4L}$. Only the odd harmonics $f_1, 3f_1, 5f_1, \\ldots$ exist, with $f_1 = v/4L$.",
    },
    {
      type: "interactive",
      config: {
        component: "owt-wave-lab",
        mode: "standing",
        boundary: "fixed-free",
        stringLength: 1,
        waveSpeed: 100,
        harmonic: 1,
        maxHarmonic: 4,
        sliders: ["harmonic"],
        caption:
          "Now the right end is free. Step the mode number and read off which harmonics appear.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the free end always sways with the largest amplitude. The readouts go 25, 75, 125, 175 Hz: the 1st, 3rd, 5th and 7th harmonics of 25 Hz. There is no mode at 50 Hz, because a node at the free end is impossible.",
    },
    {
      type: "table",
      headers: ["Mode", "Both ends fixed", "One end free"],
      rows: [
        ["lowest (fundamental)", "$f_1 = v/2L$, 1st harmonic", "$f_1 = v/4L$, 1st harmonic"],
        ["1st overtone", "$2f_1$, 2nd harmonic", "$3f_1$, 3rd harmonic"],
        ["2nd overtone", "$3f_1$, 3rd harmonic", "$5f_1$, 5th harmonic"],
        ["$m$th overtone", "$(m + 1)f_1$", "$(2m + 1)f_1$"],
      ],
    },
    {
      type: "text",
      content:
        "**Experiments.** In a **sonometer**, a wire is stretched over two bridges by a hanging weight and the bridge gap is adjusted until the wire resonates with a tuning fork held against the box; then $f = \\frac{1}{2\\ell}\\sqrt{T/\\mu}$ checks the laws $f \\propto 1/\\ell$, $f \\propto \\sqrt T$, $f \\propto 1/\\sqrt\\mu$. In **Melde's experiment** a string is driven by a tuning fork and the tension adjusted until it vibrates in a clean number of loops; fewer loops appear as the tension rises, because each loop gets longer.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (JEE Main).** A 1 m string with $\\mu = 5$ g/m is under 80 N of tension, fixed at both ends. Find its first three frequencies.\n\n1. $v = \\sqrt{80/0.005} = \\sqrt{16000} \\approx 126.5$ m/s. *Why this step:* $\\mu$ must be in kg/m: 5 g/m = 0.005 kg/m.\n2. $f_1 = v/2L \\approx 63.2$ Hz.\n3. $f_2 = 2f_1 \\approx 126.5$ Hz, $f_3 = 3f_1 \\approx 189.7$ Hz.\n\n**Worked example 2.** A string fixed at both ends vibrates in 3 loops at 300 Hz. What is its fundamental?\n\n1. Three loops means $n = 3$. *Why this step:* each loop is $\\lambda/2$, and the number of loops is the harmonic number.\n2. $f_1 = 300/3 = 100$ Hz.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (adjacent resonances, JEE favourite).** A string fixed at both ends resonates at 420 Hz and at 490 Hz, with no resonance in between. The wave speed is 140 m/s. Find the fundamental and the length.\n\n1. Adjacent harmonics differ by exactly $f_1$: $f_1 = 490 - 420 = 70$ Hz. *Why this step:* $f_{n+1} - f_n = f_1$ for a string with both ends fixed.\n2. Check: $420 = 6 \\times 70$ and $490 = 7 \\times 70$, whole numbers. ✓\n3. $L = v/2f_1 = 140/140 = 1$ m.\n\nIf the numbers had been 450 Hz and 750 Hz with nothing between, the difference 300 Hz is $2f_1$ (only odd harmonics), $f_1 = 150$ Hz and $450 = 3f_1$, $750 = 5f_1$: the signature of one free end.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (phases inside a standing wave).** In the 3rd harmonic of a string, are the points at $x = L/6$ and $x = L/2$ in phase?\n\n1. $\\lambda = 2L/3$, so nodes are at $0, L/3, 2L/3, L$.\n2. $x = L/6$ is in the first loop, $x = L/2$ in the second. Adjacent loops are separated by one node.\n3. Across a node $\\sin kx$ changes sign, so the two points move in **opposite** directions: phase difference $\\pi$. *Why this step:* in $2A\\sin kx\\cos\\omega t$ the only thing that can differ between points is the sign of $\\sin kx$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the second overtone is the second harmonic\"",
      content:
        "Overtones count from the first frequency *above* the fundamental; harmonics count the fundamental as number 1. For a string fixed at both ends, the second overtone is the **third** harmonic. For a string with one free end, where only odd harmonics exist, the second overtone is the **fifth** harmonic.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"points between two nodes oscillate out of phase\"",
      content:
        "Every point within one loop moves up together and down together; they differ only in amplitude. This is quite unlike a travelling wave, where the phase changes steadily along the string. In a standing wave the phase jumps by $\\pi$ only when you cross a node.",
    },
    {
      type: "quiz",
      id: "owt1-6-q1",
      variant: "practice",
      question: "A 50 cm string fixed at both ends has wave speed 200 m/s. What is the frequency of its second overtone?",
      options: [
        { text: "$400$ Hz", feedback: "That is the second harmonic (first overtone)." },
        { text: "$1000$ Hz", feedback: "That is the fifth harmonic, the second overtone for a string with one free end, not two fixed ends." },
        { text: "$300$ Hz", feedback: "Recheck $f_1 = v/2L = 200$ Hz." },
        { text: "$600$ Hz", correct: true, feedback: "$f_1 = 200/(2 \\times 0.5) = 200$ Hz. The second overtone is the third harmonic, $600$ Hz." },
      ],
    },
    {
      type: "quiz",
      id: "owt1-6-q2",
      variant: "practice",
      question: "A string fixed at both ends has consecutive resonant frequencies 375 Hz and 450 Hz. What is its fundamental?",
      options: [
        { text: "$412.5$ Hz", feedback: "The fundamental is the spacing, not the average." },
        { text: "$150$ Hz", feedback: "$375/150$ is not a whole number." },
        { text: "$75$ Hz", correct: true, feedback: "Adjacent harmonics differ by $f_1$: $450 - 375 = 75$ Hz ($375 = 5 \\times 75$, $450 = 6 \\times 75$)." },
        { text: "$37.5$ Hz", feedback: "That would be for one free end, where adjacent modes differ by $2f_1$. But $375/37.5 = 10$ is even, which a one-free-end string cannot have." },
      ],
    },
    {
      type: "quiz",
      id: "owt1-6-q3",
      variant: "concept",
      question: "In a standing wave on a string, what is the distance between a node and the nearest antinode?",
      options: [
        { text: "$\\lambda/8$", feedback: "Half of a half-wavelength is $\\lambda/4$." },
        { text: "$\\lambda/4$", correct: true, feedback: "Nodes are $\\lambda/2$ apart and an antinode sits midway." },
        { text: "$\\lambda/2$", feedback: "That is node to node." },
        { text: "$\\lambda$", feedback: "That spans two loops." },
      ],
    },
    {
      type: "quiz",
      id: "owt1-6-q4",
      variant: "practice",
      question: "The tension in a sonometer wire is increased by 44% (and nothing else changes). By what percentage does its fundamental frequency change?",
      options: [
        { text: "It rises by 20%.", correct: true, feedback: "$f \\propto \\sqrt T$: $\\sqrt{1.44} = 1.2$." },
        { text: "It rises by 44%.", feedback: "Frequency goes as the square root of tension." },
        { text: "It rises by 22%.", feedback: "Halving the percentage is only an approximation for small changes. Here $\\sqrt{1.44} = 1.2$ exactly." },
        { text: "It falls by 20%.", feedback: "Tighter strings sound higher." },
      ],
    },
    {
      type: "quiz",
      id: "owt1-6-q5",
      variant: "concept",
      question: "In the standing wave $y = 2A\\sin kx\\cos\\omega t$, two points lie in the same loop. Which statement is true?",
      options: [
        { text: "They have the same amplitude but different phases.", feedback: "It is the other way round: amplitude varies with position, phase does not (within a loop)." },
        { text: "They are always exactly $\\pi$ out of phase.", feedback: "That happens for points in adjacent loops, on opposite sides of a node." },
        { text: "Their phase difference is $k\\Delta x$.", feedback: "That rule is for travelling waves. In a standing wave all points share the factor $\\cos\\omega t$." },
        { text: "They move in phase but may have different amplitudes.", correct: true, feedback: "Both follow $\\cos\\omega t$ with the same sign of $\\sin kx$ inside one loop." },
      ],
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-1-mastery",
  title: "1.7 · Chapter 1 Mastery",
  position: 7,
  blocks: blocks([
    {
      type: "text",
      content:
        "No formula sheet. Everything here comes from one picture: SHM handed along a string at the speed the string allows, with boundaries choosing which waves survive.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Chapter 1 in 8 lines",
      content:
        "1. A wave moves a shape and energy, not matter: $y = f(x \\mp vt)$ moves in $\\pm x$.\n2. $y = A\\sin(kx - \\omega t + \\phi)$: $k = 2\\pi/\\lambda$, $\\omega = 2\\pi f$, $v = \\omega/k = f\\lambda$; opposite signs mean $+x$.\n3. Particle velocity $v_p = -v\\,\\partial y/\\partial x$, maximum $A\\omega$; phase difference $k\\Delta x$.\n4. $v = \\sqrt{T/\\mu}$ from the centripetal force on a small arc; power $P = \\tfrac12\\mu\\omega^2A^2v$.\n5. Superposition: $A^2 = A_1^2 + A_2^2 + 2A_1A_2\\cos\\delta$, $\\delta = 2\\pi\\Delta x/\\lambda$, $I \\propto A^2$.\n6. Fixed end inverts (phase $\\pi$), free end does not; at a junction $f$ is fixed, $v$ and $\\lambda$ change.\n7. Opposite waves give $2A\\sin kx\\cos\\omega t$: nodes $\\lambda/2$ apart, all points in a loop in phase.\n8. Fixed–fixed: $f_n = nv/2L$; fixed–free: odd harmonics $(2n - 1)v/4L$; adjacent resonances differ by $f_1$ (or $2f_1$).",
    },
    {
      type: "quiz",
      id: "owt1-7-q1",
      variant: "mastery",
      question: "A wave is $y = 0.03\\sin(2\\pi(5t - 0.2x))$ (SI). Which is correct?",
      options: [
        { text: "$f = 5$ Hz, $\\lambda = 5$ m, $v = 25$ m/s in $-x$", feedback: "$5t - 0.2x$ has opposite signs on the $t$ and $x$ terms, so it moves in $+x$." },
        { text: "$f = 10\\pi$ Hz, $\\lambda = 5$ m, $v = 25$ m/s in $+x$", feedback: "$10\\pi$ is $\\omega$ in rad/s. $f = \\omega/2\\pi = 5$ Hz." },
        { text: "$f = 5$ Hz, $\\lambda = 5$ m, $v = 25$ m/s in $+x$", correct: true, feedback: "$\\omega = 10\\pi$, $k = 0.4\\pi$: $f = 5$ Hz, $\\lambda = 2\\pi/0.4\\pi = 5$ m, $v = f\\lambda = 25$ m/s. The argument is $-(kx - \\omega t)$, still a $+x$ wave." },
        { text: "$f = 5$ Hz, $\\lambda = 0.2$ m, $v = 1$ m/s in $+x$", feedback: "0.2 is $1/\\lambda$ here: $2\\pi \\times 0.2 = k = 2\\pi/\\lambda$, so $\\lambda = 5$ m." },
      ],
    },
    {
      type: "quiz",
      id: "owt1-7-q2",
      variant: "mastery",
      question: "A snapshot of a wave moving in $-x$ shows point P on the front (left-hand) side of a crest, where the string slopes upward to the right. P is moving:",
      options: [
        { text: "not at all", feedback: "Only points at a crest or trough (zero slope) are momentarily at rest." },
        { text: "upward", correct: true, feedback: "For a $-x$ wave, $v_p = +v\\,\\partial y/\\partial x$; the slope is positive, so P rises as the crest arrives from the right." },
        { text: "downward", feedback: "That would be true if the wave moved in $+x$." },
        { text: "to the left, with the wave", feedback: "The string moves only transversely." },
      ],
    },
    {
      type: "quiz",
      id: "owt1-7-q3",
      variant: "mastery",
      question: "For $y = 0.05\\sin(4x - 60t)$ (SI), what is the particle speed at a point where the displacement is 0.03 m?",
      options: [
        { text: "$2.4$ m/s", correct: true, feedback: "Each point does SHM with $A = 0.05$, $\\omega = 60$: $v_p = 60\\sqrt{0.05^2 - 0.03^2} = 60 \\times 0.04 = 2.4$ m/s." },
        { text: "$15$ m/s", feedback: "That is the wave speed $\\omega/k$, not the particle speed." },
        { text: "$3$ m/s", feedback: "That is the maximum particle speed $A\\omega$, reached only at $y = 0$." },
        { text: "$1.2$ m/s", feedback: "$60 \\times (0.05 - 0.03)$ is not the SHM formula. Use $\\omega\\sqrt{A^2 - y^2}$." },
      ],
    },
    {
      type: "quiz",
      id: "owt1-7-q4",
      variant: "mastery",
      question: "Wire A has twice the radius of wire B, both of the same material. A is under four times the tension of B. What is $v_A/v_B$?",
      options: [
        { text: "$2$", feedback: "You used the tension but not the extra mass per length: $\\mu \\propto r^2$ is 4 times too." },
        { text: "$1/2$", feedback: "The tension also went up by 4, which cancels the mass factor." },
        { text: "$4$", feedback: "Speed goes as a square root, and the $\\mu$ factor cancels the tension factor anyway." },
        { text: "$1$", correct: true, feedback: "$v = \\sqrt{T/\\rho\\pi r^2}$: $\\sqrt{4/4} = 1$." },
      ],
    },
    {
      type: "quiz",
      id: "owt1-7-q5",
      variant: "mastery",
      question: "A string carries a wave with power $P$. The tension is quadrupled while the frequency and amplitude are kept the same. What is the new power?",
      options: [
        { text: "$P$", feedback: "The faster wave carries the same energy per length past a point more quickly." },
        { text: "$16P$", feedback: "Only amplitude and frequency enter squared; $v$ enters to the first power." },
        { text: "$2P$", correct: true, feedback: "$P = \\tfrac12\\mu\\omega^2A^2v$ and only $v$ changes: $v \\propto \\sqrt T$ doubles." },
        { text: "$4P$", feedback: "Power goes as $v$, and $v$ goes as $\\sqrt T$." },
      ],
    },
    {
      type: "quiz",
      id: "owt1-7-q6",
      variant: "mastery",
      question: "Two coherent waves with intensities $4I_0$ and $I_0$ interfere. What are the maximum and minimum intensities?",
      options: [
        { text: "$9I_0$ and $0$", feedback: "Zero needs equal amplitudes." },
        { text: "$9I_0$ and $I_0$", correct: true, feedback: "Amplitudes 2 and 1 (in units of $\\sqrt{I_0}$): $(2 + 1)^2 = 9$, $(2 - 1)^2 = 1$." },
        { text: "$5I_0$ and $3I_0$", feedback: "Intensities do not add or subtract directly; amplitudes do." },
        { text: "$25I_0$ and $9I_0$", feedback: "You added the intensities as if they were amplitudes, then squared." },
      ],
    },
    {
      type: "quiz",
      id: "owt1-7-q7",
      variant: "mastery",
      question: "The wave $y = 0.04\\sin(3x + 90t)$ (SI) travels in $-x$ on a string occupying $x > 0$ and reflects at a rigid support at $x = 0$. The reflected wave is:",
      options: [
        { text: "$y = 0.04\\sin(3x - 90t)$", correct: true, feedback: "It travels in $+x$. At $x = 0$: incident $0.04\\sin 90t$, reflected $-0.04\\sin 90t$, always cancelling, as a rigid support demands." },
        { text: "$y = -0.04\\sin(3x - 90t)$", feedback: "At $x = 0$ this equals $+0.04\\sin 90t$, the same as the incident wave, so the end would move: that is a free end." },
        { text: "$y = -0.04\\sin(3x + 90t)$", feedback: "This still moves in $-x$. The reflected wave must travel away from the support." },
        { text: "$y = 0.04\\sin(3x + 90t + \\pi)$", feedback: "This still moves in $-x$, just inverted. Reflection reverses direction." },
      ],
      hint: "Write a $+x$ wave with the same $A$, $k$, $\\omega$ and demand $y_i + y_r = 0$ at $x = 0$ for all $t$.",
    },
    {
      type: "quiz",
      id: "owt1-7-q8",
      variant: "mastery",
      question: "A string fixed at one end and free at the other has fundamental 60 Hz. Which of these is a possible frequency of its second overtone?",
      options: [
        { text: "$180$ Hz", feedback: "180 Hz is the first overtone (third harmonic)." },
        { text: "$120$ Hz", feedback: "Even harmonics do not exist with one free end." },
        { text: "$240$ Hz", feedback: "240 Hz is an even multiple of 60 Hz, impossible with one free end." },
        { text: "$300$ Hz", correct: true, feedback: "Only odd harmonics: 60, 180, 300 Hz. The second overtone is the fifth harmonic." },
      ],
    },
    {
      type: "quiz",
      id: "owt1-7-q9",
      variant: "mastery",
      question: "A string resonates at 450 Hz and at 750 Hz with no resonance in between. Its wave speed is 300 m/s. What is its fundamental, and how are its ends held?",
      options: [
        { text: "$150$ Hz, both ends fixed", feedback: "With both ends fixed, $600$ Hz $= 4f_1$ would also resonate, and it lies between 450 and 750 Hz." },
        { text: "$75$ Hz, one end free", feedback: "$450/75 = 6$ is even; a string with one free end has only odd harmonics." },
        { text: "$150$ Hz, one end fixed and one free", correct: true, feedback: "If both ends were fixed, $f_1 = 300$ Hz and $450/300$ would not be whole. With odd harmonics only, $2f_1 = 300$, $f_1 = 150$ Hz, and $450 = 3f_1$, $750 = 5f_1$. ✓" },
        { text: "$300$ Hz, both ends fixed", feedback: "Check: $450/300 = 1.5$ is not a whole number, so 450 Hz could not be a harmonic." },
      ],
    },
    {
      type: "quiz",
      id: "owt1-7-q10",
      variant: "mastery",
      question: "A standing wave on a string is $y = 0.04\\sin(5\\pi x)\\cos(200\\pi t)$ (SI). Find the wave speed of the component waves and the separation of adjacent nodes.",
      options: [
        { text: "$20$ m/s, $0.1$ m", feedback: "Check $\\lambda = 2\\pi/k = 2/5 = 0.4$ m, and $v = 100 \\times 0.4$." },
        { text: "$40$ m/s, $0.2$ m", correct: true, feedback: "$k = 5\\pi \\Rightarrow \\lambda = 0.4$ m, $f = 100$ Hz, $v = f\\lambda = 40$ m/s. Nodes are $\\lambda/2 = 0.2$ m apart." },
        { text: "$40$ m/s, $0.4$ m", feedback: "0.4 m is the wavelength; nodes are half a wavelength apart." },
        { text: "$125.7$ m/s, $0.2$ m", feedback: "$\\omega/k = 200\\pi/5\\pi = 40$ m/s, not $200\\pi/5$." },
      ],
    },
    {
      type: "quiz",
      id: "owt1-7-q11",
      variant: "mastery",
      question: "Two wires are joined end to end and held at 100 N between fixed supports. Wire A: 0.5 m long, $\\mu = 0.01$ kg/m. Wire B: 0.3 m long, $\\mu = 0.04$ kg/m. What is the lowest frequency at which the composite wire resonates with a node at the junction?",
      options: [
        { text: "$500$ Hz", correct: true, feedback: "$v_A = 100$ m/s gives $f = 100n$; $v_B = 50$ m/s gives $f = \\frac{50m}{0.6} = \\frac{250m}{3}$. Equal when $6n = 5m$: $n = 5$, $m = 6$, $f = 500$ Hz." },
        { text: "$100$ Hz", feedback: "That is wire A's own fundamental. Wire B must also fit a whole number of loops at the same frequency." },
        { text: "$83.3$ Hz", feedback: "That is wire B's fundamental alone; wire A cannot resonate at it." },
        { text: "$1000$ Hz", feedback: "This works, but it is the second common frequency, not the lowest." },
      ],
      hint: "The junction is a node, so each wire must hold a whole number of loops at the same frequency.",
    },
    {
      type: "quiz",
      id: "owt1-7-q12",
      variant: "mastery",
      question: "A wave of amplitude $A$ on a string of mass per length $\\mu$ meets a string of $\\mu/4$ under the same tension. What fraction of the incident power is transmitted?",
      options: [
        { text: "$16/9$", feedback: "That is $(A_t/A)^2$. The light string needs less power for the same amplitude: multiply by $\\sqrt{\\mu_2/\\mu_1} = \\frac12$." },
        { text: "$4/9$", feedback: "Check $A_t = \\frac{2v_2}{v_1 + v_2}A = \\frac43 A$, not $\\frac23 A$ (that is the light-to-heavy case)." },
        { text: "$1$", feedback: "Any change in wave speed reflects something: here $\\frac19$ of the power." },
        { text: "$8/9$", correct: true, feedback: "$v_2 = 2v_1$: $A_t = \\frac{4}{3}A$, $A_r = \\frac13 A$. Reflected power $\\frac19$, so $\\frac89$ is transmitted (check: power $\\propto \\sqrt{\\mu}A^2$ gives $\\frac12 \\times \\frac{16}{9} = \\frac89$)." },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "Chapter 2 swaps the string for air. The wave becomes a pressure wave, the tension becomes the air's springiness, and every idea here (speed from stiffness over inertia, superposition, boundaries choosing harmonics) carries straight over to organ pipes, beats and the Doppler effect.",
    },
  ]),
};

export const owtChapter1Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lessonMastery,
];
