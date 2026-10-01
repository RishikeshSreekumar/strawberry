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
      type: "text",
      content:
        "Try to shove a heavy almirah across the floor. You push, and nothing happens. You push harder, still nothing. Then, suddenly, it lurches and starts to slide, and once it is moving you find you can keep it going with noticeably less effort than it took to start it. Three facts are hiding in that experience: friction can take many values, it has a maximum, and it drops once sliding starts.",
    },
    {
      type: "text",
      content:
        "**Where friction comes from.** Even polished surfaces are rough at the microscopic scale. Two surfaces pressed together actually touch only at the tips of their bumps, and at those tiny contact points the atoms bond (\"cold welds\"). Friction is the force needed to shear those welds. Press the surfaces together harder and more bumps flatten into contact, so the true contact area, and the friction, grow in proportion to the normal force $N$, **not** to the apparent area of the surfaces.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The laws of friction",
      content:
        "**Static friction** (no sliding): $f_s$ takes whatever value, in whatever direction along the surface, is needed to prevent relative sliding, up to a maximum:\n$f_s \\le \\mu_s N$.\n**Kinetic friction** (sliding): $f_k = \\mu_k N$, opposite to the direction of relative sliding.\nUsually $\\mu_k < \\mu_s$. Both are (to a good approximation) independent of the contact area and of the sliding speed.",
    },
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
      type: "text",
      content:
        "**Worked example 1 (below and above the limit).** A 5 kg block rests on a floor with $\\mu_s = 0.5$ and $\\mu_k = 0.4$. Take $g = 10$ m/s². Find the friction and the acceleration when it is pushed horizontally with (a) 20 N, (b) 30 N.\n\n1. $N = mg = 50$ N, so the static limit is $\\mu_s N = 25$ N and the kinetic value is $\\mu_k N = 20$ N. *Why this step:* always find the ceiling first; it decides which law applies.\n2. (a) 20 N < 25 N: the block stays at rest and $f = 20$ N (not 25 N). Friction only supplies what is needed.\n3. (b) 30 N > 25 N: the block slides, $f = 20$ N, and $a = \\dfrac{30 - 20}{5} = 2$ m/s².",
    },
    {
      type: "text",
      content:
        "**Pulling at an angle.** Pull with $F$ at angle $\\theta$ above the horizontal. The upward part $F\\sin\\theta$ lifts some of the weight off the floor, so $N = mg - F\\sin\\theta$ and the friction ceiling drops. The forward part is $F\\cos\\theta$. The block is just about to slide when",
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
      type: "text",
      content:
        "**Worked example 2 (least pulling force).** A 10 kg crate sits on a floor with $\\mu_s = 0.75$. Find the least force that can start it moving, and its direction.\n\n1. Best angle: $\\tan\\theta = 0.75$, so $\\theta = 37^\\circ$ above the horizontal. *Why this step:* tilting up reduces $N$ (and so friction) but wastes some pull; $\\tan\\theta = \\mu$ is the balance point.\n2. $F_{\\min} = \\dfrac{0.75 \\times 100}{\\sqrt{1 + 0.5625}} = \\dfrac{75}{1.25} = 60$ N.\n3. Compare: a horizontal pull needs $\\mu mg = 75$ N. Tilting the rope saves 20%.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (friction that drives motion).** A 20 kg box sits on the flat bed of a truck, $\\mu_s = 0.3$. The truck accelerates from rest at 2 m/s². Does the box slide, and what is the friction on it?\n\n1. In the ground frame the box must accelerate at 2 m/s² with the truck. The only horizontal force on it is friction from the bed, so friction points **forward**: $f = ma = 40$ N. *Why this step:* friction opposes *relative sliding*. Without it the box would slide backward relative to the bed, so friction acts forward.\n2. Ceiling: $\\mu_s mg = 60$ N. Since 40 N < 60 N, static friction can manage it and the box does not slide.\n3. The largest acceleration the truck can have without the box sliding is $\\mu_s g = 3$ m/s².",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (block pressed against a wall).** You press a 2 kg book against a vertical wall with a horizontal force of 50 N. $\\mu_s = 0.5$. Does it stay, and what is the friction?\n\n1. Horizontal: $N = 50$ N (the wall pushes back as hard as you push).\n2. Ceiling: $\\mu_s N = 25$ N. Needed: friction must hold the weight, 20 N. *Why this step:* here friction acts **vertically**, because the tendency to slide is downward.\n3. 20 N ≤ 25 N, so the book stays and $f = 20$ N upward. The least push that holds it is $\\frac{mg}{\\mu_s} = 40$ N.",
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
    },
    {
      type: "quiz",
      id: "mfe4-1-q3",
      variant: "practice",
      question: "A 2 kg block lies on a floor with $\\mu = 0.75$. What is the least force (at the best angle) that can start it sliding?",
      options: [
        { text: "$15$ N", feedback: "That is the horizontal force $\\mu mg$. Pulling upward at the best angle does better." },
        { text: "$9$ N", feedback: "That is $\\mu mg \\sin 37^\\circ$. The minimum is $\\mu mg$ divided by $\\sqrt{1+\\mu^2} = 1.25$, not multiplied by a sine or cosine." },
        { text: "$20$ N", feedback: "That is the weight. A horizontal-ish pull never needs to overcome the whole weight." },
        { text: "$12$ N", correct: true, feedback: "$F_{\\min} = \\frac{\\mu mg}{\\sqrt{1+\\mu^2}} = \\frac{15}{1.25} = 12$ N, at $37^\\circ$ above the horizontal." },
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
    },
    {
      type: "quiz",
      id: "mfe4-1-q5",
      variant: "practice",
      question: "A 10 kg block on a floor ($\\mu_s = \\mu_k = 0.5$) is pulled by a 50 N force at $37^\\circ$ above the horizontal ($\\sin 37^\\circ = 0.6$). What is its acceleration?",
      options: [
        { text: "$0.5$ m/s²", correct: true, feedback: "$N = 70$ N, $f = 35$ N, $a = \\frac{40 - 35}{10} = 0.5$ m/s²." },
        { text: "$0$: the forward pull of 40 N is less than $\\mu mg = 50$ N", feedback: "The pull's upward part reduces $N$ to $100 - 30 = 70$ N, so the friction ceiling is only 35 N." },
        { text: "$1$ m/s²", feedback: "That uses $f = 30$ N. With $N = 70$ N, $f = 0.5 \\times 70 = 35$ N." },
        { text: "$5$ m/s²", feedback: "That uses the full 50 N and ignores friction." },
      ],
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
    {
      type: "text",
      content:
        "**The angle of repose.** A block on an incline of angle $\\theta$: the weight splits into $mg\\sin\\theta$ down the slope and $mg\\cos\\theta$ into it, so $N = mg\\cos\\theta$. At rest, friction up the slope must equal $mg\\sin\\theta$. That is possible only while $mg\\sin\\theta \\le \\mu_s mg\\cos\\theta$, i.e. $\\tan\\theta \\le \\mu_s$.",
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
    {
      type: "text",
      content:
        "**The range of forces that hold a block.** Push along the slope with $F$ (up the slope positive). If $F$ is small, the block tends to slide down, friction acts up the slope, and the least $F$ is when friction is at its limit: $F_{\\min} = mg\\sin\\theta - \\mu_s mg\\cos\\theta$. If $F$ is large, the block tends to slide up and friction acts down the slope: $F_{\\max} = mg\\sin\\theta + \\mu_s mg\\cos\\theta$.",
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
    {
      type: "text",
      content:
        "**Worked example 1 (the holding range).** A 10 kg block rests on a $37^\\circ$ incline with $\\mu_s = 0.5$ ($\\sin 37^\\circ = 0.6$, $\\cos 37^\\circ = 0.8$). What range of forces along the slope keeps it at rest?\n\n1. $mg\\sin\\theta = 60$ N, $\\mu_s mg\\cos\\theta = 0.5 \\times 80 = 40$ N. *Why this step:* these two numbers are all you need; everything else is adding or subtracting them.\n2. $\\tan 37^\\circ = 0.75 > 0.5$, so without help the block slides down.\n3. $F_{\\min} = 60 - 40 = 20$ N (friction helping, up the slope). $F_{\\max} = 60 + 40 = 100$ N (friction resisting, down the slope).\n4. Any push between 20 N and 100 N up the slope holds it. At $F = 60$ N friction is zero.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (sliding down).** The same block, now with $\\mu_k = 0.5$, is released. Find its acceleration.\n\n$a = g(\\sin 37^\\circ - \\mu_k\\cos 37^\\circ) = 10(0.6 - 0.4) = 2$ m/s².",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (up and back down, JEE Main).** A block is projected up a $37^\\circ$ incline at 16 m/s. $\\mu_s = \\mu_k = 0.25$. Find the time to stop, the distance travelled, whether it comes back, and the time to return.\n\n1. Going up, gravity and friction both act down the slope: deceleration $= 10(0.6 + 0.25 \\times 0.8) = 8$ m/s². *Why this step:* friction opposes the sliding, which is *up* on this leg, so it adds to gravity.\n2. Time up $= 16/8 = 2$ s; distance $= \\dfrac{16^2}{2 \\times 8} = 16$ m.\n3. At the top, $\\tan 37^\\circ = 0.75 > \\mu_s = 0.25$, so it slides back.\n4. Coming down, friction now acts up the slope: $a = 10(0.6 - 0.2) = 4$ m/s².\n5. $16 = \\tfrac12 \\times 4 \\times t^2$, so $t = \\sqrt8 = 2\\sqrt2 \\approx 2.83$ s. It arrives back at $4 \\times 2\\sqrt2 = 8\\sqrt2 \\approx 11.3$ m/s.\n6. The descent takes longer than the ascent: friction robs speed on both legs.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (the $n$-times problem).** A block takes $n$ times as long to slide down a rough $45^\\circ$ incline as down a smooth one of the same length. Find $\\mu_k$.\n\n1. From rest over a length $L$, $L = \\tfrac12 at^2$, so $t \\propto \\dfrac{1}{\\sqrt a}$. *Why this step:* the length cancels in the ratio, so it need not be given.\n2. Smooth: $a_s = g\\sin 45^\\circ$. Rough: $a_r = g(\\sin 45^\\circ - \\mu\\cos 45^\\circ) = g\\sin 45^\\circ(1 - \\mu)$.\n3. $\\dfrac{t_r}{t_s} = \\sqrt{\\dfrac{a_s}{a_r}} = \\dfrac{1}{\\sqrt{1 - \\mu}} = n$, so $\\mu = 1 - \\dfrac{1}{n^2}$.\n4. For $n = 2$, $\\mu = 0.75$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"friction on an incline always acts up the slope\"",
      content:
        "Friction opposes the *tendency* to slide. A block tending to slide down gets friction up the slope. A block pushed hard up the slope, or projected upward, gets friction **down** the slope. In Worked example 1, at $F = 100$ N friction is 40 N down the slope. Decide the tendency first, then draw the friction arrow.",
    },
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
    },
    {
      type: "quiz",
      id: "mfe4-2-q2",
      variant: "practice",
      question: "A 5 kg block on a $37^\\circ$ incline has $\\mu_s = 0.5$. What is the largest force up the slope that still leaves it at rest?",
      options: [
        { text: "$10$ N", feedback: "That is the *smallest* holding force, with friction acting up the slope." },
        { text: "$50$ N", correct: true, feedback: "$mg(\\sin\\theta + \\mu_s\\cos\\theta) = 50(0.6 + 0.4) = 50$ N." },
        { text: "$30$ N", feedback: "At 30 N (which equals $mg\\sin\\theta$) friction is zero. You can push harder before friction runs out." },
        { text: "$20$ N", feedback: "That is the friction limit alone, $\\mu_s mg\\cos\\theta$. The push must also beat the weight's down-slope part." },
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
    },
    {
      type: "quiz",
      id: "mfe4-2-q5",
      variant: "practice",
      question: "A block takes 3 times as long to slide down a rough $45^\\circ$ incline as down an identical smooth one. What is $\\mu_k$?",
      options: [
        { text: "$\\dfrac{2}{3}$", feedback: "That is $1 - \\frac1n$. Time goes as $\\frac{1}{\\sqrt a}$, so the square appears: $1 - \\frac{1}{n^2}$." },
        { text: "$\\dfrac{1}{9}$", feedback: "That is $\\frac{1}{n^2}$, the ratio of the accelerations. $\\mu$ is $1$ minus it." },
        { text: "$\\dfrac{8}{9}$", correct: true, feedback: "$\\mu = 1 - \\frac{1}{9} = \\frac89$." },
      ],
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
    {
      type: "text",
      content:
        "**Worked example 1 (together or slipping, pull on the bottom).** A 2 kg block sits on a 4 kg block; $\\mu = 0.3$ between them, floor smooth. A horizontal force acts on the bottom block. Find the accelerations for (a) $F = 10$ N and (b) $F = 30$ N.\n\n1. Friction ceiling on the top block: $0.3 \\times 20 = 6$ N, so $a_{1,\\max} = 3$ m/s² and $F_{\\text{crit}} = 6 \\times 3 = 18$ N. *Why this step:* finding $F_{\\text{crit}}$ once answers every \"together or not\" question at a glance.\n2. (a) $10 < 18$: together, $a = \\dfrac{10}{6} = \\dfrac53 \\approx 1.67$ m/s². The friction on the top block is $2 \\times \\tfrac53 = \\tfrac{10}{3} \\approx 3.3$ N (not 6 N), pointing **forward**.\n3. (b) $30 > 18$: slipping. Top: $a_1 = \\dfrac{6}{2} = 3$ m/s². Bottom: the top block's friction on it points **backward** (third law), so $a_2 = \\dfrac{30 - 6}{4} = 6$ m/s².",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (pull on the top).** Same blocks, now $F = 20$ N on the **top** block.\n\n1. $F_{\\text{crit}} = 9$ N (from above), and $20 > 9$: slipping.\n2. Top: $F$ forward, kinetic friction 6 N backward: $a_1 = \\dfrac{20 - 6}{2} = 7$ m/s².\n3. Bottom: friction 6 N forward: $a_2 = \\dfrac{6}{4} = 1.5$ m/s². *Why this step:* the bottom block has no other horizontal force; friction is its only engine.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (time to fall off).** In Worked example 1(b) the top block starts at the front end of the 4 kg plank, which is 1.5 m long. How long until it falls off the back?\n\n1. Relative acceleration of the top block with respect to the plank: $a_1 - a_2 = 3 - 6 = -3$ m/s², i.e. 3 m/s² backward relative to the plank. *Why this step:* the question is about positions *relative to the plank*, so work with relative motion.\n2. Both start from rest, so $1.5 = \\tfrac12 \\times 3 \\times t^2$, giving $t = 1$ s.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (rough floor too, JEE Advanced).** Same 2 kg on 4 kg with $\\mu_1 = 0.3$ between them, but now the floor is rough with $\\mu_2 = 0.1$. A force $F$ pulls the bottom block. Find the least $F$ that makes the blocks slip relative to each other.\n\n1. Floor friction on the bottom block (once it moves): $\\mu_2(m_1 + m_2)g = 0.1 \\times 60 = 6$ N backward. *Why this step:* the floor supports **both** blocks, so its normal force is 60 N, not 40 N.\n2. Together, the top block still can't exceed $a = \\mu_1 g = 3$ m/s².\n3. System at the limit: $F - 6 = 6 \\times 3$, so $F_{\\text{crit}} = 24$ N.\n4. Below 6 N nothing moves at all; between 6 N and 24 N they move together.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"friction on the top block opposes its motion\"",
      content:
        "When the bottom block is pulled, friction on the top block points **forward**, in the direction it moves: it is the force that makes the top block move at all. Friction opposes *relative* sliding; the top block tends to be left behind, so friction drags it forward. The third-law partner on the bottom block points backward.",
    },
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
    },
    {
      type: "quiz",
      id: "mfe4-3-q2",
      variant: "practice",
      question: "Same blocks ($2$ kg on $4$ kg, $\\mu = 0.3$, smooth floor), now $F = 24$ N on the bottom block. What is the bottom block's acceleration?",
      options: [
        { text: "$4$ m/s²", feedback: "That assumes they move together. $24 > F_{\\text{crit}} = 18$ N, so they slip." },
        { text: "$6$ m/s²", feedback: "That is $24/4$, ignoring the backward friction from the top block." },
        { text: "$3$ m/s²", feedback: "3 m/s² is the top block's acceleration while slipping." },
        { text: "$4.5$ m/s²", correct: true, feedback: "Slipping: $a_2 = \\frac{24 - 6}{4} = 4.5$ m/s² (and the top block has 3 m/s²)." },
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
    },
    {
      type: "quiz",
      id: "mfe4-3-q5",
      variant: "practice",
      question: "A 1 kg block starts at the front of a 1.25 m long, 4 kg plank on a smooth floor ($\\mu = 0.2$ between them). A 20 N force pulls the plank. How long until the block falls off the back?",
      options: [
        { text: "$\\sqrt{2.5/3} \\approx 0.91$ s", feedback: "That takes the plank's acceleration as $20/4 = 5$ m/s², forgetting the 2 N of backward friction from the block." },
        { text: "$\\sqrt{2.5/4.5} \\approx 0.75$ s", feedback: "That uses the plank's acceleration alone. The block also moves forward (at 2 m/s²); only the relative acceleration counts." },
        { text: "Never: they move together.", feedback: "Together they would need the block to reach $20/5 = 4$ m/s², but friction can give it at most $\\mu g = 2$ m/s²." },
        { text: "$1$ s", correct: true, feedback: "$F_{\\text{crit}} = 5 \\times 2 = 10$ N < 20 N, so they slip. Block: $2$ m/s²; plank: $\\frac{20 - 2}{4} = 4.5$ m/s². Relative: 2.5 m/s², and $1.25 = \\tfrac12(2.5)t^2$ gives $t = 1$ s." },
      ],
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
    {
      type: "text",
      content:
        "**The circular-motion FBD.** Draw the real forces only. Take one axis pointing **towards the centre** (radial) and, if needed, one vertical or tangential. Then write",
    },
    {
      type: "math",
      latex: "\\sum F_{\\text{towards centre}} = \\frac{mv^2}{r}, \\qquad \\sum F_{\\perp\\text{ plane of circle}} = 0 \\;(\\text{for a horizontal circle})",
    },
    {
      type: "text",
      content:
        "**A car on a flat curve.** On a level road the forces on a car are its weight, the normal force (both vertical) and friction from the road. Only friction can point to the centre, so friction must supply all of $\\frac{mv^2}{r}$. It is *static* friction (the tyres roll without sliding sideways), so it has a ceiling $\\mu mg$:",
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
      type: "text",
      content:
        "**Worked example 1 (flat curve).** A car takes an 80 m radius flat curve. $\\mu_s = 0.5$. What is the greatest safe speed?\n\n1. Friction supplies the centripetal force: $\\frac{mv^2}{r} \\le \\mu mg$. *Why this step:* weight and normal force are vertical and cannot pull towards the centre.\n2. $v_{\\max} = \\sqrt{0.5 \\times 80 \\times 10} = \\sqrt{400} = 20$ m/s (72 km/h).",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (conical pendulum).** A 0.5 kg bob on a 1 m string moves in a horizontal circle with the string at $60^\\circ$ to the vertical. Find the tension, the speed and the period.\n\n1. Forces: tension $T$ along the string, weight $mg$. The circle is horizontal with radius $r = l\\sin 60^\\circ = \\tfrac{\\sqrt3}{2}$ m. *Why this step:* the centre of the circle is level with the bob, directly below the pivot, not at the pivot.\n2. Vertical: $T\\cos 60^\\circ = mg$, so $T = 2mg = 10$ N.\n3. Radial: $T\\sin 60^\\circ = \\frac{mv^2}{r}$. Dividing by the vertical equation: $\\tan\\theta = \\dfrac{v^2}{rg}$, so $v^2 = rg\\tan 60^\\circ = \\tfrac{\\sqrt3}{2} \\times 10 \\times \\sqrt3 = 15$, and $v = \\sqrt{15} \\approx 3.87$ m/s.\n4. Period: $\\omega^2 = \\frac{g}{l\\cos\\theta}$ from the same two equations, so",
    },
    {
      type: "math",
      latex: "T_{\\text{period}} = 2\\pi\\sqrt{\\frac{l\\cos\\theta}{g}} = 2\\pi\\sqrt{\\frac{1 \\times 0.5}{10}} = 2\\pi\\sqrt{0.05} \\approx 1.40\\text{ s}",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (coin on a turntable).** A coin sits 10 cm from the centre of a turntable, $\\mu_s = 0.4$. What is the largest angular speed before it slips?\n\n1. Static friction supplies $m\\omega^2 r$: $m\\omega^2 r \\le \\mu mg$.\n2. $\\omega_{\\max} = \\sqrt{\\dfrac{\\mu g}{r}} = \\sqrt{\\dfrac{0.4 \\times 10}{0.1}} = \\sqrt{40} \\approx 6.3$ rad/s, about 60 revolutions per minute.\n3. Larger $r$ means smaller $\\omega_{\\max}$: coins near the **rim** fly off first. *Why this step:* at fixed $\\omega$ the needed force $m\\omega^2 r$ grows with $r$, while the available friction does not.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (the rotor ride).** In a fairground rotor you stand against the wall of a cylinder of radius 2 m spinning at 5 rad/s; then the floor drops away. What coefficient of friction keeps you from sliding down?\n\n1. The wall's **normal force** points to the centre and supplies $m\\omega^2 r$: $N = m \\times 25 \\times 2 = 50m$.\n2. Friction (vertical, up) must hold the weight: $mg \\le \\mu N$. *Why this step:* the normal force is horizontal, so it cannot hold you up; friction can, and it is proportional to $N$.\n3. $\\mu \\ge \\dfrac{g}{\\omega^2 r} = \\dfrac{10}{50} = 0.2$. The mass cancels again, so everyone stays up together.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (the breaking string).** A 0.5 kg stone is whirled in a horizontal circle of radius 1 m on a smooth table by a string that breaks at 50 N. What is the greatest speed?\n\n$T = \\frac{mv^2}{r}$, so $v_{\\max} = \\sqrt{\\dfrac{50 \\times 1}{0.5}} = 10$ m/s. When the string breaks the stone leaves along the tangent at 10 m/s.",
    },
    {
      type: "text",
      content:
        "**Centrifugal force.** Sit on a spinning merry-go-round and you feel pushed outward. Lesson 3.7 explains this: the merry-go-round is an accelerating frame (its acceleration is $\\omega^2 r$ towards the centre), so in *its* frame every body feels a pseudo force $m\\omega^2 r$ **outward**. That pseudo force is the centrifugal force. It exists only in the rotating frame, balancing the real inward forces so that you are at rest there.",
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
    },
    {
      type: "quiz",
      id: "mfe4-4-q2",
      variant: "practice",
      question: "What is the greatest speed at which a car can take a flat curve of radius 40 m if $\\mu_s = 0.4$?",
      options: [
        { text: "$\\sqrt{160} \\approx 12.6$ m/s", correct: true, feedback: "$v_{\\max} = \\sqrt{0.4 \\times 40 \\times 10} = \\sqrt{160}$." },
        { text: "$4$ m/s", feedback: "That is $\\sqrt{\\mu r}$: the $g$ has gone missing. $v_{\\max} = \\sqrt{\\mu r g}$." },
        { text: "$160$ m/s", feedback: "That is $v^2$. Take the square root." },
        { text: "$20$ m/s", feedback: "That is $\\sqrt{rg}$, which would need $\\mu = 1$." },
      ],
    },
    {
      type: "quiz",
      id: "mfe4-4-q3",
      variant: "practice",
      question: "A conical pendulum has a 2 m string at $60^\\circ$ to the vertical. What is its period? ($g = 10$ m/s².)",
      options: [
        { text: "$2\\pi\\sqrt{0.2}$ s", feedback: "That uses $l/g$, the simple pendulum formula. For a conical pendulum it is $l\\cos\\theta/g$." },
        { text: "$2\\pi\\sqrt{0.1\\sqrt3}$ s", feedback: "That uses $l\\sin\\theta$ (the radius). The period depends on the *height* $l\\cos\\theta$ of the cone." },
        { text: "$2\\pi\\sqrt{0.1} \\approx 1.99$ s", correct: true, feedback: "$2\\pi\\sqrt{\\frac{2 \\times 0.5}{10}} = 2\\pi\\sqrt{0.1}$." },
      ],
      hint: "$T\\cos\\theta = mg$ and $T\\sin\\theta = m\\omega^2 l\\sin\\theta$.",
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
    {
      type: "text",
      content:
        "**The design speed.** Suppose there is no friction. The forces are $mg$ (down) and $N$ (perpendicular to the road, tilted by $\\theta$ from the vertical). The car moves in a *horizontal* circle, so take axes horizontal (towards the centre) and vertical:",
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
      type: "text",
      content:
        "**Worked example 1 (design speed).** A curve of radius 30 m is banked at $15^\\circ$ ($\\tan 15^\\circ \\approx 0.268$). What speed needs no friction?\n\n$v_{\\text{opt}} = \\sqrt{30 \\times 10 \\times 0.268} = \\sqrt{80.4} \\approx 9.0$ m/s, about 32 km/h.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (safe speed range).** A curve of radius 20 m is banked at $37^\\circ$ ($\\tan 37^\\circ = 0.75$), with $\\mu = 0.5$. Find $v_{\\max}$ and $v_{\\min}$.\n\n1. $v_{\\max}^2 = rg\\dfrac{\\tan\\theta + \\mu}{1 - \\mu\\tan\\theta} = 200 \\times \\dfrac{1.25}{0.625} = 400$, so $v_{\\max} = 20$ m/s. *Why this step:* the $\\tan$ form avoids computing sines and cosines separately.\n2. $v_{\\min}^2 = 200 \\times \\dfrac{0.75 - 0.5}{1 + 0.375} = 200 \\times \\dfrac{0.25}{1.375} \\approx 36.4$, so $v_{\\min} \\approx 6.0$ m/s.\n3. Design speed for comparison: $\\sqrt{200 \\times 0.75} = \\sqrt{150} \\approx 12.2$ m/s, between the two.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (which way does friction act?).** A car takes a 50 m curve banked at $15^\\circ$ at 20 m/s. Is friction up or down the slope, and how big must $\\mu$ be?\n\n1. Compare with $v_{\\text{opt}} \\approx 11.6$ m/s: the car is faster, so it tends to slide outward, and friction acts **down** the slope. *Why this step:* the direction must be settled before the equations, or the signs go wrong.\n2. Resolve along and perpendicular to the road (the acceleration $\\frac{v^2}{r} = 8$ m/s² is horizontal, so it has a component $8\\cos 15^\\circ$ along the road, down-slope-inward, and $8\\sin 15^\\circ$ into the road).\n3. Along the road: $f + mg\\sin 15^\\circ = m \\times 8\\cos 15^\\circ$, so $f = m(7.73 - 2.59) = 5.14m$.\n4. Perpendicular: $N - mg\\cos 15^\\circ = m \\times 8\\sin 15^\\circ$, so $N = m(9.66 + 2.07) = 11.73m$.\n5. Need $\\mu \\ge \\dfrac{f}{N} = \\dfrac{5.14}{11.73} \\approx 0.44$. With $\\mu = 0.2$ the car would skid outward.",
    },
    {
      type: "text",
      content:
        "**Railways, cyclists and aircraft.** A railway curve is banked by raising the outer rail by $h$ above the inner rail over the gauge $b$. For small angles $\\tan\\theta \\approx \\sin\\theta = \\frac hb$, so $h \\approx \\dfrac{v^2 b}{rg}$. For a 1.5 m gauge, a 400 m curve and 20 m/s, $h = \\dfrac{400 \\times 1.5}{400 \\times 10} = 0.15$ m. A cyclist leans at $\\tan\\theta = \\frac{v^2}{rg}$ so that the road's total force (normal plus friction) passes through the centre of gravity; at 10 m/s on a 10 m curve that is $45^\\circ$. An aircraft banks its wings so that the lift force tilts inward exactly like a banked road's normal force.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"on a banked road $N = mg\\cos\\theta$\"",
      content:
        "That is the normal force on a block *at rest* on an incline, where the acceleration is zero. A car on a banked curve accelerates horizontally towards the centre, and part of that acceleration is into the road. Solving the two equations with friction $f$ along the road gives $N = m\\big(g\\cos\\theta + \\frac{v^2}{r}\\sin\\theta\\big)$, always **more** than $mg\\cos\\theta$. At the design speed it is $\\frac{mg}{\\cos\\theta}$.",
    },
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
    },
    {
      type: "quiz",
      id: "mfe4-5-q3",
      variant: "practice",
      question: "A road of radius 20 m is banked at $37^\\circ$ with $\\mu = 0.5$. What is the maximum safe speed?",
      options: [
        { text: "$20$ m/s", correct: true, feedback: "$v^2 = 200 \\times \\frac{0.75 + 0.5}{1 - 0.375} = 400$." },
        { text: "$\\sqrt{150} \\approx 12.2$ m/s", feedback: "That is the design speed (no friction). Friction down the slope allows more." },
        { text: "$\\sqrt{250} \\approx 15.8$ m/s", feedback: "That adds $\\mu$ to $\\tan\\theta$ but forgets the denominator $1 - \\mu\\tan\\theta$." },
        { text: "$10$ m/s", feedback: "That is $\\sqrt{\\mu r g}$, the flat-road limit. The bank helps." },
      ],
    },
    {
      type: "quiz",
      id: "mfe4-5-q4",
      variant: "practice",
      question: "A railway track (gauge 1.5 m) has a curve of radius 300 m designed for 15 m/s. How much higher should the outer rail be?",
      options: [
        { text: "About 7.5 cm", feedback: "That is $\\frac{v^2}{rg}$, the slope $\\tan\\theta$, in metres. Multiply by the gauge." },
        { text: "About 1.1 m", feedback: "Check the powers of ten: $\\frac{337.5}{3000} = 0.1125$ m." },
        { text: "About 11 cm", correct: true, feedback: "$h = \\frac{v^2 b}{rg} = \\frac{225 \\times 1.5}{3000} \\approx 0.11$ m." },
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
    {
      type: "text",
      content:
        "**Completing the loop.** A string can only pull: $T \\ge 0$. Tension is least at the top, so the condition is $T_{\\text{top}} \\ge 0$, i.e. $v_{\\text{top}}^2 \\ge gR$ (gravity alone supplies the centripetal force). Then $u^2 = v_{\\text{top}}^2 + 4gR \\ge 5gR$:",
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
    {
      type: "text",
      content:
        "**Worked example 1 (tensions round the loop).** A 0.5 kg bob on a 1 m string has 8 m/s at the bottom. Find the tension at the bottom, at the side ($\\theta = 90^\\circ$) and at the top.\n\n1. Bottom: $T = 0.5 \\times 64 + 5 = 37$ N.\n2. Side: $v^2 = 64 - 20 = 44$; $T = 0.5 \\times 44 + 5\\cos 90^\\circ = 22$ N. *Why this step:* at the side the weight is tangential, so the tension alone supplies $\\frac{mv^2}{R}$.\n3. Top: $v^2 = 64 - 40 = 24$; $T = 0.5 \\times 24 - 5 = 7$ N.\n4. Check: $37 - 7 = 30 = 6 \\times 0.5 \\times 10$. ✓",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (where does the string go slack?).** The bob is given $u = \\sqrt{3gR}$. At what angle does the string slacken, and how fast is the bob moving then?\n\n1. Set $T = 0$: $u^2 - 2gR + 3gR\\cos\\theta = 0$, so $3gR - 2gR + 3gR\\cos\\theta = 0$. *Why this step:* slack is exactly where the formula for $T$ first hits zero.\n2. $\\cos\\theta = -\\tfrac13$, so $\\theta \\approx 109.5^\\circ$ from the bottom, about $19.5^\\circ$ above the horizontal through the centre.\n3. Height above the bottom: $R(1 - \\cos\\theta) = \\tfrac43 R$. Speed: $v^2 = 3gR - 2gR \\cdot \\tfrac43 = \\tfrac{gR}{3}$, and it is **not zero**: the bob leaves the circle moving, and flies on as a projectile.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (car over a hump).** A car drives over a hump of radius 10 m. At the top, forces are $mg$ down and $N$ up, and the centre of the circle is **below** the car:\n\n1. $mg - N = \\dfrac{mv^2}{r}$, so $N = m\\Big(g - \\dfrac{v^2}{r}\\Big)$. At 5 m/s a 1000 kg car has $N = 1000(10 - 2.5) = 7500$ N; it feels lighter.\n2. $N = 0$ at $v = \\sqrt{gr} = 10$ m/s (36 km/h). Faster, the road cannot pull the car down, so the car leaves the road. *Why this step:* a road can only push, so $N \\ge 0$ is the contact condition, just as $T \\ge 0$ was for the string.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (the bucket).** A bucket of water is swung in a vertical circle of radius 1 m. What is the least speed at the top for the water to stay in?\n\nAt the top the bucket's base pushes the water down with $N \\ge 0$: $N + mg = \\frac{mv^2}{R}$. The least speed has $N = 0$: $v = \\sqrt{gR} = \\sqrt{10} \\approx 3.2$ m/s. At that speed the water is in free fall, but so is the bucket, and gravity is exactly what is needed to curve the path.",
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
    {
      type: "quiz",
      id: "mfe4-6-q1",
      variant: "practice",
      question: "What is the least speed at the lowest point for a bob on a 2.5 m string to complete a vertical circle?",
      options: [
        { text: "$\\sqrt{125} \\approx 11.2$ m/s", correct: true, feedback: "$u = \\sqrt{5gR} = \\sqrt{125}$." },
        { text: "$5$ m/s", feedback: "That is $\\sqrt{gR}$, the least speed at the *top*." },
        { text: "$10$ m/s", feedback: "That is $\\sqrt{4gR}$, which is enough for a rigid rod, not for a string." },
        { text: "$\\sqrt{50} \\approx 7.1$ m/s", feedback: "That is $\\sqrt{2gR}$, just enough to reach the horizontal." },
      ],
    },
    {
      type: "quiz",
      id: "mfe4-6-q2",
      variant: "practice",
      question: "A 1 kg bob on a 1 m string has 8 m/s at the bottom. What is the tension at the top?",
      options: [
        { text: "$24$ N", feedback: "That is $\\frac{mv^2}{R}$ at the top. Gravity supplies 10 N of it." },
        { text: "$34$ N", feedback: "That adds $mg$. At the top the weight points towards the centre and helps." },
        { text: "$54$ N", feedback: "That uses the bottom speed at the top. The bob slows as it climbs $2R$." },
        { text: "$14$ N", correct: true, feedback: "$v_{\\text{top}}^2 = 64 - 40 = 24$, $T = 24 - 10 = 14$ N." },
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
    },
    {
      type: "quiz",
      id: "mfe4-7-q2",
      variant: "mastery",
      question: "The same crate (8 kg, $\\mu_s = 0.5$, $\\mu_k = 0.4$) is pushed with 50 N. What is its acceleration?",
      options: [
        { text: "$1.25$ m/s²", feedback: "That subtracts 40 N (the static limit). Once sliding, friction is $0.4 \\times 80 = 32$ N." },
        { text: "$6.25$ m/s²", feedback: "That ignores friction." },
        { text: "$0$", feedback: "50 N exceeds the 40 N static limit, so the crate slides." },
        { text: "$2.25$ m/s²", correct: true, feedback: "$a = \\frac{50 - 32}{8} = 2.25$ m/s²." },
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
    },
    {
      type: "quiz",
      id: "mfe4-7-q5",
      variant: "mastery",
      question: "A 1 kg block sits on a 3 kg block ($\\mu = 0.4$ between them, smooth floor). A 20 N force pulls the bottom block. What is the top block's acceleration?",
      options: [
        { text: "$4$ m/s²", correct: true, feedback: "They slip; kinetic friction $0.4 \\times 10 = 4$ N drives the 1 kg block at 4 m/s² (the bottom block has $\\frac{20 - 4}{3} \\approx 5.33$ m/s²)." },
        { text: "$5$ m/s²", feedback: "That assumes they move together. $F_{\\text{crit}} = 4 \\times 4 = 16$ N < 20 N, so they slip." },
        { text: "$\\dfrac{16}{3}$ m/s²", feedback: "That is the bottom block's acceleration." },
        { text: "$0$", feedback: "Friction from the bottom block drags the top block forward." },
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
    },
    {
      type: "quiz",
      id: "mfe4-7-q7",
      variant: "mastery",
      question: "A flat curve has radius 80 m and $\\mu_s = 0.5$. A driver takes it at 25 m/s. What happens?",
      options: [
        { text: "The car makes it; friction needed is less than available.", feedback: "Needed: $\\frac{v^2}{r} = 7.8$ m/s² of inward acceleration; available: $\\mu g = 5$ m/s²." },
        { text: "The car skids inward, towards the centre.", feedback: "Without enough inward force the car follows a wider path than the curve, i.e. it drifts outward." },
        { text: "The car skids outward, because $v_{\\max} = 20$ m/s.", correct: true, feedback: "$\\sqrt{0.5 \\times 80 \\times 10} = 20$ m/s; at 25 m/s friction cannot supply $\\frac{mv^2}{r}$." },
      ],
    },
    {
      type: "quiz",
      id: "mfe4-7-q8",
      variant: "mastery",
      question: "A conical pendulum on a 2.5 m string moves with the string at $37^\\circ$ to the vertical ($\\cos 37^\\circ = 0.8$). What is its angular speed?",
      options: [
        { text: "$\\sqrt5 \\approx 2.24$ rad/s", correct: true, feedback: "$\\omega^2 = \\frac{g}{l\\cos\\theta} = \\frac{10}{2} = 5$." },
        { text: "$2$ rad/s", feedback: "That is $\\sqrt{g/l}$, ignoring the tilt." },
        { text: "$\\sqrt{\\tfrac{20}{3}} \\approx 2.58$ rad/s", feedback: "That uses $l\\sin\\theta = 1.5$ m. The formula has the cone's height $l\\cos\\theta$." },
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
      type: "quiz",
      id: "mfe4-7-q12",
      variant: "mastery",
      question: "JEE Advanced. A 2 kg block sits on a 4 kg block; $\\mu_1 = 0.3$ between them and $\\mu_2 = 0.1$ between the lower block and the floor. A horizontal force pulls the lower block. What is the least force for the blocks to slip relative to each other?",
      options: [
        { text: "$18$ N", feedback: "That ignores the floor. The floor's friction, $0.1 \\times 60 = 6$ N, must also be overcome." },
        { text: "$22$ N", feedback: "That uses floor friction $0.1 \\times 40 = 4$ N. The floor supports both blocks, so $N = 60$ N." },
        { text: "$24$ N", correct: true, feedback: "At the limit both move at $\\mu_1 g = 3$ m/s²: $F - 6 = 6 \\times 3$, so $F = 24$ N." },
        { text: "$6$ N", feedback: "6 N is just enough to start the pair moving together." },
      ],
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
