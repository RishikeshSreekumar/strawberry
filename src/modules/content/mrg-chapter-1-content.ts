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
      type: "text",
      content:
        "A skater stands still on smooth ice holding a heavy medicine ball. She throws the ball forwards, and she slides backwards. Nothing outside pushed her; the ice is too smooth to grip. The ball and the skater pushed on each other, and that push, equal and opposite, sent them apart. This lesson turns that picture into the law that runs every collision, explosion and rocket in the chapter.",
    },
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
    {
      type: "text",
      content:
        "**Worked example 1 (gun recoil).** A 5 kg rifle fires a 20 g bullet at 500 m/s. Find the rifle's recoil speed. Take the bullet's direction as positive.\n\n1. System: rifle + bullet, initially at rest, so $P = 0$. The powder gas forces are internal. *Why this step:* the horizontal external force (from the shooter's shoulder) is small over the millisecond of firing, so we treat the pair as isolated during the shot.\n2. After: $0.02(500) + 5V = 0$.\n3. $V = -\\dfrac{10}{5} = -2$ m/s. The rifle kicks back at 2 m/s.\n4. Energy check: the bullet gets $\\frac12(0.02)(500)^2 = 2500$ J, the rifle only $\\frac12(5)(2)^2 = 10$ J. Equal and opposite momenta, wildly unequal energies, because $K = \\frac{p^2}{2m}$ favours the light body.\n\n**Worked example 2 (the skater).** A 50 kg skater at rest throws a 5 kg ball forwards at 6 m/s relative to the ice.\n\n1. $0 = 5(6) + 50V$, so $V = -0.6$ m/s: she slides back at 0.6 m/s.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (jumping off a trolley, relative speed).** A 60 kg man stands on a 120 kg trolley at rest on a smooth track. He jumps off horizontally, backwards, with a speed of 3 m/s **relative to the trolley**. How fast does the trolley move?\n\n1. Let the trolley move forwards at $V$ (ground frame). The man's ground velocity is then $V - 3$. *Why this step:* momentum must be written with ground-frame velocities; \"relative to the trolley\" means subtracting the trolley's own velocity.\n2. $0 = 120V + 60(V - 3)$, so $180V = 180$ and $V = 1$ m/s.\n3. The man moves at $1 - 3 = -2$ m/s over the ground. Check: $120(1) + 60(-2) = 0$. ✓ Treating 3 m/s as a ground speed would give the wrong $V = 1.5$ m/s.\n\n**Worked example 4 (conservation in one direction only).** A 10 kg cannon on smooth ice fires a 1 kg shell at 100 m/s (relative to the ground) at $60^\\circ$ above the horizontal. Find the cannon's recoil.\n\n1. Vertically the ice pushes up hard during firing, so vertical momentum is *not* conserved. Horizontally the ice is smooth: $P_x$ is conserved. *Why this step:* conservation is a statement about each component separately; check the external forces direction by direction.\n2. $0 = 1(100\\cos60^\\circ) + 10V$, so $V = -\\dfrac{50}{10} = -5$ m/s.\n3. The cannon slides back at 5 m/s. The shell's 86.6 N s of vertical momentum came from the ice's impulse.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"if momentum is conserved, kinetic energy must be too\"",
      content:
        "They are different laws. Momentum is conserved whenever external forces vanish, because internal forces cancel in pairs. Kinetic energy is not protected that way: internal forces can do net work. In the recoil example it rises from 0 to 2510 J (chemical energy); in a car crash it falls (to heat and bent metal). Momentum is the one you can always rely on in an isolated system.",
    },
    {
      type: "quiz",
      id: "mrg1-1-q1",
      variant: "practice",
      question: "A 4 kg rifle fires a 50 g bullet at 400 m/s. What is the rifle's recoil speed?",
      options: [
        { text: "0.5 m/s", feedback: "Check the bullet's momentum: $0.05 \\times 400 = 20$ kg m/s, not 2." },
        { text: "5 m/s", correct: true, feedback: "$0.05 \\times 400 = 20$ kg m/s, and $20 / 4 = 5$ m/s backwards." },
        { text: "100 m/s", feedback: "That is $400 / 4$, using 1 kg for the bullet. Convert 50 g to 0.05 kg." },
        { text: "$20\\sqrt5$ m/s $\\approx 44.7$ m/s", feedback: "That equates the kinetic energies ($\\frac12(0.05)(400)^2 = \\frac12(4)V^2$), but kinetic energy is not conserved in firing: the powder supplies it. Use momentum." },
      ],
    },
    {
      type: "quiz",
      id: "mrg1-1-q2",
      variant: "concept",
      question: "Two carts at rest are pushed apart by a spring between them. Which statement is true?",
      options: [
        { text: "Momentum and kinetic energy are both conserved.", feedback: "Kinetic energy rises from zero: the spring's stored energy is converted into it." },
        { text: "Total momentum increases, because both carts start moving.", feedback: "They move in opposite directions with equal and opposite momenta, which add to zero." },
        { text: "Total momentum stays zero, while total kinetic energy increases.", correct: true, feedback: "The spring force is internal, so $\\vec P$ is unchanged; the spring does positive work on both carts." },
      ],
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
    },
    {
      type: "quiz",
      id: "mrg1-1-q5",
      variant: "practice",
      question: "A 50 kg boy stands on a 150 kg trolley at rest on a smooth track. He jumps off horizontally at 4 m/s **relative to the trolley**. With what speed does the trolley move?",
      options: [
        { text: "$\\frac43$ m/s", feedback: "That treats 4 m/s as his ground speed. His speed over the ground is $4 - V$." },
        { text: "4 m/s", feedback: "The trolley is three times heavier than the boy, so it must move more slowly than he does." },
        { text: "1 m/s", correct: true, feedback: "$150V + 50(V - 4) = 0$ gives $200V = 200$, so $V = 1$ m/s. His ground speed is 3 m/s." },
        { text: "0.75 m/s", feedback: "Write the boy's ground velocity as $V - 4$ and solve $150V + 50(V - 4) = 0$." },
      ],
      hint: "Write the boy's velocity relative to the ground in terms of the trolley's velocity $V$.",
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
    {
      type: "text",
      content:
        "**Worked example 1 (a ball against a wall, JEE Main).** A 0.15 kg ball travelling at 20 m/s hits a wall normally and rebounds at 15 m/s. The contact lasts 5 ms. Find the impulse and the average force. Take $g = 10$ m/s².\n\n1. Positive direction: away from the wall. Before: $p_1 = 0.15 \\times (-20) = -3$ kg m/s. After: $p_2 = 0.15 \\times 15 = 2.25$ kg m/s. *Why this step:* velocity reverses, so the two momenta have opposite signs; forgetting that is the classic mistake.\n2. $J = p_2 - p_1 = 2.25 - (-3) = 5.25$ N s, away from the wall.\n3. $\\bar F = \\dfrac{5.25}{0.005} = 1050$ N.\n4. The ball's weight is $1.5$ N, so the wall's push is $700$ times the weight. That is why we ignore gravity *during* an impact.\n\n**Worked example 2 (catching a ball).** A 0.16 kg ball arrives at 30 m/s and is brought to rest.\n\n1. $J = 0.16 \\times 30 = 4.8$ N s, the same however it is caught.\n2. Rigid hands, stopping it in 0.01 s: $\\bar F = 480$ N. Hands drawn back, stopping it in 0.1 s: $\\bar F = 48$ N. *Why this step:* the impulse is fixed by the problem; only the time is under the fielder's control.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (an oblique hit).** A 0.2 kg ball strikes a smooth wall at 10 m/s, its velocity making $60^\\circ$ with the normal to the wall, and bounces off at the same speed and angle.\n\n1. Split the velocity: along the wall $10\\sin60^\\circ$ (unchanged, the smooth wall exerts no force along itself), and along the normal $10\\cos60^\\circ = 5$ m/s (reversed). *Why this step:* the impulse is along the force, and a smooth wall only pushes along its normal.\n2. $J = m\\,\\Delta v_n = 0.2 \\times (5 - (-5)) = 2$ N s, along the normal, away from the wall.\n3. General result: $J = 2mv\\cos\\theta$ with $\\theta$ measured from the normal.\n\n**Worked example 4 (reading a force–time graph).** A force on a 0.5 kg puck at rest rises steadily from 0 to 100 N in 10 ms and falls steadily back to 0 in the next 10 ms.\n\n1. The graph is a triangle with base 0.02 s and height 100 N: $J = \\frac12 \\times 0.02 \\times 100 = 1$ N s.\n2. $v = \\dfrac{J}{m} = 2$ m/s.\n\n**Worked example 5 (impulsive tension).** Blocks of 1 kg and 2 kg lie on a smooth table, joined by a slack string. The 1 kg block is given 6 m/s directly away from the other. When the string jerks taut the two move together.\n\n1. The jerk is internal to the pair, so momentum is conserved: $1 \\times 6 = 3v$, so $v = 2$ m/s. *Why this step:* the tension is huge but brief; we never need its size, only that it is internal.\n2. Impulse of the tension on the 2 kg block: $2 \\times 2 = 4$ N s. On the 1 kg block: $1 \\times (2 - 6) = -4$ N s. Equal and opposite, as the third law requires.",
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
    {
      type: "quiz",
      id: "mrg1-2-q1",
      variant: "practice",
      question: "A 0.5 kg ball hits a wall at 10 m/s and rebounds along the same line at 6 m/s. The contact lasts 0.02 s. What is the average force of the wall on the ball?",
      options: [
        { text: "100 N", feedback: "That uses $\\Delta v = 10 - 6 = 4$ m/s. The velocity reverses, so $\\Delta v = 6 - (-10) = 16$ m/s." },
        { text: "400 N", correct: true, feedback: "$J = 0.5(6 - (-10)) = 8$ N s, and $\\frac{8}{0.02} = 400$ N." },
        { text: "8 N", feedback: "8 N s is the impulse. Divide by the contact time for the force." },
        { text: "250 N", feedback: "That uses only the incoming momentum, $0.5 \\times 10 = 5$ N s. The wall must also send the ball back." },
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
    },
    {
      type: "quiz",
      id: "mrg1-2-q4",
      variant: "practice",
      question: "A 0.1 kg ball hits a smooth wall at 20 m/s, at $60^\\circ$ to the normal, and rebounds with the same speed at the same angle. What is the magnitude of the impulse on it?",
      options: [
        { text: "$2\\sqrt3$ N s", feedback: "That uses $\\sin60^\\circ$. The component along the wall is unchanged; only the normal component, $v\\cos60^\\circ$, reverses." },
        { text: "2 N s", correct: true, feedback: "$2mv\\cos60^\\circ = 2 \\times 0.1 \\times 20 \\times \\frac12 = 2$ N s, along the normal." },
        { text: "4 N s", feedback: "That is the head-on value $2mv$. At an angle only the normal part reverses." },
        { text: "0", feedback: "The speed is unchanged, but the velocity is not: the normal component reverses." },
      ],
    },
    {
      type: "quiz",
      id: "mrg1-2-q5",
      variant: "practice",
      question: "A 2 kg block moving at 9 m/s on a smooth table is tied by a slack string to a 1 kg block at rest. When the string becomes taut the blocks move together. What impulse does the string give the 1 kg block?",
      options: [
        { text: "9 N s", feedback: "That would give the 1 kg block 9 m/s, but they move together at the common velocity." },
        { text: "12 N s", feedback: "That is the 2 kg block's momentum after the jerk, $2 \\times 6$. The 1 kg block goes from 0 to 6 m/s, gaining $1 \\times 6$." },
        { text: "6 N s", correct: true, feedback: "Common velocity $\\frac{2 \\times 9}{3} = 6$ m/s, so the 1 kg block gains $1 \\times 6 = 6$ N s." },
        { text: "18 N s", feedback: "That is the total momentum, not the impulse on one block." },
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
    {
      type: "text",
      content:
        "**Conveyor belt.** Sand falls vertically onto a belt that must keep moving at constant $v$. The sand arrives with zero horizontal velocity, so $u_{\\text{rel}} = -v$, and $\\frac{dv}{dt} = 0$. The horizontal force needed is $F = v\\frac{dm}{dt}$. The power supplied is $P = Fv = v^2\\frac{dm}{dt}$, but the sand's kinetic energy only grows at $\\frac12v^2\\frac{dm}{dt}$. **Half the power is lost as heat**, in the sliding of sand on belt before it catches up.\n\n**Water jet.** A jet of density $\\rho$, area $A$ and speed $v$ hits a wall and stops dead. Mass arrives at $\\rho Av$ per second, each kilogram losing momentum $v$, so the force on the wall is $F = \\rho Av^2$.\n\n**Falling chain.** A uniform chain (mass $M$, length $L$) hangs with its lower end just touching a table and is released. When a length $x$ has landed, the rest is moving at $v = \\sqrt{2gx}$ (free fall), and mass lands at $\\lambda v$ per second with $\\lambda = \\frac ML$. Stopping it needs a force $\\lambda v^2 = \\frac ML(2gx)$, on top of the weight $\\frac{M}{L}xg$ of the chain already lying there. Total force on the table: $\\frac{3Mgx}{L}$, **three times** the weight of the fallen part.",
    },
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
    {
      type: "text",
      content:
        "**Worked example 1 (the conveyor, JEE Main).** Sand drops onto a belt at 2 kg/s. The belt moves at a steady 3 m/s.\n\n1. $F = v\\frac{dm}{dt} = 3 \\times 2 = 6$ N. *Why this step:* every second, 2 kg of sand must be taken from 0 to 3 m/s horizontally, a momentum change of 6 kg m/s.\n2. Power: $P = Fv = 18$ W.\n3. Kinetic energy gained per second: $\\frac12 \\times 2 \\times 3^2 = 9$ W. The other 9 W becomes heat as the sand skids to the belt's speed.\n\n**Worked example 2 (what burn rate lifts a rocket?).** A 5000 kg rocket has an exhaust speed of 2 km/s. At what rate must it burn fuel to accelerate upwards at 10 m/s² at lift-off? Take $g = 10$ m/s².\n\n1. $u\\left|\\frac{dm}{dt}\\right| - mg = ma$, so the thrust must be $m(g + a) = 5000 \\times 20 = 10^5$ N. *Why this step:* the thrust must hold the rocket up *and* accelerate it.\n2. $\\left|\\frac{dm}{dt}\\right| = \\dfrac{10^5}{2000} = 50$ kg/s.\n\n**Worked example 3 (speed after the burn).** A rocket in deep space burns three-quarters of its initial mass with exhaust speed 2 km/s.\n\n1. $\\frac{m_0}{m} = \\frac{1}{1/4} = 4$.\n2. $v = 2\\ln4 \\approx 2 \\times 1.386 \\approx 2.77$ km/s.\n\n**Worked example 4 (a hose on a wall).** Water ($\\rho = 1000$ kg/m³) leaves a nozzle of area 2 cm² at 10 m/s and hits a wall without splashing back.\n\n1. $A = 2 \\times 10^{-4}$ m². $F = \\rho Av^2 = 1000 \\times 2\\times10^{-4} \\times 100 = 20$ N.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a rocket pushes against the air\"",
      content:
        "A rocket pushes against its *own exhaust*. The engine throws gas backwards, the gas pushes the rocket forwards (third law), and nothing outside is needed. Rockets work best in the vacuum of space, where there is no air resistance at all. The thrust $u\\left|\\frac{dm}{dt}\\right|$ contains no property of the surroundings.",
    },
    {
      type: "quiz",
      id: "mrg1-3-q1",
      variant: "practice",
      question: "Sand falls vertically onto a conveyor belt at 4 kg/s. What horizontal force keeps the belt moving at a steady 2 m/s?",
      options: [
        { text: "0 N, since the belt is not accelerating.", feedback: "The belt is not, but every second 4 kg of sand is accelerated from rest to 2 m/s." },
        { text: "4 N", feedback: "That uses $\\frac12 v\\frac{dm}{dt}$, which mixes up force and energy. The momentum rate is $v\\frac{dm}{dt}$." },
        { text: "16 N", feedback: "That is $v^2\\frac{dm}{dt}$, the power in watts, not the force." },
        { text: "8 N", correct: true, feedback: "$F = v\\frac{dm}{dt} = 2 \\times 4 = 8$ N." },
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
    },
    {
      type: "quiz",
      id: "mrg1-3-q3",
      variant: "practice",
      question: "A 2000 kg rocket ejects gas at 20 kg/s with speed 1500 m/s relative to the rocket. What is its initial upward acceleration? Take $g = 10$ m/s².",
      options: [
        { text: "15 m/s²", feedback: "That ignores the rocket's weight. The net force is thrust minus weight." },
        { text: "5 m/s²", correct: true, feedback: "Thrust $= 1500 \\times 20 = 30\\,000$ N; $a = \\frac{30\\,000 - 20\\,000}{2000} = 5$ m/s²." },
        { text: "25 m/s²", feedback: "Gravity opposes the thrust, so subtract $g$, don't add it." },
        { text: "The rocket cannot rise.", feedback: "The thrust, 30 kN, exceeds the weight, 20 kN, so it does rise." },
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
    {
      type: "text",
      content:
        "**The 1D elastic collision.** Masses $m_1$, $m_2$ move along a line with velocities $u_1$, $u_2$ before and $v_1$, $v_2$ after. Momentum and kinetic energy give two equations. Group each body's terms together:",
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
    {
      type: "text",
      content:
        "**Worked example 1 (a general elastic collision).** 2 kg at 4 m/s hits 1 kg at rest, elastically. Positive direction: the 2 kg ball's initial motion.\n\n1. $v_1 = \\frac{2 - 1}{3}(4) = \\frac43$ m/s and $v_2 = \\frac{2(2)}{3}(4) = \\frac{16}{3}$ m/s.\n2. Check momentum: $2 \\cdot \\frac43 + 1 \\cdot \\frac{16}{3} = \\frac{24}{3} = 8 = 2 \\times 4$. ✓\n3. Check relative velocity: $\\frac{16}{3} - \\frac43 = 4 = u_1 - u_2$. ✓ *Why this step:* the two checks are cheap and catch almost every slip in the formula.\n\n**Worked example 2 (equal masses, both moving).** A 1 kg ball at 3 m/s meets a 1 kg ball coming the other way at 2 m/s, elastically.\n\n1. Equal masses swap velocities, whatever they are: $v_1 = -2$ m/s, $v_2 = 3$ m/s. *Why this step:* with $m_1 = m_2$ the formulas collapse to $v_1 = u_2$, $v_2 = u_1$.\n\n**Worked example 3 (a perfectly inelastic collision).** A 3 kg trolley at 4 m/s hits a 1 kg trolley at rest and they couple.\n\n1. $v = \\frac{3 \\times 4}{4} = 3$ m/s.\n2. $K$ before $= \\frac12(3)(16) = 24$ J; after $= \\frac12(4)(9) = 18$ J; lost 6 J.\n3. Formula check: $\\frac12\\cdot\\frac{3 \\times 1}{4}\\cdot4^2 = 6$ J. ✓",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (why reactors use heavy water, JEE Main).** A neutron (mass $m$) hits a nucleus of mass $Am$ at rest, head-on and elastically. What fraction of its kinetic energy does it hand over?\n\n1. The nucleus leaves at $v_2 = \\frac{2m}{m + Am}u = \\frac{2u}{1 + A}$.\n2. Fraction transferred: $\\dfrac{\\frac12Am\\,v_2^2}{\\frac12mu^2} = \\dfrac{4A}{(1 + A)^2}$. *Why this step:* writing the answer in terms of $A$ lets us compare moderators at a glance.\n3. Deuterium ($A = 2$): $\\frac{8}{9} \\approx 89\\%$. Carbon ($A = 12$): $\\frac{48}{169} \\approx 28\\%$. Lead ($A = 207$): under 2%. Light nuclei slow neutrons fastest, which is why reactors use water, heavy water or graphite, not lead.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"in a perfectly inelastic collision all the kinetic energy is lost\"",
      content:
        "Only the kinetic energy of *relative* motion, $\\frac12\\mu u_{\\text{rel}}^2$, can be lost. The COM's share $\\frac12Mv_{cm}^2$ must survive, because momentum is conserved and the stuck pair still moves at $v_{cm}$. All the kinetic energy disappears only if the total momentum was zero to start with, as in a head-on crash of equal momenta.",
    },
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
    },
    {
      type: "quiz",
      id: "mrg1-4-q3",
      variant: "practice",
      question: "A 2 kg lump moving at 5 m/s meets a 3 kg lump moving at 5 m/s in the opposite direction. They stick. How much kinetic energy is lost?",
      options: [
        { text: "62.5 J", feedback: "That is all of it. The pair still moves at $\\frac{10 - 15}{5} = -1$ m/s afterwards, keeping 2.5 J." },
        { text: "2.5 J", feedback: "That is the kinetic energy *remaining*, not the amount lost." },
        { text: "0 J", feedback: "Sticking always loses the relative-motion energy, here most of it." },
        { text: "60 J", correct: true, feedback: "$\\mu = \\frac65$ kg and $u_{\\text{rel}} = 10$ m/s: $\\frac12 \\cdot \\frac65 \\cdot 100 = 60$ J. Check: 62.5 J before, $\\frac12(5)(1)^2 = 2.5$ J after." },
      ],
    },
    {
      type: "quiz",
      id: "mrg1-4-q4",
      variant: "concept",
      question: "During any 1D collision, at the moment of maximum compression of the two bodies, what is true?",
      options: [
        { text: "Both bodies move with the same velocity, $v_{cm}$, and the total kinetic energy is at its minimum.", correct: true, feedback: "Compression stops growing when the relative velocity is zero; only the COM's kinetic energy remains in motion." },
        { text: "Both bodies are momentarily at rest.", feedback: "Only if $v_{cm} = 0$. In general they share the COM velocity." },
        { text: "The total momentum is momentarily zero.", feedback: "The total momentum never changes during the collision." },
      ],
    },
    {
      type: "quiz",
      id: "mrg1-4-q5",
      variant: "practice",
      question: "A neutron collides head-on and elastically with a deuteron (mass $2m$) at rest. What fraction of the neutron's kinetic energy is transferred?",
      options: [
        { text: "$\\dfrac23$", feedback: "That is the deuteron's share of the total *mass*. Use $\\frac{4A}{(1 + A)^2}$." },
        { text: "$\\dfrac89$", correct: true, feedback: "$\\frac{4A}{(1 + A)^2} = \\frac{8}{9}$ with $A = 2$." },
        { text: "$\\dfrac49$", feedback: "That is $\\left(\\frac{2}{3}\\right)^2$. The deuteron's speed is $\\frac{2u}{3}$, but its mass is $2m$, which doubles the energy." },
        { text: "1", feedback: "All of it is transferred only when the masses are equal." },
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
    {
      type: "text",
      content:
        "**A ball bouncing on the floor.** The floor is the second body, with infinite mass, so the ball's rebound speed is $e$ times its impact speed. Dropped from height $h$, it hits at $\\sqrt{2gh}$, leaves at $e\\sqrt{2gh}$ and rises to $e^2h$. After $n$ bounces the height is $h_n = e^{2n}h$. Adding the geometric series of up-and-down trips:",
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
      type: "text",
      content:
        "**Worked example 1 (a general collision).** A 2 kg ball at 6 m/s hits a 4 kg ball at rest, with $e = 0.5$. Positive direction: the 2 kg ball's motion.\n\n1. Momentum: $2v_1 + 4v_2 = 12$. Restitution: $v_2 - v_1 = 0.5 \\times 6 = 3$. *Why this step:* two linear equations are quicker and safer than the memorised formula.\n2. Substitute $v_2 = v_1 + 3$: $2v_1 + 4v_1 + 12 = 12$, so $v_1 = 0$ and $v_2 = 3$ m/s.\n3. Energy lost: $\\frac12\\cdot\\frac{8}{6}\\cdot(1 - 0.25)\\cdot 36 = 18$ J. Check: 36 J before, $\\frac12(4)(9) = 18$ J after. ✓\n4. COM-frame check: $v_{cm} = 2$ m/s. In the COM frame the balls approach at $+4$ and $-2$ m/s and leave at $-2$ and $+1$ m/s ($\\times(-e)$). Adding back $v_{cm}$: $0$ and $3$ m/s. ✓\n\n**Worked example 2 (a bouncing ball).** A ball is dropped from 10 m onto a floor with $e = 0.5$. Take $g = 10$ m/s².\n\n1. First rebound: $e^2h = 0.25 \\times 10 = 2.5$ m; second: $0.625$ m.\n2. Total distance: $10 \\times \\frac{1.25}{0.75} = \\frac{50}{3} \\approx 16.7$ m.\n3. Total time: $t_0 = \\sqrt{2} \\approx 1.41$ s, and $\\sqrt2 \\times \\frac{1.5}{0.5} = 3\\sqrt2 \\approx 4.24$ s. *Why this step:* infinitely many bounces, yet a finite total time, because the trip times form a convergent geometric series.\n\n**Worked example 3 (measuring $e$).** A ball dropped from 1.6 m rebounds to 0.9 m.\n\n1. $h_1 = e^2h$, so $e = \\sqrt{\\frac{0.9}{1.6}} = \\sqrt{\\frac{9}{16}} = 0.75$.",
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
    {
      type: "quiz",
      id: "mrg1-5-q1",
      variant: "practice",
      question: "Before a collision, ball A moves at 5 m/s and ball B at $-1$ m/s. Afterwards A moves at 1 m/s and B at 4 m/s. Find $e$.",
      options: [
        { text: "0.75", feedback: "That uses $5 - 1 = 4$ for the approach. B moves towards A, so the approach speed is $5 + 1 = 6$ m/s." },
        { text: "0.2", feedback: "That is $\\frac{v_A}{u_A}$ for one ball. $e$ uses relative velocities." },
        { text: "0.5", correct: true, feedback: "Separation $4 - 1 = 3$ m/s, approach $5 - (-1) = 6$ m/s, $e = \\frac36$." },
        { text: "0.6", feedback: "That divides the separation speed 3 by A's speed 5 alone. The approach speed is relative: $5 - (-1) = 6$ m/s." },
      ],
    },
    {
      type: "quiz",
      id: "mrg1-5-q2",
      variant: "practice",
      question: "A ball is dropped from 20 m onto a floor with $e = 0.4$. How high does it rise after the second bounce?",
      options: [
        { text: "3.2 m", feedback: "That is after the *first* bounce, $e^2h$." },
        { text: "1.28 m", feedback: "That is $e^3h$. Each bounce multiplies the height by $e^2$, so two bounces give $e^4$." },
        { text: "8 m", feedback: "That is $eh$. The rebound *speed* scales by $e$, so the height, which goes as speed squared, scales by $e^2$ per bounce." },
        { text: "0.512 m", correct: true, feedback: "$e^4h = 0.0256 \\times 20 = 0.512$ m." },
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
    {
      type: "text",
      content:
        "**The line of impact.** For smooth spheres, the contact force acts only along the **line of centres** at the moment of impact (the common normal). That tells us exactly how to split the problem:",
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
      type: "text",
      content:
        "**Worked example 1 (the 90° rule with numbers).** A ball moving at 10 m/s strikes an identical ball at rest, elastically, and is deflected $30^\\circ$ from its original direction.\n\n1. The velocity triangle is right-angled with hypotenuse 10 m/s. *Why this step:* the $90^\\circ$ rule turns the problem into trigonometry.\n2. The first ball's speed: $10\\cos30^\\circ = 5\\sqrt3 \\approx 8.66$ m/s. The second ball's: $10\\sin30^\\circ = 5$ m/s, at $60^\\circ$ on the other side of the original line.\n3. Check energy: $75 + 25 = 100 = 10^2$. ✓\n\n**Worked example 2 (using the line of centres).** Sphere A (mass $m$, 4 m/s) hits an identical sphere B at rest. At impact the line of centres makes $60^\\circ$ with A's velocity. The spheres are smooth and $e = 1$.\n\n1. Normal component of A: $4\\cos60^\\circ = 2$ m/s. Tangential: $4\\sin60^\\circ = 2\\sqrt3$ m/s.\n2. Along the normal it is a 1D elastic collision of equal masses: they swap, so A's normal velocity becomes 0 and B's becomes 2 m/s. *Why this step:* the 1D results apply unchanged along the line of impact.\n3. Tangentially nothing changes: A keeps $2\\sqrt3$ m/s, B has none.\n4. B moves off at 2 m/s along the line of centres; A moves at $2\\sqrt3 \\approx 3.46$ m/s at right angles to it, consistent with the $90^\\circ$ rule.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (a ball on a smooth floor).** A ball hits a smooth floor at 10 m/s, at $45^\\circ$ to the vertical, with $e = 0.5$.\n\n1. The line of impact is vertical. Horizontal component $10\\sin45^\\circ = 5\\sqrt2$ m/s: unchanged (smooth floor). Vertical $5\\sqrt2$ m/s: reversed and multiplied by $e$, to $2.5\\sqrt2$ m/s.\n2. Rebound angle from the vertical: $\\tan\\theta' = \\dfrac{5\\sqrt2}{2.5\\sqrt2} = 2$, so $\\theta' \\approx 63.4^\\circ$. In general $\\tan\\theta' = \\dfrac{\\tan\\theta}{e}$: the ball leaves *flatter* than it arrived.\n3. Rebound speed: $\\sqrt{50 + 12.5} = \\sqrt{62.5} \\approx 7.9$ m/s, which is $u\\sqrt{\\sin^2\\theta + e^2\\cos^2\\theta}$.\n\n**Worked example 4 (sticking at right angles).** A 2 kg puck moving east at 3 m/s and a 3 kg puck moving north at 2 m/s collide and stick.\n\n1. $\\vec P = (6, 6)$ kg m/s, so $\\vec v = \\frac{1}{5}(6, 6) = (1.2, 1.2)$ m/s: speed $1.2\\sqrt2 \\approx 1.70$ m/s, at $45^\\circ$ north of east.\n2. Energy: 15 J before, $\\frac12(5)(2.88) = 7.2$ J after, so 7.8 J is lost. *Why this step:* a perfectly inelastic collision in 2D loses energy just as in 1D.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"$e$ applies to the whole velocity\"",
      content:
        "The coefficient of restitution acts only along the **line of impact**. For smooth bodies the tangential components pass through unchanged. Multiplying the whole velocity by $e$ in Worked example 3 would keep the angle at $45^\\circ$, but the ball actually rebounds at $63.4^\\circ$ from the vertical.",
    },
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
    },
    {
      type: "quiz",
      id: "mrg1-6-q3",
      variant: "practice",
      question: "A 1 kg ball moving east at 4 m/s collides with a 1 kg ball moving north at 4 m/s, and they stick. What is their speed afterwards?",
      options: [
        { text: "4 m/s", feedback: "That adds the speeds as if they were parallel, then halves. Momentum adds as vectors." },
        { text: "$2\\sqrt2$ m/s $\\approx 2.83$ m/s", correct: true, feedback: "$\\vec P = (4, 4)$, so $\\vec v = (2, 2)$, of size $2\\sqrt2$." },
        { text: "$4\\sqrt2$ m/s", feedback: "That is $|\\vec P|$ in kg m/s. Divide by the total mass, 2 kg." },
        { text: "0", feedback: "The momenta are perpendicular, so they cannot cancel." },
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
    },
    {
      type: "quiz",
      id: "mrg1-6-q5",
      variant: "practice",
      question: "Smooth sphere A moving at 6 m/s strikes an identical sphere B at rest. At impact the line of centres makes $30^\\circ$ with A's velocity, and $e = 1$. How fast does B move off?",
      options: [
        { text: "$3\\sqrt3$ m/s $\\approx 5.2$ m/s", correct: true, feedback: "A's normal component $6\\cos30^\\circ = 3\\sqrt3$ is handed over completely (equal masses, elastic)." },
        { text: "3 m/s", feedback: "That is A's tangential component, $6\\sin30^\\circ$, which A keeps." },
        { text: "6 m/s", feedback: "B only receives the normal component of A's velocity, not all of it." },
        { text: "$\\frac{3\\sqrt3}{2}$ m/s", feedback: "Equal masses in an elastic collision *swap* normal velocities; nothing is halved." },
      ],
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
    {
      type: "text",
      content:
        "**The ballistic pendulum.** A bullet of mass $m$ at speed $v$ lodges in a block of mass $M$ hanging on strings, and the block swings up through height $h$.\n\nStage 1 (collision, perfectly inelastic): $mv = (m + M)V$.\nStage 2 (swing, energy conserved): $\\frac12(m + M)V^2 = (m + M)gh$, so $V = \\sqrt{2gh}$. Combining:",
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
      type: "text",
      content:
        "**Worked example 1 (ballistic pendulum, and where the energy went).** A 10 g bullet lodges in a 2 kg block, which rises 5 cm.\n\n1. After the collision: $V = \\sqrt{2 \\times 10 \\times 0.05} = 1$ m/s. *Why this step:* work backwards from the stage you can see (the swing) to the one you cannot (the impact).\n2. Before: $v = \\frac{2.01}{0.01} \\times 1 = 201$ m/s.\n3. Bullet's kinetic energy: $\\frac12(0.01)(201)^2 \\approx 202$ J. Block + bullet after: $\\frac12(2.01)(1)^2 \\approx 1.0$ J. More than 99% became heat and deformation. Only the fraction $\\frac{m}{m + M}$ survives a perfectly inelastic hit on a body at rest.\n\n**Worked example 2 (a bullet passing through).** A 20 g bullet at 400 m/s passes through a 1 kg block at rest on a smooth table and emerges at 100 m/s.\n\n1. Momentum: $0.02(400) = 0.02(100) + 1\\cdot V$, so $V = 6$ m/s.\n2. Energy lost inside the block: $\\frac12(0.02)(400^2 - 100^2) - \\frac12(1)(6^2) = 1500 - 18 = 1482$ J.",
    },
    {
      type: "text",
      content:
        "**Block–spring–block.** A block $m_1$ at speed $u$ runs into a light spring attached to a block $m_2$ at rest, on a smooth floor. The spring compresses until the blocks move with a common velocity (just like maximum compression in 1.4); then it pushes them apart. At maximum compression all the relative-motion kinetic energy is stored in the spring:",
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
      type: "text",
      content:
        "**Worked example 3 (maximum compression).** A 2 kg block at 3 m/s hits a spring ($k = 600$ N/m) fixed to a 1 kg block at rest.\n\n1. $\\mu = \\frac{2 \\times 1}{3} = \\frac23$ kg, so $\\frac12\\mu u^2 = \\frac12 \\cdot \\frac23 \\cdot 9 = 3$ J. *Why this step:* using the whole $\\frac12m_1u^2 = 9$ J would forget that the blocks are still moving at maximum compression.\n2. $\\frac12(600)x^2 = 3 \\Rightarrow x^2 = 0.01 \\Rightarrow x = 0.1$ m.\n3. When the spring has fully relaxed, the collision has been elastic: $v_1 = \\frac13 \\times 3 = 1$ m/s and $v_2 = \\frac43 \\times 3 = 4$ m/s.\n\n**Worked example 4 (sliding onto a smooth wedge).** A 1 kg block slides at 5 m/s onto the curved face of a smooth 4 kg wedge resting on a smooth floor. How high does it climb?\n\n1. Horizontally no external force acts, so horizontal momentum is conserved. At the highest point the block is momentarily at rest *relative to the wedge*, so both move horizontally at $v = \\frac{1 \\times 5}{5} = 1$ m/s. *Why this step:* the vertical direction is not free (the floor pushes), so only $P_x$ is used.\n2. No friction, so mechanical energy is conserved: $\\frac12(1)(25) = \\frac12(5)(1)^2 + (1)(10)h$, so $12.5 = 2.5 + 10h$ and $h = 1$ m.\n3. In general $h = \\dfrac{M u^2}{2g(m + M)}$, less than the $\\frac{u^2}{2g} = 1.25$ m it would reach on a fixed ramp.\n\n**Worked example 5 (hitting a hanging bob).** A 50 g bullet lodges in a 950 g bob hanging from a 1 m string. What bullet speed lets the bob just complete a vertical circle?\n\n1. A mass on a string completes the circle only if its speed at the bottom is at least $\\sqrt{5gL} = \\sqrt{50}$ m/s (Mechanics I: the tension must not go slack at the top).\n2. Collision: $0.05v = 1.0 \\times \\sqrt{50}$, so $v = 20\\sqrt{50} = 100\\sqrt2 \\approx 141$ m/s.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"use energy conservation through the whole ballistic pendulum\"",
      content:
        "Writing $\\frac12mv^2 = (m + M)gh$ gives, in Worked example 1, $v = \\sqrt{2(2.01)(10)(0.05)/0.01} \\approx 14$ m/s instead of 201 m/s. The collision is perfectly inelastic and destroys over 99% of the energy. Use momentum across the impact and energy only for the swing.",
    },
    {
      type: "quiz",
      id: "mrg1-7-q1",
      variant: "practice",
      question: "A 20 g bullet lodges in a 1.98 kg block hanging on long strings, and the block rises 20 cm. What was the bullet's speed?",
      options: [
        { text: "20 m/s", feedback: "That comes from $\\frac12mv^2 = (m + M)gh$, energy through the collision. Most of the energy is lost in the impact." },
        { text: "200 m/s", correct: true, feedback: "$V = \\sqrt{2 \\times 10 \\times 0.2} = 2$ m/s, and $v = \\frac{2}{0.02} \\times 2 = 200$ m/s." },
        { text: "2 m/s", feedback: "That is the block's speed just after the impact." },
        { text: "100 m/s", feedback: "Recompute $\\sqrt{2gh} = \\sqrt{4} = 2$ m/s, then multiply by $\\frac{m + M}{m} = 100$." },
      ],
    },
    {
      type: "quiz",
      id: "mrg1-7-q2",
      variant: "concept",
      question: "In a two-stage problem (a collision followed by a swing), which law do you apply across the collision itself?",
      options: [
        { text: "Conservation of mechanical energy.", feedback: "Only if the collision is known to be elastic. Usually energy is lost in the impact." },
        { text: "Both, always.", feedback: "Momentum yes; kinetic energy only for elastic collisions." },
        { text: "Conservation of momentum (along directions free of impulsive external forces).", correct: true, feedback: "Impulsive internal forces cancel; kinetic energy may not survive." },
      ],
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
    },
    {
      type: "quiz",
      id: "mrg1-7-q4",
      variant: "practice",
      question: "A 2 kg block slides at 5 m/s onto the smooth curved face of a 3 kg wedge free to move on a smooth floor. How high does the block rise?",
      options: [
        { text: "0.75 m", correct: true, feedback: "Common velocity 2 m/s; $25 = \\frac12(5)(4) + 2(10)h$, so $h = \\frac{15}{20} = 0.75$ m." },
        { text: "1.25 m", feedback: "That is $\\frac{u^2}{2g}$, which assumes the wedge is fixed. A free wedge takes some of the energy." },
        { text: "0.5 m", feedback: "Recheck the energy: $\\frac12(2)(25) - \\frac12(5)(2)^2 = 15$ J, and $15 = mgh$ with $m = 2$ kg." },
        { text: "0.3 m", feedback: "You may have used the total mass in $mgh$. Only the block rises." },
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
      type: "quiz",
      id: "mrg1-8-q1",
      variant: "mastery",
      question: "A machine gun fires 12 bullets per second, each of mass 10 g, at 500 m/s. What average force must the gunner apply to hold it still?",
      options: [
        { text: "60 N", correct: true, feedback: "Momentum per second $= 12 \\times 0.01 \\times 500 = 60$ kg m/s², that is 60 N." },
        { text: "5 N", feedback: "That is the momentum of one bullet. Twelve leave each second." },
        { text: "6000 N", feedback: "Convert 10 g to 0.01 kg: $12 \\times 0.01 \\times 500 = 60$ N." },
        { text: "15 000 N", feedback: "That is the kinetic energy delivered per second (in watts), not the force." },
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
    },
    {
      type: "quiz",
      id: "mrg1-8-q3",
      variant: "mastery",
      question: "A 0.2 kg ball is dropped from 5 m and rebounds to 1.25 m. The contact with the floor lasts 0.1 s. What is the average force exerted *by the floor* during contact?",
      options: [
        { text: "30 N", feedback: "That is the average *net* force. The floor's push must exceed it by the weight, 2 N." },
        { text: "10 N", feedback: "That uses $\\Delta v = 10 - 5$. The velocity reverses, so $\\Delta v = 15$ m/s." },
        { text: "32 N", correct: true, feedback: "Impact at 10 m/s, rebound at 5 m/s: $J = 0.2 \\times 15 = 3$ N s, so the net force averages 30 N up. The floor must also hold up the weight: $N = 30 + 2 = 32$ N." },
        { text: "3 N", feedback: "3 N s is the impulse. Divide by the contact time 0.1 s." },
      ],
      hint: "Find the speeds from the heights, then remember the floor pushes against gravity too.",
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
    },
    {
      type: "quiz",
      id: "mrg1-8-q5",
      variant: "mastery",
      question: "A 3000 kg rocket has an exhaust speed of 1500 m/s. At what rate must it burn fuel just to hover?",
      options: [
        { text: "2 kg/s", feedback: "Weight is $mg = 30\\,000$ N, not 3000 N." },
        { text: "40 kg/s", feedback: "That would accelerate it upwards at $g$. Hovering only needs thrust equal to the weight." },
        { text: "0.5 kg/s", feedback: "Divide the weight by the exhaust speed: $\\frac{30\\,000}{1500}$." },
        { text: "20 kg/s", correct: true, feedback: "Thrust $= $ weight: $1500\\left|\\frac{dm}{dt}\\right| = 30\\,000$ N." },
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
    },
    {
      type: "quiz",
      id: "mrg1-8-q7",
      variant: "mastery",
      question: "A 2 kg ball at 5 m/s hits a 3 kg ball at rest head-on, with $e = 0.6$. How much kinetic energy is lost?",
      options: [
        { text: "15 J", feedback: "That is the perfectly inelastic loss, $\\frac12\\mu u^2$. With $e = 0.6$ some is returned." },
        { text: "9.6 J", correct: true, feedback: "$\\frac12\\mu(1 - e^2)u^2 = \\frac12(1.2)(0.64)(25) = 9.6$ J." },
        { text: "6 J", feedback: "That uses $(1 - e)$ instead of $(1 - e^2)$." },
        { text: "25 J", feedback: "That is all of the initial kinetic energy. The COM's share, $\\frac12(5)(2)^2 = 10$ J, can never be lost." },
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
