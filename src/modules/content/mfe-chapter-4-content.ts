import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Mechanics I Chapter 4 — Friction and Circular Dynamics.
 * Friction as a self-adjusting force with a ceiling (f_s ≤ μ_s N) and a
 * fixed kinetic value (f_k = μ_k N), applied to inclines and stacked
 * blocks; then circular dynamics: the net inward force must be mv²/r,
 * whoever supplies it (friction, normal force, tension or gravity).
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "static-and-kinetic-friction",
  title: "4.1 · Static and Kinetic Friction",
  position: 1,
  blocks: blocks([
    {
      type: "video",
      src: "/videos/mfe-4-friction-and-circular-dynamics.mp4",
      poster: "/videos/mfe-4-friction-and-circular-dynamics.jpg",
      title: "Chapter 4 overview video",
      caption:
        "A narrated walk through the whole chapter. Watch it now for the big picture, or come back to it as a recap.",
    },
    {
      type: "text",
      content:
        "Try to shove a heavy almirah across the floor. You push, and nothing happens. You push harder, still nothing. Then, suddenly, it lurches and starts to slide, and once it is moving you find you can keep it going with noticeably less effort than it took to start it. Three facts are hiding in that experience: friction can take many values, it has a maximum, and it drops once sliding starts.",
    },
    { type: "heading", text: "Where friction comes from" },
    {
      type: "text",
      content:
        "Even polished surfaces are rough at the microscopic scale. Two surfaces pressed together actually touch only at the tips of their bumps, and at those tiny contact points the atoms bond (\"cold welds\"). Friction is the force needed to shear those welds. Press the surfaces together harder and more bumps flatten into contact, so the true contact area, and the friction, grow in proportion to the normal force $N$, **not** to the apparent area of the surfaces.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The laws of friction",
      content:
        "**Static friction** (no sliding): $f_s$ takes whatever value, in whatever direction along the surface, is needed to prevent relative sliding, up to a maximum:\n$f_s \\le \\mu_s N$.\n**Kinetic friction** (sliding): $f_k = \\mu_k N$, opposite to the direction of relative sliding.\nUsually $\\mu_k < \\mu_s$. Both are (to a good approximation) independent of the contact area and of the sliding speed.",
    },
    { type: "heading", text: "From static to kinetic friction" },
    {
      type: "text",
      content:
        "Put a block on a rough floor and pull it horizontally with a force $F$ that you slowly increase. While the block stays at rest, $\\sum F_x = 0$ forces $f = F$: friction follows your pull exactly. When $F$ reaches $\\mu_s mg$ the welds cannot hold any more; the block breaks free and friction falls to $\\mu_k mg$. Drag $F$ below and watch the graph of $f$ against $F$.",
    },
    {
      type: "interactive",
      config: {
        component: "mfe-force-lab",
        mode: "friction",
        showGraph: true,
        caption:
          "A 5 kg block with μs = 0.5 and μk = 0.4. Increase F slowly from zero and watch the friction point climb the 45° line, peak, then drop.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: for $F$ up to 25 N the point runs up the 45° line $f = F$ and the block does not move. At $F = \\mu_s mg = 25$ N friction peaks. Beyond that the block slides, friction drops to $\\mu_k mg = 20$ N and stays flat however hard you pull, and the extra force $F - 20$ goes into acceleration.",
    },
    {
      type: "worked-example",
      id: "mfe4-1-we1",
      title: "Worked example 1: below and above the limit",
      problem:
        "A 5 kg block rests on a floor with $\\mu_s = 0.5$ and $\\mu_k = 0.4$. Take $g = 10$ m/s². Find the friction and the acceleration when it is pushed horizontally with (a) 20 N, (b) 30 N.",
      steps: [
        { text: "$N = mg = 50$ N, so the static limit is $\\mu_s N = 25$ N and the kinetic value is $\\mu_k N = 20$ N. *Why this step:* always find the ceiling first; it decides which law applies." },
        { text: "(a) 20 N < 25 N: the block stays at rest and $f = 20$ N (not 25 N). Friction only supplies what is needed." },
        { text: "(b) 30 N > 25 N: the block slides, $f = 20$ N, and $a = \\dfrac{30 - 20}{5} = 2$ m/s²." },
      ],
      answer: "(a) $f = 20$ N, block at rest ($a = 0$); (b) $f = 20$ N, $a = 2$ m/s².",
      tryFirst: false,
    },
    { type: "heading", text: "Pulling at an angle" },
    {
      type: "text",
      content:
        "Pull with $F$ at angle $\\theta$ above the horizontal. The upward part $F\\sin\\theta$ lifts some of the weight off the floor, so $N = mg - F\\sin\\theta$ and the friction ceiling drops. The forward part is $F\\cos\\theta$. The block is just about to slide when",
    },
    {
      type: "math",
      latex: "F\\cos\\theta = \\mu(mg - F\\sin\\theta) \\quad\\Rightarrow\\quad F = \\frac{\\mu mg}{\\cos\\theta + \\mu\\sin\\theta}",
    },
    {
      type: "text",
      content:
        "The best angle maximises the denominator. Differentiate: $-\\sin\\theta + \\mu\\cos\\theta = 0$, so $\\tan\\theta = \\mu$. Then $\\cos\\theta = \\frac{1}{\\sqrt{1+\\mu^2}}$, $\\sin\\theta = \\frac{\\mu}{\\sqrt{1+\\mu^2}}$, and the denominator is $\\sqrt{1+\\mu^2}$:",
    },
    {
      type: "math",
      latex: "F_{\\min} = \\frac{\\mu mg}{\\sqrt{1 + \\mu^2}} \\quad\\text{at}\\quad \\tan\\theta = \\mu",
    },
    {
      type: "worked-example",
      id: "mfe4-1-we2",
      title: "Worked example 2: least pulling force",
      problem:
        "A 10 kg crate sits on a floor with $\\mu_s = 0.75$. Find the least force that can start it moving, and its direction.",
      steps: [
        { text: "Best angle: $\\tan\\theta = 0.75$, so $\\theta = 37^\\circ$ above the horizontal. *Why this step:* tilting up reduces $N$ (and so friction) but wastes some pull; $\\tan\\theta = \\mu$ is the balance point." },
        { text: "$F_{\\min} = \\dfrac{0.75 \\times 100}{\\sqrt{1 + 0.5625}} = \\dfrac{75}{1.25} = 60$ N." },
        { text: "Compare: a horizontal pull needs $\\mu mg = 75$ N. Tilting the rope saves 20%." },
      ],
      answer: "$F_{\\min} = 60$ N, pulled at $37^\\circ$ above the horizontal.",
    },
    {
      type: "worked-example",
      id: "mfe4-1-we3",
      title: "Worked example 3: friction that drives motion",
      problem:
        "A 20 kg box sits on the flat bed of a truck, $\\mu_s = 0.3$. The truck accelerates from rest at 2 m/s². Does the box slide, and what is the friction on it?",
      steps: [
        { text: "In the ground frame the box must accelerate at 2 m/s² with the truck. The only horizontal force on it is friction from the bed, so friction points **forward**: $f = ma = 40$ N. *Why this step:* friction opposes *relative sliding*. Without it the box would slide backward relative to the bed, so friction acts forward." },
        { text: "Ceiling: $\\mu_s mg = 60$ N. Since 40 N < 60 N, static friction can manage it and the box does not slide." },
        { text: "The largest acceleration the truck can have without the box sliding is $\\mu_s g = 3$ m/s²." },
      ],
      answer: "No sliding: static friction $f = 40$ N acts forward (the limit is 60 N).",
    },
    {
      type: "worked-example",
      id: "mfe4-1-we4",
      title: "Worked example 4: block pressed against a wall",
      problem:
        "You press a 2 kg book against a vertical wall with a horizontal force of 50 N. $\\mu_s = 0.5$. Does it stay, and what is the friction?",
      steps: [
        { text: "Horizontal: $N = 50$ N (the wall pushes back as hard as you push)." },
        { text: "Ceiling: $\\mu_s N = 25$ N. Needed: friction must hold the weight, 20 N. *Why this step:* here friction acts **vertically**, because the tendency to slide is downward." },
        { text: "20 N ≤ 25 N, so the book stays and $f = 20$ N upward. The least push that holds it is $\\frac{mg}{\\mu_s} = 40$ N." },
      ],
      answer: "The book stays; friction $f = 20$ N upward.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Rolling friction",
      content:
        "A wheel rolling without slipping has no sliding at the contact point, so no kinetic friction acts there. The small resistance it does feel (rolling friction) comes from the tyre and road deforming. It is typically hundreds of times smaller than sliding friction, which is why the wheel, ball bearings and lubricated axles changed transport.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"friction is always $\\mu N$\"",
      content:
        "Only kinetic friction, and *limiting* static friction, equal $\\mu N$. A block at rest under a 20 N push feels 20 N of friction, even if $\\mu_s N$ is 25 N. Writing $f = \\mu_s N$ for a stationary block is the most common friction error in JEE answer sheets. First ask: is it sliding, or about to slide?",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"friction always opposes motion\"",
      content:
        "Friction opposes **relative sliding** between the two surfaces, which is not the same thing. When you walk, your foot pushes back on the floor and friction pushes you **forward**. The box on the accelerating truck is dragged forward by friction. Friction often *causes* motion.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "mfe4-1-q1",
      variant: "practice",
      question: "A 10 kg block rests on a floor with $\\mu_s = 0.4$, $\\mu_k = 0.3$. A horizontal 30 N push acts on it. What is the friction force?",
      options: [
        { text: "$40$ N", feedback: "That is the ceiling $\\mu_s N$. The block does not need that much to stay put." },
        { text: "$0$ N, because the block is not moving", feedback: "Static friction acts precisely because the push tries to make it slide." },
        { text: "$30$ N", correct: true, feedback: "30 N < 40 N, so the block stays at rest and friction exactly balances the push." },
        { text: "$30$ N of kinetic friction, so it slides at constant speed", feedback: "It is not sliding: 30 N is below the static limit of 40 N." },
      ],
      hint: "First compare the push with the limiting static friction $\\mu_s N$. Below the limit, static friction is only as large as it needs to be (Worked example 1).",
    },
    {
      type: "quiz",
      id: "mfe4-1-q2",
      variant: "practice",
      question: "The same block ($m = 10$ kg, $\\mu_s = 0.4$, $\\mu_k = 0.3$) is pushed with 50 N. What is its acceleration?",
      options: [
        { text: "$2$ m/s²", correct: true, feedback: "$a = \\frac{50 - 30}{10} = 2$ m/s²." },
        { text: "$1$ m/s²", feedback: "That subtracts the static limit (40 N). Once sliding, friction is kinetic: 30 N." },
        { text: "$5$ m/s²", feedback: "That ignores friction altogether." },
      ],
      hint: "Check the push against $\\mu_s N$ to see if the block slides. Once it slides, friction is kinetic, $\\mu_k N$, and $a = (F - f_k)/m$.",
    },
    {
      type: "numeric",
      id: "mfe4-1-q3",
      variant: "practice",
      question: "A 2 kg block lies on a floor with $\\mu = 0.75$. What is the least force (at the best angle) that can start it sliding? Take $g = 10$ m/s² and give your answer in newtons.",
      answer: 12,
      unit: "N",
      hint: "Tilt the pull up to $\\tan\\theta = \\mu$; the force is $\\mu mg$ divided by $\\sqrt{1 + \\mu^2}$.",
      solution: "$\\mu mg = 0.75 \\times 20 = 15$ N and $\\sqrt{1 + \\mu^2} = \\sqrt{1.5625} = 1.25$.\n\n$F_{\\min} = \\dfrac{\\mu mg}{\\sqrt{1+\\mu^2}} = \\dfrac{15}{1.25} = 12$ N, at $37^\\circ$ above the horizontal.",
      commonMistakes: [
        { answer: 15, feedback: "That is the horizontal force $\\mu mg$. Pulling upward at the best angle does better." },
        { answer: 9, feedback: "That is $\\mu mg \\sin 37^\\circ$. The minimum is $\\mu mg$ divided by $\\sqrt{1+\\mu^2} = 1.25$, not multiplied by a sine or cosine." },
        { answer: 20, feedback: "That is the weight. A horizontal-ish pull never needs to overcome the whole weight." },
      ],
    },
    {
      type: "quiz",
      id: "mfe4-1-q4",
      variant: "concept",
      question: "When you start walking forward, which way does the floor's friction on your shoe act?",
      options: [
        { text: "Backward, opposing your motion", feedback: "Your shoe pushes the floor backward; the floor's friction on the shoe is its forward partner." },
        { text: "Forward", correct: true, feedback: "Friction opposes the *relative sliding* your shoe would do (backward), so it acts forward and is what accelerates you." },
        { text: "There is no friction if your shoe does not slip.", feedback: "No slipping means *static* friction, which is exactly what you walk on." },
      ],
      hint: "Your foot pushes backward on the floor without slipping. Which way does static friction act: against the motion, or against the slipping that would happen?",
    },
    {
      type: "numeric",
      id: "mfe4-1-q5",
      variant: "practice",
      question: "A 10 kg block on a floor ($\\mu_s = \\mu_k = 0.5$) is pulled by a 50 N force at $37^\\circ$ above the horizontal ($\\sin 37^\\circ = 0.6$, $\\cos 37^\\circ = 0.8$). Take $g = 10$ m/s². What is its acceleration, in m/s²? (Enter 0 if it does not move.)",
      answer: 0.5,
      unit: "m/s²",
      hint: "The upward part of the pull reduces the normal force. Find $N$ first.",
      solution: "Vertical: $N = mg - F\\sin 37^\\circ = 100 - 30 = 70$ N, so the friction ceiling is $0.5 \\times 70 = 35$ N.\n\nThe forward pull $F\\cos 37^\\circ = 40$ N exceeds 35 N, so the block slides with $f = 35$ N:\n$a = \\dfrac{40 - 35}{10} = 0.5$ m/s².",
      commonMistakes: [
        { answer: 0, feedback: "The forward pull of 40 N is less than $\\mu mg = 50$ N, but the pull's upward part reduces $N$ to $100 - 30 = 70$ N, so the friction ceiling is only 35 N." },
        { answer: 1, feedback: "That uses $f = 30$ N. With $N = 70$ N, $f = 0.5 \\times 70 = 35$ N." },
        { answer: 5, feedback: "That uses the full 50 N and ignores friction." },
      ],
    },
    {
      type: "quiz",
      id: "mfe4-1-q6",
      variant: "practice",
      multiple: true,
      question: "A 4 kg block rests on a floor with $\\mu_s = 0.6$ and $\\mu_k = 0.5$ ($g = 10$ m/s²). It is pushed horizontally. Select **all** the correct statements.",
      options: [
        { text: "With an 18 N push, the friction on it is 18 N.", correct: true, feedback: "18 N is below the static limit $0.6 \\times 40 = 24$ N, so the block stays put and friction matches the push." },
        { text: "With a 30 N push, the friction on it is 24 N.", feedback: "24 N is the static ceiling. At 30 N the block slides, and kinetic friction is $0.5 \\times 40 = 20$ N." },
        { text: "With a 30 N push, its acceleration is 2.5 m/s².", correct: true, feedback: "It slides: $a = \\frac{30 - 20}{4} = 2.5$ m/s²." },
        { text: "Turning the block onto a face with twice the area raises the static limit.", feedback: "Friction depends on the normal force, not the apparent contact area: the limit stays $\\mu_s mg = 24$ N." },
        { text: "Once it slides, pushing harder increases the friction.", feedback: "Kinetic friction is fixed at $\\mu_k N = 20$ N whatever the push; the extra force goes into acceleration." },
      ],
      hint: "For each push, compare it with the static limit $\\mu_s mg$ first: below it friction matches the push, above it friction is kinetic. Recall what the laws of friction say the limiting and kinetic friction depend on.",
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "friction-on-an-incline",
  title: "4.2 · Friction on an Incline",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "Put a coin on a book and slowly tilt the book. For a while the coin stays put, held by static friction. At a certain angle it suddenly slides. Every pair of surfaces has its own such angle, and it tells you $\\mu_s$ directly, with nothing but a protractor.",
    },
    { type: "heading", text: "The angle of repose" },
    {
      type: "text",
      content:
        "A block on an incline of angle $\\theta$: the weight splits into $mg\\sin\\theta$ down the slope and $mg\\cos\\theta$ into it, so $N = mg\\cos\\theta$. At rest, friction up the slope must equal $mg\\sin\\theta$. That is possible only while $mg\\sin\\theta \\le \\mu_s mg\\cos\\theta$, i.e. $\\tan\\theta \\le \\mu_s$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Angle of repose",
      content:
        "The steepest angle at which a block can rest on an incline, $\\theta_r$, satisfies $\\tan\\theta_r = \\mu_s$.\nIt does not depend on the mass: heavier blocks have more weight pulling them down but proportionally more friction holding them.",
    },
    {
      type: "interactive",
      config: {
        component: "mfe-force-lab",
        mode: "incline",
        sliders: { angle: { min: 0, max: 60, step: 1, initial: 20 } },
        showComponents: true,
        caption:
          "μs = 0.5, μk = 0.4. Raise θ past about 26.6° and watch the block start to slide. Then return to 20° and push up or down the slope with F.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: at $20^\\circ$ friction is less than its limit and points up the slope. At $\\tan^{-1}(0.5) \\approx 26.6^\\circ$ it reaches $\\mu_s N$ and the block starts to slide. Back at $20^\\circ$, a small push up the slope reduces the friction; a larger push makes friction **flip** and point down the slope, because the block now tends to slide up.",
    },
    { type: "heading", text: "The range of forces that hold a block" },
    {
      type: "text",
      content:
        "Push along the slope with $F$ (up the slope positive). If $F$ is small, the block tends to slide down, friction acts up the slope, and the least $F$ is when friction is at its limit: $F_{\\min} = mg\\sin\\theta - \\mu_s mg\\cos\\theta$. If $F$ is large, the block tends to slide up and friction acts down the slope: $F_{\\max} = mg\\sin\\theta + \\mu_s mg\\cos\\theta$.",
    },
    {
      type: "math",
      latex: "mg(\\sin\\theta - \\mu_s\\cos\\theta) \\;\\le\\; F \\;\\le\\; mg(\\sin\\theta + \\mu_s\\cos\\theta)",
    },
    {
      type: "text",
      content:
        "If $\\tan\\theta \\le \\mu_s$ the lower limit is negative or zero: the block stays even with no push (or a gentle push *down* the slope).\n\n**Sliding.** Once the block slides, kinetic friction $\\mu_k mg\\cos\\theta$ opposes the sliding direction:",
    },
    {
      type: "math",
      latex: "a_{\\text{down}} = g(\\sin\\theta - \\mu_k\\cos\\theta), \\qquad a_{\\text{up (decelerating)}} = g(\\sin\\theta + \\mu_k\\cos\\theta)",
    },
    { type: "heading", text: "Held, sliding and projected blocks" },
    {
      type: "worked-example",
      id: "mfe4-2-we1",
      title: "Worked example 1: the holding range",
      problem:
        "A 10 kg block rests on a $37^\\circ$ incline with $\\mu_s = 0.5$ ($\\sin 37^\\circ = 0.6$, $\\cos 37^\\circ = 0.8$). What range of forces along the slope keeps it at rest?",
      steps: [
        { text: "$mg\\sin\\theta = 60$ N, $\\mu_s mg\\cos\\theta = 0.5 \\times 80 = 40$ N. *Why this step:* these two numbers are all you need; everything else is adding or subtracting them." },
        { text: "$\\tan 37^\\circ = 0.75 > 0.5$, so without help the block slides down." },
        { text: "$F_{\\min} = 60 - 40 = 20$ N (friction helping, up the slope). $F_{\\max} = 60 + 40 = 100$ N (friction resisting, down the slope)." },
        { text: "Any push between 20 N and 100 N up the slope holds it. At $F = 60$ N friction is zero." },
      ],
      answer: "Any force from 20 N to 100 N up the slope.",
    },
    {
      type: "worked-example",
      id: "mfe4-2-we2",
      title: "Worked example 2: sliding down",
      problem:
        "The same block, now with $\\mu_k = 0.5$, is released. Find its acceleration.",
      steps: [
        { text: "$a = g(\\sin 37^\\circ - \\mu_k\\cos 37^\\circ) = 10(0.6 - 0.4) = 2$ m/s²." },
      ],
      answer: "$a = 2$ m/s² down the slope.",
    },
    {
      type: "worked-example",
      id: "mfe4-2-we3",
      title: "Worked example 3: up and back down, JEE Main",
      problem:
        "A block is projected up a $37^\\circ$ incline at 16 m/s. $\\mu_s = \\mu_k = 0.25$. Find the time to stop, the distance travelled, whether it comes back, and the time to return.",
      steps: [
        { text: "Going up, gravity and friction both act down the slope: deceleration $= 10(0.6 + 0.25 \\times 0.8) = 8$ m/s². *Why this step:* friction opposes the sliding, which is *up* on this leg, so it adds to gravity." },
        { text: "Time up $= 16/8 = 2$ s; distance $= \\dfrac{16^2}{2 \\times 8} = 16$ m." },
        { text: "At the top, $\\tan 37^\\circ = 0.75 > \\mu_s = 0.25$, so it slides back." },
        { text: "Coming down, friction now acts up the slope: $a = 10(0.6 - 0.2) = 4$ m/s²." },
        { text: "$16 = \\tfrac12 \\times 4 \\times t^2$, so $t = \\sqrt8 = 2\\sqrt2 \\approx 2.83$ s. It arrives back at $4 \\times 2\\sqrt2 = 8\\sqrt2 \\approx 11.3$ m/s." },
        { text: "The descent takes longer than the ascent: friction robs speed on both legs." },
      ],
      answer: "Stops after 2 s and 16 m; it slides back, returning in $2\\sqrt2 \\approx 2.83$ s at $8\\sqrt2 \\approx 11.3$ m/s.",
    },
    {
      type: "worked-example",
      id: "mfe4-2-we4",
      title: "Worked example 4: the $n$-times problem",
      problem:
        "A block takes $n$ times as long to slide down a rough $45^\\circ$ incline as down a smooth one of the same length. Find $\\mu_k$.",
      steps: [
        { text: "From rest over a length $L$, $L = \\tfrac12 at^2$, so $t \\propto \\dfrac{1}{\\sqrt a}$. *Why this step:* the length cancels in the ratio, so it need not be given." },
        { text: "Smooth: $a_s = g\\sin 45^\\circ$. Rough: $a_r = g(\\sin 45^\\circ - \\mu\\cos 45^\\circ) = g\\sin 45^\\circ(1 - \\mu)$." },
        { text: "$\\dfrac{t_r}{t_s} = \\sqrt{\\dfrac{a_s}{a_r}} = \\dfrac{1}{\\sqrt{1 - \\mu}} = n$, so $\\mu = 1 - \\dfrac{1}{n^2}$." },
        { text: "For $n = 2$, $\\mu = 0.75$." },
      ],
      answer: "$\\mu_k = 1 - \\dfrac{1}{n^2}$ (0.75 for $n = 2$).",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"friction on an incline always acts up the slope\"",
      content:
        "Friction opposes the *tendency* to slide. A block tending to slide down gets friction up the slope. A block pushed hard up the slope, or projected upward, gets friction **down** the slope. In Worked example 1, at $F = 100$ N friction is 40 N down the slope. Decide the tendency first, then draw the friction arrow.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "mfe4-2-q1",
      variant: "practice",
      question: "A coin just starts to slide when a book is tilted to $30^\\circ$. What is $\\mu_s$ between the coin and the book?",
      options: [
        { text: "$0.5$", feedback: "That is $\\sin 30^\\circ$. The condition is $\\tan\\theta_r = \\mu_s$." },
        { text: "$\\dfrac{\\sqrt3}{2} \\approx 0.87$", feedback: "That is $\\cos 30^\\circ$." },
        { text: "$\\dfrac{1}{\\sqrt3} \\approx 0.58$", correct: true, feedback: "$\\mu_s = \\tan 30^\\circ$." },
        { text: "It depends on the coin's mass.", feedback: "The mass cancels: both $mg\\sin\\theta$ and $\\mu_s mg\\cos\\theta$ are proportional to $m$." },
      ],
      hint: "At the angle of repose the block is on the point of slipping, so $mg\\sin\\theta = \\mu_s mg\\cos\\theta$. What does that give $\\mu_s$ in terms of $\\theta$?",
    },
    {
      type: "numeric",
      id: "mfe4-2-q2",
      variant: "practice",
      question: "A 5 kg block on a $37^\\circ$ incline has $\\mu_s = 0.5$ ($\\sin 37^\\circ = 0.6$, $\\cos 37^\\circ = 0.8$, $g = 10$ m/s²). What is the largest force up the slope that still leaves it at rest? Give your answer in newtons.",
      answer: 50,
      unit: "N",
      hint: "At the largest push the block is about to slide **up**, so friction is at its limit and points down the slope.",
      solution: "$mg\\sin\\theta = 50 \\times 0.6 = 30$ N and $\\mu_s mg\\cos\\theta = 0.5 \\times 50 \\times 0.8 = 20$ N.\n\nWith friction at its limit down the slope: $F_{\\max} = 30 + 20 = 50$ N.",
      commonMistakes: [
        { answer: 10, feedback: "That is the *smallest* holding force, with friction acting up the slope." },
        { answer: 30, feedback: "At 30 N (which equals $mg\\sin\\theta$) friction is zero. You can push harder before friction runs out." },
        { answer: 20, feedback: "That is the friction limit alone, $\\mu_s mg\\cos\\theta$. The push must also beat the weight's down-slope part." },
      ],
    },
    {
      type: "quiz",
      id: "mfe4-2-q3",
      variant: "concept",
      question: "A block rests on a rough incline. A push up the slope is gradually increased from zero until the block is just about to move **up**. What happens to the friction?",
      options: [
        { text: "It stays up the slope and grows.", feedback: "As the push grows, less help from friction is needed, not more." },
        { text: "It shrinks to zero, flips to point down the slope, and grows to $\\mu_s N$.", correct: true, feedback: "Friction adjusts itself; once the push exceeds $mg\\sin\\theta$ the tendency is to slide up, so friction points down." },
        { text: "It stays at $\\mu_s N$ up the slope throughout.", feedback: "Static friction is only $\\mu_s N$ at the limit. In between it is whatever is needed." },
      ],
      hint: "Friction takes whatever value keeps the block in equilibrium. Track the sign of $mg\\sin\\theta - F$ as $F$ grows from zero.",
    },
    {
      type: "quiz",
      id: "mfe4-2-q4",
      variant: "practice",
      question: "A block slides down a $30^\\circ$ incline with $\\mu_k = \\dfrac{1}{2\\sqrt3}$. What is its acceleration?",
      options: [
        { text: "$5$ m/s²", feedback: "That is the smooth-incline value $g\\sin 30^\\circ$; friction reduces it." },
        { text: "$2.5$ m/s²", correct: true, feedback: "$10\\big(\\tfrac12 - \\tfrac{1}{2\\sqrt3} \\cdot \\tfrac{\\sqrt3}{2}\\big) = 10(0.5 - 0.25) = 2.5$ m/s²." },
        { text: "$7.5$ m/s²", feedback: "That adds friction. Sliding down, friction acts up the slope and subtracts." },
      ],
      hint: "Sliding down: draw the down-slope pull and the kinetic friction (which way does it act?), then apply Newton's second law along the slope.",
    },
    {
      type: "numeric",
      id: "mfe4-2-q5",
      variant: "practice",
      question: "A block takes 3 times as long to slide down a rough $45^\\circ$ incline as down an identical smooth one. What is $\\mu_k$? Give it as a fraction or as a decimal to two places.",
      answer: 8 / 9,
      tolerance: 0.005,
      hint: "From rest over the same length, $t \\propto \\dfrac{1}{\\sqrt a}$.",
      solution: "$\\dfrac{t_r}{t_s} = \\sqrt{\\dfrac{a_s}{a_r}} = \\dfrac{1}{\\sqrt{1 - \\mu}} = 3$, so $1 - \\mu = \\dfrac19$ and $\\mu = \\dfrac89 \\approx 0.89$.",
      commonMistakes: [
        { answer: 2 / 3, feedback: "That is $1 - \\frac1n$. Time goes as $\\frac{1}{\\sqrt a}$, so the square appears: $1 - \\frac{1}{n^2}$." },
        { answer: 1 / 9, feedback: "That is $\\frac{1}{n^2}$, the ratio of the accelerations. $\\mu$ is $1$ minus it." },
      ],
    },
    {
      type: "quiz",
      id: "mfe4-2-q6",
      variant: "practice",
      multiple: true,
      question: "A 5 kg block sits on a $37^\\circ$ incline with $\\mu_s = 0.25$ ($\\sin 37^\\circ = 0.6$, $\\cos 37^\\circ = 0.8$, $g = 10$ m/s²). A force $F$ pushes it **up** along the slope. For which values of $F$ does the block stay at rest? Select **all** that apply.",
      options: [
        { text: "$F = 15$ N", feedback: "$mg\\sin\\theta = 30$ N and friction can help with at most $0.25 \\times 40 = 10$ N, so the push must be at least 20 N. It slides down." },
        { text: "$F = 25$ N", correct: true, feedback: "The block tends to slide down; friction of 5 N up the slope (below the 10 N limit) holds it." },
        { text: "$F = 30$ N", correct: true, feedback: "The push exactly balances $mg\\sin\\theta$, so friction is zero." },
        { text: "$F = 38$ N", correct: true, feedback: "Now it tends to slide up; friction of 8 N **down** the slope (below the 10 N limit) holds it." },
        { text: "$F = 45$ N", feedback: "The holding range is $30 \\pm 10$ N, i.e. 20 N to 40 N. At 45 N friction would need to be 15 N down the slope, more than the 10 N available: it slides up." },
      ],
      hint: "Find the holding range (Worked example 1): the smallest $F$ has friction helping up the slope, the largest has friction acting down it. Then test each value against that range.",
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "block-on-block-problems",
  title: "4.3 · Block-on-Block Problems",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "Put a book on a sheet of paper and pull the paper gently: the book comes along. Yank it and the paper shoots out, leaving the book almost where it was. Between those two outcomes is a critical pull at which the book starts to slip. Stacked-block problems are all about finding that line, and they are a JEE favourite because they test whether you really understand that static friction is *self-adjusting*.",
    },
    { type: "heading", text: "Together or slipping?" },
    {
      type: "text",
      content:
        "**The only horizontal force on the top block is friction.** Say block 1 (mass $m_1$) sits on block 2 ($m_2$), the floor is smooth, and you pull the bottom block with $F$. The top block can only accelerate if friction from the bottom block drags it. That friction has a ceiling $\\mu m_1 g$, so the top block's acceleration has a ceiling too: $a_{1,\\max} = \\mu g$. As long as the common acceleration is below that, they move together.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The block-on-block method",
      content:
        "1. **Assume** the blocks move together with a common acceleration $a = \\dfrac{F}{m_1 + m_2}$ (smooth floor).\n2. **Find the friction** the non-pushed block needs to share that acceleration.\n3. **Compare** with $\\mu_s N$. If it is within the limit, the assumption holds.\n4. If not, the blocks **slip**: redo with kinetic friction $\\mu_k N$ on each block (third-law pair, opposite directions) and separate accelerations.",
    },
    { type: "heading", text: "Critical force: top or bottom pull" },
    {
      type: "text",
      content:
        "Applying step 3 at the limit gives the critical force. If $F$ acts on the **bottom** block, the top block's greatest acceleration is $\\mu g$, so $F_{\\text{crit}} = (m_1 + m_2)\\mu g$. If $F$ acts on the **top** block, now it is the bottom block that is dragged by friction, with greatest acceleration $\\dfrac{\\mu m_1 g}{m_2}$, so $F_{\\text{crit}} = (m_1 + m_2)\\dfrac{\\mu m_1 g}{m_2}$.",
    },
    {
      type: "interactive",
      config: {
        component: "mfe-force-lab",
        mode: "block-on-block",
        pushOn: "bottom",
        caption:
          "2 kg on top of 4 kg, μ = 0.3 between them, smooth floor. Raise F on the bottom block past 18 N and watch the blocks separate.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: up to $F = 18$ N the blocks share one acceleration $F/6$ and the friction on the top block is $\\frac{F}{3}$ (a third of $F$, because the top block is a third of the mass). At 18 N that friction reaches its ceiling of 6 N. Beyond it, the top block is stuck at 3 m/s² while the bottom block pulls away. Now push the **top** block instead:",
    },
    {
      type: "interactive",
      config: {
        component: "mfe-force-lab",
        mode: "block-on-block",
        pushOn: "top",
        caption:
          "The same blocks, but F now acts on the 2 kg top block. The critical force drops to 9 N: the heavy bottom block can only be dragged at 1.5 m/s².",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the critical force is only 9 N, half of before. The friction ceiling (6 N) is the same, but now it has to drag the heavier 4 kg block, whose largest acceleration is $6/4 = 1.5$ m/s², and $6 \\times 1.5 = 9$ N.",
    },
    { type: "heading", text: "Slipping, sliding off and rough floors" },
    {
      type: "worked-example",
      id: "mfe4-3-we1",
      title: "Worked example 1: together or slipping, pull on the bottom",
      problem:
        "A 2 kg block sits on a 4 kg block; $\\mu = 0.3$ between them, floor smooth. A horizontal force acts on the bottom block. Find the accelerations for (a) $F = 10$ N and (b) $F = 30$ N.",
      steps: [
        { text: "Friction ceiling on the top block: $0.3 \\times 20 = 6$ N, so $a_{1,\\max} = 3$ m/s² and $F_{\\text{crit}} = 6 \\times 3 = 18$ N. *Why this step:* finding $F_{\\text{crit}}$ once answers every \"together or not\" question at a glance." },
        { text: "(a) $10 < 18$: together, $a = \\dfrac{10}{6} = \\dfrac53 \\approx 1.67$ m/s². The friction on the top block is $2 \\times \\tfrac53 = \\tfrac{10}{3} \\approx 3.3$ N (not 6 N), pointing **forward**." },
        { text: "(b) $30 > 18$: slipping. Top: $a_1 = \\dfrac{6}{2} = 3$ m/s². Bottom: the top block's friction on it points **backward** (third law), so $a_2 = \\dfrac{30 - 6}{4} = 6$ m/s²." },
      ],
      answer: "(a) together at $\\tfrac53 \\approx 1.67$ m/s²; (b) slipping, top 3 m/s², bottom 6 m/s².",
    },
    {
      type: "worked-example",
      id: "mfe4-3-we2",
      title: "Worked example 2: pull on the top",
      problem:
        "Same blocks, now $F = 20$ N on the **top** block. Find the acceleration of each block.",
      steps: [
        { text: "$F_{\\text{crit}} = 9$ N (from above), and $20 > 9$: slipping." },
        { text: "Top: $F$ forward, kinetic friction 6 N backward: $a_1 = \\dfrac{20 - 6}{2} = 7$ m/s²." },
        { text: "Bottom: friction 6 N forward: $a_2 = \\dfrac{6}{4} = 1.5$ m/s². *Why this step:* the bottom block has no other horizontal force; friction is its only engine." },
      ],
      answer: "Top block 7 m/s², bottom block 1.5 m/s² (they slip).",
    },
    {
      type: "worked-example",
      id: "mfe4-3-we3",
      title: "Worked example 3: time to fall off",
      problem:
        "In Worked example 1(b) the top block starts at the front end of the 4 kg plank, which is 1.5 m long. How long until it falls off the back?",
      steps: [
        { text: "Relative acceleration of the top block with respect to the plank: $a_1 - a_2 = 3 - 6 = -3$ m/s², i.e. 3 m/s² backward relative to the plank. *Why this step:* the question is about positions *relative to the plank*, so work with relative motion." },
        { text: "Both start from rest, so $1.5 = \\tfrac12 \\times 3 \\times t^2$, giving $t = 1$ s." },
      ],
      answer: "$t = 1$ s.",
    },
    {
      type: "worked-example",
      id: "mfe4-3-we4",
      title: "Worked example 4: rough floor too, JEE Advanced",
      problem:
        "Same 2 kg on 4 kg with $\\mu_1 = 0.3$ between them, but now the floor is rough with $\\mu_2 = 0.1$. A force $F$ pulls the bottom block. Find the least $F$ that makes the blocks slip relative to each other.",
      steps: [
        { text: "Floor friction on the bottom block (once it moves): $\\mu_2(m_1 + m_2)g = 0.1 \\times 60 = 6$ N backward. *Why this step:* the floor supports **both** blocks, so its normal force is 60 N, not 40 N." },
        { text: "Together, the top block still can't exceed $a = \\mu_1 g = 3$ m/s²." },
        { text: "System at the limit: $F - 6 = 6 \\times 3$, so $F_{\\text{crit}} = 24$ N." },
        { text: "Below 6 N nothing moves at all; between 6 N and 24 N they move together." },
      ],
      answer: "$F_{\\text{crit}} = 24$ N.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"friction on the top block opposes its motion\"",
      content:
        "When the bottom block is pulled, friction on the top block points **forward**, in the direction it moves: it is the force that makes the top block move at all. Friction opposes *relative* sliding; the top block tends to be left behind, so friction drags it forward. The third-law partner on the bottom block points backward.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "mfe4-3-q1",
      variant: "practice",
      question: "A 2 kg block rests on a 4 kg block ($\\mu = 0.3$, smooth floor). A 12 N force pulls the bottom block. What is the friction on the top block?",
      options: [
        { text: "$4$ N", correct: true, feedback: "Together: $a = 12/6 = 2$ m/s², so friction $= 2 \\times 2 = 4$ N, forward." },
        { text: "$6$ N", feedback: "That is the ceiling. Since $12 < 18$ N they move together, and the top block needs less." },
        { text: "$12$ N", feedback: "Friction only has to accelerate the 2 kg top block, not transmit the whole pull." },
        { text: "$8$ N", feedback: "$4 \\times 2 = 8$ N is the net force on the *bottom* block." },
      ],
      hint: "Assume the blocks move together and find the common acceleration. The friction on the top block must supply its share, $m_{\\text{top}}a$; check it does not exceed $\\mu m g$.",
    },
    {
      type: "numeric",
      id: "mfe4-3-q2",
      variant: "practice",
      question: "Same blocks ($2$ kg on $4$ kg, $\\mu = 0.3$, smooth floor, $g = 10$ m/s²), now $F = 24$ N on the bottom block. What is the bottom block's acceleration, in m/s²?",
      answer: 4.5,
      unit: "m/s²",
      hint: "Compare 24 N with the critical force first. If they slip, friction on the bottom block is kinetic and points backward.",
      solution: "$F_{\\text{crit}} = (m_1 + m_2)\\mu g = 6 \\times 3 = 18$ N, and $24 > 18$, so the blocks slip.\n\nFriction is $0.3 \\times 20 = 6$ N, forward on the top block and backward on the bottom one:\n$a_2 = \\dfrac{24 - 6}{4} = 4.5$ m/s² (the top block has 3 m/s²).",
      commonMistakes: [
        { answer: 4, feedback: "That assumes they move together. $24 > F_{\\text{crit}} = 18$ N, so they slip." },
        { answer: 6, feedback: "That is $24/4$, ignoring the backward friction from the top block." },
        { answer: 3, feedback: "3 m/s² is the top block's acceleration while slipping." },
      ],
    },
    {
      type: "quiz",
      id: "mfe4-3-q3",
      variant: "practice",
      question: "A 1 kg block lies on a 3 kg block ($\\mu = 0.5$ between them, smooth floor). What is the largest force on the **top** block for which they move together?",
      options: [
        { text: "$20$ N", feedback: "That is the critical force when pulling the *bottom* block ($4 \\times 0.5 \\times 10$)." },
        { text: "$5$ N", feedback: "5 N would be the answer if the bottom block had no mass. Part of $F$ must accelerate the top block too." },
        { text: "$\\dfrac{20}{3} \\approx 6.67$ N", correct: true, feedback: "Friction ceiling 5 N drags the 3 kg block at most $\\frac53$ m/s², so $F = 4 \\times \\frac53 = \\frac{20}{3}$ N." },
      ],
      hint: "When the top block is pulled, friction is the only horizontal force on the **bottom** block. The largest friction caps the bottom block's acceleration, and both must share it (Worked example 2).",
    },
    {
      type: "quiz",
      id: "mfe4-3-q4",
      variant: "concept",
      question: "A box rides without slipping on a trolley that is accelerating forward. Which way does the friction on the box act?",
      options: [
        { text: "Forward", correct: true, feedback: "Friction is the only horizontal force on the box and it accelerates forward." },
        { text: "Backward, opposing the motion", feedback: "Backward friction would decelerate the box, but the box accelerates forward with the trolley." },
        { text: "There is no friction because the box does not slip.", feedback: "Static friction acts precisely when there is a tendency to slip without actual slipping." },
      ],
      hint: "The box speeds up along with the trolley. Which horizontal force on the box can give it that forward acceleration?",
    },
    {
      type: "numeric",
      id: "mfe4-3-q5",
      variant: "practice",
      question: "A 1 kg block starts at the front of a 1.25 m long, 4 kg plank on a smooth floor ($\\mu = 0.2$ between them, $g = 10$ m/s²). A 20 N force pulls the plank. How long until the block falls off the back? Give your answer in seconds.",
      answer: 1,
      unit: "s",
      hint: "Check whether they slip, find both accelerations, then use the block's acceleration **relative to the plank**.",
      solution: "$F_{\\text{crit}} = 5 \\times \\mu g = 5 \\times 2 = 10$ N < 20 N, so they slip.\n\nBlock: $a_1 = \\mu g = 2$ m/s². Plank: $a_2 = \\dfrac{20 - 2}{4} = 4.5$ m/s². Relative acceleration: $2.5$ m/s² backward.\n\n$1.25 = \\tfrac12(2.5)t^2$ gives $t = 1$ s.",
      commonMistakes: [
        { answer: 0.9129, tolerance: 0.01, feedback: "That takes the plank's acceleration as $20/4 = 5$ m/s², forgetting the 2 N of backward friction from the block." },
        { answer: 0.7454, tolerance: 0.01, feedback: "That uses the plank's acceleration alone. The block also moves forward (at 2 m/s²); only the relative acceleration counts." },
      ],
    },
    {
      type: "quiz",
      id: "mfe4-3-q6",
      variant: "practice",
      multiple: true,
      question: "A 1 kg block rests on a 2 kg block on a smooth floor; $\\mu = 0.4$ between them ($g = 10$ m/s²). A horizontal 18 N force pulls the **bottom** block. Select **all** the correct statements.",
      options: [
        { text: "The blocks slip relative to each other.", correct: true, feedback: "The top block can be dragged at most $\\mu g = 4$ m/s², so $F_{\\text{crit}} = 3 \\times 4 = 12$ N. 18 N is more." },
        { text: "The friction on the top block is 4 N, pointing forward.", correct: true, feedback: "While slipping, friction is kinetic, $0.4 \\times 10 = 4$ N, and it drags the top block forward." },
        { text: "The bottom block accelerates at 6 m/s².", feedback: "$18/3 = 6$ m/s² would be the common acceleration if they moved together, but they slip." },
        { text: "The bottom block accelerates at 7 m/s².", correct: true, feedback: "$a_2 = \\frac{18 - 4}{2} = 7$ m/s²." },
        { text: "The friction on the bottom block from the top block points forward.", feedback: "By the third law it is opposite to the friction on the top block: backward." },
      ],
      hint: "Find the largest acceleration friction can give the top block ($\\mu g$) and compare it with the common acceleration if they moved together. Then draw each block's FBD, remembering the third-law pair at the interface.",
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "dynamics-of-circular-motion",
  title: "4.4 · Dynamics of Circular Motion",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "Whirl a stone on a string in a horizontal circle and let go. It does not fly outward along the string; it flies off along the **tangent**, the direction it was moving at that instant. The string had been doing one job all along: pulling the stone inward, turning its velocity a little at every moment. Chapter 2 showed that uniform circular motion has an acceleration $\\frac{v^2}{r}$ towards the centre. Newton's second law now says what that costs.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Centripetal force",
      content:
        "A body of mass $m$ moving in a circle of radius $r$ at speed $v$ needs a **net** force towards the centre of\n$\\displaystyle F_c = \\frac{mv^2}{r} = m\\omega^2 r$.\n\"Centripetal force\" is not a new kind of force. It is a *job title*: whatever real forces act (tension, friction, normal force, gravity), the sum of their components towards the centre must equal $\\frac{mv^2}{r}$.",
    },
    { type: "heading", text: "The circular-motion FBD" },
    {
      type: "text",
      content:
        "Draw the real forces only. Take one axis pointing **towards the centre** (radial) and, if needed, one vertical or tangential. Then write",
    },
    {
      type: "math",
      latex: "\\sum F_{\\text{towards centre}} = \\frac{mv^2}{r}, \\qquad \\sum F_{\\perp\\text{ plane of circle}} = 0 \\;(\\text{for a horizontal circle})",
    },
    { type: "heading", text: "A car on a flat curve" },
    {
      type: "text",
      content:
        "On a level road the forces on a car are its weight, the normal force (both vertical) and friction from the road. Only friction can point to the centre, so friction must supply all of $\\frac{mv^2}{r}$. It is *static* friction (the tyres roll without sliding sideways), so it has a ceiling $\\mu mg$:",
    },
    {
      type: "math",
      latex: "\\frac{mv^2}{r} \\le \\mu mg \\quad\\Rightarrow\\quad v_{\\max} = \\sqrt{\\mu r g}",
    },
    {
      type: "interactive",
      config: {
        component: "mfe-force-lab",
        mode: "banking",
        sliders: { angle: { min: 0, max: 0, step: 1, initial: 0 } },
        caption:
          "A flat road (bank angle pinned at 0). Radius 50 m and μ = 0.2 give v_max = 10 m/s. Start at 12 m/s, then slow down until the friction needed fits under the limit.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the friction needed, $\\frac{mv^2}{r}$, grows with the **square** of the speed, while the available friction $\\mu mg$ is fixed. At 12 m/s on a 50 m curve with $\\mu = 0.2$ the car needs 2880 N against 2000 N available, and it skids outward. At 10 m/s it needs exactly 2000 N. The mass cancels, so a truck and a scooter have the same limit.",
    },
    {
      type: "worked-example",
      id: "mfe4-4-we1",
      title: "Worked example 1: flat curve",
      problem:
        "A car takes an 80 m radius flat curve. $\\mu_s = 0.5$. What is the greatest safe speed?",
      steps: [
        { text: "Friction supplies the centripetal force: $\\frac{mv^2}{r} \\le \\mu mg$. *Why this step:* weight and normal force are vertical and cannot pull towards the centre." },
        { text: "$v_{\\max} = \\sqrt{0.5 \\times 80 \\times 10} = \\sqrt{400} = 20$ m/s (72 km/h)." },
      ],
      answer: "$v_{\\max} = 20$ m/s (72 km/h).",
    },
    { type: "heading", text: "Conical pendulums, turntables and rotors" },
    {
      type: "worked-example",
      id: "mfe4-4-we2",
      title: "Worked example 2: conical pendulum",
      problem:
        "A 0.5 kg bob on a 1 m string moves in a horizontal circle with the string at $60^\\circ$ to the vertical. Find the tension, the speed and the period.",
      steps: [
        { text: "Forces: tension $T$ along the string, weight $mg$. The circle is horizontal with radius $r = l\\sin 60^\\circ = \\tfrac{\\sqrt3}{2}$ m. *Why this step:* the centre of the circle is level with the bob, directly below the pivot, not at the pivot." },
        { text: "Vertical: $T\\cos 60^\\circ = mg$, so $T = 2mg = 10$ N." },
        { text: "Radial: $T\\sin 60^\\circ = \\frac{mv^2}{r}$. Dividing by the vertical equation: $\\tan\\theta = \\dfrac{v^2}{rg}$, so $v^2 = rg\\tan 60^\\circ = \\tfrac{\\sqrt3}{2} \\times 10 \\times \\sqrt3 = 15$, and $v = \\sqrt{15} \\approx 3.87$ m/s." },
        { text: "Period: $\\omega^2 = \\frac{g}{l\\cos\\theta}$ from the same two equations, so", latex: "T_{\\text{period}} = 2\\pi\\sqrt{\\frac{l\\cos\\theta}{g}} = 2\\pi\\sqrt{\\frac{1 \\times 0.5}{10}} = 2\\pi\\sqrt{0.05} \\approx 1.40\\text{ s}" },
      ],
      answer: "$T = 10$ N, $v = \\sqrt{15} \\approx 3.87$ m/s, period $\\approx 1.40$ s.",
    },
    {
      type: "worked-example",
      id: "mfe4-4-we3",
      title: "Worked example 3: coin on a turntable",
      problem:
        "A coin sits 10 cm from the centre of a turntable, $\\mu_s = 0.4$. What is the largest angular speed before it slips?",
      steps: [
        { text: "Static friction supplies $m\\omega^2 r$: $m\\omega^2 r \\le \\mu mg$." },
        { text: "$\\omega_{\\max} = \\sqrt{\\dfrac{\\mu g}{r}} = \\sqrt{\\dfrac{0.4 \\times 10}{0.1}} = \\sqrt{40} \\approx 6.3$ rad/s, about 60 revolutions per minute." },
        { text: "Larger $r$ means smaller $\\omega_{\\max}$: coins near the **rim** fly off first. *Why this step:* at fixed $\\omega$ the needed force $m\\omega^2 r$ grows with $r$, while the available friction does not." },
      ],
      answer: "$\\omega_{\\max} = \\sqrt{40} \\approx 6.3$ rad/s (about 60 rpm).",
    },
    {
      type: "worked-example",
      id: "mfe4-4-we4",
      title: "Worked example 4: the rotor ride",
      problem:
        "In a fairground rotor you stand against the wall of a cylinder of radius 2 m spinning at 5 rad/s; then the floor drops away. What coefficient of friction keeps you from sliding down?",
      steps: [
        { text: "The wall's **normal force** points to the centre and supplies $m\\omega^2 r$: $N = m \\times 25 \\times 2 = 50m$." },
        { text: "Friction (vertical, up) must hold the weight: $mg \\le \\mu N$. *Why this step:* the normal force is horizontal, so it cannot hold you up; friction can, and it is proportional to $N$." },
        { text: "$\\mu \\ge \\dfrac{g}{\\omega^2 r} = \\dfrac{10}{50} = 0.2$. The mass cancels again, so everyone stays up together." },
      ],
      answer: "$\\mu \\ge 0.2$.",
    },
    {
      type: "worked-example",
      id: "mfe4-4-we5",
      title: "Worked example 5: the breaking string",
      problem:
        "A 0.5 kg stone is whirled in a horizontal circle of radius 1 m on a smooth table by a string that breaks at 50 N. What is the greatest speed?",
      steps: [
        { text: "$T = \\frac{mv^2}{r}$, so $v_{\\max} = \\sqrt{\\dfrac{50 \\times 1}{0.5}} = 10$ m/s. When the string breaks the stone leaves along the tangent at 10 m/s." },
      ],
      answer: "$v_{\\max} = 10$ m/s.",
    },
    { type: "heading", text: "Centrifugal force" },
    {
      type: "text",
      content:
        "Sit on a spinning merry-go-round and you feel pushed outward. Lesson 3.7 explains this: the merry-go-round is an accelerating frame (its acceleration is $\\omega^2 r$ towards the centre), so in *its* frame every body feels a pseudo force $m\\omega^2 r$ **outward**. That pseudo force is the centrifugal force. It exists only in the rotating frame, balancing the real inward forces so that you are at rest there.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a body in circular motion is pushed outward by a centrifugal force\"",
      content:
        "In the ground frame nothing pushes it outward. The body is trying to go **straight** (first law), and the inward force keeps bending its path. If the inward force vanishes, it moves off along the tangent, not radially outward. Use centrifugal force only if you deliberately work in the rotating frame, and never together with $\\frac{mv^2}{r}$ on the other side of the equation.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Never draw $mv^2/r$ on the FBD",
      content:
        "The centripetal force is the *result* of the real forces, so it belongs on the right-hand side of $\\sum F = ma$, not as an extra arrow. Drawing it as a separate force double-counts.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "mfe4-4-q1",
      variant: "concept",
      question: "A car goes round a flat, unbanked curve at steady speed. What provides the centripetal force?",
      options: [
        { text: "The engine", feedback: "The engine drives the car along its direction of motion; it cannot provide a sideways pull." },
        { text: "Static friction between the tyres and the road", correct: true, feedback: "Friction is the only horizontal force that can point towards the centre on a flat road." },
        { text: "The normal force of the road", feedback: "On a flat road the normal force is vertical. (On a banked road part of it does point inward: Lesson 4.5.)" },
        { text: "The centrifugal force", feedback: "Centrifugal force points outward and exists only in the car's rotating frame. It cannot supply an inward force." },
      ],
      hint: "Draw the FBD of the car: weight, normal force and friction. Which of these points horizontally, towards the centre of the curve?",
    },
    {
      type: "numeric",
      id: "mfe4-4-q2",
      variant: "practice",
      question: "What is the greatest speed at which a car can take a flat curve of radius 40 m if $\\mu_s = 0.4$? Take $g = 10$ m/s² and give your answer in m/s, to one decimal place.",
      answer: Math.sqrt(160),
      relTolerance: 0.01,
      unit: "m/s",
      hint: "Static friction is the only inward force, and it can be at most $\\mu mg$.",
      solution: "$\\dfrac{mv^2}{r} \\le \\mu mg$, so $v_{\\max} = \\sqrt{\\mu r g} = \\sqrt{0.4 \\times 40 \\times 10} = \\sqrt{160} \\approx 12.6$ m/s.",
      commonMistakes: [
        { answer: 4, feedback: "That is $\\sqrt{\\mu r}$: the $g$ has gone missing. $v_{\\max} = \\sqrt{\\mu r g}$." },
        { answer: 160, feedback: "That is $v^2$. Take the square root." },
        { answer: 20, feedback: "That is $\\sqrt{rg}$, which would need $\\mu = 1$." },
      ],
    },
    {
      type: "numeric",
      id: "mfe4-4-q3",
      variant: "practice",
      question: "A conical pendulum has a 2 m string at $60^\\circ$ to the vertical. What is its period? Take $g = 10$ m/s² and give your answer in seconds, to two decimal places.",
      answer: 2 * Math.PI * Math.sqrt(0.1),
      relTolerance: 0.01,
      unit: "s",
      hint: "$T\\cos\\theta = mg$ and $T\\sin\\theta = m\\omega^2 l\\sin\\theta$.",
      solution: "Dividing the two equations gives $\\omega^2 = \\dfrac{g}{l\\cos\\theta}$, so\n$T_{\\text{period}} = 2\\pi\\sqrt{\\dfrac{l\\cos\\theta}{g}} = 2\\pi\\sqrt{\\dfrac{2 \\times 0.5}{10}} = 2\\pi\\sqrt{0.1} \\approx 1.99$ s.",
      commonMistakes: [
        { answer: 2 * Math.PI * Math.sqrt(0.2), feedback: "That uses $l/g$, the simple pendulum formula. For a conical pendulum it is $l\\cos\\theta/g$." },
        { answer: 2 * Math.PI * Math.sqrt(0.1 * Math.sqrt(3)), feedback: "That uses $l\\sin\\theta$ (the radius). The period depends on the *height* $l\\cos\\theta$ of the cone." },
      ],
    },
    {
      type: "quiz",
      id: "mfe4-4-q4",
      variant: "concept",
      question: "Coins are placed at 5 cm and 15 cm from the centre of a turntable (same $\\mu_s$). As the turntable is spun faster, which slips first?",
      options: [
        { text: "The one at 5 cm", feedback: "At a given $\\omega$ it needs the *smaller* force $m\\omega^2 r$." },
        { text: "The one at 15 cm", correct: true, feedback: "$\\omega_{\\max} = \\sqrt{\\mu g/r}$ is smaller for larger $r$." },
        { text: "Both at once, since the mass cancels", feedback: "The mass cancels, but the radius does not." },
      ],
      hint: "Each coin needs $m\\omega^2 r$ of friction and can get at most $\\mu_s mg$. At a given $\\omega$, which coin needs more?",
    },
    {
      type: "quiz",
      id: "mfe4-4-q5",
      variant: "practice",
      question: "A rotor of radius 2.5 m has walls with $\\mu = 0.4$. What is the least angular speed at which riders stay pinned when the floor drops?",
      options: [
        { text: "$10$ rad/s", feedback: "That is $\\omega^2$. Take the square root." },
        { text: "$\\sqrt{10} \\approx 3.16$ rad/s", correct: true, feedback: "$\\mu m\\omega^2 r \\ge mg$ gives $\\omega^2 \\ge \\frac{10}{0.4 \\times 2.5} = 10$." },
        { text: "$2$ rad/s", feedback: "That gives $\\mu\\omega^2 r = 4$ m/s², less than $g$: riders slide down." },
      ],
      hint: "The wall's normal force supplies the centripetal force $m\\omega^2 r$, and friction $\\mu N$ must hold up the weight (Worked example 4).",
    },
    {
      type: "quiz",
      id: "mfe4-4-q6",
      variant: "concept",
      multiple: true,
      question: "A coin rides without slipping on a turntable spinning at a constant angular speed $\\omega$, a distance $r$ from the axis. In the ground frame, select **all** the correct statements.",
      options: [
        { text: "The friction on the coin points towards the axis.", correct: true, feedback: "Friction is the only horizontal force, and the net force must point to the centre." },
        { text: "The coin's acceleration is $\\omega^2 r$, directed towards the axis.", correct: true, feedback: "Uniform circular motion: the speed is constant but the velocity turns, giving $\\omega^2 r$ inward." },
        { text: "The net force on the coin is zero because its speed is constant.", feedback: "Its velocity changes direction, so it accelerates; the net force is $m\\omega^2 r$ inward." },
        { text: "If $\\omega$ is doubled (and the coin still holds), the friction on it becomes four times as large.", correct: true, feedback: "The friction needed is $m\\omega^2 r$, which goes as $\\omega^2$." },
        { text: "Moved farther from the axis at the same $\\omega$, the coin needs less friction.", feedback: "The needed force $m\\omega^2 r$ grows with $r$, which is why coins near the rim slip first." },
      ],
      hint: "In the ground frame the coin moves in a circle at constant speed. Draw its FBD: which force can supply the acceleration circular motion needs, and how does that acceleration depend on $\\omega$ and $r$?",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "banking-of-roads",
  title: "4.5 · Banking of Roads",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "On a flat curve, friction alone keeps the car on the road, and in the rain friction may not be enough. Engineers have a better idea: tilt the road. On a **banked** curve the road surface slopes down towards the centre, so the normal force, which is perpendicular to the road, now leans inward. Part of it does the centripetal job, and at the right speed friction is not needed at all.",
    },
    { type: "heading", text: "The design speed" },
    {
      type: "text",
      content:
        "Suppose there is no friction. The forces are $mg$ (down) and $N$ (perpendicular to the road, tilted by $\\theta$ from the vertical). The car moves in a *horizontal* circle, so take axes horizontal (towards the centre) and vertical:",
    },
    {
      type: "math",
      latex: "\\begin{aligned} \\text{vertical:}\\quad N\\cos\\theta &= mg \\\\ \\text{towards centre:}\\quad N\\sin\\theta &= \\frac{mv^2}{r} \\end{aligned} \\qquad\\Rightarrow\\qquad \\tan\\theta = \\frac{v^2}{rg}, \\quad v_{\\text{opt}} = \\sqrt{rg\\tan\\theta}",
    },
    {
      type: "text",
      content:
        "At $v_{\\text{opt}}$ the road needs no friction. Faster than that, $N\\sin\\theta$ is not enough, the car tends to slide **up** and outward, and friction acts **down** the slope to help. Slower, the car tends to slide **down** the bank, and friction acts **up** the slope.",
    },
    {
      type: "interactive",
      config: {
        component: "mfe-force-lab",
        mode: "banking",
        showComponents: true,
        caption:
          "Radius 50 m banked at 15°: v_opt = √(50·10·tan 15°) ≈ 11.6 m/s. Move the speed through v_opt and watch the friction arrow shrink to zero and flip.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: at about 11.6 m/s the friction needed is zero. At 12 m/s a little friction points down the slope; at 5 m/s friction points up the slope. The readouts of $v_{\\min}$ and $v_{\\max}$ bracket the speeds at which the available friction $\\mu N$ can still cope.",
    },
    { type: "heading", text: "Maximum and minimum safe speeds" },
    {
      type: "text",
      content:
        "**The maximum speed.** At $v_{\\max}$, friction is at its limit $\\mu N$ and points **down** the slope. Its components: $\\mu N\\cos\\theta$ towards the centre and $\\mu N\\sin\\theta$ downward.",
    },
    {
      type: "math",
      latex: "\\begin{aligned} N\\cos\\theta - \\mu N\\sin\\theta &= mg \\\\ N\\sin\\theta + \\mu N\\cos\\theta &= \\frac{mv_{\\max}^2}{r} \\end{aligned} \\qquad\\Rightarrow\\qquad v_{\\max} = \\sqrt{rg\\,\\frac{\\sin\\theta + \\mu\\cos\\theta}{\\cos\\theta - \\mu\\sin\\theta}} = \\sqrt{rg\\,\\frac{\\tan\\theta + \\mu}{1 - \\mu\\tan\\theta}}",
    },
    {
      type: "text",
      content:
        "For $v_{\\min}$, friction points **up** the slope, which flips the sign of every $\\mu$:",
    },
    {
      type: "math",
      latex: "v_{\\min} = \\sqrt{rg\\,\\frac{\\tan\\theta - \\mu}{1 + \\mu\\tan\\theta}} \\qquad (\\text{zero if } \\mu \\ge \\tan\\theta)",
    },
    {
      type: "worked-example",
      id: "mfe4-5-we1",
      title: "Worked example 1: design speed",
      problem:
        "A curve of radius 30 m is banked at $15^\\circ$ ($\\tan 15^\\circ \\approx 0.268$). What speed needs no friction?",
      steps: [
        { text: "$v_{\\text{opt}} = \\sqrt{30 \\times 10 \\times 0.268} = \\sqrt{80.4} \\approx 9.0$ m/s, about 32 km/h." },
      ],
      answer: "$v \\approx 9.0$ m/s (about 32 km/h).",
    },
    {
      type: "worked-example",
      id: "mfe4-5-we2",
      title: "Worked example 2: safe speed range",
      problem:
        "A curve of radius 20 m is banked at $37^\\circ$ ($\\tan 37^\\circ = 0.75$), with $\\mu = 0.5$. Find $v_{\\max}$ and $v_{\\min}$.",
      steps: [
        { text: "$v_{\\max}^2 = rg\\dfrac{\\tan\\theta + \\mu}{1 - \\mu\\tan\\theta} = 200 \\times \\dfrac{1.25}{0.625} = 400$, so $v_{\\max} = 20$ m/s. *Why this step:* the $\\tan$ form avoids computing sines and cosines separately." },
        { text: "$v_{\\min}^2 = 200 \\times \\dfrac{0.75 - 0.5}{1 + 0.375} = 200 \\times \\dfrac{0.25}{1.375} \\approx 36.4$, so $v_{\\min} \\approx 6.0$ m/s." },
        { text: "Design speed for comparison: $\\sqrt{200 \\times 0.75} = \\sqrt{150} \\approx 12.2$ m/s, between the two." },
      ],
      answer: "$v_{\\max} = 20$ m/s and $v_{\\min} \\approx 6.0$ m/s.",
    },
    {
      type: "worked-example",
      id: "mfe4-5-we3",
      title: "Worked example 3: which way does friction act?",
      problem:
        "A car takes a 50 m curve banked at $15^\\circ$ at 20 m/s. Is friction up or down the slope, and how big must $\\mu$ be?",
      steps: [
        { text: "Compare with $v_{\\text{opt}} \\approx 11.6$ m/s: the car is faster, so it tends to slide outward, and friction acts **down** the slope. *Why this step:* the direction must be settled before the equations, or the signs go wrong." },
        { text: "Resolve along and perpendicular to the road (the acceleration $\\frac{v^2}{r} = 8$ m/s² is horizontal, so it has a component $8\\cos 15^\\circ$ along the road, down-slope-inward, and $8\\sin 15^\\circ$ into the road)." },
        { text: "Along the road: $f + mg\\sin 15^\\circ = m \\times 8\\cos 15^\\circ$, so $f = m(7.73 - 2.59) = 5.14m$." },
        { text: "Perpendicular: $N - mg\\cos 15^\\circ = m \\times 8\\sin 15^\\circ$, so $N = m(9.66 + 2.07) = 11.73m$." },
        { text: "Need $\\mu \\ge \\dfrac{f}{N} = \\dfrac{5.14}{11.73} \\approx 0.44$. With $\\mu = 0.2$ the car would skid outward." },
      ],
      answer: "Friction acts down the slope; $\\mu \\ge 0.44$.",
    },
    { type: "heading", text: "Railways, cyclists and aircraft" },
    {
      type: "text",
      content:
        "A railway curve is banked by raising the outer rail by $h$ above the inner rail over the gauge $b$. For small angles $\\tan\\theta \\approx \\sin\\theta = \\frac hb$, so $h \\approx \\dfrac{v^2 b}{rg}$. For a 1.5 m gauge, a 400 m curve and 20 m/s, $h = \\dfrac{400 \\times 1.5}{400 \\times 10} = 0.15$ m. A cyclist leans at $\\tan\\theta = \\frac{v^2}{rg}$ so that the road's total force (normal plus friction) passes through the centre of gravity; at 10 m/s on a 10 m curve that is $45^\\circ$. An aircraft banks its wings so that the lift force tilts inward exactly like a banked road's normal force.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"on a banked road $N = mg\\cos\\theta$\"",
      content:
        "That is the normal force on a block *at rest* on an incline, where the acceleration is zero. A car on a banked curve accelerates horizontally towards the centre, and part of that acceleration is into the road. Solving the two equations with friction $f$ along the road gives $N = m\\big(g\\cos\\theta + \\frac{v^2}{r}\\sin\\theta\\big)$, always **more** than $mg\\cos\\theta$. At the design speed it is $\\frac{mg}{\\cos\\theta}$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "mfe4-5-q1",
      variant: "practice",
      question: "A curve of radius 90 m is banked at $45^\\circ$. What is the speed at which no friction is needed?",
      options: [
        { text: "$900$ m/s", feedback: "That is $v^2$." },
        { text: "$30$ m/s", correct: true, feedback: "$v^2 = rg\\tan 45^\\circ = 900$." },
        { text: "$\\sqrt{450\\sqrt2} \\approx 25$ m/s", feedback: "That uses $\\sin 45^\\circ$ instead of $\\tan 45^\\circ$." },
        { text: "$0$: a $45^\\circ$ bank needs friction at every speed", feedback: "Any bank angle has one design speed at which $N$ alone supplies $\\frac{mv^2}{r}$." },
      ],
      hint: "At the design speed the normal force alone supplies the centripetal force, giving $\\tan\\theta = \\dfrac{v^2}{rg}$.",
    },
    {
      type: "quiz",
      id: "mfe4-5-q2",
      variant: "concept",
      question: "A car takes a banked curve **slower** than its design speed. Which way does friction on the tyres act?",
      options: [
        { text: "Down the slope, towards the centre", feedback: "That is the case above the design speed." },
        { text: "There is no friction below the design speed.", feedback: "Friction is zero only *at* the design speed." },
        { text: "Up the slope, away from the centre", correct: true, feedback: "At low speed $N\\sin\\theta$ is more than needed and the car tends to slide down the bank; friction resists that." },
      ],
      hint: "Below the design speed, is the horizontal part of $N$ more or less than the centripetal force needed? Which way would the car tend to slide?",
    },
    {
      type: "numeric",
      id: "mfe4-5-q3",
      variant: "practice",
      question: "A road of radius 20 m is banked at $37^\\circ$ ($\\tan 37^\\circ = 0.75$) with $\\mu = 0.5$. Take $g = 10$ m/s². What is the maximum safe speed, in m/s?",
      answer: 20,
      unit: "m/s",
      hint: "At $v_{\\max}$ friction is at its limit and points **down** the slope. Use the $\\tan$ form of the formula.",
      solution: "$v_{\\max}^2 = rg\\,\\dfrac{\\tan\\theta + \\mu}{1 - \\mu\\tan\\theta} = 200 \\times \\dfrac{0.75 + 0.5}{1 - 0.375} = 200 \\times \\dfrac{1.25}{0.625} = 400$, so $v_{\\max} = 20$ m/s.",
      commonMistakes: [
        { answer: Math.sqrt(150), tolerance: 0.1, feedback: "That is the design speed (no friction). Friction down the slope allows more." },
        { answer: Math.sqrt(250), tolerance: 0.1, feedback: "That adds $\\mu$ to $\\tan\\theta$ but forgets the denominator $1 - \\mu\\tan\\theta$." },
        { answer: 10, feedback: "That is $\\sqrt{\\mu r g}$, the flat-road limit. The bank helps." },
      ],
    },
    {
      type: "numeric",
      id: "mfe4-5-q4",
      variant: "practice",
      question: "A railway track (gauge 1.5 m) has a curve of radius 300 m designed for 15 m/s. How much higher should the outer rail be? Take $g = 10$ m/s² and give your answer in centimetres.",
      answer: 11.25,
      tolerance: 0.06,
      unit: "cm",
      hint: "For small angles $\\tan\\theta \\approx \\sin\\theta = \\dfrac hb$, and the design condition is $\\tan\\theta = \\dfrac{v^2}{rg}$.",
      solution: "$h = \\dfrac{v^2 b}{rg} = \\dfrac{225 \\times 1.5}{300 \\times 10} = \\dfrac{337.5}{3000} = 0.1125$ m $= 11.25$ cm.",
      commonMistakes: [
        { answer: 7.5, feedback: "That is the slope $\\tan\\theta = \\frac{v^2}{rg} = 0.075$ treated as metres, not a height. Multiply by the gauge." },
        { answer: 112.5, feedback: "Check the powers of ten: $\\frac{337.5}{3000} = 0.1125$ m, which is 11.25 cm." },
        { answer: 0.1125, tolerance: 0.01, feedback: "That is the height in metres. The answer is asked for in centimetres." },
      ],
    },
    {
      type: "quiz",
      id: "mfe4-5-q5",
      variant: "concept",
      question: "At the design speed of a banked curve (angle $\\theta$), how does the normal force compare with $mg$?",
      options: [
        { text: "$N = mg\\cos\\theta$, less than $mg$", feedback: "That is the incline-at-rest value. Here the car accelerates towards the centre." },
        { text: "$N = mg$", feedback: "Vertical balance is $N\\cos\\theta = mg$, not $N = mg$." },
        { text: "$N = \\dfrac{mg}{\\cos\\theta}$, more than $mg$", correct: true, feedback: "Only the vertical part $N\\cos\\theta$ holds the car up, so $N$ must exceed $mg$." },
      ],
      hint: "Resolve $N$ into vertical and horizontal parts. With no friction, which part must balance the weight?",
    },
    {
      type: "quiz",
      id: "mfe4-5-q6",
      variant: "concept",
      multiple: true,
      question: "A car takes a banked curve **faster** than its design speed but slower than $v_{\\max}$, without skidding. Select **all** the correct statements.",
      options: [
        { text: "Friction on the tyres acts down the slope.", correct: true, feedback: "Above the design speed $N\\sin\\theta$ is not enough on its own; the car tends to slide up and out, so friction points down the slope (with an inward component)." },
        { text: "The normal force is greater than $mg$.", correct: true, feedback: "$N = m\\big(g\\cos\\theta + \\frac{v^2}{r}\\sin\\theta\\big)$ grows with $v$, and already equals $\\frac{mg}{\\cos\\theta} > mg$ at the design speed." },
        { text: "The friction equals $\\mu N$.", feedback: "Static friction reaches $\\mu N$ only at $v_{\\max}$. Below it, friction is just what is needed." },
        { text: "A heavier car at the same speed would skid.", feedback: "Every force scales with $m$, so the mass cancels: the safe speed range is the same for every car." },
        { text: "The horizontal component of $N$ alone supplies $\\frac{mv^2}{r}$.", feedback: "That is true only at the design speed. Here the friction's inward component supplies the rest." },
      ],
      hint: "Above the design speed, which way does the car tend to slide? Friction opposes that tendency. Write the vertical and horizontal equations with friction included and test each statement.",
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "motion-in-a-vertical-circle",
  title: "4.6 · Motion in a Vertical Circle",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "Swing a bucket of water in a vertical circle fast enough and not a drop spills, even when the bucket is upside down. Swing it too slowly and you get wet. A vertical circle is harder than a horizontal one because gravity now acts **along** the path at most points: the body slows down on the way up and speeds up on the way down, so the needed inward force changes all the way round.",
    },
    { type: "heading", text: "Speed and tension round the circle" },
    {
      type: "text",
      content:
        "**The set-up.** A bob of mass $m$ on a light string of length $R$ is given speed $u$ at the lowest point. Measure its position by the angle $\\theta$ from the lowest point. Two forces act: tension $T$ along the string (towards the centre) and weight $mg$. Split the weight into a **tangential** part $mg\\sin\\theta$ (opposing the motion on the way up) and a **radial** part $mg\\cos\\theta$ (pointing away from the centre when the bob is below the centre's level, i.e. for $\\theta < 90^\\circ$).",
    },
    {
      type: "text",
      content:
        "**The tangential equation gives the speed.** Along the path, with arc length $s = R\\theta$, Chapter 1's $a = v\\frac{dv}{ds}$ gives",
    },
    {
      type: "math",
      latex: "v\\frac{dv}{ds} = -g\\sin\\theta \\;\\Rightarrow\\; v\\,dv = -gR\\sin\\theta\\,d\\theta \\;\\Rightarrow\\; \\tfrac12v^2 - \\tfrac12u^2 = gR(\\cos\\theta - 1)",
    },
    {
      type: "math",
      latex: "v^2 = u^2 - 2gR(1 - \\cos\\theta)",
    },
    {
      type: "text",
      content:
        "Check: $R(1 - \\cos\\theta)$ is exactly the height of the bob above the lowest point, so this is $v^2 = u^2 - 2gh$, the free-fall formula along a curved path. (Chapter 5 gets it in one line from energy.)\n\n**The radial equation gives the tension.** Towards the centre, the net force is $T - mg\\cos\\theta$, and it must equal $\\frac{mv^2}{R}$:",
    },
    {
      type: "math",
      latex: "T = \\frac{mv^2}{R} + mg\\cos\\theta = \\frac{m}{R}\\Big(u^2 - 2gR + 3gR\\cos\\theta\\Big)",
    },
    {
      type: "text",
      content:
        "At the bottom ($\\theta = 0$): $T = \\frac{mu^2}{R} + mg$. At the top ($\\theta = 180^\\circ$, $\\cos\\theta = -1$): $T = \\frac{mv_{\\text{top}}^2}{R} - mg$, with $v_{\\text{top}}^2 = u^2 - 4gR$. Subtracting,",
    },
    {
      type: "math",
      latex: "T_{\\text{bottom}} - T_{\\text{top}} = 6mg \\quad (\\text{whatever } u \\text{ is, as long as the string stays taut})",
    },
    { type: "heading", text: "Completing the loop" },
    {
      type: "text",
      content:
        "A string can only pull: $T \\ge 0$. Tension is least at the top, so the condition is $T_{\\text{top}} \\ge 0$, i.e. $v_{\\text{top}}^2 \\ge gR$ (gravity alone supplies the centripetal force). Then $u^2 = v_{\\text{top}}^2 + 4gR \\ge 5gR$:",
    },
    {
      type: "math",
      latex: "u \\ge \\sqrt{5gR} \\;\\;(\\text{string}), \\qquad u \\ge \\sqrt{4gR} \\;\\;(\\text{rigid rod or inside a tube, which can push as well as pull})",
    },
    {
      type: "interactive",
      config: {
        component: "mfe-force-lab",
        mode: "vertical-circle",
        caption:
          "m = 1 kg, R = 1 m, u = 8 m/s at the bottom (√(5gR) ≈ 7.07 m/s). Slide θ round the loop. Then drop u to 6 m/s and find where the string goes slack.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: at $u = 8$ m/s the tension falls from 74 N at the bottom to 14 N at the top (a difference of 60 N $= 6mg$) and never reaches zero. At $u = 6$ m/s ($u^2 = 36$, between $2gR = 20$ and $5gR = 50$) the tension hits zero part-way up the upper half, the string goes slack, and the bob leaves the circle on a parabola. Below $u = \\sqrt{2gR} \\approx 4.5$ m/s the bob never rises above the centre and just swings back and forth.",
    },
    {
      type: "table",
      headers: ["Speed at the bottom", "What happens (string)"],
      rows: [
        ["$u \\ge \\sqrt{5gR}$", "completes the circle, string always taut"],
        ["$\\sqrt{2gR} < u < \\sqrt{5gR}$", "string slackens somewhere in the upper half; the bob follows a parabola"],
        ["$u \\le \\sqrt{2gR}$", "rises no higher than the centre's level; oscillates like a pendulum"],
      ],
    },
    { type: "heading", text: "Loops, humps and buckets" },
    {
      type: "worked-example",
      id: "mfe4-6-we1",
      title: "Worked example 1: tensions round the loop",
      problem:
        "A 0.5 kg bob on a 1 m string has 8 m/s at the bottom. Find the tension at the bottom, at the side ($\\theta = 90^\\circ$) and at the top.",
      steps: [
        { text: "Bottom: $T = 0.5 \\times 64 + 5 = 37$ N." },
        { text: "Side: $v^2 = 64 - 20 = 44$; $T = 0.5 \\times 44 + 5\\cos 90^\\circ = 22$ N. *Why this step:* at the side the weight is tangential, so the tension alone supplies $\\frac{mv^2}{R}$." },
        { text: "Top: $v^2 = 64 - 40 = 24$; $T = 0.5 \\times 24 - 5 = 7$ N." },
        { text: "Check: $37 - 7 = 30 = 6 \\times 0.5 \\times 10$. ✓" },
      ],
      answer: "Bottom 37 N, side 22 N, top 7 N.",
    },
    {
      type: "worked-example",
      id: "mfe4-6-we2",
      title: "Worked example 2: where does the string go slack?",
      problem:
        "The bob is given $u = \\sqrt{3gR}$. At what angle does the string slacken, and how fast is the bob moving then?",
      steps: [
        { text: "Set $T = 0$: $u^2 - 2gR + 3gR\\cos\\theta = 0$, so $3gR - 2gR + 3gR\\cos\\theta = 0$. *Why this step:* slack is exactly where the formula for $T$ first hits zero." },
        { text: "$\\cos\\theta = -\\tfrac13$, so $\\theta \\approx 109.5^\\circ$ from the bottom, about $19.5^\\circ$ above the horizontal through the centre." },
        { text: "Height above the bottom: $R(1 - \\cos\\theta) = \\tfrac43 R$. Speed: $v^2 = 3gR - 2gR \\cdot \\tfrac43 = \\tfrac{gR}{3}$, and it is **not zero**: the bob leaves the circle moving, and flies on as a projectile." },
      ],
      answer: "At $\\cos\\theta = -\\tfrac13$ ($\\theta \\approx 109.5^\\circ$ from the bottom), with $v = \\sqrt{gR/3}$.",
    },
    {
      type: "worked-example",
      id: "mfe4-6-we3",
      title: "Worked example 3: car over a hump",
      problem:
        "A car drives over a hump of radius 10 m. At the top, forces are $mg$ down and $N$ up, and the centre of the circle is **below** the car. Find the normal force on a 1000 kg car at 5 m/s, and the speed at which a car leaves the road.",
      steps: [
        { text: "$mg - N = \\dfrac{mv^2}{r}$, so $N = m\\Big(g - \\dfrac{v^2}{r}\\Big)$. At 5 m/s a 1000 kg car has $N = 1000(10 - 2.5) = 7500$ N; it feels lighter." },
        { text: "$N = 0$ at $v = \\sqrt{gr} = 10$ m/s (36 km/h). Faster, the road cannot pull the car down, so the car leaves the road. *Why this step:* a road can only push, so $N \\ge 0$ is the contact condition, just as $T \\ge 0$ was for the string." },
      ],
      answer: "$N = 7500$ N at 5 m/s; the car leaves the road above $\\sqrt{gr} = 10$ m/s (36 km/h).",
    },
    {
      type: "worked-example",
      id: "mfe4-6-we4",
      title: "Worked example 4: the bucket",
      problem:
        "A bucket of water is swung in a vertical circle of radius 1 m. What is the least speed at the top for the water to stay in?",
      steps: [
        { text: "At the top the bucket's base pushes the water down with $N \\ge 0$: $N + mg = \\frac{mv^2}{R}$. The least speed has $N = 0$: $v = \\sqrt{gR} = \\sqrt{10} \\approx 3.2$ m/s. At that speed the water is in free fall, but so is the bucket, and gravity is exactly what is needed to curve the path." },
      ],
      answer: "$v_{\\min} = \\sqrt{gR} = \\sqrt{10} \\approx 3.2$ m/s.",
    },
    {
      type: "text",
      content:
        "**Loop-the-loop preview.** A ball released from height $h$ on a smooth track enters a vertical loop of radius $R$. It arrives at the bottom with $u^2 = 2gh$, and needs $u^2 \\ge 5gR$ to get round. So $h \\ge \\frac52 R$. Chapter 5 derives this with energy in two lines.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"at the top of the loop the net force is zero\"",
      content:
        "At the top the bob is moving in a circle, so it has a centripetal acceleration $\\frac{v^2}{R}$ **downward**. The net force is $T + mg = \\frac{mv^2}{R}$, pointing down. It is never zero anywhere on a circle.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the string slackens only at the very top\"",
      content:
        "If $u$ is too small to complete the loop, the tension usually reaches zero **before** the top, somewhere in the upper half (at $\\cos\\theta = -\\frac13$ for $u^2 = 3gR$). The bob then leaves the circle with non-zero speed and follows a parabola inside the circle.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "mfe4-6-q1",
      variant: "practice",
      question: "What is the least speed at the lowest point for a bob on a 2.5 m string to complete a vertical circle? Take $g = 10$ m/s² and give your answer in m/s, to one decimal place.",
      answer: Math.sqrt(125),
      relTolerance: 0.01,
      unit: "m/s",
      hint: "The string must stay taut at the top: $T_{\\text{top}} \\ge 0$ means $v_{\\text{top}}^2 \\ge gR$.",
      solution: "At the top, $v_{\\text{top}}^2 \\ge gR$. Climbing $2R$ costs $4gR$, so $u^2 \\ge 5gR = 5 \\times 10 \\times 2.5 = 125$ and $u = \\sqrt{125} \\approx 11.2$ m/s.",
      commonMistakes: [
        { answer: 5, feedback: "That is $\\sqrt{gR}$, the least speed at the *top*." },
        { answer: 10, feedback: "That is $\\sqrt{4gR}$, which is enough for a rigid rod, not for a string." },
        { answer: Math.sqrt(50), feedback: "That is $\\sqrt{2gR}$, just enough to reach the horizontal." },
      ],
    },
    {
      type: "numeric",
      id: "mfe4-6-q2",
      variant: "practice",
      question: "A 1 kg bob on a 1 m string has 8 m/s at the bottom. Take $g = 10$ m/s². What is the tension at the top, in newtons?",
      answer: 14,
      unit: "N",
      hint: "First find $v_{\\text{top}}^2 = u^2 - 4gR$. At the top both $T$ and $mg$ point towards the centre.",
      solution: "$v_{\\text{top}}^2 = 64 - 4 \\times 10 \\times 1 = 24$.\n\nAt the top: $T + mg = \\dfrac{mv_{\\text{top}}^2}{R}$, so $T = 24 - 10 = 14$ N.",
      commonMistakes: [
        { answer: 24, feedback: "That is $\\frac{mv^2}{R}$ at the top. Gravity supplies 10 N of it." },
        { answer: 34, feedback: "That adds $mg$. At the top the weight points towards the centre and helps." },
        { answer: 54, feedback: "That uses the bottom speed at the top. The bob slows as it climbs $2R$." },
      ],
    },
    {
      type: "quiz",
      id: "mfe4-6-q3",
      variant: "concept",
      question: "For a bob completing a vertical circle on a string, what is $T_{\\text{bottom}} - T_{\\text{top}}$?",
      options: [
        { text: "$2mg$", feedback: "The weight's direction flips (+$mg$ and −$mg$), giving $2mg$, but the speed also changes, which adds $4mg$." },
        { text: "$6mg$", correct: true, feedback: "$\\frac{m(u^2 - v_{\\text{top}}^2)}{R} = 4mg$ from the speed change, plus $2mg$ from the weight's flip." },
        { text: "It depends on the speed $u$.", feedback: "The $u^2$ terms cancel exactly." },
      ],
      hint: "Use energy conservation between the bottom and top for $u^2 - v^2$, and the radial equation at each point for the tensions. Subtract them.",
    },
    {
      type: "quiz",
      id: "mfe4-6-q4",
      variant: "practice",
      question: "A bob on a string of length $R$ is given $u = \\sqrt{4gR}$ at the bottom. At what height above the bottom does the string go slack?",
      options: [
        { text: "$\\dfrac{5R}{3}$", correct: true, feedback: "$T = 0$: $4gR - 2gR + 3gR\\cos\\theta = 0$, so $\\cos\\theta = -\\frac23$ and $h = R(1 + \\frac23) = \\frac{5R}{3}$." },
        { text: "$2R$ (the top)", feedback: "$\\sqrt{4gR} < \\sqrt{5gR}$, so it cannot reach the top with the string taut." },
        { text: "$\\dfrac{4R}{3}$", feedback: "That is the slack height for $u = \\sqrt{3gR}$." },
        { text: "$R$", feedback: "At the side the tension is $\\frac{m(4gR - 2gR)}{R} = 2mg > 0$; the string is still taut." },
      ],
      hint: "Write $v^2$ at angle $\\theta$ from energy conservation and $T$ from the radial equation, then set $T = 0$ (Worked example 2).",
    },
    {
      type: "quiz",
      id: "mfe4-6-q5",
      variant: "practice",
      question: "A car crosses a hump of radius 40 m. What is the greatest speed at which it keeps contact at the top?",
      options: [
        { text: "$400$ m/s", feedback: "That is $v^2$." },
        { text: "$\\sqrt{200} \\approx 14$ m/s", feedback: "That is $\\sqrt{gr/2}$. The condition is $\\frac{v^2}{r} = g$." },
        { text: "$20$ m/s", correct: true, feedback: "$N = m(g - \\frac{v^2}{r}) \\ge 0$ gives $v \\le \\sqrt{gr} = 20$ m/s." },
      ],
      hint: "At the top of the hump, $mg - N = \\dfrac{mv^2}{r}$. Contact is lost when $N$ reaches zero.",
    },
    {
      type: "quiz",
      id: "mfe4-6-q6",
      variant: "practice",
      multiple: true,
      question: "A bob on a light 1 m string is given 6 m/s at the lowest point ($g = 10$ m/s²). Select **all** the correct statements.",
      options: [
        { text: "It does not complete the circle.", correct: true, feedback: "$u^2 = 36 < 5gR = 50$." },
        { text: "It rises above the level of the centre with the string still taut.", correct: true, feedback: "$u^2 = 36 > 2gR = 20$, so the bob passes the horizontal; at the side $T = \\frac{m(36 - 20)}{1} = 16m > 0$." },
        { text: "The string goes slack about 1.53 m above the lowest point.", correct: true, feedback: "$T = 0$: $36 - 20 + 30\\cos\\theta = 0$, so $\\cos\\theta = -\\frac{8}{15}$ and $h = R(1 - \\cos\\theta) = \\frac{23}{15} \\approx 1.53$ m." },
        { text: "When the string goes slack, the bob is momentarily at rest.", feedback: "$v^2 = 36 - 2 \\times 10 \\times \\frac{23}{15} = \\frac{16}{3} \\ne 0$. The bob leaves the circle moving and follows a parabola." },
        { text: "The tension at the bottom exceeds the tension at the top by $6mg$.", feedback: "$6mg$ holds only if the string stays taut all the way round. Here the bob never reaches the top on the circle." },
      ],
      hint: "Compare $u$ with $\\sqrt{5gR}$ and $\\sqrt{2gR}$ to classify the motion, then find where $T = 0$ using energy conservation plus the radial equation (Worked example 2).",
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-4-mastery",
  title: "4.7 · Chapter 4 Mastery",
  position: 7,
  blocks: blocks([
    {
      type: "text",
      content:
        "No formula sheet. For friction, ask one question first: is it sliding, or could static friction cope? For circles, draw the real forces and make their inward sum equal $\\frac{mv^2}{r}$. ($g = 10$ m/s² throughout.)",
    },
    {
      type: "callout",
      variant: "info",
      title: "Chapter 4 in six lines",
      content:
        "1. Static friction is whatever is needed, up to $\\mu_s N$; kinetic friction is $\\mu_k N$, opposing relative sliding.\n2. Least pulling force: $\\frac{\\mu mg}{\\sqrt{1+\\mu^2}}$ at $\\tan\\theta = \\mu$; angle of repose: $\\tan\\theta_r = \\mu_s$.\n3. Incline: compare $mg\\sin\\theta$ with $\\mu_s mg\\cos\\theta$; sliding down $a = g(\\sin\\theta - \\mu_k\\cos\\theta)$.\n4. Stacked blocks: assume together, find the friction needed, compare with $\\mu N$.\n5. Circular motion: net inward force $= \\frac{mv^2}{r}$ (flat curve $\\sqrt{\\mu rg}$, banking $\\tan\\theta = \\frac{v^2}{rg}$, conical pendulum the same).\n6. Vertical circle: $v^2 = u^2 - 2gR(1 - \\cos\\theta)$, $T = \\frac{mv^2}{R} + mg\\cos\\theta \\ge 0$; loop needs $u \\ge \\sqrt{5gR}$.",
    },
    {
      type: "quiz",
      id: "mfe4-7-q1",
      variant: "mastery",
      question: "An 8 kg crate rests on a floor ($\\mu_s = 0.5$, $\\mu_k = 0.4$). A horizontal 30 N push acts. What is the friction?",
      options: [
        { text: "$40$ N", feedback: "That is the ceiling $\\mu_s mg$. The push is below it, so friction only matches the push." },
        { text: "$30$ N", correct: true, feedback: "30 N < 40 N: static friction balances the push exactly." },
        { text: "$32$ N", feedback: "That is kinetic friction, but the crate is not sliding." },
      ],
      hint: "Lesson 4.1: compare the push with $\\mu_s N$ before using any friction formula.",
    },
    {
      type: "numeric",
      id: "mfe4-7-q2",
      variant: "mastery",
      question: "The same crate (8 kg, $\\mu_s = 0.5$, $\\mu_k = 0.4$) is pushed horizontally with 50 N. What is its acceleration, in m/s²? (Enter 0 if it does not move.)",
      answer: 2.25,
      unit: "m/s²",
      hint: "Static limit first: does 50 N beat $\\mu_s mg$? If so, which friction acts once it slides?",
      solution: "Static limit: $0.5 \\times 80 = 40$ N < 50 N, so the crate slides.\n\nKinetic friction: $0.4 \\times 80 = 32$ N, so $a = \\dfrac{50 - 32}{8} = 2.25$ m/s².",
      commonMistakes: [
        { answer: 1.25, feedback: "That subtracts 40 N (the static limit). Once sliding, friction is $0.4 \\times 80 = 32$ N." },
        { answer: 6.25, feedback: "That ignores friction." },
        { answer: 0, feedback: "50 N exceeds the 40 N static limit, so the crate slides." },
      ],
    },
    {
      type: "quiz",
      id: "mfe4-7-q3",
      variant: "mastery",
      question: "What is the least force that can start a 4 kg block sliding on a floor with $\\mu = 0.75$?",
      options: [
        { text: "$30$ N", feedback: "That is the horizontal pull. Tilting the pull upward reduces the normal force and the friction." },
        { text: "$24$ N", correct: true, feedback: "$\\frac{\\mu mg}{\\sqrt{1+\\mu^2}} = \\frac{30}{1.25} = 24$ N, at $37^\\circ$ above the horizontal." },
        { text: "$18$ N", feedback: "That is $30 \\times 0.6$. The minimum divides by $\\sqrt{1+\\mu^2} = 1.25$." },
      ],
      hint: "Pulling at an angle (lesson 4.1): which angle needs the least force?",
    },
    {
      type: "quiz",
      id: "mfe4-7-q4",
      variant: "mastery",
      question: "A 5 kg block rests on a $30^\\circ$ incline with $\\mu_s = 0.7$. What is the friction on it?",
      options: [
        { text: "$\\approx 30.3$ N up the slope", feedback: "That is the ceiling $\\mu_s mg\\cos 30^\\circ$. The block needs only 25 N." },
        { text: "$25\\sqrt3$ N up the slope", feedback: "That is $mg\\cos 30^\\circ$, the normal force." },
        { text: "$25$ N up the slope", correct: true, feedback: "$\\tan 30^\\circ \\approx 0.58 < 0.7$, so it rests and friction balances $mg\\sin 30^\\circ = 25$ N." },
        { text: "Zero, since it is not moving", feedback: "Without friction it would slide. Static friction holds it." },
      ],
      hint: "Lesson 4.2: first check whether the block holds, then static friction just balances the down-slope pull.",
    },
    {
      type: "numeric",
      id: "mfe4-7-q5",
      variant: "mastery",
      question: "A 1 kg block sits on a 3 kg block ($\\mu = 0.4$ between them, smooth floor). A 20 N force pulls the bottom block. What is the top block's acceleration, in m/s²?",
      answer: 4,
      unit: "m/s²",
      hint: "Find the critical force: the top block can be dragged at most at $\\mu g$.",
      solution: "$F_{\\text{crit}} = (1 + 3) \\times \\mu g = 4 \\times 4 = 16$ N < 20 N, so they slip.\n\nKinetic friction $0.4 \\times 10 = 4$ N drives the 1 kg block at 4 m/s² (the bottom block has $\\frac{20 - 4}{3} \\approx 5.33$ m/s²).",
      commonMistakes: [
        { answer: 5, feedback: "That assumes they move together. $F_{\\text{crit}} = 4 \\times 4 = 16$ N < 20 N, so they slip." },
        { answer: 16 / 3, tolerance: 0.05, feedback: "That is the bottom block's acceleration." },
        { answer: 0, feedback: "Friction from the bottom block drags the top block forward." },
      ],
    },
    {
      type: "quiz",
      id: "mfe4-7-q6",
      variant: "mastery",
      question: "A curve of radius $10\\sqrt3$ m is banked at $30^\\circ$. What is its design speed?",
      options: [
        { text: "$\\sqrt{300} \\approx 17.3$ m/s", feedback: "That uses $\\tan 60^\\circ$. The bank angle is $30^\\circ$." },
        { text: "$\\sqrt{50\\sqrt3} \\approx 9.3$ m/s", feedback: "That uses $\\sin 30^\\circ$. The condition is $\\tan\\theta = \\frac{v^2}{rg}$." },
        { text: "$10$ m/s", correct: true, feedback: "$v^2 = rg\\tan 30^\\circ = 10\\sqrt3 \\times 10 \\times \\frac{1}{\\sqrt3} = 100$." },
      ],
      hint: "Design speed of a banked road (lesson 4.5).",
    },
    {
      type: "quiz",
      id: "mfe4-7-q7",
      variant: "mastery",
      question: "A flat curve has radius 50 m and $\\mu_s = 0.45$. A driver takes it at 18 m/s. What happens?",
      options: [
        { text: "The car makes it; friction needed is less than available.", feedback: "Needed: $\\frac{v^2}{r} \\approx 6.5$ m/s² of inward acceleration; available: $\\mu g = 4.5$ m/s²." },
        { text: "The car skids inward, towards the centre.", feedback: "Without enough inward force the car follows a wider path than the curve, i.e. it drifts outward." },
        { text: "The car skids outward, because $v_{\\max} = 15$ m/s.", correct: true, feedback: "$\\sqrt{0.45 \\times 50 \\times 10} = 15$ m/s; at 18 m/s friction cannot supply $\\frac{mv^2}{r}$." },
      ],
      hint: "Lesson 4.4: compare the friction needed at 18 m/s with the most the road can supply.",
    },
    {
      type: "numeric",
      id: "mfe4-7-q8",
      variant: "mastery",
      question: "A conical pendulum on a 2.5 m string moves with the string at $37^\\circ$ to the vertical ($\\cos 37^\\circ = 0.8$). What is its angular speed? Give your answer in rad/s, to two decimal places.",
      answer: Math.sqrt(5),
      relTolerance: 0.01,
      unit: "rad/s",
      hint: "$T\\cos\\theta = mg$ and $T\\sin\\theta = m\\omega^2 l\\sin\\theta$.",
      solution: "Dividing the two equations: $\\omega^2 = \\dfrac{g}{l\\cos\\theta} = \\dfrac{10}{2.5 \\times 0.8} = 5$, so $\\omega = \\sqrt5 \\approx 2.24$ rad/s.",
      commonMistakes: [
        { answer: 2, feedback: "That is $\\sqrt{g/l}$, ignoring the tilt." },
        { answer: Math.sqrt(20 / 3), feedback: "That uses $l\\sin\\theta = 1.5$ m. The formula has the cone's height $l\\cos\\theta$." },
      ],
    },
    {
      type: "quiz",
      id: "mfe4-7-q9",
      variant: "mastery",
      question: "A 0.5 kg bob on a 1 m string has 8 m/s at the lowest point. What is the tension when the string is horizontal?",
      options: [
        { text: "$32$ N", feedback: "That uses the bottom speed. The bob has climbed 1 m: $v^2 = 64 - 20 = 44$." },
        { text: "$27$ N", feedback: "That adds $mg$; at the side the weight has no radial component." },
        { text: "$17$ N", feedback: "That subtracts $mg$; at the side the weight has no radial component." },
        { text: "$22$ N", correct: true, feedback: "At the side the weight is tangential, so $T = \\frac{mv^2}{R} = 0.5 \\times 44 = 22$ N." },
      ],
      hint: "Motion in a vertical circle (lesson 4.6).",
    },
    {
      type: "quiz",
      id: "mfe4-7-q10",
      variant: "mastery",
      question: "A bob on a light string of length $R$ is given $u = \\sqrt{3gR}$ at the bottom. Which describes its motion?",
      options: [
        { text: "It completes the circle.", feedback: "That needs $u \\ge \\sqrt{5gR}$." },
        { text: "The string slackens at $\\cos\\theta = -\\tfrac13$ (above the centre) and the bob follows a parabola.", correct: true, feedback: "$T = mg(1 + 3\\cos\\theta) = 0$ there, with $v^2 = \\frac{gR}{3} \\ne 0$." },
        { text: "It swings up to the horizontal and back.", feedback: "That happens for $u \\le \\sqrt{2gR}$; here it has more than enough to pass the horizontal." },
        { text: "The string slackens exactly at the top.", feedback: "At the top the tension would be $\\frac{m(3gR - 4gR)}{R} - mg < 0$, so it has already gone slack earlier." },
      ],
      hint: "Motion in a vertical circle (lesson 4.6): where, if anywhere, does the string go slack?",
    },
    {
      type: "quiz",
      id: "mfe4-7-q11",
      variant: "mastery",
      question: "JEE Advanced. A 2 kg block rests 0.5 m from the centre of a rough horizontal turntable ($\\mu = 0.25$). A string from it runs through a smooth hole at the centre to a 1 kg block hanging at rest below. For what range of $\\omega$ does the 2 kg block stay at rest relative to the table?",
      options: [
        { text: "$\\sqrt5 \\le \\omega \\le \\sqrt{15}$ rad/s", correct: true, feedback: "$T = 10$ N. Friction (up to 5 N) can point either way: $10 - 5 \\le 2\\omega^2(0.5) \\le 10 + 5$, so $5 \\le \\omega^2 \\le 15$." },
        { text: "$\\omega = \\sqrt{10}$ rad/s only", feedback: "That is the speed at which no friction is needed. Friction widens it into a range." },
        { text: "$0 \\le \\omega \\le \\sqrt{15}$ rad/s", feedback: "At low $\\omega$ the 10 N tension would pull the block inward; friction can hold only 5 N of that." },
        { text: "$\\sqrt{7.5} \\le \\omega \\le \\sqrt{12.5}$ rad/s", feedback: "That takes the friction limit as 2.5 N. It is $\\mu Mg = 0.25 \\times 20 = 5$ N." },
      ],
      hint: "Friction on the platform block points outward at low $\\omega$ and inward at high $\\omega$.",
    },
    {
      type: "numeric",
      id: "mfe4-7-q12",
      variant: "mastery",
      question: "JEE Advanced. A 2 kg block sits on a 4 kg block; $\\mu_1 = 0.3$ between them and $\\mu_2 = 0.1$ between the lower block and the floor. A horizontal force pulls the lower block. What is the least force, in newtons, for the blocks to slip relative to each other?",
      answer: 24,
      unit: "N",
      hint: "At the slipping limit the top block has its largest acceleration, $\\mu_1 g$, and both blocks still share it. Which normal force sets the floor's friction?",
      solution: "Floor friction: $\\mu_2(m_1 + m_2)g = 0.1 \\times 60 = 6$ N, backward.\n\nAt the limit both move at $\\mu_1 g = 3$ m/s²: $F - 6 = 6 \\times 3$, so $F = 24$ N.",
      commonMistakes: [
        { answer: 18, feedback: "That ignores the floor. The floor's friction, $0.1 \\times 60 = 6$ N, must also be overcome." },
        { answer: 22, feedback: "That uses floor friction $0.1 \\times 40 = 4$ N. The floor supports both blocks, so $N = 60$ N." },
        { answer: 6, feedback: "6 N is just enough to start the pair moving together." },
      ],
    },
    {
      type: "quiz",
      id: "mfe4-7-q13",
      variant: "mastery",
      multiple: true,
      question: "JEE Advanced. A block of mass $m$ rests on a rough incline of angle $\\theta$, with $\\tan\\theta < \\mu_s$. Select **all** the correct statements.",
      options: [
        { text: "The friction on the block is $mg\\sin\\theta$, up the slope.", correct: true, feedback: "At rest, friction balances the down-slope part of the weight, and no more." },
        { text: "The friction on the block is $\\mu_s mg\\cos\\theta$.", feedback: "That is the ceiling, reached only at the angle of repose. Here $\\tan\\theta < \\mu_s$, so friction is less than its limit." },
        { text: "The total contact force from the incline (normal plus friction) is $mg$, vertically upward.", correct: true, feedback: "Only two things act, the weight and the contact force, and they must cancel." },
        { text: "If $\\theta$ is raised slightly (still with $\\tan\\theta < \\mu_s$), the friction increases.", correct: true, feedback: "$mg\\sin\\theta$ grows with $\\theta$, and static friction follows it." },
        { text: "The normal force on the block is $mg$.", feedback: "Perpendicular to the incline, $N = mg\\cos\\theta$, which is less than $mg$." },
      ],
      hint: "Lesson 4.2: when the block holds, what fixes the size of the static friction?",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "Twice in this chapter we found a speed from a height the long way, by integrating $v\\,dv$. Chapter 5 turns that integral into a tool of its own, the work-energy theorem, and many of these problems collapse to a line.",
    },
  ]),
};

export const mfeChapter4Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lessonMastery,
];
