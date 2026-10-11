import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Mechanics II Chapter 1 — Momentum, Impulse and Collisions.
 * Newton's second law in momentum form, conservation from the third law,
 * impulse as the area under F–t, variable mass (belts, jets, rockets), and
 * every JEE collision: 1D elastic and inelastic, the coefficient of
 * restitution, oblique collisions and multi-stage problems.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "momentum-and-its-conservation",
  title: "1.1 · Momentum and Its Conservation",
  position: 1,
  blocks: blocks([
    {
      type: "video",
      src: "/videos/mrg-1-momentum-impulse-collisions.mp4",
      poster: "/videos/mrg-1-momentum-impulse-collisions.jpg",
      title: "Chapter 1 overview video",
      caption:
        "A narrated walk through the whole chapter. Watch it now for the big picture, or come back to it as a recap.",
    },
    {
      type: "text",
      content:
        "A skater stands still on smooth ice holding a heavy medicine ball. She throws the ball forwards, and she slides backwards. Nothing outside pushed her; the ice is too smooth to grip. The ball and the skater pushed on each other, and that push, equal and opposite, sent them apart. This lesson turns that picture into the law that runs every collision, explosion and rocket in the chapter.",
    },
    { type: "heading", text: "Momentum and Newton's second law" },
    {
      type: "text",
      content:
        "**Momentum.** Newton did not write his second law as $F = ma$. He wrote it in terms of the \"quantity of motion\", which we now call **momentum**, $\\vec p = m\\vec v$. For a body of fixed mass,",
    },
    { type: "math", latex: "\\vec F = \\frac{d\\vec p}{dt} = \\frac{d(m\\vec v)}{dt} = m\\frac{d\\vec v}{dt} = m\\vec a" },
    {
      type: "text",
      content:
        "The momentum form is the more general one: it still works when mass flows in or out (1.3). Momentum is a vector, measured in kg m/s (equivalently N s).",
    },
    { type: "heading", text: "Why total momentum is conserved" },
    {
      type: "text",
      content:
        "**Two bodies.** Let bodies 1 and 2 push on each other, with no other forces. Newton's third law says $\\vec F_{12} = -\\vec F_{21}$ (the force on 1 due to 2 is equal and opposite to the force on 2 due to 1). Each body obeys the second law:",
    },
    {
      type: "math",
      latex: "\\frac{d\\vec p_1}{dt} = \\vec F_{12}, \\quad \\frac{d\\vec p_2}{dt} = \\vec F_{21} \\quad\\Rightarrow\\quad \\frac{d}{dt}(\\vec p_1 + \\vec p_2) = \\vec F_{12} + \\vec F_{21} = \\vec 0",
    },
    {
      type: "text",
      content:
        "So $\\vec p_1 + \\vec p_2$ never changes. For many bodies the same pairing argument (it is exactly the one from 0.5) gives $\\frac{d\\vec P}{dt} = \\vec F_{\\text{ext}}$, where $\\vec P$ is the total momentum. That is $M\\vec a_{cm} = \\vec F_{\\text{ext}}$ written in momentum language.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Conservation of linear momentum",
      content:
        "$\\dfrac{d\\vec P}{dt} = \\vec F_{\\text{ext}}$. If the net external force on a system is zero, its total momentum $\\vec P = \\sum m_i\\vec v_i$ is constant, however violently its parts push on each other.\nThe law holds **component by component**: if only $F_{\\text{ext},x} = 0$, then $P_x$ is conserved even though $P_y$ may change.",
    },
    {
      type: "interactive",
      config: {
        component: "mrg-collision-lab",
        mode: "explosion",
        graph: "momentum",
        caption:
          "Two carts at rest with a compressed spring between them, like the skater and the ball. Play it. Watch the two momentum curves, then the total.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: while the spring pushes, $p_1$ climbs and $p_2$ falls by exactly the same amount, so $p_1 + p_2$ stays a flat line at zero. Change the masses or the spring energy and the individual curves change, the flat line does not. Now look at the kinetic energy readout: it goes from zero to something positive. Momentum is conserved; kinetic energy is not.",
    },
    { type: "heading", text: "Recoil and jumping off trolleys" },
    {
      type: "worked-example",
      id: "mrg1-1-we1",
      title: "Worked example 1: gun recoil",
      problem:
        "A 5 kg rifle fires a 20 g bullet at 500 m/s. Find the rifle's recoil speed. Take the bullet's direction as positive.",
      steps: [
        { text: "System: rifle + bullet, initially at rest, so $P = 0$. The powder gas forces are internal. *Why this step:* the horizontal external force (from the shooter's shoulder) is small over the millisecond of firing, so we treat the pair as isolated during the shot." },
        { text: "After: $0.02(500) + 5V = 0$." },
        { text: "$V = -\\dfrac{10}{5} = -2$ m/s. The rifle kicks back at 2 m/s." },
        { text: "Energy check: the bullet gets $\\frac12(0.02)(500)^2 = 2500$ J, the rifle only $\\frac12(5)(2)^2 = 10$ J. Equal and opposite momenta, wildly unequal energies, because $K = \\frac{p^2}{2m}$ favours the light body." },
      ],
      answer: "The rifle recoils at 2 m/s ($V = -2$ m/s).",
    },
    {
      type: "worked-example",
      id: "mrg1-1-we2",
      title: "Worked example 2: the skater",
      problem:
        "A 50 kg skater at rest throws a 5 kg ball forwards at 6 m/s relative to the ice. Find the skater's velocity.",
      steps: [
        { text: "$0 = 5(6) + 50V$, so $V = -0.6$ m/s: she slides back at 0.6 m/s." },
      ],
      answer: "She slides back at 0.6 m/s.",
    },
    {
      type: "worked-example",
      id: "mrg1-1-we3",
      title: "Worked example 3: jumping off a trolley, relative speed",
      problem:
        "A 60 kg man stands on a 120 kg trolley at rest on a smooth track. He jumps off horizontally, backwards, with a speed of 3 m/s **relative to the trolley**. How fast does the trolley move?",
      steps: [
        { text: "Let the trolley move forwards at $V$ (ground frame). The man's ground velocity is then $V - 3$. *Why this step:* momentum must be written with ground-frame velocities; \"relative to the trolley\" means subtracting the trolley's own velocity." },
        { text: "$0 = 120V + 60(V - 3)$, so $180V = 180$ and $V = 1$ m/s." },
        { text: "The man moves at $1 - 3 = -2$ m/s over the ground. Check: $120(1) + 60(-2) = 0$. ✓ Treating 3 m/s as a ground speed would give the wrong $V = 1.5$ m/s." },
      ],
      answer: "The trolley moves forwards at 1 m/s (the man at 2 m/s backwards).",
    },
    {
      type: "worked-example",
      id: "mrg1-1-we4",
      title: "Worked example 4: conservation in one direction only",
      problem:
        "A 10 kg cannon on smooth ice fires a 1 kg shell at 100 m/s (relative to the ground) at $60^\\circ$ above the horizontal. Find the cannon's recoil.",
      steps: [
        { text: "Vertically the ice pushes up hard during firing, so vertical momentum is *not* conserved. Horizontally the ice is smooth: $P_x$ is conserved. *Why this step:* conservation is a statement about each component separately; check the external forces direction by direction." },
        { text: "$0 = 1(100\\cos60^\\circ) + 10V$, so $V = -\\dfrac{50}{10} = -5$ m/s." },
        { text: "The cannon slides back at 5 m/s. The shell's 86.6 N s of vertical momentum came from the ice's impulse." },
      ],
      answer: "The cannon slides back at 5 m/s.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"if momentum is conserved, kinetic energy must be too\"",
      content:
        "They are different laws. Momentum is conserved whenever external forces vanish, because internal forces cancel in pairs. Kinetic energy is not protected that way: internal forces can do net work. In the recoil example it rises from 0 to 2510 J (chemical energy); in a car crash it falls (to heat and bent metal). Momentum is the one you can always rely on in an isolated system.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "mrg1-1-q1",
      variant: "practice",
      question: "A 4 kg rifle fires a 50 g bullet at 400 m/s. What is the rifle's recoil speed? Give your answer in m/s.",
      answer: 5,
      unit: "m/s",
      hint: "The rifle + bullet system starts at rest, so its total momentum stays zero.",
      solution: "Bullet momentum: $0.05 \\times 400 = 20$ kg m/s. The rifle must carry $20$ kg m/s the other way: $V = \\dfrac{20}{4} = 5$ m/s, backwards.",
      commonMistakes: [
        { answer: 0.5, feedback: "Check the bullet's momentum: $0.05 \\times 400 = 20$ kg m/s, not 2." },
        { answer: 100, feedback: "That is $400 / 4$, using 1 kg for the bullet. Convert 50 g to 0.05 kg." },
        { answer: 44.7, tolerance: 0.1, feedback: "That equates the kinetic energies ($\\frac12(0.05)(400)^2 = \\frac12(4)V^2$), but kinetic energy is not conserved in firing: the powder supplies it. Use momentum." },
      ],
    },
    {
      type: "quiz",
      id: "mrg1-1-q2",
      variant: "concept",
      multiple: true,
      question: "Two carts of **unequal** mass, at rest on a smooth track, are pushed apart by a compressed spring between them. Select all the statements that are true.",
      options: [
        { text: "Momentum and kinetic energy are both conserved.", feedback: "Kinetic energy rises from zero: the spring's stored energy is converted into it." },
        { text: "Total momentum increases, because both carts start moving.", feedback: "They move in opposite directions with equal and opposite momenta, which add to zero." },
        { text: "Total momentum stays zero.", correct: true, feedback: "The spring force is internal, so $\\vec P$ is unchanged from its initial value, zero." },
        { text: "Total kinetic energy increases.", correct: true, feedback: "The spring does positive work on both carts, turning its stored energy into kinetic energy." },
        { text: "The lighter cart moves off faster.", correct: true, feedback: "Equal and opposite momenta: $m_1v_1 = m_2v_2$, so the smaller mass gets the larger speed." },
      ],
      hint: "The spring force is internal. Ask what that means for the total momentum, where the spring's stored energy goes, and how the carts' speeds compare.",
    },
    {
      type: "quiz",
      id: "mrg1-1-q3",
      variant: "practice",
      question: "A 200 kg cannon on smooth ice fires a 10 kg shell at 200 m/s (ground frame) at $30^\\circ$ above the horizontal. What is the cannon's recoil speed?",
      options: [
        { text: "$5\\sqrt3$ m/s $\\approx 8.7$ m/s", correct: true, feedback: "Only $P_x$ is conserved: $200V = 10 \\times 200\\cos30^\\circ = 1000\\sqrt3$, so $V = 5\\sqrt3$ m/s." },
        { text: "10 m/s", feedback: "That uses the full 200 m/s. Only the horizontal component, $200\\cos30^\\circ$, has to be balanced." },
        { text: "5 m/s", feedback: "That uses $\\sin30^\\circ$, the vertical component. The ice balances the vertical momentum; the horizontal part recoils." },
        { text: "0: the ice holds the cannon.", feedback: "Smooth ice cannot exert a horizontal force, so horizontal momentum is conserved and the cannon must recoil." },
      ],
      hint: "The ice is smooth, so only **horizontal** momentum is conserved (the ground supplies vertical forces during firing). Use the shell's horizontal component (Worked example 4).",
    },
    {
      type: "quiz",
      id: "mrg1-1-q4",
      variant: "concept",
      question: "A ball falls freely towards the Earth. Is the ball's momentum conserved?",
      options: [
        { text: "No, but the momentum of the ball + Earth system is conserved.", correct: true, feedback: "Inside the ball + Earth system gravity is internal. The Earth gains an equal and opposite (and immeasurably slow) momentum." },
        { text: "Yes, because no forces act on it except gravity.", feedback: "Gravity *is* an external force on the ball, so $\\frac{d\\vec p}{dt} = m\\vec g \\ne 0$." },
        { text: "No, and momentum is never conserved when gravity acts.", feedback: "It depends on the system. Include the Earth and gravity becomes internal." },
      ],
      hint: "Momentum is conserved only for a system with no net external force. Which system should you choose so that gravity is internal?",
    },
    {
      type: "numeric",
      id: "mrg1-1-q5",
      variant: "practice",
      question: "A 50 kg boy stands on a 150 kg trolley at rest on a smooth track. He jumps off horizontally at 4 m/s **relative to the trolley**. With what speed does the trolley move? Give your answer in m/s.",
      answer: 1,
      tolerance: 0.01,
      unit: "m/s",
      hint: "Write the boy's velocity relative to the ground in terms of the trolley's velocity $V$.",
      solution: "Let the trolley move at $V$; the boy's ground velocity is then $V - 4$. Momentum stays zero: $150V + 50(V - 4) = 0$, so $200V = 200$ and $V = 1$ m/s. (His ground speed is 3 m/s.)",
      commonMistakes: [
        { answer: 1.333, tolerance: 0.01, feedback: "That treats 4 m/s as his ground speed. His speed over the ground is $4 - V$." },
        { answer: 4, feedback: "The trolley is three times heavier than the boy, so it must move more slowly than he does." },
      ],
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "impulse",
  title: "1.2 · Impulse and Impulsive Forces",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "A fielder catching a hard cricket ball does not hold his hands rigid. He lets them travel back with the ball. A car's airbag, a gymnast's mat and a high jumper's foam pit all do the same job. They cannot change *how much* the ball's or body's momentum must change, but they can change *how quickly*, and that is the difference between a sting and a broken finger.",
    },
    { type: "heading", text: "The impulse–momentum theorem" },
    {
      type: "text",
      content:
        "Integrate $\\vec F = \\frac{d\\vec p}{dt}$ over the time the force acts:",
    },
    { type: "math", latex: "\\vec J = \\int_{t_1}^{t_2}\\vec F\\,dt = \\int d\\vec p = \\vec p_2 - \\vec p_1 = \\Delta\\vec p" },
    {
      type: "callout",
      variant: "definition",
      title: "Impulse",
      content:
        "The **impulse** of a force over a time interval is $\\vec J = \\int\\vec F\\,dt$, the area under the force–time graph. The impulse–momentum theorem: the net impulse on a body equals its change of momentum, $\\vec J = \\Delta\\vec p$. The **average force** over a contact time $\\Delta t$ is $\\bar F = \\dfrac{J}{\\Delta t}$. Units: N s, the same as kg m/s.",
    },
    { type: "heading", text: "Same impulse, different force pulses" },
    {
      type: "text",
      content:
        "Because impulse is an *area*, a tall, thin force pulse and a low, wide one can deliver exactly the same impulse. The lab below shows a ball hitting a rigid wall. The graph is the wall's force on the ball; the shaded region grows as the collision proceeds, and its final area is the impulse.",
    },
    {
      type: "interactive",
      config: {
        component: "mrg-collision-lab",
        mode: "wall",
        m1: { min: 0.1, max: 1, step: 0.05, initial: 0.15 },
        u1: { min: 5, max: 30, step: 1, initial: 20 },
        e: { min: 0, max: 1, step: 0.05, initial: 0.75 },
        contactTime: { min: 1, max: 20, step: 1, initial: 5 },
        pulse: "triangle",
        caption:
          "A 0.15 kg ball at 20 m/s rebounds at 15 m/s. Drag the contact time from 5 ms up to 20 ms: the shaded area stays the same while the peak force drops.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the impulse readout stays at 5.25 N s whatever the contact time, because it is fixed by the change of momentum. The average force is $J/\\Delta t$, so quadrupling the contact time cuts it to a quarter. The peak of a triangular pulse is twice the average. Compare the force with the ball's weight: the average force is about 700 times the weight at 5 ms.",
    },
    {
      type: "text",
      content:
        "The same area can come in different shapes. Here is a softer, rounder pulse and a longer contact:",
    },
    {
      type: "interactive",
      config: {
        component: "mrg-collision-lab",
        mode: "wall",
        m1: { min: 0.1, max: 1, step: 0.05, initial: 0.15 },
        u1: { min: 5, max: 30, step: 1, initial: 20 },
        e: { min: 0, max: 1, step: 0.05, initial: 0.75 },
        contactTime: { min: 5, max: 200, step: 5, initial: 50 },
        pulse: "half-sine",
        caption:
          "A half-sine pulse over 50 ms: the impulse is still 5.25 N s, but the average force is ten times smaller than at 5 ms. This is what padding does.",
      },
    },
    { type: "heading", text: "Head-on and oblique wall hits" },
    {
      type: "worked-example",
      id: "mrg1-2-we1",
      title: "Worked example 1: a ball against a wall, JEE Main",
      problem:
        "A 0.15 kg ball travelling at 20 m/s hits a wall normally and rebounds at 15 m/s. The contact lasts 5 ms. Find the impulse and the average force. Take $g = 10$ m/s².",
      steps: [
        { text: "Positive direction: away from the wall. Before: $p_1 = 0.15 \\times (-20) = -3$ kg m/s. After: $p_2 = 0.15 \\times 15 = 2.25$ kg m/s. *Why this step:* velocity reverses, so the two momenta have opposite signs; forgetting that is the classic mistake." },
        { text: "$J = p_2 - p_1 = 2.25 - (-3) = 5.25$ N s, away from the wall." },
        { text: "$\\bar F = \\dfrac{5.25}{0.005} = 1050$ N." },
        { text: "The ball's weight is $1.5$ N, so the wall's push is $700$ times the weight. That is why we ignore gravity *during* an impact." },
      ],
      answer: "Impulse 5.25 N s away from the wall; average force 1050 N.",
    },
    {
      type: "worked-example",
      id: "mrg1-2-we2",
      title: "Worked example 2: catching a ball",
      problem:
        "A 0.16 kg ball arrives at 30 m/s and is brought to rest. Find the impulse, and the average force if it is stopped in 0.01 s (rigid hands) or in 0.1 s (hands drawn back).",
      steps: [
        { text: "$J = 0.16 \\times 30 = 4.8$ N s, the same however it is caught." },
        { text: "Rigid hands, stopping it in 0.01 s: $\\bar F = 480$ N. Hands drawn back, stopping it in 0.1 s: $\\bar F = 48$ N. *Why this step:* the impulse is fixed by the problem; only the time is under the fielder's control." },
      ],
      answer: "Impulse 4.8 N s; average force 480 N in 0.01 s, 48 N in 0.1 s.",
    },
    {
      type: "worked-example",
      id: "mrg1-2-we3",
      title: "Worked example 3: an oblique hit",
      problem:
        "A 0.2 kg ball strikes a smooth wall at 10 m/s, its velocity making $60^\\circ$ with the normal to the wall, and bounces off at the same speed and angle. Find the impulse on the ball.",
      steps: [
        { text: "Split the velocity: along the wall $10\\sin60^\\circ$ (unchanged, the smooth wall exerts no force along itself), and along the normal $10\\cos60^\\circ = 5$ m/s (reversed). *Why this step:* the impulse is along the force, and a smooth wall only pushes along its normal." },
        { text: "$J = m\\,\\Delta v_n = 0.2 \\times (5 - (-5)) = 2$ N s, along the normal, away from the wall." },
        { text: "General result: $J = 2mv\\cos\\theta$ with $\\theta$ measured from the normal." },
      ],
      answer: "$J = 2$ N s along the normal, away from the wall.",
    },
    {
      type: "worked-example",
      id: "mrg1-2-we4",
      title: "Worked example 4: reading a force–time graph",
      problem:
        "A force on a 0.5 kg puck at rest rises steadily from 0 to 100 N in 10 ms and falls steadily back to 0 in the next 10 ms. Find the impulse and the puck's final speed.",
      steps: [
        { text: "The graph is a triangle with base 0.02 s and height 100 N: $J = \\frac12 \\times 0.02 \\times 100 = 1$ N s." },
        { text: "$v = \\dfrac{J}{m} = 2$ m/s." },
      ],
      answer: "$J = 1$ N s and $v = 2$ m/s.",
    },
    {
      type: "worked-example",
      id: "mrg1-2-we5",
      title: "Worked example 5: impulsive tension",
      problem:
        "Blocks of 1 kg and 2 kg lie on a smooth table, joined by a slack string. The 1 kg block is given 6 m/s directly away from the other. When the string jerks taut the two move together. Find their common velocity and the impulse of the tension on each block.",
      steps: [
        { text: "The jerk is internal to the pair, so momentum is conserved: $1 \\times 6 = 3v$, so $v = 2$ m/s. *Why this step:* the tension is huge but brief; we never need its size, only that it is internal." },
        { text: "Impulse of the tension on the 2 kg block: $2 \\times 2 = 4$ N s. On the 1 kg block: $1 \\times (2 - 6) = -4$ N s. Equal and opposite, as the third law requires." },
      ],
      answer: "$v = 2$ m/s; impulses $+4$ N s on the 2 kg block and $-4$ N s on the 1 kg block.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Impulsive forces swamp ordinary ones",
      content:
        "During a short impact, forces like the normal push of a wall or the tension of a jerking string reach hundreds or thousands of times the weight. Finite forces such as gravity or friction deliver almost no impulse in those few milliseconds ($mg\\,\\Delta t$ is tiny), so we leave them out of the momentum balance during the impact and bring them back afterwards.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a softer landing means a smaller impulse\"",
      content:
        "The impulse is $\\Delta p$, fixed by the speeds before and after. A mat, an airbag or giving hands deliver the **same** impulse spread over a **longer** time, so the average force $\\frac{J}{\\Delta t}$ is smaller. Safety devices reduce force, not impulse.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "mrg1-2-q1",
      variant: "practice",
      question: "A 0.5 kg ball hits a wall at 10 m/s and rebounds along the same line at 6 m/s. The contact lasts 0.02 s. What is the magnitude of the average force of the wall on the ball? Give your answer in newtons.",
      answer: 400,
      unit: "N",
      hint: "Take the rebound direction as positive. What is the incoming velocity then?",
      solution: "With the rebound direction positive, $\\Delta v = 6 - (-10) = 16$ m/s, so $J = 0.5 \\times 16 = 8$ N s and $\\bar F = \\dfrac{8}{0.02} = 400$ N.",
      commonMistakes: [
        { answer: 100, feedback: "That uses $\\Delta v = 10 - 6 = 4$ m/s. The velocity reverses, so $\\Delta v = 6 - (-10) = 16$ m/s." },
        { answer: 8, feedback: "8 N s is the impulse. Divide by the contact time for the force." },
        { answer: 250, feedback: "That uses only the incoming momentum, $0.5 \\times 10 = 5$ N s. The wall must also send the ball back." },
      ],
    },
    {
      type: "quiz",
      id: "mrg1-2-q2",
      variant: "concept",
      question: "Why does an airbag reduce injuries in a crash?",
      options: [
        { text: "It increases the stopping time, so the same impulse needs a smaller average force.", correct: true, feedback: "$\\bar F = \\frac{\\Delta p}{\\Delta t}$ with $\\Delta p$ fixed and $\\Delta t$ larger." },
        { text: "It reduces the passenger's change of momentum.", feedback: "The passenger goes from the car's speed to rest either way: the same $\\Delta p$." },
        { text: "It reduces the impulse by absorbing momentum.", feedback: "Impulse equals change of momentum, which is fixed by the speeds. The airbag changes only the timing." },
      ],
      hint: "The passenger's change in momentum is set by the crash. Since impulse $= F_{\\text{avg}}\\Delta t = \\Delta p$, what can the airbag actually change?",
    },
    {
      type: "quiz",
      id: "mrg1-2-q3",
      variant: "practice",
      question: "A force on a 4 kg block at rest rises linearly from 0 to 20 N in 2 s, then falls linearly to 0 in the next 2 s. What is the block's final speed? (Smooth floor.)",
      options: [
        { text: "10 m/s", correct: true, feedback: "The area is a triangle: $\\frac12 \\times 4 \\times 20 = 40$ N s, and $\\frac{40}{4} = 10$ m/s." },
        { text: "20 m/s", feedback: "That treats the pulse as a rectangle of height 20 N. A triangle has half that area." },
        { text: "5 m/s", feedback: "That is the area of one of the two halves only." },
        { text: "40 m/s", feedback: "40 N s is the impulse. Divide by the mass." },
      ],
      hint: "The impulse is the area under the $F$-$t$ graph (a triangle here). It equals the block's change in momentum, starting from rest.",
    },
    {
      type: "quiz",
      id: "mrg1-2-q4",
      variant: "practice",
      multiple: true,
      question: "A 0.1 kg ball hits a smooth wall at 20 m/s, at $60^\\circ$ to the normal, and rebounds with the same speed at the same angle. Select all the statements about the impulse on the ball that are correct.",
      options: [
        { text: "Its magnitude is 2 N s.", correct: true, feedback: "$2mv\\cos60^\\circ = 2 \\times 0.1 \\times 20 \\times \\frac12 = 2$ N s." },
        { text: "It points along the normal, away from the wall.", correct: true, feedback: "A smooth wall can only push along the normal, so only the normal component of the velocity changes." },
        { text: "Its magnitude is $2\\sqrt3$ N s.", feedback: "That uses $\\sin60^\\circ$. The component along the wall is unchanged; only the normal component, $v\\cos60^\\circ$, reverses." },
        { text: "Its magnitude is 4 N s.", feedback: "That is the head-on value $2mv$. At an angle only the normal part reverses." },
        { text: "It is zero, since the speed is unchanged.", feedback: "The speed is unchanged, but the velocity is not: the normal component reverses." },
      ],
      hint: "Split the velocity into components along the wall and along the normal. The smooth wall changes only the normal component, so find $\\Delta p$ for that component alone (Worked example 3).",
    },
    {
      type: "numeric",
      id: "mrg1-2-q5",
      variant: "practice",
      question: "A 2 kg block moving at 9 m/s on a smooth table is tied by a slack string to a 1 kg block at rest. When the string becomes taut the blocks move together. What impulse does the string give the 1 kg block? Give your answer in N s.",
      answer: 6,
      unit: "N s",
      hint: "The jerk is internal to the two-block system. Find the common velocity first.",
      solution: "Momentum is conserved through the jerk: common velocity $= \\dfrac{2 \\times 9}{3} = 6$ m/s. The 1 kg block goes from 0 to 6 m/s, so the impulse on it is $1 \\times 6 = 6$ N s.",
      commonMistakes: [
        { answer: 9, feedback: "That would give the 1 kg block 9 m/s, but they move together at the common velocity." },
        { answer: 12, feedback: "That is the 2 kg block's momentum after the jerk, $2 \\times 6$. The 1 kg block goes from 0 to 6 m/s, gaining $1 \\times 6$." },
        { answer: 18, feedback: "That is the total momentum, not the impulse on one block." },
      ],
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "variable-mass-and-rockets",
  title: "1.3 · Variable Mass: Conveyor Belts and Rockets",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "Sand pours from a hopper onto a moving conveyor belt. A rocket blasts exhaust out of its nozzle. A hose sprays a wall. In each case mass is streaming into or out of the body we care about, and $\\vec F = m\\vec a$ with a fixed $m$ gives nonsense. The momentum form $\\vec F = \\frac{d\\vec P}{dt}$, applied carefully to a fixed collection of matter, handles all of them.",
    },
    { type: "heading", text: "Deriving the variable-mass equation" },
    {
      type: "text",
      content:
        "**Derivation.** At time $t$, a body of mass $m$ moves at $\\vec v$, and a small lump $dm$ about to join it moves at $\\vec w$. At $t + dt$ they move together at $\\vec v + d\\vec v$. Track *both* (a fixed set of matter, so Newton's law applies):",
    },
    {
      type: "math",
      latex: "d\\vec P = (m + dm)(\\vec v + d\\vec v) - \\big(m\\vec v + dm\\,\\vec w\\big) = m\\,d\\vec v + dm\\,(\\vec v - \\vec w)",
    },
    {
      type: "text",
      content:
        "dropping the product of two small quantities. Divide by $dt$ and write $\\vec u_{\\text{rel}} = \\vec w - \\vec v$ for the velocity of the incoming (or outgoing) mass relative to the body:",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Equation of motion with variable mass",
      content:
        "$\\vec F_{\\text{ext}} = m\\dfrac{d\\vec v}{dt} - \\vec u_{\\text{rel}}\\dfrac{dm}{dt}$, where $\\vec u_{\\text{rel}}$ is the velocity of the gained or lost mass **relative to the body**. It holds for gaining mass ($\\frac{dm}{dt} > 0$) and losing it ($\\frac{dm}{dt} < 0$). The term $\\vec u_{\\text{rel}}\\frac{dm}{dt}$ acts like an extra force, called **thrust** for a rocket.",
    },
    { type: "heading", text: "Conveyor belt" },
    {
      type: "text",
      content:
        "Sand falls vertically onto a belt that must keep moving at constant $v$. The sand arrives with zero horizontal velocity, so $u_{\\text{rel}} = -v$, and $\\frac{dv}{dt} = 0$. The horizontal force needed is $F = v\\frac{dm}{dt}$. The power supplied is $P = Fv = v^2\\frac{dm}{dt}$, but the sand's kinetic energy only grows at $\\frac12v^2\\frac{dm}{dt}$. **Half the power is lost as heat**, in the sliding of sand on belt before it catches up.\n\n**Water jet.** A jet of density $\\rho$, area $A$ and speed $v$ hits a wall and stops dead. Mass arrives at $\\rho Av$ per second, each kilogram losing momentum $v$, so the force on the wall is $F = \\rho Av^2$.\n\n**Falling chain.** A uniform chain (mass $M$, length $L$) hangs with its lower end just touching a table and is released. When a length $x$ has landed, the rest is moving at $v = \\sqrt{2gx}$ (free fall), and mass lands at $\\lambda v$ per second with $\\lambda = \\frac ML$. Stopping it needs a force $\\lambda v^2 = \\frac ML(2gx)$, on top of the weight $\\frac{M}{L}xg$ of the chain already lying there. Total force on the table: $\\frac{3Mgx}{L}$, **three times** the weight of the fallen part.",
    },
    { type: "heading", text: "The rocket equation" },
    {
      type: "text",
      content:
        "**The rocket.** Exhaust leaves at speed $u$ relative to the rocket, backwards, so $\\vec u_{\\text{rel}}$ points backwards and $\\frac{dm}{dt} < 0$. Moving vertically upwards against gravity:",
    },
    {
      type: "math",
      latex: "m\\frac{dv}{dt} = u\\left|\\frac{dm}{dt}\\right| - mg \\qquad \\text{(thrust } F_{\\text{th}} = u\\left|\\tfrac{dm}{dt}\\right|\\text{)}",
    },
    {
      type: "text",
      content:
        "Ignore gravity for a moment. Then $m\\,dv = -u\\,dm$, so $dv = -u\\frac{dm}{m}$. Integrate from mass $m_0$ at speed $v_0 = 0$ to mass $m$:",
    },
    {
      type: "math",
      latex: "v = u\\ln\\frac{m_0}{m} \\qquad\\text{and, with gravity over burn time } t: \\qquad v = u\\ln\\frac{m_0}{m} - gt",
    },
    {
      type: "text",
      content:
        "The playground plots the final speed against the fraction $f$ of the initial mass that has been burnt ($\\frac{m_0}{m} = \\frac{1}{1 - f}$), in km/s for an exhaust speed $u$ in km/s.",
    },
    {
      type: "interactive",
      config: {
        component: "transform-playground",
        baseExpr: "ln(1/(1-x))",
        baseLatex: "\\ln\\frac{1}{1-f}",
        expr: "u*ln(1/(1-x))",
        exprLatex: "v = u\\ln\\frac{m_0}{m}",
        params: [{ name: "u", min: 1, max: 4, step: 0.5, initial: 2 }],
        window: { xmin: 0, xmax: 0.95, ymin: 0, ymax: 12 },
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the curve is gentle at first and then shoots up as $f \\to 1$. Burning the first half of the mass buys only $u\\ln2 \\approx 0.69u$; burning 90% buys $u\\ln10 \\approx 2.3u$. Doubling $u$ doubles every speed. That is why engineers chase exhaust speed and why real rockets drop empty stages: carrying dead mass wastes the logarithm.",
    },
    { type: "heading", text: "Conveyor, rocket and hose problems" },
    {
      type: "worked-example",
      id: "mrg1-3-we1",
      title: "Worked example 1: the conveyor, JEE Main",
      problem:
        "Sand drops onto a belt at 2 kg/s. The belt moves at a steady 3 m/s. Find the extra force needed to keep the belt moving, the power, and how much of it goes into kinetic energy.",
      steps: [
        { text: "$F = v\\frac{dm}{dt} = 3 \\times 2 = 6$ N. *Why this step:* every second, 2 kg of sand must be taken from 0 to 3 m/s horizontally, a momentum change of 6 kg m/s." },
        { text: "Power: $P = Fv = 18$ W." },
        { text: "Kinetic energy gained per second: $\\frac12 \\times 2 \\times 3^2 = 9$ W. The other 9 W becomes heat as the sand skids to the belt's speed." },
      ],
      answer: "$F = 6$ N and $P = 18$ W, of which 9 W becomes kinetic energy and 9 W heat.",
    },
    {
      type: "worked-example",
      id: "mrg1-3-we2",
      title: "Worked example 2: what burn rate lifts a rocket?",
      problem:
        "A 5000 kg rocket has an exhaust speed of 2 km/s. At what rate must it burn fuel to accelerate upwards at 10 m/s² at lift-off? Take $g = 10$ m/s².",
      steps: [
        { text: "$u\\left|\\frac{dm}{dt}\\right| - mg = ma$, so the thrust must be $m(g + a) = 5000 \\times 20 = 10^5$ N. *Why this step:* the thrust must hold the rocket up *and* accelerate it." },
        { text: "$\\left|\\frac{dm}{dt}\\right| = \\dfrac{10^5}{2000} = 50$ kg/s." },
      ],
      answer: "50 kg/s.",
    },
    {
      type: "worked-example",
      id: "mrg1-3-we3",
      title: "Worked example 3: speed after the burn",
      problem:
        "A rocket in deep space burns three-quarters of its initial mass with exhaust speed 2 km/s. Starting from rest, what speed does it reach?",
      steps: [
        { text: "$\\frac{m_0}{m} = \\frac{1}{1/4} = 4$." },
        { text: "$v = 2\\ln4 \\approx 2 \\times 1.386 \\approx 2.77$ km/s." },
      ],
      answer: "$v = 2\\ln 4 \\approx 2.77$ km/s.",
    },
    {
      type: "worked-example",
      id: "mrg1-3-we4",
      title: "Worked example 4: a hose on a wall",
      problem:
        "Water ($\\rho = 1000$ kg/m³) leaves a nozzle of area 2 cm² at 10 m/s and hits a wall without splashing back. Find the force on the wall.",
      steps: [
        { text: "$A = 2 \\times 10^{-4}$ m². $F = \\rho Av^2 = 1000 \\times 2\\times10^{-4} \\times 100 = 20$ N." },
      ],
      answer: "$F = 20$ N.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a rocket pushes against the air\"",
      content:
        "A rocket pushes against its *own exhaust*. The engine throws gas backwards, the gas pushes the rocket forwards (third law), and nothing outside is needed. Rockets work best in the vacuum of space, where there is no air resistance at all. The thrust $u\\left|\\frac{dm}{dt}\\right|$ contains no property of the surroundings.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "mrg1-3-q1",
      variant: "practice",
      question: "Sand falls vertically onto a conveyor belt at 4 kg/s. What horizontal force keeps the belt moving at a steady 2 m/s? Give your answer in newtons.",
      answer: 8,
      unit: "N",
      hint: "Every second, how much horizontal momentum must be given to the newly arrived sand?",
      solution: "Each second 4 kg of sand goes from 0 to 2 m/s horizontally, gaining $4 \\times 2 = 8$ kg m/s. So $F = v\\dfrac{dm}{dt} = 2 \\times 4 = 8$ N.",
      commonMistakes: [
        { answer: 0, feedback: "The belt is not accelerating, but every second 4 kg of sand is accelerated from rest to 2 m/s." },
        { answer: 4, feedback: "That uses $\\frac12 v\\frac{dm}{dt}$, which mixes up force and energy. The momentum rate is $v\\frac{dm}{dt}$." },
        { answer: 16, feedback: "That is $v^2\\frac{dm}{dt}$, the power in watts, not the force." },
      ],
    },
    {
      type: "quiz",
      id: "mrg1-3-q2",
      variant: "concept",
      question: "For the conveyor belt, the motor supplies power $v^2\\frac{dm}{dt}$ but the sand's kinetic energy grows at only $\\frac12v^2\\frac{dm}{dt}$. Where does the rest go?",
      options: [
        { text: "Into heat, as the sand slides on the belt before matching its speed.", correct: true, feedback: "This is a perfectly inelastic 'collision' between sand and belt, repeated continuously." },
        { text: "Nowhere: the calculation must be wrong.", feedback: "The calculation is right. Energy is conserved overall, but not as kinetic energy." },
        { text: "Into the belt's kinetic energy.", feedback: "The belt moves at constant speed, so its kinetic energy does not change." },
      ],
      hint: "The sand lands at rest on a moving belt. What happens between the sand and the belt before the sand reaches the belt's speed?",
    },
    {
      type: "numeric",
      id: "mrg1-3-q3",
      variant: "practice",
      question: "A 2000 kg rocket, launched vertically, ejects gas at 20 kg/s with speed 1500 m/s relative to the rocket. What is its initial upward acceleration? Take $g = 10$ m/s² and give your answer in m/s².",
      answer: 5,
      unit: "m/s²",
      hint: "Thrust is $u\\left|\\frac{dm}{dt}\\right|$. The net force is thrust minus weight.",
      solution: "Thrust $= 1500 \\times 20 = 30\\,000$ N and weight $= 2000 \\times 10 = 20\\,000$ N, so $a = \\dfrac{30\\,000 - 20\\,000}{2000} = 5$ m/s².",
      commonMistakes: [
        { answer: 15, feedback: "That ignores the rocket's weight. The net force is thrust minus weight." },
        { answer: 25, feedback: "Gravity opposes the thrust, so subtract $g$, don't add it." },
      ],
    },
    {
      type: "quiz",
      id: "mrg1-3-q4",
      variant: "practice",
      question: "In deep space, what fraction of a rocket's initial mass must be burnt for it to reach a speed equal to its exhaust speed $u$ (starting from rest)?",
      options: [
        { text: "50%", feedback: "Burning half gives $v = u\\ln2 \\approx 0.69u$, short of $u$." },
        { text: "$\\frac1e \\approx 37\\%$", feedback: "That is the fraction *remaining*, not the fraction burnt." },
        { text: "$1 - \\frac1e \\approx 63\\%$", correct: true, feedback: "$u\\ln\\frac{m_0}{m} = u$ needs $\\frac{m_0}{m} = e$, so $m = \\frac{m_0}{e}$ and the burnt fraction is $1 - \\frac1e$." },
        { text: "100%", feedback: "The logarithm reaches 1 well before all the mass is gone." },
      ],
      hint: "Use the rocket equation $v = u\\ln\\dfrac{m_0}{m}$ with $v = u$, then find what fraction of $m_0$ has gone.",
    },
    {
      type: "quiz",
      id: "mrg1-3-q5",
      variant: "practice",
      question: "A horizontal water jet of cross-section 5 cm² and speed 4 m/s strikes a wall and stops. What force does it exert? ($\\rho = 1000$ kg/m³)",
      options: [
        { text: "8 N", correct: true, feedback: "$\\rho Av^2 = 1000 \\times 5\\times10^{-4} \\times 16 = 8$ N." },
        { text: "2 N", feedback: "That is $\\rho Av$, the mass flow in kg/s. Each kilogram brings momentum $v$, so multiply by $v$ again." },
        { text: "4 N", feedback: "That is $\\frac12\\rho Av^2$, an energy-flow formula. Force is the momentum rate $\\rho Av^2$." },
        { text: "80 000 N", feedback: "Convert the area: 5 cm² is $5\\times10^{-4}$ m², not 5 m²." },
      ],
      hint: "The force is the rate of momentum delivered: $F = \\dfrac{dm}{dt}\\,v$, with $\\dfrac{dm}{dt} = \\rho A v$. Convert cm² to m² first (Worked example 4).",
    },
    {
      type: "quiz",
      id: "mrg1-3-q6",
      variant: "concept",
      question: "Can a rocket accelerate in the vacuum of space?",
      options: [
        { text: "Yes: it pushes on its own exhaust, and the exhaust pushes back.", correct: true, feedback: "The thrust $u\\left|\\frac{dm}{dt}\\right|$ needs no air, only ejected mass." },
        { text: "No: there is nothing to push against.", feedback: "The exhaust gas is what it pushes against. Momentum of rocket + exhaust is conserved." },
        { text: "Only while it is inside the atmosphere.", feedback: "Air only adds drag. The thrust does not depend on it." },
      ],
      hint: "Apply momentum conservation to the rocket plus its exhaust. Does that argument need any air at all?",
    },
    {
      type: "quiz",
      id: "mrg1-3-q7",
      variant: "practice",
      multiple: true,
      question: "A rocket in deep space (no gravity, no air) burns fuel at a constant rate, ejecting the gas at a constant speed $u$ relative to the rocket. Select all the statements that are correct.",
      options: [
        { text: "The thrust on the rocket is constant.", correct: true, feedback: "Thrust $= u\\left|\\frac{dm}{dt}\\right|$, and both factors are constant." },
        { text: "The rocket's acceleration increases as it burns fuel.", correct: true, feedback: "The same thrust acts on a shrinking mass, so $a = \\frac{u|dm/dt|}{m}$ grows." },
        { text: "Its speed gain depends only on $u$ and the mass ratio $\\frac{m_0}{m}$.", correct: true, feedback: "$\\Delta v = u\\ln\\frac{m_0}{m}$: the burn rate does not appear." },
        { text: "Burning the same fuel faster gives a larger final speed.", feedback: "A faster burn gives more thrust for less time. The final speed $u\\ln\\frac{m_0}{m}$ is the same." },
        { text: "The momentum of the rocket alone (without its exhaust) is conserved.", feedback: "The exhaust pushes the rocket forward, so the rocket's own momentum grows. Only rocket + exhaust together conserve momentum." },
      ],
      hint: "Write the thrust and the rocket equation from this lesson, then test each statement, remembering the rocket's mass keeps falling.",
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "elastic-and-inelastic-collisions",
  title: "1.4 · Elastic and Inelastic Collisions in One Dimension",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "Two snooker balls click together and the moving one stops dead while the other rolls away. Two lumps of clay meet and stick. Two railway wagons bump, couple and trundle on together. In every one of these the total momentum is the same before and after, because the forces of the collision are internal. What differs is what happens to the kinetic energy, and that is how we classify collisions.",
    },
    {
      type: "table",
      headers: ["Type", "Momentum", "Kinetic energy", "Example"],
      rows: [
        ["elastic", "conserved", "conserved", "snooker balls, atoms, a steel ball on steel (nearly)"],
        ["inelastic", "conserved", "some lost (to heat, sound, deformation)", "a cricket ball on a bat, cars bumping"],
        ["perfectly inelastic", "conserved", "maximum possible loss; the bodies stick", "clay lumps, a bullet lodging in a block, coupling wagons"],
      ],
    },
    { type: "heading", text: "The 1D elastic collision" },
    {
      type: "text",
      content:
        "Masses $m_1$, $m_2$ move along a line with velocities $u_1$, $u_2$ before and $v_1$, $v_2$ after. Momentum and kinetic energy give two equations. Group each body's terms together:",
    },
    {
      type: "math",
      latex: "\\begin{aligned} m_1(u_1 - v_1) &= m_2(v_2 - u_2) \\\\ m_1(u_1^2 - v_1^2) &= m_2(v_2^2 - u_2^2) \\end{aligned}",
    },
    {
      type: "text",
      content:
        "Factorise the squares, $u_1^2 - v_1^2 = (u_1 - v_1)(u_1 + v_1)$, and divide the second equation by the first (assuming a collision actually happens, so $u_1 \\ne v_1$):",
    },
    { type: "math", latex: "u_1 + v_1 = u_2 + v_2 \\quad\\Longleftrightarrow\\quad v_2 - v_1 = -(u_2 - u_1) = u_1 - u_2" },
    {
      type: "text",
      content:
        "In an elastic collision the **relative velocity reverses**: the balls separate as fast as they approached. This linear equation replaces the quadratic energy equation. Solving it with momentum:",
    },
    {
      type: "math",
      latex: "v_1 = \\frac{m_1 - m_2}{m_1 + m_2}u_1 + \\frac{2m_2}{m_1 + m_2}u_2, \\qquad v_2 = \\frac{m_2 - m_1}{m_1 + m_2}u_2 + \\frac{2m_1}{m_1 + m_2}u_1",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Three special cases (target $m_2$ at rest, $u_2 = 0$)",
      content:
        "**Equal masses:** $v_1 = 0$, $v_2 = u_1$. They swap velocities (Newton's cradle, snooker).\n**Heavy on light** ($m_1 \\gg m_2$): $v_1 \\approx u_1$, $v_2 \\approx 2u_1$. A truck hitting a tennis ball sends it off at twice the truck's speed.\n**Light on heavy** ($m_1 \\ll m_2$): $v_1 \\approx -u_1$, $v_2 \\approx 0$. A ball bounces back off a wall at its own speed.",
    },
    { type: "heading", text: "Perfectly inelastic collisions" },
    {
      type: "text",
      content:
        "**Perfectly inelastic.** The bodies stick, so they share one velocity, which momentum alone fixes: $v = \\frac{m_1u_1 + m_2u_2}{m_1 + m_2} = v_{cm}$. How much energy is lost? Split each velocity into the COM velocity plus a part relative to the COM: $v_1 = v_{cm} + \\frac{m_2}{M}u_{\\text{rel}}$ and $v_2 = v_{cm} - \\frac{m_1}{M}u_{\\text{rel}}$, with $u_{\\text{rel}} = v_1 - v_2$. Substituting into $\\frac12m_1v_1^2 + \\frac12m_2v_2^2$, the cross terms cancel and",
    },
    {
      type: "math",
      latex: "K = \\tfrac12 M v_{cm}^2 + \\tfrac12\\mu\\,u_{\\text{rel}}^2, \\qquad \\mu = \\frac{m_1m_2}{m_1 + m_2}\\ \\text{(the reduced mass)}",
    },
    {
      type: "text",
      content:
        "The first term belongs to the motion of the COM, which no internal force can change. Only the second, the energy of *relative* motion, is available to be lost. Sticking destroys all of it:",
    },
    { type: "math", latex: "\\Delta K_{\\text{lost}} = \\tfrac12\\,\\frac{m_1m_2}{m_1 + m_2}\\,(u_1 - u_2)^2" },
    {
      type: "interactive",
      config: {
        component: "mrg-collision-lab",
        mode: "collision",
        e: { min: 0, max: 1, step: 0.05, initial: 1 },
        graph: "energy",
        caption:
          "An elastic collision: 2 kg at 4 m/s meets 1 kg at rest. Play it and watch the total kinetic energy. Then try equal masses.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the total kinetic energy dips while the bumper is squeezed, reaching its minimum at maximum compression, when both carts share the COM velocity. Then the bumper springs back and returns all of it. With equal masses the first cart stops dead. Now the same collision with $e = 0$ (the carts stick):",
    },
    {
      type: "interactive",
      config: {
        component: "mrg-collision-lab",
        mode: "collision",
        e: { min: 0, max: 1, step: 0.05, initial: 0 },
        graph: "energy",
        caption:
          "A perfectly inelastic collision. The kinetic energy falls to the dip and stays there. Compare the final value with ½Mv_cm².",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the energy drops from 16 J to about 10.7 J and stays there. The 10.7 J is $\\frac12(3)\\left(\\frac83\\right)^2$, the COM's share, which is untouchable. The lost 5.3 J is $\\frac12\\cdot\\frac23\\cdot4^2$, exactly the relative-motion energy.",
    },
    { type: "heading", text: "Elastic collisions and neutron moderators" },
    {
      type: "worked-example",
      id: "mrg1-4-we1",
      title: "Worked example 1: a general elastic collision",
      problem:
        "2 kg at 4 m/s hits 1 kg at rest, elastically. Positive direction: the 2 kg ball's initial motion. Find the velocities after the collision.",
      steps: [
        { text: "$v_1 = \\frac{2 - 1}{3}(4) = \\frac43$ m/s and $v_2 = \\frac{2(2)}{3}(4) = \\frac{16}{3}$ m/s." },
        { text: "Check momentum: $2 \\cdot \\frac43 + 1 \\cdot \\frac{16}{3} = \\frac{24}{3} = 8 = 2 \\times 4$. ✓" },
        { text: "Check relative velocity: $\\frac{16}{3} - \\frac43 = 4 = u_1 - u_2$. ✓ *Why this step:* the two checks are cheap and catch almost every slip in the formula." },
      ],
      answer: "$v_1 = \\frac43$ m/s and $v_2 = \\frac{16}{3}$ m/s, both forwards.",
    },
    {
      type: "worked-example",
      id: "mrg1-4-we2",
      title: "Worked example 2: equal masses, both moving",
      problem:
        "A 1 kg ball at 3 m/s meets a 1 kg ball coming the other way at 2 m/s, elastically. Find their velocities after the collision.",
      steps: [
        { text: "Equal masses swap velocities, whatever they are: $v_1 = -2$ m/s, $v_2 = 3$ m/s. *Why this step:* with $m_1 = m_2$ the formulas collapse to $v_1 = u_2$, $v_2 = u_1$." },
      ],
      answer: "They swap: $v_1 = -2$ m/s and $v_2 = 3$ m/s.",
    },
    {
      type: "worked-example",
      id: "mrg1-4-we3",
      title: "Worked example 3: a perfectly inelastic collision",
      problem:
        "A 3 kg trolley at 4 m/s hits a 1 kg trolley at rest and they couple. Find their common velocity and the kinetic energy lost.",
      steps: [
        { text: "$v = \\frac{3 \\times 4}{4} = 3$ m/s." },
        { text: "$K$ before $= \\frac12(3)(16) = 24$ J; after $= \\frac12(4)(9) = 18$ J; lost 6 J." },
        { text: "Formula check: $\\frac12\\cdot\\frac{3 \\times 1}{4}\\cdot4^2 = 6$ J. ✓" },
      ],
      answer: "$v = 3$ m/s; 6 J lost.",
    },
    {
      type: "worked-example",
      id: "mrg1-4-we4",
      title: "Worked example 4: why reactors use heavy water, JEE Main",
      problem:
        "A neutron (mass $m$) hits a nucleus of mass $Am$ at rest, head-on and elastically. What fraction of its kinetic energy does it hand over?",
      steps: [
        { text: "The nucleus leaves at $v_2 = \\frac{2m}{m + Am}u = \\frac{2u}{1 + A}$." },
        { text: "Fraction transferred: $\\dfrac{\\frac12Am\\,v_2^2}{\\frac12mu^2} = \\dfrac{4A}{(1 + A)^2}$. *Why this step:* writing the answer in terms of $A$ lets us compare moderators at a glance." },
        { text: "Deuterium ($A = 2$): $\\frac{8}{9} \\approx 89\\%$. Carbon ($A = 12$): $\\frac{48}{169} \\approx 28\\%$. Lead ($A = 207$): under 2%. Light nuclei slow neutrons fastest, which is why reactors use water, heavy water or graphite, not lead." },
      ],
      answer: "$\\dfrac{4A}{(1 + A)^2}$: about 89% for deuterium, 28% for carbon, under 2% for lead.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"in a perfectly inelastic collision all the kinetic energy is lost\"",
      content:
        "Only the kinetic energy of *relative* motion, $\\frac12\\mu u_{\\text{rel}}^2$, can be lost. The COM's share $\\frac12Mv_{cm}^2$ must survive, because momentum is conserved and the stuck pair still moves at $v_{cm}$. All the kinetic energy disappears only if the total momentum was zero to start with, as in a head-on crash of equal momenta.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "mrg1-4-q1",
      variant: "practice",
      question: "A 1 kg ball at 6 m/s collides head-on and elastically with a 2 kg ball at rest. Find their velocities after the collision.",
      options: [
        { text: "$v_1 = 0$, $v_2 = 3$ m/s", feedback: "Momentum is conserved ($2 \\times 3 = 6$), but the balls separate at 3 m/s, not 6 m/s: this collision would be inelastic." },
        { text: "$v_1 = 2$ m/s, $v_2 = 2$ m/s", feedback: "Sticking together at 2 m/s is the perfectly inelastic result." },
        { text: "$v_1 = -2$ m/s, $v_2 = 4$ m/s", correct: true, feedback: "$v_1 = \\frac{1 - 2}{3}(6) = -2$, $v_2 = \\frac{2(1)}{3}(6) = 4$. Check: $-2 + 8 = 6$ ✓ and $4 - (-2) = 6$ ✓." },
        { text: "$v_1 = 2$ m/s, $v_2 = 4$ m/s", feedback: "The momentum would be $2 + 8 = 10 \\ne 6$. The light ball bounces back." },
      ],
      hint: "Use momentum conservation together with the elastic condition: speed of separation equals speed of approach, $v_2 - v_1 = u_1 - u_2$.",
    },
    {
      type: "quiz",
      id: "mrg1-4-q2",
      variant: "concept",
      question: "A moving ball hits an identical ball at rest head-on, and the collision is elastic. What happens?",
      options: [
        { text: "Both move on at half the original speed.", feedback: "That conserves momentum but loses half the kinetic energy: it is the perfectly inelastic result." },
        { text: "The first ball stops and the second moves off with the first ball's velocity.", correct: true, feedback: "Equal masses in an elastic head-on collision swap velocities." },
        { text: "The first ball bounces back at its original speed.", feedback: "That happens for a light ball on a very heavy target, not equal masses." },
      ],
      hint: "Check the special cases for an elastic collision with the target at rest: put $m_1 = m_2$ into $v_1 = \\frac{m_1 - m_2}{m_1 + m_2}u_1$ and $v_2 = \\frac{2m_1}{m_1 + m_2}u_1$.",
    },
    {
      type: "numeric",
      id: "mrg1-4-q3",
      variant: "practice",
      question: "A 2 kg lump moving at 5 m/s meets a 3 kg lump moving at 5 m/s in the opposite direction. They stick. How much kinetic energy is lost? Give your answer in joules.",
      answer: 60,
      unit: "J",
      hint: "Either compute the KE before and after, or use $\\frac12\\mu u_{\\text{rel}}^2$ with the reduced mass $\\mu$.",
      solution: "$\\mu = \\dfrac{2 \\times 3}{5} = \\dfrac65$ kg and $u_{\\text{rel}} = 10$ m/s, so the loss is $\\tfrac12 \\cdot \\tfrac65 \\cdot 100 = 60$ J.\n\nCheck: before, $\\tfrac12(2)(25) + \\tfrac12(3)(25) = 62.5$ J. After, the pair moves at $\\frac{10 - 15}{5} = -1$ m/s with $\\tfrac12(5)(1)^2 = 2.5$ J. Loss $= 60$ J.",
      commonMistakes: [
        { answer: 62.5, feedback: "That is all of it. The pair still moves at $\\frac{10 - 15}{5} = -1$ m/s afterwards, keeping 2.5 J." },
        { answer: 2.5, feedback: "That is the kinetic energy *remaining*, not the amount lost." },
        { answer: 0, feedback: "Sticking always loses the relative-motion energy, here most of it." },
      ],
    },
    {
      type: "quiz",
      id: "mrg1-4-q4",
      variant: "concept",
      multiple: true,
      question: "During any 1D collision, at the moment of maximum compression of the two bodies, what is true? Select all that apply.",
      options: [
        { text: "Both bodies move with the same velocity, $v_{cm}$.", correct: true, feedback: "Compression stops growing when the relative velocity is zero, so both share the COM velocity." },
        { text: "The total kinetic energy is at its minimum, $\\tfrac12 Mv_{cm}^2$.", correct: true, feedback: "Only the COM's kinetic energy remains in motion; the relative-motion energy is all stored or dissipated." },
        { text: "The kinetic energy missing at that moment is $\\tfrac12\\mu u_{\\text{rel}}^2$, with $u_{\\text{rel}}$ the relative speed before impact.", correct: true, feedback: "Total KE $= \\tfrac12 Mv_{cm}^2 + \\tfrac12\\mu u_{\\text{rel}}^2$ before impact, and the relative part is momentarily zero." },
        { text: "Both bodies are momentarily at rest.", feedback: "Only if $v_{cm} = 0$. In general they share the COM velocity." },
        { text: "The total momentum is momentarily zero.", feedback: "The total momentum never changes during the collision." },
      ],
      hint: "At maximum compression the bodies have stopped approaching each other. Combine that with momentum conservation, then ask which part of the kinetic energy a collision can change.",
    },
    {
      type: "numeric",
      id: "mrg1-4-q5",
      variant: "practice",
      question: "A neutron collides head-on and elastically with a deuteron (mass $2m$) at rest. What fraction of the neutron's kinetic energy is transferred to the deuteron? Give your answer as a fraction or decimal.",
      answer: 0.8889,
      relTolerance: 0.01,
      hint: "Find the deuteron's speed after an elastic head-on collision, then compare kinetic energies.",
      solution: "The deuteron leaves with $v_2 = \\dfrac{2m}{m + 2m}u = \\dfrac{2u}{3}$. Its KE is $\\tfrac12(2m)\\left(\\dfrac{2u}{3}\\right)^2 = \\dfrac89 \\cdot \\tfrac12 mu^2$. In general the fraction is $\\dfrac{4A}{(1 + A)^2} = \\dfrac{8}{9}$ with $A = 2$.",
      commonMistakes: [
        { answer: 0.6667, feedback: "That is the deuteron's share of the total *mass*. Use $\\frac{4A}{(1 + A)^2}$." },
        { answer: 0.4444, feedback: "That is $\\left(\\frac{2}{3}\\right)^2$. The deuteron's speed is $\\frac{2u}{3}$, but its mass is $2m$, which doubles the energy." },
        { answer: 1, feedback: "All of it is transferred only when the masses are equal." },
      ],
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "coefficient-of-restitution",
  title: "1.5 · The Coefficient of Restitution",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "Drop a tennis ball, a cricket ball and a lump of clay from the same height onto concrete. The tennis ball comes back most of the way, the cricket ball less, the clay not at all. Real collisions sit between the two extremes of 1.4, and one number, measured between the two colliding surfaces, says where.",
    },
    { type: "heading", text: "Compression and restitution phases" },
    {
      type: "text",
      content:
        "**Two phases.** Every collision has a **compression** phase, while the bodies squash into each other, ending when they share the velocity $V = v_{cm}$; then a **restitution** phase, while they push apart. Let $J_C$ and $J_R$ be the impulses each body receives in the two phases. For body 1 (moving right, pushed left):",
    },
    {
      type: "math",
      latex: "\\begin{aligned} \\text{compression:}\\quad & m_1(u_1 - V) = J_C, \\quad m_2(V - u_2) = J_C \\;\\Rightarrow\\; u_1 - u_2 = J_C\\left(\\tfrac{1}{m_1} + \\tfrac{1}{m_2}\\right) \\\\ \\text{restitution:}\\quad & m_1(V - v_1) = J_R, \\quad m_2(v_2 - V) = J_R \\;\\Rightarrow\\; v_2 - v_1 = J_R\\left(\\tfrac{1}{m_1} + \\tfrac{1}{m_2}\\right) \\end{aligned}",
    },
    {
      type: "text",
      content:
        "Dividing, the mass factor cancels. The ratio of the impulses equals the ratio of the relative speeds:",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Coefficient of restitution",
      content:
        "$e = \\dfrac{J_R}{J_C} = \\dfrac{\\text{speed of separation}}{\\text{speed of approach}} = \\dfrac{v_2 - v_1}{u_1 - u_2}$, measured along the line of impact.\n$e = 1$: elastic. $0 < e < 1$: inelastic. $e = 0$: perfectly inelastic (no restitution phase; the bodies stay together).",
    },
    {
      type: "text",
      content: "Solving $e$ with momentum conservation gives the general 1D results:",
    },
    {
      type: "math",
      latex: "v_1 = \\frac{(m_1 - em_2)u_1 + (1 + e)m_2u_2}{m_1 + m_2}, \\qquad v_2 = \\frac{(m_2 - em_1)u_2 + (1 + e)m_1u_1}{m_1 + m_2}",
    },
    {
      type: "text",
      content:
        "and, from the energy split of 1.4 (the relative speed shrinks from $u_{\\text{rel}}$ to $eu_{\\text{rel}}$):",
    },
    { type: "math", latex: "\\Delta K_{\\text{lost}} = \\tfrac12\\mu\\,(1 - e^2)\\,(u_1 - u_2)^2" },
    { type: "heading", text: "Restitution in the COM frame" },
    {
      type: "text",
      content:
        "**The COM frame makes it obvious.** Ride along with the centre of mass. In that frame the total momentum is zero, so the two bodies approach with momenta $+p$ and $-p$, and leave with momenta $-ep$ and $+ep$: each velocity simply **reverses and shrinks by the factor $e$**. Try the frame toggle below.",
    },
    {
      type: "interactive",
      config: {
        component: "mrg-collision-lab",
        mode: "collision",
        e: { min: 0, max: 1, step: 0.05, initial: 0.5 },
        graph: "velocity",
        caption:
          "Set e and play. Read off the approach and separation speeds from the velocity graph, then switch to the COM frame and play again.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the two velocity lines meet at $v_{cm}$ (maximum compression) and then separate, the gap afterwards being $e$ times the gap before. In the COM frame the picture is symmetric: each cart comes in, stops at the same instant as the other, and goes back out at $e$ times its incoming speed.",
    },
    { type: "heading", text: "A ball bouncing on the floor" },
    {
      type: "text",
      content:
        "The floor is the second body, with infinite mass, so the ball's rebound speed is $e$ times its impact speed. Dropped from height $h$, it hits at $\\sqrt{2gh}$, leaves at $e\\sqrt{2gh}$ and rises to $e^2h$. After $n$ bounces the height is $h_n = e^{2n}h$. Adding the geometric series of up-and-down trips:",
    },
    {
      type: "math",
      latex: "\\text{total distance} = h + 2(e^2h + e^4h + \\dots) = h\\,\\frac{1 + e^2}{1 - e^2}, \\qquad \\text{total time} = \\sqrt{\\frac{2h}{g}}\\;\\frac{1 + e}{1 - e}",
    },
    {
      type: "text",
      content:
        "(For the time: the first fall takes $t_0 = \\sqrt{2h/g}$, and each later up-and-down trip after the $n$th bounce takes $2e^nt_0$, so the total is $t_0\\left(1 + \\frac{2e}{1 - e}\\right)$.) The playground plots the rebound heights against the bounce number $n$. The slider is called $r$ because the letter $e$ is reserved for $2.718\\ldots$ in the graphing engine; read $r$ as the coefficient of restitution.",
    },
    {
      type: "interactive",
      config: {
        component: "transform-playground",
        baseExpr: "10*0.25^x",
        baseLatex: "10(0.5)^{2n}",
        expr: "h*r^(2*x)",
        exprLatex: "h_n = h\\,r^{2n}",
        params: [
          { name: "h", min: 1, max: 20, step: 1, initial: 10 },
          { name: "r", min: 0.1, max: 1, step: 0.05, initial: 0.8 },
        ],
        window: { xmin: 0, xmax: 8, ymin: 0, ymax: 20 },
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: every bounce multiplies the height by the same factor $r^2$, so the heights fall geometrically. At $r = 0.8$ each bounce keeps 64% of the height; at $r = 0.5$ only 25% (the reference curve). The curve only makes physical sense at whole-number $n$.",
    },
    {
      type: "worked-example",
      id: "mrg1-5-we1",
      title: "Worked example 1: a general collision",
      problem:
        "A 2 kg ball at 6 m/s hits a 4 kg ball at rest, with $e = 0.5$. Positive direction: the 2 kg ball's motion. Find both velocities after the collision and the kinetic energy lost.",
      steps: [
        { text: "Momentum: $2v_1 + 4v_2 = 12$. Restitution: $v_2 - v_1 = 0.5 \\times 6 = 3$. *Why this step:* two linear equations are quicker and safer than the memorised formula." },
        { text: "Substitute $v_2 = v_1 + 3$: $2v_1 + 4v_1 + 12 = 12$, so $v_1 = 0$ and $v_2 = 3$ m/s." },
        { text: "Energy lost: $\\frac12\\cdot\\frac{8}{6}\\cdot(1 - 0.25)\\cdot 36 = 18$ J. Check: 36 J before, $\\frac12(4)(9) = 18$ J after. ✓" },
        { text: "COM-frame check: $v_{cm} = 2$ m/s. In the COM frame the balls approach at $+4$ and $-2$ m/s and leave at $-2$ and $+1$ m/s ($\\times(-e)$). Adding back $v_{cm}$: $0$ and $3$ m/s. ✓" },
      ],
      answer: "$v_1 = 0$, $v_2 = 3$ m/s; 18 J lost.",
    },
    {
      type: "worked-example",
      id: "mrg1-5-we2",
      title: "Worked example 2: a bouncing ball",
      problem:
        "A ball is dropped from 10 m onto a floor with $e = 0.5$. Take $g = 10$ m/s². Find the first two rebound heights, the total distance travelled and the total time until it comes to rest.",
      steps: [
        { text: "First rebound: $e^2h = 0.25 \\times 10 = 2.5$ m; second: $0.625$ m." },
        { text: "Total distance: $10 \\times \\frac{1.25}{0.75} = \\frac{50}{3} \\approx 16.7$ m." },
        { text: "Total time: $t_0 = \\sqrt{2} \\approx 1.41$ s, and $\\sqrt2 \\times \\frac{1.5}{0.5} = 3\\sqrt2 \\approx 4.24$ s. *Why this step:* infinitely many bounces, yet a finite total time, because the trip times form a convergent geometric series." },
      ],
      answer: "Rebounds 2.5 m and 0.625 m; total distance $\\frac{50}{3} \\approx 16.7$ m; total time $3\\sqrt2 \\approx 4.24$ s.",
    },
    {
      type: "worked-example",
      id: "mrg1-5-we3",
      title: "Worked example 3: measuring $e$",
      problem:
        "A ball dropped from 1.6 m rebounds to 0.9 m. Find the coefficient of restitution.",
      steps: [
        { text: "$h_1 = e^2h$, so $e = \\sqrt{\\frac{0.9}{1.6}} = \\sqrt{\\frac{9}{16}} = 0.75$." },
      ],
      answer: "$e = 0.75$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"$e$ is a property of one ball\"",
      content:
        "The coefficient of restitution belongs to the *pair* of surfaces: a tennis ball has one $e$ on concrete, another on grass, another on a racket. Quoting \"the $e$ of a ball\" is shorthand for a stated surface.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"$e = v/u$ for each ball separately\"",
      content:
        "$e$ is a ratio of **relative** velocities: $\\frac{v_2 - v_1}{u_1 - u_2}$. Only when the other body is fixed (a wall or the floor) does it reduce to (rebound speed)/(impact speed) of one ball. In Worked example 1, the 2 kg ball goes from 6 m/s to 0, but $e$ is 0.5, not 0.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "mrg1-5-q1",
      variant: "practice",
      question: "Before a collision, ball A moves at 5 m/s and ball B at $-1$ m/s. Afterwards A moves at 1 m/s and B at 4 m/s. Find the coefficient of restitution $e$.",
      answer: 0.5,
      tolerance: 0.005,
      hint: "$e = \\dfrac{\\text{speed of separation}}{\\text{speed of approach}}$, both relative velocities.",
      solution: "Separation: $v_B - v_A = 4 - 1 = 3$ m/s. Approach: $u_A - u_B = 5 - (-1) = 6$ m/s. So $e = \\dfrac36 = 0.5$.",
      commonMistakes: [
        { answer: 0.75, feedback: "That uses $5 - 1 = 4$ for the approach. B moves towards A, so the approach speed is $5 + 1 = 6$ m/s." },
        { answer: 0.2, feedback: "That is $\\frac{v_A}{u_A}$ for one ball. $e$ uses relative velocities." },
        { answer: 0.6, feedback: "That divides the separation speed 3 by A's speed 5 alone. The approach speed is relative: $5 - (-1) = 6$ m/s." },
      ],
    },
    {
      type: "numeric",
      id: "mrg1-5-q2",
      variant: "practice",
      question: "A ball is dropped from 20 m onto a floor with $e = 0.4$. How high does it rise after the second bounce? Give your answer in metres.",
      answer: 0.512,
      tolerance: 0.005,
      unit: "m",
      hint: "Each bounce multiplies the rebound speed by $e$. How does the height scale?",
      solution: "Height goes as speed squared, so each bounce multiplies the height by $e^2 = 0.16$. After two bounces: $e^4h = 0.0256 \\times 20 = 0.512$ m.",
      commonMistakes: [
        { answer: 3.2, feedback: "That is after the *first* bounce, $e^2h$." },
        { answer: 1.28, feedback: "That is $e^3h$. Each bounce multiplies the height by $e^2$, so two bounces give $e^4$." },
        { answer: 8, feedback: "That is $eh$. The rebound *speed* scales by $e$, so the height, which goes as speed squared, scales by $e^2$ per bounce." },
      ],
    },
    {
      type: "quiz",
      id: "mrg1-5-q3",
      variant: "concept",
      question: "A student says: \"This ball has $e = 0.8$.\" What is missing?",
      options: [
        { text: "The surface it hits: $e$ belongs to the pair of surfaces in contact.", correct: true, feedback: "The same ball rebounds differently from concrete, wood and grass." },
        { text: "Nothing: $e$ is a fixed property of the ball's material.", feedback: "The other surface matters as much as the ball." },
        { text: "The ball's mass.", feedback: "$e$ is a ratio of speeds and does not depend on the mass directly." },
      ],
      hint: "Recall the definition: $e$ compares the speeds of separation and approach of **two** surfaces. Would the same ball bounce the same on concrete and on sand?",
    },
    {
      type: "quiz",
      id: "mrg1-5-q4",
      variant: "practice",
      question: "A ball is dropped from 5 m onto a floor with $e = 0.5$. What total distance does it travel before coming to rest?",
      options: [
        { text: "$\\dfrac{20}{3}$ m", feedback: "That is $\\frac{h}{1 - e^2}$, which counts each rebound height once. Each rebound is travelled up *and* down." },
        { text: "$\\dfrac{25}{3}$ m $\\approx 8.3$ m", correct: true, feedback: "$h\\frac{1 + e^2}{1 - e^2} = 5 \\times \\frac{1.25}{0.75} = \\frac{25}{3}$ m." },
        { text: "15 m", feedback: "That is $h\\frac{1 + e}{1 - e}$, the time formula's factor, not the distance's." },
        { text: "Infinite, since it bounces forever.", feedback: "The distances form a convergent geometric series." },
      ],
      hint: "Each bounce leaves at $e$ times the arrival speed, so heights shrink by $e^2$. Add the first drop to twice each rebound height and sum the geometric series (Worked example 2).",
    },
    {
      type: "quiz",
      id: "mrg1-5-q5",
      variant: "practice",
      question: "A 1 kg ball at 4 m/s hits a 3 kg ball at rest head-on with $e = 0.5$. Find their velocities afterwards.",
      options: [
        { text: "$-2$ m/s and $2$ m/s", feedback: "That is the elastic result ($e = 1$). With $e = 0.5$ they separate at 2 m/s, not 4." },
        { text: "$1$ m/s and $1$ m/s", feedback: "That is the perfectly inelastic result ($e = 0$)." },
        { text: "$-0.5$ m/s and $1.5$ m/s", correct: true, feedback: "$v_1 + 3v_2 = 4$ and $v_2 - v_1 = 2$ give $v_2 = 1.5$, $v_1 = -0.5$." },
        { text: "$0.5$ m/s and $1.5$ m/s", feedback: "Momentum would be $0.5 + 4.5 = 5 \\ne 4$. The light ball bounces back." },
      ],
      hint: "Two equations: momentum conservation, and $v_2 - v_1 = e(u_1 - u_2)$. Solve them together (Worked example 1).",
    },
    {
      type: "quiz",
      id: "mrg1-5-q6",
      variant: "concept",
      question: "In the centre-of-mass frame, what does a collision with coefficient of restitution $e$ do to each body's velocity?",
      options: [
        { text: "Reverses it and multiplies its size by $e$.", correct: true, feedback: "Zero total momentum before and after forces $\\pm p \\to \\mp ep$." },
        { text: "Leaves it unchanged, since the COM does not move.", feedback: "The COM does not move in this frame, but the bodies certainly do bounce." },
        { text: "Reverses it without changing its size.", feedback: "That is only the elastic case, $e = 1$." },
      ],
      hint: "In the COM frame the total momentum is zero before and after. Combine that with the definition of $e$ (separation speed $= e \\times$ approach speed).",
    },
    {
      type: "quiz",
      id: "mrg1-5-q7",
      variant: "practice",
      multiple: true,
      question: "A ball is dropped from height $h$ onto a fixed floor, with coefficient of restitution $e$ ($0 < e < 1$). Ignore air. Select all the statements that are correct.",
      options: [
        { text: "It leaves the floor after the first bounce at speed $e\\sqrt{2gh}$.", correct: true, feedback: "It arrives at $\\sqrt{2gh}$, and the floor reverses the velocity and scales it by $e$." },
        { text: "It rises to $e^2h$ after the first bounce.", correct: true, feedback: "Height goes as speed squared: $\\frac{(e\\sqrt{2gh})^2}{2g} = e^2h$." },
        { text: "Each flight between bounces lasts $e$ times as long as the previous one.", correct: true, feedback: "Flight time $= \\frac{2v}{g}$ is proportional to the rebound speed, which scales by $e$ each bounce." },
        { text: "It rises to $eh$ after the first bounce.", feedback: "$e$ scales the speed, not the height; the height scales by $e^2$." },
        { text: "The ball's momentum is conserved in each bounce.", feedback: "The floor exerts a large external impulse that reverses the ball's momentum. (Momentum of ball + Earth is conserved.)" },
      ],
      hint: "After each bounce the speed is $e$ times the arrival speed. Height scales as $v^2$ and flight time as $v$; for momentum, ask whether any external force acts on the ball during a bounce.",
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "collisions-in-two-dimensions",
  title: "1.6 · Oblique Collisions",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "In snooker you almost never hit a ball dead centre. The cue ball strikes the object ball off-centre, the object ball runs off along one line, and the cue ball peels away along another. Watch closely and you will notice something striking: the two paths leave the point of impact almost exactly at right angles. That is not a coincidence, and this lesson proves it.",
    },
    { type: "heading", text: "Conserving both momentum components" },
    {
      type: "text",
      content:
        "**Momentum is a vector.** With no external force in the plane of the table, both components of the total momentum are conserved:",
    },
    { type: "math", latex: "m_1\\vec u_1 + m_2\\vec u_2 = m_1\\vec v_1 + m_2\\vec v_2 \\quad\\Longleftrightarrow\\quad \\text{conserve } P_x \\text{ and } P_y \\text{ separately}" },
    {
      type: "text",
      content:
        "For one ball hitting another at rest, momentum says $\\vec p_1 = \\vec p_1{}' + \\vec p_2{}'$: the two outgoing momenta add, tip to tail, to the incoming one. Drag the arrows below: whatever split you choose, the two after-collision momenta must close the triangle on $\\vec p_1$.",
    },
    {
      type: "interactive",
      config: {
        component: "vec-canvas-2d",
        mode: "add",
        a: [3, 2],
        b: [2, -2],
        showParallelogram: true,
        labels: { a: "\\vec p_1'", b: "\\vec p_2'" },
        readouts: ["components", "magnitude", "sum"],
        caption:
          "The sum is the incoming momentum p₁ = (5, 0). Drag the tip of p₁′ somewhere new, then drag p₂′ until the sum is back to (5, 0): p₂′ must change to compensate.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the sum stays $(5, 0)$ only if the $y$-components of the two outgoing arrows cancel exactly. Momentum alone allows infinitely many outcomes; the energy condition picks out which ones are elastic.",
    },
    { type: "heading", text: "Equal masses move off at 90°" },
    {
      type: "text",
      content:
        "**Equal masses, one at rest, elastic.** Cancel $m$ from momentum and energy:",
    },
    {
      type: "math",
      latex: "\\vec u = \\vec v_1 + \\vec v_2 \\quad\\text{and}\\quad u^2 = v_1^2 + v_2^2",
    },
    {
      type: "text",
      content:
        "Square the first: $u^2 = v_1^2 + v_2^2 + 2\\,\\vec v_1\\cdot\\vec v_2$. Compare with the second: $\\vec v_1\\cdot\\vec v_2 = 0$. Unless one ball stops (a head-on hit), **the two balls move off at $90^\\circ$ to each other**. The velocity triangle is right-angled, with $\\vec u$ as its hypotenuse.",
    },
    { type: "heading", text: "The line of impact" },
    {
      type: "text",
      content:
        "For smooth spheres, the contact force acts only along the **line of centres** at the moment of impact (the common normal). That tells us exactly how to split the problem:",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Solving an oblique collision of smooth bodies",
      content:
        "1. Resolve every velocity along the line of impact (normal, $n$) and perpendicular to it (tangential, $t$).\n2. **Tangential:** no force acts, so each body keeps its own tangential velocity.\n3. **Normal:** apply the 1D results: conservation of momentum along $n$, and $e = \\frac{v_{2n} - v_{1n}}{u_{1n} - u_{2n}}$.\n4. Recombine the components.",
    },
    {
      type: "text",
      content:
        "The canvas splits a velocity $\\vec u$ into its part along the line of centres $\\hat n$ and its part across it. Only the first part is involved in the collision.",
    },
    {
      type: "interactive",
      config: {
        component: "vec-canvas-2d",
        mode: "dot",
        a: [3, 1],
        b: [1, 3],
        showPerpendicular: true,
        labels: { a: "\\hat n", b: "\\vec u" },
        readouts: ["angle", "projection"],
        caption:
          "a is the line of centres, b is the incoming velocity. The projection is the normal component (the part that collides); the perpendicular part rides through untouched.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: when $\\vec u$ lies along $\\hat n$ the whole velocity collides (head-on); as the angle grows, the normal part shrinks as $\\cos\\theta$, and at $90^\\circ$ the balls just graze and nothing happens.",
    },
    {
      type: "worked-example",
      id: "mrg1-6-we1",
      title: "Worked example 1: the 90° rule with numbers",
      problem:
        "A ball moving at 10 m/s strikes an identical ball at rest, elastically, and is deflected $30^\\circ$ from its original direction. Find the speeds of both balls after the collision, and the second ball's direction.",
      steps: [
        { text: "The velocity triangle is right-angled with hypotenuse 10 m/s. *Why this step:* the $90^\\circ$ rule turns the problem into trigonometry." },
        { text: "The first ball's speed: $10\\cos30^\\circ = 5\\sqrt3 \\approx 8.66$ m/s. The second ball's: $10\\sin30^\\circ = 5$ m/s, at $60^\\circ$ on the other side of the original line." },
        { text: "Check energy: $75 + 25 = 100 = 10^2$. ✓" },
      ],
      answer: "$5\\sqrt3 \\approx 8.66$ m/s and 5 m/s, the second at $60^\\circ$ on the other side of the original line.",
    },
    {
      type: "worked-example",
      id: "mrg1-6-we2",
      title: "Worked example 2: using the line of centres",
      problem:
        "Sphere A (mass $m$, 4 m/s) hits an identical sphere B at rest. At impact the line of centres makes $60^\\circ$ with A's velocity. The spheres are smooth and $e = 1$. Find the velocities of A and B after the impact.",
      steps: [
        { text: "Normal component of A: $4\\cos60^\\circ = 2$ m/s. Tangential: $4\\sin60^\\circ = 2\\sqrt3$ m/s." },
        { text: "Along the normal it is a 1D elastic collision of equal masses: they swap, so A's normal velocity becomes 0 and B's becomes 2 m/s. *Why this step:* the 1D results apply unchanged along the line of impact." },
        { text: "Tangentially nothing changes: A keeps $2\\sqrt3$ m/s, B has none." },
        { text: "B moves off at 2 m/s along the line of centres; A moves at $2\\sqrt3 \\approx 3.46$ m/s at right angles to it, consistent with the $90^\\circ$ rule." },
      ],
      answer: "B: 2 m/s along the line of centres; A: $2\\sqrt3 \\approx 3.46$ m/s at right angles to it.",
    },
    {
      type: "worked-example",
      id: "mrg1-6-we3",
      title: "Worked example 3: a ball on a smooth floor",
      problem:
        "A ball hits a smooth floor at 10 m/s, at $45^\\circ$ to the vertical, with $e = 0.5$. Find the rebound angle and the rebound speed.",
      steps: [
        { text: "The line of impact is vertical. Horizontal component $10\\sin45^\\circ = 5\\sqrt2$ m/s: unchanged (smooth floor). Vertical $5\\sqrt2$ m/s: reversed and multiplied by $e$, to $2.5\\sqrt2$ m/s." },
        { text: "Rebound angle from the vertical: $\\tan\\theta' = \\dfrac{5\\sqrt2}{2.5\\sqrt2} = 2$, so $\\theta' \\approx 63.4^\\circ$. In general $\\tan\\theta' = \\dfrac{\\tan\\theta}{e}$: the ball leaves *flatter* than it arrived." },
        { text: "Rebound speed: $\\sqrt{50 + 12.5} = \\sqrt{62.5} \\approx 7.9$ m/s, which is $u\\sqrt{\\sin^2\\theta + e^2\\cos^2\\theta}$." },
      ],
      answer: "$\\theta' \\approx 63.4^\\circ$ from the vertical ($\\tan\\theta' = 2$), at $\\approx 7.9$ m/s.",
    },
    {
      type: "worked-example",
      id: "mrg1-6-we4",
      title: "Worked example 4: sticking at right angles",
      problem:
        "A 2 kg puck moving east at 3 m/s and a 3 kg puck moving north at 2 m/s collide and stick. Find their common velocity and the kinetic energy lost.",
      steps: [
        { text: "$\\vec P = (6, 6)$ kg m/s, so $\\vec v = \\frac{1}{5}(6, 6) = (1.2, 1.2)$ m/s: speed $1.2\\sqrt2 \\approx 1.70$ m/s, at $45^\\circ$ north of east." },
        { text: "Energy: 15 J before, $\\frac12(5)(2.88) = 7.2$ J after, so 7.8 J is lost. *Why this step:* a perfectly inelastic collision in 2D loses energy just as in 1D." },
      ],
      answer: "$1.2\\sqrt2 \\approx 1.70$ m/s at $45^\\circ$ north of east; 7.8 J lost.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"$e$ applies to the whole velocity\"",
      content:
        "The coefficient of restitution acts only along the **line of impact**. For smooth bodies the tangential components pass through unchanged. Multiplying the whole velocity by $e$ in Worked example 3 would keep the angle at $45^\\circ$, but the ball actually rebounds at $63.4^\\circ$ from the vertical.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "mrg1-6-q1",
      variant: "concept",
      question: "A snooker ball strikes an identical stationary ball off-centre, elastically. What is the angle between their paths afterwards?",
      options: [
        { text: "$90^\\circ$", correct: true, feedback: "$\\vec u = \\vec v_1 + \\vec v_2$ and $u^2 = v_1^2 + v_2^2$ force $\\vec v_1\\cdot\\vec v_2 = 0$." },
        { text: "$180^\\circ$", feedback: "Opposite directions would need the struck ball to move backwards, which violates momentum along the original line." },
        { text: "It depends on how off-centre the hit is.", feedback: "The split between the two speeds depends on that, but the angle between them is always $90^\\circ$ (unless the hit is head-on)." },
      ],
      hint: "Equal masses, one at rest, elastic: square the momentum equation and compare it with the energy equation. What must the dot product of the final velocities be?",
    },
    {
      type: "quiz",
      id: "mrg1-6-q2",
      variant: "practice",
      question: "A ball hits a smooth floor at $30^\\circ$ to the vertical with $e = \\frac13$. At what angle to the vertical does it rebound?",
      options: [
        { text: "$30^\\circ$", feedback: "That is the elastic answer. With $e < 1$ the vertical component shrinks and the path flattens." },
        { text: "$10^\\circ$", feedback: "That scales the angle, which is not how components work. The vertical component shrinks, making the angle from the vertical *larger*." },
        { text: "$60^\\circ$", correct: true, feedback: "$\\tan\\theta' = \\frac{\\tan30^\\circ}{1/3} = \\frac{3}{\\sqrt3} = \\sqrt3$." },
        { text: "$\\tan^{-1}\\left(\\frac{1}{3\\sqrt3}\\right) \\approx 11^\\circ$", feedback: "You multiplied $\\tan\\theta$ by $e$. The vertical component is divided out: $\\tan\\theta' = \\frac{\\tan\\theta}{e}$." },
      ],
      hint: "The smooth floor leaves the horizontal component unchanged; restitution scales only the vertical component by $e$. Then find the angle from $\\tan\\theta = v_x/v_y$ (Worked example 3).",
    },
    {
      type: "numeric",
      id: "mrg1-6-q3",
      variant: "practice",
      question: "A 1 kg ball moving east at 4 m/s collides with a 1 kg ball moving north at 4 m/s, and they stick. What is their speed afterwards? Give your answer in m/s, to two decimal places.",
      answer: 2.828,
      relTolerance: 0.01,
      unit: "m/s",
      hint: "Add the momenta as vectors, then divide by the total mass.",
      solution: "$\\vec P = (4, 4)$ kg m/s, so $\\vec v = \\dfrac{\\vec P}{2} = (2, 2)$ m/s, of size $2\\sqrt2 \\approx 2.83$ m/s, towards the north-east.",
      commonMistakes: [
        { answer: 4, feedback: "That adds the speeds as if they were parallel, then halves. Momentum adds as vectors." },
        { answer: 5.66, tolerance: 0.03, feedback: "That is $|\\vec P|$ in kg m/s. Divide by the total mass, 2 kg." },
        { answer: 0, tolerance: 0.01, feedback: "The momenta are perpendicular, so they cannot cancel." },
      ],
    },
    {
      type: "quiz",
      id: "mrg1-6-q4",
      variant: "concept",
      question: "Two smooth spheres collide obliquely. Which velocity components does the coefficient of restitution govern?",
      options: [
        { text: "Only the components along the line of centres.", correct: true, feedback: "The contact force acts along the line of centres; perpendicular components are untouched." },
        { text: "The whole velocity of each sphere.", feedback: "The tangential components are unchanged for smooth spheres, whatever $e$ is." },
        { text: "Only the components perpendicular to the line of centres.", feedback: "That is the direction with no force at all, where nothing changes." },
      ],
      hint: "Draw the two smooth spheres touching at impact. In which direction can the contact force act, and which velocity components can it change?",
    },
    {
      type: "numeric",
      id: "mrg1-6-q5",
      variant: "practice",
      question: "Smooth sphere A moving at 6 m/s strikes an identical sphere B at rest. At impact the line of centres makes $30^\\circ$ with A's velocity, and $e = 1$. How fast does B move off? Give your answer in m/s, to two decimal places.",
      answer: 5.196,
      relTolerance: 0.01,
      unit: "m/s",
      hint: "Split A's velocity along and across the line of centres. Which part does B receive?",
      solution: "Along the line of centres A has $6\\cos30^\\circ = 3\\sqrt3$ m/s. For equal masses with $e = 1$ the normal components swap, so B moves off along the line of centres at $3\\sqrt3 \\approx 5.20$ m/s. A keeps only its tangential $6\\sin30^\\circ = 3$ m/s.",
      commonMistakes: [
        { answer: 3, feedback: "That is A's tangential component, $6\\sin30^\\circ$, which A keeps." },
        { answer: 6, feedback: "B only receives the normal component of A's velocity, not all of it." },
        { answer: 2.6, feedback: "Equal masses in an elastic collision *swap* normal velocities; nothing is halved." },
      ],
    },
    {
      type: "quiz",
      id: "mrg1-6-q6",
      variant: "practice",
      multiple: true,
      question: "A smooth sphere A strikes an identical smooth sphere B, at rest, off-centre and elastically ($e = 1$). Select all the statements that are correct.",
      options: [
        { text: "B moves off along the line of centres at impact.", correct: true, feedback: "The only force on B is the contact force, which for smooth spheres acts along the line of centres." },
        { text: "A's velocity component perpendicular to the line of centres is unchanged.", correct: true, feedback: "No force acts in that direction on smooth spheres." },
        { text: "After the collision the two spheres move at $90^\\circ$ to each other.", correct: true, feedback: "Equal masses, elastic, target at rest: $\\vec v_1\\cdot\\vec v_2 = 0$ (for any off-centre hit)." },
        { text: "A stops dead, handing all its velocity to B.", feedback: "That happens only in a head-on hit. Off-centre, A keeps its tangential component." },
        { text: "B moves off along A's original direction of motion.", feedback: "B moves along the line of centres, which differs from A's direction unless the hit is head-on." },
      ],
      hint: "Resolve along and perpendicular to the line of centres. Ask which components the contact impulse between smooth spheres can change, then treat those as a 1D elastic collision of equal masses.",
    },
  ]),
};

const lesson07: LessonSeed = {
  slug: "collision-problem-toolkit",
  title: "1.7 · Collision Problems: The JEE Toolkit",
  position: 7,
  blocks: blocks([
    {
      type: "text",
      content:
        "Most hard collision problems are two problems glued together: a sudden collision, then a slower motion (a swing, a climb, a spring compressing). The skill is to split the story at the right moments and use the right law in each piece. Take $g = 10$ m/s² throughout.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "The strategy",
      content:
        "**Momentum across the collision, energy before and after it, never energy across it** (unless you know the collision is elastic).\nDuring the brief impact, impulsive internal forces dominate, so momentum is conserved (along any direction free of impulsive external forces) while kinetic energy may be lost. Before and after, forces are ordinary ones like gravity, springs and string tension, so mechanical energy is conserved if nothing dissipates.",
    },
    { type: "heading", text: "The ballistic pendulum" },
    {
      type: "text",
      content:
        "A bullet of mass $m$ at speed $v$ lodges in a block of mass $M$ hanging on strings, and the block swings up through height $h$.\n\nStage 1 (collision, perfectly inelastic): $mv = (m + M)V$.\nStage 2 (swing, energy conserved): $\\frac12(m + M)V^2 = (m + M)gh$, so $V = \\sqrt{2gh}$. Combining:",
    },
    { type: "math", latex: "v = \\frac{m + M}{m}\\sqrt{2gh}" },
    {
      type: "interactive",
      config: {
        component: "function-machine",
        expr: "(0.01 + 2)/0.01*sqrt(20*x)",
        exprLatex: "v = \\frac{m+M}{m}\\sqrt{2gh}",
        min: 0.01,
        max: 0.5,
        step: 0.01,
        initial: 0.05,
        inputLabel: "Rise h",
        inputUnit: "m",
        outputLabel: "Bullet speed (m/s)",
      },
    },
    {
      type: "text",
      content:
        "The machine is set for a 10 g bullet and a 2 kg block. What you should have seen: a rise of only 5 cm means a bullet speed of about 201 m/s. The speed grows as $\\sqrt h$, so quadrupling the rise only doubles the speed. The device turns a speed too fast to time into a height you can measure with a ruler.",
    },
    {
      type: "worked-example",
      id: "mrg1-7-we1",
      title: "Worked example 1: ballistic pendulum, and where the energy went",
      problem:
        "A 10 g bullet lodges in a 2 kg block, which rises 5 cm. Find the bullet's speed and how much of its kinetic energy survives the impact.",
      steps: [
        { text: "After the collision: $V = \\sqrt{2 \\times 10 \\times 0.05} = 1$ m/s. *Why this step:* work backwards from the stage you can see (the swing) to the one you cannot (the impact)." },
        { text: "Before: $v = \\frac{2.01}{0.01} \\times 1 = 201$ m/s." },
        { text: "Bullet's kinetic energy: $\\frac12(0.01)(201)^2 \\approx 202$ J. Block + bullet after: $\\frac12(2.01)(1)^2 \\approx 1.0$ J. More than 99% became heat and deformation. Only the fraction $\\frac{m}{m + M}$ survives a perfectly inelastic hit on a body at rest." },
      ],
      answer: "201 m/s; only about 1.0 J of its 202 J survives as kinetic energy.",
      tryFirst: false,
    },
    {
      type: "worked-example",
      id: "mrg1-7-we2",
      title: "Worked example 2: a bullet passing through",
      problem:
        "A 20 g bullet at 400 m/s passes through a 1 kg block at rest on a smooth table and emerges at 100 m/s. Find the block's speed and the energy lost inside the block.",
      steps: [
        { text: "Momentum: $0.02(400) = 0.02(100) + 1\\cdot V$, so $V = 6$ m/s." },
        { text: "Energy lost inside the block: $\\frac12(0.02)(400^2 - 100^2) - \\frac12(1)(6^2) = 1500 - 18 = 1482$ J." },
      ],
      answer: "$V = 6$ m/s; 1482 J lost in the block.",
    },
    { type: "heading", text: "Block–spring–block" },
    {
      type: "text",
      content:
        "A block $m_1$ at speed $u$ runs into a light spring attached to a block $m_2$ at rest, on a smooth floor. The spring compresses until the blocks move with a common velocity (just like maximum compression in 1.4); then it pushes them apart. At maximum compression all the relative-motion kinetic energy is stored in the spring:",
    },
    { type: "math", latex: "\\tfrac12 kx_{\\max}^2 = \\tfrac12\\mu u^2, \\qquad \\mu = \\frac{m_1m_2}{m_1 + m_2}" },
    {
      type: "text",
      content:
        "The lab shows this in the COM frame. The bumper is the spring; with $e = 0$ it never springs back (a latch catches it), and the dip in kinetic energy is exactly the energy stored at maximum compression. Raise $e$ to 1 to let the spring return it all.",
    },
    {
      type: "interactive",
      config: {
        component: "mrg-collision-lab",
        mode: "collision",
        e: { min: 0, max: 1, step: 0.05, initial: 0 },
        graph: "energy",
        frame: "com",
        caption:
          "In the COM frame both carts stop together at maximum compression, and all of the kinetic energy you can see has gone into the spring. That amount is ½μu².",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: in the COM frame the total kinetic energy falls all the way to zero at maximum compression, because both carts are at rest in that frame. Switch to the ground frame and it falls only to $\\frac12Mv_{cm}^2$. The difference between start and minimum, $\\frac12\\mu u^2$, is the same in both frames.",
    },
    {
      type: "worked-example",
      id: "mrg1-7-we3",
      title: "Worked example 3: maximum compression",
      problem:
        "A 2 kg block at 3 m/s hits a spring ($k = 600$ N/m) fixed to a 1 kg block at rest. Find the maximum compression of the spring, and the velocities once the spring has relaxed again.",
      steps: [
        { text: "$\\mu = \\frac{2 \\times 1}{3} = \\frac23$ kg, so $\\frac12\\mu u^2 = \\frac12 \\cdot \\frac23 \\cdot 9 = 3$ J. *Why this step:* using the whole $\\frac12m_1u^2 = 9$ J would forget that the blocks are still moving at maximum compression." },
        { text: "$\\frac12(600)x^2 = 3 \\Rightarrow x^2 = 0.01 \\Rightarrow x = 0.1$ m." },
        { text: "When the spring has fully relaxed, the collision has been elastic: $v_1 = \\frac13 \\times 3 = 1$ m/s and $v_2 = \\frac43 \\times 3 = 4$ m/s." },
      ],
      answer: "$x = 0.1$ m; afterwards $v_1 = 1$ m/s and $v_2 = 4$ m/s.",
    },
    {
      type: "worked-example",
      id: "mrg1-7-we4",
      title: "Worked example 4: sliding onto a smooth wedge",
      problem:
        "A 1 kg block slides at 5 m/s onto the curved face of a smooth 4 kg wedge resting on a smooth floor. How high does it climb?",
      steps: [
        { text: "Horizontally no external force acts, so horizontal momentum is conserved. At the highest point the block is momentarily at rest *relative to the wedge*, so both move horizontally at $v = \\frac{1 \\times 5}{5} = 1$ m/s. *Why this step:* the vertical direction is not free (the floor pushes), so only $P_x$ is used." },
        { text: "No friction, so mechanical energy is conserved: $\\frac12(1)(25) = \\frac12(5)(1)^2 + (1)(10)h$, so $12.5 = 2.5 + 10h$ and $h = 1$ m." },
        { text: "In general $h = \\dfrac{M u^2}{2g(m + M)}$, less than the $\\frac{u^2}{2g} = 1.25$ m it would reach on a fixed ramp." },
      ],
      answer: "$h = 1$ m.",
    },
    {
      type: "worked-example",
      id: "mrg1-7-we5",
      title: "Worked example 5: hitting a hanging bob",
      problem:
        "A 50 g bullet lodges in a 950 g bob hanging from a 1 m string. What bullet speed lets the bob just complete a vertical circle?",
      steps: [
        { text: "A mass on a string completes the circle only if its speed at the bottom is at least $\\sqrt{5gL} = \\sqrt{50}$ m/s (Mechanics I: the tension must not go slack at the top)." },
        { text: "Collision: $0.05v = 1.0 \\times \\sqrt{50}$, so $v = 20\\sqrt{50} = 100\\sqrt2 \\approx 141$ m/s." },
      ],
      answer: "$v = 100\\sqrt2 \\approx 141$ m/s.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"use energy conservation through the whole ballistic pendulum\"",
      content:
        "Writing $\\frac12mv^2 = (m + M)gh$ gives, in Worked example 1, $v = \\sqrt{2(2.01)(10)(0.05)/0.01} \\approx 14$ m/s instead of 201 m/s. The collision is perfectly inelastic and destroys over 99% of the energy. Use momentum across the impact and energy only for the swing.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "mrg1-7-q1",
      variant: "practice",
      question: "A 20 g bullet lodges in a 1.98 kg block hanging on long strings, and the block rises 20 cm. What was the bullet's speed? Take $g = 10$ m/s² and give your answer in m/s.",
      answer: 200,
      unit: "m/s",
      hint: "Work backwards: energy for the swing gives the speed just after impact; momentum across the impact gives the bullet's speed.",
      solution: "Swing: $V = \\sqrt{2gh} = \\sqrt{2 \\times 10 \\times 0.2} = 2$ m/s. Impact (momentum): $0.02\\,v = 2 \\times 2$, so $v = \\dfrac{2}{0.02} \\times 2 = 200$ m/s.",
      commonMistakes: [
        { answer: 20, feedback: "That comes from $\\frac12mv^2 = (m + M)gh$, energy through the collision. Most of the energy is lost in the impact." },
        { answer: 2, feedback: "That is the block's speed just after the impact." },
        { answer: 100, feedback: "Recompute $\\sqrt{2gh} = \\sqrt{4} = 2$ m/s, then multiply by $\\frac{m + M}{m} = 100$." },
      ],
    },
    {
      type: "quiz",
      id: "mrg1-7-q2",
      variant: "concept",
      multiple: true,
      question: "A bullet embeds itself in a block hanging on strings (a ballistic pendulum), and the block then swings up. Select all the statements that are correct.",
      options: [
        { text: "Horizontal momentum is conserved across the impact.", correct: true, feedback: "The impact is brief; the strings are vertical then, so no impulsive horizontal external force acts." },
        { text: "Mechanical energy is conserved during the swing after the impact.", correct: true, feedback: "Only gravity does work during the swing; the string tension is perpendicular to the motion." },
        { text: "Mechanical energy is conserved across the impact.", feedback: "The bullet sticks: a perfectly inelastic collision, in which most of the kinetic energy turns into heat and deformation." },
        { text: "Momentum is conserved during the swing.", feedback: "Gravity and the tension are external forces acting over the whole swing, and they slow the block down." },
        { text: "The fraction of the bullet's KE lost in the impact is $\\frac{M}{m + M}$.", correct: true, feedback: "KE after $= \\frac{(mv)^2}{2(m + M)}$, which is $\\frac{m}{m + M}$ of $\\tfrac12mv^2$; so $\\frac{M}{m + M}$ is lost." },
      ],
      hint: "Split the event into stages: the short impact, then the swing. For each stage ask which external forces act and whether any energy turns into heat.",
    },
    {
      type: "quiz",
      id: "mrg1-7-q3",
      variant: "practice",
      question: "A 1 kg block at 4 m/s strikes a light spring ($k = 200$ N/m) attached to an identical block at rest on a smooth floor. What is the maximum compression?",
      options: [
        { text: "$\\sqrt{0.08} \\approx 0.28$ m", feedback: "That stores all 8 J of kinetic energy in the spring. At maximum compression the blocks are still moving together." },
        { text: "0.1 m", feedback: "Check: $\\frac12(200)(0.1)^2 = 1$ J, but 4 J must be stored." },
        { text: "0.4 m", feedback: "Check: $\\frac12(200)(0.4)^2 = 16$ J, more than the blocks had." },
        { text: "0.2 m", correct: true, feedback: "$\\mu = 0.5$ kg, $\\frac12\\mu u^2 = 4$ J $= \\frac12(200)x^2$, so $x = 0.2$ m." },
      ],
      hint: "At maximum compression the blocks share a common velocity. Momentum gives that velocity; the KE lost to the spring is $\\tfrac12\\mu u^2$ (Worked example 3).",
    },
    {
      type: "numeric",
      id: "mrg1-7-q4",
      variant: "practice",
      question: "A 2 kg block slides at 5 m/s onto the smooth curved face of a 3 kg wedge free to move on a smooth floor. How high does the block rise? Take $g = 10$ m/s² and give your answer in metres.",
      answer: 0.75,
      tolerance: 0.005,
      unit: "m",
      hint: "At the highest point the block and wedge share one horizontal velocity. Horizontal momentum and mechanical energy are both conserved.",
      solution: "At the top the block moves with the wedge: $2 \\times 5 = 5V$, so $V = 2$ m/s. Energy: $\\tfrac12(2)(25) = \\tfrac12(5)(2)^2 + 2(10)h$, so $25 = 10 + 20h$ and $h = \\dfrac{15}{20} = 0.75$ m.",
      commonMistakes: [
        { answer: 1.25, feedback: "That is $\\frac{u^2}{2g}$, which assumes the wedge is fixed. A free wedge takes some of the energy." },
        { answer: 0.5, feedback: "That uses the 10 J the pair keeps as the energy for height. The energy turned into $mgh$ is $25 - 10 = 15$ J." },
        { answer: 0.3, feedback: "You may have used the total mass in $mgh$. Only the block rises." },
      ],
    },
    {
      type: "quiz",
      id: "mrg1-7-q5",
      variant: "practice",
      question: "A 10 g bullet at 500 m/s passes through a 2 kg block at rest on a smooth table and emerges at 300 m/s. How fast does the block move?",
      options: [
        { text: "2 m/s", feedback: "That is the bullet's momentum loss, 2 kg m/s. Divide by the block's mass, 2 kg." },
        { text: "1 m/s", correct: true, feedback: "$0.01(500 - 300) = 2V$, so $V = 1$ m/s." },
        { text: "2.5 m/s", feedback: "That uses the bullet's whole initial momentum, $0.01 \\times 500$, as if it had stopped. It kept 300 m/s." },
        { text: "It cannot be found without the energy lost.", feedback: "Momentum alone fixes it: the block's momentum is the bullet's loss." },
      ],
      hint: "The table is smooth, so momentum is conserved across the bullet passing through. Energy is not conserved here, and you don't need it.",
    },
    {
      type: "quiz",
      id: "mrg1-7-q6",
      variant: "practice",
      question: "A 20 g bullet lodges in a 980 g bob hanging on a 0.4 m string. What is the least bullet speed for the bob to complete a vertical circle?",
      options: [
        { text: "$\\sqrt{20}$ m/s $\\approx 4.5$ m/s", feedback: "That is the bob's speed needed just after the impact, not the bullet's." },
        { text: "200 m/s", feedback: "That uses $\\sqrt{4gL} = 4$ m/s, the condition for a rigid rod. A string needs $\\sqrt{5gL}$." },
        { text: "$100\\sqrt5$ m/s $\\approx 224$ m/s", correct: true, feedback: "Needed bob speed $\\sqrt{5gL} = \\sqrt{20}$; $v = \\frac{1}{0.02}\\sqrt{20} = 50 \\times 2\\sqrt5$." },
        { text: "$100\\sqrt2$ m/s $\\approx 141$ m/s", feedback: "That uses $\\sqrt{2gL}$, which only lifts the bob to the height of the pivot." },
      ],
      hint: "Two stages: the bob must have $\\sqrt{5gL}$ at the bottom to loop, and the embedding collision conserves momentum (not energy). Work backwards from the loop condition.",
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-1-mastery",
  title: "1.8 · Chapter 1 Mastery",
  position: 8,
  blocks: blocks([
    {
      type: "callout",
      variant: "info",
      title: "The chapter in seven lines",
      content:
        "1. $\\frac{d\\vec P}{dt} = \\vec F_{\\text{ext}}$; with no external force (or none along a direction), $\\vec P$ (or that component) is conserved.\n2. Impulse $\\vec J = \\int\\vec F\\,dt = \\Delta\\vec p$, the area under $F$–$t$; average force $= J/\\Delta t$.\n3. Variable mass: $F_{\\text{ext}} = m\\frac{dv}{dt} - u_{\\text{rel}}\\frac{dm}{dt}$; rocket thrust $u\\left|\\frac{dm}{dt}\\right|$ and $v = u\\ln\\frac{m_0}{m}$.\n4. $K = \\frac12Mv_{cm}^2 + \\frac12\\mu u_{\\text{rel}}^2$; collisions can only take from the second term.\n5. $e = \\frac{\\text{separation speed}}{\\text{approach speed}}$ along the line of impact; loss $= \\frac12\\mu(1 - e^2)u_{\\text{rel}}^2$.\n6. Oblique: tangential components unchanged (smooth), 1D rules along the normal; equal masses, elastic, one at rest ⇒ $90^\\circ$.\n7. Multi-stage problems: momentum across the collision, energy before and after it.",
    },
    {
      type: "text",
      content:
        "No formula sheet. Take $g = 10$ m/s² wherever gravity appears. The last four questions are JEE-Advanced flavoured: each chains a collision to another stage.",
    },
    {
      type: "numeric",
      id: "mrg1-8-q1",
      variant: "mastery",
      question: "A machine gun fires 12 bullets per second, each of mass 10 g, at 500 m/s. What average force must the gunner apply to hold it still? Give your answer in newtons.",
      answer: 60,
      unit: "N",
      hint: "Force as the rate of change of momentum (lesson 1.2).",
      solution: "Each second the gun gives 12 bullets momentum $0.01 \\times 500 = 5$ kg m/s each: $60$ kg m/s per second. The bullets push back equally, so the gunner must supply an average $60$ N.",
      commonMistakes: [
        { answer: 5, feedback: "That is the momentum of one bullet. Twelve leave each second." },
        { answer: 60000, feedback: "Convert 10 g to 0.01 kg: $12 \\times 0.01 \\times 500 = 60$ N." },
        { answer: 15000, feedback: "That is the kinetic energy delivered per second (in watts), not the force." },
      ],
    },
    {
      type: "quiz",
      id: "mrg1-8-q2",
      variant: "mastery",
      question: "A 5 kg block moves at 2 m/s on a smooth floor. A force along its motion is 10 N for 2 s, then decreases linearly to zero over the next 2 s. What is the final speed?",
      options: [
        { text: "6 m/s", feedback: "That is the change in speed. Add the initial 2 m/s." },
        { text: "10 m/s", feedback: "That treats the whole 4 s as a 10 N rectangle. The second part is a triangle, with half the area." },
        { text: "4 m/s", feedback: "That is only the rectangle's contribution, $\\frac{20}{5}$ m/s. Add the triangle's 10 N s and the initial 2 m/s." },
        { text: "8 m/s", correct: true, feedback: "Impulse $= 10 \\times 2 + \\frac12 \\times 2 \\times 10 = 30$ N s, so $\\Delta v = 6$ m/s and $v = 8$ m/s." },
      ],
      hint: "Lesson 1.2: impulse is the area under the $F$-$t$ graph, and equals $\\Delta p$.",
    },
    {
      type: "numeric",
      id: "mrg1-8-q3",
      variant: "mastery",
      question: "A 0.2 kg ball is dropped from 5 m and rebounds to 1.25 m. The contact with the floor lasts 0.1 s. What is the average force exerted *by the floor* during contact? Take $g = 10$ m/s² and give your answer in newtons.",
      answer: 32,
      unit: "N",
      hint: "Find the speeds from the heights, then remember the floor pushes against gravity too.",
      solution: "Impact speed $\\sqrt{2 \\times 10 \\times 5} = 10$ m/s down; rebound $\\sqrt{2 \\times 10 \\times 1.25} = 5$ m/s up. Momentum change $= 0.2 \\times (5 + 10) = 3$ N s up, so the average **net** force is $\\frac{3}{0.1} = 30$ N up. Net force $= N - mg$, so $N = 30 + 2 = 32$ N.",
      commonMistakes: [
        { answer: 30, feedback: "That is the average *net* force. The floor's push must exceed it by the weight, 2 N." },
        { answer: 10, feedback: "That uses $\\Delta v = 10 - 5$. The velocity reverses, so $\\Delta v = 15$ m/s." },
        { answer: 3, feedback: "3 N s is the impulse. Divide by the contact time 0.1 s." },
        { answer: 28, feedback: "You subtracted the weight. The floor must supply the net 30 N **and** cancel the 2 N weight: $N = 30 + 2$." },
      ],
    },
    {
      type: "quiz",
      id: "mrg1-8-q4",
      variant: "mastery",
      question: "Grain falls onto a conveyor belt at 5 kg/s. What power must the motor supply to keep the belt at 2 m/s?",
      options: [
        { text: "10 W", feedback: "That is the rate at which the grain gains kinetic energy. The other 10 W is lost as heat." },
        { text: "20 W", correct: true, feedback: "$F = v\\frac{dm}{dt} = 10$ N, and $P = Fv = 20$ W." },
        { text: "10 N", feedback: "That is the force, not the power." },
        { text: "5 W", feedback: "Power is $v^2\\frac{dm}{dt} = 4 \\times 5$." },
      ],
      hint: "The conveyor belt (lesson 1.3).",
    },
    {
      type: "numeric",
      id: "mrg1-8-q5",
      variant: "mastery",
      question: "A 3000 kg rocket has an exhaust speed of 1500 m/s. At what rate must it burn fuel just to hover? Take $g = 10$ m/s² and give your answer in kg/s.",
      answer: 20,
      unit: "kg/s",
      hint: "Rocket thrust (lesson 1.3).",
      solution: "Hovering needs thrust = weight: $1500\\left|\\dfrac{dm}{dt}\\right| = 3000 \\times 10 = 30\\,000$ N, so $\\left|\\dfrac{dm}{dt}\\right| = 20$ kg/s.",
      commonMistakes: [
        { answer: 2, feedback: "Weight is $mg = 30\\,000$ N, not 3000 N." },
        { answer: 40, feedback: "That would accelerate it upwards at $g$. Hovering only needs thrust equal to the weight." },
        { answer: 0.5, feedback: "That is $\\frac{1500}{3000}$, exhaust speed over mass. Thrust must equal weight: $|dm/dt| = \\frac{30\\,000}{1500} = 20$ kg/s." },
      ],
    },
    {
      type: "quiz",
      id: "mrg1-8-q6",
      variant: "mastery",
      question: "A ball of mass $m$ hits a ball of mass $3m$ at rest, head-on and elastically. What fraction of its kinetic energy does it transfer?",
      options: [
        { text: "$\\dfrac34$", correct: true, feedback: "$\\frac{4m_1m_2}{(m_1 + m_2)^2} = \\frac{12m^2}{16m^2}$." },
        { text: "$\\dfrac14$", feedback: "That is the fraction *kept* by the first ball, which bounces back at $\\frac u2$." },
        { text: "1", feedback: "Complete transfer needs equal masses." },
        { text: "$\\dfrac12$", feedback: "That is the ratio of speeds, $\\frac{v_2}{u}$. Energy carries the mass too: $\\frac{3m(u/2)^2}{mu^2} = \\frac34$." },
      ],
      hint: "Lesson 1.4: the elastic-collision formulas with the target at rest give the target's speed; compare kinetic energies.",
    },
    {
      type: "numeric",
      id: "mrg1-8-q7",
      variant: "mastery",
      question: "A 2 kg ball at 5 m/s hits a 3 kg ball at rest head-on, with $e = 0.6$. How much kinetic energy is lost? Give your answer in joules.",
      answer: 9.6,
      tolerance: 0.05,
      unit: "J",
      hint: "Kinetic energy lost in a collision (lesson 1.5).",
      solution: "$\\mu = \\dfrac{2 \\times 3}{5} = 1.2$ kg and $u_{\\text{rel}} = 5$ m/s. Loss $= \\tfrac12\\mu(1 - e^2)u_{\\text{rel}}^2 = \\tfrac12(1.2)(0.64)(25) = 9.6$ J.\n\nCheck: $v_1 + 1.5v_2 = 5$ and $v_2 - v_1 = 3$ give $v_2 = 3.2$, $v_1 = 0.2$ m/s. KE after $= 0.04 + 15.36 = 15.4$ J, from 25 J: loss 9.6 J.",
      commonMistakes: [
        { answer: 15, feedback: "That is the perfectly inelastic loss, $\\frac12\\mu u^2$. With $e = 0.6$ some is returned." },
        { answer: 6, feedback: "That uses $(1 - e)$ instead of $(1 - e^2)$." },
        { answer: 25, feedback: "That is all of the initial kinetic energy. The COM's share, $\\frac12(5)(2)^2 = 10$ J, can never be lost." },
      ],
    },
    {
      type: "quiz",
      id: "mrg1-8-q8",
      variant: "mastery",
      question: "A ball dropped from 5 m bounces repeatedly on a floor with $e = 0.5$. How long does it take to come to rest?",
      options: [
        { text: "2 s", feedback: "That is $\\frac{t_0}{1 - e}$, counting each later trip only once. Each bounce is an up *and* a down." },
        { text: "1 s", feedback: "That is only the first fall." },
        { text: "3 s", correct: true, feedback: "$t_0 = \\sqrt{2h/g} = 1$ s, and $t_0\\frac{1 + e}{1 - e} = 3$ s." },
        { text: "It never stops.", feedback: "Infinitely many bounces, but their times form a convergent geometric series." },
      ],
      hint: "A ball bouncing on a floor (lesson 1.5).",
    },
    {
      type: "quiz",
      id: "mrg1-8-q9",
      variant: "mastery",
      question: "A ball strikes a smooth floor at $30^\\circ$ to the vertical. The coefficient of restitution is $\\frac{1}{\\sqrt3}$. At what angle to the vertical does it rebound?",
      options: [
        { text: "$30^\\circ$", feedback: "Only if $e = 1$. A smaller vertical component makes the rebound flatter." },
        { text: "$60^\\circ$", feedback: "That would need $e = \\frac13$. Here $\\tan\\theta' = \\sqrt3\\tan30^\\circ = 1$." },
        { text: "$\\tan^{-1}\\frac13 \\approx 18^\\circ$", feedback: "You multiplied by $e$ instead of dividing." },
        { text: "$45^\\circ$", correct: true, feedback: "$\\tan\\theta' = \\frac{\\tan30^\\circ}{e} = \\frac{1/\\sqrt3}{1/\\sqrt3} = 1$." },
      ],
      hint: "A ball hitting a smooth floor (lesson 1.6).",
    },
    {
      type: "quiz",
      id: "mrg1-8-q10",
      variant: "mastery",
      question: "A 10 g bullet lodges in a 0.99 kg bob hanging from a 0.8 m string, and the bob swings up until the string is just horizontal. What is the string's tension just after the impact?",
      options: [
        { text: "30 N", correct: true, feedback: "Swing to horizontal: $V = \\sqrt{2gL} = 4$ m/s. Then $T - (m + M)g = (m + M)\\frac{V^2}{L}$ gives $T = 10 + 20 = 30$ N." },
        { text: "10 N", feedback: "That is just the weight. The bob is moving in a circle, so the tension must also supply $\\frac{(m + M)V^2}{L}$." },
        { text: "20 N", feedback: "That is the centripetal part only. The tension must also support the weight at the bottom." },
        { text: "50 N", feedback: "That uses $V^2 = 2g \\times 2L$, the speed to reach the top. The bob only reaches the horizontal." },
      ],
      hint: "Energy after the impact gives the bob's speed; Newton's second law at the bottom of a circle gives the tension.",
    },
    {
      type: "quiz",
      id: "mrg1-8-q11",
      variant: "mastery",
      question: "A 3 kg block at 4 m/s strikes a light spring ($k = 1200$ N/m) attached to a 1 kg block at rest on a smooth floor. What is the maximum compression of the spring?",
      options: [
        { text: "20 cm", feedback: "That stores the full 24 J of the moving block. At maximum compression both blocks still move at $v_{cm} = 3$ m/s." },
        { text: "10 cm", correct: true, feedback: "$\\mu = \\frac34$ kg, stored energy $\\frac12 \\cdot \\frac34 \\cdot 16 = 6$ J $= \\frac12(1200)x^2$, so $x = 0.1$ m." },
        { text: "5 cm", feedback: "Check: $\\frac12(1200)(0.05)^2 = 1.5$ J, not 6 J." },
        { text: "$\\sqrt{0.02}$ m $\\approx 14$ cm", feedback: "That stores 12 J, half of the initial energy. The stored share is $\\frac{\\mu}{m_1} = \\frac14$ of it." },
      ],
      hint: "Block–spring–block collisions (lesson 1.7).",
    },
    {
      type: "quiz",
      id: "mrg1-8-q12",
      variant: "mastery",
      question: "A ball of mass $m$ moving horizontally at speed $u$ hits an identical bob hanging at rest on a 0.5 m string, head-on and elastically. What is the least $u$ for the bob to complete a vertical circle?",
      options: [
        { text: "10 m/s", feedback: "That would be needed if the ball *stuck* to the bob (the pair would start at $\\frac u2$). An elastic hit hands over the full $u$." },
        { text: "$\\sqrt{20}$ m/s $\\approx 4.5$ m/s", feedback: "$\\sqrt{4gL}$ is enough for a rigid rod. A string goes slack at the top unless the speed at the bottom reaches $\\sqrt{5gL}$." },
        { text: "5 m/s", correct: true, feedback: "Equal masses swap velocities, so the bob starts at $u$, which must be at least $\\sqrt{5gL} = \\sqrt{25} = 5$ m/s." },
        { text: "$\\sqrt{10}$ m/s $\\approx 3.2$ m/s", feedback: "$\\sqrt{2gL}$ only lifts the bob level with the pivot." },
      ],
      hint: "Elastic collision of equal masses, then the condition for looping (lesson 1.7).",
    },
    {
      type: "quiz",
      id: "mrg1-8-q13",
      variant: "mastery",
      multiple: true,
      question: "JEE Advanced. Two bodies on a smooth line collide head-on with coefficient of restitution $e$, where $0 < e < 1$. Select all the statements that are correct.",
      options: [
        { text: "The total momentum is the same before and after.", correct: true, feedback: "The contact forces are internal and no external horizontal force acts." },
        { text: "The kinetic energy of the COM's motion, $\\tfrac12 Mv_{cm}^2$, is unchanged.", correct: true, feedback: "$v_{cm}$ is fixed by the conserved momentum, so this share of the energy cannot be lost." },
        { text: "The kinetic energy measured in the COM frame is multiplied by $e^2$.", correct: true, feedback: "In the COM frame each velocity reverses and scales by $e$, so each KE scales by $e^2$." },
        { text: "The speed of separation equals the speed of approach.", feedback: "That is the elastic case. Here separation $= e \\times$ approach, which is smaller." },
        { text: "The kinetic energy lost is $\\tfrac12\\mu(1 - e)u_{\\text{rel}}^2$.", feedback: "The relative speed scales by $e$, so the relative-motion energy scales by $e^2$: the loss is $\\tfrac12\\mu(1 - e^2)u_{\\text{rel}}^2$." },
      ],
      hint: "Lesson 1.5: split the KE into the COM part and the COM-frame part, and ask what the collision does to each.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "So far every body has been a particle or has moved without turning. Chapter 2 lets bodies spin: one angle describes a rigid rotation, and the rotational version of mass, the moment of inertia, turns out to depend on where the axis is.",
    },
  ]),
};

export const mrgChapter1Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lesson07,
  lessonMastery,
];
